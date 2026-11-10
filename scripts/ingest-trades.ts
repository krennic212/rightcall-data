/**
 * Stream FEC individual contributions and merge trade / local-business
 * donors into src/data/states/*.json.
 *
 *   unzip -p /tmp/fec/indiv24.zip itcont.txt | node --experimental-strip-types scripts/ingest-trades.ts
 */
import { createInterface } from "node:readline";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { classifyJob, isTradeCategory, CATEGORY_LABEL, OCCUPATIONS } from "../src/lib/search/occupations.ts";

type Gift = [string, number, number];
type Donor = {
  n: string;
  ln: string;
  fn: string;
  o: string;
  cat: string;
  e: string;
  c: string;
  st: string;
  z: string;
  d: number;
  r: number;
  x: number;
  k: number;
  g?: Gift[];
};

type CommitteeInfo = { n: string; p: "D" | "R" | "O" };

const EXISTING = new Set([
  "dentist",
  "chiropractor",
  "veterinarian",
  "optometrist",
  "ophthalmologist",
  "pharmacist",
  "psychologist",
  "psychiatrist",
  "pediatrician",
  "dermatologist",
  "anesthesiologist",
  "cardiologist",
  "oncologist",
  "orthopedist",
  "radiologist",
  "urologist",
  "neurologist",
  "obgyn",
  "podiatrist",
  "physician",
  "attorney",
  "realtor",
  "accountant",
  "financial_advisor",
  "insurance",
  "plumber",
  "electrician",
  "hvac",
  "architect",
  "contractor",
]);

const FAST_NEEDLE = new RegExp(
  OCCUPATIONS.filter((item) => isTradeCategory(item.category) && !EXISTING.has(item.category))
    .flatMap((item) => item.keywords)
    .sort((a, b) => b.length - a.length)
    .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "i",
);

const SKIP_EMPLOYER =
  /^(?:self(?:[-\s]employed)?|self|retired|not employed|none|homemaker|n\/a|na|-|unemployed)?$/i;

const committees = JSON.parse(readFileSync("src/data/committees.json", "utf8")) as Record<
  string,
  CommitteeInfo
>;

function titleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function parseName(raw: string): { n: string; ln: string; fn: string } | null {
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (!cleaned.includes(",")) return null;
  const [lastRaw, restRaw = ""] = cleaned.split(",", 2);
  const last = lastRaw.replace(/[^A-Za-z'\- ]/g, " ").trim();
  const rest = restRaw.replace(/\b(MR|MS|MRS|DR|MD|DDS|DMD|ESQ|JR|SR|II|III|IV|PHD)\b\.?/gi, " ").trim();
  const first = rest.split(/\s+/)[0] ?? "";
  if (last.length < 2 || first.length < 2) return null;
  return {
    ln: last.toLowerCase(),
    fn: first.toLowerCase(),
    n: titleCase(`${rest} ${last}`),
  };
}

type Agg = Donor & { gifts: Map<string, { amt: number; n: number }> };

const people = new Map<string, Agg>();
let lines = 0;
let kept = 0;

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

for await (const line of rl) {
  lines += 1;
  if (lines % 500_000 === 0) {
    console.error(`scanned ${lines} kept ${kept} people ${people.size}`);
  }
  const cols = line.split("|");
  if (cols.length < 15) continue;
  const entity = cols[6] ?? "";
  if (entity && entity !== "IND") continue;
  const memo = cols[18] ?? "";
  if (memo === "X") continue;
  const occ = (cols[12] ?? "").replace(/\s+/g, " ").trim();
  const emp = (cols[11] ?? "").replace(/\s+/g, " ").trim();
  if (!FAST_NEEDLE.test(occ) && (SKIP_EMPLOYER.test(emp) || !FAST_NEEDLE.test(emp))) continue;
  const hit = classifyJob(occ, emp);
  if (!hit || !isTradeCategory(hit.category) || EXISTING.has(hit.category)) continue;
  const cmte = (cols[0] ?? "").trim().toUpperCase();
  const amount = Number(cols[14]);
  if (!Number.isFinite(amount) || amount === 0) continue;
  const state = (cols[9] ?? "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(state)) continue;
  const zip = (cols[10] ?? "").replace(/\D/g, "").slice(0, 5);
  if (zip.length !== 5) continue;
  const name = parseName(cols[7] ?? "");
  if (!name) continue;
  const city = titleCase((cols[8] ?? "").replace(/\s+/g, " ").trim());
  const key = `${state}|${name.ln}|${name.fn}|${zip}|${hit.category}`;
  let row = people.get(key);
  if (!row) {
    row = {
      n: name.n,
      ln: name.ln,
      fn: name.fn,
      o: titleCase(occ) || CATEGORY_LABEL[hit.category] || hit.category,
      cat: hit.category,
      e: titleCase(emp) || "Self Employed",
      c: city,
      st: state,
      z: zip,
      d: 0,
      r: 0,
      x: 0,
      k: 0,
      gifts: new Map(),
    };
    people.set(key, row);
  }
  const party = committees[cmte]?.p ?? "O";
  if (party === "D") row.d += amount;
  else if (party === "R") row.r += amount;
  else row.x += amount;
  row.k += 1;
  const gift = row.gifts.get(cmte) ?? { amt: 0, n: 0 };
  gift.amt += amount;
  gift.n += 1;
  row.gifts.set(cmte, gift);
  kept += 1;
}

console.error(`done scanned ${lines} gifts ${kept} people ${people.size}`);

const byState = new Map<string, Donor[]>();
for (const row of people.values()) {
  const g: Gift[] = [...row.gifts.entries()]
    .map(([id, v]) => [id, Math.round(v.amt), v.n] as Gift)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 10);
  const donor: Donor = {
    n: row.n,
    ln: row.ln,
    fn: row.fn,
    o: row.o,
    cat: row.cat,
    e: row.e,
    c: row.c,
    st: row.st,
    z: row.z,
    d: Math.round(row.d),
    r: Math.round(row.r),
    x: Math.round(row.x),
    k: row.k,
    g,
  };
  const list = byState.get(row.st) ?? [];
  list.push(donor);
  byState.set(row.st, list);
}

let added = 0;
for (const [st, incoming] of byState) {
  const path = `src/data/states/${st}.json`;
  if (!existsSync(path)) continue;
  const existing = JSON.parse(readFileSync(path, "utf8")) as Donor[];
  const seen = new Set(existing.map((row) => `${row.ln}|${row.fn}|${row.z}|${row.cat}`));
  const extra = incoming.filter((row) => !seen.has(`${row.ln}|${row.fn}|${row.z}|${row.cat}`));
  if (extra.length === 0) continue;
  writeFileSync(path, JSON.stringify(existing.concat(extra)));
  added += extra.length;
  const cats: Record<string, number> = {};
  for (const row of extra) cats[row.cat] = (cats[row.cat] || 0) + 1;
  console.error(`${st} +${extra.length} ${JSON.stringify(cats)}`);
}
console.error(`merged ${added} new donors`);

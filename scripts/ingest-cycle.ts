/**
 * Stream FEC 2025–2026 individual contributions into src/data/states/*.json
 * and merge new committees.
 *
 *   unzip -p /tmp/fec/indiv26.zip itcont.txt | node --experimental-strip-types scripts/ingest-cycle.ts
 */
import { createInterface } from "node:readline";
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { classifyJob, CATEGORY_LABEL, OCCUPATIONS } from "../src/lib/search/occupations.ts";

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
type Agg = Donor & { gifts: Map<string, { amt: number; n: number }>; dirty: boolean };

const FAST_NEEDLE = new RegExp(
  OCCUPATIONS.flatMap((item) => item.keywords)
    .sort((a, b) => b.length - a.length)
    .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "i",
);

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

function partyFromCm(rawParty: string, name: string, fallback: "D" | "R" | "O" = "O"): "D" | "R" | "O" {
  const p = rawParty.trim().toUpperCase();
  if (p === "DEM" || p === "DFL" || p === "D") return "D";
  if (p === "REP" || p === "GOP" || p === "R") return "R";
  const n = name.toLowerCase();
  if (/\b(winred|nrcc|nrsc|\brnc\b|republican|trump|never surrender)\b/.test(n)) return "R";
  if (/\b(actblue|dccc|dscc|\bdnc\b|democrat|kamala|harris for president)\b/.test(n)) return "D";
  return fallback;
}

const committees = JSON.parse(readFileSync("src/data/committees.json", "utf8")) as Record<string, CommitteeInfo>;
let committeesAdded = 0;

async function mergeCommitteeZip(zipPath: string) {
  if (!existsSync(zipPath)) return;
  const { execSync } = await import("node:child_process");
  const cm = execSync(`unzip -p ${zipPath} cm.txt`, { maxBuffer: 30_000_000 }).toString("utf8");
  for (const line of cm.split("\n")) {
    if (!line) continue;
    const cols = line.split("|");
    const id = (cols[0] ?? "").trim().toUpperCase();
    if (!/^C\d{8}$/.test(id)) continue;
    const name = titleCase((cols[1] ?? "").replace(/\s+/g, " ").trim());
    if (!name) continue;
    const party = partyFromCm(cols[10] ?? "", name, committees[id]?.p ?? "O");
    if (!committees[id]) {
      committees[id] = { n: name, p: party };
      committeesAdded += 1;
    } else if (committees[id].p === "O" && party !== "O") {
      committees[id].p = party;
    }
  }
}

if (existsSync("/tmp/fec/cm.txt")) {
  const cm = readFileSync("/tmp/fec/cm.txt", "utf8");
  for (const line of cm.split("\n")) {
    if (!line) continue;
    const cols = line.split("|");
    const id = (cols[0] ?? "").trim().toUpperCase();
    if (!/^C\d{8}$/.test(id)) continue;
    const name = titleCase((cols[1] ?? "").replace(/\s+/g, " ").trim());
    if (!name) continue;
    const party = partyFromCm(cols[10] ?? "", name, committees[id]?.p ?? "O");
    if (!committees[id]) {
      committees[id] = { n: name, p: party };
      committeesAdded += 1;
    } else if (committees[id].p === "O" && party !== "O") {
      committees[id].p = party;
    }
  }
}

await mergeCommitteeZip("/tmp/fec/cm24.zip");
await mergeCommitteeZip("/tmp/fec/cm26.zip");
writeFileSync("src/data/committees.json", JSON.stringify(committees));
console.error(`committees +${committeesAdded} total ${Object.keys(committees).length}`);

const people = new Map<string, Agg>();
const fresh = process.env.FRESH === "1";
if (!fresh) {
  for (const file of readdirSync("src/data/states")) {
    if (!file.endsWith(".json")) continue;
    const rows = JSON.parse(readFileSync(`src/data/states/${file}`, "utf8")) as Donor[];
    for (const row of rows) {
      const key = `${row.st}|${row.ln}|${row.fn}|${row.z}|${row.cat}`;
      const gifts = new Map<string, { amt: number; n: number }>();
      for (const [id, amt, n] of row.g ?? []) gifts.set(id, { amt, n });
      people.set(key, { ...row, gifts, dirty: false });
    }
  }
}
console.error(`loaded ${people.size} donors${fresh ? " (fresh rebuild)" : ""}`);

let lines = 0;
let kept = 0;
let updated = 0;
let created = 0;
const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

for await (const line of rl) {
  lines += 1;
  if (lines % 1_000_000 === 0) {
    console.error(`scanned ${lines} kept ${kept} updated ${updated} new ${created}`);
  }
  if (!FAST_NEEDLE.test(line)) continue;
  const cols = line.split("|");
  if (cols.length < 15) continue;
  const entity = cols[6] ?? "";
  if (entity && entity !== "IND") continue;
  const memo = cols[18] ?? "";
  if (memo === "X") continue;
  const occ = (cols[12] ?? "").replace(/\s+/g, " ").trim();
  const emp = (cols[11] ?? "").replace(/\s+/g, " ").trim();
  const hit = classifyJob(occ, emp);
  if (!hit) continue;
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
      dirty: true,
    };
    people.set(key, row);
    created += 1;
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
  row.dirty = true;
  kept += 1;
  if (!row.n) row.n = name.n;
  updated += 1;
}

console.error(`done scanned ${lines} gifts ${kept} people ${people.size} new ${created}`);

const byState = new Map<string, Donor[]>();
for (const row of people.values()) {
  const g: Gift[] = [...row.gifts.entries()]
    .map(([id, v]) => [id, Math.round(v.amt), v.n] as Gift)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 12);
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

let wrote = 0;
const written = new Set<string>();
for (const [st, list] of byState) {
  const path = `src/data/states/${st}.json`;
  if (!existsSync(path) && list.length === 0) continue;
  writeFileSync(path, JSON.stringify(list));
  wrote += list.length;
  written.add(`${st}.json`);
}
if (fresh) {
  for (const file of readdirSync("src/data/states")) {
    if (file.endsWith(".json") && !written.has(file)) unlinkSync(`src/data/states/${file}`);
  }
}
console.error(`wrote ${wrote} donors across ${byState.size} states`);

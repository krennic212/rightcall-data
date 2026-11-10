import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const outDir = process.argv[2] || "public/feed";
mkdirSync(outDir, { recursive: true });

let people = 0;
let states = 0;
for (const file of readdirSync("src/data/states")) {
  if (!file.endsWith(".json")) continue;
  states += 1;
  const raw = readFileSync(`src/data/states/${file}`);
  let count = 0;
  let idx = 0;
  while ((idx = raw.indexOf('"n":', idx)) !== -1) {
    count += 1;
    idx += 4;
  }
  people += count;
}

const refreshedAt = new Date().toISOString();
const version = refreshedAt.slice(0, 10);
const meta = {
  version,
  refreshedAt,
  cycles: ["2023-2024", "2025-2026"],
  people,
  states,
  etag: `fec-${version}-${people}`,
  source: "FEC bulk individual contributions",
};
writeFileSync(`${outDir}/harvest-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);
writeFileSync(
  `${outDir}/harvest.json`,
  `${JSON.stringify(
    {
      version,
      refreshedAt,
      note: "Shard manifest. Donor rows live in states/{ST}.json.",
      states: "states/{ST}.json",
      committees: "committees.json",
      meta: "harvest-meta.json",
      people,
    },
    null,
    2,
  )}\n`,
);
console.log(`wrote ${outDir}/harvest-meta.json people=${people} states=${states}`);

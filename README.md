# rightcall-data

Public FEC feed for RightCall. Official bulk filings only. No street addresses or phone numbers.

The app reads these URLs after GitHub Pages is on (branch `main`, folder `/`):

- https://krennic212.github.io/rightcall-data/harvest-meta.json
- https://krennic212.github.io/rightcall-data/harvest.json
- https://krennic212.github.io/rightcall-data/states/TX.json
- https://krennic212.github.io/rightcall-data/committees.json

`harvest.json` is a file list. Donor rows live in `states/{ST}.json`.

Those files are published by the Weekly FEC refresh Action in `krennic212/rightcall`. They are not in this repo until that Action succeeds.

## Still required once

1. This repo: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
2. On `krennic212/rightcall`: Settings → Secrets and variables → Actions → New secret `RIGHTCALL_DATA_TOKEN`. Use a fine-grained token that can write Contents on **this repo only**.
3. On `krennic212/rightcall`: Actions → Weekly FEC refresh → Run workflow.

# Gale open-world prototype

Producer authorized construction and publication on 2026-09-25, with remaining
choices delegated. Local: `/tools/prototypes/gale/`. Public: `/playtest/#gale`.
This is an independently saved free-roam exterior, not the campaign/finale mission.

## Built

- Full 9 × 17 real-km survey envelope, using 451,401 measured USGS heights at 20 m
  spacing, with a 500 m source-data apron outside each playable edge. Terrain,
  contact and camera use the same triangulated surface. 299 tiles use full detail
  nearby and coarser meshes with skirts at distance. No per-route collision fence.
- First-prototype assumption: scale width, depth **and height** to two-thirds.
  This yields 6 × 11⅓ game km / 68 km², 66.4% of Jezero's game envelope. It preserves
  slopes and landmark aspect ratios; it is not yet the proposed selective
  compression between protected full-size landmark zones. Rover size is unchanged.
- Measured 27 × 37 real-km context, sampled at 100 m and rendered more coarsely,
  extends the mountain beyond the driving boundary. Missing source cells create
  omitted scenery triangles, never invented terrain. The context is a local
  mountain sector, not all of Gale or the summit.
- All 1,316 independently recorded NASA route parts through sol 5021 are visible
  in the map and optional gold ground overlay. Gaps are not joined. The runtime
  route has 26,956 original vertices, no smoothing or invented continuation.
- Eleven dated travel stops, unlocked from the beginning, plus guide-to-stop,
  minimap, full map, zoom, optional visit reminders, pause and local saving.
- Uses the existing Perseverance ASTRA clone model and unchanged approved Jezero
  2.5× kit, acceleration, ground/air handling, camera, braking and contact helpers.
  This rover follows Curiosity's history; it is not the real slow scientific rover.
  No races, tasks, required discoveries or campaign completion gates.
- Existing Mars palette, day/late-afternoon/night lighting and headlights.
  Shared renderer adds optional haze uniforms; all other worlds retain the exact
  previous defaults (3100 terrain distance / .68 backdrop floor). Gale opts into
  11000 / .38 to keep the measured mountain legible.
- Representative seeded rocks are scenery rather than mission-located boulders.
  Route and stop clearances are screened, collision rocks are spatially indexed,
  and camera clearance includes nearby rocks. Native surface relief is unaltered.

## Continuity and saves

The opening is NASA's first recorded basin waypoint, facing roughly south toward
the mountain. Its view direction uses the existing flight-arrival bearing ratio
from `GALE_STAGING` (140 east / 2700 forward) as an authored continuity choice.
This is **not** surveyed registration of the existing authored flight surface.
The flight site remains unchanged and does not yet hand off to this prototype.
Exact terrain/craft handoff belongs to later campaign integration.

Save key: `astra.gale.openWorld.v1`. Stores a grounded, in-bounds position, heading,
lighting, quality, route preference, visited stable sol IDs and guide target.
Corrupt/incompatible records are backed up before replacement. Jezero and flight
saves are never read or written. No restart/delete action is included. Map travel
resets velocity and camera cleanly; leaving/pause saves, blur clears inputs.

Only the outer rectangle triggers the inherited forgiving automatic turn-back.
An extreme airborne escape past the measured apron is returned safely inside,
without changing the shared sim. Map travel/recovery remain available anywhere.

## Evidence / reproducibility

`prepare.py` samples the USGS MSL Gale merged DEM 1m v3 from its public S3 mirror.
One-metre output spacing does not establish uniform one-metre source detail.
The playable grid is 20 m nearest native samples; small ridges/obstacles below that
scale are not a surveyed reconstruction. Source projection is a 3,396,190 m Mars
sphere, planetocentric latitude, east-positive longitude. Local east includes
cos(latitude) at NASA's first waypoint; all render, route and contact coordinates
use the same mapping. Z references −4500 m before uniform scaling.

Original route, waypoints and DEM metadata are pinned in `tools/surveys/gale/`.
Runtime hashes and provenance are in `assets/terrain.json`; `assets/route.json`
contains the transformed local Mars positions (still unscaled metres), stop dates,
source odometer and geoid elevations. The UI labels these as NASA measurements,
separate from game-space distances/speed. Retrieval date: 2026-09-25.

With Python + rasterio/numpy, run `prepare.py` to regenerate assets. It only reads
remote terrain if the local playable elevation file is absent. Source survey
files are not refreshed implicitly. Runtime assets total approximately 3.5 MB,
plus shared rover rendering and simulation modules; no large gallery models load.

## Verification

`npm test` includes source hashes, full-route containment, equal-axis scaling,
triangle/contact interpolation and isolated/corrupt save checks.
`node tools/prototypes/gale/check.mjs` uses Vite at port 5514 (override `GALE_URL`)
and checks Chromium/WebKit: measured mesh/contact agreement across all tiles,
actual driving at all eleven stops, braking/reverse, boundary recovery, map travel,
save/reload, lighting, route toggle, desktop/phone/landscape controls and failed
terrain downloads. Screenshots are written to `/private/tmp/`.

`node tools/prototypes/gale/package-check.mjs` checks the production preview at
port 5547 (override `GALE_SITE` for the public site): deep link, held phone pedal,
map travel, exit/relaunch in both browsers, and Jezero's preserved shader defaults.
The driving checks cover short real-simulation drives at every stop, not a complete
human end-to-end traverse or an automated assertion that every off-route slope is safe.

Physical phone performance, subjective terrain/drive feel and full human route
review remain open. This is first-prototype terrain/art, not final visual approval.
Named landmark/photo reconstruction, selective connection compression, full
mountain coverage, campaign transitions, original-rover extraction, cave/interior,
communications takeover and finale are future work.

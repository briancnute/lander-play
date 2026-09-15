# Three Forks / delta front — first playable area

**Public mobile playtest:** this study is now packaged through the public PLAYTEST menu. See `docs/PLAYTEST.md` and newest STATUS for release verification. Older source-only notes below describe earlier checkpoints; campaign integration remains separate.

2026-09-14. Source-only, **not deployed or added to Extras**. Brian approved the Three Forks direction and requested a cohesive first playable pass before further refinement.

Open `/tools/prototypes/jezero/preview.html` on the Vite server for laptop/iPad/iPhone and rotation controls. `/tools/prototypes/jezero/index.html` is the direct game. The original approved study remains at `../mars-renderer/preview.html`.

## What is here

A geographically registered, approximately **1.56 × 1.37 km** exploration area, with a larger 3 × 3 km measured backdrop. Three observations introduce sediment deposition, delta erosion and modern wind-shaped sand. They add short facts without interrupting driving; Map → Field notes holds the optional NASA context. Observations remain after all three are found and free exploration continues.

An optional approximately **3.15 km** circuit uses the same terrain: eight ordered, any-angle gates and a finish; next gate in-world and next/following highlighted on the north-up map. A wide first line passes around two authored outcrops; a shorter **4.5 m clear gap** fits the approved rover enclosure. A separate rounded jump has a clear approach from its north, a boost cell, and landing space. Neither jump nor shortcut is required. No audio was added.

Choose rover reuses the five approved kits, lightweight driving models and detailed gallery with image fallback/retry. Changing rover during a lap ends that lap, preventing mixed-rover records. Day/dusk/night, spatial storms, dissipating haze, headlights, steering, camera, suspension, tracks and boosts use the approved study's modules and values. Brian's approved preview combination is now **Light only + Hold the light**: soft terrain illumination, no headlight-cast shadows, and the lab's slower airborne transition with retained lower-beam fill. The original GPU study keeps its defaults. This is source-only, not a public deployment.

Progress is local to `astra.jezero.three-forks-v1`: three observation IDs, separate best lap per rover, last grounded exploration position, selected kit and graphics/light choices. It does not read or migrate campaign/Extras saves. Refresh returns to a paused session. Races restart rather than restoring partially completed times. Invalid saves fall back safely; unavailable storage leaves driving usable. A graphics-context loss offers reload instead of the old expensive renderer fallback.

## Terrain provenance and scale

**Source:** USGS Mars 2020 Terrain Relative Navigation HiRISE DTM Mosaic, `JEZ_hirise_soc_006_DTM_MOLAtopography_DeltaGeoid_1m_Eqc_latTs0_lon0_blend40.tif`. [USGS catalogue](https://astrogeology.usgs.gov/search/map/Mars/Mars2020/JEZ_hirise_soc_006_DTM_MOLAtopography_DeltaGeoid_1m_Eqc_latTs0_lon0_blend40), [public raster](https://planetarymaps.usgs.gov/mosaic/mars2020_trn/HiRISE/JEZ_hirise_soc_006_DTM_MOLAtopography_DeltaGeoid_1m_Eqc_latTs0_lon0_blend40.tif).

- Scientific raster: 21,400 × 21,488, Float32, 1 metre projected pixels, equirectangular Mars 2000 sphere (radius 3,396,190 m), standard parallel / central meridian 0. The source identifies its height product as MOLA topography / DeltaGeoid. Heights retain that datum; they are not an Earth sea-level model.
- Context center: **77.405° E, 18.461° N**. Longitude distances are corrected by cos(18.461°) to physical east-west distances; north is negative game Y. The context extends 1,500 m in each direction. Playable east −624…936 m and north −900…468 m relative to center.
- 4 game units = 1 metre in X, Y **and Z**; no vertical exaggeration. Heights are offset by −2,565 m for rendering. The same game scale agrees with the inherited jump-distance display, but fictional rover speeds remain fictional.
- Input is bilinearly resampled to 601 × 601 (~4.99 m samples). The compact connected export has **59,262 vertices / 117,552 triangles**, generally 8 m spacing inside the first area, up to 60 m in the distant margin. Extra 2 m axis samples resolve the single authored jump; these do not invent higher-resolution scientific measurements.
- Source crop elevation range: **−2,562.32 to −2,424.74 m**. `assets/terrain.json` records the exported mesh range, projection details and axes. No missing-data pixels were accepted in the crop.
- Anchor check: Williams et al. (2023) give the proposed Three Forks **landing-site** center as 18.45369687° N / 77.41359752° E and −2,548.673 m. Extracted elevation there is **−2,548.739 m**, a 0.066 m difference. This is an alignment sanity check, **not a claim of centimetre terrain accuracy**. The actual sample depot is separate, west of that proposed landing circle. [JPL team paper, LPSC 2618](https://www.hou.usra.edu/meetings/lpsc2023/pdf/2618.pdf).

`extract-terrain.py` documents the extraction and fails on missing data. It requires rasterio, numpy and Pillow as **authoring tools only**; no project dependencies were added. The scientific crop cache stays at `/private/tmp/astra-jezero-dem.npz`. Exported elevations are little-endian Float32, 237,048 bytes; `terrain.json` describes their layout. The in-game relief map is derived from these measurements, not the planning board's SVG. No scientific raster is required at runtime.

The terrain mesh's exact triangle interpolation drives wheel heights, launch/contact checks, camera clearance, tracks and map registration. Small traversable rubble and larger collidable stones are authored, deterministic art. Larger stone contact is a conservative circular footprint, including the shortcut's outcrops; it is not a detailed rover/rock solid-body solver.

## Authored liberties

The racing line, gates, energy cells, observation points and small rocks are fictional. Material colors, strata emphasis and sand ripples illustrate landform differences; they do not identify specific minerals. No cached NASA sample tubes can be collected. The only added terrain relief is a **3.5 m high rounded bump** at local east 600 m / north −700 m, with the approved prototype's 38/22-game-unit Gaussian widths. Mesh geometry includes the bump, so there is no invisible launch ramp. Dates do not control this study's light or stars.

The schematic Jezero planning board remains a design reference. Its drawn coordinates were not imported. This crop does not include a fully built Hawksbill Gap campaign, Ingenuity activity, Neretva corridor, Gale, inter-crater travel or the full western rim.

## Validation and remaining review

`node tools/prototypes/jezero/check.mjs` (Vite on port 5502) checks connected mesh edges, exact vertex contact heights, reference elevation, full laps in slowest/fastest kits, no broad-crest launches on that line, deliberate jump, all-kit shortcut clearance, ordered/reverse gates, airborne scan exclusion, discovery persistence, continued exploration, race records/replay, map/notes return, paused weather, nonmutating rendering and five layouts in Chromium/WebKit. Screenshots go to `/private/tmp`.

`performance.mjs` measures a short moving terrain-render workload in day/night/storm at laptop/phone viewport sizes under Chromium 4× CPU throttling. Set `BROWSER=webkit` for an unthrottled Apple-GPU comparison. It is a diagnostic, not a real-phone or complete-route performance guarantee. `interaction-check.mjs` additionally verifies simultaneous real Chromium touches, WebKit pointer/keyboard controls, rover-gallery return, lamp toggling and rejection of mixed-rover laps.

Required next producer review: drive a lap on Brian's Mac, explore the cliff base, cross the narrow shortcut, approach the jump from its north and repeat in night/storm; then test a real phone. Validate total frame time, sustained controls and thermal behavior before choosing integration or expanding the terrain. The proposed low-detail target remains sustained 30 fps on a real lower-end device. Campaign/production save integration, a production graphics fallback, final educational target identifications, broader geography and a full scientific-resolution art pass remain open.

### Recorded performance — 2026-09-14

After indexing nearby rock roofs (identical camera-clearance results), Chromium / SwiftShader with 4× CPU throttling, Performance resolution, and a short 199.5-game-unit/s route replay measured p95 frame intervals of **36 / 49 / 74 ms** at 1180×820 and **20 / 31 / 43 ms** at 390×844 for day/night/storm respectively. This renderer-only diagnostic draws without the game's 30 fps cap; it does not time the full driving/UI loop. These numbers **do not establish the proposed 30 fps real-device target**; storms remain the clearest performance risk. JavaScript heap reported ~19.3 MB, excluding GPU/process memory and the unopened detailed model gallery; terrain vertex/index arrays total 2,838,744 bytes each on CPU and GPU. Browser emulation and software GPU costs differ from a real phone.

Unthrottled WebKit reported **Apple GPU** and ~17 ms median / 18 ms p95 frame intervals across all six day/night/storm × laptop/phone-size runs. This is a short headless test on this Mac, not thermal-soak testing or a physical-phone result.

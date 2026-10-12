# Mars terrain rendering proof of concept

## Gallery update — 2026-09-15

The shared gallery now uses relative kit bars and a predecoded Perseverance asset (~12 MB), retaining the original NASA geometry/rig/materials. `decode-gallery-model.mjs` reproduces the export using the vendored decoder. Corrected landscape panel sizing prevents clipping. Only Three Forks supplies navigation tabs and optional mods; the original study retains standard kits. Exact reproduction of Brian’s reported phone problem still requires his symptom.

**Public mobile playtest:** this study is now packaged through the public PLAYTEST menu. See `docs/PLAYTEST.md` and newest STATUS for release verification. Older source-only notes below describe earlier checkpoints; campaign integration remains separate.

Start the normal Vite server and open `/tools/prototypes/mars-renderer/preview.html`.
The wrapper offers laptop, iPad, iPhone and rotation previews. `index.html` is the direct playable view.
Switch Current / Prototype at the same pose. Pause → Delta / Downhill / Buttes returns to reproducible
study viewpoints. Pause → Measure comparison runs stationary, normal-speed and boost-speed drawing workloads.

## Lighting lab continuation — 2026-09-14

Brian reopened hill-shadow investigation after the Three Forks playtest. [The isolated lighting lab](../lighting-lab/README.md) compares four modes, including soft terrain illumination with object-only cast shadows. Brian prefers Soft + objects; rock-shadow contact/filtering is being refined in the lab. Renderer switches are opt-in; this original preview retains its defaults. Brian subsequently requested Light only + Hold the light in Three Forks, which now selects that combination. The prior request to stop polishing shadows is superseded for the isolated study. No deployment or change to driving/camera/beam values.

## Three Forks continuation — 2026-09-14

Brian approved the real-area first pass. `../jezero/preview.html` now supplies a measured terrain crop and exploration/race loop to this study's shared driving, renderer, camera and weather modules. Optional area arguments preserve this original preview's defaults. Jezero-specific surface art does not change the approved lighting calculations. The new area has isolated local progress; **this original study still does not save**. Neither preview is deployed. See the new area's README and newest STATUS for scope and validation.

## Current state / producer handoff — 2026-09-14

**The sections below are chronological development history. Later amendments supersede earlier scope/value claims.** In particular, “shared stand-in”, “rover selection not integrated”, “day/dusk only”, “storms parked”, “no added ramp” and the original lighting/shadow methods are historical, not current limitations.

- Five selectable fictional driving kits and recognizable lightweight rover-family meshes; a paused, rotatable/zoomable Choose craft gallery uses NASA models for four rovers and a labeled Sojourner shape study. Use craft applies the choice; closing cancels. Real mass is reference-only, handling remains shared. Detailed gallery models are not loaded into driving geometry.
- Front/rear wheels visibly steer, including in flight. After takeoff, trajectory/heading/speed do not respond to pedals or steering; visible steering is cosmetic until landing. Ordinary crests stay planted; the authored highland dune supplies the deliberate long jump. No airborne boost-expiry speed snap.
- Current cruise speeds are 112 / 117.6 / 121.8 / 127.4 / 133 in kit order (Sojourner, Spirit, Opportunity, Curiosity, Perseverance). Drive-over boosts give +50% for 1.5 seconds with a smooth grounded exit taper. No charge/cooldown/overheat UI or speedometer. These are fictional game settings, not real rover speeds.
- Fixed-step display interpolation, bounded tracks and chassis movement; slope-following camera rides hills and retracts for actual obstructions instead of jerking into top-down framing. Collision radius 6.65 fits the simple model; exact final-model footprints remain an integration question.
- Approved world-positioned northern storm moves south, occludes with terrain, engulfs from any viewing direction, clears GPU tracks once, then leaves accelerated dissipating haze. No moving terrain/collision reset. No rigid layered walls or “eye”; preserve the current effect. True night and decorative stars are supported; they are not date-calculated sky positions.
- Forward high beams illuminate terrain/materials, use actual-geometry depth shadows, blend by ground clearance in jumps, retain short-range light in dust, and allow faint distant clear-air visibility. Tap the rover to toggle headlights. Tail/brake/deck/antenna lights retain rover readability. Minor terrain/contact shadows are intentionally suppressed; Brian accepts the near-final state and requests moving on.
- Image fallback and fresh-request Retry 3D cover failed/slow craft previews. Brian's exact Perseverance failure remains unconfirmed despite successful normal-load and forced-failure checks.

Current study still has no production save/records/discovery-book integration, real Jezero survey, final race, or date-accurate astronomy. `docs/JEZERO_LEVEL_PLAN.md` is the next planning entry point. Keep audio deferred. Do not change approved driving/light values as part of documentation or terrain research.

Rejected approaches to avoid restoring: isolated/overlapping terrain patches and rigid repeating colors; accidental broad-crest jumps; top-down obstacle avoidance; hard invisible boundary walls; control over flight; charge/release boost; timed screen-cloud storms; rigid beam cones/bright foreground-only pools; binary airborne ground-light cutoffs; moving height-field shadow artifacts. Earlier sections preserve experiments, not instructions to restore them.

Technical detail/checks: `CAMERA_NOTES.md`, `STORM_NOTES.md`, chronological amendments below, `chase-check.mjs`, `steering-check.mjs`, `collision-check.mjs`, `rover-visibility-check.mjs`, `lighting-continuity-check.mjs`, `headlight-toggle-check.mjs`. Run checks relevant to changes; current source imports mean the legacy comparison is not an immutable baseline.

## What is being tested

- WebGL 1 depth-buffered terrain/objects instead of Canvas face ordering.
- One connected, indexed ground grid: 43,470 vertices / 86,108 triangles. Dense around the delta,
  progressively wider spacing outside it. Shared edges have no overlapping near/far layers.
- Interpolated normals, broad low-contrast color and mipmapped procedural grain rather than per-tile colors.
- Existing outcrop footprints/geometry with quieter color; no new geology or real survey data.
- Simple 3D Sojourner stand-in with render-only slope contact. This is not final rover art.
- Existing expedition simulation, camera, sample and pickup definitions imported at runtime.
  Prototype-only contact preparation now suppresses broad-crest launches; live defaults remain unchanged (the contact-size amendment adds an optional radius).
  No progression, records, exploration dates or other browser storage is read/written.

## Boundaries

This is a renderer comparison, not a replacement expedition. It imports the current source modules;
changes there can change the comparison. Map, discovery book, rover selection, all production effects,
terrain streaming, detailed mission content and dated astronomy are not integrated. Day/dusk are fixed
lighting presets. Existing angular outcrop shapes still need an art pass. Sample labels test terrain
occlusion but not every obstacle. Broad far terrain is less detailed; grounded model height follows the
rendered surface. The contact-feel amendment below changes prototype takeoff only. The scene is illustrative, not surveyed Jezero.

No packages installed. Static mesh memory is a few MB; the comparison also loads the old renderer, so
this page is not a measurement of a final integrated game's total memory. WebGL failure/context loss
falls back to Current; reload to retry the prototype. That fallback remains expensive and is not a
complete low-end-device solution. Native graphics capabilities and a physical older device need testing.

## Validation and measured limits

`node tools/prototypes/mars-renderer/check.mjs` (Vite on port 5502) checks shared mesh edges, index limits,
finite vertices, depth-buffer drawing, unchanged simulation state during drawing, three poses, actual
keyboard driving, five viewport sizes, no saved state and Chromium/WebKit initialization. Screenshot
artifacts go to `/private/tmp`. Chrome uses SwiftShader in this test environment; WebKit reports Apple GPU.

2026-09-14: synthetic 4× CPU slowdown, 1180×820, 45 frames per renderer/speed: current p95 frame intervals
roughly 87–103 ms; prototype p95 roughly 21–24 ms across two runs. Drawing API timings are not isolated GPU execution timings, even
with `finish`; frame intervals are the more useful evidence. CPU emulation does not throttle the GPU
process/SwiftShader worker. These results are encouraging, not a physical-old-computer guarantee.
Keep boosts unchanged while comparing; speed was not the dominant cost in this experiment.

## Motion and tracks follow-up (2026-09-14)

Render poses now interpolate between fixed simulation steps; physics still runs at 60 Hz.
The model uses ground-relative jump clearance over the rendered height mesh and eased visual tilt.
Tracks occupy a fixed 2,048-strip ring (108 floats per paired segment, ~0.85 MiB each CPU/GPU buffer).
New segments upload individually; the oldest 128 fade before overwrite. Airborne/teleport gaps break
trails. Pose resets clear them. `node tools/prototypes/mars-renderer/motion-check.mjs` covers cadence,
heading wrapping, clearance, fixed capacity, ground conformance and gap/reset behavior.
`node tools/prototypes/mars-renderer/track-check.mjs` checks dark trail compositing over opaque ground
and full-capacity drawing without graphics errors in Chromium and WebKit (Vite on port 5502).
A later browser run with tracks measured ~26–30 ms p95 at 4× CPU slowdown; same emulation caveats apply.
Dust-storm whiteouts and hidden scenery/track refresh are a parked design, not active gameplay.

## Planted hill contact (2026-09-14)

Brian requests grounded ordinary crests, with intentional bump jumps retaining a floaty Mars descent.
`contact-feel.js` clears inherited climb velocity before the imported simulator decides takeoff unless
a local 12-unit profile has convex bend >= .12, rise > .04 and fall > .025. Eligible upward velocity
is capped at 18. These are illustrative suspension/launch settings, not physical mass measurements.
Airborne gravity, speed and controls remain imported unchanged; this is not a calibrated Mars/Earth
gravity comparison. Both renderer buttons use the new contact preparation for fair visual comparison.
The GPU camera maintains an eye height above the rendered rover, including during jumps.
No new ramp or terrain has been added; the existing dune bump is the proof of concept.
Pause → Hill climb / Dune bump provides repeatable producer playtests.

`node tools/prototypes/mars-renderer/contact-check.mjs` reproduces old launches and tests the new
policy in Chromium/WebKit. Two broad hill routes at 76/190 remain grounded; the dune route still
jumps at both speeds. Checks also cover airborne pedal independence, unchanged vertical acceleration
and on-screen jump framing. Full map coverage and physical-device feel remain producer review.

## Tight-gap collision proof (2026-09-14)

The displayed stand-in has a maximum horizontal corner radius of 6.543; the prototype now passes
6.6 to the shared contact solver instead of its default 10. This is a conservative enclosing circle,
not a rotating wheel/rectangle collider. Ground polygon footprints and rock approximations remain
unchanged; exact silhouettes and altitude-aware obstacle clearance are future refinements.
The live simulator/contact modules accept an optional radius; omitted arguments preserve the
existing live radius and reactions. Only this preview supplies the smaller radius.
Pause → Tight gap faces the Split towers: the old contact stalls at y≈289, while the prototype
passes through to y≈160 after three seconds. `collision-check.mjs` tests a 14-unit corridor,
head-on stopping, glancing slides and normal/boost-speed wall and rock contact.

## Obstruction camera and ridge jump (2026-09-14)

GPU preview now uses `chase.js`: retract toward the rover instead of climbing above obstacles,
with a short release hold and eased extension. See CAMERA_NOTES.md for research, measured jitter
causes, tests and close-wall limitations. Old `followAirborne` remains historical helper code; the
new camera handles jump framing itself. Current still uses the old camera and old rendered terrain.

`ground.js` adds one rounded dune at (4200, -440), height 14, Gaussian widths 38/22. The shared
simulator accepts an optional surface function; live callers keep their existing surface. The GPU
mesh and prototype driving use the new surface. This supersedes the earlier unchanged-terrain
comparison claim locally around that dune; delta benchmarking remains on unchanged terrain.
Pause → Ridge jump faces south from the highland lip into the lower basin. Straight runs at 76/190
yielded ~5.2 seconds of flight and ~395/985 world units to landing. These are illustrative game units,
not surveyed Mars distances. Existing takeoff cap, gravity and boost rules are unchanged.
Pause → Tower camera: reverse toward the tower, then drive forward to test retraction/return.
`node tools/prototypes/mars-renderer/chase-check.mjs` covers both additions.

## Wheel steering and fixed flight direction (2026-09-14)

The GPU stand-in now has separate wheel meshes. Front/rear pairs steer oppositely, the middle pair
stays aligned, and visible steering follows input even in flight. This is illustrative steering,
not an exact suspension model. The chassis and heading do not respond to airborne steering.
`driving.js` filters airborne inputs and opts out of the shared simulator's airControl flag
(default true for unchanged live callers), including boundary auto-turn. Gravity and obstacle
contact still apply. Boost expiry cannot change airborne speed. Controls resume after touchdown.
The enclosing contact radius is 6.65, covering the ~6.643 outer corner at steering lock; tight-gap
regression still passes. `steering-check.mjs` verifies trajectory/input independence at normal and
boost speed, steering response/centering, boundary behavior and model enclosure in both browsers.
The ridge boost run-up is a parked future layout idea.

## Responsive kits, short boosts and lamps (2026-09-14)

Pause → Rover selects a fictional ASTRA driving kit for each real rover name. The simple render
model is shared; selecting a kit resets motion/jump/boost at the current position. Sojourner has
the quickest acceleration, Perseverance the highest cruise speed; see kits.js for provisional
values. All five reach 95% cruise within .6–.83 s on the reference straight. Boost is 1.35× cruise
for 1.6 s, then grounded/unbraked overspeed decays smoothly (.65 s time constant). Braking and
collisions override the taper; airborne momentum stays fixed. Existing pickup locations remain.
Pause → Boost run points along a clear approach to an existing pickup. Rear lamps illuminate
when braking forward on the ground; no bloom/postprocessing or new HUD is used.
`kits-check.mjs` verifies response times, pickup activation, smooth expiry, brake/air behavior,
visible lamp pixels and kit selection in Chromium/WebKit. These changes are prototype-only.

## Suspension, storms and speed amendment (2026-09-14)

Brian explicitly raises the five cruise speeds by 40%: 112/117.6/121.8/127.4/133. Acceleration
stays unchanged. Boost is now +50% for 1.5 s; the prior +35%/1.6 s note is history. Exit taper
and airborne momentum remain. `effects.js` supplies a bounded chassis spring; wheel height
corrections follow terrain independently. Landing compression is derived from touchdown velocity
for presentation only, with no added physical bounce or camera shake.

**Historical storm pass, superseded by the spatial front below:** Dust storms used an inexpensive animated-gradient overlay: 3 s build, 4 s opaque, 4 s clear.
Only GPU track history resets, once at full opacity. No terrain chunks, collision surfaces,
rover position, samples or progress reset. Controls stay visible. Automatic first storm: 75 s
active play; subsequent wait: 110 s after clearing. Pause → Dust storm triggers immediately.
Pause, hidden tabs and benchmark freeze the storm clock. Cadence is a provisional playtest.
`effects-check.mjs` checks timing, pause, repeat, actual hidden track reset, speed multipliers
and real ridge landing compression in Chromium/WebKit. The old renderer does not gain suspension
or clear its own tracks; it remains a historical visual comparator.


## Moving storm front (2026-09-14)

Weather now occupies world coordinates: a textured, irregular brown dust front forms 1,800 game
units north of the rover, then travels south independently at 140 units/s. Looking away hides
the approaching front; local engulfment still occurs. Terrain and structures occlude the front.
The 1,500-unit band has gradual leading/trailing density changes. At full local opacity, GPU
tracks clear once; supporting terrain, collision and progress never change. The first automatic
start remains 75 seconds of active play; subsequent starts wait 110 seconds after the front
exits the southern boundary. Pausing/benchmarking freezes weather. These are compressed game
settings, not measured Martian weather. The earlier fixed 11-second overlay is superseded.

Pause → Delta → Dust storm: face north and wait roughly 13–15 seconds for arrival. Turn around
to compare approach versus engulfment. Driving changes encounter timing. The old-renderer
comparator only receives the local obscuration overlay, not the distant storm geometry.
`storm-check.mjs` checks travel, view direction, local density and browser rendering;
`effects-check.mjs` checks hidden track reset, pause and suspension. See [STORM_NOTES.md](STORM_NOTES.md)
for research and limitations. Prototype only; not deployed.


## Continuous dust and headlamps (2026-09-14)

Supersedes the three-curtain rendering described above. Twelve samples along each viewing ray
estimate continuous dust obscuration; no separated walls or hollow center remain. The moving
band/timing is unchanged. A sky pass joins the same haze as terrain. Fine screen grain avoids
stretching a ground texture vertically into stripes. The rover retains at least 32% of its
unfogged color contribution so it remains faintly readable. GPU mode disables the opaque CSS
overlay. Tracks fade with local density before reset; no nearby visible strips pop away.

Headlights activate at dusk and fade on as local dust arrives during daytime. Two small front
lamps and a soft ground footprint turn with the rover; no bloom, extra HUD or shadow map.
This approximation does not cast obstacle shadows or simulate volumetric light scattering.
`visibility-check.mjs` checks lamp activation and actual rover pixels in clear/day/dusk/dust
views in Chromium/WebKit, with screenshots. Physics is unchanged; prototype only, not live.


## Hill camera and stronger headlights (2026-09-14)

Supersedes the fixed-pitch prototype camera and unshadowed headlight footprint. GPU chase supplies
terrain separately from the combined obstacle surface: terrain raises/tilts the boom; structures
still retract it with the existing return hold. The highland traversal at X=4200, Y=-600…400
maintains a 74-unit arm (old minimum 2). The later obstacle zone remains intentionally retracting.

Headlights reach full strength at dusk, with a longer brighter but bounded footprint. Surface
angle affects lighting; a 64×64 local height field from the rendered terrain/scenery blocks light
behind hills and structures. Linear height filtering and bias soften self-shadow artifacts.
The field spans 256 units and refreshes after 12 units of movement; this is approximate, so small
features/overhangs and contact shadows are not exact. The lamps are cosmetic ASTRA equipment.
`hill-lamp-check.mjs` covers hill-versus-wall camera behavior and the local height encoding;
existing visibility/chase checks cover automatic lights, rover visibility and obstacle return.
No dust/weather or driving changes. Prototype only, not live.

Headlamp origin and vertical beam follow the terrain slope under the rover; the beam does not
light an entire tall facade. Local field refresh measured ~0.37 ms mean / 0.5 ms max in one
Chromium run (15 updates); this is not a whole-frame or old-device guarantee. Main suite:
2,557 passed + 2 skipped; both browser engines passed the hill/light and existing checks.


## Night and Choose craft (2026-09-14)

Pause → Light → Night; Night sky ⓘ explains the researched sky and the illustrative limits.
After a local storm, residual haze briefly veils sky and distance, then clears over roughly
40 seconds of active play. Lights remain available during dense haze. The front is unchanged.

Pause → Choose craft replaces the immediate rover dropdown with a modal 3D gallery. Browse,
rotate/zoom, inspect mission information and kit stats, then Use craft to apply. Closing cancels
selection. NASA models are local/lazy-loaded; the driving model remains simplified. Sojourner's
model is a labeled shape study. See [NIGHT_CRAFT_NOTES.md](NIGHT_CRAFT_NOTES.md) for sources,
licenses, distinction between real mission facts and game stats, and remaining work.
`night-craft-check.mjs` tests haze decay/pause, model loads, zoom, selection/cancel and responsive
controls in Chromium/WebKit. Set PROTOTYPE_URL to test against an alternate static server.


## Craft appearance and broad light (2026-09-14)

The shared driving body is superseded by lightweight rover-family bodies keyed to selected craft:
low flat Sojourner, solar-deck twins, and radioisotope-powered Curiosity/Perseverance with mast,
rear generator and arm details. Footprint/contact/steering stay unchanged; NASA gallery meshes
are not used while driving. `selection-light-check.mjs` verifies all five selections change the
actual rendered driving frame. Gallery model loads reset framing and have a matching poster
fallback; detailed views still depend on working WebGL. Headlight illumination now spreads
broadly with Gaussian falloff, retaining terrain occlusion and the existing range limits. Gesture
help moves behind ⓘ. Prototype only, not deployed.

The gallery's reported Perseverance visibility problem was reproduced after portrait resizing
and reopening: the model could sit off-screen. Explicit bounding-center and radius fitting now
runs on model load, reopen and viewport resize; ↺ restores it on demand. Browser regression
checks compare the camera target with the model center after the portrait/reopen sequence.
Validation: 2,557 tests passed + 2 skipped; gallery/haze/selection/layout checks pass in both
Chromium and WebKit. Source push is authorized; live integration remains separate.


## Forward headlight aim (2026-09-14 amendment)

Supersedes the range and field dimensions above: headlights illuminate forward only, with
brightness emphasized farther down the path and a soft distance fade from 185 to 230 units.
The shadow field is now 96×96 across 384 units, centered 65 units ahead of the rover; sample
spacing remains 4 units. Terrain/scenery still block the light, subject to the same approximate
height-field limitations. Driving, camera and weather remain unchanged.
`forward-light-check.mjs` verifies rear darkness, distant illumination and intervening terrain
shadows in Chromium/WebKit; `hill-lamp-check.mjs` passes with the expanded field. Main suite:
2,557 passed + 2 skipped. Prototype only, not deployed.


## High-beam rework (2026-09-14 amendment)

Brian's high-beam photo supersedes the prior bright foreground-pool treatment. Lighting now
preserves material colors, raises the virtual source, opens the vertical beam and fades over
320–680 units. The source/beam are artistic gameplay lighting, not a real rover specification.
Forward-only illumination and terrain/scenery occlusion remain. Occlusion uses a 128×128 field
covering 1,024 units, centered 240 ahead, with 8-unit spacing and 23 ray samples. Coverage is
larger but small/contact shadows are approximate; overhangs remain unsupported.

`forward-light-check.mjs` now checks ground at 450 units, a structure face 120 units high at
300 units distance, rear darkness and intervening shadows. Both browser engines, hill checks,
five-layout renderer checks and the main suite (2,557 passed + 2 skipped) pass. A local night
sample measured 0.2 ms median / 1.8 ms p95 drawing cost, not a whole-frame or old-device guarantee.
No driving/camera/weather changes; prototype only, not deployed.


## Shadow stability study (2026-09-14 amendment)

The height-field sampling grid is now anchored to world coordinates. Previously a 13-unit
cache-center shift changed represented stationary terrain heights by up to 2.60 units in a
synthetic ridge test; the same test now differs by less than 1e-6. Shadows use a receiver offset,
minimum visibility rather than repeated multiplication, and a separation-dependent soft edge.
Headlight strength/aim/range, field size and ray count are unchanged. Small rocks and contact
shadows still show coarse edges; overhangs remain unsupported. This is a focused first pass.

`shadow-check.mjs` covers cache stability and captures rocky/hilly traversals at night and dusk
in Chromium/WebKit with drawing timings. Both engines, existing high-beam/hill checks and the
main suite (2,557 passed + 2 skipped) pass. Local draw timings are not an old-device guarantee.
No driving/camera/weather changes. Prototype only, not deployed.


## Geometry shadows, rover lights and preview recovery (2026-09-14)

Supersedes the height-field shadow studies above: GPU lighting uses `headlight-shadow.js`, a
1,024² packed-depth view of actual terrain and scenery from the lamp. Two geometry draws,
a depth buffer, nine filtered comparisons and receiver-plane correction replace the stepped
rays. Shadow attachments cost roughly 6 MiB; small/contact edges remain approximate. The old
`lamp-ground.js` stays as historical study code, no longer used by GPU rendering. Approved
headlight brightness/aim/range stay unchanged.

Fictional ASTRA running/brake lights, amber deck markers and an antenna light vary with rover
family. A mild body-visibility floor and reduced obscuration for emissive lamps keep the rover
readable without clearing storm fog. No driving, camera or weather-evolution changes.

The gallery provides an independent image during 3D loading or failure and Retry 3D after
error/timeout. Retry uses a fresh request to avoid retaining a failed cached load. Normal local
Perseverance rendering succeeded; the exact reported failure remains unconfirmed. A deliberately
failed download is covered by `rover-visibility-check.mjs`, including recovery, selection and
running/brake lights in night/dust. `forward-light-check.mjs` now uses an actual low wall that
blocks the lamp while leaving the camera's view of the ground clear, instead of an invisible
height-field blocker. `shadow-check.mjs` captures rock/hill traversals and timing for both engines.
Main suite: 2,557 passed + 2 skipped. Prototype only, not deployed.


## Lighting continuity (2026-09-14 amendment)

A false-shadow reproduction used an unoccluded plane with smoothed/tilted shading normals:
previous receiver correction darkened pixels by up to 120 red-channel levels. Using actual
surface derivatives for the shadow receiver plane brings this to zero in Chromium/WebKit.
Depth packing disables color dithering. OES_standard_derivatives is used when available;
unsupported contexts retain the older shading-normal fallback.

During flight, the beam's lower lobe drops to weak peripheral spill; the core stays forward.
A faint clear-air night ambient term preserves distant terrain color independently of the lamp,
and is suppressed by dust/haze. Local dust attenuates lamp transmission over distance, with a
small near-rover reflected-light contribution surviving the camera fog. Weather timing,
physics, camera, marker lights and clear-air high-beam range/strength are unchanged.

`lighting-continuity-check.mjs` compares shadows against an unobstructed control, flight versus
downward spill, nearby/distant light in dense dust, and distant color contrast through haze.
Brightness alone is not a visibility measure: opaque haze can be brighter than dark terrain.
Both engines and the existing headlight/shadow/rover checks pass; main suite 2,557 passed +
2 skipped. Static jump/storm views inspected. Prototype only, not deployed.


## Small-relief filter and gradual flight lighting (2026-09-14)

Terrain shadow geometry is lowered 4 units only during the shadow pass. This deliberately
ignores tiny ground variations and some contact shadows; rendered terrain and collisions stay
unchanged, and separate rocks/scenery retain their original shadow geometry.

Supersedes the binary flight-light switch: height above terrain blends lower-beam suppression
and slope aim smoothly over 0–45 units. Below-rover illumination grows as the rover descends.
A near-level forward core gains a 1,000–1,800-unit fade in flight; grounded lighting still fades
at 320–680. Shadow depth coverage is now 2,000; texture size and tap count are unchanged.
Dust, manual headlight override, physics and camera remain unchanged.

Continuity checks cover an ordered descent sequence, identical lighting with either air flag
at equal altitude, and a lit structure 1,200 units ahead near flight height. The headlight test
checks a minor terrain ripple is ignored while a separate obstacle still blocks the beam.
Both browser engines and the main suite (2,557 passed + 2 skipped) pass. Prototype only.


## Grazing-angle streak filter (2026-09-14)

Shadow rejection now measures depth separation perpendicular to the receiver surface,
with a soft 0.8–2.5-unit threshold. The former along-ray threshold could turn tiny errors
under nearly horizontal light into long dark streaks. This intentionally reduces small/contact
shadows without changing the main lighting, flight blend, weather, sample count or passes.
Before/after rocky and tower views inspected; obstacle-shadow and continuity checks pass in
Chromium/WebKit. Main suite: 2,557 passed + 2 skipped. Prototype only.

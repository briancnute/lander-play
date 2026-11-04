# Apollo region evidence and interpretation

**Step 8 update (November 3):** All six default regions now use complete registered mission footprints at 1:1. Apollo 15 is 4 × 6 km, Apollo 16 is 3 × 10 km and Apollo 17 is 12 × 8 km, with measured terrain, four source-owned photos, immediate Free Ride, optional map transport and the LRV alongside the scooter. Current source limits and verification are in `docs/APOLLO_ROVER_REGIONS.md` and its linked dossiers. The earlier compressed dimensions, context-photo choices and approximate relief described below are retained as implementation history and no longer describe ordinary play. The explicit full-size Apollo 17 technical prototype remains separately saved.

**Step 5 update (November 3):** Apollo 11, 12 and 14 now use complete registered walking regions at 1:1 with measured 2 m terrain: 220 × 180 m, 750 × 650 m and 1.9 × 1.3 km. The earlier compressed dimensions below are retained as implementation history. Current sources, photo details, uncertainty and playtests are in `docs/APOLLO_WALKING_REGIONS.md` and its linked dossiers. Apollo 15–17 compact builds remain provisional; the full-size 17 preview is separate.

November 2, 2026. Local implementation; not published.

The six-region expansion is authorized by the producer's latest direction. One Apollo Expedition entry, with immediately available Expedition / Free Ride and transport among Apollo 11, 12, 14, 15, 16 and 17. Apollo 13 did not land and is not a landing region.

## Spatial method

Apollo 11 retains its existing SP-214 registration and 220 × 180 m extent. Later regions are interpretive teaching environments. They are not geodetic reconstructions, engineering CAD, or exact photographic camera matches. Equipment and astronauts remain human-sized. Travel distances and broad terrain relationships are compressed as below; crater depths and distant mountains are authored for readability and safe riding. Local viewing circles are deliberately offset from hardware, and equipment is an apparition without collision. Flag locations outside Apollo 11 are representative.

| Region | Playable game extent | Travel compression | Equivalent real extent | Selected relationships |
|---|---|---|---|---|
| 11 | 220 × 180 m | 1:1 | 220 × 180 m | Existing registered equipment and Little West |
| 12 | 500 × 380 m | 1:1 | 500 × 380 m | ALSEP west of Intrepid; Surveyor southeast, about 155 m away |
| 14 | 370 × 260 m | 6:1 | 2.22 × 1.56 km | Science west of Antares; Cone northeast |
| 15 | 320 × 380 m | 20:1 | 6.4 × 7.6 km | Station 1 southwest, Spur southeast, rille west of Falcon |
| 16 | 320 × 390 m | 20:1 | 6.4 × 7.8 km | Plum west and North Ray north of Orion |
| 17 | 410 × 310 m | 25:1 | 10.25 × 7.75 km | Shorty west-northwest and Station 6 northeast of Challenger |

Manual map readings used for layout, not precision claims:

- Apollo 14 NASA article map: Antares approximately pixel (78,217), 500 m scale about 109 pixels; Saddle Rock around (366,100). Source map in `14-map.jpg`.
- Apollo 15 NASA/LROC traverse map: Falcon around (400,94), 2 km scale about 216 pixels; Station 1 (330,425), Spur/7 (507,578), 9A (205,103). Source map in `15-map.png`.
- Apollo 16 NASA traverse map: Orion around (405,543), 2 km scale about 190 pixels; Plum/1 (260,545), North Ray/11 (396,110). Source map in `16-map.png`.
- Apollo 17 NASA traverse map: Challenger around (680,300), 1.5 km scale about 132 pixels; Shorty/4 (307,235), Station 6 (747,40). Source map in `17-map.jpg`.

Nearby tasks have roomier viewing positions instead of uniformly shrinking all equipment spacings. Thus these scale factors describe regional travel, not every centimetre of scenery. The MET and fender-repair stops explain tasks with context photographs whose captions explicitly distinguish the photograph location. Apollo 15's rille card uses a Station 1 context image, explicitly labeled as such, rather than claiming it depicts Station 9A. Apollo 12 now visits Head Crater’s documented trench (AS12-48-7051); its position and model are approximate readings of the NASA schematic traverse map, not survey registration. Apollo 14 does not falsely claim the astronauts reached Cone's rim.

Only Apollo 11 currently has traced historical footprint corridors. Other regions show a few representative base-area bootprints, not invented mapped astronaut traverses. The scooter wheel trail records the player's actual ride. No dotted navigation paths are drawn.

## NASA sources

- Landing coordinates and dates: https://nssdc.gsfc.nasa.gov/planetary/lunar/apolloland.html
- Apollo 12 mission: https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/
- Apollo 12 / Surveyor spacing: https://www.nasa.gov/missions/lunar-reconnaissance-orbiter-looks-at-apollo-12-surveyor-3-landing-sites/
- Apollo 12 photograph metadata: NASA Image and Video Library, IDs AS12-47-6897, AS12-47-6919, AS12-48-7133, AS12-48-7160.
- Apollo 14 photos, traverse and narrative: https://www.nasa.gov/history/50-years-ago-apollo-14-lands-at-fra-mauro/
- Apollo 15 photos and traverse: https://www.nasa.gov/history/50-years-ago-apollo-15-on-the-moon-at-hadley-apennine/
- Genesis Rock: https://science.nasa.gov/solar-system/moon/genesis-rock/
- Hadley Rille geology: Apollo 15 mission report, https://www.nasa.gov/wp-content/uploads/static/history/alsj/a15/ap15mr.pdf
- Apollo 16 photos and traverse: https://www.nasa.gov/history/apollo-16-on-the-moon-at-descartes/
- Apollo 17 photos and traverse: https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/

`sources.json` records the downloaded NASA asset URLs and SHA-256 hashes. Images are stored locally; no historical photo is AI-generated. Shared lunar-module geometry is an interpreted silhouette, not a mission-specific exact replica. Science packages, cart, rover, UV camera, Surveyor and sample boulders are schematic photo-informed models.

## Travel and riding

The Moon selector is a rotatable globe using Astra’s existing lunar albedo renderer and illustrated lighting, not a live orbital photograph. Drag rotates; wheel/pinch zooms; Near side restores the landing overview. Marker positions use NASA latitude/longitude. The scooter icon follows a projected spherical great-circle path; distance uses a 1,737.4 km mean lunar radius. The 3.5-second transition is skippable (0.8 seconds with reduced-motion preference). All six destinations are available immediately. Each region and mode has independent progress and position saves; original Apollo 11 v1/v2 keys remain intact.

Speed limits: Expedition 18 m/s (~40 mph), Free Ride 22 m/s (~49 mph), 4 m/s close to the persistent flagpole. Scoot Attack's existing unscored engine now runs in both modes. Double-tap Go hops; Brake becomes Trick in the air; F retains the special/manual input. No score timer or score records are added.

Crossing the playable edge starts a three-second warning. Grayscale increases from zero to full during active riding time. Turning back clears it immediately. At expiry the scooter returns to its last safe interior pose facing inward. Pauses, photo encounters and transport freeze this timer. Progress is not erased.

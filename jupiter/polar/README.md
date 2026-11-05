# Current artwork: atmospheric depth, v3

November 4, 2026: `polar-clearing-v3.jpg` places the collector in an imagined opening among ivory and slate-blue-gray polar cloud layers, with deeper cyclonic weather below and sparse local wisps. It is a scientific illustration, not a measured station-height view or current weather map. The region's complete cyclone ring extends beyond the frame.

Created with the built-in image-generation tool using the approved Red Spot asset as a rendering-quality reference. JPEG quality .95, original 1536 × 1024 dimensions. [Exact prompt](../../../docs/reference/jupiter-polar-depth/asset-prompt.md), [provenance and hash](../../../docs/reference/jupiter-polar-depth/assets.json), [research and implementation](../../../docs/JUPITER_POLAR_DEPTH.md).

The shared Jupiter atmosphere renderer anchors the artwork in world space, combines it with low-resolution local clouds and uses the existing flight camera for collection and return zoom. Elliptical flow now animates the painted cyclone swirls at different rates, and cloud bands and nearby wisps move independently. The storm centers and overall opening remain fixed.

Selected-date lighting is retained. All weather shares a pause-aware active-level clock, so clouds move while waiting on the platform without starting the collector's score timer. Pause, hidden tabs, results and countdowns freeze it; retries reset it. The motion is accelerated illustrative weather, not measured local winds or a dated weather forecast, and adds no wind force. See [weather animation](../../../docs/JUPITER_ACTIVE_WEATHER.md). The v1/v2 files below remain archived.

---

# Historical artwork: lower cloud-top view, v2

November 4, 2026: the producer requested a closer viewpoint while preserving the original style. That revision used the three `*-v2.jpg` compositions in this directory. They show a local cloud horizon and partial storm banks, without the orbital limb or a complete top-down storm pattern. The v1 assets and provenance below are retained as history.

Created with the built-in image-generation tool from the original artwork as a style reference; these are authored illustrations, not spacecraft photographs. Portrait and wide views are separately composed. JPEG encoding uses quality 0.93 at original dimensions. See [all prompts](../../../docs/reference/jupiter-redesign/scenery/asset-prompts.md), [asset manifest](../../../docs/reference/jupiter-redesign/scenery/assets.json) and [science/design notes](../../../docs/JUPITER_REDESIGN.md). Selected-date lighting and existing camera-crop behavior are retained; cloud evolution itself is not animated.

---

# Jupiter north-pole scenery

Three original AI-generated matte illustrations for ASTRA’s Polar Cyclone Ring Collector, produced with the built-in image-generation tool. Each depicts one central cyclone and eight surrounding cyclones. These are illustrative, enhanced visible-light views, not NASA photographs, true-color reconstructions, current cyclone observations, or exact station sightlines.

Geometry: [NASA/JPL JunoCam northern cyclone composite (2020)](https://www.jpl.nasa.gov/images/pia24237-all-eight-northern-circumpolar-cyclones-in-2020/); image data NASA/JPL-Caltech/SwRI/MSSS; processing Gerald Eichstädt and John Rogers. The [2017 JIRAM composite](https://science.nasa.gov/resource/cyclones-encircle-jupiters-north-pole/) also establishes the eight-around-one arrangement; its orange heat colors are intentionally not used. Cloud relief, perspective and color contrast are artistically enhanced.

That runtime chose portrait, standard or wide composition and uniformly covered the viewport. A centered texture crop follows the square root of the existing camera zoom relative to the aspect-fitted survey view, keeping more cyclone detail than a full-strength zoom on portrait screens. A single exposure treatment follows ASTRA's selected date or Day/Dusk/Night preset. The background has no collision geometry and does not depict a solid surface. The fictional powered platforms and capsule route are rendered separately at game scale. See the [scenery zoom follow-up](../../../docs/JUPITER_SCENERY_ZOOM.md).

Final prompts, dimensions and source PNG provenance: [asset-prompts.md](../../../docs/reference/jupiter-polar/asset-prompts.md). Scientific references: [research.md](../../../docs/reference/jupiter-polar/research.md).

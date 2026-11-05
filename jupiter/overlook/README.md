# Current artwork: animated Red Spot clearing, v3

The runtime uses `grs-clearing-v3.jpg`, the approved 1536 × 1024 illustrated opening among rust-colored cloud banks and a deeper cream cloud deck. Local shader flow now moves its cloud detail along the banks and through small eddies, with faster nearby volumetric wisps. The clearing, art plane, lighting and shared flight camera stay fixed. The introductory photograph has been removed from the launch sequence.

Motion uses accelerated illustrative weather, not measured winds or a forecast for the selected date. It advances only while the level is active, freezes on pause/hidden/results, and resets on retry. No wind force is added to the craft. See [art provenance](../../../docs/JUPITER_RED_SPOT_ARRIVAL.md) and [weather animation](../../../docs/JUPITER_ACTIVE_WEATHER.md).

---

# Historical artwork: lower cloud-top view, v2

November 4, 2026: the producer requested a closer viewpoint while preserving the original style. That revision used the three `*-v2.jpg` compositions in this directory. They show a local cloud horizon and partial storm banks, without the orbital limb or a complete top-down storm pattern. The v1 assets and provenance below are retained as history.

Created with the built-in image-generation tool from the original artwork as a style reference; these are authored illustrations, not spacecraft photographs. Portrait and wide views are separately composed. JPEG encoding uses quality 0.93 at original dimensions. See [all prompts](../../../docs/reference/jupiter-redesign/scenery/asset-prompts.md), [asset manifest](../../../docs/reference/jupiter-redesign/scenery/assets.json) and [science/design notes](../../../docs/JUPITER_REDESIGN.md). Selected-date lighting and existing camera-crop behavior are retained; cloud evolution itself is not animated.

---

# Great Red Spot Overlook artwork, v1

Original AI-generated illustrations made with the built-in image-generation tool on November 3, 2026. They are authored game scenery, not spacecraft photographs or a reconstruction of weather on the selected date. No NASA image pixels are distributed in these assets.

| Asset | Size | Role |
| --- | --- | --- |
| `grs-day-standard-v1.jpg` | 1536 × 1024 | Desktop and intermediate aspect ratios |
| `grs-day-portrait-v1.jpg` | 848 × 1855 | Tall phone composition |
| `grs-day-wide-v1.jpg` | 1846 × 852 | Wide landscape composition |

The three final generated outputs were encoded as JPEG at quality 0.94, without chroma subsampling, for a combined 1,668,678 bytes. Encoding changes the file format, not the composition. The runtime uses uniform cover scaling, never independently scales the storm's horizontal and vertical axes, and caches the canvas until viewport or lighting changes. After producer feedback, a centered texture crop now follows the square root of the existing camera zoom relative to its wide view. This gives the distant clouds a restrained approach response without changing the shared camera or uploading the image each frame. See the [scenery zoom follow-up](../../../docs/JUPITER_SCENERY_ZOOM.md).

## Reference and interpretation

- [NASA/Juno: Great Red Spot in true color](https://science.nasa.gov/resource/jupiters-great-red-spot-in-true-color/), PIA21775, July 2017. The reference was taken about 13,917 km above the clouds and shows the storm as a muted orange oval within pale turbulent bands. Its published credit is NASA/JPL-Caltech/SwRI/MSSS/Björn Jónsson. Used for research and visual comparison only.
- [NASA/Cassini: Jupiter portrait](https://science.nasa.gov/photojournal/cassini-jupiter-portrait/), PIA04866. Cream and reddish-brown bands, white ovals and sheared cloud streaks inform the palette and structure.
- [NASA/Juno: the Great Red Spot](https://www.jpl.nasa.gov/images/pia23606-the-great-red-spot/). Useful for internal storm filaments and the surrounding pale cloud texture; distinguish enhanced processing from natural color.

The game's oblique composition, enlarged cloud relief and increased contrast make the storm recognizable behind the craft at phone size. A real natural-color view is softer. Black space above the limb and distant cloud structure imply a high viewpoint; the scene does not claim an exact station altitude. Strong fixed gravity (24.79 m/s²) is ASTRA's nominal gameplay reference, not a gravity prediction at the spacecraft imagery's altitude. The powered station, no-drag play envelope and working lamps are fictional.

The selected date controls solar direction and day/night exposure at the shared approximate geographic pin. It does not simulate cloud evolution, the storm's drifting longitude or an orbiting station. The illustration's short-flight cloud pattern is held still: racing texture motion would overstate the visible movement of a storm of this scale. Platform propulsion provides the local sense of hovering.

## Generation provenance

See [the complete prompts](../../../docs/reference/jupiter-overlook/asset-prompts.md). Built-in image generation was used, with the first generated landscape as the reference for subsequent compositions. The discarded intermediate 2:3 portrait remains outside the project. Final originals are retained by the tool under `/Users/briannute/.codex/generated_images/01a1a200-c5ea-79e1-aa91-f51a767d03a2/`:

- Standard: `exec-df231c1b-58cb-4d0b-b959-242745caea62.png`
- Portrait: `exec-bc596cef-28f5-4aa6-8efa-b2b9257755b1.png`
- Wide: `exec-645bca54-9d4b-4ed1-99a8-05568ea3de26.png`

The game references only the project-contained JPEGs; it has no dependency on that generation directory.

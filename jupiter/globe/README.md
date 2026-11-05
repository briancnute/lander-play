# Jupiter globe map

`PIA07782.jpg` is the unchanged NASA Photojournal download of **Cassini's Best Maps of Jupiter (Cylindrical Map)**, observed December 11–12, 2000 and published March 27, 2006.

**Credit: NASA/JPL/Space Science Institute.**

- Source and description: https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/
- Original image: https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia07/pia07782/PIA07782.jpg
- Image use policy: https://www.jpl.nasa.gov/jpl-image-use-policy/

The near-eye-color composite uses near-infrared and blue images. Its complete cylindrical projection spans 360° longitude and 180° planetocentric latitude, north at the top, with 0° longitude at the center. ASTRA samples it east-positive with wrapped longitude. Polar detail is naturally softer than equatorial detail.

Run `node tools/generate-jupiter-texture.mjs` from the repository root to derive the embedded 1536×768 RGB map. Jupiter's fine cloud structure needs more samples than the former 512×256 map: each central texel now spans approximately one pixel at the existing 500-pixel settled globe diameter, instead of three. This retains nine times as many source pixels. Fixed-size comparisons at 512, 1024, 1536 and 2048 columns showed most of the available improvement by 1536; 2048 adds substantial transfer size for a small remaining gain at the current renderer limit.

The globe sampler, lighting, zoom and camera remain unchanged. The shared renderer still uses a coarser raster during dragging and time-lapse, then restores settled detail. The generator records the original image's SHA-256 in the generated module. The supplied colors are retained; no synthetic storms, sharpening filter or bump relief are added.

A fixed +18° sampling offset registers the photographed Red Spot (~48°W) to ASTRA's existing illustrative activity location (~66°W). This is a static historical cloud snapshot, not a current System III weather reconstruction. Selected date/time continues to control ASTRA's lighting and celestial positions; it does not simulate changing cloud formations. The separate atmospheric flight scenes and mission physics are unchanged.

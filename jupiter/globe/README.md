# Jupiter globe map

`PIA07782.jpg` is the unchanged NASA Photojournal download of **Cassini's Best Maps of Jupiter (Cylindrical Map)**, observed December 11–12, 2000 and published March 27, 2006.

**Credit: NASA/JPL/Space Science Institute.**

- Source and description: https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/
- Original image: https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia07/pia07782/PIA07782.jpg
- Image use policy: https://www.jpl.nasa.gov/jpl-image-use-policy/

The near-eye-color composite uses near-infrared and blue images. Its complete cylindrical projection spans 360° longitude and 180° planetocentric latitude, north at the top, with 0° longitude at the center. ASTRA samples it east-positive with wrapped longitude. Polar detail is naturally softer than equatorial detail.

Run `node tools/generate-jupiter-texture.mjs` from the repository root to derive the embedded 512×256 RGB map. This matches the Mars/Venus texture dimensions and uses the existing globe sampler, lighting, zoom and camera. The generator records the original image's SHA-256 in the generated module. The supplied colors are retained; no synthetic storms or bump relief are added.

A fixed +18° sampling offset registers the photographed Red Spot (~48°W) to ASTRA's existing illustrative activity location (~66°W). This is a static historical cloud snapshot, not a current System III weather reconstruction. Selected date/time continues to control ASTRA's lighting and celestial positions; it does not simulate changing cloud formations. The separate atmospheric flight scenes and mission physics are unchanged.

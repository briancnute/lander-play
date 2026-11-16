# Saturn browser globe assets

Original JPEGs retrieved November 13, 2026 from NASA/JPL sources below. No raster edits or generated replacement maps. Download URLs, byte counts, credits and hashes are in [provenance.json](provenance.json).

- `titan.jpg`: JPL/Caltech; David Seal. **Fictitious haze concept with Voyager-derived colors**, 720 × 360. [JPL texture catalog](https://space.jpl.nasa.gov/tmaps/saturn.html). This is explicitly labeled an illustrative haze globe in the browser. It is not a surface map or a current atmospheric reconstruction.
- `enceladus.jpg`: NASA/JPL-Caltech/Space Science Institute. [Cassini PIA14937](https://science.nasa.gov/photojournal/map-of-enceladus-december-2011/), a global cylindrical mosaic including December 2011 observations. Downloaded NASA's 1536 × 807 display JPEG. The sampler reads only the map rectangle `(35, 30, 1476, 736)` to omit the title, border and scale; the original file remains unchanged. This is a browsing globe, not the terrain for the later expedition. The initial Voyager candidate was replaced after visual review showed incomplete coverage.

Both files use the same cached equirectangular texture sampler and globe renderer as Jupiter's four moons. Existing repository disk photographs are used only as selector/menu thumbnails, not stretched onto the globe. The browser adds lighting using a synchronous reference frame; the surface-map longitude registration is approximate. No named landing sites are placed using these textures.

The Saturn provider uses the foundation's independently checked Horizons window, November 13–20, 2026. Outside that window it retains a fixed reference orientation and labels the preview illustrative; no extrapolated moon positions are inserted into Solar. Broader ephemeris coverage remains milestone 9.

Browser science copy: [NASA Titan facts](https://science.nasa.gov/saturn/moons/titan/facts/) and [NASA Enceladus](https://science.nasa.gov/saturn/moons/enceladus/). Titan's hydrocarbons and Enceladus's ocean/plumes distinguish the two destinations; their expeditions are not implemented by milestone 4.

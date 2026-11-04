# Measured Moon flight scenery

Selected November 4, 2026 for the isolated `playtest/moon-flight-scenes` preview.

- `aristarchus`: native 3 m / 204 m square flight pocket and 12 m / 9 km square wall context. Confidence codebook mismatch is explicitly unclassified.
- `shackleton`: 4 m / 4 km square foreground, sourced from confidence-filtered NAC and measured LOLA, plus 80 m / 40 km square context. Source provenance and the chosen low-Sun horizon audit are retained.

Each manifest defines the exact anchor, geographic frame, binary grids, sources and limits. Float32 little-endian heights are **source-datum metres above a lunar reference sphere**, not already pad-relative heights. Columns run west to east; rows north to south. Source files are unflattened and unexaggerated. The renderer separately documents curvature, data-resolution collars, a small authored landing clearance, representative detail and illustrative lighting in `docs/MOON_FLIGHT_BACKGROUNDS.md`.

Reproduction scripts are under `tools/surveys/moon-flight/`; they use Python with NumPy, Rasterio/GDAL, SciPy, Pillow and Certifi. `aristarchus_build.py --fetch` retrieves its published inputs; `shackleton_build.py` retrieves its published inputs by default. Both accept `--cache`. The corresponding `*_verify.py` scripts independently inspect the default source caches and retained outputs. The Shackleton lighting/review scripts retain the source horizon and coverage evidence. All source URLs and hashes are recorded; do not substitute visual browse confidence images for the canonical quality data.

This package changes no saved course identity or regular activity entrance. It is not a NASA landing certification, a selected Artemis touchdown location or a claim that every rendered small rock was surveyed.

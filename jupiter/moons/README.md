# Galilean moon selector imagery

NASA source derivatives obtained November 3, 2026. All four local JPEGs are 512 × 512, black-background globe crops with native macOS `sips` resizing/re-encoding only. No generated detail, color replacement, labels, or synthetic surface features were added. Sources and final derivatives were visually inspected.

| Local asset | Source and credit | Processing |
| --- | --- | --- |
| `io-globe-v1.jpg` | [PIA02308](https://science.nasa.gov/photojournal/global-image-of-io-true-color/), NASA/JPL/University of Arizona; [source JPEG](https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02308/PIA02308.jpg) | 1280² delivered source resized to 512². Galileo July 3, 1999 mosaic approximates visible color using near-infrared, green and violet filters. |
| `europa-globe-v1.jpg` | [PIA00502](https://science.nasa.gov/photojournal/pj-natural-and-false-color-views-of-europa/), NASA/JPL/DLR; [source JPEG](https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia00/pia00502/PIA00502.jpg) | Left, approximately natural-color globe from the two-globe comparison. 1280×640 delivered source cropped to 640² at x=1,y=0, then resized to 512². Galileo September 7, 1996. The right false-color globe was excluded. |
| `ganymede-globe-v1.jpg` | [PIA00716](https://science.nasa.gov/resource/ganymede-galileo/), NASA/JPL; [source JPEG](https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/g/gal_gn1_961007-1.jpg) | 1024² delivered source cropped to 820² at x=140,y=110, resized to 512². Natural-color Galileo composite from June 26, 1996. |
| `callisto-globe-v1.jpg` | [PIA03456](https://science.nasa.gov/image-detail/amf-pia03456/), NASA/JPL/DLR; [source JPEG](https://images-assets.nasa.gov/image/PIA03456/PIA03456~orig.jpg) | 740×753 source cropped to 700² at x=20,y=30, resized to 512². Global color image; no assertion of exact naked-eye color. |

Europa PIA19048 was also inspected but not used: its partial illuminated disk in a rectangular frame was less suitable for the stable four-globe layout. The selected full-disk natural-color PIA00502 better preserves recognizability at touch-target sizes.

The display arrangement, moon enlargement and observation deck are illustrative, not a simulation of current orbital positions or apparent sizes. See `docs/reference/jupiter-moons/research.md` for source-supported facts and the independent gravity derivation.

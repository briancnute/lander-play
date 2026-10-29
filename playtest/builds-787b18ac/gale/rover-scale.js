// Gale terrain uses 8/3 render units per geographic metre in all axes.
// NASA/JPL: Curiosity tires are 40 cm wide. Wheel-center spacing follows
// the existing rendered rover (geometry.js wheelPivots), not an engineering
// reconstruction of its suspension. Historical route data supplies centerlines,
// not surveyed wheel impressions; retain every source gap.
// https://www.jpl.nasa.gov/news/breaks-observed-in-rover-wheel-treads/
export const CURIOSITY_TREAD_PROFILE=Object.freeze({halfWidth:.4*(8/3)/2,halfTrack:3.78});

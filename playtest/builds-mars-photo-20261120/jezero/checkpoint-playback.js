// Presentation time scale after a mandatory fact; the rover keeps its momentum.
export function checkpointPlayback(seconds){const t=Math.max(0,Math.min(1,seconds/3));return t*t*(3-2*t);}

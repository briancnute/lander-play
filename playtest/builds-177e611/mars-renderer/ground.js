const {ground:baseGround}=await import(/* @vite-ignore */ new URL('../../../extras/expedition/sim.mjs',import.meta.url).href);
// One authored rounded dune at the highland lip; all distant terrain remains the shared landscape.
export const ridge={x:4200,y:-440};
export function ground(x,y){return baseGround(x,y)+14*Math.exp(-(((x-ridge.x)/38)**2+((y-ridge.y)/22)**2));}

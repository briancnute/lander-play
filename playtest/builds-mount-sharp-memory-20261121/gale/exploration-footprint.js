// Geographic metres relative to Bradbury Landing, matching the pinned NASA traverse.
// Keep the broad summit as scenery; these bounds apply only to rover exploration.
export const EXPLORATION_FOOTPRINT=Object.freeze({west:-7500,east:2500,south:-16000,north:2000});
export function explorationBounds(units=8/3){const b=EXPLORATION_FOOTPRINT;return {minX:b.west*units,width:b.east*units,minY:-b.north*units,maxY:-b.south*units};}
export function insideFootprint(p,b){return p.x>=b.minX&&p.x<=b.width&&p.y>=b.minY&&p.y<=b.maxY;}
export function relocateExplorationSave(saved,bounds,stops){
 if(!saved||insideFootprint(saved.position,bounds))return saved;
 const p=stops.reduce((a,b)=>Math.hypot(b.x-saved.position.x,b.y-saved.position.y)<Math.hypot(a.x-saved.position.x,a.y-saved.position.y)?b:a);
 return {...saved,position:{x:p.x,y:p.y,heading:saved.position.heading},relocatedFrom:{...saved.position}};
}

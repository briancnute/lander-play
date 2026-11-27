import {boundsOfMesh,inFlightRange} from './flight-detail.js';
import {meshBytes,distanceToBounds,residentMeshes} from './streamed-meshes.js';

// Retain deterministic source/collision data, but not GPU copies of all twelve
// photo sites. The draw-range predicate is identical to the original renderer.
export function createStreamedDetails(gpu,source){
 const details=source.map((m,key)=>({key,source:m,bounds:boundsOfMesh(m.vertices),bytes:meshBytes(m),range:m.drawRange,material:m.material??0}));
 const cache=residentMeshes(gpu,{maxBytes:24*1024*1024,maxBuilds:4,budgetMs:3});
 return {get pending(){return cache.pending;},get stats(){return cache.stats;},draw(s){
  const visible=details.filter(m=>m.range?inFlightRange(m.bounds,{...s,terrainRange:m.range}):!s.helicopter||inFlightRange(m.bounds,s)).sort((a,b)=>distanceToBounds(a.bounds,s.terrainObserver??s)-distanceToBounds(b.bounds,s.terrainObserver??s));
  cache.update(visible.map(m=>({key:m.key,bytes:m.bytes,load:()=>m.source})));
  for(const m of visible){const entry=cache.entries.get(m.key);if(entry)gpu.mesh(entry.mesh,[0,0,0,100],m.material);}
 },dispose(){cache.dispose();}};
}

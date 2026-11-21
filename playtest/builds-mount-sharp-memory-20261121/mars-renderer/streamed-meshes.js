export const meshBytes=m=>(m.vertices?.byteLength??0)+(m.indices?.byteLength??0);
export function releaseMesh(gpu,mesh){gpu.gl.deleteBuffer(mesh.b);if(mesh.index)gpu.gl.deleteBuffer(mesh.index);}
export const distanceToBounds=(b,s)=>Math.hypot(Math.max(b.minX-s.x,0,s.x-b.maxX),Math.max(b.minY-s.y,0,s.y-b.maxY));

// Build/upload nearest entries first, keeping a hard byte budget. Source loaders
// return temporary arrays; only the GPU cache retains detailed ground geometry.
export function residentMeshes(gpu,{maxBytes=8*1024*1024,maxBuilds=2,budgetMs=4}={}){
 const entries=new Map();let bytes=0,builds=0,evictions=0,pending=false;
 function remove(key){const entry=entries.get(key);releaseMesh(gpu,entry.mesh);bytes-=entry.bytes;entries.delete(key);evictions++;}
 return {entries,get pending(){return pending;},get stats(){return {count:entries.size,bytes,maxBytes,builds,evictions,pending};},
  update(candidates){
   // Callers order by distance. Reservations prevent a large remote chunk from
   // displacing the fine contact mesh beneath the rover.
   const wanted=new Map();let reserved=0;
   for(const c of candidates){if(reserved+c.bytes>maxBytes)continue;wanted.set(c.key,c);reserved+=c.bytes;}
   for(const key of entries.keys())if(!wanted.has(key))remove(key);
   const start=performance.now();let count=0;
   for(const [key,c] of wanted){
    if(entries.has(key))continue;
    if(count>=maxBuilds||count&&performance.now()-start>=budgetMs)break;
    const data=c.load(),size=meshBytes(data);
    if(size>c.bytes||bytes+size>maxBytes)throw Error('Terrain mesh exceeded its reserved memory budget.');
    entries.set(key,{mesh:gpu.upload(data.vertices,data.indices),bytes:size});bytes+=size;builds++;count++;
   }
   pending=entries.size<wanted.size;
  },dispose(){pending=false;for(const key of entries.keys())remove(key);}
 };
}

import {inFlightRange} from './flight-detail.js';
import {distanceToBounds,residentMeshes,releaseMesh} from './streamed-meshes.js';

// Coarse terrain is always available; detailed survey tiles replace it only
// once uploaded. Teleports and quick reversals cannot reveal a missing tile.
export function createStreamedWorldTerrain(gpu,tiles){
 const groups=[],high=residentMeshes(gpu);let batch=[],vertices=0,indexCount=0;
 function flush(){
  if(!batch.length)return;
  const v=new Float32Array(vertices*9),indices=new Uint16Array(indexCount),entries=[];let base=0,offset=0;
  for(const {tile,i} of batch){const m=tile.low;v.set(m.vertices,base*9);const start=offset;for(const n of m.indices)indices[offset++]=base+n;entries.push({i,start,end:offset});base+=m.vertices.length/9;}
  groups.push({mesh:gpu.upload(v,indices),bytes:v.byteLength+indices.byteLength,entries,indices,scratch:new Uint16Array(indices.length),signature:''});
  // Ground sampling uses survey rasters, never these disposable visual arrays.
  for(const {tile} of batch)tile.low=null;
  batch=[];vertices=indexCount=0;
 }
 for(let i=0;i<tiles.length;i++){const tile=tiles[i];if(vertices+tile.low.vertices.length/9>60000)flush();batch.push({tile,i});vertices+=tile.low.vertices.length/9;indexCount+=tile.low.indices.length;}
 flush();
 return {groups,high,get pending(){return high.pending;},get stats(){return {...high.stats,tiles:tiles.length,coarseBytes:groups.reduce((n,g)=>n+g.bytes,0)};},draw(s){
  const candidates=s.helicopter?[]:tiles.map((tile,key)=>({key,tile,distance:distanceToBounds(tile,s)})).filter(c=>c.distance<2400).sort((a,b)=>a.distance-b.distance);
  high.update(candidates.map(c=>({key:c.key,bytes:c.tile.highByteBound,load:c.tile.build})));
  for(const g of groups){const visible=g.entries.map(e=>s.helicopter?inFlightRange(tiles[e.i],s):!high.entries.has(e.i)),signature=visible.map(v=>v?'1':'0').join('');
   if(signature!==g.signature){let count=0;for(let i=0;i<g.entries.length;i++)if(visible[i]){const e=g.entries[i];g.scratch.set(g.indices.subarray(e.start,e.end),count);count+=e.end-e.start;}
    const gl=gpu.gl;gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,g.mesh.index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,g.scratch.subarray(0,count),gl.DYNAMIC_DRAW);g.mesh.count=count;g.signature=signature;
   }if(g.mesh.count)gpu.mesh(g.mesh,[0,0,0,100],0);
  }
  for(const {mesh} of high.entries.values())gpu.mesh(mesh,[0,0,0,100],0);
 },dispose(){high.dispose();for(const g of groups)releaseMesh(gpu,g.mesh);}};
}

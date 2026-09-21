// Batch distant terrain into portable 16-bit meshes; keep contact-matching tiles nearby.
export function createWorldTerrain(gpu,tiles){
 const groups=[];let entries=[],vertices=[],indices=[];
 function flush(){if(!entries.length)return;const mesh=gpu.upload(new Float32Array(vertices),new Uint16Array(indices));groups.push({mesh,entries,indices:new Uint16Array(indices),signature:''});entries=[];vertices=[];indices=[];}
 const high=tiles.map(t=>({tile:t,mesh:gpu.upload(t.vertices,t.indices)}));
 for(let i=0;i<tiles.length;i++){
  const t=tiles[i],m=t.low??t;if(vertices.length/9+m.vertices.length/9>60000)flush();
  const base=vertices.length/9,start=indices.length;
  for(const v of m.vertices)vertices.push(v);for(const index of m.indices)indices.push(index+base);
  entries.push({i,start,end:indices.length});
 }
 flush();
 return {groups,high,draw(s){
  const near=tiles.map(t=>Math.hypot(Math.max(t.minX-s.x,0,s.x-t.maxX),Math.max(t.minY-s.y,0,s.y-t.maxY))<2400);
  for(const g of groups){const signature=g.entries.map(e=>near[e.i]?'1':'0').join('');if(signature!==g.signature){
   const indices=new Uint16Array(g.indices.length);let count=0;for(const e of g.entries)if(!near[e.i]){indices.set(g.indices.subarray(e.start,e.end),count);count+=e.end-e.start;}
   const gl=gpu.gl;gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,g.mesh.index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices.subarray(0,count),gl.DYNAMIC_DRAW);g.mesh.count=count;g.signature=signature;
  }if(g.mesh.count)gpu.mesh(g.mesh,[0,0,0,100],0);}
  for(let i=0;i<high.length;i++)if(near[i])gpu.mesh(high[i].mesh,[0,0,0,100],0);
 }};
}

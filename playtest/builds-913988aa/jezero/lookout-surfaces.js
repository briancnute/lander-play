import {triangle} from '../mars-renderer/triangle.js';

// Surface character from approved frames, not surveyed individual rocks. These
// thin, terrain-following facets change color only, never the contact surface.
export const lookoutSurfaces=[
 {id:'touchdown',seed:31,count:170,radius:210,color:[.48,.35,.27],size:5},
 {id:'seitah-view',seed:181,count:210,radius:240,color:[.53,.41,.31],size:10},
 {id:'western-rim',seed:1356,count:190,radius:230,color:[.55,.40,.29],size:6},
 {id:'falbreen',seed:1516,count:230,radius:240,color:[.71,.57,.43],size:18},
];
export function buildLookoutSurfaces(ground,sites){
 const vertices=[],patches=[];
 for(const spec of lookoutSurfaces){
  const site=sites.find(p=>p.id===spec.id);if(!site)continue;
  let seed=spec.seed;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const start=vertices.length;
  for(let i=0;i<spec.count;i++){
   const a=random()*Math.PI*2,r=18+Math.sqrt(random())*(spec.radius-18),x=site.x+Math.cos(a)*r,y=site.y+Math.sin(a)*r;
   const size=1+random()**2*spec.size,angle=random()*Math.PI*2,ring=[];
   for(let k=0;k<6;k++){const t=angle+k*Math.PI/3,scale=.65+random()*.35,px=x+Math.cos(t)*size*scale,py=y+Math.sin(t)*size*scale*.65;ring.push([px,py,ground(px,py)+.08]);}
   const tone=(random()-.5)*.06,color=spec.color.map(v=>v+tone);
   for(let k=0;k<6;k++)triangle(vertices,[x,y,ground(x,y)+.08],ring[k],ring[(k+1)%6],color);
  }
  patches.push({id:spec.id,vertexStart:start/9,vertexCount:(vertices.length-start)/9});
 }
 return {vertices:new Float32Array(vertices),patches};
}

import {box,triangle} from '../mars-renderer/geometry.js';
export function helicopterMeshes(gpu,ramp){
 const body=[],door=[],rotor=[],loadingRamp=[];
 const metal=[.68,.55,.34],edge=[.24,.30,.29],glass=[.10,.24,.28];
 box(body,-22,-24,20,44,48,2,metal); // cargo floor, open rear
 for(const x of [-23,21])box(body,x,-24,22,2,43,25,metal);
 box(body,-23,-24,47,46,43,2,metal);box(body,-21,18,23,42,12,21,edge);
 triangle(body,[-21,30,25],[21,30,25],[-21,18,45],glass);triangle(body,[21,30,25],[21,18,45],[-21,18,45],glass);
 for(const x of [-23.1,23.1])box(body,x,5,32,.25,12,10,glass);
 box(body,-3,-52,36,6,29,4,metal);box(body,-1,-55,36,2,7,20,edge);
 for(const x of [-26,25]){box(body,x,-29,3,1,57,2,edge);for(const y of [-16,16])box(body,x,y,5,1,2,17,metal);}
 box(body,-2,-2,49,4,4,13,edge);box(rotor,-65,-1,62,130,2,1,edge);box(rotor,-1,-65,63,2,130,1,edge);
 box(door,-21,-24,22,42,2,25,metal);
 // Mesh origin is the craft's centre, so banking rotates around its cabin.
 for(const vertices of [body,door,rotor])for(let i=0;i<vertices.length;i+=9)vertices[i+2]-=32;
 for(let i=1;i<ramp.sections.length;i++){
  const a=ramp.sections[i-1],b=ramp.sections[i],side=(p,d)=>[p.x+Math.cos(p.heading)*d,p.y+Math.sin(p.heading)*d,p.z+.4];
  const l=side(a,-ramp.widthAt(a.s)),r=side(a,ramp.widthAt(a.s)),ll=side(b,-ramp.widthAt(b.s)),rr=side(b,ramp.widthAt(b.s));
  triangle(loadingRamp,l,r,ll,[.50,.45,.34]);triangle(loadingRamp,r,rr,ll,[.50,.45,.34]);
  for(const d of [-ramp.widthAt(a.s),ramp.widthAt(a.s)]){const p=side(a,d);box(loadingRamp,p[0]-1,p[1]-1,p[2],2,2,8,[.88,.77,.37]);}
 }
 return {body:gpu.upload(new Float32Array(body)),door:gpu.upload(new Float32Array(door)),rotor:gpu.upload(new Float32Array(rotor)),ramp:gpu.upload(new Float32Array(loadingRamp))};
}

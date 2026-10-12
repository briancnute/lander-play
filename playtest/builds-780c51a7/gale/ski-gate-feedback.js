import {box} from '../mars-renderer/geometry.js';
import {gatePulse} from './ski-gate-pulse.js';
export function createGateFeedback(gpu,course){
 const upload=v=>gpu.upload(new Float32Array(v));
 // Fixed geometry and brightness steps: no allocations or buffer uploads per frame.
 const palettes=[[.08,1,.29],[1,.075,.045]],effects=palettes.map(color=>Array.from({length:8},(_,i)=>{
  const light=(i+1)/8,pole=[],halo=[];
  box(pole,-.94,-.94,0,1.88,1.88,15,color.map(v=>v*light));
  box(pole,-.98,-.98,13.5,1.96,1.96,1.5,color.map(v=>(v*.5+.5)*light));
  // Two feathered vertical ellipses give a soft halo without a full-screen pass.
  for(let plane=0;plane<2;plane++)for(let n=0;n<20;n++){
   const vertex=(angle,center=false)=>{const w=center?0:Math.cos(angle)*3.8,z=center?7.5:7.5+Math.sin(angle)*10;
    halo.push(plane?0:w,plane?w:0,z,0,0,1,...color.map(v=>center?v*.17*light:0));};
   vertex(0,true);vertex(n*Math.PI/10);vertex((n+1)*Math.PI/10);
  }
  return {pole:upload(pole),halo:upload(halo)};
 }));
 const sparks=Array.from({length:6},(_,i)=>{const v=[],size=.65+i*.07;box(v,-size/2,-size/2,0,size,size,size,[.40,1,.57]);return upload(v);});
 const gates=course.gates.map(g=>[-1,1].map(side=>{const u=g.u+side*g.half,p=course.point(g.s,u);return {x:p.x,y:p.y,z:course.height(g.s,u)};}));
 return {draw(run){
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches,gl=gpu.gl;
  for(const event of run.gateFeedback??[]){const pulse=gatePulse(event,run.time,reduced);if(!pulse)continue;
   const mesh=effects[event.hit?0:1][Math.min(7,Math.floor(pulse.light*8))];
   for(const p of gates[event.index]??[]){
    if(pulse.light>.05){gpu.mesh(mesh.pole,[p.x,p.y,p.z,0],7);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);gl.depthMask(false);gpu.mesh(mesh.halo,[p.x,p.y,p.z,0],7);gl.depthMask(true);gl.disable(gl.BLEND);}
    if(pulse.sparks)for(let i=0;i<sparks.length;i++){const age=pulse.age-i*.035;if(age<0||age>.32)continue;const angle=i*2.4;gpu.mesh(sparks[i],[p.x+Math.cos(angle)*age*6,p.y+Math.sin(angle)*age*6,p.z+15+age*(19+i*3),0],7);}
   }
  }
 }};
}

import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {gatePulse} from './ski-gate-pulse.js';
export function createGateFeedback(gpu,course){
 const upload=v=>gpu.upload(new Float32Array(v));
 const effects=[[.141,.420,.271],[.745,.286,.282]].map((color,index)=>{
  const pole=[],symbol=[];box(pole,-.94,-.94,0,1.88,1.88,15,color);
  const strokes=index?[[[-2,18],[2,22]],[[-2,22],[2,18]]]:[[[-2.6,20],[-.6,18]],[[ -.6,18],[3,22.5]]];
  // Camera-facing symbols retain their silhouette while carving. A narrow ivory
  // edge makes the solid forest-green check readable against rust and shadow.
  for(const [width,tint,y] of [[1.5,[.94,.90,.80],0],[.85,color,-.035]])for(const [a,b] of strokes){
   const dx=b[0]-a[0],dz=b[1]-a[1],k=width/(2*Math.hypot(dx,dz)),ox=-dz*k,oz=dx*k;
   const p=[a[0]+ox,y,a[1]+oz],q=[b[0]+ox,y,b[1]+oz],r=[b[0]-ox,y,b[1]-oz],s=[a[0]-ox,y,a[1]-oz];triangle(symbol,p,q,r,tint);triangle(symbol,p,r,s,tint);
  }
  return {pole:upload(pole),symbol:upload(symbol)};
 });
 const gates=course.gates.map(g=>[-1,1].map(side=>{const u=g.u+side*g.half,p=course.point(g.s,u);return {x:p.x,y:p.y,z:course.height(g.s,u)};}));
 return {draw(run){for(const event of run.gateFeedback??[]){if(!gatePulse(event,run.time))continue;const mesh=effects[event.hit?0:1];for(const p of gates[event.index]??[]){gpu.mesh(mesh.pole,[p.x,p.y,p.z,0],7);gpu.mesh(mesh.symbol,[p.x,p.y,p.z,gpu.camera?.h??0],7);}}}};
}

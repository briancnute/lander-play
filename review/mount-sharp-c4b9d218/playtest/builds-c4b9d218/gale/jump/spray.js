import {triangle} from '../../mars-renderer/triangle.js';
import {landingPose} from './landings.js';
// A bounded set of grains, sampled from the authored stop path. No per-frame
// allocation of GPU buffers; simulation age owns motion, including pause/retry.
export function createLandingSpray(gpu,course){
 const vertices=[],snow=!!gpu.area?.skiEnvironment,color=snow?[.88,.91,.92]:[.72,.57,.43];
 triangle(vertices,[-.45,0,0],[.45,0,0],[0,0,.85],color);
 triangle(vertices,[0,-.35,0],[0,.35,0],[0,0,.85],color);
 const mesh=gpu.upload(new Float32Array(vertices));
 return {draw(run){
  const f=run?.finishStop,score=run?.finalLanding?.points??0;if(!run?.jump||!f||score<60)return;
  const sn=Math.sin(f.heading),cs=Math.cos(f.heading);
  for(let i=0;i<18;i++){
   const born=.12+i*.045,age=f.age-born;if(age<0||age>.65)continue;
   const p=landingPose(score,born,f.speed),spread=(8+i%5*2)*age;
   const lx=p.x+spread,ly=p.y+(i%3-1)*age*5;
   const x=f.x+lx*cs-ly*sn,y=f.y+lx*sn+ly*cs;
   const z=(course.worldHeight?.(x,y)??course.surface(x,y))+.15+(4+i%4)*age-4.95*age*age;
   gpu.mesh(mesh,[x,y,z,f.heading+i],1);
  }
 }};
}

import {triangle} from '../mars-renderer/triangle.js';
const gold=[1,.76,.32];
export function groundTriangle(out,c,s,u=0,half=10,length=46,color=gold){
 const p=(s,u)=>{const q=c.point(s,u);return [q.x,q.y,c.height(s,u)+.6];};
 triangle(out,p(s+length/2,u),p(s-length/2,u+half),p(s-length/2,u-half),color);
}
export function boostBar(out,c,s,half=155){for(let u=-half+10;u<half;u+=20)groundTriangle(out,c,s,u,9,44);}

// Prebuilt warm/dim faces avoid per-frame buffer uploads. The pulse travels toward the lip.
export function createJumpSignals(gpu,c,lips){
 const signals=lips.map(lip=>[150,95,40].map(d=>[[.42,.17,.10],[1,.57,.31]].map(color=>{
  const v=[];groundTriangle(v,c,lip-d,0,10,46,color);return gpu.upload(new Float32Array(v));
 })));
 return {draw(state){const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,phase=Math.floor((state.t??0)*5)%4;
  for(const signal of signals)for(let i=0;i<3;i++)gpu.mesh(signal[i][reduced||phase===i?1:0],[0,0,0,100],7);
 }};
}

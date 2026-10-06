import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {createRouteRibbon} from '../jezero/route-ribbon.js';
import {LENGTH,WIDTH,GATES,RAMPS,ITEMS,itemAltitude} from './ski-run.js';
export function buildSkiWorld(gpu,course){
 const v=[],metal=[.34,.42,.43],mint=[.53,.87,.76],sand=[.68,.45,.30];
 for(const r of RAMPS)for(let s=r.s-130;s<r.s;s+=10)for(let u=r.u-65;u<r.u+65;u+=10){const p=(a,b)=>{const q=course.point(a,b);return [q.x,q.y,course.height(a,b)+.4];};triangle(v,p(s,u),p(Math.min(s+10,r.s),u),p(s,u+10),sand);triangle(v,p(Math.min(s+10,r.s),u),p(Math.min(s+10,r.s),u+10),p(s,u+10),sand);}
 for(const s of [0,LENGTH]){const p=course.point(s),z=course.height(s);for(const x of [-32,32]){box(v,p.x+x,p.y-12,z,2,24,20,metal);box(v,p.x+x-2,p.y-12,z+20,6,24,2,mint);}box(v,p.x-32,p.y-12,z+22,66,2,2,mint);}
 const ramps=gpu.upload(new Float32Array(v));
 const post=[];box(post,-1,-1,0,2,2,23,metal);box(post,-1,-1,19,14,2,4,mint);const gate=gpu.upload(new Float32Array(post));
 const token=[];for(const side of [-1,1]){triangle(token,[0,0,23],[-7,0,13],[0,side*5,13],[1,.76,.32]);triangle(token,[0,0,23],[0,side*5,13],[7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[0,side*5,13],[-7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[7,0,13],[0,side*5,13],[1,.76,.32]);}const item=gpu.upload(new Float32Array(token));
 const platform=[];box(platform,-10,-13,-3,20,26,2,[.3,.4,.4]);for(const x of [-10,9])box(platform,x,-13,-1,1,26,1,mint);const carrier=gpu.upload(new Float32Array(platform));
 const blades=[];for(const x of [-5.6,3.6]){box(blades,x,-11,-.6,2,23,.8,[.6,.72,.7]);box(blades,x,10,.2,2,3,1.1,mint);}gpu.skiBladeMesh=gpu.upload(new Float32Array(blades));
 const lines=[-WIDTH,WIDTH].map(u=>({points:Array.from({length:156},(_,i)=>course.point(i*40,u))}));
 const edge=createRouteRibbon(gpu,lines,course.surface,{halfWidth:1.6,color:mint,emissive:true});
 const paths=[-130,130].map(u=>({points:Array.from({length:156},(_,i)=>course.point(i*40,u))}));
 const choices=createRouteRibbon(gpu,paths,course.surface,{halfWidth:1,color:[.92,.72,.37],emissive:true});
 return {draw(state,run){if(state.liftCarrier)gpu.mesh(carrier,[state.x,state.y,state.z,state.heading]);gpu.mesh(ramps,[0,0,0,100],0);edge.draw(state);choices.draw(state);for(let i=0;i<GATES.length;i++){if(run&&i<run.next)continue;const g=GATES[i];for(const u of [g.u-85,g.u+85]){const p=course.point(g.s,u);if(Math.hypot(p.x-state.x,p.y-state.y)<1800)gpu.mesh(gate,[p.x,p.y,course.height(g.s,u),0],7);}}for(let i=0;i<ITEMS.length;i++){if(run?.items.includes(i))continue;const t=ITEMS[i],p=course.point(t.s,t.u);if(Math.hypot(p.x-state.x,p.y-state.y)<1500)gpu.mesh(item,[p.x,p.y,itemAltitude(course,t)-13,state.t*.5],7);}}};
}

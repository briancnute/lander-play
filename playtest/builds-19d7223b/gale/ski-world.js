import {raceSurface} from '../mars-renderer/race-surface.js';
import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {LENGTH,RAMPS,ROLLERS,ITEMS,itemAltitude} from './ski-course.js';
export function buildSkiWorld(gpu,course){
 const v=[],metal=[.34,.42,.43],mint=[.53,.87,.76],sand=[.68,.45,.30];
 for(const r of [...RAMPS,...ROLLERS])for(let s=r.s-r.run;s<r.s+r.run*.55;s+=20)for(let u=r.u-r.width;u<r.u+r.width;u+=20){const p=(a,b)=>{const q=course.point(a,b);return [q.x,q.y,course.height(a,b)+.2];},ss=Math.min(s+20,r.s+r.run*.55),uu=Math.min(u+20,r.u+r.width);triangle(v,p(s,u),p(ss,u),p(s,uu),sand);triangle(v,p(ss,u),p(ss,uu),p(s,uu),sand);}
 for(const s of [0,LENGTH]){const p=course.point(s),z=course.height(s);for(const x of [-32,32]){box(v,p.x+x,p.y-5,z,3,10,3,metal);box(v,p.x+x,p.y-5,z+3,3,10,.3,mint);}}
 // A weathered descent corridor and low rock shoulders give depth/turn cues.
 // These are scenery, not gates; riders can leave either side freely.
 const track=[],route=[];
 for(let s=0;s<=course.length;s+=400)route.push(course.point(s));route.push(course.point(course.length));
 gpu.skiRoad={...raceSurface(gpu.gl,route,190,false),style:3};
 for(let s=0;s<course.length;s+=800){
  const width=180+30*Math.sin(s*.0017);
  for(const side of [-1,1]){const q=course.point(s,side*(width+40)),z=course.height(s,side*(width+40));const a=[q.x-11,q.y-7,z],b=[q.x+9,q.y-6,z],c=[q.x+7,q.y+8,z],d=[q.x-8,q.y+6,z],top=[q.x-2,q.y+1,z+9];for(const [v,w]of [[a,b],[b,c],[c,d],[d,a]])triangle(track,v,w,top,[.40,.30,.24]);}
 }
 const corridor=gpu.upload(new Float32Array(track));
 const ramps=gpu.upload(new Float32Array(v));
 const token=[];for(const side of [-1,1]){triangle(token,[0,0,23],[-7,0,13],[0,side*5,13],[1,.76,.32]);triangle(token,[0,0,23],[0,side*5,13],[7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[0,side*5,13],[-7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[7,0,13],[0,side*5,13],[1,.76,.32]);}const item=gpu.upload(new Float32Array(token));
 const platform=[];box(platform,-10,-13,-3,20,26,2,[.3,.4,.4]);for(const x of [-10,9])box(platform,x,-13,-1,1,26,1,mint);const carrier=gpu.upload(new Float32Array(platform));
 const blades=[];box(blades,-1,-10,-.6,2,20,.8,[.6,.72,.7]);
 // Raised tapered nose, with a short sloped connection rather than a vertical block.
 for(const side of [-1,1])triangle(blades,[side,10,.2],[side*.65,13,1.3],[-side,10,.2],mint);
 box(blades,-.65,12,1.1,1.3,1,.25,mint);gpu.skiBladeMesh=gpu.upload(new Float32Array(blades));
 const mounts=[];for(const x of [-4.6,4.6])box(mounts,x-.55,-1,.1,1.1,2,1.4,metal);gpu.skiMountMesh=gpu.upload(new Float32Array(mounts));
 return {draw(state,run){if(run)gpu.mesh(corridor,[0,0,0,100],1);if(state.liftCarrier)gpu.mesh(carrier,[state.x,state.y,state.z,state.heading]);gpu.gl.uniform1f(gpu.locations.roadEnabled,run?3:0);gpu.mesh(ramps,[0,0,0,100],0);gpu.gl.uniform1f(gpu.locations.roadEnabled,0);if(run)for(let i=0;i<ITEMS.length;i++){if(run.items.includes(i))continue;const t=ITEMS[i],p=course.point(t.s,t.u);if(Math.hypot(p.x-state.x,p.y-state.y)<2100)gpu.mesh(item,[p.x,p.y,itemAltitude(course,t)-13,state.t*.5],7);}}};
}

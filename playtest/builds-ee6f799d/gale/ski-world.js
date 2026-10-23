import {createGateFeedback} from './ski-gate-feedback.js';
import {turboInlay,basaltKicker} from './ski-course-art.js';
import {raceSurface} from '../mars-renderer/race-surface.js';
import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {LENGTH,RAMPS,ROLLERS,ITEMS,itemAltitude} from './ski-course.js';
export function buildSkiWorld(gpu,course){
 const {ramps:RAMPS,rollers:ROLLERS,items:ITEMS}=course;
 const v=[],markers=[],metal=[.34,.42,.43],mint=[.53,.87,.76],sand=[.68,.45,.30];
 for(const r of [...RAMPS,...ROLLERS])for(let s=r.s-r.run;s<r.s+r.run*.55;s+=20)for(let u=r.u-r.width;u<r.u+r.width;u+=20){const p=(a,b)=>{const q=course.point(a,b);return [q.x,q.y,course.height(a,b)+.2];},ss=Math.min(s+20,r.s+r.run*.55),uu=Math.min(u+20,r.u+r.width);triangle(v,p(s,u),p(ss,u),p(s,uu),sand);triangle(v,p(ss,u),p(ss,uu),p(s,uu),sand);}
 for(const s of course.landingScored?[0]:[0,course.finish??course.length]){const p=course.point(s),z=course.height(s);for(const x of s===0?[-32,32]:[-165,165]){box(markers,p.x+x,p.y-5,z,3,10,3,metal);box(markers,p.x+x,p.y-5,z+3,3,10,.3,mint);}}
 // A nearby checker line identifies the finish without a floating label.
 const end=course.finish??course.length,p=(s,u)=>{const q=course.point(s,u);return [q.x,q.y,course.height(s,u)+.5];};
 for(let s=end-20;!course.landingScored&&s<end+20;s+=10)for(let u=-150;u<150;u+=25){const color=(Math.round((s-end)/10)+Math.round(u/25))%2?[.87,.88,.74]:[.19,.28,.28];triangle(markers,p(s,u),p(s+10,u),p(s,u+25),color);triangle(markers,p(s+10,u),p(s+10,u+25),p(s,u+25),color);}
 // Slalom uses slender colored poles; no fabric flags obscure the gate opening.
 for(const [i,g]of (course.gates??[]).entries())for(const side of [-1,1]){const p=course.point(g.s,g.u+side*g.half),z=course.height(g.s,g.u+side*g.half),color=i%2?[.30,.72,.94]:[.95,.36,.20];box(markers,p.x-.85,p.y-.85,z,1.7,1.7,15,color);box(markers,p.x-.88,p.y-.88,z+12,1.76,1.76,1.5,[.95,.83,.65]);}
 gpu.skiRoad={...raceSurface(gpu.gl,course.route??[course.top,course.base],155,false),style:3};
 const corridor=gpu.upload(new Float32Array());
 const ramps=gpu.upload(new Float32Array(v));
 const slalomMarkers=gpu.upload(new Float32Array(markers)),gateFeedback=createGateFeedback(gpu,course);
 const token=[];for(const side of [-1,1]){triangle(token,[0,0,23],[-7,0,13],[0,side*5,13],[1,.76,.32]);triangle(token,[0,0,23],[0,side*5,13],[7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[0,side*5,13],[-7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[7,0,13],[0,side*5,13],[1,.76,.32]);}const item=gpu.upload(new Float32Array(token));
 const upload=v=>gpu.upload(new Float32Array(v)),pad=ITEMS.find(t=>t.kind==='slalom-boost'),inlay=pad?turboInlay(course,pad.s,pad.radius):{stone:[],light:[],spent:[]},boostStone=upload(inlay.stone),boostItem=upload(inlay.light),boostSpent=upload(inlay.spent),kicker=basaltKicker(course),basalt=upload(environmentRock(kicker.rock)),grooves=upload(environmentRock(kicker.seams));
 function environmentRock(vertices){if(!gpu.area?.skiEnvironment)return vertices;for(let i=0;i<vertices.length;i+=9){const tone=vertices[i+6];vertices[i+6]=tone*.72;vertices[i+7]=tone*.85;vertices[i+8]=tone;}return vertices;}
 const platform=[];box(platform,-10,-13,-3,20,26,2,[.3,.4,.4]);for(const x of [-10,9])box(platform,x,-13,-1,1,26,1,mint);const carrier=gpu.upload(new Float32Array(platform));
 const blades=[];box(blades,-1,-10,-.6,2,20,.8,[.6,.72,.7]);
 // Raised tapered nose, with a short sloped connection rather than a vertical block.
 for(const side of [-1,1])triangle(blades,[side,10,.2],[side*.65,13,1.3],[-side,10,.2],mint);
 box(blades,-.65,12,1.1,1.3,1,.25,mint);gpu.skiBladeMesh=gpu.upload(new Float32Array(blades));
 const mounts=[];for(const x of [-4.6,4.6])box(mounts,x-.55,-1,.1,1.1,2,1.4,metal);box(mounts,-5.15,-.7,1.4,10.3,1.4,.65,metal);for(const x of [-2.2,1.6])box(mounts,x,-3,1.5,.6,6,.6,metal);gpu.skiMountMesh=gpu.upload(new Float32Array(mounts));
 return {draw(state,run){if(run)gpu.mesh(corridor,[0,0,0,100],1);if(state.liftCarrier)gpu.mesh(carrier,[state.x,state.y,state.z,state.heading]);gpu.gl.uniform1f(gpu.locations.roadEnabled,run?3:0);gpu.mesh(ramps,[0,0,0,100],7);if(run){gpu.mesh(slalomMarkers,[0,0,0,100],7);gateFeedback.draw(run);gpu.mesh(basalt,[0,0,0,100],1.25);gpu.mesh(grooves,[0,0,0,100],7);gpu.mesh(boostStone,[0,0,0,100],1);gpu.mesh(run.items.includes(ITEMS.indexOf(pad))?boostSpent:boostItem,[0,0,0,100],7);}gpu.gl.uniform1f(gpu.locations.roadEnabled,0);if(run)for(let i=0;i<ITEMS.length;i++){if(run.items.includes(i)||ITEMS[i].kind==='slalom-boost')continue;const t=ITEMS[i],p=course.point(t.s,t.u);if(Math.hypot(p.x-state.x,p.y-state.y)<2100)t.kind==='slalom-boost'?gpu.mesh(boostItem,[0,0,0,100],7):gpu.mesh(item,[p.x,p.y,itemAltitude(course,t)-13,state.t*.5],7);}}};
}

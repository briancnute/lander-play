import {SCALE_TRIAL} from './slalom-scale-trial.js';
import {createReadableFlags} from './readable-flags.js';
import {createLandingSpray} from './jump/spray.js';
import {createGateFeedback} from './ski-gate-feedback.js';
import {turboInlay,basaltKicker} from './ski-course-art.js';
import {raceSurface} from '../mars-renderer/race-surface.js';
import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {LENGTH,RAMPS,ROLLERS,ITEMS,itemAltitude} from './ski-course.js';
export function buildSkiWorld(gpu,course){
 const landingSpray=createLandingSpray(gpu,course),readableFlags=course.gatePennants?createReadableFlags(gpu,course):null;
 const {ramps:RAMPS,rollers:ROLLERS,items:ITEMS}=course;
 const v=[],markers=[],gateVertices=(course.gates??[]).map(()=>[]),finishVertices=[],metal=[.34,.42,.43],mint=[.53,.87,.76],sand=[.68,.45,.30];
 for(const r of [...RAMPS,...ROLLERS])for(let s=r.s-r.run;s<r.s+r.run*.55;s+=20)for(let u=r.u-r.width;u<r.u+r.width;u+=20){const p=(a,b)=>{const q=course.point(a,b);return [q.x,q.y,course.height(a,b)+.2];},ss=Math.min(s+20,r.s+r.run*.55),uu=Math.min(u+20,r.u+r.width);triangle(v,p(s,u),p(ss,u),p(s,uu),sand);triangle(v,p(ss,u),p(ss,uu),p(s,uu),sand);}
 for(const s of course.countdownLaunch?[course.finish??course.length]:course.landingScored?[0]:[0,course.finish??course.length]){const p=course.point(s),z=course.height(s);for(const x of s===0?[-32,32]:[-165,165]){const q=course.airborneFinish?course.point(s,x):{x:p.x+x,y:p.y-5},h=course.airborneFinish?course.height(s,x):z;box(markers,q.x,q.y,h,3,10,3,metal);box(markers,q.x,q.y,h+3,3,10,.3,mint);}}
 // A nearby checker line identifies the finish without a floating label.
 const end=course.finish??course.length,p=(s,u)=>{const q=course.point(s,u);return [q.x,q.y,course.height(s,u)+.5];};
 for(let s=end-20;!course.landingScored&&s<end+20;s+=10)for(let u=-150;u<150;u+=25){const color=(Math.round((s-end)/10)+Math.round(u/25))%2?[.87,.88,.74]:[.19,.28,.28];triangle(course.reactiveGates?finishVertices:markers,p(s,u),p(s+10,u),p(s,u+25),color);triangle(course.reactiveGates?finishVertices:markers,p(s+10,u),p(s+10,u+25),p(s,u+25),color);}
 // Amber paired markers announce the natural final crest without shaping terrain.
 if(course.jumpMarker)for(const side of [-1,1])for(const back of [0,35]){const s=course.jumpMarker-back,q=course.point(s,side*100),z=course.height(s,side*100);box(markers,q.x-1.5,q.y-1.5,z,3,3,20,[1,.65,.18]);box(markers,q.x-2,q.y-2,z+17,4,4,3,[1,.88,.5]);}
 // Slalom uses slender colored poles; no fabric flags obscure the gate opening.
 for(const [i,g]of (course.gates??[]).entries())for(const side of [-1,1]){const p=course.point(g.s,g.u+side*g.half),z=course.height(g.s,g.u+side*g.half),color=(g.color?g.color==='blue':i%2)?[.30,.72,.94]:[.95,.36,.20];box(course.reactiveGates?gateVertices[i]:markers,p.x-.85,p.y-.85,z,1.7,1.7,15,color);box(course.reactiveGates?gateVertices[i]:markers,p.x-.88,p.y-.88,z+12,1.76,1.76,1.5,[.95,.83,.65]);
  if(course.gatePennants){const v=gateVertices[i],h=course.heading(g.s),dx=Math.cos(h)*side,dy=Math.sin(h)*side;box(v,p.x-.9,p.y-.9,z+15,1.8,1.8,9,color);const a=[p.x,p.y,z+24],b=[p.x+dx*15,p.y+dy*15,z+19],c=[p.x,p.y,z+14];triangle(v,a,b,c,[.96,.92,.78]);triangle(v,c,b,a,[.96,.92,.78]);const aa=[p.x+dx*1.4,p.y+dy*1.4,z+22],bb=[p.x+dx*12,p.y+dy*12,z+19],cc=[p.x+dx*1.4,p.y+dy*1.4,z+16];triangle(v,aa,bb,cc,color);triangle(v,cc,bb,aa,color);}
 }
 gpu.skiRoad=course.reactiveGates?null:{...raceSurface(gpu.gl,course.route??[course.top,course.base],155,false),style:3};
 if(course.reactiveGates)gpu.skiRoad=null;
 const gateMeshes=gateVertices.map(v=>gpu.upload(new Float32Array(v))),finishMesh=gpu.upload(new Float32Array(finishVertices));
 const corridor=gpu.upload(new Float32Array());
 const ramps=gpu.upload(new Float32Array(v));
 const slalomMarkers=gpu.upload(new Float32Array(markers)),gateFeedback=createGateFeedback(gpu,course);
 const token=[];for(const side of [-1,1]){triangle(token,[0,0,23],[-7,0,13],[0,side*5,13],[1,.76,.32]);triangle(token,[0,0,23],[0,side*5,13],[7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[0,side*5,13],[-7,0,13],[1,.76,.32]);triangle(token,[0,0,3],[7,0,13],[0,side*5,13],[1,.76,.32]);}const item=gpu.upload(new Float32Array(token));
 const upload=v=>gpu.upload(new Float32Array(v)),pad=ITEMS.find(t=>t.kind==='slalom-boost'),inlay=pad?turboInlay(course,pad.s,pad.radius):{stone:[],light:[],spent:[]},boostStone=upload(inlay.stone),boostItem=upload(inlay.light),boostSpent=upload(inlay.spent),kicker=course.timeTrial?{rock:[],seams:[]}:basaltKicker(course),basalt=upload(environmentRock(kicker.rock)),grooves=upload(environmentRock(kicker.seams));
 function environmentRock(vertices){if(!gpu.area?.skiEnvironment)return vertices;for(let i=0;i<vertices.length;i+=9){const tone=vertices[i+6];vertices[i+6]=tone*.72;vertices[i+7]=tone*.85;vertices[i+8]=tone;}return vertices;}
 const platform=[];box(platform,-10,-13,-3,20,26,2,[.3,.4,.4]);for(const x of [-10,9])box(platform,x,-13,-1,1,26,1,mint);const carrier=gpu.upload(new Float32Array(platform));
 const blades=[];box(blades,-1,-10,-.6,2,20,.8,[.6,.72,.7]);
 // Raised tapered nose, with a short sloped connection rather than a vertical block.
 for(const side of [-1,1])triangle(blades,[side,10,.2],[side*.65,13,1.3],[-side,10,.2],mint);
 box(blades,-.65,12,1.1,1.3,1,.25,mint);if(course.scaleTrial)for(let i=1;i<blades.length;i+=9)blades[i]*=(SCALE_TRIAL.bladeLength*SCALE_TRIAL.units)/23;gpu.skiBladeMesh=gpu.upload(new Float32Array(blades));
 const mounts=[];for(const x of [-4.6,4.6])box(mounts,x-.55,-1,.1,1.1,2,1.4,metal);box(mounts,-5.15,-.7,1.4,10.3,1.4,.65,metal);for(const x of [-2.2,1.6])box(mounts,x,-3,1.5,.6,6,.6,metal);gpu.skiMountMesh=gpu.upload(new Float32Array(mounts));
 return {draw(state,run){landingSpray.draw(run);if(run)gpu.mesh(corridor,[0,0,0,100],1);if(state.liftCarrier)gpu.mesh(carrier,[state.x,state.y,state.z,state.heading]);gpu.gl.uniform1f(gpu.locations.roadEnabled,run&&!course.reactiveGates?3:0);gpu.mesh(ramps,[0,0,0,100],7);if(run){if(course.reactiveGates){const next=course.gates.map((g,i)=>i).filter(i=>!run.gates.includes(i)).slice(0,2);for(const i of next)gpu.mesh(gateMeshes[i],[0,0,0,100],7);gpu.mesh(finishMesh,[0,0,0,100],7);}gpu.mesh(slalomMarkers,[0,0,0,100],7);gateFeedback.draw(run);readableFlags?.draw(run);gpu.mesh(basalt,[0,0,0,100],1.25);gpu.mesh(grooves,[0,0,0,100],7);gpu.mesh(boostStone,[0,0,0,100],1);gpu.mesh(run.items.includes(ITEMS.indexOf(pad))?boostSpent:boostItem,[0,0,0,100],7);}gpu.gl.uniform1f(gpu.locations.roadEnabled,0);if(run)for(let i=0;i<ITEMS.length;i++){if(run.items.includes(i)||ITEMS[i].kind==='slalom-boost')continue;const t=ITEMS[i],p=course.point(t.s,t.u);if(Math.hypot(p.x-state.x,p.y-state.y)<2100)t.kind==='slalom-boost'?gpu.mesh(boostItem,[0,0,0,100],7):gpu.mesh(item,[p.x,p.y,itemAltitude(course,t)-13,state.t*.5],7);}}};
}

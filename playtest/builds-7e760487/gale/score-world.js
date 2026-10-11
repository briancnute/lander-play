import {box,wheelPivots} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {drivingBody,drivingWheel} from '../mars-renderer/driving-models.js';
import {raceSurface} from '../mars-renderer/race-surface.js';
import {createWorldTerrain} from '../mars-renderer/world-terrain.js';
import {scoreTerrainTiles} from './score-course.js';
export function createScoreWorld(gpu,c){
 const road={...raceSurface(gpu.gl,c.route,c.trailHalf,false),style:4},b=c.patch.bounds;
 const patch={bounds:[b.minX,b.minY,b.maxX,b.maxY],terrain:createWorldTerrain(gpu,scoreTerrainTiles(c))};
 const v=[],mint=[.53,.87,.76],gold=[1,.76,.32],metal=[.34,.42,.43];
 const point=(s,u)=>{const p=c.point(s,u);return [p.x,p.y,c.height(s,u)+.45];};
 for(let s=0;s<c.length;s+=100)for(const side of [-1,1]){const p=point(s,side*c.boundaryHalf);box(v,p[0]-1,p[1]-1,p[2],2,2,10,metal);box(v,p[0]-1,p[1]-1,p[2]+7,2,2,3,mint);}
 // Three centered arrows lead up the ramp toward its highest takeoff.
 for(const j of c.jumps)for(const d of [180,110,40]){
  const s=j.s-d;
  triangle(v,point(s+20,0),point(s-8,24),point(s-8,-24),gold);
  triangle(v,point(s-8,-8),point(s-8,8),point(s-30,-8),gold);
  triangle(v,point(s-8,8),point(s-30,8),point(s-30,-8),gold);
 }
 // Checkered ground finish at the historic traverse; low pylons preserve the view.
 for(let s=c.finish-24;s<c.finish+24;s+=12)for(let u=-150;u<150;u+=25){const color=(Math.round((s-c.finish)/12)+Math.round(u/25))%2?[.87,.88,.74]:[.19,.28,.28];triangle(v,point(s,u),point(s+12,u),point(s,u+25),color);triangle(v,point(s+12,u),point(s+12,u+25),point(s,u+25),color);}
 for(const side of [-1,1]){const p=point(c.finish,side*170);box(v,p[0]-3,p[1]-3,p[2],6,6,30,metal);box(v,p[0]-3,p[1]-3,p[2]+24,6,6,6,mint);}
 const markers=gpu.upload(new Float32Array(v)),rover=gpu.upload(drivingBody('curiosity')),wheel=gpu.upload(drivingWheel('curiosity'));
 const atlas=new Image();atlas.src=new URL('./assets/mars-orbs.png',import.meta.url).href;
 const label=(ctx,p,text,color='#ffe1a0')=>{const q=gpu.project(p.x,p.y,p.z);if(q.depth<5||q.x<30||q.x>ctx.canvas.clientWidth-30||q.y<55||q.y>ctx.canvas.clientHeight-90)return;ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#172326';ctx.strokeText(text,q.x,q.y);ctx.fillStyle=color;ctx.fillText(text,q.x,q.y);};
 function visible(p){const cam=gpu.lastCamera;if(!cam)return false;for(let i=1;i<16;i++){const t=i/16,x=cam.x+(p.x-cam.x)*t,y=cam.y+(p.y-cam.y)*t;if(c.surface(x,y)>cam.eye+(p.z-cam.eye)*t+2)return false;}return true;}
 return {road,patch,draw(state,r){
  gpu.mesh(markers,[0,0,0,100],7);
  if(!r.roverFound){const p=c.rover,z=c.surface(p.x,p.y);gpu.mesh(rover,[p.x,p.y,z,Math.PI]);for(const [x,y]of wheelPivots){gpu.gl.uniform4f(gpu.locations.wheel,x,y,0,0);gpu.mesh(wheel,[p.x,p.y,z,Math.PI]);}gpu.gl.uniform4f(gpu.locations.wheel,0,0,0,0);}
  const ctx=document.querySelector('#labels').getContext('2d'),time=matchMedia('(prefers-reduced-motion: reduce)').matches?0:state.t;ctx.save();
  for(const orb of c.orbs){
   if(r.orbs?.includes(orb.id))continue;const p=c.point(orb.s,orb.u);if(Math.hypot(p.x-state.x,p.y-state.y)>1800)continue;
   p.z=c.surface(p.x,p.y)+16+2*Math.sin(time*3+orb.id);const q=gpu.project(p.x,p.y,p.z),edge=gpu.project(p.x+Math.cos(state.heading)*11,p.y+Math.sin(state.heading)*11,p.z),radius=Math.min(52,Math.abs(edge.x-q.x));
   if(q.depth<8||radius<1||!visible(p))continue;
   const glow=ctx.createRadialGradient(q.x,q.y,radius*.4,q.x,q.y,radius*2);glow.addColorStop(0,'#ffdc8ddd');glow.addColorStop(.55,'#ffb34b66');glow.addColorStop(1,'#ffad4500');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(q.x,q.y,radius*2,0,Math.PI*2);ctx.fill();
   if(atlas.complete&&atlas.naturalWidth){const frame=Math.floor(time*4+orb.id)%16;ctx.drawImage(atlas,frame*128,0,128,128,q.x-radius,q.y-radius,radius*2,radius*2);}
   else{ctx.fillStyle='#db7544';ctx.beginPath();ctx.arc(q.x,q.y,radius,0,Math.PI*2);ctx.fill();}
  }
  if(!r.roverFound&&Math.hypot(c.rover.x-state.x,c.rover.y-state.y)<650)label(ctx,{...c.rover,z:c.surface(c.rover.x,c.rover.y)+32},'CURIOSITY');
  if(c.finish-r.s<900){const p=c.point(c.finish);label(ctx,{...p,z:c.height(c.finish)+40},'FINISH · Curiosity’s trail','#d6f4dc');}
  ctx.restore();
 }};
}

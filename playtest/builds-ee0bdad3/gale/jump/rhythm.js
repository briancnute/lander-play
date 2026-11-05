// Two-cue slalom finale. Historical filename retained for the preview link.
import {landingTiming,LAND_TARGET} from '../ski-landing.js';
import {grade} from './config.js';
import {trickFor} from './tricks.js';
export const LOAD_TIME=1.6;
const surface=(c,x,y)=>c.worldHeight?.(x,y)??c.surface(x,y);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function beginRhythm(r,c){
 if(!c.timedJump||r.jump||r.finalJump||r.s>=c.lip||Math.abs(r.u)>180||r.s<c.gates.at(-1).s||r.s<c.lip-110)return false;
 r.jump={rhythm:true,simpleFinish:true,time:0,index:1,execution:null,takeoff:null,landing:null,misses:c.gates.length-r.gateHits,startS:r.s,startU:r.u,endU:r.u,speed:clamp(r.v*.4,90,190),settings:{takeoff:LOAD_TIME,cameraOrbit:false},rail:null,config:{name:'Ramp trick',takeoff:LOAD_TIME,railStart:0,sequenceEnd:LOAD_TIME,trickStart:LOAD_TIME,landingStart:Infinity,landingEnd:Infinity,touchdown:Infinity,feedback:.3}};
 r.boost=0;r.trick=null;r.pending=r.chain=0;r.air=false;
 return true;
}
export function captureRhythm(r,press){
 const j=r.jump;if(r.phase!=='running')return;
 const score=target=>({score:Math.round(100*landingTiming(LAND_TARGET+j.time-target)),at:j.time});
 if(j.time<LOAD_TIME&&press==='gas'&&!j.takeoff)j.takeoff=score(LOAD_TIME-.2);
 else if(j.time>=j.config.landingStart&&j.time<j.config.touchdown&&press==='special'&&!j.landing)j.landing=score(j.config.touchdown-.15);
}
export function simpleCue(j){
 const c=j.config,t=j.time,launch=t<LOAD_TIME;
 if(!launch&&(t<c.landingStart||t>=c.touchdown))return null;
 const start=launch?0:c.landingStart,target=launch?LOAD_TIME-.2:c.touchdown-.15,result=launch?j.takeoff:j.landing;
 const u=clamp(((result?.at??t)-start)/(target-start),0,1.12);
 return {kind:launch?'TAKEOFF':'LAND',action:launch?'thrust':'brake',score:result?.score,radius:Math.max(29,84-50*u),difficulty:1};
}
export function stepRhythm(r,c,dt){
 const j=r.jump,q=j.config;j.time=Math.min(q.touchdown,j.time+dt);
 if(j.time+1e-9<LOAD_TIME){
  const u=j.time/LOAD_TIME;
  // Slow approach eases into a launch speed derived from entry speed.
  const distance=c.lip-j.startS,endRate=j.speed*LOAD_TIME/distance;
  const progress=(endRate-2)*u**3+(3-endRate)*u**2;
  r.s=j.startS+distance*progress;r.u=j.endU;
  const p=c.point(r.s,r.u);r.worldX=p.x;r.worldY=p.y;r.z=surface(c,p.x,p.y);
  r.v=distance/LOAD_TIME*(3*(endRate-2)*u*u+2*(3-endRate)*u);r.side=0;r.vz=0;return;
 }
 if(!j.flight){
  j.takeoff??={score:0,at:LOAD_TIME};j.execution=j.takeoff.score;j.index=1;
  const p=c.point(c.lip,j.endU),heading=c.heading(c.lip),vx=Math.sin(heading)*j.speed,vy=-Math.cos(heading)*j.speed,z=surface(c,p.x,p.y);
  // Leave along the actual small ramp tangent, then solve first terrain contact.
  const slope=(c.height(c.lip-5,j.endU)-c.height(c.lip-25,j.endU))/20;
  const gravity=3.71*(8/3),vz=slope*j.speed;
  const clearance=t=>z+vz*t-.5*gravity*t*t-surface(c,p.x+vx*t,p.y+vy*t);
  let hi=.02;while(hi<20&&clearance(hi)>0)hi+=.02;
  let lo=Math.max(0,hi-.02);for(let i=0;i<30;i++){const m=(lo+hi)/2;if(clearance(m)>0)lo=m;else hi=m;}
  const airtime=hi,touchdown=LOAD_TIME+airtime;
  Object.assign(q,{touchdown,landingStart:Math.max(LOAD_TIME,touchdown-1),landingEnd:touchdown,motionEnd:touchdown,cycleDuration:airtime,airtime,physicalAirtime:airtime});
  j.flight={x:p.x,y:p.y,z,vx,vy,vz,heading,gravity};
  r.finalJump=true;r.air=true;r.takeoff='rhythm-hop';r.tricks.push(trickFor(j.index,j.execution).name);r.bestCombo=Math.round(250*j.execution/100);r.score=r.bestCombo;
 }
 const f=j.flight,t=clamp(j.time-LOAD_TIME,0,q.airtime);
 r.worldX=f.x+f.vx*t;r.worldY=f.y+f.vy*t;r.z=f.z+f.vz*t-.5*f.gravity*t*t;r.vz=f.vz-f.gravity*t;
 const pos=c.coords(r.worldX,r.worldY);r.s=pos.s;r.u=pos.u;r.v=j.speed;r.side=0;
 if(j.time+1e-9>=q.touchdown){
  j.landing??={score:0,at:q.touchdown};const quality=j.landing.score/100;
  r.z=surface(c,r.worldX,r.worldY);r.air=false;r.vz=0;
  const out=Math.abs(r.u)>c.width;
  r.finalLanding=r.landing={quality,timing:quality,alignment:1,points:j.landing.score,grade:grade(j.landing.score),at:r.time,x:r.worldX,y:r.worldY,heading:f.heading,outOfBounds:out};
  r.phase='result';r.reason=out?'Landed outside course':'Slalom complete';
 }
}

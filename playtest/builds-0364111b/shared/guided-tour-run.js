// Physical gate progress is independent of where the player explores or jumps.
import {nextTourGate,tourGate,crossesTourGate,viewHeading,gateApproach} from './tour-gates.js';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const poseOf=s=>({x:s.x,y:s.y,heading:s.heading});
export function newTourRun(tour){return {version:3,routeVersion:tour.version,site:tour.site,leg:0,station:0,visited:0,visitedStops:[],passedGates:[],pending:0,status:'active',exploring:false,freeJump:false,atEnd:false,lastSafe:{...gateApproach(tourGate(tour,0)),station:0},returnAnchor:poseOf(tour.checkpoints[0]),pose:gateApproach(tourGate(tour,0)),recoveries:0};}
export function nearestTourPoint(tour,pose){let nearest;for(let leg=0;leg<tour.legs.length;leg++){const p=projectOnLeg(tour.legs[leg],pose,0,Infinity);if(!nearest||p.distance<nearest.distance)nearest={...p,leg};}return nearest;}
export function restoreTourRun(tour,value,isSafe,contains=()=>true){
 const fresh=newTourRun(tour);if(!value||value.site!==tour.site||value.routeVersion!==tour.version)return fresh;let v={...value};
 const indices=a=>Array.isArray(a)&&new Set(a).size===a.length&&a.every(i=>Number.isInteger(i)&&i>=0&&i<tour.checkpoints.length);
 if(v.version===1){if(!Number.isInteger(v.visited)||v.visited<0||v.visited>tour.checkpoints.length)return fresh;v.visitedStops=Array.from({length:v.visited},(_,i)=>i);v.version=2;}
 if(v.version===2){if(!indices(v.visitedStops))return fresh;v={...v,version:3,passedGates:[...v.visitedStops],returnAnchor:poseOf(nearestTourPoint(tour,v.pose??fresh.pose))};const next=nextTourGate(tour,v);if(v.pending===next&&!v.passedGates.includes(next)&&next>0)v.passedGates.push(next);if(next===0){v.pose=fresh.pose;v.lastSafe=fresh.lastSafe;}if(v.pending!==next)v.pending=null;}
 if(v.exploring!==undefined&&typeof v.exploring!=='boolean')return fresh;
 if(v.version!==3||!Number.isInteger(v.leg)||v.leg<0||v.leg>=tour.legs.length||!Number.isFinite(v.station)||v.station<0||!indices(v.visitedStops)||!indices(v.passedGates)||v.visited!==v.visitedStops.length||v.visitedStops.some(i=>!v.passedGates.includes(i))||!['active','complete'].includes(v.status)||!Number.isInteger(v.recoveries)||v.recoveries<0)return fresh;
 if(v.status==='complete'&&v.visited!==tour.checkpoints.length)return fresh;
 const next=nextTourGate(tour,v);if(v.pending!==null&&(v.pending!==next||!v.passedGates.includes(v.pending)&&v.pending!==0))return fresh;
 const valid=p=>p&&[p.x,p.y,p.heading].every(Number.isFinite)&&isSafe(p)&&contains(p);
 if(!valid(v.lastSafe))return fresh;const pose=valid(v.pose)?v.pose:v.lastSafe;
 const leg=next<0?tour.legs.length-1:clamp(next-1,0,tour.legs.length-1),projection=projectOnLeg(tour.legs[leg],pose,0,Infinity);
 return {...fresh,...v,leg,station:projection.station,pose:poseOf(pose),lastSafe:{...v.lastSafe,station:projection.station},returnAnchor:valid(v.returnAnchor)?poseOf(v.returnAnchor):poseOf(nearestTourPoint(tour,pose)),freeJump:nearestTourPoint(tour,pose).distance>32,atEnd:false};
}
export function acknowledgeCheckpoint(tour,run){
 const index=run.pending;if(index===null||run.status!=='active'||index!==nextTourGate(tour,run)||!run.passedGates.includes(index))return false;
 run.visitedStops.push(index);run.visited=run.visitedStops.length;run.pending=null;
 const next=nextTourGate(tour,run);if(next<0){run.status='complete';run.completedAt=index;return true;}
 run.leg=clamp(next-1,0,tour.legs.length-1);run.station=projectOnLeg(tour.legs[run.leg],run.pose,0,Infinity).station;run.returnAnchor=poseOf(nearestTourPoint(tour,run.pose));return true;
}
export function jumpTour(tour,run,pose){
 // Relocation never crosses a gate and never changes the next required stop.
 run.pose=poseOf(pose);run.pending=null;run.freeJump=nearestTourPoint(tour,pose).distance>32;run.atEnd=false;
 if(run.status==='complete'){run.exploring=true;run.station=projectOnLeg(tour.legs[run.leg],pose,0,Infinity).station;run.lastSafe={...poseOf(pose),station:run.station};run.returnAnchor=poseOf(nearestTourPoint(tour,pose));return run.pose;}
 run.leg=clamp(nextTourGate(tour,run)-1,0,tour.legs.length-1);const p=projectOnLeg(tour.legs[run.leg],pose,0,Infinity);run.station=p.station;run.lastSafe={...poseOf(pose),station:p.station};run.returnAnchor=poseOf(nearestTourPoint(tour,pose));return run.pose;
}
export function projectOnLeg(leg,p,station,forward=240){
 let best=null;
 for(let i=1;i<leg.points.length;i++){
  const a=leg.points[i-1],b=leg.points[i];if(b.s<station-36||a.s>station+forward)continue;
  const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1),x=a.x+dx*t,y=a.y+dy*t,d=Math.hypot(p.x-x,p.y-y);
  if(!best||d<best.distance)best={x,y,distance:d,station:a.s+(b.s-a.s)*t,heading:Math.atan2(dx,-dy),halfWidth:a.halfWidth+(b.halfWidth-a.halfWidth)*t,speed:Math.min(a.speed,b.speed),sol:a.sol+(b.sol-a.sol)*t,index:i};
 }
 return best??{...leg.points.at(-1),station:leg.length,distance:distance(p,leg.points.at(-1)),index:leg.points.length-1};
}
export function createTourTracker(tour,run,isSafe,contains=null){
 let outside=0;
 return {get outsideSeconds(){return outside;},resetWarning(){outside=0;},step(dt,before,after,{paused=false}={}){
  if(paused||run.status!=='active'&&!run.exploring||run.pending!==null||!Number.isFinite(dt)||dt<=0||dt>.1)return null;
  const leg=tour.legs[run.leg],projection=projectOnLeg(leg,after,0,Infinity),continuous=distance(before,after)<=Math.max(12,Math.abs(after.v)*dt*3+4),inside=contains?contains(after):projection.distance<=projection.halfWidth;
  if(!inside){outside+=dt;if(outside+1e-8>=tour.recovery.warningSeconds){outside=0;run.recoveries++;return {type:'recover',pose:{...run.lastSafe}};}return {type:'warning',remaining:Math.max(0,tour.recovery.warningSeconds-outside)};}
  outside=0;if(!continuous)return null;
  const path=nearestTourPoint(tour,after);run.freeJump=path.distance>32;
  if(!after.air&&!after.turnaround){run.station=projection.station;if(isSafe(after)){run.lastSafe={...poseOf(after),station:projection.station};run.pose=poseOf(after);if(path.distance<=32)run.returnAnchor=poseOf(path);}}
  const index=nextTourGate(tour,run);if(index<0)return null;const gate=tourGate(tour,index);
  if(crossesTourGate(gate,before,after,dt)){const stopped=isSafe(after)?after:gate;if(!isSafe(stopped))return null;run.pending=index;if(!run.passedGates.includes(index))run.passedGates.push(index);run.pose={...poseOf(stopped),heading:viewHeading(gate,stopped)};run.lastSafe={...run.pose,station:projection.station};return {type:'checkpoint',index,pose:run.pose};}
  return null;
 }};
}
export function tourClock(tour,run){
 if(run.status==='complete')return tour.lastSol;
 if(run.pending!==null)return tour.checkpoints[run.pending].sol;
 const leg=tour.legs[run.leg],i=Math.max(1,leg.points.findIndex(p=>p.s>=run.station)),a=leg.points[i-1],b=leg.points[i],t=clamp((run.station-a.s)/(b.s-a.s||1),0,1);
 return Math.floor(clamp(a.sol+(b.sol-a.sol)*t,tour.checkpoints[run.leg].sol,tour.checkpoints[run.leg+1].sol));
}
export function tourEarthLabel(site,sol){const epoch=site==='jezero'?'2021-02-18T20:55:00Z':'2012-08-06T05:17:00Z';return new Date(Date.parse(epoch)+sol*88775.244*1000).toLocaleDateString('en-US',{timeZone:'UTC',month:'short',year:'numeric'});}

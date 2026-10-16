// Ordered tour progress; independent of rendering, input and storage providers.
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const poseOf=s=>({x:s.x,y:s.y,heading:s.heading});
export function newTourRun(tour){return {version:2,routeVersion:tour.version,site:tour.site,leg:0,station:0,visited:0,visitedStops:[],pending:0,status:'active',freeJump:false,atEnd:false,lastSafe:{...poseOf(tour.checkpoints[0]),station:0},pose:poseOf(tour.checkpoints[0]),recoveries:0};}
export function restoreTourRun(tour,value,isSafe){
 const fresh=newTourRun(tour);let v=value;
 if(v?.version===1){if(!Number.isInteger(v.visited)||v.visited<0||v.visited>tour.checkpoints.length||v.visited!==v.leg+1&&!(v.leg===0&&v.visited===0)&&v.status!=='complete')return fresh;v={...v,version:2,visitedStops:Array.from({length:v.visited},(_,i)=>i),freeJump:false,atEnd:false};}
 if(!v||v.version!==2||v.routeVersion!==tour.version||v.site!==tour.site||!Number.isInteger(v.leg)||v.leg<0||v.leg>=tour.legs.length||!Number.isInteger(v.visited)||v.visited<0||v.visited>tour.checkpoints.length||!Number.isFinite(v.station)||v.station<0||v.station>tour.legs[v.leg].length+.01)return fresh;
 if(!Array.isArray(v.visitedStops)||new Set(v.visitedStops).size!==v.visitedStops.length||v.visited!==v.visitedStops.length||v.visitedStops.some(i=>!Number.isInteger(i)||i<0||i>=tour.checkpoints.length))return fresh;
 if(typeof v.freeJump!=='boolean'||typeof v.atEnd!=='boolean'||v.atEnd&&(v.leg!==tour.legs.length-1||Math.abs(v.station-tour.legs.at(-1).length)>.01))return fresh;
 if(v.status==='complete')return v.visited===tour.checkpoints.length?{...fresh,...v,pending:null,status:'complete'}:fresh;
 if(v.status!=='active'||v.pending!==null&&v.pending!==v.leg&&v.pending!==v.leg+1)return fresh;
 const leg=tour.legs[v.leg],safe=v.lastSafe;
 if(!safe||![safe.x,safe.y,safe.heading,safe.station].every(Number.isFinite)||safe.station<0||safe.station>v.station+.01||!isSafe(safe))return fresh;
 const reference=projectOnLeg(leg,safe,safe.station,0);
 if(reference.distance>reference.halfWidth||Math.abs(reference.station-safe.station)>36)return fresh;
 if(v.freeJump&&(!v.pose||!isSafe(v.pose)))return fresh;
 return {...fresh,...v,lastSafe:{...safe},pose:poseOf(v.freeJump?v.pose:safe)};
}
export function acknowledgeCheckpoint(tour,run){
 if(run.pending===null||run.status!=='active')return false;
 const index=run.pending;if(index!==run.leg&&index!==run.leg+1)return false;
 run.visitedStops??=Array.from({length:run.visited},(_,i)=>i);if(!run.visitedStops.includes(index))run.visitedStops.push(index);
 run.visited=run.visitedStops.length;run.pending=null;run.freeJump=false;
 if(index===tour.checkpoints.length-1){run.atEnd=true;if(run.visited===tour.checkpoints.length)run.status='complete';return true;}
 run.atEnd=false;
 run.leg=index;run.station=0;run.lastSafe={...poseOf(tour.checkpoints[index]),station:0};run.pose=poseOf(tour.checkpoints[index]);return true;
}
export function nearestTourPoint(tour,pose){
 let nearest;for(let leg=0;leg<tour.legs.length;leg++){const p=projectOnLeg(tour.legs[leg],pose,0,Infinity);if(!nearest||p.distance<nearest.distance)nearest={...p,leg};}return nearest;
}
export function jumpTour(tour,run,pose){
 const p=nearestTourPoint(tour,pose),checkpoint=tour.checkpoints.findIndex(q=>distance(q,pose)<=q.triggerRadius);
 Object.assign(run,{status:'active',atEnd:false,pending:null,leg:p.leg,station:p.station,pose:poseOf({...pose,heading:p.heading}),lastSafe:{x:p.x,y:p.y,heading:p.heading,station:p.station},freeJump:p.distance>32});
 if(checkpoint>=0){run.leg=Math.min(checkpoint,tour.legs.length-1);run.station=checkpoint===tour.checkpoints.length-1?tour.legs.at(-1).length:0;run.pending=checkpoint;run.freeJump=false;run.lastSafe={...poseOf(tour.checkpoints[checkpoint]),station:run.station};run.pose=poseOf(tour.checkpoints[checkpoint]);}
 return run.pose;
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
export function createTourTracker(tour,run,isSafe){
 let outside=0;
 return {get outsideSeconds(){return outside;},resetWarning(){outside=0;},step(dt,before,after,{paused=false}={}){
  if(paused||run.status!=='active'||run.atEnd||run.pending!==null||!Number.isFinite(dt)||dt<=0||dt>.1)return null;
  const leg=tour.legs[run.leg],moved=distance(before,after),continuous=moved<=Math.max(12,Math.abs(after.v)*dt*3+4),projection=projectOnLeg(leg,after,run.freeJump?0:run.station,run.freeJump?Infinity:Math.max(240,Math.abs(after.v)*dt*3+24));
  const inside=projection.distance<=projection.halfWidth;
  if(run.freeJump){if(!after.air&&isSafe(after))run.pose=poseOf(after);if(projection.distance>32)return null;run.freeJump=false;run.station=projection.station;}
  if(!inside){outside+=dt;if(outside+1e-8>=tour.recovery.warningSeconds){outside=0;run.recoveries++;return {type:'recover',pose:{...run.lastSafe}};}return {type:'warning',remaining:Math.max(0,tour.recovery.warningSeconds-outside)};}
  outside=0;
  if(!continuous)return null; // Teleports, map travel and restoring a pose cannot earn progress.
  if(!after.air&&!after.turnaround){run.station=Math.max(run.station,projection.station);if(isSafe(after)){run.lastSafe={...poseOf(after),heading:projection.heading,station:projection.station};run.pose=poseOf(after);}}
  const end=tour.checkpoints[run.leg+1];
  if(!after.air&&!after.turnaround&&run.station>=leg.length-40&&distance(after,end)<=end.triggerRadius){run.station=leg.length;run.pending=run.leg+1;return {type:'checkpoint',index:run.pending};}
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

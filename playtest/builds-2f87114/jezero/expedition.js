import {HORIZONTAL_UNITS} from './scale.js';
import {nextLookout,photoTourComplete,restoreTiming,tourStops,CURRENT_TOUR_VERSION} from './photo-tour.js';
const toGame=(e,n)=>({x:(e+1500)*HORIZONTAL_UNITS,y:(1500-n)*HORIZONTAL_UNITS});

// Retired activities remain valid save credits, but are absent from the playable catalogue.
export const ACTIVITY_IDS=['photo','art','radar','atmosphere','long-jump','target-jump','crater-jump','neretva-jump','helicopter','delta-trial','landing-trial'];
export const REQUIRED_ACTIVITIES=1;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function buildJourney(data){
 const segments=data.segments.map(s=>({...s,points:s.points.map(p=>toGame(...p))}));
 const checkpoints=[],gaps=[];let metres=0,next=150,last=null;
 const add=(p,sol)=>{if(!checkpoints.length||distance(checkpoints.at(-1),p)>1)checkpoints.push({...p,sol,metres});};
 for(const s of segments){
  if(!s.points.length)continue;
  if(!last)add(s.points[0],s.sol);
  else if(distance(last,s.points[0])>16){gaps.push([last,s.points[0]]);add(last,s.sol);add(s.points[0],s.sol);}
  for(let i=1;i<s.points.length;i++){
   const a=s.points[i-1],b=s.points[i],length=distance(a,b)/3.2;
   while(length>0&&next<=metres+length){const t=(next-metres)/length;checkpoints.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,sol:s.sol,metres:next});next+=150;}
   metres+=length;
  }
  last=s.points.at(-1);
 }
 add(last,data.lastSol);
 return {segments,gaps,checkpoints,metres,start:checkpoints[0],finish:checkpoints.at(-1),lastSol:data.lastSol,source:data.source};
}
export function restoreExpedition(value,journey){
 const s=value&&[1,2].includes(value.version)?value:{};
 const next=Number.isInteger(s.next)?Math.max(1,Math.min(journey.checkpoints.length,s.next)):1;
 const activities=Array.isArray(s.activities)?[...new Set(s.activities.filter(id=>ACTIVITY_IDS.includes(id)))]:[];
 const status=['active','finished'].includes(s.status)?s.status:'idle';
 const tourVersion=s.version===2&&[1,CURRENT_TOUR_VERSION].includes(s.tourVersion)?s.tourVersion:0,lookouts=[];
 // Restore only the ordered prefix; old field notes are not tour collection proof.
 if(tourVersion)for(const p of tourStops(journey,{tourVersion})){if(!Array.isArray(s.lookouts)||s.lookouts[lookouts.length]!==p.id)break;lookouts.push(p.id);}
 const freeRoamSetup=s.freeRoamSetup&&typeof s.freeRoamSetup.rover==='string'&&typeof s.freeRoamSetup.kit==='boolean'?{rover:s.freeRoamSetup.rover,kit:s.freeRoamSetup.kit}:null;
 const record={version:2,tourVersion,lookouts,timing:restoreTiming(s.timing),freeRoamSetup,status,next,activities,finishReached:status!=='idle'&&next===journey.checkpoints.length&&s.finishReached===true,returnPoint:validPose(s.returnPoint)?s.returnPoint:null};
 if(status==='finished'&&(next<journey.checkpoints.length||activities.length<REQUIRED_ACTIVITIES||!photoTourComplete(journey,record)))record.status='active';
 return record;
}
export const validPose=p=>p&&['x','y','heading'].every(k=>Number.isFinite(p[k]))&&p.x>=-33600&&p.x<=17600&&p.y>=-11200&&p.y<=20800;
export function rejoinJourney(record,before,after,dt){
 if(record.status!=='active'||!record.returnPoint||!before||dt<=0||after.mode!=='free'||after.air||after.turnaround)return false;
 const movement=distance(before,after);
 if(movement<.001||movement>Math.max(12,Math.abs(after.v)*dt*2+4)||distance(after,record.returnPoint)>144)return false;
 record.returnPoint=null;return true;
}
export function advanceJourney(journey,record,before,after,dt){
 if(record.status!=='active'||after.mode!=='free'||after.air||after.turnaround||!before||dt<=0)return false;
 const movement=distance(before,after);
 // Real simulation steps only: map jumps and saved-position restoration never earn travel.
 if(movement<.001||movement>Math.max(12,Math.abs(after.v)*dt*2+4))return false;
 const target=journey.checkpoints[record.next];
 const lookout=nextLookout(journey,record);
 if(lookout&&record.next>lookout.checkpoint)return false;
 if(!target||distance(target,after)>144)return false;
 record.next++;return true;
}
export function reachFinish(journey,record,pose){
 if(record.status!=='active'||record.next!==journey.checkpoints.length||record.finishReached||pose.mode!=='free'||pose.air||distance(pose,journey.finish)>=144)return false;
 record.finishReached=true;return true;
}
export const canFinish=(journey,record,pose)=>record.status==='active'&&record.next===journey.checkpoints.length&&photoTourComplete(journey,record)&&record.activities.length>=REQUIRED_ACTIVITIES&&(record.finishReached||distance(pose,journey.finish)<144);
export function creditActivity(record,id){
 if(record.status==='active'&&ACTIVITY_IDS.includes(id)&&!record.activities.includes(id))record.activities.push(id);
}
export async function loadJourney(){
 const r=await fetch(new URL('./assets/expedition-route.json',import.meta.url));if(!r.ok)throw Error('The recorded expedition route could not load.');
 return buildJourney(await r.json());
}

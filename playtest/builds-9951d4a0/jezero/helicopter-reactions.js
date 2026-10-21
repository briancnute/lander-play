import {flightReference,flightCeiling} from './helicopter-course.js';
// Targets are authored at the next grab plane from the player's ACTUAL state.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const REACTION_TARGET={horizontalRadius:60,verticalRadius:95,lateralReaction:.35,heightReaction:1};
export const reactionTargetsComplete=f=>f.course?.reactionTargets?f.pods.every(p=>p.resolved||p.passed):f.pods.every(p=>p.collected||p.passed);
function motion(v,target,acceleration,seconds){
 if(!target)return {distance:0,velocity:0};if(v*target<0)v=0;
 const sign=Math.sign(target-v),ramp=Math.min(seconds,Math.abs(target-v)/acceleration);
 return {distance:v*ramp+sign*acceleration*ramp*ramp/2+target*(seconds-ramp),velocity:v+sign*acceleration*ramp};
}
function reachable(v,held,negative,positive,acceleration,seconds,latency){
 const delay=Math.min(latency,seconds*.45),drift=motion(v,held,acceleration,delay),remaining=seconds-delay;
 return [drift.distance+motion(drift.velocity,-negative,acceleration,remaining).distance,drift.distance+motion(drift.velocity,positive,acceleration,remaining).distance];
}
export function spawnReactionTarget(f,ground,tuning,random=f.reactionRandom??Math.random){
 const p=f.pods.find(p=>!p.spawned&&!p.resolved&&!p.passed);if(!p)return null;
 const c=f.course,h=f.heading,seconds=Math.max(.05,(p.s-f.distance)/tuning.speed),cx=c.start.x+Math.sin(h)*p.s,cy=c.start.y-Math.cos(h)*p.s;
 const originSide=(f.x-c.start.x-Math.sin(h)*f.distance)*Math.cos(h)+(f.y-c.start.y+Math.cos(h)*f.distance)*Math.sin(h);
 const range=reachable(f.sideV,(f.steerCommand??0)*tuning.strafe,tuning.strafe,tuning.strafe,tuning.strafeAcceleration,seconds,REACTION_TARGET.lateralReaction);
 let low=Math.max(-600,originSide+range[0]+8),high=Math.min(600,originSide+range[1]-8);if(low>high){low=Math.max(-700,originSide+range[0]);high=Math.min(700,originSide+range[1]);}if(low>high)low=high=clamp(originSide+(range[0]+range[1])/2,-700,700);
 let direction=random()<.5?-1:1;if(direction<0&&low>=originSide)direction=1;if(direction>0&&high<=originSide)direction=-1;
 const magnitude=220+random()*80,goal=clamp(originSide+direction*magnitude,Math.min(low,high),Math.max(low,high));
 p.x=cx+Math.cos(h)*goal;p.y=cy+Math.sin(h)*goal;
 if(!f.heightDirection)f.heightDirection=random()<.5?-1:1;else if(random()<.45)f.heightDirection*=-1;
 const vertical=reachable(f.vz,(f.verticalCommand??0)>0?tuning.up:(f.verticalCommand??0)<0?-tuning.down:0,tuning.down,tuning.up,tuning.verticalAcceleration,seconds,REACTION_TARGET.heightReaction);
 const shift=flightReference(c,p.s)-flightReference(c,f.distance),referenceZ=f.z+shift,floor=Math.max(ground(p.x,p.y)+120,flightReference(c,p.s)+90),ceiling=flightCeiling(c,p.s)-60,allowance=REACTION_TARGET.verticalRadius*.5;
 let desired=referenceZ+f.heightDirection*(120+random()*30);if(desired<floor||desired>ceiling){f.heightDirection*=-1;desired=referenceZ+f.heightDirection*(120+random()*30);}
 p.z=clamp(clamp(desired,referenceZ+vertical[0]-allowance,referenceZ+vertical[1]+allowance),floor,Math.max(floor,ceiling));
 Object.assign(p,{referenceZ:flightReference(c,p.s),spawned:true,origin:{x:f.x,y:f.y,z:f.z,distance:f.distance,sideV:f.sideV,vz:f.vz},seconds,lateralDelta:goal-originSide,verticalDelta:p.z-f.z});return p;
}
export function resolveReactionPlane(f,before,ground,tuning){
 const p=f.pods.find(p=>p.spawned&&!p.resolved&&!p.passed);if(!p||f.distance<p.s)return;
 const progress=f.distance-before.distance,a=progress?clamp((p.s-before.distance)/progress,0,1):1,x=before.x+(f.x-before.x)*a,y=before.y+(f.y-before.y)*a,z=before.z+(f.z-before.z)*a;
 const side=(x-p.x)*Math.cos(f.heading)+(y-p.y)*Math.sin(f.heading);
 p.collected=(side/REACTION_TARGET.horizontalRadius)**2+((z-p.z)/REACTION_TARGET.verticalRadius)**2<=1;p.passed=!p.collected;p.resolved=true;
 if(p.collected){f.collected++;f.lastCollection={x,y,z};}f.feedback={kind:p.collected?'hit':'miss',target:{x:p.x,y:p.y,z:p.z},heading:f.heading,text:p.collected?'TARGET COLLECTED · '+f.collected+' / '+f.pods.length:'TARGET MISSED',time:f.time};
 spawnReactionTarget(f,ground,tuning);if(reactionTargetsComplete(f)){f.finishGate=createFinishZone(f,ground,tuning);f.finishTune={...tuning};}
}
export function createFinishZone(f,ground,tuning){
 const c=f.course,h=f.heading,seconds=Math.max(0,(c.finishS-f.distance)/tuning.speed),station=c.finishS;
 const side=(f.x-c.start.x)*Math.cos(h)+(f.y-c.start.y)*Math.sin(h);
 const horizontal=[motion(f.sideV,-tuning.strafe,tuning.strafeAcceleration,seconds).distance,motion(f.sideV,tuning.strafe,tuning.strafeAcceleration,seconds).distance];
 const left=clamp(side+horizontal[0],-700,700),right=clamp(side+horizontal[1],-700,700),middle=(left+right)/2;
 const base=f.z+flightReference(c,station)-flightReference(c,f.distance),terrain=Math.min(...Array.from({length:17},(_,i)=>{const lateral=left+(right-left)*i/16;return ground(c.finishLine.x+Math.cos(h)*lateral,c.finishLine.y+Math.sin(h)*lateral)+tuning.clearance;}));
 const bottom=Math.max(terrain,base+motion(f.vz,-tuning.down,tuning.verticalAcceleration,seconds).distance),top=Math.max(bottom,Math.min(flightCeiling(c,station),base+motion(f.vz,tuning.up,tuning.verticalAcceleration,seconds).distance));
 return {x:c.finishLine.x+Math.cos(h)*middle,y:c.finishLine.y+Math.sin(h)*middle,z:(bottom+top)/2,left,right,bottom,top,width:Math.max(1,right-left),height:Math.max(1,top-bottom),origin:{x:f.x,y:f.y,z:f.z,distance:f.distance},seconds};
}

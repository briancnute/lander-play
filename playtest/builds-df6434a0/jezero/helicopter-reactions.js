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
 const floor=ground(p.x,p.y)+120,ceiling=c.ceilingZ-120,allowance=REACTION_TARGET.verticalRadius*.5;
 let desired=f.z+f.heightDirection*(120+random()*30);if(desired<floor||desired>ceiling){f.heightDirection*=-1;desired=f.z+f.heightDirection*(120+random()*30);}
 p.z=clamp(clamp(desired,f.z+vertical[0]-allowance,f.z+vertical[1]+allowance),floor,Math.max(floor,ceiling));
 Object.assign(p,{spawned:true,origin:{x:f.x,y:f.y,z:f.z,distance:f.distance,sideV:f.sideV,vz:f.vz},seconds,lateralDelta:goal-originSide,verticalDelta:p.z-f.z});return p;
}
export function resolveReactionPlane(f,before,ground,tuning){
 const p=f.pods.find(p=>p.spawned&&!p.resolved&&!p.passed);if(!p||f.distance<p.s)return;
 const progress=f.distance-before.distance,a=progress?clamp((p.s-before.distance)/progress,0,1):1,x=before.x+(f.x-before.x)*a,y=before.y+(f.y-before.y)*a,z=before.z+(f.z-before.z)*a;
 const side=(x-p.x)*Math.cos(f.heading)+(y-p.y)*Math.sin(f.heading);
 p.collected=(side/REACTION_TARGET.horizontalRadius)**2+((z-p.z)/REACTION_TARGET.verticalRadius)**2<=1;p.passed=!p.collected;p.resolved=true;
 if(p.collected)f.collected++;f.feedback={text:p.collected?'TARGET COLLECTED · '+f.collected+' / '+f.pods.length:'TARGET MISSED',time:f.time};
 spawnReactionTarget(f,ground,tuning);if(reactionTargetsComplete(f))f.finishGateZ=f.z;
}

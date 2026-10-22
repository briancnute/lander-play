import {flightElapsed} from './clock.js';
import {landingTiming,LAND_TARGET} from '../ski-landing.js';
import {hit,expire,average} from './rail-model.js';
import {minimumAir,schedule,grade,tier,settings} from './config.js';
import {trickFor,continuousTrickPose,attitudeTorque} from './tricks.js';
import {landingPose,landingDuration} from './landings.js';
export const jumpGravity=3.71*(8/3); // Existing Gale world-distance scale.
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const surface=(c,x,y)=>c.worldHeight?.(x,y)??c.surface(x,y);
const scoreTap=(correct,t,target,difficulty=1)=>({score:correct?Math.round(100*landingTiming(LAND_TARGET+(t-target)*difficulty)):0,at:t});
export function maybeBeginJump(r,c){
 const options=settings(r.jumpSettings),takeoffDuration=options.takeoff;
 if(!c.timedJump||r.jump||r.finalJump||r.s>=c.lip||Math.abs(r.u)>180||r.s<c.gates.at(-1).s||r.s<c.lip-Math.max(100,r.v)*takeoffDuration)return false;
 const endU=clamp(r.u+r.side*takeoffDuration*.35,-180,180);
 r.jump={settings:options,time:0,index:0,takeoff:null,execution:null,landing:null,rail:null,config:schedule(0,undefined,options),startS:r.s,startU:r.u,endU,speed:clamp(Math.hypot(r.v,r.side),100,480),side:r.side,misses:c.gates.length-r.gateHits};
 r.boost=0;r.trick=null;r.pending=r.chain=0;r.air=false;
 return true;
}
export function captureJump(r,press){
 const j=r.jump;if(!j||r.phase!=='running')return;
 const action={special:'brake',gas:'thrust',left:'left',right:'right'}[press];if(!action)return;
 const t=j.time,c=j.config,takeoffDuration=j.settings.takeoff;
 if(t<takeoffDuration){if(action==='brake'&&!j.takeoff)j.takeoff=scoreTap(true,t,takeoffDuration-.2,1+j.misses*.12);}
 else if(j.rail&&t<c.sequenceEnd)hit(j.rail,action,t);
 else if(t>=c.landingStart&&t<c.landingEnd&&!j.landing&&action==='brake')j.landing=scoreTap(true,t,c.landingEnd-.25);
}
function launch(r,c){
 const j=r.jump,options=j.settings,takeoffDuration=options.takeoff;j.takeoff??={score:0,at:takeoffDuration};
 const p=c.point(c.lip,j.endU),h=c.heading(c.lip),z=surface(c,p.x,p.y);
 // A bounded attitude correction preserves some approach-angle influence.
 const rampSlope=(c.height(c.lip-10,j.endU)-c.height(c.lip-50,j.endU))/40;
 const approachAngle=Math.atan2(rampSlope*j.speed,j.speed)*180/Math.PI;
 const correctedAngle=60+clamp((approachAngle-7)*1.5,-40,20)*.35;
 const score=j.takeoff.score;
 // Class selection must not depend on duration: custom input budgets need not
 // increase with class. A better approach angle can still lift a close grade.
 const angleFactor=Math.sin(correctedAngle*Math.PI/180)/Math.sin(Math.PI/3);
 j.index=tier(clamp(score+(angleFactor-1)*100,0,100));
 if(r.tuning&&Number.isInteger(r.previewClass))j.index=clamp(r.previewClass,0,3);
 const requestedWall=minimumAir(j.index,options),planned=schedule(j.index,requestedWall,options);
 const requested=flightElapsed(planned.touchdown,planned),slowTime=requestedWall-requested;
 const heading=h+clamp(Math.atan2(j.side,j.speed)*.35,-.055,.055);
 // Reserve the groomed runout distance using physical flight time, not QTE time.
 const speed=Math.max((j.speed+(score/100)*12)*Math.cos(correctedAngle*Math.PI/180),2100/requested),vx=Math.sin(heading)*speed,vy=-Math.cos(heading)*speed;
 const target=surface(c,p.x+vx*requested,p.y+vy*requested);
 // Solve the impulse against the surveyed landing elevation. Then find actual
 // first terrain contact; never teleport the rover to a scripted flat plane.
 let vz=Math.max(5,(target-z+.5*jumpGravity*requested*requested)/requested);
 const contact=v=>{let last=0;for(let t=.02;t<30;t+=.02){if(z+v*t-.5*jumpGravity*t*t<=surface(c,p.x+vx*t,p.y+vy*t)){let a=last,b=t;for(let n=0;n<18;n++){const m=(a+b)/2;if(z+v*m-.5*jumpGravity*m*m>surface(c,p.x+vx*m,p.y+vy*m))a=m;else b=m;}return b;}last=t;}return 30;};
 // Reserve only the sequence, trick window and landing cue. Do not add
 // height to delay the apex until after the input sequence. Find the smallest
 // launch impulse that clears the actual terrain for the required duration.
 let airtime=contact(vz);
 if(airtime<requested){
  let low=vz,high=vz+5;
  while(contact(high)<requested&&high<1000)high+=5;
  for(let n=0;n<30;n++){const mid=(low+high)/2;if(contact(mid)<requested)low=mid;else high=mid;}
  vz=high;airtime=contact(vz);
 }
 j.flight={x:p.x,y:p.y,z,vx,vy,vz,heading,gravity:jumpGravity,correctedAngle};
 j.config={...schedule(j.index,airtime+slowTime,options),physicalAirtime:airtime};
 j.rail={spacing:j.config.beat,window:Math.min(.38,j.config.beat/2),notes:j.config.actions.map((action,i)=>({action,at:j.config.sequence+(i+.5)*j.config.beat,result:null})),finished:false};
 r.finalJump=true;r.air=true;r.takeoff='timed-jump';r.feedback=j.config.name+' takeoff';
}
export function stepJump(r,c,dt){
 const j=r.jump,takeoffDuration=j.settings.takeoff;j.time+=dt;
 if(j.time<takeoffDuration){const u=j.time/takeoffDuration;r.s=j.startS+(c.lip-j.startS)*u;r.u=j.startU+(j.endU-j.startU)*u;const p=c.point(r.s,r.u);r.worldX=p.x;r.worldY=p.y;r.z=surface(c,p.x,p.y);r.v=(c.lip-j.startS)/takeoffDuration;r.side=(j.endU-j.startU)/takeoffDuration;r.vz=0;return;}
 if(!j.flight)launch(r,c);
 const q=j.config,f=j.flight,t=Math.min(q.physicalAirtime,flightElapsed(j.time,q));
 expire(j.rail,j.time);
 if(j.time>=q.sequenceEnd&&j.execution===null){expire(j.rail,Infinity);j.execution=average(j.rail);const move=trickFor(j.index,j.execution);r.tricks.push(move.name);r.bestCombo=Math.round((j.index+1)*250*j.execution/100);r.score=r.bestCombo;r.feedback=move.name;}
 r.worldX=f.x+f.vx*t;r.worldY=f.y+f.vy*t;r.z=f.z+f.vz*t-.5*f.gravity*t*t;r.vz=f.vz-f.gravity*t;
 const coords=c.coords(r.worldX,r.worldY);r.s=coords.s;r.u=coords.u;
 const h=c.heading(r.s);r.v=f.vx*Math.sin(h)-f.vy*Math.cos(h);r.side=f.vx*Math.cos(h)+f.vy*Math.sin(h);
 if(j.time+1e-9>=q.touchdown){
  j.landing??={score:0,at:q.touchdown};r.z=surface(c,r.worldX,r.worldY);r.air=false;r.vz=0;
  const out=Math.abs(r.u)>c.width;
  const quality=j.landing.score/100;
  r.finalLanding=r.landing={quality,timing:quality,alignment:1,points:j.landing.score,grade:grade(j.landing.score),at:r.time,x:r.worldX,y:r.worldY,heading:f.heading,outOfBounds:out};
  r.phase='result';r.reason=out?'Landed outside course':'Slalom complete';
 }
}
export function jumpPose(j){
 if(!j?.flight)return {pitch:0,roll:0,yaw:0,foldLeft:0,foldRight:0,bladeSpin:0};
 const q=j.config,elapsed=clamp(j.time-q.trickStart,0,q.motionEnd-q.trickStart);
 const pose=continuousTrickPose(j.index,j.execution??0,elapsed/q.cycleDuration);
 return {...pose,foldLeft:0,foldRight:0,bladeSpin:0};
}
export function jumpTorque(j){
 if(!j?.flight)return {pitch:0,roll:0,yaw:0};
 const q=j.config,t=j.time;
 // Make the launch/arrest impulses visible; full turns coast between them.
 const sample=t>=q.trickStart&&t<q.trickStart+.08?q.trickStart:t>=q.motionEnd&&t<q.motionEnd+.08?q.motionEnd:t;
 return attitudeTorque(time=>jumpPose({...j,time}),sample);
}
export function jumpCue(j){
 if(!j)return null;const t=j.time,c=j.config,takeoffDuration=j.settings.takeoff;let start,target,end,result,action,kind;
 if(t<takeoffDuration){start=0;end=takeoffDuration;target=end-.2;result=j.takeoff;action='brake';kind='TAKEOFF';}
 else if(t>=c.landingStart&&t<c.landingEnd){start=c.landingStart;end=c.landingEnd;target=end-.25;result=j.landing;action='brake';kind='LAND';}else return null;
 const progress=clamp(((result?.at??t)-start)/(target-start),0,1.12);
 return {kind,action,score:result?.score,radius:Math.max(29,84-50*(.94*progress+.06*progress*progress)),difficulty:kind==='TAKEOFF'?1+j.misses*.12:1};
}
export function beginJumpFinish(r){r.finishStop={age:0,duration:landingDuration,x:r.worldX,y:r.worldY,heading:r.jump.flight.heading,speed:Math.hypot(r.v,r.side)};}
export function stepJumpFinish(r,c,dt){
 const f=r.finishStop;f.age=Math.min(f.duration,f.age+dt);const p=landingPose(r.finalLanding.points,f.age,f.speed),sn=Math.sin(f.heading),cs=Math.cos(f.heading);
 const x=f.x+p.x*cs-p.y*sn,y=f.y+p.x*sn+p.y*cs;
 return {...p,x,y,z:surface(c,x,y)+(p.z??0),heading:f.heading+p.heading,steer:Math.sin(p.heading)*.5,done:f.age>=f.duration-1e-9};
}

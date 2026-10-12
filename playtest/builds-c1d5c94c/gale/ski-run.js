import {stepLandingPrompt,scoreSkiLanding} from './ski-landing.js';
import {skiVisualPose} from './ski-poses.js';
import {stepOrbBoost,cancelOrbBoost,requestOrbBoost,holdBoostSpeed} from './ski-boost.js';
import {stepScoreCourse} from './score-events.js';
import {newLunarRotation,rotationInput,stepLunarRotation,ROTATION_SECONDS} from '../shared/ride-rotation.js';
import {skiContact} from './ski-contact.js';
// Summit descent. Local Mars gravity, shared Moon trick grammar, optional boost lines.
import {newTrickInput,trickControlInput,readTrickInput,queueTrickInput,advanceMove,releaseGrab,movePoints,moveRepeatKey,moonTrickPose} from '../shared/ride-tricks.js';
import {stepSkiEvent,collectSlalomBoost} from './ski-events.js';
import {newAirControl,airInput,stepAirControl} from '../shared/ride-gestures.js';
import {skiCourse,LENGTH,WIDTH,RAMPS,ITEMS,itemAltitude} from './ski-course.js';
export {skiCourse,LENGTH,WIDTH,RAMPS,ITEMS,itemAltitude};
export const SKI_KEY='astra.gale.skiBlades.v7',GRAVITY=3.71*(8/3),HOP_SPEED=Math.sqrt(2*GRAVITY*8),DIVE_JOLT=24;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function newSkiRun(course){return {phase:'countdown',countdown:3,s:0,u:0,v:0,side:0,z:course.height(0),vz:0,air:false,time:0,score:0,pending:0,chain:0,bestCombo:0,items:[],ramps:[],tricks:[],repeats:{},rotation:newLunarRotation(),rotationAngle:0,input:newTrickInput('ski'),airControl:newAirControl(),trick:null,feedback:'SUMMIT DESCENT',recoveries:0,reason:'',safe:{s:0,u:0},boost:0,brakeHeld:false,brakeAge:0,airMode:'idle',yaw:0,yawRate:0,down:false};}
export function recoverSki(r,course){if(r.phase!=='running')return false;Object.assign(r,{s:r.safe.s,u:r.safe.u,z:course.height(r.safe.s,r.safe.u),v:30,side:0,vz:0,air:false,trick:null,pending:0,chain:0,rotation:newLunarRotation(),rotationAngle:0,input:newTrickInput('ski'),airControl:newAirControl(),boost:0,yaw:0,yawRate:0,down:false,airMode:'idle',brakeHeld:false,brakeAge:0});r.landingWindow=false;r.landingAttempt=null;r.landingTap=false;r.landingFlight=0;r.landingCueAge=0;delete r.worldX;delete r.worldY;r.time+=5;r.recoveries++;r.feedback='Recovered · combo lost';return true;}
const rideInput=input=>({press:input.press,gas:!!input.gas,special:!!input.brake,steer:input.steer||0,both:!!input.both,reverse:false});
export function captureSkiInput(r,input){if(r.air&&r.landingWindow&&input.press==='gas')r.landingTap=true;if(Math.abs(input.steer||0)>.01||input.both)cancelOrbBoost(r);if(input.press==='special'&&!r.air)requestOrbBoost(r);if(r.phase==='running')queueTrickInput(r.input,{...rideInput(input),time:r.time});}
export function resetSkiInput(r){r.rotation=newLunarRotation();r.rotationAngle=0;r.input=newTrickInput('ski');r.airControl=newAirControl();r.brakeHeld=false;r.brakeAge=0;r.airMode='idle';r.down=false;r.yawRate=0;}
function readRide(r,course,input){
 const rotate=rotationInput(r.rotation,course.landingScored&&r.air?{...input,gas:false,press:input.press==='gas'?'release':input.press}:input,r.air&&trickFits(r,course,ROTATION_SECONDS),!!r.trick&&(r.trick.kind==='spin'||r.trick.secret),r.airControl.lastGas);
 if(rotate){r.input.variationOpen=false;r.input.gas=!!input.special;r.input.left=input.both||input.steer<0;r.input.right=input.both||input.steer>0;r.input.steer=Math.sign(input.steer);r.input.both=input.both;r.input.history=[];r.airControl.lastGas=-99;r.feedback='Orbit turn';airInput(r.airControl,!r.air,{...input,press:'release'},!!r.trick,input.time);return;}

 releaseGrab(r.trick,input.special);
 const move=readTrickInput(r.input,input.time,r.air,!!r.trick,trickControlInput(input),r.trick?.kind==='grab'&&r.trick.releasing);
 if(move&&r.trick){if(trickFits(r,course,move.duration)){if(!move.variant)completeTrick(r,r.trick);const pose=r.trick.tree?moonTrickPose(r.trick):null;if(move.variant&&move.tree)move.hold=r.trick.hold;Object.assign(r.trick,move,{poseFrom:pose,name:skiMoveName(move.trick),direction:move.sign});r.feedback=r.trick.name;}else r.feedback='Too low for '+move.trick;}
 else if(move&&!beginTrick(r,course,move))r.input.variationOpen=false;
 airInput(r.airControl,!r.air,course.landingScored&&r.air&&r.landingWindow?{...input,gas:false,press:input.press==='gas'?'release':input.press}:input,!!r.trick||!!move,input.time);
}
export function trickFits(r,course,duration){const acceleration=GRAVITY;for(let t=.04;t<=duration+.06;t+=.04)if(r.z+r.vz*t-acceleration*t*t/2<=surfaceAt(r,course,r.v*t,r.side*t)+1)return false;return true;}
export const skiMoveName=name=>name.replace(/Tailwhip/g,'Blade whip').replace(/tailwhip/g,'blade whip').replace(/Whip rewind/g,'Blade rewind').replace(/whip rewind/g,'blade rewind').replace(/barspin/g,'blade spin');
export function beginTrick(r,course,move){if(!r.air||r.trick||!move)return false;if(!trickFits(r,course,move.duration)){r.feedback='Too low';return false;}r.trick={...move,name:skiMoveName(move.trick),age:0,direction:move.sign};r.feedback=r.trick.name;return true;}
function completeTrick(r,t){const key=t.kind?moveRepeatKey(t):t.name,n=r.repeats[key]??0;r.repeats[key]=n+1;r.pending+=Math.round((t.kind?movePoints(t):t.value)*Math.max(.2,1/(1+n*.5)));r.chain++;r.tricks.push(t.name);}
function bank(r){const points=Math.round(r.pending*Math.min(8,Math.max(1,r.chain)));r.score+=points;r.bestCombo=Math.max(r.bestCombo,points);if(points)r.feedback=`Banked ${points.toLocaleString()}`;r.pending=r.chain=0;}
/** Ground motion follows momentum: edge harder to trade speed for a tighter turn.
 * Thrust drives along the current heading; airborne motion stays drag-free. */
export function stepSkiGround(r,grade,crossGrade,input,dt,drive={}){
 const steer=clamp(input.steer||0,-1,1),edge=Math.abs(steer),brake=!!input.brake;
 r.brakePressure=(r.brakePressure??0)+((brake?1:0)-(r.brakePressure??0))*(1-Math.exp(-dt*(brake?5:9)));
 const powered=!brake&&(!!input.gas||r.boost>0),speed=Math.hypot(r.v,r.side);
 // Steering changes the current heading; releasing it never aims at a route rail.
 const rate=brake?1.35:powered?.32:.78;
 const angle=(speed>.001?Math.atan2(r.side,r.v):(r.facing??0))+steer*rate*Math.min(1,speed/12)*dt;
 const boostThrust=r.orbBoost?70:r.boostCollected?28+65*r.boostPower:42;
 const thrust=brake?0:(input.gas?(drive.thrust??35):0)+(r.boost>0?boostThrust:0),limit=r.boost>0?(r.orbBoost?470:r.boostCollected?390+90*r.boostPower:340):(drive.limit??280);
 const friction=(.025+speed*.004+speed*speed*.000025+edge*speed*(powered?.035:.08))*(powered?1:(drive.coastDrag??1))+r.brakePressure*(12+edge*13+edge*speed*.075);
 const norm=1+grade*grade+crossGrade*crossGrade;
 const forward= Math.cos(angle),side=Math.sin(angle);
 let v=speed*forward+(thrust*forward-GRAVITY*grade/norm)*dt;
 let u=speed*side+(thrust*side-GRAVITY*crossGrade/norm)*dt;
 const accelerated=Math.hypot(v,u),next=Math.max(0,accelerated-(friction+Math.max(0,speed-limit)*.8)*dt),scale=accelerated?next/accelerated:0;
 r.v=v*scale;r.side=u*scale;r.facing=angle;
}
function syncPosition(r,course){if(r.mappedS!==r.s||r.mappedU!==r.u||!Number.isFinite(r.worldX)){const p=course.point(r.s,r.u);r.worldX=p.x;r.worldY=p.y;r.mappedS=r.s;r.mappedU=r.u;}}
function surfaceAt(r,course,forward=0,side=0){
 if(!course.worldHeight||!Number.isFinite(r.worldX))return course.height(r.s+forward,r.u+side);
 const h=course.heading(r.s);return course.worldHeight(r.worldX+Math.sin(h)*forward+Math.cos(h)*side,r.worldY-Math.cos(h)*forward+Math.sin(h)*side);
}
/** Advance in world space, then express momentum in the route's local frame.
 * The route locates scenery and progress; it never bends an unsteered flight. */
function advancePosition(r,course,dt){
 const h=course.heading(r.s),sn=Math.sin(h),cs=Math.cos(h),vx=sn*r.v+cs*r.side,vy=-cs*r.v+sn*r.side;
 syncPosition(r,course);
 r.worldX+=vx*dt;r.worldY+=vy*dt;
 const q=course.coords(r.worldX,r.worldY);r.s=clamp(q.s,0,course.length);r.u=q.u;
 const next=course.heading(r.s);r.v=vx*Math.sin(next)-vy*Math.cos(next);r.side=vx*Math.cos(next)+vy*Math.sin(next);r.facing=Math.hypot(r.v,r.side)>.001?Math.atan2(r.side,r.v):(r.facing??0)+h-next;
 r.mappedS=r.s;r.mappedU=r.u;
}
export function stepSki(r,course,input,dt){
 if(r.phase==='result'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.05);
 if(r.phase==='countdown'){r.countdown=Math.max(0,r.countdown-dt);if(!r.countdown)r.phase='running';return;}
 syncPosition(r,course);r.time+=dt;stepLandingPrompt(r,course,input,dt,GRAVITY);r.boost=Math.max(0,r.boost-dt);stepOrbBoost(r,course,input);
 const previous={x:r.worldX,y:r.worldY,z:r.z,s:r.s};
 const steer=clamp(input.steer||0,-1,1),oldS=r.s,oldU=r.u,oldZ=r.z,oldAir=r.air;
 const gesture=rideInput(input);for(const e of r.input.events.splice(0))readRide(r,course,e);readRide(r,course,{...gesture,time:r.time});
 const air=stepAirControl(r.airControl,!r.air,course.landingScored&&r.air&&r.landingWindow?{...gesture,gas:false}:gesture,dt,!!r.trick,r.time,true);
 // Ground double-taps never launch skis; airborne slam remains available.
 if(air.dives&&r.air){r.vz=Math.min(0,r.vz)-DIVE_JOLT*air.dives;r.feedback='Down-thrust';}
 r.down=air.dive;r.airMode=r.air&&air.dive?'slam':r.air&&!course.landingScored&&input.gas&&steer?'turn':'idle';r.yawRate=air.yaw;
 r.yaw=course.landingScored?0:air.yaw*.2;
 const grade=clamp((surfaceAt(r,course,12)-surfaceAt(r,course,-12))/24,-.8,.8);
 const crossGrade=clamp((surfaceAt(r,course,0,12)-surfaceAt(r,course,0,-12))/24,-.8,.8);
 if(!r.air)stepSkiGround(r,grade,crossGrade,{...input,brake:!!input.both},dt,course.drive);
 else if(r.airMode==='turn'){const angle=air.yaw*dt,c=Math.cos(angle),sn=Math.sin(angle),v=r.v;r.v=v*c-r.side*sn;r.side=v*sn+r.side*c;}
 holdBoostSpeed(r);
 // The broad mountain is traversable: no invisible shoulder spring or speed tax.
 advancePosition(r,course,dt);
 const ground=surfaceAt(r,course),nextZ=r.z+r.vz*dt-GRAVITY*dt*dt/2;
 // The archived descent suppresses takeoff on untagged survey facets.
 // Current games instead preserve bounded tangent momentum on natural crests.
 const onJump=(course.relief?.(oldS,oldU)??0)>.1;
 if(course.naturalAir&&!r.air){
  skiContact(r,(v,u)=>surfaceAt(r,course,v,u),dt,GRAVITY);
  if(!r.air&&r.s-r.safe.s>200&&Math.abs(r.u)<course.width)r.safe={s:r.s,u:r.u};
 }
 else if(!r.air&&Math.hypot(r.v,r.side)>25&&onJump&&nextZ>ground+.12){r.air=true;r.vz=clamp(r.vz,-45,18);r.z=oldZ+r.vz*dt-GRAVITY*dt*dt/2;r.vz-=GRAVITY*dt;r.feedback='Airborne';for(let i=0;i<RAMPS.length;i++)if(Math.abs(oldS-RAMPS[i].s)<100&&!r.ramps.includes(i))r.ramps.push(i);}
 else if(!r.air){r.z=ground;const vertical=(ground-oldZ)/dt;r.vz=onJump?clamp(vertical,-45,18):Math.min(0,vertical);if(r.s-r.safe.s>350&&Math.abs(r.u)<WIDTH*.8&&Math.abs(grade)<.35)r.safe={s:r.s,u:r.u};}
 else {r.z=nextZ;r.vz-=(GRAVITY+(air.dive?32:0))*dt;}
 if(r.air&&r.trick){const t=r.trick,cycles=t.cycles,done=t.kind?advanceMove(t,!!input.brake,dt,!t.secret&&trickFits(r,course,t.duration)):(t.age+=dt)>=t.duration;if(t.cycles>cycles)completeTrick(r,t);if(done){completeTrick(r,t);r.trick=null;r.feedback='Trick complete';}}
 if(r.air&&r.z<=ground){scoreSkiLanding(r,course,skiVisualPose(r.trick));r.z=ground;r.air=false;r.down=false;const clean=!r.trick;if(clean)bank(r);else{r.v*=.65;r.feedback='Unfinished trick · combo lost';r.pending=r.chain=0;}r.trick=null;r.vz=0;r.contactVelocity=undefined;r.contactLock=.25;r.crestAge=0;resetSkiInput(r);r.input.gas=!!input.brake;r.input.steer=Math.sign(input.steer||0);r.input.left=!!input.both||input.steer<0;r.input.right=!!input.both||input.steer>0;r.airControl.held=!!input.gas;r.airControl.brakeHeld=!!input.brake;r.airControl.grounded=true;}
 r.rotationAngle=stepLunarRotation(r.rotation,dt,r.air);
 const items=course.items??ITEMS;for(let i=0;i<items.length;i++){const p=items[i];if(!r.items.includes(i)&&oldS<=p.s&&r.s>=p.s){const t=(p.s-oldS)/Math.max(.001,r.s-oldS),u=oldU+(r.u-oldU)*t,z=oldZ+(r.z-oldZ)*t;if(Math.abs(u-p.u)<(p.radius??65)&&Math.abs(z-itemAltitude(course,p))<40&&(p.kind!=='slalom-boost'||!oldAir&&!r.air)){r.items.push(i);if(p.kind==='slalom-boost')collectSlalomBoost(r);else{r.boost=p.boost;r.score+=100;r.feedback='Boost · +100';}}}}
 if(course.arena&&Math.hypot(r.worldX-course.arena.x,r.worldY-course.arena.y)>course.arena.radius){r.safe={s:0,u:0};recoverSki(r,course);r.feedback='Back to crater park · combo lost';}
 stepScoreCourse(r,course,previous,dt,recoverSki);
 if(course.practice||r.phase==='result')return;
 if(course.mode){stepSkiEvent(r,course,oldS,oldU,oldAir);return;}
 if(r.s>=course.length&&!r.air&&Math.abs(r.u)<WIDTH){bank(r);r.phase='result';r.reason='Descent complete';r.score+=500;}
}
export function loadSkiRecord(storage){try{const r=JSON.parse(storage.getItem(SKI_KEY));return r&&r.version===7&&Number.isFinite(r.best)&&r.best>=0&&Number.isFinite(r.runs)&&r.runs>=0?r:{version:7,best:0,runs:0,combo:0,fastest:null};}catch{return {version:7,best:0,runs:0,combo:0,fastest:null};}}
export function saveSkiResult(storage,record,r){const next={...record,runs:record.runs+1};if(r.reason==='Descent complete'){next.best=Math.max(record.best,skiRating(r));next.points=Math.max(record.points||0,r.score);next.combo=Math.max(record.combo||0,r.bestCombo);next.fastest=Math.min(record.fastest??Infinity,r.time);}try{storage.setItem(SKI_KEY,JSON.stringify(next));return {record:next,saved:true};}catch{return {record:next,saved:false};}}

// Preserve live combo points; the final rating rewards completion, banked tricks and variety.
export function skiRating(r){if(r.reason!=='Descent complete')return 0;const trickPoints=Math.max(0,r.score-500-r.items.length*100);return Math.round(10+70*Math.min(1,trickPoints/10000)+20*Math.min(1,new Set(r.tricks).size/7));}

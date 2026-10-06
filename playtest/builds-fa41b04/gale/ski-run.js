// Summit descent. Local Mars gravity, shared Moon trick grammar, optional boost lines.
import {newTrickInput,readTrickInput,queueTrickInput} from '../shared/ride-tricks.js';
import {newAirControl,airInput,stepAirControl} from '../shared/ride-gestures.js';
import {skiCourse,LENGTH,WIDTH,RAMPS,ITEMS,itemAltitude} from './ski-course.js';
export {skiCourse,LENGTH,WIDTH,RAMPS,ITEMS,itemAltitude};
export const SKI_KEY='astra.gale.skiBlades.v3',GRAVITY=14.84,HOP_SPEED=8,DIVE_JOLT=16;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function newSkiRun(course){return {phase:'countdown',countdown:3,s:0,u:0,v:0,side:0,z:course.height(0),vz:0,air:false,time:0,score:0,pending:0,chain:0,bestCombo:0,items:[],ramps:[],tricks:[],repeats:{},input:newTrickInput(false),airControl:newAirControl(),trick:null,feedback:'SUMMIT DESCENT',recoveries:0,reason:'',safe:{s:0,u:0},boost:0,brakeHeld:false,brakeAge:0,airMode:'idle',yaw:0,yawRate:0,down:false};}
export function recoverSki(r,course){if(r.phase!=='running')return false;Object.assign(r,{s:r.safe.s,u:r.safe.u,z:course.height(r.safe.s,r.safe.u),v:30,side:0,vz:0,air:false,trick:null,pending:0,chain:0,input:newTrickInput(false),airControl:newAirControl(),boost:0,yaw:0,yawRate:0,down:false,airMode:'idle',brakeHeld:false,brakeAge:0});r.time+=5;r.recoveries++;r.feedback='Recovered · combo lost';return true;}
const rideInput=input=>({gas:!!input.gas,special:!!input.brake,steer:input.steer||0,both:!!input.both,reverse:false});
export function captureSkiInput(r,input){if(r.phase==='running')queueTrickInput(r.input,{...rideInput(input),time:r.time});}
export function resetSkiInput(r){r.input=newTrickInput(false);r.airControl=newAirControl();r.brakeHeld=false;r.brakeAge=0;r.airMode='idle';r.down=false;r.yawRate=0;}
function readRide(r,course,input){
 const move=readTrickInput(r.input,input.time,r.air,!!r.trick,input);
 if(move&&r.trick){Object.assign(r.trick,move,{name:skiMoveName(move.trick)});r.trick.value+=35;r.feedback=r.trick.name;}
 else if(move&&!beginTrick(r,course,move))r.input.variationOpen=false;
 airInput(r.airControl,!r.air,input,!!r.trick||!!move,input.time);
}
export function trickFits(r,course,duration){const acceleration=GRAVITY;for(let t=.04;t<=duration+.06;t+=.04)if(r.z+r.vz*t-acceleration*t*t/2<=course.height(Math.min(course.length,r.s+r.v*t),r.u+r.side*t)+1)return false;return true;}
export const skiMoveName=name=>name.replace(/Tailwhip/g,'Blade whip').replace(/tailwhip/g,'blade whip').replace(/Whip rewind/g,'Blade rewind').replace(/whip rewind/g,'blade rewind').replace(/barspin/g,'blade spin');
export function beginTrick(r,course,move){if(!r.air||r.trick||!move)return false;if(!trickFits(r,course,move.duration)){r.feedback='Too low';return false;}r.trick={...move,name:skiMoveName(move.trick),value:(move.axis==='flip'||move.axis==='bar'?300:150)+(move.rotations-1)*100+(move.variant?35:0),age:0,direction:move.sign};r.feedback=r.trick.name;return true;}
function bank(r){const points=Math.round(r.pending*Math.min(8,Math.max(1,r.chain)));r.score+=points;r.bestCombo=Math.max(r.bestCombo,points);if(points)r.feedback=`Banked ${points.toLocaleString()}`;r.pending=r.chain=0;}
export function stepSki(r,course,input,dt){
 if(r.phase==='result'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.05);
 if(r.phase==='countdown'){r.countdown=Math.max(0,r.countdown-dt);if(!r.countdown)r.phase='running';return;}
 r.time+=dt;r.boost=Math.max(0,r.boost-dt);
 const steer=clamp(input.steer||0,-1,1),oldS=r.s,oldU=r.u,oldZ=r.z;
 const gesture=rideInput(input);for(const e of r.input.events.splice(0))readRide(r,course,e);readRide(r,course,{...gesture,time:r.time});
 const air=stepAirControl(r.airControl,!r.air,gesture,dt,!!r.trick,r.time);
 if(air.hop&&!r.air){r.air=true;r.vz=HOP_SPEED;r.feedback='Hop';}
 if(air.dives&&r.air){r.vz=Math.min(0,r.vz)-DIVE_JOLT*air.dives;r.feedback='Down-thrust';}
 r.down=air.dive;r.airMode=r.air&&input.brake&&steer?'turn':'idle';r.yawRate=air.yaw;
 if(r.air)r.yaw=clamp(r.yaw+r.yawRate*dt,-.8,.8);else r.yaw*=Math.exp(-dt*5);
 const grade=clamp((course.height(r.s+12,r.u)-course.height(r.s-12,r.u))/24,-.8,.8);
 if(!r.air){const boost=r.boost>0&&!input.brake?42:0,limit=r.boost>0?340:280;r.v=clamp(r.v+(-GRAVITY*grade+10+(input.gas?35:0)+boost-(input.brake?85:0)-r.v*.10-Math.max(0,r.v-limit)*.8)*dt,0,Math.max(limit,r.v));r.side+=(steer*105-r.side*(input.brake?4:1.2)-course.curvature(r.s)*r.v*r.v)*dt;}
 else {r.side+=((r.airMode==='turn'?steer*38:0)-course.curvature(r.s)*r.v*r.v)*dt;}
 // Broad soft shoulders. No lane gate, forced recovery, or combo loss for choosing another line.
 if(Math.abs(r.u)>WIDTH){const excess=Math.abs(r.u)-WIDTH;r.side-=Math.sign(r.u)*Math.min(160,excess*.18)*dt;if(!r.air)r.v*=Math.exp(-dt*.25);}
 r.s=Math.min(course.length,r.s+r.v*dt);r.u+=r.side*dt;
 const ground=course.height(r.s,r.u),nextZ=r.z+r.vz*dt-GRAVITY*dt*dt/2;
 if(!r.air&&r.v>25&&nextZ>ground+.12){r.air=true;r.z=nextZ;r.vz-=GRAVITY*dt;r.feedback='Airborne';for(let i=0;i<RAMPS.length;i++)if(Math.abs(oldS-RAMPS[i].s)<100&&!r.ramps.includes(i))r.ramps.push(i);}
 else if(!r.air){r.z=ground;r.vz=(ground-oldZ)/dt;if(r.s-r.safe.s>350&&Math.abs(r.u)<WIDTH*.8&&Math.abs(grade)<.35)r.safe={s:r.s,u:r.u};}
 else {r.z=nextZ;r.vz-=GRAVITY*dt;}
 if(r.air&&r.trick){r.trick.age+=dt;if(r.trick.age>=r.trick.duration){const t=r.trick,n=r.repeats[t.name]??0;r.repeats[t.name]=n+1;r.pending+=Math.round(t.value*Math.max(.2,1/(1+n*.5)));r.chain++;r.tricks.push(t.name);r.trick=null;r.feedback='Trick complete';}}
 if(r.air&&r.z<=ground){r.z=ground;r.air=false;r.down=false;const clean=!r.trick&&Math.abs(r.side)<100;if(clean)bank(r);else{r.v*=.65;r.feedback='Unfinished trick · combo lost';r.pending=r.chain=0;}r.trick=null;r.vz=(course.height(Math.min(course.length,r.s+r.v*dt),r.u+r.side*dt)-ground)/dt;resetSkiInput(r);r.input.gas=!!input.gas;r.input.steer=Math.sign(input.steer||0);r.airControl.held=!!input.gas;r.airControl.grounded=true;}
 for(let i=0;i<ITEMS.length;i++){const p=ITEMS[i];if(!r.items.includes(i)&&oldS<=p.s&&r.s>=p.s){const t=(p.s-oldS)/Math.max(.001,r.s-oldS),u=oldU+(r.u-oldU)*t,z=oldZ+(r.z-oldZ)*t;if(Math.abs(u-p.u)<65&&Math.abs(z-itemAltitude(course,p))<40){r.items.push(i);r.boost=p.boost;r.score+=100;r.feedback='Boost · +100';}}}
 if(r.s>=course.length&&!r.air){bank(r);r.phase='result';r.reason='Descent complete';r.score+=500;}
}
export function loadSkiRecord(storage){try{const r=JSON.parse(storage.getItem(SKI_KEY));return r&&r.version===3&&Number.isFinite(r.best)&&r.best>=0&&Number.isFinite(r.runs)&&r.runs>=0?r:{version:3,best:0,runs:0,combo:0,fastest:null};}catch{return {version:3,best:0,runs:0,combo:0,fastest:null};}}
export function saveSkiResult(storage,record,r){const next={...record,runs:record.runs+1};if(r.reason==='Descent complete'){next.best=Math.max(record.best,r.score);next.combo=Math.max(record.combo||0,r.bestCombo);next.fastest=Math.min(record.fastest??Infinity,r.time);}try{storage.setItem(SKI_KEY,JSON.stringify(next));return {record:next,saved:true};}catch{return {record:next,saved:false};}}

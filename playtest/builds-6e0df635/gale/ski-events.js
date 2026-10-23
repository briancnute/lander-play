import {EVEREST_ACTIVITY,EVEREST_RECORD_KEY} from './ski-environment.js';
import {SLALOM_COURSES,slalomChoice,slalomRecordKey,slalomRecordVersion} from './slalom-catalog.js';
import {holdBoostSpeed} from './ski-boost.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const SKI_EVENT_KEYS={'slalom-hard':'astra.gale.slalom-hard.v5',slalom:'astra.gale.slalom.v10',crater:'astra.gale.craterTricks.v5'};
SKI_EVENT_KEYS[EVEREST_ACTIVITY]=EVEREST_RECORD_KEY;
for(const c of SLALOM_COURSES)SKI_EVENT_KEYS[c.id]=slalomRecordKey(c.id);
export function initSkiEvent(r,course){Object.assign(r,{slalomTime:null,slalomSampleTime:0,timeTarget:course.timeTarget??slalomChoice(course.recordMode)?.timeTarget??null,slalomEnd:course.items?.find(p=>p.kind==='slalom-boost')?.s??4800,landingScored:!!course.landingScored,mode:course.mode,recordMode:course.recordMode??course.mode,gateFeedback:[],gates:[],gateHits:0,gateQuality:0,boostCharge:0,boostPower:0,boostCollected:false,finalJump:false,jumpBoost:0,overtime:false,orbs:[],outsideSeconds:0,roverFound:false,roverPopupPending:false,finishedCourse:false,feedback:course.mode==='slalom'?'SLALOM · 10 GATES':'CRATER TRICKS · 2 MINUTES'});return r;}
export function stepSkiEvent(r,c,oldS,oldU,oldAir){
 if(!c.mode)return;
 if(c.mode==='slalom'){
  // Freeze the clock at turbo entry, including elapsed recovery penalties but excluding every QTE.
  if(r.timeTarget&&r.slalomTime===null&&oldS<r.slalomEnd&&r.s>=r.slalomEnd){const f=clamp((r.slalomEnd-oldS)/Math.max(.0001,r.s-oldS),0,1);r.slalomTime=r.slalomSampleTime+(r.time-r.slalomSampleTime)*f;}
  r.slalomSampleTime=r.time;
  for(let i=0;i<c.gates.length;i++){const g=c.gates[i];if(r.gates.includes(i)||oldS>=g.s||r.s<g.s)continue;const u=oldU+(r.u-oldU)*(g.s-oldS)/Math.max(.0001,r.s-oldS),error=Math.abs(u-g.u),hit=error<g.half&&!oldAir&&!r.air;r.gates.push(i);r.gateFeedback.push({index:i,hit,at:r.time,lateral:u,target:g.u,error,halfWidth:g.half,speed:r.v,airborne:!!(oldAir||r.air)});if(hit){r.gateHits++;r.gateQuality+=1-.3*error/g.half;r.feedback=`Gate ${r.gateHits}/${c.gates.length}`;}else r.feedback='Gate missed';r.boostCharge=clamp(r.gateQuality/c.gates.length,0,1);r.feedback+=` · Boost ${Math.round(r.boostCharge*100)}%`;}
  if(c.timedJump&&!r.jump&&r.s>=c.lip){r.phase='result';r.reason='Missed jump ramp';return;}
  if(!c.timedJump&&!r.finalJump&&oldS<c.lip&&r.s>=c.lip&&Math.abs(r.u)<180&&r.z-c.height(r.s,r.u)<30){r.finalJump=true;r.jumpBoost=(c.jumpReward??22)*(r.boostCollected?r.boostPower:0);r.air=true;if(c.tangentLaunch){
   // Use only the rising face: sampling beyond the lip averages in its drop.
   // Momentum follows the actual direction of travel, including a diagonal exit.
   const span=40,grade=(c.height(c.lip-10,r.u)-c.height(c.lip-10-span,r.u))/span;
   const cross=(c.height(c.lip-20,r.u+12)-c.height(c.lip-20,r.u-12))/24;
   r.vz=grade*r.v+cross*r.side;r.launchGrade=grade;r.launchVz=r.vz;
  }else r.vz=(c.launchSpeed??30)+r.jumpBoost;r.takeoff='final-jump';r.feedback=`FINAL JUMP · +${Math.round((r.boostCollected?r.boostPower:0)*100)}%`;}
  if(c.landingScored?oldAir&&!r.air&&!!r.finalLanding:r.s>=(c.finish??c.length)&&!r.air){r.phase='result';r.reason='Slalom complete';}
  if(r.time>=c.limit&&r.phase!=='result'){r.phase='result';r.reason='Time expired';r.pending=r.chain=0;r.trick=null;}
 }else if(c.mode==='crater'){
  if(r.time>=c.limit){r.overtime=r.air&&(r.pending>0||r.trick);if(!r.overtime||r.time>=c.limit+8){r.phase='result';r.reason=c.scoreCourse?'Time expired':'Crater run complete';r.pending=r.chain=0;r.trick=null;}}
 }
}
export function slalomTimePoints(r){return r.timeTarget&&Number.isFinite(r.slalomTime)?15*clamp(1-(r.slalomTime-r.timeTarget)/12,0,1):0;}
export function slalomGatePoints(r){return (r.timeTarget?35:50)*r.gateQuality/10;}
export function skiEventScore(r){if(r.mode==='crater')return Math.max(0,Math.round(r.score));if(r.reason!=='Slalom complete')return 0;if(r.jump)return Math.round(clamp(slalomGatePoints(r)+slalomTimePoints(r)+15*r.jump.takeoff.score/100+15*r.jump.execution/100+20*(r.finalLanding?.quality??0),0,100));const score=Math.round(clamp((r.landingScored?50:60)*r.gateQuality/10+15*clamp((75-r.time)/40,0,1)+(r.landingScored?15:25)*clamp(r.bestCombo/3500,0,1)+(r.landingScored?20*(r.finalLanding?.quality??0):0),0,100));return r.landingScored&&r.finalLanding?.points!==100?Math.min(99,score):score;}
export function loadSkiEventRecord(storage,mode){const version=mode===EVEREST_ACTIVITY?1:slalomChoice(mode)?slalomRecordVersion(mode):mode==='slalom-hard'?5:mode==='slalom'?10:5,empty={version,mode,best:0,runs:0,combo:0,fastest:null};try{const r=JSON.parse(storage.getItem(SKI_EVENT_KEYS[mode]));return r?.version===version&&r.mode===mode&&Number.isFinite(r.best)&&r.best>=0&&Number.isFinite(r.runs)&&r.runs>=0?{...empty,...r}:empty;}catch{return empty;}}
export function saveSkiEventRecord(storage,record,r){const complete=r.reason==='Slalom complete'||r.reason==='Crater run complete'||r.mode==='crater'&&r.reason==='Time expired',next={...record,runs:record.runs+1};if(complete){next.best=Math.max(record.best,skiEventScore(r));if(r.timeTarget&&Number.isFinite(r.slalomTime))next.fastestSlalom=Math.min(record.fastestSlalom??Infinity,r.slalomTime);next.combo=Math.max(record.combo,r.bestCombo);if(r.reason!=='Time expired')next.fastest=Math.min(record.fastest??Infinity,r.time);if(r.jump){const components={gates:Math.round(slalomGatePoints(r)),...(r.timeTarget?{slalomTime:r.slalomTime,timePoints:slalomTimePoints(r)}:{}),takeoff:r.jump.takeoff.score,trick:r.jump.execution,landing:r.finalLanding.points,class:r.jump.config.name,move:r.tricks.at(-1)};next.last=components;if(skiEventScore(r)>=record.best)next.bestComponents=components;}}try{storage.setItem(SKI_EVENT_KEYS[r.recordMode??r.mode],JSON.stringify(next));return {record:next,saved:true};}catch{return {record:next,saved:false};}}

/** Charge is earned per gate; collecting the run-up bar commits it once. */
export function collectSlalomBoost(r){if(r.boostCollected)return;r.boostCollected=true;r.boostPower=clamp(r.boostCharge,0,1);r.boost=4+2*r.boostPower;r.boostSpeed=390+90*r.boostPower;holdBoostSpeed(r);r.feedback=`BOOST · ${Math.round(r.boostPower*100)}%`; }

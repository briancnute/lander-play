export const TIME_TRIAL_KEY='astra.earth.everest-time-trial.v1';
export const TIME_TRIAL_ACTIVITY='everest-time-trial';
export const MISSED_GATE_SECONDS=3;
export function initTimeTrial(r,c){return Object.assign(r,{timeTrial:true,mode:'time-trial',recordMode:TIME_TRIAL_ACTIVITY,gates:[],gateFeedback:[],gateHits:0,totalCheckpoints:c.gates.length,gateQuality:0,penalty:0,finishMissed:false,finishTime:null,slalomTime:null,lastTrialTime:0,feedback:'GO · FIND YOUR LINE'});}
/** Swept checkpoints and finish use the same physical world/route coordinates. */
export function stepTimeTrialEvent(r,c,oldS,oldU,oldAir){
 for(const [i,g]of c.gates.entries()){
  if(r.gates.includes(i)||oldS>=g.s||r.s<g.s)continue;
  const u=oldU+(r.u-oldU)*(g.s-oldS)/Math.max(.0001,r.s-oldS),error=Math.abs(u-g.u),hit=error<g.half&&!oldAir&&!r.air;
  r.gates.push(i);r.gateFeedback.push({index:i,hit,at:r.time,lateral:u,target:g.u,error,halfWidth:g.half,speed:r.v,airborne:!!(oldAir||r.air)});
  if(hit){r.gateHits++;r.gateQuality++;r.feedback=`CHECKPOINT ${i+1}/${c.gates.length}`;}else{r.penalty+=MISSED_GATE_SECONDS;r.feedback=`MISSED GATE · +${MISSED_GATE_SECONDS}s`;}
 }
 if(oldS<c.finish&&r.s>=c.finish&&!r.air&&Math.abs(r.u)<(c.finishHalf??c.width)){
  const t=Math.max(0,Math.min(1,(c.finish-oldS)/Math.max(.0001,r.s-oldS)));
  r.time-= (1-t)*(r.time-r.lastTrialTime);r.finishTime=r.time+r.penalty;r.phase='result';r.reason='Time trial complete';
 }else if(oldS<c.finish&&r.s>=c.finish&&!r.air){r.finishMissed=true;}
 if(r.time>=c.limit&&r.phase!=='result'){r.phase='result';r.reason='Time expired';}
 r.lastTrialTime=r.time;
}
export function timeTrialScore(r){return r.reason==='Time trial complete'?Number((r.finishTime??r.time+r.penalty).toFixed(3)):null;}
export function loadTimeTrialRecord(storage){const empty={version:1,mode:TIME_TRIAL_ACTIVITY,best:null,runs:0,last:null};try{const r=JSON.parse(storage.getItem(TIME_TRIAL_KEY));return r?.version===1&&r.mode===TIME_TRIAL_ACTIVITY&&Number.isInteger(r.runs)&&r.runs>=0&&(r.best===null||Number.isFinite(r.best)&&r.best>0)?{...empty,...r}:empty;}catch{return empty;}}
export function saveTimeTrialRecord(storage,r){const current=loadTimeTrialRecord(storage),score=timeTrialScore(r),last={time:r.time,penalty:r.penalty,checkpoints:r.gateHits,total:r.totalCheckpoints??r.gates.length,finished:score!==null,seconds:score},record={...current,runs:current.runs+1,last};if(score!==null&&(record.best===null||score<record.best)){record.best=score;record.bestComponents=last;}
 try{storage.setItem(TIME_TRIAL_KEY,JSON.stringify(record));return {record,saved:true,newBest:score!==null&&(current.best===null||score<current.best)};}catch{return {record,saved:false,newBest:false};}}

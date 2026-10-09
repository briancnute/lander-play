const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const SKI_EVENT_KEYS={slalom:'astra.gale.slalom.v2',crater:'astra.gale.craterTricks.v1'};
export function initSkiEvent(r,course){Object.assign(r,{mode:course.mode,gates:[],gateHits:0,gateQuality:0,boostCharge:0,boostPower:0,boostCollected:false,finalJump:false,jumpBoost:0,overtime:false,feedback:course.mode==='slalom'?'SLALOM · 10 GATES':'CRATER TRICKS · 2 MINUTES'});return r;}
export function stepSkiEvent(r,c,oldS,oldU,oldAir){
 if(!c.mode)return;
 if(c.mode==='slalom'){
  for(let i=0;i<c.gates.length;i++){const g=c.gates[i];if(r.gates.includes(i)||oldS>=g.s||r.s<g.s)continue;const u=oldU+(r.u-oldU)*(g.s-oldS)/Math.max(.0001,r.s-oldS),error=Math.abs(u-g.u),hit=error<g.half&&!oldAir&&!r.air;r.gates.push(i);if(hit){r.gateHits++;r.gateQuality+=1-.3*error/g.half;r.feedback=`Gate ${r.gateHits}/${c.gates.length}`;}else r.feedback='Gate missed';r.boostCharge=clamp(r.gateQuality/c.gates.length,0,1);r.feedback+=` · Boost ${Math.round(r.boostCharge*100)}%`;}
  if(!r.finalJump&&oldS<c.lip&&r.s>=c.lip&&Math.abs(r.u)<180&&r.z-c.height(r.s,r.u)<30){r.finalJump=true;r.jumpBoost=22*(r.boostCollected?r.boostPower:0);r.air=true;r.vz=30+r.jumpBoost;r.feedback=`FINAL JUMP · +${Math.round((r.boostCollected?r.boostPower:0)*100)}%`;}
  if(r.s>=(c.finish??c.length)&&!r.air){r.phase='result';r.reason='Slalom complete';}
  if(r.time>=c.limit&&r.phase!=='result'){r.phase='result';r.reason='Time expired';r.pending=r.chain=0;r.trick=null;}
 }else if(c.mode==='crater'){
  if(r.time>=c.limit){r.overtime=r.air&&(r.pending>0||r.trick);if(!r.overtime||r.time>=c.limit+8){r.phase='result';r.reason='Crater run complete';r.pending=r.chain=0;r.trick=null;}}
 }
}
export function skiEventScore(r){if(r.mode==='crater')return Math.max(0,Math.round(r.score));if(r.reason!=='Slalom complete')return 0;return Math.round(clamp(60*r.gateQuality/10+15*clamp((75-r.time)/40,0,1)+25*clamp(r.bestCombo/3500,0,1),0,100));}
export function loadSkiEventRecord(storage,mode){const version=mode==='slalom'?2:1,empty={version,mode,best:0,runs:0,combo:0,fastest:null};try{const r=JSON.parse(storage.getItem(SKI_EVENT_KEYS[mode]));return r?.version===version&&r.mode===mode&&Number.isFinite(r.best)&&r.best>=0&&Number.isFinite(r.runs)&&r.runs>=0?{...empty,...r}:empty;}catch{return empty;}}
export function saveSkiEventRecord(storage,record,r){const complete=r.reason==='Slalom complete'||r.reason==='Crater run complete',next={...record,runs:record.runs+1};if(complete){next.best=Math.max(record.best,skiEventScore(r));next.combo=Math.max(record.combo,r.bestCombo);next.fastest=Math.min(record.fastest??Infinity,r.time);}try{storage.setItem(SKI_EVENT_KEYS[r.mode],JSON.stringify(next));return {record:next,saved:true};}catch{return {record:next,saved:false};}}

/** Charge is earned per gate; collecting the run-up token commits it once. */
export function collectSlalomBoost(r){if(r.boostCollected)return;r.boostCollected=true;r.boostPower=clamp(r.boostCharge,0,1);r.boost=4+2*r.boostPower;r.feedback=`BOOST · ${Math.round(r.boostPower*100)}%`; }

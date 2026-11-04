// V2 race rules. The underlying rover, terrain and ordered gate physics stay intact.
export const RACE_RULES='jezero-arcade-1';
export const RECOVERY_SECONDS=5;
export function sweptNear(a,b,p,radius){
 const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;
 const t=len?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/len)):0;
 return Math.hypot(a.x+dx*t-p.x,a.y+dy*t-p.y)<=radius;
}
export function raceLayout(course,ground,rocks=[]){
 const route=course.route,cells=[],cuts=[];
 const nearest=p=>route.reduce((best,q,i)=>Math.hypot(q.x-p.x,q.y-p.y)<Math.hypot(route[best].x-p.x,route[best].y-p.y)?i:best,0);
 const safe=p=>Number.isFinite(ground(p.x,p.y))&&Math.hypot(ground(p.x+8,p.y)-ground(p.x-8,p.y),ground(p.x,p.y+8)-ground(p.x,p.y-8))/16<.65&&!rocks.some(([x,y,r])=>Math.hypot(x-p.x,y-p.y)<r+26);
 // Supply cells reward staying on the longer, prepared route; three charges maximum.
 for(const f of [.18,.48,.76]){const center=Math.round((route.length-1)*f);for(let d=0;d<Math.min(30,route.length/8);d++){const p=route[Math.min(route.length-1,center+d)];if(safe(p)){cells.push({...p,id:cells.length});break;}}}
 const gates=[course.start??course.finish,...course.gates,course.finish];
 for(let k=1;k<gates.length&&cuts.length<2;k++){
  const a=gates[k-1],b=gates[k],start=nearest(a),end=nearest(b),direct=Math.hypot(b.x-a.x,b.y-a.y);
  if(end<=start||direct<180)continue;
  let road=0;for(let i=start+1;i<=end;i++)road+=Math.hypot(route[i].x-route[i-1].x,route[i].y-route[i-1].y);
  if(road<direct*1.08)continue;
  const samples=Array.from({length:Math.ceil(direct/20)+1},(_,i)=>({x:a.x+(b.x-a.x)*i/Math.ceil(direct/20),y:a.y+(b.y-a.y)*i/Math.ceil(direct/20)}));
  if(samples.every(safe))cuts.push({gate:k-1,points:samples});
 }
 return {cells,cuts};
}
export function newRaceRun(layout){return {layout,spent:[],splits:[],recoveries:0};}
export function collectRaceCells(run,state,previous){
 if(state.mode!=='trial'||state.countdown>0||state.done||state.air||state.raceBoosts>=3)return 0;
 for(const p of run.layout.cells)if(!run.spent.includes(p.id)&&sweptNear(previous,state,p,28)){run.spent.push(p.id);state.raceBoosts++;return 1;}
 return 0;
}
export function recoverRace(run,state,course,ground){
 if(state.mode!=='trial'||state.countdown>0||state.done)return false;
 const p=state.nextGate?course.gates[state.nextGate-1]:course.start??course.finish;
 Object.assign(state,{x:p.x,y:p.y,z:ground(p.x,p.y),heading:p.heading,v:0,vz:0,air:false,boost:0,impact:0,turnaround:false,boundary:false,driftVX:null,driftVY:null,slip:0});
 state.time+=RECOVERY_SECONDS;run.recoveries++;return true;
}
export function raceRecordKey(id,rover,drift){return `${RACE_RULES}:${id}:${rover}:${drift?'drift':'grip'}`;}
export function readRaceRecords(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return {};
 return Object.fromEntries(Object.entries(raw).filter(([key,r])=>key.startsWith(RACE_RULES+':')&&r&&Number.isFinite(r.time)&&r.time>0&&Array.isArray(r.splits)&&r.splits.every(t=>Number.isFinite(t)&&t>=0)));
}

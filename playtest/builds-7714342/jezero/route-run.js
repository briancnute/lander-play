// Authored driving adaptation. The measured NASA traverse is never edited.
export const ROUTE_HALF_WIDTH=58,ROUTE_VERSION=1;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function segmentDistance(p,a,b){const x=b.x-a.x,y=b.y-a.y,l=x*x+y*y,t=l?clamp(((p.x-a.x)*x+(p.y-a.y)*y)/l,0,1):0;return Math.hypot(p.x-a.x-t*x,p.y-a.y-t*y);}
function simplify(points,tolerance=100){if(points.length<3)return points;const keep=new Set([0,points.length-1]),stack=[[0,points.length-1]];while(stack.length){const [a,b]=stack.pop();let best=tolerance,index=-1;for(let i=a+1;i<b;i++){const d=segmentDistance(points[i],points[a],points[b]);if(d>best){best=d;index=i;}}if(index>=0){keep.add(index);stack.push([a,index],[index,b]);}}return [...keep].sort((a,b)=>a-b).map(i=>points[i]);}
export function buildRouteCourse(journey,rocks=[]){
 const raw=journey.checkpoints.map((p,source)=>({...p,source})),anchors=[...new Set([0,...(journey.lookouts??[]).map(p=>p.checkpoint),raw.length-1])].sort((a,b)=>a-b),base=[];
 for(let i=1;i<anchors.length;i++){const part=simplify(raw.slice(anchors[i-1],anchors[i]+1));base.push(...(base.length?part.slice(1):part));}
 const offset=76,curve=[];
 for(let i=0;i<base.length;i++){const p=base[i],a=base[Math.max(0,i-1)],b=base[Math.min(base.length-1,i+1)],la=distance(a,p)||distance(p,b)||1,lb=distance(p,b)||la,u=i?{x:(p.x-a.x)/la,y:(p.y-a.y)/la}:{x:(b.x-p.x)/lb,y:(b.y-p.y)/lb},v=i<base.length-1?{x:(b.x-p.x)/lb,y:(b.y-p.y)/lb}:u;
  if(u.x*v.x+u.y*v.y<-.85){const angle=Math.atan2(u.x,-u.y);for(let k=0;k<=12;k++){const t=angle-Math.PI*k/12;curve.push({...p,x:p.x+Math.cos(t)*offset,y:p.y+Math.sin(t)*offset});}}
  else {const nx=-u.y-v.y,ny=u.x+v.x,len=Math.hypot(nx,ny)||1;curve.push({...p,x:p.x+nx/len*offset,y:p.y+ny/len*offset});}
 }
 // Round ordinary corners; leave the explicitly sampled hairpins intact.
 const rounded=[curve[0]];for(let i=1;i<curve.length-1;i++){const a=curve[i-1],p=curve[i],b=curve[i+1],r=Math.min(80,distance(a,p)*.2,distance(p,b)*.2),la=distance(a,p)||1,lb=distance(p,b)||1,q={x:p.x+(a.x-p.x)*r/la,y:p.y+(a.y-p.y)*r/la},z={x:p.x+(b.x-p.x)*r/lb,y:p.y+(b.y-p.y)*r/lb};for(let k=0;k<=6;k++){const t=k/6,u=1-t;rounded.push({...p,x:u*u*q.x+2*u*t*p.x+t*t*z.x,y:u*u*q.y+2*u*t*p.y+t*t*z.y});}}rounded.push(curve.at(-1));
 const points=[rounded[0]];let length=0;for(let i=1;i<rounded.length;i++){const a=rounded[i-1],b=rounded[i],d=distance(a,b),n=Math.max(1,Math.ceil(d/40));for(let k=1;k<=n;k++){const t=k/n;length+=d/n;points.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,source:a.source+(b.source-a.source)*t,metres:length/3.2});}}
 // Keep the authored centerline clear of existing collision rocks. No terrain or props move.
 for(const p of points)for(let pass=0;pass<4;pass++){let changed=false;for(const [x,y,r]of rocks){const d=Math.hypot(p.x-x,p.y-y),clear=r+32;if(d>=clear)continue;const angle=d>0?Math.atan2(p.y-y,p.x-x):0;p.x=x+Math.cos(angle)*clear;p.y=y+Math.sin(angle)*clear;changed=true;}if(!changed)break;}
 length=0;points[0].metres=0;for(let i=1;i<points.length;i++){length+=distance(points[i-1],points[i]);points[i].metres=length/3.2;}
 const facts=(journey.lookouts??[]).map(p=>({...p,routeIndex:Math.max(0,points.findIndex(q=>q.source>=p.checkpoint))}));facts.push({id:'route-frontier',name:'The western frontier',fact:`You have followed our adaptation of Perseverance’s recorded journey through sol ${journey.lastSol}. This is the endpoint of this game’s pinned route snapshot, not the end of the real mission.`,routeIndex:points.length-1});
 return {version:ROUTE_VERSION,halfWidth:ROUTE_HALF_WIDTH,points,facts,length};
}
export function newRouteRun(course){return {version:ROUTE_VERSION,next:1,facts:[],pending:course.facts[0]?.id??null,elapsed:0,onRoute:0,upgraded:false};}
export function restoreRouteRun(value,course,legacy){
 if(value?.version===ROUTE_VERSION){const run=newRouteRun(course);run.next=clamp(Number.isInteger(value.next)?value.next:1,1,course.points.length);for(const p of course.facts){if(value.facts?.[run.facts.length]!==p.id)break;run.facts.push(p.id);}run.elapsed=Number.isFinite(value.elapsed)?clamp(value.elapsed,0,1e8):0;run.onRoute=Number.isFinite(value.onRoute)?clamp(value.onRoute,0,run.elapsed):0;run.upgraded=value.upgraded===true;const next=course.facts[run.facts.length];run.pending=next&&(value.pending===next.id||run.next>=next.routeIndex)?next.id:null;return run;}
 const run=newRouteRun(course);if(legacy?.status==='active'){run.next=clamp(course.points.findIndex(p=>p.source>=Math.max(0,legacy.next-1))<0?course.points.length:course.points.findIndex(p=>p.source>=Math.max(0,legacy.next-1)),1,course.points.length);run.facts=course.facts.filter(p=>p.routeIndex<run.next&&p.id!=='route-frontier').map(p=>p.id);run.pending=null;run.upgraded=true;}return run;
}
export const routeScore=run=>run.elapsed>0?Math.round(run.onRoute/run.elapsed*1000)/10:0;
export function stepRouteRun(course,run,before,after,dt){
 if(run.pending||!before||!Number.isFinite(dt)||dt<=0||dt>.1||after.mode!=='free'||after.turnaround)return null;
 const moved=distance(before,after);if(moved>Math.max(12,Math.abs(after.v)*dt*2+4))return null;
 // Time spent moving counts, including airborne/off-course travel; stopped reading cannot farm a score.
 if(moved>.001){let d=Infinity;for(let i=1;i<course.points.length;i++)d=Math.min(d,segmentDistance(after,course.points[i-1],course.points[i]));run.elapsed+=dt;if(d<=course.halfWidth)run.onRoute+=dt;}
 if(after.air||moved<.001)return null;
 const factLimit=course.facts[run.facts.length]?.routeIndex??course.points.length-1;
 while(run.next<course.points.length&&run.next<=factLimit&&segmentDistance(course.points[run.next],before,after)<=course.halfWidth)run.next++;
 // Rejoin a nearby forward stretch after a short detour or a landing. Required
 // facts remain hard limits; matching never searches a later checkpoint leg.
 const missed=course.points[Math.min(run.next,course.points.length-1)];
 const behind=(missed.x-after.x)*(after.x-before.x)+(missed.y-after.y)*(after.y-before.y)<0;
 if(behind||distance(after,missed)>course.halfWidth*2){
 let travelled=0,best=course.halfWidth,bestNext=run.next;
 for(let i=Math.max(1,run.next);i<=factLimit&&i<course.points.length;i++){
  const a=course.points[i-1],b=course.points[i],length=distance(a,b);travelled+=length;if(travelled>960)break;
  const dx=b.x-a.x,dy=b.y-a.y,dot=(after.x-before.x)*dx+(after.y-before.y)*dy;
  if(dot<0)continue;
  const d=segmentDistance(after,a,b);
  if(d<best-.01){best=d;bestNext=i;}
 }
 run.next=Math.max(run.next,bestNext);
 }
 while(run.next<course.points.length&&run.next<=factLimit&&segmentDistance(course.points[run.next],before,after)<=course.halfWidth)run.next++;
 const fact=course.facts[run.facts.length];if(fact&&run.next>=fact.routeIndex&&distance(after,course.points[fact.routeIndex])<=90){run.pending=fact.id;return fact;}
 return null;
}
export function acknowledgeRouteFact(course,run){const next=course.facts[run.facts.length];if(!next||run.pending!==next.id)return false;run.facts.push(next.id);run.pending=null;return true;}
export const routeComplete=(course,run)=>run.facts.length===course.facts.length&&!run.pending&&run.next>=course.points.length-1;

// New, isolated arcade ski rules. Ordinary rover physics are not modified.
export const SKI_KEY='astra.gale.skiBlades.v1';
export const LENGTH=6200,WIDTH=230,GRAVITY=14.84;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const GATES=[{s:1200,u:0},{s:2600,u:-40},{s:4000,u:40},{s:5400,u:0}];
export const RAMPS=[{s:750,u:-130},{s:2100,u:120},{s:3450,u:-125},{s:4750,u:125}];
export const ITEMS=[{s:850,u:-130},{s:1650,u:140},{s:2200,u:120},{s:3050,u:-140},{s:3550,u:-125},{s:4400,u:140},{s:4850,u:125},{s:5850,u:-130}];
export function skiCourse(ground,top){
 const center=s=>top.x+260*Math.sin(s/LENGTH*Math.PI*2)+90*Math.sin(s/LENGTH*Math.PI*6);
 const curvature=s=>-260*(Math.PI*2/LENGTH)**2*Math.sin(s/LENGTH*Math.PI*2)-90*(Math.PI*6/LENGTH)**2*Math.sin(s/LENGTH*Math.PI*6);
 const point=(s,u=0)=>({x:center(s)+u,y:top.y-s});
 const rampHeight=(s,u)=>RAMPS.reduce((h,r)=>{const t=(s-(r.s-130))/130,lane=Math.max(0,1-Math.abs(u-r.u)/65);return h+(t>=0&&t<=1?18*t*lane:0);},0);
 const height=(s,u=0)=>{const p=point(s,u);return ground(p.x,p.y)+rampHeight(s,u);};
 const coords=(x,y)=>{const s=top.y-y;return {s,u:x-center(s)};};
 const surface=(x,y)=>{const q=coords(x,y);return q.s>=0&&q.s<=LENGTH&&Math.abs(q.u)<=WIDTH?height(q.s,q.u):ground(x,y);};
 return {point,height,coords,surface,curvature,top:point(0),base:point(LENGTH),length:LENGTH,width:WIDTH};
}
export function itemAltitude(course,item){const ramp=RAMPS.find(r=>item.s-r.s===100&&item.u===r.u);return ramp?course.height(ramp.s,ramp.u)+20:course.height(item.s,item.u)+12;}
export function newSkiRun(course){return {phase:'countdown',countdown:3,s:0,u:0,v:0,side:0,z:course.height(0),vz:0,air:false,time:0,left:20,next:0,score:0,pending:0,chain:0,bestCombo:0,items:[],ramps:[],tricks:[],repeats:{},sequence:[],trick:null,steerWas:0,gasWas:false,feedback:'Blades deployed · steer, boost and brake',recoveries:0,reason:''};}
export function recoverSki(r,course){if(!['running','countdown'].includes(r.phase))return false;if(r.phase==='countdown')return false;const g=GATES[r.next-1]??{s:0,u:0};r.s=g.s+12;r.u=g.u;r.z=course.height(r.s,r.u);r.v=20;r.side=r.vz=0;r.air=false;r.trick=null;r.pending=r.chain=0;r.left=Math.max(0,r.left-5);r.recoveries++;r.feedback='Recovered · −5 seconds · airborne combo lost';if(r.left===0){r.phase='result';r.reason='Time expired';}return true;}
export function trickFits(r,course,duration){for(let t=.04;t<=duration+.12;t+=.04){const u=clamp(r.u+r.side*t,-WIDTH,WIDTH);if(r.z+r.vz*t-GRAVITY*t*t/2<=course.height(r.s+r.v*t,u)+1)return false;}return true;}
export function beginTrick(r,course){
 if(!r.air||r.trick)return false;const seq=r.sequence.filter(p=>r.time-p.t<.75).map(p=>p.d),last=seq.at(-1);if(!last)return false;
 const double=seq.length>1&&seq.at(-2)===last,cross=seq.length>1&&seq.at(-2)!==last;
 const move=double?{name:'Double orbit',duration:1.35,value:600,turns:2}:cross?{name:'Switch arc',duration:1.05,value:400,turns:1}:{name:'Orbit',duration:.72,value:200,turns:1};
 if(!trickFits(r,course,move.duration)){r.feedback='Too low · prepare to land';r.sequence=[];return false;}
 r.trick={...move,age:0,direction:last};r.sequence=[];r.feedback=move.name;return true;
}
export function stepSki(r,course,input,dt){
 if(r.phase==='result'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.05);
 if(r.phase==='countdown'){r.countdown=Math.max(0,r.countdown-dt);if(!r.countdown)r.phase='running';return;}
 r.time+=dt;r.left=Math.max(0,r.left-dt);if(!r.left){r.phase='result';r.reason='Time expired';r.pending=r.chain=0;r.trick=null;return;}
 const steer=Math.sign(input.steer||0),pressed=!!input.gas&&!r.gasWas;r.gasWas=!!input.gas;
 if(steer&&steer!==r.steerWas){r.sequence.push({d:steer,t:r.time});if(r.sequence.length>4)r.sequence.shift();}r.steerWas=steer;
 if(pressed)beginTrick(r,course);
 const oldS=r.s,oldU=r.u;
 const grade=clamp((course.height(r.s+10,r.u)-course.height(r.s-10,r.u))/20,-.7,.7);
 if(!r.air)r.v=clamp(r.v+(-GRAVITY*grade+10+(input.gas?35:0)-(input.brake?85:0)-r.v*.10)*dt,0,230);
 r.side+=(steer*(r.air?38:105)-r.side*(input.brake?4:1.2)-course.curvature(r.s)*r.v*r.v)*dt;
 r.s=Math.min(LENGTH,r.s+r.v*dt);r.u+=r.side*dt;
 if(Math.abs(r.u)>WIDTH){r.u=clamp(r.u,-WIDTH,WIDTH);r.side*=-.25;r.v*=.72;r.pending=r.chain=0;r.trick=null;r.feedback='Edge contact · slow down for the turn';}
 if(!r.air)for(let i=0;i<RAMPS.length;i++){const p=RAMPS[i];if(!r.ramps.includes(i)&&oldS<p.s&&r.s>=p.s&&Math.abs(r.u-p.u)<52&&r.v>35){r.ramps.push(i);r.air=true;r.z=Math.max(r.z,course.height(p.s,r.u));r.vz=18+r.v*.08;r.feedback='Airborne · release Boost, steer then tap Trick';break;}}
 if(r.air){r.z+=r.vz*dt;r.vz-=GRAVITY*dt;if(r.trick){r.trick.age+=dt;if(r.trick.age>=r.trick.duration){const t=r.trick,n=r.repeats[t.name]??0;r.repeats[t.name]=n+1;r.pending+=Math.round(t.value/(1+n*.4));r.chain++;r.tricks.push(t.name);r.trick=null;r.feedback='Trick complete · land to bank';}}
  if(r.z<=course.height(r.s,r.u)){r.z=course.height(r.s,r.u);r.air=false;const clean=!r.trick&&Math.abs(r.side)<65;if(clean){const bank=Math.round(r.pending*Math.min(4,1+r.chain*.5));r.score+=bank;r.bestCombo=Math.max(r.bestCombo,bank);if(bank)r.feedback=`Clean landing · +${bank}`;}else{r.v*=.55;r.feedback='Rough landing · combo lost';}r.pending=r.chain=0;r.trick=null;r.vz=0;}
 }else r.z=course.height(r.s,r.u);
 for(let i=0;i<ITEMS.length;i++){const p=ITEMS[i];if(!r.items.includes(i)&&oldS<=p.s&&r.s>=p.s){const u=oldU+(r.u-oldU)*(p.s-oldS)/Math.max(.001,r.s-oldS);if(Math.abs(u-p.u)<42&&Math.abs(r.z-itemAltitude(course,p))<45){r.items.push(i);r.score+=250;r.feedback='Survey token · +250';}}}
 const gate=GATES[r.next];if(gate&&oldS<gate.s&&r.s>=gate.s){const u=oldU+(r.u-oldU)*(gate.s-oldS)/Math.max(.001,r.s-oldS);if(Math.abs(u-gate.u)<=85){r.next++;r.left+=12;r.score+=400;r.feedback='Time gate · +12 seconds · +400';}else{r.feedback='Missed time gate · Recover to try again';}}
 if(gate&&r.s>gate.s+200){r.v=Math.min(r.v,35);r.feedback='Time gate missed · use Recover';}
 if(r.s>=LENGTH){if(r.next===GATES.length&&!r.air){r.phase='result';r.reason='Descent complete';r.score+=500;}else if(r.next<GATES.length){r.feedback='Missing time gate · Recover';} }
}
export function loadSkiRecord(storage){try{const r=JSON.parse(storage.getItem(SKI_KEY));return r&&r.version===1&&Number.isFinite(r.best)&&r.best>=0&&Number.isFinite(r.runs)&&r.runs>=0?r:{version:1,best:0,runs:0,combo:0};}catch{return {version:1,best:0,runs:0,combo:0};}}
export function saveSkiResult(storage,record,r){const next={...record,runs:record.runs+1};if(r.reason==='Descent complete'){next.best=Math.max(record.best,r.score);next.combo=Math.max(record.combo||0,r.bestCombo);}try{storage.setItem(SKI_KEY,JSON.stringify(next));return {record:next,saved:true};}catch{return {record:next,saved:false};}}

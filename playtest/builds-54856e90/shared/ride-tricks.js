export const SEQUENCE_WINDOW=1, VARIANT_WINDOW=.32, GRAB_RELEASE=.16, GRAB_ATTACK=.18, GRAB_POSE=.08;
export const TRICK_SLOTS=['L','LL','LR','LLL','LLR','LRL','LRR'];
// Each slot has a held pose and a separate committed animation. R-first inputs mirror it.
const families={
 L:['Side grab','Tailwhip','deck',1,1.05,150],
 LL:['Tail grab','Backflip','flip',1,1.25,260],
 LR:['Nose grab','Corkscrew','cork',1,1.4,330],
 LLL:['Tuck grab','Double backflip','flip',2,1.8,450],
 LLR:['Superman','Flip whip','bar',1,1.55,380],
 LRL:['Cross grab','Whip rewind','rewind',1,1.4,320],
 LRR:['Rocket grab','720 spin','yaw',2,1.6,400],
};
export const newTrickInput=(vehicle='scooter')=>({vehicle,history:[],committed:[],left:false,right:false,steer:0,gas:false,special:false,reverse:false,both:false,events:[],started:-99,variationOpen:false,taps:0,secret:false});
export function queueTrickInput(s,event){s.events.push(event);}
export function resolveMove(directions,variant=false,vehicle='scooter',stage=variant?2:1){
 const sign=directions[0]>0?-1:1,key=(directions.length?directions:[-1]).map(d=>d*sign<0?'L':'R').join(''),slot=key.slice(0,3),family=families[slot]??families.L;
 const [grab,name,axis,rotations,duration,value]=family;
 const common={vehicle,slot:families[slot]?slot:'L',sign,variant,secret:false,age:0,hold:0,releasing:false,releaseAge:0,cycles:0};
 if(key==='LRLR'&&variant)return {...common,slot:'special',kind:'spin',secret:true,trick:vehicle==='ski'?'Red Planet Rodeo':'The 9000',axis:vehicle==='ski'?'rodeo':'yaw',rotations:vehicle==='ski'?3:50,duration:vehicle==='ski'?2.8:12.24,value:vehicle==='ski'?1800:9000};
 const prefix=sign<0?'Reverse ':'';
 if(vehicle==='scooter'){
  const tree=directions.some(d=>d!==directions[0])?'superman':'board',tier=Math.max(1,Math.min(3,stage));
  const names=tree==='board'?['Board grab','One-handed grab','Barrel roll']:['Superman','Bar headstand','Front flip'];
  return {...common,tree,stage:tier,slot:tree,variant:tier>1,kind:tier===3?'spin':'grab',axis:tier===3?(tree==='board'?'roll':'flip'):'grab',trick:prefix+names[tier-1],rotations:tier===3?1:0,duration:tier===3?1.5:.74,value:(tree==='board'?[60,120,300]:[90,180,450])[tier-1]};
 }
 return variant?{...common,kind:'spin',trick:prefix+name,axis,rotations,duration,value}:{...common,kind:'grab',trick:prefix+grab,axis:'grab',rotations:0,duration:VARIANT_WINDOW+(vehicle==='scooter'?GRAB_ATTACK+GRAB_POSE:0)+GRAB_RELEASE,value:60+TRICK_SLOTS.indexOf(common.slot)*10};
}
export const moveRepeatKey=m=>`${m.kind}:${m.slot}${m.stage?`:${m.stage}`:''}`;
export const movePoints=m=>Math.round(m.value+(m.kind==='grab'?m.hold*120:0));
/** Once released, a grab cannot be resumed by a late press. The opening window
 * remains alive long enough for a rapid double press to replace it with a spin. */
export function releaseGrab(m,held){if(m?.kind==='grab'&&!held)m.releasing=true;}
export function advanceMove(m,held,dt,repeat=false){
 m.age+=dt;
 if(m.kind!=='grab'){
  if(!held)m.releasing=true;
  if(m.age<m.duration)return false;
  if(!repeat||m.releasing)return true;
  m.age-=m.duration;m.cycles++;delete m.poseFrom;return false;
 }
 releaseGrab(m,held);
 if(!m.releasing)m.hold+=dt;
 else m.releaseAge+=Math.max(0,Math.min(dt,m.age-VARIANT_WINDOW-(m.vehicle==='scooter'?GRAB_ATTACK+GRAB_POSE:0)));
 return m.releasing&&m.releaseAge>=GRAB_RELEASE;
}
/** Actual press order owns the snapshot; releases and overlapping holds cannot rewrite it. */
export function readTrickInput(s,time,eligible,busy,input,releasedGrab=false){
 const left=input.both||input.steer<0,right=input.both||input.steer>0;
 const direction=input.press==='left'?-1:input.press==='right'?1:!input.press&&left&&!s.left?-1:!input.press&&right&&!s.right?1:0;
 const directionPress=direction!==0,gasPress=input.press==='gas'||!input.press&&input.gas&&!s.gas,d=Math.sign(input.steer);
 s.left=left;s.right=right;s.steer=d;s.gas=input.gas;s.both=input.both;
 // A fresh direction after release owns a new move, even while the old pose unwinds.
 if(releasedGrab&&directionPress)s.variationOpen=false;
 const heldFallback=s.vehicle==='scooter'&&left!==right?d:0;
 if(busy&&!(releasedGrab&&(directionPress||s.history.length||heldFallback&&gasPress&&time-s.started>VARIANT_WINDOW))){s.history=[];if(directionPress)s.variationOpen=false;if(gasPress&&s.variationOpen&&time-s.started<=VARIANT_WINDOW){s.taps++;const move=resolveMove(s.committed,true,s.vehicle,s.taps);s.started=time;s.variationOpen=s.vehicle==='scooter'&&s.taps<3&&!move.secret;return move;}return null;}
 if(!eligible){s.history=[];s.variationOpen=false;return null;}
 s.history=s.history.filter(p=>time-p.time<=SEQUENCE_WINDOW);
 if(input.reverse||input.special&&!input.gas){s.history=[];return null;}
 if(input.special&&gasPress&&d&&!directionPress)s.history.push({direction:d,time});
 if(directionPress){s.history.push({direction,time});s.history=s.history.slice(-4);}
 if(!(gasPress||directionPress&&input.gas))return null;
 if(!s.history.length&&heldFallback&&gasPress)s.history.push({direction:heldFallback,time});
 if(!s.history.length)return null;
 const sequence=s.history.length?s.history.map(p=>p.direction):[-1],move=resolveMove(sequence,false,s.vehicle);s.history=[];s.committed=sequence;s.started=time;s.taps=1;s.variationOpen=true;s.secret=move.secret;return move;
}
/** Distinct held silhouettes, shared by the astronaut pose and ski-blade rig. */
export function grabPose(m){
 const poses={L:[.12,.18,.28,.35,-.4],LL:[-.42,0,.12,-.3,.25],LR:[.5,0,-.12,.2,-.3],LLL:[-.55,.35,.05,.6,.45],LLR:[.9,0,.15,0,0],LRL:[.12,-.6,.3,-.8,.65],LRR:[-.2,.15,-.4,1.1,-.65]};
 const q=poses[m.slot]??poses.L,e=Math.max(0,Math.min(1,(m.age-VARIANT_WINDOW)/GRAB_ATTACK))*(m.releasing?Math.max(0,1-m.releaseAge/GRAB_RELEASE):1);
 return {pitch:q[0]*e,yaw:q[1]*e*m.sign,roll:q[2]*e*m.sign,deck:q[3]*e*m.sign,bars:q[4]*e*m.sign,extent:e};
}

/** Moon tree poses are offsets from riding. Snapshot these on upgrade so an
 * extra tap blends from the visible pose rather than snapping back to neutral. */
export function moonTrickPose(m){
 const base={bodyY:0,bodyZ:0,pitch:0,roll:0,armL:0,armR:0,armLX:0,armRX:0,armLY:0,armRY:0,leg:0,rootRoll:0};
 if(!m?.tree)return base;
 const board=m.tree==='board',tier=Math.min(2,m.stage),sign=m.sign;
 const target=board?{...base,bodyY:-.70,bodyZ:.12,pitch:.40,armLX:1.55,armRX:1.55,armLY:.2,armRY:-.2,leg:1.25,rootRoll:.12*sign}
 :tier===1?{...base,bodyY:1.25,bodyZ:-1.25,pitch:Math.PI/2,armLX:-Math.PI/2,armRX:-Math.PI/2,leg:0}
 :{...base,bodyY:2.78,bodyZ:1.02,pitch:Math.PI,armLX:-.55,armRX:-.55,leg:-.15};
 if(board&&tier===2){if(sign>0){target.armR=-.3;target.armRX=-1.25;target.armRY=.9;}else{target.armL=.3;target.armLX=-1.25;target.armLY=-.9;}}
 const start=m.poseFrom??base,enter=Math.max(0,Math.min(1,(m.age-(m.poseFrom?0:VARIANT_WINDOW))/GRAB_ATTACK)),blend=enter*enter*(3-2*enter);
 const release=m.kind==='spin'?Math.max(0,Math.min(1,(m.duration-m.age)/.24)):m.releasing?Math.max(0,1-m.releaseAge/GRAB_RELEASE):1;
 return Object.fromEntries(Object.keys(base).map(k=>[k,((start[k]??0)+(target[k]-(start[k]??0))*blend)*release]));
}

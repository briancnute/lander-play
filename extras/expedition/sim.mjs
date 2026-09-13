import {landmarkParts,scanDiscoveries} from './discoveries.mjs';
import {WORLD,expansionGround} from './landscape.mjs';
import {delta} from './regions.mjs';
import {vehicle} from './vehicles.mjs';
import {moveWithContact} from './contact.mjs';
// Standalone prototype values only. No production physics or save imports.
export const TUNE={speed:76,boostSpeed:190,acceleration:100,straightSeconds:1,chargeSeconds:1.1,boostSeconds:4.5,cooldown:0,overheatCooldown:6,heatRate:16.5,triggerWindow:.7};
export const tuningFor=id=>({...TUNE,...vehicle(id).tuning,straightSeconds:1,cooldown:0});
export const samples=[{x:616,y:491,name:'Mesa layers',copy:'Layered rocks preserve clues to how a landscape changed. Sample secured.'},{x:352,y:459,name:'Channel sediment',copy:'Sediment can carry a record of transport and deposition. Sample secured.'},{x:979,y:161,name:'Outer overlook',copy:'Comparing samples from different settings helps tell a fuller geological story. Sample secured.'}];
samples.push({x:2350,y:344,name:'Delta layers',copy:'Layers can preserve a sequence of changing environments.'},{x:2635,y:485,name:'Channel junction',copy:'A branching channel pattern can help trace how water once moved.'},{x:2940,y:790,name:'Fan edge',copy:'Sediment spreads out where flowing water loses energy.'});
samples.push({x:3990,y:365,name:'Dark dune sand',copy:'Curiosity studied dark sand and wind-shaped ripples at the Bagnold Dunes in Gale Crater. This dune field is inspired by that landscape.'},{x:5660,y:460,name:'Layered butte',copy:'Curiosity explored the layered sandstone of the Murray Buttes. Layers can reveal how sediment built up and was later eroded.'});
export const rocks=[[350,370,10],[301,378,8],[320,416,9],[847,351,12],[891,296,9],[394,535,10],[143,471,7],[757,97,14],[721,118,8]];
export const mesa=[[460,356],[514,308],[617,325],[684,389],[670,453],[609,490],[510,455],[450,411]];
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const angle=(v)=>Math.atan2(Math.sin(v),Math.cos(v));
export function inside(x,y,poly=mesa){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
function basinGround(x,y){return 1.1*Math.sin(x*.018)*Math.sin(y*.015)+2.6*Math.exp(-((x-650)**2+(y-270)**2)/12000)+4.5*Math.exp(-((x-943)**2/3400+(y-604)**2/650))+4*Math.exp(-((x-228)**2/4200+(y-164)**2/550));}
export function ground(x,y){
 if(x<=1000)return basinGround(x,y);
 const t=clamp((x-1000)/240,0,1),blend=t*t*(3-2*t);
 let z=.45*Math.sin(x*.012)*Math.cos(y*.011);
 if(delta&&x>1850){const k=clamp((x-1850)/200,0,1);let relief=0;
  for(const [cx,cy,rx,ry,h] of delta.hills)relief+=h*Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2));
  const channel=420+Math.sin((x-2100)*.006)*60;relief-=1.8*Math.exp(-(((y-channel)/35)**2));z+=relief*k*k*(3-2*k);
 }
 return basinGround(x,y)*(1-blend)+z*blend+expansionGround(x,y);
}
export function nearest(route,x,y){let best={d:Infinity,i:0};for(let i=0;i<route.length;i++){const p=route[i],d=Math.hypot(x-p.x,y-p.y);if(d<best.d)best={d,i};}return best;}
export function create(mode,course,roverId='sojourner'){const p=course.route[0],q=course.route[3];return {mode,roverId:vehicle(roverId).id,tune:tuningFor(roverId),x:p.x,y:p.y,heading:mode==='trial'?Math.atan2(q.x-p.x,-(q.y-p.y)):Math.atan2(samples[1].x-p.x,-(samples[1].y-p.y)),v:0,z:ground(p.x,p.y),vz:0,air:false,straight:0,boundary:false,turnaround:false,charge:0,boost:0,heat:0,cool:0,overheated:false,releaseAt:-100,lastDrive:false,t:0,time:0,countdown:mode==='trial'?3:0,started:false,done:false,nextGate:0,collected:[],collecting:-1,collectTime:0,message:mode==='trial'?'Follow gates 1–6, then finish.':'Eight samples · Four regions',messageUntil:5,jumpBest:0,jumpStart:null,found:false,discoveries:[],discoveryTarget:null,discoveryTime:0,impact:0};}
export function say(s,text,duration=3){s.message=text;s.messageUntil=s.t+duration;}
export function stopBoost(s,hot=false){const tune=s.tune??TUNE;s.boost=0;s.charge=0;s.straight=0;s.releaseAt=-100;s.cool=hot?tune.overheatCooldown:tune.cooldown;s.overheated=hot;if(hot)say(s,'Overheated · recharge locked',3);}
export function sampleNear(s){return samples.findIndex((p,i)=>!s.collected.includes(i)&&distance(s,p)<32);}
export function inSampleZone(s){return s.mode!=='trial'&&samples.some(p=>distance(s,p)<32);}
export function reverseAvailable(s){return s.v<=.5&&!inSampleZone(s)&&!s.air&&!s.turnaround;}
export function recover(s,course){const p=s.mode==='trial'&&s.nextGate>0?course.gates[s.nextGate-1]:course.route[0];s.x=p.x;s.y=p.y;s.v=0;s.z=ground(s.x,s.y);s.vz=0;s.air=false;s.collecting=-1;s.collectTime=0;if(s.boost)stopBoost(s);s.turnaround=false;s.straight=0;s.charge=0;say(s,'Rover recovered · timer keeps running');}
export function update(s,input,dt,course){const tune=s.tune??TUNE;s.t+=dt;s.impact=Math.max(0,s.impact-dt*2);if(s.done){s.v*=Math.exp(-dt*6);return;}
 if(s.countdown>0){s.countdown=Math.max(0,s.countdown-dt);s.lastDrive=false;return;}
 if(s.mode==='trial')s.time+=dt;
 let drive=!!input.drive,brake=!!input.brake,steer=clamp(input.steer||0,-1,1);
 const edge=Math.min(s.x,WORLD.width-s.x,s.y,WORLD.height-s.y);
 s.boundary=edge<40;
 if(edge< -75&&!s.turnaround){s.turnaround=true;if(s.boost)stopBoost(s);s.charge=0;s.straight=0;say(s,'Auto-return · turning toward the basin',3);}
 if(s.turnaround){const error=angle(Math.atan2((s.x>4700?5500:s.x>3200?4000:s.x>1900?2640:s.x>1080?1600:540)-s.x,-((s.x>1080?470:380)-s.y))-s.heading);steer=clamp(error*2,-1,1);drive=true;brake=false;if(edge>65){s.turnaround=false;say(s,'Your controls',2);}}

 if(s.cool>0){s.cool=Math.max(0,s.cool-dt);if(s.cool===0)s.overheated=false;}
 if(s.boost>0){s.heat=Math.min(100,s.heat+tune.heatRate*dt);s.boost=Math.max(.00001,s.boost-dt);if(s.heat>=100)stopBoost(s,true);else if(!drive||brake||s.boost<=.00002)stopBoost(s);}
 else s.heat=Math.max(0,s.heat-dt*(s.overheated?14:drive?4.8:9));
 // Turning clears every stage of buildup, including a fully armed charge.
 const straightDriving=drive&&!brake&&!s.air&&s.v>12&&steer===0&&!s.turnaround;
 if(!s.boost){
  if(steer!==0||brake||s.air||s.v<=12||s.cool>0||s.turnaround){s.straight=0;s.charge=0;s.releaseAt=-100;}
  if(s.charge>=1&&s.lastDrive&&!drive&&!brake)s.releaseAt=s.t;
  if(drive&&!s.lastDrive&&s.charge>=1&&s.cool<=0&&s.t-s.releaseAt<tune.triggerWindow&&!brake){s.boost=tune.boostSeconds;s.charge=0;s.straight=0;s.releaseAt=-100;say(s,'Boost',1);}
  else if(!s.cool&&straightDriving){const before=s.charge;s.straight+=dt;if(s.straight>tune.straightSeconds)s.charge=Math.min(1,s.charge+dt/tune.chargeSeconds);if(before<1&&s.charge===1)say(s,'Ready · lift → hold',3);}
  else if(!drive&&(s.charge<1||s.t-s.releaseAt>=tune.triggerWindow)){s.straight=0;s.charge=0;s.releaseAt=-100;}
 }
 s.lastDrive=drive;
 const prev={x:s.x,y:s.y};
 s.heading+=steer*(1.8+Math.min(Math.abs(s.v)/35,1)*.65)*dt*(s.v< -1?-1:1)*(s.air?.3:1);
 const max=s.boost?tune.boostSpeed:tune.speed,acc=s.boost?tune.acceleration*2.5:tune.acceleration;
 const slope=(ground(s.x+Math.sin(s.heading)*3,s.y-Math.cos(s.heading)*3)-ground(s.x,s.y))/3;
 const reversing=brake&&!drive&&reverseAvailable(s);
 if(reversing)s.v-=acc*.6*dt;else if(brake)s.v*=Math.exp(-dt*7);else if(drive)s.v+=acc*dt;else s.v*=Math.exp(-dt*.65);
 if(!s.air)s.v-=slope*dt*12;
 if(!drive&&!reversing&&inSampleZone(s)&&Math.abs(s.v)<=.5)s.v=0;
 if(s.turnaround)s.v=Math.min(s.v,50);s.v=clamp(s.v,-25,max);if(Math.abs(s.v)<.08)s.v=0;
 const dx=Math.sin(s.heading)*s.v*dt,dy=-Math.cos(s.heading)*s.v*dt;
 const contact=moveWithContact(s.x,s.y,dx,dy,mesa,rocks);if(delta){for(const poly of delta.mesas){const q=moveWithContact(contact.x,contact.y,0,0,poly,delta.rocks);contact.x=q.x;contact.y=q.y;contact.hit||=q.hit;}}for(const part of landmarkParts){const q=moveWithContact(contact.x,contact.y,0,0,part.poly,[]);contact.x=q.x;contact.y=q.y;contact.hit||=q.hit;}s.x=contact.x;s.y=contact.y;
 if(contact.hit){const forward=(s.x-prev.x)*Math.sin(s.heading)-(s.y-prev.y)*Math.cos(s.heading);s.v=Math.sign(s.v)*Math.min(Math.abs(s.v),Math.abs(forward)/dt);s.impact=1;s.charge=0;s.straight=0;if(s.boost)stopBoost(s);}
 const g=ground(s.x,s.y),oldG=ground(prev.x,prev.y),up=(g-oldG)/dt;
 if(!s.air){if(up<s.vz-20*dt&&Math.abs(s.v)>20&&s.vz>2){s.air=true;s.jumpStart={x:s.x,y:s.y};}else{s.z=g;s.vz=up;}}
 if(s.air){s.vz-=20*dt;s.z+=s.vz*dt;if(s.z<=g){s.z=g;s.vz=0;s.air=false;if(s.jumpStart){const length=distance(s,s.jumpStart)*.25;s.jumpBest=Math.max(s.jumpBest,length);if(length>1)say(s,`Jump · ${length.toFixed(1)} m`,3);s.jumpStart=null;}}}
 // Scan continuously inside a zone; motion and steering are allowed.
 const near=sampleNear(s);
 if(near>=0&&s.mode!=='trial'&&!s.air&&!s.turnaround){if(s.collecting!==near){s.collecting=near;s.collectTime=0;}s.collectTime+=dt;if(s.collectTime>=1.4){s.collected.push(near);s.collecting=-1;s.collectTime=0;say(s,samples[near].copy,6);if(s.collected.length===samples.length){s.done=true;say(s,'All samples secured.');}}}
 else{s.collecting=-1;s.collectTime=0;}
 const discovery=scanDiscoveries(s,dt);if(discovery)say(s,discovery.name+' · '+discovery.fact,7);
 if(s.mode!=='trial')return;
 const gate=s.nextGate<course.gates.length?course.gates[s.nextGate]:course.finish;
 // Swept circular checkpoint area accepts every approach, including reverse and airborne.
 // Only the next gate is eligible; route-corridor and directional-crossing restrictions are retired.
 const vx=s.x-prev.x,vy=s.y-prev.y,len=vx*vx+vy*vy;
 const t=len?clamp(((gate.x-prev.x)*vx+(gate.y-prev.y)*vy)/len,0,1):0;
 if(Math.hypot(prev.x+vx*t-gate.x,prev.y+vy*t-gate.y)<=42){
  if(s.nextGate<course.gates.length){s.nextGate++;say(s,s.nextGate===course.gates.length?'All gates · finish ahead':`Gate ${s.nextGate} / ${course.gates.length}`,1.4);}
  else{s.done=true;say(s,'Lap complete');}
 }
}

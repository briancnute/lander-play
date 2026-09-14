import {landmarkParts,scanDiscoveries} from './discoveries.mjs';
import {WORLD,expansionGround,northSouthGround} from './landscape.mjs';
import {delta} from './regions.mjs';
import {vehicle} from './vehicles.mjs';
import {moveWithContact} from './contact.mjs';
// Standalone prototype values only. No production physics or save imports.
export const TUNE={speed:76,boostSpeed:190,acceleration:100,boostSeconds:4.5};
export const tuningFor=id=>({...TUNE,...vehicle(id).tuning});
// Fictional drive-over energy cells. Each reappears only after leaving its vicinity.
export const boostPickups=[[230,620],[740,550],[780,170],[350,325],[1200,470],[1670,470],[2220,470],[2820,510],[3450,470],[4140,470],[4890,470],[5540,460],[3100,-1500],[1850,2300],[5000,2450]].map(([x,y],id)=>({id,x,y}));
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
 if(x<=1000)return basinGround(x,y)+northSouthGround(x,y);
 const t=clamp((x-1000)/240,0,1),blend=t*t*(3-2*t);
 let z=.45*Math.sin(x*.012)*Math.cos(y*.011);
 if(delta&&x>1850){const k=clamp((x-1850)/200,0,1);let relief=0;
  for(const [cx,cy,rx,ry,h] of delta.hills)relief+=h*Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2));
  const channel=420+Math.sin((x-2100)*.006)*60;relief-=1.8*Math.exp(-(((y-channel)/35)**2));z+=relief*k*k*(3-2*k);
 }
 return basinGround(x,y)*(1-blend)+z*blend+expansionGround(x,y)+northSouthGround(x,y);
}
export function nearest(route,x,y){let best={d:Infinity,i:0};for(let i=0;i<route.length;i++){const p=route[i],d=Math.hypot(x-p.x,y-p.y);if(d<best.d)best={d,i};}return best;}
export function create(mode,course,roverId='sojourner'){const p=course.route[0],q=course.route[3];return {mode,roverId:vehicle(roverId).id,tune:tuningFor(roverId),x:p.x,y:p.y,heading:mode==='trial'?Math.atan2(q.x-p.x,-(q.y-p.y)):Math.atan2(samples[1].x-p.x,-(samples[1].y-p.y)),v:0,z:ground(p.x,p.y),vz:0,air:false,boundary:false,turnaround:false,boost:0,pickupSpent:[],t:0,time:0,countdown:mode==='trial'?3:0,started:false,done:false,nextGate:0,collected:[],collecting:-1,collectTime:0,message:mode==='trial'?'Follow gates 1–6, then finish.':'Eight samples · Explore Mars',messageUntil:5,jumpBest:0,jumpStart:null,found:false,discoveries:[],discoveryTarget:null,discoveryTime:0,impact:0};}
export function say(s,text,duration=3){s.message=text;s.messageUntil=s.t+duration;}
export function stopBoost(s){s.boost=0;}
export function sampleNear(s){return samples.findIndex((p,i)=>!s.collected.includes(i)&&distance(s,p)<32);}
export function inSampleZone(s){return s.mode!=='trial'&&samples.some(p=>distance(s,p)<32);}
export function reverseAvailable(s){return s.v<=.5&&!inSampleZone(s)&&!s.air&&!s.turnaround;}
export function recover(s,course){const p=s.mode==='trial'&&s.nextGate>0?course.gates[s.nextGate-1]:course.route[0];s.x=p.x;s.y=p.y;s.v=0;s.z=ground(s.x,s.y);s.vz=0;s.air=false;s.collecting=-1;s.collectTime=0;if(s.boost)stopBoost(s);s.turnaround=false;say(s,'Rover recovered · timer keeps running');}
export function update(s,input,dt,course){const tune=s.tune??TUNE;s.t+=dt;s.impact=Math.max(0,s.impact-dt*2);if(s.done){s.v*=Math.exp(-dt*6);return;}
 if(s.countdown>0){s.countdown=Math.max(0,s.countdown-dt);return;}
 if(s.mode==='trial')s.time+=dt;
 let drive=!!input.drive,brake=!!input.brake,steer=clamp(input.steer||0,-1,1);
 const edge=Math.min(s.x,WORLD.width-s.x,s.y-WORLD.minY,WORLD.maxY-s.y);
 s.boundary=edge<40;
 if(edge< -75&&!s.turnaround){s.turnaround=true;if(s.boost)stopBoost(s);say(s,'Auto-return · turning toward the basin',3);}
 if(s.turnaround){const error=angle(Math.atan2(clamp(s.x,250,WORLD.width-250)-s.x,-(clamp(s.y,WORLD.minY+250,WORLD.maxY-250)-s.y))-s.heading);steer=clamp(error*2,-1,1);drive=true;brake=false;if(edge>65){s.turnaround=false;say(s,'Your controls',2);}}

 s.boost=Math.max(0,s.boost-dt);
 const prev={x:s.x,y:s.y};
 s.heading+=steer*(1.8+Math.min(Math.abs(s.v)/35,1)*.65)*dt*(s.v< -1?-1:1)*(s.air?.3:1);
 const max=s.boost?tune.boostSpeed:tune.speed,acc=s.boost?tune.acceleration*2.5:tune.acceleration;
 const slope=(ground(s.x+Math.sin(s.heading)*3,s.y-Math.cos(s.heading)*3)-ground(s.x,s.y))/3;
 const reversing=brake&&!drive&&reverseAvailable(s);
 // Pedals, normal speed caps and ground drag cannot change airborne momentum.
 if(!s.air){
  const previousSpeed=s.v;
  if(reversing)s.v-=acc*.6*dt;else if(brake)s.v*=Math.exp(-dt*7);else if(drive)s.v+=acc*dt;else s.v*=Math.exp(-dt*.65);
  s.v-=slope*dt*12;
  if(!drive&&!reversing&&inSampleZone(s)&&Math.abs(s.v)<=.5)s.v=0;
  if(s.turnaround)s.v=Math.min(s.v,50);
  if(s.v>max)s.v=previousSpeed>max?Math.min(s.v,Math.max(max,previousSpeed-tune.acceleration*dt)):max;
  s.v=Math.max(s.boost?-max:-25,s.v);if(Math.abs(s.v)<.08)s.v=0;
 }
 const dx=Math.sin(s.heading)*s.v*dt,dy=-Math.cos(s.heading)*s.v*dt;
 const contact=moveWithContact(s.x,s.y,dx,dy,mesa,rocks);if(delta){for(const poly of delta.mesas){const q=moveWithContact(contact.x,contact.y,0,0,poly,delta.rocks);contact.x=q.x;contact.y=q.y;contact.hit||=q.hit;}}for(const part of landmarkParts){const q=moveWithContact(contact.x,contact.y,0,0,part.poly,[]);contact.x=q.x;contact.y=q.y;contact.hit||=q.hit;}s.x=contact.x;s.y=contact.y;
 if(contact.hit){const forward=(s.x-prev.x)*Math.sin(s.heading)-(s.y-prev.y)*Math.cos(s.heading);s.v=Math.sign(s.v)*Math.min(Math.abs(s.v),Math.abs(forward)/dt);s.impact=1;if(s.boost)stopBoost(s);}
 const g=ground(s.x,s.y),oldG=ground(prev.x,prev.y),up=(g-oldG)/dt;
 if(!s.air){if(up<s.vz-20*dt&&Math.abs(s.v)>20&&s.vz>2){s.air=true;s.jumpStart={x:s.x,y:s.y};}else{s.z=g;s.vz=up;}}
 if(s.air){s.vz-=20*dt;s.z+=s.vz*dt;if(s.z<=g){s.z=g;s.vz=0;s.air=false;if(s.jumpStart){const length=distance(s,s.jumpStart)*.25;s.jumpBest=Math.max(s.jumpBest,length);if(length>1)say(s,`Jump · ${length.toFixed(1)} m`,3);s.jumpStart=null;}}}
 // Swept pickup contact avoids missing a cell at boost speed; airborne passes do not collect.
 s.pickupSpent=s.pickupSpent.filter(id=>distance(s,boostPickups[id])<120);
 if(!s.air&&!s.turnaround&&Math.abs(s.v)>1){const vx=s.x-prev.x,vy=s.y-prev.y,len=vx*vx+vy*vy;
  for(const p of boostPickups){if(s.pickupSpent.includes(p.id))continue;const t=len?clamp(((p.x-prev.x)*vx+(p.y-prev.y)*vy)/len,0,1):0;
   if(Math.hypot(prev.x+vx*t-p.x,prev.y+vy*t-p.y)<18){s.pickupSpent.push(p.id);s.boost=tune.boostSeconds;s.v=(s.v<0?-1:1)*tune.boostSpeed;}
  }
 }
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

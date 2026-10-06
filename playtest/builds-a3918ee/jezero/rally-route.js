import {clearRallyLine} from './rally-clearance.js';
// Authored arcade passage beside the pinned NASA traverse; never a surveyed road.
export const RALLY_VERSION='jezero-traverse-1';
export const RALLY_TUNE={speed:300,boostSpeed:465,acceleration:155,boostSeconds:2.4,handling:1.1,massFactor:1,boostKit:true,cloneDrive:true,airYaw:.65};
export const distance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
export function measured(points){let length=0;return points.map((p,i)=>{if(i)length+=distance(p,points[i-1]);return {...p,s:length};});}
export function atDistance(points,s){let i=1;while(i<points.length-1&&points[i].s<s)i++;const a=points[i-1],b=points[i],t=Math.max(0,Math.min(1,(s-a.s)/(b.s-a.s||1)));return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,heading:Math.atan2(b.x-a.x,a.y-b.y),s};}
export function progressAlong(points,pose,previous=0){
 let best=null;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];if(b.s<previous-100||a.s>previous+1100)continue;const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((pose.x-a.x)*dx+(pose.y-a.y)*dy)/(dx*dx+dy*dy||1))),d=Math.hypot(pose.x-a.x-dx*t,pose.y-a.y-dy*t),s=a.s+(b.s-a.s)*t;if(d<180&&(!best||d<best.d))best={s,d};}return best?Math.max(previous,best.s):previous;
}
export function buildRallies(journey,ground,rocks=[]){
 const source=journey.course.legacyPoints??journey.course.points;
 const full=measured(clearRallyLine(source,rocks)),n=full.at(-1).s;
 const part=(id,name,from,to,description)=>{const start=from*n,end=to*n,points=measured([atDistance(full,start),...full.filter(p=>p.s>start&&p.s<end),atDistance(full,end)]);return {id,name,description,points,length:points.at(-1).s,start:atDistance(points,0),finish:points.at(-1),cells:Array.from({length:Math.max(5,Math.floor((end-start)/1400))},(_,i)=>({...atDistance(points,(i+1)*(end-start)/(Math.max(5,Math.floor((end-start)/1400))+1)),id:i})),jumps:[]};};
 const rallies=[part('rally-1','Séítah switchbacks',0,.13,'Winding early traverse through the landing plain and Séítah.'),part('rally-2','Delta approach',.135,.35,'Fast open stretches into the delta, with rock chicanes.'),part('rally-3','Neretva passage',.45,.68,'Channel bends and optional launches toward Bright Angel.'),part('rally-4','Western rim climb',.685,1,'Long climbing turns over the rim and toward the western frontier.')];
 for(const [j,r]of rallies.entries())if(j>=2)for(const f of [.2,.43,.7,.86]){const p=atDistance(r.points,r.length*f);if(rocks.every(([x,y,radius])=>Math.hypot(p.x-x,p.y-y)>radius+50))r.jumps.push(p);}
 const takeoff=atDistance(full,n*.355),drop=atDistance(full,n*.443),length=distance(takeoff,drop),heading=Math.atan2(drop.x-takeoff.x,takeoff.y-drop.y);
 const flight={id:'helicopter',name:'Delta airlift',start:takeoff,finish:drop,length,heading,cells:Array.from({length:12},(_,i)=>{const s=(i+1)*length/13,t=s/length,x=takeoff.x+(drop.x-takeoff.x)*t,y=takeoff.y+(drop.y-takeoff.y)*t;return {id:i,s,x,y,z:ground(x,y)+95+Math.sin(i*1.2)*40};})};
 // Separate loop trials use existing measured terrain near these mission locations.
 const loopPlans=[
  ['seitah-loop','Séítah loop',.075,[[1500,0],[1100,700],[400,800],[-300,1300],[-1400,900],[-1700,0],[-1000,-900],[-100,-600],[600,-1100],[1500,-700]]],
  ['delta-loop','Delta loop',.31,[[1800,0],[1800,1100],[800,1300],[-700,1050],[-1600,650],[-1900,-300],[-1200,-1200],[0,-1250],[900,-700],[600,0],[1100,350]]],
  ['rim-loop','Western rim loop',.81,[[1900,0],[1500,900],[600,1600],[-200,1300],[-1000,1800],[-1900,700],[-2200,-500],[-1300,-1400],[-400,-1000],[600,-1500],[1700,-900]]],
 ];
 const loops=loopPlans.map(([id,name,f,nodes])=>{
  const center=atDistance(full,n*f),sampled=[];
  // Rounded authored turns: each location has its own plan, not a rescaled oval.
  for(let i=0;i<nodes.length;i++)for(let k=0;k<24;k++){
   const t=k/24,t2=t*t,t3=t2*t,p=nodes[(i+nodes.length-1)%nodes.length],a=nodes[i],b=nodes[(i+1)%nodes.length],q=nodes[(i+2)%nodes.length],axis=j=>.5*((2*a[j])+(-p[j]+b[j])*t+(2*p[j]-5*a[j]+4*b[j]-q[j])*t2+(-p[j]+3*a[j]-3*b[j]+q[j])*t3);
   sampled.push({x:center.x+axis(0),y:center.y+axis(1)});
  }
  sampled.push({...sampled[0]});const points=measured(clearRallyLine(sampled,rocks));points[points.length-1]={...points[0],s:points.at(-1).s};
  return {id,name,description:'One lap · optional local time trial',points,start:atDistance(points,0),finish:points.at(-1),length:points.at(-1).s,cells:[.12,.28,.46,.65,.82].map((f,id)=>({...atDistance(points,points.at(-1).s*f),id})),jumps:[]};
 });
 return {rallies,flight,loops,full};
}
export function newFlight(flight,ground){return {s:0,v:0,z:ground(flight.start.x,flight.start.y)+35,vz:0,boost:0,spent:[],done:false};}
export function stepFlight(f,input,dt,route,ground){
 if(f.done)return;f.boost=Math.max(0,f.boost-dt);const target=(input.steer||0)*(f.boost>0?1100:700);f.v+=(target-f.v)*(1-Math.exp(-dt*2));f.s=Math.max(0,Math.min(route.length,f.s+f.v*dt));const t=f.s/route.length,x=route.start.x+(route.finish.x-route.start.x)*t,y=route.start.y+(route.finish.y-route.start.y)*t,floor=ground(x,y)+18;
 f.vz+=((input.drive?100:0)-(input.special?130:0)-18)*dt;f.vz*=Math.exp(-dt*.6);f.z=Math.max(floor,Math.min(ground(x,y)+380,f.z+f.vz*dt));if(f.z===floor)f.vz=Math.max(0,f.vz);
 for(const p of route.cells)if(!f.spent.includes(p.id)&&Math.hypot(p.s-f.s,p.z-f.z)<38){f.spent.push(p.id);f.boost=2.8;}
 if(f.s>=route.length-12&&f.z<=ground(x,y)+30){f.done=true;f.z=ground(x,y);f.v=f.vz=0;}return {x,y,z:f.z,heading:route.heading};
}

export function readRallyRecords(raw){
 try{const value=JSON.parse(raw||'{}');if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([id,r])=>['expedition','seitah-loop','delta-loop','rim-loop'].includes(id)&&r&&Number.isFinite(r.time)&&r.time>0&&Array.isArray(r.splits)&&r.splits.length>0&&r.splits.every(p=>p&&typeof p.name==='string'&&Number.isFinite(p.time)&&p.time>=0&&Number.isFinite(p.total)&&p.total>=p.time)));}catch{return {};}
}

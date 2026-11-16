import {ROVER_PROFILES} from '../shared/rover-profiles.js';
import {measured,atDistance} from './rally-route.js';
import {crossesRelayGate} from './relay-course.js';
export const EXTREME_ID='extreme-relay',EXTREME_NAME='Jezero Extreme Relay';
export const EXTREME_PACE=ROVER_PROFILES.relay.pace,EXTREME_GATE_SPACING=2800;
// The expedition owns every coordinate. Relay stages only group its legs.
export const EXTREME_AIRLIFT_LEG='margin--neretva';
export function validateExtremeRoute(tour){
 if(!Array.isArray(tour?.legs)||tour.legs.length!==tour.checkpoints?.length-1)throw Error('Jezero route needs one leg between each expedition stop.');
 const ids=new Set();
 for(let i=0;i<tour.legs.length;i++){
  const leg=tour.legs[i],from=tour.checkpoints[i],to=tour.checkpoints[i+1];
  if(ids.has(leg.id)||leg.id!==from.id+'--'+to.id)throw Error('Jezero route leg order changed: '+leg.id);ids.add(leg.id);
  if(!Array.isArray(leg.points)||leg.points.length<2||leg.points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))throw Error('Invalid Jezero route points: '+leg.id);
  for(const [a,b]of [[leg.points[0],from],[leg.points.at(-1),to]])if(!Number.isFinite(b.x)||!Number.isFinite(b.y)||Math.hypot(a.x-b.x,a.y-b.y)>.01)throw Error('Disconnected Jezero route: '+leg.id);
 }
 const index=tour.legs.findIndex(l=>l.id===EXTREME_AIRLIFT_LEG);
 if(index<1||index>=tour.legs.length-1)throw Error('The extreme relay needs roads on both sides of its mapped Neretva airlift.');
 return index;
}
function join(legs){
 const points=measured(legs.flatMap((l,i)=>i?l.points.slice(1):l.points));let index=0;
 const sourceLegs=legs.map(leg=>{const start=points[index].s;index+=leg.points.length-1;return {id:leg.id,start,end:points[index].s};});
 return {points,sourceLegs};
}
function road(id,name,legs){const {points,sourceLegs}=join(legs),length=points.at(-1).s,positions=[];for(let s=220;s<length-450;s+=EXTREME_GATE_SPACING)positions.push(s);positions.push(length-120);return {id,name,kind:'rally',points,sourceLegs,length,start:atDistance(points,0),finish:points.at(-1),gates:positions.map((s,id)=>({...atDistance(points,s),id,halfWidth:60})),cells:[],jumps:[]};}
export function buildExtremeCourse(tour){
 const flightIndex=validateExtremeRoute(tour);
 const first=road('delta','Landing to lake margin',tour.legs.slice(0,flightIndex)),last=road('rim','Neretva to western frontier',tour.legs.slice(flightIndex+1)),{points,sourceLegs}=join([tour.legs[flightIndex]]),length=points.at(-1).s;
 const flight={id:'airlift',name:'Neretva airlift',kind:'flight',points,sourceLegs,length,start:atDistance(points,0),finish:points.at(-1)};
 return {id:EXTREME_ID,name:EXTREME_NAME,stages:[first,flight,last],length:first.length+length+last.length};
}
export function advanceExtremeGate(stage,run,before,after){const g=stage.gates[run.nextGate];if(g&&crossesRelayGate(before,after,g)){run.nextGate++;return true;}return false;}
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const turn=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
// Include the untravelled approach: boarding never teleports to the flight start.
export function beginExtremeFlight(road,stage,exit,pose,station){
 const points=measured([{x:pose.x,y:pose.y},...road.points.filter(p=>p.s>station),...stage.points.slice(1)]);
 return {s:0,v:Math.max(0,pose.v),side:0,heading:pose.heading,points,length:points.at(-1).s,exitHeading:exit.start.heading,entryZ:pose.z};
}
export function extremeFlightPose(stage,flight,dt,input,ground,multiplier=1){
 const points=flight.points??stage.points,length=flight.length??stage.length;
 const target=(input.drive?560:440)*multiplier;
 flight.v+=(target-flight.v)*(1-Math.exp(-dt*2));flight.s=Math.min(length,flight.s+flight.v*dt);
 const p=atDistance(points,flight.s),t=flight.s/length;
 flight.side+=(Math.max(-1,Math.min(1,input.steer||0))*100-flight.side)*(1-Math.exp(-dt*2));
 const arc=Math.sin(Math.PI*t)**2,offset=flight.side*arc,x=p.x+Math.cos(p.heading)*offset,y=p.y+Math.sin(p.heading)*offset;
 const roadHeading=flight.exitHeading??atDistance(points,length).heading;
 const heading=turn(p.heading,roadHeading,smooth(1-(length-flight.s)/500));
 flight.heading=turn(flight.heading??p.heading,heading,1-Math.exp(-dt*6));
 const shownHeading=turn(flight.heading,roadHeading,smooth(1-(length-flight.s)/250));
 const entryLift=(flight.entryZ??ground(points[0].x,points[0].y))-ground(points[0].x,points[0].y);
 return {...p,x,y,heading:shownHeading,z:ground(x,y)+arc*180+entryLift*(1-smooth(flight.s/400)),v:flight.v,air:flight.s<length,vz:0};
}
export function blendExtremeFlightCamera(chase,side,flight){
 const weight=smooth(Math.min(flight.s/650,((flight.length??Infinity)-flight.s)/900));
 const view={live:true};for(const key of ['x','y','eye','pitch'])view[key]=chase[key]+(side[key]-chase[key])*weight;
 view.heading=turn(chase.heading,side.heading,weight);view.zoom=1+(side.zoom-1)*weight;return view;
}

export function extremeFlightCamera(shown){
 const heading=shown.heading-Math.PI/2;
 return {x:shown.x+Math.sin(shown.heading)*45-Math.sin(heading)*145,y:shown.y-Math.cos(shown.heading)*45+Math.cos(heading)*145,eye:shown.z+65,heading,pitch:.24,zoom:1.1,live:true};
}

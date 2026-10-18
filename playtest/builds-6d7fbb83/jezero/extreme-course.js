import {measured,atDistance} from './rally-route.js';
import {crossesRelayGate} from './relay-course.js';
export const EXTREME_ID='extreme-relay',EXTREME_NAME='Jezero Extreme Relay';
export const EXTREME_PACE=1.18,EXTREME_GATE_SPACING=2800;
const join=legs=>measured(legs.flatMap((l,i)=>i?l.points.slice(1):l.points));
function road(id,name,legs){const points=join(legs),length=points.at(-1).s,positions=[];for(let s=220;s<length-450;s+=EXTREME_GATE_SPACING)positions.push(s);positions.push(length-120);return {id,name,kind:'rally',points,length,start:atDistance(points,0),finish:points.at(-1),gates:positions.map((s,id)=>({...atDistance(points,s),id,halfWidth:60})),cells:[],jumps:[]};}
export function buildExtremeCourse(tour){
 const flightIndex=tour.legs.findIndex(l=>l.id==='margin--neretva');if(flightIndex<1)throw Error('The extreme relay needs its mapped airlift leg.');
 const first=road('delta','Landing to lake margin',tour.legs.slice(0,flightIndex)),last=road('rim','Neretva to western frontier',tour.legs.slice(flightIndex+1)),points=join([tour.legs[flightIndex]]),length=points.at(-1).s;
 const flight={id:'airlift',name:'Neretva airlift',kind:'flight',points,length,start:atDistance(points,0),finish:points.at(-1)};
 return {id:EXTREME_ID,name:EXTREME_NAME,stages:[first,flight,last],length:first.length+length+last.length};
}
export function advanceExtremeGate(stage,run,before,after){const g=stage.gates[run.nextGate];if(g&&crossesRelayGate(before,after,g)){run.nextGate++;return true;}return false;}
export function extremeFlightPose(stage,flight,dt,input,ground,multiplier=1){
 const target=(input.drive?560:440)*multiplier;flight.v+=(target-flight.v)*(1-Math.exp(-dt*2));flight.s=Math.min(stage.length,flight.s+flight.v*dt);
 const p=atDistance(stage.points,flight.s),t=flight.s/stage.length;flight.side+=(Math.max(-1,Math.min(1,input.steer||0))*100-flight.side)*(1-Math.exp(-dt*2));const offset=flight.side*Math.sin(Math.PI*t),x=p.x+Math.cos(p.heading)*offset,y=p.y+Math.sin(p.heading)*offset;
 return {...p,x,y,z:ground(x,y)+Math.sin(Math.PI*t)*180,v:flight.v,air:flight.s<stage.length,vz:0};
}

export function extremeFlightCamera(shown){
 const heading=shown.heading-Math.PI/2;
 return {x:shown.x+Math.sin(shown.heading)*45-Math.sin(heading)*145,y:shown.y-Math.cos(shown.heading)*45+Math.cos(heading)*145,eye:shown.z+65,heading,pitch:.24,zoom:1.1,live:true};
}

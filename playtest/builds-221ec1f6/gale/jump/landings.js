import {beginFinishStop,stepFinishStop} from '../ski-landing.js';
import {executionTier} from './tricks.js';
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
export const landings=[
 {name:'Rough Settle',grade:'Basic',description:'A rough stop with sideways drift and uneven settling, stretched into a longer runout.'},
 {name:'Clean Carve',grade:'Good',description:'Absorb touchdown, then draw one broad carve into a quiet stop.'},
 {name:'Edge Stop',grade:'Great',description:'Turn both skis across the travel direction and scrub speed in a controlled side-slip.'},
 {name:'Sideways Edge Stop',grade:'Perfect',description:'Absorb contact, set both attached skis sideways and shed speed in a crisp spray.'},
];
export const landingFor=score=>landings[executionTier(score)];
// Authored ground paths; offsets begin at
// zero at contact. The higher grades retain incoming forward speed and ease it
// to zero instead of abruptly replacing it. Skis remain on the same rigid frame.
export const landingDuration=3;
export const landingStretch=landingDuration/2.4;
// Scale time and ground distance together, retaining the incoming velocity
// and the shape of each finish instead of merely playing it in slow motion.
export function landingPose(score,age,speed=25){
 const pose=baseLandingPose(score,age/landingStretch,speed);
 return {...pose,x:pose.x*landingStretch,y:pose.y*landingStretch,duration:pose.duration*landingStretch};
}
function baseLandingPose(score,age,speed){
 const kind=executionTier(score),quality=clamp(score/100),style=landings[kind];
 if(kind===0){const run={time:0,landing:{quality,at:0},finalLanding:{quality},s:0,u:0,v:speed,side:0},course={heading:()=>0,point:(s,u)=>({x:u,y:-s}),height:()=>0};beginFinishStop(run,course);const old=stepFinishStop(run,course,Math.max(0,age));return {...old,x:old.x*.1,duration:run.finishStop.duration,style};}
 const duration=[0,2.1,1.85,1.35][kind],u=clamp(age/duration),scale=speed/25;
 // Integral of 1 - smoothstep(u): position and velocity agree throughout.
 const y=-speed*duration*(u-u**3+.5*u**4),forward=speed*(1-3*u*u+2*u**3);
 let x,dx,heading,roll;
 if(kind===1){x=4*scale*smooth(u);dx=4*scale*30*u*u*(1-u)**2/duration;heading=.65*smooth(u);roll=-.07*Math.sin(Math.PI*u)**2;}
 if(kind===2){x=6.5*scale*smooth(u);dx=6.5*scale*30*u*u*(1-u)**2/duration;heading=1.35*smooth(u/.65);roll=-.11*Math.sin(Math.PI*u)**2;}
 if(kind===3){x=4.5*scale*smooth(u);dx=4.5*scale*30*u*u*(1-u)**2/duration;heading=Math.PI/2*smooth(u/.45);roll=-.12*Math.sin(Math.PI*u)**2;}
 if(age>=duration)return {x,y,z:0,heading,pitch:0,roll:0,compression:0,speed:0,duration,done:true,style};
 const impact=Math.exp(-Math.max(0,age)*9)*Math.sin(Math.max(0,age)*13);
 return {x,y,z:0,heading,pitch:impact*[0,.045,.025,.012][kind],roll:roll+impact*.018,compression:.2*Math.exp(-Math.max(0,age)*7),speed:Math.hypot(forward,dx),duration,done:age>=duration,style};
}

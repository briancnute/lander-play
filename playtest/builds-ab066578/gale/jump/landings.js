import {beginFinishStop,stepFinishStop} from '../ski-landing.js';
import {executionTier,attitudeTorque} from './tricks.js';
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
export const landings=[
 {name:'Rough Settle',grade:'Basic',description:'A rough stop with sideways drift and uneven settling, stretched into a longer runout.'},
 {name:'Clean Carve',grade:'Good',description:'Absorb touchdown, then draw one broad carve into a quiet stop.'},
 {name:'Edge Stop',grade:'Great',description:'Turn both skis across the travel direction and scrub speed in a controlled side-slip.'},
 {name:'Backflip Side Stop',grade:'Perfect',description:'Touch down, launch a small thruster-assisted backflip, then turn both attached skis sideways into a controlled stop.'},
];
export const landingFor=score=>landings[executionTier(score)];
// Authored ground paths and a separate perfect-finish hop; offsets begin at
// zero at contact. The higher grades retain incoming forward speed and ease it
// to zero instead of abruptly replacing it. Skis remain on the same rigid frame.
export const landingDuration=3;
export const landingStretch=landingDuration/2.4;
// Scale time and ground distance together, retaining the incoming velocity
// and the shape of each finish instead of merely playing it in slow motion.
export function landingPose(score,age,speed=25){
 if(executionTier(score)===3)return {...perfectLandingPose(age,speed),torque:attitudeTorque(t=>perfectLandingPose(t,speed),age)};
 const pose=baseLandingPose(score,age/landingStretch,speed);
 return {...pose,x:pose.x*landingStretch,y:pose.y*landingStretch,duration:pose.duration*landingStretch};
}
function baseLandingPose(score,age,speed){
 const kind=executionTier(score),quality=clamp(score/100),style=landings[kind];
 if(kind===0){const run={time:0,landing:{quality,at:0},finalLanding:{quality},s:0,u:0,v:speed,side:0},course={heading:()=>0,point:(s,u)=>({x:u,y:-s}),height:()=>0};beginFinishStop(run,course);const old=stepFinishStop(run,course,Math.max(0,age));return {...old,x:old.x*.1,duration:run.finishStop.duration,style};}
 const duration=[0,2.1,1.85,2.25][kind],u=clamp(age/duration),scale=speed/25;
 // Integral of 1 - smoothstep(u): position and velocity agree throughout.
 const y=-speed*duration*(u-u**3+.5*u**4),forward=speed*(1-3*u*u+2*u**3);
 let x,dx,heading,roll;
 if(kind===1){x=4*scale*smooth(u);dx=4*scale*30*u*u*(1-u)**2/duration;heading=.65*smooth(u);roll=-.07*Math.sin(Math.PI*u)**2;}
 if(kind===2){x=6.5*scale*smooth(u);dx=6.5*scale*30*u*u*(1-u)**2/duration;heading=1.35*smooth(u/.65);roll=-.11*Math.sin(Math.PI*u)**2;}
 if(age>=duration)return {x,y,z:0,heading,pitch:0,roll:0,compression:0,speed:0,duration,done:true,style};
 const impact=Math.exp(-Math.max(0,age)*9)*Math.sin(Math.max(0,age)*13);
 return {x,y,z:0,heading,pitch:impact*[0,.045,.025,.012][kind],roll:roll+impact*.018,compression:.2*Math.exp(-Math.max(0,age)*7),speed:Math.hypot(forward,dx),duration,done:age>=duration,style};
}

// A short compression, an actual ballistic hop, then a sideways braking runout.
// World-scaled Mars gravity matches the main jump; attitude jets rotate the
// attached rover/skis without changing the hop's center-of-mass trajectory.
function perfectLandingPose(age,speed){
 const ignition=.15,flight=1.8,contact=ignition+flight,stop=landingDuration-contact,g=3.71*(8/3);
 const t=age>=landingDuration-1e-9?landingDuration:Math.max(0,age),air=t>ignition&&t<contact,h=Math.max(0,Math.min(flight,t-ignition));
 const u=clamp((t-contact)/stop),turn=smooth(u/.8),distance=Math.min(t,contact)+stop*(u-u**3+.5*u**4);
 const x=7*(speed/25)*smooth(u),dx=7*(speed/25)*30*u*u*(1-u)**2/stop,forward=speed*(1-3*u*u+2*u**3);
 return {x,y:-speed*distance,z:air?.5*g*h*(flight-h):0,vz:air?g*(flight/2-h):0,air,
  heading:Math.PI/2*turn,pitch:-2*Math.PI*smooth(h/flight),roll:-.12*Math.sin(Math.PI*u)**2,
  compression:t<ignition?.15*Math.sin(Math.PI*t/ignition):t>=contact?.16*Math.exp(-(t-contact)*12):0,
  speed:t>=landingDuration?0:Math.hypot(forward,dx),duration:landingDuration,done:t>=landingDuration,
  launchJet:t>=ignition&&t<ignition+.18,style:landings[3]};
}

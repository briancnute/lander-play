import {SCALE_TRIAL} from './slalom-scale-trial.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// A level-horizon chase independent of trick pose and contact-state changes.
// Bounded spring acceleration absorbs landings; heading still follows promptly.
export function skiChase(cam,s,dt,focus,surface,terrain=surface){
 // Keep chase heading separate from the presentation-only full revolution.
 cam.h-=cam.orbitOffset??0;
 const t=clamp(dt,0,.05),angle=Math.atan2(Math.sin(s.heading-cam.h),Math.cos(s.heading-cam.h));
 cam.h+=clamp(angle*(1-Math.exp(-t*6)),-1.2*t,1.2*t);
 cam.orbitOffset=s.skiOrbit??0;cam.h+=cam.orbitOffset;
 cam.x=s.x;cam.y=s.y;
 const sn=Math.sin(cam.h),cs=Math.cos(cam.h),back=(s.skiScaleTrial?SCALE_TRIAL.cameraBack*SCALE_TRIAL.units:94)-34*clamp(s.skiJumpFocus??0,0,1)-18*clamp(s.skiOrbitFocus??0,0,1),x=s.x-sn*back,y=s.y+cs*back;
 // Sample at the lens, never divide a nearby facet's height by two metres.
 const floor=Math.max(surface(x,y),surface(x+cs*3,y+sn*3),surface(x-cs*3,y-sn*3))+5;
 const target=Math.max(focus+(s.skiScaleTrial?SCALE_TRIAL.cameraLift*SCALE_TRIAL.units:34)-10*clamp(s.skiOrbitFocus??0,0,1),floor+9);
 if(cam.eyeVelocity===undefined){cam.eye=target;cam.eyeVelocity=0;cam.pitch=.1;}
 if(t){const acceleration=clamp(49*(target-cam.eye)-14*cam.eyeVelocity,-220,220);cam.eyeVelocity=clamp(cam.eyeVelocity+acceleration*t,-150,150);cam.eye+=cam.eyeVelocity*t;}
 // A real obstruction is the sole exception to the spring, never ordinary contact.
 cam.clearanceCorrection=Math.max(0,floor-cam.eye);if(cam.eye<floor){cam.eye=floor;cam.eyeVelocity=Math.max(0,cam.eyeVelocity);}
 const ahead=s.skiScaleTrial?24:65,lookGround=terrain(s.x+sn*ahead,s.y-cs*ahead),look=Math.min(focus,lookGround+6);
 // Fade the terrain look-down out with clearance, without a contact-state snap.
 const clearance=Math.max(0,s.z-terrain(s.x,s.y)),groundWeight=.3*(1-clamp(clearance/45,0,1));
 const aim=focus*(1-groundWeight)+look*groundWeight;
 const pitch=clamp(Math.atan2(cam.eye-aim,back+ahead*.3)-.22*(1-clamp(s.skiJumpFocus??0,0,1))+.08*clamp(s.skiOrbitFocus??0,0,1),-.12,.6);
 cam.pitch+=clamp((pitch-cam.pitch)*(1-Math.exp(-t*4)),-.45*t,.45*t);
 cam.arm=back;
 return {back,x,y,eye:cam.eye,pitch:cam.pitch,lift:cam.eye-s.z-23};
}

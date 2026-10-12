// Landing assistance changes presentation/contact settling, never airborne momentum.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
export const LAND_WINDOW=2.65,LAND_TARGET=.40;
export function touchdownETA(r,c,gravity){
 if(!r.air)return Infinity;
 const h=c.heading(r.s),vx=Math.sin(h)*r.v+Math.cos(h)*r.side,vy=-Math.cos(h)*r.v+Math.sin(h)*r.side,p=Number.isFinite(r.worldX)?{x:r.worldX,y:r.worldY}:c.point(r.s,r.u);
 const gap=t=>r.z+r.vz*t-gravity*t*t/2-(c.worldHeight?c.worldHeight(p.x+vx*t,p.y+vy*t):c.height(r.s+r.v*t,r.u+r.side*t));
 if(gap(0)<=0)return 0;
 let prev=gap(0);for(let t=.04;t<=LAND_WINDOW+.12;t+=.04){const next=gap(t);if(next<=0)return t-.04+.04*prev/(prev-next);prev=next;}return Infinity;
}
export function stepLandingPrompt(r,c,input,dt,gravity){
 const fresh=!!r.landingTap||!!input.gas&&!r.landGasHeld;r.landingTap=false;r.landGasHeld=!!input.gas;
 if(!c.landingScored)return;
 if(!r.air){r.landingFlight=0;r.landingWindow=false;r.landingAttempt=null;r.landingCueAge=0;return;}
 r.landingFlight=(r.landingFlight??0)+dt;r.landingETA=touchdownETA(r,c,gravity+(r.down?32:0));
 r.landingWindow=r.landingFlight>.2&&r.landingETA<=LAND_WINDOW;
 r.landingCueAge=r.landingWindow?(r.landingCueAge??0)+dt:0;
 if(r.landingWindow&&r.landingCueAge>.12&&fresh&&!r.landingAttempt){const timing=clamp(1-Math.max(0,Math.abs(r.landingETA-LAND_TARGET)-.07)/.45);r.landingAttempt={timing,eta:r.landingETA,at:r.time};}
}
// Shared by the button and rings: no late visual switch at the scoring sweet spot.
const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
export function landingCue(r){
 const age=r?.landingCueAge??0,eta=r?.landingETA??Infinity,attempt=r?.landingAttempt;
 const visible=!!r?.air&&!!r.landingWindow&&eta>.05;
 const fade=smooth((eta-.05)/.13),arrival=smooth(age/.16),ready=smooth((age-.12)/.43);
 const timing=attempt?.timing??0,color=timing>=.85?'#65b186':timing>=.5?'#e4b36e':'#d87970';
 const blinkAge=attempt?Math.max(0,r.time-attempt.at):0;
 const blink=attempt&&blinkAge<.42?.58+.42*Math.cos(blinkAge*Math.PI/.21)**2:1;
 return {visible,radius:Math.max(29,34+50*((attempt?.eta??eta)-LAND_TARGET)/(LAND_WINDOW-LAND_TARGET)),
  targetOpacity:arrival*(.22+.78*ready)*fade,cursorOpacity:arrival*(.3+.4*ready)*fade*blink,
  buttonOpacity:ready*fade,buttonVisible:visible&&age>.12&&!attempt,
  color:attempt?color:'#f4e8cf',percent:attempt?Math.round(timing*100)+'%':'',labelOpacity:fade*blink};
}
export function scoreSkiLanding(r,c,pose={yaw:0,pitch:0,roll:0}){
 if(!c.landingScored)return;
 const travel=Math.abs(Math.atan2(r.side,r.v)),facing=Math.abs(angle(Math.atan2(r.side,r.v)+(pose.yaw??0)+(r.rotationAngle??0)+(r.yaw??0)));
 const alignment=clamp(1-Math.max(travel,facing)/(.5*Math.PI))*clamp(1-Math.max(Math.abs(angle(pose.pitch??0)),Math.abs(angle(pose.roll??0)))/(.5*Math.PI));
 const timing=r.landingAttempt?.timing??0,quality=.7*alignment+.3*timing;
 const grade=alignment>.85&&timing>.85?'PERFECT':alignment>.5&&timing>.35?'CLEAN':'ROUGH';
 r.landing={alignment,timing,quality,points:Math.round(quality*100),grade,at:r.time,x:r.worldX,y:r.worldY,heading:c.heading(r.s)};
 if(r.finalJump&&!r.finalLanding)r.finalLanding={...r.landing};
 r.landingWindow=false;r.landingTap=false;r.landingFlight=0;
 const keep=1-.12*(1-quality);r.v*=keep;r.side*=keep;
 r.feedback=`${grade} LANDING · ${r.landing.points}/100`;
}
export function landingPose(r){
 const l=r.landing,age=l?r.time-l.at:99,rough=l?1-l.quality:0;
 const settle=age<1.3?Math.exp(-age*(5-rough*2))*Math.sin(age*18):0;
 const brace=r.air&&r.landingAttempt? r.landingAttempt.timing*clamp(1-r.landingETA/LAND_WINDOW):0;
 return {pitch:-.10*brace+settle*(.03+rough*.15),roll:settle*rough*.16,compression:age<1.3?(.25+rough*.3)*Math.exp(-age*5):0,fold:brace*.12};
}
export function beginFinishStop(r,c){
 const quality=r.finalLanding?.quality??0,duration=.85+(1-quality)*1.25;
 r.finishStop={age:0,duration,s:r.s,u:r.u,speed:Math.min(180,Math.hypot(r.v,r.side)),quality};
}
export function stepFinishStop(r,c,dt){
 const f=r.finishStop;if(!f)return null;f.age=Math.min(f.duration,f.age+dt);const t=f.age/f.duration,e=1-(1-t)**3,distance=f.speed*f.duration*.28;
 const s=f.s+distance*e,u=f.u+(10+(1-f.quality)*38)*Math.sin(t*Math.PI/2),p=c.point(s,u);
 return {x:p.x,y:p.y,z:c.height(s,u),heading:c.heading(s)+(.25+(1-f.quality)*.45)*Math.sin(t*Math.PI/2),speed:f.speed*(1-t)**2,steer:1,done:t>=1};
}

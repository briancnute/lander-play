/** Presentation-only 360 modifier: no new points, impulse, steering or trick. */
export const ROTATION_WINDOW=.9,ROTATION_SECONDS=.85;
export const newLunarRotation=()=>({stage:0,started:-99,middle:-99,age:0,active:false,sign:1,gas:false,special:false});
export function rotationInput(r,input,eligible,blocked,lastThrust){
 const special=input.press==='special'||!input.press&&input.special&&!r.special,thrust=input.press==='gas'||!input.press&&input.gas&&!r.gas;
 r.gas=input.gas;r.special=input.special;
 if(!eligible||blocked||input.reverse||r.active){r.stage=0;return false;}
 if(input.time-r.started>ROTATION_WINDOW)r.stage=0;
 if(thrust){
  // A second Thrust remains a slam. An early Thrust remains ordinary steering.
  if(r.stage===1&&input.time-r.started>.32&&input.time-lastThrust>.32){r.stage=2;r.middle=input.time;}else r.stage=0;
 }
 if(special){
  if(r.stage===2&&input.time>r.middle&&input.time-r.started<=ROTATION_WINDOW){r.stage=0;r.active=true;r.age=0;return true;}
  // Each ordinary trick upgrade restarts the protected decision window.
  r.stage=1;r.started=input.time;r.sign=input.steer>0?-1:1;
 }
 return false;
}
export function stepLunarRotation(r,dt,airborne){
 if(!airborne){r.stage=0;r.active=false;r.age=0;return 0;}
 if(!r.active)return 0;
 r.age=Math.min(ROTATION_SECONDS,r.age+dt);
 if(r.age>=ROTATION_SECONDS){r.active=false;return 0;}
 // Smooth entry/exit, integral full turn. Heading and flight momentum never rotate.
 const u=r.age/ROTATION_SECONDS;return r.sign*2*Math.PI*u*u*(3-2*u);
}

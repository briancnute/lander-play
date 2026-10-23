/** Presentation-only 360 modifier: no new points, impulse, steering or trick. */
export const ROTATION_WINDOW=.9,ROTATION_SECONDS=.85;
export const newLunarRotation=(exclusive=false)=>({exclusive,consumedGas:false,released:false,cycles:0,stage:0,started:-99,middle:-99,age:0,active:false,sign:1,gas:false,special:false});
export function rotationInput(r,input,eligible,blocked,lastThrust){
 const special=input.press==='special'||!input.press&&input.special&&!r.special,thrust=input.press==='gas'||!input.press&&input.gas&&!r.gas;
 r.gas=input.gas;r.special=input.special;
 if(r.active&&!input.special)r.released=true;
 if(r.exclusive){if(!input.gas)r.consumedGas=false;else if(r.stage&&!r.active)r.consumedGas=true;}
 if(!eligible||blocked||input.reverse||r.active){r.stage=0;return false;}
 if(input.time-r.started>ROTATION_WINDOW)r.stage=0;
 if(thrust){
  // Moon reserves Thrust for the sequence; legacy consumers keep slam/steering timing.
  if(r.stage===1&&(r.exclusive||input.time-r.started>.32&&input.time-lastThrust>.32)){r.stage=2;r.middle=input.time;}else r.stage=0;
 }
 if(special){
  if(r.stage===2&&input.time>r.middle&&input.time-r.started<=ROTATION_WINDOW){r.stage=0;r.active=true;r.age=0;r.cycles=0;r.released=false;return true;}
  // Each ordinary trick upgrade restarts the protected decision window.
  r.stage=1;r.started=input.time;r.sign=input.steer>0?-1:1;
 }
 return false;
}
export function stepLunarRotation(r,dt,airborne,repeat=false){
 if(!airborne){r.stage=0;r.active=false;r.age=0;return 0;}
 if(!r.active)return 0;
 r.age+=dt;
 if(r.age>=ROTATION_SECONDS){
  if(r.exclusive&&repeat&&!r.released){r.cycles+=Math.floor(r.age/ROTATION_SECONDS);r.age%=ROTATION_SECONDS;}
  else {r.active=false;return 0;}
 }
 // Smooth entry/exit, integral full turn. Heading and flight momentum never rotate.
 const u=r.age/ROTATION_SECONDS;return r.sign*2*Math.PI*(r.cycles+(r.exclusive?u:u*u*(3-2*u)));
}

/** A sequence-owned press stays consumed until release, even after commitment. */
export function rotationMovementInput(r,input){return r.exclusive&&(r.stage>0||r.consumedGas)?{...input,gas:false,press:input.press==='gas'?'release':input.press}:input;}

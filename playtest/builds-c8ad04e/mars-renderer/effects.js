const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
// Damped chassis spring, purely presentation. Camera and driving position are unaffected.
export class Suspension {
 constructor(){this.offset=0;this.velocity=0;}
 step(dt,compression){let remaining=Math.max(0,Math.min(.05,dt));const target=-clamp(compression,0,.55);
  while(remaining>0){const h=Math.min(remaining,1/120);this.velocity+=((target-this.offset)*150-this.velocity*15)*h;this.offset=clamp(this.offset+this.velocity*h,-.65,.15);remaining-=h;}
  return this.offset;
 }
}

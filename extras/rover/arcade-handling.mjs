// Jezero-only arcade response. Game mass is compressed, not a real rover simulator.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function arcadeResponse(s,input,tune,dt){
 const mass=clamp(tune.massFactor??1,.7,1.4),handling=clamp(tune.handling??1,.85,1.1),speed=Math.abs(s.v);
 const entry=!!input.brake&&Math.abs(input.steer??0)>.15&&speed>45;
 // Smoothly retain a short slide after the brake tap; releasing steering settles it sooner.
 const target=entry?1:0,rate=entry?9:Math.abs(input.steer??0)>.15?1.6:4;
 s.brakeSlide=(s.brakeSlide??0)+(target-(s.brakeSlide??0))*(1-Math.exp(-rate*dt));
 if(speed<15)s.brakeSlide*=Math.exp(-8*dt);
 const slide=s.brakeSlide;
 return {slide,mass,grip:(620*(1-slide)+100*slide)*handling/mass*(tune.cloneDrive?3:1),yaw:Math.min(1,(tune.cloneDrive?650:190)/Math.max(1,speed))*(1+.18*slide)/Math.sqrt(mass),braking:(1.7-.95*slide)/Math.sqrt(mass)};
}
export function arcadeBrake(speed,rate,dt){return Math.sign(speed)*Math.max(0,Math.abs(speed)-Math.max(24,Math.abs(speed)*rate)*dt)||0;}

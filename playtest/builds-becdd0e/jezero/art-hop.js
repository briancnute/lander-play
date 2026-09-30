const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function startArtHop(s){
 if(s.air||s.artHop)return false;
 s.artHop={age:0,charge:0,released:false};s.air=true;s.v=0;s.vz=0;s.boost=0;s.cruiseSeconds=0;return true;
}
export function stepArtHop(s,input,dt,ground,bounds){
 const h=s.artHop;if(!h)return false;
 h.age+=dt;
 if(!input.special)h.released=true;
 if(!h.released&&h.age<=2)h.charge=Math.min(2,h.age);
 const duration=2.5+1.25*h.charge,t=Math.min(1,h.age/duration),height=(24+24*h.charge)*Math.sin(Math.PI*t);
 s.heading+=(input.steer||0)*2*dt;
 s.v+=( (input.drive?65:0)-s.v)*Math.min(1,dt*5);
 s.x=clamp(s.x+Math.sin(s.heading)*s.v*dt,bounds.minX+45,bounds.width-45);
 s.y=clamp(s.y-Math.cos(s.heading)*s.v*dt,bounds.minY+45,bounds.maxY-45);
 s.z=ground(s.x,s.y)+height;s.vz=0;s.air=t<1;s.t+=dt;s.thrust=s.air?1:0;
 if(!s.air){s.artHop=null;s.z=ground(s.x,s.y);s.v=0;s.landingCompression=.15;}
 return true;
}

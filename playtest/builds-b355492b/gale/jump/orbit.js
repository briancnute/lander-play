// Camera presentation only. QTE icons, steering and craft attitude never rotate.
export function jumpOrbit(j,reducedMotion=false){
 if(!j?.flight||j.settings.cameraOrbit===false||reducedMotion)return {angle:0,focus:0};
 const c=j.config,u=Math.max(0,Math.min(1,(j.time-c.railStart)/(c.sequenceEnd-c.railStart)));
 // Zero velocity and acceleration at each endpoint; finish behind the craft.
 const eased=u*u*u*(10+u*(-15+6*u));
 return {angle:Math.PI*2*eased,focus:Math.sin(Math.PI*u)**2};
}

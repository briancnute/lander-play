// Camera presentation only. QTE icons, steering and craft attitude never rotate.
export function jumpOrbit(j,reducedMotion=false){
 if(!j?.flight||j.settings.cameraOrbit===false||reducedMotion)return {angle:0,focus:0};
 const c=j.config,u=Math.max(0,Math.min(1,(j.time-c.railStart)/(c.sequenceEnd-c.railStart)));
 // Brief smooth entry/exit, with steady rotation through most of QTE2.
 // A full-duration ease used to spend the final inputs barely moving.
 const edge=.08,entry=v=>{const t=v/edge;return edge*(t*t*t-.5*t*t*t*t)/(1-edge);};
 const eased=u<edge?entry(u):u>1-edge?1-entry(1-u):(u-edge/2)/(1-edge);
 return {angle:Math.PI*2*eased,focus:Math.sin(Math.PI*u)**2};
}

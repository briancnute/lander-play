// QTE/input time stays real time. Only the ballistic flight uses this clock.
// Integral of smoothstep, so speed eases continuously without frame-step drift.
const ramp=.18;
function easedIntegral(t,start){const x=Math.max(0,t-start);if(x>=ramp)return x-ramp/2;const u=x/ramp;return ramp*(u*u*u-.5*u*u*u*u);}
export function flightElapsed(time,config){
 const t=Math.max(config.takeoff,time),strength=config.worldSpeed??1;
 const held=easedIntegral(t,config.railStart)-easedIntegral(t,config.sequenceEnd);
 return Math.max(0,t-config.takeoff-(1-strength)*held);
}

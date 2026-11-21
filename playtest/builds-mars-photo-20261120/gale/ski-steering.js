// Presentation only. Both runners use parallel sled steering about separate mounts.
export const BLADE_LIMIT=.28;
export function bladeSteering(angle,steer,air,dt){
 if(!(dt>0))return angle;
 const target=air?0:Math.max(-1,Math.min(1,steer||0))*BLADE_LIMIT;
 return angle+(target-angle)*(1-Math.exp(-Math.min(dt,.1)*(air?4:10)));
}

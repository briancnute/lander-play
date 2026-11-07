export const TOUR_PACE={speed:3,boostMultiplier:1.65,boostSeconds:4,cooldownSeconds:4,doubleTapSeconds:.32};
export function tourTargetSpeed(leg,projection,velocity,multiplier=1){
 let curvature=0,previous=null;const ahead=Math.max(100,Math.abs(velocity)*.85);
 for(const p of leg.points){if(p.s<projection.station-20||p.s>projection.station+ahead)continue;if(previous){const angle=p.heading-previous.heading;curvature=Math.max(curvature,Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)))/Math.max(1,p.s-previous.s));}previous=p;}
 return Math.min(projection.speed*TOUR_PACE.speed*multiplier,curvature>.00001?Math.max(80,Math.sqrt(180/curvature)):Infinity,Math.sqrt(100*100+500*Math.max(0,leg.length-projection.station)));
}
export function createTourBoost(){
 let active=0,cooldown=0,lastTap=-Infinity,time=0;
 return {get active(){return active;},get cooldown(){return cooldown;},tap(at=time){
  if(at>=lastTap&&at-lastTap<=TOUR_PACE.doubleTapSeconds){lastTap=-Infinity;if(!active&&!cooldown){active=TOUR_PACE.boostSeconds;return true;}}
  else lastTap=at;return false;
 },cancel(){if(active){active=0;cooldown=TOUR_PACE.cooldownSeconds;}lastTap=-Infinity;},clearTap(){lastTap=-Infinity;},step(dt,{brake=false}={}){
  time+=dt;if(brake)this.cancel();
  if(active){active=Math.max(0,active-dt);if(!active)cooldown=TOUR_PACE.cooldownSeconds;}
  else cooldown=Math.max(0,cooldown-dt);
 },get multiplier(){return active?TOUR_PACE.boostMultiplier:1;}};
}

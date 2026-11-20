/** Unscored exploration and explicit activity boundaries, shared by the world engines.
 * This owns no points, clocks, discoveries, storage or physics.
 */
export function createFreeRoamSession({activities,activity}={activities:[]}) {
 const allowed=new Set(activities),state={phase:'roam',activity:null};
 const begin=id=>{
  if(!allowed.has(id)||state.phase==='activity')return false;
  state.phase='activity';state.activity=id;return true;
 };
 const finish=()=>{if(state.phase!=='activity')return false;state.phase='result';return true;};
 const resume=()=>{state.phase='roam';state.activity=null;};
 if(activity)begin(activity);
 return {state,begin,finish,resume};
}
/** Proximity only exposes an action; the player's explicit START owns the transition. */
export function canStartActivity({distance,speed,radius,maxSpeed=2}) {
 return [distance,speed,radius,maxSpeed].every(Number.isFinite)&&distance>=0&&radius>0&&maxSpeed>=0&&distance<=radius&&Math.abs(speed)<=maxSpeed;
}

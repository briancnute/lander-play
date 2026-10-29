// Countdown cutscene follows the unchanged Martian slope: no ramp or terrain edits.
// Same deterministic handoff as v6: 180 units in three seconds, exit at 120 units/s.
export function countdownLaunch(course){
 const launch={length:180,step(r){const age=3-r.countdown;r.s=20*age*age;r.u=0;r.v=40*age;r.side=0;r.facing=0;const p=course.point(r.s);r.worldX=p.x;r.worldY=p.y;r.mappedS=r.s;r.mappedU=0;r.z=course.height(r.s,0);r.air=false;r.vz=0;r.safe={s:r.s,u:0};}};
 return {...course,countdownLaunch:launch};
}

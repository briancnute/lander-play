export function nextTourGate(tour,run){return tour.checkpoints.findIndex((_,i)=>!run.visitedStops.includes(i));}
export function tourGate(tour,index){const p=tour.checkpoints[index],incoming=tour.legs[Math.max(0,index-1)].points.at(-1);return {...p,heading:p.entryHeading??(index===0?p.heading:incoming.heading),halfWidth:p.gateHalfWidth??40};}
export function crossesTourGate(gate,before,after,dt=1/60){
 const dx=after.x-before.x,dy=after.y-before.y,fx=Math.sin(gate.heading),fy=-Math.cos(gate.heading),a=(before.x-gate.x)*fx+(before.y-gate.y)*fy,b=(after.x-gate.x)*fx+(after.y-gate.y)*fy;
 if(a>=0||b<0||after.air||after.turnaround||Math.hypot(dx,dy)>Math.max(12,Math.abs(after.v)*dt*3+4))return false;
 const t=-a/(b-a),side=(before.x+dx*t-gate.x)*Math.cos(gate.heading)+(before.y+dy*t-gate.y)*Math.sin(gate.heading);return Math.abs(side)<=gate.halfWidth;
}
export function gateApproach(gate,distance=160){return {x:gate.x-Math.sin(gate.heading)*distance,y:gate.y+Math.cos(gate.heading)*distance,heading:gate.heading};}
export function viewHeading(stop,pose){return stop.focus?Math.atan2(stop.focus.x-pose.x,pose.y-stop.focus.y):stop.entryHeading??pose.heading;}
export function missedTourGate(gate,state){const dx=gate.x-state.x,dy=gate.y-state.y,d=Math.hypot(dx,dy),beyond=-dx*Math.sin(gate.heading)+dy*Math.cos(gate.heading);return beyond>80&&d>100&&(Math.sin(state.heading)*dx-Math.cos(state.heading)*dy)*(state.v<0?-1:1)<-d*.2;}

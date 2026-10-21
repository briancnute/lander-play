const smooth=x=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t);};
// Stations set pacing only: actual target positions are still generated from live state.
export function flightTargetPlan(route,length){
 if(route.id==='canyon-run'){
  const stations=[.08,.16,.29,.42,.50,.58,.66,.74,.82,.91];
  return stations.map((fraction,id)=>({s:length*fraction,beat:id===2||id===3?'drift':'react',revealS:id===2?length*.19:id===3?length*.31:0}));
 }
 if(route.id==='kodiak-approach')return [.08,.16,.24,.32,.55,.62,.69,.76,.83,.91].map((fraction,id)=>({s:length*fraction,revealS:id===4?length*.45:0}));
 return Array.from({length:10},(_,id)=>({s:length*(id+1)/11}));
}
export function kodiakReveal(course,distance){
 if(course?.id!=='kodiak-approach')return 0;
 const position=distance/course.length;
 return smooth((position-.32)/.025)*smooth((.45-position)/.025);
}
export function frameKodiak(camera,pose,course,distance,ground){
 const amount=kodiakReveal(course,distance);if(!amount)return camera;
 const k=course.landmark,bearing=Math.atan2(k.x-pose.x,pose.y-k.y),error=Math.atan2(Math.sin(bearing-pose.heading),Math.cos(bearing-pose.heading)),heading=pose.heading+Math.max(-.32,Math.min(.32,error))*.75*amount;
 const back=Math.max(185,Math.hypot(camera.x-pose.x,camera.y-pose.y));
 camera.x=pose.x-Math.sin(heading)*back;camera.y=pose.y+Math.cos(heading)*back;
 camera.eye=Math.max(pose.z+78,ground(camera.x,camera.y)+12);camera.heading=heading;
 camera.pitch=Math.atan2(camera.eye-pose.z,back)-Math.atan2(78,185)+.14;
 return camera;
}
export function recordCaptureFlow(f,collected){
 if(f.course?.id!=='western-frontier')return;
 f.captureStreak=collected?(f.captureStreak??0)+1:0;
 f.bestCaptureStreak=Math.max(f.bestCaptureStreak??0,f.captureStreak);
 if(collected)f.lastFlowCapture=f.time;
}

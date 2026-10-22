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
export function recordCaptureFlow(f,collected){
 if(f.course?.id!=='western-frontier')return;
 f.captureStreak=collected?(f.captureStreak??0)+1:0;
 f.bestCaptureStreak=Math.max(f.bestCaptureStreak??0,f.captureStreak);
 if(collected)f.lastFlowCapture=f.time;
}

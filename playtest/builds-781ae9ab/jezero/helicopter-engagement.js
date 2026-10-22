const smooth=x=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t);};
// Stations set pacing only: actual target positions are still generated from live state.
export function flightTargetPlan(route,length){
 if(route.id==='canyon-run'){
  const stations=[.08,.16,.29,.42,.50,.58,.66,.74,.82,.91];
  return [0,1].flatMap(section=>stations.map((fraction,i)=>({s:length*(section+fraction)/2,beat:i===2||i===3?'drift':'react',revealS:i===2?length*(section+.19)/2:i===3?length*(section+.31)/2:0})));
 }
 if(route.id==='kodiak-approach')return [0,1].flatMap(section=>[.08,.16,.24,.32,.55,.62,.69,.76,.83,.91].map((fraction,id)=>({s:length*(section+fraction)/2,revealS:id===4?length*(section+.45)/2:0})));
 return Array.from({length:20},(_,id)=>({s:length*(id+1)/21}));
}
export function recordCaptureFlow(f,collected){
 if(f.course?.id!=='western-frontier')return;
 f.captureStreak=collected?(f.captureStreak??0)+1:0;
 f.bestCaptureStreak=Math.max(f.bestCaptureStreak??0,f.captureStreak);
 if(collected)f.lastFlowCapture=f.time;
}

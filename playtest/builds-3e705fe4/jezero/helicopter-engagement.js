const smooth=x=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t);};
// Stations set pacing only: actual target positions are still generated from live state.
export function flightTargetPlan(route,length){
 if(route.id==='canyon-run'){
  const stations=[.08,.18,.34,.48,.60,.70,.80,.91];
  return [0,1].flatMap(section=>stations.map((fraction,i)=>({s:length*(section+fraction)/2,beat:i===2||i===3?'drift':'react',revealS:i===2?length*(section+.19)/2:i===3?length*(section+.31)/2:0})));
 }
 if(route.id==='kodiak-approach')return [0,1].flatMap(section=>[.08,.18,.28,.38,.58,.69,.80,.91].map((fraction,id)=>({s:length*(section+fraction)/2,revealS:id===4?length*(section+.48)/2:0})));
 return Array.from({length:16},(_,id)=>({s:length*(id+1)/17}));
}
export function recordCaptureFlow(f,collected){
 if(f.course?.id!=='western-frontier')return;
 f.captureStreak=collected?(f.captureStreak??0)+1:0;
 f.bestCaptureStreak=Math.max(f.bestCaptureStreak??0,f.captureStreak);
 if(collected)f.lastFlowCapture=f.time;
}

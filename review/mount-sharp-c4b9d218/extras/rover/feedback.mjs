// Presentation events only. Never writes simulation state or changes timing.
export const feedbackSnapshot=s=>({ready:s.charge>=1,boost:s.boost>0,hot:s.overheated,warning:s.heat>=85,gate:s.nextGate,samples:s.collected.length});
export function feedbackEvents(before,s){
 const events=[];
 if(s.nextGate>before.gate)events.push('checkpoint');
 if(!before.ready&&s.charge>=1)events.push('ready');
 if(!before.boost&&s.boost>0)events.push('boost');
 if(!before.hot&&s.overheated)events.push('overheat');
 else if(!before.warning&&s.heat>=85)events.push('warning');
 if(s.collected.length>before.samples)events.push('sample');
 return events;
}

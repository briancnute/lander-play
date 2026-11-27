// Presentation events only.
export const feedbackSnapshot=s=>({boost:s.boost>0,gate:s.nextGate,samples:s.collected.length});
export function feedbackEvents(before,s){const events=[];
 if(s.nextGate>before.gate)events.push('checkpoint');
 if(!before.boost&&s.boost>0)events.push('boost');
 if(s.collected.length>before.samples)events.push('sample');
 return events;
}

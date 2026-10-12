export const GATE_PULSE_SECONDS=.55;
const clamp=v=>Math.max(0,Math.min(1,v));
// Run time pauses with the activity. A crossed gate owns exactly one result.
export function gatePulse(event,time,reduced=false){
 const age=time-event.at;if(age<0||age>=GATE_PULSE_SECONDS)return null;
 const light=reduced?1:event.hit?Math.min(1,age/.035,(GATE_PULSE_SECONDS-age)/.32):Math.max(clamp(1-age/.15),age>=.23?clamp(1-(age-.23)/.17):0);
 return {age,light:clamp(light),sparks:event.hit&&!reduced};
}

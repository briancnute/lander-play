export const GATE_PULSE_SECONDS=.55;
// Solid confirmation, with no glow, particles or blinking. Run time freezes on pause.
export function gatePulse(event,time){
 const age=time-event.at;return age<0||age>=GATE_PULSE_SECONDS?null:{age,light:1,sparks:false};
}

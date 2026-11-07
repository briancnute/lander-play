// Keep the measured-speed trial on wall time at 4–120 Hz. Physics still
// integrates in 1/60 s steps in main.js; never take one giant physics step.
// Bound exceptional stalls to 250 ms; hidden/paused time is excluded by main.
// Preserve the approved legacy clock for the other activities.
export function slalomFrameSeconds(milliseconds,measured=false){
 if(!Number.isFinite(milliseconds)||milliseconds<=0)return 0;
 return Math.min(measured?.25:.05,milliseconds/1000);
}

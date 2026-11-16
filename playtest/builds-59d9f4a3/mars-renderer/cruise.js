// Jezero-only, producer-approved straight-line cruising. No airborne thrust.
export function cruiseFactor(s,input,dt){
 const eligible=s.mode!=='trial'||s.countdown<=0;
 if(!eligible||s.air||s.turnaround||s.impact>0||!input.drive||input.brake||Math.abs(input.steer||0)>.001||s.v<=1)s.cruiseSeconds=0;
 else s.cruiseSeconds=Math.min(12,(s.cruiseSeconds||0)+dt);
 return 1+.5*Math.max(0,Math.min(1,(s.cruiseSeconds-6)/6));
}

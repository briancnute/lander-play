// Producer-approved arcade slalom: Murray support except on explicit terrain
// features. Zones only permit takeoff; the existing surface supplies momentum.
export function stepSlalomContact(r,previous,ground,sampleBehind,zone,dt,gravity){
 if(!zone){r.z=ground;r.vz=Math.min(0,(ground-previous.z)/dt);return;}
 // Carry the incoming terrain tangent, including when entering a zone. Never
 // manufacture an upward impulse, clip launch speed or lock the landing down.
 const incoming=(previous.z-sampleBehind)/dt;
 const next=previous.z+incoming*dt-gravity*dt*dt/2;
 if(Math.hypot(r.v,r.side)>25&&next>ground+.02){
  r.z=next;r.vz=incoming-gravity*dt;r.air=true;
  r.takeoff='slalom-exception';r.feedback='Airborne';
 }else{r.z=ground;r.vz=(ground-previous.z)/dt;}
}

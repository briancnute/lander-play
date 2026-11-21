// Ground support is a constraint, not a spring. Mesh correction never supplies
// launch energy. Crests must open a sustained, body-scale ballistic gap.
export function skiContact(r, sample, dt, gravity) {
 const speed=Math.hypot(r.v,r.side),forward=speed?r.v/speed:0,side=speed?r.side/speed:0;
 const ground=sample(0,0),span=Math.max(24,speed*.12);
 const incoming=(ground-sample(-forward*span,-side*span))/span*speed;
 const tangent=Math.max(-120,Math.min(95,incoming));
 if(r.contactVelocity===undefined)r.contactVelocity=tangent;
 r.contactVelocity+=Math.max(-90*dt,Math.min(90*dt,tangent-r.contactVelocity));
 r.contactLock=Math.max(0,(r.contactLock??0)-dt);
 const velocity=Math.min(tangent,r.contactVelocity),gap=t=>ground+velocity*t-gravity*t*t/2-sample(r.v*t,r.side*t);
 const meaningful=speed>16&&gap(.16)>.65&&gap(.28)>1.2;
 r.crestAge=meaningful&&!r.contactLock?(r.crestAge??0)+dt:0;
 r.z=ground;
 if(r.crestAge>=.065&&gap(dt)>.01){r.z=ground+1e-6;r.air=true;r.vz=velocity;r.takeoff='crest';r.crestAge=0;r.feedback='Airborne';}
 else {r.z=ground;r.vz=0;}
}

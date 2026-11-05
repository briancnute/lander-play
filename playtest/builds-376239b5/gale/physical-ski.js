import {stepSurfaceMotion,surfaceNormal} from './surface-motion.js';
import {stepTimeTrialEvent} from './time-trial-records.js';
// Opt-in replacement model. Murray and archived courses keep their exact solver.
export function stepPhysicalSki(r,c,input,dt){
 const counting=r.phase==='countdown',oldS=r.s,oldU=r.u,oldAir=r.air;
 const oldPoint=c.point(r.s,r.u),oldClearance=r.z-c.worldHeight(r.worldX??oldPoint.x,r.worldY??oldPoint.y);
 if(!r.surfaceBody||!Number.isFinite(r.worldX)){
  const p=c.point(r.s,r.u),h=c.heading(r.s),vx=Math.sin(h)*r.v+Math.cos(h)*r.side,vy=-Math.cos(h)*r.v+Math.sin(h)*r.side,n=surfaceNormal(c.worldHeight,p.x,p.y);
  r.surfaceBody={x:p.x,y:p.y,z:r.z,vx,vy,vz:r.air?r.vz:-(n.x*vx+n.y*vy)/n.z,air:r.air,heading:h};
 }
 stepSurfaceMotion(r.surfaceBody,c.worldHeight,counting?{gas:true}:input,dt,{...c.drive,thrust:counting?40:c.drive.thrust});
 const b=r.surfaceBody,q=c.coords(b.x,b.y);r.s=Math.max(0,Math.min(c.length,q.s));r.u=q.u;r.worldX=b.x;r.worldY=b.y;r.z=b.z;r.vz=b.vz;r.air=b.air;
 const h=c.heading(r.s);r.v=b.vx*Math.sin(h)-b.vy*Math.cos(h);r.side=b.vx*Math.cos(h)+b.vy*Math.sin(h);r.facing=Math.atan2(r.side,r.v);r.mappedS=r.s;r.mappedU=r.u;
 if(!r.air&&r.s-r.safe.s>200&&Math.abs(r.u)<c.width)r.safe={s:r.s,u:r.u};
 if(counting){r.countdown=Math.max(0,r.countdown-dt);if(r.countdown<1e-8){r.countdown=0;r.phase='running';}return;}
 r.time+=dt;
 if(c.timeTrial&&!c.practice){
  const incidental=c.incidentalAirHeight!==undefined&&Math.max(oldClearance,b.z-c.worldHeight(b.x,b.y))<=c.incidentalAirHeight;
  if(c.incidentalAirHeight!==undefined&&!incidental&&r.air&&oldS<c.finish&&r.s>=c.finish)r.finishMissed=true;
  stepTimeTrialEvent(r,c.incidentalAirHeight===undefined?c:{...c,airborneGates:incidental,airborneFinish:incidental},oldS,oldU,oldAir);
 }
}

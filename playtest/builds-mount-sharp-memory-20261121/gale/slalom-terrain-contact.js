// Terrain-derived takeoff for approved slalom contact. Source metre thresholds;
// no course coordinates, named features, artificial impulse or air steering.
const U=8/3;
export const SLALOM_CREST={span:20*U,prominence:2*U,rollover:5*Math.PI/180,clearanceNear:.35*U,clearanceFar:.7*U,minSpeed:25,cooldown:.2};
export function slalomCrestMetrics(previous,x,y,height,dt,gravity,probe={}){
 const dx=x-previous.x,dy=y-previous.y,d=Math.hypot(dx,dy);if(d<1e-8)return null;
 const speed=d/dt,ux=dx/d,uy=dy/d,z=height(previous.x,previous.y),sample=s=>height(previous.x+ux*s,previous.y+uy*s),span=SLALOM_CREST.span;
 const back=(z-sample(-span))/span,front=(sample(span)-z)/span,incoming=(z-sample(-d))/dt;
 const relief=2*span*back+z-sample(2*span),gap=s=>z+incoming*s/speed-gravity*(s/speed)**2/2-sample(s);
 return {speed,incoming,rollover:Math.atan(back)-Math.atan(front),prominence:relief,gapNear:gap(probe.nearSeconds?Math.min(span,Math.max(2*U,speed*probe.nearSeconds)):span),gapFar:gap(probe.farSeconds?Math.min(2*span,Math.max(4*U,speed*probe.farSeconds)):2*span),next:z+incoming*dt-gravity*dt*dt/2};
}
export function stepTerrainSlalomContact(r,previous,ground,height,dt,gravity,probe={}){
 r.terrainContactLock=Math.max(0,(r.terrainContactLock??0)-dt);
 const m=slalomCrestMetrics(previous,r.worldX,r.worldY,height,dt,gravity,probe),t={...SLALOM_CREST,...probe};
 if(!r.terrainContactLock&&m&&m.speed>t.minSpeed&&m.prominence>=t.prominence&&m.rollover>=t.rollover&&m.gapNear>=t.clearanceNear&&m.gapFar>=t.clearanceFar&&m.next>ground+(probe.minimumSeparation??.02)){
  r.z=m.next;r.vz=m.incoming-gravity*dt;r.air=true;r.takeoff='terrain-crest';r.feedback='Airborne';
 }else{r.z=ground;r.vz=(ground-previous.z)/dt;}
}

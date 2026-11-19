const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/** Swept world-space pickups also work on a return pass and at maximum thrust. */
export function stepScoreCourse(r,c,previous,dt,recover){
 if(!c.scoreCourse||c.practice||r.phase!=='running')return;
 const p={x:r.worldX,y:r.worldY,z:r.z},near=c.point(r.s),outside=Math.hypot(p.x-near.x,p.y-near.y)>c.boundaryHalf;
 r.outsideSeconds=outside?(r.outsideSeconds??0)+dt:0;
 if(!outside&&!r.air&&Math.abs(r.u)<c.trailHalf)r.trailSafe={s:r.s,u:0};
 if(r.outsideSeconds>=c.returnSeconds-1e-8){
  r.safe=r.trailSafe??{s:0,u:0};recover(r,c);const back=c.point(r.s,r.u);r.worldX=back.x;r.worldY=back.y;r.mappedS=r.s;r.mappedU=r.u;r.outsideSeconds=0;r.contactVelocity=undefined;r.contactLock=.3;r.crestAge=0;r.feedback='Back on trail · combo lost · +5s';return;
 }
 const swept=(target,radius)=>{
  const dx=p.x-previous.x,dy=p.y-previous.y,len=dx*dx+dy*dy,t=len?clamp(((target.x-previous.x)*dx+(target.y-previous.y)*dy)/len,0,1):0;
  const x=previous.x+dx*t,y=previous.y+dy*t,z=previous.z+(p.z-previous.z)*t;
  return Math.hypot(x-target.x,y-target.y)<=radius&&Math.abs(z-c.surface(target.x,target.y))<55;
 };
 r.orbs??=[];
 for(const orb of c.orbs)if(!r.orbs.includes(orb.id)&&swept(c.point(orb.s,orb.u),orb.radius)){
  r.orbs.push(orb.id);r.score+=orb.points;r.feedback=`Mars orb · +${orb.points} · ${r.orbs.length}/10`;
 }
 if(!r.roverFound&&swept(c.rover,c.rover.radius)){r.roverFound=true;r.roverPopupPending=true;r.feedback='You found Curiosity!';}
 for(const j of c.jumps)if(!r.ramps.includes(j.id)&&previous.s<j.s&&r.s>=j.s&&Math.abs(r.u)<j.width-10&&!r.air&&r.v>35&&r.z-c.height(r.s,r.u)<12){
  r.ramps.push(j.id);r.air=true;r.vz=j.launch+Math.min(0,(c.height(j.s+400)-c.height(j.s-400))/800*Math.hypot(r.v,r.side));r.takeoff='score-jump';r.trick=null;r.feedback='Jump · trick stretch';
 }
 if(r.s>=c.finish&&!r.air&&Math.abs(r.u)<=c.trailHalf){r.phase='result';r.reason='Crater run complete';r.finishedCourse=true;}
}

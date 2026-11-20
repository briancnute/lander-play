/** Reusable planar tire response. Units belong to the caller; air controls/gravity stay separate. */
export function tractionStep(vx,vy,heading,forwardDelta,grip,dt){
 const fx=Math.sin(heading),fy=-Math.cos(heading),rx=Math.cos(heading),ry=Math.sin(heading);
 const forward=vx*fx+vy*fy+forwardDelta,side=vx*rx+vy*ry;
 const lateral=Math.sign(side)*Math.max(0,Math.abs(side)-Math.max(0,grip)*dt);
 return {vx:fx*forward+rx*lateral,vy:fy*forward+ry*lateral,forward,slip:lateral};
}

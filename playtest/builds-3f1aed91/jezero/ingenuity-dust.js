// A stationary storm bank beyond the finish/landing area, never a camera fog radius.
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function createIngenuityDust(course,random=Math.random){
 const heading=course.finishLine.heading,nx=Math.sin(heading),ny=-Math.cos(heading),distance=course.stormDistance??220,x=course.finish.x+nx*distance,y=course.finish.y+ny*distance;
 const plane={nx,ny,offset:nx*x+ny*y,width:160,top:Math.max(2500,(course.padZ??775)+1800)};
 const bend=across=>35*Math.sin(across*.0013)+12*Math.sin(across*.0031);
 return {age:0,haze:0,front:0,direction:random()<.5?1:-1,boundary:{x,y,...plane},
  boundaryDistance(p){return plane.offset-plane.nx*p.x-plane.ny*p.y;},
  mapDensity(x,y){const across=-ny*x+nx*y,signed=nx*x+ny*y-plane.offset-bend(across);return smooth(0,plane.width,signed);},
  density(x,y){return this.mapDensity(x,y);},
  curtain:{worldPlane:true,heading,direction:1,plane,enabled:true,complete:true},
  update(elapsed){this.age=Math.max(0,elapsed);this.curtain.direction=this.direction;return this;}
 };
}

// Unilateral surface contact: terrain may push outward, never pull inward.
// All lengths/velocities/accelerations use engine units and real seconds.
export function surfaceNormal(ground,x,y){
 const d=.1,gx=(ground(x+d,y)-ground(x-d,y))/(2*d),gy=(ground(x,y+d)-ground(x,y-d))/(2*d),l=Math.hypot(gx,gy,1);
 return {x:-gx/l,y:-gy/l,z:1/l};
}
const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
export function stepSurfaceMotion(body,ground,input,dt,{gravity=3.71*8/3,thrust=48,limit=360,grip=1.2}={}){
 const steps=Math.ceil(dt/(1/240)),h=dt/steps;
 for(let i=0;i<steps;i++){
  const v={x:body.vx,y:body.vy,z:body.vz},speed=Math.hypot(v.x,v.y,v.z);let a={x:0,y:0,z:-gravity};
  if(!body.air){
   const n=surfaceNormal(ground,body.x,body.y),forward=speed>1e-8?{x:v.x/speed,y:v.y/speed,z:v.z/speed}:{x:Math.sin(body.heading),y:-Math.cos(body.heading),z:0};
   // Heading input asks for a turn; available lateral grip bounds the response.
   const side={x:n.y*forward.z-n.z*forward.y,y:n.z*forward.x-n.x*forward.z,z:n.x*forward.y-n.y*forward.x};
   const steering=Math.max(-1,Math.min(1,input.steer||0)),brake=!!input.brake||!!input.both,powered=!!input.gas&&!brake;
   const rate=brake?1.35:powered?.32:.78;
   const available=grip*gravity*n.z;
   const lateral=Math.max(-available,Math.min(available,steering*speed*rate)),braking=brake?Math.min(24,available):0,requested=Math.hypot(lateral,braking);
   const traction=requested?Math.min(1,available/requested):0;
   const drag=.025+speed*.004+speed*speed*.000025+Math.max(0,speed-limit)*.8;
   const drive=(powered?thrust:0)-Math.min(speed/h,drag+braking*traction);
   a.x+=forward.x*drive+side.x*lateral*traction;a.y+=forward.y*drive+side.y*lateral*traction;a.z+=forward.z*drive+side.z*lateral*traction;
  }
  const next={x:body.x+v.x*h+a.x*h*h/2,y:body.y+v.y*h+a.y*h*h/2,z:body.z+v.z*h+a.z*h*h/2};
  body.vx+=a.x*h;body.vy+=a.y*h;body.vz+=a.z*h;
  const floor=ground(next.x,next.y);
  if(next.z<=floor){
   const n=surfaceNormal(ground,next.x,next.y),incoming=dot({x:body.vx,y:body.vy,z:body.vz},n);
   // Inelastic impact removes only velocity into the surface. No vertical cap,
   // delayed release, contact lock, look-ahead launch, or downward impulse.
   if(incoming<0){body.vx-=incoming*n.x;body.vy-=incoming*n.y;body.vz-=incoming*n.z;}
   next.z=floor;body.air=false;
  }else body.air=true;
  body.x=next.x;body.y=next.y;body.z=next.z;
  if(Math.hypot(body.vx,body.vy)>1e-8)body.heading=Math.atan2(body.vx,-body.vy);
 }
 return body;
}

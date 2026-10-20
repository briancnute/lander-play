const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const approach=(a,b,amount)=>a+clamp(b-a,-amount,amount);
const turn=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export const HELICOPTER={speed:560,acceleration:240,coast:90,bank:.5,yaw:1.55,rise:90,descent:18,clearance:60,landingRadius:150,landingSeconds:1.1};
export function createRelayHelicopter(pad,pose,exit,ground){
 return {x:pad.x,y:pad.y,z:ground(pad.x,pad.y)+32,heading:pad.heading,v:Math.max(0,pose.v),vz:0,bank:0,time:0,phase:'flying',hatchClosed:true,exit:{...exit},landing:null};
}
export function stepRelayHelicopter(f,input,dt,ground,bounds){
 if(!Number.isFinite(dt)||dt<=0)return helicopterPose(f);
 f.time+=dt;
 if(f.phase==='landing'){
  f.landing.elapsed=Math.min(HELICOPTER.landingSeconds,f.landing.elapsed+dt);const t=smooth(f.landing.elapsed/HELICOPTER.landingSeconds),a=f.landing.start,b=f.exit;
  f.x=a.x+(b.x-a.x)*t;f.y=a.y+(b.y-a.y)*t;f.z=a.z+(ground(b.x,b.y)+32-a.z)*t;f.heading=turn(a.heading,b.heading,t);f.bank=a.bank*(1-t);f.v=a.v*(1-t);
  if(t===1){f.phase='landed';f.hatchClosed=false;f.v=0;}return helicopterPose(f);
 }
 if(f.phase==='landed')return helicopterPose(f);
 const steer=clamp(input.steer||0,-1,1),rise=!!(input.brake||input.special||input.reverse);
 f.bank+=(steer*HELICOPTER.bank-f.bank)*(1-Math.exp(-dt*7));f.heading+=f.bank*HELICOPTER.yaw*dt;f.heading=Math.atan2(Math.sin(f.heading),Math.cos(f.heading));
 f.v=approach(f.v,input.drive?HELICOPTER.speed:0,(input.drive?HELICOPTER.acceleration:HELICOPTER.coast)*dt);
 f.x+=Math.sin(f.heading)*f.v*dt;f.y-=Math.cos(f.heading)*f.v*dt;
 if(bounds){f.x=clamp(f.x,bounds.minX+80,bounds.width-80);f.y=clamp(f.y,bounds.minY+80,bounds.maxY-80);}
 f.vz=approach(f.vz,rise?HELICOPTER.rise:-HELICOPTER.descent,180*dt);f.z+=f.vz*dt;
 const floor=ground(f.x,f.y)+32+(HELICOPTER.clearance-32)*smooth(f.time/.6);
 if(f.z<floor){f.z=floor;f.vz=Math.max(0,f.vz);}
 // Terrain clearance is automatic; the player controls height above that safe floor.
 if(f.z>ground(f.x,f.y)+700){f.z=ground(f.x,f.y)+700;f.vz=Math.min(0,f.vz);}
 if(f.time>.5&&Math.hypot(f.x-f.exit.x,f.y-f.exit.y)<=HELICOPTER.landingRadius){f.phase='landing';f.landing={elapsed:0,start:{x:f.x,y:f.y,z:f.z,heading:f.heading,v:f.v,bank:f.bank}};}
 return helicopterPose(f);
}
export function helicopterPose(f){return {x:f.x,y:f.y,z:f.z,heading:f.heading,v:f.v,vz:f.vz,air:true,helicopter:true,helicopterBank:f.bank};}
// Single follow camera, with one terrain-clearance sample instead of the rover's
// obstacle boom plus a second side-view camera. No scripted side-view cut.
export function followRelayHelicopter(camera,pose,dt,ground){
 const back=185,heading=turn(camera.heading??pose.heading,pose.heading,1-Math.exp(-Math.min(.05,dt)*5));
 const target={x:pose.x-Math.sin(heading)*back,y:pose.y+Math.cos(heading)*back,eye:pose.z+78};
 const blend=1-Math.exp(-Math.min(.05,dt)*8);
 for(const key of ['x','y','eye'])camera[key]=(camera[key]??target[key])+(target[key]- (camera[key]??target[key]))*blend;
 camera.eye=Math.max(camera.eye,ground(camera.x,camera.y)+12);camera.heading=heading;camera.pitch=.14;camera.live=true;camera.zoom=1;return camera;
}

// Prototype-only suspension policy. Broad climbs stay planted; compact convex bumps can launch.
// World units are illustrative: these are feel settings, not measured rover suspension data.
export function launchProfile(s,ground){
 const span=12,sign=s.v<0?-1:1,dx=Math.sin(s.heading)*span*sign,dy=-Math.cos(s.heading)*span*sign;
 const z=ground(s.x,s.y),behind=ground(s.x-dx,s.y-dy),ahead=ground(s.x+dx,s.y+dy);
 return {bend:(2*z-behind-ahead)/span,rise:(z-behind)/span,fall:(z-ahead)/span};
}
export function prepareContact(s,ground){
 if(s.air)return;
 const p=launchProfile(s,ground);
 // Remove inherited hill-climb momentum before the original takeoff decision. The original
 // update then recomputes contact height/velocity, pickups and scans in their normal order.
 s.vz=p.bend>=.12&&p.rise>.04&&p.fall>.025?Math.min(s.vz,18):0;
}
export function followAirborne(cam,focus,x,y){
 // Keep the lens above the rendered rover, not down on the ground beneath its flight path.
 const floor=focus+17;
 if(cam.eye<floor){cam.eye=floor;cam.pitch=Math.atan2(cam.eye-focus,Math.hypot(cam.x-x,cam.y-y))-Math.atan2(17,74);}
 return cam;
}

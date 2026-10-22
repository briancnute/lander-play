import {clearance} from './contact.mjs';
import {mesa,angle} from './sim.mjs';
// Fixed chase distance: terrain avoidance lifts smoothly, never switches zoom modes.
export function updateCamera(cam,s,dt){
 const step=Math.max(0,Math.min(.05,dt));
 cam.h+=angle(s.heading-cam.h)*Math.min(1,step*3);
 cam.x+=(s.x-cam.x)*Math.min(1,step*8);cam.y+=(s.y-cam.y)*Math.min(1,step*8);
 let lift=0;
 for(let d=12;d<=74;d+=3){const gap=clearance(cam.x-Math.sin(cam.h)*d,cam.y+Math.cos(cam.h)*d,mesa,[]);
  lift=Math.max(lift,18*Math.max(0,Math.min(1,(12-gap)/12)));
 }
 cam.lift=(cam.lift??0)+(lift-(cam.lift??0))*(1-Math.exp(-4*step));
 return {back:74,lift:cam.lift};
}

import {landmarkParts} from './discoveries.mjs';
import {delta} from './regions.mjs';
import {clearance} from './contact.mjs';
import {mesa,rocks,ground,angle} from './sim.mjs';
let cachedDelta,occluders;
export function cameraSurface(x,y){
 if(!occluders||cachedDelta!==delta){cachedDelta=delta;occluders=[{poly:mesa,height:25},...(delta?.mesas??[]).map((poly,i)=>({poly,height:i>=3?63:i===0?33:27})),...landmarkParts.map(p=>({poly:p.poly,height:p.height+4}))].map(p=>({...p,roof:Math.max(...p.poly.map(v=>ground(...v)))+p.height}));}
 let z=ground(x,y);
 for(const p of occluders)if(clearance(x,y,p.poly,[])<=0)z=Math.max(z,p.roof);
 for(const [rx,ry,r]of [...rocks,...(delta?.rocks??[])])if(Math.hypot(x-rx,y-ry)<r+2)z=Math.max(z,ground(rx,ry)+r*.7);
 return z;
}
// Fixed chase distance; actual lens and sight line must clear terrain and rock.
export function updateCamera(cam,s,dt){
 const step=Math.max(0,Math.min(.05,dt)),back=74;
 cam.h+=angle(s.heading-cam.h)*Math.min(1,step*3);
 cam.x+=(s.x-cam.x)*Math.min(1,step*8);cam.y+=(s.y-cam.y)*Math.min(1,step*8);
 const x=cam.x-Math.sin(cam.h)*back,y=cam.y+Math.cos(cam.h)*back,focus=s.z+6;
 let required=cameraSurface(x,y)+8;
 for(let i=1;i<=24;i++){const t=i/24,px=s.x+(x-s.x)*t,py=s.y+(y-s.y)*t;required=Math.max(required,focus+(cameraSurface(px,py)+3-focus)/t);}
 const target=Math.max(required,ground(x,y)+23);
 cam.eye=cam.eye===undefined?target:Math.max(required,cam.eye+(target-cam.eye)*(1-Math.exp(-step*6)));
 const distance=Math.hypot(s.x-x,s.y-y),targetPitch=Math.atan2(cam.eye-focus,distance)-Math.atan2(17,back);
 cam.pitch=cam.pitch===undefined?targetPitch:cam.pitch+(targetPitch-cam.pitch)*(1-Math.exp(-step*5));
 cam.lift=cam.eye-ground(s.x,s.y)-23;
 return {back,lift:cam.lift,eye:cam.eye,pitch:cam.pitch,x,y};
}

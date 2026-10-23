import {flightFrame} from './helicopter-path.js';
import {FLIGHT_TERRAIN_BOUNDS,flightMapFrame} from './helicopter-map.js';
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
export function startRouteIntro(f){f.phase='route-intro';f.routeIntro={elapsed:0,duration:15};}
export function skipRouteIntro(f){const a=f?.routeIntro;if(f?.phase!=='route-intro'||a.elapsed<2||a.skip)return false;a.skip={elapsed:0,from:a.view?{...a.view}:null};return true;}
export function stepRouteIntro(f,dt){const a=f.routeIntro;if(a.skip)a.skip.elapsed+=dt;else a.elapsed=Math.min(a.duration,a.elapsed+dt);if(a.elapsed>=a.duration-1e-8||a.skip?.elapsed>=.8){f.phase='launch';f.routeIntro=null;}}
function look(x,y,eye,target,ground){eye=Math.max(eye,ground(x,y)+80);const distance=Math.hypot(target.x-x,target.y-y);return {x,y,eye,heading:Math.atan2(target.x-x,y-target.y),pitch:Math.atan2(eye-target.z,distance),zoom:1,live:true};}
function mix(a,b,t){const out={...a};for(const k of ['x','y','eye','pitch','zoom'])out[k]=a[k]+(b[k]-a[k])*t;out.heading=a.heading+Math.atan2(Math.sin(b.heading-a.heading),Math.cos(b.heading-a.heading))*t;return out;}
export function introLaunchView(f,ground){const h=f.heading,back=220,x=f.x-Math.sin(h)*back,y=f.y+Math.cos(h)*back;return {x,y,eye:Math.max(f.z+78,ground(x,y)+30),heading:h,pitch:.14,zoom:1,live:true};}
export function frameRouteIntro(camera,f,ground){
 const a=f.routeIntro,c=f.course,t=a.elapsed,w=globalThis.innerWidth??1180,h=globalThis.innerHeight??800,focal=Math.min(w*.95,h*.9),map=flightMapFrame(c,w,h,1);
 // The renderer's ordinary horizon is at 38%; shift an overhead camera to put
 // the same map coordinate exactly at 50%, without changing any flight camera.
 const overhead=(target,scale)=>{const b=FLIGHT_TERRAIN_BOUNDS,ex=(Math.abs(Math.cos(map.heading))*w+Math.abs(Math.sin(map.heading))*h)/2,ey=(Math.abs(Math.sin(map.heading))*w+Math.abs(Math.cos(map.heading))*h)/2;scale=Math.min(scale,(Math.min(target.x-b.minX,b.maxX-target.x)-500)/ex,(Math.min(target.y-b.minY,b.maxY-target.y)-500)/ey);return {x:target.x+Math.sin(map.heading)*.12*h*scale,y:target.y-Math.cos(map.heading)*.12*h*scale,eye:target.z+focal*scale,heading:map.heading,pitch:Math.PI/2,zoom:1,live:true};};
 const center={x:map.x,y:map.y,z:Math.max(...c.altitudeProfile.map(p=>p.z),c.padZ,f.launch.padZ)},route=overhead(center,map.scale),near=overhead({x:f.x,y:f.y,z:f.launch.padZ},1400/focal),pad=overhead({x:f.x,y:f.y,z:f.launch.padZ},650/focal),launch=introLaunchView(f,ground);
 let view=t<7.8?route:t<11.2?mix(route,near,smooth((t-7.8)/3.4)):t<13.5?mix(near,pad,smooth((t-11.2)/2.3)):mix(pad,launch,smooth((t-13.5)/1.5));
 if(a.skip)view=mix(a.skip.from??view,launch,smooth(a.skip.elapsed/.8));
 view.eye=Math.max(view.eye,ground(view.x,view.y)+30);a.view={...view};Object.assign(camera,view,{terrainRange:Math.max(9000,c.length*1.25)});return camera;
}
export function introValleyOutline(course,ground){if(course.curved)return Array.from({length:65},(_,i)=>{const angle=i*Math.PI/32,p=flightFrame(course,-300+(course.length+600)*(1+Math.cos(angle))/2),side=Math.sin(angle)*(course.halfWidth+430),x=p.x+Math.cos(p.heading)*side,y=p.y+Math.sin(p.heading)*side;return {x,y,z:ground(x,y)+12};});const h=course.start.heading,middle={x:(course.start.x+course.finish.x)/2-Math.sin(h)*140,y:(course.start.y+course.finish.y)/2+Math.cos(h)*140},length=course.length/2+420;return Array.from({length:65},(_,i)=>{const angle=i*Math.PI/32,along=Math.cos(angle)*length,side=Math.sin(angle)*1100*(.92+.08*Math.cos(angle*3)),x=middle.x+Math.sin(h)*along+Math.cos(h)*side,y=middle.y-Math.cos(h)*along+Math.sin(h)*side;return {x,y,z:ground(x,y)+12};});}

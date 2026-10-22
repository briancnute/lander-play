import {flightMapFrame} from './helicopter-map.js';
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
export function startRouteIntro(f){f.phase='route-intro';f.routeIntro={elapsed:0,duration:13};}
export function skipRouteIntro(f){const a=f?.routeIntro;if(f?.phase!=='route-intro'||a.elapsed<2||a.skip)return false;a.skip={elapsed:0,from:a.view?{...a.view}:null};return true;}
export function stepRouteIntro(f,dt){const a=f.routeIntro;if(a.skip)a.skip.elapsed+=dt;else a.elapsed=Math.min(a.duration,a.elapsed+dt);if(a.elapsed>=a.duration-1e-8||a.skip?.elapsed>=.8){f.phase='launch';f.routeIntro=null;}}
function look(x,y,eye,target,ground){eye=Math.max(eye,ground(x,y)+80);const distance=Math.hypot(target.x-x,target.y-y);return {x,y,eye,heading:Math.atan2(target.x-x,y-target.y),pitch:Math.atan2(eye-target.z,distance),zoom:1,live:true};}
function mix(a,b,t){const out={...a};for(const k of ['x','y','eye','pitch','zoom'])out[k]=a[k]+(b[k]-a[k])*t;out.heading=a.heading+Math.atan2(Math.sin(b.heading-a.heading),Math.cos(b.heading-a.heading))*t;return out;}
export function frameRouteIntro(camera,f,ground){
 const a=f.routeIntro,c=f.course,h=f.heading,t=a.elapsed,end={...c.finish,z:c.padZ+8},start={x:f.x,y:f.y,z:f.z},middle={x:(c.start.x+c.finish.x)/2,y:(c.start.y+c.finish.y)/2};middle.z=ground(middle.x,middle.y);
 const map=flightMapFrame(c,globalThis.innerWidth??1180,globalThis.innerHeight??800,1),focal=Math.min((globalThis.innerWidth??1180)*.95,(globalThis.innerHeight??800)*.9),overhead={x:map.x,y:map.y,eye:ground(map.x,map.y)+focal*map.scale,heading:0,pitch:Math.PI/2,zoom:1,live:true};
 const wideHeading=h-Math.PI/2,spread=Math.max(1,c.length/5050),wide=look(middle.x-Math.sin(wideHeading)*2350*spread,middle.y+Math.cos(wideHeading)*2350*spread,middle.z+3200*spread,middle,ground);
 const launchHeading=h-.55,launch={x:start.x-Math.sin(launchHeading)*340,y:start.y+Math.cos(launchHeading)*340,eye:Math.max(start.z+78,ground(start.x-Math.sin(launchHeading)*340,start.y+Math.cos(launchHeading)*340)+30),heading:launchHeading,pitch:.14,zoom:1,live:true};
 let view=t<4.8?overhead:t<6.6?mix(overhead,wide,smooth((t-4.8)/1.8)):t<10.5?wide:mix(wide,launch,smooth((t-10.5)/2.5));
 if(a.skip)view=mix(a.skip.from??view,launch,smooth(a.skip.elapsed/.8));
 view.eye=Math.max(view.eye,ground(view.x,view.y)+30);a.view={...view};Object.assign(camera,view,{terrainRange:9000});return camera;
}
export function introValleyOutline(course,ground){const h=course.start.heading,middle={x:(course.start.x+course.finish.x)/2-Math.sin(h)*140,y:(course.start.y+course.finish.y)/2+Math.cos(h)*140},length=course.length/2+420;return Array.from({length:65},(_,i)=>{const angle=i*Math.PI/32,along=Math.cos(angle)*length,side=Math.sin(angle)*1100*(.92+.08*Math.cos(angle*3)),x=middle.x+Math.sin(h)*along+Math.cos(h)*side,y=middle.y-Math.cos(h)*along+Math.sin(h)*side;return {x,y,z:ground(x,y)+12};});}

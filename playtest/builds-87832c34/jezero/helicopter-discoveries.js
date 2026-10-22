// Geographic anchors: the same terrain coordinates used by the tour and landmarks.
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
export const FLIGHT_DISCOVERIES={
 'canyon-run':[{after:4,id:'neretva',name:'Neretva Vallis',fact:'An ancient river carved this valley on its way into Jezero’s lake.',x:-15400,y:-1828,radius:700,distance:2200}],
 'kodiak-approach':[{after:4,id:'kodiak',name:'Kodiak',fact:'This isolated delta remnant preserves layers from Jezero’s ancient lake.',x:5427.2,y:8832,radius:180},{after:7,id:'landing',name:'Octavia E. Butler Landing',fact:'Perseverance touched down here on February 18, 2021.',x:13055.669,y:7905.586,radius:90}],
 'western-frontier':[{after:4,id:'frontier',name:'Western Frontier',fact:'Beyond Jezero’s western rim: an unnamed crater, and new ground to explore.',x:-31400,y:4500,radius:430}]
};
export function pendingDiscovery(f){const count=f.pods.filter(p=>p.resolved||p.passed).length;return FLIGHT_DISCOVERIES[f.course?.id]?.find(p=>p.after===count&&!f.discoveries?.includes(p.id));}
export function startDiscovery(f){const site=pendingDiscovery(f);if(!site)return false;f.discoveries??=[];f.discoveries.push(site.id);f.siteFilm={site,elapsed:0,duration:6.6};f.phase='site-film';f.feedback=null;f.vz=f.sideV=f.bank=0;f.steerCommand=f.verticalCommand=0;return true;}
export function discoveryLetterbox(f){const a=f.siteFilm;return a?Math.min(smooth(a.elapsed/.7),smooth((a.duration-a.elapsed)/.8)):0;}
export function stepDiscovery(f,dt){const a=f.siteFilm;a.elapsed=Math.min(a.duration,a.elapsed+dt);if(a.elapsed>=a.duration-1e-8){f.phase='flying';f.siteFilm=null;} }
export function frameDiscovery(camera,f,ground,reduced=false){
 const a=f.siteFilm;if(!a)return camera;if(!a.cameraStart)a.cameraStart={...camera};
 const site=a.site,t=a.elapsed,blend=smooth((t-.7)/1.1)*smooth((a.duration-.8-t)/1.1),orbit=reduced?0:.16*smooth((t-1.3)/4),heading=a.cameraStart.heading+orbit;
 const distance=site.distance??Math.max(650,site.radius*3),x=site.x-Math.sin(heading)*distance,y=site.y+Math.cos(heading)*distance,z=ground(site.x,site.y)+12;
 const eye=Math.max(z+distance*.6,ground(x,y)+160);
 const shot={x,y,eye,heading,pitch:Math.atan2(eye-z,distance),zoom:1};
 for(const key of ['x','y','eye','heading','pitch','zoom'])camera[key]=(a.cameraStart[key]??1)+((shot[key]??1)-(a.cameraStart[key]??1))*blend;
 camera.eye=Math.max(camera.eye,ground(camera.x,camera.y)+50);camera.live=true;return camera;
}

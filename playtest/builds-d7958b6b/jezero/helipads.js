import {buildJezeroFlightCourse,JEZERO_FLIGHT_ROUTES} from './helicopter-course.js';
import {buildExtremeCourse} from './extreme-course.js';
import {triangle} from '../mars-renderer/geometry.js';
export function helicopterPads(area){
 const courses=JEZERO_FLIGHT_ROUTES.map(r=>buildJezeroFlightCourse(area.guidedTour,area.ground,r.id)),relay=buildExtremeCourse(area.guidedTour).stages[1];
 const points=[...courses.flatMap(c=>{const h=c.start.heading;return [{...c.start,x:c.start.x-Math.sin(h)*280,y:c.start.y+Math.cos(h)*280,name:c.name+' · start',route:c.id,launch:true},{...c.finish,name:c.name+' · landing',route:c.id}];}),...area.heliEnds.map((p,i)=>({...p,name:'Survey flight · '+(i?'finish':'start')})),{...relay.start,name:'Relay flight · start'},{...relay.finish,name:'Relay flight · finish'}];
 return points.filter((p,i)=>points.findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<60)===i).map(p=>({...p,z:area.ground(p.x,p.y)+.4}));
}
export function createHelipadMarkers(gpu,area,{launch}={}){
 const pads=helicopterPads(area);let nearby=null;const button=launch?document.createElement('button'):null;if(button){button.id='ingenuity-pad-launch';button.hidden=true;button.onclick=()=>{if(nearby)launch(nearby.route);};document.body.append(button);}
 const meshes=pads.map(p=>{const v=[],point=(x,y,lift=1.2)=>[x,y,area.ground(x,y)+lift],quad=(a,b,c,d,color)=>{triangle(v,a,b,c,color);triangle(v,a,c,d,color);};
  for(let ring=0;ring<9;ring++)for(let i=0;i<32;i++){const r=Math.min(85,ring*10),r2=Math.min(85,(ring+1)*10),a=i*Math.PI/16,b=(i+1)*Math.PI/16;quad(point(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r),point(p.x+Math.cos(a)*r2,p.y+Math.sin(a)*r2),point(p.x+Math.cos(b)*r2,p.y+Math.sin(b)*r2),point(p.x+Math.cos(b)*r,p.y+Math.sin(b)*r),[.24,.31,.29]);}
  for(const [dx,dy,w,h]of [[-25,-32,6,64],[19,-32,6,64],[-19,-3,38,6]])for(let x=0;x<w;x+=8)for(let y=0;y<h;y+=8){const a=p.x+dx+x,b=p.y+dy+y,x2=p.x+dx+Math.min(w,x+8),y2=p.y+dy+Math.min(h,y+8);quad(point(a,b,2),point(x2,b,2),point(x2,y2,2),point(a,y2,2),[.65,.94,.85]);}return gpu.upload(new Float32Array(v));});
 return {pads,draw(s){if(button){nearby=!s.helicopter&&s.mode==='free'&&!document.querySelector('dialog[open]')&&!document.body.classList.contains('relay-focused')?pads.find(p=>p.launch&&Math.hypot(p.x-s.x,p.y-s.y)<280):null;button.hidden=!nearby;if(nearby)button.textContent='Fly · '+nearby.name.replace(' · start','');}if(s.helicopter)return;gpu.gl.uniform1f(gpu.locations.roverPart,0);gpu.gl.uniform1f(gpu.locations.stuntRoll,0);gpu.gl.uniform1f(gpu.locations.stuntPitch,0);for(const [i,p]of pads.entries())if(Math.hypot(p.x-s.x,p.y-s.y)<2200)gpu.mesh(meshes[i],[0,0,0,100]);}};
}

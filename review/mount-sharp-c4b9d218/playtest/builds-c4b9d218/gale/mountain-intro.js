import {MOUNTAIN_ROUTES} from './mountain-courses.js';
import {skiChase} from './ski-camera.js';
const U=8/3,clamp=t=>Math.max(0,Math.min(1,t));
export const ease=t=>{t=clamp(t);return t*t*(3-2*t);};
const mix=(a,b,t)=>{const out={...a};for(const k of ['x','y','eye','pitch'])out[k]=a[k]+(b[k]-a[k])*t;out.heading=a.heading+Math.atan2(Math.sin(b.heading-a.heading),Math.cos(b.heading-a.heading))*t;return out;};
export function mountainMapFrame(course,w,h,progress){
 const b=course.mapBounds,route={x:(b.minX+b.width)/2,y:(b.minY+b.maxY)/2,scale:Math.max((b.width-b.minX)/(w*.78),(b.maxY-b.minY)/(h*.7))},full={x:15000*U,y:24000*U,scale:Math.max(66000*U/(w*.92),68000*U/(h*.82))},t=ease(progress);
 return {x:full.x+(route.x-full.x)*t,y:full.y+(route.y-full.y)*t,scale:Math.exp(Math.log(full.scale)*(1-t)+Math.log(route.scale)*t)};
}
export function createMountainIntro(api,course){
 const routes=course.prototype?[MOUNTAIN_ROUTES[0],{variant:'corridor-a',name:'Prototype A',path:course.route.map(p=>[p.x,p.y])}]:MOUNTAIN_ROUTES;
 const canvas=document.createElement('canvas');canvas.id='mountain-intro-map';canvas.setAttribute('aria-label',course.prototype?'Mount Sharp, Murray, prototype A and recorded expedition references':'Mount Sharp and three separate ski routes');
 const caption=document.createElement('div');caption.id='mountain-intro-caption';
 const skip=document.createElement('button');skip.id='mountain-intro-skip';skip.textContent='Skip fly-in';
 document.body.append(canvas,caption,skip);
 const relief=new Image();relief.src=new URL('./assets/summit-relief.png',import.meta.url).href;
 const fine=new Image();fine.src=new URL('./assets/relief.png',import.meta.url).href;
 let elapsed=0,active=false,skipping=null,view=null;
 const hide=()=>{canvas.hidden=caption.hidden=skip.hidden=true;document.body.classList.remove('mountain-intro');};hide();
 const launchView=()=>{const s=api.state,cam={h:s.heading};const p=skiChase(cam,s,0,s.z+6,api.area.cameraSurface,api.area.ground);return {...p,heading:s.heading,zoom:1,live:true};};
 skip.onclick=()=>{if(elapsed>=2&&!api.paused)skipping={elapsed:0,from:view};};
 function start(){elapsed=0;skipping=null;active=true;document.body.classList.add('mountain-intro');canvas.hidden=caption.hidden=false;}
 function step(dt){if(!active)return false;elapsed+=dt;if(skipping)skipping.elapsed+=dt;if(elapsed>=15||skipping?.elapsed>=.8){active=false;api.gpu.photoView=null;api.clearInput?.();api.gpu.reset(api.state);hide();return true;}return false;}
 function frame(){if(!active)return;const w=innerWidth,h=innerHeight,focal=Math.min(w*.95,h*.9),f=mountainMapFrame(course,w,h,1),z=Math.max(...course.route.filter((_,i)=>i%24===0).map(p=>api.area.ground(p.x,p.y)));
 const overhead=(x,y,z,scale)=>({x,y:y-.12*h*scale,eye:z+focal*scale,heading:0,pitch:Math.PI/2,zoom:1,live:true});
 const far=overhead(f.x,f.y,z,f.scale),near=overhead(course.top.x,course.top.y,course.height(0),1400/focal),pad=overhead(course.top.x,course.top.y,course.height(0),650/focal),launch=launchView();
 view=elapsed<7.8?far:elapsed<11.2?mix(far,near,ease((elapsed-7.8)/3.4)):elapsed<13.5?mix(near,pad,ease((elapsed-11.2)/2.3)):mix(pad,launch,ease((elapsed-13.5)/1.5));
 if(skipping)view=mix(skipping.from??view,launch,ease(skipping.elapsed/.8));
 view.eye=Math.max(view.eye,api.area.ground(view.x,view.y)+14);api.gpu.photoView={...view,terrainRange:22000};
 }
 function draw(){if(!active)return;canvas.hidden=elapsed>=9.2||!!skipping;canvas.style.opacity=String(elapsed<5.4?clamp((5.4-elapsed)/.8):clamp((9.2-elapsed)/.8));skip.hidden=elapsed<2||api.paused;caption.hidden=api.paused;caption.innerHTML=elapsed<2?'<small>MARS · GALE CRATER</small><strong>MOUNT SHARP</strong>':`<small>LOWER MOUNT SHARP · ${course.prototype?course.gates.length+' GATES · PROTOTYPE':course.airborneFinish?'14 GATES + FINAL JUMP':'14 FLOWING GATES'}</small><strong>${course.title.split(' · ')[0].toUpperCase()}</strong>`;caption.style.opacity=String(1-ease((elapsed-10)/2));
 if(canvas.hidden)return;canvas.width=innerWidth;canvas.height=innerHeight;const w=canvas.width,h=canvas.height,ctx=canvas.getContext('2d'),f=mountainMapFrame(course,w,h,(elapsed-1.4)/3.2),point=([x,y])=>({x:w/2+(x-f.x)/f.scale,y:h/2+(y-f.y)/f.scale});
 if(elapsed>=5.4){ctx.clearRect(0,0,w,h);ctx.strokeStyle='#bce9da';ctx.lineWidth=2;ctx.setLineDash([7,6]);ctx.beginPath();course.route.filter((_,i)=>i%8===0).forEach((p,i)=>{const q=api.gpu.project(p.x,p.y,api.area.ground(p.x,p.y)+3);if(q.depth>5)i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();return;}
 ctx.fillStyle='#382b26';ctx.fillRect(0,0,w,h);const img=(image,b)=>{if(!image.complete||!image.naturalWidth)return;const p=point([b[0]*U,-b[3]*U]);ctx.drawImage(image,p.x,p.y,(b[1]-b[0])*U/f.scale,(b[3]-b[2])*U/f.scale);};img(relief,[-18000,48000,-58000,10000]);if(elapsed>1.4){ctx.save();ctx.globalAlpha=ease((elapsed-1.4)/1.2);const c=api.area.info.crop,a=point([c.eastMin*U,-c.northMax*U]),b=point([c.eastMax*U,-c.northMin*U]);ctx.beginPath();ctx.rect(a.x,a.y,b.x-a.x,b.y-a.y);ctx.clip();img(fine,api.area.info.context.bounds);ctx.restore();}
 if(course.prototype){
  const line=(points,color,dash=[])=>{ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.setLineDash(dash);ctx.beginPath();points.forEach((p,i)=>{const q=point([p.x,p.y]);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();};
  for(const leg of api.area.guidedTour.legs)line(leg.points,'#77f4c4',[5,3]);
  for(const segment of api.area.segments)line(segment.points,'#ffcc59');
  ctx.setLineDash([]);ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillStyle='#ffcc59';ctx.fillText('Gold: recorded Curiosity path',18,Math.max(48,h*.10));ctx.fillStyle='#77f4c4';ctx.fillText('Mint dashed: expedition route',18,Math.max(48,h*.10)+18);ctx.fillStyle='#fff3db';ctx.fillText('N ↑',w-110,Math.max(48,h*.10));
 }
 for(const route of routes){const selected=course.activity==='ski-'+route.variant;ctx.strokeStyle=selected?'#fff0c2':'#91d3c0';ctx.lineWidth=selected?3:1.5;ctx.beginPath();route.path.forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();const q=point(route.path[0]);ctx.fillStyle=selected?'#fff0c2':'#bce9da';ctx.beginPath();ctx.arc(q.x,q.y,4,0,Math.PI*2);ctx.fill();if(elapsed<3.3){ctx.font='600 12px system-ui';ctx.textAlign='left';ctx.fillText(route.name,q.x+10,q.y+(route.variant==='torridon'?18:-10));}}
 }
 return {start,step,frame,draw,get active(){return active;},get elapsed(){return elapsed;}};
}

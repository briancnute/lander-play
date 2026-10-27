import {raceSurface} from '../mars-renderer/race-surface.js';
import {drivingBody,drivingWheel} from '../mars-renderer/driving-models.js';
import {wheelPivots} from '../mars-renderer/geometry.js';
export function createFreeSkiGuide(api,course,jump){
 const {gpu,area}=api,road={...raceSurface(gpu.gl,course.route,160,false),style:1};
 const rover=gpu.upload(drivingBody('curiosity')),wheel=gpu.upload(drivingWheel('curiosity')),site=area.stops[10];
 const cue=document.createElement('div');cue.id='free-ski-cue';cue.hidden=true;cue.setAttribute('role','status');document.body.append(cue);
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./free-ski.css',import.meta.url);document.head.append(link);
 const section=document.createElement('section');section.id='free-ski-chapters';section.innerHTML='<h3>Summit to basin</h3><p>One open descent · no timer or required gates. Jump to a chapter below.</p><p>Follow Mount Sharp down through Curiosity’s expedition region to the landing basin.</p>';for(const chapter of course.chapters){const button=document.createElement('button');button.textContent=chapter.name;button.onclick=()=>jump(chapter.s);section.append(button);}document.querySelector('.map-side').prepend(section);
 const recover=document.createElement('button');recover.id='free-ski-recover';recover.textContent='Return to descent';document.querySelector('#settings').append(recover);
 let current=null,arrived=false,arrivalUntil=0;
 recover.onclick=()=>jump(current?.safe?.s??0);
 return {road,step(run,state){if(current!==run){current=run;arrived=false;arrivalUntil=0;}if(!arrived&&!state.air&&Math.hypot(state.x-course.base.x,state.y-course.base.y)<240){arrived=true;arrivalUntil=run.time+7;}},update(run,state){
  cue.hidden=true;if(api.paused||!run)return;
  if(arrivalUntil>run.time){cue.hidden=false;cue.textContent='BASIN REACHED · KEEP EXPLORING';return;}
  const forward=course.heading(run.s),wrong=Math.cos(state.heading-forward)<-.25,off=Math.abs(run.u)>350;
  if((off||wrong)&&!arrived){const target=course.point(off?(run.safe?.s??run.s):Math.min(course.length,run.s+350)),angle=Math.atan2(target.x-state.x,state.y-target.y)-state.heading;cue.hidden=false;cue.textContent=(Math.cos(angle)<-.35?'↶ ':Math.sin(angle)<0?'← ':'→ ')+(off?'DESCENT':'DOWNHILL');}
 },draw(state){if(Math.hypot(state.x-site.x,state.y-site.y)>1200)return;const z=area.ground(site.x,site.y);gpu.mesh(rover,[site.x,site.y,z,Math.PI]);for(const [x,y]of wheelPivots){gpu.gl.uniform4f(gpu.locations.wheel,x,y,0,0);gpu.mesh(wheel,[site.x,site.y,z,Math.PI]);}gpu.gl.uniform4f(gpu.locations.wheel,0,0,0,0);
  const p=gpu.project(site.x,site.y,z+25),ctx=document.querySelector('#labels').getContext('2d');if(p.depth>1&&p.x>30&&p.x<ctx.canvas.clientWidth-30&&p.y>70&&p.y<ctx.canvas.clientHeight-90){ctx.save();ctx.textAlign='center';ctx.font='600 12px system-ui';ctx.lineWidth=3;ctx.strokeStyle='#172326';ctx.strokeText('CURIOSITY · SOL 5021 SNAPSHOT',p.x,p.y);ctx.fillStyle='#ffe1a0';ctx.fillText('CURIOSITY · SOL 5021 SNAPSHOT',p.x,p.y);ctx.restore();}
 },map(ctx,point){ctx.strokeStyle='#a7efda';ctx.lineWidth=2.5;ctx.beginPath();course.route.forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();for(const chapter of course.chapters){const p=point(chapter);ctx.fillStyle='#c9f2dd';ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.fillText(chapter.name,p.x+8,p.y+4);} },get arrived(){return arrived;}};
}

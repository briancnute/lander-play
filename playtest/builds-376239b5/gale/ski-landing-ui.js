import {landingCue} from './ski-landing.js';
export function createLandingUI(gpu){
 const el=document.createElement('div');el.id='ski-landing';el.hidden=true;el.innerHTML='<svg viewBox="0 0 120 120" aria-hidden="true"><g class="land-target-group"><circle class="land-target" cx="60" cy="60" r="34"/><circle class="land-center" cx="60" cy="60" r="34"/></g><circle class="land-ring" cx="60" cy="60" r="56"/></svg><span></span>';el.setAttribute('role','status');document.body.append(el);
 const ring=el.querySelector('.land-ring'),label=el.querySelector('span'),canvas=document.createElement('canvas');canvas.id='ski-landing-dust';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);const ctx=canvas.getContext('2d');
 return {draw(r,state,visible){
  const w=innerWidth,h=innerHeight;if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}ctx.clearRect(0,0,w,h);
  const l=r?.landing,age=l?r.time-l.at:99,b=gpu.roverScreenBounds;
  const cue=landingCue(r);
  el.hidden=!visible||!b||!cue.visible;
  if(!el.hidden){
   el.style.left=((b.left+b.right)/2)+'px';el.style.top=((b.top+b.bottom)/2)+'px';
   el.querySelector('.land-center').style.opacity=r.landingAttempt?'0':'1';
   ring.style.strokeWidth=r.landingAttempt?'1.5':'1.2';ring.setAttribute('r',String(cue.radius));ring.style.stroke=cue.color;ring.style.opacity=cue.cursorOpacity;
   el.querySelector('.land-target-group').style.opacity=cue.targetOpacity;
   label.textContent=cue.percent;label.style.color=cue.color;label.style.opacity=cue.labelOpacity;
  }
  if(!visible||!l||!gpu.project)return;
  const stopping=!!r.finishStop&&r.finishStop.age<r.finishStop.duration,rough=1-l.quality,life=stopping?1.25:.5+rough*.8;
  if(!stopping&&(age<0||age>life))return;
  const t=stopping?r.finishStop.age:age,origin=stopping?state:{x:l.x,y:l.y},heading=stopping?state.heading:l.heading;
  for(let i=0;i<8+Math.floor(rough*12);i++){const side=i%2?1:-1,spread=5+t*(12+rough*20),back=stopping?12+i*2:Math.sin(i*5.3)*t*15;const x=origin.x+Math.cos(heading)*side*spread-Math.sin(heading)*back,y=origin.y+Math.sin(heading)*side*spread+Math.cos(heading)*back,z=gpu.height(x,y)+1+(i%3)*t*3,q=gpu.project(x,y,z);if(q.depth<1)continue;const radius=Math.min(22,Math.max(3,900/q.depth))*(1+t),alpha=(stopping?.2:.30)*(1-Math.min(1,(stopping?t/r.finishStop.duration:age/life)));const g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,radius);g.addColorStop(0,`rgba(198,149,106,${alpha})`);g.addColorStop(1,'rgba(198,149,106,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(q.x,q.y,radius,0,Math.PI*2);ctx.fill();}
 }};
}

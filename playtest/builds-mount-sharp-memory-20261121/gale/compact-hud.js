import {nextTourGate} from '../shared/tour-gates.js';
export function mountGaleHUD({mini,pause,getState,getTarget,getTour,getStops,paused}){
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('./compact-ui.css',import.meta.url).href;document.head.append(css);
 document.body.classList.add('gale-compact');
 const hud=document.createElement('div');hud.id='gale-hud';hud.innerHTML='<strong>Curiosity</strong><span></span>';
 const nav=document.createElement('nav');nav.id='gale-nav';nav.setAttribute('aria-label','Exploration');
 const map=document.createElement('button');map.id='gale-map-toggle';map.textContent='Map';map.setAttribute('aria-controls',mini.id);map.setAttribute('aria-expanded','false');
 nav.append(map,pause);const cue=document.createElement('div');cue.id='gale-next';cue.innerHTML='<span aria-hidden="true">↑</span>';cue.hidden=true;document.body.append(hud,nav,cue);
 mini.classList.add('gale-mini');mini.hidden=true;mini.setAttribute('aria-label','Open paused map');
 const toggleMini=()=>{mini.hidden=!mini.hidden;map.setAttribute('aria-expanded',String(!mini.hidden));};map.onclick=toggleMini;
 return {toggleMini,update(){
  const state=getState(),tour=getTour(),stops=getStops();if(!state||!stops.length)return;
  const nearest=stops.reduce((a,b)=>Math.hypot(b.x-state.x,b.y-state.y)<Math.hypot(a.x-state.x,a.y-state.y)?b:a);
  hud.querySelector('span').textContent=nearest.name.replace(/ chapter$/, '');
  const index=tour?nextTourGate(tour.tour,tour.run):-1;
  const target=tour?(!tour.roaming&&tour.run.pending===null&&index>=0?tour.tour.checkpoints[index]:null):getTarget();
  cue.hidden=paused()||!target;
  if(target){const angle=Math.atan2(target.x-state.x,state.y-target.y)-state.heading,turn=Math.atan2(Math.sin(angle),Math.cos(angle));cue.firstChild.style.transform=`rotate(${turn}rad)`;cue.style.left=Math.abs(turn)>2.2||Math.abs(turn)<.35?'50%':turn<0?'22px':'calc(100% - 22px)';cue.style.top=Math.abs(turn)>2.2?'calc(100% - 125px)':Math.abs(turn)<.35?'72px':'45%';cue.setAttribute('aria-label','Next: '+target.name);}
 }};
}

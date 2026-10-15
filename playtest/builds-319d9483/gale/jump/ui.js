import {drawRail,icon,grade} from './rail-view.js';
import {jumpCue} from './run.js';
import {trickFor} from './tricks.js';
export function createJumpUI(){
 const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./ui.css',import.meta.url).href;document.head.append(style);
 const el=document.createElement('div');el.id='ski-jump';el.hidden=true;
 el.innerHTML='<div class="jump-cue" hidden><small></small><div class="jump-symbol"></div><svg viewBox="0 0 180 180"><circle class="jump-band" cx="90" cy="90" r="34"/><circle class="jump-center" cx="90" cy="90" r="34"/><circle class="jump-ring" cx="90" cy="90" r="84"/></svg><b></b></div><div class="jump-rail" hidden><div class="jump-notes"></div><div class="jump-target"><span class="target-column"></span></div><small class="jump-hit-label"></small></div><div class="jump-move" hidden></div>';
 document.body.append(el);
 const cue=el.querySelector('.jump-cue'),rail=el.querySelector('.jump-rail'),move=el.querySelector('.jump-move');
 return {draw(r,visible){
  const j=r?.jump;el.hidden=!visible||!j;if(el.hidden)return;
  const q=jumpCue(j);cue.hidden=!q;
  if(q){cue.querySelector('small').textContent=q.kind;cue.querySelector('.jump-symbol').innerHTML=icon(q.action);cue.querySelector('.jump-ring').setAttribute('r',q.radius);cue.querySelector('.jump-band').style.strokeWidth=String(10/q.difficulty);const b=cue.querySelector('b');b.textContent=q.score===undefined?'':grade(q.score)+' · '+q.score;}
  rail.hidden=!j.rail||j.time<j.config.railStart||j.time>=j.config.sequenceEnd;
  if(!rail.hidden)drawRail(rail,rail.querySelector('.jump-notes'),rail.querySelector('.jump-target'),rail.querySelector('.jump-hit-label'),j.rail,j.time,Math.min(220,rail.clientWidth/2.1),'left','column');
  move.hidden=j.execution===null||j.time<j.config.trickStart||j.time>j.config.trickStart+1.4;
  if(!move.hidden)move.textContent=trickFor(j.index,j.execution).name;
 }};
}

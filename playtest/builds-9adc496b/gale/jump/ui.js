import {drawRail,icon,grade} from './rail-view.js';
import {jumpCue} from './run.js';
import {trickFor} from './tricks.js';
export function createJumpUI(){
 const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./ui.css',import.meta.url).href;document.head.append(style);
 const el=document.createElement('div');el.id='ski-jump';el.hidden=true;
 el.innerHTML='<div class="jump-cue" hidden><small></small><div class="jump-symbol"></div><svg viewBox="0 0 180 180"><circle class="jump-band" cx="90" cy="90" r="34"/><circle class="jump-center" cx="90" cy="90" r="34"/><circle class="jump-ring" cx="90" cy="90" r="84"/></svg><b></b></div><div class="jump-rail" hidden><div class="jump-notes"></div><div class="jump-target"><span class="target-column"></span></div><small class="jump-hit-label"></small></div><div class="jump-move" hidden></div><div class="jump-result" role="status" hidden><small></small><strong></strong></div>';
 document.body.append(el);
 const cue=el.querySelector('.jump-cue'),rail=el.querySelector('.jump-rail'),move=el.querySelector('.jump-move'),result=el.querySelector('.jump-result');
 return {draw(r,visible){
  const original=r?.jump;el.hidden=!visible||!original;if(el.hidden)return;const j={...original,time:original.time+(r.finishStop?.age??0)};
  const resultDuration=j.config.feedback,q=jumpCue(j);cue.hidden=!q||q.score!==undefined;cue.dataset.kind=q?.kind??'';
  if(q){cue.querySelector('small').textContent=q.kind;cue.querySelector('.jump-symbol').innerHTML=icon(q.action);cue.querySelector('.jump-ring').setAttribute('r',q.radius);cue.querySelector('.jump-band').style.strokeWidth=String(10/q.difficulty);const b=cue.querySelector('b');b.textContent=q.score===undefined?'':grade(q.score)+' · '+q.score;}
  rail.hidden=!j.rail||j.time<j.config.railStart||j.time>=j.config.sequenceEnd;
  if(!rail.hidden){const size=parseFloat(getComputedStyle(rail).getPropertyValue('--icon-size')),speed=(rail.clientWidth+size/2-112)/j.config.railTravel;drawRail(rail,rail.querySelector('.jump-notes'),rail.querySelector('.jump-target'),rail.querySelector('.jump-hit-label'),j.rail,j.time,speed,'left','column',112);}
  const events=[{kind:'TAKEOFF',at:j.takeoff?.at,score:j.takeoff?.score},{kind:'TRICK',at:j.config.sequenceEnd,score:j.execution},{kind:'LANDING',at:j.landing?.at,score:j.landing?.score}];
  const event=events.findLast(e=>e.score!=null&&e.at!=null&&j.time>=e.at&&j.time<e.at+resultDuration);
  result.hidden=!event;
  if(event){const age=(j.time-event.at)/resultDuration,g=grade(event.score);result.dataset.kind=event.kind;result.dataset.grade=g;const label=result.querySelector('small'),value=result.querySelector('strong');if(label.textContent!==event.kind)label.textContent=event.kind;if(value.textContent!==g.toUpperCase())value.textContent=g.toUpperCase();result.style.opacity=String(Math.min(1,(1-age)*4));result.style.setProperty('--pop-scale',String(1+.22*Math.exp(-age*12)));}
  move.hidden=j.execution===null||j.time<j.config.trickStart||j.time>j.config.trickStart+1.4;
  if(!move.hidden){const name=trickFor(j.index,j.execution).name;if(move.textContent!==name)move.textContent=name;const age=(j.time-j.config.trickStart)/1.4;move.style.opacity=String(Math.min(1,(1-age)*5));move.style.scale=String(1+.12*Math.exp(-age*15));}
 }};
}

import {drawRail,icon,grade,touchLabels} from './rail-view.js';
import {jumpCue} from './run.js';
import {trickFor} from './tricks.js';
export function createJumpUI(){
 const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./ui.css',import.meta.url).href;document.head.append(style);
 const el=document.createElement('div');el.id='ski-jump';el.hidden=true;
 el.innerHTML='<div class="jump-cue" hidden><small></small><div class="jump-symbol"></div><svg viewBox="0 0 180 180"><circle class="jump-band" cx="90" cy="90" r="34"/><circle class="jump-center" cx="90" cy="90" r="34"/><circle class="jump-ring" cx="90" cy="90" r="84"/></svg><b></b></div><div class="jump-rail" hidden><div class="jump-notes"></div><div class="jump-target"><span class="target-column"></span></div><small class="jump-hit-label"></small></div><div class="jump-move" hidden></div><div class="jump-result" role="status" hidden><small></small><strong></strong></div>';
 document.body.append(el);
 const cue=el.querySelector('.jump-cue'),rail=el.querySelector('.jump-rail'),move=el.querySelector('.jump-move'),result=el.querySelector('.jump-result');
 const cueLabel=cue.querySelector('small'),symbol=cue.querySelector('.jump-symbol'),ring=cue.querySelector('.jump-ring'),band=cue.querySelector('.jump-band'),cueText=cue.querySelector('b'),notes=rail.querySelector('.jump-notes'),target=rail.querySelector('.jump-target'),hitLabel=rail.querySelector('.jump-hit-label');
 let metrics=null,symbolKey='';const measure=()=>{const css=getComputedStyle(rail);metrics={width:rail.clientWidth,size:parseFloat(css.getPropertyValue('--icon-size')),anchor:parseFloat(css.getPropertyValue('--target-offset'))||64};};new ResizeObserver(()=>{metrics=null;}).observe(rail);
 return {draw(r,visible){
  const original=r?.jump;el.hidden=!visible||!original;if(el.hidden)return;const j={...original,time:original.time+(r.finishStop?.age??0)};
  const resultDuration=j.config.feedback,q=jumpCue(j);cue.hidden=!q||q.score!==undefined;cue.dataset.kind=q?.kind??'';
  if(q){if(cueLabel.textContent!==q.kind)cueLabel.textContent=q.kind;const key=q.action+':'+touchLabels();if(symbolKey!==key){symbol.innerHTML=icon(q.action);symbolKey=key;}ring.setAttribute('r',q.radius);band.style.strokeWidth=String(10/q.difficulty);cueText.textContent=q.score===undefined?'':grade(q.score)+' · '+q.score;}
  rail.hidden=!j.rail||j.time<j.config.railStart||j.time>=j.config.sequenceEnd;
  if(!rail.hidden){if(!metrics||!metrics.width)measure();const {width,size,anchor}=metrics,speed=(width+size/2-anchor)/j.config.railTravel;drawRail(rail,notes,target,hitLabel,j.rail,j.time,speed,'left','column',anchor,width);}
  const events=[{kind:'TAKEOFF',at:j.takeoff?.at,score:j.takeoff?.score},{kind:'TRICK',at:j.config.sequenceEnd,score:j.execution},{kind:'LANDING',at:j.landing?.at,score:j.landing?.score}];
  const event=events.findLast(e=>e.score!=null&&e.at!=null&&j.time>=e.at&&j.time<e.at+resultDuration);
  result.hidden=!event;
  if(event){const age=(j.time-event.at)/resultDuration,g=grade(event.score);result.dataset.kind=event.kind;result.dataset.grade=g;const label=result.querySelector('small'),value=result.querySelector('strong');if(label.textContent!==event.kind)label.textContent=event.kind;if(value.textContent!==g.toUpperCase())value.textContent=g.toUpperCase();result.style.opacity=String(Math.min(1,(1-age)*4));result.style.setProperty('--pop-scale',String(1+.22*Math.exp(-age*12)));}
  move.hidden=j.execution===null||j.time<j.config.trickStart||j.time>j.config.trickStart+1.4;
  if(!move.hidden){const name=trickFor(j.index,j.execution).name;if(move.textContent!==name)move.textContent=name;const age=(j.time-j.config.trickStart)/1.4;move.style.opacity=String(Math.min(1,(1-age)*5));move.style.scale=String(1+.12*Math.exp(-age*15));}
 }};
}

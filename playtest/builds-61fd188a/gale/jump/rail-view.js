const paths={left:'M0 32 L30 4 L30 21 L64 21 L64 43 L30 43 L30 60 Z',right:'M64 32 L34 4 L34 21 L0 21 L0 43 L34 43 L34 60 Z'};
export function touchLabels(){const mode=document.getElementById('cue-labels')?.value??'auto';return mode==='touch'||mode==='auto'&&matchMedia('(pointer: coarse)').matches;}
export function icon(action){const button=action==='thrust'||action==='brake'||action==='takeoff',secondary=action!=='thrust',touch=touchLabels();
 const text=button?(touch?(secondary?'':'THRUST'):(secondary?'SHIFT':'SPACE')):'';
 return `<svg class="input-icon ${button?(secondary?'secondary-button':'thrust-button'):'direction-button'}" viewBox="0 0 64 64" aria-hidden="true">${button?`<circle cx="32" cy="32" r="32"/><text x="32" y="33" text-anchor="middle" dominant-baseline="middle">${text}</text>`:`<path d="${paths[action]}"/>`}</svg>`;
}
export const grade=score=>score>=90?'Perfect':score>=80?'Great':score>=60?'Good':'Basic';
const colors={Perfect:'#ffe7a0',Great:'#9cefff',Good:'#a9efbd',Basic:'#e6dfce',Wrong:'#ff897b'};
export function endTime(run,speed){return Math.max(...run.notes.map(n=>n.result&&n.result.label!=='Miss'?(n.result.at??n.at)+.65:n.at+Math.max(run.window,32/speed)+.3));}
export function drawRail(lane,notes,target,label,run,time,speed,direction,mode='shape',targetOffset){
 const width=lane.clientWidth,distance=targetOffset??Math.max(64,speed*run.window+32),anchor=direction==='left'?distance:width-distance,sign=direction==='left'?1:-1;
 const fixed=mode==='fixed',gap=(width-112)/Math.max(1,run.notes.length-1),center=i=>run.notes.length===1?width/2:56+i*gap;
 const bar=run.notes.length===1?center(0)+(time-run.notes[0].at)*80:center(0)+(time-run.notes[0].at)*gap/run.spacing;
 lane.dataset.mode=mode;
 target.style.left=label.style.left=(fixed?Math.max(8,Math.min(width-8,bar)):anchor)+'px';
 label.textContent=fixed?'TIMING BAR':'HIT HERE';
 if(fixed)label.style.left=Math.max(48,Math.min(width-48,bar))+'px';

 const active=run.notes.find(n=>n.result===null),action=active?.action??run.notes.at(-1).action;
 target.innerHTML=mode==='shape'?icon(action):'<span class=target-column></span>';target.setAttribute('aria-label',`Hit ${action}`);
 notes.innerHTML=run.notes.map((n,i)=>{
  const result=n.result,consumed=result&&result.label!=='Miss',tier=result?.label==='Wrong input'?'Wrong':grade(result?.score??0);
  if(consumed){const age=time-(result.at??n.at),u=Math.max(0,age/.32);if(u>=1)return '';
   const strength={Basic:.02,Good:.04,Great:.06,Perfect:.08,Wrong:.02}[tier],opacity=1-u;
   return `<div class="rail-burst" data-grade="${tier}" style="left:${fixed?center(i):anchor}px;opacity:${opacity};color:${colors[tier]}"><div class="burst-icon" style="transform:scale(${1+u*strength})">${icon(n.action)}</div><b>${tier.toUpperCase()}</b></div>`;
  }
  const exit=n.at+(fixed?run.window:Math.max(run.window,32/speed)),fade=result?.label==='Miss'?Math.max(0,(time-exit)/.28):0;
  if(fade>=1)return '';
  let x=fixed?center(i):anchor+sign*(n.at-time)*speed;
  if(fade>0)x=(fixed?center(i):direction==='left'?32:width-32)+Math.sin(fade*34)*1.5*(1-fade);
  return `<div data-action="${n.action}" class="rail-note ${fade>0?'rail-missed':''}" style="transform:translate(${x}px,-50%) translateX(-50%);opacity:${1-fade}">${icon(n.action)}</div>`;
 }).join('');
}

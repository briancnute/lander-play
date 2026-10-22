const paths={left:'M0 32 L30 4 L30 21 L64 21 L64 43 L30 43 L30 60 Z',right:'M64 32 L34 4 L34 21 L0 21 L0 43 L34 43 L34 60 Z'};
export function touchLabels(){const mode=document.getElementById('cue-labels')?.value??'auto';return mode==='touch'||mode==='auto'&&matchMedia('(pointer: coarse)').matches;}
export function icon(action){const button=action==='thrust'||action==='brake'||action==='takeoff',secondary=action!=='thrust',touch=touchLabels();
 const text=button?(touch?(secondary?'':'THRUST'):(secondary?'SHIFT':'SPACE')):'';
 return `<svg class="input-icon ${button?(secondary?'secondary-button':'thrust-button'):'direction-button'}" viewBox="0 0 64 64" aria-hidden="true">${button?`<circle cx="32" cy="32" r="32"/><text x="32" y="33" text-anchor="middle" dominant-baseline="middle">${text}</text>`:`<path d="${paths[action]}"/>`}</svg>`;
}
export const grade=score=>score>=90?'Perfect':score>=80?'Great':score>=60?'Good':'Basic';
export const feedbackMarks={Perfect:'★',Great:'◆',Good:'✓',Basic:'●',Wrong:'×',Miss:'×'};
const colors={Perfect:'#ffe16a',Great:'#57d9ff',Good:'#73efad',Basic:'#ffba69',Wrong:'#ff6868',Miss:'#ff6868'};
const views=new WeakMap();
export function endTime(run,speed){return Math.max(...run.notes.map(n=>n.result&&n.result.label!=='Miss'?(n.result.at??n.at)+.65:n.at+Math.max(run.window,32/speed)+.3));}
export function drawRail(lane,notes,target,label,run,time,speed,direction,mode='shape',targetOffset,width=lane.clientWidth){
 const distance=targetOffset??Math.max(64,speed*run.window+32),anchor=direction==='left'?distance:width-distance,sign=direction==='left'?1:-1;
 const fixed=mode==='fixed',gap=(width-112)/Math.max(1,run.notes.length-1),center=i=>run.notes.length===1?width/2:56+i*gap;
 const bar=run.notes.length===1?center(0)+(time-run.notes[0].at)*80:center(0)+(time-run.notes[0].at)*gap/run.spacing;
 const touch=touchLabels();let view=views.get(notes);
 if(!view||view.run!==run||view.touch!==touch){
  notes.replaceChildren();view={run,touch,items:run.notes.map(n=>{const node=document.createElement('div');node.className='rail-note';node.dataset.action=n.action;node.innerHTML=icon(n.action)+'<span class="hit-mark"></span><b></b>';notes.append(node);return {node,mark:node.querySelector('.hit-mark'),text:node.querySelector('b'),result:null};})};views.set(notes,view);
 }
 lane.dataset.mode=mode;
 target.style.left=label.style.left=(fixed?Math.max(8,Math.min(width-8,bar)):anchor)+'px';
 const caption=fixed?'TIMING BAR':'HIT HERE';if(label.textContent!==caption)label.textContent=caption;
 label.hidden=run.notes.some(n=>n.result&&n.result.label!=='Miss'&&time-(n.result.at??n.at)<.38);
 if(fixed)label.style.left=Math.max(48,Math.min(width-48,bar))+'px';
 const action=run.notes.find(n=>n.result===null)?.action??run.notes.at(-1).action,key=mode+':'+touch+':'+(mode==='shape'?action:'column');
 if(view.target!==key){target.innerHTML=mode==='shape'?icon(action):'<span class="target-column"></span>';view.target=key;}
 if(view.action!==action){target.setAttribute('aria-label',`Hit ${action}`);view.action=action;}
 run.notes.forEach((n,i)=>{
  const {node,mark,text}=view.items[i],result=n.result,consumed=result&&result.label!=='Miss',tier=result?.label==='Wrong input'?'Wrong':result?.label==='Miss'?'Miss':grade(result?.score??0);
  if(view.items[i].result!==result){view.items[i].result=result;node.dataset.grade=tier;node.style.color=colors[tier];mark.textContent=feedbackMarks[tier];text.textContent=tier.toUpperCase();}
  if(consumed){const u=Math.max(0,(time-(result.at??n.at))/.38);node.hidden=u>=1;if(node.hidden)return;node.className='rail-burst';node.style.opacity=String(1-u*u);node.style.transform=`translate3d(${fixed?center(i):anchor}px,-50%,0) translateX(-50%) scale(${1+.18*u})`;return;}
  const exit=n.at+(fixed?run.window:Math.max(run.window,(direction==='left'?anchor-32:width-anchor-32)/speed)),fade=result?.label==='Miss'?Math.max(0,(time-exit)/.28):0;
  node.hidden=fade>=1;if(node.hidden)return;
  let x=fixed?center(i):anchor+sign*(n.at-time)*speed;
  if(fade>0)x=(fixed?center(i):direction==='left'?32:width-32)+Math.sin(fade*34)*2*(1-fade);
  node.className='rail-note'+(fade>0?' rail-missed':'');node.style.transform=`translate3d(${x}px,-50%,0) translateX(-50%)`;node.style.opacity=String(1-fade);
 });
}

export function createGateProgress(container,count){
 const dots=Array.from({length:count},(_,i)=>{const dot=document.createElement('span');dot.className='ski-gate-dot';dot.setAttribute('role','img');container.append(dot);return dot;});
 return {update(events=[]){for(let i=0;i<dots.length;i++){const event=events.find(e=>e.index===i),state=event?(event.hit?'hit':'miss'):'upcoming',dot=dots[i];if(dot.dataset.state===state)continue;dot.dataset.state=state;dot.textContent=event?(event.hit?'✓':'×'):'';dot.setAttribute('aria-label',`Gate ${i+1}: ${state==='hit'?'passed':state==='miss'?'missed':'upcoming'}`);}}};
}

import {settings,minimumAir} from './config.js';
const key='astra.gale.slalomTuning.v1';
export function createJumpTuner(api,tryJump,close=()=>api.openDialog('#settings')){
 let draft=settings(),selected=0;
 try{const saved=JSON.parse(localStorage.getItem(key));if(saved){draft=settings(saved.settings);selected=Math.max(0,Math.min(3,Math.round(Number(saved.selected)||0)));}}catch{}
 const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./tuner.css',import.meta.url).href;document.head.append(style);
 const button=document.createElement('button');button.id='jump-tuning';button.textContent='Jump tuning';document.querySelector('#settings').append(button);
 const quick=document.createElement('button');quick.id='jump-tune-quick';quick.textContent='Tune';quick.hidden=true;document.body.append(quick);
 const dialog=document.createElement('dialog');dialog.id='jump-tuner';dialog.setAttribute('aria-labelledby','jump-tuner-title');
 dialog.innerHTML=`<div class="tuner-head"><div><small>SLALOM · PRACTICE</small><h2 id="jump-tuner-title">Jump tuning</h2></div><button id="tune-close" aria-label="Close jump tuning">×</button></div><p>Change a setting, then try the jump. Tests skip the course and leave your records untouched.</p><label>Test class<select id="tune-class"><option>Basic</option><option>Good</option><option>Great</option><option>Premium</option></select></label><div id="tune-globals"></div><h3 id="tune-class-name"></h3><div id="tune-class-fields"></div><p id="tune-summary"></p><p id="tune-status" role="status"></p><div class="tuner-actions"><button id="tune-play" class="primary">Try jump</button><button id="tune-copy">Copy settings</button><button id="tune-reset">Reset defaults</button></div><details><summary>Settings to share</summary><textarea id="tune-json" readonly aria-label="Settings JSON"></textarea></details>`;
 document.body.append(dialog);
 const $=s=>dialog.querySelector(s),status=$('#tune-status');
 const globalFields=[['travel','Icon travel time',.5,2.4,.05,'s'],['delay','Wait before rail',0,1,.05,'s'],['takeoff','Takeoff cue',.6,2.5,.1,'s'],['landing','Landing cue',.6,2.5,.1,'s'],['feedback','Grade flash',.3,1,.05,'s']];
 const classFields=[['count','Inputs',6,12,1,''],['input','Input sequence duration',1.5,4,.05,'s'],['cycle','Time per trick cycle',.6,2.4,.05,'s'],['trick','Trick time before landing cue',.6,6,.1,'s']];
 function fields(target,list,group){target.innerHTML=list.map(([name,label,min,max,step,unit])=>`<label class="tuner-field" for="tune-${name}"><span>${label}</span><input id="tune-${name}" data-group="${group}" data-key="${name}" type="range" min="${min}" max="${max}" step="${step}"><output for="tune-${name}"></output></label>`).join('');}
 fields($('#tune-globals'),globalFields,'global');fields($('#tune-class-fields'),classFields,'class');
 function exported(){return {takeoff:draft.takeoff,landing:draft.landing,delay:draft.delay,travel:draft.travel,feedback:draft.feedback,classes:draft.classes.map(c=>({class:c.name,count:c.count,input:c.input,cycle:c.cycle,trick:c.trick}))};}
 function save(){try{localStorage.setItem(key,JSON.stringify({settings:exported(),selected}));}catch{status.textContent='Settings work here, but this browser could not save them.';}}
 function render(){
  $('#tune-class').selectedIndex=selected;$('#tune-class-name').textContent=draft.classes[selected].name+' timing';
  for(const [list,group]of [[globalFields,'global'],[classFields,'class']])for(const [name,,min,max,step,unit]of list){const value=(group==='global'?draft:draft.classes[selected])[name],input=$('#tune-'+name);input.value=value;input.nextElementSibling.textContent=(step===1?value:value.toFixed(2))+(unit?' '+unit:'');}
  const c=draft.classes[selected];$('#tune-summary').textContent=`${c.count} inputs · ${(c.input/c.count).toFixed(2)} seconds between presses · ${minimumAir(selected,draft).toFixed(2)} s requested airtime. Trick time adds flight before the landing cue; cycle time sets rotation speed. Terrain or fitting one full rotation can require a longer flight. Icons start halfway to the target. Travel time is for the full path; the first press arrives after half that time. Larger travel time makes the icons move slower. Changes apply when you press Try jump.`;
  $('#tune-json').value=JSON.stringify(exported(),null,2);
 }
 dialog.addEventListener('input',e=>{const el=e.target;if(!el.dataset.key)return;const target=el.dataset.group==='global'?draft:draft.classes[selected];target[el.dataset.key]=Number(el.value);draft=settings(draft);status.textContent='';save();render();});
 $('#tune-class').onchange=e=>{selected=e.target.selectedIndex;save();render();};
 $('#tune-play').onclick=()=>{status.textContent='';save();tryJump(settings(draft),selected);};
 $('#tune-reset').onclick=()=>{draft=settings();status.textContent='Defaults restored.';save();render();};
 $('#tune-copy').onclick=async()=>{try{await navigator.clipboard.writeText($('#tune-json').value);status.textContent='Settings copied. Paste them into our chat.';}catch{$('details').open=true;$('#tune-json').focus();$('#tune-json').select();status.textContent='Select and copy the settings below.';}};
 $('#tune-close').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
 function open(message=''){status.textContent=message;render();api.openDialog('#jump-tuner');}
 button.onclick=()=>open();quick.onclick=()=>open();render();
 return {open,update(active){quick.hidden=!active||api.paused;}};
}

import {createDriveDoubleTap} from './drive-double-tap.js';
// Drive owns the gesture; this is a passive energy readout, never another button.
export function mountRoverTurboControl(turbo,{available=true,enabled=()=>true,paused=()=>false}={}){
 if(!available)return {clear(){turbo.cancel();},get held(){return false;},update(){}};
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./rover-turbo.css',import.meta.url);document.head.append(link);
 const panel=document.createElement('div');panel.id='rover-turbo';panel.hidden=true;panel.innerHTML='<span class="turbo-label">TURBO</span><meter min="0" max="1" value="1" aria-label="Turbo energy"></meter><small>Double-tap Drive · hold</small>';document.body.append(panel);
 const meter=panel.querySelector('meter'),note=panel.querySelector('small'),gesture=createDriveDoubleTap();
 const usable=()=>enabled()&&!paused()&&!document.hidden&&!window.AstraLoading?.blocked&&!document.querySelector('dialog[open]');
 const gas=e=>e.target instanceof Element&&e.target.closest('#drive,[data-control="drive"]');
 const brake=e=>e.target instanceof Element&&e.target.closest('#brake,[data-control="brake"]');
 function clear(){gesture.clear();turbo.cancel();panel.dataset.active='false';}
 document.addEventListener('pointerdown',e=>{if(brake(e)){clear();return;}if(gas(e)&&usable())gesture.down(e.pointerId,e.pointerType||'pointer',e.timeStamp);},true);
 document.addEventListener('pointerup',e=>{gesture.up(e.pointerId,e.pointerType||'pointer',e.timeStamp);if(!gesture.held)turbo.cancel();},true);
 for(const type of ['pointercancel','lostpointercapture'])document.addEventListener(type,e=>{gesture.cancel(e.pointerId);if(!gesture.held)turbo.cancel();},true);
 window.addEventListener('keydown',e=>{if(e.code.startsWith('Shift')){clear();return;}if(e.code!=='Space'||e.repeat||e.target.closest('input,select,textarea')||!usable())return;gesture.down('space','keyboard',e.timeStamp);},true);
 window.addEventListener('keyup',e=>{if(e.code==='Space'){gesture.up('space','keyboard',e.timeStamp);turbo.cancel();}},true);
 window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);window.addEventListener('resize',clear);document.addEventListener('visibilitychange',clear);
 document.addEventListener('toggle',e=>{if(e.target.matches('dialog')&&e.target.open)clear();},true);
 const observer=new MutationObserver(()=>{if(!usable())clear();});observer.observe(document.body,{attributes:true,attributeFilter:['class']});
 return {clear,get held(){if(!usable()){clear();return false;}return gesture.held;},update(){const show=usable();panel.hidden=!show;if(!show)clear();meter.value=turbo.energy;panel.dataset.active=String(!!turbo.active);note.textContent=turbo.exhausted&&gesture.held?'Release Drive to recharge':'Double-tap Drive · hold';},get element(){return panel;}};
}

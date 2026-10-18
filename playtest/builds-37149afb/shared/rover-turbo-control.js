// Separate from Drive/Brake so touch can steer and turbo with two fingers.
export function mountRoverTurboControl(turbo,{available=true,enabled=()=>true,paused=()=>false}={}){
 if(!available)return {clear(){turbo.cancel();},get held(){return false;},update(){}};
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./rover-turbo.css',import.meta.url);document.head.append(link);
 const panel=document.createElement('div');panel.id='rover-turbo';panel.hidden=true;panel.innerHTML='<button type="button" aria-label="Hold Turbo" aria-pressed="false"><span>HOLD TURBO</span><small>E</small><meter min="0" max="1" value="1" aria-label="Turbo energy"></meter></button><span class="turbo-note" role="status"></span>';document.body.append(panel);
 const button=panel.querySelector('button'),meter=panel.querySelector('meter'),note=panel.querySelector('.turbo-note'),pointers=new Set();let key=false;
 const usable=()=>enabled()&&!paused()&&!document.hidden&&!window.AstraLoading?.blocked&&!document.querySelector('dialog[open]');
 function clear(){key=false;pointers.clear();turbo.cancel();button.setAttribute('aria-pressed','false');}
 button.addEventListener('pointerdown',e=>{e.preventDefault();if(!usable())return;button.setPointerCapture(e.pointerId);pointers.add(e.pointerId);});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,e=>{pointers.delete(e.pointerId);if(!key&&!pointers.size)turbo.cancel();});
 window.addEventListener('keydown',e=>{if(e.code!=='KeyE'||e.target.closest('input,select,textarea'))return;e.preventDefault();if(!e.repeat&&usable())key=true;});
 window.addEventListener('keyup',e=>{if(e.code==='KeyE'){key=false;if(!pointers.size)turbo.cancel();}});
 window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);window.addEventListener('resize',clear);document.addEventListener('visibilitychange',clear);
 document.addEventListener('toggle',e=>{if(e.target.matches('dialog')&&e.target.open)clear();},true);
 const observer=new MutationObserver(()=>{if(!usable())clear();});observer.observe(document.body,{attributes:true,attributeFilter:['class']});
 return {clear,get held(){if(!usable()){clear();return false;}return key||pointers.size>0;},update(){const show=usable();panel.hidden=!show;if(!show)clear();meter.value=turbo.energy;button.setAttribute('aria-pressed',String(!!turbo.active));button.title=`Hold E or Turbo · ${Math.round(turbo.energy*100)}% energy`;note.textContent=turbo.exhausted&&(key||pointers.size)?'Release to recharge':'';},get element(){return panel;}};
}

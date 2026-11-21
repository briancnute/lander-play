// Paused landscape inspection and uncropped source photograph comparison.
export function mountSiteCamera({gpu,area,getState,render,onBack}){
 const root=document.createElement('section');root.id='gale-camera';root.hidden=true;
 root.setAttribute('aria-label','Site camera');root.innerHTML='<div class="gc-gesture" tabindex="0" aria-label="Drag to look; arrows to turn; plus and minus to zoom"><figure hidden><div class="gc-photo"><img draggable="false" alt=""></div><figcaption></figcaption></figure></div><nav aria-label="Camera"><button data-camera="back">Back</button><div><button data-camera="scene" aria-pressed="true">Scene</button><button data-camera="photo" aria-pressed="false">Photo</button></div><div><button data-camera="out" aria-label="Zoom out">−</button><button data-camera="in" aria-label="Zoom in">+</button><button data-camera="reset">Reset</button></div></nav>';
 document.body.append(root);const gesture=root.querySelector('.gc-gesture'),figure=root.querySelector('figure'),img=root.querySelector('img'),caption=root.querySelector('figcaption');
 let site,photo,mode='scene',yaw=0,pitch=0,zoom=1,px=0,py=0,pz=1;const pointers=new Map();
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function renderView(){
  if(root.hidden)return;
  if(mode==='scene'){
   const s=getState(),heading=(area.photoLandmarks?.views[site.id]?.heading??site.heading??s.heading)+yaw;
   // Observer at the arrival circle, looking out across the existing measured world.
   gpu.photoView={x:site.x,y:site.y,eye:area.ground(site.x,site.y)+(area.photoLandmarks?.views[site.id]?.eye??5.5),heading,pitch,zoom,terrainRange:14000,free:true};render();
  }else img.style.transform=`translate(${px}px,${py}px) scale(${pz})`;
 }
 function select(next){mode=next;figure.hidden=mode!=='photo';for(const b of root.querySelectorAll('[aria-pressed]'))b.setAttribute('aria-pressed',String(b.dataset.camera===mode));renderView();}
 function reset(){yaw=0;pitch=area.photoLandmarks?.views[site?.id]?.pitch??.04;zoom=area.photoLandmarks?.views[site?.id]?.zoom??1;px=py=0;pz=1;renderView();}
 function scale(factor){if(mode==='photo')pz=clamp(pz*factor,1,8);else zoom=clamp(zoom*factor,.5,5);renderView();}
 function pan(dx,dy){if(mode==='photo'){const box=gesture.getBoundingClientRect();px=clamp(px+dx,-box.width*pz*.45,box.width*pz*.45);py=clamp(py+dy,-box.height*pz*.45,box.height*pz*.45);}else{yaw-=dx*.005;pitch=clamp(pitch-dy*.004,-1.3,1.3);}renderView();}
 function close(){root.hidden=true;pointers.clear();gpu.photoView=null;gpu.reset(getState());document.body.classList.remove('gale-camera-active');render();}
 root.querySelector('nav').onclick=e=>{switch(e.target.closest('button')?.dataset.camera){case 'back':close();onBack();break;case 'scene':select('scene');break;case 'photo':select('photo');break;case 'reset':reset();break;case 'in':scale(1.25);break;case 'out':scale(.8);break;}};
 gesture.addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;e.preventDefault();gesture.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});});
 gesture.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const before=[...pointers.values()],old=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const after=[...pointers.values()];if(after.length===2){const distance=p=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);scale(distance(after)/Math.max(1,distance(before)));}else pan(e.clientX-old.x,e.clientY-old.y);});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])gesture.addEventListener(event,e=>pointers.delete(e.pointerId));
 gesture.addEventListener('wheel',e=>{e.preventDefault();scale(e.deltaY<0?1.1:1/1.1);},{passive:false});
 window.addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'||e.key.toLowerCase()==='m'){e.preventDefault();e.stopImmediatePropagation();return;}const delta={ArrowLeft:[20,0],ArrowRight:[-20,0],ArrowUp:[0,-15],ArrowDown:[0,15]}[e.key];if(delta||['+','=','-'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();if(delta)pan(...delta);else scale(e.key==='-'?.8:1.25);}},true);
 window.addEventListener('resize',renderView);
 return {get active(){return !root.hidden;},get mode(){return mode;},open(stop,reference){site=stop;photo=reference;root.hidden=false;document.body.classList.add('gale-camera-active');img.src=photo.url;img.alt=photo.alt;caption.replaceChildren(document.createTextNode(photo.caption+' · '+photo.credit+' '));const link=document.createElement('a');link.href=photo.source;link.target='_blank';link.rel='noopener';link.textContent='Source ↗';caption.append(link);reset();select('scene');root.querySelector('[data-camera=back]').focus();},close};
}

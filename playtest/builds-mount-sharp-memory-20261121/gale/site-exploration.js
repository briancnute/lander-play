import {photoFrame} from '../shared/photo-framing.js';
import {createSiteVisits,VISITS_KEY,SITE_RADIUS,outsideSite} from './site-visits.js';
import {mountSiteCamera} from './site-camera.js';
import {triangle} from '../mars-renderer/triangle.js';
import {insideFootprint} from './exploration-footprint.js';

export async function mountSiteExploration({area,gpu,getState,pause,resume,render,reset,clearInput}){
 const read=key=>{try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
 const stops=area.guidedTour.checkpoints.map(p=>({...p,name:p.name.replace(/ chapter$/,'')}));
 const visits=createSiteVisits(stops,read(VISITS_KEY),read('astra.gale.guidedTour.v1'));
 const response=await fetch(new URL('../shared/tour-photos.json',import.meta.url));if(!response.ok)throw Error('Site photographs could not load. Please reload.');
 const photographs=(await response.json()).sites.gale;for(const photo of Object.values(photographs))photo.url=new URL(photo.image,new URL('../shared/tour-photos.json',import.meta.url)).href;
 let menu=null,phase='riding',saveFailed=false;
 const card=document.createElement('dialog');card.id='gale-reading';card.className='gale-story';card.setAttribute('aria-labelledby','gale-reading-title');
 card.innerHTML='<div class="gs-scroll"><h2 id="gale-reading-title"></h2><p class="gs-date"></p><button class="gs-preview" aria-label="Open photo and scene camera"><img alt=""></button><p class="gs-fact"></p><p class="gs-observe"></p><details><summary>Sources</summary><p class="gs-credit"></p><a target="_blank" rel="noopener">Mission ↗</a> · <a target="_blank" rel="noopener">Photo ↗</a></details></div><footer><button class="primary" id="gale-story-resume">Resume</button><button id="gale-look">Look</button></footer>';
 const done=document.createElement('dialog');done.id='gale-complete';done.className='gale-story';done.setAttribute('aria-labelledby','gale-complete-title');done.innerHTML='<h2 id="gale-complete-title">All sites visited</h2><p>Travel to any site from Map. Revisit the blue circles, or hide site circles in Ride.</p><footer><button class="primary">Continue</button></footer>';
 document.body.append(card,done);
 const hideLabel=document.createElement('label');hideLabel.id='gale-hide-circles';hideLabel.innerHTML='<input type="checkbox"> Hide site circles';hideLabel.hidden=!visits.complete;const hide=hideLabel.querySelector('input');hide.checked=visits.data.hideCircles;hide.onchange=()=>{visits.data.hideCircles=visits.complete&&hide.checked;save();render();};
 const intro=document.createElement('p');intro.id='gale-site-hint';intro.textContent='Stop in the gold circle to explore a site. Map lets you return to visited sites.';
 const warning=document.createElement('p');warning.id='gale-save-warning';warning.hidden=true;warning.textContent='Progress could not be saved in this browser.';
 const camera=mountSiteCamera({gpu,area,getState,render,onBack(){phase='reading';card.showModal();}});
 const meshes=new Map();
 function ring(p,visited){const key=p.id+visited;if(meshes.has(key))return meshes.get(key);const vertices=[],color=visited?[.19,.46,.70]:[.94,.69,.29];const point=(a,r)=>{const x=p.x+Math.sin(a)*r,y=p.y+Math.cos(a)*r;return [x,y,area.ground(x,y)+.28];};for(let i=0;i<96;i++){const a=i*Math.PI/48,b=(i+1)*Math.PI/48,inner=SITE_RADIUS-1.5,outer=SITE_RADIUS+1.5;triangle(vertices,point(a,inner),point(a,outer),point(b,inner),color);triangle(vertices,point(b,inner),point(a,outer),point(b,outer),color);}const mesh=gpu.upload(new Float32Array(vertices));meshes.set(key,mesh);return mesh;}
 function save(){const s=getState();if(!s.air&&insideFootprint(s,area.bounds))visits.data.position={x:s.x,y:s.y,heading:s.heading};try{localStorage.setItem(VISITS_KEY,JSON.stringify(visits.data));if(visits.complete){const mastery=read('astra.mars.activityMastery.v1')??{};mastery.gale={...mastery.gale,'guided-tour':true};localStorage.setItem('astra.mars.activityMastery.v1',JSON.stringify(mastery));}saveFailed=false;}catch{saveFailed=true;}warning.hidden=!saveFailed;}
 function showReading(p){
  phase='reading';clearInput();const s=getState();s.v=s.vz=0;s.roverSpeedMps=0;pause();
  const photo=photographs[p.id];card.querySelector('h2').textContent=p.name;card.querySelector('.gs-date').textContent=p.earthLabel+' · Sol '+p.sol;
  const img=card.querySelector('img');img.src=photo.url;img.alt=photo.alt;const frame=photoFrame(photo);img.style.cssText=frame.image;card.querySelector('.gs-preview').style.setProperty('--photo-aspect',String(frame.aspect));
  card.querySelector('.gs-fact').textContent=p.id==='frontier'?'This is the last rover position in this game’s recorded journey. Curiosity’s investigations continue to reveal how water shaped Mount Sharp.':p.fact;
  card.querySelector('.gs-observe').textContent=photo.detail??'Look around the surrounding terrain, then compare the mission photograph.';
  card.querySelector('.gs-credit').textContent=photo.caption+' · '+photo.credit+'. Scene: measured regional terrain. Photo-inspired rocks and outcrops have approximate placement; the photograph retains the original view.';
  const links=card.querySelectorAll('a');links[0].href=p.source;links[1].href=photo.source;card.querySelector('details').open=false;
  card.showModal();
 }
 function look(){if(phase!=='reading')return;phase='camera';card.close();clearInput();camera.open(visits.active,photographs[visits.active.id]);}
 card.querySelector('#gale-look').onclick=look;card.querySelector('.gs-preview').onclick=look;
 card.querySelector('#gale-story-resume').onclick=()=>{if(phase!=='reading')return;card.close();const completed=visits.finish();phase=completed?'complete':'riding';hideLabel.hidden=!visits.complete;intro.hidden=visits.data.visited.length>0;save();menu?.sync();if(completed)done.showModal();else resume();};
 done.querySelector('button').onclick=()=>{done.close();phase='riding';resume();};
 for(const dialog of [card,done])dialog.addEventListener('cancel',e=>e.preventDefault());
 window.addEventListener('keydown',e=>{if(phase!=='riding'&&(e.key==='Escape'||e.key.toLowerCase()==='m')){e.preventDefault();e.stopImmediatePropagation();}},true);
 function safe(p){if(!insideFootprint(p,area.bounds))return false;const h=area.ground,slope=Math.hypot(h(p.x+8,p.y)-h(p.x-8,p.y),h(p.x,p.y+8)-h(p.x,p.y-8))/16;return Number.isFinite(h(p.x,p.y))&&slope<=area.guidedTour.recovery.maximumSlope&&!area.localRocks(p.x,p.y).some(([x,y,r])=>Math.hypot(p.x-x,p.y-y)<r+14);}
 function landing(p){const first=outsideSite(p);if(safe(first))return first;for(let r=SITE_RADIUS+46;r<=400;r+=16)for(let i=0;i<32;i++){const heading=i*Math.PI/16,q={x:p.x-Math.sin(heading)*r,y:p.y+Math.cos(heading)*r,heading};if(safe(q))return q;}return null;}
 // Only explicit visit completion unlocks travel. Map taps cannot bypass the list.
 function findTravel(p){const site=stops.find(q=>Math.hypot(q.x-p.x,q.y-p.y)<=SITE_RADIUS+8&&visits.canTravel(q));return site?landing(site):null;}
 function travel(p){if(!stops.some(q=>visits.canTravel(q)&&Math.hypot(q.x-p.x,q.y-p.y)>SITE_RADIUS&&Math.hypot(q.x-p.x,q.y-p.y)<=401))return;reset(p);save();resume();}
 const oldPosition=visits.data.position;if(oldPosition&&Number.isFinite(oldPosition.heading)&&safe(oldPosition))reset(oldPosition);
 else if(!read(VISITS_KEY)&&!read('astra.gale.openWorld.v1'))reset(landing(stops[0])??outsideSite(stops[0]));
 intro.hidden=visits.data.visited.length>0;
 return {stops,visits,camera,hideLabel,intro,warning,save,findTravel,travel,get locked(){return phase!=='riding';},get phase(){return phase;},get target(){return visits.next();},setMenu(value){menu=value;},
  update(){if(phase!=='riding')return;const p=visits.arrive(getState());if(p)showReading(p);},
  draw(){if(camera.active||visits.data.hideCircles)return;const s=getState(),gl=gpu.gl;gl.enable(gl.DEPTH_TEST);gl.depthMask(false);for(const p of stops){if(visits.available(p)&&Math.hypot(p.x-s.x,p.y-s.y)<1900)gpu.mesh(ring(p,visits.data.visited.includes(p.id)),[0,0,0,100],7);}gl.depthMask(true);},
  syncMenu(){menu?.sync();},
 };
}

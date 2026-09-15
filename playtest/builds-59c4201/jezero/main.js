import {mapBounds,geology,raceSite,sitesFor,mapTarget,outsideDriving,advanceEntry} from './navigation.js';
import {loadArea,discoveries,SITE_VERSION} from './area.js';
import {landmarks,LandmarkLayer} from './landmarks.js';
import {toGame,toMetres} from './terrain.js';
import {GPURenderer} from '../mars-renderer/gpu.js';
import {driveStep} from '../mars-renderer/driving.js';
import {kit,KITS} from '../mars-renderer/kits.js';
import {capturePose,displayState} from '../mars-renderer/motion.js';
import {StormFront} from '../mars-renderer/storm-front.js';
import {NightSky} from '../mars-renderer/night-sky.js';
import {openCraft} from '../mars-renderer/craft.js';
import {box,triangle} from '../mars-renderer/geometry.js';
const {create,reverseAvailable}=await import(/* @vite-ignore */ new URL('../../../extras/expedition/sim.mjs',import.meta.url).href);
const $=s=>document.querySelector(s),KEY='astra.jezero.'+SITE_VERSION;
const clock=t=>`${Math.floor(t/60)}:${(t%60).toFixed(2).padStart(5,'0')}`;
let area,gpu,state,previous,paused=true,ready=false,welcome=true,last=0,acc=0,lastDraw=0,lastSave=0,lastMap=0,lastHud=0,dirty=true,selected='perseverance',quality='balanced',light='day',landmarkLabels=true,backTo=null,saveWarned=false;
const nav={geology:false,sites:false,skipConfirm:false,target:null};let pendingTarget=null,entryTime=0,entryArmed=true;const observedInside=new Set();
const input={drive:false,brake:false,steer:0},keys=new Set(),pointers=new Map();
const progress={seenLandmarks:[],collected:[],bests:{},rover:'perseverance',position:null};
const storm=new StormFront(),sky=new NightSky($('#night-sky')),relief=new Image();relief.src=new URL('./assets/relief.webp',import.meta.url).href;
function readSave(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(!s||s.version!==SITE_VERSION)return;
 progress.collected=Array.isArray(s.collected)?[...new Set(s.collected.filter(i=>Number.isInteger(i)&&i>=0&&i<3))]:[];
 if(s.bests&&typeof s.bests==='object')for(const id of Object.keys(KITS))if(Number.isFinite(s.bests[id])&&s.bests[id]>0)progress.bests[id]=s.bests[id];
 if(s.navigation){for(const k of ['geology','sites','skipConfirm'])if(typeof s.navigation[k]==='boolean')nav[k]=s.navigation[k];const t=s.navigation.target;if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y)&&t.x>=0&&t.x<=12000&&t.y>=0&&t.y<=12000)nav.target=t.id?sitesFor(area,landmarks).find(p=>p.id===t.id)??null:{x:t.x,y:t.y,name:'Map target'};}
 if(typeof s.landmarkLabels==='boolean')landmarkLabels=s.landmarkLabels;
 progress.seenLandmarks=Array.isArray(s.seenLandmarks)?[...new Set(s.seenLandmarks.filter(id=>landmarks.some(p=>p.id===id)))]:[];
 if(KITS[s.rover])selected=s.rover;
 if(['balanced','performance'].includes(s.quality))quality=s.quality;if(['day','dusk','night'].includes(s.light))light=s.light;
 if(s.position&&['x','y','heading'].every(k=>Number.isFinite(s.position[k]))){const p=s.position,b=area.bounds;if(p.x>b.minX+100&&p.x<b.width-100&&p.y>b.minY+100&&p.y<b.maxY-100)progress.position=p;}
 }catch{/* Corrupt or unavailable storage cannot prevent exploration. */}}
function save(){if(!ready)return;const position=state.mode==='free'&&!state.air&&!state.turnaround?{x:state.x,y:state.y,heading:state.heading}:progress.position;
 try{localStorage.setItem(KEY,JSON.stringify({version:SITE_VERSION,collected:progress.collected,bests:progress.bests,rover:selected,position,quality,light,landmarkLabels,seenLandmarks:progress.seenLandmarks,navigation:nav}));progress.position=position;}catch{if(!saveWarned){saveWarned=true;notify('Progress cannot be saved in this browser.');}}}
function notify(text,seconds=5){state.message=text;state.messageUntil=state.t+seconds;dirty=true;}
function sync(){const held=new Set(pointers.values());input.drive=keys.has('w')||keys.has('arrowup')||held.has('drive');input.brake=keys.has(' ')||keys.has('arrowdown')||keys.has('s')||held.has('brake');input.steer=(keys.has('d')||keys.has('arrowright')||held.has('right')?1:0)-(keys.has('a')||keys.has('arrowleft')||held.has('left')?1:0);}
function clearInput(){keys.clear();pointers.clear();sync();document.querySelectorAll('.controls .active').forEach(b=>b.classList.remove('active'));}
function lighting(){state.solar=light==='night'?{east:0,north:0,up:-1}:light==='dusk'?{east:-.65,north:.759,up:.05}:{east:-.45,north:.6,up:.66};$('#scene').style.background=light==='night'?'linear-gradient(#03060c,#080c14 65%,#151720)':light==='dusk'?'linear-gradient(#211c2c,#775751 58%,#745b51)':'linear-gradient(#75482f,#be8b62 53%,#b48059)';}
function resetAt(p=area.start,mode='free'){
 state=create(mode,area.course,selected);Object.assign(state,{x:p.x,y:p.y,heading:p.heading??-Math.PI*.35,z:area.ground(p.x,p.y),tune:kit(selected),collected:[...progress.collected],messageUntil:0});
 previous=capturePose(state,state.z);gpu.reset(state);acc=0;clearInput();lighting();dirty=true;updateHud();
}
function closeDialogs(){pendingTarget=null;$('#target-confirm').hidden=true;for(const d of document.querySelectorAll('dialog[open]'))d.close();backTo=null;}
function setPause(value){paused=value;if(value){landmarkLayer.hide();activityLayer.hide();}clearInput();acc=0;if(state)previous=capturePose(state,area.ground(state.x,state.y));$('#lamps').hidden=true;dirty=true;if(value)save();else if(document.activeElement instanceof HTMLElement)document.activeElement.blur();}
function openDialog(id,caller=null){closeDialogs();backTo=caller;setPause(true);$(id).showModal();if(id==='#pause-dialog')$('#resume').textContent=state.mode==='trial'?'Resume lap':'Continue exploring';if(id==='#map-dialog'){pendingTarget=null;$('#target-confirm').hidden=true;renderSiteButtons();drawMap();}if(id==='#notes-dialog')renderNotes();}
function closeSheet(){const back=backTo;closeDialogs();if(back)openDialog(back,back==='#notes-dialog'?notesReturn:null);else setPause(false);}
function explore(){welcome=false;$('#welcome').hidden=true;closeDialogs();state.mode='free';state.done=false;state.countdown=0;setPause(false);updateHud();save();}
function startLap(){entryTime=0;entryArmed=false;$('#scene').classList.remove('race-transition');void $('#scene').offsetWidth;$('#scene').classList.add('race-transition');welcome=false;$('#welcome').hidden=true;closeDialogs();resetAt(area.start,'trial');setPause(false);notify('Delta circuit',2);}
function endLap(){state.mode='free';state.done=false;state.countdown=0;state.time=0;notify('Explore freely');updateHud();save();}
function finishLap(){const time=state.time,old=progress.bests[selected];if(!old||time<old)progress.bests[selected]=time;
 $('#result-time').textContent=clock(time);$('#result-best').textContent=!old||time<old?'Your best in this rover':`Best · ${clock(old)}`;
 state.mode='free';state.done=false;state.countdown=0;state.v=0;openDialog('#result-dialog');updateHud();save();}
function updateHud(){if(!state)return;$('#count').textContent=`${progress.collected.length}/3`;$('#map-count').textContent=`${progress.collected.length} / 3`;$('#race-hud').hidden=state.mode!=='trial';$('#gate-count').textContent=state.nextGate<area.course.gates.length?`Gate ${state.nextGate+1} / ${area.course.gates.length}`:'Finish';$('#timer').textContent=state.countdown>0?String(Math.ceil(state.countdown)):clock(state.time);$('#brake').textContent=reverseAvailable(state,area.samples)?'Reverse':'Brake';$('#entry-loading').hidden=paused||entryTime<=0;$('#entry-loading progress').value=entryTime;$('#toast').textContent=welcome?'':state.boundary?'Return toward Three Forks':state.collecting>=0?'Observing…':state.messageUntil>state.t?state.message:'';}
let notesReturn=null;
function showCard(p,caller,kind){if(caller==='#notes-dialog')notesReturn=backTo;
 $('#discovery-kind').textContent=kind==='landmark'?'JEZERO / LANDMARK':'JEZERO / DISCOVERY';
 $('#discovery-title').textContent=p.name;$('#discovery-fact').textContent=p.fact;$('#discovery-detail').textContent=p.detail;
 const img=$('#discovery-image'),choices=$('#discovery-views');choices.replaceChildren();choices.hidden=!p.views?.length;
 const views=[{...p,label:'2021 · Iconic view'},...(p.views??[])];
 function selectView(v,i){img.hidden=false;img.onerror=()=>{img.hidden=true;};img.src=new URL(v.image,import.meta.url).href;img.alt=v.imageAlt;
  $('#discovery-credit').textContent=v.imageCredit+(kind==='landmark'?' · Real landmark; reference camera differs from this view.':' · Regional reference; not a matched view from this stop.');
  $('#discovery-source').href=v.source;$('#discovery-source').textContent='Image source ↗';[...choices.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
 }
 if(p.views?.length)views.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=v.label;b.onclick=()=>selectView(v,i);choices.append(b);});
 selectView(views[0],0);openDialog('#discovery-dialog',caller);
 $('#discovery-continue').textContent=caller?'Back to Field Notes':state.mode==='trial'?'Resume time trial':'Continue exploring';
}
function showDiscovery(i,caller=null){const p=discoveries[i];if(p&&progress.collected.includes(i))showCard(p,caller,'discovery');}
function showLandmark(id,caller=null){const p=landmarks.find(p=>p.id===id);if(!p)return;
 if(!progress.seenLandmarks.includes(id))progress.seenLandmarks.push(id);
 showCard(p,caller,'landmark');save();
}
const landmarkLayer=new LandmarkLayer($('#landmark-labels'),id=>{if(!paused&&!welcome)showLandmark(id);});
const activityLayer=new LandmarkLayer($('#landmark-labels'),()=>{if(!paused)guideToRace();},[{...raceSite,rise:8}]);
function renderSiteButtons(){const root=$('#map-sites');root.hidden=!nav.sites;root.replaceChildren();if(nav.sites)for(const p of sitesFor(area,landmarks)){const b=document.createElement('button');b.textContent=p.name;b.onclick=()=>requestTarget({id:p.id,name:p.name,x:p.x,y:p.y});root.append(b);}}
function requestTarget(p){pendingTarget=p;if(nav.skipConfirm){acceptTarget();return;}$('#target-name').textContent=p.name+(outsideDriving(p,area.bounds)?' · Beyond the driving area; view from a distance.':'');$('#target-no-ask').checked=false;$('#target-confirm').hidden=false;$('#target-confirm').scrollIntoView({block:'nearest'});$('#target-accept').focus();}
function acceptTarget(){if(!pendingTarget)return;nav.target=pendingTarget;if($('#target-no-ask').checked)nav.skipConfirm=true;pendingTarget=null;$('#target-confirm').hidden=true;save();closeDialogs();exploreOrResume();}
function guideToRace(){openDialog('#map-dialog');requestTarget({id:raceSite.id,name:raceSite.name,x:raceSite.x,y:raceSite.y});}
$('#target-accept').onclick=acceptTarget;$('#target-cancel').onclick=()=>{pendingTarget=null;$('#target-confirm').hidden=true;$('#map').focus();};
$('#clear-target').onclick=()=>{nav.target=null;pendingTarget=null;$('#target-confirm').hidden=true;save();drawMap();};
for(const [id,key]of [['geology-layer','geology'],['sites-layer','sites']])$('#'+id).onchange=e=>{nav[key]=e.target.checked;renderSiteButtons();save();drawMap();};
$('#map').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top,hit=(e.currentTarget._siteHits??[]).find(a=>x>=a.left&&x<=a.right&&y>=a.top&&y<=a.bottom);requestTarget(hit?{id:hit.site.id,name:hit.site.name,x:hit.site.x,y:hit.site.y}:mapTarget(x,y,sitesFor(area,landmarks),nav.sites,r.width,r.height));};
let mapCursor={x:.5,y:.5};$('#map').onkeydown=e=>{const moves={ArrowLeft:[-.04,0],ArrowRight:[.04,0],ArrowUp:[0,-.04],ArrowDown:[0,.04]};if(moves[e.key]){e.preventDefault();mapCursor.x=Math.max(0,Math.min(1,mapCursor.x+moves[e.key][0]));mapCursor.y=Math.max(0,Math.min(1,mapCursor.y+moves[e.key][1]));$('#gps-status').textContent=`Map selection ${Math.round(mapCursor.x*100)}% east, ${Math.round(mapCursor.y*100)}% south. Enter to target.`;}if(e.key==='Enter'){e.preventDefault();const r=$('#map').getBoundingClientRect();requestTarget(mapTarget(mapCursor.x*r.width,mapCursor.y*r.height,sitesFor(area,landmarks),nav.sites,r.width,r.height));}};
function renderNotes(){
 $('#notes').replaceChildren(...discoveries.map((p,i)=>{const a=document.createElement('article'),h=document.createElement('h3');h.textContent=(progress.collected.includes(i)?'✓ ':'◇ ')+p.name;a.append(h);
 const text=document.createElement('p');text.textContent=progress.collected.includes(i)?p.fact:'Find this observation on the map.';a.append(text);
 if(progress.collected.includes(i)){const review=document.createElement('button');review.textContent='View discovery';review.onclick=()=>showDiscovery(i,'#notes-dialog');a.append(review);const img=document.createElement('img');img.src=new URL(p.image,import.meta.url).href;img.alt='NASA view of Jezero’s delta front';img.loading='lazy';a.prepend(img);const d=document.createElement('details'),s=document.createElement('summary'),body=document.createElement('p'),link=document.createElement('a');s.textContent='The story';body.textContent=p.detail;link.href=p.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='NASA / JPL-Caltech · source ↗';d.append(s,body,link);a.append(d);}else a.classList.add('locked');return a;}));
 if(progress.seenLandmarks.length){const h=document.createElement('h3');h.textContent='Landmarks you’ve read';$('#notes').append(h);for(const id of progress.seenLandmarks){const p=landmarks.find(p=>p.id===id),b=document.createElement('button');b.textContent=p.name;b.onclick=()=>showLandmark(id,'#notes-dialog');$('#notes').append(b);}}
}
function mapPoint(p,w,h){const b=mapBounds;return {x:(p.x-b.minX)/(b.width-b.minX)*w,y:(p.y-b.minY)/(b.maxY-b.minY)*h};}
function drawMap(c=$('#map'),mini=false){
 const rect=c.getBoundingClientRect(),w=Math.max(mini?100:300,rect.width),h=Math.max(mini?90:270,rect.height),dpr=Math.min(2,devicePixelRatio);c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);c._siteHits=[];const placed=[];
 function mapLabel(name,q,site=null){const width=ctx.measureText(name).width+8,height=18;let chosen=null;for(const dy of [21,-12,41,-32,61,-52,81,-72,101,-92,121,-112]){for(const dx of [0,-50,50,-100,100,-150,150]){const x=Math.max(width/2+4,Math.min(w-width/2-4,q.x+dx)),y=q.y+dy,r={left:x-width/2,right:x+width/2,top:y-13,bottom:y+5};if(r.top<5||r.bottom>h-45||placed.some(a=>r.left<a.right+3&&r.right>a.left-3&&r.top<a.bottom+3&&r.bottom>a.top-3))continue;chosen={...r,x,y};break;}if(chosen)break;}if(!chosen)return;placed.push(chosen);if(site){ctx.strokeStyle='#ead9b477';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(chosen.x,chosen.y-6);ctx.stroke();ctx.fillStyle='#18302de0';ctx.fillRect(chosen.left,chosen.top,width,height);c._siteHits.push({...chosen,site});}ctx.fillStyle='#f1e4c9';ctx.fillText(name,chosen.x,chosen.y);}
 const b=mapBounds;c.dataset.geologyVisible=String(nav.geology);c.dataset.sitesVisible=String(nav.sites);ctx.fillStyle='#8a6346';ctx.fillRect(0,0,w,h);if(relief.complete&&relief.naturalWidth)ctx.drawImage(relief,b.minX/12000*601,b.minY/12000*601,(b.width-b.minX)/12000*601,(b.maxY-b.minY)/12000*601,0,0,w,h);
 ctx.fillStyle='#1e242233';ctx.fillRect(0,0,w,h);const racing=state.mode==='trial';c.dataset.raceVisible=String(racing);if(racing){ctx.strokeStyle='#efddaf91';ctx.lineWidth=1.5;ctx.setLineDash([4,5]);ctx.beginPath();area.course.route.forEach((p,i)=>{const q=mapPoint(p,w,h);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.closePath();ctx.stroke();ctx.setLineDash([]);
 const gates=[...area.course.gates,area.course.finish];gates.forEach((p,i)=>{const q=mapPoint(p,w,h),next=state.mode==='trial'&&i===state.nextGate,following=state.mode==='trial'&&i===state.nextGate+1;ctx.beginPath();ctx.arc(q.x,q.y,mini?(next?4:2):next?9:5,0,Math.PI*2);ctx.fillStyle=next?'#c2f1cb':following?'#edd9a4':'#23382bd0';ctx.fill();ctx.strokeStyle='#eddcb4';ctx.stroke();if(!mini&&(next||following)){ctx.fillStyle='#fff4d6';ctx.font='bold 12px system-ui';ctx.fillText(i===area.course.gates.length?'Finish':String(i+1),q.x+12,q.y+4);}});
 }
 ctx.textAlign='center';ctx.font=mini?'9px system-ui':'12px system-ui';const roverPoint=mapPoint(state,w,h);placed.push({left:roverPoint.x-10,right:roverPoint.x+10,top:roverPoint.y-12,bottom:roverPoint.y+12});if(nav.sites&&!mini)for(const site of sitesFor(area,landmarks)){const q=mapPoint(site,w,h);placed.push({left:q.x-7,right:q.x+7,top:q.y-7,bottom:q.y+7});}
 if(nav.geology)for(const g of geology){const q=mapPoint(g,w,h);mapLabel(g.name,q);}
 if(nav.sites)for(const site of sitesFor(area,landmarks)){const q=mapPoint(site,w,h);ctx.fillStyle='#f4da9c';ctx.beginPath();ctx.arc(q.x,q.y,mini?2:4,0,Math.PI*2);ctx.fill();if(!mini)mapLabel(site.name,q,site);}
 if(nav.target){const q=mapPoint(nav.target,w,h);ctx.strokeStyle='#bcf5df';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,mini?4:8,0,Math.PI*2);ctx.moveTo(q.x-12,q.y);ctx.lineTo(q.x+12,q.y);ctx.moveTo(q.x,q.y-12);ctx.lineTo(q.x,q.y+12);ctx.stroke();}
 const p=mapPoint(state,w,h);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(state.heading);if(mini)ctx.scale(.65,.65);ctx.fillStyle='#e2ffe3';ctx.strokeStyle='#16332d';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(7,7);ctx.lineTo(0,3);ctx.lineTo(-7,7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
 // Physical scale comes from the terrain's 4 game units per metre.
 const metres=200,pixels=metres*4/(b.width-b.minX)*w;ctx.strokeStyle='#f1e4c9';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(18,h-25);ctx.lineTo(18+pixels,h-25);ctx.stroke();ctx.textAlign='left';ctx.fillStyle='#f1e4c9';ctx.fillText('200 m',18,h-33);
 if(!mini){$('#sites-map-key').hidden=!nav.sites;$('#clear-target').hidden=!nav.target;$('#gps-status').textContent=nav.target?'GPS · '+nav.target.name+(outsideDriving(nav.target,area.bounds)?' · Beyond the driving area':''):'';$('#race-map-key').hidden=!racing;$('#best-lap').hidden=!racing;}
 if(!mini)$('#best-lap').textContent=progress.bests[selected]?`${KITS[selected].name} · best lap ${clock(progress.bests[selected])}`:'Your lap records will appear here.';
}
function gateGeometry(){const v=[];for(const side of [-1,1]){box(v,side*46-1,-1,0,2,2,25,[.63,.83,.67]);triangle(v,[side*46,0,25],[side*46+side*10,0,21],[side*46,0,17],[.76,.91,.7]);}return gpu.upload(new Float32Array(v));}
let posts;
function wayfinding(){
 const c=$('#wayfinding'),w=c.clientWidth,h=c.clientHeight;c.width=w;c.height=h;const ctx=c.getContext('2d');
 if(state.mode==='free'&&Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<1000){ctx.strokeStyle='#cfe8b377';ctx.lineWidth=1;ctx.beginPath();let pen=false;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,x=raceSite.x+Math.cos(a)*raceSite.radius,y=raceSite.y+Math.sin(a)*raceSite.radius,q=gpu.project(x,y,area.ground(x,y)+.5);if(q.depth<=4){pen=false;continue;}if(pen)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);pen=true;}ctx.stroke();}
 const racing=state.mode==='trial';if(!racing&&!nav.target)return;
 const target=racing?(area.course.gates[state.nextGate]??area.course.finish):nav.target,ground=(area.visualGround??area.ground)(target.x,target.y),q=gpu.project(target.x,target.y,ground+32);
 // Only the next gate is shown in-world; the following gate is retained on the map.
 if(racing)gpu.mesh(posts,[target.x,target.y,ground,target.heading],7);
 const onscreen=racing&&q.depth>4&&q.x>35&&q.x<w-35&&q.y>145&&q.y<h-140;const meters=Math.round(Math.hypot(target.x-state.x,target.y-state.y)/4);
 ctx.font='600 14px system-ui';ctx.textAlign='center';ctx.fillStyle='#e6f2cc';ctx.strokeStyle='#182f2b';ctx.lineWidth=4;
 const label=(racing?(state.nextGate<area.course.gates.length?`Gate ${state.nextGate+1}`:'Finish'):target.name)+` · ${meters} m`;
 if(onscreen){ctx.strokeText(label,q.x,q.y-8);ctx.fillText(label,q.x,q.y-8);ctx.beginPath();ctx.arc(q.x,q.y+10,7,0,Math.PI*2);ctx.stroke();ctx.fill();}
 else{const angle=Math.atan2(target.x-state.x,-(target.y-state.y))-gpu.camera.h,dx=Math.sin(angle),dy=-Math.cos(angle),cx=w/2,cy=h/2,r=Math.min(w*.35,h*.29),x=cx+dx*r,y=cy+dy*r;ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(8,7);ctx.lineTo(-8,7);ctx.closePath();ctx.stroke();ctx.fill();ctx.restore();ctx.strokeText(label,w/2,h>500?155:87);ctx.fillText(label,w/2,h>500?155:87);}
}
function placeLamps(){const r=gpu.roverScreenBounds,b=$('#lamps');b.hidden=paused||welcome||!r;if(b.hidden)return;const w=Math.max(44,r.right-r.left),h=Math.max(44,r.bottom-r.top);b.style.left=(r.left+r.right-w)/2+'px';b.style.top=(r.top+r.bottom-h)/2+'px';b.style.width=w+'px';b.style.height=h+'px';b.setAttribute('aria-pressed',String(gpu.lampStrength>0));}
function draw(dt){gpu.quality=quality;gpu.storm=storm;const shown=paused?state:displayState(previous,state,acc*60,area.ground(state.x,state.y));gpu.draw(shown,dt,$('#labels'));sky.draw(gpu,shown);wayfinding();activityLayer.draw(gpu,area,state,!paused&&!welcome&&state.mode==='free',[]);placeLamps();landmarkLayer.draw(gpu,area,state,landmarkLabels&&!paused&&!welcome,[...document.querySelectorAll('header,.controls,#mini-map-button,#race-hud,#toast,#lamps,#entry-loading')].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect()));}
function step(dt){previous=capturePose(state,area.ground(state.x,state.y));driveStep(state,input,dt,area.course,area);storm.tick(dt,state,()=>gpu.tracks.reset());
 // Each ground-level entry opens the observation, including return visits.
 for(const [i,p]of discoveries.entries()){const distance=Math.hypot(state.x-p.x,state.y-p.y);if(distance>48)observedInside.delete(i);if(state.mode!=='trial'&&!state.air&&!state.turnaround&&distance<32&&!observedInside.has(i)){observedInside.add(i);if(!state.collected.includes(i))state.collected.push(i);progress.collected=[...state.collected];save();updateHud();showDiscovery(i);break;}}
 if(state.mode==='trial'&&state.done)finishLap();
 if(!paused){const inside=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<raceSite.radius;if(!inside)entryArmed=true;entryTime=entryArmed?advanceEntry(entryTime,state,dt):0;if(entryTime>=raceSite.dwell)startLap();}
}

function frame(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(ready){if(!paused){acc+=dt;while(acc>=1/60&&!paused){step(1/60);acc-=1/60;}if(t-lastDraw>=(quality==='performance'?32:0)){draw(Math.min(.05,(t-lastDraw)/1000));lastDraw=t;}if(t-lastSave>3000){save();lastSave=t;}}else if(dirty){draw(0);dirty=false;}
 if(t-lastHud>100){updateHud();lastHud=t;}if(t-lastMap>200){drawMap($('#mini-map'),true);if($('#map-dialog').open)drawMap();lastMap=t;}}
 requestAnimationFrame(frame);}
$('#discovery-continue').onclick=closeSheet;
$('#explore').onclick=explore;$('#welcome-lap').onclick=()=>{explore();guideToRace();};$('#start-lap').onclick=guideToRace;$('#map-lap').onclick=guideToRace;$('#race-again').onclick=startLap;$('#result-explore').onclick=explore;
$('#pause-button').onclick=()=>openDialog('#pause-dialog');$('#map-button').onclick=$('#mini-map-button').onclick=()=>openDialog('#map-dialog');$('#resume').onclick=()=>{closeDialogs();exploreOrResume();};
function exploreOrResume(){if(welcome)explore();else setPause(false);}
$('#end-lap').onclick=endLap;
$('#return-start').onclick=()=>{resetAt(area.start);explore();};
$('#field-notes').onclick=()=>openDialog('#notes-dialog','#pause-dialog');$('#map-notes').onclick=()=>openDialog('#notes-dialog','#map-dialog');
for(const b of document.querySelectorAll('[data-close]'))b.onclick=closeSheet;
for(const d of document.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='result-dialog')explore();else closeSheet();});
$('#choose-craft').onclick=async()=>{closeDialogs();setPause(true);try{await openCraft(selected,id=>{if(state.mode==='trial')endLap();selected=id;state.roverId=id;state.tune=kit(id);state.v=state.vz=state.boost=0;state.air=false;state.z=area.ground(state.x,state.y);previous=capturePose(state,state.z);gpu.reset(state);dirty=true;save();});const d=$('#craft-dialog');d.addEventListener('close',()=>openDialog('#pause-dialog'),{once:true});}catch{openDialog('#pause-dialog');notify('Rover selection could not load. Try again.');}};
$('#light').onchange=e=>{light=e.target.value;lighting();dirty=true;save();};$('#quality').onchange=e=>{quality=e.target.value;dirty=true;save();};$('#storm').onclick=()=>{storm.start(state);closeDialogs();exploreOrResume();};
$('#landmark-labels-setting').onchange=e=>{landmarkLabels=e.target.checked;dirty=true;save();};
$('#lamps').onclick=()=>{gpu.headlightsOverride=!(gpu.lampStrength>0);dirty=true;};
for(const id of ['left','right','drive','brake']){const b=$('#'+id);b.onpointerdown=e=>{if(paused)return;e.preventDefault();b.setPointerCapture(e.pointerId);pointers.set(e.pointerId,id);b.classList.add('active');sync();};const release=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(id))b.classList.remove('active');sync();};b.onpointerup=release;b.onpointercancel=release;b.onlostpointercapture=release;}
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||!ready||e.target.closest('input,select,summary,a')||(e.target.closest('button')&&[' ','Enter'].includes(e.key))||(e.target===$('#lamps')&&[' ','Enter'].includes(e.key)))return;if(e.key==='Escape'){e.preventDefault();openDialog('#pause-dialog');return;}const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(!paused){keys.add(k);sync();}}});addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());sync();});
addEventListener('blur',()=>{if(ready&&!paused)openDialog('#pause-dialog');});document.addEventListener('visibilitychange',()=>{if(document.hidden&&ready){if(!paused)openDialog('#pause-dialog');save();}});addEventListener('pagehide',save);addEventListener('resize',()=>{dirty=true;});
for(const event of ['contextmenu','selectstart'])$('.controls').addEventListener(event,e=>e.preventDefault());
try{
 area=await loadArea();readSave();gpu=new GPURenderer($('#world'),area);gpu.shadowMode='none';gpu.softSurfaceLighting=true;gpu.flightLighting=1;posts=gateGeometry();storm.southBoundary=area.bounds.maxY+1600;resetAt(progress.position??{...area.start,heading:-.4});for(const i of progress.collected)if(Math.hypot(state.x-discoveries[i].x,state.y-discoveries[i].y)<48)observedInside.add(i);entryArmed=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)>=raceSite.radius;ready=true;$('#quality').value=quality;$('#light').value=light;$('#landmark-labels-setting').checked=landmarkLabels;$('#geology-layer').checked=nav.geology;$('#sites-layer').checked=nav.sites;$('#loading').hidden=true;
 if(progress.position||progress.collected.length){welcome=false;$('#welcome').hidden=true;openDialog('#pause-dialog');}
 $('#world').addEventListener('webglcontextlost',e=>{e.preventDefault();setPause(true);ready=false;$('#loading').hidden=false;$('#loading h2').textContent='The graphics paused.';$('#loading p').textContent='Your saved discoveries are safe.';const b=document.createElement('button');b.textContent='Reload terrain';b.onclick=()=>location.reload();$('#loading').append(b);});
 window.__jezero={get state(){return state},area,gpu,storm,progress,get paused(){return paused},get input(){return input},landmarks,nav,raceSite,get entryTime(){return entryTime},get landmarkLabels(){return landmarkLabels},resetAt,step,draw,startLap,explore,setPause,save,openDialog};requestAnimationFrame(frame);
}catch(e){console.error(e);$('#loading h2').textContent='Could not prepare Three Forks';$('#loading p').textContent=e.message;const b=document.createElement('button');b.textContent='Try again';b.onclick=()=>location.reload();$('#loading').append(b);}

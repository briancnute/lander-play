import {mapBounds,geology,raceSite,mapTarget,advanceEntry,CLOSE_RANGE,regionAt,reachableTarget} from './navigation.js';
import {loadArea,discoveries,SITE_VERSION} from './area.js';
import {landmarks} from './landmarks.js';
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
let area,gpu,state,previous,paused=true,ready=false,welcome=true,last=0,acc=0,lastDraw=0,lastSave=0,lastMap=0,lastHud=0,dirty=true,selected='perseverance',quality='balanced',light='day',backTo=null,saveWarned=false;
const nav={target:null,labels:false};let cardSite=null,mapReturn=null;let entryTime=0,entryArmed=true;const observedInside=new Set();
const input={drive:false,brake:false,steer:0},keys=new Set(),pointers=new Map();
const progress={seenLandmarks:[],collected:[],bests:{},rover:'perseverance',position:null};
const storm=new StormFront(),sky=new NightSky($('#night-sky')),relief=new Image();relief.src=new URL('./assets/relief.webp',import.meta.url).href;
function readSave(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(!s||s.version!==SITE_VERSION)return;
 progress.collected=Array.isArray(s.collected)?[...new Set(s.collected.filter(i=>Number.isInteger(i)&&i>=0&&i<discoveries.length))]:[];
 if(s.bests&&typeof s.bests==='object')for(const id of Object.keys(KITS))if(Number.isFinite(s.bests[id])&&s.bests[id]>0)progress.bests[id]=s.bests[id];
 if(s.navigation?.target){const t=s.navigation.target;if(Number.isFinite(t.x)&&Number.isFinite(t.y)&&t.x>=0&&t.x<=12000&&t.y>=0&&t.y<=12000)nav.target=reachableTarget(t,area.bounds);}
 nav.labels=s.navigation?.labels===true;
 progress.seenLandmarks=Array.isArray(s.seenLandmarks)?[...new Set(s.seenLandmarks.filter(id=>landmarks.some(p=>p.id===id)))]:[];
 if(KITS[s.rover])selected=s.rover;
 if(['balanced','performance'].includes(s.quality))quality=s.quality;if(['day','dusk','night'].includes(s.light))light=s.light;
 if(s.position&&['x','y','heading'].every(k=>Number.isFinite(s.position[k]))){const p=s.position,b=area.bounds;if(p.x>b.minX+100&&p.x<b.width-100&&p.y>b.minY+100&&p.y<b.maxY-100)progress.position=p;}
 }catch{/* Corrupt or unavailable storage cannot prevent exploration. */}}
function save(){if(!ready)return;const position=state.mode==='free'&&!state.air&&!state.turnaround?{x:state.x,y:state.y,heading:state.heading}:progress.position;
 try{localStorage.setItem(KEY,JSON.stringify({version:SITE_VERSION,collected:progress.collected,bests:progress.bests,rover:selected,position,quality,light,seenLandmarks:progress.seenLandmarks,navigation:nav}));progress.position=position;}catch{if(!saveWarned){saveWarned=true;notify('Progress cannot be saved in this browser.');}}}
function notify(text,seconds=5){state.message=text;state.messageUntil=state.t+seconds;dirty=true;}
function sync(){const held=new Set(pointers.values());input.drive=keys.has('w')||keys.has('arrowup')||held.has('drive');input.brake=keys.has(' ')||keys.has('arrowdown')||keys.has('s')||held.has('brake');input.steer=(keys.has('d')||keys.has('arrowright')||held.has('right')?1:0)-(keys.has('a')||keys.has('arrowleft')||held.has('left')?1:0);}
function clearInput(){keys.clear();pointers.clear();sync();document.querySelectorAll('.controls .active').forEach(b=>b.classList.remove('active'));}
function lighting(){state.solar=light==='night'?{east:0,north:0,up:-1}:light==='dusk'?{east:-.65,north:.759,up:.05}:{east:-.45,north:.6,up:.66};$('#scene').style.background=light==='night'?'linear-gradient(#03060c,#080c14 65%,#151720)':light==='dusk'?'linear-gradient(#211c2c,#775751 58%,#745b51)':'linear-gradient(#75482f,#be8b62 53%,#b48059)';}
function resetAt(p=area.start,mode='free'){
 state=create(mode,area.course,selected);Object.assign(state,{x:p.x,y:p.y,heading:p.heading??-Math.PI*.35,z:area.ground(p.x,p.y),tune:kit(selected),collected:[...progress.collected],messageUntil:0});
 previous=capturePose(state,state.z);gpu.reset(state);acc=0;clearInput();lighting();dirty=true;updateHud();
}
function closeDialogs(){for(const d of document.querySelectorAll('dialog[open]'))d.close();backTo=null;}
function setPause(value){paused=value;clearInput();acc=0;if(state)previous=capturePose(state,area.ground(state.x,state.y));$('#lamps').hidden=true;dirty=true;if(value)save();else if(document.activeElement instanceof HTMLElement)document.activeElement.blur();}
function openDialog(id,caller=null){closeDialogs();backTo=caller;setPause(true);$(id).showModal();if(id==='#pause-dialog')$('#resume').textContent=state.mode==='trial'?'Resume lap':'Continue exploring';if(id==='#map-dialog'){$('#site-labels').checked=nav.labels;drawMap();}if(id==='#notes-dialog')renderNotes();}
function closeSheet(){const back=backTo;if($('#map-dialog').open&&mapReturn){const r=mapReturn;mapReturn=null;showCard(r.site,r.caller,r.site.kind);notesReturn=r.notes;return;}closeDialogs();if(back)openDialog(back,back==='#notes-dialog'?notesReturn:back==='#map-dialog'&&mapReturn?'#discovery-dialog':null);else setPause(false);}
function explore(){welcome=false;$('#welcome').hidden=true;closeDialogs();state.mode='free';state.done=false;state.countdown=0;setPause(false);updateHud();save();}
function startLap(){entryTime=0;entryArmed=false;$('#scene').classList.remove('race-transition');void $('#scene').offsetWidth;$('#scene').classList.add('race-transition');welcome=false;$('#welcome').hidden=true;closeDialogs();resetAt(area.start,'trial');setPause(false);notify('Delta circuit',2);}
function endLap(){state.mode='free';state.done=false;state.countdown=0;state.time=0;notify('Explore freely');updateHud();save();}
function finishLap(){const time=state.time,old=progress.bests[selected];if(!old||time<old)progress.bests[selected]=time;
 $('#result-time').textContent=clock(time);$('#result-best').textContent=!old||time<old?'Your best in this rover':`Best · ${clock(old)}`;
 state.mode='free';state.done=false;state.countdown=0;state.v=0;openDialog('#result-dialog');updateHud();save();}
let currentRegion='';
function updateHud(){if(!state)return;const region=regionAt(state);if(region!==currentRegion){currentRegion=region;$('#region-name').textContent=region;}$('#race-hud').hidden=state.mode!=='trial';$('#gate-count').textContent=state.nextGate<area.course.gates.length?`Gate ${state.nextGate+1} / ${area.course.gates.length}`:'Finish';$('#timer').textContent=state.countdown>0?String(Math.ceil(state.countdown)):clock(state.time);$('#brake').textContent=reverseAvailable(state,[])?'Reverse':'Brake';$('#entry-loading').hidden=paused||entryTime<=0;$('#entry-loading progress').value=entryTime;$('#toast').textContent=welcome?'':state.boundary?'Return toward Three Forks':state.messageUntil>state.t?state.message:'';}

let notesReturn=null;
function showCard(p,caller,kind){if(caller==='#notes-dialog')notesReturn=backTo;
 cardSite=p;$('#discovery-dialog').dataset.kind=kind;
 $('#discovery-kind').textContent=kind==='site'?'JEZERO / VIEWPOINT':'JEZERO / FACT';
 $('#discovery-title').textContent=p.name;$('#discovery-fact').textContent=p.fact;$('#discovery-detail').textContent=p.detail;
 const img=$('#discovery-image'),choices=$('#discovery-views');choices.replaceChildren();choices.hidden=!p.views?.length;
 const views=[{...p,label:'2021 · Iconic view'},...(p.views??[])];
 function selectView(v,i){img.hidden=false;img.onerror=()=>{img.hidden=true;};img.src=new URL(v.image,import.meta.url).href;img.alt=v.imageAlt;
  $('#discovery-credit').textContent=v.imageCredit+(kind==='site'?' · Real landmark; reference camera differs from this view.':' · Regional reference; not a matched view from this stop.');
  $('#discovery-source').href=v.source;$('#discovery-source').textContent='Image source ↗';[...choices.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
 }
 if(p.views?.length)views.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=v.label;b.onclick=()=>selectView(v,i);choices.append(b);});
 selectView(views[0],0);openDialog('#discovery-dialog',caller);drawCardMap();
 $('#discovery-continue').textContent=caller?'Back to Field Notes':state.mode==='trial'?'Resume time trial':'Continue exploring';
}
function showDiscovery(i,caller=null){const p=discoveries[i];if(p&&progress.collected.includes(i))showCard(p,caller,p.kind);}
function setMapTarget(x,y,w,h){const target=mapTarget(x,y,w,h,area.bounds),old=nav.target;const same=old&&Math.hypot((old.x-target.x)/12000*w,(old.y-target.y)/12000*h)<12;nav.target=same||Math.hypot(target.x-state.x,target.y-state.y)<=CLOSE_RANGE?null:target;save();drawMap();drawMap($('#mini-map'),true);dirty=true;}
$('#clear-target').onclick=()=>{nav.target=null;save();drawMap();drawMap($('#mini-map'),true);dirty=true;};
$('#map').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();setMapTarget(e.clientX-r.left,e.clientY-r.top,r.width,r.height);};
let mapCursor={x:.5,y:.5};$('#map').onkeydown=e=>{const moves={ArrowLeft:[-.025,0],ArrowRight:[.025,0],ArrowUp:[0,-.025],ArrowDown:[0,.025]};if(moves[e.key]){e.preventDefault();mapCursor.x=Math.max(0,Math.min(1,mapCursor.x+moves[e.key][0]));mapCursor.y=Math.max(0,Math.min(1,mapCursor.y+moves[e.key][1]));$('#map').dataset.cursor=JSON.stringify(mapCursor);drawMap();}if(e.key==='Enter'){e.preventDefault();const r=$('#map').getBoundingClientRect();setMapTarget(mapCursor.x*r.width,mapCursor.y*r.height,r.width,r.height);}};
$('#map').onblur=()=>{delete $('#map').dataset.cursor;drawMap();};
function renderNotes(){
 $('#notes-back').textContent=backTo==='#pause-dialog'?'Explore':'Map';$('#notes-progress').textContent=`${progress.collected.length} / ${discoveries.length} collected`;
 $('#notes').replaceChildren(...discoveries.map((p,i)=>{const known=progress.collected.includes(i),read=known;const a=document.createElement('article');a.className='journal-card';a.dataset.kind=p.kind;const badge=document.createElement('small');badge.textContent=p.kind==='site'?'VIEWPOINT':'FACT';const h=document.createElement('h3');h.textContent=read?p.name:'???';a.append(badge,h);
 if(read){const img=document.createElement('img');img.src=new URL(p.image,import.meta.url).href;img.alt=p.imageAlt;img.loading='lazy';a.prepend(img);const fact=document.createElement('p');fact.textContent=p.fact;const b=document.createElement('button');b.textContent=known?'Open entry':'Previously viewed';b.onclick=()=>showCard(p,'#notes-dialog',p.kind);a.append(fact,b);}else{const hint=document.createElement('p');hint.textContent='Find this orb while exploring.';a.append(hint);}return a;}));
}
function mapPoint(p,w,h){const b=mapBounds;return {x:(p.x-b.minX)/(b.width-b.minX)*w,y:(p.y-b.minY)/(b.maxY-b.minY)*h};}
function drawMap(c=$('#map'),mini=false){
 const rect=c.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height),dpr=Math.min(2,devicePixelRatio);c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);ctx.fillStyle='#8a6346';ctx.fillRect(0,0,w,h);if(relief.complete&&relief.naturalWidth)ctx.drawImage(relief,0,0,w,h);ctx.fillStyle='#1e242233';ctx.fillRect(0,0,w,h);
 const occupied=[];
 function mapLabel(text,q,offset){const tw=ctx.measureText(text).width;let chosen;for(const dy of [offset,offset+14,offset-14,offset+28,offset-28,offset+42,offset-42]){const x=Math.max(tw/2+3,Math.min(w-tw/2-3,q.x)),y=Math.max(12,Math.min(h-4,q.y+dy)),r={x:x-tw/2-2,y:y-10,w:tw+4,h:13};if(!occupied.some(a=>r.x<a.x+a.w&&r.x+r.w>a.x&&r.y<a.y+a.h&&r.y+r.h>a.y)){chosen={x,y,r};break;}}if(!chosen)return;occupied.push(chosen.r);if(Math.abs(chosen.y-q.y)>18){ctx.strokeStyle='#e7dbb866';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(chosen.x,chosen.y-5);ctx.stroke();}ctx.fillText(text,chosen.x,chosen.y);}
 c.dataset.geologyVisible=String(!mini);c.dataset.sitesVisible='true';c.dataset.raceVisible=String(!mini&&state.mode==='trial');c.dataset.targetVisible=String(!!nav.target);
 if(!mini){
  if(state.mode==='trial'){ctx.strokeStyle='#efddaf80';ctx.lineWidth=1;ctx.setLineDash([3,4]);ctx.beginPath();area.course.route.forEach((p,i)=>{const q=mapPoint(p,w,h);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.closePath();ctx.stroke();ctx.setLineDash([]);for(const p of [...area.course.gates,area.course.finish]){const q=mapPoint(p,w,h);ctx.beginPath();ctx.arc(q.x,q.y,2,0,Math.PI*2);ctx.fillStyle='#d6e6bd';ctx.fill();}}
  ctx.textAlign='center';ctx.font=`${w<260?9:11}px system-ui`;ctx.fillStyle='#f1e4c9';for(const p of geology){const q=mapPoint(p,w,h);mapLabel(p.name,q,-10);}
  const flag=mapPoint(raceSite,w,h);ctx.strokeStyle='#ecedda';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(flag.x,flag.y+5);ctx.lineTo(flag.x,flag.y-8);ctx.stroke();for(let y=0;y<3;y++)for(let x=0;x<4;x++){ctx.fillStyle=(x+y)%2?'#142b28':'#f5e8c9';ctx.fillRect(flag.x+x*2,flag.y-8+y*2,2,2);}
  if(c.dataset.cursor){const cursor=JSON.parse(c.dataset.cursor);ctx.strokeStyle='#fff8';ctx.lineWidth=1;ctx.strokeRect(cursor.x*w-4,cursor.y*h-4,8,8);}
 }
 for(const [i,p] of discoveries.entries()){const q=mapPoint(p,w,h);ctx.fillStyle=p.kind==='site'?'#a8d9df':'#f4da9c';ctx.globalAlpha=mini?.55:1;ctx.beginPath();ctx.arc(q.x,q.y,mini?.7:2.5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;if(!mini&&nav.labels){ctx.font=`${w<260?8:10}px system-ui`;ctx.textAlign='center';const name=progress.collected.includes(i)?p.name:'???';mapLabel(name,q,12);}}
  const rover=mapPoint(state,w,h);ctx.save();ctx.translate(rover.x,rover.y);ctx.rotate(state.heading);ctx.fillStyle='#e2ffe3';ctx.strokeStyle='#16332d';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-6);ctx.lineTo(4,4);ctx.lineTo(0,2);ctx.lineTo(-4,4);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
 if(!mini&&mapReturn){const q=mapPoint(mapReturn.site,w,h);ctx.strokeStyle='#fff0ba';ctx.lineWidth=1;ctx.beginPath();ctx.arc(q.x,q.y,8,0,Math.PI*2);ctx.stroke();}
 if(nav.target){const q=mapPoint(nav.target,w,h);ctx.strokeStyle='#c6f5df';ctx.lineWidth=1;ctx.beginPath();ctx.arc(q.x,q.y,mini?2:3,0,Math.PI*2);ctx.moveTo(q.x-5,q.y);ctx.lineTo(q.x+5,q.y);ctx.moveTo(q.x,q.y-5);ctx.lineTo(q.x,q.y+5);ctx.stroke();}
 if(!mini)$('#clear-target').hidden=!nav.target;
}
$('#site-labels').onchange=e=>{nav.labels=e.target.checked;save();drawMap();};
function drawCardMap(){const c=$('#discovery-map'),w=240,h=240;c.width=w*2;c.height=h*2;const ctx=c.getContext('2d');ctx.scale(2,2);ctx.fillStyle='#896342';ctx.fillRect(0,0,w,h);if(relief.complete&&relief.naturalWidth)ctx.drawImage(relief,0,0,w,h);const q=mapPoint(cardSite,w,h);ctx.strokeStyle='#fff0ba';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,12,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff0ba';ctx.beginPath();ctx.arc(q.x,q.y,2,0,Math.PI*2);ctx.fill();}
$('#discovery-map-button').onclick=()=>{mapReturn={caller:backTo,notes:notesReturn,site:cardSite};nav.labels=true;openDialog('#map-dialog','#discovery-dialog');};
function gateGeometry(){const v=[];for(const side of [-1,1]){box(v,side*46-1,-1,0,2,2,25,[.63,.83,.67]);triangle(v,[side*46,0,25],[side*46+side*10,0,21],[side*46,0,17],[.76,.91,.7]);}return gpu.upload(new Float32Array(v));}
let posts;
function wayfinding(){
 const c=$('#wayfinding'),w=c.clientWidth,h=c.clientHeight;c.width=w;c.height=h;const ctx=c.getContext('2d');
 if(state.mode==='free'&&Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<1000){ctx.strokeStyle='#cfe8b377';ctx.lineWidth=1;ctx.beginPath();let pen=false;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,x=raceSite.x+Math.cos(a)*raceSite.radius,y=raceSite.y+Math.sin(a)*raceSite.radius,q=gpu.project(x,y,area.ground(x,y)+.5);if(q.depth<=4){pen=false;continue;}if(pen)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);pen=true;}ctx.stroke();}
 const racing=state.mode==='trial';c.dataset.direction='none';if(!racing){if(!nav.target||paused||welcome)return;const a=Math.atan2(nav.target.x-state.x,-(nav.target.y-state.y))-gpu.camera.h,angle=Math.atan2(Math.sin(a),Math.cos(a)),halfView=Math.atan(w/(2*Math.min(w*.95,h*.9)));if(Math.abs(angle)<=halfView)return;const right=angle>0,x=right?w-22:22,y=h*.44;c.dataset.direction=right?'right':'left';ctx.strokeStyle='#ddedd1';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+(right?-4:4),y-7);ctx.lineTo(x+(right?3:-3),y);ctx.lineTo(x+(right?-4:4),y+7);ctx.stroke();return;}
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
function draw(dt){gpu.quality=quality;gpu.storm=storm;const shown=paused?state:displayState(previous,state,acc*60,area.ground(state.x,state.y));gpu.draw(shown,dt,$('#labels'));sky.draw(gpu,shown);wayfinding();placeLamps();}

function step(dt){previous=capturePose(state,area.ground(state.x,state.y));driveStep(state,input,dt,area.course,area.driveArea);storm.tick(dt,state,()=>gpu.tracks.reset());
 // Each ground-level entry opens the observation, including return visits.
 for(const [i,p]of discoveries.entries()){const distance=Math.hypot(state.x-p.x,state.y-p.y);if(distance>CLOSE_RANGE)observedInside.delete(i);if(state.mode!=='trial'&&!state.air&&!state.turnaround&&distance<8&&!observedInside.has(i)){observedInside.add(i);if(!state.collected.includes(i))state.collected.push(i);progress.collected=[...state.collected];state.v=0;state.vz=0;state.boost=0;if(p.focus){state.heading=Math.atan2(p.focus.x-state.x,-(p.focus.y-state.y));gpu.camera={x:state.x,y:state.y,h:state.heading};gpu.bodySlope=null;}previous=capturePose(state,area.ground(state.x,state.y));save();updateHud();showDiscovery(i);break;}}
 if(nav.target&&Math.hypot(state.x-nav.target.x,state.y-nav.target.y)<=CLOSE_RANGE){nav.target=null;save();dirty=true;}
 if(state.mode==='trial'&&state.done)finishLap();
 if(!paused){const inside=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<raceSite.radius;if(!inside)entryArmed=true;entryTime=entryArmed?advanceEntry(entryTime,state,dt):0;if(entryTime>=raceSite.dwell)startLap();}
}

function frame(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(ready){if(!paused){acc+=dt;while(acc>=1/60&&!paused){step(1/60);acc-=1/60;}if(t-lastDraw>=(quality==='performance'?32:0)){draw(Math.min(.05,(t-lastDraw)/1000));lastDraw=t;}if(t-lastSave>3000){save();lastSave=t;}}else if(dirty){draw(0);dirty=false;}
 if(t-lastHud>100){updateHud();lastHud=t;}if(t-lastMap>200){drawMap($('#mini-map'),true);if($('#map-dialog').open)drawMap();lastMap=t;}}
 requestAnimationFrame(frame);}
$('#discovery-continue').onclick=closeSheet;
$('#explore').onclick=explore;$('#race-again').onclick=startLap;$('#result-explore').onclick=explore;
$('#pause-button').onclick=()=>openDialog('#pause-dialog');$('#mini-map-button').onclick=()=>{mapReturn=null;openDialog('#map-dialog');};$('#resume').onclick=()=>{closeDialogs();exploreOrResume();};
function exploreOrResume(){if(welcome)explore();else setPause(false);}
$('#end-lap').onclick=endLap;
$('#return-start').onclick=()=>{resetAt(area.start);explore();};
$('#field-notes').onclick=()=>openDialog('#notes-dialog','#pause-dialog');$('#map-notes').onclick=()=>openDialog('#notes-dialog','#map-dialog');$('#notes-back').onclick=closeSheet;
for(const b of document.querySelectorAll('[data-close]'))b.onclick=closeSheet;
for(const d of document.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='result-dialog')explore();else closeSheet();});
$('#choose-craft').onclick=async()=>{closeDialogs();setPause(true);try{await openCraft(selected,id=>{if(state.mode==='trial')endLap();selected=id;state.roverId=id;state.tune=kit(id);state.v=state.vz=state.boost=0;state.air=false;state.z=area.ground(state.x,state.y);previous=capturePose(state,state.z);gpu.reset(state);dirty=true;save();});const d=$('#craft-dialog');d.addEventListener('close',()=>openDialog('#pause-dialog'),{once:true});}catch{openDialog('#pause-dialog');notify('Rover selection could not load. Try again.');}};
$('#light').onchange=e=>{light=e.target.value;lighting();dirty=true;save();};$('#quality').onchange=e=>{quality=e.target.value;dirty=true;save();};$('#storm').onclick=()=>{storm.start(state);closeDialogs();exploreOrResume();};

$('#lamps').onclick=()=>{gpu.headlightsOverride=!(gpu.lampStrength>0);dirty=true;};
for(const id of ['left','right','drive','brake']){const b=$('#'+id);b.onpointerdown=e=>{if(paused)return;e.preventDefault();b.setPointerCapture(e.pointerId);pointers.set(e.pointerId,id);b.classList.add('active');sync();};const release=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(id))b.classList.remove('active');sync();};b.onpointerup=release;b.onpointercancel=release;b.onlostpointercapture=release;}
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||!ready||e.target.closest('input,select,summary,a')||(e.target.closest('button')&&[' ','Enter'].includes(e.key))||(e.target===$('#lamps')&&[' ','Enter'].includes(e.key)))return;if(e.key==='Escape'){e.preventDefault();openDialog('#pause-dialog');return;}const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(!paused){keys.add(k);sync();}}});addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());sync();});
addEventListener('blur',()=>{if(ready&&!paused)openDialog('#pause-dialog');});document.addEventListener('visibilitychange',()=>{if(document.hidden&&ready){if(!paused)openDialog('#pause-dialog');save();}});addEventListener('pagehide',save);addEventListener('resize',()=>{dirty=true;});
for(const event of ['contextmenu','selectstart'])$('.controls').addEventListener(event,e=>e.preventDefault());
try{
 area=await loadArea();readSave();gpu=new GPURenderer($('#world'),area);gpu.shadowMode='none';gpu.softSurfaceLighting=true;gpu.flightLighting=1;posts=gateGeometry();storm.southBoundary=area.bounds.maxY+1600;resetAt(progress.position??{...area.start,heading:-.4});for(const i of progress.collected)if(Math.hypot(state.x-discoveries[i].x,state.y-discoveries[i].y)<CLOSE_RANGE)observedInside.add(i);entryArmed=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)>=raceSite.radius;ready=true;$('#quality').value=quality;$('#light').value=light;$('#loading').hidden=true;
 if(progress.position||progress.collected.length){welcome=false;$('#welcome').hidden=true;openDialog('#pause-dialog');}
 $('#world').addEventListener('webglcontextlost',e=>{e.preventDefault();setPause(true);ready=false;$('#loading').hidden=false;$('#loading h2').textContent='The graphics paused.';$('#loading p').textContent='Your saved discoveries are safe.';const b=document.createElement('button');b.textContent='Reload terrain';b.onclick=()=>location.reload();$('#loading').append(b);});
 window.__jezero={get state(){return state},area,gpu,storm,progress,get paused(){return paused},get input(){return input},landmarks,nav,raceSite,get entryTime(){return entryTime},resetAt,step,draw,startLap,explore,setPause,save,openDialog};requestAnimationFrame(frame);
}catch(e){console.error(e);$('#loading h2').textContent='Could not prepare Three Forks';$('#loading p').textContent=e.message;const b=document.createElement('button');b.textContent='Try again';b.onclick=()=>location.reload();$('#loading').append(b);}

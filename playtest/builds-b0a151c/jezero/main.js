import {loadArea,discoveries,SITE_VERSION} from './area.js';
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
const input={drive:false,brake:false,steer:0},keys=new Set(),pointers=new Map();
const progress={collected:[],bests:{},rover:'perseverance',position:null};
const storm=new StormFront(),sky=new NightSky($('#night-sky')),relief=new Image();relief.src=new URL('./assets/relief.webp',import.meta.url).href;
function readSave(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(!s||s.version!==SITE_VERSION)return;
 progress.collected=Array.isArray(s.collected)?[...new Set(s.collected.filter(i=>Number.isInteger(i)&&i>=0&&i<3))]:[];
 if(s.bests&&typeof s.bests==='object')for(const id of Object.keys(KITS))if(Number.isFinite(s.bests[id])&&s.bests[id]>0)progress.bests[id]=s.bests[id];
 if(KITS[s.rover])selected=s.rover;
 if(['balanced','performance'].includes(s.quality))quality=s.quality;if(['day','dusk','night'].includes(s.light))light=s.light;
 if(s.position&&['x','y','heading'].every(k=>Number.isFinite(s.position[k]))){const p=s.position,b=area.bounds;if(p.x>b.minX+100&&p.x<b.width-100&&p.y>b.minY+100&&p.y<b.maxY-100)progress.position=p;}
 }catch{/* Corrupt or unavailable storage cannot prevent exploration. */}}
function save(){if(!ready)return;const position=state.mode==='free'&&!state.air&&!state.turnaround?{x:state.x,y:state.y,heading:state.heading}:progress.position;
 try{localStorage.setItem(KEY,JSON.stringify({version:SITE_VERSION,collected:progress.collected,bests:progress.bests,rover:selected,position,quality,light}));progress.position=position;}catch{if(!saveWarned){saveWarned=true;notify('Progress cannot be saved in this browser.');}}}
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
function openDialog(id,caller=null){closeDialogs();backTo=caller;setPause(true);$(id).showModal();if(id==='#pause-dialog')$('#resume').textContent=state.mode==='trial'?'Resume lap':'Continue exploring';if(id==='#map-dialog')drawMap();if(id==='#notes-dialog')renderNotes();}
function closeSheet(){const back=backTo;closeDialogs();if(back)openDialog(back);else setPause(false);}
function explore(){welcome=false;$('#welcome').hidden=true;closeDialogs();state.mode='free';state.done=false;state.countdown=0;setPause(false);updateHud();save();}
function startLap(){welcome=false;$('#welcome').hidden=true;closeDialogs();resetAt(area.start,'trial');setPause(false);notify('Delta circuit',2);}
function endLap(){state.mode='free';state.done=false;state.countdown=0;state.time=0;notify('Explore freely');updateHud();save();}
function finishLap(){const time=state.time,old=progress.bests[selected];if(!old||time<old)progress.bests[selected]=time;
 $('#result-time').textContent=clock(time);$('#result-best').textContent=!old||time<old?'Your best in this rover':`Best · ${clock(old)}`;
 state.mode='free';state.done=false;state.countdown=0;state.v=0;openDialog('#result-dialog');updateHud();save();}
function updateHud(){if(!state)return;$('#count').textContent=`${progress.collected.length}/3`;$('#map-count').textContent=`${progress.collected.length} / 3`;$('#race-hud').hidden=state.mode!=='trial';$('#gate-count').textContent=state.nextGate<area.course.gates.length?`Gate ${state.nextGate+1} / ${area.course.gates.length}`:'Finish';$('#timer').textContent=state.countdown>0?String(Math.ceil(state.countdown)):clock(state.time);$('#brake').textContent=reverseAvailable(state,area.samples)?'Reverse':'Brake';$('#toast').textContent=welcome?'':state.boundary?'Return toward Three Forks':state.collecting>=0?'Observing…':state.messageUntil>state.t?state.message:'';}
function renderNotes(){
 $('#notes').replaceChildren(...discoveries.map((p,i)=>{const a=document.createElement('article'),h=document.createElement('h3');h.textContent=(progress.collected.includes(i)?'✓ ':'◇ ')+p.name;a.append(h);
 const text=document.createElement('p');text.textContent=progress.collected.includes(i)?p.fact:'Find this observation on the map.';a.append(text);
 if(progress.collected.includes(i)){const img=document.createElement('img');img.src=new URL(p.image,import.meta.url).href;img.alt='NASA view of Jezero’s delta front';img.loading='lazy';a.prepend(img);const d=document.createElement('details'),s=document.createElement('summary'),body=document.createElement('p'),link=document.createElement('a');s.textContent='The story';body.textContent=p.detail;link.href=p.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='NASA / JPL-Caltech · source ↗';d.append(s,body,link);a.append(d);}else a.classList.add('locked');return a;}));
}
function mapPoint(p,w,h){const b=area.bounds;return {x:(p.x-b.minX)/(b.width-b.minX)*w,y:(p.y-b.minY)/(b.maxY-b.minY)*h};}
function drawMap(c=$('#map'),mini=false){
 const rect=c.getBoundingClientRect(),w=Math.max(mini?100:300,rect.width),h=Math.max(mini?90:270,rect.height),dpr=Math.min(2,devicePixelRatio);c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);
 const b=area.bounds;ctx.fillStyle='#8a6346';ctx.fillRect(0,0,w,h);if(relief.complete&&relief.naturalWidth)ctx.drawImage(relief,b.minX/12000*601,b.minY/12000*601,(b.width-b.minX)/12000*601,(b.maxY-b.minY)/12000*601,0,0,w,h);
 ctx.fillStyle='#1e242233';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#efddaf91';ctx.lineWidth=1.5;ctx.setLineDash([4,5]);ctx.beginPath();area.course.route.forEach((p,i)=>{const q=mapPoint(p,w,h);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.closePath();ctx.stroke();ctx.setLineDash([]);
 const gates=[...area.course.gates,area.course.finish];gates.forEach((p,i)=>{const q=mapPoint(p,w,h),next=state.mode==='trial'&&i===state.nextGate,following=state.mode==='trial'&&i===state.nextGate+1;ctx.beginPath();ctx.arc(q.x,q.y,mini?(next?4:2):next?9:5,0,Math.PI*2);ctx.fillStyle=next?'#c2f1cb':following?'#edd9a4':'#23382bd0';ctx.fill();ctx.strokeStyle='#eddcb4';ctx.stroke();if(!mini&&(next||following)){ctx.fillStyle='#fff4d6';ctx.font='bold 12px system-ui';ctx.fillText(i===area.course.gates.length?'Finish':String(i+1),q.x+12,q.y+4);}});
 ctx.font='12px system-ui';ctx.textAlign='center';for(const [i,p]of discoveries.entries()){const q=mapPoint(p,w,h);ctx.fillStyle=progress.collected.includes(i)?'#bde5b8':'#f4da9c';ctx.beginPath();ctx.moveTo(q.x,q.y-6);ctx.lineTo(q.x+6,q.y);ctx.lineTo(q.x,q.y+6);ctx.lineTo(q.x-6,q.y);ctx.closePath();ctx.fill();if(mini)continue;const width=ctx.measureText(p.name).width,labelX=Math.max(width/2+6,Math.min(w-width/2-6,q.x));ctx.fillStyle='#18302de0';ctx.fillRect(labelX-width/2-5,q.y+10,width+10,21);ctx.fillStyle='#f1e4c9';ctx.fillText(p.name,labelX,q.y+25);}
 ctx.font=mini?'9px system-ui':'12px system-ui';const shortcut=mapPoint(toGame(350,-495),w,h);ctx.fillStyle='#e1d6b6';if(!mini)ctx.fillText('Shortcut',shortcut.x,shortcut.y-13);const jump=mapPoint(area.jump,w,h);ctx.fillStyle='#d5d7c1';ctx.fillText(mini?'↟':'↟ Jump',jump.x,jump.y+4);
 const p=mapPoint(state,w,h);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(state.heading);if(mini)ctx.scale(.65,.65);ctx.fillStyle='#e2ffe3';ctx.strokeStyle='#16332d';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(7,7);ctx.lineTo(0,3);ctx.lineTo(-7,7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
 // Physical scale comes from the terrain's 4 game units per metre.
 const metres=200,pixels=metres*4/(b.width-b.minX)*w;ctx.strokeStyle='#f1e4c9';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(18,h-25);ctx.lineTo(18+pixels,h-25);ctx.stroke();ctx.textAlign='left';ctx.fillStyle='#f1e4c9';ctx.fillText('200 m',18,h-33);
 if(!mini)$('#best-lap').textContent=progress.bests[selected]?`${KITS[selected].name} · best lap ${clock(progress.bests[selected])}`:'Your lap records will appear here.';
}
function gateGeometry(){const v=[];for(const side of [-1,1]){box(v,side*46-1,-1,0,2,2,25,[.63,.83,.67]);triangle(v,[side*46,0,25],[side*46+side*10,0,21],[side*46,0,17],[.76,.91,.7]);}return gpu.upload(new Float32Array(v));}
let posts;
function wayfinding(){
 const c=$('#wayfinding'),w=c.clientWidth,h=c.clientHeight;c.width=w;c.height=h;const ctx=c.getContext('2d');if(state.mode!=='trial')return;
 const target=area.course.gates[state.nextGate]??area.course.finish,ground=area.ground(target.x,target.y),q=gpu.project(target.x,target.y,ground+32);
 // Only the next gate is shown in-world; the following gate is retained on the map.
 gpu.mesh(posts,[target.x,target.y,ground,target.heading],7);
 const onscreen=q.depth>4&&q.x>35&&q.x<w-35&&q.y>145&&q.y<h-140;const meters=Math.round(Math.hypot(target.x-state.x,target.y-state.y)/4);
 ctx.font='600 14px system-ui';ctx.textAlign='center';ctx.fillStyle='#e6f2cc';ctx.strokeStyle='#182f2b';ctx.lineWidth=4;
 const label=(state.nextGate<area.course.gates.length?`Gate ${state.nextGate+1}`:'Finish')+` · ${meters} m`;
 if(onscreen){ctx.strokeText(label,q.x,q.y-8);ctx.fillText(label,q.x,q.y-8);ctx.beginPath();ctx.arc(q.x,q.y+10,7,0,Math.PI*2);ctx.stroke();ctx.fill();}
 else{const angle=Math.atan2(target.x-state.x,-(target.y-state.y))-gpu.camera.h,dx=Math.sin(angle),dy=-Math.cos(angle),cx=w/2,cy=h/2,r=Math.min(w*.35,h*.29),x=cx+dx*r,y=cy+dy*r;ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(8,7);ctx.lineTo(-8,7);ctx.closePath();ctx.stroke();ctx.fill();ctx.restore();ctx.strokeText(label,w/2,h>500?155:87);ctx.fillText(label,w/2,h>500?155:87);}
}
function placeLamps(){const r=gpu.roverScreenBounds,b=$('#lamps');b.hidden=paused||welcome||!r;if(b.hidden)return;const w=Math.max(44,r.right-r.left),h=Math.max(44,r.bottom-r.top);b.style.left=(r.left+r.right-w)/2+'px';b.style.top=(r.top+r.bottom-h)/2+'px';b.style.width=w+'px';b.style.height=h+'px';b.setAttribute('aria-pressed',String(gpu.lampStrength>0));}
function draw(dt){gpu.quality=quality;gpu.storm=storm;const shown=paused?state:displayState(previous,state,acc*60,area.ground(state.x,state.y));gpu.draw(shown,dt,$('#labels'));sky.draw(gpu,shown);wayfinding();placeLamps();}
function step(dt){previous=capturePose(state,area.ground(state.x,state.y));const before=state.collected.length;driveStep(state,input,dt,area.course,area);storm.tick(dt,state,()=>gpu.tracks.reset());
 if(state.collected.length!==before){progress.collected=[...state.collected];save();updateHud();}
 if(state.mode==='trial'&&state.done)finishLap();
}
function frame(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(ready){if(!paused){acc+=dt;while(acc>=1/60&&!paused){step(1/60);acc-=1/60;}if(t-lastDraw>=(quality==='performance'?32:0)){draw(Math.min(.05,(t-lastDraw)/1000));lastDraw=t;}if(t-lastSave>3000){save();lastSave=t;}}else if(dirty){draw(0);dirty=false;}
 if(t-lastHud>100){updateHud();lastHud=t;}if(t-lastMap>200){drawMap($('#mini-map'),true);if($('#map-dialog').open)drawMap();lastMap=t;}}
 requestAnimationFrame(frame);}
$('#explore').onclick=explore;$('#welcome-lap').onclick=startLap;$('#start-lap').onclick=startLap;$('#map-lap').onclick=startLap;$('#race-again').onclick=startLap;$('#result-explore').onclick=explore;
$('#pause-button').onclick=()=>openDialog('#pause-dialog');$('#map-button').onclick=$('#mini-map-button').onclick=()=>openDialog('#map-dialog');$('#resume').onclick=()=>{closeDialogs();exploreOrResume();};
function exploreOrResume(){if(welcome)explore();else setPause(false);}
$('#end-lap').onclick=endLap;
$('#return-start').onclick=()=>{resetAt(area.start);explore();};
$('#field-notes').onclick=()=>openDialog('#notes-dialog','#pause-dialog');$('#map-notes').onclick=()=>openDialog('#notes-dialog','#map-dialog');
for(const b of document.querySelectorAll('[data-close]'))b.onclick=closeSheet;
for(const d of document.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='result-dialog')explore();else closeSheet();});
$('#choose-craft').onclick=async()=>{closeDialogs();setPause(true);try{await openCraft(selected,id=>{if(state.mode==='trial')endLap();selected=id;state.roverId=id;state.tune=kit(id);state.v=state.vz=state.boost=0;state.air=false;state.z=area.ground(state.x,state.y);previous=capturePose(state,state.z);gpu.reset(state);dirty=true;save();});const d=$('#craft-dialog');d.addEventListener('close',()=>openDialog('#pause-dialog'),{once:true});}catch{openDialog('#pause-dialog');notify('Rover selection could not load. Try again.');}};
$('#light').onchange=e=>{light=e.target.value;lighting();dirty=true;save();};$('#quality').onchange=e=>{quality=e.target.value;dirty=true;save();};$('#storm').onclick=()=>{storm.start(state);closeDialogs();exploreOrResume();};
$('#lamps').onclick=()=>{gpu.headlightsOverride=!(gpu.lampStrength>0);dirty=true;};
for(const id of ['left','right','drive','brake']){const b=$('#'+id);b.onpointerdown=e=>{if(paused)return;e.preventDefault();b.setPointerCapture(e.pointerId);pointers.set(e.pointerId,id);b.classList.add('active');sync();};const release=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(id))b.classList.remove('active');sync();};b.onpointerup=release;b.onpointercancel=release;b.onlostpointercapture=release;}
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||!ready||e.target.closest('select,summary,a')||(e.target===$('#lamps')&&[' ','Enter'].includes(e.key)))return;if(e.key==='Escape'){e.preventDefault();openDialog('#pause-dialog');return;}const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(!paused){keys.add(k);sync();}}});addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());sync();});
addEventListener('blur',()=>{if(ready&&!paused)openDialog('#pause-dialog');});document.addEventListener('visibilitychange',()=>{if(document.hidden&&ready){if(!paused)openDialog('#pause-dialog');save();}});addEventListener('pagehide',save);addEventListener('resize',()=>{dirty=true;});
for(const event of ['contextmenu','selectstart'])$('.controls').addEventListener(event,e=>e.preventDefault());
try{
 area=await loadArea();readSave();gpu=new GPURenderer($('#world'),area);gpu.shadowMode='none';gpu.softSurfaceLighting=true;gpu.flightLighting=1;posts=gateGeometry();storm.southBoundary=area.bounds.maxY+1600;resetAt(progress.position??{...area.start,heading:-.4});ready=true;$('#quality').value=quality;$('#light').value=light;$('#loading').hidden=true;
 if(progress.position||progress.collected.length){welcome=false;$('#welcome').hidden=true;openDialog('#pause-dialog');}
 $('#world').addEventListener('webglcontextlost',e=>{e.preventDefault();setPause(true);ready=false;$('#loading').hidden=false;$('#loading h2').textContent='The graphics paused.';$('#loading p').textContent='Your saved discoveries are safe.';const b=document.createElement('button');b.textContent='Reload terrain';b.onclick=()=>location.reload();$('#loading').append(b);});
 window.__jezero={get state(){return state},area,gpu,storm,progress,get paused(){return paused},get input(){return input},resetAt,step,draw,startLap,explore,setPause,save,openDialog};requestAnimationFrame(frame);
}catch(e){console.error(e);$('#loading h2').textContent='Could not prepare Three Forks';$('#loading p').textContent=e.message;const b=document.createElement('button');b.textContent='Try again';b.onclick=()=>location.reload();$('#loading').append(b);}

import {loadWetArea} from './wet-area.js';
import {wetRoute,wetStages,wetSafeRoute,WATER_LEVEL,WET_KEY,WET_ID,newWetRun,wetProgress,wetReturn,validWetSave,nearestWetLine} from './wet-course.js';
import {GPURenderer} from '../mars-renderer/gpu.js';
import {create} from '../mars-renderer/simulation.js';
import {driveStep} from '../mars-renderer/driving.js';
import {RALLY_TUNE} from './rally-route.js';
import {createViewModes} from './view-modes.js';
import {startArtHop,stepArtHop} from './art-hop.js';
const $=s=>document.querySelector(s),keys=new Set(),pointers=new Map();
let area,gpu,state,views,run=newWetRun(),paused=false,held=false,safe=null,saveAge=0,toastAge=0,acc=0,last=performance.now(),record=null;
const clock=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,'0')}`;
const read=key=>{try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{$('#save-note').textContent='Storage unavailable. This lap can still be played, but will not be saved.';}}
function controls(){return {drive:keys.has('drive'),special:keys.has('brake'),steer:Number(keys.has('right'))-Number(keys.has('left'))};}
function clearInput(){keys.clear();pointers.clear();held=false;for(const b of document.querySelectorAll('.controls button'))b.classList.remove('active');}
function message(text){$('#toast').textContent=text;toastAge=5;}
function pose(p){return {x:p.x,y:p.y,heading:p.heading??nearestWetLine(p.x,p.y).heading};}
function resetPosition(p){Object.assign(state,pose(p),{z:area.ground(p.x,p.y),v:0,vz:0,air:false,boost:0,thrust:0,artHop:null,turnaround:false,returnReleased:false});gpu.reset(state);}
function save(){if(!state||run.done)return;write(WET_KEY+'.run',{...run,pose:pose(state),safe,raceBoosts:state.raceBoosts});}
function setPause(value){paused=value;clearInput();acc=0;if(value)save();}
function openPause(){setPause(true);if(!$('#pause-dialog').open)$('#pause-dialog').showModal();}
function closeDialogs(){for(const d of document.querySelectorAll('dialog[open]'))d.close();}
function restart(){closeDialogs();run=newWetRun();state=create('free',area.course,'perseverance');state.tune={...RALLY_TUNE};state.raceBoosts=3;state.solar={east:-.4,north:.25,up:.7};resetPosition(wetRoute[0]);safe=pose(state);setPause(false);message('Drive to begin · follow the descending shelf');save();}
function finish(){paused=true;clearInput();if(!run.practice&&(!Number.isFinite(record?.time)||run.time<record.time)){record={course:WET_ID,time:run.time};write(WET_KEY+'.best',record);}try{localStorage.removeItem(WET_KEY+'.run');}catch{}$('#result-time').textContent=clock(run.time);$('#result-best').textContent=run.practice?'Practice lap · water return or overhead view · no official record':`Best ${clock(record?.time??run.time)}`;$('#result-dialog').showModal();}
function returnDry(){wetReturn(run);const a=nearestWetLine(safe.x,safe.y),b=nearestWetLine(safe.x,safe.y,wetSafeRoute),p=a.d<b.d?a:b;resetPosition({...safe,heading:p.heading});clearInput();message('Water boundary · returned to dry ground · +5s · practice lap');save();}
function step(dt,input=controls()){
 if(paused||run.done)return;
 const from={x:state.x,y:state.y};if(input.drive||input.special||Math.abs(state.v)>.1||run.time>0)run.time+=dt;
 const pressed=input.special&&!held;held=input.special;
 if(views.overhead){run.practice=true;state.tune={...RALLY_TUNE,speed:35,boostSpeed:35,acceleration:45};state.boost=0;if(pressed)startArtHop(state);}else{state.tune={...RALLY_TUNE};if(pressed&&input.drive&&!state.air&&Math.abs(state.v)>1&&state.raceBoosts>0){state.raceBoosts--;state.boost=RALLY_TUNE.boostSeconds;}}
 const braking=!views.overhead&&input.special&&state.boost<=0;
 if(!stepArtHop(state,input,dt,area.ground,area.bounds))driveStep(state,{...input,brake:braking,brakeOnly:braking&&state.v>1},dt,area.course,area.driveArea);
 if(state.boost>0)state.thrust=1;
 // Water is invalid even in the air: hopping across it cannot create a record.
 if(area.ground(state.x,state.y)<WATER_LEVEL+1||!Number.isFinite(state.z)){returnDry();return;}
 const a=nearestWetLine(state.x,state.y),b=nearestWetLine(state.x,state.y,wetSafeRoute);if(!state.air&&area.ground(state.x,state.y)>WATER_LEVEL+8&&Math.min(a.d/a.width,b.d/b.width)<.6)safe=pose(state);
 if(wetProgress(run,from,state)){if(run.done){finish();return;}message(wetStages[run.next].hint);}
 saveAge+=dt;if(saveAge>2){saveAge=0;save();}
 toastAge-=dt;if(toastAge<=0)$('#toast').textContent='';
}
function draw(dt=0){if(!gpu)return;if(!views?.draw(state,dt,$('#labels')))gpu.draw(state,dt,$('#labels'));$('#stage').textContent=run.done?'Complete':wetStages[run.next].name;$('#timer').textContent=clock(run.time);$('#practice').hidden=!run.practice;$('#wet-hint').textContent=run.done?'':wetStages[run.next].hint;$('#mini-map-button').hidden=!views?.overhead;$('#brake').textContent=views?.overhead?'Hop':keys.has('drive')&&state.raceBoosts>0?`Boost ${state.raceBoosts}`:Math.abs(state.v)<1?'Reverse':'Brake';document.body.classList.toggle('rally-boosting',state.boost>0&&!area.reducedMotion);}
function exit(){save();if(window.parent!==window)window.parent.postMessage({type:'astra-exit-rover'},location.origin);else location.href='../../../?v2=1';}
for(const id of ['left','right','drive','brake']){const b=$('#'+id);b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);pointers.set(e.pointerId,id);keys.add(id);b.classList.add('active');};for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(id)){keys.delete(id);b.classList.remove('active');}});}
const keyMap={w:'drive',arrowup:'drive',a:'left',arrowleft:'left',d:'right',arrowright:'right',' ':'brake',arrowdown:'brake',s:'brake'};
addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();if($('#result-dialog').open)return;if(paused&&!views?.photo){closeDialogs();setPause(false);}else openPause();return;}const id=keyMap[e.key.toLowerCase()];if(id&&!paused){e.preventDefault();keys.add(id);$('#'+id).classList.add('active');}});addEventListener('keyup',e=>{const id=keyMap[e.key.toLowerCase()];if(id){keys.delete(id);$('#'+id).classList.remove('active');}});
addEventListener('blur',()=>{if(gpu&&!run.done&&!views?.photo)openPause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&gpu&&!run.done&&!views?.photo)openPause();});addEventListener('pagehide',save);addEventListener('astra-close-practice',save);
addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.type==='astra-pause-rover')openPause();});
$('#pause-button').onclick=openPause;$('#resume').onclick=()=>{closeDialogs();setPause(false);};$('#retry').onclick=restart;$('#race-again').onclick=restart;$('#exit').onclick=exit;$('#result-exit').onclick=exit;
for(const d of document.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='pause-dialog'){closeDialogs();setPause(false);}});
$('#quality').onchange=e=>{gpu.quality=e.target.value;write(WET_KEY+'.settings',{quality:gpu.quality,reducedMotion:area.reducedMotion});};$('#reduced-motion').onchange=e=>{area.reducedMotion=e.target.checked;write(WET_KEY+'.settings',{quality:gpu.quality,reducedMotion:area.reducedMotion});};
try{
 area=await loadWetArea();gpu=new GPURenderer($('#world'),area);gpu.shadowMode='none';gpu.softSurfaceLighting=true;gpu.relayFocus=true;
 const settings=read(WET_KEY+'.settings');area.reducedMotion=settings?.reducedMotion??matchMedia('(prefers-reduced-motion: reduce)').matches;gpu.quality=settings?.quality==='performance'?'performance':'balanced';$('#quality').value=gpu.quality;$('#reduced-motion').checked=area.reducedMotion;
 record=read(WET_KEY+'.best');if(record?.course!==WET_ID||!Number.isFinite(record.time)||record.time<=0)record=null;
 const saved=read(WET_KEY+'.run');restart();
 views=createViewModes({gpu,get state(){return state},area,pause:()=>setPause(true),closeDialogs,openPause,redraw:()=>draw()});
 if(validWetSave(saved)&&[saved.pose?.x,saved.pose?.y,saved.pose?.heading,saved.safe?.x,saved.safe?.y,saved.safe?.heading].every(Number.isFinite)&&saved.pose.x>4200&&saved.pose.x<7000&&saved.pose.y>7200&&saved.pose.y<10000&&area.ground(saved.pose.x,saved.pose.y)>WATER_LEVEL+1&&saved.safe.x>4200&&saved.safe.x<7000&&saved.safe.y>7200&&saved.safe.y<10000&&area.ground(saved.safe.x,saved.safe.y)>WATER_LEVEL+8){run={...saved};safe=saved.safe;resetPosition(saved.pose);state.raceBoosts=Math.max(0,Math.min(3,Number(saved.raceBoosts)||0));openPause();$('#save-note').textContent='Your lake circuit is ready to resume.';}
 $('#loading').hidden=true;draw();
 window.__wetJezero={get state(){return state},get run(){return run},area,gpu,views,step,draw,restart,save,get paused(){return paused},setPause,controls,returnDry,get safe(){return safe}};
 function frame(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!paused){acc+=dt;while(acc>=1/60){step(1/60);acc-=1/60;}}views.tick(dt);draw(paused?0:dt);requestAnimationFrame(frame);}requestAnimationFrame(frame);
}catch(error){console.error(error);$('#loading').innerHTML='<h2>Unable to load the shoreline</h2><p>Reload to try again. Your existing records are unchanged.</p><button onclick="location.reload()">Reload</button>';}

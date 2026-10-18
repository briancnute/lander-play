import {ROVER_PROFILES,roverTune,roverDriveArea,createRoverExploration} from './rover-driving.js';
import {newTourRun,restoreTourRun,acknowledgeCheckpoint,createTourTracker,projectOnLeg,tourClock,tourEarthLabel,poseOf,jumpTour,nearestTourPoint} from './guided-tour-run.js';
import {driveStep} from '../mars-renderer/driving.js';
import {createRouteRibbon} from '../jezero/route-ribbon.js';
import {triangle} from '../mars-renderer/triangle.js';
import {recordGameStart} from './game-starts.js';
import {createRelayRoad} from '../jezero/relay-surface.js';
import {createRecordedTreads} from './recorded-treads.js';
import {photoFrame} from './photo-framing.js';
import {createTourDirection} from './tour-direction.js';
import {createTourBoost,tourTargetSpeed,TOUR_PACE} from './tour-pace.js';
import {createTourMap} from './tour-map.js';
import {createTourEnvelope} from './tour-envelope.js';
import {nextTourGate,tourGate,gateApproach} from './tour-gates.js';
import {missedTourGate} from './tour-gates.js';
import {createTourSteering,DEFAULT_TOUR_STEERING} from './tour-steering.js';
import {box} from '../mars-renderer/geometry.js';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export async function mountGuidedTour(api,asset){
 const response=await fetch(asset);if(!response.ok)throw Error('The expedition route could not load. Reload to try again.');
 const tour=await response.json();if(tour.version!==2||tour.geometryAudit.crossings||tour.geometryAudit.closeLanes)throw Error('This expedition route has not passed its mapping checks.');
 const {area,gpu}=api,key=`astra.${tour.site}.guidedTour.v1`,buckets=new Map();
 const photoURL=new URL('./tour-photos.json',import.meta.url),photoResponse=await fetch(photoURL);
 if(!photoResponse.ok)throw Error('The checkpoint photographs could not load. Reload to try again.');
 const photographs=(await photoResponse.json()).sites[tour.site];gpu.hideDiscoveries=true;
 for(const stop of tour.checkpoints)if(!photographs[stop.id])throw Error('Missing checkpoint photograph: '+stop.id);
 gpu.relayRoad=createRelayRoad(gpu.gl,tour.legs.flatMap(l=>l.points),{halfWidth:32,style:1,textureSize:Math.min(4096,gpu.gl.getParameter(gpu.gl.MAX_TEXTURE_SIZE))});
 const recordedTreads=createRecordedTreads(gpu,area.segments??area.world.segments,area.ground);
 const direction=createTourDirection(),boost=createTourBoost(),envelope=createTourEnvelope(tour,area.segments??area.world.segments);
 let steeringSaved;try{steeringSaved=JSON.parse(localStorage.getItem('astra.mars.tourSteering.v1'));}catch{}const steering=createTourSteering(steeringSaved??{});
 const boundaryRibbon=createRouteRibbon(gpu,envelope.contours,area.ground,{halfWidth:1.8,color:[.93,.58,.29]});
 const gateMeshes=tour.checkpoints.map((_,i)=>{const g=tourGate(tour,i),v=[];for(const side of [-1,1]){const x=g.x+Math.cos(g.heading)*g.halfWidth*side,y=g.y+Math.sin(g.heading)*g.halfWidth*side,z=area.ground(x,y);box(v,x-1,y-1,z,2,2,30,[.87,.82,.66]);triangle(v,[x,y,z+30],[x+Math.cos(g.heading)*side*14,y+Math.sin(g.heading)*side*14,z+24],[x,y,z+18],[.75,.94,.78]);}return gpu.upload(new Float32Array(v));});
 for(const r of area.rocks){const k=Math.floor(r[0]/100)+','+Math.floor(r[1]/100);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(r);}
 function safe(p){if(![p.x,p.y,p.heading].every(Number.isFinite)||p.x<area.bounds.minX+16||p.x>area.bounds.width-16||p.y<area.bounds.minY+16||p.y>area.bounds.maxY-16)return false;
  const h=area.ground,slope=Math.hypot(h(p.x+8,p.y)-h(p.x-8,p.y),h(p.x,p.y+8)-h(p.x,p.y-8))/16;if(!Number.isFinite(h(p.x,p.y))||slope>tour.recovery.maximumSlope+.001)return false;
  const ix=Math.floor(p.x/100),iy=Math.floor(p.y/100);for(let j=iy-1;j<=iy+1;j++)for(let i=ix-1;i<=ix+1;i++)for(const [x,y,r]of buckets.get(i+','+j)??[])if(Math.hypot(p.x-x,p.y-y)<r+14)return false;return true;
 }
 let saved;try{saved=JSON.parse(localStorage.getItem(key)??'null');}catch{}
 const exploration=createRoverExploration(area,steering);
 let run=restoreTourRun(tour,saved,safe,envelope.contains),tracker=createTourTracker(tour,run,safe,envelope.contains),lift=null,saveFailed=false,lastSave=0,missedAge=0,parked=true,hasDeparted=false,gateApproached=false,roaming=false;
 const locked=()=>!roaming&&(run.pending!==null||run.status==='complete'&&!run.exploring||run.atEnd);
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./guided-tour.css',import.meta.url).href;document.head.append(link);document.body.classList.add('guided-tour');
 const hud=document.createElement('section');hud.id='guided-tour-hud';hud.setAttribute('aria-label',tour.name+' progress');hud.innerHTML='<small id="gt-name"></small><b id="gt-sol"></b><small id="gt-date"></small><span id="gt-next"></span><span id="gt-progress"></span><span id="gt-boost"></span>';
 const warning=document.createElement('div');warning.id='guided-tour-warning';warning.setAttribute('role','status');warning.setAttribute('aria-live','polite');warning.hidden=true;
 const directionCue=document.createElement('div');directionCue.id='guided-tour-direction';directionCue.setAttribute('role','status');directionCue.hidden=true;
 const checkpointCue=document.createElement('div');checkpointCue.id='guided-tour-checkpoint-direction';checkpointCue.hidden=true;checkpointCue.setAttribute('role','status');
 const gateLabels=document.createElement('canvas');gateLabels.id='gt-gate-labels';gateLabels.setAttribute('aria-hidden','true');
 const mapButton=document.createElement('button');mapButton.id='guided-tour-map-button';mapButton.setAttribute('aria-label','Open expedition route map');mapButton.innerHTML='<canvas id="gt-mini" width="140" height="96" aria-label="Local route and rover heading"></canvas><span>Our path · Route map ↗</span>';
 const pauseButton=document.createElement('button');pauseButton.id='guided-tour-pause-button';pauseButton.textContent='Ⅱ';pauseButton.setAttribute('aria-label','Pause guided tour');
 const card=document.createElement('dialog');card.id='guided-tour-card';card.setAttribute('aria-labelledby','gt-card-title');card.innerHTML='<small id="gt-card-number"></small><h2 id="gt-card-title"></h2><p id="gt-card-date"></p><figure id="gt-photo"><a id="gt-photo-source" target="_blank" rel="noopener noreferrer" aria-label="Open original rover photograph"><img id="gt-card-image" width="960" height="300" decoding="async"></a><figcaption><span id="gt-photo-caption"></span><small id="gt-photo-credit"></small></figcaption></figure><p id="gt-card-copy"></p><small id="gt-card-next"></small><a id="gt-card-source" target="_blank" rel="noopener noreferrer">NASA mission source ↗</a><div class="gt-actions"><button id="gt-continue" class="primary">Continue tour</button><button id="gt-restart" hidden>Restart tour</button><button id="gt-card-map">Map / Jump</button><button id="gt-leave">Free Roam</button></div>';
 const map=document.createElement('dialog');map.id='guided-tour-map';map.setAttribute('aria-labelledby','gt-map-title');map.innerHTML='<div class="gt-map-head"><h2 id="gt-map-title"></h2><button id="gt-map-close" aria-label="Close route map">×</button></div><button id="gt-map-focus">Focus current leg</button><canvas id="gt-map-canvas" aria-label="Ordered one-way tour route, next checkpoint and rover heading"></canvas><p class="gt-map-key">Mint: our tour · White: current leg · Brown: real rover path · Amber: exploration boundary · Green stops: visited · ▲ You · North ↑</p><p id="gt-map-next"></p>';
 const pause=document.createElement('dialog');pause.id='guided-tour-pause';pause.setAttribute('aria-labelledby','gt-pause-title');pause.innerHTML='<h2 id="gt-pause-title"></h2><p>Space / Drive to move. Double-tap Drive or Space for a four-second boost, then four seconds to recharge. A D / ← → to steer. Shift / Brake to slow or stop.</p><p>Explore our pale path and the real rover’s brown tire tracks freely inside the amber outer boundary. A mint edge tick points back to where you left our path. Pass the numbered gates in order; a gold flag tick points to a missed gate. Only leaving the outer exploration boundary starts the three-second return. At a stop, the rover faces the view and stays stopped after you close the card. Drive when you are ready.</p><div class="gt-actions"><button id="gt-resume" class="primary">Resume tour</button><button id="gt-pause-map">Route map</button><button id="gt-pause-leave">Free Roam</button><button id="gt-exit">Back to Play</button></div><details><summary>Developer · steering feel</summary><label>Turn strength <output id="gt-turn-value"></output><input id="gt-turn-strength" type="range" min="15" max="150" step="5"></label><label>Steering response <output id="gt-response-value"></output><input id="gt-turn-response" type="range" min="50" max="800" step="10"></label><small>Lower strength turns more slowly. Longer response softens pressing and releasing. Shared by both guided tours.</small><button id="gt-steering-reset">Reset steering</button></details><details><summary>Outing settings</summary><label>Graphics<select id="gt-quality"><option value="balanced">Balanced</option><option value="performance">Performance</option></select></label><small>Historical dates describe the rover journey. Lighting uses the time chosen for this outing.</small></details>';
 const mapActions=document.createElement('div');mapActions.className='gt-actions';mapActions.innerHTML='<button id="gt-map-resume" class="primary">Resume driving</button><button id="gt-map-settings">Controls / settings</button><button id="gt-map-leave">Free Roam</button><button id="gt-map-exit">Back to Play</button>';map.append(mapActions);document.body.append(hud,warning,directionCue,checkpointCue,gateLabels,mapButton,pauseButton,card,map,pause);const el=id=>document.getElementById(id);
 function steeringUI(){el('gt-turn-strength').value=Math.round(steering.values.strength*100);el('gt-turn-response').value=Math.round(steering.values.response*1000);el('gt-turn-value').textContent=Math.round(steering.values.strength*100)+'%';el('gt-response-value').textContent=Math.round(steering.values.response*1000)+' ms';}
 function rememberSteering(){steeringUI();try{localStorage.setItem('astra.mars.tourSteering.v1',JSON.stringify(steering.values));}catch{}}
 el('gt-turn-strength').oninput=e=>{steering.values.strength=Number(e.target.value)/100;rememberSteering();};el('gt-turn-response').oninput=e=>{steering.values.response=Number(e.target.value)/1000;rememberSteering();};el('gt-steering-reset').onclick=()=>{Object.assign(steering.values,DEFAULT_TOUR_STEERING);steering.reset();rememberSteering();};steeringUI();
 el('gt-pause-title').textContent=tour.name+' · Paused';
 el('gt-name').textContent=tour.name;el('gt-map-title').textContent=(tour.site==='jezero'?'Jezero':'Gale')+' · Paused map';
 function save(){if(!run||roaming)return;try{localStorage.setItem(key,JSON.stringify(run));saveFailed=false;}catch{saveFailed=true;}update();}
 function leave(){
  if(roaming)return;save();roaming=true;exploration.reset(Math.abs(api.state.v)>.08);lift=null;tracker.resetWarning();direction.reset();missedAge=0;boost.clearTap();if(gpu.relayRoad)gpu.gl.deleteTexture(gpu.relayRoad.texture);gpu.relayRoad=null;
  for(const dialog of [card,map,pause])if(dialog.open)dialog.close();
  el('gt-name').textContent=(tour.site==='jezero'?'Jezero':'Gale / Mount Sharp')+' · Free Roam';el('gt-pause-title').textContent='Free Roam · Paused';
  for(const id of ['gt-next','gt-progress','gt-leave','gt-pause-leave','gt-map-leave','gt-map-focus'])el(id).hidden=true;
  hud.setAttribute('aria-label','Free Roam driving');el('gt-map-canvas').setAttribute('aria-label','Interactive Free Roam map and real rover path');el('gt-resume').textContent='Resume driving';pause.querySelectorAll(':scope > p')[1].textContent='Explore freely. The brown tire tracks show the real rover’s journey. Map and Satellite views can help you find your next destination.';
  map.querySelector('.gt-map-key').textContent='Brown: real rover path · ▲ You · North ↑';mapButton.querySelector('span').textContent='Real rover path · Map ↗';mapButton.setAttribute('aria-label','Open Free Roam map');pauseButton.setAttribute('aria-label','Pause Free Roam');
  tourMap.clearSelection();recordGameStart({world:'mars',site:tour.site==='jezero'?'jez':'gale',activity:'Free Roam'});
  if(parent!==window)parent.postMessage({type:'astra-surface-free-roam'},location.origin);
  api.resume();drawMini();update();
 }
 function clearDrift(s){Object.assign(s,{v:0,vz:0,air:false,turnaround:false,boost:0,thrust:0,impact:0,driftVX:null,driftVY:null,slip:0,visualSteer:0,visualBrake:false});api.clearInput();}
 function align(p){boost.cancel();direction.reset();directionCue.hidden=true;api.reset({...p,heading:p.heading});clearDrift(api.state);gpu.camera={x:p.x,y:p.y,h:p.heading};gpu.bodySlope=null;steering.reset();exploration.reset();missedAge=0;parked=true;hasDeparted=false;gateApproached=false;lastSave=0;}
 function showPending(){if(roaming)return;if(run.pending===null&&(run.status!=='complete'||run.exploring)&&!run.atEnd)return;boost.cancel();boost.clearTap();
  const index=run.status==='complete'?(run.completedAt??tour.checkpoints.length-1):run.atEnd?tour.checkpoints.length-1:run.pending,p=tour.checkpoints[index];clearDrift(api.state);
  el('gt-card-number').textContent=index===0&&!run.passedGates.includes(0)?'TOUR BRIEFING':run.status==='complete'?'EXPEDITION COMPLETE':run.atEnd?'TOUR ENDPOINT':`STOP ${index+1} / ${tour.checkpoints.length}`;
  el('gt-card-title').textContent=p.name;el('gt-card-date').textContent=`Sol ${p.sol} / ${tour.lastSol} · ${p.earthLabel} location`;
  el('gt-card-copy').textContent=p.fact;el('gt-card-next').textContent=index===0&&!run.passedGates.includes(0)?'Pass the landing flags just ahead. Every checkpoint gate must be crossed in order.':index===tour.checkpoints.length-1?(run.visitedStops.filter(i=>i!==index).length<tour.checkpoints.length-1?'Historical endpoint. Use the map to visit any stops you skipped.':'You reached the historical snapshot endpoint.'):`Next: ${tour.checkpoints[index+1].name}. Look around while stopped. Press Drive when you are ready to leave; the next gate remains required.`;
  const photo=photographs[p.id],image=el('gt-card-image');image.src=new URL(photo.image,photoURL).href;image.alt=photo.alt;
  const frame=photoFrame(photo);image.style.cssText=frame.image;el('gt-photo-source').style.setProperty('--photo-aspect',frame.aspect);el('gt-photo-source').setAttribute('aria-label','Open full original rover photograph');
  el('gt-photo-caption').textContent=photo.caption+(photo.view?' Selected detail.':'')+(photo.detail?' '+photo.detail:'');el('gt-photo-credit').textContent=photo.credit;el('gt-photo-source').href=photo.source;
  el('gt-card-source').href=p.source;el('gt-continue').hidden=run.status==='complete'&&!run.exploring||run.atEnd;el('gt-continue').textContent=index===tour.checkpoints.length-1?(run.visitedStops.filter(i=>i!==index).length===tour.checkpoints.length-1?'Complete expedition':'Finish this visit'):index===0?(run.passedGates.includes(0)?'Continue tour':'Begin guided tour'):'Continue tour';el('gt-restart').hidden=run.status!=='complete';
  api.openDialog('#guided-tour-card');save();update();
 }
 function start(){recordGameStart({world:'mars',site:tour.site==='jezero'?'jez':'gale',activity:tour.name});align(run.status==='complete'&&!run.exploring?tour.checkpoints.at(-1):run.pose);if(run.pending!==null||run.status==='complete'&&!run.exploring||run.atEnd)showPending();else openPause();update();}
 el('gt-continue').onclick=()=>{const index=run.pending;if(index===0&&!run.passedGates.includes(0)){run.pending=null;card.close();align(run.pose);save();api.resume();return;}if(!acknowledgeCheckpoint(tour,run))return;card.close();tracker.resetWarning();if(run.status==='complete'&&!run.exploring||run.atEnd){save();showPending();return;}align(run.pose);save();api.resume();};
 el('gt-restart').onclick=()=>{run=newTourRun(tour);tracker=createTourTracker(tour,run,safe,envelope.contains);lift=null;align(tour.checkpoints[0]);save();showPending();};el('gt-leave').onclick=leave;
 card.addEventListener('cancel',e=>e.preventDefault());
 function openMap(){boost.clearTap();el('gt-map-close').textContent=locked()?'Back to card':'Resume';api.openDialog('#guided-tour-map');requestAnimationFrame(drawMap);}
 function closeMap(){map.close();if(locked())showPending();else api.resume();}
 function openPause(){openMap();}
 function openSettings(){boost.clearTap();if(locked()){showPending();return;}el('gt-quality').value=document.getElementById('quality')?.value??'balanced';api.openDialog('#guided-tour-pause');}
 function closePause(){pause.close();api.resume();}
 pauseButton.onclick=openPause;el('gt-resume').onclick=closePause;el('gt-pause-map').onclick=openMap;el('gt-pause-leave').onclick=leave;el('gt-exit').onclick=()=>document.getElementById(tour.site==='jezero'?'exit-rover':'exit').click();pause.addEventListener('cancel',e=>{e.preventDefault();closePause();});el('gt-quality').onchange=e=>{const native=el('quality');native.value=e.target.value;native.dispatchEvent(new Event('change'));};
 el('gt-map-resume').onclick=closeMap;el('gt-map-settings').onclick=openSettings;el('gt-map-leave').onclick=leave;el('gt-map-exit').onclick=()=>document.getElementById(tour.site==='jezero'?'exit-rover':'exit').click();el('gt-card-map').onclick=openMap;mapButton.onclick=openMap;el('gt-map-close').onclick=closeMap;map.addEventListener('cancel',e=>{e.preventDefault();closeMap();});el('gt-map-focus').onclick=()=>{tourMap.fitLeg();};
 const tapBoost=e=>boost.tap(e.timeStamp/1000);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)boost.clearTap();});window.addEventListener('blur',()=>boost.clearTap());
 document.addEventListener('pointerdown',e=>{if(!api.paused&&!locked()&&!lift&&e.target.closest('#drive,[data-control=drive]'))tapBoost(e);},{capture:true});
 window.addEventListener('keydown',e=>{if((e.code==='Space'||e.key===' ')&&!e.repeat&&!api.paused&&!locked()&&!lift&&!e.target.closest('input,select,textarea'))tapBoost(e);if(card.open&&['Escape','m','M'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();return;}if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();map.open?closeMap():pause.open?closePause():openPause();return;}if(e.key.toLowerCase()==='m'&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();map.open?closeMap():openMap();}},{capture:true});
 window.addEventListener('pagehide',save);window.addEventListener('resize',()=>{if(map.open)drawMap();});
 function beginLift(p){boost.cancel();let target=p;
  if(!safe(target)||!envelope.contains(target)){const leg=tour.legs[run.leg],index=[...leg.recoveryIndices].reverse().find(i=>leg.points[i].s<=run.station&&safe(leg.points[i]));target=leg.points[index??0];}
  lift={from:{x:api.state.x,y:api.state.y,z:api.state.z},to:{...target,z:area.ground(target.x,target.y)},age:0};clearDrift(api.state);tracker.resetWarning();save();
 }
 function step(dt,input){
  if(locked()||document.hidden||api.paused)return;
  if(lift){lift.age+=dt;const t=clamp(lift.age/1.1,0,1),u=t*t*(3-2*t),s=api.state;Object.assign(s,{x:lift.from.x+(lift.to.x-lift.from.x)*u,y:lift.from.y+(lift.to.y-lift.from.y)*u,heading:lift.to.heading,air:true,v:0,vz:0});s.z=Math.max(area.ground(s.x,s.y),lift.from.z+(lift.to.z-lift.from.z)*u)+Math.sin(Math.PI*t)*36;s.t+=dt;
   if(t===1){const target=lift.to;lift=null;align(target);run.pose=poseOf(api.state);save();}update();return;
  }
  const s=api.state,before={x:s.x,y:s.y},leg=tour.legs[run.leg],projection=projectOnLeg(leg,s,0,Infinity),brake=!!(input.brake||input.special||input.reverse);
  boost.step(dt,{brake});if(roaming){exploration.step(s,input,dt,boost);parked=exploration.parked;update();return;}const targetSpeed=tourTargetSpeed(leg,projection,s.v,boost.multiplier);
  s.tune=roverTune(s.tune,ROVER_PROFILES.tour,targetSpeed,!!boost.active);
  let gas=input.drive||boost.active>0;if(gas){parked=false;hasDeparted=true;}
  driveStep(s,{drive:!!gas,brake,brakeOnly:true,steer:steering.step(input.steer,dt)},dt,area.course,{...roverDriveArea(area),rocks:area.localRocks?.(s.x,s.y)??area.rocks});
  if(parked&&!gas){s.x=before.x;s.y=before.y;s.v=s.vz=0;s.air=false;s.z=area.ground(s.x,s.y);}else if(brake&&Math.abs(s.v)<.08)parked=true;
  // This outing follows the ground. Keep safe tour hillcrests planted at the
  // faster pace; jumping remains a separate activity with its own handling.
  const contact=projectOnLeg(leg,s,run.station,Math.max(240,Math.abs(s.v)*dt*3+24));if(s.air&&(roaming||contact.distance<=32)&&safe(s)){s.z=area.ground(s.x,s.y);s.vz=0;s.air=false;s.jumpStart=null;}
  if(roaming){update();return;}
  const event=tracker.step(dt,before,s);if(event?.type==='checkpoint'){align(event.pose);save();showPending();}else if(event?.type==='recover')beginLift(event.pose);
  if(Math.abs(s.v)>2)direction.step(dt,s,projectOnLeg(leg,s,0,Infinity));else direction.reset();
  const required=nextTourGate(tour,run);if(required>=0){const gate=tourGate(tour,required);if(Math.hypot(gate.x-s.x,gate.y-s.y)<480||projection.station>=leg.length-480&&projection.distance<100)gateApproached=true;}missedAge=hasDeparted&&gateApproached&&required>=0&&missedTourGate(tourGate(tour,required),s)?missedAge+dt:0;
  if(s.t-lastSave>=2){lastSave=s.t;save();}update();
 }
 const setText=(id,text)=>{const node=el(id);if(node.textContent!==text)node.textContent=text;};let lastMini=0;
 function update(){
  const quiet=roaming||!!lift||api.paused||run.pending!==null||run.status!=='active'&&!run.exploring,s=api.state,path=nearestTourPoint(tour,s);
  function pin(node,target,label){const angle=Math.atan2(target.x-s.x,s.y-target.y)-s.heading,turn=Math.atan2(Math.sin(angle),Math.cos(angle));if(node.dataset.label!==label){node.innerHTML='<span aria-hidden="true">↑</span><small>'+label+'</small>';node.dataset.label=label;}node.firstChild.style.transform='rotate('+turn+'rad)';const back=Math.abs(turn)>Math.PI*.7;node.style.left=back?(node===checkpointCue?'calc(50% + 28px)':'calc(50% - 28px)'):turn<0?'22px':'calc(100% - 22px)';node.style.top=back?'calc(100% - 150px)':(node===checkpointCue?'58%':'43%');}
  directionCue.hidden=quiet||!(path.distance>48||direction.visible);
  if(!directionCue.hidden){const leg=tour.legs[run.leg],p=projectOnLeg(leg,s,0,Infinity),ahead=leg.points.find(q=>q.s>=Math.min(leg.length,p.station+80))??leg.points.at(-1);pin(directionCue,path.distance>48?run.returnAnchor:ahead,'PATH');directionCue.setAttribute('aria-label','Return to where you left our path');}
  const required=nextTourGate(tour,run);checkpointCue.hidden=quiet||missedAge<.6||required<0;if(!checkpointCue.hidden){pin(checkpointCue,tourGate(tour,required),'⚑ '+(required+1));checkpointCue.setAttribute('aria-label','Missed checkpoint '+(required+1)+' · '+tour.checkpoints[required].name);}
  const sol=tourClock(tour,run);setText('gt-sol',`Sol ${sol} / ${tour.lastSol}`);setText('gt-date',`${tourEarthLabel(tour.site,sol)} location`);
  setText('gt-next',run.status==='complete'?'Expedition complete':run.atEnd?'Endpoint reached · Use the map to visit remaining stops':run.freeJump?'Exploring · Next gate: '+tour.checkpoints[Math.max(0,nextTourGate(tour,run))].name:`Next: ${tour.checkpoints[Math.max(0,required)].name} · ${Math.max(0,Math.round(Math.hypot(tour.checkpoints[Math.max(0,required)].x-s.x,tour.checkpoints[Math.max(0,required)].y-s.y)/4))} m`);
  setText('gt-boost',`${Math.round(Math.abs(api.state.v)*.9)} km/h · ${boost.active?'BOOST '+boost.active.toFixed(1)+'s':boost.cooldown?'Boost ready in '+Math.ceil(boost.cooldown)+'s':'Double-tap Drive / Space to boost'}`);hud.classList.toggle('boosting',!!boost.active);
  setText('gt-progress',`${run.visited} / ${tour.checkpoints.length} stops${saveFailed?' · Progress could not be saved':''}`);
  warning.hidden=roaming||!lift&&tracker.outsideSeconds===0;warning.textContent=lift?'Returning inside the exploration boundary…':`Return inside boundary · ${Math.ceil(tour.recovery.warningSeconds-tracker.outsideSeconds)}`;
  if(map.open)drawMap();if(performance.now()-lastMini>150){lastMini=performance.now();drawMini();}
 }
 function drawMini(){const c=el('gt-mini'),ctx=c.getContext('2d'),s=api.state,scale=c.width/1400,point=p=>({x:c.width/2+(p.x-s.x)*scale,y:c.height/2+(p.y-s.y)*scale});ctx.fillStyle='#1a3029';ctx.fillRect(0,0,c.width,c.height);if(roaming){ctx.strokeStyle='#c89b64';ctx.lineWidth=2;ctx.beginPath();for(const segment of area.segments??area.world.segments)segment.points.forEach((p,i)=>{if(Math.abs(p.x-s.x)>1500||Math.abs(p.y-s.y)>1500){return;}const q=point(p),previous=segment.points[i-1];if(i&&Math.abs(previous.x-s.x)<=1500&&Math.abs(previous.y-s.y)<=1500)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);});ctx.stroke();}else{ctx.strokeStyle='#a9edce';ctx.lineWidth=2;ctx.beginPath();tour.legs[run.leg].points.filter(p=>p.s>=run.station-120&&p.s<=run.station+1500).forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();const end=point(tour.checkpoints[run.leg+1]);ctx.fillStyle='#efddb0';ctx.beginPath();ctx.arc(end.x,end.y,4,0,Math.PI*2);ctx.fill();}ctx.save();ctx.translate(c.width/2,c.height/2);ctx.rotate(s.heading);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,5);ctx.lineTo(0,2);ctx.lineTo(-5,5);ctx.closePath();ctx.fill();ctx.restore();ctx.fillStyle='#c2d4c8';ctx.font='10px system-ui';ctx.fillText('N ↑',7,13);}
 function drawMap(){tourMap.draw();el('gt-map-next').hidden=roaming;el('gt-map-next').textContent=`${run.visited} / ${tour.checkpoints.length} stops visited · ${el('gt-next').textContent}`;}
 function findMapPose(p){const candidate=q=>(roaming||envelope.contains(q))&&safe({...q,heading:0})?{...q,heading:nearestTourPoint(tour,q).heading}:null;let q=candidate(p);if(q)return q;for(let r=12;r<=400;r+=12)for(let k=0;k<24;k++){q=candidate({x:p.x+Math.cos(k*Math.PI/12)*r,y:p.y+Math.sin(k*Math.PI/12)*r});if(q)return q;}return null;}
 function travel(p){const stop=tour.checkpoints.findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<=q.triggerRadius),destination=findMapPose(!roaming&&stop>=0?gateApproach(tourGate(tour,stop)):p);if(!destination)return false;boost.cancel();lift=null;tracker.resetWarning();if(roaming){align(destination);map.close();api.resume();update();return true;}jumpTour(tour,run,destination);tracker=createTourTracker(tour,run,safe,envelope.contains);align(run.pose);gateApproached=true;save();map.close();if(run.pending!==null)showPending();else api.resume();return true;}
 const tourMap=createTourMap({dialog:map,canvas:el('gt-map-canvas'),tour,area,getState:()=>api.state,getRun:()=>run,isRoaming:()=>roaming,envelope,findSafe:findMapPose,onJump:travel});

 function draw(){
  recordedTreads.draw(api.state);gpu.tourGateCount=0;const w=innerWidth,h=innerHeight;gateLabels.width=w;gateLabels.height=h;const ctx=gateLabels.getContext('2d');
  if(roaming||run.status!=='active'&&!run.exploring||run.pending!==null)return;
  if(!(parked&&tour.checkpoints[run.visitedStops.at(-1)]?.focus))boundaryRibbon.draw(api.state);
  for(let i=0;i<tour.checkpoints.length;i++)if(!run.passedGates.includes(i)&&Math.hypot(tour.checkpoints[i].x-api.state.x,tour.checkpoints[i].y-api.state.y)<1400){gpu.mesh(gateMeshes[i],[0,0,0,100],1);gpu.tourGateCount++;const g=tour.checkpoints[i],q=gpu.project(g.x,g.y,area.ground(g.x,g.y)+38);if(q.depth>4&&q.x>12&&q.x<w-12&&q.y>125&&q.y<h-130){ctx.fillStyle='#163b2ce0';ctx.strokeStyle='#dfedca';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(q.x,q.y,10,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#eff7df';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(i+1,q.x,q.y+4);}}
 }
 return {tour,key,photographs,boost,tourMap,envelope,steering,get parked(){return parked;},travel,start,step,draw,openMap,openPause,showPending,save,leave,get roaming(){return roaming;},get directionsVisible(){return !roaming&&direction.visible&&!lift&&!api.paused&&run.pending===null&&run.status==='active';},get locked(){return locked();},get run(){return run;},get outsideSeconds(){return tracker.outsideSeconds;},get recovering(){return !!lift;},get active(){return true;}};
}

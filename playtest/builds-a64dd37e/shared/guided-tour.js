import {newTourRun,restoreTourRun,acknowledgeCheckpoint,createTourTracker,projectOnLeg,tourClock,tourEarthLabel,poseOf} from './guided-tour-run.js';
import {driveStep} from '../mars-renderer/driving.js';
import {createRouteRibbon} from '../jezero/route-ribbon.js';
import {triangle} from '../mars-renderer/triangle.js';
import {recordGameStart} from './game-starts.js';
import {createRelayRoad} from '../jezero/relay-surface.js';
import {createRecordedTreads} from './recorded-treads.js';
import {photoFrame} from './photo-framing.js';
import {createTourDirection} from './tour-direction.js';
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
 const direction=createTourDirection();
 for(const r of area.rocks){const k=Math.floor(r[0]/100)+','+Math.floor(r[1]/100);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(r);}
 function safe(p){if(![p.x,p.y,p.heading].every(Number.isFinite)||p.x<area.bounds.minX+16||p.x>area.bounds.width-16||p.y<area.bounds.minY+16||p.y>area.bounds.maxY-16)return false;
  const h=area.ground,slope=Math.hypot(h(p.x+8,p.y)-h(p.x-8,p.y),h(p.x,p.y+8)-h(p.x,p.y-8))/16;if(!Number.isFinite(h(p.x,p.y))||slope>tour.recovery.maximumSlope+.001)return false;
  const ix=Math.floor(p.x/100),iy=Math.floor(p.y/100);for(let j=iy-1;j<=iy+1;j++)for(let i=ix-1;i<=ix+1;i++)for(const [x,y,r]of buckets.get(i+','+j)??[])if(Math.hypot(p.x-x,p.y-y)<r+14)return false;return true;
 }
 let saved;try{saved=JSON.parse(localStorage.getItem(key)??'null');}catch{}
 let run=restoreTourRun(tour,saved,safe),tracker=createTourTracker(tour,run,safe),lift=null,calibration=0,calibrationSpeed=0,ribbon=null,ribbonKey='',arrows=null,mapFocused=false,saveFailed=false,lastSave=0;
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./guided-tour.css',import.meta.url).href;document.head.append(link);document.body.classList.add('guided-tour');
 const hud=document.createElement('section');hud.id='guided-tour-hud';hud.setAttribute('aria-label',tour.name+' progress');hud.innerHTML='<small id="gt-name"></small><b id="gt-sol"></b><small id="gt-date"></small><span id="gt-next"></span><span id="gt-progress"></span>';
 const warning=document.createElement('div');warning.id='guided-tour-warning';warning.setAttribute('role','status');warning.setAttribute('aria-live','polite');warning.hidden=true;
 const directionCue=document.createElement('div');directionCue.id='guided-tour-direction';directionCue.setAttribute('role','status');directionCue.hidden=true;
 const mapButton=document.createElement('button');mapButton.id='guided-tour-map-button';mapButton.setAttribute('aria-label','Open expedition route map');mapButton.innerHTML='<canvas id="gt-mini" width="140" height="96" aria-label="Local route and rover heading"></canvas><span>Our path · Route map ↗</span>';
 const pauseButton=document.createElement('button');pauseButton.id='guided-tour-pause-button';pauseButton.textContent='Ⅱ';pauseButton.setAttribute('aria-label','Pause guided tour');
 const card=document.createElement('dialog');card.id='guided-tour-card';card.setAttribute('aria-labelledby','gt-card-title');card.innerHTML='<small id="gt-card-number"></small><h2 id="gt-card-title"></h2><p id="gt-card-date"></p><figure id="gt-photo"><a id="gt-photo-source" target="_blank" rel="noopener noreferrer" aria-label="Open original rover photograph"><img id="gt-card-image" width="960" height="300" decoding="async"></a><figcaption><span id="gt-photo-caption"></span><small id="gt-photo-credit"></small></figcaption></figure><p id="gt-card-copy"></p><small id="gt-card-next"></small><a id="gt-card-source" target="_blank" rel="noopener noreferrer">NASA mission source ↗</a><div class="gt-actions"><button id="gt-continue" class="primary">Continue tour</button><button id="gt-restart" hidden>Restart tour</button><button id="gt-leave">Free Roam</button></div>';
 const map=document.createElement('dialog');map.id='guided-tour-map';map.setAttribute('aria-labelledby','gt-map-title');map.innerHTML='<div class="gt-map-head"><h2 id="gt-map-title"></h2><button id="gt-map-close" aria-label="Close route map">×</button></div><button id="gt-map-focus">Focus current leg</button><canvas id="gt-map-canvas" aria-label="Ordered one-way tour route, next checkpoint and rover heading"></canvas><p class="gt-map-key">Mint: route ahead · White: current leg · Muted: completed · Numbered stops in order · ▲ You · North ↑</p><p id="gt-map-next"></p>';
 const pause=document.createElement('dialog');pause.id='guided-tour-pause';pause.setAttribute('aria-labelledby','gt-pause-title');pause.innerHTML='<h2 id="gt-pause-title"></h2><p>Space / Drive to move. A D / ← → to steer. Shift / Brake to slow or stop.</p><p>Follow the pale ground path within the amber edges. Arrows appear only when you face the wrong way or leave the path, then disappear once you are heading forward again. Paired brown tire marks show the real rover traverse. Off route: return within three seconds or be lifted back to where you left. Cards pause the tour and align your departure.</p><div class="gt-actions"><button id="gt-resume" class="primary">Resume tour</button><button id="gt-pause-map">Route map</button><button id="gt-pause-leave">Free Roam</button><button id="gt-exit">Back to Play</button></div><details><summary>Outing settings</summary><label>Graphics<select id="gt-quality"><option value="balanced">Balanced</option><option value="performance">Performance</option></select></label><small>Historical dates describe the rover journey. Lighting uses the time chosen for this outing.</small></details>';
 document.body.append(hud,warning,directionCue,mapButton,pauseButton,card,map,pause);const el=id=>document.getElementById(id);
 el('gt-pause-title').textContent=tour.name+' · Paused';
 el('gt-name').textContent=tour.name;el('gt-map-title').textContent=tour.name+' · Route';
 function save(){if(!run)return;try{localStorage.setItem(key,JSON.stringify(run));saveFailed=false;}catch{saveFailed=true;}update();}
 function leave(){save();const url=new URL(location.href);url.searchParams.set('activity',tour.site==='gale'?'explore':'roam');location.href=url.href;}
 function clearDrift(s){Object.assign(s,{v:0,vz:0,air:false,turnaround:false,boost:0,thrust:0,impact:0,driftVX:null,driftVY:null,slip:0,visualSteer:0,visualBrake:false});api.clearInput();}
 function align(p,speed=0){direction.reset();directionCue.hidden=true;api.reset({...p,heading:p.heading});clearDrift(api.state);gpu.camera={x:p.x,y:p.y,h:p.heading};gpu.bodySlope=null;calibration=speed>0?1.2:0;calibrationSpeed=speed;lastSave=0;}
 function showPending(){if(run.pending===null&&run.status!=='complete')return;
  const index=run.status==='complete'?tour.checkpoints.length-1:run.pending,p=tour.checkpoints[index];clearDrift(api.state);
  el('gt-card-number').textContent=run.status==='complete'?'EXPEDITION COMPLETE':`STOP ${index+1} / ${tour.checkpoints.length}`;
  el('gt-card-title').textContent=p.name;el('gt-card-date').textContent=`Sol ${p.sol} / ${tour.lastSol} · ${p.earthLabel} location`;
  el('gt-card-copy').textContent=p.fact;el('gt-card-next').textContent=index===tour.checkpoints.length-1?'You reached the historical snapshot endpoint.':`Next: ${tour.checkpoints[index+1].name}. Closing this card aligns your rover and sets a gentle departure pace.`;
  const photo=photographs[p.id],image=el('gt-card-image');image.src=new URL(photo.image,photoURL).href;image.alt=photo.alt;
  const frame=photoFrame(photo);image.style.cssText=frame.image;el('gt-photo-source').style.setProperty('--photo-aspect',frame.aspect);el('gt-photo-source').setAttribute('aria-label','Open full original rover photograph');
  el('gt-photo-caption').textContent=photo.caption+(photo.view?' Selected detail.':'')+(photo.detail?' '+photo.detail:'');el('gt-photo-credit').textContent=photo.credit;el('gt-photo-source').href=photo.source;
  el('gt-card-source').href=p.source;el('gt-continue').hidden=run.status==='complete';el('gt-continue').textContent=index===tour.checkpoints.length-1?'Complete expedition':index===0?'Begin guided tour':'Continue tour';el('gt-restart').hidden=run.status!=='complete';
  api.openDialog('#guided-tour-card');save();update();
 }
 function start(){recordGameStart({world:'mars',site:tour.site==='jezero'?'jez':'gale',activity:tour.name});align(run.status==='complete'?tour.checkpoints.at(-1):run.pose);if(run.pending!==null||run.status==='complete')showPending();else openPause();update();}
 el('gt-continue').onclick=()=>{const index=run.pending;if(!acknowledgeCheckpoint(tour,run))return;card.close();tracker.resetWarning();if(run.status==='complete'){save();showPending();return;}align(tour.checkpoints[index],tour.checkpoints[index].departureSpeed);save();api.resume();};
 el('gt-restart').onclick=()=>{run=newTourRun(tour);tracker=createTourTracker(tour,run,safe);ribbonKey='';lift=null;align(tour.checkpoints[0]);save();showPending();};el('gt-leave').onclick=leave;
 card.addEventListener('cancel',e=>e.preventDefault());
 function openMap(){if(run.pending!==null||run.status==='complete'){showPending();return;}api.openDialog('#guided-tour-map');requestAnimationFrame(drawMap);}
 function closeMap(){map.close();api.resume();}
 function openPause(){if(run.pending!==null||run.status==='complete'){showPending();return;}el('gt-quality').value=document.getElementById('quality')?.value??'balanced';api.openDialog('#guided-tour-pause');}
 function closePause(){pause.close();api.resume();}
 pauseButton.onclick=openPause;el('gt-resume').onclick=closePause;el('gt-pause-map').onclick=openMap;el('gt-pause-leave').onclick=leave;el('gt-exit').onclick=()=>document.getElementById(tour.site==='jezero'?'exit-rover':'exit').click();pause.addEventListener('cancel',e=>{e.preventDefault();closePause();});el('gt-quality').onchange=e=>{const native=el('quality');native.value=e.target.value;native.dispatchEvent(new Event('change'));};
 mapButton.onclick=openMap;el('gt-map-close').onclick=closeMap;map.addEventListener('cancel',e=>{e.preventDefault();closeMap();});el('gt-map-focus').onclick=()=>{mapFocused=!mapFocused;el('gt-map-focus').textContent=mapFocused?'Show full journey':'Focus current leg';drawMap();};
 window.addEventListener('keydown',e=>{if(card.open&&['Escape','m','M'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();return;}if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();map.open?closeMap():pause.open?closePause():openPause();return;}if(e.key.toLowerCase()==='m'&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();map.open?closeMap():openMap();}},{capture:true});
 window.addEventListener('pagehide',save);window.addEventListener('resize',()=>{if(map.open)drawMap();});
 function beginLift(p){let target=p;
  if(!safe(target)){const leg=tour.legs[run.leg],index=[...leg.recoveryIndices].reverse().find(i=>leg.points[i].s<=run.station&&safe(leg.points[i]));target=leg.points[index??0];}
  lift={from:{x:api.state.x,y:api.state.y,z:api.state.z},to:{...target,z:area.ground(target.x,target.y)},age:0};clearDrift(api.state);tracker.resetWarning();save();
 }
 function step(dt,input){
  if(run.pending!==null||run.status==='complete'||document.hidden||api.paused)return;
  if(lift){lift.age+=dt;const t=clamp(lift.age/1.1,0,1),u=t*t*(3-2*t),s=api.state;Object.assign(s,{x:lift.from.x+(lift.to.x-lift.from.x)*u,y:lift.from.y+(lift.to.y-lift.from.y)*u,heading:lift.to.heading,air:true,v:0,vz:0});s.z=Math.max(area.ground(s.x,s.y),lift.from.z+(lift.to.z-lift.from.z)*u)+Math.sin(Math.PI*t)*36;s.t+=dt;
   if(t===1){const target=lift.to;lift=null;align(target,Math.min(55,tour.legs[run.leg].points[0].speed));run.pose=poseOf(api.state);save();}update();return;
  }
  const s=api.state,before={x:s.x,y:s.y},leg=tour.legs[run.leg],projection=projectOnLeg(leg,s,run.station),targetSpeed=projection.speed,brake=!!(input.brake||input.special||input.reverse);
  s.tune={...s.tune,speed:targetSpeed,boostSpeed:targetSpeed,acceleration:80,handling:1.15,cloneDrive:false};
  let gas=input.drive;
  if(calibration>0){calibration=Math.max(0,calibration-dt);if(!brake){s.tune.acceleration=calibrationSpeed/1.2;gas=true;}else calibration=0;}
  driveStep(s,{drive:!!gas,brake,brakeOnly:true,steer:input.steer||0},dt,area.course,{...area.driveArea,rocks:area.localRocks?.(s.x,s.y)??area.rocks,pickups:[],samples:[],keepExploring:true,boundaryAt:()=>({edge:1000}),cruise:false,arcadeHandling:false,driftHandling:false,roverHandling:true,airBrake:true,airControl:true,speedMultiplier:()=>1});
  const event=tracker.step(dt,before,s);if(event?.type==='checkpoint'){clearDrift(s);calibration=0;save();showPending();}else if(event?.type==='recover')beginLift(event.pose);
  direction.step(dt,s,projectOnLeg(leg,s,run.station));
  if(s.t-lastSave>=2){lastSave=s.t;save();}update();
 }
 const setText=(id,text)=>{const node=el(id);if(node.textContent!==text)node.textContent=text;};let lastMini=0;
 function update(){
  directionCue.hidden=!direction.visible||!!lift||api.paused||run.pending!==null||run.status!=='active';
  if(!directionCue.hidden){const leg=tour.legs[run.leg],s=api.state,p=projectOnLeg(leg,s,run.station),ahead=leg.points.find(q=>q.s>=Math.min(leg.length,p.station+40))??leg.points.at(-1),angle=Math.atan2(ahead.x-s.x,s.y-ahead.y)-s.heading,turn=Math.atan2(Math.sin(angle),Math.cos(angle));directionCue.textContent=(turn<0?'↶ ':'↷ ')+(p.distance>32?'Return to the path':'Follow the path forward');}
  const sol=tourClock(tour,run);setText('gt-sol',`Sol ${sol} / ${tour.lastSol}`);setText('gt-date',`${tourEarthLabel(tour.site,sol)} location`);
  setText('gt-next',run.status==='complete'?'Expedition complete':`Next: ${tour.checkpoints[Math.min(run.leg+1,tour.checkpoints.length-1)].name} · ${Math.max(0,Math.round((tour.legs[run.leg].length-run.station)/4))} m`);
  setText('gt-progress',`${run.visited} / ${tour.checkpoints.length} stops${saveFailed?' · Progress could not be saved':''}`);
  warning.hidden=!lift&&tracker.outsideSeconds===0;warning.textContent=lift?'Returning to where you left the route…':`Return to route · ${Math.ceil(tour.recovery.warningSeconds-tracker.outsideSeconds)}`;
  if(map.open)drawMap();if(performance.now()-lastMini>150){lastMini=performance.now();drawMini();}
 }
 function drawMini(){const c=el('gt-mini'),ctx=c.getContext('2d'),s=api.state,scale=c.width/1400,point=p=>({x:c.width/2+(p.x-s.x)*scale,y:c.height/2+(p.y-s.y)*scale});ctx.fillStyle='#1a3029';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='#a9edce';ctx.lineWidth=2;ctx.beginPath();tour.legs[run.leg].points.filter(p=>p.s>=run.station-120&&p.s<=run.station+1500).forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();const end=point(tour.checkpoints[run.leg+1]);ctx.fillStyle='#efddb0';ctx.beginPath();ctx.arc(end.x,end.y,4,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(c.width/2,c.height/2);ctx.rotate(s.heading);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,5);ctx.lineTo(0,2);ctx.lineTo(-5,5);ctx.closePath();ctx.fill();ctx.restore();ctx.fillStyle='#c2d4c8';ctx.font='10px system-ui';ctx.fillText('N ↑',7,13);}
 function drawMap(){const canvas=el('gt-map-canvas'),r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;const ratio=Math.min(devicePixelRatio,2);if(canvas.width!==Math.round(r.width*ratio)||canvas.height!==Math.round(r.height*ratio)){canvas.width=Math.round(r.width*ratio);canvas.height=Math.round(r.height*ratio);}const ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,r.width,r.height);ctx.fillStyle='#252e29';ctx.fillRect(0,0,r.width,r.height);
  const ps=mapFocused?tour.legs[run.leg].points:tour.legs.flatMap(l=>l.points),xs=ps.map(p=>p.x),ys=ps.map(p=>p.y),minX=Math.min(...xs),minY=Math.min(...ys),maxX=Math.max(...xs),maxY=Math.max(...ys),scale=Math.min((r.width-50)/(maxX-minX+160),(r.height-50)/(maxY-minY+160)),point=p=>({x:r.width/2+(p.x-(minX+maxX)/2)*scale,y:r.height/2+(p.y-(minY+maxY)/2)*scale});
  for(let i=0;i<tour.legs.length;i++){ctx.strokeStyle=i===run.leg?'#f1fff6':i<run.leg?'#65796b':'#82cdb1';ctx.lineWidth=i===run.leg?3:1.5;ctx.beginPath();tour.legs[i].points.forEach((p,j)=>{const q=point(p);j?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();}
  const occupied=[];tour.checkpoints.forEach((p,i)=>{const q=point(p);let label={...q};for(let k=0;k<10&&occupied.some(a=>Math.hypot(a.x-label.x,a.y-label.y)<23);k++)label={x:q.x+(k%2?1:-1)*(18+Math.floor(k/2)*14),y:q.y+(k%3-1)*22};occupied.push(label);ctx.strokeStyle='#d6e8dc';ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(label.x,label.y);ctx.stroke();ctx.fillStyle=i<run.visited?'#84d7b1':'#263f34';ctx.beginPath();ctx.arc(label.x,label.y,9,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=i<run.visited?'#10251c':'#fff';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(i+1,label.x,label.y+4);});
  const p=point(api.state);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(api.state.heading);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(6,7);ctx.lineTo(0,3);ctx.lineTo(-6,7);ctx.closePath();ctx.fill();ctx.restore();ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='12px system-ui';ctx.fillText('N ↑',12,20);el('gt-map-next').textContent=`${run.visited} / ${tour.checkpoints.length} stops · ${el('gt-next').textContent}`;
 }
 function draw(){
  recordedTreads.draw(api.state);
  if(run.status!=='active'||run.pending!==null)return;const leg=tour.legs[run.leg],bucket=Math.floor(run.station/160),id=run.leg+':'+bucket;
  if(ribbonKey!==id){ribbon?.dispose();if(arrows)gpu.gl.deleteBuffer(arrows.b);ribbonKey=id;const points=leg.points.filter(p=>p.s>=run.station-60&&p.s<=run.station+1200),left=[],right=[],v=[];let nextArrow=run.station+60;
   for(const p of points){left.push({x:p.x+Math.cos(p.heading)*p.halfWidth,y:p.y+Math.sin(p.heading)*p.halfWidth});right.push({x:p.x-Math.cos(p.heading)*p.halfWidth,y:p.y-Math.sin(p.heading)*p.halfWidth});if(p.s>=nextArrow){nextArrow=p.s+100;const point=(forward,side)=>{const x=p.x+Math.sin(p.heading)*forward+Math.cos(p.heading)*side,y=p.y-Math.cos(p.heading)*forward+Math.sin(p.heading)*side;return [x,y,area.ground(x,y)+.3];};triangle(v,point(12,0),point(-7,-7),point(-7,7),[.65,1,.83]);}}
   const edges=createRouteRibbon(gpu,[{points:left},{points:right}],area.ground,{halfWidth:.65,color:[.82,.62,.37]});ribbon=edges;arrows=v.length?gpu.upload(new Float32Array(v)):null;
  }
  ribbon?.draw(api.state);if(arrows&&direction.visible&&!lift&&!api.paused)gpu.mesh(arrows,[0,0,0,100],7);
 }
 return {tour,key,photographs,start,step,draw,openMap,openPause,showPending,save,leave,get directionsVisible(){return direction.visible&&!lift&&!api.paused&&run.pending===null&&run.status==='active';},get locked(){return run.pending!==null||run.status==='complete';},get run(){return run;},get outsideSeconds(){return tracker.outsideSeconds;},get recovering(){return !!lift;},get active(){return true;}};
}

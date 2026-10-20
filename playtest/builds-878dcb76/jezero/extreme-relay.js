import {createRoverTurbo,collectTurboRefills} from '../shared/rover-turbo.js';
import {mountRoverTurboControl} from '../shared/rover-turbo-control.js';
import {ROVER_PROFILES,roverTune,createRoverExploration} from '../shared/rover-driving.js';
import {createBoardingRamp} from './relay-boarding.js';
import {createRelayHelicopter,stepRelayHelicopter,followRelayHelicopter} from './relay-helicopter.js';
import {helicopterMeshes} from './relay-helicopter-mesh.js';
import {createViewModes} from './view-modes.js';
import {startArtHop,stepArtHop} from './art-hop.js';
import {buildExtremeCourse,EXTREME_ID,EXTREME_NAME,advanceExtremeGate} from './extreme-course.js';
import {atDistance,progressAlong} from './rally-route.js';
import {projectOnLeg} from '../shared/guided-tour-run.js';
import {relayTargetSpeed,relayDriveArea} from './relay-driving.js';
import {createTourSteering} from '../shared/tour-steering.js';
import {chase} from '../mars-renderer/chase.js';
import {driveStep} from '../mars-renderer/driving.js';
import {createRelayRoad} from './relay-surface.js';
import {createRecordedTreads} from '../shared/recorded-treads.js';
import {recordGameStart} from '../shared/game-starts.js';
import {surfaceResult} from '../shared/result-card.js';
import {box,triangle} from '../mars-renderer/geometry.js';
const clock=t=>`${Math.floor(t/60)}:${(t%60).toFixed(2).padStart(5,'0')}`;
export function createExtremeRelay(api,journey){
 const {area,gpu,freeRoam}=api,course=buildExtremeCourse(area.guidedTour),key='astra.jezero.extreme-relay.v5',boost=createRoverTurbo();let run=null,flight=null,renderPose=null,flightCamera=null,cameraReturn=0,records={},parked=true,specialHeld=false;
 let prefs;try{records=JSON.parse(localStorage.getItem(key))??{};prefs=JSON.parse(localStorage.getItem('astra.mars.tourSteering.v1'));}catch{}if(typeof records!=='object'||Array.isArray(records))records={};const steering=createTourSteering(prefs??{});
 const exploration=createRoverExploration(area,steering);
 const treads=createRecordedTreads(gpu,journey.segments,area.ground),$=s=>document.querySelector(s);
 window.addEventListener('keydown',e=>{if(run&&e.key.toLowerCase()==='o'){e.preventDefault();e.stopImmediatePropagation();}},true);
 const views=createViewModes({area,gpu,get state(){return api.state;},pause:api.pause,closeDialogs:api.closeDialogs,openPause:()=>api.openDialog('#pause-dialog'),redraw:()=>api.draw(0)});
 // Individual pairs let passed gates disappear immediately.
 const gates=course.stages.map(stage=>(stage.gates??[]).map(g=>{const v=[];for(const side of [-1,1]){const x=g.x+Math.cos(g.heading)*g.halfWidth*side,y=g.y+Math.sin(g.heading)*g.halfWidth*side,z=area.ground(x,y);box(v,x-1.3,y-1.3,z,2.6,2.6,28,[.76,.70,.53]);triangle(v,[x,y,z+28],[x+Math.cos(g.heading)*side*15,y+Math.sin(g.heading)*side*15,z+23],[x,y,z+18],[.87,.94,.75]);}return gpu.upload(new Float32Array(v));}));
 const refills=course.stages.flatMap((c,stage)=>c.kind==='rally'?Array.from({length:Math.max(0,Math.floor(c.length/3200)-1)},(_,i)=>({...atDistance(c.points,(i+1)*3200),id:stage+':'+i,stage,radius:28})):[]),collected=new Set();
 const cell=[];box(cell,-7,-7,8,14,14,22,[.45,.92,.65]);box(cell,-3,-7.5,15,6,1,10,[.96,.98,.78]);const refillMesh=gpu.upload(new Float32Array(cell));
 const flightPoints=course.stages[1].points,flightBounds={minX:Math.min(...flightPoints.map(p=>p.x))-2000,width:Math.max(...flightPoints.map(p=>p.x))+2000,minY:Math.min(...flightPoints.map(p=>p.y))-2000,maxY:Math.max(...flightPoints.map(p=>p.y))+2000};
 const ramp=createBoardingRamp(course.stages[0],area.ground),craft=helicopterMeshes(gpu,ramp);
 const beacon=[];for(const x of [-45,45])box(beacon,x-2,-2,0,4,4,90,[.35,.85,.85]);triangle(beacon,[-24,0,100],[24,0,100],[0,0,75],[.55,.95,.95]);const landingBeacon=gpu.upload(new Float32Array(beacon));
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./extreme-relay.css',import.meta.url);document.head.append(link);
 const result=document.createElement('dialog');result.id='extreme-result';result.innerHTML='<h2>Extreme Relay complete</h2><p id="extreme-result-time"></p><button id="extreme-retry">Retry</button><button id="extreme-roam">Free Roam</button>';document.body.append(result);result.querySelector('#extreme-retry').onclick=begin;result.querySelector('#extreme-roam').onclick=()=>{stop();api.explore();};result.addEventListener('cancel',e=>e.preventDefault());
 const hud=document.createElement('div');hud.id='extreme-relay-hud';hud.hidden=true;const cue=document.createElement('div');cue.id='extreme-relay-cue';cue.hidden=true;document.body.append(hud,cue);
 const pauseButton=document.createElement('button');pauseButton.id='extreme-relay-pause';pauseButton.textContent='Ⅱ';pauseButton.setAttribute('aria-label','Pause relay');pauseButton.hidden=true;pauseButton.onclick=()=>{turboControl.clear();api.openDialog('#pause-dialog');};document.body.append(pauseButton);
 const leave=document.createElement('button');leave.textContent='Leave relay · Free Roam';leave.hidden=true;leave.onclick=()=>{stop();api.explore();};$('#pause-dialog .settings-stack').append(leave);
 const sites=[{...course.stages[0].start,id:EXTREME_ID,name:EXTREME_NAME}],stage=()=>run?.stage;
 // Prepare both textures once while loading; retry/boarding/landing only swap references.
 const roads=new Map(course.stages.filter(c=>c.kind==='rally').map(c=>[c.points,createRelayRoad(gpu.gl,c.points,{halfWidth:32,style:1,textureSize:2048})]));
 function road(points){gpu.relayRoad=roads.get(points)??null;}
 function setStage(index){run.index=index;run.stage=course.stages[index];run.progress=0;run.nextGate=0;run.missedGate=null;api.nav.target=null;road(stage().kind==='rally'?stage().points:null);}
 function begin(){stop();if(views.overhead)$('#overhead-mode').click();freeRoam.begin(EXTREME_ID);recordGameStart({world:'mars',site:'jez',activity:EXTREME_NAME});api.reset(course.stages[0].start);boost.reset('relay');collected.clear();run={id:EXTREME_ID,time:0,index:0,stage:null,progress:0,nextGate:0,splits:[],segmentStart:0,done:false};parked=true;setStage(0);gpu.hideDiscoveries=true;document.body.classList.add('relay-focused','extreme-relay');api.explore();return true;}
 function stop(){if(views.photo)views.close();run=null;flight=null;flightCamera=null;cameraReturn=0;document.body.classList.remove('helicopter-flight');turboControl.clear();boost.reset();steering.reset();exploration.reset();road(null);gpu.photoView=null;gpu.relayFocus=false;gpu.hideDiscoveries=false;api.nav.target=null;document.body.classList.remove('relay-focused','extreme-relay');freeRoam.resume();api.state.helicopter=false;api.state.air=false;api.state.v=api.state.vz=0;api.state.z=area.ground(api.state.x,api.state.y);parked=true;api.closeDialogs();update();}
 function split(){run.splits.push({name:stage().name,time:run.time-run.segmentStart,total:run.time});run.segmentStart=run.time;}
 function finish(){split();run.done=true;freeRoam.finish();api.state.v=api.state.vz=0;boost.cancel();api.pause();const old=records.best,prior=Number.isFinite(old?.time)&&old.time>0?old:null;let saved=true;if(!prior||run.time<prior.time){records.best={time:run.time,splits:run.splits};try{localStorage.setItem(key,JSON.stringify(records));}catch{saved=false;}}
  const hosted=surfaceResult({title:EXTREME_NAME,score:run.time,unit:'seconds',best:!!prior&&run.time<prior.time,metrics:[{label:'Route',value:(course.length/4000).toFixed(2)+' km'},{label:'Gates',value:String(course.stages.reduce((n,s)=>n+(s.gates?.length??0),0))}],details:run.splits.map(p=>({label:p.name,value:clock(p.time)})),records:[{label:'Fastest completion',value:clock(records.best.time)}],note:saved?'':'Record could not be saved.'},{draw:()=>api.draw(0),retry:begin,roam:()=>{stop();api.explore();}});if(!hosted){result.querySelector('#extreme-result-time').textContent=clock(run.time)+' · Best '+clock(records.best.time);result.showModal();}
 }
 const turboControl=mountRoverTurboControl(boost,{available:new URLSearchParams(location.search).get('activity')!=='guided-tour',enabled:()=>!flight&&!run?.done&&!views.overhead&&!views.photo,paused:()=>api.paused});
 function step(dt,input){
  if(run?.done||api.paused||document.hidden)return true;const s=api.state,before={x:s.x,y:s.y},brake=!!(input.special||input.brake||input.reverse);boost.step(dt,{brake,held:turboControl.held,enabled:!flight&&!views.overhead&&!views.photo});
  if(!run){if(views.overhead){const pressed=!!input.special&&!specialHeld;specialHeld=!!input.special;if(pressed)startArtHop(s);s.tune={...s.tune,speed:35,boostSpeed:35,acceleration:45,cloneDrive:false};if(!stepArtHop(s,input,dt,area.ground,area.bounds))driveStep(s,{drive:!!input.drive,steer:steering.step(input.steer,dt)},dt,area.course,{...area.driveArea,rocks:area.rocks});}else exploration.step(s,input,dt,boost);return true;}run.time+=dt;
  if(flight){
   Object.assign(s,stepRelayHelicopter(flight,input,dt,area.ground,flightBounds));s.t+=dt;
   if(flight.phase==='landed'){
    split();const exit=course.stages[2].start;flight=null;setStage(2);api.reset(exit);api.state.v=70;api.state.helicopter=false;cameraReturn=.65;turboControl.clear();steering.reset();parked=false;document.body.classList.remove('helicopter-flight');update();
   }return true;
  }
  const current=stage();drive(s,input,dt,current);advanceExtremeGate(current,run,before,s);collectTurboRefills(refills,collected,run.index,before,s,boost);run.progress=progressAlong(current.points,s,run.progress);const required=current.gates[run.nextGate];run.missedGate=required&&run.progress>required.s+160?run.nextGate:null;
  if(run.nextGate===current.gates.length){
   if(run.index===0&&ramp.canBoard(before,s)){
    split();flight=createRelayHelicopter(ramp.pad,s,course.stages[2].start,area.ground);flightCamera={...gpu.lastCamera,heading:gpu.camera.h};turboControl.clear();setStage(1);Object.assign(s,{x:flight.x,y:flight.y,z:flight.z,helicopter:true,air:true});document.body.classList.add('helicopter-flight');update();
   }else if(run.index===2&&run.progress>=current.length-150&&Math.hypot(s.x-current.finish.x,s.y-current.finish.y)<160)finish();
  }return true;
 }
 function drive(s,input,dt,current){
  const projection={speed:120},brake=!!(input.special||input.brake||input.reverse),target=relayTargetSpeed(current,projection,s.v,boost,input.steer);
  s.tune=roverTune(s.tune,ROVER_PROFILES.relay,target,!!boost.active);const gas=!!input.drive||boost.active>0,before={x:s.x,y:s.y};if(gas)parked=false;
  driveStep(s,{drive:gas,brake,brakeOnly:true,steer:steering.step(input.steer,dt)},dt,area.course,{...relayDriveArea(area,boost),...(run.index===0?{ground:ramp.ground}: {})});
  if(parked&&!gas){Object.assign(s,before,{v:0,vz:0,air:false,z:area.ground(before.x,before.y)});}else if(brake&&Math.abs(s.v)<.08)parked=true;
  if(current&&projectOnLeg(current,s,0,Infinity).distance<=46){s.air=false;s.vz=0;s.z=(run.index===0?ramp.ground:area.ground)(s.x,s.y);s.jumpStart=null;}
 }
 function update(){const s=api.state;turboControl.update();const primary=$('#pause-dialog .pause-primary');if(primary&&leave.parentElement!==primary)primary.append(leave);pauseButton.hidden=!run;hud.hidden=!run;leave.hidden=!run;cue.hidden=true;if(!run){if(!views.overhead){$('#left').setAttribute('aria-label','Steer left');$('#right').setAttribute('aria-label','Steer right');$('#drive').textContent='Drive';$('#brake').textContent='Brake';$('#brake').title='Brake';$('#brake').dataset.action='brake';$('#brake').setAttribute('aria-label','Brake');}return;}const c=stage(),g=c.gates?.[run.nextGate],total=course.stages.reduce((n,s)=>n+(s.gates?.length??0),0),passed=course.stages.slice(0,run.index).reduce((n,s)=>n+(s.gates?.length??0),0)+run.nextGate;hud.textContent=clock(run.time)+' · '+(flight?'HELICOPTER':run.done?'FINISHED':`Gate ${Math.min(total,passed+1)} / ${total}`)+'\n'+Math.round(Math.abs(api.state.v)*.9)+' km/h';
  if(flight){
   const goal=course.stages[2].start,angle=Math.atan2(goal.x-s.x,s.y-goal.y)-s.heading,error=Math.atan2(Math.sin(angle),Math.cos(angle));
   cue.hidden=api.paused;cue.textContent=flight.phase==='landing'?'AUTO LANDING':`${Math.abs(error)<.25?'↑':error<0?'←':'→'} LANDING · ${(Math.hypot(goal.x-s.x,goal.y-s.y)/4000).toFixed(2)} km`;
   if(flight.time<3)hud.textContent+='\nA D bank · Space forward · Shift rise';$('#left').setAttribute('aria-label','Bank left');$('#right').setAttribute('aria-label','Bank right');
   $('#drive').textContent='Forward';$('#brake').textContent='Rise';$('#brake').dataset.action='rise';$('#brake').title='Hold to rise; release to descend gently';$('#brake').setAttribute('aria-label','Rise helicopter');
  }else{
   if(g&&!api.paused&&(run.missedGate!==null||projectOnLeg(c,api.state,0,Infinity).distance>70)){cue.hidden=false;const a=Math.atan2(g.x-api.state.x,api.state.y-g.y)-s.heading;cue.textContent=(Math.sin(a)<0?'← ':'→ ')+(run.missedGate!==null?'MISSED GATE':'PATH');}
   if(!api.paused&&!run.done&&cue.hidden&&run.index===0&&run.nextGate>=c.gates.length-1&&c.length-run.progress<700){cue.hidden=false;cue.textContent='BOARD VIA RAMP · ANY SPEED';}
   $('#left').setAttribute('aria-label','Steer left');$('#right').setAttribute('aria-label','Steer right');$('#drive').textContent='Drive';$('#brake').textContent='Brake';$('#brake').title='Brake';$('#brake').setAttribute('aria-label','Brake');
  }
  $('#free-roam-mode').textContent=flight?'HELICOPTER · SPACE FORWARD · SHIFT RISE':EXTREME_NAME.toUpperCase();
 }
 function openMenu(){const list=$('#jump-activities');list.replaceChildren();const button=document.createElement('button');button.textContent=EXTREME_NAME+(records.best?.time?' · '+clock(records.best.time):'');button.onclick=begin;const help=document.createElement('p');help.textContent='Race the expedition route. Pass the widely spaced gates. Drive up the loading ramp at any speed. The hatch closes and you pilot the helicopter to the blue landing beacon. One clock, no photo stops. The rover-carrying helicopter is fictional.';list.append(button,help);$('#controls-help').innerHTML='<p>Drive / Space to move. Double-tap Drive / Space and hold for extra speed. Release to recharge. Driving and turbo keep their pull uphill and across surfaces. Corners take only a little speed; brake early for a tight line. Green energy cells refill the meter. A D / ← → steer. Brake / Shift slows or stops. Same steering feel as the guided tour.</p><p>Enter the ramp at any speed to board. Helicopter: Space / Forward accelerates; A D / arrows bank and turn; Shift / Rise climbs. Release Rise to descend gently. Release Forward to slow into a hover. Follow the blue landing beacon; landing and rover handoff are automatic.</p>';}
 function overlay(ctx){
  const s=api.state;if(!flight)treads.draw(s);if(!run)return;const c=stage();
  if(c.kind==='rally'){
   for(const p of refills)if(p.stage===run.index&&!collected.has(p.id)&&Math.hypot(p.x-s.x,p.y-s.y)<1700)gpu.mesh(refillMesh,[p.x,p.y,area.ground(p.x,p.y),p.heading]);
   for(let i=run.nextGate;i<Math.min(c.gates.length,run.nextGate+2);i++){const g=c.gates[i];if(Math.hypot(s.x-g.x,s.y-g.y)<1700)gpu.mesh(gates[run.index][i],[0,0,0,100],1);}
  }
  const pad=ramp.pad;
  if(run.index===0&&Math.hypot(s.x-pad.x,s.y-pad.y)<1700){gpu.mesh(craft.ramp);drawCraft({...pad,z:area.ground(pad.x,pad.y)+32,bank:0,hatchClosed:false},false);}
  if(flight){drawCraft({...flight,...(renderPose?{x:renderPose.x,y:renderPose.y,z:renderPose.z,heading:renderPose.heading}:{})},true);const end=course.stages[2].start;gpu.mesh(landingBeacon,[end.x,end.y,area.ground(end.x,end.y),end.heading],7);}
 }
 function drawCraft(p,flying){
  const gl=gpu.gl;gl.uniform2f(gpu.locations.slope,0,0);gl.uniform1f(gpu.locations.roverPart,1);gl.uniform1f(gpu.locations.stuntRoll,-(p.bank||0));gl.uniform1f(gpu.locations.stuntPitch,0);
  const actor=[p.x,p.y,p.z,p.heading];gpu.mesh(craft.body,actor);if(p.hatchClosed)gpu.mesh(craft.door,actor);
  // Rotor uses the same bounded mesh rotation as the existing aircraft.
  gl.uniform4f(gpu.locations.wheel,0,0,(api.state.t*(flying?24:5))%(Math.PI*2),1);gpu.mesh(craft.rotor,actor);gl.uniform4f(gpu.locations.wheel,0,0,0,0);
  gl.uniform1f(gpu.locations.stuntRoll,0);gl.uniform1f(gpu.locations.roverPart,0);
 }
 function draw(shown,dt,labels){
  renderPose=shown;
  if((!run||views.photo)&&views.draw(shown,dt,labels))return true;
  gpu.routeRibbon=null;gpu.expeditionRouteActive=false;gpu.photoView=null;
  if(flight)gpu.photoView=followRelayHelicopter(flightCamera,shown,dt,area.ground);
  else if(cameraReturn>0&&flightCamera){
   cameraReturn=Math.max(0,cameraReturn-dt);const follow=chase(gpu.camera,shown,dt,shown.z+6,area.ground,area.ground),t=1-cameraReturn/.65;
   gpu.photoView={live:true,x:flightCamera.x+(follow.x-flightCamera.x)*t,y:flightCamera.y+(follow.y-flightCamera.y)*t,eye:flightCamera.eye+(follow.eye-flightCamera.eye)*t,heading:shown.heading,pitch:flightCamera.pitch+(follow.pitch-flightCamera.pitch)*t,zoom:1};
  }
  gpu.draw(shown,dt,labels);return true;
 }
 return {recordedRoute:true,ramp,roads,refills,collected,course,sites,routes:{relay:{rallies:[course.stages[0],course.stages[2]],flight:course.stages[1]},flight:course.stages[1]},boost,steering,key,get focused(){return !!run;},get mapSites(){return run?[]:sites;},get active(){return run?{id:EXTREME_ID}:null;},get run(){return run;},get flight(){return flight;},views,get photo(){return views.photo;},get overhead(){return !run&&views.overhead;},get protectsArt(){return !run&&views.overhead;},snapshot:()=>({}),openMenu,begin,start:begin,stop,step,update,overlay,board:()=>false,closeCamera:views.close,camera:()=>$('#enter-camera')?.click(),hop:()=>startArtHop(api.state),tick:()=>false,guide(){},remember(){},raceComplete(){},viewTick:dt=>views.tick(dt),draw};
}

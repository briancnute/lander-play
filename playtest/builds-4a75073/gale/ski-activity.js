import {grabPose,movePoints,moveRepeatKey} from '../shared/ride-tricks.js';
import {skiCourse,newSkiRun,stepSki,recoverSki,loadSkiRecord,saveSkiResult,LENGTH,ITEMS,captureSkiInput,resetSkiInput} from './ski-run.js';
import {buildSkiWorld} from './ski-world.js';
import {canStartActivity} from '../shared/free-roam.js';
export function createSkiActivity(api){
 const {area,gpu,session}=api,course=skiCourse(area.ground),world=buildSkiWorld(gpu,course);
 area.ground=course.surface;area.driveArea.ground=course.surface;gpu.ground=gpu.height=course.surface;
 const oldCamera=area.cameraSurface;area.cameraSurface=(x,y)=>Math.max(oldCamera(x,y),course.surface(x,y));
 let feedbackKey='',feedbackAt=0;
 let stage=null,run=null,liftAge=0,record;try{record=loadSkiRecord(localStorage);}catch{record={version:4,best:0,runs:0,combo:0,fastest:null};}
 const $=s=>document.querySelector(s),html=document.createElement('section');html.innerHTML=`
 <button id="ski-start" hidden></button><div id="ski-hud" hidden><b id="ski-clock"></b><span id="ski-score"></span><span id="ski-gate"></span></div>
 <div id="ski-combo" hidden></div><div id="ski-coach" role="status" hidden></div>
 <dialog id="ski-result"><span class="eyebrow">MOUNT SHARP / SKI BLADES</span><h2 id="ski-result-title"></h2><strong id="ski-result-score"></strong><p id="ski-result-copy"></p><button id="ski-retry" class="primary">Retry descent</button><button id="ski-result-roam">Free roam</button></dialog>`;document.body.append(html);const leaveButton=document.createElement('button');leaveButton.id='ski-leave';leaveButton.textContent='Free roam';document.querySelector('#settings').append(leaveButton);
 const activityBox=document.createElement('section');activityBox.className='ski-map-entry';activityBox.innerHTML='<h3>Mount Sharp ski blades</h3><p>Summit to basin. Choose your own line: no checkpoint gates or time limit. Gold boosts lead toward optional jumps; rollers and ridges suggest alternatives. Tricks bank on clean landings. Mountain shape uses measured 200 m HRSC/MOLA elevations; jumps, boosts and lift are arcade additions.</p><button id="ski-guide">Guide to lift base</button><p id="ski-best"></p><details><summary>Ski controls</summary><p>Air: enter up to three Left/Right presses within one second, then hold Trick for a grab. Holding builds points; release before landing for a brief return to riding position. Double Trick within 0.32 seconds commits a separate animation, regardless of subsequent holding. L: Side grab / Blade whip. LL: Tail grab / Backflip. LR: Nose grab / Corkscrew. LLL: Tuck grab / Double backflip. LLR: Superman / Flip whip. LRL: Cross grab / Blade rewind. LRR: Rocket grab / 720 spin. R-first sequences mirror the same slot. LRLR + Trick–Trick: Red Planet Rodeo, a triple corkscrew with spinning blades. After releasing a grab, a fresh direction + Trick immediately starts the next grab. No queued tricks during held grabs or committed animations. Double Brake hops on ground or jolts down in air; hold Brake with Left/Right to redirect, even during tricks. No Manual; clean landings bank the combo. Go: W / ↑ / Space. Brake: Shift / ↓. Gold pickups give a short speed burst; Brake overrides it. Unfinished tricks and held-grab landings lose the combo.</p></details>';
 document.querySelector('.map-side').prepend(activityBox);$('#ski-guide').onclick=()=>api.guide({...course.base,id:'ski-base',name:'Ski lift base'});
 const distance=p=>Math.hypot(api.state.x-p.x,api.state.y-p.y);
 function startLift(){if(stage)return;api.save();session.begin('ski');stage='lift';liftAge=0;api.reset({...course.base,heading:Math.PI});api.resume();}
 function summit(){stage='summit';api.reset({...course.top,heading:course.heading(0)});api.resume();}
 function launch(){if(!stage){api.save();session.begin('ski');}else if(session.state.phase==='result')session.begin('ski');$('#ski-result').close();stage='run';run=newSkiRun(course);api.reset({...course.top,heading:course.heading(0)});api.state.skiBlades=true;api.resume();}
 function leave(){const p={x:api.state.x,y:api.state.y,heading:api.state.heading};stage=null;run=null;session.resume();$('#ski-result').close();api.reset(p);api.resume();api.save();update();}
 function result(){if(stage==='result')return;stage='result';session.finish();let storage;try{storage=localStorage;}catch{}const saved=saveSkiResult(storage,record,run);record=saved.record;$('#ski-result-title').textContent=run.reason;$('#ski-result-score').textContent=run.score.toLocaleString()+' points';$('#ski-result-copy').textContent=`${Math.floor(run.time/60)}:${String(Math.floor(run.time%60)).padStart(2,'0')} descent · ${run.items.length} boosts · ${run.tricks.length} tricks · Best landing ${run.bestCombo}. Best completed descent: ${record.best.toLocaleString()}.${saved.saved?'':' Browser storage unavailable; this result could not be saved.'}`;api.openDialog('#ski-result');update();}
 function step(dt,input){if(!stage)return false;const s=api.state;s.t+=dt;
  if(stage==='lift'){liftAge=Math.min(8,liftAge+dt);const t=liftAge/8,p=course.point(LENGTH*(1-t));Object.assign(s,{x:p.x,y:p.y,z:course.surface(p.x,p.y)+70*Math.sin(t*Math.PI),v:0,air:true,liftCarrier:true,heading:Math.PI});if(liftAge===8)summit();return true;}
  if(stage!=='run')return true;
  stepSki(run,course,{gas:input.drive,brake:input.brake,steer:input.steer,both:input.both},dt);const p=course.point(run.s,run.u),h=course.heading(run.s),t=run.trick,progress=t?Math.min(1,t.age/t.duration):0,angle=t?progress*Math.PI*2*t.rotations*t.sign:0;
  const grab=t?.kind==='grab'?grabPose(t):null,flip=grab?grab.pitch:t&&['flip','bar','cork','rodeo'].includes(t.axis)?angle:0,spin=grab?grab.yaw:t&&['yaw','cork','rodeo'].includes(t.axis)?angle:0;
  const whip=grab?grab.deck:t?.axis==='rodeo'?angle*2:t?.axis==='deck'?angle:t?.axis==='rewind'?Math.sin(progress*Math.PI*2)*Math.PI*2*t.sign:t?.axis==='bar'?angle:0;
  const tuck=t?.variant&&!t.secret?Math.sin(progress*Math.PI)*-.35:0;
  Object.assign(s,{x:p.x,y:p.y,z:run.z,heading:h,skiSpin:spin+run.yaw,skiPitch:flip+tuck,skiTailwhip:whip,skiGrabLeft:grab?.bars??0,skiGrabRight:grab?-grab.bars+grab.roll:0,v:run.v,vz:run.vz,air:run.air,skiBlades:true,visualSteer:input.steer,visualBrake:input.brake,downThrust:run.down,thrust:t ? .65 :(input.drive||run.boost>0)&&!run.air&&!input.brake?1:0});
  if(run.phase==='result')result();return true;
 }
 function update(){document.body.dataset.ski=stage??'roam';$('#ski-leave').hidden=!stage;const start=$('#ski-start'),nearTop=distance(course.top)<65,nearBase=distance(course.base)<65,stopped=canStartActivity({distance:0,speed:api.state.v,radius:1,maxSpeed:1});
  start.hidden=api.paused||!(stage==='summit'||stage==='lift'||(!stage&&!api.state.air&&stopped&&(nearTop||nearBase)));
  start.textContent=stage==='lift'?'Skip lift · upper station':stage==='summit'||nearTop?'START · Ski-blade descent':'RIDE · Mount Sharp lift';
  start.onclick=()=>{if(stage==='lift')summit();else if(stage==='summit'||(!stage&&!api.state.air&&distance(course.top)<65&&Math.abs(api.state.v)<=1)){launch();}else if(!stage&&!api.state.air&&distance(course.base)<65&&Math.abs(api.state.v)<=1)startLift();};
  $('#ski-hud').hidden=!stage||stage==='result'||api.paused;$('#ski-clock').textContent=stage==='lift'?`LIFT ${Math.ceil(8-liftAge)}s`:stage==='summit'?'UPPER STATION':run?.phase==='countdown'?`START ${Math.ceil(run.countdown)}`:`${Math.floor((run?.time??0)/60)}:${String(Math.floor((run?.time??0)%60)).padStart(2,'0')}`;
  $('#ski-score').textContent=run?run.score.toLocaleString()+' pts':'';$('#ski-gate').textContent=run?`${Math.round(run.s/course.length*100)}%`:'';
  if(stage)$('#target-hud').hidden=true;
  const key=run?[run.feedback,run.score,run.tricks.length,run.recoveries].join('|'):stage;
  const now=run?.time??liftAge;if(key!==feedbackKey||now<feedbackAt){feedbackKey=key;feedbackAt=now;}
  const age=now-feedbackAt;$('#ski-coach').hidden=!stage||stage==='result'||api.paused||age>=2.4;
  $('#ski-coach').textContent=stage==='lift'?'LIFT':stage==='summit'?'UPPER STATION':run?.feedback??'';
  $('#ski-coach').style.opacity=String(Math.min(1,Math.max(0,(2.4-age)/.6)));
  const held=run?.trick?.kind==='grab'?Math.round(movePoints(run.trick)*Math.max(.2,1/(1+(run.repeats[moveRepeatKey(run.trick)]??0)*.5))):0,points=(run?.pending??0)+held;
  $('#ski-combo').hidden=stage!=='run'||api.paused||!points;$('#ski-combo').textContent=points?`${points.toLocaleString()} × ${Math.min(8,Math.max(1,run.chain+(held?1:0)))}`:'';
  document.querySelector('[data-control=drive]').textContent=stage==='run'?(run.air?'Trick':'Boost'):'Drive';if(stage==='run')$('#brake').textContent=run.down?'↓ Jolt':run.airMode==='turn'?'Turn':'Brake';
  document.querySelector('header .eyebrow').textContent=stage?'MARS / SKI-BLADE ACTIVITY':'MARS / FREE ROAM · UNSCORED';$('#ski-best').textContent=record.best?'Best completed descent · '+record.best.toLocaleString()+' points':'No completed descent yet';
 }
 function draw(){world.draw(api.state,run);const ctx=$('#labels').getContext('2d');for(const [name,p]of (stage==='run'?[]:[['SKI LIFT',course.base],['DOWNHILL START',course.top]])){if(distance(p)>1400)continue;const q=gpu.project(p.x,p.y,course.surface(p.x,p.y)+30);if(q.depth>4){ctx.fillStyle='#d9f7cf';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(name,q.x,q.y);}}

 }
 function map(ctx,point){ctx.strokeStyle='#a7efda';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=LENGTH;i+=40){const p=point(course.point(i));i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();for(const p of [course.base,course.top]){const q=point(p);ctx.fillStyle='#ffe19e';ctx.font='18px system-ui';ctx.textAlign='center';ctx.fillText('★',q.x,q.y+5);}}
 $('#ski-leave').onclick=leave;$('#ski-result-roam').onclick=leave;$('#ski-retry').onclick=launch;$('#ski-result').addEventListener('cancel',e=>{e.preventDefault();leave();});
 return {course,get stage(){return stage},get run(){return run},get active(){return !!stage},launch,startLift,summit,leave,step,draw,update,map,recover:()=>{if(run)recoverSki(run,course);},capture:input=>{if(stage==='run')captureSkiInput(run,{press:input.press,gas:input.drive,brake:input.brake,steer:input.steer,both:input.both});},clear:()=>{if(run)resetSkiInput(run);},get record(){return record}};
}

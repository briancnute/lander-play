import {skiCourse,newSkiRun,stepSki,recoverSki,loadSkiRecord,saveSkiResult,LENGTH,GATES,ITEMS} from './ski-run.js';
import {buildSkiWorld} from './ski-world.js';
import {canStartActivity} from '../shared/free-roam.js';
export function createSkiActivity(api){
 const {area,gpu,session}=api,course=skiCourse(area.ground,area.stops.at(-1)),world=buildSkiWorld(gpu,course);
 area.ground=course.surface;area.driveArea.ground=course.surface;gpu.ground=gpu.height=course.surface;
 const oldCamera=area.cameraSurface;area.cameraSurface=(x,y)=>Math.max(oldCamera(x,y),course.surface(x,y));
 let feedbackKey='',feedbackAt=0;
 let stage=null,run=null,liftAge=0,record;try{record=loadSkiRecord(localStorage);}catch{record={version:1,best:0,runs:0,combo:0};}
 const $=s=>document.querySelector(s),html=document.createElement('section');html.innerHTML=`
 <button id="ski-start" hidden></button><div id="ski-hud" hidden><b id="ski-clock"></b><span id="ski-score"></span><span id="ski-gate"></span><button id="ski-recover" aria-label="Recover at last gate, costs five seconds">↺</button></div>
 <div id="ski-combo" hidden></div><div id="ski-coach" role="status" hidden></div>
 <dialog id="ski-result"><span class="eyebrow">MOUNT SHARP / SKI BLADES</span><h2 id="ski-result-title"></h2><strong id="ski-result-score"></strong><p id="ski-result-copy"></p><button id="ski-retry" class="primary">Retry descent</button><button id="ski-result-roam">Free roam</button></dialog>`;document.body.append(html);const leaveButton=document.createElement('button');leaveButton.id='ski-leave';leaveButton.textContent='Free roam';document.querySelector('#settings').append(leaveButton);
 const activityBox=document.createElement('section');activityBox.className='ski-map-entry';activityBox.innerHTML='<h3>Mount Sharp ski blades</h3><p>Fictional downhill playground. Mint edges, mint time gates, gold tokens and jump lines. Each time gate adds 12 seconds and 400 points. Tokens add 250; tricks bank on clean landings.</p><button id="ski-guide">Guide to lift base</button><p id="ski-best"></p><details><summary>Ski controls</summary><p>Hold Boost for speed. Brake before turns. In the air, release Boost, tap a direction, then tap Trick for an Orbit. Double-tap the same direction for Double orbit; left then right (or right then left) gives Switch arc. More airtime allows another move. Land gently to bank; unfinished tricks lose the airborne combo. Repeated moves earn less.</p></details>';
 document.querySelector('.map-side').prepend(activityBox);$('#ski-guide').onclick=()=>api.guide({...course.base,id:'ski-base',name:'Ski lift base'});
 const distance=p=>Math.hypot(api.state.x-p.x,api.state.y-p.y);
 function startLift(){if(stage)return;api.save();session.begin('ski');stage='lift';liftAge=0;api.reset({...course.base,heading:Math.PI});api.resume();}
 function summit(){stage='summit';api.reset({...course.top,heading:0});api.resume();}
 function launch(){if(!stage){api.save();session.begin('ski');}else if(session.state.phase==='result')session.begin('ski');$('#ski-result').close();stage='run';run=newSkiRun(course);api.reset({...course.top,heading:0});api.state.skiBlades=true;api.resume();}
 function leave(){const p={x:api.state.x,y:api.state.y,heading:api.state.heading};stage=null;run=null;session.resume();$('#ski-result').close();api.reset(p);api.resume();api.save();update();}
 function result(){if(stage==='result')return;stage='result';session.finish();let storage;try{storage=localStorage;}catch{}const saved=saveSkiResult(storage,record,run);record=saved.record;$('#ski-result-title').textContent=run.reason;$('#ski-result-score').textContent=run.score.toLocaleString()+' points';$('#ski-result-copy').textContent=`${run.next}/${GATES.length} time gates · ${run.items.length}/${ITEMS.length} tokens · ${run.tricks.length} tricks · Best landing ${run.bestCombo}. ${run.reason==='Descent complete'?'Best completed descent: '+record.best.toLocaleString()+'.':'Finish all gates before time expires to set a best.'}${saved.saved?'':' Browser storage unavailable; this result could not be saved.'}`;api.openDialog('#ski-result');update();}
 function step(dt,input){if(!stage)return false;const s=api.state;s.t+=dt;
  if(stage==='lift'){liftAge=Math.min(8,liftAge+dt);const t=liftAge/8,p=course.point(LENGTH*(1-t));Object.assign(s,{x:p.x,y:p.y,z:course.surface(p.x,p.y)+70*Math.sin(t*Math.PI),v:0,air:true,liftCarrier:true,heading:Math.PI});if(liftAge===8)summit();return true;}
  if(stage!=='run')return true;
  stepSki(run,course,{gas:input.drive,brake:input.brake,steer:input.steer},dt);const p=course.point(run.s,run.u),q=course.point(run.s+5,run.u);const h=Math.atan2(q.x-p.x,-(q.y-p.y)),spin=run.trick?run.trick.direction*run.trick.turns*Math.PI*2*run.trick.age/run.trick.duration:0;
  Object.assign(s,{x:p.x,y:p.y,z:run.z,heading:h,skiSpin:spin,v:run.v,vz:run.vz,air:run.air,skiBlades:true,visualSteer:input.steer,visualBrake:input.brake,thrust:input.drive&&!run.air?1:0});
  if(run.phase==='result')result();return true;
 }
 function update(){document.body.dataset.ski=stage??'roam';$('#ski-leave').hidden=!stage;const start=$('#ski-start'),nearTop=distance(course.top)<65,nearBase=distance(course.base)<65,stopped=canStartActivity({distance:0,speed:api.state.v,radius:1,maxSpeed:1});
  start.hidden=api.paused||!(stage==='summit'||stage==='lift'||(!stage&&!api.state.air&&stopped&&(nearTop||nearBase)));
  start.textContent=stage==='lift'?'Skip lift · upper station':stage==='summit'||nearTop?'START · Ski-blade descent':'RIDE · Mount Sharp lift';
  start.onclick=()=>{if(stage==='lift')summit();else if(stage==='summit'||(!stage&&!api.state.air&&distance(course.top)<65&&Math.abs(api.state.v)<=1)){launch();}else if(!stage&&!api.state.air&&distance(course.base)<65&&Math.abs(api.state.v)<=1)startLift();};
  $('#recover').textContent=stage==='run'?'Recover last time gate · −5 seconds':'Return to the nearest trail stop';$('#recover').disabled=!!stage&&stage!=='run';$('#ski-hud').hidden=!stage||stage==='result'||api.paused;$('#ski-recover').hidden=stage!=='run';$('#ski-recover').disabled=run?.phase!=='running';$('#ski-clock').textContent=stage==='lift'?`LIFT ${Math.ceil(8-liftAge)}s`:stage==='summit'?'UPPER STATION':run?.phase==='countdown'?`START ${Math.ceil(run.countdown)}`:`${Math.ceil(run?.left??0)}s`;
  $('#ski-score').textContent=run?run.score.toLocaleString()+' pts':'';$('#ski-gate').textContent=run?`${run.next}/${GATES.length} gates`:'';
  if(stage)$('#target-hud').hidden=true;
  const key=run?[run.feedback,run.score,run.tricks.length,run.recoveries].join('|'):stage;
  const now=run?.time??liftAge;if(key!==feedbackKey||now<feedbackAt){feedbackKey=key;feedbackAt=now;}
  const age=now-feedbackAt;$('#ski-coach').hidden=!stage||stage==='result'||api.paused||age>=2.4;
  $('#ski-coach').textContent=stage==='lift'?'LIFT':stage==='summit'?'UPPER STATION':run?.feedback??'';
  $('#ski-coach').style.opacity=String(Math.min(1,Math.max(0,(2.4-age)/.6)));
  $('#ski-combo').hidden=stage!=='run'||api.paused||!run?.pending;$('#ski-combo').textContent=run?.pending?`${run.pending.toLocaleString()} × ${Math.min(4,1+run.chain*.5)}`:'';
  document.querySelector('[data-control=drive]').textContent=stage==='run'?(run.air?'Trick':'Boost'):'Drive';if(stage==='run')$('#brake').textContent='Brake';
  document.querySelector('header .eyebrow').textContent=stage?'MARS / SKI-BLADE ACTIVITY':'MARS / FREE ROAM · UNSCORED';$('#ski-best').textContent=record.best?'Best completed descent · '+record.best.toLocaleString()+' points':'No completed descent yet';
 }
 function draw(){world.draw(api.state,run);const ctx=$('#labels').getContext('2d');for(const [name,p]of [['SKI LIFT',course.base],['DOWNHILL START',course.top]]){if(distance(p)>1400)continue;const q=gpu.project(p.x,p.y,course.surface(p.x,p.y)+30);if(q.depth>4){ctx.fillStyle='#d9f7cf';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(name,q.x,q.y);}}
  if(stage==='run'){const g=GATES[run.next]??{s:LENGTH,u:0},p=course.point(g.s,g.u),q=gpu.project(p.x,p.y,course.height(g.s,g.u)+28);ctx.fillStyle='#d9f7cf';ctx.font='bold 12px system-ui';ctx.textAlign='center';const w=$('#labels').width,h=$('#labels').height;ctx.fillText(run.next<GATES.length?'TIME GATE':'FINISH',Math.max(70,Math.min(w-70,q.x)),Math.max(145,Math.min(h-115,q.depth>4?q.y:145)));}
 }
 function map(ctx,point){ctx.strokeStyle='#a7efda';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=LENGTH;i+=40){const p=point(course.point(i));i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();for(const p of [course.base,course.top]){const q=point(p);ctx.fillStyle='#ffe19e';ctx.font='18px system-ui';ctx.textAlign='center';ctx.fillText('★',q.x,q.y+5);}if(stage==='run')for(let i=run.next;i<GATES.length;i++){const p=point(course.point(GATES[i].s,GATES[i].u));ctx.fillStyle='#b8f5d6';ctx.fillRect(p.x-3,p.y-3,6,6);}}
 $('#ski-recover').onclick=()=>{if(run)recoverSki(run,course);update();};$('#ski-leave').onclick=leave;$('#ski-result-roam').onclick=leave;$('#ski-retry').onclick=launch;$('#ski-result').addEventListener('cancel',e=>{e.preventDefault();leave();});
 return {course,get stage(){return stage},get run(){return run},get active(){return !!stage},launch,startLift,summit,leave,step,draw,update,map,recover:()=>{if(run)recoverSki(run,course);},get record(){return record}};
}

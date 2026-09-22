import {acknowledgeRouteFact,routeComplete,routeScore,stepRouteRun} from './route-run.js';

// Only visible wall time unlocks a fact. Driving time comes from simulation steps.
export function createRouteRunUI(api,journey,record,onFinish){
 const course=journey.course,dialog=document.createElement('dialog');dialog.id='route-fact';dialog.setAttribute('aria-labelledby','route-fact-title');
 dialog.innerHTML='<span class="eyebrow" id="route-fact-number"></span><h2 id="route-fact-title"></h2><p id="route-fact-copy"></p><p id="route-fact-count" role="status" aria-live="polite"></p><button id="route-fact-resume" class="primary" disabled>Resume</button>';
 document.body.append(dialog);const guidance=document.createElement('div');guidance.id='route-guidance';guidance.hidden=true;document.body.append(guidance);const el=id=>dialog.querySelector('#route-fact-'+id),button=el('resume');let phase='closed',visibleTime=0,last=0,token=0;
 dialog.addEventListener('cancel',e=>e.preventDefault());
 dialog.addEventListener('keydown',e=>{if(e.repeat){e.preventDefault();e.stopPropagation();}});
 document.addEventListener('visibilitychange',()=>{last=performance.now();if(document.hidden&&phase==='countdown')visibleTime=0;});
 function show(){
  if(phase!=='closed'||record.status!=='active'||!record.run?.pending)return;
  const fact=course.facts.find(p=>p.id===record.run.pending);if(!fact)return;
  api.openDialog('#route-fact');phase='reading';visibleTime=0;last=performance.now();button.disabled=true;button.hidden=false;button.textContent='Resume';el('number').textContent=`PERSEVERANCE · CHECKPOINT ${record.run.facts.length+1} / ${course.facts.length}`;el('title').textContent=fact.name;el('copy').textContent=fact.fact;el('count').textContent='Take a moment · 2';api.save();const own=++token;
  function frame(now){if(own!==token||phase==='closed')return;const dt=Math.max(0,(now-last)/1000);last=now;if(!document.hidden&&dialog.open)visibleTime+=dt;
   if(phase==='reading'){button.disabled=visibleTime<2;el('count').textContent=visibleTime<2?`Take a moment · ${Math.ceil(2-visibleTime)}`:'Ready when you are.';}
   else if(phase==='countdown'){el('count').textContent=String(Math.max(1,3-Math.floor(visibleTime/.55)));if(visibleTime>=1.65){acknowledgeRouteFact(course,record.run);phase='closed';dialog.close();api.save();if(routeComplete(course,record.run))onFinish();else{guide();api.resume();}return;}}
   requestAnimationFrame(frame);
  }requestAnimationFrame(frame);
 }
 button.onclick=()=>{if(phase!=='reading'||visibleTime<2||document.hidden)return;phase='countdown';visibleTime=0;last=performance.now();button.disabled=true;button.hidden=true;el('count').textContent='3';};
 function guide(){if(record.status!=='active')return;const run=record.run,fact=course.facts[run.facts.length],p=course.points[Math.min(run.next,course.points.length-1)];api.nav.target={...p,name:fact?`Follow chevrons · ${fact.name}`:'Western frontier',routeRun:true};}
 function tick(dt,before){if(record.status!=='active'||record.returnPoint)return false;if(record.run.pending){show();return true;}const next=record.run.next;const fact=stepRouteRun(course,record.run,before,api.state,dt);if(next!==record.run.next){record.next=Math.min(journey.checkpoints.length,Math.floor(course.points[Math.min(record.run.next,course.points.length-1)].source)+1);if(!api.nav.target?.activityId)guide();}if(fact){show();return true;}return false;}
 function summary(){const run=record.run;return `${Math.floor(Math.min(1,(run.next-1)/(course.points.length-1))*100)}% route · ${run.facts.length}/${course.facts.length} checkpoints · ${run.elapsed?routeScore(run)+'% on path':'— on path'}`;}
 function update(){api.gpu.expeditionRouteActive=record.status==='active'&&!record.returnPoint;
  guidance.hidden=!api.gpu.expeditionRouteActive||api.state.mode!=='free'||phase!=='closed';if(guidance.hidden)return;
  const p=course.points[Math.min(record.run.next,course.points.length-1)],s=api.state,d=Math.hypot(p.x-s.x,p.y-s.y),a=Math.atan2(p.x-s.x,-(p.y-s.y))-s.heading,angle=Math.atan2(Math.sin(a),Math.cos(a)),rejoin=d>course.halfWidth+45;
  const direction=Math.abs(angle)>2?'Turn around':angle>.45?'Bear right':angle<-.45?'Bear left':'Follow cyan arrows';
  guidance.textContent=rejoin?`${direction} · Rejoin at the white map ring (${Math.round(d/3.2)} m)`:`${direction} · ${course.facts[record.run.facts.length]?.name??'Finish'}`;
 }
 return {show,guide,tick,summary,update,get locked(){return phase!=='closed'}};
}

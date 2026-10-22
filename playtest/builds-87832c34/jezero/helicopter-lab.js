import {stepRouteIntro} from './helicopter-intro.js';
import {startDiscovery,stepDiscovery} from './helicopter-discoveries.js';
import {flightReference,flightCeiling} from './helicopter-course.js';
import {spawnReactionTarget,resolveReactionPlane,reactionTargetsComplete} from './helicopter-reactions.js';
import {helicopterPose,followRelayHelicopter} from './relay-helicopter.js';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const approach=(a,b,delta)=>a+clamp(b-a,-delta,delta);
export const LAB_DEFAULTS={speed:280,strafe:180,strafeAcceleration:300,up:90,down:90,verticalAcceleration:180,clearance:35};
export const LAB_RANGES={speed:[60,700,10],strafe:[30,450,10],strafeAcceleration:[60,900,20],up:[10,250,5],down:[10,250,5],verticalAcceleration:[30,600,10],clearance:[15,100,5]};
export function labTune(value={}){return Object.fromEntries(Object.entries(LAB_DEFAULTS).map(([key,fallback])=>[key,Number.isFinite(value?.[key])?clamp(value[key],...LAB_RANGES[key].slice(0,2)):fallback]));}
export const activeFlightTarget=f=>f.pods.find(p=>p.spawned!==false&&!p.collected&&!p.passed)??null;
export const flightTargetsComplete=reactionTargetsComplete;
const smooth=t=>t*t*(3-2*t);
export function labLandingCue(f){return f.phase==='landing-cutscene'?'FLIGHT COMPLETE':'CROSS THE FINISH LINE · '+Math.ceil(Math.max(0,(f.course.finishS??f.course.length)-f.distance));}
export function startLabLaunch(f,ground,tuning){
 const speed=labTune(tuning).speed,start=f.course.start;
 f.distance=-speed;f.x=start.x+Math.sin(f.heading)*f.distance;f.y=start.y-Math.cos(f.heading)*f.distance;
 const padZ=Math.max(ground(f.x,f.y),...Array.from({length:24},(_,i)=>ground(f.x+Math.cos(i*Math.PI/12)*85,f.y+Math.sin(i*Math.PI/12)*85)))+2;
 f.phase='launch';f.launch={elapsed:0,speed,padZ,startZ:padZ+25,endZ:Math.max(ground(start.x,start.y),flightReference(f.course,0))+(f.course.launchHeight??130)};
 f.z=f.launch.startZ;f.v=f.vz=f.sideV=f.bank=0;
}
function stepLaunch(f,dt,ground,tuning){
 const a=f.launch,before=f.z;a.elapsed=Math.min(3,a.elapsed+dt);if(a.elapsed>3-1e-8)a.elapsed=3;
 const lift=smooth(clamp((a.elapsed-.35)/1.65,0,1)),forward=clamp((a.elapsed-1)/2,0,1);
 f.time+=dt;f.distance=-a.speed+a.speed*forward*forward;f.x=f.course.start.x+Math.sin(f.heading)*f.distance;f.y=f.course.start.y-Math.cos(f.heading)*f.distance;
 f.z=Math.max(ground(f.x,f.y)+25,a.startZ+(a.endZ-a.startZ)*lift);f.v=a.speed*forward;f.vz=(f.z-before)/dt;f.sideV=f.bank=0;
 if(a.elapsed>=3){f.phase='flying';f.distance=0;f.referenceZ=flightReference(f.course,0);f.vz=0;if(f.course.reactionTargets)spawnReactionTarget(f,ground,labTune(tuning));}
 return {...helicopterPose(f),air:a.elapsed>.35};
}
function startLandingFilm(f,ground){
 const p=f.course.finish,padZ=f.course.padZ??ground(p.x,p.y)+3;
 f.landingFilm={elapsed:0,duration:clamp(2+Math.max(0,f.z-padZ-25)/300,2,5),start:{x:f.x,y:f.y,z:f.z,v:f.v,bank:f.bank},padZ};
 f.phase='landing-cutscene';f.feedback=null;f.verticalLimit=null;
}
function stepLandingFilm(f,dt,ground){
 const a=f.landingFilm,p=f.course.finish,old={x:f.x,y:f.y,z:f.z};
 a.elapsed=Math.min(a.duration,a.elapsed+dt);if(a.elapsed>a.duration-1e-8)a.elapsed=a.duration;f.time+=dt;
 const t=a.elapsed/a.duration,ease=1-(1-t)**3,near=Math.min(a.start.z,a.padZ+80);
 f.x=a.start.x+(p.x-a.start.x)*ease;f.y=a.start.y+(p.y-a.start.y)*ease;
 const z=t<.65?a.start.z+(near-a.start.z)*smooth(t/.65):near+(a.padZ+25-near)*smooth((t-.65)/.35);
 f.z=Math.max(ground(f.x,f.y)+25,z);f.bank=a.start.bank*(1-smooth(clamp(t*3,0,1)));
 f.v=Math.hypot(f.x-old.x,f.y-old.y)/dt;f.vz=(f.z-old.z)/dt;f.sideV=0;
 if(a.elapsed===a.duration){f.phase='landed';f.x=p.x;f.y=p.y;f.z=a.padZ+25;f.v=f.vz=f.sideV=f.bank=0;}
 return {...helicopterPose(f),air:f.phase!=='landed'};
}
export function ingenuityForwardTilt(f){return f.phase==='landing'||f.phase==='landed'?0:-.1*Math.min(1,Math.max(0,f.v)/LAB_DEFAULTS.speed);}
export function followIngenuityFlight(camera,pose,dt,ground){
 followRelayHelicopter(camera,pose,dt,ground);camera.eye=Math.max(pose.z+78,ground(camera.x,camera.y)+12);
 // Keep the craft at a fixed screen elevation as the camera clears terrain or catches up.
 const back=Math.max(1,Math.hypot(camera.x-pose.x,camera.y-pose.y));
 camera.pitch=Math.atan2(camera.eye-pose.z,back)-Math.atan2(78,185)+.14;return camera;
}
export function followIngenuityLaunch(camera,pose,ground,launch){
 const t=smooth(clamp(launch.elapsed/3,0,1)),h=pose.heading-.55*(1-t),back=340-80*t;
 Object.assign(camera,{x:pose.x-Math.sin(h)*back,y:pose.y+Math.cos(h)*back,eye:Math.max(pose.z+78,ground(pose.x-Math.sin(h)*back,pose.y+Math.cos(h)*back)+30),heading:h,pitch:.14,zoom:1,live:true});return camera;
}
export function followIngenuityLanding(camera,pose,dt,ground,pad,heading,film){
 if(!film)return camera;
 if(!film.cameraStart)film.cameraStart={...camera};
 const initial=film.cameraStart,t=clamp(film.elapsed/film.duration,0,1),blend=smooth(t),h=initial.heading??heading;
 // Move the original camera offset with the craft every frame, then widen it.
 const origin=film.start,offsetX=initial.x-origin.x,offsetY=initial.y-origin.y,offsetZ=initial.eye-origin.z;
 camera.x=pose.x+offsetX+( -Math.sin(h)*700-offsetX)*blend;
 camera.y=pose.y+offsetY+( Math.cos(h)*700-offsetY)*blend;
 camera.eye=pose.z+offsetZ+(150-offsetZ)*blend;camera.zoom=(initial.zoom??1)+(.85-(initial.zoom??1))*blend;
 camera.eye=Math.max(camera.eye,ground(camera.x,camera.y)+30);const back=Math.hypot(camera.x-pose.x,camera.y-pose.y);camera.pitch=Math.atan2(camera.eye-pose.z-10,back);

 camera.heading=h;camera.eye=Math.max(camera.eye,ground(camera.x,camera.y)+30);camera.live=true;return camera;
}

export function stepLabHelicopter(f,input,dt,ground,tuning){
 if(!Number.isFinite(dt)||dt<=0||f.phase==='landed')return {...helicopterPose(f),air:f.phase!=='landed'};
 if(f.phase==='route-intro'){stepRouteIntro(f,dt);return {...helicopterPose(f),air:false};}
 if(f.phase==='site-film'){stepDiscovery(f,dt);return {...helicopterPose(f),air:true};}
 if(f.phase==='launch')return stepLaunch(f,dt,ground,tuning);
 if(f.phase==='landing-cutscene')return stepLandingFilm(f,dt,ground);
 const t=labTune(f.finishTune??tuning),before={x:f.x,y:f.y,z:f.z,distance:f.distance??0},steer=clamp(input.steer||0,-1,1),down=!!(input.brake||input.special),up=!!input.drive&&!down;
 f.time+=dt;f.steerCommand=steer;f.verticalCommand=up?1:down?-1:0;
 if(f.course?.reactionTargets&&!activeFlightTarget(f)&&!flightTargetsComplete(f))spawnReactionTarget(f,ground,t);
 const finishS=f.course?(f.course.finishS??f.course.length):Infinity;
 if(f.feedback&&f.time-f.feedback.time>1.1)f.feedback=null;
 const travel=Math.min(t.speed*dt,Math.max(0,finishS-(f.distance??0)));f.v=travel/dt;
 f.distance=(f.distance??0)+travel;if(steer*f.sideV<0)f.sideV=0;f.sideV=steer?approach(f.sideV,steer*t.strafe,t.strafeAcceleration*dt):0;f.bank+=(steer*.5-f.bank)*(1-Math.exp(-dt*7));
 f.x+=(Math.sin(f.heading)*(travel/dt)+Math.cos(f.heading)*f.sideV)*dt;f.y+=(-Math.cos(f.heading)*(travel/dt)+Math.sin(f.heading)*f.sideV)*dt;
 if(f.course){const cx=f.course.start.x+Math.sin(f.heading)*f.distance,cy=f.course.start.y-Math.cos(f.heading)*f.distance,side=(f.x-cx)*Math.cos(f.heading)+(f.y-cy)*Math.sin(f.heading),bounded=clamp(side,-(f.course.halfWidth??700),f.course.halfWidth??700);f.x=cx+Math.cos(f.heading)*bounded;f.y=cy+Math.sin(f.heading)*bounded;if(side!==bounded)f.sideV=0;}
 // Opposite thrust responds immediately; Down wins overlapping altitude inputs.
 if((down&&f.vz>0)||(up&&f.vz<0))f.vz=0;
 f.vz=up||down?approach(f.vz,up?t.up:-t.down,t.verticalAcceleration*dt):0;f.z+=f.vz*dt+flightReference(f.course,f.distance)-flightReference(f.course,before.distance);
 f.referenceZ=flightReference(f.course,f.distance);
 const floor=ground(f.x,f.y)+t.clearance,ceiling=Math.max(floor,Number.isFinite(flightCeiling(f.course,f.distance))?flightCeiling(f.course,f.distance):ground(f.x,f.y)+700);
 f.verticalLimit=f.z<floor?'ground':f.z>ceiling?'ceiling':null;
 if(f.z<floor){f.z=floor;f.vz=Math.max(0,f.vz);}if(f.z>ceiling){f.z=ceiling;f.vz=Math.min(0,f.vz);}
 if(f.course?.reactionTargets)resolveReactionPlane(f,before,ground,t);else{
 for(const p of [activeFlightTarget(f)].filter(Boolean)){const dx=f.x-before.x,dy=f.y-before.y,dz=f.z-before.z,n=dx*dx+dy*dy+dz*dz,a=n?clamp(((p.x-before.x)*dx+(p.y-before.y)*dy+(p.z-before.z)*dz)/n,0,1):0;if(Math.hypot(p.x-before.x-dx*a,p.y-before.y-dy*a,p.z-before.z-dz*a)<=85){p.collected=true;f.collected++;f.feedback={text:"TARGET COLLECTED · "+f.collected+" / "+f.pods.length,time:f.time};}}
 for(const p of f.pods)if(!p.collected&&!p.passed&&Number.isFinite(p.s)&&f.distance>p.s+100){p.passed=true;f.feedback={text:"TARGET MISSED",time:f.time};}
 }
 startDiscovery(f);
 if(f.course&&f.distance>=finishS&&flightTargetsComplete(f))startLandingFilm(f,ground);
 return {...helicopterPose(f),air:f.phase!=='landed'};
}
export function mountHelicopterLab({restart}){
 let tune;try{const saved=JSON.parse(localStorage.getItem('astra.helicopterLab.tuning.v1')??'{}');if(!saved?.responseVersion&&saved?.down===70)saved.down=90;tune=labTune(saved);}catch{tune=labTune();}
 const panel=document.createElement('section');panel.id='helicopter-lab-tools';panel.hidden=true;panel.setAttribute('aria-label','Helicopter developer tuning');
 panel.innerHTML='<h2>Ingenuity · Flight tuning</h2><p>Changes apply immediately. No race records.</p><div id="lab-sliders"></div><div class="lab-actions"><button id="lab-reset">Defaults</button><button id="lab-restart">Restart flight</button><button id="lab-export">Show settings</button></div><textarea aria-label="Exported helicopter settings" readonly hidden></textarea>';
 const labels={speed:'Forward speed',strafe:'Strafe power',strafeAcceleration:'Strafe response',up:'Up thrust',down:'Down thrust',verticalAcceleration:'Vertical response',clearance:'Terrain clearance'};
 const save=()=>{try{localStorage.setItem('astra.helicopterLab.tuning.v1',JSON.stringify({...tune,responseVersion:2}));}catch{}};
 for(const [key,[min,max,step]] of Object.entries(LAB_RANGES)){const label=document.createElement('label');label.innerHTML=`<span>${labels[key]} <output>${tune[key]}</output></span><input type="range" data-lab-tune="${key}" min="${min}" max="${max}" step="${step}" value="${tune[key]}">`;label.querySelector('input').oninput=e=>{tune[key]=Number(e.target.value);label.querySelector('output').value=tune[key];save();};panel.querySelector('#lab-sliders').append(label);}
 panel.querySelector('#lab-reset').onclick=()=>{tune=labTune();for(const input of panel.querySelectorAll('input')){input.value=tune[input.dataset.labTune];input.previousElementSibling.querySelector('output').value=input.value;}save();};
 panel.querySelector('#lab-restart').onclick=restart;panel.querySelector('#lab-export').onclick=()=>{const field=panel.querySelector('textarea');field.hidden=false;field.value=JSON.stringify(tune,null,2);field.select();};
 const button=document.createElement('button');button.id='helicopter-lab-toggle';button.textContent='⚙ Tuning';button.setAttribute('aria-expanded','false');button.onclick=()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));};document.body.append(button,panel);
 return {get tune(){return {...tune};},panel};
}

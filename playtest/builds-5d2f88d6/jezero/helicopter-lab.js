import {helicopterPose} from './relay-helicopter.js';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const approach=(a,b,delta)=>a+clamp(b-a,-delta,delta);
export const LAB_DEFAULTS={speed:280,strafe:180,strafeAcceleration:300,up:90,down:70,verticalAcceleration:180,clearance:35};
export const LAB_RANGES={speed:[60,700,10],strafe:[30,450,10],strafeAcceleration:[60,900,20],up:[10,250,5],down:[10,250,5],verticalAcceleration:[30,600,10],clearance:[15,100,5]};
export function labTune(value={}){return Object.fromEntries(Object.entries(LAB_DEFAULTS).map(([key,fallback])=>[key,Number.isFinite(value?.[key])?clamp(value[key],...LAB_RANGES[key].slice(0,2)):fallback]));}
export const activeFlightTarget=f=>f.pods.find(p=>!p.collected&&!p.passed)??null;
export function labLandingCue(f){
 if(f.phase==='landing-cutscene')return 'LANDING CAMERA · GET READY';
 if(f.phase==='landing'){const p=f.course.finish,h=f.heading-Math.PI/2,side=(p.x-f.x)*Math.cos(h)+(p.y-f.y)*Math.sin(h);return Math.abs(side)>65?(side<0?'← CENTER OVER PAD':'CENTER OVER PAD →'):f.z>f.landingFilm.padZ+26?'DOWN / SHIFT · LOWER TO PAD':'HOLD STEADY';}
 return 'CROSS THE FINISH LINE · '+Math.ceil(Math.max(0,(f.course.finishS??f.course.length)-f.distance));
}
export function startLabLaunch(f,ground,tuning){
 const speed=labTune(tuning).speed,start=f.course.start;
 f.phase='launch';f.launch={elapsed:0,speed,startZ:ground(start.x-Math.sin(f.heading)*speed*1.5,start.y+Math.cos(f.heading)*speed*1.5)+25,endZ:ground(start.x,start.y)+130};
 f.distance=-speed*1.5;f.x=start.x+Math.sin(f.heading)*f.distance;f.y=start.y-Math.cos(f.heading)*f.distance;f.z=f.launch.startZ;f.v=f.vz=f.sideV=f.bank=0;
}
function stepLaunch(f,dt,ground){
 const a=f.launch,before=f.z;a.elapsed=Math.min(3,a.elapsed+dt);if(a.elapsed>3-1e-8)a.elapsed=3;const t=a.elapsed/3,ease=t*t*(3-2*t);
 f.time+=dt;f.distance=-a.speed*1.5+a.speed*a.elapsed*a.elapsed/6;f.x=f.course.start.x+Math.sin(f.heading)*f.distance;f.y=f.course.start.y-Math.cos(f.heading)*f.distance;
 f.z=Math.max(ground(f.x,f.y)+25,a.startZ+(a.endZ-a.startZ)*ease);f.v=a.speed*t;f.vz=(f.z-before)/dt;f.sideV=f.bank=0;
 if(a.elapsed>=3){f.phase='flying';f.distance=0;f.vz=0;}
 return helicopterPose(f);
}
function startLandingFilm(f,ground){
 const p=f.course.finish,padZ=f.course.padZ??ground(p.x,p.y)+3;
 const terrain=Math.max(...Array.from({length:21},(_,i)=>{const t=i/20;return ground(f.x+(p.x-f.x)*t,f.y+(p.y-f.y)*t);}));
 f.landingFilm={elapsed:0,start:{x:f.x,y:f.y,z:f.z,vx:Math.sin(f.heading)*f.v+Math.cos(f.heading)*f.sideV,vy:-Math.cos(f.heading)*f.v+Math.sin(f.heading)*f.sideV,bank:f.bank},hoverZ:Math.max(f.z,padZ+180,terrain+45),padZ};
 f.phase='landing-cutscene';f.feedback=null;f.verticalLimit=null;
}
function stepLandingFilm(f,dt,ground){
 const a=f.landingFilm,p=f.course.finish,old={x:f.x,y:f.y,z:f.z},align=1.2,descent=1.4,total=align+descent;
 a.elapsed=Math.min(total,a.elapsed+dt);if(a.elapsed>total-1e-8)a.elapsed=total;f.time+=dt;
 const t=Math.min(1,a.elapsed/align),ease=t*t*(3-2*t),h00=2*t*t*t-3*t*t+1,h10=t*t*t-2*t*t+t,h01=-2*t*t*t+3*t*t;
 f.x=h00*a.start.x+h10*align*a.start.vx+h01*p.x;f.y=h00*a.start.y+h10*align*a.start.vy+h01*p.y;f.bank=a.start.bank*(1-ease);
 const down=Math.max(0,Math.min(1,(a.elapsed-align)/descent)),lower=down*down*(3-2*down),hover=a.padZ+165;
 f.z=Math.max(ground(f.x,f.y)+25,a.elapsed<align?a.start.z+(a.hoverZ-a.start.z)*ease:a.hoverZ+(hover-a.hoverZ)*lower);
 f.v=Math.hypot(f.x-old.x,f.y-old.y)/dt;f.vz=(f.z-old.z)/dt;f.sideV=0;
 if(a.elapsed>=align){f.x=p.x;f.y=p.y;f.v=0;}
 if(a.elapsed===total){f.phase='landing';f.z=hover;f.v=f.vz=f.bank=0;f.touchdownHold=0;}
 return helicopterPose(f);
}
function stepLanding(f,input,dt,ground,tuning){
 const t=labTune(tuning),p=f.course.finish,h=f.heading-Math.PI/2,steer=clamp(input.steer||0,-1,1),down=!!(input.special||input.brake),up=!!input.drive&&!down;
 f.time+=dt;f.v=0;f.sideV=steer?approach(f.sideV,steer*Math.min(60,t.strafe*.35),Math.max(180,t.strafeAcceleration)*dt):0;f.bank+=(steer*.12-f.bank)*(1-Math.exp(-dt*10));
 let side=(f.x-p.x)*Math.cos(h)+(f.y-p.y)*Math.sin(h)+f.sideV*dt;side=clamp(side,-220,220);f.x=p.x+Math.cos(h)*side;f.y=p.y+Math.sin(h)*side;
 const floor=Math.abs(side)<=120?f.landingFilm.padZ+25:ground(f.x,f.y)+25,low=f.z-floor<45;
 if((down&&f.vz>0)||(up&&f.vz<0))f.vz=0;
 f.vz=up||down?approach(f.vz,up?Math.min(50,t.up*.5):-Math.min(low?18:35,t.down*.5),t.verticalAcceleration*dt):0;
 f.z=clamp(f.z+f.vz*dt,floor,Math.max(floor,f.landingFilm.padZ+230));if(f.z===floor&&f.vz<0)f.vz=0;
 const contact=Math.abs(side)<=65&&f.z<=f.landingFilm.padZ+25.3&&!up&&Math.abs(f.sideV)<=8&&Math.abs(f.bank)<.1;
 f.touchdownHold=contact?f.touchdownHold+dt:0;if(f.touchdownHold>=.3){f.phase='landed';f.vz=f.sideV=f.bank=0;f.z=f.landingFilm.padZ+25;}
 return {...helicopterPose(f),air:!contact};
}
export function ingenuityForwardTilt(f){return f.phase==='landing'||f.phase==='landed'?0:-.1*Math.min(1,Math.max(0,f.v)/LAB_DEFAULTS.speed);}
export function followIngenuityLanding(camera,pose,dt,ground,pad,heading){
 const h=heading-Math.PI/2,back=580,x=pad.x-Math.sin(h)*back,y=pad.y+Math.cos(h)*back,eye=Math.max(pad.z+210,ground(x,y)+30),pitch=Math.atan2(eye-pad.z-110,back),blend=1-Math.exp(-Math.min(.05,dt)*3.5);
 for(const [key,value]of Object.entries({x,y,eye,pitch,zoom:1.1}))camera[key]=(camera[key]??value)+(value-(camera[key]??value))*blend;
 camera.heading=(camera.heading??h)+Math.atan2(Math.sin(h-(camera.heading??h)),Math.cos(h-(camera.heading??h)))*blend;camera.eye=Math.max(camera.eye,ground(camera.x,camera.y)+20);camera.live=true;return camera;
}

export function stepLabHelicopter(f,input,dt,ground,tuning){
 if(!Number.isFinite(dt)||dt<=0||f.phase==='landed')return {...helicopterPose(f),air:f.phase!=='landed'};
 if(f.phase==='launch')return stepLaunch(f,dt,ground);
 if(f.phase==='landing-cutscene')return stepLandingFilm(f,dt,ground);
 if(f.phase==='landing')return stepLanding(f,input,dt,ground,tuning);
 const t=labTune(tuning),before={x:f.x,y:f.y,z:f.z},steer=clamp(input.steer||0,-1,1),down=!!(input.brake||input.special),up=!!input.drive&&!down;
 f.time+=dt;
 const finishS=f.course?(f.course.finishS??f.course.length):Infinity;
 if(f.feedback&&f.time-f.feedback.time>1.1)f.feedback=null;
 const travel=Math.min(t.speed*dt,Math.max(0,finishS-(f.distance??0)));f.v=travel/dt;
 f.distance=(f.distance??0)+travel;f.sideV=approach(f.sideV,steer*t.strafe,t.strafeAcceleration*dt);f.bank+=(steer*.5-f.bank)*(1-Math.exp(-dt*7));
 f.x+=(Math.sin(f.heading)*(travel/dt)+Math.cos(f.heading)*f.sideV)*dt;f.y+=(-Math.cos(f.heading)*(travel/dt)+Math.sin(f.heading)*f.sideV)*dt;
 if(f.course){const cx=f.course.start.x+Math.sin(f.heading)*f.distance,cy=f.course.start.y-Math.cos(f.heading)*f.distance,side=(f.x-cx)*Math.cos(f.heading)+(f.y-cy)*Math.sin(f.heading),bounded=clamp(side,-700,700);f.x=cx+Math.cos(f.heading)*bounded;f.y=cy+Math.sin(f.heading)*bounded;if(side!==bounded)f.sideV=0;}
 // Opposite thrust responds immediately; Down wins overlapping altitude inputs.
 if((down&&f.vz>0)||(up&&f.vz<0))f.vz=0;
 f.vz=up||down?approach(f.vz,up?t.up:-t.down,t.verticalAcceleration*dt):0;f.z+=f.vz*dt;
 const floor=ground(f.x,f.y)+t.clearance,ceiling=Math.max(floor,f.course?.ceilingZ??ground(f.x,f.y)+700);
 f.verticalLimit=f.z<floor?'ground':f.z>ceiling?'ceiling':null;
 if(f.z<floor){f.z=floor;f.vz=Math.max(0,f.vz);}if(f.z>ceiling){f.z=ceiling;f.vz=Math.min(0,f.vz);}
 for(const p of [activeFlightTarget(f)].filter(Boolean)){const dx=f.x-before.x,dy=f.y-before.y,dz=f.z-before.z,n=dx*dx+dy*dy+dz*dz,a=n?clamp(((p.x-before.x)*dx+(p.y-before.y)*dy+(p.z-before.z)*dz)/n,0,1):0;if(Math.hypot(p.x-before.x-dx*a,p.y-before.y-dy*a,p.z-before.z-dz*a)<=85){p.collected=true;f.collected++;f.feedback={text:"TARGET COLLECTED · "+f.collected+" / "+f.pods.length,time:f.time};}}
 for(const p of f.pods)if(!p.collected&&!p.passed&&Number.isFinite(p.s)&&f.distance>p.s+100){p.passed=true;f.feedback={text:"TARGET MISSED",time:f.time};}
 if(f.course&&f.distance>=finishS&&!activeFlightTarget(f))startLandingFilm(f,ground);
 return {...helicopterPose(f),air:f.phase!=='landed'};
}
export function mountHelicopterLab({restart}){
 let tune;try{tune=labTune(JSON.parse(localStorage.getItem('astra.helicopterLab.tuning.v1')??'{}'));}catch{tune=labTune();}
 const panel=document.createElement('section');panel.id='helicopter-lab-tools';panel.hidden=true;panel.setAttribute('aria-label','Helicopter developer tuning');
 panel.innerHTML='<h2>Ingenuity · Flight tuning</h2><p>Changes apply immediately. No race records.</p><div id="lab-sliders"></div><div class="lab-actions"><button id="lab-reset">Defaults</button><button id="lab-restart">Restart flight</button><button id="lab-export">Show settings</button></div><textarea aria-label="Exported helicopter settings" readonly hidden></textarea>';
 const labels={speed:'Forward speed',strafe:'Strafe power',strafeAcceleration:'Strafe response',up:'Up thrust',down:'Down thrust',verticalAcceleration:'Vertical response',clearance:'Terrain clearance'};
 const save=()=>{try{localStorage.setItem('astra.helicopterLab.tuning.v1',JSON.stringify(tune));}catch{}};
 for(const [key,[min,max,step]] of Object.entries(LAB_RANGES)){const label=document.createElement('label');label.innerHTML=`<span>${labels[key]} <output>${tune[key]}</output></span><input type="range" data-lab-tune="${key}" min="${min}" max="${max}" step="${step}" value="${tune[key]}">`;label.querySelector('input').oninput=e=>{tune[key]=Number(e.target.value);label.querySelector('output').value=tune[key];save();};panel.querySelector('#lab-sliders').append(label);}
 panel.querySelector('#lab-reset').onclick=()=>{tune=labTune();for(const input of panel.querySelectorAll('input')){input.value=tune[input.dataset.labTune];input.previousElementSibling.querySelector('output').value=input.value;}save();};
 panel.querySelector('#lab-restart').onclick=restart;panel.querySelector('#lab-export').onclick=()=>{const field=panel.querySelector('textarea');field.hidden=false;field.value=JSON.stringify(tune,null,2);field.select();};
 const button=document.createElement('button');button.id='helicopter-lab-toggle';button.textContent='⚙ Tuning';button.setAttribute('aria-expanded','false');button.onclick=()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));};document.body.append(button,panel);
 return {get tune(){return {...tune};},panel};
}

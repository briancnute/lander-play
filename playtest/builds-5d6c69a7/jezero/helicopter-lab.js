import {helicopterPose} from './relay-helicopter.js';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const approach=(a,b,delta)=>a+clamp(b-a,-delta,delta);
export const LAB_DEFAULTS={speed:280,strafe:180,strafeAcceleration:300,up:90,down:70,verticalAcceleration:180,verticalDamping:140,clearance:35};
export const LAB_RANGES={speed:[60,700,10],strafe:[30,450,10],strafeAcceleration:[60,900,20],up:[10,250,5],down:[10,250,5],verticalAcceleration:[30,600,10],verticalDamping:[20,600,10],clearance:[15,100,5]};
export function labTune(value={}){return Object.fromEntries(Object.entries(LAB_DEFAULTS).map(([key,fallback])=>[key,Number.isFinite(value?.[key])?clamp(value[key],...LAB_RANGES[key].slice(0,2)):fallback]));}
export const activeFlightTarget=f=>f.pods.find(p=>!p.collected&&!p.passed)??null;
export function stepLabHelicopter(f,input,dt,ground,tuning){
 if(!Number.isFinite(dt)||dt<=0||f.phase==='landed')return {...helicopterPose(f),air:f.phase!=='landed'};
 const t=labTune(tuning),before={x:f.x,y:f.y,z:f.z},steer=clamp(input.steer||0,-1,1),up=!!input.drive,down=!!(input.brake||input.special);
 f.time+=dt;
 const landing=!!f.course&&!activeFlightTarget(f),remaining=f.course?Math.max(0,f.course.length-(f.distance??0)):Infinity;
 if(landing&&f.phase==='flying')f.phase='approach';
 let travel=t.speed*dt;
 if(f.phase==='approach'||f.phase==='landing'){travel=remaining<.5?remaining:remaining*(1-Math.exp(-Math.min(2,t.speed/Math.max(.001,remaining))*dt));f.v=travel/dt;if(remaining-travel<.5){travel=remaining;f.v=0;f.phase='landing';}}else f.v=t.speed;
 f.distance=(f.distance??0)+travel;f.sideV=approach(f.sideV,steer*t.strafe,t.strafeAcceleration*dt);f.bank+=(steer*.5-f.bank)*(1-Math.exp(-dt*7));
 f.x+=(Math.sin(f.heading)*(travel/dt)+Math.cos(f.heading)*f.sideV)*dt;f.y+=(-Math.cos(f.heading)*(travel/dt)+Math.sin(f.heading)*f.sideV)*dt;
 if(f.course){const cx=f.course.start.x+Math.sin(f.heading)*f.distance,cy=f.course.start.y-Math.cos(f.heading)*f.distance,side=(f.x-cx)*Math.cos(f.heading)+(f.y-cy)*Math.sin(f.heading),bounded=clamp(side,-700,700);f.x=cx+Math.cos(f.heading)*bounded;f.y=cy+Math.sin(f.heading)*bounded;if(side!==bounded)f.sideV=0;}
 const nearPad=landing&&Math.hypot(f.x-f.course.finish.x,f.y-f.course.finish.y)<=120&&f.z<(f.course.padZ??ground(f.course.finish.x,f.course.finish.y)+3)+105;
 f.vz=approach(f.vz,up===down?0:up?t.up:-(nearPad?Math.min(18,t.down):t.down),(up===down?t.verticalDamping:t.verticalAcceleration)*dt);f.z+=f.vz*dt;
 const pad=f.course?.finish,padZ=pad?(f.course.padZ??ground(pad.x,pad.y)+3):0,padDistance=pad?Math.hypot(f.x-pad.x,f.y-pad.y):Infinity,onPad=landing&&padDistance<=120;
 const floor=onPad?padZ+25:ground(f.x,f.y)+t.clearance,ceiling=ground(f.x,f.y)+700;
 const contact=f.z<=floor+.3,impact=Math.abs(f.vz);
if(f.z<floor){f.z=floor;f.vz=Math.max(0,f.vz);}if(f.z>ceiling){f.z=ceiling;f.vz=Math.min(0,f.vz);}
 for(const p of [activeFlightTarget(f)].filter(Boolean)){const dx=f.x-before.x,dy=f.y-before.y,dz=f.z-before.z,n=dx*dx+dy*dy+dz*dz,a=n?clamp(((p.x-before.x)*dx+(p.y-before.y)*dy+(p.z-before.z)*dz)/n,0,1):0;if(Math.hypot(p.x-before.x-dx*a,p.y-before.y-dy*a,p.z-before.z-dz*a)<=85){p.collected=true;f.collected++;}}
 for(const p of f.pods)if(!p.collected&&Number.isFinite(p.s)&&f.distance>p.s+100)p.passed=true;
 if(f.phase==='landing'){
  const stable=!up&&onPad&&padDistance<=65&&contact&&impact<=22&&Math.abs(f.sideV)<=25&&Math.abs(f.bank)<.18;
  f.touchdownHold=stable?(f.touchdownHold??0)+dt:0;
  if(f.touchdownHold>=.45){f.phase='landed';f.v=f.vz=f.sideV=0;f.bank=0;f.z=padZ+25;}
 }
 return {...helicopterPose(f),air:f.phase!=='landed'};
}
export function mountHelicopterLab({restart}){
 let tune;try{tune=labTune(JSON.parse(localStorage.getItem('astra.helicopterLab.tuning.v1')??'{}'));}catch{tune=labTune();}
 const panel=document.createElement('section');panel.id='helicopter-lab-tools';panel.hidden=true;panel.setAttribute('aria-label','Helicopter developer tuning');
 panel.innerHTML='<h2>Ingenuity · Flight tuning</h2><p>Changes apply immediately. No race records.</p><div id="lab-sliders"></div><div class="lab-actions"><button id="lab-reset">Defaults</button><button id="lab-restart">Restart flight</button><button id="lab-export">Show settings</button></div><textarea aria-label="Exported helicopter settings" readonly hidden></textarea>';
 const labels={speed:'Forward speed',strafe:'Strafe power',strafeAcceleration:'Strafe response',up:'Up thrust',down:'Down thrust',verticalAcceleration:'Vertical response',verticalDamping:'Release damping',clearance:'Terrain clearance'};
 const save=()=>{try{localStorage.setItem('astra.helicopterLab.tuning.v1',JSON.stringify(tune));}catch{}};
 for(const [key,[min,max,step]] of Object.entries(LAB_RANGES)){const label=document.createElement('label');label.innerHTML=`<span>${labels[key]} <output>${tune[key]}</output></span><input type="range" data-lab-tune="${key}" min="${min}" max="${max}" step="${step}" value="${tune[key]}">`;label.querySelector('input').oninput=e=>{tune[key]=Number(e.target.value);label.querySelector('output').value=tune[key];save();};panel.querySelector('#lab-sliders').append(label);}
 panel.querySelector('#lab-reset').onclick=()=>{tune=labTune();for(const input of panel.querySelectorAll('input')){input.value=tune[input.dataset.labTune];input.previousElementSibling.querySelector('output').value=input.value;}save();};
 panel.querySelector('#lab-restart').onclick=restart;panel.querySelector('#lab-export').onclick=()=>{const field=panel.querySelector('textarea');field.hidden=false;field.value=JSON.stringify(tune,null,2);field.select();};
 const button=document.createElement('button');button.id='helicopter-lab-toggle';button.textContent='⚙ Tuning';button.setAttribute('aria-expanded','false');button.onclick=()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));};document.body.append(button,panel);
 return {get tune(){return {...tune};},panel};
}

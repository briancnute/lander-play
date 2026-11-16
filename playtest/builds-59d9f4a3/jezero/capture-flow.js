import {triangle} from '../mars-renderer/triangle.js';
const SOUND_KEY='astra.ingenuity.capture-sound.v1';
export function createCaptureAudio({Context=globalThis.AudioContext??globalThis.webkitAudioContext,storage=globalThis.localStorage}={}){
 let context=null,enabled=true,lastEvent=null,eventCount=0;const voices=new Set();
 try{enabled=storage?.getItem(SOUND_KEY)!=='off';}catch{}
 const masterOn=()=>{try{return JSON.parse(storage?.getItem('lander.save')??'null')?.settings?.sound!==false;}catch{return true;}};
 function silence(){for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
 function unlock(){if(!enabled||!masterOn()||!Context)return;try{context??=new Context();if(context.state==='suspended')context.resume().catch(()=>{});}catch{context=null;}}
 function note(frequency,delay,duration,volume){
  if(voices.size>=12)return;const now=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);osc.connect(gain);gain.connect(context.destination);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};voices.add(osc);osc.start(now);osc.stop(now+duration+.02);
 }
 return {
  unlock,silence,
  reset(){silence();lastEvent=null;eventCount=0;},
  setEnabled(value){enabled=!!value;try{storage?.setItem(SOUND_KEY,enabled?'on':'off');}catch{}if(!enabled)silence();else unlock();},
  get masterOn(){return masterOn();},
  get status(){return {enabled:enabled&&masterOn(),state:context?.state??'uninitialized',voices:voices.size,events:eventCount};},
  handle(event){if(!event||event===lastEvent)return;lastEvent=event;if(!enabled||!masterOn()){silence();return;}if(!context||context.state!=='running')return;eventCount++;
   if(event.kind==='miss'){silence();note(261.63,0,.16,.012);return;}
   const streak=event.streak??1,scale=[523.25,587.33,659.25,783.99,880,1046.5],root=scale[(streak-1)%scale.length];note(root,0,.27,.028);
   if(streak>=3)note(root*.75,.09,.25,.018);
   if(streak>=6)note(root*1.5,.18,.3,.013);
  }
 };
}
export function createCaptureShimmer(gpu){
 const shapes=[];
 // Tiny foil glints, not a halo or a screen flash. Existing craft transforms apply.
 for(const [x,y,z]of [[-7,-8,0],[7,5,4],[-5,8,8],[0,-4,10]]){
  triangle(shapes,[x-1.1,y,z],[x,y,z+3],[x+1.1,y,z],[1,.97,.75]);triangle(shapes,[x-1.1,y,z],[x+1.1,y,z],[x,y,z-3],[1,.97,.75]);
 }
 const mesh=gpu.upload(new Float32Array(shapes));
 return {draw(p,flight){const age=flight.time-(flight.lastFlowCapture??-10);if(!flight.captureStreak||age<0||age>.55||flight.phase!=='flying')return;gpu.mesh(mesh,[p.x,p.y,p.z+Math.sin(age/.55*Math.PI)*3,p.heading],7);}};
}

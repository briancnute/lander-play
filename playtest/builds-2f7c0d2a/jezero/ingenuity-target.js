import {triangle} from '../mars-renderer/geometry.js';
// Seeded irregular dust, uploaded once. The collection plane and tolerance stay unchanged.
export function createIngenuityTarget(gpu){
 let seed=7291;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 function mote(out,x,y,z,size,color){triangle(out,[x-size,y,z],[x,y,z+size*1.7],[x+size,y,z],color);triangle(out,[x-size,y,z],[x+size,y,z],[x,y,z-size*1.1],color);}
 const gl=gpu.gl,dust=[],haze=[],spark=[];
 for(let i=0;i<140;i++){
  const angle=random()*Math.PI*2,r=Math.pow(random(),.8),x=Math.cos(angle)*52*r,z=Math.sin(angle)*83*r,y=(random()-.5)*24;
  mote(dust,x,y,z,.6+random()*1.3,i%9===0?[.74,1,.97]:i%3===0?[1,.94,.7]:[1,.77,.38]);
 }
 // Overlapping translucent wisps supply a soft center without a visible outline.
 for(let i=0;i<34;i++){const a=random()*Math.PI*2,r=random(),x=Math.cos(a)*30*r,z=Math.sin(a)*48*r;mote(haze,x,(random()-.5)*20,z,7+random()*13,[1,.74,.4]);}
 mote(spark,0,0,0,1.2,[1,.91,.62]);
 const cloud=gpu.upload(new Float32Array(dust)),wisps=gpu.upload(new Float32Array(haze)),fleck=gpu.upload(new Float32Array(spark));
 function veil(actor){gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);gpu.mesh(wisps,actor,9);gl.depthMask(true);gl.disable(gl.BLEND);}
 return {
  draw(p,heading,time){const sway=Math.sin(time*.7)*3;veil([p.x,p.y,p.z,heading]);gpu.mesh(cloud,[p.x+Math.cos(heading)*sway,p.y+Math.sin(heading)*sway,p.z+Math.sin(time*.9)*2,heading],7);},
  effect(event,time){if(!event?.target)return;const t=time-event.time;if(t<0||t>.7)return;const p=event.target,h=event.heading,hit=event.kind==='hit';
   if(hit&&t<.18)veil([p.x,p.y,p.z,h]);
   for(let i=0;i<(hit?16:6);i++){const angle=i*2.39996,side=Math.cos(angle)*(18+t*(hit?100:30)),z=Math.sin(angle)*(30+t*60)-(hit?0:t*55),forward=t*(hit?65:0);gpu.mesh(fleck,[p.x+Math.cos(h)*side+Math.sin(h)*forward,p.y+Math.sin(h)*side-Math.cos(h)*forward,p.z+z,h],hit?7:1);}
  }
 };
}

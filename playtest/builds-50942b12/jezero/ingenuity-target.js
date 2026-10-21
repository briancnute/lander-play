import {triangle} from '../mars-renderer/geometry.js';
// Scan graphics share the target plane. Static buffers are reused for every target.
export function createIngenuityTarget(gpu){
 function rect(out,x,z,w,h,color){const a=[x,0,z],b=[x+w,0,z],c=[x+w,0,z+h],d=[x,0,z+h];triangle(out,a,b,c,color);triangle(out,a,c,d,color);}
 function brackets(color){const v=[];for(const x of [-1,1])for(const z of [-1,1]){rect(v,x<0?-46:28,z<0?-69:66,18,3,color);rect(v,x<0?-46:43,z<0?-69:51,3,18,color);}return gpu.upload(new Float32Array(v));}
 const frame=brackets([.83,1,.98]),captured=brackets([1,.83,.35]),missed=brackets([1,.6,.3]),lines=[],sweep=[],spark=[];
 for(const [z,w]of [[-5,42],[0,70],[5,54]])rect(lines,-w/2,z,w,.7,[.38,.72,.71]);
 for(const [z,w,c]of [[-3,62,[.7,.5,.18]],[0,88,[1,.9,.5]],[3,70,[.7,.5,.18]]])rect(sweep,-w/2,z,w,1,c);
 triangle(spark,[-.8,0,0],[0,0,4],[.8,0,0],[1,.88,.48]);triangle(spark,[-.8,0,0],[.8,0,0],[0,0,-4],[1,.88,.48]);
 const scan=gpu.upload(new Float32Array(lines)),gold=gpu.upload(new Float32Array(sweep)),fleck=gpu.upload(new Float32Array(spark));
 return {
  draw(p,heading,time){gpu.mesh(frame,[p.x,p.y,p.z,heading],7);gpu.mesh(scan,[p.x,p.y,p.z+Math.sin(time*1.8)*45,heading],7);},
  effect(event,time){if(!event?.target)return;const t=time-event.time;if(t<0||t>.7)return;const p=event.target,h=event.heading,hit=event.kind==='hit';if(t<.32)gpu.mesh(hit?captured:missed,[p.x,p.y,p.z,h],7);if(!hit)return;
   gpu.mesh(gold,[p.x,p.y,p.z-62+t/.7*124,h],7);
   for(let i=0;i<6;i++){const side=(i-2.5)*13+t*(i%2?35:-35);gpu.mesh(fleck,[p.x+Math.cos(h)*side,p.y+Math.sin(h)*side,p.z+Math.sin(i*2)*20+t*35,h],7);}
  }
 };
}

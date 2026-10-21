import {triangle} from '../mars-renderer/geometry.js';
// Reusable geometry: no per-frame uploads, particles or allocation of GPU buffers.
export function createIngenuityTarget(gpu){
 const halo=[],core=[],spark=[];
 for(let i=0;i<32;i++){if(i%8===7)continue;const a=i*Math.PI/16,b=(i+.78)*Math.PI/16,p=(r,t)=>[Math.cos(t)*60*r,0,Math.sin(t)*95*r];for(const [u,v,w]of [[p(1,a),p(1.06,a),p(1.06,b)],[p(1,a),p(1.06,b),p(1,b)]])triangle(halo,u,v,w,i%8<2?[1,.87,.42]:[.48,1,.88]);}
 for(let i=0;i<8;i++){const a=i*Math.PI/4,b=(i+1)*Math.PI/4,p=t=>[Math.cos(t)*19,Math.sin(t)*19,0];triangle(core,[0,0,32],p(a),p(b),i%2?[1,.77,.24]:[1,.94,.62]);triangle(core,[0,0,-32],p(b),p(a),i%2?[.5,.93,.85]:[.88,1,.96]);}
 triangle(spark,[-1,0,0],[0,0,5],[1,0,0],[.68,1,.9]);triangle(spark,[-1,0,0],[1,0,0],[0,0,-5],[.68,1,.9]);
 const missed=spark.map((v,i)=>i%9===6?1:i%9===7?.66:i%9===8?.3:v);
 const ring=gpu.upload(new Float32Array(halo)),gem=gpu.upload(new Float32Array(core)),shard=gpu.upload(new Float32Array(spark)),missShard=gpu.upload(new Float32Array(missed));
 return {draw(p,heading,time){gpu.mesh(ring,[p.x,p.y,p.z,heading],7);gpu.mesh(gem,[p.x,p.y,p.z,time*.9],7);},effect(event,time){if(!event?.target)return;const t=time-event.time;if(t<0||t>.85)return;const hit=event.kind==='hit',p=event.target;for(let i=0;i<8;i++){const a=i*Math.PI/4,r=(hit?22:58)+t*(hit?110:45),side=Math.cos(a)*r,z=Math.sin(a)*r*(hit?1:1.5)-(hit?0:70*t*t);gpu.mesh(hit?shard:missShard,[p.x+Math.cos(event.heading)*side,p.y+Math.sin(event.heading)*side,p.z+z,event.heading+a+t*3],hit?7:1);}}};
}

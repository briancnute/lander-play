import {box,triangle} from '../../mars-renderer/geometry.js';
import {drivingBody} from '../../mars-renderer/driving-models.js';
export function createJumpRig(gpu){
 const mint=[.53,.87,.76];
 // Six bidirectional attitude nozzles. Opposing forces create torque, not net lift.
 const pairs={pitch:[[0,3.5,2.8],[0,-3.5,2.8]],roll:[[3.7,0,2.8],[-3.7,0,2.8]],yaw:[[3.7,0,3.7],[-3.7,0,3.7]]};
 const nozzle=[];for(const points of Object.values(pairs))for(const [x,y,z]of points){box(nozzle,x-.28,y-.28,z-.28,.56,.56,.56,[.22,.28,.29]);box(nozzle,x-.16,y-.16,z+.28,.32,.32,.06,mint);}
 function plume(out,o,axis){const a=Math.abs(axis[2])>.5?[1,0,0]:[0,0,1],b=[axis[1]*a[2]-axis[2]*a[1],axis[2]*a[0]-axis[0]*a[2],axis[0]*a[1]-axis[1]*a[0]];for(const [radius,length,color]of [[.32,3,[.18,.73,1]],[.13,1.4,[.9,.98,1]]])for(let j=0;j<6;j++){const point=k=>o.map((v,i)=>v+radius*(Math.cos(k*Math.PI/3)*a[i]+Math.sin(k*Math.PI/3)*b[i]));triangle(out,point(j),point(j+1),o.map((v,i)=>v+axis[i]*length),color);}}
 const body=[...drivingBody('perseverance'),...nozzle],bodyMeshes=new Map();
 function bodyFor(p){const key=JSON.stringify([p.torque,p.launchJet]);if(bodyMeshes.has(key))return bodyMeshes.get(key);const mesh=[...body];
  for(const axis of ['pitch','roll','yaw']){const sign=p.torque[axis];if(!sign)continue;for(let i=0;i<2;i++){const force=sign*(i===0?1:-1);const exhaust=axis==='yaw'?[0,force,0]:[0,0,-force];plume(mesh,pairs[axis][i],exhaust);}}
  if(p.launchJet)for(const x of [-2.2,2.2])plume(mesh,[x,0,2.3],[0,0,-1]);
  const uploaded=gpu.upload(new Float32Array(mesh));bodyMeshes.set(key,uploaded);return uploaded;
 }

 let original=null;
 return {prepare(p,enabled){
 const model=gpu.drivingModels.get('perseverance');if(!model)return;
 original??=model.body;model.body=enabled?bodyFor(p):original;
 }};
}

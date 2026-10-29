// An explicitly selected Gediz comparison. Distances remain shared-world metres;
// neither the terrain nor gravity is rescaled to shorten the course or flights.
export const SCALE_TRIAL={units:8/3,bladeLength:4,cameraBack:16,cameraLift:5,launchSpeed:6,thrust:.8,thrustFade:50/3.6,grip:3,brake:2.4,friction:.12};
export function scaleTrial(course){
 if(course.activity!=='ski-gediz-descent')return course;
 const U=SCALE_TRIAL.units,v=SCALE_TRIAL.launchSpeed*U;
 return {...course,scaleTrial:true,title:'Gediz · measured-speed trial',limit:600,courseVersion:1,trialKey:'astra.gale.ski-gediz-descent.scale-trial.v1',drive:{measured:true},takeoffProbe:{nearSeconds:.2,farSeconds:.5,clearanceNear:.03*U,clearanceFar:.08*U,minSpeed:2*U,minimumSeparation:.00001*U},countdownLaunch:{length:v*1.5,step(r){const age=3-r.countdown;r.s=v*age*age/6;r.u=0;r.v=v*age/3;r.side=0;r.facing=0;const p=course.point(r.s);Object.assign(r,{worldX:p.x,worldY:p.y,mappedS:r.s,mappedU:0,z:course.height(r.s),air:false,vz:0,safe:{s:r.s,u:0}});}}};
}
export function stepMeasuredGround(r,grade,crossGrade,input,dt){
 const q=SCALE_TRIAL,U=q.units,steer=Math.max(-1,Math.min(1,input.steer||0)),speed=Math.hypot(r.v,r.side)/U;
 r.brakePressure=(r.brakePressure??0)+((input.brake?1:0)-(r.brakePressure??0))*(1-Math.exp(-dt*5));
 const brake=q.brake*r.brakePressure,lateral=Math.sqrt(Math.max(0,q.grip*q.grip-brake*brake));
 const angle=(speed>.001?Math.atan2(r.side,r.v):(r.facing??0))+steer*Math.min(.85,lateral/Math.max(.5,speed))*Math.min(1,speed)*dt;
 // Thrust tapers off at 50 km/h; this is not a speed clamp or automatic brake.
 // A downhill skier can exceed it and must brake. Gravity stays 3.71 m/s².
 const thrust=input.gas&&!input.brake?q.thrust*Math.max(0,1-(speed/q.thrustFade)**2):0,norm=1+grade*grade+crossGrade*crossGrade;
 let x=speed*Math.cos(angle)+(thrust*Math.cos(angle)-3.71*grade/norm)*dt,y=speed*Math.sin(angle)+(thrust*Math.sin(angle)-3.71*crossGrade/norm)*dt;
 const accelerated=Math.hypot(x,y),next=Math.max(0,accelerated-(q.friction+brake+.07*Math.abs(steer)*speed)*dt),factor=accelerated?next/accelerated:0;
 r.v=x*factor*U;r.side=y*factor*U;r.facing=angle;
}

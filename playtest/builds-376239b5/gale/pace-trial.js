// Approved default. Explicit legacy and calibration links remain available.
export function approvedPaceEnabled(search=''){const p=new URLSearchParams(search);return p.get('paceTrial')==='1'||p.get('paceTrial')!=='0'&&p.get('scaleTrial')!=='1'&&p.get('scaleStrip')!=='1';}
export const PACE={units:8/3,skiKmh:300,roamKmh:120,cameraBack:16,cameraLift:3,strafe:4,down:12,turn:.18};
export function paceTrial(course){return {...course,paceTrial:true,scaleTrial:false,title:course.title+' · 300 km/h',courseVersion:1,trialKey:`astra.gale.${course.activity}.pace-trial.v1`,drive:{...course.drive,limit:PACE.skiKmh/3.6*PACE.units},horizontalLimit:PACE.skiKmh/3.6*PACE.units};}
export function capSkiPace(r,limit){const speed=Math.hypot(r.v,r.side);if(speed>limit){r.v*=limit/speed;r.side*=limit/speed;}}
// These are explicit fictional thrusters. No input means unmodified ballistics.
export function paceAir(r,input,dt){const steer=Math.max(-1,Math.min(1,input.steer||0));r.down=!!(input.brake||input.both);if(r.down)r.vz-=PACE.down*PACE.units*dt;
 if(input.gas&&steer&&!r.down){const a=steer*PACE.turn*dt,c=Math.cos(a),s=Math.sin(a),v=r.v;r.v=v*c-r.side*s;r.side=v*s+r.side*c;r.airMode='turn';}
 else if(steer){const speed=Math.hypot(r.v,r.side),vx=speed?r.v/speed:1,vy=speed?r.side/speed:0,a=steer*PACE.strafe*PACE.units*dt;r.v-=vy*a;r.side+=vx*a;r.airMode='strafe';}
 else r.airMode=r.down?'slam':'idle';
}

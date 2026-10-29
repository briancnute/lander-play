import {skiCourse} from './ski-course.js';
import {countdownLaunch} from './murray-countdown-launch.js';
import {GEDIZ_PATH} from './gediz-route.js';
const U=8/3;
// Launch permission does not impart an impulse. Actual terrain curvature must
// release contact; ordinary slalom carving remains Murray's grounded profile.
export const GEDIZ_LAUNCH_CORES=[{east:-1934,north:-11681,radius:12},{east:-2374,north:-10380,radius:14},{east:-2709.7,north:-10000.3,radius:12}];
export const gedizLaunchAllowed=(x,y)=>GEDIZ_LAUNCH_CORES.some(h=>Math.hypot(x/U-h.east,-y/U-h.north)<h.radius);
export function gedizDescent(ground){
 const base=skiCourse(ground,null,GEDIZ_PATH,{ramps:[],rollers:[],items:[]}),gates=[];
 for(let i=120;i<GEDIZ_PATH.length-1;i+=120){const [x,y]=GEDIZ_PATH[i];gates.push({...base.coords(x,y),half:55,color:gates.length%2?'blue':'red'});}
 gates.push({s:base.length-100*U,u:0,half:55,color:'red'});
 const xs=GEDIZ_PATH.map(p=>p[0]),ys=GEDIZ_PATH.map(p=>p[1]);
 return countdownLaunch({...base,worldHeight:ground,world:'mars',site:'gale',activity:'ski-gediz-descent',recordMode:'ski-gediz-descent',title:'Gediz Descent · time trial',timeTrial:true,mode:'time-trial',mapIntro:true,reactiveGates:true,showThrust:true,contactMode:'slalom-exceptions',launchAllowed:gedizLaunchAllowed,naturalAir:false,drive:{thrust:48,limit:360,rollingDrag:.03},gates,finish:base.length,finishHalf:155,width:850,limit:180,route:GEDIZ_PATH.map(([x,y])=>({x,y})),mapBounds:{minX:Math.min(...xs)-400,width:Math.max(...xs)+400,minY:Math.min(...ys)-400,maxY:Math.max(...ys)+400},courseVersion:1,trialKey:'astra.gale.ski-gediz-descent.time-trial.v1'});
}

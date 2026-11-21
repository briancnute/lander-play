import {skiCourse} from './ski-course.js';
import {countdownLaunch} from './murray-countdown-launch.js';
import {VERA_RUBIN_PATH} from './vera-rubin-route.js';
const U=8/3;
export function veraRubinDescent(ground){
 const base=skiCourse(ground,null,VERA_RUBIN_PATH,{ramps:[],rollers:[],items:[]}),gates=[];
 for(let i=80;i<VERA_RUBIN_PATH.length-1;i+=80){const [x,y]=VERA_RUBIN_PATH[i];gates.push({...base.coords(x,y),half:55,color:gates.length%2?'blue':'red'});}
 // Place the braking exits within the repaired lane: 15 m at gate 4, 11.25 m at gate 8.
 gates[3].u=40;gates[7].u=-30;
 const xs=VERA_RUBIN_PATH.map(p=>p[0]),ys=VERA_RUBIN_PATH.map(p=>p[1]);
 return countdownLaunch({...base,worldHeight:ground,world:'mars',site:'gale',activity:'ski-vera-rubin',recordMode:'ski-vera-rubin',title:'Vera Rubin Descent · time trial',timeTrial:true,mode:'time-trial',mapIntro:true,reactiveGates:true,showThrust:true,contactMode:'slalom-exceptions',launchAllowed:()=>false,naturalAir:false,drive:{thrust:48,limit:360,rollingDrag:.03},gates,finish:base.length,finishHalf:155,width:400,limit:180,route:VERA_RUBIN_PATH.map(([x,y])=>({x,y})),mapBounds:{minX:Math.min(...xs)-400,width:Math.max(...xs)+400,minY:Math.min(...ys)-400,maxY:Math.max(...ys)+400},courseVersion:1,trialKey:'astra.gale.ski-vera-rubin.time-trial.v1'});
}

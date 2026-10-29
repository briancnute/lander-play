import {countdownLaunch} from './murray-countdown-launch.js';
import {murrayLaunchAllowed} from './murray-launch-zones.js';
import {skiCourse} from './ski-course.js';
import {MURRAY_SHELF_PATH,MURRAY_SHELF_FINISH,MURRAY_GATE_STATIONS} from './murray-shelves.js';
// Gate spacing alternates flowing entries, linked reversals and recovery straights.
const layouts={
 murray:{name:'Murray Buttes',half:55,offsets:[-40,-100,-60,45,110,70,-30,-110,-60,40,105,55,-30,0],spacing:[350,310,280,340,300,250,360,280,240,340,300,270,350,280]},
 torridon:{name:'Glen Torridon',half:43,offsets:[-60,75,-75,95,45,-105,80,-85,70,110,-90,65,-65,0],spacing:[350,310,270,330,220,350,270,300,250,220,360,280,310,300]},
 gediz:{name:'Gediz Vallis',half:38,offsets:[-75,80,-85,90,-90,95,-65,65,105,-105,75,-75,60,0],spacing:[350,300,285,270,260,310,250,240,240,350,280,270,260,300]},
};
export function slalomTimeTrial(course){
 const id=course.recordMode??course.activity,variant=id.includes('torridon')?'torridon':id.includes('gediz')||id==='slalom-hard'?'gediz':'murray',layout=layouts[variant];
 let s=0;let gates=layout.offsets.map((u,i)=>({s:s+=layout.spacing[i],u,half:layout.half}));let finish=s+350;
 const shelves=id==='ski-murray';
 if(shelves){const ground=course.worldHeight??course.surface;course={...course,...skiCourse(ground,null,MURRAY_SHELF_PATH,{ramps:[],rollers:[],items:[]}),worldHeight:ground,route:MURRAY_SHELF_PATH.map(([x,y])=>({x,y})),drive:{thrust:48,limit:360}};const xs=MURRAY_SHELF_PATH.map(p=>p[0]),ys=MURRAY_SHELF_PATH.map(p=>p[1]);course.mapBounds={minX:Math.min(...xs)-400,width:Math.max(...xs)+400,minY:Math.min(...ys)-400,maxY:Math.max(...ys)+400};finish=MURRAY_SHELF_FINISH;gates=MURRAY_GATE_STATIONS.map((s,i)=>({s,u:0,half:55,color:['red','blue','blue','red','blue','red','red','blue','red','blue','blue','red','red','blue'][i]}));}
 if(shelves)course=countdownLaunch({...course,contactMode:'slalom-exceptions',launchAllowed:murrayLaunchAllowed});
 return {...course,world:'mars',site:'gale',humanSkier:false,timeTrial:true,timedJump:false,rhythmFinish:false,landingScored:false,naturalAir:false,mode:'time-trial',activity:course.activity,recordMode:id,reactiveGates:shelves,title:shelves?'Murray turns · time trial':layout.name+' · time trial',gates,finish,finishHalf:155,width:400,limit:shelves?180:120,items:[],ramps:[],rollers:[],timeTarget:null,courseVersion:shelves?6:1,trialKey:`astra.gale.${id}.time-trial.v${shelves?6:1}`};
}

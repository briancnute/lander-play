import {countdownLaunch} from './murray-countdown-launch.js';
import {skiCourse} from './ski-course.js';

// Source metres, east/north in the measured Gale DEM. A descriptive course name,
// not a claim that this corridor is an officially named geographic feature.
const SCALE=8/3;
const START=[-3219.5664908271283,-7434.344422537833];
const DIRECTION=[0.567628578233343,0.8232847606829569];
export const STEEP_NODES=[START,START.map((v,i)=>v+DIRECTION[i]*2200)];
export function steepCourse(ground,nodes=STEEP_NODES){
 const path=nodes.map(([east,north])=>[east*SCALE,-north*SCALE]);
 const c=skiCourse(ground,null,path,{ramps:[],rollers:[],items:[]});
 const xs=path.map(p=>p[0]),ys=path.map(p=>p[1]);
 return countdownLaunch({
  ...c,worldHeight:ground,route:path.map(([x,y])=>({x,y})),world:'mars',site:'gale',
  humanSkier:false,showThrust:true,timeTrial:true,naturalAir:true,airborneFinish:true,
  airborneGates:true,reactiveGates:true,mode:'time-trial',activity:'ski-steep',recordMode:'ski-steep',
  title:'Gale gentle descent · time trial',
  // 200 source metres between gates; the final pair align the crest approach.
  gates:Array.from({length:8},(_,i)=>({s:(200+i*200)*SCALE,u:[0,55,-55,55,-55,55,60,60][i],half:65,color:i%2?'blue':'red'})),
  finalApproach:1600*SCALE,jumpStart:1820*SCALE,jumpMarker:1830*SCALE,
  finish:1910*SCALE,finishHalf:155,width:300,limit:180,
  // One drive configuration over the entire course. No launch boost, contact
  // override, terrain smoothing, added ramp, or special final-section gravity.
  drive:{thrust:48,limit:65},courseVersion:5,trialKey:'astra.gale.ski-steep.time-trial.v5',
  mapBounds:{minX:Math.min(...xs)-400,width:Math.max(...xs)+400,minY:Math.min(...ys)-400,maxY:Math.max(...ys)+400},
 });
}

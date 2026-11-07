// Playtest A: broad downhill arcs on the unchanged shared Mount Sharp surface.
// First 300 source metres are a straight approach. Wider-radius arcs leave room
// for ordinary held steering with finite grip at speed. Gate spacing: 350 m.
// These are flag coordinates, never a replacement terrain or steering rail.
import {skiCourse} from './ski-course.js';
const U=8/3,heading=-.1;
export const CORRIDOR_A_NODES=Array.from({length:261},(_,i)=>{
 const down=i*25,across=80*(1-Math.cos(Math.max(0,down-300)/4400*2*Math.PI));
 return [-4500+Math.sin(heading)*down+Math.cos(heading)*across,-28000+Math.cos(heading)*down-Math.sin(heading)*across];
});
export function corridorA(ground){
 const path=CORRIDOR_A_NODES.map(([e,n])=>[e*U,-n*U]);
 const c=skiCourse(ground,null,path,{ramps:[],rollers:[],items:[]});
 const gates=Array.from({length:18},(_,i)=>({...c.coords(...path[(i+1)*14]),half:80,color:i%2?'blue':'red'}));
 const xs=path.map(p=>p[0]),ys=path.map(p=>p[1]);
 return {...c,world:'mars',site:'gale',physicalContact:true,worldHeight:ground,timeTrial:true,mode:'time-trial',activity:'ski-corridor-a',recordMode:'ski-corridor-a',title:'North midslope · carving trial',courseVersion:3,trialKey:'astra.gale.corridor-a.prototype.v3',reactiveGates:true,mapIntro:true,showThrust:true,incidentalAirHeight:U,gates,finish:c.length-50,finishHalf:155,width:600,limit:180,drive:{thrust:48,limit:360},route:path.map(([x,y])=>({x,y})),mapBounds:{minX:Math.min(...xs)-500,width:Math.max(...xs)+500,minY:Math.min(...ys)-500,maxY:Math.max(...ys)+500},prototype:true};
}

import {toGame} from './terrain.js';
// Authored point-to-point race: upper fan, Belva margin, Neretva, Bright Angel.
export function landingCircuit(){
 let points=[[-1247,595],[-1250,480],[-1600,700],[-2050,780],[-2350,1120],[-2570,1510],[-2900,1780],[-3320,1690],[-3600,1900],[-3880,2070],[-4160,1960],[-4440,2110],[-4750,2040],[-4960,1800],[-5350,1900],[-5680,2080]].map(p=>toGame(...p));
 for(let pass=0;pass<3;pass++){const out=[points[0]];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];out.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75});}out.push(points.at(-1));points=out;}
 const route=[];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/35));for(let k=0;k<n;k++)route.push({x:a.x+(b.x-a.x)*k/n,y:a.y+(b.y-a.y)*k/n});}route.push(points.at(-1));
 const gate=i=>({...route[i],heading:Math.atan2(route[Math.min(i+1,route.length-1)].x-route[Math.max(0,i-1)].x,-(route[Math.min(i+1,route.length-1)].y-route[Math.max(0,i-1)].y)),i});
 return {route,start:gate(0),gates:Array.from({length:9},(_,i)=>gate(Math.round((i+1)*(.09*(route.length-1))))),finish:gate(route.length-1)};
}
export const courseLength=course=>course.route.slice(1).reduce((n,p,i)=>n+Math.hypot(p.x-course.route[i].x,p.y-course.route[i].y),0);

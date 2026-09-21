import {toGame} from './terrain.js';
export function landingCircuit(){
 const route=Array.from({length:161},(_,i)=>{const a=i/160*Math.PI*2;return toGame(2200+900*Math.sin(a),-750+680*Math.cos(a));});
 const gate=i=>({...route[i],heading:Math.atan2(route[(i+1)%160].x-route[i].x,-(route[(i+1)%160].y-route[i].y)),i});
 return {route,gates:[20,40,60,80,100,120,140].map(gate),finish:gate(0)};
}
export const precisionSites=[
 {id:'target-jump',name:'Precision landing / delta hollow',...toGame(600,-700),start:{...toGame(600,-590.625),heading:Math.PI},target:toGame(600,-850)},
 {id:'crater-jump',name:'Precision landing / Belva',...toGame(-1960,1330),start:{...toGame(-2040,1330),heading:Math.PI/2},target:toGame(-1840,1330)},
];
export const courseLength=course=>course.route.slice(1).reduce((n,p,i)=>n+Math.hypot(p.x-course.route[i].x,p.y-course.route[i].y),0);

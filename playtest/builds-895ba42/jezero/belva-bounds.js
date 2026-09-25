import {toGame} from './terrain.js';
import {floorBounds} from './floor.js';

const nw=toGame(-2450,2150),se=toGame(500,-650);
export const upperBounds={minX:nw.x,minY:nw.y,width:se.x,maxY:se.y};
const worldNW=toGame(-12000,5000),worldSE=toGame(4000,-5000);
export const explorationBounds={minX:worldNW.x,minY:worldNW.y,width:worldSE.x,maxY:worldSE.y};
const mapNW=worldNW,mapSE=worldSE;
export const explorationMapBounds={minX:mapNW.x,minY:mapNW.y,width:mapSE.x,maxY:mapSE.y};
export const retainedOutline=[
 [nw.x,nw.y],[se.x,nw.y],[se.x,floorBounds.minY],
 [floorBounds.width,floorBounds.minY],[floorBounds.width,floorBounds.maxY],
 [floorBounds.minX,floorBounds.maxY],[floorBounds.minX,se.y],[nw.x,se.y],
].map(([x,y])=>({x,y}));
export const explorationOutline=[worldNW,{x:worldSE.x,y:worldNW.y},worldSE,{x:worldNW.x,y:worldSE.y}];
export function containsPosition(p,b=explorationBounds,margin=0){
 return (b.regions??[b]).some(r=>p.x>=r.minX+margin&&p.x<=r.width-margin&&p.y>=r.minY+margin&&p.y<=r.maxY-margin);
}
export function clampTarget(p,b=explorationBounds,margin=41){
 return (b.regions??[b]).map(r=>({x:Math.max(r.minX+margin,Math.min(r.width-margin,p.x)),y:Math.max(r.minY+margin,Math.min(r.maxY-margin,p.y))})).reduce((a,q)=>!a||Math.hypot(q.x-p.x,q.y-p.y)<Math.hypot(a.x-p.x,a.y-p.y)?q:a,null);
}
// Distance to the union's outside edges, never the internal rectangle join.
export function boundaryAt(p){
 let distance=Infinity;
 for(let i=0;i<explorationOutline.length;i++){
  const a=explorationOutline[i],b=explorationOutline[(i+1)%explorationOutline.length],dx=b.x-a.x,dy=b.y-a.y;
  const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy)));
  distance=Math.min(distance,Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t));
 }
 return {edge:distance*(containsPosition(p)?1:-1),target:clampTarget(p,explorationBounds,250)};
}

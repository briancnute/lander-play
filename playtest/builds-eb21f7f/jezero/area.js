import {WORLD_SCALE} from './scale.js';
import {approvedSites} from './site-catalog.js';
import {landmarks} from './landmarks.js';
import {CLOSE_RANGE} from './navigation.js';
import {loadBackdrop} from './backdrop.js';
import {loadTerrain,toGame,buildRocks} from './terrain.js';
export const SITE_VERSION='three-forks-v1';
// Retain Kodiak at index 3 for existing saves; the retired generic cards are recollected.
const byId=Object.fromEntries(approvedSites.map(p=>[p.id,{...p,...toGame(p.east,p.north)}]));
const kodiak=landmarks[0];
export const discoveries=[byId.pair,byId.hidden,byId.observation,{...kodiak,...toGame(196,-820),kind:'site',focus:{x:kodiak.x,y:kodiak.y},copy:kodiak.fact},byId.depot,byId.amalik,byId.landing];
export async function loadArea(){
 const mesh=await loadTerrain(),response=await fetch(new URL('./assets/route.json',import.meta.url));if(!response.ok)throw Error('The delta route could not be loaded.');const data=await response.json();
 const route=data.route.map(([e,n])=>toGame(e,n)),points=data.points.map(([e,n])=>toGame(e,n));
 const gate=(p,i)=>{const before=points[(i+points.length-1)%points.length],after=points[(i+1)%points.length];return {...p,heading:Math.atan2(after.x-before.x,-(after.y-before.y)),i};};
 const course={route,gates:points.slice(1).map((p,i)=>gate(p,i+1)),finish:gate(points[0],0)};
 const start={...points[0],heading:Math.atan2(points[1].x-points[0].x,-(points[1].y-points[0].y))};
 const {vertices,rocks}=buildRocks(mesh.height,route,discoveries);
 const jump=toGame(600,-700);
 // Clear the jump run-up and landing corridor of authored obstacles.
 const filtered=rocks.filter(([x,y])=>Math.abs(x-jump.x)>55||Math.abs(y-jump.y)>600);
 const pickups=[...points.filter((_,i)=>i%2===0),toGame(600,-650)].map((p,id)=>({...p,id}));
 const scenery=await loadBackdrop(mesh);
 const area={...scenery,quietDiscoveries:true,collectibleLabelRange:CLOSE_RANGE,mesh,ground:mesh.height,scenery:vertices,samples:discoveries,pickups,rocks:filtered,mesa:[],parts:[],keepExploring:true,bounds:{minX:3504*WORLD_SCALE,width:9744*WORLD_SCALE,minY:4128*WORLD_SCALE,maxY:9600*WORLD_SCALE},course,start,jump,info:mesh.info};
 // Index the same conservative rock roofs, so each camera sample only checks
 // nearby stones. Geometry, clearance and the approved camera response are identical.
 const buckets=new Map(),cellSize=64;
 for(const rock of filtered){const [x,y,r]=rock;for(let iy=Math.floor((y-r-2)/cellSize);iy<=Math.floor((y+r+2)/cellSize);iy++)for(let ix=Math.floor((x-r-2)/cellSize);ix<=Math.floor((x+r+2)/cellSize);ix++){const key=ix+','+iy;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}}
 area.cameraSurface=(x,y)=>{let h=mesh.height(x,y);for(const [rx,ry,r]of buckets.get(Math.floor(x/cellSize)+','+Math.floor(y/cellSize))??[])if(Math.hypot(x-rx,y-ry)<r+2)h=Math.max(h,mesh.height(rx,ry)+r*1.1);return h;};
 area.driveArea={...area,samples:[],releaseAfterTurn:true,airBrake:true};
 return area;
}

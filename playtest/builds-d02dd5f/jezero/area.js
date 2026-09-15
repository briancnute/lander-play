import {landmarks} from './landmarks.js';
import {CLOSE_RANGE} from './navigation.js';
import {loadBackdrop} from './backdrop.js';
import {loadTerrain,toGame,buildRocks} from './terrain.js';
export const SITE_VERSION='three-forks-v1';
export const discoveries=[
 {imageAlt:'NASA view near Hawksbill Gap, looking south across rocky delta terrain',imageCredit:'NASA/JPL-Caltech · Sol 428',id:'delta',...toGame(260,-250),name:'Layers of a lake',copy:'Sediment settled here when a river entered an ancient lake.',fact:'A delta forms where flowing water slows and drops the sediment it carries. Jezero’s layered rocks preserve parts of that ancient story.',detail:'Perseverance’s 2022 delta-front campaign examined rocks from the base upward to compare changing environments. This stop is an ASTRA observation point, not a named historical sampling target.',source:'https://science.nasa.gov/blog/next-stop-hawksbill-gap/',image:'./assets/delta-reference.jpg'},
 {imageAlt:'NASA panorama of the Jezero delta front',imageCredit:'NASA/JPL-Caltech/ASU/MSSS',id:'rock',...toGame(-410,-420),name:'A broken edge',copy:'Erosion exposes the older layers inside the delta.',fact:'The delta’s present cliffs are an eroded remnant. Reading their exposed layers helps scientists reconstruct a landscape that no longer exists.',detail:'The April 2022 approach panorama shows the broken delta front, sand at its base and distant crater rim. No rock composition is inferred from color here.',source:'https://science.nasa.gov/photojournal/jezero-craters-delta-is-getting-closer/',image:'./assets/delta-panorama.jpg'},
 {imageAlt:'NASA panorama of the Jezero delta front and sandy foreground',imageCredit:'NASA/JPL-Caltech/ASU/MSSS',id:'sand',...toGame(180,-660),name:'Mars is still moving',copy:'Wind reshapes loose sand long after the river has gone.',fact:'The ancient delta and today’s wind-shaped sand tell stories from different times. A landscape can preserve the distant past while still changing.',detail:'Observe the sandy ground beneath the cliffs. The ripple appearance and loose rocks in this game are artistic interpretations; the broad terrain comes from orbital elevation measurements.',source:'https://science.nasa.gov/photojournal/jezero-craters-delta-is-getting-closer/',image:'./assets/delta-panorama.jpg'},
];
const kodiak=landmarks[0];
discoveries.push({...kodiak,...toGame(196,-820),kind:'site',focus:{x:kodiak.x,y:kodiak.y},copy:kodiak.fact});
for(const p of discoveries)p.kind??='fact';
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
 const area={...scenery,quietDiscoveries:true,collectibleLabelRange:CLOSE_RANGE,mesh,ground:mesh.height,scenery:vertices,samples:discoveries,pickups,rocks:filtered,mesa:[],parts:[],keepExploring:true,bounds:{minX:3504,width:9744,minY:4128,maxY:9600},course,start,jump,info:mesh.info};
 // Index the same conservative rock roofs, so each camera sample only checks
 // nearby stones. Geometry, clearance and the approved camera response are identical.
 const buckets=new Map(),cellSize=64;
 for(const rock of filtered){const [x,y,r]=rock;for(let iy=Math.floor((y-r-2)/cellSize);iy<=Math.floor((y+r+2)/cellSize);iy++)for(let ix=Math.floor((x-r-2)/cellSize);ix<=Math.floor((x+r+2)/cellSize);ix++){const key=ix+','+iy;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}}
 area.cameraSurface=(x,y)=>{let h=mesh.height(x,y);for(const [rx,ry,r]of buckets.get(Math.floor(x/cellSize)+','+Math.floor(y/cellSize))??[])if(Math.hypot(x-rx,y-ry)<r+2)h=Math.max(h,mesh.height(rx,ry)+r*1.1);return h;};
 area.driveArea={...area,samples:[]};
 return area;
}

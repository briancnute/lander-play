import {WORLD_SCALE} from './scale.js';
import {approvedSites} from './site-catalog.js';
import {landmarks} from './landmarks.js';
import {CLOSE_RANGE} from './navigation.js';
import {loadBackdrop} from './backdrop.js';
import {loadTerrain,toGame,buildRocks,buildRidgeCluster} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
import {regions,detailIndices,regionIdForDetail} from './regions.js';
export const SITE_VERSION='three-forks-v1';
// Retain Kodiak at index 3 for existing saves; the retired generic cards are recollected.
const byId=Object.fromEntries(approvedSites.map(p=>[p.id,{...p,...toGame(p.east,p.north)}]));
const kodiak=landmarks[0];
// The accessible overlook keeps the documented 23_824 → Kodiak bearing while
// shortening its roughly 602 m real range to about 397 m in the compact world.
export const discoveries=[byId.pair,byId.hidden,byId.observation,{...kodiak,...toGame(80,-880),kind:'site',focus:{x:kodiak.x,y:kodiak.y},copy:kodiak.fact,cameraReference:'23_824',authoredRangeMetres:397},byId.depot,byId.amalik,byId.landing];
export function distanceToRoute(route,x,y){
 let best=Infinity;
 for(let i=1;i<route.length;i++){
  const a=route[i-1],b=route[i],dx=b.x-a.x,dy=b.y-a.y,length=dx*dx+dy*dy;
  const t=length?Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/length)):0;
  best=Math.min(best,Math.hypot(x-(a.x+dx*t),y-(a.y+dy*t)));
 }
 return best;
}
function raceLine(route,height){
 const out=[],road=[.29,.19,.14],edge=[.78,.61,.39],last=route.length-1;
 // The road is an intentionally game-like race surface. It exists only during
 // the activity, like the gates, and is wide enough to read as a circuit.
 const normals=route.map((p,i)=>{const before=route[i===0?last-1:i-1],after=route[i===last?1:i+1],dx=after.x-before.x,dy=after.y-before.y,length=Math.hypot(dx,dy)||1;return {x:-dy/length,y:dx/length};});
 const point=(q,n,offset)=>{const x=q.x+n.x*offset,y=q.y+n.y*offset;return [x,y,height(x,y)+.12];};
 for(let i=1;i<route.length;i++){
  const a=route[i-1],b=route[i],an=normals[i-1],bn=normals[i],al=point(a,an,-22),ar=point(a,an,22),bl=point(b,bn,-22),br=point(b,bn,22);
  triangle(out,al,bl,ar,road);triangle(out,ar,bl,br,road);
  for(const side of [-1,1]){const inner=side*19,outer=side*22,ail=point(a,an,inner),aol=point(a,an,outer),bil=point(b,bn,inner),bol=point(b,bn,outer);triangle(out,ail,bil,aol,edge);triangle(out,aol,bil,bol,edge);}
 }
 return new Float32Array(out);
}
export async function loadArea(){
 const mesh=await loadTerrain(),response=await fetch(new URL('./assets/route.json',import.meta.url));if(!response.ok)throw Error('The delta route could not be loaded.');const data=await response.json();
 const route=data.route.map(([e,n])=>toGame(e,n)),points=data.points.map(([e,n])=>toGame(e,n));
 // Close the authored centerline exactly. The lap is one continuous circuit,
 // not an open course with a finish trigger placed near its first point.
 if(Math.hypot(route.at(-1).x-route[0].x,route.at(-1).y-route[0].y)>.01)route.push({...route[0]});
 const gate=(p,i)=>{const before=points[(i+points.length-1)%points.length],after=points[(i+1)%points.length];return {...p,heading:Math.atan2(after.x-before.x,-(after.y-before.y)),i};};
 const course={route,gates:points.slice(1).map((p,i)=>gate(p,i+1)),finish:gate(points[0],0)};
 const start={...points[0],heading:Math.atan2(points[1].x-points[0].x,-(points[1].y-points[0].y))};
 const {vertices,rocks,stats:rockStats}=buildRocks(mesh.height,route,discoveries),fidelity=buildRidgeCluster(mesh.height);
 // The discovery opens from the known 26_1222 rover area and faces the paired
 // outcrops. Existing save identity/order is unchanged.
 Object.assign(discoveries[0],fidelity.cameras.pair,{focus:fidelity.targets.pair,cameraReference:'26_1222',featurePosition:toGame(49.956,-140.062)});
 const jump=toGame(600,-700);
 // Clear the jump run-up and landing corridor of authored obstacles.
 const filtered=[...rocks.filter(([x,y])=>Math.abs(x-jump.x)>55||Math.abs(y-jump.y)>600),...fidelity.rocks];
 // Boosts reward choices around the circuit; none occupies the start/finish.
 const pickups=[...points.filter((_,i)=>i>0&&i%2===0),toGame(600,-650)].map((p,id)=>({...p,id}));
 const scenery=await loadBackdrop(mesh);
 const sceneryVertices=new Float32Array(vertices.length+fidelity.vertices.length);sceneryVertices.set(vertices);sceneryVertices.set(fidelity.vertices,vertices.length);
 const lineWidth=22,lineBonus=.07;
 const area={...scenery,quietDiscoveries:true,collectibleLabelRange:CLOSE_RANGE,mesh,ground:mesh.height,scenery:sceneryVertices,raceLine:raceLine(route,mesh.height),fidelity,rockStats,samples:discoveries,regions,pickups,rocks:filtered,mesa:[],parts:[],keepExploring:true,bounds:{minX:3504*WORLD_SCALE,width:9744*WORLD_SCALE,minY:4128*WORLD_SCALE,maxY:9600*WORLD_SCALE},course,start,jump,info:mesh.info};
 area.sampleRows=s=>[
  ...regions.map(p=>({p,known:(s.regions??[]).includes(p.regionId??p.id),region:true})),
  ...detailIndices.filter(i=>(s.regions??[]).includes(regionIdForDetail(i))).map(i=>({p:discoveries[i],index:i,known:s.collected.includes(i)})),
 ];
 area.speedMultiplier=s=>s.mode==='trial'&&distanceToRoute(route,s.x,s.y)<=lineWidth?1+lineBonus:1;
 // Index the same conservative rock roofs, so each camera sample only checks
 // nearby stones. Geometry, clearance and the approved camera response are identical.
 const buckets=new Map(),cellSize=64;
 for(const rock of filtered){const [x,y,r]=rock;for(let iy=Math.floor((y-r-2)/cellSize);iy<=Math.floor((y+r+2)/cellSize);iy++)for(let ix=Math.floor((x-r-2)/cellSize);ix<=Math.floor((x+r+2)/cellSize);ix++){const key=ix+','+iy;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}}
 area.cameraSurface=(x,y)=>{let h=mesh.height(x,y);for(const [rx,ry,r]of buckets.get(Math.floor(x/cellSize)+','+Math.floor(y/cellSize))??[])if(Math.hypot(x-rx,y-ry)<r+2)h=Math.max(h,mesh.height(rx,ry)+r*1.1);return h;};
 area.driveArea={...area,samples:[],releaseAfterTurn:true,airBrake:true};
 return area;
}

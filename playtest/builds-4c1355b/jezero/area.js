import {WORLD_SCALE} from './scale.js';
import {approvedSites} from './site-catalog.js';
import {landmarks} from './landmarks.js';
import {CLOSE_RANGE} from './navigation.js';
import {loadBackdrop} from './backdrop.js';
import {loadTerrain,toGame,buildRocks,buildRidgeCluster} from './terrain.js';
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
// Round a closed authored centerline into a periodic curve.
export function smoothCircuit(points,iterations=3){
 let route=points.filter((p,i)=>!i||Math.hypot(p.x-points[i-1].x,p.y-points[i-1].y)>.01).filter((_,i,a)=>i%4===0||i===a.length-1);
 for(let pass=0;pass<iterations;pass++){
  const rounded=[];
  for(let i=0;i<route.length;i++){const a=route[i],b=route[(i+1)%route.length];rounded.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75});}
  route=rounded;
 }
 route.push({...route[0]});
 return route;
}
export async function loadArea(){
 const mesh=await loadTerrain(),response=await fetch(new URL('./assets/route.json',import.meta.url));if(!response.ok)throw Error('The delta route could not be loaded.');const data=await response.json();
 const points=data.points.map(([e,n])=>toGame(e,n)),rawRoute=data.route.map(([e,n])=>toGame(e,n)),branch=rawRoute.reduce((best,p,i)=>Math.hypot(p.x-points.at(-2).x,p.y-points.at(-2).y)<best.d?{d:Math.hypot(p.x-points.at(-2).x,p.y-points.at(-2).y),i}:best,{d:Infinity,i:0});
 // The source path retraced its last leg. Replace that return with a broad
 // eastern bend, sampled at the same spacing, so the finish flows back into
 // the opening heading instead of asking the player for a hairpin turn.
 const open=rawRoute.slice(0,branch.i+1),bridge=[toGame(500,-180),toGame(680,-220),toGame(780,-330),toGame(800,-480),toGame(720,-600),toGame(620,-620),toGame(560,-560),toGame(600,-460),toGame(620,-360),toGame(560,-330),toGame(500,-390)];
 for(const target of bridge){const from=open.at(-1),steps=Math.max(1,Math.ceil(Math.hypot(target.x-from.x,target.y-from.y)/(12*WORLD_SCALE)));for(let i=1;i<=steps;i++)open.push({x:from.x+(target.x-from.x)*i/steps,y:from.y+(target.y-from.y)*i/steps});}
 let route=smoothCircuit(open);
 const startAt=route.slice(0,-1).reduce((best,p,i)=>Math.hypot(p.x-points[0].x,p.y-points[0].y)<best.d?{d:Math.hypot(p.x-points[0].x,p.y-points[0].y),i}:best,{d:Infinity,i:0}).i;route=[...route.slice(startAt,-1),...route.slice(0,startAt),{...route[startAt]}];
 const gate=(p,i)=>{let at=0,d=Infinity;for(let j=0;j<route.length-1;j++){const q=Math.hypot(route[j].x-p.x,route[j].y-p.y);if(q<d){d=q;at=j;}}const before=route[(at+route.length-4)%(route.length-1)],after=route[(at+3)%(route.length-1)];return {...route[at],heading:Math.atan2(after.x-before.x,-(after.y-before.y)),i};};
 const gateTargets=[...points.slice(1,-1),toGame(780,-430)],course={route,gates:gateTargets.map((p,i)=>gate(p,i+1)),finish:gate(points[0],0)};
 const start={...course.finish,heading:course.finish.heading};
 const {vertices,rocks,stats:rockStats}=buildRocks(mesh.height,route,discoveries),fidelity=buildRidgeCluster(mesh.height);
 // The discovery opens from the known 26_1222 rover area and faces the paired
 // outcrops. Existing save identity/order is unchanged.
 Object.assign(discoveries[0],fidelity.cameras.pair,{focus:fidelity.targets.pair,cameraReference:'26_1222',featurePosition:toGame(49.956,-140.062)});
 const jump=toGame(600,-700);
 // Clear the jump run-up and landing corridor of authored obstacles.
 const filtered=[...rocks.filter(([x,y])=>Math.abs(x-jump.x)>55||Math.abs(y-jump.y)>600),...fidelity.rocks];
 // Boosts reward choices around the circuit; none occupies the start/finish.
 const pickups=[...course.gates.filter((_,i)=>i%2===1),toGame(600,-650)].map((p,id)=>({...p,id}));
 const scenery=await loadBackdrop(mesh);
 const sceneryVertices=new Float32Array(vertices.length+fidelity.vertices.length);sceneryVertices.set(vertices);sceneryVertices.set(fidelity.vertices,vertices.length);
 const lineWidth=58,lineBonus=.07;
 const area={...scenery,quietDiscoveries:true,collectibleLabelRange:CLOSE_RANGE,mesh,ground:mesh.height,scenery:sceneryVertices,raceSurface:{halfWidth:58},fidelity,rockStats,samples:discoveries,regions,pickups,rocks:filtered,mesa:[],parts:[],keepExploring:true,bounds:{minX:3504*WORLD_SCALE,width:9744*WORLD_SCALE,minY:4128*WORLD_SCALE,maxY:9600*WORLD_SCALE},course,start,jump,info:mesh.info};
 area.sampleRows=s=>[
  ...regions.map(p=>({p,known:(s.regions??[]).includes(p.regionId??p.id),region:true})),
  ...detailIndices.filter(i=>(s.regions??[]).includes(regionIdForDetail(i))).map(i=>({p:discoveries[i],index:i,known:s.collected.includes(i)})),
 ];
 area.turboSurfaceSpeed=1+lineBonus;
 area.speedMultiplier=s=>s.mode==='trial'&&distanceToRoute(route,s.x,s.y)<=lineWidth?1+lineBonus:1;
 // Index the same conservative rock roofs, so each camera sample only checks
 // nearby stones. Geometry, clearance and the approved camera response are identical.
 const buckets=new Map(),cellSize=64;
 for(const rock of filtered){const [x,y,r]=rock;for(let iy=Math.floor((y-r-2)/cellSize);iy<=Math.floor((y+r+2)/cellSize);iy++)for(let ix=Math.floor((x-r-2)/cellSize);ix<=Math.floor((x+r+2)/cellSize);ix++){const key=ix+','+iy;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}}
 area.cameraSurface=(x,y)=>{let h=mesh.height(x,y);for(const [rx,ry,r]of buckets.get(Math.floor(x/cellSize)+','+Math.floor(y/cellSize))??[])if(Math.hypot(x-rx,y-ry)<r+2)h=Math.max(h,mesh.height(rx,ry)+r*1.1);return h;};
 area.driveArea={...area,samples:[],releaseAfterTurn:true,airBrake:true};
 return area;
}

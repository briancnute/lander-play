import {loadArea} from './area.js';
import {wetRoute,wetSafeRoute,wetHeight,nearestWetLine,WATER_LEVEL} from './wet-course.js';
import {triangle} from '../mars-renderer/geometry.js';
const rect={x0:4100,x1:7100,y0:7100,y1:10100},inside=(x,y)=>x>rect.x0&&x<rect.x1&&y>rect.y0&&y<rect.y1;
function clip(mesh){if(!mesh?.indices)return;const v=mesh.vertices,indices=[];for(let i=0;i<mesh.indices.length;i+=3){const a=mesh.indices[i]*9,b=mesh.indices[i+1]*9,c=mesh.indices[i+2]*9;if(!inside((v[a]+v[b]+v[c])/3,(v[a+1]+v[b+1]+v[c+1])/3))indices.push(...mesh.indices.slice(i,i+3));}mesh.indices=new Uint16Array(indices);}
export async function loadWetArea(){
 const area=await loadArea({v2:true}),baseGround=area.ground;
 // Use the actual detailed Kodiak draw mesh, not its older coarse contact crop.
 const detail=area.details[0].vertices,xs=[...new Set(Array.from({length:detail.length/9},(_,i)=>detail[i*9]))].sort((a,b)=>a-b),ys=[...new Set(Array.from({length:detail.length/9},(_,i)=>detail[i*9+1]))].sort((a,b)=>a-b);
 const locate=(a,v)=>{let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m]<=v)lo=m;else hi=m;}return lo;};
 const original=(x,y)=>{if(x<xs[0]||x>xs.at(-1)||y<ys[0]||y>ys.at(-1))return baseGround(x,y);const i=locate(xs,x),j=locate(ys,y),u=(x-xs[i])/(xs[i+1]-xs[i]),w=(y-ys[j])/(ys[j+1]-ys[j]),a=j*xs.length+i,z=k=>detail[k*9+2];return u+w<=1?z(a)+(z(a+1)-z(a))*u+(z(a+xs.length)-z(a))*w:z(a+xs.length+1)+(z(a+xs.length)-z(a+xs.length+1))*(1-u)+(z(a+1)-z(a+xs.length+1))*(1-w);};
 area.mesh.indices=area.visualIndices??area.mesh.indices;
 // The dense contact mesh and visible surface are the same triangles. Modern
 // terrain and Kodiak remain the base; only the local course margins are authored.
 const step=20,n=151,v=new Float32Array(n*n*9),indices=[];
 const raw=(x,y)=>wetHeight(original(x,y),x,y);
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const x=rect.x0+i*step,y=rect.y0+j*step,z=raw(x,y),dx=raw(x-2,y)-raw(x+2,y),dy=raw(x,y-2)-raw(x,y+2),l=Math.hypot(dx,dy,4),p=nearestWetLine(x,y),q=nearestWetLine(x,y,wetSafeRoute),shelf=Math.min(p.d/p.width,q.d/q.width)<1,shore=Math.abs(z-WATER_LEVEL)<7,strata=Math.sin(z*.52)*.025;v.set([x,y,z,dx/l,dy/l,4/l,(shore?.51:shelf?.70:.65)+strata,(shore?.37:shelf?.48:.405)+strata*.8,(shore?.28:shelf?.32:.265)+strata*.5],(j*n+i)*9);if(i<n-1&&j<n-1){const a=j*n+i;indices.push(a,a+1,a+n,a+1,a+n+1,a+n);}}
 const ground=(x,y)=>{if(!inside(x,y))return original(x,y);const u=(x-rect.x0)/step,w=(y-rect.y0)/step,i=Math.floor(u),j=Math.floor(w),a=j*n+i,fx=u-i,fy=w-j,z=k=>v[k*9+2];return fx+fy<=1?z(a)+(z(a+1)-z(a))*fx+(z(a+n)-z(a))*fy:z(a+n+1)+(z(a+n)-z(a+n+1))*(1-fx)+(z(a+1)-z(a+n+1))*(1-fy);};
 for(const m of [area.mesh,...area.details,...area.worldTiles,area.backdrop]){clip(m);if(m.low)clip(m.low);}
 area.visualIndices=area.mesh.indices;
 area.details.push({vertices:v,indices:new Uint16Array(indices)});
 // Retain distant modern macro-geography; authored driveable shelves have no
 // invisible modern rock collisions or floating modern props.
 const scenery=[];for(let i=0;i<area.scenery.length;i+=27){const x=area.scenery[i],y=area.scenery[i+1];if(!inside(x,y)){scenery.push(...area.scenery.slice(i,i+27));continue;}const p=nearestWetLine(x,y),q=nearestWetLine(x,y,wetSafeRoute);if(Math.min(p.d/p.width,q.d/q.width)<1.35||ground(x,y)<WATER_LEVEL+2)continue;for(let k=i;k<i+27;k+=9)scenery.push(area.scenery[k],area.scenery[k+1],area.scenery[k+2]+ground(area.scenery[k],area.scenery[k+1])-original(area.scenery[k],area.scenery[k+1]),...area.scenery.slice(k+3,k+9));}
 // Broken, low sediment slabs frame the shelf without hiding the driveable line.
 let seed=521;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
 const rocks=[];for(let i=0;i<1800;i++){const x=rect.x0+random()*3000,y=rect.y0+random()*3000,z=ground(x,y),a=nearestWetLine(x,y),b=nearestWetLine(x,y,wetSafeRoute),p=a.d/a.width<b.d/b.width?a:b;if(z<WATER_LEVEL+1||p.d<p.width*.68||p.d>p.width*2.8)continue;const r=2+random()**2*10,h=r*(.2+random()*.4),top=[x+r*.15,y-r*.12,z+h],ring=Array.from({length:6},(_,k)=>{const t=k*Math.PI/3;return [x+Math.cos(t)*r,y+Math.sin(t)*r*.7,z-.5];});for(let k=0;k<6;k++)triangle(scenery,top,ring[k],ring[(k+1)%6],[.48+random()*.06,.34,.24]);rocks.push([x,y,r*.75]);}
 const water=[];triangle(water,[4100,4000,WATER_LEVEL],[35000,4000,WATER_LEVEL],[4100,25000,WATER_LEVEL],[.31,.36,.37]);triangle(water,[35000,4000,WATER_LEVEL],[35000,25000,WATER_LEVEL],[4100,25000,WATER_LEVEL],[.31,.36,.37]);
 Object.assign(area,{ground,modernGround:original,scenery:new Float32Array(scenery),water:new Float32Array(water),waterLevel:WATER_LEVEL,terrainFogDistance:16000,backdropHazeFloor:.28,raceSurface:null,samples:[],sampleRows:()=>[],regions:[],pickups:[],rocks,parts:[],mesa:[],course:{route:wetRoute,gates:[],finish:wetRoute.at(-1)},start:wetRoute[0],cameraSurface:ground,speedMultiplier:()=>1,bounds:{minX:4100,width:7100,minY:7100,maxY:10100},boundaryAt:null,keepExploring:true});
 area.driveArea={...area,samples:[],releaseAfterTurn:true,airBrake:true,cruise:false,arcadeHandling:true,roverHandling:true,airControl:true,boostKit:true};
 return area;
}

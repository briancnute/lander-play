import {triangle} from '../mars-renderer/triangle.js';
export const SCALE=2/3,UNITS=4*SCALE,BOUNDS=[-7000,2000,-15500,1500];
export const toGame=(east,north)=>({x:east*UNITS,y:-north*UNITS});
export const toMars=(x,y)=>({east:x/UNITS,north:-y/UNITS});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function makeSurface(raw,crop){
 if(raw.length!==crop.columns*crop.rows||raw.some(z=>!Number.isFinite(z)||z<-10000))throw Error('The measured Gale terrain is incomplete.');
 const {columns:cols,rows,step,eastMin,northMax}=crop;
 const zs=Float32Array.from(raw,z=>(z+4500)*UNITS);
 const xs=Float32Array.from({length:cols},(_,i)=>(eastMin+i*step)*UNITS),ys=Float32Array.from({length:rows},(_,j)=>-(northMax-j*step)*UNITS);
 const height=(x,y)=>{const a=clamp((x-xs[0])/(step*UNITS),0,cols-1.000001),b=clamp((y-ys[0])/(step*UNITS),0,rows-1.000001),i=Math.floor(a),j=Math.floor(b),u=clamp((x-xs[i])/(xs[i+1]-xs[i]),0,1),v=clamp((y-ys[j])/(ys[j+1]-ys[j]),0,1),k=j*cols+i;return u+v<=1?zs[k]+(zs[k+1]-zs[k])*u+(zs[k+cols]-zs[k])*v:zs[k+cols+1]+(zs[k+cols]-zs[k+cols+1])*(1-u)+(zs[k+1]-zs[k+cols+1])*(1-v);};
 return {height,zs,xs,ys,crop};
}
function tile(surface,i0,j0,i1,j1,stride=1){
 const axis=(a,b)=>{const out=[];for(let k=a;k<b;k+=stride)out.push(k);out.push(b);return out;};
 const ix=axis(i0,i1),jy=axis(j0,j1),v=[],indices=[],cols=ix.length,{height}=surface;
 for(const j of jy)for(const i of ix){const x=surface.xs[i],y=surface.ys[j],z=surface.zs[j*surface.crop.columns+i],dx=height(x-8,y)-height(x+8,y),dy=height(x,y-8)-height(x,y+8),l=Math.hypot(dx,dy,16);v.push(x,y,z,dx/l,dy/l,16/l,.65,.43,.30);}
 for(let j=0;j<jy.length-1;j++)for(let i=0;i<cols-1;i++){const a=j*cols+i,b=a+1,c=a+cols,d=c+1;indices.push(a,b,c,b,d,c);}
 // Visual skirts close distant level-of-detail seams. Contact uses the full grid.
 const edges=[ix.map((_,i)=>i),ix.map((_,i)=>(jy.length-1)*cols+i),jy.map((_,j)=>j*cols),jy.map((_,j)=>j*cols+cols-1)];
 for(const edge of edges)for(let i=1;i<edge.length;i++){const a=edge[i-1],b=edge[i],k=v.length/9;v.push(...v.slice(a*9,a*9+9),...v.slice(b*9,b*9+9));v[k*9+2]-=55;v[(k+1)*9+2]-=55;indices.push(a,b,k,b,k+1,k);}
 return {vertices:new Float32Array(v),indices:new Uint16Array(indices),minX:surface.xs[i0],maxX:surface.xs[i1],minY:surface.ys[j0],maxY:surface.ys[j1]};
}
function contextMesh(raw,info,surface){
 const [west,east,south,north]=info.bounds,dx=(east-west)/info.columns,dy=(north-south)/info.rows;
 const sample=(e,n)=>{const u=clamp((e-west)/dx-.5,0,info.columns-1.000001),v=clamp((north-n)/dy-.5,0,info.rows-1.000001),i=Math.floor(u),j=Math.floor(v),a=j*info.columns+i,z=[raw[a],raw[a+1],raw[a+info.columns],raw[a+info.columns+1]];if(z.some(z=>!Number.isFinite(z)||z<-10000))return NaN;return ((z[0]*(1-u+i)+z[1]*(u-i))*(1-v+j)+(z[2]*(1-u+i)+z[3]*(u-i))*(v-j)+4500)*UNITS;};
 const c=surface.crop,axes=(lo,hi,extras)=>[...new Set([...Array.from({length:Math.floor((hi-lo)/200)+1},(_,i)=>lo+i*200),hi,...extras])].sort((a,b)=>a-b);
 const es=axes(west+50,east-50,[c.eastMin,c.eastMax]),ns=axes(south+50,north-50,[c.northMin,c.northMax]).reverse();
 const contextHeight=(e,n)=>{const ce=clamp(e,c.eastMin,c.eastMax),cn=clamp(n,c.northMin,c.northMax),distance=Math.hypot(e-ce,n-cn),z=sample(e,n);if(!Number.isFinite(z))return NaN;const p=toGame(ce,cn),edge=sample(ce,cn),t=clamp(distance/500,0,1),blend=1-t*t*(3-2*t);return z+(surface.height(p.x,p.y)-edge)*blend;};
 const vertices=[],indices=[],valid=[];
 for(const n of ns)for(const e of es){const p=toGame(e,n),z=contextHeight(e,n);valid.push(Number.isFinite(z));const safe=(a,b)=>{const v=contextHeight(a,b);return Number.isFinite(v)?v:z;},dx=safe(e-50,n)-safe(e+50,n),dy=safe(e,n+50)-safe(e,n-50),l=Math.hypot(dx,dy,100*UNITS);vertices.push(p.x,p.y,Number.isFinite(z)?z:0,Number.isFinite(l)?dx/l:0,Number.isFinite(l)?dy/l:0,Number.isFinite(l)?100*UNITS/l:1,.65,.43,.30);}
 for(let j=0;j<ns.length-1;j++)for(let i=0;i<es.length-1;i++){const e=(es[i]+es[i+1])/2,n=(ns[j]+ns[j+1])/2;if(e>=c.eastMin&&e<=c.eastMax&&n>=c.northMin&&n<=c.northMax)continue;const a=j*es.length+i,b=a+1,d=a+es.length+1,cc=d-1;if([a,b,cc,d].every(k=>valid[k]))indices.push(a,b,cc,b,d,cc);}
 return {vertices:new Float32Array(vertices),indices:new Uint16Array(indices)};
}
export async function loadArea(){
 const names=['terrain.json','elevations.f32','context.f32','route.json'];
 const response=await Promise.all(names.map(n=>fetch(new URL('./assets/'+n,import.meta.url),{signal:AbortSignal.timeout(45000)})));if(response.some(r=>!r.ok))throw Error('Gale could not finish downloading. Reload to try again.');
 const info=await response[0].json(),raw=new Float32Array(await response[1].arrayBuffer()),context=new Float32Array(await response[2].arrayBuffer()),route=await response[3].json();
 if(context.length!==info.context.columns*info.context.rows)throw Error('The distant terrain is incomplete.');
 const surface=makeSurface(raw,info.crop),tiles=[];
 for(let j=0;j<info.crop.rows-1;j+=40)for(let i=0;i<info.crop.columns-1;i+=40){const endI=Math.min(i+40,info.crop.columns-1),endJ=Math.min(j+40,info.crop.rows-1),t=tile(surface,i,j,endI,endJ);t.low=tile(surface,i,j,endI,endJ,4);tiles.push(t);}
 const segments=route.segments.map(points=>({points:points.map(p=>toGame(...p))}));
 const stops=route.stops.map(p=>({...p,...toGame(...p.pos)}));
 const path=segments.flatMap(s=>s.points),course={route:path,gates:[],finish:path.at(-1)};
 const scenery=makeRocks(surface.height,path,stops);
 const area={terrainFogDistance:11000,backdropHazeFloor:.38,info,route,segments,stops,course,start:{...stops[0],heading:Math.PI-Math.atan2(140,2700)},surface,ground:surface.height,cameraSurface:surface.height,worldTiles:tiles,backdrop:contextMesh(context,info.context,surface),mesh:{vertices:new Float32Array(),indices:new Uint16Array(),xs:surface.xs,ys:surface.ys},scenery:scenery.vertices,rocks:scenery.rocks,parts:[],mesa:[],pickups:[],samples:[],keepExploring:true,bounds:{minX:BOUNDS[0]*UNITS,width:BOUNDS[1]*UNITS,minY:-BOUNDS[3]*UNITS,maxY:-BOUNDS[2]*UNITS},rockBuckets:scenery.buckets};
 area.cameraSurface=(x,y)=>{let z=area.ground(x,y);for(const [rx,ry,r]of scenery.near(x,y))if(Math.hypot(x-rx,y-ry)<r+2)z=Math.max(z,area.ground(rx,ry)+r);return z;};
 area.localRocks=scenery.near;
 area.driveArea={...area,releaseAfterTurn:true,airBrake:true,airControl:true,boostKit:true,roverHandling:true,arcadeHandling:true,surfaceGrip:s=>{const h=area.ground,slope=Math.hypot(h(s.x+8,s.y)-h(s.x-8,s.y),h(s.x,s.y+8)-h(s.x,s.y-8))/16;return 120+100*Math.min(1,slope*7);}};
 return area;
}
function makeRocks(height,path,stops){
 let seed=5021;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const out=[],rocks=[],buckets=new Map(),routeBuckets=new Map(),cell=128;
 for(const p of path){const key=Math.floor(p.x/cell)+','+Math.floor(p.y/cell);if(!routeBuckets.has(key))routeBuckets.set(key,[]);routeBuckets.get(key).push(p);}
 const nearPath=(x,y)=>{const ix=Math.floor(x/cell),iy=Math.floor(y/cell);for(let j=iy-1;j<=iy+1;j++)for(let i=ix-1;i<=ix+1;i++)if((routeBuckets.get(i+','+j)??[]).some(p=>Math.hypot(p.x-x,p.y-y)<34))return true;return false;};
 for(let k=0;k<9500;k++){
  const q=path[Math.floor(random()*path.length)],a=random()*Math.PI*2,d=45+random()*300;
  const p=k%3?{x:q.x+Math.cos(a)*d,y:q.y+Math.sin(a)*d}:toGame(-7200+random()*9400,-15700+random()*17400);
  if(stops.some(s=>Math.hypot(s.x-p.x,s.y-p.y)<65)||nearPath(p.x,p.y))continue;
  const radius=.8+random()**3*8,rise=radius*(.15+random()**2*.6),lower=[],upper=[],base=height(p.x,p.y),shade=.49+random()*.10,color=[shade,shade-.13,shade-.23];
  for(let i=0;i<6;i++){const t=a+i*Math.PI/3,r=radius*(.75+random()*.25),x=p.x+Math.cos(t)*r,y=p.y+Math.sin(t)*r;lower.push([x,y,height(x,y)-.2]);upper.push([p.x+(x-p.x)*(.55+random()*.35),p.y+(y-p.y)*(.55+random()*.35),Math.max(base,height(x,y))+rise*(.7+random()*.3)]);}
  for(let i=0;i<6;i++){const j=(i+1)%6;triangle(out,lower[i],lower[j],upper[i],color);triangle(out,lower[j],upper[j],upper[i],color);if(i>0&&i<5)triangle(out,upper[0],upper[i],upper[i+1],color.map(c=>c+.04));}
  if(radius>2){const r=[p.x,p.y,radius];rocks.push(r);const key=Math.floor(p.x/cell)+','+Math.floor(p.y/cell);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(r);}
 }
 const near=(x,y)=>{const out=[],ix=Math.floor(x/cell),iy=Math.floor(y/cell);for(let j=iy-1;j<=iy+1;j++)for(let i=ix-1;i<=ix+1;i++)out.push(...(buckets.get(i+','+j)??[]));return out;};
 return {vertices:new Float32Array(out),rocks,buckets,near};
}

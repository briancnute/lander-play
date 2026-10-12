import {toGame,toMetres} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
export const retainedRegions=[[-1500,3500,-2700,1500],[-2700,600,-648,2350]];
export const retainedSurface=(e,n)=>retainedRegions.some(([l,r,b,t])=>e>=l&&e<=r&&n>=b&&n<=t);
const retainedGround=(e,n)=>retainedSurface(e,n)||(e>=-2450&&e<=500&&n>=-650&&n<=2150);
const locate=(a,v)=>{let l=0,r=a.length-1;while(r-l>1){const m=(l+r)>>1;if(a[m]<=v)l=m;else r=m;}return l;};

export async function loadWorld(local,oldGround){
 const responses=await Promise.all(['world-terrain.json','world-elevations.f32','bright-terrain.json','bright-elevations.f32','world-context.f32'].map(p=>fetch(new URL('./assets/'+p,import.meta.url))));
 if(responses.some(r=>!r.ok))throw Error('The full Jezero terrain could not load. Reload to try again.');
 const info=await responses[0].json(),raw=new Float32Array(await responses[1].arrayBuffer()),fine=await responses[2].json(),fineRaw=new Float32Array(await responses[3].arrayBuffer());
 function sampler(data,c){
  if(data.length!==c.columns*c.rows||data.some(v=>!Number.isFinite(v)||v< -10000))throw Error('Incomplete Jezero terrain coverage');
  return (e,n)=>{const x=clamp((e-c.eastMin)/c.step,0,c.columns-1.000001),y=clamp((c.northMax-n)/c.step,0,c.rows-1.000001),i=Math.floor(x),j=Math.floor(y),u=x-i,v=y-j,k=j*c.columns;return (data[k+i]*(1-u)+data[k+i+1]*u)*(1-v)+(data[k+c.columns+i]*(1-u)+data[k+c.columns+i+1]*u)*v;};
 }
 const coarse=sampler(raw,info.crop),detail=sampler(fineRaw,fine.crop);
 const contextSample=sampler(new Float32Array(await responses[4].arrayBuffer()),info.context);
 const measured=(e,n)=>{const c=fine.crop,weight=smooth(Math.min(e-c.eastMin,c.eastMax-e,n-c.northMin,c.northMax-n)/200);return coarse(e,n)*(1-weight)+detail(e,n)*weight;};
 // New landforms scale in all dimensions together; retained landmarks never change.
 const shaped=(e,n)=>(-2420+(measured(e,n)+2420)*.8+2565)*4;
 const source=(e,n)=>{
  if(retainedGround(e,n)){const p=toGame(e,n);return oldGround(p.x,p.y);}
  let nearest=null,distance=Infinity;
  for(const [l,r,b,t]of retainedRegions){const q=[clamp(e,l,r),clamp(n,b,t)],d=Math.hypot(e-q[0],n-q[1]);if(d<distance){distance=d;nearest=q;}}
  if(distance>=200)return shaped(e,n);
  const p=toGame(...nearest);return shaped(e,n)+(oldGround(p.x,p.y)-shaped(...nearest))*(1-smooth(distance/200));
 };
 // Shared axes preserve every old boundary vertex; near terrain is also the contact mesh.
 const axis=(lo,hi,extra)=>[...new Set([...Array.from({length:(hi-lo)/20+1},(_,i)=>lo+i*20),...extra])].filter(v=>v>=lo&&v<=hi).sort((a,b)=>a-b);
 const es=axis(-12400,4400,[...local.info.eastMetres,...Array.from({length:331},(_,i)=>-2700+i*10),600,3500]);
 const ns=axis(-5400,5400,[...local.info.northMetres,...Array.from({length:186},(_,i)=>504+i*10),2350,-650,-648,-2700,1500]).reverse();
 const tiles=[],buckets=new Map(),cell=640;
 function make(es,ns){
  const xs=es.map(e=>Math.fround(toGame(e,0).x)),ys=ns.map(n=>Math.fround(toGame(0,n).y)),indices=[];let v=new Float32Array(es.length*ns.length*9);
  for(let j=0;j<ns.length;j++)for(let i=0;i<es.length;i++){
   const e=es[i],n=ns[j],z=source(e,n),dx=source(e-4,n)-source(e+4,n),dy=source(e,n+4)-source(e,n-4),l=Math.hypot(dx,dy,25.6),slope=Math.hypot(dx,dy)/25.6;
   const bright=Math.exp(-(((e+5688)/190)**2+((n-2081)/160)**2)),sand=clamp(1-slope*6),strata=Math.sin(z*.35)*Math.min(.025,slope*.04);
   v.set([xs[i],ys[j],z,dx/l,dy/l,25.6/l,.65+sand*.035+strata+bright*.07,.405+sand*.036+strata*.8+bright*.06,.265+sand*.03+strata*.5+bright*.04],(j*es.length+i)*9);
  }
  for(let j=0;j<ns.length-1;j++)for(let i=0;i<es.length-1;i++)if(!retainedSurface((es[i]+es[i+1])/2,(ns[j]+ns[j+1])/2)){const a=j*es.length+i,b=a+1,c=a+es.length,d=c+1;indices.push(a,b,c,b,d,c);}
  const height=(x,y)=>{const i=locate(xs,x),j=locate(ys,y),u=clamp((x-xs[i])/(xs[i+1]-xs[i])),w=clamp((y-ys[j])/(ys[j+1]-ys[j])),a=j*xs.length+i,b=a+1,c=a+xs.length,d=c+1,z=k=>v[k*9+2];return u+w<=1?z(a)+(z(b)-z(a))*u+(z(c)-z(a))*w:z(d)+(z(c)-z(d))*(1-u)+(z(b)-z(d))*(1-w);};
  const terrainIndexCount=indices.length,verts=Array.from(v);
  // Downward edge skirts conceal distant LOD joins; never part of contact sampling.
  const edges=[es.map((_,i)=>i),es.map((_,i)=>(ns.length-1)*es.length+i),ns.map((_,j)=>j*es.length),ns.map((_,j)=>j*es.length+es.length-1)];
  for(const edge of edges)for(let i=1;i<edge.length;i++){const a=edge[i-1],b=edge[i],k=verts.length/9;verts.push(...v.slice(a*9,a*9+9),...v.slice(b*9,b*9+9));verts[k*9+2]-=120;verts[(k+1)*9+2]-=120;indices.push(a,b,k,b,k+1,k);}
  v=new Float32Array(verts);
  return {vertices:v,indices:new Uint16Array(indices),terrainIndexCount,height,minX:xs[0],maxX:xs.at(-1),minY:ys[0],maxY:ys.at(-1)};
 }
 for(let j=0;j<ns.length-1;j+=48)for(let i=0;i<es.length-1;i+=48){
  const ex=es.slice(i,i+49),ny=ns.slice(j,j+49),tile=make(ex,ny);if(!tile.terrainIndexCount)continue;
  // Keep retained-land boundary tiles full resolution. Distant joins use skirts.
  if(!ex.some(e=>retainedRegions.some(([l,r])=>e===l||e===r))&&!ny.some(n=>retainedRegions.some(([, ,b,t])=>n===b||n===t))){
   const lowEx=ex.filter((_,k)=>k%4===0||k===ex.length-1),lowNy=ny.filter((_,k)=>k%4===0||k===ny.length-1);
   tile.low=make(lowEx,lowNy);
  }
  tiles.push(tile);
  for(let y=Math.floor(tile.minY/cell);y<=Math.floor(tile.maxY/cell);y++)for(let x=Math.floor(tile.minX/cell);x<=Math.floor(tile.maxX/cell);x++){const key=x+','+y;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(tile);}
 }
 const height=(x,y)=>{const {east:e,north:n}=toMetres(x,y);if(retainedGround(e,n))return oldGround(x,y);const tile=(buckets.get(Math.floor(x/cell)+','+Math.floor(y/cell))??[]).find(t=>x>=t.minX-.001&&x<=t.maxX+.001&&y>=t.minY-.001&&y<=t.maxY+.001);return tile?tile.height(x,y):source(e,n);};
 const segments=info.segments.map(s=>({...s,points:s.points.map(p=>toGame(...p))}));
 const cc=info.context,contextVertices=new Float32Array(cc.columns*cc.rows*9),contextIndices=[];
 const contextHeight=(e,n)=>{const ce=clamp(e,-12400,4400),cn=clamp(n,-5400,5400),d=Math.hypot(e-ce,n-cn),base=(contextSample(e,n)+2420)*3.2+580;return d>=400?base:base+(source(ce,cn)-((contextSample(ce,cn)+2420)*3.2+580))*(1-smooth(d/400));};
 for(let j=0;j<cc.rows;j++)for(let i=0;i<cc.columns;i++){const e=cc.eastMin+i*cc.step,n=cc.northMax-j*cc.step,p=toGame(e,n),z=contextHeight(e,n),dx=contextHeight(e-50,n)-contextHeight(e+50,n),dy=contextHeight(e,n+50)-contextHeight(e,n-50),l=Math.hypot(dx,dy,320);contextVertices.set([p.x,p.y,z,dx/l,dy/l,320/l,.65,.42,.29],(j*cc.columns+i)*9);}
 for(let j=0;j<cc.rows-1;j++)for(let i=0;i<cc.columns-1;i++){const e=cc.eastMin+(i+.5)*cc.step,n=cc.northMax-(j+.5)*cc.step;if(e>=-12400&&e<=4400&&n>=-5400&&n<=5400)continue;const a=j*cc.columns+i,b=a+1,c=a+cc.columns,d=c+1;contextIndices.push(a,b,c,b,d,c);}
 return {info,tiles,height,source,measured,segments,backdrop:{vertices:contextVertices,indices:new Uint16Array(contextIndices)}};
}

export function worldPickups(world,firstId){
 const result=[];let seed=1980;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const route=world.segments.flatMap(s=>s.points);
 for(let n=-4500;n<=4500;n+=600)for(let e=-11500;e<=3500;e+=600){
  const east=e+(random()-.5)*220,north=n+(random()-.5)*220;if(retainedGround(east,north))continue;
  const p=toGame(east,north),distance=Math.min(...route.map(q=>Math.hypot(q.x-p.x,q.y-p.y))),remote=Math.min(east+12000,4000-east,north+5000,5000-north)<1500;
  if(random()>(distance<400?.15:remote?.8:.5))continue;
  const slope=Math.hypot(world.height(p.x+16,p.y)-world.height(p.x-16,p.y),world.height(p.x,p.y+16)-world.height(p.x,p.y-16))/32;
  if(slope>.22)continue;result.push({...p,id:firstId+result.length});
 }
 return result;
}

export function worldRocks(world,sites,reserved=[]){
 let seed=20260920;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const route=world.segments.filter(s=>s.sol>770).flatMap(s=>s.points),buckets=new Map(),cell=120;
 for(const p of route){const key=Math.floor(p.x/cell)+','+Math.floor(p.y/cell);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);}
 const nearRoute=p=>{const x=Math.floor(p.x/cell),y=Math.floor(p.y/cell);for(let j=y-1;j<=y+1;j++)for(let i=x-1;i<=x+1;i++)if((buckets.get(i+','+j)??[]).some(q=>Math.hypot(q.x-p.x,q.y-p.y)<85))return true;return false;};
 const vertices=[],rocks=[];
 for(let k=0;k<9000;k++){
  const q=route[Math.floor(random()*route.length)],a=random()*Math.PI*2,d=70+random()**.6*380;
  const p=k%4?{x:q.x+Math.cos(a)*d,y:q.y+Math.sin(a)*d}:toGame(-11800+random()*15600,-4800+random()*9600),{east:e,north:n}=toMetres(p.x,p.y);
  if(retainedGround(e,n)||nearRoute(p)||sites.some(s=>Math.hypot(p.x-s.x,p.y-s.y)<100))continue;
  const vertexStart=vertices.length;
  const size=2+random()**3*25,angle=random()*Math.PI,rise=size*(.1+random()*.26),base=world.height(p.x,p.y),lower=[],upper=[];
  const light=e< -5450&&e> -5850&&n>1800&&n<2300;
  for(let i=0;i<6;i++){const a=i*Math.PI/3,u=Math.cos(a)*size*.5,v=Math.sin(a)*size*(.2+random()*.1),x=p.x+u*Math.cos(angle)-v*Math.sin(angle),y=p.y+u*Math.sin(angle)+v*Math.cos(angle);lower.push([x,y,world.height(x,y)-.4]);upper.push([x,y,Math.max(base,world.height(x,y))+rise*(.7+random()*.3)]);}
  const shade=(light?.65:.50)+random()*.08,color=[shade,shade-.14,shade-.25];
  for(let i=0;i<6;i++){const j=(i+1)%6;triangle(vertices,lower[i],lower[j],upper[i],color);triangle(vertices,lower[j],upper[j],upper[i],color);if(i>0&&i<5)triangle(vertices,upper[0],upper[i],upper[i+1],color.map(v=>v+.045));}
  if(reserved.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<80)){vertices.length=vertexStart;continue;}
  if(size>6)rocks.push([p.x,p.y,size*.5]);
 }
 return {vertices:new Float32Array(vertices),rocks};
}

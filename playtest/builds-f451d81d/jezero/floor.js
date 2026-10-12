// Measured expansion. Original Three Forks samples and race are never resampled.
import {toGame,toMetres} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';

export const floorExtent={eastMin:-1500,eastMax:3500,northMin:-2700,northMax:1500};
export const floorBounds={minX:2803.2,width:toGame(3300,0).x,minY:3302.4,maxY:toGame(0,-2500).y};
export const floorMapBounds={minX:0,minY:0,width:toGame(3500,0).x,maxY:toGame(0,-2700).y};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const locate=(a,v)=>{let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m]<=v)lo=m;else hi=m;}return lo;};

export async function loadFloor(local){
 const responses=await Promise.all(['floor-terrain.json','floor-elevations.f32'].map(p=>fetch(new URL('./assets/'+p,import.meta.url))));
 if(responses.some(r=>!r.ok))throw Error('The landing plain could not load. Reload to try again.');
 const info=await responses[0].json(),raw=new Float32Array(await responses[1].arrayBuffer());
 if(raw.length!==info.columns*info.rows||raw.some(v=>!Number.isFinite(v)||v< -10000))throw Error('Invalid landing-plain elevation coverage');
 const measured=(e,n)=>{const x=clamp((e-info.eastMin)/10,0,info.columns-1.000001),y=clamp((info.northMax-n)/10,0,info.rows-1.000001),i=Math.floor(x),j=Math.floor(y),u=x-i,v=y-j,k=j*info.columns;return (raw[k+i]*(1-u)+raw[k+i+1]*u)*(1-v)+(raw[k+info.columns+i]*(1-u)+raw[k+info.columns+i+1]*u)*v;};
 const oldHeight=local.height;
 const source=(e,n)=>{
  const ce=clamp(e,-1500,1500),cn=clamp(n,-1500,1500),distance=Math.hypot(e-ce,n-cn),p=toGame(ce,cn);
  // A 100 m edge correction meets the existing mesh exactly, fading to the
  // new measured product. No blanket vertical exaggeration or invented hills.
  return (measured(e,n)+2565)*4+(oldHeight(p.x,p.y)-(measured(ce,cn)+2565)*4)*(1-clamp(distance/100));
 };
 const regular=(a,b,step=20)=>Array.from({length:Math.round((b-a)/step)+1},(_,i)=>a+i*step);
 const tiles=[];
 function grid(easts,norths){
  const xs=easts.map(e=>Math.fround(toGame(e,0).x)),ys=norths.map(n=>Math.fround(toGame(0,n).y)),v=new Float32Array(xs.length*ys.length*9),indices=[];
  if(xs.length*ys.length>65535)throw Error('Expansion exceeds portable mesh limit');
  for(let j=0;j<ys.length;j++)for(let i=0;i<xs.length;i++){
   const e=easts[i],n=norths[j],z=source(e,n),dx=source(e-5,n)-source(e+5,n),dy=source(e,n+5)-source(e,n-5),l=Math.hypot(dx,dy,32),slope=Math.hypot(dx,dy)/32;
   const seitah=Math.exp(-(((e-2050)/650)**2+((n+1700)/550)**2)),sand=clamp(1-slope*9),dark=seitah*(1-sand*.6)*.055;
   v.set([xs[i],ys[j],z,dx/l,dy/l,32/l,.65+sand*.035-dark,.405+sand*.036-dark*.8,.265+sand*.03-dark*.55],(j*xs.length+i)*9);
  }
  for(let j=0;j<ys.length-1;j++)for(let i=0;i<xs.length-1;i++){const a=j*xs.length+i,b=a+1,c=a+xs.length,d=c+1;indices.push(a,b,c,b,d,c);}
  const height=(x,y)=>{const i=locate(xs,x),j=locate(ys,y),u=clamp((x-xs[i])/(xs[i+1]-xs[i])),w=clamp((y-ys[j])/(ys[j+1]-ys[j])),a=j*xs.length+i,b=a+1,c=a+xs.length,d=c+1,z=k=>v[k*9+2];return u+w<=1?z(a)+(z(b)-z(a))*u+(z(c)-z(a))*w:z(d)+(z(c)-z(d))*(1-u)+(z(b)-z(d))*(1-w);};
  const tile={vertices:v,indices:new Uint16Array(indices),height};tiles.push(tile);return tile;
 }
 // Shared axes match every original edge vertex, preventing T-junction cracks.
 const southNorth=regular(-2700,-1500).reverse();
 const east=grid(regular(1500,3500),[...local.info.northMetres,...southNorth.slice(1)]);
 const south=grid(local.info.eastMetres,southNorth);
 const height=(x,y)=>{const {east:e,north:n}=toMetres(x,y);return e>1500?east.height(x,y):n< -1500?south.height(x,y):oldHeight(x,y);};
 return {info,tiles,height,source};
}

// Representative crater-floor rock vocabulary, not a recreation of sample rocks.
export function floorRocks(height,sites){
 let seed=72021;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const vertices=[],rocks=[],stats={pavers:0,slabs:0,boulders:0};
 // Broad open corridors connect the real reference points without being roads.
 const spine=[[900,-650],[1400,-700],[2200,-820],[2580,-970],[2450,-1350],[2040,-1677],[1800,-1370],[1200,-900]].map(([e,n])=>toGame(e,n));
 const distance=(x,y)=>Math.min(...spine.slice(1).map((b,i)=>{const a=spine[i],dx=b.x-a.x,dy=b.y-a.y,t=clamp(((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy));return Math.hypot(x-a.x-dx*t,y-a.y-dy*t);}));
 for(let k=0;k<6500;k++){
  const e=1000+random()*2300,n=430-random()*2900,p=toGame(e,n),zone=Math.exp(-(((e-2050)/650)**2+((n+1700)/550)**2)),patch=.5+.5*Math.sin(e*.017+Math.sin(n*.009)*2.7);
  if(random()>(.13+zone*.57)*(.35+patch*.65))continue;
  const size=1+random()**3*(zone>.35?35:17),slab=random()<.57,rise=slab?size*(.09+random()*.12):size*(.3+random()*.35),angle=random()*Math.PI,width=size*(.3+random()*.5),h=height(p.x,p.y);
  const clear=distance(p.x,p.y)<75||sites.some(s=>Math.hypot(p.x-s.x,p.y-s.y)<75);
  if(clear&&size>5)continue;
  const ring=[],top=[];
  for(let i=0;i<7;i++){const a=i*Math.PI*2/7,r=.78+random()*.22,u=Math.cos(a)*size*r/2,v=Math.sin(a)*width*r/2,x=p.x+u*Math.cos(angle)-v*Math.sin(angle),y=p.y+u*Math.sin(angle)+v*Math.cos(angle);ring.push([x,y,height(x,y)-.4]);top.push([x+(p.x-x)*.12,y+(p.y-y)*.12,Math.max(h,height(x,y))+rise*(.82+random()*.18)]);}
  const shade=.49+random()*.09,color=[shade,shade-.13,shade-.24];
  for(let i=0;i<7;i++){const j=(i+1)%7;triangle(vertices,ring[i],ring[j],top[i],color);triangle(vertices,ring[j],top[j],top[i],color);if(i>0&&i<6)triangle(vertices,top[0],top[i],top[i+1],color.map(v=>v+.045));}
  if(size>6)rocks.push([p.x,p.y,size*.48]);stats[slab?(size>6?'slabs':'pavers'):'boulders']++;
 }
 return {vertices:new Float32Array(vertices),rocks,stats,spine};
}

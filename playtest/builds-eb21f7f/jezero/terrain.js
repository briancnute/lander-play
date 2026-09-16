import {WORLD_SCALE,HORIZONTAL_UNITS} from './scale.js';
// USGS elevation surface, shared exactly by the renderer, physics and camera.
import {triangle} from '../mars-renderer/geometry.js';
export const toGame=(east,north)=>({x:(east+1500)*HORIZONTAL_UNITS,y:(1500-north)*HORIZONTAL_UNITS});
export const toMetres=(x,y)=>({east:x/HORIZONTAL_UNITS-1500,north:1500-y/HORIZONTAL_UNITS});
const locate=(a,v)=>{let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m]<=v)lo=m;else hi=m;}return lo;};
export async function loadTerrain(){
 const [infoResponse,heightResponse]=await Promise.all([fetch(new URL('./assets/terrain.json',import.meta.url)),fetch(new URL('./assets/elevations.f32',import.meta.url))]);
 if(!infoResponse.ok||!heightResponse.ok)throw Error('The terrain could not be loaded. Reload to try again.');
 const info=await infoResponse.json(),raw=new Float32Array(await heightResponse.arrayBuffer());
 const xs=info.eastMetres.map(e=>Math.fround((e+1500)*HORIZONTAL_UNITS)),ys=info.northMetres.map(n=>Math.fround((1500-n)*HORIZONTAL_UNITS));
 if(raw.length!==xs.length*ys.length||raw.some(v=>!Number.isFinite(v)||v< -10000))throw Error('Invalid terrain data');
 const data=new Float32Array(raw.length*9),indices=new Uint16Array((xs.length-1)*(ys.length-1)*6);
 if(raw.length>65535)throw Error('Terrain exceeds the portable mesh limit');
 for(let j=0;j<ys.length;j++)for(let i=0;i<xs.length;i++){
  const k=j*xs.length+i,x=xs[i],y=ys[j],e=x/HORIZONTAL_UNITS-1500,n=1500-y/HORIZONTAL_UNITS;
  // Single documented, optional jump. All other elevations retain measured shape.
  const bump=14*Math.exp(-(((e-600)*4/38)**2+((n+700)*4/22)**2));
  data.set([x,y,(raw[k]-info.heightOffsetMetres)*4+bump,0,0,1,.65,.405,.265],k*9);
 }
 const height=(x,y)=>{const ix=locate(xs,x),iy=locate(ys,y),u=Math.max(0,Math.min(1,(x-xs[ix])/(xs[ix+1]-xs[ix]))),v=Math.max(0,Math.min(1,(y-ys[iy])/(ys[iy+1]-ys[iy]))),a=iy*xs.length+ix,b=a+1,c=a+xs.length,d=c+1,z=i=>data[i*9+2];return u+v<=1?z(a)+(z(b)-z(a))*u+(z(c)-z(a))*v:z(d)+(z(c)-z(d))*(1-u)+(z(b)-z(d))*(1-v);};
 let at=0;
 for(let j=0;j<ys.length-1;j++)for(let i=0;i<xs.length-1;i++){const a=j*xs.length+i,b=a+1,c=a+xs.length,d=c+1;indices.set([a,b,c,b,d,c],at);at+=6;}
 for(let j=0;j<ys.length;j++)for(let i=0;i<xs.length;i++){
  const k=j*xs.length+i,x=xs[i],y=ys[j],nx=height(x-12,y)-height(x+12,y),ny=height(x,y-12)-height(x,y+12),l=Math.hypot(nx,ny,24),slope=Math.hypot(nx,ny)/24;
  // Restrained local material changes within the established Mars palette.
  const layer=Math.sin(raw[k]*2.2+Math.sin(x*.003)*.6)*Math.min(.035,slope*.09),sand=Math.max(0,1-slope*7);
  data.set([nx/l,ny/l,24/l,.65+layer+sand*.035,.405+layer*.8+sand*.036,.265+layer*.55+sand*.03],k*9+3);
 }
 return {info,vertices:data,indices,xs,ys,height};
}
export function buildRocks(height,route,samples){
 const out=[],rocks=[];let seed=48125;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const nearPath=(x,y)=>route.some(p=>Math.hypot(x-p.x,y-p.y)<45)||samples.some(p=>Math.hypot(x-p.x,y-p.y)<70);
 for(let i=0;i<2100;i++){
  const x=(3400+random()*6500)*WORLD_SCALE,y=(4200+random()*5600)*WORLD_SCALE,r=.7+random()**4*7;
  if(nearPath(x,y)||(Math.abs(x-8400*WORLD_SCALE)<65&&Math.abs(y-8800*WORLD_SCALE)<650)||Math.hypot(x-7400*WORLD_SCALE,y-7980*WORLD_SCALE)<180)continue;
  const z=height(x,y),h=r*(.35+random()*.7),phase=random()*6.28,ring=[];
  for(let a=0;a<7;a++){const t=a*Math.PI*2/7+phase,q=r*(.8+random()*.2);ring.push([x+Math.cos(t)*q,y+Math.sin(t)*q,z-.8]);}
  const cap=ring.map(([px,py],a)=>[x+(px-x)*(.5+random()*.25),y+(py-y)*(.5+random()*.25),z+h*(.7+random()*.3)]);
  for(let a=0;a<7;a++){const b=(a+1)%7,c=.84+random()*.17,color=[.51*c,.39*c,.29*c];triangle(out,ring[a],ring[b],cap[a],color);triangle(out,ring[b],cap[b],cap[a],color);if(a>0&&a<6)triangle(out,cap[0],cap[a],cap[a+1],[.57*c,.43*c,.32*c]);}
  if(r>2.3)rocks.push([x,y,r]);
 }
 // Authored paired outcrops make a short, optional line beside the wide route.
 // 18-unit clear gap, larger than the approved 13.3-unit enclosing diameter.
 const center=toGame(350,-495),heading=-Math.PI*.67,right=[Math.cos(heading),Math.sin(heading)];
 for(const sign of [-1,1]){const x=center.x+right[0]*31,y=center.y+right[1]*31,r=22,z=height(x,y),ring=[],top=[];
  for(let a=0;a<10;a++){const t=a*Math.PI/5;ring.push([x+Math.cos(t)*r,y+Math.sin(t)*r,z-3]);top.push([x+Math.cos(t)*r*.68,y+Math.sin(t)*r*.68,z+18+Math.sin(a*2)*2]);}
  for(let a=0;a<10;a++){const b=(a+1)%10;triangle(out,ring[a],ring[b],top[a],[.52,.39,.29]);triangle(out,ring[b],top[b],top[a],[.56,.42,.31]);if(a>0&&a<9)triangle(out,top[0],top[a],top[a+1],[.66,.50,.36]);}
  rocks.push([x,y,r]);
 }
 return {vertices:new Float32Array(out),rocks};
}

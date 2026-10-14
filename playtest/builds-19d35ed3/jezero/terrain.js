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
 const out=[],rocks=[],stats={types:{boulder:0,paver:0,slab:0,fin:0,layered:0},zones:{delta:0,transition:0,floor:0}};let seed=48125;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const clamp=v=>Math.max(0,Math.min(1,v)),local=(x,y,u,v,angle,z)=>{const px=x+u*Math.cos(angle)-v*Math.sin(angle),py=y+u*Math.sin(angle)+v*Math.cos(angle);return [px,py,height(px,py)+z];};
 const collide=(x,y,r)=>rocks.push([x,y,r]);
 const boulder=(x,y,length,width,rise,angle,shade=.56,contact=true)=>{const count=7,base=[],cap=[];for(let i=0;i<count;i++){const a=i*Math.PI*2/count,r=.82+random()*.2,u=Math.cos(a)*length*r/2,v=Math.sin(a)*width*r/2;base.push(local(x,y,u,v,angle,-.7));cap.push(local(x,y,u*(.48+random()*.26),v*(.48+random()*.26),angle,rise*(.68+random()*.31)));}for(let i=0;i<count;i++){const j=(i+1)%count,c=.86+random()*.14;triangle(out,base[i],base[j],cap[i],[shade*c,(shade-.12)*c,(shade-.23)*c]);triangle(out,base[j],cap[j],cap[i],[(shade+.03)*c,(shade-.09)*c,(shade-.20)*c]);if(i>0&&i<count-1)triangle(out,cap[0],cap[i],cap[i+1],[(shade+.07)*c,(shade-.05)*c,(shade-.17)*c]);}if(contact)collide(x,y,Math.max(length,width)*.46);};
 const paver=(x,y,length,width,angle,shade=.59)=>{const count=7,center=local(x,y,0,0,angle,.16),ring=[];for(let i=0;i<count;i++){const a=i*Math.PI*2/count,r=.78+random()*.22;ring.push(local(x,y,Math.cos(a)*length*r/2,Math.sin(a)*width*r/2,angle,.08+random()*.14));}for(let i=0;i<count;i++)triangle(out,center,ring[i],ring[(i+1)%count],[shade,.42,.29]);};
 const fin=(x,y,length,width,rise,angle,shade=.53)=>{const profile=[[-.5,.03],[-.46,.63],[-.22,1],[.18,.86],[.5,.56],[.44,.03]],front=[],back=[];for(const [u,z]of profile){front.push(local(x,y,u*length,-width/2,angle,z*rise));back.push(local(x,y,u*length,width/2,angle,z*rise));}for(let i=0;i<profile.length;i++){const j=(i+1)%profile.length;triangle(out,front[i],front[j],back[i],[shade,.39,.28]);triangle(out,front[j],back[j],back[i],[shade+.035,.415,.295]);}for(let i=1;i<profile.length-1;i++){triangle(out,front[0],front[i],front[i+1],[shade+.07,.45,.315]);triangle(out,back[0],back[i+1],back[i],[shade+.02,.405,.285]);}collide(x,y,Math.max(length,width)*.48);};
 const layered=(x,y,length,width,rise,angle)=>{const count=9,rings=[],levels=[[0,1,1],[.25,.91,.88],[.29,1.04,.96],[.55,.85,.78],[.59,.94,.84],[.82,.68,.64]];for(const [z,l,w]of levels){const ring=[];for(let i=0;i<count;i++){const a=i*Math.PI*2/count,r=.91+.08*Math.sin(seed*.001+i*2.3),offset=z>.27?.07*length:0;ring.push(local(x,y,Math.cos(a)*length*l*r/2+offset,Math.sin(a)*width*w*r/2,angle,z*rise));}rings.push(ring);}for(let k=0;k<rings.length-1;k++)for(let i=0;i<count;i++){const j=(i+1)%count,c=k%2?[.61,.445,.315]:[.535,.385,.275];triangle(out,rings[k][i],rings[k][j],rings[k+1][i],c);triangle(out,rings[k][j],rings[k+1][j],rings[k+1][i],c);}const top=rings.at(-1);for(let i=1;i<count-1;i++)triangle(out,top[0],top[i],top[i+1],[.64,.47,.33]);collide(x,y,Math.max(length,width)*.48);};
 const balanced=toGame(5,-88),nearRoute=(x,y,r)=>route.some(p=>Math.hypot(x-p.x,y-p.y)<Math.max(38,r+16)),nearSite=(x,y,r)=>samples.some(p=>Math.hypot(x-p.x,y-p.y)<Math.max(24,r+10));
 // Variable-density fields avoid both uniform pebble wallpaper and isolated prop piles.
 // Delta-side ground favors slabs, fins and eroded layers; the crater floor stays quieter.
 for(let i=0;i<3600;i++){
  const x=(3400+random()*6500)*WORLD_SCALE,y=(4200+random()*5600)*WORLD_SCALE,{east,north}=toMetres(x,y),delta=clamp((430-east)/920)*clamp((north+930)/1280),floor=east>470||north< -690,patch=.68+.32*Math.sin(east*.016+Math.sin(north*.011)*1.9);
  if(random()>(floor?.25:.48+delta*.30)*patch||Math.hypot(x-balanced.x,y-balanced.y)<115||(Math.abs(x-8400*WORLD_SCALE)<65&&Math.abs(y-8800*WORLD_SCALE)<650)||Math.hypot(x-7400*WORLD_SCALE,y-7980*WORLD_SCALE)<180)continue;
  const size=.65+random()**3.6*(floor?6:10),angle=random()*Math.PI,type=random(),large=size>2.4,blocked=large&&(nearRoute(x,y,size)||nearSite(x,y,size));
  const zone=floor?'floor':delta>.48?'delta':'transition';stats.zones[zone]++;
  if(type<.43){boulder(x,y,size*1.65,size*(.75+random()*.45),size*(.35+random()*.55),angle,floor?.49:.54,!blocked&&large);stats.types.boulder++;}
  else if(type<.64||blocked){paver(x,y,size*(1.2+random()),size*(.42+random()*.42),angle,floor?.54:.60);stats.types.paver++;}
  else if(type<.83){boulder(x,y,size*(1.8+random()*.8),size*(.5+random()*.45),size*(.20+random()*.35),angle,.57,!blocked&&large);stats.types.slab++;}
  else if(delta>.18&&type<.94&&size>1.1){fin(x,y,size*(1.45+random()),size*(.22+random()*.25),size*(.7+random()*.75),angle);stats.types.fin++;}
  else if(delta>.25&&size>1.3){layered(x,y,size*(1.7+random()),size*(.65+random()*.55),size*(.65+random()*.7),angle);stats.types.layered++;}
 else{paver(x,y,size*1.7,size*.7,angle);stats.types.paver++;}
 }
 // A sparse set of rover-scale anchor objects makes the delta read as eroded
 // rock country between discoveries. They are dispersed landmarks, not a
 // photograph reconstructed as one dense prop pile.
 const accents=[
  ['layered',-440,-235,34,19,16,.30],['fin',-335,-305,23,6,20,-.45],['slab',-265,-185,31,13,8,.70],
  ['layered',-215,-390,42,23,19,-.15],['fin',-105,-335,27,7,23,.42],['slab',-30,-465,38,15,9,-.62],
  ['layered',95,-350,36,21,17,.18],['fin',185,-470,25,6,22,-.20],['slab',285,-330,34,14,8,.55],
  ['layered',-470,105,39,22,18,-.35],['fin',-300,145,24,6,21,.12],['slab',-135,105,35,14,8,-.48]
 ];
 for(const [kind,east,north,length,width,rise,angle]of accents){const p=toGame(east,north);if(kind==='layered')layered(p.x,p.y,length,width,rise,angle);else if(kind==='fin')fin(p.x,p.y,length,width,rise,angle);else boulder(p.x,p.y,length,width,rise,angle,.56,true);stats.types[kind]++;stats.zones.delta++;}
 // Authored paired outcrops make a short, optional line beside the wide route.
 // 18-unit clear gap, larger than the approved 13.3-unit enclosing diameter.
 const center=toGame(350,-495),heading=-Math.PI*.67,right=[Math.cos(heading),Math.sin(heading)];
 for(const sign of [-1,1]){const x=center.x+right[0]*31,y=center.y+right[1]*31;sign<0?layered(x,y,43,25,20,heading+.2):boulder(x,y,42,25,18,heading-.15,.53,true);}
 return {vertices:new Float32Array(out),rocks,stats};
}

// Photo-led local forms around the known site-26 rover positions. Horizontal
// spacing is compressed with the world, while the rocks keep rover-scale
// dimensions. These are authored recognition geometry, not photogrammetry.
export function buildRidgeCluster(height){
 const out=[],rocks=[];
 const point=(east,north,z=0)=>{const p=toGame(east,north);return [p.x,p.y,height(p.x,p.y)+z];};
 const transform=(east,north,u,v,rotation,z)=>point(east+u*Math.cos(rotation)-v*Math.sin(rotation),north+u*Math.sin(rotation)+v*Math.cos(rotation),z*4);
 const ringFaces=(lower,upper,color)=>{for(let i=0;i<lower.length;i++){const j=(i+1)%lower.length;triangle(out,lower[i],lower[j],upper[i],color);triangle(out,lower[j],upper[j],upper[i],color);}};
 // Photos guide the material mix, but measured terrain supplies the hills.
 const plate=(east,north,length,width,lift,rotation,seed=0)=>{
  const count=7,center=point(east,north,lift*4),top=[];
  for(let i=0;i<count;i++){const a=i*Math.PI*2/count,r=.83+.13*Math.sin(seed+i*2.91);top.push(transform(east,north,Math.cos(a)*length*r/2,Math.sin(a)*width*r/2,rotation,lift+.025*Math.sin(i*1.8+seed)));}
  for(let i=0;i<count;i++)triangle(out,center,top[i],top[(i+1)%count],[.60+(seed%3)*.012,.43,.295]);
 };

 // Pale, fractured Wildcat/Hogwallow pavement remains flush with the ground.
 for(let i=0;i<18;i++){const a=i*2.399,r=5+(i%7)*2.4;plate(51+Math.cos(a)*r,-139+Math.sin(a)*r,1.0+(i%5)*.42,.55+(i%4)*.22,.035+(i%3)*.018,a*.31,i);}

 // The sol-466 camera position is known, but target range is not. Strong image
 // zoom argues against the earlier 17 m assumption; V2 authors 67.3 m instead.
 // A small stone rests on a broad, slightly sloped slab—not a pointed pedestal.
 const balanced=toGame(5,-88),rotation=.86,c=Math.cos(rotation),s=Math.sin(rotation),profile=[[-1.04,.04],[-.98,1.56],[-.74,2.18],[.72,2.27],[1.02,1.94],[.91,.04]],front=[],back=[];
 for(const [u,z]of profile){front.push(transform(5,-88,u,-.48,rotation,z));back.push(transform(5,-88,u,.48,rotation,z));}
 for(let i=0;i<profile.length;i++){const j=(i+1)%profile.length;triangle(out,front[i],front[j],back[i],[.57,.405,.285]);triangle(out,front[j],back[j],back[i],[.60,.43,.30]);}
 for(let i=1;i<profile.length-1;i++){triangle(out,front[0],front[i],front[i+1],[.625,.45,.315]);triangle(out,back[0],back[i+1],back[i],[.585,.42,.295]);}
 const capEast=5-.32*c,capNorth=-88-.32*s,capCenter=toGame(capEast,capNorth),ground=height(capCenter.x,capCenter.y);
 const capBottom=[],capBelly=[],capTop=[],count=7;
 for(let i=0;i<count;i++){const a=i*Math.PI*2/count+.13,rx=.42*(.9+.1*Math.sin(i*2.2)),ry=.34;capBottom.push([capCenter.x+Math.cos(a)*rx*HORIZONTAL_UNITS,capCenter.y-Math.sin(a)*ry*HORIZONTAL_UNITS,ground+2.29*4]);capBelly.push([capCenter.x+Math.cos(a)*rx*1.08*HORIZONTAL_UNITS,capCenter.y-Math.sin(a)*ry*1.08*HORIZONTAL_UNITS,ground+2.63*4]);capTop.push([capCenter.x+Math.cos(a)*rx*.72*HORIZONTAL_UNITS,capCenter.y-Math.sin(a)*ry*.72*HORIZONTAL_UNITS,ground+2.96*4]);}
 ringFaces(capBottom,capBelly,[.60,.43,.30]);ringFaces(capBelly,capTop,[.625,.45,.315]);for(let i=1;i<count-1;i++)triangle(out,capTop[0],capTop[i],capTop[i+1],[.67,.49,.34]);
 rocks.push([balanced.x,balanced.y,1.05*HORIZONTAL_UNITS]);
 return {vertices:new Float32Array(out),rocks,cameras:{hogwallow:toGame(64.351,-136.818),balanced:toGame(56.943,-130.786),pair:toGame(52.005,-139.457)},targets:{pair:toGame(62,-109),balanced:toGame(5,-88)}};
}

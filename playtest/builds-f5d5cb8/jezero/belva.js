import {toGame,toMetres} from './terrain.js';
import {WORLD_SCALE} from './scale.js';
import {triangle} from '../mars-renderer/geometry.js';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
const locate=(a,v)=>{let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m]<=v)lo=m;else hi=m;}return lo;};
// Cut along existing mesh axes, outside the old playable footprint.
export const upperSurface=(e,n)=>e>=-2700&&e<=600&&n>=-648&&n<=2350&&(e<=-660||n>=504);
export const belvaDiscovery={
 id:'echo-creek-belva',name:'Belva from Echo Creek',kind:'site',...toGame(-2023.61,1299.86),
 focus:toGame(-1450,1400),cameraReference:'39_650',
 fact:'An impact opened Belva crater through older rocks of Jezero\u2019s delta. The exposed layers let scientists look inside deposits that were already here before the crater formed.',
 detail:'From Echo Creek, look east across the broken rim and broad bowl. Some dipping layers may preserve an ancient sandbar. Perseverance photographed this view on sol 772, in April 2023; the crater reveals part of the delta\u2019s history, rather than being the ancient lake itself.',
 locationNote:'Echo Creek overlook on Belva\u2019s western rim',
 image:'./assets/belva-map.png',imageType:'map',imageAlt:'North-up elevation map of Belva with Echo Creek marked on its western side',
 imageDescription:'Elevation-derived relief map. The point marks the Echo Creek gameplay overlook; this is not a rover photograph.',
 imageCredit:'USGS Mars 2020 TRN HiRISE DTM soc_006; ASTRA relief map',
 source:'https://science.nasa.gov/resource/perseverance-takes-in-view-at-belva-crater/',
 researchDetail:'Camera-area anchor 39_650, sol 770, precedes the sol-772 mosaic. Gameplay placement and east-northeast focus are authored, not a recovered optical pose. Hero photograph remains unselected.',
};

export async function loadBelva(local,oldGround){
 const responses=await Promise.all(['belva-terrain.json','belva-elevations.f32'].map(p=>fetch(new URL('./assets/'+p,import.meta.url))));
 if(responses.some(r=>!r.ok))throw Error('The upper delta could not load. Reload to try again.');
 const info=await responses[0].json(),raw=new Float32Array(await responses[1].arrayBuffer()),c=info.crop;
 if(raw.length!==c.columns*c.rows||raw.some(v=>!Number.isFinite(v)||v< -10000))throw Error('Invalid upper-delta elevation coverage');
 const measured=(e,n)=>{const x=clamp((e-c.eastMin)/c.step,0,c.columns-1.000001),y=clamp((c.northMax-n)/c.step,0,c.rows-1.000001),i=Math.floor(x),j=Math.floor(y),u=x-i,v=y-j,k=j*c.columns;return (raw[k+i]*(1-u)+raw[k+i+1]*u)*(1-v)+(raw[k+c.columns+i]*(1-u)+raw[k+c.columns+i+1]*u)*v;};
 // Match 80% horizontal scale with 80% vertical relief around a fixed rim
 // datum inside the protected landmark; blend only outside that envelope.
 const shapeWeight=(e,n)=>smooth(Math.min(e+2450,-600-e,n-370,2300-n)/250);
 const shaped=(e,n)=>{const z=measured(e,n);return z+(WORLD_SCALE-1)*(z+2420)*shapeWeight(e,n);};
 const source=(e,n)=>{
  const p=toGame(e,n),old=oldGround(p.x,p.y),z=(shaped(e,n)+2565)*4;
  // The retained mesh is immediately south and east of this L-shaped tile set.
  const edge=Math.min(n+648,600-e,Math.hypot(Math.max(0,-660-e),Math.max(0,n-504)));
  return old+(z-old)*smooth(edge/100);
 };
 const axis=(a,b,extras=[])=>[...new Set([a,b,...Array.from({length:Math.floor((b-a)/10)},(_,i)=>a+(i+1)*10).filter(v=>v<b),...extras.filter(v=>v>a&&v<b)])].sort((a,b)=>a-b);
 const upperNorths=axis(504,2350).reverse();
 const grids=[
  {easts:axis(-2700,-660,local.info.eastMetres),norths:[...upperNorths,...local.info.northMetres.filter(n=>n<504&&n>=-648)]},
  {easts:local.info.eastMetres.filter(e=>e>=-660&&e<=600),norths:upperNorths},
 ];
 const tiles=[];
 for(const {easts,norths}of grids)for(let row=0;row<norths.length-1;row+=96)for(let col=0;col<easts.length-1;col+=96){
  const es=easts.slice(col,col+97),ns=norths.slice(row,row+97),xs=es.map(e=>Math.fround(toGame(e,0).x)),ys=ns.map(n=>Math.fround(toGame(0,n).y));
  const vertices=new Float32Array(xs.length*ys.length*9),indices=[];
  for(let j=0;j<ys.length;j++)for(let i=0;i<xs.length;i++){
   const e=es[i],n=ns[j],z=source(e,n),dx=source(e-2,n)-source(e+2,n),dy=source(e,n+2)-source(e,n-2),length=Math.hypot(dx,dy,12.8),slope=Math.hypot(dx,dy)/12.8;
   const sand=clamp(1-slope*7),strata=Math.sin((z/4-2565)*2.2)*Math.min(.025,slope*.07);
   vertices.set([xs[i],ys[j],z,dx/length,dy/length,12.8/length,.65+sand*.035+strata,.405+sand*.036+strata*.8,.265+sand*.03+strata*.55],(j*xs.length+i)*9);
  }
  for(let j=0;j<ys.length-1;j++)for(let i=0;i<xs.length-1;i++)if(upperSurface((es[i]+es[i+1])/2,(ns[j]+ns[j+1])/2)){const a=j*xs.length+i,b=a+1,d=a+xs.length+1;indices.push(a,b,d-1,b,d,d-1);}
  if(!indices.length)continue;
  const height=(x,y)=>{const i=locate(xs,x),j=locate(ys,y),u=clamp((x-xs[i])/(xs[i+1]-xs[i])),v=clamp((y-ys[j])/(ys[j+1]-ys[j])),a=j*xs.length+i,b=a+1,d=a+xs.length+1,z=k=>vertices[k*9+2];return u+v<=1?z(a)+(z(b)-z(a))*u+(z(d-1)-z(a))*v:z(d)+(z(d-1)-z(d))*(1-u)+(z(b)-z(d))*(1-v);};
  tiles.push({vertices,indices:new Uint16Array(indices),height,minX:xs[0],maxX:xs.at(-1),minY:ys[0],maxY:ys.at(-1)});
 }
 const height=(x,y)=>{const {east:e,north:n}=toMetres(x,y);if(!upperSurface(e,n))return oldGround(x,y);const t=tiles.find(t=>x>=t.minX-.001&&x<=t.maxX+.001&&y>=t.minY-.001&&y<=t.maxY+.001);return t?t.height(x,y):source(e,n);};
 return {info,tiles,height,source,measured,shapeWeight,spine:info.route.map(([e,n])=>toGame(e,n))};
}

export function upperRocks(height,route){
 let seed=772;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const vertices=[],rocks=[];
 for(let k=0;k<1900;k++){
  const e=-2420+random()*2800,n=-600+random()*2700;
  if(!upperSurface(e,n))continue;
  const p=toGame(e,n),size=1+random()**3*22,angle=random()*Math.PI,rise=size*(.1+random()*.25);
  if(route.some(q=>Math.hypot(p.x-q.x,p.y-q.y)<85)||Math.hypot(p.x-belvaDiscovery.x,p.y-belvaDiscovery.y)<100)continue;
  const lower=[],top=[],base=height(p.x,p.y);
  for(let i=0;i<6;i++){
   const a=i*Math.PI/3,u=Math.cos(a)*size/2,v=Math.sin(a)*size*(.2+random()*.15),x=p.x+u*Math.cos(angle)-v*Math.sin(angle),y=p.y+u*Math.sin(angle)+v*Math.cos(angle);
   lower.push([x,y,height(x,y)-.3]);top.push([x,y,Math.max(base,height(x,y))+rise*(.8+random()*.2)]);
  }
  const shade=.53+random()*.07,color=[shade,shade-.15,shade-.26];
  for(let i=0;i<6;i++){const j=(i+1)%6;triangle(vertices,lower[i],lower[j],top[i],color);triangle(vertices,lower[j],top[j],top[i],color);if(i>0&&i<5)triangle(vertices,top[0],top[i],top[i+1],color.map(v=>v+.04));}
  if(size>5)rocks.push([p.x,p.y,size*.5]);
 }
 return {vertices:new Float32Array(vertices),rocks};
}

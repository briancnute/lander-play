import {delta} from './regions.mjs';
// Presentation only. Geometry stays inside the simulation's existing obstacle footprints.
import {mesa,rocks,samples,ground,inside} from './sim.mjs';
export const fract=x=>x-Math.floor(x);
export const noise=(x,y)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453);
export const rgb=(base,k=1)=>`rgb(${base.map(v=>Math.round(Math.max(0,Math.min(255,v*k))))})`;
// Broad, soft-edged geological regions. Color only: elevation/contact stay in sim.mjs.
export function sedimentColor(x,y){
 if(x>1900){const channel=420+Math.sin((x-2100)*.006)*60,k=Math.exp(-(((y-channel)/52)**2)),n=Math.sin(x*.023+y*.017)*3;return [164+n+k*12,103+n+k*14,66+n+k*10];}

 const patch=(cx,cy,rx,ry)=>Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2)*2);
 const channel=patch(350,452,100,175),layers=patch(614,511,115,65),wind=patch(960,189,135,125);
 const dunes=patch(943,604,120,70)+patch(228,164,115,65);
 const variation=Math.sin(x*.012+y*.019)*2+Math.cos(x*.021-y*.01)*1.3;
 return [157+variation+channel*9+layers*22-wind*15+dunes*9,
 88+variation*.6+channel*10+layers*20-wind*5+dunes*9,
 56+variation*.4+channel*9+layers*17-wind*2+dunes*6];
}
export function buildScenery(){
 const faces=[],stains=[];
 const face=(vertices,base)=>{const [a,b,c]=vertices,u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const len=Math.hypot(...n)||1;n=n.map(v=>v/len);if(vertices.length>4)n=[0,0,1];const light=.83+Math.max(0,n[0]*-.45+n[1]*-.6+n[2]*.66)*.35;faces.push({vertices,base,normal:n,color:rgb(base,light),x:vertices.reduce((s,p)=>s+p[0],0)/vertices.length,y:vertices.reduce((s,p)=>s+p[1],0)/vertices.length});};
 // Irregular edges, sediment bands and eroded shoulders, on the approved central obstacle.
 const edge=[];mesa.forEach((a,i)=>{const b=mesa[(i+1)%mesa.length];for(let j=0;j<4;j++){const t=j/4;edge.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}});
 const rings=Array.from({length:10},(_,layer)=>edge.map(([x,y],i)=>{const k=layer===0?1:1-layer*.035-noise(i,layer)*.016-Math.pow(noise(i,90),3)*.055;const z=[0,1.2,3.7,4.5,8.1,9.7,13.3,16,17.4,22.5][layer]+(layer===0?0:Math.sin(i*.9)*1.1+noise(i,4)*1.4);return [565+(x-565)*k,403+(y-403)*k,ground(x,y)+z];}));
 for(let l=0;l<rings.length-1;l++)for(let i=0;i<edge.length;i++){const j=(i+1)%edge.length;face([rings[l][i],rings[l][j],rings[l+1][j],rings[l+1][i]],[[158,95,61],[165,105,70],[174,116,79],[154,94,63],[181,126,86]][l%5]);}
 face(rings.at(-1).slice().reverse(),[190,137,96]);
 // Flat-topped broken rocks with shoulders, rather than pointed pyramids.
 rocks.forEach(([x,y,r],id)=>{const rings=[1,.82,.48].map((k,l)=>Array.from({length:9},(_,i)=>{const a=i*Math.PI*2/9,rr=r*k*(.88+noise(i,id)*.12);return [x+Math.cos(a)*rr+(l? r*.07:0),y+Math.sin(a)*rr,ground(x,y)+l*r*.28+(l?noise(i,id+9)*r*.14:0)];}));for(let l=0;l<2;l++)for(let i=0;i<9;i++)face([rings[l][i],rings[l][(i+1)%9],rings[l+1][(i+1)%9],rings[l+1][i]],[128+id%3*9,83+id%3*6,60]);face(rings[2].slice().reverse(),[167,121,86]);});
 // Ground-level sediment fans and fractures remain fully traversable.
 const strip=(points,width,color)=>{for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],d=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/d*width,ny=(b[0]-a[0])/d*width;stains.push({vertices:[[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]].map(([x,y])=>[x,y,ground(x,y)+.035]),color});}};
 // Braided dry channel: branches converge naturally at the interior sample pocket.
 for(let branch=0;branch<7;branch++){
  const points=Array.from({length:27},(_,i)=>{const t=i/26,y=320+t*245;
   return [352+(branch-3)*(5+Math.abs(y-452)*.22)+Math.sin(t*11+branch*.8)*9+Math.sin(t*22+branch)*2,y];});
  strip(points,1.8,'#624a3625');strip(points,.45,'#dab79124');
 }
 // Low, exposed sediment plates: flat ground details, never uncollidable boulders.
 const plate=(x,y,r,color,id)=>{const vertices=Array.from({length:6},(_,i)=>{
  const a=i*Math.PI/3,k=r*(.72+noise(i,id)*.28);return [x+Math.cos(a)*k,y+Math.sin(a)*k*.7];
 });if(vertices.some(([x,y])=>inside(x,y)))return;
 stains.push({vertices:vertices.map(([x,y])=>[x,y,ground(x,y)+.045]),color});
 // Fine dark seam on two edges, not a dark outline around every tile.
 strip(vertices.slice(0,3),.23,'#65473555');};
 // Irregular adjoining fracture cells, clipped halfway between scattered seed points.
 // Built once, with color fading into surrounding sand; no rectangular patch boundary.
 const seeds=Array.from({length:100},(_,i)=>[519+noise(i,71)*210,465+noise(i,81)*105]);
 for(const [cx,cy] of seeds){
  const fade=Math.max(0,1-((cx-621)/97)**2-((cy-511)/47)**2);if(fade===0)continue;
  let vertices=[[510,458],[740,458],[740,577],[510,577]];
  for(const [ox,oy] of seeds){if(ox===cx&&oy===cy)continue;const nx=ox-cx,ny=oy-cy,k=(ox*ox+oy*oy-cx*cx-cy*cy)/2,clipped=[];
   for(let i=0;i<vertices.length;i++){const a=vertices[i],b=vertices[(i+1)%vertices.length],da=a[0]*nx+a[1]*ny-k,db=b[0]*nx+b[1]*ny-k;
    if(da<=0)clipped.push(a);if((da<=0)!==(db<=0)){const t=da/(da-db);clipped.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}}
   vertices=clipped;
  }
  if(vertices.length<3||vertices.some(([x,y])=>inside(x,y)))continue;
  const inset=vertices.map(([x,y])=>[cx+(x-cx)*.97,cy+(y-cy)*.97]);
  stains.push({vertices:inset.map(([x,y])=>[x,y,ground(x,y)+.045]),color:`rgba(213,181,148,${fade*.24})`});
  strip(inset.slice(0,3),.18,`rgba(101,71,53,${fade*.3})`);
 }
 // Polygon fragments in the channel are small and scattered, leaving sand between them.
 for(let i=0;i<105;i++){
  const x=305+noise(i,14)*96,y=354+noise(i,21)*194;
  plate(x,y,2+noise(i,16)*4,'#aa896748',i+200);
 }
 // Dark wind-scoured pavement at the outer overlook, with long pale abrasion streaks.
 for(let j=0;j<28;j++){
  const x=889+noise(j,11)*170,y=92+noise(j,25)*180;
  const points=Array.from({length:8},(_,i)=>[x+i*3.5,y+i*1.6+Math.sin(i*.4+j)*.7]);
  strip(points,1.3,'#d0aa7a26');strip(points,.35,'#64493635');
 }
 for(let i=0;i<95;i++)plate(900+noise(i,41)*151,104+noise(i,42)*172,2+noise(i,43)*5,'#624d4035',i+400);
 // Wind ripples wrap the two existing natural jump hills, with a crest highlight.
 for(const [cx,cy] of [[943,604],[228,164]]){
  for(let j=-7;j<=7;j++){
   const half=45+noise(j,cx)*40;const points=Array.from({length:25},(_,i)=>{const x=cx-half+i*half/12;
    return [x,cy+j*6+Math.sin(i*.19)*6];});
   strip(points,.45,'#e2b98a42');
  }
  strip(Array.from({length:25},(_,i)=>[cx-86+i*7.2,cy+Math.sin(i*.19)*3]),.8,'#edc99b50');
 }
 for(let id=0;id<3;id++){const p=samples[id];for(let j=0;j<48;j++){const a=noise(j,id)*Math.PI*2,r=4+noise(j,id+8)*23,x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r;const size=.5+noise(j,7)*2;stains.push({vertices:[[x-size,y],[x,y-size*.6],[x+size,y+.3],[x+.4,y+size*.5]].map(([x,y])=>[x,y,ground(x,y)+.04]),color:['#d4b08c99','#5c3e2e88','#c3a08299'][id]});}}
 if(delta){
  for(const [index,poly] of delta.mesas.entries()){
   const cx=poly.reduce((a,p)=>a+p[0],0)/poly.length,cy=poly.reduce((a,p)=>a+p[1],0)/poly.length;
   const rings=Array.from({length:7},(_,j)=>poly.map(([x,y])=>[cx+(x-cx)*(1-j*.045),cy+(y-cy)*(1-j*.045),ground(x,y)+j*(index===0?5:4)]));
   for(let j=0;j<6;j++)for(let i=0;i<poly.length;i++){const k=(i+1)%poly.length;face([rings[j][i],rings[j][k],rings[j+1][k],rings[j+1][i]],[170+j%2*15,112+j%2*13,76+j%2*12]);}face(rings[6].slice().reverse(),[193,143,99]);
  }
  for(let branch=0;branch<5;branch++)for(let i=0;i<100;i++){
   const x=2040+i*11,curve=x=>420+Math.sin((x-2100)*.006+branch*.23)*60+(branch-2)*Math.max(0,x-2250)*.22+Math.sin(x*.025+branch)*7;
   strip([[x,curve(x)],[x+11,curve(x+11)]],1.2,'#e2bc8c18');
   strip([[x,curve(x)+5],[x+11,curve(x+11)+5]],.4,'#71533c18');
  }
  for(const [x,y,r]of delta.rocks){const ring=Array.from({length:7},(_,i)=>{const a=i*Math.PI*2/7;return [x+Math.cos(a)*r*.9,y+Math.sin(a)*r*.9,ground(x,y)]});const top=ring.map(p=>[x+(p[0]-x)*.55,y+(p[1]-y)*.55,p[2]+r*.65]);for(let i=0;i<7;i++)face([ring[i],ring[(i+1)%7],top[(i+1)%7],top[i]],[138,98,71]);face(top.slice().reverse(),[171,128,90]);}
 }
 return {faces,stains};
}

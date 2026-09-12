// Presentation only. Geometry stays inside the simulation's existing obstacle footprints.
import {mesa,rocks,samples,ground} from './sim.mjs';
export const fract=x=>x-Math.floor(x);
export const noise=(x,y)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453);
export const rgb=(base,k=1)=>`rgb(${base.map(v=>Math.round(Math.max(0,Math.min(255,v*k))))})`;
export function buildScenery(){
 const faces=[],stains=[];
 const face=(vertices,base)=>{const [a,b,c]=vertices,u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const len=Math.hypot(...n)||1;n=n.map(v=>v/len);const light=.83+Math.max(0,n[0]*-.45+n[1]*-.6+n[2]*.66)*.35;faces.push({vertices,color:rgb(base,light),x:vertices.reduce((s,p)=>s+p[0],0)/vertices.length,y:vertices.reduce((s,p)=>s+p[1],0)/vertices.length});};
 // Irregular edges, sediment bands and eroded shoulders, on the approved central obstacle.
 const edge=[];mesa.forEach((a,i)=>{const b=mesa[(i+1)%mesa.length];for(let j=0;j<4;j++){const t=j/4;edge.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}});
 const rings=Array.from({length:10},(_,layer)=>edge.map(([x,y],i)=>{const k=layer===0?1:1-layer*.035-noise(i,layer)*.016;const z=[0,1.2,3.7,4.5,8.1,9.7,13.3,16,17.4,22.5][layer]+(layer===0?0:Math.sin(i*.9)*1.1+noise(i,4)*1.4);return [565+(x-565)*k,403+(y-403)*k,ground(x,y)+z];}));
 for(let l=0;l<rings.length-1;l++)for(let i=0;i<edge.length;i++){const j=(i+1)%edge.length;face([rings[l][i],rings[l][j],rings[l+1][j],rings[l+1][i]],[[158,95,61],[165,105,70],[174,116,79],[154,94,63],[181,126,86]][l%5]);}
 face(rings.at(-1).slice().reverse(),[190,137,96]);
 // Flat-topped broken rocks with shoulders, rather than pointed pyramids.
 rocks.forEach(([x,y,r],id)=>{const rings=[1,.82,.48].map((k,l)=>Array.from({length:9},(_,i)=>{const a=i*Math.PI*2/9,rr=r*k*(.88+noise(i,id)*.12);return [x+Math.cos(a)*rr+(l? r*.07:0),y+Math.sin(a)*rr,ground(x,y)+l*r*.28+(l?noise(i,id+9)*r*.14:0)];}));for(let l=0;l<2;l++)for(let i=0;i<9;i++)face([rings[l][i],rings[l][(i+1)%9],rings[l+1][(i+1)%9],rings[l+1][i]],[136+id%3*7,91+id%3*4,65]);face(rings[2].slice().reverse(),[167,121,86]);});
 // Ground-level sediment fans and fractures remain fully traversable.
 const strip=(points,width,color)=>{for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],d=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/d*width,ny=(b[0]-a[0])/d*width;stains.push({vertices:[[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]].map(([x,y])=>[x,y,ground(x,y)+.035]),color});}};
 for(let branch=0;branch<6;branch++){const points=Array.from({length:20},(_,i)=>{const y=320+i*11;return [330+Math.sin(i*.18+branch*.38)*26+(i/19)*branch*10,y];});strip(points,3+branch*.5,'#79533b24');strip(points,1,'#ca986632');}
 // Wind ripples follow the actual approved dune, with no artificial ramp surface.
 for(let j=0;j<13;j++){const points=Array.from({length:22},(_,i)=>{const x=862+i*7,y=552+j*7+Math.sin(i*.18)*8;return [x,y];});strip(points,.32,'#d3a47645');}
 for(let id=0;id<3;id++){const p=samples[id];for(let j=0;j<48;j++){const a=noise(j,id)*Math.PI*2,r=4+noise(j,id+8)*23,x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r;const size=.5+noise(j,7)*2;stains.push({vertices:[[x-size,y],[x,y-size*.6],[x+size,y+.3],[x+.4,y+size*.5]].map(([x,y])=>[x,y,ground(x,y)+.04]),color:['#d4b08c99','#5c3e2e88','#c3a08299'][id]});}}
 return {faces,stains};
}

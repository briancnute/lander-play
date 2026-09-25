import {ground} from './ground.js';
import {triangle} from './triangle.js';
export {triangle} from './triangle.js';
const {buildScenery}=await import(/* @vite-ignore */ new URL('../../../extras/expedition/scenery.js',import.meta.url).href);
// A single rectangular grid with gradually spaced axes: every edge is shared.
// Dense over the delta study area; wider spacing outside it. No overlapping LOD layers.
export function axis(center,min,max){const a=[min];while(a.at(-1)<max){const x=a.at(-1),d=Math.abs(x-center),step=d<1000?16:d<1900?48:128;a.push(Math.min(max,x+step));}return a;}
export function terrain(){const xs=axis(2650,-1500,8000),ys=axis(300,-4500,5200),vertices=[],indices=[];
 for(const y of ys)for(const x of xs){const z=ground(x,y),nx=ground(x-3,y)-ground(x+3,y),ny=ground(x,y-3)-ground(x,y+3),l=Math.hypot(nx,ny,6);vertices.push(x,y,z,nx/l,ny/l,6/l,.65,.405,.265);}
 for(let y=0;y<ys.length-1;y++)for(let x=0;x<xs.length-1;x++){const a=y*xs.length+x,b=a+1,c=a+xs.length,d=c+1;indices.push(a,b,c,b,d,c);}
 if(vertices.length/9>65535)throw Error('Terrain exceeds WebGL1 index budget');const data=new Float32Array(vertices);
 const height=(x,y)=>{const find=(a,v)=>{let lo=0,hi=a.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(a[m]<=v)lo=m;else hi=m;}return lo;},ix=find(xs,x),iy=find(ys,y),u=Math.max(0,Math.min(1,(x-xs[ix])/(xs[ix+1]-xs[ix]))),v=Math.max(0,Math.min(1,(y-ys[iy])/(ys[iy+1]-ys[iy]))),a=iy*xs.length+ix,z=i=>data[i*9+2],b=a+1,c=a+xs.length,d=c+1;return u+v<=1?z(a)+(z(b)-z(a))*u+(z(c)-z(a))*v:z(d)+(z(c)-z(d))*(1-u)+(z(b)-z(d))*(1-v);};
 return {vertices:data,indices:new Uint16Array(indices),xs,ys,height};}
export function box(out,x,y,z,w,d,h,color){const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];for(const [a,b,c,d]of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]){triangle(out,p[a],p[b],p[c],color);triangle(out,p[a],p[c],p[d],color);}}
export function outcrops(){const out=[];for(const f of buildScenery().faces){const base=f.base??[164,109,74],color=base.map((v,i)=>((v*.25+[165,111,77][i]*.75)/255));for(let i=1;i<f.vertices.length-1;i++)triangle(out,f.vertices[0],f.vertices[i],f.vertices[i+1],color,f.normal);}return new Float32Array(out);}
export function roverBody(){const out=[],metal=[.65,.64,.53],tire=[.12,.15,.14];box(out,-4.6,-6,2,9.2,12,3,metal);box(out,-6,-7,5,12,14,.35,[.12,.28,.34]);
 for(let x=-5;x<=5;x+=2)box(out,x,-7,5.36,.09,14,.03,[.44,.57,.57]);for(let y=-6;y<=6;y+=2)box(out,-6,y,5.36,12,.09,.03,[.44,.57,.57]);
 box(out,-.4,3,5.4,.8,.8,3.4,metal);box(out,-1.5,2.7,8.6,3,1.4,1.2,[.72,.7,.6]);box(out,-.9,4.11,8.9,.6,.06,.5,[.06,.12,.13]);
 for(const x of [-6.3,6.3])for(const y of [-5.8,0,5.8])box(out,Math.min(x,0),y-.22,2.8,Math.abs(x),.44,.44,metal);
 for(let i=0;i<out.length;i+=9)for(let j=0;j<3;j++)out[i+j]*=.6;return new Float32Array(out);}
export const wheelPivots=[-3.78,3.78].flatMap(x=>[-3.48,0,3.48].map(y=>[x,y]));
export function roverWheel(){const out=[],tire=[.12,.15,.14];
 for(let i=0;i<12;i++){const a=i*Math.PI/6,b=(i+1)*Math.PI/6,p=t=>[Math.sin(t)*1.38,Math.cos(t)*1.38+1.38],pa=p(a),pb=p(b),v=[[-.6,pa[0],pa[1]],[.6,pa[0],pa[1]],[.6,pb[0],pb[1]],[-.6,pb[0],pb[1]]];triangle(out,v[0],v[1],v[2],tire);triangle(out,v[0],v[2],v[3],tire);for(const side of [-1,1])triangle(out,[side*.6,0,1.38],[side*.6,pa[0],pa[1]],[side*.6,pb[0],pb[1]],[.25,.29,.26]);}
 return new Float32Array(out);}
// Combined neutral model remains available for geometric enclosure checks.
export function rover(){const out=[...roverBody()],wheel=roverWheel();for(const [x,y]of wheelPivots)for(let i=0;i<wheel.length;i+=9)out.push(wheel[i]+x,wheel[i+1]+y,...wheel.slice(i+2,i+9));return new Float32Array(out);}
export function cell(){const out=[],top=[0,0,7],bottom=[0,0,0],ring=[[4,0,3],[0,4,3],[-4,0,3],[0,-4,3]];for(let i=0;i<4;i++){triangle(out,top,ring[i],ring[(i+1)%4],[.42,.85,.74]);triangle(out,bottom,ring[(i+1)%4],ring[i],[.25,.65,.56]);}return new Float32Array(out);}

export function shadow(){const out=[];for(let i=0;i<24;i++){const a=i*Math.PI/12,b=(i+1)*Math.PI/12;triangle(out,[0,0,.08],[Math.cos(a)*6,Math.sin(a)*8,.08],[Math.cos(b)*6,Math.sin(b)*8,.08],[.12,.10,.09]);}return new Float32Array(out);}

export function brakeLights(){const out=[];for(const x of [-2.6,1.8])box(out,x,-3.7,2.15,.8,.16,.45,[.25,.025,.015]);return new Float32Array(out);}

export function headLights(){const out=[];for(const x of [-2.1,1.5])box(out,x,3.65,2.3,.6,.12,.42,[.28,.29,.24]);return new Float32Array(out);}

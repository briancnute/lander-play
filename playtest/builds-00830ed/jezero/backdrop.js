import {WORLD_SCALE,HORIZONTAL_UNITS,MAP_SIZE} from './scale.js';
// Measured scenery only. The driving/camera surface remains terrain.js.
import {toGame,toMetres} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
function sample(a,size,x,y){x=Math.max(0,Math.min(size-1.000001,x));y=Math.max(0,Math.min(a.length/size-1.000001,y));const i=Math.floor(x),j=Math.floor(y),u=x-i,v=y-j,k=j*size+i;return (a[k]*(1-u)+a[k+1]*u)*(1-v)+(a[k+size]*(1-u)+a[k+size+1]*u)*v;}
function grid(xs,ns,height,include=()=>true){
 const vertices=new Float32Array(xs.length*ns.length*9),indices=[];
 if(vertices.length/9>65535)throw Error('Scenery mesh exceeds portable index limit');
 for(let j=0;j<ns.length;j++)for(let i=0;i<xs.length;i++){const e=xs[i],n=ns[j],p=toGame(e,n),dx=height(e-2,n)-height(e+2,n),dy=height(e,n+2)-height(e,n-2),l=Math.hypot(dx,dy,4*WORLD_SCALE);vertices.set([p.x,p.y,(height(e,n)+2565)*4,dx/l,dy/l,4*WORLD_SCALE/l,.65,.405,.265],(j*xs.length+i)*9);}
 for(let j=0;j<ns.length-1;j++)for(let i=0;i<xs.length-1;i++){if(!include((xs[i]+xs[i+1])/2,(ns[j]+ns[j+1])/2))continue;const a=j*xs.length+i,b=a+1,c=a+xs.length,d=c+1;indices.push(a,b,c,b,d,c);}
 return {vertices,indices:new Uint16Array(indices)};
}
export async function loadBackdrop(local){
 const paths=['backdrop.json','backdrop.f32','kodiak-relief.f32'];
 const responses=await Promise.all(paths.map(p=>fetch(new URL('./assets/'+p,import.meta.url))));
 if(responses.some(r=>!r.ok))throw Error('The Jezero skyline could not load. Reload to try again.');
 const info=await responses[0].json(),rim=new Float32Array(await responses[1].arrayBuffer()),kodiak=new Float32Array(await responses[2].arrayBuffer());
 if(rim.length!==201*201||kodiak.length!==121*97||!rim.every(v=>Number.isFinite(v)&&v>-10000)||!kodiak.every(v=>Number.isFinite(v)&&v>-10000))throw Error('Invalid Jezero scenery data');
 const localHeight=(e,n)=>{const p=toGame(e,n);return local.height(p.x,p.y)/4-2565;};
 const rimHeight=(e,n)=>sample(rim,201,(e+10000)/100,(10000-n)/100);
 // Blend the two measured products only in a 300 m collar outside the old crop.
 // No global height offset or invented mountain; horizontal compression is applied by toGame.
 const joinedHeight=(e,n)=>{const radius=Math.max(Math.abs(e),Math.abs(n));if(radius<=1500)return localHeight(e,n);const be=e*1500/radius,bn=n*1500/radius,t=Math.max(0,Math.min(1,(radius-1500)/300));return rimHeight(e,n)+(localHeight(be,bn)-rimHeight(be,bn))*(1-t);};
 const axis=Array.from({length:201},(_,i)=>-10000+i*100);
 
 const inKodiak=(e,n)=>e>=-100&&e<=500&&n<=-1020&&n>=-1500;
 const detailHeight=(e,n)=>{const edge=Math.min(e+100,500-e,-1020-n,n+1500),t=Math.max(0,Math.min(1,edge/15));return localHeight(e,n)*(1-t)+sample(kodiak,121,(e+100)/5,(-1020-n)/5)*t;};
 const xs=[...new Set([...Array.from({length:121},(_,i)=>-100+i*5),...local.info.eastMetres.filter(e=>e>=-100&&e<=500)])].sort((a,b)=>a-b),ns=Array.from({length:97},(_,i)=>-1020-i*5);
 const detail=grid(xs,ns,detailHeight);
 // The local crop fills the hole; all scenery shares the same depth range.
 const backdrop=grid(axis,[...axis].reverse(),joinedHeight,(e,n)=>Math.max(Math.abs(e),Math.abs(n))>1500);
 // Replace only the inaccessible Kodiak rectangle in the visual mesh.
 const visualIndices=[];for(let i=0;i<local.indices.length;i+=3){const ids=[local.indices[i],local.indices[i+1],local.indices[i+2]],e=ids.reduce((s,k)=>s+local.vertices[k*9]/HORIZONTAL_UNITS-1500,0)/3,n=ids.reduce((s,k)=>s+1500-local.vertices[k*9+1]/HORIZONTAL_UNITS,0)/3;if(!inKodiak(e,n))visualIndices.push(...ids);}
 // Edge skirts close sub-grid cracks between the coarse distant and local meshes.
 const skirt=[];const edges=[local.xs.map(x=>[x,0]),local.xs.map(x=>[x,MAP_SIZE]),local.ys.map(y=>[0,y]),local.ys.map(y=>[MAP_SIZE,y])];
 for(const edge of edges)for(let i=1;i<edge.length;i++){const a=[...edge[i-1],local.height(...edge[i-1])],b=[...edge[i],local.height(...edge[i])],c=[b[0],b[1],b[2]-160],d=[a[0],a[1],a[2]-160];triangle(skirt,a,b,c,[.65,.405,.265]);triangle(skirt,a,c,d,[.65,.405,.265]);}
 return {backdrop:{...backdrop,info},details:[detail,{vertices:new Float32Array(skirt)}],visualIndices:new Uint16Array(visualIndices),visualGround:(x,y)=>{const {east:e,north:n}=toMetres(x,y);return inKodiak(e,n)?(detailHeight(e,n)+2565)*4:local.height(x,y);}};
}

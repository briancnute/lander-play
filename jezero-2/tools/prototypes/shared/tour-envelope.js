// Buffered union of BOTH routes. Fill enclosed pockets, never a world-sized hull.
// The same cells drive recovery and the map/ground outline.
export function createTourEnvelope(tour,segments,{cell=80,padding=640}={}){
 const b=tour.bounds,nx=Math.ceil((b.width-b.minX)/cell),ny=Math.ceil((b.maxY-b.minY)/cell),mask=new Uint8Array(nx*ny);
 const stamp=p=>{const x=(p.x-b.minX)/cell,y=(p.y-b.minY)/cell,r=padding/cell+.75;
  for(let j=Math.max(0,Math.floor(y-r));j<Math.min(ny,Math.ceil(y+r));j++)for(let i=Math.max(0,Math.floor(x-r));i<Math.min(nx,Math.ceil(x+r));i++)if(Math.hypot(i+.5-x,j+.5-y)<=r)mask[j*nx+i]=1;};
 for(const line of [...tour.legs,...segments]){const ps=line.points;for(let i=0;i<ps.length;i++){const a=ps[Math.max(0,i-1)],p=ps[i],n=Math.max(1,Math.ceil(Math.hypot(p.x-a.x,p.y-a.y)/cell));for(let k=1;k<=n;k++)stamp({x:a.x+(p.x-a.x)*k/n,y:a.y+(p.y-a.y)*k/n});}}
 const outside=new Uint8Array(mask.length),queue=[];const add=k=>{if(!mask[k]&&!outside[k]){outside[k]=1;queue.push(k);}};
 for(let x=0;x<nx;x++){add(x);add((ny-1)*nx+x);}for(let y=0;y<ny;y++){add(y*nx);add(y*nx+nx-1);}
 for(let q=0;q<queue.length;q++){const k=queue[q],x=k%nx,y=Math.floor(k/nx);if(x)add(k-1);if(x<nx-1)add(k+1);if(y)add(k-nx);if(y<ny-1)add(k+nx);}
 for(let k=0;k<mask.length;k++)if(!outside[k])mask[k]=1;
 const edges=new Map(),key=(x,y)=>x+','+y,edge=(ax,ay,bx,by)=>{const k=key(ax,ay);if(!edges.has(k))edges.set(k,[]);edges.get(k).push([bx,by]);};
 for(let y=0;y<ny;y++)for(let x=0;x<nx;x++)if(mask[y*nx+x]){if(!y||!mask[(y-1)*nx+x])edge(x,y,x+1,y);if(x===nx-1||!mask[y*nx+x+1])edge(x+1,y,x+1,y+1);if(y===ny-1||!mask[(y+1)*nx+x])edge(x+1,y+1,x,y+1);if(!x||!mask[y*nx+x-1])edge(x,y+1,x,y);}
 const contours=[];while(edges.size){const start=edges.keys().next().value;let at=start;const ps=[];do{const [x,y]=at.split(',').map(Number);ps.push({x:b.minX+x*cell,y:b.minY+y*cell});const next=edges.get(at).pop();if(!edges.get(at).length)edges.delete(at);at=key(...next);}while(at!==start&&edges.has(at));ps.push({...ps[0]});contours.push({points:ps});}
 function contains(p){if(p.x<b.minX||p.x>=b.width||p.y<b.minY||p.y>=b.maxY)return false;return !!mask[Math.floor((p.y-b.minY)/cell)*nx+Math.floor((p.x-b.minX)/cell)];}
 return {contains,contours,padding,cell,mask,nx,ny,bounds:b};
}

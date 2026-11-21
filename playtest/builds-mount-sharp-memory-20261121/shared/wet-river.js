import {triangle} from '../mars-renderer/triangle.js';

/** An interpreted channel over the modern DEM, not a hydraulic reconstruction.
 * The shallow margins meet today's ground; no floating strip edges or terrain
 * edits are shared with the dry activities. */
export function createWetRiver(ground,centerline,lakeLevel){
 let points=centerline.map(([x,y])=>({x,y}));
 for(let pass=0;pass<4;pass++)points=points.map((p,i)=>i&&i<points.length-1?{x:(points[i-1].x+p.x*2+points[i+1].x)/4,y:(points[i-1].y+p.y*2+points[i+1].y)/4}:p);
 let downstream=lakeLevel,length=0;
 for(let i=points.length-1;i>=0;i--){const p=points[i];p.level=downstream=Math.max(downstream,ground(p.x,p.y)+10);}
 const banks=[],segments=[],buckets=new Map(),bucketSize=500,step=24,cells=new Set();
 for(let i=0;i<points.length;i++){
  const p=points[i],a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],d=Math.hypot(b.x-a.x,b.y-a.y);
  if(i)length+=Math.hypot(p.x-a.x,p.y-a.y);p.distance=length;p.width=110+110*i/(points.length-1);
  for(const side of [-1,1])banks.push({x:p.x-(b.y-a.y)/d*(p.width+30)*side,y:p.y+(b.x-a.x)/d*(p.width+30)*side});
  if(!i)continue;
  const segment={a,b:p},pad=Math.max(a.width,p.width)+step,minX=Math.min(a.x,p.x)-pad,maxX=Math.max(a.x,p.x)+pad,minY=Math.min(a.y,p.y)-pad,maxY=Math.max(a.y,p.y)+pad;
  segments.push(segment);
  for(let y=Math.floor(minY/bucketSize);y<=Math.floor(maxY/bucketSize);y++)for(let x=Math.floor(minX/bucketSize);x<=Math.floor(maxX/bucketSize);x++){const key=x+','+y;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(segment);}
  for(let y=Math.floor(minY/step);y<=Math.floor(maxY/step);y++)for(let x=Math.floor(minX/step);x<=Math.floor(maxX/step);x++)cells.add(x+','+y);
 }
 function levelAt(p){let best=Infinity,level=-Infinity;
  for(const {a,b} of buckets.get(Math.floor(p.x/bucketSize)+','+Math.floor(p.y/bucketSize))??[]){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy))),dist=Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t),width=a.width+(b.width-a.width)*t;if(dist<width&&dist<best){best=dist;const surface=a.level+(b.level-a.level)*t;level=Math.min(surface,ground(p.x,p.y)+10*(1-(dist/width)**2));}}
  return level;
 }
 const vertices=[],nodes=new Map();
 function node(x,y){const key=x+','+y;if(nodes.has(key))return nodes.get(key);const p={x:x*step,y:y*step},g=ground(p.x,p.y),level=levelAt(p),depth=Number.isFinite(level)?level-g:-1,n={x:p.x,y:p.y,g,depth};nodes.set(key,n);return n;}
 function clipped(tri){const poly=[];for(let i=0;i<3;i++){const a=tri[i],b=tri[(i+1)%3];if(a.depth>0)poly.push([a.x,a.y,a.g+a.depth+.12]);if((a.depth>0)!==(b.depth>0)){const t=a.depth/(a.depth-b.depth);poly.push([a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.g+(b.g-a.g)*t+.12]);}}
  for(let i=1;i<poly.length-1;i++){// Lake already covers these cells.
   if(poly[0][2]<=lakeLevel+.13&&poly[i][2]<=lakeLevel+.13&&poly[i+1][2]<=lakeLevel+.13)continue;
   triangle(vertices,poly[0],poly[i],poly[i+1],[.25,.41,1],[0,0,1]);
  }
 }
 for(const key of cells){const [x,y]=key.split(',').map(Number),a=node(x,y),b=node(x+1,y),c=node(x,y+1),d=node(x+1,y+1);clipped([a,b,c]);clipped([b,d,c]);}
 return {points,vertices,banks,levelAt};
}

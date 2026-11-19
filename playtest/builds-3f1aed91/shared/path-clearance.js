// Reserve the full marked lane, shoulders and rover clearance, not just sampled points.
export function createPathClearance(paths,padding=14){
 const size=160,buckets=new Map();
 for(const {points,halfWidth} of paths)for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],w=halfWidth+padding,segment={a,b,w};
  for(let y=Math.floor((Math.min(a.y,b.y)-w)/size);y<=Math.floor((Math.max(a.y,b.y)+w)/size);y++)for(let x=Math.floor((Math.min(a.x,b.x)-w)/size);x<=Math.floor((Math.max(a.x,b.x)+w)/size);x++){const key=x+','+y;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(segment);}
 }
 function contains(x,y,radius=0){
  for(let j=Math.floor((y-radius)/size);j<=Math.floor((y+radius)/size);j++)for(let i=Math.floor((x-radius)/size);i<=Math.floor((x+radius)/size);i++)for(const {a,b,w}of buckets.get(i+','+j)??[]){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1)));if(Math.hypot(x-a.x-dx*t,y-a.y-dy*t)<=w+radius)return true;}return false;
 }
 return {paths,contains,rocks:rocks=>rocks.filter(([x,y,r])=>!contains(x,y,r))};
}
// Authored rock soups emit each connected stone consecutively. Keep/remove whole
// components, including non-collidable pebbles, so a cleared road has no cut stumps.
export function clearPathScenery(vertices,clearance){
 const kept=[],keys=new Set();let start=0,minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 const key=i=>vertices[i].toFixed(3)+','+vertices[i+1].toFixed(3)+','+vertices[i+2].toFixed(3);
 function flush(end){if(end===start)return;const x=(minX+maxX)/2,y=(minY+maxY)/2,r=Math.hypot(maxX-minX,maxY-minY)/2;if(!clearance.contains(x,y,r))kept.push([start,end]);start=end;keys.clear();minX=minY=Infinity;maxX=maxY=-Infinity;}
 for(let i=0;i<vertices.length;i+=27){if(i>start&&![i,i+9,i+18].some(j=>keys.has(key(j))))flush(i);for(const j of [i,i+9,i+18]){keys.add(key(j));minX=Math.min(minX,vertices[j]);maxX=Math.max(maxX,vertices[j]);minY=Math.min(minY,vertices[j+1]);maxY=Math.max(maxY,vertices[j+1]);}}
 flush(vertices.length);const result=new Float32Array(kept.reduce((n,[a,b])=>n+b-a,0));let offset=0;for(const [a,b]of kept){result.set(vertices.subarray(a,b),offset);offset+=b-a;}return result;
}

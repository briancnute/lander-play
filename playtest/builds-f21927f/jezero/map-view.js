const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function viewBounds(world,view){
 const width=(world.width-world.minX)/view.zoom,height=(world.maxY-world.minY)/view.zoom;
 const minX=clamp(view.x-width/2,world.minX,world.width-width),minY=clamp(view.y-height/2,world.minY,world.maxY-height);
 return {minX,minY,width:minX+width,maxY:minY+height};
}
export function zoomView(world,view,factor){view.zoom=clamp(view.zoom*factor,1,16);const b=viewBounds(world,view);view.x=(b.minX+b.width)/2;view.y=(b.minY+b.maxY)/2;return b;}
export function panView(world,view,dx,dy,w,h){const b=viewBounds(world,view),scale=Math.min(w/(b.width-b.minX),h/(b.maxY-b.minY));view.x-=dx/scale;view.y-=dy/scale;zoomView(world,view,1);}

// Display-only smoothing: never changes the measured route or progress references.
export function smoothRoute(segments,tolerance=64){
 const runs=[];
 for(const segment of segments){if(!segment.points.length)continue;const last=runs.at(-1),first=segment.points[0];if(last&&Math.hypot(last.at(-1).x-first.x,last.at(-1).y-first.y)<=16)last.push(...segment.points);else runs.push([...segment.points]);}
 const simplify=points=>{
  if(points.length<3)return points;const keep=new Set([0,points.length-1]),stack=[[0,points.length-1]];
  while(stack.length){const [start,end]=stack.pop(),a=points[start],b=points[end],dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;let far=tolerance*tolerance,index=-1;
   for(let i=start+1;i<end;i++){const p=points[i],t=len?clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/len,0,1):0,d=(p.x-a.x-t*dx)**2+(p.y-a.y-t*dy)**2;if(d>far){far=d;index=i;}}
   if(index>=0){keep.add(index);stack.push([start,index],[index,end]);}
  }return [...keep].sort((a,b)=>a-b).map(i=>points[i]);
 };
 return runs.map(run=>{const points=simplify(run),rounded=[points[0]];
  for(let i=1;i<points.length-1;i++){const a=points[i-1],p=points[i],b=points[i+1],la=Math.hypot(p.x-a.x,p.y-a.y),lb=Math.hypot(b.x-p.x,b.y-p.y),radius=Math.min(32,la*.2,lb*.2);const q={x:p.x+(a.x-p.x)*radius/la,y:p.y+(a.y-p.y)*radius/la},r={x:p.x+(b.x-p.x)*radius/lb,y:p.y+(b.y-p.y)*radius/lb};rounded.push(q);for(let k=1;k<=4;k++){const t=k/4,u=1-t;rounded.push({x:u*u*q.x+2*u*t*p.x+t*t*r.x,y:u*u*q.y+2*u*t*p.y+t*t*r.y});}}
  if(points.length>1)rounded.push(points.at(-1));return {points:rounded};
 });
}
export function minimapSpan(current,speed,dt){const target=3200+6400*clamp(Math.abs(speed)/500,0,1);return current+(target-current)*(1-Math.exp(-Math.max(0,dt)/1.5));}
export function labelLevel(zoom){return zoom<2?0:zoom<4?1:zoom<8?2:3;}
export const activitySymbols={'photo':'◉','art':'✎','radar':'≋','atmosphere':'☀','long-jump':'↗','target-jump':'⊕','helicopter':'✣','delta-trial':'⚑'};

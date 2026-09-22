import {createRouteRibbon} from './route-ribbon.js';

// Ordered, local guidance: a nearby later visit must never win over the next point.
export function routeWindow(course,run){
 const next=Math.min(run.next,course.points.length-1),start=Math.max(0,next-2);
 const limit=course.facts[run.facts.length]?.routeIndex??course.points.length-1;
 let end=next,length=0;
 while(end<limit&&length<520){const a=course.points[end],b=course.points[end+1];length+=Math.hypot(b.x-a.x,b.y-a.y);end++;}
 return {start,end,points:course.points.slice(start,end+1),target:course.points[next]};
}
// Sample once from the course origin, never from the moving guidance window.
export function routeChevrons(course,spacing=65){
 const result=[];let travelled=0,next=spacing;
 for(let i=1;i<course.points.length;i++){
  const a=course.points[i-1],b=course.points[i],d=Math.hypot(b.x-a.x,b.y-a.y);if(d<.001)continue;
  while(next<=travelled+d){const t=(next-travelled)/d,p={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t},ux=(b.x-a.x)/d,uy=(b.y-a.y)/d;
   result.push({index:i,points:[{x:p.x-ux*23-uy*19,y:p.y-uy*23+ux*19},p,{x:p.x-ux*23+uy*19,y:p.y-uy*23-ux*19}]});next+=spacing;
  }travelled+=d;
 }return result;
}
export function createRouteGuidance(gpu,course,getRun,ground){
 const chevrons=routeChevrons(course);let key='',ribbon=null,edges=null;
 return {draw(state){
  const run=getRun(),window=routeWindow(course,run),id=window.start+':'+window.end;
  if(id!==key){
   ribbon?.dispose();edges?.dispose();key=id;
   const points=window.points,segments=[];
   // A continuous center thread connects generous directional chevrons through bends.
   segments.push({points});
   segments.push(...chevrons.filter(p=>p.index>window.start&&p.index<=window.end));
   const borders=[-1,1].map(side=>({points:points.map((p,i)=>{const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],d=Math.hypot(b.x-a.x,b.y-a.y)||1;return {x:p.x-(b.y-a.y)/d*course.halfWidth*side,y:p.y+(b.x-a.x)/d*course.halfWidth*side};})}));
   edges=createRouteRibbon(gpu,borders,ground,{halfWidth:1,color:[.75,.68,.5]});
   ribbon=createRouteRibbon(gpu,segments,ground,{halfWidth:2.7,color:[.45,1,.94],emissive:true});
  }
  edges?.draw(state);ribbon?.draw(state);
 }};
}

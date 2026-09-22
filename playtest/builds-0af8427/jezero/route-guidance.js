import {createRouteRibbon} from './route-ribbon.js';

// Ordered, local guidance: a nearby later visit must never win over the next point.
export function routeWindow(course,run){
 const next=Math.min(run.next,course.points.length-1),start=Math.max(0,next-2);
 const limit=course.facts[run.facts.length]?.routeIndex??course.points.length-1;
 let end=next,length=0;
 while(end<limit&&length<520){const a=course.points[end],b=course.points[end+1];length+=Math.hypot(b.x-a.x,b.y-a.y);end++;}
 return {start,end,points:course.points.slice(start,end+1),target:course.points[next]};
}
export function createRouteGuidance(gpu,course,getRun,ground){
 let key='',ribbon=null,edges=null;
 return {draw(state){
  const run=getRun(),window=routeWindow(course,run),id=window.start+':'+window.end;
  if(id!==key){
   ribbon?.dispose();edges?.dispose();key=id;
   const points=window.points,segments=[];
   // A continuous center thread connects generous directional chevrons through bends.
   segments.push({points});let spacing=0;
   for(let i=1;i<points.length;i++){
    const a=points[i-1],p=points[i],d=Math.hypot(p.x-a.x,p.y-a.y);spacing+=d;
    if(spacing<65||d<.01)continue;spacing=0;const ux=(p.x-a.x)/d,uy=(p.y-a.y)/d;
    segments.push({points:[{x:p.x-ux*23-uy*19,y:p.y-uy*23+ux*19},p,{x:p.x-ux*23+uy*19,y:p.y-uy*23-ux*19}]});
   }
   const borders=[-1,1].map(side=>({points:points.map((p,i)=>{const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],d=Math.hypot(b.x-a.x,b.y-a.y)||1;return {x:p.x-(b.y-a.y)/d*course.halfWidth*side,y:p.y+(b.x-a.x)/d*course.halfWidth*side};})}));
   edges=createRouteRibbon(gpu,borders,ground,{halfWidth:1,color:[.75,.68,.5]});
   ribbon=createRouteRibbon(gpu,segments,ground,{halfWidth:2.7,color:[.45,1,.94],emissive:true});
  }
  edges?.draw(state);ribbon?.draw(state);
 }};
}

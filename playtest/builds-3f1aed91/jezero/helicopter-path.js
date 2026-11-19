import {atDistance,measured} from './rally-route.js';
// Smooth authored canyon stations before measuring forward travel distance.
export function smoothFlightPath(nodes){
 const out=[];
 for(let i=0;i<nodes.length-1;i++)for(let k=0;k<24;k++){
  const t=k/24,a=nodes[Math.max(0,i-1)],b=nodes[i],c=nodes[i+1],d=nodes[Math.min(nodes.length-1,i+2)],axis=key=>.5*(2*b[key]+(-a[key]+c[key])*t+(2*a[key]-5*b[key]+4*c[key]-d[key])*t*t+(-a[key]+3*b[key]-3*c[key]+d[key])*t*t*t);
  out.push({x:axis('x'),y:axis('y')});
 }
 return measured([...out,{...nodes.at(-1)}]);
}
export function flightFrame(course,s){
 const points=course.points,length=points.at(-1).s,p=atDistance(points,Math.max(0,Math.min(length,s)));
 if(course.curved){const a=atDistance(points,Math.max(0,p.s-60)),b=atDistance(points,Math.min(length,p.s+60));p.heading=Math.atan2(b.x-a.x,a.y-b.y);}
 const extra=s<0?s:s>length?s-length:0;
 return {...p,x:p.x+Math.sin(p.heading)*extra,y:p.y-Math.cos(p.heading)*extra,s};
}
export function flightSide(f){const p=flightFrame(f.course,f.distance??0);return (f.x-p.x)*Math.cos(p.heading)+(f.y-p.y)*Math.sin(p.heading);}

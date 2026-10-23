import {atDistance} from './rally-route.js';
export function createBoardingRamp(road,ground){
 const start=road.length-250,end=road.length-24,halfWidth=40,sections=[];
 const first=atDistance(road.points,start),last=atDistance(road.points,end),heading=Math.atan2(last.x-first.x,first.y-last.y);
 const pad={x:last.x+Math.sin(heading)*24,y:last.y-Math.cos(heading)*24,heading},floor=ground(pad.x,pad.y)+22,base=ground(first.x,first.y);
 for(let i=0;i<=12;i++){const t=i/12,x=first.x+(last.x-first.x)*t,y=first.y+(last.y-first.y)*t;sections.push({x,y,heading,s:start+(end-start)*t,z:Math.max(ground(x,y),base+(floor-base)*t)});}
 const top=sections.at(-1);
 function project(x,y){let best={distance:Infinity};for(let i=1;i<sections.length;i++){const a=sections[i-1],b=sections[i],dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/l)):0,distance=Math.hypot(x-a.x-dx*t,y-a.y-dy*t);if(distance<best.distance)best={distance,z:a.z+(b.z-a.z)*t,station:a.s+(b.s-a.s)*t};}return best;}
 const widthAt=station=>halfWidth-20*Math.max(0,Math.min(1,(station-start)/(end-start)));
 return {sections,start,end,halfWidth,pad,top,widthAt,ground(x,y){const p=project(x,y);return p.distance<=widthAt(p.station)&&p.station>start+.01?Math.max(ground(x,y),p.z):ground(x,y);},canBoard(before,after){const a=project(before.x,before.y),b=project(after.x,after.y);return b.distance<=18&&b.station>=end-10&&(a.station>=end-35||Math.hypot(after.x-top.x,after.y-top.y)<15);}};
}

import {flightTrackExtension} from './flight-track-extension.js';
export function flightTrackSegments(course,segments){
 const points=course.points,padding=2200,b={minX:Math.min(...points.map(p=>p.x))-padding,maxX:Math.max(...points.map(p=>p.x))+padding,minY:Math.min(...points.map(p=>p.y))-padding,maxY:Math.max(...points.map(p=>p.y))+padding},out=[];
 for(const segment of [...segments,...flightTrackExtension])for(let i=1;i<segment.points.length;i++){const a=segment.points[i-1],c=segment.points[i];if(Math.max(a.x,c.x)<b.minX||Math.min(a.x,c.x)>b.maxX||Math.max(a.y,c.y)<b.minY||Math.min(a.y,c.y)>b.maxY)continue;out.push({points:[a,c]});}
 return out;
}

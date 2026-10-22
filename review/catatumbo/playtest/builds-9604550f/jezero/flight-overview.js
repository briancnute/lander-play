export const FLIGHT_TERRAIN_BOUNDS={minX:-34880,maxX:18880,minY:-12480,maxY:22080};
const cache=new WeakMap();
function clip(poly,nx,ny,limit){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=a.x*nx+a.y*ny-limit,db=b.x*nx+b.y*ny-limit;if(da<=1e-6)out.push(a);if((da<0)!==(db<0)){const t=da/(da-db);out.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}}return out;}
export function overviewSites(course){const dx=course.finish.x-course.start.x,dy=course.finish.y-course.start.y,h=course.finishLine?.heading??Math.atan2(dx,-dy),launch=course.start.heading??Math.atan2(dx,-dy);return [...(course.points??[course.start,...(course.path??[]),course.finish]),{x:course.start.x-Math.sin(launch)*280,y:course.start.y+Math.cos(launch)*280},{x:course.finish.x+Math.sin(h)*((course.stormDistance??800)+400),y:course.finish.y-Math.cos(h)*((course.stormDistance??800)+400)}];}
// Fit the entire route and a piece of its storm bank; move the FRAME within
// measured coverage rather than zooming into a cropped slice of the route.
export function flightOverview(course,w,h){
 const key=w+','+h;let frames=cache.get(course);if(!frames){frames=new Map();cache.set(course,frames);}if(frames.has(key))return frames.get(key);
 const sites=overviewSites(course),bounds=FLIGHT_TERRAIN_BOUNDS;let preferred=Math.atan2(course.finish.y-course.start.y,course.finish.x-course.start.x);if(preferred>Math.PI/2)preferred-=Math.PI;if(preferred< -Math.PI/2)preferred+=Math.PI;
 let best=null;const angles=[preferred,...Array.from({length:37},(_,i)=>-Math.PI/2+i*Math.PI/36)];
 for(const [px,py]of [[.45,.38],[.47,.47]]){for(const heading of angles){const c=Math.cos(heading),s=Math.sin(heading),rs=sites.map(p=>p.x*c+p.y*s),us=sites.map(p=>p.y*c-p.x*s),minR=Math.min(...rs),maxR=Math.max(...rs),minU=Math.min(...us),maxU=Math.max(...us),fit=Math.max((maxR-minR)/(w*px*2),(maxU-minU)/(h*py*2),((course.halfWidth??500)*2+1100)/(h*.7));
  for(let step=0;step<14;step++){const scale=fit*(1+step*.025),ex=(Math.abs(c)*w+Math.abs(s)*h)*scale/2,ey=(Math.abs(s)*w+Math.abs(c)*h)*scale/2,left=bounds.minX+500+ex,right=bounds.maxX-500-ex,top=bounds.minY+500+ey,bottom=bounds.maxY-500-ey;if(left>right||top>bottom)continue;
   let poly=[{x:left,y:top},{x:right,y:top},{x:right,y:bottom},{x:left,y:bottom}];for(const [nx,ny,limit]of [[c,s,minR+w*scale*px],[-c,-s,-maxR+w*scale*px],[-s,c,minU+h*scale*py],[s,-c,-maxU+h*scale*py]])poly=clip(poly,nx,ny,limit);if(!poly.length)continue;
   const x=poly.reduce((sum,p)=>sum+p.x,0)/poly.length,y=poly.reduce((sum,p)=>sum+p.y,0)/poly.length,score=scale*(1+.03*Math.abs(heading-preferred));if(!best||score<best.score)best={x,y,scale,heading,score};break;
  }
 }
 if(best)break;}
 if(!best){const x=(course.start.x+course.finish.x)/2,y=(course.start.y+course.finish.y)/2,scale=Math.max(.1,Math.min((Math.min(x-bounds.minX,bounds.maxX-x)-500)*2/w,(Math.min(y-bounds.minY,bounds.maxY-y)-500)*2/h));best={x,y,scale,heading:0};}frames.set(key,best);return best;
}

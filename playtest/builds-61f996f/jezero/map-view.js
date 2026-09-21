const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function viewBounds(world,view){
 const width=(world.width-world.minX)/view.zoom,height=(world.maxY-world.minY)/view.zoom;
 const minX=clamp(view.x-width/2,world.minX,world.width-width),minY=clamp(view.y-height/2,world.minY,world.maxY-height);
 return {minX,minY,width:minX+width,maxY:minY+height};
}
export function zoomView(world,view,factor){view.zoom=clamp(view.zoom*factor,1,16);const b=viewBounds(world,view);view.x=(b.minX+b.width)/2;view.y=(b.minY+b.maxY)/2;return b;}
export function panView(world,view,dx,dy,w,h){const b=viewBounds(world,view),scale=Math.min(w/(b.width-b.minX),h/(b.maxY-b.minY));view.x-=dx/scale;view.y-=dy/scale;zoomView(world,view,1);}

// Display-only smoothing: never changes the measured route or progress references.
export function smoothRoute(segments,spacing=12){return segments.map(s=>{
 const points=[];for(const p of s.points)if(!points.length||Math.hypot(p.x-points.at(-1).x,p.y-points.at(-1).y)>=spacing)points.push(p);
 const end=s.points.at(-1);if(end&&points.at(-1)!==end)points.push(end);
 return {...s,points:points.map((p,i)=>i===0||i===points.length-1?p:{x:(points[i-1].x+2*p.x+points[i+1].x)/4,y:(points[i-1].y+2*p.y+points[i+1].y)/4})};
});}
export const activitySymbols={'photo':'◉','art':'✎','radar':'≋','atmosphere':'☀','long-jump':'↗','target-jump':'⊕','helicopter':'✣','delta-trial':'⚑'};

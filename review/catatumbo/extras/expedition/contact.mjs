// Finite rover footprint, substepped motion and surface sliding. Coordinates match scenery.
export const ROVER_RADIUS=10;
function inside(x,y,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
export function clearance(x,y,mesa,rocks){let d=Infinity;for(let i=0;i<mesa.length;i++){const a=mesa[i],b=mesa[(i+1)%mesa.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy));}if(inside(x,y,mesa))d=-d;for(const [rx,ry,r]of rocks)d=Math.min(d,Math.hypot(x-rx,y-ry)-r);return d;}
export function moveWithContact(x,y,dx,dy,mesa,rocks,radius=ROVER_RADIUS){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/2));let hit=false;
 for(let step=0;step<steps;step++){x+=dx/steps;y+=dy/steps;
  for(let pass=0;pass<3;pass++){
   for(const [rx,ry,r]of rocks){const vx=x-rx,vy=y-ry,d=Math.hypot(vx,vy),min=r+radius;if(d<min){hit=true;const nx=d?vx/d:1,ny=d?vy/d:0;x=rx+nx*(min+.001);y=ry+ny*(min+.001);}}
   let closest=null,best=Infinity;for(let i=0;i<mesa.length;i++){const a=mesa[i],b=mesa[(i+1)%mesa.length],vx=b[0]-a[0],vy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*vx+(y-a[1])*vy)/(vx*vx+vy*vy))),px=a[0]+t*vx,py=a[1]+t*vy,d=Math.hypot(x-px,y-py);if(d<best){best=d;closest={px,py,vx,vy};}}
   const within=inside(x,y,mesa);if(within||best<radius){hit=true;const c=closest;let nx=best?(x-c.px)/best:c.vy/Math.hypot(c.vx,c.vy),ny=best?(y-c.py)/best:-c.vx/Math.hypot(c.vx,c.vy);if(within){nx=-nx;ny=-ny;}x=c.px+nx*(radius+.001);y=c.py+ny*(radius+.001);}
  }
 }return {x,y,hit};
}

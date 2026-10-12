// One broad rightward sweep, then a straight approach to the boost and kicker.
// Distances are arc length; gate/jump positions do not drift when the lane bends.
export function slalomRoute(top,length=14000,variant='classic'){
 const points=[[top.x,top.y]];let x=top.x,y=top.y;
 for(let s=0;s<length;s+=100){const ds=Math.min(100,length-s),t=Math.max(0,Math.min(1,(s+ds/2-900)/2300)),heading=variant==='switchbacks'?hardHeading(s+ds/2):.48*Math.sin(Math.PI*t)**2;x+=Math.sin(heading)*ds;y-=Math.cos(heading)*ds;points.push([x,y]);}
 return points;
}

// Rounded, unequal reversals; the final gate exits onto a straight run-up.
function hardHeading(s){
 const knots=[[0,0],[450,.18],[1050,-.58],[1650,.62],[2050,-.48],[2750,.65],[3450,-.6],[4050,.35],[4550,0]];
 for(let i=1;i<knots.length;i++){const [b,hb]=knots[i],[a,ha]=knots[i-1];if(s<=b){const t=Math.max(0,(s-a)/(b-a)),w=t*t*(3-2*t);return .5*(ha+(hb-ha)*w);}}
 return 0;
}

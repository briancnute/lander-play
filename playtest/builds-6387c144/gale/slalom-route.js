// One broad rightward sweep, then a straight approach to the boost and kicker.
// Distances are arc length; gate/jump positions do not drift when the lane bends.
export function slalomRoute(top,length=14000){
 const points=[[top.x,top.y]];let x=top.x,y=top.y;
 for(let s=0;s<length;s+=100){const ds=Math.min(100,length-s),t=Math.max(0,Math.min(1,(s+ds/2-900)/2300)),heading=.48*Math.sin(Math.PI*t)**2;x+=Math.sin(heading)*ds;y-=Math.cos(heading)*ds;points.push([x,y]);}
 return points;
}

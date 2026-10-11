// Local scenery clearance for an authored line beside the measured traverse.
// Spatial buckets keep planning independent of the total world's rock count.
export function clearRallyLine(source,rocks){
 const size=120,buckets=new Map();for(const rock of rocks){const [x,y,r]=rock;for(let ix=Math.floor((x-r-50)/size);ix<=Math.floor((x+r+50)/size);ix++)for(let iy=Math.floor((y-r-50)/size);iy<=Math.floor((y+r+50)/size);iy++){const key=ix+','+iy;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}}
 const near=p=>buckets.get(Math.floor(p.x/size)+','+Math.floor(p.y/size))??[];
 const points=[{...source[0]}];for(let i=1;i<source.length;i++){const a=source[i-1],b=source[i],steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/12));for(let k=1;k<=steps;k++)points.push({...b,x:a.x+(b.x-a.x)*k/steps,y:a.y+(b.y-a.y)*k/steps});}
 for(let pass=0;pass<12;pass++)for(let i=0;i<points.length;i++){const p=points[i];if(pass&&i&&i<points.length-1){p.x=p.x*.6+(points[i-1].x+points[i+1].x)*.2;p.y=p.y*.6+(points[i-1].y+points[i+1].y)*.2;}for(const [x,y,r]of near(p)){const dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy),clearance=r+26;if(d<clearance){const angle=d?Math.atan2(dy,dx):0;p.x=x+Math.cos(angle)*clearance;p.y=y+Math.sin(angle)*clearance;}}}
 return points;
}

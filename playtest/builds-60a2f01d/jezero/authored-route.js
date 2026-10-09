// Producer's southern-loop sketch, expressed in existing game coordinates.
// These are authored driving positions, not extra NASA traverse measurements.
const dist=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
function roundAndSample(nodes){
 const curve=[nodes[0]];
 for(let i=1;i<nodes.length-1;i++){
  const a=nodes[i-1],p=nodes[i],b=nodes[i+1],la=dist(a,p),lb=dist(p,b),r=Math.min(180,la*.25,lb*.25);
  if(la<1||lb<1)continue;
  const q={x:p.x+(a.x-p.x)*r/la,y:p.y+(a.y-p.y)*r/la},z={x:p.x+(b.x-p.x)*r/lb,y:p.y+(b.y-p.y)*r/lb};
  for(let k=0;k<=12;k++){const t=k/12,u=1-t;curve.push({x:u*u*q.x+2*u*t*p.x+t*t*z.x,y:u*u*q.y+2*u*t*p.y+t*t*z.y});}
 }curve.push(nodes.at(-1));
 const points=[curve[0]];
 for(let i=1;i<curve.length;i++){const a=curve[i-1],b=curve[i],n=Math.max(1,Math.ceil(dist(a,b)/30));for(let k=1;k<=n;k++)points.push({x:a.x+(b.x-a.x)*k/n,y:a.y+(b.y-a.y)*k/n});}
 return points;
}
export function openingRoute(legacy,rocks=[]){
 const pair=legacy.facts.find(f=>f.id==='pair'),seitah=legacy.facts.find(f=>f.id==='seitah-view');
 if(!pair||!seitah)return null;
 const old=legacy.points,at=source=>old.find(p=>p.source>=source)??old.at(-1);
 const legs=[
  [old[0],{x:12650,y:8850},old[seitah.routeIndex]],
  [old[seitah.routeIndex],{x:12300,y:10900},{x:13050,y:11200},{x:13500,y:11000},{x:13850,y:10100},{x:13600,y:8200},{x:14300,y:7000},at(63),at(70),at(77),at(84),old[pair.routeIndex]],
 ];
 const points=[];
 for(let leg=0;leg<legs.length;leg++){
  const part=roundAndSample(legs[leg]),start=leg?old[seitah.routeIndex].source:0,end=leg?old[pair.routeIndex].source:old[seitah.routeIndex].source;
  let length=0;const lengths=[0];for(let i=1;i<part.length;i++){length+=dist(part[i-1],part[i]);lengths.push(length);}
  part.forEach((p,i)=>{if(leg&&i===0)return;points.push({...p,source:start+(end-start)*lengths[i]/length});});
 }
 // Same authored rock-clearance treatment as V1; keep the historical facts pinned.
 for(let i=1;i<points.length-1;i++)if(Math.abs(points[i].source-old[seitah.routeIndex].source)>1e-6)for(let pass=0;pass<4;pass++)for(const [x,y,r]of rocks){const p=points[i],d=Math.hypot(p.x-x,p.y-y);if(d>=r+32)continue;const a=d?Math.atan2(p.y-y,p.x-x):0;p.x=x+Math.cos(a)*(r+32);p.y=y+Math.sin(a)*(r+32);}
 points.push(...old.slice(pair.routeIndex+1).map(p=>({...p})));
 let length=0;points[0].metres=0;for(let i=1;i<points.length;i++){length+=dist(points[i-1],points[i]);points[i].metres=length/3.2;}
 const facts=legacy.facts.map(f=>({...f,routeIndex:f.id==='route-frontier'?points.length-1:Math.max(0,points.findIndex(p=>p.source>=old[f.routeIndex].source-1e-6))}));
 return {...legacy,version:2,points,facts,length,legacyPoints:old};
}

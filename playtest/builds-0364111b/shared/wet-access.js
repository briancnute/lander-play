/** Water is a surface, not an invisible wall extending into the sky. Sweep the
 * rover's footing through the step so fast descents cannot tunnel through it. */
export function safeWetMotion(basin,a,b){
 const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/Math.min(12,basin.dx/4,basin.dy/4)));
 for(let i=0;i<=count;i++){
  const t=i/count,p={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  if(!basin.inside(p))return false;
  if(basin.flooded(p)){
   const z=a.z+(b.z-a.z)*t;
   if(!Number.isFinite(z)||z<=basin.levelAt(p)+.12)return false;
  }else if(!a.air&&!b.air&&!basin.dry(p))return false;
 }
 return true;
}

/** Pick starts on the main dry landmass, with room around the rover and a clear
 * forward route. Map travel still permits deliberate visits to small islands. */
export function createWetLandAccess(basin,ground){
 const {columns,rows,heights,surface}=basin,n=columns*rows,labels=new Int32Array(n).fill(-1),sizes=[],queue=new Int32Array(n);
 const eligible=k=>!Number.isFinite(surface?.[k])||heights[k]>surface[k]+12;
 for(let k=0;k<n;k++)if(labels[k]<0&&eligible(k)){
  const id=sizes.length;let head=0,tail=1;queue[0]=k;labels[k]=id;
  while(head<tail){const q=queue[head++],x=q%columns,y=Math.floor(q/columns);for(const next of [x?q-1:-1,x<columns-1?q+1:-1,y?q-columns:-1,y<rows-1?q+columns:-1])if(next>=0&&labels[next]<0&&eligible(next)){labels[next]=id;queue[tail++]=next;}}
  sizes.push(tail);
 }
 const largest=sizes.indexOf(Math.max(...sizes));
 function component(p){const x=Math.round((p.x-basin.bounds.minX)/basin.dx),y=Math.round((p.y-basin.bounds.minY)/basin.dy);return x>=0&&x<columns&&y>=0&&y<rows?labels[y*columns+x]:-1;}
 function canRestore(p){return basin.dry(p)&&sizes[component(p)]>=64;}
 function heading(p){let best=null;for(let i=0;i<32;i++){const angle=i*Math.PI/16;let distance=0;for(let d=24;d<=1200;d+=24){const q={x:p.x+Math.sin(angle)*d,y:p.y-Math.cos(angle)*d};if(!basin.dry(q,12)||Math.abs(ground(q.x,q.y)-ground(p.x,p.y))/d>.35)break;distance=d;}if(!best||distance>best.distance)best={heading:angle,distance};}return best;}
 function start(anchor){
  const candidates=[];for(let k=0;k<n;k++)if(labels[k]===largest){const p=basin.point(k);if(basin.inside(p))candidates.push({...p,distance:Math.hypot(p.x-anchor.x,p.y-anchor.y)});}
  candidates.sort((a,b)=>a.distance-b.distance);
  for(const p of candidates){if(!basin.dry(p,16))continue;let clear=true;for(let i=0;i<16;i++){const a=i*Math.PI/8;if(!basin.safeSegment(p,{x:p.x+Math.sin(a)*120,y:p.y+Math.cos(a)*120})){clear=false;break;}}if(!clear)continue;
   if(Math.hypot(ground(p.x-12,p.y)-ground(p.x+12,p.y),ground(p.x,p.y-12)-ground(p.x,p.y+12))/24>.35)continue;
   const direction=heading(p);if(direction.distance>=600)return {x:p.x,y:p.y,heading:direction.heading};
  }
  throw Error('No connected dry starting area was found.');
 }
 return {start,canRestore};
}

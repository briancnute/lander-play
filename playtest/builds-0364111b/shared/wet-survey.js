import {triangle} from '../mars-renderer/triangle.js';

/** One surveyed surface for rendering, map, camera and water contact. The
 * precomputed field is an interpreted wet scenario on unchanged game terrain. */
export function createSurveyWater(ground,bounds,survey){
 const {columns,rows,dx,dy,level}=survey;
 if(survey.version!==1||!Number.isInteger(columns)||!Number.isInteger(rows)||columns<2||rows<2||columns*rows>2000000||![dx,dy,level].every(Number.isFinite)||dx<=0||dy<=0||!Array.isArray(survey.cells)||!Array.isArray(survey.channels))throw Error('Invalid water survey.');
 if(['minX','minY','width','maxY'].some(k=>!Number.isFinite(survey.bounds?.[k])||Math.abs(bounds[k]-survey.bounds[k])>.01)||Math.abs(dx*(columns-1)-(bounds.width-bounds.minX))>.01||Math.abs(dy*(rows-1)-(bounds.maxY-bounds.minY))>.01)throw Error('Water survey does not match this landscape.');
 const point=k=>({x:bounds.minX+(k%columns)*dx,y:bounds.minY+Math.floor(k/columns)*dy}),heights=Float32Array.from({length:columns*rows},(_,k)=>{const p=point(k);return ground(p.x,p.y);}),surface=new Float32Array(heights.length).fill(NaN),wet=new Uint8Array(heights.length);
 for(const [k,z]of survey.cells){if(!Number.isInteger(k)||k<0||k>=surface.length||!Number.isFinite(z)||Number.isFinite(surface[k]))throw Error('Incomplete or duplicate water survey sample.');surface[k]=z;wet[k]=z>heights[k]+.005?1:0;}
 const cells=new Uint8Array((columns-1)*(rows-1)),vertices=[],built=new Uint8Array(cells.length);
 const inside=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.y)&&p.x>=bounds.minX+24&&p.x<=bounds.width-24&&p.y>=bounds.minY+24&&p.y<=bounds.maxY-24;
 const water=k=>Number.isFinite(surface[k])?surface[k]:heights[k]-1;
 const position=k=>{const p=point(k);return [p.x,p.y,water(k)+.12];};
 function emit(a,b,c){const color=[a,b,c].every(p=>Math.abs(p[2]-.12-level)<.002)?[.25,.41,.43]:[.25,.41,1];triangle(vertices,a,b,c,color,[0,0,1]);}
 function clip(ids){const poly=[];for(let i=0;i<3;i++){const a=ids[i],b=ids[(i+1)%3],da=water(a)-heights[a],db=water(b)-heights[b],p=position(a),q=position(b);if(da>0)poly.push(p);if((da>0)!==(db>0)){const t=da/(da-db);poly.push(p.map((v,j)=>v+(q[j]-v)*t));}}for(let i=1;i<poly.length-1;i++)emit(poly[0],poly[i],poly[i+1]);}
 for(let j=0;j<rows-1;j++)for(let i=0;i<columns-1;i++){const a=j*columns+i;cells[j*(columns-1)+i]=[a,a+1,a+columns,a+columns+1].some(k=>wet[k])?1:0;}
 for(let j=0;j<rows-1;j++)for(let i=0;i<columns-1;i++){
  const cell=j*(columns-1)+i;if(!cells[cell]||built[cell])continue;const a=j*columns+i,b=a+1,c=a+columns,d=c+1;
  // Merge only completely wet, constant-level lake interiors. Every enclosed
  // terrain sample is checked, so islands and river banks keep the fine mesh.
  const size=8;let flat=i+size<columns&&j+size<rows;
  if(flat)for(let y=0;y<=size&&flat;y++)for(let x=0;x<=size;x++){const k=a+y*columns+x;if(!wet[k]||Math.abs(surface[k]-level)>.002||(y<size&&x<size&&built[(j+y)*(columns-1)+i+x])){flat=false;break;}}
  if(flat){for(let y=0;y<size;y++)for(let x=0;x<size;x++)built[(j+y)*(columns-1)+i+x]=1;emit(position(a),position(a+size),position(a+size*columns));emit(position(a+size),position(a+size*columns+size),position(a+size*columns));}
  else {clip([a,b,c]);clip([b,d,c]);}
 }
 function levelAt(p){if(!inside(p))return -Infinity;const x=(p.x-bounds.minX)/dx,y=(p.y-bounds.minY)/dy,i=Math.min(columns-2,Math.floor(x)),j=Math.min(rows-2,Math.floor(y));if(!cells[j*(columns-1)+i])return -Infinity;const u=x-i,v=y-j,a=j*columns+i,b=a+1,c=a+columns,d=c+1;return u+v<=1?water(a)+(water(b)-water(a))*u+(water(c)-water(a))*v:water(d)+(water(c)-water(d))*(1-u)+(water(b)-water(d))*(1-v);}
 const flooded=(p,margin=0)=>inside(p)&&ground(p.x,p.y)<levelAt(p)+margin,dry=(p,margin=4)=>inside(p)&&!flooded(p,margin),shores=[];
 const near=new Uint8Array(wet.length),queue=[];
 for(let k=0;k<wet.length;k++)if(wet[k]){near[k]=1;queue.push(k);}
 for(let cursor=0;cursor<queue.length;cursor++){const k=queue[cursor],i=k%columns,j=Math.floor(k/columns);if(near[k]>=5)continue;for(const n of [i?k-1:-1,i<columns-1?k+1:-1,j?k-columns:-1,j<rows-1?k+columns:-1])if(n>=0&&!near[n]){near[n]=near[k]+1;queue.push(n);}}
 for(let k=0;k<near.length;k++)if(near[k]>1&&!wet[k]){const p=point(k);if(dry(p,8)&&Math.hypot(ground(p.x-12,p.y)-ground(p.x+12,p.y),ground(p.x,p.y-12)-ground(p.x,p.y+12))/24<.45)shores.push(p);}
 if(!shores.length)throw Error('The water survey has no accessible dry shore.');
 function nearestDry(p,{shore=false}={}){if(!shore&&dry(p))return {...p};let best=shores[0],distance=Infinity;for(const q of shores){const next=Math.hypot(q.x-p.x,q.y-p.y);if(next<distance){best=q;distance=next;}}let focus=p;if(dry(p)){const i=Math.round((best.x-bounds.minX)/dx),j=Math.round((best.y-bounds.minY)/dy);let dist=Infinity;for(let y=Math.max(0,j-5);y<=Math.min(rows-1,j+5);y++)for(let x=Math.max(0,i-5);x<=Math.min(columns-1,i+5);x++){const k=y*columns+x;if(!wet[k])continue;const q=point(k),d=Math.hypot(q.x-best.x,q.y-best.y);if(d<dist){dist=d;focus=q;}}}return {...best,heading:Math.atan2(focus.x-best.x,-(focus.y-best.y))};}
 const channels=survey.channels.map(ch=>({...ch,points:ch.points.map(([x,y,level])=>({x,y,level}))}));
 return {level,bounds,columns,rows,dx,dy,wet,cells,heights,surface,vertices:new Float32Array(vertices),point,inside,levelAt,flooded,dry,nearestDry,channels,river:channels[0],
  safeSegment(a,b){const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/Math.min(12,dx/4,dy/4)));for(let i=1;i<=count;i++)if(!dry({x:a.x+(b.x-a.x)*i/count,y:a.y+(b.y-a.y)*i/count}))return false;return true;},
 };
}

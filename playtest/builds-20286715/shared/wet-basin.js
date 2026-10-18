import {triangle} from '../mars-renderer/triangle.js';

/** An interpreted lake on the existing surface. Only low cells connected to the
 * basin seed fill; isolated depressions behind high ground remain dry. */
export function createWetBasin(ground,bounds,{level,seed,step=100}){
 const columns=Math.ceil((bounds.width-bounds.minX)/step)+1,rows=Math.ceil((bounds.maxY-bounds.minY)/step)+1;
 const dx=(bounds.width-bounds.minX)/(columns-1),dy=(bounds.maxY-bounds.minY)/(rows-1);
 const point=k=>({x:bounds.minX+(k%columns)*dx,y:bounds.minY+Math.floor(k/columns)*dy});
 const heights=Float32Array.from({length:columns*rows},(_,k)=>{const p=point(k);return ground(p.x,p.y);});
 const wet=new Uint8Array(heights.length);let first=-1,distance=Infinity;
 for(let k=0;k<heights.length;k++)if(heights[k]<level){const p=point(k),d=Math.hypot(p.x-seed.x,p.y-seed.y);if(d<distance){first=k;distance=d;}}
 if(first<0)throw Error('The lake has no low basin.');
 const queue=[first];wet[first]=1;
 for(let cursor=0;cursor<queue.length;cursor++){const k=queue[cursor],x=k%columns,y=Math.floor(k/columns),p=point(k);
  for(const n of [x? k-1:-1,x<columns-1?k+1:-1,y?k-columns:-1,y<rows-1?k+columns:-1])if(n>=0&&!wet[n]&&heights[n]<level){const q=point(n);if([.25,.5,.75].every(t=>ground(p.x+(q.x-p.x)*t,p.y+(q.y-p.y)*t)<level)){wet[n]=1;queue.push(n);}}
 }
 const vertices=[],cells=new Uint8Array((columns-1)*(rows-1));
 function clipped(ids){if(!ids.some(k=>wet[k]))return;const polygon=[];
  for(let i=0;i<3;i++){const a=ids[i],b=ids[(i+1)%3],p=point(a),q=point(b),inside=heights[a]<level;if(inside)polygon.push([p.x,p.y,level]);if(inside!==(heights[b]<level)){const t=(level-heights[a])/(heights[b]-heights[a]);polygon.push([p.x+(q.x-p.x)*t,p.y+(q.y-p.y)*t,level]);}}
  for(let i=1;i<polygon.length-1;i++)triangle(vertices,polygon[0],polygon[i],polygon[i+1],[.25,.41,.43],[0,0,1]);
 }
 for(let j=0;j<rows-1;j++)for(let i=0;i<columns-1;i++){const a=j*columns+i,b=a+1,c=a+columns,d=c+1;if([a,b,c,d].some(k=>wet[k])){cells[j*(columns-1)+i]=1;clipped([a,b,c]);clipped([b,d,c]);}}
 const inside=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.y)&&p.x>=bounds.minX+24&&p.x<=bounds.width-24&&p.y>=bounds.minY+24&&p.y<=bounds.maxY-24;
 function flooded(p,margin=0){if(!inside(p)||ground(p.x,p.y)>=level+margin)return false;const i=Math.min(columns-2,Math.max(0,Math.floor((p.x-bounds.minX)/dx))),j=Math.min(rows-2,Math.max(0,Math.floor((p.y-bounds.minY)/dy)));return !!cells[j*(columns-1)+i];}
 const dry=(p,margin=4)=>inside(p)&&!flooded(p,margin);
 const shores=[];for(let k=0;k<heights.length;k++)if(heights[k]>=level+10&&heights[k]<level+100){const p=point(k);if(!dry(p))continue;const slope=Math.hypot(ground(p.x-12,p.y)-ground(p.x+12,p.y),ground(p.x,p.y-12)-ground(p.x,p.y+12))/24;if(slope<.45)shores.push(p);}
 if(!shores.length)throw Error('The lake needs a dry shoreline starting point.');
 function nearestDry(p,{shore=false}={}){if(!shore&&dry(p))return {...p};let best=null,d=Infinity;for(const q of shores){const next=Math.hypot(q.x-p.x,q.y-p.y);if(next<d){best=q;d=next;}}return {...best,heading:Math.atan2(seed.x-best.x,-(seed.y-best.y))};}
 return {level,bounds,columns,rows,dx,dy,wet,cells,heights,vertices:new Float32Array(vertices),point,dry,inside,nearestDry,
  flooded,
  safeSegment(a,b){const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/12));for(let i=1;i<=count;i++)if(!dry({x:a.x+(b.x-a.x)*i/count,y:a.y+(b.y-a.y)*i/count}))return false;return true;},
 };
}
export function wetSaveKey(site){if(!['gale','jezero'].includes(site))throw Error('Unknown wet world');return `astra.${site}.wetRoam.v1`;}
export function readWetSave(storage,site,basin){try{const s=JSON.parse(storage.getItem(wetSaveKey(site)));return s?.version===1&&Number.isFinite(s.position?.heading)&&basin.dry(s.position)?s:null;}catch{return null;}}
export function writeWetSave(storage,site,position,settings={}){try{storage.setItem(wetSaveKey(site),JSON.stringify({version:1,position:{x:position.x,y:position.y,heading:position.heading},...settings}));return true;}catch{return false;}}

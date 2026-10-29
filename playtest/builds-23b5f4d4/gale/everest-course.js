import {triangle} from '../mars-renderer/triangle.js';
import {skiCourse} from './ski-course.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
// Directions are actual world-space headings, not alternating lateral flag offsets.
// Long traverses establish 45/60 degree silhouettes; tighter links reward slowing.
export const EVEREST_HEADING_KNOTS=[[0,0],[650,0],[1100,Math.PI/4],[1900,Math.PI/4],[2350,-Math.PI/4],[3100,-Math.PI/4],[3450,0],[3700,0],[4100,Math.PI/3],[4300,Math.PI/3],[4700,-Math.PI/3],[5400,-Math.PI/3],[5750,Math.PI/4],[6400,Math.PI/4],[6750,-Math.PI/4],[7300,-Math.PI/4],[7750,0],[9200,0]];
export const EVEREST_GRADE_KNOTS=[[0,-.055],[500,-.09],[1100,-.34],[2100,-.29],[2600,-.06],[3300,-.08],[3900,-.30],[4700,-.27],[5300,-.07],[6000,-.11],[6900,-.25],[7700,-.34],[8500,-.14],[9200,-.05]];
const interpolate=(knots,s)=>{for(let i=1;i<knots.length;i++)if(s<=knots[i][0]){const [a,v]=knots[i-1],[b,w]=knots[i];return v+(w-v)*smooth((s-a)/(b-a));}return knots.at(-1)[1];};
/** Self-contained authored snow course. Every collision sample interpolates the rendered triangles. */
export function createEverestCourse({top={x:0,y:0},startHeight=2400,gridStep=24}={}){
 const route=[[top.x,top.y]],stations=[0],elevations=[startHeight];let x=top.x,y=top.y,z=startHeight;
 for(let s=0;s<9200;s+=40){const ds=Math.min(40,9200-s),h=interpolate(EVEREST_HEADING_KNOTS,s+ds/2);x+=Math.sin(h)*ds;y-=Math.cos(h)*ds;z+=interpolate(EVEREST_GRADE_KNOTS,s+ds/2)*ds;route.push([x,y]);stations.push(s+ds);elevations.push(z);}
 const frame=skiCourse(()=>0,null,route,{ramps:[],rollers:[],items:[]}),profile=s=>{s=clamp(s,0,9200);const i=Math.min(stations.length-2,Math.floor(s/40)),t=(s-stations[i])/40;return elevations[i]+(elevations[i+1]-elevations[i])*t;};
 const margin=950,minX=Math.floor((Math.min(...route.map(p=>p[0]))-margin)/gridStep)*gridStep,maxX=Math.ceil((Math.max(...route.map(p=>p[0]))+margin)/gridStep)*gridStep,minY=Math.floor((Math.min(...route.map(p=>p[1]))-margin)/gridStep)*gridStep,maxY=Math.ceil((top.y+margin)/gridStep)*gridStep;
 const xs=Float32Array.from({length:Math.round((maxX-minX)/gridStep)+1},(_,i)=>minX+i*gridStep),ys=Float32Array.from({length:Math.round((maxY-minY)/gridStep)+1},(_,i)=>minY+i*gridStep),cols=xs.length;
 const raw=(x,y)=>{const q=frame.coords(x,y),shoulder=Math.max(0,Math.abs(q.u)-240);return profile(q.s)+.000045*shoulder*shoulder;};
 const zs=Float32Array.from({length:cols*ys.length},(_,k)=>raw(xs[k%cols],ys[Math.floor(k/cols)]));
 const ground=(x,y)=>{const a=clamp((x-minX)/gridStep,0,cols-1.000001),b=clamp((y-minY)/gridStep,0,ys.length-1.000001),i=Math.floor(a),j=Math.floor(b),u=a-i,v=b-j,k=j*cols+i;return u+v<=1?zs[k]+(zs[k+1]-zs[k])*u+(zs[k+cols]-zs[k])*v:zs[k+cols+1]+(zs[k+cols]-zs[k+cols+1])*(1-u)+(zs[k+1]-zs[k+cols+1])*(1-v);};
 const bounds={minX,maxX,minY,maxY},surface={xs,ys,zs,height:ground,crop:{columns:cols,rows:ys.length}},worldTiles=[];
 for(let j0=0;j0<ys.length-1;j0+=24)for(let i0=0;i0<cols-1;i0+=24){const i1=Math.min(i0+24,cols-1),j1=Math.min(j0+24,ys.length-1),vertices=[],indices=[],w=i1-i0+1;
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const x=xs[i],y=ys[j],dx=ground(x-8,y)-ground(x+8,y),dy=ground(x,y-8)-ground(x,y+8),n=Math.hypot(dx,dy,16);vertices.push(x,y,zs[j*cols+i],dx/n,dy/n,16/n,.84,.90,.94);}
  for(let j=0;j<j1-j0;j++)for(let i=0;i<i1-i0;i++){const a=j*w+i;indices.push(a,a+1,a+w,a+1,a+w+1,a+w);}
  const tile={vertices:new Float32Array(vertices),indices:new Uint16Array(indices),minX:xs[i0],maxX:xs[i1],minY:ys[j0],maxY:ys[j1]};tile.low={...tile};worldTiles.push(tile);
 }
 const course={...skiCourse(ground,null,route,{ramps:[],rollers:[],items:[]}),route:route.map(([x,y])=>({x,y})),timeTrial:true,timedJump:false,naturalAir:false,landingScored:false,mode:'time-trial',title:'South Col · time trial',activity:'everest-time-trial',recordMode:'everest-time-trial',width:500,limit:180,finish:8800,finishHalf:150,terrainMesh:surface,lip:Infinity,missPenalty:3,drive:{thrust:22,limit:215,coastDrag:1.1},gates:[850,1600,2200,2900,3450,4050,4650,5200,5700,6250,6700,7200,7750,8500].map((s,i)=>({s,u:0,half:[100,85,65,80,60,85,60,75,55,75,55,75,90,110][i]})),worldHeight:ground};
 course.chapters=[{s:0,name:'South Col · gentle start'},{s:1000,name:'Steep snow face'},{s:2500,name:'Rolling traverse'},{s:3500,name:'Linked sixty-degree turns'},{s:5600,name:'Technical bends'},{s:7750,name:'Finish schuss'}];
 const mountain={...surface,bounds,top:course.top,base:course.base,route,variant:'everest-time-trial',height:ground,inside:(x,y)=>x>=minX&&x<=maxX&&y>=minY&&y<=maxY};
 // Render-only snow apron: starts on the exact core border, then meets the
 // skyline base. It cannot alter contact, course bounds, or the authored route.
 const center={x:top.x,y:top.y-4500},tau=Math.PI*2,angles=[...new Set([...Array.from(xs).flatMap(x=>[Math.atan2(x-center.x,center.y-minY),Math.atan2(x-center.x,center.y-maxY)]),...Array.from(ys).flatMap(y=>[Math.atan2(minX-center.x,center.y-y),Math.atan2(maxX-center.x,center.y-y)])].map(a=>(a+tau)%tau))].sort((a,b)=>a-b),rings=[[],[],[]],farZ=startHeight-2600;
 for(const a of angles){const dx=Math.sin(a),dy=-Math.cos(a),tx=dx>0?(maxX-center.x)/dx:dx<0?(minX-center.x)/dx:Infinity,ty=dy>0?(maxY-center.y)/dy:dy<0?(minY-center.y)/dy:Infinity,d=Math.min(tx,ty),x=center.x+dx*d,y=center.y+dy*d,z=ground(x,y);
  rings[0].push([x,y,z]);rings[1].push([center.x+dx*(d+1800),center.y+dy*(d+1800),z+(farZ-z)*.22]);rings[2].push([center.x+dx*18600,center.y+dy*18600,farZ]);
 }
 const apron=[];for(let ring=0;ring<2;ring++)for(let i=0;i<angles.length;i++){const j=(i+1)%angles.length,a=rings[ring][i],b=rings[ring][j],c=rings[ring+1][i],d=rings[ring+1][j];triangle(apron,a,b,c,[.84,.90,.94]);triangle(apron,b,d,c,[.84,.90,.94]);}
 const scenicApron={vertices:new Float32Array(apron),border:rings[0],farHeight:farZ};
 return {course,ground,surface,mountain,worldTiles,bounds:{minX,width:maxX,minY,maxY},route,profile,scenicApron};
}
export function createEverestWorld(options){return createEverestCourse(options);}

// An interpreted, compressed Mount Sharp next to the unchanged Curiosity patch.
// Elevation profile comes from the pinned summit survey; distances and jump are arcade fiction.
import {SUMMIT_PATH} from './ski-route.js';
import {skiCourse} from './ski-course.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const SLALOM_LENGTH=14000,FINAL_LIP=5700,CRATER_SECONDS=120;
export const SLALOM_GATES=Array.from({length:10},(_,i)=>({s:400+i*450,u:(i%2?1:-1)*(i<2?75:115),half:65}));
export function compactMountain(fine,broad,anchor){
 const base={x:anchor.x,y:anchor.y+360},top={x:base.x,y:base.y+SLALOM_LENGTH};
 const survey=skiCourse(broad.height,null,SUMMIT_PATH,{ramps:[],rollers:[],items:[]});
 const lo=survey.height(survey.length),hi=survey.height(0),floor=fine.height(base.x,base.y);
 const align=(v,origin,step,up=false)=>origin+(up?Math.ceil:Math.floor)((v-origin)/step)*step;
 const sx=fine.xs[1]-fine.xs[0],sy=fine.ys[1]-fine.ys[0];
 const bounds={minX:align(base.x-1100,fine.xs[0],sx),maxX:align(base.x+1100,fine.xs[0],sx,true),minY:align(base.y,fine.ys[0],sy),maxY:align(top.y+500,fine.ys[0],sy,true)};
 const raw=(x,y)=>{
  const s=top.y-y,u=x-base.x,z=fine.height(x,y);
  const edge=clamp((1100-Math.abs(u))/700,0,1),along=clamp((y-bounds.minY)/180,0,1)*clamp((bounds.maxY-y)/350,0,1);
  const w=edge*edge*(3-2*edge)*along;
  const surveyed=820*clamp((survey.height(clamp(s/SLALOM_LENGTH,0,1)*survey.length)-lo)/(hi-lo),0,1);
  // The slalom lane is groomed arcade terrain: compression must not turn
  // survey facets into dozens of unwanted jumps between the flags.
  const lane=1-clamp((Math.abs(u)-300)/200,0,1),runout=s<=FINAL_LIP?820-690*clamp(s/FINAL_LIP,0,1):130*clamp((SLALOM_LENGTH-s)/(SLALOM_LENGTH-FINAL_LIP),0,1),profile=surveyed*(1-lane)+runout*lane;
  // Broad shoulders frame the gates; the central track has no artificial side pull.
  const shoulders=38*(Math.max(0,Math.abs(u)-250)/450)**2;
  const t=(s-FINAL_LIP)/180;
  const jump=Math.abs(u)<230&&t>=-1&&t<.5?60*(t<=0?(t+1)**2:(1-t/.5)**2)*Math.cos(clamp(Math.abs(u)-130,0,100)/100*Math.PI/2)**2:0;
  return z*(1-w)+(floor+profile+shoulders+jump)*w;
 };
 // Contact interpolates the exact rendered triangles, including the launch lip.
 const step=20,xs=Float32Array.from({length:Math.ceil((bounds.maxX-bounds.minX)/20)+1},(_,i)=>Math.min(bounds.maxX,bounds.minX+i*step)),ys=Float32Array.from({length:Math.ceil((bounds.maxY-bounds.minY)/step)+1},(_,i)=>Math.min(bounds.maxY,bounds.minY+i*step));
 const cols=xs.length,zs=Float32Array.from({length:cols*ys.length},(_,i)=>raw(xs[i%cols],ys[Math.floor(i/cols)]));
 const inside=(x,y)=>x>=xs[0]&&x<=xs.at(-1)&&y>=ys[0]&&y<=ys.at(-1);
 const height=(x,y)=>{if(!inside(x,y))return fine.height(x,y);const a=clamp((x-xs[0])/step,0,cols-1.000001),b=clamp((y-ys[0])/step,0,ys.length-1.000001),i=Math.floor(a),j=Math.floor(b),u=clamp((x-xs[i])/(xs[i+1]-xs[i]),0,1),v=clamp((y-ys[j])/(ys[j+1]-ys[j]),0,1),k=j*cols+i;return u+v<=1?zs[k]+(zs[k+1]-zs[k])*u+(zs[k+cols]-zs[k])*v:zs[k+cols+1]+(zs[k+cols]-zs[k+cols+1])*(1-u)+(zs[k+1]-zs[k+cols+1])*(1-v);};
 return {xs,ys,zs,height,inside,bounds,top,base,crop:{columns:cols,rows:ys.length}};
}
export function galeCourses(ground,mountain,anchor){
 const options={ramps:[],rollers:[],items:[]};
 const slalom=skiCourse(ground,null,[[mountain.top.x,mountain.top.y],[mountain.base.x,mountain.base.y]],options);
 Object.assign(slalom,{mode:'slalom',naturalAir:true,gates:SLALOM_GATES,lip:FINAL_LIP,width:400,limit:90,finish:SLALOM_LENGTH-400,items:[{s:4800,u:0,kind:'slalom-boost',radius:100}],drive:{thrust:48,limit:360}});slalom.worldHeight=ground;
 // The local frame locates riders; it never confines them to a race track.
 const crater=skiCourse(ground,null,[[anchor.x,anchor.y-100],[anchor.x,anchor.y-1600]],options);
 Object.assign(crater,{mode:'crater',naturalAir:true,gates:[],width:2400,limit:CRATER_SECONDS,arena:{...anchor,radius:2200}});crater.worldHeight=ground;
 return {slalom,crater};
}

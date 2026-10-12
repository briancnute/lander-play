// A short northbound route inside the pinned lower Mount Sharp survey.
// The ski corridor and jumps are authored; surrounding relief is measured.
import {skiCourse} from './ski-course.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const SLALOM_LENGTH=14000,FINAL_LIP=5700,CRATER_SECONDS=120;
export const DOWNHILL_JUMPS=[{s:2200,u:430,rise:24,run:420,width:150},{s:4400,u:-430,rise:28,run:440,width:150},{s:8200,u:430,rise:24,run:420,width:160}];
export const SLALOM_GATES=Array.from({length:10},(_,i)=>({s:400+i*450,u:(i%2?1:-1)*(i<2?75:115),half:65}));
export function compactMountain(fine,broad,anchor){
 // Northward from the latest pinned Curiosity region, entirely within the
 // fine survey. The former southern extension ran beyond its last data row.
 const top={x:anchor.x,y:anchor.y},base={x:anchor.x,y:anchor.y-SLALOM_LENGTH};
 const align=(v,origin,step,up=false)=>origin+(up?Math.ceil:Math.floor)((v-origin)/step)*step;
 const sx=fine.xs[1]-fine.xs[0],sy=fine.ys[1]-fine.ys[0];
 const bounds={minX:align(base.x-2100,fine.xs[0],sx),maxX:align(base.x+2100,fine.xs[0],sx,true),minY:align(base.y-800,fine.ys[0],sy),maxY:align(top.y+800,fine.ys[0],sy,true)};
 const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
 // A wide filtered survey retains eroded ridges without making individual
 // DEM facets into suspension impulses. Source elevations remain pinned.
 const measured=(x,y)=>{let z=0;for(const [dx,dy,w]of [[0,0,4],[-120,0,2],[120,0,2],[0,-120,2],[0,120,2],[-240,0,1],[240,0,1],[0,-240,1],[0,240,1]])z+=fine.height(x+dx,y+dy)*w;return z/16;};
 const start=measured(top.x,top.y),end=measured(base.x,base.y);
 const raw=(x,y)=>{
  const s=top.y-y,u=x-top.x,z=fine.height(x,y);
  const edge=1-smooth((Math.abs(u)-700)/1400),along=smooth((y-bounds.minY)/800)*smooth((bounds.maxY-y)/800),w=edge*along;
  const local=measured(x,y),profile=start+(end-start)*clamp(s/SLALOM_LENGTH,0,1);
  const lane=1-smooth((Math.abs(u)-300)/500);
  // Broad open slope, no quadratic shoulder walls. Retain survey character
  // outside the central slalom lane with a gradual blend across the apron.
  let authored=local*(1-lane)+profile*lane;
  for(const r of [{s:FINAL_LIP,u:0,rise:26,run:650,width:230},...DOWNHILL_JUMPS]){
   const t=(s-r.s)/r.run,v=(u-r.u)/r.width;
   if(Math.abs(t)<1&&Math.abs(v)<1)authored+=r.rise*Math.cos(t*Math.PI/2)**2*Math.cos(v*Math.PI/2)**2;
  }
  return z*(1-w)+authored*w;
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
 Object.assign(slalom,{mode:'slalom',launchSpeed:30,jumpReward:12,tangentLaunch:true,naturalAir:true,gates:SLALOM_GATES,lip:FINAL_LIP,width:400,limit:90,finish:10000,items:[{s:4800,u:0,kind:'slalom-boost',radius:155}],drive:{thrust:48,limit:360}});slalom.worldHeight=ground;
 // Same downhill terrain in all modes; the path supplies progress, never force.
 const path=Array.from({length:141},(_,i)=>{const s=i*100;return [mountain.top.x+430*Math.sin(s*Math.PI/3000),mountain.top.y-s];});
 const crater=skiCourse(ground,null,path,options);
 Object.assign(crater,{mode:'crater',naturalAir:true,gates:[],width:900,limit:CRATER_SECONDS,jumps:DOWNHILL_JUMPS,downhill:true});crater.worldHeight=ground;
 return {slalom,crater};
}

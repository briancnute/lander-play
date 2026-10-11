import {skiCourse} from './ski-course.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export const SCORE_TRAIL_HALF=155,SCORE_BOUNDARY_HALF=235,SCORE_RETURN_SECONDS=3;
/** Authored sport overlay. Survey coordinates and encounter/finish anchors stay fixed. */
export function createScoreCourse(ground,anchor,finish){
 const end=finish??{x:anchor.x+115,y:anchor.y-4990,sol:4500};
 const knots=[[800,4500],[800,3300],[-400,1900],[-400,700],[0,0],[850,-1600],[850,-3000],[-500,-4100],[end.x-anchor.x,end.y-anchor.y]];
 const path=[];
 for(let i=1;i<knots.length;i++){
  const a=knots[i-1],b=knots[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/25);
  for(let j=0;j<n;j++){const t=j/n,e=t*t*t*(10+t*(-15+6*t));path.push([anchor.x+a[0]+(b[0]-a[0])*e,anchor.y+a[1]+(b[1]-a[1])*t]);}
 }
 path.push([end.x,end.y]);
 const c=skiCourse(ground,null,path,{ramps:[],rollers:[],items:[]});
 const jumps=[[800,4100],[-400,1800],[850,-1750]].map(([x,y],i)=>({s:c.coords(anchor.x+x,anchor.y+y).s,u:0,rise:20,run:220,width:145,launch:12,id:i}));
 Object.assign(c,{mode:'crater',scoreCourse:true,naturalAir:false,downhill:true,width:SCORE_BOUNDARY_HALF,trailHalf:SCORE_TRAIL_HALF,boundaryHalf:SCORE_BOUNDARY_HALF,returnSeconds:SCORE_RETURN_SECONDS,limit:120,gates:[],jumps,finish:c.length,finishAnchor:end,route:path.map(([x,y])=>({x,y})),rover:{...anchor,...c.coords(anchor.x,anchor.y),radius:42,sol:anchor.sol??5021,checked:'2026-10-11'}});
 // Orbs are on reachable grounded approaches/turns, clear of the three flight zones.
 const fractions=[.025,.16,.24,.29,.40,.48,.57,.61,.86,.94];
 c.orbs=fractions.map((f,i)=>({id:i,s:c.length*f,u:[0,45,-45,0,40,0,-40,0,45,0][i],radius:48,points:250}));
 // A continuous groomed grade passes through the real start, rover and finish
 // elevations; geology outside the shoulder blend remains untouched.
 const startHeight=ground(c.top.x,c.top.y),endHeight=ground(end.x,end.y),roverT=c.rover.s/c.length;
 const bend=(ground(anchor.x,anchor.y)-(startHeight+(endHeight-startHeight)*roverT))/(roverT*(1-roverT));
 const profile=s=>{const t=clamp(s/c.length,0,1);return startHeight+(endHeight-startHeight)*t+bend*t*(1-t);};
 const raw=(x,y)=>{
  const q=c.coords(x,y),p=c.point(q.s),distance=Math.hypot(x-p.x,y-p.y),w=1-smooth((distance-155)/300);
  if(!w)return ground(x,y);
  const center=profile(q.s);
  let z=center;
  for(const j of jumps){const t=(q.s-j.s)/j.run,side=Math.abs(q.u)/j.width;if(Math.abs(t)<1&&side<1)z+=j.rise*Math.cos(t*Math.PI/2)**2*Math.cos(side*Math.PI/2)**2;}
  return ground(x,y)*(1-w)+z*w;
 };
 const xs=c.route.map(p=>p.x),ys=c.route.map(p=>p.y),step=20;
 const bounds={minX:Math.floor((Math.min(...xs)-640)/step)*step,maxX:Math.ceil((Math.max(...xs)+640)/step)*step,minY:Math.floor((Math.min(...ys)-640)/step)*step,maxY:Math.ceil((Math.max(...ys)+640)/step)*step};
 const cols=Math.round((bounds.maxX-bounds.minX)/step)+1,rows=Math.round((bounds.maxY-bounds.minY)/step)+1;
 const zs=Float32Array.from({length:cols*rows},(_,i)=>raw(bounds.minX+i%cols*step,bounds.minY+Math.floor(i/cols)*step));
 const inside=(x,y)=>x>=bounds.minX&&x<=bounds.maxX&&y>=bounds.minY&&y<=bounds.maxY;
 const surface=(x,y)=>{
  if(!inside(x,y))return ground(x,y);
  const a=clamp((x-bounds.minX)/step,0,cols-1.000001),b=clamp((y-bounds.minY)/step,0,rows-1.000001),i=Math.floor(a),j=Math.floor(b),u=a-i,v=b-j,k=j*cols+i;
  return u+v<=1?zs[k]+(zs[k+1]-zs[k])*u+(zs[k+cols]-zs[k])*v:zs[k+cols+1]+(zs[k+cols]-zs[k+cols+1])*(1-u)+(zs[k+1]-zs[k+cols+1])*(1-v);
 };
 c.surface=c.worldHeight=surface;c.height=(s,u=0)=>{const p=c.point(s,u);return surface(p.x,p.y);};
 c.patch={bounds,cols,rows,step,zs,inside};
 return c;
}
export function scoreTerrainTiles(c){
 const {bounds,cols,rows,step,zs}=c.patch,tiles=[];
 for(let j=0;j<rows-1;j+=24)for(let i=0;i<cols-1;i+=24){
  const ei=Math.min(cols-1,i+24),ej=Math.min(rows-1,j+24),v=[],indices=[],width=ei-i+1;
  for(let y=j;y<=ej;y++)for(let x=i;x<=ei;x++){
   const px=bounds.minX+x*step,py=bounds.minY+y*step,dx=c.surface(px-10,py)-c.surface(px+10,py),dy=c.surface(px,py-10)-c.surface(px,py+10),len=Math.hypot(dx,dy,20);
   v.push(px,py,zs[y*cols+x],dx/len,dy/len,20/len,.65,.43,.30);
  }
  for(let y=0;y<ej-j;y++)for(let x=0;x<ei-i;x++){const a=y*width+x;indices.push(a,a+1,a+width,a+1,a+width+1,a+width);}
  tiles.push({vertices:new Float32Array(v),indices:new Uint16Array(indices),minX:bounds.minX+i*step,maxX:bounds.minX+ei*step,minY:bounds.minY+j*step,maxY:bounds.minY+ej*step});
 }
 return tiles;
}

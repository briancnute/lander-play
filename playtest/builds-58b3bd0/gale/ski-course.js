import {SUMMIT_PATH} from './ski-route.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distances=[0];for(let i=1;i<SUMMIT_PATH.length;i++)distances.push(distances.at(-1)+Math.hypot(SUMMIT_PATH[i][0]-SUMMIT_PATH[i-1][0],SUMMIT_PATH[i][1]-SUMMIT_PATH[i-1][1]));
export const LENGTH=distances.at(-1),WIDTH=1450;
// Broad alternate lines: a flowing central descent and staggered optional jump groups.
export const RAMPS=Array.from({length:34},(_,i)=>({s:1100+i*(LENGTH-2800)/34,u:[-380,320,80,510,-520,190][i%6],rise:[26,38,30,44][i%4],run:260+(i%3)*55,width:150+(i%2)*45}));
export const ROLLERS=RAMPS.flatMap((r,i)=>[{s:r.s+950,u:-r.u*.6,rise:10+(i%3)*4,run:200,width:220},{s:r.s+1900,u:r.u*.4,rise:8,run:260,width:250}]).filter(r=>r.s<LENGTH-600);
export const ITEMS=RAMPS.map((r,i)=>({s:r.s-r.run-130,u:r.u,boost:2.2,id:i}));
const features=[...RAMPS,...ROLLERS];
export function skiCourse(ground,top=null,path=SUMMIT_PATH){
 const nodes=top?[[top.x,top.y],[top.x,top.y-LENGTH]]:path;
 const ds=[0];for(let i=1;i<nodes.length;i++)ds.push(ds.at(-1)+Math.hypot(nodes[i][0]-nodes[i-1][0],nodes[i][1]-nodes[i-1][1]));
 const length=ds.at(-1),sample=s=>{s=clamp(s,0,length);let lo=0,hi=ds.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(ds[m]<=s)lo=m;else hi=m;}const a=nodes[lo],b=nodes[hi],d=ds[hi]-ds[lo],t=(s-ds[lo])/d,dx=(b[0]-a[0])/d,dy=(b[1]-a[1])/d;return {x:a[0]+(b[0]-a[0])*t,y:a[1]+(b[1]-a[1])*t,dx,dy};};
 const point=(s,u=0)=>{const p=sample(s);return {x:p.x-p.dy*u,y:p.y+p.dx*u};};
 const coords=(x,y)=>{let best=Infinity,q={s:0,u:0};for(let i=1;i<nodes.length;i++){const a=nodes[i-1],b=nodes[i],dx=b[0]-a[0],dy=b[1]-a[1],len=ds[i]-ds[i-1],t=clamp(((x-a[0])*dx+(y-a[1])*dy)/(len*len),0,1),ex=x-a[0]-dx*t,ey=y-a[1]-dy*t,d=ex*ex+ey*ey;if(d<best){best=d;q={s:ds[i-1]+len*t,u:(-dy*ex+dx*ey)/len};}}return q;};
 const relief=(s,u)=>{let h=0;for(const r of features){const side=Math.abs(u-r.u)/r.width;if(side>=1)continue;const t=(s-r.s)/r.run;if(t< -1||t> .55)continue;const profile=t<=0?(t+1)**2:Math.max(0,1-t/.55)**2;h+=r.rise*profile*Math.cos(side*Math.PI/2)**2;}return h;};
 const height=(s,u=0)=>{const p=point(s,u);return ground(p.x,p.y)+relief(s,u);};
 const surface=(x,y)=>{const q=coords(x,y);return ground(x,y)+(q.s>0&&q.s<length?relief(q.s,q.u):0);};
 const heading=s=>{const p=sample(s);return Math.atan2(p.dx,-p.dy);};
 const curvature=s=>{const a=heading(s-150),b=heading(s+150);return Math.atan2(Math.sin(b-a),Math.cos(b-a))/300;};
 return {point,height,coords,surface,curvature,heading,relief,top:point(0),base:point(length),length,width:WIDTH,ramps:RAMPS,rollers:ROLLERS,items:ITEMS};
}
export const itemAltitude=(course,item)=>course.height(item.s,item.u)+12;

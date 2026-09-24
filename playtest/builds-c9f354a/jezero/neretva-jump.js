import {toGame} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
export const jumpSite={id:'neretva-jump',name:'Neretva crossing',category:'LONG JUMP',goal:'Link all three boost zones and land to complete the crossing. Choose your launch line for distance; hold Slow in flight to shorten the landing. No minimum distance.',...toGame(-5118,1778),start:{...toGame(-5118,1778),heading:0},lip:toGame(-5118,2028)};
export const boostRows=[1825,1903,1981].map(n=>[-22,0,22].map(e=>({...toGame(-5118+e,n),r:75})));
// A local authored earthen crest, not a change to Neretva's surveyed channel.
// Collision and rendering interpolate exactly the same triangles.
export function jumpRamp(base){
 const center=jumpSite.lip,step=8,nx=41,ny=101,x0=center.x-160,y0=center.y-400,z=[];
 const bump=(x,y)=>{const across=(x-center.x)/160,along=(y-center.y)/400;return Math.abs(across)<1&&Math.abs(along)<1?60*Math.cos(across*Math.PI/2)**4*Math.cos(along*Math.PI/2)**2:0;};
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const x=x0+i*step,y=y0+j*step;z.push(base(x,y)+bump(x,y));}
 const ground=(x,y)=>{const u=(x-x0)/step,v=(y-y0)/step;if(u<=0||v<=0||u>=nx-1||v>=ny-1)return base(x,y);const i=Math.floor(u),j=Math.floor(v),a=j*nx+i,b=a+1,c=a+nx,d=c+1,dx=u-i,dy=v-j;return dx+dy<=1?z[a]+(z[b]-z[a])*dx+(z[c]-z[a])*dy:z[d]+(z[c]-z[d])*(1-dx)+(z[b]-z[d])*(1-dy);};
 const vertices=[],point=(i,j)=>[x0+i*step,y0+j*step,z[j*nx+i]+.08];
 for(let j=0;j<ny-1;j++)for(let i=0;i<nx-1;i++){const c=[.66,.44,.30];triangle(vertices,point(i,j),point(i+1,j),point(i,j+1),c);triangle(vertices,point(i+1,j),point(i+1,j+1),point(i,j+1),c);}
 return {ground,vertices:new Float32Array(vertices)};
}
export function advanceBoost(s,before,stage){
 if(s.air||stage>=boostRows.length)return stage;
 const dx=s.x-before.x,dy=s.y-before.y,l=dx*dx+dy*dy;
 if(boostRows[stage].some(p=>{const t=l?Math.max(0,Math.min(1,((p.x-before.x)*dx+(p.y-before.y)*dy)/l)):0;return Math.hypot(before.x+dx*t-p.x,before.y+dy*t-p.y)<p.r;})){s.boost=s.tune.boostSeconds;return stage+1;}return stage;
}

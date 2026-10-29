import {triangle} from '../mars-renderer/triangle.js';
/** Permanent course endpoints in the common world, independent of race state. */
export function slalomLandmarks(courses){
 const v=[];
 for(const c of courses)for(const finish of [false,true]){
  const s=finish?c.finish:0;
  for(const u of [-165,165]){const p=c.point(s,u),z=c.worldHeight(p.x,p.y);box(v,p.x-1.5,p.y-1.5,z,3,3,20,[.34,.42,.43]);box(v,p.x-2,p.y-2,z+16,4,4,4,finish?[.94,.91,.78]:[.53,.87,.76]);}
  if(finish){const p=(s,u)=>{const q=c.point(s,u);return [q.x,q.y,c.worldHeight(q.x,q.y)+.5];};for(let a=s-20;a<s+20;a+=10)for(let u=-150;u<150;u+=25){const color=(Math.round((a-s)/10)+Math.round(u/25))%2?[.87,.88,.74]:[.19,.28,.28];triangle(v,p(a,u),p(a+10,u),p(a,u+25),color);triangle(v,p(a+10,u),p(a+10,u+25),p(a,u+25),color);}}
 }
 return new Float32Array(v);
}

function box(out,x,y,z,w,d,h,color){const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];for(const [a,b,c,d]of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]){triangle(out,p[a],p[b],p[c],color);triangle(out,p[a],p[c],p[d],color);}}

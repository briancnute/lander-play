import {triangle} from '../mars-renderer/triangle.js';
const gold=[1,.76,.32];
export function groundTriangle(out,c,s,u=0,half=10,length=46){
 const p=(s,u)=>{const q=c.point(s,u);return [q.x,q.y,c.height(s,u)+.6];};
 triangle(out,p(s+length/2,u),p(s-length/2,u+half),p(s-length/2,u-half),gold);
}
// Like a fast-forward icon, rotated uphill: three compact solid triangles.
export function jumpTriangles(out,c,lip){for(const d of [150,95,40])groundTriangle(out,c,lip-d);}
export function boostBar(out,c,s,half=155){for(let u=-half+10;u<half;u+=20)groundTriangle(out,c,s,u,9,44);}

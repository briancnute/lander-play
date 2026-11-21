import {triangle} from '../mars-renderer/triangle.js';
// Keep the aircraft geometry independent of terrain-loading modules.
function box(out,x,y,z,w,d,h,color){const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];for(const [a,b,c,d]of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]){triangle(out,p[a],p[b],p[c],color);triangle(out,p[a],p[c],p[d],color);}}
// NASA/JPL anatomy reference: 1.2 m rotors; 13.6 x 19.5 x 16.3 cm fuselage.
// Uniform presentation scale keeps the tiny robot legible in the follow camera.
export const INGENUITY={rotorDiameter:130,bodyWidth:130*.136/1.2,bodyLength:130*.195/1.2,bodyHeight:130*.163/1.2,legCount:4};
const carbon=[.15,.17,.17],gold=[.84,.69,.35],foil=[.93,.79,.46],metal=[.49,.51,.47];
function strut(v,a,b,r,color){const d=b.map((n,i)=>n-a[i]),length=Math.hypot(...d),axis=d.map(n=>n/length),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],raw=cross(axis,Math.abs(axis[2])>.9?[1,0,0]:[0,0,1]),n=Math.hypot(...raw),u=raw.map(x=>x/n),w=cross(axis,u),point=(p,t)=>p.map((x,i)=>x+r*(u[i]*Math.cos(t)+w[i]*Math.sin(t)));for(let i=0;i<6;i++){const t=i*Math.PI/3,q=(i+1)*Math.PI/3,aa=point(a,t),ab=point(a,q),ba=point(b,t),bb=point(b,q);triangle(v,aa,ab,ba,color);triangle(v,ab,bb,ba,color);}}
function rotor(z){const v=[];for(const side of [-1,1]){const outline=[[5,-1.5],[14,-3.6],[34,-4.8],[54,-3.8],[65,-1.8],[64,1.4],[49,2.5],[20,2],[5,1.5]].map(([x,y])=>[x*side,y*side,z]);for(let i=1;i<outline.length-1;i++){triangle(v,outline[0],outline[i],outline[i+1],carbon);triangle(v,outline[0].map((x,j)=>j===2?x-.65:x),outline[i+1].map((x,j)=>j===2?x-.65:x),outline[i].map((x,j)=>j===2?x-.65:x),[.21,.22,.21]);}}box(v,-3,-3,z-1.3,6,6,2.6,metal);return v;}
export function buildIngenuityGeometry(){
 const body=[],w=INGENUITY.bodyWidth,l=INGENUITY.bodyLength,h=INGENUITY.bodyHeight;
 box(body,-w/2,-l/2,-10,w,l,h,gold);
 // Faceted insulation foil adds visible folds without a photographic texture.
 for(const side of [-1,1]){const x=side*w/2;triangle(body,[x,-l/2,-10],[x,l/2,-10],[x,0,5.5],foil);triangle(body,[-w/2,side*l/2,7.7],[w/2,side*l/2,7.7],[1,side*l/2,-6],[.75,.60,.31]);}
 box(body,-w/2-.8,-l/2-.8,7.7,w+1.6,l+1.6,1.4,metal);
 for(const sx of [-1,1])for(const sy of [-1,1]){const knee=[sx*12,sy*14,9],foot=[sx*31,sy*31,-24];strut(body,[sx*w*.35,sy*l*.35,8],knee,.65,metal);strut(body,knee,foot,.75,carbon);box(body,foot[0]-1.8,foot[1]-1.8,-25,3.6,3.6,2,carbon);}
 strut(body,[0,0,9],[0,0,55],1.35,metal);for(const z of [15,23,36,44])box(body,-3,-3,z,6,6,2.5,carbon);
 // Fixed solar array above BOTH independently moving rotor planes.
 box(body,-24,-9,53,48,18,1.3,metal);for(let x=0;x<6;x++)for(let y=0;y<2;y++)box(body,-23+x*7.8,-8+y*8,54.35,7.3,7.3,.18,[.12+x*.006,.22,.29+y*.025]);
 box(body,-2,-2,54.6,4,4,2.5,[.24,.33,.23]);strut(body,[1,0,57],[1,0,67],.35,carbon);
 // Small horizon camera and downward navigation camera; no cockpit or cargo bay.
 box(body,-3,5,-12,6,5,3,carbon);box(body,-1.8,10.05,-11.5,3.6,.3,2,[.05,.13,.16]);box(body,-2,-2,-12.5,4,4,2.5,carbon);
 return {body:new Float32Array(body),lowerRotor:new Float32Array(rotor(27)),upperRotor:new Float32Array(rotor(42))};
}
export function ingenuityRotorAngles(time){const angle=(time*32)%(Math.PI*2);return [angle,Math.PI/2-angle];}
export function ingenuityMeshes(gpu){const geometry=buildIngenuityGeometry();return {body:gpu.upload(geometry.body),lowerRotor:gpu.upload(geometry.lowerRotor),upperRotor:gpu.upload(geometry.upperRotor),identity:'Ingenuity',proportions:INGENUITY};}

import {toGame} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';

// Shape studies, not photogrammetry. Translation follows the Mars map; all
// object dimensions use the same four game units/metre in x, y and z.
export const structurePlan=[
 {id:'delta-ledges',east:-80,north:-230,angle:.32,length:9,width:4.5,rise:2.8,type:'ledge',reference:'balanced.jpg'},
 {id:'fallen-slab',east:-70,north:-400,angle:-.55,length:6.5,width:2.7,rise:.65,type:'slab',reference:'balanced.jpg'},
 {id:'artuby-benches',east:2165,north:-1755,angle:-.38,length:12,width:4,rise:1.6,type:'bench',reference:'PIA24747'},
 {id:'rochette',east:2211.101612,north:-1793.949906,angle:.60,length:1.3,width:.8,rise:.35,type:'rochette',reference:'PIA24767'},
];
const outline=[[-.50,-.26],[-.37,-.44],[-.09,-.5],[.18,-.44],[.46,-.25],[.5,.06],[.34,.36],[.06,.49],[-.25,.42],[-.46,.21]];
export function buildRockStructures(ground){
 const vertices=[],parts=[],structures=[];
 function piece(parent,offset,length,width,rise,angle,levels,tilt=0,seed=0){
  const cx=parent.x+offset[0]*4,cy=parent.y+offset[1]*4,c=Math.cos(angle),s=Math.sin(angle),point=(u,v)=>[cx+(u*c-v*s)*4,cy+(u*s+v*c)*4];
  const base=ground(cx,cy),rings=[];
  const perimeter=outline.flatMap((p,i)=>{const q=outline[(i+1)%outline.length];return [0,1/3,2/3].map(t=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);});
  for(const [z,scale]of levels){
   rings.push(perimeter.map(([u,v],i)=>{const chip=.026*Math.sin(i*2.7+seed)+.018*Math.sin(i*4.2+z*6),front=v>0?scale:1+(scale-1)*.3,[x,y]=point(u*length*(1+(scale-1)*.35+chip)+length*.04*z,v*width*(front+chip)),top=base+rise*4*z+u*length*tilt*4+rise*.18*Math.sin(i*.63+seed)+.12*Math.sin(i*1.7+seed);return [x,y,z===0?Math.min(ground(x,y)-.7,top-.5):Math.max(ground(x,y)+.03,top)];}));
  }
  for(let k=0;k<rings.length-1;k++)for(let i=0;i<perimeter.length;i++){
   const j=(i+1)%perimeter.length,grain=.022*Math.sin(seed+i*1.91+k*.8),shade=k%3===1?-.007:0,color=[.64+grain+shade,.46+grain*.8+shade,.315+grain*.6+shade*.6];
   triangle(vertices,rings[k][i],rings[k][j],rings[k+1][i],color);triangle(vertices,rings[k][j],rings[k+1][j],rings[k+1][i],color);
  }
  // Faceted cap with shallow irregular relief, not a featureless flat lid.
  const top=rings.at(-1),center=[cx,cy,base+rise*4+.06];
  for(let i=0;i<top.length;i++)triangle(vertices,center,top[i],top[(i+1)%top.length],[.67+.018*Math.sin(i+seed),.49,.34]);
  // Actual polygon footprint, not an oversized circular invisible wall.
  const poly=outline.map(([u,v])=>point(u*length*1.1+length*.045,v*width*1.1));
  const roof=Math.max(...rings.flat().map(p=>p[2]));parts.push({poly,roof,structure:parent.id});
 }
 for(const spec of structurePlan){
  const p={...spec,...toGame(spec.east,spec.north)},start=vertices.length;
  if(spec.type==='ledge'){
   // Two differently sized blocks, with an actual fracture between them.
   piece(p,[-1.9,0],5.3,4.5,2.5,p.angle,[[0,1],[.40,.91],[.48,1.04],[.57,.97],[.68,1.02],[.77,.94],[.83,1],[1,.93]],.025,2);
   piece(p,[3.1,1.9],3.5,3.1,1.5,p.angle+.48,[[0,1],[.37,.95],[.48,1.02],[.63,.94],[.72,.98],[1,.86]],.04,7);
  }else if(spec.type==='bench'){
   piece(p,[-2,0],6.8,4.1,1.1,p.angle,[[0,1],[.34,.98],[.41,1.02],[.64,.95],[.72,1],[1,.90]],.035,11);
   piece(p,[3.3,1.3],3.4,2.5,.62,p.angle+.65,[[0,1],[.35,.97],[.44,1.03],[1,.86]],-.035,12);
   piece(p,[-5,2.3],2.3,1.7,.45,p.angle-.45,[[0,1],[.38,.98],[.51,1.02],[1,.85]],.045,13);
  }else if(spec.type==='slab'){
   piece(p,[0,0],spec.length,spec.width,spec.rise,p.angle,[[0,.90],[.27,1],[.76,.97],[1,.86]],.095,17);
  }else{
   // Rochette's low elongated body, bevelled sides and broad rough upper face.
   piece(p,[0,0],spec.length,spec.width,spec.rise,p.angle,[[0,.79],[.22,1],[.67,.94],[1,.68]],.035,23);
  }
  structures.push({...p,vertexStart:start/9,vertexCount:(vertices.length-start)/9});
 }
 return {vertices:new Float32Array(vertices),parts,structures};
}

export function insideStructure(x,y,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}

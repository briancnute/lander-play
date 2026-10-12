import {triangle} from '../mars-renderer/triangle.js';
import {groundTriangle} from './ski-markers.js';
// All surfaces are fitted to the same contact mesh; these materials add no bumps.
function face(out,c,s0,s1,u0,u1,color,lift=.38){
 const p=(s,u)=>{const q=c.point(s,u);return [q.x,q.y,c.height(s,u)+lift];};
 for(let s=s0;s<s1;s+=10)for(let u=u0;u<u1;u+=10){const b=Math.min(s1,s+10),v=Math.min(u1,u+10);triangle(out,p(s,u),p(b,u),p(s,v),color);triangle(out,p(b,u),p(b,v),p(s,v),color);}
}
export function turboInlay(c,s,half=155){
 const stone=[],light=[],spent=[];
 face(stone,c,s-27,s+27,-half,half,[.24,.12,.085]);
 const count=12,cell=half*2/count;
 for(let i=0;i<count;i++){const u=-half+(i+.5)*cell;
  face(stone,c,s-24,s+24,u-cell/2+1,u+cell/2-1,[.39+(i%3)*.015,.20,.12],.45);
  // Copper bevel and warm inlay, with a muted state after the drive-over pickup.
  groundTriangle(stone,c,s,u,10.8,40,[.62,.28,.12],.55);
  groundTriangle(light,c,s,u,9.3,35,[1,.60,.32],.65);
  groundTriangle(spent,c,s,u,9.3,35,[.47,.22,.12],.65);
 }
 return {stone,light,spent};
}
export function basaltKicker(c){
 const rock=[],seams=[],lip=c.lip,start=lip-410;
 // Color the exact world terrain triangles, so the stone skin cannot flicker
 // against or float above the collision surface, including the irregular skirts.
 const m=c.terrainMesh,{xs,ys,zs}=m,cols=xs.length;
 const corners=[c.point(start-30,-280),c.point(start-30,280),c.point(lip+130,-280),c.point(lip+130,280)],minX=Math.min(...corners.map(p=>p.x)),maxX=Math.max(...corners.map(p=>p.x)),minY=Math.min(...corners.map(p=>p.y)),maxY=Math.max(...corners.map(p=>p.y));
 const vertex=k=>[xs[k%cols],ys[Math.floor(k/cols)],zs[k]+.12];
 for(let j=0;j<ys.length-1;j++)if(ys[j]>=minY&&ys[j]<=maxY)for(let i=0;i<xs.length-1;i++)if(xs[i]>=minX&&xs[i]<=maxX){
  const k=j*cols+i;
  for(const ids of [[k,k+1,k+cols],[k+1,k+cols+1,k+cols]]){
   const verts=ids.map(vertex),q=c.coords(verts.reduce((n,p)=>n+p[0],0)/3,verts.reduce((n,p)=>n+p[1],0)/3),edge=236+10*Math.sin(q.s*.057)+5*Math.sin(q.s*.13);
   if(q.s<start||q.s>lip+100||Math.abs(q.u)>edge)continue;
   const rib=Math.floor((q.u+144)/36),grain=Math.sin(k*12.9898+ids[0]*.013)*.014,tone=(Math.abs(q.u)<145?.34+(rib%3)*.012:.28)+grain;
   const blend=Math.max(0,Math.min(1,(q.s-start)/35,(lip+100-q.s)/30,(edge-Math.abs(q.u))/28)),dust=[.65,.43,.30],stone=[tone,tone*.69,tone*.53];
   triangle(rock,...verts,stone.map((n,i)=>dust[i]*(1-blend)+n*blend));
  }
 }
 // Long carved channels, with sparse staggered joints rather than a tiled grid.
 for(let i=0;i<9;i++){const u=-144+i*36;face(seams,c,start+18,lip-12,u,u+1.4,[.16,.073,.045],.4);}
 for(let i=0;i<8;i++){const u=-144+i*36,s=start+80+(i*71)%245;face(seams,c,s,s+1.1,u+3,u+32,[.20,.10,.06],.4);}
 face(rock,c,lip-5,lip+4,-146,146,[.44,.27,.18],.58);
 return {rock,seams};
}

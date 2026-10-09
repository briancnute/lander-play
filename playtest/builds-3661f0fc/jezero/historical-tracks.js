import {triangle} from '../mars-renderer/triangle.js';
/** Paired faint wheel impressions with broken angled treads, using recorded route segments. */
export function createHistoricalTracks(gpu,segments,ground){
 const buckets=new Map(),size=768;
 for(const segment of segments)for(let i=1;i<segment.points.length;i++){
  const a=segment.points[i-1],b=segment.points[i],d=Math.hypot(b.x-a.x,b.y-a.y);if(!d)continue;
  const dx=(b.x-a.x)/d,dy=(b.y-a.y)/d,nx=-dy,ny=dx;
  for(let s=0;s<d;s+=3){const length=Math.min(2.7,d-s),cx=a.x+dx*s,cy=a.y+dy*s,key=Math.floor(cx/size)+','+Math.floor(cy/size);
   if(!buckets.has(key))buckets.set(key,{x:Math.floor(cx/size)*size+size/2,y:Math.floor(cy/size)*size+size/2,vertices:[],mesh:null});const v=buckets.get(key).vertices;
   for(const side of [-1,1]){
    const point=(along,across)=>{const x=cx+dx*along+nx*(side*3.8+across),y=cy+dy*along+ny*(side*3.8+across);return [x,y,ground(x,y)+.1];};
    const color=[.19,.14,.10],corners=[point(0,-.65),point(.5,.65),point(length,-.65),point(length+.5,.65)];
    triangle(v,corners[0],corners[1],corners[2],color);triangle(v,corners[1],corners[3],corners[2],color);
    // Slim transverse impressions within each wheel lane, separated by unmarked dust.
    const t=[point(.6,-.75),point(.9,.75),point(1,-.75),point(1.3,.75)];triangle(v,t[0],t[1],t[2],[.10,.075,.05]);triangle(v,t[1],t[3],t[2],[.10,.075,.05]);
   }
  }
 }
 return {buckets,draw(s){const gl=gpu.gl;gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1,-1);for(const b of buckets.values()){const d=Math.hypot(b.x-s.x,b.y-s.y);if(d>2400&&b.mesh){gl.deleteBuffer(b.mesh.b);b.mesh=null;}if(d>1400)continue;b.mesh??=gpu.upload(new Float32Array(b.vertices));gpu.mesh(b.mesh,[0,0,0,100],9);}gl.disable(gl.POLYGON_OFFSET_FILL);gl.depthMask(true);gl.disable(gl.BLEND);}};
}

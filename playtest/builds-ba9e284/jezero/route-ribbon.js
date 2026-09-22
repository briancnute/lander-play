import {triangle} from '../mars-renderer/geometry.js';

// World-space ribbon: depth testing, rather than a screen overlay, hides it behind hills.
export function createRouteRibbon(gpu,segments,ground){
 const buckets=new Map(),size=1024,halfWidth=1.1;
 for(const segment of segments)for(let i=1;i<segment.points.length;i++){
  const a=segment.points[i-1],b=segment.points[i],length=Math.hypot(b.x-a.x,b.y-a.y);if(!length)continue;
  const nx=-(b.y-a.y)/length*halfWidth,ny=(b.x-a.x)/length*halfWidth,steps=Math.ceil(length/6);
  for(let k=0;k<steps;k++){const at=t=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}),p=at(k/steps),q=at((k+1)/steps),key=Math.floor(p.x/size)+','+Math.floor(p.y/size);
   if(!buckets.has(key))buckets.set(key,{x:Math.floor(p.x/size)*size+size/2,y:Math.floor(p.y/size)*size+size/2,vertices:[],mesh:null});
   const point=(p,side)=>{const x=p.x+nx*side,y=p.y+ny*side;return [x,y,ground(x,y)+.12];},v=buckets.get(key).vertices,c=[.86,.77,.56],corners=[point(p,-1),point(p,1),point(q,-1),point(q,1)];triangle(v,corners[0],corners[1],corners[2],c);triangle(v,corners[1],corners[3],corners[2],c);
  }
 }
 return {buckets,draw(state){const gl=gpu.gl;gl.enable(gl.DEPTH_TEST);gl.depthMask(false);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1,-1);for(const tile of buckets.values()){const distance=Math.hypot(tile.x-state.x,tile.y-state.y);if(distance>4000&&tile.mesh){gl.deleteBuffer(tile.mesh.b);tile.mesh=null;}if(distance>2400)continue;tile.mesh??=gpu.upload(new Float32Array(tile.vertices));gpu.mesh(tile.mesh,[0,0,0,100],1);}gl.disable(gl.POLYGON_OFFSET_FILL);gl.depthMask(true);}};
}

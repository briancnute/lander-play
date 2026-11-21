import {triangle} from '../mars-renderer/triangle.js';
// Raw recorded segments only: never bridge gaps or replace them with the tour line.
// Store line fragments, building tread meshes only for nearby tiles.
export function createRecordedTreads(gpu,segments,ground){
 const appearance=gpu.area?.recordedTreadAppearance;
 const {halfWidth=1.45,halfTrack=4.5}=gpu.area?.recordedTreadProfile??{},ribHalfWidth=gpu.area?.recordedTreadProfile?.halfWidth??1.55,size=512,tiles=new Map();
 for(const segment of segments)for(let i=1;i<segment.points.length;i++){
  const a=segment.points[i-1],b=segment.points[i],d=Math.hypot(b.x-a.x,b.y-a.y);if(!d)continue;
  const n=Math.ceil(d/32);for(let k=0;k<n;k++){
   const x=a.x+(b.x-a.x)*k/n,y=a.y+(b.y-a.y)*k/n,key=Math.floor(x/size)+','+Math.floor(y/size);
   if(!tiles.has(key))tiles.set(key,{x:Math.floor(x/size)*size+size/2,y:Math.floor(y/size)*size+size/2,lines:[],mesh:null});
   tiles.get(key).lines.push([x,y,(b.x-a.x)/d,(b.y-a.y)/d,d/n]);
  }
 }
 function build(tile){const v=[];
  for(const [x,y,dx,dy,d]of tile.lines)for(let s=0;s<d;s+=4)for(const side of [-1,1]){
   const point=(along,across)=>{const px=x+dx*(s+along)-dy*(side*halfTrack+across),py=y+dy*(s+along)+dx*(side*halfTrack+across);return [px,py,ground(px,py)+.16];};
   const quad=(a,b,c,e,color)=>{triangle(v,a,b,c,color);triangle(v,b,e,c,color);},length=Math.min(4,d-s);
   if(appearance){
    // Same lane envelope; feather inward to undisturbed soil at each edge.
    const inner=halfWidth*(1-appearance.feather);
    for(const [lo,hi,left,right]of [[-halfWidth,-inner,1,appearance.lane],[-inner,inner,appearance.lane,appearance.lane],[inner,halfWidth,appearance.lane,1]]){
     const start=v.length;quad(point(0,lo),point(0,hi),point(length,lo),point(length,hi),[left,left,left]);
     for(const index of [1,3,4])for(let c=0;c<3;c++)v[start+index*9+6+c]=right;
    }
   }else quad(point(0,-halfWidth),point(0,halfWidth),point(length,-halfWidth),point(length,halfWidth),[.37,.255,.175]);
   // Broad diagonal ribs remain legible as a pair of wheel lanes, not a route stripe.
   if(length>1.4){
    const width=ribHalfWidth*(appearance?1-appearance.feather:1);
    quad(point(.4,-width),point(1.1,width),point(1,-width),point(1.7,width),appearance?[appearance.rib,appearance.rib,appearance.rib]:[.23,.16,.11]);
   }
  }
  // Match the terrain's upward lighting normal. A ribbon's winding can face
  // down; using that normal would turn even its soil-colored edge dark.
  if(appearance)for(let i=0;i<v.length;i+=9){const x=v[i],y=v[i+1],dx=ground(x-8,y)-ground(x+8,y),dy=ground(x,y-8)-ground(x,y+8),n=Math.hypot(dx,dy,16);v[i+3]=dx/n;v[i+4]=dy/n;v[i+5]=16/n;}
  return gpu.upload(new Float32Array(v));
 }
 return {tiles,draw(state){const gl=gpu.gl;gl.enable(gl.DEPTH_TEST);gl.depthMask(false);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-2,-2);
  for(const tile of tiles.values()){const d=Math.hypot(tile.x-state.x,tile.y-state.y);if(d>2100&&tile.mesh){gl.deleteBuffer(tile.mesh.b);tile.mesh=null;}if(d>1500)continue;tile.mesh??=build(tile);gpu.mesh(tile.mesh,[0,0,0,100],appearance?.material??1);}
  gl.disable(gl.POLYGON_OFFSET_FILL);gl.depthMask(true);
 }};
}

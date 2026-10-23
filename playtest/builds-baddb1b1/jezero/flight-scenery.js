import {perseveranceBody,drivingWheel} from '../mars-renderer/driving-models.js';
import {wheelPivots} from '../mars-renderer/geometry.js';
import {createHistoricalTracks} from './historical-tracks.js';
import {flightTrackSegments} from './flight-track-data.js';
// Reuse actual ground-travel geometry; never draw invented tracks along an air route.
export function createFlightScenery(gpu,course,ground,segments=[]){
 const cells=new Map();for(const tile of gpu.area?.worldTiles??[])for(let y=Math.floor(tile.minY/1024);y<=Math.floor(tile.maxY/1024);y++)for(let x=Math.floor(tile.minX/1024);x<=Math.floor(tile.maxX/1024);x++){const key=x+','+y;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(tile);}
 const renderedGround=(x,y)=>{const tile=cells.get(Math.floor(x/1024)+','+Math.floor(y/1024))?.find(t=>x>=t.minX&&x<=t.maxX&&y>=t.minY&&y<=t.maxY);return tile?.low?.height(x,y)??ground(x,y);};
 const nearby=flightTrackSegments(course,segments),tracks=createHistoricalTracks(gpu,nearby,renderedGround,{range:16000,spacing:6,kind:11,color:[.50,.34,.23],treadColor:[.40,.28,.19],observer:()=>gpu.lastCamera}),r=course.roverSnapshot;let rover=null,roverPose=null;
 if(r){const out=[],heading=r.heading??1.626897803,c=Math.cos(heading),s=Math.sin(heading),z=renderedGround(r.x,r.y),sx=(renderedGround(r.x+4,r.y)-renderedGround(r.x-4,r.y))/8,sy=(renderedGround(r.x,r.y+4)-renderedGround(r.x,r.y-4))/8;
  const add=(data,ox=0,oy=0)=>{for(let i=0;i<data.length;i+=9){const x=data[i]+ox,y=data[i+1]+oy,dx=x*c+y*s,dy=x*s-y*c,nx=data[i+3]*c+data[i+4]*s,ny=data[i+3]*s-data[i+4]*c;out.push(r.x+dx,r.y+dy,z+data[i+2]+sx*dx+sy*dy,nx,ny,data[i+5],data[i+6],data[i+7],data[i+8]);}};
  roverPose={x:r.x,y:r.y,z,heading,sx,sy};add(perseveranceBody());const wheel=drivingWheel('perseverance');for(const [x,y]of wheelPivots)add(wheel,x,y);rover=gpu.upload(new Float32Array(out));
 }
 return {tracks,rover,segments:nearby.length,draw(state){tracks.draw(state);if(rover){const gl=gpu.gl;gl.uniform1f(gpu.locations.roverPart,0);gl.uniform2f(gpu.locations.slope,roverPose.sx,roverPose.sy);gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);gpu.mesh(gpu.shadow,[roverPose.x,roverPose.y,roverPose.z+.2,roverPose.heading],2);gl.depthMask(true);gl.disable(gl.BLEND);gl.uniform2f(gpu.locations.slope,0,0);gpu.mesh(rover,[0,0,0,100]);}}};
}

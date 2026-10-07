// Fixed-capacity ring, with short strips conformed to the rendered terrain.
export class WheelTracks{
 constructor(height,capacity=2048){this.height=height;this.capacity=capacity;this.vertices=new Float32Array(capacity*108);this.count=0;this.last=null;}
 reset(){this.count=0;this.last=null;}
 add(s,write){if(s.air){this.last=null;return;}const p={x:s.x-Math.sin(s.heading)*3.5,y:s.y+Math.cos(s.heading)*3.5,h:s.heading};if(!this.last){this.last=p;return;}const distance=Math.hypot(p.x-this.last.x,p.y-this.last.y);if(distance>40){this.last=p;return;}if(distance<1.5)return;
 const start=this.last,steps=Math.ceil(distance/2);for(let j=1;j<=steps;j++){const t=j/steps,end={x:start.x+(p.x-start.x)*t,y:start.y+(p.y-start.y)*t,h:start.h+Math.atan2(Math.sin(p.h-start.h),Math.cos(p.h-start.h))*t},offset=this.count%this.capacity*108;let k=offset;
 for(const side of [-1,1]){const corner=(pose,edge)=>{const d=side*3.8+edge*.48,x=pose.x+Math.cos(pose.h)*d,y=pose.y+Math.sin(pose.h)*d;return [x,y,this.height(x,y)+.055];},a=corner(this.last,-1),b=corner(this.last,1),c=corner(end,-1),d=corner(end,1);for(const point of [a,b,c,b,d,c]){this.vertices.set([...point,0,0,1,this.count,0,0],k);k+=9;}}
 write?.(offset,this.vertices.subarray(offset,offset+108));this.count++;this.last=end;}
 }
 get vertexCount(){return Math.min(this.count,this.capacity)*12;}
}

// Local, cached height field uses the visible scenery triangles, not collision proxies.
export class LampGround {
 constructor(surface,mesh=[]){this.surface=surface;this.bytes=new Uint8Array(128*128*4);this.heights=new Float32Array(16384);this.x=Infinity;this.y=Infinity;this.faces=[];
  for(let i=0;i<mesh.length;i+=27){const a=Array.from(mesh.slice(i,i+3)),b=Array.from(mesh.slice(i+9,i+12)),c=Array.from(mesh.slice(i+18,i+21)),den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)>.0001)this.faces.push({a,b,c,den,minX:Math.min(a[0],b[0],c[0]),maxX:Math.max(a[0],b[0],c[0]),minY:Math.min(a[1],b[1],c[1]),maxY:Math.max(a[1],b[1],c[1])});}
 }
 // Anchor samples to world coordinates so cache refreshes cannot reshape shadows.
 update(x,y){x=Math.round(x/8)*8;y=Math.round(y/8)*8;if(Math.hypot(x-this.x,y-this.y)<12)return false;this.x=x;this.y=y;this.base=this.surface(x,y)-100;const left=x-512,top=y-512;
  for(let j=0;j<128;j++)for(let i=0;i<128;i++)this.heights[j*128+i]=this.surface(left+i*8,top+j*8);
  for(const f of this.faces){if(f.maxX<left||f.minX>left+1016||f.maxY<top||f.minY>top+1016)continue;const {a,b,c,den}=f;
   for(let j=Math.max(0,Math.ceil((f.minY-top)/8));j<=Math.min(127,Math.floor((f.maxY-top)/8));j++)for(let i=Math.max(0,Math.ceil((f.minX-left)/8));i<=Math.min(127,Math.floor((f.maxX-left)/8));i++){const px=left+i*8,py=top+j*8,u=((b[1]-c[1])*(px-c[0])+(c[0]-b[0])*(py-c[1]))/den,v=((c[1]-a[1])*(px-c[0])+(a[0]-c[0])*(py-c[1]))/den;if(u>=0&&v>=0&&u+v<=1)this.heights[j*128+i]=Math.max(this.heights[j*128+i],u*a[2]+v*b[2]+(1-u-v)*c[2]);}
  }
  for(let i=0;i<16384;i++){const value=Math.max(0,Math.min(65535,Math.round((this.heights[i]-this.base)*32))),k=i*4;this.bytes[k]=value>>8;this.bytes[k+1]=value&255;this.bytes[k+3]=255;}return true;
 }
}

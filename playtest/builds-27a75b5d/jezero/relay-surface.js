import {RELAY_ROAD_HALF_WIDTH} from './relay-course.js';
/** Compacted soil lives on the terrain shader, so the track cannot float or clip through hills. */
export function createRelayRoad(gl,points){
 const size=2048,pad=90,xs=points.map(p=>p.x),ys=points.map(p=>p.y),x=Math.min(...xs)-pad,y=Math.min(...ys)-pad,width=Math.max(...xs)-x+pad,height=Math.max(...ys)-y+pad;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');ctx.fillStyle='#000';ctx.fillRect(0,0,size,size);ctx.scale(size/width,size/height);ctx.translate(-x,-y);ctx.lineJoin=ctx.lineCap='round';
 // Multiple low-contrast shoulders and an irregular edge avoid a flat painted stripe.
 for(const [extra,shade] of [[8,35],[5,75],[2,145],[0,255]])for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],wobble=1.4*Math.sin(i*.38)+.8*Math.sin(i*.113);ctx.strokeStyle=`rgb(${shade},0,0)`;ctx.lineWidth=2*(RELAY_ROAD_HALF_WIDTH+extra+wobble);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
 }
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,canvas);gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 return {texture,bounds:[x,y,width,height],style:2,points};
}

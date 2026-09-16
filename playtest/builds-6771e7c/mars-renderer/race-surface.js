// A world-space color mask: the road shares the terrain's exact depth and shape.
export function raceSurface(gl,route,halfWidth=58){
 const size=2048,pad=halfWidth+20,xs=route.map(p=>p.x),ys=route.map(p=>p.y),x=Math.min(...xs)-pad,y=Math.min(...ys)-pad,width=Math.max(...xs)-x+pad,height=Math.max(...ys)-y+pad;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=size;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#000';ctx.fillRect(0,0,size,size);ctx.scale(size/width,size/height);ctx.translate(-x,-y);ctx.strokeStyle='#fff';ctx.lineWidth=halfWidth*2;ctx.lineJoin=ctx.lineCap='round';ctx.beginPath();route.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.stroke();
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,canvas);gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 return {texture,bounds:[x,y,width,height]};
}

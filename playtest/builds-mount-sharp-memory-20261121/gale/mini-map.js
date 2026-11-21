// Local context remains visible after jumping away from the next expedition leg.
export function drawGaleMini(canvas,{state,segments,stops,layer}){
 const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
 const ratio=Math.min(devicePixelRatio,2);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);
 const ctx=canvas.getContext('2d'),w=rect.width,h=rect.height,scale=w/3400,point=p=>({x:w/2+(p.x-state.x)*scale,y:h/2+(p.y-state.y)*scale});ctx.setTransform(ratio,0,0,ratio,0,0);
 ctx.fillStyle='#302d27';ctx.fillRect(0,0,w,h);
 if(layer?.image?.naturalWidth){const p=point(layer.box);ctx.drawImage(layer.image,p.x,p.y,layer.box.w*scale,layer.box.h*scale);}
 ctx.strokeStyle='#e4c697';ctx.lineWidth=1;ctx.beginPath();
 for(const segment of segments)segment.points.forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();
 ctx.fillStyle='#efc481';for(const p of stops){const q=point(p);if(q.x<0||q.x>w||q.y<0||q.y>h)continue;ctx.beginPath();ctx.arc(q.x,q.y,2.5,0,Math.PI*2);ctx.fill();}
 ctx.translate(w/2,h/2);ctx.rotate(state.heading);ctx.beginPath();ctx.moveTo(0,-6);ctx.lineTo(4,5);ctx.lineTo(0,2);ctx.lineTo(-4,5);ctx.closePath();ctx.fillStyle='#fff';ctx.strokeStyle='#263033';ctx.lineWidth=1;ctx.stroke();ctx.fill();
}

// Reused small density image, smoothly enlarged instead of hard grid squares.
export function createStormMap(){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=192;
 const context=canvas.getContext('2d'),image=context.createImageData(192,192);
 return (ctx,storm,bounds,w,h)=>{
  if(storm.age<0)return;
  const spanX=bounds.width-bounds.minX,spanY=bounds.maxY-bounds.minY;
  for(let y=0;y<192;y++)for(let x=0;x<192;x++){
   const i=(y*192+x)*4,d=storm.density(bounds.minX+(x+.5)/192*spanX,bounds.minY+(y+.5)/192*spanY);
   // Warm airborne dust stays distinct from dark relief/shadow markings.
   image.data[i]=226;image.data[i+1]=181;image.data[i+2]=113;image.data[i+3]=Math.round(d*155);
  }
  context.putImageData(image,0,0);ctx.save();ctx.imageSmoothingEnabled=true;ctx.drawImage(canvas,0,0,w,h);ctx.restore();
 };
}

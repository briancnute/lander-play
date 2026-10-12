/** Join the unchanged 20 m Curiosity patch to measured 200 m summit coverage. */
export function extendSurface(fine,broad,units){
 const c=fine.crop,x0=c.eastMin*units,x1=c.eastMax*units,y0=-c.northMax*units,y1=-c.northMin*units;
 const xs=Float32Array.from([...new Set([...broad.xs,x0,x1])].sort((a,b)=>a-b)),ys=Float32Array.from([...new Set([...broad.ys,y0,y1])].sort((a,b)=>a-b));
 const inside=(x,y)=>x>=x0&&x<=x1&&y>=y0&&y<=y1;
 const blended=(x,y)=>{const ex=Math.max(x0,Math.min(x1,x)),ey=Math.max(y0,Math.min(y1,y)),d=Math.hypot(x-ex,y-ey),t=Math.min(1,d/(800*units)),w=1-t*t*(3-2*t);return broad.height(x,y)+(fine.height(ex,ey)-broad.height(ex,ey))*w;};
 const zs=Float32Array.from({length:xs.length*ys.length},(_,i)=>blended(xs[i%xs.length],ys[Math.floor(i/xs.length)]));
 const cell=(axis,value)=>{let lo=0,hi=axis.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(axis[m]<=value)lo=m;else hi=m;}return lo;};
 const triangleHeight=(x,y)=>{const i=cell(xs,x),j=cell(ys,y),u=Math.max(0,Math.min(1,(x-xs[i])/(xs[i+1]-xs[i]))),v=Math.max(0,Math.min(1,(y-ys[j])/(ys[j+1]-ys[j]))),k=j*xs.length+i;return u+v<=1?zs[k]+(zs[k+1]-zs[k])*u+(zs[k+xs.length]-zs[k])*v:zs[k+xs.length+1]+(zs[k+xs.length]-zs[k+xs.length+1])*(1-u)+(zs[k+1]-zs[k+xs.length+1])*(1-v);};
 return {xs,ys,zs,crop:{...broad.crop,columns:xs.length,rows:ys.length},height:(x,y)=>inside(x,y)?fine.height(x,y):triangleHeight(x,y),skipCell:inside};
}

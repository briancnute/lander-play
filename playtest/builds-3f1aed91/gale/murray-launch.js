import {MURRAY_SHELF_PATH} from './murray-shelves.js';
// Producer-authorized artificial starting hill. Only the local elevation copy
// changes; rendered triangles and contact both use this same grid.
export function murrayLaunchElevations(raw,crop){
 const out=raw.slice(),top=MURRAY_SHELF_PATH[0];let next=top,along=0;
 for(let k=1;k<MURRAY_SHELF_PATH.length;k++){const a=MURRAY_SHELF_PATH[k-1],b=MURRAY_SHELF_PATH[k],d=Math.hypot(b[0]-a[0],b[1]-a[1]);if(along+d>=120){const t=(120-along)/d;next=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];break;}along+=d;}
 const dx=next[0]-top[0],dy=next[1]-top[1],len=Math.hypot(dx,dy),fx=dx/len,fy=dy/len,units=8/3;
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
 const ex=top[0]+fx*420,ey=top[1]+fy*420,i=Math.round((ex/units-crop.eastMin)/crop.step),j=Math.round((crop.northMax+ey/units)/crop.step),end=(raw[j*crop.columns+i]+4500)*units;
 for(let row=0;row<crop.rows;row++)for(let col=0;col<crop.columns;col++){
  const x=(crop.eastMin+col*crop.step)*units-top[0],y=-(crop.northMax-row*crop.step)*units-top[1],s=x*fx+y*fy,u=-x*fy+y*fx;
  if(s<=-350||s>=500||Math.abs(u)>=320)continue;
  const k=row*crop.columns+col,z=(raw[k]+4500)*units;
  const weight=smooth((s+350)/200)*(1-smooth((s-300)/200))*(1-smooth((Math.abs(u)-160)/160));
  const hill=end+.18*(420-Math.max(-100,s));
  out[k]=(z+Math.max(0,hill-z)*weight)/units-4500;
 }
 return out;
}

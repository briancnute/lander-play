// A mature regional storm present from the first frame, drifting in world space.
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function createIngenuityDust(_targetWindow,random=Math.random,anchor={x:0,y:0}){
 const direction=random()<.5?1:-1;
 return {start:0,duration:0,direction,age:0,haze:0,front:0,cell:[anchor.x,anchor.y,22000,22000],shape:[1,0,0,1],density:()=>0,
  mapDensity(x,y){const qx=(x-this.cell[0])/this.cell[2],qy=(y-this.cell[1])/this.cell[3],phase=this.shape[2],edge=1+.16*Math.sin(qx*3+phase)+.12*Math.sin(qy*4-phase*.7)+.08*Math.sin((qx+qy)*5+phase*.4);return 1-smooth(.42,1,Math.hypot(qx,qy)/edge);},
  curtain:{regional:true,heading:0,progress:1,direction,near:2400,far:4400,enabled:true,complete:true},update(elapsed,heading){
   const age=Math.max(0,elapsed);this.age=age;this.cell[0]=anchor.x+direction*12*age;this.cell[1]=anchor.y+4*age;this.shape[2]=age*.012;this.curtain.heading=heading;return this;
  }
 };
}

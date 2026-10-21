// A fixed regional dust field; only its density and internal wisps evolve.
export function createIngenuityDust(targetWindow,random=Math.random,anchor={x:0,y:0}){
 const window=Math.max(.1,targetWindow),start=window*(.08+random()*.5),duration=10+random()*4,direction=random()<.5?1:-1;
 return {start,duration,direction,age:-1,haze:0,front:0,cell:[anchor.x,anchor.y,22000,22000],shape:[1,0,0,1],density:()=>0,curtain:{regional:true,heading:0,progress:0,direction,near:2400,far:4400,enabled:false,complete:false},update(elapsed,heading){
  const progress=Math.max(0,Math.min(1,(elapsed-start)/duration));this.age=elapsed<start?-1:elapsed;this.shape[2]=Math.max(0,elapsed-start)*.012;this.curtain.heading=heading;this.curtain.progress=progress;this.curtain.enabled=elapsed>=start;this.curtain.complete=progress===1;return this;
 }};
}

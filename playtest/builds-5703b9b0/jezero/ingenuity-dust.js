// Reuses the Mars dust pass with a fully opaque distant curtain, not local weather.
export function createIngenuityDust(targetWindow,random=Math.random){
 const window=Math.max(.1,targetWindow),start=window*(.08+random()*.5),duration=window*(.28+random()*.1),direction=random()<.5?1:-1;
 return {start,duration,direction,age:-1,haze:0,front:0,density:()=>0,curtain:{heading:0,edge:-4,direction,near:1400,far:2100,enabled:false,complete:false},update(elapsed,heading){
  const progress=Math.max(0,Math.min(1,(elapsed-start)/duration));this.age=elapsed<start?-1:elapsed;this.curtain.heading=heading;this.curtain.edge=-4+8*(progress*progress*(3-2*progress));this.curtain.enabled=elapsed>=start;this.curtain.complete=progress===1;return this;
 }};
}

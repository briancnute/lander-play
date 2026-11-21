// Presentation only: keep full-rate rendering, reduce 3D pixels after sustained
// missed 60 Hz frames. Hold the choice through the run to avoid resolution churn.
export function createRenderBudget(){
 let run=null,elapsed=0,frames=0,relief=false;
 return {
  sample(current,ms){
   if(current!==run){run=current;elapsed=frames=0;relief=false;}
   if(!run||relief)return;
   // Ignore startup/resume/hidden-tab gaps; they are not sustained rendering load.
   if(!Number.isFinite(ms)||ms<=0||ms>250){elapsed=frames=0;return;}
   elapsed+=ms;frames++;
   if(elapsed>=800){relief=elapsed/frames>21;elapsed=frames=0;}
  },
  resetWindow(){elapsed=frames=0;},
  quality(selected){return relief?'performance':selected;},
  get relieved(){return relief;}
 };
}

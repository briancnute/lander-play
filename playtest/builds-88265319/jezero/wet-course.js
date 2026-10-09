// Authored local interpretation, not a dated or surveyed ancient shoreline.
export const WET_ID='wet-jezero-v1';
export const WET_KEY='astra.jezero.'+WET_ID;
export const WATER_LEVEL=85;
export const WET_FRAMING='An interpreted ancient Jezero shoreline, based on evidence of its former lake.';
const point=([x,y,z,width=85])=>({x,y,z,width});
export const wetRoute=[
 [5050,7600,210],[5330,7830,160],[5710,7890,119],[5910,8010,99],
 [6040,8200,98],[6350,8380,97,38],[6480,8670,97,35],[6400,8930,98,38],[6200,9150,101],
 [5870,9410,121],[5520,9530,149],[5090,9500,163],[4730,9240,182],
 [4510,8810,204],[4890,8450,203],[4800,7930,207],[5050,7600,210],
].map(point);
export const wetSafeRoute=[wetRoute[4],...[ [5850,8350,105,105],[5890,8590,108,100],[5810,8830,112,95],[5870,9090,110,100],[6030,9270,108,105] ].map(point),wetRoute[8]];
export const wetStages=[
 {name:'Delta descent',index:3,hint:'Follow the descending sediment shelf toward the water.'},
 {name:'Lake margin',index:4,hint:'Choose the narrow exposed bar or the broad shore on the right.'},
 {name:'Across the inlet',index:8,hint:'Both lines rejoin beneath the southern terrace.'},
 {name:'Terrace climb',index:11,hint:'Climb the pale terraces; ease off before the crests.'},
 {name:'High overlook',index:14,hint:'The lake opens below. Follow the shelf back to the start.'},
 {name:'Return',index:16,hint:'Complete the circuit at the original overlook.'},
];
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
export function nearestWetLine(x,y,line=wetRoute){let best={d:Infinity};for(let i=1;i<line.length;i++){const a=line[i-1],b=line[i],dx=b.x-a.x,dy=b.y-a.y,t=clamp(((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)),d=Math.hypot(x-a.x-dx*t,y-a.y-dy*t);if(d<best.d)best={d,i,t,x:a.x+dx*t,y:a.y+dy*t,z:a.z+(b.z-a.z)*smooth(t),width:a.width+(b.width-a.width)*t,heading:Math.atan2(dx,-dy)};}return best;}
export function wetHeight(original,x,y){
 const main=nearestWetLine(x,y),safe=nearestWetLine(x,y,wetSafeRoute),p=main.d/main.width<safe.d/safe.width?main:safe;
 const blend=1-smooth((p.d-p.width*.64)/(p.width*1.65));
 // Smooth bank/terrace relief, with two small rounded crests on the climb.
 const crest=main.i>=10&&main.i<=13?3.2*Math.sin(main.t*Math.PI*2)**2:0;
 return original*(1-blend)+(p.z+crest+1.4*Math.sin(x*.025)*Math.sin(y*.019)*smooth(p.d/30))*blend;
}
export function newWetRun(){return {course:WET_ID,time:0,next:0,practice:false,returns:0,done:false};}
export function wetProgress(run,from,to){
 if(run.done)return false;
 // Reject discontinuous movement; a restore never advances the course.
 if(Math.hypot(to.x-from.x,to.y-from.y)>40)return false;
 const index=wetStages[run.next].index,p=wetRoute[index],prior=wetRoute[index-1],heading=Math.atan2(p.x-prior.x,prior.y-p.y);
 const dx=to.x-from.x,dy=to.y-from.y,t=clamp(((p.x-from.x)*dx+(p.y-from.y)*dy)/(dx*dx+dy*dy||1));
 if(Math.hypot(from.x+dx*t-p.x,from.y+dy*t-p.y)>Math.max(110,p.width))return false;
 if(run.next!==2&&dx*Math.sin(heading)-dy*Math.cos(heading)<-.01)return false;
 run.next++;if(run.next===wetStages.length)run.done=true;return true;
}
export function wetReturn(run){run.practice=true;run.returns++;run.time+=5;}
export function validWetSave(value){return !!value&&value.course===WET_ID&&Number.isFinite(value.time)&&value.time>=0&&Number.isInteger(value.next)&&value.next>=0&&value.next<wetStages.length&&!value.done&&typeof value.practice==='boolean'&&Number.isInteger(value.returns)&&value.returns>=0;}

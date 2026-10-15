// Producer-approved tuning, in seconds. Keep the final input on Trick / Shift.
export const takeoffDuration=1.2,landingLead=1.2,railDelay=.2,railTravel=1.1,resultDuration=.6;
export const classes=[
 {name:'Basic',pause:0,input:3,count:6,trick:1.5,cycle:1,actions:['left','right','thrust','left','right','brake']},
 {name:'Good',pause:0,input:2.55,count:6,trick:1.7,cycle:.9,actions:['left','thrust','right','left','thrust','brake']},
 {name:'Great',pause:0,input:4,count:7,trick:2,cycle:1.4,actions:['left','right','thrust','left','thrust','right','brake']},
 {name:'Premium',pause:0,input:2.85,count:7,trick:2.2,cycle:1.4,actions:['left','brake','right','thrust','left','thrust','brake']},
].map((c,i)=>{const count=[8,8,12,10][i];return {...c,count,actions:Array.from({length:count},(_,n)=>n===count-1?'brake':c.actions[n%c.actions.length])};});
export const tier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const grade=score=>['Basic','Good','Great','Perfect'][tier(score)];
const bounded=(v,f,min,max)=>typeof v==='number'&&Number.isFinite(v)?Math.max(min,Math.min(max,v)):f;
export function settings(raw={}){
 const source=raw&&typeof raw==='object'?raw:{};
 return {takeoff:bounded(source.takeoff,takeoffDuration,.6,2.5),landing:bounded(source.landing,landingLead,.6,2.5),delay:bounded(source.delay,railDelay,0,1),travel:bounded(source.travel,railTravel,.5,2.4),feedback:bounded(source.feedback,resultDuration,.3,1),
  classes:classes.map((c,i)=>{const v=source.classes?.[i]??{},count=Math.round(bounded(v.count,c.count,6,12));return {...c,count,input:bounded(v.input,c.input,1.5,4),cycle:bounded(v.cycle,c.cycle,.6,2.4),trick:bounded(v.trick,c.trick,.6,6),actions:Array.from({length:count},(_,n)=>n===count-1?'brake':c.actions[n%c.actions.length])};})};
}
export const defaultSettings=settings();
export const minimumAir=(i,s=defaultSettings)=>s.delay+s.travel+s.classes[i].input-s.classes[i].input/s.classes[i].count/2+s.feedback+Math.max(s.classes[i].trick,s.classes[i].cycle-s.landing+.15)+s.landing;
export function schedule(index,airtime,options=defaultSettings){
 const s=settings(options),c=s.classes[index],beat=c.input/c.count,railStart=s.takeoff+s.delay;
 const sequence=railStart+s.travel-beat/2,sequenceEnd=sequence+c.input,trickStart=sequenceEnd+s.feedback;
 airtime??=minimumAir(index,s);
 const touchdown=s.takeoff+airtime,landingEnd=touchdown,landingStart=landingEnd-s.landing;
 const motionEnd=touchdown-.15,motionTime=motionEnd-trickStart,cycles=Math.max(1,Math.floor(motionTime/c.cycle)),cycleDuration=motionTime/cycles;
 return {...c,takeoff:s.takeoff,feedback:s.feedback,pause:s.delay,cycles,cycleDuration,motionEnd,beat,railStart,railTravel:s.travel,sequence,sequenceEnd,trickStart,trickEnd:trickStart+c.trick,landingStart,landingEnd,touchdown,airtime};
}

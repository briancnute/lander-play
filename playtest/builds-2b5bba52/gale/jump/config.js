// Producer-approved tuning, in seconds. Keep the final input on Trick / Shift.
export const takeoffDuration=1.2,landingLead=1.2,railDelay=0,railTravel=.9,resultDuration=.65;
export const classes=[
 {name:'Basic',pause:0,input:2.4,count:6,trick:2.4,cycle:.8,actions:['left','right','thrust','left','right','brake']},
 {name:'Good',pause:0,input:2.55,count:6,trick:2.8,cycle:.9,actions:['left','thrust','right','left','thrust','brake']},
 {name:'Great',pause:0,input:2.7,count:7,trick:4,cycle:1,actions:['left','right','thrust','left','thrust','right','brake']},
 {name:'Premium',pause:0,input:2.85,count:7,trick:5.6,cycle:1.4,actions:['left','brake','right','thrust','left','thrust','brake']},
].map(c=>({...c,count:c.count*2,actions:[...c.actions,...c.actions]}));
export const tier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const grade=score=>['Basic','Good','Great','Perfect'][tier(score)];
export const minimumAir=i=>railDelay+railTravel+classes[i].input-classes[i].input/classes[i].count/2+resultDuration+classes[i].trick+landingLead;
export function schedule(index,airtime=minimumAir(index)){
 const c=classes[index],beat=c.input/c.count,railStart=takeoffDuration+railDelay;
 const sequence=railStart+railTravel-beat/2,sequenceEnd=sequence+c.input,trickStart=sequenceEnd+resultDuration;
 const touchdown=takeoffDuration+airtime,landingEnd=touchdown,landingStart=landingEnd-landingLead;
 // Fit whole moves into the remaining flight once, then hold one constant rate.
 // No easing or time compression at the boundaries between complete spins.
 const motionEnd=touchdown-.15,motionTime=motionEnd-trickStart,cycles=Math.max(1,Math.floor(motionTime/c.cycle)),cycleDuration=motionTime/cycles;
 return {...c,pause:railDelay,cycles,cycleDuration,motionEnd,beat,railStart,railTravel,sequence,sequenceEnd,trickStart,trickEnd:trickStart+c.trick,landingStart,landingEnd,touchdown,airtime};
}

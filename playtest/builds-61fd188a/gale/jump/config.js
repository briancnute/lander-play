// Producer-approved tuning, in seconds. Keep the final input on Trick / Shift.
export const takeoffDuration=1.2,landingLead=1.2,railDelay=.5,railTravel=2.4,resultDuration=.65;
export const classes=[
 {name:'Basic',pause:.5,input:2.4,count:6,trick:2.4,actions:['left','right','thrust','left','right','brake']},
 {name:'Good',pause:.5,input:2.55,count:6,trick:2.8,actions:['left','thrust','right','left','thrust','brake']},
 {name:'Great',pause:.5,input:2.7,count:7,trick:4,actions:['left','right','thrust','left','thrust','right','brake']},
 {name:'Premium',pause:.5,input:2.85,count:7,trick:5.6,actions:['left','brake','right','thrust','left','thrust','brake']},
];
export const tier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const grade=score=>['Basic','Good','Great','Perfect'][tier(score)];
export const minimumAir=i=>railDelay+railTravel+classes[i].input-classes[i].input/classes[i].count/2+resultDuration+classes[i].trick+landingLead;
export function schedule(index,airtime=minimumAir(index)){
 const c=classes[index],beat=c.input/c.count,railStart=takeoffDuration+railDelay;
 const sequence=railStart+railTravel-beat/2,sequenceEnd=sequence+c.input,trickStart=sequenceEnd+resultDuration;
 const touchdown=takeoffDuration+airtime,landingEnd=touchdown,landingStart=landingEnd-landingLead;
 return {...c,pause:railDelay,beat,railStart,railTravel,sequence,sequenceEnd,trickStart,trickEnd:trickStart+c.trick,landingStart,landingEnd,touchdown,airtime};
}

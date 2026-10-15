// Producer-approved tuning, in seconds. Keep the final input on Trick / Shift.
export const takeoffDuration=1.2,landingLead=1.2,railDelay=.5;
export const classes=[
 {name:'Basic',pause:.5,input:1.8,count:6,trick:2.4,actions:['left','right','thrust','left','right','brake']},
 {name:'Good',pause:.5,input:1.9,count:6,trick:2.8,actions:['left','thrust','right','left','thrust','brake']},
 {name:'Great',pause:.5,input:2,count:7,trick:4,actions:['left','right','thrust','left','thrust','right','brake']},
 {name:'Premium',pause:.5,input:2.1,count:7,trick:5.6,actions:['left','brake','right','thrust','left','thrust','brake']},
];
export const tier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const grade=score=>['Basic','Good','Great','Perfect'][tier(score)];
export const minimumAir=i=>railDelay+classes[i].input+classes[i].trick+landingLead;
export function schedule(index,airtime=minimumAir(index),apex){
 const c=classes[index],sequence=takeoffDuration+railDelay,sequenceEnd=sequence+c.input;
 const trickStart=Math.max(sequenceEnd,apex===undefined?sequenceEnd:takeoffDuration+apex-c.trick/2);
 const touchdown=takeoffDuration+airtime,landingEnd=touchdown,landingStart=landingEnd-landingLead;
 return {...c,pause:railDelay,beat:c.input/c.count,railStart:sequence,sequence,sequenceEnd,trickStart,trickEnd:trickStart+c.trick,landingStart,landingEnd,touchdown,airtime};
}

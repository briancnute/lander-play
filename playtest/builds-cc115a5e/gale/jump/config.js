// Producer-approved tuning, in seconds. Keep the final input on Trick / Shift.
export const takeoffDuration=1.2,landingLead=1.2;
export const classes=[
 {name:'Basic',pause:.5,input:1.8,count:6,trick:1.2,actions:['left','right','thrust','left','right','brake']},
 {name:'Good',pause:.9,input:1.9,count:6,trick:1.4,actions:['left','thrust','right','left','thrust','brake']},
 {name:'Great',pause:1,input:2,count:7,trick:2,actions:['left','right','thrust','left','thrust','right','brake']},
 {name:'Premium',pause:1.1,input:2.1,count:7,trick:2.8,actions:['left','brake','right','thrust','left','thrust','brake']},
];
export const tier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const grade=score=>['Basic','Good','Great','Perfect'][tier(score)];
export const minimumAir=i=>classes[i].pause+classes[i].input+classes[i].trick+landingLead;
export function schedule(index,airtime=minimumAir(index)){
 const c=classes[index],pause=c.pause+Math.max(0,airtime-minimumAir(index)),sequence=takeoffDuration+pause,trickStart=sequence+c.input,landingStart=trickStart+c.trick;
 return {...c,pause,beat:c.input/c.count,sequence,trickStart,landingStart,touchdown:landingStart+landingLead,airtime:landingStart+landingLead-takeoffDuration};
}

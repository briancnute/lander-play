export const SEQUENCE_WINDOW = .65;
/** Longest matching suffix wins; adding a short move needs only a table entry. */
export const SCOOTER_MOVES = [
 {sequence:[-1,-1],trick:'Reverse 360 spin',duration:1.05},
 {sequence:[1,1],trick:'360 spin',duration:1.05},
 {sequence:[-1,1],trick:'Backflip',duration:1.05},
 {sequence:[1,-1],trick:'Front flip',duration:1.05},
 {sequence:[-1],trick:'Tailwhip',duration:1.05},
 {sequence:[1],trick:'Reverse tailwhip',duration:1.05},
];
export const newTrickInput=()=>({history:[],steer:0,gas:false,events:[]});
/** Ground steering never enters the history. Only a fresh Go press commits it. */
export function readTrickInput(s,time,eligible,steer,gas,both=false,inhibited=false){
 const press=gas&&!s.gas,direction=both?0:Math.sign(steer);
 s.history=s.history.filter(p=>time-p.time<=SEQUENCE_WINDOW);
 if(!eligible)s.history=[];
 else if(!inhibited&&direction&&direction!==s.steer){s.history.push({direction,time});s.history=s.history.slice(-4);}
 s.steer=direction;s.gas=gas;
 if(!eligible||!press)return null;
 const history=s.history.map(p=>p.direction);s.history=[];if(inhibited)return null;
 return [...SCOOTER_MOVES].sort((a,b)=>b.sequence.length-a.sequence.length).find(m=>m.sequence.length<=history.length&&m.sequence.every((d,i)=>d===history[history.length-m.sequence.length+i]))??null;
}

/** Preserve taps released between rendered frames, including on touch screens. */
export function queueTrickInput(s,event){s.events.push(event);if(s.events.length>24)s.events.shift();}
export function drainTrickInput(s){let move=null;for(const e of s.events)move=readTrickInput(s,e.time,e.eligible,e.steer,e.gas,e.both,e.inhibited)??move;s.events=[];return move;}

export const SEQUENCE_WINDOW=1, VARIANT_WINDOW=.32;


export const newTrickInput=(allowSecret=true)=>({allowSecret,history:[],committed:[],steer:0,gas:false,special:false,reverse:false,both:false,events:[],started:-99,variationOpen:false,secret:false});

export function queueTrickInput(s,event){s.events.push(event);}
/** Repeated directions add revolutions; ordered mixed inputs select a move family. */
export function resolveMove(directions,variant=false,allowSecret=true){
 const key=directions.map(d=>d<0?'L':'R').join(''),secret=allowSecret&&key==='LRLR';
 const runs=[];for(const d of directions)if(runs[runs.length-1]!==d)runs.push(d);
 const code=runs.map(d=>d<0?'L':'R').join('');
 const family={L:['Tailwhip','deck',1],R:['Reverse tailwhip','deck',-1],LR:['Backflip','flip',1],RL:['Front flip','flip',-1],LRL:['Whip rewind','rewind',1],RLR:['Reverse whip rewind','rewind',-1]};
 // A repeated block before the change adds a revolution to that ordered move.
 const rotations=Math.max(1,directions.length-runs.length+1),[name,axis,sign]=family[code]??family[code.slice(-3)]??family.L;
 if(secret&&variant)return {trick:'The 9000',duration:12.24,rotations:50,axis:'deck',sign:1,variant:true,secret:true};
 const ordered=key==='LRR'?'Flip barspin':key==='RLL'?'Reverse flip barspin':name;
 return {trick:`${rotations>1?rotations+'× ':''}${ordered}${variant?' · tuck':''}`,duration:1.29+(rotations-1)*.42,rotations,axis:ordered.includes('barspin')?'bar':axis,sign,variant,secret};
}
/** The only accepted input during a trick is its opening double-gas variation. */
export function readTrickInput(s,time,eligible,busy,input){
 const d=input.both?0:Math.sign(input.steer),directionPress=!!d&&(d!==s.steer||s.both),gasPress=input.gas&&!s.gas;
 s.steer=d;s.gas=input.gas;s.both=input.both;
 if(busy){s.history=[];if(directionPress)s.variationOpen=false;if(gasPress&&s.variationOpen&&time-s.started<=VARIANT_WINDOW){s.variationOpen=false;return resolveMove(s.committed,true,s.allowSecret);}return null;}
 if(!eligible){s.history=[];s.variationOpen=false;return null;}
 s.history=s.history.filter(p=>time-p.time<=SEQUENCE_WINDOW);
 if(input.reverse||input.both||input.special&&!input.gas){s.history=[];return null;}
 if(input.special&&gasPress&&d&&!directionPress)s.history.push({direction:d,time});
 if(directionPress){s.history.push({direction:d,time});s.history=s.history.slice(-4);}
 if(!(gasPress||directionPress&&input.gas)||!s.history.length)return null;
 const sequence=s.history.map(p=>p.direction),move=resolveMove(sequence,false,s.allowSecret);s.history=[];s.committed=sequence;s.started=time;s.variationOpen=true;s.secret=move.secret;return move;
}

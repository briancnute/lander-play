import {landingTiming,LAND_TARGET} from '../ski-landing.js';
export const actions=['left','right','thrust','left','right','brake'];
export function createRun({spacing=.3,count=6,lead=.65}={}){
 return {spacing,window:Math.min(.38,spacing/2),notes:Array.from({length:count},(_,i)=>({action:i===count-1?'brake':actions[i%actions.length],at:lead+i*spacing,result:null})),finished:false};
}
export function expire(run,t){for(const n of run.notes)if(n.result===null&&t>n.at+run.window)n.result={score:0,label:'Miss',error:null,at:t};run.finished=run.notes.every(n=>n.result!==null);}
export function hit(run,action,t){expire(run,t);const n=run.notes.find(n=>n.result===null);if(!n||Math.abs(t-n.at)>run.window)return null;
 const error=t-n.at,score=action===n.action?Math.round(100*landingTiming(LAND_TARGET+error)):0;
 n.result={score,error,at:t,label:action!==n.action?'Wrong input':score===100?'Perfect':error<0?'Early':'Late'};run.finished=run.notes.every(n=>n.result!==null);return n.result;
}
export const average=run=>Math.round(run.notes.reduce((sum,n)=>sum+(n.result?.score??0),0)/run.notes.length);

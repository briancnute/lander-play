// Local, bounded telemetry. No uploads and no storage writes during play.
export const RUN_LOG_KEY='astra.gale.lastRunLog.v1';
const round=(n,d=3)=>Number.isFinite(n)?Number(n.toFixed(d)):null;
const cap=(a,v,n,log)=>{if(a.length<n)a.push(v);else log.truncated=true;};
export function runPhase(r){if(r.phase==='countdown')return 'countdown';if(r.timeTrial)return 'downhill';if(r.finishStop)return 'finish';const j=r.jump;if(!j)return 'slalom';const t=j.time,c=j.config;if(t<j.settings.takeoff)return 'takeoff';if(t<c.sequenceEnd)return 'inputs';if(t<c.landingStart)return 'trick';return 'landing';}
export function newRunLog(course,environment={},startedAt=new Date().toISOString()){
 return {schema:'astra.slalom.run.v1',startedAt,environment,course:{id:course.activity,title:course.title,timeTarget:course.timeTarget??null,gates:course.gates.map(g=>({...g})),turbo:course.items?.find(i=>i.kind==='slalom-boost')?.s,lip:course.lip},samples:[],inputs:[],pauses:[],frames:{},driving:{seconds:0,thrustSeconds:0,brakeSeconds:0,coastSeconds:0,leftSeconds:0,rightSeconds:0,steeringReversals:0,maxSpeed:0,speedIntegral:0},truncated:false,_lastSample:-1,_input:'',_direction:0,_skipFrame:true};
}
export function logInput(log,r,input,source='controls'){
 if(!log)return;const value={thrust:!!input.drive,brake:!!input.brake,steer:input.steer||0,both:!!input.both},key=[+value.thrust,+value.brake,value.steer,+value.both].join(',');
 if(key!==log._input||input.press&&input.press!=='release'){cap(log.inputs,{time:round(r.time),phase:runPhase(r),...value,press:input.press??null,source},4000,log);log._input=key;}
}
export function sampleRun(log,r,input,dt){
 if(!log||r.phase==='countdown')return;logInput(log,r,input);
 if(!r.jump&&r.slalomTime===null&&r.phase==='running'){
  const d=log.driving;d.seconds+=dt;d.thrustSeconds+=input.drive?dt:0;d.brakeSeconds+=input.brake||input.both?dt:0;d.coastSeconds+=!input.drive&&!input.brake&&!input.both?dt:0;d.leftSeconds+=input.steer<0?dt:0;d.rightSeconds+=input.steer>0?dt:0;d.maxSpeed=Math.max(d.maxSpeed,Math.hypot(r.v,r.side));d.speedIntegral+=Math.hypot(r.v,r.side)*dt;
  const direction=Math.sign(input.steer||0);if(direction){if(log._direction&&direction!==log._direction)d.steeringReversals++;log._direction=direction;}
 }
 if(r.time-log._lastSample>=.099){cap(log.samples,{time:round(r.time),phase:runPhase(r),distance:round(r.s,1),lateral:round(r.u,1),speed:round(r.v,1),sideSpeed:round(r.side,1),airborne:!!r.air,thrust:!!input.drive,brake:!!input.brake,steer:input.steer||0},1800,log);log._lastSample=r.time;}
}
export function logFrame(log,r,intervalMs,cpuMs,rendered,rendering){
 if(!log)return;if(log._skipFrame){log._skipFrame=false;return;}if(!Number.isFinite(intervalMs)||intervalMs<=0)return;
 const phase=runPhase(r),f=log.frames[phase]??(log.frames[phase]={count:0,rendered:0,totalMs:0,cpuMs:0,maxMs:0,over50ms:0,over100ms:0,automaticReliefFrames:0,rendering:null,histogram:new Uint32Array(251)});
 if(rendering){f.rendering={...rendering};f.automaticReliefFrames+=rendering.automaticRelief?1:0;}
 f.count++;f.rendered+=rendered?1:0;f.totalMs+=intervalMs;f.cpuMs+=cpuMs;f.maxMs=Math.max(f.maxMs,intervalMs);f.over50ms+=intervalMs>50?1:0;f.over100ms+=intervalMs>100?1:0;f.histogram[Math.min(250,Math.floor(intervalMs/4))]++;
}
export function logPause(log,r,paused){if(!log)return;cap(log.pauses,{time:round(r.time),paused,at:new Date().toISOString()},200,log);log._skipFrame=true;}
export function runLogReport(log,r,score=null,endedAs='in progress'){
 if(!log)return null;const {speedIntegral,...driving}=log.driving,seconds=driving.seconds;
 const frames=Object.fromEntries(Object.entries(log.frames).map(([phase,f])=>{let sum=0,p95=0;for(let i=0;i<f.histogram.length;i++){sum+=f.histogram[i];if(sum>=Math.ceil(f.count*.95)){p95=Math.min(f.maxMs,(i+1)*4);break;}}return [phase,{frames:f.count,rendered:f.rendered,automaticReliefFrames:f.automaticReliefFrames,lastRendering:f.rendering,averageFps:round(1000*f.count/f.totalMs,1),meanFrameMs:round(f.totalMs/f.count),p95FrameMsUpperBound:round(p95),worstFrameMs:round(f.maxMs),meanCpuMs:round(f.cpuMs/f.count),over50ms:f.over50ms,over100ms:f.over100ms}];}));
 return {schema:log.schema,startedAt:log.startedAt,exportedAt:new Date().toISOString(),environment:log.environment,course:log.course,summary:{status:endedAs,score,slalomSeconds:round(r.slalomTime),totalSimulationSeconds:round(r.time),gateHits:r.gateHits,gatesAttempted:r.gates.length,recoveries:r.recoveries,...Object.fromEntries(Object.entries(driving).map(([k,v])=>[k,round(v)])),averageSpeed:round(seconds?speedIntegral/seconds:0,1),thrustPercent:round(seconds?100*driving.thrustSeconds/seconds:0,1),brakePercent:round(seconds?100*driving.brakeSeconds/seconds:0,1)},performance:frames,gates:r.gateFeedback.map(e=>({...e})),jump:r.jump?{settings:r.jump.settings,config:r.jump.config,takeoff:r.jump.takeoff,execution:r.jump.execution,notes:r.jump.rail?.notes,landing:r.jump.landing,move:r.tricks.at(-1)}:null,inputs:log.inputs,samples:log.samples,pauses:log.pauses,truncated:log.truncated,units:{time:'seconds of simulation',distance:'game units',speed:'game units per simulation second',frame:'wall-clock milliseconds; pause and hidden-tab gaps excluded; CPU excludes GPU completion',sampleRate:'10 Hz; input changes recorded separately'},note:'Local playtest data only. Frame timing describes this device/session, not a universal performance benchmark.'};
}
export function runLogFile(report){return {filename:'astra-'+report.course.id+'-'+report.startedAt.replace(/[:.]/g,'-')+'.json',text:JSON.stringify(report,null,2)};}
export function storeRunLog(storage,report){try{storage?.setItem(RUN_LOG_KEY,JSON.stringify(report));}catch{/* Export remains available in memory when storage is full. */}}
export function readRunLog(storage){try{const r=JSON.parse(storage?.getItem(RUN_LOG_KEY)??'null');return r?.schema==='astra.slalom.run.v1'&&r.course&&r.startedAt?r:null;}catch{return null;}}

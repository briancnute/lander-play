// First playable sequence uses only existing photographic discoveries.
// Add later story beats only after their images and pickup positions are approved.
export const PHOTO_STOPS=[['pair',518],['echo-creek-belva',789],['neretva-vallis',1155]];
export function attachPhotoTour(journey,samples){
 journey.lookouts=PHOTO_STOPS.map(([id,sol])=>{
  const index=samples.findIndex(p=>p.id===id),site=samples[index];
  if(!site)throw Error('Missing tour photograph: '+id);
  let checkpoint=1,best=Infinity;
  journey.checkpoints.forEach((p,i)=>{
   // The route revisits the delta; match the appropriate historical visit.
   if(i===0||Math.abs(p.sol-sol)>80)return;
   const d=Math.hypot(p.x-site.x,p.y-site.y);
   if(d<best){best=d;checkpoint=i;}
  });
  if(!Number.isFinite(best))throw Error('Missing tour route reference: '+id);
  return {...site,index,sol,checkpoint};
 });
 return journey;
}
export const tourStops=(journey,record)=>record.tourVersion===1?journey.lookouts??[]:[];
export const nextLookout=(journey,record)=>tourStops(journey,record).find(p=>!record.lookouts.includes(p.id));
export const photoTourComplete=(journey,record)=>!nextLookout(journey,record);
export function collectLookout(journey,record,before,after,dt){
 const p=nextLookout(journey,record);
 if(!p||record.status!=='active'||record.returnPoint||record.next<p.checkpoint||after.mode!=='free'||after.air||after.turnaround||!before||dt<=0)return null;
 const movement=Math.hypot(after.x-before.x,after.y-before.y);
 if(movement<.001||movement>Math.max(12,Math.abs(after.v)*dt*2+4)||Math.hypot(p.x-after.x,p.y-after.y)>=8)return null;
 record.lookouts.push(p.id);
 record.timing.stops.push({id:p.id,seconds:record.timing.total});
 return p;
}
export function restoreTiming(value){
 const t={total:0,driving:0,menus:0,activities:0,stops:[]};
 for(const key of ['total','driving','menus','activities'])if(Number.isFinite(value?.[key])&&value[key]>=0)t[key]=value[key];
 t.stops=Array.isArray(value?.stops)?value.stops.filter(p=>PHOTO_STOPS.some(([id])=>id===p.id)&&Number.isFinite(p.seconds)&&p.seconds>=0).slice(0,PHOTO_STOPS.length):[];
 return t;
}
// Foreground elapsed time includes reading and activities, but not an absent tab.
export function timeTour(record,seconds,mode){
 if(record.status!=='active'||!Number.isFinite(seconds)||seconds<=0||seconds>2)return;
 record.timing.total+=seconds;
 record.timing[['driving','menus','activities'].includes(mode)?mode:'menus']+=seconds;
}

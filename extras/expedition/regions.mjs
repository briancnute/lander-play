export let delta=null;
export let loadState='idle';
let request;
export function loadDelta(){
 if(request)return request;
 loadState='loading';
 request=fetch('delta.json').then(r=>{if(!r.ok)throw Error('Delta unavailable');return r.json();}).then(data=>{delta=data;loadState='ready';return data;}).catch(e=>{loadState='error';request=null;throw e;});
 return request;
}
export const regionAt=x=>x<1120?'Basin':x<2040?'East passage':'Delta channels';

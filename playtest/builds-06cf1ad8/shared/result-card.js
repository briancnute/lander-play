/** Surface engines keep their own scoring/storage. The modern host owns the e-card UI. */
let current;
addEventListener('message',e=>{
 if(e.source!==parent||e.origin!==location.origin||e.data?.type!=='astra-result-action'||!current)return;
 const action=e.data.action;if(action==='retry'||action==='roam'){const callback=current[action];current=null;callback?.();}
});
export function surfaceResult(data,actions){
 if(parent===window||new URLSearchParams(location.search).get('v2')!=='1')return false;
 current=actions;
 // Render again synchronously before reading a WebGL canvas whose buffer may be cleared.
 actions.draw?.();
 const photo=actions.photo?.()??document.querySelector('canvas')?.toDataURL('image/jpeg',.88);
 parent.postMessage({type:'astra-surface-result',...data,photo},location.origin);return true;
}

// Yield during construction, before the loading screen's watchdog can be starved.
export function loadingBudget(milliseconds=8){
 let start=performance.now();
 return async function checkpoint(force=false){
  if(globalThis.AstraLoading?.canceled)throw new DOMException('Canceled','AbortError');
  if(force||performance.now()-start>=milliseconds){
   await new Promise(resolve=>setTimeout(resolve,0));start=performance.now();
   if(globalThis.AstraLoading?.canceled)throw new DOMException('Canceled','AbortError');
  }
 };
}

/** Preserve caller caching and cancellation; retry only transient, idempotent downloads. */
export async function loadingFetch(input,options={}){
 const loading=globalThis.AstraLoading,signals=[loading?.signal,options.signal,AbortSignal.timeout(45000)].filter(Boolean);
 const signal=typeof AbortSignal.any==='function'?AbortSignal.any(signals):signals[0],retryable=(options.method??input?.method??'GET').toUpperCase()==='GET';
 const canceled=()=>signals.find(s=>s.aborted);
 for(let attempt=0;attempt<3;attempt++){
  const stopped=canceled();if(stopped)throw stopped.reason??new DOMException('Canceled','AbortError');
  try{
   const response=await fetch(input,{...options,signal});
   if(!retryable||attempt===2||![408,429,500,502,503,504].includes(response.status))return response;
   await response.body?.cancel();
  }catch(error){if(!retryable||attempt===2||canceled()||error?.name!=='TypeError')throw error;}
  loading?.stage('Retrying download…');
  await new Promise((resolve,reject)=>{const abort=()=>{clearTimeout(timer);signal.removeEventListener('abort',abort);reject(signal.reason??new DOMException('Canceled','AbortError'));},timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},attempt===0?150:400);signal.addEventListener('abort',abort,{once:true});if(signal.aborted)abort();});
 }
}

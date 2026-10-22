/** Preserve caller caching while canceling downloads when their launch closes. */
export function loadingFetch(input,options={}){
 const loading=globalThis.AstraLoading;
 const signals=[loading?.signal,options.signal,AbortSignal.timeout(45000)].filter(Boolean);
 const signal=typeof AbortSignal.any==='function'?AbortSignal.any(signals):signals[0];
 return fetch(input,{...options,signal});
}

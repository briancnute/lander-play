const DB='astra-jezero-photographs';
function database(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore('photos',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function storePhoto(blob,title){
 // WebKit's ephemeral stores can reject Blob-backed transactions; strings survive reloads.
 const dataURL=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob);});
 const db=await database();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite'),store=tx.objectStore('photos'),item={id:Date.now(),title,dataURL,date:new Date().toISOString()},count=store.count();count.onsuccess=()=>{if(count.result>=24){reject(Error('Photo album full (24 photographs).'));tx.abort();}else store.put(item);};tx.oncomplete=()=>resolve(item);tx.onerror=()=>reject(tx.error??Error('Photograph storage failed'));tx.onabort=()=>reject(tx.error??Error('Photograph storage aborted'));});}finally{db.close();}
}
export async function readPhotos(){const db=await database();try{return await new Promise((resolve,reject)=>{const r=db.transaction('photos').objectStore('photos').getAll();r.onsuccess=()=>resolve(r.result.reverse());r.onerror=()=>reject(r.error);});}finally{db.close();}}
export async function deletePhoto(id){const db=await database();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}finally{db.close();}}

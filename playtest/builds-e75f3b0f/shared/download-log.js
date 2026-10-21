export function downloadLog(file){
 const url=URL.createObjectURL(new Blob([file.text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=file.filename;a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}

/** Immutable launch sunlight. No clock, scoring or vehicle state is changed. */
export function readSurfaceTime(search){
 try{
  const params=new URLSearchParams(search);if(params.get('v2')!=='1')return null;
  const value=JSON.parse(params.get('surfaceTime')??'null');
  if(!value||typeof value.epoch!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.epoch))return null;
  const date=new Date(value.epoch);if(!Number.isFinite(+date)||date.toISOString()!==value.epoch||+date<Date.parse('0000-12-31T00:00:00Z')||+date>=Date.parse('3001-01-02T00:00:00Z'))return null;
  const {east,north,up}=value;if(![east,north,up].every(n=>typeof n==='number'&&Number.isFinite(n))||Math.abs(Math.hypot(east,north,up)-1)>.00001)return null;
  return {epoch:value.epoch,east,north,up};
 }catch{return null;}
}
/** Presets are local previews; the dated setting is always recoverable. */
export function bindSurfaceTime(value,container,onChange){
 if(!value||!container)return;
 const presets=[...container.querySelectorAll('[data-light]')],button=document.createElement('button');
 button.type='button';button.dataset.surfaceTime='';button.textContent='SELECTED TIME';button.setAttribute('aria-pressed','true');button.style.minHeight='44px';
 const note=document.createElement('p');note.style.cssText='font:12px/1.4 system-ui;opacity:.8';
 const date=value.epoch.slice(0,19).replace('T',' ')+' UTC';
 const select=()=>{onChange(value);button.setAttribute('aria-pressed','true');for(const p of presets)p.setAttribute('aria-pressed','false');note.textContent=date+' · Dated sunlight, held for this outing. Terrain, activities and sky scenery are authored; night visibility is assisted.';};
 for(const p of presets)p.addEventListener('click',()=>{onChange(null);button.setAttribute('aria-pressed','false');note.textContent='Lighting preview · Shared date remains '+date;},true);
 button.onclick=select;container.append(button);container.after(note);select();
}

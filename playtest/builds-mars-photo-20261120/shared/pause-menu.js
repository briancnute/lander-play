/** Rehouse existing controls without replacing their listeners or stored preferences. */
export function menuSection(parent,label,nodes){
 const section=document.createElement('details'),summary=document.createElement('summary');summary.textContent=label;section.append(summary);
 for(const node of nodes)if(node)section.append(node);
 parent.append(section);return section;
}
export function callerExitLabel(fallback='Back to Play'){
 return new URLSearchParams(location.search).get('back')||fallback;
}
export function stylePauseMenu(dialog){
 dialog.classList.add('special-pause');
 dialog.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const opened=[...dialog.querySelectorAll('details[open]')];if(opened.length){e.preventDefault();e.stopImmediatePropagation();opened.at(-1).open=false;}},true);
 if(document.querySelector('[data-special-menu-style]'))return;
 const style=document.createElement('style');style.dataset.specialMenuStyle='';style.textContent=`
 dialog.special-pause{box-sizing:border-box;width:min(520px,calc(100vw - 24px));max-height:calc(100dvh - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom));overflow:auto;padding:18px;color:#e5eceb;background:#142028;border:1px solid #607078;border-radius:12px}
 .special-pause button,.special-pause summary{min-height:44px;box-sizing:border-box;font-size:14px;line-height:1.3;padding:10px 12px}.special-pause .sheet-head{position:static;display:flex;justify-content:space-between;height:auto;min-height:0;margin:0}.special-pause .sheet-head h2{margin:0}.special-pause .menu-scroll{min-height:0;max-height:none;overflow:visible;flex:none}.special-pause .settings-stack{gap:6px}.special-pause .sheet-tabs{flex-wrap:wrap}.special-pause .sheet-tabs button{flex:1;font-size:11px;padding:8px 4px}.special-pause>button{width:100%}.special-pause p:empty,.special-pause .row:empty{display:none}.special-pause>details{margin:6px 0}.special-pause .pause-return{position:sticky;bottom:-18px;background:#142028;z-index:2}.special-pause summary{cursor:pointer;padding:12px 0}dialog.special-pause details{padding:0;border-top:1px solid #52616b;margin-top:8px}.special-pause h2{font-size:22px;margin:0 0 12px}.special-pause p{line-height:1.5}.special-pause .pause-primary{position:sticky;top:-18px;background:#142028;z-index:2;padding:8px 0;display:flex;gap:8px}.special-pause .pause-primary>button{flex:1;margin:0}.activity-explanation p{font-size:14px;line-height:1.5}
 `;document.head.append(style);
}
export function pausePrimary(dialog,resume,restart){const row=document.createElement('div');row.className='pause-primary';row.append(resume);if(restart)row.append(restart);(dialog.querySelector('.sheet-head')||dialog.querySelector('h2'))?.after(row);return row;}

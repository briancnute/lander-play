// Apollo's stable Ride / Map / About treatment, scoped to Jezero.
export function mountJezeroMenu({pause,map,openRide,openMap,resume,exit,redraw,progress,locked=()=>false,settings=[],mapCanvas,mapTools=[],mapOptions=[],places=[],selectPlace,travel,selection,extraRide=[],legacyControls=false,mission=null}){
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('./jezero-menu.css',import.meta.url).href;document.head.append(css);
 const rover=mission?.image??new URL('../mars-renderer/assets/perseverance-preview.webp',import.meta.url).href;
 const name=mission?.name??'Perseverance',location=mission?.location??'Jezero Crater';
 let tab='ride';const shells=[];
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
 const ride=make('section','jm-ride'),about=make('section','jm-about');ride.id='jm-ride';about.id='jm-about';
 ride.innerHTML=`<div class="jm-ride-top"><fieldset><legend>Mission</legend><p class="jm-progress"></p></fieldset><fieldset><legend>Vehicle</legend><img src="${rover}" alt="${name} rover" width="112" height="64"><span>${name}</span></fieldset></div><fieldset><legend>Controls</legend><dl class="jm-controls"></dl><details class="jm-control-more"><summary>More</summary><h4>On ground</h4><p>Double-tap gas for turbo. Brake to stop; release and press again to reverse.</p><h4>In air</h4><p>Steer to turn. Brake alone lowers the rover; double-tap for a slam.</p></details></fieldset>`;
 if(legacyControls){const paragraphs=ride.querySelectorAll('.jm-control-more p');paragraphs[0].textContent='Release gas and hold Brake to stop or reverse. While driving, hold gas and tap Brake to use a boost cell.';paragraphs[1].textContent='Steer during a jump. In overhead drawing, Brake becomes Hop.';}
 about.innerHTML=`<img class="jm-about-rover" src="${rover}" alt="${name} rover"><h3>About this mission</h3><p>Perseverance explores Jezero’s crater floor, ancient river delta and surrounding rocks to investigate past environments and search for preserved signs of ancient life. Its rock and soil samples preserve a record of those environments for further study.</p><details><summary>Sources</summary><p>NASA / USGS terrain and rover history. Tour connections and small terrain details are interpreted; turbo and airborne moves are game additions.</p><a href="https://science.nasa.gov/mission/mars-2020-perseverance/" target="_blank" rel="noopener">NASA · Perseverance ↗</a></details>`;
 if(mission){about.querySelector(':scope > p').textContent=mission.summary;about.querySelector('details p').textContent=mission.note;const link=about.querySelector('a');link.href=mission.source;link.textContent=mission.sourceLabel+' ↗';}
 if(settings.length){const d=make('details');d.append(make('summary',null,'Preferences'),...settings);about.append(d);}
 if(extraRide.length){const d=make('details','jm-extra');d.append(make('summary',null,'Tools'),...extraRide);ride.append(d);}
 const controls=()=>{const touch=matchMedia('(pointer:coarse)').matches;ride.querySelector('.jm-controls').innerHTML=[['Steer',touch?'‹  ›':'← → / A D'],['Gas',touch?'Drive':'Space'],['Brake',touch?'Brake':'Shift']].map(([name,key])=>`<div><dt>${name}</dt><dd><kbd>${key}</kbd></dd></div>`).join('');};controls();matchMedia('(pointer:coarse)').addEventListener('change',controls);
 function choose(next){tab=next;if(next==='map')openMap();else openRide();sync();}
 for(const dialog of [pause,map]){
  const legacy=make('div','jm-legacy');legacy.hidden=true;legacy.append(...dialog.childNodes);dialog.append(legacy);dialog.classList.add('jezero-menu');dialog.setAttribute('aria-label',name+' menu');dialog.removeAttribute('aria-labelledby');
  const shell=make('div','jm-shell');shell.innerHTML=`<div class="jm-heading"><img src="${rover}" alt="" width="40" height="40"><div><h2>${name}</h2><p>${location}</p></div></div><div class="jm-tabs" role="tablist" aria-label="Pause menu"></div><div class="jm-content"></div><footer class="jm-footer"></footer>`;
  const tabs=shell.querySelector('.jm-tabs');for(const name of ['ride','map','about']){const b=make('button',null,name[0].toUpperCase()+name.slice(1));b.dataset.jmTab=name;b.id=dialog.id+'-tab-'+name;b.setAttribute('role','tab');b.setAttribute('aria-controls','jm-'+name);b.onclick=()=>choose(name);tabs.append(b);}
  tabs.addEventListener('keydown',e=>{const buttons=[...tabs.children],i=buttons.indexOf(document.activeElement),n=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:null;if(n!==null){e.preventDefault();if(buttons[n].disabled)return;choose(buttons[n].dataset.jmTab);const active=map.open?map:pause;active.querySelector(`[data-jm-tab="${buttons[n].dataset.jmTab}"]`).focus();}});
  const footer=shell.querySelector('footer'),back=make('button','primary','Resume'),out=make('button',null,'Exit');back.onclick=resume;out.onclick=exit;footer.append(back);if(dialog===map&&travel){travel.textContent='Travel';footer.append(travel);}footer.append(out);dialog.append(shell);shells.push({dialog,shell,back});
  dialog.addEventListener('beforetoggle',e=>{if(e.newState==='open'){if(dialog===map)tab='map';else if(tab==='map')tab='ride';sync();}});
 }
 const content=pause.querySelector('.jm-content');content.append(ride,about);
 const mapBody=map.querySelector('.jm-content');mapBody.classList.add('jm-map');mapBody.id='jm-map';
 const toolbar=make('div','jm-map-tools');toolbar.append(...mapTools);if(mapOptions.length){const options=make('details');options.append(make('summary',null,'More'),...mapOptions);toolbar.append(options);}mapBody.append(toolbar);
 const layout=make('div','jm-map-layout'),surface=make('div','jm-map-surface'),list=make('div','jm-places');list.setAttribute('role','group');list.setAttribute('aria-label','Places');surface.append(mapCanvas);layout.append(surface,list);mapBody.append(layout);if(selection)mapBody.append(selection);
 places.forEach((p,i)=>{const b=make('button',null,p.name);b.dataset.jmPlace=String(i);b.onclick=()=>{selectPlace(i);for(const button of list.children)button.setAttribute('aria-pressed',String(button===b));};b.setAttribute('aria-pressed','false');list.append(b);});
 function sync(){
  const blocked=locked();ride.hidden=tab!=='ride';about.hidden=tab!=='about';ride.querySelector('.jm-progress').textContent=progress();if(extraRide.length)ride.querySelector('.jm-extra').hidden=extraRide.every(node=>node.hidden);
  for(const {dialog,shell,back}of shells){for(const b of shell.querySelectorAll('[role=tab]')){const active=b.dataset.jmTab===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;b.disabled=blocked&&b.dataset.jmTab!=='map';}back.textContent=blocked?'Back':'Resume';const panel=dialog===map?mapBody:tab==='about'?about:ride;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',dialog.id+'-tab-'+tab);}
  if(map.open)requestAnimationFrame(()=>redraw());
 }
 if(map.open)tab='map';sync();
 return {showRide(){tab='ride';openRide();sync();},sync};
}

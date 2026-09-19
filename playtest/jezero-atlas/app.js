const {regions,pockets,builtArea,odometerKm}=window.ATLAS;
document.querySelector('#built-percent').textContent=`${(builtArea/160*100).toFixed(1)}%`;
document.querySelector('#built-area').textContent=`${builtArea.toFixed(2)} km² on Mars / ${(builtArea*.64).toFixed(2)} km² in-game`;
document.querySelector('#odometer').textContent=`${odometerKm.toFixed(2)} km`;
document.querySelector('#game-route').textContent=`${(odometerKm*.8).toFixed(1)} km`;
document.querySelector('#region-buttons').innerHTML=regions.map(r=>`<button data-region="${r.id}" aria-pressed="false"><span class="number ${r.status==='Built'?'live':''}">${r.id}</span>${r.name}</button>`).join('');
document.querySelector('#pocket-list').innerHTML=pockets.map(p=>`<p><b>${p.id} / ${p.name}</b><br>${p.text}</p>`).join('');
function select(id,pocket=false){
 const r=(pocket?pockets:regions).find(r=>r.id===id);
 document.querySelector('#selection').innerHTML=`<p class="eyebrow">${pocket?'CANDIDATE ACTIVITY':r.status.toUpperCase()}</p><h2>${r.id} / ${r.name}</h2><p>${r.text}</p>`;
 document.querySelectorAll('[data-region]').forEach(e=>{e.classList.toggle('selected',!pocket&&e.dataset.region===id);if(e.tagName==='BUTTON')e.setAttribute('aria-pressed',String(!pocket&&e.dataset.region===id));});
 document.querySelectorAll('[data-pocket]').forEach(e=>e.classList.toggle('selected',pocket&&e.dataset.pocket===id));
}
document.querySelectorAll('[data-region],[data-pocket]').forEach(e=>{
 const activate=()=>select(e.dataset.region??e.dataset.pocket,!!e.dataset.pocket);
 e.addEventListener('click',activate);
 if(e.tagName!=='BUTTON')e.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();activate();}});
});
document.querySelectorAll('[data-toggle]').forEach(e=>e.addEventListener('change',()=>document.querySelectorAll(`[data-layer="${e.dataset.toggle}"]`).forEach(layer=>{layer.style.display=e.checked?'':'none';layer.querySelectorAll('[tabindex]').forEach(pin=>pin.tabIndex=e.checked?0:-1);})));
let zoom=1;
function setZoom(value){zoom=Math.max(1,Math.min(4,value));document.querySelector('#world-map').style.width=`${zoom*100}%`;document.querySelector('#zoom-out').disabled=zoom===1;document.querySelector('#zoom-in').disabled=zoom===4;}
document.querySelector('#zoom-in').onclick=()=>setZoom(zoom+1);
document.querySelector('#zoom-out').onclick=()=>setZoom(zoom-1);
document.querySelector('#fit').onclick=()=>{setZoom(1);document.querySelector('.map-scroll').scrollTo(0,0);};
setZoom(1);select('5');

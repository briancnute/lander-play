import {mountJezeroMenu} from '../shared/jezero-menu.js';
import {createTourMap} from '../shared/tour-map.js';
import {curiosityMenuMission} from './menu-mission.js';
export function mountGaleExploreMenu({area,getState,sites,openRide,openMap,resume,exit}){
 const el=id=>document.getElementById(id),pause=el('settings'),map=el('map-dialog'),canvas=el('map'),tour={...area.guidedTour,checkpoints:sites.stops};
 const focus=document.createElement('button');focus.id='gt-map-focus';focus.hidden=true;canvas.before(focus);
 const getRun=()=>({leg:0,visitedStops:sites.stops.flatMap((p,i)=>sites.visits.data.visited.includes(p.id)?[i]:[])});
 const tourMap=createTourMap({dialog:map,canvas,tour,area,getState,getRun,isRoaming:()=>true,findSafe:sites.findTravel,onJump:sites.travel,compact:true});
 const redraw=()=>{tourMap.draw();const selected=tourMap.selected;if(selected){const p=sites.stops.find(p=>Math.hypot(p.x-selected.requested.x,p.y-selected.requested.y)<=52);el('gt-map-location').textContent=p?.name??'Visited site';}else el('gt-map-location').textContent=sites.visits.complete?'Choose a site.':'Visit a site to unlock travel.';};
 const base=mountJezeroMenu({pause,map,mission:curiosityMenuMission,openRide,openMap,resume,exit,redraw,progress:()=>`${sites.visits.data.visited.length} / ${sites.stops.length} sites visited`,mapCanvas:canvas,
  mapTools:['gt-layer-map','gt-layer-satellite','gt-zoom-in','gt-zoom-out'].map(el),mapOptions:[el('gt-map-fit'),el('gt-map-rover'),el('gt-history').closest('label'),el('gt-map-credit')],
  places:sites.stops,selectPlace:i=>{const select=el('gt-map-stops');select.value=String(i);select.dispatchEvent(new Event('change'));redraw();},travel:el('gt-map-jump'),selection:el('gt-map-location')});
 pause.querySelector('.jm-progress').after(sites.intro,sites.hideLabel,sites.warning);
 canvas.setAttribute('aria-label','Site map. Drag to pan; pinch to zoom. Select a visited site to travel.');
 const sync=()=>{base.sync();map.querySelectorAll('[data-jm-place]').forEach(b=>{const p=sites.stops[Number(b.dataset.jmPlace)],known=sites.visits.canTravel(p);b.disabled=!known;b.textContent=known?p.name:'???';b.setAttribute('aria-label',known?p.name:'Unvisited site');});for(const option of el('gt-map-stops').options){if(option.value==='')continue;const p=sites.stops[Number(option.value)];option.disabled=!sites.visits.canTravel(p);option.textContent=option.disabled?'???':p.name;}};
 for(const d of [pause,map])d.addEventListener('beforetoggle',e=>{if(e.newState==='open')sync();});sync();
 return {menu:{...base,sync},tourMap,draw:redraw};
}

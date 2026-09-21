import {viewBounds,zoomView,panView,smoothRoute,activitySymbols,minimapSpan,labelLevel} from './map-view.js';
import {createRouteRibbon} from './route-ribbon.js';
import {WORLD_SCALE,MAP_SIZE} from './scale.js';
import {worldLocations} from './world-sites.js';
import {loadJourney,restoreExpedition,creditActivity,ACTIVITY_IDS} from './expedition.js';
import {createActivities} from './activities.js';
import {stepArtHop} from './art-hop.js';
import {landingCircuit} from './activity-courses.js';
import {raceSurface} from '../mars-renderer/race-surface.js';
import {photos,photoDate} from './photos.js';
import {MiniMap} from './minimap.js';
import {mapBounds,mapFrame,mapPoint,raceSite,mapTarget,advanceEntry,CLOSE_RANGE,regionAt,reachableTarget} from './navigation.js';
import {loadArea,discoveries,SITE_VERSION} from './area.js';
import {regions,detailIndices,regionIdForDetail,revealFloorRegions,detailAvailable,retiredDetailIndices} from './regions.js';
import {explorationMapBounds,containsPosition} from './belva-bounds.js';
import {landmarks} from './landmarks.js';
import {toMetres} from './terrain.js';
import {GPURenderer} from '../mars-renderer/gpu.js';
import {driveStep} from '../mars-renderer/driving.js';
import {kit,KITS,explorationKit,raceKit} from '../mars-renderer/kits.js';
import {capturePose,displayState} from '../mars-renderer/motion.js';
import {DustCells} from '../mars-renderer/dust-cells.js';
import {createStormMap} from './storm-map.js';
import {NightSky} from '../mars-renderer/night-sky.js';
import {openCraft} from '../mars-renderer/craft.js';
import {box,triangle} from '../mars-renderer/geometry.js';
import {create,reverseAvailable} from '../mars-renderer/simulation.js';
const $=s=>document.querySelector(s),KEY='astra.jezero.'+SITE_VERSION;
const RACE_VERSION='manual-boost-v7';
const kindLabel=(kind,long=false)=>kind==='region'?(long?'JEZERO / REGION':'REGION'):kind==='site'?(long?'JEZERO / VIEWPOINT':'VIEWPOINT'):kind==='history'?(long?'JEZERO / HISTORY STOP':'HISTORY STOP'):(long?'JEZERO / FACT':'FACT');
const SITE_COLORS={region:'#d5edc1',site:'#8fd5df',history:'#efc786',fact:'#e8a58e'};
const siteColor=p=>SITE_COLORS[p.kind]??SITE_COLORS.fact;
const clock=t=>`${Math.floor(t/60)}:${(t%60).toFixed(2).padStart(5,'0')}`;
let area,gpu,state,previous,paused=true,ready=false,welcome=true,last=0,acc=0,lastDraw=0,lastSave=0,lastMap=0,lastHud=0,dirty=true,selected='perseverance',quality='balanced',light='day',backTo=null,saveWarned=false;
let routeDisplay=[],miniSpan=3200,miniTime=0;const mapView={zoom:1,x:0,y:0};
let journey,expedition,expeditionRecord,activitySave={},basemap='relief';
const satellite=new Image();satellite.src=new URL('./assets/jezero-satellite.webp',import.meta.url).href;satellite.onload=()=>dirty=true;
satellite.onerror=()=>{basemap='relief';for(const b of document.querySelectorAll('[data-basemap]')){b.disabled=b.dataset.basemap==='satellite';b.setAttribute('aria-pressed',String(b.dataset.basemap==='relief'));if(b.disabled)b.title='Satellite imagery unavailable';}dirty=true;};
const mods={kit:false};let stormsEnabled=true,raceExplorer=null;
let raceId='delta-trial',specialWasHeld=false,reverseHeld=false;
const nav={target:null,labels:false};let cardSite=null,mapReturn=null,pendingJump=null;let entryTime=0,entryArmed=true;const observedInside=new Set();
const input={drive:false,brake:false,steer:0},keys=new Set(),pointers=new Map();
const progress={seenLandmarks:[],collected:[],regions:[],completedActivities:[],legacyBests:{},bests:{},rover:'perseverance',position:null};
const minimap=new MiniMap($('#mini-map-button'),$('#map-return'),()=>{mapReturn=null;openDialog('#map-dialog');},()=>save());
const storm=new DustCells(),drawStormMap=createStormMap(),sky=new NightSky($('#night-sky')),relief=new Image();relief.src=new URL('./assets/relief.webp',import.meta.url).href;
function syncFloor(){
 if(!area||mapBounds.minX===explorationMapBounds.minX)return;
 revealFloorRegions();area.unlockFloor();Object.assign(mapBounds,explorationMapBounds);
 storm.southBoundary=area.bounds.maxY+1600;
 relief.src=new URL('./assets/jezero-relief.png',import.meta.url).href;relief.onload=()=>{dirty=true;};
}
function readSave(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(!s||s.version!==SITE_VERSION)return;
 const coordinateRatio=WORLD_SCALE/(s.worldScale??1);for(const p of [s.position,s.navigation?.target])if(p){p.x*=coordinateRatio;p.y*=coordinateRatio;}
 progress.collected=Array.isArray(s.collected)?[...new Set(s.collected.filter(i=>(s.siteCatalog>=2||i===3)&&Number.isInteger(i)&&i>=0&&i<discoveries.length))]:[];
 progress.regions=Array.isArray(s.regions)?[...new Set(s.regions.filter(id=>regions.some(r=>(r.regionId??r.id)===id)))]:[];
 for(const i of progress.collected){const id=i===3?'kodiak':regionIdForDetail(i);if(id&&!progress.regions.includes(id))progress.regions.push(id);}
 progress.legacyBests={...s.legacyBests,...(s.raceVersion===RACE_VERSION?{}:Object.fromEntries(Object.entries(s.bests??{}).map(([id,time])=>[(s.raceVersion??'original')+':'+id,time])))};
 if(s.raceVersion===RACE_VERSION&&s.bests&&typeof s.bests==='object')for(const course of ['delta-trial','landing-trial'])for(const rover of Object.keys(KITS)){const id=course+':'+rover;if(Number.isFinite(s.bests[id])&&s.bests[id]>0)progress.bests[id]=s.bests[id];}
 progress.completedActivities=Array.isArray(s.completedActivities)?[...new Set(s.completedActivities.filter(id=>ACTIVITY_IDS.includes(id)))]:[];
 expeditionRecord=restoreExpedition(s.expedition,journey);activitySave=s.activityState&&typeof s.activityState==='object'?s.activityState:{};basemap=s.mapStyleVersion===2&&s.basemap==='satellite'?'satellite':'relief';
 // A saved record proves completion for players upgrading from the previous save shape.
 if((Object.keys(progress.bests).length||Object.keys(s.bests??{}).length)&&!progress.completedActivities.includes(raceSite.id))progress.completedActivities.push(raceSite.id);
 syncFloor();
 if(area.extension.unlocked){for(const id of s.regions??[])if(['landing-plain','seitah'].includes(id)&&!progress.regions.includes(id))progress.regions.push(id);for(const i of progress.collected){const id=regionIdForDetail(i);if(id&&!progress.regions.includes(id))progress.regions.push(id);}}
 if(s.navigation?.target){const t=s.navigation.target;if(Number.isFinite(t.x)&&Number.isFinite(t.y)&&t.x>=mapBounds.minX&&t.x<=mapBounds.width&&t.y>=mapBounds.minY&&t.y<=mapBounds.maxY)nav.target={...reachableTarget(t,area.bounds),name:typeof t.name==='string'?t.name:'Target',...(ACTIVITY_IDS.includes(t.activityId)?{activityId:t.activityId}:{})};}
 mods.kit=s.mods?.kit===true||s.mods?.speed===true||s.mods?.air===true;stormsEnabled=s.stormsEnabled!==false;minimap.restore(s.minimap);nav.labels=s.navigation?.labels===true;
 progress.seenLandmarks=Array.isArray(s.seenLandmarks)?[...new Set(s.seenLandmarks.filter(id=>landmarks.some(p=>p.id===id)))]:[];
 if(KITS[s.rover])selected=s.rover;
 if(['balanced','performance'].includes(s.quality))quality=s.quality;if(['day','dusk','night'].includes(s.light))light=s.light;
 if(s.position&&['x','y','heading'].every(k=>Number.isFinite(s.position[k]))&&containsPosition(s.position,area.bounds))progress.position=s.position;
 }catch{/* Corrupt or unavailable storage cannot prevent exploration. */}}
function save(){if(!ready)return;syncFloor();const position=state.mode==='free'&&!state.air&&!state.turnaround?{x:state.x,y:state.y,heading:state.heading}:progress.position;
 try{localStorage.setItem(KEY,JSON.stringify({version:SITE_VERSION,worldScale:WORLD_SCALE,siteCatalog:3,collected:progress.collected,regions:progress.regions,completedActivities:progress.completedActivities,bests:progress.bests,legacyBests:progress.legacyBests,raceVersion:RACE_VERSION,rover:raceExplorer??selected,position,quality,light,seenLandmarks:progress.seenLandmarks,navigation:nav,mods,stormsEnabled,minimap:minimap.state,expedition:expeditionRecord,activityState:expedition?.snapshot()??activitySave,basemap,mapStyleVersion:2}));progress.position=position;}catch{if(!saveWarned){saveWarned=true;notify('Progress cannot be saved in this browser.');}}}
function notify(text,seconds=5){state.message=text;state.messageUntil=state.t+seconds;dirty=true;}
function sync(){const held=new Set(pointers.values());input.drive=keys.has('w')||keys.has('arrowup')||held.has('drive');input.special=keys.has(' ')||keys.has('arrowdown')||keys.has('s')||held.has('brake');input.brake=false;input.steer=(keys.has('d')||keys.has('arrowright')||held.has('right')?1:0)-(keys.has('a')||keys.has('arrowleft')||held.has('left')?1:0);}
function clearInput(){keys.clear();pointers.clear();sync();document.querySelectorAll('.controls .active').forEach(b=>b.classList.remove('active'));}
function lighting(){state.solar=light==='night'?{east:0,north:0,up:-1}:light==='dusk'?{east:-.65,north:.759,up:.05}:{east:-.45,north:.6,up:.66};$('#scene').style.background=light==='night'?'linear-gradient(#03060c,#080c14 65%,#151720)':light==='dusk'?'linear-gradient(#211c2c,#775751 58%,#745b51)':'linear-gradient(#75482f,#be8b62 53%,#b48059)';}
function resetAt(p=area.start,mode='free'){
 state=create(mode,area.course,selected);Object.assign(state,{x:p.x,y:p.y,heading:p.heading??-Math.PI*.35,z:area.ground(p.x,p.y),tune:mode==='trial'?raceKit(selected,true):explorationKit(selected,mods),collected:[...progress.collected],regions:[...progress.regions],messageUntil:0});
 previous=capturePose(state,state.z);gpu.reset(state);acc=0;clearInput();lighting();dirty=true;updateHud();
 state.raceBoosts=mode==='trial'?3:0;specialWasHeld=false;reverseHeld=false;
}
function closeDialogs(){for(const d of document.querySelectorAll('dialog[open]'))d.close();backTo=null;}
function setPause(value){paused=value;clearInput();acc=0;if(state)previous=capturePose(state,area.ground(state.x,state.y));$('#lamps').hidden=true;dirty=true;if(value)save();else if(document.activeElement instanceof HTMLElement)document.activeElement.blur();}
function openDialog(id,caller=null){if(id==='#notes-dialog')id='#jump-dialog';if(expedition?.photo)expedition.closeCamera();closeDialogs();backTo=caller;setPause(true);$(id).showModal();if(id==='#pause-dialog')$('#resume').textContent='RESUME';if(id==='#map-dialog'){$('#site-labels').checked=nav.labels;drawMap();}if(id==='#notes-dialog')renderNotes();if(id==='#jump-dialog')renderJumpSites();syncMenuTabs();}
function closeSheet(){const back=backTo;if($('#map-dialog').open&&mapReturn){const r=mapReturn;mapReturn=null;showCard(r.site,r.caller,r.site.kind);notesReturn=r.notes;return;}closeDialogs();if(back)openDialog(back,back==='#notes-dialog'?notesReturn:back==='#map-dialog'&&mapReturn?'#discovery-dialog':null);else setPause(false);}
function restoreExplorer(){if(raceExplorer){selected=raceExplorer;raceExplorer=null;state.roverId=selected;state.tune=explorationKit(selected,mods);state.v=state.vz=0;state.air=false;state.z=area.ground(state.x,state.y);previous=capturePose(state,state.z);gpu.reset(state);}}
function explore(){restoreExplorer();welcome=false;$('#welcome').hidden=true;closeDialogs();state.mode='free';state.done=false;state.countdown=0;setPause(false);updateHud();save();}
function startLap(){raceExplorer??=selected;entryTime=0;entryArmed=false;$('#scene').classList.remove('race-transition');void $('#scene').offsetWidth;$('#scene').classList.add('race-transition');welcome=false;$('#welcome').hidden=true;closeDialogs();resetAt(area.start,'trial');setPause(false);}
function endLap(){restoreExplorer();state.mode='free';state.tune=explorationKit(selected,mods);state.done=false;state.countdown=0;state.time=0;notify('Explore freely');updateHud();save();}
function finishLap(){const time=state.time,key=raceId+':'+selected,old=progress.bests[key];if(!old||time<old)progress.bests[key]=time;if(!progress.completedActivities.includes(raceId))progress.completedActivities.push(raceId);
 creditActivity(expeditionRecord,raceId);expedition?.raceComplete();
 $('#result-explore').textContent='Continue as '+KITS[selected].name;$('#result-restore').hidden=!raceExplorer||raceExplorer===selected;$('#result-restore').textContent='Resume as '+KITS[raceExplorer??selected].name;
 $('#result-time').textContent=clock(time);$('#result-best').textContent=!old||time<old?'Your best in this rover':`Best · ${clock(old)}`;
 state.mode='free';state.done=false;state.countdown=0;state.v=0;openDialog('#result-dialog');updateHud();save();}
let currentRegion='';
function specialMode(){if(expedition?.active?.id==='art')return 'Hop';if(!state.air&&(reverseHeld||state.impact>0||area.rocks.some(([x,y,r])=>Math.hypot(x-state.x,y-state.y)<r+18&&(x-state.x)*Math.sin(state.heading)-(y-state.y)*Math.cos(state.heading)>0)))return 'Reverse';return state.mode==='trial'?'Boost':'Camera';}
function updateHud(){if(!state)return;const region=regionAt(state);if(region!==currentRegion){currentRegion=region;$('#region-name').textContent=region;}const racing=state.mode==='trial',counting=racing&&state.countdown>0,count=String(Math.ceil(state.countdown));$('#race-hud').hidden=!racing||counting;$('#timer').textContent=clock(state.time);const countdown=$('#race-countdown');countdown.hidden=!counting;if(counting&&countdown.textContent!==count)countdown.textContent=count;const special=specialMode();$('#brake').textContent=special==='Boost'?`Boost ${state.raceBoosts??3}`:special;$('#brake').title=special==='Camera'?'Camera when stopped':special==='Hop'?'Hold to lift; steer and drive to reposition':special;$('#brake').dataset.action=special.toLowerCase();$('#brake').setAttribute('aria-label',special==='Boost'?`Boost, ${state.raceBoosts??3} remaining`:special);$('#entry-loading').hidden=paused||entryTime<=0;$('#entry-loading progress').value=entryTime;$('#toast').textContent=welcome?'':state.boundary?'Return toward the explored basin':state.messageUntil>state.t?state.message:'';}

let notesReturn=null;
function inspectPhoto(site,photo){$('#photo-title').textContent=site.name;$('#photo-image').src=new URL(photo.image,import.meta.url).href;$('#photo-image').alt=photo.imageAlt;$('#photo-date').textContent=photoDate(photo.capturedAt);$('#photo-description').textContent=photo.imageDescription??photo.imageAlt;$('#photo-credit').textContent=photo.imageCredit;$('#photo-source').href=photo.source;$('#photo-dialog').showModal();}
$('#photo-close').onclick=()=>$('#photo-dialog').close();
function showCard(p,caller,kind){if(caller==='#notes-dialog')notesReturn=backTo;
 cardSite=p;$('#discovery-dialog').dataset.kind=kind;
 $('#discovery-kind').textContent=kindLabel(kind,true);
 $('#discovery-title').textContent=p.name;$('#discovery-fact').textContent=p.fact;$('#discovery-detail').textContent=p.detail;
 $('.discovery-map-context').hidden=false;$('#discovery-map-note').textContent=p.locationNote??'Accessible discovery location';$('#discovery-map-button').setAttribute('aria-label',p.id==='landing'?'Open map for the Three Forks history stop, not the actual touchdown point':'Open detailed discovery location map');
 const strip=$('#discovery-views');strip.replaceChildren();
 const views=photos(p);if(p.routeMap)views.push({image:'./assets/mission-route.svg',imageAlt:'Recorded rover route from the true landing site into Three Forks',imageDescription:'NASA drive vertices through sol 692. The dashed boundary marks the original Three Forks crop. The actual landing site becomes reachable in the unlocked landing plain. This is a mission-history map, not a driving target.',imageCredit:'NASA Mars 2020 public map data · ASTRA map rendering',source:'https://science.nasa.gov/mission/mars-2020-perseverance/location-map/'});for(const [i,v]of views.entries()){const figure=document.createElement('figure'),button=document.createElement('button'),img=document.createElement('img'),caption=document.createElement('figcaption');button.type='button';button.setAttribute('aria-label',(v.imageType==='map'?'Open map ':'Open photograph ')+(i+1)+' of '+p.name);img.src=new URL(v.image,import.meta.url).href;img.alt=v.imageAlt;if(!i)img.id='discovery-image';img.onerror=()=>{img.alt='Photograph unavailable — open for source details';};button.append(img);button.onclick=()=>inspectPhoto(p,v);caption.textContent=v.imageType==='map'?'Supporting map · not a rover photograph':(v.iconic?'Iconic view · ':'')+photoDate(v.capturedAt);figure.append(button,caption);strip.append(figure);}
 const onlyMaps=views.every(v=>v.imageType==='map');$('.photo-hint').hidden=onlyMaps;strip.setAttribute('aria-label',onlyMaps?'Supporting maps':'Photographs');$('#discovery-source').textContent=onlyMaps?'Source':'Image source';
 $('#discovery-source').href=views[0].source;openDialog('#discovery-dialog',caller);strip.scrollLeft=0;drawCardMap();
 $('#discovery-continue').textContent=caller?'Back to sites':state.mode==='trial'?'Resume time trial':'Continue exploring';
}
function showDiscovery(i,caller=null){const p=discoveries[i];if(p&&progress.collected.includes(i))showCard(p,caller,p.kind);}
function setMapTarget(x,y,w,h){const target=mapTarget(x,y,w,h,area.bounds,viewBounds(mapBounds,mapView)),old=nav.target;const same=old&&Math.hypot(old.x-target.x,old.y-target.y)<Math.min(120,12/mapFrame(w,h,viewBounds(mapBounds,mapView)).scale);nav.target=same||Math.hypot(target.x-state.x,target.y-state.y)<=CLOSE_RANGE?null:target;save();drawMap();drawMap($('#mini-map'),true);dirty=true;}
$('#clear-target').onclick=()=>{nav.target=null;save();drawMap();drawMap($('#mini-map'),true);dirty=true;};
let mapDrag=null,mapMoved=false;
const mapCanvas=$('#map');
mapCanvas.onpointerdown=e=>{mapMoved=false;mapDrag={id:e.pointerId,x:e.clientX,y:e.clientY};mapCanvas.setPointerCapture(e.pointerId);};
mapCanvas.onpointermove=e=>{if(!mapDrag||mapDrag.id!==e.pointerId)return;const dx=e.clientX-mapDrag.x,dy=e.clientY-mapDrag.y;if(Math.hypot(dx,dy)>3||mapMoved){mapMoved=true;const r=mapCanvas.getBoundingClientRect();panView(mapBounds,mapView,dx,dy,r.width,r.height);mapDrag.x=e.clientX;mapDrag.y=e.clientY;drawMap();}};
mapCanvas.onpointerup=e=>{if(!mapDrag||mapDrag.id!==e.pointerId)return;mapDrag=null;if(!mapMoved){const r=mapCanvas.getBoundingClientRect();setMapTarget(e.clientX-r.left,e.clientY-r.top,r.width,r.height);}};
mapCanvas.onpointercancel=()=>{mapDrag=null;};mapCanvas.onlostpointercapture=()=>{mapDrag=null;};
const mapTools=document.createElement('div');mapTools.className='map-tools';
for(const [id,label,symbol,action]of [['map-zoom-in','Zoom in','+',()=>zoomView(mapBounds,mapView,1.5)],['map-zoom-out','Zoom out','−',()=>zoomView(mapBounds,mapView,1/1.5)],['map-center','Center on rover','⌖',()=>{mapView.x=state.x;mapView.y=state.y;zoomView(mapBounds,mapView,1);}],['map-fit','Show whole map','⛶',()=>zoomView(mapBounds,mapView,1/mapView.zoom)]]){
 const b=document.createElement('button');b.id=id;b.title=label;b.setAttribute('aria-label',label);b.textContent=symbol;b.onclick=()=>{action();drawMap();};mapTools.append(b);
}$('.map-wrap').append(mapTools);
mapCanvas.addEventListener('wheel',e=>{e.preventDefault();zoomView(mapBounds,mapView,e.deltaY<0?1.2:1/1.2);drawMap();},{passive:false});
let mapCursor={x:.5,y:.5};$('#map').onkeydown=e=>{const moves={ArrowLeft:[-.025,0],ArrowRight:[.025,0],ArrowUp:[0,-.025],ArrowDown:[0,.025]};if(moves[e.key]){e.preventDefault();mapCursor.x=Math.max(0,Math.min(1,mapCursor.x+moves[e.key][0]));mapCursor.y=Math.max(0,Math.min(1,mapCursor.y+moves[e.key][1]));$('#map').dataset.cursor=JSON.stringify(mapCursor);drawMap();}if(e.key==='Enter'){e.preventDefault();const r=$('#map').getBoundingClientRect();setMapTarget(mapCursor.x*r.width,mapCursor.y*r.height,r.width,r.height);}};
$('#map').onblur=()=>{delete $('#map').dataset.cursor;drawMap();};
function renderNotes(){renderJumpSites();}

function raceMapBounds(){const xs=area.course.route.map(p=>p.x),ys=area.course.route.map(p=>p.y),pad=180;return {minX:Math.min(...xs)-pad,width:Math.max(...xs)+pad,minY:Math.min(...ys)-pad,maxY:Math.max(...ys)+pad};}
function drawMap(c=$('#map'),mini=false){
 const image=basemap==='satellite'&&satellite.complete&&satellite.naturalWidth?satellite:relief;
 if(mini){const now=performance.now();miniSpan=minimapSpan(miniSpan,state.v,paused?0:Math.min(1,(now-miniTime)/1000));miniTime=now;}
 const nearby={minX:Math.max(mapBounds.minX,Math.min(mapBounds.width-miniSpan,state.x-miniSpan/2)),minY:Math.max(mapBounds.minY,Math.min(mapBounds.maxY-miniSpan,state.y-miniSpan/2))};nearby.width=nearby.minX+miniSpan;nearby.maxY=nearby.minY+miniSpan;
 const rect=c.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height),dpr=Math.min(2,devicePixelRatio),bounds=mini?(state.mode==='trial'?raceMapBounds():nearby):viewBounds(mapBounds,mapView),frame=mapFrame(w,h,bounds);c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);ctx.fillStyle='#29332f';ctx.fillRect(0,0,w,h);if(image.complete&&image.naturalWidth){const spanX=mapBounds.width-mapBounds.minX,spanY=mapBounds.maxY-mapBounds.minY,sx=(bounds.minX-mapBounds.minX)/spanX*image.naturalWidth,sy=(bounds.minY-mapBounds.minY)/spanY*image.naturalHeight,sw=(bounds.width-bounds.minX)/spanX*image.naturalWidth,sh=(bounds.maxY-bounds.minY)/spanY*image.naturalHeight;ctx.drawImage(image,sx,sy,sw,sh,frame.x,frame.y,frame.width,frame.height);}ctx.fillStyle='#1e242233';ctx.fillRect(frame.x,frame.y,frame.width,frame.height);
 const playerPoint=mapPoint(state,w,h,bounds),occupied=[{x:playerPoint.x-12,y:playerPoint.y-12,w:24,h:24}],level=mini?0:labelLevel(mapView.zoom);let labelCount=0;
 if(area.world&&state.mode!=='trial'){ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();ctx.strokeStyle='#ffe59dcc';ctx.lineWidth=mini?.8:1.1;ctx.beginPath();for(const segment of routeDisplay)segment.points.forEach((p,i)=>{const q=mapPoint(p,w,h,bounds);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();ctx.restore();}
 if(journey&&state.mode!=='trial'){
  ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();ctx.strokeStyle='#f5d28c99';ctx.setLineDash([3,4]);ctx.beginPath();for(const [a,b]of journey.gaps){const p=mapPoint(a,w,h,bounds),q=mapPoint(b,w,h,bounds);ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);}ctx.stroke();ctx.setLineDash([]);
  for(const [name,p,color]of [['START',journey.start,'#b7efc3'],['FINISH',journey.finish,'#fff0ba']]){const q=mapPoint(p,w,h,bounds);ctx.fillStyle=color;ctx.fillRect(q.x-3,q.y-3,6,6);if(!mini&&level>0){ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText(name,q.x,q.y+25);const tw=ctx.measureText(name).width;occupied.push({x:q.x-tw/2-3,y:q.y+14,w:tw+6,h:15});}}
  if(expeditionRecord?.status==='active'&&level>=2){const p=journey.checkpoints[expeditionRecord.next]??journey.finish,q=mapPoint(p,w,h,bounds);ctx.strokeStyle='#9be3ed';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,6,0,Math.PI*2);ctx.stroke();}ctx.restore();
 }
 function mapLabel(text,q,offset){
  if(q.x<frame.x||q.x>frame.x+frame.width||q.y<frame.y||q.y>frame.y+frame.height)return;
  while(ctx.measureText(text).width>frame.width-12&&text.length>4)text=text.slice(0,-2)+'…';
  const tw=ctx.measureText(text).width;for(const dy of [offset,offset+14,offset-14,offset+28]){const x=Math.max(frame.x+tw/2+4,Math.min(frame.x+frame.width-tw/2-4,q.x)),y=q.y+dy,r={x:x-tw/2-3,y:y-11,w:tw+6,h:15};if(r.y<frame.y||r.y+r.h>frame.y+frame.height||occupied.some(a=>r.x<a.x+a.w&&r.x+r.w>a.x&&r.y<a.y+a.h&&r.y+r.h>a.y))continue;occupied.push(r);ctx.strokeStyle='#26332de6';ctx.lineWidth=3;ctx.strokeText(text,x,y);ctx.fillText(text,x,y);labelCount++;break;}
 }
 c.dataset.geologyVisible='false';c.dataset.sitesVisible='true';c.dataset.raceVisible=String(state.mode==='trial');c.dataset.targetVisible=String(!!nav.target);c.dataset.stormVisible=String(storm.age>=0);

 ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();ctx.translate(frame.x,frame.y);drawStormMap(ctx,storm,bounds,frame.width,frame.height);ctx.restore();
 if(state.mode==='trial'){ctx.strokeStyle='#ddb17a';ctx.lineWidth=mini?9:12;ctx.lineJoin='round';ctx.beginPath();area.course.route.forEach((p,i)=>{const q=mapPoint(p,w,h,bounds);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.closePath();ctx.stroke();for(const p of [...area.course.gates,area.course.finish]){const q=mapPoint(p,w,h,bounds);ctx.beginPath();ctx.arc(q.x,q.y,mini?2.5:3.5,0,Math.PI*2);ctx.fillStyle='#e6f0c8';ctx.fill();}}
 ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();
 const games=[];
 for(const site of expedition?.sites??[]){const q=mapPoint(site,w,h,bounds);if(site.id==='long-jump')q.x-=6;if(site.id==='target-jump')q.x+=6;if(q.x<frame.x||q.x>frame.x+frame.width||q.y<frame.y||q.y>frame.y+frame.height)continue;ctx.fillStyle='#ffe0a0';ctx.strokeStyle='#34372d';ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?2.6:6,x=q.x+Math.cos(a)*r,y=q.y+Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.fill();ctx.stroke();occupied.push({x:q.x-6,y:q.y-6,w:12,h:12});games.push({site,q});}ctx.restore();
 c.dataset.activityCount=String(expedition?.sites.length??0);
 if(!mini&&c.dataset.cursor){const cursor=JSON.parse(c.dataset.cursor);ctx.strokeStyle='#fff8';ctx.lineWidth=1;ctx.strokeRect(cursor.x*w-4,cursor.y*h-4,8,8);}
 const sites=[...regions.filter(r=>!r.ambient),...detailIndices.map(i=>discoveries[i])],visibleSites=[];
 ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();
 for(const p of sites){const q=mapPoint(p,w,h,bounds);if(q.x<frame.x||q.x>frame.x+frame.width||q.y<frame.y||q.y>frame.y+frame.height)continue;ctx.fillStyle='#65c9f0';ctx.strokeStyle='#14394b';ctx.lineWidth=1;ctx.beginPath();ctx.arc(q.x,q.y,mini?3:4,0,Math.PI*2);ctx.fill();ctx.stroke();occupied.push({x:q.x-5,y:q.y-5,w:10,h:10});visibleSites.push({p,q});}ctx.restore();
 ctx.textAlign='center';ctx.font='11px system-ui';
 if(level>=2){ctx.fillStyle='#bceafb';for(const {p,q}of visibleSites)mapLabel(p.mapName??p.name,q,18);ctx.fillStyle='#ffe0a0';for(const {site,q}of games)mapLabel(site.name,q,18);}
 if(level>=1){ctx.fillStyle='#f2e3bf';const names=[...worldLocations,...regions.filter(r=>r.ambient&&!r.groupOnly)];const shown=new Set(visibleSites.filter(()=>level>=2).map(({p})=>p.name));for(const p of names){if(shown.has(p.name))continue;shown.add(p.name);mapLabel(p.name,mapPoint(p,w,h,bounds),-15);}}
 if(level>=3){ctx.fillStyle='#d2dec8';for(const p of landmarks)mapLabel(p.name,mapPoint(p,w,h,bounds),-15);}
 c.dataset.labelLevel=String(level);c.dataset.labelCount=String(labelCount);c.dataset.lookoutCount=String(sites.length);c.dataset.span=String(bounds.width-bounds.minX);
 const rover=mapPoint(state,w,h,bounds),pulse=matchMedia('(prefers-reduced-motion: reduce)').matches?.7:(.5+.5*Math.sin(performance.now()/3000*Math.PI*2));ctx.save();ctx.beginPath();ctx.rect(frame.x,frame.y,frame.width,frame.height);ctx.clip();ctx.fillStyle=`rgba(215,255,241,${.15+pulse*.25})`;ctx.beginPath();ctx.arc(rover.x,rover.y,8+pulse*3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f2fff8';ctx.strokeStyle='#12322e';ctx.lineWidth=2;ctx.beginPath();ctx.translate(rover.x,rover.y);ctx.rotate(state.heading);ctx.moveTo(0,-8);ctx.lineTo(6,6);ctx.lineTo(0,3);ctx.lineTo(-6,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();c.dataset.player=JSON.stringify(rover);c.dataset.heading=String(state.heading);c.dataset.zoom=String(mini?1:mapView.zoom);
 if(!mini&&mapReturn){const q=mapPoint(mapReturn.site,w,h,bounds);ctx.strokeStyle='#fff0ba';ctx.lineWidth=1;ctx.beginPath();ctx.arc(q.x,q.y,8,0,Math.PI*2);ctx.stroke();}
 if(nav.target){const q=mapPoint(nav.target,w,h,bounds);ctx.strokeStyle='#c6f5df';ctx.lineWidth=1;ctx.beginPath();ctx.arc(q.x,q.y,mini?2:3,0,Math.PI*2);ctx.moveTo(q.x-5,q.y);ctx.lineTo(q.x+5,q.y);ctx.moveTo(q.x,q.y-5);ctx.lineTo(q.x,q.y+5);ctx.stroke();}
 if(!mini){$('#clear-target').hidden=!nav.target;$('#map-zoom-in').disabled=mapView.zoom>=16;$('#map-zoom-out').disabled=mapView.zoom<=1;}
}
$('#site-labels').onchange=e=>{nav.labels=e.target.checked;save();drawMap();};
function drawCardMap(){const c=$('#discovery-map'),w=240,h=240,f=mapFrame(w,h);c.width=w*2;c.height=h*2;const ctx=c.getContext('2d');ctx.scale(2,2);ctx.fillStyle='#29332f';ctx.fillRect(0,0,w,h);if(relief.complete&&relief.naturalWidth)ctx.drawImage(relief,f.x,f.y,f.width,f.height);const q=mapPoint(cardSite,w,h);ctx.strokeStyle='#fff0ba';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,12,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff0ba';ctx.beginPath();ctx.arc(q.x,q.y,2,0,Math.PI*2);ctx.fill();}
$('#discovery-map-button').onclick=()=>{mapReturn={caller:backTo,notes:notesReturn,site:cardSite};nav.labels=true;openDialog('#map-dialog','#discovery-dialog');};
function gateGeometry(){const v=[];for(const side of [-1,1]){box(v,side*46-1,-1,0,2,2,25,[.63,.83,.67]);triangle(v,[side*46,0,25],[side*46+side*10,0,21],[side*46,0,17],[.76,.91,.7]);}return gpu.upload(new Float32Array(v));}
let posts;
function wayfinding(){
 const c=$('#wayfinding'),w=c.clientWidth,h=c.clientHeight;c.width=w;c.height=h;const ctx=c.getContext('2d');

 expedition?.overlay(ctx,gpu);
 if(journey&&state.mode==='free'&&!expedition?.photo)for(const [label,p]of [['START',journey.start],['FINISH',journey.finish]]){if(Math.hypot(p.x-state.x,p.y-state.y)>650)continue;const z=area.ground(p.x,p.y);gpu.mesh(posts,[p.x,p.y,z,0],7);const q=gpu.project(p.x,p.y,z+30);if(q.depth>4&&q.x>30&&q.x<w-30&&q.y>120&&q.y<h-125){ctx.textAlign='center';ctx.font='bold 12px system-ui';ctx.fillStyle='#f5e5bd';ctx.fillText(label,q.x,q.y);}}
 if(state.mode==='free'&&Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<1000){ctx.strokeStyle='#cfe8b377';ctx.lineWidth=1;ctx.beginPath();let pen=false;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,x=raceSite.x+Math.cos(a)*raceSite.radius,y=raceSite.y+Math.sin(a)*raceSite.radius,q=gpu.project(x,y,area.ground(x,y)+.5);if(q.depth<=4){pen=false;continue;}if(pen)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);pen=true;}ctx.stroke();}
 const racing=state.mode==='trial';c.dataset.direction='none';if(!racing){if(!nav.target||paused||welcome)return;const a=Math.atan2(nav.target.x-state.x,-(nav.target.y-state.y))-gpu.camera.h,angle=Math.atan2(Math.sin(a),Math.cos(a)),halfView=Math.atan(w/(2*Math.min(w*.95,h*.9)));if(Math.abs(angle)<=halfView)return;const right=angle>0,x=right?w-22:22,y=h*.44;c.dataset.direction=right?'right':'left';ctx.strokeStyle='#ddedd1';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+(right?-4:4),y-7);ctx.lineTo(x+(right?3:-3),y);ctx.lineTo(x+(right?-4:4),y+7);ctx.stroke();return;}
 const target=racing?(area.course.gates[state.nextGate]??area.course.finish):nav.target,ground=(area.visualGround??area.ground)(target.x,target.y);
 // The active checkpoint is a physical-looking pair of flags. The course
 // surface—not floating text, distance counters or arrows—guides the player.
 if(racing){gpu.mesh(posts,[target.x,target.y,ground,target.heading],7);return;}
 const meters=Math.round(Math.hypot(target.x-state.x,target.y-state.y)/4);
 ctx.font='600 14px system-ui';ctx.textAlign='center';ctx.fillStyle='#e6f2cc';ctx.strokeStyle='#182f2b';ctx.lineWidth=4;
 const label=target.name+` · ${meters} m`;
 const angle=Math.atan2(target.x-state.x,-(target.y-state.y))-gpu.camera.h,dx=Math.sin(angle),dy=-Math.cos(angle),cx=w/2,cy=h/2,r=Math.min(w*.35,h*.29),x=cx+dx*r,y=cy+dy*r;ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(8,7);ctx.lineTo(-8,7);ctx.closePath();ctx.stroke();ctx.fill();ctx.restore();ctx.strokeText(label,w/2,h>500?155:87);ctx.fillText(label,w/2,h>500?155:87);
}
function placeLamps(){const r=gpu.roverScreenBounds,b=$('#lamps');b.hidden=paused||welcome||!r;if(b.hidden)return;const w=Math.max(44,r.right-r.left),h=Math.max(44,r.bottom-r.top);b.style.left=(r.left+r.right-w)/2+'px';b.style.top=(r.top+r.bottom-h)/2+'px';b.style.width=w+'px';b.style.height=h+'px';b.setAttribute('aria-pressed',String(gpu.lampStrength>0));}
function draw(dt=0){gpu.quality=quality;gpu.storm=storm;const shown=paused?state:displayState(previous,state,acc*60,area.ground(state.x,state.y));gpu.draw(shown,dt,$('#labels'));sky.draw(gpu,shown);wayfinding();placeLamps();}

function step(dt){previous=capturePose(state,area.ground(state.x,state.y));
 const pressed=!!input.special&&!specialWasHeld;specialWasHeld=!!input.special;if(!input.special)reverseHeld=false;
 const action=specialMode();if(pressed){if(action==='Hop')expedition.hop();else if(action==='Boost'&&state.countdown<=0&&state.raceBoosts>0&&state.boost<=0){state.raceBoosts--;state.boost=state.tune.boostSeconds;}else if(action==='Reverse')reverseHeld=true;else if(action==='Camera'&&!state.air&&Math.abs(state.v)<1){expedition.camera();return;}}
 if(!stepArtHop(state,input,dt,area.ground,area.bounds))driveStep(state,{...input,brake:input.brake||reverseHeld},dt,area.course,{...area.driveArea,...(state.mode==='trial'?{pickups:[]}:{}),cruise:true,roverHandling:true,airControl:state.tune.boostKit,boostKit:state.tune.boostKit});if(stormsEnabled&&!expedition?.protectsArt)storm.tick(dt,state,()=>gpu.tracks.reset());if(expedition?.tick(dt,previous))return;
 if(expedition?.active){if(state.mode==='trial'&&state.done)finishLap();return;}
 for(const p of regions.filter(r=>!r.ambient)){const id=p.regionId??p.id,key='region:'+id,distance=Math.hypot(state.x-p.x,state.y-p.y);if(distance>CLOSE_RANGE)observedInside.delete(key);if(state.mode!=='trial'&&!state.air&&!state.turnaround&&distance<8&&!observedInside.has(key)){observedInside.add(key);if(!progress.regions.includes(id))progress.regions.push(id);state.regions=[...progress.regions];state.v=state.vz=state.boost=0;previous=capturePose(state,area.ground(state.x,state.y));save();updateHud();showCard(p,null,'region');return;}}
 // Each ground-level entry opens the observation, including return visits.
 for(const i of detailIndices){const p=discoveries[i],distance=Math.hypot(state.x-p.x,state.y-p.y);if(distance>CLOSE_RANGE)observedInside.delete(i);if(!detailAvailable(i,progress.regions))continue;if(state.mode!=='trial'&&!state.air&&!state.turnaround&&distance<8&&!observedInside.has(i)){observedInside.add(i);if(!state.collected.includes(i))state.collected.push(i);progress.collected=[...state.collected];state.v=0;state.vz=0;state.boost=0;if(p.focus){state.heading=Math.atan2(p.focus.x-state.x,-(p.focus.y-state.y));gpu.camera={x:state.x,y:state.y,h:state.heading};gpu.bodySlope=null;}previous=capturePose(state,area.ground(state.x,state.y));save();updateHud();showDiscovery(i);break;}}
 if(nav.target&&Math.hypot(state.x-nav.target.x,state.y-nav.target.y)<=CLOSE_RANGE){nav.target=null;save();dirty=true;}
 if(state.mode==='trial'&&state.done)finishLap();
 if(!paused){const inside=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)<raceSite.radius;if(!inside)entryArmed=true;entryTime=entryArmed?advanceEntry(entryTime,state,dt):0;if(entryTime>=raceSite.dwell)chooseRace();}
}

function frame(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(ready){if(!paused){acc+=dt;while(acc>=1/60&&!paused){step(1/60);acc-=1/60;}if(t-lastDraw>=(quality==='performance'?32:0)){draw(Math.min(.05,(t-lastDraw)/1000));lastDraw=t;}if(t-lastSave>3000){save();lastSave=t;}}else if(dirty){draw(0);dirty=false;}
 if(t-lastHud>100){updateHud();expedition?.update();lastHud=t;}if(t-lastMap>200){if(minimap.state.enabled)drawMap($('#mini-map'),true);if($('#map-dialog').open)drawMap();lastMap=t;}}
 requestAnimationFrame(frame);}
$('#discovery-continue').onclick=closeSheet;
$('#explore').onclick=()=>expedition.start();$('#free-explore').onclick=explore;$('#race-again').onclick=startLap;$('#result-explore').onclick=()=>{raceExplorer=null;expedition?.stop();state.tune=explorationKit(selected,mods);explore();};$('#result-restore').onclick=()=>{expedition?.stop();explore();};$('#result-sites').onclick=()=>{restoreExplorer();expedition?.stop();openDialog('#jump-dialog');};
$('#pause-button').onclick=()=>openDialog('#pause-dialog');$('#resume').onclick=()=>{closeDialogs();exploreOrResume();};
function exploreOrResume(){if(welcome)explore();else setPause(false);}
$('#end-lap').onclick=endLap;

for(const b of document.querySelectorAll('[data-close]'))b.onclick=closeSheet;
for(const d of document.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='photo-dialog')d.close();else if(d.id==='result-dialog')explore();else if(d.id==='jump-confirm-dialog')cancelJump();else closeSheet();});
async function roverMenu(){closeDialogs();setPause(true);try{await openCraft(selected,(id,chosenMods)=>{if(state.mode==='trial')endLap();Object.assign(mods,chosenMods??mods);selected=id;state.roverId=id;state.tune=explorationKit(id,mods);state.v=state.vz=state.boost=0;state.air=false;state.z=area.ground(state.x,state.y);previous=capturePose(state,state.z);gpu.reset(state);save();},{mods,jezero:true,compact:true,jumpAvailable:true,onTab:menuTab});}catch{openDialog('#pause-dialog');notify('Rover selection could not load. Try again.');}}
async function chooseRace(id='delta-trial'){raceId=typeof id==='string'&&area.courses[id]?id:'delta-trial';area.course=area.courses[raceId];area.start={...area.course.finish};if(gpu.road)gpu.gl.deleteTexture(gpu.road.texture);gpu.road=raceSurface(gpu.gl,area.course.route,58);entryTime=0;entryArmed=false;closeDialogs();setPause(true);try{await openCraft(selected,id=>{raceExplorer??=selected;selected=id;startLap();},{race:true,jezero:true,compact:true,onCancel:()=>{entryArmed=false;expedition?.stop();restoreExplorer();state.mode='free';state.tune=explorationKit(selected,mods);openDialog('#pause-dialog');}});}catch{openDialog('#pause-dialog');notify('Rover selection could not load. Try again.');}}
function menuTab(tab,caller=null){mapReturn=null;if(tab==='rover'){roverMenu();return;}const target={map:'#map-dialog',notes:'#jump-dialog',jump:'#jump-dialog',settings:'#pause-dialog'}[tab]??'#pause-dialog';openDialog(target,tab==='notes'?(caller==='#map-dialog'?'#map-dialog':'#pause-dialog'):null);}
function syncMenuTabs(){}
for(const tabs of document.querySelectorAll('.menu-tabs')){const current=tabs.closest('dialog').id;for(const [tab,label]of [['map','MAP'],['jump','JUMP TO'],['settings','SETTINGS'],['rover','ROVER']]){const b=document.createElement('button');b.textContent=label;b.dataset.tab=tab;if(tab==='notes')b.id=current==='pause-dialog'?'field-notes':current==='map-dialog'?'map-notes':'';if(tab==='rover'&&current==='pause-dialog')b.id='choose-craft';if(current===({map:'map-dialog',notes:'notes-dialog',jump:'jump-dialog',settings:'pause-dialog'})[tab])b.setAttribute('aria-current','page');b.onclick=()=>menuTab(tab,'#'+current);tabs.append(b);}}
function targetSite(p){nav.target={...reachableTarget(p,area.bounds),name:p.name,...(p.activityId?{activityId:p.activityId}:{})};save();dirty=true;$('#jump-feedback').textContent=`Target set · ${p.name}`;notify(`Target set · ${p.name}`,3);}
function requestJump(p,returnTo='#jump-dialog'){pendingJump={p,returnTo};closeDialogs();setPause(true);$('#jump-confirm-title').textContent=`Jump to ${p.name}?`;$('#jump-confirm-copy').textContent='Leave your current position and jump to this site?';$('#jump-confirm-dialog').showModal();}
function cancelJump(){const returnTo=pendingJump?.returnTo;pendingJump=null;$('#jump-confirm-dialog').close();if(returnTo)openDialog(returnTo);else setPause(false);}
$('#jump-confirm-cancel').onclick=cancelJump;
$('#jump-confirm-go').onclick=()=>{const p=pendingJump?.p;if(!p)return;pendingJump=null;$('#jump-confirm-dialog').close();expedition?.remember();resetAt({...p,y:p.y-55,heading:Math.PI});explore();};
function sitePreview(p){
 const c=document.createElement('canvas');c.className='site-preview';c.width=160;c.height=100;c.setAttribute('role','img');c.setAttribute('aria-label',p.name+' location on Jezero map');const ctx=c.getContext('2d'),image=basemap==='satellite'&&satellite.naturalWidth?satellite:relief,f=mapFrame(160,100);ctx.fillStyle='#34423b';ctx.fillRect(0,0,160,100);if(image.naturalWidth)ctx.drawImage(image,f.x,f.y,f.width,f.height);const q=mapPoint(p,160,100);ctx.strokeStyle='#fff3ac';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,6,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(q.x,q.y,2,0,Math.PI*2);ctx.fill();return c;
}
function renderJumpSites(){
 const list=$('#jump-sites'),opened=new Set([...list.querySelectorAll('details[open]>summary')].map(el=>el.textContent)),scroll=list.parentElement.scrollTop;list.replaceChildren();
 const row=p=>{const el=document.createElement('article');el.className='destination';el.dataset.site=p.id??p.name;const content=document.createElement('div'),title=document.createElement('button'),fact=document.createElement('p'),actions=document.createElement('div');title.className='destination-title';title.textContent=p.name;title.onclick=()=>showCard(p,'#jump-dialog',p.kind);fact.textContent=p.fact;actions.className='destination-actions';for(const [label,fn]of [['Learn',()=>showCard(p,'#jump-dialog',p.kind)],['Target on map',()=>targetSite(p)],['Jump',()=>requestJump(p)]]){const b=document.createElement('button');b.textContent=label;b.onclick=fn;actions.append(b);}content.append(title,fact,actions);el.append(sitePreview(p),content);return el;};
 for(const region of regions){const id=region.regionId??region.id,children=detailIndices.filter(i=>regionIdForDetail(i)===id);if(region.groupOnly&&!children.length)continue;const group=document.createElement('details'),title=document.createElement('summary');title.textContent=region.name;group.open=opened.has(region.name);group.append(title);if(!region.groupOnly)group.append(row(region));for(const i of children)group.append(row(discoveries[i]));list.append(group);}
 const archived=retiredDetailIndices.filter(i=>progress.collected.includes(i));if(archived.length){const group=document.createElement('details'),title=document.createElement('summary');title.textContent='Earlier mission notes';group.open=opened.has(title.textContent);group.append(title,...archived.map(i=>row(discoveries[i])));list.append(group);}
 list.parentElement.scrollTop=scroll;
}
$('#view-controls').onclick=()=>{$('#controls-help').hidden=!$('#controls-help').hidden;};
$('#exit-rover').onclick=()=>{save();if(parent!==window)parent.postMessage({type:'astra-exit-rover'},location.origin);else location.href=new URL('../../../playtest/',import.meta.url).href;};
for(const b of document.querySelectorAll('[data-light]'))b.onclick=()=>{$('#light').value=b.dataset.light;$('#light').dispatchEvent(new Event('change'));};
$('#light').onchange=e=>{light=e.target.value;lighting();for(const b of document.querySelectorAll('[data-light]'))b.setAttribute('aria-pressed',String(b.dataset.light===light));dirty=true;save();};$('#quality').onchange=e=>{quality=e.target.value;dirty=true;save();};$('#storms-enabled').onchange=e=>{stormsEnabled=e.target.checked;if(!stormsEnabled){storm.age=-1;storm.haze=0;storm.wait=75;}dirty=true;save();};$('#map-enabled').onchange=e=>{minimap.state.enabled=e.target.checked;minimap.layout();dirty=true;save();};

$('#lamps').onclick=()=>{gpu.headlightsOverride=!(gpu.lampStrength>0);dirty=true;};
for(const id of ['left','right','drive','brake']){const b=$('#'+id);b.onpointerdown=e=>{if(paused)return;e.preventDefault();b.setPointerCapture(e.pointerId);pointers.set(e.pointerId,id);b.classList.add('active');sync();};const release=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(id))b.classList.remove('active');sync();};b.onpointerup=release;b.onpointercancel=release;b.onlostpointercapture=release;}
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||!ready||e.target.closest('input,select,summary,a')||(e.target.closest('button')&&[' ','Enter'].includes(e.key))||(e.target===$('#lamps')&&[' ','Enter'].includes(e.key)))return;if(e.key==='Escape'){e.preventDefault();openDialog('#pause-dialog');return;}const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();if(!paused){keys.add(k);sync();}}});addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());sync();});
addEventListener('blur',()=>{if(ready&&!paused)openDialog('#pause-dialog');});document.addEventListener('visibilitychange',()=>{if(document.hidden&&ready){if(!paused)openDialog('#pause-dialog');save();}});addEventListener('pagehide',save);addEventListener('resize',()=>{dirty=true;});
for(const event of ['contextmenu','selectstart'])$('.controls').addEventListener(event,e=>e.preventDefault());
try{
 area=await loadArea();journey=await loadJourney();area.world.segments=journey.segments;routeDisplay=smoothRoute(journey.segments);expeditionRecord=restoreExpedition(null,journey);syncFloor();readSave();gpu=new GPURenderer($('#world'),area);gpu.shadowMode='none';gpu.softSurfaceLighting=true;gpu.flightLighting=1;posts=gateGeometry();gpu.routeRibbon=createRouteRibbon(gpu,routeDisplay,area.ground);storm.southBoundary=area.bounds.maxY+1600;storm.bounds=area.bounds;Object.assign(mapView,{x:(mapBounds.minX+mapBounds.width)/2,y:(mapBounds.minY+mapBounds.maxY)/2});resetAt(progress.position??{...journey.start,heading:-.4});for(const i of progress.collected)if(discoveries[i]&&Math.hypot(state.x-discoveries[i].x,state.y-discoveries[i].y)<CLOSE_RANGE)observedInside.add(i);for(const p of regions){const id=p.regionId??p.id;if(progress.regions.includes(id)&&Math.hypot(state.x-p.x,state.y-p.y)<CLOSE_RANGE)observedInside.add('region:'+id);}entryArmed=Math.hypot(state.x-raceSite.x,state.y-raceSite.y)>=raceSite.radius;ready=true;minimap.layout();$('#map-enabled').checked=minimap.state.enabled;$('#storms-enabled').checked=stormsEnabled;$('#quality').value=quality;$('#light').value=light;for(const b of document.querySelectorAll('[data-light]'))b.setAttribute('aria-pressed',String(b.dataset.light===light));$('#loading').hidden=true;
 area.manualRaceBoosts=true;area.courses={'delta-trial':area.course,'landing-trial':landingCircuit()};
 expedition=createActivities({area,gpu,storm,nav,get state(){return state},reset:resetAt,explore,resume:()=>setPause(false),pause:()=>setPause(true),openDialog,closeDialogs,save,draw,sitePreview,targetSite,endLap,chooseRace,travelSetup:()=>({rover:selected,kit:mods.kit}),restoreTravel:p=>{if(KITS[p.rover])selected=p.rover;if(typeof p.kit==='boolean')mods.kit=p.kit;},enableKit:()=>{selected='perseverance';mods.kit=true;}},journey,expeditionRecord,activitySave);
 const legend=document.createElement('details');legend.className='map-legend';const legendTitle=document.createElement('summary');legendTitle.textContent='Map key';legend.append(legendTitle);const key=document.createElement('div');key.textContent='● Lookouts · ★ Activities · ⌃ Rover';legend.append(key);for(const site of expedition.sites){const item=document.createElement('div');item.textContent='★ '+site.name;legend.append(item);}$('.map-wrap').append(legend);
 for(const b of document.querySelectorAll('[data-basemap]')){b.setAttribute('aria-pressed',String(b.dataset.basemap===basemap));b.onclick=()=>{basemap=b.dataset.basemap;for(const q of document.querySelectorAll('[data-basemap]'))q.setAttribute('aria-pressed',String(q===b));save();drawMap();};}
 if(progress.position||progress.collected.length||progress.regions.length){welcome=false;$('#welcome').hidden=true;openDialog('#pause-dialog');}
 $('#world').addEventListener('webglcontextlost',e=>{e.preventDefault();setPause(true);ready=false;$('#loading').hidden=false;$('#loading h2').textContent='The graphics paused.';$('#loading p').textContent='Your saved discoveries are safe.';const b=document.createElement('button');b.textContent='Reload terrain';b.onclick=()=>location.reload();$('#loading').append(b);});
 window.__jezero={get state(){return state},area,gpu,storm,progress,expedition,get worldUnlocked(){return true},get expansionComplete(){return area.extension.unlocked&&detailIndices.every(i=>progress.collected.includes(i))&&regions.filter(r=>!r.ambient).every(r=>progress.regions.includes(r.regionId??r.id))},get paused(){return paused},get input(){return input},landmarks,regions,nav,raceSite,mapView,routeDisplay,get entryTime(){return entryTime},mods,minimap,get stormsEnabled(){return stormsEnabled},resetAt,step,draw,startLap,chooseRace,explore,setPause,save,openDialog,renderNotes,drawMap};requestAnimationFrame(frame);
}catch(e){console.error(e);$('#loading h2').textContent='Could not prepare Jezero';$('#loading p').textContent=e.message;const b=document.createElement('button');b.textContent='Try again';b.onclick=()=>location.reload();$('#loading').append(b);}

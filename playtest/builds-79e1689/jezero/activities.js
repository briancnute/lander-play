import {CLONE_MISSIONS,missingMissions,cloneReady,missionCopy,migrateArt} from './clone-mission.js';
import {newRouteRun,routeScore} from './route-run.js';
import {createRouteRunUI} from './route-run-ui.js';
import {activitySymbols} from './map-view.js';
import {toGame} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
import {advanceJourney,canFinish,reachFinish,creditActivity,REQUIRED_ACTIVITIES,rejoinJourney} from './expedition.js';
import {tourStops,nextLookout,collectLookout,restoreTiming,CURRENT_TOUR_VERSION} from './photo-tour.js';
import {storePhoto,readPhotos,deletePhoto} from './field-photos.js';
import {startArtHop} from './art-hop.js';
import {jumpSite,boostRows,advanceBoost} from './neretva-jump.js';

const $=s=>document.querySelector(s),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pose=s=>({x:s.x,y:s.y,heading:s.heading});
export const activityCatalog=[
 {id:'art',name:'Tracks in the dust',category:'CREATIVE',goal:'Draw a trail across the clearing, then photograph it from above.',...toGame(1104,-143)},
 {...jumpSite},
 {id:'helicopter',name:'Ingenuity signal',category:'OPTIONAL DISCOVERY',goal:'Find the helicopter and upload a fictional firmware upgrade. Flight unlocks after the replacement mission.',...toGame(2587.4,-956.5)},
 {id:'delta-trial',name:'Delta circuit',category:'ARCADE CHALLENGE',goal:'Complete the circuit through its ordered checkpoints.'},
 {id:'landing-trial',name:'Belva to Bright Angel rally',category:'ARCADE CHALLENGE',goal:'An open rally past Belva and down Neretva Vallis to Bright Angel. Three boosts.'},
];

export function createActivities(api,journey,record,stored={}){
 const routeRun=journey.course?createRouteRunUI(api,journey,record,finishRouteRun):null;
 let active=null,seconds=0,photo=null,photoBusy=false,jump=null,armed=false,lastPaint=0,lastMesh=0,returnPose=null,heliToken=null,flightReverse=false,albumToken=null,viewURLs=[];
 const results=stored.results&&typeof stored.results==='object'?stored.results:{};
 let art=[],firmware=stored.firmware===true||!!results.helicopter;const offered=new Set();
 let artProtected=art.length>1&&stored.artProtected!==false;
 let stroke=Math.max(0,...art.map(p=>Number.isInteger(p.stroke)?p.stroke:0))+1;
 const sites=activityCatalog.map(p=>({...p}));
 const ground=(x,y)=>api.area.ground(x,y);
 const safe=p=>{let best=p,score=Infinity;for(let y=-64;y<=64;y+=16)for(let x=-64;x<=64;x+=16){const q={x:p.x+x,y:p.y+y};if(api.area.rocks.some(([a,b,r])=>Math.hypot(q.x-a,q.y-b)<r+12))continue;const slope=Math.hypot(ground(q.x+8,q.y)-ground(q.x-8,q.y),ground(q.x,q.y+8)-ground(q.x,q.y-8))/16,s=slope*300+Math.hypot(x,y);if(s<score){score=s;best=q;}}return {...p,...best};};
 for(let i=0;i<sites.length;i++)if(Number.isFinite(sites[i].x)&&!sites[i].id.includes('jump'))sites[i]=safe(sites[i]);
 sites.find(p=>p.id==='delta-trial').x=api.area.start.x;sites.find(p=>p.id==='delta-trial').y=api.area.start.y;
 Object.assign(sites.find(p=>p.id==='landing-trial'),api.area.courses['landing-trial'].start);
 if(api.nav.target?.activityId&&!sites.some(p=>p.id===api.nav.target.activityId))api.nav.target=null;
 for(const site of sites)if(missionCopy[site.id])site.goal=missionCopy[site.id]+' '+site.goal;
 const artSite=sites.find(p=>p.id==='art'),artSize=240;art=migrateArt(stored.art,artSite,stored.layoutVersion);artProtected=art.length>1&&stored.artProtected!==false;stroke=Math.max(0,...art.map(p=>Number.isInteger(p.stroke)?p.stroke:0))+1;
 if(stored.layoutVersion!==2&&results['neretva-jump-best']){results['neretva-jump-best-legacy']=results['neretva-jump-best'];delete results['neretva-jump-best'];}
 let lookout=artSite,highest=-Infinity;
 for(let a=0;a<Math.PI*2;a+=Math.PI/12){const q=safe({x:artSite.x+Math.cos(a)*360,y:artSite.y+Math.sin(a)*360}),z=ground(q.x,q.y);if(z>highest){highest=z;lookout=q;}}
 let target=toGame(-5200,2300),boostStage=0;
 Object.assign(sites.find(p=>p.id==='helicopter'),api.area.heliEnds[0]);
 const heliEnd={...api.area.heliEnds[1],id:'helicopter',name:'Ingenuity / return flight'};let heliArmed=true;if(api.nav.target?.activityId){const site=sites.find(p=>p.id===api.nav.target.activityId);if(site)Object.assign(api.nav.target,{x:site.x,y:site.y,name:site.name});}
 const section=document.createElement('div');section.innerHTML=`
 <button id="journey-hud" title="Open expedition" hidden></button>
 <div id="activity-hud" hidden><strong id="activity-name"></strong><span id="activity-status" role="status"></span><div id="activity-actions"></div></div>
 <button id="drawing-frame" hidden title="Adjust camera" aria-label="Adjust camera">☷</button>
 <div id="camera-tools" hidden><div class="camera-top"><button id="camera-navigate" title="Return to drawing">Done</button><button id="camera-close" title="Close camera">×</button></div><div class="camera-dpad"><button data-camera="up" title="Pan up">↑</button><button data-camera="left" title="Pan left">←</button><button data-camera="down" title="Pan down">↓</button><button data-camera="right" title="Pan right">→</button></div><div class="camera-shutter"><button data-camera="in" title="Zoom in">+</button><button data-camera="out" title="Zoom out">−</button><button id="camera-capture" title="Take photograph" aria-label="Take photograph">◎</button></div><details><summary>View angle</summary><label>Zoom<input id="camera-zoom" type="range" min="1" max="8" step=".1" value="1"></label><label>Pan<input id="camera-pan" type="range" min="-180" max="180" value="0"></label><label>Tilt<input id="camera-tilt" type="range" min="-45" max="90" value="0"></label></details><p id="camera-status" role="status"></p></div>
 <canvas id="art-map" aria-label="Track art clearing" hidden></canvas><div id="art-erase" hidden></div>
 <dialog id="expedition-dialog" class="menu-sheet" aria-labelledby="expedition-title"><div class="sheet-head"><h2 id="expedition-title">Jezero expedition</h2><button id="expedition-close" title="Close expedition" aria-label="Close expedition">×</button></div><div class="menu-scroll"><p id="journey-status"></p><progress id="journey-progress" max="1" value="0"></progress><p id="journey-goal"></p><div class="actions"><button id="journey-start" class="primary">Start expedition</button><button id="journey-return">Return to route</button></div><p class="eyebrow">ACTIVITIES</p><div id="activity-list"></div><button id="photo-album">Photo album</button><p class="expedition-credit">Driving course adapted from the NASA traverse, first drive to sol 1980. Lanes, hairpins and challenges are authored; this is not a reenactment of individual mission operations.</p></div></dialog>
 <dialog id="activity-confirm" aria-labelledby="activity-confirm-title"><h2 id="activity-confirm-title"></h2><p id="activity-confirm-copy"></p><div class="actions"><button id="activity-confirm-no">Cancel</button><button id="activity-confirm-yes" class="primary">Jump and begin</button></div></dialog>
 <dialog id="activity-result" aria-labelledby="activity-result-title"><span class="eyebrow">FIELD RECORD</span><h2 id="activity-result-title"></h2><p id="activity-result-copy"></p><div class="actions"><button id="activity-retry">Again</button><button id="activity-return">Return to expedition</button><button id="activity-keep">Keep exploring</button></div></dialog>
 <dialog id="journey-finish" aria-labelledby="journey-finish-title"><span class="eyebrow">JEZERO / EXPEDITION COMPLETE</span><h2 id="journey-finish-title">From touchdown to the western frontier.</h2><p id="journey-finish-copy"></p><div class="actions"><button id="journey-finish-explore">Keep exploring</button><button id="journey-finish-replay">New expedition</button></div></dialog>
 <dialog id="photo-album-dialog" aria-labelledby="photo-album-title"><div class="sheet-head"><h2 id="photo-album-title">Photo album</h2><button id="photo-album-close" aria-label="Close photographs">×</button></div><div id="photo-album-images"></div></dialog>
 <dialog id="helicopter-dialog" aria-labelledby="helicopter-title"><div class="sheet-head"><h2 id="helicopter-title">Ingenuity / flight simulation</h2><button id="helicopter-exit" aria-label="Leave flight simulation">×</button></div><div id="helicopter-frame"></div></dialog>`;
 document.body.append(section);
 const cameraErase=document.createElement('button');cameraErase.id='camera-erase';cameraErase.textContent='Erase';cameraErase.title='Erase all drawing tracks';cameraErase.onclick=eraseArt;$('#camera-capture').after(cameraErase);
 $('#jump-activities').append(...$('#expedition-dialog .menu-scroll').children);$('#expedition-dialog').hidden=true;$('#open-expedition').addEventListener('click',renderMenu);
 $('#journey-hud').onclick=openMenu;$('#expedition-close').onclick=()=>{api.closeDialogs();api.resume();};
 const tourList=document.createElement('div');tourList.id='tour-lookouts';$('#activity-list').previousElementSibling.before(tourList);
 $('#journey-start').onclick=()=>confirm('Start a new expedition?',`Follow the wide course and visit every checkpoint in order. Your score is the percentage of moving time spent on the path. Restore the memory partition at every checkpoint and complete four roadside systems missions. Photographs and Ingenuity are optional. The upgraded Perseverance clone is equipped for this expedition. Begin at Octavia E. Butler Landing; only this expedition resets, not discoveries, photographs or activity records.`,start,'Start expedition');
 $('#journey-return').onclick=returnToRoute;
 $('#journey-finish-explore').onclick=()=>{api.closeDialogs();api.resume();};$('#journey-finish-replay').onclick=()=>{api.closeDialogs();openMenu();};
 $('#activity-confirm-no').onclick=openMenu;
 $('#activity-keep').onclick=()=>{stop();api.closeDialogs();api.resume();};
 $('#activity-return').onclick=returnToRoute;$('#activity-retry').onclick=()=>{if(active)begin(active.id,active.id==='helicopter'&&flightReverse);};
 const resultSites=document.createElement('button');resultSites.id='activity-sites';resultSites.textContent='Site selection';resultSites.onclick=()=>{stop();openMenu();};$('#activity-keep').after(resultSites);
 $('#camera-close').onclick=closeCamera;$('#camera-capture').onclick=capture;
 for(const id of ['zoom','pan','tilt'])$('#camera-'+id).oninput=()=>{if(!photo)return;api.gpu.photoView.zoom=+$('#camera-zoom').value;api.gpu.photoView.heading=photo.heading+(+$('#camera-pan').value)*Math.PI/180;api.gpu.photoView.pitch=(+$('#camera-tilt').value)*Math.PI/180;api.draw();};
 $('#drawing-frame').onclick=()=>{if(!photo?.overhead)return;photo.navigating=false;document.body.classList.add('drawing-framing');$('#camera-tools').hidden=false;api.pause();};
 $('#camera-navigate').onclick=()=>{if(!photo?.overhead)return;photo.navigating=true;document.body.classList.remove('drawing-framing');$('#camera-tools').hidden=true;api.resume();};
 for(const button of section.querySelectorAll('[data-camera]'))button.onclick=()=>{if(!photo)return;const d=button.dataset.camera,v=api.gpu.photoView;if(d==='in'||d==='out'){$('#camera-zoom').value=clamp(+$('#camera-zoom').value*(d==='in'?1.2:1/1.2),1,8);$('#camera-zoom').oninput();}else if(photo.overhead){const dx=(d==='right'?24:d==='left'?-24:0)/v.zoom,dy=(d==='down'?24:d==='up'?-24:0)/v.zoom;v.x+=dx*Math.cos(v.heading)-dy*Math.sin(v.heading);v.y+=dx*Math.sin(v.heading)+dy*Math.cos(v.heading);api.draw();}else{const id=d==='left'||d==='right'?'pan':'tilt',el=$('#camera-'+id);el.value=clamp(+el.value+(d==='left'||d==='up'?-5:5),+el.min,+el.max);el.oninput();}};
 let drag=null;
 api.gpu.canvas.addEventListener('pointerdown',e=>{if(!photo||photo.overhead)return;drag={x:e.clientX,y:e.clientY,h:+$('#camera-pan').value,p:+$('#camera-tilt').value};api.gpu.canvas.setPointerCapture(e.pointerId);});
 api.gpu.canvas.addEventListener('pointermove',e=>{if(!photo||photo.overhead||!drag)return;$('#camera-pan').value=clamp(drag.h-(e.clientX-drag.x)*.15,-180,180);$('#camera-tilt').value=clamp(drag.p+(e.clientY-drag.y)*.12,-45,45);$('#camera-pan').oninput();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])api.gpu.canvas.addEventListener(name,()=>drag=null);
 $('#photo-album').onclick=album;$('#photo-album-close').onclick=()=>{clearURLs();openMenu();};
 $('#helicopter-exit').onclick=()=>{stopHelicopter();stop();openMenu();};
 for(const d of section.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='helicopter-dialog'){stopHelicopter();stop();}if(d.id==='photo-album-dialog')clearURLs();openMenu();});
 addEventListener('message',e=>{const frame=$('#helicopter-frame iframe');if(e.origin!==location.origin||e.source!==frame?.contentWindow||e.data?.token!==heliToken)return;if(e.data.type==='astra-jezero-heli-ready'){frame.dataset.ready='true';return;}if(e.data.type==='astra-jezero-heli-error'){stopHelicopter();api.openDialog('#activity-result');$('#activity-result-title').textContent='Flight unavailable';$('#activity-result-copy').textContent='The flight terrain could not load. Retry the flight or return to your saved expedition. No activity credit was used.';return;}if(e.data.type!=='astra-jezero-heli-complete')return;stopHelicopter();api.reset({...api.area.heliEnds[flightReverse?0:1],heading:0});const saved=Number.isInteger(e.data.savedPhotos)&&e.data.savedPhotos>=0&&e.data.savedPhotos<=5?e.data.savedPhotos:null;complete((saved===null?'Photo storage could not be confirmed. ':`${saved} of 5 aerial survey photographs saved to your album. ${saved<5?'Some photographs could not be stored. ':''}`)+'Safe arrival at '+(flightReverse?'Wright Brothers Field.':'Valinor Hills.'));});

 function snapshot(){return {results,art,artProtected,firmware,layoutVersion:2};}
 function openMenu(){if(photo)closeCamera();api.openDialog('#jump-dialog');$('#expedition-category').open=true;renderMenu();$('#expedition-category').scrollIntoView({block:'start'});}
 function renderMenu(){
  const visited=record.next-1,total=journey.checkpoints.length-1;
  const stops=routeRun?journey.lookouts:tourStops(journey,record),pending=nextLookout(journey,record);
  $('#journey-status').textContent=record.status==='idle'?'Octavia E. Butler Landing → Western frontier':record.status==='finished'?'Expedition complete':`${Math.floor(visited/total*100)}% of route · ${Math.min(record.activities.length,REQUIRED_ACTIVITIES)}/${REQUIRED_ACTIVITIES} required activity`;
  $('#journey-progress').value=record.status==='idle'?0:visited/total;
  $('#journey-goal').textContent=record.status==='idle'?'Retrace the recorded journey and complete one activity. No score threshold.':record.next<journey.checkpoints.length?`Next route reference: sol ${journey.checkpoints[record.next].sol}`:record.activities.length<REQUIRED_ACTIVITIES?'Route complete. Complete one activity to finish. Choose a site below: jump there or target it on your map. Your route progress is saved.':record.finishReached?'Route and activity complete. Continue exploring.':'Return to the western frontier to finish.';
  $('#journey-start').textContent=record.status==='idle'?'Start expedition':'Restart expedition';$('#journey-return').hidden=record.status!=='active';
  if(record.status==='idle')$('#journey-goal').textContent=`Retrace the route, collect ${journey.lookouts.length} photo lookouts in order, and complete one activity. No score threshold.`;
  else if(pending)$('#journey-goal').textContent=`${record.lookouts.length}/${stops.length} photo lookouts. ${record.next>=pending.checkpoint?'Collect next: ':'Follow the route toward '}${pending.name}.`;
  if(record.status==='active'&&record.returnPoint&&!record.finishReached)$('#journey-goal').textContent='Your route position is saved. Return to the route to continue the expedition.';
  $('#journey-return').textContent=record.returnPoint?'Return to saved route':'Resume expedition';
  tourList.replaceChildren();
  if(stops.length||record.status==='idle'){
   const title=document.createElement('h3');title.textContent='Photo lookouts';tourList.append(title);
   for(const [i,p]of (stops.length?stops:journey.lookouts).entries()){
    const row=document.createElement('div'),label=document.createElement('span'),button=document.createElement('button');row.className='tour-stop';
    label.textContent=`${i+1}. ${p.name} · ${record.lookouts.includes(p.id)?'Collected':routeRun?'Optional':p.id===pending?.id?'Next':'Ahead'}`;
    button.textContent='View site';button.dataset.tourSite=p.id;button.onclick=()=>api.viewLookout(p.index);
    row.append(label,button);tourList.append(row);
   }
  }
  if(routeRun){$('#journey-status').textContent=record.status==='finished'?'Expedition complete':record.status==='idle'?'Touchdown → Western frontier':routeRun.summary();$('#journey-progress').value=record.status==='idle'?0:record.status==='finished'?1:(record.run.next-1)/(journey.course.points.length-1);$('#journey-goal').textContent=record.returnPoint?'Your position is saved. Return to the course to continue.':`Restore memory at every checkpoint. ${4-missingMissions(record).length}/4 systems missions complete. ${missingMissions(record).length?'Remaining: '+missingMissions(record).map(id=>sites.find(p=>p.id===id).name).join(', ')+'.':'Replacement systems ready.'} Photos and Ingenuity are optional.`+(record.run.upgraded?' Prior route progress retained; scoring starts from this upgrade.':'');tourList.querySelector('h3')?.replaceChildren(document.createTextNode('Optional photo lookouts'));}
  const list=$('#activity-list');list.replaceChildren();
  for(const site of sites){const row=document.createElement('section'),title=document.createElement('h3'),small=document.createElement('small'),p=document.createElement('p'),button=document.createElement('button'),target=document.createElement('button'),actions=document.createElement('div');title.textContent=activitySymbols[site.id]+' '+site.name;small.textContent=record.activities.includes(site.id)?'COMPLETE THIS EXPEDITION':results[site.id]?'PREVIOUSLY COMPLETED':site.category;p.textContent=site.goal;button.textContent='Jump to activity';button.dataset.activity=site.id;button.onclick=()=>confirm(site.name,site.goal+' Your expedition position is kept for your return.',()=>begin(site.id));target.textContent='Target on map';target.dataset.activityTarget=site.id;target.onclick=()=>api.targetSite({...site,activityId:site.id});actions.className='actions';actions.append(button,target);const preview=api.sitePreview(site);row.append(preview,small,title,p,actions);list.append(row);}
 }
 function confirm(title,copy,yes,label='Jump and begin'){api.openDialog('#activity-confirm');$('#activity-confirm-title').textContent=title;$('#activity-confirm-copy').textContent=copy;$('#activity-confirm-yes').textContent=label;$('#activity-confirm-yes').onclick=yes;}
 function start(){if(routeRun){stop();record.freeRoamSetup??=api.travelSetup();api.enableTourKit();record.version=2;record.tourVersion=0;record.timing=restoreTiming();record.status='active';record.activities=[];offered.clear();record.next=1;record.run=newRouteRun(journey.course);record.finishReached=false;record.returnPoint=null;returnPose=null;const [a,b]=journey.course.points;api.reset({...a,heading:heading(a,b)});api.explore();routeRun.guide();routeRun.show();api.save();return;}stop();record.freeRoamSetup??=api.travelSetup();api.enableTourKit();record.version=2;record.tourVersion=CURRENT_TOUR_VERSION;record.lookouts=['touchdown'];record.timing=restoreTiming();record.timing.stops.push({id:'touchdown',seconds:0});record.status='active';record.next=1;record.activities=[];record.finishReached=false;record.returnPoint=null;returnPose=null;api.reset({...journey.start,heading:heading(journey.start,journey.checkpoints[1])});api.explore();guide();api.collectLookout(journey.lookouts.find(p=>p.id==='touchdown').index);api.save();}
 function heading(a,b){return Math.atan2(b.x-a.x,-(b.y-a.y));}
 function guide(){if(routeRun){if(record.run.facts.length===journey.course.facts.length&&missingMissions(record).length){const site=sites.find(p=>p.id===missingMissions(record)[0]);api.nav.target={...site,activityId:site.id};}else routeRun.guide();return;}if(record.status==='active'){const lookout=nextLookout(journey,record);if(lookout&&record.next>=lookout.checkpoint){api.nav.target={...lookout,tourLookout:true};return;}const p=journey.checkpoints[record.next]??journey.finish;api.nav.target={...p,name:record.next===journey.checkpoints.length?'Finish':'Recorded route'};}}
 function returnToRoute(){stop();api.closeDialogs();const p=record.returnPoint??returnPose;if(p){api.restoreTravel(p);api.reset(p);}record.returnPoint=null;returnPose=null;api.explore();if(record.status==='active'){guide();routeRun?.show();}api.save();}
 function remember(){const p={...pose(api.state),...api.travelSetup()};if(record.status==='active'&&!record.returnPoint)record.returnPoint=p;returnPose??=p;}
 function begin(id,reverse=false){
  if(!sites.some(s=>s.id===id))return;if(id==='helicopter'&&(!firmware||record.status!=='finished')){const near=Math.min(dist(api.state,sites.find(p=>p.id===id)),dist(api.state,heliEnd))<85;if(!near){api.targetSite({...sites.find(p=>p.id===id),activityId:id});api.closeDialogs();api.resume();return;}confirm('Ingenuity · Wireless link',firmware?'Firmware is ready. Finish the replacement mission to unlock the flight replay.':'A silent helicopter. Upload the experimental firmware now; flight unlocks when your replacement mission is complete.',()=>{firmware=true;api.save();api.closeDialogs();api.resume();},firmware?'Continue expedition':'Upload firmware');return;}remember();stop();active=sites.find(s=>s.id===id);seconds=0;lastPaint=0;lastMesh=0;jump=null;armed=false;boostStage=0;
  api.closeDialogs();if(api.state.mode==='trial')api.endLap();
  if(id.endsWith('trial')){api.chooseRace(id);return;}
  if(id==='neretva-jump'){api.enableKit();api.reset(active.start);api.nav.target={...active.lip,name:'Neretva launch crest'};}
  else api.reset({...active,heading:0});
  api.explore();$('#activity-hud').hidden=false;$('#activity-name').textContent=active.name;actions();
  if(id==='photo'){api.reset({...active,heading:heading(active,api.area.samples[3].focus)});camera();}
  if(id==='art'){document.body.classList.add('art-active');artProtected=art.length>1;api.storm.age=-1;api.storm.haze=0;rebuildArt();}
  if(id==='helicopter'){flightReverse=reverse;if(reverse)api.reset({...heliEnd,heading:0});heliArmed=false;api.pause();api.openDialog('#helicopter-dialog');heliToken=crypto.randomUUID();const frame=document.createElement('iframe');frame.title='Ingenuity journey';const u=new URL('../../../flight/index.html',import.meta.url);u.searchParams.set('jezeroActivity',heliToken);u.searchParams.set('direction',reverse?'reverse':'forward');u.searchParams.set('route',new URL('./assets/helicopter-route.json',import.meta.url).href);frame.src=u.href;$('#helicopter-frame').replaceChildren(frame);}
  api.save();update();
 }
 function stopHelicopter(){heliToken=null;$('#helicopter-frame').replaceChildren();}
 function stop(){if(photo)closeCamera();document.body.classList.remove('art-active');if(api.state.artHop){api.state.artHop=null;api.state.air=false;api.state.v=0;api.state.z=ground(api.state.x,api.state.y);}stopHelicopter();active=null;jump=null;for(let i=api.area.pickups.length-1;i>=0;i--)if(api.area.pickups[i].id>=100000)api.area.pickups.splice(i,1);$('#activity-hud').hidden=true;$('#art-map').hidden=true;api.gpu.activityMarkers=null;}
 function actions(){const out=$('#activity-actions');out.replaceChildren();const add=(label,fn,id)=>{const b=document.createElement('button');b.textContent=label;if(id)b.id=id;b.onclick=fn;out.append(b);};
  if(active.id==='photo')add('Camera',camera,'activity-camera');
  if(active.id==='art'){add('Overhead view',camera,'art-camera');add('Erase',eraseArt,'art-clear');add('Photograph',()=>{if(!photo)camera();$('#drawing-frame').click();},'art-photo');}
  if(active.id.includes('jump'))add('Retry run-up',()=>begin(active.id),'jump-retry');
  add('Leave',()=>{stop();openMenu();},'activity-leave');
 }
 function complete(copy){if(!active)return;const id=active.id;results[id]={date:new Date().toISOString(),summary:copy};const qualifies=id!=='neretva-jump'||boostStage===3;if(qualifies)creditActivity(record,id);api.save();api.openDialog('#activity-result');$('#activity-result-title').textContent=active.name;$('#activity-result-copy').textContent=copy+(record.status==='active'&&qualifies?(routeRun?(CLONE_MISSIONS.includes(id)?' · Replacement systems mission complete.':' · Optional flight recorded.'):' · Required expedition activity complete.'):'');}
 function camera(){if(api.state.air)return;if(photo){closeCamera();return;}api.pause();api.closeDialogs();const overhead=active?.id==='art';photo={heading:overhead?0:api.state.heading,camera:{...api.gpu.camera},overhead,navigating:overhead};api.gpu.photoView={heading:photo.heading,pitch:overhead?Math.PI/2:0,zoom:1,live:overhead};if(overhead)Object.assign(api.gpu.photoView,{x:artSite.x,y:artSite.y,extent:artSize});$('#camera-tools').hidden=overhead;$('#drawing-frame').hidden=!overhead;$('#camera-navigate').hidden=!overhead;cameraErase.hidden=!overhead;$('#camera-navigate').setAttribute('aria-pressed','true');document.body.classList.add(overhead?'drawing-camera':'camera-active');$('#camera-pan').value=0;$('#camera-tilt').value=overhead?90:0;$('#camera-zoom').value=1;$('#camera-status').textContent='';if(overhead)api.resume();api.draw();}
 function closeCamera(){if(!photo)return;api.gpu.camera=photo.camera;photo=null;api.gpu.photoView=null;$('#camera-tools').hidden=true;$('#drawing-frame').hidden=true;document.body.classList.remove('camera-active','drawing-camera','drawing-framing');api.resume();}
 function hop(){if(active?.id!=='art'||!startArtHop(api.state))return false;stroke++;api.gpu.tracks.last=null;return true;}
 function eraseArt(){art=[];stroke++;artProtected=false;api.gpu.tracks.reset();api.gpu.trackMesh.count=0;rebuildArt();artMap();api.save();api.draw();}
 async function capture(){
  if(!photo||photoBusy)return;const captureView=photo,captureActivity=active;photoBusy=true;api.pause();$('#camera-status').textContent='Saving photograph...';$('#camera-capture').disabled=true;
  try{api.draw();const c=document.createElement('canvas');c.width=api.gpu.canvas.width;c.height=api.gpu.canvas.height;const ctx=c.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,c.height),colors=api.state.solar.up<0?['#03060c','#080c14','#151720']:api.state.solar.up<.1?['#211c2c','#775751','#745b51']:['#75482f','#be8b62','#b48059'];gradient.addColorStop(0,colors[0]);gradient.addColorStop(.53,colors[1]);gradient.addColorStop(1,colors[2]);ctx.fillStyle=gradient;ctx.fillRect(0,0,c.width,c.height);ctx.drawImage($('#night-sky'),0,0,c.width,c.height);ctx.drawImage(api.gpu.canvas,0,0);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/jpeg',.9));if(!blob)throw Error('Capture unavailable');await storePhoto(blob,active?.name??'Jezero field photograph');
   if(photo!==captureView||active!==captureActivity)return;
   if(!active||!['art','photo'].includes(active.id)){$('#camera-status').textContent='Photograph saved.';return;}
   const isArt=active.id==='art',focus=isArt?artSite:api.area.samples[3].focus,q=api.gpu.project(focus.x,focus.y,ground(focus.x,focus.y)+6),visible=q.depth>4&&q.x>0&&q.x<api.gpu.canvas.clientWidth&&q.y>0&&q.y<api.gpu.canvas.clientHeight;
   const qualifies=visible&&(!isArt||(art.length>=30&&photo.overhead));
   $('#camera-status').textContent=qualifies?'Photograph saved.':isArt&&art.length<30?'Photograph saved. Add more tracks to complete the drawing.':'Photograph saved. The subject is outside the frame.';
   if(qualifies){if(isArt)artProtected=false;closeCamera();complete(isArt?'Your drawing is recorded from above.':'Kodiak recorded from the rover-mounted camera.');}
  }catch(e){$('#camera-status').textContent=e?.message?.startsWith('Photo album full')?e.message:'Could not save photograph. Browser storage may be full. Try again.';console.warn(e);}finally{photoBusy=false;$('#camera-capture').disabled=false;if(photo===captureView&&photo?.navigating)api.resume();}
 }
 function clearURLs(){for(const u of viewURLs)URL.revokeObjectURL(u);viewURLs=[];}
 function album(){api.openDialog('#photo-album-dialog');clearURLs();const frame=document.createElement('iframe');frame.title='Photo album';albumToken=crypto.randomUUID();const url=new URL('../../../extras/album/index.html',import.meta.url);url.searchParams.set('albumToken',albumToken);frame.src=url.href;$('#photo-album-images').replaceChildren(frame);}
 addEventListener('message',e=>{if(e.origin===location.origin&&albumToken&&e.data?.token===albumToken&&e.data?.type==='astra-album-close')openMenu();});
 function rebuildArt(){const vertices=[];for(let i=1;i<art.length;i++){const a=art[i-1],b=art[i];if(dist(a,b)>24||a.stroke!==b.stroke)continue;for(const side of [-1,1]){const point=(p,w)=>{const d=side*3.8+w*.65,x=p.x+Math.cos(p.h)*d,y=p.y+Math.sin(p.h)*d;return [x,y,ground(x,y)+.16];};const q=[point(a,-1),point(a,1),point(b,-1),point(b,1)];triangle(vertices,q[0],q[1],q[2],[.26,.20,.16]);triangle(vertices,q[1],q[3],q[2],[.26,.20,.16]);}}
  if(api.gpu.artMesh)api.gpu.gl.deleteBuffer(api.gpu.artMesh.b);api.gpu.artMesh=vertices.length?api.gpu.upload(new Float32Array(vertices)):null;
 }
 function artMap(){const c=$('#art-map');c.hidden=active?.id!=='art';if(c.hidden)return;c.width=180;c.height=180;const ctx=c.getContext('2d');ctx.fillStyle='#b38d68';ctx.fillRect(0,0,180,180);ctx.strokeStyle='#3c3328';ctx.lineWidth=1.5;ctx.beginPath();let prev=null;for(const p of art){const x=90+(p.x-artSite.x)/artSize*90,y=90+(p.y-artSite.y)/artSize*90;if(prev&&dist(prev,p)<24&&prev.stroke===p.stroke)ctx.lineTo(x,y);else ctx.moveTo(x,y);prev=p;}ctx.stroke();ctx.save();ctx.translate(90+(api.state.x-artSite.x)/artSize*90,90+(api.state.y-artSite.y)/artSize*90);ctx.rotate(api.state.heading);ctx.fillStyle='#ecf6db';ctx.strokeStyle='#17332f';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(5,6);ctx.lineTo(0,3);ctx.lineTo(-5,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();c.dataset.heading=String(api.state.heading);}
 function markers(){if(!active)return sites.filter(p=>CLONE_MISSIONS.includes(p.id)&&dist(p,api.state)<900).map(p=>({...p,r:28,color:record.activities.includes(p.id)?'#83c39c':'#efd6a2'}));if(active.id==='neretva-jump')return [...boostRows.flatMap((row,i)=>row.map(p=>({...p,color:i<boostStage?'#83c39c':'#efd6a2'}))),{...active.lip,r:45,color:'#8fd5df'}];if(active.id==='art')return [{...artSite,r:artSize,color:'#efd6a2'}];return [];}
 function overlay(ctx,gpu){
  if(photo?.overhead&&photo.navigating){const s=api.state,p=gpu.project(s.x,s.y,s.z+2),q=gpu.project(s.x+Math.sin(s.heading)*8,s.y-Math.cos(s.heading)*8,s.z+2);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(q.x-p.x,-(q.y-p.y)));ctx.beginPath();ctx.moveTo(0,-9);ctx.lineTo(6,6);ctx.lineTo(0,3);ctx.lineTo(-6,6);ctx.closePath();ctx.fillStyle='#cce9db';ctx.strokeStyle='#173b35';ctx.lineWidth=1.5;ctx.fill();ctx.stroke();ctx.restore();}
  for(const p of markers()){ctx.strokeStyle=p.color;ctx.lineWidth=2;ctx.beginPath();let pen=false;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,x=p.x+Math.cos(a)*p.r,y=p.y+Math.sin(a)*p.r,q=gpu.project(x,y,ground(x,y)+.5);if(q.depth<4){pen=false;continue;}pen?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);pen=true;}ctx.stroke();if(!active){const a=gpu.project(p.x,p.y,ground(p.x,p.y)+1),b=gpu.project(p.x,p.y,ground(p.x,p.y)+25);if(a.depth>4&&b.depth>4){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(b.x+18,b.y+5);ctx.lineTo(b.x,b.y+10);ctx.stroke();ctx.font='bold 12px system-ui';ctx.fillStyle=p.color;ctx.strokeStyle='#172420';ctx.lineWidth=3;ctx.strokeText(p.name,b.x+22,b.y+5);ctx.fillText(p.name,b.x+22,b.y+5);}}}
 }
 function tick(dt,before){
  const s=api.state;
  if(routeRun&&!active&&record.status==='active'&&cloneReady(record,journey.course)){finishRouteRun();return true;}
  if(!active&&rejoinJourney(record,before,s,dt)){returnPose=null;guide();api.save();}
  if(routeRun&&!active&&record.status==='active'&&!record.returnPoint&&routeRun.tick(dt,before))return true;
  if(!routeRun&&!active){const p=collectLookout(journey,record,before,s,dt);if(p){guide();api.collectLookout(p.index);api.save();return true;}}
  if(!routeRun&&!active&&!record.returnPoint&&advanceJourney(journey,record,before,s,dt)){if(!api.nav.target?.activityId)guide();api.save();}
  if(!routeRun&&!active&&reachFinish(journey,record,s)){api.save();if(nextLookout(journey,record)||record.activities.length<REQUIRED_ACTIVITIES){openMenu();return true;}}
  if(!routeRun&&!active&&canFinish(journey,record,s)){record.status='finished';if(record.freeRoamSetup){api.restoreTravel(record.freeRoamSetup);api.applyTravel();record.freeRoamSetup=null;record.returnPoint=null;returnPose=null;}api.nav.target=null;api.save();api.openDialog('#journey-finish');$('#journey-finish-copy').textContent=`Recorded journey through sol ${journey.lastSol} retraced. ${record.activities.length} ${record.activities.length===1?'activity':'different activities'} completed. Your photographs and discoveries remain in your field records.`;return true;}
  if(!active){for(const site of sites.filter(p=>CLONE_MISSIONS.includes(p.id))){const d=dist(s,site);if(d>150)offered.delete(site.id);if(record.status==='active'&&!record.activities.includes(site.id)&&!offered.has(site.id)&&!s.air&&s.mode==='free'&&d<105){offered.add(site.id);confirm(site.name,site.goal,()=>begin(site.id),'Begin mission');return true;}}const nearEnd=dist(s,heliEnd)<28,nearStart=dist(s,sites.find(p=>p.id==='helicopter'))<28;if(!nearEnd&&!nearStart)heliArmed=true;if(heliArmed&&(nearEnd||nearStart)&&!s.air&&s.mode==='free'){heliArmed=false;begin('helicopter',nearEnd);return true;}const site=sites.find(p=>p.id===api.nav.target?.activityId);if(site&&s.mode==='free'&&!s.air&&dist(s,site)<50){api.nav.target=null;api.save();confirm(site.name,site.goal,()=>begin(site.id),'Begin activity');return true;}return;}seconds+=dt;
  if(active.id==='art'&&Math.abs(s.x-artSite.x)<artSize&&Math.abs(s.y-artSite.y)<artSize&&!s.air&&Math.abs(s.v)>.5&&(!art.length||dist(s,art.at(-1))>3)&&seconds-lastPaint>.05){art.push({x:s.x,y:s.y,h:s.heading,stroke});art=art.slice(-1400);artProtected=true;lastPaint=seconds;if(seconds-lastMesh>.3){rebuildArt();lastMesh=seconds;}}
  if(active.id==='neretva-jump'){
   boostStage=advanceBoost(s,before,boostStage);
   if(!armed&&before.y>active.lip.y&&s.y<=active.lip.y&&Math.abs(s.x-active.lip.x)<155&&s.v>100){
    armed=true;const alignment=Math.max(0,Math.cos(s.heading))**6,center=Math.cos((s.x-active.lip.x)/160*Math.PI/2)**4;
    s.air=true;s.z=Math.max(s.z,ground(s.x,s.y)+.2);s.vz=Math.min(Math.abs(s.v),160)*(boostStage===3?.14:.025)*alignment*center;s.jumpStart={x:s.x,y:s.y};
   }
   if(!jump&&s.air&&dist(s,active.lip)<500)jump={x:s.x,y:s.y,t:seconds,hit:false,boosts:boostStage};
   if(jump&&s.impact)jump.hit=true;
   if(jump&&!s.air&&seconds-jump.t>.12){const length=dist(s,jump)/3.2;results['neretva-jump-best']=Math.max(Number(results['neretva-jump-best'])||0,length);complete(`Landing: ${length.toFixed(0)} mapped m. ${jump.boosts}/3 boost zones. Best ${results['neretva-jump-best'].toFixed(0)} m.${jump.hit?' Rock contact.':''}${jump.boosts<3?' Link all three boost zones to complete this activity.':''}`);jump=null;}
  }
 }
 function finishRouteRun(){if(missingMissions(record).length){api.save();guide();openMenu();return;}record.status='finished';record.finishReached=true;record.next=journey.checkpoints.length;if(record.freeRoamSetup){api.restoreTravel(record.freeRoamSetup);api.applyTravel();record.freeRoamSetup=null;}record.returnPoint=null;returnPose=null;api.nav.target=null;api.save();update();api.openDialog('#journey-finish');$('#journey-finish-copy').textContent=`Memory replica restored. Four systems missions complete. The Perseverance replacement is ready for the original rover’s retrieval. Next assignment: Gale Crater. ${routeScore(record.run)}% of driving time was inside the course.${record.run.upgraded?' Score covers driving since the route upgrade.':''} ${firmware?'Ingenuity firmware ready · Flight replay unlocked.':'Find Ingenuity to unlock the optional flight replay.'} Your photographs and discoveries remain in your field records.`;}
 function update(){
  $('#journey-hud').hidden=record.status!=='active'||!!photo;$('#journey-hud').textContent=`EXPEDITION ${Math.floor((record.next-1)/(journey.checkpoints.length-1)*100)}% · ${Math.min(record.activities.length,REQUIRED_ACTIVITIES)}/${REQUIRED_ACTIVITIES}`;
  if(record.tourVersion)$('#journey-hud').textContent=`${Math.floor((record.next-1)/(journey.checkpoints.length-1)*100)}% route · ${record.lookouts.length}/${tourStops(journey,record).length} photos · ${Math.min(record.activities.length,REQUIRED_ACTIVITIES)}/1 activity`;
  if(routeRun){routeRun.update();$('#journey-hud').textContent=routeRun.summary()+` · ${4-missingMissions(record).length}/4 systems`;}
  if(record.status==='active'&&record.returnPoint&&!active&&!record.finishReached)$('#journey-hud').textContent='Return to route';
  if(!active)return;let status=active.goal;
  if(active.id==='art')status=`${art.length>=30?'Drawing ready for a photograph':'Leave a trail in the clearing'} · ${artProtected?'Art protected':'Photographed'}`;
  if(active.id==='neretva-jump')status=jump?'In flight · Hold Slow to shorten landing':`${boostStage}/3 boost zones · Neretva crossing`;
  $('#activity-status').textContent=status;artMap();
 }
 function raceComplete(){if(active?.id.endsWith('trial')){results[active.id]={date:new Date().toISOString()};creditActivity(record,active.id);api.save();}}
 rebuildArt();
 return {record,journey,sites,get active(){return active},get photo(){return photo},get protectsArt(){return artProtected},snapshot,openMenu,start,begin,stop,remember,returnToRoute,tick,update,overlay,raceComplete,guide,complete,camera,hop,eraseArt,closeCamera,get art(){return art},lookout,get mapSites(){return [...sites,heliEnd]},get target(){return target},get boostStage(){return boostStage},heliEnd};
}

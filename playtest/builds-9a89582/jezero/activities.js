import {toGame} from './terrain.js';
import {triangle} from '../mars-renderer/geometry.js';
import {advanceJourney,canFinish,creditActivity,REQUIRED_ACTIVITIES} from './expedition.js';
import {storePhoto,readPhotos,deletePhoto} from './field-photos.js';

const $=s=>document.querySelector(s),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pose=s=>({x:s.x,y:s.y,heading:s.heading});
export const activityCatalog=[
 {id:'photo',name:'Kodiak photography',category:'OBSERVATION',goal:'Compose a photograph of Kodiak from the overlook.',...toGame(80,-880)},
 {id:'art',name:'Tracks in the dust',category:'CREATIVE',goal:'Draw a trail across the clearing, then photograph it from the lookout.',...toGame(1300,-600)},
 {id:'radar',name:'Beneath the delta',category:'SCIENCE SIMULATION',goal:'Survey three transects. Compare the hidden rock layers.',...toGame(-3200,500)},
 {id:'atmosphere',name:'Weather station',category:'SCIENCE SIMULATION',goal:'Record three observations as a local dust cloud passes.',...toGame(-2000,1600)},
 {id:'long-jump',name:'Long jump',category:'ARCADE CHALLENGE',goal:'Build speed, leave the ridge and land. Every measured landing counts.',...toGame(600,-700)},
 {id:'target-jump',name:'Precision landing',category:'ARCADE CHALLENGE',goal:'Launch toward the marked landing zone. Every measured landing counts.',...toGame(600,-700)},
 {id:'helicopter',name:'Ingenuity flight lab',category:'FLIGHT SIMULATION',goal:'Fly the survey, photograph five targets and land safely.',...toGame(1800,-1100)},
 {id:'delta-trial',name:'Delta circuit',category:'ARCADE CHALLENGE',goal:'Complete the circuit through its ordered checkpoints.'},
];

export function createActivities(api,journey,record,stored={}){
 let active=null,seconds=0,photo=null,photoBusy=false,jump=null,readings=[],survey=new Set(),armed=false,eraseUntil=0,lastPaint=0,lastMesh=0,returnPose=null,heliToken=null,viewURLs=[];
 const results=stored.results&&typeof stored.results==='object'?stored.results:{};
 let art=Array.isArray(stored.art)?stored.art.filter(p=>p&&['x','y','h'].every(k=>Number.isFinite(p[k]))&&Math.abs(p.x-8960)<500&&Math.abs(p.y-6720)<500).slice(-1400):[];
 let artProtected=art.length>1&&stored.artProtected!==false;
 const sites=activityCatalog.map(p=>({...p}));
 const ground=(x,y)=>api.area.ground(x,y);
 const safe=p=>{let best=p,score=Infinity;for(let y=-64;y<=64;y+=16)for(let x=-64;x<=64;x+=16){const q={x:p.x+x,y:p.y+y};if(api.area.rocks.some(([a,b,r])=>Math.hypot(q.x-a,q.y-b)<r+12))continue;const slope=Math.hypot(ground(q.x+8,q.y)-ground(q.x-8,q.y),ground(q.x,q.y+8)-ground(q.x,q.y-8))/16,s=slope*300+Math.hypot(x,y);if(s<score){score=s;best=q;}}return {...p,...best};};
 for(let i=0;i<sites.length;i++)if(Number.isFinite(sites[i].x)&&!sites[i].id.includes('jump'))sites[i]=safe(sites[i]);
 sites.find(p=>p.id==='delta-trial').x=api.area.start.x;sites.find(p=>p.id==='delta-trial').y=api.area.start.y;
 const artSite=sites.find(p=>p.id==='art'),artSize=240;
 let lookout=artSite,highest=-Infinity;
 for(let a=0;a<Math.PI*2;a+=Math.PI/12){const q=safe({x:artSite.x+Math.cos(a)*360,y:artSite.y+Math.sin(a)*360}),z=ground(q.x,q.y);if(z>highest){highest=z;lookout=q;}}
 const radarSite=sites.find(p=>p.id==='radar'),transects=[-1,0,1].map((v,i)=>({...safe({x:radarSite.x+v*130,y:radarSite.y+(i===1?-60:60)}),id:i})),sampleTarget=safe({x:radarSite.x+85,y:radarSite.y+135});
 const target={x:api.area.jump.x,y:api.area.jump.y-160};
 const section=document.createElement('div');section.innerHTML=`
 <button id="journey-hud" title="Open expedition" hidden></button>
 <div id="activity-hud" hidden><strong id="activity-name"></strong><span id="activity-status" role="status"></span><div id="activity-actions"></div></div>
 <div id="camera-tools" hidden><label>Zoom<input id="camera-zoom" type="range" min="1" max="8" step=".1" value="1"></label><label>Pan<input id="camera-pan" type="range" min="-180" max="180" value="0"></label><label>Tilt<input id="camera-tilt" type="range" min="-45" max="45" value="0"></label><div class="actions"><button id="camera-capture">Capture</button><button id="camera-close">Back</button></div><p id="camera-status" role="status"></p></div>
 <canvas id="art-map" aria-label="Track art clearing" hidden></canvas><div id="art-erase" hidden></div>
 <dialog id="expedition-dialog" class="menu-sheet" aria-labelledby="expedition-title"><div class="sheet-head"><h2 id="expedition-title">Jezero expedition</h2><button id="expedition-close" title="Close expedition" aria-label="Close expedition">×</button></div><div class="menu-scroll"><p id="journey-status"></p><progress id="journey-progress" max="1" value="0"></progress><p id="journey-goal"></p><div class="actions"><button id="journey-start" class="primary">Start expedition</button><button id="journey-return">Return to route</button></div><p class="eyebrow">ACTIVITIES</p><div id="activity-list"></div><button id="photo-album">Field photographs</button><p class="expedition-credit">Recorded NASA traverse, first drive to sol 1980. Activity sites and challenges are authored; this is not a reenactment of individual mission operations.</p></div></dialog>
 <dialog id="activity-confirm" aria-labelledby="activity-confirm-title"><h2 id="activity-confirm-title"></h2><p id="activity-confirm-copy"></p><div class="actions"><button id="activity-confirm-no">Cancel</button><button id="activity-confirm-yes" class="primary">Jump and begin</button></div></dialog>
 <dialog id="activity-result" aria-labelledby="activity-result-title"><span class="eyebrow">FIELD RECORD</span><h2 id="activity-result-title"></h2><p id="activity-result-copy"></p><canvas id="science-result" width="480" height="180" hidden></canvas><div class="actions"><button id="activity-retry">Again</button><button id="activity-return">Return to expedition</button><button id="activity-keep">Keep exploring</button></div></dialog>
 <dialog id="journey-finish" aria-labelledby="journey-finish-title"><span class="eyebrow">JEZERO / EXPEDITION COMPLETE</span><h2 id="journey-finish-title">From touchdown to the western frontier.</h2><p id="journey-finish-copy"></p><div class="actions"><button id="journey-finish-explore">Keep exploring</button><button id="journey-finish-replay">New expedition</button></div></dialog>
 <dialog id="photo-album-dialog" aria-labelledby="photo-album-title"><div class="sheet-head"><h2 id="photo-album-title">Field photographs</h2><button id="photo-album-close" aria-label="Close photographs">×</button></div><div id="photo-album-images"></div></dialog>
 <dialog id="helicopter-dialog" aria-labelledby="helicopter-title"><div class="sheet-head"><h2 id="helicopter-title">Ingenuity / flight simulation</h2><button id="helicopter-exit" aria-label="Leave flight simulation">×</button></div><div id="helicopter-frame"></div></dialog>`;
 document.body.append(section);
 const pauseButton=document.createElement('button');pauseButton.id='open-expedition';pauseButton.textContent='EXPEDITION & ACTIVITIES';$('#resume').after(pauseButton);pauseButton.onclick=openMenu;
 $('#journey-hud').onclick=openMenu;$('#expedition-close').onclick=()=>{api.closeDialogs();api.resume();};
 $('#journey-start').onclick=()=>confirm('Start a new expedition?','Begin at Octavia E. Butler Landing. This resets only this expedition, not discoveries, photographs or activity records.',start,'Start expedition');
 $('#journey-return').onclick=returnToRoute;
 $('#journey-finish-explore').onclick=()=>{api.closeDialogs();api.resume();};$('#journey-finish-replay').onclick=()=>{api.closeDialogs();openMenu();};
 $('#activity-confirm-no').onclick=openMenu;
 $('#activity-keep').onclick=()=>{stop();api.closeDialogs();api.resume();};
 $('#activity-return').onclick=returnToRoute;$('#activity-retry').onclick=()=>{if(active)begin(active.id);};
 $('#camera-close').onclick=closeCamera;$('#camera-capture').onclick=capture;
 for(const id of ['zoom','pan','tilt'])$('#camera-'+id).oninput=()=>{if(!photo)return;api.gpu.photoView.zoom=+$('#camera-zoom').value;api.gpu.photoView.heading=photo.heading+(+$('#camera-pan').value)*Math.PI/180;api.gpu.photoView.pitch=(+$('#camera-tilt').value)*Math.PI/180;api.draw();};
 let drag=null;
 api.gpu.canvas.addEventListener('pointerdown',e=>{if(!photo)return;drag={x:e.clientX,y:e.clientY,h:+$('#camera-pan').value,p:+$('#camera-tilt').value};api.gpu.canvas.setPointerCapture(e.pointerId);});
 api.gpu.canvas.addEventListener('pointermove',e=>{if(!photo||!drag)return;$('#camera-pan').value=clamp(drag.h-(e.clientX-drag.x)*.15,-180,180);$('#camera-tilt').value=clamp(drag.p+(e.clientY-drag.y)*.12,-45,45);$('#camera-pan').oninput();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])api.gpu.canvas.addEventListener(name,()=>drag=null);
 $('#photo-album').onclick=album;$('#photo-album-close').onclick=()=>{clearURLs();openMenu();};
 $('#helicopter-exit').onclick=()=>{stopHelicopter();stop();openMenu();};
 for(const d of section.querySelectorAll('dialog'))d.addEventListener('cancel',e=>{e.preventDefault();if(d.id==='helicopter-dialog'){stopHelicopter();stop();}if(d.id==='photo-album-dialog')clearURLs();openMenu();});
 addEventListener('message',e=>{const frame=$('#helicopter-frame iframe');if(e.origin!==location.origin||e.source!==frame?.contentWindow||e.data?.token!==heliToken)return;if(e.data.type==='astra-jezero-heli-ready'){frame.dataset.ready='true';return;}if(e.data.type!=='astra-jezero-heli-complete')return;stopHelicopter();complete('Five aerial survey photographs and a safe final landing.');});

 function snapshot(){return {results,art,artProtected};}
 function openMenu(){if(photo)closeCamera();api.openDialog('#expedition-dialog');renderMenu();}
 function renderMenu(){
  const visited=record.next-1,total=journey.checkpoints.length-1;
  $('#journey-status').textContent=record.status==='idle'?'Octavia E. Butler Landing → Western frontier':record.status==='finished'?'Expedition complete':`${Math.floor(visited/total*100)}% of route · ${record.activities.length}/${REQUIRED_ACTIVITIES} different activities`;
  $('#journey-progress').value=record.status==='idle'?0:visited/total;
  $('#journey-goal').textContent=record.status==='idle'?'Retrace the recorded journey and complete any three different activities. No score threshold.':record.next<journey.checkpoints.length?`Next route reference: sol ${journey.checkpoints[record.next].sol}`:record.activities.length<REQUIRED_ACTIVITIES?`Route complete. ${REQUIRED_ACTIVITIES-record.activities.length} more different activities before the finish.`:'Return to the western frontier to finish.';
  $('#journey-start').textContent=record.status==='idle'?'Start expedition':'Restart expedition';$('#journey-return').hidden=record.status!=='active';
  const list=$('#activity-list');list.replaceChildren();
  for(const site of sites){const row=document.createElement('section'),title=document.createElement('h3'),small=document.createElement('small'),p=document.createElement('p'),button=document.createElement('button');title.textContent=site.name;small.textContent=record.activities.includes(site.id)?'COMPLETE THIS EXPEDITION':results[site.id]?'PREVIOUSLY COMPLETED':site.category;p.textContent=site.goal;button.textContent='Jump to activity';button.dataset.activity=site.id;button.onclick=()=>confirm(site.name,site.goal+' Your expedition position is kept for your return.',()=>begin(site.id));row.append(small,title,p,button);list.append(row);}
 }
 function confirm(title,copy,yes,label='Jump and begin'){api.openDialog('#activity-confirm');$('#activity-confirm-title').textContent=title;$('#activity-confirm-copy').textContent=copy;$('#activity-confirm-yes').textContent=label;$('#activity-confirm-yes').onclick=yes;}
 function start(){stop();record.status='active';record.next=1;record.activities=[];record.returnPoint=null;api.reset({...journey.start,heading:heading(journey.start,journey.checkpoints[1])});api.explore();guide();api.save();}
 function heading(a,b){return Math.atan2(b.x-a.x,-(b.y-a.y));}
 function guide(){if(record.status==='active'){const p=journey.checkpoints[record.next]??journey.finish;api.nav.target={...p,name:record.next===journey.checkpoints.length?'Finish':'Recorded route'};}}
 function returnToRoute(){stop();api.closeDialogs();const p=record.returnPoint??returnPose;if(p){api.restoreTravel(p);api.reset(p);}record.returnPoint=null;returnPose=null;api.explore();if(record.status==='active')guide();api.save();}
 function remember(){const p={...pose(api.state),...api.travelSetup()};if(record.status==='active'&&!record.returnPoint)record.returnPoint=p;returnPose??=p;}
 function begin(id){
  remember();stop();active=sites.find(s=>s.id===id);seconds=0;survey=new Set();readings=[];jump=null;armed=false;
  api.closeDialogs();if(api.state.mode==='trial')api.endLap();
  if(id==='delta-trial'){api.chooseRace();return;}
  if(id.includes('jump')){api.enableKit();api.reset({x:api.area.jump.x,y:api.area.jump.y+350,heading:0});for(const [i,d]of [270,140].entries())api.area.pickups.push({x:api.area.jump.x,y:api.area.jump.y+d,id:100000+i});}
  else api.reset({...active,heading:0});
  api.explore();$('#activity-hud').hidden=false;$('#activity-name').textContent=active.name;actions();
  if(id==='photo'){api.reset({...active,heading:heading(active,api.area.samples[3].focus)});camera();}
  if(id==='art'){artProtected=art.length>1;api.storm.age=-1;api.storm.haze=0;rebuildArt();}
  if(id==='helicopter'){api.pause();api.openDialog('#helicopter-dialog');heliToken=crypto.randomUUID();const frame=document.createElement('iframe');frame.title='Ingenuity flight simulation';const u=new URL('../../../index.html',import.meta.url);u.searchParams.set('go','heli');u.searchParams.set('jezeroActivity',heliToken);frame.src=u.href;$('#helicopter-frame').replaceChildren(frame);}
  api.save();update();
 }
 function stopHelicopter(){heliToken=null;$('#helicopter-frame').replaceChildren();}
 function stop(){if(photo)closeCamera();stopHelicopter();active=null;jump=null;for(let i=api.area.pickups.length-1;i>=0;i--)if(api.area.pickups[i].id>=100000)api.area.pickups.splice(i,1);$('#activity-hud').hidden=true;$('#art-map').hidden=true;api.gpu.activityMarkers=null;}
 function actions(){const out=$('#activity-actions');out.replaceChildren();const add=(label,fn,id)=>{const b=document.createElement('button');b.textContent=label;if(id)b.id=id;b.onclick=fn;out.append(b);};
  if(active.id==='photo')add('Camera',camera,'activity-camera');
  if(active.id==='art'){add('Target lookout',()=>{api.nav.target={...lookout,name:'Drawing lookout'};api.save();},'art-lookout');add('Camera',()=>{api.state.heading=heading(api.state,artSite);camera();},'art-camera');add('Erase',()=>confirm('Erase this drawing?','A brief simulated dust sweep clears your tracks.',()=>{api.closeDialogs();api.resume();eraseUntil=performance.now()+1600;$('#art-erase').hidden=false;setTimeout(()=>{art=[];artProtected=false;rebuildArt();$('#art-erase').hidden=true;api.save();},1600);},'Erase'),'art-clear');}
  if(active.id==='radar')add('Scan',scan,'activity-scan');
  if(active.id==='atmosphere')add('Collect reading',reading,'activity-reading');
  if(active.id.includes('jump'))add('Retry run-up',()=>begin(active.id),'jump-retry');
  add('Leave',()=>{stop();openMenu();},'activity-leave');
 }
 function complete(copy){if(!active)return;const id=active.id;results[id]={date:new Date().toISOString(),summary:copy};creditActivity(record,id);api.save();api.openDialog('#activity-result');$('#activity-result-title').textContent=active.name;$('#activity-result-copy').textContent=copy+` · ${record.activities.length}/${REQUIRED_ACTIVITIES} expedition activities`;$('#science-result').hidden=id!=='radar'&&id!=='atmosphere';if(id==='radar')radarChart();if(id==='atmosphere')weatherChart();}
 function camera(){if(!active||api.state.air)return;api.pause();api.closeDialogs();photo={heading:api.state.heading,camera:{...api.gpu.camera}};api.gpu.photoView={heading:photo.heading,pitch:active.id==='art'?.25:0,zoom:1};$('#camera-tools').hidden=false;document.body.classList.add('camera-active');for(const id of ['pan','tilt'])$('#camera-'+id).value=0;$('#camera-tilt').value=active.id==='art'?14:0;$('#camera-zoom').value=1;$('#camera-status').textContent='';api.draw();}
 function closeCamera(){if(!photo)return;api.gpu.camera=photo.camera;photo=null;api.gpu.photoView=null;$('#camera-tools').hidden=true;document.body.classList.remove('camera-active');api.resume();}
 async function capture(){
  if(!photo||photoBusy)return;const captureView=photo,captureActivity=active;photoBusy=true;$('#camera-capture').disabled=true;
  try{api.draw();const c=document.createElement('canvas');c.width=api.gpu.canvas.width;c.height=api.gpu.canvas.height;const ctx=c.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,c.height),colors=api.state.solar.up<0?['#03060c','#080c14','#151720']:api.state.solar.up<.1?['#211c2c','#775751','#745b51']:['#75482f','#be8b62','#b48059'];gradient.addColorStop(0,colors[0]);gradient.addColorStop(.53,colors[1]);gradient.addColorStop(1,colors[2]);ctx.fillStyle=gradient;ctx.fillRect(0,0,c.width,c.height);ctx.drawImage($('#night-sky'),0,0,c.width,c.height);ctx.drawImage(api.gpu.canvas,0,0);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/jpeg',.9));if(!blob)throw Error('Capture unavailable');await storePhoto(blob,active.name);
   if(photo!==captureView||active!==captureActivity)return;
   const isArt=active.id==='art',focus=isArt?artSite:api.area.samples[3].focus,q=api.gpu.project(focus.x,focus.y,ground(focus.x,focus.y)+6),visible=q.depth>4&&q.x>0&&q.x<api.gpu.canvas.clientWidth&&q.y>0&&q.y<api.gpu.canvas.clientHeight;
   const qualifies=visible&&(!isArt||(art.length>=30&&dist(api.state,lookout)<100));
   $('#camera-status').textContent=qualifies?'Photograph saved.':'Photograph saved. The subject is outside the frame.';
   if(qualifies){if(isArt)artProtected=false;closeCamera();complete(isArt?'Your drawing is recorded from the lookout.':'Kodiak recorded from the rover-mounted camera.');}
  }catch(e){$('#camera-status').textContent=e?.message?.startsWith('Photo album full')?e.message:'Could not save photograph. Browser storage may be full. Try again.';console.warn(e);}finally{photoBusy=false;$('#camera-capture').disabled=false;}
 }
 function clearURLs(){for(const u of viewURLs)URL.revokeObjectURL(u);viewURLs=[];}
 async function album(){api.openDialog('#photo-album-dialog');clearURLs();const list=$('#photo-album-images');list.textContent='Loading photographs…';try{const photos=await readPhotos();list.replaceChildren();if(!photos.length)list.textContent='No photographs yet.';for(const p of photos){const f=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption'),link=document.createElement('a'),remove=document.createElement('button');const u=p.dataURL??URL.createObjectURL(p.blob);if(!p.dataURL)viewURLs.push(u);img.src=u;img.alt=p.title;caption.textContent=p.title+' · '+new Date(p.date).toLocaleDateString();link.href=u;link.download='Jezero-'+p.id+'.jpg';link.textContent='Download photograph';remove.textContent='Delete';remove.onclick=async()=>{if(!window.confirm('Delete this photograph from this browser?'))return;try{await deletePhoto(p.id);await album();}catch{remove.textContent='Could not delete';}};f.append(img,caption,link,remove);list.append(f);}}catch{list.textContent='Photograph storage is unavailable in this browser.';}}
 function scan(){if(!active||active.id!=='radar'||Math.abs(api.state.v)>2)return;if(survey.size===3){if(dist(api.state,sampleTarget)<30)complete('Three simulated profiles traced a dipping layer to an exposed rock. A simulated core sample records that exposure. Radar reveals structure, not a buried-object detector.');return;}const t=transects.find(p=>dist(p,api.state)<45&&!survey.has(p.id));if(!t){$('#activity-status').textContent='Stop at an unrecorded survey station.';return;}survey.add(t.id);if(survey.size===3){api.nav.target=null;$('#activity-scan').textContent='Take sample';}else guideStation();}
 function guideStation(){const t=transects.find(p=>!survey.has(p.id));if(t)api.nav.target={...t,name:'Survey station'};}
 function reading(){if(!active||active.id!=='atmosphere'||Math.abs(api.state.v)>2)return;if(readings.length&&seconds-readings.at(-1).t<5)return;const dust=api.storm.density(api.state.x,api.state.y);readings.push({t:seconds,wind:2+7*dust,temp:-52-4*dust,dust});if(readings.length===3)complete('Three simulated observations recorded: wind and dust varied as the local cloud passed. These are illustrative values, not live Mars measurements.');}
 function radarChart(){const c=$('#science-result'),ctx=c.getContext('2d');ctx.fillStyle='#122c30';ctx.fillRect(0,0,480,180);for(let k=0;k<3;k++){ctx.strokeStyle=['#e4c68e','#93d1d9','#91be91'][k];ctx.beginPath();for(let x=20;x<460;x++){const y=45+k*30+x*.045+Math.sin(x*.04+k)*4;x===20?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}ctx.fillStyle='#e6eddf';ctx.font='13px system-ui';ctx.fillText('SIMULATED RADAR / depth increases downward',18,22);}
 function weatherChart(){const c=$('#science-result'),ctx=c.getContext('2d');ctx.fillStyle='#122c30';ctx.fillRect(0,0,480,180);ctx.fillStyle='#e6eddf';ctx.font='13px system-ui';ctx.fillText('SIMULATED WEATHER',18,24);readings.forEach((r,i)=>{const x=30+i*150;ctx.fillStyle='#8fd5df';ctx.fillRect(x,145-r.wind*8,45,r.wind*8);ctx.fillStyle='#e6eddf';ctx.fillText(`${r.wind.toFixed(1)} m/s`,x,165);ctx.fillText(`${r.temp.toFixed(1)} °C`,x,50);});}
 function rebuildArt(){const vertices=[];for(let i=1;i<art.length;i++){const a=art[i-1],b=art[i];if(dist(a,b)>24)continue;for(const side of [-1,1]){const point=(p,w)=>{const d=side*3.8+w*.65,x=p.x+Math.cos(p.h)*d,y=p.y+Math.sin(p.h)*d;return [x,y,ground(x,y)+.16];};const q=[point(a,-1),point(a,1),point(b,-1),point(b,1)];triangle(vertices,q[0],q[1],q[2],[.26,.20,.16]);triangle(vertices,q[1],q[3],q[2],[.26,.20,.16]);}}
  if(api.gpu.artMesh)api.gpu.gl.deleteBuffer(api.gpu.artMesh.b);api.gpu.artMesh=vertices.length?api.gpu.upload(new Float32Array(vertices)):null;
 }
 function artMap(){const c=$('#art-map');c.hidden=active?.id!=='art'||!!photo;if(c.hidden)return;c.width=180;c.height=180;const ctx=c.getContext('2d');ctx.fillStyle='#b38d68';ctx.fillRect(0,0,180,180);ctx.strokeStyle='#3c3328';ctx.lineWidth=1.5;ctx.beginPath();let prev=null;for(const p of art){const x=90+(p.x-artSite.x)/artSize*90,y=90+(p.y-artSite.y)/artSize*90;if(prev&&dist(prev,p)<24)ctx.lineTo(x,y);else ctx.moveTo(x,y);prev=p;}ctx.stroke();ctx.fillStyle='#ecf6db';ctx.beginPath();ctx.arc(90+(api.state.x-artSite.x)/artSize*90,90+(api.state.y-artSite.y)/artSize*90,3,0,Math.PI*2);ctx.fill();}
 function markers(){if(!active)return [];if(active.id==='radar')return transects.map(p=>({...p,r:25,color:survey.has(p.id)?'#91be91':'#8fd5df'}));if(active.id==='target-jump')return [{...target,r:65,color:'#8fd5df'}];if(active.id==='art')return [{...artSite,r:artSize,color:'#efd6a2'}];return [];}
 function overlay(ctx,gpu){
  for(const p of markers()){ctx.strokeStyle=p.color;ctx.lineWidth=2;ctx.beginPath();let pen=false;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,x=p.x+Math.cos(a)*p.r,y=p.y+Math.sin(a)*p.r,q=gpu.project(x,y,ground(x,y)+.5);if(q.depth<4){pen=false;continue;}pen?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);pen=true;}ctx.stroke();}
 }
 function tick(dt,before){
  const s=api.state;
  if(!active&&!record.returnPoint&&advanceJourney(journey,record,before,s,dt)){guide();api.save();if(record.next===journey.checkpoints.length&&record.activities.length<REQUIRED_ACTIVITIES){openMenu();return;}}
  if(!active&&canFinish(journey,record,s)){record.status='finished';api.nav.target=null;api.save();api.openDialog('#journey-finish');$('#journey-finish-copy').textContent=`Recorded journey through sol ${journey.lastSol} retraced. ${record.activities.length} different activities completed. Your photographs and discoveries remain in your field records.`;return;}
  if(!active)return;seconds+=dt;
  if(active.id==='art'&&performance.now()>eraseUntil&&Math.abs(s.x-artSite.x)<artSize&&Math.abs(s.y-artSite.y)<artSize&&!s.air&&(!art.length||dist(s,art.at(-1))>3)&&seconds-lastPaint>.05){art.push({x:s.x,y:s.y,h:s.heading});art=art.slice(-1400);artProtected=true;lastPaint=seconds;if(seconds-lastMesh>.3){rebuildArt();lastMesh=seconds;}}
  if(active.id==='radar')guideStation();
  if(active.id==='atmosphere'){if(seconds<.1){api.storm.start({...s,z:ground(s.x,s.y)});}api.storm.age=Math.min(35,seconds);}
  if(active.id.includes('jump')){
   if(!armed&&s.y<api.area.jump.y+150&&s.y>api.area.jump.y&&Math.abs(s.x-api.area.jump.x)<55)armed=true;
   if(armed&&s.air&&!jump)jump={x:s.x,y:s.y,t:seconds,hit:false};
   if(jump&&s.impact)jump.hit=true;
   if(jump&&!s.air&&seconds-jump.t>.12){const length=dist(s,jump)/4,error=dist(s,target)/4,key=active.id+'-best';if(active.id==='long-jump'){results[key]=Math.max(Number(results[key])||0,length);complete(`Landing measured: ${length.toFixed(1)} m. Best ${results[key].toFixed(1)} m.${jump.hit?' Rock contact on landing.':''}`);}else{results[key]=Math.min(Number.isFinite(results[key])?results[key]:Infinity,error);complete(`Landing measured: ${error.toFixed(1)} m from target center. Closest ${results[key].toFixed(1)} m. ${error<=16.25?'Inside the landing zone.':'Outside the landing zone.'}${jump.hit?' Rock contact on landing.':''}`);}jump=null;}
  }
 }
 function update(){
  $('#journey-hud').hidden=record.status!=='active'||!!photo;$('#journey-hud').textContent=`EXPEDITION ${Math.floor((record.next-1)/(journey.checkpoints.length-1)*100)}% · ${record.activities.length}/${REQUIRED_ACTIVITIES}`;
  if(!active)return;let status=active.goal;
  if(active.id==='radar')status=survey.size===3?`Exposure search · signal ${Math.round(clamp(1-dist(api.state,sampleTarget)/400,0,1)*100)}% · ${dist(api.state,sampleTarget)<30?'Sample available when stopped':'Follow the strengthening signal'}`:`${survey.size}/3 profiles · ${Math.round(dist(api.state,transects.find(p=>!survey.has(p.id))??api.state)/4)} m to station`;
  if(active.id==='atmosphere')status=`${readings.length}/3 readings · ${readings.length&&seconds-readings.at(-1).t<5?'Instrument settling':'Ready when stopped'} · simulated`;
  if(active.id==='art')status=`${art.length>=30?'Drawing ready for a photograph':'Leave a trail in the clearing'} · ${artProtected?'Art protected':'Photographed'}`;
  if(active.id.includes('jump'))status=jump?'In flight':armed?'Launch ready':'Ridge run-up';
  $('#activity-status').textContent=status;artMap();
 }
 function raceComplete(){if(active?.id==='delta-trial'){results['delta-trial']={date:new Date().toISOString()};creditActivity(record,'delta-trial');api.save();}}
 rebuildArt();
 return {record,journey,sites,get active(){return active},get photo(){return photo},get protectsArt(){return artProtected},snapshot,openMenu,start,begin,stop,returnToRoute,tick,update,overlay,raceComplete,guide,complete,closeCamera,get art(){return art},lookout,transects,target,sampleTarget};
}

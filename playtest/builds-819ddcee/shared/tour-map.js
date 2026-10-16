import {viewBounds,zoomView} from '../jezero/map-view.js';
import {attachMapGestures} from '../jezero/map-gestures.js';
import {nearestTourPoint} from './guided-tour-run.js';
export function createTourMap({dialog,canvas,tour,area,getState,getRun,findSafe,onJump}){
 const world=area.bounds,view={x:(world.minX+world.width)/2,y:(world.minY+world.maxY)/2,zoom:1};
 let style='map',historical=true,selected=null,frame=null,cursor={x:.5,y:.5},generation=0,labels=[];
 const toolbar=document.createElement('div');toolbar.className='gt-map-tools';toolbar.innerHTML='<div><button id="gt-layer-map" aria-pressed="true">Map</button><button id="gt-layer-satellite" aria-pressed="false">Satellite</button><label><input id="gt-history" type="checkbox" checked> Real rover path</label></div><div><button id="gt-zoom-in" aria-label="Zoom in">+</button><button id="gt-zoom-out" aria-label="Zoom out">−</button><button id="gt-map-fit">Whole map</button><button id="gt-map-rover">Find me</button><label>Visit a stop <select id="gt-map-stops"><option value="">Choose a stop…</option></select></label></div>';
 const selection=document.createElement('div');selection.id='gt-map-selection';selection.innerHTML='<p id="gt-map-location" role="status">Tap a location, then choose Jump here. Drag to pan; pinch or scroll to zoom.</p><button id="gt-map-jump" disabled>Jump here</button>';
 const credit=document.createElement('small');credit.id='gt-map-credit';canvas.before(toolbar);canvas.after(selection,credit);canvas.tabIndex=0;canvas.setAttribute('aria-label','Interactive tour map. Arrow keys move the cursor; Enter selects a jump location.');
 toolbar.children[1].prepend(dialog.querySelector('#gt-map-focus'));
 const el=id=>dialog.querySelector('#'+id),images={};
 const toGame=(e,n)=>tour.site==='jezero'?{x:(e+1500)*3.2,y:(1500-n)*3.2}:{x:e*8/3,y:-n*8/3};
 const box=b=>{const a=toGame(b.eastMin,b.northMax),z=toGame(b.eastMax,b.northMin);return {x:a.x,y:a.y,w:z.x-a.x,h:z.y-a.y};};
 async function loadLayers(){
  const site=new URL('../'+tour.site+'/assets/',import.meta.url),response=await fetch(new URL('satellite.json',site));if(!response.ok)throw Error('Satellite registration unavailable');const meta=await response.json();
  const reliefBounds=tour.site==='jezero'?meta.bounds:(()=>{const [eastMin,eastMax,northMin,northMax]=area.info.context.bounds;return {eastMin,eastMax,northMin,northMax};})();
  for(const [name,file,bounds,caption]of [['map',tour.site==='jezero'?'jezero-relief.png':'relief.png',reliefBounds,'Map: measured orbital elevation relief · NASA / USGS'],['satellite',tour.site==='jezero'?'jezero-satellite.webp':'satellite.webp',meta.bounds,'Satellite: '+meta.credit]]){
   const image=new Image();images[name]={image,box:box(bounds),caption};image.src=new URL(file,site).href;try{await image.decode();}catch{images[name].failed=true;}draw();
  }
 }
 loadLayers().catch(()=>{images.satellite={failed:true};draw();});
 function changeStyle(next){style=next;el('gt-layer-map').setAttribute('aria-pressed',String(style==='map'));el('gt-layer-satellite').setAttribute('aria-pressed',String(style==='satellite'));draw();}
 el('gt-layer-map').onclick=()=>changeStyle('map');el('gt-layer-satellite').onclick=()=>changeStyle('satellite');el('gt-history').onchange=e=>{historical=e.target.checked;draw();};
 function zoom(factor){zoomView(world,view,factor);draw();}
 el('gt-zoom-in').onclick=()=>zoom(1.5);el('gt-zoom-out').onclick=()=>zoom(1/1.5);el('gt-map-fit').onclick=()=>zoom(1/view.zoom);el('gt-map-rover').onclick=()=>{const s=getState();view.x=s.x;view.y=s.y;view.zoom=Math.max(4,view.zoom);zoom(1);};
 for(const [i,p]of tour.checkpoints.entries()){const o=document.createElement('option');o.value=i;o.textContent=`${i+1}. ${p.name}`;el('gt-map-stops').append(o);}
 el('gt-map-stops').onchange=e=>{if(e.target.value==='')return;const p=tour.checkpoints[Number(e.target.value)];view.x=p.x;view.y=p.y;view.zoom=4;zoomView(world,view,1);choose(p);};
 function choose(p){const safe=findSafe(p);selected=safe?{requested:p,pose:safe,near:nearestTourPoint(tour,safe)}:null;el('gt-map-jump').disabled=!selected;
  el('gt-map-location').textContent=selected?`Jump to ${tour.checkpoints.find(q=>Math.hypot(q.x-safe.x,q.y-safe.y)<=q.triggerRadius)?.name??'this location'}${Math.hypot(safe.x-p.x,safe.y-p.y)>4?' · nearby safe ground':''}. Skipped stops stay unvisited.`:'No safe landing near this point. Choose flatter ground inside the map.';draw();
 }
 el('gt-map-jump').onclick=()=>{if(selected)onJump(selected.pose);};
 function target(x,y,w,h){if(!frame)return;const stop=labels.find(p=>Math.hypot(p.x-x,p.y-y)<13);const p=stop?tour.checkpoints[stop.index]:{x:frame.minX+(x-frame.x)/frame.scale,y:frame.minY+(y-frame.y)/frame.scale};choose(p);}
 attachMapGestures(canvas,{world,view,draw,target});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.2:1/1.2);},{passive:false});
 canvas.onkeydown=e=>{const delta={ArrowLeft:[-.025,0],ArrowRight:[.025,0],ArrowUp:[0,-.025],ArrowDown:[0,.025]}[e.key];if(delta){e.preventDefault();cursor.x=Math.max(0,Math.min(1,cursor.x+delta[0]));cursor.y=Math.max(0,Math.min(1,cursor.y+delta[1]));draw();}if(e.key==='Enter'){e.preventDefault();const r=canvas.getBoundingClientRect();target(cursor.x*r.width,cursor.y*r.height,r.width,r.height);}};
 function fitLeg(){const ps=tour.legs[getRun().leg].points,xs=ps.map(p=>p.x),ys=ps.map(p=>p.y);view.x=(Math.min(...xs)+Math.max(...xs))/2;view.y=(Math.min(...ys)+Math.max(...ys))/2;view.zoom=Math.max(1,Math.min(16,(world.width-world.minX)/(Math.max(...xs)-Math.min(...xs)+600),(world.maxY-world.minY)/(Math.max(...ys)-Math.min(...ys)+600)));zoom(1);}
 function draw(){if(!dialog.open)return;const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;const ratio=Math.min(devicePixelRatio,2);canvas.width=Math.round(r.width*ratio);canvas.height=Math.round(r.height*ratio);const ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);ctx.fillStyle='#1e2d27';ctx.fillRect(0,0,r.width,r.height);
  const bounds=viewBounds(world,view),scale=Math.min(r.width/(bounds.width-bounds.minX),r.height/(bounds.maxY-bounds.minY)),w=(bounds.width-bounds.minX)*scale,h=(bounds.maxY-bounds.minY)*scale,x=(r.width-w)/2,y=(r.height-h)/2;frame={...bounds,scale,x,y,w,h};const point=p=>({x:x+(p.x-bounds.minX)*scale,y:y+(p.y-bounds.minY)*scale});
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();const layer=images[style];if(layer?.image?.naturalWidth){const a=point(layer.box);ctx.drawImage(layer.image,a.x,a.y,layer.box.w*scale,layer.box.h*scale);ctx.fillStyle=style==='satellite'?'#14251d22':'#14251d44';ctx.fillRect(x,y,w,h);credit.textContent=layer.caption+' · Rover snapshot through sol '+tour.lastSol;}else{credit.textContent=layer?.failed?`${style==='satellite'?'Satellite imagery':'Relief map'} unavailable. Routes remain visible.`:'Loading map imagery…';}
  if(historical){const segments=area.segments??area.world.segments;for(const [color,width]of [['#f4d6a0',3.5],['#6b3f20',1.7]]){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();for(const segment of segments)segment.points.forEach((p,i)=>{const q=point(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();}}
  const run=getRun();for(let i=0;i<tour.legs.length;i++){ctx.strokeStyle=i===run.leg?'#ecfff3':'#69d6b0';ctx.lineWidth=i===run.leg?3:2;ctx.beginPath();tour.legs[i].points.forEach((p,j)=>{const q=point(p);j?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();}
  const occupied=[];labels=[];tour.checkpoints.forEach((p,i)=>{const q=point(p);let label={...q};for(let k=0;k<10&&occupied.some(a=>Math.hypot(a.x-label.x,a.y-label.y)<23);k++)label={x:q.x+(k%2?1:-1)*(18+Math.floor(k/2)*14),y:q.y+(k%3-1)*22};occupied.push(label);labels.push({...label,index:i});ctx.strokeStyle='#f2ffe9';ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(label.x,label.y);ctx.stroke();ctx.fillStyle=run.visitedStops?.includes(i)?'#84d7b1':'#1c3a2d';ctx.beginPath();ctx.arc(label.x,label.y,10,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='11px system-ui';ctx.fillText(i+1,label.x,label.y+4);});
  const s=getState(),p=point(s);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(s.heading);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(6,7);ctx.lineTo(0,3);ctx.lineTo(-6,7);ctx.closePath();ctx.fill();ctx.restore();
  if(selected){const p=point(selected.pose);ctx.strokeStyle='#ffda85';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,12,0,Math.PI*2);ctx.moveTo(p.x-17,p.y);ctx.lineTo(p.x+17,p.y);ctx.moveTo(p.x,p.y-17);ctx.lineTo(p.x,p.y+17);ctx.stroke();}
  ctx.restore();ctx.fillStyle='#fff';ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillText('N ↑',12,20);if(document.activeElement===canvas){ctx.strokeStyle='#fff';ctx.strokeRect(cursor.x*r.width-4,cursor.y*r.height-4,8,8);}generation++;
 }
 return {draw,fitLeg,view,choose,get frame(){return frame;},get labels(){return labels;},get selected(){return selected;},get style(){return style;},get historical(){return historical;},get imagery(){return images;},get generation(){return generation;}};
}

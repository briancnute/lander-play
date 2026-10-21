// An authored arcade transect on the SAME coordinates/elevation sampler as Jezero.
// Mapped Ancient Jezero drainage anchors define this arcade route, not a historical Ingenuity flight.
import {measured,atDistance} from './rally-route.js';
export function buildJezeroFlightCourse(tour,ground){
 // Anchors pinned to Ancient Jezero water-survey.json, North rim tributary samples
 // 0 and 200. Use the same dry ground here; the water remains in Ancient Jezero.
 const start={id:'neretva-tributary',name:'Neretva tributary head',x:-18240,y:-7488},finish={id:'neretva-tributary-outlet',name:'Neretva tributary outlet',x:-14400,y:-1728},points=measured([start,finish]),length=points.at(-1).s;
 // Build momentum through consecutive left/right drifts, then a near-straight beat.
 const offsets=[-60,-210,-330,-100,160,290,80,60,-130,-270],heights=[140,230,155,255,165,235,145,250,165,320];
 const pods=offsets.map((side,id)=>{const s=length*(id+1)/(offsets.length+1),p=atDistance(points,s),x=p.x+Math.cos(p.heading)*side,y=p.y+Math.sin(p.heading)*side;return {id,s,x,y,z:ground(x,y)+heights[id],collected:false,passed:false};});
 const padZ=Math.max(...[[0,0],[-110,0],[110,0],[0,-110],[0,110],[-80,-80],[-80,80],[80,-80],[80,80]].map(([x,y])=>ground(finish.x+x,finish.y+y)))+3;
 return {padZ,id:'neretva-reaction-v3',name:'Neretva tributary descent',kind:'flight',start:{...start,heading:atDistance(points,0).heading},finish,points,length,pods,gates:[],mapBounds:{...tour.bounds},context:tour.checkpoints.map(p=>({x:p.x,y:p.y})),waterLineage:{asset:'water-survey.json',channel:'North rim',startSample:0,finishSample:200},excluded:['landing','rim','beyond-rim','frontier']};
}
export function mountFlightRouteMap(course){
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),b=course.mapBounds,w=b.width-b.minX,h=b.maxY-b.minY,pad=Math.max(w,h)*.06;
 svg.id='helicopter-course-map';svg.setAttribute('viewBox',`${b.minX-pad} ${b.minY-pad} ${w+pad*2} ${h+pad*2}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','Jezero map: short Neretva drainage flight; future targets are hidden');
 const element=(name,attrs)=>{const e=document.createElementNS(ns,name);for(const [key,value]of Object.entries(attrs))e.setAttribute(key,String(value));svg.append(e);return e;};
 element('rect',{x:b.minX,y:b.minY,width:w,height:h,fill:'#203c35',stroke:'#6b8c7c','stroke-width':100});
 element('path',{d:`M ${course.context.map(p=>`${p.x} ${p.y}`).join(' L ')}`,stroke:'#66786b','stroke-width':200,fill:'none'});
 element('path',{d:`M ${course.points.map(p=>`${p.x} ${p.y}`).join(' L ')}`,stroke:'#76e5d9','stroke-width':450,fill:'none'});

 for(const [p,label] of [[course.start,'TRIBUTARY HEAD'],[course.finish,'DRAINAGE']]){element('circle',{cx:p.x,cy:p.y,r:500,fill:'#bfe7cc'});element('text',{x:p.x,y:p.y+1800,fill:'#eff5df','font-size':1400,'text-anchor':'middle'}).textContent=label;}
 element('text',{x:b.minX+w*.25,y:b.minY+h*.79,fill:'#a3b8ac','font-size':1300,'text-anchor':'middle'}).textContent='WESTERN RIM / FRONTIER';
 element('text',{x:b.minX+w*.25,y:b.minY+h*.86,fill:'#a3b8ac','font-size':1100,'text-anchor':'middle'}).textContent='OUTSIDE THIS FLIGHT';
 return svg;
}

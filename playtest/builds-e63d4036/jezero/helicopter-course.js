// An authored arcade transect on the SAME coordinates/elevation sampler as Jezero.
// These regional tour anchors define the endpoints, not Ingenuity's historical route.
import {measured,atDistance} from './rally-route.js';
export function buildJezeroFlightCourse(tour,ground){
 const anchor=id=>{const p=tour.checkpoints.find(p=>p.id===id);if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y))throw Error('Missing Jezero flight anchor: '+id);return {...p};};
 const start=anchor('landing'),finish=anchor('neretva'),points=measured([start,finish]),length=points.at(-1).s;
 const offsets=[-110,135,-170,80,165,-125,40,-160,150,-60,170,-145,85,-110,140,0],heights=[140,220,155,290,185,135,265,175,310,160,240,130,285,175,235,115];
 const pods=offsets.map((side,id)=>{const s=length*(id+1)/(offsets.length+1),p=atDistance(points,s),x=p.x+Math.cos(p.heading)*side,y=p.y+Math.sin(p.heading)*side;return {id,s,x,y,z:ground(x,y)+heights[id],collected:false,passed:false};});
 return {id:'jezero-flight-transect-v1',name:'Landing region → Neretva',kind:'flight',start:{...start,heading:atDistance(points,0).heading},finish,points,length,pods,gates:[],mapBounds:{...tour.bounds},context:tour.checkpoints.map(p=>({x:p.x,y:p.y})),excluded:['bright-angel','rim','beyond-rim','frontier']};
}
export function mountFlightRouteMap(course){
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),b=course.mapBounds,w=b.width-b.minX,h=b.maxY-b.minY,pad=Math.max(w,h)*.06;
 svg.id='helicopter-course-map';svg.setAttribute('viewBox',`${b.minX-pad} ${b.minY-pad} ${w+pad*2} ${h+pad*2}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','Jezero map: flight from landing region to Neretva; western rim and frontier outside this course');
 const element=(name,attrs)=>{const e=document.createElementNS(ns,name);for(const [key,value]of Object.entries(attrs))e.setAttribute(key,String(value));svg.append(e);return e;};
 element('rect',{x:b.minX,y:b.minY,width:w,height:h,fill:'#203c35',stroke:'#6b8c7c','stroke-width':100});
 element('path',{d:`M ${course.context.map(p=>`${p.x} ${p.y}`).join(' L ')}`,stroke:'#66786b','stroke-width':200,fill:'none'});
 element('path',{d:`M ${course.points.map(p=>`${p.x} ${p.y}`).join(' L ')}`,stroke:'#76e5d9','stroke-width':450,fill:'none'});
 for(const p of course.pods)element('circle',{cx:p.x,cy:p.y,r:190,fill:'#efc779'});
 for(const [p,label] of [[course.start,'LANDING REGION'],[course.finish,'NERETVA']]){element('circle',{cx:p.x,cy:p.y,r:500,fill:'#bfe7cc'});element('text',{x:p.x,y:p.y+1800,fill:'#eff5df','font-size':1400,'text-anchor':'middle'}).textContent=label;}
 element('text',{x:b.minX+w*.25,y:b.minY+h*.79,fill:'#a3b8ac','font-size':1300,'text-anchor':'middle'}).textContent='WESTERN RIM / FRONTIER';
 element('text',{x:b.minX+w*.25,y:b.minY+h*.86,fill:'#a3b8ac','font-size':1100,'text-anchor':'middle'}).textContent='OUTSIDE THIS FLIGHT';
 return svg;
}

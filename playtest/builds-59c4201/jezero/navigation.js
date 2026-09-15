import {toGame} from './terrain.js';
export const mapBounds={minX:0,minY:0,width:12000,maxY:12000};
export const geology=[{...toGame(-430,200),name:'Western delta'},{...toGame(-100,-500),name:'Delta front'},{...toGame(850,-700),name:'Crater floor'}];
export const raceSite={id:'delta-trial',name:'Delta time trial',...toGame(600,-400),radius:70,dwell:3,kind:'activity'};
export function sitesFor(area,landmarks){return [...area.samples.map((p,i)=>({...p,id:'discovery-'+i,kind:'discovery'})),...landmarks.map(p=>({...p,kind:'landmark'})),raceSite];}
export function mapTarget(x,y,sites,enabled,w,h){
 const px=x/w*12000,py=y/h*12000;
 const nearby=enabled?sites.map(p=>({p,d:Math.hypot((p.x-px)/12000*w,(p.y-py)/12000*h)})).filter(q=>q.d<=22).sort((a,b)=>a.d-b.d)[0]?.p:null;
 return nearby?{id:nearby.id,x:nearby.x,y:nearby.y,name:nearby.name}:{x:Math.max(0,Math.min(12000,px)),y:Math.max(0,Math.min(12000,py)),name:'Map target'};
}
export function outsideDriving(p,b){return p.x<b.minX||p.x>b.width||p.y<b.minY||p.y>b.maxY;}
// Leaving the zone resets all loading progress. Paused time is never supplied.
export function advanceEntry(previous,s,dt){return s.mode==='free'&&!s.air&&!s.turnaround&&Math.hypot(s.x-raceSite.x,s.y-raceSite.y)<raceSite.radius?Math.min(raceSite.dwell,previous+dt):0;}

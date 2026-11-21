// Visit progress belongs to the reading, never to crossing a line or teleporting.
export const VISITS_KEY='astra.gale.siteVisits.v1';
export const SITE_RADIUS=44;
export function restoreVisits(stops,saved,legacy){
 const ids=new Set(stops.map(p=>p.id));
 const legacyIndices=Array.isArray(legacy?.visitedStops)?legacy.visitedStops:legacy?.version===1&&Number.isInteger(legacy.visited)&&legacy.visited>=0&&legacy.visited<=stops.length?Array.from({length:legacy.visited},(_,i)=>i):[];
 const visited=Array.isArray(saved?.visited)?saved.visited.filter(id=>ids.has(id)):
  legacyIndices.filter(i=>Number.isInteger(i)&&stops[i]).map(i=>stops[i].id);
 const unique=[...new Set(visited)];
 return {version:1,visited:unique,hideCircles:unique.length===stops.length&&saved?.hideCircles===true,position:saved?.position??legacy?.pose??null};
}
export function createSiteVisits(stops,saved,legacy){
 const data=restoreVisits(stops,saved,legacy);let suppressed=null,active=null;
 const next=()=>stops.find(p=>!data.visited.includes(p.id))??null;
 const available=p=>p===next()||data.visited.includes(p.id);
 return {data,next,get active(){return active;},get complete(){return data.visited.length===stops.length;},available,
  arrive(state){
   if(active||data.hideCircles)return null;
   if(suppressed&&Math.hypot(state.x-suppressed.x,state.y-suppressed.y)>SITE_RADIUS+14)suppressed=null;
   if(state.air||Math.abs(state.roverSpeedMps??state.v/(8/3))>=.12)return null;
   active=stops.find(p=>p!==suppressed&&available(p)&&Math.hypot(state.x-p.x,state.y-p.y)<=SITE_RADIUS)??null;
   return active;
  },
  finish(){if(!active)return false;const wasComplete=data.visited.length===stops.length;if(!data.visited.includes(active.id))data.visited.push(active.id);suppressed=active;active=null;return !wasComplete&&data.visited.length===stops.length;},
  canTravel(p){return data.visited.includes(p.id);},
 };
}
export function outsideSite(site,heading=site.heading??0){return {x:site.x-Math.sin(heading)*(SITE_RADIUS+46),y:site.y+Math.cos(heading)*(SITE_RADIUS+46),heading};}

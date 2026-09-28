import {box} from '../mars-renderer/geometry.js';
import {toGame} from './terrain.js';
export async function helicopterSites(ground){
 const r=await fetch(new URL('./assets/helicopter-route.json',import.meta.url));if(!r.ok)throw Error('Helicopter route unavailable');const data=await r.json();
 const endpoints=[data.flights[0].points[0],data.flights.at(-1).points.at(-1)].map(p=>toGame(...p)),vertices=[];
 for(const p of endpoints){const x=p.x,y=p.y,z=ground(x,y),metal=[.18,.23,.23];box(vertices,x-2,y-1.5,z+2,4,3,2.5,[.76,.62,.37]);box(vertices,x-.18,y-.18,z+4,.36,.36,5,metal);box(vertices,x-3,y-2,z+9,6,4,.2,[.12,.23,.28]);box(vertices,x-8,y-.25,z+7,16,.5,.16,metal);box(vertices,x-.25,y-8,z+6.5,.5,16,.16,metal);for(const dx of [-3,3])for(const dy of [-2,2])box(vertices,x+dx,y+dy,z,.22,.22,3,metal);}
 return {endpoints,vertices:new Float32Array(vertices)};
}

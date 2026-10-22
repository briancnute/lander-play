import {smoothFlightPath,flightFrame} from './helicopter-path.js';
import {flightTargetPlan} from './helicopter-engagement.js';
export function flightReference(course,s){
 const points=course?.altitudeProfile;if(!points?.length)return 0;
 const end=points.findIndex(p=>p.s>=s);if(end<=0)return end===0?points[0].z:points.at(-1).z;
 const a=points[end-1],b=points[end];return a.z+(b.z-a.z)*Math.max(0,Math.min(1,(s-a.s)/(b.s-a.s)));
}
export function flightCeiling(course,s){return course?.altitudeProfile?flightReference(course,s)+(course.altitudeRange??360):course?.ceilingZ??Infinity;}
// Authored arcade paths on the existing measured terrain, not historical Ingenuity flights.
import {measured,atDistance} from './rally-route.js';
export const JEZERO_FLIGHT_ROUTES=[
 {id:'canyon-run',name:'Neretva Canyon Run',description:'Quick reactions and longer drifts inside the main Neretva channel, landing on its lower floor.',start:{x:-21000,y:-2500},finish:{x:-13000,y:-1680},curved:true,path:[{x:-19600,y:-2150},{x:-18100,y:-1800},{x:-16900,y:-1500},{x:-15400,y:-1700},{x:-14200,y:-1820}],halfWidth:340,altitudeRange:180,launchHeight:85,targetClearance:65,targetMinHeight:55,targetTopMargin:35,stormDistance:800,source:'Main Neretva valley cross-sections in the USGS terrain; replaces the north-rim tributary flight.'},
 {id:'kodiak-approach',name:'Kodiak Approach',description:'Fly over the original landing site, with the delta ahead, then pass Kodiak’s layered flank.',start:{x:16996.540,y:7220.360},finish:{x:2739.516,y:9699.326},halfWidth:500,altitudeRange:280,stormDistance:1200,landmark:{id:'kodiak',x:5427.2,y:8832},source:'Existing pinned Kodiak landmark and Three Forks terrain.'},
 {id:'western-frontier',name:'Western Frontier',description:'Build a musical capture streak as you cross into a remote crater.',start:{x:-24599.466,y:11153.897},finish:{x:-31400,y:4500},halfWidth:600,altitudeRange:300,stormDistance:1500,roverSnapshot:{sol:2009,accessed:'2026-10-22',x:-26168.327637,y:9618.864094},source:'USGS measured upper-left crater from the producer reference, northwest of NASA’s sol-2009 rover waypoint. The small crater has no verified name.'}
];
export function buildJezeroFlightCourse(tour,ground,id='canyon-run'){
 const route=JEZERO_FLIGHT_ROUTES.find(r=>r.id===id)??JEZERO_FLIGHT_ROUTES[0],start={...route.start,name:route.name+' · start'},finish={...route.finish,name:route.name+' · landing'},points=route.curved?smoothFlightPath([start,...route.path,finish]):measured([start,finish]),geometry={...route,points},length=points.at(-1).s;
 const pods=flightTargetPlan(route,length).map((plan,id)=>({...plan,id,spawned:false,resolved:false,collected:false,passed:false}));
 const altitudeProfile=Array.from({length:81},(_,i)=>{const s=(length-260)*i/80,p=flightFrame(geometry,s);return {s,z:Math.max(...[-1,-.5,0,.5,1].map(side=>ground(p.x+Math.cos(p.heading)*side*route.halfWidth,p.y+Math.sin(p.heading)*side*route.halfWidth)))};});
 const ceilingZ=Math.max(...altitudeProfile.map(p=>p.z))+route.altitudeRange;
 const padZ=Math.max(...[[0,0],[-110,0],[110,0],[0,-110],[0,110],[-80,-80],[-80,80],[80,-80],[80,80]].map(([x,y])=>ground(finish.x+x,finish.y+y)))+3;
 const finishS=length-260,finishLine={...flightFrame(geometry,finishS),z:padZ+130};
 return {...route,padZ,ceilingZ,altitudeProfile,finishS,finishLine,reactionTargets:true,start:{...start,heading:flightFrame(geometry,0).heading},finish,points,length,pods,gates:[],mapBounds:{minX:Math.min(start.x,finish.x)-1800,width:Math.max(start.x,finish.x)+1800,minY:Math.min(start.y,finish.y)-1800,maxY:Math.max(start.y,finish.y)+1800},context:tour.checkpoints.map(p=>({x:p.x,y:p.y})),kind:'flight'};
}
export {mountFlightOverview as mountFlightRouteMap} from './helicopter-map.js';

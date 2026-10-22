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
 {id:'canyon-run',name:'Neretva Canyon Run',description:'Quick reactions and longer drifts through the main Neretva channel and out toward its widening mouth.',start:{x:-18400,y:-2140},finish:{x:-8400,y:-1100},halfWidth:340,altitudeRange:180,launchHeight:85,targetClearance:65,targetMinHeight:55,targetTopMargin:35,stormDistance:800,source:'Main Neretva valley cross-sections in the USGS terrain; replaces the north-rim tributary flight.'},
 {id:'kodiak-approach',name:'Kodiak Approach',description:'Cross Three Forks, enjoy a clear Kodiak reveal, then pass its layered flank.',start:{x:11200,y:11600},finish:{x:3800,y:6400},halfWidth:500,altitudeRange:280,stormDistance:1200,landmark:{id:'kodiak',x:5427.2,y:8832},source:'Existing pinned Kodiak landmark and Three Forks terrain.'},
 {id:'western-frontier',name:'Western Frontier',description:'Build a musical capture streak as you cross into a remote crater.',start:{x:-27000,y:8500},finish:{x:-31400,y:4500},halfWidth:600,altitudeRange:300,stormDistance:1500,roverSnapshot:{sol:1980,accessed:'2026-09-20',x:-26316.026,y:9376.183},source:'USGS measured bowl northwest of the recorded sol-1980 traverse endpoint. The small crater has no verified name.'}
];
export function buildJezeroFlightCourse(tour,ground,id='canyon-run'){
 const route=JEZERO_FLIGHT_ROUTES.find(r=>r.id===id)??JEZERO_FLIGHT_ROUTES[0],start={...route.start,name:route.name+' · start'},finish={...route.finish,name:route.name+' · landing'},points=measured([start,finish]),length=points.at(-1).s;
 const pods=flightTargetPlan(route,length).map((plan,id)=>({...plan,id,spawned:false,resolved:false,collected:false,passed:false}));
 const altitudeProfile=Array.from({length:81},(_,i)=>{const s=(length-260)*i/80,p=atDistance(points,s);return {s,z:Math.max(...[-1,-.5,0,.5,1].map(side=>ground(p.x+Math.cos(p.heading)*side*route.halfWidth,p.y+Math.sin(p.heading)*side*route.halfWidth)))};});
 const ceilingZ=Math.max(...altitudeProfile.map(p=>p.z))+route.altitudeRange;
 const padZ=Math.max(...[[0,0],[-110,0],[110,0],[0,-110],[0,110],[-80,-80],[-80,80],[80,-80],[80,80]].map(([x,y])=>ground(finish.x+x,finish.y+y)))+3;
 const finishS=length-260,finishLine={...atDistance(points,finishS),z:padZ+130};
 return {...route,padZ,ceilingZ,altitudeProfile,finishS,finishLine,reactionTargets:true,start:{...start,heading:atDistance(points,0).heading},finish,points,length,pods,gates:[],mapBounds:{minX:Math.min(start.x,finish.x)-1800,width:Math.max(start.x,finish.x)+1800,minY:Math.min(start.y,finish.y)-1800,maxY:Math.max(start.y,finish.y)+1800},context:tour.checkpoints.map(p=>({x:p.x,y:p.y})),kind:'flight'};
}
export {mountFlightOverview as mountFlightRouteMap} from './helicopter-map.js';

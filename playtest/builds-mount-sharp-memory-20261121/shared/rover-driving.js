import {driveStep} from '../mars-renderer/driving.js';
import {createTourSteering} from './tour-steering.js';
import {createRoverPhysics} from './rover-physics.js';

import {ROVER_PROFILES} from './rover-profiles.js';
export {ROVER_PROFILES} from './rover-profiles.js';
export function roverTune(tune,profile,target=profile.speed,boosted=false){
 return {...tune,speed:target,boostSpeed:target,acceleration:boosted?profile.boostAcceleration:profile.acceleration,handling:profile.handling,cloneDrive:false};
}
export function roverDriveArea(area){
 return {...area.driveArea,rocks:area.rocks,pickups:[],samples:[],keepExploring:true,boundaryAt:()=>({edge:1000}),cruise:false,arcadeHandling:false,driftHandling:false,roverHandling:true,airBrake:true,airControl:true,speedMultiplier:()=>1};
}
export function readRoverSteering(storage){
 try{return createTourSteering(JSON.parse(storage.getItem('astra.mars.tourSteering.v1'))??{});}catch{return createTourSteering();}
}
// Native Mars rendering uses site-specific world units. Physics always uses SI.
// Rotate both map axes so Moon screen-right also means Mars screen-right.
export function createRoverExploration(area,steering=createTourSteering()){
 const H=area.roverUnits?.horizontal??4,V=area.roverUnits?.vertical??4;
 const physics=createRoverPhysics({gravity:3.71}),c=physics.LRV_TUNING;
 let state=physics.newLRVDriving(),pose=null,lastState=null,lastSpeed=0,brakeWasDown=false,reverse=false;
 const bounds=area.bounds??area.driveArea?.bounds;
 const surface={height:(x,z)=>area.ground(-x*H,-z*H)/V,solids:[]};
 // Query a swept neighbourhood, rather than every rock on a kilometre-scale map.
 const cell=100*H,buckets=new Map();let largestRock=0;
 for(const rock of area.rocks??[]){const [x,y,r]=rock,key=Math.floor(x/cell)+','+Math.floor(y/cell);largestRock=Math.max(largestRock,r);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}
 function nearby(s,dt){
  const radius=(Math.max(c.rocketMps,Math.abs(s.v)/H)*Math.min(dt,.25)+4)*H+largestRock,found=[];
  for(let y=Math.floor((s.y-radius)/cell);y<=Math.floor((s.y+radius)/cell);y++)for(let x=Math.floor((s.x-radius)/cell);x<=Math.floor((s.x+radius)/cell);x++)found.push(...buckets.get(x+','+y)??[]);
  return found;
 }

 function reset(){physics.resetLRVDriving(state);steering.reset();brakeWasDown=false;reverse=false;}
 function bind(s){
  if(s!==lastState){lastState=s;const energy=state.boostEnergy;state=physics.newLRVDriving();state.boostEnergy=energy;reset();pose=null;}
  if(!pose)pose={x:0,y:0,z:0,vx:0,vy:0,vz:0,heading:0,grounded:true,spin:0,steer:0,airTurn:0,downThrust:false,lastHit:null};
  if(!state.initialized||s.v!==lastSpeed){pose.vx=-Math.sin(s.heading)*s.v/H;pose.vz=Math.cos(s.heading)*s.v/H;}
  Object.assign(pose,{x:-s.x/H,z:-s.y/H,y:s.z/V+c.rideHeightM,vy:(s.vz??0)/V,heading:-s.heading,grounded:!s.air});
 }
 function controls(input,s){
  const brake=!!(input.brake||input.special||input.reverse),gas=!!input.drive;
  const direction=!!input.both||!!input.steer;
  if(!brake||gas||s.air)reverse=false;
  if(brake&&!brakeWasDown)reverse=!s.air&&!gas&&Math.abs(s.v)/H<=.08;
  brakeWasDown=brake;
  return {gas,reverse,brake:brake&&!reverse&&(!s.air||!direction),steer:input.steer??0,rawBrake:brake,
   airBrakeEligible:!s.air?false:!direction&&!reverse,trickIntent:s.air&&brake&&direction};
 }
 // Keep the existing convex rock footprints, including gaps beside their corners.
 const structures=(area.parts??[]).filter(p=>p.poly?.length).map((p,i)=>{
  const xs=p.poly.map(v=>v[0]),ys=p.poly.map(v=>v[1]),west=Math.min(...xs),east=Math.max(...xs),south=Math.min(...ys),north=Math.max(...ys);
  const x=(west+east)/2,y=(south+north)/2,base=area.ground(x,y),roof=p.roof??base+8;
  return {id:'structure-'+i,polygon:p.poly.map(([x,y])=>({x:-x/H,z:-y/H})),x:-x/H,z:-y/H,hx:(east-west)/(2*H),hz:(north-south)/(2*H),y:(base+roof)/(2*V),hy:Math.max(0,roof-base)/(2*V)};
 });
 const controller={steering,physics,get driving(){return state;},get pose(){return pose;},
  get parked(){return state.parked;},get speedMps(){return pose?Math.hypot(pose.vx,pose.vz):0;},reset,
  capture(s,input,time){bind(s);const routed=controls(input,s);physics.queueLRVInput(state,{...routed,time,grounded:!s.air});},
  step(s,input,dt,travel={}){
   if(!Number.isFinite(dt)||dt<=0)return;
   bind(s);const routed=controls(input,s);
   surface.solids=nearby(s,dt).map(([x,y,r],i)=>({id:'rock-'+i,x:-x/H,z:-y/H,hx:r/H,hz:r/H,y:(area.ground(x,y)+r)/V,hy:r/V}));
   surface.solids.push(...structures);
   surface.rocketTravel=bounds?{bounds:{west:-bounds.width/H,east:-bounds.minX/H,south:bounds.minY/H,north:bounds.maxY/H},
    ...(travel.target?{target:{x:-travel.target.x/H,z:-travel.target.y/H}}:{})}:undefined;
   physics.stepLRVDriving(state,pose,routed,dt,surface);
   Object.assign(s,{x:-pose.x*H,y:-pose.z*H,z:(pose.y-c.rideHeightM)*V,heading:-pose.heading,
    v:state.speedMps*H,vz:pose.vy*V,air:!pose.grounded,t:(s.t??0)+Math.min(dt,.25),
    visualSteer:-state.steeringAngle/c.steeringRadians,visualBrake:routed.brake&&pose.grounded,
    thrust:state.rocketThrust,downThrust:pose.downThrust,boost:state.boostRemaining,
    slip:0,driftVX:null,driftVY:null,roverSpeedMps:Math.hypot(pose.vx,pose.vz),roverPhysics:true,roverGroundClearance:Math.max(0,(pose.y-c.rideHeightM)*V-area.ground(-pose.x*H,-pose.z*H))});
   s.tune={...s.tune,boostKit:true,cloneDrive:false};
   if(bounds){
    const x=Math.max(bounds.minX+2*H,Math.min(bounds.width-2*H,s.x)),y=Math.max(bounds.minY+2*H,Math.min(bounds.maxY-2*H,s.y));
    s.boundary=x!==s.x||y!==s.y;
    if(s.boundary){Object.assign(s,{x,y,v:0,roverSpeedMps:0});pose.vx=pose.vz=0;reset();}
   }
   lastSpeed=s.v;
  }
 };
 // The existing meter can read this facade, but the shared engine owns all
 // gesture timing, energy, duration and cutoffs. It never gets a second turbo.
 controller.boost={driving:controller,get energy(){return state.boostEnergy;},get active(){return state.boostRemaining;},
  get exhausted(){return state.boostEnergy<1e-9;},get rocket(){return state.rocketAvailable;},
  get multiplier(){return state.rocketBoost?c.rocketMps/c.speedMps:state.boostLevel===2?c.doubleBoostMultiplier:state.boostLevel?c.boostMultiplier:1;},
  cancel:reset,reset,step(){},get status(){return physics.lrvTurboStatus(state);}};
 return controller;
}

// Archived ancient-lake outings retain their original speed and energy contract.
export function createLegacyRoverExploration(area,steering=createTourSteering()){
 let parked=true,lastState=null;
 return {steering,get parked(){return parked;},reset(moving=false){parked=!moving;steering.reset();},step(s,input,dt,boost=null){
  if(lastState!==s){lastState=s;parked=!s.air&&Math.abs(s.v)<.08;steering.reset();}
  const brake=!!(input.brake||input.special||input.reverse),gas=!!input.drive||!!boost?.active,before={x:s.x,y:s.y};
  s.tune={...roverTune(s.tune,ROVER_PROFILES.roam,(area.roamSpeedLimit??ROVER_PROFILES.roam.speed)*(boost?.multiplier??1),!!boost?.active),airBrake:180,airYaw:.3};
  if(gas)parked=false;
  driveStep(s,{drive:gas,brake,brakeOnly:true,steer:steering.step(input.steer,dt)},dt,area.course,{...roverDriveArea(area),rocks:area.localRocks?.(s.x,s.y)??area.rocks});
  if(area.roamSpeedLimit){const limit=area.roamSpeedLimit*(boost?.multiplier??1),dx=s.x-before.x,dy=s.y-before.y,d=Math.hypot(dx,dy),k=d>limit*dt?limit*dt/d:1;s.x=before.x+dx*k;s.y=before.y+dy*k;s.v=Math.max(-limit,Math.min(limit,s.v));if(s.driftVX!=null){s.driftVX*=k;s.driftVY*=k;}if(!s.air)s.z=area.ground(s.x,s.y);}
  if(parked&&!gas)Object.assign(s,before,{v:0,vz:0,air:false,z:area.ground(before.x,before.y)});
  else if(!s.air&&brake&&Math.abs(s.v)<2){parked=true;s.v=s.vz=0;}
 }};
}

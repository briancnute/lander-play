import {driveStep} from '../mars-renderer/driving.js';
import {createTourSteering} from './tour-steering.js';

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
// One exploration controller for direct launches and continuing from either tour.
// Activity-owned energy turbo supplies the common speed target and acceleration.
export function createRoverExploration(area,steering=createTourSteering()){
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

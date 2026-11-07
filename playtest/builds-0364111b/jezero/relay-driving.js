import {ROVER_PROFILES,roverDriveArea} from '../shared/rover-driving.js';
import {EXTREME_PACE} from './extreme-course.js';
export const RELAY_BRAKING=320,RELAY_CORNER_DRAG=.025;
// Relay propulsion is independent of the expedition's route pace and terrain.
export function relayTargetSpeed(leg,projection,velocity,boost,steer=0){
 const base=ROVER_PROFILES.relay.speed*EXTREME_PACE;
 return boost.active?base*boost.multiplier:base*(1-RELAY_CORNER_DRAG*Math.min(1,Math.abs(steer)));
}
export function relayDriveArea(area,boost){
 return {...roverDriveArea(area),ignoreSlope:true,brakeDeceleration:RELAY_BRAKING,poweredTurbo:!!boost.active,turboSurfaceSpeed:1};
}

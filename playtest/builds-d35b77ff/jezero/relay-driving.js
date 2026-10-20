import {ROVER_PROFILES,roverDriveArea} from '../shared/rover-driving.js';
import {tourTargetSpeed} from '../shared/tour-pace.js';
import {EXTREME_PACE} from './extreme-course.js';
// The driver owns the racing line during turbo; tour curvature must not throttle it.
export function relayTargetSpeed(leg,projection,velocity,boost){
 if(boost.active)return ROVER_PROFILES.relay.speed*EXTREME_PACE*boost.multiplier;
 return leg?tourTargetSpeed({...leg,length:Infinity},projection,velocity)*EXTREME_PACE:projection.speed*3;
}
export function relayDriveArea(area,boost){
 return {...roverDriveArea(area),poweredTurbo:!!boost.active,turboSurfaceSpeed:1};
}

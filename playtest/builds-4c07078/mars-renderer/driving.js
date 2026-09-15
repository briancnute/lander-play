import {easeBoostExit} from './kits.js';
const {update}=await import(/* @vite-ignore */ new URL('../../../extras/expedition/sim.mjs',import.meta.url).href);
import {ground} from './ground.js';
import {prepareContact} from './contact-feel.js';
import {CONTACT_RADIUS} from './contact-size.js';
// Driver input still animates steering while airborne, but cannot redirect the flight.
export function driveStep(s,input,dt,course,area=null){
 const surface=area?.ground??ground;
 const previous={v:s.v,air:s.air,vz:s.vz};s.landingCompression=(s.landingCompression||0)*Math.exp(-dt*7);s.visualBrake=!!input.brake&&!s.air&&s.v>.5;
 s.visualSteer=Math.max(-1,Math.min(1,input.steer||0));
 prepareContact(s,surface);
 update(s,s.air&&!area?.boostKit?{drive:false,brake:false,steer:area?.airControl?input.steer:0}:input,dt,course,CONTACT_RADIUS,surface,!!area?.airControl,area);
 easeBoostExit(s,previous,dt,input);
 if(previous.air&&!s.air)s.landingCompression=Math.min(.55,Math.max(.12,-previous.vz*.02));
}

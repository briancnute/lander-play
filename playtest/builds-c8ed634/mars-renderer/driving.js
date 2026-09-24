import {easeBoostExit} from './kits.js';
import {update} from './simulation.js';
import {ground} from './ground.js';
import {prepareContact} from './contact-feel.js';
import {CONTACT_RADIUS} from './contact-size.js';
import {cruiseFactor} from './cruise.js';
// Air steering and braking are explicit area options; airborne Drive never adds thrust.
export function driveStep(s,input,dt,course,area=null){
 const originalTune=s.tune;
 if(area?.cruise&&originalTune&&!originalTune.cloneDrive){const factor=cruiseFactor(s,input,dt);s.tune={...originalTune,speed:originalTune.speed*factor,boostSpeed:originalTune.boostSpeed*factor};}
 const surface=area?.ground??ground;
 const previous={v:s.v,air:s.air,vz:s.vz};s.landingCompression=(s.landingCompression||0)*Math.exp(-dt*7);s.visualBrake=!!input.brake&&!s.air&&s.v>.5;
 s.visualSteer=Math.max(-1,Math.min(1,input.steer||0));
 prepareContact(s,surface);
 update(s,s.air?{drive:false,brake:!!area?.airBrake&&input.brake,steer:area?.airControl?input.steer:0}:input,dt,course,CONTACT_RADIUS,surface,!!area?.airControl,area);
 easeBoostExit(s,previous,dt,input);
 if(previous.air&&!s.air)s.landingCompression=Math.min(.55,Math.max(.12,-previous.vz*.02));
 s.tune=originalTune;
}

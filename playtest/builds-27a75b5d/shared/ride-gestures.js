// Thrust owns ground hops, airborne turns and a double-tap slam.
export const DOUBLE_TAP=.32,DIRECTION_WINDOW=1,AIR_TURN_RATE=.65;
export const newAirControl=()=>({mode:'idle',held:false,brakeHeld:false,yaw:0,lastGas:-99,lastBrake:-99,lastDirection:-99,grounded:null,hops:0,dives:0,flash:0,slamming:false});
export function airInput(a,grounded,input,trick=false,time=0){
 const press=input.press==='gas'||!input.press&&input.gas&&!a.held;
 if(a.grounded!==grounded){a.lastGas=-99;a.slamming=false;a.flash=0;a.grounded=grounded;}
 if(input.reverse)a.lastGas=-99;
 if(press&&!input.reverse){const gap=time-a.lastGas;if(gap>=0&&gap<=DOUBLE_TAP){if(grounded)a.hops++;else {a.dives++;a.slamming=true;}a.lastGas=-99;}else a.lastGas=time;}
 if(!input.gas)a.slamming=false;
 a.held=input.gas;a.brakeHeld=input.special;
 a.mode=!grounded&&a.slamming?'slam':!grounded&&input.gas&&input.steer?'turn':'idle';
}
export function stepAirControl(a,grounded,input,dt,trick=false,time=0){
 airInput(a,grounded,input,trick,time);
 const target=!grounded&&input.gas&&!a.slamming?Math.sign(input.steer)*AIR_TURN_RATE:0;
 a.yaw+=(target-a.yaw)*(1-Math.exp(-dt*8));if(grounded)a.yaw=0;
 const dives=a.dives,hop=a.hops>0;a.dives=a.hops=0;
 a.flash=grounded?0:dives ? .28 :Math.max(0,a.flash-dt);
 return {dive:!grounded&&(a.slamming||a.flash>0),dives,hop,yaw:a.yaw};
}

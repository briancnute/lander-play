// Discrete presses own actions. Holding a button never produces repeated impulses.
export const DOUBLE_TAP=.32,DIRECTION_WINDOW=.65,AIR_TURN_RATE=.65;
export const newAirControl=()=>({mode:'idle',held:false,yaw:0,lastGas:-99,lastDirection:-99,grounded:null,hops:0,dives:0,flash:0});
export function airInput(a,grounded,input,trick=false,time=0){
 const press=input.gas&&!a.held;
 if(a.grounded!==grounded){a.lastGas=-99;a.grounded=grounded;}
 if(input.steer||input.both){a.lastDirection=time;if(!grounded)a.lastGas=-99;}
 const blocked=trick||input.special||input.reverse||(!grounded&&(input.both||input.steer||time-a.lastDirection<=DIRECTION_WINDOW));
 if(blocked)a.lastGas=-99;
 if(press&&!blocked){const gap=time-a.lastGas;if(gap>=0&&gap<=DOUBLE_TAP){if(grounded)a.hops++;else a.dives++;a.lastGas=-99;}else a.lastGas=time;}
 a.held=input.gas;
 a.mode=!grounded&&input.special&&input.steer?'turn':blocked?'blocked':'idle';
}
export function stepAirControl(a,grounded,input,dt,trick=false,time=0){
 airInput(a,grounded,input,trick,time);
 const target=!grounded&&input.special?Math.sign(input.steer)*AIR_TURN_RATE:0;
 a.yaw+=(target-a.yaw)*(1-Math.exp(-dt*8));if(grounded)a.yaw=0;
 const dives=a.dives,hop=a.hops>0;a.dives=a.hops=0;
 a.flash=trick?0:dives ? .18 :Math.max(0,a.flash-dt);
 return {dive:!grounded&&a.flash>0,dives,hop,yaw:a.yaw};
}

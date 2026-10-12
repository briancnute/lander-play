// Orb fuel belongs to score attack; slalom keeps its gate-earned boost.
export const GALE_DRIVE={thrust:43.75,limit:350,coastDrag:1.1};
export const ORB_BOOST_SPEED=470;
export const orbFuel=r=>Math.max(0,(r.orbs?.length??0)-2*(r.orbBoostUses??0));
export function requestOrbBoost(r){if(r?.phase==='running'&&!r.air)r.orbBoostRequested=true;}
export function cancelOrbBoost(r){if(r.orbBoost||r.boostSpeed)r.boost=0;r.orbBoost=false;r.boostSpeed=0;r.orbBoostRequested=false;}
export function stepOrbBoost(r,c,input){
 if((r.orbBoost||r.boostSpeed)&&(Math.abs(input.steer||0)>.01||input.both||r.boost<=0))cancelOrbBoost(r);
 if(!r.orbBoostRequested)return;
 r.orbBoostRequested=false;
 if(!c.scoreCourse||r.phase!=='running'||r.air||r.boost>0||orbFuel(r)<2)return;
 if(Math.abs(input.steer||0)>.01||input.both)return;
 r.orbBoostUses=(r.orbBoostUses??0)+1;r.orbBoost=true;r.boostSpeed=ORB_BOOST_SPEED;r.boost=2;holdBoostSpeed(r);r.feedback='BOOST';
}

export function holdBoostSpeed(r){
 if(!(r.boost>0&&r.boostSpeed))return;
 const angle=Math.hypot(r.v,r.side)>.001?Math.atan2(r.side,r.v):(r.facing??0);
 r.v=Math.cos(angle)*r.boostSpeed;r.side=Math.sin(angle)*r.boostSpeed;
}

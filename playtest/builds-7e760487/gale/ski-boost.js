// Orb fuel belongs to score attack; slalom keeps its gate-earned boost.
export const GALE_DRIVE={thrust:43.75,limit:350,coastDrag:1.1};
export const orbFuel=r=>Math.max(0,(r.orbs?.length??0)-2*(r.orbBoostUses??0));
export function requestOrbBoost(r){if(r?.phase==='running'&&!r.air)r.orbBoostRequested=true;}
export function cancelOrbBoost(r){if(r.orbBoost)r.boost=0;r.orbBoost=false;r.orbBoostRequested=false;}
export function stepOrbBoost(r,c,input){
 if(r.orbBoost&&(!input.gas||r.boost<=0))cancelOrbBoost(r);
 if(!r.orbBoostRequested)return;
 r.orbBoostRequested=false;
 if(!c.scoreCourse||r.phase!=='running'||r.air||r.boost>0||orbFuel(r)<2)return;
 if(!input.gas){r.feedback='Hold Thrust to boost';return;}
 r.orbBoostUses=(r.orbBoostUses??0)+1;r.orbBoost=true;r.boost=2;r.feedback='BOOST';
}

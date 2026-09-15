// Fictional ASTRA upgrades for feel comparison, not real rover capabilities.
export const KITS={
 sojourner:{name:'Sojourner',speed:112,acceleration:130},
 spirit:{name:'Spirit',speed:117.6,acceleration:124},
 opportunity:{name:'Opportunity',speed:121.8,acceleration:118},
 curiosity:{name:'Curiosity',speed:127.4,acceleration:114},
 perseverance:{name:'Perseverance',speed:133,acceleration:110},
};
export function kit(id){const k=KITS[id]??KITS.sojourner;return {...k,boostSpeed:k.speed*1.5,boostSeconds:1.5};}
export function easeBoostExit(s,previous,dt,input){
 if(s.air||previous.air||s.boost>0||input.brake||s.impact>0||previous.v<=s.tune.speed)return;
 const eased=s.tune.speed+(previous.v-s.tune.speed)*Math.exp(-dt/.65);
 s.v=Math.min(previous.v,Math.max(s.v,eased-s.tune.speed<.3?s.tune.speed:eased));
}

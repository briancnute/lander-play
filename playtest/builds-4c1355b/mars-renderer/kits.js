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

export const MASS={sojourner:10.5,spirit:185,opportunity:185,curiosity:899,perseverance:1025};
export const HANDLING={sojourner:1,spirit:.98,opportunity:.96,curiosity:.94,perseverance:.92};
// Compressed game mass avoids a 100-fold performance gap while retaining the mass ordering.
export function raceKit(id,powered=false){const k=kit(id);k.handling=HANDLING[id]??1;k.massFactor=.7+.6*Math.sqrt((MASS[id]??1025)/1025);k.boostKit=powered;if(powered){k.speed*=2.5;k.boostSpeed=k.speed;k.acceleration/=k.massFactor;}return k;}
export function explorationKit(id,mods={}){return raceKit(id,id==='perseverance'&&!!mods.kit);}
export function ratings(id,{tuned=false,powered=false,boostScale=false}={}){const k=tuned?raceKit(id,powered):kit(id);return [['Top speed',k.speed/(boostScale?332.5:133)],['Acceleration',k.acceleration/(boostScale?raceKit('sojourner',true).acceleration:130)],['Handling',tuned?k.handling:1],['Weight',tuned?k.massFactor/1.3:Math.max(.04,MASS[id]/1025)]];}

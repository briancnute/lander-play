// Real identities; fictional ASTRA driving/boost kits. Extras only, not Mercury's roster.
export const VEHICLES=Object.freeze([
 {id:'sojourner',name:'Sojourner',year:1997,site:'Ares Vallis',family:'small',style:'Quick recharge',source:'https://science.nasa.gov/mission/mars-pathfinder/',tuning:{}},
 {id:'spirit',name:'Spirit',year:2004,site:'Gusev Crater',family:'solar',style:'Balanced boost',source:'https://science.nasa.gov/mission/mer-spirit/',tuning:{speed:79,boostSpeed:194,chargeSeconds:1.5,boostSeconds:4.8,cooldown:2.7,overheatCooldown:6.5}},
 {id:'opportunity',name:'Opportunity',year:2004,site:'Meridiani Planum',family:'solar',style:'Balanced boost',source:'https://science.nasa.gov/mission/mer-opportunity/',tuning:{speed:79,boostSpeed:194,chargeSeconds:1.5,boostSeconds:4.8,cooldown:2.7,overheatCooldown:6.5}},
 {id:'curiosity',name:'Curiosity',year:2012,site:'Gale Crater',family:'large',style:'Long boost',source:'https://science.nasa.gov/mission/msl-curiosity/',tuning:{speed:82,boostSpeed:198,chargeSeconds:2,boostSeconds:5.2,cooldown:3.2,overheatCooldown:7}},
 {id:'perseverance',name:'Perseverance',year:2021,site:'Jezero Crater',family:'large',style:'Fastest boost',source:'https://science.nasa.gov/mission/mars-2020-perseverance/',tuning:{speed:84,boostSpeed:204,chargeSeconds:2.4,boostSeconds:5.5,cooldown:3.8,overheatCooldown:8}},
].map(v=>Object.freeze({...v,tuning:Object.freeze(v.tuning)})));
export const vehicle=id=>VEHICLES.find(v=>v.id===id)??VEHICLES[0];
// Retain the approved Sojourner lap history; other kits get separate bests.
export const bestLapKey=id=>'astra.rover.prototype.best.v2'+(vehicle(id).id==='sojourner'?'':'.'+vehicle(id).id);

// Real identities; fictional ASTRA driving/boost kits. Extras only, not Mercury's roster.
export const VEHICLES=Object.freeze([
 {id:'sojourner',name:'Sojourner',year:1997,site:'Ares Vallis',family:'small',style:'Compact rover',source:'https://science.nasa.gov/mission/mars-pathfinder/',tuning:{}},
 {id:'spirit',name:'Spirit',year:2004,site:'Gusev Crater',family:'solar',style:'Balanced boost',source:'https://science.nasa.gov/mission/mer-spirit/',tuning:{speed:79,boostSpeed:194,boostSeconds:4.8}},
 {id:'opportunity',name:'Opportunity',year:2004,site:'Meridiani Planum',family:'solar',style:'Balanced boost',source:'https://science.nasa.gov/mission/mer-opportunity/',tuning:{speed:79,boostSpeed:194,boostSeconds:4.8}},
 {id:'curiosity',name:'Curiosity',year:2012,site:'Gale Crater',family:'large',style:'Long boost',source:'https://science.nasa.gov/mission/msl-curiosity/',tuning:{speed:82,boostSpeed:198,boostSeconds:5.2}},
 {id:'perseverance',name:'Perseverance',year:2021,site:'Jezero Crater',family:'large',style:'Fastest boost',source:'https://science.nasa.gov/mission/mars-2020-perseverance/',tuning:{speed:84,boostSpeed:204,boostSeconds:5.5}},
].map(v=>Object.freeze({...v,tuning:Object.freeze(v.tuning)})));
export const vehicle=id=>VEHICLES.find(v=>v.id===id)??VEHICLES[0];
// Drive-over boost starts a new lap namespace; previous v1/v2 records stay stored.
export const bestLapKey=id=>'astra.expedition.prototype.best.v3'+(vehicle(id).id==='sojourner'?'':'.'+vehicle(id).id);

// Broad journey chapters anchored to the pinned NASA traverse, not site boundaries.
export function galeChapters(stops){return [
 {stop:0,name:'Landing basin',from:3,to:503,fact:'Curiosity found that ancient Gale had environments with the ingredients needed for microbial life.'},
 {stop:2,name:'Approaching Mount Sharp',from:504,to:1400,fact:'The journey from the plains reaches layered foothills: a record of changing environments.'},
 {stop:3,name:'Murray Buttes & lower mountain',from:1401,to:2299,fact:'Layered sandstone and eroded buttes preserve evidence of ancient sediment deposition.'},
 {stop:5,name:'Glen Torridon · clay country',from:2300,to:3000,fact:'Clay-bearing rocks record interaction with water. This chapter includes the Greenheugh excursion.'},
 {stop:7,name:'Toward the sulfate-bearing slopes',from:3001,to:3899,fact:'Changing minerals help Curiosity investigate how this landscape became drier.'},
 {stop:8,name:'Gediz Vallis & the higher traverse',from:3900,to:4500,fact:'Rocks carried down the mountain reveal episodes of flowing water and debris movement.'},
 {stop:10,name:'Beyond Gediz · mapped ascent',from:4501,to:5021,fact:'Continue up the recorded traverse. This is a dated map snapshot, not a live rover location.'},
 ].map(c=>({...c,...stops[c.stop],name:c.name}));}

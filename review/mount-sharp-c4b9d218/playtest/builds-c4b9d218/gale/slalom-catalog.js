export const SLALOM_RECORD_VERSION=6;
export const slalomRecordVersion=id=>id==='ski-torridon'?7:SLALOM_RECORD_VERSION;
export const slalomRecordKey=id=>'astra.gale.'+id+'.v'+slalomRecordVersion(id);
// Named regional settings; the cleared corridors and kickers are authored for play.
export const SLALOM_COURSES=[
 {id:'ski-murray',variant:'murray',name:'Murray Buttes',subtitle:'Murray shelves',description:'Long mountainside traverses and two braking switchbacks on measured terrain. Carry speed across the shelves.',anchor:3,color:'#f5cc83',heading:.24,half:55,timeTarget:16,offsets:[-45,-90,-65,25,100,75,-10,-85,-55,0]},
 {id:'ski-torridon',variant:'torridon',name:'Western traverse',historicalName:'Glen Torridon',subtitle:'Flowing descent',description:'Fourteen wide-spaced turns on a separate western slope. Carry Murray-like speed through a grounded run.',anchor:5,color:'#8edbc5',heading:-.32,half:40,timeTarget:24,offsets:[-70,65,-65,90,50,-90,70,-70,65,0]},
 {id:'ski-gediz',variant:'gediz',name:'Eastern flight',historicalName:'Gediz Vallis',subtitle:'Final jump',description:'Fourteen flowing gates, then one authored jump. Cross the finish well into the flight—or drive through on a cautious run.',anchor:8,color:'#9cc9ff',heading:.43,half:40,timeTarget:25,offsets:[-65,65,-65,65,-65,65,-65,65,-65,65]},
];
export const slalomChoice=id=>SLALOM_COURSES.find(c=>c.id===id||c.variant===id)??null;

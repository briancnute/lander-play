export const SLALOM_RECORD_VERSION=6;
export const slalomRecordVersion=id=>id==='ski-torridon'?7:SLALOM_RECORD_VERSION;
export const slalomRecordKey=id=>'astra.gale.'+id+'.v'+slalomRecordVersion(id);
// Named regional settings; the cleared corridors and kickers are authored for play.
export const SLALOM_COURSES=[
 {id:'ski-murray',variant:'murray',name:'Murray Buttes',subtitle:'Open carving',description:'Long, open arcs beneath layered foothills. Find your line and carry it into the jump.',anchor:3,color:'#f5cc83',heading:.24,half:55,timeTarget:16,offsets:[-45,-90,-65,25,100,75,-10,-85,-55,0]},
 {id:'ski-torridon',variant:'torridon',name:'Glen Torridon',subtitle:'Linked turns',description:'Repeated reversals and an offset double turn. Manage thrust through each link, then accelerate into the jump.',anchor:5,color:'#8edbc5',heading:-.32,half:40,timeTarget:24,offsets:[-70,65,-65,90,50,-90,70,-70,65,0]},
 {id:'ski-gediz',variant:'gediz',name:'Gediz Vallis',subtitle:'Technical descent',description:'Ten alternating gates: left, right, left, right. Balance thrust with carving to keep a clean rhythm.',anchor:8,color:'#9cc9ff',heading:.43,half:40,timeTarget:25,offsets:[-65,65,-65,65,-65,65,-65,65,-65,65]},
];
export const slalomChoice=id=>SLALOM_COURSES.find(c=>c.id===id||c.variant===id)??null;

// Named regional settings; the cleared corridors and kickers are authored for play.
export const SLALOM_COURSES=[
 {id:'ski-murray',variant:'murray',name:'Murray Buttes',subtitle:'Open carving',description:'Long, open arcs beneath layered foothills. Find your line and carry it into the jump.',anchor:3,color:'#f5cc83',heading:.24,half:55,offsets:[-45,-90,-65,25,100,75,-10,-85,-55,0]},
 {id:'ski-torridon',variant:'torridon',name:'Glen Torridon',subtitle:'Linked turns',description:'A rolling S-line across the clay-bearing foothills. Set up each turn before the next gate.',anchor:5,color:'#8edbc5',heading:-.32,half:47,offsets:[-55,-90,-20,65,95,20,-65,-85,-20,10]},
 {id:'ski-gediz',variant:'gediz',name:'Gediz Vallis',subtitle:'Technical descent',description:'A faster rhythm through the upper foothills. Read the linked offsets, then release into the run-up.',anchor:8,color:'#9cc9ff',heading:.43,half:40,offsets:[-55,-90,-10,65,40,-5,-50,0,55,0]},
];
export const slalomChoice=id=>SLALOM_COURSES.find(c=>c.id===id||c.variant===id)??null;

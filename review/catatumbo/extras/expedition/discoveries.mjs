// Fictional placements and collectible representations; mission facts link to primary sources.
export const discoveries=[
 {id:'instrument',name:'ASTRA test instrument',x:767,y:567,mission:'Fictional ASTRA equipment',fact:'Rovers turn observations into evidence using cameras and scientific instruments.',history:'This lost instrument belongs to our fictional expedition. Real missions such as Curiosity carry instruments to investigate rocks, soil and the atmosphere.',source:'https://science.nasa.gov/mission/msl-curiosity/'},
 {id:'pebbles',name:'Rounded pebbles',x:2540,y:370,mission:'Curiosity · 2012 · Gale Crater',fact:'Rounded pebbles helped reveal an ancient Martian stream.',history:'At outcrops including Hottah, Curiosity saw rounded stones held inside rock. Their shape and setting pointed to transport by flowing water. This collectible represents that evidence; it is not a real Hottah sample.',source:'https://www.jpl.nasa.gov/news/nasa-rover-finds-old-streambed-on-martian-surface/'},
 {id:'windstone',name:'Wind-sculpted stone',x:4140,y:640,mission:'Curiosity · 2022 · Gale Crater',fact:'Wind-blown sand can carve sharp faces into rock.',history:'These wind-shaped rocks are called ventifacts. Curiosity encountered fields of them near Greenheugh. Sharp rocks can damage rover wheels, so route planning matters. This specimen is an illustrative collectible.',source:'https://science.nasa.gov/blog/sols-3417-3418-a-view-filled-with-ventifacts/'},
 {id:'berries',name:'Mineral blueberries',x:5340,y:280,mission:'Opportunity · 2004 · Meridiani Planum',fact:'Tiny hematite-rich spheres helped tell a story of past water.',history:'Opportunity studied gray mineral spheres nicknamed blueberries. Their hematite content supported evidence for past water at the landing site. They were minerals, not fruit or evidence of life. Our collectible enlarges them for visibility.',source:'https://www.jpl.nasa.gov/news/mineral-in-mars-berries-adds-to-water-story/'},
];
const polygon=(x,y,rx,ry,n=7)=>Array.from({length:n},(_,i)=>{const a=i*Math.PI*2/n;return [x+Math.cos(a)*rx,y+Math.sin(a)*ry]});
export const landmarks=[
 {name:'Split towers',x:2600,y:285,parts:[{poly:polygon(2580,282,21,25),height:48,taper:.42},{poly:polygon(2637,297,20,27),height:37,taper:.48}]},
 {name:'Wind ridge',x:4250,y:620,parts:[0,1,2,3].map(i=>({poly:polygon(4200+i*34,590+i*12,12,27,5),height:18+i*5,taper:.2}))},
 {name:'Sheltered alcove',x:5340,y:220,parts:[{poly:[[5260,175],[5415,175],[5410,207],[5265,210]],height:31,taper:.85},{poly:[[5260,190],[5290,198],[5294,300],[5260,303]],height:25,taper:.8},{poly:[[5390,194],[5420,186],[5424,290],[5395,287]],height:28,taper:.8}]},
];
export const landmarkParts=landmarks.flatMap(l=>l.parts);
export function discoveryIds(value,legacyFound=false){const ids=Array.isArray(value)?value.filter(id=>discoveries.some(d=>d.id===id)):[];if(legacyFound)ids.push('instrument');return [...new Set(ids)];}
export function scanDiscoveries(s,dt){
 if(s.mode==='trial'||s.done)return null;
 s.discoveries??=[];
 const d=discoveries.find(d=>!s.discoveries.includes(d.id)&&Math.hypot(s.x-d.x,s.y-d.y)<26);
 if(!d||s.air||s.turnaround){s.discoveryTarget=null;s.discoveryTime=0;return null;}
 if(s.discoveryTarget!==d.id){s.discoveryTarget=d.id;s.discoveryTime=0;}
 s.discoveryTime+=dt;if(s.discoveryTime<1.4)return null;
 s.discoveries.push(d.id);if(d.id==='instrument')s.found=true;s.discoveryTarget=null;s.discoveryTime=0;
 return d;
}

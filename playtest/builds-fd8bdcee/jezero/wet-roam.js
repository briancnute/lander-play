import {loadArea} from './area.js';
import {toGame} from './terrain.js';
import {explorationBounds} from './belva-bounds.js';
import {startWetWorld} from '../shared/wet-world.js';
startWetWorld({site:'jezero',title:'Wet Jezero',rover:'perseverance',load:()=>loadArea({v2:true}),
 // A composed low-lake view; this number is not an ancient lake-level claim.
 water:new URL('./assets/water-survey.json',import.meta.url),lake:{level:200,seed:toGame(2600,-1000),step:64},shore:toGame(80,-880),focus:toGame(196,-1260),
 views:b=>[{name:'Kodiak shoreline',...toGame(80,-880),focus:toGame(196,-1260)},...b.channels.map((ch,i)=>{const p=ch.points[Math.min(12,ch.points.length-1)];return {name:['Neretva riverbank','Western pools','Northern tributary','Southern inlet'][i],...p,focus:p};})],
 segments:a=>a.world.segments,
 map:{image:new URL('./assets/jezero-relief.png',import.meta.url),satellite:new URL('./assets/jezero-satellite.webp',import.meta.url),bounds:explorationBounds},
 source:'https://www.jpl.nasa.gov/news/nasas-perseverance-sheds-more-light-on-jezero-craters-watery-past/',
 note:'Perseverance found layered delta rocks left by an ancient lake. Neretva and smaller interpreted runoff channels feed the lake. This bonus adds ancient water to today’s terrain. Drainage and banks follow the game terrain; water levels and active channels are interpreted for play.'});

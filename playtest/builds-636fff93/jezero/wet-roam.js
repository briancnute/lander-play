import {neretvaCenterline} from './neretva-centerline.js';
import {loadArea} from './area.js';
import {toGame} from './terrain.js';
import {explorationBounds} from './belva-bounds.js';
import {startWetWorld} from '../shared/wet-world.js';
startWetWorld({site:'jezero',title:'Wet Jezero',rover:'perseverance',load:()=>loadArea({v2:true}),
 // A composed low-lake view; this number is not an ancient lake-level claim.
 lake:{level:140,seed:toGame(2600,-1000),step:80,river:neretvaCenterline},shore:toGame(80,-880),focus:toGame(196,-1260),
 views:[{name:'Neretva riverbank',x:-7483,y:-983,focus:{x:-7440,y:-811}},{name:'Kodiak shoreline',...toGame(80,-880),focus:toGame(196,-1260)},{name:'Delta shore',...toGame(-400,-400)},{name:'Eastern basin',...toGame(2600,-800)}],
 segments:a=>a.world.segments,
 map:{image:new URL('./assets/jezero-relief.png',import.meta.url),satellite:new URL('./assets/jezero-satellite.webp',import.meta.url),bounds:explorationBounds},
 source:'https://www.jpl.nasa.gov/news/nasas-perseverance-sheds-more-light-on-jezero-craters-watery-past/',
 note:'Perseverance found layered delta rocks left by an ancient lake. Neretva Vallis feeds an imagined river into the lake. This bonus adds ancient water to today’s terrain; its river, water level and shoreline are interpreted for play.'});

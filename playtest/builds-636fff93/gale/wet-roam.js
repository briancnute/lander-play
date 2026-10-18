import {loadArea,toGame,UNITS} from './terrain.js';
import {startWetWorld} from '../shared/wet-world.js';
startWetWorld({site:'gale',title:'Wet Gale',rover:'curiosity',load:()=>loadArea(),
 // Authored low-lake interpretation, not a measured ancient shoreline.
 lake:{level:50*UNITS,seed:toGame(0,0),step:40*UNITS},
 shore:toGame(-4230,-4670),
 views:[{name:'Lake overlook',...toGame(-4230,-4670)},{name:'Western shore',...toGame(-6200,-2500)},{name:'Mount Sharp foothills',...toGame(-5113,-6560)}],
 segments:a=>a.segments,
 map:{image:new URL('./assets/relief.png',import.meta.url),satellite:new URL('./assets/satellite.webp',import.meta.url),bounds:{minX:-15000*UNITS,width:12000*UNITS,minY:-8000*UNITS,maxY:29000*UNITS}},
 source:'https://science.nasa.gov/photojournal/simulated-view-of-gale-crater-lake-on-mars/',
 note:'Curiosity found evidence of ancient lakes. This bonus adds an imagined lake to today’s terrain; Mount Sharp and this shoreline are not an exact ancient reconstruction.'});

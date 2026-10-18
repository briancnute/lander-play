import {loadArea,toGame,UNITS} from './terrain.js';
import {startWetWorld} from '../shared/wet-world.js';
startWetWorld({site:'gale',title:'Wet Gale',rover:'curiosity',load:()=>loadArea(),
 // Authored low-lake interpretation, not a measured ancient shoreline.
 water:new URL('./assets/water-survey.json',import.meta.url),lake:{level:80*UNITS,seed:toGame(0,0),step:40*UNITS},
 shore:toGame(-4230,-4670),
 views:b=>[{name:'Lake overlook',...toGame(-4230,-4670)},...b.channels.map((ch,i)=>{const p=ch.points[Math.min(10,ch.points.length-1)];return {name:['Gediz runoff overlook','Western foothill stream','Eastern foothill stream','Upper mountain stream'][i],...p,focus:p};}),{name:'Mount Sharp foothills',...toGame(-5113,-6560)}],
 segments:a=>a.segments,
 map:{image:new URL('./assets/relief.png',import.meta.url),satellite:new URL('./assets/satellite.webp',import.meta.url),bounds:{minX:-15000*UNITS,width:12000*UNITS,minY:-8000*UNITS,maxY:29000*UNITS}},
 source:'https://science.nasa.gov/photojournal/simulated-view-of-gale-crater-lake-on-mars/',
 note:'Curiosity found evidence of ancient lakes. This bonus adds an imagined lake and valley runoff to today’s terrain. Gediz records water and debris flows from a different chapter in its history; Mount Sharp and this shoreline are not an exact ancient reconstruction.'});

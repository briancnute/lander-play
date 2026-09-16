import {toGame} from './terrain.js';
import {landmarks} from './landmarks.js';

const region=(id,name,east,north,copy)=>({id,name,...toGame(east,north),kind:'region',...copy});

export const regions=[
 region('western-delta','Western delta',-430,200,{
  fact:'Jezero’s western delta formed where an ancient river slowed as it entered a crater lake, dropping layers of sand, mud and rock.',
  detail:'This is why the western delta matters: moving water sorted and buried material here. The broad region card reveals the smaller rock workspaces inside it.',
  image:'./assets/wildcat-skinner-photo.png',imageAlt:'Rover view across varied sedimentary rocks in Jezero’s western delta',imageCredit:'NASA/JPL-Caltech/ASU/MSSS · Producer-selected crop',source:'https://science.nasa.gov/mission/mars-2020-perseverance/science/exploring-jezero-crater/'
 }),
 region('delta-front','Delta front',-220,-440,{
  fact:'The delta front preserves sediment laid down where flowing water met the ancient lake. Changes in grain size and layering record changes in that water.',
  detail:'Collecting this regional overview reveals the detailed sampling sites and sediment stories clustered around the front of the delta.',
  image:'./assets/hidden-harbor-photo.png',imageAlt:'Layered and fractured rocks along Jezero’s delta front',imageCredit:'NASA/JPL-Caltech/ASU/MSSS · Producer-selected natural-color crop',source:'https://science.nasa.gov/mission/mars-2020-perseverance/science/exploring-jezero-crater/'
 }),
 region('crater-floor','Crater floor',750,-650,{
  fact:'Jezero was once filled by a lake. The crater floor preserves older volcanic rock, lake sediments and the route from Perseverance’s landing area toward the delta.',
  detail:'The broad floor is more than empty travel space: it establishes the lake basin around the delta and the mission history that led here.',
  image:'./assets/landing.jpg',imageAlt:'Orbital view locating Perseverance’s landing area on the floor of Jezero Crater',imageCredit:'NASA/JPL-Caltech/University of Arizona · PIA24483',source:'https://science.nasa.gov/resource/welcome-to-octavia-e-butler-landing/'
 }),
 {...landmarks[0],id:'kodiak-region',regionId:'kodiak',name:'Kodiak',...toGame(80,-880),kind:'region',
  fact:'Kodiak is an isolated remnant of Jezero’s ancient river delta. Its exposed layers helped scientists read the sequence of water and sediment in the crater lake.',
  detail:'This accessible overlook represents the Kodiak region. The butte itself remains beyond the driving boundary; the compact-world viewpoint preserves its recognizable layered form and bearing.'},
];

export const regionById=Object.fromEntries(regions.map(r=>[r.regionId??r.id,r]));
export const detailRegion={0:'western-delta',1:'delta-front',2:'delta-front',4:'delta-front',5:'delta-front',6:'crater-floor'};
export const detailIndices=Object.keys(detailRegion).map(Number);
export const regionIdForDetail=index=>detailRegion[index];

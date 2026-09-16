import {toGame} from './terrain.js';
import {landmarks} from './landmarks.js';
import {floorRegions} from './floor-sites.js';

const region=(id,name,east,north,copy)=>({id,name,...toGame(east,north),kind:'region',...copy});

export const regions=[
 region('western-delta','Western delta',-430,200,{
  fact:'Jezero’s western delta formed where an ancient river slowed as it entered a crater lake, dropping layers of sand, mud and rock.',
  detail:'This is why the western delta matters: moving water sorted and buried material here. Explore the smaller rock workspaces revealed on your map to see parts of that story.',
  image:'./assets/wildcat-skinner-photo.png',imageAlt:'Rover view across varied sedimentary rocks in Jezero’s western delta',imageCredit:'NASA/JPL-Caltech/ASU/MSSS · Producer-selected crop',source:'https://science.nasa.gov/mission/mars-2020-perseverance/science/exploring-jezero-crater/'
 }),
 region('delta-front','Delta front',-220,-440,{
  fact:'The delta front preserves sediment laid down where flowing water met the ancient lake. Changes in grain size and layering record changes in that water.',
  detail:'Follow the newly revealed markers to compare sampling sites and the sediment stories along the delta front.',
  image:'./assets/hidden-harbor-photo.png',imageAlt:'Layered and fractured rocks along Jezero’s delta front',imageCredit:'NASA/JPL-Caltech/ASU/MSSS · Producer-selected natural-color crop',source:'https://science.nasa.gov/mission/mars-2020-perseverance/science/exploring-jezero-crater/'
 }),
 region('crater-floor','Crater floor',750,-650,{
  fact:'Jezero was once filled by a lake. The crater floor preserves older volcanic rock, lake sediments and the route from Perseverance’s landing area toward the delta.',
  detail:'The broad floor is more than empty travel space: it establishes the lake basin around the delta and the mission history that led here.',
  image:'./assets/landing.jpg',imageAlt:'Orbital view locating Perseverance’s landing area on the floor of Jezero Crater',imageCredit:'NASA/JPL-Caltech/University of Arizona · PIA24483',source:'https://science.nasa.gov/resource/welcome-to-octavia-e-butler-landing/'
 }),
 {...landmarks[0],id:'kodiak-region',regionId:'kodiak',name:'Kodiak',...toGame(80,-880),kind:'region',
  fact:'Kodiak is an isolated remnant of Jezero’s ancient river delta. Its exposed layers helped scientists read the sequence of water and sediment in the crater lake.',
  detail:'Look across to the isolated butte and its flat cap. Its exposed layers are a window into the ancient delta. This discovery is an overlook, not a summit activity; the broader southern plain opens after Three Forks is complete.'},
];

export const regionById=Object.fromEntries(regions.map(r=>[r.regionId??r.id,r]));
export const detailRegion={0:'western-delta',1:'delta-front',2:'delta-front',4:'delta-front',5:'delta-front',6:'crater-floor'};
export const detailIndices=Object.keys(detailRegion).map(Number);
export const regionIdForDetail=index=>detailRegion[index];
export const coreRegionIds=regions.map(r=>r.regionId??r.id);
export const coreDetailIndices=[...detailIndices];
export function revealFloorRegions(){
 if(regions.some(r=>r.id==='landing-plain'))return;
 regions.push(...floorRegions);Object.assign(regionById,Object.fromEntries(floorRegions.map(r=>[r.id,r])));
 Object.assign(detailRegion,{7:'landing-plain',8:'seitah'});detailIndices.push(7,8);
}

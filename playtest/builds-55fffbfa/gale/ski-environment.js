import {slalomChoice} from './slalom-catalog.js';
import {triangle} from '../mars-renderer/triangle.js';
export const EVEREST_ACTIVITY='everest-slalom';
export const EVEREST_RECORD_KEY='astra.earth.everest-slalom.v1';
export const EVEREST={id:'everest',world:'earth',site:'everest',activity:EVEREST_ACTIVITY,variant:'murray',title:'South Col · slalom'};
export function skiEnvironment(search=''){return new URLSearchParams(search).get('environment')==='everest'?EVEREST:null;}
/** Identity/presentation only: all geometry, controls and simulation stay shared. */
export function environmentCourse(course,environment){return environment?{...course,sourceActivity:course.activity,activity:environment.activity,recordMode:environment.activity,title:environment.title,timeTarget:slalomChoice(course.activity).timeTarget}:course;}
/** Isolate outings, diagnostics and practice settings; never rewrite Gale bytes. */
export function environmentStorage(storage,environment){if(!environment)return storage;const key=k=>k.startsWith('astra.gale.')?'astra.earth.everest.'+k.slice('astra.gale.'.length):k;return {getItem:k=>storage.getItem(key(k)),setItem:(k,v)=>storage.setItem(key(k),v)};}
/** Scenery beyond the full playable corridor; no added contact/camera surface. */
export function everestBackdrop(area){
 const top=area.mountain.top,cx=top.x,cy=top.y-4500,base=area.ground(top.x,top.y)-2600,v=[],n=112;
 const profile=a=>{const peak=(center,width,height)=>height*Math.max(0,1-Math.abs(Math.atan2(Math.sin(a-center),Math.cos(a-center)))/width);return 1400+peak(-.34,.30,6500)+peak(.18,.24,5700)+peak(.66,.33,3600)+peak(-1.15,.26,3500)+peak(1.3,.32,3700)+500*Math.abs(Math.sin(a*11));};
 const point=(a,r,z)=>[cx+Math.sin(a)*r,cy-Math.cos(a)*r,z];
 for(let i=0;i<n;i++){const a=i*Math.PI*2/n,b=(i+1)*Math.PI*2/n,lowA=point(a,18500,base),lowB=point(b,18500,base),midA=point(a,24500,base+profile(a)*.43),midB=point(b,24500,base+profile(b)*.43),highA=point(a,28500,base+profile(a)),highB=point(b,28500,base+profile(b));triangle(v,lowA,lowB,midA,[.43,.49,.54]);triangle(v,lowB,midB,midA,[.63,.71,.77]);triangle(v,midA,midB,highA,[.78,.85,.89]);triangle(v,midB,highB,highA,i%3?[.90,.94,.96]:[.44,.51,.57]);}
 return {vertices:new Float32Array(v)};
}
export function prepareSkiEnvironment(area,environment){if(!environment)return area;area.skiEnvironment=environment;area.backdrop=everestBackdrop(area);for(let i=0;i<area.scenery.length;i+=9){area.scenery[i+6]=.23;area.scenery[i+7]=.27;area.scenery[i+8]=.30;}area.backdropHazeFloor=.20;return area;}

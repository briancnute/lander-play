export const SAVE_KEY='astra.gale.openWorld.v1';
export function validPose(p,bounds){return !!p&&['x','y','heading'].every(k=>Number.isFinite(p[k]))&&p.x>=bounds.minX&&p.x<=bounds.width&&p.y>=bounds.minY&&p.y<=bounds.maxY;}
export function readSave(storage,bounds){
 let text;try{text=storage.getItem(SAVE_KEY);if(!text)return null;const s=JSON.parse(text);if(s.version!==1||!validPose(s.position,bounds))throw Error('Invalid Gale save');return {...s,visited:Array.isArray(s.visited)?s.visited.filter(v=>typeof v==='string'):[],route:s.route!==false,light:['day','dusk','night'].includes(s.light)?s.light:'dusk',quality:s.quality==='performance'?'performance':'balanced'};}catch{if(text)try{storage.setItem(SAVE_KEY+'.backup.'+Date.now(),text);}catch{}return null;}
}
export function writeSave(storage,value){try{storage.setItem(SAVE_KEY,JSON.stringify({...value,version:1}));return true;}catch{return false;}}

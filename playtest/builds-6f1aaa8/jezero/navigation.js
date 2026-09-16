import {MAP_SIZE} from './scale.js';
import {toGame,toMetres} from './terrain.js';
import {REQUIRED_ACTIVITY_IDS} from './progression.js';
export {worldUnlocked} from './progression.js';
export const CLOSE_RANGE=36; // 9 metres / about 30 feet, shared labels and GPS arrival.
export const mapBounds={minX:0,minY:0,width:MAP_SIZE,maxY:MAP_SIZE};
export const geology=[{...toGame(-430,200),name:'Western delta'},{...toGame(-220,-440),name:'Delta front'},{...toGame(950,-600),name:'Crater floor'},{...toGame(196,-1260),name:'Kodiak'}];
export const raceSite={id:REQUIRED_ACTIVITY_IDS[0],name:'Delta time trial',...toGame(600,-400),radius:70,dwell:3,kind:'activity'};
export const worldRequirements={activities:REQUIRED_ACTIVITY_IDS};
export function regionAt(p){const {east,north}=toMetres(p.x,p.y);if(east>1400&&north< -1250)return 'Séítah';if(east>1500)return 'Landing plain';if(north> -120)return 'Western delta';if(east<0&&north> -650)return 'Delta front';if(east>600||north< -700)return 'Crater floor';return 'Three Forks';}
export function reachableTarget(p,b){return {x:Math.max(b.minX+41,Math.min(b.width-41,p.x)),y:Math.max(b.minY+41,Math.min(b.maxY-41,p.y))};}
export function mapTarget(x,y,w,h,b,view=mapBounds){return reachableTarget({x:view.minX+x/w*(view.width-view.minX),y:view.minY+y/h*(view.maxY-view.minY)},b);}
export function advanceEntry(previous,s,dt){return s.mode==='free'&&!s.air&&!s.turnaround&&Math.hypot(s.x-raceSite.x,s.y-raceSite.y)<raceSite.radius?Math.min(raceSite.dwell,previous+dt):0;}

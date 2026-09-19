import {MAP_SIZE} from './scale.js';
import {toGame,toMetres} from './terrain.js';
import {REQUIRED_ACTIVITY_IDS} from './progression.js';
import {clampTarget} from './belva-bounds.js';
export {worldUnlocked} from './progression.js';
export const CLOSE_RANGE=36; // 9 metres / about 30 feet, shared labels and GPS arrival.
export const mapBounds={minX:0,minY:0,width:MAP_SIZE,maxY:MAP_SIZE};
export const geology=[{...toGame(-430,200),name:'Western delta'},{...toGame(-220,-440),name:'Delta front'},{...toGame(950,-600),name:'Crater floor'},{...toGame(196,-1260),name:'Kodiak'}];
export const raceSite={id:REQUIRED_ACTIVITY_IDS[0],name:'Delta time trial',...toGame(600,-400),radius:70,dwell:3,kind:'activity'};
export const worldRequirements={activities:REQUIRED_ACTIVITY_IDS};
export function regionAt(p){const {east,north}=toMetres(p.x,p.y);if(east< -1850&&north>1050&&north<1500)return 'Echo Creek';if(east< -850&&north>620)return 'Belva';if(north>504||east< -660&&north> -650)return 'Upper delta';if(east> -250&&east<350&&north> -250&&north<350)return 'Jenkins Gap';if(east>1400&&north< -1250)return 'Séítah';if(east>1500)return 'Landing plain';if(north> -120)return 'Western delta';if(east<0&&north> -650)return 'Delta front';if(east>600||north< -700)return 'Crater floor';return 'Three Forks';}
export function reachableTarget(p,b){return clampTarget(p,b);}
export function mapFrame(w,h,b=mapBounds){const scale=Math.min(w/(b.width-b.minX),h/(b.maxY-b.minY)),width=(b.width-b.minX)*scale,height=(b.maxY-b.minY)*scale;return {x:(w-width)/2,y:(h-height)/2,width,height,scale};}
export function mapPoint(p,w,h,b=mapBounds){const f=mapFrame(w,h,b);return {x:f.x+(p.x-b.minX)*f.scale,y:f.y+(p.y-b.minY)*f.scale};}
export function mapTarget(x,y,w,h,b,view=mapBounds){const f=mapFrame(w,h,view);return reachableTarget({x:view.minX+(x-f.x)/f.scale,y:view.minY+(y-f.y)/f.scale},b);}
export function advanceEntry(previous,s,dt){return s.mode==='free'&&!s.air&&!s.turnaround&&Math.hypot(s.x-raceSite.x,s.y-raceSite.y)<raceSite.radius?Math.min(raceSite.dwell,previous+dt):0;}

import {toGame,toMetres} from './terrain.js';
export const CLOSE_RANGE=36; // 9 metres / about 30 feet, shared labels and GPS arrival.
export const mapBounds={minX:0,minY:0,width:12000,maxY:12000};
export const geology=[{...toGame(-430,200),name:'Western delta'},{...toGame(-220,-440),name:'Delta front'},{...toGame(950,-600),name:'Crater floor'},{...toGame(196,-1260),name:'Kodiak'}];
export const raceSite={id:'delta-trial',name:'Delta time trial',...toGame(600,-400),radius:70,dwell:3,kind:'activity'};
export function regionAt(p){const {east,north}=toMetres(p.x,p.y);if(north> -120)return 'Western delta';if(east<0&&north> -650)return 'Delta front';if(east>600||north< -700)return 'Crater floor';return 'Three Forks';}
export function reachableTarget(p,b){return {x:Math.max(b.minX+41,Math.min(b.width-41,p.x)),y:Math.max(b.minY+41,Math.min(b.maxY-41,p.y))};}
export function mapTarget(x,y,w,h,b){return reachableTarget({x:x/w*12000,y:y/h*12000},b);}
export function advanceEntry(previous,s,dt){return s.mode==='free'&&!s.air&&!s.turnaround&&Math.hypot(s.x-raceSite.x,s.y-raceSite.y)<raceSite.radius?Math.min(raceSite.dwell,previous+dt):0;}

import {toGame,toMetres} from './terrain.js';
export const CLOSE_RANGE=18; // 4.5 metres / about 15 feet, shared labels and GPS arrival.
export const mapBounds={minX:0,minY:0,width:12000,maxY:12000};
export const geology=[{...toGame(-430,200),name:'Western delta'},{...toGame(-220,-440),name:'Delta front'},{...toGame(950,-600),name:'Crater floor'},{...toGame(196,-1260),name:'Kodiak'}];
export const raceSite={id:'delta-trial',name:'Delta time trial',...toGame(600,-400),radius:70,dwell:3,kind:'activity'};
export function regionAt(p){const {east,north}=toMetres(p.x,p.y);if(north> -120)return 'Western delta';if(east<0&&north> -650)return 'Delta front';if(east>600||north< -700)return 'Crater floor';return 'Three Forks';}
export function mapTarget(x,y,w,h){return {x:Math.max(0,Math.min(12000,x/w*12000)),y:Math.max(0,Math.min(12000,y/h*12000))};}
export function advanceEntry(previous,s,dt){return s.mode==='free'&&!s.air&&!s.turnaround&&Math.hypot(s.x-raceSite.x,s.y-raceSite.y)<raceSite.radius?Math.min(raceSite.dwell,previous+dt):0;}

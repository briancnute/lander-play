import {clearRallyLine} from './rally-clearance.js';
export const RELAY_ID='relay-v2';
export const RELAY_ROAD_HALF_WIDTH=24;
export const RELAY_GATE_HALF_WIDTH=48; // One full road-width either side of its center.
/** Remove revisits/near-overlapping spurs, preserving the two physical endpoints. */
export function cleanRelayLine(source,rocks=[]){
 let points=source.map(p=>({x:p.x,y:p.y}));
 for(let pass=0;pass<3;pass++){
  const kept=[];let travelled=0;
  for(const p of points){if(kept.length)travelled+=Math.hypot(p.x-kept.at(-1).x,p.y-kept.at(-1).y);
   const back=kept.findIndex(q=>travelled-q.age>240&&Math.hypot(p.x-q.x,p.y-q.y)<85);
   if(back>=0)kept.splice(back+1);
   kept.push({...p,age:travelled});
  }
  points=clearRallyLine(kept,rocks);
 }
 points[0]={x:source[0].x,y:source[0].y};points[points.length-1]={x:source.at(-1).x,y:source.at(-1).y};return points;
}
export function relayGates(points,atDistance){
 const length=points.at(-1).s,positions=[120];
 // About four seconds at cruise; add turn-entry gates when a bend needs confirmation.
 for(let s=1200;s<length-180;s+=1200)positions.push(s);
 for(let s=400;s<length-400;s+=160){const a=atDistance(points,s-100),b=atDistance(points,s+100),turn=Math.abs(Math.atan2(Math.sin(b.heading-a.heading),Math.cos(b.heading-a.heading)));if(turn>.5&&positions.every(p=>Math.abs(p-(s-80))>450))positions.push(s-80);}
 positions.push(length-100);
 return positions.sort((a,b)=>a-b).map((s,id)=>({...atDistance(points,s),id,halfWidth:RELAY_GATE_HALF_WIDTH}));
}
/** Forward swept crossing: neither proximity nor a finish teleport grants a gate. */
export function crossesRelayGate(from,to,g){
 const fx=Math.sin(g.heading),fy=-Math.cos(g.heading),sideX=Math.cos(g.heading),sideY=Math.sin(g.heading);
 const a=(from.x-g.x)*fx+(from.y-g.y)*fy,b=(to.x-g.x)*fx+(to.y-g.y)*fy;
 if(a>0||b<0||b-a<1e-7)return false;
 const t=-a/(b-a),x=from.x+(to.x-from.x)*t-g.x,y=from.y+(to.y-from.y)*t-g.y;
 return Math.abs(x*sideX+y*sideY)<=g.halfWidth;
}
export function relayFlightCamera(shown,heading){
 const h=heading-Math.PI/2,lookAhead=85;
 return {x:shown.x+Math.sin(heading)*lookAhead-Math.sin(h)*260,y:shown.y-Math.cos(heading)*lookAhead+Math.cos(h)*260,eye:shown.z+115,heading:h,pitch:.32,zoom:.72,live:true};
}

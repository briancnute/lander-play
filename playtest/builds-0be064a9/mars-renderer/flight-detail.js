// Flight-only visual budget. Collision height remains the full terrain surface.
export const FLIGHT_TERRAIN_RANGE=5000;
export function boundsOfMesh(vertices){
 const b={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};
 for(let i=0;i<vertices.length;i+=9){b.minX=Math.min(b.minX,vertices[i]);b.maxX=Math.max(b.maxX,vertices[i]);b.minY=Math.min(b.minY,vertices[i+1]);b.maxY=Math.max(b.maxY,vertices[i+1]);}
 return b;
}
export function inFlightRange(bounds,s){
 if(!bounds)return true;
 const origin=s.terrainObserver??s;return Math.hypot(Math.max(bounds.minX-origin.x,0,origin.x-bounds.maxX),Math.max(bounds.minY-origin.y,0,origin.y-bounds.maxY))<(s.terrainRange??FLIGHT_TERRAIN_RANGE);
}
// Lower only the flight canvas when sustained frame time exceeds the budget.
// Never oscillate resolution during a short flight; landing resets the budget.
export function createFlightRenderBudget(){
 let scale=1,mean=1/60,elapsed=0,lastChange=0;
 return {reset(){scale=1;mean=1/60;elapsed=0;lastChange=0;},sample(dt){
  if(!Number.isFinite(dt)||dt<=0)return scale;
  const step=Math.min(.1,dt);elapsed+=step;mean+=(step-mean)*(1-Math.exp(-step*4));
  if(elapsed-lastChange>=.65&&mean>.026&&scale>.6){scale=scale===1?.75:.6;lastChange=elapsed;}
  return scale;
 },get scale(){return scale;}};
}

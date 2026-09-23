import {viewBounds,zoomView,panView} from './map-view.js';
// Pointer events unify mouse drag and anchored two-finger pan/zoom. A pinch never places a target.
export function attachMapGestures(canvas,{world,view,draw,target}){
 const held=new Map();let moved=false,last=null;
 const snapshot=()=>{const p=[...held.values()];return p.length>1?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}:p[0];};
 const reset=()=>{held.clear();last=null;moved=false;};canvas.style.touchAction='none';
 canvas.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();if(!held.size)moved=false;held.set(e.pointerId,{x:e.clientX,y:e.clientY});if(held.size>1)moved=true;last=snapshot();canvas.setPointerCapture(e.pointerId);};
 canvas.onpointermove=e=>{if(!held.has(e.pointerId))return;e.preventDefault();held.set(e.pointerId,{x:e.clientX,y:e.clientY});const next=snapshot(),r=canvas.getBoundingClientRect();if(!last){last=next;return;}
  if(held.size>1){const before=viewBounds(world,view),scale=Math.min(r.width/(before.width-before.minX),r.height/(before.maxY-before.minY)),anchor={x:(before.minX+before.width)/2+(last.x-r.left-r.width/2)/scale,y:(before.minY+before.maxY)/2+(last.y-r.top-r.height/2)/scale};zoomView(world,view,last.d>0?next.d/last.d:1);const after=viewBounds(world,view),newScale=Math.min(r.width/(after.width-after.minX),r.height/(after.maxY-after.minY));view.x=anchor.x-(next.x-r.left-r.width/2)/newScale;view.y=anchor.y-(next.y-r.top-r.height/2)/newScale;zoomView(world,view,1);moved=true;draw();last=next;
  }else if(moved||Math.hypot(next.x-last.x,next.y-last.y)>3){moved=true;panView(world,view,next.x-last.x,next.y-last.y,r.width,r.height);last=next;draw();}
 };
 const finish=(e,cancelled=false)=>{if(!held.has(e.pointerId))return;held.delete(e.pointerId);if(cancelled)moved=true;if(!held.size&&!moved){const r=canvas.getBoundingClientRect();target(e.clientX-r.left,e.clientY-r.top,r.width,r.height);}last=snapshot()??null;};
 canvas.onpointerup=e=>finish(e);canvas.onpointercancel=e=>finish(e,true);canvas.onlostpointercapture=e=>finish(e,true);canvas.closest('dialog')?.addEventListener('close',reset);return {reset};
}

import {createRouteRibbon} from '../jezero/route-ribbon.js';
import {box} from '../mars-renderer/geometry.js';
import {triangle} from '../mars-renderer/triangle.js';
import {skiGuideLines} from './ski-guide-lines.js';
export function createSkiGuide(gpu,courses){
 const lines=skiGuideLines(courses),ground=courses.slalom.surface,ribbons={},arrows={};
 for(const [mode,points]of Object.entries(lines)){
  ribbons[mode]=createRouteRibbon(gpu,[{points}],ground,{halfWidth:2.4,color:[.55,.83,.73],emissive:true});
  const v=[];let distance=0;
  for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],len=Math.hypot(b.x-a.x,b.y-a.y);distance+=len;if(distance<170||!len)continue;distance=0;const dx=(b.x-a.x)/len,dy=(b.y-a.y)/len,p=(forward,side)=>{const x=b.x+dx*forward-dy*side,y=b.y+dy*forward+dx*side;return [x,y,ground(x,y)+.35];};triangle(v,p(12,0),p(-10,-10),p(-5,0),[.75,.94,.79]);triangle(v,p(12,0),p(-5,0),p(-10,10),[.75,.94,.79]);}
  arrows[mode]=gpu.upload(new Float32Array(v));
 }
 const c=courses.slalom,features=[...c.gates.map((g,i)=>({...c.point(g.s,g.u),name:`Gate ${i+1}`,s:g.s})),{...c.point(4800),name:'Boost',s:4800},{...c.point(c.lip),name:'Big jump',s:c.lip},{...c.point(c.finish),name:'Finish',s:c.finish}];
 // Identify existing terrain, rather than promising a launch on every ripple.
 const terrainFeatures=[],loop=lines.crater.slice(0,-1),candidates=[];
 for(let i=0;i<loop.length;i++){const a=loop[(i+loop.length-2)%loop.length],p=loop[i],b=loop[(i+2)%loop.length],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;
  const before=(ground(p.x,p.y)-ground(a.x,a.y))/Math.hypot(p.x-a.x,p.y-a.y),after=(ground(b.x,b.y)-ground(p.x,p.y))/Math.hypot(b.x-p.x,b.y-p.y),bank=Math.abs(ground(p.x+nx*30,p.y+ny*30)-ground(p.x-nx*30,p.y-ny*30))/60;
  if(before-after>.045)candidates.push({...p,index:i,name:'Crest',strength:before-after});
  if(bank>.12)candidates.push({...p,index:i,name:'Bank',strength:bank});
 }
 candidates.sort((a,b)=>b.strength-a.strength);
 for(const name of ['Crest','Bank','Crest','Bank']){const p=candidates.find(p=>p.name===name&&!terrainFeatures.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<300));if(p)terrainFeatures.push(p);}

 const posts=[];for(const p of terrainFeatures){box(posts,p.x+18,p.y,ground(p.x+18,p.y),2,2,22,[.45,.64,.60]);box(posts,p.x+18,p.y,ground(p.x+18,p.y)+17,2,2,5,[1,.76,.32]);}const featurePosts=gpu.upload(new Float32Array(posts));
 const lip=[];for(let u=-125;u<125;u+=25){const p=(s,v)=>{const q=c.point(s,v);return [q.x,q.y,c.height(s,v)+.35];};triangle(lip,p(c.lip-12,u),p(c.lip,u),p(c.lip-12,u+16),[1,.76,.32]);triangle(lip,p(c.lip,u),p(c.lip,u+16),p(c.lip-12,u+16),[1,.76,.32]);}const lipMesh=gpu.upload(new Float32Array(lip));
 return {lines,features,terrainFeatures,draw(state,mode,run){
  if(mode==='roam'){ribbons.slalom.draw(state);ribbons.crater.draw(state);}else ribbons[mode].draw(state);
  if(mode!=='slalom')gpu.mesh(featurePosts,[0,0,0,100],7);
  gpu.mesh(arrows[mode==='roam'?'crater':mode],[0,0,0,100],7);if(mode==='slalom'||mode==='roam')gpu.mesh(lipMesh,[0,0,0,100],7);
  const canvas=document.querySelector('#labels'),ctx=canvas.getContext('2d'),w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.save();ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#172326';
  // Only the next landmark; no permanent panel obscuring the slope.
  const closest=loop.reduce((best,p,i)=>Math.hypot(p.x-state.x,p.y-state.y)<Math.hypot(loop[best].x-state.x,loop[best].y-state.y)?i:best,0),near=loop[closest];
  const terrainNext=terrainFeatures.map(p=>({...p,ahead:(p.index-closest+loop.length)%loop.length})).filter(p=>p.ahead>1).sort((a,b)=>a.ahead-b.ahead)[0];
  const next=mode==='slalom'?features.find(p=>p.s>(run?.s??0)+15):Math.hypot(near.x-state.x,near.y-state.y)>140?{...near,name:'Trail'}:terrainNext;
  if(next&&(mode==='slalom'||Math.hypot(next.x-state.x,next.y-state.y)<1000)){const q=gpu.project(next.x,next.y,ground(next.x,next.y)+34),d=Math.hypot(next.x-state.x,next.y-state.y),name=next.name+' · '+Math.round(d/(8/3))+' m';
   if(q.depth>1&&q.x>45&&q.x<w-45&&q.y>45&&q.y<h-95){ctx.strokeText(name,q.x,q.y);ctx.fillStyle=next.name==='Big jump'?'#ffe098':'#d6f4dc';ctx.fillText(name,q.x,q.y);}
   else{const angle=Math.atan2(next.x-state.x,-(next.y-state.y))-state.heading,text=(Math.cos(angle)<-.35?'↶ ':Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)))<.35?'↑ ':Math.sin(angle)<0?'← ':'→ ')+next.name;ctx.strokeText(text,w/2,55);ctx.fillStyle='#d6f4dc';ctx.fillText(text,w/2,55);}}
  ctx.restore();
 }};
}

import {WORLD,mountainFaces} from './landscape.mjs';
import {delta} from './regions.mjs';
import {vehicle} from './vehicles.mjs';
import {updateCamera} from './camera.mjs';
import {buildScenery,noise,sedimentColor} from './scenery.js';
import {mesa,rocks,samples,ground,angle} from './sim.mjs';
export class Renderer {
 constructor(canvas,terrain){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.terrain=terrain;this.camera=null;this.dust=[];this.tracks=[];this.scenery=buildScenery();}
 reset(s){this.camera={x:s.x,y:s.y,h:s.heading};this.dust=[];this.tracks=[];this.gateFlash=null;}
 draw(s,course,dt){const c=this.canvas,ctx=this.ctx,w=c.clientWidth,h=c.clientHeight,dpr=Math.min(devicePixelRatio,1.5);if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);if(!this.camera)this.reset(s);const cam=this.camera;const {back,lift}=updateCamera(cam,s,dt);
 const focal=Math.min(w*.95,h*.9),co=Math.cos(cam.h),si=Math.sin(cam.h),cx=w/2;
 const eye=23+ground(s.x,s.y)+lift;
 // Compensate tilt as the camera rises so the rover holds its screen position.
 const horizon=h*.38-lift*focal/back;
 const cameraX=cam.x-si*back,cameraY=cam.y+co*back;
 const solar=s.solar,alt=solar?.elevation??.7,az=solar?.azimuth??-2.45,degrees=alt*180/Math.PI;
 const light=degrees< -6?'night':degrees<8?((solar?.solarHour??12)<12?'dawn':'dusk'):'day',night=degrees< -6,twilight=degrees>=-10&&degrees<12;
 const day=Math.max(0,Math.min(1,(degrees+2)/24)),glow=Math.max(0,1-Math.abs(degrees+2)/12);
 const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),rgb=a=>`rgb(${a.map(v=>Math.round(v))})`;
 const skyTop=mix(mix([7,6,12],[88,58,54],glow),[124,74,46],day),skyHorizon=mix(mix([34,33,44],[196,140,100],glow),[232,186,142],day);
 const ambient=.32+.68*day,litSun=alt>0;
 const palette=[rgb(skyTop),rgb(skyHorizon),ambient];
 const sunlight=solar?[solar.east,-solar.north,solar.up]:[-.45,-.6,.66];

 const project=(x,y,z=0)=>{const depth=(x-cameraX)*si-(y-cameraY)*co,right=(x-cameraX)*co+(y-cameraY)*si,up=eye-z;return {x:cx+right*focal/Math.max(3,depth),y:horizon+up*focal/Math.max(3,depth),depth,right,up};};this.project=project;
 const scale=focal/back*.6,tilt=.5;
 const sky=ctx.createLinearGradient(0,0,0,horizon);sky.addColorStop(0,palette[0]);sky.addColorStop(1,palette[1]);ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
 const sunBearing=angle(az-cam.h),sunX=w/2+Math.tan(sunBearing)*focal,sunY=horizon-focal*Math.tan(alt)/Math.max(.001,Math.cos(sunBearing));
 if(litSun&&Math.abs(sunBearing)<1.3&&sunY> -h*.2&&sunY<horizon-12){const halo=ctx.createRadialGradient(sunX,sunY,2,sunX,sunY,h*.14);halo.addColorStop(0,twilight?'#9bb9df88':'#ffeedc45');halo.addColorStop(1,'#ffdfb900');ctx.fillStyle=halo;ctx.fillRect(0,0,w,horizon);ctx.fillStyle='#ffe5c7b0';ctx.beginPath();ctx.arc(sunX,sunY,Math.max(3,h*.007),0,Math.PI*2);ctx.fill();}
 if(night||twilight){for(let i=0;i<90;i++){const a=i*2.399963-cam.h,x=w/2+Math.tan(angle(a))*focal,y=horizon*(.05+noise(i,2)*.85);if(Math.abs(angle(a))>1.3)continue;ctx.fillStyle=night?'#c9dae399':'#e6d5c43a';ctx.fillRect(x,y,i%9===0?2:1,1);}}
 const poly=(points,fill,stroke)=>{let clipped=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];if(a.depth>=3)clipped.push(a);if((a.depth>=3)!==(b.depth>=3)){const t=(3-a.depth)/(b.depth-a.depth),right=a.right+(b.right-a.right)*t,up=a.up+(b.up-a.up)*t;clipped.push({x:cx+right*focal/3,y:horizon+up*focal/3,depth:3,right,up});}}if(clipped.length<3)return;ctx.beginPath();clipped.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke();}};
 // World-space mountains: distance changes apparent size and atmospheric haze.
 const mountains=mountainFaces.map(vertices=>{const points=vertices.map(p=>project(...p));return {points,shade:.8+Math.abs(vertices[0][0]%31)/160,depth:points.reduce((a,p)=>a+p.depth,0)/points.length};}).filter(f=>f.depth>3).sort((a,b)=>b.depth-a.depth);
 for(const face of mountains){const haze=Math.min(.92,face.depth/6500),shade=face.shade;poly(face.points,rgb(mix([151*shade*ambient,104*shade*ambient,76*shade*ambient],skyHorizon,haze)));}
 // Terrain is generated in bounded spatial chunks, retained only around the rover.
 this.tileCache??=new Map();const chunkX=Math.floor(s.x/240),chunkY=Math.floor(s.y/240);
 if(this.chunkKey!==`${chunkX},${chunkY}`||!this.mesh){this.chunkKey=`${chunkX},${chunkY}`;const active=new Set();this.mesh=[];
  for(let cy=chunkY-7;cy<=chunkY+7;cy++)for(let cx=chunkX-7;cx<=chunkX+7;cx++){
   const key=`${cx},${cy}`;active.add(key);let tiles=this.tileCache.get(key);
   if(!tiles){tiles=[];for(let j=0;j<10;j++)for(let i=0;i<10;i++){const x=cx*240+i*24,y=cy*240+j*24,corners=[[x,y],[x+24,y],[x+24,y+24],[x,y+24]].map(([x,y])=>[x,y,ground(x,y)]);tiles.push({x:x+12,y:y+12,corners,normal:[-(corners[1][2]-corners[0][2])/24,-(corners[3][2]-corners[0][2])/24,1],color:sedimentColor(x+12,y+12)});}this.tileCache.set(key,tiles);}
   this.mesh.push(...tiles);
  }
  for(const key of this.tileCache.keys())if(!active.has(key))this.tileCache.delete(key);
 }
 if(delta&&!this.deltaBuilt){this.deltaBuilt=true;this.scenery=buildScenery();this.chunkKey=null;this.tileCache?.clear();}
 const visible=[];for(const tile of this.mesh){const depth=(tile.x-cameraX)*si-(tile.y-cameraY)*co,right=(tile.x-cameraX)*co+(tile.y-cameraY)*si;if(depth< -34||depth>1450||Math.abs(right)>depth*w/focal*.6+45)continue;visible.push({tile,d:depth});}visible.sort((a,b)=>b.d-a.d);
 for(const {tile,d} of visible){const fog=Math.min(.93,Math.max(0,d-100)/1450),rgb=tile.color.map((v,i)=>Math.round(v*(ambient*.86+(litSun?Math.max(0,tile.normal[0]*sunlight[0]+tile.normal[1]*sunlight[1]+sunlight[2])*.14:0))*(1-fog)+(night?[39,37,47]:light==='dusk'?[163,120,105]:light==='dawn'?[193,144,124]:[222,172,132])[i]*fog)),color=`rgb(${rgb})`,v=tile.corners.map(p=>project(...p));poly(v,color,color);}
 // Feathered sediment ribbons follow the approved route without a road edge.
 if(!this.paths){this.paths=[];const routes=[course.route.filter((_,i)=>i%3===0),[{x:241,y:423},{x:280,y:441},{x:352,y:459},{x:418,y:502},{x:463,y:520},{x:535,y:518},{x:616,y:491}], [{x:906,y:474},{x:948,y:442},{x:982,y:360},{x:985,y:280},{x:979,y:161}], [{x:864,y:497},{x:898,y:537},{x:921,y:566},{x:943,y:604},{x:953,y:656}], [{x:238,y:377},{x:246,y:306},{x:235,y:235},{x:228,y:164},{x:225,y:112}], [{x:638,y:551},{x:706,y:563},{x:767,y:567}],Array.from({length:218},(_,i)=>({x:950+i*24,y:470+Math.sin(i*.045)*14}))];for(const points of routes)for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],length=Math.hypot(b.x-a.x,b.y-a.y),nx=-(b.y-a.y)/length,ny=(b.x-a.x)/length;for(const width of [25,19,13]){const k=width*(.85+Math.sin(i*.23)*.1);this.paths.push([[a.x+nx*k,a.y+ny*k],[b.x+nx*k,b.y+ny*k],[b.x-nx*k,b.y-ny*k],[a.x-nx*k,a.y-ny*k]].map(([x,y])=>[x,y,ground(x,y)+.015]));}}}
 for(const ribbon of this.paths){const q=project(...ribbon[0]);if(q.depth<5||q.depth>650||q.x< -160||q.x>w+160)continue;poly(ribbon.map(p=>project(...p)),'#dcaa7509');}
 const litFace=face=>{if(!face.base)return face.color;const n=face.normal;const direct=Math.max(0,n[0]*sunlight[0]+n[1]*sunlight[1]+n[2]*sunlight[2]);return rgb(face.base.map(v=>v*(ambient*.77+(litSun?.36*direct:0))));};
 const objects=[];
 if(this.gateFlash){const g=this.gateFlash;g.life=Math.max(0,g.life-dt);const q=project(g.x,g.y);if(g.life>0&&q.depth>4)objects.push({depth:q.depth,draw:()=>{ctx.strokeStyle=`rgba(224,239,176,${g.life/.7})`;ctx.lineWidth=4;for(const side of [-1,1]){const x=g.x-g.dy*42*side,y=g.y+g.dx*42*side,a=project(x,y,ground(x,y)),b=project(x,y,ground(x,y)+10);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}});if(g.life===0)this.gateFlash=null;}

 if(night){const sh=Math.sin(s.heading),ch=Math.cos(s.heading),origin=project(s.x+sh*8,s.y-ch*8,s.z+1);for(let band=5;band>=1;band--){const spread=25+band*9;const points=[origin,project(s.x+sh*155-ch*spread,s.y-ch*155-sh*spread,ground(s.x+sh*155-ch*spread,s.y-ch*155-sh*spread)),project(s.x+sh*155+ch*spread,s.y-ch*155+sh*spread,ground(s.x+sh*155+ch*spread,s.y-ch*155+sh*spread))];poly(points,'#f3d5a907');}}


 // Projected ground markings: shallow channels, sand ripples and sample fragments.
 ctx.globalAlpha=.3+.7*day;for(const stain of this.scenery.stains){const p=stain.vertices[0],q=project(...p);if(q.depth<5||q.depth>800||q.x< -100||q.x>w+100)continue;poly(stain.vertices.map(p=>project(...p)),stain.color);}ctx.globalAlpha=1;
 // Directional shadows tie the outcrops to the ground without adding obstacles.
 const shadowRing=(ring,height)=>{if(!litSun)return;const length=Math.min(160,height/Math.max(.08,Math.tan(alt))),dx=-Math.sin(az)*length,dy=Math.cos(az)*length;const vertices=ring.map(([x,y])=>project(x+dx,y+dy,ground(x+dx,y+dy)+.06));poly(vertices,`rgba(38,28,28,${.12+.1*day})`);for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length];poly([project(...a,ground(...a)+.06),project(...b,ground(...b)+.06),vertices[(i+1)%ring.length],vertices[i]],'#261c1c0a');}};
 shadowRing(mesa,22.5);
 for(const [x,y,r]of rocks){const q=project(x,y);if(q.depth>3&&q.depth<600)shadowRing(Array.from({length:9},(_,i)=>[x+Math.cos(i*6.283/9)*r,y+Math.sin(i*6.283/9)*r]),r*.65);}
 for(const face of this.scenery.faces){const points=face.vertices.map(p=>project(...p)),depth=points.reduce((a,p)=>a+p.depth,0)/points.length;if(depth< -30||depth>1200)continue;objects.push({depth,draw:()=>poly(points,litFace(face))});}
 // Twin wheel prints record the actual route taken, including free exploration.
 const lastTrack=this.tracks.at(-1);if(!s.air&&Math.abs(s.v)>2&&(!lastTrack||Math.hypot(s.x-lastTrack.x,s.y-lastTrack.y)>2.6))this.tracks.push({x:s.x,y:s.y,h:s.heading});if(this.tracks.length>450)this.tracks.shift();
 for(let i=1;i<this.tracks.length;i++){const a=this.tracks[i-1],b=this.tracks[i];if(Math.hypot(a.x-b.x,a.y-b.y)>9)continue;const q=project(b.x,b.y);if(q.depth<4||q.depth>400)continue;for(const side of [-1,1]){const ribbon=[];for(const [p,k] of [[a,-.7],[b,-.7],[b,.7],[a,.7]]){const offset=side*5.4+k,x=p.x+Math.cos(p.h)*offset,y=p.y+Math.sin(p.h)*offset;ribbon.push(project(x,y,ground(x,y)+.05));}poly(ribbon,`rgba(83,48,31,${.13*Math.min(1,i/60)})`);}}
 // Small world-anchored fragments supply motion and scale without a painted surface.
 if(!this.gravel){this.gravel=[];let seed=47;const rnd=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);for(let i=0;i<16000;i++){const x=rnd()*(WORLD.width+600)-300,y=rnd()*1360-300;this.gravel.push({x,y,r:.15+rnd()*.55});}}
 for(const p of this.gravel){const depth=(p.x-cameraX)*si-(p.y-cameraY)*co;if(depth<8||depth>300)continue;const q=project(p.x,p.y,ground(p.x,p.y));if(q.depth<8||q.depth>300||q.x<0||q.x>w||q.y>h)continue;const r=p.r*focal/q.depth;ctx.fillStyle='#633c2b66';ctx.beginPath();ctx.ellipse(q.x,q.y,r,r*.38,0,0,Math.PI*2);ctx.fill();}
 if(s.mode!=='trial'){samples.forEach((p,i)=>{const collected=s.collected.includes(i),q=project(p.x,p.y,ground(p.x,p.y));if(q.depth<4)return;const localScale=focal/q.depth;objects.push({depth:q.depth-.3,draw:()=>{const near=Math.hypot(p.x-s.x,p.y-s.y)<90,color=collected?'#b5d5ba':'#f3d9a0';ctx.strokeStyle=collected?'#b5d5ba88':'#efd49a99';ctx.lineWidth=1.5;const ring=Array.from({length:33},(_,j)=>{const a=j*Math.PI*2/32,x=p.x+Math.cos(a)*32,y=p.y+Math.sin(a)*32;return project(x,y,ground(x,y)+.08);});ctx.beginPath();ring.forEach((p,j)=>j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();const post=project(p.x,p.y,ground(p.x,p.y)+5);ctx.strokeStyle='#c1ae8f';ctx.lineWidth=Math.max(1,localScale*.6);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(post.x,post.y);ctx.stroke();ctx.fillStyle=color;ctx.beginPath();ctx.arc(post.x,post.y,Math.min(4,Math.max(2,localScale*1.3)),0,Math.PI*2);ctx.fill();if(!collected){ctx.font='12px Public,Arial';ctx.textAlign='center';const label=near?p.name:`0${i+1}`,tw=ctx.measureText(label).width;ctx.fillStyle='#392d25b0';ctx.fillRect(post.x-tw/2-7,post.y-28,tw+14,20);ctx.fillStyle=color;ctx.fillText(label,post.x,post.y-14);}if(s.collecting===i){ctx.strokeStyle='#e9e1b1';ctx.lineWidth=3;ctx.beginPath();ctx.arc(post.x,post.y-18,12,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,s.collectTime/1.4));ctx.stroke();}}});});}

 else {const gate=s.nextGate<6?course.gates[s.nextGate]:course.finish;const q=project(gate.x,gate.y);if(q.depth>4)objects.push({depth:q.depth,draw:()=>{const color='#bce9d0';ctx.strokeStyle=color;ctx.lineWidth=3;for(const side of [-1,1]){const x=gate.x-gate.dy*42*side,y=gate.y+gate.dx*42*side,a=project(x,y,ground(x,y)),b=project(x,y,ground(x,y)+10);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}const left=project(gate.x-gate.dy*42,gate.y+gate.dx*42,ground(gate.x-gate.dy*42,gate.y+gate.dx*42)+10),right=project(gate.x+gate.dy*42,gate.y-gate.dx*42,ground(gate.x+gate.dy*42,gate.y-gate.dx*42)+10);ctx.setLineDash([5,8]);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(left.x,left.y);ctx.lineTo(right.x,right.y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=color;ctx.font='14px Public,Arial';ctx.textAlign='center';ctx.fillText(s.nextGate<6?`${s.nextGate+1} / 6`:'FINISH',q.x,q.y-38);}});}
 // A small discoverable instrument in the dune pocket.
 const iq=project(767,567,ground(767,567));objects.push({depth:iq.depth,draw:()=>{if(iq.depth<4||iq.depth>700)return;
  const z=ground(767,567),base=[[764,565],[770,565],[770,569],[764,569]];
  poly(base.map(([x,y])=>project(x,y,z+3)),s.found?'#8cd6c2':'#c2b696');
  poly([project(764,569,z),project(770,569,z),project(770,569,z+3),project(764,569,z+3)],'#88745c');
  const a=project(767,567,z+3),b=project(768,567,z+9);ctx.strokeStyle='#cfccb4';ctx.lineWidth=Math.max(.6,focal/iq.depth*.35);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}});
 if(Math.abs(s.v)>15&&!s.air){for(let i=0;i<(s.boost?2:1);i++)this.dust.push({x:s.x-Math.sin(s.heading)*12+Math.cos(s.heading)*i*5,y:s.y+Math.cos(s.heading)*12+Math.sin(s.heading)*i*5,life:1,boost:!!s.boost});}this.dust=this.dust.filter(p=>(p.life-=dt*.9)>0).slice(-60);for(const d of this.dust){const q=project(d.x,d.y);if(q.depth<4)continue;ctx.fillStyle=`rgba(215,180,130,${d.life*(d.boost?.15:.12)})`;ctx.beginPath();ctx.ellipse(q.x,q.y,(1-d.life)*(d.boost?35:25)+4,(1-d.life)*(d.boost?15:10)+2,0,0,Math.PI*2);ctx.fill();}
 const rover=project(s.x,s.y,s.z);objects.push({depth:rover.depth,draw:()=>{const model=vehicle(s.roverId),large=model.family==='large',wing=model.family==='solar';const bodyScale=large?.6:wing?.55:.4,wheelScale=scale*bodyScale/.6;const ch=Math.cos(s.heading),sh=Math.sin(s.heading);const at=(x,y,z=0)=>project(s.x+(x*ch+y*sh)*bodyScale,s.y+(x*sh-y*ch)*bodyScale,s.z+z*bodyScale);const body=(corners,z,color)=>poly(corners.map(([x,y])=>at(x,y,z)),color,'#c9ba90');const shadow=project(s.x,s.y,ground(s.x,s.y));ctx.fillStyle='#322f2a55';ctx.beginPath();ctx.ellipse(shadow.x,shadow.y,13*wheelScale,7*wheelScale,0,0,Math.PI*2);ctx.fill();for(const y of [-10,0,10]){const a=at(-9,y,1),b=at(9,y,1);ctx.strokeStyle='#bdb59b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();for(const x of [-9,9]){const v=at(x,y,1);ctx.fillStyle='#293433';ctx.strokeStyle='#9b9d89';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(v.x,v.y,2.8*wheelScale,4*wheelScale,angle(s.heading-cam.h)*.5,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#8b8977';ctx.lineWidth=.8;ctx.beginPath();for(let j=0;j<4;j++){const phase=(s.x+s.y)*.12+j*Math.PI/2;ctx.moveTo(v.x,v.y);ctx.lineTo(v.x+Math.cos(phase)*2.3*wheelScale,v.y+Math.sin(phase)*3.4*wheelScale);}ctx.stroke();}}
 body([[-7,-11],[7,-11],[7,11],[-7,11]],3,large?'#d4ccae':'#b7a175');
 const deck=large?[[-8,-9],[8,-9],[8,10],[-8,10]]:wing?[[-15,-3],[-10,-10],[10,-10],[15,-3],[15,3],[10,10],[-10,10],[-15,3]]:[[-10,-8],[10,-8],[10,9],[-10,9]];
 body(deck,5,large?'#dcd6c3':'#294f5e');
 if(!large){ctx.strokeStyle='#88a4ab';ctx.lineWidth=1;for(const y of [-3,3]){const a=at(-10,y,5.1),b=at(10,y,5.1);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}for(const x of [-5,0,5]){const a=at(x,-8,5.1),b=at(x,9,5.1);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
 else{
  poly([at(-8,-9,3),at(8,-9,3),at(8,-9,7),at(-8,-9,7)],'#a99f85','#d5cab0');
  body([[-8,-9],[8,-9],[8,10],[-8,10]],7,'#ded9c7');
  // Rear generator housing plus a small fictional ASTRA solar-boost panel.
  body([[-5,-12],[5,-12],[5,-5],[-5,-5]],10,'#8c8e87');
  for(let y=-10;y< -4;y+=1.5){const a=at(-5,y,10.2),b=at(5,y,10.2);ctx.strokeStyle='#dfd8be';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  body([[-8,-2],[-3,-2],[-3,7],[-8,7]],7.2,'#294f5e');
 }
 const a=at(0,7,5),b=at(0,7,large?20:wing?18:6);ctx.strokeStyle='#d9cbaa';ctx.lineWidth=large?5:3;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
 const head=model.id==='perseverance'?12:large?9:wing?7:4;ctx.fillStyle=large?'#d6d3c6':'#d6c7a4';ctx.fillRect(b.x-head,b.y-4,head*2,7);ctx.fillStyle='#20393d';ctx.fillRect(b.x-head+2,b.y-2,4,4);if(large||wing)ctx.fillRect(b.x+head-6,b.y-2,4,4);
 // Camera/dish details distinguish the rover families; twin rovers share their silhouette.
 if(large||wing){const dish=at(large?5:6,-2,8);ctx.fillStyle='#d3cfbd';ctx.beginPath();ctx.ellipse(dish.x,dish.y,scale*3,scale*1.5,0,0,Math.PI*2);ctx.fill();}
 if(model.id==='perseverance'){body([[1,-2],[7,-2],[7,6],[1,6]],8,'#47504c');for(const y of [0,3]){const tube=at(4,y,8.5);ctx.strokeStyle='#d8c49b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tube.x-5,tube.y);ctx.lineTo(tube.x+5,tube.y);ctx.stroke();}}
 if(s.collecting>=0){const arm=at(13+Math.sin(s.collectTime*4)*3,10,3);ctx.strokeStyle='#d9ca9b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(arm.x,arm.y);ctx.stroke();}if(s.boost){const v=at(0,-11,5);ctx.fillStyle='#9beace';ctx.shadowColor='#82eec5';ctx.shadowBlur=12;ctx.fillRect(v.x-6,v.y,12,3);ctx.shadowBlur=0;}}});objects.sort((a,b)=>b.depth-a.depth).forEach(o=>o.draw());
 // Direction cue is only shown when the objective is outside the useful forward view.
 let target;if(s.mode==='trial')target=s.nextGate<6?course.gates[s.nextGate]:course.finish;else target=samples.filter((p,i)=>!s.collected.includes(i)).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];
 if(target&&!s.done){const q=project(target.x,target.y);if(q.depth<4||q.x<45||q.x>w-45||q.y<90||q.y>h-180){const dx=q.depth<4?Math.sign(q.right)*w:q.x-w/2,dy=q.depth<4?h:q.y-h*.52,lim=Math.min((w/2-32)/Math.max(Math.abs(dx),1),(h*.32)/Math.max(Math.abs(dy),1)),x=w/2+dx*lim,y=h*.5+dy*lim;ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(dy,dx));ctx.fillStyle='#dceac5';ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-7,-7);ctx.lineTo(-7,7);ctx.closePath();ctx.fill();ctx.restore();}}
 if(s.boost){const glow=ctx.createRadialGradient(w/2,h*.55,w*.18,w/2,h*.55,w*.7);glow.addColorStop(0,'#79d7ce00');glow.addColorStop(1,'#79d7ce25');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);}

 }
 minimap(canvas,s,course){const c=canvas.getContext('2d'),left=Math.max(0,Math.min(WORLD.width-1350,s.x-675));c.clearRect(0,0,216,152);c.fillStyle='#926243';c.fillRect(0,0,216,152);c.save();c.scale(.16,.16);c.translate(-left,0);c.fillStyle='#b68c64';for(const poly of [mesa,...(delta?.mesas??[])]){c.beginPath();poly.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();}c.strokeStyle='#e1c28d55';c.lineWidth=18;c.beginPath();c.moveTo(960,470);c.lineTo(6200,490);c.stroke();samples.forEach((p,i)=>{c.fillStyle=s.collected.includes(i)?'#82b79d':'#f1d387';c.beginPath();c.arc(p.x,p.y,14,0,Math.PI*2);c.fill();});c.translate(s.x,s.y);c.rotate(s.heading);c.fillStyle='#e5fff0';c.beginPath();c.moveTo(0,-24);c.lineTo(-15,15);c.lineTo(15,15);c.closePath();c.fill();c.restore();c.fillStyle='#f0e7d2';c.font='10px Public';c.fillText('N ↑ · MAP',7,14);}
}

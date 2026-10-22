// Geographic annotations use existing tour/region anchors, not target positions.
export function flightSites(course){
 if(course.id==='kodiak-approach')return [
  {id:'landing',name:'Octavia E. Butler Landing',x:13055.669,y:7905.586},
  {id:'kodiak',name:'Kodiak',x:5427.2,y:8832,rise:12},
  {id:'delta',name:'Delta front',x:4096,y:6208},
  {id:'three-forks',name:'Three Forks',x:5418.517,y:6237.862}
 ];
 if(course.id==='western-frontier')return [{id:'rover',name:'Perseverance · sol '+course.roverSnapshot.sol,...course.roverSnapshot},{...course.finish,id:'crater',name:'Northwest crater'}];
 return [{id:'neretva',name:'Neretva Canyon',x:-17000,y:-1880}];
}
export function flightSitePoint(site,gpu,area,w,h){
 const z=area.ground(site.x,site.y)+(site.rise??8),q=gpu.project(site.x,site.y,z),cam=gpu.lastCamera;
 if(!cam||q.depth<8||q.x<24||q.x>w-24||q.y<64||q.y>h-90)return null;
 const distance=Math.hypot(site.x-cam.x,site.y-cam.y);
 if(distance>13000||(gpu.storm?.density(site.x,site.y)??0)>.45)return null;
 for(let i=1;i<40;i++){const t=i/40;if(area.ground(cam.x+(site.x-cam.x)*t,cam.y+(site.y-cam.y)*t)>cam.eye+(z-cam.eye)*t+4)return null;}
 return q;
}
export function createFlightLabels(course){
 const root=document.createElement('div');root.id='ingenuity-flight-sites';root.setAttribute('aria-hidden','true');root.hidden=true;document.body.append(root);
 const labels=flightSites(course).map(site=>{const el=document.createElement('div');el.className='ingenuity-flight-site';el.dataset.site=site.id;const circle=document.createElement('i'),text=document.createElement('span');text.textContent=site.name;el.append(circle,text);root.append(el);return {site,el};});
 return {hide(){root.hidden=true;},draw(gpu,area,enabled,target){root.hidden=!enabled;if(!enabled)return;const rect=gpu.canvas.getBoundingClientRect(),w=rect.width,h=rect.height,used=[];let count=0;
  for(const {site,el}of labels){const q=flightSitePoint(site,gpu,area,w,h);el.hidden=true;if(!q||count>=2)continue;
   if(target){const t=gpu.project(target.x,target.y,target.z);if(t.depth>0&&Math.hypot(t.x-q.x,t.y-q.y)<110)continue;}
   const left=q.x>w-190,box={x:left?q.x-180:q.x-12,y:q.y-20,w:192,h:38};
   if(used.some(b=>Math.abs((b.x+b.w/2)-(box.x+box.w/2))<(b.w+box.w)/2&&Math.abs(b.y-box.y)<42))continue;
   used.push(box);count++;el.hidden=false;el.classList.toggle('label-left',left);el.style.left=(rect.left+q.x)+'px';el.style.top=(rect.top+q.y)+'px';
  }
 }};
}

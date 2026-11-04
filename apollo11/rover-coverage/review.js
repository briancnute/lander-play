const $=id=>document.getElementById(id),canvas=$('map'),c=canvas.getContext('2d');
let data,manifest,paths=[],stations=[],relief,scale=1,ox=0,oy=0,token=0,hover=null;
const touches=new Map();let lastSpan=0;
function size(){canvas.width=Math.round(canvas.clientWidth*devicePixelRatio);canvas.height=Math.round(canvas.clientHeight*devicePixelRatio);fit();}
function fit(){if(!data)return;const b=data.boundary;scale=Math.min((canvas.width-80)/(b.east-b.west),(canvas.height-80)/(b.north-b.south));ox=canvas.width/2-(b.east+b.west)/2*scale;oy=canvas.height/2+(b.north+b.south)/2*scale;draw();}
const xy=p=>[ox+p.east*scale,oy-p.north*scale];
function draw(){
 c.fillStyle='#182023';c.fillRect(0,0,canvas.width,canvas.height);if(!data)return;
 const b=data.boundary,[x,y]=xy({east:b.west,north:b.north});
 if(relief)c.drawImage(relief,x,y,(b.east-b.west)*scale,(b.north-b.south)*scale);
 if($('routes').checked){c.strokeStyle='#dedec7';c.lineWidth=1.3*devicePixelRatio;c.globalAlpha=.8;c.beginPath();for(const p of paths)p.forEach(([east,north],i)=>{const [x,y]=xy({east,north});if(i)c.lineTo(x,y);else c.moveTo(x,y)});c.stroke();c.globalAlpha=1;}
 if($('boundary').checked){c.strokeStyle='#f0b969';c.lineWidth=2*devicePixelRatio;c.strokeRect(x,y,(b.east-b.west)*scale,(b.north-b.south)*scale);}
 if($('stations').checked){c.font=`${12*devicePixelRatio}px system-ui`;for(const s of stations){const [x,y]=xy(s);c.fillStyle=s===hover?'#fff':'#f0c78c';c.beginPath();c.arc(x,y,(s===hover?5:3)*devicePixelRatio,0,7);c.fill();if(s===hover||s.id==='lm'){c.fillText(s.name??s.id,x+7*devicePixelRatio,y-6*devicePixelRatio);}}}
 c.fillStyle='#fff';c.font=`${14*devicePixelRatio}px system-ui`;c.fillText('N ↑',16*devicePixelRatio,26*devicePixelRatio);
 const metres=(data.boundary.east-data.boundary.west)>8000?2000:1000,w=metres*scale;
 c.fillRect(16*devicePixelRatio,canvas.height-26*devicePixelRatio,w,2*devicePixelRatio);c.fillText(`${metres/1000} km`,16*devicePixelRatio,canvas.height-34*devicePixelRatio);
}
async function load(){
 const active=++token,m=$('mission').value,geography=m==='17'?'../footprints/17.json':`../rover-terrain/${m}-geography.json`,terrain=m==='17'?'../terrain17/manifest.json':`../rover-terrain/${m}/manifest.json`;
 $('status').textContent='Loading source terrain…';$('play').href=`../?region=${m}&activity=free-ride`;
 try{
  const request=async url=>{const r=await fetch(url);if(!r.ok)throw Error(`${r.status}: ${url}`);return r;};
  const [g,t]=await Promise.all([request(geography).then(r=>r.json()),request(terrain).then(r=>r.json())]);
  const bytes=await request(new URL(t.url,new URL(terrain,location.href))).then(r=>r.arrayBuffer());if(active!==token)return;
  data=g;manifest=t;stations=g.stations;paths=m==='17'?g.routes.flatMap(r=>r.segments):g.routes.map(r=>r.points);
  const heights=t.encoding==='int16-le'?new Int16Array(bytes):new Float32Array(bytes),b=g.boundary;
  const height=(east,north)=>{const i=Math.max(0,Math.min(t.width-1,Math.round((east-t.bounds.west)/t.gridStepM))),j=Math.max(0,Math.min(t.height-1,Math.round((t.bounds.north-north)/t.gridStepM)));return heights[j*t.width+i]*t.heightScaleM+t.heightOffsetM;};
  relief=document.createElement('canvas');relief.width=600;relief.height=Math.round(600*(b.north-b.south)/(b.east-b.west));
  const rc=relief.getContext('2d'),pixels=rc.createImageData(relief.width,relief.height),sample=Math.max(t.gridStepM,(b.east-b.west)/600);
  for(let j=0;j<relief.height;j++)for(let i=0;i<relief.width;i++){
   const x=b.west+(i+.5)/relief.width*(b.east-b.west),n=b.north-(j+.5)/relief.height*(b.north-b.south),dx=(height(x+sample,n)-height(x-sample,n))/(2*sample),dn=(height(x,n+sample)-height(x,n-sample))/(2*sample),light=(1-dx*.8+dn*.4)/Math.hypot(1,dx,dn),shade=Math.max(20,Math.min(210,50+light*115));
   pixels.data.set([shade,shade,shade*.94,255],(j*relief.width+i)*4);
  }
  rc.putImageData(pixels,0,0);
  const sourceSpacing=t.sourceGridStepM?` (${Math.round(t.sourceGridStepM)} m source)`:'';
  $('status').textContent=`Apollo ${m} · ${(b.east-b.west)/1000} × ${(b.north-b.south)/1000} km · ${t.gridStepM} m terrain grid${sourceSpacing} · ${paths.length} separate route components`;
  $('geography').href=geography;$('manifest').href=terrain;$('audit').href=new URL(t.auditFile??'audit.json',new URL(terrain,location.href));
  // Open the explanatory source page, not Apollo17's multi-gigabyte archive.
  $('source').href=g.source?.page??g.routes?.[0]?.sourceUrl??g.source?.url??g.sourceArchive.url;hover=null;fit();
  history.replaceState(null,'',`?region=${m}`);
 }catch(error){if(active===token)$('status').textContent=`Could not load the retained source: ${error.message}`;}
}
function pointer(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*devicePixelRatio,y:(e.clientY-r.top)*devicePixelRatio};}
function zoom(factor,p){const next=Math.max(.002,Math.min(10,scale*factor)),ratio=next/scale;ox=p.x-(p.x-ox)*ratio;oy=p.y-(p.y-oy)*ratio;scale=next;draw();}
const span=()=>{const a=[...touches.values()];return a.length<2?0:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);};
canvas.onpointerdown=e=>{touches.set(e.pointerId,pointer(e));canvas.setPointerCapture(e.pointerId);lastSpan=span();};
canvas.onpointermove=e=>{
 const p=pointer(e),old=touches.get(e.pointerId);
 if(old){touches.set(e.pointerId,p);if(touches.size>1){const next=span();if(lastSpan&&next)zoom(next/lastSpan,p);lastSpan=next;}else{ox+=p.x-old.x;oy+=p.y-old.y;}draw();}
 else if(data){hover=stations.find(s=>{const[x,y]=xy(s);return Math.hypot(p.x-x,p.y-y)<12*devicePixelRatio;});$('readout').textContent=hover?`${hover.name??hover.id} · E ${Math.round(hover.east)} m / N ${Math.round(hover.north)} m`:'Drag to pan · Scroll or pinch to zoom';draw();}
};
canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=e=>{touches.delete(e.pointerId);lastSpan=span();};
canvas.onwheel=e=>{e.preventDefault();zoom(Math.exp(-e.deltaY*.001),pointer(e));};
for(const id of ['routes','stations','boundary'])$(id).onchange=draw;$('fit').onclick=fit;$('mission').onchange=load;
const selected=new URLSearchParams(location.search).get('region');if(['15','16','17'].includes(selected))$('mission').value=selected;
addEventListener('resize',size);size();load();

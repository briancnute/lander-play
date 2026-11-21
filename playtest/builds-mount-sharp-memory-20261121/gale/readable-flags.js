// Minimum screen-size pennants for distant flags; anchored to real world poles.
// Only the next two gates. Terrain occludes them; no line or steering assistance.
export function createReadableFlags(gpu,course){
 const poles=course.gates.map(g=>[-1,1].map(side=>{const u=g.u+side*g.half,p=course.point(g.s,u);return {...p,z:course.height(g.s,u)+24,side,color:g.color==='blue'?'#55caff':'#ff7350'};}));
 return {draw(run){
  const canvas=document.querySelector('#labels'),camera=gpu.lastCamera;if(!canvas||!camera||!run)return;
  const ctx=canvas.getContext('2d'),next=course.gates.map((_,i)=>i).filter(i=>!run.gates.includes(i)).slice(0,2);
  ctx.save();ctx.lineWidth=1;ctx.strokeStyle='#fff2d5';ctx.shadowColor='#402719';ctx.shadowBlur=2;
  for(const [order,index]of next.entries())for(const p of poles[index]){
   const q=gpu.project(p.x,p.y,p.z),foot=gpu.project(p.x,p.y,p.z-24);
   if(q.depth<5||q.depth>3300||q.x<12||q.x>canvas.width-12||q.y<65||q.y>canvas.height-85||Math.abs(foot.y-q.y)>18)continue;
   let blocked=false;for(let i=1;i<24;i++){const t=i/24;if(course.worldHeight(camera.x+(p.x-camera.x)*t,camera.y+(p.y-camera.y)*t)>camera.eye+(p.z-camera.eye)*t){blocked=true;break;}}
   if(blocked)continue;
   const w=order?6:9,h=order?7:10;ctx.fillStyle=p.color;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q.x+p.side*w,q.y+h*.5);ctx.lineTo(q.x,q.y+h);ctx.closePath();ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q.x,q.y+h+3);ctx.stroke();
  }
  ctx.restore();
 }};
}

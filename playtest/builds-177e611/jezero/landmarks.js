import {toGame} from './terrain.js';
// PIA24814 orbital locator matched to the isolated southern butte in the USGS
// terrain. Anchor is the northern summit sample, not a published survey point.
export const landmarks=[{id:'kodiak',name:'Kodiak',...toGame(196,-1260),rise:12,
 fact:'An isolated remnant of an ancient river delta. Its exposed layers helped reveal the history of Jezero’s lake.',
 detail:'The 2021 view appeared on the 5 November 2021 cover of Science. Its distant background is Jezero’s crater rim; the nearby cliffs north of Three Forks belong to the delta. Perseverance photographed this roughly 250-metre-wide butte from a distance. The image shows its layered cliffs in enhanced color. Kodiak is beyond this playtest’s driving boundary; you can study it from here.',
 image:'./assets/kodiak.jpg',imageAlt:'Enhanced-color Perseverance photograph of Kodiak’s layered, flat-topped butte',
 imageCredit:'NASA/JPL-Caltech/ASU/MSSS · 18 April 2021 · Enhanced color',
 source:'https://www.jpl.nasa.gov/images/pia24802-perseverance-captures-image-of-kodiak/',
 views:[{label:'2022 · Another view',image:'./assets/kodiak-sol415.jpg',imageAlt:'Mastcam-Z panorama of Kodiak on sol 415, showing its cliff face and sloping shoulder',imageCredit:'NASA/JPL-Caltech/ASU/MSSS · 20 April 2022 · Natural color mosaic; black margins are gaps in coverage',source:'https://mastcamz.asu.edu/galleries/sol-0415-kodiak-long-baseline-stereo-part1-01-mastcam-z-mosaic/'}]}];

export function visibleLandmark(p,gpu,area,w,h){
 const z=(area.visualGround??area.ground)(p.x,p.y)+(p.rise??12),q=gpu.project(p.x,p.y,z),cam=gpu.lastCamera;
 if(!cam||q.depth<=4||q.x<65||q.x>w-65||q.y<100||q.y>h-110)return null;
 const distance=Math.hypot(p.x-cam.x,p.y-cam.y);
 // Sample terrain/rock roofs at <= 8 game-unit spacing. Single label, capped
 // for portable cost; do not allow an unseen hill to acquire a floating name.
 const steps=Math.min(1600,Math.max(2,Math.ceil(distance/8)));
 for(let i=1;i<steps;i++){const t=i/steps,x=cam.x+(p.x-cam.x)*t,y=cam.y+(p.y-cam.y)*t;
 if((area.cameraSurface??area.ground)(x,y)>cam.eye+(z-cam.eye)*t)return null;}
 return q;
}
export class LandmarkLayer{
 constructor(root,onInspect,items=landmarks){this.root=root;this.items=items;this.buttons=items.map(p=>{const b=document.createElement('button');b.type='button';b.innerHTML='<i aria-hidden="true"></i><span></span>';b.querySelector('span').textContent=p.name;b.setAttribute('aria-label','Learn about '+p.name);b.hidden=true;b.onclick=e=>{e.stopPropagation();onInspect(p.id);};root.append(b);return b;});}
 hide(){for(const b of this.buttons)b.hidden=true;}
 draw(gpu,area,state,enabled,reserved){
 if(!enabled||!gpu.project){this.hide();return;}
 const w=gpu.canvas.clientWidth,h=gpu.canvas.clientHeight;
 this.items.forEach((p,i)=>{const b=this.buttons[i],q=visibleLandmark(p,gpu,area,w,h);
 const dark=(state.solar?.up??1)<0&&Math.hypot(state.x-p.x,state.y-p.y)>1000;
 if(!q||dark||(gpu.storm?.density(p.x,p.y)??0)>.45){b.hidden=true;return;}
 const meters=Math.hypot(state.x-p.x,state.y-p.y)/4;const text=b.querySelector('span');text.hidden=meters>700;text.style.fontSize=(9+6*Math.max(0,1-meters/700))+'px';
 const r={left:q.x-22,right:q.x+22,top:q.y-22,bottom:q.y+22};
 if(reserved.some(a=>r.left<a.right&&r.right>a.left&&r.top<a.bottom&&r.bottom>a.top)){b.hidden=true;return;}
 b.style.left=q.x+'px';b.style.top=q.y+'px';b.hidden=false;
 });
 }
}

import {skiCourse} from './ski-course.js';
import {countdownLaunch} from './murray-countdown-launch.js';
import {MURRAY_SHELF_NODES,MURRAY_SHELF_PATH} from './murray-shelves.js';
const U=8/3;
// Authored routes on separate measured parts of the northwest mountain flank.
// Relative bends share Murray's generous scale; these are not geographic feature boundaries.
const settings={
 torridon:{name:'Western traverse',origin:[-4800,-12800],angle:-.15,mirror:-1},
 gediz:{name:'Eastern flight',origin:[-2200,-14200],angle:.12,mirror:1},
};
function geometry(variant){
 const cfg=settings[variant],origin=MURRAY_SHELF_NODES[0];
 const knots=MURRAY_SHELF_NODES.map(([x,y],i)=>{const dx=(x-origin[0])*cfg.mirror+(i?Math.sin(i*.9)*28:0),dy=y-origin[1];return [(cfg.origin[0]+dx*Math.cos(cfg.angle)+dy*Math.sin(cfg.angle))*U,-(cfg.origin[1]-dx*Math.sin(cfg.angle)+dy*Math.cos(cfg.angle))*U];});
 const path=[],gates=[];let length=0;
 const add=p=>{const last=path.at(-1);if(last)length+=Math.hypot(p[0]-last[0],p[1]-last[1]);path.push(p);};
 for(let i=0;i<knots.length-1;i++){const a=knots[Math.max(0,i-1)],b=knots[i],c=knots[i+1],d=knots[Math.min(knots.length-1,i+2)],n=Math.ceil(Math.hypot(c[0]-b[0],c[1]-b[1])/8);for(let j=0;j<n;j++){const t=j/n;add([0,1].map(k=>i===0?b[k]+(c[k]-b[k])*t:.5*(2*b[k]+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t)));if(!j&&i)gates.push(length);}}
 add(knots.at(-1));const last=path.at(-2),end=path.at(-1),d=Math.hypot(end[0]-last[0],end[1]-last[1]),dx=(end[0]-last[0])/d,dy=(end[1]-last[1])/d;
 const jump=variant==='gediz',jumpMarker=length+650,finish=length+(jump?2100:0),extension=jump?3400:100;
 for(let s=20;s<=extension;s+=20)add([end[0]+dx*s,end[1]+dy*s]);
 return {path,gates,finish,jumpMarker:jump?jumpMarker:null};
}
export const MOUNTAIN_ROUTES=[{variant:'murray',name:'Murray turns',path:MURRAY_SHELF_PATH},...Object.entries(settings).map(([variant,cfg])=>({variant,name:cfg.name,...geometry(variant)}))];
export function mountainCourse(ground,variant){
 const cfg=settings[variant],g=MOUNTAIN_ROUTES.find(c=>c.variant===variant),jump=variant==='gediz';
 const ramps=jump?[{s:g.jumpMarker,u:0,rise:130,run:600,width:380}]:[];
 const line=skiCourse(ground,null,g.path,{ramps:[],rollers:[],items:[]});
 const start=g.gates.at(-1)+80,end=g.jumpMarker+2600,anchor=line.point(start),z=ground(anchor.x,anchor.y);
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
 // Grade the authored final approach/runout, including its shoulders, as geometry.
 // The same surface drives contact, the rendered terrain, markers and camera.
 const graded=jump?(x,y)=>{const q=line.coords(x,y),weight=smooth((q.s-start)/400)*smooth((end-q.s)/500)*smooth((600-Math.abs(q.u))/220);return ground(x,y)*(1-weight)+(z-(q.s-start)*.035)*weight;}:ground;
 const base=skiCourse(graded,null,g.path,{ramps,rollers:[],items:[]});
 const a=line.point(start-100),b=line.point(end+100),rawSurface=base.surface;
 const surface=jump?(x,y)=>x<Math.min(a.x,b.x)-650||x>Math.max(a.x,b.x)+650||y<Math.min(a.y,b.y)-650||y>Math.max(a.y,b.y)+650?ground(x,y):rawSurface(x,y):ground;
 const relief=base.relief;if(jump)base.relief=(s,u)=>s<=g.jumpMarker+25?relief(s,u):0;
 base.surface=surface;base.height=(s,u=0)=>{const p=base.point(s,u);return surface(p.x,p.y);};
 const xs=g.path.map(p=>p[0]),ys=g.path.map(p=>p[1]),id='ski-'+variant;
 return countdownLaunch({...base,worldHeight:base.surface,world:'mars',site:'gale',activity:id,recordMode:id,mode:'time-trial',title:cfg.name+' · time trial',mapIntro:true,guidePath:true,showThrust:true,drive:{thrust:48,limit:360},timeTrial:true,reactiveGates:true,naturalAir:false,airborneFinish:jump,airborneGates:false,finish:g.finish,finishHalf:155,jumpMarker:g.jumpMarker,width:400,limit:180,route:g.path.map(([x,y])=>({x,y})),gates:g.gates.map((s,i)=>({s,u:0,half:55,color:i%2?'blue':'red'})),mapBounds:{minX:Math.min(...xs)-400,width:Math.max(...xs)+400,minY:Math.min(...ys)-400,maxY:Math.max(...ys)+400},courseVersion:2,trialKey:`astra.gale.${id}.time-trial.v2`});
}

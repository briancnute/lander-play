import {box,triangle,roverBody,roverWheel} from './geometry.js';
// Lightweight recognizable families, fitted to the existing gameplay footprint.
// Museum-detail NASA meshes stay in the paused gallery.
function body(id){
 if(id==='perseverance')return perseveranceBody();
 if(id==='sojourner'){
  const a=[],white=[.73,.69,.56],blue=[.08,.19,.29];box(a,-2.8,-3.5,1.65,5.6,7,1.15,white);box(a,-3.6,-4,2.82,7.2,8,.18,blue);
  for(let x=-3.4;x<3.6;x+=.8)box(a,x,-3.9,3,.045,7.8,.025,[.4,.5,.55]);for(let y=-3.8;y<4;y+=1)box(a,-3.5,y,3,7,.035,.025,[.4,.5,.55]);box(a,2.4,-2.8,3,.07,.07,1.8,white);return new Float32Array(a);
 }
 if(id==='spirit'||id==='opportunity'){
  const a=Array.from(roverBody()),panel=id==='spirit'?[.15,.25,.32]:[.32,.27,.21];for(const x of [-5,3.6])box(a,x,-2.7,3.15,1.4,5.4,.15,panel);box(a,-.8,1.4,5.7,1.6,1,1,[.69,.64,.52]);box(a,-.3,-2.3,3.4,.6,.6,1.3,[.68,.64,.5]);return new Float32Array(a);
 }
 const a=[],white=[.78,.76,.67],gold=[.58,.43,.20],dark=[.18,.20,.21];box(a,-3,-3.5,2,6,7,1.8,white);box(a,-2.6,-2.5,3.8,5.2,5.4,.22,white);
 box(a,-1.8,1.8,4,.55,.55,3.2,white);box(a,-2.4,1.7,6.9,1.8,.9,.9,dark);box(a,-2.1,2.6,7.1,.35,.1,.35,[.07,.1,.12]);
 box(a,-1.5,-4.2,3.3,3,1.1,1.6,dark);for(let x=-1.6;x<1.7;x+=.4)box(a,x,-4.35,3.2,.09,1.4,1.9,white);
 box(a,1,0,4.1,1.6,1.2,.55,gold);box(a,-3.1,3.25,2.7,4.8,.45,.45,white);box(a,1.4,2.8,2.5,.55,1.7,.65,dark);
 for(const side of [-1,1])for(const y of [-3.48,0,3.48])box(a,side<0?-3.78:2.5,y-.16,2.05,1.28,.32,.38,dark);
 if(id==='perseverance'){for(const x of [-2.25,-1.25])box(a,x,2.61,7.03,.45,.12,.45,[.04,.07,.09]);box(a,.3,2.9,3.95,1.7,.55,.22,white);box(a,1.2,3.35,2.35,.85,.9,.7,gold);box(a,.8,-1.8,4.15,1.8,1,.6,white);box(a,-2.8,0,4.2,.8,1.4,.3,gold);}else{box(a,-.8,-.8,4.2,1.1,1.1,.8,dark);box(a,2,-2,4.1,.4,.4,1.4,white);}
 return new Float32Array(a);
}
// Small faceted rods and bevels add readable structure without gallery meshes.
function rod(out,a,b,r,color,sides=8){
 const d=b.map((v,i)=>v-a[i]),length=Math.hypot(...d),n=d.map(v=>v/length),u=Math.abs(n[2])<.9?[-n[1],n[0],0]:[0,-n[2],n[1]],ul=Math.hypot(...u);for(let i=0;i<3;i++)u[i]/=ul;
 const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]],point=(p,t)=>p.map((x,i)=>x+r*(Math.cos(t)*u[i]+Math.sin(t)*v[i]));
 for(let i=0;i<sides;i++){const t=i*2*Math.PI/sides,t2=(i+1)*2*Math.PI/sides,p=point(a,t),q=point(a,t2),s=point(b,t),w=point(b,t2);triangle(out,p,s,w,color);triangle(out,p,w,q,color);triangle(out,a,q,p,color);triangle(out,b,s,w,color);}
}
function perseveranceBody(){
 const a=[],white=[.80,.78,.70],silver=[.55,.57,.55],dark=[.17,.19,.18],gold=[.60,.46,.24];
 const outline=[[-2.5,-3.5],[2.5,-3.5],[3,-2.7],[3,2.55],[2.35,3.5],[-2.35,3.5],[-3,2.55],[-3,-2.7]];
 const lower=outline.map(([x,y])=>[x*.88,y*.9,2]),upper=outline.map(([x,y])=>[x,y,3.65]);
 for(let i=0;i<8;i++){const j=(i+1)%8;triangle(a,lower[i],lower[j],upper[j],white);triangle(a,lower[i],upper[j],upper[i],white);triangle(a,[0,0,3.65],upper[i],upper[j],white);}
 box(a,-2.7,-2.75,3.66,5.4,5.65,.18,white);
 // Separated rocker/bogie links leave air between chassis and six wheels.
 for(const side of [-1,1]){
  const joint=[side*3.05,.35,2.55],bogie=[side*3.45,-1.7,1.9];
  rod(a,joint,[side*3.78,3.48,1.38],.14,silver);rod(a,joint,bogie,.16,silver);
  rod(a,bogie,[side*3.78,0,1.38],.13,silver);rod(a,bogie,[side*3.78,-3.48,1.38],.13,silver);
  rod(a,[side*2.8,.35,2.55],joint,.27,dark);
 }
 // Broad camera head, contrasting paired eyes, slim offset neck.
 rod(a,[-1.65,1.65,3.8],[-1.65,1.65,6.95],.22,white);
 box(a,-2.5,1.25,6.85,2.1,1.05,.95,white);box(a,-2.4,2.31,7.02,1.9,.09,.6,dark);
 for(const x of [-2.03,-.91])rod(a,[x,2.40,7.32],[x,2.52,7.32],.23,[.055,.07,.075]);
 box(a,-1.9,1.4,7.82,.62,.62,.14,dark);
 // Rear power unit, deck hardware and a compact stowed arm, all noninteractive.
 box(a,-1.5,-4.1,3.15,3,1.1,1.7,dark);
 for(let x=-1.5;x<=1.5;x+=.375)box(a,x,-4.3,3.1,.075,1.4,1.85,silver);
 box(a,.75,-1.55,3.85,1.75,1.1,.5,white);rod(a,[1.15,.35,3.85],[1.15,.35,4.05],.72,gold,12);
 rod(a,[2.0,-2,3.85],[2.0,-2,5.05],.055,silver);box(a,-2.7,-.8,3.85,.8,1.5,.2,gold);
 rod(a,[-2.5,3.35,2.7],[.45,3.7,2.45],.18,white);rod(a,[.45,3.7,2.45],[1.75,2.7,2.65],.20,silver);
 box(a,1.35,2.85,2.3,.95,1.1,.75,dark);
 return new Float32Array(a);
}
export function drivingWheel(id){
 if(id==='perseverance'){
  const a=[],tire=[.24,.26,.25],hub=[.49,.51,.48];
  // Same 1.38 radius / 1.2 width and pivots as before: visual-only refinement.
  for(let i=0;i<24;i++){
   const t=i*Math.PI/12,u=(i+1)*Math.PI/12,p=(x,r,v)=>[x,Math.sin(v)*r,1.38+Math.cos(v)*r];
   const color=i%2?[.32,.33,.30]:tire;
   triangle(a,p(-.6,1.38,t),p(.6,1.38,t),p(.6,1.38,u),color);triangle(a,p(-.6,1.38,t),p(.6,1.38,u),p(-.6,1.38,u),color);
   for(const side of [-1,1]){const x=side*.6;triangle(a,p(x,.6,t),p(x,1.38,t),p(x,1.38,u),tire);triangle(a,p(x,.6,t),p(x,1.38,u),p(x,.6,u),tire);triangle(a,[x,0,1.38],p(x,.6,t),p(x,.6,u),i%4===0?hub:[.16,.18,.17]);}
  }
  return new Float32Array(a);
 }
 const a=roverWheel();if(id==='curiosity')for(let i=0;i<a.length;i+=9){a[i+6]=.26;a[i+7]=.28;a[i+8]=.27;}return a;
}

// Fictional ASTRA visibility equipment, independent of the historical rover instruments.
function lightFit(id){return id==='sojourner'?{rear:-4.2,deck:3.1,top:5.4}:['spirit','opportunity'].includes(id)?{rear:-7.2,deck:5.4,top:8.2}:{rear:-4.6,deck:4.1,top:6.5};}
export function drivingBody(id){const a=Array.from(body(id)),f=lightFit(id);box(a,2.5,-2.8,f.deck,.10,.10,f.top-f.deck,[.38,.44,.43]);return new Float32Array(a);}
export function runningLights(id){const a=[],f=lightFit(id);box(a,2.37,-2.93,f.top,.36,.36,.36,[.22,.85,.72]);for(const x of [-2.85,2.6])box(a,x,-1.8,f.deck,.25,1.2,.13,[1.,.57,.14]);return new Float32Array(a);}
export function tailLights(id){const a=[],f=lightFit(id);for(const x of [-2.6,1.8])box(a,x,f.rear,2.45,.8,.2,.5,[.65,.035,.012]);return new Float32Array(a);}

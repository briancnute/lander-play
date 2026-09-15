import {box,roverBody,roverWheel} from './geometry.js';
// Lightweight recognizable families, fitted to the existing gameplay footprint.
// Museum-detail NASA meshes stay in the paused gallery.
function body(id){
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
 if(id==='perseverance'){box(a,.8,-1.8,4.15,1.8,1,.6,white);box(a,-2.8,0,4.2,.8,1.4,.3,gold);}else{box(a,-.8,-.8,4.2,1.1,1.1,.8,dark);box(a,2,-2,4.1,.4,.4,1.4,white);}
 return new Float32Array(a);
}
export function drivingWheel(id){const a=roverWheel();if(['curiosity','perseverance'].includes(id))for(let i=0;i<a.length;i+=9){a[i+6]=.26;a[i+7]=.28;a[i+8]=.27;}return a;}

// Fictional ASTRA visibility equipment, independent of the historical rover instruments.
function lightFit(id){return id==='sojourner'?{rear:-4.2,deck:3.1,top:5.4}:['spirit','opportunity'].includes(id)?{rear:-7.2,deck:5.4,top:8.2}:{rear:-4.6,deck:4.1,top:6.5};}
export function drivingBody(id){const a=Array.from(body(id)),f=lightFit(id);box(a,2.5,-2.8,f.deck,.10,.10,f.top-f.deck,[.38,.44,.43]);return new Float32Array(a);}
export function runningLights(id){const a=[],f=lightFit(id);box(a,2.37,-2.93,f.top,.36,.36,.36,[.22,.85,.72]);for(const x of [-2.85,2.6])box(a,x,-1.8,f.deck,.25,1.2,.13,[1.,.57,.14]);return new Float32Array(a);}
export function tailLights(id){const a=[],f=lightFit(id);for(const x of [-2.6,1.8])box(a,x,f.rear,2.45,.8,.2,.5,[.65,.035,.012]);return new Float32Array(a);}

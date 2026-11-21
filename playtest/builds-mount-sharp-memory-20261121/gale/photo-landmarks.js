import {loadingBudget} from '../shared/loading-budget.js';
import {triangle} from '../mars-renderer/triangle.js';
// Photographic morphology, not a surveyed placement of individual rocks.
// Reference brightness and rock forms guide the geometry; color follows Gale’s palette.
export const PHOTO_REGIONS={
 murray:{seed:1500,radius:780,heading:3.40,pitch:-.035,eye:5.5,frameOutcrops:true,zoom:1.45,fieldDensity:.31,fragmentCount:1200,flatness:.10,tone:[.67,.55,.43],
  outcrops:[[3.10,290,92,58,38],[3.88,340,110,64,42]],broken:true,outcropSectors:34,outcropLevels:22,profile:[1,.89,.78,.67,.57,.48,.41,.36,.35,.34,.33,.32,.30]},
 gediz:{seed:3972,radius:780,heading:3.20,pitch:.015,eye:5.5,frameOutcrops:true,zoom:2.4,fieldDensity:.29,fragmentCount:1200,flatness:.18,tone:[.67,.52,.40],
  outcrops:[[3.20,300,135,90,24]],debris:true,outcropSectors:38,outcropLevels:16,profile:[1,.99,.97,.94,.90,.85,.79,.72,.64,.54,.43,.29,.03]},
 glen:{seed:2481,radius:660,heading:2.45,pitch:.16,eye:5.5,flatness:.065,tone:[.62,.55,.47],fractures:1,fieldDensity:.42,fieldBedding:.18,slabRadius:3.5,slabSpread:5,slabAspect:.80,slabAspectSpread:.16,fragmentCount:1100,fragmentSpread:1.5,foregroundStep:6,foregroundRadius:1.8,foregroundSpread:3.2,foregroundAspect:.82,ledgeCount:85,ledgeSpread:13,ledgeLayers:5,
  outcrops:[[2.25,210,34,25,.8],[2.86,340,45,28,1.2]],profile:[1,.99,.98,.96,.95,.94,.93,.92,.90,.89,.88,.87,.86]},
 sulfates:{seed:3506,radius:780,heading:3.20,pitch:.15,eye:5.5,flatness:.17,tone:[.69,.57,.45],fractures:2,fieldDensity:.42,fieldBedding:.25,slabRadius:3.2,slabSpread:6.3,slabAspect:.65,slabAspectSpread:.25,fragmentCount:1100,fragmentSpread:2.3,foregroundStep:6,foregroundRadius:2,foregroundSpread:3.1,foregroundAspect:.70,ledgeCount:125,ledgeSpread:14,ledgeLayers:5,
  outcrops:[[2.93,330,104,52,21],[3.67,510,110,58,27]],broken:true,elongated:true,profile:[1,.94,.87,.79,.70,.61,.53,.47,.42,.39,.36,.34,.31]},
 ridge:{seed:1999,radius:760,heading:2.82,pitch:.13,eye:5.5,flatness:.07,tone:[.72,.64,.54],fractures:2,fieldDensity:.46,fieldBedding:.16,slabRadius:2.7,slabSpread:4.2,slabAspect:.72,slabAspectSpread:.24,fragmentCount:1250,fragmentSpread:1.3,foregroundStep:5,foregroundRadius:1.6,foregroundSpread:2.6,foregroundAspect:.76,ledgeCount:80,ledgeSpread:9,ledgeLayers:3,
  outcrops:[[2.72,340,62,25,3.6],[3.48,490,76,30,5.2]],elongated:true,profile:[1,.98,.96,.94,.91,.88,.84,.79,.73,.66,.58,.49,.38]},
 transition:{seed:3072,radius:800,heading:-2.55,pitch:-.015,eye:5.5,frameOutcrops:true,zoom:2.5,flatness:.13,tone:[.68,.55,.41],fractures:2,fieldDensity:.36,fieldBedding:.24,slabRadius:2.6,slabSpread:5.2,slabAspect:.68,slabAspectSpread:.24,fragmentCount:1100,fragmentSpread:1.8,foregroundStep:6,foregroundRadius:1.3,foregroundSpread:2.6,foregroundAspect:.72,ledgeCount:105,ledgeSpread:11,ledgeLayers:6,
  // Mont Mercou's roughly six-metre face at the existing 8/3 units per source metre.
  // Placement is interpreted; the camera and stopping apron remain unobstructed.
  outcrops:[[-2.55,202,66,38,16],[-2.18,290,70,40,8]],broken:true,elongated:true,outcropLevels:24,outcropSectors:40,
  profile:[1,.94,.89,.85,.84,.83,.83,.82,.82,.81,.81,.80,.80,.79,.78,.78,.77,.77,.76,.75,.74,.72,.70,.67,.64]},
 // The opening plain is gravel, with only scattered larger stones and an open horizon.
 landing:{seed:3,radius:640,heading:3.10,pitch:.055,eye:5.5,flatness:.045,tone:[.52,.45,.37],fractures:0,fieldDensity:.24,fieldBedding:.10,slabRadius:.35,slabSpread:1.7,slabAspect:.66,slabAspectSpread:.28,fragmentCount:1800,fragmentSpread:1.05,foregroundStep:5,foregroundRadius:.28,foregroundSpread:.95,foregroundAspect:.70,foregroundDensity:.6,ledgeCount:24,ledgeSpread:4,ledgeLayers:1,outcrops:[]},
 // Flat broken pavement and shallow shelves; no new hill at the early lakebed stop.
 yellowknife:{seed:125,radius:720,heading:-2.44,pitch:.16,eye:5.5,flatness:.075,tone:[.69,.61,.51],fractures:2,fieldDensity:.43,fieldBedding:.19,slabRadius:3.2,slabSpread:4.5,slabAspect:.78,slabAspectSpread:.18,fragmentCount:1000,fragmentSpread:1.2,foregroundStep:5.5,foregroundRadius:1.7,foregroundSpread:2.7,foregroundAspect:.82,ledgeCount:75,ledgeSpread:10,ledgeLayers:3,
  outcrops:[[-2.73,245,42,24,1.7],[-2.16,390,58,29,2.8]],elongated:true,profile:[1,.99,.97,.96,.94,.92,.90,.87,.83,.78,.73,.67,.60]},
 plains:{seed:504,radius:740,heading:-2.31,pitch:.065,eye:5.5,flatness:.16,tone:[.57,.48,.39],fractures:1,fieldDensity:.29,fieldBedding:.13,slabRadius:.65,slabSpread:2.9,slabAspect:.55,slabAspectSpread:.30,fragmentCount:1500,fragmentSpread:1.5,foregroundStep:5.5,foregroundRadius:.45,foregroundSpread:1.6,foregroundAspect:.63,foregroundDensity:.65,ledgeCount:65,ledgeSpread:5.5,ledgeLayers:2,
  outcrops:[[-2.55,530,74,36,8],[-1.94,690,86,42,11]],elongated:true,profile:[1,.98,.95,.90,.83,.74,.64,.53,.42,.31,.22,.13,.04]},
 foothills:{seed:997,radius:780,heading:3.40,pitch:.13,eye:5.5,flatness:.18,tone:[.70,.60,.48],fractures:2,fieldDensity:.41,fieldBedding:.22,slabRadius:3.1,slabSpread:5.6,slabAspect:.62,slabAspectSpread:.25,fragmentCount:1150,fragmentSpread:2.0,foregroundStep:6,foregroundRadius:1.7,foregroundSpread:3.1,foregroundAspect:.68,ledgeCount:120,ledgeSpread:12,ledgeLayers:6,
  outcrops:[[3.02,300,68,35,6.5],[3.84,410,75,39,9]],elongated:true,profile:[1,.99,.97,.94,.90,.85,.79,.73,.66,.58,.49,.39,.28]},
 higher:{seed:4500,radius:780,heading:3.45,pitch:.10,eye:5.5,flatness:.20,tone:[.66,.57,.47],fractures:2,fieldDensity:.40,fieldBedding:.21,slabRadius:2.8,slabSpread:4.8,slabAspect:.53,slabAspectSpread:.28,fragmentCount:1150,fragmentSpread:2.1,foregroundStep:6,foregroundRadius:1.5,foregroundSpread:2.9,foregroundAspect:.61,ledgeCount:115,ledgeSpread:11,ledgeLayers:6,
  // Texoli-inspired layered flank to the left, a lower Devil's Gate ridge to the right.
  outcrops:[[3.00,350,90,48,24],[3.93,240,50,27,9]],elongated:true,profile:[1,.97,.93,.88,.82,.76,.69,.62,.55,.49,.43,.36,.29]},
 // The source is a MAHLI close-up. Its millimetre features belong in Photo;
 // surrounding bedrock stays at landscape scale, with no invented giant discs.
 frontier:{seed:5016,radius:700,heading:3.09,pitch:.30,eye:5.5,flatness:.08,tone:[.67,.54,.42],fractures:1,fieldDensity:.40,fieldBedding:.18,slabRadius:3.0,slabSpread:4.8,slabAspect:.78,slabAspectSpread:.17,fragmentCount:1000,fragmentSpread:1.2,foregroundStep:6,foregroundRadius:2.0,foregroundSpread:3.0,foregroundAspect:.84,ledgeCount:60,ledgeSpread:9,ledgeLayers:3,outcrops:[]},
};
export function photoRegionWeight(distance,radius=780){const t=Math.max(0,Math.min(1,(distance-radius*.58)/(radius*.42)));return 1-t*t*(3-2*t);}
function* generatePhotoLandmarks(ground,stops){
 const details=[],rocks=[],buckets=new Map(),views={},stats={slabs:0,ledges:0,triangles:0,bytes:0,chunks:0,outcrops:0};
 for(const [id,style] of Object.entries(PHOTO_REGIONS)){
  const site=stops.find(p=>p.id===id);if(!site)continue;views[id]={heading:style.heading,pitch:style.pitch,eye:style.eye,zoom:style.zoom??1};
  if(style.frameOutcrops&&style.outcrops?.length){
   // Aim at the actual world-height of the outcrops, including the measured
   // uphill slope. A fixed pitch plus zoom could otherwise crop the ridge away.
   const distance=style.outcrops.reduce((v,o)=>v+o[1],0)/style.outcrops.length;
   const targetHeight=style.outcrops.reduce((v,[b,d,,,rise])=>v+ground(site.x+Math.sin(b)*d,site.y-Math.cos(b)*d)+rise*.55,0)/style.outcrops.length;
   views[id].pitch=Math.atan2(ground(site.x,site.y)+style.eye-targetHeight,distance);
  }
  let seed=style.seed;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const chunks=new Map();
  const verticesAt=(x,y,range=1100)=>{const key=Math.floor(x/256)+','+Math.floor(y/256);if(!chunks.has(key))chunks.set(key,{vertices:[],drawRange:range,material:1.3});const c=chunks.get(key);c.drawRange=Math.max(c.drawRange,range);return c.vertices;};
  function stone(x,y,rx,ry,rise,angle,collidable=false,layers=1,surface=ground,rockTone=style.tone){
   const out=verticesAt(x,y),n=6,base=[],top=[],z=surface(x,y),c=Math.cos(angle),s=Math.sin(angle),rough=Array.from({length:n},()=>.72+random()*.28),shade=.90+random()*.18;
   const color=rockTone.map(v=>v*shade),dipX=(random()-.5)*rise*.35,dipY=(random()-.5)*rise*.35;
   for(let i=0;i<n;i++){const a=i*Math.PI/3,u=Math.cos(a)*rx*rough[i],v=Math.sin(a)*ry*rough[i],px=x+u*c-v*s,py=y+u*s+v*c;const floor=surface(px,py);base.push([px,py,floor-.04]);top.push([px,py,floor+rise*(surface!==ground?.8:collidable?1:.28)+dipX*u/rx+dipY*v/ry]);}
   const center=[x,y,z+rise];
   for(let i=0;i<n;i++){
    const j=(i+1)%n;
    // Broken tops have broad facets and fine dark seams, rather than round pebbles.
    const start=out.length;
    triangle(out,center,top[i],top[j],color.map(v=>v*(.99+random()*.02)));
    // Dust at the bevel joins low pavement to the soil without extra triangles.
    if(!collidable)for(const offset of [9,18])for(let q=0;q<3;q++)out[start+offset+6+q]=out[start+offset+6+q]*.52+[.68,.465,.315][q]*.48;
    for(let k=0;k<layers;k++){
     const lo=k/layers,hi=(k+1)/layers,a=base[i].map((v,q)=>v+(top[i][q]-v)*lo),b=base[j].map((v,q)=>v+(top[j][q]-v)*lo),c=base[i].map((v,q)=>v+(top[i][q]-v)*hi),d=base[j].map((v,q)=>v+(top[j][q]-v)*hi),band=color.map(v=>v*(k%2?.74:.86));
     triangle(out,a,b,c,band);triangle(out,b,d,c,band);
    }
   }
   // Branching hairline fractures follow the top, not the floor.
   for(let k=0;k<(style.fractures??2);k++){const edge=top[(k*2+1)%n],mid=top[(k*2+2)%n],a=[center[0]+(edge[0]-center[0])*.1,center[1]+(edge[1]-center[1])*.1,center[2]+(edge[2]-center[2])*.1+.025],b=edge.map((v,i)=>v+(mid[i]-v)*.27);b[2]+=.025;const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1,w=Math.min(.09,rx*.025),c=[a[0]-dy/length*w,a[1]+dx/length*w,a[2]],d=[b[0]-dy/length*w,b[1]+dx/length*w,b[2]];triangle(out,a,b,c,color.map(v=>v*.76));triangle(out,b,d,c,color.map(v=>v*.76));}
   if(collidable){const r=Math.max(rx,ry),rock=[x,y,r];rocks.push(rock);const key=Math.floor(x/128)+','+Math.floor(y/128);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);}
   stats.slabs++;
  }
  // Broken pavement continues across the arrival disk and through the approach.
  // Sub-wheel relief is cosmetic (< 8 cm), leaving the measured contact intact.
  for(let y=-style.radius;y<=style.radius;y+=18)for(let x=-style.radius;x<=style.radius;x+=18){
   yield;
   const px=site.x+x+(random()-.5)*15,py=site.y+y+(random()-.5)*15,d=Math.hypot(px-site.x,py-site.y),weight=photoRegionWeight(d,style.radius);
   const bedding=.5+.5*Math.sin(x*.013+Math.sin(y*.009)*2.8);
   if(random()>weight*((style.fieldDensity??.35)+(style.fieldBedding??.30)*bedding))continue;
   const rx=(style.slabRadius??2.2)+random()*(style.slabSpread??5.5),ry=rx*(style.slabAspect!==undefined?style.slabAspect+random()*style.slabAspectSpread:id==='murray'?.60+random()*.30:.35+random()*.55);
   stone(px,py,rx,ry,.07+random()*.12,random()*Math.PI,false);
  }
  // Fine foreground fragments fill the same material field, without a visible border.
  for(let i=0;i<(style.fragmentCount??1400);i++){if(i%32===0)yield;const a=random()*Math.PI*2,d=Math.sqrt(random())*170,x=site.x+Math.sin(a)*d,y=site.y+Math.cos(a)*d;if(random()>photoRegionWeight(d,170))continue;const r=.22+random()**2*(style.fragmentSpread??2.8);stone(x,y,r,r*(.45+random()*.45),.06+random()*.12,random()*Math.PI,false);}
  // Closely spaced fractured pavement in the photographic foreground. Its
  // density falls gradually into the same rubble field on every side of the site.
  for(let y=-74;y<=74;y+=(style.foregroundStep??5))for(let x=-74;x<=74;x+=(style.foregroundStep??5)){
   yield;
   const px=x+(random()-.5)*3,py=y+(random()-.5)*3,d=Math.hypot(px,py);
   if(random()>photoRegionWeight(d,74)*(style.foregroundDensity??.8))continue;
   const r=(style.foregroundRadius??1.1)+random()*(style.foregroundSpread??2.6);stone(site.x+px,site.y+py,r,r*(style.foregroundAspect??(id==='murray'?.7:.5)),.10+random()*.09,random()*Math.PI,false);
  }
  // Tilted fragments and eroded ledges outside the stopping/travel apron.
  for(let i=0;i<(style.ledgeCount??130);i++){
   if(i%8===0)yield;
   const a=random()*Math.PI*2,d=150+random()*480,x=site.x+Math.sin(a)*d,y=site.y+Math.cos(a)*d;
   if(random()>photoRegionWeight(d,style.radius))continue;
   const r=2.8+random()**2*(style.ledgeSpread??(id==='murray'?13:8)),rise=r*style.flatness;
   // Do not replace a steep measured face with a floating shelf.
   if(Math.abs(ground(x+r,y)-ground(x-r,y))>r*.6||Math.abs(ground(x,y+r)-ground(x,y-r))>r*.6)continue;
   stone(x,y,r,r*(.55+random()*.35),rise,random()*Math.PI,true,style.ledgeLayers??(id==='murray'?4:2));stats.ledges++;
  }
  // Regional silhouettes range from low clay-country shelves to eroded caps.
  // These are interpreted outcrops, not new terrain peaks.
  const outcrops=style.outcrops??(id==='murray'?[[3.12,490,72,48,32],[3.74,680,94,55,40]]:[[3.48,400,72,34,16]]);
  for(const [bearing,distance,rx,ry,rise]of outcrops){
   const x=site.x+Math.sin(bearing)*distance,y=site.y-Math.cos(bearing)*distance,out=verticesAt(x,y),n=style.outcropSectors??18,levels=style.outcropLevels??12,rings=[],profile=style.profile??(id==='murray'?[1,.91,.81,.71,.63,.59,.56,.54,.52,.51,.50,.49,.47]:[1,.96,.91,.84,.75,.65,.54,.44,.34,.25,.17,.09,.02]),jag=Array.from({length:n},()=>.72+random()*.28),angle=bearing+.35;
   const profileAt=t=>{const q=t*(profile.length-1),j=Math.min(profile.length-2,Math.floor(q));return profile[j]+(profile[j+1]-profile[j])*(q-j);};
   // Unequal beds, angular buttresses and vertical joints break the former
   // rotationally symmetric, evenly striped stacks. No new terrain peaks.
   for(let k=0;k<=levels;k++){
    const t=k/levels,bed=t===0||t===1?t:t+Math.sin(k*2.17)*.18/levels,ring=[];
    for(let i=0;i<n;i++){
     const a=i*Math.PI*2/n,joint=style.broken?(.90+.10*Math.abs(Math.sin(i*1.73))):1;
     const flute=style.broken?1+.04*Math.sin(i*2.7+k*.91):1+.045*Math.sin(i*4.7+k*.6);
     const asym=style.broken?1+.14*Math.sin(a*3.1+.7)+.08*Math.cos(a*5.):1;
     const shape=profileAt(t),u=Math.cos(a)*rx*jag[i]*(style.elongated?1-t*.25:shape)*flute*joint*asym,v=Math.sin(a)*ry*jag[i]*shape*flute*joint;
     const px=x+u*Math.cos(angle)-v*Math.sin(angle),py=y+u*Math.sin(angle)+v*Math.cos(angle);
     const crest=style.broken?(.84+.12*jag[i]+.04*Math.cos(a*2.)):style.debris?(.79+.13*jag[i]+.08*Math.sin(a*3.)): .90+jag[i]*.1;
     ring.push([px,py,ground(px,py)+rise*bed*crest-.03]);
    }rings.push(ring);
   }
   for(let k=1;k<=levels;k++)for(let i=0;i<n;i++){
    const j=(i+1)%n,shade=style.debris?.91+.06*Math.sin(i*2.7+k*1.4):style.broken?.89+.035*Math.sin(k*2.31+i*.18)-.045*(Math.sin(i*1.73)>.85?1:0):(k%3===0?.85:.93),color=style.tone.map(v=>v*shade);
    triangle(out,rings[k-1][i],rings[k-1][j],rings[k][i],color);triangle(out,rings[k-1][j],rings[k][j],rings[k][i],color);
   }
   const cap=rings.at(-1),center=[x,y,ground(x,y)+rise*.96];for(let i=0;i<n;i++)triangle(out,center,cap[i],cap[(i+1)%n],style.tone);
   if(style.debris){
    // Match the source's jumbled dark blocks on a low debris apron. Interpolate
    // the actual generated triangles so stones rest on the mound, not in midair.
    const surface=(px,py)=>{
     for(let k=1;k<rings.length;k++)for(let i=0;i<n;i++)for(const tri of [[rings[k-1][i],rings[k-1][(i+1)%n],rings[k][i]],[rings[k-1][(i+1)%n],rings[k][(i+1)%n],rings[k][i]]]){
      const [a,b,c]=tri,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<1e-8)continue;
      const u=((b[1]-c[1])*(px-c[0])+(c[0]-b[0])*(py-c[1]))/den,v=((c[1]-a[1])*(px-c[0])+(a[0]-c[0])*(py-c[1]))/den;
      if(u>=0&&v>=0&&u+v<=1)return u*a[2]+v*b[2]+(1-u-v)*c[2];
     }return ground(px,py);
    };
    for(let i=0;i<180;i++){if(i%8===0)yield;const a=random()*Math.PI*2,r=.18+random()*.58,px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r,size=1.+random()**2*4.;stone(px,py,size,size*(.45+random()*.45),1.1+random()*1.2,a,false,1,surface,[.36,.35,.32]);}
   }
   const rock=[x,y,Math.max(rx,ry)];rocks.push(rock);const key=Math.floor(x/128)+','+Math.floor(y/128);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(rock);stats.outcrops++;
   // Loose blocks soften the foot of each outcrop into the wider material field.
   for(let i=0;i<32;i++){const a=random()*Math.PI*2,r=1.05+random()*.45;stone(x+Math.sin(a)*rx*r,y+Math.cos(a)*rx*r,1+random()*2,1+random(),.12+random()*.06,a,false);}
  }
  for(const chunk of chunks.values()){yield;const vertices=new Float32Array(chunk.vertices);details.push({...chunk,vertices,region:id});stats.triangles+=vertices.length/27;stats.bytes+=vertices.byteLength;}
 }
 stats.chunks=details.length;
 return {details,rocks,views,stats,near(x,y){const out=[],ix=Math.floor(x/128),iy=Math.floor(y/128);for(let j=iy-1;j<=iy+1;j++)for(let i=ix-1;i<=ix+1;i++)out.push(...(buckets.get(i+','+j)??[]));return out;}};
}

// Both entry points consume the same deterministic generator. Yielding changes
// scheduling only, so photo framing, rocks and contact data stay unchanged.
export function createPhotoLandmarks(ground,stops){
 const work=generatePhotoLandmarks(ground,stops);let step;
 do{step=work.next();}while(!step.done);return step.value;
}
export async function createPhotoLandmarksAsync(ground,stops){
 const work=generatePhotoLandmarks(ground,stops),checkpoint=loadingBudget();let step;
 do{step=work.next();if(!step.done)await checkpoint();}while(!step.done);return step.value;
}

// Prototype spring arm: shorten the view before obstacles, never vault over their roofs.
export function chase(cam,s,dt,focus,surface,terrain){
 const step=Math.max(0,Math.min(.05,dt)),blend=1-Math.exp(-step*5);
 cam.h+=Math.atan2(Math.sin(s.heading-cam.h),Math.cos(s.heading-cam.h))*blend;
 cam.x=s.x;cam.y=s.y;
 const sx=Math.sin(cam.h),cy=Math.cos(cam.h),baseSlope=17/74;
 // Terrain changes viewing elevation; discrete structures still shorten the boom.
 let required=baseSlope;
 if(terrain)for(let d=2;d<=80;d+=2){const x=s.x-sx*d,y=s.y+cy*d;required=Math.max(required,(Math.max(terrain(x,y),terrain(x+cy*2,y+sx*2),terrain(x-cy*2,y-sx*2))+3-focus)/d);}
 const desired=Math.max(baseSlope,Math.min(1.3,required));
 if(cam.terrainSlope===undefined)cam.terrainSlope=desired;
 if(step>0)cam.terrainSlope+=(desired-cam.terrainSlope)*(1-Math.exp(-step*6));
 const slope=Math.max(required,cam.terrainSlope);
 let safe=74;
 // Clearance samples include a small lens footprint and a forward safety margin.
 for(let d=2;d<=80;d+=2){
  const x=s.x-sx*d,y=s.y+cy*d,z=focus+d*slope;
  const roof=Math.max(surface(x,y),surface(x+cy*2,y+sx*2),surface(x-cy*2,y-sx*2));
  if(z<roof+2){safe=Math.max(2,d-6);break;}
 }
 if(cam.arm===undefined)cam.arm=Math.min(74,safe);
 if(safe<cam.arm){cam.arm=safe;cam.clearFor=0;}
 else{cam.clearFor=(cam.clearFor??0)+step;if(cam.clearFor>.22)cam.arm+=(safe-cam.arm)*(1-Math.exp(-step*3));}
 cam.arm=Math.min(cam.arm,safe);
 const back=cam.arm,x=s.x-sx*back,y=s.y+cy*back,eye=focus+back*slope;
 // Ground-following tilt preserves framing; roofs cannot drive the terrain tilt.
 cam.eye=eye;cam.pitch=Math.atan(slope)-Math.atan(baseSlope);
 return {back,x,y,eye,pitch:cam.pitch,lift:eye-s.z-23};
}

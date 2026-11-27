import {skiChase} from '../gale/ski-camera.js';
// Prototype spring arm: shorten the view before obstacles, never vault over their roofs.
export function chase(cam,s,dt,focus,surface,terrain,roverUnits=null){
 if(s.skiBlades)return skiChase(cam,s,dt,focus,surface,terrain);
 // Shared-physics rovers use Apollo's 9 m arm, 3.65 m eye and 2 m look-ahead.
 // Mars sites have different horizontal/vertical map scales; convert each axis.
 const H=roverUnits?.horizontal,V=roverUnits?.vertical;
 const armLength=roverUnits?9*H:74,baseSlope=roverUnits?2.1*V/armLength:17/74;
 const basePitch=roverUnits?Math.atan2(2.1*V,11*H):0;
 if(roverUnits)focus=s.z+1.55*V;
 const sample=roverUnits ? .5*H : 2,footprint=roverUnits ? .35*H : 2;
 const margin=roverUnits ? H : 6,clearance=roverUnits ? .6*V : 2;
 const step=Math.max(0,Math.min(.05,dt)),blend=1-Math.exp(-step*(roverUnits?6:5));
 cam.h+=Math.atan2(Math.sin(s.heading-cam.h),Math.cos(s.heading-cam.h))*blend;
 cam.x=s.x;cam.y=s.y;
 const sx=Math.sin(cam.h),cy=Math.cos(cam.h);
 // Terrain changes viewing elevation; discrete structures still shorten the boom.
 let required=baseSlope;
 if(terrain)for(let d=sample;d<=armLength+margin;d+=sample){const x=s.x-sx*d,y=s.y+cy*d;required=Math.max(required,(Math.max(terrain(x,y),terrain(x+cy*footprint,y+sx*footprint),terrain(x-cy*footprint,y-sx*footprint))+(roverUnits?clearance:3)-focus)/d);}
 const desired=Math.max(baseSlope,Math.min(1.3,required));
 if(cam.terrainSlope===undefined)cam.terrainSlope=desired;
 if(step>0)cam.terrainSlope+=(desired-cam.terrainSlope)*(1-Math.exp(-step*6));
 const slope=Math.max(required,cam.terrainSlope);
 let safe=armLength;
 // Clearance samples include a small lens footprint and a forward safety margin.
 for(let d=sample;d<=armLength+margin;d+=sample){
  const x=s.x-sx*d,y=s.y+cy*d,z=focus+d*slope;
  const roof=Math.max(surface(x,y),surface(x+cy*footprint,y+sx*footprint),surface(x-cy*footprint,y-sx*footprint));
  if(z<roof+clearance){safe=Math.max(sample,d-margin);break;}
 }
 if(cam.arm===undefined)cam.arm=Math.min(armLength,safe);
 if(safe<cam.arm){cam.arm=safe;cam.clearFor=0;}
 else{cam.clearFor=(cam.clearFor??0)+step;if(cam.clearFor>.22)cam.arm+=(safe-cam.arm)*(1-Math.exp(-step*3));}
 cam.arm=Math.min(cam.arm,safe);
 const back=cam.arm,x=s.x-sx*back,y=s.y+cy*back,eye=focus+back*slope;
 // Ground-following tilt preserves framing; roofs cannot drive the terrain tilt.
 cam.eye=eye;
 const targetPitch=basePitch+Math.atan(slope)-Math.atan(baseSlope);
 cam.pitch=targetPitch;
 return {back,x,y,eye,pitch:cam.pitch,lift:eye-s.z-(roverUnits?3.65*V:23)};
}

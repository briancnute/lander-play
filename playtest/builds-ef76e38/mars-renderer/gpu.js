import {boosterPods,jet} from './boost-kit.js';
import {drivingBody,drivingWheel,runningLights,tailLights} from './driving-models.js';
import {HeadlightShadow} from './headlight-shadow.js';
import {Suspension} from './effects.js';
import {chase} from './chase.js';
import {ground} from './ground.js';
import {WheelTracks} from './tracks.js';
import {terrain,outcrops,roverBody,roverWheel,wheelPivots,cell,shadow,brakeLights,headLights} from './geometry.js';
import {boostPickups,samples} from './simulation.js';
const {cameraSurface}=await import(/* @vite-ignore */ new URL('../../../extras/expedition/camera.mjs',import.meta.url).href);
const vertex=`attribute vec3 position,normal,color;uniform vec4 camera,projection,actor,wheel;uniform vec2 pitch,slope;uniform float kind,wideDepth;varying vec3 vNormal,vColor,vWorld,vLocal;varying float vDepth;void main(){if(kind>4.5&&kind<5.5){float r=position.x/projection.x,u=(.24-position.y)/projection.y,f=pitch.x-u*pitch.y,v=pitch.y+u*pitch.x;vWorld=camera.xyz+normalize(vec3(r*cos(camera.w)+f*sin(camera.w),r*sin(camera.w)-f*cos(camera.w),-v))*5000.;vDepth=5000.;vColor=color;vNormal=normal;vLocal=position;gl_Position=vec4(position.xy,.9999,1.);return;}vec3 p=position,n=normal;if(wheel.w>0.0){float wc=cos(wheel.z),ws=sin(wheel.z);p.xy=vec2(wc*p.x+ws*p.y,-ws*p.x+wc*p.y)+wheel.xy;n.xy=vec2(wc*n.x+ws*n.y,-ws*n.x+wc*n.y);}if(actor.w<99.0){float c=cos(actor.w),s=sin(actor.w);vec3 up=normalize(vec3(-slope.x,-slope.y,1.)),across=normalize(vec3(c,s,c*slope.x+s*slope.y)),forward=normalize(cross(across,up));p=across*p.x+forward*p.y+up*p.z+actor.xyz;n=across*n.x+forward*n.y+up*n.z;}float dx=p.x-camera.x,dy=p.y-camera.y;float forward=dx*sin(camera.w)-dy*cos(camera.w),right=dx*cos(camera.w)+dy*sin(camera.w),vertical=camera.z-p.z;float depth=forward*pitch.x+vertical*pitch.y,up=vertical*pitch.x-forward*pitch.y;gl_Position=vec4(right*projection.x,depth*.24-up*projection.y,mix(1.000375,1.000025,wideDepth)*depth-mix(3.00056,3.0000375,wideDepth),depth);vLocal=position;vDepth=depth;vNormal=n;vColor=color;vWorld=p;}`;
const fragment=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec3 vNormal,vColor,vWorld,vLocal;varying float vDepth;
uniform vec2 trackInfo;uniform sampler2D grit;uniform vec3 sun,haze;
uniform vec4 camera,roverLamp;uniform vec3 lampOrigin;uniform sampler2D lampHeights;uniform vec2 weather;
uniform float backdropPass,areaMaterial,shadowEnabled,softSurfaceLighting,airFill;
uniform float daylight,kind,stormTime,roverPart,localDust,lampSlope,residualDust,airborne;
float dust(vec3 target){
 if(weather.y<=0.&&residualDust<=0.)return 0.;
 vec3 ray=target-camera.xyz;float distance=length(ray),sum=0.;
 for(int i=0;i<12;i++){
  vec3 p=camera.xyz+ray*((float(i)+.5)/12.);
  float edge=weather.x+55.*sin(p.x*.004)+25.*sin(p.x*.011),d=edge-p.y;
  float top=560.+100.*sin(p.x*.0017)+65.*sin(p.y*.0023+p.x*.001);
  sum+=weather.y*smoothstep(0.,200.,d)*(1.-smoothstep(1150.,1500.,d))*(1.-smoothstep(top*.4,top,p.z));
 }
 return 1.-exp(-sum*distance*.022/12.-residualDust*min(distance,1000.)*.008);
}
float lampVisibility(vec3 target){
 if(shadowEnabled<.5)return 1.;
 vec3 n=normalize(vNormal);
 #ifdef ACTUAL_SURFACE_NORMAL
 vec3 surface=cross(dFdx(vWorld),dFdy(vWorld));
 if(dot(surface,surface)>.000001){surface=normalize(surface);n=dot(surface,n)<0.?-surface:surface;}
 #endif
 // Terrain is absent from the object-only map: no terrain acne offset or
 // per-triangle receiver-plane correction is needed. Those corrections can
 // detach and split a rock shadow as it crosses a curved hill.
 bool objectGround=softSurfaceLighting>.5&&kind<.5;
 vec3 d=target+n*(objectGround?0.:.6)-lampOrigin;
 vec2 forward=vec2(sin(roverLamp.z),-cos(roverLamp.z));
 float angle=atan(lampSlope+.09),c=cos(angle),s=sin(angle);
 float f=dot(d.xy,forward),r=dot(d.xy,vec2(-forward.y,forward.x));
 float z=f*c+d.z*s,u=d.z*c-f*s;
 vec2 uv=vec2(r/(1.8*z),u/(1.6*z))*.5+.5;
 if(z<=5.||z>=2000.||min(uv.x,uv.y)<0.||max(uv.x,uv.y)>1.)return 1.;
 float nf=dot(n.xy,forward);
 vec3 lightNormal=vec3(dot(n.xy,vec2(-forward.y,forward.x)),n.z*c-nf*s,nf*c+n.z*s);
 float plane=dot(lightNormal,vec3(r,u,z));
 float visibility=0.,weightSum=0.;
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 tap=(floor(uv*1024.)+vec2(float(x),float(y))+.5)/1024.;
  vec3 encoded=texture2D(lampHeights,tap).rgb;
  vec3 ray=vec3((tap*2.-1.)*vec2(1.8,1.6),1.);
  float denominator=dot(lightNormal,ray);
  float receiver=abs(denominator)>.0001?clamp(plane/denominator,0.,2000.):z;
  float blocker=dot(encoded,vec3(1.,1./255.,1./65025.))*2000.;
  // Measure obstruction perpendicular to the receiving surface, not along the
  // grazing light ray: tiny ground errors must not become long dark streaks.
  float obstruction=(receiver-blocker)*max(.001,abs(denominator));
  // Continuous tent weights avoid snapping between equally weighted texels.
  vec2 w=max(vec2(0.),vec2(1.5)-abs(vec2(float(x),float(y))+.5-fract(uv*1024.)));
  float weight=objectGround?w.x*w.y:1.;
  visibility+=weight*(objectGround?1.-smoothstep(.3,1.2,z-blocker):1.-smoothstep(.8,2.5,obstruction));
  weightSum+=weight;
 }
 return visibility/weightSum;
}
void main(){
 float dustFog=dust(vWorld);vec3 dustColor=mix(vec3(.10,.075,.07),vec3(.64,.425,.27),daylight);
 float grainDust=(texture2D(grit,gl_FragCoord.xy*.009+vec2(stormTime*.007,stormTime*.003)).r-.5)*.006;
 dustColor+=grainDust;
 if(kind>4.5&&kind<5.5){gl_FragColor=vec4(dustColor,dustFog);return;}
 vec3 base=kind>2.5&&kind<3.5?vec3(.16,.115,.08):vColor;float grain=0.;
 if(kind>7.5)base+=vec3(.035,.027,.019)*(texture2D(grit,vWorld.xy*.004).r-.5);
 if(kind<.5){float broad=sin(vWorld.x*.0018+sin(vWorld.y*.002))*sin(vWorld.y*.0013);base+=vec3(.035,.027,.019)*broad;grain=(texture2D(grit,vWorld.xy*.005).r-.5)*.018;}
 // Optional Jezero surface art; the original study retains its approved materials.
 if(kind<.5&&areaMaterial>.5){
  float slope=1.-normalize(vNormal).z;
  float exposed=smoothstep(.018,.13,slope);
  float variation=texture2D(grit,vWorld.xy*.0015).r;
  float layers=sin(vWorld.z*.18+sin(vWorld.x*.007)*.8+variation*1.7);
  float seam=smoothstep(-.2,.9,layers);
  vec3 rock=mix(vec3(.57,.425,.32),vec3(.43,.325,.255),seam*.32);
  rock+=vec3(.065,.05,.032)*(variation-.5);
  vec3 sand=vec3(.68,.465,.315)+vec3(.055,.04,.028)*(variation-.5);
  float ripples=sin(vWorld.x*.38+sin(vWorld.y*.025)*2.)*.007;
  base=mix(sand+vec3(ripples),rock,exposed);
 }
 float clearAir=exp(-4.*max(localDust,residualDust));
 float diffuse=max(0.,dot(normalize(vNormal),sun));
 vec3 lit=(base+grain)*(.06+.10*(1.-daylight)*clearAir+.69*daylight+diffuse*.24*daylight);
 vec3 headlight=vec3(0.);
 vec2 delta=vWorld.xy-roverLamp.xy;float along=dot(delta,vec2(sin(roverLamp.z),-cos(roverLamp.z))),across=abs(dot(delta,vec2(cos(roverLamp.z),sin(roverLamp.z))));
 // Broad high beam, with a level/upward core and weaker foreground fill.
 // Light reveals the surface color instead of painting every surface pale yellow.
 float forwardSpill=smoothstep(3.,28.,along);
 float spread=14.+max(0.,along)*.48;
 float vertical=vWorld.z-lampOrigin.z-along*(lampSlope+.09);
 float beam=roverLamp.w*forwardSpill*exp(-.5*pow(across/spread,2.))
  *exp(-.5*pow(vertical/((10.+max(0.,along)*.52)*(1.+airFill*airborne)),2.));
 // In flight the level beam must not become a downward searchlight.
 beam*=mix(1.,mix(.025,airFill,step(.001,airFill))+(1.-mix(.025,airFill,step(.001,airFill)))*smoothstep(-.22,-.055,vertical/max(1.,along)),airborne);
 float lampDistance=distance(lampOrigin,vWorld);
 beam*=exp(-max(localDust,residualDust)*lampDistance*.035);
 float levelCore=exp(-.5*pow(vertical/max(20.,along*.22),2.));
 float reach=mix(1.-smoothstep(320.,680.,lampDistance),1.-smoothstep(1000.,1800.,lampDistance),airborne*levelCore);
 if(kind<1.5&&roverPart<.5&&beam*reach>.001){
  vec3 toward=normalize(lampOrigin-vWorld);
  float incidence=max(0.,dot(normalize(vNormal),toward));
  float surfaceResponse=smoothstep(0.,.0015,incidence)*(.65+.35*sqrt(incidence));
  if(softSurfaceLighting>.5&&kind<.5)surfaceResponse=.65+.35*sqrt(incidence);
  float aim=.48+.52*smoothstep(20.,140.,along);
  float illumination=1.65*beam*reach*aim*lampVisibility(vWorld)*surfaceResponse;
  headlight=(base+grain)*vec3(1.,.97,.90)*illumination;lit+=headlight;
 }

 if(kind>3.5&&kind<4.5)lit=vec3(1.,.055,.02);
 if(roverPart>.5)lit=max(lit,base*(.20+.09*roverLamp.w));
 if(kind>5.5&&kind<6.5)lit=mix(base,vec3(1.,.92,.68),roverLamp.w);
 if(kind>7.5)lit=base*(.18+.82*daylight);
 else if(kind>6.5)lit=base;
 float fog=1.-exp(-pow(max(0.,vDepth)/3100.,1.7));
 if(backdropPass>.5)fog=.68+.24*(1.-exp(-max(0.,vDepth)/40000.));
 float alpha=kind>2.5&&kind<3.5?.17*clamp((vColor.x-(trackInfo.x-trackInfo.y))/128.,0.,1.)*(1.-localDust):kind>1.5&&kind<2.5?(1.-smoothstep(.15,1.,length(vLocal.xy/vec2(6.,8.))))*.24:1.;
 if(roverPart>.5)dustFog=min(dustFog,kind>5.5||kind>3.5&&kind<4.5?.35:.68);
 vec3 visible=mix(mix(lit,haze,min(.98,fog)),dustColor,dustFog);
 // A small amount of nearby reflected lamp light remains visible through the dust.
 visible+=headlight*dustFog*.45*exp(-lampDistance*.018);
 gl_FragColor=vec4(visible,alpha);
}`;
function program(gl,vs,fs){const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,vs));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;}
export class GPURenderer{
 constructor(canvas,area=null){this.area=area;this.defaultPickups=boostPickups;this.defaultSamples=samples;this.ground=area?.ground??ground;this.canvas=canvas;const gl=this.gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:true,powerPreference:'low-power'});if(!gl)throw Error(area?'This browser could not start 3D graphics. Try reloading or another browser.':'WebGL is unavailable. Current rendering remains available.');const derivatives=gl.getExtension('OES_standard_derivatives');this.program=program(gl,vertex,(derivatives?'#extension GL_OES_standard_derivatives : enable\n#define ACTUAL_SURFACE_NORMAL\n':'')+fragment);this.locations={};for(const name of ['wideDepth','backdropPass','airFill','softSurfaceLighting','shadowEnabled','areaMaterial','airborne','residualDust','lampSlope','lampOrigin','lampHeights','localDust','weather','roverLamp','roverPart','stormTime','wheel','camera','projection','actor','pitch','sun','haze','daylight','kind','slope','grit','trackInfo'])this.locations[name]=gl.getUniformLocation(this.program,name);this.attributes=['position','normal','color'].map(n=>gl.getAttribLocation(this.program,n));const mesh=area?.mesh??terrain();this.height=mesh.height;this.terrainInfo={vertices:mesh.vertices.length/9,triangles:mesh.indices.length/3,xs:mesh.xs,ys:mesh.ys};this.land=this.upload(mesh.vertices,area?.visualIndices??mesh.indices);this.raceLine=area?.raceLine?this.upload(area.raceLine):null;this.backdrop=area?.backdrop?this.upload(area.backdrop.vertices,area.backdrop.indices):null;this.details=(area?.details??[]).map(m=>this.upload(m.vertices,m.indices));const scenery=area?.scenery??outcrops();this.rocks=this.upload(scenery);this.headlightShadow=new HeadlightShadow(gl);this.drivingModels=new Map();this.rover=this.upload(drivingBody('sojourner'));this.wheel=this.upload(drivingWheel('sojourner'));this.drivingModels.set('sojourner',{body:this.rover,wheel:this.wheel,markers:this.upload(runningLights('sojourner')),tails:this.upload(tailLights('sojourner'))});this.brakes=this.upload(brakeLights());this.headlights=this.upload(headLights());this.sky=this.upload(new Float32Array([-1,-1,0,0,0,1,0,0,0, 1,-1,0,0,0,1,0,0,0, -1,1,0,0,0,1,0,0,0, 1,-1,0,0,0,1,0,0,0, 1,1,0,0,0,1,0,0,0, -1,1,0,0,0,1,0,0,0]));this.cell=this.upload(cell());this.shadow=this.upload(shadow());this.kitPods=this.upload(boosterPods());this.kitJets=Object.fromEntries(['forward','reverse','left','right','lift'].map(id=>[id,this.upload(jet(id))]));this.calls=0;this.tracks=new WheelTracks(this.height);this.trackMesh=this.upload(this.tracks.vertices);gl.bindBuffer(gl.ARRAY_BUFFER,this.trackMesh.b);gl.bufferData(gl.ARRAY_BUFFER,this.tracks.vertices.byteLength,gl.DYNAMIC_DRAW);
 const bytes=new Uint8Array(128*128);let seed=7421;for(let i=0;i<bytes.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;bytes[i]=seed>>>24;}this.texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.LUMINANCE,128,128,0,gl.LUMINANCE,gl.UNSIGNED_BYTE,bytes);gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);}
 upload(vertices,indices){const gl=this.gl,b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);let index=null;if(indices){index=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);}return {b,index,count:indices?.length??vertices.length/9};}
 mesh(m,actor=[0,0,0,100],kind=1){const gl=this.gl;gl.uniform4fv(this.locations.actor,actor);gl.uniform1f(this.locations.kind,kind);gl.bindBuffer(gl.ARRAY_BUFFER,m.b);for(let i=0;i<3;i++){gl.enableVertexAttribArray(this.attributes[i]);gl.vertexAttribPointer(this.attributes[i],3,gl.FLOAT,false,36,i*12);}if(m.index){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,m.index);gl.drawElements(gl.TRIANGLES,m.count,gl.UNSIGNED_SHORT,0);}else gl.drawArrays(gl.TRIANGLES,0,m.count);this.calls++;}
 reset(s){this.camera={x:s.x,y:s.y,h:s.heading};this.suspension=new Suspension();this.bodySlope=null;this.steerAngle=0;this.tracks?.reset();}
 draw(s,dt,overlay){const ground=this.ground,boostPickups=this.area?.pickups??this.defaultPickups??[],samples=this.area?.samples??this.defaultSamples??[];if(!this.camera)this.reset(s);const gl=this.gl,c=this.canvas,w=c.clientWidth,h=c.clientHeight,dpr=Math.min(devicePixelRatio,this.quality==='performance'?.75:1);if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);}gl.viewport(0,0,c.width,c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.useProgram(this.program);gl.uniform1f(this.locations.wideDepth,this.backdrop?1:0);gl.uniform4f(this.locations.wheel,0,0,0,0);const focus=this.height(s.x,s.y)+(s.renderClearance??Math.max(0,s.z-ground(s.x,s.y)))+6;
 const cam=chase(this.camera,s,dt,focus,(x,y)=>Math.max(this.height(x,y),(this.area?.cameraSurface??cameraSurface)(x,y)),this.height);this.lastCamera=cam;
 const focal=Math.min(w*.95,h*.9),pc=Math.cos(cam.pitch),ps=Math.sin(cam.pitch),sun=s.solar??{east:-.45,north:.6,up:.66};const daylight=Math.max(.02,Math.min(1,(sun.up+.03)/.3));this.calls=0;gl.uniform2f(this.locations.slope,0,0);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.uniform1i(this.locations.grit,0);
 gl.uniform4fv(this.locations.camera,[cam.x,cam.y,cam.eye,this.camera.h]);gl.uniform4fv(this.locations.projection,[2*focal/w,2*focal/h,0,0]);gl.uniform2fv(this.locations.pitch,[pc,ps]);gl.uniform3fv(this.locations.sun,[sun.east,-sun.north,sun.up]);gl.uniform3fv(this.locations.haze,sun.up<-.15?[.045,.052,.07]:daylight<.5?[.39,.30,.32]:[.70,.49,.34]);gl.uniform1f(this.locations.daylight,daylight);gl.uniform1f(this.locations.areaMaterial,this.area?1:0);
 this.project=(x,y,z)=>{const dx=x-cam.x,dy=y-cam.y,forward=dx*Math.sin(this.camera.h)-dy*Math.cos(this.camera.h),right=dx*Math.cos(this.camera.h)+dy*Math.sin(this.camera.h),vertical=cam.eye-z,depth=forward*pc+vertical*ps,up=vertical*pc-forward*ps;return {x:w/2+right*focal/depth,y:h*.38+up*focal/depth,depth};};
 const density=this.storm?.density(s.x,s.y)||0;gl.uniform1f(this.locations.residualDust,this.storm?.haze||0);gl.uniform1f(this.locations.localDust,density);const lift=Math.max(0,s.renderClearance??s.z-ground(s.x,s.y)),liftFraction=Math.min(1,lift/(this.flightLighting?160:45)),flightLight=liftFraction*liftFraction*(3-2*liftFraction);gl.uniform1f(this.locations.airborne,flightLight);gl.uniform1f(this.locations.airFill,this.flightLighting===2?.7:this.flightLighting===1?.4:0);this.lampStrength=this.headlightsOverride===undefined?Math.max(1-Math.max(0,Math.min(1,daylight*3-1)),Math.min(1,Math.max(density,this.storm?.haze||0)*4)):(this.headlightsOverride?1:0);
 const lampX=s.x+Math.sin(s.heading)*3.8,lampY=s.y-Math.cos(s.heading)*3.8,lampRise=(1-flightLight)*(this.height(lampX,lampY)-this.height(s.x,s.y)),lampSlope=lampRise/3.8,lampOrigin=[lampX,lampY,focus+.7+lampRise];
 gl.uniform1f(this.locations.softSurfaceLighting,this.softSurfaceLighting?1:0);const shadowMode=this.shadowMode??'all';gl.uniform1f(this.locations.shadowEnabled,shadowMode==='none'?0:1);
 if(this.lampStrength>0&&shadowMode!=='none'){this.headlightShadow.draw(lampOrigin,s.heading,lampSlope,shadowMode==='objects'?[this.rocks]:[this.land,this.rocks],shadowMode==='objects'?null:this.land);gl.viewport(0,0,c.width,c.height);gl.useProgram(this.program);}
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,this.headlightShadow.texture);gl.uniform1i(this.locations.lampHeights,1);gl.activeTexture(gl.TEXTURE0);gl.uniform1f(this.locations.lampSlope,lampSlope);gl.uniform3fv(this.locations.lampOrigin,lampOrigin);

 gl.uniform2f(this.locations.weather,this.storm?.front||0,this.storm?.age>=0?1:0);gl.uniform1f(this.locations.stormTime,Math.max(0,this.storm?.age||0));gl.uniform4f(this.locations.roverLamp,s.x,s.y,s.heading,this.lampStrength);gl.uniform1f(this.locations.roverPart,0);
 if(this.storm?.age>=0||this.storm?.haze>0){gl.disable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);this.mesh(this.sky,[0,0,0,100],5);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);}
 if(this.backdrop){gl.uniform1f(this.locations.backdropPass,1);this.mesh(this.backdrop,[0,0,0,100],0);gl.uniform1f(this.locations.backdropPass,0);}
 this.mesh(this.land,[0,0,0,100],0);for(const m of this.details)this.mesh(m,[0,0,0,100],0);if(this.raceLine&&s.mode==='trial'){gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1,-1);this.mesh(this.raceLine,[0,0,0,100],8);gl.disable(gl.POLYGON_OFFSET_FILL);}this.mesh(this.rocks);
 this.tracks.add(s,(offset,data)=>{gl.bindBuffer(gl.ARRAY_BUFFER,this.trackMesh.b);gl.bufferSubData(gl.ARRAY_BUFFER,offset*4,data);});this.trackMesh.count=this.tracks.vertexCount;gl.uniform2f(this.locations.trackInfo,this.tracks.count,this.tracks.capacity);gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1,-1);if(this.trackMesh.count)this.mesh(this.trackMesh,[0,0,0,100],3);gl.disable(gl.POLYGON_OFFSET_FILL);gl.depthMask(true);gl.disable(gl.BLEND);
 // Match the connected mesh under the wheels without writing simulation height.
 const z=this.height(s.x,s.y),sx=(this.height(s.x+3,s.y)-this.height(s.x-3,s.y))/6,sy=(this.height(s.x,s.y+3)-this.height(s.x,s.y-3))/6;
 gl.uniform2f(this.locations.slope,sx,sy);gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);this.mesh(this.shadow,[s.x,s.y,z+.2,s.heading],2);gl.depthMask(true);gl.disable(gl.BLEND);
 const clearance=s.renderClearance??Math.max(0,s.z-ground(s.x,s.y)),target=[s.air?0:sx,s.air?0:sy];if(!this.bodySlope)this.bodySlope=target;else if(dt>0){const blend=1-Math.exp(-dt*12);this.bodySlope=this.bodySlope.map((v,i)=>v+(target[i]-v)*blend);}gl.uniform2fv(this.locations.slope,this.bodySlope);const id=s.roverId||'sojourner';if(!this.drivingModels.has(id))this.drivingModels.set(id,{body:this.upload(drivingBody(id)),wheel:this.upload(drivingWheel(id)),markers:this.upload(runningLights(id)),tails:this.upload(tailLights(id))});const model=this.drivingModels.get(id);this.rover=model.body;this.wheel=model.wheel;this.renderedRoverId=id;const actor=[s.x,s.y,z+clearance+.3,s.heading];const compression=this.suspension.step(dt,s.air?0:(s.landingCompression||0)+Math.min(.1,Math.abs(sx-sy)*Math.abs(s.v)*.002));const chassis=[...actor];chassis[2]+=compression;const corners=[];for(const dx of [-8,8])for(const dy of [-8,8])for(const dz of [0,10])corners.push(this.project(s.x+dx,s.y+dy,chassis[2]+dz));const visible=corners.filter(p=>p.depth>1);this.roverScreenBounds=visible.length?{left:Math.min(...visible.map(p=>p.x)),right:Math.max(...visible.map(p=>p.x)),top:Math.min(...visible.map(p=>p.y)),bottom:Math.max(...visible.map(p=>p.y))}:null;gl.uniform1f(this.locations.roverPart,1);this.mesh(this.rover,chassis);this.mesh(this.headlights,chassis,6);this.mesh(model.tails,chassis,s.visualBrake?4:7);this.mesh(model.markers,chassis,7);this.renderedBoostKit=!!s.tune?.boostKit;if(this.renderedBoostKit){this.mesh(this.kitPods,chassis);if(s.thrust)this.mesh(this.kitJets[s.thrust>0?'forward':'reverse'],chassis,7);if(s.air&&s.visualSteer)this.mesh(this.kitJets[s.visualSteer>0?'right':'left'],chassis,7);}
 if(dt>0)this.steerAngle+=((s.visualSteer||0)*.52-this.steerAngle)*(1-Math.exp(-dt*16));
 for(const [x,y]of wheelPivots){gl.uniform4f(this.locations.wheel,x,y,this.steerAngle*Math.sign(y),1);const dx=x*Math.cos(s.heading)+y*Math.sin(s.heading),dy=x*Math.sin(s.heading)-y*Math.cos(s.heading),wheelActor=[...actor];if(!s.air)wheelActor[2]+=Math.max(-.6,Math.min(.6,this.height(s.x+dx,s.y+dy)-z-sx*dx-sy*dy));this.mesh(this.wheel,wheelActor);}gl.uniform4f(this.locations.wheel,0,0,0,0);gl.uniform2f(this.locations.slope,0,0);gl.uniform1f(this.locations.roverPart,0);for(const p of boostPickups){if(s.pickupSpent.includes(p.id)||Math.hypot(p.x-s.x,p.y-s.y)>1200)continue;this.mesh(this.cell,[p.x,p.y,ground(p.x,p.y)+.4,0]);}
 overlay.width=w;overlay.height=h;const ctx=overlay.getContext('2d');ctx.font='12px system-ui';ctx.textAlign='center';
 const sampleRows=this.area?.sampleRows?this.area.sampleRows(s):samples.map((p,index)=>({p,index,known:s.collected.includes(index)}));
 for(const row of sampleRows){const {p,index:i,known}=row;if(Math.hypot(p.x-s.x,p.y-s.y)>850)continue;const q=this.project(p.x,p.y,ground(p.x,p.y)+8);if(q.depth<4||q.x<20||q.x>w-20||q.y<65||q.y>h-130)continue;
 // Test the sight line against terrain so labels do not show through hills.
 let blocked=false;for(let j=1;j<20;j++){const t=j/20,x=cam.x+(p.x-cam.x)*t,y=cam.y+(p.y-cam.y)*t;if(ground(x,y)>cam.eye+(ground(p.x,p.y)+8-cam.eye)*t){blocked=true;break;}}if(blocked)continue;
 ctx.globalAlpha=1-(this.storm?.density(p.x,p.y)||0);ctx.fillStyle=row.region?'#d5edc1':p.kind==='site'?'#8fd5df':p.kind==='history'?'#efc786':'#e8a58e';ctx.beginPath();ctx.arc(q.x,q.y,row.region?5:3.5,0,Math.PI*2);ctx.fill();if(this.area?.quietDiscoveries){const near=Math.hypot(p.x-s.x,p.y-s.y)<=(this.area.collectibleLabelRange??18);if(near){ctx.fillStyle='#f6e9ce';ctx.font='12px system-ui';ctx.fillText(known?p.name:'???',q.x,q.y-11);}continue;}
 const text=(known?'✓ ':'')+p.name,tw=ctx.measureText(text).width;ctx.fillStyle='#182c30dd';ctx.fillRect(q.x-tw/2-7,q.y-30,tw+14,23);ctx.fillStyle='#e9ead6';ctx.fillText(text,q.x,q.y-14);}
 }
}

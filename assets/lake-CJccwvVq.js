import{Ct as e,F as t,H as n,T as r,Wt as i,Zt as a,_t as o,c as s,dt as c,g as l,in as u,kt as d,ln as f,mt as p,pt as m,v as h,x as g}from"./three.module-CakcQCxV.js";import{H as _,V as v,W as y}from"./calorisFlight-BSrEP9VA.js";import{n as b,r as x,t as S}from"./Reflector-ArkgsFLm.js";import{f as C,l as w,m as T,p as E}from"./calorisPresentation-Cye87mjM.js";function D(e=!1){let t=new o({color:16777215,roughness:.96});return t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 terrainPoint;varying vec3 terrainNormal;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
terrainPoint=position;terrainNormal=normal;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 terrainPoint;varying vec3 terrainNormal;
`+C).replace(`#include <color_fragment>`,`#include <color_fragment>
   vec3 p=terrainPoint;float n=fbm(p.xz*.003);float small=fbm(p.xz*.035);
   float slope=1.-abs(normalize(terrainNormal).y);
   vec3 forest=mix(vec3(.028,.080,.067),vec3(.105,.17,.115),n);
   vec3 rock=mix(vec3(.16,.17,.19),vec3(.29,.25,.23),n);
   vec3 col=mix(forest,rock,smoothstep(900.,1550.,p.y));
   float angle=atan(p.x,p.z+10300.);
   float fingers=sin(angle*41.+sin(angle*13.)*2.)*90.+sin(angle*83.)*25.;
   float snowEdge=1700.+fingers+noise(p.xz*.018)*95.;
   float snow=smoothstep(snowEdge,snowEdge+100.,p.y)*(1.-smoothstep(.16,.50,slope));
   col=mix(col,mix(vec3(.64,.72,.77),vec3(.92,.94,.92),small),snow);
   col*=.86+.20*small;
   diffuseColor.rgb*=col;
  `)},t.customProgramCacheKey=()=>e?`fuji-sculpted-v1`:`fuji-terrain-v1`,t}function O(){let e=new o({color:16777215,roughness:1});return e.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 p;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
p=position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 p;
`+C).replace(`#include <color_fragment>`,`#include <color_fragment>
 float n=fbm(p.xz*.045+fbm(p.xz*.008)*2.);float fine=noise(p.xz*1.8);vec3 c=mix(vec3(.16,.19,.085),vec3(.39,.34,.19),n);c*=.86+.2*fine;vec3 woods=mix(vec3(.028,.080,.067),vec3(.105,.17,.115),fbm(p.xz*.003))*(.86+.20*fbm(p.xz*.035));c=mix(c,woods,smoothstep(450.,1000.,-p.z));float pad=1.-smoothstep(10.,21.,length(p.xz));c=mix(c,vec3(.28,.27,.20)*(.9+fine*.16),pad*.8);diffuseColor.rgb*=c;`)},e.customProgramCacheKey=()=>`fuji-meadow-v1`,e}function k(t,r,i){let a=E(i),s=new e,c=new n(new g(.12,.23,1,5),new o({color:4276021}),r.length),u=new h(1,1,9,3),d=u.getAttribute(`position`);for(let e=0;e<d.count;e++){let t=1+.1*Math.sin(e*4.7);d.setXYZ(e,d.getX(e)*t,d.getY(e),d.getZ(e)*t)}u.computeVertexNormals();let f=new n(u,new o({color:16777215,roughness:1}),r.length*3);r.forEach(([e,t,n,r],i)=>{s.position.set(e,t+r*.43,n),s.scale.set(r*.13,r*.86,r*.13),s.rotation.set(0,0,0),s.updateMatrix(),c.setMatrixAt(i,s.matrix);for(let o=0;o<3;o++){let c=r*(.24-o*.045);s.position.set(e+(a()-.5)*r*.06,t+r*(.44+o*.2),n),s.scale.set(c,r*.6,c),s.rotation.y=a()*6.28,s.updateMatrix(),f.setMatrixAt(i*3+o,s.matrix),f.setColorAt(i*3+o,new l().setHSL(.36+a()*.06,.22+a()*.16,.1+a()*.055))}}),c.castShadow=!0,f.castShadow=!0,t.add(c,f)}function A(t,r,i){let a=E(i),s=8500,c=new n(new h(.05,.42,3),new o({color:16777215,roughness:1}),s),u=new e;for(let e=0;e<s;e++){let t=(a()-.5)*210,n=(a()-.5)*170;Math.hypot(t,n)<12&&(t+=Math.sign(t||1)*14),u.position.set(t,r(t,n)+.12,n),u.rotation.set((a()-.5)*.5,a()*6.28,(a()-.5)*.4),u.scale.set(1,.6+a()*1.2,1),u.updateMatrix(),c.setMatrixAt(e,u.matrix),c.setColorAt(e,new l().setHSL(.15+a()*.06,.28,.18+a()*.16))}t.add(c)}var j=2876;function M(e,t){let n=t+10300,r=Math.hypot(e,n),i=Math.atan2(e,n),a=j*Math.max(0,1-Math.max(0,r-380)/9020)**1.72,o=(Math.sin(i*37+Math.sin(i*9)*2)*.5+.5)*55*Math.sin(Math.min(1,r/9400)*Math.PI)*Math.min(1,r/400),s=175*Math.exp(-((r/260)**4));return a-o-s-8*c.smoothstep(r,8800,9500)}function N(){let e=new t;e.name=`A-continuous-fuji-heightfield`;let n=w(384,200,(e,t)=>{let n=-e*Math.PI*2,r=20+t*t*18e3,i=Math.cos(n)*r,a=-10300+Math.sin(n)*r;return new f(i,M(i,a),a)},D());e.add(n);let r=(e,t)=>{let n=Math.hypot(e,t);return(Math.sin(e*.025)*Math.sin(t*.026)*2+Math.sin(e*.009+t*.013)*1.4)*c.smoothstep(n,22,70)};e.add(w(150,140,(e,t)=>{let n=Math.sign(e-.5)*(Math.exp(Math.abs(e-.5)*2*Math.log(9001))-1),i=-900+t*t*9e3;return new f(n,r(n,i),i)},O()));let i=E(732),a=[],o=[];for(let e=0;e<1750;e++){let e=(i()-.5)*7400,t=-650-i()*3500;a.push([e,Math.max(M(e,t),r(e,t)),t,10+i()*17])}for(let e=0;e<200;e++){let e=(i()-.5)*950,t=-300+i()*1e3;Math.abs(e)<65||Math.hypot(e,t)<90||a.push([e,r(e,t),t,7+i()*13])}k(e,a,198),A(e,r,132);for(let e=0;e<170;e++){let e=(i()-.5)*300,t=(i()-.5)*190;Math.hypot(e,t)>13&&o.push([e,r(e,t),t,.2+i()*.9])}return T(e,o),{root:e,heightAt:r,update(){}}}function P(h,g=!0){let T={value:1},D=new t;D.name=`A-lake-kawaguchi-barge`;let O=new p(new a(39e3,40,20),new i({side:1,depthWrite:!1,uniforms:{zenith:{value:new l(5014197)},horizon:{value:new l(12110812)}},vertexShader:`varying vec3 direction;void main(){direction=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform vec3 zenith,horizon;varying vec3 direction;void main(){float t=smoothstep(-.03,.65,normalize(direction).y);gl_FragColor=vec4(mix(horizon,zenith,t),1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}));O.renderOrder=-10,D.add(O);let A={value:y(h).snow},j={value:y(h).snowLine},N=new o({color:16777215,roughness:1});N.onBeforeCompile=e=>{Object.assign(e.uniforms,{snow:A,snowLine:j}),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 point;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
point=position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 point;uniform float snow,snowLine;
`+C).replace(`#include <color_fragment>`,`#include <color_fragment>
  vec3 p=point;float a=atan(p.x,p.z+16000.);float n=fbm(p.xz*.006),fine=fbm(p.xz*.05);
  float channel=pow(.5+.5*sin(a*87.+sin(a*23.)*2.+fbm(p.xz*.002)*7.),6.);
  vec3 green=mix(vec3(.035,.075,.060),vec3(.09,.14,.095),n);
  vec3 lava=mix(vec3(.13,.105,.12),vec3(.27,.20,.18),n);
  vec3 col=mix(green,lava,smoothstep(1100.,1850.,p.y));col*=.78+fine*.24+channel*.2;
  float fingers=sin(a*41.+sin(a*13.)*2.)*90.+sin(a*83.)*35.;
  float cover=smoothstep(snowLine+fingers,snowLine+fingers+90.,p.y)*smoothstep(0.,.03,snow);
  cover*=1.-channel*.52;
  col=mix(col,mix(vec3(.57,.67,.79),vec3(.95,.96,.98),fine),cover);
  // Narrow mixed mineral shore. Width and color vary along the bank; wet stones darken.
  float shore=-2250.+sin(p.x*.00055)*65.+sin(p.x*.0013)*28.;
  float inland=shore-p.z;float width=28.+noise(vec2(p.x*.009,7.))*38.;
  float minerals=1.-smoothstep(width,width+30.,inland);
  float grain=fbm(p.xz*.42);vec3 gravel=mix(vec3(.065,.074,.077),vec3(.19,.18,.155),grain);
  float sandPatch=smoothstep(.64,.82,noise(vec2(p.x*.003,19.)));
  gravel=mix(gravel,vec3(.21,.19,.15)*(.78+grain*.3),sandPatch*.55);
  gravel*=mix(.48,1.,smoothstep(-1.3,1.2,p.y));
  col=mix(col,gravel,minerals);
  diffuseColor.rgb*=col;`)},N.customProgramCacheKey=()=>`fuji-lake-season-v1`;let P=(e,t)=>M(e,t+5700)*1.023,F=e=>-2250+Math.sin(e*55e-5)*65+Math.sin(e*.0013)*28,I=(e,t)=>{let n=F(e)-t,r=Math.max(0,P(e,t)),i=30+55*(.5+.5*Math.sin(e*.0012+t*8e-4))**2;return-2+c.smoothstep(n,0,250)*(r+i*Math.exp(-r/180))},L=w(520,400,(e,t)=>{let n=36e3*Math.sinh((e-.5)*4.4)/Math.sinh(2.2),r=t<.84?240+(1-t/.84)*(4e4+F(n)-240):240*(1-(t-.84)/.16)-24*((t-.84)/.16),i=F(n)-r;return new f(n,I(n,i),i)},N);L.name=`continuous-opposite-shore-and-fuji`,D.add(L);let R=E(852),z=[];for(let e=0;e<2400;e++){let e=(R()-.5)*15500,t=F(e)-80-R()*1800;z.push([e,I(e,t),t,10+R()*18])}k(D,z,718);let B=E(954),V=new n(new r(1,0),new o({color:16777215,roughness:.95}),3200),H=new e;V.name=`shore-gravel-and-lava-stones`;for(let e=0;e<3200;e++){let t=(B()-.5)*22e3,n=F(t)-8-B()*50,r=.5+B()*2.3;H.position.set(t,I(t,n)+r*.22,n),H.scale.set(r,.4*r,r*(.6+B()*.5)),H.rotation.set(B(),B()*6.28,B()),H.updateMatrix(),V.setMatrixAt(e,H.matrix),V.setColorAt(e,new l().setHSL(.1+B()*.08,.04+B()*.08,.12+B()*.12))}D.add(V);let U=new n(new s(1,1,1),new o({color:6714745,roughness:.9}),100),W=new e;for(let e=0;e<100;e++){let t=(R()-.5)*7e3,n=F(t)-35-R()*160,r=5+R()*13;W.position.set(t,I(t,n)+r/2,n),W.scale.set(12+R()*23,r,8+R()*16),W.updateMatrix(),U.setMatrixAt(e,W.matrix)}D.add(U);let G=b(D,v,_),K=new S(new d(34e3,28e3),{textureWidth:1024,textureHeight:1024,multisample:0,clipBias:0,color:7903145,shader:{name:`Fuji lake reflection`,uniforms:{tDiffuse:{value:null},textureMatrix:{value:new m},color:{value:new l},time:{value:0}},vertexShader:`uniform mat4 textureMatrix;varying vec4 mirrorUv;varying vec3 worldPoint;void main(){mirrorUv=textureMatrix*vec4(position,1.);worldPoint=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D tDiffuse;uniform vec3 wash,waterOrigin;uniform float time;varying vec4 mirrorUv;varying vec3 worldPoint;
 ${C}
 ${x}
 void main(){vec2 p=worldPoint.xz-waterOrigin.xz;float d=distance(cameraPosition,worldPoint);vec2 wave=vec2(sin(p.y*.14+time*.7+sin(p.x*.025)),sin(p.x*.085-time*.45))*0.0008;wave+=vec2(noise(p*.045+time*.035)-.5,noise(p*.065-time*.025)-.5)*.0013;
 // Undistorted reflection at contact: displaced samples otherwise fetch sky across the bank.
 float bank=-2250.+sin(p.x*.00055)*65.+sin(p.x*.0013)*28.;
 wave*=smoothstep(12.,110.,p.y-bank);
 vec2 uv=mirrorUv.xy/mirrorUv.w;vec3 reflection=texture2D(tDiffuse,uv+wave).rgb;
 float grazing=pow(1.-clamp(normalize(cameraPosition-worldPoint).y,0.,1.),3.);
 vec3 waterColor=vec3(.025,.09,.13);vec3 col=mix(waterColor,reflection,.46+.43*grazing);
 // A narrow submerged mineral shelf damps sky reflection at the wet contact edge.
 // This also prevents filtered reflection texels from outlining the shore in pale sky color.
 float shallows=1.-smoothstep(0.,35.,p.y-bank+12.);
 col=mix(col,vec3(.033,.043,.044),shallows*.78);
 float phase=p.y*.45+sin(p.x*.08)+time*.5;float glint=pow(max(0.,sin(phase)),18.)*.028/(1.+fwidth(phase)*2.);col+=glint*(1.-smoothstep(200.,6000.,d));col=mix(col,vec3(.68,.79,.78),waterWash(p,wash,time));gl_FragColor=vec4(col,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}});K.material.uniforms.wash=G.wash,K.material.uniforms.waterOrigin={value:D.position},K.rotation.x=-Math.PI/2,K.position.set(0,v,-3500),D.add(K);let q=new t;q.name=`landing-barge`,D.add(q);let J=(e,t,n,r,i,a,c)=>{let l=new p(new s(e,t,n),new o({color:c,roughness:.8,metalness:.25}));return l.position.set(r,i,a),l.castShadow=l.receiveShadow=!0,q.add(l),l};J(22,2.3,32,0,-1.2,0,2505801),J(21.8,.12,31.8,0,-.06,0,5858922);for(let e of[-10.6,10.6]){J(.32,.04,31,e,.025,0,14134616);for(let t of[-13,-7,0,7,13]){let n=new p(new u(.48,.19,6,12),new o({color:1515557}));n.rotation.y=Math.PI/2,n.position.set(e*1.05,-.85,t),q.add(n)}}for(let e of[-15.4,15.4])J(21.3,.04,.35,0,.025,e,14134616);for(let e of[-9.6,9.6])for(let t of[-13.8,13.8])J(.32,.65,.32,e,.325,t,3623252),J(.85,.16,.25,e,.65,t,10858160);for(let e=-12;e<=12;e+=3)J(20,.012,.035,0,.006,e,4345683);let Y=new i({transparent:!0,depthWrite:!1,side:2,uniforms:{time:{value:0},brightness:T},vertexShader:`varying vec2 vUv;varying vec3 p;void main(){vUv=uv;p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time,brightness;varying vec2 vUv;varying vec3 p;${C}void main(){vec2 q=(vUv-.5)*2.;float edge=1.-smoothstep(.45,1.,dot(q,q));float n=fbm(vec2(p.x*.002-time*.018,p.y*.007)+vUv*3.);float a=edge*smoothstep(.27,.7,n)*.32;gl_FragColor=vec4(mix(vec3(.57,.66,.75),vec3(.89,.92,.94),vUv.y)*brightness,a);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),X=new t;X.name=`foothill-cloud-belt`,X.visible=g;for(let e=0;e<22;e++){let t=new p(new d(1300+R()*1700,250+R()*280),Y);t.position.set((e/21-.5)*17e3,240+R()*170,-4300-R()*2200),X.add(t)}return D.add(X),{root:D,heightAt:_,setThrust(e){G.update(e)},update(e){K.material.uniforms.time.value=e,Y.uniforms.time.value=e},setDate(e){let t=y(e);A.value=t.snow,j.value=t.snowLine},setDarkness(e){let t=Math.max(0,Math.min(1,e));T.value=1-t*.88,O.material.uniforms.zenith.value.setHex(5014197).lerp(new l(330777),t),O.material.uniforms.horizon.value.setHex(12110812).lerp(new l(1516339),t)},setClouds(e){X.visible=e},release(){K.getRenderTarget().dispose()}}}export{O as a,A as i,N as n,D as o,k as r,P as t};
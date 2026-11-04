import{Bt as e,Ct as t,Dt as n,F as r,an as i,cn as a,g as o,l as s,lt as c,on as l,rn as u,u as d,ut as f,wt as p}from"./three.module-CWFLg5dr.js";var m=`float waterWash(vec2 p,vec3 wash,float time){float wr=length(p-wash.xy);return exp(-wr*.23)*(.55+.45*sin(wr*3.-time*13.))*wash.z*.65;}`;function h(t,r,a){let o={value:new i},c=new Float32Array(288),l=new d;l.setAttribute(`position`,new s(c,3));let u=new e({transparent:!0,depthWrite:!1,uniforms:{strength:{value:0}},vertexShader:`void main(){vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(260./max(1.,-p.z),1.5,5.);}`,fragmentShader:`uniform float strength;void main(){float a=1.-smoothstep(.15,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.78,.90,.91,a*strength*.75);}`}),f=new n(l,u);f.name=`water-thrust-spray`,f.frustumCulled=!1,f.visible=!1,t.add(f);let p=0,m=0;function h(e,t=e.time){let n=Math.cos(e.angle),i=e.y-2-r,s=n>.25?i/n:1/0,d=e.x-Math.sin(e.angle)*s,h=Number.isFinite(d)&&a(d,0)<=r+.05,g=e.thrusting&&!e.failed&&!e.complete&&h&&s>0&&s<18?(1-s/18)**1.2:0;e.time<m&&(p=0);let _=Math.max(0,Math.min(.1,e.time-m));if(m=e.time,g>0?(o.value.x=d,o.value.y=0,p=g):p*=Math.exp(-_*6),(e.failed||e.complete)&&(p=0),o.value.z=p,f.visible=p>.015,u.uniforms.strength.value=p,f.visible){for(let e=0;e<96;e++){let n=(t*1.3+e*.61803398875)%1,i=e*2.399963,a=1+n*(5+p*7),s=e*3;c[s]=o.value.x+Math.cos(i)*a,c[s+1]=r+.08+Math.sin(n*Math.PI)*(1.2+p*3)*(1-e%5*.1),c[s+2]=Math.sin(i)*a*.65}l.attributes.position.needsUpdate=!0}}return{wash:o,update:h,spray:f}}var g=class n extends f{constructor(s,d={}){super(s),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this.camera=new t;let f=this,m=d.color===void 0?new o(8355711):new o(d.color),h=d.textureWidth||512,g=d.textureHeight||512,_=d.clipBias||0,v=d.shader||n.ReflectorShader,y=d.multisample===void 0?4:d.multisample,b=new p,x=new i,S=new i,C=new i,w=new c,T=new i(0,0,-1),E=new l,D=new i,O=new i,k=new l,A=new c,j=this.camera,M=new a(h,g,{samples:y,type:r}),N=new e({name:v.name===void 0?`unspecified`:v.name,uniforms:u.clone(v.uniforms),fragmentShader:v.fragmentShader,vertexShader:v.vertexShader});N.uniforms.tDiffuse.value=M.texture,N.uniforms.color.value=m,N.uniforms.textureMatrix.value=A,this.material=N,this.onBeforeRender=function(e,t,n){if(S.setFromMatrixPosition(f.matrixWorld),C.setFromMatrixPosition(n.matrixWorld),w.extractRotation(f.matrixWorld),x.set(0,0,1),x.applyMatrix4(w),D.subVectors(S,C),D.dot(x)>0&&this.forceUpdate===!1)return;D.reflect(x).negate(),D.add(S),w.extractRotation(n.matrixWorld),T.set(0,0,-1),T.applyMatrix4(w),T.add(C),O.subVectors(S,T),O.reflect(x).negate(),O.add(S),j.position.copy(D),j.up.set(0,1,0),j.up.applyMatrix4(w),j.up.reflect(x),j.lookAt(O),j.far=n.far,j.updateMatrixWorld(),j.projectionMatrix.copy(n.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(j.projectionMatrix),A.multiply(j.matrixWorldInverse),A.multiply(f.matrixWorld),b.setFromNormalAndCoplanarPoint(x,S),b.applyMatrix4(j.matrixWorldInverse),E.set(b.normal.x,b.normal.y,b.normal.z,b.constant);let r=j.projectionMatrix;k.x=(Math.sign(E.x)+r.elements[8])/r.elements[0],k.y=(Math.sign(E.y)+r.elements[9])/r.elements[5],k.z=-1,k.w=(1+r.elements[10])/r.elements[14],E.multiplyScalar(2/E.dot(k)),r.elements[2]=E.x,r.elements[6]=E.y,r.elements[10]=E.z+1-_,r.elements[14]=E.w,f.visible=!1;let i=e.getRenderTarget(),a=e.xr.enabled,o=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(M),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,j),e.xr.enabled=a,e.shadowMap.autoUpdate=o,e.setRenderTarget(i);let s=n.viewport;s!==void 0&&e.state.viewport(s),f.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return M},this.dispose=function(){M.dispose(),f.material.dispose()}}};g.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};export{h as n,m as r,g as t};
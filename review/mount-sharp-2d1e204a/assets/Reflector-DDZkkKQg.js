import{$t as e,It as t,N as n,Qt as r,Xt as i,bt as a,c as o,m as s,ot as c,s as l,st as u,tn as d,wt as f,xt as p}from"./three.module-BGrGSBXR.js";var m=`float waterWash(vec2 p,vec3 wash,float time){float wr=length(p-wash.xy);return exp(-wr*.23)*(.55+.45*sin(wr*3.-time*13.))*wash.z*.65;}`;function h(e,n,i){let a={value:new r},s=new Float32Array(288),c=new o;c.setAttribute(`position`,new l(s,3));let u=new t({transparent:!0,depthWrite:!1,uniforms:{strength:{value:0}},vertexShader:`void main(){vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(260./max(1.,-p.z),1.5,5.);}`,fragmentShader:`uniform float strength;void main(){float a=1.-smoothstep(.15,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.78,.90,.91,a*strength*.75);}`}),d=new f(c,u);d.name=`water-thrust-spray`,d.frustumCulled=!1,d.visible=!1,e.add(d);let p=0,m=0;function h(e,t=e.time){let r=Math.cos(e.angle),o=e.y-2-n,l=r>.25?o/r:1/0,f=e.x-Math.sin(e.angle)*l,h=Number.isFinite(f)&&i(f,0)<=n+.05,g=e.thrusting&&!e.failed&&!e.complete&&h&&l>0&&l<18?(1-l/18)**1.2:0;e.time<m&&(p=0);let _=Math.max(0,Math.min(.1,e.time-m));if(m=e.time,g>0?(a.value.x=f,a.value.y=0,p=g):p*=Math.exp(-_*6),(e.failed||e.complete)&&(p=0),a.value.z=p,d.visible=p>.015,u.uniforms.strength.value=p,d.visible){for(let e=0;e<96;e++){let r=(t*1.3+e*.61803398875)%1,i=e*2.399963,o=1+r*(5+p*7),c=e*3;s[c]=a.value.x+Math.cos(i)*o,s[c+1]=n+.08+Math.sin(r*Math.PI)*(1.2+p*3)*(1-e%5*.1),s[c+2]=Math.sin(i)*o*.65}c.attributes.position.needsUpdate=!0}}return{wash:a,update:h,spray:d}}var g=class o extends u{constructor(l,u={}){super(l),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this.camera=new a;let f=this,m=u.color===void 0?new s(8355711):new s(u.color),h=u.textureWidth||512,g=u.textureHeight||512,_=u.clipBias||0,v=u.shader||o.ReflectorShader,y=u.multisample===void 0?4:u.multisample,b=new p,x=new r,S=new r,C=new r,w=new c,T=new r(0,0,-1),E=new e,D=new r,O=new r,k=new e,A=new c,j=this.camera,M=new d(h,g,{samples:y,type:n}),N=new t({name:v.name===void 0?`unspecified`:v.name,uniforms:i.clone(v.uniforms),fragmentShader:v.fragmentShader,vertexShader:v.vertexShader});N.uniforms.tDiffuse.value=M.texture,N.uniforms.color.value=m,N.uniforms.textureMatrix.value=A,this.material=N,this.onBeforeRender=function(e,t,n){if(S.setFromMatrixPosition(f.matrixWorld),C.setFromMatrixPosition(n.matrixWorld),w.extractRotation(f.matrixWorld),x.set(0,0,1),x.applyMatrix4(w),D.subVectors(S,C),D.dot(x)>0&&this.forceUpdate===!1)return;D.reflect(x).negate(),D.add(S),w.extractRotation(n.matrixWorld),T.set(0,0,-1),T.applyMatrix4(w),T.add(C),O.subVectors(S,T),O.reflect(x).negate(),O.add(S),j.position.copy(D),j.up.set(0,1,0),j.up.applyMatrix4(w),j.up.reflect(x),j.lookAt(O),j.far=n.far,j.updateMatrixWorld(),j.projectionMatrix.copy(n.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(j.projectionMatrix),A.multiply(j.matrixWorldInverse),A.multiply(f.matrixWorld),b.setFromNormalAndCoplanarPoint(x,S),b.applyMatrix4(j.matrixWorldInverse),E.set(b.normal.x,b.normal.y,b.normal.z,b.constant);let r=j.projectionMatrix;k.x=(Math.sign(E.x)+r.elements[8])/r.elements[0],k.y=(Math.sign(E.y)+r.elements[9])/r.elements[5],k.z=-1,k.w=(1+r.elements[10])/r.elements[14],E.multiplyScalar(2/E.dot(k)),r.elements[2]=E.x,r.elements[6]=E.y,r.elements[10]=E.z+1-_,r.elements[14]=E.w,f.visible=!1;let i=e.getRenderTarget(),a=e.xr.enabled,o=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(M),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,j),e.xr.enabled=a,e.shadowMap.autoUpdate=o,e.setRenderTarget(i);let s=n.viewport;s!==void 0&&e.state.viewport(s),f.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return M},this.dispose=function(){M.dispose(),f.material.dispose()}}};g.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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
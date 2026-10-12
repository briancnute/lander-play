import{$t as e,It as t,N as n,Qt as r,Xt as i,bt as a,m as o,ot as s,st as c,tn as l,xt as u}from"./three.module-BGrGSBXR.js";var d=class d extends c{constructor(c,f={}){super(c),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this.camera=new a;let p=this,m=f.color===void 0?new o(8355711):new o(f.color),h=f.textureWidth||512,g=f.textureHeight||512,_=f.clipBias||0,v=f.shader||d.ReflectorShader,y=f.multisample===void 0?4:f.multisample,b=new u,x=new r,S=new r,C=new r,w=new s,T=new r(0,0,-1),E=new e,D=new r,O=new r,k=new e,A=new s,j=this.camera,M=new l(h,g,{samples:y,type:n}),N=new t({name:v.name===void 0?`unspecified`:v.name,uniforms:i.clone(v.uniforms),fragmentShader:v.fragmentShader,vertexShader:v.vertexShader});N.uniforms.tDiffuse.value=M.texture,N.uniforms.color.value=m,N.uniforms.textureMatrix.value=A,this.material=N,this.onBeforeRender=function(e,t,n){if(S.setFromMatrixPosition(p.matrixWorld),C.setFromMatrixPosition(n.matrixWorld),w.extractRotation(p.matrixWorld),x.set(0,0,1),x.applyMatrix4(w),D.subVectors(S,C),D.dot(x)>0&&this.forceUpdate===!1)return;D.reflect(x).negate(),D.add(S),w.extractRotation(n.matrixWorld),T.set(0,0,-1),T.applyMatrix4(w),T.add(C),O.subVectors(S,T),O.reflect(x).negate(),O.add(S),j.position.copy(D),j.up.set(0,1,0),j.up.applyMatrix4(w),j.up.reflect(x),j.lookAt(O),j.far=n.far,j.updateMatrixWorld(),j.projectionMatrix.copy(n.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(j.projectionMatrix),A.multiply(j.matrixWorldInverse),A.multiply(p.matrixWorld),b.setFromNormalAndCoplanarPoint(x,S),b.applyMatrix4(j.matrixWorldInverse),E.set(b.normal.x,b.normal.y,b.normal.z,b.constant);let r=j.projectionMatrix;k.x=(Math.sign(E.x)+r.elements[8])/r.elements[0],k.y=(Math.sign(E.y)+r.elements[9])/r.elements[5],k.z=-1,k.w=(1+r.elements[10])/r.elements[14],E.multiplyScalar(2/E.dot(k)),r.elements[2]=E.x,r.elements[6]=E.y,r.elements[10]=E.z+1-_,r.elements[14]=E.w,p.visible=!1;let i=e.getRenderTarget(),a=e.xr.enabled,o=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(M),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,j),e.xr.enabled=a,e.shadowMap.autoUpdate=o,e.setRenderTarget(i);let s=n.viewport;s!==void 0&&e.state.viewport(s),p.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return M},this.dispose=function(){M.dispose(),p.material.dispose()}}};d.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};export{d as t};
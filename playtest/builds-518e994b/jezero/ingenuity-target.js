import {triangle} from '../mars-renderer/triangle.js';
// Reuse Gale's Mars globe artwork, drawn in world depth so terrain/craft occlude it.
// This private material leaves the shared terrain renderer and collection math alone.
export function createIngenuityTarget(gpu){
 const gl=gpu.gl,vs=`attribute vec2 point,uv;uniform vec4 camera,projection;uniform vec2 pitch;uniform vec3 center;uniform float wideDepth;varying vec2 tex;
 void main(){float s=sin(camera.w),c=cos(camera.w);vec3 p=center+vec3(c*point.x-s*pitch.y*point.y,s*point.x+c*pitch.y*point.y,pitch.x*point.y);float dx=p.x-camera.x,dy=p.y-camera.y,f=dx*s-dy*c,r=dx*c+dy*s,v=camera.z-p.z,depth=f*pitch.x+v*pitch.y,up=v*pitch.x-f*pitch.y;gl_Position=vec4(r*projection.x,depth*.24-up*projection.y,mix(1.000375,1.000025,wideDepth)*depth-mix(3.00056,3.0000375,wideDepth),depth);tex=uv;}`;
 const fs=`#ifdef GL_FRAGMENT_PRECISION_HIGH
 precision highp float;
 #else
 precision mediump float;
 #endif
 uniform sampler2D atlas;uniform vec2 frames;uniform float blend,opacity,flash;varying vec2 tex;
 vec4 sampleFrame(float frame){return texture2D(atlas,vec2((frame*128.+.5+tex.x*127.)/2048.,(.5+tex.y*127.)/128.));}
 void main(){vec4 color=mix(sampleFrame(frames.x),sampleFrame(frames.y),blend);if(color.a<.02)discard;gl_FragColor=vec4(mix(color.rgb,vec3(1.,.91,.65),flash),color.a*opacity);}`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
 const program=gl.createProgram(),vertex=shader(gl.VERTEX_SHADER,vs),fragment=shader(gl.FRAGMENT_SHADER,fs);gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.deleteShader(vertex);gl.deleteShader(fragment);
 const uniforms=Object.fromEntries(['camera','projection','pitch','center','wideDepth','atlas','frames','blend','opacity','flash'].map(name=>[name,gl.getUniformLocation(program,name)])),point=gl.getAttribLocation(program,'point'),uv=gl.getAttribLocation(program,'uv'),buffer=gl.createBuffer(),radius=46;
 gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-radius,-radius,0,1,radius,-radius,1,1,radius,radius,1,0,-radius,-radius,0,1,radius,radius,1,0,-radius,radius,0,0]),gl.STATIC_DRAW);
 const texture=gl.createTexture(),image=new Image();let ready=false;function upload(source){gl.activeTexture(gl.TEXTURE6);gl.bindTexture(gl.TEXTURE_2D,texture);const flip=gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL),premultiply=gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,flip);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,premultiply);gl.activeTexture(gl.TEXTURE0);ready=true;}
 // A visible local Mars placeholder protects the first pickup on a cold/failed download.
 const tile=document.createElement('canvas');tile.width=tile.height=128;const paint=tile.getContext('2d');paint.save();paint.beginPath();paint.arc(64,64,58,0,Math.PI*2);paint.clip();const shade=paint.createRadialGradient(43,33,5,64,64,66);shade.addColorStop(0,'#ed985d');shade.addColorStop(.55,'#b9512d');shade.addColorStop(1,'#542c22');paint.fillStyle=shade;paint.fillRect(0,0,128,128);paint.fillStyle='#58382e';for(const [x,y,w,h,r]of [[75,56,13,22,.3],[43,82,21,8,-.3],[89,86,15,7,.5]]){paint.beginPath();paint.ellipse(x,y,w,h,r,0,Math.PI*2);paint.fill();}paint.fillStyle='#ddc8ac';paint.beginPath();paint.ellipse(62,10,15,4,0,0,Math.PI*2);paint.fill();paint.restore();const fallback=document.createElement('canvas');fallback.width=2048;fallback.height=128;const atlasPaint=fallback.getContext('2d');for(let i=0;i<16;i++)atlasPaint.drawImage(tile,i*128,0);upload(fallback);
 image.onload=()=>upload(image);image.src=new URL('../gale/assets/mars-orbs.png',import.meta.url).href;
 const spark=[];triangle(spark,[-1,0,0],[0,0,4],[1,0,0],[1,.88,.55]);triangle(spark,[-1,0,0],[1,0,0],[0,0,-4],[1,.88,.55]);const fleck=gpu.upload(new Float32Array(spark));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function globe(p,time,opacity=1,flash=0){
  if(!ready)return;const camera=gl.getUniform(gpu.program,gpu.locations.camera),projection=gl.getUniform(gpu.program,gpu.locations.projection),pitch=gl.getUniform(gpu.program,gpu.locations.pitch),wide=gl.getUniform(gpu.program,gpu.locations.wideDepth),frame=reduced?0:((time*2+(p.id??0)*3)%16+16)%16;
  gl.useProgram(program);gl.uniform4fv(uniforms.camera,camera);gl.uniform4fv(uniforms.projection,projection);gl.uniform2fv(uniforms.pitch,pitch);gl.uniform3f(uniforms.center,p.x,p.y,p.z);gl.uniform1f(uniforms.wideDepth,wide);gl.uniform2f(uniforms.frames,Math.floor(frame),(Math.floor(frame)+1)%16);gl.uniform1f(uniforms.blend,frame%1);gl.uniform1f(uniforms.opacity,opacity);gl.uniform1f(uniforms.flash,flash);gl.activeTexture(gl.TEXTURE6);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(uniforms.atlas,6);
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);for(const [attribute,offset]of [[point,0],[uv,8]]){gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,16,offset);}gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ZERO,gl.ONE);gl.depthMask(false);gl.drawArrays(gl.TRIANGLES,0,6);gl.depthMask(true);gl.disable(gl.BLEND);gl.activeTexture(gl.TEXTURE0);gl.useProgram(gpu.program);
 }
 return {
  draw(p,heading,time){globe({...p,z:p.z+(reduced?0:Math.sin(time*1.6+(p.id??0)) *4)},time);},
  effect(event,time){if(!event?.target)return;const age=time-event.time;if(age<0||age>.6)return;const p=event.target,h=event.heading,hit=event.kind==='hit';if(hit&&age<.14)globe(p,time,1-age/.14,.75);if(!hit&&age<.35)globe({...p,z:p.z-age*30},time,1-age/.35);
   if(hit)for(let i=0;i<8;i++){const a=i*2.39996,side=Math.cos(a)*(14+age*90);gpu.mesh(fleck,[p.x+Math.cos(h)*side,p.y+Math.sin(h)*side,p.z+Math.sin(a)*(14+age*65),h],7);}
  }
 };
}

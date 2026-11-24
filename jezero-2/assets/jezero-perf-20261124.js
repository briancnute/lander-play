import "./browser-input-mobile-20261124.js";
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=``+new URL(`lrv-qNC96qVI.png`,import.meta.url).href,t=``+new URL(`scooter-BcEiSKCS.png`,import.meta.url).href,n=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#111418"><title>ASTRA · Apollo 11</title><link rel="stylesheet" href="../loading-screen.css"></head>
<body><script src="../loading-screen.js"><\/script>
<canvas id="world" tabindex="0" aria-label="Apollo 11 historical exploration region. Use the route map for an accessible list of historical stops."></canvas>
<header><div class="region-heading"><div class="mission-title"><img id="mission-patch" width="22" height="22" alt=""><h1 id="region-title">Apollo</h1></div><div id="region-location"></div></div><nav aria-label="Exploration"><button id="map-open" aria-controls="ride-map" aria-expanded="false" aria-keyshortcuts="M">Map</button><button id="pause-open" aria-label="Pause and controls">Ⅱ</button></nav></header>
<aside id="route-hud"><button id="inspect" hidden>Reveal scene</button></aside><div id="target-indicator" hidden aria-label="Next location">➤</div>
<button id="ride-map" hidden aria-label="Open full map and pause" aria-haspopup="dialog" aria-controls="pause"><canvas id="mini" width="260" height="220" aria-hidden="true"></canvas></button>
<button id="mini-open" aria-label="Zoom out to the Moon">Moon ↗</button>
<div id="boundary-warning" hidden><span id="boundary-time" role="status"></span><button id="turn-back" aria-keyshortcuts="R">U-turn <kbd>R</kbd></button></div>
<div id="toast" role="status" aria-live="polite"></div>
<footer><div class="steering"><button id="left" data-game-control aria-label="Steer left">←</button><button id="right" data-game-control aria-label="Steer right">→</button></div><div id="ride-status"><span id="speed">0 mph</span><div id="turbo-status" data-phase="ready"><div class="turbo-readout"><span id="turbo-label">Turbo</span><span id="turbo-time">4.0s</span></div><div id="turbo-meter" role="progressbar" aria-label="Turbo charge" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><span id="turbo-fill"></span></div></div></div><div class="driving"><button id="brake" data-game-control aria-keyshortcuts="Shift">Brake</button><button id="go" data-game-control aria-keyshortcuts="Space">Go</button></div></footer>
<dialog id="lesson"><small id="lesson-era"></small><h2 id="lesson-title"></h2><figure><a id="photo-link" target="_blank" rel="noopener"><img id="lesson-photo" alt=""></a><figcaption id="photo-credit"></figcaption></figure><p id="lesson-copy"></p><div class="actions lesson-actions"><button id="continue" class="primary">Next stop</button><button id="look">Camera View</button></div><details id="lesson-more" hidden><summary>More history &amp; optional activities</summary><p id="lesson-detail"></p><div class="observation"><button id="demo-toggle">Explore how it works</button></div><section id="demonstration" hidden><div id="demo-art"></div><label id="demo-label">Explore <input id="demo-slider" type="range" min="0" max="100" value="0"></label><p id="demo-copy"></p></section><fieldset><legend id="question"></legend><div id="answers"></div></fieldset><p id="answer-feedback" role="status"></p><a id="lesson-source" target="_blank" rel="noopener">NASA historical source ↗</a></details></dialog>

<dialog id="pause" aria-labelledby="pause-title"><div id="pause-content"><div class="menu-heading"><img data-mission-patch alt="" width="40" height="40"><div><h2 id="pause-title">Apollo</h2><p data-mission-place></p></div></div><div class="pause-tabs" role="tablist" aria-label="Pause menu"><button id="pause-tab-ride" role="tab" data-pause-tab="ride" aria-controls="pause-ride" aria-selected="true" tabindex="0">Ride</button><button id="pause-tab-map" role="tab" data-pause-tab="map" aria-controls="map-dialog" aria-selected="false" tabindex="-1">Map</button><button id="pause-tab-about" role="tab" data-pause-tab="about" aria-controls="pause-about" aria-selected="false" tabindex="-1">About</button></div><section id="pause-ride" role="tabpanel" aria-labelledby="pause-tab-ride"><div class="ride-choices"><fieldset class="menu-section" id="play-progress"><legend>Mission sites</legend><p id="site-progress" role="status"></p><p class="fine">Complete mission sites to revisit them on <strong>Map</strong>.</p><label id="hide-sites-option" hidden><input id="hide-sites" type="checkbox"> Hide site circles</label></fieldset><fieldset class="menu-section"><legend>Vehicle</legend><div data-vehicle-choice class="vehicle-choice" role="group" aria-label="Vehicle"><button data-vehicle="scooter" aria-pressed="false"><img data-vehicle-image="scooter" alt="" width="112" height="64"><span>Scooter</span></button><button data-vehicle="lrv" aria-pressed="false"><img data-vehicle-image="lrv" alt="" width="112" height="64"><span>Lunar rover</span></button></div></fieldset></div><p data-vehicle-status class="fine" role="status"></p><fieldset class="menu-section ride-controls"><legend>Controls</legend><dl id="pause-drive-help" class="control-list"></dl><details id="pause-controls"><summary>More</summary><div id="advanced-controls"></div></details></fieldset></section><section id="map-dialog" role="tabpanel" aria-labelledby="pause-tab-map" hidden><button id="map-moon" class="map-switch">Moon ↗</button><div class="local-map-layout"><div class="local-map-surface"><canvas id="map" width="800" height="580" aria-label="Choose a destination using the map or the place buttons"></canvas></div><div id="local-destinations" role="group" aria-label="Places to travel"></div></div><div class="local-travel-actions"><div aria-live="polite"><strong id="local-travel-name"></strong><span id="local-travel-distance" class="fine"></span><span id="local-travel-note" class="fine" hidden></span></div></div></section><section id="pause-about" role="tabpanel" aria-labelledby="pause-tab-about" hidden>
<img class="about-patch" data-mission-patch alt="Mission patch" width="120" height="120"><section class="mission-about"><h3>About this mission</h3><p id="welcome-era" class="fine"></p><p id="region-crew" class="fine"></p><p id="mission-overview" class="fine"></p></section><details id="map-evidence"><summary>Sources</summary><p id="map-legend" class="fine">Pale paths: historical routes · Circles: places · Triangle: you.</p><p id="region-scale" class="fine"></p><a id="mission-overview-source" target="_blank" rel="noopener">NASA · Mission overview</a><br><a id="region-source" target="_blank" rel="noopener">NASA mission source</a><details id="source-map-links"><summary>Source map and accuracy</summary><p>The 1969 map is approximate. Individual boot placements and fine detail are interpreted.</p><a href="../apollo11/reference/traverse-map.png" target="_blank" rel="noopener">NASA SP-214 · figure 3-16 ↗</a><br><a href="./survey.html" target="_blank" rel="noopener">Registered map and source notes ↗</a></details></details></section><div class="pause-footer"><button id="resume" data-resume class="primary">Resume</button><button id="local-travel-go" class="primary" hidden>Travel</button><button id="exit">Exit</button><p id="save-status" class="fine" role="status"></p></div></div></dialog>
<dialog id="complete"><small>APOLLO / MISSION COMPLETE</small><h2 id="complete-title">All 4 mission sites complete</h2><p id="complete-copy">You can now fast-travel to every site on <strong>Map</strong> and turn off site circles in <strong>Ride</strong>.</p><div class="actions"><button data-close class="primary">Keep playing</button><button id="complete-sites">Choose another mission</button></div></dialog>
<dialog id="moon-map"><button id="moon-map-close" class="close" aria-label="Close Moon map">×</button><small>APOLLO</small><h2>Across the Moon.</h2><button id="moon-local">Local map</button><div id="moon-atlas"><canvas id="moon-surface" width="500" height="500" aria-hidden="true"></canvas><svg id="moon-globe" viewBox="0 0 500 500" role="group" aria-label="Rotatable Moon with Apollo landing sites"></svg></div><button id="moon-near-side">Near side</button><p id="transport-status" class="fine">Choose a landing site.</p><button id="transport-skip" hidden>Arrive now</button><div id="destinations"></div><p class="fine">NASA landing coordinates · travel time compressed.</p></dialog>
<div id="letterbox-top" aria-hidden="true"></div><div id="letterbox-bottom" aria-hidden="true"></div><div id="scene-label" role="status"></div>
<section id="camera-tools" hidden aria-label="Camera view"><button id="camera-read" aria-label="Back to reading">Back</button></section>
<div id="error" hidden role="alert"><h2>The Moon could not load.</h2><p id="error-message"></p><button onclick="location.reload()">Try again</button></div><script type="module" src="./entry.ts"><\/script></body></html>
`,r=1e3,i=1001,a=1002,o=1003,s=1004,c=1005,l=1006,u=1007,d=1008,f=1009,p=1010,m=1011,h=1012,g=1013,_=1014,v=1015,y=1016,b=1017,x=1018,S=1020,C=35902,w=35899,T=1021,E=1022,D=1023,O=1026,k=1027,A=1028,j=1029,ee=1030,M=1031,N=1033,P=33776,F=33777,te=33778,ne=33779,re=35840,ie=35841,ae=35842,oe=35843,se=36196,ce=37492,le=37496,ue=37808,de=37809,fe=37810,pe=37811,me=37812,I=37813,he=37814,ge=37815,_e=37816,L=37817,ve=37818,R=37819,z=37820,ye=37821,be=36492,xe=36494,Se=36495,Ce=36283,we=36284,Te=36285,Ee=36286,De=2300,Oe=2301,ke=2302,Ae=2400,je=2401,Me=2402,Ne=3200,Pe=3201,Fe=`srgb`,Ie=`srgb-linear`,Le=`linear`,Re=`srgb`,ze=7680,Be=35044,Ve=35048,He=2e3,Ue=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},We=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ge=1234567,Ke=Math.PI/180,qe=180/Math.PI;function Je(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(We[e&255]+We[e>>8&255]+We[e>>16&255]+We[e>>24&255]+`-`+We[t&255]+We[t>>8&255]+`-`+We[t>>16&15|64]+We[t>>24&255]+`-`+We[n&63|128]+We[n>>8&255]+`-`+We[n>>16&255]+We[n>>24&255]+We[r&255]+We[r>>8&255]+We[r>>16&255]+We[r>>24&255]).toLowerCase()}function B(e,t,n){return Math.max(t,Math.min(n,e))}function Ye(e,t){return(e%t+t)%t}function Xe(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Ze(e,t,n){return e===t?0:(n-e)/(t-e)}function Qe(e,t,n){return(1-n)*e+n*t}function $e(e,t,n,r){return Qe(e,t,1-Math.exp(-n*r))}function et(e,t=1){return t-Math.abs(Ye(e,t*2)-t)}function tt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function nt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function rt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function it(e,t){return e+Math.random()*(t-e)}function at(e){return e*(.5-Math.random())}function ot(e){e!==void 0&&(Ge=e);let t=Ge+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function st(e){return e*Ke}function ct(e){return e*qe}function lt(e){return(e&e-1)==0&&e!==0}function ut(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function dt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function ft(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function V(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var mt={DEG2RAD:Ke,RAD2DEG:qe,generateUUID:Je,clamp:B,euclideanModulo:Ye,mapLinear:Xe,inverseLerp:Ze,lerp:Qe,damp:$e,pingpong:et,smoothstep:tt,smootherstep:nt,randInt:rt,randFloat:it,randFloatSpread:at,seededRandom:ot,degToRad:st,radToDeg:ct,isPowerOfTwo:lt,ceilPowerOfTwo:ut,floorPowerOfTwo:dt,setQuaternionFromProperEuler:ft,normalize:V,denormalize:pt},H=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ht=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0){e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(B(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_t.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_t.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gt.copy(this).projectOnVector(e),this.sub(gt)}reflect(e){return this.sub(gt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gt=new U,_t=new ht,W=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(vt.makeScale(e,t)),this}rotate(e){return this.premultiply(vt.makeRotation(-e)),this}translate(e,t){return this.premultiply(vt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vt=new W;function yt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function bt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function xt(){let e=bt(`canvas`);return e.style.display=`block`,e}var St={};function Ct(e){e in St||(St[e]=!0,console.warn(e))}function wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Tt=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Et=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dt(){let e={enabled:!0,workingColorSpace:Ie,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Ot(e.r),e.g=Ot(e.g),e.b=Ot(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=kt(e.r),e.g=kt(e.g),e.b=kt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Le:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ct(`THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ct(`THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ie]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:Tt,fromXYZ:Et,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:r,transfer:Re,toXYZ:Tt,fromXYZ:Et,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),e}var G=Dt();function Ot(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function kt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var At,jt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{At===void 0&&(At=bt(`canvas`)),At.width=e.width,At.height=e.height;let t=At.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=At}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=bt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ot(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ot(t[e]/255)*255):t[e]=Ot(t[e]);return{data:t,width:e.width,height:e.height}}else return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Mt=0,Nt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mt++}),this.uuid=Je(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Pt(r[t].image)):e.push(Pt(r[t]))}else e=Pt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Pt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?jt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var Ft=0,It=new U,Lt=class e extends Ue{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=i,a=i,o=l,s=d,c=D,u=f,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ft++}),this.uuid=Je(),this.name=``,this.source=new Nt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=c,this.internalFormat=null,this.type=u,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(It).x}get height(){return this.source.getSize(It).y}get depth(){return this.source.getSize(It).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case r:e.x-=Math.floor(e.x);break;case i:e.x=e.x<0?0:1;break;case a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case r:e.y-=Math.floor(e.y);break;case i:e.y=e.y<0?0:1;break;case a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Lt.DEFAULT_IMAGE=null,Lt.DEFAULT_MAPPING=300,Lt.DEFAULT_ANISOTROPY=1;var Rt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this.w=B(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this.w=B(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},zt=class extends Ue{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:l,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);let r=new Lt({width:e,height:t,depth:n.depth});this.textures=[];let i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:l,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Nt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Bt=class extends zt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Vt=class extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=o,this.minFilter=o,this.wrapR=i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ht=class extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=o,this.minFilter=o,this.wrapR=i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ut=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Gt):Gt.fromBufferAttribute(r,t),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Kt.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Kt.copy(e.boundingBox)),Kt.applyMatrix4(e.matrixWorld),this.union(Kt)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($t),en.subVectors(this.max,$t),qt.subVectors(e.a,$t),Jt.subVectors(e.b,$t),Yt.subVectors(e.c,$t),Xt.subVectors(Jt,qt),Zt.subVectors(Yt,Jt),Qt.subVectors(qt,Yt);let t=[0,-Xt.z,Xt.y,0,-Zt.z,Zt.y,0,-Qt.z,Qt.y,Xt.z,0,-Xt.x,Zt.z,0,-Zt.x,Qt.z,0,-Qt.x,-Xt.y,Xt.x,0,-Zt.y,Zt.x,0,-Qt.y,Qt.x,0];return!rn(t,qt,Jt,Yt,en)||(t=[1,0,0,0,1,0,0,0,1],!rn(t,qt,Jt,Yt,en))?!1:(tn.crossVectors(Xt,Zt),t=[tn.x,tn.y,tn.z],rn(t,qt,Jt,Yt,en))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wt=[new U,new U,new U,new U,new U,new U,new U,new U],Gt=new U,Kt=new Ut,qt=new U,Jt=new U,Yt=new U,Xt=new U,Zt=new U,Qt=new U,$t=new U,en=new U,tn=new U,nn=new U;function rn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){nn.fromArray(e,a);let o=i.x*Math.abs(nn.x)+i.y*Math.abs(nn.y)+i.z*Math.abs(nn.z),s=t.dot(nn),c=n.dot(nn),l=r.dot(nn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var an=new Ut,on=new U,sn=new U,cn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?an.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;on.subVectors(e,this.center);let t=on.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(on,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(on.copy(e.center).add(sn)),this.expandByPoint(on.copy(e.center).sub(sn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ln=new U,un=new U,dn=new U,fn=new U,pn=new U,mn=new U,hn=new U,gn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){un.copy(e).add(t).multiplyScalar(.5),dn.copy(t).sub(e).normalize(),fn.copy(this.origin).sub(un);let i=e.distanceTo(t)*.5,a=-this.direction.dot(dn),o=fn.dot(this.direction),s=-fn.dot(dn),c=fn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(un).addScaledVector(dn,d),f}intersectSphere(e,t){ln.subVectors(e.center,this.origin);let n=ln.dot(this.direction),r=ln.dot(ln)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,n,r,i){pn.subVectors(t,e),mn.subVectors(n,e),hn.crossVectors(pn,mn);let a=this.direction.dot(hn),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;fn.subVectors(this.origin,e);let s=o*this.direction.dot(mn.crossVectors(fn,mn));if(s<0)return null;let c=o*this.direction.dot(pn.cross(fn));if(c<0||s+c>a)return null;let l=-o*fn.dot(hn);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_n=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/vn.setFromMatrixColumn(e,0).length(),i=1/vn.setFromMatrixColumn(e,1).length(),a=1/vn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bn,e,xn)}lookAt(e,t,n){let r=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Sn.crossVectors(n,wn),Sn.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Sn.crossVectors(n,wn)),Sn.normalize(),Cn.crossVectors(wn,Sn),r[0]=Sn.x,r[4]=Cn.x,r[8]=wn.x,r[1]=Sn.y,r[5]=Cn.y,r[9]=wn.y,r[2]=Sn.z,r[6]=Cn.z,r[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],P=r[11],F=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*ee+c*F,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*ee+f*F,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*ee+g*F,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*ee+b*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=vn.set(r[0],r[1],r[2]).length(),a=vn.set(r[4],r[5],r[6]).length(),o=vn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],yn.copy(this);let s=1/i,c=1/a,l=1/o;return yn.elements[0]*=s,yn.elements[1]*=s,yn.elements[2]*=s,yn.elements[4]*=c,yn.elements[5]*=c,yn.elements[6]*=c,yn.elements[8]*=l,yn.elements[9]*=l,yn.elements[10]*=l,t.setFromRotationMatrix(yn),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vn=new U,yn=new _n,bn=new U(0,0,0),xn=new U(1,1,1),Sn=new U,Cn=new U,wn=new U,Tn=new _n,En=new ht,Dn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(B(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-B(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(B(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-B(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(B(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-B(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Tn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return En.setFromEuler(this),this.setFromQuaternion(En,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER=`XYZ`;var On=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},kn=0,An=new U,jn=new ht,Mn=new _n,Nn=new U,Pn=new U,Fn=new U,In=new ht,Ln=new U(1,0,0),Rn=new U(0,1,0),zn=new U(0,0,1),Bn={type:`added`},Vn={type:`removed`},Hn={type:`childadded`,child:null},Un={type:`childremoved`,child:null},Wn=class e extends Ue{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kn++}),this.uuid=Je(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new Dn,r=new ht,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _n},normalMatrix:{value:new W}}),this.matrix=new _n,this.matrixWorld=new _n,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new On,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jn.setFromAxisAngle(e,t),this.quaternion.multiply(jn),this}rotateOnWorldAxis(e,t){return jn.setFromAxisAngle(e,t),this.quaternion.premultiply(jn),this}rotateX(e){return this.rotateOnAxis(Ln,e)}rotateY(e){return this.rotateOnAxis(Rn,e)}rotateZ(e){return this.rotateOnAxis(zn,e)}translateOnAxis(e,t){return An.copy(e).applyQuaternion(this.quaternion),this.position.add(An.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ln,e)}translateY(e){return this.translateOnAxis(Rn,e)}translateZ(e){return this.translateOnAxis(zn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nn.copy(e):Nn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Pn,Nn,this.up):Mn.lookAt(Nn,Pn,this.up),this.quaternion.setFromRotationMatrix(Mn),r&&(Mn.extractRotation(r.matrixWorld),jn.setFromRotationMatrix(Mn),this.quaternion.premultiply(jn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bn),Hn.child=e,this.dispatchEvent(Hn),Hn.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vn),Un.child=e,this.dispatchEvent(Un),Un.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bn),Hn.child=e,this.dispatchEvent(Hn),Hn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,e,Fn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,In,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Wn.DEFAULT_UP=new U(0,1,0),Wn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gn=new U,Kn=new U,qn=new U,Jn=new U,Yn=new U,Xn=new U,Zn=new U,Qn=new U,$n=new U,er=new U,tr=new Rt,nr=new Rt,rr=new Rt,ir=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Gn.subVectors(e,t),r.cross(Gn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Gn.subVectors(r,t),Kn.subVectors(n,t),qn.subVectors(e,t);let a=Gn.dot(Gn),o=Gn.dot(Kn),s=Gn.dot(qn),c=Kn.dot(Kn),l=Kn.dot(qn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Jn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Jn.x),s.addScaledVector(a,Jn.y),s.addScaledVector(o,Jn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return tr.setScalar(0),nr.setScalar(0),rr.setScalar(0),tr.fromBufferAttribute(e,t),nr.fromBufferAttribute(e,n),rr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(tr,i.x),a.addScaledVector(nr,i.y),a.addScaledVector(rr,i.z),a}static isFrontFacing(e,t,n,r){return Gn.subVectors(n,t),Kn.subVectors(e,t),Gn.cross(Kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Gn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Yn.subVectors(r,n),Xn.subVectors(i,n),Qn.subVectors(e,n);let s=Yn.dot(Qn),c=Xn.dot(Qn);if(s<=0&&c<=0)return t.copy(n);$n.subVectors(e,r);let l=Yn.dot($n),u=Xn.dot($n);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Yn,a);er.subVectors(e,i);let f=Yn.dot(er),p=Xn.dot(er);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Xn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Zn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Zn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Yn,a).addScaledVector(Xn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ar={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},or={h:0,s:0,l:0},sr={h:0,s:0,l:0};function cr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var K=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,G.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=G.workingColorSpace){return this.r=e,this.g=t,this.b=n,G.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=G.workingColorSpace){if(e=Ye(e,1),t=B(t,0,1),n=B(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=cr(i,r,e+1/3),this.g=cr(i,r,e),this.b=cr(i,r,e-1/3)}return G.colorSpaceToWorking(this,r),this}setStyle(e,t=Fe){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fe){let n=ar[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ot(e.r),this.g=Ot(e.g),this.b=Ot(e.b),this}copyLinearToSRGB(e){return this.r=kt(e.r),this.g=kt(e.g),this.b=kt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fe){return G.workingToColorSpace(lr.copy(this),e),Math.round(B(lr.r*255,0,255))*65536+Math.round(B(lr.g*255,0,255))*256+Math.round(B(lr.b*255,0,255))}getHexString(e=Fe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=G.workingColorSpace){G.workingToColorSpace(lr.copy(this),t);let n=lr.r,r=lr.g,i=lr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=G.workingColorSpace){return G.workingToColorSpace(lr.copy(this),t),e.r=lr.r,e.g=lr.g,e.b=lr.b,e}getStyle(e=Fe){G.workingToColorSpace(lr.copy(this),e);let t=lr.r,n=lr.g,r=lr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(or),this.setHSL(or.h+e,or.s+t,or.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(or),e.getHSL(sr);let n=Qe(or.h,sr.h,t),r=Qe(or.s,sr.s,t),i=Qe(or.l,sr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},lr=new K;K.NAMES=ar;var ur=0,dr=class extends Ue{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ur++}),this.uuid=Je(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new K(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ze,this.stencilZFail=ze,this.stencilZPass=ze,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},fr=class extends dr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pr=new U,mr=new H,hr=0,gr=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Be,this.updateRanges=[],this.gpuType=v,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix4(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyNormalMatrix(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.transformDirection(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=V(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pt(t,this.array)),t}setX(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pt(t,this.array)),t}setY(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pt(t,this.array)),t}setW(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array),i=V(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},_r=class extends gr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vr=class extends gr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},q=class extends gr{constructor(e,t,n){super(new Float32Array(e),t,n)}},yr=0,br=new _n,xr=new Wn,Sr=new U,Cr=new Ut,wr=new Ut,Tr=new U,Er=class e extends Ue{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yr++}),this.uuid=Je(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yt(e)?vr:_r)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return br.makeRotationFromQuaternion(e),this.applyMatrix4(br),this}rotateX(e){return br.makeRotationX(e),this.applyMatrix4(br),this}rotateY(e){return br.makeRotationY(e),this.applyMatrix4(br),this}rotateZ(e){return br.makeRotationZ(e),this.applyMatrix4(br),this}translate(e,t,n){return br.makeTranslation(e,t,n),this.applyMatrix4(br),this}scale(e,t,n){return br.makeScale(e,t,n),this.applyMatrix4(br),this}lookAt(e){return xr.lookAt(e),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new q(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ut);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(this.boundingBox.min,Cr.min),this.boundingBox.expandByPoint(Tr),Tr.addVectors(this.boundingBox.max,Cr.max),this.boundingBox.expandByPoint(Tr)):(this.boundingBox.expandByPoint(Cr.min),this.boundingBox.expandByPoint(Cr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(Cr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(Cr.min,wr.min),Cr.expandByPoint(Tr),Tr.addVectors(Cr.max,wr.max),Cr.expandByPoint(Tr)):(Cr.expandByPoint(wr.min),Cr.expandByPoint(wr.max))}Cr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Tr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Tr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Tr.fromBufferAttribute(a,t),o&&(Sr.fromBufferAttribute(e,t),Tr.add(Sr)),r=Math.max(r,n.distanceToSquared(Tr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new gr(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new gr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tr.fromBufferAttribute(e,t),Tr.normalize(),e.setXYZ(t,Tr.x,Tr.y,Tr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new gr(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Dr=new _n,Or=new gn,kr=new cn,Ar=new U,jr=new U,Mr=new U,Nr=new U,Pr=new U,Fr=new U,Ir=new U,Lr=new U,J=class extends Wn{constructor(e=new Er,t=new fr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Fr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Pr.fromBufferAttribute(s,e),a?Fr.addScaledVector(Pr,r):Fr.addScaledVector(Pr.sub(t),r))}t.add(Fr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(i),Or.copy(e.ray).recast(e.near),!(kr.containsPoint(Or.origin)===!1&&(Or.intersectSphere(kr,Ar)===null||Or.origin.distanceToSquared(Ar)>(e.far-e.near)**2))&&(Dr.copy(i).invert(),Or.copy(e.ray).applyMatrix4(Dr),!(n.boundingBox!==null&&Or.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=zr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=zr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=zr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=zr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function Rr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Lr.copy(s),Lr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Lr);return l<n.near||l>n.far?null:{distance:l,point:Lr.clone(),object:e}}function zr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,jr),e.getVertexPosition(c,Mr),e.getVertexPosition(l,Nr);let u=Rr(e,t,n,r,jr,Mr,Nr,Ir);if(u){let e=new U;ir.getBarycoord(Ir,jr,Mr,Nr,e),i&&(u.uv=ir.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=ir.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=ir.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};ir.getNormal(jr,Mr,Nr,t.normal),u.face=t,u.barycoord=e}return u}var Br=class e extends Er{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new q(c,3)),this.setAttribute(`normal`,new q(l,3)),this.setAttribute(`uv`,new q(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Vr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Hr(e){let t={};for(let n=0;n<e.length;n++){let r=Vr(e[n]);for(let e in r)t[e]=r[e]}return t}function Ur(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Wr(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:G.workingColorSpace}var Gr={clone:Vr,merge:Hr},Kr=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qr=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jr=class extends dr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kr,this.fragmentShader=qr,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=Ur(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Yr=class extends Wn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new _n,this.projectionMatrix=new _n,this.projectionMatrixInverse=new _n,this.coordinateSystem=He,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Xr=new U,Zr=new H,Qr=new H,$r=class extends Yr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qe*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ke*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qe*2*Math.atan(Math.tan(Ke*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z),Xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z)}getViewSize(e,t){return this.getViewBounds(e,Zr,Qr),t.subVectors(Qr,Zr)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ke*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ei=-90,ti=1,ni=class extends Wn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $r(ei,ti,e,t);r.layers=this.layers,this.add(r);let i=new $r(ei,ti,e,t);i.layers=this.layers,this.add(i);let a=new $r(ei,ti,e,t);a.layers=this.layers,this.add(a);let o=new $r(ei,ti,e,t);o.layers=this.layers,this.add(o);let s=new $r(ei,ti,e,t);s.layers=this.layers,this.add(s);let c=new $r(ei,ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ri=class extends Lt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ii=class extends Bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Br(5,5,5),i=new Jr({name:`CubemapFromEquirect`,uniforms:Vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=l),new ni(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Y=class extends Wn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ai={type:`move`},oi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Y,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Y,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Y,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ai)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Y;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},si=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new K(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},ci=class extends Wn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},li=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Be,this.updateRanges=[],this.version=0,this.uuid=Je()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ui=new U,di=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.applyMatrix4(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.applyNormalMatrix(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ui.fromBufferAttribute(this,t),ui.transformDirection(e),this.setXYZ(t,ui.x,ui.y,ui.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=V(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array),i=V(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new gr(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},fi=class extends dr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pi,mi=new U,hi=new U,gi=new U,_i=new H,vi=new H,yi=new _n,bi=new U,xi=new U,Si=new U,Ci=new H,wi=new H,Ti=new H,Ei=class extends Wn{constructor(e=new fi){if(super(),this.isSprite=!0,this.type=`Sprite`,pi===void 0){pi=new Er;let e=new li(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);pi.setIndex([0,1,2,0,2,3]),pi.setAttribute(`position`,new di(e,3,0,!1)),pi.setAttribute(`uv`,new di(e,2,3,!1))}this.geometry=pi,this.material=e,this.center=new H(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),hi.setFromMatrixScale(this.matrixWorld),yi.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hi.multiplyScalar(-gi.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Di(bi.set(-.5,-.5,0),gi,a,hi,r,i),Di(xi.set(.5,-.5,0),gi,a,hi,r,i),Di(Si.set(.5,.5,0),gi,a,hi,r,i),Ci.set(0,0),wi.set(1,0),Ti.set(1,1);let o=e.ray.intersectTriangle(bi,xi,Si,!1,mi);if(o===null&&(Di(xi.set(-.5,.5,0),gi,a,hi,r,i),wi.set(0,1),o=e.ray.intersectTriangle(bi,Si,xi,!1,mi),o===null))return;let s=e.ray.origin.distanceTo(mi);s<e.near||s>e.far||t.push({distance:s,point:mi.clone(),uv:ir.getInterpolation(mi,bi,xi,Si,Ci,wi,Ti,new H),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Di(e,t,n,r,i,a){_i.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?vi.copy(_i):(vi.x=a*_i.x-i*_i.y,vi.y=i*_i.x+a*_i.y),e.copy(t),e.x+=vi.x,e.y+=vi.y,e.applyMatrix4(yi)}var Oi=class extends Lt{constructor(e=null,t=1,n=1,r,i,a,s,c,l=o,u=o,d,f){super(null,a,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ki=class extends gr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ai=new _n,ji=new _n,Mi=[],Ni=new Ut,Pi=new _n,Fi=new J,Ii=new cn,Li=class extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ki(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Pi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ut),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Ni.copy(e.boundingBox).applyMatrix4(Ai),this.boundingBox.union(Ni)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Ii.copy(e.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(Ii)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Fi.geometry=this.geometry,Fi.material=this.material,Fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ii.copy(this.boundingSphere),Ii.applyMatrix4(n),e.ray.intersectsSphere(Ii)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Ai),ji.multiplyMatrices(n,Ai),Fi.matrixWorld=ji,Fi.raycast(e,Mi);for(let e=0,n=Mi.length;e<n;e++){let n=Mi[e];n.instanceId=i,n.object=this,t.push(n)}Mi.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ki(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oi(new Float32Array(r*this.count),r,this.count,A,v));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;i[s]=o,i.set(n,s+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ri=new U,zi=new U,Bi=new W,Vi=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ri.subVectors(n,t).cross(zi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ri),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Bi.getNormalMatrix(e),r=this.coplanarPoint(Ri).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hi=new cn,Ui=new H(.5,.5),Wi=new U,Gi=class{constructor(e=new Vi,t=new Vi,n=new Vi,r=new Vi,i=new Vi,a=new Vi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=He,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476+Ui.distanceTo(e.center),Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Wi.x=r.normal.x>0?e.max.x:e.min.x,Wi.y=r.normal.y>0?e.max.y:e.min.y,Wi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ki=class extends Lt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},qi=class extends Lt{constructor(e,t,n=_,r,i,a,s=o,c=o,l,u=O,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,a,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Nt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ji=class extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Yi=class e extends Er{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new q(a,3)),this.setAttribute(`normal`,new q(o,3)),this.setAttribute(`uv`,new q(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Xi=class e extends Er{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new q(u,3)),this.setAttribute(`normal`,new q(d,3)),this.setAttribute(`uv`,new q(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zi=class e extends Xi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Qi=class e extends Er{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new q(i,3)),this.setAttribute(`normal`,new q(i.slice(),3)),this.setAttribute(`uv`,new q(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.details)}},$i=class e extends Qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ea=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn(`THREE.Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new _n;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(B(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(B(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ta=class extends ea{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},na=class extends ta{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function ra(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ia=new U,aa=new ra,oa=new ra,sa=new ra,ca=class extends ea{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(ia.subVectors(r[0],r[1]).add(r[0]),c=ia);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ia.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ia),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),aa.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),oa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),sa.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(aa.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),oa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),sa.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(aa.calc(s),oa.calc(s),sa.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function la(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ua(e,t){let n=1-e;return n*n*t}function da(e,t){return 2*(1-e)*e*t}function fa(e,t){return e*e*t}function pa(e,t,n,r){return ua(e,t)+da(e,n)+fa(e,r)}function ma(e,t){let n=1-e;return n*n*n*t}function ha(e,t){let n=1-e;return 3*n*n*e*t}function ga(e,t){return 3*(1-e)*e*e*t}function _a(e,t){return e*e*e*t}function va(e,t,n,r,i){return ma(e,t)+ha(e,n)+ga(e,r)+_a(e,i)}var ya=class extends ea{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(va(e,r.x,i.x,a.x,o.x),va(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ba=class extends ea{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(va(e,r.x,i.x,a.x,o.x),va(e,r.y,i.y,a.y,o.y),va(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xa=class extends ea{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sa=class extends ea{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends ea{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(pa(e,r.x,i.x,a.x),pa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends ea{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(pa(e,r.x,i.x,a.x),pa(e,r.y,i.y,a.y),pa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=Object.freeze({__proto__:null,ArcCurve:na,CatmullRomCurve3:ca,CubicBezierCurve:ya,CubicBezierCurve3:ba,EllipseCurve:ta,LineCurve:xa,LineCurve3:Sa,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:wa,SplineCurve:class extends ea{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(la(o,s.x,c.x,l.x,u.x),la(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}}}),Ea=class e extends Qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Da=class e extends Er{constructor(e=[new H(0,-.5),new H(.5,0),new H(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=B(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new U,d=new H,f=new U,p=new U,m=new U,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new q(a,3)),this.setAttribute(`uv`,new q(o,2)),this.setAttribute(`normal`,new q(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Oa=class e extends Er{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new q(p,3)),this.setAttribute(`normal`,new q(m,3)),this.setAttribute(`uv`,new q(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ka=class e extends Er{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new q(p,3)),this.setAttribute(`normal`,new q(m,3)),this.setAttribute(`uv`,new q(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Aa=class e extends Er{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],s=[],c=[],l=new U,u=new U,d=new U;for(let a=0;a<=n;a++)for(let f=0;f<=r;f++){let p=f/r*i,m=a/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(p),u.y=(e+t*Math.cos(m))*Math.sin(p),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),l.x=e*Math.cos(p),l.y=e*Math.sin(p),d.subVectors(u,l).normalize(),s.push(d.x,d.y,d.z),c.push(f/r),c.push(a/n)}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,o=(r+1)*(e-1)+t,s=(r+1)*e+t;a.push(n,i,s),a.push(i,o,s)}this.setIndex(a),this.setAttribute(`position`,new q(o,3)),this.setAttribute(`normal`,new q(s,3)),this.setAttribute(`uv`,new q(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},ja=class e extends Er{constructor(e=new wa(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new q(u,3)),this.setAttribute(`normal`,new q(d,3)),this.setAttribute(`uv`,new q(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Ta[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},X=class extends dr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new K(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ma=class extends dr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ne,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Na=class extends dr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Pa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Fa(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Ia=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},La=class extends Ia{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ae,endingEnd:Ae}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case je:i=e,o=2*t-n;break;case Me:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case je:a=e,s=2*n-t;break;case Me:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ra=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},za=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ba=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Pa(t,this.TimeBufferType),this.values=Pa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Pa(e.times,Array),values:Pa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new La(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case De:t=this.InterpolantFactoryMethodDiscrete;break;case Oe:t=this.InterpolantFactoryMethodLinear;break;case ke:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return De;case this.InterpolantFactoryMethodLinear:return Oe;case this.InterpolantFactoryMethodSmooth:return ke}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Fa(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ke,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Ba.prototype.ValueTypeName=``,Ba.prototype.TimeBufferType=Float32Array,Ba.prototype.ValueBufferType=Float32Array,Ba.prototype.DefaultInterpolation=Oe;var Va=class extends Ba{constructor(e,t,n){super(e,t,n)}};Va.prototype.ValueTypeName=`bool`,Va.prototype.ValueBufferType=Array,Va.prototype.DefaultInterpolation=De,Va.prototype.InterpolantFactoryMethodLinear=void 0,Va.prototype.InterpolantFactoryMethodSmooth=void 0;var Ha=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}};Ha.prototype.ValueTypeName=`color`;var Ua=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}};Ua.prototype.ValueTypeName=`number`;var Wa=class extends Ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ht.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ga=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Wa(this.times,this.values,this.getValueSize(),e)}};Ga.prototype.ValueTypeName=`quaternion`,Ga.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends Ba{constructor(e,t,n){super(e,t,n)}};Ka.prototype.ValueTypeName=`string`,Ka.prototype.ValueBufferType=Array,Ka.prototype.DefaultInterpolation=De,Ka.prototype.InterpolantFactoryMethodLinear=void 0,Ka.prototype.InterpolantFactoryMethodSmooth=void 0;var qa=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}};qa.prototype.ValueTypeName=`vector`;var Ja={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},Ya=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Xa=class{constructor(e){this.manager=e===void 0?Ya:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xa.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Za=new WeakMap,Qa=class extends Xa{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Ja.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Za.get(a);e===void 0&&(e=[],Za.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=bt(`img`);function s(){l(),t&&t(this);let n=Za.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Za.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Ja.remove(`image:${e}`);let n=Za.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Za.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ja.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},$a=class extends Xa{constructor(e){super(e)}load(e,t,n,r){let i=new Lt,a=new Qa(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},eo=class extends Wn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new K(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},to=class extends eo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Wn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new K(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},no=new _n,ro=new U,io=new U,ao=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=f,this.map=null,this.mapPass=null,this.matrix=new _n,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gi,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ro.setFromMatrixPosition(e.matrixWorld),t.position.copy(ro),io.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(io),t.updateMatrixWorld(),no.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(no)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oo=class extends Yr{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},so=class extends ao{constructor(){super(new oo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},co=class extends eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Wn.DEFAULT_UP),this.updateMatrix(),this.target=new Wn,this.shadow=new so}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},lo=class extends $r{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},uo=`\\[\\]\\.:\\/`,fo=RegExp(`[\\[\\]\\.:\\/]`,`g`),po=`[^\\[\\]\\.:\\/]`,mo=`[^`+uo.replace(`\\.`,``)+`]`,ho=`((?:WC+[\\/:])*)`.replace(`WC`,po),go=`(WCOD+)?`.replace(`WCOD`,mo),_o=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,po),vo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,po),yo=RegExp(`^`+ho+go+_o+vo+`$`),bo=[`material`,`materials`,`bones`,`map`],xo=class{constructor(e,t,n){let r=n||So.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},So=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(fo,``)}static parseTrackName(e){let t=yo.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);bo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};So.Composite=xo,So.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},So.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},So.prototype.GetterByBindingType=[So.prototype._getValue_direct,So.prototype._getValue_array,So.prototype._getValue_arrayElement,So.prototype._getValue_toArray],So.prototype.SetterByBindingTypeAndVersioning=[[So.prototype._setValue_direct,So.prototype._setValue_direct_setNeedsUpdate,So.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[So.prototype._setValue_array,So.prototype._setValue_array_setNeedsUpdate,So.prototype._setValue_array_setMatrixWorldNeedsUpdate],[So.prototype._setValue_arrayElement,So.prototype._setValue_arrayElement_setNeedsUpdate,So.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[So.prototype._setValue_fromArray,So.prototype._setValue_fromArray_setNeedsUpdate,So.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Co(e,t,n,r){let i=wo(r);switch(n){case T:return e*t;case A:return e*t/i.components*i.byteLength;case j:return e*t/i.components*i.byteLength;case ee:return e*t*2/i.components*i.byteLength;case M:return e*t*2/i.components*i.byteLength;case E:return e*t*3/i.components*i.byteLength;case D:return e*t*4/i.components*i.byteLength;case N:return e*t*4/i.components*i.byteLength;case P:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case te:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ie:case oe:return Math.max(e,16)*Math.max(t,8)/4;case re:case ae:return Math.max(e,8)*Math.max(t,8)/2;case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case I:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case L:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case R:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case z:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ye:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case be:case xe:case Se:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ce:case we:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Te:case Ee:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function wo(e){switch(e){case f:case p:return{byteLength:1,components:1};case h:case m:case y:return{byteLength:2,components:1};case b:case x:return{byteLength:2,components:4};case _:case g:case v:return{byteLength:4,components:1};case C:case w:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`180`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`180`);function To(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Eo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new K(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new K(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new K(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new K(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Do={basic:{uniforms:Hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:Hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new K(0)}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:Hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new K(0)},specular:{value:new K(1118481)},shininess:{value:30}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:Hr([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new K(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:Hr([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new K(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:Hr([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:Hr([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:Hr([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:Hr([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:Hr([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:Hr([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distanceRGBA:{uniforms:Hr([Q.common,Q.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distanceRGBA_vert,fragmentShader:Z.distanceRGBA_frag},shadow:{uniforms:Hr([Q.lights,Q.fog,{color:{value:new K(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Do.physical={uniforms:Hr([Do.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new K(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new K(0)},specularColor:{value:new K(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Oo={r:0,b:0,g:0},ko=new Dn,Ao=new _n;function jo(e,t,n,r,i,a,o){let s=new K(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new J(new Br(1,1,1),new Jr({name:`BackgroundCubeMaterial`,uniforms:Vr(Do.backgroundCube.uniforms),vertexShader:Do.backgroundCube.vertexShader,fragmentShader:Do.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ko.copy(n.backgroundRotation),ko.x*=-1,ko.y*=-1,ko.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(ko.y*=-1,ko.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ao.makeRotationFromEuler(ko)),u.material.toneMapped=G.getTransfer(r.colorSpace)!==Re,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new J(new Oa(2,2),new Jr({name:`BackgroundMaterial`,uniforms:Vr(Do.background.uniforms),vertexShader:Do.background.vertexShader,fragmentShader:Do.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=G.getTransfer(r.colorSpace)!==Re,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(Oo,Wr(e)),r.buffers.color.setClear(Oo.r,Oo.g,Oo.b,n,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:v}}function Mo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function No(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Po(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function Fo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Vi,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function Io(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304)if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}else{let a=r.image;if(a&&a.height>0){let o=new ii(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}else return null}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var Lo=4,Ro=[.125,.215,.35,.446,.526,.582],zo=20,Bo=new oo,Vo=new K,Ho=null,Uo=0,Wo=0,Go=!1,Ko=(1+Math.sqrt(5))/2,qo=1/Ko,Jo=[new U(-Ko,qo,0),new U(Ko,qo,0),new U(-qo,0,Ko),new U(qo,0,Ko),new U(0,Ko,-qo),new U(0,Ko,qo),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Yo=new U,Xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Yo}=i;Ho=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ns(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ts(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ho,Uo,Wo),this._renderer.xr.enabled=Go,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ho=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:l,minFilter:l,generateMipmaps:!1,type:y,format:D,colorSpace:Ie,depthBuffer:!1},r=Qo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zo(r)),this._blurMaterial=es(r,e,t)}return r}_compileMaterial(e){let t=new J(this._lodPlanes[0],e);this._renderer.compile(t,Bo)}_sceneToCubeUV(e,t,n,r,i){let a=new $r(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Vo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let d=new fr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),f=new J(new Br,d),p=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy(Vo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;$o(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(f,a),c.render(e,a)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ns()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ts());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new J(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;$o(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Bo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=Jo[(r-t-1)%Jo.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new J(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*zo-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):zo;m>zo&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zo}`);let h=[],g=0;for(let e=0;e<zo;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];$o(t,3*v*(r>_-Lo?r-_+Lo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Bo)}};function Zo(e){let t=[],n=[],r=[],i=e,a=e-Lo+1+Ro.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-Lo?s=Ro[o-e+Lo-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Er;h.setAttribute(`position`,new gr(f,3)),h.setAttribute(`uv`,new gr(p,2)),h.setAttribute(`faceIndex`,new gr(m,1)),t.push(h),i>Lo&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Qo(e,t,n){let r=new Bt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function $o(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function es(e,t,n){let r=new Float32Array(zo),i=new U(0,1,0);return new Jr({name:`SphericalGaussianBlur`,defines:{n:zo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(){return new Jr({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ns(){return new Jr({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function rs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function is(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new Xo(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new Xo(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function as(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ct(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function os(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(yt(n)?vr:_r)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ss(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function cs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ls(e,t,n){let r=new WeakMap,i=new Rt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Vt(h,p,m,u);g.type=v,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function us(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var ds=new Lt,fs=new qi(1,1),ps=new Vt,ms=new Ht,hs=new ri,gs=[],_s=[],vs=new Float32Array(16),ys=new Float32Array(9),bs=new Float32Array(4);function xs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=gs[i];if(a===void 0&&(a=new Float32Array(i),gs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ss(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Cs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function ws(e,t){let n=_s[t];n===void 0&&(n=new Int32Array(t),_s[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ts(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ss(n,t))return;e.uniform2fv(this.addr,t),Cs(n,t)}}function Ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ss(n,t))return;e.uniform3fv(this.addr,t),Cs(n,t)}}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ss(n,t))return;e.uniform4fv(this.addr,t),Cs(n,t)}}function ks(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ss(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Cs(n,t)}else{if(Ss(n,r))return;bs.set(r),e.uniformMatrix2fv(this.addr,!1,bs),Cs(n,r)}}function As(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ss(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Cs(n,t)}else{if(Ss(n,r))return;ys.set(r),e.uniformMatrix3fv(this.addr,!1,ys),Cs(n,r)}}function js(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ss(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Cs(n,t)}else{if(Ss(n,r))return;vs.set(r),e.uniformMatrix4fv(this.addr,!1,vs),Cs(n,r)}}function Ms(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ss(n,t))return;e.uniform2iv(this.addr,t),Cs(n,t)}}function Ps(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ss(n,t))return;e.uniform3iv(this.addr,t),Cs(n,t)}}function Fs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ss(n,t))return;e.uniform4iv(this.addr,t),Cs(n,t)}}function Is(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ss(n,t))return;e.uniform2uiv(this.addr,t),Cs(n,t)}}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ss(n,t))return;e.uniform3uiv(this.addr,t),Cs(n,t)}}function zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ss(n,t))return;e.uniform4uiv(this.addr,t),Cs(n,t)}}function Bs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(fs.compareFunction=515,a=fs):a=ds,n.setTexture2D(t||a,i)}function Vs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ms,i)}function Hs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||hs,i)}function Us(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ps,i)}function Ws(e){switch(e){case 5126:return Ts;case 35664:return Es;case 35665:return Ds;case 35666:return Os;case 35674:return ks;case 35675:return As;case 35676:return js;case 5124:case 35670:return Ms;case 35667:case 35671:return Ns;case 35668:case 35672:return Ps;case 35669:case 35673:return Fs;case 5125:return Is;case 36294:return Ls;case 36295:return Rs;case 36296:return zs;case 35678:case 36198:case 36298:case 36306:case 35682:return Bs;case 35679:case 36299:case 36307:return Vs;case 35680:case 36300:case 36308:case 36293:return Hs;case 36289:case 36303:case 36311:case 36292:return Us}}function Gs(e,t){e.uniform1fv(this.addr,t)}function Ks(e,t){let n=xs(t,this.size,2);e.uniform2fv(this.addr,n)}function qs(e,t){let n=xs(t,this.size,3);e.uniform3fv(this.addr,n)}function Js(e,t){let n=xs(t,this.size,4);e.uniform4fv(this.addr,n)}function Ys(e,t){let n=xs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Xs(e,t){let n=xs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Zs(e,t){let n=xs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Qs(e,t){e.uniform1iv(this.addr,t)}function $s(e,t){e.uniform2iv(this.addr,t)}function ec(e,t){e.uniform3iv(this.addr,t)}function tc(e,t){e.uniform4iv(this.addr,t)}function nc(e,t){e.uniform1uiv(this.addr,t)}function rc(e,t){e.uniform2uiv(this.addr,t)}function ic(e,t){e.uniform3uiv(this.addr,t)}function ac(e,t){e.uniform4uiv(this.addr,t)}function oc(e,t,n){let r=this.cache,i=t.length,a=ws(n,i);Ss(r,a)||(e.uniform1iv(this.addr,a),Cs(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||ds,a[e])}function sc(e,t,n){let r=this.cache,i=t.length,a=ws(n,i);Ss(r,a)||(e.uniform1iv(this.addr,a),Cs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ms,a[e])}function cc(e,t,n){let r=this.cache,i=t.length,a=ws(n,i);Ss(r,a)||(e.uniform1iv(this.addr,a),Cs(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||hs,a[e])}function lc(e,t,n){let r=this.cache,i=t.length,a=ws(n,i);Ss(r,a)||(e.uniform1iv(this.addr,a),Cs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ps,a[e])}function uc(e){switch(e){case 5126:return Gs;case 35664:return Ks;case 35665:return qs;case 35666:return Js;case 35674:return Ys;case 35675:return Xs;case 35676:return Zs;case 5124:case 35670:return Qs;case 35667:case 35671:return $s;case 35668:case 35672:return ec;case 35669:case 35673:return tc;case 5125:return nc;case 36294:return rc;case 36295:return ic;case 36296:return ac;case 35678:case 36198:case 36298:case 36306:case 35682:return oc;case 35679:case 36299:case 36307:return sc;case 35680:case 36300:case 36308:case 36293:return cc;case 36289:case 36303:case 36311:case 36292:return lc}}var dc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ws(t.type)}},fc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uc(t.type)}},pc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},mc=/(\w+)(\])?(\[|\.)?/g;function hc(e,t){e.seq.push(t),e.map[t.id]=t}function gc(e,t,n){let r=e.name,i=r.length;for(mc.lastIndex=0;;){let a=mc.exec(r),o=mc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){hc(n,l===void 0?new dc(s,e,t):new fc(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new pc(s),hc(n,e)),n=e}}}var _c=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);gc(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function vc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var yc=37297,bc=0;function xc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Sc=new W;function Cc(e){G._getMatrix(Sc,G.workingColorSpace,e);let t=`mat3( ${Sc.elements.map(e=>e.toFixed(4))} )`;switch(G.getTransfer(e)){case Le:return[t,`LinearTransferOETF`];case Re:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function wc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+xc(e.getShaderSource(t),r)}else return i}function Tc(e,t){let n=Cc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function Ec(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Dc=new U;function Oc(){return G.getLuminanceCoefficients(Dc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Dc.x.toFixed(4)}, ${Dc.y.toFixed(4)}, ${Dc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function kc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Mc).join(`
`)}function Ac(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function jc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Mc(e){return e!==``}function Nc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Fc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ic(e){return e.replace(Fc,Rc)}var Lc=new Map;function Rc(e,t){let n=Z[t];if(n===void 0){let e=Lc.get(t);if(e!==void 0)n=Z[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Ic(n)}var zc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bc(e){return e.replace(zc,Vc)}function Vc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Hc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function Uc(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function Wc(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`;break}return t}function Gc(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`;break}return t}function Kc(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`;break}return t}function qc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Jc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Uc(n),l=Wc(n),u=Gc(n),d=Kc(n),f=qc(n),p=kc(n),m=Ac(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mc).join(`
`),_.length>0&&(_+=`
`)):(g=[Hc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Mc).join(`
`),_=[Hc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Ec(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Tc(`linearToOutputTexel`,n.outputColorSpace),Oc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Mc).join(`
`)),o=Ic(o),o=Nc(o,n),o=Pc(o,n),s=Ic(s),s=Nc(s,n),s=Pc(s,n),o=Bc(o),s=Bc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=vc(i,i.VERTEX_SHADER,y),S=vc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=wc(i,x,`vertex`),n=wc(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new _c(i,h),T=jc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,yc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=bc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Yc=0,Xc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Zc(e),t.set(e,n)),n}},Zc=class{constructor(e){this.id=Yc++,this.code=e,this.usedTimes=0}};function Qc(e,t,n,r,i,a,o){let s=new On,c=new Xc,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Do[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),A=c.getFragmentShaderID(a);let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=_.isInstancedMesh===!0,N=_.isBatchedMesh===!0,P=!!a.map,F=!!a.matcap,te=!!x,ne=!!a.aoMap,re=!!a.lightMap,ie=!!a.bumpMap,ae=!!a.normalMap,oe=!!a.displacementMap,se=!!a.emissiveMap,ce=!!a.metalnessMap,le=!!a.roughnessMap,ue=a.anisotropy>0,de=a.clearcoat>0,fe=a.dispersion>0,pe=a.iridescence>0,me=a.sheen>0,I=a.transmission>0,he=ue&&!!a.anisotropyMap,ge=de&&!!a.clearcoatMap,_e=de&&!!a.clearcoatNormalMap,L=de&&!!a.clearcoatRoughnessMap,ve=pe&&!!a.iridescenceMap,R=pe&&!!a.iridescenceThicknessMap,z=me&&!!a.sheenColorMap,ye=me&&!!a.sheenRoughnessMap,be=!!a.specularMap,xe=!!a.specularColorMap,Se=!!a.specularIntensityMap,Ce=I&&!!a.transmissionMap,we=I&&!!a.thicknessMap,Te=!!a.gradientMap,Ee=!!a.alphaMap,De=a.alphaTest>0,Oe=!!a.alphaHash,ke=!!a.extensions,Ae=0;a.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=e.toneMapping);let je={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:N,batchingColor:N&&_._colorsTexture!==null,instancing:M,instancingColor:M&&_.instanceColor!==null,instancingMorph:M&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ie,alphaToCoverage:!!a.alphaToCoverage,map:P,matcap:F,envMap:te,envMapMode:te&&x.mapping,envMapCubeUVHeight:S,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:ae,displacementMap:f&&oe,emissiveMap:se,normalMapObjectSpace:ae&&a.normalMapType===1,normalMapTangentSpace:ae&&a.normalMapType===0,metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:he,clearcoat:de,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:L,dispersion:fe,iridescence:pe,iridescenceMap:ve,iridescenceThicknessMap:R,sheen:me,sheenColorMap:z,sheenRoughnessMap:ye,specularMap:be,specularColorMap:xe,specularIntensityMap:Se,transmission:I,transmissionMap:Ce,thicknessMap:we,gradientMap:Te,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Ee,alphaTest:De,alphaHash:Oe,combine:a.combine,mapUv:P&&h(a.map.channel),aoMapUv:ne&&h(a.aoMap.channel),lightMapUv:re&&h(a.lightMap.channel),bumpMapUv:ie&&h(a.bumpMap.channel),normalMapUv:ae&&h(a.normalMap.channel),displacementMapUv:oe&&h(a.displacementMap.channel),emissiveMapUv:se&&h(a.emissiveMap.channel),metalnessMapUv:ce&&h(a.metalnessMap.channel),roughnessMapUv:le&&h(a.roughnessMap.channel),anisotropyMapUv:he&&h(a.anisotropyMap.channel),clearcoatMapUv:ge&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:_e&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:L&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:R&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:z&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:ye&&h(a.sheenRoughnessMap.channel),specularMapUv:be&&h(a.specularMap.channel),specularColorMapUv:xe&&h(a.specularColorMap.channel),specularIntensityMapUv:Se&&h(a.specularIntensityMap.channel),transmissionMapUv:Ce&&h(a.transmissionMap.channel),thicknessMapUv:we&&h(a.thicknessMap.channel),alphaMapUv:Ee&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(ae||ue),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(P||Ee),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0&&a.wireframe===!1,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ae,decodeVideoTexture:P&&a.map.isVideoTexture===!0&&G.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&a.emissiveMap.isVideoTexture===!0&&G.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:ke&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(ke&&a.extensions.multiDraw===!0||N)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return je.vertexUv1s=l.has(1),je.vertexUv2s=l.has(2),je.vertexUv3s=l.has(3),l.clear(),je}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),t.gradientMap&&s.enable(22),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=Do[t];n=Gr.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Jc(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function $c(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function el(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function nl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||el),r.length>1&&r.sort(t||tl),i.length>1&&i.sort(t||tl)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function rl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new nl,e.set(t,[i])):n>=r.length?(i=new nl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function il(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new U,color:new K};break;case`SpotLight`:n={position:new U,direction:new U,color:new K,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new K,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new K,groundColor:new K};break;case`RectAreaLight`:n={color:new K,position:new U,halfWidth:new U,halfHeight:new U};break}return e[t.id]=n,n}}}function al(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var ol=0;function sl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function cl(e){let t=new il,n=al(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new _n,o=new _n;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(sl);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=ol++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function ll(e){let t=new cl(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function ul(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ll(e),t.set(n,[a])):r>=i.length?(a=new ll(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var dl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pl(e,t,n){let r=new Gi,i=new H,a=new H,s=new Rt,c=new Ma({depthPacking:Pe}),l=new Na,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new Jr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:dl,fragmentShader:fl}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new Er;h.setAttribute(`position`,new gr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new J(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;i.copy(f.mapSize);let g=f.getFrameExtents();if(i.multiply(g),a.copy(f.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(a.x=Math.floor(d/g.x),i.x=a.x*g.x,f.mapSize.x=a.x),i.y>d&&(a.y=Math.floor(d/g.y),i.y=a.y*g.y,f.mapSize.y=a.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:o,magFilter:o};f.map!==null&&f.map.dispose(),f.map=new Bt(i.x,i.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(a.x*t.x,a.y*t.y,a.x*t.z,a.y*t.w),p.viewport(s),f.updateMatrices(u,e),r=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let a=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Bt(i.x,i.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],i,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var ml={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function hl(e,t){function n(){let t=!1,n=new Rt,r=null,i=new Rt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ml[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new K(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,A=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,M=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),ee=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(N)[1]),ee=M>=1);let P=null,F={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Rt().fromArray(te),ie=new Rt().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),se(e.CULL_FACE),me(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return d[t]===n?!1:(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return m===t?!1:(e.useProgram(t),m=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){h===!0&&(ce(e.BLEND),h=!1);return}if(h===!1&&(se(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:console.error(`THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:console.error(`THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t);break}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}return}a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(fe[n],fe[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function I(t,n){t.side===2?ce(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),L(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function ge(t){t===0?ce(e.CULL_FACE):(se(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function _e(t){t!==O&&(ee&&e.lineWidth(t),O=t)}function L(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(k!==n||A!==r)&&(e.polygonOffset(n,r),k=n,A=r)):ce(e.POLYGON_OFFSET_FILL)}function ve(t){t?se(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+j-1),P!==t&&(e.activeTexture(t),P=t)}function z(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+j-1:P);let i=F[r];i===void 0&&(i={type:void 0,texture:void 0},F[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function ye(){let t=F[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function be(){try{e.compressedTexImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function xe(){try{e.compressedTexImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ce(){try{e.texSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function je(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function Me(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},P=null,F={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new K(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,A=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:I,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:L,setScissorTest:ve,activeTexture:R,bindTexture:z,unbindTexture:ye,compressedTexImage2D:be,compressedTexImage3D:xe,texImage2D:Oe,texImage3D:ke,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:Ee,texStorage3D:De,texSubImage2D:Se,texSubImage3D:Ce,compressedTexSubImage2D:we,compressedTexSubImage3D:Te,scissor:Ae,viewport:je,reset:Pe}}function gl(e,t,n,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new H,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):bt(`canvas`)}function w(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function T(e){return e.generateMipmaps}function E(t){e.generateMipmap(t)}function D(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function O(n,r,i,a,o=!1){if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let s=r;if(r===e.RED&&(i===e.FLOAT&&(s=e.R32F),i===e.HALF_FLOAT&&(s=e.R16F),i===e.UNSIGNED_BYTE&&(s=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.R8UI),i===e.UNSIGNED_SHORT&&(s=e.R16UI),i===e.UNSIGNED_INT&&(s=e.R32UI),i===e.BYTE&&(s=e.R8I),i===e.SHORT&&(s=e.R16I),i===e.INT&&(s=e.R32I)),r===e.RG&&(i===e.FLOAT&&(s=e.RG32F),i===e.HALF_FLOAT&&(s=e.RG16F),i===e.UNSIGNED_BYTE&&(s=e.RG8)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RG8UI),i===e.UNSIGNED_SHORT&&(s=e.RG16UI),i===e.UNSIGNED_INT&&(s=e.RG32UI),i===e.BYTE&&(s=e.RG8I),i===e.SHORT&&(s=e.RG16I),i===e.INT&&(s=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGB8UI),i===e.UNSIGNED_SHORT&&(s=e.RGB16UI),i===e.UNSIGNED_INT&&(s=e.RGB32UI),i===e.BYTE&&(s=e.RGB8I),i===e.SHORT&&(s=e.RGB16I),i===e.INT&&(s=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),i===e.UNSIGNED_INT&&(s=e.RGBA32UI),i===e.BYTE&&(s=e.RGBA8I),i===e.SHORT&&(s=e.RGBA16I),i===e.INT&&(s=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(s=e.R11F_G11F_B10F)),r===e.RGBA){let t=o?Le:G.getTransfer(a);i===e.FLOAT&&(s=e.RGBA32F),i===e.HALF_FLOAT&&(s=e.RGBA16F),i===e.UNSIGNED_BYTE&&(s=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return(s===e.R16F||s===e.R32F||s===e.RG16F||s===e.RG32F||s===e.RGBA16F||s===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),s}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function j(e,t){return T(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=e.target;t.removeEventListener(`dispose`,ee),N(t),t.isVideoTexture&&y.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),F(t)}function N(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=x.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&P(e),Object.keys(r).length===0&&x.delete(n)}f.remove(e)}function P(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=x.get(r);delete i[n.__cacheKey],h.memory.textures--}function F(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let te=0;function ne(){te=0}function re(){let e=te;return e>=p.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),te+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ae(t,r){let i=f.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&i.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{he(i,t,r);return}}else t.isExternalTexture&&(i.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,i.__webglTexture,e.TEXTURE0+r)}function oe(t,r){let i=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&i.__version!==t.version){he(i,t,r);return}n.bindTexture(e.TEXTURE_2D_ARRAY,i.__webglTexture,e.TEXTURE0+r)}function se(t,r){let i=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&i.__version!==t.version){he(i,t,r);return}n.bindTexture(e.TEXTURE_3D,i.__webglTexture,e.TEXTURE0+r)}function ce(t,r){let i=f.get(t);if(t.version>0&&i.__version!==t.version){ge(i,t,r);return}n.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture,e.TEXTURE0+r)}let le={[r]:e.REPEAT,[i]:e.CLAMP_TO_EDGE,[a]:e.MIRRORED_REPEAT},ue={[o]:e.NEAREST,[s]:e.NEAREST_MIPMAP_NEAREST,[c]:e.NEAREST_MIPMAP_LINEAR,[l]:e.LINEAR,[u]:e.LINEAR_MIPMAP_NEAREST,[d]:e.LINEAR_MIPMAP_LINEAR},de={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function fe(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,le[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,le[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,le[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ue[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ue[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,de[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function pe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ee));let i=n.source,a=x.get(i);a===void 0&&(a={},x.set(i,a));let o=ie(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&P(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function I(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=me(n.start,r.width,4),c=me(t.start,r.width,4);n.start<=i+1&&a===c&&me(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=e.getParameter(e.UNPACK_ROW_LENGTH),l=e.getParameter(e.UNPACK_SKIP_PIXELS),u=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;e.pixelStorei(e.UNPACK_SKIP_PIXELS,u),e.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,c),e.pixelStorei(e.UNPACK_SKIP_PIXELS,l),e.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,r,i){let a=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(a=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(a=e.TEXTURE_3D);let o=pe(t,r),s=r.source;n.bindTexture(a,t.__webglTexture,e.TEXTURE0+i);let c=f.get(s);if(s.version!==c.__version||o===!0){n.activeTexture(e.TEXTURE0+i);let t=G.getPrimaries(G.workingColorSpace),l=r.colorSpace===``?null:G.getPrimaries(r.colorSpace),u=r.colorSpace===``||t===l?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,u);let d=w(r.image,!1,p.maxTextureSize);d=De(r,d);let f=m.convert(r.format,r.colorSpace),h=m.convert(r.type),g=O(r.internalFormat,f,h,r.colorSpace,r.isVideoTexture);fe(a,r);let _,v=r.mipmaps,y=r.isVideoTexture!==!0,b=c.__version===void 0||o===!0,x=s.dataReady,S=j(r,d);if(r.isDepthTexture)g=A(r.format===k,r.type),b&&(y?n.texStorage2D(e.TEXTURE_2D,1,g,d.width,d.height):n.texImage2D(e.TEXTURE_2D,0,g,d.width,d.height,0,f,h,null));else if(r.isDataTexture)if(v.length>0){y&&b&&n.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,r=v.length;t<r;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,f,h,_.data);r.generateMipmaps=!1}else y?(b&&n.texStorage2D(e.TEXTURE_2D,S,g,d.width,d.height),x&&I(r,d,f,h)):n.texImage2D(e.TEXTURE_2D,0,g,d.width,d.height,0,f,h,d.data);else if(r.isCompressedTexture)if(r.isCompressedArrayTexture){y&&b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,d.depth);for(let t=0,i=v.length;t<i;t++)if(_=v[t],r.format!==1023)if(f!==null)if(y){if(x)if(r.layerUpdates.size>0){let i=Co(_.width,_.height,r.format,r.type);for(let a of r.layerUpdates){let r=_.data.subarray(a*i/_.data.BYTES_PER_ELEMENT,(a+1)*i/_.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,a,_.width,_.height,1,f,r)}r.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,d.depth,f,_.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,d.depth,0,_.data,0,0);else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else y?x&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,d.depth,f,h,_.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,d.depth,0,f,h,_.data)}else{y&&b&&n.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,i=v.length;t<i;t++)_=v[t],r.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,f,h,_.data):f===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,_.data):n.compressedTexImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,_.data)}else if(r.isDataArrayTexture)if(y){if(b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,d.width,d.height,d.depth),x)if(r.layerUpdates.size>0){let t=Co(d.width,d.height,r.format,r.type);for(let i of r.layerUpdates){let r=d.data.subarray(i*t/d.data.BYTES_PER_ELEMENT,(i+1)*t/d.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,d.width,d.height,1,f,h,r)}r.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,d.width,d.height,d.depth,f,h,d.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,g,d.width,d.height,d.depth,0,f,h,d.data);else if(r.isData3DTexture)y?(b&&n.texStorage3D(e.TEXTURE_3D,S,g,d.width,d.height,d.depth),x&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,d.width,d.height,d.depth,f,h,d.data)):n.texImage3D(e.TEXTURE_3D,0,g,d.width,d.height,d.depth,0,f,h,d.data);else if(r.isFramebufferTexture){if(b)if(y)n.texStorage2D(e.TEXTURE_2D,S,g,d.width,d.height);else{let t=d.width,r=d.height;for(let i=0;i<S;i++)n.texImage2D(e.TEXTURE_2D,i,g,t,r,0,f,h,null),t>>=1,r>>=1}}else if(v.length>0){if(y&&b){let t=Oe(v[0]);n.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}for(let t=0,r=v.length;t<r;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,f,h,_):n.texImage2D(e.TEXTURE_2D,t,g,f,h,_);r.generateMipmaps=!1}else if(y){if(b){let t=Oe(d);n.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}x&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,f,h,d)}else n.texImage2D(e.TEXTURE_2D,0,g,f,h,d);T(r)&&E(a),c.__version=s.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function ge(t,r,i){if(r.image.length!==6)return;let a=pe(t,r),o=r.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+i);let s=f.get(o);if(o.version!==s.__version||a===!0){n.activeTexture(e.TEXTURE0+i);let t=G.getPrimaries(G.workingColorSpace),c=r.colorSpace===``?null:G.getPrimaries(r.colorSpace),l=r.colorSpace===``||t===c?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,l);let u=r.isCompressedTexture||r.image[0].isCompressedTexture,d=r.image[0]&&r.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!u&&!d?f[e]=w(r.image[e],!0,p.maxCubemapSize):f[e]=d?r.image[e].image:r.image[e],f[e]=De(r,f[e]);let h=f[0],g=m.convert(r.format,r.colorSpace),_=m.convert(r.type),v=O(r.internalFormat,g,_,r.colorSpace),y=r.isVideoTexture!==!0,b=s.__version===void 0||a===!0,x=o.dataReady,S=j(r,h);fe(e.TEXTURE_CUBE_MAP,r);let C;if(u){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let i=0;i<C.length;i++){let a=C[i];r.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,_,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,g,_,a.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,a.data)}}}else{if(C=r.mipmaps,y&&b){C.length>0&&S++;let t=Oe(f[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(d){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}T(r)&&E(e.TEXTURE_CUBE_MAP),s.__version=o.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function _e(t,r,i,a,o,s){let c=m.convert(i.format,i.colorSpace),l=m.convert(i.type),u=O(i.internalFormat,c,l,i.colorSpace),d=f.get(r),p=f.get(i);if(p.__renderTarget=r,!d.__hasExternalTextures){let t=Math.max(1,r.width>>s),i=Math.max(1,r.height>>s);o===e.TEXTURE_3D||o===e.TEXTURE_2D_ARRAY?n.texImage3D(o,s,u,t,i,r.depth,0,c,l,null):n.texImage2D(o,s,u,t,i,0,c,l,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Te(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,a,o,p.__webglTexture,0,we(r)):(o===e.TEXTURE_2D||o>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&o<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,a,o,p.__webglTexture,s),n.bindFramebuffer(e.FRAMEBUFFER,null)}function L(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=we(n);Te(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,c,o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,c,o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=O(a.internalFormat,o,s,a.colorSpace),l=we(n);r&&Te(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,n.width,n.height):Te(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,l,c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ve(t,r){if(r&&r.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let i=f.get(r.depthTexture);i.__renderTarget=r,(!i.__webglTexture||r.depthTexture.image.width!==r.width||r.depthTexture.image.height!==r.height)&&(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),ae(r.depthTexture,0);let a=i.__webglTexture,o=we(r);if(r.depthTexture.format===1026)Te(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0);else if(r.depthTexture.format===1027)Te(r)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0);else throw Error(`Unknown depthTexture format`)}function R(t){let r=f.get(t),i=t.isWebGLCubeRenderTarget===!0;if(r.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(r.__depthDisposeCallback&&r.__depthDisposeCallback(),e){let t=()=>{delete r.__boundDepthTexture,delete r.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),r.__depthDisposeCallback=t}r.__boundDepthTexture=e}if(t.depthTexture&&!r.__autoAllocateDepthBuffer){if(i)throw Error(`target.depthTexture not supported in Cube render targets`);let e=t.texture.mipmaps;e&&e.length>0?ve(r.__webglFramebuffer[0],t):ve(r.__webglFramebuffer,t)}else if(i){r.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[i]),r.__webglDepthbuffer[i]===void 0)r.__webglDepthbuffer[i]=e.createRenderbuffer(),L(r.__webglDepthbuffer[i],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=r.__webglDepthbuffer[i];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let i=t.texture.mipmaps;if(i&&i.length>0?n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer===void 0)r.__webglDepthbuffer=e.createRenderbuffer(),L(r.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=r.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,i)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function z(t,n,r){let i=f.get(t);n!==void 0&&_e(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&R(t)}function ye(t){let r=t.texture,i=f.get(t),a=f.get(r);t.addEventListener(`dispose`,M);let o=t.textures,s=t.isWebGLCubeRenderTarget===!0,c=o.length>1;if(c||(a.__webglTexture===void 0&&(a.__webglTexture=e.createTexture()),a.__version=r.version,h.memory.textures++),s){i.__webglFramebuffer=[];for(let t=0;t<6;t++)if(r.mipmaps&&r.mipmaps.length>0){i.__webglFramebuffer[t]=[];for(let n=0;n<r.mipmaps.length;n++)i.__webglFramebuffer[t][n]=e.createFramebuffer()}else i.__webglFramebuffer[t]=e.createFramebuffer()}else{if(r.mipmaps&&r.mipmaps.length>0){i.__webglFramebuffer=[];for(let t=0;t<r.mipmaps.length;t++)i.__webglFramebuffer[t]=e.createFramebuffer()}else i.__webglFramebuffer=e.createFramebuffer();if(c)for(let t=0,n=o.length;t<n;t++){let n=f.get(o[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Te(t)===!1){i.__webglMultisampledFramebuffer=e.createFramebuffer(),i.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,i.__webglMultisampledFramebuffer);for(let n=0;n<o.length;n++){let r=o[n];i.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,i.__webglColorRenderbuffer[n]);let a=m.convert(r.format,r.colorSpace),s=m.convert(r.type),c=O(r.internalFormat,a,s,r.colorSpace,t.isXRRenderTarget===!0),l=we(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,i.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(i.__webglDepthRenderbuffer=e.createRenderbuffer(),L(i.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(s){n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),fe(e.TEXTURE_CUBE_MAP,r);for(let n=0;n<6;n++)if(r.mipmaps&&r.mipmaps.length>0)for(let a=0;a<r.mipmaps.length;a++)_e(i.__webglFramebuffer[n][a],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,a);else _e(i.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);T(r)&&E(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(c){for(let r=0,a=o.length;r<a;r++){let a=o[r],s=f.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),fe(c,a),_e(i.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+r,c,0),T(a)&&E(c)}n.unbindTexture()}else{let o=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(o=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(o,a.__webglTexture),fe(o,r),r.mipmaps&&r.mipmaps.length>0)for(let n=0;n<r.mipmaps.length;n++)_e(i.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,o,n);else _e(i.__webglFramebuffer,t,r,e.COLOR_ATTACHMENT0,o,0);T(r)&&E(o),n.unbindTexture()}t.depthBuffer&&R(t)}function be(e){let t=e.textures;for(let r=0,i=t.length;r<i;r++){let i=t[r];if(T(i)){let t=D(e),r=f.get(i).__webglTexture;n.bindTexture(t,r),E(t),n.unbindTexture()}}}let xe=[],Se=[];function Ce(t){if(t.samples>0){if(Te(t)===!1){let r=t.textures,i=t.width,a=t.height,o=e.COLOR_BUFFER_BIT,s=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=f.get(t),l=r.length>1;if(l)for(let t=0;t<r.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,c.__webglMultisampledFramebuffer);let u=t.texture.mipmaps;u&&u.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglFramebuffer);for(let n=0;n<r.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(o|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(o|=e.STENCIL_BUFFER_BIT)),l){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,c.__webglColorRenderbuffer[n]);let t=f.get(r[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,i,a,0,0,i,a,o,e.NEAREST),_===!0&&(xe.length=0,Se.length=0,xe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(xe.push(s),Se.push(s),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Se)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,xe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),l)for(let t=0;t<r.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,c.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,c.__webglColorRenderbuffer[t]);let i=f.get(r[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,i,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,c.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function we(e){return Math.min(p.maxSamples,e.samples)}function Te(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(G.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=re,this.resetTextureUnits=ne,this.setTexture2D=ae,this.setTexture2DArray=oe,this.setTexture3D=se,this.setTextureCube=ce,this.rebindTextures=z,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=R,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Te}function _l(e,t){function n(n,r=``){let i,a=G.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var vl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ji(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jr({vertexShader:vl,fragmentShader:yl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new Oa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xl=class extends Ue{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,g=new bl,v={},y=t.getContextAttributes(),b=null,x=null,C=[],w=[],T=new H,E=null,A=new $r;A.viewport=new Rt;let j=new $r;j.viewport=new Rt;let ee=[A,j],M=new lo,N=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new oi,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new oi,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new oi,C[e]=t),t.getHandSpace()};function F(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,F),r.removeEventListener(`selectstart`,F),r.removeEventListener(`selectend`,F),r.removeEventListener(`squeeze`,F),r.removeEventListener(`squeezestart`,F),r.removeEventListener(`squeezeend`,F),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}N=null,P=null,g.reset();for(let e in v)delete v[e];e.setRenderTarget(b),p=null,d=null,u=null,r=null,x=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?p:d},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,F),r.addEventListener(`selectstart`,F),r.addEventListener(`selectend`,F),r.addEventListener(`squeeze`,F),r.addEventListener(`squeezestart`,F),r.addEventListener(`squeezeend`,F),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?k:O,a=y.stencil?S:_);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Bt(d.textureWidth,d.textureHeight,{format:D,type:f,depthTexture:new qi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Bt(p.framebufferWidth,p.framebufferHeight,{format:D,type:f,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let re=new U,ie=new U;function ae(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),M.near=j.near=A.near=t,M.far=j.far=A.far=n,(N!==M.near||P!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),N=M.near,P=M.far),M.layers.mask=e.layers.mask|6,A.layers.mask=M.layers.mask&3,j.layers.mask=M.layers.mask&5;let i=e.parent,a=M.cameras;oe(M,i);for(let e=0;e<a.length;e++)oe(a[e],i);a.length===2?ae(M,A,j):M.projectionMatrix.copy(A.projectionMatrix),se(e,M,i)};function se(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=qe*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)},this.getCameraTexture=function(e){return v[e]};let ce=null;function le(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==M.cameras.length&&(M.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=ee[n];o===void 0&&(o=new $r,o.layers.enable(n),o.viewport=new Rt,ee[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(M.matrix.copy(o.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),i===!0&&M.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Ji,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ce&&ce(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let ue=new To;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}},Sl=new Dn,Cl=new _n;function wl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Wr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,Sl.copy(o),Sl.x*=-1,Sl.y*=-1,Sl.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(Sl.y*=-1,Sl.z*=-1),e.envMapRotation.value.setFromMatrix4(Cl.makeRotationFromEuler(Sl)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Tl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var El=class{constructor(e={}){let{canvas:t=xt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=new Uint32Array(4),g=new Int32Array(4),_=null,v=null,b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=Fe;let w=0,T=0,E=null,D=-1,O=null,k=new Rt,A=new Rt,j=null,ee=new K(0),M=0,N=t.width,P=t.height,F=1,te=null,ne=null,re=new Rt(0,0,N,P),ie=new Rt(0,0,N,P),ae=!1,oe=new Gi,se=!1,ce=!1,le=new _n,ue=new U,de=new Rt,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pe=!1;function me(){return E===null?F:1}let I=n;function he(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r180`),t.addEventListener(`webglcontextlost`,Ve,!1),t.addEventListener(`webglcontextrestored`,Ue,!1),t.addEventListener(`webglcontextcreationerror`,We,!1),I===null){let t=`webgl2`;if(I=he(t,e),I===null)throw he(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let ge,_e,L,ve,R,z,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Le,Re;function ze(){ge=new as(I),ge.init(),Pe=new _l(I,ge),_e=new Po(I,ge,e,Pe),L=new hl(I,ge),_e.reversedDepthBuffer&&p&&L.buffers.depth.setReversed(!0),ve=new cs(I),R=new $c,z=new gl(I,ge,L,R,_e,Pe,ve),ye=new Io(S),be=new is(S),xe=new Eo(I),Le=new Mo(I,xe),Se=new os(I,xe,ve,Le),Ce=new us(I,Se,xe,ve),je=new ls(I,_e,z),Oe=new Fo(R),we=new Qc(S,ye,be,ge,_e,Le,Oe),Te=new wl(S,R),Ee=new rl,De=new ul(ge),Ae=new jo(S,ye,be,L,Ce,m,s),ke=new pl(S,Ce,_e),Re=new Tl(I,ve,_e,L),Me=new No(I,ge,ve),Ne=new ss(I,ge,ve),ve.programs=we.programs,S.capabilities=_e,S.extensions=ge,S.properties=R,S.renderLists=Ee,S.shadowMap=ke,S.state=L,S.info=ve}ze();let Be=new xl(S,I);this.xr=Be,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(e){e!==void 0&&(F=e,this.setSize(N,P,!1))},this.getSize=function(e){return e.set(N,P)},this.setSize=function(e,n,r=!0){if(Be.isPresenting){console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`);return}N=e,P=n,t.width=Math.floor(e*F),t.height=Math.floor(n*F),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(N*F,P*F).floor()},this.setDrawingBufferSize=function(e,n,r){N=e,P=n,F=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(k)},this.getViewport=function(e){return e.copy(re)},this.setViewport=function(e,t,n,r){e.isVector4?re.set(e.x,e.y,e.z,e.w):re.set(e,t,n,r),L.viewport(k.copy(re).multiplyScalar(F).round())},this.getScissor=function(e){return e.copy(ie)},this.setScissor=function(e,t,n,r){e.isVector4?ie.set(e.x,e.y,e.z,e.w):ie.set(e,t,n,r),L.scissor(A.copy(ie).multiplyScalar(F).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(e){L.setScissorTest(ae=e)},this.setOpaqueSort=function(e){te=e},this.setTransparentSort=function(e){ne=e},this.getClearColor=function(e){return e.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(E!==null){let t=E.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=E.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=Ae.getClearColor(),r=Ae.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,I.clearBufferuiv(I.COLOR,0,h)):(g[0]=i,g[1]=a,g[2]=o,g[3]=r,I.clearBufferiv(I.COLOR,0,g))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ve,!1),t.removeEventListener(`webglcontextrestored`,Ue,!1),t.removeEventListener(`webglcontextcreationerror`,We,!1),Ae.dispose(),Ee.dispose(),De.dispose(),R.dispose(),ye.dispose(),be.dispose(),Ce.dispose(),Le.dispose(),Re.dispose(),we.dispose(),Be.dispose(),Be.removeEventListener(`sessionstart`,Xe),Be.removeEventListener(`sessionend`,Ze),Qe.stop()};function Ve(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function Ue(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=ve.autoReset,t=ke.enabled,n=ke.autoUpdate,r=ke.needsUpdate,i=ke.type;ze(),ve.autoReset=e,ke.enabled=t,ke.autoUpdate=n,ke.needsUpdate=r,ke.type=i}function We(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ge(e){let t=e.target;t.removeEventListener(`dispose`,Ge),Ke(t)}function Ke(e){qe(e),R.remove(e)}function qe(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){we.releaseProgram(e)}),e.isShaderMaterial&&we.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=fe);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=st(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Se.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Le.setup(i,r,s,n,c);let h,g=Me;if(c!==null&&(h=xe.get(c),g=Ne,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*me()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*me()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh)if(i._multiDrawInstances!==null)Ct(`THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.`),g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(ge.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?xe.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Je(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,it(e,t,n),e.side=0,e.needsUpdate=!0,it(e,t,n),e.side=2):it(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),v=De.get(n),v.init(t),x.push(v),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),v.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Je(a,n,e),r.add(a)}else Je(t,n,e),r.add(t)}),v=x.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){R.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}ge.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let B=null;function Ye(e){B&&B(e)}function Xe(){Qe.stop()}function Ze(){Qe.start()}let Qe=new To;Qe.setAnimationLoop(Ye),typeof self<`u`&&Qe.setContext(self),this.setAnimationLoop=function(e){B=e,Be.setAnimationLoop(e),e===null?Qe.stop():Qe.start()},Be.addEventListener(`sessionstart`,Xe),Be.addEventListener(`sessionend`,Ze),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(t),t=Be.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,E),v=De.get(e,x.length),v.init(t),x.push(v),le.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),oe.setFromProjectionMatrix(le,He,t.reversedDepth),ce=this.localClippingEnabled,se=Oe.init(this.clippingPlanes,ce),_=Ee.get(e,b.length),_.init(),b.push(_),Be.enabled===!0&&Be.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&$e(e,t,-1/0,S.sortObjects)}$e(e,t,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(te,ne),pe=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,pe&&Ae.addToRenderList(_,e),this.info.render.frame++,se===!0&&Oe.beginShadows();let n=v.state.shadowsArray;ke.render(n,e,t),se===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=_.opaque,i=_.transmissive;if(v.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];tt(r,i,e,a)}pe&&Ae.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];et(_,e,r,r.viewport)}}else i.length>0&&tt(r,i,e,t),pe&&Ae.render(e),et(_,e,t);E!==null&&T===0&&(z.updateMultisampleRenderTarget(E),z.updateRenderTargetMipmap(E)),e.isScene===!0&&e.onAfterRender(S,e,t),Le.resetDefaultState(),D=-1,O=null,x.pop(),x.length>0?(v=x[x.length-1],se===!0&&Oe.setGlobalState(S.clippingPlanes,v.state.camera)):v=null,b.pop(),_=b.length>0?b[b.length-1]:null};function $e(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)v.pushLight(e),e.castShadow&&v.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||oe.intersectsSprite(e)){r&&de.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);let t=Ce.update(e),i=e.material;i.visible&&_.push(e,t,i,n,de.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||oe.intersectsObject(e))){let t=Ce.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),de.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),de.copy(e.boundingSphere.center)),de.applyMatrix4(e.matrixWorld).applyMatrix4(le)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&_.push(e,t,s,n,de.z,o)}}else i.visible&&_.push(e,t,i,n,de.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)$e(i[e],t,n,r)}function et(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;v.setupLightsView(n),se===!0&&Oe.setGlobalState(S.clippingPlanes,n),r&&L.viewport(k.copy(r)),i.length>0&&nt(i,t,n),a.length>0&&nt(a,t,n),o.length>0&&nt(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function tt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[r.id]===void 0&&(v.state.transmissionRenderTarget[r.id]=new Bt(1,1,{generateMipmaps:!0,type:ge.has(`EXT_color_buffer_half_float`)||ge.has(`EXT_color_buffer_float`)?y:f,minFilter:d,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:G.workingColorSpace}));let a=v.state.transmissionRenderTarget[r.id],o=r.viewport||k;a.setSize(o.z*S.transmissionResolutionScale,o.w*S.transmissionResolutionScale);let s=S.getRenderTarget(),c=S.getActiveCubeFace(),l=S.getActiveMipmapLevel();S.setRenderTarget(a),S.getClearColor(ee),M=S.getClearAlpha(),M<1&&S.setClearColor(16777215,.5),S.clear(),pe&&Ae.render(n);let u=S.toneMapping;S.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),v.setupLightsView(r),se===!0&&Oe.setGlobalState(S.clippingPlanes,r),nt(e,n,r),z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a),ge.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,rt(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a))}S.setRenderTarget(s,c,l),S.setClearColor(ee,M),p!==void 0&&(r.viewport=p),S.toneMapping=u}function nt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=a.group,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&rt(o,t,n,s,l,c)}}function rt(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function it(e,t,n){t.isScene!==!0&&(t=fe);let r=R.get(e),i=v.state.lights,a=v.state.shadowsArray,o=i.state.version,s=we.getParameters(e,i.state,a,t,n),c=we.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?be:ye).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ge),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return ot(e,s),u}else s.uniforms=we.getUniforms(e),e.onBeforeCompile(s,S),u=we.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=Oe.uniform),ot(e,s),r.needsLights=lt(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function at(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=_c.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ot(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function st(e,t,n,r,i){t.isScene!==!0&&(t=fe),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ie,c=(r.isMeshStandardMaterial?be:ye).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=R.get(r),y=v.state.lights;if(se===!0&&(ce===!0||e!==O)){let t=e===O&&r.id===D;Oe.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==y.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==Oe.numPlanes||_.numIntersection!==Oe.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=it(r,t,i));let C=!1,w=!1,T=!1,k=x.getUniforms(),A=_.uniforms;if(L.useProgram(x.program)&&(C=!0,w=!0,T=!0),r.id!==D&&(D=r.id,w=!0),C||O!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(I,`projectionMatrix`,e.projectionMatrix),k.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(I,ue.setFromMatrixPosition(e.matrixWorld)),_e.logarithmicDepthBuffer&&k.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),O!==e&&(O=e,w=!0,T=!0)}if(i.isSkinnedMesh){k.setOptional(I,i,`bindMatrix`),k.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(I,`boneTexture`,e.boneTexture,z))}i.isBatchedMesh&&(k.setOptional(I,i,`batchingTexture`),k.setValue(I,`batchingTexture`,i._matricesTexture,z),k.setOptional(I,i,`batchingIdTexture`),k.setValue(I,`batchingIdTexture`,i._indirectTexture,z),k.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(I,`batchingColorTexture`,i._colorsTexture,z));let j=n.morphAttributes;if((j.position!==void 0||j.normal!==void 0||j.color!==void 0)&&je.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,k.setValue(I,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(A.envMap.value=c,A.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(A.envMapIntensity.value=t.environmentIntensity),w&&(k.setValue(I,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&ct(A,T),a&&r.fog===!0&&Te.refreshFogUniforms(A,a),Te.refreshMaterialUniforms(A,r,F,P,v.state.transmissionRenderTarget[e.id]),_c.upload(I,at(_),A,z)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(_c.upload(I,at(_),A,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(I,`center`,i.center),k.setValue(I,`modelViewMatrix`,i.modelViewMatrix),k.setValue(I,`normalMatrix`,i.normalMatrix),k.setValue(I,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Re.update(n,x),Re.bind(n,x)}}return x}function ct(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function lt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let ut=I.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){E=e,w=t,T=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=R.get(e);if(s.__useDefaultFramebuffer!==void 0)L.bindFramebuffer(I.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)z.setupRenderTarget(e);else if(s.__hasExternalTextures)z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);z.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,k.copy(e.viewport),A.copy(e.scissor),j=e.scissorTest}else k.copy(re).multiplyScalar(F).floor(),A.copy(ie).multiplyScalar(F).floor(),j=ae;if(n!==0&&(i=ut),L.bindFramebuffer(I.FRAMEBUFFER,i)&&r&&L.drawBuffers(e,i),L.viewport(k),L.scissor(A),L.setScissorTest(j),a){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}D=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(!_e.textureFormatReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!_e.textureTypeReadable(l)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&(e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),I.readPixels(t,n,r,i,Pe.convert(c),Pe.convert(l),a))}finally{let e=E===null?null:R.get(E).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(!_e.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!_e.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),I.readPixels(t,n,r,i,Pe.convert(l),Pe.convert(u),0);let f=E===null?null:R.get(E).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,f);let p=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await wt(I,p,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.deleteBuffer(d),I.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;z.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()};let dt=I.createFramebuffer(),ft=I.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=null){a===null&&(i===0?a=0:(Ct(`WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.`),a=i,i=0));let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Pe.convert(t.format),_=Pe.convert(t.type),v;t.isData3DTexture?(z.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(z.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(z.setTexture2D(t,0),v=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(I.UNPACK_ROW_LENGTH),b=I.getParameter(I.UNPACK_IMAGE_HEIGHT),x=I.getParameter(I.UNPACK_SKIP_PIXELS),S=I.getParameter(I.UNPACK_SKIP_ROWS),C=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,l),I.pixelStorei(I.UNPACK_SKIP_ROWS,u),I.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,o,s,f,p,o,s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,dt),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,ft);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,o,s,f,p,o,s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(I.UNPACK_ROW_LENGTH,y),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(I.UNPACK_SKIP_PIXELS,x),I.pixelStorei(I.UNPACK_SKIP_ROWS,S),I.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&z.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,L.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=G._getDrawingBufferColorSpace(e),t.unpackColorSpace=G._getUnpackColorSpace()}};function Dl(e,t,n,r,i){let a=new U(t.x,n(t.x,t.z)+.15,t.z),o=a.clone().applyMatrix4(e.matrixWorldInverse),s=a.project(e),c=!1,l=new U(t.x,n(t.x,t.z)+.5,t.z);for(let t=1;t<24;t++){let r=e.position.clone().lerp(l,t/24);if(r.y<n(r.x,r.z)+.08){c=!0;break}}let u=o.z<0&&Math.abs(s.x)<.87&&Math.abs(s.y)<.75,d=t.radius*i/(Math.max(.01,-o.z)*Math.tan(mt.degToRad(e.fov/2)));if(!c&&u)return d>=16?null:{x:(s.x+1)*r/2,y:(1-s.y)*i/2-22,angle:Math.PI/2};let f=o.x,p=-o.y;Math.hypot(f,p)<.001&&(p=1);let m=Math.min((r/2-32)/Math.max(Math.abs(f),.001),(i/2-115)/Math.max(Math.abs(p),.001));return{x:r/2+f*m,y:i/2+p*m,angle:Math.atan2(p,f)}}var Ol=(e,t,n)=>Math.max(t,Math.min(n,e));function kl(e,t,n){let r=Ol((t-e.eastMin)/e.step,0,e.columns-1),i=Ol((e.northMax-n)/e.step,0,e.rows-1),a=Math.min(Math.floor(r),e.columns-2),o=Math.min(Math.floor(i),e.rows-2),s=r-a,c=i-o,l=o*e.columns+a;return(e.data[l]*(1-s)+e.data[l+1]*s)*(1-c)+(e.data[l+e.columns]*(1-s)+e.data[l+e.columns+1]*s)*c}function Al(e,t,n,r){let i=Ol(Math.min(t-e.eastMin,e.eastMin+(e.columns-1)*e.step-t,e.northMax-n,n-(e.northMax-(e.rows-1)*e.step))/r,0,1);return i*i*(3-2*i)}function jl(e,t,n,r,i,a,o,s,c,l){return(u,d)=>{if(l&&Al(l,u,d,200)===1){let e=kl(l,u,d),t=Al(r,u,d,15);return t?e*(1-t)+kl(r,u,d)*t:e}let f=kl(s??e,u,d);for(let[s,p]of[[e,400],[t,200],[n,80],...i?[[i,80]]:[],...a?[[a,80]]:[],...o?[[o,120]]:[],...c?[[c,120]]:[],...l?[[l,200]]:[],[r,15]]){let e=Al(s,u,d,p);e&&(f=f*(1-e)+kl(s,u,d)*e)}return f}}function Ml(e,t){let{crop:n,encoding:r}=e;if(t.byteLength!==n.columns*n.rows*2||!Number.isFinite(r.offset)||!Number.isFinite(r.scale)||r.scale<=0)throw Error(`Incomplete Jezero terrain foundation`);let i=new DataView(t),a=new Float32Array(n.columns*n.rows);for(let e=0;e<a.length;e++){let t=i.getUint16(e*2,!0);if(t===65535)throw Error(`Missing Jezero foundation height`);a[e]=r.offset+t*r.scale}return{...n,data:a}}async function Nl(){let e=await fetch(new URL(``+new URL(`traverse-B3twZBlJ.json`,import.meta.url).href,``+import.meta.url));if(!e.ok)throw Error(`Jezero recorded traverse could not load.`);let t=await e.json(),n=new URL(`../../tools/prototypes/jezero/assets/`,document.baseURI),r=async e=>{let t=await fetch(new URL(e,n));if(!t.ok)throw Error(`Jezero elevation data could not load: `+e);return t},[i,a,o,s,c,l,u,d,f,p]=await Promise.all([r(`world-terrain.json`).then(e=>e.json()),r(`floor-terrain.json`).then(e=>e.json()),r(`belva-terrain.json`).then(e=>e.json()),r(`bright-terrain.json`).then(e=>e.json()),...[`world-elevations.f32`,`world-context.f32`,`floor-elevations.f32`,`kodiak-relief.f32`,`belva-elevations.f32`,`bright-elevations.f32`].map(e=>r(e).then(e=>e.arrayBuffer()).then(e=>new Float32Array(e)))]),[m,h,g,_]=await Promise.all([r(`rim-terrain.json`).then(e=>e.json()),r(`rim-elevations.f32`).then(e=>e.arrayBuffer()).then(e=>new Float32Array(e)),r(`rim-context.json`).then(e=>e.json()),r(`rim-context.f32`).then(e=>e.arrayBuffer()).then(e=>new Float32Array(e))]),[v,y]=await Promise.all([r(`western-terrain.json`).then(e=>e.json()),r(`western-elevations.f32`).then(e=>e.arrayBuffer()).then(e=>new Float32Array(e))]),[b,x]=await Promise.all([r(`foundation-terrain.json`).then(e=>e.json()),r(`foundation-heights.u16`).then(e=>e.arrayBuffer())]),S=Ml(b,x),C=[{...i.context,data:l},{...i.crop,data:c},{...a,step:a.sampleMetres,data:u},{eastMin:-100,northMax:-1020,step:5,columns:121,rows:97,data:d},{...o.crop,data:f},{...s.crop,data:p},{...m.crop,data:h},{...g.crop,data:_},{...v.crop,data:y}];for(let e of C)if(e.data.length!==e.columns*e.rows||e.data.some(e=>!Number.isFinite(e)||e<-1e4))throw Error(`Incomplete Jezero elevation coverage`);return{height:jl(C[0],C[1],C[2],C[3],C[4],C[5],C[6],C[7],C[8],S),foundation:S,segments:t.segments,traverse:t,grids:C,source:a.source,contextSource:i.source}}var Pl={east:-7673.123148235647,north:-205.81301199345438},Fl=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)};function Il(e,t){return Fl(5800,6600,-e)*(1-Fl(7900,8700,-e))*Fl(-1800,-900,t)*(1-Fl(1700,2600,t))}function Ll(e,t){return Math.hypot(e-Pl.east,t-Pl.north)<160?`Lookout Hill`:Il(e,t)>.2?e>Pl.east?`Jezero rim ascent`:`Jezero western rim`:`Jezero region`}function Rl(e,t){return[[18,-10,.6,.5],[27,-14,.45,.33],[41,-21,.75,.6],[15,-28,.3,.24],[54,-26,.5,.38],[72,-38,.85,.62],[24,19,.28,.2],[48,28,.36,.28],[90,-35,.55,.4],[120,-58,.8,.6],[140,45,.45,.35],[65,-65,.38,.3]].map(([n,r,i,a],o)=>({x:Pl.east+n-e,z:t-(Pl.north+r),radius:i,height:a,shade:.39+o%4*.025}))}var zl=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)};function Bl(e,t){let n=zl(7800,8400,-e)*(1-zl(11300,12e3,-e))*zl(-3700,-3100,t)*(1-zl(1200,1800,t)),r=n*Math.exp(-(((e+8170)/470)**2+((t+60)/630)**2)),i=n*Math.exp(-(((e+8770)/590)**2+((t+650)/600)**2));return{west:n,witch:r,plain:i,frontier:n*zl(9e3,9600,-e),sand:i*Math.exp(-(((e+8690)/145)**2+((t+550)/210)**2))}}function Vl(e,t){let n=Bl(e,t);return n.west<.2?null:Math.hypot(e+8548.587457,t+504.795772)<180?`Falbreen`:n.witch>.18?`Witch Hazel Hill`:n.frontier>.3?`Western exploration frontier`:`Beyond the rim`}function Hl(e){let t=[];for(let n=-17;n<=6;n++)for(let r=-56;r<=-39;r++){let i=(Math.imul(r,9187)^Math.imul(n,6719)^1354)>>>0,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296),o=(r+a())*200,s=(n+a())*200,c=Bl(o,s);if(!(a()>c.west*.7))for(let n=0;n<8;n++){let n=a()*Math.PI*2,r=8+a()*55,i=o+Math.cos(n)*r-e.originEast,l=e.originNorth-s-Math.sin(n)*r,u=.3+a()**2*(1+c.frontier*.8),d=u*(.28+a()*.5),f=.34+a()*.12+c.witch*.06;e.stops.some(e=>Math.hypot(i-e.x,l-e.z)<e.radius+14+u)||Math.abs(e.ground(i-2,l)-e.ground(i+2,l))+Math.abs(e.ground(i,l-2)-e.ground(i,l+2))>3||t.push({x:i,z:l,radius:u,height:d,shade:f})}}return t}function Ul(e,t){let n=e.segments.filter(e=>e.sol<=t),r=n[n.length-1];if(!r)throw Error(`Missing western traverse anchor`);let[i,a]=r.points[r.points.length-1];return{east:i,north:a,sol:r.sol}}function Wl(e,t,n){let r=(e,r)=>({x:e-t,z:n-r}),i=Ul(e,1505),a=Ul(e,1516),o=Ul(e,1980),s=r(i.east,i.north),c=r(a.east,a.north),l=r(o.east,o.north);return[{id:`witch-hazel`,name:`Witch Hazel Hill`,location:`Witch Hazel Hill`,...s,radius:7,fact:`The pale outcrops above you belong to the Broom Point member of Witch Hazel Hill. These ancient rocks preserve a history of impacts and deformation. Looking back up the outer rim reveals the layers Perseverance examined on its descent.`,source:`https://www.jpl.nasa.gov/images/pia26755-nasas-perseverance-rover-provides-sweeping-view-of-broom-point/`,imageSource:`https://www.jpl.nasa.gov/images/pia26755-nasas-perseverance-rover-provides-sweeping-view-of-broom-point/`,photo:new URL(``+new URL(`witch-hazel-broom-sol1505-CGDAptDg.jpg`,import.meta.url).href,``+import.meta.url).href,alt:`Pale bands and dark rubble on the rising outer slope of Jezero’s rim`,credit:`NASA/JPL-Caltech/ASU/MSSS`,caption:`Sol 1505 · Broom Point member, looking back up the outer rim.`,cameraEye:{...s,height:2.1},focus:{...r(i.east+520,i.north-140),name:`Witch Hazel Hill · Broom Point`},viewWidth:650},{id:`beyond-rim`,name:`Falbreen`,location:`Falbreen`,...c,radius:7,fact:`Pale fractured pavement meets dark windblown sand at Falbreen. Beyond the crater rim, Perseverance studies rock units that tell a different story from Jezero’s river delta. Small changes in texture help the team choose what to investigate next.`,source:`https://www.jpl.nasa.gov/images/pia26644-nasas-perseverance-rover-at-falbreen/`,imageSource:`https://maps.planet.fu-berlin.de/jezero/360/45`,photo:new URL(``+new URL(`falbreen-sol1516-8UPtIHaK.jpg`,import.meta.url).href,``+import.meta.url).href,alt:`Pale cracked pavement, dark sand and low ridges`,credit:`NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin`,caption:`Sol 1516 · Falbreen. Enhanced color; the blue sky is a result of image processing.`,cameraEye:{...c,height:2.1},focus:{...r(a.east-550,a.north-50),name:`Falbreen · sand and stone`},viewWidth:830},{id:`frontier`,name:`Western frontier`,location:`Western exploration frontier`,...l,radius:7,fact:`Wheel impressions wind between loose stones beyond Jezero’s rim. This navigation-camera view records one point in an ongoing journey. The historical tracks continue across the surrounding terrain; this stop is not the end of the real mission.`,source:`https://science.nasa.gov/mission/mars-2020-perseverance/location-map/`,imageSource:`https://mars.nasa.gov/mars2020/multimedia/raw-images/NLF_1980_0842717010_566ECM_N0910970NCAM03980_07_195J`,photo:new URL(``+new URL(`jezero-frontier-BgboLRIT.jpg`,import.meta.url).href,``+import.meta.url).href,alt:`Close navigation-camera view of wheel impressions and scattered stones`,credit:`NASA/JPL-Caltech`,caption:`Sol 1980 · Navcam wheel-track study, rover reference 91 / 970.`,cameraEye:{x:l.x-2,z:l.z-3,height:2.1},focus:{x:l.x,z:l.z-1,name:`Western frontier · wheel impressions`,heightOffset:0},viewWidth:5.5}]}function Gl(e){let{ground:t,stops:n}=e,r=[],i=[],a=181,o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),s=(e,t,n,i)=>{for(let a of[e,t,n])r.push(...a,i,i*.87,i*.71)};function c(e,n,r,a,c,l,u){let d=[],f=[],p=Math.cos(l),m=Math.sin(l);for(let i=0;i<7;i++){let s=i*Math.PI*2/7,l=.52+o()*.48,u=Math.cos(s)*r*l,h=Math.sin(s)*r*a*l,g=e+u*p-h*m,_=n+u*m+h*p,v=t(g,_);f.push([g,v-.025,_]),d.push([g,v+c*(.35+o()*.45),_])}let h=[e,t(e,n)+c,n];for(let e=0;e<7;e++){let t=(e+1)%7;s(h,d[t],d[e],u),s(f[e],d[e],d[t],u*.84),s(f[e],d[t],f[t],u*.84)}c>.22&&i.push({id:`photo-exposure-`+i.length,kind:`rock`,x:e,z:n,y:t(e,n)+c*.5,hx:r*.72,hz:r*a*.72,hy:c*.5})}for(let e of[`seitah`,`margin`,`witch-hazel`]){let t=n.find(t=>t.id===e);if(!t?.focus)continue;let r=Math.hypot(t.focus.x-t.x,t.focus.z-t.z)||1,i=(t.focus.x-t.x)/r,a=(t.focus.z-t.z)/r,s=e===`seitah`?1800:650;for(let r=0;r<s;r++){let r=3+o()**1.6*(e===`witch-hazel`?170:100),s=(o()-.5)*(e===`witch-hazel`?230:130),l=Math.sin(s*.15+Math.sin(r*.08))*Math.sin(r*.12),u=Math.sin(r*.19+s*.055);if(l<.1||u<-.65||o()<.2)continue;let d=t.x+i*r+a*s,f=t.z+a*r-i*s,p=.25+o()**2*1.05;if(Math.hypot(d-t.x,f-t.z)<2+p)continue;let m=.08+o()**2*.29;n.some(e=>Math.hypot(d-e.x,f-e.z)<e.radius+5+p)&&(m=Math.min(.16,m)),c(d,f,p,.45+o()*.4,m,Math.atan2(-i,a)+(o()-.5)*.8,.46+o()*.12)}}let l=196-e.originEast,u=e.originNorth+1260,d=-1/0,f=1/0;for(let e=-120;e<=120;e+=12)for(let n=-150;n<=150;n+=12){let r=t(l+n,u+e);d=Math.max(d,r),f=Math.min(f,r)}for(let e=0;e<900;e++){let e=l+(o()-.5)*330,n=u+(o()-.5)*270,r=(t(e,n)-f)/Math.max(1,d-f),i=Math.hypot(t(e-2,n)-t(e+2,n),t(e,n-2)-t(e,n+2))/4;if(r<.24||i<.12||i>1.8)continue;let a=r>.69,s=Math.sin(e*.13+n*.035)+Math.sin(n*.19);if(a&&s<-.1)continue;let p=a?.9+o()*2.3:.2+o()*.65,m=a?.1+o()*.2:.07+o()*.12;c(e,n,p,a?.45:.75,m,Math.atan2(t(e,n-2)-t(e,n+2),t(e-2,n)-t(e+2,n)),a?.43+o()*.13:.46+o()*.1)}return{vertices:r,solids:i}}var Kl=`modulepreload`,ql=function(e,t){return new URL(e,t).href},Jl={},Yl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=ql(t,n),t=s(t),t in Jl)return;Jl[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Kl,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Xl({ground:e,bounds:t,stops:n}){let r=[];for(let i=Math.floor(-t.north/120);i<=Math.floor(-t.south/120);i++)for(let a=Math.floor(t.west/120);a<=Math.floor(t.east/120);a++){let o=(Math.imul(a,73856093)^Math.imul(i,19349663)^2026)>>>0,s=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296);for(let o=0;o<3;o++){let o=(a+s())*120,c=(i+s())*120,l=.24+s()**2*1.25,u=l*(.35+s()*.45),d=.32+s()*.15;o<t.west||o>t.east||c<-t.north||c>-t.south||n.some(e=>Math.hypot(o-e.x,c-e.z)<e.radius+14)||Math.abs(e(o-2,c)-e(o+2,c))+Math.abs(e(o,c-2)-e(o,c+2))>3||r.push({x:o,z:c,radius:l,height:u,shade:d})}}return r}async function Zl(e){let{ground:t,originEast:n,originNorth:r}=e,i=3.2,[{buildRockStructures:a},{buildRidgeCluster:o}]=await Promise.all([Yl(()=>import(new URL(`../../tools/prototypes/jezero/rock-structures.js`,document.baseURI).href),[],import.meta.url),Yl(()=>import(new URL(`../../tools/prototypes/jezero/terrain.js`,document.baseURI).href),[],import.meta.url)]),s=(e,t)=>({x:e/i-1500-n,z:r-(1500-t/i)}),c=(e,n)=>{let r=s(e,n);return t(r.x,r.z)*4},l=a(c),u=o(c),d=[],f=l.structures.find(e=>e.id===`artuby-benches`),p=Array.from(l.vertices).filter((e,t)=>!f||t<f.vertexStart*9||t>=(f.vertexStart+f.vertexCount)*9);for(let e of[p,u.vertices])for(let t=0;t<e.length;t+=9){let n=s(e[t],e[t+1]);d.push(n.x,e[t+2]/4,n.z,e[t+6],e[t+7],e[t+8])}let m=[...Xl(e),...Rl(n,r),...Hl(e)],h=m.filter(e=>e.height>.22).map((e,n)=>({id:`natural-rock-`+n,kind:`rock`,x:e.x,z:e.z,y:t(e.x,e.z)+e.height*.5,hx:e.radius*.8,hz:e.radius*.8,hy:e.height*.5}));for(let[e,n,r]of u.rocks){let a=s(e,n);h.push({id:`photo-rock-`+h.length,kind:`rock`,x:a.x,z:a.z,y:t(a.x,a.z)+r/4*.5,hx:r/i,hz:r/i,hy:r/4*.5})}let g=Gl(e);for(let e of g.vertices)d.push(e);return h.push(...g.solids),{scenery:d,solids:h,rocks:m}}function Ql(e,t,n,r=600){if(!Number.isFinite(r)||r<0)throw Error(`Invalid Jezero traverse buffer`);let i=1/0,a=-1/0,o=1/0,s=-1/0;for(let{points:t}of e)for(let[e,n]of t){if(!Number.isFinite(e)||!Number.isFinite(n))throw Error(`Invalid Jezero traverse coordinate`);i=Math.min(i,e),a=Math.max(a,e),o=Math.min(o,n),s=Math.max(s,n)}if(!Number.isFinite(i))throw Error(`Empty Jezero traverse`);return{west:i-t-r,east:a-t+r,south:o-n-r,north:s-n+r}}function $l(e,t,n,r,i=200){let a=Math.min(e.west+t-r.eastMin,r.eastMin+(r.columns-1)*r.step-(e.east+t),r.northMax-(e.north+n),e.south+n-(r.northMax-(r.rows-1)*r.step));if(a<i)throw Error(`Jezero traverse buffer exceeds measured regional terrain coverage`);return a}var eu={source:`https://pds-geosciences.wustl.edu/m2020/urn-nasa-pds-mars2020_sample_depot_three_forks/miscellaneous/sample_metadata/sample_tube_locations.csv`,sha256:`089015bb25bc61415cfa69aea7160ddb7f1b5149446dd50dd84332c7660c5d59`,note:`Rover positions at tube drop, not surveyed tube centers. Tubes use these approximate positions and documented post-drop azimuths; small rover-to-tube offsets are not resolved.`,tubes:[{id:`M2020-00337-08`,name:`Malay`,sol:653,site:32,drive:148,latitude:18.45262651,longitude:77.40775601,azimuth:325},{id:`M2020-00579-17`,name:`Mageik`,sol:655,site:32,drive:250,latitude:18.4525234,longitude:77.40784692,azimuth:144},{id:`M2020-00639-21`,name:`Crosswind Lake`,sol:661,site:32,drive:378,latitude:18.45267034,longitude:77.408056,azimuth:117},{id:`M2020-00164-02`,name:`Roubion`,sol:666,site:32,drive:482,latitude:18.45276569,longitude:77.40807823,azimuth:221},{id:`M2020-00271-06`,name:`Coulettes`,sol:668,site:32,drive:580,latitude:18.45272365,longitude:77.4082,azimuth:82},{id:`M2020-00190-03`,name:`Montdenier`,sol:672,site:32,drive:672,latitude:18.45281322,longitude:77.40824352,azimuth:173},{id:`M2020-00516-15`,name:`Bearwallow`,sol:675,site:32,drive:774,latitude:18.45272753,longitude:77.40833585,azimuth:146},{id:`M2020-00495-12`,name:`Skyland`,sol:680,site:32,drive:896,latitude:18.45300487,longitude:77.4085047,azimuth:233},{id:`M2020-00374-10`,name:`Atsah`,sol:682,site:32,drive:1038,latitude:18.45306554,longitude:77.40860064,azimuth:46},{id:`M2020-00586-18`,name:`Amalik Witness`,sol:690,site:32,drive:1184,latitude:18.45337179,longitude:77.40844668,azimuth:206}]};function tu(e=0,t=0){let n=3396190*Math.PI/180;return eu.tubes.map(r=>{let i=(r.longitude-77.405)*n*Math.cos(18.461*Math.PI/180),a=(r.latitude-18.461)*n;return{...r,east:i,north:a,x:i-e,z:t-a,heading:Math.PI-r.azimuth*Math.PI/180}})}var nu={version:1,description:`Mission photographs or explicitly labeled regional references. Reviewed rectangular crops remove mosaic gaps and distracting hardware; original files and source links are retained. Provenance: docs/reference/mars-photo-audit-2026-11-20/provenance.json and docs/reference/mars-scene-rebuild-2026-11-20/photo-provenance.json. Additional source replacements: docs/reference/gale-photo-navigation-2026-11-20/photo-provenance.json.`,sites:JSON.parse(`{"jezero":{"delta-front":{"image":"./assets/tour/reviewed/jezero-delta-front.png","source":"https://www.jpl.nasa.gov/images/pia24802-perseverance-captures-image-of-kodiak/","download":"https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA24802.jpg","caption":"18 April 2021 · Kodiak. Enhanced-color Mastcam-Z image; cropped to the butte. Regional reference from an earlier viewpoint.","alt":"Kodiak’s layered rock faces and talus slopes, cropped from the NASA Mastcam-Z image","credit":"NASA/JPL-Caltech/ASU/MSSS","width":2550,"height":1000,"detail":"Look at the horizontal layers in Kodiak’s cliff face.","sha256":"25157940356762609c727cb354a7d7a40f98c9b754f63e5a3bc152d441d10147"},"seitah":{"image":"../jezero/assets/seitah-sols181-182.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/8","download":null,"caption":"Sols 181–182 · Seitah. Enhanced-color panorama.","alt":"Low exposed rocks among dark sandy pockets","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":900,"sha256":"6e993d5d85520f30c39179d5032a37e9a23234adfc6527746c21b79cda07527a"},"depot":{"image":"../jezero/assets/depot.jpg","source":"https://science.nasa.gov/photojournal/perseverances-three-forks-sample-depot-selfie/","download":null,"caption":"Sol 684 · Three Forks selfie, near the sol-693 tour stop.","alt":"Perseverance beside a sample tube on the depot floor","credit":"NASA/JPL-Caltech/MSSS","width":1800,"height":1683,"view":[0.13,0.26,0.85,0.51],"detail":"A selfie gives the rover and the sample-depot ground a human sense of scale.","sha256":"a07a63779f07fa862fc78a30e89f984ba3f43bf453e1c3fd55b2fd32b646cc22"},"landing":{"image":"../jezero/assets/landing-sols3-11.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/1","download":null,"caption":"Sols 3–11 · Landing plain. Enhanced-color panorama.","alt":"Rocky landing plain and distant ridges","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":900,"sha256":"5caea9e188743d48b519a51fa256fcaf0d4a34e15c865737a157a7447db45b38"},"bright-angel":{"image":"./assets/tour/reviewed/jezero-bright-angel.png","source":"https://science.nasa.gov/resource/perseverance-captures-bright-angel-in-360-degrees/","download":"https://science.nasa.gov/wp-content/uploads/2024/07/pia26369-perseverance-views-a-360-degree-4000wide.jpg","caption":"Sol 1178 · Bright Angel, near the sol-1182 stop. Enhanced color. Cropped detail.","alt":"Light-toned fractured bedrock beside darker sand","credit":"NASA/JPL-Caltech/ASU/MSSS","width":1440,"height":616,"detail":"Look at the cracked pale bedrock beside the darker sandy ground.","sha256":"f69cd5c4f2bb2baf265c9ee0251d27e25614460f0d38fc23b5225979c19ca407"},"margin":{"image":"./assets/tour/reviewed/jezero-margin.png","source":"https://science.nasa.gov/photojournal/perseverances-view-of-turquoise-bay/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia26/pia26815/PIA26815.jpg?w=3200&fit=clip","caption":"Sols 933–944 · Turquoise Bay in the Margin Unit, near the sol-950 stop. Natural color. Cropped detail.","alt":"Broad pale rock exposures and low margin ridges","credit":"NASA/JPL-Caltech/MSSS","width":1280,"height":453,"detail":"Look at the pale rock shelves and the sand between them.","sha256":"c6b6c0d28f50cf74937ac93a6e29082beba60a108cfa1c50547f7d8daa73d31a"},"neretva":{"image":"../jezero/assets/neretva-sol1155.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/38","download":null,"caption":"Sol 1155 · Neretva Vallis, near the sol-1156 stop. Enhanced color.","alt":"Sandy channel floor, scattered rocks and a layered valley wall","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":900,"sha256":"bc3481e6b1d980968028d6599b70780af40d42463679a368fa24320fbd3b0f11"},"upper-fan":{"image":"../jezero/assets/belva-sol789.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/25","download":null,"caption":"Sols 789–791 · Belva overlook, near the sol-793 stop. Enhanced color.","alt":"Fractured pale rock overlooking Belva’s sandy bowl and layered rim","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":700,"sha256":"f02da1dda7273f538525bfed71366af05a1f64c4ef0f978095a08bb3d2ee215f"},"beyond-rim":{"image":"../jezero/assets/falbreen-sol1516.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/45","download":null,"caption":"Sol 1516 · Falbreen in the western-rim region; regional reference for the sol-1502 stop. Enhanced color.","alt":"Pale cracked pavement, dark sand and low ridges","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":900,"sha256":"d04f1ddf3776c493fb5a3bd06b3a2d02ac0e980bb7a2d42fd5342d3fcf8d4f4d"},"frontier":{"image":"./assets/tour/jezero-frontier.jpg","source":"https://mars.nasa.gov/mars2020/multimedia/raw-images/NLF_1980_0842717010_566ECM_N0910970NCAM03980_07_195J","download":"https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01980/ids/edr/browse/ncam/NLF_1980_0842717010_566ECM_N0910970NCAM03980_07_195J01_1200.jpg","caption":"Sol 1980 · Navcam at rover reference 91 / 970, the pinned endpoint.","alt":"Perseverance’s rocky western frontier seen by its navigation camera","credit":"NASA/JPL-Caltech","width":1200,"height":902,"sha256":"4aa5ba0dad2e933fd9f62dca46881a895c81bde4e53f33537a13287b82bc8357"},"rim":{"image":"../jezero/assets/rim-sols1356-1358.jpg","source":"https://maps.planet.fu-berlin.de/jezero/360/41","download":null,"caption":"Sols 1356–1358 · Jezero rim, near the sol-1354 stop. Enhanced color.","alt":"Wheel tracks descend across the broad crater-rim view","credit":"NASA/JPL-Caltech/ASU/MSSS · Panorama via FU Berlin","width":1600,"height":900,"sha256":"5e397ec8f4bffd7cc1bf11587355a962e1041ebd6a49eb7166c5ee5fe09d045c"}},"gale":{"landing":{"image":"./assets/tour/reviewed/gale-bradbury-mount-sharp.jpg","source":"https://science.nasa.gov/resource/the-promised-land/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/6/36174_pia16068_Grotzinger-5promisedland.jpg?w=3294&fit=clip","caption":"8–9 August 2012 · View from Bradbury Landing toward lower Mount Sharp. NASA’s cropped Mastcam mosaic, white-balanced to Earth-like lighting; original 2 km scale retained.","alt":"Distant layered foothills of Mount Sharp beyond dark dunes, viewed from Curiosity’s landing site","credit":"NASA/JPL-Caltech/MSSS","width":3294,"height":1567,"detail":"Look beyond the dark dunes to Mount Sharp’s distant layers. The 2 km scale shows how far this landscape extends.","sha256":"09e7552c125d778226433cdab7922d8c0a16a85452ba1b6bc76db7d7a5a9a2ef"},"plains":{"image":"./assets/tour/reviewed/gale-traverse-cooperstown.jpg","source":"https://www.jpl.nasa.gov/images/pia17580-curiositys-view-of-cooperstown-outcrop-on-route-to-mount-sharp/","download":"https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA17580.jpg","caption":"Sol 437 · 28 October 2013 · Rocky plains approaching Cooperstown. Monochrome, two-frame Navcam view. Earlier regional reference for this sol-504 stop.","alt":"Open rocky plain with the low Cooperstown outcrop below the distant crater horizon","credit":"NASA/JPL-Caltech","width":1323,"height":456,"detail":"Compare the scattered rocks and shallow outcrop with the open plain. This earlier view shows the same traverse region, rather than this stop’s exact viewpoint.","sha256":"31cd97100efbb22cd200d04a7f6acf0d34d22c6839eea3520327fd9000242007"},"yellowknife":{"image":"./assets/tour/reviewed/gale-yellowknife.png","source":"https://science.nasa.gov/resource/sol-0125-left-navigation-camera-cylindrical-perspective-2/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/resources/deepzooms/22937_N_L000_0125_EDR005CYPTU_1398_DRIVEM2.png?w=3200&fit=clip","caption":"Sol 125 · Navcam at rover reference 5 / 1398. Monochrome panorama. Cropped detail.","alt":"Flat fractured rock and scattered stones at Yellowknife Bay","credit":"NASA/JPL-Caltech","width":1152,"height":524,"detail":"Look at the flat rock broken into slabs by dark cracks.","sha256":"14c677ddc2fcf5ae474420a14e13905a588e8fa14f6ee2531b8245065375774a"},"foothills":{"image":"./assets/tour/reviewed/gale-foothills.png","source":"https://science.nasa.gov/resource/sol-0997-left-navigation-camera-cylindrical-perspective/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/resources/deepzooms/2/23667_N_L000_0997_EDR048CYPTS_1570_DRIVEM1.png?w=3200&fit=clip","caption":"Sol 997 · Navcam at rover reference 48 / 1570. Monochrome panorama. Cropped detail.","alt":"Layered foothills and rocky foreground","credit":"NASA/JPL-Caltech","width":1088,"height":488,"detail":"Look at the large broken slabs scattered across the slope.","sha256":"53ffc8b9c0279ab646c0052a8bbf3cf5ae2a12c8f9260873ec3bea2ebcd4965c"},"transition":{"image":"./assets/tour/reviewed/gale-transition.png","source":"https://science.nasa.gov/blog/sols-3076-3077-dancing-around-mont-mercou/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/news_items/main_images/8902_blog-2021-03-31-768.jpg?w=768&h=575&fit=clip","caption":"Sol 3074 · Mont Mercou in daylight, near the sol-3072 stop. Left Navcam.","alt":"Layered Mont Mercou cliff with fractures and ledges visible in daylight","credit":"NASA/JPL-Caltech","width":768,"height":575,"sha256":"3d24a2401c53aad3b28e7f38d5ac20541efe152c84c5b58c157d3cacefef7e16","detail":"Look at the cliff’s thin beds and larger vertical fractures."},"glen":{"image":"./assets/tour/gale-glen.jpg","source":"https://mars.nasa.gov/raw_images/616187/","download":"https://mars.jpl.nasa.gov/msl-raw-images/msss/02481/mcam/2481ML0131720110904583C00_DXXX.jpg","caption":"Sol 2481 · Mastcam view at Glen Etive. Raw camera color.","alt":"Bedrock at Curiosity’s clay-country workspace","credit":"NASA/JPL-Caltech/MSSS","width":1152,"height":432,"sha256":"87f0b24c19a8cb5c1dc63dc313e00b180c1e19567ed39b02dd2ad2b529464a19"},"murray":{"image":"./assets/tour/reviewed/gale-murray-buttes.jpg","source":"https://www.jpl.nasa.gov/images/pia21042-farewell-to-murray-buttes-image-2/","download":"https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA21042.jpg","caption":"Sol 1454 · Murray Buttes. Mastcam regional reference from an earlier viewpoint than the sol-1500 stop.","alt":"Angular layered outcrops above loose sandy talus at Murray Buttes","credit":"NASA/JPL-Caltech/MSSS","width":1344,"height":1200,"detail":"Follow the broken ledges above the sandy slopes.","sha256":"7d89f205e485130988fe11dc266fc864e59c557f3e7c664fd90c77d208c1b905"},"ridge":{"image":"./assets/tour/reviewed/gale-ridge.png","source":"https://science.nasa.gov/resource/sol-1999-left-navigation-camera-cylindrical-perspective/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/resources/deepzooms/2/4/24413_N_L000_1999XILT068CYPTSB2626_DRIVEM1.png?w=3200&fit=clip","caption":"Sols 1999–2000 · Navcam at rover reference 68 / 2626. Monochrome panorama. Cropped detail.","alt":"Low ridge, fractured rock and distant mountain slopes","credit":"NASA/JPL-Caltech","width":1120,"height":480,"detail":"Look at the pale fractured rock exposed through darker soil.","sha256":"e83569085ba2f160ed0e7fde9a90bdfc2f5ce6e1f02ecd2e115774788bfc7bd9"},"higher":{"image":"./assets/tour/gale-higher.jpg","source":"https://science.nasa.gov/blog/sols-4502-4504-sneaking-past-devils-gate/","download":"https://assets.science.nasa.gov/content/dam/science/missions/msl/2025/curiosity-rover-updates/april/https___mars.nasa.gov_msl-raw-images_proj_msl_redops_ods_surface_sol_04500_opgs_edr_ncam_NLB_796989817EDR_S1142472NCAM00286M_.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg","caption":"Sol 4500 · Devil’s Gate ridge and the base of Texoli butte. Monochrome Navcam.","alt":"Small ridgeline on the right and Texoli butte on the left","detail":"Look for the layered slope on the left and the broken ridge on the right.","credit":"NASA/JPL-Caltech","width":1024,"height":512,"sha256":"419d40dbcbcd2a8a5073d9044bcdb4bc6c7c450513c2f8fef9928f889fb98870"},"frontier":{"image":"./assets/tour/gale-frontier.jpg","source":"https://science.nasa.gov/blog/curiosity-blog-sols-5016-5021-fantastic-minerals-and-how-to-detect-them/","download":"https://assets.science.nasa.gov/content/dam/science/missions/msl/2026/curiosity-rover-updates/september/https___mars.nasa.gov_msl-raw-images_msss_05016_mhli_5016MH0001930001804259R00_DXXX.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg","caption":"Sol 5016 · Salar de Vacas bedrock close-up, near the sol-5021 endpoint. MAHLI focus merge.","alt":"Small disc-shaped mineral features in brushed bedrock","detail":"Photo: disc-shaped features just 3–4 mm across. Zoom in to inspect them.","credit":"NASA/JPL-Caltech/MSSS","width":1280,"height":956,"sha256":"43aff4eb4056165f6fb9054c660328d56e4e515fecc36b187a0506c53f23a648"},"gediz":{"image":"./assets/tour/reviewed/gale-gediz-ridge.png","source":"https://science.nasa.gov/resource/curiosity-views-gediz-vallis-ridge/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/resources/deepzooms/2/7/27696_PIA26019-DeepZoom.jpg?w=5000&fit=clip","caption":"19 August 2023 · Gediz Vallis Ridge. Cropped Mastcam panorama; Earth-like color balance. Regional reference from an earlier viewpoint than the sol-3972 stop.","alt":"Jumbled dark blocks on the low crest and apron of Gediz Vallis Ridge","credit":"NASA/JPL-Caltech/MSSS","width":1030,"height":735,"detail":"Compare the loose dark blocks with the finer material between them.","sha256":"8f9514d383b73064877a91ef5c100a1d7bd3db244d713ab16f5b73fadddc74ec"},"sulfates":{"image":"./assets/tour/reviewed/gale-sulfates.png","source":"https://science.nasa.gov/resource/sol-3506-right-navigation-camera-cylindrical-projection/","download":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/resources/deepzooms/2/6/26815_N_R000_3506_EDR095CYLASB3020_AUTOLM1.png?w=3200&fit=clip","caption":"Sol 3506 · Navcam at rover reference 95 / 3020. Monochrome panorama. Cropped detail.","alt":"Sandy pockets and broken rock on sulfate-bearing slopes","credit":"NASA/JPL-Caltech","width":1216,"height":562,"detail":"Look at the eroded ridgeline and the broken rock below it.","sha256":"1ef11fbfff0aba626d628e9c48f6ce3c8c555b249eb880ecb8b3601c486a0a0a"}}}`)},ru={landing:{observe:`Compare the scattered foreground stones with the low, distant delta.`,viewWidth:2600},seitah:{observe:`Look for low rocky ridges separated by darker pockets of sand.`,viewWidth:100},"delta-front":{observe:`Follow the nearly horizontal beds across Kodiak’s exposed face.`},depot:{observe:`Find the sample tube in its wider surroundings. Photo shows a historical rover selfie.`},"upper-fan":{observe:`Look across the sandy bowl toward the layered rim of Belva.`},margin:{observe:`Compare pale rock shelves with the dark sand filling the gaps.`},neretva:{observe:`Follow the sandy channel between its raised, rocky sides.`},"bright-angel":{observe:`Look closely at the fractures dividing the pale bedrock.`},rim:{observe:`Trace the long slope down from the rim toward Jezero’s floor.`},"witch-hazel":{observe:`Look back up at the pale rock bands exposed on the outer rim.`},"beyond-rim":{observe:`Compare the fractured pavement with the dark sand pockets.`},frontier:{observe:`Look down at the wheel impressions threading between loose stones.`}};function iu(e){for(let t of e){let e=ru[t.id];if(!e)throw Error(`Missing photo study: ${t.id}`);t.observe=e.observe,e.viewWidth&&(t.viewWidth=e.viewWidth),t.cameraEye??={x:t.x,z:t.z,height:2.1}}e.find(e=>e.id===`landing`).focus.name=`Landing plain · distant delta`}function au(e,t){return Vl(e,t)||(Il(e,t)>.2?Ll(e,t):e<-9800?`Western exploration frontier`:e<-7800?`Beyond the rim`:e<-6100?`Jezero western rim`:Math.hypot((e+5688)/650,(t-2081)/480)<1?`Bright Angel`:e<-3900&&t>1100?`Neretva Vallis`:e<-2500?`Lake margin`:Math.hypot((e+1540)/650,(t-1430)/600)<1?`Belva · upper fan`:e<-500?`Western delta`:Math.hypot((e-196)/450,(t+1260)/420)<1?`Kodiak`:Math.hypot((e-2050)/900,(t+1700)/650)<1?`Séítah`:`Jezero crater floor`)}function ou(e,t,n,r){let i=new Float32Array(e*t),a=new Uint8ClampedArray(e*t*4),o=(n.east-n.west)/e,s=(n.north-n.south)/t,c=1/0,l=-1/0;for(let a=0;a<t;a++)for(let t=0;t<e;t++){let u=r(n.west+(t+.5)*o,-n.north+(a+.5)*s);i[a*e+t]=u,c=Math.min(c,u),l=Math.max(l,u)}let u=(n,r)=>i[Math.max(0,Math.min(t-1,r))*e+Math.max(0,Math.min(e-1,n))];for(let n=0;n<t;n++)for(let t=0;t<e;t++){let r=u(t,n),i=(u(t+1,n)-u(t-1,n))/(2*o),d=(u(t,n+1)-u(t,n-1))/(2*s),f=Math.max(.25,Math.min(1.2,(.8+i*.45+d*.4)/Math.hypot(i,1,d))),p=(.7+(r-c)/Math.max(1,l-c)*.3)*f;a.set([145*p,126*p,104*p,255],(n*e+t)*4)}return a}var su=3.71,cu=`astra.prototype.jezero.apollo.v1`;async function lu(){let e=await fetch(new URL(`../../tools/prototypes/jezero/assets/guided-tour.json`,document.baseURI));if(!e.ok)throw Error(`Jezero sites could not load.`);let t=await e.json(),n=3.2,r=t.checkpoints[0],i=await Nl(),a=r.x/n-1500,o=1500-r.y/n,s=i.height(a,o),c=(e,t)=>({x:e-a,z:o-t}),l=[{id:`kodiak`,name:`Kodiak`,...c(196,-1260)},{id:`delta`,name:`Western delta`,...c(-600,100)},{id:`seitah`,name:`Séítah ridges`,...c(2050,-1640)}],u={margin:new URL(``+new URL(`jezero-margin-B3mCj_JS.png`,import.meta.url).href,``+import.meta.url).href,neretva:new URL(``+new URL(`neretva-sol1155-Dhn396K8.jpg`,import.meta.url).href,``+import.meta.url).href,"bright-angel":new URL(``+new URL(`jezero-bright-angel-BgqaLYL7.png`,import.meta.url).href,``+import.meta.url).href,"upper-fan":new URL(``+new URL(`belva-sol789-BLM5zJvF.jpg`,import.meta.url).href,``+import.meta.url).href,depot:new URL(``+new URL(`depot-Bchfmvvq.jpg`,import.meta.url).href,``+import.meta.url).href,"delta-front":new URL(``+new URL(`jezero-delta-front-Cpv8VmBw.png`,import.meta.url).href,``+import.meta.url).href,landing:new URL(``+new URL(`landing-sols3-11-CZ8cYJDC.jpg`,import.meta.url).href,``+import.meta.url).href,seitah:new URL(``+new URL(`seitah-sols181-182-DhuJBfz0.jpg`,import.meta.url).href,``+import.meta.url).href},d=t.checkpoints.slice(0,8).map(e=>{let t=nu.sites.jezero[e.id];return{id:e.id,name:e.name,x:(e.x-r.x)/n,z:(e.y-r.y)/n,radius:7,fact:e.fact,source:e.source,imageSource:t.source,photo:u[e.id],alt:t.alt,credit:t.credit,caption:t.caption}}),f=Ql(i.segments,a,o,i.traverse.bufferMetres);$l(f,a,o,i.foundation),d[0].focus=l[0],d[0].location=`Landing plain`,d[1].focus=l[2],d[1].location=`Séítah`,d[1].focus={x:d[1].x-34,z:d[1].z-30,name:`Séítah · broken outcrops`,heightOffset:0},d[2].focus={...l[0],heightOffset:-14},d[2].viewWidth=410,d[2].location=`Kodiak overlook`,d[2].fact=`Kodiak is an isolated remnant of Jezero’s ancient river delta. Its exposed beds record sediment building into a lake, preserving clues to changing water levels and river flow.`,d[2].source=`https://www.jpl.nasa.gov/images/pia24802-perseverance-captures-image-of-kodiak/`;let p=tu(a,o),m=p.find(e=>e.name===`Atsah`);d[3].location=`Three Forks`,d[3].focus={...m,name:`Three Forks · sample depot`,heightOffset:.3},d[3].cameraEye={x:m.x+1.4,z:m.z-4.5,height:1.8},d[3].viewWidth=12,d[3].fact=`Ten sealed sample tubes form a backup collection on this quiet patch of crater floor. Perseverance placed them between December 2022 and January 2023. The selfie shows Atsah in front of the rover, with Kodiak beyond.`,d[4].name=`Belva · upper fan`,d[4].location=`Echo Creek · Belva`,d[4].focus={...c(-1540,1430),name:`Belva crater`,heightOffset:8},d[4].viewWidth=1050,d[4].fact=`An impact cut Belva into the ancient river delta. Across its sandy floor, exposed layers reveal deposits that formed before the crater. Compare the dark bowl with the pale, fractured rock at the overlook.`,d[4].source=`https://science.nasa.gov/resource/perseverance-takes-in-view-at-belva-crater/`,d[5].name=`Turquoise Bay · lake margin`,d[5].location=`Turquoise Bay`,d[5].focus={...c(-3370,1880),name:`Turquoise Bay`,heightOffset:0},d[5].viewWidth=280,d[5].fact=`Pale exposed rock and pockets of sand mark the Margin Unit. Perseverance investigated this terrain along the inside of Jezero’s rim to learn how the crater’s ancient environments changed.`,d[5].source=`https://science.nasa.gov/photojournal/perseverances-view-of-turquoise-bay/`,d[6].name=`Neretva Vallis`,d[6].location=`Neretva Vallis`,d[6].focus={...c(-5480,1850),name:`Neretva Vallis · channel`,heightOffset:4},d[6].viewWidth=650,d[6].fact=`This ancient river channel once carried water into Jezero. Perseverance used its sandy floor to bypass difficult boulders on the approach to Bright Angel. Look for the channel walls above the rippled sand.`,d[7].name=`Bright Angel`,d[7].location=`Bright Angel`,d[7].focus={...c(-5688,2081),name:`Bright Angel`,heightOffset:.3},d[7].viewWidth=115,d[7].fact=`Light-toned fractured bedrock stands out against the dark sand beside Neretva Vallis. These outcrops offered a new geological contrast after the rover’s journey through the Margin Unit.`,d[7].source=`https://science.nasa.gov/resource/perseverance-captures-bright-angel-in-360-degrees/`;let h=c(Pl.east,Pl.north),g=nu.sites.jezero.rim;d.push({id:`rim`,name:`Lookout Hill · crater rim`,...h,radius:7,location:`Lookout Hill`,fact:`Perseverance reached Lookout Hill on December 10, 2024, after climbing about 500 metres from Jezero’s floor. Looking back reveals the long slope below the rim. Beyond the crest, ancient rocks excavated by the impact offer a different chapter of Mars’s history.`,source:`https://www.jpl.nasa.gov/news/nasas-perseverance-rover-reaches-top-of-jezero-crater-rim/`,photo:new URL(``+new URL(`rim-sols1356-1358-DDUZ6Erm.jpg`,import.meta.url).href,``+import.meta.url).href,imageSource:g.source,alt:g.alt,credit:g.credit,caption:`Sols 1356–1358 · Lookout Hill. Enhanced-color panorama, looking back down the ascent.`,cameraEye:{...h,height:2.1},focus:{...c(Pl.east+1e3,Pl.north+80),name:`Jezero · view down the ascent`},viewWidth:1540}),d.push(...Wl(i.traverse,a,o)),iu(d);let _=(e,t)=>i.height(a+e,o-t)-s,b=jezeroPerf.makeContactGround(_),x=(e,t,n=0)=>e>=f.west+n&&e<=f.east-n&&t>=-f.north+n&&t<=-f.south-n,S=i.segments.map(e=>({sol:e.sol,points:e.points.map(([e,t])=>c(e,t))})),C=S.map(e=>e.points),w=S.filter(e=>e.sol>=652&&e.sol<=690).map(e=>e.points),{solids:T,scenery:E,rocks:D}=await Zl({ground:b,bounds:f,stops:d,originEast:a,originNorth:o});return{depot:p,depotTracks:w,historicalTracks:S,stops:d,bounds:f,ground:b,inside:x,solids:T,scenery:E,rocks:D,grid:4,paths:C,landmarks:l,topography:i,originEast:a,originNorth:o,baseY:s,toLocal:c}}var uu={radius:.02135,mass:.04593},du={name:`Pitching wedge`,loft:44,speed:32,roll:.42,kind:`chip`},fu={density:1.225,dragCoefficient:.25},pu=fu.density*fu.dragCoefficient*Math.PI*uu.radius**2/(2*uu.mass),mu=1.62;function hu(e,t,n,r=0){if(r){let n=Math.exp(-r*Math.hypot(e.vx,e.vy,e.vz)*t);e.vx*=n,e.vy*=n,e.vz*=n}e.x+=e.vx*t,e.z+=e.vz*t,e.y+=e.vy*t-.5*n*t*t,e.vy-=n*t}function gu(e,t,n=0,r=du){let i=r.loft*Math.PI/180,a=r.speed*Math.sqrt(e),o={x:0,y:0,z:0,vx:0,vy:a*Math.sin(i),vz:a*Math.cos(i)};for(let e=0;e<21600;e++)if(hu(o,1/120,t,n),o.y<=0)return o.z;throw Error(`Golf calibration exceeded flight duration`)}function _u(e){if(e>gu(1,9.81,pu))throw Error(`Earth hole exceeds wedge carry`);let t=0,n=1;for(let r=0;r<32;r++){let r=(t+n)/2;gu(r,9.81,pu)<e?t=r:n=r}let r=(t+n)/2;return{power:r,moonLength:gu(r,mu)}}var vu=`moon-crater-field-trial-v1`,yu={x:420,z:530},bu={x:450,z:70},xu={id:vu,name:`Crater field`,number:4,tee:yu,target:bu,greenRadius:18,puttingRadius:12,bounds:{west:340,east:540,south:0,north:580},craters:[{...yu,r:10,depth:.8,rim:.22,role:`tee`},{x:380,z:434,r:8,depth:1.1,rim:.28,role:`scenery`},{x:468,z:374,r:17,depth:2.4,rim:.5,role:`scenery`},{x:391,z:293,r:12,depth:1.6,rim:.35,role:`scenery`},{x:478,z:228,r:22,depth:3.1,rim:.65,role:`scenery`},{x:401,z:142,r:14,depth:2,rim:.4,role:`scenery`},{x:503,z:59,r:9,depth:1.2,rim:.3,role:`scenery`},{...bu,r:18,depth:1.4,rim:.4,role:`target`}]},Su={x:450,z:530},Cu={x:420,z:200},wu={x:420,z:650},Tu={x:470,z:50};({...xu}),{...Su},{...Cu},{...wu},{...Tu},[{moonId:`crater-pitch-v2`,earthId:`crater-garden-v2`,moonName:`Crater`,earthName:`Crater Garden`,yards:72,cup:{x:420,z:420},dx:0,oldLength:110},{moonId:`rim-pitch-v2`,earthId:`garden-pitch-v2`,moonName:`Rim Pitch`,earthName:`Garden Pitch`,yards:46,cup:{x:408,z:432},dx:12,oldLength:55},{moonId:`ridge-pitch-v2`,earthId:`ridge-garden-v2`,moonName:`Ridge Approach`,earthName:`Ridge Garden`,yards:60,cup:{x:432,z:438},dx:-12,oldLength:80}].map(e=>{let t=e.yards*.9144,{power:n,moonLength:r}=_u(t),i=e.dx/e.oldLength,a=Math.sqrt(1-i*i),o={x:(e.cup.x-420)*.65,z:(530-e.cup.z)*.65};return e.dx===0&&(o.z=t),{...e,length:r,earthLength:t,referencePower:n,tee:{x:e.cup.x+i*r,z:e.cup.z+a*r},earthCup:o,earthTee:{x:o.x+i*t,z:o.z-a*t}}}).flatMap(e=>[e.moonId.replace(/-v2$/,`-v1`),e.earthId.replace(/-v2$/,`-v1`)]);var Eu={length:110,width:12,greenRadius:9,earthScale:.65};530-Eu.length,Eu.width,Eu.greenRadius,[...[{x:-23,z:45,r:10,depth:2,kind:`crater`},{x:28,z:75,r:13,depth:2.6,kind:`crater`},{x:-23,z:99,r:9,depth:1.5,kind:`crater`},{x:20,z:33,r:7,depth:.65,kind:`bunker`},{x:17,z:101,r:6,depth:.55,kind:`bunker`}].map(e=>({...e,x:420+e.x,z:530-e.z,hole:1}))],Array.from({length:65},(e,t)=>({x:-810+t*197%1320,z:100+t*337%2170,r:5+t*7%16,depth:.12+t%5*.08})),-Math.PI/2;var Du=[{letter:`M`,x:-325,z:170},{letter:`O`,x:-430,z:255},{letter:`O`,x:-565,z:95},{letter:`N`,x:-400,z:-70}],Ou=1400,ku=()=>Au?3e3:Ou,Au=!1,ju=e=>!0,Mu=(e,t,n)=>Math.min(n,Math.max(t,e)),Nu=[{name:`Little West`,x:77,z:-6,r:15,d:3},{name:`Double Crater`,x:-8,z:16,r:6,d:1.2},{name:`Double Crater`,x:-11,z:24,r:4,d:.8},{name:``,x:130,z:-145,r:40,d:8},{name:``,x:-170,z:-110,r:60,d:11},{name:``,x:260,z:170,r:75,d:15},{name:``,x:-390,z:290,r:110,d:19},{name:``,x:520,z:-230,r:90,d:12},{name:``,x:140,z:590,r:100,d:20},{name:``,x:-510,z:-570,r:140,d:21}],Pu=[{id:`drive`,name:`Long-drive range`,x:-900,z:800,description:`Launch a drive, then play your ball where it lands.`},{id:`chip`,name:`Wedge challenge`,x:105,z:95,description:`Approach the flag, then putt from your resting ball.`}];function Fu(e,t){let n=Math.hypot(e,t),r=Mu((n-17)/30,0,1),i=(2.1*Math.sin(e*.012)*Math.sin(-t*.009)+.65*Math.sin(e*.06-t*.025))*r;for(let n of Nu){let r=Math.hypot(e-n.x,t-n.z)/n.r;r<1?i-=n.d*(1-r*r)**2:r<1.2&&(i+=Math.sin((r-1)*Math.PI*5)*Math.min(.8,n.r*.025))}return i+Mu((n-1450)/450,0,1)*(12+15*Math.sin(e*.004+1)*Math.cos(t*.005))}var Iu=[[120,-210],[520,-210],[780,-360],[780,-760],[520,-980],[280,-790],[50,-1060],[-260,-1020],[-600,-790],[-600,-360],[-300,-300],[-80,-450]],Lu=Array.from({length:241},(e,t)=>{let n=t/20,r=Math.floor(n)%Iu.length,i=n-Math.floor(n),a=e=>Iu[(e+Iu.length)%Iu.length],o=a(r-1),s=a(r),c=a(r+1),l=a(r+2),u=e=>.5*(2*s[e]+(-o[e]+c[e])*i+(2*o[e]-5*s[e]+4*c[e]-l[e])*i*i+(-o[e]+3*s[e]-3*c[e]+l[e])*i*i*i),d=u(0),f=u(1);return{x:d,z:f,y:Fu(d,f)}}),Ru=[{index:50,height:4,length:60,name:`East ridge jump`},{index:170,height:2.5,length:50,name:`West return jump`}].map(e=>{let t=Lu[e.index],n=Lu[e.index-1],r=Lu[e.index+1],i=Math.hypot(r.x-n.x,r.z-n.z);return{...e,x:t.x,z:t.z,dx:(r.x-n.x)/i,dz:(r.z-n.z)/i}}),zu=new Map;for(let e=0;e<240;e++){let t=Lu[e],n=Lu[e+1];for(let r=Math.floor((Math.min(t.x,n.x)-100)/80);r<=Math.floor((Math.max(t.x,n.x)+100)/80);r++)for(let i=Math.floor((Math.min(t.z,n.z)-100)/80);i<=Math.floor((Math.max(t.z,n.z)+100)/80);i++){let t=r+`,`+i,n=zu.get(t)||[];n.push(e),zu.set(t,n)}}function Bu(e,t){let n=1/0,r=0,i=-1;for(let a of zu.get(Math.floor(e/80)+`,`+Math.floor(t/80))||[]){let o=Lu[a],s=Lu[a+1],c=s.x-o.x,l=s.z-o.z,u=Mu(((e-o.x)*c+(t-o.z)*l)/(c*c+l*l),0,1),d=Math.hypot(e-o.x-u*c,t-o.z-u*l);d<n&&(n=d,r=o.y+(s.y-o.y)*u,i=a)}return{distance:n,y:r,index:i}}function Vu(e,t){let n=0;for(let r of Ru){let i=(e-r.x)*r.dx+(t-r.z)*r.dz;Math.abs((e-r.x)*r.dz-(t-r.z)*r.dx)>24||i<-r.length||i>14||(n=Math.max(n,r.height*(i<=0?(i+r.length)/r.length:1-i/14)))}return n}var Hu=(e,t)=>{let n=17;for(let r of Ru){let i=(e-r.x)*r.dx+(t-r.z)*r.dz,a=Math.abs((e-r.x)*r.dz-(t-r.z)*r.dx);i>-30&&i<230&&a<100&&(n=Math.max(n,17+40*Math.max(0,1-Math.abs(i-95)/135)))}return n};function Uu(e,t){let n=Fu(e,t),r=Bu(e,t);return r.distance<Hu(e,t)+11?n+(r.y+Vu(e,t)-n)*(1-Mu((r.distance-Hu(e,t))/11,0,1)):n}Lu[0];var Wu=Array.from({length:12},(e,t)=>{let n=(t+1)*20%240,r=Lu[n],i=Lu[(n+1)%240],a=Math.hypot(i.x-r.x,i.z-r.z);return{...r,index:n,dx:(i.x-r.x)/a,dz:(i.z-r.z)/a}}),Gu=(e,t,n,r,i,a,o=i,s=`hardware`)=>({id:e,x:t,z:n,y:Uu(t,n)+o,hx:r,hy:i,hz:a,kind:s}),Ku=[Gu(`flagpole`,0,0,.04,.96,.04),Gu(`flag-cloth`,.56,0,.56,.3,.025,1.58),Gu(`LRRR`,7,28,.4,.35,.4),Gu(`PSE`,9.5,35,.4,.35,.4)];for(let[e,t]of[[7,28],[9.5,35]])Ku.push(Gu(`antenna${e}`,e,t,.014,.45,.014,.75));for(let e=0;e<90;e++){let t=e/90*Math.PI*2;Ku.push(Gu(`boundary`+e,Math.sin(t)*Ou,Math.cos(t)*Ou,.065,.8,.065,.8,`post`))}for(let[e,t]of Wu.entries())for(let n of[-1,1]){let r=t.x+t.dz*n*23,i=t.z-t.dx*n*23;Bu(r,i).distance>Hu(r,i)+2&&Ku.push(Gu(`gate${e}:${n}`,r,i,.18,2,.18,2,`post`))}for(let e=0,t=0;t<750;e++){let n=Math.sin(e*127.1)*1550,r=Math.sin(e*311.7+13)*1550;if(Math.hypot(n,r)<30||Bu(n,r).distance<Hu(n,r)+15||Pu.some(e=>Math.hypot(e.x-n,e.z-r)<20))continue;let i=.18+Math.abs(Math.sin(e*73.9))**8*1.8;Ku.push(Gu(`rock`+t++,n,r,i,i*.65,i*.8,i*.4,`rock`))}var qu=new Map;for(let e of Ku)for(let t=Math.floor((e.x-e.hx)/40);t<=Math.floor((e.x+e.hx)/40);t++)for(let n=Math.floor((e.z-e.hz)/40);n<=Math.floor((e.z+e.hz)/40);n++){let r=t+`,`+n,i=qu.get(r)||[];i.push(e),qu.set(r,i)}function Ju(e,t,n){let r=new Set;for(let i=Math.floor((Math.min(e.x,t.x)-n)/40);i<=Math.floor((Math.max(e.x,t.x)+n)/40);i++)for(let a=Math.floor((Math.min(e.z,t.z)-n)/40);a<=Math.floor((Math.max(e.z,t.z)+n)/40);a++)for(let e of qu.get(i+`,`+a)||[])r.add(e);return[...r].filter(e=>e.id===`lander`||ju(e))}function Yu(e,t,n,r,i=[],a=Ju){let o={x:e.x-t.x,y:e.y-t.y,z:e.z-t.z},s=2,c={x:0,y:0,z:0},l;for(let u of[...a(t,e,n),...i]){if([`x`,`y`,`z`].every(e=>Math.abs(t[e]-u[e])<u[`h`+e]+n-1e-7)){let i=1/0,a=`x`,o=1;for(let e of[`x`,`y`,`z`]){let r=u[`h`+e]+n-Math.abs(t[e]-u[e]);r<i&&(i=r,a=e,o=t[e]>=u[e]?1:-1)}e[a]=u[a]+o*(u[`h`+a]+n+.002);let s=`v`+a;return e[s]*o<0&&(e[s]*=-r),u.id}let i=-1/0,a=1/0,d={x:0,y:0,z:0},f=!0;for(let e of[`x`,`y`,`z`]){let r=u[`h`+e]+n,s=u[e]-r,c=u[e]+r,l=o[e];if(Math.abs(l)<1e-10){if(t[e]<s||t[e]>c){f=!1;break}continue}let p=(s-t[e])/l,m=(c-t[e])/l,h=Math.min(p,m);if(h>i&&(i=h,d={x:0,y:0,z:0},d[e]=l>0?-1:1),a=Math.min(a,Math.max(p,m)),i>a){f=!1;break}}f&&i>=-1e-7&&i<=1&&a>=0&&i<s&&(s=Math.max(0,i),c=d,l=u)}if(!l)return null;e.x=t.x+o.x*s+c.x*.002,e.y=t.y+o.y*s+c.y*.002,e.z=t.z+o.z*s+c.z*.002;let u=e.vx*c.x+e.vy*c.y+e.vz*c.z;return u<0&&(e.vx-=(1+r)*u*c.x,e.vy-=(1+r)*u*c.y,e.vz-=(1+r)*u*c.z),l.id}var Xu=mu;uu.radius;var Zu=()=>({x:7,z:-20,y:Uu(7,-20)+.56,vx:0,vz:0,vy:0,heading:0,steer:0,spin:0,grounded:!0,airTurn:0,downThrust:!1,lastHit:null});function Qu(e,t,n,r,i,a=1.12,o=!1,s){let c=s?.height??Uu,l={x:e.x,y:e.y+.5,z:e.z},u=e.vy,d=e.vx*Math.sin(e.heading)+e.vz*Math.cos(e.heading),f=e.vx*Math.cos(e.heading)-e.vz*Math.sin(e.heading),p=Math.hypot(e.vx,e.vz);e.steer+=(Mu(n,-1,1)*.45-e.steer)*(1-Math.exp(-i*9));let m=e.steer/.45*Math.min(1.7,28/Math.max(1,p))*Math.min(1,p/4);if(e.airTurn=e.grounded?0:n,e.downThrust=!e.grounded&&r,e.grounded){e.heading+=m*Math.sign(d||1)*i;let n=r?Math.sign(d)*Math.max(0,Math.abs(d)-18*i):Mu(d+(t*(s?.acceleration??(o?7.5:9))-d*(s?.drag??(o?.09:.05))-Math.sign(d)*.25)*i,-8,s?.maxSpeed??32),a=f*Math.exp(-i*5.5);e.vx=Math.sin(e.heading)*n+Math.cos(e.heading)*a,e.vz=Math.cos(e.heading)*n-Math.sin(e.heading)*a}else e.heading+=m*.45*i;if(e.grounded&&s?.slopeGravity){let t=(c(e.x+.15,e.z)-c(e.x-.15,e.z))/.3,n=(c(e.x,e.z+.15)-c(e.x,e.z-.15))/.3,r=s.gravity*s.slopeGravity*i/(1+t*t+n*n);e.vx-=t*r,e.vz-=n*r}let h=c(e.x,e.z)+.56,g=e.grounded;if(g){let t=.15;e.vy=((c(e.x+t,e.z)-c(e.x-t,e.z))*e.vx+(c(e.x,e.z+t)-c(e.x,e.z-t))*e.vz)/(2*t)}e.x+=e.vx*i,e.z+=e.vz*i;let _=c(e.x,e.z)+.56,v=(s?.gravity??Xu)+(e.downThrust?s?.downAcceleration??8:0),y=e.y+e.vy*i-.5*v*i*i;(s?.groundContact?.(e,{from:{x:l.x,y:l.y-.5,z:l.z,vy:u},wasGrounded:g,oldFloor:h,floor:_,predicted:y,gravity:v,dt:i},c)??!1)||(g&&y<=_+(o&&e.vy<1.3?.16:1e-5)?(e.y=_,e.vy=(_-h)/Math.max(i,1e-6)):(e.grounded=!1,e.y=y,e.vy-=v*i,e.y<=_&&(e.y=_,e.grounded=!0,e.vy=0,e.vx*=s?.landingRetention??.93,e.vz*=s?.landingRetention??.93)));let b={x:e.x,y:e.y+.5,z:e.z,vx:e.vx,vy:e.vy,vz:e.vz},x=(s?.collide??Yu)(b,l,a,.02);x&&(e.x=b.x,e.y=b.y-.5,e.z=b.z,e.vx=b.vx,e.vy=b.vy,e.vz=b.vz,e.lastHit=x),s&&s.constrain(e);let S=Math.hypot(e.x,e.z);!s&&S>ku()&&(e.x*=ku()/S,e.z*=ku()/S,e.vx*=.1,e.vz*=.1),e.spin+=d*i/.36}var $u=[`Tailwhip`,`Reverse tailwhip`,`Reverse 360 spin`,`360 spin`,`Backflip`,`Front flip`],ed=()=>({move:void 0,turnJet:0,trick:null,age:0,duration:1.05,armed:!0,lastSpecial:-99,down:!1,airtime:0,landedTricks:0,pending:0,combo:0});function td(e,t,n,r,i,a,o,s=!1,c=!0,l){let u=l?.height??Uu,d=!c||e.down?0:s?r?6:n?5:0:i===0?0:r?i<0?3:4:n?i<0?1:2:0;d||(e.armed=!0),i!==0&&!e.down&&(e.lastSpecial=-99),t.grounded||(e.airtime+=o,d&&e.armed&&!e.trick&&t.y-u(t.x,t.z)-.56>=1.3&&(e.trick=$u[d-1],e.age=0,e.armed=!1,e.combo=d)),d&&(e.armed=!1),e.trick&&!e.move&&(e.age+=o,e.age>=e.duration&&(e.pending++,e.trick=null));let f=t.grounded;t.grounded&&n&&(t.heading-=i*1.4*(1-Math.min(1,Math.hypot(t.vx,t.vz)/4))*o),Qu(t,a?-1:+!!n,t.grounded?-i:0,t.grounded?r&&!i:e.down&&(r||!c),o,.42,!0,l),t.grounded&&(f||(e.landedTricks+=e.pending,e.pending=0,e.trick=null,e.age=0),e.airtime=0)}var nd=.85,rd=(e=!1)=>({exclusive:e,consumedGas:!1,released:!1,cycles:0,stage:0,started:-99,middle:-99,age:0,active:!1,sign:1,gas:!1,special:!1});function id(e,t,n,r,i){let a=t.press===`special`||!t.press&&t.special&&!e.special,o=t.press===`gas`||!t.press&&t.gas&&!e.gas;if(e.gas=t.gas,e.special=t.special,e.active&&!t.special&&(e.released=!0),e.exclusive&&(t.gas?e.stage&&!e.active&&(e.consumedGas=!0):e.consumedGas=!1),!n||r||t.reverse||e.active)return e.stage=0,!1;if(t.time-e.started>.9&&(e.stage=0),o&&(e.stage===1&&(e.exclusive||t.time-e.started>.32&&t.time-i>.32)?(e.stage=2,e.middle=t.time):e.stage=0),a){if(e.stage===2&&t.time>e.middle&&t.time-e.started<=.9)return e.stage=0,e.active=!0,e.age=0,e.cycles=0,e.released=!1,!0;e.stage=1,e.started=t.time,e.sign=t.steer>0?-1:1}return!1}function ad(e,t,n,r=!1){if(!n)return e.stage=0,e.active=!1,e.age=0,0;if(!e.active)return 0;if(e.age+=t,e.age>=.85)if(e.exclusive&&r&&!e.released)e.cycles+=Math.floor(e.age/nd),e.age%=nd;else return e.active=!1,0;let i=e.age/nd;return e.sign*2*Math.PI*(e.cycles+(e.exclusive?i:i*i*(3-2*i)))}function od(e,t){return e.exclusive&&(e.stage>0||e.consumedGas)?{...t,gas:!1,press:t.press===`gas`?`release`:t.press}:t}var sd=.65,cd=()=>({mode:`idle`,held:!1,brakeHeld:!1,yaw:0,lastGas:-99,lastBrake:-99,lastDirection:-99,grounded:null,hops:0,dives:0,flash:0,slamming:!1});function ld(e,t,n,r=!1,i=0){let a=n.press===`gas`||!n.press&&n.gas&&!e.held;if(e.grounded!==t&&(e.lastGas=-99,e.slamming=!1,e.flash=0,e.grounded=t),n.reverse&&(e.lastGas=-99),a&&!n.reverse){let n=i-e.lastGas;n>=0&&n<=.32?(t?e.hops++:(e.dives++,e.slamming=!0),e.lastGas=-99):e.lastGas=i}n.gas||(e.slamming=!1),e.held=n.gas,e.brakeHeld=n.special,e.mode=!t&&e.slamming?`slam`:!t&&n.gas&&n.steer?`turn`:`idle`}function ud(e,t,n,r,i=!1,a=0,o=!1){ld(e,t,n,i,a);let s=!t&&n.gas&&!e.slamming?Math.sign(n.steer)*sd:0;e.yaw=o?s:e.yaw+(s-e.yaw)*(1-Math.exp(-r*8)),t&&(e.yaw=0);let c=e.dives,l=e.hops>0;return e.dives=e.hops=0,e.flash=t?0:c?.28:Math.max(0,e.flash-r),{dive:!t&&(e.slamming||e.flash>0),dives:c,hop:l,yaw:e.yaw}}var dd=.32,fd=.16,pd=.18,md=.08,hd=[`L`,`LL`,`LR`,`LLL`,`LLR`,`LRL`,`LRR`],gd={L:[`Side grab`,`Tailwhip`,`deck`,1,1.05,150],LL:[`Tail grab`,`Backflip`,`flip`,1,1.25,260],LR:[`Nose grab`,`Corkscrew`,`cork`,1,1.4,330],LLL:[`Tuck grab`,`Double backflip`,`flip`,2,1.8,450],LLR:[`Superman`,`Flip whip`,`bar`,1,1.55,380],LRL:[`Cross grab`,`Whip rewind`,`rewind`,1,1.4,320],LRR:[`Rocket grab`,`720 spin`,`yaw`,2,1.6,400]},_d=(e=`scooter`)=>({vehicle:e,history:[],committed:[],left:!1,right:!1,steer:0,gas:!1,special:!1,reverse:!1,both:!1,events:[],started:-99,variationOpen:!1,taps:0,secret:!1});function vd(e,t=!1,n=`scooter`,r=t?2:1){let i=e[0]>0?-1:1,a=(e.length?e:[-1]).map(e=>e*i<0?`L`:`R`).join(``),o=a.slice(0,3),[s,c,l,u,d,f]=gd[o]??gd.L,p={vehicle:n,slot:gd[o]?o:`L`,sign:i,variant:t,secret:!1,age:0,hold:0,releasing:!1,releaseAge:0,cycles:0};if(a===`LRLR`&&t)return{...p,slot:`special`,kind:`spin`,secret:!0,trick:n===`ski`?`Red Planet Rodeo`:`The 9000`,axis:n===`ski`?`rodeo`:`yaw`,rotations:n===`ski`?3:50,duration:n===`ski`?2.8:12.24,value:n===`ski`?1800:9e3};let m=i<0?`Reverse `:``;if(n===`scooter`||n===`ski`){let t=e.some(t=>t!==e[0])?`superman`:`board`,i=Math.max(1,Math.min(3,r)),a=t===`board`?n===`ski`?[`Blade tuck`,`One-blade tuck`,`Barrel roll`]:[`Board grab`,`One-handed grab`,`Barrel roll`]:n===`ski`?[`Rover extension`,`Blade stand`,`Front flip`]:[`Superman`,`Bar headstand`,`Front flip`];return{...p,tree:t,stage:i,slot:t,variant:i>1,kind:i===3?`spin`:`grab`,axis:i===3?t===`board`?`roll`:`flip`:`grab`,trick:m+a[i-1],rotations:+(i===3),duration:i===3?1.5:i===2?.92:.74,value:(t===`board`?[60,120,300]:[90,180,450])[i-1]}}return t?{...p,kind:`spin`,trick:m+c,axis:l,rotations:u,duration:d,value:f}:{...p,kind:`grab`,trick:m+s,axis:`grab`,rotations:0,duration:dd+(n===`scooter`?.26:0)+fd,value:60+hd.indexOf(p.slot)*10}}var yd=e=>`${e.kind}:${e.slot}${e.stage?`:${e.stage}`:``}`,bd=e=>Math.round(e.value+(e.kind===`grab`?e.hold*120:0));function xd(e,t){e?.kind===`grab`&&!t&&(e.releasing=!0)}function Sd(e,t,n,r=!1){return e.age+=n,e.kind===`grab`?(xd(e,t),e.releasing?e.releaseAge+=Math.max(0,Math.min(n,e.age-dd-(e.tree?pd*(e.stage===2?2:1)+md:0))):e.hold+=n,e.releasing&&e.releaseAge>=.16):(t||(e.releasing=!0),e.age<e.duration?!1:e.secret||!r||e.releasing?!0:(e.tree&&(e.poseFrom=Td(e)),e.age-=e.duration,e.cycles++,!1))}function Cd(e,t,n,r,i,a=!1){let o=i.both||i.steer<0,s=i.both||i.steer>0,c=i.press===`left`?-1:i.press===`right`?1:!i.press&&o&&!e.left?-1:!i.press&&s&&!e.right?1:0,l=c!==0,u=i.press===`gas`||!i.press&&i.gas&&!e.gas,d=Math.sign(i.steer);e.left=o,e.right=s,e.steer=d,e.gas=i.gas,e.both=i.both,a&&l&&(e.variationOpen=!1);let f=(e.vehicle===`scooter`||e.vehicle===`ski`)&&o!==s?d:0;if(r&&!(a&&(l||e.history.length||f&&u&&t-e.started>.32))){if(e.history=[],l&&(e.variationOpen=!1),u&&e.variationOpen&&t-e.started<=.32){e.taps++;let n=vd(e.committed,!0,e.vehicle,e.taps);return e.started=t,e.variationOpen=(e.vehicle===`scooter`||e.vehicle===`ski`)&&e.taps<3&&!n.secret,n}return null}if(!n)return e.history=[],e.variationOpen=!1,null;if(e.history=e.history.filter(e=>t-e.time<=1),i.reverse||i.special&&!i.gas)return e.history=[],null;if(i.special&&u&&d&&!l&&e.history.push({direction:d,time:t}),l&&(e.history.push({direction:c,time:t}),e.history=e.history.slice(-4)),!(u||l&&i.gas)||(!e.history.length&&f&&u&&e.history.push({direction:f,time:t}),!e.history.length))return null;let p=e.history.length?e.history.map(e=>e.direction):[-1],m=vd(p,!1,e.vehicle);return e.history=[],e.committed=p,e.started=t,e.taps=1,e.variationOpen=!0,e.secret=m.secret,m}function wd(e){let t={L:[.12,.18,.28,.35,-.4],LL:[-.42,0,.12,-.3,.25],LR:[.5,0,-.12,.2,-.3],LLL:[-.55,.35,.05,.6,.45],LLR:[.9,0,.15,0,0],LRL:[.12,-.6,.3,-.8,.65],LRR:[-.2,.15,-.4,1.1,-.65]},n=t[e.slot]??t.L,r=Math.max(0,Math.min(1,(e.age-dd)/pd))*(e.releasing?Math.max(0,1-e.releaseAge/fd):1);return{pitch:n[0]*r,yaw:n[1]*r*e.sign,roll:n[2]*r*e.sign,deck:n[3]*r*e.sign,bars:n[4]*r*e.sign,extent:r}}function Td(e){let t={bodyY:0,bodyZ:0,pitch:0,roll:0,armL:0,armR:0,armLX:0,armRX:0,armLY:0,armRY:0,leg:0,rootRoll:0};if(!e?.tree)return t;let n=e.tree===`board`,r=Math.min(2,e.stage),i=e.sign,a=n?{...t,bodyY:-.7,bodyZ:.12,pitch:.4,armLX:1.55,armRX:1.55,armLY:.2,armRY:-.2,leg:1.25,rootRoll:.12*i}:{...t,bodyY:1.25,bodyZ:-1.25,pitch:Math.PI/2,armLX:-Math.PI/2,armRX:-Math.PI/2,leg:0},o=r===1||n?{...a}:{...t,bodyY:2.78,bodyZ:1.02,pitch:Math.PI,armLX:-.55,armRX:-.55,leg:-.15};n&&r===2&&(i>0?(o.armR=-.3,o.armRX=-1.25,o.armRY=.9):(o.armL=.3,o.armLX=-1.25,o.armLY=-.9));let s=e.poseFrom??t,c=Math.max(0,e.age-(e.poseFrom?0:dd)),l=Math.abs(s.pitch)>=Math.abs(a.pitch)*.95,u=r===2&&!l?pd:0,d=c<u?s:u?a:s,f=c<u?a:o,p=Math.max(0,Math.min(1,(c<u?c:c-u)/pd)),m=p*p*(3-2*p),h=e.kind===`spin`?1:e.releasing?Math.max(0,1-e.releaseAge/fd):1;return Object.fromEntries(Object.keys(t).map(e=>[e,((d[e]??0)+(f[e]-(d[e]??0))*m)*h]))}function Ed(e){return{...e,gas:!!e.special,special:!1,press:e.press===`special`?`gas`:e.press===`gas`?`release`:e.press}}function Dd(e){return e.secret?Math.min(1,e.age/e.duration)*e.rotations*Math.PI*2:e.kind===`spin`?(e.cycles+e.age/e.duration)*e.rotations*Math.PI*2:0}var Od={Tailwhip:150,"Reverse tailwhip":150,"360 spin":220,"Reverse 360 spin":220,Backflip:300,"Front flip":300},kd=(e=!0,t)=>({environment:t,pendingMove:null,rotation:rd(!0),scored:e,air:cd(),input:_d(),time:0,phase:`running`,score:0,base:0,grabPoints:0,multiplier:1,chain:0,bestCombo:0,landed:0,letters:t?t.letters.map(()=>!1):[!1,!1,!1,!1],letterBonus:0,letterTime:null,repeats:{},manual:!1,queued:!1,balance:0,manualAge:0,manualPoints:0,lastManual:-99,gasHeld:!1,hopPressed:!1,feedback:e?`SCOOTER · SCORE ATTACK`:``,chainNames:[]}),Ad=e=>Math.round((e.base+e.grabPoints)*(e.grabPoints?Math.min(8,e.chain+1):e.multiplier));function jd(e,t,n){let r=n?.trick??t;if(!e.scored){e.landed++,e.feedback=r;return}let i=n?yd(n):r,a=e.repeats[i]??0;e.repeats[i]=a+1;let o=n?bd(n):Od[t];e.base+=Math.round(o*Math.max(.2,1/(1+a*.5))),e.chain++,e.multiplier=Math.min(8,e.chain),e.landed++,e.chainNames.push(r),e.chainNames.length>4&&e.chainNames.shift(),e.feedback=r+(a?` · repeat`:``)}function Md(e){let t=Ad(e);e.score+=t,e.bestCombo=Math.max(e.bestCombo,t),t&&(e.feedback=`Banked ${t.toLocaleString()}`),Pd(e)}function Nd(e,t){e.feedback=t+(e.scored?` · combo lost`:``),Pd(e)}function Pd(e){e.base=0,e.grabPoints=0,e.chain=0,e.multiplier=1,e.manual=!1,e.queued=!1,e.balance=0,e.manualAge=0,e.manualPoints=0,e.chainNames=[]}function Fd(e){e.manual=!1,e.queued=!1,e.lastManual=-99,e.balance=0,e.manualAge=0,e.manualPoints=0}function Id(e){e.lastManual=-99,e.manual=!0,e.queued=!1,e.balance=.08,e.manualAge=0,e.manualPoints=0,e.chain++,e.multiplier=Math.min(8,e.chain),e.scored&&(e.base+=75),e.chainNames.push(`Manual`),e.chainNames.length>4&&e.chainNames.shift(),e.feedback=`MANUAL`}function Ld(e,t){return e.phase===`result`||!t.grounded?!1:(e.hopPressed=!0,!0)}function Rd(e){e.environment?.gasDoubleTap===!1&&(e.air.lastGas=-99,e.air.hops=0,e.air.dives=0,e.air.slamming=!1,e.air.flash=0)}function zd(e,t,n,r,i){Rd(e),ld(e.air,t,n,r,i),Rd(e)}function Bd(e,t,n,r=!1){if(e.phase===`result`){e.lastManual=-99,e.queued=!1;return}if(e.manual){let t=n-e.lastManual;e.lastManual=n,t>=0&&t<=.32&&(Fd(e),Md(e),e.feedback=`Manual ended`);return}if(r||Ud(t,e.environment)){e.lastManual=-99,e.queued=!1;return}let i=n-e.lastManual;if(e.lastManual=n,e.queued=i>=0&&i<=.32,e.queued&&t.grounded){e.queued=!1,Math.hypot(t.vx,t.vz)>=.7&&Id(e);return}e.queued?e.feedback=`Manual armed for landing`:e.feedback===`Manual armed for landing`&&(e.feedback=``)}function Vd(e,t,n,r){if(e.rotation.stage===1&&r.time-e.rotation.started>=.25&&(e.rotation.stage=0,e.pendingMove)){let r=e.pendingMove;e.pendingMove=null,r.age=r.kind===`grab`?dd:0,Hd(e,t,n,r)}e.rotation.stage===2&&r.time-e.rotation.started>.9&&(e.pendingMove=null,e.input.variationOpen=!1,e.input.history=[]);let i=e.rotation.stage===2,a=id(e.rotation,r,!n.grounded&&Wd(n,.85,e.environment),e.manual||!!t.trick&&!!t.move&&(t.move.kind===`spin`||t.move.secret),e.air.lastGas);if(a){e.pendingMove=null,e.input.variationOpen=!1,e.input.gas=!!r.special,e.input.left=r.both||r.steer<0,e.input.right=r.both||r.steer>0,e.input.steer=Math.sign(r.steer),e.input.both=r.both,e.input.history=[],e.air.lastGas=-99,e.feedback=`Orbit turn`,zd(e,n.grounded,{...od(e.rotation,r),time:r.time,press:`release`},!!t.trick,r.time);return}if(i&&!e.rotation.stage&&!a&&(e.pendingMove=null,e.input.variationOpen=!1,e.input.history=[]),e.rotation.stage===2){zd(e,n.grounded,{...od(e.rotation,r),time:r.time},!1,r.time);return}e.rotation.stage||(e.pendingMove=null);let o=Ed(r),s=r.press===`special`||!r.press&&r.special&&!e.input.gas,c=r.gas||r.steer!==0||r.reverse||r.both,l=!!t.trick||Ud(n,e.environment);(c&&!e.manual||l)&&(e.queued&&e.feedback===`Manual armed for landing`&&(e.feedback=``),e.queued=!1,e.lastManual=-99),s&&!l&&Bd(e,n,r.time,!!c),e.input.special=!1,xd(t.trick?t.move:void 0,r.special),xd(e.pendingMove??void 0,r.special);let u=Cd(e.input,r.time,Ud(n,e.environment)&&!e.manual,!!t.trick||!!e.pendingMove,o,t.move?.kind===`grab`&&t.move.releasing);u&&(e.rotation.stage===1?e.pendingMove=u:Hd(e,t,n,u)),zd(e,n.grounded,{...od(e.rotation,r),time:r.time},!!t.trick||!!u,r.time)}function Hd(e,t,n,r){r&&t.trick&&t.move?Wd(n,r.duration,e.environment)?(r.variant||(jd(e,t.trick,t.move),t.pending++),r.variant&&r.tree&&(r.poseFrom=Td(t.move),r.hold=t.move.hold),t.move=r,t.age=r.age,t.duration=r.duration,e.grabPoints=0,e.feedback=r.trick):e.feedback=`Too low for `+r.trick:r&&(n.y-(e.environment?.height??Uu)(n.x,n.z)-.56>=1.3&&Wd(n,r.duration,e.environment)?(t.move=r,t.trick=r.axis===`flip`?r.sign>0?`Backflip`:`Front flip`:r.sign>0?`Tailwhip`:`Reverse tailwhip`,t.age=r.age,t.duration=r.duration,t.armed=!1,t.combo=0,e.feedback=r.trick):(e.feedback=`Too low`,e.input.variationOpen=!1))}function Ud(e,t){return!e.grounded&&e.y-(t?.height??Uu)(e.x,e.z)-.56>=1.3&&Wd(e,.74,t)}function Wd(e,t,n){for(let r=.04;r<=t+.06;r+=.04)if(e.y+e.vy*r-.5*(n?.gravity??1.62)*r*r<=(n?.height??Uu)(e.x+e.vx*r,e.z+e.vz*r)+.62)return!1;return!0}function Gd(e,t,n,r,i){if(e.phase===`result`||!Number.isFinite(i)||i<=0)return;e.manual&&!n.grounded&&Fd(e);let a=n.grounded,o=t.trick,s=t.pending,c=!t.move,l=c&&!!o&&t.age+i>=t.duration,u=Math.hypot(n.vx,n.vz),d=e.input.events.splice(0);for(let r of d)Vd(e,t,n,r);Vd(e,t,n,{...r,time:e.time});let f=od(e.rotation,r);Rd(e);let p=ud(e.air,n.grounded,f,i,!!t.trick,e.time,!0),m=(p.hop||e.hopPressed)&&n.grounded;if(Rd(e),e.hopPressed=!1,e.gasHeld=f.gas,m&&(n.grounded=!1,n.vy=e.environment?.hopSpeed??5.6,Fd(e),e.air.lastGas=-99,t.armed=!1,e.feedback=`Hop`),p.dives&&!n.grounded&&(n.vy=Math.min(0,n.vy)-(e.environment?.diveJolt??7)*p.dives,e.feedback=`Down-thrust`),e.manual&&n.grounded){e.manualAge+=i;let t=1-Math.min(1,Math.hypot(n.vx,n.vz)/4),a=(1+e.manualAge*.12)*(1+t*t*2.5);e.balance+=((Math.sin(e.manualAge*(2.7+e.manualAge*.06))*.35+.25+e.balance*.7)*a+(r.gas?0:r.steer)*1.5)*i;let o=Math.floor(e.manualAge*4)-e.manualPoints;o>0&&(e.scored&&(e.base+=o*8),e.manualPoints+=o),n.vx*=Math.exp(-i*.18),n.vz*=Math.exp(-i*.18),Math.abs(e.balance)>=1&&Nd(e,`Balance lost`)}if(t.trick&&t.move){let a=t.move.cycles,o=Sd(t.move,r.special,i,t.move.age+i>=t.move.duration&&Wd(n,t.move.duration,e.environment));t.age=t.move.age,t.move.cycles>a&&(jd(e,t.trick,t.move),t.pending++);let s=e.repeats[yd(t.move)]??0;e.grabPoints=t.move.kind===`grab`?Math.round(bd(t.move)*Math.max(.2,1/(1+s*.5))):0,o&&(jd(e,t.trick,t.move),e.grabPoints=0,t.pending++,t.trick=null)}else e.grabPoints=0;let h=!!t.trick&&!(c&&l);if(t.down=p.dive,n.lastHit=null,td(t,n,e.manual||m?!1:f.gas,!1,e.manual&&!r.gas?0:r.steer,e.manual?!1:r.reverse,i,r.both,!1,e.environment),e.manual&&!n.grounded&&Fd(e),t.rotationAngle=ad(e.rotation,i,!n.grounded,r.special&&Wd(n,.85,e.environment)),t.down=!n.grounded&&p.dive,n.downThrust=t.down,!n.grounded){let e=-p.yaw*i,t=Math.cos(e),r=Math.sin(e),a=n.vx;n.heading+=e,n.vx=a*t+n.vz*r,n.vz=n.vz*t-a*r,n.airTurn=-p.yaw/.65}t.turnJet=n.grounded?0:n.airTurn,c&&(t.pending>s||l)&&o&&jd(e,o,t.move),n.lastHit&&u>3?(Nd(e,`Contact`),t.pending=0,t.trick=null,n.vx*=.25,n.vz*=.25):!a&&n.grounded&&(h?(Nd(e,`Unfinished trick`),t.pending=0):e.queued?Id(e):Md(e)),n.grounded&&(e.queued=!1,e.input.history=[]),t.manual=e.manual,t.balance=e.balance;let g=e.environment?.letters??Du;if(e.scored&&e.phase===`running`)for(let t=0;t<g.length;t++){let r=g[t];!e.letters[t]&&Math.hypot(r.x-n.x,r.z-n.z)<7&&Math.abs(n.y-(e.environment?.height??Uu)(r.x,r.z)-.56)<7&&(e.letters[t]=!0,e.feedback=`Collected ${r.letter}`,e.letters.every(Boolean)&&(e.letterTime=Math.min(120,e.time),e.letterBonus=4e3+Math.round(4e3*Math.max(0,1-e.time/120)),e.score+=e.letterBonus,e.feedback=`${e.environment?.letterWord??`M-O-O-N`} · +${e.letterBonus}`))}e.time+=i,e.scored&&e.time>=120&&(e.phase=e.base>0&&(!n.grounded||e.manual)||t.trick?`overtime`:`result`,e.phase===`result`&&(Md(e),t.manual=!1))}var Kd=Object.freeze({lowerMps:3,slamMps:9,heldAcceleration:6}),qd=Object.freeze({bodyLengthM:3.0988,bodyWidthM:2.0574,collisionLengthM:3.14,collisionWidthM:2.44,wheelbaseM:2.286,wheelTrackM:1.8288,wheelRadiusM:.4064,rideHeightM:.55,gravity:1.62,speedMps:44.704,reverseMps:5,acceleration:10,boostAcceleration:14,brakeAcceleration:16,rollingResistance:.3,steeringRadians:.48,steeringYawRate:.85,steeringResponse:7,steeringReturnResponse:32,boostMultiplier:1.35,doubleBoostMultiplier:1.7,boostSeconds:4,doubleBoostSeconds:2,rechargeSeconds:6,tapSeconds:.22,doubleTapSeconds:.33,rocketMps:111.76,rocketAcceleration:32,rocketSeconds:8,rocketRunoutDeceleration:32,rocketMaxSeconds:60,rocketFastRechargeSeconds:2,rocketFastRechargeDistanceM:6e3,rocketMinTripM:600,rocketApproachM:300,rocketEdgeStartM:400,rocketEdgeCutoffM:250,maxAirPitchRadians:Math.PI/15,airPitchRate:.24,airStrafeAcceleration:3,airStrafeMps:8,airTurnRate:.8,airBrakeTurnRate:1.2,airDownAcceleration:Kd.heldAcceleration,airBrakeSeconds:4,airBrakeDeceleration:16.764,adhesionAcceleration:16.2,adhesionMaxSlope:.32,adhesionRangeM:1.35,adhesionMicroRangeM:.32,adhesionMaxDropM:2,adhesionLookSeconds:.18,adhesionMinLookM:4,adhesionMaxLookM:9});function Jd(e={}){let t=Object.freeze({...qd,...e});function n(){return{speedMps:0,boostLevel:0,boostRemaining:0,boostEnergy:1,grounded:!0,pitch:0,roll:0,airPitch:0,airYawRate:0,steeringAngle:0,wheelSpin:0,wheelHeights:[0,0,0,0],wheelOffsets:[0,0,0,0],contactHeight:0,airTime:0,clock:0,gasWasDown:!1,gasDownAt:0,lastShortRelease:-1/0,triggerPress:!1,inputQueue:[],usesQueuedInput:!1,lastInputTime:-1/0,inputGas:!1,inputReverse:!1,inputBrake:!1,inputRawBrake:!1,inputAirBrakeEligible:void 0,inputTrickIntent:!1,inputGrounded:void 0,airBrakeRemaining:0,brakeWasDown:!1,brakeDownAt:0,lastBrakeRelease:-1/0,brakePressEligible:!1,parked:!0,initialized:!1,airYaw:0,takeoffPitch:0,takeoffRoll:0,rocketAvailable:!1,rocketBoost:!1,rocketCoasting:!1,rocketThrust:0,boostDurationSeconds:t.boostSeconds,rocketReadySeconds:t.rocketSeconds,rechargeSeconds:t.rechargeSeconds}}function r(e){let{pitch:t,roll:r,wheelSpin:i,wheelHeights:a,wheelOffsets:o,contactHeight:s,grounded:c,boostEnergy:l,rocketCoasting:u,rocketReadySeconds:d,rechargeSeconds:f}=e;Object.assign(e,n(),{pitch:t,roll:r,wheelSpin:i,wheelHeights:[...a],wheelOffsets:[...o],contactHeight:s,grounded:c,boostEnergy:l,rocketCoasting:u,rocketReadySeconds:d,rechargeSeconds:f,takeoffPitch:t,takeoffRoll:r})}let i=(e,t,n)=>Math.max(t,Math.min(n,e)),a=(e,t,n)=>e<t?Math.min(t,e+n):Math.max(t,e-n),o=(e,t)=>Math.atan2(Math.sin(e-t),Math.cos(e-t)),s=e=>e.rocketBoost?e.boostDurationSeconds:e.boostLevel===2?t.doubleBoostSeconds:t.boostSeconds;function c(e){let n=t,r=i(e.boostEnergy,0,1);if(e.boostLevel){let t=s(e),n=Math.max(0,Math.min(e.boostRemaining,r*t));if(n>1e-9)return{phase:`active`,level:e.boostLevel,seconds:n,fraction:n/t}}return r>=.999999999?{phase:`ready`,level:0,seconds:e.rocketAvailable?e.rocketReadySeconds:n.boostSeconds,fraction:1}:{phase:`charging`,level:0,seconds:(1-r)*e.rechargeSeconds,fraction:r}}function l(e,n){let r=t,a=n?.target,o=a?Math.hypot(a.x-e.x,a.z-e.z):0;if(!Number.isFinite(o)||o<r.rocketMinTripM)return{rocketSeconds:r.rocketSeconds,rechargeSeconds:r.rechargeSeconds};let s=i((o-r.rocketMinTripM)/(r.rocketFastRechargeDistanceM-r.rocketMinTripM),0,1);return{rocketSeconds:i((o-r.rocketApproachM)/r.rocketMps+2,r.rocketSeconds,r.rocketMaxSeconds),rechargeSeconds:r.rechargeSeconds+(r.rocketFastRechargeSeconds-r.rechargeSeconds)*s}}function u(e,t,n){let r=d(t,n),i=l(t,n);return e.rocketAvailable=r.available,e.rocketReadySeconds=i.rocketSeconds,e.rechargeSeconds=i.rechargeSeconds,r}function d(e,n){if(!n)return{available:!1,approaching:!0};let r=t,i=n.bounds,a=Math.min(e.x-i.west,i.east-e.x,-e.z-i.south,i.north+e.z),o=n.target?Math.hypot(n.target.x-e.x,n.target.z-e.z):1/0;return{available:o>=r.rocketMinTripM&&a>=r.rocketEdgeStartM,approaching:o<=r.rocketApproachM||a<=r.rocketEdgeCutoffM}}function f(e){e.boostLevel=0,e.boostRemaining=0,e.rocketBoost=!1,e.rocketThrust=0}function p(e){e.lastBrakeRelease=-1/0,e.brakePressEligible=!1}function m(e,t){if(!Number.isFinite(t.time)||t.time<0||t.time<e.lastInputTime)return!1;e.usesQueuedInput||(e.inputGas=e.gasWasDown,e.lastShortRelease=-1/0,e.triggerPress=!0,e.inputRawBrake=e.brakeWasDown,p(e)),e.lastInputTime=t.time,e.usesQueuedInput=!0;let n=t.rawBrake??t.brake,r=!!t.trickIntent;return t.gas===e.inputGas&&t.reverse===e.inputReverse&&t.brake===e.inputBrake&&n===e.inputRawBrake&&t.airBrakeEligible===e.inputAirBrakeEligible&&r===e.inputTrickIntent&&t.grounded===e.inputGrounded?!1:(e.inputGas=t.gas,e.inputReverse=t.reverse,e.inputBrake=t.brake,e.inputRawBrake=n,e.inputAirBrakeEligible=t.airBrakeEligible,e.inputTrickIntent=r,e.inputGrounded=t.grounded,e.inputQueue.length>=64?(e.inputQueue.length=0,e.gasWasDown=t.gas,e.gasDownAt=t.time,e.lastShortRelease=-1/0,e.triggerPress=!0,f(e),e.brakeWasDown=n,e.airBrakeRemaining=0,p(e),!1):(e.inputQueue.push({...t}),!0))}function h(e,n,r,i=e.clock){let a=0,o=t,s=n.rawBrake??n.brake,c=!!n.trickIntent||s&&!!n.steer,l=!r&&!c&&!n.reverse&&(n.airBrakeEligible??!0),u=n.gas&&!e.gasWasDown;return r||c||n.reverse||u?(e.airBrakeRemaining=0,p(e)):l||p(e),s&&!e.brakeWasDown?(e.brakeDownAt=i,e.brakePressEligible=l&&!u,l&&(a=Kd.lowerMps),e.brakePressEligible&&i-e.lastBrakeRelease<=o.doubleTapSeconds&&(e.airBrakeRemaining<=0&&(e.airBrakeRemaining=o.airBrakeSeconds,f(e),a=Kd.slamMps),e.brakePressEligible=!1),e.lastBrakeRelease=-1/0):!s&&e.brakeWasDown&&(e.lastBrakeRelease=l&&e.brakePressEligible&&i-e.brakeDownAt<=o.tapSeconds?i:-1/0,e.brakePressEligible=!1),e.brakeWasDown=s,a}function g(e,n,r=e.clock){let i=t,a=n.gas,o=n.brake||n.reverse;o&&(f(e),e.lastShortRelease=-1/0,e.triggerPress=!0),a&&!e.gasWasDown?(e.gasDownAt=r,e.triggerPress=o,!o&&r-e.lastShortRelease<=i.doubleTapSeconds&&(e.boostLevel===0&&e.boostEnergy>=.999999999?(e.boostLevel=1,e.rocketBoost=e.rocketAvailable,e.boostDurationSeconds=e.rocketBoost?e.rocketReadySeconds:i.boostSeconds,e.boostRemaining=e.boostDurationSeconds,e.rocketBoost&&(e.rocketCoasting=!0)):e.boostLevel===1&&!e.rocketBoost&&e.boostEnergy>0&&(e.boostLevel=2,e.boostRemaining=Math.min(e.boostRemaining,i.doubleBoostSeconds)),e.triggerPress=!0),e.lastShortRelease=-1/0):!a&&e.gasWasDown&&(e.lastShortRelease=!e.triggerPress&&!o&&r-e.gasDownAt<=i.tapSeconds?r:-1/0,e.triggerPress=!1),e.gasWasDown=a}function _(e,n,r,a){let o=t,s={x:Math.sin(a),z:Math.cos(a)},c={x:Math.cos(a),z:-Math.sin(a)},l=o.wheelbaseM/2,u=o.wheelTrackM/2,d=[[-u,l],[u,l],[-u,-l],[u,-l]],f=d.map(([t,i])=>e.height(n+c.x*t+s.x*i,r+c.z*t+s.z*i));if(!f.every(Number.isFinite))throw Error(`LRV wheel contact requires finite terrain.`);let p=f.reduce((e,t)=>e+t,0)/4,m=(f[0]+f[1]-f[2]-f[3])/(2*o.wheelbaseM),h=(f[1]+f[3]-f[0]-f[2])/(2*o.wheelTrackM),g=f.map((e,t)=>e-p-d[t][0]*h-d[t][1]*m),_=Math.max(0,...g.map(e=>e-.18));return{height:p+_+o.rideHeightM,pitch:Math.atan(m),roll:Math.atan(h),forwardSlope:m,rightSlope:h,heights:f,offsets:g.map(e=>i(e-_,-.18,.18))}}function v(e,n,r){let i=t,a={x:Math.sin(e.heading),z:Math.cos(e.heading)},o={x:Math.cos(e.heading),z:-Math.sin(e.heading)},s=[{x:1,z:0},{x:0,z:1},a,o],c=e.x-n.x,l=e.z-n.z,u=1/0,d,f={x:0,z:0},p=0;for(let t of r.solids){if(t.y!==void 0&&t.hy!==void 0&&(Math.min(e.y,n.y)-i.rideHeightM>t.y+t.hy||Math.max(e.y,n.y)+1.4<t.y-t.hy))continue;let r=-1/0,m=1/0,h={x:0,z:0},g=!0,_=1/0,v={x:0,z:0},y=!0,b=t.polygon?[...s,...t.polygon.map((e,n)=>{let r=t.polygon[(n+1)%t.polygon.length],i=r.x-e.x,a=r.z-e.z,o=Math.hypot(i,a)||1;return{x:-a/o,z:i/o}})]:s;for(let e of b){let s=i.collisionLengthM/2*Math.abs(e.x*a.x+e.z*a.z)+i.collisionWidthM/2*Math.abs(e.x*o.x+e.z*o.z)+t.hx*Math.abs(e.x)+t.hz*Math.abs(e.z),u=(n.x-t.x)*e.x+(n.z-t.z)*e.z,d=c*e.x+l*e.z;if(t.polygon){let r=t.polygon.map(t=>t.x*e.x+t.z*e.z),c=Math.min(...r),l=Math.max(...r);s=i.collisionLengthM/2*Math.abs(e.x*a.x+e.z*a.z)+i.collisionWidthM/2*Math.abs(e.x*o.x+e.z*o.z)+(l-c)/2,u=n.x*e.x+n.z*e.z-(l+c)/2}Math.abs(u)>=s&&(g=!1);let f=s-Math.abs(u);if(f<_){_=f;let t=u>=0?1:-1;v={x:e.x*t,z:e.z*t}}if(Math.abs(d)<1e-12){if(Math.abs(u)>s){y=!1;break}}else{let t=(-s-u)/d,n=(s-u)/d,i=Math.min(t,n);if(i>r){r=i;let t=d>0?-1:1;h={x:e.x*t,z:e.z*t}}if(m=Math.min(m,Math.max(t,n)),r>m){y=!1;break}}}if(y){if(g&&_>0){u=0,d=t,f=v,p=_;break}r>=-1e-8&&r<=1&&m>=0&&r<u&&(u=Math.max(0,r),d=t,f=h,p=0)}}if(!d)return!1;e.x=n.x+c*u+f.x*(p+1e-5),e.z=n.z+l*u+f.z*(p+1e-5);let m=e.vx*f.x+e.vz*f.z;return m<0&&(e.vx-=m*f.x,e.vz-=m*f.z),e.lastHit=d.id??`solid`,!0}function y(e,n,r,a,o){let s=t,c=Math.min(s.steeringRadians,Math.atan(s.steeringYawRate*s.wheelbaseM/Math.max(.001,Math.abs(a))));e.steeringAngle=i(e.steeringAngle,-c,c);let l=r*c,u=l*e.steeringAngle<0||Math.abs(l)<Math.abs(e.steeringAngle)?s.steeringReturnResponse:s.steeringResponse;e.steeringAngle+=(l-e.steeringAngle)*(1-Math.exp(-o*u)),n.steer=e.steeringAngle}function b(e,n,r,c,l){let d=t;(n.grounded||r.trickIntent||r.reverse)&&(e.airBrakeRemaining=0,p(e));let m=Math.min(c,e.airBrakeRemaining);m>0&&f(e);let h=u(e,n,l.rocketTravel);if(e.rocketBoost&&h.approaching&&f(e),e.boostLevel?(e.boostRemaining=Math.max(0,e.boostRemaining-c),e.boostEnergy=Math.max(0,e.boostEnergy-c/s(e)),(e.boostRemaining===0||e.boostEnergy<1e-9)&&f(e)):e.boostEnergy=Math.min(1,e.boostEnergy+c/e.rechargeSeconds),e.rocketThrust=e.rocketBoost&&r.gas&&!r.brake&&!r.reverse?1:0,e.rocketCoasting&&!e.rocketBoost&&n.grounded){let t=Math.hypot(n.vx,n.vz);if(t>d.speedMps){let e=Math.max(d.speedMps,t-d.rocketRunoutDeceleration*c);n.vx*=e/t,n.vz*=e/t}else e.rocketCoasting=!1}let g=-i(Number.isFinite(r.steer)?r.steer:0,-1,1),b=_(l,n.x,n.z,n.heading),x=n.grounded;e.initialized||(e.initialized=!0,e.parked=n.grounded&&Math.hypot(n.vx,n.vz)<.08);let S={x:n.x,y:n.y,z:n.z,vy:n.vy},C=0;if(x){let t=n.vx*Math.sin(n.heading)+n.vz*Math.cos(n.heading),o=r.brake||r.gas&&r.reverse,s=r.gas&&!o&&!r.reverse,u=r.reverse&&!o;(s||u)&&(e.parked=!1);let f=t;f=e.parked&&!s&&!u?0:o?a(f,0,d.brakeAcceleration*c):s?a(f,e.rocketBoost?d.rocketMps:d.speedMps*(e.boostLevel===2?d.doubleBoostMultiplier:e.boostLevel===1?d.boostMultiplier:1),(e.rocketBoost?d.rocketAcceleration:e.boostLevel?d.boostAcceleration:d.acceleration)*c):u?a(f,-d.reverseMps,(f>0?d.brakeAcceleration:d.acceleration)*c):a(f,0,d.rollingResistance*c),!e.parked&&!o&&(f-=d.gravity*b.forwardSlope/(1+b.forwardSlope**2)*c);let p=e.rocketBoost?d.rocketMps:d.speedMps*(e.boostLevel===2?d.doubleBoostMultiplier:e.boostLevel===1?d.boostMultiplier:1);f=i(f,-d.reverseMps,Math.max(p,t)),(o||!s&&!u)&&Math.abs(f)<.08&&(f=0,e.parked=!0),y(e,n,g,f,c);let m=i(Math.tan(e.steeringAngle)*f/d.wheelbaseM,-d.steeringYawRate,d.steeringYawRate);if(n.heading+=m*c,n.vx=Math.sin(n.heading)*f,n.vz=Math.cos(n.heading)*f,e.parked)n.vy=0;else{let e=.75,t=Math.abs(f),r=Math.sin(n.heading)*Math.sign(f),i=Math.cos(n.heading)*Math.sign(f),a=_(l,n.x+r*e,n.z+i*e,n.heading).height,o=_(l,n.x-r*e,n.z-i*e,n.heading).height,s=_(l,n.x,n.z,n.heading).height;n.vy=(a-o)/(2*e)*t,C=(a-2*s+o)/(e*e)*t*t}}else{e.parked=!1,y(e,n,g,Math.hypot(n.vx,n.vz),c);let t=r.gas||r.brake;e.airYawRate=t?g*(r.brake?d.airBrakeTurnRate:d.airTurnRate):0;let a=e.airYawRate*c;if(a){let t=Math.cos(a),r=Math.sin(a),i=n.vx,o=n.vz;n.heading+=a,e.airYaw+=a,n.vx=i*t+o*r,n.vz=o*t-i*r}else if(!t&&g){let e=Math.cos(n.heading),t=-Math.sin(n.heading),r=n.vx*e+n.vz*t,i=Math.sign(g),a=Math.max(0,d.airStrafeMps-r*i),o=i*Math.min(a,Math.abs(g)*d.airStrafeAcceleration*c);n.vx+=e*o,n.vz+=t*o}let o=r.reverse||r.brake?-1:+!!r.gas;if(e.airPitch=i(e.airPitch+o*d.airPitchRate*c,-d.maxAirPitchRadians,d.maxAirPitchRadians),e.boostLevel&&r.gas&&!r.brake&&!r.reverse){let t=Math.hypot(n.vx,n.vz),r=e.rocketBoost?d.rocketMps:d.speedMps*(e.boostLevel===2?d.doubleBoostMultiplier:d.boostMultiplier);if(t<r){let i=Math.min(r,t+(e.rocketBoost?d.rocketAcceleration:d.boostAcceleration)*c);t>1e-8?(n.vx*=i/t,n.vz*=i/t):(n.vx=Math.sin(n.heading)*i,n.vz=Math.cos(n.heading)*i)}}if(m>0){let e=Math.hypot(n.vx,n.vz);if(e>d.speedMps){let t=Math.max(d.speedMps,e-d.airBrakeDeceleration*m);n.vx*=t/e,n.vz*=t/e}}}n.x+=n.vx*c,n.z+=n.vz*c;let w=_(l,n.x,n.z,n.heading),T=Math.hypot(n.x-S.x,n.z-S.z),E=b.height-w.height,D=x&&-E>.18+T*.6;D&&(n.x=S.x,n.z=S.z,n.y=S.y,n.vx=n.vz=n.vy=0,e.parked=!0,w=b);let O=x&&!D&&E>.18+T*.35;O&&(n.vy=S.vy);let k=x?0:r.brake?1:m/c,A=d.gravity+d.airDownAcceleration*k,j=n.y+n.vy*c-.5*A*c*c,ee=x&&!e.parked&&Math.hypot(n.vx,n.vz)>1&&C<-d.gravity*1.15&&j>w.height+1e-5,M=e=>{let t=c+e;return n.y+n.vy*t-.5*d.gravity*t*t-_(l,n.x+n.vx*e,n.z+n.vz*e,n.heading).height},N=ee&&M(.06)>0&&M(.2)>.025,P=!1;if(N&&!O&&Math.hypot(b.forwardSlope,b.rightSlope)<=d.adhesionMaxSlope&&Math.hypot(w.forwardSlope,w.rightSlope)<=d.adhesionMaxSlope&&j-w.height<=.2){let e=Math.hypot(n.vx,n.vz),t=i(e*d.adhesionLookSeconds,d.adhesionMinLookM,d.adhesionMaxLookM);P=!0;let r=0;for(let i of[1/3,2/3,1]){let a=t*i/e,o=c+a,s=_(l,n.x+n.vx*a,n.z+n.vz*a,n.heading),u=n.y+n.vy*o-.5*d.gravity*o*o-s.height;if(r=Math.max(r,u),u>d.adhesionRangeM||b.height-s.height>d.adhesionMaxDropM||Math.hypot(s.forwardSlope,s.rightSlope)>d.adhesionMaxSlope){P=!1;break}}P&&=C>=-(d.gravity+d.adhesionAcceleration)||r<=d.adhesionMicroRangeM}if(x&&!(O||N&&!P))n.y=w.height,n.vy=D?0:(w.height-b.height)/c,n.grounded=!0,e.airTime=0;else if(x&&(e.takeoffPitch=e.pitch,e.takeoffRoll=e.roll,e.airYaw=0,e.airPitch=0,e.airTime=0),e.airTime+=c,n.y=j,n.vy-=A*c,n.grounded=!1,n.y<=w.height){let t=e.airTime>.08?.96:1;n.y=w.height,n.vy=0,n.grounded=!0,n.vx*=t,n.vz*=t,e.airYaw=0,e.airPitch=0}if(v(n,S,l)&&(w=_(l,n.x,n.z,n.heading),n.grounded&&(n.y=w.height)),e.contactHeight=w.height,e.wheelHeights=w.heights,e.wheelOffsets=w.offsets,n.grounded){e.airBrakeRemaining=0,p(e);let t=1-Math.exp(-c*12);e.pitch+=o(w.pitch,e.pitch)*t,e.roll+=o(w.roll,e.roll)*t,e.airYawRate=0,e.airPitch=0,n.airTurn=0}else e.pitch=e.takeoffPitch+e.airPitch,e.roll=e.takeoffRoll,n.airTurn=e.airYawRate?g:0,e.airBrakeRemaining=e.airBrakeRemaining-c>1e-9?e.airBrakeRemaining-c:0;e.speedMps=n.vx*Math.sin(n.heading)+n.vz*Math.cos(n.heading),e.grounded=n.grounded,e.wheelSpin+=e.speedMps*c/d.wheelRadiusM,n.spin=e.wheelSpin,n.downThrust=!n.grounded&&k>0}function x(e,t,n,r,i){if(!Number.isFinite(r)||r<=0)return;let a=Math.min(r,.25),o=0;if(u(e,t,i.rocketTravel),e.usesQueuedInput){for(let n of e.inputQueue)o=Math.max(o,h(e,n,t.grounded||!!n.grounded,n.time)),g(e,n,n.time);e.inputQueue.length=0,(n.brake||n.reverse)&&g(e,n,e.lastInputTime)}else o=h(e,n,t.grounded),g(e,n);o>0&&!t.grounded&&!n.trickIntent&&(t.vy=Math.min(t.vy,-o));let s=Math.max(1,Math.ceil(a*120)),c=a/s;for(let r=0;r<s;r++)b(e,t,n,c,i),e.clock+=c}function S(e,t,n){let i=_(n,t.x,t.z,t.heading),a=e.clock;r(e),Object.assign(t,{y:i.height,vx:0,vy:0,vz:0,grounded:!0,steer:0,airTurn:0,downThrust:!1,lastHit:null}),Object.assign(e,{clock:a,initialized:!0,parked:!0,grounded:!0,pitch:i.pitch,roll:i.roll,takeoffPitch:i.pitch,takeoffRoll:i.roll,contactHeight:i.height,wheelHeights:i.heights,wheelOffsets:i.offsets,wheelSpin:t.spin})}return{LRV_TUNING:t,newLRVDriving:n,resetLRVDriving:r,lrvTurboStatus:c,lrvTravelTiming:l,lrvRocketAccess:d,queueLRVInput:m,stepLRVDriving:x,settleLRVDriving:S}}var{LRV_TUNING:Yd,newLRVDriving:Xd,resetLRVDriving:Zd,lrvTurboStatus:Qd,lrvTravelTiming:$d,lrvRocketAccess:ef,queueLRVInput:tf,stepLRVDriving:nf,settleLRVDriving:rf}=Jd(),af=Object.freeze({accelerationMultiplier:3,microRangeM:.6}),of=Object.freeze({tapSeconds:.22,doubleTapSeconds:.33,groundInitial:20,groundRamp:60,groundMaximum:80,airNudge:.5,airInitial:2,airRamp:6,airMaximum:10});function sf(){return{held:!1,grounded:!0,downAt:0,lastRelease:-1/0,eligible:!1,descent:!1,pendingNudge:0,heldSeconds:0}}function cf(e,t,n){let{brake:r,grounded:i}=t,a=!i&&!t.reverse&&!t.trickIntent;(i!==e.grounded||t.reverse||t.trickIntent)&&(e.lastRelease=-1/0,e.eligible=e.descent=!1,e.pendingNudge=0,e.heldSeconds=0),r&&!e.held?(e.downAt=n,e.heldSeconds=0,e.eligible=a,e.descent=a&&n>=e.lastRelease&&n-e.lastRelease<=of.doubleTapSeconds,e.descent&&(e.pendingNudge+=of.airNudge),e.lastRelease=-1/0):!r&&e.held&&(e.lastRelease=e.eligible&&a&&n-e.downAt>=0&&n-e.downAt<=of.tapSeconds?n:-1/0,e.descent=!1,e.eligible=!1,e.heldSeconds=0),e.held=r,e.grounded=i}function lf(e,t,n){let r={braking:!1,downthrust:!1,descentImpulse:0,descentAcceleration:0,brakeDeceleration:0};if(!Number.isFinite(n)||n<=0)return r;(t.grounded!==e.grounded||t.reverse||t.trickIntent)&&(e.lastRelease=-1/0,e.eligible=e.descent=!1,e.pendingNudge=0,e.heldSeconds=0,e.grounded=t.grounded);let i=t.grounded&&t.brake&&!t.reverse,a=!t.grounded&&t.brake&&e.descent&&!t.trickIntent&&!t.reverse,o=t.grounded?0:e.pendingNudge;e.pendingNudge=0;let s=Math.min(.25,n),c=e.heldSeconds+s/2;return i||a?e.heldSeconds+=s:e.heldSeconds=0,{braking:i,downthrust:a||o>0,descentImpulse:o,descentAcceleration:a?Math.min(of.airMaximum,of.airInitial+of.airRamp*c):0,brakeDeceleration:i?Math.min(of.groundMaximum,of.groundInitial+of.groundRamp*c):0}}function uf(e,t,n,r=0){if(!Number.isFinite(n)||n<=0)return;if(!e.grounded){e.vy-=t.descentImpulse+t.descentAcceleration*n;return}if(!t.braking)return;let i=Math.hypot(e.vx,e.vz),a=Math.max(0,i-Math.max(0,t.brakeDeceleration-r)*n),o=i>0?a/i:0;e.vx*=o,e.vz*=o}function df(e=1.62){let t=Jd({gravity:e,airDownAcceleration:0}),{LRV_TUNING:n,lrvTurboStatus:r,lrvTravelTiming:i,lrvRocketAccess:a}=t,o=Jd({gravity:e,airDownAcceleration:0,adhesionAcceleration:n.adhesionAcceleration*af.accelerationMultiplier,adhesionMicroRangeM:af.microRangeM}),s=new WeakMap;function c(e){let t=s.get(e);return t||(t=sf(),s.set(e,t)),t}let l=(e,t)=>({brake:e.rawBrake??e.brake,reverse:e.reverse,trickIntent:!t&&(!!e.trickIntent||`steer`in e&&!!e.steer||e.airBrakeEligible===!1),grounded:t});function u(){let e=t.newLRVDriving();return s.set(e,sf()),e}function d(e){t.resetLRVDriving(e),s.set(e,sf())}function f(e,n,r){t.settleLRVDriving(e,n,r),s.set(e,sf())}function p(e,n){if(!Number.isFinite(n.time)||n.time<0||n.time<e.lastInputTime)return!1;e.usesQueuedInput||s.set(e,sf());let r=e.inputQueue.length>=64,i=t.queueLRVInput(e,{...n,airBrakeEligible:!1});if(r&&!i){let t=sf();t.held=n.rawBrake??n.brake,s.set(e,t)}else cf(c(e),l(n,n.grounded??e.grounded),n.time);return i}function m(e,r,i,a,s){if(!Number.isFinite(a)||a<=0)return;let u=Math.min(.25,a),d=Math.max(1,Math.ceil(u*120)),f=u/d,p=c(e);for(let a=0;a<d;a++){let a=l(i,r.grounded);e.usesQueuedInput||cf(p,a,e.clock);let c=lf(p,a,f);uf(r,c,f,n.brakeAcceleration),(c.braking?o:t).stepLRVDriving(e,r,{...i,airBrakeEligible:!1},f,s),r.downThrust=!r.grounded&&c.downthrust}}return{LRV_TUNING:n,lrvTurboStatus:r,lrvTravelTiming:i,lrvRocketAccess:a,newLRVDriving:u,resetLRVDriving:d,settleLRVDriving:f,queueLRVInput:p,stepLRVDriving:m}}var{LRV_TUNING:ff,lrvTurboStatus:pf,lrvTravelTiming:mf,lrvRocketAccess:hf,newLRVDriving:gf,resetLRVDriving:_f,settleLRVDriving:vf,queueLRVInput:yf,stepLRVDriving:bf}=df(),xf=Object.freeze({stoppedMps:.08,hopChordSeconds:.12});function Sf(){return{brakeWasDown:!1,reverseEngaged:!1,brakeTrick:!1,leftWasDown:!1,rightWasDown:!1,leftDownAt:-1/0,rightDownAt:-1/0,hopConsumed:!1}}function Cf(e){Object.assign(e,Sf())}function wf(e,t,n,r){let i=t.left||t.right,a=t.brake&&!e.brakeWasDown;(!t.brake||t.gas||!n.grounded)&&(e.reverseEngaged=!1),a&&(e.reverseEngaged=n.grounded&&!t.gas&&n.speed<=xf.stoppedMps),(!t.brake||n.grounded)&&(e.brakeTrick=!1),!n.grounded&&t.brake&&i&&(e.brakeTrick=!0);let o=a&&!n.grounded&&!i&&!t.trick&&!t.reverse,s=t.left&&!e.leftWasDown,c=t.right&&!e.rightWasDown;s&&(e.leftDownAt=r),c&&(e.rightDownAt=r),i||(e.hopConsumed=!1);let l=!1;t.left&&t.right&&(s||c)&&!e.hopConsumed&&(e.hopConsumed=!0,l=n.scooter&&n.grounded&&!t.brake&&Math.abs(e.leftDownAt-e.rightDownAt)<=xf.hopChordSeconds),e.brakeWasDown=t.brake,e.leftWasDown=t.left,e.rightWasDown=t.right;let u=!!t.reverse||e.reverseEngaged,d=!!t.trick||!n.grounded&&t.brake&&e.brakeTrick,f=!n.grounded&&!i&&!d&&!u;return{gas:t.gas,steer:Number(t.right)-Number(t.left),both:t.left&&t.right,left:t.left,right:t.right,reverse:u,special:d,brakeHeld:t.brake,brake:t.brake&&!u&&(n.grounded||f),airBrakeEligible:f,directionHeld:i,hop:l,freshAirBrake:o}}var Tf=Object.freeze({tapWindow:.28,rotationSeconds:.9,barrelRollSeconds:1.05,supermanSeconds:1.25,maxQueuedInputs:64,landingMargin:.12,recoverySeconds:.22}),Ef=Math.PI*2,Df=(e,t=0,n=1)=>Math.max(t,Math.min(n,e)),Of=e=>{let t=Df(e);return t*t*(3-2*t)},kf=e=>e<-.1?-1:+(e>.1),Af=()=>({yaw:0,roll:0,deckYaw:0,bodyPitch:0,bodyY:0,bodyZ:0,legExtension:0,preparation:0,jetYaw:0,jetRoll:0,jetDeck:0}),jf=()=>({active:!1,kind:null,label:``,taps:0,sign:1,progress:0,pose:Af()}),Mf=e=>e===1?`rotation`:e===2?`barrel-roll`:`superman`,Nf=e=>e===`rotation`?Tf.rotationSeconds:e===`barrel-roll`?Tf.barrelRollSeconds:Tf.supermanSeconds,Pf=(e,t,n=1,r=!1)=>({kind:Mf(n),taps:n,sign:e,age:0,wait:r?0:Tf.tapWindow,preparation:0,committed:r,lastPress:t,continuous:r,repeat:r});function Ff(e=`scooter`){return{vehicle:e,inputQueue:[],held:!1,steer:0,awaitRelease:!1,lastInputTime:-1/0,active:null,recovery:null,frame:jf(),completed:0}}function If(e,t=!1,n=e.vehicle){e.vehicle=n,e.inputQueue.length=0,e.held=t,e.steer=0,e.awaitRelease=t,e.lastInputTime=-1/0,e.active=null,e.recovery=null,e.frame=jf()}function Lf(e,t){return!Number.isFinite(t.time)||t.time<e.lastInputTime||!Number.isFinite(t.steer)?!1:(e.lastInputTime=t.time,e.inputQueue.length>=Tf.maxQueuedInputs?(e.inputQueue.length=0,e.held=t.held,e.steer=Df(t.steer,-1,1),e.awaitRelease=t.held,e.active=null,e.recovery=null,e.frame=jf(),!1):(e.inputQueue.push({...t,held:!!t.held,steer:Df(t.steer,-1,1)}),!0))}function Rf(e,t,n){let r=t.held&&!e.held,i=kf(e.steer);if(e.held=t.held,e.steer=t.steer,t.held||(e.awaitRelease=!1),!n||t.grounded){e.active=null,e.recovery=null,e.awaitRelease=t.held;return}let a=kf(t.steer),o=t.held&&!i&&a&&!e.active;if(e.recovery||e.awaitRelease||!r&&!o||!a)return;let s=e.active;if(!s){e.active=Pf(a,t.time);return}if(s.committed)return;if(s.sign!==a||t.time-s.lastPress>Tf.tapWindow){e.active=Pf(a,t.time);return}let c=e.vehicle===`lrv`?2:3;s.taps>=c||(s.taps++,s.kind=Mf(s.taps),s.lastPress=t.time,s.wait=Tf.tapWindow)}function zf(e,t=!1){let n=Df(e.age/Nf(e.kind)),r=(e.continuous?n:Of(n))*Ef,i=Af();if(i.preparation=e.committed?e.preparation*(1-Of(n*6)):e.preparation,i.bodyY=-.035*i.preparation,i.bodyPitch=.07*i.preparation,e.committed&&(e.kind===`rotation`&&(i.yaw=-r*e.sign,i.jetYaw=-e.sign),e.kind===`barrel-roll`&&(i.roll=r*e.sign,i.jetRoll=e.sign),e.kind===`superman`)){let a=e.continuous&&t?e.repeat?1:Of(n/.22):Of(n/.22)*(1-Of((n-.76)/.24));i.deckYaw=-r*e.sign,i.jetDeck=-e.sign,i.bodyPitch=a*Math.PI/2,i.bodyY=a*.82,i.bodyZ=-a*.55,i.legExtension=a}return{active:!0,kind:e.kind,label:e.kind===`rotation`?`SPIN`:e.kind===`barrel-roll`?`BARREL ROLL`:`SUPERMAN`,taps:e.taps,sign:e.sign,progress:n,pose:i}}function Bf(e,t){let n={...e.frame.pose};for(let e of[`yaw`,`roll`,`deckYaw`])n[e]=Math.atan2(Math.sin(n[e]),Math.cos(n[e]));n.jetYaw=-Math.sign(n.yaw),n.jetRoll=-Math.sign(n.roll),n.jetDeck=-Math.sign(n.deckYaw),e.recovery={pose:n,age:0,seconds:t},e.active=null,e.awaitRelease=e.held}function Vf(e,t,n=.56,r=1.62){if(e.grounded)return 0;let i=.05;for(let a=i;a<=3.00000001;a+=i){let o=t(e.x+e.vx*a,e.z+e.vz*a)+n;if(e.y+e.vy*a-.5*r*a*a<=o)return Math.max(0,a-i)}return 1/0}function Hf(e,t,n,r=1/0){n||(e.active=null,e.recovery=null);for(let t of e.inputQueue)Rf(e,t,n);if(e.inputQueue.length=0,n||(e.awaitRelease=e.held),!n)return e.frame=jf();let i=Math.max(0,r-Tf.landingMargin);if(e.active?.kind===`superman`&&e.active.continuous&&!e.held&&Bf(e,Math.min(Tf.recoverySeconds,i)),e.active){let t=e.active;i<t.wait+Nf(t.kind)-t.age&&(t.committed?Bf(e,Math.min(Tf.recoverySeconds,i)):(e.active=null,e.awaitRelease=e.held))}if(e.recovery){let n=e.recovery;n.seconds=Math.min(n.seconds,n.age+i),n.age+=Number.isFinite(t)?Df(t,0,1):0;let r=1-Of(n.age/Math.max(.001,n.seconds));if(r<=0)return e.recovery=null,e.frame=jf();let a={...n.pose};for(let e of Object.keys(a))a[e]*=r;return e.frame={...e.frame,active:!0,label:`LANDING`,pose:a}}if(!e.active)return e.frame=jf();let a=Number.isFinite(t)?Df(t,0,1):0;for(;e.active;){let t=e.active;if(!t.committed){let n=Math.min(t.wait,a);if(t.wait-=n,a-=n,t.preparation=Math.min(1,t.preparation+n/.12),t.wait>1e-9)break;t.committed=!0,t.continuous=e.held}let n=Math.min(Nf(t.kind)-t.age,a);if(t.age+=n,a-=n,t.age<Nf(t.kind)-1e-9)break;e.completed++;let r=kf(e.steer)||t.sign;if(e.active=e.held&&i>=Nf(t.kind)+a?Pf(r,-1/0,t.taps,!0):null,!e.active&&e.held&&(e.awaitRelease=!0),!e.active&&t.kind===`superman`&&t.continuous&&(e.frame=zf(t,!0),Bf(e,Math.min(Tf.recoverySeconds,i))),a<=1e-9)break}return e.frame=e.active?zf(e.active,e.held):e.recovery?{...e.frame,label:`LANDING`}:jf()}var Uf=Object.freeze({expeditionMps:60*.44704,freeRideMps:60*.44704,turboMps:120*.44704,turboAcceleration:20,turboSeconds:4,tapSeconds:.22,doubleTapSeconds:.33}),Wf=Object.freeze({acceleration:16.2,maxSlope:.32,rangeM:1.35,microRangeM:.32,maxDropM:2,lookSeconds:.18,minLookM:4,maxLookM:9});function Gf(e,t,n,r=!1){if(!t.wasGrounded)return!1;let i=Wf,{from:a,oldFloor:o,floor:s,predicted:c,gravity:l,dt:u}=t,d=Math.hypot(e.x-a.x,e.z-a.z),f=o-s;if(-f>.18+d*.6)return e.x=a.x,e.y=a.y,e.z=a.z,e.vx=e.vy=e.vz=0,e.grounded=!0,!0;if(f>.18+d*.35)return e.y=a.y+a.vy*u-.5*l*u*u,e.vy=a.vy-l*u,e.grounded=!1,!0;let p=Math.hypot(e.vx,e.vz);if(p<.01)return!1;if(n(a.x+e.vx/p*.15,a.z+e.vz/p*.15)+.56-o>.27&&c>s)return e.y=s,e.vy=(s-o)/u,e.grounded=!0,!0;if(c<=s+1e-5||c-s>.2)return!1;let m=(e,t)=>Math.hypot((n(e+.75,t)-n(e-.75,t))/1.5,(n(e,t+.75)-n(e,t-.75))/1.5);if(m(a.x,a.z)>i.maxSlope||m(e.x,e.z)>i.maxSlope)return!1;let h=Math.max(i.minLookM,Math.min(i.maxLookM,p*i.lookSeconds)),g=0;for(let t of[1/3,2/3,1]){let r=h*t/p,s=u+r,c=e.x+e.vx*r,d=e.z+e.vz*r,f=n(c,d)+.56,_=a.y+e.vy*s-.5*l*s*s-f;if(g=Math.max(g,_),_>i.rangeM||o-f>i.maxDropM||m(c,d)>i.maxSlope)return!1}let _=e.vx/p*.75,v=e.vz/p*.75;return(n(a.x+_,a.z+v)-2*n(a.x,a.z)+n(a.x-_,a.z-v))/(.75*.75)*p*p<-(l+i.acceleration*(r?af.accelerationMultiplier:1))&&g>(r?af.microRangeM:i.microRangeM)?!1:(e.y=s,e.vy=(s-o)/u,e.grounded=!0,!0)}var Kf=(...e)=>Gf(...e),qf=(...e)=>Gf(...e,!0);function Jf(){return{clock:0,turboRemaining:0,brakes:sf(),gasWasDown:!1,gasDownAt:0,lastGasRelease:-1/0,gasConsumed:!1,inputQueue:[],usesQueuedInput:!1,lastInputTime:-1/0,inputGas:!1,inputBrake:!1,inputReverse:!1,inputGrounded:!0,inputTrickIntent:!1}}function Yf(e){Object.assign(e,Jf())}function Xf(e,t){return!Number.isFinite(t.time)||t.time<0||t.time<e.lastInputTime||(e.usesQueuedInput||(e.inputGas=e.gasWasDown,e.inputBrake=e.brakes.held,e.lastGasRelease=-1/0,e.brakes=sf(),e.gasConsumed=!0),e.lastInputTime=t.time,e.usesQueuedInput=!0,t.gas===e.inputGas&&t.brake===e.inputBrake&&t.reverse===e.inputReverse&&t.grounded===e.inputGrounded&&!!t.trickIntent===e.inputTrickIntent)?!1:(e.inputGas=t.gas,e.inputBrake=t.brake,e.inputReverse=t.reverse,e.inputGrounded=t.grounded,e.inputTrickIntent=!!t.trickIntent,e.inputQueue.length>=64?(e.inputQueue.length=0,e.gasWasDown=t.gas,e.gasDownAt=t.time,e.lastGasRelease=-1/0,e.brakes=sf(),e.brakes.held=t.brake,e.gasConsumed=!0,e.turboRemaining=0,!1):(e.inputQueue.push({...t}),!0))}function Zf(e,t,n,r){let i=Uf,a=t.brake||t.reverse;if(cf(e.brakes,{...t,grounded:n},r),a&&(e.turboRemaining=0,e.lastGasRelease=-1/0,e.gasConsumed=!0),t.gas&&!e.gasWasDown){e.gasDownAt=r,e.gasConsumed=a;let t=r-e.lastGasRelease;!e.gasConsumed&&t>=0&&t<=i.doubleTapSeconds&&(e.turboRemaining=i.turboSeconds,e.gasConsumed=!0),e.lastGasRelease=-1/0}else if(!t.gas&&e.gasWasDown){let t=r-e.gasDownAt;e.lastGasRelease=!e.gasConsumed&&!a&&t>=0&&t<=i.tapSeconds?r:-1/0,e.gasConsumed=!1}e.gasWasDown=t.gas}function Qf(e,t,n,r){if(!Number.isFinite(r)||r<=0)return{...lf(e.brakes,{...t,grounded:n},0),turbo:e.turboRemaining>0};if(e.usesQueuedInput){for(let t of e.inputQueue)Zf(e,t,t.grounded,t.time);e.inputQueue.length=0,(t.brake||t.reverse)&&(e.turboRemaining=0,e.lastGasRelease=-1/0,e.gasConsumed=!0)}else Zf(e,t,n,e.clock);let i=Math.min(.25,r);return e.turboRemaining=Math.max(0,e.turboRemaining-i),e.clock+=i,{...lf(e.brakes,{...t,grounded:n},i),turbo:e.turboRemaining>0}}function $f(e,t,n,r,i){uf(t,n,i)}var ep={scooter:{id:`scooter`,name:`Scooter`,halfWidthM:.32,halfLengthM:.65,rideHeightM:.56,cameraDistance:7},lrv:{id:`lrv`,name:`Lunar rover`,halfWidthM:1.22,halfLengthM:1.57,rideHeightM:.55,cameraDistance:9}},tp=e=>Math.hypot(e.halfWidthM,e.halfLengthM),np={...ep,perseverance:{id:`perseverance`,name:`Perseverance`,halfWidthM:1.35,halfLengthM:1.57,rideHeightM:.55,cameraDistance:9}},rp=e=>e===`scooter`||e===`lrv`?e:`perseverance`,ip=e=>e===`scooter`?`scooter`:`lrv`;function ap(e,t,n){let r=n?Math.hypot(n.x-e.x,n.z-e.z):0,i=Math.min(e.x-t.west,t.east-e.x,-e.z-t.south,t.north+e.z);return{seconds:r>=600&&i>=250?Math.min(30,Math.max(4,(r-150)/(120*.44704))):4,approaching:r<=150||i<=150}}var op=Object.freeze({tapNudgeMps:.4,tapAcceleration:4,holdDelay:.12,holdRamp:.18,descentMaximum:60,descentSpeedMps:24,cutDeceleration:160});function sp(){return{held:!1,grounded:!0,downAt:0,lastRelease:-1/0,lastTime:-1/0,eligible:!1,heldSeconds:0,pendingLower:0,pendingCut:!1,cutTarget:1/0,thrust:0,lowering:!1}}function cp(e,t,n,r,i,a){if(!(!Number.isFinite(r)||r<e.lastTime)){if(e.lastTime=r,n!==e.grounded&&(e.lastRelease=-1/0,e.eligible=!1,e.heldSeconds=0,e.pendingLower=0,e.pendingCut=!1,e.cutTarget=1/0),t&&!e.held){e.downAt=r,e.heldSeconds=0;let t=!n&&r-e.lastRelease<=of.doubleTapSeconds;e.eligible=!n&&!t,n||(e.pendingLower=Math.min(1.6,e.pendingLower+op.tapNudgeMps)),t&&(e.pendingCut=!0,e.cutTarget=Math.min(a,i)),e.lastRelease=-1/0}else!t&&e.held&&(e.lastRelease=!n&&e.eligible&&r-e.downAt<=of.tapSeconds?r:-1/0,e.eligible=!1,e.heldSeconds=0);e.held=t,e.grounded=n}}function lp(e,t,n,r){if(e.thrust=0,e.lowering=!1,t.grounded||!Number.isFinite(r)||r<=0)return;let i=Math.min(.25,r),a=Math.hypot(t.vx,t.vz),o=e.pendingCut||Number.isFinite(e.cutTarget)&&a>e.cutTarget;(e.held||e.pendingLower||o)&&(n.boostLevel=0,n.boostRemaining=0,n.rocketBoost=!1,n.rocketThrust=0,n.rocketCoasting=!1,n.lastShortRelease=-1/0,n.triggerPress=!0);let s=Math.min(e.pendingLower,op.tapAcceleration*i);t.vy-=s,e.pendingLower-=s,e.lowering=s>0;let c=e.heldSeconds+i/2,l=Math.max(0,c-op.holdDelay),u=Math.min(1,l/op.holdRamp),d=u*u*(3-2*u);e.held&&(e.heldSeconds+=i,d>0&&(t.vy>-op.descentSpeedMps&&(t.vy=Math.max(-op.descentSpeedMps,t.vy-op.descentMaximum*d*i)),e.lowering=!0));let f=o?Math.max(e.cutTarget,a-op.cutDeceleration*i):a;a>0&&(t.vx*=f/a,t.vz*=f/a,e.thrust=Math.min(1,(a-f)/i/of.groundMaximum)),f<=e.cutTarget&&(e.cutTarget=1/0),e.pendingCut=!1}function up(e,t=su){let{ground:n,solids:r,bounds:i}=e,a=Zu(),o=df(t),s=o.newLRVDriving(),c=Sf(),l=Jf(),u=sp(),d=ed(),f=`perseverance`,p=Ff(`lrv`),m=!1,h=4,g={gravity:t,height:n,collide:(e,t,n,i)=>Yu(e,t,n,i,r,()=>[]),constrain:()=>{},acceleration:13,drag:.18,maxSpeed:Uf.expeditionMps,slopeGravity:.3,landingRetention:.94,hopSpeed:5.6,diveJolt:7,downAcceleration:3,gasDoubleTap:!1,letters:[],letterWord:``,groundContact:Kf},_=kd(!1,g),v=(e,t)=>{let n=wf(c,e,{grounded:a.grounded,speed:Math.hypot(a.vx,a.vz),scooter:f===`scooter`},t);return n.freshAirBrake&&If(p,!1,ip(f)),n.hop&&Ld(_,a),f===`lrv`?{...n,special:!1,brake:n.brakeHeld&&!n.reverse,airBrakeEligible:!a.grounded&&!n.reverse}:n},y=e=>f===`lrv`&&!a.grounded?{...e,gas:e.gas&&!e.brakeHeld&&!Number.isFinite(u.cutTarget),brake:e.brakeHeld||Number.isFinite(u.cutTarget),rawBrake:e.brakeHeld,airBrakeEligible:!1,trickIntent:!1}:{...e,rawBrake:e.brakeHeld,trickIntent:!a.grounded&&(e.special||e.directionHeld&&e.brakeHeld)},b=e=>({gas:e.gas,brake:e.brakeHeld,reverse:e.reverse,trickIntent:e.special||!a.grounded&&e.directionHeld});function x(){Object.assign(u,sp()),Cf(c),o.resetLRVDriving(s),Yf(l),If(p,!1,ip(f)),_=kd(!1,g),d=ed(),a.downThrust=!1,m=!1,h=4}function S(e){x(),Object.assign(a,e,{heading:e.heading??0,y:n(e.x,e.z)+np[f].rideHeightM,vx:0,vy:0,vz:0,grounded:!0,spin:0,steer:0,airTurn:0,lastHit:null}),f!==`scooter`&&o.settleLRVDriving(s,a,{height:n,solids:r})}return{buggy:a,lrv:s,airBrakes:u,scooterDrive:l,environment:g,rover:o,get scooterBoostSeconds(){return h},get scooter(){return d},get tricks(){return p},get vehicle(){return f},get profile(){return np[f]},reset:x,place:S,switchVehicle(e,t){f=e,p=Ff(ip(e)),S(t)},capture(e,t){let n=v(e,t);f===`lrv`&&cp(u,n.brakeHeld,a.grounded,t,Math.hypot(a.vx,a.vz),o.LRV_TUNING.speedMps),f===`scooter`?Xf(l,{...b(n),grounded:a.grounded,time:t}):o.queueLRVInput(s,{...y(n),grounded:a.grounded,time:t}),f!==`lrv`&&Lf(p,{held:n.special,steer:n.steer,grounded:a.grounded,time:t})},step(e,c,x,S){let C=v(e,x);f===`lrv`&&(cp(u,C.brakeHeld,a.grounded,x,Math.hypot(a.vx,a.vz),o.LRV_TUNING.speedMps),lp(u,a,s,c));let w=Hf(p,c,!a.grounded,p.active||p.recovery||p.inputQueue.some(e=>e.held)?Vf(a,n,np[f].rideHeightM,t):1/0).active?0:C.steer;if(f!==`scooter`)o.stepLRVDriving(s,a,{...y(C),steer:w},c,{height:n,solids:r,rocketTravel:{bounds:i,target:S}});else{let e=l.turboRemaining,t=Qf(l,b(C),a.grounded,c),n=ap(a,i,S);t.turbo&&l.turboRemaining>e&&(h=n.seconds,m=n.seconds>4,l.turboRemaining=n.seconds-c),m&&n.approaching&&(l.turboRemaining=0,t.turbo=!1),t.turbo||(m=!1),$f(l,a,t,C.brake,c),g.groundContact=t.braking?qf:Kf;let r=t.turbo?Uf.turboMps:Uf.expeditionMps;g.maxSpeed=Math.max(r,Math.hypot(a.vx,a.vz)-4*c),g.acceleration=t.turbo?Uf.turboAcceleration:13,a.grounded&&!C.gas&&!C.reverse&&Math.hypot(a.vx,a.vz)<.3&&(a.heading-=C.steer*1.8*c),Gd(_,d,a,{...C,special:!1,steer:w,gas:C.gas&&!C.brake&&!t.braking,reverse:C.reverse&&!C.brake},c),d.down=a.downThrust=!a.grounded&&t.downthrust}return f===`lrv`&&(a.downThrust=!a.grounded&&u.lowering),a.grounded&&Hf(p,0,!1),C}}}function dp(e,t){let n=new X({color:6584192,metalness:.7,roughness:.35}),r=new fr({color:7657983,transparent:!0,opacity:.8,depthWrite:!1}),i=new fr({color:14875391,transparent:!0,opacity:.95,depthWrite:!1}),a=[];for(let o of[`jetYaw`,`jetRoll`,`jetDeck`])for(let s of[-1,1]){let c=new Y;c.name=`apollo-${o}-${s}`;let l=new J(new Xi(.035,.045,.075,8),n);c.add(l);let u=new Y;u.name=`maneuvering-flame`;for(let[e,t,n]of[[.052,.3,r],[.025,.21,i]]){let r=new J(new Zi(e,t,8),n);r.position.y=.04+t/2,u.add(r)}c.add(u),(o===`jetDeck`?t:e).add(c),o===`jetRoll`?c.position.set(s*.24,.12,-.16):c.position.set(s*.17,-.23,o===`jetDeck`?-.48:-.18),c.visible=!1,a.push({mount:c,flame:u,axis:o,side:s})}return{jets:a,update(e){for(let t of a){let n=e?.[t.axis]??0;if(t.mount.visible=Math.abs(n)>.01,!t.mount.visible)continue;let r=Math.sign(n)*t.side;t.mount.rotation.set(t.axis===`jetRoll`?0:r*Math.PI/2,0,t.axis===`jetRoll`&&r>0?Math.PI:0);let i=.94+.06*Math.sin(((e?.yaw??0)+(e?.roll??0)+(e?.deckYaw??0))*13);t.flame.scale.set(1,Math.abs(n)*i,1)}}}}function fp(e,t,n,r,i,a){let o=new Y;o.name=a,e.add(o);let s=new J(new ka(i*1.12,12,10),t),c=new Y;c.name=a+`-end`,o.add(s,c);let l=[n,r].map(e=>{let n=new J(new Xi(i*.85,i,e,12),t);return n.castShadow=n.receiveShadow=!0,o.add(n),n}),u=new U,d=new U,f=new U,p=new U,m=new U,h=new U;return{root:o,end:c,joint:s,segments:l,update:(e,t,i)=>{p.copy(t).sub(e);let a=mt.clamp(p.length(),Math.abs(n-r)+.001,n+r-.001);d.copy(p).normalize(),f.copy(i).addScaledVector(d,-i.dot(d)),f.lengthSq()<1e-8&&f.set(0,0,1).addScaledVector(d,-d.z),f.normalize();let o=(n**2-r**2+a**2)/(2*a);u.copy(e).addScaledVector(d,o).addScaledVector(f,Math.sqrt(Math.max(0,n**2-o**2))),h.copy(e).addScaledVector(d,a),s.position.copy(u),c.position.copy(h);for(let t=0;t<2;t++){let n=t===0?e:u,r=t===0?u:h;p.copy(r).sub(n),m.copy(n).add(r).multiplyScalar(.5),l[t].position.copy(m),l[t].quaternion.setFromUnitVectors(new U(0,1,0),p.normalize())}}}}var pp=new U;function mp(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;pp.copy(t),pp[r]=0,pp.normalize();let l=.5*o/(o+s),u=1-pp.angleTo(e)/c;return Math.sign(pp[n])===1?u*l:s/(o+s)+l+l*(1-u)}var hp=class e extends Br{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new U,c=new U,l=new U(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new U,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=mp(m,c,`z`,`y`,i,n),f[a+1]=1-mp(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-mp(m,c,`z`,`y`,i,n),f[a+1]=1-mp(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-mp(m,c,`x`,`z`,i,e),f[a+1]=mp(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-mp(m,c,`x`,`z`,i,e),f[a+1]=1-mp(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-mp(m,c,`x`,`y`,i,e),f[a+1]=1-mp(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=mp(m,c,`x`,`y`,i,e),f[a+1]=1-mp(m,c,`y`,`x`,i,t);break}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},gp={grin:{glyph:`😀`,label:`Grin`},wink:{glyph:`😉`,label:`Wink`},cool:{glyph:`😎`,label:`Cool`},melt:{glyph:`🫠`,label:`Melt`},alien:{glyph:`👽`,label:`Alien`},robot:{glyph:`🤖`,label:`Robot`},cat:{glyph:`😺`,label:`Cat`},ghost:{glyph:`👻`,label:`Ghost`},pumpkin:{glyph:`🎃`,label:`Pumpkin`},poop:{glyph:`💩`,label:`Poop`}};({...Object.fromEntries(Object.entries(gp).map(([e,t])=>[e,t.label]))});var _p=[`classic`,`expedition`,`eagle`,`car`,...Object.keys(gp)],vp=`astra.pilot.v1`,yp={ivory:14079435,slate:5860480,orange:12942146,teal:4750712,rose:9988729,gold:10254398,blue:5610416,coral:14252643,smoke:3425876,green:7508331},bp=yp,xp=yp,Sp=yp,Cp={apollo:`Apollo`,emu:`EMU`,orlan:`Orlan`},wp={name:``,accent:`amber`,face:`classic`,badge:`ASTRA`,design:`apollo`,suit:`ivory`,patch:`gold`,visor:`gold`};function Tp(e){let t={...wp};if(!e||typeof e!=`object`)return t;let n=e;typeof n.name==`string`&&(t.name=n.name.replace(/[\u0000-\u001f\u007f]/g,``).trim().slice(0,24));for(let[e,r]of Object.entries({accent:[`amber`,`ivory`,`teal`],face:_p,design:Object.keys(Cp),badge:[`ASTRA`,`SURVEY`],suit:Object.keys(bp),patch:Object.keys(xp),visor:Object.keys(Sp)}))r.includes(n[e])&&(t[e]=n[e]);return n.design===`aces`&&(t.design=`emu`),n.design===`sokol`&&(t.design=`orlan`),t}function Ep(){try{let e=localStorage.getItem(vp);return e?Tp(JSON.parse(e)):null}catch{return null}}function Dp(){let e=Ep()??wp;return{design:e.design,suit:bp[e.suit],patch:xp[e.patch],visor:Sp[e.visor]}}function Op(e,t,n,r=0,i=0,a=0){let o=new J(t,n);return o.position.set(r,i,a),o.castShadow=o.receiveShadow=!0,e.add(o),o}function kp(e,t,n,r,i,a,o,s){return Op(e,new hp(a,o,s,2,Math.min(a,o,s)*.16),t,n,r,i)}function Ap(e,t,n,r,i,a){let o=new U(...n),s=new U(...r).clone().sub(o),c=s.length(),l=[new H(0,0)];for(let e=0;e<=16;e++){let t=e/16,n=i+(a-i)*t,r=Math.sin(t*Math.PI*10)*.0025*Math.sin(t*Math.PI);l.push(new H(n*(.94+.09*Math.sin(t*Math.PI))+r,t*c))}l.push(new H(0,c));let u=Op(e,new Da(l,16),t);return u.position.copy(o),u.quaternion.setFromUnitVectors(new U(0,1,0),s.normalize()),u}function jp(e,t,n,r,i){let a=t.userData.suitMaterial,o=t.userData.trimMaterial;Op(e,new ka(.084,16,12),a,...n),Ap(e,a,n,r,.083,.072),Ap(e,a,r,i,.071,.052),Op(e,new ka(.073,16,12),a,...r);let s=new U(...r),c=new U(...i),l=c.clone().sub(s),u=Op(e,new Xi(.055,.056,.034,16),o);u.position.copy(c).addScaledVector(l,-.08),u.quaternion.setFromUnitVectors(new U(0,1,0),l.normalize()),Op(e,new ka(.061,16,12),a,...i).scale.set(.88,1.25,.8)}function Mp(e,t=Dp()){let n=new Y,r=new Y,i=new Y;r.name=`suit`,i.name=`suit-trim`,n.add(r,i);let a=new Y;a.name=`patches`,n.add(a);let o=new X({color:t.suit,roughness:.91}),s=new X({color:t.patch,roughness:.72}),c=o.clone();c.color.multiplyScalar(.64);let l=new X({color:3620416,roughness:.96}),u=new X({color:t.visor,metalness:.72,roughness:.21});n.userData.suitMaterial=o,n.userData.trimMaterial=s;let d=t.design??`apollo`,f=e?.64:.83,p=Op(r,new Da([new H(.135,0),new H(.165,.07),new H(.172,.16),new H(d===`orlan`?.225:.215,.34),new H(.2,.43),new H(.125,.49)],24),o,0,f,0);p.scale.z=.74,p.name=`pressure-torso`,Op(r,new ka(.17,20,12),o,0,f+.015,0).scale.set(1.1,.64,.78);let m=(e,t,n,r=c)=>{let i=Op(e,new Aa(n,.009,6,24),r,0,t,0);return i.rotation.x=Math.PI/2,i},h=m(i,f+.1,.165);h.scale.y=.76;let g=kp(r,o,0,f+.29,-.205,d===`orlan`?.39:.33,d===`emu`?.59:.54,.2);g.name=`backpack`,kp(i,c,0,f+.29,-.312,.25,.4,.012);for(let e of[-.135,.135])kp(i,s,e,f+.29,-.322,.018,.43,.014);if(d===`apollo`&&kp(i,o,0,f+.62,-.2,.3,.14,.19),d===`orlan`)for(let e of[f+.12,f+.44])kp(i,s,.2,e,-.2,.025,.055,.14);Op(r,new Xi(.125,.14,.055,24),c,0,f+.5,0);let _=new Y;_.name=`helmet`,_.position.set(0,f+.66,.005),_.scale.setScalar(.94),r.add(_),Op(_,new ka(.185,32,24),o).scale.set(1,1.1,1.02);let v=Op(_,new ka(.194,32,12,0,Math.PI*2,.94,.14),c,0,0,.002);v.rotation.x=Math.PI/2,v.scale.set(.91,1,.88);let y=Op(_,new ka(.191,32,20,0,Math.PI*2,0,.98),u,0,.006,.006);if(y.rotation.x=Math.PI/2,y.scale.set(.91,1,.88),Op(_,new ka(.189,24,10,0,Math.PI*2,.32,.28),o).scale.set(1,1.1,1.02),d===`emu`)for(let e of[-.145,.145])kp(_,o,e,.08,.05,.065,.07,.12),Op(_,new Yi(.019,16),l,e,.08,.112);for(let t of[-1,1]){let i=t*.135;if(e)Ap(r,o,[i,f,0],[i,.35,.4],.1,.082),Ap(r,o,[i,.35,.4],[i,.11,.67],.082,.065),kp(r,o,i,.07,.73,.16,.14,.27),jp(r,n,[t*.23,f+.42,0],[t*.3,f+.16,.22],[t*.14,f+.12,.43]);else{let e=new Y;e.name=t<0?`left-leg`:`right-leg`,e.position.set(i,f,0),r.add(e),Ap(e,o,[0,0,0],[0,.43-f,0],.1,.082),Ap(e,o,[0,.43-f,0],[0,.12-f,.035],.08,.066),Op(e,new ka(.082,16,12),o,0,.43-f,0).scale.set(1,.9,.94);for(let t of[.38,.41,.46])m(e,t-f,.08);let n=kp(e,o,0,.085-f,.085,.16,.135,.255);n.name=`boot`,kp(e,l,0,.017-f,.087,.165,.034,.26),kp(e,s,0,.19-f,.036,.133,.032,.145),kp(e,o,0,.58-f,.091,.115,.13,.029),kp(e,s,0,.65-f,.108,.1,.02,.01)}}if(d===`apollo`){kp(i,o,0,f+.31,.172,.22,.115,.055),kp(i,c,0,f+.33,.203,.16,.035,.01);for(let e of[-.085,.085]){let t=Op(i,new Xi(.024,.024,.028,16),s,e,f+.18,.15);t.rotation.x=Math.PI/2,Op(i,new ja(new ca([new U(e,f+.18,.18),new U(e*1.9,f+.08,.18),new U(e*2,f+.02,.02),new U(e*1.7,f+.13,-.17)]),20,.014,6,!1),c)}}else if(d===`emu`){kp(i,o,0,f+.34,.17,.28,.17,.07),kp(i,c,-.045,f+.36,.21,.105,.045,.012);for(let e of[.04,.085])Op(i,new ka(.014,10,8),s,e,f+.34,.218);for(let e of[-1,1]){let t=Op(i,new Xi(.094,.094,.045,20),c,e*.216,f+.4,0);t.rotation.z=Math.PI/2}}else kp(i,o,.035,f+.29,.175,.25,.18,.06),kp(i,c,.055,f+.32,.211,.13,.045,.014),Op(i,new Yi(.026,20),s,-.105,f+.33,.17),kp(i,s,-.125,f+.37,.135,.025,.19,.026);return kp(a,s,-.1,f+.44,.13,.065,.042,.018).name=`chest-patch`,n}var Np=new X({color:11845312,metalness:.7,roughness:.38}),Pp=new X({color:2304813,roughness:.85}),Fp=new X({color:12884828,metalness:.4,roughness:.5});function Ip(e,t,n,r,i,a,o,s=Np){let c=new J(new Br(i,a,o),s);return c.position.set(t,n,r),c.castShadow=c.receiveShadow=!0,e.add(c),c}function Lp(e,t,n,r=.025,i=Np){let a=new U(...t),o=new U(...n),s=o.clone().sub(a),c=new J(new Xi(r,r,s.length(),10),i);return c.position.copy(a.add(o).multiplyScalar(.5)),c.quaternion.setFromUnitVectors(new U(0,1,0),s.normalize()),c.castShadow=!0,e.add(c),c}function Rp(){let e=new Y,t=new Y,n=new Y,r=new Y,i=Mp(!1);e.add(t),t.add(n,r),n.position.z=r.position.z=.48,Ip(n,0,-.29,-.48,.29,.1,1.12,Pp),Ip(n,0,-.34,-.48,.23,.06,.9,Np);let a=[];for(let e of[-.53,.53]){let t=new J(new Aa(.15,.045,10,24),Pp);t.rotation.y=Math.PI/2,t.position.set(0,-.37,e-.48),(e>0?r:n).add(t),t.castShadow=!0,a.push(t),Lp(e>0?r:n,[-.08,-.37,e-.48],[.08,-.37,e-.48],.05)}Lp(r,[0,-.34,0],[0,1.03,-.1],.035),Ip(r,0,-.08,-.025,.11,.1,.1,Fp),Lp(r,[-.31,1.03,-.1],[.31,1.03,-.1],.035),Lp(r,[-.32,1.03,-.1],[-.19,1.03,-.1],.05,Pp),Lp(r,[.19,1.03,-.1],[.32,1.03,-.1],.05,Pp),i.position.set(0,-.22,-.17);let o=[],s=[-1,1].map(e=>{let t=new Y;t.name=e<0?`left-arm`:`right-arm`,i.add(t),o.push(t);let n=fp(t,i.userData.suitMaterial,.38,.38,.068,`scooter-arm`),r=new J(new ka(.062,12,10),i.userData.suitMaterial);return r.scale.set(.88,1.25,.8),n.end.add(r),n}),c=i.getObjectByName(`left-leg`),l=i.getObjectByName(`right-leg`),u=[c,l].map(e=>{let t=e.getObjectByName(`boot`).clone();e.children.forEach(e=>e.visible=!1);let n=fp(e,i.userData.suitMaterial,.4,.35,.082,`scooter-leg`);t.position.set(0,-.045,.05),n.end.add(t);let r=new J(new Br(.165,.034,.26),new X({color:3620416,roughness:.96}));return r.position.set(0,-.115,.05),n.end.add(r),n});e.add(i);let d=new U,f=new U,p=new U,m=new U,h=new U,g=(t=0,a=0,c=1,l=!1,g=0,_=1)=>{e.updateMatrixWorld(!0);for(let e=0;e<2;e++){let v=e===0?-1:1,y=a===1||(c>0?e===0:e===1)?t:t*(1-_);d.set(v*.25,1.03,-.1),r.localToWorld(d),i.worldToLocal(d),f.set(v*.155,-.23,-.55),n.localToWorld(f),i.worldToLocal(f),y>0&&d.lerp(f,y),p.set(v*.23,1.25,0),m.set(v*.4,-.45,-.5),s[e].update(p,d,m),o[e].rotation.set(0,0,0),h.set(v*.135,-.21+(l&&e===0?.25:0),-.51+(l&&e===0?-.25:0)),n.localToWorld(h),i.worldToLocal(h),u[e].root.parent.worldToLocal(i.localToWorld(h)),h.lerp(new U(0,-.7,.035),g),u[e].update(new U,h,new U(v*.12,.15,1))}},_=new Y;for(let e of[-.14,.14]){let t=new J(new Xi(.045,.065,.1,10),Np);t.position.set(e,-.21,-.12),_.add(t);let n=new J(new Zi(.07,.65,10),new fr({color:11132927,transparent:!0,opacity:.8,depthWrite:!1}));n.position.set(e,.16,-.12),_.add(n)}e.add(_),_.visible=!1;let v=[];for(let e of[-1,1]){let t=new Y;t.name=e<0?`suit-thruster-left`:`suit-thruster-right`,t.position.set(e*.3,1.1,-.18);let n=Ip(t,0,0,0,.1,.12,.12);n.material=Np;let r=new J(new Zi(.09,.55,12),new fr({color:10414847,transparent:!0,opacity:.8,depthWrite:!1}));r.rotation.z=-e*Math.PI/2,r.position.x=e*.3,t.add(r),i.add(t),v.push(t)}let y=new Y;y.name=`board-trick-thrusters`;for(let e of[-1,1]){Ip(y,e*.16,-.29,-.48,.08,.1,.15);let t=new J(new Zi(.075,.5,12),new fr({color:8380415,transparent:!0,opacity:.85,depthWrite:!1}));t.rotation.x=e*Math.PI/2,t.position.set(e*.16,-.29,-.48+e*.28),y.add(t)}n.add(y);let b=dp(e,n),x=new X({color:4527899,emissive:16721211,emissiveIntensity:0,roughness:.3}),S=new X({color:1194792,emissive:3800969,emissiveIntensity:0,roughness:.3});for(let e of[-.1,.1]){let t=Ip(n,e,-.23,-1.065,.075,.065,.035,x);t.name=e<0?`brake-light-left`:`brake-light-right`}let C=Ip(n,0,-.23,-1.067,.065,.065,.037,S);C.name=`go-light`;let w=Ip(r,0,1.045,-.14,.12,.045,.055,S);return w.name=`go-indicator`,{root:e,update:(s,u,d,f,p,m=!1,h=!1,C)=>{b.update(u?C:void 0),x.emissiveIntensity=u&&h?4:0,S.emissiveIntensity=u&&m?3:0,v.forEach((e,t)=>{e.visible=u&&Math.abs(s.turnJet??0)>.03&&(t===0?(s.turnJet??0)<0:(s.turnJet??0)>0),e.scale.setScalar(.85+.15*Math.sin(f*3))}),y.visible=u&&!!s.trick&&(s.move?.kind!==`grab`||s.move.age>.32),i.visible=u,_.visible=u&&d,e.rotation.set(0,0,0),t.rotation.set(0,0,0),t.position.set(0,0,0),n.rotation.set(0,0,0),n.position.y=r.position.y=0,r.rotation.set(0,p*.4,0),i.position.set(0,-.22,-.17),i.rotation.set(0,0,0),o.forEach(e=>e.rotation.set(0,0,0)),c.rotation.set(0,0,0),l.rotation.set(0,0,0),u&&s.manual&&(e.rotation.x=-.14,e.rotation.z=(s.balance??0)*.15,o[0].rotation.set(-.4,0,1.1),c.rotation.set(-.65,0,-.4),i.rotation.x=.12);let w=s.trick?Math.max(0,Math.min(1,(s.age-(s.move?.24:0))/(s.duration-(s.move?.24:0)))):0,T=w*w*(3-2*w),E=T*Math.PI*2*(s.move?.rotations??1),D=Math.sin(w*Math.PI);if(u&&s.trick){i.position.y+=D*.46;let t=s.move?.axis??(s.trick.includes(`tailwhip`)||s.trick===`Tailwhip`?`deck`:s.trick.includes(`spin`)?`yaw`:`flip`),a=s.move?.sign??(s.trick===`Tailwhip`||s.trick===`360 spin`||s.trick===`Backflip`?1:-1);if(t===`deck`&&(n.rotation.y=E*a),t===`yaw`&&(e.rotation.y=E*a),(t===`flip`||t===`bar`||t===`cork`||t===`rodeo`)&&(e.rotation.x=E*a),t===`bar`&&(n.rotation.y=E*a,r.rotation.y+=T*Math.PI*2),(t===`cork`||t===`rodeo`)&&(e.rotation.y=E*a),t===`rewind`&&(n.rotation.y=Math.sin(w*Math.PI)*Math.PI*2*a,r.rotation.y-=Math.sin(w*Math.PI)*Math.PI*2*a),t===`grab`&&s.move){let t=wd(s.move);e.rotation.set(t.pitch,t.yaw,t.roll),n.rotation.y=t.deck,r.rotation.y=t.bars,i.position.y=-.22+t.extent*.2,i.rotation.x=t.pitch*.3,c.rotation.set(-t.extent*(s.move.slot===`LRR`?1.4:.6),0,t.roll*2),o[0].rotation.set(-t.pitch,.2*t.extent,t.extent*(s.move.sign>0?1.2:-.3)),o[1].rotation.set(-t.pitch,-.2*t.extent,t.extent*(s.move.sign<0?-1.2:.3)),s.move.slot===`LLR`&&(e.rotation.x=0,i.rotation.x=t.extent*1.25,i.position.y=-.22+t.extent*.9,i.position.z=-.17-t.extent*.65,c.rotation.x=0)}if(s.move?.variant&&!s.move.secret){let e=wd({...s.move,age:dd+.18,releasing:!1});i.rotation.x=e.pitch*D*.3,c.rotation.set(-D*(s.move.slot===`LRR`?1.4:.6),0,e.roll*D*2),o[0].rotation.set(-e.pitch*D,.2*D,D*(s.move.sign>0?1.2:-.3)),o[1].rotation.set(-e.pitch*D,-.2*D,D*(s.move.sign<0?-1.2:.3)),s.move.slot===`LLR`&&(i.rotation.x=D*1.25,i.position.z=-.17-D*.65)}}if(u&&s.trick&&s.move?.tree){let t=s.move,a=Td(t),u=Dd(t)*t.sign;if(e.rotation.set(t.kind===`spin`&&t.axis===`flip`?-u:0,0,a.rootRoll+(t.kind===`spin`&&t.axis===`roll`?u:0)),n.rotation.set(0,0,0),r.rotation.set(0,0,0),i.position.set(0,-.22+a.bodyY,-.17+a.bodyZ),i.rotation.set(a.pitch,0,a.roll),o[0].rotation.set(a.armLX,a.armLY,a.armL),o[1].rotation.set(a.armRX,a.armRY,a.armR),c.rotation.set(a.leg,0,0),l.rotation.set(a.leg,0,0),t.tree===`board`){let e=Math.max(0,Math.min(1,-a.bodyY/.7));i.position.set(0,-.22-.18*e,-.17+.04*e),i.rotation.set(.12*e,0,0),n.position.y=r.position.y=.45*e,c.rotation.set(0,0,0),l.rotation.set(0,0,0);let o=Math.max(0,Math.min(1,(1.55-(t.sign>0?a.armRX:a.armLX))/2.8));g(e,Math.min(2,t.stage??1),t.sign,!1,0,o)}else{if((t.stage??1)>=2){let e=Math.max(0,Math.min(1,(a.pitch-Math.PI/2)/(Math.PI/2)));i.position.z-=.47*e,i.position.y-=.05*e}g(0,0,1,!1,Math.max(0,Math.min(1,Math.abs(a.pitch)/(Math.PI/2))))}t.kind===`spin`&&t.age>.32&&v.forEach(e=>e.visible=!0)}u&&C?(e.rotation.set(0,C.yaw,C.roll),n.rotation.y=C.deckYaw,r.rotation.set(0,0,0),i.position.set(0,-.22+C.bodyY,-.17+C.bodyZ),i.rotation.set(C.bodyPitch,0,0),c.rotation.set(0,0,0),l.rotation.set(0,0,0),g(0,0,1,!1,C.legExtension),y.visible=!1):(u&&s.trick&&s.move?.tree||g(0,0,1,!!s.manual),e.rotation.y+=u?s.rotationAngle??0:0),a.forEach(e=>e.rotation.x=f)},deck:n,bars:r,rider:i,arms:o,armRigs:s,legRigs:u}}function zp(){let e=new Y;e.name=`lunar-rover-counter-thrust`,e.visible=!1;let t=new fr({color:12380159,transparent:!0,opacity:.65,depthWrite:!1,blending:2,side:2,toneMapped:!1}),n=new Xi(.17,.035,.85,8,1,!0),r=[];for(let i of[-1.08,1.08]){let a=new J(n,t);a.rotation.x=Math.PI/2,a.position.set(i,.32,1.65),e.add(a),r.push(a)}return{group:e,update(n,i,a,o,s){e.visible=o>.001,e.rotation.y=Math.atan2(n,i)-a;let c=.35+o*.9+.06*Math.sin(s*45);for(let e of r)e.scale.y=c,e.position.z=1.2+.425*c;t.opacity=.35+o*.4}}}function Bp(){let e=new Y;e.name=`rover-downthrust`,e.visible=!1;let t=new Xi(.1,.025,.65,8,1,!0),n=new fr({color:12969969,transparent:!0,opacity:.38,depthWrite:!1,blending:2,side:2,toneMapped:!1});for(let r of[-.72,.72])for(let i of[-1.05,1.05]){let a=new J(t,n);a.position.set(r,.6,i),e.add(a)}return e}function Vp(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Er,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Hp(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Hp(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function Hp(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new gr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Up=Object.freeze({wheelbase:2.286,track:1.8288,wheelRadius:.4064,wheelWidth:.2286,neutralLength:3.0988,neutralWidth:2.0574,rideHeight:.55}),Wp=new U(0,1,0);function Gp(e,t,n,r=[0,0,0]){let i=new J(t,n);return i.position.set(...r),i.castShadow=i.receiveShadow=!0,e.add(i),i}function Kp(e,t,n,r){return Gp(e,new Br(...r),t,n)}function $(e,t,n,r,i=.018){let a=new U(...n),o=new U(...r),s=o.clone().sub(a),c=Gp(e,new Xi(i,i,s.length(),8),t);return c.position.copy(a.add(o).multiplyScalar(.5)),c.quaternion.setFromUnitVectors(Wp,s.normalize()),c}function qp(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(i=>{if(!(i instanceof J)||Array.isArray(i.material))return;for(let t=i;t&&t!==e;t=t.parent)if(!t.visible)return;let a=i.geometry.index?i.geometry.toNonIndexed():i.geometry.clone();for(let e of Object.keys(a.attributes))[`position`,`normal`,`uv`].includes(e)||a.deleteAttribute(e);a.getAttribute(`uv`)||a.setAttribute(`uv`,new q(new Float32Array(a.getAttribute(`position`).count*2),2)),a.applyMatrix4(t.clone().multiply(i.matrixWorld));let o=n.get(i.material)??[];o.push(a),n.set(i.material,o),r.add(i.geometry)}),e.clear();let i=0;for(let[t,r]of n){let n=Vp(r,!1);n&&(Gp(e,n,t).name=`static-part-${i++}`),r.forEach(e=>e.dispose())}r.forEach(e=>e.dispose())}function Jp(e,t,n,r){let i=new Y;i.name=`lrv-travel-rocket`,i.userData.role=`fictional-player-equipment`,e.add(i);let a=.1;for(let e of[-1,1])$(i,t,[e*.48,-.11,-1.17],[e*.22,a-.16,-1.18],.035),$(i,t,[e*.48,.39,-1.28],[e*.22,a-.1,-.98],.026);let o=Gp(i,new Xi(.24,.24,.34,20),r,[0,a,-1.14]);o.rotation.x=Math.PI/2;let s=Gp(i,new ka(.24,20,10,0,Math.PI*2,0,Math.PI/2),t,[0,a,-.97]);s.rotation.x=Math.PI/2;for(let e of[-1.01,-1.28]){let n=Gp(i,new Xi(.253,.253,.055,20),t,[0,a,e]);n.rotation.x=Math.PI/2}let c=n.clone();c.side=2;let u=Gp(i,new Xi(.12,.3,.22,24,1,!0),c,[0,a,-1.42]);u.rotation.x=Math.PI/2;let d=Gp(i,new Yi(.115,20),n,[0,a,-1.315]);d.rotation.y=Math.PI;let f=Gp(i,new Aa(.3,.025,8,24),t,[0,a,-1.53]);f.name=`rocket-nozzle-lip`;let p=new X({color:11103548,metalness:.68,roughness:.46});for(let e=0;e<8;e++){let t=e*Math.PI/4;$(i,p,[.13*Math.cos(t),a+.13*Math.sin(t),-1.32],[.28*Math.cos(t),a+.28*Math.sin(t),-1.51],.013)}qp(i);let m=new Y;m.name=`lrv-rocket-exhaust`,m.position.set(0,a,-1.56),m.visible=!1,e.add(m);let h=new Uint8Array(128);for(let e=0;e<32;e++){let t=Math.round(255*(1-e/31)**1.4);h.set([t,t,t,255],e*4)}let g=new Oi(h,1,32,D);g.minFilter=g.magFilter=l,g.needsUpdate=!0;let _=new fr({color:7981311,alphaMap:g,transparent:!0,opacity:.27,depthWrite:!1,blending:2,toneMapped:!1}),v=new fr({color:14874111,alphaMap:g,transparent:!0,opacity:.72,depthWrite:!1,blending:2,toneMapped:!1}),y=(e,t,n,r)=>{let i=new J(new Zi(e,t,16,1,!0),n);return i.name=r,i.rotation.x=-Math.PI/2,i.position.z=-t/2,m.add(i),i};y(.3,2.7,_,`rocket-plume`),y(.16,1.85,v,`rocket-core`);let b=0;return{update(e,t){let n=Number.isFinite(e)?mt.clamp(e,0,1):0;if(m.visible=n>0,!m.visible)return;b+=t;let r=.96+.04*Math.sin(b*63)+.02*Math.sin(b*107);m.scale.set(.75+.25*n,.75+.25*n,(.58+.42*n)*r),_.opacity=(.18+.12*n)*r,v.opacity=.48+.27*n}}}function Yp(e,t,n){let r=new Y;r.name=`map-fender-repair`,r.position.set(.9144,.1,-1.45),r.rotation.x=.12,e.add(r),r.userData.role=`player-expedition-repair`;let i=new Uint8Array(16384*4);for(let e=0;e<128;e++)for(let t=0;t<128;t++){let n=!1;for(let r=0;r<15;r++)if(Math.abs(e-(10+r*7.5+4*Math.sin(t*.07+r)))<.6){n=!0;break}let r=t>0&&t%32==0?[119,114,106]:n?[126,126,112]:[214,208,180];i.set([...r,255],(e*128+t)*4)}let a=new Oi(i,128,128,D);a.colorSpace=Fe,a.magFilter=l,a.minFilter=l,a.needsUpdate=!0;let o=new X({map:a,roughness:1,side:2}),s=Gp(r,new Oa(.37,.48,3,6),o,[0,.07,-.12]);s.name=`four-map-fender-sheet`,s.rotation.x=-Math.PI/2;for(let e of[-.14,.14])Kp(r,n,[e,.09,-.06],[.045,.035,.12]),$(r,t,[e,.1,-.06],[e,.17,-.06],.008);return r}function Xp(e={}){let t=new Y;t.name=`playable-lrv`;let n=new Y;n.name=`lrv-suspension-rig`,t.add(n);let r=new Y;r.name=`lrv-chassis`,n.add(r);let i=new X({color:12107449,metalness:.58,roughness:.58}),a=new X({color:3159602,metalness:.35,roughness:.82}),o=new X({color:14802378,roughness:.96,side:2}),s=new X({color:11769949,metalness:.36,roughness:.75}),c=new X({color:14145996,roughness:.79}),l=new X({color:1448992,roughness:.54}),u=new X({color:8620932,metalness:.4,roughness:.7,wireframe:!0});for(let e of[-.59,.59])$(r,i,[e,-.15,-1.35],[e,-.15,1.34],.033);for(let e of[-1.32,-.6,.62,1.3])$(r,i,[-.59,-.15,e],[.59,-.15,e],.031);Kp(r,a,[0,-.175,-.02],[1.16,.035,1.21]);for(let e of[-.44,.44])Kp(r,i,[e,-.13,.28],[.35,.025,.58]),Kp(r,s,[e,-.06,1.04],[.47,.19,.55]),Kp(r,c,[e,.044,1.04],[.46,.014,.54]);let d=[];for(let e of[!0,!1])for(let t of[-1,1]){let o=t*.9144,c=e?1.143:-1.143,l=-.14360000000000006,f=new Y;f.name=`lrv-wheel-${e?`front`:`rear`}-${t<0?`left`:`right`}`,f.position.set(o,l,c),n.add(f);let p=new Y;p.name=`wire-wheel`,f.add(p);let m=new Da([new H(.315,-.1143),new H(.375,-.108),new H(.401,-.065),new H(.402,0),new H(.401,.065),new H(.375,.108),new H(.315,.1143)],40);m.rotateZ(Math.PI/2),Gp(p,m,u).name=`woven-wire-tire`;let h=Gp(p,new Xi(.105,.105,.2286,16),i);h.rotation.z=Math.PI/2;for(let e of[-1,1]){let t=Gp(p,new Xi(.075,.245,.068,20),i,[e*.08,0,0]);t.rotation.z=-e*Math.PI/2;let n=Gp(p,new Aa(.315,.009,5,32),i,[e*.1053,0,0]);n.rotation.y=Math.PI/2;for(let t=0;t<12;t++){let n=t*Math.PI/6;$(p,i,[e*.1053,0,0],[e*.1053,.315*Math.cos(n),.315*Math.sin(n)],.0045)}}for(let e=0;e<20;e++)for(let t of[-1,1]){let n=e*Math.PI/10,r=n+.1,a=new Er,o=[0,.4064*Math.cos(n),.4064*Math.sin(n),t*.105,.394*Math.cos(r),.394*Math.sin(r),t*.105,.394*Math.cos(r+.055),.394*Math.sin(r+.055),0,.4064*Math.cos(n+.055),.4064*Math.sin(n+.055)];a.setAttribute(`position`,new q(o,3)),a.setIndex([0,1,2,0,2,3]),a.computeVertexNormals(),Gp(p,a,i)}qp(p);for(let e of[-.11,-.015])for(let n of[-.21,.21])$(r,i,[t*.55,e,c+n],[o,l,c],.018);$(r,a,[t*.57,.08,c-.13],[o,l,c],.028);let g=new Xi(.455,.455,.29,24,1,!0,-Math.PI*.54,Math.PI*1.08);g.rotateZ(Math.PI/2),g.rotateX(-Math.PI/2),Gp(r,g,s,[o,l,c]),d.push({steering:f,spin:p,front:e})}for(let e of[-.4,.4]){for(let t of[-1,1]){let n=e+t*.25;$(r,i,[n,-.12,-.5],[n,.59,-.53]),$(r,i,[n,.11,-.48],[n,.11,.02]),$(r,i,[n,-.14,-.28],[n,.11,-.48]),$(r,i,[n,.28,-.29],[n,.28,.08]),$(r,i,[n,.11,.02],[n,.28,.08])}$(r,i,[e-.25,.59,-.53],[e+.25,.59,-.53]),$(r,i,[e-.25,.11,.02],[e+.25,.11,.02]);for(let t=0;t<5;t++){Kp(r,o,[e-.19+t*.095,.13,-.25],[.057,.018,.49]);let n=Kp(r,o,[e-.19+t*.095,.36,-.51],[.057,.47,.014]);n.rotation.x=-.035}for(let t of[.21,.36,.51])Kp(r,o,[e,t,-.516],[.48,.025,.019]);for(let t of[-.44,-.27,-.1])Kp(r,o,[e,.144,t],[.48,.015,.025]);Kp(r,a,[e,.156,-.25],[.45,.012,.035]),$(r,i,[e-.23,-.17,.19],[e-.23,-.38,.49]),$(r,i,[e+.23,-.17,.19],[e+.23,-.38,.49]),Kp(r,i,[e,-.375,.54],[.47,.025,.29])}$(r,i,[0,-.15,.22],[0,.38,.34],.025);let f=Kp(r,c,[0,.41,.37],[.29,.23,.2]);f.rotation.x=-.35;let p=Kp(r,l,[0,.456,.266],[.25,.15,.014]);p.rotation.x=-.35;for(let e of[-.065,.065]){let t=Gp(r,new Yi(.035,16),c,[e,.48,.252]);t.rotation.y=Math.PI}$(r,a,[0,.27,-.03],[0,.4,.1],.019),$(r,a,[-.075,.4,.1],[.075,.4,.1],.021),Kp(r,c,[-.29,.19,1.19],[.56,.25,.18]),$(r,i,[-.4,.08,1.1],[-.4,.72,1.1],.022);let m=new Y;m.position.set(-.4,.72,1.1),m.rotation.x=e.tvPitch??0,r.add(m),Kp(m,c,[0,0,0],[.3,.18,.34]);let h=Gp(m,new Xi(.077,.077,.1,18),l,[0,0,.21]);h.rotation.x=Math.PI/2,Kp(r,s,[-.4,.51,1.1],[.25,.14,.23]),$(r,i,[.27,.05,1.18],[.27,1.38,1.18],.017);let g=new Y;g.position.set(.27,1.39,1.18),g.rotation.x=-.62,r.add(g);let _=new Da(Array.from({length:9},(e,t)=>{let n=t*.056;return new H(n,.21*(n/.448)**2)}),32);_.rotateX(Math.PI/2),Gp(g,_,u);for(let e=0;e<12;e++){let t=e*Math.PI/6;$(g,i,[0,0,0],[.448*Math.cos(t),.448*Math.sin(t),.21],.005)}let v=Gp(g,new Aa(.448,.008,5,32),i,[0,0,.21]);v.name=`high-gain-rim`,$(g,i,[0,0,0],[0,0,.37],.012),Kp(g,c,[0,0,.38],[.08,.08,.07]),$(r,i,[-.63,.1,.44],[-.63,1.65,.44],.012);let y=Gp(r,new Xi(.055,.055,.11,12),c,[-.63,1.63,.44]);y.name=`low-gain-antenna`,Kp(r,s,[0,-.09,-1.03],[1.11,.045,.6]);for(let e of[-.54,.54])$(r,i,[e,-.06,-1.28],[e,.45,-1.28]);for(let e of[-.04,.22,.44])$(r,i,[-.54,e,-1.28],[.54,e,-1.28]);Kp(r,o,[-.24,.15,-1.03],[.42,.43,.34]),Kp(r,s,[.27,.11,-1.03],[.38,.34,.38]);for(let e of[.13,.25,.37])$(r,i,[e,.05,-1.3],[e,.74,-1.3],.017);$(r,i,[-.52,.05,-1.25],[-.52,.88,-1.25],.014),Kp(r,a,[-.52,.88,-1.25],[.21,.035,.075]),$(r,i,[-.39,.05,-1.3],[-.39,.79,-1.3],.013);for(let e of[-.47,-.43,-.39,-.35,-.31])$(r,i,[e,.79,-1.3],[e,.88,-1.3],.006);qp(r);let b=e.rocket?Jp(n,i,a,s):null,x=Mp(!1);x.name=`lrv-driver`,x.position.set(-.4,-.72,-.2),n.add(x),x.getObjectByName(`left-leg`).visible=!1,x.getObjectByName(`right-leg`).visible=!1;let S=x.userData.suitMaterial;for(let e of[-1,1]){let t=e*.135;$(x,S,[t,.83,0],[t,.78,.38],.088),Gp(x,new ka(.086,12,8),S,[t,.78,.38]),$(x,S,[t,.78,.38],[t,.43,.49],.073),Kp(x,S,[t,.37,.58],[.16,.14,.27]),jp(x,x,[e*.23,1.25,0],[e*.24,1,.2],e>0?[.38,1.1,.3]:[-.24,.99,.29])}let C=x.getObjectByName(`helmet`).position.clone();qp(x);let w=new Wn;w.name=`helmet`,w.position.copy(C),x.add(w),x.userData.role=`current-player`,t.userData.dimensions=Up;let T=0,E=0,D=0,O=1,k=null;return{group:t,update({speed:e,steer:r,pitch:o,roll:s,dt:c,wheelOffsets:l,grounded:u=!0,rocketThrust:f=0,mapFenderRepair:p}){let m=e=>Number.isFinite(e)?e:0,h=Math.max(0,Math.min(.1,m(c))),g=m(o),_=m(s);if(b?.update(f,h),p!==void 0&&(p&&!k&&(k=Yp(n,i,a)),k&&(k.visible=p),t.userData.mapFenderRepair=p),u){let e=Math.tan(_),t=Math.tan(g);O=1/Math.hypot(1,e,t),D=Math.atan(e/Math.hypot(1,t))-_,E=.55*(1/O-1)}else{let e=Math.exp(-h*12);E*=e,D*=e,O+=(1-O)*(1-e)}n.position.y=E,n.rotation.set(-g,0,_+D,`YXZ`),T=(T+m(e)*h/.4064)%(Math.PI*2);for(let[e,t]of d.entries())t.steering.position.y=-.14360000000000006+m(l?.[e]??0)*O,t.steering.rotation.y=mt.clamp(m(r),-.6,.6)*(t.front?1:-1),t.spin.rotation.x=T}}}function Zp(e,t,n,r,i,a,o,s,c,l=null,u=!1){let d=e.heading+s,f=new U(e.x-Math.sin(d)*c,e.y+3.1,e.z-Math.cos(d)*c);if(l){let t=e.x-l.x,n=e.z-l.z,r=Math.max(1,Math.hypot(t,n));f.set(e.x+t/r*c,e.y+4.5,e.z+n/r*c)}f.y=Math.max(f.y,n(f.x,f.z)+1);let p=new U(e.x,e.y+1.5,e.z),m=e=>r.every(t=>Math.abs(e.x-t.x)>t.hx+.35||Math.abs(e.z-t.z)>t.hz+.35||Math.abs(e.y-(t.y??0))>(t.hy??0)+.35);for(let e=.1;e<=1.001;e+=.1)if(!m(p.clone().lerp(f,e))){f.copy(p.clone().lerp(f,Math.max(0,e-.1)));break}return o?u||i.lerp(f,1-Math.exp(-t*6)):(i.copy(f),a.set(e.x+Math.sin(d)*2,e.y+1,e.z+Math.cos(d)*2),o=!0),m(i)||i.copy(f),i.y=Math.max(i.y,n(i.x,i.z)+.6),u||a.lerp(new U(e.x+Math.sin(d)*2,e.y+1,e.z+Math.cos(d)*2),1-Math.exp(-t*6)),l&&a.set(l.x,n(l.x,l.z)+1.2,l.z),o}function Qp(e,t,n,r){e.children.forEach(e=>{let t=e;t.geometry?.dispose(),t.material instanceof dr&&(t instanceof Ei&&t.material.map?.dispose(),t.material.dispose())}),e.clear();for(let i of r){let r=t[i.index],a=new Xi(r.radius,r.radius,.76,96,12,!0),o=a.attributes.position;for(let e=0;e<o.count;e++)o.setY(e,o.getY(e)+n(r.x+o.getX(e),r.z+o.getZ(e))-n(r.x,r.z));let s=new J(a,new Jr({transparent:!0,depthWrite:!1,side:2,blending:i.completed?1:2,uniforms:{time:{value:0},ringColor:{value:new K(i.completed?2382747:16758861)},strength:{value:i.completed?1.8:1}},vertexShader:`
 #include <common>
 #include <logdepthbuf_pars_vertex>
 varying vec2 vUv;
 void main(){
  vUv=uv;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
  #include <logdepthbuf_vertex>
 }`,fragmentShader:`
 #include <logdepthbuf_pars_fragment>
 varying vec2 vUv;
 uniform float time;
 uniform vec3 ringColor;
 uniform float strength;
 void main(){
  #include <logdepthbuf_fragment>
  float fade=pow(1.0-vUv.y,1.5);
  float wave=.65+.35*sin(vUv.x*150.0+time*2.3+vUv.y*9.0);
  float shimmer=.7+.3*sin(vUv.y*33.0-time*2.0+vUv.x*50.0);
  gl_FragColor=vec4(ringColor,fade*(.16+.28*wave*shimmer)*strength);
 }`}));s.position.set(r.x,n(r.x,r.z)+.4,r.z),e.add(s),s.castShadow=!1,s.receiveShadow=!1,s.userData.siteId=i.id,s.userData.completed=i.completed}}var $p=e=>Math.max(0,Math.min(1,e)),em=(e,t,n)=>{let r=$p((n-e)/(t-e));return r*r*(3-2*r)},tm=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function nm(e,t){let n=Math.floor(e),r=Math.floor(t),i=em(0,1,e-n),a=em(0,1,t-r);return(tm(n,r)*(1-i)+tm(n+1,r)*i)*(1-a)+(tm(n,r+1)*(1-i)+tm(n+1,r+1)*i)*a}function rm(e,t){let n=1-em(-1100,850,e),r=(1-em(-5e3,-2700,e))*em(-6500,-5e3,e),i=Math.exp(-(((e-2050)/1e3)**2+((t+1700)/850)**2)),a=Math.exp(-(((e+5600)/650)**2+((t-2080)/500)**2)),o=Math.exp(-(((e+4700)/1600)**2+((t-1700)/380)**2)),s=Bl(e,t),c=Il(e,t),l=nm(e/180,t/180),u=$p(.46+l*.25+n*.2+i*.13-o*.2-s.sand*.45),d=$p(.2+n*.48+r*.12+a*.24-o*.24)*(1-c*.95),f=.43+n*.06+r*.03+a*.1-i*.08-o*.04+c*.025;return{rockiness:u,slab:d*(1-s.west)+s.west*(.22+s.plain*.48+s.witch*.26),shade:f+s.witch*.07-s.frontier*.025,patch:l,delta:n,margin:r,bright:a,channel:o,basalt:i,rim:c,...s}}function im(e,t,n,r){let i=(Math.imul(e,73856093)^Math.imul(t,19349663)^684789)>>>0,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296),o=[];for(let i=0;i<788;i++){let s=(e+a())*64,c=(t+a())*64,l=rm(n+s,r-c),u=a(),d=a(),f=a(),p=a(),m=a()*Math.PI*2,h=a(),g=i>=660;if(!g&&u>l.rockiness)continue;let _=nm((n+s)/24,(r-c)/24),v=d<$p(l.slab+(_-.45)*.4),y=g?.012+f**2*.065:v?.15+f**2*(1.65-l.rim*.75):.08+f**2*.58;o.push({x:s,z:c,size:y,height:g?y*.35:v?.045+p*.055:Math.min(.12,y*(.3+p*.25)),stretch:v?.5+d*.35:.75+d*.25,angle:m,shade:l.shade+(h-.5)*.2+(v?.04:0)})}return o}function am(e,t,n,r,i){let a=(e,t)=>{let n=Math.floor(e/1280)*1280,r=Math.floor(t/1280)*1280;return n<i.east+640&&n+1280>i.west-640&&r<-i.south+640&&r+1280>-i.north-640},o=(e+n)/2,s=(t+r)/2;return a(o-1,s-1)||a(o+1,s+1)?4:40}function om(terrain){return jezeroPerf.makeLandscape(terrain)}
const jezeroPerf=(()=>{const T={Group:Y,Color:K,MathUtils:mt,SRGBColorSpace:Fe,BufferGeometry:Er,Float32BufferAttribute:q,BufferAttribute:gr,CanvasTexture:Ki,RepeatWrapping:1000,MeshStandardMaterial:X,TextureLoader:$a,Vector2:H,Mesh:J,MeshBasicMaterial:fr,DoubleSide:2};const mergeGeometries=Vp,surfaceCharacter=rm;
function makeContactGround(raw) {
    const size = 65536, xs = new Int32Array(size), zs = new Int32Array(size), values = new Float64Array(size), valid = new Uint8Array(size);
    const vertex = (x, z) => {
        const i = (Math.imul(x, 73856093) ^ Math.imul(z, 19349663)) & (size - 1);
        if (!valid[i] || xs[i] !== x || zs[i] !== z) {
            xs[i] = x;
            zs[i] = z;
            values[i] = raw(x * 4, z * 4);
            valid[i] = 1;
        }
        return values[i];
    };
    return (x, z) => {
        const a = Math.floor(x / 4), b = Math.floor(z / 4), u = x / 4 - a, v = z / 4 - b, h00 = vertex(a, b);
        if (u === 0 && v === 0)
            return h00;
        const h10 = vertex(a + 1, b), h01 = vertex(a, b + 1);
        if (u + v <= 1)
            return h00 + (h10 - h00) * u + (h01 - h00) * v;
        const h11 = vertex(a + 1, b + 1);
        return h11 + (h01 - h11) * (1 - u) + (h10 - h11) * (1 - v);
    };
}
function makeSolidIndex(solids) {
    const bins = new Map(), large = [];
    solids.forEach((s, i) => {
        const x0 = Math.floor((s.x - s.hx) / 32), x1 = Math.floor((s.x + s.hx) / 32), z0 = Math.floor((s.z - s.hz) / 32), z1 = Math.floor((s.z + s.hz) / 32);
        if ((x1 - x0 + 1) * (z1 - z0 + 1) > 256) {
            large.push(i);
            return;
        }
        for (let z = z0; z <= z1; z++)
            for (let x = x0; x <= x1; x++) {
                const key = x + ',' + z, list = bins.get(key) ?? [];
                list.push(i);
                bins.set(key, list);
            }
    });
    return { query(x0, z0, x1, z1) {
            const ids = new Set(large), ax = Math.floor(x0 / 32), az = Math.floor(z0 / 32), bx = Math.floor(x1 / 32), bz = Math.floor(z1 / 32);
            // Teleports can span the world; avoid iterating millions of empty grid cells.
            if ((bx - ax + 1) * (bz - az + 1) > 4096)
                return solids;
            for (let z = az; z <= bz; z++)
                for (let x = ax; x <= bx; x++)
                    for (const i of bins.get(x + ',' + z) ?? [])
                        ids.add(i);
            return [...ids].sort((a, b) => a - b).map(i => solids[i]).filter(s => s.x + s.hx >= x0 && s.x - s.hx <= x1 && s.z + s.hz >= z0 && s.z - s.hz <= z1);
        } };
}
function makeHistoricalTracks(terrain) {
    const group = new T.Group();
    group.name = 'Historical Perseverance wheel tracks';
    const mat = new T.MeshBasicMaterial({ color: 0x34271d, transparent: true, opacity: .28, depthWrite: false, side: T.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1 });
    mat.onBeforeCompile = shader => {
        shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 treadUV;').replace('#include <begin_vertex>', '#include <begin_vertex>\ntreadUV=uv;');
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec2 treadUV;').replace('#include <color_fragment>', `#include <color_fragment>
   float phase=treadUV.y*65.+abs(treadUV.x-.5)*3.,ribs=.5+.5*cos(phase)*exp(-fwidth(phase)*.55);
   float edge=smoothstep(0.,.12,treadUV.x)*smoothstep(0.,.12,1.-treadUV.x);
   diffuseColor.a*=edge*(.25+.75*ribs);`);
    };
    const chunks = [], bins = new Map();
    // Store compact runs of original tessellation steps, not their vertex arrays.
    for (const { points } of terrain.historicalTracks) {
        let distance = 0;
        for (let i = 1; i < points.length; i++) {
            const a = points[i - 1], b = points[i], dx = b.x - a.x, dz = b.z - a.z, length = Math.hypot(dx, dz);
            if (length < .025)
                continue;
            const edge = { a, dx, dz, length, nx: -dz / length, nz: dx / length, distance, steps: Math.ceil(length / .7) };
            for (let j = 0; j < edge.steps; j++) {
                const x = a.x + dx * (j + .5) / edge.steps, z = a.z + dz * (j + .5) / edge.steps;
                if (!terrain.inside(x, z))
                    continue;
                const cx = Math.floor(x / 320), cz = Math.floor(z / 320), key = cx + ',' + cz;
                let chunk = bins.get(key);
                if (!chunk || chunk.steps >= 1024) {
                    chunk = { x: cx * 320, z: cz * 320, runs: [], steps: 0 };
                    chunks.push(chunk);
                    bins.set(key, chunk);
                }
                const run = chunk.runs[chunk.runs.length - 1];
                if (run?.edge === edge && run.last === j)
                    run.last++;
                else
                    chunk.runs.push({ edge, first: j, last: j + 1 });
                chunk.steps++;
            }
            distance += length;
        }
    }
    function build(chunk) {
        const positions = [], uvs = [], indices = [];
        for (const { edge, first, last } of chunk.runs) {
            const { a, dx, dz, length, nx, nz, distance, steps } = edge;
            for (let j = first; j < last; j++)
                for (const side of [-1, 1]) {
                    const start = positions.length / 3;
                    for (const f of [j / steps, (j + 1) / steps])
                        for (const edge of [-1, 1]) {
                            const offset = side * 1.05 + edge * .16, x = a.x + dx * f + nx * offset, z = a.z + dz * f + nz * offset;
                            positions.push(x, terrain.ground(x, z) + .012, z);
                            uvs.push((edge + 1) / 2, distance + length * f);
                        }
                    indices.push(start, start + 2, start + 1, start + 1, start + 2, start + 3);
                }
        }
        const geo = new T.BufferGeometry();
        geo.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
        geo.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
        geo.setIndex(indices);
        return new T.Mesh(geo, mat);
    }
    let previousX = Infinity, previousZ = Infinity, pending = true, residentBytes = 0;
    return Object.assign(group, { stats: () => ({ residentBytes, pending }), update(eye) {
            const x = Math.floor(eye.x / 160), z = Math.floor(eye.z / 160);
            if (!pending && x === previousX && z === previousZ)
                return;
            previousX = x;
            previousZ = z;
            const distance = (c) => Math.hypot(Math.max(c.x - eye.x, 0, eye.x - c.x - 320), Math.max(c.z - eye.z, 0, eye.z - c.z - 320));
            const candidates = chunks.filter(c => distance(c) <= 1280).sort((a, b) => distance(a) - distance(b)), wanted = new Set();
            let bytes = 0;
            for (const c of candidates) {
                const cost = c.steps * 184;
                if (bytes + cost <= 2 * 1024 * 1024) {
                    wanted.add(c);
                    bytes += cost;
                }
            }
            for (const c of chunks)
                if (c.mesh && !wanted.has(c)) {
                    group.remove(c.mesh);
                    c.mesh.geometry.dispose();
                    c.mesh = undefined;
                }
            let built = 0;
            const started = performance.now();
            pending = false;
            for (const c of wanted)
                if (!c.mesh) {
                    if (built >= 2 || built > 0 && performance.now() - started >= 4) {
                        pending = true;
                        continue;
                    }
                    c.mesh = build(c);
                    group.add(c.mesh);
                    built++;
                }
            residentBytes = chunks.reduce((n, c) => n + (c.mesh ? c.steps * 184 : 0), 0);
        } });
}
function terrainSeamSpacing(ax, az, bx, bz, bounds) {
    const detailed = (px, pz) => { const x = Math.floor(px / 1280) * 1280, z = Math.floor(pz / 1280) * 1280; return x < bounds.east + 640 && x + 1280 > bounds.west - 640 && z < -bounds.south + 640 && z + 1280 > -bounds.north - 640; };
    const x = (ax + bx) / 2, z = (az + bz) / 2;
    return detailed(x - 1, z - 1) || detailed(x + 1, z + 1) ? 4 : 40;
}
async function makeLandscape(terrain) {
    let deadline = performance.now() + 8;
    const yieldBuild = async () => { if (performance.now() >= deadline) {
        await new Promise(resolve => setTimeout(resolve, 0));
        deadline = performance.now() + 8;
    } };
    const { ground, bounds, originEast, originNorth } = terrain, group = new T.Group(), tiles = [];
    const cells = new Map();
    const cellGeometry = [];
    const tint = new T.Color(), belvaSand = new T.Color('#685c50'), brightRock = new T.Color('#a2967b'), rimSoil = new T.Color('#897b67'), westernRock = new T.Color('#ada68e'), westernSand = new T.Color('#504b45'), floorRock = new T.Color('#827b6b'), palePavement = new T.Color('#b0a58c');
    function tile(x, z, tileSize, step) {
        const count = tileSize / step + 1;
        const pos = [], colors = [], uv = [], indices = [];
        function vertex(px, pz, height) {
            const h = height ?? ground(px, pz), slope = Math.hypot(ground(px - 4, pz) - ground(px + 4, pz), ground(px, pz - 4) - ground(px, pz + 4)) / 8;
            const exposure = T.MathUtils.smoothstep(slope, .12, .65), east = px + originEast, north = originNorth - pz, seitah = Math.exp(-(((east - 2050) / 650) ** 2 + ((north + 1700) / 550) ** 2)), variation = Math.sin(px * .018 + Math.sin(pz * .012)) * Math.sin(pz * .015) * .014;
            tint.setRGB(.65 - exposure * .13 - seitah * .035 + variation, .445 - exposure * .10 - seitah * .03 + variation * .8, .305 - exposure * .065 - seitah * .02 + variation * .6, T.SRGBColorSpace);
            const province = surfaceCharacter(east, north);
            const exposedPatch = T.MathUtils.smoothstep(province.patch, .35, .72);
            tint.lerp(floorRock, (1 - province.delta) * (1 - province.channel) * (.24 + exposedPatch * .30));
            tint.lerp(palePavement, province.slab * exposedPatch * .38);
            tint.lerp(brightRock, province.bright * .55 + province.margin * .10);
            tint.lerp(rimSoil, province.rim * .38);
            tint.lerp(westernRock, province.west * (.25 + province.witch * .35));
            tint.lerp(westernSand, Math.max(province.plain * T.MathUtils.smoothstep(province.patch, .40, .72) * .3, province.sand * .85));
            tint.multiplyScalar(.96 + province.patch * .075);
            const bowl = Math.exp(-(((east + 1540) / 360) ** 2 + ((north - 1430) / 320) ** 2));
            tint.lerp(belvaSand, bowl * .4);
            pos.push(px, h, pz);
            colors.push(tint.r, tint.g, tint.b);
            uv.push(px / 6, pz / 6);
            return pos.length / 3 - 1;
        }
        for (let j = 0; j < count; j++)
            for (let i = 0; i < count; i++)
                vertex(x + i * step, z + j * step);
        for (let j = 0; j < count - 1; j++)
            for (let i = 0; i < count - 1; i++) {
                const a = j * count + i, b = a + 1, c = a + count, d = c + 1;
                if (step === 4 || i > 0 && j > 0 && i < count - 2 && j < count - 2) {
                    indices.push(a, c, b, b, c, d);
                    continue;
                }
                // Stitch every tile boundary to the same four-metre ground samples. Skirts
                // concealed gaps but exposed dark vertical walls where coarse edges crossed hills.
                const center = vertex(x + (i + .5) * step, z + (j + .5) * step, (pos[b * 3 + 1] + pos[c * 3 + 1]) / 2), ring = [];
                for (const [from, to, border] of [[a, c, i === 0], [c, d, j === count - 2], [d, b, i === count - 2], [b, a, j === 0]]) {
                    ring.push(from);
                    if (!border)
                        continue;
                    const ax = pos[from * 3], az = pos[from * 3 + 2], bx = pos[to * 3], bz = pos[to * 3 + 2], start = ax === bx ? az : ax, end = ax === bx ? bz : bx, dir = Math.sign(end - start);
                    const seam = terrainSeamSpacing(ax, az, bx, bz, bounds);
                    let value = dir > 0 ? (Math.floor(start / seam) + 1) * seam : (Math.ceil(start / seam) - 1) * seam;
                    for (; dir * (end - value) > .001; value += dir * seam)
                        ring.push(vertex(ax === bx ? ax : value, az === bz ? az : value));
                }
                for (let k = 0; k < ring.length; k++)
                    indices.push(center, ring[k], ring[(k + 1) % ring.length]);
            }
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
        g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
        g.setIndex(indices);
        g.computeVertexNormals();
        // Keep positions/contact and UVs exact; normalized 16-bit shading attributes.
        const normal = g.getAttribute('normal');
        g.setAttribute('normal', new T.BufferAttribute(Int16Array.from(normal.array, v => Math.round(v * 32767)), 3, true));
        g.setAttribute('color', new T.BufferAttribute(Uint16Array.from(colors, v => Math.round(v * 65535)), 3, true));
        return g;
    }
    const outer = terrain.topography?.grids[7];
    const left = outer ? Math.floor((outer.eastMin - originEast) / 1280) * 1280 : -23040, right = outer ? outer.eastMin + (outer.columns - 1) * outer.step - originEast : 10240;
    const top = outer ? Math.floor((originNorth - outer.northMax) / 1280) * 1280 : -14080, bottom = outer ? originNorth - (outer.northMax - (outer.rows - 1) * outer.step) : 14080;
    for (let z = top; z < bottom; z += 1280)
        for (let x = left; x < right; x += 1280) {
            const near = x < bounds.east + 640 && x + 1280 > bounds.west - 640 && z < -bounds.south + 640 && z + 1280 > -bounds.north - 640;
            if (near)
                for (let j = 0; j < 4; j++)
                    for (let i = 0; i < 4; i++) {
                        const px = x + i * 320, pz = z + j * 320, e = px + originEast, n = originNorth - pz;
                        // Kodiak's distant photographic silhouette keeps its fine geometry at all times.
                        const kodiak = e < 500 && e + 320 > -100 && n > -1500 && n - 320 < -1020;
                        const geometry = tile(px, pz, 320, kodiak ? 4 : 20);
                        await yieldBuild();
                        if (kodiak)
                            tiles.push({ x: px, z: pz, geometry });
                        else
                            cellGeometry.push({ x: px, z: pz, geometry });
                    }
            else
                tiles.push({ x, z, geometry: tile(x, z, 1280, Math.hypot(x + 640, z + 640) < 8500 ? 40 : 160) });
            await yieldBuild();
        }
    const grain = document.createElement('canvas');
    grain.width = grain.height = 256;
    const ctx = grain.getContext('2d'), pixels = ctx.createImageData(256, 256);
    let seed = 2021;
    for (let i = 0; i < pixels.data.length; i += 4) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const shade = 211 + seed / 4294967296 * 42;
        pixels.data.set([shade, shade, shade, 255], i);
    }
    ctx.putImageData(pixels, 0, 0);
    const texture = new T.CanvasTexture(grain);
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.colorSpace = T.SRGBColorSpace;
    texture.anisotropy = 4;
    const material = new T.MeshStandardMaterial({ vertexColors: true, map: texture, bumpMap: texture, bumpScale: .012, roughness: 1 });
    const orbital = new T.TextureLoader().load(new URL('jezero-satellite-C2e7YyUo.webp', import.meta.url).href);
    orbital.anisotropy = 4;
    material.onBeforeCompile = shader => {
        shader.uniforms.marsDatum = { value: terrain.baseY };
        shader.uniforms.orbital = { value: orbital };
        shader.uniforms.marsOrigin = { value: new T.Vector2(originEast, originNorth) };
        shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 marsPosition;').replace('#include <begin_vertex>', '#include <begin_vertex>\nmarsPosition=position;');
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
   varying vec3 marsPosition;uniform sampler2D orbital;uniform vec2 marsOrigin;uniform float marsDatum;
   float hashMars(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float soilNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hashMars(i),hashMars(i+vec2(1,0)),f.x),mix(hashMars(i+vec2(0,1)),hashMars(i+vec2(1)),f.x),f.y);}
  `).replace('#include <color_fragment>', `#include <color_fragment>
   vec2 en=vec2(marsPosition.x+marsOrigin.x,marsOrigin.y-marsPosition.z),geoUV=(en+vec2(12000,5000))/vec2(16000,10000);
   float orbitalTone=texture2D(orbital,geoUV).r;
   float cover=step(0.,min(geoUV.x,geoUV.y))*step(max(geoUV.x,geoUV.y),1.);
   float detailFade=1.-smoothstep(.5,3.,length(fwidth(marsPosition.xz)));
   float marsMicroRelief=0.;
   float soil=mix(.5,soilNoise(marsPosition.xz*.35),detailFade),small=mix(.5,soilNoise(marsPosition.xz*2.8),detailFade);
   float ripplePhase=marsPosition.x*12.+sin(marsPosition.z*.24)*2.;
   float ripple=sin(ripplePhase)*exp(-fwidth(ripplePhase)*.7)*.016;
   diffuseColor.rgb*=mix(1.,.72+.48*orbitalTone,cover)*(.91+.16*soil+.035*small+ripple);
   // Photo-informed fractured pale bedrock; no artificial road or displaced height.
   float bright=1.-smoothstep(.6,1.2,length((en-vec2(-5688.,2081.))/vec2(650.,500.)));
   float margin=1.-smoothstep(.6,1.2,length((en-vec2(-3248.,1698.))/vec2(1000.,700.)));
   vec2 warped=marsPosition.xz+vec2(soilNoise(en*.07),soilNoise(en*.09+17.))*4.;
   vec2 cell=warped*(.30+.22*soilNoise(en*.015)),base=floor(cell),fraction=fract(cell);float first=9.,second=9.;
   for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 jitter=vec2(hashMars(base+o),hashMars(base+o+vec2(73.,19.)));float d=length(o+jitter-fraction);if(d<first){second=first;first=d;}else second=min(second,d);}
   float sandBreak=smoothstep(.30,.62,soilNoise(en*.09+vec2(41.,13.)));
   float cracks=(1.-smoothstep(.018,.06,second-first))*sandBreak,crackFade=1.-smoothstep(.12,.6,length(fwidth(cell)));
   float delta=1.-smoothstep(-1100.,850.,en.x),exposed=soilNoise(en*.006+vec2(17.,31.));
   float rim=smoothstep(5800.,6600.,-en.x)*(1.-smoothstep(7900.,8700.,-en.x))*smoothstep(-1800.,-900.,en.y)*(1.-smoothstep(1700.,2600.,en.y));
   float west=smoothstep(7800.,8400.,-en.x)*(1.-smoothstep(11300.,12000.,-en.x))*smoothstep(-3700.,-3100.,en.y)*(1.-smoothstep(1200.,1800.,en.y));
   float witch=west*exp(-dot((en-vec2(-8170.,-60.))/vec2(470.,630.),(en-vec2(-8170.,-60.))/vec2(470.,630.)));
   float plain=west*exp(-dot((en-vec2(-8770.,-650.))/vec2(590.,600.),(en-vec2(-8770.,-650.))/vec2(590.,600.)));
   delta*=(1.-rim*.85)*(1.-west);
   // Pale, tilted exposures across the hill and cracked pavement beyond it.
   float tilted=en.x*.055+en.y*.018+marsPosition.y*.035;
   float layers=.5+.5*sin(tilted+soilNoise(en*.025)*.45);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.40,.365,.285),witch*smoothstep(.25,.70,layers)*smoothstep(.18,.72,soilNoise(en*.07)+soilNoise(en*.19)*.22)*.65);
   diffuseColor.rgb*=1.-west*cracks*crackFade*(.035+plain*.10);
   float channel=exp(-dot((en-vec2(-4700.,1700.))/vec2(1600.,380.),(en-vec2(-4700.,1700.))/vec2(1600.,380.)));
   float crust=(.025+smoothstep(.30,.72,exposed)*(.05+delta*.075))*(1.-channel*.8);
   diffuseColor.rgb*=1.-cracks*crackFade*max(crust,max(bright*.28,margin*.08*(1.-channel*.75)));
   // Exposed pavement extends across whole provinces, fading into windblown sand.
   float rockCover=smoothstep(.28,.68,exposed)*(1.-channel*.65);
   float pavement=max(bright*.85,max(plain*.65,margin*.35));
   float nearRock=rockCover*max(pavement,delta*.32);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.38,.34,.27)*(.85+.2*soil),nearRock*.45);
   diffuseColor.rgb*=1.-cracks*crackFade*nearRock*.22;
   marsMicroRelief=(small*.018+soil*.025-cracks*nearRock*.035)*detailFade;
   // Restrained interpreted bedding on the measured Kodiak face; no height displacement.
   float kodiak=1.-smoothstep(.75,1.,length((en-vec2(196.,-1260.))/vec2(245.,210.)));
   vec3 surfaceNormal=normalize(cross(dFdx(marsPosition),dFdy(marsPosition)));
   float face=smoothstep(.025,.24,1.-abs(surfaceNormal.y));
   float elevation=marsPosition.y+marsDatum,phase=(elevation+en.x*.045+en.y*.018)*2.1+soilNoise(en*.045)*3.4;
   float band=sin(phase)*exp(-fwidth(phase)*.6),finePhase=elevation*16.;
   float lamina=sin(finePhase)*exp(-fwidth(finePhase)*.7);
   float fractures=smoothstep(.78,.95,soilNoise(vec2(en.x*.12+en.y*.035,elevation*.07)));
   float bedExposure=smoothstep(.24,.70,soilNoise(en*.045))*smoothstep(.12,.36,1.-abs(surfaceNormal.y));
   float sedimentary=max(kodiak*bedExposure,delta*(.30+.35*exposed));
   diffuseColor.rgb*=1.+sedimentary*face*(band*.10+lamina*.035-fractures*.12);
   diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.90,.94,1.04),kodiak*face*.35);
   float rimBands=sin((elevation+en.x*.10)*1.5)*exp(-fwidth((elevation+en.x*.10)*1.5)*.7);
   diffuseColor.rgb*=1.+rim*face*rimBands*.09;
  
  `).replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\nnormal=perturbNormalArb(-vViewPosition,normal,vec2(dFdx(marsMicroRelief),dFdy(marsMicroRelief)),faceDirection);');
    };
    // Coarse cells stay available while nearby four-metre cells are created/disposed.
    // Both levels retain identical four-metre boundary vertices, with no skirts/gaps.
    // Keep coarse cells in spatial batches. Repack only changed batches' indices
    // when fine tiles replace them, avoiding hundreds of individual draw calls.
    for (let i = 0; i < cellGeometry.length; i += 16) {
        const chunk = cellGeometry.slice(i, i + 16), geometry = mergeGeometries(chunk.map(c => c.geometry)), mesh = new T.Mesh(geometry, material);
        const batch = { mesh, source: geometry.index.array, cells: [] };
        let offset = 0;
        for (const c of chunk) {
            const count = c.geometry.index.count, cell = { x: c.x, z: c.z, batch, from: offset, to: offset + count };
            offset += count;
            batch.cells.push(cell);
            cells.set(`${c.x / 320},${c.z / 320}`, cell);
            c.geometry.dispose();
        }
        geometry.setIndex(new T.BufferAttribute(batch.source.slice(), 1));
        mesh.receiveShadow = true;
        group.add(mesh);
        await yieldBuild();
    }
    cellGeometry.length = 0;
    // Batch the fixed distant landscape and Kodiak, never the replaceable local cells.
    const distant = new Map();
    for (const t of tiles) {
        const key = Math.floor(t.x / 10240) + ',' + Math.floor(t.z / 10240);
        const batch = distant.get(key) ?? [];
        batch.push(t.geometry);
        distant.set(key, batch);
    }
    for (const batch of distant.values()) {
        const g = mergeGeometries(batch);
        for (const t of batch)
            t.dispose();
        const m = new T.Mesh(g, material);
        m.name = 'Distant Jezero relief';
        m.receiveShadow = true;
        group.add(m);
        await yieldBuild();
    }
    tiles.length = 0;
    group.name = 'USGS measured Jezero landscape';
    let previousX = Infinity, previousZ = Infinity, previousFX = Infinity, previousFZ = Infinity, pending = true;
    return { group, get pending() { return pending; }, get fineCount() { return [...cells.values()].filter(c => c.fine).length; }, update(eye, focus) {
            const cx = Math.floor(eye.x / 320), cz = Math.floor(eye.z / 320);
            const fx = focus ? Math.floor(focus.x / 320) : Infinity, fz = focus ? Math.floor(focus.z / 320) : Infinity;
            if (!pending && cx === previousX && cz === previousZ && fx === previousFX && fz === previousFZ)
                return;
            previousX = cx;
            previousZ = cz;
            previousFX = fx;
            previousFZ = fz;
            const missing = [], changed = new Set();
            for (const [key, cell] of cells) {
                const [x, z] = key.split(',').map(Number), near = (Math.abs(x - cx) <= 2 && Math.abs(z - cz) <= 2) || (Math.abs(x - fx) <= 1 && Math.abs(z - fz) <= 1);
                if (!near && cell.fine) {
                    group.remove(cell.fine);
                    cell.fine.geometry.dispose();
                    cell.fine = undefined;
                    changed.add(cell.batch);
                }
                if (near && !cell.fine)
                    missing.push(cell);
            }
            missing.sort((a, b) => Math.hypot(a.x + 160 - eye.x, a.z + 160 - eye.z) - Math.hypot(b.x + 160 - eye.x, b.z + 160 - eye.z));
            let built = 0;
            const started = performance.now();
            for (const cell of missing.slice(0, 2)) {
                cell.fine = new T.Mesh(tile(cell.x, cell.z, 320, 4), material);
                cell.fine.name = `Fine Jezero tile ${cell.x},${cell.z}`;
                cell.fine.receiveShadow = true;
                group.add(cell.fine);
                changed.add(cell.batch);
                built++;
                if (performance.now() - started >= 4)
                    break;
            }
            pending = missing.length > built;
            for (const batch of changed) {
                const index = batch.mesh.geometry.index;
                let offset = 0;
                for (const cell of batch.cells)
                    if (!cell.fine) {
                        index.array.set(batch.source.subarray(cell.from, cell.to), offset);
                        offset += cell.to - cell.from;
                    }
                index.needsUpdate = true;
                batch.mesh.geometry.setDrawRange(0, offset);
                batch.mesh.visible = offset > 0;
            }
        } };
}
return {makeContactGround,makeSolidIndex,makeHistoricalTracks,makeLandscape};})();function sm(){let e=new J(new ka(1,32,16),new Jr({side:1,depthWrite:!1,toneMapped:!1,uniforms:{zenith:{value:new K(`#75482f`)},horizon:{value:new K(`#b37d57`)}},vertexShader:`varying vec3 direction;void main(){direction=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform vec3 zenith,horizon;varying vec3 direction;void main(){float up=max(0.,normalize(direction).y);gl_FragColor=vec4(mix(horizon,zenith,pow(up,.45)),1.);
#include <colorspace_fragment>}`}));return e.scale.setScalar(45e3),e.frustumCulled=!1,e.renderOrder=-1,e}function cm(e){let t=new Y;t.name=`Three Forks sample depot`;let n=new X({color:14144716,metalness:.55,roughness:.36}),r=new X({color:3356216,metalness:.45,roughness:.42}),i=new Xi(.012,.012,.132,16),a=new Xi(.014,.014,.015,16),o=new Xi(.018,.016,.039,12),s=new Xi(.0128,.0128,.012,16),c=document.createElement(`canvas`);c.width=128,c.height=32;let l=c.getContext(`2d`);l.scale(64,16);let u=l.createRadialGradient(1,1,.1,1,1,1);u.addColorStop(0,`rgba(0,0,0,.48)`),u.addColorStop(1,`rgba(0,0,0,0)`),l.fillStyle=u,l.fillRect(0,0,2,2);let d=new fr({map:new Ki(c),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});for(let c of e.depot){let l=new Y;l.name=c.name,l.position.set(c.x,e.ground(c.x,c.z)+.019,c.z);let u=new U(Math.sin(c.heading),0,Math.cos(c.heading));u.y=(e.ground(c.x+u.x*.1,c.z+u.z*.1)-e.ground(c.x-u.x*.1,c.z-u.z*.1))/.2,u.normalize(),l.quaternion.setFromUnitVectors(new U(0,1,0),u);for(let[e,t,c]of[[i,n,-.012],[a,n,-.0855],[o,r,.0735],[s,r,-.035]]){let n=new J(e,t);n.position.y=c,n.castShadow=n.receiveShadow=!0,l.add(n)}let f=new Oa(.24,.075),p=f.attributes.position;for(let t=0;t<p.count;t++){let n=p.getX(t),r=p.getY(t),i=c.x+n*Math.sin(c.heading)+r*Math.cos(c.heading),a=c.z+n*Math.cos(c.heading)-r*Math.sin(c.heading);p.setXYZ(t,i,e.ground(i,a)+.002,a)}t.add(new J(f,d)),t.add(l)}let f=new Li(new Ea(1,0),new X({roughness:1}),4200),p=new Wn,m=new K,h=e.depot.find(e=>e.name===`Atsah`),g=684,_=0,v=()=>(g=Math.imul(g,1664525)+1013904223>>>0,g/4294967296);for(let t=0;t<4200;t++){let n=Math.sqrt(v())*(t<2600?9:55),r=v()*Math.PI*2,i=h.x+Math.cos(r)*n,a=h.z+Math.sin(r)*n;if(e.depot.some(e=>Math.hypot(e.x-i,e.z-a)<.22))continue;let o=.004+v()**2*.024,s=o*(.25+v()*.3),c=.32+v()*.16;p.position.set(i,e.ground(i,a)+s*.4,a),p.rotation.set(v()*.5,v()*Math.PI,v()*.5),p.scale.set(o,s,o*(.65+v()*.6)),p.updateMatrix(),f.setMatrixAt(_,p.matrix),m.setRGB(c,c*.85,c*.72,Fe),f.setColorAt(_++,m)}return f.count=_,f.receiveShadow=!0,f.name=`Interpreted depot gravel`,f.computeBoundingSphere(),t.add(f),t}var lm=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function um(e,t){return lm(e/12)*lm((t-e)/18)}function dm(e,t,n,r){let i=0;for(let a of e){let e=Math.hypot(t-a.x,n-a.z)/a.radius,o=Math.max(0,1-e*e);i+=o*o*a.strength*(.92+.08*Math.sin(r*.13+a.phase))}return Math.min(1,i)}function fm(e,t=Math.random){let n=25+t()*40,r=0,i=[],a=(e,n)=>e+t()*(n-e);return{get nextAt(){return n},update(o,s){if(i=i.filter(e=>o<e.start+e.duration),o>=n){if(i.length<2){let n=a(280,520),c=t()*Math.PI*2,l=a(2,4.5),u=r===0||t()<.85,d=n*a(.25,.6),f=u?s.x-Math.cos(c)*d:a(e.west,e.east),p=u?s.z-Math.sin(c)*d:a(-e.north,-e.south);i.push({id:++r,x:Math.max(e.west,Math.min(e.east,f)),z:Math.max(-e.north,Math.min(-e.south,p)),radius:n,strength:a(.55,.95),phase:t()*Math.PI*2,start:o,duration:a(45,80),vx:Math.cos(c)*l,vz:Math.sin(c)*l})}n=o+a(55,125)}return i.map(e=>{let t=o-e.start;return{id:e.id,x:e.x+e.vx*t,z:e.z+e.vz*t,radius:e.radius,phase:e.phase,strength:e.strength*um(t,e.duration)}})}}}function pm(e,t=Math.random){let n=fm(e.bounds,t),r=new Y;r.name=`Random drifting dust storms`;let i=new Oa(1,1),a=new Wn,o=Array.from({length:2},()=>{let e=new Jr({transparent:!0,depthWrite:!1,side:2,uniforms:{time:{value:0},opacity:{value:0},dustColor:{value:new K(`#b38b67`)}},vertexShader:`varying vec2 vUv;varying float distanceFade;uniform float time;
    void main(){vUv=uv;vec4 center=instanceMatrix*vec4(0.,0.,0.,1.);vec4 mv=modelViewMatrix*center;distanceFade=smoothstep(3.,35.,-mv.z);mv.xy+=position.xy*vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz));gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying vec2 vUv;varying float distanceFade;uniform float time;uniform float opacity;uniform vec3 dustColor;
    void main(){vec2 p=vUv*2.-1.;float edge=pow(max(0.,1.-dot(p,p)),2.);float cloud=.62+.18*sin(vUv.x*14.+time*.4+sin(vUv.y*9.))+.12*sin(vUv.y*19.-time*.2);
     gl_FragColor=vec4(dustColor,edge*cloud*.11*opacity*distanceFade);
#include <colorspace_fragment>}`}),t=new Li(i,e,48);return t.name=`Local dust front`,t.instanceMatrix.setUsage(Ve),t.visible=!1,r.add(t),{mesh:t,material:e,id:-1,last:-1/0,offsets:[]}}),s=[];return{group:r,get cells(){return s},get nextAt(){return n.nextAt},update(t,r,i){s=n.update(t,r),s.forEach(e=>{if(o.some(t=>t.id===e.id))return;let t=o.find(e=>!s.some(t=>t.id===e.id));t.id=e.id,t.last=-1/0;let n=e.id*11939,r=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);t.offsets=Array.from({length:48},()=>{let t=r()*Math.PI*2,n=Math.sqrt(r())*e.radius;return{x:Math.cos(t)*n,z:Math.sin(t)*n,height:5+r()*22,width:70+r()*110,tall:14+r()*36}})});for(let n of o){let o=s.find(e=>e.id===n.id);n.mesh.visible=!!o&&o.strength>.001&&Math.hypot(r.x-o.x,r.z-o.z)<2500,!(!o||!n.mesh.visible)&&(t-n.last>=.25&&(n.offsets.forEach((t,r)=>{let i=o.x+t.x,s=o.z+t.z;a.position.set(i,e.ground(i,s)+t.height,s),a.scale.set(t.width,t.tall,1),a.updateMatrix(),n.mesh.setMatrixAt(r,a.matrix)}),n.mesh.instanceMatrix.needsUpdate=!0,n.mesh.computeBoundingSphere(),n.last=t),n.material.uniforms.time.value=t,n.material.uniforms.opacity.value=o.strength*(i?.22:1))}let c=dm(s,r.x,r.z,t),l=Math.max(Il(r.x+e.originEast,e.originNorth-r.z),Bl(r.x+e.originEast,e.originNorth-r.z).west*.72);return{density:32e-5-l*(i?295e-6:15e-5)+c*(i?22e-5:.00125),local:c*(i?.3:1),rim:l}}}}function mm(terrain){return jezeroPerf.makeHistoricalTracks(terrain)}function hm(e){let t=new Y;t.name=`Natural scattered rocks`;let n=new $i(1,0),r=new X({roughness:1}),i=new Wn,a=new K,o={value:1800};r.onBeforeCompile=e=>{e.uniforms.rockRange=o,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 rockPoint;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
rockPoint=(modelMatrix*instanceMatrix*vec4(transformed,1.)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 rockPoint;uniform float rockRange;`).replace(`#include <color_fragment>`,`#include <color_fragment>
   float distanceFade=1.-smoothstep(rockRange*.72,rockRange,distance(cameraPosition.xz,rockPoint.xz));
   float stipple=fract(sin(dot(floor(rockPoint.xz*70.),vec2(12.9898,78.233)))*43758.5453);
   if(stipple>=distanceFade)discard;
   float fade=1.-smoothstep(.025,.2,length(fwidth(rockPoint)));
   float grain=fract(sin(dot(floor(rockPoint*55.),vec3(12.9898,78.233,37.719)))*43758.5453);
   float flecks=smoothstep(.72,.94,grain);
   diffuseColor.rgb*=1.+((grain-.5)*.15-flecks*.10)*fade;`)};let s=new Map;for(let t of e.rocks){let e=Math.floor(t.x/640)+`,`+Math.floor(t.z/640),n=s.get(e)??[];n.push(t),s.set(e,n)}for(let[o,c]of s){let s=new Li(n,r,c.length);s.name=`Rock cell `+o,c.forEach((t,n)=>{i.position.set(t.x,e.ground(t.x,t.z)+t.height*.35,t.z),i.rotation.set(0,t.x+t.z,0),i.scale.set(t.radius,t.height*.65,t.radius*.85),i.updateMatrix(),s.setMatrixAt(n,i.matrix),a.setRGB(t.shade,t.shade*.82,t.shade*.67,Fe),s.setColorAt(n,a)}),s.castShadow=s.receiveShadow=!0,s.computeBoundingSphere(),t.add(s)}return Object.assign(t,{update(e,n=1800){o.value=n;for(let r of t.children){let t=r,i=t.boundingSphere;t.visible=Math.hypot(e.x-i.center.x,e.z-i.center.z)<n+i.radius}}})}function gm(e){let t=new Y;t.name=`Continuous Jezero surface detail`;let n=new Ea(1,0),r=new X({roughness:1});r.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 fragmentWorld;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
fragmentWorld=(modelMatrix*instanceMatrix*vec4(transformed,1.)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 fragmentWorld;`).replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
   float fade=1.-smoothstep(110.,180.,distance(cameraPosition.xz,fragmentWorld.xz));
   float stipple=fract(sin(dot(floor(fragmentWorld.xz*90.),vec2(12.9898,78.233)))*43758.5453);
   if(stipple>=fade)discard;`).replace(`#include <color_fragment>`,`#include <color_fragment>
   float closeGrain=1.-smoothstep(.03,.2,length(fwidth(fragmentWorld)));
   float grain=fract(sin(dot(floor(fragmentWorld*70.),vec3(12.9898,78.233,37.719)))*43758.5453);
   diffuseColor.rgb*=1.+(grain-.5)*.18*closeGrain;`)};let i=new Map,a=new Wn,o=new K,s=new U(0,1,0),c=new U,l=new ht,u=1/0,d=1/0;function f(u,d){let f=im(u,d,e.originEast,e.originNorth).filter(t=>!e.depot.some(e=>Math.hypot(e.x-t.x,e.z-t.z)<t.size+.23)),p=new Li(n,r,f.length);p.name=`Surface cell ${u},${d}`,f.forEach((t,n)=>{let r=e.ground(t.x,t.z);c.set(e.ground(t.x-1,t.z)-e.ground(t.x+1,t.z),2,e.ground(t.x,t.z-1)-e.ground(t.x,t.z+1)).normalize(),a.position.set(t.x,r-.012,t.z),a.quaternion.setFromUnitVectors(s,c).multiply(l.setFromAxisAngle(s,t.angle)),a.scale.set(t.size,t.height,t.size*t.stretch),a.updateMatrix(),p.setMatrixAt(n,a.matrix),o.setRGB(t.shade,t.shade*.88,t.shade*.74,Fe),p.setColorAt(n,o)}),p.receiveShadow=!0,p.computeBoundingSphere(),i.set(u+`,`+d,p),t.add(p)}return{group:t,update(e){let n=Math.floor(e.x/64),r=Math.floor(e.z/64),a=Math.max(Math.abs(n-u),Math.abs(r-d))>1;if(n===u&&r===d&&i.size===49)return;u=n,d=r;for(let[e,a]of i){let[o,s]=e.split(`,`).map(Number);(Math.abs(o-n)>3||Math.abs(s-r)>3)&&(t.remove(a),a.dispose(),i.delete(e))}let o=[];for(let t=r-3;t<=r+3;t++)for(let r=n-3;r<=n+3;r++)i.has(r+`,`+t)||o.push({x:r,z:t,distance:Math.hypot((r+.5)*64-e.x,(t+.5)*64-e.z)});o.sort((e,t)=>e.distance-t.distance);for(let e of o.slice(0,a?49:4))f(e.x,e.z)}}}var _m=class{constructor(e,t,n,jezeroLandscape){if(this.terrain=t,this.perseverance=n,this.scene=new ci,this.sky=sm(),this.camera=new $r(55,1,.08,9e4),this.scooter=Rp(),this.lrv=Xp({rocket:!0}),this.vehicle=new Y,this.roverStunt=new Y,this.guidance=new Y,this.downthrust=Bp(),this.counterThrust=zp(),this.position=new U,this.look=new U,this.initialized=!1,this.time=0,this.weatherTime=0,this.orbit=0,this.distance=7,this.photo=null,this.photoYaw=0,this.photoPitch=0,this.photoZoom=1,this.horizon=new K(`#b37d57`),this.highHorizon=new K(`#c9b39a`),this.zenith=new K(`#75482f`),this.highZenith=new K(`#a58c72`),this.cameraSolids=jezeroPerf.makeSolidIndex(t.solids),this.tracks=mm(t),this.rocks=hm(t),this.weather=pm(t),this.surfaceDetail=gm(t),this.landscape=jezeroLandscape,this.renderer=new El({canvas:e,antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.outputColorSpace=Fe,this.renderer.toneMapping=0,this.scene.background=new K(`#b37d57`),this.scene.fog=new si(`#b37d57`,32e-5),this.scene.add(this.sky,new to(16771799,5325624,1)),this.sun=new co(16774887,2),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-48,right:48,top:48,bottom:-48,near:.1,far:400}),this.sun.shadow.normalBias=.07,this.sun.shadow.bias=-15e-5,this.scene.add(this.sun,this.sun.target,this.landscape.group,cm(t),this.surfaceDetail.group,this.rocks,this.tracks,this.weather.group),t.scenery.length){let e=[],n=[];for(let r=0;r<t.scenery.length;r+=18)for(let i of[0,2,1]){let a=r+i*6;e.push(...t.scenery.slice(a,a+3));let o=new K().setRGB(t.scenery[a+3],t.scenery[a+4],t.scenery[a+5],Fe);n.push(o.r,o.g,o.b)}let r=new Er;r.setAttribute(`position`,new q(e,3)),r.setAttribute(`color`,new q(n,3)),r.computeVertexNormals();let i=new J(r,new X({vertexColors:!0,roughness:1,side:2}));i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i)}this.vehicle.add(this.scooter.root,this.roverStunt,this.downthrust,this.counterThrust.group),this.roverStunt.add(this.lrv.group,this.perseverance.group),this.scene.add(this.vehicle,this.guidance),this.resize()}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight,!1)}reset(){this.initialized=!1,this.orbit=0}setSites(e){Qp(this.guidance,this.terrain.stops,this.terrain.ground,e)}beginScene(e){this.photo=e,this.photoYaw=this.photoPitch=0,this.photoZoom=1;let t=e.cameraEye??{...e,height:2.2};this.position.set(t.x,this.terrain.ground(t.x,t.z)+t.height,t.z)}endScene(){this.photo=null}update(e,t,n=!1,r=!1,i=e.buggy,a=!0){let o=i,s=e.scooter,c=e.tricks.frame.active?e.tricks.frame.pose:void 0;this.time+=t,a&&!this.photo&&(this.weatherTime+=t);for(let e of this.guidance.children)e.material.uniforms.time.value=this.time;this.guidance.visible=!this.photo,this.vehicle.visible=!this.photo,this.downthrust.visible=e.vehicle!==`scooter`&&!o.grounded&&o.downThrust&&(e.vehicle===`lrv`||r)&&!this.photo,this.scooter.root.visible=e.vehicle===`scooter`,this.lrv.group.visible=e.vehicle===`lrv`,this.perseverance.group.visible=e.vehicle===`perseverance`,this.counterThrust.update(o.vx,o.vz,o.heading,e.vehicle===`lrv`&&!o.grounded&&!this.photo?e.airBrakes.thrust:0,this.time),this.scooter.update(s,!0,s.down,o.spin,o.steer,n,r,c);let l={speed:e.lrv.speedMps,steer:o.steer,pitch:e.lrv.pitch,roll:e.lrv.roll,wheelOffsets:e.lrv.wheelOffsets,grounded:o.grounded,rocketThrust:n&&!r?e.lrv.rocketThrust:0,dt:t};this.lrv.update(l),this.perseverance.update(l),this.roverStunt.rotation.set(.035*(c?.preparation??0),c?.yaw??0,c?.roll??0),this.vehicle.position.set(o.x,o.y,o.z),this.vehicle.rotation.y=o.heading;let u=this.terrain.ground,d=this.photo?.cameraEye??o;if(this.sun.target.position.set(d.x,u(d.x,d.z),d.z),this.sun.position.copy(this.sun.target.position).add(new U(-54,79,-72)),!this.photo)this.initialized=Zp(o,t,u,this.cameraSolids.query(Math.min(o.x-this.distance,this.position.x)-.35,Math.min(o.z-this.distance,this.position.z)-.35,Math.max(o.x+this.distance,this.position.x)+.35,Math.max(o.z+this.distance,this.position.z)+.35),this.position,this.look,this.initialized,this.orbit,this.distance);else{let e=this.photo.focus??this.photo,n=this.photo.cameraEye??{x:this.photo.x,z:this.photo.z,height:2.2},r=new U(n.x,u(n.x,n.z)+n.height,n.z),i=new U(e.x,u(e.x,e.z)+(this.photo.focus?.heightOffset??1),e.z).clone().sub(r),a=Math.atan2(i.x,i.z)+this.photoYaw,o=Math.atan2(i.y,Math.hypot(i.x,i.z))-this.photoPitch,s=new U(Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o));this.position.lerp(r,1-Math.exp(-t*4)),this.look.copy(this.position).addScaledVector(s,100)}let f=this.photo?.focus?Math.hypot(this.photo.focus.x-(this.photo.cameraEye?.x??this.photo.x),this.photo.focus.z-(this.photo.cameraEye?.z??this.photo.z)):1,p=this.photo?.viewWidth?Math.max(26,mt.radToDeg(2*Math.atan(this.photo.viewWidth/(2*f*this.camera.aspect)))):35,m=this.photo?mt.clamp(p*this.photoZoom,12,85):55;this.camera.fov!==m&&(this.camera.fov=m,this.camera.updateProjectionMatrix()),this.rocks.update(this.position,this.photo?Math.max(1800,f+300):1800),this.landscape.update(this.position,this.photo?.focus),this.surfaceDetail.update(this.position),this.tracks.update(this.position);let h=this.weather.update(this.weatherTime,this.position,!!this.photo);this.scene.fog.density=h.density,this.sun.intensity=2-h.local*.55;let g=this.sky.material.uniforms;this.scene.fog.color.copy(this.horizon).lerp(this.highHorizon,h.rim*.8),g.horizon.value.copy(this.scene.fog.color),g.zenith.value.copy(this.zenith).lerp(this.highZenith,h.rim*.8),this.sky.position.copy(this.position),this.camera.position.copy(this.position),this.camera.lookAt(this.look),this.renderer.render(this.scene,this.camera)}};async function vm(){let e=new URL(`../../tools/prototypes/mars-renderer/driving-models.js`,document.baseURI).href,{perseveranceBody:t,drivingWheel:n}=await Yl(async()=>{let{perseveranceBody:t,drivingWheel:n}=await import(e);return{perseveranceBody:t,drivingWheel:n}},[],import.meta.url),r=.28,i=1.38*r,a=.55,o=new Y,s=new Y;o.name=`perseverance`,o.add(s);let c=new X({vertexColors:!0,roughness:.8});function l(e,t=0){let n=[],i=[];for(let a=0;a<e.length;a+=27)for(let o of[0,18,9]){let s=a+o;n.push(e[s]*r,(e[s+2]-t)*r,e[s+1]*r),i.push(e[s+6],e[s+7],e[s+8])}let a=new Er;a.setAttribute(`position`,new q(n,3)),a.setAttribute(`color`,new q(i,3)),a.computeVertexNormals();let o=new J(a,c);return o.castShadow=o.receiveShadow=!0,o}let u=l(t());u.position.y=-.55,s.add(u);let d=[-1,1].flatMap(e=>[-1,0,1].map(t=>{let o=new Y,c=l(n(`perseverance`),1.38);return o.position.set(e*3.78*r,i-a,t*3.48*r),o.add(c),s.add(o),{steering:o,spin:c,side:e,axle:t}})),f=new Y;f.position.z=-.25,s.add(f);let p=Jp(f,new X({color:11449525,metalness:.7,roughness:.4}),new X({color:2435888,roughness:.6}),new X({color:12231018,metalness:.65,roughness:.45})),m=0,h=0,g=0,_=1;return{group:o,update({speed:e,steer:t,pitch:n,roll:r,dt:o,wheelOffsets:c,grounded:l=!0,rocketThrust:u=0}){let f=Math.max(0,Math.min(.1,o));if(p.update(u,f),l){let e=Math.tan(r),t=Math.tan(n);_=1/Math.hypot(1,e,t),g=Math.atan(e/Math.hypot(1,t))-r,h=a*(1/_-1)}else{let e=Math.exp(-f*12);h*=e,g*=e,_+=(1-_)*(1-e)}s.position.y=h,s.rotation.set(-n,0,r+g,`YXZ`),m=(m+e*f/i)%(Math.PI*2);for(let e of d){let n=e.side<0?0:1,r=c?.[n]??0,o=c?.[n+2]??0;e.steering.position.y=i-a+(e.axle>0?r:e.axle<0?o:(r+o)/2)*_,e.steering.rotation.y=mt.clamp(t,-.6,.6)*e.axle,e.spin.rotation.x=m}}}}var ym=class{constructor(e=1,t=1,n=1,r=1){this.width=e,this.height=t,this.imageWidth=n,this.imageHeight=r,this.scale=1,this.x=0,this.y=0}get fit(){let e=Math.min(this.width/this.imageWidth,this.height/this.imageHeight);return{width:this.imageWidth*e,height:this.imageHeight*e}}clamp(){let e=this.fit,t=Math.max(0,(e.width*this.scale-this.width)/2),n=Math.max(0,(e.height*this.scale-this.height)/2);this.x=Math.max(-t,Math.min(t,this.x))||0,this.y=Math.max(-n,Math.min(n,this.y))||0}zoom(e,t=0,n=0){let r=Math.max(1,Math.min(6,e)),i=r/this.scale;this.x=t-(t-this.x)*i,this.y=n-(n-this.y)*i,this.scale=r,this.clamp()}pan(e,t){this.x+=e,this.y+=t,this.clamp()}reset(){this.scale=1,this.x=this.y=0}};function bm(e,t){let n=new ym,r=new Map,i=()=>{t.style.transform=`translate(${n.x}px,${n.y}px) scale(${n.scale})`,e.style.cursor=n.scale>1?`grab`:`zoom-in`},a=()=>{let r=e.getBoundingClientRect();!r.width||!r.height||(n.width=r.width,n.height=r.height,n.imageWidth=t.naturalWidth||1,n.imageHeight=t.naturalHeight||1,n.clamp(),i())},o=()=>{r.clear(),n.reset(),a()},s=()=>{let e=[...r.values()];return{x:e.reduce((e,t)=>e+t.x,0)/e.length,y:e.reduce((e,t)=>e+t.y,0)/e.length,span:e.length>1?Math.hypot(e[1].x-e[0].x,e[1].y-e[0].y):0}};return e.onpointerdown=t=>{t.preventDefault(),e.setPointerCapture(t.pointerId),r.set(t.pointerId,{x:t.clientX,y:t.clientY})},e.onpointermove=t=>{if(!r.has(t.pointerId))return;let a=s();r.set(t.pointerId,{x:t.clientX,y:t.clientY});let o=s(),c=e.getBoundingClientRect();n.pan(o.x-a.x,o.y-a.y),a.span>0&&o.span>0&&n.zoom(n.scale*o.span/a.span,o.x-c.left-c.width/2,o.y-c.top-c.height/2),i()},e.onpointerup=e.onpointercancel=e.onlostpointercapture=e=>{r.delete(e.pointerId)},e.onwheel=t=>{t.preventDefault();let r=e.getBoundingClientRect();n.zoom(n.scale*Math.exp(-t.deltaY*.002),t.clientX-r.left-r.width/2,t.clientY-r.top-r.height/2),i()},e.ondblclick=()=>{n.zoom(n.scale>1?1:2.5),i()},t.draggable=!1,t.onload=a,new ResizeObserver(a).observe(e),{fit:a,reset:o,zoom:e=>{n.zoom(n.scale*e),i()}}}var xm=class{constructor(){this.phase=`riding`,this.dwell=0,this.age=0}get locked(){return this.phase!==`riding`}arrive(e,t){return this.locked||(this.dwell=0,!e)?!1:(this.phase=`revealing`,this.age=0,this.dwell=0,!0)}begin(){this.phase=`revealing`,this.age=0,this.dwell=0}advance(e){return this.age+=e,this.phase===`revealing`&&this.age>=1.4?(this.phase=`reading`,`read`):this.phase===`returning`&&this.age>=1?(this.phase=`riding`,this.dwell=0,`ride`):null}view(){this.phase===`reading`&&(this.phase=`camera`)}read(){this.phase===`camera`&&(this.phase=`reading`)}resume(){this.phase=`returning`,this.age=0}reset(){this.phase=`riding`,this.age=this.dwell=0}};function Sm(e,t,n=ep.scooter){let r=t.x-e.x,i=t.z-e.z,a=Math.sin(e.heading),o=Math.cos(e.heading),s=Math.max(0,Math.abs(r*o-i*a)-n.halfWidthM),c=Math.max(0,Math.abs(r*a+i*o)-n.halfLengthM);return s*s+c*c<=t.radius*t.radius}function Cm(e,t,n=ep.scooter){let r=t.x-e.x,i=t.z-e.z,a=Math.sin(e.heading),o=Math.cos(e.heading),s=r*o-i*a,c=r*a+i*o;if(Math.hypot(r,i)>t.radius+Math.hypot(n.halfWidthM,n.halfLengthM))return 0;let l=0;for(let e=0;e<96;e++){let r=-n.halfLengthM+(e+.5)*2*n.halfLengthM/96-c,i=t.radius*t.radius-r*r;if(i<=0)continue;let a=Math.sqrt(i);l+=Math.max(0,Math.min(n.halfWidthM,s+a)-Math.max(-n.halfWidthM,s-a))}return l/(192*n.halfWidthM)}function wm(e,t,n=ep.scooter){return e.grounded&&Math.hypot(e.vx,e.vz)<.08&&Cm(e,t,n)>=.5}function Tm(e,t,n=!1){let r=e.findIndex(e=>!t.includes(e.id));return n&&r===-1?[]:e.flatMap((e,n)=>t.includes(e.id)?[{index:n,id:e.id,completed:!0}]:n===r?[{index:n,id:e.id,completed:!1}]:[])}var Em=class{constructor(){this.blocked=new Set}suppressAt(e,t,n){for(let r of e)Sm(t,r,n)&&this.blocked.add(r.id)}update(e,t,n){for(let r of e)Sm(t,r,n)||this.blocked.delete(r.id)}allows(e){return!this.blocked.has(e)}},Dm=Object.freeze({halfWidthM:.32,halfLengthM:.65,vehicleRadiusM:Math.hypot(.32,.65),rideHeightM:.56,ringMarginM:.75,solidMarginM:.75,boundaryMarginM:2,maxSlopeDegrees:18,maxRoughnessM:.18,maxHeightSpanM:.5,escapeLengthM:4,escapeStepM:.5});function Om(e=ep.scooter){return{...Dm,...e,vehicleRadiusM:tp(e),maxHeightSpanM:e.halfLengthM>.65?1.1:Dm.maxHeightSpanM}}var km=[6,8,4,10,14,20,28,40],Am=Array.from({length:24},(e,t)=>t*Math.PI/12),jm=e=>Number.isFinite(e.x)&&Number.isFinite(e.z),Mm=e=>Number.isFinite(e)&&e>=0;function Nm(e,t,n){let r=t.bounds,i=n.vehicleRadiusM;return e.x<r.west+i+n.boundaryMarginM||e.x>r.east-i-n.boundaryMarginM||e.z<-r.north+i+n.boundaryMarginM||e.z>-r.south-i-n.boundaryMarginM||t.rings.some(t=>Math.hypot(e.x-t.x,e.z-t.z)<=t.radius+i+n.ringMarginM)?!1:t.solids.every(t=>Math.hypot(Math.max(0,Math.abs(e.x-t.x)-t.hx),Math.max(0,Math.abs(e.z-t.z)-t.hz))>i+n.solidMarginM)}function Pm(e,t,n,r){if(!Nm(e,n,r)||!Nm(t,n,r))return!1;let i=t.x-e.x,a=t.z-e.z,o=i*i+a*a;for(let t of n.rings){let n=Math.max(0,Math.min(1,((t.x-e.x)*i+(t.z-e.z)*a)/o));if(Math.hypot(e.x+i*n-t.x,e.z+a*n-t.z)<=t.radius+r.vehicleRadiusM+r.ringMarginM)return!1}for(let t of n.solids){let n=r.vehicleRadiusM+r.solidMarginM,o=0,s=1;for(let[r,c,l,u]of[[e.x,i,t.x-t.hx-n,t.x+t.hx+n],[e.z,a,t.z-t.hz-n,t.z+t.hz+n]])if(Math.abs(c)<1e-12){if(r<l||r>u){o=1/0;break}}else{let e=(l-r)/c,t=(u-r)/c;o=Math.max(o,Math.min(e,t)),s=Math.min(s,Math.max(e,t))}if(o<=s)return!1}return!0}function Fm(e,t,n,r){let i={x:Math.sin(t),z:Math.cos(t)},a={x:Math.cos(t),z:-Math.sin(t)},o=[];for(let t of[-r.halfLengthM,0,r.halfLengthM])for(let s of[-r.halfWidthM,0,r.halfWidthM]){let r=n.height(e.x+s*a.x+t*i.x,e.z+s*a.z+t*i.z);if(!Number.isFinite(r))return null;o.push({u:s,v:t,height:r})}let s=o[4].height,c=(o[5].height-o[3].height)/(2*r.halfWidthM),l=(o[7].height-o[1].height)/(2*r.halfLengthM),u=Math.hypot(c,l),d=0,f=1/0,p=-1/0;for(let e=0;e<o.length;e++){let t=o[e];f=Math.min(f,t.height),p=Math.max(p,t.height),d=Math.max(d,Math.abs(t.height-s-c*t.u-l*t.v));for(let n=e+1;n<o.length;n++){let e=o[n];u=Math.max(u,Math.abs(t.height-e.height)/Math.hypot(t.u-e.u,t.v-e.v))}}let m=Math.atan(u)*180/Math.PI;return m>r.maxSlopeDegrees||d>r.maxRoughnessM||p-f>r.maxHeightSpanM?null:{height:s,slope:m,roughness:d,span:p-f}}function Im(e,t,n={}){let r=t.bounds,i=n.gapsM??km,a=n.angles??Am;if(!jm(e)||![r.west,r.east,r.south,r.north].every(Number.isFinite)||r.west>=r.east||r.south>=r.north||t.rings.some(e=>!jm(e)||!Mm(e.radius))||t.solids.some(e=>!jm(e)||!Mm(e.hx)||!Mm(e.hz))||i.some(e=>!Mm(e))||a.some(e=>!Number.isFinite(e)))return{ok:!1,reason:`invalid-input`,candidatesTested:0};let o=e.stopId?t.rings.find(t=>t.id===e.stopId):void 0,s=o??e,c=Om(n.vehicle),l=0;for(let e of i)for(let n of a){l++;let r=(o?.radius??0)+e;if(r<=c.vehicleRadiusM+c.ringMarginM)continue;let i={x:-Math.cos(n),z:Math.sin(n)},a={x:s.x+i.x*r,z:s.z+i.z*r},u=Math.atan2(s.x-a.x,s.z-a.z);if(!Pm(a,{x:a.x+i.x*c.escapeLengthM,z:a.z+i.z*c.escapeLengthM},t,c))continue;let d=0,f=0,p=0,m=NaN,h=!0;try{for(let e=0;e<=Math.ceil(c.escapeLengthM/c.escapeStepM);e++){let n=Math.min(c.escapeLengthM,e*c.escapeStepM),r={x:a.x+i.x*n,z:a.z+i.z*n};if(!Nm(r,t,c)){h=!1;break}let o=Fm(r,u,t,c);if(!o){h=!1;break}e===0&&(m=o.height),d=Math.max(d,o.slope),f=Math.max(f,o.roughness),p=Math.max(p,o.span)}}catch{h=!1}if(h&&Number.isFinite(m))return{ok:!0,pose:{...a,y:m+c.rideHeightM,heading:u,vx:0,vy:0,vz:0,grounded:!0},assessment:{maxSlopeDegrees:d,maxRoughnessM:f,maxHeightSpanM:p,distanceM:r,candidatesTested:l}}}return{ok:!1,reason:`no-safe-arrival`,candidatesTested:l}}function Lm(e,t,n=ep.scooter){if(!jm(e)||!Number.isFinite(e.heading))return!1;let r=Om(n);try{return Nm(e,t,r)&&!!Fm(e,e.heading,t,r)}catch{return!1}}function Rm(e,t,n){let r=Om(n),i={x:-Math.sin(e.heading),z:-Math.cos(e.heading)};if(Lm(e,t,n)&&Pm(e,{x:e.x+i.x*r.escapeLengthM,z:e.z+i.z*r.escapeLengthM},t,r)){let a=!0;for(let n=.5;n<=r.escapeLengthM;n+=.5)if(!Fm({x:e.x+i.x*n,z:e.z+i.z*n},e.heading,t,r)){a=!1;break}if(a)return{ok:!0,pose:{...e,y:t.height(e.x,e.z)+n.rideHeightM,vx:0,vy:0,vz:0,grounded:!0},assessment:{maxSlopeDegrees:0,maxRoughnessM:0,maxHeightSpanM:0,distanceM:0,candidatesTested:1}}}return Im({...e,id:`switch`,name:`Vehicle switch`,kind:`exploration`,stopIds:[],historical:!1},t,{vehicle:n,gapsM:[2,3,4,6,8,12,16]})}function zm(e,t){let n=t===`touch`,r=e=>n?`<span class="control-icon">${e}</span>`:`<kbd>${e}</kbd>`,i=r(n?`Go`:`Space`),a=r(n?`Brake`:`Shift`),o=r(`←`),s=r(`→`),c=`${o} / ${s}`,l=(e,t)=>`<dt>${e}:</dt><dd>${t}</dd>`,u=e=>`<dl class="control-list">${e}</dl>`,d=l(`Steer`,c+(n?``:` or ${r(`A`)} / ${r(`D`)}`))+l(`Gas`,i)+l(`Brake`,a),f=l(`Turbo`,`Double-tap ${i}.`)+l(`Stop`,`Hold ${a}; braking builds with extra grip. Keep held through landing.`)+l(`Reverse`,`Stop, release ${a}, then hold it again.`)+(e===`scooter`?l(`Hop`,`Tap ${o} + ${s} together.`):``),p=(e===`lrv`?l(`Strafe`,c)+l(`Turn`,`${i} + ${c}`):``)+l(`Trick`,`Hold ${c} + ${a} to spin. Double-tap for a barrel roll.${e===`scooter`?` Triple-tap for Superman.`:``} Keep ${a} held to continue.`)+l(`Descend`,`Double-tap ${a} alone. Keep tapping for small corrections; hold the second tap for stronger thrust. Release to stop thrust.`);return{basic:d,more:`<h4>On ground</h4>${u(f)}<h4>In air</h4>${u(p)}<p class="fine">Drag to look; double-${n?`tap`:`click`} to reset. At the boundary, use ${n?`U-turn`:r(`R`)}.</p>`}}function Bm(e,t){let n=zm(ip(e),t);if(e!==`lrv`)return n;let r=t===`touch`,i=e=>r?`<span class="control-icon">${e}</span>`:`<kbd>${e}</kbd>`,a=i(r?`Brake`:`Shift`),o=i(r?`Go`:`Space`),s=`${i(`←`)} / ${i(`→`)}`,c=(e,t)=>`<dt>${e}:</dt><dd>${t}</dd>`,l=e=>`<dl class="control-list">${e}</dl>`;return{basic:n.basic,more:`<h4>On ground</h4>${l(c(`Turbo`,`Double-tap ${o}.`)+c(`Stop`,`Hold ${a}; braking builds with extra grip.`)+c(`Reverse`,`Stop, release ${a}, then hold again.`))}<h4>In air</h4>${l(c(`Steer`,`${s}; hold ${o} or ${a} to turn.`)+c(`Descend`,`Tap ${a} for a gentle nudge. Hold briefly for rapid descent; forward speed stays unchanged.`)+c(`Slowdown`,`Double-tap ${a} to cancel turbo and quickly slow to cruise speed, keeping any slower speed.`))}<p class="fine">Drag to look; double-${r?`tap`:`click`} to reset. At the boundary, use ${r?`U-turn`:i(`R`)}.</p>`}}async function Vm(){let r=await lu(),{stops:i,bounds:a,ground:o,inside:s,solids:c}=r,l=new DOMParser().parseFromString(n,`text/html`);for(let e of l.querySelectorAll(`script`))e.remove();document.getElementById(`boot`)?.remove(),document.body.append(...l.body.childNodes);let u=e=>document.getElementById(e);for(let e of[`mini-open`,`map-moon`,`moon-map`,`demo-toggle`,`demonstration`,`answers`,`question`,`answer-feedback`,`complete-sites`])u(e).hidden=!0;u(`question`).closest(`fieldset`).setAttribute(`hidden`,``),u(`source-map-links`).remove(),u(`camera-tools`).insertAdjacentHTML(`beforeend`,`<button id="camera-photo" aria-pressed="false" aria-controls="camera-reference">Photo</button><button id="camera-reset">Reset</button>`),u(`camera-tools`).insertAdjacentHTML(`beforebegin`,`<figure id="camera-reference" hidden><div id="camera-reference-frame" aria-label="Photograph: drag to pan, scroll or pinch to zoom" title="Drag to pan · Scroll or pinch to zoom"><img id="camera-reference-image" alt=""></div><figcaption><span id="camera-reference-caption"></span> <a id="camera-reference-source" target="_blank" rel="noopener noreferrer">Source ↗</a></figcaption></figure>`);let d=bm(u(`camera-reference-frame`),u(`camera-reference-image`));u(`lesson-copy`).insertAdjacentHTML(`afterend`,`<p id="lesson-observe"></p>`),u(`photo-credit`).insertAdjacentHTML(`beforebegin`,`<figcaption id="photo-caption"></figcaption>`),document.querySelector(`[data-vehicle-choice]`).insertAdjacentHTML(`afterbegin`,`<button data-vehicle="perseverance" aria-pressed="false"><img data-vehicle-image="perseverance" alt="" width="112" height="64"><span>Perseverance</span></button>`);let f=new URLSearchParams(location.search).get(`gravity`)===`moon`?1.62:su,p=up(r,f),m=p.buggy,h=new _m(u(`world`),r,await vm(),await om(r)),g=new xm,_=new Em,v={bounds:a,height:o,solids:c,rings:i},y=[],b=!1,x=!1,S=null,C=!1,w=`ride`,T=0,E=matchMedia(`(hover:none) and (pointer:coarse)`).matches?`touch`:`keyboard`,D={};try{D=JSON.parse(localStorage.getItem(`astra.prototype.jezero.apollo.v1`)??`{}`)??{}}catch{}y=Array.isArray(D.visited)?i.filter(e=>D.visited.includes(e.id)).map(e=>e.id):[],b=y.length===i.length&&D.hideCircles===!0;let O=e=>({...e,kind:`photo`,stopIds:[e.id],stopId:e.id,historical:!0}),k=rp(D.vehicle),A=Im(O(i[0]),v,{vehicle:np[k],angles:[Math.PI,Math.PI+.4,Math.PI-.4,0,-Math.PI/2,Math.PI/2]});if(!A.ok)throw Error(`No safe starting ground near the landing site.`);let j=D.pose&&Number.isFinite(D.pose.heading)&&s(D.pose.x,D.pose.z,3)&&Lm(D.pose,v,np[k])?D.pose:A.pose;p.switchVehicle(k,j),h.distance=p.profile.cameraDistance,_.suppressAt(i,m,p.profile);let ee=new Set,M=new Map,N=new Map,P=0,F=()=>{let e=new Set(M.values()),t=(t,...n)=>e.has(t)||n.some(e=>ee.has(e));return{left:t(`left`,`ArrowLeft`,`KeyA`),right:t(`right`,`ArrowRight`,`KeyD`),gas:t(`go`,`Space`),brake:t(`brake`,`ShiftLeft`,`ShiftRight`),reverse:ee.has(`KeyS`),trick:ee.has(`KeyF`)}},te=()=>!x||g.locked||!!document.querySelector(`dialog[open]`)||document.hidden||!!window.AstraLoading?.blocked,ne=()=>y.length===i.length,re=()=>i.find(e=>!y.includes(e.id));function paintMobileControls(){const held=new Set(M.values());for(const id of [`left`,`right`,`go`,`brake`])u(id).dataset.held=String(held.has(id))}function ie(){ee.clear(),M.clear(),N.clear(),paintMobileControls(),p.reset()}function ae(){try{localStorage.setItem(cu,JSON.stringify({visited:y,hideCircles:b,vehicle:p.vehicle,pose:m.grounded?{x:m.x,z:m.z,heading:m.heading}:void 0})),u(`save-status`).textContent=``}catch{u(`save-status`).textContent=`Progress could not be saved.`}}function oe(){let e=Bm(p.vehicle,E);u(`pause-drive-help`).innerHTML=e.basic,u(`advanced-controls`).innerHTML=e.more}function se(){u(`site-progress`).textContent=`${y.length}/${i.length} complete`,u(`hide-sites-option`).hidden=!ne(),u(`hide-sites`).checked=b;for(let e of document.querySelectorAll(`[data-vehicle]`))e.setAttribute(`aria-pressed`,String(e.dataset.vehicle===p.vehicle));h.setSites(Tm(i,y,b)),oe(),fe()}function ce(e){w=e;for(let t of document.querySelectorAll(`[data-pause-tab]`)){let n=t.dataset.pauseTab===e;t.setAttribute(`aria-selected`,String(n)),t.tabIndex=n?0:-1}u(`pause-ride`).hidden=e!==`ride`,u(`map-dialog`).hidden=e!==`map`,u(`pause-about`).hidden=e!==`about`,u(`local-travel-go`).hidden=e!==`map`,fe(),Te()}function le(e=`ride`){g.locked||(ie(),ae(),ce(e),u(`pause`).open||u(`pause`).showModal(),u(`resume`).textContent=x?`Resume`:`Play`)}function ue(){ie(),x=!0,u(`pause`).close()}function de(e){u(`toast`).textContent=e,setTimeout(()=>{u(`toast`).textContent===e&&(u(`toast`).textContent=``)},4500)}function fe(){let e=u(`local-destinations`);e.replaceChildren(),i.forEach((t,n)=>{let r=document.createElement(`button`),i=y.includes(t.id);r.textContent=i?t.name:`???`,r.disabled=!i,r.dataset.site=t.id,r.setAttribute(`aria-pressed`,String(n===T)),r.onclick=()=>{T=n,fe(),Te()},e.append(r)});let t=i[T],n=y.includes(t.id);u(`local-travel-name`).textContent=n?t.name:`Unvisited site`,u(`local-travel-distance`).textContent=n?`${Math.round(Math.hypot(t.x-m.x,t.z-m.z))} m`:``,u(`local-travel-note`).hidden=!0,u(`local-travel-go`).disabled=!n}function pe(){let e=i[T];if(!y.includes(e.id)||g.locked)return;let t=Im(O(e),v,{vehicle:p.profile});if(!t.ok){de(`No safe arrival here.`);return}ie(),p.place(t.pose),_.suppressAt(i,m,p.profile),h.reset(),ae(),ue()}for(let e of document.querySelectorAll(`[data-vehicle]`))e.onclick=()=>{let t=e.dataset.vehicle;if(t===p.vehicle)return;let n=Rm(m,v,np[t]);if(!n.ok){de(`Move to flatter, open ground to switch.`);return}ie(),p.switchVehicle(t,n.pose),h.distance=p.profile.cameraDistance,h.reset(),_.suppressAt(i,m,p.profile),se(),ae()};for(let e of document.querySelectorAll(`[data-pause-tab]`))e.onclick=()=>ce(e.dataset.pauseTab);let me=[...document.querySelectorAll(`[data-pause-tab]`)];document.querySelector(`.pause-tabs`).addEventListener(`keydown`,e=>{let t=e,n=me.indexOf(document.activeElement),r=t.key===`ArrowRight`?(n+1)%3:t.key===`ArrowLeft`?(n+2)%3:t.key===`Home`?0:t.key===`End`?2:-1;r>=0&&(t.preventDefault(),me[r].click(),me[r].focus())}),u(`resume`).onclick=ue,u(`pause-open`).onclick=()=>le(),u(`local-travel-go`).onclick=pe,u(`hide-sites`).onchange=()=>{b=ne()&&u(`hide-sites`).checked,se(),ae()},u(`exit`).onclick=()=>{ae(),parent===window?location.href=new URL(`../../../?go=mars-visual`,document.baseURI).href:parent.postMessage({type:`astra-exit-rover`},location.origin)},u(`pause`).addEventListener(`cancel`,e=>{e.preventDefault(),x&&ue()}),u(`map-open`).onclick=()=>{let e=u(`ride-map`);e.hidden=!e.hidden,u(`map-open`).setAttribute(`aria-expanded`,String(!e.hidden)),Te()},u(`ride-map`).onclick=()=>le(`map`);let I=u(`world`);for(let e of[`left`,`right`,`go`,`brake`]){let t=u(e);t.onpointerdown=n=>{te()||(n.preventDefault(),t.setPointerCapture(n.pointerId),M.set(n.pointerId,e),paintMobileControls(),p.capture(F(),n.timeStamp/1e3))},t.onpointerup=e=>{M.delete(e.pointerId)&&(paintMobileControls(),p.capture(F(),e.timeStamp/1e3))},t.onpointercancel=t.onlostpointercapture=e=>{M.delete(e.pointerId)&&ie()}}window.addEventListener(`pointerdown`,e=>{let t=e.pointerType===`touch`||e.pointerType===`pen`?`touch`:`keyboard`;E!==t&&(E=t,oe())},{capture:!0}),window.addEventListener(`keydown`,e=>{if(E!==`keyboard`&&(E=`keyboard`,oe()),g.phase===`camera`){if(!u(`camera-reference`).hidden){(e.code===`Equal`||e.code===`Minus`)&&(e.preventDefault(),d.zoom(e.code===`Equal`?1.25:.8));return}[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Equal`,`Minus`].includes(e.code)&&(e.preventDefault(),e.code===`ArrowLeft`&&(h.photoYaw-=.08),e.code===`ArrowRight`&&(h.photoYaw+=.08),e.code===`ArrowUp`&&(h.photoPitch=Math.min(.8,h.photoPitch+.06)),e.code===`ArrowDown`&&(h.photoPitch=Math.max(-.8,h.photoPitch-.06)),e.code===`Equal`&&(h.photoZoom=Math.max(.45,h.photoZoom/1.12)),e.code===`Minus`&&(h.photoZoom=Math.min(8,h.photoZoom*1.12)));return}if(e.code===`Escape`){if(g.locked){e.preventDefault();return}u(`pause`).open||(e.preventDefault(),le());return}if(!(te()||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))&&([`Space`,`ArrowLeft`,`ArrowRight`,`ShiftLeft`,`ShiftRight`].includes(e.code)&&e.preventDefault(),!e.repeat)){if(e.code===`KeyM`){u(`map-open`).click();return}if(e.code===`KeyR`){be();return}ee.add(e.code),p.capture(F(),e.timeStamp/1e3)}}),window.addEventListener(`keyup`,e=>{ee.delete(e.code),te()||p.capture(F(),e.timeStamp/1e3)});let he=()=>{let[e,t]=[...N.values()];return t?Math.hypot(e.x-t.x,e.y-t.y):0};I.onpointerdown=e=>{te()&&g.phase!==`camera`||(N.set(e.pointerId,{x:e.clientX,y:e.clientY}),P=he(),I.setPointerCapture(e.pointerId))},I.onpointermove=e=>{let t=N.get(e.pointerId);if(!t)return;let n=e.clientX-t.x,r=e.clientY-t.y;if(N.set(e.pointerId,{x:e.clientX,y:e.clientY}),N.size>1){let e=he();g.phase===`camera`&&P>0&&e>0&&(h.photoZoom=Math.max(.45,Math.min(8,h.photoZoom*P/e))),P=e}else g.phase===`camera`?(h.photoYaw-=n*.006,h.photoPitch=Math.max(-.8,Math.min(.8,h.photoPitch-r*.004))):h.orbit-=n*.008},I.onpointerup=I.onpointercancel=I.onlostpointercapture=e=>{N.delete(e.pointerId),P=he()},I.ondblclick=()=>{g.phase===`camera`?(h.photoYaw=h.photoPitch=0,h.photoZoom=1):h.reset()},I.onwheel=e=>{e.preventDefault(),g.phase===`camera`?h.photoZoom=Math.max(.45,Math.min(8,h.photoZoom*Math.exp(e.deltaY*.001))):h.distance=Math.max(3,Math.min(15,h.distance+e.deltaY*.01))};function ge(){if(!S)return;let e=S;u(`lesson-title`).textContent=e.name,u(`lesson-era`).textContent=`JEZERO`,u(`lesson-copy`).textContent=e.fact,u(`lesson-observe`).textContent=e.observe??``,u(`photo-caption`).textContent=e.caption,u(`lesson-detail`).textContent=e.caption+(e.id===`depot`?` Tube positions use recorded rover drop locations; small placement offsets and tread detail are interpreted.`:``),u(`lesson-more`).open=!1,u(`lesson-more`).hidden=!1,u(`lesson-more`).querySelector(`summary`).textContent=`Sources`,u(`lesson-photo`).src=e.photo,u(`lesson-photo`).alt=e.alt,u(`photo-link`).href=e.imageSource,u(`photo-credit`).textContent=e.credit,u(`lesson-source`).href=e.source,u(`lesson-source`).textContent=`Mission source ↗`,u(`continue`).textContent=`Resume`,u(`lesson`).showModal()}function _e(){let e=u(`lesson-photo`);if(!e.naturalWidth)return;let t=e.naturalWidth/e.naturalHeight;u(`lesson`).style.setProperty(`--photo-card-width`,Math.min(innerWidth-24,960,Math.max(260,Math.min(560,innerHeight*.58)*t+(innerWidth<=650?30:38)))+`px`)}u(`lesson-photo`).onload=_e,u(`look`).onclick=()=>{g.phase===`reading`&&(ie(),g.view(),u(`scene-label`).textContent=S?.focus?.name??S?.name??`Jezero`,u(`lesson`).close(),L(!1),u(`camera-tools`).hidden=!1,I.focus())},u(`camera-read`).onclick=()=>{g.phase===`camera`&&(g.read(),u(`scene-label`).textContent=S?.name??`Jezero`,L(!1),u(`camera-tools`).hidden=!0,ge())};function L(e){u(`camera-reference`).hidden=!e,u(`camera-photo`).textContent=e?`Scene`:`Photo`,u(`camera-photo`).setAttribute(`aria-pressed`,String(e)),u(`camera-reset`).hidden=!1,e&&S&&(u(`camera-reference-image`).getAttribute(`src`)!==S.photo&&d.reset(),u(`camera-reference-image`).src=S.photo,u(`camera-reference-image`).alt=S.alt,u(`camera-reference-caption`).textContent=S.caption+` `+S.credit,u(`camera-reference-source`).href=S.imageSource,d.fit())}u(`camera-photo`).onclick=()=>{g.phase===`camera`&&L(u(`camera-reference`).hidden===!0)},u(`camera-reset`).onclick=()=>{u(`camera-reference`).hidden?(h.photoYaw=h.photoPitch=0,h.photoZoom=1):d.reset()},u(`continue`).onclick=()=>{if(!S||g.phase!==`reading`)return;let e=ne();y.includes(S.id)||y.push(S.id),C=!e&&ne(),_.suppressAt(i,m,p.profile),ae(),u(`lesson`).close(),g.resume(),h.endScene(),se()},u(`lesson`).addEventListener(`cancel`,e=>e.preventDefault()),u(`complete`).querySelector(`[data-close]`).addEventListener(`click`,()=>u(`complete`).close());let ve=new URL(``+new URL(`perseverance-preview-hKlifRvp.webp`,import.meta.url).href,``+import.meta.url).href;for(let e of document.querySelectorAll(`[data-mission-patch],#mission-patch`))e.src=ve,e.alt=`Perseverance`;for(let n of document.querySelectorAll(`[data-vehicle-image]`))n.src=n.dataset.vehicleImage===`perseverance`?ve:new URL(Object.assign({"../vehicle-previews/lrv.png":e,"../vehicle-previews/scooter.png":t})[`../vehicle-previews/${n.dataset.vehicleImage}.png`],import.meta.url).href;u(`region-title`).textContent=u(`pause-title`).textContent=`Jezero 2`,u(`region-location`).textContent=`Landing plain`;for(let e of document.querySelectorAll(`[data-mission-place]`))e.textContent=`Perseverance · Jezero Crater`;u(`welcome-era`).textContent=`MARS`,u(`region-crew`).textContent=``,u(`mission-overview`).textContent=`Perseverance explores Jezero’s crater floor and ancient river delta to investigate past environments and search for preserved signs of ancient life. Explore twelve sites, from the landing plain to the western frontier, as you drive Perseverance, the scooter or the lunar rover.`,u(`region-scale`).textContent=`${f===3.71?`Mars`:`Moon comparison`} gravity · ${f} m/s². USGS HiRISE / CTX topography at real scale; interpreted stones and surface color. Apollo vehicles, boosts and tricks are playful additions. Perseverance uses the same rover controls for comparison.`,u(`map-legend`).textContent=`Pale traces: historical rover tracks · Gold: next site · Blue: visited · Triangle: you.`;for(let e of[`mission-overview-source`,`region-source`])u(e).href=`https://science.nasa.gov/mission/mars-2020-perseverance/`,u(e).textContent=`NASA · Perseverance`;u(`region-source`).insertAdjacentHTML(`afterend`,`<p><a href="https://astrogeology.usgs.gov/search/map/mars-2020-jezero-crater-landing-site-products" target="_blank" rel="noopener noreferrer">USGS · terrain &amp; orbital imagery ↗</a></p><p><a href="https://www.usgs.gov/data/mars-sample-return-hirise-mosaics-terrain-relative-navigation" target="_blank" rel="noopener noreferrer">USGS · crater-rim terrain ↗</a></p>`),u(`complete`).querySelector(`small`).textContent=`JEZERO 2 / COMPLETE`,u(`complete-title`).textContent=`All ${i.length} sites complete`,u(`error`).querySelector(`h2`).textContent=`Jezero could not load.`;let R=0,z={x:m.x,z:m.z,heading:m.heading},ye=!1;function be(){te()||R<=0||ye||(ye=!0,m.heading+=Math.PI,m.vx=-m.vx,m.vz=-m.vz,ie(),h.reset())}u(`turn-back`).onclick=be;let xe=document.createElement(`canvas`);xe.width=640,xe.height=Math.round(640*(a.north-a.south)/(a.east-a.west));let Se=xe.getContext(`2d`),Ce=Se.createImageData(xe.width,xe.height);Ce.data.set(ou(xe.width,xe.height,a,o)),Se.putImageData(Ce,0,0);function we(e,t=!1){let n=e.getContext(`2d`);n.fillStyle=`#342b24`,n.fillRect(0,0,e.width,e.height);let o=t=>[(t.x-a.west)/(a.east-a.west)*e.width,(t.z+a.north)/(a.north-a.south)*e.height];n.drawImage(xe,0,0,e.width,e.height),n.strokeStyle=`#bcb39d`,n.lineWidth=t?1:2;for(let e of r.paths)n.beginPath(),e.forEach((e,t)=>{let[r,i]=o(e);t?n.lineTo(r,i):n.moveTo(r,i)}),n.stroke();i.forEach((e,r)=>{let[i,a]=o(e);n.fillStyle=y.includes(e.id)?`#427cb5`:e===re()?`#edc17e`:`#9b9c97`,n.beginPath(),n.arc(i,a,t?3:6,0,Math.PI*2),n.fill(),!t&&r===T&&(n.strokeStyle=`#edc17e`,n.beginPath(),n.arc(i,a,10,0,Math.PI*2),n.stroke())});let[s,c]=o(m);n.save(),n.translate(s,c),n.rotate(-m.heading),n.fillStyle=`#fff`,n.beginPath(),n.moveTo(0,t?6:9),n.lineTo(-5,-5),n.lineTo(5,-5),n.closePath(),n.fill(),n.restore()}function Te(){u(`ride-map`).hidden||we(u(`mini`),!0),w===`map`&&u(`pause`).open&&we(u(`map`))}let Ee=a.east-a.west,De=a.north-a.south,Oe=Math.max(Ee,De);for(let[e,t]of[[`map`,800],[`mini`,260]]){let n=u(e);n.width=Math.round(t*Ee/Oe),n.height=Math.round(t*De/Oe)}u(`ride-map`).style.setProperty(`--mini-width-ratio`,String(Ee/Oe));let ke=u(`map`);new ResizeObserver(([e])=>{let{width:t,height:n}=e.contentRect;t&&n&&(ke.style.width=Math.min(t,n*ke.width/ke.height)+`px`,ke.style.height=`auto`)}).observe(document.querySelector(`.local-map-surface`)),ke.onclick=e=>{let t=ke.getBoundingClientRect(),n=a.west+(e.clientX-t.left)/t.width*Ee,r=-a.north+(e.clientY-t.top)/t.height*De,o=i.map((e,i)=>({i,d:Math.hypot((e.x-n)/Ee*t.width,(e.z-r)/De*t.height)})).filter(e=>e.d<24&&y.includes(i[e.i].id)).sort((e,t)=>e.d-t.d)[0]?.i??-1;o>=0&&(T=o,fe(),Te())},window.addEventListener(`resize`,()=>{ie(),h.resize(),_e()}),window.addEventListener(`blur`,()=>{ie(),x&&!g.locked&&le()}),document.addEventListener(`visibilitychange`,()=>{document.hidden&&(ie(),ae(),x&&!g.locked&&le())}),window.addEventListener(`pagehide`,ae);let Ae=0,je=0,Me=0,Ne=0,Pe={...m};function Fe(e){let t=Math.min(.05,Ae?(e-Ae)/1e3:1/60);if(Ae=e,te())je=0;else{for(je+=t;je>=1/120;)Pe={...m},p.step(F(),1/120,e/1e3,re()),je-=1/120;s(m.x,m.z,3)?(R=0,ye=!1,m.grounded&&s(m.x,m.z,8)&&(z={x:m.x,z:m.z,heading:m.heading})):(R+=t,R>=5&&(ie(),p.place(z),h.reset(),R=0,de(`Back inside the prototype area.`))),_.update(i,m,p.profile);let n=Tm(i,y,b).map(e=>i[e.index]).find(e=>_.allows(e.id)&&wm(m,e,p.profile));n&&g.arrive(!0,t)&&(S=n,ie(),p.place(m),h.beginScene(n),document.body.classList.add(`cinematic`),u(`scene-label`).textContent=n.name),e-Me>3e3&&(ae(),Me=e)}if(g.locked&&!document.hidden){let e=g.advance(t);e===`read`&&ge(),e===`ride`&&(document.body.classList.remove(`cinematic`),h.reset(),C&&(C=!1,u(`complete`).showModal()))}let n=re(),a=n&&!te()?Dl(h.camera,n,o,innerWidth,innerHeight):null,c=u(`target-indicator`);c.hidden=!a,a&&(c.style.left=a.x+`px`,c.style.top=a.y+`px`,c.style.transform=`translate(-50%,-50%) rotate(${a.angle}rad)`);let l=i.reduce((e,t)=>Math.hypot(m.x-e.x,m.z-e.z)<Math.hypot(m.x-t.x,m.z-t.z)?e:t);u(`region-location`).textContent=Math.hypot(m.x-l.x,m.z-l.z)<150?l.location??l.name:au(m.x+r.originEast,r.originNorth-m.z),u(`boundary-warning`).hidden=!R||g.locked,u(`boundary-time`).textContent=`Turn back · ${Math.max(0,5-R).toFixed(1)} s`,u(`turn-back`).hidden=ye,u(`speed`).textContent=Math.round(Math.hypot(m.vx,m.vz)*2.236936)+` mph`;let d=p.vehicle===`scooter`?{phase:p.scooterDrive.turboRemaining>0?`active`:`ready`,seconds:p.scooterDrive.turboRemaining||4,fraction:p.scooterDrive.turboRemaining/p.scooterBoostSeconds||1}:p.rover.lrvTurboStatus(p.lrv);u(`turbo-status`).dataset.phase=d.phase,u(`turbo-time`).textContent=d.seconds.toFixed(1)+`s`,u(`turbo-fill`).style.width=d.fraction*100+`%`,u(`turbo-meter`).setAttribute(`aria-valuenow`,String(Math.round(d.fraction*100)));let f=F();for(let[e,t]of[[`left`,f.left],[`right`,f.right],[`go`,f.gas],[`brake`,f.brake]])u(e).dataset.held=String(t);u(`brake`).textContent=p.vehicle===`lrv`||m.grounded?`Brake`:f.left||f.right?`Trick`:`Down`,u(`go`).textContent=d.phase===`active`?`Turbo`:`Go`;let v={...m};if(!te()&&Math.hypot(m.x-Pe.x,m.z-Pe.z)<2){let e=je*120;for(let t of[`x`,`y`,`z`,`spin`])v[t]=Pe[t]+(m[t]-Pe[t])*e;v.heading=Pe.heading+Math.atan2(Math.sin(m.heading-Pe.heading),Math.cos(m.heading-Pe.heading))*e}u(`camera-reference`).hidden&&h.update(p,t,!te()&&f.gas,!te()&&f.brake,v,!te()),e-Ne>100&&(Te(),Ne=e),window.AstraLoading?.ready(),requestAnimationFrame(Fe)}se(),le(),requestAnimationFrame(Fe)}Vm().catch(e=>{window.AstraLoading?.fail(`Jezero 2 could not load. Reload to try again.`),document.getElementById(`boot`)?.remove();let t=document.createElement(`main`);t.style.padding=`24px`,t.textContent=`Jezero could not load: `+(e instanceof Error?e.message:String(e)),document.body.append(t),console.error(e)});
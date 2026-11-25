import{createGolfSurfaceSampler}from"./moon-perf-20261125-23337e6a136c.js";import{moonPerfIsOuting as __moonIsOuting,_ as __moonOutingHeight,moonPerfPlaygroundHeight as __moonPlaygroundHeight}from"./moon-perf-20261125-0d14d773c752.js";
import{B as e,Ft as t,K as n,Lt as r,P as i,Rt as a,Tt as o,an as s,b as c,c as l,d as u,dt as d,f,l as p,m,pt as h,qt as g,u as _,ut as v,w as y,yt as b}from"./three.module-CWFLg5dr.js";import{A as x,V as S,_ as C,g as w,h as T,i as E,m as D,o as O,p as k,r as A,t as j}from"./moon-perf-20261125-23337e6a136c.js";import{d as M,o as N,u as P,v as F}from"./moon-perf-20261125-0d14d773c752.js";import{t as I}from"./golfFlag-BRX8T_bY.js";function L(source, size) {const tileTerrainSteps=moonPerfTileTerrainSteps;
    const steps = tileTerrainSteps(source, size);
    let next = steps.next();
    while (!next.done)
        next = steps.next();
    return next.value;
}function R(e,t){let n=e.getAttribute(`position`),r=e.index,i=new Map;for(let e=0;e<r.count;e+=3)for(let t=0;t<3;t++){let n=r.getX(e+t),a=r.getX(e+(t+1)%3),o=n<a?`${n},${a}`:`${a},${n}`;i.set(o,(i.get(o)||0)+1)}let a=new Set;for(let[e,t]of i)t===1&&e.split(`,`).forEach(e=>a.add(Number(e)));let o=e.getAttribute(`color`);if(o)for(let e=0;e<r.count;e+=3){let t=r.getX(e),n=r.getX(e+1),i=r.getX(e+2);Math.max(o.getX(t),o.getX(n),o.getX(i))-Math.min(o.getX(t),o.getX(n),o.getX(i))>.06&&(a.add(t),a.add(n),a.add(i))}let s=new Map,c=new Uint32Array(n.count);for(let e=0;e<n.count;e++){if(a.has(e)){c[e]=e;continue}let r=`${Math.floor(n.getX(e)/t)},${Math.floor(n.getZ(e)/t)}`;s.has(r)||s.set(r,e),c[e]=s.get(r)}let l=[],u=new Set;for(let e=0;e<r.count;e+=3){let t=c[r.getX(e)],n=c[r.getX(e+1)],i=c[r.getX(e+2)];if(t===n||n===i||i===t)continue;let a=[t,n,i].sort((e,t)=>e-t).join(`,`);u.has(a)||(u.add(a),l.push(t,n,i))}let d=new _;for(let[t,n]of Object.entries(e.attributes))d.setAttribute(t,n);return d.setIndex(l),d.computeBoundingSphere(),d}function z(e,t){let n=O(e);return{west:Math.floor(Math.min(e.tee.x-60,n.x-t-20)/10)*10,east:Math.ceil(Math.max(e.tee.x+60,n.x+t+20)/10)*10,south:Math.floor(Math.min(e.tee.z-40,n.z-t-20)/10)*10,north:Math.ceil(Math.max(e.tee.z+40,n.z+t+20)/10)*10}}function B(e,t,n,r,i){let a=e.east-e.west,s=e.north-e.south,c=new o(a,s,Math.round(a/t),Math.round(s/t));c.rotateX(-Math.PI/2),c.translate((e.west+e.east)/2,0,(e.south+e.north)/2);let l=c.getAttribute(`position`),u=c.getAttribute(`uv`),d=new Float32Array(l.count*3);for(let e=0;e<l.count;e++){let t=l.getX(e),i=l.getZ(e),a=r(t,i);l.setY(e,n(t,i)),d[e*3]=d[e*3+1]=d[e*3+2]=a}if(c.setAttribute(`color`,new p(d,3)),i){let e=i.bounds,t=t=>l.getX(t)>=e.west&&l.getX(t)<=e.east&&l.getZ(t)>=e.south&&l.getZ(t)<=e.north,a=(t,n)=>{let r=l.getX(t),i=l.getZ(t),a=l.getX(n),o=l.getZ(n);return r===a&&(r===e.west||r===e.east)&&Math.min(i,o)>=e.south&&Math.max(i,o)<=e.north||i===o&&(i===e.south||i===e.north)&&Math.min(r,a)>=e.west&&Math.max(r,a)<=e.east},o=c.index,s=[],d=[],f=[],m=[];for(let e=0;e<o.count;e+=3){let c=o.getX(e),p=o.getX(e+1),h=o.getX(e+2);if(t(c)&&t(p)&&t(h))continue;let g=a(c,p)?[c,p,h]:a(p,h)?[p,h,c]:a(h,c)?[h,c,p]:null;if(!g){s.push(c,p,h);continue}let[_,v,y]=g,b=Math.round(Math.hypot(l.getX(v)-l.getX(_),l.getZ(v)-l.getZ(_))/i.spacing),x=_;for(let e=1;e<b;e++){let t=e/b,i=Math.fround(l.getX(_)+(l.getX(v)-l.getX(_))*t),a=Math.fround(l.getZ(_)+(l.getZ(v)-l.getZ(_))*t),o=r(i,a),c=l.count+d.length/3;d.push(i,n(i,a),a),m.push(o,o,o),f.push(u.getX(_)+(u.getX(v)-u.getX(_))*t,u.getY(_)+(u.getY(v)-u.getY(_))*t),s.push(x,c,y),x=c}s.push(x,v,y)}for(let[e,t]of[[`position`,d],[`uv`,f],[`color`,m]]){let n=c.getAttribute(e),r=new Float32Array(n.array.length+t.length);r.set(n.array),r.set(t,n.array.length),c.setAttribute(e,new p(r,n.itemSize))}c.setIndex(s)}return c.deleteAttribute(`normal`),c.computeVertexNormals(),c}var V=new h({color:9213334,metalness:.65,roughness:.48}),ee=new h({color:2698801,roughness:.95}),H=e=>e.greenCenter?Math.ceil((e.greenRadius+1)/10)*10:10;function U(e,t,n,r=0,i=0,a=0){let o=new v(e,t);return o.position.set(r,i,a),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function W(e,t,n,r=.035,i=V){let a=n.clone().sub(t),o=U(new c(r,r,a.length(),7),i,e);return o.position.copy(t).add(n).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new s(0,1,0),a.normalize()),o}function G(){let e=document.createElement(`canvas`);e.width=e.height=256;let n=e.getContext(`2d`),r=n.createImageData(256,256),i=631;for(let e=0;e<r.data.length;e+=4){i=Math.imul(i,1664525)+1013904223|0;let t=174+(i>>>24)*.24;r.data[e]=t,r.data[e+1]=t,r.data[e+2]=t,r.data[e+3]=255}n.putImageData(r,0,0);let o=new u(e);return o.wrapS=o.wrapT=t,o.repeat.set(450,450),o.colorSpace=a,o.anisotropy=4,o}function K(t,n){let r=N.filter(e=>e.kind===`rock`),i=new e(new y(1,0),new h({color:7500139,roughness:1}),r.length),a=new b;r.forEach((e,t)=>{a.position.set(e.x,n(e.x,e.z)+e.hy*.62,e.z),a.scale.set(e.hx,e.hy,e.hz),a.updateMatrix(),i.setMatrixAt(t,a.matrix)}),i.castShadow=!0,i.receiveShadow=!0,t.add(i)}function q(e,t=!0,n=1){if(t){let t=U(new m(.18,32),ee,e,0,.003,0);t.rotation.x=-Math.PI/2}let r=new i;r.name=`golf-flagstick`,e.add(r),e=r,W(e,new s(0,0,0),new s(0,1.9,0),.014,V);let a=I(`moon`,n);a.position.set(.56,1.58,0),e.add(a),W(e,new s(0,1.9,0),new s(1.12,1.9,0),.009)}function J(e){let t=document.createElement(`canvas`);t.width=512,t.height=256;let n=t.getContext(`2d`);n.fillStyle=`#284b76`,n.fillRect(0,0,512,256);for(let e=0;e<60;e++)n.fillStyle=e%3?`#7b9388`:`#bbc5bf`,n.beginPath(),n.ellipse((Math.sin(e*4.1)*.5+.5)*512,(Math.cos(e*1.7)*.5+.5)*256,10+e%23,5+e%15,e,0,Math.PI*2),n.fill();let r=new u(t);r.colorSpace=a;let i=U(new g(51,40,24),new h({map:r,emissive:16777215,emissiveMap:r,emissiveIntensity:.45,roughness:1}),e,-1200,2700,-30);return i.name=`lunar-earth`,i.castShadow=!1,i.receiveShadow=!1,i}function Y(scene, height = P) {const lunarSurfaceSteps=moonPerfLunarSurfaceSteps;
    for (const _ of lunarSurfaceSteps(scene, height)) {
        void _;
    }
}function te(e,t){let n=A[1],a=O(n),o=H(n),s=z(n,o),c={west:a.x-o,east:a.x+o,south:a.z-o,north:a.z+o},l=(e,t)=>{let n=k(e,t);return n<0?-.28:n>.2?.15:n>0?D&&A[0].sectionsOnly?.24:-.17:0},u=G();u.repeat.set(450*6e3/3400,450*6e3/3400),u.offset.set(225-450*3e3/3400,225-450*3e3/3400);let d=new h({map:u,color:10922154,roughness:1,vertexColors:!0}),f=U(B({west:-3e3,east:3e3,south:-3e3,north:3e3},10,t,(e,t)=>.88+.065*Math.sin(e*.017)*Math.sin(t*.025)+l(e,t),{bounds:s,spacing:1}),d,e);f.castShadow=!1,f.name=`golf-horizon-terrain`,L(f,800);let p=s.east-s.west,m=s.north-s.south,g=u.clone();g.repeat.set(450*p/3400,450*m/3400),g.offset.set(450*(1700+s.west)/3400,450*(1700-s.north)/3400);let _=d.clone();_.map=g;let y=U(B(s,1,t,(e,t)=>.88+l(e,t),{bounds:c,spacing:.2}),_,e);y.castShadow=!1,y.name=`golf-par3-terrain`,L(y,40);let b=u.clone();b.repeat.set(450*200/3400,450*200/3400),b.offset.set(225-450*200/3400/2,225-450*200/3400/2);let S=d.clone();S.map=b;let C=U(B(c,.2,t,(e,t)=>.88+l(e,t)),S,e);C.name=`golf-crater-surface`,C.userData.hole=n.id,C.castShadow=!1,K(e,t),q(e,!1);let w=new i;w.name=`crater-golf-flag`,w.userData.hole=n.id,w.position.set(n.cup.x,t(n.cup.x,n.cup.z),n.cup.z),e.add(w),q(w,!0,Math.max(1,x.findIndex(e=>e.moonId===n.id)+1));let T=new v(new r(j-.04,j+.08,64),new h({color:11184810,roughness:1,side:2}));__moonThree.rotation.x=-Math.PI/2,__moonThree.position.set(n.cup.x,.015,n.cup.z),__moonThree.name=`golf-crater-rim`,__moonThree.userData.hole=n.id,e.add(T)}function ne(e,t){let n=E(),a=A[1],o=O(a),s=n.bounds,c=Math.ceil(Math.max(24,n.greenRadius*1.28)/2)*2,l={west:o.x-c,east:o.x+c,south:o.z-c,north:o.z+c},u={west:a.cup.x-2,east:a.cup.x+2,south:a.cup.z-2,north:a.cup.z+2},d=G(),f=(e,t)=>S(e,t,n),p=(n,r,i,a)=>{let o=d.clone(),s=n.east-n.west,c=n.north-n.south;o.repeat.set(450*s/3400,450*c/3400),o.offset.set(450*(1700+n.west)/3400,450*(1700-n.north)/3400);let l=new h({map:o,color:10922154,roughness:1,vertexColors:!0}),u=U(B(n,r,t,f,a),l,e);return u.name=i,u.castShadow=!1,u};L(p({west:-3e3,east:3e3,south:-3e3,north:3e3},20,`golf-horizon-terrain`,{bounds:s,spacing:2}),800),p(s,2,`golf-trial-field`,{bounds:l,spacing:.5});let m=p(l,.5,`golf-crater-surface`,{bounds:u,spacing:.1});m.userData.hole=a.id;let g=p(u,.1,`golf-crater-surface`);g.userData.hole=a.id,K(e,t);let _=new i;_.name=`crater-golf-flag`,_.userData.hole=a.id,_.position.set(a.cup.x,t(a.cup.x,a.cup.z),a.cup.z),e.add(_),q(_,!0,n.number);let y=new v(new r(j-.04,j+.08,64),new h({color:11184810,roughness:1,side:2}));y.rotation.x=-Math.PI/2,y.position.set(a.cup.x,0,a.cup.z),y.name=`golf-crater-rim`,y.userData.hole=a.id;let b=y.geometry.getAttribute(`position`);for(let e=0;e<b.count;e++)b.setZ(e,t(a.cup.x+b.getX(e),a.cup.z-b.getY(e))+.015);y.geometry.computeVertexNormals(),e.add(y),d.dispose()}function X(){let e=new i,t=new h({color:12236970,metalness:.5,roughness:.5}),n=new h({color:2568507,metalness:.7,roughness:.4}),r=new h({color:13210962,metalness:.6,roughness:.4}),a=(t,n,r,i,a,o,s)=>{let c=new v(new l(t,n,r),s);return c.position.set(i,a,o),c.castShadow=!0,e.add(c),c},o=new v(new f(2.5,13,6,16),t);o.rotation.z=Math.PI/2,o.scale.z=1.35,o.position.y=1,o.castShadow=!0,e.add(o);let s=new v(new g(2.6,20,12),n);s.scale.set(1.5,.65,1.12),s.position.set(5,2.2,0),s.castShadow=!0,e.add(s),a(12,.6,5,0,3.1,0,n),a(24,.6,3,0,.6,0,r),a(8,.6,6.7,-2,-1.3,0,n);for(let t of[-10,10]){let r=new v(new c(1.7,2.1,4,16),n);r.rotation.x=Math.PI/2,r.position.set(t,0,0),r.castShadow=!0,e.add(r),a(2,.3,3,t,-1.65,0,new d({color:10412020}))}for(let e of[-3,3])a(.4,4,.5,e,-2.5,2,r).name=`clamp`,a(1.3,.4,.5,e*.85,-4.3,2,r);for(let e of[-7,-4,-1,2])a(.2,2,7.04,e,1,0,n);return e.scale.setScalar(.65),e}export{Y as i,G as n,J as r,X as t};
function* moonPerfTileTerrainSteps(source, size) {const coarseTerrain=R;
    const geometry = source.geometry, index = geometry.index, position = geometry.getAttribute('position');
    const buckets = new Map();
    for (let i = 0; i < index.count; i += 3) {
        if (i % 3072 === 0)
            yield;
        const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
        const key = `${Math.floor((position.getX(a) + position.getX(b) + position.getX(c)) / (3 * size))},${Math.floor((position.getZ(a) + position.getZ(b) + position.getZ(c)) / (3 * size))}`;
        let bucket = buckets.get(key);
        if (!bucket)
            buckets.set(key, bucket = []);
        bucket.push(a, b, c);
    }
    const group = new __moonThree.Group();
    group.name = source.name;
    group.position.copy(source.position);
    group.quaternion.copy(source.quaternion);
    group.scale.copy(source.scale);
    for (const indices of buckets.values()) {
        const remap = new Map(), vertices = [], local = indices.map(i => { let v = remap.get(i); if (v === undefined) {
            v = vertices.length;
            remap.set(i, v);
            vertices.push(i);
        } return v; });
        const part = new __moonThree.BufferGeometry();
        for (const [name, attribute] of Object.entries(geometry.attributes)) {
            const data = new Float32Array(vertices.length * attribute.itemSize);
            vertices.forEach((v, i) => { for (let k = 0; k < attribute.itemSize; k++)
                data[i * attribute.itemSize + k] = attribute.getComponent(v, k); });
            part.setAttribute(name, new __moonThree.BufferAttribute(data, attribute.itemSize, attribute.normalized));
        }
        part.setIndex(local);
        part.computeBoundingSphere();
        const tile = new __moonThree.Mesh(part, source.material);
        tile.castShadow = source.castShadow;
        tile.receiveShadow = source.receiveShadow;
        const lod = new __moonThree.LOD(), center = part.boundingSphere.center.clone();
        part.translate(-center.x, -center.y, -center.z);
        lod.position.copy(center);
        lod.addLevel(tile, 0);
        const coarse = new __moonThree.Mesh(coarseTerrain(part, size / 10), source.material);
        coarse.castShadow = source.castShadow;
        coarse.receiveShadow = source.receiveShadow;
        lod.addLevel(coarse, size * 2, .15);
        group.add(lod);
        yield;
    }
    source.parent.add(group);
    source.removeFromParent();
    geometry.dispose();
    return group;
}
function* moonPerfLunarSurfaceSteps(scene, height = P) {const isLunarPlayground=M,isMoonGolfTrialCourse=w,craterTrialSurface=ne,isPitchPuttCourse=C,pitchPuttSurface=te,isLunarOuting=__moonIsOuting,defaultHeight=P,playgroundHeight=__moonPlaygroundHeight,outingHeight=__moonOutingHeight,golfSurfaceShade=k,golfTunedCourse=D,MOON_GOLF_HOLES=A,golfVisibleHoles=T,golfGreenCenter=O,cupPatchHalfSize=H,lunarDust=G,mesh=U,outingRelief=F,tileTerrainSteps=moonPerfTileTerrainSteps,lunarRocks=K,lunarFlag=q,PITCH_PUTT_HOLES=x,dark=ee,CRATER_RADIUS=j;
    if (isLunarPlayground() && isMoonGolfTrialCourse()) {
        craterTrialSurface(scene, height);
        return;
    }
    if (isLunarPlayground() && isPitchPuttCourse()) {
        pitchPuttSurface(scene, height);
        return;
    }
    const sampler = isLunarPlayground() && isLunarOuting() && height === defaultHeight ? createGolfSurfaceSampler() : null;
    if (sampler)
        height = (x, z) => sampler.height(x, z, playgroundHeight(x, z, outingHeight(x, z)));
    const detailed = isLunarPlayground(), tone = (x, z) => { const v = detailed ? (sampler ? sampler.shade(x, z) : golfSurfaceShade(x, z)) : 0; return v < 0 ? -.28 : v > .2 ? .15 : v > 0 ? (golfTunedCourse && MOON_GOLF_HOLES[0].sectionsOnly ? .24 : -.17) : 0; }, west = detailed ? -700 : -300, south = detailed ? -170 : 100, north = detailed ? 400 : 360, width = 160 - west, depth = north - south;
    const active = MOON_GOLF_HOLES[1], bounds = isPitchPuttCourse() ? { west: Math.floor((Math.min(active.tee.x, active.cup.x) - 60) / 10) * 10, east: Math.ceil((Math.max(active.tee.x, active.cup.x) + 60) / 10) * 10, south: Math.floor((Math.min(active.tee.z, active.cup.z) - 40) / 10) * 10, north: Math.ceil((Math.max(active.tee.z, active.cup.z) + 40) / 10) * 10 } : { west: 360, east: 480, south: 380, north: 560 };
    const golfPatch = (x, z) => x >= -850 && x <= (golfTunedCourse ? 600 : 100) && z >= 100 && z <= 2400, par3Patch = (x, z) => x >= bounds.west && x <= bounds.east && z >= bounds.south && z <= bounds.north, cupPatch = (x, z) => golfVisibleHoles().some(h => Math.abs(x - golfGreenCenter(h).x) <= cupPatchHalfSize(h) && Math.abs(z - golfGreenCenter(h).z) <= cupPatchHalfSize(h));
    const tex = lunarDust();
    if (detailed) {
        tex.repeat.set(450 * 6000 / 3400, 450 * 6000 / 3400);
        tex.offset.set(225 - 450 * 3000 / 3400, 225 - 450 * 3000 / 3400);
    }
    const terrainMat = new __moonThree.MeshStandardMaterial({ map: tex, color: 0xa6a8aa, roughness: 1, vertexColors: true });
    const geo = new __moonThree.PlaneGeometry(detailed ? 6000 : 3400, detailed ? 6000 : 3400, detailed ? 600 : 340, detailed ? 600 : 340);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
        if (i % 3072 === 0)
            yield;
        const x = pos.getX(i), z = pos.getZ(i);
        pos.setY(i, height(x, z));
        const c = .88 + .065 * Math.sin(x * .017) * Math.sin(z * .025) + tone(x, z);
        colors.set([c, c, c], i * 3);
    }
    geo.setAttribute('color', new __moonThree.BufferAttribute(colors, 3));
    const oldIndex = geo.index.array, kept = [];
    for (let i = 0; i < oldIndex.length; i += 3) {
        if (i % 3072 === 0)
            yield;
        const ids = [oldIndex[i], oldIndex[i + 1], oldIndex[i + 2]];
        if (detailed && ids.every(j => cupPatch(pos.getX(j), pos.getZ(j)) || par3Patch(pos.getX(j), pos.getZ(j)) || golfPatch(pos.getX(j), pos.getZ(j))) || ids.every(j => Math.abs(pos.getX(j)) <= 100 && Math.abs(pos.getZ(j)) <= 100) || ids.every(j => pos.getX(j) >= west && pos.getX(j) <= 160 && pos.getZ(j) >= south && pos.getZ(j) <= north))
            continue;
        kept.push(...ids);
    }
    geo.setIndex(kept);
    geo.computeVertexNormals();
    const terrain = mesh(geo, terrainMat, scene);
    terrain.castShadow = false;
    // A finer central patch keeps rolling, surface normals and the visible lie aligned.
    const closeGeo = new __moonThree.PlaneGeometry(200, 200, 200, 200);
    closeGeo.rotateX(-Math.PI / 2);
    const cp = closeGeo.attributes.position, cc = new Float32Array(cp.count * 3);
    for (let i = 0; i < cp.count; i++) {
        if (i % 3072 === 0)
            yield;
        const x = cp.getX(i), z = cp.getZ(i);
        cp.setY(i, height(x, z));
        const r = Math.hypot(x, z), v = .88 + .065 * Math.sin(x * .017) * Math.sin(z * .025) + (r < 17 ? .006 : 0) + tone(x, z);
        cc.set([v, v, v], i * 3);
    }
    if (detailed) {
        const old = closeGeo.index.array, keep = [];
        for (let i = 0; i < old.length; i += 3) {
            if (i % 3072 === 0)
                yield;
            const tri = [old[i], old[i + 1], old[i + 2]];
            if (tri.every(j => cupPatch(cp.getX(j), cp.getZ(j))))
                continue;
            keep.push(...tri);
        }
        closeGeo.setIndex(keep);
    }
    closeGeo.setAttribute('color', new __moonThree.BufferAttribute(cc, 3));
    closeGeo.computeVertexNormals();
    const patchTex = tex.clone();
    patchTex.repeat.set(450 * 200 / 3400, 450 * 200 / 3400);
    patchTex.offset.set(225 - 450 * 200 / 3400 / 2, 225 - 450 * 200 / 3400 / 2);
    const patchMat = terrainMat.clone();
    patchMat.map = patchTex;
    const patch = mesh(closeGeo, patchMat, scene);
    patch.castShadow = false;
    // Two-metre surface triangles make low crater lips readable and match scooter contact.
    const outingGeo = new __moonThree.PlaneGeometry(width, depth, width / 2, depth / 2);
    outingGeo.rotateX(-Math.PI / 2);
    outingGeo.translate((west + 160) / 2, 0, (south + north) / 2);
    const op = outingGeo.attributes.position, oc = new Float32Array(op.count * 3);
    for (let i = 0; i < op.count; i++) {
        if (i % 3072 === 0)
            yield;
        const x = op.getX(i), z = op.getZ(i);
        op.setY(i, height(x, z));
        const span = Math.hypot(325, 200), along = ((x + 220) * 325 + (z - 100) * 200) / span, side = ((x + 220) * 200 - (z - 100) * 325) / span;
        const v = .88 + .065 * Math.sin(x * .017) * Math.sin(z * .025) + .065 * Math.max(-1, Math.min(1, outingRelief(along, side))) + tone(x, z);
        oc.set([v, v, v], i * 3);
    }
    if (detailed) {
        const ids = outingGeo.index.array, keep = [];
        for (let i = 0; i < ids.length; i += 3) {
            if (i % 3072 === 0)
                yield;
            const tri = [ids[i], ids[i + 1], ids[i + 2]];
            if (tri.every(j => Math.abs(op.getX(j)) <= 100 && Math.abs(op.getZ(j)) <= 100) || tri.every(j => golfPatch(op.getX(j), op.getZ(j))))
                continue;
            keep.push(...tri);
        }
        outingGeo.setIndex(keep);
    }
    outingGeo.setAttribute('color', new __moonThree.BufferAttribute(oc, 3));
    outingGeo.computeVertexNormals();
    const outingTex = tex.clone();
    outingTex.repeat.set(450 * width / 3400, 450 * depth / 3400);
    outingTex.offset.set((1700 + west) / 3400 * 450, (1700 - north) / 3400 * 450);
    const outingMat = terrainMat.clone();
    outingMat.map = outingTex;
    const outingMesh = mesh(outingGeo, outingMat, scene);
    outingMesh.castShadow = detailed;
    outingMesh.name = 'outing-detailed-terrain';
    if (detailed) {
        yield* tileTerrainSteps(terrain, 800);
        yield* tileTerrainSteps(outingMesh, 160);
    }
    lunarRocks(scene, height);
    lunarFlag(scene, !detailed);
    if (detailed) {
        const corridor = new __moonThree.PlaneGeometry(golfTunedCourse ? 1450 : 950, 2300, golfTunedCourse ? 363 : 238, 575);
        corridor.rotateX(-Math.PI / 2);
        corridor.translate(golfTunedCourse ? -125 : -375, 0, 1250);
        const cp = corridor.attributes.position, cc = new Float32Array(cp.count * 3);
        for (let i = 0; i < cp.count; i++) {
            if (i % 3072 === 0)
                yield;
            const x = cp.getX(i), z = cp.getZ(i);
            cp.setY(i, height(x, z));
            const v = .88 + tone(x, z);
            cc.set([v, v, v], i * 3);
        }
        const ci = corridor.index.array, ck = [];
        for (let i = 0; i < ci.length; i += 3) {
            if (i % 3072 === 0)
                yield;
            const tri = [ci[i], ci[i + 1], ci[i + 2]];
            if (tri.every(j => par3Patch(cp.getX(j), cp.getZ(j)) || cupPatch(cp.getX(j), cp.getZ(j))))
                continue;
            ck.push(...tri);
        }
        corridor.setIndex(ck);
        corridor.setAttribute('color', new __moonThree.BufferAttribute(cc, 3));
        corridor.computeVertexNormals();
        const courseMat = terrainMat.clone(), courseTex = tex.clone();
        courseTex.repeat.set(450 * 950 / 3400, 450 * 2300 / 3400);
        courseTex.offset.set(450 * (1700 - 850) / 3400, 450 * (1700 - 2400) / 3400);
        courseMat.map = courseTex;
        const course = mesh(corridor, courseMat, scene);
        course.name = 'golf-long-terrain';
        course.castShadow = true;
        yield* tileTerrainSteps(course, 160);
        const shortWidth = bounds.east - bounds.west, shortDepth = bounds.north - bounds.south, short = new __moonThree.PlaneGeometry(shortWidth, shortDepth, shortWidth, shortDepth);
        short.rotateX(-Math.PI / 2);
        short.translate((bounds.west + bounds.east) / 2, 0, (bounds.south + bounds.north) / 2);
        const sp = short.attributes.position, sc = new Float32Array(sp.count * 3);
        for (let i = 0; i < sp.count; i++) {
            if (i % 3072 === 0)
                yield;
            const x = sp.getX(i), z = sp.getZ(i);
            sp.setY(i, height(x, z));
            const v = .88 + tone(x, z);
            sc.set([v, v, v], i * 3);
        }
        const si = short.index.array, sk = [];
        for (let i = 0; i < si.length; i += 3) {
            if (i % 3072 === 0)
                yield;
            const tri = [si[i], si[i + 1], si[i + 2]];
            if (tri.every(j => cupPatch(sp.getX(j), sp.getZ(j))))
                continue;
            sk.push(...tri);
        }
        short.setIndex(sk);
        short.setAttribute('color', new __moonThree.BufferAttribute(sc, 3));
        short.computeVertexNormals();
        const shortMat = terrainMat.clone(), shortTex = tex.clone();
        shortTex.repeat.set(450 * shortWidth / 3400, 450 * shortDepth / 3400);
        shortTex.offset.set(450 * (1700 + bounds.west) / 3400, 450 * (1700 - bounds.north) / 3400);
        shortMat.map = shortTex;
        const shortMesh = mesh(short, shortMat, scene);
        shortMesh.castShadow = false;
        shortMesh.name = 'golf-par3-terrain';
        yield* tileTerrainSteps(shortMesh, 40);
        for (const h of golfVisibleHoles()) {
            const size = cupPatchHalfSize(h) * 2, segments = Math.max(160, size * 5), center = golfGreenCenter(h), g = new __moonThree.PlaneGeometry(size, size, segments, segments);
            g.rotateX(-Math.PI / 2);
            g.translate(center.x, 0, center.z);
            const p = g.attributes.position, colors = new Float32Array(p.count * 3);
            for (let i = 0; i < p.count; i++) {
                if (i % 3072 === 0)
                    yield;
                const x = p.getX(i), z = p.getZ(i);
                p.setY(i, height(x, z));
                const v = .88 + tone(x, z);
                colors.set([v, v, v], i * 3);
            }
            g.setAttribute('color', new __moonThree.BufferAttribute(colors, 3));
            g.computeVertexNormals();
            const local = mesh(g, patchMat.clone(), scene);
            local.name = 'golf-crater-surface';
            local.userData.hole = h.id;
            local.castShadow = false;
            const flag = new __moonThree.Group();
            flag.name = 'crater-golf-flag';
            flag.userData.hole = h.id;
            flag.position.set(h.cup.x, height(h.cup.x, h.cup.z), h.cup.z);
            scene.add(flag);
            if (h.par === 3)
                lunarFlag(flag, true, Math.max(1, PITCH_PUTT_HOLES.findIndex(layout => layout.moonId === h.id) + 1));
            else {
                const cup = mesh(new __moonThree.CircleGeometry(.18, 32), dark, flag, 0, .003, 0);
                cup.rotation.x = -Math.PI / 2;
            }
            const rim = new __moonThree.Mesh(new __moonThree.RingGeometry(CRATER_RADIUS - .04, CRATER_RADIUS + .08, 64), new __moonThree.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 1, side: __moonThree.DoubleSide }));
            rim.rotation.x = -Math.PI / 2;
            rim.position.set(h.cup.x, .015, h.cup.z);
            rim.name = 'golf-crater-rim';
            rim.userData.hole = h.id;
            scene.add(rim);
        }
    }
}
async function prepareLunarSurface() {const lunarSurfaceSteps=moonPerfLunarSurfaceSteps;
    const group = new __moonThree.Group();
    group.name = 'Prepared lunar surface';
    let deadline = performance.now() + 8;
    for (const _ of lunarSurfaceSteps(group)) {
        void _;
        if (performance.now() >= deadline) {
            await new Promise(resolve => setTimeout(resolve, 0));
            deadline = performance.now() + 8;
        }
    }
    return group;
}
export{prepareLunarSurface};
const __moonThree={BufferGeometry:_,BufferAttribute:p,Group:i,Mesh:v,LOD:n,MeshStandardMaterial:h,PlaneGeometry:o,CircleGeometry:m,RingGeometry:r,DoubleSide:2};
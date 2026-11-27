// Illustrative distant stars, not a dated star chart. Geometry renders in front of this canvas.
export class NightSky {
 constructor(canvas){this.canvas=canvas;this.stars=[];let seed=816;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<480;i++){const az=random()*Math.PI*2,up=random()*.98+.02,h=Math.sqrt(1-up*up);this.stars.push({x:Math.sin(az)*h,y:Math.cos(az)*h,z:up,r:.45+random()*.75,a:.22+random()*.65});}}
 draw(g,s){const c=this.canvas,w=c.clientWidth,h=c.clientHeight;if(c.width!==w||c.height!==h){c.width=w;c.height=h;}const ctx=c.getContext('2d');ctx.clearRect(0,0,w,h);if(!g||s.solar?.up>-.15)return;for(const star of this.stars){const p=g.project(s.x+star.x*100000,s.y+star.y*100000,s.z+star.z*100000);if(p.depth<0||p.x<0||p.x>w||p.y<0||p.y>h)continue;ctx.globalAlpha=star.a;ctx.fillStyle='#d7ddeb';ctx.beginPath();ctx.arc(p.x,p.y,star.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
}

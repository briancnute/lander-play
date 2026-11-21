const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
// Authored gameplay weather, not a forecast. One bounded cloud at a time keeps
// the mobile shader cheap; local patches are common, broad fronts uncommon.
export class DustCells {
 constructor(random=Math.random,bounds=null){this.random=random;this.bounds=bounds;this.age=-1;this.wait=45;this.haze=0;this.front=0;this.cleared=false;}
 start(observer={x:0,y:0,z:0}){
  if(this.age>=0)return;
  const r=this.random,roll=r();this.size=roll<.72?'local':roll<.95?'medium':'large';
  const scale=this.bounds?(this.size==='local'?1800:this.size==='medium'?5000:11000):(this.size==='local'?450:this.size==='medium'?1150:2800);
  this.rx=scale*(.8+r()*.6);this.ry=scale*(.55+r()*.4);
  const angle=(r()-.5)*1.8;this.cos=Math.cos(angle);this.sin=Math.sin(angle);
  this.seed=r()*Math.PI*2;this.speed=35+r()*25;this.drift=(r()-.5)*12;
  this.x=observer.x+(r()-.5)*this.rx*.7;this.y=observer.y-this.ry*1.5-250;
  this.baseZ=observer.z??0;this.life=(this.ry*3+650)/this.speed+20;
  if(this.bounds&&roll>.99){const b=this.bounds;this.size='regional';this.x=(b.minX+b.width)/2;this.y=(b.minY+b.maxY)/2;this.rx=this.ry=Math.hypot(b.width-b.minX,b.maxY-b.minY)*1.8;this.speed=this.drift=0;this.life=180;}
  this.age=0;this.cleared=false;this.front=this.y+this.ry;
 }
 get cell(){return this.age<0?null:[this.x,this.y,this.rx,this.ry];}
 get shape(){return [this.cos,this.sin,this.seed+this.age*.018,smooth(this.age/10)*smooth((this.life-this.age)/18)];}
 density(x,y){
  if(this.age<0)return 0;
  const [c,s,phase,opacity]=this.shape,dx=x-this.x,dy=y-this.y;
  const qx=(c*dx+s*dy)/this.rx,qy=(-s*dx+c*dy)/this.ry;
  const edge=1+.16*Math.sin(qx*3+phase)+.12*Math.sin(qy*4-phase*.7)+.08*Math.sin((qx+qy)*5+phase*.4);
  return (1-smooth((Math.hypot(qx,qy)/edge-.42)/.58))*opacity;
 }
 tick(dt,observer,clear){
  if(dt<=0)return this.density(observer.x,observer.y);
  if(this.age<0){this.wait-=dt;if(this.wait<=0)this.start(observer);}
  else{this.age+=dt;this.x+=this.drift*dt;this.y+=this.speed*dt;this.front=this.y+this.ry;if(this.age>=this.life){this.age=-1;this.wait=35+this.random()*50;}}
  const density=this.density(observer.x,observer.y);
  this.haze=Math.max(density*.65,this.haze*Math.exp(-dt/8));if(this.haze<.005)this.haze=0;
  if(density>.995&&!this.cleared){clear();this.cleared=true;}
  return density;
 }
}

// Keep this footprint identical to density() above. GLSL samples it along each
// sightline, so a cloud can be seen in the distance before the rover enters it.
export const dustCellGLSL=`
uniform vec4 dustCell,dustShape;uniform float dustBase;
float cellDensity(vec2 p){
 vec2 d=p-dustCell.xy;
 vec2 q=vec2(dustShape.x*d.x+dustShape.y*d.y,-dustShape.y*d.x+dustShape.x*d.y)/dustCell.zw;
 float phase=dustShape.z;
 float edge=1.+.16*sin(q.x*3.+phase)+.12*sin(q.y*4.-phase*.7)+.08*sin((q.x+q.y)*5.+phase*.4);
 return (1.-smoothstep(.42,1.,length(q)/edge))*dustShape.w;
}`;

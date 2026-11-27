const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
// Compressed fictional weather: north is negative Y, south positive Y.
export class StormFront {
 constructor(){this.age=-1;this.wait=75;this.front=-4000;this.cleared=false;this.haze=0;}
 start(observer={y:650}){if(this.age>=0)return;this.age=0;this.front=observer.y-1800;this.cleared=false;}
 density(x,y){if(this.age<0)return 0;const edge=this.front+55*Math.sin(x*.004)+25*Math.sin(x*.011),d=edge-y;return smooth(d/200)*smooth((1500-d)/350);}
 tick(dt,observer,clear){if(dt>0){if(this.age<0){this.wait-=dt;if(this.wait<=0)this.start(observer);}else{this.age+=dt;this.front+=140*dt;}
 const density=this.density(observer.x,observer.y);this.haze=Math.max(density*.65,this.haze*Math.exp(-dt/8));if(this.haze<.005)this.haze=0;if(density>.995&&!this.cleared){clear();this.cleared=true;}
 if(this.age>=0&&this.front>(this.southBoundary??6500)){this.age=-1;this.wait=110;}}
 return this.density(observer.x,observer.y);
 }
}

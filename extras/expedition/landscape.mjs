// Compressed fictional Mars terrain. Existing Jezero solar anchor is retained for this playtest.
export const WORLD={width:6400,height:900};
export const destinations=[
 {id:'basin',name:'Basin',x:960,y:470},
 {id:'delta',name:'Delta channels',x:2150,y:480},
 {id:'dunes',name:'Dark dunes',x:3550,y:470},
 {id:'buttes',name:'Layered buttes',x:5050,y:470},
];
export const regionAt=x=>x<1120?'Basin':x<2040?'East passage':x<3200?'Delta channels':x<4700?'Dark dunes':'Layered buttes';
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
export function expansionGround(x,y){
 const dune=smooth((x-3180)/250)*(1-smooth((x-4460)/300));
 const wave=(x+y*.8)/55;
 const sand=dune*(3.8+3.8*Math.sin(wave)+1.4*Math.sin(wave*1.9+y*.012));
 const rise=smooth((x-4620)/400);
 return sand+rise*(5+4*Math.sin(x*.007)*Math.cos(y*.009))+12*Math.exp(-(((x-5580)/180)**2+((y-240)/135)**2));
}
// Fixed world-space mountain rings. Their projection changes with camera position, not just heading.
export const mountainFaces=[];
for(const side of [-1,1])for(let i=-1;i<10;i++){
 const x=i*820+120,y=side<0?-650-(i%3)*160:1500+(i%3)*180;
 const radius=570,height=190+(Math.sin(i*2.7+side)+1)*85;
 const rings=[1,.67,.2].map((r,j)=>Array.from({length:11},(_,k)=>{const a=k*Math.PI*2/11;return [x+Math.cos(a)*radius*r,y+Math.sin(a)*radius*r*.65,j===0?-12:height*(j===1?.42:1)*(1+Math.sin(k*2+i)*.1)];}));
 for(let j=0;j<2;j++)for(let k=0;k<11;k++){const n=(k+1)%11;mountainFaces.push([rings[j][k],rings[j][n],rings[j+1][n],rings[j+1][k]]);}
 mountainFaces.push(rings[2]);
}

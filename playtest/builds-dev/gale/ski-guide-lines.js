/** Optional suggested lines: terrain and scoring are unchanged. */
export function skiGuideLines(courses){
 const c=courses.slalom,anchors=[{s:0,u:0},...c.gates,{s:4800,u:0},{s:c.lip,u:0},{s:c.finish,u:0}],slalom=[];
 for(let i=1;i<anchors.length;i++){const a=anchors[i-1],b=anchors[i],n=Math.ceil((b.s-a.s)/30);for(let j=0;j<n;j++){const t=j/n,s=a.s+(b.s-a.s)*t,u=a.u+(b.u-a.u)*t*t*(3-2*t);slalom.push(c.point(s,u));}}slalom.push(c.point(c.finish));
 const a=courses.crater.arena,knots=[[0,-100],[0,-500],[-350,-850],[-700,-1000],[-1000,-650],[-900,-100],[-450,200]],crater=[];
 for(let i=0;i<knots.length;i++)for(let j=0;j<24;j++){const t=j/24,p=knots[(i+knots.length-1)%knots.length],q=knots[i],r=knots[(i+1)%knots.length],s=knots[(i+2)%knots.length],xy=[0,1].map(k=>.5*(2*q[k]+(-p[k]+r[k])*t+(2*p[k]-5*q[k]+4*r[k]-s[k])*t*t+(-p[k]+3*q[k]-3*r[k]+s[k])*t*t*t));crater.push({x:a.x+xy[0],y:a.y+xy[1]});}crater.push({...crater[0]});
 return {slalom,crater};
}

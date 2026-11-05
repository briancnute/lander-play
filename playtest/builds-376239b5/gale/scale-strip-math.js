export const STRIP_UNITS=8/3,STRIP_METRES=500;
// Geometry-derived dimensions, not a vehicle tuning/speed scalar.
export function meshBounds(vertices){const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(let i=0;i<vertices.length;i+=9)for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],vertices[i+j]);hi[j]=Math.max(hi[j],vertices[i+j]);}return {lo,hi,size:lo.map((v,i)=>(hi[i]-v)/STRIP_UNITS)};}
export function stripPosition(p,line){const dx=(p.x-line.x)/STRIP_UNITS,dy=(p.y-line.y)/STRIP_UNITS;return {along:dx*line.dx+dy*line.dy,across:-dx*line.dy+dy*line.dx};}
export function crossingTime(a,b,target){return a.t+(b.t-a.t)*(target-a.along)/(b.along-a.along);}
export function chooseStrip(area){let best=null;const U=STRIP_UNITS;
 for(let east=-5000;east<=1250;east+=125)for(let north=-2000;north<=750;north+=125)for(const [dx,dy]of [[1,0],[0,-1]]){const line={x:east*U,y:-north*U,dx,dy},zs=[];let blocked=false,maxGrade=0,maxCrossGrade=0;
 for(let m=-15;m<=560;m+=5){const x=line.x+dx*m*U,y=line.y+dy*m*U,z=area.ground(x,y);if(!Number.isFinite(z)){blocked=true;break;}if(zs.length)maxGrade=Math.max(maxGrade,Math.abs(z-zs.at(-1))/(5*U));maxCrossGrade=Math.max(maxCrossGrade,Math.abs(area.ground(x-dy*6*U,y+dx*6*U)-area.ground(x+dy*6*U,y-dx*6*U))/(12*U));zs.push(z);if(area.localRocks(x,y).some(([rx,ry,r])=>Math.hypot(x-rx,y-ry)<r+9*U)){blocked=true;break;}}
 if(!blocked&&maxGrade<=.06&&(!best||maxGrade+4*maxCrossGrade<best.maxGrade+4*best.maxCrossGrade))best={...line,maxGrade,maxCrossGrade};}
 if(!best||best.maxGrade>.06)throw Error('No clear, gently graded 500 m calibration strip found.');return best;
}

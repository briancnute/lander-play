// Approved variable-turn course, source east/north metres on unmodified terrain.
export const MURRAY_SHELF_NODES=[[-5800.0, -8700.0], [-5719.327736509148, -8552.330412197243], [-5746.3523360834115, -8309.569123939089], [-5600.583410587371, -8127.28024566234], [-5606.731381174482, -7866.8078645284195], [-5457.572480666906, -7680.279710012678], [-5207.4466699298355, -7630.063026667896], [-5051.5078193991885, -7435.056319674164], [-5057.015376383473, -7201.716478241697], [-5211.452319196798, -6991.876325815169], [-5175.540999414554, -6755.75875522972], [-4970.072516830247, -6604.5392487250065], [-4934.97736340669, -6373.7879865619525], [-4747.545015106006, -6208.822366847269], [-4508.778665733246, -6203.186727142418], [-4389.3954910468665, -6200.368907289993]];
export const MURRAY_SHELF_LINE=[],MURRAY_GATE_STATIONS=[];
let distance=0;
function append(source){const p=[source[0]*8/3,-source[1]*8/3],last=MURRAY_SHELF_LINE.at(-1);if(last)distance+=Math.hypot(p[0]-last[0],p[1]-last[1]);MURRAY_SHELF_LINE.push(p);}
for(let i=0;i<MURRAY_SHELF_NODES.length-1;i++){
 const nodes=MURRAY_SHELF_NODES,a=nodes[Math.max(0,i-1)],b=nodes[i],c=nodes[i+1],d=nodes[Math.min(nodes.length-1,i+2)],n=Math.floor(Math.hypot(c[0]-b[0],c[1]-b[1])/3)+2;
 for(let j=0;j<n;j++){const t=j/n;append([0,1].map(k=>i===0?b[k]+(c[k]-b[k])*t:.5*(2*b[k]+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t)));if(j===0&&i>0)MURRAY_GATE_STATIONS.push(distance);}
}
append(MURRAY_SHELF_NODES.at(-1));
const end=MURRAY_SHELF_LINE.at(-1),last=MURRAY_SHELF_LINE.at(-2);
export const MURRAY_SHELF_FINISH=distance;
const d=Math.hypot(end[0]-last[0],end[1]-last[1]);
export const MURRAY_SHELF_PATH=[...MURRAY_SHELF_LINE,[end[0]+(end[0]-last[0])/d*100,end[1]+(end[1]-last[1])/d*100]];

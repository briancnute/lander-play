// Approved authored gate line, source metres relative to the Gale landing reference.
export const GEDIZ_NODES=[[-1905.9, -11842.2], [-2081.8, -11609.1], [-1980.0, -11422.1], [-2154.7, -11305.7], [-2196.4, -11099.7], [-2356.4, -10961.6], [-2312.4, -10755.5], [-2604.6, -10654.6], [-2586.1, -10446.8], [-2691.9, -10265.7], [-2497.1, -10096.2], [-2680.8, -9839.9]];
export const GEDIZ_HAZARDS=[{"id": "A", "label": "Upper shortcut shoulder", "east": -1930, "north": -11700, "radius": 32, "nearGates": "Start\u20132", "avoid": "Stay west around gate 1; do not cut directly toward gate 2.", "distanceToLine": 77.4}, {"id": "B", "label": "Middle butte and its shoulder", "east": -2390, "north": -10460, "radius": 90, "nearGates": "7\u20139", "avoid": "Traverse left to gate 7, then stay on the western shelf through 8 and 9.", "distanceToLine": 194.3}, {"id": "C", "label": "Lower inside mound", "east": -2685, "north": -10025, "radius": 38, "nearGates": "9\u201311", "avoid": "Carve right to gate 10 before the left finish bend; avoid the straight shortcut.", "distanceToLine": 126.1}];
const U=8/3;
export const GEDIZ_PATH=[];
for(let i=0;i<GEDIZ_NODES.length-1;i++){
 const a=GEDIZ_NODES[Math.max(0,i-1)],b=GEDIZ_NODES[i],c=GEDIZ_NODES[i+1],d=GEDIZ_NODES[Math.min(GEDIZ_NODES.length-1,i+2)];
 for(let j=0;j<120;j++){const t=j/120,q=[0,1].map(k=>.5*(2*b[k]+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t));GEDIZ_PATH.push([q[0]*U,-q[1]*U]);}
}
GEDIZ_PATH.push([GEDIZ_NODES.at(-1)[0]*U,-GEDIZ_NODES.at(-1)[1]*U]);

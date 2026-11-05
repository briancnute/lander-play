// Existing surveyed mound to the right of the line between gates 11 and 12.
// Source east/north metres, same surface as exploration. No authored ramp.
export const MURRAY_BUMP={east:-4860,north:-6460,eastRadius:25,northRadius:55};
export function murrayLaunchAllowed(x,y){
 const e=x/(8/3),n=-y/(8/3),b=MURRAY_BUMP;
 return ((e-b.east)/b.eastRadius)**2+((n-b.north)/b.northRadius)**2<=1;
}

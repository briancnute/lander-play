// Rigid-body choreography for the slalom final jump. Angles are radians.
// Tracks ease in/out with zero velocity and acceleration at every authored stop.
const pi=Math.PI,turn=2*pi;
const arc=(value,peak=.5)=>[[0,0],[peak,value],[1,0]];
const spin=(value=turn)=>[[0,0],[1,value]];
export const tricks=[
 [
  {name:'Attitude Check',roll:arc(.18),motion:'A small bank, then level skis.',mechanism:'Opposed side jets roll the entire rig and counterfire to level it.'},
  {name:'Nose Check',pitch:arc(-.32,.4),motion:'Tip the nose up, then recover.',mechanism:'Fore and aft jets pitch the rigid chassis and ski frame together.'},
  {name:'Edge Switch',roll:[[0,0],[.28,.35],[.68,-.35],[1,0]],motion:'Bank left, bank right, finish level.',mechanism:'Side jets reverse the bank; no ski hinges or detached parts.'},
  {name:'Cross Check',yaw:arc(.6,.4),roll:arc(.4,.4),motion:'A banked diagonal glance, then square up.',mechanism:'Yaw and roll jet pairs act together, then reverse the maneuver.'},
 ],
 [
  {name:'Quarter Recovery',yaw:arc(pi/2),motion:'Turn a quarter circle and recover.',mechanism:'Opposed lateral jets start, arrest, and reverse the yaw.'},
  {name:'Halfturn Rewind',yaw:[[0,0],[.45,pi],[.55,pi],[1,0]],motion:'Face backward briefly, then unwind.',mechanism:'A yaw counter-burn holds the backward pose before returning.'},
  {name:'Full Orbit',yaw:spin(),motion:'One clean, level 360° turn.',mechanism:'A yaw pair accelerates the entire rig; reverse thrust arrests it.'},
  {name:'Banked Orbit',yaw:spin(),roll:[[0,0],[.35,.6],[.65,.6],[1,0]],motion:'One full turn with a deliberate bank.',mechanism:'Roll and yaw pairs coordinate; the frame remains rigid.'},
 ],
 [
  {name:'Flip Recovery',pitch:arc(pi,.45),motion:'Invert nose-first, then reverse to recover.',mechanism:'Fore and aft jets arrest the half-flip and return the rig upright.'},
  {name:'Barrel Roll',roll:spin(),motion:'One full roll around the ski direction.',mechanism:'The side pair rolls rover and skis together through 360°.'},
  {name:'Forward Flip',pitch:spin(),motion:'One complete forward somersault.',mechanism:'Fore and aft jets initiate the flip, then counterfire before landing.'},
  {name:'Corkscrew',pitch:spin(),yaw:spin(),motion:'A forward flip combined with a full turn.',mechanism:'Coordinated attitude jets steer the combined rotation; no swiveling undercarriage.'},
 ],
 [
  {name:'Inversion Recovery',roll:[[0,0],[.35,pi],[.6,pi],[1,0]],motion:'Roll upside down, hold, then unwind.',mechanism:'Side jets stop the inversion, coast through the hold, then recover.'},
  {name:'Polar Orbit',roll:[[0,0],[.25,pi],[.75,pi],[1,turn]],yaw:[[0,0],[.26,0],[.74,turn],[1,turn]],motion:'Roll inverted, turn once, then roll upright.',mechanism:'The rig holds its roll angle while coordinated jets drive the inverted turn.'},
  {name:'Inverted Observatory',pitch:[[0,0],[.25,pi],[.72,pi],[1,turn]],yaw:[[0,0],[.26,0],[.71,turn],[1,turn]],motion:'Pitch inverted, survey through a full turn, then finish the flip.',mechanism:'Pitch jets establish the inversion; coordinated jets turn the inverted rig and recover.'},
  {name:'Axis Exchange',roll:[[0,0],[.47,turn],[1,turn]],pitch:[[0,0],[.53,0],[1,turn]],motion:'A full barrel roll followed by a forward flip.',mechanism:'Stop the roll before starting the pitch rotation; each has its own acceleration and counter-burn.'},
 ],
];
export const executionTier=score=>score>=90?3:score>=80?2:score>=60?1:0;
export const trickFor=(classIndex,score)=>tricks[classIndex][executionTier(score)];
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
function track(keys,u){if(!keys)return 0;for(let i=1;i<keys.length;i++){const [a,x]=keys[i-1],[b,y]=keys[i];if(u<=b)return x+(y-x)*smooth((u-a)/(b-a));}return keys.at(-1)[1];}
export function trickPose(classIndex,score,progress){const move=trickFor(classIndex,score),u=clamp((progress-.05)/.9);return Object.fromEntries(['pitch','yaw','roll'].map(axis=>[axis,track(move[axis],u)]));}
// The renderer composes yaw, negative local Y roll, and local X pitch.
// Estimate body-axis angular momentum so a multi-axis move does not fire a
// world-axis nozzle in the wrong direction when the rover is inverted.
export function attitudeTorque(poseAt,t){
 const h=.001,inertia=[12,8,16];
 const omega=t=>{const p=poseAt(t),a=poseAt(t-h),b=poseAt(t+h),pd=(b.pitch-a.pitch)/(2*h),rd=(b.roll-a.roll)/(2*h),yd=(b.yaw-a.yaw)/(2*h);return [pd-yd*Math.sin(p.roll),-rd*Math.cos(p.pitch)-yd*Math.sin(p.pitch)*Math.cos(p.roll),rd*Math.sin(p.pitch)-yd*Math.cos(p.pitch)*Math.cos(p.roll)];};
 const w=omega(t),a=omega(t-h),b=omega(t+h),L=w.map((v,i)=>v*inertia[i]);
 const gyro=[w[1]*L[2]-w[2]*L[1],w[2]*L[0]-w[0]*L[2],w[0]*L[1]-w[1]*L[0]];
 const torque=w.map((_,i)=>inertia[i]*(b[i]-a[i])/(2*h)+gyro[i]);
 return {pitch:Math.abs(torque[0])>6?Math.sign(torque[0]):0,roll:Math.abs(torque[1])>6?-Math.sign(torque[1]):0,yaw:Math.abs(torque[2])>6?-Math.sign(torque[2]):0};
}

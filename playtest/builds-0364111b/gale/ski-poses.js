import {moonTrickPose,moveRotation} from '../shared/ride-tricks.js';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
/** Adapt the shared staged grammar to a rover: ski hinges, not imaginary hands. */
export function skiVisualPose(move){
 if(!move)return {pitch:0,yaw:0,roll:0,foldLeft:0,foldRight:0,bladeSpin:0};
 const p=moonTrickPose(move),board=move.tree==='board',tuck=clamp(-p.bodyY/.70),extended=clamp(p.pitch/(Math.PI/2)),stand=clamp(p.pitch/(Math.PI/2)-1),one=clamp((1.55-(move.sign>0?p.armRX:p.armLX))/2.8),angle=moveRotation(move)*move.sign;
 const exit=move.kind==='spin'?clamp(1-(move.age+move.cycles*move.duration)/.18):1;
 const pitch=(board?.12*tuck:.24*extended+.66*stand)*exit;
 const near=tuck*(.25+.55*one)*exit,far=tuck*(.25-.10*one)*exit;
 return {pitch:pitch+(move.kind==='spin'&&['flip','bar','cork','rodeo'].includes(move.axis)?angle:0),yaw:move.kind==='spin'&&['yaw','cork','rodeo'].includes(move.axis)?angle:0,roll:move.kind==='spin'&&move.axis==='roll'?angle:p.rootRoll*.25*exit,foldLeft:board?(move.sign>0?far:near):-.25*extended*exit,foldRight:board?(move.sign>0?near:far):-.25*extended*exit,bladeSpin:move.secret?angle*2:0};
}

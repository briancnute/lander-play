// Energy is normalized so pickups and all rover activities use the same meter.
export const TURBO_PROFILES=Object.freeze({
 roam:Object.freeze({seconds:4,recharge:6,multiplier:1.65}),
 relay:Object.freeze({seconds:6,recharge:4,multiplier:1.65}),
});
export function createRoverTurbo(profile='roam'){
 let config=TURBO_PROFILES[profile],energy=1,active=false,exhausted=false;
 return {get energy(){return energy;},get exhausted(){return exhausted;},get active(){return active;},get multiplier(){return active?config.multiplier:1;},
  cancel(){active=false;},reset(next=profile){profile=next;config=TURBO_PROFILES[next];energy=1;active=false;exhausted=false;},
  refill(amount=.5){energy=Math.min(1,energy+Math.max(0,amount));},
  step(dt,{held=false,brake=false,enabled=true}={}){
   if(!Number.isFinite(dt)||dt<=0)return;
   if(!held)exhausted=false;
   active=enabled&&held&&!brake&&!exhausted&&energy>0;
   if(active){energy=Math.max(0,energy-dt/config.seconds);if(energy<1e-9){energy=0;exhausted=true;}}
   else if(enabled)energy=Math.min(1,energy+dt/config.recharge);
   if(!enabled)active=false;
  },
 };
}
// Swept collection prevents fast rovers skipping a refill between simulation frames.
export function collectTurboRefills(pickups,collected,stage,a,b,turbo){
 let count=0;const dx=b.x-a.x,dy=b.y-a.y,length=dx*dx+dy*dy;
 for(const p of pickups){if(p.stage!==stage||collected.has(p.id))continue;const t=length?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/length)):0;
  if(Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)<=p.radius){collected.add(p.id);turbo.refill();count++;}}
 return count;
}

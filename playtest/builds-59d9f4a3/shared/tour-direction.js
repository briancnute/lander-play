// Brief hysteresis keeps normal bends and small steering corrections quiet.
export function createTourDirection(){
 let visible=false,wrongFor=0,correctFor=0;
 return {get visible(){return visible;},reset(){visible=false;wrongFor=correctFor=0;},step(dt,state,projection){
  const angle=state.heading-projection.heading,error=Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)));
  const backwards=state.v < -4&&Math.cos(angle)>0;
  const wrong=error>Math.PI*65/180||backwards||projection.distance>32;
  const correct=error<Math.PI*35/180&&!backwards&&projection.distance<28;
  wrongFor=wrong?wrongFor+dt:0;correctFor=correct?correctFor+dt:0;
  if(wrongFor>=.45)visible=true;
  if(correctFor>=.45)visible=false;
  return visible;
 }};
}

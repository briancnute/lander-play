export const DEFAULT_TOUR_STEERING={strength:.55,response:.28};
export function createTourSteering(settings={}){
 const values={strength:Math.max(.15,Math.min(1.5,Number(settings.strength)||DEFAULT_TOUR_STEERING.strength)),response:Math.max(.05,Math.min(.8,Number(settings.response)||DEFAULT_TOUR_STEERING.response))};let value=0;
 return {values,reset(){value=0;},step(input,dt){const target=Math.max(-1,Math.min(1,input||0));value+=(target-value)*(1-Math.exp(-dt/values.response));return value*values.strength;}};
}

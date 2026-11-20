// Discoveries and comparable race bests are shared. Historical mission state and
// its coordinate scale remain untouched while a V2 outing is active.
export function explorationSaveView(raw,v2){
 const position=v2?raw.v2Position??raw.position:raw.position,navigation=v2?raw.v2Navigation:raw.navigation;
 return {...raw,worldScale:v2&&raw.v2Position?raw.v2WorldScale??raw.worldScale:raw.worldScale,
  position:position?{...position}:null,navigation:navigation?{...navigation,target:navigation.target?{...navigation.target}:null}:null,
  expedition:v2?null:raw.expedition,activityState:v2?raw.v2ActivityState??{}:raw.activityState};
}
export function mergeExplorationSave(previous,current,v2){
 if(!v2)return {...previous,...current};
 return {...previous,...current,worldScale:previous.worldScale,position:previous.position,navigation:previous.navigation,
  expedition:previous.expedition,activityState:previous.activityState,
  v2WorldScale:current.worldScale,v2Position:current.position,v2Navigation:current.navigation,v2ActivityState:current.activityState};
}

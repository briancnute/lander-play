export const REQUIRED_ACTIVITY_IDS=['delta-trial'];

// Future destination controls consume this contract. Keeping it independent
// from UI and save code makes missing discoveries impossible to waive through
// a count alone, and lets later activities extend one explicit requirement list.
export function worldUnlocked(progress,requiredDiscoveries,requiredRegions=[]){
 const collected=new Set(progress?.collected??[]),regions=new Set(progress?.regions??[]),completed=new Set(progress?.completedActivities??[]);
 const discoveries=Array.isArray(requiredDiscoveries)?requiredDiscoveries:Array.from({length:requiredDiscoveries},(_,i)=>i);
 return discoveries.every(i=>collected.has(i))&&requiredRegions.every(id=>regions.has(id))&&REQUIRED_ACTIVITY_IDS.every(id=>completed.has(id));
}

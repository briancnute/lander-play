export const REQUIRED_ACTIVITY_IDS=['delta-trial'];

// Future destination controls consume this contract. Keeping it independent
// from UI and save code makes missing discoveries impossible to waive through
// a count alone, and lets later activities extend one explicit requirement list.
export function worldUnlocked(progress,totalDiscoveries){
 const collected=new Set(progress?.collected??[]),completed=new Set(progress?.completedActivities??[]);
 return Array.from({length:totalDiscoveries},(_,i)=>i).every(i=>collected.has(i))&&REQUIRED_ACTIVITY_IDS.every(id=>completed.has(id));
}

// Fictional replacement mission; historical route/fact data is kept separate.
export const CLONE_MISSIONS=['art','delta-trial','landing-trial','neretva-jump'];
export const missingMissions=record=>CLONE_MISSIONS.filter(id=>!record.activities.includes(id));
export const cloneReady=(record,course)=>record.run?.facts.length===course.facts.length&&!record.run.pending&&missingMissions(record).length===0;
export const missionCopy={art:'Navigation calibration · Draw and photograph a wheel-track pattern to verify the clone’s positioning system.','delta-trial':'Drive-system validation · Complete every circuit checkpoint to test the replacement chassis.','landing-trial':'Memory replay · Complete the Belva–Bright Angel rally to validate the restored terrain record.','neretva-jump':'Mobility validation · Link three boost zones and land the crossing to test the clone’s upgraded control system.'};
export function migrateArt(points,site,version){return (Array.isArray(points)?points:[]).filter(p=>p&&['x','y','h'].every(k=>Number.isFinite(p[k]))).map(p=>version===2?{...p}:{...p,x:p.x+site.x-8960,y:p.y+site.y-6720}).filter(p=>Math.abs(p.x-site.x)<500&&Math.abs(p.y-site.y)<500).slice(-1400);}

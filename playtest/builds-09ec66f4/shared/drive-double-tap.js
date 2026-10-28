// A short first tap followed by a held second press. Repeats and a second finger
// cannot manufacture taps; cancellation never arms a subsequent boost.
export function createDriveDoubleTap({windowMs=330,tapMs=220}={}){
 let active=null,downAt=0,lastUp=-Infinity,lastKind=null,boost=false;
 return {cancel(id){if(active===id)this.clear();},get held(){return boost&&active!==null;},clear(){active=null;boost=false;lastUp=-Infinity;lastKind=null;},
  down(id,kind,time){if(active!==null)return;boost=kind===lastKind&&time-lastUp<=windowMs;active=id;downAt=time;lastUp=-Infinity;},
  up(id,kind,time){if(id!==active)return;lastUp=!boost&&time-downAt<=tapMs?time:-Infinity;lastKind=kind;active=null;boost=false;},
 };
}

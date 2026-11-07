import {build,normalize,importLegacy} from './model.js?v=flight-1';
export const COLLECTION_KEY='astra.hangar.workshop.v2';
/** Shared initialization for Edit Craft and Hangar; never replace an existing save. */
export function loadWorkshopCollection(storage){
 let collection={crafts:[build('explorer'),build('visitor'),build('breakfast')],selected:null},storageIssue='',legacyImported=false;
 try{
  storage??=localStorage;
  const raw=storage.getItem(COLLECTION_KEY),saved=JSON.parse(raw);
  if(saved?.crafts?.length)collection={crafts:saved.crafts.map(normalize),selected:saved.selected};
  else {const old=JSON.parse(storage.getItem('astra.hangar.concept.v1'));if(old?.crafts?.length){collection={crafts:old.crafts.map(importLegacy),selected:old.selected};legacyImported=true;}}
  collection.selected=collection.crafts.some(c=>c.id===collection.selected)?collection.selected:collection.crafts[0].id;
  if(raw===null)storage.setItem(COLLECTION_KEY,JSON.stringify(collection));
 }catch{storageIssue='Local saving unavailable. Existing saved designs have not been replaced.';}
 collection.selected=collection.crafts.some(c=>c.id===collection.selected)?collection.selected:collection.crafts[0].id;
 return {collection,storageIssue,legacyImported};
}

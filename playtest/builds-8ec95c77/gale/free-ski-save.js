// Reuse the established outing format without replacing rover exploration.
export function freeSkiStorage(storage){const key=k=>k.replace('astra.gale.openWorld.v1','astra.gale.freeSki.v1');return {getItem:k=>storage.getItem(key(k)),setItem:(k,value)=>storage.setItem(key(k),value)};}

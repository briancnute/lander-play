/** Actual starts only: menus and resumes do not call this. Never reconstruct old attempts. */
export const GAME_STARTS_KEY='astra.game.starts.v1';
const valid=r=>r&&typeof r.id==='string'&&Number.isFinite(r.at)&&['world','site','activity','variant'].every(k=>typeof r[k]==='string');
export function gameStarts(storage){try{storage??=globalThis.localStorage;const rows=JSON.parse(storage.getItem(GAME_STARTS_KEY)??'[]');return Array.isArray(rows)&&rows.every(valid)?rows:[];}catch{return [];}}
export function recordGameStart(data,storage){try{storage??=globalThis.localStorage;const rows=JSON.parse(storage.getItem(GAME_STARTS_KEY)??'[]');if(!Array.isArray(rows)||!rows.every(valid))return null;const row={id:crypto.randomUUID(),at:Date.now(),variant:'',...data};if(!valid(row))return null;if(!rows.some(r=>r.id===row.id))storage.setItem(GAME_STARTS_KEY,JSON.stringify([...rows,row]));return row.id;}catch{return null;}}

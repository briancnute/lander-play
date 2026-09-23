const url=new URL('../../../extras/album/store.js',import.meta.url);
const store=await import(/* @vite-ignore */ url.href);
export const {storePhoto,readPhotos,deletePhoto}=store;

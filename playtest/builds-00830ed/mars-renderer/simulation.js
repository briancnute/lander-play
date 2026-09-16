// A new public runtime must not reuse a previous release's cached shared simulation.
const url=new URL('../../../extras/expedition/sim.mjs',import.meta.url);
const build=new URL(import.meta.url).pathname.match(/\/(builds-[^/]+)\//)?.[1];
if(build)url.searchParams.set('build',build);
const simulation=await import(/* @vite-ignore */ url.href);
export const {create,update,ground,nearest,samples,reverseAvailable,boostPickups}=simulation;

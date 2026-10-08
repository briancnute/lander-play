// Shared by bundled activities and the directly published Mars worlds.
const protectedTarget = 'button, [role="button"], canvas, [data-game-control]';
const editableTarget = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
const fullscreenTarget = 'canvas, [data-game-control], [data-control], #drive-controls button, #speed, [data-launch], [data-surface-play], [data-free-roam], #v3-play-lander, #v3-play-collector';
const installed = new WeakSet();

/** Best effort, within the initiating gesture. Never blocks play or locks orientation. */
export function requestGameFullscreen(doc = document) {
 let host = doc;
 try { host = doc.defaultView.top.document; } catch { /* A standalone/cross-origin world uses its own document. */ }
 const win = host.defaultView, root = host.documentElement;
 if (!win?.matchMedia('(pointer: coarse)').matches || win.matchMedia('(display-mode: standalone)').matches || win.navigator.standalone || host.fullscreenElement || host.fullscreenEnabled === false || typeof root.requestFullscreen !== 'function' || root.dataset.astraFullscreenAttempted) return;
 root.dataset.astraFullscreenAttempted = 'true';
 try { Promise.resolve(root.requestFullscreen()).catch(() => {}); } catch { /* Unsupported or denied: play remains available. */ }
}

/** Suppress browser actions on game surfaces, preserving forms, help text and scrolling. */
export function installBrowserInput(doc = document) {
 if (installed.has(doc)) return;
 installed.add(doc);
 const style = doc.createElement('style');
 style.dataset.astraBrowserInput = '';
 style.textContent = `
 :is(button, [role="button"], canvas, [data-game-control]),
 :is(button, [role="button"], [data-game-control]) * {
   -webkit-user-select: none; user-select: none;
   -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent;
 }
 :is(button, [role="button"]) { touch-action: manipulation; }
 canvas, [data-game-control], [data-control], #drive-controls button, button#speed { touch-action: none; }
 :is(input, textarea, select, [contenteditable]:not([contenteditable="false"])) {
   -webkit-user-select: auto; user-select: auto; -webkit-touch-callout: default;
 }
 `;
 doc.head.append(style);
 const control = target => target?.closest && !target.closest(editableTarget) && target.closest(protectedTarget);
 for (const event of ['contextmenu', 'selectstart', 'dragstart']) {
   doc.addEventListener(event, e => { if (control(e.target)) e.preventDefault(); }, {capture: true});
 }
 // Touch activation begins on pointerup, not pointerdown. Request after a hold releases.
 doc.addEventListener('pointerup', e => {
   if (e.button === 0 && control(e.target) && e.target.closest(fullscreenTarget)) requestGameFullscreen(doc);
 }, {capture: true, passive: true});
}

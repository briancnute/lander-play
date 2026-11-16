/* Independent Extras entry: compatible with the currently published ASTRA bundle. */
(() => {
  const script = document.currentScript;
  const gameRoot = new URL('../', script.src);
  const destination = new URL(script.dataset.saturnPath || 'saturn-extras/', gameRoot);
  let host;
  function install() {
    const menu = document.querySelector('.play-navigation [data-extras-panel]');
    if (!menu || menu.querySelector('[data-saturn-extras]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.saturnExtras = '';
    button.textContent = 'Saturn';
    button.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation();
      if (host) return;
      const visual = document.querySelector('iframe.astra-visual');
      const restoreVisual = document.querySelector('.play-navigation')?.dataset.active === 'visual';
      if (restoreVisual) visual?.contentWindow?.postMessage({type:'astra-visual-active',active:false},location.origin);
      const dialog = document.createElement('dialog');
      dialog.setAttribute('aria-label', 'Saturn Extras');
      dialog.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#080d14;overflow:hidden';
      const frame = document.createElement('iframe');
      frame.title = 'Saturn Extras'; frame.src = destination.href;
      frame.allow = 'fullscreen';
      frame.style.cssText = 'display:block;width:100%;height:100%;border:0';
      const cover = document.createElement('div');
      cover.style.cssText = 'position:absolute;inset:0;display:grid;place-content:center;gap:20px;text-align:center;color:#eee9dc;font:16px system-ui;background:#080d14';
      const status = document.createElement('p'); status.textContent = 'Opening Saturn…'; status.setAttribute('role','status');
      const back = document.createElement('button'); back.textContent = 'Back to Extras';
      back.style.cssText = 'padding:14px;border-radius:8px;font:inherit;cursor:pointer';
      cover.append(status,back); dialog.append(frame,cover); document.body.append(dialog); host = dialog;
      const leave = () => {
        clearTimeout(timer); window.removeEventListener('message', receive); dialog.close(); dialog.remove(); host = undefined;
        if (restoreVisual) visual?.contentWindow?.postMessage({type:'astra-visual-active',active:true},location.origin);
        button.focus();
      };
      const receive = event => {
        if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
        if (event.data?.type === 'astra-saturn-extras-exit') leave();
        if (event.data?.type === 'astra-saturn-extras-ready') { clearTimeout(timer); cover.remove(); frame.focus(); }
      };
      const timer = setTimeout(()=>{status.textContent='Saturn could not load. Return to Extras and try again.';},20000);
      back.onclick = leave;
      window.addEventListener('message', receive);
      dialog.addEventListener('cancel', event => event.preventDefault());
      dialog.showModal(); frame.focus();
    });
    menu.prepend(button);
  }
  new MutationObserver(install).observe(document.documentElement, {subtree:true, childList:true});
  install();
})();

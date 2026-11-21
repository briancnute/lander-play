//#region tools/prototypes/shared/pause-menu.js
function e(e, t, n) {
	let r = document.createElement("details"), i = document.createElement("summary");
	i.textContent = t, r.append(i);
	for (let e of n) e && r.append(e);
	return e.append(r), r;
}
//#endregion
//#region venus-ascent/pauseMenu.ts
function t(t, n, r) {
	let i = (e) => document.getElementById(e), a = i("pause-dialog");
	a.classList.add("veil-pause");
	let o = i("resume"), s = i("restart"), c = i("exit"), l = i("best"), u = i("journal"), d = [
		"accent",
		"badge",
		"quality",
		"sound",
		"reduced-motion"
	].map((e) => i(e).closest("label")), f = a.querySelector("a"), p = document.createElement("button");
	p.id = "veil-records", p.className = "veil-link", p.textContent = "Records";
	let m = [...a.querySelectorAll("button")].find((e) => e.textContent === "Records");
	p.onclick = () => m.click();
	let h = document.createElement("div");
	h.hidden = !0, h.append(i("power")), a.replaceChildren(h);
	let g = document.createElement("h2");
	g.id = "veil-pause-title", g.textContent = "Through the Veil", a.setAttribute("aria-labelledby", g.id);
	let _ = document.createElement("p");
	_.className = "veil-era", _.textContent = t ? "Ancient Venus · Paused" : "Present-day Venus · Paused", a.append(g, _);
	let v = document.createElement("div");
	v.className = "veil-pause-body", a.append(v);
	let y = e(v, "Controls", []);
	y.id = "veil-controls";
	let b = document.createElement("dl");
	b.className = "veil-keys", b.innerHTML = "\n <div><dt>Steer</dt><dd><span class=\"veil-keyboard\"><kbd>← →</kbd> / <kbd>A D</kbd></span><span class=\"veil-touch\"><span aria-label=\"Left and right tilt buttons\" class=\"veil-icons\">↶ ↷</span></span></dd></div>\n <div><dt>Thrust</dt><dd><span class=\"veil-keyboard\"><kbd>Space</kbd></span><span class=\"veil-touch\"><span aria-label=\"Thrust button\" class=\"veil-icons\">↑</span></span><small>Hold to rise</small></dd></div>\n <div><dt data-special-label>Boost</dt><dd><span class=\"veil-keyboard\"><kbd>Shift</kbd></span><span class=\"veil-touch\"><span aria-label=\"Boost button\" class=\"veil-icons\" data-special-icon>ϟ</span></span><small data-special-help>Tap to boost</small></dd></div>", y.append(b);
	let x = document.createElement("p");
	if (x.textContent = "Hold thrust and steer together. Release thrust to descend.", y.append(x), t) {
		let t = document.createElement("p");
		t.textContent = "After the last sample, land upright on the lit pad. Space / ↑ gives medium thrust; Shift / LOW gives low thrust after two seconds and a release.", t.className = "veil-approach", t.innerHTML = "<span class=\"veil-keyboard\">After the last sample: Space gives medium thrust; Shift gives low thrust after two seconds and a release.</span><span class=\"veil-touch\">After the last sample: ↑ gives medium thrust; LOW gives low thrust after two seconds and a release.</span> Land upright on the lit pad.", e(y, "Landing", [t]);
	}
	e(y, "Preferences", d.slice(2));
	let S = e(v, "About", []);
	S.id = "veil-about";
	let C = document.createElement("p");
	C.textContent = t ? "Explore an imagined ocean-bearing Venus. Collect all seven samples in any order, then return to the island pad. This ancient landscape is hypothetical." : "Collect six glowing samples, then climb above the clouds. Lightning is a fictional challenge here; its occurrence on Venus remains disputed.", S.append(C), u.textContent = "Field notes", u.classList.add("veil-link"), S.append(u), e(S, "Craft appearance", d.slice(0, 2)), n.classList.add("veil-link"), S.append(n), f && S.append(f);
	let w = document.createElement("div");
	w.className = "veil-record-row", w.append(l, p), v.append(w);
	let T = document.createElement("footer");
	return T.className = "veil-pause-footer", o.textContent = "Resume", s.textContent = "Restart", c.textContent = "Exit", c.classList.remove("pause-return"), T.append(o, s, c), a.append(T), () => {
		let e = r();
		b.querySelector("[data-special-label]").textContent = e ? "Low thrust" : "Boost", b.querySelector("[data-special-help]").textContent = e ? "Hold to settle" : "Tap to boost";
		let t = b.querySelector("[data-special-icon]");
		t.textContent = e ? "↑" : "ϟ", t.setAttribute("aria-label", e ? "Low thrust button" : "Boost button");
	};
}
//#endregion
export { t as installVeilPause };

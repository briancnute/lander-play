//#region moon-golf/golfMenu.ts
function e(e) {
	let t = (e) => document.getElementById(e), n = t("options-dialog"), r = n.querySelector("[data-close]"), i = t("restart-event"), a = t("golf-statistics"), o = t("exit-practice"), s = [...n.querySelectorAll(":scope > details")].find((e) => e.querySelector("summary")?.textContent === "Settings"), c = t("pause-tools"), l = n.querySelector(":scope > button:last-child"), u = [
		r,
		i,
		a,
		o,
		s,
		c,
		l
	].map((e) => ({
		node: e,
		parent: e.parentNode,
		next: e.nextSibling
	})), d = [
		r,
		a,
		o,
		s.querySelector("summary"),
		c.querySelector("summary")
	].map((e) => ({
		node: e,
		text: e.textContent
	})), f = [...n.children], p = /* @__PURE__ */ new Map(), m = document.createElement("div");
	m.className = "golf-menu-shell", m.hidden = !0, m.innerHTML = `<div class="golf-menu-heading"><h2>Moon Golf</h2><span id="golf-menu-course"></span></div>
 <div class="golf-menu-tabs" role="tablist" aria-label="Golf menu">${[
		"Game",
		"Controls",
		"More"
	].map((e, t) => `<button id="golf-tab-${t}" role="tab" aria-controls="golf-panel-${t}" aria-selected="${t === 0}" tabindex="${t === 0 ? 0 : -1}">${e}</button>`).join("")}</div>
 <div class="golf-menu-content">${[
		0,
		1,
		2
	].map((e) => `<section id="golf-panel-${e}" role="tabpanel" aria-labelledby="golf-tab-${e}" ${e ? "hidden" : ""}></section>`).join("")}</div>
 <footer class="golf-menu-footer"></footer>`, n.append(m);
	let h = [
		0,
		1,
		2
	].map((e) => t("golf-panel-" + e)), g = document.createElement("p");
	g.className = "golf-menu-progress";
	let _ = document.createElement("div");
	_.className = "golf-menu-actions", h[0].append(g, _);
	let v = m.querySelector("footer"), y = [...m.querySelectorAll("[role=tab]")];
	function b(e) {
		y.forEach((t, n) => {
			t.setAttribute("aria-selected", String(n === e)), t.tabIndex = n === e ? 0 : -1, h[n].hidden = n !== e;
		});
	}
	y.forEach((e, t) => {
		e.onclick = () => b(t), e.onkeydown = (e) => {
			let n = e.key === "ArrowRight" ? (t + 1) % 3 : e.key === "ArrowLeft" ? (t + 2) % 3 : e.key === "Home" ? 0 : e.key === "End" ? 2 : null;
			n !== null && (e.preventDefault(), b(n), y[n].focus());
		};
	});
	let x = matchMedia("(pointer: coarse)");
	function S() {
		let e = x.matches;
		h[1].innerHTML = `<dl class="golf-control-list">
   <div><dt>Aim</dt><dd><kbd>←</kbd> <kbd>→</kbd>${e ? "" : " / A D"}</dd></div>
   <div><dt>Swing</dt><dd><kbd>${e ? "Swing" : "Space"}</kbd><small>Start → lock power → strike</small></dd></div>
   <div><dt>Preview</dt><dd><kbd>${e ? "Shot preview" : "Shift"}</kbd></dd></div>
  </dl><details><summary>More</summary><p>${e ? "Hold the screen" : "Hold Space"} during flight for 8× speed.${e ? "" : " Hold Shift for one second for 24×."}</p><p>Clubs are automatic. On the green, one putt preview is available per shot.</p></details>`;
	}
	S(), x.addEventListener("change", S);
	let C = !1;
	function w() {
		let y = e();
		if (!y.active) {
			if (C) {
				for (let { node: e, parent: t, next: n } of [...u].reverse()) t.insertBefore(e, n?.parentNode === t ? n : null);
				for (let e of f) e.hidden = p.get(e) ?? !1;
				for (let { node: e, text: t } of d) e.textContent = t;
			}
			C = !1, m.hidden = !0, n.classList.remove("golf-pause");
			return;
		}
		if (!C) {
			for (let e of f) p.set(e, !!e.hidden), e.hidden = !0;
			_.append(i, a), h[2].append(s, c, l), v.append(r, o);
			for (let e of [
				a,
				s,
				c,
				l,
				o,
				r
			]) e.hidden = !1;
			a.textContent = "Records", r.textContent = "Resume", o.textContent = "Exit", s.querySelector("summary").textContent = "Preferences", c.querySelector("summary").textContent = "Course tools", C = !0;
		}
		t("golf-menu-course").textContent = y.course, g.textContent = `Hole ${y.hole}/${y.holes} · ${y.strokes} ${y.strokes === 1 ? "stroke" : "strokes"}`, i.hidden = !1, m.hidden = !1, n.classList.add("golf-pause");
	}
	n.addEventListener("beforetoggle", w);
	let T = t("golf-setup");
	T.classList.add("golf-compact-setup"), T.querySelector(".activity-explanation")?.remove();
	let E = document.createElement("p");
	E.textContent = "Fewest strokes wins. Clubs are automatic.", T.querySelector("h2").after(E);
	let D = document.createElement("div");
	D.className = "golf-setup-footer", D.append(T.querySelector("[data-close]"), t("golf-start")), T.append(D);
}
//#endregion
export { e as compactGolfMenu };

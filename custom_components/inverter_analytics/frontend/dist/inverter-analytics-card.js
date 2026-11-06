/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, it = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Ot = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (it && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = gt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && gt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (e) => new Ot(typeof e == "string" ? e : e + "", void 0, st), Dt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Ot(i, e, st);
}, ce = (e, t) => {
  if (it) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), r = z.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, ft = it ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return ae(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: le, defineProperty: he, getOwnPropertyDescriptor: de, getOwnPropertyNames: ue, getOwnPropertySymbols: pe, getPrototypeOf: ge } = Object, V = globalThis, mt = V.trustedTypes, fe = mt ? mt.emptyScript : "", me = V.reactiveElementPolyfillSupport, M = (e, t) => e, j = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? fe : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, rt = (e, t) => !le(e, t), $t = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ??= Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = $t) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, i);
      r !== void 0 && he(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: r, set: n } = de(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = ge(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const i = this.properties, s = [...ue(i), ...pe(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) i.unshift(ft(r));
    } else t !== void 0 && i.push(ft(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ce(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : j).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : j;
      this._$Em = r;
      const c = o.fromAttribute(i, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? rt)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[M("elementProperties")] = /* @__PURE__ */ new Map(), A[M("finalized")] = /* @__PURE__ */ new Map(), me?.({ ReactiveElement: A }), (V.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, yt = (e) => e, B = nt.trustedTypes, _t = B ? B.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + _, $e = `<${It}>`, w = document, N = () => w.createComment(""), U = (e) => e === null || typeof e != "object" && typeof e != "function", ot = Array.isArray, ye = (e) => ot(e) || typeof e?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, vt = />/g, b = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, wt = /"/g, zt = /^(?:script|style|textarea|title)$/i, Lt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = Lt(1), J = Lt(2), k = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function Ft(e, t) {
  if (!ot(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const _e = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let u, h, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); ) p = o.lastIndex, o === C ? h[1] === "!--" ? o = bt : h[1] !== void 0 ? o = vt : h[2] !== void 0 ? (zt.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = b) : h[3] !== void 0 && (o = b) : o === b ? h[0] === ">" ? (o = r ?? C, l = -1) : h[1] === void 0 ? l = -2 : (l = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? b : h[3] === '"' ? wt : xt) : o === wt || o === xt ? o = b : o === bt || o === vt ? o = C : (o = b, r = void 0);
    const m = o === b && e[c + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + $e : l >= 0 ? (s.push(u), a.slice(0, l) + Rt + a.slice(l) + _ + m) : a + _ + (l === -2 ? c : m);
  }
  return [Ft(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [u, h] = _e(t, i);
    if (this.el = H.createElement(u, s), v.currentNode = this.el.content, i === 2 || i === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = v.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Rt)) {
          const p = h[o++], m = r.getAttribute(l).split(_), f = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: f[2], strings: m, ctor: f[1] === "." ? ve : f[1] === "?" ? xe : f[1] === "@" ? we : K }), r.removeAttribute(l);
        } else l.startsWith(_) && (a.push({ type: 6, index: n }), r.removeAttribute(l));
        if (zt.test(r.tagName)) {
          const l = r.textContent.split(_), p = l.length - 1;
          if (p > 0) {
            r.textContent = B ? B.emptyScript : "";
            for (let m = 0; m < p; m++) r.append(l[m], N()), v.nextNode(), a.push({ type: 2, index: ++n });
            r.append(l[p], N());
          }
        }
      } else if (r.nodeType === 8) if (r.data === It) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(_, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(e, t, i = e, s) {
  if (t === k) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (t = T(e, r._$AS(e, t.values), r, s)), t;
}
class be {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? w).importNode(i, !0);
    v.currentNode = r;
    let n = v.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new D(n, n.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (u = new Ae(n, this, t)), this._$AV.push(u), a = s[++c];
      }
      o !== a?.index && (n = v.nextNode(), o++);
    }
    return v.currentNode = w, r;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = T(this, t, i), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ye(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(Ft(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new be(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = At.get(t.strings);
    return i === void 0 && At.set(t.strings, i = new H(t)), i;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new D(this.O(N()), this.O(N()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = yt(t).nextSibling;
      yt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, i, 0), o = !U(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const c = t;
      let a, u;
      for (t = n[0], a = 0; a < n.length - 1; a++) u = T(this, c[s + a], i, a), u === k && (u = this._$AH[a]), o ||= !U(u) || u !== this._$AH[a], u === d ? t = d : t !== d && (t += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ve extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class xe extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class we extends K {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = T(this, t, i, 0) ?? d) === k) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ae {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const Ee = nt.litHtmlPolyfillSupport;
Ee?.(H, D), (nt.litHtmlVersions ??= []).push("3.3.3");
const Se = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new D(t.insertBefore(N(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis;
class S extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Se(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
S._$litElement$ = !0, S.finalized = !0, at.litElementHydrateSupport?.({ LitElement: S });
const ke = at.litElementPolyfillSupport;
ke?.({ LitElement: S });
(at.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: rt }, Ce = (e = Te, t, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Pe(e) {
  return (t, i) => typeof i == "object" ? Ce(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function jt(e) {
  return Pe({ ...e, state: !0, attribute: !1 });
}
const $ = "—", Bt = ["ring", "bar", "tile"];
function Wt(e) {
  return Bt.includes(e) ? e : "ring";
}
function Me(e, t, i, s) {
  const r = new Intl.NumberFormat(i, { maximumFractionDigits: 0 }), n = Math.max(1, Math.round(e));
  if (n < 60)
    return {
      duration: s.minutes({ m: r.format(n) }),
      arrival: new Date(t.getTime() + n * 6e4),
      over2Days: !1
    };
  const o = Math.round(e / 5) * 5;
  if (o >= 48 * 60) return { duration: s.over2Days, arrival: null, over2Days: !0 };
  const c = Math.floor(o / 60), a = o % 60;
  return { duration: a === 0 ? s.hours({ h: r.format(c) }) : s.hoursMinutes({ h: r.format(c), m: r.format(a) }), arrival: new Date(t.getTime() + o * 6e4), over2Days: !1 };
}
function ct(e, t) {
  return new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(e);
}
function Ne(e, t, i) {
  return e.arrival === null ? e.duration : `${e.duration} ${i.arrival({ time: ct(e.arrival, t) })}`;
}
function x(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e);
}
function Ue(e, t) {
  const i = e.map((s) => t.roles[s] ?? s);
  return i.length <= 1 ? i.join("") : `${i.slice(0, -1).join(", ")} ${t.and} ${i[i.length - 1]}`;
}
function Et(e) {
  const { state: t, m: i, locale: s } = e;
  switch (t.kind) {
    case "loading":
      return { word: $, status: $, note: e.basisError };
    case "unmapped":
      return { word: $, status: $, note: i.unmapped };
    case "unavailable":
      return {
        word: $,
        status: $,
        note: t.entity ? i.unavailable({ entity: t.entity }) : null
      };
    case "at_limit":
      return {
        word: i.words.atLimit,
        status: i.atLimit({ t: x(t.target, s) }),
        note: null
      };
    case "at_floor":
      return {
        word: i.words.atFloor,
        status: i.atFloor({ t: x(t.target, s) }),
        note: null
      };
    case "idle":
      return { word: i.words.idle, status: i.idle, note: null };
    case "no_capacity": {
      const r = (e.powerW ?? 0) > 0, n = r ? i.chargingTo : i.dischargingTo, o = t.reason === "missing_roles" ? i.capacityNeedsRoles({ roles: Ue(t.missing_roles, i) }) : i.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
      return {
        word: r ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: x(e.target ?? 0, s) }), eta: $ }),
        note: o
      };
    }
    case "charging":
    case "discharging": {
      const r = t.kind === "charging", n = r ? i.chargingTo : i.dischargingTo, o = e.eta ? Ne(e.eta, s, i) : $;
      return {
        word: r ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: x(t.target, s) }), eta: o }),
        note: null
      };
    }
  }
}
function St(e, t, i) {
  switch (e.kind) {
    case "charging":
      return "charge";
    case "discharging":
      return "discharge";
    case "at_floor":
      return "low";
    case "no_capacity":
      return t === null ? "rest" : t >= i ? "charge" : t <= -i ? "discharge" : "rest";
    default:
      return "rest";
  }
}
function He(e, t) {
  if (e === null) return "mdi:battery-unknown";
  const i = t ? "mdi:battery-charging" : "mdi:battery";
  return e < 5 ? `${i}-outline` : e >= 95 ? t ? `${i}-100` : i : `${i}-${Math.round(e / 10) * 10}`;
}
function qt(e, t, i) {
  return e === null || Number.isNaN(e) ? $ : Math.abs(Math.round(e)) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${i.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${i.units.w}`;
}
function W(e, t) {
  return e === null ? $ : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)}%`;
}
function Oe(e, t) {
  const { m: i, locale: s, eta: r } = e, n = W(e.soc, s), o = r ? r.duration : e.word;
  switch (t) {
    case "full":
      return { primary: `${n} · ${o}` };
    case "ring":
      return { primary: e.target === null ? n : `${n} · ${i.toTarget({ t: x(e.target, s) })}`, secondary: o };
    case "time":
      return r?.arrival ? { primary: i.approx({ time: ct(r.arrival, s) }) } : r?.over2Days ? { primary: i.over2Days } : { primary: e.word };
  }
}
const Gt = {
  ring: { rows: 5, columns: 6, min_rows: 5, size: 6 },
  bar: { rows: 3, columns: 6, min_rows: 3, size: 3 },
  tile: { rows: 2, columns: 6, min_rows: 2, size: 2 }
};
function De(e) {
  const { rows: t, columns: i, min_rows: s } = Gt[e];
  return { rows: t, columns: i, min_rows: s };
}
function Re(e) {
  return Gt[e].size;
}
function kt(e) {
  return Math.min(100, Math.max(0, e));
}
function Ie(e, t, i, s) {
  const r = 2 * Math.PI * s, n = [], o = (a) => kt(a) * 360 / 100;
  t !== null && n.push({ at: o(t), kind: "charge" }), i !== null && n.push({ at: o(i), kind: "discharge" });
  const c = e === null ? 0 : r * kt(e) / 100;
  return { circumference: r, fillDash: c, ticks: n };
}
function ze(e, t) {
  return `${x(e, t)}%`;
}
function Tt(e, t) {
  const { m: i, locale: s } = e;
  if (e.target === null) return null;
  const r = i.toTarget({ t: x(e.target, s) }), n = e.eta?.arrival;
  if (!n) return r;
  const o = ct(n, s);
  return t === "approx" ? `${r} · ${i.approx({ time: o })}` : `${r} ${i.atTime({ time: o })}`;
}
function Ct(e) {
  const { powerW: t } = e;
  if (e.state.kind === "loading" || t === null || Number.isNaN(t)) return null;
  const i = Math.round(t);
  return { icon: i > 0 ? "mdi:arrow-up" : i < 0 ? "mdi:arrow-down" : null, text: qt(Math.abs(t), e.locale, e.m) };
}
function Le(e) {
  const t = e.state.kind;
  return t === "unmapped" || t === "unavailable" || t === "loading" ? `${$} · ${$}` : Oe(e, "full").primary;
}
function Pt(e) {
  const { m: t, locale: i } = e;
  return t.sentence({
    soc: W(e.soc, i),
    status: e.status,
    power: qt(e.powerW, i, t)
  });
}
function Fe(e) {
  return [
    {
      name: "layout",
      selector: {
        select: {
          mode: "dropdown",
          options: Bt.map((t) => ({ value: t, label: e.layouts[t] }))
        }
      }
    },
    { name: "entry_id", selector: { text: {} } },
    { name: "charge_to", selector: { text: {} } },
    { name: "discharge_to", selector: { text: {} } }
  ];
}
const Vt = 12e4;
function je(e, t, i = Vt) {
  if (e.length === 0) return null;
  const s = t - i;
  let r = 0, n = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, s), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (r += e[o].w * (a - c), n += a - c);
  }
  return n === 0 ? e[e.length - 1].w : r / n;
}
function Be(e, t, i = Vt) {
  const s = t - i;
  let r = 0;
  for (; r + 1 < e.length && e[r + 1].t <= s; ) r++;
  return e.slice(r);
}
function Mt(e, t, i) {
  if (e === void 0 || e === "") return { value: i, unavailable: null };
  if (typeof e == "number") return { value: e, unavailable: null };
  const s = Number(e);
  if (e.trim() !== "" && Number.isFinite(s)) return { value: s, unavailable: null };
  const r = L(t[e]?.state);
  return r === null ? { value: null, unavailable: e } : { value: r, unavailable: null };
}
function L(e) {
  if (e === void 0 || e === "unavailable" || e === "unknown" || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function We(e) {
  const { soc: t, powerW: i, chargeTo: s, dischargeTo: r, basis: n } = e;
  if (!e.mapped) return { kind: "unmapped" };
  if (e.unavailable !== null) return { kind: "unavailable", entity: e.unavailable };
  if (t === null || i === null || s === null || r === null)
    return { kind: "unavailable", entity: "" };
  const o = n.idle_w;
  if (t >= s && i > -o) return { kind: "at_limit", target: s };
  if (t <= r && i < o) return { kind: "at_floor", target: r };
  if (Math.abs(i) < o) return { kind: "idle" };
  if (e.capacityKwh === null)
    return {
      kind: "no_capacity",
      reason: n.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: n.clean_hours,
      clean_hours_min: n.clean_hours_min,
      missing_roles: n.missing_roles
    };
  const c = i > 0, a = c ? s : r, u = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(i) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: u * 60 };
}
function qe(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const i = Number(t);
  return Number.isFinite(i) ? i : t;
}
function Ge(e, t) {
  const i = { ...e };
  for (const s of ["entry_id", "charge_to", "discharge_to", "layout", "style"]) {
    const r = qe(t[s]);
    r === void 0 ? delete i[s] : s === "charge_to" || s === "discharge_to" ? i[s] = r : i[s] = String(r);
  }
  return i;
}
function Nt(e) {
  return typeof e == "string" && e.trim() !== "" && !Number.isFinite(Number(e));
}
function Ve(e, t) {
  const i = [];
  return e?.soc_entity && i.push(e.soc_entity), e?.battery_power_entity && i.push(e.battery_power_entity), Nt(t.charge_to) && i.push(t.charge_to), Nt(t.discharge_to) && i.push(t.discharge_to), i;
}
function Ke(e, t) {
  return !e || e.length !== t.length ? !0 : t.some((i, s) => i !== e[s]);
}
const Kt = 36e5;
function Ye(e, t) {
  return e === void 0 || t - e > Kt;
}
const Ze = {
  name: "Battery time",
  description: "Time at the current power, from the battery's measured capacity",
  chargingTo: (e) => `Charging to ${e.t}%`,
  dischargingTo: (e) => `Discharging to ${e.t}%`,
  atLimit: (e) => `At limit ${e.t}%`,
  atFloor: (e) => `At floor ${e.t}%`,
  idle: "Idle",
  // The status line and the time, e.g. "Charging to 85% · 2 h 10 min (≈16:40)".
  withEta: (e) => `${e.status} · ${e.eta}`,
  minutes: (e) => `${e.m} min`,
  hoursMinutes: (e) => `${e.h} h ${e.m} min`,
  hours: (e) => `${e.h} h`,
  over2Days: "over 2 days",
  arrival: (e) => `(≈${e.time})`,
  unmapped: "Map battery SoC and battery power in Inverter Analytics",
  unavailable: (e) => `${e.entity} is unavailable`,
  capacityNotMeasured: (e) => `Capacity not measured yet (${e.n} of ${e.min} clean discharge hours)`,
  capacityNeedsRoles: (e) => `Capacity needs ${e.roles} mapped`,
  and: "and",
  // The roles the measured capacity needs, as capacityNeedsRoles names them.
  roles: {
    battery_soc: "battery SoC",
    battery_charge_total: "battery charge total",
    battery_discharge_total: "battery discharge total"
  },
  units: { w: "W", kw: "kW" },
  // One-word state labels, under the ring's SoC and in the tile and badge.
  // Unmapped, unavailable and loading show the dash instead.
  words: {
    charging: "charging",
    discharging: "discharging",
    idle: "idle",
    atLimit: "at limit",
    atFloor: "at floor"
  },
  // "to 85%" beside the time; "at 16:40" in the tile; "≈16:40" in the ring and badge.
  toTarget: (e) => `to ${e.t}%`,
  atTime: (e) => `at ${e.time}`,
  approx: (e) => `≈${e.time}`,
  // What a screen reader says for the ring, the bar and the badge.
  sentence: (e) => `Battery at ${e.soc}. ${e.status}. Battery power ${e.power}.`,
  layouts: { ring: "Ring", bar: "Bar", tile: "Tile" },
  styles: { full: "Full", ring: "Ring", time: "Time" },
  badge: {
    name: "Battery time",
    description: "Battery charge and the time to its target, at the current power."
  },
  editor: {
    layout: "Layout",
    style: "Style",
    entryId: "Inverter",
    entryIdHint: "The inverter's entry id; leave empty if there is only one",
    chargeTo: "Charge to",
    chargeToHint: "A number (%) or an entity; 100 if empty",
    dischargeTo: "Discharge to",
    dischargeToHint: "A number (%) or an entity; the low battery charge if empty"
  }
}, Ut = /* @__PURE__ */ new Map();
function Je(e) {
  let t = Ut.get(e);
  return t || (t = new Intl.PluralRules(e), Ut.set(e, t)), t;
}
function Xe(e, t, i) {
  const s = Je(e).select(t);
  return s === "one" ? i.one : s === "few" ? i.few ?? i.other : s === "many" ? i.many ?? i.other : i.other;
}
const Qe = {
  name: "Час батареї",
  description: "Час за поточної потужності, з виміряної ємності батареї",
  chargingTo: (e) => `Заряд до ${e.t}%`,
  dischargingTo: (e) => `Розряд до ${e.t}%`,
  atLimit: (e) => `Досягла ліміту ${e.t}%`,
  atFloor: (e) => `Досягла нижньої межі ${e.t}%`,
  idle: "Простій",
  withEta: (e) => `${e.status} · ${e.eta}`,
  minutes: (e) => `${e.m} хв`,
  hoursMinutes: (e) => `${e.h} год ${e.m} хв`,
  hours: (e) => `${e.h} год`,
  over2Days: "понад 2 доби",
  arrival: (e) => `(≈${e.time})`,
  unmapped: "Вкажіть рівень заряду й потужність батареї в Inverter Analytics",
  unavailable: (e) => `Сутність ${e.entity} недоступна`,
  // "з 20 чистих годин", "з 21 чистої години": the count after «з» decides.
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + Xe("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
  capacityNeedsRoles: (e) => `Для ємності вкажіть ${e.roles}`,
  and: "і",
  roles: {
    battery_soc: "рівень заряду батареї",
    battery_charge_total: "лічильник заряду батареї",
    battery_discharge_total: "лічильник розряду батареї"
  },
  units: { w: "Вт", kw: "кВт" },
  words: {
    charging: "заряд",
    discharging: "розряд",
    idle: "простій",
    atLimit: "на ліміті",
    atFloor: "на нижній межі"
  },
  toTarget: (e) => `до ${e.t}%`,
  atTime: (e) => `о ${e.time}`,
  approx: (e) => `≈${e.time}`,
  sentence: (e) => `Батарея на ${e.soc}. ${e.status}. Потужність батареї ${e.power}.`,
  layouts: { ring: "Кільце", bar: "Смуга", tile: "Плитка" },
  styles: { full: "Повний", ring: "Кільце", time: "Час" },
  badge: {
    name: "Час батареї",
    description: "Заряд батареї й час до цілі за поточної потужності."
  },
  editor: {
    layout: "Вигляд",
    style: "Стиль",
    entryId: "Інвертор",
    entryIdHint: "Ідентифікатор запису інвертора; залиште порожнім, якщо інвертор один",
    chargeTo: "Заряджати до",
    chargeToHint: "Число (%) або сутність; 100, якщо порожньо",
    dischargeTo: "Розряджати до",
    dischargeToHint: "Число (%) або сутність; низький заряд батареї, якщо порожньо"
  }
}, Yt = "inverter-analytics.lang";
function lt(e) {
  return e === "en" || e === "uk";
}
function Zt(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function ti(e, t) {
  return lt(e) ? e : Zt(t) ? "uk" : "en";
}
function ei(e, t) {
  return e === "uk" ? "uk" : !t || Zt(t) ? "en" : t;
}
let E, q;
const X = /* @__PURE__ */ new Set();
function ii() {
  if (E === void 0)
    try {
      const e = globalThis.localStorage?.getItem(Yt) ?? null;
      E = lt(e) ? e : null;
    } catch {
      E = null;
    }
  return E;
}
function Jt() {
  for (const e of X) e();
}
function Xt() {
  return ti(ii(), q);
}
function Q() {
  return ei(Xt(), q);
}
const si = "inverter-analytics-lang";
function Qt(e) {
  !lt(e) || e === E || (E = e, Jt());
}
globalThis.window?.addEventListener(si, (e) => {
  Qt(e.detail);
});
globalThis.window?.addEventListener("storage", (e) => {
  const { key: t, newValue: i } = e;
  t === Yt && Qt(i);
});
function ri(e) {
  if (e === q) return;
  const t = Q();
  q = e, Q() !== t && Jt();
}
function ni(e) {
  return X.add(e), () => X.delete(e);
}
const oi = 2e4, ai = 100;
function ht() {
  return Xt() === "uk" ? Qe : Ze;
}
function ci(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
class li {
  constructor(t) {
    this.config = {}, this.samples = [], this.host = t, t.addController(this);
  }
  get hass() {
    return this._hass;
  }
  setConfig(t) {
    const i = {
      entry_id: t.entry_id || void 0,
      charge_to: t.charge_to,
      discharge_to: t.discharge_to
    }, s = i.entry_id !== this.config.entry_id;
    this.config = i, this.watched = void 0, s && this._hass && this.fetchedFor !== void 0 && (this.samples = [], this.lastPower = void 0, this.basis = void 0, this.fetchBasis()), this.host.requestUpdate();
  }
  setHass(t) {
    this._hass = t, ri(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.host.isConnected && this.startTimers();
    const i = Ve(this.basis, this.config).map((s) => t.states[s]);
    Ke(this.watched, i) && (this.watched = i, this.host.requestUpdate());
  }
  hostConnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = ni(() => this.host.requestUpdate()), this._hass && (this.startTimers(), this.fetchedFor !== void 0 && Ye(this.fetchedAt, Date.now()) && this.fetchBasis());
  }
  hostDisconnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = void 0, this.timer !== void 0 && clearInterval(this.timer), this.tick !== void 0 && clearInterval(this.tick), this.timer = void 0, this.tick = void 0;
  }
  hostUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  startTimers() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), Kt)), this.tick === void 0 && (this.tick = setInterval(() => this.host.requestUpdate(), oi));
  }
  async fetchBasis() {
    const t = this._hass;
    if (!t) return;
    const i = this.config.entry_id;
    this.fetchedFor = i ?? "";
    const s = { type: "inverter_analytics/battery_eta" };
    i && (s.entry_id = i);
    let r, n;
    try {
      r = await t.callWS(s);
    } catch (o) {
      n = ci(o);
    }
    this.config.entry_id === i && (this.basis = r, this.basisError = n, this.fetchedAt = Date.now(), this.watched = void 0, this.host.requestUpdate());
  }
  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  notePower(t) {
    const i = this.basis?.battery_power_entity;
    if (!i) return;
    const s = t.states[i];
    if (s === this.lastPower) return;
    this.lastPower = s;
    const r = Date.now(), n = L(s?.state);
    if (n === null) {
      this.samples = [];
      return;
    }
    const o = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = Be([...this.samples, { t: r, w: n * o }], r);
  }
  /** Everything a face shows, resolved and worded; loading until hass and basis. */
  view() {
    const t = ht(), i = Q(), s = this._hass, r = this.basis;
    if (!s || !r) {
      const Y = { kind: "loading" }, { word: re, status: ne, note: oe } = Et({
        state: Y,
        powerW: null,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m: t,
        locale: i
      });
      return {
        state: Y,
        soc: null,
        powerW: null,
        chargeTo: null,
        dischargeTo: null,
        target: null,
        eta: null,
        tone: St(Y, null, 0),
        word: re,
        status: ne,
        note: oe,
        m: t,
        locale: i
      };
    }
    const n = r.soc_entity, o = r.battery_power_entity, c = !!(n && o), a = n ? L(s.states[n]?.state) : null, h = (o ? L(s.states[o]?.state) : null) === null ? null : je(this.samples, Date.now()), l = Mt(this.config.charge_to, s.states, ai), p = Mt(this.config.discharge_to, s.states, r.low_pct);
    let m = null;
    c && (a === null ? m = n : h === null ? m = o : m = l.unavailable ?? p.unavailable);
    const f = We({
      soc: a,
      powerW: h,
      chargeTo: l.value,
      dischargeTo: p.value,
      unavailable: m,
      mapped: c,
      capacityKwh: r.capacity_kwh,
      basis: r
    });
    let R = null;
    f.kind === "charging" || f.kind === "discharging" ? R = f.target : f.kind === "no_capacity" && (R = (h ?? 0) > 0 ? l.value : p.value);
    const pt = f.kind === "charging" || f.kind === "discharging" ? Me(f.minutes, /* @__PURE__ */ new Date(), i, t) : null, { word: ee, status: ie, note: se } = Et({
      state: f,
      powerW: h,
      target: R,
      eta: pt,
      basisError: this.basisError ?? null,
      m: t,
      locale: i
    });
    return {
      state: f,
      soc: a,
      powerW: h,
      chargeTo: l.value,
      dischargeTo: p.value,
      target: R,
      eta: pt,
      tone: St(f, h, r.idle_w),
      word: ee,
      status: ie,
      note: se,
      m: t,
      locale: i
    };
  }
}
var hi = Object.defineProperty, te = (e, t, i, s) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, i, r) || r);
  return r && hi(t, i, r), r;
};
const G = "inverter-analytics-battery-time", tt = "inverter-analytics-battery-time-editor", y = 120, F = 10, P = (y - F) / 2;
let di = 0;
function I(e) {
  return Math.min(100, Math.max(0, e));
}
const dt = class dt extends S {
  constructor() {
    super(...arguments), this.battery = new li(this), this.layout = "ring", this.gradientId = `ia-battery-fill-${++di}`;
  }
  static getConfigElement() {
    return document.createElement(tt);
  }
  static getStubConfig() {
    return { charge_to: 100 };
  }
  setConfig(t) {
    this.layout = Wt(t.layout), this.battery.setConfig(t);
  }
  /** The height in the masonry view, in 50 px units. */
  getCardSize() {
    return Re(this.layout);
  }
  /** The size in the sections view. */
  getGridOptions() {
    return De(this.layout);
  }
  // A plain setter, not a property: Home Assistant hands over a new hass on
  // every state change in the house, and the controller decides when to render.
  set hass(t) {
    this.battery.setHass(t);
  }
  get hass() {
    return this.battery.hass;
  }
  render() {
    const t = this.battery.view(), i = this.layout === "bar" ? this.bar(t) : this.layout === "tile" ? this.tile(t) : this.ring(t);
    return g`<ha-card class="tone-${t.tone} ${this.layout}">
      <div class="body">${i}${this.note(t)}</div>
    </ha-card>`;
  }
  note(t) {
    return t.note ? g`<div class="note" title=${t.note}>${t.note}</div>` : d;
  }
  pill(t) {
    const i = Ct(t);
    return i ? g`<span class="pill">
      ${i.icon ? g`<ha-icon .icon=${i.icon}></ha-icon>` : d}${i.text}
    </span>` : d;
  }
  ring(t) {
    const { circumference: i, fillDash: s, ticks: r } = Ie(
      t.soc,
      t.chargeTo,
      t.dischargeTo,
      P
    ), n = y / 2, o = (a, u) => {
      const h = a * Math.PI / 180, l = P - F / 2, p = P + F / 2;
      return J`<line
        class="tick ${u}"
        x1=${n + l * Math.sin(h)}
        y1=${n - l * Math.cos(h)}
        x2=${n + p * Math.sin(h)}
        y2=${n - p * Math.cos(h)}
      ></line>`;
    }, c = t.eta ? Tt(t, "approx") : null;
    return g`<div class="ring-box">
        <svg
          class="ring"
          viewBox="0 0 ${y} ${y}"
          width=${y}
          height=${y}
          role="img"
          aria-label=${Pt(t)}
        >
          ${J`<defs>
              <linearGradient id=${this.gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop class="stop-tone" offset="0"></stop>
                <stop class="stop-light" offset="1"></stop>
              </linearGradient>
            </defs>
            <circle class="track" cx=${n} cy=${n} r=${P}></circle>
            ${s > 0 ? J`<circle
                    class="fill"
                    cx=${n}
                    cy=${n}
                    r=${P}
                    stroke=${`url(#${this.gradientId})`}
                    stroke-dasharray=${`${s} ${i}`}
                    transform=${`rotate(-90 ${n} ${n})`}
                  ></circle>` : d}
            ${r.map((a) => o(a.at, a.kind))}`}
        </svg>
        <div class="centre" aria-hidden="true">
          <div class="soc">${W(t.soc, t.locale)}</div>
          <div class="word"><span class="dot"></span>${t.word}</div>
        </div>
      </div>
      ${t.eta ? g`<div class="time">${t.eta.duration}</div>` : g`<div class="time status-big">${t.status}</div>`}
      ${c ? g`<div class="sub">${c}</div>` : d} ${this.pill(t)}`;
  }
  bar(t) {
    const i = t.soc === null ? 0 : I(t.soc), s = [];
    t.dischargeTo !== null && s.push({ at: t.dischargeTo, kind: "discharge" }), t.chargeTo !== null && s.push({ at: t.chargeTo, kind: "charge" });
    const r = (n) => `left: calc(3px + (100% - 6px) * ${I(n) / 100})`;
    return g`<div class="top">
        <span class="time">${t.eta ? t.eta.duration : t.word}</span>${this.pill(t)}
      </div>
      <div class="status">${t.status}</div>
      <div class="battery" role="img" aria-label=${Pt(t)}>
        <div class="level" style="width: calc((100% - 6px) * ${i / 100})"></div>
        ${s.map((n) => g`<div class="mark ${n.kind}" style=${r(n.at)}></div>`)}
        <div class="level-text">${W(t.soc, t.locale)}</div>
      </div>
      <div class="scale" aria-hidden="true">
        ${s.map(
      (n) => g`<span class="${n.kind}" style=${r(n.at)}>${ze(n.at, t.locale)}</span>`
    )}
      </div>`;
  }
  tile(t) {
    const i = t.soc === null ? 0 : I(t.soc), s = Tt(t, "at"), r = Ct(t), n = r ? g`${r.icon ? g`<ha-icon class="arrow" .icon=${r.icon}></ha-icon>` : d}${r.text}` : d;
    return g`<div class="row">
        <div class="icon">
          <ha-icon .icon=${He(t.soc, t.tone === "charge")}></ha-icon>
        </div>
        <div class="lines">
          <div class="primary">${Le(t)}</div>
          <div class="secondary">${s ?? d}${s && r ? " · " : d}${n}</div>
        </div>
      </div>
      <div class="thin" aria-hidden="true">
        <i style="width: ${i}%"></i>
        ${t.chargeTo !== null ? g`<b style="left: ${I(t.chargeTo)}%"></b>` : d}
      </div>`;
  }
};
dt.styles = Dt`
    :host {
      display: block;
      height: 100%;
    }
    ha-card {
      height: 100%;
      box-sizing: border-box;
      --tone: var(--secondary-text-color);
    }
    .tone-charge {
      --tone: var(--success-color);
    }
    .tone-discharge {
      --tone: var(--warning-color);
    }
    .tone-low {
      --tone: var(--error-color);
    }
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      padding: 16px;
      color: var(--primary-text-color);
      container-type: inline-size;
    }
    .note {
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    /* The bar's and the tile's height budgets hold one line of note. */
    .bar .note,
    .tile .note {
      -webkit-line-clamp: 1;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 28px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 14px;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 15%, transparent);
      color: var(--primary-text-color);
      font-size: 14px;
      white-space: nowrap;
    }
    .pill ha-icon {
      --mdc-icon-size: 16px;
      color: var(--tone);
    }

    /* ring */
    .ring .body {
      align-items: center;
      text-align: center;
    }
    .ring-box {
      position: relative;
      width: ${y}px;
      height: ${y}px;
      margin-bottom: 8px;
    }
    svg.ring {
      display: block;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: ${F};
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke-linecap: round;
    }
    .stop-tone {
      stop-color: var(--tone);
    }
    .stop-light {
      stop-color: var(--tone);
      stop-color: color-mix(in srgb, var(--tone), white 40%);
    }
    .tick {
      stroke: var(--primary-text-color);
      stroke-width: 2.5;
    }
    .tick.discharge {
      opacity: 0.5;
    }
    .centre {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .soc {
      font-size: 34px;
      font-weight: 500;
      line-height: 1;
    }
    .word {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
      max-width: 100px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 14px;
      white-space: nowrap;
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--tone);
    }
    .ring .time {
      font-size: 26px;
      font-weight: 500;
      line-height: 30px;
    }
    .ring .time.status-big {
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      padding: 5px 0;
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
    }
    .ring .pill {
      margin-top: 8px;
    }

    /* bar */
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 32px;
    }
    .bar .time {
      min-width: 0;
      font-size: 28px;
      font-weight: 500;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar .pill {
      flex: none;
    }
    /* Half a section (6 of 12 columns) is about 245 px: the time and the
       pill share one 32 px row there. */
    @container (max-width: 260px) {
      .bar .time {
        font-size: 20px;
      }
      .bar .pill {
        padding: 0 8px;
      }
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .battery {
      position: relative;
      height: 40px;
      box-sizing: border-box;
      margin: 12px 10px 0 0;
      border: 2px solid var(--secondary-text-color);
      border-color: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
      border-radius: 10px;
    }
    .battery::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 10px;
      width: 6px;
      height: 16px;
      border-radius: 0 3px 3px 0;
      background: var(--secondary-text-color);
      background: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
    }
    .level {
      position: absolute;
      left: 3px;
      top: 3px;
      bottom: 3px;
      border-radius: 6px;
      background: var(--tone);
      background: linear-gradient(90deg, var(--tone), color-mix(in srgb, var(--tone), white 40%));
    }
    .mark {
      position: absolute;
      top: -6px;
      bottom: -6px;
      width: 2px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .mark.discharge,
    .scale .discharge {
      opacity: 0.5;
    }
    .level-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      text-shadow: 0 0 3px var(--card-background-color, transparent);
    }
    .scale {
      position: relative;
      height: 16px;
      margin-right: 10px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 16px;
    }
    .scale span {
      position: absolute;
      top: 2px;
      transform: translateX(-50%);
    }

    /* tile */
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }
    .icon ha-icon {
      --mdc-icon-size: 24px;
      color: var(--tone);
    }
    .lines {
      min-width: 0;
    }
    .primary,
    .secondary {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .primary {
      font-size: 16px;
      font-weight: 500;
    }
    .secondary {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
    .secondary .arrow {
      --mdc-icon-size: 14px;
      color: var(--tone);
      vertical-align: -1px;
      margin-right: 2px;
    }
    .thin {
      position: relative;
      height: 6px;
      margin-top: 8px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .thin i {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 3px;
      background: var(--tone);
    }
    .thin b {
      position: absolute;
      top: -3px;
      width: 2px;
      height: 12px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
  `;
let et = dt;
const ut = class ut extends S {
  constructor() {
    super(...arguments), this.config = {};
  }
  setConfig(t) {
    this.config = t;
  }
  render() {
    const t = ht(), i = {
      layout: [t.editor.layout, void 0],
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, s = {
      layout: Wt(this.config.layout),
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return g`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${Fe(t)}
        .computeLabel=${(r) => i[r.name][0]}
        .computeHelper=${(r) => i[r.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const i = Ge(this.config, t.detail.value);
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 })
    );
  }
};
ut.styles = Dt`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
let O = ut;
te([
  jt()
], O.prototype, "config");
te([
  jt()
], O.prototype, "hass");
customElements.get(G) || customElements.define(G, et);
customElements.get(tt) || customElements.define(tt, O);
const Ht = window.customCards ??= [];
if (!Ht.some((e) => e.type === G)) {
  const e = ht();
  Ht.push({ type: G, name: e.name, description: e.description, preview: !0 });
}

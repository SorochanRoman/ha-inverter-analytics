/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, it = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (it && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = gt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && gt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (e) => new Nt(typeof e == "string" ? e : e + "", void 0, rt), Ut = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, s, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[n + 1], e[0]);
  return new Nt(i, e, rt);
}, ce = (e, t) => {
  if (it) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), s = z.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, e.appendChild(r);
  }
}, ft = it ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
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
} }, st = (e, t) => !le(e, t), $t = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: st };
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
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, i);
      s !== void 0 && he(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: s, set: n } = de(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const c = s?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, r);
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
      const i = this.properties, r = [...ue(i), ...pe(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, s] of i) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const s = this._$Eu(i, r);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) i.unshift(ft(s));
    } else t !== void 0 && i.push(ft(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
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
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : j).toAttribute(i, r.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = r.getPropertyOptions(s), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : j;
      this._$Em = s;
      const c = o.fromAttribute(i, n.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, s = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (n = this[t]), r ??= o.getPropertyOptions(t), !((r.hasChanged ?? st)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: s, wrapped: n }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: o } = n, c = this[s];
        o !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, n, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
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
const nt = globalThis, yt = (e) => e, B = nt.trustedTypes, _t = B ? B.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ht = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + _, $e = `<${Ot}>`, w = document, N = () => w.createComment(""), U = (e) => e === null || typeof e != "object" && typeof e != "function", ot = Array.isArray, ye = (e) => ot(e) || typeof e?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, vt = />/g, b = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, wt = /"/g, Dt = /^(?:script|style|textarea|title)$/i, Rt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), f = Rt(1), J = Rt(2), S = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function It(e, t) {
  if (!ot(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const _e = (e, t) => {
  const i = e.length - 1, r = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let u, d, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, d = o.exec(a), d !== null); ) p = o.lastIndex, o === C ? d[1] === "!--" ? o = bt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Dt.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = b) : d[3] !== void 0 && (o = b) : o === b ? d[0] === ">" ? (o = s ?? C, l = -1) : d[1] === void 0 ? l = -2 : (l = o.lastIndex - d[2].length, u = d[1], o = d[3] === void 0 ? b : d[3] === '"' ? wt : xt) : o === wt || o === xt ? o = b : o === bt || o === vt ? o = C : (o = b, s = void 0);
    const m = o === b && e[c + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + $e : l >= 0 ? (r.push(u), a.slice(0, l) + Ht + a.slice(l) + _ + m) : a + _ + (l === -2 ? c : m);
  }
  return [It(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class H {
  constructor({ strings: t, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [u, d] = _e(t, i);
    if (this.el = H.createElement(u, r), v.currentNode = this.el.content, i === 2 || i === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = v.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(Ht)) {
          const p = d[o++], m = s.getAttribute(l).split(_), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: g[2], strings: m, ctor: g[1] === "." ? ve : g[1] === "?" ? xe : g[1] === "@" ? we : K }), s.removeAttribute(l);
        } else l.startsWith(_) && (a.push({ type: 6, index: n }), s.removeAttribute(l));
        if (Dt.test(s.tagName)) {
          const l = s.textContent.split(_), p = l.length - 1;
          if (p > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let m = 0; m < p; m++) s.append(l[m], N()), v.nextNode(), a.push({ type: 2, index: ++n });
            s.append(l[p], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ot) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(_, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const r = w.createElement("template");
    return r.innerHTML = t, r;
  }
}
function T(e, t, i = e, r) {
  if (t === S) return t;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(e), s._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (t = T(e, s._$AS(e, t.values), s, r)), t;
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
    const { el: { content: i }, parts: r } = this._$AD, s = (t?.creationScope ?? w).importNode(i, !0);
    v.currentNode = s;
    let n = v.nextNode(), o = 0, c = 0, a = r[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new D(n, n.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (u = new Ae(n, this, t)), this._$AV.push(u), a = r[++c];
      }
      o !== a?.index && (n = v.nextNode(), o++);
    }
    return v.currentNode = w, s;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class D {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = T(this, t, i), U(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ye(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = H.createElement(It(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const n = new be(s, this), o = n.u(this.options);
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
    let r, s = 0;
    for (const n of t) s === i.length ? i.push(r = new D(this.O(N()), this.O(N()), this, this.options)) : r = i[s], r._$AI(n), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = yt(t).nextSibling;
      yt(t).remove(), t = r;
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
  constructor(t, i, r, s, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(t, i = this, r, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, i, 0), o = !U(t) || t !== this._$AH && t !== S, o && (this._$AH = t);
    else {
      const c = t;
      let a, u;
      for (t = n[0], a = 0; a < n.length - 1; a++) u = T(this, c[r + a], i, a), u === S && (u = this._$AH[a]), o ||= !U(u) || u !== this._$AH[a], u === h ? t = h : t !== h && (t += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ve extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class xe extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class we extends K {
  constructor(t, i, r, s, n) {
    super(t, i, r, s, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = T(this, t, i, 0) ?? h) === S) return;
    const r = this._$AH, s = t === h && r !== h || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== h && (r === h || s);
    s && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ae {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
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
const ke = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = s = new D(t.insertBefore(N(), n), n, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis;
class k extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ke(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
}
k._$litElement$ = !0, k.finalized = !0, at.litElementHydrateSupport?.({ LitElement: k });
const Se = at.litElementPolyfillSupport;
Se?.({ LitElement: k });
(at.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: st }, Ce = (e = Te, t, i) => {
  const { kind: r, metadata: s } = i;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), r === "accessor") {
    const { name: o } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: o } = i;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Pe(e) {
  return (t, i) => typeof i == "object" ? Ce(e, t, i) : ((r, s, n) => {
    const o = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function zt(e) {
  return Pe({ ...e, state: !0, attribute: !1 });
}
const $ = "—", Lt = ["ring", "bar", "tile"];
function Ft(e) {
  return Lt.includes(e) ? e : "ring";
}
function Me(e, t, i, r) {
  const s = new Intl.NumberFormat(i, { maximumFractionDigits: 0 }), n = Math.max(1, Math.round(e));
  if (n < 60)
    return {
      duration: r.minutes({ m: s.format(n) }),
      arrival: new Date(t.getTime() + n * 6e4),
      over2Days: !1
    };
  const o = Math.round(e / 5) * 5;
  if (o >= 48 * 60) return { duration: r.over2Days, arrival: null, over2Days: !0 };
  const c = Math.floor(o / 60), a = o % 60;
  return { duration: a === 0 ? r.hours({ h: s.format(c) }) : r.hoursMinutes({ h: s.format(c), m: s.format(a) }), arrival: new Date(t.getTime() + o * 6e4), over2Days: !1 };
}
function Y(e, t) {
  return new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(e);
}
function Ne(e, t, i) {
  return e.arrival === null ? e.duration : `${e.duration} ${i.arrival({ time: Y(e.arrival, t) })}`;
}
function x(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e);
}
function Ue(e, t) {
  const i = e.map((r) => t.roles[r] ?? r);
  return i.length <= 1 ? i.join("") : `${i.slice(0, -1).join(", ")} ${t.and} ${i[i.length - 1]}`;
}
function Et(e) {
  const { state: t, m: i, locale: r } = e;
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
        status: i.atLimit({ t: x(t.target, r) }),
        note: null
      };
    case "at_floor":
      return {
        word: i.words.atFloor,
        status: i.atFloor({ t: x(t.target, r) }),
        note: null
      };
    case "idle":
      return { word: i.words.idle, status: i.idle, note: null };
    case "no_capacity": {
      const s = t.direction === "charging", n = s ? i.chargingTo : i.dischargingTo, o = t.reason === "missing_roles" ? i.capacityNeedsRoles({ roles: Ue(t.missing_roles, i) }) : i.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
      return {
        word: s ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: x(e.target ?? 0, r) }), eta: $ }),
        note: o
      };
    }
    case "charging":
    case "discharging": {
      const s = t.kind === "charging", n = s ? i.chargingTo : i.dischargingTo, o = e.eta ? Ne(e.eta, r, i) : $;
      return {
        word: s ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: x(t.target, r) }), eta: o }),
        note: null
      };
    }
  }
}
function jt(e) {
  return e.kind === "charging" || e.kind === "discharging" ? e.kind : e.kind === "no_capacity" ? e.direction : null;
}
function He(e) {
  if (e.kind === "at_floor") return "low";
  const t = jt(e);
  return t === "charging" ? "charge" : t === "discharging" ? "discharge" : "rest";
}
function Oe(e, t) {
  if (e === null) return "mdi:battery-unknown";
  const i = t ? "mdi:battery-charging" : "mdi:battery";
  return e < 5 ? `${i}-outline` : e >= 95 ? t ? `${i}-100` : i : `${i}-${Math.round(e / 10) * 10}`;
}
function Bt(e, t, i) {
  return e === null || Number.isNaN(e) ? $ : Math.abs(Math.round(e)) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${i.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${i.units.w}`;
}
function W(e, t) {
  return e === null ? $ : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)}%`;
}
function De(e, t) {
  const { m: i, locale: r, eta: s } = e, n = W(e.soc, r), o = s ? s.duration : e.word;
  switch (t) {
    case "full":
      return { primary: `${n} · ${o}` };
    case "ring":
      return { primary: e.target === null ? n : `${n} · ${i.toTarget({ t: x(e.target, r) })}`, secondary: o };
    case "time":
      return s?.arrival ? { primary: i.approx({ time: Y(s.arrival, r) }) } : s?.over2Days ? { primary: i.over2Days } : { primary: e.word };
  }
}
const Wt = {
  ring: { rows: 5, columns: 6, min_rows: 5, size: 6 },
  bar: { rows: 3, columns: 6, min_rows: 3, size: 3 },
  tile: { rows: 2, columns: 6, min_rows: 2, size: 2 }
};
function Re(e) {
  const { rows: t, columns: i, min_rows: r } = Wt[e];
  return { rows: t, columns: i, min_rows: r };
}
function Ie(e) {
  return Wt[e].size;
}
function kt(e) {
  return Math.min(100, Math.max(0, e));
}
function ze(e, t, i, r) {
  const s = 2 * Math.PI * r, n = [], o = (a) => kt(a) * 360 / 100;
  t !== null && n.push({ at: o(t), kind: "charge" }), i !== null && n.push({ at: o(i), kind: "discharge" });
  const c = e === null ? 0 : s * kt(e) / 100;
  return { circumference: s, fillDash: c, ticks: n };
}
function Le(e, t) {
  return `${x(e, t)}%`;
}
function qt(e) {
  const { m: t, locale: i } = e;
  if (e.target === null) return null;
  const r = t.toTarget({ t: x(e.target, i) }), s = e.eta?.arrival;
  return s ? `${r} · ${t.approx({ time: Y(s, i) })}` : r;
}
function Fe(e) {
  return (e.eta ? qt(e) : null) ?? e.status;
}
function Gt(e) {
  const { powerW: t } = e;
  if (e.state.kind === "loading" || t === null || Number.isNaN(t)) return null;
  const i = jt(e.state);
  return { icon: i === "charging" ? "mdi:arrow-up" : i === "discharging" ? "mdi:arrow-down" : null, text: Bt(Math.abs(t), e.locale, e.m) };
}
function je(e) {
  const t = e.eta?.arrival, i = Gt(e);
  return {
    text: t ? e.m.approx({ time: Y(t, e.locale) }) : null,
    icon: i?.icon ?? null,
    power: i?.text ?? null
  };
}
function Be(e) {
  const t = e.state.kind;
  return t === "unmapped" || t === "unavailable" || t === "loading" ? `${$} · ${$}` : De(e, "full").primary;
}
function St(e) {
  const { m: t, locale: i } = e;
  return t.sentence({
    soc: W(e.soc, i),
    status: e.status,
    power: Bt(e.powerW, i, t)
  });
}
function We(e) {
  return [
    {
      name: "layout",
      selector: {
        select: {
          mode: "dropdown",
          options: Lt.map((t) => ({ value: t, label: e.layouts[t] }))
        }
      }
    },
    { name: "entry_id", selector: { text: {} } },
    { name: "charge_to", selector: { text: {} } },
    { name: "discharge_to", selector: { text: {} } }
  ];
}
const Vt = 12e4;
function qe(e, t, i = Vt) {
  if (e.length === 0) return null;
  const r = t - i;
  let s = 0, n = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, r), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (s += e[o].w * (a - c), n += a - c);
  }
  return n === 0 ? e[e.length - 1].w : s / n;
}
function Ge(e, t, i = Vt) {
  const r = t - i;
  let s = 0;
  for (; s + 1 < e.length && e[s + 1].t <= r; ) s++;
  return e.slice(s);
}
function Tt(e, t, i) {
  if (e === void 0 || e === "") return { value: i, unavailable: null };
  if (typeof e == "number") return { value: e, unavailable: null };
  const r = Number(e);
  if (e.trim() !== "" && Number.isFinite(r)) return { value: r, unavailable: null };
  const s = L(t[e]?.state);
  return s === null ? { value: null, unavailable: e } : { value: s, unavailable: null };
}
function L(e) {
  if (e === void 0 || e === "unavailable" || e === "unknown" || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ve(e) {
  const { soc: t, powerW: i, chargeTo: r, dischargeTo: s, basis: n } = e;
  if (!e.mapped) return { kind: "unmapped" };
  if (e.unavailable !== null) return { kind: "unavailable", entity: e.unavailable };
  if (t === null || i === null || r === null || s === null)
    return { kind: "unavailable", entity: "" };
  const o = n.idle_w;
  if (t >= r && i > -o) return { kind: "at_limit", target: r };
  if (t <= s && i < o) return { kind: "at_floor", target: s };
  if (Math.abs(i) < o) return { kind: "idle" };
  const c = i > 0;
  if (e.capacityKwh === null)
    return {
      kind: "no_capacity",
      direction: c ? "charging" : "discharging",
      reason: n.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: n.clean_hours,
      clean_hours_min: n.clean_hours_min,
      missing_roles: n.missing_roles
    };
  const a = c ? r : s, u = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(i) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: u * 60 };
}
function Ke(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const i = Number(t);
  return Number.isFinite(i) ? i : t;
}
function Ye(e, t) {
  const i = { ...e };
  for (const r of ["entry_id", "charge_to", "discharge_to", "layout", "style"]) {
    const s = Ke(t[r]);
    s === void 0 ? delete i[r] : r === "charge_to" || r === "discharge_to" ? i[r] = s : i[r] = String(s);
  }
  return i;
}
function Ct(e) {
  return typeof e == "string" && e.trim() !== "" && !Number.isFinite(Number(e));
}
function Ze(e, t) {
  const i = [];
  return e?.soc_entity && i.push(e.soc_entity), e?.battery_power_entity && i.push(e.battery_power_entity), Ct(t.charge_to) && i.push(t.charge_to), Ct(t.discharge_to) && i.push(t.discharge_to), i;
}
function Je(e, t) {
  return !e || e.length !== t.length ? !0 : t.some((i, r) => i !== e[r]);
}
const Kt = 36e5;
function Xe(e, t) {
  return e === void 0 || t - e > Kt;
}
const Qe = {
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
    // Short: it shares the bar's top row with the power and the tile's first line with the SoC.
    atFloor: "floor"
  },
  // "to 85%" beside the time; "≈16:40" in the ring, the bar, the tile and the badge.
  toTarget: (e) => `to ${e.t}%`,
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
}, Pt = /* @__PURE__ */ new Map();
function ti(e) {
  let t = Pt.get(e);
  return t || (t = new Intl.PluralRules(e), Pt.set(e, t)), t;
}
function ei(e, t, i) {
  const r = ti(e).select(t);
  return r === "one" ? i.one : r === "few" ? i.few ?? i.other : r === "many" ? i.many ?? i.other : i.other;
}
const ii = {
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
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + ei("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
  capacityNeedsRoles: (e) => `Для ємності вкажіть ${e.roles}`,
  and: "і",
  // Without "батареї": the card is about the battery, and the note has two
  // lines in the bar and the tile.
  roles: {
    battery_soc: "рівень заряду",
    battery_charge_total: "лічильник заряду",
    battery_discharge_total: "лічильник розряду"
  },
  units: { w: "Вт", kw: "кВт" },
  words: {
    charging: "заряд",
    discharging: "розряд",
    idle: "простій",
    atLimit: "на ліміті",
    atFloor: "мінімум"
  },
  toTarget: (e) => `до ${e.t}%`,
  approx: (e) => `≈${e.time}`,
  sentence: (e) => `Заряд батареї ${e.soc}. ${e.status}. Потужність батареї ${e.power}.`,
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
function ct(e) {
  return e === "en" || e === "uk";
}
function Zt(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function ri(e, t) {
  return ct(e) ? e : Zt(t) ? "uk" : "en";
}
function si(e, t) {
  return e === "uk" ? "uk" : !t || Zt(t) ? "en" : t;
}
let E, q;
const X = /* @__PURE__ */ new Set();
function ni() {
  if (E === void 0)
    try {
      const e = globalThis.localStorage?.getItem(Yt) ?? null;
      E = ct(e) ? e : null;
    } catch {
      E = null;
    }
  return E;
}
function Jt() {
  for (const e of X) e();
}
function Xt() {
  return ri(ni(), q);
}
function Q() {
  return si(Xt(), q);
}
const oi = "inverter-analytics-lang";
function Qt(e) {
  !ct(e) || e === E || (E = e, Jt());
}
globalThis.window?.addEventListener(oi, (e) => {
  Qt(e.detail);
});
globalThis.window?.addEventListener("storage", (e) => {
  const { key: t, newValue: i } = e;
  t === Yt && Qt(i);
});
function ai(e) {
  if (e === q) return;
  const t = Q();
  q = e, Q() !== t && Jt();
}
function ci(e) {
  return X.add(e), () => X.delete(e);
}
function lt() {
  return Xt() === "uk" ? ii : Qe;
}
const li = 2e4, hi = 100;
function di(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
class ui {
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
    }, r = i.entry_id !== this.config.entry_id;
    this.config = i, this.watched = void 0, r && this._hass && this.fetchedFor !== void 0 && (this.samples = [], this.lastPower = void 0, this.basis = void 0, this.fetchBasis()), this.host.requestUpdate();
  }
  setHass(t) {
    this._hass = t, ai(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.host.isConnected && this.startTimers();
    const i = Ze(this.basis, this.config).map((r) => t.states[r]);
    Je(this.watched, i) && (this.watched = i, this.host.requestUpdate());
  }
  hostConnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = ci(() => this.host.requestUpdate()), this._hass && (this.startTimers(), this.fetchedFor !== void 0 && Xe(this.fetchedAt, Date.now()) && this.fetchBasis());
  }
  hostDisconnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = void 0, this.timer !== void 0 && clearInterval(this.timer), this.tick !== void 0 && clearInterval(this.tick), this.timer = void 0, this.tick = void 0;
  }
  hostUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  startTimers() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), Kt)), this.tick === void 0 && (this.tick = setInterval(() => this.host.requestUpdate(), li));
  }
  async fetchBasis() {
    const t = this._hass;
    if (!t) return;
    const i = this.config.entry_id;
    this.fetchedFor = i ?? "";
    const r = { type: "inverter_analytics/battery_eta" };
    i && (r.entry_id = i);
    let s, n;
    try {
      s = await t.callWS(r);
    } catch (o) {
      n = di(o);
    }
    this.config.entry_id === i && (this.basis = s, this.basisError = n, this.fetchedAt = Date.now(), this.watched = void 0, this.host.requestUpdate());
  }
  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  notePower(t) {
    const i = this.basis?.battery_power_entity;
    if (!i) return;
    const r = t.states[i];
    if (r === this.lastPower) return;
    this.lastPower = r;
    const s = Date.now(), n = L(r?.state);
    if (n === null) {
      this.samples = [];
      return;
    }
    const o = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = Ge([...this.samples, { t: s, w: n * o }], s);
  }
  /** Everything a face shows, resolved and worded; loading until hass and basis. */
  view() {
    const t = lt(), i = Q(), r = this._hass, s = this.basis;
    if (!r || !s) {
      const pt = { kind: "loading" }, { word: se, status: ne, note: oe } = Et({
        state: pt,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m: t,
        locale: i
      });
      return {
        state: pt,
        soc: null,
        powerW: null,
        chargeTo: null,
        dischargeTo: null,
        target: null,
        eta: null,
        tone: "rest",
        word: se,
        status: ne,
        note: oe,
        m: t,
        locale: i
      };
    }
    const n = s.soc_entity, o = s.battery_power_entity, c = !!(n && o), a = n ? L(r.states[n]?.state) : null, d = (o ? L(r.states[o]?.state) : null) === null ? null : qe(this.samples, Date.now()), l = Tt(this.config.charge_to, r.states, hi), p = Tt(this.config.discharge_to, r.states, s.low_pct);
    let m = null;
    c && (a === null ? m = n : d === null ? m = o : m = l.unavailable ?? p.unavailable);
    const g = Ve({
      soc: a,
      powerW: d,
      chargeTo: l.value,
      dischargeTo: p.value,
      unavailable: m,
      mapped: c,
      capacityKwh: s.capacity_kwh,
      basis: s
    });
    let R = null;
    g.kind === "charging" || g.kind === "discharging" ? R = g.target : g.kind === "no_capacity" && (R = g.direction === "charging" ? l.value : p.value);
    const ut = g.kind === "charging" || g.kind === "discharging" ? Me(g.minutes, /* @__PURE__ */ new Date(), i, t) : null, { word: ee, status: ie, note: re } = Et({
      state: g,
      target: R,
      eta: ut,
      basisError: this.basisError ?? null,
      m: t,
      locale: i
    });
    return {
      state: g,
      soc: a,
      powerW: d,
      chargeTo: l.value,
      dischargeTo: p.value,
      target: R,
      eta: ut,
      tone: He(g),
      word: ee,
      status: ie,
      note: re,
      m: t,
      locale: i
    };
  }
}
var pi = Object.defineProperty, te = (e, t, i, r) => {
  for (var s = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = o(t, i, s) || s);
  return s && pi(t, i, s), s;
};
const G = "inverter-analytics-battery-time", tt = "inverter-analytics-battery-time-editor", y = 120, F = 10, P = (y - F) / 2;
let gi = 0;
function I(e) {
  return Math.min(100, Math.max(0, e));
}
const ht = class ht extends k {
  constructor() {
    super(...arguments), this.battery = new ui(this), this.layout = "ring", this.gradientId = `ia-battery-fill-${++gi}`;
  }
  static getConfigElement() {
    return document.createElement(tt);
  }
  static getStubConfig() {
    return { charge_to: 100 };
  }
  setConfig(t) {
    this.layout = Ft(t.layout), this.battery.setConfig(t);
  }
  /** The height in the masonry view, in 50 px units. */
  getCardSize() {
    return Ie(this.layout);
  }
  /** The size in the sections view. */
  getGridOptions() {
    return Re(this.layout);
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
    return f`<ha-card class="tone-${t.tone} ${this.layout}">
      <div class="body">${i}${this.note(t)}</div>
    </ha-card>`;
  }
  note(t) {
    return t.note ? f`<div class="note" title=${t.note}>${t.note}</div>` : h;
  }
  pill(t) {
    const i = Gt(t);
    return i ? f`<span class="pill">
      ${i.icon ? f`<ha-icon .icon=${i.icon}></ha-icon>` : h}${i.text}
    </span>` : h;
  }
  ring(t) {
    const { circumference: i, fillDash: r, ticks: s } = ze(
      t.soc,
      t.chargeTo,
      t.dischargeTo,
      P
    ), n = y / 2, o = (a, u) => {
      const d = a * Math.PI / 180, l = P - F / 2, p = P + F / 2;
      return J`<line
        class="tick ${u}"
        x1=${n + l * Math.sin(d)}
        y1=${n - l * Math.cos(d)}
        x2=${n + p * Math.sin(d)}
        y2=${n - p * Math.cos(d)}
      ></line>`;
    }, c = t.eta ? qt(t) : null;
    return f`<div class="ring-box">
        <svg
          class="ring"
          viewBox="0 0 ${y} ${y}"
          width=${y}
          height=${y}
          role="img"
          aria-label=${St(t)}
        >
          ${J`<defs>
              <linearGradient id=${this.gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop class="stop-tone" offset="0"></stop>
                <stop class="stop-light" offset="1"></stop>
              </linearGradient>
            </defs>
            <circle class="track" cx=${n} cy=${n} r=${P}></circle>
            ${r > 0 ? J`<circle
                    class="fill"
                    cx=${n}
                    cy=${n}
                    r=${P}
                    stroke=${`url(#${this.gradientId})`}
                    stroke-dasharray=${`${r} ${i}`}
                    transform=${`rotate(-90 ${n} ${n})`}
                  ></circle>` : h}
            ${s.map((a) => o(a.at, a.kind))}`}
        </svg>
        <div class="centre" aria-hidden="true">
          <div class="soc">${W(t.soc, t.locale)}</div>
          <div class="word"><span class="dot"></span>${t.word}</div>
        </div>
      </div>
      ${t.eta ? f`<div class="time">${t.eta.duration}</div>` : f`<div class="time status-big">${t.status}</div>`}
      ${c ? f`<div class="sub">${c}</div>` : h} ${this.pill(t)}`;
  }
  bar(t) {
    const i = t.soc === null ? 0 : I(t.soc), r = [];
    t.dischargeTo !== null && r.push({ at: t.dischargeTo, kind: "discharge" }), t.chargeTo !== null && r.push({ at: t.chargeTo, kind: "charge" });
    const s = (n) => `left: calc(3px + (100% - 6px) * ${I(n) / 100})`;
    return f`<div class="top">
        <span class="time">${t.eta ? t.eta.duration : t.word}</span>${this.pill(t)}
      </div>
      <div class="status">${Fe(t)}</div>
      <div class="battery" role="img" aria-label=${St(t)}>
        <div class="level" style="width: calc((100% - 6px) * ${i / 100})"></div>
        ${r.map((n) => f`<div class="mark ${n.kind}" style=${s(n.at)}></div>`)}
        <div class="level-text">${W(t.soc, t.locale)}</div>
      </div>
      <div class="scale" aria-hidden="true">
        ${r.map(
      (n) => f`<span class="${n.kind}" style=${s(n.at)}>${Le(n.at, t.locale)}</span>`
    )}
      </div>`;
  }
  tile(t) {
    const i = t.soc === null ? 0 : I(t.soc), r = je(t), s = r.power ? f`${r.icon ? f`<ha-icon class="arrow" .icon=${r.icon}></ha-icon>` : h}${r.power}` : h;
    return f`<div class="row">
        <div class="icon">
          <ha-icon .icon=${Oe(t.soc, t.tone === "charge")}></ha-icon>
        </div>
        <div class="lines">
          <div class="primary">${Be(t)}</div>
          <div class="secondary">
            ${r.text ?? h}${r.text && r.power ? " · " : h}${s}
          </div>
        </div>
      </div>
      <div class="thin" aria-hidden="true">
        <i style="width: ${i}%"></i>
        ${t.chargeTo !== null ? f`<b style="left: ${I(t.chargeTo)}%"></b>` : h}
      </div>`;
  }
};
ht.styles = Ut`
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
    /* The ring has room for a third line of note. */
    .ring .note {
      -webkit-line-clamp: 3;
    }
    /* The bar's and the tile's height budgets hold two smaller lines of
       note: 4 + 2 × 14 px fits what each has left inside ha-card's border. */
    .bar .note,
    .tile .note {
      font-size: 12px;
      line-height: 14px;
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
        gap: 2px;
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
      margin: 10px 10px 0 0;
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
let et = ht;
const dt = class dt extends k {
  constructor() {
    super(...arguments), this.config = {};
  }
  setConfig(t) {
    this.config = t;
  }
  render() {
    const t = lt(), i = {
      layout: [t.editor.layout, void 0],
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, r = {
      layout: Ft(this.config.layout),
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return f`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${We(t)}
        .computeLabel=${(s) => i[s.name][0]}
        .computeHelper=${(s) => i[s.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const i = Ye(this.config, t.detail.value);
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 })
    );
  }
};
dt.styles = Ut`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
let O = dt;
te([
  zt()
], O.prototype, "config");
te([
  zt()
], O.prototype, "hass");
customElements.get(G) || customElements.define(G, et);
customElements.get(tt) || customElements.define(tt, O);
const Mt = window.customCards ??= [];
if (!Mt.some((e) => e.type === G)) {
  const e = lt();
  Mt.push({ type: G, name: e.name, description: e.description, preview: !0 });
}

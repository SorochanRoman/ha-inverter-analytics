/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ho = globalThis, tf = Ho.ShadowRoot && (Ho.ShadyCSS === void 0 || Ho.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ef = Symbol(), yc = /* @__PURE__ */ new WeakMap();
let Ig = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ef) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tf && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = yc.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && yc.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const g_ = (r) => new Ig(typeof r == "string" ? r : r + "", void 0, ef), Xe = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new Ig(e, r, ef);
}, y_ = (r, t) => {
  if (tf) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = Ho.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, mc = tf ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return g_(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: m_, defineProperty: __, getOwnPropertyDescriptor: b_, getOwnPropertyNames: S_, getOwnPropertySymbols: w_, getPrototypeOf: x_ } = Object, Bs = globalThis, _c = Bs.trustedTypes, T_ = _c ? _c.emptyScript : "", C_ = Bs.reactiveElementPolyfillSupport, la = (r, t) => r, os = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? T_ : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, rf = (r, t) => !m_(r, t), bc = { attribute: !0, type: String, converter: os, reflect: !1, useDefault: !1, hasChanged: rf };
Symbol.metadata ??= Symbol("metadata"), Bs.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Zi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = bc) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && __(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = b_(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const s = n?.call(this);
      a?.call(this, o), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? bc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(la("elementProperties"))) return;
    const t = x_(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(la("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(la("properties"))) {
      const e = this.properties, i = [...S_(e), ...w_(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(mc(n));
    } else t !== void 0 && e.push(mc(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return y_(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : os).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : os;
      this._$Em = n;
      const s = o.fromAttribute(e, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? rf)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: a }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: o } = a, s = this[n];
        o !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, a, s);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Zi.elementStyles = [], Zi.shadowRootOptions = { mode: "open" }, Zi[la("elementProperties")] = /* @__PURE__ */ new Map(), Zi[la("finalized")] = /* @__PURE__ */ new Map(), C_?.({ ReactiveElement: Zi }), (Bs.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nf = globalThis, Sc = (r) => r, ss = nf.trustedTypes, wc = ss ? ss.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Lg = "$lit$", Ir = `lit$${Math.random().toFixed(9).slice(2)}$`, Pg = "?" + Ir, M_ = `<${Pg}>`, Si = document, wa = () => Si.createComment(""), xa = (r) => r === null || typeof r != "object" && typeof r != "function", af = Array.isArray, D_ = (r) => af(r) || typeof r?.[Symbol.iterator] == "function", wl = `[ 	
\f\r]`, En = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xc = /-->/g, Tc = />/g, Vr = RegExp(`>|${wl}(?:([^\\s"'>=/]+)(${wl}*=${wl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cc = /'/g, Mc = /"/g, Rg = /^(?:script|style|textarea|title)$/i, A_ = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), E = A_(1), pn = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), Dc = /* @__PURE__ */ new WeakMap(), vi = Si.createTreeWalker(Si, 129);
function Eg(r, t) {
  if (!af(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wc !== void 0 ? wc.createHTML(t) : t;
}
const I_ = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = En;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, h, f = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, h = o.exec(l), h !== null); ) v = o.lastIndex, o === En ? h[1] === "!--" ? o = xc : h[1] !== void 0 ? o = Tc : h[2] !== void 0 ? (Rg.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Vr) : h[3] !== void 0 && (o = Vr) : o === Vr ? h[0] === ">" ? (o = n ?? En, f = -1) : h[1] === void 0 ? f = -2 : (f = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Vr : h[3] === '"' ? Mc : Cc) : o === Mc || o === Cc ? o = Vr : o === xc || o === Tc ? o = En : (o = Vr, n = void 0);
    const c = o === Vr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === En ? l + M_ : f >= 0 ? (i.push(u), l.slice(0, f) + Lg + l.slice(f) + Ir + c) : l + Ir + (f === -2 ? s : c);
  }
  return [Eg(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ta {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = I_(t, e);
    if (this.el = Ta.createElement(u, i), vi.currentNode = this.el.content, e === 2 || e === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (n = vi.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const f of n.getAttributeNames()) if (f.endsWith(Lg)) {
          const v = h[o++], c = n.getAttribute(f).split(Ir), p = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: p[2], strings: c, ctor: p[1] === "." ? P_ : p[1] === "?" ? R_ : p[1] === "@" ? E_ : Ns }), n.removeAttribute(f);
        } else f.startsWith(Ir) && (l.push({ type: 6, index: a }), n.removeAttribute(f));
        if (Rg.test(n.tagName)) {
          const f = n.textContent.split(Ir), v = f.length - 1;
          if (v > 0) {
            n.textContent = ss ? ss.emptyScript : "";
            for (let c = 0; c < v; c++) n.append(f[c], wa()), vi.nextNode(), l.push({ type: 2, index: ++a });
            n.append(f[v], wa());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Pg) l.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = n.data.indexOf(Ir, f + 1)) !== -1; ) l.push({ type: 7, index: a }), f += Ir.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = Si.createElement("template");
    return i.innerHTML = t, i;
  }
}
function dn(r, t, e = r, i) {
  if (t === pn) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = xa(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = dn(r, n._$AS(r, t.values), n, i)), t;
}
class L_ {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? Si).importNode(e, !0);
    vi.currentNode = n;
    let a = vi.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new Ga(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new O_(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = vi.nextNode(), o++);
    }
    return vi.currentNode = Si, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Ga {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = dn(this, t, e), xa(t) ? t === F || t == null || t === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : t !== this._$AH && t !== pn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : D_(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== F && xa(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Si.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ta.createElement(Eg(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const a = new L_(n, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Dc.get(t.strings);
    return e === void 0 && Dc.set(t.strings, e = new Ta(t)), e;
  }
  k(t) {
    af(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new Ga(this.O(wa()), this.O(wa()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Sc(t).nextSibling;
      Sc(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ns {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = F;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = dn(this, t, e, 0), o = !xa(t) || t !== this._$AH && t !== pn, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = dn(this, s[i + l], e, l), u === pn && (u = this._$AH[l]), o ||= !xa(u) || u !== this._$AH[l], u === F ? t = F : t !== F && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class P_ extends Ns {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === F ? void 0 : t;
  }
}
class R_ extends Ns {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== F);
  }
}
class E_ extends Ns {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = dn(this, t, e, 0) ?? F) === pn) return;
    const i = this._$AH, n = t === F && i !== F || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== F && (i === F || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class O_ {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dn(this, t);
  }
}
const k_ = nf.litHtmlPolyfillSupport;
k_?.(Ta, Ga), (nf.litHtmlVersions ??= []).push("3.3.3");
const B_ = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = n = new Ga(t.insertBefore(wa(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const of = globalThis;
class ee extends Zi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B_(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return pn;
  }
}
ee._$litElement$ = !0, ee.finalized = !0, of.litElementHydrateSupport?.({ LitElement: ee });
const N_ = of.litElementPolyfillSupport;
N_?.({ LitElement: ee });
(of.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pr = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $_ = { attribute: !0, type: String, converter: os, reflect: !1, hasChanged: rf }, z_ = (r = $_, t, e) => {
  const { kind: i, metadata: n } = e;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(e.name, r), i === "accessor") {
    const { name: o } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(o, l, r, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, r, s), s;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(s) {
      const l = this[o];
      t.call(this, s), this.requestUpdate(o, l, r, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function pt(r) {
  return (t, e) => typeof e == "object" ? z_(r, t, e) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function It(r) {
  return pt({ ...r, state: !0, attribute: !1 });
}
function F_(r) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function V_(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function H_(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function G_(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/seasonality",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function W_(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/balance",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
const $s = "—";
function mt(r, t) {
  return r === null || Number.isNaN(r) ? $s : Math.abs(r) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    r / 1e3
  )} kW` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(r)} W`;
}
function lt(r, t) {
  return r === null || Number.isNaN(r) ? $s : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r * 100)}%`;
}
function ua(r, t) {
  return r === null || Number.isNaN(r) ? $s : r <= 0 ? "0%" : r < 1e-3 ? "<0.1%" : lt(r, t);
}
const U_ = 10 * 60;
function se(r, t) {
  return r === null || Number.isNaN(r) ? $s : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r)} kWh`;
}
function nn(r) {
  if (r < 60) return `${Math.round(r)} s`;
  const t = Math.round(r);
  if (t < U_) {
    const i = t % 60, n = (t - i) / 60;
    return i === 0 ? `${n} min` : `${n} min ${i} s`;
  }
  const e = Math.round(t / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
function Wa(r) {
  if (typeof r == "object" && r !== null && "message" in r) {
    const t = r.message;
    if (typeof t == "string" && t) return t;
  }
  return String(r);
}
function sf(r, t, e) {
  return r === "raw" ? "Exact data" : r === "lts" ? "Hourly averages" : t ? `Mixed since ${new Date(t).toLocaleDateString(e)}` : "Mixed";
}
function ls(r, t) {
  return r >= 0.95 ? null : r <= 0 ? "No data for this period" : r < 0.01 ? "Data covers less than 1% of the period" : `Data covers only ${lt(r, t)} of the period`;
}
function Y_(r) {
  let t;
  return () => (t ??= r().finally(() => {
    t = void 0;
  }), t);
}
const Og = ["24h", "7d", "30d", "month", "year"], X_ = {
  "24h": "24 h",
  "7d": "7 days",
  "30d": "30 days",
  month: "This month",
  year: "Year"
}, Ja = 24 * 3600 * 1e3, Ac = 60 * 1e3;
function zs(r, t) {
  const e = new Date(Math.floor(t.getTime() / Ac) * Ac);
  switch (r) {
    case "24h":
      return { start: new Date(e.getTime() - Ja), end: e };
    case "7d":
      return { start: new Date(e.getTime() - 7 * Ja), end: e };
    case "30d":
      return { start: new Date(e.getTime() - 30 * Ja), end: e };
    case "month":
      return { start: new Date(e.getFullYear(), e.getMonth(), 1, 0, 0, 0, 0), end: e };
    case "year":
      return { start: new Date(e.getTime() - 365 * Ja), end: e };
  }
}
function q_(r, t, e, i) {
  const a = r.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && e.includes(a) ? a : i.tab,
    range: s && Og.includes(s) ? s : i.range,
    entryId: l || i.entryId
  };
}
function Z_(r, t) {
  const e = new URLSearchParams({ range: t.range });
  return t.entryId && e.set("entry", t.entryId), `${r}/${t.tab}?${e.toString()}`;
}
const ut = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  battery: "#2fa84f",
  grid: "#8a8f98",
  overload: "#d64545",
  muted: "#b0b6bf",
  // The outbound half of each two-way flow. Paired with its inbound colour by
  // family so grid and battery each read as one thing going two ways, and
  // distinct enough that the legend does not put two greys side by side.
  gridExport: "#4aa3a3",
  batteryCharge: "#8fd19e"
};
function me() {
  const r = typeof document > "u" ? null : getComputedStyle(document.documentElement), t = r?.getPropertyValue("--primary-text-color").trim() || "#212121", e = r?.getPropertyValue("--divider-color").trim() || "#e0e0e0";
  return {
    base: {
      backgroundColor: "transparent",
      textStyle: { color: t, fontFamily: "inherit" },
      grid: { left: 56, right: 24, top: 24, bottom: 40, containLabel: !0 },
      tooltip: { trigger: "axis" }
    },
    axis: {
      axisLine: { lineStyle: { color: e } },
      axisLabel: { color: t },
      splitLine: { lineStyle: { color: e } },
      nameTextStyle: { color: t }
    }
  };
}
const xt = (r, t) => Number(r.toFixed(t));
function K_(r, t) {
  const { base: e, axis: i } = me(), n = r.histogram.buckets, a = n.map(
    (o) => String(t === "watts" ? xt(o.start, 0) : xt(o.start / r.rated_power * 100, 1))
  );
  return {
    ...e,
    xAxis: {
      ...i,
      type: "category",
      data: a,
      name: t === "watts" ? "W" : "% of rated",
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: n.map((o) => xt(o.fraction * 100, 2)),
        itemStyle: { color: ut.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Q_(r) {
  const { base: t, axis: e } = me();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "value", name: "W" },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: ut.load },
        itemStyle: { color: ut.load },
        data: r.duration_curve.map((i) => [
          xt(i.fraction * 100, 2),
          xt(i.value, 1)
        ])
      }
    ]
  };
}
function j_(r) {
  const { base: t, axis: e } = me(), i = [...r.bands].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => xt(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "100+" ? ut.overload : ut.load
        }
      }
    ]
  };
}
function J_(r) {
  const { base: t, axis: e } = me(), i = r.histogram;
  return {
    ...t,
    xAxis: {
      ...e,
      type: "category",
      data: i.map((n) => String(xt(n.start * 100, 0))),
      name: "% imbalance",
      nameLocation: "end"
    },
    yAxis: { ...e, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: i.map((n) => xt(n.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (n) => i[n.dataIndex].start >= r.threshold ? ut.overload : ut.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function t1(r, t) {
  const { base: e, axis: i } = me();
  return {
    ...e,
    // Two bar colours with nothing naming them is a guess. The shared grid
    // starts 24px from the top, which is exactly where the legend draws, so
    // the plot has to be pushed down to make room for it.
    legend: { data: ["Mean", "Peak"], top: 0, textStyle: e.textStyle },
    grid: { ...e.grid, top: 48 },
    xAxis: { ...i, type: "category", data: r.map((n) => n.label) },
    yAxis: { ...i, type: "value", name: "W" },
    series: [
      {
        name: "Mean",
        type: "bar",
        data: r.map((n) => n.mean === null ? null : xt(n.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: "Peak",
        type: "bar",
        data: r.map((n) => n.peak === null ? null : xt(n.peak, 1)),
        itemStyle: { color: ut.muted }
      }
    ]
  };
}
function e1(r) {
  const { base: t, axis: e } = me(), i = r.histogram.buckets;
  return {
    ...t,
    xAxis: {
      ...e,
      type: "category",
      data: i.map((n) => String(xt(n.start, 0))),
      name: "% charge",
      nameLocation: "end"
    },
    yAxis: { ...e, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: i.map((n) => xt(n.fraction * 100, 2)),
        // Everything under the configured low mark is the part worth looking
        // at, coloured as a warning rather than left for the reader to compare
        // against a number written elsewhere on the page.
        itemStyle: {
          color: (n) => i[n.dataIndex].end <= r.low_pct ? ut.overload : ut.battery
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function r1(r) {
  const { base: t, axis: e } = me(), i = [...r].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => xt(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "0-20" ? ut.overload : ut.battery
        }
      }
    ]
  };
}
function lf(r, t) {
  const [e, i] = r.split("-").map(Number), n = new Date(Date.UTC(2e3, i - 1, 1)).toLocaleDateString("en", { month: "short" });
  return t && t.slice(0, 4) === String(e) ? n : `${n} ${e}`;
}
function i1(r, t) {
  const { base: e, axis: i } = me(), n = r.map((o, s) => lf(o.key, r[s - 1]?.key)), a = [
    {
      name: "Load",
      type: "bar",
      data: r.map((o) => o.load_mean === null ? null : xt(o.load_mean, 1)),
      // An incomplete month keeps its bar and loses its solidity: dropping it
      // would leave a hole the reader fills in with a reason of their own.
      itemStyle: {
        color: (o) => r[o.dataIndex].complete ? ut.load : ut.muted
      }
    }
  ];
  return t && a.push({
    name: "PV",
    type: "bar",
    data: r.map((o) => o.pv_mean === null ? null : xt(o.pv_mean, 1)),
    itemStyle: { color: ut.pv }
  }), {
    ...e,
    legend: t ? { data: ["Load", "PV"], top: 0, textStyle: e.textStyle } : void 0,
    grid: { ...e.grid, top: t ? 48 : 24 },
    xAxis: { ...i, type: "category", data: n },
    yAxis: { ...i, type: "value", name: "W" },
    series: a
  };
}
function n1(r, t) {
  const { base: e, axis: i } = me(), n = [
    {
      name: "Load",
      type: "line",
      showSymbol: !1,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: ut.load },
      itemStyle: { color: ut.load },
      data: r.map((a) => a.load_mean === null ? null : xt(a.load_mean, 1))
    }
  ];
  return t && n.push({
    name: "PV",
    type: "line",
    showSymbol: !1,
    lineStyle: { color: ut.pv },
    itemStyle: { color: ut.pv },
    data: r.map((a) => a.pv_mean === null ? null : xt(a.pv_mean, 1))
  }), {
    ...e,
    legend: t ? { data: ["Load", "PV"], top: 0, textStyle: e.textStyle } : void 0,
    grid: { ...e.grid, top: t ? 48 : 24 },
    xAxis: {
      ...i,
      type: "category",
      data: r.map((a) => String(a.hour)),
      name: "hour",
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: "W" },
    series: n
  };
}
function a1(r, t) {
  const { base: e, axis: i } = me(), n = t.map((u) => u.key), a = n.map((u, h) => lf(u, n[h - 1])), o = new Map(n.map((u, h) => [u, h])), s = r.filter((u) => u.load_mean !== null && o.has(u.month)).map((u) => [o.get(u.month), u.hour, xt(u.load_mean, 1)]), l = s.map((u) => u[2]);
  return {
    ...e,
    tooltip: { trigger: "item" },
    grid: { ...e.grid, top: 48, bottom: 60 },
    xAxis: { ...i, type: "category", data: a, splitArea: { show: !0 } },
    yAxis: {
      ...i,
      type: "category",
      data: Array.from({ length: 24 }, (u, h) => String(h)),
      name: "hour"
    },
    visualMap: {
      min: l.length ? Math.min(...l) : 0,
      max: l.length ? Math.max(...l) : 1,
      calculable: !0,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: e.textStyle,
      inRange: { color: [ut.battery, ut.pv, ut.overload] }
    },
    series: [{ type: "heatmap", data: s }]
  };
}
const gn = {
  pv_energy_total: "Solar",
  grid_import_total: "From grid",
  battery_discharge_total: "From battery",
  load_energy_total: "House",
  grid_export_total: "To grid",
  battery_charge_total: "To battery"
}, kg = {
  pv_energy_total: ut.pv,
  grid_import_total: ut.grid,
  battery_discharge_total: ut.battery,
  load_energy_total: ut.load,
  grid_export_total: ut.gridExport,
  battery_charge_total: ut.batteryCharge
};
function o1(r, t, e) {
  const { base: i, axis: n } = me(), a = [...t, ...e].filter((o) => o in r);
  return {
    ...i,
    legend: { data: a.map((o) => gn[o]), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 56 },
    xAxis: { ...n, type: "value", name: "kWh" },
    yAxis: { ...n, type: "category", data: ["Out", "In"] },
    series: a.map((o) => ({
      name: gn[o],
      type: "bar",
      stack: t.includes(o) ? "in" : "out",
      itemStyle: { color: kg[o] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: t.includes(o) ? [null, xt(r[o], 3)] : [xt(r[o], 3), null]
    }))
  };
}
function s1(r, t, e) {
  const { base: i, axis: n } = me(), a = [...t, ...e].filter(
    (o) => r.some((s) => o in s.flows)
  );
  return {
    ...i,
    legend: { data: a.map((o) => gn[o]), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 56 },
    xAxis: { ...n, type: "category", data: r.map((o) => o.day.slice(5)) },
    yAxis: { ...n, type: "value", name: "kWh" },
    series: a.map((o) => ({
      name: gn[o],
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: t.includes(o) ? "in" : "out",
      itemStyle: { color: kg[o] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: r.map((s) => o in s.flows ? xt(s.flows[o], 3) : null)
    }))
  };
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Yu = function(r, t) {
  return Yu = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, Yu(r, t);
};
function N(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Yu(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var l1 = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), u1 = /* @__PURE__ */ function() {
  function r() {
    this.browser = new l1(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), Y = new u1();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (Y.wxa = !0, Y.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? Y.worker = !0 : !Y.hasGlobalWindow || "Deno" in window ? (Y.node = !0, Y.svgSupported = !0) : h1(navigator.userAgent, Y);
function h1(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var uf = 12, f1 = "sans-serif", wi = uf + "px " + f1, c1 = 20, v1 = 100, p1 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function d1(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - c1) / v1;
    t[i] = n;
  }
  return t;
}
var g1 = d1(p1), Br = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Br.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || wi), r.measureText(e);
      e = e || "", i = i || wi;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || uf, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = g1[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, Bg = Mn([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(r, t) {
  return r["[object " + t + "]"] = !0, r;
}, {}), Ng = Mn([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(r, t) {
  return r["[object " + t + "Array]"] = !0, r;
}, {}), Ua = Object.prototype.toString, Fs = Array.prototype, y1 = Fs.forEach, m1 = Fs.filter, hf = Fs.slice, _1 = Fs.map, Ic = function() {
}.constructor, to = Ic ? Ic.prototype : null, ff = "__proto__", b1 = 2311;
function $g() {
  return b1++;
}
function cf() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function X(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = Ua.call(r);
  if (e === "[object Array]") {
    if (!ha(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = X(r[i]);
    }
  } else if (Ng[e]) {
    if (!ha(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!Bg[e] && !ha(r) && !Ca(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== ff && (t[o] = X(r[o]));
  }
  return t;
}
function rt(r, t, e) {
  if (!H(t) || !H(r))
    return e ? X(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== ff) {
      var n = r[i], a = t[i];
      H(a) && H(n) && !$(a) && !$(n) && !Ca(a) && !Ca(n) && !Lc(a) && !Lc(n) && !ha(a) && !ha(n) ? rt(n, a, e) : (e || !(i in r)) && (r[i] = X(t[i]));
    }
  return r;
}
function B(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== ff && (r[e] = t[e]);
  return r;
}
function ot(r, t, e) {
  for (var i = dt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function ct(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function S1(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function qe(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    ot(r, t);
}
function Zt(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function C(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === y1)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function U(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return vf(r);
  if (r.map && r.map === _1)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function Mn(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function Pt(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return vf(r);
  if (r.filter && r.filter === m1)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function dt(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function w1(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(hf.call(arguments)));
  };
}
var j = to && q(to.bind) ? to.call.bind(to.bind) : w1;
function Mt(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(hf.call(arguments)));
  };
}
function $(r) {
  return Array.isArray ? Array.isArray(r) : Ua.call(r) === "[object Array]";
}
function q(r) {
  return typeof r == "function";
}
function V(r) {
  return typeof r == "string";
}
function Xu(r) {
  return Ua.call(r) === "[object String]";
}
function gt(r) {
  return typeof r == "number";
}
function H(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Lc(r) {
  return !!Bg[Ua.call(r)];
}
function Kt(r) {
  return !!Ng[Ua.call(r)];
}
function Ca(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function Vs(r) {
  return r.colorStops != null;
}
function x1(r) {
  return r.image != null;
}
function us(r) {
  return r !== r;
}
function yn() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function J(r, t) {
  return r ?? t;
}
function Go(r, t, e) {
  return r ?? t ?? e;
}
function vf(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return hf.apply(r, t);
}
function zg(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function He(r, t) {
  if (!r)
    throw new Error(t);
}
function ze(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Fg = "__ec_primitive__";
function qu(r) {
  r[Fg] = !0;
}
function ha(r) {
  return r[Fg];
}
var T1 = function() {
  function r() {
    this.data = {};
  }
  return r.prototype.delete = function(t) {
    var e = this.has(t);
    return e && delete this.data[t], e;
  }, r.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, r.prototype.get = function(t) {
    return this.data[t];
  }, r.prototype.set = function(t, e) {
    return this.data[t] = e, this;
  }, r.prototype.keys = function() {
    return dt(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
}(), Vg = typeof Map == "function";
function C1() {
  return Vg ? /* @__PURE__ */ new Map() : new T1();
}
var M1 = function() {
  function r(t) {
    var e = $(t);
    this.data = C1();
    var i = this;
    t instanceof r ? t.each(n) : t && C(t, n);
    function n(a, o) {
      e ? i.set(a, o) : i.set(o, a);
    }
  }
  return r.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, r.prototype.get = function(t) {
    return this.data.get(t);
  }, r.prototype.set = function(t, e) {
    return this.data.set(t, e), e;
  }, r.prototype.each = function(t, e) {
    this.data.forEach(function(i, n) {
      t.call(e, i, n);
    });
  }, r.prototype.keys = function() {
    var t = this.data.keys();
    return Vg ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function Q(r) {
  return new M1(r);
}
function D1(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function Hs(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && B(e, t), e;
}
function Hg(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function xi(r, t) {
  return r.hasOwnProperty(t);
}
function Ht() {
}
var A1 = 180 / Math.PI;
function Dn(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function I1(r) {
  return [r[0], r[1]];
}
function Pc(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function L1(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function P1(r) {
  return Math.sqrt(R1(r));
}
function R1(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function xl(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function E1(r, t) {
  var e = P1(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function Zu(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var O1 = Zu;
function k1(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var an = k1;
function de(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function ji(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Ji(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var Ri = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), B1 = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Ri(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new Ri(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new Ri(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Ri(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new Ri(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Ri(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), Ze = function() {
  function r(t) {
    t && (this._$eventProcessor = t);
  }
  return r.prototype.on = function(t, e, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof e == "function" && (n = i, i = e, e = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var l = {
      h: i,
      query: e,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, u = a[t].length - 1, h = a[t][u];
    return h && h.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, r.prototype.isSilent = function(t) {
    var e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }, r.prototype.off = function(t, e) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== e && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, r.prototype.trigger = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = n.length, l = 0; l < s; l++) {
        var u = n[l];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, e[0]);
              break;
            case 2:
              u.h.call(u.ctx, e[0], e[1]);
              break;
            default:
              u.h.apply(u.ctx, e);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r.prototype.triggerWithContext = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = e[o - 1], l = n.length, u = 0; u < l; u++) {
        var h = n[u];
        if (!(a && a.filter && h.query != null && !a.filter(t, h.query)))
          switch (o) {
            case 0:
              h.h.call(s);
              break;
            case 1:
              h.h.call(s, e[0]);
              break;
            case 2:
              h.h.call(s, e[0], e[1]);
              break;
            default:
              h.h.apply(s, e.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r;
}(), N1 = Math.log(2);
function Ku(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / N1);
    return r[e][l];
  }
  for (var u = i | 1 << e, h = e + 1; i & 1 << h; )
    h++;
  for (var f = 0, v = 0, c = 0; v < s; v++) {
    var p = 1 << v;
    p & n || (f += (c % 2 ? -1 : 1) * r[e][v] * Ku(r, t - 1, h, u, n | p, a), c++);
  }
  return a[o] = f, f;
}
function Rc(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = Ku(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Ku(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, h) {
      var f = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / f, l[1] = (u * a[3] + h * a[4] + a[5]) / f;
    };
  }
}
var Ec = "___zrEVENTSAVED", Tl = [];
function $1(r, t, e, i, n) {
  return Qu(Tl, t, i, n, !0) && Qu(r, e, Tl[0], Tl[1]);
}
function Qu(r, t, e, i, n) {
  if (t.getBoundingClientRect && Y.domSupported && !Gg(t)) {
    var a = t[Ec] || (t[Ec] = {}), o = z1(t, a), s = F1(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function z1(r, t) {
  var e = t.markers;
  if (e)
    return e;
  e = t.markers = [];
  for (var i = ["left", "right"], n = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, l = a % 2, u = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      i[l] + ":0",
      n[u] + ":0",
      i[1 - l] + ":auto",
      n[1 - u] + ":auto",
      ""
    ].join("!important;"), r.appendChild(o), e.push(o);
  }
  return e;
}
function F1(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = r[u].getBoundingClientRect(), f = 2 * u, v = h.left, c = h.top;
    o.push(v, c), l = l && a && v === a[f] && c === a[f + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Rc(s, o) : Rc(o, s));
}
function Gg(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var V1 = /([&<>"'])/g, H1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Ut(r) {
  return r == null ? "" : (r + "").replace(V1, function(t, e) {
    return H1[e];
  });
}
var G1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Cl = [], W1 = Y.browser.firefox && +Y.browser.version.split(".")[0] < 39;
function ju(r, t, e, i) {
  return e = e || {}, i ? Oc(r, t, e) : W1 && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Oc(r, t, e), e;
}
function Oc(r, t, e) {
  if (Y.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Gg(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (Qu(Cl, r, i, n)) {
      e.zrX = Cl[0], e.zrY = Cl[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function pf(r) {
  return r || window.event;
}
function le(r, t, e) {
  if (t = pf(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && ju(r, o, t, e);
  } else {
    ju(r, t, t, e);
    var a = U1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && G1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function U1(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function Y1(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function X1(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Ma = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, q1 = function() {
  function r() {
    this._track = [];
  }
  return r.prototype.recognize = function(t, e, i) {
    return this._doTrack(t, e, i), this._recognize(t);
  }, r.prototype.clear = function() {
    return this._track.length = 0, this;
  }, r.prototype._doTrack = function(t, e, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: e,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var l = n[o], u = ju(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Ml)
      if (Ml.hasOwnProperty(e)) {
        var i = Ml[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function kc(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function Z1(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Ml = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = kc(i) / kc(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = Z1(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function on() {
  return [1, 0, 0, 1, 0, 0];
}
function df(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function K1(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function sn(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function Ju(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function gf(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(e), f = Math.cos(e);
  return r[0] = n * f + s * h, r[1] = -n * h + s * f, r[2] = a * f + l * h, r[3] = -a * h + f * l, r[4] = f * (o - i[0]) + h * (u - i[1]) + i[0], r[5] = f * (u - i[1]) - h * (o - i[0]) + i[1], r;
}
function Q1(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function yf(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var vt = function() {
  function r(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  return r.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y);
  }, r.prototype.set = function(t, e) {
    return this.x = t, this.y = e, this;
  }, r.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, r.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, r.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, r.prototype.scaleAndAdd = function(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }, r.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, r.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, r.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, r.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, r.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, r.prototype.distance = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }, r.prototype.distanceSquare = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }, r.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, r.prototype.transform = function(t) {
    if (t) {
      var e = this.x, i = this.y;
      return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
    }
  }, r.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, r.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.set = function(t, e, i) {
    t.x = e, t.y = i;
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y;
  }, r.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, r.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, r.dot = function(t, e) {
    return t.x * e.x + t.y * e.y;
  }, r.add = function(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }, r.sub = function(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }, r.scale = function(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }, r.scaleAndAdd = function(t, e, i, n) {
    t.x = e.x + i.x * n, t.y = e.y + i.y * n;
  }, r.lerp = function(t, e, i, n) {
    var a = 1 - n;
    t.x = a * e.x + n * i.x, t.y = a * e.y + n * i.y;
  }, r;
}(), eo = Math.min, ro = Math.max, Hr = new vt(), Gr = new vt(), Wr = new vt(), Ur = new vt(), On = new vt(), kn = new vt(), at = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = eo(t.x, this.x), i = eo(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = ro(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = ro(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = on();
    return Ju(a, a, [-e.x, -e.y]), Q1(a, a, [i, n]), Ju(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, h = t.y, f = t.y + t.height, v = !(a < l || u < n || s < h || f < o);
    if (e) {
      var c = 1 / 0, p = 0, g = Math.abs(a - l), d = Math.abs(u - n), y = Math.abs(s - h), m = Math.abs(f - o), _ = Math.min(g, d), b = Math.min(y, m);
      a < l || u < n ? _ > p && (p = _, g < d ? vt.set(kn, -g, 0) : vt.set(kn, d, 0)) : _ < c && (c = _, g < d ? vt.set(On, g, 0) : vt.set(On, -d, 0)), s < h || f < o ? b > p && (p = b, y < m ? vt.set(kn, 0, -y) : vt.set(kn, 0, m)) : _ < c && (c = _, y < m ? vt.set(On, 0, y) : vt.set(On, 0, -m));
    }
    return e && vt.copy(e, v ? On : kn), v;
  }, r.prototype.contain = function(t, e) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y, this.width, this.height);
  }, r.prototype.copy = function(t) {
    r.copy(this, t);
  }, r.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, r.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, r.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, r.create = function(t) {
    return new r(t.x, t.y, t.width, t.height);
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }, r.applyTransform = function(t, e, i) {
    if (!i) {
      t !== e && r.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = e.x * n + o, t.y = e.y * a + s, t.width = e.width * n, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    Hr.x = Wr.x = e.x, Hr.y = Ur.y = e.y, Gr.x = Ur.x = e.x + e.width, Gr.y = Wr.y = e.y + e.height, Hr.transform(i), Ur.transform(i), Gr.transform(i), Wr.transform(i), t.x = eo(Hr.x, Gr.x, Wr.x, Ur.x), t.y = eo(Hr.y, Gr.y, Wr.y, Ur.y);
    var l = ro(Hr.x, Gr.x, Wr.x, Ur.x), u = ro(Hr.y, Gr.y, Wr.y, Ur.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
}(), Wg = "silent";
function j1(r, t, e) {
  return {
    type: r,
    event: e,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: e.zrX,
    offsetY: e.zrY,
    gestureEvent: e.gestureEvent,
    pinchX: e.pinchX,
    pinchY: e.pinchY,
    pinchScale: e.pinchScale,
    wheelDelta: e.zrDelta,
    zrByTouch: e.zrByTouch,
    which: e.which,
    stop: J1
  };
}
function J1() {
  Ma(this.event);
}
var tb = function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(Ze), Bn = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), eb = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Dl = new at(0, 0, 0, 0), Ug = function(r) {
  N(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new Bn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new tb(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new B1(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (C(eb, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = Yg(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new Bn(i, n) : this.findHover(i, n), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new Bn(0, 0);
  }, t.prototype.dispatch = function(e, i) {
    var n = this[e];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(e) {
    var i = this.proxy;
    i.setCursor && i.setCursor(e);
  }, t.prototype.dispatchToElement = function(e, i, n) {
    e = e || {};
    var a = e.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = j1(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new Bn(e, i);
    if (Bc(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new at(e - u, i - u, l, l), f = a.length - 1; f >= 0; f--) {
        var v = a[f];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Dl.copy(v.getBoundingRect()), v.transform && Dl.applyTransform(v.transform), Dl.intersect(h) && s.push(v));
      }
      if (s.length)
        for (var c = 4, p = Math.PI / 12, g = Math.PI * 2, d = 0; d < u; d += c)
          for (var y = 0; y < g; y += p) {
            var m = e + d * Math.cos(y), _ = i + d * Math.sin(y);
            if (Bc(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new q1());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new Bn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(Ze);
C(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  Ug.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = Yg(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || O1(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function rb(r, t, e) {
  if (r[r.rectHover ? "rectContain" : "contain"](t, e)) {
    for (var i = r, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, e))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? Wg : !0;
  }
  return !1;
}
function Bc(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = rb(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Wg)) {
      t.target = o;
      break;
    }
  }
}
function Yg(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Xg = 32, Nn = 7;
function ib(r) {
  for (var t = 0; r >= Xg; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function Nc(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    nb(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function nb(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function $c(r, t, e, i, n) {
  for (i === t && i++; i < e; i++) {
    for (var a = r[i], o = t, s = i, l; o < s; )
      l = o + s >>> 1, n(a, r[l]) < 0 ? s = l : o = l + 1;
    var u = i - o;
    switch (u) {
      case 3:
        r[o + 3] = r[o + 2];
      case 2:
        r[o + 2] = r[o + 1];
      case 1:
        r[o + 1] = r[o];
        break;
      default:
        for (; u > 0; )
          r[o + u] = r[o + u - 1], u--;
    }
    r[o] = a;
  }
}
function Al(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) > 0) {
    for (s = i - n; l < s && a(r, t[e + n + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  } else {
    for (s = n + 1; l < s && a(r, t[e + n - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(r, t[e + h]) > 0 ? o = h + 1 : l = h;
  }
  return l;
}
function Il(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) < 0) {
    for (s = n + 1; l < s && a(r, t[e + n - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  } else {
    for (s = i - n; l < s && a(r, t[e + n + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(r, t[e + h]) < 0 ? l = h : o = h + 1;
  }
  return l;
}
function ab(r, t) {
  var e = Nn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(c, p) {
    i[a] = c, n[a] = p, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var c = a - 2;
      if (c >= 1 && n[c - 1] <= n[c] + n[c + 1] || c >= 2 && n[c - 2] <= n[c] + n[c - 1])
        n[c - 1] < n[c + 1] && c--;
      else if (n[c] > n[c + 1])
        break;
      h(c);
    }
  }
  function u() {
    for (; a > 1; ) {
      var c = a - 2;
      c > 0 && n[c - 1] < n[c + 1] && c--, h(c);
    }
  }
  function h(c) {
    var p = i[c], g = n[c], d = i[c + 1], y = n[c + 1];
    n[c] = g + y, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var m = Il(r[d], r, p, g, 0, t);
    p += m, g -= m, g !== 0 && (y = Al(r[p + g - 1], r, d, y, y - 1, t), y !== 0 && (g <= y ? f(p, g, d, y) : v(p, g, d, y)));
  }
  function f(c, p, g, d) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = r[c + y];
    var m = 0, _ = g, b = c;
    if (r[b++] = r[_++], --d === 0) {
      for (y = 0; y < p; y++)
        r[b + y] = o[m + y];
      return;
    }
    if (p === 1) {
      for (y = 0; y < d; y++)
        r[b + y] = r[_ + y];
      r[b + d] = o[m];
      return;
    }
    for (var w = e, S, x, M; ; ) {
      S = 0, x = 0, M = !1;
      do
        if (t(r[_], o[m]) < 0) {
          if (r[b++] = r[_++], x++, S = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (r[b++] = o[m++], S++, x = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((S | x) < w);
      if (M)
        break;
      do {
        if (S = Il(r[_], o, m, p, 0, t), S !== 0) {
          for (y = 0; y < S; y++)
            r[b + y] = o[m + y];
          if (b += S, m += S, p -= S, p <= 1) {
            M = !0;
            break;
          }
        }
        if (r[b++] = r[_++], --d === 0) {
          M = !0;
          break;
        }
        if (x = Al(o[m], r, _, d, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            r[b + y] = r[_ + y];
          if (b += x, _ += x, d -= x, d === 0) {
            M = !0;
            break;
          }
        }
        if (r[b++] = o[m++], --p === 1) {
          M = !0;
          break;
        }
        w--;
      } while (S >= Nn || x >= Nn);
      if (M)
        break;
      w < 0 && (w = 0), w += 2;
    }
    if (e = w, e < 1 && (e = 1), p === 1) {
      for (y = 0; y < d; y++)
        r[b + y] = r[_ + y];
      r[b + d] = o[m];
    } else {
      if (p === 0)
        throw new Error();
      for (y = 0; y < p; y++)
        r[b + y] = o[m + y];
    }
  }
  function v(c, p, g, d) {
    var y = 0;
    for (y = 0; y < d; y++)
      o[y] = r[g + y];
    var m = c + p - 1, _ = d - 1, b = g + d - 1, w = 0, S = 0;
    if (r[b--] = r[m--], --p === 0) {
      for (w = b - (d - 1), y = 0; y < d; y++)
        r[w + y] = o[y];
      return;
    }
    if (d === 1) {
      for (b -= p, m -= p, S = b + 1, w = m + 1, y = p - 1; y >= 0; y--)
        r[S + y] = r[w + y];
      r[b] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var M = 0, D = 0, A = !1;
      do
        if (t(o[_], r[m]) < 0) {
          if (r[b--] = r[m--], M++, D = 0, --p === 0) {
            A = !0;
            break;
          }
        } else if (r[b--] = o[_--], D++, M = 0, --d === 1) {
          A = !0;
          break;
        }
      while ((M | D) < x);
      if (A)
        break;
      do {
        if (M = p - Il(o[_], r, c, p, p - 1, t), M !== 0) {
          for (b -= M, m -= M, p -= M, S = b + 1, w = m + 1, y = M - 1; y >= 0; y--)
            r[S + y] = r[w + y];
          if (p === 0) {
            A = !0;
            break;
          }
        }
        if (r[b--] = o[_--], --d === 1) {
          A = !0;
          break;
        }
        if (D = d - Al(r[m], o, 0, d, d - 1, t), D !== 0) {
          for (b -= D, _ -= D, d -= D, S = b + 1, w = _ + 1, y = 0; y < D; y++)
            r[S + y] = o[w + y];
          if (d <= 1) {
            A = !0;
            break;
          }
        }
        if (r[b--] = r[m--], --p === 0) {
          A = !0;
          break;
        }
        x--;
      } while (M >= Nn || D >= Nn);
      if (A)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), d === 1) {
      for (b -= p, m -= p, S = b + 1, w = m + 1, y = p - 1; y >= 0; y--)
        r[S + y] = r[w + y];
      r[b] = o[_];
    } else {
      if (d === 0)
        throw new Error();
      for (w = b - (d - 1), y = 0; y < d; y++)
        r[w + y] = o[y];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function Wo(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Xg) {
      a = Nc(r, e, i, t), $c(r, e, i, e + a, t);
      return;
    }
    var o = ab(r, t), s = ib(n);
    do {
      if (a = Nc(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), $c(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var te = 1, ea = 2, Ki = 4, zc = !1;
function Ll() {
  zc || (zc = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Fc(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var ob = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Fc;
  }
  return r.prototype.traverse = function(t, e) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, e);
  }, r.prototype.getDisplayList = function(t, e) {
    e = e || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(e), i;
  }, r.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var e = this._roots, i = this._displayList, n = 0, a = e.length; n < a; n++)
      this._updateAndAddDisplayable(e[n], null, t);
    i.length = this._displayListLen, Wo(i, Fc);
  }, r.prototype._updateAndAddDisplayable = function(t, e, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        e = null;
      else if (n) {
        e ? e = e.slice() : e = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), e.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= te), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        e && e.length ? h.__clipPaths = e : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (Ll(), h.z = 0), isNaN(h.z2) && (Ll(), h.z2 = 0), isNaN(h.zlevel) && (Ll(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
      }
      var f = t.getDecalElement && t.getDecalElement();
      f && this._updateAndAddDisplayable(f, e, i);
      var v = t.getTextGuideLine();
      v && this._updateAndAddDisplayable(v, e, i);
      var c = t.getTextContent();
      c && this._updateAndAddDisplayable(c, e, i);
    }
  }, r.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, r.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var e = 0, i = t.length; e < i; e++)
        this.delRoot(t[e]);
      return;
    }
    var n = ct(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
}(), hs;
hs = Y.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var fa = {
  linear: function(r) {
    return r;
  },
  quadraticIn: function(r) {
    return r * r;
  },
  quadraticOut: function(r) {
    return r * (2 - r);
  },
  quadraticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1);
  },
  cubicIn: function(r) {
    return r * r * r;
  },
  cubicOut: function(r) {
    return --r * r * r + 1;
  },
  cubicInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2);
  },
  quarticIn: function(r) {
    return r * r * r * r;
  },
  quarticOut: function(r) {
    return 1 - --r * r * r * r;
  },
  quarticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2);
  },
  quinticIn: function(r) {
    return r * r * r * r * r;
  },
  quinticOut: function(r) {
    return --r * r * r * r * r + 1;
  },
  quinticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2);
  },
  sinusoidalIn: function(r) {
    return 1 - Math.cos(r * Math.PI / 2);
  },
  sinusoidalOut: function(r) {
    return Math.sin(r * Math.PI / 2);
  },
  sinusoidalInOut: function(r) {
    return 0.5 * (1 - Math.cos(Math.PI * r));
  },
  exponentialIn: function(r) {
    return r === 0 ? 0 : Math.pow(1024, r - 1);
  },
  exponentialOut: function(r) {
    return r === 1 ? 1 : 1 - Math.pow(2, -10 * r);
  },
  exponentialInOut: function(r) {
    return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? 0.5 * Math.pow(1024, r - 1) : 0.5 * (-Math.pow(2, -10 * (r - 1)) + 2);
  },
  circularIn: function(r) {
    return 1 - Math.sqrt(1 - r * r);
  },
  circularOut: function(r) {
    return Math.sqrt(1 - --r * r);
  },
  circularInOut: function(r) {
    return (r *= 2) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
  },
  elasticIn: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * r) * Math.sin((r - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (r *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(r) {
    var t = 1.70158;
    return r * r * ((t + 1) * r - t);
  },
  backOut: function(r) {
    var t = 1.70158;
    return --r * r * ((t + 1) * r + t) + 1;
  },
  backInOut: function(r) {
    var t = 2.5949095;
    return (r *= 2) < 1 ? 0.5 * (r * r * ((t + 1) * r - t)) : 0.5 * ((r -= 2) * r * ((t + 1) * r + t) + 2);
  },
  bounceIn: function(r) {
    return 1 - fa.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? fa.bounceIn(r * 2) * 0.5 : fa.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, io = Math.pow, Er = Math.sqrt, fs = 1e-8, qg = 1e-4, Vc = Er(3), no = 1 / 3, $e = Dn(), fe = Dn(), ln = Dn();
function Lr(r) {
  return r > -fs && r < fs;
}
function Zg(r) {
  return r > fs || r < -fs;
}
function Rt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function Hc(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function cs(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, h = s * s - 3 * o * l, f = s * l - 9 * o * u, v = l * l - 3 * s * u, c = 0;
  if (Lr(h) && Lr(f))
    if (Lr(s))
      a[0] = 0;
    else {
      var p = -l / s;
      p >= 0 && p <= 1 && (a[c++] = p);
    }
  else {
    var g = f * f - 4 * h * v;
    if (Lr(g)) {
      var d = f / h, p = -s / o + d, y = -d / 2;
      p >= 0 && p <= 1 && (a[c++] = p), y >= 0 && y <= 1 && (a[c++] = y);
    } else if (g > 0) {
      var m = Er(g), _ = h * s + 1.5 * o * (-f + m), b = h * s + 1.5 * o * (-f - m);
      _ < 0 ? _ = -io(-_, no) : _ = io(_, no), b < 0 ? b = -io(-b, no) : b = io(b, no);
      var p = (-s - (_ + b)) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p);
    } else {
      var w = (2 * h * s - 3 * o * f) / (2 * Er(h * h * h)), S = Math.acos(w) / 3, x = Er(h), M = Math.cos(S), p = (-s - 2 * x * M) / (3 * o), y = (-s + x * (M + Vc * Math.sin(S))) / (3 * o), D = (-s + x * (M - Vc * Math.sin(S))) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p), y >= 0 && y <= 1 && (a[c++] = y), D >= 0 && D <= 1 && (a[c++] = D);
    }
  }
  return c;
}
function Kg(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (Lr(o)) {
    if (Zg(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = a * a - 4 * o * s;
    if (Lr(h))
      n[0] = -a / (2 * o);
    else if (h > 0) {
      var f = Er(h), u = (-a + f) / (2 * o), v = (-a - f) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function vs(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, h = (l - s) * n + s, f = (h - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = f, a[4] = f, a[5] = h, a[6] = l, a[7] = i;
}
function sb(r, t, e, i, n, a, o, s, l, u, h) {
  var f, v = 5e-3, c = 1 / 0, p, g, d, y;
  $e[0] = l, $e[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    fe[0] = Rt(r, e, n, o, m), fe[1] = Rt(t, i, a, s, m), d = an($e, fe), d < c && (f = m, c = d);
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < qg); _++)
    p = f - v, g = f + v, fe[0] = Rt(r, e, n, o, p), fe[1] = Rt(t, i, a, s, p), d = an(fe, $e), p >= 0 && d < c ? (f = p, c = d) : (ln[0] = Rt(r, e, n, o, g), ln[1] = Rt(t, i, a, s, g), y = an(ln, $e), g <= 1 && y < c ? (f = g, c = y) : v *= 0.5);
  return Er(c);
}
function lb(r, t, e, i, n, a, o, s, l) {
  for (var u = r, h = t, f = 0, v = 1 / l, c = 1; c <= l; c++) {
    var p = c * v, g = Rt(r, e, n, o, p), d = Rt(t, i, a, s, p), y = g - u, m = d - h;
    f += Math.sqrt(y * y + m * m), u = g, h = d;
  }
  return f;
}
function Yt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function Gc(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function ub(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (Lr(a)) {
    if (Zg(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = o * o - 4 * a * s;
    if (Lr(h)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (h > 0) {
      var f = Er(h), u = (-o + f) / (2 * a), v = (-o - f) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Qg(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function ps(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function hb(r, t, e, i, n, a, o, s, l) {
  var u, h = 5e-3, f = 1 / 0;
  $e[0] = o, $e[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    fe[0] = Yt(r, e, n, v), fe[1] = Yt(t, i, a, v);
    var c = an($e, fe);
    c < f && (u = v, f = c);
  }
  f = 1 / 0;
  for (var p = 0; p < 32 && !(h < qg); p++) {
    var g = u - h, d = u + h;
    fe[0] = Yt(r, e, n, g), fe[1] = Yt(t, i, a, g);
    var c = an(fe, $e);
    if (g >= 0 && c < f)
      u = g, f = c;
    else {
      ln[0] = Yt(r, e, n, d), ln[1] = Yt(t, i, a, d);
      var y = an(ln, $e);
      d <= 1 && y < f ? (u = d, f = y) : h *= 0.5;
    }
  }
  return Er(f);
}
function fb(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, h = 1 / o, f = 1; f <= o; f++) {
    var v = f * h, c = Yt(r, e, n, v), p = Yt(t, i, a, v), g = c - s, d = p - l;
    u += Math.sqrt(g * g + d * d), s = c, l = p;
  }
  return u;
}
var cb = /cubic-bezier\(([0-9,\.e ]+)\)/;
function jg(r) {
  var t = r && cb.exec(r);
  if (t) {
    var e = t[1].split(","), i = +ze(e[0]), n = +ze(e[1]), a = +ze(e[2]), o = +ze(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : cs(0, i, a, 1, l, s) && Rt(0, n, o, 1, s[0]);
    };
  }
}
var vb = function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ht, this.ondestroy = t.ondestroy || Ht, this.onrestart = t.onrestart || Ht, t.easing && this.setEasing(t.easing);
  }
  return r.prototype.step = function(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    var i = this._life, n = t - this._startTime - this._pausedTime, a = n / i;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = n % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, r.prototype.pause = function() {
    this._paused = !0;
  }, r.prototype.resume = function() {
    this._paused = !1;
  }, r.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = q(t) ? t : fa[t] || jg(t);
  }, r;
}(), Jg = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), pb = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new Jg(t);
    return this.insertEntry(e), e;
  }, r.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, r.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, r;
}(), Ya = function() {
  function r(t) {
    this._list = new pb(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new Jg(e), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, r.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, r.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, r.prototype.len = function() {
    return this._list.len();
  }, r;
}(), Wc = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function De(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function db(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 360 ? 360 : r;
}
function Da(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Pl(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? De(parseFloat(t) / 100 * 255) : De(parseInt(t, 10));
}
function yi(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? Da(parseFloat(t) / 100) : Da(parseFloat(t));
}
function Rl(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function Pr(r, t, e) {
  return r + (t - r) * e;
}
function oe(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function th(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var ty = new Ya(20), ao = null;
function Ei(r, t) {
  ao && th(ao, t), ao = ty.put(r, ao || t.slice());
}
function ge(r, t) {
  if (r) {
    t = t || [];
    var e = ty.get(r);
    if (e)
      return th(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in Wc)
      return th(t, Wc[i]), Ei(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          oe(t, 0, 0, 0, 1);
          return;
        }
        return oe(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Ei(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          oe(t, 0, 0, 0, 1);
          return;
        }
        return oe(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Ei(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? oe(t, +u[0], +u[1], +u[2], 1) : oe(t, 0, 0, 0, 1);
          h = yi(u.pop());
        case "rgb":
          if (u.length >= 3)
            return oe(t, Pl(u[0]), Pl(u[1]), Pl(u[2]), u.length === 3 ? h : yi(u[3])), Ei(r, t), t;
          oe(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            oe(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = yi(u[3]), eh(u, t), Ei(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            oe(t, 0, 0, 0, 1);
            return;
          }
          return eh(u, t), Ei(r, t), t;
        default:
          return;
      }
    }
    oe(t, 0, 0, 0, 1);
  }
}
function eh(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = yi(r[1]), n = yi(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], oe(t, De(Rl(o, a, e + 1 / 3) * 255), De(Rl(o, a, e) * 255), De(Rl(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function gb(r) {
  if (r) {
    var t = r[0] / 255, e = r[1] / 255, i = r[2] / 255, n = Math.min(t, e, i), a = Math.max(t, e, i), o = a - n, s = (a + n) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + n) : u = o / (2 - a - n);
      var h = ((a - t) / 6 + o / 2) / o, f = ((a - e) / 6 + o / 2) / o, v = ((a - i) / 6 + o / 2) / o;
      t === a ? l = v - f : e === a ? l = 1 / 3 + h - v : i === a && (l = 2 / 3 + f - h), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var c = [l * 360, u, s];
    return r[3] != null && c.push(r[3]), c;
  }
}
function Uc(r, t) {
  var e = ge(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return ar(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function El(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    e = e || [];
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = t[n], s = t[a], l = i - n;
    return e[0] = De(Pr(o[0], s[0], l)), e[1] = De(Pr(o[1], s[1], l)), e[2] = De(Pr(o[2], s[2], l)), e[3] = Da(Pr(o[3], s[3], l)), e;
  }
}
function yb(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = ge(t[n]), s = ge(t[a]), l = i - n, u = ar([
      De(Pr(o[0], s[0], l)),
      De(Pr(o[1], s[1], l)),
      De(Pr(o[2], s[2], l)),
      Da(Pr(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function Ol(r, t, e, i) {
  var n = ge(r);
  if (r)
    return n = gb(n), t != null && (n[0] = db(t)), e != null && (n[1] = yi(e)), i != null && (n[2] = yi(i)), ar(eh(n), "rgba");
}
function mb(r, t) {
  var e = ge(r);
  if (e && t != null)
    return e[3] = Da(t), ar(e, "rgba");
}
function ar(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function ds(r, t) {
  var e = ge(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Yc = new Ya(100);
function Xc(r) {
  if (V(r)) {
    var t = Yc.get(r);
    return t || (t = Uc(r, -0.1), Yc.put(r, t)), t;
  } else if (Vs(r)) {
    var e = B({}, r);
    return e.colorStops = U(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: Uc(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function _b(r) {
  return r.type === "linear";
}
function bb(r) {
  return r.type === "radial";
}
(function() {
  return Y.hasGlobalWindow && q(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return null;
  };
})();
var rh = Array.prototype.slice;
function er(r, t, e) {
  return (t - r) * e + r;
}
function kl(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = er(t[a], e[a], i);
  return r;
}
function Sb(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = er(t[o][s], e[o][s], i);
  }
  return r;
}
function oo(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function qc(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function wb(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function xb(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : rh.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(i[l][h]) && (i[l][h] = n[l][h]);
  }
}
function Uo(r) {
  if (Zt(r)) {
    var t = r.length;
    if (Zt(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(rh.call(r[i]));
      return e;
    }
    return rh.call(r);
  }
  return r;
}
function Yo(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function Tb(r) {
  return Zt(r && r[0]) ? 2 : 1;
}
var so = 0, Xo = 1, ey = 2, ra = 3, ih = 4, nh = 5, Zc = 6;
function Kc(r) {
  return r === ih || r === nh;
}
function lo(r) {
  return r === Xo || r === ey;
}
var $n = [0, 0, 0, 0], Cb = function() {
  function r(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return r.prototype.isFinished = function() {
    return this._finished;
  }, r.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, r.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, r.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, r.prototype.addKeyframe = function(t, e, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = Zc, l = e;
    if (Zt(e)) {
      var u = Tb(e);
      s = u, (u === 1 && !gt(e[0]) || u === 2 && !gt(e[0][0])) && (o = !0);
    } else if (gt(e) && !us(e))
      s = so;
    else if (V(e))
      if (!isNaN(+e))
        s = so;
      else {
        var h = ge(e);
        h && (l = h, s = ra);
      }
    else if (Vs(e)) {
      var f = B({}, l);
      f.colorStops = U(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: ge(c.color)
        };
      }), _b(e) ? s = ih : bb(e) && (s = nh), l = f;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Zc) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = q(i) ? i : fa[i] || jg(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, d) {
      return g.time - d.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = lo(n), u = Kc(n), h = 0; h < a; h++) {
      var f = i[h], v = f.value, c = o.value;
      f.percent = f.time / t, s || (l && h !== a - 1 ? xb(v, c, n) : u && wb(v.colorStops, c.colorStops));
    }
    if (!s && n !== nh && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, h = 0; h < a; h++)
        n === so ? i[h].additiveValue = i[h].value - p : n === ra ? i[h].additiveValue = oo([], i[h].value, p, -1) : lo(n) && (i[h].additiveValue = n === Xo ? oo([], i[h].value, p, -1) : qc([], i[h].value, p, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === ra, h, f = this._lastFr, v = Math.min, c, p;
      if (s === 1)
        c = p = o[0];
      else {
        if (e < 0)
          h = 0;
        else if (e < this._lastFrP) {
          var g = v(f + 1, s - 1);
          for (h = g; h >= 0 && !(o[h].percent <= e); h--)
            ;
          h = v(h, s - 2);
        } else {
          for (h = f; h < s && !(o[h].percent > e); h++)
            ;
          h = v(h - 1, s - 2);
        }
        p = o[h + 1], c = o[h];
      }
      if (c && p) {
        this._lastFr = h, this._lastFrP = e;
        var d = p.percent - c.percent, y = d === 0 ? 1 : v((e - c.percent) / d, 1);
        p.easingFunc && (y = p.easingFunc(y));
        var m = i ? this._additiveValue : u ? $n : t[l];
        if ((lo(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? c.rawValue : p.rawValue;
        else if (lo(a))
          a === Xo ? kl(m, c[n], p[n], y) : Sb(m, c[n], p[n], y);
        else if (Kc(a)) {
          var _ = c[n], b = p[n], w = a === ih;
          t[l] = {
            type: w ? "linear" : "radial",
            x: er(_.x, b.x, y),
            y: er(_.y, b.y, y),
            colorStops: U(_.colorStops, function(x, M) {
              var D = b.colorStops[M];
              return {
                offset: er(x.offset, D.offset, y),
                color: Yo(kl([], x.color, D.color, y))
              };
            }),
            global: b.global
          }, w ? (t[l].x2 = er(_.x2, b.x2, y), t[l].y2 = er(_.y2, b.y2, y)) : t[l].r = er(_.r, b.r, y);
        } else if (u)
          kl(m, c[n], p[n], y), i || (t[l] = Yo(m));
        else {
          var S = er(c[n], p[n], y);
          i ? this._additiveValue = S : t[l] = S;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === so ? t[i] = t[i] + n : e === ra ? (ge(t[i], $n), oo($n, $n, n, 1), t[i] = Yo($n)) : e === Xo ? oo(t[i], t[i], n, 1) : e === ey && qc(t[i], t[i], n, 1);
  }, r;
}(), mf = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      cf("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return r.prototype.getMaxTime = function() {
    return this._maxTime;
  }, r.prototype.getDelay = function() {
    return this._delay;
  }, r.prototype.getLoop = function() {
    return this._loop;
  }, r.prototype.getTarget = function() {
    return this._target;
  }, r.prototype.changeTarget = function(t) {
    this._target = t;
  }, r.prototype.when = function(t, e, i) {
    return this.whenWithKeys(t, e, dt(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new Cb(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var f = h.keyframes, v = f[f.length - 1];
          u = v && v.value, h.valType === ra && u && (u = Yo(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, Uo(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, Uo(e[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, r.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, r.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, r.prototype.isPaused = function() {
    return !!this._paused;
  }, r.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, r.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var e = t.length, i = 0; i < e; i++)
        t[i].call(this);
  }, r.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (var i = 0; i < e.length; i++)
        e[i].call(this);
  }, r.prototype._setTracksFinished = function() {
    for (var t = this._tracks, e = this._trackKeys, i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }, r.prototype._getAdditiveTrack = function(t) {
    var e, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (e = a);
      }
    return e;
  }, r.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var e = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, h = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var f = u[h - 1];
            f && (e._target[s.propName] = f.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new vb({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var p = e._additiveAnimators;
            if (p) {
              for (var g = !1, d = 0; d < p.length; d++)
                if (p[d]._clip) {
                  g = !0;
                  break;
                }
              g || (e._additiveAnimators = null);
            }
            for (var d = 0; d < i.length; d++)
              i[d].step(e._target, c);
            var y = e._onframeCbs;
            if (y)
              for (var d = 0; d < y.length; d++)
                y[d](e._target, c);
          },
          ondestroy: function() {
            e._doneCallback();
          }
        });
        this._clip = v, this.animation && this.animation.addClip(v), t && v.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, r.prototype.stop = function(t) {
    if (this._clip) {
      var e = this._clip;
      t && e.onframe(1), this._abortedCallback();
    }
  }, r.prototype.delay = function(t) {
    return this._delay = t, this;
  }, r.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, r.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, r.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, r.prototype.getClip = function() {
    return this._clip;
  }, r.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, r.prototype.getTracks = function() {
    var t = this;
    return U(this._trackKeys, function(e) {
      return t._tracks[e];
    });
  }, r.prototype.stopTracks = function(t, e) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (e ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, r.prototype.saveTo = function(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (var n = 0; n < e.length; n++) {
        var a = e[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[i ? 0 : s.length - 1];
          l && (t[a] = Uo(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || dt(t);
    for (var i = 0; i < e.length; i++) {
      var n = e[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, r;
}();
function tn() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var Mb = function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, e = e || {}, i.stage = e.stage || {}, i;
  }
  return t.prototype.addClip = function(e) {
    e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
  }, t.prototype.addAnimator = function(e) {
    e.animation = this;
    var i = e.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(e) {
    if (e.animation) {
      var i = e.prev, n = e.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, e.next = e.prev = e.animation = null;
    }
  }, t.prototype.removeAnimator = function(e) {
    var i = e.getClip();
    i && this.removeClip(i), e.animation = null;
  }, t.prototype.update = function(e) {
    for (var i = tn() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (hs(i), !e._paused && e.update());
    }
    hs(i);
  }, t.prototype.start = function() {
    this._running || (this._time = tn(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = tn(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += tn() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var e = this._head; e; ) {
      var i = e.next;
      e.prev = e.next = e.animation = null, e = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(e, i) {
    i = i || {}, this.start();
    var n = new mf(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(Ze), Db = 300, Bl = Y.domSupported, Nl = function() {
  var r = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], t = [
    "touchstart",
    "touchend",
    "touchmove"
  ], e = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = U(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
}(), Qc = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, jc = !1;
function ah(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function Ab(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function $l(r) {
  r && (r.zrByTouch = !0);
}
function Ib(r, t) {
  return le(r.dom, new Lb(r, t), !0);
}
function ry(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var Lb = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Ht, this.stopImmediatePropagation = Ht, this.preventDefault = Ht, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), Te = {
  mousedown: function(r) {
    r = le(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = le(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = le(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = le(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    ry(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    jc = !0, r = le(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    jc || (r = le(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = le(this.dom, r), $l(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), Te.mousemove.call(this, r), Te.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = le(this.dom, r), $l(r), this.handler.processGesture(r, "change"), Te.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = le(this.dom, r), $l(r), this.handler.processGesture(r, "end"), Te.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < Db && Te.click.call(this, r);
  },
  pointerdown: function(r) {
    Te.mousedown.call(this, r);
  },
  pointermove: function(r) {
    ah(r) || Te.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Te.mouseup.call(this, r);
  },
  pointerout: function(r) {
    ah(r) || Te.mouseout.call(this, r);
  }
};
C(["click", "dblclick", "contextmenu"], function(r) {
  Te[r] = function(t) {
    t = le(this.dom, t), this.trigger(r, t);
  };
});
var oh = {
  pointermove: function(r) {
    ah(r) || oh.mousemove.call(this, r);
  },
  pointerup: function(r) {
    oh.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function Pb(r, t) {
  var e = t.domHandlers;
  Y.pointerEventsSupported ? C(Nl.pointer, function(i) {
    qo(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (Y.touchEventsSupported && C(Nl.touch, function(i) {
    qo(t, i, function(n) {
      e[i].call(r, n), Ab(t);
    });
  }), C(Nl.mouse, function(i) {
    qo(t, i, function(n) {
      n = pf(n), t.touching || e[i].call(r, n);
    });
  }));
}
function Rb(r, t) {
  Y.pointerEventsSupported ? C(Qc.pointer, e) : Y.touchEventsSupported || C(Qc.mouse, e);
  function e(i) {
    function n(a) {
      a = pf(a), ry(r, a.target) || (a = Ib(r, a), t.domHandlers[i].call(r, a));
    }
    qo(t, i, n, { capture: !0 });
  }
}
function qo(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, Y1(r.domTarget, t, e, i);
}
function zl(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && X1(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var Jc = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), Eb = function(r) {
  N(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new Jc(e, Te), Bl && (n._globalHandlerScope = new Jc(document, oh)), Pb(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    zl(this._localHandlerScope), Bl && zl(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, Bl && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? Rb(this, i) : zl(i);
    }
  }, t;
}(Ze), iy = 1;
Y.hasGlobalWindow && (iy = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var gs = iy, sh = 0.4, lh = "#333", uh = "#ccc", Ob = "#eee", tv = df, ev = 5e-5;
function Yr(r) {
  return r > ev || r < -ev;
}
var Xr = [], Oi = [], Fl = on(), Vl = Math.abs, _f = function() {
  function r() {
  }
  return r.prototype.getLocalTransform = function(t) {
    return r.getLocalTransform(this, t);
  }, r.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, r.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, r.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, r.prototype.needLocalTransform = function() {
    return Yr(this.rotation) || Yr(this.x) || Yr(this.y) || Yr(this.scaleX - 1) || Yr(this.scaleY - 1) || Yr(this.skewX) || Yr(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (tv(i), this.invTransform = null);
      return;
    }
    i = i || on(), e ? this.getLocalTransform(i) : tv(i), t && (e ? sn(i, t, i) : K1(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(Xr);
      var i = Xr[0] < 0 ? -1 : 1, n = Xr[1] < 0 ? -1 : 1, a = ((Xr[0] - i) * e + i) / Xr[0] || 0, o = ((Xr[1] - n) * e + n) / Xr[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || on(), yf(this.invTransform, t);
  }, r.prototype.getComputedTransform = function() {
    for (var t = this, e = []; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }, r.prototype.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), e = Math.sqrt(e), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, r.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, e = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || on(), sn(Oi, t.invTransform, e), e = Oi);
      var i = this.originX, n = this.originY;
      (i || n) && (Fl[4] = i, Fl[5] = n, sn(Oi, e, Fl), Oi[4] -= i, Oi[5] -= n, e = Oi), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && de(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && de(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && Vl(t[0] - 1) > 1e-10 && Vl(t[3] - 1) > 1e-10 ? Math.sqrt(Vl(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    kb(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, f = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var p = i + s, g = n + l;
      e[4] = -p * a - v * g * o, e[5] = -g * o - c * p * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = v * o, u && gf(e, e, u), e[4] += i + h, e[5] += n + f, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), Aa = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function kb(r, t) {
  for (var e = 0; e < Aa.length; e++) {
    var i = Aa[e];
    r[i] = t[i];
  }
}
var rv = {};
function re(r, t) {
  t = t || wi;
  var e = rv[t];
  e || (e = rv[t] = new Ya(500));
  var i = e.get(r);
  return i == null && (i = Br.measureText(r, t).width, e.put(r, i)), i;
}
function iv(r, t, e, i) {
  var n = re(r, t), a = Sf(t), o = ia(0, n, e), s = Qi(0, a, i), l = new at(o, s, n, a);
  return l;
}
function bf(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return iv(n[0], t, e, i);
  for (var o = new at(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = iv(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function ia(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function Qi(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Sf(r) {
  return re("国", r);
}
function Ge(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function ys(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, h = "left", f = "top";
  if (i instanceof Array)
    l += Ge(i[0], e.width), u += Ge(i[1], e.height), h = null, f = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, h = "right", f = "middle";
        break;
      case "right":
        l += n + o, u += s, f = "middle";
        break;
      case "top":
        l += o / 2, u -= n, h = "center", f = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, h = "center";
        break;
      case "inside":
        l += o / 2, u += s, h = "center", f = "middle";
        break;
      case "insideLeft":
        l += n, u += s, f = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, h = "right", f = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, h = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, h = "center", f = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, h = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, f = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, h = "right", f = "bottom";
        break;
    }
  return r = r || {}, r.x = l, r.y = u, r.align = h, r.verticalAlign = f, r;
}
var Hl = "__zr_normal__", Gl = Aa.concat(["ignore"]), Bb = Mn(Aa, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), ki = {}, Nb = new at(0, 0, 0, 0), Gs = function() {
  function r(t) {
    this.id = $g(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return r.prototype._init = function(t) {
    this.attr(t);
  }, r.prototype.drift = function(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.markRedraw();
  }, r.prototype.beforeUpdate = function() {
  }, r.prototype.afterUpdate = function() {
  }, r.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, r.prototype.updateInnerText = function(t) {
    var e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = e.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = n ? this : null;
      var u = !1;
      if (a.copyTransform(e), i.position != null) {
        var h = Nb;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), n || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ki, i, h) : ys(ki, i, h), a.x = ki.x, a.y = ki.y, o = ki.align, s = ki.verticalAlign;
        var f = i.origin;
        if (f && i.rotation != null) {
          var v = void 0, c = void 0;
          f === "center" ? (v = h.width * 0.5, c = h.height * 0.5) : (v = Ge(f[0], h.width), c = Ge(f[1], h.height)), u = !0, a.originX = -a.x + v + (n ? 0 : h.x), a.originY = -a.y + c + (n ? 0 : h.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var p = i.offset;
      p && (a.x += p[0], a.y += p[1], u || (a.originX = -p[0], a.originY = -p[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, d = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      g && this.canBeInsideText() ? (y = i.insideFill, m = i.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = i.outsideFill, m = i.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== d.fill || m !== d.stroke || _ !== d.autoStroke || o !== d.align || s !== d.verticalAlign) && (l = !0, d.fill = y, d.stroke = m, d.autoStroke = _, d.align = o, d.verticalAlign = s, e.setDefaultTextStyle(d)), e.__dirty |= te, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? uh : lh;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && ge(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, ar(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, B(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (H(t))
      for (var i = t, n = dt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== Hl)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, Gl);
  }, r.prototype._savePrimaryToNormal = function(t, e, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in e) && (e[a] = this[a]);
    }
  }, r.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, r.prototype.getState = function(t) {
    return this.states[t];
  }, r.prototype.ensureState = function(t) {
    var e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }, r.prototype.clearStates = function(t) {
    this.useState(Hl, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === Hl, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(ct(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          cf("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var f = this._textContent, v = this._textGuide;
        return f && f.useState(t, e, i, h), v && v.useState(t, e, i, h), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~te), u;
      }
    }
  }, r.prototype.useStates = function(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      var n = [], a = this.currentStates, o = t.length, s = o === a.length;
      if (s) {
        for (var l = 0; l < o; l++)
          if (t[l] !== a[l]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var l = 0; l < o; l++) {
        var u = t[l], h = void 0;
        this.stateProxy && (h = this.stateProxy(u, t)), h || (h = this.states[u]), h && n.push(h);
      }
      var f = n[o - 1], v = !!(f && f.hoverLayer || i);
      v && this._toggleHoverLayerFlag(!0);
      var c = this._mergeStates(n), p = this.stateTransition;
      this.saveCurrentToNormalState(c), this._applyStateObj(t.join(","), c, this._normalState, !1, !e && !this.__inHover && p && p.duration > 0, p);
      var g = this._textContent, d = this._textGuide;
      g && g.useStates(t, e, v), d && d.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~te);
    }
  }, r.prototype.isSilent = function() {
    for (var t = this.silent, e = this.parent; !t && e; ) {
      if (e.silent) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    return t;
  }, r.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, r.prototype.removeState = function(t) {
    var e = ct(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = ct(n, t), o = ct(n, e) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = e : i && !o && n.push(e), this.useStates(n);
  }, r.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, r.prototype._mergeStates = function(t) {
    for (var e = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      B(e, a), a.textConfig && (i = i || {}, B(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = B({}, n ? this.textConfig : i.textConfig), B(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, h = 0; h < Gl.length; h++) {
      var f = Gl[h], v = a && Bb[f];
      e && e[f] != null ? v ? (u = !0, l[f] = e[f]) : this[f] = e[f] : s && i[f] != null && (v ? (u = !0, l[f] = i[f]) : this[f] = i[f]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var c = this.animators[h], p = c.targetName;
        c.getLoop() || c.__changeFinalValue(p ? (e || i)[p] : e || i);
      }
    u && this._transitionState(t, l, o);
  }, r.prototype._attachComponent = function(t) {
    if (!(t.__zr && !t.__hostTarget) && t !== this) {
      var e = this.__zr;
      e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
    }
  }, r.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, r.prototype.getClipPath = function() {
    return this._clipPath;
  }, r.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, r.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, r.prototype.getTextContent = function() {
    return this._textContent;
  }, r.prototype.setTextContent = function(t) {
    var e = this._textContent;
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new _f(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), B(this.textConfig, t), this.markRedraw();
  }, r.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, r.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, r.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, r.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, r.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, r.prototype.markRedraw = function() {
    this.__dirty |= te;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, r.prototype.dirty = function() {
    this.markRedraw();
  }, r.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }, r.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.addAnimator(e[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, r.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.removeAnimator(e[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, r.prototype.animate = function(t, e, i) {
    var n = t ? this[t] : this, a = new mf(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = ct(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, r.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, r.prototype.stopAnimation = function(t, e) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(e) : a.push(s);
    }
    return this.animators = a, this;
  }, r.prototype.animateTo = function(t, e, i) {
    Wl(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    Wl(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = Wl(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = te;
    function e(i, n, a, o) {
      Object.defineProperty(t, i, {
        get: function() {
          if (!this[n]) {
            var l = this[n] = [];
            s(this, l);
          }
          return this[n];
        },
        set: function(l) {
          this[a] = l[0], this[o] = l[1], this[n] = l, s(this, l);
        }
      });
      function s(l, u) {
        Object.defineProperty(u, 0, {
          get: function() {
            return l[a];
          },
          set: function(h) {
            l[a] = h;
          }
        }), Object.defineProperty(u, 1, {
          get: function() {
            return l[o];
          },
          set: function(h) {
            l[o] = h;
          }
        });
      }
    }
    Object.defineProperty && (e("position", "_legacyPos", "x", "y"), e("scale", "_legacyScale", "scaleX", "scaleY"), e("origin", "_legacyOrigin", "originX", "originY"));
  }(), r;
}();
qe(Gs, Ze);
qe(Gs, _f);
function Wl(r, t, e, i, n) {
  e = e || {};
  var a = [];
  ny(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, f = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(p, g) {
    e.during(g);
  });
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    h && c.done(h), f && c.aborted(f), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function Ul(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function $b(r) {
  return Zt(r[0]);
}
function zb(r, t, e) {
  if (Zt(t[e]))
    if (Zt(r[e]) || (r[e] = []), Kt(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), Ul(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if ($b(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? Ul(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        Ul(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function Fb(r, t) {
  return r === t || Zt(r) && Zt(t) && Vb(r, t);
}
function Vb(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function ny(r, t, e, i, n, a, o, s) {
  for (var l = dt(i), u = n.duration, h = n.delay, f = n.additive, v = n.setToFinal, c = !H(a), p = r.animators, g = [], d = 0; d < l.length; d++) {
    var y = l[d], m = i[y];
    if (m != null && e[y] != null && (c || a[y]))
      if (H(m) && !Zt(m) && !Vs(m)) {
        if (t) {
          s || (e[y] = m, r.updateDuringAnimation(t));
          continue;
        }
        ny(r, y, e[y], m, n, a && a[y], o, s);
      } else
        g.push(y);
    else s || (e[y] = m, r.updateDuringAnimation(t), g.push(y));
  }
  var _ = g.length;
  if (!f && _)
    for (var b = 0; b < p.length; b++) {
      var w = p[b];
      if (w.targetName === t) {
        var S = w.stopTracks(g);
        if (S) {
          var x = ct(p, w);
          p.splice(x, 1);
        }
      }
    }
  if (n.force || (g = Pt(g, function(T) {
    return !Fb(i[T], e[T]);
  }), _ = g.length), _ > 0 || n.force && !o.length) {
    var M = void 0, D = void 0, A = void 0;
    if (s) {
      D = {}, v && (M = {});
      for (var b = 0; b < _; b++) {
        var y = g[b];
        D[y] = e[y], v ? M[y] = i[y] : e[y] = i[y];
      }
    } else if (v) {
      A = {};
      for (var b = 0; b < _; b++) {
        var y = g[b];
        A[y] = Uo(e[y]), zb(e, i, y);
      }
    }
    var w = new mf(e, !1, !1, f ? Pt(p, function(I) {
      return I.targetName === t;
    }) : null);
    w.targetName = t, n.scope && (w.scope = n.scope), v && M && w.whenWithKeys(0, M, g), A && w.whenWithKeys(0, A, g), w.whenWithKeys(u ?? 500, s ? D : i, g).delay(h || 0), r.addAnimator(w, t), o.push(w);
  }
}
var Tt = function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(e) {
    return this._children[e];
  }, t.prototype.childOfName = function(e) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === e)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(e) {
    return e && e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), this;
  }, t.prototype.addBefore = function(e, i) {
    if (e && e !== this && e.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, e), this._doAdd(e));
    }
    return this;
  }, t.prototype.replace = function(e, i) {
    var n = ct(this._children, e);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(e, i) {
    var n = this._children, a = n[i];
    if (e && e !== this && e.parent !== this && e !== a) {
      n[i] = e, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(e);
    }
    return this;
  }, t.prototype._doAdd = function(e) {
    e.parent && e.parent.remove(e), e.parent = this;
    var i = this.__zr;
    i && i !== e.__zr && e.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(e) {
    var i = this.__zr, n = this._children, a = ct(n, e);
    return a < 0 ? this : (n.splice(a, 1), e.parent = null, i && e.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var e = this._children, i = this.__zr, n = 0; n < e.length; n++) {
      var a = e[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return e.length = 0, this;
  }, t.prototype.eachChild = function(e, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      e.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(e, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = e.call(i, a);
      a.isGroup && !o && a.traverse(e, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(e);
    }
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(e);
    }
  }, t.prototype.getBoundingRect = function(e) {
    for (var i = new at(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (at.applyTransform(i, u, h), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(Gs);
Tt.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var Zo = {}, ay = {};
function Hb(r) {
  delete ay[r];
}
function Gb(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return ds(r, 1) < sh;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += ds(t[n].color, 1);
    return e /= i, e < sh;
  }
  return !1;
}
var Wb = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new ob(), o = i.renderer || "canvas";
    Zo[o] || (o = dt(Zo)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new Zo[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !Y.node && !Y.worker && !l ? new Eb(s.getViewportRoot(), s.root) : null, h = i.useCoarsePointer, f = h == null || h === "auto" ? Y.touchEventsSupported : !!h, v = 44, c;
    f && (c = J(i.pointerSize, v)), this.handler = new Ug(a, s, u, s.root, c), this.animation = new Mb({
      stage: {
        update: l ? null : function() {
          return n._flush(!0);
        }
      }
    }), l || this.animation.start();
  }
  return r.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, r.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, r.prototype.configLayer = function(t, e) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, e), this.refresh());
  }, r.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = Gb(t));
  }, r.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, r.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, r.prototype.isDarkMode = function() {
    return this._darkMode;
  }, r.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, r.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, r.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, r.prototype._flush = function(t) {
    var e, i = tn();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = tn();
    e ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, r.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, r.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, r.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, r.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
  }, r.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, r.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, r.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, r.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, r.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, r.prototype.findHover = function(t, e) {
    if (!this._disposed)
      return this.handler.findHover(t, e);
  }, r.prototype.on = function(t, e, i) {
    return this._disposed || this.handler.on(t, e, i), this;
  }, r.prototype.off = function(t, e) {
    this._disposed || this.handler.off(t, e);
  }, r.prototype.trigger = function(t, e) {
    this._disposed || this.handler.trigger(t, e);
  }, r.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), e = 0; e < t.length; e++)
        t[e] instanceof Tt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Hb(this.id));
  }, r;
}();
function nv(r, t) {
  var e = new Wb($g(), r, t);
  return ay[e.id] = e, e;
}
function Ub(r, t) {
  Zo[r] = t;
}
var av = 1e-4, oy = 20;
function Yb(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function sr(r, t, e, i) {
  var n = t[0], a = t[1], o = e[0], s = e[1], l = a - n, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (i)
    if (l > 0) {
      if (r <= n)
        return o;
      if (r >= a)
        return s;
    } else {
      if (r >= n)
        return o;
      if (r <= a)
        return s;
    }
  else {
    if (r === n)
      return o;
    if (r === a)
      return s;
  }
  return (r - n) / l * u + o;
}
function Vt(r, t) {
  switch (r) {
    case "center":
    case "middle":
      r = "50%";
      break;
    case "left":
    case "top":
      r = "0%";
      break;
    case "right":
    case "bottom":
      r = "100%";
      break;
  }
  return V(r) ? Yb(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function Ct(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), oy), r = (+r).toFixed(t), e ? r : +r;
}
function sy(r) {
  return r.sort(function(t, e) {
    return t - e;
  }), r;
}
function rr(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return Xb(r);
}
function Xb(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function qb(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function Zb(r, t) {
  var e = Math.max(rr(r), rr(t)), i = r + t;
  return e > oy ? i : Ct(i, e);
}
function ly(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function ms(r) {
  return r > -av && r < av;
}
var Kb = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function lr(r) {
  if (r instanceof Date)
    return r;
  if (V(r)) {
    var t = Kb.exec(r);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var e = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (e -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, e, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (r == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(r));
}
function Qb(r) {
  return Math.pow(10, wf(r));
}
function wf(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function uy(r, t) {
  var e = wf(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function ov(r) {
  r.sort(function(l, u) {
    return s(l, u, 0) ? -1 : 1;
  });
  for (var t = -1 / 0, e = 1, i = 0; i < r.length; ) {
    for (var n = r[i].interval, a = r[i].close, o = 0; o < 2; o++)
      n[o] <= t && (n[o] = t, a[o] = o ? 1 : 1 - e), t = n[o], e = a[o];
    n[0] === n[1] && a[0] * a[1] !== 1 ? r.splice(i, 1) : i++;
  }
  return r;
  function s(l, u, h) {
    return l.interval[h] < u.interval[h] || l.interval[h] === u.interval[h] && (l.close[h] - u.close[h] === (h ? -1 : 1) || !h && s(l, u, 1));
  }
}
function _s(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !V(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function jb(r) {
  return !isNaN(_s(r));
}
function hy() {
  return Math.round(Math.random() * 9);
}
function fy(r, t) {
  return t === 0 ? r : fy(t, r % t);
}
function sv(r, t) {
  return r == null ? t : t == null ? r : r * t / fy(r, t);
}
function Xt(r) {
  throw new Error(r);
}
function lv(r, t, e) {
  return (t - r) * e + r;
}
var cy = "series\0", Jb = "\0_ec_\0";
function Et(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function uv(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var hv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function Xa(r) {
  return H(r) && !$(r) && !(r instanceof Date) ? r.value : r;
}
function tS(r) {
  return H(r) && !(r instanceof Array);
}
function eS(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = Q();
  C(t, function(l, u) {
    if (!H(l)) {
      t[u] = null;
      return;
    }
  });
  var s = rS(r, o, e);
  return (i || n) && iS(s, r, o, t), i && nS(s, t), i || n ? aS(s, t, n) : a && oS(s, t), sS(s), s;
}
function rS(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Ia(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function iS(r, t, e, i) {
  C(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = ca(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        He(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function nS(r, t) {
  C(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Ia(e) && !Ia(a) && vy("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function aS(r, t, e) {
  C(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Ia(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !vy("id", i, n.existing));
      )
        a++;
      n ? (n.newOption = i, n.brandNew = e) : r.push({
        newOption: i,
        brandNew: e,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function oS(r, t) {
  C(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function sS(r) {
  var t = Q();
  C(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), C(r, function(e) {
    var i = e.newOption;
    He(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), C(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (H(a)) {
      if (o.name = a.name != null ? ca(a.name) : n ? n.name : cy + i, n)
        o.id = ca(n.id);
      else if (a.id != null)
        o.id = ca(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (t.get(o.id));
      }
      t.set(o.id, e);
    }
  });
}
function vy(r, t, e) {
  var i = Ae(t[r], null), n = Ae(e[r], null);
  return i != null && n != null && i === n;
}
function ca(r) {
  return Ae(r, "");
}
function Ae(r, t) {
  return r == null ? t : V(r) ? r : gt(r) || Xu(r) ? r + "" : t;
}
function xf(r) {
  var t = r.name;
  return !!(t && t.indexOf(cy));
}
function Ia(r) {
  return r && r.id != null && ca(r.id).indexOf(Jb) === 0;
}
function lS(r, t, e) {
  C(r, function(i) {
    var n = i.newOption;
    H(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = uS(t, n, i.existing, e));
  });
}
function uS(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function hS(r, t) {
  var e = {}, i = {};
  return n(r || [], e), n(t || [], i, e), [a(e), a(i)];
  function n(o, s, l) {
    for (var u = 0, h = o.length; u < h; u++) {
      var f = Ae(o[u].seriesId, null);
      if (f == null)
        return;
      for (var v = Et(o[u].dataIndex), c = l && l[f], p = 0, g = v.length; p < g; p++) {
        var d = v[p];
        c && c[d] ? c[d] = null : (s[f] || (s[f] = {}))[d] = 1;
      }
    }
  }
  function a(o, s) {
    var l = [];
    for (var u in o)
      if (o.hasOwnProperty(u) && o[u] != null)
        if (s)
          l.push(+u);
        else {
          var h = a(o[u], !0);
          h.length && l.push({
            seriesId: u,
            dataIndex: h
          });
        }
    return l;
  }
}
function Ti(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return $(t.dataIndex) ? U(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return $(t.name) ? U(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function At() {
  var r = "__ec_inner_" + fS++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var fS = hy();
function Yl(r, t, e) {
  var i = Tf(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, h) {
    var f = qa(r, h, u, {
      useDefault: l === h,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[h + "Models"] = f.models, s[h + "Model"] = f.models[0];
  }), s;
}
function Tf(r, t) {
  var e;
  if (V(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = Q(), a = {}, o = !1;
  return C(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], h = u[1], f = (u[2] || "").toLowerCase();
    if (!(!h || !f || t && t.includeMainTypes && ct(t.includeMainTypes, h) < 0)) {
      o = o || !!h;
      var v = n.get(h) || n.set(h, {});
      v[f] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var Me = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function qa(r, t, e, i) {
  i = i || Me;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (He(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (He(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function py(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function cS(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function vS(r) {
  return r === "auto" ? Y.domSupported ? "html" : "richText" : r || "html";
}
function pS(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (gt(i)) {
    var o = lv(e || 0, i, n);
    return Ct(o, a ? Math.max(rr(e || 0), rr(i)) : t);
  } else {
    if (V(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, h = Math.max(l ? l.length : 0, u.length), f = 0; f < h; ++f) {
      var v = r.getDimensionInfo(f);
      if (v && v.type === "ordinal")
        s[f] = (n < 1 && l ? l : u)[f];
      else {
        var c = l && l[f] ? l[f] : 0, p = u[f], o = lv(c, p, n);
        s[f] = Ct(o, a ? Math.max(rr(c), rr(p)) : t);
      }
    }
    return s;
  }
}
var dS = ".", qr = "___EC__COMPONENT__CONTAINER___", dy = "___EC__EXTENDED_CLASS___";
function Fe(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(dS);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function gS(r) {
  He(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function yS(r) {
  return !!(r && r[dy]);
}
function Cf(r, t) {
  r.$constructor = r, r.extend = function(e) {
    var i = this, n;
    return mS(i) ? n = /** @class */
    function(a) {
      N(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, S1(n, this)), B(n.prototype, e), n[dy] = !0, n.extend = this.extend, n.superCall = SS, n.superApply = wS, n.superClass = i, n;
  };
}
function mS(r) {
  return q(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function gy(r, t) {
  r.extend = t.extend;
}
var _S = Math.round(Math.random() * 10);
function bS(r) {
  var t = ["__\0is_clz", _S++].join("_");
  r.prototype[t] = !0, r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function SS(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function wS(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function Ws(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      gS(n), i.prototype.type = n;
      var a = Fe(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== qr) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[qr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Fe(i), a = [], o = t[n.main];
    return o && o[qr] ? C(o, function(s, l) {
      l !== qr && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Fe(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return C(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Fe(i), a = t[n.main];
    return a && a[qr];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[qr]) && (n = t[i.main] = {}, n[qr] = !0), n;
  }
}
function La(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && ct(n, l) >= 0 || a && ct(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var xS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], TS = La(xS), CS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return TS(this, t, e);
    }, r;
  }()
), hh = new Ya(50);
function MS(r) {
  if (typeof r == "string") {
    var t = hh.get(r);
    return t && t.image;
  } else
    return r;
}
function yy(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = hh.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !Us(t) && a.pending.push(o)) : (t = Br.loadImage(r, fv, fv), t.__zrImageSrc = r, hh.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function fv() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function Us(r) {
  return r && r.width && r.height;
}
var Xl = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function DS(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = my(e, i, n, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    _y(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function my(r, t, e, i) {
  i = i || {};
  var n = B({}, i);
  n.font = t, e = J(e, "..."), n.maxIterations = J(i.maxIterations, 2);
  var a = n.minChar = J(i.minChar, 0);
  n.cnCharWidth = re("国", t);
  var o = n.ascCharWidth = re("a", t);
  n.placeholder = J(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = re(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function _y(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = re(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? AS(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = re(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function AS(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function IS(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Sf(n), s = J(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, f = t.width, v;
  f != null && (e === "break" || e === "breakAll") ? v = r ? by(r, t.font, f, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var c = v.length * s, p = J(t.height, c);
  if (c > p && u) {
    var g = Math.floor(p / s);
    h = h || v.length > g, v = v.slice(0, g);
  }
  if (r && a && f != null)
    for (var d = my(f, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < v.length; m++)
      _y(y, v[m], d), v[m] = y.textLine, h = h || y.isTruncated;
  for (var _ = p, b = 0, m = 0; m < v.length; m++)
    b = Math.max(re(v[m], n), b);
  f == null && (f = b);
  var w = b;
  return i && (_ += i[0] + i[2], w += i[1] + i[3], f += i[1] + i[3]), l && (w = f), {
    lines: v,
    height: p,
    outerWidth: w,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: b,
    contentHeight: c,
    width: f,
    isTruncated: h
  };
}
var LS = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), cv = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), PS = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
}();
function RS(r, t) {
  var e = new PS();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = Xl.lastIndex = 0, l; (l = Xl.exec(r)) != null; ) {
    var u = l.index;
    u > s && ql(e, r.substring(s, u), t, o), ql(e, l[2], t, o, l[1]), s = Xl.lastIndex;
  }
  s < r.length && ql(e, r.substring(s, r.length), t, o);
  var h = [], f = 0, v = 0, c = t.padding, p = a === "truncate", g = t.lineOverflow === "truncate", d = {};
  function y(W, K, tt) {
    W.width = K, W.lineHeight = tt, f += tt, v = Math.max(v, K);
  }
  t: for (var m = 0; m < e.lines.length; m++) {
    for (var _ = e.lines[m], b = 0, w = 0, S = 0; S < _.tokens.length; S++) {
      var x = _.tokens[S], M = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = M.padding, A = D ? D[1] + D[3] : 0, T = x.font = M.font || t.font;
      x.contentHeight = Sf(T);
      var I = J(M.height, x.contentHeight);
      if (x.innerHeight = I, D && (I += D[0] + D[2]), x.height = I, x.lineHeight = Go(M.lineHeight, t.lineHeight, I), x.align = M && M.align || t.align, x.verticalAlign = M && M.verticalAlign || "middle", g && n != null && f + x.lineHeight > n) {
        var L = e.lines.length;
        S > 0 ? (_.tokens = _.tokens.slice(0, S), y(_, w, b), e.lines = e.lines.slice(0, m + 1)) : e.lines = e.lines.slice(0, m), e.isTruncated = e.isTruncated || e.lines.length < L;
        break t;
      }
      var P = M.width, R = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, h.push(x), x.contentWidth = re(x.text, T);
      else {
        if (R) {
          var O = M.backgroundColor, G = O && O.image;
          G && (G = MS(G), Us(G) && (x.width = Math.max(x.width, G.width * I / G.height)));
        }
        var k = p && i != null ? i - w : null;
        k != null && k < x.width ? !R || k < A ? (x.text = "", x.width = x.contentWidth = 0) : (DS(d, x.text, k - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = d.text, e.isTruncated = e.isTruncated || d.isTruncated, x.width = x.contentWidth = re(x.text, T)) : x.contentWidth = re(x.text, T);
      }
      x.width += A, w += x.width, M && (b = Math.max(b, x.lineHeight));
    }
    y(_, w, b);
  }
  e.outerWidth = e.width = J(i, v), e.outerHeight = e.height = J(n, f), e.contentHeight = f, e.contentWidth = v, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], z = x.percentWidth;
    x.width = parseInt(z, 10) / 100 * e.width;
  }
  return e;
}
function ql(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, h, f;
  if (i) {
    var v = o.padding, c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var p = Ge(o.width, i.width) + c;
      s.length > 0 && p + i.accumWidth > i.width && (h = t.split(`
`), u = !0), i.accumWidth = p;
    } else {
      var g = by(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + c, f = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var d = 0; d < h.length; d++) {
    var y = h[d], m = new LS();
    if (m.styleName = n, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = f ? f[d] : re(y, l), !d && !u) {
      var _ = (s[s.length - 1] || (s[0] = new cv())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new cv([m]));
  }
}
function ES(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var OS = Mn(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function kS(r) {
  return ES(r) ? !!OS[r] : !0;
}
function by(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, f = 0; f < r.length; f++) {
    var v = r.charAt(f);
    if (v === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var c = re(v, t), p = i ? !1 : !kS(v);
    if (a.length ? h + c > e : n + h + c > e) {
      h ? (s || l) && (p ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += v, u += c, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = v, h = c)) : p ? (a.push(l), o.push(u), l = v, u = c) : (a.push(v), o.push(c));
      continue;
    }
    h += c, p ? (l += v, u += c) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += n), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var fh = "__zr_style_" + Math.round(Math.random() * 10), mi = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Ys = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
mi[fh] = !0;
var vv = ["z", "z2", "invisible"], BS = ["invisible"], Za = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = dt(e), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(e[a]) : r.prototype.attrKV.call(this, a, e[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(e, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && NS(this, e, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, t.prototype.contain = function(e, i) {
    return this.rectContain(e, i);
  }, t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.rectContain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var e = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      e = this._paintRect || (this._paintRect = new at(0, 0, 0, 0)), i ? at.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new at(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : B(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= ea, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & ea);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~ea;
  }, t.prototype.createStyle = function(e) {
    return Hs(mi, e);
  }, t.prototype.useStyle = function(e) {
    e[fh] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[fh];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, vv);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var f = dt(h), v = 0; v < f.length; v++) {
            var c = f[v];
            c in u && (u[c] = u[c], this.style[c] = h[c]);
          }
        for (var p = dt(u), v = 0; v < p.length; v++) {
          var c = p[v];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? BS : vv, v = 0; v < g.length; v++) {
      var c = g[v];
      i && i[c] != null ? this[c] = i[c] : l && n[c] != null && (this[c] = n[c]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return B(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return Ys;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = te | ea;
  }(), t;
}(Gs), Zl = new at(0, 0, 0, 0), Kl = new at(0, 0, 0, 0);
function NS(r, t, e) {
  return Zl.copy(r.getBoundingRect()), r.transform && Zl.applyTransform(r.transform), Kl.width = t, Kl.height = e, !Zl.intersect(Kl);
}
var ce = Math.min, ve = Math.max, Ql = Math.sin, jl = Math.cos, Zr = Math.PI * 2, uo = Dn(), ho = Dn(), fo = Dn();
function pv(r, t, e, i, n, a) {
  n[0] = ce(r, e), n[1] = ce(t, i), a[0] = ve(r, e), a[1] = ve(t, i);
}
var dv = [], gv = [];
function $S(r, t, e, i, n, a, o, s, l, u) {
  var h = Kg, f = Rt, v = h(r, e, n, o, dv);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var c = 0; c < v; c++) {
    var p = f(r, e, n, o, dv[c]);
    l[0] = ce(p, l[0]), u[0] = ve(p, u[0]);
  }
  v = h(t, i, a, s, gv);
  for (var c = 0; c < v; c++) {
    var g = f(t, i, a, s, gv[c]);
    l[1] = ce(g, l[1]), u[1] = ve(g, u[1]);
  }
  l[0] = ce(r, l[0]), u[0] = ve(r, u[0]), l[0] = ce(o, l[0]), u[0] = ve(o, u[0]), l[1] = ce(t, l[1]), u[1] = ve(t, u[1]), l[1] = ce(s, l[1]), u[1] = ve(s, u[1]);
}
function zS(r, t, e, i, n, a, o, s) {
  var l = Qg, u = Yt, h = ve(ce(l(r, e, n), 1), 0), f = ve(ce(l(t, i, a), 1), 0), v = u(r, e, n, h), c = u(t, i, a, f);
  o[0] = ce(r, n, v), o[1] = ce(t, a, c), s[0] = ve(r, n, v), s[1] = ve(t, a, c);
}
function FS(r, t, e, i, n, a, o, s, l) {
  var u = ji, h = Ji, f = Math.abs(n - a);
  if (f % Zr < 1e-4 && f > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (uo[0] = jl(n) * e + r, uo[1] = Ql(n) * i + t, ho[0] = jl(a) * e + r, ho[1] = Ql(a) * i + t, u(s, uo, ho), h(l, uo, ho), n = n % Zr, n < 0 && (n = n + Zr), a = a % Zr, a < 0 && (a = a + Zr), n > a && !o ? a += Zr : n < a && o && (n += Zr), o) {
    var v = a;
    a = n, n = v;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && (fo[0] = jl(c) * e + r, fo[1] = Ql(c) * i + t, u(s, fo, s), h(l, fo, l));
}
var nt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Kr = [], Qr = [], Ee = [], mr = [], Oe = [], ke = [], Jl = Math.min, tu = Math.max, jr = Math.cos, Jr = Math.sin, Je = Math.abs, ch = Math.PI, Dr = ch * 2, eu = typeof Float32Array < "u", zn = [];
function ru(r) {
  var t = Math.round(r / ch * 1e8) / 1e8;
  return t % 2 * ch;
}
function VS(r, t) {
  var e = ru(r[0]);
  e < 0 && (e += Dr);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= Dr ? n = e + Dr : t && e - n >= Dr ? n = e - Dr : !t && e > n ? n = e + (Dr - ru(e - n)) : t && e < n && (n = e - (Dr - ru(n - e))), r[0] = e, r[1] = n;
}
var Ci = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Je(i / gs / t) || 0, this._uy = Je(i / gs / e) || 0);
  }, r.prototype.setDPR = function(t) {
    this.dpr = t;
  }, r.prototype.setContext = function(t) {
    this._ctx = t;
  }, r.prototype.getContext = function() {
    return this._ctx;
  }, r.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, r.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, r.prototype.moveTo = function(t, e) {
    return this._drawPendingPt(), this.addData(nt.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = Je(t - this._xi), n = Je(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(nt.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(nt.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(nt.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), zn[0] = n, zn[1] = a, VS(zn, o), n = zn[0], a = zn[1];
    var s = a - n;
    return this.addData(nt.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = jr(a) * i + t, this._yi = Jr(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(nt.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(nt.Z);
    var t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }, r.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, r.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.setData = function(t) {
    var e = t.length;
    !(this.data && this.data.length === e) && eu && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    eu && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var h = this.data;
      this._len + arguments.length > h.length && (this._expandData(), h = this.data);
      for (var f = 0; f < arguments.length; f++)
        h[this._len++] = arguments[f];
    }
  }, r.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, r.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }, r.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, eu && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    Ee[0] = Ee[1] = Oe[0] = Oe[1] = Number.MAX_VALUE, mr[0] = mr[1] = ke[0] = ke[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case nt.M:
          e = n = t[o++], i = a = t[o++], Oe[0] = n, Oe[1] = a, ke[0] = n, ke[1] = a;
          break;
        case nt.L:
          pv(e, i, t[o], t[o + 1], Oe, ke), e = t[o++], i = t[o++];
          break;
        case nt.C:
          $S(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Oe, ke), e = t[o++], i = t[o++];
          break;
        case nt.Q:
          zS(e, i, t[o++], t[o++], t[o], t[o + 1], Oe, ke), e = t[o++], i = t[o++];
          break;
        case nt.A:
          var u = t[o++], h = t[o++], f = t[o++], v = t[o++], c = t[o++], p = t[o++] + c;
          o += 1;
          var g = !t[o++];
          l && (n = jr(c) * f + u, a = Jr(c) * v + h), FS(u, h, f, v, c, p, g, Oe, ke), e = jr(p) * f + u, i = Jr(p) * v + h;
          break;
        case nt.R:
          n = e = t[o++], a = i = t[o++];
          var d = t[o++], y = t[o++];
          pv(n, a, n + d, a + y, Oe, ke);
          break;
        case nt.Z:
          e = n, i = a;
          break;
      }
      ji(Ee, Ee, Oe), Ji(mr, mr, ke);
    }
    return o === 0 && (Ee[0] = Ee[1] = mr[0] = mr[1] = 0), new at(Ee[0], Ee[1], mr[0] - Ee[0], mr[1] - Ee[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, f = 0, v = 0; v < e; ) {
      var c = t[v++], p = v === 1;
      p && (a = t[v], o = t[v + 1], s = a, l = o);
      var g = -1;
      switch (c) {
        case nt.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case nt.L: {
          var d = t[v++], y = t[v++], m = d - a, _ = y - o;
          (Je(m) > i || Je(_) > n || v === e - 1) && (g = Math.sqrt(m * m + _ * _), a = d, o = y);
          break;
        }
        case nt.C: {
          var b = t[v++], w = t[v++], d = t[v++], y = t[v++], S = t[v++], x = t[v++];
          g = lb(a, o, b, w, d, y, S, x, 10), a = S, o = x;
          break;
        }
        case nt.Q: {
          var b = t[v++], w = t[v++], d = t[v++], y = t[v++];
          g = fb(a, o, b, w, d, y, 10), a = d, o = y;
          break;
        }
        case nt.A:
          var M = t[v++], D = t[v++], A = t[v++], T = t[v++], I = t[v++], L = t[v++], P = L + I;
          v += 1, p && (s = jr(I) * A + M, l = Jr(I) * T + D), g = tu(A, T) * Jl(Dr, Math.abs(L)), a = jr(P) * A + M, o = Jr(P) * T + D;
          break;
        case nt.R: {
          s = a = t[v++], l = o = t[v++];
          var R = t[v++], O = t[v++];
          g = R * 2 + O * 2;
          break;
        }
        case nt.Z: {
          var m = s - a, _ = l - o;
          g = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[f++] = g, h += g);
    }
    return this._pathLen = h, h;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, h, f, v, c = e < 1, p, g, d = 0, y = 0, m, _ = 0, b, w;
    if (!(c && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, g = this._pathLen, m = e * g, !m)))
      t: for (var S = 0; S < o; ) {
        var x = i[S++], M = S === 1;
        switch (M && (u = i[S], h = i[S + 1], s = u, l = h), x !== nt.L && _ > 0 && (t.lineTo(b, w), _ = 0), x) {
          case nt.M:
            s = u = i[S++], l = h = i[S++], t.moveTo(u, h);
            break;
          case nt.L: {
            f = i[S++], v = i[S++];
            var D = Je(f - u), A = Je(v - h);
            if (D > n || A > a) {
              if (c) {
                var T = p[y++];
                if (d + T > m) {
                  var I = (m - d) / T;
                  t.lineTo(u * (1 - I) + f * I, h * (1 - I) + v * I);
                  break t;
                }
                d += T;
              }
              t.lineTo(f, v), u = f, h = v, _ = 0;
            } else {
              var L = D * D + A * A;
              L > _ && (b = f, w = v, _ = L);
            }
            break;
          }
          case nt.C: {
            var P = i[S++], R = i[S++], O = i[S++], G = i[S++], k = i[S++], z = i[S++];
            if (c) {
              var T = p[y++];
              if (d + T > m) {
                var I = (m - d) / T;
                vs(u, P, O, k, I, Kr), vs(h, R, G, z, I, Qr), t.bezierCurveTo(Kr[1], Qr[1], Kr[2], Qr[2], Kr[3], Qr[3]);
                break t;
              }
              d += T;
            }
            t.bezierCurveTo(P, R, O, G, k, z), u = k, h = z;
            break;
          }
          case nt.Q: {
            var P = i[S++], R = i[S++], O = i[S++], G = i[S++];
            if (c) {
              var T = p[y++];
              if (d + T > m) {
                var I = (m - d) / T;
                ps(u, P, O, I, Kr), ps(h, R, G, I, Qr), t.quadraticCurveTo(Kr[1], Qr[1], Kr[2], Qr[2]);
                break t;
              }
              d += T;
            }
            t.quadraticCurveTo(P, R, O, G), u = O, h = G;
            break;
          }
          case nt.A:
            var W = i[S++], K = i[S++], tt = i[S++], ft = i[S++], yt = i[S++], bt = i[S++], be = i[S++], zr = !i[S++], Pi = tt > ft ? tt : ft, jt = Je(tt - ft) > 1e-3, Lt = yt + bt, Z = !1;
            if (c) {
              var T = p[y++];
              d + T > m && (Lt = yt + bt * (m - d) / T, Z = !0), d += T;
            }
            if (jt && t.ellipse ? t.ellipse(W, K, tt, ft, be, yt, Lt, zr) : t.arc(W, K, Pi, yt, Lt, zr), Z)
              break t;
            M && (s = jr(yt) * tt + W, l = Jr(yt) * ft + K), u = jr(Lt) * tt + W, h = Jr(Lt) * ft + K;
            break;
          case nt.R:
            s = u = i[S], l = h = i[S + 1], f = i[S++], v = i[S++];
            var et = i[S++], Fr = i[S++];
            if (c) {
              var T = p[y++];
              if (d + T > m) {
                var zt = m - d;
                t.moveTo(f, v), t.lineTo(f + Jl(zt, et), v), zt -= et, zt > 0 && t.lineTo(f + et, v + Jl(zt, Fr)), zt -= Fr, zt > 0 && t.lineTo(f + tu(et - zt, 0), v + Fr), zt -= et, zt > 0 && t.lineTo(f, v + tu(Fr - zt, 0));
                break t;
              }
              d += T;
            }
            t.rect(f, v, et, Fr);
            break;
          case nt.Z:
            if (c) {
              var T = p[y++];
              if (d + T > m) {
                var I = (m - d) / T;
                t.lineTo(u * (1 - I) + s * I, h * (1 - I) + l * I);
                break t;
              }
              d += T;
            }
            t.closePath(), u = s, h = l;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = nt, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function Bi(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    l = (t - i) / (r - e), u = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var h = l * a - o + u, f = h * h / (l * l + 1);
  return f <= s / 2 * s / 2;
}
function HS(r, t, e, i, n, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var f = l;
  if (h > t + f && h > i + f && h > a + f && h > s + f || h < t - f && h < i - f && h < a - f && h < s - f || u > r + f && u > e + f && u > n + f && u > o + f || u < r - f && u < e - f && u < n - f && u < o - f)
    return !1;
  var v = sb(r, t, e, i, n, a, o, s, u, h);
  return v <= f / 2;
}
function GS(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var h = hb(r, t, e, i, n, a, s, l);
  return h <= u / 2;
}
var yv = Math.PI * 2;
function co(r) {
  return r %= yv, r < 0 && (r += yv), r;
}
var Fn = Math.PI * 2;
function WS(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > e || h + u < e)
    return !1;
  if (Math.abs(i - n) % Fn < 1e-4)
    return !0;
  if (a) {
    var f = i;
    i = co(n), n = co(f);
  } else
    i = co(i), n = co(n);
  i > n && (n += Fn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += Fn), v >= i && v <= n || v + Fn >= i && v + Fn <= n;
}
function ti(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var _r = Ci.CMD, ei = Math.PI * 2, US = 1e-4;
function YS(r, t) {
  return Math.abs(r - t) < US;
}
var Ft = [-1, -1, -1], he = [-1, -1];
function XS() {
  var r = he[0];
  he[0] = he[1], he[1] = r;
}
function qS(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var h = cs(t, i, a, s, u, Ft);
  if (h === 0)
    return 0;
  for (var f = 0, v = -1, c = void 0, p = void 0, g = 0; g < h; g++) {
    var d = Ft[g], y = d === 0 || d === 1 ? 0.5 : 1, m = Rt(r, e, n, o, d);
    m < l || (v < 0 && (v = Kg(t, i, a, s, he), he[1] < he[0] && v > 1 && XS(), c = Rt(t, i, a, s, he[0]), v > 1 && (p = Rt(t, i, a, s, he[1]))), v === 2 ? d < he[0] ? f += c < t ? y : -y : d < he[1] ? f += p < c ? y : -y : f += s < p ? y : -y : d < he[0] ? f += c < t ? y : -y : f += s < c ? y : -y);
  }
  return f;
}
function ZS(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = ub(t, i, a, s, Ft);
  if (l === 0)
    return 0;
  var u = Qg(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, f = Yt(t, i, a, u), v = 0; v < l; v++) {
      var c = Ft[v] === 0 || Ft[v] === 1 ? 0.5 : 1, p = Yt(r, e, n, Ft[v]);
      p < o || (Ft[v] < u ? h += f < t ? c : -c : h += a < f ? c : -c);
    }
    return h;
  } else {
    var c = Ft[0] === 0 || Ft[0] === 1 ? 0.5 : 1, p = Yt(r, e, n, Ft[0]);
    return p < o ? 0 : a < t ? c : -c;
  }
}
function KS(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  Ft[0] = -l, Ft[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= ei - 1e-4) {
    i = 0, n = ei;
    var h = a ? 1 : -1;
    return o >= Ft[0] + r && o <= Ft[1] + r ? h : 0;
  }
  if (i > n) {
    var f = i;
    i = n, n = f;
  }
  i < 0 && (i += ei, n += ei);
  for (var v = 0, c = 0; c < 2; c++) {
    var p = Ft[c];
    if (p + r > o) {
      var g = Math.atan2(s, p), h = a ? 1 : -1;
      g < 0 && (g = ei + g), (g >= i && g <= n || g + ei >= i && g + ei <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), v += h);
    }
  }
  return v;
}
function Sy(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, h = 0, f = 0, v, c, p = 0; p < o; ) {
    var g = a[p++], d = p === 1;
    switch (g === _r.M && p > 1 && (e || (s += ti(l, u, h, f, i, n))), d && (l = a[p], u = a[p + 1], h = l, f = u), g) {
      case _r.M:
        h = a[p++], f = a[p++], l = h, u = f;
        break;
      case _r.L:
        if (e) {
          if (Bi(l, u, a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += ti(l, u, a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case _r.C:
        if (e) {
          if (HS(l, u, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += qS(l, u, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case _r.Q:
        if (e) {
          if (GS(l, u, a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += ZS(l, u, a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case _r.A:
        var y = a[p++], m = a[p++], _ = a[p++], b = a[p++], w = a[p++], S = a[p++];
        p += 1;
        var x = !!(1 - a[p++]);
        v = Math.cos(w) * _ + y, c = Math.sin(w) * b + m, d ? (h = v, f = c) : s += ti(l, u, v, c, i, n);
        var M = (i - y) * b / _ + y;
        if (e) {
          if (WS(y, m, b, w, w + S, x, t, M, n))
            return !0;
        } else
          s += KS(y, m, b, w, w + S, x, M, n);
        l = Math.cos(w + S) * _ + y, u = Math.sin(w + S) * b + m;
        break;
      case _r.R:
        h = l = a[p++], f = u = a[p++];
        var D = a[p++], A = a[p++];
        if (v = h + D, c = f + A, e) {
          if (Bi(h, f, v, f, t, i, n) || Bi(v, f, v, c, t, i, n) || Bi(v, c, h, c, t, i, n) || Bi(h, c, h, f, t, i, n))
            return !0;
        } else
          s += ti(v, f, v, c, i, n), s += ti(h, c, h, f, i, n);
        break;
      case _r.Z:
        if (e) {
          if (Bi(l, u, h, f, t, i, n))
            return !0;
        } else
          s += ti(l, u, h, f, i, n);
        l = h, u = f;
        break;
    }
  }
  return !e && !YS(u, f) && (s += ti(l, u, h, f, i, n) || 0), s !== 0;
}
function QS(r, t, e) {
  return Sy(r, 0, !1, t, e);
}
function jS(r, t, e, i) {
  return Sy(r, t, !0, e, i);
}
var wy = ot({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, mi), JS = {
  style: ot({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Ys.style)
}, iu = Aa.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ht = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.update = function() {
    var e = this;
    r.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(l) {
        e.buildPath(l, e.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < iu.length; ++s)
        n[iu[s]] = this[iu[s]];
      n.__dirty |= te;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = dt(e);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = e[o];
      o === "style" ? this.style ? B(this.style, s) : this.useStyle(s) : o === "shape" ? B(this.shape, s) : r.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var e = this.style.fill;
    if (e !== "none") {
      if (V(e)) {
        var i = ds(e, 0);
        return i > 0.5 ? lh : i > 0.2 ? Ob : uh;
      } else if (e)
        return uh;
    }
    return lh;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (V(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = ds(e, 0) < sh;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Ki;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Ci(!1);
  }, t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return !(i == null || i === "none" || !(e.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var e = this._rect, i = this.style, n = !e;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & Ki) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || n) {
        s.copy(e);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var h = this.strokeContainThreshold;
          u = Math.max(u, h ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return e;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect(), o = this.style;
    if (e = n[0], i = n[1], a.contain(e, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), jS(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return QS(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Ki, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(e) {
    return this.animate("shape", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e === "shape" ? this.setShape(i) : r.prototype.attrKV.call(this, e, i);
  }, t.prototype.setShape = function(e, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : B(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & Ki);
  }, t.prototype.createStyle = function(e) {
    return Hs(wy, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = B({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = B({}, n.shape), B(u, i.shape)) : (u = B({}, a ? this.shape : n.shape), B(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = B({}, this.shape);
        for (var h = {}, f = dt(u), v = 0; v < f.length; v++) {
          var c = f[v];
          typeof u[c] == "object" ? this.shape[c] = u[c] : h[c] = u[c];
        }
        this._transitionState(e, {
          shape: h
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return JS;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = function(a) {
      N(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return e.init && e.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return X(e.style);
      }, o.prototype.getDefaultShape = function() {
        return X(e.shape);
      }, o;
    }(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = te | ea | Ki;
  }(), t;
}(Za), tw = ot({
  strokeFirst: !0,
  font: wi,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, wy), bs = function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return i != null && i !== "none" && e.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(e) {
    return Hs(tw, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = bf(i, e.font, e.textAlign, e.textBaseline);
      if (n.x += e.x || 0, n.y += e.y || 0, this.hasStroke()) {
        var a = e.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.dirtyRectTolerance = 10;
  }(), t;
}(Za);
bs.prototype.type = "tspan";
var ew = ot({
  x: 0,
  y: 0
}, mi), rw = {
  style: ot({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Ys.style)
};
function iw(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var Ke = function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return Hs(ew, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = iw(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return rw;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new at(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(Za);
Ke.prototype.type = "image";
function nw(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, h;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var f;
  s + l > n && (f = s + l, s *= n / f, l *= n / f), u + h > n && (f = u + h, u *= n / f, h *= n / f), l + u > a && (f = l + u, l *= a / f, u *= a / f), s + h > a && (f = s + h, s *= a / f, h *= a / f), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + h, i + a), h !== 0 && r.arc(e + h, i + a - h, h, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var en = Math.round;
function xy(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (en(i * 2) === en(n * 2) && (r.x1 = r.x2 = pi(i, s, !0)), en(a * 2) === en(o * 2) && (r.y1 = r.y2 = pi(a, s, !0))), r;
  }
}
function Ty(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = pi(i, s, !0), r.y = pi(n, s, !0), r.width = Math.max(pi(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(pi(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function pi(r, t, e) {
  if (!t)
    return r;
  var i = en(r * 2);
  return (i + en(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var aw = /* @__PURE__ */ function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
}(), ow = {}, _t = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new aw();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Ty(ow, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? nw(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(ht);
_t.prototype.type = "rect";
var mv = {
  fill: "#000"
}, _v = 2, sw = {
  style: ot({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, Ys.style)
}, Dt = function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = mv, i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    r.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var e = 0; e < this._children.length; e++) {
      var i = this._children[e];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var e = this.innerTransformable;
    e ? (e.updateTransform(), e.transform && (this.transform = e.transform)) : r.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(e) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(e) : r.prototype.getLocalTransform.call(this, e);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), r.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, cw(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = e;
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var e = new at(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || mv;
  }, t.prototype.setTextContent = function(e) {
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return B(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = dt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, B(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return sw;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || wi, n = e.padding, a = Mv(e), o = IS(a, e), s = nu(e), l = !!e.backgroundColor, u = o.outerHeight, h = o.outerWidth, f = o.contentWidth, v = o.lines, c = o.lineHeight, p = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = e.x || 0, d = e.y || 0, y = e.align || p.align || "left", m = e.verticalAlign || p.verticalAlign || "top", _ = g, b = Qi(d, o.contentHeight, m);
    if (s || n) {
      var w = ia(g, h, y), S = Qi(d, u, m);
      s && this._renderBackground(e, e, w, S, h, u);
    }
    b += c / 2, n && (_ = Cv(g, y, n), m === "top" ? b += n[0] : m === "bottom" && (b -= n[2]));
    for (var x = 0, M = !1, D = Tv("fill" in e ? e.fill : (M = !0, p.fill)), A = xv("stroke" in e ? e.stroke : !l && (!p.autoStroke || M) ? (x = _v, p.stroke) : null), T = e.textShadowBlur > 0, I = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), L = o.calculatedLineHeight, P = 0; P < v.length; P++) {
      var R = this._getOrCreateChild(bs), O = R.createStyle();
      R.useStyle(O), O.text = v[P], O.x = _, O.y = b, O.textAlign = y, O.textBaseline = "middle", O.opacity = e.opacity, O.strokeFirst = !0, T && (O.shadowBlur = e.textShadowBlur || 0, O.shadowColor = e.textShadowColor || "transparent", O.shadowOffsetX = e.textShadowOffsetX || 0, O.shadowOffsetY = e.textShadowOffsetY || 0), O.stroke = A, O.fill = D, A && (O.lineWidth = e.lineWidth || x, O.lineDash = e.lineDash, O.lineDashOffset = e.lineDashOffset || 0), O.font = i, Sv(O, e), b += c, I && R.setBoundingRect(new at(ia(O.x, f, O.textAlign), Qi(O.y, L, O.textBaseline), f, L));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = Mv(e), n = RS(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, h = e.y || 0, f = this._defaultStyle, v = e.align || f.align, c = e.verticalAlign || f.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var p = ia(u, o, v), g = Qi(h, s, c), d = p, y = g;
    l && (d += l[3], y += l[0]);
    var m = d + a;
    nu(e) && this._renderBackground(e, e, p, g, o, s);
    for (var _ = !!e.backgroundColor, b = 0; b < n.lines.length; b++) {
      for (var w = n.lines[b], S = w.tokens, x = S.length, M = w.lineHeight, D = w.width, A = 0, T = d, I = m, L = x - 1, P = void 0; A < x && (P = S[A], !P.align || P.align === "left"); )
        this._placeToken(P, e, M, y, T, "left", _), D -= P.width, T += P.width, A++;
      for (; L >= 0 && (P = S[L], P.align === "right"); )
        this._placeToken(P, e, M, y, I, "right", _), D -= P.width, I -= P.width, L--;
      for (T += (a - (T - d) - (m - I) - D) / 2; A <= L; )
        P = S[A], this._placeToken(P, e, M, y, T + P.width / 2, "center", _), T += P.width, A++;
      y += M;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var h = e.verticalAlign, f = a + n / 2;
    h === "top" ? f = a + e.height / 2 : h === "bottom" && (f = a + n - e.height / 2);
    var v = !e.isLineHolder && nu(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, f - e.height / 2, e.width, e.height);
    var c = !!u.backgroundColor, p = e.textPadding;
    p && (o = Cv(o, s, p), f -= e.height / 2 - p[0] - e.innerHeight / 2);
    var g = this._getOrCreateChild(bs), d = g.createStyle();
    g.useStyle(d);
    var y = this._defaultStyle, m = !1, _ = 0, b = Tv("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, y.fill)), w = xv("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !c && !l && (!y.autoStroke || m) ? (_ = _v, y.stroke) : null), S = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    d.text = e.text, d.x = o, d.y = f, S && (d.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, d.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", d.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, d.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), d.textAlign = s, d.textBaseline = "middle", d.font = e.font || wi, d.opacity = Go(u.opacity, i.opacity, 1), Sv(d, u), w && (d.lineWidth = Go(u.lineWidth, i.lineWidth, _), d.lineDash = J(u.lineDash, i.lineDash), d.lineDashOffset = i.lineDashOffset || 0, d.stroke = w), b && (d.fill = b);
    var x = e.contentWidth, M = e.contentHeight;
    g.setBoundingRect(new at(ia(d.x, x, d.textAlign), Qi(d.y, M, d.textBaseline), x, M));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, h = e.borderColor, f = l && l.image, v = l && !f, c = e.borderRadius, p = this, g, d;
    if (v || e.lineHeight || u && h) {
      g = this._getOrCreateChild(_t), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = n, y.y = a, y.width = o, y.height = s, y.r = c, g.dirtyShape();
    }
    if (v) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = J(e.fillOpacity, 1);
    } else if (f) {
      d = this._getOrCreateChild(Ke), d.onload = function() {
        p.dirtyStyle();
      };
      var _ = d.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = J(e.strokeOpacity, 1), m.lineDash = e.borderDash, m.lineDashOffset = e.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || d).style;
    b.shadowBlur = e.shadowBlur || 0, b.shadowColor = e.shadowColor || "transparent", b.shadowOffsetX = e.shadowOffsetX || 0, b.shadowOffsetY = e.shadowOffsetY || 0, b.opacity = Go(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return fw(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      hw(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && ze(i) || e.textFont || e.font;
  }, t;
}(Za), lw = { left: !0, right: 1, center: 1 }, uw = { top: 1, bottom: 1, middle: 1 }, bv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function hw(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? uf + "px" : r + "px";
}
function Sv(r, t) {
  for (var e = 0; e < bv.length; e++) {
    var i = bv[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function fw(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function cw(r) {
  return wv(r), C(r.rich, wv), r;
}
function wv(r) {
  if (r) {
    r.font = Dt.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || lw[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || uw[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = zg(r.padding));
  }
}
function xv(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Tv(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Cv(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function Mv(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function nu(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var it = At(), vw = function(r, t, e, i) {
  if (i) {
    var n = it(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = it(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Dv = 1, Av = {}, Cy = At(), Mf = At(), Df = 0, Xs = 1, qs = 2, We = ["emphasis", "blur", "select"], Iv = ["normal", "emphasis", "blur", "select"], pw = 10, dw = 9, _i = "highlight", Ko = "downplay", va = "select", Qo = "unselect", pa = "toggleSelect";
function Ni(r) {
  return r != null && r !== "none";
}
function Zs(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function My(r) {
  Zs(r, "emphasis", qs);
}
function Dy(r) {
  r.hoverState === qs && Zs(r, "normal", Df);
}
function Af(r) {
  Zs(r, "blur", Xs);
}
function Ay(r) {
  r.hoverState === Xs && Zs(r, "normal", Df);
}
function gw(r) {
  r.selected = !0;
}
function yw(r) {
  r.selected = !1;
}
function Lv(r, t, e) {
  t(r, e);
}
function dr(r, t, e) {
  Lv(r, t, e), r.isGroup && r.traverse(function(i) {
    Lv(i, t, e);
  });
}
function Pv(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = qs;
      break;
    case "normal":
      r.hoverState = Df;
      break;
    case "blur":
      r.hoverState = Xs;
      break;
    case "select":
      r.selected = !0;
  }
}
function mw(r, t, e, i) {
  for (var n = r.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = n[s];
    a[s] = l ?? (i && i[s]);
  }
  for (var o = 0; o < r.animators.length; o++) {
    var u = r.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(e) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function _w(r, t, e, i) {
  var n = e && ct(e, "select") >= 0, a = !1;
  if (r instanceof ht) {
    var o = Cy(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (Ni(s) || Ni(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = B({}, i), u = B({}, u), u.fill = s) : !Ni(u.fill) && Ni(s) ? (a = !0, i = B({}, i), u = B({}, u), u.fill = Xc(s)) : !Ni(u.stroke) && Ni(l) && (a || (i = B({}, i), u = B({}, u)), u.stroke = Xc(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = B({}, i));
    var h = r.z2EmphasisLift;
    i.z2 = r.z2 + (h ?? pw);
  }
  return i;
}
function bw(r, t, e) {
  if (e && e.z2 == null) {
    e = B({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? dw);
  }
  return e;
}
function Sw(r, t, e) {
  var i = ct(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : mw(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = B({}, e), o = B({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function au(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return _w(this, r, t, e);
    if (r === "blur")
      return Sw(this, r, e);
    if (r === "select")
      return bw(this, r, e);
  }
  return e;
}
function ww(r) {
  r.stateProxy = au;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = au), e && (e.stateProxy = au);
}
function Rv(r, t) {
  !Ry(r, t) && !r.__highByOuter && dr(r, My);
}
function Ev(r, t) {
  !Ry(r, t) && !r.__highByOuter && dr(r, Dy);
}
function Ss(r, t) {
  r.__highByOuter |= 1 << (t || 0), dr(r, My);
}
function ws(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && dr(r, Dy);
}
function xw(r) {
  dr(r, Af);
}
function Iy(r) {
  dr(r, Ay);
}
function Ly(r) {
  dr(r, gw);
}
function Py(r) {
  dr(r, yw);
}
function Ry(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function Ey(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Mf(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      Ay(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), C(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function vh(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, h) {
    for (var f = 0; f < h.length; f++) {
      var v = u.getItemGraphicEl(h[f]);
      v && Iy(v);
    }
  }
  if (r != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(r), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var h = o === u, f = u.coordinateSystem;
      f && f.master && (f = f.master);
      var v = f && s ? f === s : h;
      if (!// Not blur other series if blurScope series
      (e === "series" && !h || e === "coordinateSystem" && !v || t === "series" && h)) {
        var c = i.getViewOfSeriesModel(u);
        if (c.group.traverse(function(d) {
          d.__highByOuter && h && t === "self" || Af(d);
        }), Zt(t))
          a(u.getData(), t);
        else if (H(t))
          for (var p = dt(t), g = 0; g < p.length; g++)
            a(u.getData(p[g]), t[p[g]]);
        l.push(u), Mf(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, h) {
      if (u !== "series") {
        var f = i.getViewOfComponentModel(h);
        f && f.toggleBlurSeries && f.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function ph(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      Mf(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        Af(a);
      });
    }
  }
}
function Tw(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (n) {
    var a = Ti(n, t);
    a = ($(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = it(o);
      vh(i, u.focus, u.blurScope, e);
    } else {
      var h = r.get(["emphasis", "focus"]), f = r.get(["emphasis", "blurScope"]);
      h != null && vh(i, h, f, e);
    }
  }
}
function If(r, t, e, i) {
  var n = {
    focusSelf: !1,
    dispatchers: null
  };
  if (r == null || r === "series" || t == null || e == null)
    return n;
  var a = i.getModel().getComponent(r, t);
  if (!a)
    return n;
  var o = i.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return n;
  for (var s = o.findHighDownDispatchers(e), l, u = 0; u < s.length; u++)
    if (it(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function Cw(r, t, e) {
  var i = it(r), n = If(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && ph(i.componentMainType, i.componentIndex, e), C(a, function(s) {
    return Rv(s, t);
  })) : (vh(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && ph(i.componentMainType, i.componentIndex, e), Rv(r, t));
}
function Mw(r, t, e) {
  Ey(e);
  var i = it(r), n = If(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? C(n, function(a) {
    return Ev(a, t);
  }) : Ev(r, t);
}
function Dw(r, t, e) {
  if (mh(t)) {
    var i = t.dataType, n = r.getData(i), a = Ti(n, t);
    $(a) || (a = [a]), r[t.type === pa ? "toggleSelect" : t.type === va ? "select" : "unselect"](a, i);
  }
}
function Ov(r) {
  var t = r.getAllData();
  C(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? Ly(a) : Py(a);
    });
  });
}
function Aw(r) {
  var t = [];
  return r.eachSeries(function(e) {
    var i = e.getAllData();
    C(i, function(n) {
      n.data;
      var a = n.type, o = e.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: e.seriesIndex
        };
        a != null && (s.dataType = a), t.push(s);
      }
    });
  }), t;
}
function dh(r, t, e) {
  Lf(r, !0), dr(r, ww), Lw(r, t, e);
}
function Iw(r) {
  Lf(r, !1);
}
function Pa(r, t, e, i) {
  i ? Iw(r) : dh(r, t, e);
}
function Lw(r, t, e) {
  var i = it(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var kv = ["emphasis", "blur", "select"], Pw = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function gh(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < kv.length; n++) {
    var a = kv[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[Pw[e]]();
  }
}
function Lf(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function yh(r) {
  return !!(r && r.__highDownDispatcher);
}
function Rw(r) {
  var t = Av[r];
  return t == null && Dv <= 32 && (t = Av[r] = Dv++), t;
}
function mh(r) {
  var t = r.type;
  return t === va || t === Qo || t === pa;
}
function Bv(r) {
  var t = r.type;
  return t === _i || t === Ko;
}
function Ew(r) {
  var t = Cy(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var $i = Ci.CMD, Ow = [[], [], []], Nv = Math.sqrt, kw = Math.atan2;
function Bw(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, h = $i.M, f = $i.C, v = $i.L, c = $i.R, p = $i.A, g = $i.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case h:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case f:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case p:
          var d = t[4], y = t[5], m = Nv(t[0] * t[0] + t[1] * t[1]), _ = Nv(t[2] * t[2] + t[3] * t[3]), b = kw(-t[1] / _, t[0] / m);
          e[o] *= m, e[o++] += d, e[o] *= _, e[o++] += y, e[o++] *= m, e[o++] *= _, e[o++] += b, e[o++] += b, o += 2, s = o;
          break;
        case c:
          u[0] = e[o++], u[1] = e[o++], de(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], de(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var w = Ow[l];
        w[0] = e[o++], w[1] = e[o++], de(w, w, t), e[s++] = w[0], e[s++] = w[1];
      }
    }
    r.increaseVersion();
  }
}
var ou = Math.sqrt, vo = Math.sin, po = Math.cos, Vn = Math.PI;
function $v(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function _h(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / ($v(r) * $v(t));
}
function zv(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(_h(r, t));
}
function Fv(r, t, e, i, n, a, o, s, l, u, h) {
  var f = l * (Vn / 180), v = po(f) * (r - e) / 2 + vo(f) * (t - i) / 2, c = -1 * vo(f) * (r - e) / 2 + po(f) * (t - i) / 2, p = v * v / (o * o) + c * c / (s * s);
  p > 1 && (o *= ou(p), s *= ou(p));
  var g = (n === a ? -1 : 1) * ou((o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) / (o * o * (c * c) + s * s * (v * v))) || 0, d = g * o * c / s, y = g * -s * v / o, m = (r + e) / 2 + po(f) * d - vo(f) * y, _ = (t + i) / 2 + vo(f) * d + po(f) * y, b = zv([1, 0], [(v - d) / o, (c - y) / s]), w = [(v - d) / o, (c - y) / s], S = [(-1 * v - d) / o, (-1 * c - y) / s], x = zv(w, S);
  if (_h(w, S) <= -1 && (x = Vn), _h(w, S) >= 1 && (x = 0), x < 0) {
    var M = Math.round(x / Vn * 1e6) / 1e6;
    x = Vn * 2 + M % 2 * Vn;
  }
  h.addData(u, m, _, o, s, b, x, f, a);
}
var Nw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, $w = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function zw(r) {
  var t = new Ci();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = Ci.CMD, l = r.match(Nw);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], f = h.charAt(0), v = void 0, c = h.match($w) || [], p = c.length, g = 0; g < p; g++)
      c[g] = parseFloat(c[g]);
    for (var d = 0; d < p; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, w = void 0, S = void 0, x = void 0, M = e, D = i, A = void 0, T = void 0;
      switch (f) {
        case "l":
          e += c[d++], i += c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "L":
          e = c[d++], i = c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "m":
          e += c[d++], i += c[d++], v = s.M, t.addData(v, e, i), n = e, a = i, f = "l";
          break;
        case "M":
          e = c[d++], i = c[d++], v = s.M, t.addData(v, e, i), n = e, a = i, f = "L";
          break;
        case "h":
          e += c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "H":
          e = c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "v":
          i += c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "V":
          i = c[d++], v = s.L, t.addData(v, e, i);
          break;
        case "C":
          v = s.C, t.addData(v, c[d++], c[d++], c[d++], c[d++], c[d++], c[d++]), e = c[d - 2], i = c[d - 1];
          break;
        case "c":
          v = s.C, t.addData(v, c[d++] + e, c[d++] + i, c[d++] + e, c[d++] + i, c[d++] + e, c[d++] + i), e += c[d - 2], i += c[d - 1];
          break;
        case "S":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, M = c[d++], D = c[d++], e = c[d++], i = c[d++], t.addData(v, y, m, M, D, e, i);
          break;
        case "s":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, M = e + c[d++], D = i + c[d++], e += c[d++], i += c[d++], t.addData(v, y, m, M, D, e, i);
          break;
        case "Q":
          M = c[d++], D = c[d++], e = c[d++], i = c[d++], v = s.Q, t.addData(v, M, D, e, i);
          break;
        case "q":
          M = c[d++] + e, D = c[d++] + i, e += c[d++], i += c[d++], v = s.Q, t.addData(v, M, D, e, i);
          break;
        case "T":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e = c[d++], i = c[d++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "t":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e += c[d++], i += c[d++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "A":
          _ = c[d++], b = c[d++], w = c[d++], S = c[d++], x = c[d++], M = e, D = i, e = c[d++], i = c[d++], v = s.A, Fv(M, D, e, i, S, x, _, b, w, v, t);
          break;
        case "a":
          _ = c[d++], b = c[d++], w = c[d++], S = c[d++], x = c[d++], M = e, D = i, e += c[d++], i += c[d++], v = s.A, Fv(M, D, e, i, S, x, _, b, w, v, t);
          break;
      }
    }
    (f === "z" || f === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var Oy = function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(ht);
function ky(r) {
  return r.setData != null;
}
function By(r, t) {
  var e = zw(r), i = B({}, t);
  return i.buildPath = function(n) {
    if (ky(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    Bw(e, n), this.dirtyShape();
  }, i;
}
function Fw(r, t) {
  return new Oy(By(r, t));
}
function Vw(r, t) {
  var e = By(r, t), i = function(n) {
    N(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(Oy);
  return i;
}
function Hw(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ht(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (ky(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var Gw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), Ks = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Gw();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(ht);
Ks.prototype.type = "circle";
var Ww = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), Pf = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ww();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, h = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), e.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), e.closePath();
  }, t;
}(ht);
Pf.prototype.type = "ellipse";
var Ny = Math.PI, su = Ny * 2, ri = Math.sin, zi = Math.cos, Uw = Math.acos, Ot = Math.atan2, Vv = Math.abs, da = Math.sqrt, na = Math.max, Be = Math.min, xe = 1e-4;
function Yw(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = f * l - h * u;
  if (!(v * v < xe))
    return v = (h * (t - a) - f * (r - n)) / v, [r + v * l, t + v * u];
}
function go(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / da(s * s + l * l), h = u * l, f = -u * s, v = r + h, c = t + f, p = e + h, g = i + f, d = (v + p) / 2, y = (c + g) / 2, m = p - v, _ = g - c, b = m * m + _ * _, w = n - a, S = v * g - p * c, x = (_ < 0 ? -1 : 1) * da(na(0, w * w * b - S * S)), M = (S * _ - m * x) / b, D = (-S * m - _ * x) / b, A = (S * _ + m * x) / b, T = (-S * m + _ * x) / b, I = M - d, L = D - y, P = A - d, R = T - y;
  return I * I + L * L > P * P + R * R && (M = A, D = T), {
    cx: M,
    cy: D,
    x0: -h,
    y0: -f,
    x1: M * (n / w - 1),
    y1: D * (n / w - 1)
  };
}
function Xw(r) {
  var t;
  if ($(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function qw(r, t) {
  var e, i = na(t.r, 0), n = na(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, f = t.cy, v = !!t.clockwise, c = Vv(u - l), p = c > su && c % su;
      if (p > xe && (c = p), !(i > xe))
        r.moveTo(h, f);
      else if (c > su - xe)
        r.moveTo(h + i * zi(l), f + i * ri(l)), r.arc(h, f, i, l, u, !v), n > xe && (r.moveTo(h + n * zi(u), f + n * ri(u)), r.arc(h, f, n, u, l, v));
      else {
        var g = void 0, d = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, w = void 0, S = void 0, x = void 0, M = void 0, D = void 0, A = void 0, T = void 0, I = void 0, L = void 0, P = void 0, R = i * zi(l), O = i * ri(l), G = n * zi(u), k = n * ri(u), z = c > xe;
        if (z) {
          var W = t.cornerRadius;
          W && (e = Xw(W), g = e[0], d = e[1], y = e[2], m = e[3]);
          var K = Vv(i - n) / 2;
          if (_ = Be(K, y), b = Be(K, m), w = Be(K, g), S = Be(K, d), D = x = na(_, b), A = M = na(w, S), (x > xe || M > xe) && (T = i * zi(u), I = i * ri(u), L = n * zi(l), P = n * ri(l), c < Ny)) {
            var tt = Yw(R, O, L, P, T, I, G, k);
            if (tt) {
              var ft = R - tt[0], yt = O - tt[1], bt = T - tt[0], be = I - tt[1], zr = 1 / ri(Uw((ft * bt + yt * be) / (da(ft * ft + yt * yt) * da(bt * bt + be * be))) / 2), Pi = da(tt[0] * tt[0] + tt[1] * tt[1]);
              D = Be(x, (i - Pi) / (zr + 1)), A = Be(M, (n - Pi) / (zr - 1));
            }
          }
        }
        if (!z)
          r.moveTo(h + R, f + O);
        else if (D > xe) {
          var jt = Be(y, D), Lt = Be(m, D), Z = go(L, P, R, O, i, jt, v), et = go(T, I, G, k, i, Lt, v);
          r.moveTo(h + Z.cx + Z.x0, f + Z.cy + Z.y0), D < x && jt === Lt ? r.arc(h + Z.cx, f + Z.cy, D, Ot(Z.y0, Z.x0), Ot(et.y0, et.x0), !v) : (jt > 0 && r.arc(h + Z.cx, f + Z.cy, jt, Ot(Z.y0, Z.x0), Ot(Z.y1, Z.x1), !v), r.arc(h, f, i, Ot(Z.cy + Z.y1, Z.cx + Z.x1), Ot(et.cy + et.y1, et.cx + et.x1), !v), Lt > 0 && r.arc(h + et.cx, f + et.cy, Lt, Ot(et.y1, et.x1), Ot(et.y0, et.x0), !v));
        } else
          r.moveTo(h + R, f + O), r.arc(h, f, i, l, u, !v);
        if (!(n > xe) || !z)
          r.lineTo(h + G, f + k);
        else if (A > xe) {
          var jt = Be(g, A), Lt = Be(d, A), Z = go(G, k, T, I, n, -Lt, v), et = go(R, O, L, P, n, -jt, v);
          r.lineTo(h + Z.cx + Z.x0, f + Z.cy + Z.y0), A < M && jt === Lt ? r.arc(h + Z.cx, f + Z.cy, A, Ot(Z.y0, Z.x0), Ot(et.y0, et.x0), !v) : (Lt > 0 && r.arc(h + Z.cx, f + Z.cy, Lt, Ot(Z.y0, Z.x0), Ot(Z.y1, Z.x1), !v), r.arc(h, f, n, Ot(Z.cy + Z.y1, Z.cx + Z.x1), Ot(et.cy + et.y1, et.cx + et.x1), v), jt > 0 && r.arc(h + et.cx, f + et.cy, jt, Ot(et.y1, et.x1), Ot(et.y0, et.x0), !v));
        } else
          r.lineTo(h + G, f + k), r.arc(h, f, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var Zw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), An = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Zw();
  }, t.prototype.buildPath = function(e, i) {
    qw(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(ht);
An.prototype.type = "sector";
var Kw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), Rf = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Kw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(ht);
Rf.prototype.type = "ring";
function Qw(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, h, f;
  if (i) {
    h = [1 / 0, 1 / 0], f = [-1 / 0, -1 / 0];
    for (var v = 0, c = r.length; v < c; v++)
      ji(h, h, r[v]), Ji(f, f, r[v]);
    ji(h, h, i[0]), Ji(f, f, i[1]);
  }
  for (var v = 0, c = r.length; v < c; v++) {
    var p = r[v];
    if (e)
      l = r[v ? v - 1 : c - 1], u = r[(v + 1) % c];
    else if (v === 0 || v === c - 1) {
      n.push(I1(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    L1(a, u, l), xl(a, a, t);
    var g = Zu(p, l), d = Zu(p, u), y = g + d;
    y !== 0 && (g /= y, d /= y), xl(o, a, -g), xl(s, a, d);
    var m = Pc([], p, o), _ = Pc([], p, s);
    i && (Ji(m, m, h), ji(m, m, f), Ji(_, _, h), ji(_, _, f)), n.push(m), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function $y(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Qw(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], h = n[(s + 1) % o];
        r.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, f = n.length; s < f; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var jw = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Qs = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new jw();
  }, t.prototype.buildPath = function(e, i) {
    $y(e, i, !0);
  }, t;
}(ht);
Qs.prototype.type = "polygon";
var Jw = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Ef = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Jw();
  }, t.prototype.buildPath = function(e, i) {
    $y(e, i, !1);
  }, t;
}(ht);
Ef.prototype.type = "polyline";
var tx = {}, ex = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
}(), Nr = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new ex();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = xy(tx, i, this.style);
      n = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var u = i.percent;
    u !== 0 && (e.moveTo(n, a), u < 1 && (o = n * (1 - u) + o * u, s = a * (1 - u) + s * u), e.lineTo(o, s));
  }, t.prototype.pointAt = function(e) {
    var i = this.shape;
    return [
      i.x1 * (1 - e) + i.x2 * e,
      i.y1 * (1 - e) + i.y2 * e
    ];
  }, t;
}(ht);
Nr.prototype.type = "line";
var Gt = [], rx = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function Hv(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? Hc : Rt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? Hc : Rt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? Gc : Yt)(r.x1, r.cpx1, r.x2, t),
    (e ? Gc : Yt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var Of = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new rx();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, h = i.cpx2, f = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), h == null || f == null ? (v < 1 && (ps(n, l, o, v, Gt), l = Gt[1], o = Gt[2], ps(a, u, s, v, Gt), u = Gt[1], s = Gt[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (vs(n, l, h, o, v, Gt), l = Gt[1], h = Gt[2], o = Gt[3], vs(a, u, f, s, v, Gt), u = Gt[1], f = Gt[2], s = Gt[3]), e.bezierCurveTo(l, u, h, f, o, s)));
  }, t.prototype.pointAt = function(e) {
    return Hv(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = Hv(this.shape, e, !0);
    return E1(i, i);
  }, t;
}(ht);
Of.prototype.type = "bezier-curve";
var ix = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), js = function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new ix();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, h = Math.cos(s), f = Math.sin(s);
    e.moveTo(h * o + n, f * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
}(ht);
js.prototype.type = "arc";
var nx = function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.type = "compound", e;
  }
  return t.prototype._updatePathDirty = function() {
    for (var e = this.shape.paths, i = this.shapeChanged(), n = 0; n < e.length; n++)
      i = i || e[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var e = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < e.length; n++)
      e[n].path || e[n].createPathProxy(), e[n].path.setScale(i[0], i[1], e[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(e, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(e, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var e = this.shape.paths || [], i = 0; i < e.length; i++)
      e[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), ht.prototype.getBoundingRect.call(this);
  }, t;
}(ht), zy = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), kf = function(r) {
  N(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(zy), ax = function(r) {
  N(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(zy), ii = [0, 0], ni = [0, 0], yo = new vt(), mo = new vt(), xs = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new vt();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new vt();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    vt.sub(n[0], i[1], i[0]), vt.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return yo.set(1 / 0, 1 / 0), mo.set(0, 0), !this._intersectCheckOneSide(this, t, yo, mo, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, yo, mo, n, -1) && (i = !1, n) || n || vt.copy(e, i ? yo : mo), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, ii), this._getProjMinMaxOnAxis(l, e._corners, ni), ii[1] < ni[0] || ii[0] > ni[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(ni[0] - ii[1]), f = Math.abs(ii[0] - ni[1]);
        Math.min(h, f) > n.len() && (h < f ? vt.scale(n, u, -h * o) : vt.scale(n, u, f * o));
      } else if (i) {
        var h = Math.abs(ni[0] - ii[1]), f = Math.abs(ii[0] - ni[1]);
        Math.min(h, f) < i.len() && (h < f ? vt.scale(i, u, h * o) : vt.scale(i, u, -f * o));
      }
    }
    return s;
  }, r.prototype._getProjMinMaxOnAxis = function(t, e, i) {
    for (var n = this._axes[t], a = this._origin, o = e[0].dot(n) + a[t], s = o, l = o, u = 1; u < e.length; u++) {
      var h = e[u].dot(n) + a[t];
      s = Math.min(h, s), l = Math.max(h, l);
    }
    i[0] = s, i[1] = l;
  }, r;
}(), ox = [], sx = function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.notClear = !0, e.incremental = !0, e._displayables = [], e._temporaryDisplayables = [], e._cursor = 0, e;
  }
  return t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
  }, t.prototype.getCursor = function() {
    return this._cursor;
  }, t.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, t.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, t.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, t.prototype.addDisplayable = function(e, i) {
    i ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
  }, t.prototype.addDisplayables = function(e, i) {
    i = i || !1;
    for (var n = 0; n < e.length; n++)
      this.addDisplayable(e[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(e) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      e && e(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      e && e(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var i = this._displayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var i = this._temporaryDisplayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var e = new at(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(ox)), e.union(a);
      }
      this._rect = e;
    }
    return this._rect;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(e, i))
          return !0;
      }
    return !1;
  }, t;
}(Za), lx = At();
function ux(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, h = void 0, f = void 0;
    i ? (u = J(i.duration, 200), h = J(i.easing, "cubicOut"), f = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), f = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (f = a.delay)), q(f) && (f = f(e, n)), q(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: f,
      easing: h
    };
    return v;
  } else
    return null;
}
function Bf(r, t, e, i, n, a, o) {
  var s = !1, l;
  q(n) ? (o = a, a = n, n = null) : H(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var h = ux(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (h && h.duration > 0) {
    var f = h.duration, v = h.delay, c = h.easing, p = {
      duration: f,
      delay: v || 0,
      easing: c,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: r,
      during: o
    };
    s ? t.animateFrom(e, p) : t.animateTo(e, p);
  } else
    t.stopAnimation(), !s && t.attr(e), o && o(1), a && a();
}
function ie(r, t, e, i, n, a) {
  Bf("update", r, t, e, i, n, a);
}
function ur(r, t, e, i, n, a) {
  Bf("enter", r, t, e, i, n, a);
}
function ga(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Ts(r, t, e, i, n, a) {
  ga(r) || Bf("leave", r, t, e, i, n, a);
}
function Gv(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Ts(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function bh(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || Gv(n, t, e, i);
  }) : Gv(r, t, e, i);
}
function Fy(r) {
  lx(r).oldStyle = r.style;
}
var Cs = Math.max, Ms = Math.min, Sh = {};
function hx(r) {
  return ht.extend(r);
}
var fx = Vw;
function cx(r, t) {
  return fx(r, t);
}
function Re(r, t) {
  Sh[r] = t;
}
function vx(r) {
  if (Sh.hasOwnProperty(r))
    return Sh[r];
}
function Nf(r, t, e, i) {
  var n = Fw(r, t);
  return e && (i === "center" && (e = Hy(e, n.getBoundingRect())), Gy(n, e)), n;
}
function Vy(r, t, e) {
  var i = new Ke({
    style: {
      image: r,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(n) {
      if (e === "center") {
        var a = {
          width: n.width,
          height: n.height
        };
        i.setStyle(Hy(t, a));
      }
    }
  });
  return i;
}
function Hy(r, t) {
  var e = t.width / t.height, i = r.height * e, n;
  i <= r.width ? n = r.height : (i = r.width, n = i / e);
  var a = r.x + r.width / 2, o = r.y + r.height / 2;
  return {
    x: a - i / 2,
    y: o - n / 2,
    width: i,
    height: n
  };
}
var px = Hw;
function Gy(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function Ra(r, t) {
  return xy(r, r, {
    lineWidth: t
  }), r;
}
function dx(r) {
  return Ty(r.shape, r.shape, r.style), r;
}
var gx = pi;
function jo(r, t) {
  for (var e = df([]); r && r !== t; )
    sn(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function un(r, t, e) {
  return t && !Zt(t) && (t = _f.getLocalTransform(t)), e && (t = yf([], t)), de([], r, t);
}
function Wy(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = un(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Wv(r) {
  return !r.isGroup;
}
function yx(r) {
  return r.shape != null;
}
function Uy(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      Wv(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return yx(o) && (s.shape = B({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (Wv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), ie(o, l, e, it(o).dataIndex);
      }
    }
  });
}
function mx(r, t) {
  return U(r, function(e) {
    var i = e[0];
    i = Cs(i, t.x), i = Ms(i, t.x + t.width);
    var n = e[1];
    return n = Cs(n, t.y), n = Ms(n, t.y + t.height), [i, n];
  });
}
function _x(r, t) {
  var e = Cs(r.x, t.x), i = Ms(r.x + r.width, t.x + t.width), n = Cs(r.y, t.y), a = Ms(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function $f(r, t, e) {
  var i = B({
    rectHover: !0
  }, t), n = i.style = {
    strokeNoScale: !0
  };
  if (e = e || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, r)
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), ot(n, e), new Ke(i)) : Nf(r.replace("path://", ""), i, e, "center");
}
function bx(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Yy(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Yy(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = lu(h, f, l, u);
  if (Sx(v))
    return !1;
  var c = r - n, p = t - a, g = lu(c, p, l, u) / v;
  if (g < 0 || g > 1)
    return !1;
  var d = lu(c, p, h, f) / v;
  return !(d < 0 || d > 1);
}
function lu(r, t, e, i) {
  return r * i - e * t;
}
function Sx(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function Js(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = V(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && C(dt(l), function(h) {
    xi(s, h) || (s[h] = l[h], s.$vars.push(h));
  });
  var u = it(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ot({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function Uv(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function Ka(r, t) {
  if (r)
    if ($(r))
      for (var e = 0; e < r.length; e++)
        Uv(r[e], t);
    else
      Uv(r, t);
}
Re("circle", Ks);
Re("ellipse", Pf);
Re("sector", An);
Re("ring", Rf);
Re("polygon", Qs);
Re("polyline", Ef);
Re("rect", _t);
Re("line", Nr);
Re("bezierCurve", Of);
Re("arc", js);
const xx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: js,
  BezierCurve: Of,
  BoundingRect: at,
  Circle: Ks,
  CompoundPath: nx,
  Ellipse: Pf,
  Group: Tt,
  Image: Ke,
  IncrementalDisplayable: sx,
  Line: Nr,
  LinearGradient: kf,
  OrientedBoundingRect: xs,
  Path: ht,
  Point: vt,
  Polygon: Qs,
  Polyline: Ef,
  RadialGradient: ax,
  Rect: _t,
  Ring: Rf,
  Sector: An,
  Text: Dt,
  applyTransform: un,
  clipPointsByRect: mx,
  clipRectByRect: _x,
  createIcon: $f,
  extendPath: cx,
  extendShape: hx,
  getShapeClass: vx,
  getTransform: jo,
  groupTransition: Uy,
  initProps: ur,
  isElementRemoved: ga,
  lineLineIntersect: Yy,
  linePolygonIntersect: bx,
  makeImage: Vy,
  makePath: Nf,
  mergePath: px,
  registerShape: Re,
  removeElement: Ts,
  removeElementWithFadeOut: bh,
  resizePath: Gy,
  setTooltipConfig: Js,
  subPixelOptimize: gx,
  subPixelOptimizeLine: Ra,
  subPixelOptimizeRect: dx,
  transformDirection: Wy,
  traverseElements: Ka,
  updateProps: ie
}, Symbol.toStringTag, { value: "Module" }));
var tl = {};
function Tx(r, t) {
  for (var e = 0; e < We.length; e++) {
    var i = We[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function Yv(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = q(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < We.length; u++) {
    var h = We[u], f = t[h];
    l[h] = J(i ? i.getFormattedLabel(n, h, null, a, f && f.get("formatter")) : null, s);
  }
  return l;
}
function Qa(r, t, e, i) {
  e = e || tl;
  for (var n = r instanceof Dt, a = !1, o = 0; o < Iv.length; o++) {
    var s = t[Iv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new Dt(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = Yv(e, t), h = t.normal, f = !!h.getShallow("show"), v = Ve(h, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(Xv(h, e, !1));
    for (var o = 0; o < We.length; o++) {
      var c = We[o], s = t[c];
      if (s) {
        var p = l.ensureState(c), g = !!J(s.getShallow("show"), f);
        if (g !== f && (p.ignore = !g), p.style = Ve(s, i && i[c], e, !0, !n), p.style.text = u[c], !n) {
          var d = r.ensureState(c);
          d.textConfig = Xv(s, e, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !f, l.useStyle(v), l.dirty(), e.enableTextSetter && (el(l).setLabelText = function(y) {
      var m = Yv(e, t, y);
      Tx(l, m);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function mn(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < We.length; i++) {
    var n = We[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function Ve(r, t, e, i, n) {
  var a = {};
  return Cx(a, r, e, i, n), t && B(a, t), a;
}
function Xv(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = J(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function Cx(r, t, e, i, n) {
  e = e || tl;
  var a = t.ecModel, o = a && a.option.textStyle, s = Mx(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        Qv(l[u] = {}, h, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var f = t.get("overflow");
  f && (r.overflow = f);
  var v = t.get("minMargin");
  v != null && (r.margin = v), Qv(r, t, o, e, i, n, !0, !1);
}
function Mx(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || tl).rich;
    if (e) {
      t = t || {};
      for (var i = dt(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var qv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], Zv = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Kv = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function Qv(r, t, e, i, n, a, o, s) {
  e = !n && e || tl;
  var l = i && i.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), f = J(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || e.color, h = h || e.textBorderColor), u != null && (r.fill = u), h != null && (r.stroke = h);
  var v = J(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var c = J(t.getShallow("textBorderType"), e.textBorderType);
  c != null && (r.lineDash = c);
  var p = J(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  p != null && (r.lineDashOffset = p), !n && f == null && !s && (f = i && i.defaultOpacity), f != null && (r.opacity = f), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var g = 0; g < qv.length; g++) {
    var d = qv[g], y = J(t.getShallow(d), e[d]);
    y != null && (r[d] = y);
  }
  for (var g = 0; g < Zv.length; g++) {
    var d = Zv[g], y = t.getShallow(d);
    y != null && (r[d] = y);
  }
  if (r.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (r.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var g = 0; g < Kv.length; g++) {
      var d = Kv[g], y = t.getShallow(d);
      y != null && (r[d] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (r.borderColor = l);
  }
}
function Dx(r, t) {
  var e = t && t.getModel("textStyle");
  return ze([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var el = At();
function Ax(r, t, e, i) {
  if (r) {
    var n = el(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var Ix = ["textStyle", "color"], uu = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], hu = new Dt(), Lx = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(Ix) : null);
    }, r.prototype.getFont = function() {
      return Dx({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < uu.length; i++)
        e[uu[i]] = this.getShallow(uu[i]);
      return hu.useStyle(e), hu.update(), hu.getBoundingRect();
    }, r;
  }()
), Xy = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Px = La(Xy), Rx = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return Px(this, t);
    }, r;
  }()
), qy = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Ex = La(qy), Ox = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return Ex(this, t, e);
    }, r;
  }()
), St = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.parentModel = e, this.ecModel = i, this.option = t;
    }
    return r.prototype.init = function(t, e, i) {
    }, r.prototype.mergeOption = function(t, e) {
      rt(this.option, t, !0);
    }, r.prototype.get = function(t, e) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
    }, r.prototype.getShallow = function(t, e) {
      var i = this.option, n = i == null ? i : i[t];
      if (n == null && !e) {
        var a = this.parentModel;
        a && (n = a.getShallow(t));
      }
      return n;
    }, r.prototype.getModel = function(t, e) {
      var i = t != null, n = i ? this.parsePath(t) : null, a = i ? this._doGet(n) : this.option;
      return e = e || this.parentModel && this.parentModel.getModel(this.resolveParentPath(n)), new r(a, e, this.ecModel);
    }, r.prototype.isEmpty = function() {
      return this.option == null;
    }, r.prototype.restoreData = function() {
    }, r.prototype.clone = function() {
      var t = this.constructor;
      return new t(X(this.option));
    }, r.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, r.prototype.resolveParentPath = function(t) {
      return t;
    }, r.prototype.isAnimationEnabled = function() {
      if (!Y.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, r.prototype._doGet = function(t, e) {
      var i = this.option;
      if (!t)
        return i;
      for (var n = 0; n < t.length && !(t[n] && (i = i && typeof i == "object" ? i[t[n]] : null, i == null)); n++)
        ;
      return i == null && e && (i = e._doGet(this.resolveParentPath(t), e.parentModel)), i;
    }, r;
  }()
);
Cf(St);
bS(St);
qe(St, Rx);
qe(St, Ox);
qe(St, CS);
qe(St, Lx);
var kx = Math.round(Math.random() * 10);
function rl(r) {
  return [r || "", kx++].join("_");
}
function Bx(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Fe(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Fe(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function Nx(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), h = u.graph, f = u.noEntryList, v = {};
    for (C(a, function(m) {
      v[m] = !0;
    }); f.length; ) {
      var c = f.pop(), p = h[c], g = !!v[c];
      g && (s.call(l, c, p.originalDeps.slice()), delete v[c]), C(p.successor, g ? y : d);
    }
    C(v, function() {
      var m = "";
      throw new Error(m);
    });
    function d(m) {
      h[m].entryCount--, h[m].entryCount === 0 && f.push(m);
    }
    function y(m) {
      v[m] = !0, d(m);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return C(a, function(l) {
      var u = i(o, l), h = u.originalDeps = t(l), f = n(h, a);
      u.entryCount = f.length, u.entryCount === 0 && s.push(l), C(f, function(v) {
        ct(u.predecessor, v) < 0 && u.predecessor.push(v);
        var c = i(o, v);
        ct(c.successor, v) < 0 && c.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function i(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function n(a, o) {
    var s = [];
    return C(a, function(l) {
      ct(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function il(r, t) {
  return rt(rt({}, r, !0), t, !0);
}
const $x = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, zx = {
  time: {
    month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图",
      custom: "自定义图表",
      chart: "图表"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
};
var Ds = "ZH", zf = "EN", hn = zf, Jo = {}, Ff = {}, Zy = Y.domSupported ? function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || hn).toUpperCase()
  );
  return r.indexOf(Ds) > -1 ? Ds : hn;
}() : hn;
function Ky(r, t) {
  r = r.toUpperCase(), Ff[r] = new St(t), Jo[r] = t;
}
function Fx(r) {
  if (V(r)) {
    var t = Jo[r.toUpperCase()] || {};
    return r === Ds || r === zf ? X(t) : rt(X(t), X(Jo[hn]), !1);
  } else
    return rt(X(r), X(Jo[hn]), !1);
}
function Vx(r) {
  return Ff[r];
}
function Hx() {
  return Ff[hn];
}
Ky(zf, $x);
Ky(Ds, zx);
var Vf = 1e3, Hf = Vf * 60, ya = Hf * 60, pe = ya * 24, jv = pe * 365, aa = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, _o = "{yyyy}-{MM}-{dd}", Jv = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: _o,
  hour: _o + " " + aa.hour,
  minute: _o + " " + aa.minute,
  second: _o + " " + aa.second,
  millisecond: aa.none
}, fu = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Qy = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function br(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function fn(r) {
  switch (r) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return r;
  }
}
function Gx(r) {
  return r === fn(r);
}
function Wx(r) {
  switch (r) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function nl(r, t, e, i) {
  var n = lr(r), a = n[Gf(e)](), o = n[cn(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[al(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), h = n[Ea(e)](), f = (h - 1) % 12 + 1, v = n[ol(e)](), c = n[sl(e)](), p = n[ll(e)](), g = h >= 12 ? "pm" : "am", d = g.toUpperCase(), y = i instanceof St ? i : Vx(i || Zy) || Hx(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), w = m.get("dayOfWeek"), S = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, d + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, br(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, br(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, br(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, w[u]).replace(/{ee}/g, S[u]).replace(/{e}/g, u + "").replace(/{HH}/g, br(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, br(f + "", 2)).replace(/{h}/g, f + "").replace(/{mm}/g, br(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, br(c, 2)).replace(/{s}/g, c + "").replace(/{SSS}/g, br(p, 3)).replace(/{S}/g, p + "");
}
function Ux(r, t, e, i, n) {
  var a = null;
  if (V(e))
    a = e;
  else if (q(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = B({}, aa);
    if (r.level > 0)
      for (var s = 0; s < fu.length; ++s)
        o[fu[s]] = "{primary|" + o[fu[s]] + "}";
    var l = e ? e.inherit === !1 ? e : ot(e, o) : o, u = jy(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = Qy.indexOf(u), s = h - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if ($(a)) {
      var f = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      f = Math.min(f, a.length - 1), a = a[f];
    }
  }
  return nl(new Date(r.value), a, n, i);
}
function jy(r, t) {
  var e = lr(r), i = e[cn(t)]() + 1, n = e[al(t)](), a = e[Ea(t)](), o = e[ol(t)](), s = e[sl(t)](), l = e[ll(t)](), u = l === 0, h = u && s === 0, f = h && o === 0, v = f && a === 0, c = v && n === 1, p = c && i === 1;
  return p ? "year" : c ? "month" : v ? "day" : f ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function tp(r, t, e) {
  var i = gt(r) ? lr(r) : r;
  switch (t = t || jy(r, e), t) {
    case "year":
      return i[Gf(e)]();
    case "half-year":
      return i[cn(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[cn(e)]() + 1) / 4);
    case "month":
      return i[cn(e)]();
    case "day":
      return i[al(e)]();
    case "half-day":
      return i[Ea(e)]() / 24;
    case "hour":
      return i[Ea(e)]();
    case "minute":
      return i[ol(e)]();
    case "second":
      return i[sl(e)]();
    case "millisecond":
      return i[ll(e)]();
  }
}
function Gf(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function cn(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function al(r) {
  return r ? "getUTCDate" : "getDate";
}
function Ea(r) {
  return r ? "getUTCHours" : "getHours";
}
function ol(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function sl(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function ll(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function Yx(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function Jy(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function tm(r) {
  return r ? "setUTCDate" : "setDate";
}
function em(r) {
  return r ? "setUTCHours" : "setHours";
}
function rm(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function im(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function nm(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function am(r) {
  if (!jb(r))
    return V(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function om(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var ja = zg;
function wh(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(h) {
    return h && ze(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? lr(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return nl(l, i, e);
  }
  if (t === "ordinal")
    return Xu(r) ? n(r) : gt(r) && a(r) ? r + "" : "-";
  var u = _s(r);
  return a(u) ? am(u) : Xu(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var ep = ["a", "b", "c", "d", "e", "f", "g"], cu = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function sm(r, t, e) {
  $(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = ep[a];
    r = r.replace(cu(o), cu(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(cu(ep[l], s), e ? Ut(u) : u);
    }
  return r;
}
function Xx(r, t) {
  var e = V(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ut(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Ut(i) + ";" + (t || "") + '"></span>';
  var o = e.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: n === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: i
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: i
    }
  };
}
function Mi(r, t) {
  return t = t || "transparent", V(r) ? r : H(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var ts = C, qx = ["left", "right", "top", "bottom", "width", "height"], bo = [["width", "left", "right"], ["height", "top", "bottom"]];
function Wf(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), f = t.childAt(u + 1), v = f && f.getBoundingRect(), c, p;
    if (r === "horizontal") {
      var g = h.width + (v ? -v.x + h.x : 0);
      c = a + g, c > i || l.newline ? (a = 0, c = g, o += s + e, s = h.height) : s = Math.max(s, h.height);
    } else {
      var d = h.height + (v ? -v.y + h.y : 0);
      p = o + d, p > n || l.newline ? (a += s + e, o = 0, p = d, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = c + e : o = p + e);
  });
}
var vn = Wf;
Mt(Wf, "vertical");
Mt(Wf, "horizontal");
function _n(r, t, e) {
  e = ja(e || 0);
  var i = t.width, n = t.height, a = Vt(r.left, i), o = Vt(r.top, n), s = Vt(r.right, i), l = Vt(r.bottom, n), u = Vt(r.width, i), h = Vt(r.height, n), f = e[2] + e[0], v = e[1] + e[3], c = r.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(h) && (h = n - l - f - o), c != null && (isNaN(u) && isNaN(h) && (c > i / n ? u = i * 0.8 : h = n * 0.8), isNaN(u) && (u = c * h), isNaN(h) && (h = u / c)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - h - f), r.left || r.right) {
    case "center":
      a = i / 2 - u / 2 - e[3];
      break;
    case "right":
      a = i - u - v;
      break;
  }
  switch (r.top || r.bottom) {
    case "middle":
    case "center":
      o = n / 2 - h / 2 - e[0];
      break;
    case "bottom":
      o = n - h - f;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(h) && (h = n - f - o - (l || 0));
  var p = new at(a + e[3], o + e[0], u, h);
  return p.margin = e, p;
}
function Zx(r, t, e, i, n, a) {
  a = a || r, a.x = r.x, a.y = r.y;
  var o;
  if (o = r.getBoundingRect(), r.needLocalTransform()) {
    var s = r.getLocalTransform();
    o = o.clone(), o.applyTransform(s);
  }
  var l = _n(ot({
    width: o.width,
    height: o.height
  }, t), e, i), u = l.x - o.x, h = l.y - o.y;
  return a.x += u, a.y += h, a === r && r.markRedraw(), !0;
}
function Oa(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return H(t) ? t : t ? {
    type: t
  } : null;
}
function bn(r, t, e) {
  var i = e && e.ignoreSize;
  !$(i) && (i = [i, i]);
  var n = o(bo[0], 0), a = o(bo[1], 1);
  u(bo[0], r, n), u(bo[1], r, a);
  function o(h, f) {
    var v = {}, c = 0, p = {}, g = 0, d = 2;
    if (ts(h, function(_) {
      p[_] = r[_];
    }), ts(h, function(_) {
      s(t, _) && (v[_] = p[_] = t[_]), l(v, _) && c++, l(p, _) && g++;
    }), i[f])
      return l(t, h[1]) ? p[h[2]] = null : l(t, h[2]) && (p[h[1]] = null), p;
    if (g === d || !c)
      return p;
    if (c >= d)
      return v;
    for (var y = 0; y < h.length; y++) {
      var m = h[y];
      if (!s(v, m) && s(r, m)) {
        v[m] = r[m];
        break;
      }
    }
    return v;
  }
  function s(h, f) {
    return h.hasOwnProperty(f);
  }
  function l(h, f) {
    return h[f] != null && h[f] !== "auto";
  }
  function u(h, f, v) {
    ts(h, function(c) {
      f[c] = v[c];
    });
  }
}
function ul(r) {
  return Kx({}, r);
}
function Kx(r, t) {
  return t && r && ts(qx, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var Qx = At(), st = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = rl("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Oa(this), a = n ? ul(e) : {}, o = i.getTheme();
      rt(e, o.get(this.mainType)), rt(e, this.getDefaultOption()), n && bn(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      rt(this.option, e, !0);
      var n = Oa(this);
      n && bn(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!yS(e))
        return e.defaultOption;
      var i = Qx(this);
      if (!i.defaultOption) {
        for (var n = [], a = e; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = rt(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(e, i) {
      var n = e + "Index", a = e + "Id";
      return qa(this.ecModel, e, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      var e = this;
      return {
        left: e.get("left"),
        top: e.get("top"),
        right: e.get("right"),
        bottom: e.get("bottom"),
        width: e.get("width"),
        height: e.get("height")
      };
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(e) {
      this.option.zlevel = e;
    }, t.protoInitialize = function() {
      var e = t.prototype;
      e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
    }(), t;
  }(St)
);
gy(st, St);
Ws(st);
Bx(st);
Nx(st, jx);
function jx(r) {
  var t = [];
  return C(st.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = U(t, function(e) {
    return Fe(e).main;
  }), r !== "dataset" && ct(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var lm = "";
typeof navigator < "u" && (lm = navigator.platform || "");
var Fi = "rgba(0, 0, 0, 0.2)";
const Jx = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: Fi,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: Fi,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: Fi,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: Fi,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: Fi,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: Fi,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: lm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: !1
};
var um = Q(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), _e = "original", Qt = "arrayRows", Qe = "objectRows", gr = "keyedColumns", Or = "typedArray", hm = "unknown", or = "column", In = "row", Jt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, fm = At();
function tT(r) {
  fm(r).datasetMap = Q();
}
function eT(r, t, e) {
  var i = {}, n = cm(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = fm(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, h, f;
  r = r.slice(), C(r, function(g, d) {
    var y = H(g) ? g : r[d] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = d, f = p(y)), i[y.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: f,
    valueWayDim: 0
  });
  C(r, function(g, d) {
    var y = g.name, m = p(g);
    if (h == null) {
      var _ = v.valueWayDim;
      c(i[y], _, m), c(o, _, m), v.valueWayDim += m;
    } else if (h === d)
      c(i[y], 0, m), c(a, 0, m);
    else {
      var _ = v.categoryWayDim;
      c(i[y], _, m), c(o, _, m), v.categoryWayDim += m;
    }
  });
  function c(g, d, y) {
    for (var m = 0; m < y; m++)
      g.push(d + m);
  }
  function p(g) {
    var d = g.dimsDef;
    return d ? d.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function cm(r) {
  var t = r.get("data", !0);
  if (!t)
    return qa(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, Me).models[0];
}
function rT(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : qa(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, Me).models;
}
function vm(r, t) {
  return iT(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function iT(r, t, e, i, n, a) {
  var o, s = 5;
  if (Kt(r))
    return Jt.Not;
  var l, u;
  if (i) {
    var h = i[a];
    H(h) ? (l = h.name, u = h.type) : V(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? Jt.Must : Jt.Not;
  if (t === Qt) {
    var f = r;
    if (e === In) {
      for (var v = f[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = b(v[n + c])) != null)
          return o;
    } else
      for (var c = 0; c < f.length && c < s; c++) {
        var p = f[n + c];
        if (p && (o = b(p[a])) != null)
          return o;
      }
  } else if (t === Qe) {
    var g = r;
    if (!l)
      return Jt.Not;
    for (var c = 0; c < g.length && c < s; c++) {
      var d = g[c];
      if (d && (o = b(d[l])) != null)
        return o;
    }
  } else if (t === gr) {
    var y = r;
    if (!l)
      return Jt.Not;
    var v = y[l];
    if (!v || Kt(v))
      return Jt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = b(v[c])) != null)
        return o;
  } else if (t === _e)
    for (var m = r, c = 0; c < m.length && c < s; c++) {
      var d = m[c], _ = Xa(d);
      if (!$(_))
        return Jt.Not;
      if ((o = b(_[a])) != null)
        return o;
    }
  function b(w) {
    var S = V(w);
    if (w != null && Number.isFinite(Number(w)) && w !== "")
      return S ? Jt.Might : Jt.Not;
    if (S && w !== "-")
      return Jt.Must;
  }
  return Jt.Not;
}
var nT = Q();
function aT(r, t, e) {
  var i = nT.get(t);
  if (!i)
    return e;
  var n = i(r);
  return n ? e.concat(n) : e;
}
var rp = At();
At();
var Uf = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Et(this.get("color", !0)), a = this.get("colorLayer", !0);
      return sT(this, rp, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      lT(this, rp);
    }, r;
  }()
);
function oT(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function sT(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var h = o == null || !i ? e : oT(i, o);
  if (h = h || e, !(!h || !h.length)) {
    var f = h[l];
    return n && (u[n] = f), s.paletteIdx = (l + 1) % h.length, f;
  }
}
function lT(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var So, Hn, ip, np = "\0_ec_inner", uT = 1, Yf = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new St(a), this._locale = new St(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      var a = sp(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, sp(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        !this.option || e === "recreate" ? ip(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!e || e === "recreate" || e === "media") {
        var l = a.getMediaOption(this);
        l.length && C(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(e) {
      this._mergeOption(e, null);
    }, t.prototype._mergeOption = function(e, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = Q(), u = i && i.replaceMergeMainTypeMap;
      tT(this), C(e, function(f, v) {
        f != null && (st.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? X(f) : rt(n[v], f, !0));
      }), u && u.each(function(f, v) {
        st.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), st.topologicalTravel(s, st.getAllClassMainTypes(), h, this);
      function h(f) {
        var v = aT(this, f, Et(e[f])), c = a.get(f), p = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          c ? u && u.get(f) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = eS(c, v, p);
        lS(g, f, st), n[f] = null, a.set(f, null), o.set(f, 0);
        var d = [], y = [], m = 0, _;
        C(g, function(b, w) {
          var S = b.existing, x = b.newOption;
          if (!x)
            S && (S.mergeOption({}, this), S.optionUpdated({}, !1));
          else {
            var M = f === "series", D = st.getClass(
              f,
              b.keyInfo.subType,
              !M
              // Give a more detailed warn later if series don't exists
            );
            if (!D)
              return;
            if (f === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (S && S.constructor === D)
              S.name = b.keyInfo.name, S.mergeOption(x, this), S.optionUpdated(x, !1);
            else {
              var A = B({
                componentIndex: w
              }, b.keyInfo);
              S = new D(x, this, this, A), B(S, A), b.brandNew && (S.__requireNewView = !0), S.init(x, this, this), S.optionUpdated(null, !0);
            }
          }
          S ? (d.push(S.option), y.push(S), m++) : (d.push(void 0), y.push(void 0));
        }, this), n[f] = d, a.set(f, y), o.set(f, m), f === "series" && So(this);
      }
      this._seriesIndices || So(this);
    }, t.prototype.getOption = function() {
      var e = X(this.option);
      return C(e, function(i, n) {
        if (st.hasClass(n)) {
          for (var a = Et(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Ia(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[np], e;
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(e) {
      this._payload = e;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(e, i) {
      var n = this._componentsMap.get(e);
      if (n) {
        var a = n[i || 0];
        if (a)
          return a;
        if (i == null) {
          for (var o = 0; o < n.length; o++)
            if (n[o])
              return n[o];
        }
      }
    }, t.prototype.queryComponents = function(e) {
      var i = e.mainType;
      if (!i)
        return [];
      var n = e.index, a = e.id, o = e.name, s = this._componentsMap.get(i);
      if (!s || !s.length)
        return [];
      var l;
      return n != null ? (l = [], C(Et(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = ap("id", a, s) : o != null ? l = ap("name", o, s) : l = Pt(s, function(u) {
        return !!u;
      }), op(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : Pt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(op(o, e));
      function s(u) {
        var h = n + "Index", f = n + "Id", v = n + "Name";
        return u && (u[h] != null || u[f] != null || u[v] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[h],
          id: u[f],
          name: u[v]
        } : null;
      }
      function l(u) {
        return e.filter ? Pt(u, e.filter) : u;
      }
    }, t.prototype.eachComponent = function(e, i, n) {
      var a = this._componentsMap;
      if (q(e)) {
        var o = i, s = e;
        a.each(function(f, v) {
          for (var c = 0; f && c < f.length; c++) {
            var p = f[c];
            p && s.call(o, v, p, p.componentIndex);
          }
        });
      } else
        for (var l = V(e) ? a.get(e) : H(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && i.call(n, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Ae(e, null);
      return Pt(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(e) {
      return this._componentsMap.get("series")[e];
    }, t.prototype.getSeriesByType = function(e) {
      return Pt(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === e;
      });
    }, t.prototype.getSeries = function() {
      return Pt(this._componentsMap.get("series"), function(e) {
        return !!e;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(e, i) {
      Hn(this), C(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      C(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      Hn(this), C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return C(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return Hn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      Hn(this);
      var n = [];
      C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = Q(n);
    }, t.prototype.restoreData = function(e) {
      So(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        st.hasClass(o) && n.push(o);
      }), st.topologicalTravel(n, st.getAllClassMainTypes(), function(a) {
        C(i.get(a), function(o) {
          o && (a !== "series" || !hT(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      So = function(e) {
        var i = e._seriesIndices = [];
        C(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = Q(i);
      }, Hn = function(e) {
      }, ip = function(e, i) {
        e.option = {}, e.option[np] = uT, e._componentsMap = Q({
          series: []
        }), e._componentsCount = Q();
        var n = i.aria;
        H(n) && n.enabled == null && (n.enabled = !0), fT(i, e._theme.option), rt(i, Jx, !1), e._mergeOption(i, null);
      };
    }(), t;
  }(St)
);
function hT(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function fT(r, t) {
  var e = r.color && !r.colorLayer;
  C(t, function(i, n) {
    n === "colorLayer" && e || st.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? rt(r[n], i, !1) : X(i) : r[n] == null && (r[n] = i));
  });
}
function ap(r, t, e) {
  if ($(t)) {
    var i = Q();
    return C(t, function(a) {
      if (a != null) {
        var o = Ae(a, null);
        o != null && i.set(a, !0);
      }
    }), Pt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Ae(t, null);
    return Pt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function op(r, t) {
  return t.hasOwnProperty("subType") ? Pt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function sp(r) {
  var t = Q();
  return r && C(Et(r.replaceMerge), function(e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
qe(Yf, Uf);
var cT = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
], pm = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      C(cT, function(e) {
        this[e] = j(t[e], t);
      }, this);
    }
    return r;
  }()
), vu = {}, hl = (
  /** @class */
  function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      C(vu, function(n, a) {
        var o = n.create(t, e);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, r.prototype.update = function(t, e) {
      C(this._coordinateSystems, function(i) {
        i.update && i.update(t, e);
      });
    }, r.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, r.register = function(t, e) {
      vu[t] = e;
    }, r.get = function(t) {
      return vu[t];
    }, r;
  }()
), vT = /^(min|max)?(.+)$/, pT = (
  /** @class */
  function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (C(Et(t.series), function(o) {
        o && o.data && Kt(o.data) && qu(o.data);
      }), C(Et(t.dataset), function(o) {
        o && o.source && Kt(o.source) && qu(o.source);
      })), t = X(t);
      var n = this._optionBackup, a = dT(t, e, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, r.prototype.mountOption = function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], X(t ? e.baseOption : this._newBaseOption);
    }, r.prototype.getTimelineOption = function(t) {
      var e, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (e = X(
          // FIXME:TS as TimelineModel or quivlant interface
          i[n.getCurrentIndex()]
        ));
      }
      return e;
    }, r.prototype.getMediaOption = function(t) {
      var e = this._api.getWidth(), i = this._api.getHeight(), n = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!n.length && !a)
        return s;
      for (var l = 0, u = n.length; l < u; l++)
        gT(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !mT(o, this._currentMediaIndices) && (s = U(o, function(h) {
        return X(h === -1 ? a.option : n[h].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  }()
);
function dT(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, h = !!r.media, f = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((f || h) && (r.options = r.media = null), a = r), h && $(u) && C(u, function(c) {
    c && c.option && (c.query ? i.push(c) : n || (n = c));
  }), v(a), C(l, function(c) {
    return v(c);
  }), C(i, function(c) {
    return v(c.option);
  });
  function v(c) {
    C(t, function(p) {
      p(c, e);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function gT(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return C(r, function(a, o) {
    var s = o.match(vT);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      yT(i[u], a, l) || (n = !1);
    }
  }), n;
}
function yT(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function mT(r, t) {
  return r.join(",") === t.join(",");
}
var Se = C, ka = H, lp = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function pu(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = lp.length; e < i; e++) {
      var n = lp[e], a = t.normal, o = t.emphasis;
      a && a[n] && (r[n] = r[n] || {}, r[n].normal ? rt(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (r[n] = r[n] || {}, r[n].emphasis ? rt(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function Nt(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (e ? (r[t].normal = r[t].emphasis = null, ot(r[t], i)) : r[t] = i), n && (r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function oa(r) {
  Nt(r, "itemStyle"), Nt(r, "lineStyle"), Nt(r, "areaStyle"), Nt(r, "label"), Nt(r, "labelLine"), Nt(r, "upperLabel"), Nt(r, "edgeLabel");
}
function wt(r, t) {
  var e = ka(r) && r[t], i = ka(e) && e.textStyle;
  if (i)
    for (var n = 0, a = hv.length; n < a; n++) {
      var o = hv[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
}
function ue(r) {
  r && (oa(r), wt(r, "label"), r.emphasis && wt(r.emphasis, "label"));
}
function _T(r) {
  if (ka(r)) {
    pu(r), oa(r), wt(r, "label"), wt(r, "upperLabel"), wt(r, "edgeLabel"), r.emphasis && (wt(r.emphasis, "label"), wt(r.emphasis, "upperLabel"), wt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (pu(t), ue(t));
    var e = r.markLine;
    e && (pu(e), ue(e));
    var i = r.markArea;
    i && ue(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !Kt(a))
        for (var o = 0; o < a.length; o++)
          ue(a[o]);
      C(r.categories, function(u) {
        oa(u);
      });
    }
    if (n && !Kt(n))
      for (var o = 0; o < n.length; o++)
        ue(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ue(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        $(l[o]) ? (ue(l[o][0]), ue(l[o][1])) : ue(l[o]);
    r.type === "gauge" ? (wt(r, "axisLabel"), wt(r, "title"), wt(r, "detail")) : r.type === "treemap" ? (Nt(r.breadcrumb, "itemStyle"), C(r.levels, function(u) {
      oa(u);
    })) : r.type === "tree" && oa(r.leaves);
  }
}
function tr(r) {
  return $(r) ? r : r ? [r] : [];
}
function up(r) {
  return ($(r) ? r[0] : r) || {};
}
function bT(r, t) {
  Se(tr(r.series), function(i) {
    ka(i) && _T(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Se(e, function(i) {
    Se(tr(r[i]), function(n) {
      n && (wt(n, "axisLabel"), wt(n.axisPointer, "label"));
    });
  }), Se(tr(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    wt(n, "axisLabel"), wt(n && n.axisPointer, "label");
  }), Se(tr(r.calendar), function(i) {
    Nt(i, "itemStyle"), wt(i, "dayLabel"), wt(i, "monthLabel"), wt(i, "yearLabel");
  }), Se(tr(r.radar), function(i) {
    wt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), Se(tr(r.geo), function(i) {
    ka(i) && (ue(i), Se(tr(i.regions), function(n) {
      ue(n);
    }));
  }), Se(tr(r.timeline), function(i) {
    ue(i), Nt(i, "label"), Nt(i, "itemStyle"), Nt(i, "controlStyle", !0);
    var n = i.data;
    $(n) && C(n, function(a) {
      H(a) && (Nt(a, "label"), Nt(a, "itemStyle"));
    });
  }), Se(tr(r.toolbox), function(i) {
    Nt(i, "iconStyle"), Se(i.feature, function(n) {
      Nt(n, "iconStyle");
    });
  }), wt(up(r.axisPointer), "label"), wt(up(r.tooltip).axisPointer, "label");
}
function ST(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function wT(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function hp(r) {
  r && C(xT, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var xT = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], TT = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], du = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function Gn(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < du.length; e++) {
      var i = du[e][1], n = du[e][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function fp(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (r.edgeDistance = r.margin);
}
function cp(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay);
}
function CT(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (r.emphasis.focus = "adjacency"));
}
function dm(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && dm(r[e].children, t);
}
function gm(r, t) {
  bT(r, t), r.series = Et(r.series), C(r.series, function(e) {
    if (H(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise), fp(e.label);
        var n = e.data;
        if (n && !Kt(n))
          for (var a = 0; a < n.length; a++)
            fp(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = ST(e, "pointer.color");
        o != null && wT(e, "itemStyle.color", o);
      } else if (i === "bar") {
        Gn(e), Gn(e.backgroundStyle), Gn(e.emphasis);
        var n = e.data;
        if (n && !Kt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (Gn(n[a]), Gn(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s)), cp(e), dm(e.data, cp);
      } else i === "graph" || i === "sankey" ? CT(e) : i === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && ot(e, e.mapLocation));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), hp(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), C(TT, function(e) {
    var i = r[e];
    i && ($(i) || (i = [i]), C(i, function(n) {
      hp(n);
    }));
  });
}
function MT(r) {
  var t = Q();
  r.eachSeries(function(e) {
    var i = e.get("stack");
    if (i) {
      var n = t.get(i) || t.set(i, []), a = e.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: e
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      n.length && a.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(o);
    }
  }), t.each(DT);
}
function DT(r) {
  C(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, f) {
      var v = o.get(t.stackedDimension, f);
      if (isNaN(v))
        return n;
      var c, p;
      s ? p = o.getRawIndex(f) : c = o.get(t.stackedByDimension, f);
      for (var g = NaN, d = e - 1; d >= 0; d--) {
        var y = r[d];
        if (s || (p = y.data.rawIndexOf(y.stackedByDimension, c)), p >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, p);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = Zb(v, m), g = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = g, i;
    });
  });
}
var fl = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === gr ? {} : []), this.sourceFormat = t.sourceFormat || hm, this.seriesLayoutBy = t.seriesLayoutBy || or, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && vm(this, i) === Jt.Must && (n.type = "ordinal");
        }
    }
    return r;
  }()
);
function Xf(r) {
  return r instanceof fl;
}
function xh(r, t, e) {
  e = e || mm(r);
  var i = t.seriesLayoutBy, n = IT(r, e, i, t.sourceHeader, t.dimensions), a = new fl({
    data: r,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: X(t)
  });
  return a;
}
function ym(r) {
  return new fl({
    data: r,
    sourceFormat: Kt(r) ? Or : _e
  });
}
function AT(r) {
  return new fl({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: X(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function mm(r) {
  var t = hm;
  if (Kt(r))
    t = Or;
  else if ($(r)) {
    r.length === 0 && (t = Qt);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if ($(n) || Kt(n)) {
          t = Qt;
          break;
        } else if (H(n)) {
          t = Qe;
          break;
        }
      }
    }
  } else if (H(r)) {
    for (var a in r)
      if (xi(r, a) && Zt(r[a])) {
        t = gr;
        break;
      }
  }
  return t;
}
function IT(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: vp(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Qt) {
    var s = r;
    i === "auto" || i == null ? pp(function(u) {
      u != null && u !== "-" && (V(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = gt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], pp(function(u, h) {
      n[h] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === In ? s.length : s[0] ? s[0].length : null;
  } else if (t === Qe)
    n || (n = LT(r));
  else if (t === gr)
    n || (n = [], C(r, function(u, h) {
      n.push(h);
    }));
  else if (t === _e) {
    var l = Xa(r[0]);
    a = $(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: vp(n),
    dimensionsDetectedCount: a
  };
}
function LT(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return dt(e);
}
function vp(r) {
  if (r) {
    var t = Q();
    return U(r, function(e, i) {
      e = H(e) ? e : {
        name: e
      };
      var n = {
        name: e.name,
        displayName: e.displayName,
        type: e.type
      };
      if (n.name == null)
        return n;
      n.name += "", n.displayName == null && (n.displayName = n.name);
      var a = t.get(n.name);
      return a ? n.name += "-" + a.count++ : t.set(n.name, {
        count: 1
      }), n;
    });
  }
}
function pp(r, t, e, i) {
  if (t === In)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function _m(r) {
  var t = r.sourceFormat;
  return t === Qe || t === gr;
}
var ai, oi, si, dp, gp, bm = (
  /** @class */
  function() {
    function r(t, e) {
      var i = Xf(t) ? t : ym(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === Or && (this._offset = 0, this._dimSize = e, this._data = n), gp(this, n, i);
    }
    return r.prototype.getSource = function() {
      return this._source;
    }, r.prototype.count = function() {
      return 0;
    }, r.prototype.getItem = function(t, e) {
    }, r.prototype.appendData = function(t) {
    }, r.prototype.clean = function() {
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.pure = !1, t.persistent = !0;
    }(), r.internalField = function() {
      var t;
      gp = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, f = l.startIndex, v = l.dimensionsDefine, c = dp[qf(u, h)];
        if (B(o, c), u === Or)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var p = Sm(u, h);
          o.getItem = j(p, null, s, f, v);
          var g = wm(u, h);
          o.count = j(g, null, s, f, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, h = u * o, f = 0; f < u; f++)
          s[f] = l[h + f];
        return s;
      }, i = function(o, s, l, u) {
        for (var h = this._data, f = this._dimSize, v = 0; v < f; v++) {
          for (var c = u[v], p = c[0] == null ? 1 / 0 : c[0], g = c[1] == null ? -1 / 0 : c[1], d = s - o, y = l[v], m = 0; m < d; m++) {
            var _ = h[m * f + v];
            y[o + m] = _, _ < p && (p = _), _ > g && (g = _);
          }
          c[0] = p, c[1] = g;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      dp = (t = {}, t[Qt + "_" + or] = {
        pure: !0,
        appendData: a
      }, t[Qt + "_" + In] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[Qe] = {
        pure: !0,
        appendData: a
      }, t[gr] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          C(o, function(l, u) {
            for (var h = s[u] || (s[u] = []), f = 0; f < (l || []).length; f++)
              h.push(l[f]);
          });
        }
      }, t[_e] = {
        appendData: a
      }, t[Or] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          this._data = o;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count(), this._data = null;
        }
      }, t);
      function a(o) {
        for (var s = 0; s < o.length; s++)
          this._data.push(o[s]);
      }
    }(), r;
  }()
), yp = function(r, t, e, i) {
  return r[i];
}, PT = (ai = {}, ai[Qt + "_" + or] = function(r, t, e, i) {
  return r[i + t];
}, ai[Qt + "_" + In] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, ai[Qe] = yp, ai[gr] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name, l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, ai[_e] = yp, ai);
function Sm(r, t) {
  var e = PT[qf(r, t)];
  return e;
}
var mp = function(r, t, e) {
  return r.length;
}, RT = (oi = {}, oi[Qt + "_" + or] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, oi[Qt + "_" + In] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, oi[Qe] = mp, oi[gr] = function(r, t, e) {
  var i = e[0].name, n = r[i];
  return n ? n.length : 0;
}, oi[_e] = mp, oi);
function wm(r, t) {
  var e = RT[qf(r, t)];
  return e;
}
var gu = function(r, t, e) {
  return r[t];
}, ET = (si = {}, si[Qt] = gu, si[Qe] = function(r, t, e) {
  return r[e];
}, si[gr] = gu, si[_e] = function(r, t, e) {
  var i = Xa(r);
  return i instanceof Array ? i[t] : i;
}, si[Or] = gu, si);
function xm(r) {
  var t = ET[r];
  return t;
}
function qf(r, t) {
  return r === Qt ? r + "_" + t : r;
}
function Sn(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return xm(a)(i, o, s);
      } else {
        var l = i;
        return a === _e && (l = Xa(i)), l;
      }
    }
  }
}
var OT = /\{@(.+?)\}/g, kT = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getDataParams = function(t, e) {
      var i = this.getData(e), n = this.getRawValue(t, e), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], h = l && l.stroke, f = this.mainType, v = f === "series", c = i.userOutput && i.userOutput.get();
      return {
        componentType: f,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: v ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: v ? this.id : null,
        seriesName: v ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: e,
        value: n,
        color: u,
        borderColor: h,
        dimensionNames: c ? c.fullDimensions : null,
        encode: c ? c.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, r.prototype.getFormattedLabel = function(t, e, i, n, a, o) {
      e = e || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && $(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (q(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if (V(a)) {
        var h = sm(a, l);
        return h.replace(OT, function(f, v) {
          var c = v.length, p = v;
          p.charAt(0) === "[" && p.charAt(c - 1) === "]" && (p = +p.slice(1, c - 1));
          var g = Sn(s, t, p);
          if (o && $(o.interpolatedValue)) {
            var d = s.getDimensionIndex(p);
            d >= 0 && (g = o.interpolatedValue[d]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return Sn(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  }()
);
function _p(r) {
  var t, e;
  return H(r) ? r.type && (e = r) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function ma(r) {
  return new BT(r);
}
var BT = (
  /** @class */
  function() {
    function r(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return r.prototype.perform = function(t) {
      var e = this._upstream, i = t && t.skip;
      if (this._dirty && e) {
        var n = this.context;
        n.data = n.outputData = e.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !i && (a = this._plan(this.context));
      var o = h(this._modBy), s = this._modDataCount || 0, l = h(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function h(m) {
        return !(m >= 1) && (m = 1), m;
      }
      var f;
      (this._dirty || a === "reset") && (this._dirty = !1, f = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (e ? this._dueEnd = e._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var c = this._dueIndex, p = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (f || c < p)) {
          var g = this._progress;
          if ($(g))
            for (var d = 0; d < g.length; d++)
              this._doProgress(g[d], c, p, l, u);
          else
            this._doProgress(g, c, p, l, u);
        }
        this._dueIndex = p;
        var y = this._settedOutputEnd != null ? this._settedOutputEnd : p;
        this._outputDueEnd = y;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      bp.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: bp.next
      }, this.context);
    }, r.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var e, i;
      !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), $(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, r.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, r.prototype.pipe = function(t) {
      (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
    }, r.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, r.prototype.getUpstream = function() {
      return this._upstream;
    }, r.prototype.getDownstream = function() {
      return this._downstream;
    }, r.prototype.setOutputEnd = function(t) {
      this._outputDueEnd = this._settedOutputEnd = t;
    }, r;
  }()
), bp = /* @__PURE__ */ function() {
  var r, t, e, i, n, a = {
    reset: function(l, u, h, f) {
      t = l, r = u, e = h, i = f, n = Math.ceil(i / e), a.next = e > 1 && i > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < r ? t++ : null;
  }
  function s() {
    var l = t % n * e + Math.ceil(t / n), u = t >= r ? null : l < i ? l : t;
    return t++, u;
  }
}();
function es(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !gt(r) && r != null && r !== "-" && (r = +lr(r)), r == null || r === "" ? NaN : Number(r));
}
Q({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +lr(r);
  },
  trim: function(r) {
    return V(r) ? ze(r) : r;
  }
});
var NT = (
  /** @class */
  function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = gt(t) ? t : _s(t), n = gt(e) ? e : _s(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = V(t), l = V(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  }()
), $T = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getRawData = function() {
      throw new Error("not supported");
    }, r.prototype.getRawDataItem = function(t) {
      throw new Error("not supported");
    }, r.prototype.cloneRawData = function() {
    }, r.prototype.getDimensionInfo = function(t) {
    }, r.prototype.cloneAllDimensionInfo = function() {
    }, r.prototype.count = function() {
    }, r.prototype.retrieveValue = function(t, e) {
    }, r.prototype.retrieveValueFromItem = function(t, e) {
    }, r.prototype.convertValue = function(t, e) {
      return es(t, e);
    }, r;
  }()
);
function zT(r, t) {
  var e = new $T(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== or && Xt(o);
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    C(u, function(g, d) {
      var y = g.name, m = {
        index: d,
        name: y,
        displayName: g.displayName
      };
      if (s.push(m), y != null) {
        var _ = "";
        xi(l, y) && Xt(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < r.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var f = Sm(n, or);
  t.__isBuiltIn && (e.getRawDataItem = function(g) {
    return f(i, a, s, g);
  }, e.getRawData = j(FT, null, r)), e.cloneRawData = j(VT, null, r);
  var v = wm(n, or);
  e.count = j(v, null, i, a, s);
  var c = xm(n);
  e.retrieveValue = function(g, d) {
    var y = f(i, a, s, g);
    return p(y, d);
  };
  var p = e.retrieveValueFromItem = function(g, d) {
    if (g != null) {
      var y = s[d];
      if (y)
        return c(g, d, y.name);
    }
  };
  return e.getDimensionInfo = j(HT, null, s, l), e.cloneAllDimensionInfo = j(GT, null, s), e;
}
function FT(r) {
  var t = r.sourceFormat;
  if (!Zf(t)) {
    var e = "";
    Xt(e);
  }
  return r.data;
}
function VT(r) {
  var t = r.sourceFormat, e = r.data;
  if (!Zf(t)) {
    var i = "";
    Xt(i);
  }
  if (t === Qt) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === Qe) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(B({}, e[a]));
    return n;
  }
}
function HT(r, t, e) {
  if (e != null) {
    if (gt(e) || !isNaN(e) && !xi(t, e))
      return r[e];
    if (xi(t, e))
      return t[e];
  }
}
function GT(r) {
  return X(r);
}
var Tm = Q();
function WT(r) {
  r = X(r);
  var t = r.type, e = "";
  t || Xt(e);
  var i = t.split(":");
  i.length !== 2 && Xt(e);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, Tm.set(t, r);
}
function UT(r, t, e) {
  var i = Et(r), n = i.length, a = "";
  n || Xt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = YT(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function YT(r, t, e, i) {
  var n = "";
  t.length || Xt(n), H(r) || Xt(n);
  var a = r.type, o = Tm.get(a);
  o || Xt(n);
  var s = U(t, function(u) {
    return zT(u, o);
  }), l = Et(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: X(r.config)
  }));
  return U(l, function(u, h) {
    var f = "";
    H(u) || Xt(f), u.data || Xt(f);
    var v = mm(u.data);
    Zf(v) || Xt(f);
    var c, p = t[0];
    if (p && h === 0 && !u.dimensions) {
      var g = p.startIndex;
      g && (u.data = p.data.slice(0, g).concat(u.data)), c = {
        seriesLayoutBy: or,
        sourceHeader: g,
        dimensions: p.metaRawOption.dimensions
      };
    } else
      c = {
        seriesLayoutBy: or,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return xh(u.data, c, null);
  });
}
function Zf(r) {
  return r === Qt || r === Qe;
}
var cl = "undefined", XT = typeof Uint32Array === cl ? Array : Uint32Array, qT = typeof Uint16Array === cl ? Array : Uint16Array, Cm = typeof Int32Array === cl ? Array : Int32Array, Sp = typeof Float64Array === cl ? Array : Float64Array, Mm = {
  float: Sp,
  int: Cm,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Sp
}, yu;
function Vi(r) {
  return r > 65535 ? XT : qT;
}
function Hi() {
  return [1 / 0, -1 / 0];
}
function ZT(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function wp(r, t, e, i, n) {
  var a = Mm[e || "float"];
  if (n) {
    var o = r[t], s = o && o.length;
    if (s !== i) {
      for (var l = new a(i), u = 0; u < s; u++)
        l[u] = o[u];
      r[t] = l;
    }
  } else
    r[t] = new a(i);
}
var Th = (
  /** @class */
  function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Q();
    }
    return r.prototype.initData = function(t, e, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = yu[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], _m(n), this._dimensions = U(e, function(o) {
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: o.type,
          property: o.property
        };
      }), this._initDataFromProvider(0, t.count());
    }, r.prototype.getProvider = function() {
      return this._provider;
    }, r.prototype.getSource = function() {
      return this._provider.getSource();
    }, r.prototype.ensureCalculationDimension = function(t, e) {
      var i = this._calcDimNameToIdx, n = this._dimensions, a = i.get(t);
      if (a != null) {
        if (n[a].type === e)
          return a;
      } else
        a = n.length;
      return n[a] = {
        type: e
      }, i.set(t, a), this._chunks[a] = new Mm[e || "float"](this._rawCount), this._rawExtent[a] = Hi(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Hi());
      for (var l = a[t], u = o; u < s; u++) {
        var h = i[u] = e.parseAndCollect(i[u]);
        isNaN(h) || (l[0] = Math.min(h, l[0]), l[1] = Math.max(h, l[1]));
      }
      n.ordinalMeta = e, n.ordinalOffset = s, n.type = "ordinal";
    }, r.prototype.getOrdinalMeta = function(t) {
      var e = this._dimensions[t], i = e.ordinalMeta;
      return i;
    }, r.prototype.getDimensionProperty = function(t) {
      var e = this._dimensions[t];
      return e && e.property;
    }, r.prototype.appendData = function(t) {
      var e = this._provider, i = this.count();
      e.appendData(t);
      var n = e.count();
      return e.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, r.prototype.appendValues = function(t, e) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e || 0), u = 0; u < a; u++) {
        var h = n[u];
        wp(i, u, h.type, l, !0);
      }
      for (var f = [], v = s; v < l; v++)
        for (var c = v - s, p = 0; p < a; p++) {
          var h = n[p], g = yu.arrayRows.call(this, t[c] || f, h.property, c, p);
          i[p][v] = g;
          var d = o[p];
          g < d[0] && (d[0] = g), g > d[1] && (d[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = U(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var f = o[h];
        l[h] || (l[h] = Hi()), wp(a, h, f.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], c = t; c < e; c++) {
          v = n.getItem(c, v);
          for (var p = 0; p < s; p++) {
            var g = a[p], d = this._dimValueGetter(v, u[p], c, p);
            g[c] = d;
            var y = l[p];
            d < y[0] && (y[0] = d), d > y[1] && (y[1] = d);
          }
        }
      !n.persistent && n.clean && n.clean(), this._rawCount = this._count = e, this._extent = [];
    }, r.prototype.count = function() {
      return this._count;
    }, r.prototype.get = function(t, e) {
      if (!(e >= 0 && e < this._count))
        return NaN;
      var i = this._chunks[t];
      return i ? i[this.getRawIndex(e)] : NaN;
    }, r.prototype.getValues = function(t, e) {
      var i = [], n = [];
      if (e == null) {
        e = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          n.push(a);
      } else
        n = t;
      for (var a = 0, o = n.length; a < o; a++)
        i.push(this.get(n[a], e));
      return i;
    }, r.prototype.getByRawIndex = function(t, e) {
      if (!(e >= 0 && e < this._rawCount))
        return NaN;
      var i = this._chunks[t];
      return i ? i[e] : NaN;
    }, r.prototype.getSum = function(t) {
      var e = this._chunks[t], i = 0;
      if (e)
        for (var n = 0, a = this.count(); n < a; n++) {
          var o = this.get(t, n);
          isNaN(o) || (i += o);
        }
      return i;
    }, r.prototype.getMedian = function(t) {
      var e = [];
      this.each([t], function(a) {
        isNaN(a) || e.push(a);
      });
      var i = e.sort(function(a, o) {
        return a - o;
      }), n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;
    }, r.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var e = this._indices, i = e[t];
      if (i != null && i < this._count && i === t)
        return t;
      for (var n = 0, a = this._count - 1; n <= a; ) {
        var o = (n + a) / 2 | 0;
        if (e[o] < t)
          n = o + 1;
        else if (e[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      var n = this._chunks, a = n[t], o = [];
      if (!a)
        return o;
      i == null && (i = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, h = 0, f = this.count(); h < f; h++) {
        var v = this.getRawIndex(h), c = e - a[v], p = Math.abs(c);
        p <= i && ((p < s || p === s && c >= 0 && l < 0) && (s = p, l = c, u = 0), c === l && (o[u++] = h));
      }
      return o.length = u, o;
    }, r.prototype.getIndices = function() {
      var t, e = this._indices;
      if (e) {
        var i = e.constructor, n = this._count;
        if (i === Array) {
          t = new i(n);
          for (var a = 0; a < n; a++)
            t[a] = e[a];
        } else
          t = new i(e.buffer, 0, n);
      } else {
        var i = Vi(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = Vi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, h = t[0], f = i._chunks, v = 0; v < n; v++) {
        var c = void 0, p = i.getRawIndex(v);
        if (l === 0)
          c = e(v);
        else if (l === 1) {
          var g = f[h][p];
          c = e(g, v);
        } else {
          for (var d = 0; d < l; d++)
            s[d] = f[t[d]][p];
          s[d] = v, c = e.apply(null, s);
        }
        c && (o[u++] = p);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = dt(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = Vi(e._rawCount), l = new s(o), u = 0, h = n[0], f = t[h][0], v = t[h][1], c = e._chunks, p = !1;
      if (!e._indices) {
        var g = 0;
        if (a === 1) {
          for (var d = c[n[0]], y = 0; y < i; y++) {
            var m = d[y];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = g), g++;
          }
          p = !0;
        } else if (a === 2) {
          for (var d = c[n[0]], _ = c[n[1]], b = t[n[1]][0], w = t[n[1]][1], y = 0; y < i; y++) {
            var m = d[y], S = _[y];
            (m >= f && m <= v || isNaN(m)) && (S >= b && S <= w || isNaN(S)) && (l[u++] = g), g++;
          }
          p = !0;
        }
      }
      if (!p)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = e.getRawIndex(y), m = c[n[0]][x];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var M = !0, x = e.getRawIndex(y), D = 0; D < a; D++) {
              var A = n[D], m = c[A][x];
              (m < t[A][0] || m > t[A][1]) && (M = !1);
            }
            M && (l[u++] = e.getRawIndex(y));
          }
      return u < o && (e._indices = l), e._count = u, e._extent = [], e._updateGetRawIdx(), e;
    }, r.prototype.map = function(t, e) {
      var i = this.clone(t);
      return this._updateDims(i, t, e), i;
    }, r.prototype.modify = function(t, e) {
      this._updateDims(this, t, e);
    }, r.prototype._updateDims = function(t, e, i) {
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, h = 0; h < e.length; h++)
        u[e[h]] = Hi();
      for (var f = 0; f < s; f++) {
        for (var v = t.getRawIndex(f), c = 0; c < o; c++)
          l[c] = n[e[c]][v];
        l[o] = f;
        var p = i && i.apply(null, l);
        if (p != null) {
          typeof p != "object" && (a[0] = p, p = a);
          for (var h = 0; h < p.length; h++) {
            var g = e[h], d = p[h], y = u[g], m = n[g];
            m && (m[v] = d), d < y[0] && (y[0] = d), d > y[1] && (y[1] = d);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), h, f, v, c = new (Vi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      c[s++] = u;
      for (var p = 1; p < o - 1; p += l) {
        for (var g = Math.min(p + l, o - 1), d = Math.min(p + l * 2, o), y = (d + g) / 2, m = 0, _ = g; _ < d; _++) {
          var b = this.getRawIndex(_), w = a[b];
          isNaN(w) || (m += w);
        }
        m /= d - g;
        var S = p, x = Math.min(p + l, o), M = p - 1, D = a[u];
        h = -1, v = S;
        for (var A = -1, T = 0, _ = S; _ < x; _++) {
          var b = this.getRawIndex(_), w = a[b];
          if (isNaN(w)) {
            T++, A < 0 && (A = b);
            continue;
          }
          f = Math.abs((M - y) * (w - D) - (M - _) * (m - D)), f > h && (h = f, v = b);
        }
        T > 0 && T < x - S && (c[s++] = Math.min(A, v), v = Math.max(A, v)), c[s++] = v, u = v;
      }
      return c[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = c, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (Vi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var f = h, v = o[this.getRawIndex(f)], c = h, p = o[this.getRawIndex(c)], g = a;
        h + a > s && (g = s - h);
        for (var d = 0; d < g; d++) {
          var y = this.getRawIndex(h + d), m = o[y];
          m < v && (v = m, f = h + d), m > p && (p = m, c = h + d);
        }
        var _ = this.getRawIndex(f), b = this.getRawIndex(c);
        f < c ? (l[u++] = _, l[u++] = b) : (l[u++] = b, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], h = this.count(), f = a._rawExtent[t] = Hi(), v = new (Vi(this._rawCount))(Math.ceil(h / l)), c = 0, p = 0; p < h; p += l) {
        l > h - p && (l = h - p, s.length = l);
        for (var g = 0; g < l; g++) {
          var d = this.getRawIndex(p + g);
          s[g] = u[d];
        }
        var y = i(s), m = this.getRawIndex(Math.min(p + n(s, y) || 0, h - 1));
        u[m] = y, y < f[0] && (f[0] = y), y > f[1] && (f[1] = y), v[c++] = m;
      }
      return a._count = c, a._indices = v, a._updateGetRawIdx(), a;
    }, r.prototype.each = function(t, e) {
      if (this._count)
        for (var i = t.length, n = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (i) {
            case 0:
              e(a);
              break;
            case 1:
              e(n[t[0]][s], a);
              break;
            case 2:
              e(n[t[0]][s], n[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < i; l++)
                u[l] = n[t[l]][s];
              u[l] = a, e.apply(null, u);
          }
        }
    }, r.prototype.getDataExtent = function(t) {
      var e = this._chunks[t], i = Hi();
      if (!e)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var h = this.getRawIndex(u), f = e[h];
        f < s && (s = f), f > l && (l = f);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, r.prototype.getRawDataItem = function(t) {
      var e = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(e);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][e]);
      return i;
    }, r.prototype.clone = function(t, e) {
      var i = new r(), n = this._chunks, a = t && Mn(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? ZT(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, r.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = X(this._extent), t._rawExtent = X(this._rawExtent);
    }, r.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, e = void 0;
        if (t === Array) {
          var i = this._indices.length;
          e = new t(i);
          for (var n = 0; n < i; n++)
            e[n] = this._indices[n];
        } else
          e = new t(this._indices);
        return e;
      }
      return null;
    }, r.prototype._getRawIdxIdentity = function(t) {
      return t;
    }, r.prototype._getRawIdx = function(t) {
      return t < this._count && t >= 0 ? this._indices[t] : -1;
    }, r.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, r.internalField = function() {
      function t(e, i, n, a) {
        return es(e[a], this._dimensions[a]);
      }
      yu = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return es(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return es(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    }(), r;
  }()
), KT = (
  /** @class */
  function() {
    function r(t) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = t;
    }
    return r.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, r.prototype._setLocalSource = function(t, e) {
      this._sourceList = t, this._upstreamSignList = e, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, r.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, r.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, r.prototype._createSource = function() {
      this._setLocalSource([], []);
      var t = this._sourceHost, e = this._getUpstreamSourceManagers(), i = !!e.length, n, a;
      if (wo(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var h = e[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = Kt(s) ? Or : _e, a = [];
        var f = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, c = J(f.seriesLayoutBy, v.seriesLayoutBy) || null, p = J(f.sourceHeader, v.sourceHeader), g = J(f.dimensions, v.dimensions), d = c !== v.seriesLayoutBy || !!p != !!v.sourceHeader || g;
        n = d ? [xh(s, {
          seriesLayoutBy: c,
          sourceHeader: p,
          dimensions: g
        }, l)] : [];
      } else {
        var y = t;
        if (i) {
          var m = this._applyTransform(e);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          n = [xh(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && xp(a);
      }
      var o, s = [], l = [];
      return C(t, function(u) {
        u.prepareSource();
        var h = u.getSource(n || 0), f = "";
        n != null && !h && xp(f), s.push(h), l.push(u._getVersionSign());
      }), i ? o = UT(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [AT(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, r.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), e = 0; e < t.length; e++) {
        var i = t[e];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          i._isDirty() || this._upstreamSignList[e] !== i._getVersionSign()
        )
          return !0;
      }
    }, r.prototype.getSource = function(t) {
      t = t || 0;
      var e = this._sourceList[t];
      if (!e) {
        var i = this._getUpstreamSourceManagers();
        return i[0] && i[0].getSource(t);
      }
      return e;
    }, r.prototype.getSharedDataStore = function(t) {
      var e = t.makeStoreSchema();
      return this._innerGetDataStore(e.dimensions, t.source, e.hash);
    }, r.prototype._innerGetDataStore = function(t, e, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        wo(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new Th(), s.initData(new bm(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (wo(t)) {
        var e = cm(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return U(rT(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (wo(t))
        e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), n = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        e = a.get("seriesLayoutBy", !0), i = a.get("sourceHeader", !0), n = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: e,
        sourceHeader: i,
        dimensions: n
      };
    }, r;
  }()
);
function wo(r) {
  return r.mainType === "series";
}
function xp(r) {
  throw new Error(r);
}
var QT = "line-height:1";
function Dm(r) {
  var t = r.lineHeight;
  return t == null ? QT : "line-height:" + Ut(t + "") + "px";
}
function Am(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Ut(i + "") + "px;color:" + Ut(e) + ";font-weight:" + Ut(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Ut(o + "") + "px;color:" + Ut(a) + ";font-weight:" + Ut(s + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: e,
      fontWeight: n
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var jT = [0, 10, 20, 30], JT = ["", `
`, `

`, `


`];
function Ba(r, t) {
  return t.type = r, t;
}
function Ch(r) {
  return r.type === "section";
}
function Im(r) {
  return Ch(r) ? tC : eC;
}
function Lm(r) {
  if (Ch(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return C(r.blocks, function(n) {
      var a = Lm(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Ch(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function tC(r, t, e, i) {
  var n = t.noHeader, a = rC(Lm(t)), o = [], s = t.blocks || [];
  He(!s || $(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (xi(u, l)) {
      var h = new NT(u[l], null);
      s.sort(function(g, d) {
        return h.evaluate(g.sortParam, d.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  C(s, function(g, d) {
    var y = t.valueFormatter, m = Im(g)(
      // Inherit valueFormatter
      y ? B(B({}, r), {
        valueFormatter: y
      }) : r,
      g,
      d > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var f = r.renderMode === "richText" ? o.join(a.richText) : Mh(i, o.join(""), n ? e : a.html);
  if (n)
    return f;
  var v = wh(t.header, "ordinal", r.useUTC), c = Am(i, r.renderMode).nameStyle, p = Dm(i);
  return r.renderMode === "richText" ? Pm(r, v, c) + a.richText + f : Mh(i, '<div style="' + c + ";" + p + ';">' + Ut(v) + "</div>" + f, e);
}
function eC(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, h = t.valueFormatter || r.valueFormatter || function(b) {
    return b = $(b) ? b : [b], U(b, function(w, S) {
      return wh(w, $(c) ? c[S] : c, u);
    });
  };
  if (!(a && o)) {
    var f = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : wh(l, "ordinal", u), c = t.valueType, p = o ? [] : h(t.value, t.dataIndex), g = !s || !a, d = !s && a, y = Am(i, n), m = y.nameStyle, _ = y.valueStyle;
    return n === "richText" ? (s ? "" : f) + (a ? "" : Pm(r, v, m)) + (o ? "" : aC(r, p, g, d, _)) : Mh(i, (s ? "" : f) + (a ? "" : iC(v, !s, m)) + (o ? "" : nC(p, g, d, _)), e);
  }
}
function Tp(r, t, e, i, n, a) {
  if (r) {
    var o = Im(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function rC(r) {
  return {
    html: jT[r],
    richText: JT[r]
  };
}
function Mh(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = Dm(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function iC(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + Ut(r) + "</span>";
}
function nC(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = $(r) ? r : [r], '<span style="' + a + ";" + i + '">' + U(r, function(o) {
    return Ut(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function Pm(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function aC(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle($(t) ? t.join("  ") : t, a);
}
function oC(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return Mi(i);
}
function Rm(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var mu = (
  /** @class */
  function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = hy();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = Xx({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return V(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      $(e) ? C(e, function(a) {
        return B(i, a);
      }) : B(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  }()
);
function sC(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = $(s), u = oC(t, e), h, f, v, c;
  if (o > 1 || l && !o) {
    var p = lC(s, t, e, a, u);
    h = p.inlineValues, f = p.inlineValueTypes, v = p.blocks, c = p.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    c = h = Sn(n, e, a[0]), f = g.type;
  } else
    c = h = l ? s[0] : s;
  var d = xf(t), y = d && t.name || "", m = n.getName(e), _ = i ? y : m;
  return Ba("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !d,
    sortParam: c,
    blocks: [Ba("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !ze(_),
      value: h,
      valueType: f,
      dataIndex: e
    })].concat(v || [])
  });
}
function lC(r, t, e, i, n) {
  var a = t.getData(), o = Mn(r, function(f, v, c) {
    var p = a.getDimensionInfo(c);
    return f = f || p && p.tooltip !== !1 && p.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? C(i, function(f) {
    h(Sn(a, e, f), f);
  }) : C(r, h);
  function h(f, v) {
    var c = a.getDimensionInfo(v);
    !c || c.otherDims.tooltip === !1 || (o ? u.push(Ba("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: c.displayName,
      value: f,
      valueType: c.type
    })) : (s.push(f), l.push(c.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Sr = At();
function xo(r, t) {
  return r.getName(t) || r.getId(t);
}
var uC = "__universalTransitionEnabled", Ie = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = ma({
        count: fC,
        reset: cC
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = Sr(this).sourceManager = new KT(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      Mp(o, this), this.dataTask.context.data = o, Sr(this).dataBeforeProcessed = o, Cp(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Oa(this), a = n ? ul(e) : {}, o = this.subType;
      st.hasClass(o) && (o += "Series"), rt(e, i.getTheme().get(this.subType)), rt(e, this.getDefaultOption()), uv(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && bn(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = rt(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = Oa(this);
      n && bn(this.option, e, n);
      var a = Sr(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      Mp(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Sr(this).dataBeforeProcessed = o, Cp(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !Kt(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && uv(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Dh(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return Sr(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = Dh(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      Sr(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return Q(e);
    }, t.prototype.getSourceManager = function() {
      return Sr(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Sr(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return sC({
        series: this,
        dataIndex: e,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var e = this.ecModel;
      if (Y.node && !(e && e.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(e, i, n) {
      var a = this.ecModel, o = Uf.prototype.getColorFromPalette.call(this, e, i, n);
      return o || (o = a.getColorFromPalette(e, i, n)), o;
    }, t.prototype.coordDimToDataDim = function(e) {
      return this.getRawData().mapDimensionsAll(e);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(e, i) {
      this._innerSelect(this.getData(i), e);
    }, t.prototype.unselect = function(e, i) {
      var n = this.option.selectedMap;
      if (n) {
        var a = this.option.selectedMode, o = this.getData(i);
        if (a === "series" || n === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < e.length; s++) {
          var l = e[s], u = xo(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = dt(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[xo(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[uC])
        return !0;
      var e = this.option.universalTransition;
      return e ? e === !0 ? !0 : e && e.enabled : !1;
    }, t.prototype._innerSelect = function(e, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          H(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, h = 0; h < l; h++) {
            var f = i[h], v = xo(e, f);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(f);
          }
        } else if (s === "single" || s === !0) {
          var c = i[l - 1], v = xo(e, c);
          o.selectedMap = (n = {}, n[v] = !0, n), this._selectedDataIndicesMap = (a = {}, a[v] = e.getRawIndex(c), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(e) {
      if (!this.option.selectedMap) {
        var i = [];
        e.hasItemOption && e.each(function(n) {
          var a = e.getRawDataItem(n);
          a && a.selected && i.push(n);
        }), i.length > 0 && this._innerSelect(e, i);
      }
    }, t.registerClass = function(e) {
      return st.registerClass(e);
    }, t.protoInitialize = function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    }(), t;
  }(st)
);
qe(Ie, kT);
qe(Ie, Uf);
gy(Ie, st);
function Cp(r) {
  var t = r.name;
  xf(r) || (r.name = hC(r) || t);
}
function hC(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return C(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function fC(r) {
  return r.model.getRawData().count();
}
function cC(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), vC;
}
function vC(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Mp(r, t) {
  C(D1(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, Mt(pC, t));
  });
}
function pC(r, t) {
  var e = Dh(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Dh(r) {
  var t = (r.ecModel || {}).scheduler, e = t && t.getPipeline(r.uid);
  if (e) {
    var i = e.currentTask;
    if (i) {
      var n = i.agentStubMap;
      n && (i = n.get(r.uid));
    }
    return i;
  }
}
var Le = (
  /** @class */
  function() {
    function r() {
      this.group = new Tt(), this.uid = rl("viewComponent");
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
    }, r.prototype.updateLayout = function(t, e, i, n) {
    }, r.prototype.updateVisual = function(t, e, i, n) {
    }, r.prototype.toggleBlurSeries = function(t, e, i) {
    }, r.prototype.eachRendered = function(t) {
      var e = this.group;
      e && e.traverse(t);
    }, r;
  }()
);
Cf(Le);
Ws(Le);
function Kf() {
  var r = At();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var Em = At(), dC = Kf(), ye = (
  /** @class */
  function() {
    function r() {
      this.group = new Tt(), this.uid = rl("viewChart"), this.renderTask = ma({
        plan: gC,
        reset: yC
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Ap(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Ap(a, n, "normal");
    }, r.prototype.remove = function(t, e) {
      this.group.removeAll();
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateLayout = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateVisual = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.eachRendered = function(t) {
      Ka(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      Em(t).updateMethod = e;
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.type = "chart";
    }(), r;
  }()
);
function Dp(r, t, e) {
  r && yh(r) && (t === "emphasis" ? Ss : ws)(r, e);
}
function Ap(r, t, e) {
  var i = Ti(r, t), n = t && t.highlightKey != null ? Rw(t.highlightKey) : null;
  i != null ? C(Et(i), function(a) {
    Dp(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    Dp(a, e, n);
  });
}
Cf(ye);
Ws(ye);
function gC(r) {
  return dC(r.model);
}
function yC(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && Em(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), mC[l];
}
var mC = {
  incrementalPrepareRender: {
    progress: function(r, t) {
      t.view.incrementalRender(r, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(r, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
}, As = "\0__throttleOriginMethod", Ip = "\0__throttleRate", Lp = "\0__throttleType";
function Qf(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function f() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var c = [], p = 0; p < arguments.length; p++)
      c[p] = arguments[p];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = c;
    var g = h || t, d = h || e;
    h = null, s = i - (d ? n : a) - g, clearTimeout(o), d ? o = setTimeout(f, g) : s >= 0 ? f() : o = setTimeout(f, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(c) {
    h = c;
  }, v;
}
function Om(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[As] || n, o = n[Lp], s = n[Ip];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = Qf(a, e, i === "debounce"), n[As] = a, n[Lp] = i, n[Ip] = e;
    }
    return n;
  }
}
function Ah(r, t) {
  var e = r[t];
  e && e[As] && (e.clear && e.clear(), r[t] = e[As]);
}
var Pp = At(), Rp = {
  itemStyle: La(qy, !0),
  lineStyle: La(Xy, !0)
}, _C = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function km(r, t) {
  var e = r.visualStyleMapper || Rp[t];
  return e || (console.warn("Unknown style type '" + t + "'."), Rp.itemStyle);
}
function Bm(r, t) {
  var e = r.visualDrawType || _C[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var bC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = km(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = Bm(r, i), u = o[l], h = q(u) ? u : null, f = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || h || f) {
      var v = r.getColorFromPalette(
        // TODO series count changed.
        r.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, e.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || q(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || q(o.stroke) ? v : o.stroke;
    }
    if (e.setVisual("style", o), e.setVisual("drawType", l), !t.isSeriesFiltered(r) && h)
      return e.setVisual("colorFromPalette", !1), {
        dataEach: function(c, p) {
          var g = r.getDataParams(p), d = B({}, o);
          d[l] = h(g), c.setItemVisual(p, "style", d);
        }
      };
  }
}, Wn = new St(), SC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = km(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            Wn.option = l[i];
            var u = n(Wn), h = o.ensureUniqueItemVisual(s, "style");
            B(h, u), Wn.option.decal && (o.setItemVisual(s, "decal", Wn.option.decal), Wn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, wC = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = Q();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Pp(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Pp(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = Bm(e, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          n[h] = u;
        }), i.each(function(u) {
          var h = n[u], f = a.getItemVisual(h, "colorFromPalette");
          if (f) {
            var v = a.ensureUniqueItemVisual(h, "style"), c = i.getName(u) || u + "", p = i.count();
            v[l] = e.getColorFromPalette(c, o, p);
          }
        });
      }
    });
  }
}, To = Math.PI;
function xC(r, t) {
  t = t || {}, ot(t, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var e = new Tt(), i = new _t({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new Dt({
    style: {
      text: t.text,
      fill: t.textColor,
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      fontStyle: t.fontStyle,
      fontFamily: t.fontFamily
    },
    zlevel: t.zlevel,
    z: 10001
  }), a = new _t({
    style: {
      fill: "none"
    },
    textContent: n,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: t.zlevel,
    z: 10001
  });
  e.add(a);
  var o;
  return t.showSpinner && (o = new js({
    shape: {
      startAngle: -To / 2,
      endAngle: -To / 2 + 0.1,
      r: t.spinnerRadius
    },
    style: {
      stroke: t.color,
      lineCap: "round",
      lineWidth: t.lineWidth
    },
    zlevel: t.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: To * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: To * 3 / 2
  }).delay(300).start("circularInOut"), e.add(o)), e.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (r.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), h = r.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: h
    }), a.setShape({
      x: u - l,
      y: h - l,
      width: l * 2,
      height: l * 2
    }), i.setShape({
      x: 0,
      y: 0,
      width: r.getWidth(),
      height: r.getHeight()
    });
  }, e.resize(), e;
}
var Nm = (
  /** @class */
  function() {
    function r(t, e, i, n) {
      this._stageTaskMap = Q(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
    }
    return r.prototype.restoreData = function(t, e) {
      t.restoreData(e), this._stageTaskMap.each(function(i) {
        var n = i.overallTask;
        n && n.dirty();
      });
    }, r.prototype.getPerformArgs = function(t, e) {
      if (t.__pipeline) {
        var i = this._pipelineMap.get(t.__pipeline.id), n = i.context, a = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex, o = a ? i.step : null, s = n && n.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, r.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, r.prototype.updateStreamModes = function(t, e) {
      var i = this._pipelineMap.get(t.uid), n = t.getData(), a = n.count(), o = i.progressiveEnabled && e.incrementalPrepareRender && a >= i.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = i.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, r.prototype.restorePipelines = function(t) {
      var e = this, i = e._pipelineMap = Q();
      t.eachSeries(function(n) {
        var a = n.getProgressive(), o = n.uid;
        i.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: n.getProgressiveThreshold(),
          progressiveEnabled: a && !(n.preventIncremental && n.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0
        }), e._pipe(n, n.dataTask);
      });
    }, r.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, e = this.api.getModel(), i = this.api;
      C(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        He(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
      }, this);
    }, r.prototype.prepareView = function(t, e, i, n) {
      var a = t.renderTask, o = a.context;
      o.model = e, o.ecModel = i, o.api = n, a.__block = !t.incrementalPrepareRender, this._pipe(e, a);
    }, r.prototype.performDataProcessorTasks = function(t, e) {
      this._performStageTasks(this._dataProcessorHandlers, t, e, {
        block: !0
      });
    }, r.prototype.performVisualTasks = function(t, e, i) {
      this._performStageTasks(this._visualHandlers, t, e, i);
    }, r.prototype._performStageTasks = function(t, e, i, n) {
      n = n || {};
      var a = !1, o = this;
      C(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var h = o._stageTaskMap.get(l.uid), f = h.seriesTaskMap, v = h.overallTask;
          if (v) {
            var c, p = v.agentStubMap;
            p.each(function(d) {
              s(n, d) && (d.dirty(), c = !0);
            }), c && v.dirty(), o.updatePayload(v, i);
            var g = o.getPerformArgs(v, n.block);
            p.each(function(d) {
              d.perform(g);
            }), v.perform(g) && (a = !0);
          } else f && f.each(function(d, y) {
            s(n, d) && d.dirty();
            var m = o.getPerformArgs(d, n.block);
            m.skip = !l.performRawSeries && e.isSeriesFiltered(d.context.model), o.updatePayload(d, i), d.perform(m) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, r.prototype.performSeriesTasks = function(t) {
      var e;
      t.eachSeries(function(i) {
        e = i.dataTask.perform() || e;
      }), this.unfinished = e || this.unfinished;
    }, r.prototype.plan = function() {
      this._pipelineMap.each(function(t) {
        var e = t.tail;
        do {
          if (e.__block) {
            t.blockIndex = e.__idxInPipeline;
            break;
          }
          e = e.getUpstream();
        } while (e);
      });
    }, r.prototype.updatePayload = function(t, e) {
      e !== "remain" && (t.context.payload = e);
    }, r.prototype._createSeriesStageTask = function(t, e, i, n) {
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = Q(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : u && u(i, n).each(h);
      function h(f) {
        var v = f.uid, c = s.set(v, o && o.get(v) || ma({
          plan: AC,
          reset: IC,
          count: PC
        }));
        c.context = {
          model: f,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(f, c);
      }
    }, r.prototype._createOverallStageTask = function(t, e, i, n) {
      var a = this, o = e.overallTask = e.overallTask || ma({
        reset: TC
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Q(), u = t.seriesType, h = t.getTargetSeries, f = !0, v = !1, c = "";
      He(!t.createOnAllSeries, c), u ? i.eachRawSeriesByType(u, p) : h ? h(i, n).each(p) : (f = !1, C(i.getSeries(), p));
      function p(g) {
        var d = g.uid, y = l.set(d, s && s.get(d) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, ma({
          reset: CC,
          onDirty: DC
        })));
        y.context = {
          model: g,
          overallProgress: f
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, y.agent = o, y.__block = f, a._pipe(g, y);
      }
      v && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return q(t) && (t = {
        overallReset: t,
        seriesType: RC(t)
      }), t.uid = rl("stageHandler"), e && (t.visualType = e), t;
    }, r;
  }()
);
function TC(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function CC(r) {
  return r.overallProgress && MC;
}
function MC() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function DC() {
  this.agent && this.agent.dirty();
}
function AC(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function IC(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Et(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? U(t, function(e, i) {
    return $m(i);
  }) : LC;
}
var LC = $m(0);
function $m(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function PC(r) {
  return r.data.count();
}
function RC(r) {
  Is = null;
  try {
    r(Na, zm);
  } catch {
  }
  return Is;
}
var Na = {}, zm = {}, Is;
Fm(Na, Yf);
Fm(zm, pm);
Na.eachSeriesByType = Na.eachRawSeriesByType = function(r) {
  Is = r;
};
Na.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Is = r.subType);
};
function Fm(r, t) {
  for (var e in t.prototype)
    r[e] = Ht;
}
var Ep = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const EC = {
  color: Ep,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Ep]
};
var Bt = "#B9B8CE", Op = "#100C2A", Co = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Bt
      }
    },
    splitLine: {
      lineStyle: {
        color: "#484753"
      }
    },
    splitArea: {
      areaStyle: {
        color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: "#20203B"
      }
    }
  };
}, kp = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], Vm = {
  darkMode: !0,
  color: kp,
  backgroundColor: Op,
  axisPointer: {
    lineStyle: {
      color: "#817f91"
    },
    crossStyle: {
      color: "#817f91"
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: "#fff"
    }
  },
  legend: {
    textStyle: {
      color: Bt
    },
    pageTextStyle: {
      color: Bt
    }
  },
  textStyle: {
    color: Bt
  },
  title: {
    textStyle: {
      color: "#EEF1FA"
    },
    subtextStyle: {
      color: "#B9B8CE"
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: Bt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Bt
    },
    brushStyle: {
      color: "rgba(135,163,206,0.3)"
    },
    handleStyle: {
      color: "#353450",
      borderColor: "#C5CBE3"
    },
    moveHandleStyle: {
      color: "#B0B6C3",
      opacity: 0.3
    },
    fillerColor: "rgba(135,163,206,0.2)",
    emphasis: {
      handleStyle: {
        borderColor: "#91B7F2",
        color: "#4D587D"
      },
      moveHandleStyle: {
        color: "#636D9A",
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: "#71708A",
        width: 1
      },
      areaStyle: {
        color: "#71708A"
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#87A3CE"
      },
      areaStyle: {
        color: "#87A3CE"
      }
    }
  },
  visualMap: {
    textStyle: {
      color: Bt
    }
  },
  timeline: {
    lineStyle: {
      color: Bt
    },
    label: {
      color: Bt
    },
    controlStyle: {
      color: Bt,
      borderColor: Bt
    }
  },
  calendar: {
    itemStyle: {
      color: Op
    },
    dayLabel: {
      color: Bt
    },
    monthLabel: {
      color: Bt
    },
    yearLabel: {
      color: Bt
    }
  },
  timeAxis: Co(),
  logAxis: Co(),
  valueAxis: Co(),
  categoryAxis: Co(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: kp
  },
  gauge: {
    title: {
      color: Bt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Bt
    },
    detail: {
      color: "#EEF1FA"
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  }
};
Vm.categoryAxis.splitLine.show = !1;
var OC = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (V(t)) {
        var a = Fe(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        C(t, function(l, u) {
          for (var h = !1, f = 0; f < o.length; f++) {
            var v = o[f], c = u.lastIndexOf(v);
            if (c > 0 && c === u.length - v.length) {
              var p = u.slice(0, c);
              p !== "data" && (e.mainType = p, e[v.toLowerCase()] = l, h = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, h = !0), h || (n[u] = l);
        });
      }
      return {
        cptQuery: e,
        dataQuery: i,
        otherQuery: n
      };
    }, r.prototype.filter = function(t, e) {
      var i = this.eventInfo;
      if (!i)
        return !0;
      var n = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
      if (!o || !s)
        return !0;
      var l = e.cptQuery, u = e.dataQuery;
      return h(l, o, "mainType") && h(l, o, "subType") && h(l, o, "index", "componentIndex") && h(l, o, "name") && h(l, o, "id") && h(u, a, "name") && h(u, a, "dataIndex") && h(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, n, a));
      function h(f, v, c, p) {
        return f[c] == null || v[p || c] === f[c];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  }()
), Ih = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Bp = Ih.concat(["symbolKeepAspect"]), kC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Ih.length; o++) {
      var s = Ih[o], l = r.get(s);
      q(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(B({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = dt(n);
    function h(f, v) {
      for (var c = r.getRawValue(v), p = r.getDataParams(v), g = 0; g < u.length; g++) {
        var d = u[g];
        f.setItemVisual(v, d, n[d](c, p));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, BC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < Bp.length; s++) {
        var l = Bp[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function Hm(r, t, e) {
  switch (e) {
    case "color":
      var i = r.getItemVisual(t, "style");
      return i[r.getVisual("drawType")];
    case "opacity":
      return r.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getItemVisual(t, e);
  }
}
function Gm(r, t) {
  switch (t) {
    case "color":
      var e = r.getVisual("style");
      return e[r.getVisual("drawType")];
    case "opacity":
      return r.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getVisual(t);
  }
}
function NC(r, t, e, i) {
  switch (e) {
    case "color":
      var n = r.ensureUniqueItemVisual(t, "style");
      n[r.getVisual("drawType")] = i, r.setItemVisual(t, "colorFromPalette", !1);
      break;
    case "opacity":
      r.ensureUniqueItemVisual(t, "style").opacity = i;
      break;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      r.setItemVisual(t, e, i);
      break;
  }
}
function Gi(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var f = o.getData(), v = Ti(f, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: $(v) ? f.getName(v[0]) : f.getName(v),
          selected: V(l) ? l : B({}, l)
        });
      }
  });
}
function $C(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (Gi("map", "selectchanged", t, n, i), Gi("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (Gi("map", "selected", t, n, i), Gi("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (Gi("map", "unselected", t, n, i), Gi("pie", "unselected", t, n, i));
  });
}
function rn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var zC = Math.round(Math.random() * 9), FC = typeof Object.defineProperty == "function", VC = function() {
  function r() {
    this._id = "__ec_inner_" + zC++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return FC ? Object.defineProperty(i, this._id, {
      value: e,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = e, this;
  }, r.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, r.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, r.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, r;
}(), HC = ht.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i + a), r.lineTo(e - n, i + a), r.closePath();
  }
}), GC = ht.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i), r.lineTo(e, i + a), r.lineTo(e - n, i), r.closePath();
  }
}), WC = ht.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, f = Math.sin(u), v = Math.cos(u), c = o * 0.6, p = o * 0.7;
    r.moveTo(e - h, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + h - f * c, l + s + v * c, e, i - p, e, i), r.bezierCurveTo(e, i - p, e - h + f * c, l + s + v * c, e - h, l + s), r.closePath();
  }
}), UC = ht.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.height, i = t.width, n = t.x, a = t.y, o = i / 3 * 2;
    r.moveTo(n, a), r.lineTo(n + o, a + e), r.lineTo(n, a + e / 4 * 3), r.lineTo(n - o, a + e), r.lineTo(n, a), r.closePath();
  }
}), YC = {
  line: Nr,
  rect: _t,
  roundRect: _t,
  square: _t,
  circle: Ks,
  diamond: GC,
  pin: WC,
  arrow: UC,
  triangle: HC
}, XC = {
  line: function(r, t, e, i, n) {
    n.x1 = r, n.y1 = t + i / 2, n.x2 = r + e, n.y2 = t + i / 2;
  },
  rect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i;
  },
  roundRect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i, n.r = Math.min(e, i) / 4;
  },
  square: function(r, t, e, i, n) {
    var a = Math.min(e, i);
    n.x = r, n.y = t, n.width = a, n.height = a;
  },
  circle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.r = Math.min(e, i) / 2;
  },
  diamond: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  },
  pin: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  arrow: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  triangle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  }
}, Lh = {};
C(YC, function(r, t) {
  Lh[t] = new r();
});
var qC = ht.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = ys(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Lh[i];
      n || (i = "rect", n = Lh[i]), XC[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function ZC(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function hr(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = Vy(r.slice(8), new at(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = Nf(r.slice(7), {}, new at(t, e, i, n), o ? "center" : "cover") : l = new qC({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = ZC, a && l.setColor(a), l;
}
function KC(r) {
  return $(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function Wm(r, t) {
  if (r != null)
    return $(r) || (r = [r, r]), [Vt(r[0], t[0]) || 0, Vt(J(r[1], r[0]), t[1]) || 0];
}
function di(r) {
  return isFinite(r);
}
function QC(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = di(i) ? i : 0, n = di(n) ? n : 1, a = di(a) ? a : 0, o = di(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function jC(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = di(o) ? o : 0.5, s = di(s) ? s : 0.5, l = l >= 0 && di(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Ph(r, t, e) {
  for (var i = t.type === "radial" ? jC(r, t, e) : QC(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function JC(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function Mo(r) {
  return parseInt(r, 10);
}
function Do(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || Mo(s[i]) || Mo(r.style[i])) - (Mo(s[a]) || 0) - (Mo(s[o]) || 0) | 0;
}
function tM(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : gt(r) ? [r] : $(r) ? r : null;
}
function Um(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && tM(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = U(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var eM = new Ci(!0);
function Ls(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function Np(r) {
  return typeof r == "string" && r !== "none";
}
function Ps(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function $p(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function zp(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Rh(r, t, e) {
  var i = yy(t.image, t.__image, e);
  if (Us(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * A1), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function rM(r, t, e, i) {
  var n, a = Ls(e), o = Ps(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || eM, f = t.__dirty;
  if (!i) {
    var v = e.fill, c = e.stroke, p = o && !!v.colorStops, g = a && !!c.colorStops, d = o && !!v.image, y = a && !!c.image, m = void 0, _ = void 0, b = void 0, w = void 0, S = void 0;
    (p || g) && (S = t.getBoundingRect()), p && (m = f ? Ph(r, v, S) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = f ? Ph(r, c, S) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), d && (b = f || !t.__canvasFillPattern ? Rh(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (w = f || !t.__canvasStrokePattern ? Rh(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), p ? r.fillStyle = m : d && (b ? r.fillStyle = b : o = !1), g ? r.strokeStyle = _ : y && (w ? r.strokeStyle = w : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var M, D;
  r.setLineDash && e.lineDash && (n = Um(t), M = n[0], D = n[1]);
  var A = !0;
  (u || f & Ki) && (h.setDPR(r.dpr), l ? h.setContext(null) : (h.setContext(r), A = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), A && h.rebuildPath(r, l ? s : 1), M && (r.setLineDash(M), r.lineDashOffset = D), i || (e.strokeFirst ? (a && zp(r, e), o && $p(r, e)) : (o && $p(r, e), a && zp(r, e))), M && r.setLineDash([]);
}
function iM(r, t, e) {
  var i = t.__image = yy(e.image, t.__image, t, t.onload);
  if (!(!i || !Us(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var u = e.sx || 0, h = e.sy || 0;
      r.drawImage(i, u, h, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var u = e.sx, h = e.sy, f = o - u, v = s - h;
      r.drawImage(i, u, h, f, v, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function nM(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || wi, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = Um(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (Ls(e) && r.strokeText(n, e.x, e.y), Ps(e) && r.fillText(n, e.x, e.y)) : (Ps(e) && r.fillText(n, e.x, e.y), Ls(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var Fp = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Vp = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Ym(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    qt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? mi.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (qt(r, n), a = !0), r.globalCompositeOperation = t.blend || mi.blend);
  for (var s = 0; s < Fp.length; s++) {
    var l = Fp[s];
    (i || t[l] !== e[l]) && (a || (qt(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (qt(r, n), a = !0), r.shadowColor = t.shadowColor || mi.shadowColor), a;
}
function Hp(r, t, e, i, n) {
  var a = $a(t, n.inHover), o = i ? null : e && $a(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = Ym(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (qt(r, n), s = !0), Np(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (qt(r, n), s = !0), Np(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (qt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (qt(r, n), s = !0), r.lineWidth = u);
  }
  for (var h = 0; h < Vp.length; h++) {
    var f = Vp[h], v = f[0];
    (i || a[v] !== o[v]) && (s || (qt(r, n), s = !0), r[v] = a[v] || f[1]);
  }
  return s;
}
function aM(r, t, e, i, n) {
  return Ym(r, $a(t, n.inHover), e && $a(e, n.inHover), i, n);
}
function Xm(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function oM(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), Xm(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function sM(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var Gp = 1, Wp = 2, Up = 3, Yp = 4;
function lM(r) {
  var t = Ps(r), e = Ls(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function qt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function $a(r, t) {
  return t && r.__hoverStyle || r.style;
}
function qm(r, t) {
  gi(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function gi(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~te, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || JC(a, o)) && (o && o.length && (qt(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (qt(r, e), r.save(), oM(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var h = t instanceof ht && t.autoBatch && lM(t.style);
  s || sM(n, u.transform) ? (qt(r, e), Xm(r, t)) : h || qt(r, e);
  var f = $a(t, e.inHover);
  t instanceof ht ? (e.lastDrawType !== Gp && (l = !0, e.lastDrawType = Gp), Hp(r, t, u, l, e), (!h || !e.batchFill && !e.batchStroke) && r.beginPath(), rM(r, t, f, h), h && (e.batchFill = f.fill || "", e.batchStroke = f.stroke || "")) : t instanceof bs ? (e.lastDrawType !== Up && (l = !0, e.lastDrawType = Up), Hp(r, t, u, l, e), nM(r, t, f)) : t instanceof Ke ? (e.lastDrawType !== Wp && (l = !0, e.lastDrawType = Wp), aM(r, t, u, l, e), iM(r, t, f)) : t.getTemporalDisplayables && (e.lastDrawType !== Yp && (l = !0, e.lastDrawType = Yp), uM(r, t, e)), h && i && qt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function uM(r, t, e) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  r.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), gi(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = n.length; u < h; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), gi(r, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var _u = new VC(), Xp = new Ya(100), qp = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Eh(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && _u.delete(r);
  var a = _u.get(r);
  if (a)
    return a;
  var o = ot(r, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, _u.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var h = [e], f = !0, v = 0; v < qp.length; ++v) {
      var c = o[qp[v]];
      if (c != null && !$(c) && !V(c) && !gt(c) && typeof c != "boolean") {
        f = !1;
        break;
      }
      h.push(c);
    }
    var p;
    if (f) {
      p = h.join(",") + (n ? "-svg" : "");
      var g = Xp.get(p);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var d = Km(o.dashArrayX), y = hM(o.dashArrayY), m = Zm(o.symbol), _ = fM(d), b = Qm(y), w = !n && Br.createCanvas(), S = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), M;
    w && (w.width = x.width * e, w.height = x.height * e, M = w.getContext("2d")), A(), f && Xp.put(p, w || S), u.image = w, u.svgElement = S, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, I = 0, L = _.length; I < L; ++I)
        T = sv(T, _[I]);
      for (var P = 1, I = 0, L = m.length; I < L; ++I)
        P = sv(P, m[I].length);
      T *= P;
      var R = b * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(R, o.maxTileHeight))
      };
    }
    function A() {
      M && (M.clearRect(0, 0, w.width, w.height), o.backgroundColor && (M.fillStyle = o.backgroundColor, M.fillRect(0, 0, w.width, w.height)));
      for (var T = 0, I = 0; I < y.length; ++I)
        T += y[I];
      if (T <= 0)
        return;
      for (var L = -b, P = 0, R = 0, O = 0; L < x.height; ) {
        if (P % 2 === 0) {
          for (var G = R / 2 % m.length, k = 0, z = 0, W = 0; k < x.width * 2; ) {
            for (var K = 0, I = 0; I < d[O].length; ++I)
              K += d[O][I];
            if (K <= 0)
              break;
            if (z % 2 === 0) {
              var tt = (1 - o.symbolSize) * 0.5, ft = k + d[O][z] * tt, yt = L + y[P] * tt, bt = d[O][z] * o.symbolSize, be = y[P] * o.symbolSize, zr = W / 2 % m[G].length;
              Pi(ft, yt, bt, be, m[G][zr]);
            }
            k += d[O][z], ++W, ++z, z === d[O].length && (z = 0);
          }
          ++O, O === d.length && (O = 0);
        }
        L += y[P], ++R, ++P, P === y.length && (P = 0);
      }
      function Pi(jt, Lt, Z, et, Fr) {
        var zt = n ? 1 : e, dc = hr(Fr, jt * zt, Lt * zt, Z * zt, et * zt, o.color, o.symbolKeepAspect);
        if (n) {
          var gc = i.painter.renderOneToVNode(dc);
          gc && S.children.push(gc);
        } else
          qm(M, dc);
      }
    }
  }
}
function Zm(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if (V(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!V(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return Zm([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    V(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function Km(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (gt(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!gt(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return Km([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (gt(r[i])) {
      var t = Math.ceil(r[i]);
      n.push([t, t]);
    } else {
      var t = U(r[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function hM(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (gt(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = U(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function fM(r) {
  return U(r, function(t) {
    return Qm(t);
  });
}
function Qm(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function cM(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = Eh(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = Eh(n, t);
      }
    }
  });
}
var Ce = new Ze(), jm = {};
function vM(r, t) {
  jm[r] = t;
}
function pM(r) {
  return jm[r];
}
var dM = 1, gM = 800, yM = 900, mM = 1e3, _M = 2e3, bM = 5e3, Jm = 1e3, SM = 1100, jf = 2e3, t0 = 3e3, wM = 4e3, vl = 4500, xM = 4600, TM = 5e3, CM = 6e3, e0 = 7e3, MM = {
  PROCESSOR: {
    FILTER: mM,
    SERIES_FILTER: gM,
    STATISTIC: bM
  },
  VISUAL: {
    LAYOUT: Jm,
    PROGRESSIVE_LAYOUT: SM,
    GLOBAL: jf,
    CHART: t0,
    POST_CHART_LAYOUT: xM,
    COMPONENT: wM,
    BRUSH: TM,
    CHART_ITEM: vl,
    ARIA: CM,
    DECAL: e0
  }
}, kt = "__flagInMainProcess", Wt = "__pendingUpdate", bu = "__needsUpdateStatus", Zp = /^[a-zA-Z0-9_]+$/, Su = "__connectUpdateStatus", Kp = 0, DM = 1, AM = 2;
function r0(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return n0(this, r, t);
  };
}
function i0(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return n0(this, r, t);
  };
}
function n0(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), Ze.prototype[t].apply(r, e);
}
var a0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(Ze)
), o0 = a0.prototype;
o0.on = i0("on");
o0.off = i0("off");
var Wi, wu, Ao, wr, xu, Tu, Cu, Un, Yn, Qp, jp, Mu, Jp, Io, td, s0, ne, ed, l0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e, i, n) {
      var a = r.call(this, new OC()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, V(i) && (i = u0[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = nv(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: J(n.useDirtyRect, l),
        useCoarsePointer: J(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = Qf(j(u.flush, u), 17), i = X(i), i && gm(i, !0), a._theme = i, a._locale = Fx(n.locale || Zy), a._coordSysMgr = new hl();
      var h = a._api = td(a);
      function f(v, c) {
        return v.__prio - c.__prio;
      }
      return Wo(Es, f), Wo(Oh, f), a._scheduler = new Nm(a, h, Oh, Es), a._messageCenter = new a0(), a._initEvents(), a.resize = j(a.resize, a), u.animation.on("frame", a._onframe, a), Qp(u, a), jp(u, a), qu(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        ed(this);
        var e = this._scheduler;
        if (this[Wt]) {
          var i = this[Wt].silent;
          this[kt] = !0;
          try {
            Wi(this), wr.update.call(this, null, this[Wt].updateParams);
          } catch (l) {
            throw this[kt] = !1, this[Wt] = null, l;
          }
          this._zr.flush(), this[kt] = !1, this[Wt] = null, Un.call(this, i), Yn.call(this, i);
        } else if (e.unfinished) {
          var n = dM, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Tu(this, a), e.performVisualTasks(a), Io(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
          } while (n > 0 && e.unfinished);
          e.unfinished || this._zr.flush();
        }
      }
    }, t.prototype.getDom = function() {
      return this._dom;
    }, t.prototype.getId = function() {
      return this.id;
    }, t.prototype.getZr = function() {
      return this._zr;
    }, t.prototype.isSSR = function() {
      return this._ssr;
    }, t.prototype.setOption = function(e, i, n) {
      if (!this[kt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (H(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[kt] = !0, !this._model || i) {
          var l = new pT(this._api), u = this._theme, h = this._model = new Yf();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(e, {
          replaceMerge: o
        }, kh);
        var f = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Wt] = {
            silent: a,
            updateParams: f
          }, this[kt] = !1, this.getZr().wakeUp();
        else {
          try {
            Wi(this), wr.update.call(this, null, f);
          } catch (v) {
            throw this[Wt] = null, this[kt] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Wt] = null, this[kt] = !1, Un.call(this, a), Yn.call(this, a);
        }
      }
    }, t.prototype.setTheme = function() {
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || Y.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(e) {
      return this.renderToCanvas(e);
    }, t.prototype.renderToCanvas = function(e) {
      e = e || {};
      var i = this._zr.painter;
      return i.getRenderedCanvas({
        backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(e) {
      e = e || {};
      var i = this._zr.painter;
      return i.renderToString({
        useViewBox: e.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (Y.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return C(i, function(n) {
          n.stopAnimation(null, !0);
        }), e.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      e = e || {};
      var i = e.excludeComponents, n = this._model, a = [], o = this;
      C(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var h = o._componentsMap[u.__viewId];
          h.group.ignore || (a.push(h), h.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return C(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (rd[n]) {
        var l = s, u = s, h = -s, f = -s, v = [], c = e && e.pixelRatio || this.getDevicePixelRatio();
        C(ba, function(_, b) {
          if (_.group === n) {
            var w = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(X(e)), S = _.getDom().getBoundingClientRect();
            l = a(S.left, l), u = a(S.top, u), h = o(S.right, h), f = o(S.bottom, f), v.push({
              dom: w,
              left: S.left,
              top: S.top
            });
          }
        }), l *= c, u *= c, h *= c, f *= c;
        var p = h - l, g = f - u, d = Br.createCanvas(), y = nv(d, {
          renderer: i ? "svg" : "canvas"
        });
        if (y.resize({
          width: p,
          height: g
        }), i) {
          var m = "";
          return C(v, function(_) {
            var b = _.left - l, w = _.top - u;
            m += '<g transform="translate(' + b + "," + w + ')">' + _.dom + "</g>";
          }), y.painter.getSvgRoot().innerHTML = m, e.connectedBackgroundColor && y.painter.setBackgroundColor(e.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && y.add(new _t({
            shape: {
              x: 0,
              y: 0,
              width: p,
              height: g
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), C(v, function(_) {
            var b = new Ke({
              style: {
                x: _.left * c - l,
                y: _.top * c - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), d.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return xu(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return xu(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = Yl(n, e);
      return C(o, function(s, l) {
        l.indexOf("Models") >= 0 && C(s, function(u) {
          var h = u.coordinateSystem;
          if (h && h.containPoint)
            a = a || !!h.containPoint(i);
          else if (l === "seriesModels") {
            var f = this._chartsMap[u.__viewId];
            f && f.containPoint && (a = a || f.containPoint(i, u));
          }
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(e, i) {
      var n = this._model, a = Yl(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? Hm(s, l, i) : Gm(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      C(IM, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && rn(s, function(p) {
            var g = it(p);
            if (g && g.dataIndex != null) {
              var d = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = d && d.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = B({}, g.eventData), !0;
          }, !0), l) {
            var h = l.componentType, f = l.componentIndex;
            (h === "markLine" || h === "markPoint" || h === "markArea") && (h = "series", f = l.seriesIndex);
            var v = h && f != null && o.getComponent(h, f), c = v && e[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            l.event = a, l.type = i, e._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: c
            }, e.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(i, n, e);
      }), C(_a, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), C(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), $C(this._messageCenter, this, this._api);
    }, t.prototype.isDisposed = function() {
      return this._disposed;
    }, t.prototype.clear = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._disposed = !0;
      var e = this.getDom();
      e && py(this.getDom(), tc, "");
      var i = this, n = i._api, a = i._model;
      C(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), C(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete ba[i.id];
    }, t.prototype.resize = function(e) {
      if (!this[kt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(e);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = e && e.silent;
          this[Wt] && (a == null && (a = this[Wt].silent), n = !0, this[Wt] = null), this[kt] = !0;
          try {
            n && Wi(this), wr.update.call(this, {
              type: "resize",
              animation: B({
                // Disable animation
                duration: 0
              }, e && e.animation)
            });
          } catch (o) {
            throw this[kt] = !1, o;
          }
          this[kt] = !1, Un.call(this, a), Yn.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !!Bh[e]) {
        var n = Bh[e](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = B({}, e);
      return i.type = _a[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(i) || (i = {
        silent: !!i
      }), !!Rs[e.type] && this._model) {
        if (this[kt]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Cu.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && Y.browser.weChat && this._throttledZrFlush(), Un.call(this, n), Yn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      Ce.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      a.appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = function() {
      Wi = function(f) {
        var v = f._scheduler;
        v.restorePipelines(f._model), v.prepareStageTasks(), wu(f, !0), wu(f, !1), v.plan();
      }, wu = function(f, v) {
        for (var c = f._model, p = f._scheduler, g = v ? f._componentsViews : f._chartsViews, d = v ? f._componentsMap : f._chartsMap, y = f._zr, m = f._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        v ? c.eachComponent(function(S, x) {
          S !== "series" && b(x);
        }) : c.eachSeries(b);
        function b(S) {
          var x = S.__requireNewView;
          S.__requireNewView = !1;
          var M = "_ec_" + S.id + "_" + S.type, D = !x && d[M];
          if (!D) {
            var A = Fe(S.type), T = v ? Le.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              ye.getClass(A.sub)
            );
            D = new T(), D.init(c, m), d[M] = D, g.push(D), y.add(D.group);
          }
          S.__viewId = D.__id = M, D.__alive = !0, D.__model = S, D.group.__ecComponentInfo = {
            mainType: S.mainType,
            index: S.componentIndex
          }, !v && p.prepareView(D, S, c, m);
        }
        for (var _ = 0; _ < g.length; ) {
          var w = g[_];
          w.__alive ? _++ : (!v && w.renderTask.dispose(), y.remove(w.group), w.dispose(c, m), g.splice(_, 1), d[w.__id] === w && delete d[w.__id], w.__id = w.group.__ecComponentInfo = null);
        }
      }, Ao = function(f, v, c, p, g) {
        var d = f._model;
        if (d.setUpdatePayload(c), !p) {
          C([].concat(f._componentsViews).concat(f._chartsViews), w);
          return;
        }
        var y = {};
        y[p + "Id"] = c[p + "Id"], y[p + "Index"] = c[p + "Index"], y[p + "Name"] = c[p + "Name"];
        var m = {
          mainType: p,
          query: y
        };
        g && (m.subType = g);
        var _ = c.excludeSeriesId, b;
        _ != null && (b = Q(), C(Et(_), function(S) {
          var x = Ae(S, null);
          x != null && b.set(x, !0);
        })), d && d.eachComponent(m, function(S) {
          var x = b && b.get(S.id) != null;
          if (!x)
            if (Bv(c))
              if (S instanceof Ie)
                c.type === _i && !c.notBlur && !S.get(["emphasis", "disabled"]) && Tw(S, c, f._api);
              else {
                var M = If(S.mainType, S.componentIndex, c.name, f._api), D = M.focusSelf, A = M.dispatchers;
                c.type === _i && D && !c.notBlur && ph(S.mainType, S.componentIndex, f._api), A && C(A, function(T) {
                  c.type === _i ? Ss(T) : ws(T);
                });
              }
            else mh(c) && S instanceof Ie && (Dw(S, c, f._api), Ov(S), ne(f));
        }, f), d && d.eachComponent(m, function(S) {
          var x = b && b.get(S.id) != null;
          x || w(f[p === "series" ? "_chartsMap" : "_componentsMap"][S.__viewId]);
        }, f);
        function w(S) {
          S && S.__alive && S[v] && S[v](S.__model, d, f._api, c);
        }
      }, wr = {
        prepareAndUpdate: function(f) {
          Wi(this), wr.update.call(this, f, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: f.newOption != null
          });
        },
        update: function(f, v) {
          var c = this._model, p = this._api, g = this._zr, d = this._coordSysMgr, y = this._scheduler;
          if (c) {
            c.setUpdatePayload(f), y.restoreData(c, f), y.performSeriesTasks(c), d.create(c, p), y.performDataProcessorTasks(c, f), Tu(this, c), d.update(c, p), e(c), y.performVisualTasks(c, f), Mu(this, c, p, f, v);
            var m = c.get("backgroundColor") || "transparent", _ = c.get("darkMode");
            g.setBackgroundColor(m), _ != null && _ !== "auto" && g.setDarkMode(_), Ce.trigger("afterupdate", c, p);
          }
        },
        updateTransform: function(f) {
          var v = this, c = this._model, p = this._api;
          if (c) {
            c.setUpdatePayload(f);
            var g = [];
            c.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = v.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var b = _.updateTransform(m, c, p, f);
                    b && b.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var d = Q();
            c.eachSeries(function(y) {
              var m = v._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, c, p, f);
                _ && _.update && d.set(y.uid, 1);
              } else
                d.set(y.uid, 1);
            }), e(c), this._scheduler.performVisualTasks(c, f, {
              setDirty: !0,
              dirtyMap: d
            }), Io(this, c, p, f, {}, d), Ce.trigger("afterupdate", c, p);
          }
        },
        updateView: function(f) {
          var v = this._model;
          v && (v.setUpdatePayload(f), ye.markUpdateMethod(f, "updateView"), e(v), this._scheduler.performVisualTasks(v, f, {
            setDirty: !0
          }), Mu(this, v, this._api, f, {}), Ce.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(f) {
          var v = this, c = this._model;
          c && (c.setUpdatePayload(f), c.eachSeries(function(p) {
            p.getData().clearAllVisual();
          }), ye.markUpdateMethod(f, "updateVisual"), e(c), this._scheduler.performVisualTasks(c, f, {
            visualType: "visual",
            setDirty: !0
          }), c.eachComponent(function(p, g) {
            if (p !== "series") {
              var d = v.getViewOfComponentModel(g);
              d && d.__alive && d.updateVisual(g, c, v._api, f);
            }
          }), c.eachSeries(function(p) {
            var g = v._chartsMap[p.__viewId];
            g.updateVisual(p, c, v._api, f);
          }), Ce.trigger("afterupdate", c, this._api));
        },
        updateLayout: function(f) {
          wr.update.call(this, f);
        }
      }, xu = function(f, v, c, p) {
        if (f._disposed) {
          f.id;
          return;
        }
        for (var g = f._model, d = f._coordSysMgr.getCoordinateSystems(), y, m = Yl(g, c), _ = 0; _ < d.length; _++) {
          var b = d[_];
          if (b[v] && (y = b[v](g, m, p)) != null)
            return y;
        }
      }, Tu = function(f, v) {
        var c = f._chartsMap, p = f._scheduler;
        v.eachSeries(function(g) {
          p.updateStreamModes(g, c[g.__viewId]);
        });
      }, Cu = function(f, v) {
        var c = this, p = this.getModel(), g = f.type, d = f.escapeConnect, y = Rs[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), w = _[0] != null && Fe(_[0]);
        this[kt] = !0;
        var S = [f], x = !1;
        f.batch && (x = !0, S = U(f.batch, function(P) {
          return P = ot(B({}, P), f), P.batch = null, P;
        }));
        var M = [], D, A = mh(f), T = Bv(f);
        if (T && Ey(this._api), C(S, function(P) {
          if (D = y.action(P, c._model, c._api), D = D || B({}, P), D.type = m.event || D.type, M.push(D), T) {
            var R = Tf(f), O = R.queryOptionMap, G = R.mainTypeSpecified, k = G ? O.keys()[0] : "series";
            Ao(c, b, P, k), ne(c);
          } else A ? (Ao(c, b, P, "series"), ne(c)) : w && Ao(c, b, P, w.main, w.sub);
        }), b !== "none" && !T && !A && !w)
          try {
            this[Wt] ? (Wi(this), wr.update.call(this, f), this[Wt] = null) : wr[b].call(this, f);
          } catch (P) {
            throw this[kt] = !1, P;
          }
        if (x ? D = {
          type: m.event || g,
          escapeConnect: d,
          batch: M
        } : D = M[0], this[kt] = !1, !v) {
          var I = this._messageCenter;
          if (I.trigger(D.type, D), A) {
            var L = {
              type: "selectchanged",
              escapeConnect: d,
              selected: Aw(p),
              isFromClick: f.isFromClick || !1,
              fromAction: f.type,
              fromActionPayload: f
            };
            I.trigger(L.type, L);
          }
        }
      }, Un = function(f) {
        for (var v = this._pendingActions; v.length; ) {
          var c = v.shift();
          Cu.call(this, c, f);
        }
      }, Yn = function(f) {
        !f && this.trigger("updated");
      }, Qp = function(f, v) {
        f.on("rendered", function(c) {
          v.trigger("rendered", c), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          f.animation.isFinished() && !v[Wt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, jp = function(f, v) {
        f.on("mouseover", function(c) {
          var p = c.target, g = rn(p, yh);
          g && (Cw(g, c, v._api), ne(v));
        }).on("mouseout", function(c) {
          var p = c.target, g = rn(p, yh);
          g && (Mw(g, c, v._api), ne(v));
        }).on("click", function(c) {
          var p = c.target, g = rn(p, function(m) {
            return it(m).dataIndex != null;
          }, !0);
          if (g) {
            var d = g.selected ? "unselect" : "select", y = it(g);
            v._api.dispatchAction({
              type: d,
              dataType: y.dataType,
              dataIndexInside: y.dataIndex,
              seriesIndex: y.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function e(f) {
        f.clearColorPalette(), f.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(f) {
        var v = [], c = [], p = !1;
        if (f.eachComponent(function(m, _) {
          var b = _.get("zlevel") || 0, w = _.get("z") || 0, S = _.getZLevelKey();
          p = p || !!S, (m === "series" ? c : v).push({
            zlevel: b,
            z: w,
            idx: _.componentIndex,
            type: m,
            key: S
          });
        }), p) {
          var g = v.concat(c), d, y;
          Wo(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), C(g, function(m) {
            var _ = f.getComponent(m.type, m.idx), b = m.zlevel, w = m.key;
            d != null && (b = Math.max(d, b)), w ? (b === d && w !== y && b++, y = w) : y && (b === d && b++, y = ""), d = b, _.setZLevel(b);
          });
        }
      }
      Mu = function(f, v, c, p, g) {
        i(v), Jp(f, v, c, p, g), C(f._chartsViews, function(d) {
          d.__alive = !1;
        }), Io(f, v, c, p, g), C(f._chartsViews, function(d) {
          d.__alive || d.remove(v, c);
        });
      }, Jp = function(f, v, c, p, g, d) {
        C(d || f._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, v, c, p), s(m, y), h(m, y);
        });
      }, Io = function(f, v, c, p, g, d) {
        var y = f._scheduler;
        g = B(g || {}, {
          updatedSeries: v.getSeries()
        }), Ce.trigger("series:beforeupdate", v, c, g);
        var m = !1;
        v.eachSeries(function(_) {
          var b = f._chartsMap[_.__viewId];
          b.__alive = !0;
          var w = b.renderTask;
          y.updatePayload(w, p), u(_, b), d && d.get(_.uid) && w.dirty(), w.perform(y.getPerformArgs(w)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), Ov(_);
        }), y.unfinished = m || y.unfinished, Ce.trigger("series:layoutlabels", v, c, g), Ce.trigger("series:transition", v, c, g), v.eachSeries(function(_) {
          var b = f._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(f, v), Ce.trigger("series:afterupdate", v, c, g);
      }, ne = function(f) {
        f[bu] = !0, f.getZr().wakeUp();
      }, ed = function(f) {
        f[bu] && (f.getZr().storage.traverse(function(v) {
          ga(v) || n(v);
        }), f[bu] = !1);
      };
      function n(f) {
        for (var v = [], c = f.currentStates, p = 0; p < c.length; p++) {
          var g = c[p];
          g === "emphasis" || g === "blur" || g === "select" || v.push(g);
        }
        f.selected && f.states.select && v.push("select"), f.hoverState === qs && f.states.emphasis ? v.push("emphasis") : f.hoverState === Xs && f.states.blur && v.push("blur"), f.useStates(v);
      }
      function a(f, v) {
        var c = f._zr, p = c.storage, g = 0;
        p.traverse(function(d) {
          d.isGroup || g++;
        }), g > v.get("hoverLayerThreshold") && !Y.node && !Y.worker && v.eachSeries(function(d) {
          if (!d.preventUsingHoverLayer) {
            var y = f._chartsMap[d.__viewId];
            y.__alive && y.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(f, v) {
        var c = f.get("blendMode") || null;
        v.eachRendered(function(p) {
          p.isGroup || (p.style.blend = c);
        });
      }
      function s(f, v) {
        if (!f.preventAutoZ) {
          var c = f.get("z") || 0, p = f.get("zlevel") || 0;
          v.eachRendered(function(g) {
            return l(g, c, p, -1 / 0), !0;
          });
        }
      }
      function l(f, v, c, p) {
        var g = f.getTextContent(), d = f.getTextGuideLine(), y = f.isGroup;
        if (y)
          for (var m = f.childrenRef(), _ = 0; _ < m.length; _++)
            p = Math.max(l(m[_], v, c, p), p);
        else
          f.z = v, f.zlevel = c, p = Math.max(f.z2, p);
        if (g && (g.z = v, g.zlevel = c, isFinite(p) && (g.z2 = p + 2)), d) {
          var b = f.textGuideLineConfig;
          d.z = v, d.zlevel = c, isFinite(p) && (d.z2 = p + (b && b.showAbove ? 1 : -1));
        }
        return p;
      }
      function u(f, v) {
        v.eachRendered(function(c) {
          if (!ga(c)) {
            var p = c.getTextContent(), g = c.getTextGuideLine();
            c.stateTransition && (c.stateTransition = null), p && p.stateTransition && (p.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), c.hasState() ? (c.prevStates = c.currentStates, c.clearStates()) : c.prevStates && (c.prevStates = null);
          }
        });
      }
      function h(f, v) {
        var c = f.getModel("stateAnimation"), p = f.isAnimationEnabled(), g = c.get("duration"), d = g > 0 ? {
          duration: g,
          delay: c.get("delay"),
          easing: c.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (ga(y))
              return;
            if (y instanceof ht && Ew(y), y.__dirty) {
              var m = y.prevStates;
              m && y.useStates(m);
            }
            if (p) {
              y.stateTransition = d;
              var _ = y.getTextContent(), b = y.getTextGuideLine();
              _ && (_.stateTransition = d), b && (b.stateTransition = d);
            }
            y.__dirty && n(y);
          }
        });
      }
      td = function(f) {
        return new /** @class */
        (function(v) {
          N(c, v);
          function c() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return c.prototype.getCoordinateSystems = function() {
            return f._coordSysMgr.getCoordinateSystems();
          }, c.prototype.getComponentByElement = function(p) {
            for (; p; ) {
              var g = p.__ecComponentInfo;
              if (g != null)
                return f._model.getComponent(g.mainType, g.index);
              p = p.parent;
            }
          }, c.prototype.enterEmphasis = function(p, g) {
            Ss(p, g), ne(f);
          }, c.prototype.leaveEmphasis = function(p, g) {
            ws(p, g), ne(f);
          }, c.prototype.enterBlur = function(p) {
            xw(p), ne(f);
          }, c.prototype.leaveBlur = function(p) {
            Iy(p), ne(f);
          }, c.prototype.enterSelect = function(p) {
            Ly(p), ne(f);
          }, c.prototype.leaveSelect = function(p) {
            Py(p), ne(f);
          }, c.prototype.getModel = function() {
            return f.getModel();
          }, c.prototype.getViewOfComponentModel = function(p) {
            return f.getViewOfComponentModel(p);
          }, c.prototype.getViewOfSeriesModel = function(p) {
            return f.getViewOfSeriesModel(p);
          }, c;
        }(pm))(f);
      }, s0 = function(f) {
        function v(c, p) {
          for (var g = 0; g < c.length; g++) {
            var d = c[g];
            d[Su] = p;
          }
        }
        C(_a, function(c, p) {
          f._messageCenter.on(p, function(g) {
            if (rd[f.group] && f[Su] !== Kp) {
              if (g && g.escapeConnect)
                return;
              var d = f.makeActionFromEvent(g), y = [];
              C(ba, function(m) {
                m !== f && m.group === f.group && y.push(m);
              }), v(y, Kp), C(y, function(m) {
                m[Su] !== DM && m.dispatchAction(d);
              }), v(y, AM);
            }
          });
        });
      };
    }(), t;
  }(Ze)
), Jf = l0.prototype;
Jf.on = r0("on");
Jf.off = r0("off");
Jf.one = function(r, t, e) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var IM = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Rs = {}, _a = {}, Oh = [], kh = [], Es = [], u0 = {}, Bh = {}, ba = {}, rd = {}, LM = +/* @__PURE__ */ new Date() - 0, tc = "_echarts_instance_";
function PM(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    var n = RM(r);
    if (n)
      return n;
  }
  var a = new l0(r, t, e);
  return a.id = "ec_" + LM++, ba[a.id] = a, i && py(r, tc, a.id), s0(a), Ce.trigger("afterinit", a), a;
}
function RM(r) {
  return ba[cS(r, tc)];
}
function h0(r, t) {
  u0[r] = t;
}
function f0(r) {
  ct(kh, r) < 0 && kh.push(r);
}
function c0(r, t) {
  rc(Oh, r, t, _M);
}
function EM(r) {
  ec("afterinit", r);
}
function OM(r) {
  ec("afterupdate", r);
}
function ec(r, t) {
  Ce.on(r, t);
}
function Ln(r, t, e) {
  q(t) && (e = t, t = "");
  var i = H(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !_a[t] && (He(Zp.test(i) && Zp.test(t)), Rs[i] || (Rs[i] = {
    action: e,
    actionInfo: r
  }), _a[t] = i);
}
function kM(r, t) {
  hl.register(r, t);
}
function BM(r, t) {
  rc(Es, r, t, Jm, "layout");
}
function Di(r, t) {
  rc(Es, r, t, t0, "visual");
}
var id = [];
function rc(r, t, e, i, n) {
  if ((q(t) || H(t)) && (e = t, t = i), !(ct(id, e) >= 0)) {
    id.push(e);
    var a = Nm.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function v0(r, t) {
  Bh[r] = t;
}
function NM(r, t, e) {
  var i = pM("registerMap");
  i && i(r, t, e);
}
var $M = WT;
Di(jf, bC);
Di(vl, SC);
Di(vl, wC);
Di(jf, kC);
Di(vl, BC);
Di(e0, cM);
f0(gm);
c0(yM, MT);
v0("default", xC);
Ln({
  type: _i,
  event: _i,
  update: _i
}, Ht);
Ln({
  type: Ko,
  event: Ko,
  update: Ko
}, Ht);
Ln({
  type: va,
  event: va,
  update: va
}, Ht);
Ln({
  type: Qo,
  event: Qo,
  update: Qo
}, Ht);
Ln({
  type: pa,
  event: pa,
  update: pa
}, Ht);
h0("light", EC);
h0("dark", Vm);
function Xn(r) {
  return r == null ? 0 : r.length || 1;
}
function nd(r) {
  return r;
}
var zM = (
  /** @class */
  function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || nd, this._newKeyGetter = n || nd, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return r.prototype.add = function(t) {
      return this._add = t, this;
    }, r.prototype.update = function(t) {
      return this._update = t, this;
    }, r.prototype.updateManyToOne = function(t) {
      return this._updateManyToOne = t, this;
    }, r.prototype.updateOneToMany = function(t) {
      return this._updateOneToMany = t, this;
    }, r.prototype.updateManyToMany = function(t) {
      return this._updateManyToMany = t, this;
    }, r.prototype.remove = function(t) {
      return this._remove = t, this;
    }, r.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, r.prototype._executeOneToOne = function() {
      var t = this._old, e = this._new, i = {}, n = new Array(t.length), a = new Array(e.length);
      this._initIndexMap(t, null, n, "_oldKeyGetter"), this._initIndexMap(e, i, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = n[o], l = i[s], u = Xn(l);
        if (u > 1) {
          var h = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(h, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, r.prototype._executeMultiple = function() {
      var t = this._old, e = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(e, n, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = i[l], h = n[l], f = Xn(u), v = Xn(h);
        if (f > 1 && v === 1)
          this._updateManyToOne && this._updateManyToOne(h, u), n[l] = null;
        else if (f === 1 && v > 1)
          this._updateOneToMany && this._updateOneToMany(h, u), n[l] = null;
        else if (f === 1 && v === 1)
          this._update && this._update(h, u), n[l] = null;
        else if (f > 1 && v > 1)
          this._updateManyToMany && this._updateManyToMany(h, u), n[l] = null;
        else if (f > 1)
          for (var c = 0; c < f; c++)
            this._remove && this._remove(u[c]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, r.prototype._performRestAdd = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = e[n], o = Xn(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        e[n] = null;
      }
    }, r.prototype._initIndexMap = function(t, e, i, n) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[n](t[o], o);
        if (a || (i[o] = s), !!e) {
          var l = e[s], u = Xn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  }()
), FM = (
  /** @class */
  function() {
    function r(t, e) {
      this._encode = t, this._schema = e;
    }
    return r.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, r.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, r;
  }()
);
function VM(r, t) {
  var e = {}, i = e.encode = {}, n = Q(), a = [], o = [], s = {};
  C(r.dimensions, function(v) {
    var c = r.getDimensionInfo(v), p = c.coordDim;
    if (p) {
      var g = c.coordDimIndex;
      Du(i, p)[g] = v, c.isExtraCoord || (n.set(p, 1), GM(c.type) && (a[0] = v), Du(s, p)[g] = r.getDimensionIndex(c.name)), c.defaultTooltip && o.push(v);
    }
    um.each(function(d, y) {
      var m = Du(i, y), _ = c.otherDims[y];
      _ != null && _ !== !1 && (m[_] = c.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, c) {
    var p = i[c];
    u[c] = p[0], l = l.concat(p);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = U(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var h = i.label;
  h && h.length && (a = h.slice());
  var f = i.tooltip;
  return f && f.length ? o = f.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new FM(s, t), e;
}
function Du(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function HM(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function GM(r) {
  return !(r === "ordinal" || r === "time");
}
var rs = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.otherDims = {}, t != null && B(this, t);
    }
    return r;
  }()
), WM = At(), UM = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, p0 = (
  /** @class */
  function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = y0(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return J(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = _m(this.source), i = !m0(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, h = void 0, f = this.dimensions[s];
        if (f && f.storeDimIndex === o)
          l = e ? f.name : null, u = f.type, h = f.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = e ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: h
        }), e && l != null && (!f || !f.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += UM[u] || "f", h && (n += h.uid), n += "$";
      }
      var c = this.source, p = [c.seriesLayoutBy, c.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: p
      };
    }, r.prototype.makeOutputDimensionNames = function() {
      for (var t = [], e = 0, i = 0; e < this._fullDimCount; e++) {
        var n = void 0, a = this.dimensions[i];
        if (a && a.storeDimIndex === e)
          a.isCalculationCoord || (n = a.name), i++;
        else {
          var o = this.getSourceDimension(e);
          o && (n = o.name);
        }
        t.push(n);
      }
      return t;
    }, r.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, r;
  }()
);
function d0(r) {
  return r instanceof p0;
}
function g0(r) {
  for (var t = Q(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = H(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function y0(r) {
  var t = WM(r);
  return t.dimNameMap || (t.dimNameMap = g0(r.dimensionsDefine));
}
function m0(r) {
  return r > 30;
}
var qn = H, xr = U, YM = typeof Int32Array > "u" ? Array : Int32Array, XM = "e\0\0", ad = -1, qM = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], ZM = ["_approximateExtent"], od, Lo, Zn, Kn, Au, Qn, Iu, KM = (
  /** @class */
  function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      d0(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < i.length; h++) {
        var f = i[h], v = V(f) ? new rs({
          name: f
        }) : f instanceof rs ? f : new rs(f), c = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = c, v.coordDimIndex = 0);
        var p = v.otherDims = v.otherDims || {};
        o.push(c), a[c] = v, u[c] != null && (l = !0), v.createInvertedIndices && (s[c] = []), p.itemName === 0 && (this._nameDimIdx = h), p.itemId === 0 && (this._idDimIdx = h), n && (v.storeDimIndex = h);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = Q();
        C(o, function(d) {
          g.set(a[d].storeDimIndex, d);
        });
      }
    }
    return r.prototype.getDimension = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e == null)
        return t;
      if (e = t, !this._dimOmitted)
        return this.dimensions[e];
      var i = this._dimIdxToName.get(e);
      if (i != null)
        return i;
      var n = this._schema.getSourceDimension(e);
      if (n)
        return n.name;
    }, r.prototype.getDimensionIndex = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e != null)
        return e;
      if (t == null)
        return -1;
      var i = this._getDimInfo(t);
      return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, r.prototype._recognizeDimIndex = function(t) {
      if (gt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, r.prototype._getStoreDimIndex = function(t) {
      var e = this.getDimensionIndex(t);
      return e;
    }, r.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, r.prototype._initGetDimensionInfo = function(t) {
      var e = this._dimInfos;
      this._getDimInfo = t ? function(i) {
        return e.hasOwnProperty(i) ? e[i] : void 0;
      } : function(i) {
        return e[i];
      };
    }, r.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, r.prototype.mapDimension = function(t, e) {
      var i = this._dimSummary;
      if (e == null)
        return i.encodeFirstDimNotExtra[t];
      var n = i.encode[t];
      return n ? n[e] : null;
    }, r.prototype.mapDimensionsAll = function(t) {
      var e = this._dimSummary, i = e.encode[t];
      return (i || []).slice();
    }, r.prototype.getStore = function() {
      return this._store;
    }, r.prototype.initData = function(t, e, i) {
      var n = this, a;
      if (t instanceof Th && (a = t), !a) {
        var o = this.dimensions, s = Xf(t) || Zt(t) ? new bm(t, o.length) : t;
        a = new Th();
        var l = xr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = VM(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && Iu(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Or && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === _e;
        if (l && !n.pure)
          for (var u = [], h = t; h < e; h++) {
            var f = n.getItem(h, u);
            if (!this.hasItemOption && tS(f) && (this.hasItemOption = !0), f) {
              var v = f.name;
              a[h] == null && v != null && (a[h] = Ae(v, null));
              var c = f.id;
              o[h] == null && c != null && (o[h] = Ae(c, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < e; h++)
            Iu(this, h);
        od(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      qn(t) ? B(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = Zn(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return Lo(this, this.getRawIndex(t));
    }, r.prototype.count = function() {
      return this._store.count();
    }, r.prototype.get = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.get(n.storeDimIndex, e);
    }, r.prototype.getByRawIndex = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.getByRawIndex(n.storeDimIndex, e);
    }, r.prototype.getIndices = function() {
      return this._store.getIndices();
    }, r.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, r.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, r.prototype.getValues = function(t, e) {
      var i = this, n = this._store;
      return $(t) ? n.getValues(xr(t, function(a) {
        return i._getStoreDimIndex(a);
      }), e) : n.getValues(t);
    }, r.prototype.hasValue = function(t) {
      for (var e = this._dimSummary.dataDimIndicesOnCoord, i = 0, n = e.length; i < n; i++)
        if (isNaN(this._store.get(e[i], t)))
          return !1;
      return !0;
    }, r.prototype.indexOfName = function(t) {
      for (var e = 0, i = this._store.count(); e < i; e++)
        if (this.getName(e) === t)
          return e;
      return -1;
    }, r.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, r.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, r.prototype.rawIndexOf = function(t, e) {
      var i = t && this._invertedIndicesMap[t], n = i && i[e];
      return n == null || isNaN(n) ? ad : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = xr(Kn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? j(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = xr(Kn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? j(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = dt(t);
      return C(n, function(a) {
        var o = e._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, r.prototype.mapArray = function(t, e, i) {
      q(t) && (i = e, e = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(e && e.apply(this, arguments));
      }, i), n;
    }, r.prototype.map = function(t, e, i, n) {
      var a = i || n || this, o = xr(Kn(t), this._getStoreDimIndex, this), s = Qn(this);
      return s._store = this._store.map(o, a ? j(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = i || n || this, o = xr(Kn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? j(e, a) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = Qn(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = Qn(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = Qn(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new St(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new zM(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Lo(t, i);
      }, function(i) {
        return Lo(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, qn(t) ? B(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), $(a) ? a = a.slice() : qn(a) && (a = B({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, qn(e) ? B(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      qn(t) ? B(this._layout, t) : this._layout[t] = e;
    }, r.prototype.getLayout = function(t) {
      return this._layout[t];
    }, r.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, r.prototype.setItemLayout = function(t, e, i) {
      this._itemLayouts[t] = i ? B(this._itemLayouts[t] || {}, e) : e;
    }, r.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, r.prototype.setItemGraphicEl = function(t, e) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      vw(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      C(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : xr(this.dimensions, this._getDimInfo, this), this.hostModel)), Au(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(vf(arguments)));
      });
    }, r.internalField = function() {
      od = function(t) {
        var e = t._invertedIndicesMap;
        C(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new YM(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = ad;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, Zn = function(t, e, i) {
        return Ae(t._getCategory(e, i), null);
      }, Lo = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = Zn(t, t._idDimIdx, e)), i == null && (i = XM + e), i;
      }, Kn = function(t) {
        return $(t) || (t = t != null ? [t] : []), t;
      }, Qn = function(t) {
        var e = new r(t._schema ? t._schema : xr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Au(e, t), e;
      }, Au = function(t, e) {
        C(qM.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, C(ZM, function(i) {
          t[i] = X(e[i]);
        }), t._calculationInfo = B({}, e._calculationInfo);
      }, Iu = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = Zn(t, a, e)), l == null && o != null && (n[e] = l = Zn(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), n[e] = l;
        }
      };
    }(), r;
  }()
);
function QM(r, t) {
  Xf(r) || (r = ym(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = Q(), a = [], o = JM(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && m0(o), l = i === r.dimensionsDefine, u = l ? y0(r) : g0(i), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(r, o));
  for (var f = Q(h), v = new Cm(o), c = 0; c < v.length; c++)
    v[c] = -1;
  function p(D) {
    var A = v[D];
    if (A < 0) {
      var T = i[D], I = H(T) ? T : {
        name: T
      }, L = new rs(), P = I.name;
      P != null && u.get(P) != null && (L.name = L.displayName = P), I.type != null && (L.type = I.type), I.displayName != null && (L.displayName = I.displayName);
      var R = a.length;
      return v[D] = R, L.storeDimIndex = D, a.push(L), L;
    }
    return a[A];
  }
  if (!s)
    for (var c = 0; c < o; c++)
      p(c);
  f.each(function(D, A) {
    var T = Et(D).slice();
    if (T.length === 1 && !V(T[0]) && T[0] < 0) {
      f.set(A, !1);
      return;
    }
    var I = f.set(A, []);
    C(T, function(L, P) {
      var R = V(L) ? u.get(L) : L;
      R != null && R < o && (I[P] = R, d(p(R), A, P));
    });
  });
  var g = 0;
  C(e, function(D) {
    var A, T, I, L;
    if (V(D))
      A = D, L = {};
    else {
      L = D, A = L.name;
      var P = L.ordinalMeta;
      L.ordinalMeta = null, L = B({}, L), L.ordinalMeta = P, T = L.dimsDef, I = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null;
    }
    var R = f.get(A);
    if (R !== !1) {
      if (R = Et(R), !R.length)
        for (var O = 0; O < (T && T.length || 1); O++) {
          for (; g < o && p(g).coordDim != null; )
            g++;
          g < o && R.push(g++);
        }
      C(R, function(G, k) {
        var z = p(G);
        if (l && L.type != null && (z.type = L.type), d(ot(z, L), A, k), z.name == null && T) {
          var W = T[k];
          !H(W) && (W = {
            name: W
          }), z.name = z.displayName = W.name, z.defaultTooltip = W.defaultTooltip;
        }
        I && ot(z.otherDims, I);
      });
    }
  });
  function d(D, A, T) {
    um.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, n.set(A, !0));
  }
  var y = t.generateCoord, m = t.generateCoordCount, _ = m != null;
  m = y ? m || 1 : 0;
  var b = y || "value";
  function w(D) {
    D.name == null && (D.name = D.coordDim);
  }
  if (s)
    C(a, function(D) {
      w(D);
    }), a.sort(function(D, A) {
      return D.storeDimIndex - A.storeDimIndex;
    });
  else
    for (var S = 0; S < o; S++) {
      var x = p(S), M = x.coordDim;
      M == null && (x.coordDim = tD(b, n, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), w(x), x.type == null && (vm(r, S) === Jt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return jM(a), new p0({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function jM(r) {
  for (var t = Q(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function JM(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return C(t, function(a) {
    var o;
    H(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function tD(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var eD = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = Q(), this.categoryAxisMap = Q(), this.coordSysName = t;
    }
    return r;
  }()
);
function rD(r) {
  var t = r.get("coordinateSystem"), e = new eD(t), i = iD[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var iD = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", Me).models[0], a = r.getReferringComponents("yAxis", Me).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), Ui(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), Ui(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", Me).models[0];
    t.coordSysDims = ["single"], e.set("single", n), Ui(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", Me).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), Ui(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), Ui(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    C(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), h = o[l];
      e.set(h, u), Ui(u) && (i.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function Ui(r) {
  return r.get("type") === "category";
}
function nD(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  aD(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, h, f, v;
  if (C(a, function(m, _) {
    V(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (h = m));
  }), h && !i && !u && (i = !0), h) {
    f = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var c = h.coordDim, p = h.type, g = 0;
    C(a, function(m) {
      m.coordDim === c && g++;
    });
    var d = {
      name: f,
      coordDim: c,
      coordDimIndex: g,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, y = {
      name: v,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: v,
      coordDimIndex: g + 1,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (d.storeDimIndex = s.ensureCalculationDimension(v, p), y.storeDimIndex = s.ensureCalculationDimension(f, p)), o.appendCalculationDimension(d), o.appendCalculationDimension(y)) : (a.push(d), a.push(y));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: f
  };
}
function aD(r) {
  return !d0(r.schema);
}
function wn(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function oD(r, t) {
  return wn(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function sD(r, t) {
  var e = r.get("coordinateSystem"), i = hl.get(e), n;
  return t && t.coordSysDims && (n = U(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = HM(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function lD(r, t, e) {
  var i, n;
  return e && C(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function pl(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === _e;
  var o = rD(t), s = sD(t, o), l = e.useEncodeDefaulter, u = q(l) ? l : l ? Mt(eT, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, f = QM(n, h), v = lD(f.dimensions, e.createInvertedIndices, o), c = a ? null : i.getSharedDataStore(f), p = nD(t, {
    schema: f,
    store: c
  }), g = new KM(f, t);
  g.setCalculationInfo(p);
  var d = v != null && uD(n) ? function(y, m, _, b) {
    return b === v ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : c,
    null,
    d
  ), g;
}
function uD(r) {
  if (r.sourceFormat === _e) {
    var t = hD(r.data || []);
    return !$(Xa(t));
  }
}
function hD(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var je = (
  /** @class */
  function() {
    function r(t) {
      this._setting = t || {}, this._extent = [1 / 0, -1 / 0];
    }
    return r.prototype.getSetting = function(t) {
      return this._setting[t];
    }, r.prototype.unionExtent = function(t) {
      var e = this._extent;
      t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, r.prototype.unionExtentFromData = function(t, e) {
      this.unionExtent(t.getApproximateExtent(e));
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e);
    }, r.prototype.isInExtentRange = function(t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }, r.prototype.isBlank = function() {
      return this._isBlank;
    }, r.prototype.setBlank = function(t) {
      this._isBlank = t;
    }, r;
  }()
);
Ws(je);
var fD = 0, Nh = (
  /** @class */
  function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++fD;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && U(i, cD);
      return new r({
        categories: n,
        needCollect: !n,
        // deduplication is default in axis.
        deduplication: e.dedplication !== !1
      });
    }, r.prototype.getOrdinal = function(t) {
      return this._getOrCreateMap().get(t);
    }, r.prototype.parseAndCollect = function(t) {
      var e, i = this._needCollect;
      if (!V(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = Q(this.categories));
    }, r;
  }()
);
function cD(r) {
  return H(r) && r.value != null ? r.value : r + "";
}
function $h(r) {
  return r.type === "interval" || r.type === "log";
}
function vD(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = uy(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = _0(o), l = n.niceTickExtent = [Ct(Math.ceil(r[0] / o) * o, s), Ct(Math.floor(r[1] / o) * o, s)];
  return pD(l, r), n;
}
function Lu(r) {
  var t = Math.pow(10, wf(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, Ct(e * t);
}
function _0(r) {
  return rr(r) + 2;
}
function sd(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function pD(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), sd(r, 0, t), sd(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function dl(r, t) {
  return r >= t[0] && r <= t[1];
}
function gl(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function yl(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var ic = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new Nh({})), $(n) && (n = new Nh({
        categories: U(n, function(a) {
          return H(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : V(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), dl(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), gl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round(yl(e, this._extent)), this.getRawOrdinalNumber(e);
    }, t.prototype.getTicks = function() {
      for (var e = [], i = this._extent, n = i[0]; n <= i[1]; )
        e.push({
          value: n
        }), n++;
      return e;
    }, t.prototype.getMinorTicks = function(e) {
    }, t.prototype.setSortInfo = function(e) {
      if (e == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var i = e.ordinalNumbers, n = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, i.length); o < l; ++o) {
        var u = i[o];
        n[o] = u, a[u] = o;
      }
      for (var h = 0; o < s; ++o) {
        for (; a[h] != null; )
          h++;
        n.push(h), a[h] = o;
      }
    }, t.prototype._getTickNumber = function(e) {
      var i = this._ticksByOrdinalNumber;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getRawOrdinalNumber = function(e) {
      var i = this._ordinalNumbersByTick;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getLabel = function(e) {
      if (!this.isBlank()) {
        var i = this.getRawOrdinalNumber(e.value), n = this._ordinalMeta.categories[i];
        return n == null ? "" : n + "";
      }
    }, t.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.isInExtentRange = function(e) {
      return e = this._getTickNumber(e), this._extent[0] <= e && this._extent[1] >= e;
    }, t.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function() {
    }, t.prototype.calcNiceExtent = function() {
    }, t.type = "ordinal", t;
  }(je)
);
je.registerClass(ic);
var li = Ct, Pn = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "interval", e._interval = 0, e._intervalPrecision = 2, e;
    }
    return t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return dl(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return gl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return yl(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = _0(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: li(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = li(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var h = s.length ? s[s.length - 1].value : a[1];
      return n[1] > h && (e ? s.push({
        value: li(h + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, h = [], f = s.value - l.value, v = f / e; u < e - 1; ) {
          var c = li(l.value + (u + 1) * v);
          c > a[0] && c < a[1] && h.push(c), u++;
        }
        n.push(h);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = rr(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = li(e.value, n, !0);
      return am(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = vD(a, e, i, n);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1])
        if (i[0] !== 0) {
          var n = Math.abs(i[0]);
          e.fixMax || (i[1] += n / 2), i[0] -= n / 2;
        } else
          i[1] = 1;
      var a = i[1] - i[0];
      isFinite(a) || (i[0] = 0, i[1] = 1), this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
      var o = this._interval;
      e.fixMin || (i[0] = li(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = li(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  }(je)
);
je.registerClass(Pn);
var b0 = typeof Float32Array < "u", dD = b0 ? Float32Array : Array;
function ir(r) {
  return $(r) ? b0 ? new Float32Array(r) : r : new dD(r);
}
var gD = "__ec_stack_";
function S0(r) {
  return r.get("stack") || gD + r.seriesIndex;
}
function nc(r) {
  return r.dim + r.index;
}
function w0(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    T0(i) && e.push(i);
  }), e;
}
function yD(r) {
  var t = {};
  C(r, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var f = l.getData(), v = h.dim + "_" + h.index, c = f.getDimensionIndex(f.mapDimension(h.dim)), p = f.getStore(), g = 0, d = p.count(); g < d; ++g) {
        var y = p.get(c, g);
        t[v] ? t[v].push(y) : t[v] = [y];
      }
  });
  var e = {};
  for (var i in t)
    if (t.hasOwnProperty(i)) {
      var n = t[i];
      if (n) {
        n.sort(function(l, u) {
          return l - u;
        });
        for (var a = null, o = 1; o < n.length; ++o) {
          var s = n[o] - n[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s));
        }
        e[i] = a;
      }
    }
  return e;
}
function x0(r) {
  var t = yD(r), e = [];
  return C(r, function(i) {
    var n = i.coordinateSystem, a = n.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], h = Math.abs(o[1] - o[0]), f = a.scale.getExtent(), v = Math.abs(f[1] - f[0]);
      s = u ? h / v * u : h;
    } else {
      var c = i.getData();
      s = Math.abs(o[1] - o[0]) / c.count();
    }
    var p = Vt(i.get("barWidth"), s), g = Vt(i.get("barMaxWidth"), s), d = Vt(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (C0(i) ? 0.5 : 1),
      s
    ), y = i.get("barGap"), m = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: p,
      barMaxWidth: g,
      barMinWidth: d,
      barGap: y,
      barCategoryGap: m,
      axisKey: nc(a),
      stackId: S0(i)
    });
  }), mD(e);
}
function mD(r) {
  var t = {};
  C(r, function(i, n) {
    var a = i.axisKey, o = i.bandWidth, s = t[a] || {
      bandWidth: o,
      remainedWidth: o,
      autoWidthCount: 0,
      categoryGap: null,
      gap: "20%",
      stacks: {}
    }, l = s.stacks;
    t[a] = s;
    var u = i.stackId;
    l[u] || s.autoWidthCount++, l[u] = l[u] || {
      width: 0,
      maxWidth: 0
    };
    var h = i.barWidth;
    h && !l[u].width && (l[u].width = h, h = Math.min(s.remainedWidth, h), s.remainedWidth -= h);
    var f = i.barMaxWidth;
    f && (l[u].maxWidth = f);
    var v = i.barMinWidth;
    v && (l[u].minWidth = v);
    var c = i.barGap;
    c != null && (s.gap = c);
    var p = i.barCategoryGap;
    p != null && (s.categoryGap = p);
  });
  var e = {};
  return C(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = dt(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Vt(s, o), h = Vt(i.gap, 1), f = i.remainedWidth, v = i.autoWidthCount, c = (f - u) / (v + (v - 1) * h);
    c = Math.max(c, 0), C(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var b = y.width;
        m && (b = Math.min(b, m)), _ && (b = Math.max(b, _)), y.width = b, f -= b + h * b, v--;
      } else {
        var b = c;
        m && m < b && (b = Math.min(m, f)), _ && _ > b && (b = _), b !== c && (y.width = b, f -= b + h * b, v--);
      }
    }), c = (f - u) / (v + (v - 1) * h), c = Math.max(c, 0);
    var p = 0, g;
    C(a, function(y, m) {
      y.width || (y.width = c), g = y, p += y.width * (1 + h);
    }), g && (p -= g.width * h);
    var d = -p / 2;
    C(a, function(y, m) {
      e[n][m] = e[n][m] || {
        bandWidth: o,
        offset: d,
        width: y.width
      }, d += y.width * (1 + h);
    });
  }), e;
}
function _D(r, t, e) {
  if (r && t) {
    var i = r[nc(t)];
    return i;
  }
}
function bD(r, t) {
  var e = w0(r, t), i = x0(e);
  C(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = S0(n), u = i[nc(s)][l], h = u.offset, f = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: f
    });
  });
}
function SD(r) {
  return {
    seriesType: r,
    plan: Kf(),
    reset: function(t) {
      if (T0(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), h = e.getCalculationInfo("stackResultDimension"), f = wn(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), c = wD(n, a), p = C0(t), g = t.get("barMinHeight") || 0, d = h && e.getDimensionIndex(h), y = e.getLayout("size"), m = e.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var w = _.count, S = p && ir(w * 3), x = p && l && ir(w * 3), M = p && ir(w), D = i.master.getRect(), A = v ? D.width : D.height, T, I = b.getStore(), L = 0; (T = _.next()) != null; ) {
              var P = I.get(f ? d : o, T), R = I.get(s, T), O = c, G = void 0;
              f && (G = +P - I.get(o, T));
              var k = void 0, z = void 0, W = void 0, K = void 0;
              if (v) {
                var tt = i.dataToPoint([P, R]);
                if (f) {
                  var ft = i.dataToPoint([G, R]);
                  O = ft[0];
                }
                k = O, z = tt[1] + m, W = tt[0] - O, K = y, Math.abs(W) < g && (W = (W < 0 ? -1 : 1) * g);
              } else {
                var tt = i.dataToPoint([R, P]);
                if (f) {
                  var ft = i.dataToPoint([R, G]);
                  O = ft[1];
                }
                k = tt[0] + m, z = O, W = y, K = tt[1] - O, Math.abs(K) < g && (K = (K <= 0 ? -1 : 1) * g);
              }
              p ? (S[L] = k, S[L + 1] = z, S[L + 2] = v ? W : K, x && (x[L] = v ? D.x : k, x[L + 1] = v ? z : D.y, x[L + 2] = A), M[T] = T) : b.setItemLayout(T, {
                x: k,
                y: z,
                width: W,
                height: K
              }), L += 3;
            }
            p && b.setLayout({
              largePoints: S,
              largeDataIndices: M,
              largeBackgroundPoints: x,
              valueAxisHorizontal: v
            });
          }
        };
      }
    }
  };
}
function T0(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function C0(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function wD(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var xD = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, M0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return nl(e.value, Jv[Wx(fn(this._minLevelUnit))] || Jv.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return Ux(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = LD(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= pe, i[1] += pe), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - pe;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = Po.length, l = Math.min(xD(Po, this._approxInterval, 0, s), s - 1);
      this._interval = Po[l][1], this._minLevelUnit = Po[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return gt(e) ? e : +lr(e);
    }, t.prototype.contain = function(e) {
      return dl(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return gl(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return yl(e, this._extent);
    }, t.type = "time", t;
  }(Pn)
), Po = [
  // Format                           interval
  ["second", Vf],
  ["minute", Hf],
  ["hour", ya],
  ["quarter-day", ya * 6],
  ["half-day", ya * 12],
  ["day", pe * 1.2],
  ["half-week", pe * 3.5],
  ["week", pe * 7],
  ["month", pe * 31],
  ["quarter", pe * 95],
  ["half-year", jv / 2],
  ["year", jv]
  // 1Y
];
function TD(r, t, e, i) {
  var n = lr(t), a = lr(e), o = function(p) {
    return tp(n, p, i) === tp(a, p, i);
  }, s = function() {
    return o("year");
  }, l = function() {
    return s() && o("month");
  }, u = function() {
    return l() && o("day");
  }, h = function() {
    return u() && o("hour");
  }, f = function() {
    return h() && o("minute");
  }, v = function() {
    return f() && o("second");
  }, c = function() {
    return v() && o("millisecond");
  };
  switch (r) {
    case "year":
      return s();
    case "month":
      return l();
    case "day":
      return u();
    case "hour":
      return h();
    case "minute":
      return f();
    case "second":
      return v();
    case "millisecond":
      return c();
  }
}
function CD(r, t) {
  return r /= pe, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function MD(r) {
  var t = 30 * pe;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function DD(r) {
  return r /= ya, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function ld(r, t) {
  return r /= t ? Hf : Vf, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function AD(r) {
  return uy(r);
}
function ID(r, t, e) {
  var i = new Date(r);
  switch (fn(t)) {
    case "year":
    case "month":
      i[Jy(e)](0);
    case "day":
      i[tm(e)](1);
    case "hour":
      i[em(e)](0);
    case "minute":
      i[rm(e)](0);
    case "second":
      i[im(e)](0), i[nm(e)](0);
  }
  return i.getTime();
}
function LD(r, t, e, i) {
  var n = 1e4, a = Qy, o = 0;
  function s(A, T, I, L, P, R, O) {
    for (var G = new Date(T), k = T, z = G[L](); k < I && k <= i[1]; )
      O.push({
        value: k
      }), z += A, G[P](z), k = G.getTime();
    O.push({
      value: k,
      notAdd: !0
    });
  }
  function l(A, T, I) {
    var L = [], P = !T.length;
    if (!TD(fn(A), i[0], i[1], e)) {
      P && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: ID(new Date(i[0]), A, e)
      }, {
        value: i[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var O = T[R].value, G = T[R + 1].value;
        if (O !== G) {
          var k = void 0, z = void 0, W = void 0, K = !1;
          switch (A) {
            case "year":
              k = Math.max(1, Math.round(t / pe / 365)), z = Gf(e), W = Yx(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              k = MD(t), z = cn(e), W = Jy(e);
              break;
            case "week":
            case "half-week":
            case "day":
              k = CD(t), z = al(e), W = tm(e), K = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              k = DD(t), z = Ea(e), W = em(e);
              break;
            case "minute":
              k = ld(t, !0), z = ol(e), W = rm(e);
              break;
            case "second":
              k = ld(t, !1), z = sl(e), W = im(e);
              break;
            case "millisecond":
              k = AD(t), z = ll(e), W = nm(e);
              break;
          }
          s(k, O, G, z, W, K, L), A === "year" && I.length > 1 && R === 0 && I.unshift({
            value: I[0].value - k
          });
        }
      }
      for (var R = 0; R < L.length; R++)
        I.push(L[R]);
      return L;
    }
  }
  for (var u = [], h = [], f = 0, v = 0, c = 0; c < a.length && o++ < n; ++c) {
    var p = fn(a[c]);
    if (Gx(a[c])) {
      l(a[c], u[u.length - 1] || [], h);
      var g = a[c + 1] ? fn(a[c + 1]) : null;
      if (p !== g) {
        if (h.length) {
          v = f, h.sort(function(A, T) {
            return A.value - T.value;
          });
          for (var d = [], y = 0; y < h.length; ++y) {
            var m = h[y].value;
            (y === 0 || h[y - 1].value !== m) && (d.push(h[y]), m >= i[0] && m <= i[1] && f++);
          }
          var _ = (i[1] - i[0]) / t;
          if (f > _ * 1.5 && v > _ / 1.5 || (u.push(d), f > _ || r === a[c]))
            break;
        }
        h = [];
      }
    }
  }
  for (var b = Pt(U(u, function(A) {
    return Pt(A, function(T) {
      return T.value >= i[0] && T.value <= i[1] && !T.notAdd;
    });
  }), function(A) {
    return A.length > 0;
  }), w = [], S = b.length - 1, c = 0; c < b.length; ++c)
    for (var x = b[c], M = 0; M < x.length; ++M)
      w.push({
        value: x[M].value,
        level: S - c
      });
  w.sort(function(A, T) {
    return A.value - T.value;
  });
  for (var D = [], c = 0; c < w.length; ++c)
    (c === 0 || w[c].value !== w[c - 1].value) && D.push(w[c]);
  return D;
}
je.registerClass(M0);
var ud = je.prototype, Sa = Pn.prototype, PD = Ct, RD = Math.floor, ED = Math.ceil, Ro = Math.pow, we = Math.log, ac = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new Pn(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = Sa.getTicks.call(this, e);
      return U(o, function(s) {
        var l = s.value, u = Ct(Ro(this.base, l));
        return u = l === n[0] && this._fixMin ? Eo(u, a[0]) : u, u = l === n[1] && this._fixMax ? Eo(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = we(this.base);
      e = we(Math.max(0, e)) / n, i = we(Math.max(0, i)) / n, Sa.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = ud.getExtent.call(this);
      i[0] = Ro(e, i[0]), i[1] = Ro(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = Eo(i[0], a[0])), this._fixMax && (i[1] = Eo(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = we(e[0]) / we(i), e[1] = we(e[1]) / we(i), ud.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = Qb(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [Ct(ED(i[0] / a) * a), Ct(RD(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      Sa.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = we(e) / we(this.base), dl(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = we(e) / we(this.base), gl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = yl(e, this._extent), Ro(this.base, e);
    }, t.type = "log", t;
  }(je)
), D0 = ac.prototype;
D0.getMinorTicks = Sa.getMinorTicks;
D0.getLabel = Sa.getLabel;
function Eo(r, t) {
  return PD(r, rr(t));
}
je.registerClass(ac);
var OD = (
  /** @class */
  function() {
    function r(t, e, i) {
      this._prepareParams(t, e, i);
    }
    return r.prototype._prepareParams = function(t, e, i) {
      i[1] < i[0] && (i = [NaN, NaN]), this._dataMin = i[0], this._dataMax = i[1];
      var n = this._isOrdinal = t.type === "ordinal";
      this._needCrossZero = t.type === "interval" && e.getNeedCrossZero && e.getNeedCrossZero();
      var a = e.get("min", !0);
      a == null && (a = e.get("startValue", !0));
      var o = this._modelMinRaw = a;
      q(o) ? this._modelMinNum = Oo(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = Oo(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (q(s) ? this._modelMaxNum = Oo(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = Oo(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = $(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [Ge(u[0], 1), Ge(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var f = us(s) || us(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !h && (l = 0));
      var v = this._determinedMin, c = this._determinedMax;
      return v != null && (s = v, u = !0), c != null && (l = c, h = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: h,
        isBlank: f
      };
    }, r.prototype.modifyDataMinMax = function(t, e) {
      this[BD[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = kD[t];
      this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  }()
), kD = {
  min: "_determinedMin",
  max: "_determinedMax"
}, BD = {
  min: "_dataMin",
  max: "_dataMax"
};
function ND(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new OD(r, t, e), r.rawExtentInfo = i, i);
}
function Oo(r, t) {
  return t == null ? null : us(t) ? NaN : r.parse(t);
}
function A0(r, t) {
  var e = r.type, i = ND(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = w0("bar", o), l = !1;
    if (C(s, function(f) {
      l = l || f.getBaseAxis() === t.axis;
    }), l) {
      var u = x0(s), h = $D(n, a, t, u);
      n = h.min, a = h.max;
    }
  }
  return {
    extent: [n, a],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: i.minFixed,
    fixMax: i.maxFixed
  };
}
function $D(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = _D(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  C(o, function(c) {
    s = Math.min(c.offset, s);
  });
  var l = -1 / 0;
  C(o, function(c) {
    l = Math.max(c.offset + c.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - r, f = 1 - (s + l) / a, v = h / f - h;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function hd(r, t) {
  var e = t, i = A0(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof ac && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function zD(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      case "category":
        return new ic({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new M0({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (je.getClass(t) || Pn)();
    }
}
function FD(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function Rn(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  }(t) : V(t) ? /* @__PURE__ */ function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  }(t) : q(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(oc(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function oc(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function VD(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof ic ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = Rn(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var h = 0; h < n; h += u) {
      var f = i ? i[h] : {
        value: a[0] + h
      }, v = s(f, h), c = o.getTextRect(v), p = HD(c, o.get("rotate") || 0);
      l ? l.union(p) : l = p;
    }
    return l;
  }
}
function HD(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new at(r.x, r.y, a, o);
  return s;
}
function sc(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function I0(r) {
  return r.type === "category" && sc(r.getLabelModel()) === 0;
}
function GD(r, t) {
  var e = {};
  return C(r.mapDimensionsAll(t), function(i) {
    e[oD(r, i)] = !0;
  }), dt(e);
}
var WD = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getNeedCrossZero = function() {
      var t = this.option;
      return !t.scale;
    }, r.prototype.getCoordSysModel = function() {
    }, r;
  }()
), fd = [], UD = {
  registerPreprocessor: f0,
  registerProcessor: c0,
  registerPostInit: EM,
  registerPostUpdate: OM,
  registerUpdateLifecycle: ec,
  registerAction: Ln,
  registerCoordinateSystem: kM,
  registerLayout: BM,
  registerVisual: Di,
  registerTransform: $M,
  registerLoading: v0,
  registerMap: NM,
  registerImpl: vM,
  PRIORITY: MM,
  ComponentModel: st,
  ComponentView: Le,
  SeriesModel: Ie,
  ChartView: ye,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    st.registerClass(r);
  },
  registerComponentView: function(r) {
    Le.registerClass(r);
  },
  registerSeriesModel: function(r) {
    Ie.registerClass(r);
  },
  registerChartView: function(r) {
    ye.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    st.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    Ub(r, t);
  }
};
function Ue(r) {
  if ($(r)) {
    C(r, function(t) {
      Ue(t);
    });
    return;
  }
  ct(fd, r) >= 0 || (fd.push(r), q(r) && (r = {
    install: r
  }), r.install(UD));
}
var za = At();
function L0(r, t) {
  var e = U(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function YD(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = Rn(r), i = r.scale.getExtent(), n = L0(r, t), a = Pt(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: U(a, function(o) {
        var s = {
          value: o
        };
        return {
          formattedLabel: e(s),
          rawLabel: r.scale.getLabel(s),
          tickValue: o
        };
      })
    };
  }
  return r.type === "category" ? qD(r) : KD(r);
}
function XD(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = L0(r, e);
    return {
      ticks: Pt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? ZD(r, t) : {
    ticks: U(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function qD(r) {
  var t = r.getLabelModel(), e = P0(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function P0(r, t) {
  var e = R0(r, "labels"), i = sc(t), n = E0(e, i);
  if (n)
    return n;
  var a, o;
  return q(i) ? a = B0(r, i) : (o = i === "auto" ? QD(r) : i, a = k0(r, o)), O0(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function ZD(r, t) {
  var e = R0(r, "ticks"), i = sc(t), n = E0(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), q(i))
    a = B0(r, i, !0);
  else if (i === "auto") {
    var s = P0(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = U(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = k0(r, o, !0);
  return O0(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function KD(r) {
  var t = r.scale.getTicks(), e = Rn(r);
  return {
    labels: U(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: e(i, n),
        rawLabel: r.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function R0(r, t) {
  return za(r)[t] || (za(r)[t] = []);
}
function E0(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function O0(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function QD(r) {
  var t = za(r).autoInterval;
  return t ?? (za(r).autoInterval = r.calculateCategoryInterval());
}
function jD(r) {
  var t = JD(r), e = Rn(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), h = Math.abs(u * Math.cos(i)), f = Math.abs(u * Math.sin(i)), v = 0, c = 0; l <= a[1]; l += s) {
    var p = 0, g = 0, d = bf(e({
      value: l
    }), t.font, "center", "top");
    p = d.width * 1.3, g = d.height * 1.3, v = Math.max(v, p, 7), c = Math.max(c, g, 7);
  }
  var y = v / h, m = c / f;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = za(r.model), w = r.getExtent(), S = b.lastAutoInterval, x = b.lastTickCount;
  return S != null && x != null && Math.abs(S - _) <= 1 && Math.abs(x - o) <= 1 && S > _ && b.axisExtent0 === w[0] && b.axisExtent1 === w[1] ? _ = S : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = w[0], b.axisExtent1 = w[1]), _;
}
function JD(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function k0(r, t, e) {
  var i = Rn(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = n.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var f = I0(r), v = o.get("showMinLabel") || f, c = o.get("showMaxLabel") || f;
  v && u !== a[0] && g(a[0]);
  for (var p = u; p <= a[1]; p += l)
    g(p);
  c && p - l !== a[1] && g(a[1]);
  function g(d) {
    var y = {
      value: d
    };
    s.push(e ? d : {
      formattedLabel: i(y),
      rawLabel: n.getLabel(y),
      tickValue: d
    });
  }
  return s;
}
function B0(r, t, e) {
  var i = r.scale, n = Rn(r), a = [];
  return C(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var cd = [0, 1], tA = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = e, this._extent = i || [0, 0];
    }
    return r.prototype.contain = function(t) {
      var e = this._extent, i = Math.min(e[0], e[1]), n = Math.max(e[0], e[1]);
      return t >= i && t <= n;
    }, r.prototype.containData = function(t) {
      return this.scale.contain(t);
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.getPixelPrecision = function(t) {
      return qb(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), vd(i, n.count())), sr(t, cd, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), vd(i, n.count()));
      var a = sr(t, i, cd, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = XD(this, e), n = i.ticks, a = U(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return eA(this, a, o, t.clamp), a;
    }, r.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), e = t.get("splitNumber");
      e > 0 && e < 100 || (e = 5);
      var i = this.scale.getMinorTicks(e), n = U(i, function(a) {
        return U(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, r.prototype.getViewLabels = function() {
      return YD(this).labels;
    }, r.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, r.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, r.prototype.getBandWidth = function() {
      var t = this._extent, e = this.scale.getExtent(), i = e[1] - e[0] + (this.onBand ? 1 : 0);
      i === 0 && (i = 1);
      var n = Math.abs(t[1] - t[0]);
      return Math.abs(n) / i;
    }, r.prototype.calculateCategoryInterval = function() {
      return jD(this);
    }, r;
  }()
);
function vd(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function eA(r, t, e, i) {
  var n = t.length;
  if (!r.onBand || e || !n)
    return;
  var a = r.getExtent(), o, s;
  if (n === 1)
    t[0].coord = a[0], o = t[1] = {
      coord: a[1],
      tickValue: t[0].tickValue
    };
  else {
    var l = t[n - 1].tickValue - t[0].tickValue, u = (t[n - 1].coord - t[0].coord) / l;
    C(t, function(c) {
      c.coord -= u / 2;
    });
    var h = r.scale.getExtent();
    s = 1 + h[1] - t[n - 1].tickValue, o = {
      coord: t[n - 1].coord + u * s,
      tickValue: h[1] + 1
    }, t.push(o);
  }
  var f = a[0] > a[1];
  v(t[0].coord, a[0]) && (i ? t[0].coord = a[0] : t.shift()), i && v(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), v(a[1], o.coord) && (i ? o.coord = a[1] : t.pop()), i && v(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function v(c, p) {
    return c = Ct(c), p = Ct(p), f ? c > p : c < p;
  }
}
function rA(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new xs(o, a) : null;
      t.push({
        label: n,
        labelLine: i.labelLine,
        rect: u,
        localRect: o,
        obb: h,
        priority: i.priority,
        defaultAttr: i.defaultAttr,
        layoutOption: i.computedLayoutOption,
        axisAligned: s,
        transform: a
      });
    }
  }
  return t;
}
function iA(r) {
  var t = [];
  r.sort(function(g, d) {
    return d.priority - g.priority;
  });
  var e = new at(0, 0, 0, 0);
  function i(g) {
    if (!g.ignore) {
      var d = g.ensureState("emphasis");
      d.ignore == null && (d.ignore = !1);
    }
    g.ignore = !0;
  }
  for (var n = 0; n < r.length; n++) {
    var a = r[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, h = a.labelLine;
    e.copy(a.rect), e.width -= 0.1, e.height -= 0.1, e.x += 0.05, e.y += 0.05;
    for (var f = a.obb, v = !1, c = 0; c < t.length; c++) {
      var p = t[c];
      if (e.intersect(p.rect)) {
        if (o && p.axisAligned) {
          v = !0;
          break;
        }
        if (p.obb || (p.obb = new xs(p.localRect, p.transform)), f || (f = new xs(s, l)), f.intersect(p.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), h && i(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var nA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      return pl(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new Tt(), n = hr("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = hr(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
      i.add(u), u.setStyle(e.itemStyle);
      var h = e.iconRotate === "inherit" ? o : e.iconRotate || 0;
      return u.rotation = h * Math.PI / 180, u.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), i;
    }, t.type = "series.line", t.dependencies = ["grid", "polar"], t.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: !1,
      // Disabled if step is true
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point.
      connectNulls: !1,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: !1
    }, t;
  }(Ie)
);
function lc(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = Sn(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(Sn(r, t, e[o]));
    return a.join(" ");
  }
}
function N0(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!$(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var uc = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = hr(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = aA, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Ss(this.childAt(0));
    }, t.prototype.downplay = function() {
      ws(this.childAt(0));
    }, t.prototype.setZ = function(e, i) {
      var n = this.childAt(0);
      n.zlevel = e, n.z = i;
    }, t.prototype.setDraggable = function(e, i) {
      var n = this.childAt(0);
      n.draggable = e, n.cursor = !i && e ? "move" : n.cursor;
    }, t.prototype.updateData = function(e, i, n, a) {
      this.silent = !1;
      var o = e.getItemVisual(i, "symbol") || "circle", s = e.hostModel, l = t.getSymbolSize(e, i), u = o !== this._symbolType, h = a && a.disableAnimation;
      if (u) {
        var f = e.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, e, i, l, f);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var c = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        h ? v.attr(c) : ie(v, c, s, i), Fy(v);
      }
      if (this._updateCommon(e, i, l, n, a), u) {
        var v = this.childAt(0);
        if (!h) {
          var c = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: v.style.opacity
            }
          };
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, ur(v, c, s, i);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, h, f, v, c, p, g, d, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, f = a.selectItemStyle, v = a.focus, c = a.blurScope, g = a.labelStatesModels, d = a.hoverScale, y = a.cursorStyle, p = a.emphasisDisabled), !a || e.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), f = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), c = _.get("blurScope"), p = _.get("disabled"), g = mn(m), d = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var w = Wm(e.getItemVisual(i, "symbolOffset"), n);
      w && (s.x = w[0], s.y = w[1]), y && s.attr("cursor", y);
      var S = e.getItemVisual(i, "style"), x = S.fill;
      if (s instanceof Ke) {
        var M = s.style;
        s.useStyle(B({
          // TODO other properties like x, y ?
          image: M.image,
          x: M.x,
          y: M.y,
          width: M.width,
          height: M.height
        }, S));
      } else
        s.__isEmptyBrush ? s.useStyle(B({}, S)) : s.useStyle(S), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var D = e.getItemVisual(i, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      Qa(s, g, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: I,
        inheritColor: x,
        defaultOpacity: S.opacity
      });
      function I(R) {
        return T ? e.getName(R) : lc(e, R);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var L = s.ensureState("emphasis");
      L.style = u, s.ensureState("select").style = f, s.ensureState("blur").style = h;
      var P = d == null || d === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(d) && d > 0 ? +d : 1;
      L.scaleX = this._sizeX * P, L.scaleY = this._sizeY * P, this.setSymbolScale(1), Pa(this, v, c, p);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = it(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Ts(l, {
          style: {
            opacity: 0
          }
        }, i, {
          dataIndex: o,
          removeOpt: s,
          cb: function() {
            a.removeTextContent();
          }
        });
      } else
        a.removeTextContent();
      Ts(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, i, {
        dataIndex: o,
        cb: e,
        removeOpt: s
      });
    }, t.getSymbolSize = function(e, i) {
      return KC(e.getItemVisual(i, "symbolSize"));
    }, t;
  }(Tt)
);
function aA(r, t) {
  this.parent.drift(r, t);
}
function Pu(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function pd(r) {
  return r != null && !H(r) && (r = {
    isIgnore: r
  }), r || {};
}
function dd(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: mn(t),
    cursorStyle: t.get("cursor")
  };
}
var oA = (
  /** @class */
  function() {
    function r(t) {
      this.group = new Tt(), this._SymbolCtor = t || uc;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = pd(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = dd(t), u = {
        disableAnimation: s
      }, h = e.getSymbolPoint || function(f) {
        return t.getItemLayout(f);
      };
      a || i.removeAll(), t.diff(a).add(function(f) {
        var v = h(f);
        if (Pu(t, v, f, e)) {
          var c = new o(t, f, l, u);
          c.setPosition(v), t.setItemGraphicEl(f, c), i.add(c);
        }
      }).update(function(f, v) {
        var c = a.getItemGraphicEl(v), p = h(f);
        if (!Pu(t, p, f, e)) {
          i.remove(c);
          return;
        }
        var g = t.getItemVisual(f, "symbol") || "circle", d = c && c.getSymbolType && c.getSymbolType();
        if (!c || d && d !== g)
          i.remove(c), c = new o(t, f, l, u), c.setPosition(p);
        else {
          c.updateData(t, f, l, u);
          var y = {
            x: p[0],
            y: p[1]
          };
          s ? c.attr(y) : ie(c, y, n);
        }
        i.add(c), t.setItemGraphicEl(f, c);
      }).remove(function(f) {
        var v = a.getItemGraphicEl(f);
        v && v.fadeOut(function() {
          i.remove(v);
        }, n);
      }).execute(), this._getSymbolPoint = h, this._data = t;
    }, r.prototype.updateLayout = function() {
      var t = this, e = this._data;
      e && e.eachItemGraphicEl(function(i, n) {
        var a = t._getSymbolPoint(n);
        i.setPosition(a), i.markRedraw();
      });
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = dd(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = pd(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (Pu(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      Ka(this._progressiveEls || this.group, t);
    }, r.prototype.remove = function(t) {
      var e = this.group, i = this._data;
      i && t ? i.eachItemGraphicEl(function(n) {
        n.fadeOut(function() {
          e.remove(n);
        }, i.hostModel);
      }) : e.removeAll();
    }, r;
  }()
);
function $0(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = sA(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, f = U(r.dimensions, function(p) {
    return t.mapDimension(p);
  }), v = !1, c = t.getCalculationInfo("stackResultDimension");
  return wn(
    t,
    f[0]
    /* , dims[1] */
  ) && (v = !0, f[0] = c), wn(
    t,
    f[1]
    /* , dims[0] */
  ) && (v = !0, f[1] = c), {
    dataDimsForPoint: f,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!v,
    valueDim: l,
    baseDim: u,
    baseDataOffset: h,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function sA(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : gt(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function z0(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function lA(r, t) {
  var e = [];
  return t.diff(r).add(function(i) {
    e.push({
      cmd: "+",
      idx: i
    });
  }).update(function(i, n) {
    e.push({
      cmd: "=",
      idx: n,
      idx1: i
    });
  }).remove(function(i) {
    e.push({
      cmd: "-",
      idx: i
    });
  }).execute(), e;
}
function uA(r, t, e, i, n, a, o, s) {
  for (var l = lA(r, t), u = [], h = [], f = [], v = [], c = [], p = [], g = [], d = $0(n, t, o), y = r.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], w = !0, S = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        S = b.idx * 2, x = b.idx1 * 2;
        var M = y[S], D = y[S + 1], A = m[x], T = m[x + 1];
        (isNaN(M) || isNaN(D)) && (M = A, D = T), u.push(M, D), h.push(A, T), f.push(e[S], e[S + 1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var I = b.idx, L = d.dataDimsForPoint, P = n.dataToPoint([t.get(L[0], I), t.get(L[1], I)]);
        x = I * 2, u.push(P[0], P[1]), h.push(m[x], m[x + 1]);
        var R = z0(d, n, t, I);
        f.push(R[0], R[1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(I));
        break;
      case "-":
        w = !1;
    }
    w && (c.push(b), p.push(p.length));
  }
  p.sort(function(bt, be) {
    return g[bt] - g[be];
  });
  for (var O = u.length, G = ir(O), k = ir(O), z = ir(O), W = ir(O), K = [], _ = 0; _ < p.length; _++) {
    var tt = p[_], ft = _ * 2, yt = tt * 2;
    G[ft] = u[yt], G[ft + 1] = u[yt + 1], k[ft] = h[yt], k[ft + 1] = h[yt + 1], z[ft] = f[yt], z[ft + 1] = f[yt + 1], W[ft] = v[yt], W[ft + 1] = v[yt + 1], K[_] = c[tt];
  }
  return {
    current: G,
    next: k,
    stackedOnCurrent: z,
    stackedOnNext: W,
    status: K
  };
}
var Tr = Math.min, Cr = Math.max;
function bi(r, t) {
  return isNaN(r) || isNaN(t);
}
function zh(r, t, e, i, n, a, o, s, l) {
  for (var u, h, f, v, c, p, g = e, d = 0; d < i; d++) {
    var y = t[g * 2], m = t[g * 2 + 1];
    if (g >= n || g < 0)
      break;
    if (bi(y, m)) {
      if (l) {
        g += a;
        continue;
      }
      break;
    }
    if (g === e)
      r[a > 0 ? "moveTo" : "lineTo"](y, m), f = y, v = m;
    else {
      var _ = y - u, b = m - h;
      if (_ * _ + b * b < 0.5) {
        g += a;
        continue;
      }
      if (o > 0) {
        for (var w = g + a, S = t[w * 2], x = t[w * 2 + 1]; S === y && x === m && d < i; )
          d++, w += a, g += a, S = t[w * 2], x = t[w * 2 + 1], y = t[g * 2], m = t[g * 2 + 1], _ = y - u, b = m - h;
        var M = d + 1;
        if (l)
          for (; bi(S, x) && M < i; )
            M++, w += a, S = t[w * 2], x = t[w * 2 + 1];
        var D = 0.5, A = 0, T = 0, I = void 0, L = void 0;
        if (M >= i || bi(S, x))
          c = y, p = m;
        else {
          A = S - u, T = x - h;
          var P = y - u, R = S - y, O = m - h, G = x - m, k = void 0, z = void 0;
          if (s === "x") {
            k = Math.abs(P), z = Math.abs(R);
            var W = A > 0 ? 1 : -1;
            c = y - W * k * o, p = m, I = y + W * z * o, L = m;
          } else if (s === "y") {
            k = Math.abs(O), z = Math.abs(G);
            var K = T > 0 ? 1 : -1;
            c = y, p = m - K * k * o, I = y, L = m + K * z * o;
          } else
            k = Math.sqrt(P * P + O * O), z = Math.sqrt(R * R + G * G), D = z / (z + k), c = y - A * o * (1 - D), p = m - T * o * (1 - D), I = y + A * o * D, L = m + T * o * D, I = Tr(I, Cr(S, y)), L = Tr(L, Cr(x, m)), I = Cr(I, Tr(S, y)), L = Cr(L, Tr(x, m)), A = I - y, T = L - m, c = y - A * k / z, p = m - T * k / z, c = Tr(c, Cr(u, y)), p = Tr(p, Cr(h, m)), c = Cr(c, Tr(u, y)), p = Cr(p, Tr(h, m)), A = y - c, T = m - p, I = y + A * z / k, L = m + T * z / k;
        }
        r.bezierCurveTo(f, v, c, p, y, m), f = I, v = L;
      } else
        r.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return d;
}
var F0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  }()
), hA = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polyline", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new F0();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && bi(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && bi(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += zh(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = Ci.CMD, s, l, u = i === "x", h = [], f = 0; f < a.length; ) {
        var v = a[f++], c = void 0, p = void 0, g = void 0, d = void 0, y = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[f++], l = a[f++];
            break;
          case o.L:
            if (c = a[f++], p = a[f++], _ = u ? (e - s) / (c - s) : (e - l) / (p - l), _ <= 1 && _ >= 0) {
              var b = u ? (p - l) * _ + l : (c - s) * _ + s;
              return u ? [e, b] : [b, e];
            }
            s = c, l = p;
            break;
          case o.C:
            c = a[f++], p = a[f++], g = a[f++], d = a[f++], y = a[f++], m = a[f++];
            var w = u ? cs(s, c, g, y, e, h) : cs(l, p, d, m, e, h);
            if (w > 0)
              for (var S = 0; S < w; S++) {
                var x = h[S];
                if (x <= 1 && x >= 0) {
                  var b = u ? Rt(l, p, d, m, x) : Rt(s, c, g, y, x);
                  return u ? [e, b] : [b, e];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(ht)
), fA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(F0)
), cA = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new fA();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && bi(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && bi(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = zh(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        zh(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  }(ht)
);
function V0(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = e.get(["lineStyle", "width"]) || 0;
  o -= h / 2, s -= h / 2, l += h, u += h, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var f = new _t({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var v = r.getBaseAxis(), c = v.isHorizontal(), p = v.inverse;
    c ? (p && (f.shape.x += l), f.shape.width = 0) : (p || (f.shape.y += u), f.shape.height = 0);
    var g = q(n) ? function(d) {
      n(d, f);
    } : null;
    ur(f, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, g);
  }
  return f;
}
function H0(r, t, e) {
  var i = r.getArea(), n = Ct(i.r0, 1), a = Ct(i.r, 1), o = new An({
    shape: {
      cx: Ct(r.cx, 1),
      cy: Ct(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, ur(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function vA(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return H0(r, t, e);
    if (r.type === "cartesian2d")
      return V0(r, t, e, i, n);
  } else return null;
  return null;
}
function ml(r, t) {
  return r.type === t;
}
function gd(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function yd(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function md(r, t) {
  var e = yd(r), i = e[0], n = e[1], a = yd(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function _d(r) {
  return gt(r) ? r : r ? 0.5 : 0;
}
function pA(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = ir(i * 2), a = 0; a < i; a++) {
    var o = z0(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function Mr(r, t, e, i, n) {
  var a = e.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], h = [], f = [], v = [];
  if (n) {
    for (l = 0; l < r.length; l += 2) {
      var c = t || r;
      !isNaN(c[l]) && !isNaN(c[l + 1]) && v.push(r[l], r[l + 1]);
    }
    r = v;
  }
  for (l = 0; l < r.length - 2; l += 2)
    switch (f[0] = r[l + 2], f[1] = r[l + 3], h[0] = r[l], h[1] = r[l + 1], s.push(h[0], h[1]), i) {
      case "end":
        u[o] = f[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var p = (h[o] + f[o]) / 2, g = [];
        u[o] = g[o] = p, u[1 - o] = h[1 - o], g[1 - o] = f[1 - o], s.push(u[0], u[1]), s.push(g[0], g[1]);
        break;
      default:
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function dA(r, t) {
  var e = [], i = r.length, n, a;
  function o(h, f, v) {
    var c = h.coord, p = (v - c) / (f.coord - c), g = yb(p, [h.color, f.color]);
    return {
      coord: v,
      color: g
    };
  }
  for (var s = 0; s < i; s++) {
    var l = r[s], u = l.coord;
    if (u < 0)
      n = l;
    else if (u > t) {
      a ? e.push(o(a, l, t)) : n && e.push(o(n, l, 0), o(n, l, t));
      break;
    } else
      n && (e.push(o(n, l, 0)), n = null), e.push(l), a = l;
  }
  return e;
}
function gA(r, t, e) {
  var i = r.getVisual("visualMeta");
  if (!(!i || !i.length || !r.count()) && t.type === "cartesian2d") {
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = r.getDimensionInfo(i[o].dimension);
      if (n = s && s.coordDim, n === "x" || n === "y") {
        a = i[o];
        break;
      }
    }
    if (a) {
      var l = t.getAxis(n), u = U(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), h = u.length, f = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), f.reverse());
      var v = dA(u, n === "x" ? e.getWidth() : e.getHeight()), c = v.length;
      if (!c && h)
        return u[0].coord < 0 ? f[1] ? f[1] : u[h - 1].color : f[0] ? f[0] : u[0].color;
      var p = 10, g = v[0].coord - p, d = v[c - 1].coord + p, y = d - g;
      if (y < 1e-3)
        return "transparent";
      C(v, function(_) {
        _.offset = (_.coord - g) / y;
      }), v.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: c ? v[c - 1].offset : 0.5,
        color: f[1] || "transparent"
      }), v.unshift({
        offset: c ? v[0].offset : 0.5,
        color: f[0] || "transparent"
      });
      var m = new kf(0, 0, 0, 0, v, !0);
      return m[n] = g, m[n + "2"] = d, m;
    }
  }
}
function yA(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && mA(a, t))) {
      var o = t.mapDimension(a.dim), s = {};
      return C(a.getViewLabels(), function(l) {
        var u = a.scale.getRawOrdinalNumber(l.tickValue);
        s[u] = 1;
      }), function(l) {
        return !s.hasOwnProperty(t.get(o, l));
      };
    }
  }
}
function mA(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (uc.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function _A(r, t) {
  return isNaN(r) || isNaN(t);
}
function bA(r) {
  for (var t = r.length / 2; t > 0 && _A(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function bd(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function SA(r, t, e) {
  for (var i = r.length / 2, n = e === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < i; u++)
    if (o = r[u * 2 + n], !(isNaN(o) || isNaN(r[u * 2 + 1 - n]))) {
      if (u === 0) {
        a = o;
        continue;
      }
      if (a <= t && o >= t || a >= t && o <= t) {
        l = u;
        break;
      }
      s = u, a = o;
    }
  return {
    range: [s, l],
    t: (t - a) / (o - a)
  };
}
function G0(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < We.length; t++)
    if (r.get([We[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function Ru(r, t, e, i) {
  if (ml(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = G0(i) ? function(c, p) {
      r._endLabelOnDuring(c, p, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = V0(t, e, i, function() {
      var c = r._endLabel;
      c && e && s.originalX != null && c.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!i.get("clip", !0)) {
      var f = h.shape, v = Math.max(f.width, f.height);
      u ? (f.y -= v, f.height += v * 2) : (f.x -= v, f.width += v * 2);
    }
    return l && l(1, h), h;
  } else
    return H0(t, e, i);
}
function wA(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var xA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new Tt(), i = new oA();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = j(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), h = s.getLayout("points") || [], f = a.type === "polar", v = this._coordSys, c = this._symbolDraw, p = this._polyline, g = this._polygon, d = this._lineGroup, y = !i.ssr && e.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = $0(a, s, _), w = m && pA(a, s, b), S = e.get("showSymbol"), x = e.get("connectNulls"), M = S && !f && yA(e, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(bt, be) {
        bt.__temp && (o.remove(bt), D.setItemGraphicEl(be, null));
      }), S || c.remove(), o.add(d);
      var A = f ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var I = gA(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(p && v.type === a.type && A === this._step))
        S && c.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(bt) {
            return [h[bt * 2], h[bt * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (w && (w = Mr(w, h, a, A, x)), h = Mr(h, null, a, A, x)), p = this._newPolyline(h), m ? g = this._newPolygon(h, w) : g && (d.remove(g), g = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, Mi(I)), d.setClipPath(Ru(this, a, !0, e));
      else {
        m && !g ? g = this._newPolygon(h, w) : g && !m && (d.remove(g), g = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, Mi(I));
        var L = d.getClipPath();
        if (L) {
          var P = Ru(this, a, !1, e);
          ur(L, {
            shape: P.shape
          }, e);
        } else
          d.setClipPath(Ru(this, a, !0, e));
        S && c.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(bt) {
            return [h[bt * 2], h[bt * 2 + 1]];
          }
        }), (!gd(this._stackedOnPoints, w) || !gd(this._points, h)) && (y ? this._doUpdateAnimation(s, w, a, n, A, _, x) : (A && (w && (w = Mr(w, h, a, A, x)), h = Mr(h, null, a, A, x)), p.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: w
        })));
      }
      var R = e.getModel("emphasis"), O = R.get("focus"), G = R.get("blurScope"), k = R.get("disabled");
      if (p.useStyle(ot(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: I,
          lineJoin: "bevel"
        }
      )), gh(p, e, "lineStyle"), p.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var z = p.getState("emphasis").style;
        z.lineWidth = +p.style.lineWidth + 1;
      }
      it(p).seriesIndex = e.seriesIndex, Pa(p, O, G, k);
      var W = _d(e.get("smooth")), K = e.get("smoothMonotone");
      if (p.setShape({
        smooth: W,
        smoothMonotone: K,
        connectNulls: x
      }), g) {
        var tt = s.getCalculationInfo("stackedOnSeries"), ft = 0;
        g.useStyle(ot(u.getAreaStyle(), {
          fill: I,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), tt && (ft = _d(tt.get("smooth"))), g.setShape({
          smooth: W,
          stackedOnSmooth: ft,
          smoothMonotone: K,
          connectNulls: x
        }), gh(g, e, "areaStyle"), it(g).seriesIndex = e.seriesIndex, Pa(g, O, G, k);
      }
      var yt = this._changePolyState;
      s.eachItemGraphicEl(function(bt) {
        bt && (bt.onHoverStateChange = yt);
      }), this._polyline.onHoverStateChange = yt, this._data = s, this._coordSys = a, this._stackedOnPoints = w, this._points = h, this._step = A, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, p), g && this.packEventData(e, g));
    }, t.prototype.packEventData = function(e, i) {
      it(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(e, i, n, a) {
      var o = e.getData(), s = Ti(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], f = l[s * 2 + 1];
          if (isNaN(h) || isNaN(f) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, f))
            return;
          var v = e.get("zlevel") || 0, c = e.get("z") || 0;
          u = new uc(o, s), u.x = h, u.y = f, u.setZ(v, c);
          var p = u.getSymbolPath().getTextContent();
          p && (p.zlevel = v, p.z = c, p.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        ye.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = Ti(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        ye.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      Pv(this._polyline, e), i && Pv(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new hA({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new cA({
        shape: {
          points: e,
          stackedOnPoints: i
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function(e, i, n) {
      var a, o, s = i.getBaseAxis(), l = s.inverse;
      i.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : i.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = e.hostModel, h = u.get("animationDuration");
      q(h) && (h = h(null));
      var f = u.get("animationDelay") || 0, v = q(f) ? f(null) : f;
      e.eachItemGraphicEl(function(c, p) {
        var g = c;
        if (g) {
          var d = [c.x, c.y], y = void 0, m = void 0, _ = void 0;
          if (n)
            if (o) {
              var b = n, w = i.pointToCoord(d);
              a ? (y = b.startAngle, m = b.endAngle, _ = -w[1] / 180 * Math.PI) : (y = b.r0, m = b.r, _ = w[0]);
            } else {
              var S = n;
              a ? (y = S.x, m = S.x + S.width, _ = c.x) : (y = S.y + S.height, m = S.y, _ = c.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var M = q(f) ? f(p) : h * x + v, D = g.getSymbolPath(), A = D.getTextContent();
          g.attr({
            scaleX: 0,
            scaleY: 0
          }), g.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: M
          }), A && A.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: M
          }), D.disableLabelAnimation = !0;
        }
      });
    }, t.prototype._initOrUpdateEndLabel = function(e, i, n) {
      var a = e.getModel("endLabel");
      if (G0(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new Dt({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = bA(l);
        h >= 0 && (Qa(s, mn(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: h,
          defaultText: function(f, v, c) {
            return c != null ? N0(o, c) : lc(o, f);
          },
          enableTextSetter: !0
        }, wA(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var f = n.getLayout("points"), v = n.hostModel, c = v.get("connectNulls"), p = s.get("precision"), g = s.get("distance") || 0, d = l.getBaseAxis(), y = d.isHorizontal(), m = d.inverse, _ = i.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, w = (y ? g : 0) * (m ? -1 : 1), S = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", M = SA(f, b, x), D = M.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !c) {
            var I = bd(f, D[0]);
            u.attr({
              x: I[0] + w,
              y: I[1] + S
            }), o && (T = v.getRawValue(D[0]));
          } else {
            var I = h.getPointOn(b, x);
            I && u.attr({
              x: I[0] + w,
              y: I[1] + S
            });
            var L = v.getRawValue(D[0]), P = v.getRawValue(D[1]);
            o && (T = pS(n, p, L, P, M.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = e === 1 || a.lastFrameIndex > 0 ? D[0] : 0, I = bd(f, R);
          o && (T = v.getRawValue(R)), u.attr({
            x: I[0] + w,
            y: I[1] + S
          });
        }
        if (o) {
          var O = el(u);
          typeof O.setLabelText == "function" && O.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, h = this._polygon, f = e.hostModel, v = uA(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), c = v.current, p = v.stackedOnCurrent, g = v.next, d = v.stackedOnNext;
      if (o && (p = Mr(v.stackedOnCurrent, v.current, n, o, l), c = Mr(v.current, null, n, o, l), d = Mr(v.stackedOnNext, v.next, n, o, l), g = Mr(v.next, null, n, o, l)), md(c, g) > 3e3 || h && md(p, d) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: g
        }), h && (h.stopAnimation(), h.setShape({
          points: g,
          stackedOnPoints: d
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = c;
      var y = {
        shape: {
          points: g
        }
      };
      v.current !== c && (y.shape.__points = v.next), u.stopAnimation(), ie(u, y, f), h && (h.setShape({
        // Reuse the points with polyline.
        points: c,
        stackedOnPoints: p
      }), h.stopAnimation(), ie(h, {
        shape: {
          stackedOnPoints: d
        }
      }, f), u.shape.points !== h.shape.points && (h.shape.points = u.shape.points));
      for (var m = [], _ = v.status, b = 0; b < _.length; b++) {
        var w = _[b].cmd;
        if (w === "=") {
          var S = e.getItemGraphicEl(_[b].idx1);
          S && m.push({
            el: S,
            ptIdx: b
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        h && h.dirtyShape();
        for (var x = u.shape.__points, M = 0; M < m.length; M++) {
          var D = m[M].el, A = m[M].ptIdx * 2;
          D.x = x[A], D.y = x[A + 1], D.markRedraw();
        }
      });
    }, t.prototype.remove = function(e) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(ye)
);
function TA(r, t) {
  return {
    seriesType: r,
    plan: Kf(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = U(n.dimensions, function(f) {
          return i.mapDimension(f);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        wn(i, a[0]) && (a[0] = s), wn(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), h = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(f, v) {
            for (var c = f.end - f.start, p = ir(c * o), g = [], d = [], y = f.start, m = 0; y < f.end; y++) {
              var _ = void 0;
              if (o === 1) {
                var b = l.get(u, y);
                _ = n.dataToPoint(b, null, d);
              } else
                g[0] = l.get(u, y), g[1] = l.get(h, y), _ = n.dataToPoint(g, null, d);
              p[m++] = _[0], p[m++] = _[1];
            }
            v.setLayout("points", p);
          }
        };
      }
    }
  };
}
var CA = {
  average: function(r) {
    for (var t = 0, e = 0, i = 0; i < r.length; i++)
      isNaN(r[i]) || (t += r[i], e++);
    return e === 0 ? NaN : t / e;
  },
  sum: function(r) {
    for (var t = 0, e = 0; e < r.length; e++)
      t += r[e] || 0;
    return t;
  },
  max: function(r) {
    for (var t = -1 / 0, e = 0; e < r.length; e++)
      r[e] > t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  min: function(r) {
    for (var t = 1 / 0, e = 0; e < r.length; e++)
      r[e] < t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  // TODO
  // Median
  nearest: function(r) {
    return r[0];
  }
}, MA = function(r) {
  return Math.round(r.length / 2);
};
function W0(r) {
  return {
    seriesType: r,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, e, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), h = l.getExtent(), f = i.getDevicePixelRatio(), v = Math.abs(h[1] - h[0]) * (f || 1), c = Math.round(s / v);
        if (isFinite(c) && c > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / c)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / c));
          var p = void 0;
          V(a) ? p = CA[a] : q(a) && (p = a), p && t.setData(n.downSample(n.mapDimension(u.dim), 1 / c, p, MA));
        }
      }
    }
  };
}
function DA(r) {
  r.registerChartView(xA), r.registerSeriesModel(nA), r.registerLayout(TA("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, W0("line"));
}
var Fh = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return pl(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          C(a.getAxes(), function(v, c) {
            if (v.type === "category" && i != null) {
              var p = v.getTicksCoords(), g = v.getTickModel().get("alignWithLabel"), d = o[c], y = i[c] === "x1" || i[c] === "y1";
              if (y && !g && (d += 1), p.length < 2)
                return;
              if (p.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[y ? 1 : 0]);
                return;
              }
              for (var m = void 0, _ = void 0, b = 1, w = 0; w < p.length; w++) {
                var S = p[w].coord, x = w === p.length - 1 ? p[w - 1].tickValue + b : p[w].tickValue;
                if (x === d) {
                  _ = S;
                  break;
                } else if (x < d)
                  m = S;
                else if (m != null && x > d) {
                  _ = (S + m) / 2;
                  break;
                }
                w === 1 && (b = x - p[0].tickValue);
              }
              _ == null && (m ? m && (_ = p[p.length - 1].coord) : _ = p[0].coord), s[c] = v.toGlobalCoord(_);
            }
          });
        else {
          var l = this.getData(), u = l.getLayout("offset"), h = l.getLayout("size"), f = a.getBaseAxis().isHorizontal() ? 0 : 1;
          s[f] += u + h / 2;
        }
        return s;
      }
      return [NaN, NaN];
    }, t.type = "series.__base_bar__", t.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      // stack: null
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      barMinHeight: 0,
      barMinAngle: 0,
      // cursor: null,
      large: !1,
      largeThreshold: 400,
      progressive: 3e3,
      progressiveChunkMode: "mod"
    }, t;
  }(Ie)
);
Ie.registerClass(Fh);
var AA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return pl(null, this, {
        useEncodeDefaulter: !0,
        createInvertedIndices: !!this.get("realtimeSort", !0) || null
      });
    }, t.prototype.getProgressive = function() {
      return this.get("large") ? this.get("progressive") : !1;
    }, t.prototype.getProgressiveThreshold = function() {
      var e = this.get("progressiveThreshold"), i = this.get("largeThreshold");
      return i > e && (e = i), e;
    }, t.prototype.brushSelector = function(e, i, n) {
      return n.rect(i.getItemLayout(e));
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = il(Fh.defaultOption, {
      // If clipped
      // Only available on cartesian2d
      clip: !0,
      roundCap: !1,
      showBackground: !1,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderColor: null,
        borderWidth: 0,
        borderType: "solid",
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      realtimeSort: !1
    }), t;
  }(Fh)
), IA = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  }()
), Sd = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new IA();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, h = i.startAngle, f = i.endAngle, v = i.clockwise, c = Math.PI * 2, p = v ? f - h < c : h - f < c;
      p || (h = f - (v ? c : -c));
      var g = Math.cos(h), d = Math.sin(h), y = Math.cos(f), m = Math.sin(f);
      p ? (e.moveTo(g * o + n, d * o + a), e.arc(g * u + n, d * u + a, l, -Math.PI + h, h, !v)) : e.moveTo(g * s + n, d * s + a), e.arc(n, a, s, h, f, !v), e.arc(y * u + n, m * u + a, l, f - Math.PI * 2, f - Math.PI, !v), o !== 0 && e.arc(n, a, o, f, h, v);
    }, t;
  }(ht)
);
function LA(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return ys(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, h = u.cx, f = u.cy, v = u.r, c = u.r0, p = (v + c) / 2, g = u.startAngle, d = u.endAngle, y = (g + d) / 2, m = e ? Math.abs(v - c) / 2 : 0, _ = Math.cos, b = Math.sin, w = h + v * _(g), S = f + v * b(g), x = "left", M = "top";
    switch (s) {
      case "startArc":
        w = h + (c - l) * _(y), S = f + (c - l) * b(y), x = "center", M = "top";
        break;
      case "insideStartArc":
        w = h + (c + l) * _(y), S = f + (c + l) * b(y), x = "center", M = "bottom";
        break;
      case "startAngle":
        w = h + p * _(g) + ko(g, l + m, !1), S = f + p * b(g) + Bo(g, l + m, !1), x = "right", M = "middle";
        break;
      case "insideStartAngle":
        w = h + p * _(g) + ko(g, -l + m, !1), S = f + p * b(g) + Bo(g, -l + m, !1), x = "left", M = "middle";
        break;
      case "middle":
        w = h + p * _(y), S = f + p * b(y), x = "center", M = "middle";
        break;
      case "endArc":
        w = h + (v + l) * _(y), S = f + (v + l) * b(y), x = "center", M = "bottom";
        break;
      case "insideEndArc":
        w = h + (v - l) * _(y), S = f + (v - l) * b(y), x = "center", M = "top";
        break;
      case "endAngle":
        w = h + p * _(d) + ko(d, l + m, !0), S = f + p * b(d) + Bo(d, l + m, !0), x = "left", M = "middle";
        break;
      case "insideEndAngle":
        w = h + p * _(d) + ko(d, -l + m, !0), S = f + p * b(d) + Bo(d, -l + m, !0), x = "right", M = "middle";
        break;
      default:
        return ys(i, n, a);
    }
    return i = i || {}, i.x = w, i.y = S, i.align = x, i.verticalAlign = M, i;
  };
}
function PA(r, t, e, i) {
  if (gt(i)) {
    r.setTextConfig({
      rotation: i
    });
    return;
  } else if ($(t)) {
    r.setTextConfig({
      rotation: 0
    });
    return;
  }
  var n = r.shape, a = n.clockwise ? n.startAngle : n.endAngle, o = n.clockwise ? n.endAngle : n.startAngle, s = (a + o) / 2, l, u = e(t);
  switch (u) {
    case "startArc":
    case "insideStartArc":
    case "middle":
    case "insideEndArc":
    case "endArc":
      l = s;
      break;
    case "startAngle":
    case "insideStartAngle":
      l = a;
      break;
    case "endAngle":
    case "insideEndAngle":
      l = o;
      break;
    default:
      r.setTextConfig({
        rotation: 0
      });
      return;
  }
  var h = Math.PI * 1.5 - l;
  u === "middle" && h > Math.PI / 2 && h < Math.PI * 1.5 && (h -= Math.PI), r.setTextConfig({
    rotation: h
  });
}
function ko(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function Bo(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function RA(r, t, e) {
  var i = r.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  $(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: U(i, function(a) {
      return Ge(a, n);
    })
  };
}
var Eu = Math.max, Ou = Math.min;
function EA(r, t) {
  var e = r.getArea && r.getArea();
  if (ml(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var OA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r.call(this) || this;
      return e.type = t.type, e._isFirstFrame = !0, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this._model = e, this._removeOnRenderedListener(n), this._updateDrawMode(e);
      var o = e.get("coordinateSystem");
      (o === "cartesian2d" || o === "polar") && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(e, i, n) : this._renderNormal(e, i, n, a));
    }, t.prototype.incrementalPrepareRender = function(e) {
      this._clear(), this._updateDrawMode(e), this._updateLargeClip(e);
    }, t.prototype.incrementalRender = function(e, i) {
      this._progressiveEls = [], this._incrementalRenderLarge(e, i);
    }, t.prototype.eachRendered = function(e) {
      Ka(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, h = u.getBaseAxis(), f;
      u.type === "cartesian2d" ? f = h.isHorizontal() : u.type === "polar" && (f = h.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, c = kA(e, u);
      c && this._enableRealtimeSort(c, s, n);
      var p = e.get("clip", !0) || c, g = EA(u, s);
      o.removeClipPath();
      var d = e.get("roundCap", !0), y = e.get("showBackground", !0), m = e.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], w = this._backgroundEls, S = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function M(T) {
        var I = No[u.type](s, T), L = HA(u, f, I);
        return L.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? L.setShape("r", _) : L.setShape("cornerRadius", _), b[T] = L, L;
      }
      s.diff(l).add(function(T) {
        var I = s.getItemModel(T), L = No[u.type](s, T, I);
        if (y && M(T), !(!s.hasValue(T) || !Md[u.type](L))) {
          var P = !1;
          p && (P = wd[u.type](g, L));
          var R = xd[u.type](e, s, T, L, f, v, h.model, !1, d);
          c && (R.forceLabelAnimation = !0), Dd(R, s, T, I, L, e, f, u.type === "polar"), S ? R.attr({
            shape: L
          }) : c ? Td(c, v, R, L, T, f, !1, !1) : ur(R, {
            shape: L
          }, e, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = P;
        }
      }).update(function(T, I) {
        var L = s.getItemModel(T), P = No[u.type](s, T, L);
        if (y) {
          var R = void 0;
          w.length === 0 ? R = M(I) : (R = w[I], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), b[T] = R);
          var O = No[u.type](s, T), G = Y0(f, O, u);
          ie(R, {
            shape: G
          }, v, T);
        }
        var k = l.getItemGraphicEl(I);
        if (!s.hasValue(T) || !Md[u.type](P)) {
          o.remove(k);
          return;
        }
        var z = !1;
        if (p && (z = wd[u.type](g, P), z && o.remove(k)), k ? Fy(k) : k = xd[u.type](e, s, T, P, f, v, h.model, !!k, d), c && (k.forceLabelAnimation = !0), x) {
          var W = k.getTextContent();
          if (W) {
            var K = el(W);
            K.prevValue != null && (K.prevValue = K.value);
          }
        } else
          Dd(k, s, T, L, P, e, f, u.type === "polar");
        S ? k.attr({
          shape: P
        }) : c ? Td(c, v, k, P, T, f, !0, x) : ie(k, {
          shape: P
        }, e, T, null), s.setItemGraphicEl(T, k), k.ignore = z, o.add(k);
      }).remove(function(T) {
        var I = l.getItemGraphicEl(T);
        I && bh(I, e, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new Tt());
      D.removeAll();
      for (var A = 0; A < b.length; ++A)
        D.add(b[A]);
      o.add(D), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Id(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Id(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && vA(e.coordinateSystem, !1, e), n = this.group;
      i ? n.setClipPath(i) : n.removeClipPath();
    }, t.prototype._enableRealtimeSort = function(e, i, n) {
      var a = this;
      if (i.count()) {
        var o = e.baseAxis;
        if (this._isFirstFrame)
          this._dispatchInitSort(i, e, n), this._isFirstFrame = !1;
        else {
          var s = function(l) {
            var u = i.getItemGraphicEl(l), h = u && u.shape;
            return h && // The result should be consistent with the initial sort by data value.
            // Do not support the case that both positive and negative exist.
            Math.abs(o.isHorizontal() ? h.height : h.width) || 0;
          };
          this._onRendered = function() {
            a._updateSortWithinSameData(i, s, o, n);
          }, n.getZr().on("rendered", this._onRendered);
        }
      }
    }, t.prototype._dataSort = function(e, i, n) {
      var a = [];
      return e.each(e.mapDimension(i.dim), function(o, s) {
        var l = n(s);
        l = l ?? NaN, a.push({
          dataIndex: s,
          mappedValue: l,
          ordinalNumber: o
        });
      }), a.sort(function(o, s) {
        return s.mappedValue - o.mappedValue;
      }), {
        ordinalNumbers: U(a, function(o) {
          return o.ordinalNumber;
        })
      };
    }, t.prototype._isOrderChangedWithinSameData = function(e, i, n) {
      for (var a = n.scale, o = e.mapDimension(n.dim), s = Number.MAX_VALUE, l = 0, u = a.getOrdinalMeta().categories.length; l < u; ++l) {
        var h = e.rawIndexOf(o, a.getRawOrdinalNumber(l)), f = h < 0 ? Number.MIN_VALUE : i(e.indexOfRawIndex(h));
        if (f > s)
          return !0;
        s = f;
      }
      return !1;
    }, t.prototype._isOrderDifferentInView = function(e, i) {
      for (var n = i.scale, a = n.getExtent(), o = Math.max(0, a[0]), s = Math.min(a[1], n.getOrdinalMeta().categories.length - 1); o <= s; ++o)
        if (e.ordinalNumbers[o] !== n.getRawOrdinalNumber(o))
          return !0;
    }, t.prototype._updateSortWithinSameData = function(e, i, n, a) {
      if (this._isOrderChangedWithinSameData(e, i, n)) {
        var o = this._dataSort(e, n, i);
        this._isOrderDifferentInView(o, n) && (this._removeOnRenderedListener(a), a.dispatchAction({
          type: "changeAxisOrder",
          componentType: n.dim + "Axis",
          axisId: n.index,
          sortInfo: o
        }));
      }
    }, t.prototype._dispatchInitSort = function(e, i, n) {
      var a = i.baseAxis, o = this._dataSort(e, a, function(s) {
        return e.get(e.mapDimension(i.otherAxis.dim), s);
      });
      n.dispatchAction({
        type: "changeAxisOrder",
        componentType: a.dim + "Axis",
        isInitSort: !0,
        axisId: a.index,
        sortInfo: o
      });
    }, t.prototype.remove = function(e, i) {
      this._clear(this._model), this._removeOnRenderedListener(i);
    }, t.prototype.dispose = function(e, i) {
      this._removeOnRenderedListener(i);
    }, t.prototype._removeOnRenderedListener = function(e) {
      this._onRendered && (e.getZr().off("rendered", this._onRendered), this._onRendered = null);
    }, t.prototype._clear = function(e) {
      var i = this.group, n = this._data;
      e && e.isAnimationEnabled() && n && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n.eachItemGraphicEl(function(a) {
        bh(a, e, it(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(ye)
), wd = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = Eu(t.x, r.x), s = Ou(t.x + t.width, n), l = Eu(t.y, r.y), u = Ou(t.y + t.height, a), h = s < o, f = u < l;
    return t.x = h && o > n ? s : o, t.y = f && l > a ? u : l, t.width = h ? 0 : s - o, t.height = f ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), h || f;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = Ou(t.r, r.r), a = Eu(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, xd = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new _t({
      shape: B({}, i),
      z2: 1
    });
    if (u.__dataIndex = e, u.name = "item", a) {
      var h = u.shape, f = n ? "height" : "width";
      h[f] = 0;
    }
    return u;
  },
  polar: function(r, t, e, i, n, a, o, s, l) {
    var u = !n && l ? Sd : An, h = new u({
      shape: i,
      z2: 1
    });
    h.name = "item";
    var f = U0(n);
    if (h.calculateTextPosition = LA(f, {
      isRoundCap: u === Sd
    }), a) {
      var v = h.shape, c = n ? "r" : "endAngle", p = {};
      v[c] = n ? i.r0 : i.startAngle, p[c] = i[c], (s ? ie : ur)(h, {
        shape: p
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function kA(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function Td(r, t, e, i, n, a, o, s) {
  var l, u;
  a ? (u = {
    x: i.x,
    width: i.width
  }, l = {
    y: i.y,
    height: i.height
  }) : (u = {
    y: i.y,
    height: i.height
  }, l = {
    x: i.x,
    width: i.width
  }), s || (o ? ie : ur)(e, {
    shape: l
  }, t, n, null);
  var h = t ? r.baseAxis.model : null;
  (o ? ie : ur)(e, {
    shape: u
  }, h, n);
}
function Cd(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var BA = ["x", "y", "width", "height"], NA = ["cx", "cy", "r", "startAngle", "endAngle"], Md = {
  cartesian2d: function(r) {
    return !Cd(r, BA);
  },
  polar: function(r) {
    return !Cd(r, NA);
  }
}, No = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? zA(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
    return {
      x: i.x + a * n / 2,
      y: i.y + o * n / 2,
      width: i.width - a * n,
      height: i.height - o * n
    };
  },
  polar: function(r, t, e) {
    var i = r.getItemLayout(t);
    return {
      cx: i.cx,
      cy: i.cy,
      r0: i.r0,
      r: i.r,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    };
  }
};
function $A(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function U0(r) {
  return /* @__PURE__ */ function(t) {
    var e = t ? "Arc" : "Angle";
    return function(i) {
      switch (i) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return i + e;
        default:
          return i;
      }
    };
  }(r);
}
function Dd(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = r.shape, f = RA(i.getModel("itemStyle"), h);
      B(h, f), r.setShape(h);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var c = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", p = mn(i);
  Qa(r, p, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: lc(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c
  });
  var g = r.getTextContent();
  if (s && g) {
    var d = i.get(["label", "position"]);
    r.textConfig.inside = d === "middle" ? !0 : null, PA(r, d === "outside" ? c : d, U0(o), i.get(["label", "rotate"]));
  }
  Ax(g, p, a.getRawValue(e), function(m) {
    return N0(t, m);
  });
  var y = i.getModel(["emphasis"]);
  Pa(r, y.get("focus"), y.get("blurScope"), y.get("disabled")), gh(r, i), $A(n) && (r.style.fill = "none", r.style.stroke = "none", C(r.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function zA(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var FA = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
    }
    return r;
  }()
), Ad = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new FA();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < n.length; h += 3)
        l[a] = u, l[o] = n[h + 2], s[a] = n[h + a], s[o] = n[h + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(ht)
);
function Id(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new Ad({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), e && e.push(h);
  }
  var f = new Ad({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  f.baseDimIdx = a, f.largeDataIndices = o, f.barWidth = s, t.add(f), f.useStyle(n.getVisual("style")), f.style.stroke = null, it(f).seriesIndex = r.seriesIndex, r.get("silent") || (f.on("mousedown", Ld), f.on("mousemove", Ld)), e && e.push(f);
}
var Ld = Qf(function(r) {
  var t = this, e = VA(t, r.offsetX, r.offsetY);
  it(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function VA(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, h = 0, f = a.length / 3; h < f; h++) {
    var v = h * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function Y0(r, t, e) {
  if (ml(e, "cartesian2d")) {
    var i = t, n = e.getArea();
    return {
      x: r ? i.x : n.x,
      y: r ? n.y : i.y,
      width: r ? i.width : n.width,
      height: r ? n.height : i.height
    };
  } else {
    var n = e.getArea(), a = t;
    return {
      cx: n.cx,
      cy: n.cy,
      r0: r ? n.r0 : a.r0,
      r: r ? n.r : a.r,
      startAngle: r ? a.startAngle : 0,
      endAngle: r ? a.endAngle : Math.PI * 2
    };
  }
}
function HA(r, t, e) {
  var i = r.type === "polar" ? An : _t;
  return new i({
    shape: Y0(t, e, r),
    silent: !0,
    z2: 0
  });
}
function GA(r) {
  r.registerChartView(OA), r.registerSeriesModel(AA), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, Mt(bD, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, SD("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, W0("bar")), r.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function(t, e) {
    var i = t.componentType || "series";
    e.eachComponent({
      mainType: i,
      query: t
    }, function(n) {
      t.sortInfo && n.axis.setCategorySortInfo(t.sortInfo);
    });
  });
}
var WA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.type = "grid", t.dependencies = ["xAxis", "yAxis"], t.layoutMode = "box", t.defaultOption = {
      show: !1,
      // zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      // If grid size contain label
      containLabel: !1,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }, t;
  }(st)
), Vh = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", Me).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(st)
);
qe(Vh, WD);
var X0 = {
  show: !0,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: !1,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: !1,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: !1,
  tooltip: {
    show: !1
  },
  axisPointer: {},
  axisLine: {
    show: !0,
    onZero: !0,
    onZeroAxisIndex: null,
    lineStyle: {
      color: "#6E7079",
      width: 1,
      type: "solid"
    },
    // The arrow at both ends the the axis.
    symbol: ["none", "none"],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: !0,
    // Whether axisTick is inside the grid or outside the grid.
    inside: !1,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: !0,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: !1,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: !0,
    showMinLine: !0,
    showMaxLine: !0,
    lineStyle: {
      color: ["#E0E6F1"],
      width: 1,
      type: "solid"
    }
  },
  splitArea: {
    show: !1,
    areaStyle: {
      color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
    }
  }
}, UA = rt({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: !0,
  // Set false to faster category collection.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: !1
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: !1,
    interval: "auto"
  },
  axisLabel: {
    interval: "auto"
  }
}, X0), hc = rt({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: !1,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: !1,
    lineStyle: {
      color: "#F4F7FD",
      width: 1
    }
  }
}, X0), YA = rt({
  splitNumber: 6,
  axisLabel: {
    // To eliminate labels that are not nice
    showMinLabel: !1,
    showMaxLabel: !1,
    rich: {
      primary: {
        fontWeight: "bold"
      }
    }
  },
  splitLine: {
    show: !1
  }
}, hc), XA = ot({
  logBase: 10
}, hc);
const qA = {
  category: UA,
  value: hc,
  time: YA,
  log: XA
};
var ZA = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Pd(r, t, e, i) {
  C(ZA, function(n, a) {
    var o = rt(rt({}, qA[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        N(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, f) {
          var v = Oa(this), c = v ? ul(h) : {}, p = f.getTheme();
          rt(h, p.get(a + "Axis")), rt(h, this.getDefaultOption()), h.type = Rd(h), v && bn(h, c, v);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = Nh.createByAxisModel(this));
        }, u.prototype.getCategories = function(h) {
          var f = this.option;
          if (f.type === "category")
            return h ? f.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      }(e)
    );
    r.registerComponentModel(s);
  }), r.registerSubTypeDefaulter(t + "Axis", Rd);
}
function Rd(r) {
  return r.type || (r.data ? "category" : "value");
}
var KA = (
  /** @class */
  function() {
    function r(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return r.prototype.getAxis = function(t) {
      return this._axes[t];
    }, r.prototype.getAxes = function() {
      return U(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, r.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), Pt(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  }()
), Hh = ["x", "y"];
function Ed(r) {
  return r.type === "interval" || r.type === "time";
}
var QA = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = Hh, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Ed(e) || !Ed(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, f = (s[1] - o[1]) / u, v = o[0] - n[0] * h, c = o[1] - a[0] * f, p = this._transform = [h, 0, 0, f, v, c];
          this._invTransform = yf([], p);
        }
      }
    }, t.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function(e) {
      var i = this.getAxis("x"), n = this.getAxis("y");
      return i.contain(i.toLocalCoord(e[0])) && n.contain(n.toLocalCoord(e[1]));
    }, t.prototype.containData = function(e) {
      return this.getAxis("x").containData(e[0]) && this.getAxis("y").containData(e[1]);
    }, t.prototype.containZone = function(e, i) {
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new at(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return de(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return de(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new at(a, o, s, l);
    }, t;
  }(KA)
), jA = (
  /** @class */
  function(r) {
    N(t, r);
    function t(e, i, n, a, o) {
      var s = r.call(this, e, i, n) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return t.prototype.isHorizontal = function() {
      var e = this.position;
      return e === "top" || e === "bottom";
    }, t.prototype.getGlobalExtent = function(e) {
      var i = this.getExtent();
      return i[0] = this.toGlobalCoord(i[0]), i[1] = this.toGlobalCoord(i[1]), e && i[0] > i[1] && i.reverse(), i;
    }, t.prototype.pointToData = function(e, i) {
      return this.coordToData(this.toLocalCoord(e[this.dim === "x" ? 0 : 1]), i);
    }, t.prototype.setCategorySortInfo = function(e) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = e, this.scale.setSortInfo(e);
    }, t;
  }(tA)
);
function Gh(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, h = i.getRect(), f = [h.x, h.x + h.width, h.y, h.y + h.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = t.get("offset") || 0, p = u === "x" ? [f[2] - c, f[3] + c] : [f[0] - c, f[1] + c];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    p[v.onZero] = Math.max(Math.min(g, p[1]), p[0]);
  }
  a.position = [u === "y" ? p[v[l]] : f[0], u === "x" ? p[v[l]] : f[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var d = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = d[s], a.labelOffset = o ? p[v[s]] - p[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), yn(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function Od(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function kd(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return C(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, Me).models[0];
    t[i] = a;
  }), t;
}
var ku = Math.log;
function JA(r, t, e) {
  var i = Pn.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = A0(r, t), u = l.extent, h = l.fixMin, f = l.fixMax;
  if (r.type === "log") {
    var v = ku(r.base);
    u = [ku(u[0]) / v, ku(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: f
  });
  var c = i.getExtent.call(r);
  h && (u[0] = c[0]), f && (u[1] = c[1]);
  var p = i.getInterval.call(r), g = u[0], d = u[1];
  if (h && f)
    p = (d - g) / o;
  else if (h)
    for (d = u[0] + p * o; d < u[1] && isFinite(d) && isFinite(u[1]); )
      p = Lu(p), d = u[0] + p * o;
  else if (f)
    for (g = u[1] - p * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      p = Lu(p), g = u[1] - p * o;
  else {
    var y = r.getTicks().length - 1;
    y > o && (p = Lu(p));
    var m = p * o;
    d = Math.ceil(u[1] / p) * p, g = Ct(d - m), g < 0 && u[0] >= 0 ? (g = 0, d = Ct(m)) : d > 0 && u[1] <= 0 && (d = 0, g = -Ct(m));
  }
  var _ = (n[0].value - a[0].value) / s, b = (n[o].value - a[o].value) / s;
  i.setExtent.call(r, g + p * _, d + p * b), i.setInterval.call(r, p), (_ || b) && i.setNiceExtent.call(r, g + p, d - p);
}
var t2 = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = Hh, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = dt(o), u = l.length;
        if (u) {
          for (var h = [], f = u - 1; f >= 0; f--) {
            var v = +l[f], c = o[v], p = c.model, g = c.scale;
            // Only value and log axis without interval support alignTicks.
            $h(g) && p.get("alignTicks") && p.get("interval") == null ? h.push(c) : (hd(g, p), $h(g) && (s = c));
          }
          h.length && (s || (s = h.pop(), hd(s.scale, s.model)), C(h, function(d) {
            JA(d.scale, d.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      C(i.x, function(o) {
        Bd(i, "y", o, a);
      }), C(i.y, function(o) {
        Bd(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = _n(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (C(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = VD(u);
          if (h) {
            var f = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[f] -= h[f] + v, u.position === "top" ? o.y += h.height + v : u.position === "left" && (o.x += h.width + v);
          }
        }
      }), l()), C(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        C(s, function(u) {
          var h = u.isHorizontal(), f = h ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(f[v], f[1 - v]), e2(u, h ? o.x : o.y);
        });
      }
    }, r.prototype.getAxis = function(t, e) {
      var i = this._axesMap[t];
      if (i != null)
        return i[e || 0];
    }, r.prototype.getAxes = function() {
      return this._axesList.slice();
    }, r.prototype.getCartesian = function(t, e) {
      if (t != null && e != null) {
        var i = "x" + t + "y" + e;
        return this._coordsMap[i];
      }
      H(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
      for (var n = 0, a = this._coordsList; n < a.length; n++)
        if (a[n].getAxis("x").index === t || a[n].getAxis("y").index === e)
          return a[n];
    }, r.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, r.prototype.convertToPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null;
    }, r.prototype.convertFromPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null;
    }, r.prototype._findConvertTarget = function(t) {
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", Me).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", Me).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, ct(o, s) < 0 && (s = null);
      else if (i && n)
        s = this.getCartesian(i.componentIndex, n.componentIndex);
      else if (i)
        l = this.getAxis("x", i.componentIndex);
      else if (n)
        l = this.getAxis("y", n.componentIndex);
      else if (a) {
        var u = a.coordinateSystem;
        u === this && (s = this._coordsList[0]);
      }
      return {
        cartesian: s,
        axis: l
      };
    }, r.prototype.containPoint = function(t) {
      var e = this._coordsList[0];
      if (e)
        return e.containPoint(t);
    }, r.prototype._initCartesian = function(t, e, i) {
      var n = this, a = this, o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      }, s = {
        x: {},
        y: {}
      }, l = {
        x: 0,
        y: 0
      };
      if (e.eachComponent("xAxis", u("x"), this), e.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
        this._axesMap = {}, this._axesList = [];
        return;
      }
      this._axesMap = s, C(s.x, function(h, f) {
        C(s.y, function(v, c) {
          var p = "x" + f + "y" + c, g = new QA(p);
          g.master = n, g.model = t, n._coordsMap[p] = g, n._coordsList.push(g), g.addAxis(h), g.addAxis(v);
        });
      });
      function u(h) {
        return function(f, v) {
          if (Bu(f, t)) {
            var c = f.get("position");
            h === "x" ? c !== "top" && c !== "bottom" && (c = o.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = o.left ? "right" : "left"), o[c] = !0;
            var p = new jA(h, zD(f), [0, 0], f.get("type"), c), g = p.type === "category";
            p.onBand = g && f.get("boundaryGap"), p.inverse = f.get("inverse"), f.axis = p, p.model = f, p.grid = a, p.index = v, a._axesList.push(p), s[h][v] = p, l[h]++;
          }
        };
      }
    }, r.prototype._updateScale = function(t, e) {
      C(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (Od(n)) {
          var a = kd(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Bu(o, e) || !Bu(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), h = l.getAxis("x"), f = l.getAxis("y");
          i(u, h), i(u, f);
        }
      }, this);
      function i(n, a) {
        C(GD(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return C(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        ct(e, a) < 0 && e.push(a), ct(i, o) < 0 && i.push(o);
      }), {
        baseAxes: e,
        otherAxes: i
      };
    }, r.create = function(t, e) {
      var i = [];
      return t.eachComponent("grid", function(n, a) {
        var o = new r(n, t, e);
        o.name = "grid_" + a, o.resize(n, e, !0), n.coordinateSystem = o, i.push(o);
      }), t.eachSeries(function(n) {
        if (Od(n)) {
          var a = kd(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = Hh, r;
  }()
);
function Bu(r, t) {
  return r.getCoordSysModel() === t;
}
function Bd(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    Nd(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && Nd(n[u]) && !i[h(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[h(a)] = !0);
  function h(f) {
    return f.dim + "_" + f.index;
  }
}
function Nd(r) {
  return r && r.type !== "category" && r.type !== "time" && FD(r);
}
function e2(r, t) {
  var e = r.getExtent(), i = e[0] + e[1];
  r.toGlobalCoord = r.dim === "x" ? function(n) {
    return n + t;
  } : function(n) {
    return i - n + t;
  }, r.toLocalCoord = r.dim === "x" ? function(n) {
    return n - t;
  } : function(n) {
    return i - n + t;
  };
}
var Rr = Math.PI, kr = (
  /** @class */
  function() {
    function r(t, e) {
      this.group = new Tt(), this.opt = e, this.axisModel = t, ot(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Tt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!$d[t];
    }, r.prototype.add = function(t) {
      $d[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = ly(e - t), a, o;
      return ms(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : ms(n - Rr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < Rr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
        rotation: n,
        textAlign: a,
        textVerticalAlign: o
      };
    }, r.makeAxisEventDataBase = function(t) {
      var e = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return e[t.mainType + "Index"] = t.componentIndex, e;
    }, r.isLabelSilent = function(t) {
      var e = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }, r;
  }()
), $d = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (de(s, s, o), de(l, l, o));
      var h = B({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), f = new Nr({
        shape: {
          x1: s[0],
          y1: s[1],
          x2: l[0],
          y2: l[1]
        },
        style: h,
        strokeContainThreshold: r.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      Ra(f.shape, f.style.lineWidth), f.anid = "line", e.add(f);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var c = t.get(["axisLine", "symbolSize"]);
        V(v) && (v = [v, v]), (V(c) || gt(c)) && (c = [c, c]);
        var p = Wm(t.get(["axisLine", "symbolOffset"]) || 0, c), g = c[0], d = c[1];
        C([{
          rotate: r.rotation + Math.PI / 2,
          offset: p[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: p[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = hr(v[m], -g / 2, -d / 2, g, d, h.stroke, !0), b = y.r + y.offset, w = u ? l : s;
            _.attr({
              rotation: y.rotate,
              x: w[0] + b * Math.cos(r.rotation),
              y: w[1] - b * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = n2(e, i, t, r), a = o2(e, i, t, r);
    if (i2(t, a, n), a2(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = rA(U(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      iA(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = yn(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, f = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Fd(a) ? r.labelOffset + o * l : 0
      ], v, c = t.get("nameRotate");
      c != null && (c = c * Rr / 180);
      var p;
      Fd(a) ? v = kr.innerTextLayout(
        r.rotation,
        c ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = r2(r.rotation, a, c || 0, u), p = r.axisNameAvailableWidth, p != null && (p = Math.abs(p / Math.sin(v.rotation)), !isFinite(p) && (p = null)));
      var g = s.getFont(), d = t.get("nameTruncate", !0) || {}, y = d.ellipsis, m = yn(r.nameTruncateMaxWidth, d.maxWidth, p), _ = new Dt({
        x: f[0],
        y: f[1],
        rotation: v.rotation,
        silent: kr.isLabelSilent(t),
        style: Ve(s, {
          text: n,
          font: g,
          overflow: "truncate",
          width: m,
          ellipsis: y,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || v.textAlign,
          verticalAlign: s.get("verticalAlign") || v.textVerticalAlign
        }),
        z2: 1
      });
      if (Js({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var b = kr.makeAxisEventDataBase(t);
        b.targetType = "axisName", b.name = n, it(_).eventData = b;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function r2(r, t, e, i) {
  var n = ly(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return ms(n - Rr / 2) ? (o = l ? "bottom" : "top", a = "center") : ms(n - Rr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < Rr * 1.5 && n > Rr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function i2(r, t, e) {
  if (!I0(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], h = e[1], f = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (ae(a), ae(u)) : zd(a, o) && (i ? (ae(o), ae(h)) : (ae(a), ae(u))), n === !1 ? (ae(s), ae(f)) : zd(l, s) && (n ? (ae(l), ae(v)) : (ae(s), ae(f)));
  }
}
function ae(r) {
  r && (r.ignore = !0);
}
function zd(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = df([]);
    return gf(n, n, -r.rotation), e.applyTransform(sn([], n, r.getLocalTransform())), i.applyTransform(sn([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function Fd(r) {
  return r === "middle" || r === "center";
}
function q0(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (de(o, o, t), de(s, s, t));
    var h = new Nr({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: i,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    Ra(h.shape, h.style.lineWidth), h.anid = n + "_" + r[l].tickValue, a.push(h);
  }
  return a;
}
function n2(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), h = q0(u, t.transform, l, ot(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), f = 0; f < h.length; f++)
      r.add(h[f]);
    return h;
  }
}
function a2(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ot(s.getLineStyle(), ot(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var f = q0(o[h], t.transform, l, u, "minorticks_" + h), v = 0; v < f.length; v++)
          r.add(f[v]);
  }
}
function o2(r, t, e, i) {
  var n = e.axis, a = yn(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (yn(i.labelRotate, o.get("rotate")) || 0) * Rr / 180, h = kr.innerTextLayout(i.rotation, u, i.labelDirection), f = e.getCategories && e.getCategories(!0), v = [], c = kr.isLabelSilent(e), p = e.get("triggerEvent");
    return C(l, function(g, d) {
      var y = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (f && f[y]) {
        var w = f[y];
        H(w) && w.textStyle && (b = new St(w.textStyle, o, e.ecModel));
      }
      var S = b.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(y), M = b.getShallow("align", !0) || h.textAlign, D = J(b.getShallow("alignMinLabel", !0), M), A = J(b.getShallow("alignMaxLabel", !0), M), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, I = J(b.getShallow("verticalAlignMinLabel", !0), T), L = J(b.getShallow("verticalAlignMaxLabel", !0), T), P = new Dt({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: h.rotation,
        silent: c,
        z2: 10 + (g.level || 0),
        style: Ve(b, {
          text: m,
          align: d === 0 ? D : d === l.length - 1 ? A : M,
          verticalAlign: d === 0 ? I : d === l.length - 1 ? L : T,
          fill: q(S) ? S(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? y + "" : y,
            d
          ) : S
        })
      });
      if (P.anid = "label_" + y, Js({
        el: P,
        componentModel: e,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return P.isTruncated;
          },
          value: _,
          tickIndex: d
        }
      }), p) {
        var R = kr.makeAxisEventDataBase(e);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = d, n.type === "category" && (R.dataIndex = y), it(P).eventData = R;
      }
      t.add(P), P.updateTransform(), v.push(P), r.add(P), P.decomposeTransform();
    }), v;
  }
}
function s2(r, t) {
  var e = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: !1,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return l2(e, r, t), e.seriesInvolved && h2(e, r), e;
}
function l2(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  C(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = Fa(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var h = s.model, f = h.getModel("tooltip", i);
    if (C(s.getAxes(), Mt(g, !1, null)), s.getTooltipAxes && i && f.get("show")) {
      var v = f.get("trigger") === "axis", c = f.get(["axisPointer", "type"]) === "cross", p = s.getTooltipAxes(f.get(["axisPointer", "axis"]));
      (v || c) && C(p.baseAxes, Mt(g, c ? "cross" : !0, v)), c && C(p.otherAxes, Mt(g, "cross", !1));
    }
    function g(d, y, m) {
      var _ = m.model.getModel("axisPointer", n), b = _.get("show");
      if (!(!b || b === "auto" && !d && !Wh(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = d ? u2(m, f, n, t, d, y) : _;
        var w = _.get("snap"), S = _.get("triggerEmphasis"), x = Fa(m.model), M = y || w || m.type === "category", D = r.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: S,
          involveSeries: M,
          snap: w,
          useHandle: Wh(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, r.seriesInvolved = r.seriesInvolved || M;
        var A = f2(a, m);
        if (A != null) {
          var T = o[A] || (o[A] = {
            axesInfo: {}
          });
          T.axesInfo[x] = D, T.mapper = a[A].mapper, D.linkGroup = T;
        }
      }
    }
  });
}
function u2(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  C(s, function(v) {
    l[v] = X(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var f = l.lineStyle = o.get("crossStyle");
      f && ot(u, f.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new St(l, e, i));
}
function h2(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || C(r.coordSysAxesInfo[Fa(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function f2(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (Nu(a[i + "AxisId"], e.id) || Nu(a[i + "AxisIndex"], e.componentIndex) || Nu(a[i + "AxisName"], e.name))
      return n;
  }
}
function Nu(r, t) {
  return r === "all" || $(r) && ct(r, t) >= 0 || r === t;
}
function c2(r) {
  var t = fc(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = Wh(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function fc(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[Fa(r)];
}
function v2(r) {
  var t = fc(r);
  return t && t.axisPointerModel;
}
function Wh(r) {
  return !!r.get(["handle", "show"]);
}
function Fa(r) {
  return r.type + "||" + r.id;
}
var Vd = {}, Z0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && c2(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
    }, t.prototype.updateAxisPointer = function(e, i, n, a) {
      this._doUpdateAxisPointerClass(e, n, !1);
    }, t.prototype.remove = function(e, i) {
      var n = this._axisPointer;
      n && n.remove(i);
    }, t.prototype.dispose = function(e, i) {
      this._disposeAxisPointer(i), r.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(e, i, n) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = v2(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      Vd[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && Vd[e];
    }, t.type = "axis", t;
  }(Le)
), Uh = At();
function p2(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, f = Uh(r).splitAreaColors, v = Q(), c = 0;
      if (f)
        for (var p = 0; p < u.length; p++) {
          var g = f.get(u[p].tickValue);
          if (g != null) {
            c = (g + (h - 1) * p) % h;
            break;
          }
        }
      var d = n.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = $(s) ? s : [s];
      for (var p = 1; p < u.length; p++) {
        var m = n.toGlobalCoord(u[p].coord), _ = void 0, b = void 0, w = void 0, S = void 0;
        n.isHorizontal() ? (_ = d, b = l.y, w = m - _, S = l.height, d = _ + w) : (_ = l.x, b = d, w = l.width, S = m - b, d = b + S);
        var x = u[p - 1].tickValue;
        x != null && v.set(x, c), t.add(new _t({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: b,
            width: w,
            height: S
          },
          style: ot({
            fill: s[c]
          }, y),
          autoBatch: !0,
          silent: !0
        })), c = (c + 1) % h;
      }
      Uh(r).splitAreaColors = v;
    }
  }
}
function d2(r) {
  Uh(r).splitAreaColors = null;
}
var g2 = ["axisLine", "axisTickLabel", "axisName"], y2 = ["splitArea", "splitLine", "minorSplitLine"], K0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.axisPointerClass = "CartesianAxisPointer", e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new Tt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = Gh(s, e), u = new kr(e, B({
          handleAutoShown: function(f) {
            for (var v = s.coordinateSystem.getCartesians(), c = 0; c < v.length; c++)
              if ($h(v[c].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        C(g2, u.add, u), this._axisGroup.add(u.getGroup()), C(y2, function(f) {
          e.get([f, "show"]) && m2[f](this, this._axisGroup, e, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || Uy(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      d2(this);
    }, t.type = "cartesianAxis", t;
  }(Z0)
), m2 = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = $(s) ? s : [s];
      for (var h = i.coordinateSystem.getRect(), f = n.isHorizontal(), v = 0, c = n.getTicksCoords({
        tickModel: a
      }), p = [], g = [], d = o.getLineStyle(), y = 0; y < c.length; y++) {
        var m = n.toGlobalCoord(c[y].coord);
        if (!(y === 0 && !l || y === c.length - 1 && !u)) {
          var _ = c[y].tickValue;
          f ? (p[0] = m, p[1] = h.y, g[0] = m, g[1] = h.y + h.height) : (p[0] = h.x, p[1] = m, g[0] = h.x + h.width, g[1] = m);
          var b = v++ % s.length, w = new Nr({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: p[0],
              y1: p[1],
              x2: g[0],
              y2: g[1]
            },
            style: ot({
              stroke: s[b]
            }, d),
            silent: !0
          });
          Ra(w.shape, d.lineWidth), t.add(w);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var h = [], f = [], v = o.getLineStyle(), c = 0; c < u.length; c++)
        for (var p = 0; p < u[c].length; p++) {
          var g = n.toGlobalCoord(u[c][p].coord);
          l ? (h[0] = g, h[1] = s.y, f[0] = g, f[1] = s.y + s.height) : (h[0] = s.x, h[1] = g, f[0] = s.x + s.width, f[1] = g);
          var d = new Nr({
            anid: "minor_line_" + u[c][p].tickValue,
            autoBatch: !0,
            shape: {
              x1: h[0],
              y1: h[1],
              x2: f[0],
              y2: f[1]
            },
            style: v,
            silent: !0
          });
          Ra(d.shape, v.lineWidth), t.add(d);
        }
  },
  splitArea: function(r, t, e, i) {
    p2(r, t, e, i);
  }
}, Q0 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  }(K0)
), _2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = Q0.type, e;
    }
    return t.type = "yAxis", t;
  }(K0)
), b2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new _t({
        shape: e.coordinateSystem.getRect(),
        style: ot({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(Le)
), Hd = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function S2(r) {
  r.registerComponentView(b2), r.registerComponentModel(WA), r.registerCoordinateSystem("cartesian2d", t2), Pd(r, "x", Vh, Hd), Pd(r, "y", Vh, Hd), r.registerComponentView(Q0), r.registerComponentView(_2), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var Va = C, w2 = H, Os = -1, $t = (
  /** @class */
  function() {
    function r(t) {
      var e = t.mappingMethod, i = t.type, n = this.option = X(t);
      this.type = i, this.mappingMethod = e, this._normalizeData = C2[e];
      var a = r.visualHandlers[i];
      this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._normalizedToVisual = a._normalizedToVisual[e], e === "piecewise" ? ($u(n), x2(n)) : e === "category" ? n.categories ? T2(n) : $u(n, !0) : (He(e !== "linear" || n.dataExtent), $u(n));
    }
    return r.prototype.mapValueToVisual = function(t) {
      var e = this._normalizeData(t);
      return this._normalizedToVisual(e, t);
    }, r.prototype.getNormalizer = function() {
      return j(this._normalizeData, this);
    }, r.listVisualTypes = function() {
      return dt(r.visualHandlers);
    }, r.isValidType = function(t) {
      return r.visualHandlers.hasOwnProperty(t);
    }, r.eachVisual = function(t, e, i) {
      H(t) ? C(t, e, i) : e.call(i, t);
    }, r.mapVisual = function(t, e, i) {
      var n, a = $(t) ? [] : H(t) ? {} : (n = !0, null);
      return r.eachVisual(t, function(o, s) {
        var l = e.call(i, o, s);
        n ? a = l : a[s] = l;
      }), a;
    }, r.retrieveVisuals = function(t) {
      var e = {}, i;
      return t && Va(r.visualHandlers, function(n, a) {
        t.hasOwnProperty(a) && (e[a] = t[a], i = !0);
      }), i ? e : null;
    }, r.prepareVisualTypes = function(t) {
      if ($(t))
        t = t.slice();
      else if (w2(t)) {
        var e = [];
        Va(t, function(i, n) {
          e.push(n);
        }), t = e;
      } else
        return [];
      return t.sort(function(i, n) {
        return n === "color" && i !== "color" && i.indexOf("color") === 0 ? 1 : -1;
      }), t;
    }, r.dependsOn = function(t, e) {
      return e === "color" ? !!(t && t.indexOf(e) === 0) : t === e;
    }, r.findPieceIndex = function(t, e, i) {
      for (var n, a = 1 / 0, o = 0, s = e.length; o < s; o++) {
        var l = e[o].value;
        if (l != null) {
          if (l === t || V(l) && l === t + "")
            return o;
          i && v(l, o);
        }
      }
      for (var o = 0, s = e.length; o < s; o++) {
        var u = e[o], h = u.interval, f = u.close;
        if (h) {
          if (h[0] === -1 / 0) {
            if (zo(f[1], t, h[1]))
              return o;
          } else if (h[1] === 1 / 0) {
            if (zo(f[0], h[0], t))
              return o;
          } else if (zo(f[0], h[0], t) && zo(f[1], t, h[1]))
            return o;
          i && v(h[0], o), i && v(h[1], o);
        }
      }
      if (i)
        return t === 1 / 0 ? e.length - 1 : t === -1 / 0 ? 0 : n;
      function v(c, p) {
        var g = Math.abs(c - t);
        g < a && (a = g, n = p);
      }
    }, r.visualHandlers = {
      color: {
        applyVisual: jn("color"),
        getColorMapper: function() {
          var t = this.option;
          return j(t.mappingMethod === "category" ? function(e, i) {
            return !i && (e = this._normalizeData(e)), sa.call(this, e);
          } : function(e, i, n) {
            var a = !!n;
            return !i && (e = this._normalizeData(e)), n = El(e, t.parsedVisual, n), a ? n : ar(n, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(t) {
            return ar(El(t, this.option.parsedVisual), "rgba");
          },
          category: sa,
          piecewise: function(t, e) {
            var i = Xh.call(this, e);
            return i == null && (i = ar(El(t, this.option.parsedVisual), "rgba")), i;
          },
          fixed: fi
        }
      },
      colorHue: $o(function(t, e) {
        return Ol(t, e);
      }),
      colorSaturation: $o(function(t, e) {
        return Ol(t, null, e);
      }),
      colorLightness: $o(function(t, e) {
        return Ol(t, null, null, e);
      }),
      colorAlpha: $o(function(t, e) {
        return mb(t, e);
      }),
      decal: {
        applyVisual: jn("decal"),
        _normalizedToVisual: {
          linear: null,
          category: sa,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: jn("opacity"),
        _normalizedToVisual: Yh([0, 1])
      },
      liftZ: {
        applyVisual: jn("liftZ"),
        _normalizedToVisual: {
          linear: fi,
          category: fi,
          piecewise: fi,
          fixed: fi
        }
      },
      symbol: {
        applyVisual: function(t, e, i) {
          var n = this.mapValueToVisual(t);
          i("symbol", n);
        },
        _normalizedToVisual: {
          linear: Gd,
          category: sa,
          piecewise: function(t, e) {
            var i = Xh.call(this, e);
            return i == null && (i = Gd.call(this, t)), i;
          },
          fixed: fi
        }
      },
      symbolSize: {
        applyVisual: jn("symbolSize"),
        _normalizedToVisual: Yh([0, 1])
      }
    }, r;
  }()
);
function x2(r) {
  var t = r.pieceList;
  r.hasSpecialVisual = !1, C(t, function(e, i) {
    e.originIndex = i, e.visual != null && (r.hasSpecialVisual = !0);
  });
}
function T2(r) {
  var t = r.categories, e = r.categoryMap = {}, i = r.visual;
  if (Va(t, function(o, s) {
    e[o] = s;
  }), !$(i)) {
    var n = [];
    H(i) ? Va(i, function(o, s) {
      var l = e[s];
      n[l ?? Os] = o;
    }) : n[Os] = i, i = j0(r, n);
  }
  for (var a = t.length - 1; a >= 0; a--)
    i[a] == null && (delete e[t[a]], t.pop());
}
function $u(r, t) {
  var e = r.visual, i = [];
  H(e) ? Va(e, function(a) {
    i.push(a);
  }) : e != null && i.push(e);
  var n = {
    color: 1,
    symbol: 1
  };
  !t && i.length === 1 && !n.hasOwnProperty(r.type) && (i[1] = i[0]), j0(r, i);
}
function $o(r) {
  return {
    applyVisual: function(t, e, i) {
      var n = this.mapValueToVisual(t);
      i("color", r(e("color"), n));
    },
    _normalizedToVisual: Yh([0, 1])
  };
}
function Gd(r) {
  var t = this.option.visual;
  return t[Math.round(sr(r, [0, 1], [0, t.length - 1], !0))] || {};
}
function jn(r) {
  return function(t, e, i) {
    i(r, this.mapValueToVisual(t));
  };
}
function sa(r) {
  var t = this.option.visual;
  return t[this.option.loop && r !== Os ? r % t.length : r];
}
function fi() {
  return this.option.visual[0];
}
function Yh(r) {
  return {
    linear: function(t) {
      return sr(t, r, this.option.visual, !0);
    },
    category: sa,
    piecewise: function(t, e) {
      var i = Xh.call(this, e);
      return i == null && (i = sr(t, r, this.option.visual, !0)), i;
    },
    fixed: fi
  };
}
function Xh(r) {
  var t = this.option, e = t.pieceList;
  if (t.hasSpecialVisual) {
    var i = $t.findPieceIndex(r, e), n = e[i];
    if (n && n.visual)
      return n.visual[this.type];
  }
}
function j0(r, t) {
  return r.visual = t, r.type === "color" && (r.parsedVisual = U(t, function(e) {
    var i = ge(e);
    return i || [0, 0, 0, 1];
  })), t;
}
var C2 = {
  linear: function(r) {
    return sr(r, this.option.dataExtent, [0, 1], !0);
  },
  piecewise: function(r) {
    var t = this.option.pieceList, e = $t.findPieceIndex(r, t, !0);
    if (e != null)
      return sr(e, [0, t.length - 1], [0, 1], !0);
  },
  category: function(r) {
    var t = this.option.categories ? this.option.categoryMap[r] : r;
    return t ?? Os;
  },
  fixed: Ht
};
function zo(r, t, e) {
  return r ? t <= e : t < e;
}
function M2(r, t, e, i, n, a) {
  r = r || 0;
  var o = e[1] - e[0];
  if (n != null && (n = Yi(n, [0, o])), a != null && (a = Math.max(a, n ?? 0)), i === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = Yi(s, [0, o]), n = a = Yi(s, [n, a]), i = 0;
  }
  t[0] = Yi(t[0], e), t[1] = Yi(t[1], e);
  var l = zu(t, i);
  t[i] += r;
  var u = n || 0, h = e.slice();
  l.sign < 0 ? h[0] += u : h[1] -= u, t[i] = Yi(t[i], h);
  var f;
  return f = zu(t, i), n != null && (f.sign !== l.sign || f.span < n) && (t[1 - i] = t[i] + l.sign * n), f = zu(t, i), a != null && f.span > a && (t[1 - i] = t[i] + f.sign * a), t;
}
function zu(r, t) {
  var e = r[t] - r[1 - t];
  return {
    span: Math.abs(e),
    sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1
  };
}
function Yi(r, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, r));
}
var D2 = 256, A2 = (
  /** @class */
  function() {
    function r() {
      this.blurSize = 30, this.pointSize = 20, this.maxOpacity = 1, this.minOpacity = 0, this._gradientPixels = {
        inRange: null,
        outOfRange: null
      };
      var t = Br.createCanvas();
      this.canvas = t;
    }
    return r.prototype.update = function(t, e, i, n, a, o) {
      var s = this._getBrush(), l = this._getGradient(a, "inRange"), u = this._getGradient(a, "outOfRange"), h = this.pointSize + this.blurSize, f = this.canvas, v = f.getContext("2d"), c = t.length;
      f.width = e, f.height = i;
      for (var p = 0; p < c; ++p) {
        var g = t[p], d = g[0], y = g[1], m = g[2], _ = n(m);
        v.globalAlpha = _, v.drawImage(s, d - h, y - h);
      }
      if (!f.width || !f.height)
        return f;
      for (var b = v.getImageData(0, 0, f.width, f.height), w = b.data, S = 0, x = w.length, M = this.minOpacity, D = this.maxOpacity, A = D - M; S < x; ) {
        var _ = w[S + 3] / 256, T = Math.floor(_ * (D2 - 1)) * 4;
        if (_ > 0) {
          var I = o(_) ? l : u;
          _ > 0 && (_ = _ * A + M), w[S++] = I[T], w[S++] = I[T + 1], w[S++] = I[T + 2], w[S++] = I[T + 3] * _ * 256;
        } else
          S += 4;
      }
      return v.putImageData(b, 0, 0), f;
    }, r.prototype._getBrush = function() {
      var t = this._brushCanvas || (this._brushCanvas = Br.createCanvas()), e = this.pointSize + this.blurSize, i = e * 2;
      t.width = i, t.height = i;
      var n = t.getContext("2d");
      return n.clearRect(0, 0, i, i), n.shadowOffsetX = i, n.shadowBlur = this.blurSize, n.shadowColor = "#000", n.beginPath(), n.arc(-e, e, this.pointSize, 0, Math.PI * 2, !0), n.closePath(), n.fill(), t;
    }, r.prototype._getGradient = function(t, e) {
      for (var i = this._gradientPixels, n = i[e] || (i[e] = new Uint8ClampedArray(256 * 4)), a = [0, 0, 0, 0], o = 0, s = 0; s < 256; s++)
        t[e](s / 255, !0, a), n[o++] = a[0], n[o++] = a[1], n[o++] = a[2], n[o++] = a[3];
      return n;
    }, r;
  }()
);
function I2(r, t, e) {
  var i = r[1] - r[0];
  t = U(t, function(o) {
    return {
      interval: [(o.interval[0] - r[0]) / i, (o.interval[1] - r[0]) / i]
    };
  });
  var n = t.length, a = 0;
  return function(o) {
    var s;
    for (s = a; s < n; s++) {
      var l = t[s].interval;
      if (l[0] <= o && o <= l[1]) {
        a = s;
        break;
      }
    }
    if (s === n)
      for (s = a - 1; s >= 0; s--) {
        var l = t[s].interval;
        if (l[0] <= o && o <= l[1]) {
          a = s;
          break;
        }
      }
    return s >= 0 && s < n && e[s];
  };
}
function L2(r, t) {
  var e = r[1] - r[0];
  return t = [(t[0] - r[0]) / e, (t[1] - r[0]) / e], function(i) {
    return i >= t[0] && i <= t[1];
  };
}
function Wd(r) {
  var t = r.dimensions;
  return t[0] === "lng" && t[1] === "lat";
}
var P2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a;
      i.eachComponent("visualMap", function(s) {
        s.eachTargetSeries(function(l) {
          l === e && (a = s);
        });
      }), this._progressiveEls = null, this.group.removeAll();
      var o = e.coordinateSystem;
      o.type === "cartesian2d" || o.type === "calendar" ? this._renderOnCartesianAndCalendar(e, n, 0, e.getData().count()) : Wd(o) && this._renderOnGeo(o, e, a, n);
    }, t.prototype.incrementalPrepareRender = function(e, i, n) {
      this.group.removeAll();
    }, t.prototype.incrementalRender = function(e, i, n, a) {
      var o = i.coordinateSystem;
      o && (Wd(o) ? this.render(i, n, a) : (this._progressiveEls = [], this._renderOnCartesianAndCalendar(i, a, e.start, e.end, !0)));
    }, t.prototype.eachRendered = function(e) {
      Ka(this._progressiveEls || this.group, e);
    }, t.prototype._renderOnCartesianAndCalendar = function(e, i, n, a, o) {
      var s = e.coordinateSystem, l = ml(s, "cartesian2d"), u, h, f, v;
      if (l) {
        var c = s.getAxis("x"), p = s.getAxis("y");
        u = c.getBandWidth() + 0.5, h = p.getBandWidth() + 0.5, f = c.scale.getExtent(), v = p.scale.getExtent();
      }
      for (var g = this.group, d = e.getData(), y = e.getModel(["emphasis", "itemStyle"]).getItemStyle(), m = e.getModel(["blur", "itemStyle"]).getItemStyle(), _ = e.getModel(["select", "itemStyle"]).getItemStyle(), b = e.get(["itemStyle", "borderRadius"]), w = mn(e), S = e.getModel("emphasis"), x = S.get("focus"), M = S.get("blurScope"), D = S.get("disabled"), A = l ? [d.mapDimension("x"), d.mapDimension("y"), d.mapDimension("value")] : [d.mapDimension("time"), d.mapDimension("value")], T = n; T < a; T++) {
        var I = void 0, L = d.getItemVisual(T, "style");
        if (l) {
          var P = d.get(A[0], T), R = d.get(A[1], T);
          if (isNaN(d.get(A[2], T)) || isNaN(P) || isNaN(R) || P < f[0] || P > f[1] || R < v[0] || R > v[1])
            continue;
          var O = s.dataToPoint([P, R]);
          I = new _t({
            shape: {
              x: O[0] - u / 2,
              y: O[1] - h / 2,
              width: u,
              height: h
            },
            style: L
          });
        } else {
          if (isNaN(d.get(A[1], T)))
            continue;
          I = new _t({
            z2: 1,
            shape: s.dataToRect([d.get(A[0], T)]).contentShape,
            style: L
          });
        }
        if (d.hasItemOption) {
          var G = d.getItemModel(T), k = G.getModel("emphasis");
          y = k.getModel("itemStyle").getItemStyle(), m = G.getModel(["blur", "itemStyle"]).getItemStyle(), _ = G.getModel(["select", "itemStyle"]).getItemStyle(), b = G.get(["itemStyle", "borderRadius"]), x = k.get("focus"), M = k.get("blurScope"), D = k.get("disabled"), w = mn(G);
        }
        I.shape.r = b;
        var z = e.getRawValue(T), W = "-";
        z && z[2] != null && (W = z[2] + ""), Qa(I, w, {
          labelFetcher: e,
          labelDataIndex: T,
          defaultOpacity: L.opacity,
          defaultText: W
        }), I.ensureState("emphasis").style = y, I.ensureState("blur").style = m, I.ensureState("select").style = _, Pa(I, x, M, D), I.incremental = o, o && (I.states.emphasis.hoverLayer = !0), g.add(I), d.setItemGraphicEl(T, I), this._progressiveEls && this._progressiveEls.push(I);
      }
    }, t.prototype._renderOnGeo = function(e, i, n, a) {
      var o = n.targetVisuals.inRange, s = n.targetVisuals.outOfRange, l = i.getData(), u = this._hmLayer || this._hmLayer || new A2();
      u.blurSize = i.get("blurSize"), u.pointSize = i.get("pointSize"), u.minOpacity = i.get("minOpacity"), u.maxOpacity = i.get("maxOpacity");
      var h = e.getViewRect().clone(), f = e.getRoamTransform();
      h.applyTransform(f);
      var v = Math.max(h.x, 0), c = Math.max(h.y, 0), p = Math.min(h.width + h.x, a.getWidth()), g = Math.min(h.height + h.y, a.getHeight()), d = p - v, y = g - c, m = [l.mapDimension("lng"), l.mapDimension("lat"), l.mapDimension("value")], _ = l.mapArray(m, function(x, M, D) {
        var A = e.dataToPoint([x, M]);
        return A[0] -= v, A[1] -= c, A.push(D), A;
      }), b = n.getExtent(), w = n.type === "visualMap.continuous" ? L2(b, n.option.range) : I2(b, n.getPieceList(), n.option.selected);
      u.update(_, d, y, o.color.getNormalizer(), {
        inRange: o.color.getColorMapper(),
        outOfRange: s.color.getColorMapper()
      }, w);
      var S = new Ke({
        style: {
          width: d,
          height: y,
          x: v,
          y: c,
          image: u.canvas
        },
        silent: !0
      });
      this.group.add(S);
    }, t.type = "heatmap", t;
  }(ye)
), R2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return pl(null, this, {
        generateCoord: "value"
      });
    }, t.prototype.preventIncremental = function() {
      var e = hl.get(this.get("coordinateSystem"));
      if (e && e.dimensions)
        return e.dimensions[0] === "lng" && e.dimensions[1] === "lat";
    }, t.type = "series.heatmap", t.dependencies = ["grid", "geo", "calendar"], t.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      // Geo coordinate system
      geoIndex: 0,
      blurSize: 30,
      pointSize: 20,
      maxOpacity: 1,
      minOpacity: 0,
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      }
    }, t;
  }(Ie)
);
function E2(r) {
  r.registerChartView(P2), r.registerSeriesModel(R2);
}
var ci = At(), Ud = X, Fu = j, O2 = (
  /** @class */
  function() {
    function r() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return r.prototype.render = function(t, e, i, n) {
      var a = e.get("value"), o = e.get("status");
      if (this._axisModel = t, this._axisPointerModel = e, this._api = i, !(!n && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, e, i);
        var h = u.graphicKey;
        h !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = h;
        var f = this._moveAnimation = this.determineAnimation(t, e);
        if (!s)
          s = this._group = new Tt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = Mt(Yd, e, f);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        qd(s, e, !0), this._renderHandle(a);
      }
    }, r.prototype.remove = function(t) {
      this.clear(t);
    }, r.prototype.dispose = function(t) {
      this.clear(t);
    }, r.prototype.determineAnimation = function(t, e) {
      var i = e.get("animation"), n = t.axis, a = n.type === "category", o = e.get("snap");
      if (!o && !a)
        return !1;
      if (i === "auto" || i == null) {
        var s = this.animationThreshold;
        if (a && n.getBandWidth() > s)
          return !0;
        if (o) {
          var l = fc(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = ci(t).pointerEl = new xx[a.type](Ud(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = ci(t).labelEl = new Dt(Ud(e.label));
        t.add(a), Xd(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = ci(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = ci(t).labelEl;
      a && (a.setStyle(e.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: e.label.x,
        y: e.label.y
      }), Xd(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = $f(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Ma(u.event);
          },
          onmousedown: Fu(this._onHandleDragMove, this, 0, 0),
          drift: Fu(this._onHandleDragMove, this),
          ondragend: Fu(this._onHandleDragEnd, this)
        }), i.add(n)), qd(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        $(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, Om(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      Yd(this._axisPointerModel, !e && this._moveAnimation, this._handle, Vu(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Vu(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Vu(n)), ci(i).lastProp = null, this._doDispatchAxisPointer();
      }
    }, r.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var e = this._payloadInfo, i = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: e.cursorPoint[0],
          y: e.cursorPoint[1],
          tooltipOption: e.tooltipOption,
          axesInfo: [{
            axisDim: i.axis.dim,
            axisIndex: i.componentIndex
          }]
        });
      }
    }, r.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var t = this._handle;
      if (t) {
        var e = this._axisPointerModel.get("value");
        this._moveHandleToValue(e), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, r.prototype.clear = function(t) {
      this._lastValue = null, this._lastStatus = null;
      var e = t.getZr(), i = this._group, n = this._handle;
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Ah(this, "_doDispatchAxisPointer");
    }, r.prototype.doClear = function() {
    }, r.prototype.buildLabel = function(t, e, i) {
      return i = i || 0, {
        x: t[i],
        y: t[1 - i],
        width: e[i],
        height: e[1 - i]
      };
    }, r;
  }()
);
function Yd(r, t, e, i) {
  J0(ci(e).lastProp, i) || (ci(e).lastProp = i, t ? ie(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function J0(r, t) {
  if (H(r) && H(t)) {
    var e = !0;
    return C(t, function(i, n) {
      e = e && J0(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function Xd(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Vu(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function qd(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function k2(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function B2(r, t, e, i, n) {
  var a = e.get("value"), o = t_(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = ja(s.get("padding") || 0), u = s.getFont(), h = bf(o, u), f = n.position, v = h.width + l[1] + l[3], c = h.height + l[0] + l[2], p = n.align;
  p === "right" && (f[0] -= v), p === "center" && (f[0] -= v / 2);
  var g = n.verticalAlign;
  g === "bottom" && (f[1] -= c), g === "middle" && (f[1] -= c / 2), N2(f, v, c, i);
  var d = s.get("backgroundColor");
  (!d || d === "auto") && (d = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: f[0],
    y: f[1],
    style: Ve(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: d
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function N2(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function t_(r, t, e, i, n) {
  r = t.scale.parse(r);
  var a = t.scale.getLabel({
    value: r
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: n.precision
  }), o = n.formatter;
  if (o) {
    var s = {
      value: oc(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    C(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, f = u && u.getDataParams(h);
      f && s.seriesData.push(f);
    }), V(o) ? a = o.replace("{value}", a) : q(o) && (a = o(s));
  }
  return a;
}
function e_(r, t, e) {
  var i = on();
  return gf(i, i, e.rotation), Ju(i, i, e.position), un([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function $2(r, t, e, i, n, a) {
  var o = kr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), B2(t, i, n, a, {
    position: e_(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function z2(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function F2(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var V2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), h = Zd(l, s).getOtherAxis(s).getGlobalExtent(), f = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = k2(a), c = H2[u](s, f, h);
        c.style = v, e.graphicKey = c.type, e.pointer = c;
      }
      var p = Gh(l.model, n);
      $2(
        // @ts-ignore
        i,
        e,
        p,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = Gh(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = e_(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = Zd(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, f = [e.x, e.y];
      f[h] += i[h], f[h] = Math.min(l[1], f[h]), f[h] = Math.max(l[0], f[h]);
      var v = (u[1] + u[0]) / 2, c = [v, v];
      c[h] = f[h];
      var p = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: f[0],
        y: f[1],
        rotation: e.rotation,
        cursorPoint: c,
        tooltipOption: p[h]
      };
    }, t;
  }(O2)
);
function Zd(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var H2 = {
  line: function(r, t, e) {
    var i = z2([t, e[0]], [t, e[1]], Kd(r));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(r, t, e) {
    var i = Math.max(1, r.getBandWidth()), n = e[1] - e[0];
    return {
      type: "Rect",
      shape: F2([t - i / 2, e[0]], [i, n], Kd(r))
    };
  }
};
function Kd(r) {
  return r.dim === "x" ? 0 : 1;
}
var G2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "axisPointer", t.defaultOption = {
      // 'auto' means that show when triggered by tooltip or handle.
      show: "auto",
      // zlevel: 0,
      z: 50,
      type: "line",
      // axispointer triggered by tootip determine snap automatically,
      // see `modelHelper`.
      snap: !1,
      triggerTooltip: !0,
      triggerEmphasis: !0,
      value: null,
      status: null,
      link: [],
      // Do not set 'auto' here, otherwise global animation: false
      // will not effect at this axispointer.
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        // eslint-disable-next-line
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        // handle margin is from symbol center to axis, which is stable when circular move.
        margin: 50,
        // color: '#1b8bbd'
        // color: '#2f4554'
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        // For mobile performance
        throttle: 40
      }
    }, t;
  }(st)
), nr = At(), W2 = C;
function r_(r, t, e) {
  if (!Y.node) {
    var i = t.getZr();
    nr(i).records || (nr(i).records = {}), U2(i, t);
    var n = nr(i).records[r] || (nr(i).records[r] = {});
    n.handler = e;
  }
}
function U2(r, t) {
  if (nr(r).initialized)
    return;
  nr(r).initialized = !0, e("click", Mt(Qd, "click")), e("mousemove", Mt(Qd, "mousemove")), e("globalout", X2);
  function e(i, n) {
    r.on(i, function(a) {
      var o = q2(t);
      W2(nr(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), Y2(o.pendings, t);
    });
  }
}
function Y2(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function X2(r, t, e) {
  r.handler("leave", null, e);
}
function Qd(r, t, e, i) {
  t.handler(r, e, i);
}
function q2(r) {
  var t = {
    showTip: [],
    hideTip: []
  }, e = function(i) {
    var n = t[i.type];
    n ? n.push(i) : (i.dispatchAction = e, r.dispatchAction(i));
  };
  return {
    dispatchAction: e,
    pendings: t
  };
}
function qh(r, t) {
  if (!Y.node) {
    var e = t.getZr(), i = (nr(e).records || {})[r];
    i && (nr(e).records[r] = null);
  }
}
var Z2 = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      r_("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      qh("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      qh("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(Le)
);
function i_(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = Ti(a, r);
  if (o == null || o < 0 || $(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), f = h.dim, v = u.dim, c = f === "x" || f === "radius" ? 1 : 0, p = a.mapDimension(v), g = [];
      g[c] = a.get(p, o), g[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(g) || [];
    } else
      e = l.dataToPoint(a.getValues(U(l.dimensions, function(y) {
        return a.mapDimension(y);
      }), o)) || [];
  else if (s) {
    var d = s.getBoundingRect().clone();
    d.applyTransform(s.transform), e = [d.x + d.width / 2, d.y + d.height / 2];
  }
  return {
    point: e,
    el: s
  };
}
var jd = At();
function K2(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || j(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    is(n) && (n = i_({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = is(n), u = a.axesInfo, h = s.axesInfo, f = i === "leave" || is(n), v = {}, c = {}, p = {
      list: [],
      map: {}
    }, g = {
      showPointer: Mt(j2, c),
      showTooltip: Mt(J2, p)
    };
    C(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(n);
      C(s.coordSysAxesInfo[m], function(b, w) {
        var S = b.axis, x = iI(u, b);
        if (!f && _ && (!u || x)) {
          var M = x && x.value;
          M == null && !l && (M = S.pointToData(n)), M != null && Jd(b, M, g, !1, v);
        }
      });
    });
    var d = {};
    return C(h, function(y, m) {
      var _ = y.linkGroup;
      _ && !c[m] && C(_.axesInfo, function(b, w) {
        var S = c[w];
        if (b !== y && S) {
          var x = S.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, tg(b), tg(y)))), d[y.key] = x;
        }
      });
    }), C(d, function(y, m) {
      Jd(h[m], y, g, !0, v);
    }), tI(c, h, v), eI(p, n, r, o), rI(h, o, e), v;
  }
}
function Jd(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = Q2(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && B(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function Q2(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return C(t.seriesModels, function(l, u) {
    var h = l.getData().mapDimensionsAll(i), f, v;
    if (l.getAxisTooltipData) {
      var c = l.getAxisTooltipData(h, r, e);
      v = c.dataIndices, f = c.nestestValue;
    } else {
      if (v = l.getData().indicesOfNearest(
        h[0],
        r,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        e.type === "category" ? 0.5 : null
      ), !v.length)
        return;
      f = l.getData().get(h[0], v[0]);
    }
    if (!(f == null || !isFinite(f))) {
      var p = r - f, g = Math.abs(p);
      g <= o && ((g < o || p >= 0 && s < 0) && (o = g, s = p, n = f, a.length = 0), C(v, function(d) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: d,
          dataIndex: l.getData().getRawIndex(d)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: n
  };
}
function j2(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function J2(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = Fa(l), h = r.map[u];
    h || (h = r.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, r.list.push(h)), h.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: i,
      // Caustion: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: n.slice()
    });
  }
}
function tI(r, t, e) {
  var i = e.axesInfo = [];
  C(t, function(n, a) {
    var o = n.axisPointerModel.option, s = r[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function eI(r, t, e, i) {
  if (is(t) || !r.list.length) {
    i({
      type: "hideTip"
    });
    return;
  }
  var n = ((r.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  i({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: e.tooltipOption,
    position: e.position,
    dataIndexInside: n.dataIndexInside,
    dataIndex: n.dataIndex,
    seriesIndex: n.seriesIndex,
    dataByCoordSys: r.list
  });
}
function rI(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = jd(i)[n] || {}, o = jd(i)[n] = {};
  C(r, function(u, h) {
    var f = u.axisPointerModel.option;
    f.status === "show" && u.triggerEmphasis && C(f.seriesDataIndices, function(v) {
      var c = v.seriesIndex + " | " + v.dataIndex;
      o[c] = v;
    });
  });
  var s = [], l = [];
  C(a, function(u, h) {
    !o[h] && l.push(u);
  }), C(o, function(u, h) {
    !a[h] && s.push(u);
  }), l.length && e.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && e.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function iI(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function tg(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function is(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function n_(r) {
  Z0.registerAxisPointerClass("CartesianAxisPointer", V2), r.registerComponentModel(G2), r.registerComponentView(Z2), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !$(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = s2(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, K2);
}
function nI(r) {
  Ue(S2), Ue(n_);
}
function aI(r, t) {
  var e = ja(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), r = new _t({
    shape: {
      x: r.x - e[3],
      y: r.y - e[0],
      width: r.width + e[1] + e[3],
      height: r.height + e[0] + e[2],
      r: t.get("borderRadius")
    },
    style: i,
    silent: !0,
    z2: -1
  }), r;
}
var oI = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
      // zlevel: 0,
      z: 60,
      show: !0,
      // tooltip main content
      showContent: !0,
      // 'trigger' only works on coordinate system.
      // 'item' | 'axis' | 'none'
      trigger: "item",
      // 'click' | 'mousemove' | 'none'
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaut false (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      enterable: !1,
      backgroundColor: "#fff",
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
      // Tooltip inside padding, default is 5 for all direction
      // Array is allowed to set up, right, bottom, left, same with css
      // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
      padding: null,
      // Extra css text
      extraCssText: "",
      // axis indicator, trigger by axis
      axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: "line",
        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, t;
  }(st)
);
function a_(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function o_(r) {
  if (Y.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var s_ = o_(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), sI = o_(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function l_(r, t) {
  if (!r)
    return t;
  t = om(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function lI(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var uI = l_(sI, "transition"), cc = l_(s_, "transform"), hI = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (Y.transform3dSupported ? "will-change:transform;" : "");
function fI(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function cI(r, t, e) {
  if (!V(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = Mi(t);
  var a = fI(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = cc + ":", u;
  ct(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, f = o + n, v = f * Math.abs(Math.cos(h)) + f * Math.abs(Math.sin(h)), c = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - f) / 2) * 100) / 100;
  s += ";" + a + ":-" + c + "px";
  var p = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + p, "border-right:" + p, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function vI(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += Y.transformSupported ? "," + cc + i : ",left" + i + ",top" + i), uI + ":" + n;
}
function eg(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!Y.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = Y.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + cc + ":" + o + ";" : [["top", 0], ["left", 0], [s_, o]];
}
function pI(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = J(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), C(["decoration", "align"], function(u) {
    var h = r.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function dI(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), h = r.getModel("textStyle"), f = Rm(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(vI(n, e)), a && i.push("background-color:" + a), C(["width", "color", "radius"], function(c) {
    var p = "border-" + c, g = om(p), d = r.get(g);
    d != null && i.push(p + ":" + d + (c === "color" ? "" : "px"));
  }), i.push(pI(h)), f != null && i.push("padding:" + ja(f).join("px ") + "px"), i.join(";") + ";";
}
function rg(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && $1(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var gI = (
  /** @class */
  function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, Y.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (V(a) ? document.querySelector(a) : Ca(a) ? a : q(a) && a(t.getDom()));
      rg(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, h = n.painter.getViewportRoot();
          le(h, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = lI(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = hI + dI(t, !this._firstShow, this._longHide) + eg(a[0], a[1], !0) + ("border-color:" + Mi(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (V(a) && i.get("trigger") === "item" && !a_(i) && (s = cI(i, n, a)), V(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", $(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Ca(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el;
      return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
    }, r.prototype.moveTo = function(t, e) {
      if (this.el) {
        var i = this._styleCoord;
        if (rg(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = eg(i[0], i[1]);
          C(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      var t = this, e = this.el.style;
      e.visibility = "hidden", e.opacity = "0", Y.transform3dSupported && (e.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(j(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  }()
), yI = (
  /** @class */
  function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), ng(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      H(t) && Xt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new Dt({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: Rm(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), C(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), C(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
        o.el.style[u] = s.get(u) || 0;
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function() {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0;
      }), this.el.on("mouseout", function() {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1;
      });
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el, e = this.el.getBoundingRect(), i = ig(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        ng(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = Ar(a.borderWidth || 0), s = ig(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(j(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  }()
);
function Ar(r) {
  return Math.max(0, r);
}
function ig(r) {
  var t = Ar(r.shadowBlur || 0), e = Ar(r.shadowOffsetX || 0), i = Ar(r.shadowOffsetY || 0);
  return {
    left: Ar(t - e),
    right: Ar(t + e),
    top: Ar(t - i),
    bottom: Ar(t + i)
  };
}
function ng(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var mI = new _t({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), _I = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(Y.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = vS(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new yI(i) : new gI(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(Y.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? Om(this, "_updatePosition", 50, "fixRate") : Ah(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      r_("itemTooltip", this._api, j(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var e = this._tooltipModel, i = this._ecModel, n = this._api, a = e.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !n.isDisposed() && o.manuallyShowTip(e, i, n, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(e, i, n, a) {
      if (!(a.from === this.uid || Y.node || !n.getDom())) {
        var o = ag(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = xI(a, i, n);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else if (a.tooltip && a.x != null && a.y != null) {
          var h = mI;
          h.x = a.x, h.y = a.y, h.update(), it(h).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: h
          }, o);
        } else if (s)
          this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            position: a.position,
            dataByCoordSys: s,
            tooltipOption: a.tooltipOption
          }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(e, i, n, a))
            return;
          var f = i_(a, i), v = f.point[0], c = f.point[1];
          v != null && c != null && this._tryShow({
            offsetX: v,
            offsetY: c,
            target: f.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (n.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: n.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, t.prototype.manuallyHideTip = function(e, i, n, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(ag(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), f = Jn([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (f.get("trigger") === "axis")
            return n.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, t.prototype._tryShow = function(e, i) {
      var n = e.target, a = this._tooltipModel;
      if (a) {
        this._lastX = e.offsetX, this._lastY = e.offsetY;
        var o = e.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, e);
        else if (n) {
          var s = it(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          rn(n, function(h) {
            if (it(h).dataIndex != null)
              return l = h, !0;
            if (it(h).tooltipConfig != null)
              return u = h, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = j(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = Jn([i.tooltipOption], a), l = this._renderMode, u = [], h = Ba("section", {
        blocks: [],
        noHeader: !0
      }), f = [], v = new mu();
      C(e, function(m) {
        C(m.dataByAxis, function(_) {
          var b = n.getComponent(_.axisDim + "Axis", _.axisIndex), w = _.value;
          if (!(!b || w == null)) {
            var S = t_(w, b.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = Ba("section", {
              header: S,
              noHeader: !ze(S),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), C(_.seriesDataIndices, function(M) {
              var D = n.getSeriesByIndex(M.seriesIndex), A = M.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = oc(b.axis, {
                  value: w
                }), T.axisValueLabel = S, T.marker = v.makeTooltipMarker("item", Mi(T.color), l);
                var I = _p(D.formatTooltip(A, !0, null)), L = I.frag;
                if (L) {
                  var P = Jn([D], a).get("valueFormatter");
                  x.blocks.push(P ? B({
                    valueFormatter: P
                  }, L) : L);
                }
                I.text && f.push(I.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), f.reverse();
      var c = i.position, p = s.get("order"), g = Tp(h, v, l, p, n.get("useUTC"), s.get("textStyle"));
      g && f.unshift(g);
      var d = l === "richText" ? `

` : "<br/>", y = f.join(d);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], c, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = it(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, f = o.dataType, v = u.getData(f), c = this._renderMode, p = e.positionDefault, g = Jn([v.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, p ? {
        position: p
      } : null), d = g.get("trigger");
      if (!(d != null && d !== "item")) {
        var y = u.getDataParams(h, f), m = new mu();
        y.marker = m.makeTooltipMarker("item", Mi(y.color), c);
        var _ = _p(u.formatTooltip(h, !1, f)), b = g.get("order"), w = g.get("valueFormatter"), S = _.frag, x = S ? Tp(w ? B({
          valueFormatter: w
        }, S) : S, m, c, b, a.get("useUTC"), g.get("textStyle")) : _.text, M = "item_" + u.name + "_" + h;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, x, y, M, e.offsetX, e.offsetY, e.position, e.target, m);
        }), n({
          type: "showTip",
          dataIndexInside: h,
          dataIndex: v.getRawIndex(h),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(e, i, n) {
      var a = this._renderMode === "html", o = it(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (V(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = X(l), l.content = Ut(l.content));
      var f = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && f.push(v), f.push({
        formatter: l.content
      });
      var c = e.positionDefault, p = Jn(f, this._tooltipModel, c ? {
        position: c
      } : null), g = p.get("content"), d = Math.random() + "", y = new mu();
      this._showOrMove(p, function() {
        var m = X(p.get("formatterParams") || {});
        this._showTooltipContent(p, g, m, d, e.offsetX, e.offsetY, e.position, i, y);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(e, i, n, a, o, s, l, u, h) {
      if (this._ticket = "", !(!e.get("showContent") || !e.get("show"))) {
        var f = this._tooltipContent;
        f.setEnterable(e.get("enterable"));
        var v = e.get("formatter");
        l = l || e.get("position");
        var c = i, p = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), g = p.color;
        if (v)
          if (V(v)) {
            var d = e.ecModel.get("useUTC"), y = $(n) ? n[0] : n, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            c = v, m && (c = nl(y.axisValue, c, d)), c = sm(c, n, !0);
          } else if (q(v)) {
            var _ = j(function(b, w) {
              b === this._ticket && (f.setContent(w, h, e, g, l), this._updatePosition(e, l, o, s, f, n, u));
            }, this);
            this._ticket = a, c = v(n, a, _);
          } else
            c = v;
        f.setContent(c, h, e, g, l), f.show(e, g), this._updatePosition(e, l, o, s, f, n, u);
      }
    }, t.prototype._getNearestPoint = function(e, i, n, a) {
      if (n === "axis" || $(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!$(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(e, i, n, a, o, s, l) {
      var u = this._api.getWidth(), h = this._api.getHeight();
      i = i || e.get("position");
      var f = o.getSize(), v = e.get("align"), c = e.get("verticalAlign"), p = l && l.getBoundingRect().clone();
      if (l && p.applyTransform(l.transform), q(i) && (i = i([n, a], s, o.el, p, {
        viewSize: [u, h],
        contentSize: f.slice()
      })), $(i))
        n = Vt(i[0], u), a = Vt(i[1], h);
      else if (H(i)) {
        var g = i;
        g.width = f[0], g.height = f[1];
        var d = _n(g, {
          width: u,
          height: h
        });
        n = d.x, a = d.y, v = null, c = null;
      } else if (V(i) && l) {
        var y = wI(i, p, f, e.get("borderWidth"));
        n = y[0], a = y[1];
      } else {
        var y = bI(n, a, o, u, h, v ? null : 20, c ? null : 20);
        n = y[0], a = y[1];
      }
      if (v && (n -= og(v) ? f[0] / 2 : v === "right" ? f[0] : 0), c && (a -= og(c) ? f[1] / 2 : c === "bottom" ? f[1] : 0), a_(e)) {
        var y = SI(n, a, o, u, h);
        n = y[0], a = y[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && C(n, function(s, l) {
        var u = s.dataByAxis || [], h = e[l] || {}, f = h.dataByAxis || [];
        o = o && u.length === f.length, o && C(u, function(v, c) {
          var p = f[c] || {}, g = v.seriesDataIndices || [], d = p.seriesDataIndices || [];
          o = o && v.value === p.value && v.axisType === p.axisType && v.axisId === p.axisId && g.length === d.length, o && C(g, function(y, m) {
            var _ = d[m];
            o = o && y.seriesIndex === _.seriesIndex && y.dataIndex === _.dataIndex;
          }), a && C(v.seriesDataIndices, function(y) {
            var m = y.seriesIndex, _ = i[m], b = a[m];
            _ && b && b.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(e, i) {
      Y.node || !i.getDom() || (Ah(this, "_updatePosition"), this._tooltipContent.dispose(), qh("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(Le)
);
function Jn(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new St(e, i, i), n = new St(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof St && (o = o.get("tooltip", !0)), V(o) && (o = {
      formatter: o
    }), o && (n = new St(o, n, i)));
  }
  return n;
}
function ag(r, t) {
  return r.dispatchAction || j(t.dispatchAction, t);
}
function bI(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function SI(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function wI(r, t, e, i) {
  var n = e[0], a = e[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, h = t.height;
  switch (r) {
    case "inside":
      s = t.x + u / 2 - n / 2, l = t.y + h / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - n / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - n / 2, l = t.y + h + o;
      break;
    case "left":
      s = t.x - n - o, l = t.y + h / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + h / 2 - a / 2;
  }
  return [s, l];
}
function og(r) {
  return r === "center" || r === "middle";
}
function xI(r, t, e) {
  var i = Tf(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = qa(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var h = it(u).tooltipConfig;
        if (h && h.name === r.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: n,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function TI(r) {
  Ue(n_), r.registerComponentModel(oI), r.registerComponentView(_I), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Ht), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Ht);
}
var sg = C;
function lg(r) {
  if (r) {
    for (var t in r)
      if (r.hasOwnProperty(t))
        return !0;
  }
}
function ug(r, t, e) {
  var i = {};
  return sg(t, function(a) {
    var o = i[a] = n();
    sg(r[a], function(s, l) {
      if ($t.isValidType(l)) {
        var u = {
          type: l,
          visual: s
        };
        e && e(u, a), o[l] = new $t(u), l === "opacity" && (u = X(u), u.type = "colorAlpha", o.__hidden.__alphaForOpacity = new $t(u));
      }
    });
  }), i;
  function n() {
    var a = function() {
    };
    a.prototype.__hidden = a.prototype;
    var o = new a();
    return o;
  }
}
function CI(r, t, e) {
  var i;
  C(e, function(n) {
    t.hasOwnProperty(n) && lg(t[n]) && (i = !0);
  }), i && C(e, function(n) {
    t.hasOwnProperty(n) && lg(t[n]) ? r[n] = X(t[n]) : delete r[n];
  });
}
function MI(r, t, e, i) {
  var n = {};
  return C(r, function(a) {
    var o = $t.prepareVisualTypes(t[a]);
    n[a] = o;
  }), {
    progress: function(o, s) {
      var l;
      i != null && (l = s.getDimensionIndex(i));
      function u(w) {
        return Hm(s, f, w);
      }
      function h(w, S) {
        NC(s, f, w, S);
      }
      for (var f, v = s.getStore(); (f = o.next()) != null; ) {
        var c = s.getRawDataItem(f);
        if (!(c && c.visualMap === !1))
          for (var p = i != null ? v.get(l, f) : f, g = e(p), d = t[g], y = n[g], m = 0, _ = y.length; m < _; m++) {
            var b = y[m];
            d[b] && d[b].applyVisual(p, u, h);
          }
      }
    }
  };
}
var DI = function(r, t) {
  if (t === "all")
    return {
      type: "all",
      title: r.getLocaleModel().get(["legend", "selector", "all"])
    };
  if (t === "inverse")
    return {
      type: "inverse",
      title: r.getLocaleModel().get(["legend", "selector", "inverse"])
    };
}, Zh = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.layoutMode = {
        type: "box",
        // legend.width/height are maxWidth/maxHeight actually,
        // whereas real width/height is calculated by its content.
        // (Setting {left: 10, right: 10} does not make sense).
        // So consider the case:
        // `setOption({legend: {left: 10});`
        // then `setOption({legend: {right: 10});`
        // The previous `left` should be cleared by setting `ignoreSize`.
        ignoreSize: !0
      }, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n), e.selected = e.selected || {}, this._updateSelector(e);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), this._updateSelector(e);
    }, t.prototype._updateSelector = function(e) {
      var i = e.selector, n = this.ecModel;
      i === !0 && (i = e.selector = ["all", "inverse"]), $(i) && C(i, function(a, o) {
        V(a) && (a = {
          type: a
        }), i[o] = rt(a, DI(n, a.type));
      });
    }, t.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var e = this._data;
      if (e[0] && this.get("selectedMode") === "single") {
        for (var i = !1, n = 0; n < e.length; n++) {
          var a = e[n].get("name");
          if (this.isSelected(a)) {
            this.select(a), i = !0;
            break;
          }
        }
        !i && this.select(e[0].get("name"));
      }
    }, t.prototype._updateData = function(e) {
      var i = [], n = [];
      e.eachRawSeries(function(l) {
        var u = l.name;
        n.push(u);
        var h;
        if (l.legendVisualProvider) {
          var f = l.legendVisualProvider, v = f.getAllNames();
          e.isSeriesFiltered(l) || (n = n.concat(v)), v.length ? i = i.concat(v) : h = !0;
        } else
          h = !0;
        h && xf(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = Q(), s = U(a, function(l) {
        return (V(l) || gt(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new St(l, this, this.ecModel));
      }, this);
      this._data = Pt(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(e) {
      var i = this.option.selected, n = this.get("selectedMode");
      if (n === "single") {
        var a = this._data;
        C(a, function(o) {
          i[o.get("name")] = !1;
        });
      }
      i[e] = !0;
    }, t.prototype.unSelect = function(e) {
      this.get("selectedMode") !== "single" && (this.option.selected[e] = !1);
    }, t.prototype.toggleSelected = function(e) {
      var i = this.option.selected;
      i.hasOwnProperty(e) || (i[e] = !0), this[i[e] ? "unSelect" : "select"](e);
    }, t.prototype.allSelect = function() {
      var e = this._data, i = this.option.selected;
      C(e, function(n) {
        i[n.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var e = this._data, i = this.option.selected;
      C(e, function(n) {
        var a = n.get("name", !0);
        i.hasOwnProperty(a) || (i[a] = !0), i[a] = !i[a];
      });
    }, t.prototype.isSelected = function(e) {
      var i = this.option.selected;
      return !(i.hasOwnProperty(e) && !i[e]) && ct(this._availableNames, e) >= 0;
    }, t.prototype.getOrient = function() {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    }, t.type = "legend.plain", t.dependencies = ["series"], t.defaultOption = {
      // zlevel: 0,
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      // right: 'center',
      top: 0,
      // bottom: null,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: "#ccc",
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }, t;
  }(st)
), Xi = Mt, Kh = C, Fo = Tt, u_ = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !1, e;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new Fo()), this.group.add(this._selectorGroup = new Fo()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, t.prototype.render = function(e, i, n) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!e.get("show", !0)) {
        var o = e.get("align"), s = e.get("orient");
        (!o || o === "auto") && (o = e.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = e.get("selector", !0), u = e.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, e, i, n, l, s, u);
        var h = e.getBoxLayoutParams(), f = {
          width: n.getWidth(),
          height: n.getHeight()
        }, v = e.get("padding"), c = _n(h, f, v), p = this.layoutInner(e, o, c, a, l, u), g = _n(ot({
          width: p.width,
          height: p.height
        }, h), f, v);
        this.group.x = g.x - p.x, this.group.y = g.y - p.y, this.group.markRedraw(), this.group.add(this._backgroundEl = aI(p, e));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this.getContentGroup(), h = Q(), f = i.get("selectedMode"), v = [];
      n.eachRawSeries(function(c) {
        !c.get("legendHoverLink") && v.push(c.id);
      }), Kh(i.getData(), function(c, p) {
        var g = c.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var d = new Fo();
          d.newline = !0, u.add(d);
          return;
        }
        var y = n.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), w = m.getVisual("style"), S = this._createItem(y, g, p, c, i, e, _, w, b, f, a);
            S.on("click", Xi(hg, g, null, a, v)).on("mouseover", Xi(Qh, y.name, null, a, v)).on("mouseout", Xi(jh, y.name, null, a, v)), n.ssr && S.eachChild(function(x) {
              var M = it(x);
              M.seriesIndex = y.seriesIndex, M.dataIndex = p, M.ssrType = "legend";
            }), h.set(g, !0);
          } else
            n.eachRawSeries(function(x) {
              if (!h.get(g) && x.legendVisualProvider) {
                var M = x.legendVisualProvider;
                if (!M.containName(g))
                  return;
                var D = M.indexOfName(g), A = M.getItemVisual(D, "style"), T = M.getItemVisual(D, "legendIcon"), I = ge(A.fill);
                I && I[3] === 0 && (I[3] = 0.2, A = B(B({}, A), {
                  fill: ar(I, "rgba")
                }));
                var L = this._createItem(x, g, p, c, i, e, {}, A, T, f, a);
                L.on("click", Xi(hg, null, g, a, v)).on("mouseover", Xi(Qh, null, g, a, v)).on("mouseout", Xi(jh, null, g, a, v)), n.ssr && L.eachChild(function(P) {
                  var R = it(P);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = p, R.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(e, i, n, a, o) {
      var s = this.getSelectorGroup();
      Kh(e, function(u) {
        var h = u.type, f = new Dt({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            n.dispatchAction({
              type: h === "all" ? "legendAllSelect" : "legendInverseSelect",
              legendId: i.id
            });
          }
        });
        s.add(f);
        var v = i.getModel("selectorLabel"), c = i.getModel(["emphasis", "selectorLabel"]);
        Qa(f, {
          normal: v,
          emphasis: c
        }, {
          defaultText: u.title
        }), dh(f);
      });
    }, t.prototype._createItem = function(e, i, n, a, o, s, l, u, h, f, v) {
      var c = e.visualDrawType, p = o.get("itemWidth"), g = o.get("itemHeight"), d = o.isSelected(i), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = AI(h, a, l, u, c, d, v), w = new Fo(), S = a.getModel("textStyle");
      if (q(e.getLegendIcon) && (!_ || _ === "inherit"))
        w.add(e.getLegendIcon({
          itemWidth: p,
          itemHeight: g,
          icon: h,
          iconRotate: y,
          itemStyle: b.itemStyle,
          lineStyle: b.lineStyle,
          symbolKeepAspect: m
        }));
      else {
        var x = _ === "inherit" && e.getData().getVisual("symbol") ? y === "inherit" ? e.getData().getVisual("symbolRotate") : y : 0;
        w.add(II({
          itemWidth: p,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var M = s === "left" ? p + 5 : -5, D = s, A = o.get("formatter"), T = i;
      V(A) && A ? T = A.replace("{name}", i ?? "") : q(A) && (T = A(i));
      var I = d ? S.getTextColor() : a.get("inactiveColor");
      w.add(new Dt({
        style: Ve(S, {
          text: T,
          x: M,
          y: g / 2,
          fill: I,
          align: D,
          verticalAlign: "middle"
        }, {
          inheritColor: I
        })
      }));
      var L = new _t({
        shape: w.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), P = a.getModel("tooltip");
      return P.get("show") && Js({
        el: L,
        componentModel: o,
        itemName: i,
        itemTooltipOption: P.option
      }), w.add(L), w.eachChild(function(R) {
        R.silent = !0;
      }), L.silent = !f, this.getContentGroup().add(w), dh(w), w.__legendDataIndex = n, w;
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      vn(e.get("orient"), l, e.get("itemGap"), n.width, n.height);
      var h = l.getBoundingRect(), f = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        vn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          e.get("selectorItemGap", !0)
        );
        var v = u.getBoundingRect(), c = [-v.x, -v.y], p = e.get("selectorButtonGap", !0), g = e.getOrient().index, d = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
        s === "end" ? c[g] += h[d] + p : f[g] += v[d] + p, c[1 - g] += h[y] / 2 - v[y] / 2, u.x = c[0], u.y = c[1], l.x = f[0], l.y = f[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[d] = h[d] + p + v[d], _[y] = Math.max(h[y], v[y]), _[m] = Math.min(0, v[m] + c[1 - g]), _;
      } else
        return l.x = f[0], l.y = f[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(Le)
);
function AI(r, t, e, i, n, a, o) {
  function s(d, y) {
    d.lineWidth === "auto" && (d.lineWidth = y.lineWidth > 0 ? 2 : 0), Kh(d, function(m, _) {
      d[_] === "inherit" && (d[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = r.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", f = l.getShallow("decal");
  u.decal = !f || f === "inherit" ? i.decal : Eh(f, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[h]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : e).opacity), s(u, i);
  var v = t.getModel("lineStyle"), c = v.getLineStyle();
  if (s(c, e), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), c.stroke === "auto" && (c.stroke = i.fill), !a) {
    var p = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = p === "auto" ? i.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), c.stroke = v.get("inactiveColor"), c.lineWidth = v.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: c
  };
}
function II(r) {
  var t = r.icon || "roundRect", e = hr(t, 0, 0, r.itemWidth, r.itemHeight, r.itemStyle.fill, r.symbolKeepAspect);
  return e.setStyle(r.itemStyle), e.rotation = (r.iconRotate || 0) * Math.PI / 180, e.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), t.indexOf("empty") > -1 && (e.style.stroke = e.style.fill, e.style.fill = "#fff", e.style.lineWidth = 2), e;
}
function hg(r, t, e, i) {
  jh(r, t, e, i), e.dispatchAction({
    type: "legendToggleSelect",
    name: r ?? t
  }), Qh(r, t, e, i);
}
function h_(r) {
  for (var t = r.getZr().storage.getDisplayList(), e, i = 0, n = t.length; i < n && !(e = t[i].states.emphasis); )
    i++;
  return e && e.hoverLayer;
}
function Qh(r, t, e, i) {
  h_(e) || e.dispatchAction({
    type: "highlight",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function jh(r, t, e, i) {
  h_(e) || e.dispatchAction({
    type: "downplay",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function LI(r) {
  var t = r.findComponents({
    mainType: "legend"
  });
  t && t.length && r.filterSeries(function(e) {
    for (var i = 0; i < t.length; i++)
      if (!t[i].isSelected(e.name))
        return !1;
    return !0;
  });
}
function ta(r, t, e) {
  var i = r === "allSelect" || r === "inverseSelect", n = {}, a = [];
  e.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[r]() : s[r](t.name), fg(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return e.eachComponent("legend", function(s) {
    C(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), fg(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function fg(r, t) {
  var e = t || {};
  return C(r.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = r.isSelected(n);
      xi(e, n) ? e[n] = e[n] && a : e[n] = a;
    }
  }), e;
}
function PI(r) {
  r.registerAction("legendToggleSelect", "legendselectchanged", Mt(ta, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", Mt(ta, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", Mt(ta, "inverseSelect")), r.registerAction("legendSelect", "legendselected", Mt(ta, "select")), r.registerAction("legendUnSelect", "legendunselected", Mt(ta, "unSelect"));
}
function f_(r) {
  r.registerComponentModel(Zh), r.registerComponentView(u_), r.registerProcessor(r.PRIORITY.PROCESSOR.SERIES_FILTER, LI), r.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), PI(r);
}
var RI = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.setScrollDataIndex = function(e) {
      this.option.scrollDataIndex = e;
    }, t.prototype.init = function(e, i, n) {
      var a = ul(e);
      r.prototype.init.call(this, e, i, n), cg(this, e, a);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), cg(this, this.option, e);
    }, t.type = "legend.scroll", t.defaultOption = il(Zh.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: "#2f4554",
      pageIconInactiveColor: "#aaa",
      pageIconSize: 15,
      pageTextStyle: {
        color: "#333"
      },
      animationDurationUpdate: 800
    }), t;
  }(Zh)
);
function cg(r, t, e) {
  var i = r.getOrient(), n = [1, 1];
  n[i.index] = 0, bn(t, e, {
    type: "box",
    ignoreSize: !!n
  });
}
var vg = Tt, Hu = ["width", "height"], Gu = ["x", "y"], EI = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !0, e._currentIndex = 0, e;
    }
    return t.prototype.init = function() {
      r.prototype.init.call(this), this.group.add(this._containerGroup = new vg()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new vg());
    }, t.prototype.resetInner = function() {
      r.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this;
      r.prototype.renderInner.call(this, e, i, n, a, o, s, l);
      var h = this._controllerGroup, f = i.get("pageIconSize", !0), v = $(f) ? f : [f, f];
      p("pagePrev", 0);
      var c = i.getModel("pageTextStyle");
      h.add(new Dt({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: c.getTextColor(),
          font: c.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), p("pageNext", 1);
      function p(g, d) {
        var y = g + "DataIndex", m = $f(i.get("pageIcons", !0)[i.getOrient().name][d], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: j(u._pageGo, u, y, i, a)
        }, {
          x: -v[0] / 2,
          y: -v[1] / 2,
          width: v[0],
          height: v[1]
        });
        m.name = g, h.add(m);
      }
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = e.getOrient().index, h = Hu[u], f = Gu[u], v = Hu[1 - u], c = Gu[1 - u];
      o && vn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        e.get("selectorItemGap", !0)
      );
      var p = e.get("selectorButtonGap", !0), g = l.getBoundingRect(), d = [-g.x, -g.y], y = X(n);
      o && (y[h] = n[h] - g[h] - p);
      var m = this._layoutContentAndController(e, a, y, u, h, v, c, f);
      if (o) {
        if (s === "end")
          d[u] += m[h] + p;
        else {
          var _ = g[h] + p;
          d[u] -= _, m[f] -= _;
        }
        m[h] += g[h] + p, d[1 - u] += m[c] + m[v] / 2 - g[v] / 2, m[v] = Math.max(m[v], g[v]), m[c] = Math.min(m[c], g[c] + d[1 - u]), l.x = d[0], l.y = d[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(e, i, n, a, o, s, l, u) {
      var h = this.getContentGroup(), f = this._containerGroup, v = this._controllerGroup;
      vn(e.get("orient"), h, e.get("itemGap"), a ? n.width : null, a ? null : n.height), vn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        v,
        e.get("pageButtonItemGap", !0)
      );
      var c = h.getBoundingRect(), p = v.getBoundingRect(), g = this._showController = c[o] > n[o], d = [-c.x, -c.y];
      i || (d[a] = h[u]);
      var y = [0, 0], m = [-p.x, -p.y], _ = J(e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (g) {
        var b = e.get("pageButtonPosition", !0);
        b === "end" ? m[a] += n[o] - p[o] : y[a] += p[o] + _;
      }
      m[1 - a] += c[s] / 2 - p[s] / 2, h.setPosition(d), f.setPosition(y), v.setPosition(m);
      var w = {
        x: 0,
        y: 0
      };
      if (w[o] = g ? n[o] : c[o], w[s] = Math.max(c[s], p[s]), w[l] = Math.min(0, p[l] + m[1 - a]), f.__rectSize = n[o], g) {
        var S = {
          x: 0,
          y: 0
        };
        S[o] = Math.max(n[o] - p[o] - _, 0), S[s] = w[s], f.setClipPath(new _t({
          shape: S
        })), f.__rectSize = S[o];
      } else
        v.eachChild(function(M) {
          M.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(e);
      return x.pageIndex != null && ie(
        h,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        g ? e : null
      ), this._updatePageInfoView(e, x), w;
    }, t.prototype._pageGo = function(e, i, n) {
      var a = this._getPageInfo(i)[e];
      a != null && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: i.id
      });
    }, t.prototype._updatePageInfoView = function(e, i) {
      var n = this._controllerGroup;
      C(["pagePrev", "pageNext"], function(h) {
        var f = h + "DataIndex", v = i[f] != null, c = n.childOfName(h);
        c && (c.setStyle("fill", v ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), c.cursor = v ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = e.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", V(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(e) {
      var i = e.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = e.getOrient().index, s = Hu[o], l = Gu[o], u = this._findTargetItemIndex(i), h = n.children(), f = h[u], v = h.length, c = v ? 1 : 0, p = {
        contentPosition: [n.x, n.y],
        pageCount: c,
        pageIndex: c - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!f)
        return p;
      var g = b(f);
      p.contentPosition[o] = -g.s;
      for (var d = u + 1, y = g, m = g, _ = null; d <= v; ++d)
        _ = b(h[d]), // Half of the last item is out of the window.
        (!_ && m.e > y.s + a || _ && !w(_, y.s)) && (m.i > y.i ? y = m : y = _, y && (p.pageNextDataIndex == null && (p.pageNextDataIndex = y.i), ++p.pageCount)), m = _;
      for (var d = u - 1, y = g, m = g, _ = null; d >= -1; --d)
        _ = b(h[d]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !w(m, _.s)) && y.i < m.i && (m = y, p.pagePrevDataIndex == null && (p.pagePrevDataIndex = y.i), ++p.pageCount, ++p.pageIndex), y = _;
      return p;
      function b(S) {
        if (S) {
          var x = S.getBoundingRect(), M = x[l] + S[l];
          return {
            s: M,
            e: M + x[s],
            i: S.__legendDataIndex
          };
        }
      }
      function w(S, x) {
        return S.e >= x && S.s <= x + a;
      }
    }, t.prototype._findTargetItemIndex = function(e) {
      if (!this._showController)
        return 0;
      var i, n = this.getContentGroup(), a;
      return n.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === e && (i = s);
      }), i ?? a;
    }, t.type = "legend.scroll", t;
  }(u_)
);
function OI(r) {
  r.registerAction("legendScroll", "legendscroll", function(t, e) {
    var i = t.scrollDataIndex;
    i != null && e.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function(n) {
      n.setScrollDataIndex(i);
    });
  });
}
function kI(r) {
  Ue(f_), r.registerComponentModel(RI), r.registerComponentView(EI), OI(r);
}
function BI(r) {
  Ue(f_), Ue(kI);
}
var c_ = {
  /**
   * @public
   */
  get: function(r, t, e) {
    var i = X((NI[r] || {})[t]);
    return e && $(i) ? i[i.length - 1] : i;
  }
}, NI = {
  color: {
    active: ["#006edd", "#e0ffff"],
    inactive: ["rgba(0,0,0,0)"]
  },
  colorHue: {
    active: [0, 360],
    inactive: [0, 0]
  },
  colorSaturation: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  colorLightness: {
    active: [0.9, 0.5],
    inactive: [0, 0]
  },
  colorAlpha: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  opacity: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  symbol: {
    active: ["circle", "roundRect", "diamond"],
    inactive: ["none"]
  },
  symbolSize: {
    active: [10, 50],
    inactive: [0, 0]
  }
}, pg = $t.mapVisual, $I = $t.eachVisual, zI = $, dg = C, FI = sy, VI = sr, ks = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.stateList = ["inRange", "outOfRange"], e.replacableOptionKeys = ["inRange", "outOfRange", "target", "controller", "color"], e.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, e.dataBound = [-1 / 0, 1 / 0], e.targetVisuals = {}, e.controllerVisuals = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.optionUpdated = function(e, i) {
      var n = this.option;
      !i && CI(n, e, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();
    }, t.prototype.resetVisual = function(e) {
      var i = this.stateList;
      e = j(e, this), this.controllerVisuals = ug(this.option.controller, i, e), this.targetVisuals = ug(this.option.target, i, e);
    }, t.prototype.getItemSymbol = function() {
      return null;
    }, t.prototype.getTargetSeriesIndices = function() {
      var e = this.option.seriesIndex, i = [];
      return e == null || e === "all" ? this.ecModel.eachSeries(function(n, a) {
        i.push(a);
      }) : i = Et(e), i;
    }, t.prototype.eachTargetSeries = function(e, i) {
      C(this.getTargetSeriesIndices(), function(n) {
        var a = this.ecModel.getSeriesByIndex(n);
        a && e.call(i, a);
      }, this);
    }, t.prototype.isTargetSeries = function(e) {
      var i = !1;
      return this.eachTargetSeries(function(n) {
        n === e && (i = !0);
      }), i;
    }, t.prototype.formatValueText = function(e, i, n) {
      var a = this.option, o = a.precision, s = this.dataBound, l = a.formatter, u;
      n = n || ["<", ">"], $(e) && (e = e.slice(), u = !0);
      var h = i ? e : u ? [f(e[0]), f(e[1])] : f(e);
      if (V(l))
        return l.replace("{value}", u ? h[0] : h).replace("{value2}", u ? h[1] : h);
      if (q(l))
        return u ? l(e[0], e[1]) : l(e);
      if (u)
        return e[0] === s[0] ? n[0] + " " + h[1] : e[1] === s[1] ? n[1] + " " + h[0] : h[0] + " - " + h[1];
      return h;
      function f(v) {
        return v === s[0] ? "min" : v === s[1] ? "max" : (+v).toFixed(Math.min(o, 20));
      }
    }, t.prototype.resetExtent = function() {
      var e = this.option, i = FI([e.min, e.max]);
      this._dataExtent = i;
    }, t.prototype.getDataDimensionIndex = function(e) {
      var i = this.option.dimension;
      if (i != null)
        return e.getDimensionIndex(i);
      for (var n = e.dimensions, a = n.length - 1; a >= 0; a--) {
        var o = n[a], s = e.getDimensionInfo(o);
        if (!s.isCalculationCoord)
          return s.storeDimIndex;
      }
    }, t.prototype.getExtent = function() {
      return this._dataExtent.slice();
    }, t.prototype.completeVisualOption = function() {
      var e = this.ecModel, i = this.option, n = {
        inRange: i.inRange,
        outOfRange: i.outOfRange
      }, a = i.target || (i.target = {}), o = i.controller || (i.controller = {});
      rt(a, n), rt(o, n);
      var s = this.isCategory();
      l.call(this, a), l.call(this, o), u.call(this, a, "inRange", "outOfRange"), h.call(this, o);
      function l(f) {
        zI(i.color) && !f.inRange && (f.inRange = {
          color: i.color.slice().reverse()
        }), f.inRange = f.inRange || {
          color: e.get("gradientColor")
        };
      }
      function u(f, v, c) {
        var p = f[v], g = f[c];
        p && !g && (g = f[c] = {}, dg(p, function(d, y) {
          if ($t.isValidType(y)) {
            var m = c_.get(y, "inactive", s);
            m != null && (g[y] = m, y === "color" && !g.hasOwnProperty("opacity") && !g.hasOwnProperty("colorAlpha") && (g.opacity = [0, 0]));
          }
        }));
      }
      function h(f) {
        var v = (f.inRange || {}).symbol || (f.outOfRange || {}).symbol, c = (f.inRange || {}).symbolSize || (f.outOfRange || {}).symbolSize, p = this.get("inactiveColor"), g = this.getItemSymbol(), d = g || "roundRect";
        dg(this.stateList, function(y) {
          var m = this.itemSize, _ = f[y];
          _ || (_ = f[y] = {
            color: s ? p : [p]
          }), _.symbol == null && (_.symbol = v && X(v) || (s ? d : [d])), _.symbolSize == null && (_.symbolSize = c && X(c) || (s ? m[0] : [m[0], m[0]])), _.symbol = pg(_.symbol, function(S) {
            return S === "none" ? d : S;
          });
          var b = _.symbolSize;
          if (b != null) {
            var w = -1 / 0;
            $I(b, function(S) {
              S > w && (w = S);
            }), _.symbolSize = pg(b, function(S) {
              return VI(S, [0, w], [0, m[0]], !0);
            });
          }
        }, this);
      }
    }, t.prototype.resetItemSize = function() {
      this.itemSize = [parseFloat(this.get("itemWidth")), parseFloat(this.get("itemHeight"))];
    }, t.prototype.isCategory = function() {
      return !!this.option.categories;
    }, t.prototype.setSelected = function(e) {
    }, t.prototype.getSelected = function() {
      return null;
    }, t.prototype.getValueState = function(e) {
      return null;
    }, t.prototype.getVisualMeta = function(e) {
      return null;
    }, t.type = "visualMap", t.dependencies = ["series"], t.defaultOption = {
      show: !0,
      // zlevel: 0,
      z: 4,
      seriesIndex: "all",
      min: 0,
      max: 200,
      left: 0,
      right: null,
      top: null,
      bottom: 0,
      itemWidth: null,
      itemHeight: null,
      inverse: !1,
      orient: "vertical",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      contentColor: "#5793f3",
      inactiveColor: "#aaa",
      borderWidth: 0,
      padding: 5,
      // 接受数组分别设定上右下左边距，同css
      textGap: 10,
      precision: 0,
      textStyle: {
        color: "#333"
        // 值域文字颜色
      }
    }, t;
  }(st)
), gg = [20, 140], HI = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.optionUpdated = function(e, i) {
      r.prototype.optionUpdated.apply(this, arguments), this.resetExtent(), this.resetVisual(function(n) {
        n.mappingMethod = "linear", n.dataExtent = this.getExtent();
      }), this._resetRange();
    }, t.prototype.resetItemSize = function() {
      r.prototype.resetItemSize.apply(this, arguments);
      var e = this.itemSize;
      (e[0] == null || isNaN(e[0])) && (e[0] = gg[0]), (e[1] == null || isNaN(e[1])) && (e[1] = gg[1]);
    }, t.prototype._resetRange = function() {
      var e = this.getExtent(), i = this.option.range;
      !i || i.auto ? (e.auto = 1, this.option.range = e) : $(i) && (i[0] > i[1] && i.reverse(), i[0] = Math.max(i[0], e[0]), i[1] = Math.min(i[1], e[1]));
    }, t.prototype.completeVisualOption = function() {
      r.prototype.completeVisualOption.apply(this, arguments), C(this.stateList, function(e) {
        var i = this.option.controller[e].symbolSize;
        i && i[0] !== i[1] && (i[0] = i[1] / 3);
      }, this);
    }, t.prototype.setSelected = function(e) {
      this.option.range = e.slice(), this._resetRange();
    }, t.prototype.getSelected = function() {
      var e = this.getExtent(), i = sy((this.get("range") || []).slice());
      return i[0] > e[1] && (i[0] = e[1]), i[1] > e[1] && (i[1] = e[1]), i[0] < e[0] && (i[0] = e[0]), i[1] < e[0] && (i[1] = e[0]), i;
    }, t.prototype.getValueState = function(e) {
      var i = this.option.range, n = this.getExtent();
      return (i[0] <= n[0] || i[0] <= e) && (i[1] >= n[1] || e <= i[1]) ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(e) {
      var i = [];
      return this.eachTargetSeries(function(n) {
        var a = [], o = n.getData();
        o.each(this.getDataDimensionIndex(o), function(s, l) {
          e[0] <= s && s <= e[1] && a.push(l);
        }, this), i.push({
          seriesId: n.id,
          dataIndex: a
        });
      }, this), i;
    }, t.prototype.getVisualMeta = function(e) {
      var i = yg(this, "outOfRange", this.getExtent()), n = yg(this, "inRange", this.option.range.slice()), a = [];
      function o(c, p) {
        a.push({
          value: c,
          color: e(c, p)
        });
      }
      for (var s = 0, l = 0, u = n.length, h = i.length; l < h && (!n.length || i[l] <= n[0]); l++)
        i[l] < n[s] && o(i[l], "outOfRange");
      for (var f = 1; s < u; s++, f = 0)
        f && a.length && o(n[s], "outOfRange"), o(n[s], "inRange");
      for (var f = 1; l < h; l++)
        (!n.length || n[n.length - 1] < i[l]) && (f && (a.length && o(a[a.length - 1].value, "outOfRange"), f = 0), o(i[l], "outOfRange"));
      var v = a.length;
      return {
        stops: a,
        outerColors: [v ? a[0].color : "transparent", v ? a[v - 1].color : "transparent"]
      };
    }, t.type = "visualMap.continuous", t.defaultOption = il(ks.defaultOption, {
      align: "auto",
      calculable: !1,
      hoverLink: !0,
      realtime: !0,
      handleIcon: "path://M-11.39,9.77h0a3.5,3.5,0,0,1-3.5,3.5h-22a3.5,3.5,0,0,1-3.5-3.5h0a3.5,3.5,0,0,1,3.5-3.5h22A3.5,3.5,0,0,1-11.39,9.77Z",
      handleSize: "120%",
      handleStyle: {
        borderColor: "#fff",
        borderWidth: 1
      },
      indicatorIcon: "circle",
      indicatorSize: "50%",
      indicatorStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowColor: "rgba(0,0,0,0.2)"
      }
      // emphasis: {
      //     handleStyle: {
      //         shadowBlur: 3,
      //         shadowOffsetX: 1,
      //         shadowOffsetY: 1,
      //         shadowColor: 'rgba(0,0,0,0.2)'
      //     }
      // }
    }), t;
  }(ks)
);
function yg(r, t, e) {
  if (e[0] === e[1])
    return e.slice();
  for (var i = 200, n = (e[1] - e[0]) / i, a = e[0], o = [], s = 0; s <= i && a < e[1]; s++)
    o.push(a), a += n;
  return o.push(e[1]), o;
}
var v_ = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.autoPositionValues = {
        left: 1,
        right: 1,
        top: 1,
        bottom: 1
      }, e;
    }
    return t.prototype.init = function(e, i) {
      this.ecModel = e, this.api = i;
    }, t.prototype.render = function(e, i, n, a) {
      if (this.visualMapModel = e, e.get("show") === !1) {
        this.group.removeAll();
        return;
      }
      this.doRender(e, i, n, a);
    }, t.prototype.renderBackground = function(e) {
      var i = this.visualMapModel, n = ja(i.get("padding") || 0), a = e.getBoundingRect();
      e.add(new _t({
        z2: -1,
        silent: !0,
        shape: {
          x: a.x - n[3],
          y: a.y - n[0],
          width: a.width + n[3] + n[1],
          height: a.height + n[0] + n[2]
        },
        style: {
          fill: i.get("backgroundColor"),
          stroke: i.get("borderColor"),
          lineWidth: i.get("borderWidth")
        }
      }));
    }, t.prototype.getControllerVisual = function(e, i, n) {
      n = n || {};
      var a = n.forceState, o = this.visualMapModel, s = {};
      if (i === "color") {
        var l = o.get("contentColor");
        s.color = l;
      }
      function u(c) {
        return s[c];
      }
      function h(c, p) {
        s[c] = p;
      }
      var f = o.controllerVisuals[a || o.getValueState(e)], v = $t.prepareVisualTypes(f);
      return C(v, function(c) {
        var p = f[c];
        n.convertOpacityToAlpha && c === "opacity" && (c = "colorAlpha", p = f.__alphaForOpacity), $t.dependsOn(c, i) && p && p.applyVisual(e, u, h);
      }), s[i];
    }, t.prototype.positionGroup = function(e) {
      var i = this.visualMapModel, n = this.api;
      Zx(e, i.getBoxLayoutParams(), {
        width: n.getWidth(),
        height: n.getHeight()
      });
    }, t.prototype.doRender = function(e, i, n, a) {
    }, t.type = "visualMap", t;
  }(Le)
), mg = [["left", "right", "width"], ["top", "bottom", "height"]];
function p_(r, t, e) {
  var i = r.option, n = i.align;
  if (n != null && n !== "auto")
    return n;
  for (var a = {
    width: t.getWidth(),
    height: t.getHeight()
  }, o = i.orient === "horizontal" ? 1 : 0, s = mg[o], l = [0, null, 10], u = {}, h = 0; h < 3; h++)
    u[mg[1 - o][h]] = l[h], u[s[h]] = h === 2 ? e[0] : i[s[h]];
  var f = [["x", "width", 3], ["y", "height", 0]][o], v = _n(u, a, i.padding);
  return s[(v.margin[f[2]] || 0) + v[f[0]] + v[f[1]] * 0.5 < a[f[1]] * 0.5 ? 0 : 1];
}
function ns(r, t) {
  return C(r || [], function(e) {
    e.dataIndex != null && (e.dataIndexInside = e.dataIndex, e.dataIndex = null), e.highlightKey = "visualMap" + (t ? t.componentIndex : "");
  }), r;
}
var Ne = sr, GI = C, _g = Math.min, Wu = Math.max, WI = 12, UI = 6, YI = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._shapes = {}, e._dataInterval = [], e._handleEnds = [], e._hoverLinkDataIndices = [], e;
    }
    return t.prototype.init = function(e, i) {
      r.prototype.init.call(this, e, i), this._hoverLinkFromSeriesMouseOver = j(this._hoverLinkFromSeriesMouseOver, this), this._hideIndicator = j(this._hideIndicator, this);
    }, t.prototype.doRender = function(e, i, n, a) {
      (!a || a.type !== "selectDataRange" || a.from !== this.uid) && this._buildView();
    }, t.prototype._buildView = function() {
      this.group.removeAll();
      var e = this.visualMapModel, i = this.group;
      this._orient = e.get("orient"), this._useHandle = e.get("calculable"), this._resetInterval(), this._renderBar(i);
      var n = e.get("text");
      this._renderEndsText(i, n, 0), this._renderEndsText(i, n, 1), this._updateView(!0), this.renderBackground(i), this._updateView(), this._enableHoverLinkToSeries(), this._enableHoverLinkFromSeries(), this.positionGroup(i);
    }, t.prototype._renderEndsText = function(e, i, n) {
      if (i) {
        var a = i[1 - n];
        a = a != null ? a + "" : "";
        var o = this.visualMapModel, s = o.get("textGap"), l = o.itemSize, u = this._shapes.mainGroup, h = this._applyTransform([l[0] / 2, n === 0 ? -s : l[1] + s], u), f = this._applyTransform(n === 0 ? "bottom" : "top", u), v = this._orient, c = this.visualMapModel.textStyleModel;
        this.group.add(new Dt({
          style: Ve(c, {
            x: h[0],
            y: h[1],
            verticalAlign: v === "horizontal" ? "middle" : f,
            align: v === "horizontal" ? f : "center",
            text: a
          })
        }));
      }
    }, t.prototype._renderBar = function(e) {
      var i = this.visualMapModel, n = this._shapes, a = i.itemSize, o = this._orient, s = this._useHandle, l = p_(i, this.api, a), u = n.mainGroup = this._createBarGroup(l), h = new Tt();
      u.add(h), h.add(n.outOfRange = bg()), h.add(n.inRange = bg(null, s ? wg(this._orient) : null, j(this._dragHandle, this, "all", !1), j(this._dragHandle, this, "all", !0))), h.setClipPath(new _t({
        shape: {
          x: 0,
          y: 0,
          width: a[0],
          height: a[1],
          r: 3
        }
      }));
      var f = i.textStyleModel.getTextRect("国"), v = Wu(f.width, f.height);
      s && (n.handleThumbs = [], n.handleLabels = [], n.handleLabelPoints = [], this._createHandle(i, u, 0, a, v, o), this._createHandle(i, u, 1, a, v, o)), this._createIndicator(i, u, a, v, o), e.add(u);
    }, t.prototype._createHandle = function(e, i, n, a, o, s) {
      var l = j(this._dragHandle, this, n, !1), u = j(this._dragHandle, this, n, !0), h = Ge(e.get("handleSize"), a[0]), f = hr(e.get("handleIcon"), -h / 2, -h / 2, h, h, null, !0), v = wg(this._orient);
      f.attr({
        cursor: v,
        draggable: !0,
        drift: l,
        ondragend: u,
        onmousemove: function(y) {
          Ma(y.event);
        }
      }), f.x = a[0] / 2, f.useStyle(e.getModel("handleStyle").getItemStyle()), f.setStyle({
        strokeNoScale: !0,
        strokeFirst: !0
      }), f.style.lineWidth *= 2, f.ensureState("emphasis").style = e.getModel(["emphasis", "handleStyle"]).getItemStyle(), Lf(f, !0), i.add(f);
      var c = this.visualMapModel.textStyleModel, p = new Dt({
        cursor: v,
        draggable: !0,
        drift: l,
        onmousemove: function(y) {
          Ma(y.event);
        },
        ondragend: u,
        style: Ve(c, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      p.ensureState("blur").style = {
        opacity: 0.1
      }, p.stateTransition = {
        duration: 200
      }, this.group.add(p);
      var g = [h, 0], d = this._shapes;
      d.handleThumbs[n] = f, d.handleLabelPoints[n] = g, d.handleLabels[n] = p;
    }, t.prototype._createIndicator = function(e, i, n, a, o) {
      var s = Ge(e.get("indicatorSize"), n[0]), l = hr(e.get("indicatorIcon"), -s / 2, -s / 2, s, s, null, !0);
      l.attr({
        cursor: "move",
        invisible: !0,
        silent: !0,
        x: n[0] / 2
      });
      var u = e.getModel("indicatorStyle").getItemStyle();
      if (l instanceof Ke) {
        var h = l.style;
        l.useStyle(B({
          // TODO other properties like x, y ?
          image: h.image,
          x: h.x,
          y: h.y,
          width: h.width,
          height: h.height
        }, u));
      } else
        l.useStyle(u);
      i.add(l);
      var f = this.visualMapModel.textStyleModel, v = new Dt({
        silent: !0,
        invisible: !0,
        style: Ve(f, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      this.group.add(v);
      var c = [(o === "horizontal" ? a / 2 : UI) + n[0] / 2, 0], p = this._shapes;
      p.indicator = l, p.indicatorLabel = v, p.indicatorLabelPoint = c, this._firstShowIndicator = !0;
    }, t.prototype._dragHandle = function(e, i, n, a) {
      if (this._useHandle) {
        if (this._dragging = !i, !i) {
          var o = this._applyTransform([n, a], this._shapes.mainGroup, !0);
          this._updateInterval(e, o[1]), this._hideIndicator(), this._updateView();
        }
        i === !this.visualMapModel.get("realtime") && this.api.dispatchAction({
          type: "selectDataRange",
          from: this.uid,
          visualMapId: this.visualMapModel.id,
          selected: this._dataInterval.slice()
        }), i ? !this._hovering && this._clearHoverLinkToSeries() : Sg(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[e], !1);
      }
    }, t.prototype._resetInterval = function() {
      var e = this.visualMapModel, i = this._dataInterval = e.getSelected(), n = e.getExtent(), a = [0, e.itemSize[1]];
      this._handleEnds = [Ne(i[0], n, a, !0), Ne(i[1], n, a, !0)];
    }, t.prototype._updateInterval = function(e, i) {
      i = i || 0;
      var n = this.visualMapModel, a = this._handleEnds, o = [0, n.itemSize[1]];
      M2(
        i,
        a,
        o,
        e,
        // cross is forbidden
        0
      );
      var s = n.getExtent();
      this._dataInterval = [Ne(a[0], o, s, !0), Ne(a[1], o, s, !0)];
    }, t.prototype._updateView = function(e) {
      var i = this.visualMapModel, n = i.getExtent(), a = this._shapes, o = [0, i.itemSize[1]], s = e ? o : this._handleEnds, l = this._createBarVisual(this._dataInterval, n, s, "inRange"), u = this._createBarVisual(n, n, o, "outOfRange");
      a.inRange.setStyle({
        fill: l.barColor
        // opacity: visualInRange.opacity
      }).setShape("points", l.barPoints), a.outOfRange.setStyle({
        fill: u.barColor
        // opacity: visualOutOfRange.opacity
      }).setShape("points", u.barPoints), this._updateHandle(s, l);
    }, t.prototype._createBarVisual = function(e, i, n, a) {
      var o = {
        forceState: a,
        convertOpacityToAlpha: !0
      }, s = this._makeColorGradient(e, o), l = [this.getControllerVisual(e[0], "symbolSize", o), this.getControllerVisual(e[1], "symbolSize", o)], u = this._createBarPoints(n, l);
      return {
        barColor: new kf(0, 0, 0, 1, s),
        barPoints: u,
        handlesColor: [s[0].color, s[s.length - 1].color]
      };
    }, t.prototype._makeColorGradient = function(e, i) {
      var n = 100, a = [], o = (e[1] - e[0]) / n;
      a.push({
        color: this.getControllerVisual(e[0], "color", i),
        offset: 0
      });
      for (var s = 1; s < n; s++) {
        var l = e[0] + o * s;
        if (l > e[1])
          break;
        a.push({
          color: this.getControllerVisual(l, "color", i),
          offset: s / n
        });
      }
      return a.push({
        color: this.getControllerVisual(e[1], "color", i),
        offset: 1
      }), a;
    }, t.prototype._createBarPoints = function(e, i) {
      var n = this.visualMapModel.itemSize;
      return [[n[0] - i[0], e[0]], [n[0], e[0]], [n[0], e[1]], [n[0] - i[1], e[1]]];
    }, t.prototype._createBarGroup = function(e) {
      var i = this._orient, n = this.visualMapModel.get("inverse");
      return new Tt(i === "horizontal" && !n ? {
        scaleX: e === "bottom" ? 1 : -1,
        rotation: Math.PI / 2
      } : i === "horizontal" && n ? {
        scaleX: e === "bottom" ? -1 : 1,
        rotation: -Math.PI / 2
      } : i === "vertical" && !n ? {
        scaleX: e === "left" ? 1 : -1,
        scaleY: -1
      } : {
        scaleX: e === "left" ? 1 : -1
      });
    }, t.prototype._updateHandle = function(e, i) {
      if (this._useHandle) {
        var n = this._shapes, a = this.visualMapModel, o = n.handleThumbs, s = n.handleLabels, l = a.itemSize, u = a.getExtent(), h = this._applyTransform("left", n.mainGroup);
        GI([0, 1], function(f) {
          var v = o[f];
          v.setStyle("fill", i.handlesColor[f]), v.y = e[f];
          var c = Ne(e[f], [0, l[1]], u, !0), p = this.getControllerVisual(c, "symbolSize");
          v.scaleX = v.scaleY = p / l[0], v.x = l[0] - p / 2;
          var g = un(n.handleLabelPoints[f], jo(v, this.group));
          if (this._orient === "horizontal") {
            var d = h === "left" || h === "top" ? (l[0] - p) / 2 : (l[0] - p) / -2;
            g[1] += d;
          }
          s[f].setStyle({
            x: g[0],
            y: g[1],
            text: a.formatValueText(this._dataInterval[f]),
            verticalAlign: "middle",
            align: this._orient === "vertical" ? this._applyTransform("left", n.mainGroup) : "center"
          });
        }, this);
      }
    }, t.prototype._showIndicator = function(e, i, n, a) {
      var o = this.visualMapModel, s = o.getExtent(), l = o.itemSize, u = [0, l[1]], h = this._shapes, f = h.indicator;
      if (f) {
        f.attr("invisible", !1);
        var v = {
          convertOpacityToAlpha: !0
        }, c = this.getControllerVisual(e, "color", v), p = this.getControllerVisual(e, "symbolSize"), g = Ne(e, s, u, !0), d = l[0] - p / 2, y = {
          x: f.x,
          y: f.y
        };
        f.y = g, f.x = d;
        var m = un(h.indicatorLabelPoint, jo(f, this.group)), _ = h.indicatorLabel;
        _.attr("invisible", !1);
        var b = this._applyTransform("left", h.mainGroup), w = this._orient, S = w === "horizontal";
        _.setStyle({
          text: (n || "") + o.formatValueText(i),
          verticalAlign: S ? b : "middle",
          align: S ? "center" : b
        });
        var x = {
          x: d,
          y: g,
          style: {
            fill: c
          }
        }, M = {
          style: {
            x: m[0],
            y: m[1]
          }
        };
        if (o.ecModel.isAnimationEnabled() && !this._firstShowIndicator) {
          var D = {
            duration: 100,
            easing: "cubicInOut",
            additive: !0
          };
          f.x = y.x, f.y = y.y, f.animateTo(x, D), _.animateTo(M, D);
        } else
          f.attr(x), _.attr(M);
        this._firstShowIndicator = !1;
        var A = this._shapes.handleLabels;
        if (A)
          for (var T = 0; T < A.length; T++)
            this.api.enterBlur(A[T]);
      }
    }, t.prototype._enableHoverLinkToSeries = function() {
      var e = this;
      this._shapes.mainGroup.on("mousemove", function(i) {
        if (e._hovering = !0, !e._dragging) {
          var n = e.visualMapModel.itemSize, a = e._applyTransform([i.offsetX, i.offsetY], e._shapes.mainGroup, !0, !0);
          a[1] = _g(Wu(0, a[1]), n[1]), e._doHoverLinkToSeries(a[1], 0 <= a[0] && a[0] <= n[0]);
        }
      }).on("mouseout", function() {
        e._hovering = !1, !e._dragging && e._clearHoverLinkToSeries();
      });
    }, t.prototype._enableHoverLinkFromSeries = function() {
      var e = this.api.getZr();
      this.visualMapModel.option.hoverLink ? (e.on("mouseover", this._hoverLinkFromSeriesMouseOver, this), e.on("mouseout", this._hideIndicator, this)) : this._clearHoverLinkFromSeries();
    }, t.prototype._doHoverLinkToSeries = function(e, i) {
      var n = this.visualMapModel, a = n.itemSize;
      if (n.option.hoverLink) {
        var o = [0, a[1]], s = n.getExtent();
        e = _g(Wu(o[0], e), o[1]);
        var l = XI(n, s, o), u = [e - l, e + l], h = Ne(e, o, s, !0), f = [Ne(u[0], o, s, !0), Ne(u[1], o, s, !0)];
        u[0] < o[0] && (f[0] = -1 / 0), u[1] > o[1] && (f[1] = 1 / 0), i && (f[0] === -1 / 0 ? this._showIndicator(h, f[1], "< ", l) : f[1] === 1 / 0 ? this._showIndicator(h, f[0], "> ", l) : this._showIndicator(h, h, "≈ ", l));
        var v = this._hoverLinkDataIndices, c = [];
        (i || Sg(n)) && (c = this._hoverLinkDataIndices = n.findTargetDataIndices(f));
        var p = hS(v, c);
        this._dispatchHighDown("downplay", ns(p[0], n)), this._dispatchHighDown("highlight", ns(p[1], n));
      }
    }, t.prototype._hoverLinkFromSeriesMouseOver = function(e) {
      var i;
      if (rn(e.target, function(l) {
        var u = it(l);
        if (u.dataIndex != null)
          return i = u, !0;
      }, !0), !!i) {
        var n = this.ecModel.getSeriesByIndex(i.seriesIndex), a = this.visualMapModel;
        if (a.isTargetSeries(n)) {
          var o = n.getData(i.dataType), s = o.getStore().get(a.getDataDimensionIndex(o), i.dataIndex);
          isNaN(s) || this._showIndicator(s, s);
        }
      }
    }, t.prototype._hideIndicator = function() {
      var e = this._shapes;
      e.indicator && e.indicator.attr("invisible", !0), e.indicatorLabel && e.indicatorLabel.attr("invisible", !0);
      var i = this._shapes.handleLabels;
      if (i)
        for (var n = 0; n < i.length; n++)
          this.api.leaveBlur(i[n]);
    }, t.prototype._clearHoverLinkToSeries = function() {
      this._hideIndicator();
      var e = this._hoverLinkDataIndices;
      this._dispatchHighDown("downplay", ns(e, this.visualMapModel)), e.length = 0;
    }, t.prototype._clearHoverLinkFromSeries = function() {
      this._hideIndicator();
      var e = this.api.getZr();
      e.off("mouseover", this._hoverLinkFromSeriesMouseOver), e.off("mouseout", this._hideIndicator);
    }, t.prototype._applyTransform = function(e, i, n, a) {
      var o = jo(i, a ? null : this.group);
      return $(e) ? un(e, o, n) : Wy(e, o, n);
    }, t.prototype._dispatchHighDown = function(e, i) {
      i && i.length && this.api.dispatchAction({
        type: e,
        batch: i
      });
    }, t.prototype.dispose = function() {
      this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();
    }, t.type = "visualMap.continuous", t;
  }(v_)
);
function bg(r, t, e, i) {
  return new Qs({
    shape: {
      points: r
    },
    draggable: !!e,
    cursor: t,
    drift: e,
    onmousemove: function(n) {
      Ma(n.event);
    },
    ondragend: i
  });
}
function XI(r, t, e) {
  var i = WI / 2, n = r.get("hoverLinkDataSize");
  return n && (i = Ne(n, t, e, !0) / 2), i;
}
function Sg(r) {
  var t = r.get("hoverLinkOnHandle");
  return !!(t ?? r.get("realtime"));
}
function wg(r) {
  return r === "vertical" ? "ns-resize" : "ew-resize";
}
var qI = {
  type: "selectDataRange",
  event: "dataRangeSelected",
  // FIXME use updateView appears wrong
  update: "update"
}, ZI = function(r, t) {
  t.eachComponent({
    mainType: "visualMap",
    query: r
  }, function(e) {
    e.setSelected(r.selected);
  });
}, KI = [
  {
    createOnAllSeries: !0,
    reset: function(r, t) {
      var e = [];
      return t.eachComponent("visualMap", function(i) {
        var n = r.pipelineContext;
        !i.isTargetSeries(r) || n && n.large || e.push(MI(i.stateList, i.targetVisuals, j(i.getValueState, i), i.getDataDimensionIndex(r.getData())));
      }), e;
    }
  },
  // Only support color.
  {
    createOnAllSeries: !0,
    reset: function(r, t) {
      var e = r.getData(), i = [];
      t.eachComponent("visualMap", function(n) {
        if (n.isTargetSeries(r)) {
          var a = n.getVisualMeta(j(QI, null, r, n)) || {
            stops: [],
            outerColors: []
          }, o = n.getDataDimensionIndex(e);
          o >= 0 && (a.dimension = o, i.push(a));
        }
      }), r.getData().setVisual("visualMeta", i);
    }
  }
];
function QI(r, t, e, i) {
  for (var n = t.targetVisuals[i], a = $t.prepareVisualTypes(n), o = {
    color: Gm(r.getData(), "color")
    // default color.
  }, s = 0, l = a.length; s < l; s++) {
    var u = a[s], h = n[u === "opacity" ? "__alphaForOpacity" : u];
    h && h.applyVisual(e, f, v);
  }
  return o.color;
  function f(c) {
    return o[c];
  }
  function v(c, p) {
    o[c] = p;
  }
}
var xg = C;
function jI(r) {
  var t = r && r.visualMap;
  $(t) || (t = t ? [t] : []), xg(t, function(e) {
    if (e) {
      qi(e, "splitList") && !qi(e, "pieces") && (e.pieces = e.splitList, delete e.splitList);
      var i = e.pieces;
      i && $(i) && xg(i, function(n) {
        H(n) && (qi(n, "start") && !qi(n, "min") && (n.min = n.start), qi(n, "end") && !qi(n, "max") && (n.max = n.end));
      });
    }
  });
}
function qi(r, t) {
  return r && r.hasOwnProperty && r.hasOwnProperty(t);
}
var Tg = !1;
function d_(r) {
  Tg || (Tg = !0, r.registerSubTypeDefaulter("visualMap", function(t) {
    return !t.categories && (!(t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) || t.calculable) ? "continuous" : "piecewise";
  }), r.registerAction(qI, ZI), C(KI, function(t) {
    r.registerVisual(r.PRIORITY.VISUAL.COMPONENT, t);
  }), r.registerPreprocessor(jI));
}
function JI(r) {
  r.registerComponentModel(HI), r.registerComponentView(YI), d_(r);
}
var tL = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._pieceList = [], e;
    }
    return t.prototype.optionUpdated = function(e, i) {
      r.prototype.optionUpdated.apply(this, arguments), this.resetExtent();
      var n = this._mode = this._determineMode();
      this._pieceList = [], eL[this._mode].call(this, this._pieceList), this._resetSelected(e, i);
      var a = this.option.categories;
      this.resetVisual(function(o, s) {
        n === "categories" ? (o.mappingMethod = "category", o.categories = X(a)) : (o.dataExtent = this.getExtent(), o.mappingMethod = "piecewise", o.pieceList = U(this._pieceList, function(l) {
          return l = X(l), s !== "inRange" && (l.visual = null), l;
        }));
      });
    }, t.prototype.completeVisualOption = function() {
      var e = this.option, i = {}, n = $t.listVisualTypes(), a = this.isCategory();
      C(e.pieces, function(s) {
        C(n, function(l) {
          s.hasOwnProperty(l) && (i[l] = 1);
        });
      }), C(i, function(s, l) {
        var u = !1;
        C(this.stateList, function(h) {
          u = u || o(e, h, l) || o(e.target, h, l);
        }, this), !u && C(this.stateList, function(h) {
          (e[h] || (e[h] = {}))[l] = c_.get(l, h === "inRange" ? "active" : "inactive", a);
        });
      }, this);
      function o(s, l, u) {
        return s && s[l] && s[l].hasOwnProperty(u);
      }
      r.prototype.completeVisualOption.apply(this, arguments);
    }, t.prototype._resetSelected = function(e, i) {
      var n = this.option, a = this._pieceList, o = (i ? n : e).selected || {};
      if (n.selected = o, C(a, function(l, u) {
        var h = this.getSelectedMapKey(l);
        o.hasOwnProperty(h) || (o[h] = !0);
      }, this), n.selectedMode === "single") {
        var s = !1;
        C(a, function(l, u) {
          var h = this.getSelectedMapKey(l);
          o[h] && (s ? o[h] = !1 : s = !0);
        }, this);
      }
    }, t.prototype.getItemSymbol = function() {
      return this.get("itemSymbol");
    }, t.prototype.getSelectedMapKey = function(e) {
      return this._mode === "categories" ? e.value + "" : e.index + "";
    }, t.prototype.getPieceList = function() {
      return this._pieceList;
    }, t.prototype._determineMode = function() {
      var e = this.option;
      return e.pieces && e.pieces.length > 0 ? "pieces" : this.option.categories ? "categories" : "splitNumber";
    }, t.prototype.setSelected = function(e) {
      this.option.selected = X(e);
    }, t.prototype.getValueState = function(e) {
      var i = $t.findPieceIndex(e, this._pieceList);
      return i != null && this.option.selected[this.getSelectedMapKey(this._pieceList[i])] ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(e) {
      var i = [], n = this._pieceList;
      return this.eachTargetSeries(function(a) {
        var o = [], s = a.getData();
        s.each(this.getDataDimensionIndex(s), function(l, u) {
          var h = $t.findPieceIndex(l, n);
          h === e && o.push(u);
        }, this), i.push({
          seriesId: a.id,
          dataIndex: o
        });
      }, this), i;
    }, t.prototype.getRepresentValue = function(e) {
      var i;
      if (this.isCategory())
        i = e.value;
      else if (e.value != null)
        i = e.value;
      else {
        var n = e.interval || [];
        i = n[0] === -1 / 0 && n[1] === 1 / 0 ? 0 : (n[0] + n[1]) / 2;
      }
      return i;
    }, t.prototype.getVisualMeta = function(e) {
      if (this.isCategory())
        return;
      var i = [], n = ["", ""], a = this;
      function o(h, f) {
        var v = a.getRepresentValue({
          interval: h
        });
        f || (f = a.getValueState(v));
        var c = e(v, f);
        h[0] === -1 / 0 ? n[0] = c : h[1] === 1 / 0 ? n[1] = c : i.push({
          value: h[0],
          color: c
        }, {
          value: h[1],
          color: c
        });
      }
      var s = this._pieceList.slice();
      if (!s.length)
        s.push({
          interval: [-1 / 0, 1 / 0]
        });
      else {
        var l = s[0].interval[0];
        l !== -1 / 0 && s.unshift({
          interval: [-1 / 0, l]
        }), l = s[s.length - 1].interval[1], l !== 1 / 0 && s.push({
          interval: [l, 1 / 0]
        });
      }
      var u = -1 / 0;
      return C(s, function(h) {
        var f = h.interval;
        f && (f[0] > u && o([u, f[0]], "outOfRange"), o(f.slice()), u = f[1]);
      }, this), {
        stops: i,
        outerColors: n
      };
    }, t.type = "visualMap.piecewise", t.defaultOption = il(ks.defaultOption, {
      selected: null,
      minOpen: !1,
      maxOpen: !1,
      align: "auto",
      itemWidth: 20,
      itemHeight: 14,
      itemSymbol: "roundRect",
      pieces: null,
      categories: null,
      splitNumber: 5,
      selectedMode: "multiple",
      itemGap: 10,
      hoverLink: !0
      // Enable hover highlight.
    }), t;
  }(ks)
), eL = {
  splitNumber: function(r) {
    var t = this.option, e = Math.min(t.precision, 20), i = this.getExtent(), n = t.splitNumber;
    n = Math.max(parseInt(n, 10), 1), t.splitNumber = n;
    for (var a = (i[1] - i[0]) / n; +a.toFixed(e) !== a && e < 5; )
      e++;
    t.precision = e, a = +a.toFixed(e), t.minOpen && r.push({
      interval: [-1 / 0, i[0]],
      close: [0, 0]
    });
    for (var o = 0, s = i[0]; o < n; s += a, o++) {
      var l = o === n - 1 ? i[1] : s + a;
      r.push({
        interval: [s, l],
        close: [1, 1]
      });
    }
    t.maxOpen && r.push({
      interval: [i[1], 1 / 0],
      close: [0, 0]
    }), ov(r), C(r, function(u, h) {
      u.index = h, u.text = this.formatValueText(u.interval);
    }, this);
  },
  categories: function(r) {
    var t = this.option;
    C(t.categories, function(e) {
      r.push({
        text: this.formatValueText(e, !0),
        value: e
      });
    }, this), Cg(t, r);
  },
  pieces: function(r) {
    var t = this.option;
    C(t.pieces, function(e, i) {
      H(e) || (e = {
        value: e
      });
      var n = {
        text: "",
        index: i
      };
      if (e.label != null && (n.text = e.label), e.hasOwnProperty("value")) {
        var a = n.value = e.value;
        n.interval = [a, a], n.close = [1, 1];
      } else {
        for (var o = n.interval = [], s = n.close = [0, 0], l = [1, 0, 1], u = [-1 / 0, 1 / 0], h = [], f = 0; f < 2; f++) {
          for (var v = [["gte", "gt", "min"], ["lte", "lt", "max"]][f], c = 0; c < 3 && o[f] == null; c++)
            o[f] = e[v[c]], s[f] = l[c], h[f] = c === 2;
          o[f] == null && (o[f] = u[f]);
        }
        h[0] && o[1] === 1 / 0 && (s[0] = 0), h[1] && o[0] === -1 / 0 && (s[1] = 0), o[0] === o[1] && s[0] && s[1] && (n.value = o[0]);
      }
      n.visual = $t.retrieveVisuals(e), r.push(n);
    }, this), Cg(t, r), ov(r), C(r, function(e) {
      var i = e.close, n = [["<", "≤"][i[1]], [">", "≥"][i[0]]];
      e.text = e.text || this.formatValueText(e.value != null ? e.value : e.interval, !1, n);
    }, this);
  }
};
function Cg(r, t) {
  var e = r.inverse;
  (r.orient === "vertical" ? !e : e) && t.reverse();
}
var rL = (
  /** @class */
  function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.doRender = function() {
      var e = this.group;
      e.removeAll();
      var i = this.visualMapModel, n = i.get("textGap"), a = i.textStyleModel, o = a.getFont(), s = a.getTextColor(), l = this._getItemAlign(), u = i.itemSize, h = this._getViewData(), f = h.endsText, v = yn(i.get("showLabel", !0), !f), c = !i.get("selectedMode");
      f && this._renderEndsText(e, f[0], u, v, l), C(h.viewPieceList, function(p) {
        var g = p.piece, d = new Tt();
        d.onclick = j(this._onItemClick, this, g), this._enableHoverLink(d, p.indexInModelPieceList);
        var y = i.getRepresentValue(g);
        if (this._createItemSymbol(d, y, [0, 0, u[0], u[1]], c), v) {
          var m = this.visualMapModel.getValueState(y);
          d.add(new Dt({
            style: {
              x: l === "right" ? -n : u[0] + n,
              y: u[1] / 2,
              text: g.text,
              verticalAlign: "middle",
              align: l,
              font: o,
              fill: s,
              opacity: m === "outOfRange" ? 0.5 : 1
            },
            silent: c
          }));
        }
        e.add(d);
      }, this), f && this._renderEndsText(e, f[1], u, v, l), vn(i.get("orient"), e, i.get("itemGap")), this.renderBackground(e), this.positionGroup(e);
    }, t.prototype._enableHoverLink = function(e, i) {
      var n = this;
      e.on("mouseover", function() {
        return a("highlight");
      }).on("mouseout", function() {
        return a("downplay");
      });
      var a = function(o) {
        var s = n.visualMapModel;
        s.option.hoverLink && n.api.dispatchAction({
          type: o,
          batch: ns(s.findTargetDataIndices(i), s)
        });
      };
    }, t.prototype._getItemAlign = function() {
      var e = this.visualMapModel, i = e.option;
      if (i.orient === "vertical")
        return p_(e, this.api, e.itemSize);
      var n = i.align;
      return (!n || n === "auto") && (n = "left"), n;
    }, t.prototype._renderEndsText = function(e, i, n, a, o) {
      if (i) {
        var s = new Tt(), l = this.visualMapModel.textStyleModel;
        s.add(new Dt({
          style: Ve(l, {
            x: a ? o === "right" ? n[0] : 0 : n[0] / 2,
            y: n[1] / 2,
            verticalAlign: "middle",
            align: a ? o : "center",
            text: i
          })
        })), e.add(s);
      }
    }, t.prototype._getViewData = function() {
      var e = this.visualMapModel, i = U(e.getPieceList(), function(s, l) {
        return {
          piece: s,
          indexInModelPieceList: l
        };
      }), n = e.get("text"), a = e.get("orient"), o = e.get("inverse");
      return (a === "horizontal" ? o : !o) ? i.reverse() : n && (n = n.slice().reverse()), {
        viewPieceList: i,
        endsText: n
      };
    }, t.prototype._createItemSymbol = function(e, i, n, a) {
      var o = hr(
        // symbol will be string
        this.getControllerVisual(i, "symbol"),
        n[0],
        n[1],
        n[2],
        n[3],
        // color will be string
        this.getControllerVisual(i, "color")
      );
      o.silent = a, e.add(o);
    }, t.prototype._onItemClick = function(e) {
      var i = this.visualMapModel, n = i.option, a = n.selectedMode;
      if (a) {
        var o = X(n.selected), s = i.getSelectedMapKey(e);
        a === "single" || a === !0 ? (o[s] = !0, C(o, function(l, u) {
          o[u] = u === s;
        })) : o[s] = !o[s], this.api.dispatchAction({
          type: "selectDataRange",
          from: this.uid,
          visualMapId: this.visualMapModel.id,
          selected: o
        });
      }
    }, t.type = "visualMap.piecewise", t;
  }(v_)
);
function iL(r) {
  r.registerComponentModel(tL), r.registerComponentView(rL), d_(r);
}
function nL(r) {
  Ue(JI), Ue(iL);
}
function Mg(r, t, e) {
  var i = Br.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var Uu = function(r) {
  N(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || gs, typeof e == "string" ? o = Mg(e, i, n) : H(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (Hg(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var e = this.dpr;
    this.domBack = Mg("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new at(0, 0, 0, 0);
    function h(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new at(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var b = !1, w = 1 / 0, S = 0, x = 0; x < o.length; ++x) {
            var M = o[x];
            if (M.intersect(m)) {
              var D = new at(0, 0, 0, 0);
              D.copy(M), D.union(m), o[x] = D, b = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(M);
              var A = m.width * m.height, T = M.width * M.height, I = u.width * u.height, L = I - A - T;
              L < w && (w = L, S = x);
            }
          }
          if (l && (o[S].union(m), b = !0), !b) {
            var _ = new at(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var f = this.__startIndex; f < this.__endIndex; ++f) {
      var v = e[f];
      if (v) {
        var c = v.shouldBePainted(n, a, !0, !0), p = v.__isRendered && (v.__dirty & te || !c) ? v.getPrevPaintRect() : null;
        p && h(p);
        var g = c && (v.__dirty & te || !v.__isRendered) ? v.getPaintRect() : null;
        g && h(g);
      }
    }
    for (var f = this.__prevStartIndex; f < this.__prevEndIndex; ++f) {
      var v = i[f], c = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!c || !v.__zr) && v.__isRendered) {
        var p = v.getPrevPaintRect();
        p && h(p);
      }
    }
    var d;
    do {
      d = !1;
      for (var f = 0; f < o.length; ) {
        if (o[f].isZero()) {
          o.splice(f, 1);
          continue;
        }
        for (var y = f + 1; y < o.length; )
          o[f].intersect(o[y]) ? (d = !0, o[f].union(o[y]), o.splice(y, 1)) : y++;
        f++;
      }
    } while (d);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(e, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = e + "px", o.height = i + "px"), a.width = e * n, a.height = i * n, s && (s.width = e * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(e, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    i = i || this.clearColor;
    var u = this.motionBlur && !e, h = this.lastFrameAlpha, f = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / f, l / f));
    var c = this.domBack;
    function p(g, d, y, m) {
      if (o.clearRect(g, d, y, m), i && i !== "transparent") {
        var _ = void 0;
        if (Vs(i)) {
          var b = i.global || i.__width === y && i.__height === m;
          _ = b && i.__canvasGradient || Ph(o, i, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), i.__canvasGradient = _, i.__width = y, i.__height = m;
        } else x1(i) && (i.scaleX = i.scaleX || f, i.scaleY = i.scaleY || f, _ = Rh(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(g, d, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(c, g, d, y, m), o.restore());
    }
    !n || u ? p(0, 0, s, l) : n.length && C(n, function(g) {
      p(g.x * f, g.y * f, g.width * f, g.height * f);
    });
  }, t;
}(Ze), Dg = 1e5, ui = 314159, Vo = 0.01, aL = 1e-3;
function oL(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function sL(r, t) {
  var e = document.createElement("div");
  return e.style.cssText = [
    "position:relative",
    "width:" + r + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", e;
}
var lL = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = B({}, i || {}), this.dpr = i.devicePixelRatio || gs, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Hg(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, f = h.width, v = h.height;
      i.width != null && (f = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, h.width = f * this.dpr, h.height = v * this.dpr, this._width = f, this._height = v;
      var c = new Uu(h, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), l[ui] = c, c.zlevel = ui, s.push(ui), this._domRoot = t;
    } else {
      this._width = Do(t, 0, i), this._height = Do(t, 1, i);
      var u = this._domRoot = sL(this._width, this._height);
      t.appendChild(u);
    }
  }
  return r.prototype.getType = function() {
    return "canvas";
  }, r.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, r.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, r.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, r.prototype.refresh = function(t) {
    var e = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(e, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
  }, r.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, r.prototype._paintHoverList = function(t) {
    var e = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!e) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < e; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Dg)), a || (a = i.ctx, a.save()), gi(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Dg);
  }, r.prototype.paintOne = function(t, e) {
    qm(t, e);
  }, r.prototype._paintList = function(t, e, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, e, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        hs(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(ui).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var h = !0, f = !1, v = function(g) {
      var d = a[g], y = d.ctx, m = o && d.createRepaintRects(t, e, c._width, c._height), _ = i ? d.__startIndex : d.__drawIndex, b = !i && d.incremental && Date.now, w = b && Date.now(), S = d.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (d.__startIndex === d.__endIndex)
        d.clear(!1, S, m);
      else if (_ === d.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && d.clear(!1, S, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = d.__startIndex);
      var M, D = function(L) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (M = _; M < d.__endIndex; M++) {
          var R = t[M];
          if (R.__inHover && (f = !0), n._doPaintEl(R, d, o, L, P, M === d.__endIndex - 1), b) {
            var O = Date.now() - w;
            if (O > 15)
              break;
          }
        }
        P.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          M = d.__endIndex;
        else
          for (var A = c.dpr, T = 0; T < m.length; ++T) {
            var I = m[T];
            y.save(), y.beginPath(), y.rect(I.x * A, I.y * A, I.width * A, I.height * A), y.clip(), D(I), y.restore();
          }
      else
        y.save(), D(), y.restore();
      d.__drawIndex = M, d.__drawIndex < d.__endIndex && (h = !1);
    }, c = this, p = 0; p < a.length; p++)
      v(p);
    return Y.wxa && C(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: f
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (gi(s, t, a, o), t.setPrevPaintRect(l));
    } else
      gi(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = ui);
    var i = this._layers[t];
    return i || (i = new Uu("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? rt(i, this._layerConfig[t], !0) : this._layerConfig[t - Vo] && rt(i, this._layerConfig[t - Vo], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && oL(e)) {
      if (a > 0 && t > n[0]) {
        for (l = 0; l < a - 1 && !(n[l] < t && n[l + 1] > t); l++)
          ;
        s = i[n[l]];
      }
      if (n.splice(l + 1, 0, t), i[t] = e, !e.virtual)
        if (s) {
          var u = s.dom;
          u.nextSibling ? o.insertBefore(e.dom, u.nextSibling) : o.appendChild(e.dom);
        } else
          o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
      e.painter || (e.painter = this);
    }
  }, r.prototype.eachLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(e, this._layers[a], a);
    }
  }, r.prototype.eachBuiltinLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(e, o, a);
    }
  }, r.prototype.eachOtherLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(e, o, a);
    }
  }, r.prototype.getLayers = function() {
    return this._layers;
  }, r.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(f, v) {
      f.__dirty = f.__used = !1;
    });
    function e(f) {
      a && (a.__endIndex !== f && (a.__dirty = !0), a.__endIndex = f);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var n = t[i];
        if (n.zlevel !== t[i - 1].zlevel || n.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, l;
    for (l = 0; l < t.length; l++) {
      var n = t[l], u = n.zlevel, h = void 0;
      s !== u && (s = u, o = 0), n.incremental ? (h = this.getLayer(u + aL, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? Vo : 0), this._needsManuallyCompositing), h.__builtin__ || cf("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), a = h), n.__dirty & te && !n.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(f, v) {
      !f.__used && f.getElementCount() > 0 && (f.__dirty = !0, f.__startIndex = f.__endIndex = f.__drawIndex = 0), f.__dirty && f.__drawIndex < 0 && (f.__drawIndex = f.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, C(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? rt(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + Vo) {
          var o = this._layers[a];
          rt(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(ct(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = Do(a, 0, n), e = Do(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(ui).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[ui].dom;
    var e = new Uu("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(f) {
        f.__builtin__ ? i.drawImage(f.dom, 0, 0, n, a) : f.renderToCanvas && (i.save(), f.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var h = s[l];
        gi(i, h, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function uL(r) {
  r.registerPainter("canvas", lL);
}
const hL = [
  GA,
  E2,
  DA,
  nI,
  BI,
  TI,
  nL,
  uL
];
var fL = Object.defineProperty, cL = Object.getOwnPropertyDescriptor, vc = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? cL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && fL(t, e, n), n;
};
Ue(hL);
let Ha = class extends ee {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".canvas");
    this.chart = PM(r, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(r), this.applyOption();
  }
  updated() {
    this.applyOption();
  }
  disconnectedCallback() {
    this.observer?.disconnect(), this.chart?.dispose(), this.chart = void 0, super.disconnectedCallback();
  }
  applyOption() {
    this.chart && this.option && this.chart.setOption(this.option, !0);
  }
  render() {
    return E`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
Ha.styles = Xe`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
vc([
  pt({ attribute: !1 })
], Ha.prototype, "option", 2);
vc([
  pt({ type: String })
], Ha.prototype, "height", 2);
Ha = vc([
  pr("ia-chart")
], Ha);
var vL = Object.defineProperty, pL = Object.getOwnPropertyDescriptor, Ai = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? pL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && vL(t, e, n), n;
};
const as = ["pv_energy_total", "grid_import_total", "battery_discharge_total"], Jh = ["load_energy_total", "grid_export_total", "battery_charge_total"], dL = [...as, ...Jh];
let fr = class extends ee {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.requestId = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.themeObserver = new MutationObserver(() => this.requestUpdate()), this.themeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["style"]
    });
  }
  disconnectedCallback() {
    this.themeObserver?.disconnect(), this.themeObserver = void 0, super.disconnectedCallback();
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = zs(this.range, /* @__PURE__ */ new Date()), i = await W_(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = Wa(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderTotals(r) {
    const t = this.hass.locale.language;
    return E`<div class="kpi">
      ${dL.filter((e) => e in r.totals).map(
      (e) => E`<div class="cell">
          <span class="label">${gn[e]}</span>
          <span class="value">${se(r.totals[e], t)}</span>
          <span class="hint">
            ${as.includes(e) ? "into the system" : "out of it"}
          </span>
        </div>`
    )}
    </div>`;
  }
  renderBalance(r) {
    const t = this.hass.locale.language;
    return r.unaccounted === null ? E`<p class="empty">
        The books can only be closed with all six counters mapped. Missing:
        ${r.missing.map((e) => gn[e]).join(", ")}. Until then the difference
        between the two bars would measure what is not mapped rather than what was lost.
      </p>` : E`
      <p class="balance">
        In ${se(r.sources_total, t)}, out
        ${se(r.sinks_total, t)} —
        <strong>${se(Math.abs(r.unaccounted), t)}</strong>
        ${r.unaccounted >= 0 ? "unaccounted for" : "more out than in"}
        (${lt(r.unaccounted_share, t)}).
      </p>
      <p class="note">
        Conversion and battery round-trip losses live in this figure, and so does every
        disagreement between the six meters. It is called unaccounted rather than losses because
        nothing here can tell heat in the inverter from error in a clamp.
      </p>
    `;
  }
  renderRatios(r) {
    const t = this.hass.locale.language, e = r.totals, i = (n) => n in e;
    return r.self_sufficiency === null && r.self_consumption === null ? E`<p class="empty">
        Self-sufficiency needs the house and grid-import counters; self-consumption needs solar
        and grid export.
      </p>` : E`<div class="kpi">
      ${r.self_sufficiency !== null ? E`<div class="cell">
            <span class="label">Self-sufficiency</span>
            <span class="value">${lt(r.self_sufficiency, t)}</span>
            <span class="hint">
              ${i("load_energy_total") && i("grid_import_total") ? `(${se(e.load_energy_total, t)} − ${se(
      e.grid_import_total,
      t
    )}) ÷ ${se(e.load_energy_total, t)}` : ""}
            </span>
          </div>` : F}
      ${r.self_consumption !== null ? E`<div class="cell">
            <span class="label">Self-consumption</span>
            <span class="value">${lt(r.self_consumption, t)}</span>
            <span class="hint">
              ${i("pv_energy_total") && i("grid_export_total") ? `(${se(e.pv_energy_total, t)} − ${se(
      e.grid_export_total,
      t
    )}) ÷ ${se(e.pv_energy_total, t)}` : ""}
            </span>
          </div>` : F}
    </div>`;
  }
  render() {
    if (this.error)
      return E`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return E`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language;
    return E`
      <div class="status">
        <span class="badge">Hourly statistics</span>
        <span class="badge">Days in ${r.timezone}</span>
        ${r.clamped ? E`<span class="warn">Period shortened to the maximum allowed</span>` : F}
        ${!r.covers_whole_window && r.covered_end ? E`<span class="warn">
              Counted up to ${new Date(r.covered_end).toLocaleString(t)}
            </span>` : F}
        ${r.covered_end ? F : E`<span class="warn">No energy statistics in this period</span>`}
        ${this.loading ? E`<span class="warn">Refreshing…</span>` : F}
      </div>

      ${this.renderTotals(r)}

      <section>
        <h2>In against out</h2>
        <ia-chart
          .option=${o1(r.totals, as, Jh)}
          height="220px"
        ></ia-chart>
        ${this.renderBalance(r)}
      </section>

      <section>
        <h2>Self-sufficiency and self-consumption</h2>
        ${this.renderRatios(r)}
      </section>

      <section>
        <h2>Day by day</h2>
        ${r.days.length ? E`<ia-chart .option=${s1(r.days, as, Jh)}></ia-chart>` : E`<p class="empty">No days with energy statistics in this period.</p>`}
        <p class="note">
          Two bars a day: what came in, and what went out. Adding the two together would count
          the same energy twice. Energy is read from Home Assistant's hourly statistics, which is where counter resets
          are already accounted for. The current hour is compiled only once it ends, so a period
          running up to now stops at the last completed hour.
        </p>
      </section>
    `;
  }
};
fr.styles = Xe`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .cell {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label { font-size: 12px; color: var(--secondary-text-color); }
    .value { font-size: 22px; font-weight: 500; }
    .hint { font-size: 12px; color: var(--secondary-text-color); }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    section .kpi { margin-bottom: 0; }
    section .cell { border: 1px solid var(--divider-color); }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    .balance { font-size: 14px; margin: 12px 0 0; }
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 12px 0 0; }
    .empty { color: var(--secondary-text-color); margin: 0; font-size: 13px; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
Ai([
  pt({ attribute: !1 })
], fr.prototype, "hass", 2);
Ai([
  pt({ type: String })
], fr.prototype, "entryId", 2);
Ai([
  pt({ type: String })
], fr.prototype, "range", 2);
Ai([
  It()
], fr.prototype, "payload", 2);
Ai([
  It()
], fr.prototype, "error", 2);
Ai([
  It()
], fr.prototype, "loading", 2);
fr = Ai([
  pr("ia-balance-tab")
], fr);
const pc = Xe`
  section {
    background: var(--card-background-color);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 15px;
    font-weight: 500;
    margin: 0 0 12px;
  }
  h3 {
    font-size: 13px;
    font-weight: 500;
    margin: 16px 0 8px;
    color: var(--secondary-text-color);
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  .card {
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .card .name {
    font-size: 13px;
    font-weight: 500;
  }
  .card .value {
    font-size: 20px;
    font-weight: 500;
  }
  .row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .note {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin: 8px 0 0;
  }
  .warn {
    color: var(--warning-color);
    font-size: 13px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  th,
  td {
    text-align: left;
    padding: 6px 8px;
    border-bottom: 1px solid var(--divider-color);
  }
  .empty {
    color: var(--secondary-text-color);
    margin: 0;
  }
`;
var gL = Object.defineProperty, yL = Object.getOwnPropertyDescriptor, _l = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? yL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && gL(t, e, n), n;
};
let xn = class extends ee {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en";
  }
  render() {
    const r = this.flow;
    return E`
      <section>
        <h2>Charging and discharging</h2>

        ${r.sign_looks_inverted ? E`<p class="warn">
              The charge rises while this battery reports discharging. The power sensor's
              direction is probably reversed — tick "Invert battery power" in the integration's
              options. Until then charging and discharging are swapped everywhere on this page.
            </p>` : F}

        <div class="cards">
          <div class="card">
            <span class="name">Mean charge power</span>
            <span class="value">${mt(r.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span><span>${lt(r.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Mean discharge power</span>
            <span class="value">${mt(r.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span>
              <span>${lt(r.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Resting</span>
            <span class="value">${lt(r.share_idle, this.locale)}</span>
            <span class="row">
              <span>Below</span><span>${mt(r.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Discharged</span>
            <span class="value">${se(r.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>Charged</span><span>${se(r.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${r.round_trip_efficiency !== null ? E`<div class="card">
                <span class="name">Round-trip efficiency</span>
                <span class="value">
                  ${lt(r.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>Out of what went in</span></span>
              </div>` : F}
          <div class="card">
            <span class="name">Full cycles per day</span>
            <span class="value">
              ${r.cycles_per_day === null ? "—" : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      r.cycles_per_day
    )}
            </span>
            ${r.cycles_per_day === null ? E`<span class="row"><span>Needs the battery capacity</span></span>` : F}
          </div>
        </div>

        ${r.cycles_per_day === null && !this.hasCapacity ? E`<p class="note">
              Set the battery capacity in the integration's options and this becomes the energy
              discharged each day divided by one full charge. It is not guessed from the state of
              charge, which would count a shallow cycle the same as a deep one.
            </p>` : F}

        ${r.energy_metered ? F : E`<p class="note">
              Energy is integrated from the power readings rather than read off a meter, so a
              period with gaps understates it — compare it against the coverage above. Map the
              battery's charge and discharge counters in the options to read the inverter's own
              accounting instead, and to get round-trip efficiency.
            </p>`}
        ${r.energy_metered && r.round_trip_efficiency === null ? E`<p class="note">
              No round-trip efficiency for this period.
              ${r.soc_drift_pct !== null && Math.abs(r.soc_drift_pct) > r.efficiency_max_drift_pct ? E`The charge ended
                    ${Math.abs(Math.round(r.soc_drift_pct))} points
                    ${r.soc_drift_pct < 0 ? "below" : "above"} where it started, so the gap
                    between charged and discharged is mostly energy still in the battery rather
                    than energy lost on the way through. A longer period, or one that begins and
                    ends at a similar charge, will give a figure.` : E`There was too little charging and discharging to divide one by the other.`}
            </p>` : F}
      </section>
    `;
  }
};
xn.styles = [pc, Xe`:host { display: block; }`];
_l([
  pt({ attribute: !1 })
], xn.prototype, "flow", 2);
_l([
  pt({ type: Boolean })
], xn.prototype, "hasCapacity", 2);
_l([
  pt({ type: String })
], xn.prototype, "locale", 2);
xn = _l([
  pr("ia-charge-section")
], xn);
var mL = Object.defineProperty, _L = Object.getOwnPropertyDescriptor, Ii = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? _L(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && mL(t, e, n), n;
};
let cr = class extends ee {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.requestId = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.themeObserver = new MutationObserver(() => this.requestUpdate()), this.themeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["style"]
    });
  }
  disconnectedCallback() {
    this.themeObserver?.disconnect(), this.themeObserver = void 0, super.disconnectedCallback();
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = zs(this.range, /* @__PURE__ */ new Date()), i = await H_(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = Wa(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = r.dips_measurable, i = "—", n = [
      ["Mean charge", lt(hi(r.kpi.mean_soc), t), "over the whole period"],
      [
        "Lowest charge",
        e ? lt(hi(r.kpi.min_soc), t) : i,
        e ? "exact data only" : "needs exact data"
      ],
      [
        `Below ${lt(hi(r.low_pct), t)}`,
        e ? nn(r.kpi.seconds_below_low) : i,
        e ? "exact data only" : "needs exact data"
      ],
      [
        "Dips",
        e ? String(r.kpi.dip_count) : i,
        e ? "lasting over a minute" : "needs exact data"
      ],
      [
        "Mean low point",
        e ? lt(hi(r.kpi.mean_low_point), t) : i,
        e ? "across those dips" : "needs exact data"
      ]
    ];
    return E`<div class="kpi">
      ${n.map(
      ([a, o, s]) => E`<div class="cell">
          <span class="label">${a}</span>
          <span class="value">${o}</span>
          <span class="hint">${s}</span>
        </div>`
    )}
    </div>`;
  }
  renderEpisodes(r) {
    const t = this.hass.locale.language;
    return r.dips_measurable ? r.episodes.length ? E`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Lowest</th><th>Recovered to</th></tr>
      </thead>
      <tbody>
        ${r.episodes.map(
      (e) => E`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${nn(e.seconds)}</td>
            <td>${lt(hi(e.lowest), t)}</td>
            <td>${lt(hi(e.recovered_to), t)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : E`<p class="empty">
        The charge never stayed below ${lt(hi(r.low_pct), t)} for more than
        a minute in this period.
      </p>` : E`<p class="empty">
        This period is covered only by hourly averages, which record the mean charge across each
        hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips
        cannot be counted at all — an empty table would read as "none happened". Pick a shorter
        period to see them.
      </p>`;
  }
  render() {
    if (this.error)
      return E`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return E`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language, e = ls(r.coverage, t);
    return E`
      <div class="status">
        <span class="badge">${sf(r.precision, r.boundary, t)}</span>
        ${e ? E`<span class="warn">${e}</span>` : F}
        ${r.clamped ? E`<span class="warn">Period shortened to the maximum allowed</span>` : F}
        ${r.raw_from && r.dips_restricted && r.dips_measurable ? E`<span class="warn">
              Dips counted from ${new Date(r.raw_from).toLocaleDateString(t)}, where
              exact data begins
            </span>` : F}
        ${this.loading ? E`<span class="warn">Refreshing…</span>` : F}
      </div>

      ${this.renderKpi(r)}

      <section>
        <h2>Time spent at each state of charge</h2>
        <ia-chart .option=${e1(r)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across charge bands</h2>
        <ia-chart .option=${r1(r.bands)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Low-charge episodes</h2>
        ${this.renderEpisodes(r)}
      </section>

      ${r.power ? E`<ia-charge-section
            .flow=${r.power}
            .hasCapacity=${r.has_capacity}
            .locale=${t}
          ></ia-charge-section>` : E`<section>
            <h2>Charging and discharging</h2>
            <p class="empty">
              Map a battery power sensor in the integration's options to see how much moves in and
              out, and how much of the time the battery is working.
            </p>
          </section>`}
    `;
  }
};
cr.styles = Xe`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .cell {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label { font-size: 12px; color: var(--secondary-text-color); }
    .value { font-size: 22px; font-weight: 500; }
    .hint { font-size: 12px; color: var(--secondary-text-color); }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    .empty { color: var(--secondary-text-color); margin: 0; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
Ii([
  pt({ attribute: !1 })
], cr.prototype, "hass", 2);
Ii([
  pt({ type: String })
], cr.prototype, "entryId", 2);
Ii([
  pt({ type: String })
], cr.prototype, "range", 2);
Ii([
  It()
], cr.prototype, "payload", 2);
Ii([
  It()
], cr.prototype, "error", 2);
Ii([
  It()
], cr.prototype, "loading", 2);
cr = Ii([
  pr("ia-battery-tab")
], cr);
function hi(r) {
  return r === null ? null : r / 100;
}
var bL = Object.defineProperty, SL = Object.getOwnPropertyDescriptor, bl = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? SL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && bL(t, e, n), n;
};
let Tn = class extends ee {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  renderCards() {
    const { rating_per_phase: r } = this.phases;
    return E`<div class="cards">
      ${this.phases.per_phase.map((t) => {
      const e = this.series[t.key]?.coverage;
      return E`<div class="card">
          <span class="name">${t.label}</span>
          <span class="value">${mt(t.mean, this.locale)}</span>
          <span class="row"><span>Peak</span><span>${mt(t.peak, this.locale)}</span></span>
          <span class="row"><span>P95</span><span>${mt(t.p95, this.locale)}</span></span>
          <span class="row"><span>Share of load</span><span>${lt(t.share, this.locale)}</span></span>
          <span class="row">
            <span>Peak vs ${mt(r, this.locale)}</span>
            <span>${lt(t.headroom, this.locale)}</span>
          </span>
          ${e !== void 0 && e < 0.95 ? E`<span class="warn">Covers ${ua(e, this.locale)} of the period</span>` : F}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const { imbalance: r } = this.phases;
    return r.mean === null ? E`<p class="empty">
        Total load never rose above ${mt(r.floor_w, this.locale)}, so there was
        nothing to measure the spread against in this period.
      </p>` : E`
      <div class="cards">
        <div class="card">
          <span class="name">Mean imbalance</span>
          <span class="value">${lt(r.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">P95 imbalance</span>
          <span class="value">${lt(r.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">Above ${lt(r.threshold, this.locale)}</span>
          <span class="value">${lt(r.fraction_above, this.locale)}</span>
          <span class="row"><span>of the measured time</span></span>
        </div>
      </div>
      <ia-chart .option=${J_(r)}></ia-chart>
      <p class="note">
        Measured over ${nn(r.analysed_seconds)}
        (${ua(r.coverage, this.locale)} of the period).${r.below_floor_seconds > 0 ? E` A further ${nn(r.below_floor_seconds)} sat below
              ${mt(r.floor_w, this.locale)} of total load and is excluded: at
              standby power a few watts of difference is a large percentage and means nothing.` : F}
      </p>
    `;
  }
  renderEpisodes() {
    const { episodes: r, per_phase: t } = this.phases;
    return r.length ? E`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          <th>Worst</th>
          ${t.map((e) => E`<th>${e.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${r.map(
      (e) => E`<tr>
            <td>${new Date(e.start).toLocaleString(this.locale)}</td>
            <td>${nn(e.seconds)}</td>
            <td>${lt(e.peak_imbalance, this.locale)}</td>
            ${e.phases.map((i) => E`<td>${mt(i, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : E`<p class="empty">No sustained imbalance in this period.</p>`;
  }
  render() {
    const { imbalance: r, rating_per_phase: t, rating_per_phase_derived: e, rating_per_phase_divisor: i } = this.phases;
    return E`
      <section>
        <h2>Phases</h2>
        ${this.renderCards()}
        ${e ? E`<p class="note">
              No per-phase rating is configured, so the total is split across
              ${i} phases — ${mt(t, this.locale)}
              each. Set the real figure in the integration's options if the hardware differs.
            </p>` : F}
        ${r.aligned_coverage < 0.95 ? E`<p class="warn">
              All phases had data at the same moment for only
              ${ua(r.aligned_coverage, this.locale)} of the period. The spread
              cannot be measured while any one phase is unknown.
            </p>` : F}

        <h3>Imbalance</h3>
        ${this.renderImbalance()}

        <h3>Sustained imbalance episodes</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
Tn.styles = [pc, Xe`:host { display: block; }`];
bl([
  pt({ attribute: !1 })
], Tn.prototype, "phases", 2);
bl([
  pt({ attribute: !1 })
], Tn.prototype, "series", 2);
bl([
  pt({ type: String })
], Tn.prototype, "locale", 2);
Tn = bl([
  pr("ia-phases-section")
], Tn);
var wL = Object.defineProperty, xL = Object.getOwnPropertyDescriptor, Sl = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? xL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && wL(t, e, n), n;
};
let Cn = class extends ee {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  render() {
    const { parts: r, aligned_coverage: t } = this.strings;
    return E`
      <section>
        <h2>PV strings</h2>
        <div class="cards">
          ${r.map((e) => {
      const i = this.series[e.key]?.coverage;
      return E`<div class="card">
              <span class="name">${e.label}</span>
              <span class="value">${mt(e.mean, this.locale)}</span>
              <span class="row"><span>Peak</span><span>${mt(e.peak, this.locale)}</span></span>
              <span class="row"><span>Share of PV</span><span>${lt(e.share, this.locale)}</span></span>
              ${i !== void 0 && i < 0.95 ? E`<span class="warn">Covers ${ua(i, this.locale)} of the period</span>` : F}
            </div>`;
    })}
        </div>
        <ia-chart .option=${t1(r, ut.pv)}></ia-chart>
        ${t < 0.95 ? E`<p class="warn">
              All strings had data at the same moment for only
              ${ua(t, this.locale)} of the period, so the shares are of
              that time rather than the whole window.
            </p>` : F}
        <p class="note">
          A string consistently below its neighbour points at shading, a different orientation or
          a fault. Compare mean rather than peak: peaks coincide, averages do not.
        </p>
      </section>
    `;
  }
};
Cn.styles = [pc, Xe`:host { display: block; }`];
Sl([
  pt({ attribute: !1 })
], Cn.prototype, "strings", 2);
Sl([
  pt({ attribute: !1 })
], Cn.prototype, "series", 2);
Sl([
  pt({ type: String })
], Cn.prototype, "locale", 2);
Cn = Sl([
  pr("ia-strings-section")
], Cn);
var TL = Object.defineProperty, CL = Object.getOwnPropertyDescriptor, $r = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? CL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && TL(t, e, n), n;
};
let Ye = class extends ee {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.requestId = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.themeObserver = new MutationObserver(() => this.requestUpdate()), this.themeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["style"]
    });
  }
  disconnectedCallback() {
    this.themeObserver?.disconnect(), this.themeObserver = void 0, super.disconnectedCallback();
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = zs(this.range, /* @__PURE__ */ new Date()), i = await V_(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = Wa(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  /**
   * A total and its parts that cannot both be right.
   *
   * Phrased as a question rather than a verdict: a legitimate installation can
   * have a total that covers more than the parts, so this is evidence the user
   * should look at, not a fault we have proved.
   */
  renderConsistency(r, t, e) {
    if (!r?.beyond_margin) return F;
    const i = this.hass.locale.language;
    return E`<span class="warn">
      ${t} averages ${mt(r.total_mean, i)} while ${e} add up to
      ${mt(r.parts_mean, i)}. Is one of them mapped to the wrong sensor?
    </span>`;
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = (n) => n === null ? "" : lt(n / r.rated_power, t) + " of rated", i = [
      ["Mean", mt(r.kpi.mean, t), e(r.kpi.mean)],
      ["Median", mt(r.kpi.median, t), ""],
      ["P95", mt(r.kpi.p95, t), ""],
      ["Peak", mt(r.kpi.max, t), e(r.kpi.max)],
      ["Sustained 15 min", mt(r.kpi.max_sustained_15m, t), ""],
      [">80% of rated", lt(r.kpi.fraction_above_80pct, t), "of time"]
    ];
    return E`<div class="kpi">
      ${i.map(
      ([n, a, o]) => E`<div class="cell">
          <span class="label">${n}</span>
          <span class="value">${a}</span>
          <span class="hint">${o}</span>
        </div>`
    )}
    </div>`;
  }
  renderOverloads(r) {
    if (!r.overloads.length)
      return E`<p class="empty">No overloads in this period.</p>`;
    const t = this.hass.locale.language;
    return E`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Peak</th></tr>
      </thead>
      <tbody>
        ${r.overloads.map(
      (e) => E`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${nn(e.seconds)}</td>
            <td>${mt(e.peak, t)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    if (this.error)
      return E`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return E`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language;
    return E`
      <div class="status">
        <span class="badge">${sf(r.precision, r.boundary, t)}</span>
        ${ls(r.coverage, t) ? E`<span class="warn">${ls(r.coverage, t)}</span>` : F}
        ${r.clamped ? E`<span class="warn">Period shortened to the maximum allowed</span>` : F}
        ${r.histogram.clipped_low_seconds + r.histogram.clipped_high_seconds > 0 ? E`<span class="warn">
              Some values fell outside the histogram range and are shown in its edge buckets
            </span>` : F}
        ${this.renderConsistency(r.consistency.load, "Total load", "the phases")}
        ${this.renderConsistency(r.consistency.pv, "Total PV power", "the strings")}
        ${this.loading ? E`<span class="warn">Refreshing…</span>` : F}
      </div>

      ${this.renderKpi(r)}

      <section>
        <header>
          <h2>Time spent at each power level</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? "as % of rated" : "in watts"}</button>
        </header>
        <ia-chart .option=${K_(r, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Load duration curve</h2>
        <ia-chart .option=${Q_(r)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across rated-power bands</h2>
        <ia-chart .option=${j_(r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Overload episodes</h2>
        ${this.renderOverloads(r)}
      </section>

      ${r.phases ? E`<ia-phases-section
            .phases=${r.phases}
            .series=${r.series}
            .locale=${t}
          ></ia-phases-section>` : F}

      ${r.strings ? E`<ia-strings-section
            .strings=${r.strings}
            .series=${r.series}
            .locale=${t}
          ></ia-strings-section>` : F}
    `;
  }
};
Ye.styles = Xe`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .cell {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label { font-size: 12px; color: var(--secondary-text-color); }
    .value { font-size: 22px; font-weight: 500; }
    .hint { font-size: 12px; color: var(--secondary-text-color); }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    section header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    section header h2 { margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    .empty { color: var(--secondary-text-color); margin: 0; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
$r([
  pt({ attribute: !1 })
], Ye.prototype, "hass", 2);
$r([
  pt({ type: String })
], Ye.prototype, "entryId", 2);
$r([
  pt({ type: String })
], Ye.prototype, "range", 2);
$r([
  It()
], Ye.prototype, "payload", 2);
$r([
  It()
], Ye.prototype, "error", 2);
$r([
  It()
], Ye.prototype, "loading", 2);
$r([
  It()
], Ye.prototype, "mode", 2);
Ye = $r([
  pr("ia-load-tab")
], Ye);
var ML = Object.defineProperty, DL = Object.getOwnPropertyDescriptor, Li = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? DL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && ML(t, e, n), n;
};
let vr = class extends ee {
  constructor() {
    super(...arguments), this.range = "year", this.loading = !1, this.requestId = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.themeObserver = new MutationObserver(() => this.requestUpdate()), this.themeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["style"]
    });
  }
  disconnectedCallback() {
    this.themeObserver?.disconnect(), this.themeObserver = void 0, super.disconnectedCallback();
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = zs(this.range, /* @__PURE__ */ new Date()), i = await G_(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = Wa(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderMonthTable(r) {
    const t = this.hass.locale.language, e = r.months.map((i) => i.key);
    return E`<table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Mean load</th>
          <th>Busiest hour</th>
          ${r.has_pv ? E`<th>Mean PV</th>` : F}
          <th>Of the month</th>
        </tr>
      </thead>
      <tbody>
        ${r.months.map(
      (i, n) => E`<tr class=${i.complete ? "" : "partial"}>
            <td>${lf(i.key, e[n - 1])}</td>
            <td>${mt(i.load_mean, t)}</td>
            <td>${mt(i.load_peak_hourly, t)}</td>
            ${r.has_pv ? E`<td>${mt(i.pv_mean, t)}</td>` : F}
            <td>${lt(i.coverage, t)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    if (this.error)
      return E`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return E`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language, e = ls(r.coverage, t), i = r.months.filter((a) => !a.complete && a.load_mean !== null), n = r.months.filter((a) => a.load_mean === null);
    return E`
      <div class="status">
        <span class="badge">${sf(r.precision, r.boundary, t)}</span>
        <span class="badge">Months in ${r.timezone}</span>
        ${e ? E`<span class="warn">${e}</span>` : F}
        ${r.clamped ? E`<span class="warn">Period shortened to the maximum allowed</span>` : F}
        ${this.loading ? E`<span class="warn">Refreshing…</span>` : F}
      </div>

      <section>
        <h2>Mean power by month</h2>
        <ia-chart .option=${i1(r.months, r.has_pv)}></ia-chart>
        ${i.length ? E`<p class="note">
              ${i.length === 1 ? E`One month is covered by less than
                    ${lt(r.incomplete_below, t)} of its days and is drawn in
                    grey.` : E`${i.length} months are covered by less than
                    ${lt(r.incomplete_below, t)} of their days and are drawn
                    in grey.`}
              A month the recorder only saw part of is not a lower month; the figures stand, the
              comparison does not.
            </p>` : F}
        ${n.length ? E`<p class="note">
              ${n.length === 1 ? "One month has" : `${n.length} months have`} no recorded
              data at all and ${n.length === 1 ? "carries" : "carry"} no bar. Home Assistant
              keeps long-term statistics only from the moment a sensor starts producing them.
            </p>` : F}
      </section>

      <section>
        <h2>Month by month</h2>
        ${this.renderMonthTable(r)}
        <p class="note">
          "Busiest hour" is the highest hourly average, not the highest load. Beyond the
          recorder's retention Home Assistant keeps only an hourly mean, so a brief peak inside an
          hour has already been averaged away by the time this page sees it.
        </p>
      </section>

      <section>
        <h2>Mean power by hour of day</h2>
        <ia-chart .option=${n1(r.hours, r.has_pv)}></ia-chart>
        <p class="note">
          Averaged across the whole period, so it blends the seasons. The heat map below is the
          same question asked per month.
        </p>
      </section>

      <section>
        <h2>Hour of day, month by month</h2>
        <ia-chart
          .option=${a1(r.cells, r.months)}
          height="420px"
        ></ia-chart>
        <p class="note">
          Where a winter evening peak and a summer midday one stop being two averages and become
          two shapes. Hours with no recorded data are left blank rather than drawn as zero.
        </p>
      </section>
    `;
  }
};
vr.styles = Xe`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    tr.partial td { color: var(--secondary-text-color); }
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 12px 0 0; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
Li([
  pt({ attribute: !1 })
], vr.prototype, "hass", 2);
Li([
  pt({ type: String })
], vr.prototype, "entryId", 2);
Li([
  pt({ type: String })
], vr.prototype, "range", 2);
Li([
  It()
], vr.prototype, "payload", 2);
Li([
  It()
], vr.prototype, "error", 2);
Li([
  It()
], vr.prototype, "loading", 2);
vr = Li([
  pr("ia-seasonality-tab")
], vr);
var AL = Object.defineProperty, IL = Object.getOwnPropertyDescriptor, yr = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? IL(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && AL(t, e, n), n;
};
const LL = "/inverter-analytics", Ag = [
  { id: "load", label: "Load" },
  { id: "battery", label: "Battery" },
  { id: "seasonal", label: "Seasonality" },
  { id: "balance", label: "Balance" }
];
let Pe = class extends ee {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.readLocation = () => {
      const r = q_(
        window.location.pathname,
        window.location.search,
        Ag.map((t) => t.id),
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = r.tab, this.range = r.range, this.entryId = r.entryId;
    }, this.loadConfig = Y_(() => this.requestConfig());
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.hass && this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  willUpdate(r) {
    r.has("hass") && this.hass && !this.config && !this.error && this.loadConfig();
  }
  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  writeLocation(r = !1) {
    const t = Z_(LL, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    r ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await F_(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
    } catch (r) {
      this.error = Wa(r);
    }
  }
  selectTab(r) {
    this.tab = r, this.writeLocation(!0);
  }
  selectRange(r) {
    this.range = r, this.writeLocation();
  }
  selectEntry(r) {
    this.entryId = r, this.writeLocation();
  }
  render() {
    return this.error ? E`<div class="notice">
        Could not load configuration: ${this.error}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          Try again
        </button>
      </div>` : this.config ? this.config.entries.length ? E`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1 ? E`<select
              @change=${(r) => {
      this.selectEntry(r.target.value);
    }}
            >
              ${this.config.entries.map(
      // ?selected on the option, not .value on the select: Lit sets
      // properties before the children exist, so on first render the
      // assignment lands on an empty select and the browser falls
      // back to the first entry. The page then showed one inverter's
      // data under another inverter's name.
      (r) => E`<option
                  value=${r.entry_id}
                  ?selected=${r.entry_id === this.entryId}
                >
                  ${r.title}
                </option>`
    )}
            </select>` : F}
        <div class="ranges">
          ${Og.map(
      (r) => E`<button
              class=${r === this.range ? "active" : ""}
              @click=${() => this.selectRange(r)}
            >${X_[r]}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${Ag.map(
      (r) => E`<button
            class=${r.id === this.tab ? "active" : ""}
            @click=${() => this.selectTab(r.id)}
          >${r.label}</button>`
    )}
      </nav>

      <main>
        ${this.tab === "load" ? E`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : F}
        ${this.tab === "battery" ? E`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>` : F}
        ${this.tab === "seasonal" ? E`<ia-seasonality-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-seasonality-tab>` : F}
        ${this.tab === "balance" ? E`<ia-balance-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-balance-tab>` : F}
      </main>
    ` : E`<div class="notice">
        No inverter is configured yet. Add the Inverter Analytics integration in settings.
      </div>` : E`<div class="notice">Loading…</div>`;
  }
};
Pe.styles = Xe`
    :host {
      display: block;
      padding: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      min-height: 100%;
      box-sizing: border-box;
    }
    .header { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    h1 { font-size: 20px; margin: 0; font-weight: 500; }
    .ranges { display: flex; gap: 4px; margin-left: auto; flex-wrap: wrap; }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
    }
    button.active { border-color: var(--primary-color); color: var(--primary-color); }
    .tabs { display: flex; gap: 4px; margin: 16px 0; flex-wrap: wrap; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    select {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 8px;
      font: inherit;
    }
  `;
yr([
  pt({ attribute: !1 })
], Pe.prototype, "hass", 2);
yr([
  pt({ type: Boolean })
], Pe.prototype, "narrow", 2);
yr([
  pt({ attribute: !1 })
], Pe.prototype, "route", 2);
yr([
  It()
], Pe.prototype, "config", 2);
yr([
  It()
], Pe.prototype, "error", 2);
yr([
  It()
], Pe.prototype, "entryId", 2);
yr([
  It()
], Pe.prototype, "tab", 2);
yr([
  It()
], Pe.prototype, "range", 2);
Pe = yr([
  pr("inverter-analytics-panel")
], Pe);
export {
  Pe as InverterAnalyticsPanel
};

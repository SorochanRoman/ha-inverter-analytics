/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vo = globalThis, dh = vo.ShadowRoot && (vo.ShadyCSS === void 0 || vo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ph = Symbol(), Rf = /* @__PURE__ */ new WeakMap();
let Ip = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ph) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (dh && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Rf.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Rf.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const v0 = (r) => new Ip(typeof r == "string" ? r : r + "", void 0, ph), xr = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new Ip(e, r, ph);
}, d0 = (r, t) => {
  if (dh) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = vo.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, kf = dh ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return v0(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: p0, defineProperty: g0, getOwnPropertyDescriptor: y0, getOwnPropertyNames: m0, getOwnPropertySymbols: _0, getPrototypeOf: b0 } = Object, ns = globalThis, Of = ns.trustedTypes, w0 = Of ? Of.emptyScript : "", S0 = ns.reactiveElementPolyfillSupport, zn = (r, t) => r, Po = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? w0 : null;
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
} }, gh = (r, t) => !p0(r, t), Bf = { attribute: !0, type: String, converter: Po, reflect: !1, useDefault: !1, hasChanged: gh };
Symbol.metadata ??= Symbol("metadata"), ns.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ei = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Bf) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && g0(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = y0(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Bf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const t = b0(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const e = this.properties, i = [...m0(e), ..._0(e)];
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
      for (const n of i) e.unshift(kf(n));
    } else t !== void 0 && e.push(kf(t));
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
    return d0(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Po).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Po;
      this._$Em = n;
      const s = o.fromAttribute(e, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? gh)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
Ei.elementStyles = [], Ei.shadowRootOptions = { mode: "open" }, Ei[zn("elementProperties")] = /* @__PURE__ */ new Map(), Ei[zn("finalized")] = /* @__PURE__ */ new Map(), S0?.({ ReactiveElement: Ei }), (ns.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yh = globalThis, Nf = (r) => r, Io = yh.trustedTypes, Ff = Io ? Io.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Lp = "$lit$", vr = `lit$${Math.random().toFixed(9).slice(2)}$`, Ep = "?" + vr, x0 = `<${Ep}>`, oi = document, ra = () => oi.createComment(""), ia = (r) => r === null || typeof r != "object" && typeof r != "function", mh = Array.isArray, T0 = (r) => mh(r) || typeof r?.[Symbol.iterator] == "function", Vs = `[ 	
\f\r]`, cn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $f = /-->/g, zf = />/g, Mr = RegExp(`>|${Vs}(?:([^\\s"'>=/]+)(${Vs}*=${Vs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hf = /'/g, Gf = /"/g, Rp = /^(?:script|style|textarea|title)$/i, C0 = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), F = C0(1), Xi = Symbol.for("lit-noChange"), X = Symbol.for("lit-nothing"), Vf = /* @__PURE__ */ new WeakMap(), Jr = oi.createTreeWalker(oi, 129);
function kp(r, t) {
  if (!mh(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ff !== void 0 ? Ff.createHTML(t) : t;
}
const D0 = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = cn;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, h, f = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, h = o.exec(l), h !== null); ) v = o.lastIndex, o === cn ? h[1] === "!--" ? o = $f : h[1] !== void 0 ? o = zf : h[2] !== void 0 ? (Rp.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Mr) : h[3] !== void 0 && (o = Mr) : o === Mr ? h[0] === ">" ? (o = n ?? cn, f = -1) : h[1] === void 0 ? f = -2 : (f = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Mr : h[3] === '"' ? Gf : Hf) : o === Gf || o === Hf ? o = Mr : o === $f || o === zf ? o = cn : (o = Mr, n = void 0);
    const c = o === Mr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === cn ? l + x0 : f >= 0 ? (i.push(u), l.slice(0, f) + Lp + l.slice(f) + vr + c) : l + vr + (f === -2 ? s : c);
  }
  return [kp(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class na {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = D0(t, e);
    if (this.el = na.createElement(u, i), Jr.currentNode = this.el.content, e === 2 || e === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (n = Jr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const f of n.getAttributeNames()) if (f.endsWith(Lp)) {
          const v = h[o++], c = n.getAttribute(f).split(vr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: c, ctor: d[1] === "." ? M0 : d[1] === "?" ? P0 : d[1] === "@" ? I0 : as }), n.removeAttribute(f);
        } else f.startsWith(vr) && (l.push({ type: 6, index: a }), n.removeAttribute(f));
        if (Rp.test(n.tagName)) {
          const f = n.textContent.split(vr), v = f.length - 1;
          if (v > 0) {
            n.textContent = Io ? Io.emptyScript : "";
            for (let c = 0; c < v; c++) n.append(f[c], ra()), Jr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(f[v], ra());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ep) l.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = n.data.indexOf(vr, f + 1)) !== -1; ) l.push({ type: 7, index: a }), f += vr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = oi.createElement("template");
    return i.innerHTML = t, i;
  }
}
function qi(r, t, e = r, i) {
  if (t === Xi) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = ia(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = qi(r, n._$AS(r, t.values), n, i)), t;
}
class A0 {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? oi).importNode(e, !0);
    Jr.currentNode = n;
    let a = Jr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ba(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new L0(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = Jr.nextNode(), o++);
    }
    return Jr.currentNode = oi, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ba {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = X, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = qi(this, t, e), ia(t) ? t === X || t == null || t === "" ? (this._$AH !== X && this._$AR(), this._$AH = X) : t !== this._$AH && t !== Xi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : T0(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== X && ia(this._$AH) ? this._$AA.nextSibling.data = t : this.T(oi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = na.createElement(kp(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const a = new A0(n, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Vf.get(t.strings);
    return e === void 0 && Vf.set(t.strings, e = new na(t)), e;
  }
  k(t) {
    mh(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new ba(this.O(ra()), this.O(ra()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Nf(t).nextSibling;
      Nf(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class as {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = X, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = X;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = qi(this, t, e, 0), o = !ia(t) || t !== this._$AH && t !== Xi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = qi(this, s[i + l], e, l), u === Xi && (u = this._$AH[l]), o ||= !ia(u) || u !== this._$AH[l], u === X ? t = X : t !== X && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class M0 extends as {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === X ? void 0 : t;
  }
}
class P0 extends as {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== X);
  }
}
class I0 extends as {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = qi(this, t, e, 0) ?? X) === Xi) return;
    const i = this._$AH, n = t === X && i !== X || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== X && (i === X || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class L0 {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    qi(this, t);
  }
}
const E0 = yh.litHtmlPolyfillSupport;
E0?.(na, ba), (yh.litHtmlVersions ??= []).push("3.3.3");
const R0 = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = n = new ba(t.insertBefore(ra(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _h = globalThis;
class we extends Ei {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = R0(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Xi;
  }
}
we._$litElement$ = !0, we.finalized = !0, _h.litElementHydrateSupport?.({ LitElement: we });
const k0 = _h.litElementPolyfillSupport;
k0?.({ LitElement: we });
(_h.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ci = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O0 = { attribute: !0, type: String, converter: Po, reflect: !1, hasChanged: gh }, B0 = (r = O0, t, e) => {
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
function bt(r) {
  return (t, e) => typeof e == "object" ? B0(r, t, e) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ce(r) {
  return bt({ ...r, state: !0, attribute: !1 });
}
function N0(r) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function F0(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function $0(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
const os = "—";
function _t(r, t) {
  return r === null || Number.isNaN(r) ? os : Math.abs(r) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    r / 1e3
  )} kW` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(r)} W`;
}
function gt(r, t) {
  return r === null || Number.isNaN(r) ? os : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r * 100)}%`;
}
function Hn(r, t) {
  return r === null || Number.isNaN(r) ? os : r <= 0 ? "0%" : r < 1e-3 ? "<0.1%" : gt(r, t);
}
const z0 = 10 * 60;
function Wf(r, t) {
  return r === null || Number.isNaN(r) ? os : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r)} kWh`;
}
function $i(r) {
  if (r < 60) return `${Math.round(r)} s`;
  const t = Math.round(r);
  if (t < z0) {
    const i = t % 60, n = (t - i) / 60;
    return i === 0 ? `${n} min` : `${n} min ${i} s`;
  }
  const e = Math.round(t / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
function bh(r) {
  if (typeof r == "object" && r !== null && "message" in r) {
    const t = r.message;
    if (typeof t == "string" && t) return t;
  }
  return String(r);
}
function Op(r, t, e) {
  return r === "raw" ? "Exact data" : r === "lts" ? "Hourly averages" : t ? `Mixed since ${new Date(t).toLocaleDateString(e)}` : "Mixed";
}
function lu(r, t) {
  return r >= 0.95 ? null : r <= 0 ? "No data for this period" : r < 0.01 ? "Data covers less than 1% of the period" : `Data covers only ${gt(r, t)} of the period`;
}
function H0(r) {
  let t;
  return () => (t ??= r().finally(() => {
    t = void 0;
  }), t);
}
const Bp = ["24h", "7d", "30d", "month", "year"], G0 = {
  "24h": "24 h",
  "7d": "7 days",
  "30d": "30 days",
  month: "This month",
  year: "Year"
}, Da = 24 * 3600 * 1e3, Uf = 60 * 1e3;
function Np(r, t) {
  const e = new Date(Math.floor(t.getTime() / Uf) * Uf);
  switch (r) {
    case "24h":
      return { start: new Date(e.getTime() - Da), end: e };
    case "7d":
      return { start: new Date(e.getTime() - 7 * Da), end: e };
    case "30d":
      return { start: new Date(e.getTime() - 30 * Da), end: e };
    case "month":
      return { start: new Date(e.getFullYear(), e.getMonth(), 1, 0, 0, 0, 0), end: e };
    case "year":
      return { start: new Date(e.getTime() - 365 * Da), end: e };
  }
}
function V0(r, t, e, i) {
  const a = r.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && e.includes(a) ? a : i.tab,
    range: s && Bp.includes(s) ? s : i.range,
    entryId: l || i.entryId
  };
}
function W0(r, t) {
  const e = new URLSearchParams({ range: t.range });
  return t.entryId && e.set("entry", t.entryId), `${r}/${t.tab}?${e.toString()}`;
}
const Jt = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  battery: "#2fa84f",
  overload: "#d64545",
  muted: "#b0b6bf"
};
function vi() {
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
const Qt = (r, t) => Number(r.toFixed(t));
function U0(r, t) {
  const { base: e, axis: i } = vi(), n = r.histogram.buckets, a = n.map(
    (o) => String(t === "watts" ? Qt(o.start, 0) : Qt(o.start / r.rated_power * 100, 1))
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
        data: n.map((o) => Qt(o.fraction * 100, 2)),
        itemStyle: { color: Jt.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Y0(r) {
  const { base: t, axis: e } = vi();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "value", name: "W" },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: Jt.load },
        itemStyle: { color: Jt.load },
        data: r.duration_curve.map((i) => [
          Qt(i.fraction * 100, 2),
          Qt(i.value, 1)
        ])
      }
    ]
  };
}
function X0(r) {
  const { base: t, axis: e } = vi(), i = [...r.bands].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => Qt(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "100+" ? Jt.overload : Jt.load
        }
      }
    ]
  };
}
function q0(r) {
  const { base: t, axis: e } = vi(), i = r.histogram;
  return {
    ...t,
    xAxis: {
      ...e,
      type: "category",
      data: i.map((n) => String(Qt(n.start * 100, 0))),
      name: "% imbalance",
      nameLocation: "end"
    },
    yAxis: { ...e, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: i.map((n) => Qt(n.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (n) => i[n.dataIndex].start >= r.threshold ? Jt.overload : Jt.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Z0(r, t) {
  const { base: e, axis: i } = vi();
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
        data: r.map((n) => n.mean === null ? null : Qt(n.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: "Peak",
        type: "bar",
        data: r.map((n) => n.peak === null ? null : Qt(n.peak, 1)),
        itemStyle: { color: Jt.muted }
      }
    ]
  };
}
function K0(r) {
  const { base: t, axis: e } = vi(), i = r.histogram.buckets;
  return {
    ...t,
    xAxis: {
      ...e,
      type: "category",
      data: i.map((n) => String(Qt(n.start, 0))),
      name: "% charge",
      nameLocation: "end"
    },
    yAxis: { ...e, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: i.map((n) => Qt(n.fraction * 100, 2)),
        // Everything under the configured low mark is the part worth looking
        // at, coloured as a warning rather than left for the reader to compare
        // against a number written elsewhere on the page.
        itemStyle: {
          color: (n) => i[n.dataIndex].end <= r.low_pct ? Jt.overload : Jt.battery
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Q0(r) {
  const { base: t, axis: e } = vi(), i = [...r].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => Qt(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "0-20" ? Jt.overload : Jt.battery
        }
      }
    ]
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
var uu = function(r, t) {
  return uu = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, uu(r, t);
};
function B(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  uu(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var j0 = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), J0 = /* @__PURE__ */ function() {
  function r() {
    this.browser = new j0(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), U = new J0();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (U.wxa = !0, U.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? U.worker = !0 : !U.hasGlobalWindow || "Deno" in window ? (U.node = !0, U.svgSupported = !0) : t_(navigator.userAgent, U);
function t_(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var wh = 12, e_ = "sans-serif", si = wh + "px " + e_, r_ = 20, i_ = 100, n_ = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function a_(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - r_) / i_;
    t[i] = n;
  }
  return t;
}
var o_ = a_(n_), nn = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = nn.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || si), r.measureText(e);
      e = e || "", i = i || si;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || wh, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = o_[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, Fp = an([
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
}, {}), $p = an([
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
}, {}), wa = Object.prototype.toString, ss = Array.prototype, s_ = ss.forEach, l_ = ss.filter, Sh = ss.slice, u_ = ss.map, Yf = function() {
}.constructor, Aa = Yf ? Yf.prototype : null, xh = "__proto__", h_ = 2311;
function zp() {
  return h_++;
}
function Th() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function tt(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = wa.call(r);
  if (e === "[object Array]") {
    if (!Gn(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = tt(r[i]);
    }
  } else if ($p[e]) {
    if (!Gn(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!Fp[e] && !Gn(r) && !aa(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== xh && (t[o] = tt(r[o]));
  }
  return t;
}
function it(r, t, e) {
  if (!G(t) || !G(r))
    return e ? tt(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== xh) {
      var n = r[i], a = t[i];
      G(a) && G(n) && !$(a) && !$(n) && !aa(a) && !aa(n) && !Xf(a) && !Xf(n) && !Gn(a) && !Gn(n) ? it(n, a, e) : (e || !(i in r)) && (r[i] = tt(t[i]));
    }
  return r;
}
function O(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== xh && (r[e] = t[e]);
  return r;
}
function at(r, t, e) {
  for (var i = dt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function ut(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function f_(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function Ne(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    at(r, t);
}
function Wt(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function D(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === s_)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function W(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Ch(r);
  if (r.map && r.map === u_)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function an(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function Dt(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Ch(r);
  if (r.filter && r.filter === l_)
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
function c_(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(Sh.call(arguments)));
  };
}
var vt = Aa && q(Aa.bind) ? Aa.call.bind(Aa.bind) : c_;
function St(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(Sh.call(arguments)));
  };
}
function $(r) {
  return Array.isArray ? Array.isArray(r) : wa.call(r) === "[object Array]";
}
function q(r) {
  return typeof r == "function";
}
function z(r) {
  return typeof r == "string";
}
function hu(r) {
  return wa.call(r) === "[object String]";
}
function ft(r) {
  return typeof r == "number";
}
function G(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Xf(r) {
  return !!Fp[wa.call(r)];
}
function Ut(r) {
  return !!$p[wa.call(r)];
}
function aa(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function ls(r) {
  return r.colorStops != null;
}
function v_(r) {
  return r.image != null;
}
function Lo(r) {
  return r !== r;
}
function oa() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function Q(r, t) {
  return r ?? t;
}
function po(r, t, e) {
  return r ?? t ?? e;
}
function Ch(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return Sh.apply(r, t);
}
function Hp(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function Ze(r, t) {
  if (!r)
    throw new Error(t);
}
function Ie(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Gp = "__ec_primitive__";
function fu(r) {
  r[Gp] = !0;
}
function Gn(r) {
  return r[Gp];
}
var d_ = function() {
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
}(), Vp = typeof Map == "function";
function p_() {
  return Vp ? /* @__PURE__ */ new Map() : new d_();
}
var g_ = function() {
  function r(t) {
    var e = $(t);
    this.data = p_();
    var i = this;
    t instanceof r ? t.each(n) : t && D(t, n);
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
    return Vp ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function K(r) {
  return new g_(r);
}
function y_(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function us(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && O(e, t), e;
}
function Wp(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function li(r, t) {
  return r.hasOwnProperty(t);
}
function Vt() {
}
var m_ = 180 / Math.PI;
function on(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function __(r) {
  return [r[0], r[1]];
}
function qf(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function b_(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function w_(r) {
  return Math.sqrt(S_(r));
}
function S_(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Ws(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function x_(r, t) {
  var e = w_(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function cu(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var T_ = cu;
function C_(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var zi = C_;
function fe(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Oi(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Bi(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var yi = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), D_ = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new yi(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new yi(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new yi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new yi(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new yi(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new yi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), Fe = function() {
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
}(), A_ = Math.log(2);
function vu(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / A_);
    return r[e][l];
  }
  for (var u = i | 1 << e, h = e + 1; i & 1 << h; )
    h++;
  for (var f = 0, v = 0, c = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (f += (c % 2 ? -1 : 1) * r[e][v] * vu(r, t - 1, h, u, n | d, a), c++);
  }
  return a[o] = f, f;
}
function Zf(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = vu(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * vu(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, h) {
      var f = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / f, l[1] = (u * a[3] + h * a[4] + a[5]) / f;
    };
  }
}
var Kf = "___zrEVENTSAVED", Us = [];
function M_(r, t, e, i, n) {
  return du(Us, t, i, n, !0) && du(r, e, Us[0], Us[1]);
}
function du(r, t, e, i, n) {
  if (t.getBoundingClientRect && U.domSupported && !Up(t)) {
    var a = t[Kf] || (t[Kf] = {}), o = P_(t, a), s = I_(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function P_(r, t) {
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
function I_(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = r[u].getBoundingClientRect(), f = 2 * u, v = h.left, c = h.top;
    o.push(v, c), l = l && a && v === a[f] && c === a[f + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Zf(s, o) : Zf(o, s));
}
function Up(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var L_ = /([&<>"'])/g, E_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function $t(r) {
  return r == null ? "" : (r + "").replace(L_, function(t, e) {
    return E_[e];
  });
}
var R_ = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ys = [], k_ = U.browser.firefox && +U.browser.version.split(".")[0] < 39;
function pu(r, t, e, i) {
  return e = e || {}, i ? Qf(r, t, e) : k_ && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Qf(r, t, e), e;
}
function Qf(r, t, e) {
  if (U.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Up(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (du(Ys, r, i, n)) {
      e.zrX = Ys[0], e.zrY = Ys[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function Dh(r) {
  return r || window.event;
}
function ne(r, t, e) {
  if (t = Dh(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && pu(r, o, t, e);
  } else {
    pu(r, t, t, e);
    var a = O_(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && R_.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function O_(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function B_(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function N_(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Yp = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, F_ = function() {
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
        var l = n[o], u = pu(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Xs)
      if (Xs.hasOwnProperty(e)) {
        var i = Xs[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function jf(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function $_(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Xs = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = jf(i) / jf(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = $_(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function Hi() {
  return [1, 0, 0, 1, 0, 0];
}
function Ah(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function z_(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function Gi(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function gu(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function Mh(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(e), f = Math.cos(e);
  return r[0] = n * f + s * h, r[1] = -n * h + s * f, r[2] = a * f + l * h, r[3] = -a * h + f * l, r[4] = f * (o - i[0]) + h * (u - i[1]) + i[0], r[5] = f * (u - i[1]) - h * (o - i[0]) + i[1], r;
}
function H_(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function Ph(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var ht = function() {
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
}(), Ma = Math.min, Pa = Math.max, Pr = new ht(), Ir = new ht(), Lr = new ht(), Er = new ht(), vn = new ht(), dn = new ht(), nt = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = Ma(t.x, this.x), i = Ma(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Pa(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Pa(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = Hi();
    return gu(a, a, [-e.x, -e.y]), H_(a, a, [i, n]), gu(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, h = t.y, f = t.y + t.height, v = !(a < l || u < n || s < h || f < o);
    if (e) {
      var c = 1 / 0, d = 0, g = Math.abs(a - l), p = Math.abs(u - n), y = Math.abs(s - h), m = Math.abs(f - o), _ = Math.min(g, p), b = Math.min(y, m);
      a < l || u < n ? _ > d && (d = _, g < p ? ht.set(dn, -g, 0) : ht.set(dn, p, 0)) : _ < c && (c = _, g < p ? ht.set(vn, g, 0) : ht.set(vn, -p, 0)), s < h || f < o ? b > d && (d = b, y < m ? ht.set(dn, 0, -y) : ht.set(dn, 0, m)) : _ < c && (c = _, y < m ? ht.set(vn, 0, y) : ht.set(vn, 0, -m));
    }
    return e && ht.copy(e, v ? vn : dn), v;
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
    Pr.x = Lr.x = e.x, Pr.y = Er.y = e.y, Ir.x = Er.x = e.x + e.width, Ir.y = Lr.y = e.y + e.height, Pr.transform(i), Er.transform(i), Ir.transform(i), Lr.transform(i), t.x = Ma(Pr.x, Ir.x, Lr.x, Er.x), t.y = Ma(Pr.y, Ir.y, Lr.y, Er.y);
    var l = Pa(Pr.x, Ir.x, Lr.x, Er.x), u = Pa(Pr.y, Ir.y, Lr.y, Er.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
}(), Xp = "silent";
function G_(r, t, e) {
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
    stop: V_
  };
}
function V_() {
  Yp(this.event);
}
var W_ = function(r) {
  B(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(Fe), pn = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), U_ = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], qs = new nt(0, 0, 0, 0), qp = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new pn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new W_(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new D_(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (D(U_, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = Zp(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new pn(i, n) : this.findHover(i, n), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new pn(0, 0);
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
      for (var o = "on" + i, s = G_(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new pn(e, i);
    if (Jf(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new nt(e - u, i - u, l, l), f = a.length - 1; f >= 0; f--) {
        var v = a[f];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (qs.copy(v.getBoundingRect()), v.transform && qs.applyTransform(v.transform), qs.intersect(h) && s.push(v));
      }
      if (s.length)
        for (var c = 4, d = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += c)
          for (var y = 0; y < g; y += d) {
            var m = e + p * Math.cos(y), _ = i + p * Math.sin(y);
            if (Jf(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new F_());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new pn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(Fe);
D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  qp.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = Zp(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || T_(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function Y_(r, t, e) {
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
    return n ? Xp : !0;
  }
  return !1;
}
function Jf(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = Y_(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Xp)) {
      t.target = o;
      break;
    }
  }
}
function Zp(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Kp = 32, gn = 7;
function X_(r) {
  for (var t = 0; r >= Kp; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function tc(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    q_(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function q_(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function ec(r, t, e, i, n) {
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
function Zs(r, t, e, i, n, a) {
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
function Ks(r, t, e, i, n, a) {
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
function Z_(r, t) {
  var e = gn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(c, d) {
    i[a] = c, n[a] = d, a += 1;
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
    var d = i[c], g = n[c], p = i[c + 1], y = n[c + 1];
    n[c] = g + y, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var m = Ks(r[p], r, d, g, 0, t);
    d += m, g -= m, g !== 0 && (y = Zs(r[d + g - 1], r, p, y, y - 1, t), y !== 0 && (g <= y ? f(d, g, p, y) : v(d, g, p, y)));
  }
  function f(c, d, g, p) {
    var y = 0;
    for (y = 0; y < d; y++)
      o[y] = r[c + y];
    var m = 0, _ = g, b = c;
    if (r[b++] = r[_++], --p === 0) {
      for (y = 0; y < d; y++)
        r[b + y] = o[m + y];
      return;
    }
    if (d === 1) {
      for (y = 0; y < p; y++)
        r[b + y] = r[_ + y];
      r[b + p] = o[m];
      return;
    }
    for (var S = e, w, x, C; ; ) {
      w = 0, x = 0, C = !1;
      do
        if (t(r[_], o[m]) < 0) {
          if (r[b++] = r[_++], x++, w = 0, --p === 0) {
            C = !0;
            break;
          }
        } else if (r[b++] = o[m++], w++, x = 0, --d === 1) {
          C = !0;
          break;
        }
      while ((w | x) < S);
      if (C)
        break;
      do {
        if (w = Ks(r[_], o, m, d, 0, t), w !== 0) {
          for (y = 0; y < w; y++)
            r[b + y] = o[m + y];
          if (b += w, m += w, d -= w, d <= 1) {
            C = !0;
            break;
          }
        }
        if (r[b++] = r[_++], --p === 0) {
          C = !0;
          break;
        }
        if (x = Zs(o[m], r, _, p, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            r[b + y] = r[_ + y];
          if (b += x, _ += x, p -= x, p === 0) {
            C = !0;
            break;
          }
        }
        if (r[b++] = o[m++], --d === 1) {
          C = !0;
          break;
        }
        S--;
      } while (w >= gn || x >= gn);
      if (C)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (e = S, e < 1 && (e = 1), d === 1) {
      for (y = 0; y < p; y++)
        r[b + y] = r[_ + y];
      r[b + p] = o[m];
    } else {
      if (d === 0)
        throw new Error();
      for (y = 0; y < d; y++)
        r[b + y] = o[m + y];
    }
  }
  function v(c, d, g, p) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = r[g + y];
    var m = c + d - 1, _ = p - 1, b = g + p - 1, S = 0, w = 0;
    if (r[b--] = r[m--], --d === 0) {
      for (S = b - (p - 1), y = 0; y < p; y++)
        r[S + y] = o[y];
      return;
    }
    if (p === 1) {
      for (b -= d, m -= d, w = b + 1, S = m + 1, y = d - 1; y >= 0; y--)
        r[w + y] = r[S + y];
      r[b] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var C = 0, A = 0, M = !1;
      do
        if (t(o[_], r[m]) < 0) {
          if (r[b--] = r[m--], C++, A = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (r[b--] = o[_--], A++, C = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((C | A) < x);
      if (M)
        break;
      do {
        if (C = d - Ks(o[_], r, c, d, d - 1, t), C !== 0) {
          for (b -= C, m -= C, d -= C, w = b + 1, S = m + 1, y = C - 1; y >= 0; y--)
            r[w + y] = r[S + y];
          if (d === 0) {
            M = !0;
            break;
          }
        }
        if (r[b--] = o[_--], --p === 1) {
          M = !0;
          break;
        }
        if (A = p - Zs(r[m], o, 0, p, p - 1, t), A !== 0) {
          for (b -= A, _ -= A, p -= A, w = b + 1, S = _ + 1, y = 0; y < A; y++)
            r[w + y] = o[S + y];
          if (p <= 1) {
            M = !0;
            break;
          }
        }
        if (r[b--] = r[m--], --d === 0) {
          M = !0;
          break;
        }
        x--;
      } while (C >= gn || A >= gn);
      if (M)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), p === 1) {
      for (b -= d, m -= d, w = b + 1, S = m + 1, y = d - 1; y >= 0; y--)
        r[w + y] = r[S + y];
      r[b] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (S = b - (p - 1), y = 0; y < p; y++)
        r[S + y] = o[y];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function go(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Kp) {
      a = tc(r, e, i, t), ec(r, e, i, e + a, t);
      return;
    }
    var o = Z_(r, t), s = X_(n);
    do {
      if (a = tc(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), ec(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Kt = 1, Rn = 2, Ri = 4, rc = !1;
function Qs() {
  rc || (rc = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function ic(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var K_ = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = ic;
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
    i.length = this._displayListLen, go(i, ic);
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
          t.__dirty && (u.__dirty |= Kt), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        e && e.length ? h.__clipPaths = e : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (Qs(), h.z = 0), isNaN(h.z2) && (Qs(), h.z2 = 0), isNaN(h.zlevel) && (Qs(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
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
    var n = ut(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
}(), Eo;
Eo = U.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var Vn = {
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
    return 1 - Vn.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? Vn.bounceIn(r * 2) * 0.5 : Vn.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, Ia = Math.pow, gr = Math.sqrt, Ro = 1e-8, Qp = 1e-4, nc = gr(3), La = 1 / 3, Pe = on(), se = on(), Vi = on();
function dr(r) {
  return r > -Ro && r < Ro;
}
function jp(r) {
  return r > Ro || r < -Ro;
}
function At(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function ac(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function ko(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, h = s * s - 3 * o * l, f = s * l - 9 * o * u, v = l * l - 3 * s * u, c = 0;
  if (dr(h) && dr(f))
    if (dr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[c++] = d);
    }
  else {
    var g = f * f - 4 * h * v;
    if (dr(g)) {
      var p = f / h, d = -s / o + p, y = -p / 2;
      d >= 0 && d <= 1 && (a[c++] = d), y >= 0 && y <= 1 && (a[c++] = y);
    } else if (g > 0) {
      var m = gr(g), _ = h * s + 1.5 * o * (-f + m), b = h * s + 1.5 * o * (-f - m);
      _ < 0 ? _ = -Ia(-_, La) : _ = Ia(_, La), b < 0 ? b = -Ia(-b, La) : b = Ia(b, La);
      var d = (-s - (_ + b)) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d);
    } else {
      var S = (2 * h * s - 3 * o * f) / (2 * gr(h * h * h)), w = Math.acos(S) / 3, x = gr(h), C = Math.cos(w), d = (-s - 2 * x * C) / (3 * o), y = (-s + x * (C + nc * Math.sin(w))) / (3 * o), A = (-s + x * (C - nc * Math.sin(w))) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d), y >= 0 && y <= 1 && (a[c++] = y), A >= 0 && A <= 1 && (a[c++] = A);
    }
  }
  return c;
}
function Jp(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (dr(o)) {
    if (jp(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = a * a - 4 * o * s;
    if (dr(h))
      n[0] = -a / (2 * o);
    else if (h > 0) {
      var f = gr(h), u = (-a + f) / (2 * o), v = (-a - f) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Oo(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, h = (l - s) * n + s, f = (h - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = f, a[4] = f, a[5] = h, a[6] = l, a[7] = i;
}
function Q_(r, t, e, i, n, a, o, s, l, u, h) {
  var f, v = 5e-3, c = 1 / 0, d, g, p, y;
  Pe[0] = l, Pe[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    se[0] = At(r, e, n, o, m), se[1] = At(t, i, a, s, m), p = zi(Pe, se), p < c && (f = m, c = p);
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < Qp); _++)
    d = f - v, g = f + v, se[0] = At(r, e, n, o, d), se[1] = At(t, i, a, s, d), p = zi(se, Pe), d >= 0 && p < c ? (f = d, c = p) : (Vi[0] = At(r, e, n, o, g), Vi[1] = At(t, i, a, s, g), y = zi(Vi, Pe), g <= 1 && y < c ? (f = g, c = y) : v *= 0.5);
  return gr(c);
}
function j_(r, t, e, i, n, a, o, s, l) {
  for (var u = r, h = t, f = 0, v = 1 / l, c = 1; c <= l; c++) {
    var d = c * v, g = At(r, e, n, o, d), p = At(t, i, a, s, d), y = g - u, m = p - h;
    f += Math.sqrt(y * y + m * m), u = g, h = p;
  }
  return f;
}
function zt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function oc(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function J_(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (dr(a)) {
    if (jp(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = o * o - 4 * a * s;
    if (dr(h)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (h > 0) {
      var f = gr(h), u = (-o + f) / (2 * a), v = (-o - f) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function tg(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function Bo(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function t1(r, t, e, i, n, a, o, s, l) {
  var u, h = 5e-3, f = 1 / 0;
  Pe[0] = o, Pe[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    se[0] = zt(r, e, n, v), se[1] = zt(t, i, a, v);
    var c = zi(Pe, se);
    c < f && (u = v, f = c);
  }
  f = 1 / 0;
  for (var d = 0; d < 32 && !(h < Qp); d++) {
    var g = u - h, p = u + h;
    se[0] = zt(r, e, n, g), se[1] = zt(t, i, a, g);
    var c = zi(se, Pe);
    if (g >= 0 && c < f)
      u = g, f = c;
    else {
      Vi[0] = zt(r, e, n, p), Vi[1] = zt(t, i, a, p);
      var y = zi(Vi, Pe);
      p <= 1 && y < f ? (u = p, f = y) : h *= 0.5;
    }
  }
  return gr(f);
}
function e1(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, h = 1 / o, f = 1; f <= o; f++) {
    var v = f * h, c = zt(r, e, n, v), d = zt(t, i, a, v), g = c - s, p = d - l;
    u += Math.sqrt(g * g + p * p), s = c, l = d;
  }
  return u;
}
var r1 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function eg(r) {
  var t = r && r1.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Ie(e[0]), n = +Ie(e[1]), a = +Ie(e[2]), o = +Ie(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : ko(0, i, a, 1, l, s) && At(0, n, o, 1, s[0]);
    };
  }
}
var i1 = function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Vt, this.ondestroy = t.ondestroy || Vt, this.onrestart = t.onrestart || Vt, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = q(t) ? t : Vn[t] || eg(t);
  }, r;
}(), rg = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), n1 = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new rg(t);
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
}(), Sa = function() {
  function r(t) {
    this._list = new n1(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new rg(e), s.key = t, i.insertEntry(s), n[t] = s;
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
}(), sc = {
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
function yr(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function yu(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function js(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? yr(parseFloat(t) / 100 * 255) : yr(parseInt(t, 10));
}
function Wn(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? yu(parseFloat(t) / 100) : yu(parseFloat(t));
}
function Js(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function Ea(r, t, e) {
  return r + (t - r) * e;
}
function ie(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function mu(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var ig = new Sa(20), Ra = null;
function mi(r, t) {
  Ra && mu(Ra, t), Ra = ig.put(r, Ra || t.slice());
}
function Xe(r, t) {
  if (r) {
    t = t || [];
    var e = ig.get(r);
    if (e)
      return mu(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in sc)
      return mu(t, sc[i]), mi(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ie(t, 0, 0, 0, 1);
          return;
        }
        return ie(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), mi(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ie(t, 0, 0, 0, 1);
          return;
        }
        return ie(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), mi(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? ie(t, +u[0], +u[1], +u[2], 1) : ie(t, 0, 0, 0, 1);
          h = Wn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return ie(t, js(u[0]), js(u[1]), js(u[2]), u.length === 3 ? h : Wn(u[3])), mi(r, t), t;
          ie(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ie(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Wn(u[3]), lc(u, t), mi(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            ie(t, 0, 0, 0, 1);
            return;
          }
          return lc(u, t), mi(r, t), t;
        default:
          return;
      }
    }
    ie(t, 0, 0, 0, 1);
  }
}
function lc(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Wn(r[1]), n = Wn(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], ie(t, yr(Js(o, a, e + 1 / 3) * 255), yr(Js(o, a, e) * 255), yr(Js(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function uc(r, t) {
  var e = Xe(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return hs(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function a1(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = Xe(t[n]), s = Xe(t[a]), l = i - n, u = hs([
      yr(Ea(o[0], s[0], l)),
      yr(Ea(o[1], s[1], l)),
      yr(Ea(o[2], s[2], l)),
      yu(Ea(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function hs(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function No(r, t) {
  var e = Xe(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var hc = new Sa(100);
function fc(r) {
  if (z(r)) {
    var t = hc.get(r);
    return t || (t = uc(r, -0.1), hc.put(r, t)), t;
  } else if (ls(r)) {
    var e = O({}, r);
    return e.colorStops = W(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: uc(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function o1(r) {
  return r.type === "linear";
}
function s1(r) {
  return r.type === "radial";
}
(function() {
  return U.hasGlobalWindow && q(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return null;
  };
})();
var _u = Array.prototype.slice;
function Ve(r, t, e) {
  return (t - r) * e + r;
}
function tl(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = Ve(t[a], e[a], i);
  return r;
}
function l1(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = Ve(t[o][s], e[o][s], i);
  }
  return r;
}
function ka(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function cc(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function u1(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function h1(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : _u.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(i[l][h]) && (i[l][h] = n[l][h]);
  }
}
function yo(r) {
  if (Wt(r)) {
    var t = r.length;
    if (Wt(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(_u.call(r[i]));
      return e;
    }
    return _u.call(r);
  }
  return r;
}
function mo(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function f1(r) {
  return Wt(r && r[0]) ? 2 : 1;
}
var Oa = 0, _o = 1, ng = 2, kn = 3, bu = 4, wu = 5, vc = 6;
function dc(r) {
  return r === bu || r === wu;
}
function Ba(r) {
  return r === _o || r === ng;
}
var yn = [0, 0, 0, 0], c1 = function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = vc, l = e;
    if (Wt(e)) {
      var u = f1(e);
      s = u, (u === 1 && !ft(e[0]) || u === 2 && !ft(e[0][0])) && (o = !0);
    } else if (ft(e) && !Lo(e))
      s = Oa;
    else if (z(e))
      if (!isNaN(+e))
        s = Oa;
      else {
        var h = Xe(e);
        h && (l = h, s = kn);
      }
    else if (ls(e)) {
      var f = O({}, l);
      f.colorStops = W(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: Xe(c.color)
        };
      }), o1(e) ? s = bu : s1(e) && (s = wu), l = f;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === vc) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = q(i) ? i : Vn[i] || eg(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Ba(n), u = dc(n), h = 0; h < a; h++) {
      var f = i[h], v = f.value, c = o.value;
      f.percent = f.time / t, s || (l && h !== a - 1 ? h1(v, c, n) : u && u1(v.colorStops, c.colorStops));
    }
    if (!s && n !== wu && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var d = i[0].value, h = 0; h < a; h++)
        n === Oa ? i[h].additiveValue = i[h].value - d : n === kn ? i[h].additiveValue = ka([], i[h].value, d, -1) : Ba(n) && (i[h].additiveValue = n === _o ? ka([], i[h].value, d, -1) : cc([], i[h].value, d, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === kn, h, f = this._lastFr, v = Math.min, c, d;
      if (s === 1)
        c = d = o[0];
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
        d = o[h + 1], c = o[h];
      }
      if (c && d) {
        this._lastFr = h, this._lastFrP = e;
        var p = d.percent - c.percent, y = p === 0 ? 1 : v((e - c.percent) / p, 1);
        d.easingFunc && (y = d.easingFunc(y));
        var m = i ? this._additiveValue : u ? yn : t[l];
        if ((Ba(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? c.rawValue : d.rawValue;
        else if (Ba(a))
          a === _o ? tl(m, c[n], d[n], y) : l1(m, c[n], d[n], y);
        else if (dc(a)) {
          var _ = c[n], b = d[n], S = a === bu;
          t[l] = {
            type: S ? "linear" : "radial",
            x: Ve(_.x, b.x, y),
            y: Ve(_.y, b.y, y),
            colorStops: W(_.colorStops, function(x, C) {
              var A = b.colorStops[C];
              return {
                offset: Ve(x.offset, A.offset, y),
                color: mo(tl([], x.color, A.color, y))
              };
            }),
            global: b.global
          }, S ? (t[l].x2 = Ve(_.x2, b.x2, y), t[l].y2 = Ve(_.y2, b.y2, y)) : t[l].r = Ve(_.r, b.r, y);
        } else if (u)
          tl(m, c[n], d[n], y), i || (t[l] = mo(m));
        else {
          var w = Ve(c[n], d[n], y);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === Oa ? t[i] = t[i] + n : e === kn ? (Xe(t[i], yn), ka(yn, yn, n, 1), t[i] = mo(yn)) : e === _o ? ka(t[i], t[i], n, 1) : e === ng && cc(t[i], t[i], n, 1);
  }, r;
}(), Ih = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      Th("Can' use additive animation on looped animation.");
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
        l = a[s] = new c1(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var f = h.keyframes, v = f[f.length - 1];
          u = v && v.value, h.valType === kn && u && (u = mo(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, yo(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, yo(e[s]), n);
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
        var v = new i1({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var d = e._additiveAnimators;
            if (d) {
              for (var g = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  g = !0;
                  break;
                }
              g || (e._additiveAnimators = null);
            }
            for (var p = 0; p < i.length; p++)
              i[p].step(e._target, c);
            var y = e._onframeCbs;
            if (y)
              for (var p = 0; p < y.length; p++)
                y[p](e._target, c);
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
    return W(this._trackKeys, function(e) {
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
          l && (t[a] = yo(l.rawValue));
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
function Ni() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var v1 = function(r) {
  B(t, r);
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
    for (var i = Ni() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (Eo(i), !e._paused && e.update());
    }
    Eo(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Ni(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Ni(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Ni() - this._pauseStart, this._paused = !1);
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
    var n = new Ih(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(Fe), d1 = 300, el = U.domSupported, rl = function() {
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
  }, i = W(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
}(), pc = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, gc = !1;
function Su(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function p1(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function il(r) {
  r && (r.zrByTouch = !0);
}
function g1(r, t) {
  return ne(r.dom, new y1(r, t), !0);
}
function ag(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var y1 = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Vt, this.stopImmediatePropagation = Vt, this.preventDefault = Vt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), me = {
  mousedown: function(r) {
    r = ne(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = ne(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = ne(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = ne(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    ag(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    gc = !0, r = ne(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    gc || (r = ne(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = ne(this.dom, r), il(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), me.mousemove.call(this, r), me.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = ne(this.dom, r), il(r), this.handler.processGesture(r, "change"), me.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = ne(this.dom, r), il(r), this.handler.processGesture(r, "end"), me.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < d1 && me.click.call(this, r);
  },
  pointerdown: function(r) {
    me.mousedown.call(this, r);
  },
  pointermove: function(r) {
    Su(r) || me.mousemove.call(this, r);
  },
  pointerup: function(r) {
    me.mouseup.call(this, r);
  },
  pointerout: function(r) {
    Su(r) || me.mouseout.call(this, r);
  }
};
D(["click", "dblclick", "contextmenu"], function(r) {
  me[r] = function(t) {
    t = ne(this.dom, t), this.trigger(r, t);
  };
});
var xu = {
  pointermove: function(r) {
    Su(r) || xu.mousemove.call(this, r);
  },
  pointerup: function(r) {
    xu.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function m1(r, t) {
  var e = t.domHandlers;
  U.pointerEventsSupported ? D(rl.pointer, function(i) {
    bo(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (U.touchEventsSupported && D(rl.touch, function(i) {
    bo(t, i, function(n) {
      e[i].call(r, n), p1(t);
    });
  }), D(rl.mouse, function(i) {
    bo(t, i, function(n) {
      n = Dh(n), t.touching || e[i].call(r, n);
    });
  }));
}
function _1(r, t) {
  U.pointerEventsSupported ? D(pc.pointer, e) : U.touchEventsSupported || D(pc.mouse, e);
  function e(i) {
    function n(a) {
      a = Dh(a), ag(r, a.target) || (a = g1(r, a), t.domHandlers[i].call(r, a));
    }
    bo(t, i, n, { capture: !0 });
  }
}
function bo(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, B_(r.domTarget, t, e, i);
}
function nl(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && N_(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var yc = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), b1 = function(r) {
  B(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new yc(e, me), el && (n._globalHandlerScope = new yc(document, xu)), m1(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    nl(this._localHandlerScope), el && nl(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, el && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? _1(this, i) : nl(i);
    }
  }, t;
}(Fe), og = 1;
U.hasGlobalWindow && (og = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Fo = og, Tu = 0.4, Cu = "#333", Du = "#ccc", w1 = "#eee", mc = Ah, _c = 5e-5;
function Rr(r) {
  return r > _c || r < -_c;
}
var kr = [], _i = [], al = Hi(), ol = Math.abs, Lh = function() {
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
    return Rr(this.rotation) || Rr(this.x) || Rr(this.y) || Rr(this.scaleX - 1) || Rr(this.scaleY - 1) || Rr(this.skewX) || Rr(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (mc(i), this.invTransform = null);
      return;
    }
    i = i || Hi(), e ? this.getLocalTransform(i) : mc(i), t && (e ? Gi(i, t, i) : z_(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(kr);
      var i = kr[0] < 0 ? -1 : 1, n = kr[1] < 0 ? -1 : 1, a = ((kr[0] - i) * e + i) / kr[0] || 0, o = ((kr[1] - n) * e + n) / kr[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Hi(), Ph(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || Hi(), Gi(_i, t.invTransform, e), e = _i);
      var i = this.originX, n = this.originY;
      (i || n) && (al[4] = i, al[5] = n, Gi(_i, e, al), _i[4] -= i, _i[5] -= n, e = _i), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && fe(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && fe(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && ol(t[0] - 1) > 1e-10 && ol(t[3] - 1) > 1e-10 ? Math.sqrt(ol(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    S1(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, f = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, g = n + l;
      e[4] = -d * a - v * g * o, e[5] = -g * o - c * d * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = v * o, u && Mh(e, e, u), e[4] += i + h, e[5] += n + f, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), sa = [
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
function S1(r, t) {
  for (var e = 0; e < sa.length; e++) {
    var i = sa[e];
    r[i] = t[i];
  }
}
var bc = {};
function jt(r, t) {
  t = t || si;
  var e = bc[t];
  e || (e = bc[t] = new Sa(500));
  var i = e.get(r);
  return i == null && (i = nn.measureText(r, t).width, e.put(r, i)), i;
}
function wc(r, t, e, i) {
  var n = jt(r, t), a = Rh(t), o = On(0, n, e), s = ki(0, a, i), l = new nt(o, s, n, a);
  return l;
}
function Eh(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return wc(n[0], t, e, i);
  for (var o = new nt(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = wc(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function On(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function ki(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Rh(r) {
  return jt("国", r);
}
function br(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function $o(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, h = "left", f = "top";
  if (i instanceof Array)
    l += br(i[0], e.width), u += br(i[1], e.height), h = null, f = null;
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
var sl = "__zr_normal__", ll = sa.concat(["ignore"]), x1 = an(sa, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), bi = {}, T1 = new nt(0, 0, 0, 0), fs = function() {
  function r(t) {
    this.id = zp(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = T1;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), n || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(bi, i, h) : $o(bi, i, h), a.x = bi.x, a.y = bi.y, o = bi.align, s = bi.verticalAlign;
        var f = i.origin;
        if (f && i.rotation != null) {
          var v = void 0, c = void 0;
          f === "center" ? (v = h.width * 0.5, c = h.height * 0.5) : (v = br(f[0], h.width), c = br(f[1], h.height)), u = !0, a.originX = -a.x + v + (n ? 0 : h.x), a.originY = -a.y + c + (n ? 0 : h.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      g && this.canBeInsideText() ? (y = i.insideFill, m = i.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = i.outsideFill, m = i.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== p.fill || m !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = y, p.stroke = m, p.autoStroke = _, p.align = o, p.verticalAlign = s, e.setDefaultTextStyle(p)), e.__dirty |= Kt, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Du : Cu;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && Xe(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, hs(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, O(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (G(t))
      for (var i = t, n = dt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== sl)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, ll);
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
    this.useState(sl, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === sl, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(ut(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Th("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var f = this._textContent, v = this._textGuide;
        return f && f.useState(t, e, i, h), v && v.useState(t, e, i, h), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Kt), u;
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
      var c = this._mergeStates(n), d = this.stateTransition;
      this.saveCurrentToNormalState(c), this._applyStateObj(t.join(","), c, this._normalState, !1, !e && !this.__inHover && d && d.duration > 0, d);
      var g = this._textContent, p = this._textGuide;
      g && g.useStates(t, e, v), p && p.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Kt);
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
    var e = ut(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = ut(n, t), o = ut(n, e) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = e : i && !o && n.push(e), this.useStates(n);
  }, r.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, r.prototype._mergeStates = function(t) {
    for (var e = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      O(e, a), a.textConfig && (i = i || {}, O(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = O({}, n ? this.textConfig : i.textConfig), O(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, h = 0; h < ll.length; h++) {
      var f = ll[h], v = a && x1[f];
      e && e[f] != null ? v ? (u = !0, l[f] = e[f]) : this[f] = e[f] : s && i[f] != null && (v ? (u = !0, l[f] = i[f]) : this[f] = i[f]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var c = this.animators[h], d = c.targetName;
        c.getLoop() || c.__changeFinalValue(d ? (e || i)[d] : e || i);
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new Lh(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), O(this.textConfig, t), this.markRedraw();
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
    this.__dirty |= Kt;
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
    var n = t ? this[t] : this, a = new Ih(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = ut(a, t);
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
    ul(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    ul(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = ul(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Kt;
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
Ne(fs, Fe);
Ne(fs, Lh);
function ul(r, t, e, i, n) {
  e = e || {};
  var a = [];
  sg(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, f = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(d, g) {
    e.during(g);
  });
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    h && c.done(h), f && c.aborted(f), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function hl(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function C1(r) {
  return Wt(r[0]);
}
function D1(r, t, e) {
  if (Wt(t[e]))
    if (Wt(r[e]) || (r[e] = []), Ut(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), hl(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (C1(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? hl(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        hl(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function A1(r, t) {
  return r === t || Wt(r) && Wt(t) && M1(r, t);
}
function M1(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function sg(r, t, e, i, n, a, o, s) {
  for (var l = dt(i), u = n.duration, h = n.delay, f = n.additive, v = n.setToFinal, c = !G(a), d = r.animators, g = [], p = 0; p < l.length; p++) {
    var y = l[p], m = i[y];
    if (m != null && e[y] != null && (c || a[y]))
      if (G(m) && !Wt(m) && !ls(m)) {
        if (t) {
          s || (e[y] = m, r.updateDuringAnimation(t));
          continue;
        }
        sg(r, y, e[y], m, n, a && a[y], o, s);
      } else
        g.push(y);
    else s || (e[y] = m, r.updateDuringAnimation(t), g.push(y));
  }
  var _ = g.length;
  if (!f && _)
    for (var b = 0; b < d.length; b++) {
      var S = d[b];
      if (S.targetName === t) {
        var w = S.stopTracks(g);
        if (w) {
          var x = ut(d, S);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (g = Dt(g, function(T) {
    return !A1(i[T], e[T]);
  }), _ = g.length), _ > 0 || n.force && !o.length) {
    var C = void 0, A = void 0, M = void 0;
    if (s) {
      A = {}, v && (C = {});
      for (var b = 0; b < _; b++) {
        var y = g[b];
        A[y] = e[y], v ? C[y] = i[y] : e[y] = i[y];
      }
    } else if (v) {
      M = {};
      for (var b = 0; b < _; b++) {
        var y = g[b];
        M[y] = yo(e[y]), D1(e, i, y);
      }
    }
    var S = new Ih(e, !1, !1, f ? Dt(d, function(P) {
      return P.targetName === t;
    }) : null);
    S.targetName = t, n.scope && (S.scope = n.scope), v && C && S.whenWithKeys(0, C, g), M && S.whenWithKeys(0, M, g), S.whenWithKeys(u ?? 500, s ? A : i, g).delay(h || 0), r.addAnimator(S, t), o.push(S);
  }
}
var Mt = function(r) {
  B(t, r);
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
    var n = ut(this._children, e);
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
    var i = this.__zr, n = this._children, a = ut(n, e);
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
    for (var i = new nt(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (nt.applyTransform(i, u, h), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(fs);
Mt.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var wo = {}, lg = {};
function P1(r) {
  delete lg[r];
}
function I1(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return No(r, 1) < Tu;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += No(t[n].color, 1);
    return e /= i, e < Tu;
  }
  return !1;
}
var L1 = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new K_(), o = i.renderer || "canvas";
    wo[o] || (o = dt(wo)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new wo[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !U.node && !U.worker && !l ? new b1(s.getViewportRoot(), s.root) : null, h = i.useCoarsePointer, f = h == null || h === "auto" ? U.touchEventsSupported : !!h, v = 44, c;
    f && (c = Q(i.pointerSize, v)), this.handler = new qp(a, s, u, s.root, c), this.animation = new v1({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = I1(t));
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
    var e, i = Ni();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Ni();
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
        t[e] instanceof Mt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, P1(this.id));
  }, r;
}();
function Sc(r, t) {
  var e = new L1(zp(), r, t);
  return lg[e.id] = e, e;
}
function E1(r, t) {
  wo[r] = t;
}
var xc = 1e-4, ug = 20;
function R1(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function Tc(r, t, e, i) {
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
function Ot(r, t) {
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
  return z(r) ? R1(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function wt(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), ug), r = (+r).toFixed(t), e ? r : +r;
}
function We(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return k1(r);
}
function k1(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function O1(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function B1(r, t) {
  var e = Math.max(We(r), We(t)), i = r + t;
  return e > ug ? i : wt(i, e);
}
function hg(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function zo(r) {
  return r > -xc && r < xc;
}
var N1 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Ke(r) {
  if (r instanceof Date)
    return r;
  if (z(r)) {
    var t = N1.exec(r);
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
function F1(r) {
  return Math.pow(10, kh(r));
}
function kh(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function fg(r, t) {
  var e = kh(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function Ho(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !z(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function $1(r) {
  return !isNaN(Ho(r));
}
function cg() {
  return Math.round(Math.random() * 9);
}
function vg(r, t) {
  return t === 0 ? r : vg(t, r % t);
}
function Cc(r, t) {
  return r == null ? t : t == null ? r : r * t / vg(r, t);
}
function Ht(r) {
  throw new Error(r);
}
function Dc(r, t, e) {
  return (t - r) * e + r;
}
var dg = "series\0", z1 = "\0_ec_\0";
function Bt(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function Ac(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var Mc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function xa(r) {
  return G(r) && !$(r) && !(r instanceof Date) ? r.value : r;
}
function H1(r) {
  return G(r) && !(r instanceof Array);
}
function G1(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = K();
  D(t, function(l, u) {
    if (!G(l)) {
      t[u] = null;
      return;
    }
  });
  var s = V1(r, o, e);
  return (i || n) && W1(s, r, o, t), i && U1(s, t), i || n ? Y1(s, t, n) : a && X1(s, t), q1(s), s;
}
function V1(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || la(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function W1(r, t, e, i) {
  D(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = Un(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        Ze(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function U1(r, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !la(e) && !la(a) && pg("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function Y1(r, t, e) {
  D(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || la(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !pg("id", i, n.existing));
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
function X1(r, t) {
  D(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function q1(r) {
  var t = K();
  D(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), D(r, function(e) {
    var i = e.newOption;
    Ze(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (G(a)) {
      if (o.name = a.name != null ? Un(a.name) : n ? n.name : dg + i, n)
        o.id = Un(n.id);
      else if (a.id != null)
        o.id = Un(a.id);
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
function pg(r, t, e) {
  var i = Ee(t[r], null), n = Ee(e[r], null);
  return i != null && n != null && i === n;
}
function Un(r) {
  return Ee(r, "");
}
function Ee(r, t) {
  return r == null ? t : z(r) ? r : ft(r) || hu(r) ? r + "" : t;
}
function Oh(r) {
  var t = r.name;
  return !!(t && t.indexOf(dg));
}
function la(r) {
  return r && r.id != null && Un(r.id).indexOf(z1) === 0;
}
function Z1(r, t, e) {
  D(r, function(i) {
    var n = i.newOption;
    G(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = K1(t, n, i.existing, e));
  });
}
function K1(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function ui(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return $(t.dataIndex) ? W(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return $(t.name) ? W(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function Tt() {
  var r = "__ec_inner_" + Q1++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var Q1 = cg();
function fl(r, t, e) {
  var i = Bh(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, h) {
    var f = Ta(r, h, u, {
      useDefault: l === h,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[h + "Models"] = f.models, s[h + "Model"] = f.models[0];
  }), s;
}
function Bh(r, t) {
  var e;
  if (z(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = K(), a = {}, o = !1;
  return D(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], h = u[1], f = (u[2] || "").toLowerCase();
    if (!(!h || !f || t && t.includeMainTypes && ut(t.includeMainTypes, h) < 0)) {
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
var be = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function Ta(r, t, e, i) {
  i = i || be;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (Ze(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (Ze(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function gg(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function j1(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function J1(r) {
  return r === "auto" ? U.domSupported ? "html" : "richText" : r || "html";
}
function tb(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (ft(i)) {
    var o = Dc(e || 0, i, n);
    return wt(o, a ? Math.max(We(e || 0), We(i)) : t);
  } else {
    if (z(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, h = Math.max(l ? l.length : 0, u.length), f = 0; f < h; ++f) {
      var v = r.getDimensionInfo(f);
      if (v && v.type === "ordinal")
        s[f] = (n < 1 && l ? l : u)[f];
      else {
        var c = l && l[f] ? l[f] : 0, d = u[f], o = Dc(c, d, n);
        s[f] = wt(o, a ? Math.max(We(c), We(d)) : t);
      }
    }
    return s;
  }
}
var eb = ".", Or = "___EC__COMPONENT__CONTAINER___", yg = "___EC__EXTENDED_CLASS___";
function Le(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(eb);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function rb(r) {
  Ze(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function ib(r) {
  return !!(r && r[yg]);
}
function Nh(r, t) {
  r.$constructor = r, r.extend = function(e) {
    var i = this, n;
    return nb(i) ? n = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, f_(n, this)), O(n.prototype, e), n[yg] = !0, n.extend = this.extend, n.superCall = sb, n.superApply = lb, n.superClass = i, n;
  };
}
function nb(r) {
  return q(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function mg(r, t) {
  r.extend = t.extend;
}
var ab = Math.round(Math.random() * 10);
function ob(r) {
  var t = ["__\0is_clz", ab++].join("_");
  r.prototype[t] = !0, r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function sb(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function lb(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function cs(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      rb(n), i.prototype.type = n;
      var a = Le(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== Or) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[Or] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Le(i), a = [], o = t[n.main];
    return o && o[Or] ? D(o, function(s, l) {
      l !== Or && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Le(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return D(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Le(i), a = t[n.main];
    return a && a[Or];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[Or]) && (n = t[i.main] = {}, n[Or] = !0), n;
  }
}
function ua(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && ut(n, l) >= 0 || a && ut(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var ub = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], hb = ua(ub), fb = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return hb(this, t, e);
    }, r;
  }()
), Au = new Sa(50);
function cb(r) {
  if (typeof r == "string") {
    var t = Au.get(r);
    return t && t.image;
  } else
    return r;
}
function _g(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = Au.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !vs(t) && a.pending.push(o)) : (t = nn.loadImage(r, Pc, Pc), t.__zrImageSrc = r, Au.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function Pc() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function vs(r) {
  return r && r.width && r.height;
}
var cl = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function vb(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = bg(e, i, n, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    wg(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function bg(r, t, e, i) {
  i = i || {};
  var n = O({}, i);
  n.font = t, e = Q(e, "..."), n.maxIterations = Q(i.maxIterations, 2);
  var a = n.minChar = Q(i.minChar, 0);
  n.cnCharWidth = jt("国", t);
  var o = n.ascCharWidth = jt("a", t);
  n.placeholder = Q(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = jt(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function wg(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = jt(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? db(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = jt(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function db(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function pb(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Rh(n), s = Q(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, f = t.width, v;
  f != null && (e === "break" || e === "breakAll") ? v = r ? Sg(r, t.font, f, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var c = v.length * s, d = Q(t.height, c);
  if (c > d && u) {
    var g = Math.floor(d / s);
    h = h || v.length > g, v = v.slice(0, g);
  }
  if (r && a && f != null)
    for (var p = bg(f, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < v.length; m++)
      wg(y, v[m], p), v[m] = y.textLine, h = h || y.isTruncated;
  for (var _ = d, b = 0, m = 0; m < v.length; m++)
    b = Math.max(jt(v[m], n), b);
  f == null && (f = b);
  var S = b;
  return i && (_ += i[0] + i[2], S += i[1] + i[3], f += i[1] + i[3]), l && (S = f), {
    lines: v,
    height: d,
    outerWidth: S,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: b,
    contentHeight: c,
    width: f,
    isTruncated: h
  };
}
var gb = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), Ic = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), yb = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
}();
function mb(r, t) {
  var e = new yb();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = cl.lastIndex = 0, l; (l = cl.exec(r)) != null; ) {
    var u = l.index;
    u > s && vl(e, r.substring(s, u), t, o), vl(e, l[2], t, o, l[1]), s = cl.lastIndex;
  }
  s < r.length && vl(e, r.substring(s, r.length), t, o);
  var h = [], f = 0, v = 0, c = t.padding, d = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function y(V, Z, j) {
    V.width = Z, V.lineHeight = j, f += j, v = Math.max(v, Z);
  }
  t: for (var m = 0; m < e.lines.length; m++) {
    for (var _ = e.lines[m], b = 0, S = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], C = x.styleName && t.rich[x.styleName] || {}, A = x.textPadding = C.padding, M = A ? A[1] + A[3] : 0, T = x.font = C.font || t.font;
      x.contentHeight = Rh(T);
      var P = Q(C.height, x.contentHeight);
      if (x.innerHeight = P, A && (P += A[0] + A[2]), x.height = P, x.lineHeight = po(C.lineHeight, t.lineHeight, P), x.align = C && C.align || t.align, x.verticalAlign = C && C.verticalAlign || "middle", g && n != null && f + x.lineHeight > n) {
        var I = e.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, S, b), e.lines = e.lines.slice(0, m + 1)) : e.lines = e.lines.slice(0, m), e.isTruncated = e.isTruncated || e.lines.length < I;
        break t;
      }
      var L = C.width, E = L == null || L === "auto";
      if (typeof L == "string" && L.charAt(L.length - 1) === "%")
        x.percentWidth = L, h.push(x), x.contentWidth = jt(x.text, T);
      else {
        if (E) {
          var R = C.backgroundColor, H = R && R.image;
          H && (H = cb(H), vs(H) && (x.width = Math.max(x.width, H.width * P / H.height)));
        }
        var k = d && i != null ? i - S : null;
        k != null && k < x.width ? !E || k < M ? (x.text = "", x.width = x.contentWidth = 0) : (vb(p, x.text, k - M, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, e.isTruncated = e.isTruncated || p.isTruncated, x.width = x.contentWidth = jt(x.text, T)) : x.contentWidth = jt(x.text, T);
      }
      x.width += M, S += x.width, C && (b = Math.max(b, x.lineHeight));
    }
    y(_, S, b);
  }
  e.outerWidth = e.width = Q(i, v), e.outerHeight = e.height = Q(n, f), e.contentHeight = f, e.contentWidth = v, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], N = x.percentWidth;
    x.width = parseInt(N, 10) / 100 * e.width;
  }
  return e;
}
function vl(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, h, f;
  if (i) {
    var v = o.padding, c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = br(o.width, i.width) + c;
      s.length > 0 && d + i.accumWidth > i.width && (h = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var g = Sg(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + c, f = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var y = h[p], m = new gb();
    if (m.styleName = n, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = f ? f[p] : jt(y, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Ic())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new Ic([m]));
  }
}
function _b(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var bb = an(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function wb(r) {
  return _b(r) ? !!bb[r] : !0;
}
function Sg(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, f = 0; f < r.length; f++) {
    var v = r.charAt(f);
    if (v === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var c = jt(v, t), d = i ? !1 : !wb(v);
    if (a.length ? h + c > e : n + h + c > e) {
      h ? (s || l) && (d ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += v, u += c, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = v, h = c)) : d ? (a.push(l), o.push(u), l = v, u = c) : (a.push(v), o.push(c));
      continue;
    }
    h += c, d ? (l += v, u += c) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += n), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var Mu = "__zr_style_" + Math.round(Math.random() * 10), ii = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, ds = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
ii[Mu] = !0;
var Lc = ["z", "z2", "invisible"], Sb = ["invisible"], Ca = function(r) {
  B(t, r);
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && xb(this, e, i) || o && !o[0] && !o[3])
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
      e = this._paintRect || (this._paintRect = new nt(0, 0, 0, 0)), i ? nt.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new nt(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : O(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= Rn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & Rn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~Rn;
  }, t.prototype.createStyle = function(e) {
    return us(ii, e);
  }, t.prototype.useStyle = function(e) {
    e[Mu] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Mu];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, Lc);
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
        for (var d = dt(u), v = 0; v < d.length; v++) {
          var c = d[v];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? Sb : Lc, v = 0; v < g.length; v++) {
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
    return O(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return ds;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Kt | Rn;
  }(), t;
}(fs), dl = new nt(0, 0, 0, 0), pl = new nt(0, 0, 0, 0);
function xb(r, t, e) {
  return dl.copy(r.getBoundingRect()), r.transform && dl.applyTransform(r.transform), pl.width = t, pl.height = e, !dl.intersect(pl);
}
var le = Math.min, ue = Math.max, gl = Math.sin, yl = Math.cos, Br = Math.PI * 2, Na = on(), Fa = on(), $a = on();
function Ec(r, t, e, i, n, a) {
  n[0] = le(r, e), n[1] = le(t, i), a[0] = ue(r, e), a[1] = ue(t, i);
}
var Rc = [], kc = [];
function Tb(r, t, e, i, n, a, o, s, l, u) {
  var h = Jp, f = At, v = h(r, e, n, o, Rc);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var c = 0; c < v; c++) {
    var d = f(r, e, n, o, Rc[c]);
    l[0] = le(d, l[0]), u[0] = ue(d, u[0]);
  }
  v = h(t, i, a, s, kc);
  for (var c = 0; c < v; c++) {
    var g = f(t, i, a, s, kc[c]);
    l[1] = le(g, l[1]), u[1] = ue(g, u[1]);
  }
  l[0] = le(r, l[0]), u[0] = ue(r, u[0]), l[0] = le(o, l[0]), u[0] = ue(o, u[0]), l[1] = le(t, l[1]), u[1] = ue(t, u[1]), l[1] = le(s, l[1]), u[1] = ue(s, u[1]);
}
function Cb(r, t, e, i, n, a, o, s) {
  var l = tg, u = zt, h = ue(le(l(r, e, n), 1), 0), f = ue(le(l(t, i, a), 1), 0), v = u(r, e, n, h), c = u(t, i, a, f);
  o[0] = le(r, n, v), o[1] = le(t, a, c), s[0] = ue(r, n, v), s[1] = ue(t, a, c);
}
function Db(r, t, e, i, n, a, o, s, l) {
  var u = Oi, h = Bi, f = Math.abs(n - a);
  if (f % Br < 1e-4 && f > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (Na[0] = yl(n) * e + r, Na[1] = gl(n) * i + t, Fa[0] = yl(a) * e + r, Fa[1] = gl(a) * i + t, u(s, Na, Fa), h(l, Na, Fa), n = n % Br, n < 0 && (n = n + Br), a = a % Br, a < 0 && (a = a + Br), n > a && !o ? a += Br : n < a && o && (n += Br), o) {
    var v = a;
    a = n, n = v;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && ($a[0] = yl(c) * e + r, $a[1] = gl(c) * i + t, u(s, $a, s), h(l, $a, l));
}
var et = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Nr = [], Fr = [], Ce = [], rr = [], De = [], Ae = [], ml = Math.min, _l = Math.max, $r = Math.cos, zr = Math.sin, He = Math.abs, Pu = Math.PI, fr = Pu * 2, bl = typeof Float32Array < "u", mn = [];
function wl(r) {
  var t = Math.round(r / Pu * 1e8) / 1e8;
  return t % 2 * Pu;
}
function Ab(r, t) {
  var e = wl(r[0]);
  e < 0 && (e += fr);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= fr ? n = e + fr : t && e - n >= fr ? n = e - fr : !t && e > n ? n = e + (fr - wl(e - n)) : t && e < n && (n = e - (fr - wl(n - e))), r[0] = e, r[1] = n;
}
var hi = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = He(i / Fo / t) || 0, this._uy = He(i / Fo / e) || 0);
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
    return this._drawPendingPt(), this.addData(et.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = He(t - this._xi), n = He(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(et.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(et.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(et.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), mn[0] = n, mn[1] = a, Ab(mn, o), n = mn[0], a = mn[1];
    var s = a - n;
    return this.addData(et.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = $r(a) * i + t, this._yi = zr(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(et.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(et.Z);
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
    !(this.data && this.data.length === e) && bl && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    bl && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
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
      t instanceof Array && (t.length = this._len, bl && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    Ce[0] = Ce[1] = De[0] = De[1] = Number.MAX_VALUE, rr[0] = rr[1] = Ae[0] = Ae[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case et.M:
          e = n = t[o++], i = a = t[o++], De[0] = n, De[1] = a, Ae[0] = n, Ae[1] = a;
          break;
        case et.L:
          Ec(e, i, t[o], t[o + 1], De, Ae), e = t[o++], i = t[o++];
          break;
        case et.C:
          Tb(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], De, Ae), e = t[o++], i = t[o++];
          break;
        case et.Q:
          Cb(e, i, t[o++], t[o++], t[o], t[o + 1], De, Ae), e = t[o++], i = t[o++];
          break;
        case et.A:
          var u = t[o++], h = t[o++], f = t[o++], v = t[o++], c = t[o++], d = t[o++] + c;
          o += 1;
          var g = !t[o++];
          l && (n = $r(c) * f + u, a = zr(c) * v + h), Db(u, h, f, v, c, d, g, De, Ae), e = $r(d) * f + u, i = zr(d) * v + h;
          break;
        case et.R:
          n = e = t[o++], a = i = t[o++];
          var p = t[o++], y = t[o++];
          Ec(n, a, n + p, a + y, De, Ae);
          break;
        case et.Z:
          e = n, i = a;
          break;
      }
      Oi(Ce, Ce, De), Bi(rr, rr, Ae);
    }
    return o === 0 && (Ce[0] = Ce[1] = rr[0] = rr[1] = 0), new nt(Ce[0], Ce[1], rr[0] - Ce[0], rr[1] - Ce[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, f = 0, v = 0; v < e; ) {
      var c = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var g = -1;
      switch (c) {
        case et.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case et.L: {
          var p = t[v++], y = t[v++], m = p - a, _ = y - o;
          (He(m) > i || He(_) > n || v === e - 1) && (g = Math.sqrt(m * m + _ * _), a = p, o = y);
          break;
        }
        case et.C: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++], w = t[v++], x = t[v++];
          g = j_(a, o, b, S, p, y, w, x, 10), a = w, o = x;
          break;
        }
        case et.Q: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++];
          g = e1(a, o, b, S, p, y, 10), a = p, o = y;
          break;
        }
        case et.A:
          var C = t[v++], A = t[v++], M = t[v++], T = t[v++], P = t[v++], I = t[v++], L = I + P;
          v += 1, d && (s = $r(P) * M + C, l = zr(P) * T + A), g = _l(M, T) * ml(fr, Math.abs(I)), a = $r(L) * M + C, o = zr(L) * T + A;
          break;
        case et.R: {
          s = a = t[v++], l = o = t[v++];
          var E = t[v++], R = t[v++];
          g = E * 2 + R * 2;
          break;
        }
        case et.Z: {
          var m = s - a, _ = l - o;
          g = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[f++] = g, h += g);
    }
    return this._pathLen = h, h;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, h, f, v, c = e < 1, d, g, p = 0, y = 0, m, _ = 0, b, S;
    if (!(c && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, g = this._pathLen, m = e * g, !m)))
      t: for (var w = 0; w < o; ) {
        var x = i[w++], C = w === 1;
        switch (C && (u = i[w], h = i[w + 1], s = u, l = h), x !== et.L && _ > 0 && (t.lineTo(b, S), _ = 0), x) {
          case et.M:
            s = u = i[w++], l = h = i[w++], t.moveTo(u, h);
            break;
          case et.L: {
            f = i[w++], v = i[w++];
            var A = He(f - u), M = He(v - h);
            if (A > n || M > a) {
              if (c) {
                var T = d[y++];
                if (p + T > m) {
                  var P = (m - p) / T;
                  t.lineTo(u * (1 - P) + f * P, h * (1 - P) + v * P);
                  break t;
                }
                p += T;
              }
              t.lineTo(f, v), u = f, h = v, _ = 0;
            } else {
              var I = A * A + M * M;
              I > _ && (b = f, S = v, _ = I);
            }
            break;
          }
          case et.C: {
            var L = i[w++], E = i[w++], R = i[w++], H = i[w++], k = i[w++], N = i[w++];
            if (c) {
              var T = d[y++];
              if (p + T > m) {
                var P = (m - p) / T;
                Oo(u, L, R, k, P, Nr), Oo(h, E, H, N, P, Fr), t.bezierCurveTo(Nr[1], Fr[1], Nr[2], Fr[2], Nr[3], Fr[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo(L, E, R, H, k, N), u = k, h = N;
            break;
          }
          case et.Q: {
            var L = i[w++], E = i[w++], R = i[w++], H = i[w++];
            if (c) {
              var T = d[y++];
              if (p + T > m) {
                var P = (m - p) / T;
                Bo(u, L, R, P, Nr), Bo(h, E, H, P, Fr), t.quadraticCurveTo(Nr[1], Fr[1], Nr[2], Fr[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo(L, E, R, H), u = R, h = H;
            break;
          }
          case et.A:
            var V = i[w++], Z = i[w++], j = i[w++], st = i[w++], ct = i[w++], pt = i[w++], de = i[w++], Dr = !i[w++], gi = j > st ? j : st, qt = He(j - st) > 1e-3, Ct = ct + pt, Y = !1;
            if (c) {
              var T = d[y++];
              p + T > m && (Ct = ct + pt * (m - p) / T, Y = !0), p += T;
            }
            if (qt && t.ellipse ? t.ellipse(V, Z, j, st, de, ct, Ct, Dr) : t.arc(V, Z, gi, ct, Ct, Dr), Y)
              break t;
            C && (s = $r(ct) * j + V, l = zr(ct) * st + Z), u = $r(Ct) * j + V, h = zr(Ct) * st + Z;
            break;
          case et.R:
            s = u = i[w], l = h = i[w + 1], f = i[w++], v = i[w++];
            var J = i[w++], Ar = i[w++];
            if (c) {
              var T = d[y++];
              if (p + T > m) {
                var Rt = m - p;
                t.moveTo(f, v), t.lineTo(f + ml(Rt, J), v), Rt -= J, Rt > 0 && t.lineTo(f + J, v + ml(Rt, Ar)), Rt -= Ar, Rt > 0 && t.lineTo(f + _l(J - Rt, 0), v + Ar), Rt -= J, Rt > 0 && t.lineTo(f, v + _l(Ar - Rt, 0));
                break t;
              }
              p += T;
            }
            t.rect(f, v, J, Ar);
            break;
          case et.Z:
            if (c) {
              var T = d[y++];
              if (p + T > m) {
                var P = (m - p) / T;
                t.lineTo(u * (1 - P) + s * P, h * (1 - P) + l * P);
                break t;
              }
              p += T;
            }
            t.closePath(), u = s, h = l;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = et, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function wi(r, t, e, i, n, a, o) {
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
function Mb(r, t, e, i, n, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var f = l;
  if (h > t + f && h > i + f && h > a + f && h > s + f || h < t - f && h < i - f && h < a - f && h < s - f || u > r + f && u > e + f && u > n + f && u > o + f || u < r - f && u < e - f && u < n - f && u < o - f)
    return !1;
  var v = Q_(r, t, e, i, n, a, o, s, u, h);
  return v <= f / 2;
}
function Pb(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var h = t1(r, t, e, i, n, a, s, l);
  return h <= u / 2;
}
var Oc = Math.PI * 2;
function za(r) {
  return r %= Oc, r < 0 && (r += Oc), r;
}
var _n = Math.PI * 2;
function Ib(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > e || h + u < e)
    return !1;
  if (Math.abs(i - n) % _n < 1e-4)
    return !0;
  if (a) {
    var f = i;
    i = za(n), n = za(f);
  } else
    i = za(i), n = za(n);
  i > n && (n += _n);
  var v = Math.atan2(l, s);
  return v < 0 && (v += _n), v >= i && v <= n || v + _n >= i && v + _n <= n;
}
function Hr(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var ir = hi.CMD, Gr = Math.PI * 2, Lb = 1e-4;
function Eb(r, t) {
  return Math.abs(r - t) < Lb;
}
var kt = [-1, -1, -1], oe = [-1, -1];
function Rb() {
  var r = oe[0];
  oe[0] = oe[1], oe[1] = r;
}
function kb(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var h = ko(t, i, a, s, u, kt);
  if (h === 0)
    return 0;
  for (var f = 0, v = -1, c = void 0, d = void 0, g = 0; g < h; g++) {
    var p = kt[g], y = p === 0 || p === 1 ? 0.5 : 1, m = At(r, e, n, o, p);
    m < l || (v < 0 && (v = Jp(t, i, a, s, oe), oe[1] < oe[0] && v > 1 && Rb(), c = At(t, i, a, s, oe[0]), v > 1 && (d = At(t, i, a, s, oe[1]))), v === 2 ? p < oe[0] ? f += c < t ? y : -y : p < oe[1] ? f += d < c ? y : -y : f += s < d ? y : -y : p < oe[0] ? f += c < t ? y : -y : f += s < c ? y : -y);
  }
  return f;
}
function Ob(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = J_(t, i, a, s, kt);
  if (l === 0)
    return 0;
  var u = tg(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, f = zt(t, i, a, u), v = 0; v < l; v++) {
      var c = kt[v] === 0 || kt[v] === 1 ? 0.5 : 1, d = zt(r, e, n, kt[v]);
      d < o || (kt[v] < u ? h += f < t ? c : -c : h += a < f ? c : -c);
    }
    return h;
  } else {
    var c = kt[0] === 0 || kt[0] === 1 ? 0.5 : 1, d = zt(r, e, n, kt[0]);
    return d < o ? 0 : a < t ? c : -c;
  }
}
function Bb(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  kt[0] = -l, kt[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= Gr - 1e-4) {
    i = 0, n = Gr;
    var h = a ? 1 : -1;
    return o >= kt[0] + r && o <= kt[1] + r ? h : 0;
  }
  if (i > n) {
    var f = i;
    i = n, n = f;
  }
  i < 0 && (i += Gr, n += Gr);
  for (var v = 0, c = 0; c < 2; c++) {
    var d = kt[c];
    if (d + r > o) {
      var g = Math.atan2(s, d), h = a ? 1 : -1;
      g < 0 && (g = Gr + g), (g >= i && g <= n || g + Gr >= i && g + Gr <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), v += h);
    }
  }
  return v;
}
function xg(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, h = 0, f = 0, v, c, d = 0; d < o; ) {
    var g = a[d++], p = d === 1;
    switch (g === ir.M && d > 1 && (e || (s += Hr(l, u, h, f, i, n))), p && (l = a[d], u = a[d + 1], h = l, f = u), g) {
      case ir.M:
        h = a[d++], f = a[d++], l = h, u = f;
        break;
      case ir.L:
        if (e) {
          if (wi(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Hr(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case ir.C:
        if (e) {
          if (Mb(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += kb(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case ir.Q:
        if (e) {
          if (Pb(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Ob(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case ir.A:
        var y = a[d++], m = a[d++], _ = a[d++], b = a[d++], S = a[d++], w = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(S) * _ + y, c = Math.sin(S) * b + m, p ? (h = v, f = c) : s += Hr(l, u, v, c, i, n);
        var C = (i - y) * b / _ + y;
        if (e) {
          if (Ib(y, m, b, S, S + w, x, t, C, n))
            return !0;
        } else
          s += Bb(y, m, b, S, S + w, x, C, n);
        l = Math.cos(S + w) * _ + y, u = Math.sin(S + w) * b + m;
        break;
      case ir.R:
        h = l = a[d++], f = u = a[d++];
        var A = a[d++], M = a[d++];
        if (v = h + A, c = f + M, e) {
          if (wi(h, f, v, f, t, i, n) || wi(v, f, v, c, t, i, n) || wi(v, c, h, c, t, i, n) || wi(h, c, h, f, t, i, n))
            return !0;
        } else
          s += Hr(v, f, v, c, i, n), s += Hr(h, c, h, f, i, n);
        break;
      case ir.Z:
        if (e) {
          if (wi(l, u, h, f, t, i, n))
            return !0;
        } else
          s += Hr(l, u, h, f, i, n);
        l = h, u = f;
        break;
    }
  }
  return !e && !Eb(u, f) && (s += Hr(l, u, h, f, i, n) || 0), s !== 0;
}
function Nb(r, t, e) {
  return xg(r, 0, !1, t, e);
}
function Fb(r, t, e, i) {
  return xg(r, t, !0, e, i);
}
var Tg = at({
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
}, ii), $b = {
  style: at({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, ds.style)
}, Sl = sa.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ot = function(r) {
  B(t, r);
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
      for (var s = 0; s < Sl.length; ++s)
        n[Sl[s]] = this[Sl[s]];
      n.__dirty |= Kt;
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
      o === "style" ? this.style ? O(this.style, s) : this.useStyle(s) : o === "shape" ? O(this.shape, s) : r.prototype.attrKV.call(this, o, s);
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
      if (z(e)) {
        var i = No(e, 0);
        return i > 0.5 ? Cu : i > 0.2 ? w1 : Du;
      } else if (e)
        return Du;
    }
    return Cu;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (z(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = No(e, 0) < Tu;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Ri;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new hi(!1);
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
      (a || this.__dirty & Ri) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), Fb(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return Nb(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Ri, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : O(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & Ri);
  }, t.prototype.createStyle = function(e) {
    return us(Tg, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = O({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = O({}, n.shape), O(u, i.shape)) : (u = O({}, a ? this.shape : n.shape), O(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = O({}, this.shape);
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
    return $b;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = function(a) {
      B(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return e.init && e.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return tt(e.style);
      }, o.prototype.getDefaultShape = function() {
        return tt(e.shape);
      }, o;
    }(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Kt | Rn | Ri;
  }(), t;
}(Ca), zb = at({
  strokeFirst: !0,
  font: si,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Tg), Go = function(r) {
  B(t, r);
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
    return us(zb, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = Eh(i, e.font, e.textAlign, e.textBaseline);
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
}(Ca);
Go.prototype.type = "tspan";
var Hb = at({
  x: 0,
  y: 0
}, ii), Gb = {
  style: at({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, ds.style)
};
function Vb(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var Tr = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return us(Hb, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = Vb(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return Gb;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new nt(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(Ca);
Tr.prototype.type = "image";
function Wb(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, h;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var f;
  s + l > n && (f = s + l, s *= n / f, l *= n / f), u + h > n && (f = u + h, u *= n / f, h *= n / f), l + u > a && (f = l + u, l *= a / f, u *= a / f), s + h > a && (f = s + h, s *= a / f, h *= a / f), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + h, i + a), h !== 0 && r.arc(e + h, i + a - h, h, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var Fi = Math.round;
function Cg(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (Fi(i * 2) === Fi(n * 2) && (r.x1 = r.x2 = ti(i, s, !0)), Fi(a * 2) === Fi(o * 2) && (r.y1 = r.y2 = ti(a, s, !0))), r;
  }
}
function Dg(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = ti(i, s, !0), r.y = ti(n, s, !0), r.width = Math.max(ti(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(ti(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function ti(r, t, e) {
  if (!t)
    return r;
  var i = Fi(r * 2);
  return (i + Fi(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var Ub = /* @__PURE__ */ function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
}(), Yb = {}, xt = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ub();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Dg(Yb, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? Wb(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(ot);
xt.prototype.type = "rect";
var Bc = {
  fill: "#000"
}, Nc = 2, Xb = {
  style: at({
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
  }, ds.style)
}, Yt = function(r) {
  B(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = Bc, i.attr(e), i;
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
    this._childCursor = 0, jb(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
      for (var e = new nt(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || Bc;
  }, t.prototype.setTextContent = function(e) {
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return O(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = dt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, O(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return Xb;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || si, n = e.padding, a = Wc(e), o = pb(a, e), s = xl(e), l = !!e.backgroundColor, u = o.outerHeight, h = o.outerWidth, f = o.contentWidth, v = o.lines, c = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = e.x || 0, p = e.y || 0, y = e.align || d.align || "left", m = e.verticalAlign || d.verticalAlign || "top", _ = g, b = ki(p, o.contentHeight, m);
    if (s || n) {
      var S = On(g, h, y), w = ki(p, u, m);
      s && this._renderBackground(e, e, S, w, h, u);
    }
    b += c / 2, n && (_ = Vc(g, y, n), m === "top" ? b += n[0] : m === "bottom" && (b -= n[2]));
    for (var x = 0, C = !1, A = Gc("fill" in e ? e.fill : (C = !0, d.fill)), M = Hc("stroke" in e ? e.stroke : !l && (!d.autoStroke || C) ? (x = Nc, d.stroke) : null), T = e.textShadowBlur > 0, P = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), I = o.calculatedLineHeight, L = 0; L < v.length; L++) {
      var E = this._getOrCreateChild(Go), R = E.createStyle();
      E.useStyle(R), R.text = v[L], R.x = _, R.y = b, R.textAlign = y, R.textBaseline = "middle", R.opacity = e.opacity, R.strokeFirst = !0, T && (R.shadowBlur = e.textShadowBlur || 0, R.shadowColor = e.textShadowColor || "transparent", R.shadowOffsetX = e.textShadowOffsetX || 0, R.shadowOffsetY = e.textShadowOffsetY || 0), R.stroke = M, R.fill = A, M && (R.lineWidth = e.lineWidth || x, R.lineDash = e.lineDash, R.lineDashOffset = e.lineDashOffset || 0), R.font = i, $c(R, e), b += c, P && E.setBoundingRect(new nt(On(R.x, f, R.textAlign), ki(R.y, I, R.textBaseline), f, I));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = Wc(e), n = mb(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, h = e.y || 0, f = this._defaultStyle, v = e.align || f.align, c = e.verticalAlign || f.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = On(u, o, v), g = ki(h, s, c), p = d, y = g;
    l && (p += l[3], y += l[0]);
    var m = p + a;
    xl(e) && this._renderBackground(e, e, d, g, o, s);
    for (var _ = !!e.backgroundColor, b = 0; b < n.lines.length; b++) {
      for (var S = n.lines[b], w = S.tokens, x = w.length, C = S.lineHeight, A = S.width, M = 0, T = p, P = m, I = x - 1, L = void 0; M < x && (L = w[M], !L.align || L.align === "left"); )
        this._placeToken(L, e, C, y, T, "left", _), A -= L.width, T += L.width, M++;
      for (; I >= 0 && (L = w[I], L.align === "right"); )
        this._placeToken(L, e, C, y, P, "right", _), A -= L.width, P -= L.width, I--;
      for (T += (a - (T - p) - (m - P) - A) / 2; M <= I; )
        L = w[M], this._placeToken(L, e, C, y, T + L.width / 2, "center", _), T += L.width, M++;
      y += C;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var h = e.verticalAlign, f = a + n / 2;
    h === "top" ? f = a + e.height / 2 : h === "bottom" && (f = a + n - e.height / 2);
    var v = !e.isLineHolder && xl(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, f - e.height / 2, e.width, e.height);
    var c = !!u.backgroundColor, d = e.textPadding;
    d && (o = Vc(o, s, d), f -= e.height / 2 - d[0] - e.innerHeight / 2);
    var g = this._getOrCreateChild(Go), p = g.createStyle();
    g.useStyle(p);
    var y = this._defaultStyle, m = !1, _ = 0, b = Gc("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, y.fill)), S = Hc("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !c && !l && (!y.autoStroke || m) ? (_ = Nc, y.stroke) : null), w = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = e.text, p.x = o, p.y = f, w && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = e.font || si, p.opacity = po(u.opacity, i.opacity, 1), $c(p, u), S && (p.lineWidth = po(u.lineWidth, i.lineWidth, _), p.lineDash = Q(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), b && (p.fill = b);
    var x = e.contentWidth, C = e.contentHeight;
    g.setBoundingRect(new nt(On(p.x, x, p.textAlign), ki(p.y, C, p.textBaseline), x, C));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, h = e.borderColor, f = l && l.image, v = l && !f, c = e.borderRadius, d = this, g, p;
    if (v || e.lineHeight || u && h) {
      g = this._getOrCreateChild(xt), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = n, y.y = a, y.width = o, y.height = s, y.r = c, g.dirtyShape();
    }
    if (v) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = Q(e.fillOpacity, 1);
    } else if (f) {
      p = this._getOrCreateChild(Tr), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = Q(e.strokeOpacity, 1), m.lineDash = e.borderDash, m.lineDashOffset = e.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || p).style;
    b.shadowBlur = e.shadowBlur || 0, b.shadowColor = e.shadowColor || "transparent", b.shadowOffsetX = e.shadowOffsetX || 0, b.shadowOffsetY = e.shadowOffsetY || 0, b.opacity = po(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return Qb(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      Kb(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Ie(i) || e.textFont || e.font;
  }, t;
}(Ca), qb = { left: !0, right: 1, center: 1 }, Zb = { top: 1, bottom: 1, middle: 1 }, Fc = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function Kb(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? wh + "px" : r + "px";
}
function $c(r, t) {
  for (var e = 0; e < Fc.length; e++) {
    var i = Fc[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function Qb(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function jb(r) {
  return zc(r), D(r.rich, zc), r;
}
function zc(r) {
  if (r) {
    r.font = Yt.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || qb[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || Zb[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = Hp(r.padding));
  }
}
function Hc(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Gc(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Vc(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function Wc(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function xl(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var rt = Tt(), Jb = function(r, t, e, i) {
  if (i) {
    var n = rt(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = rt(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Uc = 1, Yc = {}, Ag = Tt(), Fh = Tt(), $h = 0, ps = 1, gs = 2, Re = ["emphasis", "blur", "select"], Xc = ["normal", "emphasis", "blur", "select"], tw = 10, ew = 9, ni = "highlight", So = "downplay", Yn = "select", xo = "unselect", Xn = "toggleSelect";
function Si(r) {
  return r != null && r !== "none";
}
function ys(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function Mg(r) {
  ys(r, "emphasis", gs);
}
function Pg(r) {
  r.hoverState === gs && ys(r, "normal", $h);
}
function zh(r) {
  ys(r, "blur", ps);
}
function Ig(r) {
  r.hoverState === ps && ys(r, "normal", $h);
}
function rw(r) {
  r.selected = !0;
}
function iw(r) {
  r.selected = !1;
}
function qc(r, t, e) {
  t(r, e);
}
function Je(r, t, e) {
  qc(r, t, e), r.isGroup && r.traverse(function(i) {
    qc(i, t, e);
  });
}
function Zc(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = gs;
      break;
    case "normal":
      r.hoverState = $h;
      break;
    case "blur":
      r.hoverState = ps;
      break;
    case "select":
      r.selected = !0;
  }
}
function nw(r, t, e, i) {
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
function aw(r, t, e, i) {
  var n = e && ut(e, "select") >= 0, a = !1;
  if (r instanceof ot) {
    var o = Ag(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (Si(s) || Si(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = O({}, i), u = O({}, u), u.fill = s) : !Si(u.fill) && Si(s) ? (a = !0, i = O({}, i), u = O({}, u), u.fill = fc(s)) : !Si(u.stroke) && Si(l) && (a || (i = O({}, i), u = O({}, u)), u.stroke = fc(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = O({}, i));
    var h = r.z2EmphasisLift;
    i.z2 = r.z2 + (h ?? tw);
  }
  return i;
}
function ow(r, t, e) {
  if (e && e.z2 == null) {
    e = O({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? ew);
  }
  return e;
}
function sw(r, t, e) {
  var i = ut(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : nw(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = O({}, e), o = O({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function Tl(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return aw(this, r, t, e);
    if (r === "blur")
      return sw(this, r, e);
    if (r === "select")
      return ow(this, r, e);
  }
  return e;
}
function lw(r) {
  r.stateProxy = Tl;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = Tl), e && (e.stateProxy = Tl);
}
function Kc(r, t) {
  !kg(r, t) && !r.__highByOuter && Je(r, Mg);
}
function Qc(r, t) {
  !kg(r, t) && !r.__highByOuter && Je(r, Pg);
}
function Vo(r, t) {
  r.__highByOuter |= 1 << (t || 0), Je(r, Mg);
}
function Wo(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && Je(r, Pg);
}
function uw(r) {
  Je(r, zh);
}
function Lg(r) {
  Je(r, Ig);
}
function Eg(r) {
  Je(r, rw);
}
function Rg(r) {
  Je(r, iw);
}
function kg(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function Og(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Fh(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      Ig(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), D(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function Iu(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, h) {
    for (var f = 0; f < h.length; f++) {
      var v = u.getItemGraphicEl(h[f]);
      v && Lg(v);
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
        if (c.group.traverse(function(p) {
          p.__highByOuter && h && t === "self" || zh(p);
        }), Wt(t))
          a(u.getData(), t);
        else if (G(t))
          for (var d = dt(t), g = 0; g < d.length; g++)
            a(u.getData(d[g]), t[d[g]]);
        l.push(u), Fh(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, h) {
      if (u !== "series") {
        var f = i.getViewOfComponentModel(h);
        f && f.toggleBlurSeries && f.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function Lu(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      Fh(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        zh(a);
      });
    }
  }
}
function hw(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (n) {
    var a = ui(n, t);
    a = ($(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = rt(o);
      Iu(i, u.focus, u.blurScope, e);
    } else {
      var h = r.get(["emphasis", "focus"]), f = r.get(["emphasis", "blurScope"]);
      h != null && Iu(i, h, f, e);
    }
  }
}
function Hh(r, t, e, i) {
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
    if (rt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function fw(r, t, e) {
  var i = rt(r), n = Hh(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && Lu(i.componentMainType, i.componentIndex, e), D(a, function(s) {
    return Kc(s, t);
  })) : (Iu(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && Lu(i.componentMainType, i.componentIndex, e), Kc(r, t));
}
function cw(r, t, e) {
  Og(e);
  var i = rt(r), n = Hh(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? D(n, function(a) {
    return Qc(a, t);
  }) : Qc(r, t);
}
function vw(r, t, e) {
  if (Ou(t)) {
    var i = t.dataType, n = r.getData(i), a = ui(n, t);
    $(a) || (a = [a]), r[t.type === Xn ? "toggleSelect" : t.type === Yn ? "select" : "unselect"](a, i);
  }
}
function jc(r) {
  var t = r.getAllData();
  D(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? Eg(a) : Rg(a);
    });
  });
}
function dw(r) {
  var t = [];
  return r.eachSeries(function(e) {
    var i = e.getAllData();
    D(i, function(n) {
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
function Eu(r, t, e) {
  Bg(r, !0), Je(r, lw), gw(r, t, e);
}
function pw(r) {
  Bg(r, !1);
}
function Uo(r, t, e, i) {
  i ? pw(r) : Eu(r, t, e);
}
function gw(r, t, e) {
  var i = rt(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var Jc = ["emphasis", "blur", "select"], yw = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Ru(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < Jc.length; n++) {
    var a = Jc[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[yw[e]]();
  }
}
function Bg(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function ku(r) {
  return !!(r && r.__highDownDispatcher);
}
function mw(r) {
  var t = Yc[r];
  return t == null && Uc <= 32 && (t = Yc[r] = Uc++), t;
}
function Ou(r) {
  var t = r.type;
  return t === Yn || t === xo || t === Xn;
}
function tv(r) {
  var t = r.type;
  return t === ni || t === So;
}
function _w(r) {
  var t = Ag(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var xi = hi.CMD, bw = [[], [], []], ev = Math.sqrt, ww = Math.atan2;
function Sw(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, h = xi.M, f = xi.C, v = xi.L, c = xi.R, d = xi.A, g = xi.Q;
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
        case d:
          var p = t[4], y = t[5], m = ev(t[0] * t[0] + t[1] * t[1]), _ = ev(t[2] * t[2] + t[3] * t[3]), b = ww(-t[1] / _, t[0] / m);
          e[o] *= m, e[o++] += p, e[o] *= _, e[o++] += y, e[o++] *= m, e[o++] *= _, e[o++] += b, e[o++] += b, o += 2, s = o;
          break;
        case c:
          u[0] = e[o++], u[1] = e[o++], fe(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], fe(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = bw[l];
        S[0] = e[o++], S[1] = e[o++], fe(S, S, t), e[s++] = S[0], e[s++] = S[1];
      }
    }
    r.increaseVersion();
  }
}
var Cl = Math.sqrt, Ha = Math.sin, Ga = Math.cos, bn = Math.PI;
function rv(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function Bu(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (rv(r) * rv(t));
}
function iv(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(Bu(r, t));
}
function nv(r, t, e, i, n, a, o, s, l, u, h) {
  var f = l * (bn / 180), v = Ga(f) * (r - e) / 2 + Ha(f) * (t - i) / 2, c = -1 * Ha(f) * (r - e) / 2 + Ga(f) * (t - i) / 2, d = v * v / (o * o) + c * c / (s * s);
  d > 1 && (o *= Cl(d), s *= Cl(d));
  var g = (n === a ? -1 : 1) * Cl((o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) / (o * o * (c * c) + s * s * (v * v))) || 0, p = g * o * c / s, y = g * -s * v / o, m = (r + e) / 2 + Ga(f) * p - Ha(f) * y, _ = (t + i) / 2 + Ha(f) * p + Ga(f) * y, b = iv([1, 0], [(v - p) / o, (c - y) / s]), S = [(v - p) / o, (c - y) / s], w = [(-1 * v - p) / o, (-1 * c - y) / s], x = iv(S, w);
  if (Bu(S, w) <= -1 && (x = bn), Bu(S, w) >= 1 && (x = 0), x < 0) {
    var C = Math.round(x / bn * 1e6) / 1e6;
    x = bn * 2 + C % 2 * bn;
  }
  h.addData(u, m, _, o, s, b, x, f, a);
}
var xw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Tw = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Cw(r) {
  var t = new hi();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = hi.CMD, l = r.match(xw);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], f = h.charAt(0), v = void 0, c = h.match(Tw) || [], d = c.length, g = 0; g < d; g++)
      c[g] = parseFloat(c[g]);
    for (var p = 0; p < d; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, C = e, A = i, M = void 0, T = void 0;
      switch (f) {
        case "l":
          e += c[p++], i += c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "L":
          e = c[p++], i = c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "m":
          e += c[p++], i += c[p++], v = s.M, t.addData(v, e, i), n = e, a = i, f = "l";
          break;
        case "M":
          e = c[p++], i = c[p++], v = s.M, t.addData(v, e, i), n = e, a = i, f = "L";
          break;
        case "h":
          e += c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "H":
          e = c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "v":
          i += c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "V":
          i = c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "C":
          v = s.C, t.addData(v, c[p++], c[p++], c[p++], c[p++], c[p++], c[p++]), e = c[p - 2], i = c[p - 1];
          break;
        case "c":
          v = s.C, t.addData(v, c[p++] + e, c[p++] + i, c[p++] + e, c[p++] + i, c[p++] + e, c[p++] + i), e += c[p - 2], i += c[p - 1];
          break;
        case "S":
          y = e, m = i, M = t.len(), T = t.data, o === s.C && (y += e - T[M - 4], m += i - T[M - 3]), v = s.C, C = c[p++], A = c[p++], e = c[p++], i = c[p++], t.addData(v, y, m, C, A, e, i);
          break;
        case "s":
          y = e, m = i, M = t.len(), T = t.data, o === s.C && (y += e - T[M - 4], m += i - T[M - 3]), v = s.C, C = e + c[p++], A = i + c[p++], e += c[p++], i += c[p++], t.addData(v, y, m, C, A, e, i);
          break;
        case "Q":
          C = c[p++], A = c[p++], e = c[p++], i = c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "q":
          C = c[p++] + e, A = c[p++] + i, e += c[p++], i += c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "T":
          y = e, m = i, M = t.len(), T = t.data, o === s.Q && (y += e - T[M - 4], m += i - T[M - 3]), e = c[p++], i = c[p++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "t":
          y = e, m = i, M = t.len(), T = t.data, o === s.Q && (y += e - T[M - 4], m += i - T[M - 3]), e += c[p++], i += c[p++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "A":
          _ = c[p++], b = c[p++], S = c[p++], w = c[p++], x = c[p++], C = e, A = i, e = c[p++], i = c[p++], v = s.A, nv(C, A, e, i, w, x, _, b, S, v, t);
          break;
        case "a":
          _ = c[p++], b = c[p++], S = c[p++], w = c[p++], x = c[p++], C = e, A = i, e += c[p++], i += c[p++], v = s.A, nv(C, A, e, i, w, x, _, b, S, v, t);
          break;
      }
    }
    (f === "z" || f === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var Ng = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(ot);
function Fg(r) {
  return r.setData != null;
}
function $g(r, t) {
  var e = Cw(r), i = O({}, t);
  return i.buildPath = function(n) {
    if (Fg(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    Sw(e, n), this.dirtyShape();
  }, i;
}
function Dw(r, t) {
  return new Ng($g(r, t));
}
function Aw(r, t) {
  var e = $g(r, t), i = function(n) {
    B(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(Ng);
  return i;
}
function Mw(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ot(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (Fg(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var Pw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), ms = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Pw();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(ot);
ms.prototype.type = "circle";
var Iw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), Gh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Iw();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, h = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), e.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), e.closePath();
  }, t;
}(ot);
Gh.prototype.type = "ellipse";
var zg = Math.PI, Dl = zg * 2, Vr = Math.sin, Ti = Math.cos, Lw = Math.acos, Pt = Math.atan2, av = Math.abs, qn = Math.sqrt, Bn = Math.max, Me = Math.min, ye = 1e-4;
function Ew(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = f * l - h * u;
  if (!(v * v < ye))
    return v = (h * (t - a) - f * (r - n)) / v, [r + v * l, t + v * u];
}
function Va(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / qn(s * s + l * l), h = u * l, f = -u * s, v = r + h, c = t + f, d = e + h, g = i + f, p = (v + d) / 2, y = (c + g) / 2, m = d - v, _ = g - c, b = m * m + _ * _, S = n - a, w = v * g - d * c, x = (_ < 0 ? -1 : 1) * qn(Bn(0, S * S * b - w * w)), C = (w * _ - m * x) / b, A = (-w * m - _ * x) / b, M = (w * _ + m * x) / b, T = (-w * m + _ * x) / b, P = C - p, I = A - y, L = M - p, E = T - y;
  return P * P + I * I > L * L + E * E && (C = M, A = T), {
    cx: C,
    cy: A,
    x0: -h,
    y0: -f,
    x1: C * (n / S - 1),
    y1: A * (n / S - 1)
  };
}
function Rw(r) {
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
function kw(r, t) {
  var e, i = Bn(t.r, 0), n = Bn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, f = t.cy, v = !!t.clockwise, c = av(u - l), d = c > Dl && c % Dl;
      if (d > ye && (c = d), !(i > ye))
        r.moveTo(h, f);
      else if (c > Dl - ye)
        r.moveTo(h + i * Ti(l), f + i * Vr(l)), r.arc(h, f, i, l, u, !v), n > ye && (r.moveTo(h + n * Ti(u), f + n * Vr(u)), r.arc(h, f, n, u, l, v));
      else {
        var g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, C = void 0, A = void 0, M = void 0, T = void 0, P = void 0, I = void 0, L = void 0, E = i * Ti(l), R = i * Vr(l), H = n * Ti(u), k = n * Vr(u), N = c > ye;
        if (N) {
          var V = t.cornerRadius;
          V && (e = Rw(V), g = e[0], p = e[1], y = e[2], m = e[3]);
          var Z = av(i - n) / 2;
          if (_ = Me(Z, y), b = Me(Z, m), S = Me(Z, g), w = Me(Z, p), A = x = Bn(_, b), M = C = Bn(S, w), (x > ye || C > ye) && (T = i * Ti(u), P = i * Vr(u), I = n * Ti(l), L = n * Vr(l), c < zg)) {
            var j = Ew(E, R, I, L, T, P, H, k);
            if (j) {
              var st = E - j[0], ct = R - j[1], pt = T - j[0], de = P - j[1], Dr = 1 / Vr(Lw((st * pt + ct * de) / (qn(st * st + ct * ct) * qn(pt * pt + de * de))) / 2), gi = qn(j[0] * j[0] + j[1] * j[1]);
              A = Me(x, (i - gi) / (Dr + 1)), M = Me(C, (n - gi) / (Dr - 1));
            }
          }
        }
        if (!N)
          r.moveTo(h + E, f + R);
        else if (A > ye) {
          var qt = Me(y, A), Ct = Me(m, A), Y = Va(I, L, E, R, i, qt, v), J = Va(T, P, H, k, i, Ct, v);
          r.moveTo(h + Y.cx + Y.x0, f + Y.cy + Y.y0), A < x && qt === Ct ? r.arc(h + Y.cx, f + Y.cy, A, Pt(Y.y0, Y.x0), Pt(J.y0, J.x0), !v) : (qt > 0 && r.arc(h + Y.cx, f + Y.cy, qt, Pt(Y.y0, Y.x0), Pt(Y.y1, Y.x1), !v), r.arc(h, f, i, Pt(Y.cy + Y.y1, Y.cx + Y.x1), Pt(J.cy + J.y1, J.cx + J.x1), !v), Ct > 0 && r.arc(h + J.cx, f + J.cy, Ct, Pt(J.y1, J.x1), Pt(J.y0, J.x0), !v));
        } else
          r.moveTo(h + E, f + R), r.arc(h, f, i, l, u, !v);
        if (!(n > ye) || !N)
          r.lineTo(h + H, f + k);
        else if (M > ye) {
          var qt = Me(g, M), Ct = Me(p, M), Y = Va(H, k, T, P, n, -Ct, v), J = Va(E, R, I, L, n, -qt, v);
          r.lineTo(h + Y.cx + Y.x0, f + Y.cy + Y.y0), M < C && qt === Ct ? r.arc(h + Y.cx, f + Y.cy, M, Pt(Y.y0, Y.x0), Pt(J.y0, J.x0), !v) : (Ct > 0 && r.arc(h + Y.cx, f + Y.cy, Ct, Pt(Y.y0, Y.x0), Pt(Y.y1, Y.x1), !v), r.arc(h, f, n, Pt(Y.cy + Y.y1, Y.cx + Y.x1), Pt(J.cy + J.y1, J.cx + J.x1), v), qt > 0 && r.arc(h + J.cx, f + J.cy, qt, Pt(J.y1, J.x1), Pt(J.y0, J.x0), !v));
        } else
          r.lineTo(h + H, f + k), r.arc(h, f, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var Ow = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), sn = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ow();
  }, t.prototype.buildPath = function(e, i) {
    kw(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(ot);
sn.prototype.type = "sector";
var Bw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), Vh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Bw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(ot);
Vh.prototype.type = "ring";
function Nw(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, h, f;
  if (i) {
    h = [1 / 0, 1 / 0], f = [-1 / 0, -1 / 0];
    for (var v = 0, c = r.length; v < c; v++)
      Oi(h, h, r[v]), Bi(f, f, r[v]);
    Oi(h, h, i[0]), Bi(f, f, i[1]);
  }
  for (var v = 0, c = r.length; v < c; v++) {
    var d = r[v];
    if (e)
      l = r[v ? v - 1 : c - 1], u = r[(v + 1) % c];
    else if (v === 0 || v === c - 1) {
      n.push(__(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    b_(a, u, l), Ws(a, a, t);
    var g = cu(d, l), p = cu(d, u), y = g + p;
    y !== 0 && (g /= y, p /= y), Ws(o, a, -g), Ws(s, a, p);
    var m = qf([], d, o), _ = qf([], d, s);
    i && (Bi(m, m, h), Oi(m, m, f), Bi(_, _, h), Oi(_, _, f)), n.push(m), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function Hg(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Nw(n, i, e, t.smoothConstraint);
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
var Fw = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Wh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Fw();
  }, t.prototype.buildPath = function(e, i) {
    Hg(e, i, !0);
  }, t;
}(ot);
Wh.prototype.type = "polygon";
var $w = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Uh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new $w();
  }, t.prototype.buildPath = function(e, i) {
    Hg(e, i, !1);
  }, t;
}(ot);
Uh.prototype.type = "polyline";
var zw = {}, Hw = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
}(), wr = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Hw();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Cg(zw, i, this.style);
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
}(ot);
wr.prototype.type = "line";
var Nt = [], Gw = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function ov(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? ac : At)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? ac : At)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? oc : zt)(r.x1, r.cpx1, r.x2, t),
    (e ? oc : zt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var Yh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Gw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, h = i.cpx2, f = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), h == null || f == null ? (v < 1 && (Bo(n, l, o, v, Nt), l = Nt[1], o = Nt[2], Bo(a, u, s, v, Nt), u = Nt[1], s = Nt[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Oo(n, l, h, o, v, Nt), l = Nt[1], h = Nt[2], o = Nt[3], Oo(a, u, f, s, v, Nt), u = Nt[1], f = Nt[2], s = Nt[3]), e.bezierCurveTo(l, u, h, f, o, s)));
  }, t.prototype.pointAt = function(e) {
    return ov(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = ov(this.shape, e, !0);
    return x_(i, i);
  }, t;
}(ot);
Yh.prototype.type = "bezier-curve";
var Vw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), _s = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Vw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, h = Math.cos(s), f = Math.sin(s);
    e.moveTo(h * o + n, f * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
}(ot);
_s.prototype.type = "arc";
var Ww = function(r) {
  B(t, r);
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
    return this._updatePathDirty.call(this), ot.prototype.getBoundingRect.call(this);
  }, t;
}(ot), Gg = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), Vg = function(r) {
  B(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(Gg), Uw = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(Gg), Wr = [0, 0], Ur = [0, 0], Wa = new ht(), Ua = new ht(), Yo = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new ht();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new ht();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    ht.sub(n[0], i[1], i[0]), ht.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return Wa.set(1 / 0, 1 / 0), Ua.set(0, 0), !this._intersectCheckOneSide(this, t, Wa, Ua, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, Wa, Ua, n, -1) && (i = !1, n) || n || ht.copy(e, i ? Wa : Ua), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, Wr), this._getProjMinMaxOnAxis(l, e._corners, Ur), Wr[1] < Ur[0] || Wr[0] > Ur[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(Ur[0] - Wr[1]), f = Math.abs(Wr[0] - Ur[1]);
        Math.min(h, f) > n.len() && (h < f ? ht.scale(n, u, -h * o) : ht.scale(n, u, f * o));
      } else if (i) {
        var h = Math.abs(Ur[0] - Wr[1]), f = Math.abs(Wr[0] - Ur[1]);
        Math.min(h, f) < i.len() && (h < f ? ht.scale(i, u, h * o) : ht.scale(i, u, -f * o));
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
}(), Yw = [], Xw = function(r) {
  B(t, r);
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
      for (var e = new nt(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(Yw)), e.union(a);
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
}(Ca), qw = Tt();
function Zw(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, h = void 0, f = void 0;
    i ? (u = Q(i.duration, 200), h = Q(i.easing, "cubicOut"), f = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), f = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (f = a.delay)), q(f) && (f = f(e, n)), q(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: f,
      easing: h
    };
    return v;
  } else
    return null;
}
function Xh(r, t, e, i, n, a, o) {
  var s = !1, l;
  q(n) ? (o = a, a = n, n = null) : G(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var h = Zw(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (h && h.duration > 0) {
    var f = h.duration, v = h.delay, c = h.easing, d = {
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
    s ? t.animateFrom(e, d) : t.animateTo(e, d);
  } else
    t.stopAnimation(), !s && t.attr(e), o && o(1), a && a();
}
function te(r, t, e, i, n, a) {
  Xh("update", r, t, e, i, n, a);
}
function Qe(r, t, e, i, n, a) {
  Xh("enter", r, t, e, i, n, a);
}
function Zn(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Xo(r, t, e, i, n, a) {
  Zn(r) || Xh("leave", r, t, e, i, n, a);
}
function sv(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Xo(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function Nu(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || sv(n, t, e, i);
  }) : sv(r, t, e, i);
}
function Wg(r) {
  qw(r).oldStyle = r.style;
}
var qo = Math.max, Zo = Math.min, Fu = {};
function Kw(r) {
  return ot.extend(r);
}
var Qw = Aw;
function jw(r, t) {
  return Qw(r, t);
}
function Te(r, t) {
  Fu[r] = t;
}
function Jw(r) {
  if (Fu.hasOwnProperty(r))
    return Fu[r];
}
function qh(r, t, e, i) {
  var n = Dw(r, t);
  return e && (i === "center" && (e = Yg(e, n.getBoundingRect())), Xg(n, e)), n;
}
function Ug(r, t, e) {
  var i = new Tr({
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
        i.setStyle(Yg(t, a));
      }
    }
  });
  return i;
}
function Yg(r, t) {
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
var tS = Mw;
function Xg(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function ha(r, t) {
  return Cg(r, r, {
    lineWidth: t
  }), r;
}
function eS(r) {
  return Dg(r.shape, r.shape, r.style), r;
}
var rS = ti;
function iS(r, t) {
  for (var e = Ah([]); r && r !== t; )
    Gi(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function Zh(r, t, e) {
  return t && !Wt(t) && (t = Lh.getLocalTransform(t)), e && (t = Ph([], t)), fe([], r, t);
}
function nS(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = Zh(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function lv(r) {
  return !r.isGroup;
}
function aS(r) {
  return r.shape != null;
}
function qg(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      lv(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return aS(o) && (s.shape = O({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (lv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), te(o, l, e, rt(o).dataIndex);
      }
    }
  });
}
function oS(r, t) {
  return W(r, function(e) {
    var i = e[0];
    i = qo(i, t.x), i = Zo(i, t.x + t.width);
    var n = e[1];
    return n = qo(n, t.y), n = Zo(n, t.y + t.height), [i, n];
  });
}
function sS(r, t) {
  var e = qo(r.x, t.x), i = Zo(r.x + r.width, t.x + t.width), n = qo(r.y, t.y), a = Zo(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function Kh(r, t, e) {
  var i = O({
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
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), at(n, e), new Tr(i)) : qh(r.replace("path://", ""), i, e, "center");
}
function lS(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Zg(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Zg(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = Al(h, f, l, u);
  if (uS(v))
    return !1;
  var c = r - n, d = t - a, g = Al(c, d, l, u) / v;
  if (g < 0 || g > 1)
    return !1;
  var p = Al(c, d, h, f) / v;
  return !(p < 0 || p > 1);
}
function Al(r, t, e, i) {
  return r * i - e * t;
}
function uS(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function bs(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = z(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && D(dt(l), function(h) {
    li(s, h) || (s[h] = l[h], s.$vars.push(h));
  });
  var u = rt(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: at({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function uv(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function ws(r, t) {
  if (r)
    if ($(r))
      for (var e = 0; e < r.length; e++)
        uv(r[e], t);
    else
      uv(r, t);
}
Te("circle", ms);
Te("ellipse", Gh);
Te("sector", sn);
Te("ring", Vh);
Te("polygon", Wh);
Te("polyline", Uh);
Te("rect", xt);
Te("line", wr);
Te("bezierCurve", Yh);
Te("arc", _s);
const hS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: _s,
  BezierCurve: Yh,
  BoundingRect: nt,
  Circle: ms,
  CompoundPath: Ww,
  Ellipse: Gh,
  Group: Mt,
  Image: Tr,
  IncrementalDisplayable: Xw,
  Line: wr,
  LinearGradient: Vg,
  OrientedBoundingRect: Yo,
  Path: ot,
  Point: ht,
  Polygon: Wh,
  Polyline: Uh,
  RadialGradient: Uw,
  Rect: xt,
  Ring: Vh,
  Sector: sn,
  Text: Yt,
  applyTransform: Zh,
  clipPointsByRect: oS,
  clipRectByRect: sS,
  createIcon: Kh,
  extendPath: jw,
  extendShape: Kw,
  getShapeClass: Jw,
  getTransform: iS,
  groupTransition: qg,
  initProps: Qe,
  isElementRemoved: Zn,
  lineLineIntersect: Zg,
  linePolygonIntersect: lS,
  makeImage: Ug,
  makePath: qh,
  mergePath: tS,
  registerShape: Te,
  removeElement: Xo,
  removeElementWithFadeOut: Nu,
  resizePath: Xg,
  setTooltipConfig: bs,
  subPixelOptimize: rS,
  subPixelOptimizeLine: ha,
  subPixelOptimizeRect: eS,
  transformDirection: nS,
  traverseElements: ws,
  updateProps: te
}, Symbol.toStringTag, { value: "Module" }));
var Ss = {};
function fS(r, t) {
  for (var e = 0; e < Re.length; e++) {
    var i = Re[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function hv(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = q(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Re.length; u++) {
    var h = Re[u], f = t[h];
    l[h] = Q(i ? i.getFormattedLabel(n, h, null, a, f && f.get("formatter")) : null, s);
  }
  return l;
}
function xs(r, t, e, i) {
  e = e || Ss;
  for (var n = r instanceof Yt, a = !1, o = 0; o < Xc.length; o++) {
    var s = t[Xc[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new Yt(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = hv(e, t), h = t.normal, f = !!h.getShallow("show"), v = Zi(h, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(fv(h, e, !1));
    for (var o = 0; o < Re.length; o++) {
      var c = Re[o], s = t[c];
      if (s) {
        var d = l.ensureState(c), g = !!Q(s.getShallow("show"), f);
        if (g !== f && (d.ignore = !g), d.style = Zi(s, i && i[c], e, !0, !n), d.style.text = u[c], !n) {
          var p = r.ensureState(c);
          p.textConfig = fv(s, e, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !f, l.useStyle(v), l.dirty(), e.enableTextSetter && (Cs(l).setLabelText = function(y) {
      var m = hv(e, t, y);
      fS(l, m);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function Ts(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < Re.length; i++) {
    var n = Re[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function Zi(r, t, e, i, n) {
  var a = {};
  return cS(a, r, e, i, n), t && O(a, t), a;
}
function fv(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = Q(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function cS(r, t, e, i, n) {
  e = e || Ss;
  var a = t.ecModel, o = a && a.option.textStyle, s = vS(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        pv(l[u] = {}, h, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var f = t.get("overflow");
  f && (r.overflow = f);
  var v = t.get("minMargin");
  v != null && (r.margin = v), pv(r, t, o, e, i, n, !0, !1);
}
function vS(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || Ss).rich;
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
var cv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], vv = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], dv = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function pv(r, t, e, i, n, a, o, s) {
  e = !n && e || Ss;
  var l = i && i.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), f = Q(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || e.color, h = h || e.textBorderColor), u != null && (r.fill = u), h != null && (r.stroke = h);
  var v = Q(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var c = Q(t.getShallow("textBorderType"), e.textBorderType);
  c != null && (r.lineDash = c);
  var d = Q(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  d != null && (r.lineDashOffset = d), !n && f == null && !s && (f = i && i.defaultOpacity), f != null && (r.opacity = f), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var g = 0; g < cv.length; g++) {
    var p = cv[g], y = Q(t.getShallow(p), e[p]);
    y != null && (r[p] = y);
  }
  for (var g = 0; g < vv.length; g++) {
    var p = vv[g], y = t.getShallow(p);
    y != null && (r[p] = y);
  }
  if (r.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (r.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var g = 0; g < dv.length; g++) {
      var p = dv[g], y = t.getShallow(p);
      y != null && (r[p] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (r.borderColor = l);
  }
}
function dS(r, t) {
  var e = t && t.getModel("textStyle");
  return Ie([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var Cs = Tt();
function pS(r, t, e, i) {
  if (r) {
    var n = Cs(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var gS = ["textStyle", "color"], Ml = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Pl = new Yt(), yS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(gS) : null);
    }, r.prototype.getFont = function() {
      return dS({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < Ml.length; i++)
        e[Ml[i]] = this.getShallow(Ml[i]);
      return Pl.useStyle(e), Pl.update(), Pl.getBoundingRect();
    }, r;
  }()
), Kg = [
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
], mS = ua(Kg), _S = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return mS(this, t);
    }, r;
  }()
), Qg = [
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
], bS = ua(Qg), wS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return bS(this, t, e);
    }, r;
  }()
), yt = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.parentModel = e, this.ecModel = i, this.option = t;
    }
    return r.prototype.init = function(t, e, i) {
    }, r.prototype.mergeOption = function(t, e) {
      it(this.option, t, !0);
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
      return new t(tt(this.option));
    }, r.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, r.prototype.resolveParentPath = function(t) {
      return t;
    }, r.prototype.isAnimationEnabled = function() {
      if (!U.node && this.option) {
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
Nh(yt);
ob(yt);
Ne(yt, _S);
Ne(yt, wS);
Ne(yt, fb);
Ne(yt, yS);
var SS = Math.round(Math.random() * 10);
function Ds(r) {
  return [r || "", SS++].join("_");
}
function xS(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Le(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Le(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function TS(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), h = u.graph, f = u.noEntryList, v = {};
    for (D(a, function(m) {
      v[m] = !0;
    }); f.length; ) {
      var c = f.pop(), d = h[c], g = !!v[c];
      g && (s.call(l, c, d.originalDeps.slice()), delete v[c]), D(d.successor, g ? y : p);
    }
    D(v, function() {
      var m = "";
      throw new Error(m);
    });
    function p(m) {
      h[m].entryCount--, h[m].entryCount === 0 && f.push(m);
    }
    function y(m) {
      v[m] = !0, p(m);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return D(a, function(l) {
      var u = i(o, l), h = u.originalDeps = t(l), f = n(h, a);
      u.entryCount = f.length, u.entryCount === 0 && s.push(l), D(f, function(v) {
        ut(u.predecessor, v) < 0 && u.predecessor.push(v);
        var c = i(o, v);
        ut(c.successor, v) < 0 && c.successor.push(l);
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
    return D(a, function(l) {
      ut(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function jg(r, t) {
  return it(it({}, r, !0), t, !0);
}
const CS = {
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
}, DS = {
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
var Ko = "ZH", Qh = "EN", Wi = Qh, To = {}, jh = {}, Jg = U.domSupported ? function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Wi).toUpperCase()
  );
  return r.indexOf(Ko) > -1 ? Ko : Wi;
}() : Wi;
function ty(r, t) {
  r = r.toUpperCase(), jh[r] = new yt(t), To[r] = t;
}
function AS(r) {
  if (z(r)) {
    var t = To[r.toUpperCase()] || {};
    return r === Ko || r === Qh ? tt(t) : it(tt(t), tt(To[Wi]), !1);
  } else
    return it(tt(r), tt(To[Wi]), !1);
}
function MS(r) {
  return jh[r];
}
function PS() {
  return jh[Wi];
}
ty(Qh, CS);
ty(Ko, DS);
var Jh = 1e3, tf = Jh * 60, Kn = tf * 60, he = Kn * 24, gv = he * 365, Nn = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Ya = "{yyyy}-{MM}-{dd}", yv = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Ya,
  hour: Ya + " " + Nn.hour,
  minute: Ya + " " + Nn.minute,
  second: Ya + " " + Nn.second,
  millisecond: Nn.none
}, Il = ["year", "month", "day", "hour", "minute", "second", "millisecond"], ey = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function nr(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function Ui(r) {
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
function IS(r) {
  return r === Ui(r);
}
function LS(r) {
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
function As(r, t, e, i) {
  var n = Ke(r), a = n[ef(e)](), o = n[Yi(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[Ms(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), h = n[fa(e)](), f = (h - 1) % 12 + 1, v = n[Ps(e)](), c = n[Is(e)](), d = n[Ls(e)](), g = h >= 12 ? "pm" : "am", p = g.toUpperCase(), y = i instanceof yt ? i : MS(i || Jg) || PS(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), S = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, nr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, nr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, nr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, nr(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, nr(f + "", 2)).replace(/{h}/g, f + "").replace(/{mm}/g, nr(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, nr(c, 2)).replace(/{s}/g, c + "").replace(/{SSS}/g, nr(d, 3)).replace(/{S}/g, d + "");
}
function ES(r, t, e, i, n) {
  var a = null;
  if (z(e))
    a = e;
  else if (q(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = O({}, Nn);
    if (r.level > 0)
      for (var s = 0; s < Il.length; ++s)
        o[Il[s]] = "{primary|" + o[Il[s]] + "}";
    var l = e ? e.inherit === !1 ? e : at(e, o) : o, u = ry(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = ey.indexOf(u), s = h - 1; s >= 0; --s)
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
  return As(new Date(r.value), a, n, i);
}
function ry(r, t) {
  var e = Ke(r), i = e[Yi(t)]() + 1, n = e[Ms(t)](), a = e[fa(t)](), o = e[Ps(t)](), s = e[Is(t)](), l = e[Ls(t)](), u = l === 0, h = u && s === 0, f = h && o === 0, v = f && a === 0, c = v && n === 1, d = c && i === 1;
  return d ? "year" : c ? "month" : v ? "day" : f ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function mv(r, t, e) {
  var i = ft(r) ? Ke(r) : r;
  switch (t = t || ry(r, e), t) {
    case "year":
      return i[ef(e)]();
    case "half-year":
      return i[Yi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Yi(e)]() + 1) / 4);
    case "month":
      return i[Yi(e)]();
    case "day":
      return i[Ms(e)]();
    case "half-day":
      return i[fa(e)]() / 24;
    case "hour":
      return i[fa(e)]();
    case "minute":
      return i[Ps(e)]();
    case "second":
      return i[Is(e)]();
    case "millisecond":
      return i[Ls(e)]();
  }
}
function ef(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Yi(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function Ms(r) {
  return r ? "getUTCDate" : "getDate";
}
function fa(r) {
  return r ? "getUTCHours" : "getHours";
}
function Ps(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function Is(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function Ls(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function RS(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function iy(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function ny(r) {
  return r ? "setUTCDate" : "setDate";
}
function ay(r) {
  return r ? "setUTCHours" : "setHours";
}
function oy(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function sy(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function ly(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function uy(r) {
  if (!$1(r))
    return z(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function hy(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var Es = Hp;
function $u(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(h) {
    return h && Ie(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? Ke(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return As(l, i, e);
  }
  if (t === "ordinal")
    return hu(r) ? n(r) : ft(r) && a(r) ? r + "" : "-";
  var u = Ho(r);
  return a(u) ? uy(u) : hu(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var _v = ["a", "b", "c", "d", "e", "f", "g"], Ll = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function fy(r, t, e) {
  $(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = _v[a];
    r = r.replace(Ll(o), Ll(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(Ll(_v[l], s), e ? $t(u) : u);
    }
  return r;
}
function kS(r, t) {
  var e = z(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + $t(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + $t(i) + ";" + (t || "") + '"></span>';
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
function fi(r, t) {
  return t = t || "transparent", z(r) ? r : G(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var Co = D, OS = ["left", "right", "top", "bottom", "width", "height"], Xa = [["width", "left", "right"], ["height", "top", "bottom"]];
function rf(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), f = t.childAt(u + 1), v = f && f.getBoundingRect(), c, d;
    if (r === "horizontal") {
      var g = h.width + (v ? -v.x + h.x : 0);
      c = a + g, c > i || l.newline ? (a = 0, c = g, o += s + e, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (v ? -v.y + h.y : 0);
      d = o + p, d > n || l.newline ? (a += s + e, o = 0, d = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = c + e : o = d + e);
  });
}
var Qn = rf;
St(rf, "vertical");
St(rf, "horizontal");
function Qo(r, t, e) {
  e = Es(e || 0);
  var i = t.width, n = t.height, a = Ot(r.left, i), o = Ot(r.top, n), s = Ot(r.right, i), l = Ot(r.bottom, n), u = Ot(r.width, i), h = Ot(r.height, n), f = e[2] + e[0], v = e[1] + e[3], c = r.aspect;
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
  var d = new nt(a + e[3], o + e[0], u, h);
  return d.margin = e, d;
}
function ca(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return G(t) ? t : t ? {
    type: t
  } : null;
}
function Ki(r, t, e) {
  var i = e && e.ignoreSize;
  !$(i) && (i = [i, i]);
  var n = o(Xa[0], 0), a = o(Xa[1], 1);
  u(Xa[0], r, n), u(Xa[1], r, a);
  function o(h, f) {
    var v = {}, c = 0, d = {}, g = 0, p = 2;
    if (Co(h, function(_) {
      d[_] = r[_];
    }), Co(h, function(_) {
      s(t, _) && (v[_] = d[_] = t[_]), l(v, _) && c++, l(d, _) && g++;
    }), i[f])
      return l(t, h[1]) ? d[h[2]] = null : l(t, h[2]) && (d[h[1]] = null), d;
    if (g === p || !c)
      return d;
    if (c >= p)
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
    Co(h, function(c) {
      f[c] = v[c];
    });
  }
}
function Rs(r) {
  return BS({}, r);
}
function BS(r, t) {
  return t && r && Co(OS, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var NS = Tt(), lt = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = Ds("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = ca(this), a = n ? Rs(e) : {}, o = i.getTheme();
      it(e, o.get(this.mainType)), it(e, this.getDefaultOption()), n && Ki(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      it(this.option, e, !0);
      var n = ca(this);
      n && Ki(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!ib(e))
        return e.defaultOption;
      var i = NS(this);
      if (!i.defaultOption) {
        for (var n = [], a = e; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = it(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(e, i) {
      var n = e + "Index", a = e + "Id";
      return Ta(this.ecModel, e, {
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
  }(yt)
);
mg(lt, yt);
cs(lt);
xS(lt);
TS(lt, FS);
function FS(r) {
  var t = [];
  return D(lt.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = W(t, function(e) {
    return Le(e).main;
  }), r !== "dataset" && ut(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var cy = "";
typeof navigator < "u" && (cy = navigator.platform || "");
var Ci = "rgba(0, 0, 0, 0.2)";
const $S = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: Ci,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: Ci,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: Ci,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: Ci,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: Ci,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: Ci,
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
    fontFamily: cy.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var vy = K(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), ve = "original", Xt = "arrayRows", $e = "objectRows", tr = "keyedColumns", mr = "typedArray", dy = "unknown", qe = "column", ln = "row", Zt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, py = Tt();
function zS(r) {
  py(r).datasetMap = K();
}
function HS(r, t, e) {
  var i = {}, n = gy(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = py(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, h, f;
  r = r.slice(), D(r, function(g, p) {
    var y = G(g) ? g : r[p] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = p, f = d(y)), i[y.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: f,
    valueWayDim: 0
  });
  D(r, function(g, p) {
    var y = g.name, m = d(g);
    if (h == null) {
      var _ = v.valueWayDim;
      c(i[y], _, m), c(o, _, m), v.valueWayDim += m;
    } else if (h === p)
      c(i[y], 0, m), c(a, 0, m);
    else {
      var _ = v.categoryWayDim;
      c(i[y], _, m), c(o, _, m), v.categoryWayDim += m;
    }
  });
  function c(g, p, y) {
    for (var m = 0; m < y; m++)
      g.push(p + m);
  }
  function d(g) {
    var p = g.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function gy(r) {
  var t = r.get("data", !0);
  if (!t)
    return Ta(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, be).models[0];
}
function GS(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : Ta(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, be).models;
}
function yy(r, t) {
  return VS(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function VS(r, t, e, i, n, a) {
  var o, s = 5;
  if (Ut(r))
    return Zt.Not;
  var l, u;
  if (i) {
    var h = i[a];
    G(h) ? (l = h.name, u = h.type) : z(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? Zt.Must : Zt.Not;
  if (t === Xt) {
    var f = r;
    if (e === ln) {
      for (var v = f[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = b(v[n + c])) != null)
          return o;
    } else
      for (var c = 0; c < f.length && c < s; c++) {
        var d = f[n + c];
        if (d && (o = b(d[a])) != null)
          return o;
      }
  } else if (t === $e) {
    var g = r;
    if (!l)
      return Zt.Not;
    for (var c = 0; c < g.length && c < s; c++) {
      var p = g[c];
      if (p && (o = b(p[l])) != null)
        return o;
    }
  } else if (t === tr) {
    var y = r;
    if (!l)
      return Zt.Not;
    var v = y[l];
    if (!v || Ut(v))
      return Zt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = b(v[c])) != null)
        return o;
  } else if (t === ve)
    for (var m = r, c = 0; c < m.length && c < s; c++) {
      var p = m[c], _ = xa(p);
      if (!$(_))
        return Zt.Not;
      if ((o = b(_[a])) != null)
        return o;
    }
  function b(S) {
    var w = z(S);
    if (S != null && Number.isFinite(Number(S)) && S !== "")
      return w ? Zt.Might : Zt.Not;
    if (w && S !== "-")
      return Zt.Must;
  }
  return Zt.Not;
}
var WS = K();
function US(r, t, e) {
  var i = WS.get(t);
  if (!i)
    return e;
  var n = i(r);
  return n ? e.concat(n) : e;
}
var bv = Tt();
Tt();
var nf = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Bt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return XS(this, bv, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      qS(this, bv);
    }, r;
  }()
);
function YS(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function XS(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var h = o == null || !i ? e : YS(i, o);
  if (h = h || e, !(!h || !h.length)) {
    var f = h[l];
    return n && (u[n] = f), s.paletteIdx = (l + 1) % h.length, f;
  }
}
function qS(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var qa, wn, wv, Sv = "\0_ec_inner", ZS = 1, af = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new yt(a), this._locale = new yt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      var a = Cv(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, Cv(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        !this.option || e === "recreate" ? wv(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!e || e === "recreate" || e === "media") {
        var l = a.getMediaOption(this);
        l.length && D(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(e) {
      this._mergeOption(e, null);
    }, t.prototype._mergeOption = function(e, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = K(), u = i && i.replaceMergeMainTypeMap;
      zS(this), D(e, function(f, v) {
        f != null && (lt.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? tt(f) : it(n[v], f, !0));
      }), u && u.each(function(f, v) {
        lt.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), lt.topologicalTravel(s, lt.getAllClassMainTypes(), h, this);
      function h(f) {
        var v = US(this, f, Bt(e[f])), c = a.get(f), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          c ? u && u.get(f) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = G1(c, v, d);
        Z1(g, f, lt), n[f] = null, a.set(f, null), o.set(f, 0);
        var p = [], y = [], m = 0, _;
        D(g, function(b, S) {
          var w = b.existing, x = b.newOption;
          if (!x)
            w && (w.mergeOption({}, this), w.optionUpdated({}, !1));
          else {
            var C = f === "series", A = lt.getClass(
              f,
              b.keyInfo.subType,
              !C
              // Give a more detailed warn later if series don't exists
            );
            if (!A)
              return;
            if (f === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (w && w.constructor === A)
              w.name = b.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              var M = O({
                componentIndex: S
              }, b.keyInfo);
              w = new A(x, this, this, M), O(w, M), b.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (p.push(w.option), y.push(w), m++) : (p.push(void 0), y.push(void 0));
        }, this), n[f] = p, a.set(f, y), o.set(f, m), f === "series" && qa(this);
      }
      this._seriesIndices || qa(this);
    }, t.prototype.getOption = function() {
      var e = tt(this.option);
      return D(e, function(i, n) {
        if (lt.hasClass(n)) {
          for (var a = Bt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !la(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[Sv], e;
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
      return n != null ? (l = [], D(Bt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = xv("id", a, s) : o != null ? l = xv("name", o, s) : l = Dt(s, function(u) {
        return !!u;
      }), Tv(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : Dt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Tv(o, e));
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
        return e.filter ? Dt(u, e.filter) : u;
      }
    }, t.prototype.eachComponent = function(e, i, n) {
      var a = this._componentsMap;
      if (q(e)) {
        var o = i, s = e;
        a.each(function(f, v) {
          for (var c = 0; f && c < f.length; c++) {
            var d = f[c];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = z(e) ? a.get(e) : G(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && i.call(n, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Ee(e, null);
      return Dt(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(e) {
      return this._componentsMap.get("series")[e];
    }, t.prototype.getSeriesByType = function(e) {
      return Dt(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === e;
      });
    }, t.prototype.getSeries = function() {
      return Dt(this._componentsMap.get("series"), function(e) {
        return !!e;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(e, i) {
      wn(this), D(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      D(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      wn(this), D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return D(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return wn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      wn(this);
      var n = [];
      D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = K(n);
    }, t.prototype.restoreData = function(e) {
      qa(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        lt.hasClass(o) && n.push(o);
      }), lt.topologicalTravel(n, lt.getAllClassMainTypes(), function(a) {
        D(i.get(a), function(o) {
          o && (a !== "series" || !KS(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      qa = function(e) {
        var i = e._seriesIndices = [];
        D(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = K(i);
      }, wn = function(e) {
      }, wv = function(e, i) {
        e.option = {}, e.option[Sv] = ZS, e._componentsMap = K({
          series: []
        }), e._componentsCount = K();
        var n = i.aria;
        G(n) && n.enabled == null && (n.enabled = !0), QS(i, e._theme.option), it(i, $S, !1), e._mergeOption(i, null);
      };
    }(), t;
  }(yt)
);
function KS(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function QS(r, t) {
  var e = r.color && !r.colorLayer;
  D(t, function(i, n) {
    n === "colorLayer" && e || lt.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? it(r[n], i, !1) : tt(i) : r[n] == null && (r[n] = i));
  });
}
function xv(r, t, e) {
  if ($(t)) {
    var i = K();
    return D(t, function(a) {
      if (a != null) {
        var o = Ee(a, null);
        o != null && i.set(a, !0);
      }
    }), Dt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Ee(t, null);
    return Dt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function Tv(r, t) {
  return t.hasOwnProperty("subType") ? Dt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function Cv(r) {
  var t = K();
  return r && D(Bt(r.replaceMerge), function(e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Ne(af, nf);
var jS = [
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
], my = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      D(jS, function(e) {
        this[e] = vt(t[e], t);
      }, this);
    }
    return r;
  }()
), El = {}, of = (
  /** @class */
  function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      D(El, function(n, a) {
        var o = n.create(t, e);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, r.prototype.update = function(t, e) {
      D(this._coordinateSystems, function(i) {
        i.update && i.update(t, e);
      });
    }, r.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, r.register = function(t, e) {
      El[t] = e;
    }, r.get = function(t) {
      return El[t];
    }, r;
  }()
), JS = /^(min|max)?(.+)$/, tx = (
  /** @class */
  function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (D(Bt(t.series), function(o) {
        o && o.data && Ut(o.data) && fu(o.data);
      }), D(Bt(t.dataset), function(o) {
        o && o.source && Ut(o.source) && fu(o.source);
      })), t = tt(t);
      var n = this._optionBackup, a = ex(t, e, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, r.prototype.mountOption = function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], tt(t ? e.baseOption : this._newBaseOption);
    }, r.prototype.getTimelineOption = function(t) {
      var e, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (e = tt(
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
        rx(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !nx(o, this._currentMediaIndices) && (s = W(o, function(h) {
        return tt(h === -1 ? a.option : n[h].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  }()
);
function ex(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, h = !!r.media, f = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((f || h) && (r.options = r.media = null), a = r), h && $(u) && D(u, function(c) {
    c && c.option && (c.query ? i.push(c) : n || (n = c));
  }), v(a), D(l, function(c) {
    return v(c);
  }), D(i, function(c) {
    return v(c.option);
  });
  function v(c) {
    D(t, function(d) {
      d(c, e);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function rx(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return D(r, function(a, o) {
    var s = o.match(JS);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      ix(i[u], a, l) || (n = !1);
    }
  }), n;
}
function ix(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function nx(r, t) {
  return r.join(",") === t.join(",");
}
var pe = D, va = G, Dv = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Rl(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = Dv.length; e < i; e++) {
      var n = Dv[e], a = t.normal, o = t.emphasis;
      a && a[n] && (r[n] = r[n] || {}, r[n].normal ? it(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (r[n] = r[n] || {}, r[n].emphasis ? it(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function Et(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (e ? (r[t].normal = r[t].emphasis = null, at(r[t], i)) : r[t] = i), n && (r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function Fn(r) {
  Et(r, "itemStyle"), Et(r, "lineStyle"), Et(r, "areaStyle"), Et(r, "label"), Et(r, "labelLine"), Et(r, "upperLabel"), Et(r, "edgeLabel");
}
function mt(r, t) {
  var e = va(r) && r[t], i = va(e) && e.textStyle;
  if (i)
    for (var n = 0, a = Mc.length; n < a; n++) {
      var o = Mc[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
}
function ae(r) {
  r && (Fn(r), mt(r, "label"), r.emphasis && mt(r.emphasis, "label"));
}
function ax(r) {
  if (va(r)) {
    Rl(r), Fn(r), mt(r, "label"), mt(r, "upperLabel"), mt(r, "edgeLabel"), r.emphasis && (mt(r.emphasis, "label"), mt(r.emphasis, "upperLabel"), mt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (Rl(t), ae(t));
    var e = r.markLine;
    e && (Rl(e), ae(e));
    var i = r.markArea;
    i && ae(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !Ut(a))
        for (var o = 0; o < a.length; o++)
          ae(a[o]);
      D(r.categories, function(u) {
        Fn(u);
      });
    }
    if (n && !Ut(n))
      for (var o = 0; o < n.length; o++)
        ae(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ae(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        $(l[o]) ? (ae(l[o][0]), ae(l[o][1])) : ae(l[o]);
    r.type === "gauge" ? (mt(r, "axisLabel"), mt(r, "title"), mt(r, "detail")) : r.type === "treemap" ? (Et(r.breadcrumb, "itemStyle"), D(r.levels, function(u) {
      Fn(u);
    })) : r.type === "tree" && Fn(r.leaves);
  }
}
function Ge(r) {
  return $(r) ? r : r ? [r] : [];
}
function Av(r) {
  return ($(r) ? r[0] : r) || {};
}
function ox(r, t) {
  pe(Ge(r.series), function(i) {
    va(i) && ax(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), pe(e, function(i) {
    pe(Ge(r[i]), function(n) {
      n && (mt(n, "axisLabel"), mt(n.axisPointer, "label"));
    });
  }), pe(Ge(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    mt(n, "axisLabel"), mt(n && n.axisPointer, "label");
  }), pe(Ge(r.calendar), function(i) {
    Et(i, "itemStyle"), mt(i, "dayLabel"), mt(i, "monthLabel"), mt(i, "yearLabel");
  }), pe(Ge(r.radar), function(i) {
    mt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), pe(Ge(r.geo), function(i) {
    va(i) && (ae(i), pe(Ge(i.regions), function(n) {
      ae(n);
    }));
  }), pe(Ge(r.timeline), function(i) {
    ae(i), Et(i, "label"), Et(i, "itemStyle"), Et(i, "controlStyle", !0);
    var n = i.data;
    $(n) && D(n, function(a) {
      G(a) && (Et(a, "label"), Et(a, "itemStyle"));
    });
  }), pe(Ge(r.toolbox), function(i) {
    Et(i, "iconStyle"), pe(i.feature, function(n) {
      Et(n, "iconStyle");
    });
  }), mt(Av(r.axisPointer), "label"), mt(Av(r.tooltip).axisPointer, "label");
}
function sx(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function lx(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function Mv(r) {
  r && D(ux, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var ux = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], hx = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], kl = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function Sn(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < kl.length; e++) {
      var i = kl[e][1], n = kl[e][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Pv(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (r.edgeDistance = r.margin);
}
function Iv(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay);
}
function fx(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (r.emphasis.focus = "adjacency"));
}
function _y(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && _y(r[e].children, t);
}
function by(r, t) {
  ox(r, t), r.series = Bt(r.series), D(r.series, function(e) {
    if (G(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise), Pv(e.label);
        var n = e.data;
        if (n && !Ut(n))
          for (var a = 0; a < n.length; a++)
            Pv(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = sx(e, "pointer.color");
        o != null && lx(e, "itemStyle.color", o);
      } else if (i === "bar") {
        Sn(e), Sn(e.backgroundStyle), Sn(e.emphasis);
        var n = e.data;
        if (n && !Ut(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (Sn(n[a]), Sn(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s)), Iv(e), _y(e.data, Iv);
      } else i === "graph" || i === "sankey" ? fx(e) : i === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && at(e, e.mapLocation));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), Mv(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), D(hx, function(e) {
    var i = r[e];
    i && ($(i) || (i = [i]), D(i, function(n) {
      Mv(n);
    }));
  });
}
function cx(r) {
  var t = K();
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
  }), t.each(vx);
}
function vx(r) {
  D(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, f) {
      var v = o.get(t.stackedDimension, f);
      if (isNaN(v))
        return n;
      var c, d;
      s ? d = o.getRawIndex(f) : c = o.get(t.stackedByDimension, f);
      for (var g = NaN, p = e - 1; p >= 0; p--) {
        var y = r[p];
        if (s || (d = y.data.rawIndexOf(y.stackedByDimension, c)), d >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = B1(v, m), g = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = g, i;
    });
  });
}
var ks = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === tr ? {} : []), this.sourceFormat = t.sourceFormat || dy, this.seriesLayoutBy = t.seriesLayoutBy || qe, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && yy(this, i) === Zt.Must && (n.type = "ordinal");
        }
    }
    return r;
  }()
);
function sf(r) {
  return r instanceof ks;
}
function zu(r, t, e) {
  e = e || Sy(r);
  var i = t.seriesLayoutBy, n = px(r, e, i, t.sourceHeader, t.dimensions), a = new ks({
    data: r,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: tt(t)
  });
  return a;
}
function wy(r) {
  return new ks({
    data: r,
    sourceFormat: Ut(r) ? mr : ve
  });
}
function dx(r) {
  return new ks({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: tt(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function Sy(r) {
  var t = dy;
  if (Ut(r))
    t = mr;
  else if ($(r)) {
    r.length === 0 && (t = Xt);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if ($(n) || Ut(n)) {
          t = Xt;
          break;
        } else if (G(n)) {
          t = $e;
          break;
        }
      }
    }
  } else if (G(r)) {
    for (var a in r)
      if (li(r, a) && Wt(r[a])) {
        t = tr;
        break;
      }
  }
  return t;
}
function px(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: Lv(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Xt) {
    var s = r;
    i === "auto" || i == null ? Ev(function(u) {
      u != null && u !== "-" && (z(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = ft(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Ev(function(u, h) {
      n[h] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === ln ? s.length : s[0] ? s[0].length : null;
  } else if (t === $e)
    n || (n = gx(r));
  else if (t === tr)
    n || (n = [], D(r, function(u, h) {
      n.push(h);
    }));
  else if (t === ve) {
    var l = xa(r[0]);
    a = $(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Lv(n),
    dimensionsDetectedCount: a
  };
}
function gx(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return dt(e);
}
function Lv(r) {
  if (r) {
    var t = K();
    return W(r, function(e, i) {
      e = G(e) ? e : {
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
function Ev(r, t, e, i) {
  if (t === ln)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function xy(r) {
  var t = r.sourceFormat;
  return t === $e || t === tr;
}
var Yr, Xr, qr, Rv, kv, Ty = (
  /** @class */
  function() {
    function r(t, e) {
      var i = sf(t) ? t : wy(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === mr && (this._offset = 0, this._dimSize = e, this._data = n), kv(this, n, i);
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
      kv = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, f = l.startIndex, v = l.dimensionsDefine, c = Rv[lf(u, h)];
        if (O(o, c), u === mr)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var d = Cy(u, h);
          o.getItem = vt(d, null, s, f, v);
          var g = Dy(u, h);
          o.count = vt(g, null, s, f, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, h = u * o, f = 0; f < u; f++)
          s[f] = l[h + f];
        return s;
      }, i = function(o, s, l, u) {
        for (var h = this._data, f = this._dimSize, v = 0; v < f; v++) {
          for (var c = u[v], d = c[0] == null ? 1 / 0 : c[0], g = c[1] == null ? -1 / 0 : c[1], p = s - o, y = l[v], m = 0; m < p; m++) {
            var _ = h[m * f + v];
            y[o + m] = _, _ < d && (d = _), _ > g && (g = _);
          }
          c[0] = d, c[1] = g;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Rv = (t = {}, t[Xt + "_" + qe] = {
        pure: !0,
        appendData: a
      }, t[Xt + "_" + ln] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[$e] = {
        pure: !0,
        appendData: a
      }, t[tr] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          D(o, function(l, u) {
            for (var h = s[u] || (s[u] = []), f = 0; f < (l || []).length; f++)
              h.push(l[f]);
          });
        }
      }, t[ve] = {
        appendData: a
      }, t[mr] = {
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
), Ov = function(r, t, e, i) {
  return r[i];
}, yx = (Yr = {}, Yr[Xt + "_" + qe] = function(r, t, e, i) {
  return r[i + t];
}, Yr[Xt + "_" + ln] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Yr[$e] = Ov, Yr[tr] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name, l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Yr[ve] = Ov, Yr);
function Cy(r, t) {
  var e = yx[lf(r, t)];
  return e;
}
var Bv = function(r, t, e) {
  return r.length;
}, mx = (Xr = {}, Xr[Xt + "_" + qe] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, Xr[Xt + "_" + ln] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, Xr[$e] = Bv, Xr[tr] = function(r, t, e) {
  var i = e[0].name, n = r[i];
  return n ? n.length : 0;
}, Xr[ve] = Bv, Xr);
function Dy(r, t) {
  var e = mx[lf(r, t)];
  return e;
}
var Ol = function(r, t, e) {
  return r[t];
}, _x = (qr = {}, qr[Xt] = Ol, qr[$e] = function(r, t, e) {
  return r[e];
}, qr[tr] = Ol, qr[ve] = function(r, t, e) {
  var i = xa(r);
  return i instanceof Array ? i[t] : i;
}, qr[mr] = Ol, qr);
function Ay(r) {
  var t = _x[r];
  return t;
}
function lf(r, t) {
  return r === Xt ? r + "_" + t : r;
}
function Qi(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return Ay(a)(i, o, s);
      } else {
        var l = i;
        return a === ve && (l = xa(i)), l;
      }
    }
  }
}
var bx = /\{@(.+?)\}/g, Sx = (
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
      if (z(a)) {
        var h = fy(a, l);
        return h.replace(bx, function(f, v) {
          var c = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(c - 1) === "]" && (d = +d.slice(1, c - 1));
          var g = Qi(s, t, d);
          if (o && $(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return Qi(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  }()
);
function Nv(r) {
  var t, e;
  return G(r) ? r.type && (e = r) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function jn(r) {
  return new xx(r);
}
var xx = (
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
        var c = this._dueIndex, d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (f || c < d)) {
          var g = this._progress;
          if ($(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], c, d, l, u);
          else
            this._doProgress(g, c, d, l, u);
        }
        this._dueIndex = d;
        var y = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = y;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      Fv.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: Fv.next
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
), Fv = /* @__PURE__ */ function() {
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
function Do(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !ft(r) && r != null && r !== "-" && (r = +Ke(r)), r == null || r === "" ? NaN : Number(r));
}
K({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +Ke(r);
  },
  trim: function(r) {
    return z(r) ? Ie(r) : r;
  }
});
var Tx = (
  /** @class */
  function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = ft(t) ? t : Ho(t), n = ft(e) ? e : Ho(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = z(t), l = z(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  }()
), Cx = (
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
      return Do(t, e);
    }, r;
  }()
);
function Dx(r, t) {
  var e = new Cx(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== qe && Ht(o);
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    D(u, function(g, p) {
      var y = g.name, m = {
        index: p,
        name: y,
        displayName: g.displayName
      };
      if (s.push(m), y != null) {
        var _ = "";
        li(l, y) && Ht(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < r.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var f = Cy(n, qe);
  t.__isBuiltIn && (e.getRawDataItem = function(g) {
    return f(i, a, s, g);
  }, e.getRawData = vt(Ax, null, r)), e.cloneRawData = vt(Mx, null, r);
  var v = Dy(n, qe);
  e.count = vt(v, null, i, a, s);
  var c = Ay(n);
  e.retrieveValue = function(g, p) {
    var y = f(i, a, s, g);
    return d(y, p);
  };
  var d = e.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var y = s[p];
      if (y)
        return c(g, p, y.name);
    }
  };
  return e.getDimensionInfo = vt(Px, null, s, l), e.cloneAllDimensionInfo = vt(Ix, null, s), e;
}
function Ax(r) {
  var t = r.sourceFormat;
  if (!uf(t)) {
    var e = "";
    Ht(e);
  }
  return r.data;
}
function Mx(r) {
  var t = r.sourceFormat, e = r.data;
  if (!uf(t)) {
    var i = "";
    Ht(i);
  }
  if (t === Xt) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === $e) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(O({}, e[a]));
    return n;
  }
}
function Px(r, t, e) {
  if (e != null) {
    if (ft(e) || !isNaN(e) && !li(t, e))
      return r[e];
    if (li(t, e))
      return t[e];
  }
}
function Ix(r) {
  return tt(r);
}
var My = K();
function Lx(r) {
  r = tt(r);
  var t = r.type, e = "";
  t || Ht(e);
  var i = t.split(":");
  i.length !== 2 && Ht(e);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, My.set(t, r);
}
function Ex(r, t, e) {
  var i = Bt(r), n = i.length, a = "";
  n || Ht(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = Rx(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Rx(r, t, e, i) {
  var n = "";
  t.length || Ht(n), G(r) || Ht(n);
  var a = r.type, o = My.get(a);
  o || Ht(n);
  var s = W(t, function(u) {
    return Dx(u, o);
  }), l = Bt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: tt(r.config)
  }));
  return W(l, function(u, h) {
    var f = "";
    G(u) || Ht(f), u.data || Ht(f);
    var v = Sy(u.data);
    uf(v) || Ht(f);
    var c, d = t[0];
    if (d && h === 0 && !u.dimensions) {
      var g = d.startIndex;
      g && (u.data = d.data.slice(0, g).concat(u.data)), c = {
        seriesLayoutBy: qe,
        sourceHeader: g,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      c = {
        seriesLayoutBy: qe,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return zu(u.data, c, null);
  });
}
function uf(r) {
  return r === Xt || r === $e;
}
var Os = "undefined", kx = typeof Uint32Array === Os ? Array : Uint32Array, Ox = typeof Uint16Array === Os ? Array : Uint16Array, Py = typeof Int32Array === Os ? Array : Int32Array, $v = typeof Float64Array === Os ? Array : Float64Array, Iy = {
  float: $v,
  int: Py,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: $v
}, Bl;
function Di(r) {
  return r > 65535 ? kx : Ox;
}
function Ai() {
  return [1 / 0, -1 / 0];
}
function Bx(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function zv(r, t, e, i, n) {
  var a = Iy[e || "float"];
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
var Hu = (
  /** @class */
  function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = K();
    }
    return r.prototype.initData = function(t, e, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Bl[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], xy(n), this._dimensions = W(e, function(o) {
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
      }, i.set(t, a), this._chunks[a] = new Iy[e || "float"](this._rawCount), this._rawExtent[a] = Ai(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Ai());
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
        zv(i, u, h.type, l, !0);
      }
      for (var f = [], v = s; v < l; v++)
        for (var c = v - s, d = 0; d < a; d++) {
          var h = n[d], g = Bl.arrayRows.call(this, t[c] || f, h.property, c, d);
          i[d][v] = g;
          var p = o[d];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = W(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var f = o[h];
        l[h] || (l[h] = Ai()), zv(a, h, f.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], c = t; c < e; c++) {
          v = n.getItem(c, v);
          for (var d = 0; d < s; d++) {
            var g = a[d], p = this._dimValueGetter(v, u[d], c, d);
            g[c] = p;
            var y = l[d];
            p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
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
        var v = this.getRawIndex(h), c = e - a[v], d = Math.abs(c);
        d <= i && ((d < s || d === s && c >= 0 && l < 0) && (s = d, l = c, u = 0), c === l && (o[u++] = h));
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
        var i = Di(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = Di(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, h = t[0], f = i._chunks, v = 0; v < n; v++) {
        var c = void 0, d = i.getRawIndex(v);
        if (l === 0)
          c = e(v);
        else if (l === 1) {
          var g = f[h][d];
          c = e(g, v);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = f[t[p]][d];
          s[p] = v, c = e.apply(null, s);
        }
        c && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = dt(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = Di(e._rawCount), l = new s(o), u = 0, h = n[0], f = t[h][0], v = t[h][1], c = e._chunks, d = !1;
      if (!e._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = c[n[0]], y = 0; y < i; y++) {
            var m = p[y];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = g), g++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = c[n[0]], _ = c[n[1]], b = t[n[1]][0], S = t[n[1]][1], y = 0; y < i; y++) {
            var m = p[y], w = _[y];
            (m >= f && m <= v || isNaN(m)) && (w >= b && w <= S || isNaN(w)) && (l[u++] = g), g++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = e.getRawIndex(y), m = c[n[0]][x];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var C = !0, x = e.getRawIndex(y), A = 0; A < a; A++) {
              var M = n[A], m = c[M][x];
              (m < t[M][0] || m > t[M][1]) && (C = !1);
            }
            C && (l[u++] = e.getRawIndex(y));
          }
      return u < o && (e._indices = l), e._count = u, e._extent = [], e._updateGetRawIdx(), e;
    }, r.prototype.map = function(t, e) {
      var i = this.clone(t);
      return this._updateDims(i, t, e), i;
    }, r.prototype.modify = function(t, e) {
      this._updateDims(this, t, e);
    }, r.prototype._updateDims = function(t, e, i) {
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, h = 0; h < e.length; h++)
        u[e[h]] = Ai();
      for (var f = 0; f < s; f++) {
        for (var v = t.getRawIndex(f), c = 0; c < o; c++)
          l[c] = n[e[c]][v];
        l[o] = f;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var h = 0; h < d.length; h++) {
            var g = e[h], p = d[h], y = u[g], m = n[g];
            m && (m[v] = p), p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), h, f, v, c = new (Di(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      c[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var g = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), y = (p + g) / 2, m = 0, _ = g; _ < p; _++) {
          var b = this.getRawIndex(_), S = a[b];
          isNaN(S) || (m += S);
        }
        m /= p - g;
        var w = d, x = Math.min(d + l, o), C = d - 1, A = a[u];
        h = -1, v = w;
        for (var M = -1, T = 0, _ = w; _ < x; _++) {
          var b = this.getRawIndex(_), S = a[b];
          if (isNaN(S)) {
            T++, M < 0 && (M = b);
            continue;
          }
          f = Math.abs((C - y) * (S - A) - (C - _) * (m - A)), f > h && (h = f, v = b);
        }
        T > 0 && T < x - w && (c[s++] = Math.min(M, v), v = Math.max(M, v)), c[s++] = v, u = v;
      }
      return c[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = c, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (Di(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var f = h, v = o[this.getRawIndex(f)], c = h, d = o[this.getRawIndex(c)], g = a;
        h + a > s && (g = s - h);
        for (var p = 0; p < g; p++) {
          var y = this.getRawIndex(h + p), m = o[y];
          m < v && (v = m, f = h + p), m > d && (d = m, c = h + p);
        }
        var _ = this.getRawIndex(f), b = this.getRawIndex(c);
        f < c ? (l[u++] = _, l[u++] = b) : (l[u++] = b, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], h = this.count(), f = a._rawExtent[t] = Ai(), v = new (Di(this._rawCount))(Math.ceil(h / l)), c = 0, d = 0; d < h; d += l) {
        l > h - d && (l = h - d, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(d + g);
          s[g] = u[p];
        }
        var y = i(s), m = this.getRawIndex(Math.min(d + n(s, y) || 0, h - 1));
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
      var e = this._chunks[t], i = Ai();
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
      var i = new r(), n = this._chunks, a = t && an(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? Bx(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, r.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = tt(this._extent), t._rawExtent = tt(this._rawExtent);
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
        return Do(e[a], this._dimensions[a]);
      }
      Bl = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return Do(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return Do(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    }(), r;
  }()
), Nx = (
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
      if (Za(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var h = e[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = Ut(s) ? mr : ve, a = [];
        var f = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, c = Q(f.seriesLayoutBy, v.seriesLayoutBy) || null, d = Q(f.sourceHeader, v.sourceHeader), g = Q(f.dimensions, v.dimensions), p = c !== v.seriesLayoutBy || !!d != !!v.sourceHeader || g;
        n = p ? [zu(s, {
          seriesLayoutBy: c,
          sourceHeader: d,
          dimensions: g
        }, l)] : [];
      } else {
        var y = t;
        if (i) {
          var m = this._applyTransform(e);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          n = [zu(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Hv(a);
      }
      var o, s = [], l = [];
      return D(t, function(u) {
        u.prepareSource();
        var h = u.getSource(n || 0), f = "";
        n != null && !h && Hv(f), s.push(h), l.push(u._getVersionSign());
      }), i ? o = Ex(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [dx(s[0])]), {
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
        Za(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new Hu(), s.initData(new Ty(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Za(t)) {
        var e = gy(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return W(GS(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (Za(t))
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
function Za(r) {
  return r.mainType === "series";
}
function Hv(r) {
  throw new Error(r);
}
var Fx = "line-height:1";
function Ly(r) {
  var t = r.lineHeight;
  return t == null ? Fx : "line-height:" + $t(t + "") + "px";
}
function Ey(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + $t(i + "") + "px;color:" + $t(e) + ";font-weight:" + $t(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + $t(o + "") + "px;color:" + $t(a) + ";font-weight:" + $t(s + "")
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
var $x = [0, 10, 20, 30], zx = ["", `
`, `

`, `


`];
function da(r, t) {
  return t.type = r, t;
}
function Gu(r) {
  return r.type === "section";
}
function Ry(r) {
  return Gu(r) ? Hx : Gx;
}
function ky(r) {
  if (Gu(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return D(r.blocks, function(n) {
      var a = ky(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Gu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function Hx(r, t, e, i) {
  var n = t.noHeader, a = Vx(ky(t)), o = [], s = t.blocks || [];
  Ze(!s || $(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (li(u, l)) {
      var h = new Tx(u[l], null);
      s.sort(function(g, p) {
        return h.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  D(s, function(g, p) {
    var y = t.valueFormatter, m = Ry(g)(
      // Inherit valueFormatter
      y ? O(O({}, r), {
        valueFormatter: y
      }) : r,
      g,
      p > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var f = r.renderMode === "richText" ? o.join(a.richText) : Vu(i, o.join(""), n ? e : a.html);
  if (n)
    return f;
  var v = $u(t.header, "ordinal", r.useUTC), c = Ey(i, r.renderMode).nameStyle, d = Ly(i);
  return r.renderMode === "richText" ? Oy(r, v, c) + a.richText + f : Vu(i, '<div style="' + c + ";" + d + ';">' + $t(v) + "</div>" + f, e);
}
function Gx(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, h = t.valueFormatter || r.valueFormatter || function(b) {
    return b = $(b) ? b : [b], W(b, function(S, w) {
      return $u(S, $(c) ? c[w] : c, u);
    });
  };
  if (!(a && o)) {
    var f = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : $u(l, "ordinal", u), c = t.valueType, d = o ? [] : h(t.value, t.dataIndex), g = !s || !a, p = !s && a, y = Ey(i, n), m = y.nameStyle, _ = y.valueStyle;
    return n === "richText" ? (s ? "" : f) + (a ? "" : Oy(r, v, m)) + (o ? "" : Yx(r, d, g, p, _)) : Vu(i, (s ? "" : f) + (a ? "" : Wx(v, !s, m)) + (o ? "" : Ux(d, g, p, _)), e);
  }
}
function Gv(r, t, e, i, n, a) {
  if (r) {
    var o = Ry(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function Vx(r) {
  return {
    html: $x[r],
    richText: zx[r]
  };
}
function Vu(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = Ly(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function Wx(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + $t(r) + "</span>";
}
function Ux(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = $(r) ? r : [r], '<span style="' + a + ";" + i + '">' + W(r, function(o) {
    return $t(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function Oy(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function Yx(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle($(t) ? t.join("  ") : t, a);
}
function Xx(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return fi(i);
}
function By(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var Nl = (
  /** @class */
  function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = cg();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = kS({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return z(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      $(e) ? D(e, function(a) {
        return O(i, a);
      }) : O(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  }()
);
function qx(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = $(s), u = Xx(t, e), h, f, v, c;
  if (o > 1 || l && !o) {
    var d = Zx(s, t, e, a, u);
    h = d.inlineValues, f = d.inlineValueTypes, v = d.blocks, c = d.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    c = h = Qi(n, e, a[0]), f = g.type;
  } else
    c = h = l ? s[0] : s;
  var p = Oh(t), y = p && t.name || "", m = n.getName(e), _ = i ? y : m;
  return da("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: c,
    blocks: [da("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Ie(_),
      value: h,
      valueType: f,
      dataIndex: e
    })].concat(v || [])
  });
}
function Zx(r, t, e, i, n) {
  var a = t.getData(), o = an(r, function(f, v, c) {
    var d = a.getDimensionInfo(c);
    return f = f || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? D(i, function(f) {
    h(Qi(a, e, f), f);
  }) : D(r, h);
  function h(f, v) {
    var c = a.getDimensionInfo(v);
    !c || c.otherDims.tooltip === !1 || (o ? u.push(da("nameValue", {
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
var ar = Tt();
function Ka(r, t) {
  return r.getName(t) || r.getId(t);
}
var Kx = "__universalTransitionEnabled", ke = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = jn({
        count: jx,
        reset: Jx
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = ar(this).sourceManager = new Nx(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      Wv(o, this), this.dataTask.context.data = o, ar(this).dataBeforeProcessed = o, Vv(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = ca(this), a = n ? Rs(e) : {}, o = this.subType;
      lt.hasClass(o) && (o += "Series"), it(e, i.getTheme().get(this.subType)), it(e, this.getDefaultOption()), Ac(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Ki(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = it(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = ca(this);
      n && Ki(this.option, e, n);
      var a = ar(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      Wv(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, ar(this).dataBeforeProcessed = o, Vv(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !Ut(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && Ac(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Wu(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return ar(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = Wu(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      ar(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return K(e);
    }, t.prototype.getSourceManager = function() {
      return ar(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return ar(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return qx({
        series: this,
        dataIndex: e,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var e = this.ecModel;
      if (U.node && !(e && e.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(e, i, n) {
      var a = this.ecModel, o = nf.prototype.getColorFromPalette.call(this, e, i, n);
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
          var l = e[s], u = Ka(o, l);
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
      return (n === "all" || n[Ka(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[Kx])
        return !0;
      var e = this.option.universalTransition;
      return e ? e === !0 ? !0 : e && e.enabled : !1;
    }, t.prototype._innerSelect = function(e, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          G(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, h = 0; h < l; h++) {
            var f = i[h], v = Ka(e, f);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(f);
          }
        } else if (s === "single" || s === !0) {
          var c = i[l - 1], v = Ka(e, c);
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
      return lt.registerClass(e);
    }, t.protoInitialize = function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    }(), t;
  }(lt)
);
Ne(ke, Sx);
Ne(ke, nf);
mg(ke, lt);
function Vv(r) {
  var t = r.name;
  Oh(r) || (r.name = Qx(r) || t);
}
function Qx(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function jx(r) {
  return r.model.getRawData().count();
}
function Jx(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), tT;
}
function tT(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Wv(r, t) {
  D(y_(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, St(eT, t));
  });
}
function eT(r, t) {
  var e = Wu(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Wu(r) {
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
var Oe = (
  /** @class */
  function() {
    function r() {
      this.group = new Mt(), this.uid = Ds("viewComponent");
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
Nh(Oe);
cs(Oe);
function hf() {
  var r = Tt();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var Ny = Tt(), rT = hf(), Se = (
  /** @class */
  function() {
    function r() {
      this.group = new Mt(), this.uid = Ds("viewChart"), this.renderTask = jn({
        plan: iT,
        reset: nT
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Yv(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Yv(a, n, "normal");
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
      ws(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      Ny(t).updateMethod = e;
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.type = "chart";
    }(), r;
  }()
);
function Uv(r, t, e) {
  r && ku(r) && (t === "emphasis" ? Vo : Wo)(r, e);
}
function Yv(r, t, e) {
  var i = ui(r, t), n = t && t.highlightKey != null ? mw(t.highlightKey) : null;
  i != null ? D(Bt(i), function(a) {
    Uv(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    Uv(a, e, n);
  });
}
Nh(Se);
cs(Se);
function iT(r) {
  return rT(r.model);
}
function nT(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && Ny(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), aT[l];
}
var aT = {
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
}, jo = "\0__throttleOriginMethod", Xv = "\0__throttleRate", qv = "\0__throttleType";
function ff(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function f() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var c = [], d = 0; d < arguments.length; d++)
      c[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = c;
    var g = h || t, p = h || e;
    h = null, s = i - (p ? n : a) - g, clearTimeout(o), p ? o = setTimeout(f, g) : s >= 0 ? f() : o = setTimeout(f, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(c) {
    h = c;
  }, v;
}
function Fy(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[jo] || n, o = n[qv], s = n[Xv];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = ff(a, e, i === "debounce"), n[jo] = a, n[qv] = i, n[Xv] = e;
    }
    return n;
  }
}
function Uu(r, t) {
  var e = r[t];
  e && e[jo] && (e.clear && e.clear(), r[t] = e[jo]);
}
var Zv = Tt(), Kv = {
  itemStyle: ua(Qg, !0),
  lineStyle: ua(Kg, !0)
}, oT = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function $y(r, t) {
  var e = r.visualStyleMapper || Kv[t];
  return e || (console.warn("Unknown style type '" + t + "'."), Kv.itemStyle);
}
function zy(r, t) {
  var e = r.visualDrawType || oT[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var sT = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = $y(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = zy(r, i), u = o[l], h = q(u) ? u : null, f = o.fill === "auto" || o.stroke === "auto";
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
        dataEach: function(c, d) {
          var g = r.getDataParams(d), p = O({}, o);
          p[l] = h(g), c.setItemVisual(d, "style", p);
        }
      };
  }
}, xn = new yt(), lT = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = $y(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            xn.option = l[i];
            var u = n(xn), h = o.ensureUniqueItemVisual(s, "style");
            O(h, u), xn.option.decal && (o.setItemVisual(s, "decal", xn.option.decal), xn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, uT = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = K();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Zv(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Zv(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = zy(e, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          n[h] = u;
        }), i.each(function(u) {
          var h = n[u], f = a.getItemVisual(h, "colorFromPalette");
          if (f) {
            var v = a.ensureUniqueItemVisual(h, "style"), c = i.getName(u) || u + "", d = i.count();
            v[l] = e.getColorFromPalette(c, o, d);
          }
        });
      }
    });
  }
}, Qa = Math.PI;
function hT(r, t) {
  t = t || {}, at(t, {
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
  var e = new Mt(), i = new xt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new Yt({
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
  }), a = new xt({
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
  return t.showSpinner && (o = new _s({
    shape: {
      startAngle: -Qa / 2,
      endAngle: -Qa / 2 + 0.1,
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
    endAngle: Qa * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Qa * 3 / 2
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
var Hy = (
  /** @class */
  function() {
    function r(t, e, i, n) {
      this._stageTaskMap = K(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
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
      var e = this, i = e._pipelineMap = K();
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
      D(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        Ze(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
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
      D(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var h = o._stageTaskMap.get(l.uid), f = h.seriesTaskMap, v = h.overallTask;
          if (v) {
            var c, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), c = !0);
            }), c && v.dirty(), o.updatePayload(v, i);
            var g = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(g);
            }), v.perform(g) && (a = !0);
          } else f && f.each(function(p, y) {
            s(n, p) && p.dirty();
            var m = o.getPerformArgs(p, n.block);
            m.skip = !l.performRawSeries && e.isSeriesFiltered(p.context.model), o.updatePayload(p, i), p.perform(m) && (a = !0);
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
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = K(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : u && u(i, n).each(h);
      function h(f) {
        var v = f.uid, c = s.set(v, o && o.get(v) || jn({
          plan: pT,
          reset: gT,
          count: mT
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
      var a = this, o = e.overallTask = e.overallTask || jn({
        reset: fT
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = K(), u = t.seriesType, h = t.getTargetSeries, f = !0, v = !1, c = "";
      Ze(!t.createOnAllSeries, c), u ? i.eachRawSeriesByType(u, d) : h ? h(i, n).each(d) : (f = !1, D(i.getSeries(), d));
      function d(g) {
        var p = g.uid, y = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, jn({
          reset: cT,
          onDirty: dT
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
        seriesType: _T(t)
      }), t.uid = Ds("stageHandler"), e && (t.visualType = e), t;
    }, r;
  }()
);
function fT(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function cT(r) {
  return r.overallProgress && vT;
}
function vT() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function dT() {
  this.agent && this.agent.dirty();
}
function pT(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function gT(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Bt(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? W(t, function(e, i) {
    return Gy(i);
  }) : yT;
}
var yT = Gy(0);
function Gy(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function mT(r) {
  return r.data.count();
}
function _T(r) {
  Jo = null;
  try {
    r(pa, Vy);
  } catch {
  }
  return Jo;
}
var pa = {}, Vy = {}, Jo;
Wy(pa, af);
Wy(Vy, my);
pa.eachSeriesByType = pa.eachRawSeriesByType = function(r) {
  Jo = r;
};
pa.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Jo = r.subType);
};
function Wy(r, t) {
  for (var e in t.prototype)
    r[e] = Vt;
}
var Qv = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const bT = {
  color: Qv,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Qv]
};
var Lt = "#B9B8CE", jv = "#100C2A", ja = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Lt
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
}, Jv = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], Uy = {
  darkMode: !0,
  color: Jv,
  backgroundColor: jv,
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
      color: Lt
    },
    pageTextStyle: {
      color: Lt
    }
  },
  textStyle: {
    color: Lt
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
      borderColor: Lt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Lt
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
      color: Lt
    }
  },
  timeline: {
    lineStyle: {
      color: Lt
    },
    label: {
      color: Lt
    },
    controlStyle: {
      color: Lt,
      borderColor: Lt
    }
  },
  calendar: {
    itemStyle: {
      color: jv
    },
    dayLabel: {
      color: Lt
    },
    monthLabel: {
      color: Lt
    },
    yearLabel: {
      color: Lt
    }
  },
  timeAxis: ja(),
  logAxis: ja(),
  valueAxis: ja(),
  categoryAxis: ja(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: Jv
  },
  gauge: {
    title: {
      color: Lt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Lt
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
Uy.categoryAxis.splitLine.show = !1;
var wT = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (z(t)) {
        var a = Le(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        D(t, function(l, u) {
          for (var h = !1, f = 0; f < o.length; f++) {
            var v = o[f], c = u.lastIndexOf(v);
            if (c > 0 && c === u.length - v.length) {
              var d = u.slice(0, c);
              d !== "data" && (e.mainType = d, e[v.toLowerCase()] = l, h = !0);
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
      function h(f, v, c, d) {
        return f[c] == null || v[d || c] === f[c];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  }()
), Yu = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], td = Yu.concat(["symbolKeepAspect"]), ST = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Yu.length; o++) {
      var s = Yu[o], l = r.get(s);
      q(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(O({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = dt(n);
    function h(f, v) {
      for (var c = r.getRawValue(v), d = r.getDataParams(v), g = 0; g < u.length; g++) {
        var p = u[g];
        f.setItemVisual(v, p, n[p](c, d));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, xT = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < td.length; s++) {
        var l = td[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function TT(r, t, e) {
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
function CT(r, t) {
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
function Mi(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var f = o.getData(), v = ui(f, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: $(v) ? f.getName(v[0]) : f.getName(v),
          selected: z(l) ? l : O({}, l)
        });
      }
  });
}
function DT(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (Mi("map", "selectchanged", t, n, i), Mi("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (Mi("map", "selected", t, n, i), Mi("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (Mi("map", "unselected", t, n, i), Mi("pie", "unselected", t, n, i));
  });
}
function $n(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var AT = Math.round(Math.random() * 9), MT = typeof Object.defineProperty == "function", PT = function() {
  function r() {
    this._id = "__ec_inner_" + AT++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return MT ? Object.defineProperty(i, this._id, {
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
}(), IT = ot.extend({
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
}), LT = ot.extend({
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
}), ET = ot.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, f = Math.sin(u), v = Math.cos(u), c = o * 0.6, d = o * 0.7;
    r.moveTo(e - h, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + h - f * c, l + s + v * c, e, i - d, e, i), r.bezierCurveTo(e, i - d, e - h + f * c, l + s + v * c, e - h, l + s), r.closePath();
  }
}), RT = ot.extend({
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
}), kT = {
  line: wr,
  rect: xt,
  roundRect: xt,
  square: xt,
  circle: ms,
  diamond: LT,
  pin: ET,
  arrow: RT,
  triangle: IT
}, OT = {
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
}, Xu = {};
D(kT, function(r, t) {
  Xu[t] = new r();
});
var BT = ot.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = $o(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Xu[i];
      n || (i = "rect", n = Xu[i]), OT[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function NT(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function ji(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = Ug(r.slice(8), new nt(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = qh(r.slice(7), {}, new nt(t, e, i, n), o ? "center" : "cover") : l = new BT({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = NT, a && l.setColor(a), l;
}
function FT(r) {
  return $(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function Yy(r, t) {
  if (r != null)
    return $(r) || (r = [r, r]), [Ot(r[0], t[0]) || 0, Ot(Q(r[1], r[0]), t[1]) || 0];
}
function ei(r) {
  return isFinite(r);
}
function $T(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = ei(i) ? i : 0, n = ei(n) ? n : 1, a = ei(a) ? a : 0, o = ei(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function zT(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = ei(o) ? o : 0.5, s = ei(s) ? s : 0.5, l = l >= 0 && ei(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function qu(r, t, e) {
  for (var i = t.type === "radial" ? zT(r, t, e) : $T(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function HT(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function Ja(r) {
  return parseInt(r, 10);
}
function to(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || Ja(s[i]) || Ja(r.style[i])) - (Ja(s[a]) || 0) - (Ja(s[o]) || 0) | 0;
}
function GT(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : ft(r) ? [r] : $(r) ? r : null;
}
function Xy(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && GT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = W(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var VT = new hi(!0);
function ts(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function ed(r) {
  return typeof r == "string" && r !== "none";
}
function es(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function rd(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function id(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Zu(r, t, e) {
  var i = _g(t.image, t.__image, e);
  if (vs(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * m_), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function WT(r, t, e, i) {
  var n, a = ts(e), o = es(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || VT, f = t.__dirty;
  if (!i) {
    var v = e.fill, c = e.stroke, d = o && !!v.colorStops, g = a && !!c.colorStops, p = o && !!v.image, y = a && !!c.image, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0;
    (d || g) && (w = t.getBoundingRect()), d && (m = f ? qu(r, v, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = f ? qu(r, c, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (b = f || !t.__canvasFillPattern ? Zu(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = f || !t.__canvasStrokePattern ? Zu(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), d ? r.fillStyle = m : p && (b ? r.fillStyle = b : o = !1), g ? r.strokeStyle = _ : y && (S ? r.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var C, A;
  r.setLineDash && e.lineDash && (n = Xy(t), C = n[0], A = n[1]);
  var M = !0;
  (u || f & Ri) && (h.setDPR(r.dpr), l ? h.setContext(null) : (h.setContext(r), M = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), M && h.rebuildPath(r, l ? s : 1), C && (r.setLineDash(C), r.lineDashOffset = A), i || (e.strokeFirst ? (a && id(r, e), o && rd(r, e)) : (o && rd(r, e), a && id(r, e))), C && r.setLineDash([]);
}
function UT(r, t, e) {
  var i = t.__image = _g(e.image, t.__image, t, t.onload);
  if (!(!i || !vs(i))) {
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
function YT(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || si, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = Xy(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (ts(e) && r.strokeText(n, e.x, e.y), es(e) && r.fillText(n, e.x, e.y)) : (es(e) && r.fillText(n, e.x, e.y), ts(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var nd = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], ad = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function qy(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    Gt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? ii.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (Gt(r, n), a = !0), r.globalCompositeOperation = t.blend || ii.blend);
  for (var s = 0; s < nd.length; s++) {
    var l = nd[s];
    (i || t[l] !== e[l]) && (a || (Gt(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (Gt(r, n), a = !0), r.shadowColor = t.shadowColor || ii.shadowColor), a;
}
function od(r, t, e, i, n) {
  var a = ga(t, n.inHover), o = i ? null : e && ga(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = qy(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Gt(r, n), s = !0), ed(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Gt(r, n), s = !0), ed(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Gt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (Gt(r, n), s = !0), r.lineWidth = u);
  }
  for (var h = 0; h < ad.length; h++) {
    var f = ad[h], v = f[0];
    (i || a[v] !== o[v]) && (s || (Gt(r, n), s = !0), r[v] = a[v] || f[1]);
  }
  return s;
}
function XT(r, t, e, i, n) {
  return qy(r, ga(t, n.inHover), e && ga(e, n.inHover), i, n);
}
function Zy(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function qT(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), Zy(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function ZT(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var sd = 1, ld = 2, ud = 3, hd = 4;
function KT(r) {
  var t = es(r), e = ts(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function Gt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function ga(r, t) {
  return t && r.__hoverStyle || r.style;
}
function Ky(r, t) {
  ri(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function ri(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Kt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || HT(a, o)) && (o && o.length && (Gt(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (Gt(r, e), r.save(), qT(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var h = t instanceof ot && t.autoBatch && KT(t.style);
  s || ZT(n, u.transform) ? (Gt(r, e), Zy(r, t)) : h || Gt(r, e);
  var f = ga(t, e.inHover);
  t instanceof ot ? (e.lastDrawType !== sd && (l = !0, e.lastDrawType = sd), od(r, t, u, l, e), (!h || !e.batchFill && !e.batchStroke) && r.beginPath(), WT(r, t, f, h), h && (e.batchFill = f.fill || "", e.batchStroke = f.stroke || "")) : t instanceof Go ? (e.lastDrawType !== ud && (l = !0, e.lastDrawType = ud), od(r, t, u, l, e), YT(r, t, f)) : t instanceof Tr ? (e.lastDrawType !== ld && (l = !0, e.lastDrawType = ld), XT(r, t, u, l, e), UT(r, t, f)) : t.getTemporalDisplayables && (e.lastDrawType !== hd && (l = !0, e.lastDrawType = hd), QT(r, t, e)), h && i && Gt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function QT(r, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), ri(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = n.length; u < h; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), ri(r, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Fl = new PT(), fd = new Sa(100), cd = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Ku(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Fl.delete(r);
  var a = Fl.get(r);
  if (a)
    return a;
  var o = at(r, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Fl.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var h = [e], f = !0, v = 0; v < cd.length; ++v) {
      var c = o[cd[v]];
      if (c != null && !$(c) && !z(c) && !ft(c) && typeof c != "boolean") {
        f = !1;
        break;
      }
      h.push(c);
    }
    var d;
    if (f) {
      d = h.join(",") + (n ? "-svg" : "");
      var g = fd.get(d);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var p = jy(o.dashArrayX), y = jT(o.dashArrayY), m = Qy(o.symbol), _ = JT(p), b = Jy(y), S = !n && nn.createCanvas(), w = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = A(), C;
    S && (S.width = x.width * e, S.height = x.height * e, C = S.getContext("2d")), M(), f && fd.put(d, S || w), u.image = S, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function A() {
      for (var T = 1, P = 0, I = _.length; P < I; ++P)
        T = Cc(T, _[P]);
      for (var L = 1, P = 0, I = m.length; P < I; ++P)
        L = Cc(L, m[P].length);
      T *= L;
      var E = b * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(E, o.maxTileHeight))
      };
    }
    function M() {
      C && (C.clearRect(0, 0, S.width, S.height), o.backgroundColor && (C.fillStyle = o.backgroundColor, C.fillRect(0, 0, S.width, S.height)));
      for (var T = 0, P = 0; P < y.length; ++P)
        T += y[P];
      if (T <= 0)
        return;
      for (var I = -b, L = 0, E = 0, R = 0; I < x.height; ) {
        if (L % 2 === 0) {
          for (var H = E / 2 % m.length, k = 0, N = 0, V = 0; k < x.width * 2; ) {
            for (var Z = 0, P = 0; P < p[R].length; ++P)
              Z += p[R][P];
            if (Z <= 0)
              break;
            if (N % 2 === 0) {
              var j = (1 - o.symbolSize) * 0.5, st = k + p[R][N] * j, ct = I + y[L] * j, pt = p[R][N] * o.symbolSize, de = y[L] * o.symbolSize, Dr = V / 2 % m[H].length;
              gi(st, ct, pt, de, m[H][Dr]);
            }
            k += p[R][N], ++V, ++N, N === p[R].length && (N = 0);
          }
          ++R, R === p.length && (R = 0);
        }
        I += y[L], ++E, ++L, L === y.length && (L = 0);
      }
      function gi(qt, Ct, Y, J, Ar) {
        var Rt = n ? 1 : e, Lf = ji(Ar, qt * Rt, Ct * Rt, Y * Rt, J * Rt, o.color, o.symbolKeepAspect);
        if (n) {
          var Ef = i.painter.renderOneToVNode(Lf);
          Ef && w.children.push(Ef);
        } else
          Ky(C, Lf);
      }
    }
  }
}
function Qy(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if (z(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!z(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return Qy([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    z(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function jy(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (ft(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!ft(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return jy([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (ft(r[i])) {
      var t = Math.ceil(r[i]);
      n.push([t, t]);
    } else {
      var t = W(r[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function jT(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (ft(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = W(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function JT(r) {
  return W(r, function(t) {
    return Jy(t);
  });
}
function Jy(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function tC(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = Ku(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = Ku(n, t);
      }
    }
  });
}
var _e = new Fe(), tm = {};
function eC(r, t) {
  tm[r] = t;
}
function rC(r) {
  return tm[r];
}
var iC = 1, nC = 800, aC = 900, oC = 1e3, sC = 2e3, lC = 5e3, em = 1e3, uC = 1100, cf = 2e3, rm = 3e3, hC = 4e3, Bs = 4500, fC = 4600, cC = 5e3, vC = 6e3, im = 7e3, dC = {
  PROCESSOR: {
    FILTER: oC,
    SERIES_FILTER: nC,
    STATISTIC: lC
  },
  VISUAL: {
    LAYOUT: em,
    PROGRESSIVE_LAYOUT: uC,
    GLOBAL: cf,
    CHART: rm,
    POST_CHART_LAYOUT: fC,
    COMPONENT: hC,
    BRUSH: cC,
    CHART_ITEM: Bs,
    ARIA: vC,
    DECAL: im
  }
}, It = "__flagInMainProcess", Ft = "__pendingUpdate", $l = "__needsUpdateStatus", vd = /^[a-zA-Z0-9_]+$/, zl = "__connectUpdateStatus", dd = 0, pC = 1, gC = 2;
function nm(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return om(this, r, t);
  };
}
function am(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return om(this, r, t);
  };
}
function om(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), Fe.prototype[t].apply(r, e);
}
var sm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(Fe)
), lm = sm.prototype;
lm.on = am("on");
lm.off = am("off");
var Pi, Hl, eo, or, Gl, Vl, Wl, Tn, Cn, pd, gd, Ul, yd, ro, md, um, ee, _d, hm = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, new wT()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, z(i) && (i = fm[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = Sc(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: Q(n.useDirtyRect, l),
        useCoarsePointer: Q(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = ff(vt(u.flush, u), 17), i = tt(i), i && by(i, !0), a._theme = i, a._locale = AS(n.locale || Jg), a._coordSysMgr = new of();
      var h = a._api = md(a);
      function f(v, c) {
        return v.__prio - c.__prio;
      }
      return go(is, f), go(Qu, f), a._scheduler = new Hy(a, h, Qu, is), a._messageCenter = new sm(), a._initEvents(), a.resize = vt(a.resize, a), u.animation.on("frame", a._onframe, a), pd(u, a), gd(u, a), fu(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        _d(this);
        var e = this._scheduler;
        if (this[Ft]) {
          var i = this[Ft].silent;
          this[It] = !0;
          try {
            Pi(this), or.update.call(this, null, this[Ft].updateParams);
          } catch (l) {
            throw this[It] = !1, this[Ft] = null, l;
          }
          this._zr.flush(), this[It] = !1, this[Ft] = null, Tn.call(this, i), Cn.call(this, i);
        } else if (e.unfinished) {
          var n = iC, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Vl(this, a), e.performVisualTasks(a), ro(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
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
      if (!this[It]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (G(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[It] = !0, !this._model || i) {
          var l = new tx(this._api), u = this._theme, h = this._model = new af();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(e, {
          replaceMerge: o
        }, ju);
        var f = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Ft] = {
            silent: a,
            updateParams: f
          }, this[It] = !1, this.getZr().wakeUp();
        else {
          try {
            Pi(this), or.update.call(this, null, f);
          } catch (v) {
            throw this[Ft] = null, this[It] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Ft] = null, this[It] = !1, Tn.call(this, a), Cn.call(this, a);
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
      return this._zr.painter.dpr || U.hasGlobalWindow && window.devicePixelRatio || 1;
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
      if (U.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return D(i, function(n) {
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
      D(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var h = o._componentsMap[u.__viewId];
          h.group.ignore || (a.push(h), h.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return D(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (bd[n]) {
        var l = s, u = s, h = -s, f = -s, v = [], c = e && e.pixelRatio || this.getDevicePixelRatio();
        D(ta, function(_, b) {
          if (_.group === n) {
            var S = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(tt(e)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), f = o(w.bottom, f), v.push({
              dom: S,
              left: w.left,
              top: w.top
            });
          }
        }), l *= c, u *= c, h *= c, f *= c;
        var d = h - l, g = f - u, p = nn.createCanvas(), y = Sc(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (y.resize({
          width: d,
          height: g
        }), i) {
          var m = "";
          return D(v, function(_) {
            var b = _.left - l, S = _.top - u;
            m += '<g transform="translate(' + b + "," + S + ')">' + _.dom + "</g>";
          }), y.painter.getSvgRoot().innerHTML = m, e.connectedBackgroundColor && y.painter.setBackgroundColor(e.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && y.add(new xt({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: g
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), D(v, function(_) {
            var b = new Tr({
              style: {
                x: _.left * c - l,
                y: _.top * c - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), p.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return Gl(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return Gl(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = fl(n, e);
      return D(o, function(s, l) {
        l.indexOf("Models") >= 0 && D(s, function(u) {
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
      var n = this._model, a = fl(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? TT(s, l, i) : CT(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      D(yC, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && $n(s, function(d) {
            var g = rt(d);
            if (g && g.dataIndex != null) {
              var p = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = p && p.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = O({}, g.eventData), !0;
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
      }), D(Jn, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), D(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), DT(this._messageCenter, this, this._api);
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
      e && gg(this.getDom(), df, "");
      var i = this, n = i._api, a = i._model;
      D(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), D(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete ta[i.id];
    }, t.prototype.resize = function(e) {
      if (!this[It]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(e);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = e && e.silent;
          this[Ft] && (a == null && (a = this[Ft].silent), n = !0, this[Ft] = null), this[It] = !0;
          try {
            n && Pi(this), or.update.call(this, {
              type: "resize",
              animation: O({
                // Disable animation
                duration: 0
              }, e && e.animation)
            });
          } catch (o) {
            throw this[It] = !1, o;
          }
          this[It] = !1, Tn.call(this, a), Cn.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (G(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !!Ju[e]) {
        var n = Ju[e](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = O({}, e);
      return i.type = Jn[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (G(i) || (i = {
        silent: !!i
      }), !!rs[e.type] && this._model) {
        if (this[It]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Wl.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && U.browser.weChat && this._throttledZrFlush(), Tn.call(this, n), Cn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      _e.trigger("series:layoutlabels", this._model, this._api, {
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
      Pi = function(f) {
        var v = f._scheduler;
        v.restorePipelines(f._model), v.prepareStageTasks(), Hl(f, !0), Hl(f, !1), v.plan();
      }, Hl = function(f, v) {
        for (var c = f._model, d = f._scheduler, g = v ? f._componentsViews : f._chartsViews, p = v ? f._componentsMap : f._chartsMap, y = f._zr, m = f._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        v ? c.eachComponent(function(w, x) {
          w !== "series" && b(x);
        }) : c.eachSeries(b);
        function b(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var C = "_ec_" + w.id + "_" + w.type, A = !x && p[C];
          if (!A) {
            var M = Le(w.type), T = v ? Oe.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Se.getClass(M.sub)
            );
            A = new T(), A.init(c, m), p[C] = A, g.push(A), y.add(A.group);
          }
          w.__viewId = A.__id = C, A.__alive = !0, A.__model = w, A.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !v && d.prepareView(A, w, c, m);
        }
        for (var _ = 0; _ < g.length; ) {
          var S = g[_];
          S.__alive ? _++ : (!v && S.renderTask.dispose(), y.remove(S.group), S.dispose(c, m), g.splice(_, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, eo = function(f, v, c, d, g) {
        var p = f._model;
        if (p.setUpdatePayload(c), !d) {
          D([].concat(f._componentsViews).concat(f._chartsViews), S);
          return;
        }
        var y = {};
        y[d + "Id"] = c[d + "Id"], y[d + "Index"] = c[d + "Index"], y[d + "Name"] = c[d + "Name"];
        var m = {
          mainType: d,
          query: y
        };
        g && (m.subType = g);
        var _ = c.excludeSeriesId, b;
        _ != null && (b = K(), D(Bt(_), function(w) {
          var x = Ee(w, null);
          x != null && b.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          if (!x)
            if (tv(c))
              if (w instanceof ke)
                c.type === ni && !c.notBlur && !w.get(["emphasis", "disabled"]) && hw(w, c, f._api);
              else {
                var C = Hh(w.mainType, w.componentIndex, c.name, f._api), A = C.focusSelf, M = C.dispatchers;
                c.type === ni && A && !c.notBlur && Lu(w.mainType, w.componentIndex, f._api), M && D(M, function(T) {
                  c.type === ni ? Vo(T) : Wo(T);
                });
              }
            else Ou(c) && w instanceof ke && (vw(w, c, f._api), jc(w), ee(f));
        }, f), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          x || S(f[d === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, f);
        function S(w) {
          w && w.__alive && w[v] && w[v](w.__model, p, f._api, c);
        }
      }, or = {
        prepareAndUpdate: function(f) {
          Pi(this), or.update.call(this, f, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: f.newOption != null
          });
        },
        update: function(f, v) {
          var c = this._model, d = this._api, g = this._zr, p = this._coordSysMgr, y = this._scheduler;
          if (c) {
            c.setUpdatePayload(f), y.restoreData(c, f), y.performSeriesTasks(c), p.create(c, d), y.performDataProcessorTasks(c, f), Vl(this, c), p.update(c, d), e(c), y.performVisualTasks(c, f), Ul(this, c, d, f, v);
            var m = c.get("backgroundColor") || "transparent", _ = c.get("darkMode");
            g.setBackgroundColor(m), _ != null && _ !== "auto" && g.setDarkMode(_), _e.trigger("afterupdate", c, d);
          }
        },
        updateTransform: function(f) {
          var v = this, c = this._model, d = this._api;
          if (c) {
            c.setUpdatePayload(f);
            var g = [];
            c.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = v.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var b = _.updateTransform(m, c, d, f);
                    b && b.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = K();
            c.eachSeries(function(y) {
              var m = v._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, c, d, f);
                _ && _.update && p.set(y.uid, 1);
              } else
                p.set(y.uid, 1);
            }), e(c), this._scheduler.performVisualTasks(c, f, {
              setDirty: !0,
              dirtyMap: p
            }), ro(this, c, d, f, {}, p), _e.trigger("afterupdate", c, d);
          }
        },
        updateView: function(f) {
          var v = this._model;
          v && (v.setUpdatePayload(f), Se.markUpdateMethod(f, "updateView"), e(v), this._scheduler.performVisualTasks(v, f, {
            setDirty: !0
          }), Ul(this, v, this._api, f, {}), _e.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(f) {
          var v = this, c = this._model;
          c && (c.setUpdatePayload(f), c.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), Se.markUpdateMethod(f, "updateVisual"), e(c), this._scheduler.performVisualTasks(c, f, {
            visualType: "visual",
            setDirty: !0
          }), c.eachComponent(function(d, g) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, c, v._api, f);
            }
          }), c.eachSeries(function(d) {
            var g = v._chartsMap[d.__viewId];
            g.updateVisual(d, c, v._api, f);
          }), _e.trigger("afterupdate", c, this._api));
        },
        updateLayout: function(f) {
          or.update.call(this, f);
        }
      }, Gl = function(f, v, c, d) {
        if (f._disposed) {
          f.id;
          return;
        }
        for (var g = f._model, p = f._coordSysMgr.getCoordinateSystems(), y, m = fl(g, c), _ = 0; _ < p.length; _++) {
          var b = p[_];
          if (b[v] && (y = b[v](g, m, d)) != null)
            return y;
        }
      }, Vl = function(f, v) {
        var c = f._chartsMap, d = f._scheduler;
        v.eachSeries(function(g) {
          d.updateStreamModes(g, c[g.__viewId]);
        });
      }, Wl = function(f, v) {
        var c = this, d = this.getModel(), g = f.type, p = f.escapeConnect, y = rs[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), S = _[0] != null && Le(_[0]);
        this[It] = !0;
        var w = [f], x = !1;
        f.batch && (x = !0, w = W(f.batch, function(L) {
          return L = at(O({}, L), f), L.batch = null, L;
        }));
        var C = [], A, M = Ou(f), T = tv(f);
        if (T && Og(this._api), D(w, function(L) {
          if (A = y.action(L, c._model, c._api), A = A || O({}, L), A.type = m.event || A.type, C.push(A), T) {
            var E = Bh(f), R = E.queryOptionMap, H = E.mainTypeSpecified, k = H ? R.keys()[0] : "series";
            eo(c, b, L, k), ee(c);
          } else M ? (eo(c, b, L, "series"), ee(c)) : S && eo(c, b, L, S.main, S.sub);
        }), b !== "none" && !T && !M && !S)
          try {
            this[Ft] ? (Pi(this), or.update.call(this, f), this[Ft] = null) : or[b].call(this, f);
          } catch (L) {
            throw this[It] = !1, L;
          }
        if (x ? A = {
          type: m.event || g,
          escapeConnect: p,
          batch: C
        } : A = C[0], this[It] = !1, !v) {
          var P = this._messageCenter;
          if (P.trigger(A.type, A), M) {
            var I = {
              type: "selectchanged",
              escapeConnect: p,
              selected: dw(d),
              isFromClick: f.isFromClick || !1,
              fromAction: f.type,
              fromActionPayload: f
            };
            P.trigger(I.type, I);
          }
        }
      }, Tn = function(f) {
        for (var v = this._pendingActions; v.length; ) {
          var c = v.shift();
          Wl.call(this, c, f);
        }
      }, Cn = function(f) {
        !f && this.trigger("updated");
      }, pd = function(f, v) {
        f.on("rendered", function(c) {
          v.trigger("rendered", c), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          f.animation.isFinished() && !v[Ft] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, gd = function(f, v) {
        f.on("mouseover", function(c) {
          var d = c.target, g = $n(d, ku);
          g && (fw(g, c, v._api), ee(v));
        }).on("mouseout", function(c) {
          var d = c.target, g = $n(d, ku);
          g && (cw(g, c, v._api), ee(v));
        }).on("click", function(c) {
          var d = c.target, g = $n(d, function(m) {
            return rt(m).dataIndex != null;
          }, !0);
          if (g) {
            var p = g.selected ? "unselect" : "select", y = rt(g);
            v._api.dispatchAction({
              type: p,
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
        var v = [], c = [], d = !1;
        if (f.eachComponent(function(m, _) {
          var b = _.get("zlevel") || 0, S = _.get("z") || 0, w = _.getZLevelKey();
          d = d || !!w, (m === "series" ? c : v).push({
            zlevel: b,
            z: S,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), d) {
          var g = v.concat(c), p, y;
          go(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), D(g, function(m) {
            var _ = f.getComponent(m.type, m.idx), b = m.zlevel, S = m.key;
            p != null && (b = Math.max(p, b)), S ? (b === p && S !== y && b++, y = S) : y && (b === p && b++, y = ""), p = b, _.setZLevel(b);
          });
        }
      }
      Ul = function(f, v, c, d, g) {
        i(v), yd(f, v, c, d, g), D(f._chartsViews, function(p) {
          p.__alive = !1;
        }), ro(f, v, c, d, g), D(f._chartsViews, function(p) {
          p.__alive || p.remove(v, c);
        });
      }, yd = function(f, v, c, d, g, p) {
        D(p || f._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, v, c, d), s(m, y), h(m, y);
        });
      }, ro = function(f, v, c, d, g, p) {
        var y = f._scheduler;
        g = O(g || {}, {
          updatedSeries: v.getSeries()
        }), _e.trigger("series:beforeupdate", v, c, g);
        var m = !1;
        v.eachSeries(function(_) {
          var b = f._chartsMap[_.__viewId];
          b.__alive = !0;
          var S = b.renderTask;
          y.updatePayload(S, d), u(_, b), p && p.get(_.uid) && S.dirty(), S.perform(y.getPerformArgs(S)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), jc(_);
        }), y.unfinished = m || y.unfinished, _e.trigger("series:layoutlabels", v, c, g), _e.trigger("series:transition", v, c, g), v.eachSeries(function(_) {
          var b = f._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(f, v), _e.trigger("series:afterupdate", v, c, g);
      }, ee = function(f) {
        f[$l] = !0, f.getZr().wakeUp();
      }, _d = function(f) {
        f[$l] && (f.getZr().storage.traverse(function(v) {
          Zn(v) || n(v);
        }), f[$l] = !1);
      };
      function n(f) {
        for (var v = [], c = f.currentStates, d = 0; d < c.length; d++) {
          var g = c[d];
          g === "emphasis" || g === "blur" || g === "select" || v.push(g);
        }
        f.selected && f.states.select && v.push("select"), f.hoverState === gs && f.states.emphasis ? v.push("emphasis") : f.hoverState === ps && f.states.blur && v.push("blur"), f.useStates(v);
      }
      function a(f, v) {
        var c = f._zr, d = c.storage, g = 0;
        d.traverse(function(p) {
          p.isGroup || g++;
        }), g > v.get("hoverLayerThreshold") && !U.node && !U.worker && v.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var y = f._chartsMap[p.__viewId];
            y.__alive && y.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(f, v) {
        var c = f.get("blendMode") || null;
        v.eachRendered(function(d) {
          d.isGroup || (d.style.blend = c);
        });
      }
      function s(f, v) {
        if (!f.preventAutoZ) {
          var c = f.get("z") || 0, d = f.get("zlevel") || 0;
          v.eachRendered(function(g) {
            return l(g, c, d, -1 / 0), !0;
          });
        }
      }
      function l(f, v, c, d) {
        var g = f.getTextContent(), p = f.getTextGuideLine(), y = f.isGroup;
        if (y)
          for (var m = f.childrenRef(), _ = 0; _ < m.length; _++)
            d = Math.max(l(m[_], v, c, d), d);
        else
          f.z = v, f.zlevel = c, d = Math.max(f.z2, d);
        if (g && (g.z = v, g.zlevel = c, isFinite(d) && (g.z2 = d + 2)), p) {
          var b = f.textGuideLineConfig;
          p.z = v, p.zlevel = c, isFinite(d) && (p.z2 = d + (b && b.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(f, v) {
        v.eachRendered(function(c) {
          if (!Zn(c)) {
            var d = c.getTextContent(), g = c.getTextGuideLine();
            c.stateTransition && (c.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), c.hasState() ? (c.prevStates = c.currentStates, c.clearStates()) : c.prevStates && (c.prevStates = null);
          }
        });
      }
      function h(f, v) {
        var c = f.getModel("stateAnimation"), d = f.isAnimationEnabled(), g = c.get("duration"), p = g > 0 ? {
          duration: g,
          delay: c.get("delay"),
          easing: c.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (Zn(y))
              return;
            if (y instanceof ot && _w(y), y.__dirty) {
              var m = y.prevStates;
              m && y.useStates(m);
            }
            if (d) {
              y.stateTransition = p;
              var _ = y.getTextContent(), b = y.getTextGuideLine();
              _ && (_.stateTransition = p), b && (b.stateTransition = p);
            }
            y.__dirty && n(y);
          }
        });
      }
      md = function(f) {
        return new /** @class */
        (function(v) {
          B(c, v);
          function c() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return c.prototype.getCoordinateSystems = function() {
            return f._coordSysMgr.getCoordinateSystems();
          }, c.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var g = d.__ecComponentInfo;
              if (g != null)
                return f._model.getComponent(g.mainType, g.index);
              d = d.parent;
            }
          }, c.prototype.enterEmphasis = function(d, g) {
            Vo(d, g), ee(f);
          }, c.prototype.leaveEmphasis = function(d, g) {
            Wo(d, g), ee(f);
          }, c.prototype.enterBlur = function(d) {
            uw(d), ee(f);
          }, c.prototype.leaveBlur = function(d) {
            Lg(d), ee(f);
          }, c.prototype.enterSelect = function(d) {
            Eg(d), ee(f);
          }, c.prototype.leaveSelect = function(d) {
            Rg(d), ee(f);
          }, c.prototype.getModel = function() {
            return f.getModel();
          }, c.prototype.getViewOfComponentModel = function(d) {
            return f.getViewOfComponentModel(d);
          }, c.prototype.getViewOfSeriesModel = function(d) {
            return f.getViewOfSeriesModel(d);
          }, c;
        }(my))(f);
      }, um = function(f) {
        function v(c, d) {
          for (var g = 0; g < c.length; g++) {
            var p = c[g];
            p[zl] = d;
          }
        }
        D(Jn, function(c, d) {
          f._messageCenter.on(d, function(g) {
            if (bd[f.group] && f[zl] !== dd) {
              if (g && g.escapeConnect)
                return;
              var p = f.makeActionFromEvent(g), y = [];
              D(ta, function(m) {
                m !== f && m.group === f.group && y.push(m);
              }), v(y, dd), D(y, function(m) {
                m[zl] !== pC && m.dispatchAction(p);
              }), v(y, gC);
            }
          });
        });
      };
    }(), t;
  }(Fe)
), vf = hm.prototype;
vf.on = nm("on");
vf.off = nm("off");
vf.one = function(r, t, e) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var yC = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var rs = {}, Jn = {}, Qu = [], ju = [], is = [], fm = {}, Ju = {}, ta = {}, bd = {}, mC = +/* @__PURE__ */ new Date() - 0, df = "_echarts_instance_";
function _C(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    var n = bC(r);
    if (n)
      return n;
  }
  var a = new hm(r, t, e);
  return a.id = "ec_" + mC++, ta[a.id] = a, i && gg(r, df, a.id), um(a), _e.trigger("afterinit", a), a;
}
function bC(r) {
  return ta[j1(r, df)];
}
function cm(r, t) {
  fm[r] = t;
}
function vm(r) {
  ut(ju, r) < 0 && ju.push(r);
}
function dm(r, t) {
  gf(Qu, r, t, sC);
}
function wC(r) {
  pf("afterinit", r);
}
function SC(r) {
  pf("afterupdate", r);
}
function pf(r, t) {
  _e.on(r, t);
}
function un(r, t, e) {
  q(t) && (e = t, t = "");
  var i = G(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !Jn[t] && (Ze(vd.test(i) && vd.test(t)), rs[i] || (rs[i] = {
    action: e,
    actionInfo: r
  }), Jn[t] = i);
}
function xC(r, t) {
  of.register(r, t);
}
function TC(r, t) {
  gf(is, r, t, em, "layout");
}
function di(r, t) {
  gf(is, r, t, rm, "visual");
}
var wd = [];
function gf(r, t, e, i, n) {
  if ((q(t) || G(t)) && (e = t, t = i), !(ut(wd, e) >= 0)) {
    wd.push(e);
    var a = Hy.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function pm(r, t) {
  Ju[r] = t;
}
function CC(r, t, e) {
  var i = rC("registerMap");
  i && i(r, t, e);
}
var DC = Lx;
di(cf, sT);
di(Bs, lT);
di(Bs, uT);
di(cf, ST);
di(Bs, xT);
di(im, tC);
vm(by);
dm(aC, cx);
pm("default", hT);
un({
  type: ni,
  event: ni,
  update: ni
}, Vt);
un({
  type: So,
  event: So,
  update: So
}, Vt);
un({
  type: Yn,
  event: Yn,
  update: Yn
}, Vt);
un({
  type: xo,
  event: xo,
  update: xo
}, Vt);
un({
  type: Xn,
  event: Xn,
  update: Xn
}, Vt);
cm("light", bT);
cm("dark", Uy);
function Dn(r) {
  return r == null ? 0 : r.length || 1;
}
function Sd(r) {
  return r;
}
var AC = (
  /** @class */
  function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || Sd, this._newKeyGetter = n || Sd, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = Dn(l);
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
        var l = a[s], u = i[l], h = n[l], f = Dn(u), v = Dn(h);
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
        var n = t[i], a = e[n], o = Dn(a);
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
          var l = e[s], u = Dn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  }()
), MC = (
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
function PC(r, t) {
  var e = {}, i = e.encode = {}, n = K(), a = [], o = [], s = {};
  D(r.dimensions, function(v) {
    var c = r.getDimensionInfo(v), d = c.coordDim;
    if (d) {
      var g = c.coordDimIndex;
      Yl(i, d)[g] = v, c.isExtraCoord || (n.set(d, 1), LC(c.type) && (a[0] = v), Yl(s, d)[g] = r.getDimensionIndex(c.name)), c.defaultTooltip && o.push(v);
    }
    vy.each(function(p, y) {
      var m = Yl(i, y), _ = c.otherDims[y];
      _ != null && _ !== !1 && (m[_] = c.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, c) {
    var d = i[c];
    u[c] = d[0], l = l.concat(d);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = W(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var h = i.label;
  h && h.length && (a = h.slice());
  var f = i.tooltip;
  return f && f.length ? o = f.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new MC(s, t), e;
}
function Yl(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function IC(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function LC(r) {
  return !(r === "ordinal" || r === "time");
}
var Ao = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.otherDims = {}, t != null && O(this, t);
    }
    return r;
  }()
), EC = Tt(), RC = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, gm = (
  /** @class */
  function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = _m(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return Q(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = xy(this.source), i = !bm(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
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
        }), e && l != null && (!f || !f.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += RC[u] || "f", h && (n += h.uid), n += "$";
      }
      var c = this.source, d = [c.seriesLayoutBy, c.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: d
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
function ym(r) {
  return r instanceof gm;
}
function mm(r) {
  for (var t = K(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = G(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function _m(r) {
  var t = EC(r);
  return t.dimNameMap || (t.dimNameMap = mm(r.dimensionsDefine));
}
function bm(r) {
  return r > 30;
}
var An = G, sr = W, kC = typeof Int32Array > "u" ? Array : Int32Array, OC = "e\0\0", xd = -1, BC = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], NC = ["_approximateExtent"], Td, io, Mn, Pn, Xl, In, ql, FC = (
  /** @class */
  function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      ym(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < i.length; h++) {
        var f = i[h], v = z(f) ? new Ao({
          name: f
        }) : f instanceof Ao ? f : new Ao(f), c = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = c, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(c), a[c] = v, u[c] != null && (l = !0), v.createInvertedIndices && (s[c] = []), d.itemName === 0 && (this._nameDimIdx = h), d.itemId === 0 && (this._idDimIdx = h), n && (v.storeDimIndex = h);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = K();
        D(o, function(p) {
          g.set(a[p].storeDimIndex, p);
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
      if (ft(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof Hu && (a = t), !a) {
        var o = this.dimensions, s = sf(t) || Wt(t) ? new Ty(t, o.length) : t;
        a = new Hu();
        var l = sr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = PC(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && ql(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== mr && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === ve;
        if (l && !n.pure)
          for (var u = [], h = t; h < e; h++) {
            var f = n.getItem(h, u);
            if (!this.hasItemOption && H1(f) && (this.hasItemOption = !0), f) {
              var v = f.name;
              a[h] == null && v != null && (a[h] = Ee(v, null));
              var c = f.id;
              o[h] == null && c != null && (o[h] = Ee(c, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < e; h++)
            ql(this, h);
        Td(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      An(t) ? O(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = Mn(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return io(this, this.getRawIndex(t));
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
      return $(t) ? n.getValues(sr(t, function(a) {
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
      return n == null || isNaN(n) ? xd : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = sr(Pn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? vt(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = sr(Pn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? vt(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = dt(t);
      return D(n, function(a) {
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
      var a = i || n || this, o = sr(Pn(t), this._getStoreDimIndex, this), s = In(this);
      return s._store = this._store.map(o, a ? vt(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = i || n || this, o = sr(Pn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? vt(e, a) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = In(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = In(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = In(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new yt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new AC(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return io(t, i);
      }, function(i) {
        return io(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, An(t) ? O(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), $(a) ? a = a.slice() : An(a) && (a = O({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, An(e) ? O(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      An(t) ? O(this._layout, t) : this._layout[t] = e;
    }, r.prototype.getLayout = function(t) {
      return this._layout[t];
    }, r.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, r.prototype.setItemLayout = function(t, e, i) {
      this._itemLayouts[t] = i ? O(this._itemLayouts[t] || {}, e) : e;
    }, r.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, r.prototype.setItemGraphicEl = function(t, e) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      Jb(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      D(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : sr(this.dimensions, this._getDimInfo, this), this.hostModel)), Xl(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(Ch(arguments)));
      });
    }, r.internalField = function() {
      Td = function(t) {
        var e = t._invertedIndicesMap;
        D(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new kC(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = xd;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, Mn = function(t, e, i) {
        return Ee(t._getCategory(e, i), null);
      }, io = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = Mn(t, t._idDimIdx, e)), i == null && (i = OC + e), i;
      }, Pn = function(t) {
        return $(t) || (t = t != null ? [t] : []), t;
      }, In = function(t) {
        var e = new r(t._schema ? t._schema : sr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Xl(e, t), e;
      }, Xl = function(t, e) {
        D(BC.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, D(NC, function(i) {
          t[i] = tt(e[i]);
        }), t._calculationInfo = O({}, e._calculationInfo);
      }, ql = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = Mn(t, a, e)), l == null && o != null && (n[e] = l = Mn(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), n[e] = l;
        }
      };
    }(), r;
  }()
);
function $C(r, t) {
  sf(r) || (r = wy(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = K(), a = [], o = HC(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && bm(o), l = i === r.dimensionsDefine, u = l ? _m(r) : mm(i), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(r, o));
  for (var f = K(h), v = new Py(o), c = 0; c < v.length; c++)
    v[c] = -1;
  function d(A) {
    var M = v[A];
    if (M < 0) {
      var T = i[A], P = G(T) ? T : {
        name: T
      }, I = new Ao(), L = P.name;
      L != null && u.get(L) != null && (I.name = I.displayName = L), P.type != null && (I.type = P.type), P.displayName != null && (I.displayName = P.displayName);
      var E = a.length;
      return v[A] = E, I.storeDimIndex = A, a.push(I), I;
    }
    return a[M];
  }
  if (!s)
    for (var c = 0; c < o; c++)
      d(c);
  f.each(function(A, M) {
    var T = Bt(A).slice();
    if (T.length === 1 && !z(T[0]) && T[0] < 0) {
      f.set(M, !1);
      return;
    }
    var P = f.set(M, []);
    D(T, function(I, L) {
      var E = z(I) ? u.get(I) : I;
      E != null && E < o && (P[L] = E, p(d(E), M, L));
    });
  });
  var g = 0;
  D(e, function(A) {
    var M, T, P, I;
    if (z(A))
      M = A, I = {};
    else {
      I = A, M = I.name;
      var L = I.ordinalMeta;
      I.ordinalMeta = null, I = O({}, I), I.ordinalMeta = L, T = I.dimsDef, P = I.otherDims, I.name = I.coordDim = I.coordDimIndex = I.dimsDef = I.otherDims = null;
    }
    var E = f.get(M);
    if (E !== !1) {
      if (E = Bt(E), !E.length)
        for (var R = 0; R < (T && T.length || 1); R++) {
          for (; g < o && d(g).coordDim != null; )
            g++;
          g < o && E.push(g++);
        }
      D(E, function(H, k) {
        var N = d(H);
        if (l && I.type != null && (N.type = I.type), p(at(N, I), M, k), N.name == null && T) {
          var V = T[k];
          !G(V) && (V = {
            name: V
          }), N.name = N.displayName = V.name, N.defaultTooltip = V.defaultTooltip;
        }
        P && at(N.otherDims, P);
      });
    }
  });
  function p(A, M, T) {
    vy.get(M) != null ? A.otherDims[M] = T : (A.coordDim = M, A.coordDimIndex = T, n.set(M, !0));
  }
  var y = t.generateCoord, m = t.generateCoordCount, _ = m != null;
  m = y ? m || 1 : 0;
  var b = y || "value";
  function S(A) {
    A.name == null && (A.name = A.coordDim);
  }
  if (s)
    D(a, function(A) {
      S(A);
    }), a.sort(function(A, M) {
      return A.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var w = 0; w < o; w++) {
      var x = d(w), C = x.coordDim;
      C == null && (x.coordDim = GC(b, n, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (yy(r, w) === Zt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return zC(a), new gm({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function zC(r) {
  for (var t = K(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function HC(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return D(t, function(a) {
    var o;
    G(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function GC(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var VC = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = K(), this.categoryAxisMap = K(), this.coordSysName = t;
    }
    return r;
  }()
);
function WC(r) {
  var t = r.get("coordinateSystem"), e = new VC(t), i = UC[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var UC = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", be).models[0], a = r.getReferringComponents("yAxis", be).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), Ii(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), Ii(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", be).models[0];
    t.coordSysDims = ["single"], e.set("single", n), Ii(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", be).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), Ii(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), Ii(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    D(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), h = o[l];
      e.set(h, u), Ii(u) && (i.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function Ii(r) {
  return r.get("type") === "category";
}
function YC(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  XC(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, h, f, v;
  if (D(a, function(m, _) {
    z(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (h = m));
  }), h && !i && !u && (i = !0), h) {
    f = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var c = h.coordDim, d = h.type, g = 0;
    D(a, function(m) {
      m.coordDim === c && g++;
    });
    var p = {
      name: f,
      coordDim: c,
      coordDimIndex: g,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, y = {
      name: v,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: v,
      coordDimIndex: g + 1,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(v, d), y.storeDimIndex = s.ensureCalculationDimension(f, d)), o.appendCalculationDimension(p), o.appendCalculationDimension(y)) : (a.push(p), a.push(y));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: f
  };
}
function XC(r) {
  return !ym(r.schema);
}
function Ji(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function qC(r, t) {
  return Ji(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function ZC(r, t) {
  var e = r.get("coordinateSystem"), i = of.get(e), n;
  return t && t.coordSysDims && (n = W(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = IC(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function KC(r, t, e) {
  var i, n;
  return e && D(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function yf(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === ve;
  var o = WC(t), s = ZC(t, o), l = e.useEncodeDefaulter, u = q(l) ? l : l ? St(HS, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, f = $C(n, h), v = KC(f.dimensions, e.createInvertedIndices, o), c = a ? null : i.getSharedDataStore(f), d = YC(t, {
    schema: f,
    store: c
  }), g = new FC(f, t);
  g.setCalculationInfo(d);
  var p = v != null && QC(n) ? function(y, m, _, b) {
    return b === v ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : c,
    null,
    p
  ), g;
}
function QC(r) {
  if (r.sourceFormat === ve) {
    var t = jC(r.data || []);
    return !$(xa(t));
  }
}
function jC(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var ze = (
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
cs(ze);
var JC = 0, th = (
  /** @class */
  function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++JC;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && W(i, tD);
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
      if (!z(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = K(this.categories));
    }, r;
  }()
);
function tD(r) {
  return G(r) && r.value != null ? r.value : r + "";
}
function eh(r) {
  return r.type === "interval" || r.type === "log";
}
function eD(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = fg(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = wm(o), l = n.niceTickExtent = [wt(Math.ceil(r[0] / o) * o, s), wt(Math.floor(r[1] / o) * o, s)];
  return rD(l, r), n;
}
function Zl(r) {
  var t = Math.pow(10, kh(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, wt(e * t);
}
function wm(r) {
  return We(r) + 2;
}
function Cd(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function rD(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), Cd(r, 0, t), Cd(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function Ns(r, t) {
  return r >= t[0] && r <= t[1];
}
function Fs(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function $s(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var mf = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new th({})), $(n) && (n = new th({
        categories: W(n, function(a) {
          return G(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : z(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), Ns(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), Fs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round($s(e, this._extent)), this.getRawOrdinalNumber(e);
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
  }(ze)
);
ze.registerClass(mf);
var Zr = wt, hn = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "interval", e._interval = 0, e._intervalPrecision = 2, e;
    }
    return t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return Ns(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return Fs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return $s(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = wm(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: Zr(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = Zr(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var h = s.length ? s[s.length - 1].value : a[1];
      return n[1] > h && (e ? s.push({
        value: Zr(h + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, h = [], f = s.value - l.value, v = f / e; u < e - 1; ) {
          var c = Zr(l.value + (u + 1) * v);
          c > a[0] && c < a[1] && h.push(c), u++;
        }
        n.push(h);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = We(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = Zr(e.value, n, !0);
      return uy(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = eD(a, e, i, n);
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
      e.fixMin || (i[0] = Zr(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = Zr(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  }(ze)
);
ze.registerClass(hn);
var Sm = typeof Float32Array < "u", iD = Sm ? Float32Array : Array;
function Ue(r) {
  return $(r) ? Sm ? new Float32Array(r) : r : new iD(r);
}
var nD = "__ec_stack_";
function xm(r) {
  return r.get("stack") || nD + r.seriesIndex;
}
function _f(r) {
  return r.dim + r.index;
}
function Tm(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    Dm(i) && e.push(i);
  }), e;
}
function aD(r) {
  var t = {};
  D(r, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var f = l.getData(), v = h.dim + "_" + h.index, c = f.getDimensionIndex(f.mapDimension(h.dim)), d = f.getStore(), g = 0, p = d.count(); g < p; ++g) {
        var y = d.get(c, g);
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
function Cm(r) {
  var t = aD(r), e = [];
  return D(r, function(i) {
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
    var d = Ot(i.get("barWidth"), s), g = Ot(i.get("barMaxWidth"), s), p = Ot(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (Am(i) ? 0.5 : 1),
      s
    ), y = i.get("barGap"), m = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: g,
      barMinWidth: p,
      barGap: y,
      barCategoryGap: m,
      axisKey: _f(a),
      stackId: xm(i)
    });
  }), oD(e);
}
function oD(r) {
  var t = {};
  D(r, function(i, n) {
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
    var d = i.barCategoryGap;
    d != null && (s.categoryGap = d);
  });
  var e = {};
  return D(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = dt(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Ot(s, o), h = Ot(i.gap, 1), f = i.remainedWidth, v = i.autoWidthCount, c = (f - u) / (v + (v - 1) * h);
    c = Math.max(c, 0), D(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var b = y.width;
        m && (b = Math.min(b, m)), _ && (b = Math.max(b, _)), y.width = b, f -= b + h * b, v--;
      } else {
        var b = c;
        m && m < b && (b = Math.min(m, f)), _ && _ > b && (b = _), b !== c && (y.width = b, f -= b + h * b, v--);
      }
    }), c = (f - u) / (v + (v - 1) * h), c = Math.max(c, 0);
    var d = 0, g;
    D(a, function(y, m) {
      y.width || (y.width = c), g = y, d += y.width * (1 + h);
    }), g && (d -= g.width * h);
    var p = -d / 2;
    D(a, function(y, m) {
      e[n][m] = e[n][m] || {
        bandWidth: o,
        offset: p,
        width: y.width
      }, p += y.width * (1 + h);
    });
  }), e;
}
function sD(r, t, e) {
  if (r && t) {
    var i = r[_f(t)];
    return i;
  }
}
function lD(r, t) {
  var e = Tm(r, t), i = Cm(e);
  D(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = xm(n), u = i[_f(s)][l], h = u.offset, f = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: f
    });
  });
}
function uD(r) {
  return {
    seriesType: r,
    plan: hf(),
    reset: function(t) {
      if (Dm(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), h = e.getCalculationInfo("stackResultDimension"), f = Ji(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), c = hD(n, a), d = Am(t), g = t.get("barMinHeight") || 0, p = h && e.getDimensionIndex(h), y = e.getLayout("size"), m = e.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var S = _.count, w = d && Ue(S * 3), x = d && l && Ue(S * 3), C = d && Ue(S), A = i.master.getRect(), M = v ? A.width : A.height, T, P = b.getStore(), I = 0; (T = _.next()) != null; ) {
              var L = P.get(f ? p : o, T), E = P.get(s, T), R = c, H = void 0;
              f && (H = +L - P.get(o, T));
              var k = void 0, N = void 0, V = void 0, Z = void 0;
              if (v) {
                var j = i.dataToPoint([L, E]);
                if (f) {
                  var st = i.dataToPoint([H, E]);
                  R = st[0];
                }
                k = R, N = j[1] + m, V = j[0] - R, Z = y, Math.abs(V) < g && (V = (V < 0 ? -1 : 1) * g);
              } else {
                var j = i.dataToPoint([E, L]);
                if (f) {
                  var st = i.dataToPoint([E, H]);
                  R = st[1];
                }
                k = j[0] + m, N = R, V = y, Z = j[1] - R, Math.abs(Z) < g && (Z = (Z <= 0 ? -1 : 1) * g);
              }
              d ? (w[I] = k, w[I + 1] = N, w[I + 2] = v ? V : Z, x && (x[I] = v ? A.x : k, x[I + 1] = v ? N : A.y, x[I + 2] = M), C[T] = T) : b.setItemLayout(T, {
                x: k,
                y: N,
                width: V,
                height: Z
              }), I += 3;
            }
            d && b.setLayout({
              largePoints: w,
              largeDataIndices: C,
              largeBackgroundPoints: x,
              valueAxisHorizontal: v
            });
          }
        };
      }
    }
  };
}
function Dm(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function Am(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function hD(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var fD = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, Mm = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return As(e.value, yv[LS(Ui(this._minLevelUnit))] || yv.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return ES(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = mD(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= he, i[1] += he), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - he;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = no.length, l = Math.min(fD(no, this._approxInterval, 0, s), s - 1);
      this._interval = no[l][1], this._minLevelUnit = no[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return ft(e) ? e : +Ke(e);
    }, t.prototype.contain = function(e) {
      return Ns(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return Fs(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return $s(e, this._extent);
    }, t.type = "time", t;
  }(hn)
), no = [
  // Format                           interval
  ["second", Jh],
  ["minute", tf],
  ["hour", Kn],
  ["quarter-day", Kn * 6],
  ["half-day", Kn * 12],
  ["day", he * 1.2],
  ["half-week", he * 3.5],
  ["week", he * 7],
  ["month", he * 31],
  ["quarter", he * 95],
  ["half-year", gv / 2],
  ["year", gv]
  // 1Y
];
function cD(r, t, e, i) {
  var n = Ke(t), a = Ke(e), o = function(d) {
    return mv(n, d, i) === mv(a, d, i);
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
function vD(r, t) {
  return r /= he, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function dD(r) {
  var t = 30 * he;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function pD(r) {
  return r /= Kn, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function Dd(r, t) {
  return r /= t ? tf : Jh, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function gD(r) {
  return fg(r);
}
function yD(r, t, e) {
  var i = new Date(r);
  switch (Ui(t)) {
    case "year":
    case "month":
      i[iy(e)](0);
    case "day":
      i[ny(e)](1);
    case "hour":
      i[ay(e)](0);
    case "minute":
      i[oy(e)](0);
    case "second":
      i[sy(e)](0), i[ly(e)](0);
  }
  return i.getTime();
}
function mD(r, t, e, i) {
  var n = 1e4, a = ey, o = 0;
  function s(M, T, P, I, L, E, R) {
    for (var H = new Date(T), k = T, N = H[I](); k < P && k <= i[1]; )
      R.push({
        value: k
      }), N += M, H[L](N), k = H.getTime();
    R.push({
      value: k,
      notAdd: !0
    });
  }
  function l(M, T, P) {
    var I = [], L = !T.length;
    if (!cD(Ui(M), i[0], i[1], e)) {
      L && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: yD(new Date(i[0]), M, e)
      }, {
        value: i[1]
      }]);
      for (var E = 0; E < T.length - 1; E++) {
        var R = T[E].value, H = T[E + 1].value;
        if (R !== H) {
          var k = void 0, N = void 0, V = void 0, Z = !1;
          switch (M) {
            case "year":
              k = Math.max(1, Math.round(t / he / 365)), N = ef(e), V = RS(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              k = dD(t), N = Yi(e), V = iy(e);
              break;
            case "week":
            case "half-week":
            case "day":
              k = vD(t), N = Ms(e), V = ny(e), Z = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              k = pD(t), N = fa(e), V = ay(e);
              break;
            case "minute":
              k = Dd(t, !0), N = Ps(e), V = oy(e);
              break;
            case "second":
              k = Dd(t, !1), N = Is(e), V = sy(e);
              break;
            case "millisecond":
              k = gD(t), N = Ls(e), V = ly(e);
              break;
          }
          s(k, R, H, N, V, Z, I), M === "year" && P.length > 1 && E === 0 && P.unshift({
            value: P[0].value - k
          });
        }
      }
      for (var E = 0; E < I.length; E++)
        P.push(I[E]);
      return I;
    }
  }
  for (var u = [], h = [], f = 0, v = 0, c = 0; c < a.length && o++ < n; ++c) {
    var d = Ui(a[c]);
    if (IS(a[c])) {
      l(a[c], u[u.length - 1] || [], h);
      var g = a[c + 1] ? Ui(a[c + 1]) : null;
      if (d !== g) {
        if (h.length) {
          v = f, h.sort(function(M, T) {
            return M.value - T.value;
          });
          for (var p = [], y = 0; y < h.length; ++y) {
            var m = h[y].value;
            (y === 0 || h[y - 1].value !== m) && (p.push(h[y]), m >= i[0] && m <= i[1] && f++);
          }
          var _ = (i[1] - i[0]) / t;
          if (f > _ * 1.5 && v > _ / 1.5 || (u.push(p), f > _ || r === a[c]))
            break;
        }
        h = [];
      }
    }
  }
  for (var b = Dt(W(u, function(M) {
    return Dt(M, function(T) {
      return T.value >= i[0] && T.value <= i[1] && !T.notAdd;
    });
  }), function(M) {
    return M.length > 0;
  }), S = [], w = b.length - 1, c = 0; c < b.length; ++c)
    for (var x = b[c], C = 0; C < x.length; ++C)
      S.push({
        value: x[C].value,
        level: w - c
      });
  S.sort(function(M, T) {
    return M.value - T.value;
  });
  for (var A = [], c = 0; c < S.length; ++c)
    (c === 0 || S[c].value !== S[c - 1].value) && A.push(S[c]);
  return A;
}
ze.registerClass(Mm);
var Ad = ze.prototype, ea = hn.prototype, _D = wt, bD = Math.floor, wD = Math.ceil, ao = Math.pow, ge = Math.log, bf = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new hn(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = ea.getTicks.call(this, e);
      return W(o, function(s) {
        var l = s.value, u = wt(ao(this.base, l));
        return u = l === n[0] && this._fixMin ? oo(u, a[0]) : u, u = l === n[1] && this._fixMax ? oo(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = ge(this.base);
      e = ge(Math.max(0, e)) / n, i = ge(Math.max(0, i)) / n, ea.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = Ad.getExtent.call(this);
      i[0] = ao(e, i[0]), i[1] = ao(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = oo(i[0], a[0])), this._fixMax && (i[1] = oo(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = ge(e[0]) / ge(i), e[1] = ge(e[1]) / ge(i), Ad.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = F1(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [wt(wD(i[0] / a) * a), wt(bD(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      ea.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = ge(e) / ge(this.base), Ns(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = ge(e) / ge(this.base), Fs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = $s(e, this._extent), ao(this.base, e);
    }, t.type = "log", t;
  }(ze)
), Pm = bf.prototype;
Pm.getMinorTicks = ea.getMinorTicks;
Pm.getLabel = ea.getLabel;
function oo(r, t) {
  return _D(r, We(t));
}
ze.registerClass(bf);
var SD = (
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
      q(o) ? this._modelMinNum = so(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = so(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (q(s) ? this._modelMaxNum = so(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = so(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = $(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [br(u[0], 1), br(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var f = Lo(s) || Lo(l) || t && !n;
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
      this[TD[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = xD[t];
      this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  }()
), xD = {
  min: "_determinedMin",
  max: "_determinedMax"
}, TD = {
  min: "_dataMin",
  max: "_dataMax"
};
function CD(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new SD(r, t, e), r.rawExtentInfo = i, i);
}
function so(r, t) {
  return t == null ? null : Lo(t) ? NaN : r.parse(t);
}
function Im(r, t) {
  var e = r.type, i = CD(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = Tm("bar", o), l = !1;
    if (D(s, function(f) {
      l = l || f.getBaseAxis() === t.axis;
    }), l) {
      var u = Cm(s), h = DD(n, a, t, u);
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
function DD(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = sD(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  D(o, function(c) {
    s = Math.min(c.offset, s);
  });
  var l = -1 / 0;
  D(o, function(c) {
    l = Math.max(c.offset + c.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - r, f = 1 - (s + l) / a, v = h / f - h;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function Md(r, t) {
  var e = t, i = Im(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof bf && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function AD(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      case "category":
        return new mf({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new Mm({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (ze.getClass(t) || hn)();
    }
}
function MD(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function fn(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  }(t) : z(t) ? /* @__PURE__ */ function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  }(t) : q(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(wf(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function wf(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function PD(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof mf ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = fn(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var h = 0; h < n; h += u) {
      var f = i ? i[h] : {
        value: a[0] + h
      }, v = s(f, h), c = o.getTextRect(v), d = ID(c, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function ID(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new nt(r.x, r.y, a, o);
  return s;
}
function Sf(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function Lm(r) {
  return r.type === "category" && Sf(r.getLabelModel()) === 0;
}
function LD(r, t) {
  var e = {};
  return D(r.mapDimensionsAll(t), function(i) {
    e[qC(r, i)] = !0;
  }), dt(e);
}
var ED = (
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
), Pd = [], RD = {
  registerPreprocessor: vm,
  registerProcessor: dm,
  registerPostInit: wC,
  registerPostUpdate: SC,
  registerUpdateLifecycle: pf,
  registerAction: un,
  registerCoordinateSystem: xC,
  registerLayout: TC,
  registerVisual: di,
  registerTransform: DC,
  registerLoading: pm,
  registerMap: CC,
  registerImpl: eC,
  PRIORITY: dC,
  ComponentModel: lt,
  ComponentView: Oe,
  SeriesModel: ke,
  ChartView: Se,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    lt.registerClass(r);
  },
  registerComponentView: function(r) {
    Oe.registerClass(r);
  },
  registerSeriesModel: function(r) {
    ke.registerClass(r);
  },
  registerChartView: function(r) {
    Se.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    lt.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    E1(r, t);
  }
};
function Sr(r) {
  if ($(r)) {
    D(r, function(t) {
      Sr(t);
    });
    return;
  }
  ut(Pd, r) >= 0 || (Pd.push(r), q(r) && (r = {
    install: r
  }), r.install(RD));
}
var ya = Tt();
function Em(r, t) {
  var e = W(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function kD(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = fn(r), i = r.scale.getExtent(), n = Em(r, t), a = Dt(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: W(a, function(o) {
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
  return r.type === "category" ? BD(r) : FD(r);
}
function OD(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = Em(r, e);
    return {
      ticks: Dt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? ND(r, t) : {
    ticks: W(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function BD(r) {
  var t = r.getLabelModel(), e = Rm(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function Rm(r, t) {
  var e = km(r, "labels"), i = Sf(t), n = Om(e, i);
  if (n)
    return n;
  var a, o;
  return q(i) ? a = Fm(r, i) : (o = i === "auto" ? $D(r) : i, a = Nm(r, o)), Bm(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function ND(r, t) {
  var e = km(r, "ticks"), i = Sf(t), n = Om(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), q(i))
    a = Fm(r, i, !0);
  else if (i === "auto") {
    var s = Rm(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = W(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = Nm(r, o, !0);
  return Bm(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function FD(r) {
  var t = r.scale.getTicks(), e = fn(r);
  return {
    labels: W(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: e(i, n),
        rawLabel: r.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function km(r, t) {
  return ya(r)[t] || (ya(r)[t] = []);
}
function Om(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function Bm(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function $D(r) {
  var t = ya(r).autoInterval;
  return t ?? (ya(r).autoInterval = r.calculateCategoryInterval());
}
function zD(r) {
  var t = HD(r), e = fn(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), h = Math.abs(u * Math.cos(i)), f = Math.abs(u * Math.sin(i)), v = 0, c = 0; l <= a[1]; l += s) {
    var d = 0, g = 0, p = Eh(e({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, g = p.height * 1.3, v = Math.max(v, d, 7), c = Math.max(c, g, 7);
  }
  var y = v / h, m = c / f;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = ya(r.model), S = r.getExtent(), w = b.lastAutoInterval, x = b.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && b.axisExtent0 === S[0] && b.axisExtent1 === S[1] ? _ = w : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = S[0], b.axisExtent1 = S[1]), _;
}
function HD(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function Nm(r, t, e) {
  var i = fn(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = n.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var f = Lm(r), v = o.get("showMinLabel") || f, c = o.get("showMaxLabel") || f;
  v && u !== a[0] && g(a[0]);
  for (var d = u; d <= a[1]; d += l)
    g(d);
  c && d - l !== a[1] && g(a[1]);
  function g(p) {
    var y = {
      value: p
    };
    s.push(e ? p : {
      formattedLabel: i(y),
      rawLabel: n.getLabel(y),
      tickValue: p
    });
  }
  return s;
}
function Fm(r, t, e) {
  var i = r.scale, n = fn(r), a = [];
  return D(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Id = [0, 1], GD = (
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
      return O1(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), Ld(i, n.count())), Tc(t, Id, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), Ld(i, n.count()));
      var a = Tc(t, i, Id, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = OD(this, e), n = i.ticks, a = W(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return VD(this, a, o, t.clamp), a;
    }, r.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), e = t.get("splitNumber");
      e > 0 && e < 100 || (e = 5);
      var i = this.scale.getMinorTicks(e), n = W(i, function(a) {
        return W(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, r.prototype.getViewLabels = function() {
      return kD(this).labels;
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
      return zD(this);
    }, r;
  }()
);
function Ld(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function VD(r, t, e, i) {
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
    D(t, function(c) {
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
  function v(c, d) {
    return c = wt(c), d = wt(d), f ? c > d : c < d;
  }
}
function WD(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new Yo(o, a) : null;
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
function UD(r) {
  var t = [];
  r.sort(function(g, p) {
    return p.priority - g.priority;
  });
  var e = new nt(0, 0, 0, 0);
  function i(g) {
    if (!g.ignore) {
      var p = g.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    g.ignore = !0;
  }
  for (var n = 0; n < r.length; n++) {
    var a = r[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, h = a.labelLine;
    e.copy(a.rect), e.width -= 0.1, e.height -= 0.1, e.x += 0.05, e.y += 0.05;
    for (var f = a.obb, v = !1, c = 0; c < t.length; c++) {
      var d = t[c];
      if (e.intersect(d.rect)) {
        if (o && d.axisAligned) {
          v = !0;
          break;
        }
        if (d.obb || (d.obb = new Yo(d.localRect, d.transform)), f || (f = new Yo(s, l)), f.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), h && i(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var YD = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      return yf(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new Mt(), n = ji("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = ji(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
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
  }(ke)
);
function xf(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = Qi(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(Qi(r, t, e[o]));
    return a.join(" ");
  }
}
function $m(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!$(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Tf = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = ji(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = XD, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Vo(this.childAt(0));
    }, t.prototype.downplay = function() {
      Wo(this.childAt(0));
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
        h ? v.attr(c) : te(v, c, s, i), Wg(v);
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
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, Qe(v, c, s, i);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, h, f, v, c, d, g, p, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, f = a.selectItemStyle, v = a.focus, c = a.blurScope, g = a.labelStatesModels, p = a.hoverScale, y = a.cursorStyle, d = a.emphasisDisabled), !a || e.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), f = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), c = _.get("blurScope"), d = _.get("disabled"), g = Ts(m), p = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var S = Yy(e.getItemVisual(i, "symbolOffset"), n);
      S && (s.x = S[0], s.y = S[1]), y && s.attr("cursor", y);
      var w = e.getItemVisual(i, "style"), x = w.fill;
      if (s instanceof Tr) {
        var C = s.style;
        s.useStyle(O({
          // TODO other properties like x, y ?
          image: C.image,
          x: C.x,
          y: C.y,
          width: C.width,
          height: C.height
        }, w));
      } else
        s.__isEmptyBrush ? s.useStyle(O({}, w)) : s.useStyle(w), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var A = e.getItemVisual(i, "liftZ"), M = this._z2;
      A != null ? M == null && (this._z2 = s.z2, s.z2 += A) : M != null && (s.z2 = M, this._z2 = null);
      var T = o && o.useNameLabel;
      xs(s, g, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: P,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function P(E) {
        return T ? e.getName(E) : xf(e, E);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var I = s.ensureState("emphasis");
      I.style = u, s.ensureState("select").style = f, s.ensureState("blur").style = h;
      var L = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      I.scaleX = this._sizeX * L, I.scaleY = this._sizeY * L, this.setSymbolScale(1), Uo(this, v, c, d);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = rt(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Xo(l, {
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
      Xo(a, {
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
      return FT(e.getItemVisual(i, "symbolSize"));
    }, t;
  }(Mt)
);
function XD(r, t) {
  this.parent.drift(r, t);
}
function Kl(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function Ed(r) {
  return r != null && !G(r) && (r = {
    isIgnore: r
  }), r || {};
}
function Rd(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: Ts(t),
    cursorStyle: t.get("cursor")
  };
}
var qD = (
  /** @class */
  function() {
    function r(t) {
      this.group = new Mt(), this._SymbolCtor = t || Tf;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = Ed(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = Rd(t), u = {
        disableAnimation: s
      }, h = e.getSymbolPoint || function(f) {
        return t.getItemLayout(f);
      };
      a || i.removeAll(), t.diff(a).add(function(f) {
        var v = h(f);
        if (Kl(t, v, f, e)) {
          var c = new o(t, f, l, u);
          c.setPosition(v), t.setItemGraphicEl(f, c), i.add(c);
        }
      }).update(function(f, v) {
        var c = a.getItemGraphicEl(v), d = h(f);
        if (!Kl(t, d, f, e)) {
          i.remove(c);
          return;
        }
        var g = t.getItemVisual(f, "symbol") || "circle", p = c && c.getSymbolType && c.getSymbolType();
        if (!c || p && p !== g)
          i.remove(c), c = new o(t, f, l, u), c.setPosition(d);
        else {
          c.updateData(t, f, l, u);
          var y = {
            x: d[0],
            y: d[1]
          };
          s ? c.attr(y) : te(c, y, n);
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
      this._seriesScope = Rd(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = Ed(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (Kl(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      ws(this._progressiveEls || this.group, t);
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
function zm(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = ZD(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, f = W(r.dimensions, function(d) {
    return t.mapDimension(d);
  }), v = !1, c = t.getCalculationInfo("stackResultDimension");
  return Ji(
    t,
    f[0]
    /* , dims[1] */
  ) && (v = !0, f[0] = c), Ji(
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
function ZD(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : ft(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function Hm(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function KD(r, t) {
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
function QD(r, t, e, i, n, a, o, s) {
  for (var l = KD(r, t), u = [], h = [], f = [], v = [], c = [], d = [], g = [], p = zm(n, t, o), y = r.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], S = !0, w = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        w = b.idx * 2, x = b.idx1 * 2;
        var C = y[w], A = y[w + 1], M = m[x], T = m[x + 1];
        (isNaN(C) || isNaN(A)) && (C = M, A = T), u.push(C, A), h.push(M, T), f.push(e[w], e[w + 1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var P = b.idx, I = p.dataDimsForPoint, L = n.dataToPoint([t.get(I[0], P), t.get(I[1], P)]);
        x = P * 2, u.push(L[0], L[1]), h.push(m[x], m[x + 1]);
        var E = Hm(p, n, t, P);
        f.push(E[0], E[1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(P));
        break;
      case "-":
        S = !1;
    }
    S && (c.push(b), d.push(d.length));
  }
  d.sort(function(pt, de) {
    return g[pt] - g[de];
  });
  for (var R = u.length, H = Ue(R), k = Ue(R), N = Ue(R), V = Ue(R), Z = [], _ = 0; _ < d.length; _++) {
    var j = d[_], st = _ * 2, ct = j * 2;
    H[st] = u[ct], H[st + 1] = u[ct + 1], k[st] = h[ct], k[st + 1] = h[ct + 1], N[st] = f[ct], N[st + 1] = f[ct + 1], V[st] = v[ct], V[st + 1] = v[ct + 1], Z[_] = c[j];
  }
  return {
    current: H,
    next: k,
    stackedOnCurrent: N,
    stackedOnNext: V,
    status: Z
  };
}
var lr = Math.min, ur = Math.max;
function ai(r, t) {
  return isNaN(r) || isNaN(t);
}
function rh(r, t, e, i, n, a, o, s, l) {
  for (var u, h, f, v, c, d, g = e, p = 0; p < i; p++) {
    var y = t[g * 2], m = t[g * 2 + 1];
    if (g >= n || g < 0)
      break;
    if (ai(y, m)) {
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
        for (var S = g + a, w = t[S * 2], x = t[S * 2 + 1]; w === y && x === m && p < i; )
          p++, S += a, g += a, w = t[S * 2], x = t[S * 2 + 1], y = t[g * 2], m = t[g * 2 + 1], _ = y - u, b = m - h;
        var C = p + 1;
        if (l)
          for (; ai(w, x) && C < i; )
            C++, S += a, w = t[S * 2], x = t[S * 2 + 1];
        var A = 0.5, M = 0, T = 0, P = void 0, I = void 0;
        if (C >= i || ai(w, x))
          c = y, d = m;
        else {
          M = w - u, T = x - h;
          var L = y - u, E = w - y, R = m - h, H = x - m, k = void 0, N = void 0;
          if (s === "x") {
            k = Math.abs(L), N = Math.abs(E);
            var V = M > 0 ? 1 : -1;
            c = y - V * k * o, d = m, P = y + V * N * o, I = m;
          } else if (s === "y") {
            k = Math.abs(R), N = Math.abs(H);
            var Z = T > 0 ? 1 : -1;
            c = y, d = m - Z * k * o, P = y, I = m + Z * N * o;
          } else
            k = Math.sqrt(L * L + R * R), N = Math.sqrt(E * E + H * H), A = N / (N + k), c = y - M * o * (1 - A), d = m - T * o * (1 - A), P = y + M * o * A, I = m + T * o * A, P = lr(P, ur(w, y)), I = lr(I, ur(x, m)), P = ur(P, lr(w, y)), I = ur(I, lr(x, m)), M = P - y, T = I - m, c = y - M * k / N, d = m - T * k / N, c = lr(c, ur(u, y)), d = lr(d, ur(h, m)), c = ur(c, lr(u, y)), d = ur(d, lr(h, m)), M = y - c, T = m - d, P = y + M * N / k, I = m + T * N / k;
        }
        r.bezierCurveTo(f, v, c, d, y, m), f = P, v = I;
      } else
        r.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return p;
}
var Gm = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  }()
), jD = (
  /** @class */
  function(r) {
    B(t, r);
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
      return new Gm();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && ai(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && ai(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += rh(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = hi.CMD, s, l, u = i === "x", h = [], f = 0; f < a.length; ) {
        var v = a[f++], c = void 0, d = void 0, g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[f++], l = a[f++];
            break;
          case o.L:
            if (c = a[f++], d = a[f++], _ = u ? (e - s) / (c - s) : (e - l) / (d - l), _ <= 1 && _ >= 0) {
              var b = u ? (d - l) * _ + l : (c - s) * _ + s;
              return u ? [e, b] : [b, e];
            }
            s = c, l = d;
            break;
          case o.C:
            c = a[f++], d = a[f++], g = a[f++], p = a[f++], y = a[f++], m = a[f++];
            var S = u ? ko(s, c, g, y, e, h) : ko(l, d, p, m, e, h);
            if (S > 0)
              for (var w = 0; w < S; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var b = u ? At(l, d, p, m, x) : At(s, c, g, y, x);
                  return u ? [e, b] : [b, e];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(ot)
), JD = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(Gm)
), tA = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new JD();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && ai(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && ai(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = rh(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        rh(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  }(ot)
);
function Vm(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = e.get(["lineStyle", "width"]) || 0;
  o -= h / 2, s -= h / 2, l += h, u += h, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var f = new xt({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var v = r.getBaseAxis(), c = v.isHorizontal(), d = v.inverse;
    c ? (d && (f.shape.x += l), f.shape.width = 0) : (d || (f.shape.y += u), f.shape.height = 0);
    var g = q(n) ? function(p) {
      n(p, f);
    } : null;
    Qe(f, {
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
function Wm(r, t, e) {
  var i = r.getArea(), n = wt(i.r0, 1), a = wt(i.r, 1), o = new sn({
    shape: {
      cx: wt(r.cx, 1),
      cy: wt(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, Qe(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function eA(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return Wm(r, t, e);
    if (r.type === "cartesian2d")
      return Vm(r, t, e, i, n);
  } else return null;
  return null;
}
function Cf(r, t) {
  return r.type === t;
}
function kd(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function Od(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function Bd(r, t) {
  var e = Od(r), i = e[0], n = e[1], a = Od(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function Nd(r) {
  return ft(r) ? r : r ? 0.5 : 0;
}
function rA(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = Ue(i * 2), a = 0; a < i; a++) {
    var o = Hm(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function hr(r, t, e, i, n) {
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
        var d = (h[o] + f[o]) / 2, g = [];
        u[o] = g[o] = d, u[1 - o] = h[1 - o], g[1 - o] = f[1 - o], s.push(u[0], u[1]), s.push(g[0], g[1]);
        break;
      default:
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function iA(r, t) {
  var e = [], i = r.length, n, a;
  function o(h, f, v) {
    var c = h.coord, d = (v - c) / (f.coord - c), g = a1(d, [h.color, f.color]);
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
function nA(r, t, e) {
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
      var l = t.getAxis(n), u = W(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), h = u.length, f = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), f.reverse());
      var v = iA(u, n === "x" ? e.getWidth() : e.getHeight()), c = v.length;
      if (!c && h)
        return u[0].coord < 0 ? f[1] ? f[1] : u[h - 1].color : f[0] ? f[0] : u[0].color;
      var d = 10, g = v[0].coord - d, p = v[c - 1].coord + d, y = p - g;
      if (y < 1e-3)
        return "transparent";
      D(v, function(_) {
        _.offset = (_.coord - g) / y;
      }), v.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: c ? v[c - 1].offset : 0.5,
        color: f[1] || "transparent"
      }), v.unshift({
        offset: c ? v[0].offset : 0.5,
        color: f[0] || "transparent"
      });
      var m = new Vg(0, 0, 0, 0, v, !0);
      return m[n] = g, m[n + "2"] = p, m;
    }
  }
}
function aA(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && oA(a, t))) {
      var o = t.mapDimension(a.dim), s = {};
      return D(a.getViewLabels(), function(l) {
        var u = a.scale.getRawOrdinalNumber(l.tickValue);
        s[u] = 1;
      }), function(l) {
        return !s.hasOwnProperty(t.get(o, l));
      };
    }
  }
}
function oA(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (Tf.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function sA(r, t) {
  return isNaN(r) || isNaN(t);
}
function lA(r) {
  for (var t = r.length / 2; t > 0 && sA(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function Fd(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function uA(r, t, e) {
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
function Um(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Re.length; t++)
    if (r.get([Re[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function Ql(r, t, e, i) {
  if (Cf(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = Um(i) ? function(c, d) {
      r._endLabelOnDuring(c, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = Vm(t, e, i, function() {
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
    return Wm(t, e, i);
}
function hA(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var fA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new Mt(), i = new qD();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = vt(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), h = s.getLayout("points") || [], f = a.type === "polar", v = this._coordSys, c = this._symbolDraw, d = this._polyline, g = this._polygon, p = this._lineGroup, y = !i.ssr && e.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = zm(a, s, _), S = m && rA(a, s, b), w = e.get("showSymbol"), x = e.get("connectNulls"), C = w && !f && aA(e, s, a), A = this._data;
      A && A.eachItemGraphicEl(function(pt, de) {
        pt.__temp && (o.remove(pt), A.setItemGraphicEl(de, null));
      }), w || c.remove(), o.add(p);
      var M = f ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var P = nA(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && M === this._step))
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [h[pt * 2], h[pt * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), M && (S && (S = hr(S, h, a, M, x)), h = hr(h, null, a, M, x)), d = this._newPolyline(h), m ? g = this._newPolygon(h, S) : g && (p.remove(g), g = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, fi(P)), p.setClipPath(Ql(this, a, !0, e));
      else {
        m && !g ? g = this._newPolygon(h, S) : g && !m && (p.remove(g), g = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, fi(P));
        var I = p.getClipPath();
        if (I) {
          var L = Ql(this, a, !1, e);
          Qe(I, {
            shape: L.shape
          }, e);
        } else
          p.setClipPath(Ql(this, a, !0, e));
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [h[pt * 2], h[pt * 2 + 1]];
          }
        }), (!kd(this._stackedOnPoints, S) || !kd(this._points, h)) && (y ? this._doUpdateAnimation(s, S, a, n, M, _, x) : (M && (S && (S = hr(S, h, a, M, x)), h = hr(h, null, a, M, x)), d.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: S
        })));
      }
      var E = e.getModel("emphasis"), R = E.get("focus"), H = E.get("blurScope"), k = E.get("disabled");
      if (d.useStyle(at(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: P,
          lineJoin: "bevel"
        }
      )), Ru(d, e, "lineStyle"), d.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var N = d.getState("emphasis").style;
        N.lineWidth = +d.style.lineWidth + 1;
      }
      rt(d).seriesIndex = e.seriesIndex, Uo(d, R, H, k);
      var V = Nd(e.get("smooth")), Z = e.get("smoothMonotone");
      if (d.setShape({
        smooth: V,
        smoothMonotone: Z,
        connectNulls: x
      }), g) {
        var j = s.getCalculationInfo("stackedOnSeries"), st = 0;
        g.useStyle(at(u.getAreaStyle(), {
          fill: P,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), j && (st = Nd(j.get("smooth"))), g.setShape({
          smooth: V,
          stackedOnSmooth: st,
          smoothMonotone: Z,
          connectNulls: x
        }), Ru(g, e, "areaStyle"), rt(g).seriesIndex = e.seriesIndex, Uo(g, R, H, k);
      }
      var ct = this._changePolyState;
      s.eachItemGraphicEl(function(pt) {
        pt && (pt.onHoverStateChange = ct);
      }), this._polyline.onHoverStateChange = ct, this._data = s, this._coordSys = a, this._stackedOnPoints = S, this._points = h, this._step = M, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, d), g && this.packEventData(e, g));
    }, t.prototype.packEventData = function(e, i) {
      rt(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(e, i, n, a) {
      var o = e.getData(), s = ui(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], f = l[s * 2 + 1];
          if (isNaN(h) || isNaN(f) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, f))
            return;
          var v = e.get("zlevel") || 0, c = e.get("z") || 0;
          u = new Tf(o, s), u.x = h, u.y = f, u.setZ(v, c);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = v, d.z = c, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        Se.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = ui(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        Se.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      Zc(this._polyline, e), i && Zc(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new jD({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new tA({
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
      e.eachItemGraphicEl(function(c, d) {
        var g = c;
        if (g) {
          var p = [c.x, c.y], y = void 0, m = void 0, _ = void 0;
          if (n)
            if (o) {
              var b = n, S = i.pointToCoord(p);
              a ? (y = b.startAngle, m = b.endAngle, _ = -S[1] / 180 * Math.PI) : (y = b.r0, m = b.r, _ = S[0]);
            } else {
              var w = n;
              a ? (y = w.x, m = w.x + w.width, _ = c.x) : (y = w.y + w.height, m = w.y, _ = c.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var C = q(f) ? f(d) : h * x + v, A = g.getSymbolPath(), M = A.getTextContent();
          g.attr({
            scaleX: 0,
            scaleY: 0
          }), g.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: C
          }), M && M.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: C
          }), A.disableLabelAnimation = !0;
        }
      });
    }, t.prototype._initOrUpdateEndLabel = function(e, i, n) {
      var a = e.getModel("endLabel");
      if (Um(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new Yt({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = lA(l);
        h >= 0 && (xs(s, Ts(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: h,
          defaultText: function(f, v, c) {
            return c != null ? $m(o, c) : xf(o, f);
          },
          enableTextSetter: !0
        }, hA(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var f = n.getLayout("points"), v = n.hostModel, c = v.get("connectNulls"), d = s.get("precision"), g = s.get("distance") || 0, p = l.getBaseAxis(), y = p.isHorizontal(), m = p.inverse, _ = i.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, S = (y ? g : 0) * (m ? -1 : 1), w = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", C = uA(f, b, x), A = C.range, M = A[1] - A[0], T = void 0;
        if (M >= 1) {
          if (M > 1 && !c) {
            var P = Fd(f, A[0]);
            u.attr({
              x: P[0] + S,
              y: P[1] + w
            }), o && (T = v.getRawValue(A[0]));
          } else {
            var P = h.getPointOn(b, x);
            P && u.attr({
              x: P[0] + S,
              y: P[1] + w
            });
            var I = v.getRawValue(A[0]), L = v.getRawValue(A[1]);
            o && (T = tb(n, d, I, L, C.t));
          }
          a.lastFrameIndex = A[0];
        } else {
          var E = e === 1 || a.lastFrameIndex > 0 ? A[0] : 0, P = Fd(f, E);
          o && (T = v.getRawValue(E)), u.attr({
            x: P[0] + S,
            y: P[1] + w
          });
        }
        if (o) {
          var R = Cs(u);
          typeof R.setLabelText == "function" && R.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, h = this._polygon, f = e.hostModel, v = QD(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), c = v.current, d = v.stackedOnCurrent, g = v.next, p = v.stackedOnNext;
      if (o && (d = hr(v.stackedOnCurrent, v.current, n, o, l), c = hr(v.current, null, n, o, l), p = hr(v.stackedOnNext, v.next, n, o, l), g = hr(v.next, null, n, o, l)), Bd(c, g) > 3e3 || h && Bd(d, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: g
        }), h && (h.stopAnimation(), h.setShape({
          points: g,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = c;
      var y = {
        shape: {
          points: g
        }
      };
      v.current !== c && (y.shape.__points = v.next), u.stopAnimation(), te(u, y, f), h && (h.setShape({
        // Reuse the points with polyline.
        points: c,
        stackedOnPoints: d
      }), h.stopAnimation(), te(h, {
        shape: {
          stackedOnPoints: p
        }
      }, f), u.shape.points !== h.shape.points && (h.shape.points = u.shape.points));
      for (var m = [], _ = v.status, b = 0; b < _.length; b++) {
        var S = _[b].cmd;
        if (S === "=") {
          var w = e.getItemGraphicEl(_[b].idx1);
          w && m.push({
            el: w,
            ptIdx: b
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        h && h.dirtyShape();
        for (var x = u.shape.__points, C = 0; C < m.length; C++) {
          var A = m[C].el, M = m[C].ptIdx * 2;
          A.x = x[M], A.y = x[M + 1], A.markRedraw();
        }
      });
    }, t.prototype.remove = function(e) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(Se)
);
function cA(r, t) {
  return {
    seriesType: r,
    plan: hf(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = W(n.dimensions, function(f) {
          return i.mapDimension(f);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        Ji(i, a[0]) && (a[0] = s), Ji(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), h = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(f, v) {
            for (var c = f.end - f.start, d = Ue(c * o), g = [], p = [], y = f.start, m = 0; y < f.end; y++) {
              var _ = void 0;
              if (o === 1) {
                var b = l.get(u, y);
                _ = n.dataToPoint(b, null, p);
              } else
                g[0] = l.get(u, y), g[1] = l.get(h, y), _ = n.dataToPoint(g, null, p);
              d[m++] = _[0], d[m++] = _[1];
            }
            v.setLayout("points", d);
          }
        };
      }
    }
  };
}
var vA = {
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
}, dA = function(r) {
  return Math.round(r.length / 2);
};
function Ym(r) {
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
          var d = void 0;
          z(a) ? d = vA[a] : q(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / c, d, dA));
        }
      }
    }
  };
}
function pA(r) {
  r.registerChartView(fA), r.registerSeriesModel(YD), r.registerLayout(cA("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Ym("line"));
}
var ih = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return yf(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          D(a.getAxes(), function(v, c) {
            if (v.type === "category" && i != null) {
              var d = v.getTicksCoords(), g = v.getTickModel().get("alignWithLabel"), p = o[c], y = i[c] === "x1" || i[c] === "y1";
              if (y && !g && (p += 1), d.length < 2)
                return;
              if (d.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[y ? 1 : 0]);
                return;
              }
              for (var m = void 0, _ = void 0, b = 1, S = 0; S < d.length; S++) {
                var w = d[S].coord, x = S === d.length - 1 ? d[S - 1].tickValue + b : d[S].tickValue;
                if (x === p) {
                  _ = w;
                  break;
                } else if (x < p)
                  m = w;
                else if (m != null && x > p) {
                  _ = (w + m) / 2;
                  break;
                }
                S === 1 && (b = x - d[0].tickValue);
              }
              _ == null && (m ? m && (_ = d[d.length - 1].coord) : _ = d[0].coord), s[c] = v.toGlobalCoord(_);
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
  }(ke)
);
ke.registerClass(ih);
var gA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return yf(null, this, {
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
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = jg(ih.defaultOption, {
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
  }(ih)
), yA = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  }()
), $d = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new yA();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, h = i.startAngle, f = i.endAngle, v = i.clockwise, c = Math.PI * 2, d = v ? f - h < c : h - f < c;
      d || (h = f - (v ? c : -c));
      var g = Math.cos(h), p = Math.sin(h), y = Math.cos(f), m = Math.sin(f);
      d ? (e.moveTo(g * o + n, p * o + a), e.arc(g * u + n, p * u + a, l, -Math.PI + h, h, !v)) : e.moveTo(g * s + n, p * s + a), e.arc(n, a, s, h, f, !v), e.arc(y * u + n, m * u + a, l, f - Math.PI * 2, f - Math.PI, !v), o !== 0 && e.arc(n, a, o, f, h, v);
    }, t;
  }(ot)
);
function mA(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return $o(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, h = u.cx, f = u.cy, v = u.r, c = u.r0, d = (v + c) / 2, g = u.startAngle, p = u.endAngle, y = (g + p) / 2, m = e ? Math.abs(v - c) / 2 : 0, _ = Math.cos, b = Math.sin, S = h + v * _(g), w = f + v * b(g), x = "left", C = "top";
    switch (s) {
      case "startArc":
        S = h + (c - l) * _(y), w = f + (c - l) * b(y), x = "center", C = "top";
        break;
      case "insideStartArc":
        S = h + (c + l) * _(y), w = f + (c + l) * b(y), x = "center", C = "bottom";
        break;
      case "startAngle":
        S = h + d * _(g) + lo(g, l + m, !1), w = f + d * b(g) + uo(g, l + m, !1), x = "right", C = "middle";
        break;
      case "insideStartAngle":
        S = h + d * _(g) + lo(g, -l + m, !1), w = f + d * b(g) + uo(g, -l + m, !1), x = "left", C = "middle";
        break;
      case "middle":
        S = h + d * _(y), w = f + d * b(y), x = "center", C = "middle";
        break;
      case "endArc":
        S = h + (v + l) * _(y), w = f + (v + l) * b(y), x = "center", C = "bottom";
        break;
      case "insideEndArc":
        S = h + (v - l) * _(y), w = f + (v - l) * b(y), x = "center", C = "top";
        break;
      case "endAngle":
        S = h + d * _(p) + lo(p, l + m, !0), w = f + d * b(p) + uo(p, l + m, !0), x = "left", C = "middle";
        break;
      case "insideEndAngle":
        S = h + d * _(p) + lo(p, -l + m, !0), w = f + d * b(p) + uo(p, -l + m, !0), x = "right", C = "middle";
        break;
      default:
        return $o(i, n, a);
    }
    return i = i || {}, i.x = S, i.y = w, i.align = x, i.verticalAlign = C, i;
  };
}
function _A(r, t, e, i) {
  if (ft(i)) {
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
function lo(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function uo(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function bA(r, t, e) {
  var i = r.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  $(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: W(i, function(a) {
      return br(a, n);
    })
  };
}
var jl = Math.max, Jl = Math.min;
function wA(r, t) {
  var e = r.getArea && r.getArea();
  if (Cf(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var SA = (
  /** @class */
  function(r) {
    B(t, r);
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
      ws(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, h = u.getBaseAxis(), f;
      u.type === "cartesian2d" ? f = h.isHorizontal() : u.type === "polar" && (f = h.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, c = xA(e, u);
      c && this._enableRealtimeSort(c, s, n);
      var d = e.get("clip", !0) || c, g = wA(u, s);
      o.removeClipPath();
      var p = e.get("roundCap", !0), y = e.get("showBackground", !0), m = e.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], S = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function C(T) {
        var P = ho[u.type](s, T), I = IA(u, f, P);
        return I.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? I.setShape("r", _) : I.setShape("cornerRadius", _), b[T] = I, I;
      }
      s.diff(l).add(function(T) {
        var P = s.getItemModel(T), I = ho[u.type](s, T, P);
        if (y && C(T), !(!s.hasValue(T) || !Wd[u.type](I))) {
          var L = !1;
          d && (L = zd[u.type](g, I));
          var E = Hd[u.type](e, s, T, I, f, v, h.model, !1, p);
          c && (E.forceLabelAnimation = !0), Ud(E, s, T, P, I, e, f, u.type === "polar"), w ? E.attr({
            shape: I
          }) : c ? Gd(c, v, E, I, T, f, !1, !1) : Qe(E, {
            shape: I
          }, e, T), s.setItemGraphicEl(T, E), o.add(E), E.ignore = L;
        }
      }).update(function(T, P) {
        var I = s.getItemModel(T), L = ho[u.type](s, T, I);
        if (y) {
          var E = void 0;
          S.length === 0 ? E = C(P) : (E = S[P], E.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? E.setShape("r", _) : E.setShape("cornerRadius", _), b[T] = E);
          var R = ho[u.type](s, T), H = qm(f, R, u);
          te(E, {
            shape: H
          }, v, T);
        }
        var k = l.getItemGraphicEl(P);
        if (!s.hasValue(T) || !Wd[u.type](L)) {
          o.remove(k);
          return;
        }
        var N = !1;
        if (d && (N = zd[u.type](g, L), N && o.remove(k)), k ? Wg(k) : k = Hd[u.type](e, s, T, L, f, v, h.model, !!k, p), c && (k.forceLabelAnimation = !0), x) {
          var V = k.getTextContent();
          if (V) {
            var Z = Cs(V);
            Z.prevValue != null && (Z.prevValue = Z.value);
          }
        } else
          Ud(k, s, T, I, L, e, f, u.type === "polar");
        w ? k.attr({
          shape: L
        }) : c ? Gd(c, v, k, L, T, f, !0, x) : te(k, {
          shape: L
        }, e, T, null), s.setItemGraphicEl(T, k), k.ignore = N, o.add(k);
      }).remove(function(T) {
        var P = l.getItemGraphicEl(T);
        P && Nu(P, e, T);
      }).execute();
      var A = this._backgroundGroup || (this._backgroundGroup = new Mt());
      A.removeAll();
      for (var M = 0; M < b.length; ++M)
        A.add(b[M]);
      o.add(A), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Xd(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Xd(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && eA(e.coordinateSystem, !1, e), n = this.group;
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
        ordinalNumbers: W(a, function(o) {
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
        Nu(a, e, rt(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(Se)
), zd = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = jl(t.x, r.x), s = Jl(t.x + t.width, n), l = jl(t.y, r.y), u = Jl(t.y + t.height, a), h = s < o, f = u < l;
    return t.x = h && o > n ? s : o, t.y = f && l > a ? u : l, t.width = h ? 0 : s - o, t.height = f ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), h || f;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = Jl(t.r, r.r), a = jl(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, Hd = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new xt({
      shape: O({}, i),
      z2: 1
    });
    if (u.__dataIndex = e, u.name = "item", a) {
      var h = u.shape, f = n ? "height" : "width";
      h[f] = 0;
    }
    return u;
  },
  polar: function(r, t, e, i, n, a, o, s, l) {
    var u = !n && l ? $d : sn, h = new u({
      shape: i,
      z2: 1
    });
    h.name = "item";
    var f = Xm(n);
    if (h.calculateTextPosition = mA(f, {
      isRoundCap: u === $d
    }), a) {
      var v = h.shape, c = n ? "r" : "endAngle", d = {};
      v[c] = n ? i.r0 : i.startAngle, d[c] = i[c], (s ? te : Qe)(h, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function xA(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function Gd(r, t, e, i, n, a, o, s) {
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
  }), s || (o ? te : Qe)(e, {
    shape: l
  }, t, n, null);
  var h = t ? r.baseAxis.model : null;
  (o ? te : Qe)(e, {
    shape: u
  }, h, n);
}
function Vd(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var TA = ["x", "y", "width", "height"], CA = ["cx", "cy", "r", "startAngle", "endAngle"], Wd = {
  cartesian2d: function(r) {
    return !Vd(r, TA);
  },
  polar: function(r) {
    return !Vd(r, CA);
  }
}, ho = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? AA(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
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
function DA(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function Xm(r) {
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
function Ud(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = r.shape, f = bA(i.getModel("itemStyle"), h);
      O(h, f), r.setShape(h);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var c = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", d = Ts(i);
  xs(r, d, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: xf(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c
  });
  var g = r.getTextContent();
  if (s && g) {
    var p = i.get(["label", "position"]);
    r.textConfig.inside = p === "middle" ? !0 : null, _A(r, p === "outside" ? c : p, Xm(o), i.get(["label", "rotate"]));
  }
  pS(g, d, a.getRawValue(e), function(m) {
    return $m(t, m);
  });
  var y = i.getModel(["emphasis"]);
  Uo(r, y.get("focus"), y.get("blurScope"), y.get("disabled")), Ru(r, i), DA(n) && (r.style.fill = "none", r.style.stroke = "none", D(r.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function AA(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var MA = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
    }
    return r;
  }()
), Yd = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new MA();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < n.length; h += 3)
        l[a] = u, l[o] = n[h + 2], s[a] = n[h + a], s[o] = n[h + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(ot)
);
function Xd(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new Yd({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), e && e.push(h);
  }
  var f = new Yd({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  f.baseDimIdx = a, f.largeDataIndices = o, f.barWidth = s, t.add(f), f.useStyle(n.getVisual("style")), f.style.stroke = null, rt(f).seriesIndex = r.seriesIndex, r.get("silent") || (f.on("mousedown", qd), f.on("mousemove", qd)), e && e.push(f);
}
var qd = ff(function(r) {
  var t = this, e = PA(t, r.offsetX, r.offsetY);
  rt(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function PA(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, h = 0, f = a.length / 3; h < f; h++) {
    var v = h * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function qm(r, t, e) {
  if (Cf(e, "cartesian2d")) {
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
function IA(r, t, e) {
  var i = r.type === "polar" ? sn : xt;
  return new i({
    shape: qm(t, e, r),
    silent: !0,
    z2: 0
  });
}
function LA(r) {
  r.registerChartView(SA), r.registerSeriesModel(gA), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, St(lD, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, uD("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Ym("bar")), r.registerAction({
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
var EA = (
  /** @class */
  function(r) {
    B(t, r);
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
  }(lt)
), nh = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", be).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(lt)
);
Ne(nh, ED);
var Zm = {
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
}, RA = it({
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
}, Zm), Df = it({
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
}, Zm), kA = it({
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
}, Df), OA = at({
  logBase: 10
}, Df);
const BA = {
  category: RA,
  value: Df,
  time: kA,
  log: OA
};
var NA = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Zd(r, t, e, i) {
  D(NA, function(n, a) {
    var o = it(it({}, BA[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, f) {
          var v = ca(this), c = v ? Rs(h) : {}, d = f.getTheme();
          it(h, d.get(a + "Axis")), it(h, this.getDefaultOption()), h.type = Kd(h), v && Ki(h, c, v);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = th.createByAxisModel(this));
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
  }), r.registerSubTypeDefaulter(t + "Axis", Kd);
}
function Kd(r) {
  return r.type || (r.data ? "category" : "value");
}
var FA = (
  /** @class */
  function() {
    function r(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return r.prototype.getAxis = function(t) {
      return this._axes[t];
    }, r.prototype.getAxes = function() {
      return W(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, r.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), Dt(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  }()
), ah = ["x", "y"];
function Qd(r) {
  return r.type === "interval" || r.type === "time";
}
var $A = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = ah, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Qd(e) || !Qd(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, f = (s[1] - o[1]) / u, v = o[0] - n[0] * h, c = o[1] - a[0] * f, d = this._transform = [h, 0, 0, f, v, c];
          this._invTransform = Ph([], d);
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
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new nt(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return fe(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return fe(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new nt(a, o, s, l);
    }, t;
  }(FA)
), zA = (
  /** @class */
  function(r) {
    B(t, r);
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
  }(GD)
);
function oh(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, h = i.getRect(), f = [h.x, h.x + h.width, h.y, h.y + h.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = t.get("offset") || 0, d = u === "x" ? [f[2] - c, f[3] + c] : [f[0] - c, f[1] + c];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    d[v.onZero] = Math.max(Math.min(g, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[v[l]] : f[0], u === "x" ? d[v[l]] : f[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), oa(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function jd(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function Jd(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, be).models[0];
    t[i] = a;
  }), t;
}
var tu = Math.log;
function HA(r, t, e) {
  var i = hn.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = Im(r, t), u = l.extent, h = l.fixMin, f = l.fixMax;
  if (r.type === "log") {
    var v = tu(r.base);
    u = [tu(u[0]) / v, tu(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: f
  });
  var c = i.getExtent.call(r);
  h && (u[0] = c[0]), f && (u[1] = c[1]);
  var d = i.getInterval.call(r), g = u[0], p = u[1];
  if (h && f)
    d = (p - g) / o;
  else if (h)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = Zl(d), p = u[0] + d * o;
  else if (f)
    for (g = u[1] - d * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      d = Zl(d), g = u[1] - d * o;
  else {
    var y = r.getTicks().length - 1;
    y > o && (d = Zl(d));
    var m = d * o;
    p = Math.ceil(u[1] / d) * d, g = wt(p - m), g < 0 && u[0] >= 0 ? (g = 0, p = wt(m)) : p > 0 && u[1] <= 0 && (p = 0, g = -wt(m));
  }
  var _ = (n[0].value - a[0].value) / s, b = (n[o].value - a[o].value) / s;
  i.setExtent.call(r, g + d * _, p + d * b), i.setInterval.call(r, d), (_ || b) && i.setNiceExtent.call(r, g + d, p - d);
}
var GA = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = ah, this._initCartesian(t, e, i), this.model = t;
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
            var v = +l[f], c = o[v], d = c.model, g = c.scale;
            // Only value and log axis without interval support alignTicks.
            eh(g) && d.get("alignTicks") && d.get("interval") == null ? h.push(c) : (Md(g, d), eh(g) && (s = c));
          }
          h.length && (s || (s = h.pop(), Md(s.scale, s.model)), D(h, function(p) {
            HA(p.scale, p.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      D(i.x, function(o) {
        tp(i, "y", o, a);
      }), D(i.y, function(o) {
        tp(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = Qo(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (D(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = PD(u);
          if (h) {
            var f = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[f] -= h[f] + v, u.position === "top" ? o.y += h.height + v : u.position === "left" && (o.x += h.width + v);
          }
        }
      }), l()), D(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        D(s, function(u) {
          var h = u.isHorizontal(), f = h ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(f[v], f[1 - v]), VA(u, h ? o.x : o.y);
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
      G(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
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
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", be).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", be).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, ut(o, s) < 0 && (s = null);
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
      this._axesMap = s, D(s.x, function(h, f) {
        D(s.y, function(v, c) {
          var d = "x" + f + "y" + c, g = new $A(d);
          g.master = n, g.model = t, n._coordsMap[d] = g, n._coordsList.push(g), g.addAxis(h), g.addAxis(v);
        });
      });
      function u(h) {
        return function(f, v) {
          if (eu(f, t)) {
            var c = f.get("position");
            h === "x" ? c !== "top" && c !== "bottom" && (c = o.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = o.left ? "right" : "left"), o[c] = !0;
            var d = new zA(h, AD(f), [0, 0], f.get("type"), c), g = d.type === "category";
            d.onBand = g && f.get("boundaryGap"), d.inverse = f.get("inverse"), f.axis = d, d.model = f, d.grid = a, d.index = v, a._axesList.push(d), s[h][v] = d, l[h]++;
          }
        };
      }
    }, r.prototype._updateScale = function(t, e) {
      D(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (jd(n)) {
          var a = Jd(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!eu(o, e) || !eu(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), h = l.getAxis("x"), f = l.getAxis("y");
          i(u, h), i(u, f);
        }
      }, this);
      function i(n, a) {
        D(LD(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return D(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        ut(e, a) < 0 && e.push(a), ut(i, o) < 0 && i.push(o);
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
        if (jd(n)) {
          var a = Jd(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = ah, r;
  }()
);
function eu(r, t) {
  return r.getCoordSysModel() === t;
}
function tp(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    ep(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && ep(n[u]) && !i[h(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[h(a)] = !0);
  function h(f) {
    return f.dim + "_" + f.index;
  }
}
function ep(r) {
  return r && r.type !== "category" && r.type !== "time" && MD(r);
}
function VA(r, t) {
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
var pr = Math.PI, _r = (
  /** @class */
  function() {
    function r(t, e) {
      this.group = new Mt(), this.opt = e, this.axisModel = t, at(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Mt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!rp[t];
    }, r.prototype.add = function(t) {
      rp[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = hg(e - t), a, o;
      return zo(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : zo(n - pr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < pr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), rp = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (fe(s, s, o), fe(l, l, o));
      var h = O({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), f = new wr({
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
      ha(f.shape, f.style.lineWidth), f.anid = "line", e.add(f);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var c = t.get(["axisLine", "symbolSize"]);
        z(v) && (v = [v, v]), (z(c) || ft(c)) && (c = [c, c]);
        var d = Yy(t.get(["axisLine", "symbolOffset"]) || 0, c), g = c[0], p = c[1];
        D([{
          rotate: r.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = ji(v[m], -g / 2, -p / 2, g, p, h.stroke, !0), b = y.r + y.offset, S = u ? l : s;
            _.attr({
              rotation: y.rotate,
              x: S[0] + b * Math.cos(r.rotation),
              y: S[1] - b * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = YA(e, i, t, r), a = qA(e, i, t, r);
    if (UA(t, a, n), XA(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = WD(W(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      UD(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = oa(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, f = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        np(a) ? r.labelOffset + o * l : 0
      ], v, c = t.get("nameRotate");
      c != null && (c = c * pr / 180);
      var d;
      np(a) ? v = _r.innerTextLayout(
        r.rotation,
        c ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = WA(r.rotation, a, c || 0, u), d = r.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, y = p.ellipsis, m = oa(r.nameTruncateMaxWidth, p.maxWidth, d), _ = new Yt({
        x: f[0],
        y: f[1],
        rotation: v.rotation,
        silent: _r.isLabelSilent(t),
        style: Zi(s, {
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
      if (bs({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var b = _r.makeAxisEventDataBase(t);
        b.targetType = "axisName", b.name = n, rt(_).eventData = b;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function WA(r, t, e, i) {
  var n = hg(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return zo(n - pr / 2) ? (o = l ? "bottom" : "top", a = "center") : zo(n - pr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < pr * 1.5 && n > pr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function UA(r, t, e) {
  if (!Lm(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], h = e[1], f = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (re(a), re(u)) : ip(a, o) && (i ? (re(o), re(h)) : (re(a), re(u))), n === !1 ? (re(s), re(f)) : ip(l, s) && (n ? (re(l), re(v)) : (re(s), re(f)));
  }
}
function re(r) {
  r && (r.ignore = !0);
}
function ip(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = Ah([]);
    return Mh(n, n, -r.rotation), e.applyTransform(Gi([], n, r.getLocalTransform())), i.applyTransform(Gi([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function np(r) {
  return r === "middle" || r === "center";
}
function Km(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (fe(o, o, t), fe(s, s, t));
    var h = new wr({
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
    ha(h.shape, h.style.lineWidth), h.anid = n + "_" + r[l].tickValue, a.push(h);
  }
  return a;
}
function YA(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), h = Km(u, t.transform, l, at(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), f = 0; f < h.length; f++)
      r.add(h[f]);
    return h;
  }
}
function XA(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = at(s.getLineStyle(), at(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var f = Km(o[h], t.transform, l, u, "minorticks_" + h), v = 0; v < f.length; v++)
          r.add(f[v]);
  }
}
function qA(r, t, e, i) {
  var n = e.axis, a = oa(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (oa(i.labelRotate, o.get("rotate")) || 0) * pr / 180, h = _r.innerTextLayout(i.rotation, u, i.labelDirection), f = e.getCategories && e.getCategories(!0), v = [], c = _r.isLabelSilent(e), d = e.get("triggerEvent");
    return D(l, function(g, p) {
      var y = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (f && f[y]) {
        var S = f[y];
        G(S) && S.textStyle && (b = new yt(S.textStyle, o, e.ecModel));
      }
      var w = b.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(y), C = b.getShallow("align", !0) || h.textAlign, A = Q(b.getShallow("alignMinLabel", !0), C), M = Q(b.getShallow("alignMaxLabel", !0), C), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, P = Q(b.getShallow("verticalAlignMinLabel", !0), T), I = Q(b.getShallow("verticalAlignMaxLabel", !0), T), L = new Yt({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: h.rotation,
        silent: c,
        z2: 10 + (g.level || 0),
        style: Zi(b, {
          text: m,
          align: p === 0 ? A : p === l.length - 1 ? M : C,
          verticalAlign: p === 0 ? P : p === l.length - 1 ? I : T,
          fill: q(w) ? w(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? y + "" : y,
            p
          ) : w
        })
      });
      if (L.anid = "label_" + y, bs({
        el: L,
        componentModel: e,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return L.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var E = _r.makeAxisEventDataBase(e);
        E.targetType = "axisLabel", E.value = _, E.tickIndex = p, n.type === "category" && (E.dataIndex = y), rt(L).eventData = E;
      }
      t.add(L), L.updateTransform(), v.push(L), r.add(L), L.decomposeTransform();
    }), v;
  }
}
function ZA(r, t) {
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
  return KA(e, r, t), e.seriesInvolved && jA(e, r), e;
}
function KA(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  D(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = ma(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var h = s.model, f = h.getModel("tooltip", i);
    if (D(s.getAxes(), St(g, !1, null)), s.getTooltipAxes && i && f.get("show")) {
      var v = f.get("trigger") === "axis", c = f.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(f.get(["axisPointer", "axis"]));
      (v || c) && D(d.baseAxes, St(g, c ? "cross" : !0, v)), c && D(d.otherAxes, St(g, "cross", !1));
    }
    function g(p, y, m) {
      var _ = m.model.getModel("axisPointer", n), b = _.get("show");
      if (!(!b || b === "auto" && !p && !sh(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = p ? QA(m, f, n, t, p, y) : _;
        var S = _.get("snap"), w = _.get("triggerEmphasis"), x = ma(m.model), C = y || S || m.type === "category", A = r.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: C,
          snap: S,
          useHandle: sh(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = A, r.seriesInvolved = r.seriesInvolved || C;
        var M = JA(a, m);
        if (M != null) {
          var T = o[M] || (o[M] = {
            axesInfo: {}
          });
          T.axesInfo[x] = A, T.mapper = a[M].mapper, A.linkGroup = T;
        }
      }
    }
  });
}
function QA(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  D(s, function(v) {
    l[v] = tt(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var f = l.lineStyle = o.get("crossStyle");
      f && at(u, f.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new yt(l, e, i));
}
function jA(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || D(r.coordSysAxesInfo[ma(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function JA(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (ru(a[i + "AxisId"], e.id) || ru(a[i + "AxisIndex"], e.componentIndex) || ru(a[i + "AxisName"], e.name))
      return n;
  }
}
function ru(r, t) {
  return r === "all" || $(r) && ut(r, t) >= 0 || r === t;
}
function tM(r) {
  var t = Af(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = sh(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Af(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[ma(r)];
}
function eM(r) {
  var t = Af(r);
  return t && t.axisPointerModel;
}
function sh(r) {
  return !!r.get(["handle", "show"]);
}
function ma(r) {
  return r.type + "||" + r.id;
}
var ap = {}, Qm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && tM(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
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
        var o = eM(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      ap[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && ap[e];
    }, t.type = "axis", t;
  }(Oe)
), lh = Tt();
function rM(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, f = lh(r).splitAreaColors, v = K(), c = 0;
      if (f)
        for (var d = 0; d < u.length; d++) {
          var g = f.get(u[d].tickValue);
          if (g != null) {
            c = (g + (h - 1) * d) % h;
            break;
          }
        }
      var p = n.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = $(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var m = n.toGlobalCoord(u[d].coord), _ = void 0, b = void 0, S = void 0, w = void 0;
        n.isHorizontal() ? (_ = p, b = l.y, S = m - _, w = l.height, p = _ + S) : (_ = l.x, b = p, S = l.width, w = m - b, p = b + w);
        var x = u[d - 1].tickValue;
        x != null && v.set(x, c), t.add(new xt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: b,
            width: S,
            height: w
          },
          style: at({
            fill: s[c]
          }, y),
          autoBatch: !0,
          silent: !0
        })), c = (c + 1) % h;
      }
      lh(r).splitAreaColors = v;
    }
  }
}
function iM(r) {
  lh(r).splitAreaColors = null;
}
var nM = ["axisLine", "axisTickLabel", "axisName"], aM = ["splitArea", "splitLine", "minorSplitLine"], jm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.axisPointerClass = "CartesianAxisPointer", e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new Mt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = oh(s, e), u = new _r(e, O({
          handleAutoShown: function(f) {
            for (var v = s.coordinateSystem.getCartesians(), c = 0; c < v.length; c++)
              if (eh(v[c].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        D(nM, u.add, u), this._axisGroup.add(u.getGroup()), D(aM, function(f) {
          e.get([f, "show"]) && oM[f](this, this._axisGroup, e, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || qg(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      iM(this);
    }, t.type = "cartesianAxis", t;
  }(Qm)
), oM = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = $(s) ? s : [s];
      for (var h = i.coordinateSystem.getRect(), f = n.isHorizontal(), v = 0, c = n.getTicksCoords({
        tickModel: a
      }), d = [], g = [], p = o.getLineStyle(), y = 0; y < c.length; y++) {
        var m = n.toGlobalCoord(c[y].coord);
        if (!(y === 0 && !l || y === c.length - 1 && !u)) {
          var _ = c[y].tickValue;
          f ? (d[0] = m, d[1] = h.y, g[0] = m, g[1] = h.y + h.height) : (d[0] = h.x, d[1] = m, g[0] = h.x + h.width, g[1] = m);
          var b = v++ % s.length, S = new wr({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: g[0],
              y2: g[1]
            },
            style: at({
              stroke: s[b]
            }, p),
            silent: !0
          });
          ha(S.shape, p.lineWidth), t.add(S);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var h = [], f = [], v = o.getLineStyle(), c = 0; c < u.length; c++)
        for (var d = 0; d < u[c].length; d++) {
          var g = n.toGlobalCoord(u[c][d].coord);
          l ? (h[0] = g, h[1] = s.y, f[0] = g, f[1] = s.y + s.height) : (h[0] = s.x, h[1] = g, f[0] = s.x + s.width, f[1] = g);
          var p = new wr({
            anid: "minor_line_" + u[c][d].tickValue,
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
          ha(p.shape, v.lineWidth), t.add(p);
        }
  },
  splitArea: function(r, t, e, i) {
    rM(r, t, e, i);
  }
}, Jm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  }(jm)
), sM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = Jm.type, e;
    }
    return t.type = "yAxis", t;
  }(jm)
), lM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new xt({
        shape: e.coordinateSystem.getRect(),
        style: at({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(Oe)
), op = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function uM(r) {
  r.registerComponentView(lM), r.registerComponentModel(EA), r.registerCoordinateSystem("cartesian2d", GA), Zd(r, "x", nh, op), Zd(r, "y", nh, op), r.registerComponentView(Jm), r.registerComponentView(sM), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var jr = Tt(), sp = tt, iu = vt, hM = (
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
          s = this._group = new Mt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = St(lp, e, f);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        hp(s, e, !0), this._renderHandle(a);
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
          var l = Af(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = jr(t).pointerEl = new hS[a.type](sp(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = jr(t).labelEl = new Yt(sp(e.label));
        t.add(a), up(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = jr(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = jr(t).labelEl;
      a && (a.setStyle(e.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: e.label.x,
        y: e.label.y
      }), up(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = Kh(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Yp(u.event);
          },
          onmousedown: iu(this._onHandleDragMove, this, 0, 0),
          drift: iu(this._onHandleDragMove, this),
          ondragend: iu(this._onHandleDragEnd, this)
        }), i.add(n)), hp(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        $(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, Fy(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      lp(this._axisPointerModel, !e && this._moveAnimation, this._handle, nu(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(nu(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(nu(n)), jr(i).lastProp = null, this._doDispatchAxisPointer();
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
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Uu(this, "_doDispatchAxisPointer");
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
function lp(r, t, e, i) {
  t0(jr(e).lastProp, i) || (jr(e).lastProp = i, t ? te(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function t0(r, t) {
  if (G(r) && G(t)) {
    var e = !0;
    return D(t, function(i, n) {
      e = e && t0(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function up(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function nu(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function hp(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function fM(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function cM(r, t, e, i, n) {
  var a = e.get("value"), o = e0(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = Es(s.get("padding") || 0), u = s.getFont(), h = Eh(o, u), f = n.position, v = h.width + l[1] + l[3], c = h.height + l[0] + l[2], d = n.align;
  d === "right" && (f[0] -= v), d === "center" && (f[0] -= v / 2);
  var g = n.verticalAlign;
  g === "bottom" && (f[1] -= c), g === "middle" && (f[1] -= c / 2), vM(f, v, c, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: f[0],
    y: f[1],
    style: Zi(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: p
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function vM(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function e0(r, t, e, i, n) {
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
      value: wf(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    D(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, f = u && u.getDataParams(h);
      f && s.seriesData.push(f);
    }), z(o) ? a = o.replace("{value}", a) : q(o) && (a = o(s));
  }
  return a;
}
function r0(r, t, e) {
  var i = Hi();
  return Mh(i, i, e.rotation), gu(i, i, e.position), Zh([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function dM(r, t, e, i, n, a) {
  var o = _r.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), cM(t, i, n, a, {
    position: r0(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function pM(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function gM(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var yM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), h = fp(l, s).getOtherAxis(s).getGlobalExtent(), f = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = fM(a), c = mM[u](s, f, h);
        c.style = v, e.graphicKey = c.type, e.pointer = c;
      }
      var d = oh(l.model, n);
      dM(
        // @ts-ignore
        i,
        e,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = oh(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = r0(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = fp(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, f = [e.x, e.y];
      f[h] += i[h], f[h] = Math.min(l[1], f[h]), f[h] = Math.max(l[0], f[h]);
      var v = (u[1] + u[0]) / 2, c = [v, v];
      c[h] = f[h];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: f[0],
        y: f[1],
        rotation: e.rotation,
        cursorPoint: c,
        tooltipOption: d[h]
      };
    }, t;
  }(hM)
);
function fp(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var mM = {
  line: function(r, t, e) {
    var i = pM([t, e[0]], [t, e[1]], cp(r));
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
      shape: gM([t - i / 2, e[0]], [i, n], cp(r))
    };
  }
};
function cp(r) {
  return r.dim === "x" ? 0 : 1;
}
var _M = (
  /** @class */
  function(r) {
    B(t, r);
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
  }(lt)
), Ye = Tt(), bM = D;
function i0(r, t, e) {
  if (!U.node) {
    var i = t.getZr();
    Ye(i).records || (Ye(i).records = {}), wM(i, t);
    var n = Ye(i).records[r] || (Ye(i).records[r] = {});
    n.handler = e;
  }
}
function wM(r, t) {
  if (Ye(r).initialized)
    return;
  Ye(r).initialized = !0, e("click", St(vp, "click")), e("mousemove", St(vp, "mousemove")), e("globalout", xM);
  function e(i, n) {
    r.on(i, function(a) {
      var o = TM(t);
      bM(Ye(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), SM(o.pendings, t);
    });
  }
}
function SM(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function xM(r, t, e) {
  r.handler("leave", null, e);
}
function vp(r, t, e, i) {
  t.handler(r, e, i);
}
function TM(r) {
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
function uh(r, t) {
  if (!U.node) {
    var e = t.getZr(), i = (Ye(e).records || {})[r];
    i && (Ye(e).records[r] = null);
  }
}
var CM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      i0("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      uh("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      uh("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(Oe)
);
function n0(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = ui(a, r);
  if (o == null || o < 0 || $(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), f = h.dim, v = u.dim, c = f === "x" || f === "radius" ? 1 : 0, d = a.mapDimension(v), g = [];
      g[c] = a.get(d, o), g[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(g) || [];
    } else
      e = l.dataToPoint(a.getValues(W(l.dimensions, function(y) {
        return a.mapDimension(y);
      }), o)) || [];
  else if (s) {
    var p = s.getBoundingRect().clone();
    p.applyTransform(s.transform), e = [p.x + p.width / 2, p.y + p.height / 2];
  }
  return {
    point: e,
    el: s
  };
}
var dp = Tt();
function DM(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || vt(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Mo(n) && (n = n0({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = Mo(n), u = a.axesInfo, h = s.axesInfo, f = i === "leave" || Mo(n), v = {}, c = {}, d = {
      list: [],
      map: {}
    }, g = {
      showPointer: St(MM, c),
      showTooltip: St(PM, d)
    };
    D(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(n);
      D(s.coordSysAxesInfo[m], function(b, S) {
        var w = b.axis, x = RM(u, b);
        if (!f && _ && (!u || x)) {
          var C = x && x.value;
          C == null && !l && (C = w.pointToData(n)), C != null && pp(b, C, g, !1, v);
        }
      });
    });
    var p = {};
    return D(h, function(y, m) {
      var _ = y.linkGroup;
      _ && !c[m] && D(_.axesInfo, function(b, S) {
        var w = c[S];
        if (b !== y && w) {
          var x = w.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, gp(b), gp(y)))), p[y.key] = x;
        }
      });
    }), D(p, function(y, m) {
      pp(h[m], y, g, !0, v);
    }), IM(c, h, v), LM(d, n, r, o), EM(h, o, e), v;
  }
}
function pp(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = AM(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && O(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function AM(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return D(t.seriesModels, function(l, u) {
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
      var d = r - f, g = Math.abs(d);
      g <= o && ((g < o || d >= 0 && s < 0) && (o = g, s = d, n = f, a.length = 0), D(v, function(p) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: p,
          dataIndex: l.getData().getRawIndex(p)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: n
  };
}
function MM(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function PM(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = ma(l), h = r.map[u];
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
function IM(r, t, e) {
  var i = e.axesInfo = [];
  D(t, function(n, a) {
    var o = n.axisPointerModel.option, s = r[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function LM(r, t, e, i) {
  if (Mo(t) || !r.list.length) {
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
function EM(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = dp(i)[n] || {}, o = dp(i)[n] = {};
  D(r, function(u, h) {
    var f = u.axisPointerModel.option;
    f.status === "show" && u.triggerEmphasis && D(f.seriesDataIndices, function(v) {
      var c = v.seriesIndex + " | " + v.dataIndex;
      o[c] = v;
    });
  });
  var s = [], l = [];
  D(a, function(u, h) {
    !o[h] && l.push(u);
  }), D(o, function(u, h) {
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
function RM(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function gp(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function Mo(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function a0(r) {
  Qm.registerAxisPointerClass("CartesianAxisPointer", yM), r.registerComponentModel(_M), r.registerComponentView(CM), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !$(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = ZA(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, DM);
}
function kM(r) {
  Sr(uM), Sr(a0);
}
function OM(r, t) {
  var e = Es(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), r = new xt({
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
var BM = (
  /** @class */
  function(r) {
    B(t, r);
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
  }(lt)
);
function o0(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function s0(r) {
  if (U.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var l0 = s0(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), NM = s0(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function u0(r, t) {
  if (!r)
    return t;
  t = hy(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function FM(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var $M = u0(NM, "transition"), Mf = u0(l0, "transform"), zM = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (U.transform3dSupported ? "will-change:transform;" : "");
function HM(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function GM(r, t, e) {
  if (!z(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = fi(t);
  var a = HM(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Mf + ":", u;
  ut(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, f = o + n, v = f * Math.abs(Math.cos(h)) + f * Math.abs(Math.sin(h)), c = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - f) / 2) * 100) / 100;
  s += ";" + a + ":-" + c + "px";
  var d = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function VM(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += U.transformSupported ? "," + Mf + i : ",left" + i + ",top" + i), $M + ":" + n;
}
function yp(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!U.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = U.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + Mf + ":" + o + ";" : [["top", 0], ["left", 0], [l0, o]];
}
function WM(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = Q(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), D(["decoration", "align"], function(u) {
    var h = r.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function UM(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), h = r.getModel("textStyle"), f = By(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(VM(n, e)), a && i.push("background-color:" + a), D(["width", "color", "radius"], function(c) {
    var d = "border-" + c, g = hy(d), p = r.get(g);
    p != null && i.push(d + ":" + p + (c === "color" ? "" : "px"));
  }), i.push(WM(h)), f != null && i.push("padding:" + Es(f).join("px ") + "px"), i.join(";") + ";";
}
function mp(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && M_(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var YM = (
  /** @class */
  function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, U.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (z(a) ? document.querySelector(a) : aa(a) ? a : q(a) && a(t.getDom()));
      mp(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, h = n.painter.getViewportRoot();
          ne(h, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = FM(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = zM + UM(t, !this._firstShow, this._longHide) + yp(a[0], a[1], !0) + ("border-color:" + fi(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (z(a) && i.get("trigger") === "item" && !o0(i) && (s = GM(i, n, a)), z(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", $(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          aa(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if (mp(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = yp(i[0], i[1]);
          D(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      var t = this, e = this.el.style;
      e.visibility = "hidden", e.opacity = "0", U.transform3dSupported && (e.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(vt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  }()
), XM = (
  /** @class */
  function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), bp(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      G(t) && Ht(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new Yt({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: By(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), D(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), D(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
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
      var t = this.el, e = this.el.getBoundingRect(), i = _p(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        bp(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = cr(a.borderWidth || 0), s = _p(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(vt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  }()
);
function cr(r) {
  return Math.max(0, r);
}
function _p(r) {
  var t = cr(r.shadowBlur || 0), e = cr(r.shadowOffsetX || 0), i = cr(r.shadowOffsetY || 0);
  return {
    left: cr(t - e),
    right: cr(t + e),
    top: cr(t - i),
    bottom: cr(t + i)
  };
}
function bp(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var qM = new xt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), ZM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(U.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = J1(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new XM(i) : new YM(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(U.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? Fy(this, "_updatePosition", 50, "fixRate") : Uu(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      i0("itemTooltip", this._api, vt(function(n, a, o) {
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
      if (!(a.from === this.uid || U.node || !n.getDom())) {
        var o = wp(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = JM(a, i, n);
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
          var h = qM;
          h.x = a.x, h.y = a.y, h.update(), rt(h).tooltipConfig = {
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
          var f = n0(a, i), v = f.point[0], c = f.point[1];
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(wp(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), f = Ln([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
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
          var s = rt(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          $n(n, function(h) {
            if (rt(h).dataIndex != null)
              return l = h, !0;
            if (rt(h).tooltipConfig != null)
              return u = h, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = vt(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = Ln([i.tooltipOption], a), l = this._renderMode, u = [], h = da("section", {
        blocks: [],
        noHeader: !0
      }), f = [], v = new Nl();
      D(e, function(m) {
        D(m.dataByAxis, function(_) {
          var b = n.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!b || S == null)) {
            var w = e0(S, b.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = da("section", {
              header: w,
              noHeader: !Ie(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), D(_.seriesDataIndices, function(C) {
              var A = n.getSeriesByIndex(C.seriesIndex), M = C.dataIndexInside, T = A.getDataParams(M);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = wf(b.axis, {
                  value: S
                }), T.axisValueLabel = w, T.marker = v.makeTooltipMarker("item", fi(T.color), l);
                var P = Nv(A.formatTooltip(M, !0, null)), I = P.frag;
                if (I) {
                  var L = Ln([A], a).get("valueFormatter");
                  x.blocks.push(L ? O({
                    valueFormatter: L
                  }, I) : I);
                }
                P.text && f.push(P.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), f.reverse();
      var c = i.position, d = s.get("order"), g = Gv(h, v, l, d, n.get("useUTC"), s.get("textStyle"));
      g && f.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", y = f.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], c, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = rt(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, f = o.dataType, v = u.getData(f), c = this._renderMode, d = e.positionDefault, g = Ln([v.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var y = u.getDataParams(h, f), m = new Nl();
        y.marker = m.makeTooltipMarker("item", fi(y.color), c);
        var _ = Nv(u.formatTooltip(h, !1, f)), b = g.get("order"), S = g.get("valueFormatter"), w = _.frag, x = w ? Gv(S ? O({
          valueFormatter: S
        }, w) : w, m, c, b, a.get("useUTC"), g.get("textStyle")) : _.text, C = "item_" + u.name + "_" + h;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, x, y, C, e.offsetX, e.offsetY, e.position, e.target, m);
        }), n({
          type: "showTip",
          dataIndexInside: h,
          dataIndex: v.getRawIndex(h),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(e, i, n) {
      var a = this._renderMode === "html", o = rt(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (z(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = tt(l), l.content = $t(l.content));
      var f = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && f.push(v), f.push({
        formatter: l.content
      });
      var c = e.positionDefault, d = Ln(f, this._tooltipModel, c ? {
        position: c
      } : null), g = d.get("content"), p = Math.random() + "", y = new Nl();
      this._showOrMove(d, function() {
        var m = tt(d.get("formatterParams") || {});
        this._showTooltipContent(d, g, m, p, e.offsetX, e.offsetY, e.position, i, y);
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
        var c = i, d = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), g = d.color;
        if (v)
          if (z(v)) {
            var p = e.ecModel.get("useUTC"), y = $(n) ? n[0] : n, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            c = v, m && (c = As(y.axisValue, c, p)), c = fy(c, n, !0);
          } else if (q(v)) {
            var _ = vt(function(b, S) {
              b === this._ticket && (f.setContent(S, h, e, g, l), this._updatePosition(e, l, o, s, f, n, u));
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
      var f = o.getSize(), v = e.get("align"), c = e.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), q(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, h],
        contentSize: f.slice()
      })), $(i))
        n = Ot(i[0], u), a = Ot(i[1], h);
      else if (G(i)) {
        var g = i;
        g.width = f[0], g.height = f[1];
        var p = Qo(g, {
          width: u,
          height: h
        });
        n = p.x, a = p.y, v = null, c = null;
      } else if (z(i) && l) {
        var y = jM(i, d, f, e.get("borderWidth"));
        n = y[0], a = y[1];
      } else {
        var y = KM(n, a, o, u, h, v ? null : 20, c ? null : 20);
        n = y[0], a = y[1];
      }
      if (v && (n -= Sp(v) ? f[0] / 2 : v === "right" ? f[0] : 0), c && (a -= Sp(c) ? f[1] / 2 : c === "bottom" ? f[1] : 0), o0(e)) {
        var y = QM(n, a, o, u, h);
        n = y[0], a = y[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && D(n, function(s, l) {
        var u = s.dataByAxis || [], h = e[l] || {}, f = h.dataByAxis || [];
        o = o && u.length === f.length, o && D(u, function(v, c) {
          var d = f[c] || {}, g = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && g.length === p.length, o && D(g, function(y, m) {
            var _ = p[m];
            o = o && y.seriesIndex === _.seriesIndex && y.dataIndex === _.dataIndex;
          }), a && D(v.seriesDataIndices, function(y) {
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
      U.node || !i.getDom() || (Uu(this, "_updatePosition"), this._tooltipContent.dispose(), uh("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(Oe)
);
function Ln(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new yt(e, i, i), n = new yt(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof yt && (o = o.get("tooltip", !0)), z(o) && (o = {
      formatter: o
    }), o && (n = new yt(o, n, i)));
  }
  return n;
}
function wp(r, t) {
  return r.dispatchAction || vt(t.dispatchAction, t);
}
function KM(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function QM(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function jM(r, t, e, i) {
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
function Sp(r) {
  return r === "center" || r === "middle";
}
function JM(r, t, e) {
  var i = Bh(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = Ta(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var h = rt(u).tooltipConfig;
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
function t2(r) {
  Sr(a0), r.registerComponentModel(BM), r.registerComponentView(ZM), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Vt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Vt);
}
var e2 = function(r, t) {
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
}, hh = (
  /** @class */
  function(r) {
    B(t, r);
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
      i === !0 && (i = e.selector = ["all", "inverse"]), $(i) && D(i, function(a, o) {
        z(a) && (a = {
          type: a
        }), i[o] = it(a, e2(n, a.type));
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
        h && Oh(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = K(), s = W(a, function(l) {
        return (z(l) || ft(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new yt(l, this, this.ecModel));
      }, this);
      this._data = Dt(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(e) {
      var i = this.option.selected, n = this.get("selectedMode");
      if (n === "single") {
        var a = this._data;
        D(a, function(o) {
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
      D(e, function(n) {
        i[n.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var e = this._data, i = this.option.selected;
      D(e, function(n) {
        var a = n.get("name", !0);
        i.hasOwnProperty(a) || (i[a] = !0), i[a] = !i[a];
      });
    }, t.prototype.isSelected = function(e) {
      var i = this.option.selected;
      return !(i.hasOwnProperty(e) && !i[e]) && ut(this._availableNames, e) >= 0;
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
  }(lt)
), Li = St, fh = D, fo = Mt, h0 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !1, e;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new fo()), this.group.add(this._selectorGroup = new fo()), this._isFirstRender = !0;
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
        }, v = e.get("padding"), c = Qo(h, f, v), d = this.layoutInner(e, o, c, a, l, u), g = Qo(at({
          width: d.width,
          height: d.height
        }, h), f, v);
        this.group.x = g.x - d.x, this.group.y = g.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = OM(d, e));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this.getContentGroup(), h = K(), f = i.get("selectedMode"), v = [];
      n.eachRawSeries(function(c) {
        !c.get("legendHoverLink") && v.push(c.id);
      }), fh(i.getData(), function(c, d) {
        var g = c.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var p = new fo();
          p.newline = !0, u.add(p);
          return;
        }
        var y = n.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), S = m.getVisual("style"), w = this._createItem(y, g, d, c, i, e, _, S, b, f, a);
            w.on("click", Li(xp, g, null, a, v)).on("mouseover", Li(ch, y.name, null, a, v)).on("mouseout", Li(vh, y.name, null, a, v)), n.ssr && w.eachChild(function(x) {
              var C = rt(x);
              C.seriesIndex = y.seriesIndex, C.dataIndex = d, C.ssrType = "legend";
            }), h.set(g, !0);
          } else
            n.eachRawSeries(function(x) {
              if (!h.get(g) && x.legendVisualProvider) {
                var C = x.legendVisualProvider;
                if (!C.containName(g))
                  return;
                var A = C.indexOfName(g), M = C.getItemVisual(A, "style"), T = C.getItemVisual(A, "legendIcon"), P = Xe(M.fill);
                P && P[3] === 0 && (P[3] = 0.2, M = O(O({}, M), {
                  fill: hs(P, "rgba")
                }));
                var I = this._createItem(x, g, d, c, i, e, {}, M, T, f, a);
                I.on("click", Li(xp, null, g, a, v)).on("mouseover", Li(ch, null, g, a, v)).on("mouseout", Li(vh, null, g, a, v)), n.ssr && I.eachChild(function(L) {
                  var E = rt(L);
                  E.seriesIndex = x.seriesIndex, E.dataIndex = d, E.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(e, i, n, a, o) {
      var s = this.getSelectorGroup();
      fh(e, function(u) {
        var h = u.type, f = new Yt({
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
        xs(f, {
          normal: v,
          emphasis: c
        }, {
          defaultText: u.title
        }), Eu(f);
      });
    }, t.prototype._createItem = function(e, i, n, a, o, s, l, u, h, f, v) {
      var c = e.visualDrawType, d = o.get("itemWidth"), g = o.get("itemHeight"), p = o.isSelected(i), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = r2(h, a, l, u, c, p, v), S = new fo(), w = a.getModel("textStyle");
      if (q(e.getLegendIcon) && (!_ || _ === "inherit"))
        S.add(e.getLegendIcon({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: y,
          itemStyle: b.itemStyle,
          lineStyle: b.lineStyle,
          symbolKeepAspect: m
        }));
      else {
        var x = _ === "inherit" && e.getData().getVisual("symbol") ? y === "inherit" ? e.getData().getVisual("symbolRotate") : y : 0;
        S.add(i2({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var C = s === "left" ? d + 5 : -5, A = s, M = o.get("formatter"), T = i;
      z(M) && M ? T = M.replace("{name}", i ?? "") : q(M) && (T = M(i));
      var P = p ? w.getTextColor() : a.get("inactiveColor");
      S.add(new Yt({
        style: Zi(w, {
          text: T,
          x: C,
          y: g / 2,
          fill: P,
          align: A,
          verticalAlign: "middle"
        }, {
          inheritColor: P
        })
      }));
      var I = new xt({
        shape: S.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), L = a.getModel("tooltip");
      return L.get("show") && bs({
        el: I,
        componentModel: o,
        itemName: i,
        itemTooltipOption: L.option
      }), S.add(I), S.eachChild(function(E) {
        E.silent = !0;
      }), I.silent = !f, this.getContentGroup().add(S), Eu(S), S.__legendDataIndex = n, S;
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      Qn(e.get("orient"), l, e.get("itemGap"), n.width, n.height);
      var h = l.getBoundingRect(), f = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        Qn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          e.get("selectorItemGap", !0)
        );
        var v = u.getBoundingRect(), c = [-v.x, -v.y], d = e.get("selectorButtonGap", !0), g = e.getOrient().index, p = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
        s === "end" ? c[g] += h[p] + d : f[g] += v[p] + d, c[1 - g] += h[y] / 2 - v[y] / 2, u.x = c[0], u.y = c[1], l.x = f[0], l.y = f[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[p] = h[p] + d + v[p], _[y] = Math.max(h[y], v[y]), _[m] = Math.min(0, v[m] + c[1 - g]), _;
      } else
        return l.x = f[0], l.y = f[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(Oe)
);
function r2(r, t, e, i, n, a, o) {
  function s(p, y) {
    p.lineWidth === "auto" && (p.lineWidth = y.lineWidth > 0 ? 2 : 0), fh(p, function(m, _) {
      p[_] === "inherit" && (p[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = r.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", f = l.getShallow("decal");
  u.decal = !f || f === "inherit" ? i.decal : Ku(f, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[h]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : e).opacity), s(u, i);
  var v = t.getModel("lineStyle"), c = v.getLineStyle();
  if (s(c, e), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), c.stroke === "auto" && (c.stroke = i.fill), !a) {
    var d = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = d === "auto" ? i.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), c.stroke = v.get("inactiveColor"), c.lineWidth = v.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: c
  };
}
function i2(r) {
  var t = r.icon || "roundRect", e = ji(t, 0, 0, r.itemWidth, r.itemHeight, r.itemStyle.fill, r.symbolKeepAspect);
  return e.setStyle(r.itemStyle), e.rotation = (r.iconRotate || 0) * Math.PI / 180, e.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), t.indexOf("empty") > -1 && (e.style.stroke = e.style.fill, e.style.fill = "#fff", e.style.lineWidth = 2), e;
}
function xp(r, t, e, i) {
  vh(r, t, e, i), e.dispatchAction({
    type: "legendToggleSelect",
    name: r ?? t
  }), ch(r, t, e, i);
}
function f0(r) {
  for (var t = r.getZr().storage.getDisplayList(), e, i = 0, n = t.length; i < n && !(e = t[i].states.emphasis); )
    i++;
  return e && e.hoverLayer;
}
function ch(r, t, e, i) {
  f0(e) || e.dispatchAction({
    type: "highlight",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function vh(r, t, e, i) {
  f0(e) || e.dispatchAction({
    type: "downplay",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function n2(r) {
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
function En(r, t, e) {
  var i = r === "allSelect" || r === "inverseSelect", n = {}, a = [];
  e.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[r]() : s[r](t.name), Tp(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return e.eachComponent("legend", function(s) {
    D(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), Tp(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function Tp(r, t) {
  var e = t || {};
  return D(r.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = r.isSelected(n);
      li(e, n) ? e[n] = e[n] && a : e[n] = a;
    }
  }), e;
}
function a2(r) {
  r.registerAction("legendToggleSelect", "legendselectchanged", St(En, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", St(En, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", St(En, "inverseSelect")), r.registerAction("legendSelect", "legendselected", St(En, "select")), r.registerAction("legendUnSelect", "legendunselected", St(En, "unSelect"));
}
function c0(r) {
  r.registerComponentModel(hh), r.registerComponentView(h0), r.registerProcessor(r.PRIORITY.PROCESSOR.SERIES_FILTER, n2), r.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), a2(r);
}
var o2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.setScrollDataIndex = function(e) {
      this.option.scrollDataIndex = e;
    }, t.prototype.init = function(e, i, n) {
      var a = Rs(e);
      r.prototype.init.call(this, e, i, n), Cp(this, e, a);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), Cp(this, this.option, e);
    }, t.type = "legend.scroll", t.defaultOption = jg(hh.defaultOption, {
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
  }(hh)
);
function Cp(r, t, e) {
  var i = r.getOrient(), n = [1, 1];
  n[i.index] = 0, Ki(t, e, {
    type: "box",
    ignoreSize: !!n
  });
}
var Dp = Mt, au = ["width", "height"], ou = ["x", "y"], s2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !0, e._currentIndex = 0, e;
    }
    return t.prototype.init = function() {
      r.prototype.init.call(this), this.group.add(this._containerGroup = new Dp()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Dp());
    }, t.prototype.resetInner = function() {
      r.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this;
      r.prototype.renderInner.call(this, e, i, n, a, o, s, l);
      var h = this._controllerGroup, f = i.get("pageIconSize", !0), v = $(f) ? f : [f, f];
      d("pagePrev", 0);
      var c = i.getModel("pageTextStyle");
      h.add(new Yt({
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
      })), d("pageNext", 1);
      function d(g, p) {
        var y = g + "DataIndex", m = Kh(i.get("pageIcons", !0)[i.getOrient().name][p], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: vt(u._pageGo, u, y, i, a)
        }, {
          x: -v[0] / 2,
          y: -v[1] / 2,
          width: v[0],
          height: v[1]
        });
        m.name = g, h.add(m);
      }
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = e.getOrient().index, h = au[u], f = ou[u], v = au[1 - u], c = ou[1 - u];
      o && Qn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        e.get("selectorItemGap", !0)
      );
      var d = e.get("selectorButtonGap", !0), g = l.getBoundingRect(), p = [-g.x, -g.y], y = tt(n);
      o && (y[h] = n[h] - g[h] - d);
      var m = this._layoutContentAndController(e, a, y, u, h, v, c, f);
      if (o) {
        if (s === "end")
          p[u] += m[h] + d;
        else {
          var _ = g[h] + d;
          p[u] -= _, m[f] -= _;
        }
        m[h] += g[h] + d, p[1 - u] += m[c] + m[v] / 2 - g[v] / 2, m[v] = Math.max(m[v], g[v]), m[c] = Math.min(m[c], g[c] + p[1 - u]), l.x = p[0], l.y = p[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(e, i, n, a, o, s, l, u) {
      var h = this.getContentGroup(), f = this._containerGroup, v = this._controllerGroup;
      Qn(e.get("orient"), h, e.get("itemGap"), a ? n.width : null, a ? null : n.height), Qn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        v,
        e.get("pageButtonItemGap", !0)
      );
      var c = h.getBoundingRect(), d = v.getBoundingRect(), g = this._showController = c[o] > n[o], p = [-c.x, -c.y];
      i || (p[a] = h[u]);
      var y = [0, 0], m = [-d.x, -d.y], _ = Q(e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (g) {
        var b = e.get("pageButtonPosition", !0);
        b === "end" ? m[a] += n[o] - d[o] : y[a] += d[o] + _;
      }
      m[1 - a] += c[s] / 2 - d[s] / 2, h.setPosition(p), f.setPosition(y), v.setPosition(m);
      var S = {
        x: 0,
        y: 0
      };
      if (S[o] = g ? n[o] : c[o], S[s] = Math.max(c[s], d[s]), S[l] = Math.min(0, d[l] + m[1 - a]), f.__rectSize = n[o], g) {
        var w = {
          x: 0,
          y: 0
        };
        w[o] = Math.max(n[o] - d[o] - _, 0), w[s] = S[s], f.setClipPath(new xt({
          shape: w
        })), f.__rectSize = w[o];
      } else
        v.eachChild(function(C) {
          C.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(e);
      return x.pageIndex != null && te(
        h,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        g ? e : null
      ), this._updatePageInfoView(e, x), S;
    }, t.prototype._pageGo = function(e, i, n) {
      var a = this._getPageInfo(i)[e];
      a != null && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: i.id
      });
    }, t.prototype._updatePageInfoView = function(e, i) {
      var n = this._controllerGroup;
      D(["pagePrev", "pageNext"], function(h) {
        var f = h + "DataIndex", v = i[f] != null, c = n.childOfName(h);
        c && (c.setStyle("fill", v ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), c.cursor = v ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = e.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", z(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(e) {
      var i = e.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = e.getOrient().index, s = au[o], l = ou[o], u = this._findTargetItemIndex(i), h = n.children(), f = h[u], v = h.length, c = v ? 1 : 0, d = {
        contentPosition: [n.x, n.y],
        pageCount: c,
        pageIndex: c - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!f)
        return d;
      var g = b(f);
      d.contentPosition[o] = -g.s;
      for (var p = u + 1, y = g, m = g, _ = null; p <= v; ++p)
        _ = b(h[p]), // Half of the last item is out of the window.
        (!_ && m.e > y.s + a || _ && !S(_, y.s)) && (m.i > y.i ? y = m : y = _, y && (d.pageNextDataIndex == null && (d.pageNextDataIndex = y.i), ++d.pageCount)), m = _;
      for (var p = u - 1, y = g, m = g, _ = null; p >= -1; --p)
        _ = b(h[p]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !S(m, _.s)) && y.i < m.i && (m = y, d.pagePrevDataIndex == null && (d.pagePrevDataIndex = y.i), ++d.pageCount, ++d.pageIndex), y = _;
      return d;
      function b(w) {
        if (w) {
          var x = w.getBoundingRect(), C = x[l] + w[l];
          return {
            s: C,
            e: C + x[s],
            i: w.__legendDataIndex
          };
        }
      }
      function S(w, x) {
        return w.e >= x && w.s <= x + a;
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
  }(h0)
);
function l2(r) {
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
function u2(r) {
  Sr(c0), r.registerComponentModel(o2), r.registerComponentView(s2), l2(r);
}
function h2(r) {
  Sr(c0), Sr(u2);
}
function Ap(r, t, e) {
  var i = nn.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var su = function(r) {
  B(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Fo, typeof e == "string" ? o = Ap(e, i, n) : G(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (Wp(o), o.onselectstart = function() {
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
    this.domBack = Ap("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new nt(0, 0, 0, 0);
    function h(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new nt(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var b = !1, S = 1 / 0, w = 0, x = 0; x < o.length; ++x) {
            var C = o[x];
            if (C.intersect(m)) {
              var A = new nt(0, 0, 0, 0);
              A.copy(C), A.union(m), o[x] = A, b = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(C);
              var M = m.width * m.height, T = C.width * C.height, P = u.width * u.height, I = P - M - T;
              I < S && (S = I, w = x);
            }
          }
          if (l && (o[w].union(m), b = !0), !b) {
            var _ = new nt(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var f = this.__startIndex; f < this.__endIndex; ++f) {
      var v = e[f];
      if (v) {
        var c = v.shouldBePainted(n, a, !0, !0), d = v.__isRendered && (v.__dirty & Kt || !c) ? v.getPrevPaintRect() : null;
        d && h(d);
        var g = c && (v.__dirty & Kt || !v.__isRendered) ? v.getPaintRect() : null;
        g && h(g);
      }
    }
    for (var f = this.__prevStartIndex; f < this.__prevEndIndex; ++f) {
      var v = i[f], c = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!c || !v.__zr) && v.__isRendered) {
        var d = v.getPrevPaintRect();
        d && h(d);
      }
    }
    var p;
    do {
      p = !1;
      for (var f = 0; f < o.length; ) {
        if (o[f].isZero()) {
          o.splice(f, 1);
          continue;
        }
        for (var y = f + 1; y < o.length; )
          o[f].intersect(o[y]) ? (p = !0, o[f].union(o[y]), o.splice(y, 1)) : y++;
        f++;
      }
    } while (p);
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
    function d(g, p, y, m) {
      if (o.clearRect(g, p, y, m), i && i !== "transparent") {
        var _ = void 0;
        if (ls(i)) {
          var b = i.global || i.__width === y && i.__height === m;
          _ = b && i.__canvasGradient || qu(o, i, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), i.__canvasGradient = _, i.__width = y, i.__height = m;
        } else v_(i) && (i.scaleX = i.scaleX || f, i.scaleY = i.scaleY || f, _ = Zu(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(g, p, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(c, g, p, y, m), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && D(n, function(g) {
      d(g.x * f, g.y * f, g.width * f, g.height * f);
    });
  }, t;
}(Fe), Mp = 1e5, Kr = 314159, co = 0.01, f2 = 1e-3;
function c2(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function v2(r, t) {
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
var d2 = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = O({}, i || {}), this.dpr = i.devicePixelRatio || Fo, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Wp(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, f = h.width, v = h.height;
      i.width != null && (f = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, h.width = f * this.dpr, h.height = v * this.dpr, this._width = f, this._height = v;
      var c = new su(h, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), l[Kr] = c, c.zlevel = Kr, s.push(Kr), this._domRoot = t;
    } else {
      this._width = to(t, 0, i), this._height = to(t, 1, i);
      var u = this._domRoot = v2(this._width, this._height);
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
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Mp)), a || (a = i.ctx, a.save()), ri(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Mp);
  }, r.prototype.paintOne = function(t, e) {
    Ky(t, e);
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
        Eo(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(Kr).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var h = !0, f = !1, v = function(g) {
      var p = a[g], y = p.ctx, m = o && p.createRepaintRects(t, e, c._width, c._height), _ = i ? p.__startIndex : p.__drawIndex, b = !i && p.incremental && Date.now, S = b && Date.now(), w = p.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, w, m);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && p.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var C, A = function(I) {
        var L = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (C = _; C < p.__endIndex; C++) {
          var E = t[C];
          if (E.__inHover && (f = !0), n._doPaintEl(E, p, o, I, L, C === p.__endIndex - 1), b) {
            var R = Date.now() - S;
            if (R > 15)
              break;
          }
        }
        L.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          C = p.__endIndex;
        else
          for (var M = c.dpr, T = 0; T < m.length; ++T) {
            var P = m[T];
            y.save(), y.beginPath(), y.rect(P.x * M, P.y * M, P.width * M, P.height * M), y.clip(), A(P), y.restore();
          }
      else
        y.save(), A(), y.restore();
      p.__drawIndex = C, p.__drawIndex < p.__endIndex && (h = !1);
    }, c = this, d = 0; d < a.length; d++)
      v(d);
    return U.wxa && D(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: f
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (ri(s, t, a, o), t.setPrevPaintRect(l));
    } else
      ri(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Kr);
    var i = this._layers[t];
    return i || (i = new su("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? it(i, this._layerConfig[t], !0) : this._layerConfig[t - co] && it(i, this._layerConfig[t - co], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && c2(e)) {
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
      s !== u && (s = u, o = 0), n.incremental ? (h = this.getLayer(u + f2, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? co : 0), this._needsManuallyCompositing), h.__builtin__ || Th("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), a = h), n.__dirty & Kt && !n.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(f, v) {
      !f.__used && f.getElementCount() > 0 && (f.__dirty = !0, f.__startIndex = f.__endIndex = f.__drawIndex = 0), f.__dirty && f.__drawIndex < 0 && (f.__drawIndex = f.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, D(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? it(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + co) {
          var o = this._layers[a];
          it(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(ut(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = to(a, 0, n), e = to(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(Kr).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Kr].dom;
    var e = new su("image", this, t.pixelRatio || this.dpr);
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
        ri(i, h, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function p2(r) {
  r.registerPainter("canvas", d2);
}
const g2 = [
  LA,
  pA,
  kM,
  h2,
  t2,
  p2
];
var y2 = Object.defineProperty, m2 = Object.getOwnPropertyDescriptor, Pf = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? m2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && y2(t, e, n), n;
};
Sr(g2);
let _a = class extends we {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".canvas");
    this.chart = _C(r, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(r), this.applyOption();
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
    return F`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
_a.styles = xr`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
Pf([
  bt({ attribute: !1 })
], _a.prototype, "option", 2);
Pf([
  bt({ type: String })
], _a.prototype, "height", 2);
_a = Pf([
  ci("ia-chart")
], _a);
const If = xr`
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
var _2 = Object.defineProperty, b2 = Object.getOwnPropertyDescriptor, zs = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? b2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && _2(t, e, n), n;
};
let tn = class extends we {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en";
  }
  render() {
    const r = this.flow;
    return F`
      <section>
        <h2>Charging and discharging</h2>

        ${r.sign_looks_inverted ? F`<p class="warn">
              The charge rises while this battery reports discharging. The power sensor's
              direction is probably reversed — tick "Invert battery power" in the integration's
              options. Until then charging and discharging are swapped everywhere on this page.
            </p>` : X}

        <div class="cards">
          <div class="card">
            <span class="name">Mean charge power</span>
            <span class="value">${_t(r.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span><span>${gt(r.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Mean discharge power</span>
            <span class="value">${_t(r.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span>
              <span>${gt(r.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Resting</span>
            <span class="value">${gt(r.share_idle, this.locale)}</span>
            <span class="row">
              <span>Below</span><span>${_t(r.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Energy in / out</span>
            <span class="value">${Wf(r.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>Charged</span><span>${Wf(r.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Full cycles per day</span>
            <span class="value">
              ${r.cycles_per_day === null ? "—" : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      r.cycles_per_day
    )}
            </span>
            ${r.cycles_per_day === null ? F`<span class="row"><span>Needs the battery capacity</span></span>` : X}
          </div>
        </div>

        ${r.cycles_per_day === null && !this.hasCapacity ? F`<p class="note">
              Set the battery capacity in the integration's options and this becomes the energy
              discharged each day divided by one full charge. It is not guessed from the state of
              charge, which would count a shallow cycle the same as a deep one.
            </p>` : X}

        <p class="note">
          Energy is integrated from the power readings rather than read off a meter, so a period
          with gaps understates it — compare it against the coverage above.
        </p>
      </section>
    `;
  }
};
tn.styles = [If, xr`:host { display: block; }`];
zs([
  bt({ attribute: !1 })
], tn.prototype, "flow", 2);
zs([
  bt({ type: Boolean })
], tn.prototype, "hasCapacity", 2);
zs([
  bt({ type: String })
], tn.prototype, "locale", 2);
tn = zs([
  ci("ia-charge-section")
], tn);
var w2 = Object.defineProperty, S2 = Object.getOwnPropertyDescriptor, pi = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? S2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && w2(t, e, n), n;
};
let je = class extends we {
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
      const { start: t, end: e } = Np(this.range, /* @__PURE__ */ new Date()), i = await $0(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = bh(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = r.dips_measurable, i = "—", n = [
      ["Mean charge", gt(Qr(r.kpi.mean_soc), t), "over the whole period"],
      [
        "Lowest charge",
        e ? gt(Qr(r.kpi.min_soc), t) : i,
        e ? "exact data only" : "needs exact data"
      ],
      [
        `Below ${gt(Qr(r.low_pct), t)}`,
        e ? $i(r.kpi.seconds_below_low) : i,
        e ? "exact data only" : "needs exact data"
      ],
      [
        "Dips",
        e ? String(r.kpi.dip_count) : i,
        e ? "lasting over a minute" : "needs exact data"
      ],
      [
        "Mean low point",
        e ? gt(Qr(r.kpi.mean_low_point), t) : i,
        e ? "across those dips" : "needs exact data"
      ]
    ];
    return F`<div class="kpi">
      ${n.map(
      ([a, o, s]) => F`<div class="cell">
          <span class="label">${a}</span>
          <span class="value">${o}</span>
          <span class="hint">${s}</span>
        </div>`
    )}
    </div>`;
  }
  renderEpisodes(r) {
    const t = this.hass.locale.language;
    return r.dips_measurable ? r.episodes.length ? F`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Lowest</th><th>Recovered to</th></tr>
      </thead>
      <tbody>
        ${r.episodes.map(
      (e) => F`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${$i(e.seconds)}</td>
            <td>${gt(Qr(e.lowest), t)}</td>
            <td>${gt(Qr(e.recovered_to), t)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : F`<p class="empty">
        The charge never stayed below ${gt(Qr(r.low_pct), t)} for more than
        a minute in this period.
      </p>` : F`<p class="empty">
        This period is covered only by hourly averages, which record the mean charge across each
        hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips
        cannot be counted at all — an empty table would read as "none happened". Pick a shorter
        period to see them.
      </p>`;
  }
  render() {
    if (this.error)
      return F`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return F`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language, e = lu(r.coverage, t);
    return F`
      <div class="status">
        <span class="badge">${Op(r.precision, r.boundary, t)}</span>
        ${e ? F`<span class="warn">${e}</span>` : X}
        ${r.clamped ? F`<span class="warn">Period shortened to the maximum allowed</span>` : X}
        ${r.raw_from && r.dips_measurable ? F`<span class="warn">
              Dips counted from ${new Date(r.raw_from).toLocaleDateString(t)}, where
              exact data begins
            </span>` : X}
        ${this.loading ? F`<span class="warn">Refreshing…</span>` : X}
      </div>

      ${this.renderKpi(r)}

      <section>
        <h2>Time spent at each state of charge</h2>
        <ia-chart .option=${K0(r)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across charge bands</h2>
        <ia-chart .option=${Q0(r.bands)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Low-charge episodes</h2>
        ${this.renderEpisodes(r)}
      </section>

      ${r.power ? F`<ia-charge-section
            .flow=${r.power}
            .hasCapacity=${r.has_capacity}
            .locale=${t}
          ></ia-charge-section>` : F`<section>
            <h2>Charging and discharging</h2>
            <p class="empty">
              Map a battery power sensor in the integration's options to see how much moves in and
              out, and how much of the time the battery is working.
            </p>
          </section>`}
    `;
  }
};
je.styles = xr`
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
pi([
  bt({ attribute: !1 })
], je.prototype, "hass", 2);
pi([
  bt({ type: String })
], je.prototype, "entryId", 2);
pi([
  bt({ type: String })
], je.prototype, "range", 2);
pi([
  ce()
], je.prototype, "payload", 2);
pi([
  ce()
], je.prototype, "error", 2);
pi([
  ce()
], je.prototype, "loading", 2);
je = pi([
  ci("ia-battery-tab")
], je);
function Qr(r) {
  return r === null ? null : r / 100;
}
var x2 = Object.defineProperty, T2 = Object.getOwnPropertyDescriptor, Hs = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? T2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && x2(t, e, n), n;
};
let en = class extends we {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  renderCards() {
    const { rating_per_phase: r } = this.phases;
    return F`<div class="cards">
      ${this.phases.per_phase.map((t) => {
      const e = this.series[t.key]?.coverage;
      return F`<div class="card">
          <span class="name">${t.label}</span>
          <span class="value">${_t(t.mean, this.locale)}</span>
          <span class="row"><span>Peak</span><span>${_t(t.peak, this.locale)}</span></span>
          <span class="row"><span>P95</span><span>${_t(t.p95, this.locale)}</span></span>
          <span class="row"><span>Share of load</span><span>${gt(t.share, this.locale)}</span></span>
          <span class="row">
            <span>Peak vs ${_t(r, this.locale)}</span>
            <span>${gt(t.headroom, this.locale)}</span>
          </span>
          ${e !== void 0 && e < 0.95 ? F`<span class="warn">Covers ${Hn(e, this.locale)} of the period</span>` : X}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const { imbalance: r } = this.phases;
    return r.mean === null ? F`<p class="empty">
        Total load never rose above ${_t(r.floor_w, this.locale)}, so there was
        nothing to measure the spread against in this period.
      </p>` : F`
      <div class="cards">
        <div class="card">
          <span class="name">Mean imbalance</span>
          <span class="value">${gt(r.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">P95 imbalance</span>
          <span class="value">${gt(r.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">Above ${gt(r.threshold, this.locale)}</span>
          <span class="value">${gt(r.fraction_above, this.locale)}</span>
          <span class="row"><span>of the measured time</span></span>
        </div>
      </div>
      <ia-chart .option=${q0(r)}></ia-chart>
      <p class="note">
        Measured over ${$i(r.analysed_seconds)}
        (${Hn(r.coverage, this.locale)} of the period).${r.below_floor_seconds > 0 ? F` A further ${$i(r.below_floor_seconds)} sat below
              ${_t(r.floor_w, this.locale)} of total load and is excluded: at
              standby power a few watts of difference is a large percentage and means nothing.` : X}
      </p>
    `;
  }
  renderEpisodes() {
    const { episodes: r, per_phase: t } = this.phases;
    return r.length ? F`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          <th>Worst</th>
          ${t.map((e) => F`<th>${e.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${r.map(
      (e) => F`<tr>
            <td>${new Date(e.start).toLocaleString(this.locale)}</td>
            <td>${$i(e.seconds)}</td>
            <td>${gt(e.peak_imbalance, this.locale)}</td>
            ${e.phases.map((i) => F`<td>${_t(i, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : F`<p class="empty">No sustained imbalance in this period.</p>`;
  }
  render() {
    const { imbalance: r, rating_per_phase: t, rating_per_phase_derived: e, rating_per_phase_divisor: i } = this.phases;
    return F`
      <section>
        <h2>Phases</h2>
        ${this.renderCards()}
        ${e ? F`<p class="note">
              No per-phase rating is configured, so the total is split across
              ${i} phases — ${_t(t, this.locale)}
              each. Set the real figure in the integration's options if the hardware differs.
            </p>` : X}
        ${r.aligned_coverage < 0.95 ? F`<p class="warn">
              All phases had data at the same moment for only
              ${Hn(r.aligned_coverage, this.locale)} of the period. The spread
              cannot be measured while any one phase is unknown.
            </p>` : X}

        <h3>Imbalance</h3>
        ${this.renderImbalance()}

        <h3>Sustained imbalance episodes</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
en.styles = [If, xr`:host { display: block; }`];
Hs([
  bt({ attribute: !1 })
], en.prototype, "phases", 2);
Hs([
  bt({ attribute: !1 })
], en.prototype, "series", 2);
Hs([
  bt({ type: String })
], en.prototype, "locale", 2);
en = Hs([
  ci("ia-phases-section")
], en);
var C2 = Object.defineProperty, D2 = Object.getOwnPropertyDescriptor, Gs = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? D2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && C2(t, e, n), n;
};
let rn = class extends we {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  render() {
    const { parts: r, aligned_coverage: t } = this.strings;
    return F`
      <section>
        <h2>PV strings</h2>
        <div class="cards">
          ${r.map((e) => {
      const i = this.series[e.key]?.coverage;
      return F`<div class="card">
              <span class="name">${e.label}</span>
              <span class="value">${_t(e.mean, this.locale)}</span>
              <span class="row"><span>Peak</span><span>${_t(e.peak, this.locale)}</span></span>
              <span class="row"><span>Share of PV</span><span>${gt(e.share, this.locale)}</span></span>
              ${i !== void 0 && i < 0.95 ? F`<span class="warn">Covers ${Hn(i, this.locale)} of the period</span>` : X}
            </div>`;
    })}
        </div>
        <ia-chart .option=${Z0(r, Jt.pv)}></ia-chart>
        ${t < 0.95 ? F`<p class="warn">
              All strings had data at the same moment for only
              ${Hn(t, this.locale)} of the period, so the shares are of
              that time rather than the whole window.
            </p>` : X}
        <p class="note">
          A string consistently below its neighbour points at shading, a different orientation or
          a fault. Compare mean rather than peak: peaks coincide, averages do not.
        </p>
      </section>
    `;
  }
};
rn.styles = [If, xr`:host { display: block; }`];
Gs([
  bt({ attribute: !1 })
], rn.prototype, "strings", 2);
Gs([
  bt({ attribute: !1 })
], rn.prototype, "series", 2);
Gs([
  bt({ type: String })
], rn.prototype, "locale", 2);
rn = Gs([
  ci("ia-strings-section")
], rn);
var A2 = Object.defineProperty, M2 = Object.getOwnPropertyDescriptor, Cr = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? M2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && A2(t, e, n), n;
};
let Be = class extends we {
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
      const { start: t, end: e } = Np(this.range, /* @__PURE__ */ new Date()), i = await F0(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = bh(t);
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
    if (!r?.beyond_margin) return X;
    const i = this.hass.locale.language;
    return F`<span class="warn">
      ${t} averages ${_t(r.total_mean, i)} while ${e} add up to
      ${_t(r.parts_mean, i)}. Is one of them mapped to the wrong sensor?
    </span>`;
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = (n) => n === null ? "" : gt(n / r.rated_power, t) + " of rated", i = [
      ["Mean", _t(r.kpi.mean, t), e(r.kpi.mean)],
      ["Median", _t(r.kpi.median, t), ""],
      ["P95", _t(r.kpi.p95, t), ""],
      ["Peak", _t(r.kpi.max, t), e(r.kpi.max)],
      ["Sustained 15 min", _t(r.kpi.max_sustained_15m, t), ""],
      [">80% of rated", gt(r.kpi.fraction_above_80pct, t), "of time"]
    ];
    return F`<div class="kpi">
      ${i.map(
      ([n, a, o]) => F`<div class="cell">
          <span class="label">${n}</span>
          <span class="value">${a}</span>
          <span class="hint">${o}</span>
        </div>`
    )}
    </div>`;
  }
  renderOverloads(r) {
    if (!r.overloads.length)
      return F`<p class="empty">No overloads in this period.</p>`;
    const t = this.hass.locale.language;
    return F`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Peak</th></tr>
      </thead>
      <tbody>
        ${r.overloads.map(
      (e) => F`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${$i(e.seconds)}</td>
            <td>${_t(e.peak, t)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    if (this.error)
      return F`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return F`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language;
    return F`
      <div class="status">
        <span class="badge">${Op(r.precision, r.boundary, t)}</span>
        ${lu(r.coverage, t) ? F`<span class="warn">${lu(r.coverage, t)}</span>` : X}
        ${r.clamped ? F`<span class="warn">Period shortened to the maximum allowed</span>` : X}
        ${r.histogram.clipped_low_seconds + r.histogram.clipped_high_seconds > 0 ? F`<span class="warn">
              Some values fell outside the histogram range and are shown in its edge buckets
            </span>` : X}
        ${this.renderConsistency(r.consistency.load, "Total load", "the phases")}
        ${this.renderConsistency(r.consistency.pv, "Total PV power", "the strings")}
        ${this.loading ? F`<span class="warn">Refreshing…</span>` : X}
      </div>

      ${this.renderKpi(r)}

      <section>
        <header>
          <h2>Time spent at each power level</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? "as % of rated" : "in watts"}</button>
        </header>
        <ia-chart .option=${U0(r, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Load duration curve</h2>
        <ia-chart .option=${Y0(r)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across rated-power bands</h2>
        <ia-chart .option=${X0(r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Overload episodes</h2>
        ${this.renderOverloads(r)}
      </section>

      ${r.phases ? F`<ia-phases-section
            .phases=${r.phases}
            .series=${r.series}
            .locale=${t}
          ></ia-phases-section>` : X}

      ${r.strings ? F`<ia-strings-section
            .strings=${r.strings}
            .series=${r.series}
            .locale=${t}
          ></ia-strings-section>` : X}
    `;
  }
};
Be.styles = xr`
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
Cr([
  bt({ attribute: !1 })
], Be.prototype, "hass", 2);
Cr([
  bt({ type: String })
], Be.prototype, "entryId", 2);
Cr([
  bt({ type: String })
], Be.prototype, "range", 2);
Cr([
  ce()
], Be.prototype, "payload", 2);
Cr([
  ce()
], Be.prototype, "error", 2);
Cr([
  ce()
], Be.prototype, "loading", 2);
Cr([
  ce()
], Be.prototype, "mode", 2);
Be = Cr([
  ci("ia-load-tab")
], Be);
var P2 = Object.defineProperty, I2 = Object.getOwnPropertyDescriptor, er = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? I2(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && P2(t, e, n), n;
};
const L2 = "/inverter-analytics", Pp = [
  { id: "load", label: "Load" },
  { id: "battery", label: "Battery" },
  { id: "seasonal", label: "Seasonality" },
  { id: "balance", label: "Balance" }
];
let xe = class extends we {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.readLocation = () => {
      const r = V0(
        window.location.pathname,
        window.location.search,
        Pp.map((t) => t.id),
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = r.tab, this.range = r.range, this.entryId = r.entryId;
    }, this.loadConfig = H0(() => this.requestConfig());
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
    const t = W0(L2, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    r ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await N0(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
    } catch (r) {
      this.error = bh(r);
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
    return this.error ? F`<div class="notice">
        Could not load configuration: ${this.error}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          Try again
        </button>
      </div>` : this.config ? this.config.entries.length ? F`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1 ? F`<select
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
      (r) => F`<option
                  value=${r.entry_id}
                  ?selected=${r.entry_id === this.entryId}
                >
                  ${r.title}
                </option>`
    )}
            </select>` : X}
        <div class="ranges">
          ${Bp.map(
      (r) => F`<button
              class=${r === this.range ? "active" : ""}
              @click=${() => this.selectRange(r)}
            >${G0[r]}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${Pp.map(
      (r) => F`<button
            class=${r.id === this.tab ? "active" : ""}
            @click=${() => this.selectTab(r.id)}
          >${r.label}</button>`
    )}
      </nav>

      <main>
        ${this.tab === "load" ? F`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : X}
        ${this.tab === "battery" ? F`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>` : X}
        ${this.tab === "load" || this.tab === "battery" ? X : F`<div class="notice">This tab is not built yet.</div>`}
      </main>
    ` : F`<div class="notice">
        No inverter is configured yet. Add the Inverter Analytics integration in settings.
      </div>` : F`<div class="notice">Loading…</div>`;
  }
};
xe.styles = xr`
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
er([
  bt({ attribute: !1 })
], xe.prototype, "hass", 2);
er([
  bt({ type: Boolean })
], xe.prototype, "narrow", 2);
er([
  bt({ attribute: !1 })
], xe.prototype, "route", 2);
er([
  ce()
], xe.prototype, "config", 2);
er([
  ce()
], xe.prototype, "error", 2);
er([
  ce()
], xe.prototype, "entryId", 2);
er([
  ce()
], xe.prototype, "tab", 2);
er([
  ce()
], xe.prototype, "range", 2);
xe = er([
  ci("inverter-analytics-panel")
], xe);
export {
  xe as InverterAnalyticsPanel
};

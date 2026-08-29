/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const so = globalThis, qu = so.ShadowRoot && (so.ShadyCSS === void 0 || so.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ku = Symbol(), ph = /* @__PURE__ */ new WeakMap();
let fp = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ku) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (qu && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ph.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ph.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wy = (r) => new fp(typeof r == "string" ? r : r + "", void 0, Ku), Qu = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new fp(e, r, Ku);
}, Uy = (r, t) => {
  if (qu) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = so.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, gh = qu ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Wy(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Yy, defineProperty: Xy, getOwnPropertyDescriptor: Zy, getOwnPropertyNames: qy, getOwnPropertySymbols: Ky, getPrototypeOf: Qy } = Object, jo = globalThis, mh = jo.trustedTypes, jy = mh ? mh.emptyScript : "", Jy = jo.reactiveElementPolyfillSupport, kn = (r, t) => r, So = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? jy : null;
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
} }, ju = (r, t) => !Yy(r, t), yh = { attribute: !0, type: String, converter: So, reflect: !1, useDefault: !1, hasChanged: ju };
Symbol.metadata ??= Symbol("metadata"), jo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Mi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = yh) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Xy(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = Zy(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? yh;
  }
  static _$Ei() {
    if (this.hasOwnProperty(kn("elementProperties"))) return;
    const t = Qy(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(kn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(kn("properties"))) {
      const e = this.properties, i = [...qy(e), ...Ky(e)];
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
      for (const n of i) e.unshift(gh(n));
    } else t !== void 0 && e.push(gh(t));
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
    return Uy(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : So).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : So;
      this._$Em = n;
      const s = o.fromAttribute(e, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? ju)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
Mi.elementStyles = [], Mi.shadowRootOptions = { mode: "open" }, Mi[kn("elementProperties")] = /* @__PURE__ */ new Map(), Mi[kn("finalized")] = /* @__PURE__ */ new Map(), Jy?.({ ReactiveElement: Mi }), (jo.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ju = globalThis, _h = (r) => r, bo = Ju.trustedTypes, wh = bo ? bo.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, hp = "$lit$", cr = `lit$${Math.random().toFixed(9).slice(2)}$`, cp = "?" + cr, t_ = `<${cp}>`, ni = document, Kn = () => ni.createComment(""), Qn = (r) => r === null || typeof r != "object" && typeof r != "function", tf = Array.isArray, e_ = (r) => tf(r) || typeof r?.[Symbol.iterator] == "function", Ps = `[ 	
\f\r]`, ln = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Sh = /-->/g, bh = />/g, Cr = RegExp(`>|${Ps}(?:([^\\s"'>=/]+)(${Ps}*=${Ps}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xh = /'/g, Th = /"/g, vp = /^(?:script|style|textarea|title)$/i, r_ = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), vt = r_(1), Wi = Symbol.for("lit-noChange"), dt = Symbol.for("lit-nothing"), Ch = /* @__PURE__ */ new WeakMap(), qr = ni.createTreeWalker(ni, 129);
function dp(r, t) {
  if (!tf(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wh !== void 0 ? wh.createHTML(t) : t;
}
const i_ = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ln;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, f, h = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, f = o.exec(l), f !== null); ) v = o.lastIndex, o === ln ? f[1] === "!--" ? o = Sh : f[1] !== void 0 ? o = bh : f[2] !== void 0 ? (vp.test(f[2]) && (n = RegExp("</" + f[2], "g")), o = Cr) : f[3] !== void 0 && (o = Cr) : o === Cr ? f[0] === ">" ? (o = n ?? ln, h = -1) : f[1] === void 0 ? h = -2 : (h = o.lastIndex - f[2].length, u = f[1], o = f[3] === void 0 ? Cr : f[3] === '"' ? Th : xh) : o === Th || o === xh ? o = Cr : o === Sh || o === bh ? o = ln : (o = Cr, n = void 0);
    const c = o === Cr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === ln ? l + t_ : h >= 0 ? (i.push(u), l.slice(0, h) + hp + l.slice(h) + cr + c) : l + cr + (h === -2 ? s : c);
  }
  return [dp(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class jn {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, f] = i_(t, e);
    if (this.el = jn.createElement(u, i), qr.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = qr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(hp)) {
          const v = f[o++], c = n.getAttribute(h).split(cr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: c, ctor: d[1] === "." ? a_ : d[1] === "?" ? o_ : d[1] === "@" ? s_ : Jo }), n.removeAttribute(h);
        } else h.startsWith(cr) && (l.push({ type: 6, index: a }), n.removeAttribute(h));
        if (vp.test(n.tagName)) {
          const h = n.textContent.split(cr), v = h.length - 1;
          if (v > 0) {
            n.textContent = bo ? bo.emptyScript : "";
            for (let c = 0; c < v; c++) n.append(h[c], Kn()), qr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(h[v], Kn());
          }
        }
      } else if (n.nodeType === 8) if (n.data === cp) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(cr, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += cr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = ni.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ui(r, t, e = r, i) {
  if (t === Wi) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = Qn(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = Ui(r, n._$AS(r, t.values), n, i)), t;
}
class n_ {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? ni).importNode(e, !0);
    qr.currentNode = n;
    let a = qr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ma(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new l_(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = qr.nextNode(), o++);
    }
    return qr.currentNode = ni, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ma {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = dt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Ui(this, t, e), Qn(t) ? t === dt || t == null || t === "" ? (this._$AH !== dt && this._$AR(), this._$AH = dt) : t !== this._$AH && t !== Wi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : e_(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== dt && Qn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ni.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = jn.createElement(dp(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const a = new n_(n, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Ch.get(t.strings);
    return e === void 0 && Ch.set(t.strings, e = new jn(t)), e;
  }
  k(t) {
    tf(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new ma(this.O(Kn()), this.O(Kn()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = _h(t).nextSibling;
      _h(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Jo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = dt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = dt;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Ui(this, t, e, 0), o = !Qn(t) || t !== this._$AH && t !== Wi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Ui(this, s[i + l], e, l), u === Wi && (u = this._$AH[l]), o ||= !Qn(u) || u !== this._$AH[l], u === dt ? t = dt : t !== dt && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === dt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class a_ extends Jo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === dt ? void 0 : t;
  }
}
class o_ extends Jo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== dt);
  }
}
class s_ extends Jo {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Ui(this, t, e, 0) ?? dt) === Wi) return;
    const i = this._$AH, n = t === dt && i !== dt || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== dt && (i === dt || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class l_ {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ui(this, t);
  }
}
const u_ = Ju.litHtmlPolyfillSupport;
u_?.(jn, ma), (Ju.litHtmlVersions ??= []).push("3.3.3");
const f_ = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = n = new ma(t.insertBefore(Kn(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ef = globalThis;
class Jr extends Mi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = f_(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Wi;
  }
}
Jr._$litElement$ = !0, Jr.finalized = !0, ef.litElementHydrateSupport?.({ LitElement: Jr });
const h_ = ef.litElementPolyfillSupport;
h_?.({ LitElement: Jr });
(ef.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rf = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const c_ = { attribute: !0, type: String, converter: So, reflect: !1, hasChanged: ju }, v_ = (r = c_, t, e) => {
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
function Ke(r) {
  return (t, e) => typeof e == "object" ? v_(r, t, e) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Qe(r) {
  return Ke({ ...r, state: !0, attribute: !1 });
}
function d_(r) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function p_(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
const Dh = ["24h", "7d", "30d", "month", "year"], g_ = {
  "24h": "24 год",
  "7d": "7 днів",
  "30d": "30 днів",
  month: "Цей місяць",
  year: "Рік"
}, ba = 24 * 3600 * 1e3;
function m_(r, t) {
  const e = new Date(t.getTime());
  switch (r) {
    case "24h":
      return { start: new Date(e.getTime() - ba), end: e };
    case "7d":
      return { start: new Date(e.getTime() - 7 * ba), end: e };
    case "30d":
      return { start: new Date(e.getTime() - 30 * ba), end: e };
    case "month":
      return { start: new Date(e.getFullYear(), e.getMonth(), 1, 0, 0, 0, 0), end: e };
    case "year":
      return { start: new Date(e.getTime() - 365 * ba), end: e };
  }
}
const Jn = {
  load: "#2f7ed8",
  overload: "#d64545"
};
function nf() {
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
const Ni = (r, t) => Number(r.toFixed(t));
function y_(r, t) {
  const { base: e, axis: i } = nf(), n = r.histogram.buckets, a = n.map(
    (o) => String(t === "watts" ? Ni(o.start, 0) : Ni(o.start / r.rated_power * 100, 1))
  );
  return {
    ...e,
    xAxis: {
      ...i,
      type: "category",
      data: a,
      name: t === "watts" ? "Вт" : "% номіналу",
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: "% часу" },
    series: [
      {
        type: "bar",
        data: n.map((o) => Ni(o.fraction * 100, 2)),
        itemStyle: { color: Jn.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function __(r) {
  const { base: t, axis: e } = nf();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% часу", min: 0, max: 100 },
    yAxis: { ...e, type: "value", name: "Вт" },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: Jn.load },
        itemStyle: { color: Jn.load },
        data: r.duration_curve.map((i) => [
          Ni(i.fraction * 100, 2),
          Ni(i.value, 1)
        ])
      }
    ]
  };
}
function w_(r) {
  const { base: t, axis: e } = nf(), i = [...r.bands].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% часу", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => Ni(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "100+" ? Jn.overload : Jn.load
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
var Kl = function(r, t) {
  return Kl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, Kl(r, t);
};
function B(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Kl(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var af = 12, S_ = "sans-serif", ai = af + "px " + S_, b_ = 20, x_ = 100, T_ = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function C_(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - b_) / x_;
    t[i] = n;
  }
  return t;
}
var D_ = C_(T_), ji = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = ji.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || ai), r.measureText(e);
      e = e || "", i = i || ai;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || af, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = D_[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, pp = tn([
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
}, {}), gp = tn([
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
}, {}), Ji = Object.prototype.toString, ts = Array.prototype, A_ = ts.forEach, M_ = ts.filter, of = ts.slice, E_ = ts.map, Ah = function() {
}.constructor, xa = Ah ? Ah.prototype : null, sf = "__proto__", P_ = 2311;
function mp() {
  return P_++;
}
function ti() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function J(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = Ji.call(r);
  if (e === "[object Array]") {
    if (!Bn(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = J(r[i]);
    }
  } else if (gp[e]) {
    if (!Bn(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!pp[e] && !Bn(r) && !Yi(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== sf && (t[o] = J(r[o]));
  }
  return t;
}
function it(r, t, e) {
  if (!H(t) || !H(r))
    return e ? J(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== sf) {
      var n = r[i], a = t[i];
      H(a) && H(n) && !F(a) && !F(n) && !Yi(a) && !Yi(n) && !Mh(a) && !Mh(n) && !Bn(a) && !Bn(n) ? it(n, a, e) : (e || !(i in r)) && (r[i] = J(t[i]));
    }
  return r;
}
function N(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== sf && (r[e] = t[e]);
  return r;
}
function st(r, t, e) {
  for (var i = ht(t), n = 0, a = i.length; n < a; n++) {
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
function L_(r, t) {
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
    st(r, t);
}
function Ut(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function D(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === A_)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function G(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return lf(r);
  if (r.map && r.map === E_)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function tn(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function Mt(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return lf(r);
  if (r.filter && r.filter === M_)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function ht(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function I_(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(of.call(arguments)));
  };
}
var pt = xa && U(xa.bind) ? xa.call.bind(xa.bind) : I_;
function Qt(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(of.call(arguments)));
  };
}
function F(r) {
  return Array.isArray ? Array.isArray(r) : Ji.call(r) === "[object Array]";
}
function U(r) {
  return typeof r == "function";
}
function z(r) {
  return typeof r == "string";
}
function xo(r) {
  return Ji.call(r) === "[object String]";
}
function ct(r) {
  return typeof r == "number";
}
function H(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Mh(r) {
  return !!pp[Ji.call(r)];
}
function kt(r) {
  return !!gp[Ji.call(r)];
}
function Yi(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function es(r) {
  return r.colorStops != null;
}
function O_(r) {
  return r.image != null;
}
function R_(r) {
  return Ji.call(r) === "[object RegExp]";
}
function ta(r) {
  return r !== r;
}
function oi() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function q(r, t) {
  return r ?? t;
}
function ki(r, t, e) {
  return r ?? t ?? e;
}
function lf(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return of.apply(r, t);
}
function yp(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function Z(r, t) {
  if (!r)
    throw new Error(t);
}
function Me(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var _p = "__ec_primitive__";
function Ql(r) {
  r[_p] = !0;
}
function Bn(r) {
  return r[_p];
}
var N_ = function() {
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
    return ht(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
}(), wp = typeof Map == "function";
function k_() {
  return wp ? /* @__PURE__ */ new Map() : new N_();
}
var B_ = function() {
  function r(t) {
    var e = F(t);
    this.data = k_();
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
    return wp ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function K(r) {
  return new B_(r);
}
function F_(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function rs(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && N(e, t), e;
}
function Sp(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Xi(r, t) {
  return r.hasOwnProperty(t);
}
function Wt() {
}
var V_ = 180 / Math.PI, z_ = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), H_ = /* @__PURE__ */ function() {
  function r() {
    this.browser = new z_(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), W = new H_();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (W.wxa = !0, W.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? W.worker = !0 : !W.hasGlobalWindow || "Deno" in window ? (W.node = !0, W.svgSupported = !0) : $_(navigator.userAgent, W);
function $_(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var G_ = ".", Dr = "___EC__COMPONENT__CONTAINER___", bp = "___EC__EXTENDED_CLASS___";
function Ee(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(G_);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function W_(r) {
  Z(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function U_(r) {
  return !!(r && r[bp]);
}
function uf(r, t) {
  r.$constructor = r, r.extend = function(e) {
    process.env.NODE_ENV !== "production" && D(t, function(a) {
      e[a] || console.warn("Method `" + a + "` should be implemented" + (e.type ? " in " + e.type : "") + ".");
    });
    var i = this, n;
    return Y_(i) ? n = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, L_(n, this)), N(n.prototype, e), n[bp] = !0, n.extend = this.extend, n.superCall = q_, n.superApply = K_, n.superClass = i, n;
  };
}
function Y_(r) {
  return U(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function xp(r, t) {
  r.extend = t.extend;
}
var X_ = Math.round(Math.random() * 10);
function Z_(r) {
  var t = ["__\0is_clz", X_++].join("_");
  r.prototype[t] = !0, process.env.NODE_ENV !== "production" && Z(!r.isInstance, 'The method "is" can not be defined.'), r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function q_(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function K_(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function is(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      W_(n), i.prototype.type = n;
      var a = Ee(n);
      if (!a.sub)
        process.env.NODE_ENV !== "production" && t[a.main] && console.warn(a.main + " exists."), t[a.main] = i;
      else if (a.sub !== Dr) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[Dr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Ee(i), a = [], o = t[n.main];
    return o && o[Dr] ? D(o, function(s, l) {
      l !== Dr && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Ee(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return D(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Ee(i), a = t[n.main];
    return a && a[Dr];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[Dr]) && (n = t[i.main] = {}, n[Dr] = !0), n;
  }
}
function ea(r, t) {
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
var Q_ = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], j_ = ea(Q_), J_ = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return j_(this, t, e);
    }, r;
  }()
), Tp = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), t0 = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new Tp(t);
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
}(), ya = function() {
  function r(t) {
    this._list = new t0(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new Tp(e), s.key = t, i.insertEntry(s), n[t] = s;
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
}(), jl = new ya(50);
function e0(r) {
  if (typeof r == "string") {
    var t = jl.get(r);
    return t && t.image;
  } else
    return r;
}
function Cp(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = jl.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !ns(t) && a.pending.push(o)) : (t = ji.loadImage(r, Eh, Eh), t.__zrImageSrc = r, jl.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function Eh() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function ns(r) {
  return r && r.width && r.height;
}
function Bi() {
  return [1, 0, 0, 1, 0, 0];
}
function ff(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function r0(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function Fi(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function Jl(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function hf(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], f = Math.sin(e), h = Math.cos(e);
  return r[0] = n * h + s * f, r[1] = -n * f + s * h, r[2] = a * h + l * f, r[3] = -a * f + h * l, r[4] = h * (o - i[0]) + f * (u - i[1]) + i[0], r[5] = h * (u - i[1]) - f * (o - i[0]) + i[1], r;
}
function i0(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function cf(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var lt = function() {
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
}(), Ta = Math.min, Ca = Math.max, Ar = new lt(), Mr = new lt(), Er = new lt(), Pr = new lt(), un = new lt(), fn = new lt(), et = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = Ta(t.x, this.x), i = Ta(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Ca(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Ca(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = Bi();
    return Jl(a, a, [-e.x, -e.y]), i0(a, a, [i, n]), Jl(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, f = t.y, h = t.y + t.height, v = !(a < l || u < n || s < f || h < o);
    if (e) {
      var c = 1 / 0, d = 0, m = Math.abs(a - l), p = Math.abs(u - n), g = Math.abs(s - f), y = Math.abs(h - o), _ = Math.min(m, p), w = Math.min(g, y);
      a < l || u < n ? _ > d && (d = _, m < p ? lt.set(fn, -m, 0) : lt.set(fn, p, 0)) : _ < c && (c = _, m < p ? lt.set(un, m, 0) : lt.set(un, -p, 0)), s < f || h < o ? w > d && (d = w, g < y ? lt.set(fn, 0, -g) : lt.set(fn, 0, y)) : _ < c && (c = _, g < y ? lt.set(un, 0, g) : lt.set(un, 0, -y));
    }
    return e && lt.copy(e, v ? un : fn), v;
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
    Ar.x = Er.x = e.x, Ar.y = Pr.y = e.y, Mr.x = Pr.x = e.x + e.width, Mr.y = Er.y = e.y + e.height, Ar.transform(i), Pr.transform(i), Mr.transform(i), Er.transform(i), t.x = Ta(Ar.x, Mr.x, Er.x, Pr.x), t.y = Ta(Ar.y, Mr.y, Er.y, Pr.y);
    var l = Ca(Ar.x, Mr.x, Er.x, Pr.x), u = Ca(Ar.y, Mr.y, Er.y, Pr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
}(), Ph = {};
function jt(r, t) {
  t = t || ai;
  var e = Ph[t];
  e || (e = Ph[t] = new ya(500));
  var i = e.get(r);
  return i == null && (i = ji.measureText(r, t).width, e.put(r, i)), i;
}
function Lh(r, t, e, i) {
  var n = jt(r, t), a = df(t), o = Mn(0, n, e), s = Ei(0, a, i), l = new et(o, s, n, a);
  return l;
}
function vf(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return Lh(n[0], t, e, i);
  for (var o = new et(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = Lh(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function Mn(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function Ei(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function df(r) {
  return jt("国", r);
}
function _r(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function To(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, f = "left", h = "top";
  if (i instanceof Array)
    l += _r(i[0], e.width), u += _r(i[1], e.height), f = null, h = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, f = "right", h = "middle";
        break;
      case "right":
        l += n + o, u += s, h = "middle";
        break;
      case "top":
        l += o / 2, u -= n, f = "center", h = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, f = "center";
        break;
      case "inside":
        l += o / 2, u += s, f = "center", h = "middle";
        break;
      case "insideLeft":
        l += n, u += s, h = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, f = "right", h = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, f = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, f = "center", h = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, f = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, h = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, f = "right", h = "bottom";
        break;
    }
  return r = r || {}, r.x = l, r.y = u, r.align = f, r.verticalAlign = h, r;
}
var Ls = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function n0(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Dp(e, i, n, a);
  for (var s = !1, l = {}, u = 0, f = o.length; u < f; u++)
    Ap(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function Dp(r, t, e, i) {
  i = i || {};
  var n = N({}, i);
  n.font = t, e = q(e, "..."), n.maxIterations = q(i.maxIterations, 2);
  var a = n.minChar = q(i.minChar, 0);
  n.cnCharWidth = jt("国", t);
  var o = n.ascCharWidth = jt("a", t);
  n.placeholder = q(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = jt(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function Ap(r, t, e) {
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
    var l = s === 0 ? a0(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = jt(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function a0(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function o0(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = df(n), s = q(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", f = !1, h = t.width, v;
  h != null && (e === "break" || e === "breakAll") ? v = r ? Mp(r, t.font, h, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var c = v.length * s, d = q(t.height, c);
  if (c > d && u) {
    var m = Math.floor(d / s);
    f = f || v.length > m, v = v.slice(0, m);
  }
  if (r && a && h != null)
    for (var p = Dp(h, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), g = {}, y = 0; y < v.length; y++)
      Ap(g, v[y], p), v[y] = g.textLine, f = f || g.isTruncated;
  for (var _ = d, w = 0, y = 0; y < v.length; y++)
    w = Math.max(jt(v[y], n), w);
  h == null && (h = w);
  var b = w;
  return i && (_ += i[0] + i[2], b += i[1] + i[3], h += i[1] + i[3]), l && (b = h), {
    lines: v,
    height: d,
    outerWidth: b,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: w,
    contentHeight: c,
    width: h,
    isTruncated: f
  };
}
var s0 = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), Ih = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), l0 = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
}();
function u0(r, t) {
  var e = new l0();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = Ls.lastIndex = 0, l; (l = Ls.exec(r)) != null; ) {
    var u = l.index;
    u > s && Is(e, r.substring(s, u), t, o), Is(e, l[2], t, o, l[1]), s = Ls.lastIndex;
  }
  s < r.length && Is(e, r.substring(s, r.length), t, o);
  var f = [], h = 0, v = 0, c = t.padding, d = a === "truncate", m = t.lineOverflow === "truncate", p = {};
  function g($, X, Q) {
    $.width = X, $.lineHeight = Q, h += Q, v = Math.max(v, X);
  }
  t: for (var y = 0; y < e.lines.length; y++) {
    for (var _ = e.lines[y], w = 0, b = 0, S = 0; S < _.tokens.length; S++) {
      var x = _.tokens[S], C = x.styleName && t.rich[x.styleName] || {}, A = x.textPadding = C.padding, M = A ? A[1] + A[3] : 0, T = x.font = C.font || t.font;
      x.contentHeight = df(T);
      var E = q(C.height, x.contentHeight);
      if (x.innerHeight = E, A && (E += A[0] + A[2]), x.height = E, x.lineHeight = ki(C.lineHeight, t.lineHeight, E), x.align = C && C.align || t.align, x.verticalAlign = C && C.verticalAlign || "middle", m && n != null && h + x.lineHeight > n) {
        var P = e.lines.length;
        S > 0 ? (_.tokens = _.tokens.slice(0, S), g(_, b, w), e.lines = e.lines.slice(0, y + 1)) : e.lines = e.lines.slice(0, y), e.isTruncated = e.isTruncated || e.lines.length < P;
        break t;
      }
      var L = C.width, I = L == null || L === "auto";
      if (typeof L == "string" && L.charAt(L.length - 1) === "%")
        x.percentWidth = L, f.push(x), x.contentWidth = jt(x.text, T);
      else {
        if (I) {
          var O = C.backgroundColor, V = O && O.image;
          V && (V = e0(V), ns(V) && (x.width = Math.max(x.width, V.width * E / V.height)));
        }
        var R = d && i != null ? i - b : null;
        R != null && R < x.width ? !I || R < M ? (x.text = "", x.width = x.contentWidth = 0) : (n0(p, x.text, R - M, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, e.isTruncated = e.isTruncated || p.isTruncated, x.width = x.contentWidth = jt(x.text, T)) : x.contentWidth = jt(x.text, T);
      }
      x.width += M, b += x.width, C && (w = Math.max(w, x.lineHeight));
    }
    g(_, b, w);
  }
  e.outerWidth = e.width = q(i, v), e.outerHeight = e.height = q(n, h), e.contentHeight = h, e.contentWidth = v, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var y = 0; y < f.length; y++) {
    var x = f[y], k = x.percentWidth;
    x.width = parseInt(k, 10) / 100 * e.width;
  }
  return e;
}
function Is(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, f, h;
  if (i) {
    var v = o.padding, c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = _r(o.width, i.width) + c;
      s.length > 0 && d + i.accumWidth > i.width && (f = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var m = Mp(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = m.accumWidth + c, h = m.linesWidths, f = m.lines;
    }
  } else
    f = t.split(`
`);
  for (var p = 0; p < f.length; p++) {
    var g = f[p], y = new s0();
    if (y.styleName = n, y.text = g, y.isLineHolder = !g && !a, typeof o.width == "number" ? y.width = o.width : y.width = h ? h[p] : jt(g, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Ih())).tokens, w = _.length;
      w === 1 && _[0].isLineHolder ? _[0] = y : (g || !w || a) && _.push(y);
    } else
      s.push(new Ih([y]));
  }
}
function f0(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var h0 = tn(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function c0(r) {
  return f0(r) ? !!h0[r] : !0;
}
function Mp(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, f = 0, h = 0; h < r.length; h++) {
    var v = r.charAt(h);
    if (v === `
`) {
      l && (s += l, f += u), a.push(s), o.push(f), s = "", l = "", u = 0, f = 0;
      continue;
    }
    var c = jt(v, t), d = i ? !1 : !c0(v);
    if (a.length ? f + c > e : n + f + c > e) {
      f ? (s || l) && (d ? (s || (s = l, l = "", u = 0, f = u), a.push(s), o.push(f - u), l += v, u += c, s = "", f = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(f), s = v, f = c)) : d ? (a.push(l), o.push(u), l = v, u = c) : (a.push(v), o.push(c));
      continue;
    }
    f += c, d ? (l += v, u += c) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(f)), a.length === 1 && (f += n), {
    accumWidth: f,
    lines: a,
    linesWidths: o
  };
}
function en(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function v0(r) {
  return [r[0], r[1]];
}
function Oh(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function d0(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function p0(r) {
  return Math.sqrt(g0(r));
}
function g0(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Os(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function m0(r, t) {
  var e = p0(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function tu(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var y0 = tu;
function _0(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var Vi = _0;
function fe(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Li(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Ii(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var Rh = ff, Nh = 5e-5;
function Lr(r) {
  return r > Nh || r < -Nh;
}
var Ir = [], ci = [], Rs = Bi(), Ns = Math.abs, pf = function() {
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
    return Lr(this.rotation) || Lr(this.x) || Lr(this.y) || Lr(this.scaleX - 1) || Lr(this.scaleY - 1) || Lr(this.skewX) || Lr(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (Rh(i), this.invTransform = null);
      return;
    }
    i = i || Bi(), e ? this.getLocalTransform(i) : Rh(i), t && (e ? Fi(i, t, i) : r0(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(Ir);
      var i = Ir[0] < 0 ? -1 : 1, n = Ir[1] < 0 ? -1 : 1, a = ((Ir[0] - i) * e + i) / Ir[0] || 0, o = ((Ir[1] - n) * e + n) / Ir[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Bi(), cf(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || Bi(), Fi(ci, t.invTransform, e), e = ci);
      var i = this.originX, n = this.originY;
      (i || n) && (Rs[4] = i, Rs[5] = n, Fi(ci, e, Rs), ci[4] -= i, ci[5] -= n, e = ci), this.setLocalTransform(e);
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
    return t && Ns(t[0] - 1) > 1e-10 && Ns(t[3] - 1) > 1e-10 ? Math.sqrt(Ns(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    w0(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, f = t.x, h = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, m = n + l;
      e[4] = -d * a - v * m * o, e[5] = -m * o - c * d * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = v * o, u && hf(e, e, u), e[4] += i + f, e[5] += n + h, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), ra = [
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
function w0(r, t) {
  for (var e = 0; e < ra.length; e++) {
    var i = ra[e];
    r[i] = t[i];
  }
}
var Fn = {
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
    return 1 - Fn.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? Fn.bounceIn(r * 2) * 0.5 : Fn.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, Da = Math.pow, pr = Math.sqrt, Co = 1e-8, Ep = 1e-4, kh = pr(3), Aa = 1 / 3, Ae = en(), oe = en(), zi = en();
function vr(r) {
  return r > -Co && r < Co;
}
function Pp(r) {
  return r > Co || r < -Co;
}
function xt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function Bh(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function Do(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, f = s * s - 3 * o * l, h = s * l - 9 * o * u, v = l * l - 3 * s * u, c = 0;
  if (vr(f) && vr(h))
    if (vr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[c++] = d);
    }
  else {
    var m = h * h - 4 * f * v;
    if (vr(m)) {
      var p = h / f, d = -s / o + p, g = -p / 2;
      d >= 0 && d <= 1 && (a[c++] = d), g >= 0 && g <= 1 && (a[c++] = g);
    } else if (m > 0) {
      var y = pr(m), _ = f * s + 1.5 * o * (-h + y), w = f * s + 1.5 * o * (-h - y);
      _ < 0 ? _ = -Da(-_, Aa) : _ = Da(_, Aa), w < 0 ? w = -Da(-w, Aa) : w = Da(w, Aa);
      var d = (-s - (_ + w)) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d);
    } else {
      var b = (2 * f * s - 3 * o * h) / (2 * pr(f * f * f)), S = Math.acos(b) / 3, x = pr(f), C = Math.cos(S), d = (-s - 2 * x * C) / (3 * o), g = (-s + x * (C + kh * Math.sin(S))) / (3 * o), A = (-s + x * (C - kh * Math.sin(S))) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d), g >= 0 && g <= 1 && (a[c++] = g), A >= 0 && A <= 1 && (a[c++] = A);
    }
  }
  return c;
}
function Lp(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (vr(o)) {
    if (Pp(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = a * a - 4 * o * s;
    if (vr(f))
      n[0] = -a / (2 * o);
    else if (f > 0) {
      var h = pr(f), u = (-a + h) / (2 * o), v = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Ao(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, f = (l - s) * n + s, h = (f - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = f, a[6] = l, a[7] = i;
}
function S0(r, t, e, i, n, a, o, s, l, u, f) {
  var h, v = 5e-3, c = 1 / 0, d, m, p, g;
  Ae[0] = l, Ae[1] = u;
  for (var y = 0; y < 1; y += 0.05)
    oe[0] = xt(r, e, n, o, y), oe[1] = xt(t, i, a, s, y), p = Vi(Ae, oe), p < c && (h = y, c = p);
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < Ep); _++)
    d = h - v, m = h + v, oe[0] = xt(r, e, n, o, d), oe[1] = xt(t, i, a, s, d), p = Vi(oe, Ae), d >= 0 && p < c ? (h = d, c = p) : (zi[0] = xt(r, e, n, o, m), zi[1] = xt(t, i, a, s, m), g = Vi(zi, Ae), m <= 1 && g < c ? (h = m, c = g) : v *= 0.5);
  return pr(c);
}
function b0(r, t, e, i, n, a, o, s, l) {
  for (var u = r, f = t, h = 0, v = 1 / l, c = 1; c <= l; c++) {
    var d = c * v, m = xt(r, e, n, o, d), p = xt(t, i, a, s, d), g = m - u, y = p - f;
    h += Math.sqrt(g * g + y * y), u = m, f = p;
  }
  return h;
}
function zt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function Fh(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function x0(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (vr(a)) {
    if (Pp(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = o * o - 4 * a * s;
    if (vr(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (f > 0) {
      var h = pr(f), u = (-o + h) / (2 * a), v = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Ip(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function Mo(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function T0(r, t, e, i, n, a, o, s, l) {
  var u, f = 5e-3, h = 1 / 0;
  Ae[0] = o, Ae[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    oe[0] = zt(r, e, n, v), oe[1] = zt(t, i, a, v);
    var c = Vi(Ae, oe);
    c < h && (u = v, h = c);
  }
  h = 1 / 0;
  for (var d = 0; d < 32 && !(f < Ep); d++) {
    var m = u - f, p = u + f;
    oe[0] = zt(r, e, n, m), oe[1] = zt(t, i, a, m);
    var c = Vi(oe, Ae);
    if (m >= 0 && c < h)
      u = m, h = c;
    else {
      zi[0] = zt(r, e, n, p), zi[1] = zt(t, i, a, p);
      var g = Vi(zi, Ae);
      p <= 1 && g < h ? (u = p, h = g) : f *= 0.5;
    }
  }
  return pr(h);
}
function C0(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, f = 1 / o, h = 1; h <= o; h++) {
    var v = h * f, c = zt(r, e, n, v), d = zt(t, i, a, v), m = c - s, p = d - l;
    u += Math.sqrt(m * m + p * p), s = c, l = d;
  }
  return u;
}
var D0 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Op(r) {
  var t = r && D0.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Me(e[0]), n = +Me(e[1]), a = +Me(e[2]), o = +Me(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Do(0, i, a, 1, l, s) && xt(0, n, o, 1, s[0]);
    };
  }
}
var A0 = function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Wt, this.ondestroy = t.ondestroy || Wt, this.onrestart = t.onrestart || Wt, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = U(t) ? t : Fn[t] || Op(t);
  }, r;
}(), Vh = {
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
function gr(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function eu(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function ks(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? gr(parseFloat(t) / 100 * 255) : gr(parseInt(t, 10));
}
function Vn(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? eu(parseFloat(t) / 100) : eu(parseFloat(t));
}
function Bs(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function Ma(r, t, e) {
  return r + (t - r) * e;
}
function re(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function ru(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var Rp = new ya(20), Ea = null;
function vi(r, t) {
  Ea && ru(Ea, t), Ea = Rp.put(r, Ea || t.slice());
}
function mr(r, t) {
  if (r) {
    t = t || [];
    var e = Rp.get(r);
    if (e)
      return ru(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in Vh)
      return ru(t, Vh[i]), vi(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          re(t, 0, 0, 0, 1);
          return;
        }
        return re(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), vi(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          re(t, 0, 0, 0, 1);
          return;
        }
        return re(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), vi(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? re(t, +u[0], +u[1], +u[2], 1) : re(t, 0, 0, 0, 1);
          f = Vn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return re(t, ks(u[0]), ks(u[1]), ks(u[2]), u.length === 3 ? f : Vn(u[3])), vi(r, t), t;
          re(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            re(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Vn(u[3]), zh(u, t), vi(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            re(t, 0, 0, 0, 1);
            return;
          }
          return zh(u, t), vi(r, t), t;
        default:
          return;
      }
    }
    re(t, 0, 0, 0, 1);
  }
}
function zh(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Vn(r[1]), n = Vn(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], re(t, gr(Bs(o, a, e + 1 / 3) * 255), gr(Bs(o, a, e) * 255), gr(Bs(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function Hh(r, t) {
  var e = mr(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return gf(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function M0(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = mr(t[n]), s = mr(t[a]), l = i - n, u = gf([
      gr(Ma(o[0], s[0], l)),
      gr(Ma(o[1], s[1], l)),
      gr(Ma(o[2], s[2], l)),
      eu(Ma(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function gf(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function Eo(r, t) {
  var e = mr(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var $h = new ya(100);
function Gh(r) {
  if (z(r)) {
    var t = $h.get(r);
    return t || (t = Hh(r, -0.1), $h.put(r, t)), t;
  } else if (es(r)) {
    var e = N({}, r);
    return e.colorStops = G(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: Hh(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function E0(r) {
  return r.type === "linear";
}
function P0(r) {
  return r.type === "radial";
}
(function() {
  return W.hasGlobalWindow && U(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return process.env.NODE_ENV !== "production" && ti("Base64 isn't natively supported in the current environment."), null;
  };
})();
var iu = Array.prototype.slice;
function He(r, t, e) {
  return (t - r) * e + r;
}
function Fs(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = He(t[a], e[a], i);
  return r;
}
function L0(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = He(t[o][s], e[o][s], i);
  }
  return r;
}
function Pa(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function Wh(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function I0(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function O0(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : iu.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var f = 0; f < u; f++)
          isNaN(i[l][f]) && (i[l][f] = n[l][f]);
  }
}
function lo(r) {
  if (Ut(r)) {
    var t = r.length;
    if (Ut(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(iu.call(r[i]));
      return e;
    }
    return iu.call(r);
  }
  return r;
}
function uo(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function R0(r) {
  return Ut(r && r[0]) ? 2 : 1;
}
var La = 0, fo = 1, Np = 2, En = 3, nu = 4, au = 5, Uh = 6;
function Yh(r) {
  return r === nu || r === au;
}
function Ia(r) {
  return r === fo || r === Np;
}
var hn = [0, 0, 0, 0], N0 = function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = Uh, l = e;
    if (Ut(e)) {
      var u = R0(e);
      s = u, (u === 1 && !ct(e[0]) || u === 2 && !ct(e[0][0])) && (o = !0);
    } else if (ct(e) && !ta(e))
      s = La;
    else if (z(e))
      if (!isNaN(+e))
        s = La;
      else {
        var f = mr(e);
        f && (l = f, s = En);
      }
    else if (es(e)) {
      var h = N({}, l);
      h.colorStops = G(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: mr(c.color)
        };
      }), E0(e) ? s = nu : P0(e) && (s = au), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Uh) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = U(i) ? i : Fn[i] || Op(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(m, p) {
      return m.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Ia(n), u = Yh(n), f = 0; f < a; f++) {
      var h = i[f], v = h.value, c = o.value;
      h.percent = h.time / t, s || (l && f !== a - 1 ? O0(v, c, n) : u && I0(v.colorStops, c.colorStops));
    }
    if (!s && n !== au && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var d = i[0].value, f = 0; f < a; f++)
        n === La ? i[f].additiveValue = i[f].value - d : n === En ? i[f].additiveValue = Pa([], i[f].value, d, -1) : Ia(n) && (i[f].additiveValue = n === fo ? Pa([], i[f].value, d, -1) : Wh([], i[f].value, d, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === En, f, h = this._lastFr, v = Math.min, c, d;
      if (s === 1)
        c = d = o[0];
      else {
        if (e < 0)
          f = 0;
        else if (e < this._lastFrP) {
          var m = v(h + 1, s - 1);
          for (f = m; f >= 0 && !(o[f].percent <= e); f--)
            ;
          f = v(f, s - 2);
        } else {
          for (f = h; f < s && !(o[f].percent > e); f++)
            ;
          f = v(f - 1, s - 2);
        }
        d = o[f + 1], c = o[f];
      }
      if (c && d) {
        this._lastFr = f, this._lastFrP = e;
        var p = d.percent - c.percent, g = p === 0 ? 1 : v((e - c.percent) / p, 1);
        d.easingFunc && (g = d.easingFunc(g));
        var y = i ? this._additiveValue : u ? hn : t[l];
        if ((Ia(a) || u) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = g < 1 ? c.rawValue : d.rawValue;
        else if (Ia(a))
          a === fo ? Fs(y, c[n], d[n], g) : L0(y, c[n], d[n], g);
        else if (Yh(a)) {
          var _ = c[n], w = d[n], b = a === nu;
          t[l] = {
            type: b ? "linear" : "radial",
            x: He(_.x, w.x, g),
            y: He(_.y, w.y, g),
            colorStops: G(_.colorStops, function(x, C) {
              var A = w.colorStops[C];
              return {
                offset: He(x.offset, A.offset, g),
                color: uo(Fs([], x.color, A.color, g))
              };
            }),
            global: w.global
          }, b ? (t[l].x2 = He(_.x2, w.x2, g), t[l].y2 = He(_.y2, w.y2, g)) : t[l].r = He(_.r, w.r, g);
        } else if (u)
          Fs(y, c[n], d[n], g), i || (t[l] = uo(y));
        else {
          var S = He(c[n], d[n], g);
          i ? this._additiveValue = S : t[l] = S;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === La ? t[i] = t[i] + n : e === En ? (mr(t[i], hn), Pa(hn, hn, n, 1), t[i] = uo(hn)) : e === fo ? Pa(t[i], t[i], n, 1) : e === Np && Wh(t[i], t[i], n, 1);
  }, r;
}(), mf = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      ti("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, e, ht(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new N0(s);
        var u = void 0, f = this._getAdditiveTrack(s);
        if (f) {
          var h = f.keyframes, v = h[h.length - 1];
          u = v && v.value, f.valType === En && u && (u = uo(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, lo(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, lo(e[s]), n);
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
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, f = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var h = u[f - 1];
            h && (e._target[s.propName] = h.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new A0({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var d = e._additiveAnimators;
            if (d) {
              for (var m = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  m = !0;
                  break;
                }
              m || (e._additiveAnimators = null);
            }
            for (var p = 0; p < i.length; p++)
              i[p].step(e._target, c);
            var g = e._onframeCbs;
            if (g)
              for (var p = 0; p < g.length; p++)
                g[p](e._target, c);
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
    return G(this._trackKeys, function(e) {
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
          l && (t[a] = lo(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || ht(t);
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
}(), ke = function() {
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
    }, u = a[t].length - 1, f = a[t][u];
    return f && f.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
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
        var f = n[u];
        if (!(a && a.filter && f.query != null && !a.filter(t, f.query)))
          switch (o) {
            case 0:
              f.h.call(s);
              break;
            case 1:
              f.h.call(s, e[0]);
              break;
            case 2:
              f.h.call(s, e[0], e[1]);
              break;
            default:
              f.h.apply(s, e.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r;
}(), kp = 1;
W.hasGlobalWindow && (kp = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Po = kp, ou = 0.4, su = "#333", lu = "#ccc", k0 = "#eee", Kt = 1, Pn = 2, Pi = 4, Vs = "__zr_normal__", zs = ra.concat(["ignore"]), B0 = tn(ra, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), di = {}, F0 = new et(0, 0, 0, 0), as = function() {
  function r(t) {
    this.id = mp(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var f = F0;
        i.layoutRect ? f.copy(i.layoutRect) : f.copy(this.getBoundingRect()), n || f.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(di, i, f) : To(di, i, f), a.x = di.x, a.y = di.y, o = di.align, s = di.verticalAlign;
        var h = i.origin;
        if (h && i.rotation != null) {
          var v = void 0, c = void 0;
          h === "center" ? (v = f.width * 0.5, c = f.height * 0.5) : (v = _r(h[0], f.width), c = _r(h[1], f.height)), u = !0, a.originX = -a.x + v + (n ? 0 : f.x), a.originY = -a.y + c + (n ? 0 : f.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var m = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), g = void 0, y = void 0, _ = void 0;
      m && this.canBeInsideText() ? (g = i.insideFill, y = i.insideStroke, (g == null || g === "auto") && (g = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(g), _ = !0)) : (g = i.outsideFill, y = i.outsideStroke, (g == null || g === "auto") && (g = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(g), _ = !0)), g = g || "#000", (g !== p.fill || y !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = g, p.stroke = y, p.autoStroke = _, p.align = o, p.verticalAlign = s, e.setDefaultTextStyle(p)), e.__dirty |= Kt, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? lu : su;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && mr(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, gf(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, N(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (H(t))
      for (var i = t, n = ht(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== Vs)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, zs);
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
    this.useState(Vs, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === Vs, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(ut(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          ti("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var f = !!(u && u.hoverLayer || n);
        f && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var h = this._textContent, v = this._textGuide;
        return h && h.useState(t, e, i, f), v && v.useState(t, e, i, f), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Kt), u;
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
        var u = t[l], f = void 0;
        this.stateProxy && (f = this.stateProxy(u, t)), f || (f = this.states[u]), f && n.push(f);
      }
      var h = n[o - 1], v = !!(h && h.hoverLayer || i);
      v && this._toggleHoverLayerFlag(!0);
      var c = this._mergeStates(n), d = this.stateTransition;
      this.saveCurrentToNormalState(c), this._applyStateObj(t.join(","), c, this._normalState, !1, !e && !this.__inHover && d && d.duration > 0, d);
      var m = this._textContent, p = this._textGuide;
      m && m.useStates(t, e, v), p && p.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Kt);
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
      N(e, a), a.textConfig && (i = i || {}, N(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = N({}, n ? this.textConfig : i.textConfig), N(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, f = 0; f < zs.length; f++) {
      var h = zs[f], v = a && B0[h];
      e && e[h] != null ? v ? (u = !0, l[h] = e[h]) : this[h] = e[h] : s && i[h] != null && (v ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
    }
    if (!a)
      for (var f = 0; f < this.animators.length; f++) {
        var c = this.animators[f], d = c.targetName;
        c.getLoop() || c.__changeFinalValue(d ? (e || i)[d] : e || i);
      }
    u && this._transitionState(t, l, o);
  }, r.prototype._attachComponent = function(t) {
    if (t.__zr && !t.__hostTarget) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("Text element has been added to zrender.");
      return;
    }
    if (t === this) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("Recursive component attachment.");
      return;
    }
    var e = this.__zr;
    e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
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
    if (e !== t) {
      if (e && e !== t && this.removeTextContent(), process.env.NODE_ENV !== "production" && t.__zr && !t.__hostTarget)
        throw new Error("Text element has been added to zrender.");
      t.innerTransformable = new pf(), this._attachComponent(t), this._textContent = t, this.markRedraw();
    }
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), N(this.textConfig, t), this.markRedraw();
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
    var n = t ? this[t] : this;
    if (process.env.NODE_ENV !== "production" && !n) {
      ti('Property "' + t + '" is not existed in element ' + this.id);
      return;
    }
    var a = new mf(n, e, i);
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
    Hs(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    Hs(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = Hs(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Kt;
    var e = {};
    function i(a, o, s) {
      e[a + o + s] || (console.warn("DEPRECATED: '" + a + "' has been deprecated. use '" + o + "', '" + s + "' instead"), e[a + o + s] = !0);
    }
    function n(a, o, s, l) {
      Object.defineProperty(t, a, {
        get: function() {
          if (process.env.NODE_ENV !== "production" && i(a, s, l), !this[o]) {
            var f = this[o] = [];
            u(this, f);
          }
          return this[o];
        },
        set: function(f) {
          process.env.NODE_ENV !== "production" && i(a, s, l), this[s] = f[0], this[l] = f[1], this[o] = f, u(this, f);
        }
      });
      function u(f, h) {
        Object.defineProperty(h, 0, {
          get: function() {
            return f[s];
          },
          set: function(v) {
            f[s] = v;
          }
        }), Object.defineProperty(h, 1, {
          get: function() {
            return f[l];
          },
          set: function(v) {
            f[l] = v;
          }
        });
      }
    }
    Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
  }(), r;
}();
Ne(as, ke);
Ne(as, pf);
function Hs(r, t, e, i, n) {
  e = e || {};
  var a = [];
  Bp(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, f = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(d, m) {
    e.during(m);
  });
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    f && c.done(f), h && c.aborted(h), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function $s(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function V0(r) {
  return Ut(r[0]);
}
function z0(r, t, e) {
  if (Ut(t[e]))
    if (Ut(r[e]) || (r[e] = []), kt(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), $s(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (V0(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? $s(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        $s(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function H0(r, t) {
  return r === t || Ut(r) && Ut(t) && $0(r, t);
}
function $0(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function Bp(r, t, e, i, n, a, o, s) {
  for (var l = ht(i), u = n.duration, f = n.delay, h = n.additive, v = n.setToFinal, c = !H(a), d = r.animators, m = [], p = 0; p < l.length; p++) {
    var g = l[p], y = i[g];
    if (y != null && e[g] != null && (c || a[g]))
      if (H(y) && !Ut(y) && !es(y)) {
        if (t) {
          s || (e[g] = y, r.updateDuringAnimation(t));
          continue;
        }
        Bp(r, g, e[g], y, n, a && a[g], o, s);
      } else
        m.push(g);
    else s || (e[g] = y, r.updateDuringAnimation(t), m.push(g));
  }
  var _ = m.length;
  if (!h && _)
    for (var w = 0; w < d.length; w++) {
      var b = d[w];
      if (b.targetName === t) {
        var S = b.stopTracks(m);
        if (S) {
          var x = ut(d, b);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (m = Mt(m, function(T) {
    return !H0(i[T], e[T]);
  }), _ = m.length), _ > 0 || n.force && !o.length) {
    var C = void 0, A = void 0, M = void 0;
    if (s) {
      A = {}, v && (C = {});
      for (var w = 0; w < _; w++) {
        var g = m[w];
        A[g] = e[g], v ? C[g] = i[g] : e[g] = i[g];
      }
    } else if (v) {
      M = {};
      for (var w = 0; w < _; w++) {
        var g = m[w];
        M[g] = lo(e[g]), z0(e, i, g);
      }
    }
    var b = new mf(e, !1, !1, h ? Mt(d, function(E) {
      return E.targetName === t;
    }) : null);
    b.targetName = t, n.scope && (b.scope = n.scope), v && C && b.whenWithKeys(0, C, m), M && b.whenWithKeys(0, M, m), b.whenWithKeys(u ?? 500, s ? A : i, m).delay(f || 0), r.addAnimator(b, t), o.push(b);
  }
}
var uu = "__zr_style_" + Math.round(Math.random() * 10), ei = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, os = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
ei[uu] = !0;
var Xh = ["z", "z2", "invisible"], G0 = ["invisible"], _a = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = ht(e), n = 0; n < i.length; n++) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && W0(this, e, i) || o && !o[0] && !o[3])
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
      e = this._paintRect || (this._paintRect = new et(0, 0, 0, 0)), i ? et.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new et(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : N(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= Pn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & Pn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~Pn;
  }, t.prototype.createStyle = function(e) {
    return rs(ei, e);
  }, t.prototype.useStyle = function(e) {
    e[uu] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[uu];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, Xh);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var f = this.style;
        if (this.style = this.createStyle(l ? {} : f), l)
          for (var h = ht(f), v = 0; v < h.length; v++) {
            var c = h[v];
            c in u && (u[c] = u[c], this.style[c] = f[c]);
          }
        for (var d = ht(u), v = 0; v < d.length; v++) {
          var c = d[v];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var m = this.__inHover ? G0 : Xh, v = 0; v < m.length; v++) {
      var c = m[v];
      i && i[c] != null ? this[c] = i[c] : l && n[c] != null && (this[c] = n[c]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return N(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return os;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Kt | Pn;
  }(), t;
}(as), Gs = new et(0, 0, 0, 0), Ws = new et(0, 0, 0, 0);
function W0(r, t, e) {
  return Gs.copy(r.getBoundingRect()), r.transform && Gs.applyTransform(r.transform), Ws.width = t, Ws.height = e, !Gs.intersect(Ws);
}
var se = Math.min, le = Math.max, Us = Math.sin, Ys = Math.cos, Or = Math.PI * 2, Oa = en(), Ra = en(), Na = en();
function Zh(r, t, e, i, n, a) {
  n[0] = se(r, e), n[1] = se(t, i), a[0] = le(r, e), a[1] = le(t, i);
}
var qh = [], Kh = [];
function U0(r, t, e, i, n, a, o, s, l, u) {
  var f = Lp, h = xt, v = f(r, e, n, o, qh);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var c = 0; c < v; c++) {
    var d = h(r, e, n, o, qh[c]);
    l[0] = se(d, l[0]), u[0] = le(d, u[0]);
  }
  v = f(t, i, a, s, Kh);
  for (var c = 0; c < v; c++) {
    var m = h(t, i, a, s, Kh[c]);
    l[1] = se(m, l[1]), u[1] = le(m, u[1]);
  }
  l[0] = se(r, l[0]), u[0] = le(r, u[0]), l[0] = se(o, l[0]), u[0] = le(o, u[0]), l[1] = se(t, l[1]), u[1] = le(t, u[1]), l[1] = se(s, l[1]), u[1] = le(s, u[1]);
}
function Y0(r, t, e, i, n, a, o, s) {
  var l = Ip, u = zt, f = le(se(l(r, e, n), 1), 0), h = le(se(l(t, i, a), 1), 0), v = u(r, e, n, f), c = u(t, i, a, h);
  o[0] = se(r, n, v), o[1] = se(t, a, c), s[0] = le(r, n, v), s[1] = le(t, a, c);
}
function X0(r, t, e, i, n, a, o, s, l) {
  var u = Li, f = Ii, h = Math.abs(n - a);
  if (h % Or < 1e-4 && h > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (Oa[0] = Ys(n) * e + r, Oa[1] = Us(n) * i + t, Ra[0] = Ys(a) * e + r, Ra[1] = Us(a) * i + t, u(s, Oa, Ra), f(l, Oa, Ra), n = n % Or, n < 0 && (n = n + Or), a = a % Or, a < 0 && (a = a + Or), n > a && !o ? a += Or : n < a && o && (n += Or), o) {
    var v = a;
    a = n, n = v;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && (Na[0] = Ys(c) * e + r, Na[1] = Us(c) * i + t, u(s, Na, s), f(l, Na, l));
}
var tt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Rr = [], Nr = [], xe = [], er = [], Te = [], Ce = [], Xs = Math.min, Zs = Math.max, kr = Math.cos, Br = Math.sin, Ve = Math.abs, fu = Math.PI, fr = fu * 2, qs = typeof Float32Array < "u", cn = [];
function Ks(r) {
  var t = Math.round(r / fu * 1e8) / 1e8;
  return t % 2 * fu;
}
function Z0(r, t) {
  var e = Ks(r[0]);
  e < 0 && (e += fr);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= fr ? n = e + fr : t && e - n >= fr ? n = e - fr : !t && e > n ? n = e + (fr - Ks(e - n)) : t && e < n && (n = e - (fr - Ks(n - e))), r[0] = e, r[1] = n;
}
var si = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Ve(i / Po / t) || 0, this._uy = Ve(i / Po / e) || 0);
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
    return this._drawPendingPt(), this.addData(tt.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = Ve(t - this._xi), n = Ve(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(tt.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(tt.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(tt.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), cn[0] = n, cn[1] = a, Z0(cn, o), n = cn[0], a = cn[1];
    var s = a - n;
    return this.addData(tt.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = kr(a) * i + t, this._yi = Br(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(tt.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(tt.Z);
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
    !(this.data && this.data.length === e) && qs && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    qs && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var f = this.data;
      this._len + arguments.length > f.length && (this._expandData(), f = this.data);
      for (var h = 0; h < arguments.length; h++)
        f[this._len++] = arguments[h];
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
      t instanceof Array && (t.length = this._len, qs && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    xe[0] = xe[1] = Te[0] = Te[1] = Number.MAX_VALUE, er[0] = er[1] = Ce[0] = Ce[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case tt.M:
          e = n = t[o++], i = a = t[o++], Te[0] = n, Te[1] = a, Ce[0] = n, Ce[1] = a;
          break;
        case tt.L:
          Zh(e, i, t[o], t[o + 1], Te, Ce), e = t[o++], i = t[o++];
          break;
        case tt.C:
          U0(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Te, Ce), e = t[o++], i = t[o++];
          break;
        case tt.Q:
          Y0(e, i, t[o++], t[o++], t[o], t[o + 1], Te, Ce), e = t[o++], i = t[o++];
          break;
        case tt.A:
          var u = t[o++], f = t[o++], h = t[o++], v = t[o++], c = t[o++], d = t[o++] + c;
          o += 1;
          var m = !t[o++];
          l && (n = kr(c) * h + u, a = Br(c) * v + f), X0(u, f, h, v, c, d, m, Te, Ce), e = kr(d) * h + u, i = Br(d) * v + f;
          break;
        case tt.R:
          n = e = t[o++], a = i = t[o++];
          var p = t[o++], g = t[o++];
          Zh(n, a, n + p, a + g, Te, Ce);
          break;
        case tt.Z:
          e = n, i = a;
          break;
      }
      Li(xe, xe, Te), Ii(er, er, Ce);
    }
    return o === 0 && (xe[0] = xe[1] = er[0] = er[1] = 0), new et(xe[0], xe[1], er[0] - xe[0], er[1] - xe[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, f = 0, h = 0, v = 0; v < e; ) {
      var c = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var m = -1;
      switch (c) {
        case tt.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case tt.L: {
          var p = t[v++], g = t[v++], y = p - a, _ = g - o;
          (Ve(y) > i || Ve(_) > n || v === e - 1) && (m = Math.sqrt(y * y + _ * _), a = p, o = g);
          break;
        }
        case tt.C: {
          var w = t[v++], b = t[v++], p = t[v++], g = t[v++], S = t[v++], x = t[v++];
          m = b0(a, o, w, b, p, g, S, x, 10), a = S, o = x;
          break;
        }
        case tt.Q: {
          var w = t[v++], b = t[v++], p = t[v++], g = t[v++];
          m = C0(a, o, w, b, p, g, 10), a = p, o = g;
          break;
        }
        case tt.A:
          var C = t[v++], A = t[v++], M = t[v++], T = t[v++], E = t[v++], P = t[v++], L = P + E;
          v += 1, d && (s = kr(E) * M + C, l = Br(E) * T + A), m = Zs(M, T) * Xs(fr, Math.abs(P)), a = kr(L) * M + C, o = Br(L) * T + A;
          break;
        case tt.R: {
          s = a = t[v++], l = o = t[v++];
          var I = t[v++], O = t[v++];
          m = I * 2 + O * 2;
          break;
        }
        case tt.Z: {
          var y = s - a, _ = l - o;
          m = Math.sqrt(y * y + _ * _), a = s, o = l;
          break;
        }
      }
      m >= 0 && (u[h++] = m, f += m);
    }
    return this._pathLen = f, f;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, f, h, v, c = e < 1, d, m, p = 0, g = 0, y, _ = 0, w, b;
    if (!(c && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, m = this._pathLen, y = e * m, !y)))
      t: for (var S = 0; S < o; ) {
        var x = i[S++], C = S === 1;
        switch (C && (u = i[S], f = i[S + 1], s = u, l = f), x !== tt.L && _ > 0 && (t.lineTo(w, b), _ = 0), x) {
          case tt.M:
            s = u = i[S++], l = f = i[S++], t.moveTo(u, f);
            break;
          case tt.L: {
            h = i[S++], v = i[S++];
            var A = Ve(h - u), M = Ve(v - f);
            if (A > n || M > a) {
              if (c) {
                var T = d[g++];
                if (p + T > y) {
                  var E = (y - p) / T;
                  t.lineTo(u * (1 - E) + h * E, f * (1 - E) + v * E);
                  break t;
                }
                p += T;
              }
              t.lineTo(h, v), u = h, f = v, _ = 0;
            } else {
              var P = A * A + M * M;
              P > _ && (w = h, b = v, _ = P);
            }
            break;
          }
          case tt.C: {
            var L = i[S++], I = i[S++], O = i[S++], V = i[S++], R = i[S++], k = i[S++];
            if (c) {
              var T = d[g++];
              if (p + T > y) {
                var E = (y - p) / T;
                Ao(u, L, O, R, E, Rr), Ao(f, I, V, k, E, Nr), t.bezierCurveTo(Rr[1], Nr[1], Rr[2], Nr[2], Rr[3], Nr[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo(L, I, O, V, R, k), u = R, f = k;
            break;
          }
          case tt.Q: {
            var L = i[S++], I = i[S++], O = i[S++], V = i[S++];
            if (c) {
              var T = d[g++];
              if (p + T > y) {
                var E = (y - p) / T;
                Mo(u, L, O, E, Rr), Mo(f, I, V, E, Nr), t.quadraticCurveTo(Rr[1], Nr[1], Rr[2], Nr[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo(L, I, O, V), u = O, f = V;
            break;
          }
          case tt.A:
            var $ = i[S++], X = i[S++], Q = i[S++], at = i[S++], ft = i[S++], gt = i[S++], ve = i[S++], xr = !i[S++], hi = Q > at ? Q : at, Xt = Ve(Q - at) > 1e-3, bt = ft + gt, Y = !1;
            if (c) {
              var T = d[g++];
              p + T > y && (bt = ft + gt * (y - p) / T, Y = !0), p += T;
            }
            if (Xt && t.ellipse ? t.ellipse($, X, Q, at, ve, ft, bt, xr) : t.arc($, X, hi, ft, bt, xr), Y)
              break t;
            C && (s = kr(ft) * Q + $, l = Br(ft) * at + X), u = kr(bt) * Q + $, f = Br(bt) * at + X;
            break;
          case tt.R:
            s = u = i[S], l = f = i[S + 1], h = i[S++], v = i[S++];
            var j = i[S++], Tr = i[S++];
            if (c) {
              var T = d[g++];
              if (p + T > y) {
                var It = y - p;
                t.moveTo(h, v), t.lineTo(h + Xs(It, j), v), It -= j, It > 0 && t.lineTo(h + j, v + Xs(It, Tr)), It -= Tr, It > 0 && t.lineTo(h + Zs(j - It, 0), v + Tr), It -= j, It > 0 && t.lineTo(h, v + Zs(Tr - It, 0));
                break t;
              }
              p += T;
            }
            t.rect(h, v, j, Tr);
            break;
          case tt.Z:
            if (c) {
              var T = d[g++];
              if (p + T > y) {
                var E = (y - p) / T;
                t.lineTo(u * (1 - E) + s * E, f * (1 - E) + l * E);
                break t;
              }
              p += T;
            }
            t.closePath(), u = s, f = l;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = tt, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function pi(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    l = (t - i) / (r - e), u = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var f = l * a - o + u, h = f * f / (l * l + 1);
  return h <= s / 2 * s / 2;
}
function q0(r, t, e, i, n, a, o, s, l, u, f) {
  if (l === 0)
    return !1;
  var h = l;
  if (f > t + h && f > i + h && f > a + h && f > s + h || f < t - h && f < i - h && f < a - h && f < s - h || u > r + h && u > e + h && u > n + h && u > o + h || u < r - h && u < e - h && u < n - h && u < o - h)
    return !1;
  var v = S0(r, t, e, i, n, a, o, s, u, f);
  return v <= h / 2;
}
function K0(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var f = T0(r, t, e, i, n, a, s, l);
  return f <= u / 2;
}
var Qh = Math.PI * 2;
function ka(r) {
  return r %= Qh, r < 0 && (r += Qh), r;
}
var vn = Math.PI * 2;
function Q0(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var f = Math.sqrt(s * s + l * l);
  if (f - u > e || f + u < e)
    return !1;
  if (Math.abs(i - n) % vn < 1e-4)
    return !0;
  if (a) {
    var h = i;
    i = ka(n), n = ka(h);
  } else
    i = ka(i), n = ka(n);
  i > n && (n += vn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += vn), v >= i && v <= n || v + vn >= i && v + vn <= n;
}
function Fr(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var rr = si.CMD, Vr = Math.PI * 2, j0 = 1e-4;
function J0(r, t) {
  return Math.abs(r - t) < j0;
}
var Ot = [-1, -1, -1], ae = [-1, -1];
function t1() {
  var r = ae[0];
  ae[0] = ae[1], ae[1] = r;
}
function e1(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var f = Do(t, i, a, s, u, Ot);
  if (f === 0)
    return 0;
  for (var h = 0, v = -1, c = void 0, d = void 0, m = 0; m < f; m++) {
    var p = Ot[m], g = p === 0 || p === 1 ? 0.5 : 1, y = xt(r, e, n, o, p);
    y < l || (v < 0 && (v = Lp(t, i, a, s, ae), ae[1] < ae[0] && v > 1 && t1(), c = xt(t, i, a, s, ae[0]), v > 1 && (d = xt(t, i, a, s, ae[1]))), v === 2 ? p < ae[0] ? h += c < t ? g : -g : p < ae[1] ? h += d < c ? g : -g : h += s < d ? g : -g : p < ae[0] ? h += c < t ? g : -g : h += s < c ? g : -g);
  }
  return h;
}
function r1(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = x0(t, i, a, s, Ot);
  if (l === 0)
    return 0;
  var u = Ip(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, h = zt(t, i, a, u), v = 0; v < l; v++) {
      var c = Ot[v] === 0 || Ot[v] === 1 ? 0.5 : 1, d = zt(r, e, n, Ot[v]);
      d < o || (Ot[v] < u ? f += h < t ? c : -c : f += a < h ? c : -c);
    }
    return f;
  } else {
    var c = Ot[0] === 0 || Ot[0] === 1 ? 0.5 : 1, d = zt(r, e, n, Ot[0]);
    return d < o ? 0 : a < t ? c : -c;
  }
}
function i1(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  Ot[0] = -l, Ot[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= Vr - 1e-4) {
    i = 0, n = Vr;
    var f = a ? 1 : -1;
    return o >= Ot[0] + r && o <= Ot[1] + r ? f : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += Vr, n += Vr);
  for (var v = 0, c = 0; c < 2; c++) {
    var d = Ot[c];
    if (d + r > o) {
      var m = Math.atan2(s, d), f = a ? 1 : -1;
      m < 0 && (m = Vr + m), (m >= i && m <= n || m + Vr >= i && m + Vr <= n) && (m > Math.PI / 2 && m < Math.PI * 1.5 && (f = -f), v += f);
    }
  }
  return v;
}
function Fp(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, f = 0, h = 0, v, c, d = 0; d < o; ) {
    var m = a[d++], p = d === 1;
    switch (m === rr.M && d > 1 && (e || (s += Fr(l, u, f, h, i, n))), p && (l = a[d], u = a[d + 1], f = l, h = u), m) {
      case rr.M:
        f = a[d++], h = a[d++], l = f, u = h;
        break;
      case rr.L:
        if (e) {
          if (pi(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Fr(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case rr.C:
        if (e) {
          if (q0(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += e1(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case rr.Q:
        if (e) {
          if (K0(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += r1(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case rr.A:
        var g = a[d++], y = a[d++], _ = a[d++], w = a[d++], b = a[d++], S = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(b) * _ + g, c = Math.sin(b) * w + y, p ? (f = v, h = c) : s += Fr(l, u, v, c, i, n);
        var C = (i - g) * w / _ + g;
        if (e) {
          if (Q0(g, y, w, b, b + S, x, t, C, n))
            return !0;
        } else
          s += i1(g, y, w, b, b + S, x, C, n);
        l = Math.cos(b + S) * _ + g, u = Math.sin(b + S) * w + y;
        break;
      case rr.R:
        f = l = a[d++], h = u = a[d++];
        var A = a[d++], M = a[d++];
        if (v = f + A, c = h + M, e) {
          if (pi(f, h, v, h, t, i, n) || pi(v, h, v, c, t, i, n) || pi(v, c, f, c, t, i, n) || pi(f, c, f, h, t, i, n))
            return !0;
        } else
          s += Fr(v, h, v, c, i, n), s += Fr(f, c, f, h, i, n);
        break;
      case rr.Z:
        if (e) {
          if (pi(l, u, f, h, t, i, n))
            return !0;
        } else
          s += Fr(l, u, f, h, i, n);
        l = f, u = h;
        break;
    }
  }
  return !e && !J0(u, h) && (s += Fr(l, u, f, h, i, n) || 0), s !== 0;
}
function n1(r, t, e) {
  return Fp(r, 0, !1, t, e);
}
function a1(r, t, e, i) {
  return Fp(r, t, !0, e, i);
}
var Vp = st({
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
}, ei), o1 = {
  style: st({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, os.style)
}, Qs = ra.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), nt = function(r) {
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
      for (var s = 0; s < Qs.length; ++s)
        n[Qs[s]] = this[Qs[s]];
      n.__dirty |= Kt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = ht(e);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = e[o];
      o === "style" ? this.style ? N(this.style, s) : this.useStyle(s) : o === "shape" ? N(this.shape, s) : r.prototype.attrKV.call(this, o, s);
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
        var i = Eo(e, 0);
        return i > 0.5 ? su : i > 0.2 ? k0 : lu;
      } else if (e)
        return lu;
    }
    return su;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (z(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Eo(e, 0) < ou;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Pi;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new si(!1);
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
      (a || this.__dirty & Pi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || n) {
        s.copy(e);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var f = this.strokeContainThreshold;
          u = Math.max(u, f ?? 4);
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), a1(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return n1(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Pi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : N(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & Pi);
  }, t.prototype.createStyle = function(e) {
    return rs(Vp, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = N({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = N({}, n.shape), N(u, i.shape)) : (u = N({}, a ? this.shape : n.shape), N(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = N({}, this.shape);
        for (var f = {}, h = ht(u), v = 0; v < h.length; v++) {
          var c = h[v];
          typeof u[c] == "object" ? this.shape[c] = u[c] : f[c] = u[c];
        }
        this._transitionState(e, {
          shape: f
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
    return o1;
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
        return J(e.style);
      }, o.prototype.getDefaultShape = function() {
        return J(e.shape);
      }, o;
    }(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Kt | Pn | Pi;
  }(), t;
}(_a), s1 = st({
  strokeFirst: !0,
  font: ai,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Vp), Lo = function(r) {
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
    return rs(s1, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = vf(i, e.font, e.textAlign, e.textBaseline);
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
}(_a);
Lo.prototype.type = "tspan";
var l1 = st({
  x: 0,
  y: 0
}, ei), u1 = {
  style: st({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, os.style)
};
function f1(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var Sr = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return rs(l1, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = f1(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return u1;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new et(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(_a);
Sr.prototype.type = "image";
function h1(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, f;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = f = o : o instanceof Array ? o.length === 1 ? s = l = u = f = o[0] : o.length === 2 ? (s = u = o[0], l = f = o[1]) : o.length === 3 ? (s = o[0], l = f = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], f = o[3]) : s = l = u = f = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + f > n && (h = u + f, u *= n / h, f *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + f > a && (h = s + f, s *= a / h, f *= a / h), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + f, i + a), f !== 0 && r.arc(e + f, i + a - f, f, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var Oi = Math.round;
function zp(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (Oi(i * 2) === Oi(n * 2) && (r.x1 = r.x2 = Kr(i, s, !0)), Oi(a * 2) === Oi(o * 2) && (r.y1 = r.y2 = Kr(a, s, !0))), r;
  }
}
function Hp(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = Kr(i, s, !0), r.y = Kr(n, s, !0), r.width = Math.max(Kr(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(Kr(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function Kr(r, t, e) {
  if (!t)
    return r;
  var i = Oi(r * 2);
  return (i + Oi(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var c1 = /* @__PURE__ */ function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
}(), v1 = {}, Pt = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new c1();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Hp(v1, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? h1(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(nt);
Pt.prototype.type = "rect";
var jh = {
  fill: "#000"
}, Jh = 2, d1 = {
  style: st({
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
  }, os.style)
}, we = function(r) {
  B(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = jh, i.attr(e), i;
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
    this._childCursor = 0, _1(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
      for (var e = new et(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || jh;
  }, t.prototype.setTextContent = function(e) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Can't attach text on another text");
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return N(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = ht(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, N(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return d1;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || ai, n = e.padding, a = oc(e), o = o0(a, e), s = js(e), l = !!e.backgroundColor, u = o.outerHeight, f = o.outerWidth, h = o.contentWidth, v = o.lines, c = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var m = e.x || 0, p = e.y || 0, g = e.align || d.align || "left", y = e.verticalAlign || d.verticalAlign || "top", _ = m, w = Ei(p, o.contentHeight, y);
    if (s || n) {
      var b = Mn(m, f, g), S = Ei(p, u, y);
      s && this._renderBackground(e, e, b, S, f, u);
    }
    w += c / 2, n && (_ = ac(m, g, n), y === "top" ? w += n[0] : y === "bottom" && (w -= n[2]));
    for (var x = 0, C = !1, A = nc("fill" in e ? e.fill : (C = !0, d.fill)), M = ic("stroke" in e ? e.stroke : !l && (!d.autoStroke || C) ? (x = Jh, d.stroke) : null), T = e.textShadowBlur > 0, E = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), P = o.calculatedLineHeight, L = 0; L < v.length; L++) {
      var I = this._getOrCreateChild(Lo), O = I.createStyle();
      I.useStyle(O), O.text = v[L], O.x = _, O.y = w, O.textAlign = g, O.textBaseline = "middle", O.opacity = e.opacity, O.strokeFirst = !0, T && (O.shadowBlur = e.textShadowBlur || 0, O.shadowColor = e.textShadowColor || "transparent", O.shadowOffsetX = e.textShadowOffsetX || 0, O.shadowOffsetY = e.textShadowOffsetY || 0), O.stroke = M, O.fill = A, M && (O.lineWidth = e.lineWidth || x, O.lineDash = e.lineDash, O.lineDashOffset = e.lineDashOffset || 0), O.font = i, ec(O, e), w += c, E && I.setBoundingRect(new et(Mn(O.x, h, O.textAlign), Ei(O.y, P, O.textBaseline), h, P));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = oc(e), n = u0(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, f = e.y || 0, h = this._defaultStyle, v = e.align || h.align, c = e.verticalAlign || h.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = Mn(u, o, v), m = Ei(f, s, c), p = d, g = m;
    l && (p += l[3], g += l[0]);
    var y = p + a;
    js(e) && this._renderBackground(e, e, d, m, o, s);
    for (var _ = !!e.backgroundColor, w = 0; w < n.lines.length; w++) {
      for (var b = n.lines[w], S = b.tokens, x = S.length, C = b.lineHeight, A = b.width, M = 0, T = p, E = y, P = x - 1, L = void 0; M < x && (L = S[M], !L.align || L.align === "left"); )
        this._placeToken(L, e, C, g, T, "left", _), A -= L.width, T += L.width, M++;
      for (; P >= 0 && (L = S[P], L.align === "right"); )
        this._placeToken(L, e, C, g, E, "right", _), A -= L.width, E -= L.width, P--;
      for (T += (a - (T - p) - (y - E) - A) / 2; M <= P; )
        L = S[M], this._placeToken(L, e, C, g, T + L.width / 2, "center", _), T += L.width, M++;
      g += C;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var f = e.verticalAlign, h = a + n / 2;
    f === "top" ? h = a + e.height / 2 : f === "bottom" && (h = a + n - e.height / 2);
    var v = !e.isLineHolder && js(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, h - e.height / 2, e.width, e.height);
    var c = !!u.backgroundColor, d = e.textPadding;
    d && (o = ac(o, s, d), h -= e.height / 2 - d[0] - e.innerHeight / 2);
    var m = this._getOrCreateChild(Lo), p = m.createStyle();
    m.useStyle(p);
    var g = this._defaultStyle, y = !1, _ = 0, w = nc("fill" in u ? u.fill : "fill" in i ? i.fill : (y = !0, g.fill)), b = ic("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !c && !l && (!g.autoStroke || y) ? (_ = Jh, g.stroke) : null), S = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = e.text, p.x = o, p.y = h, S && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = e.font || ai, p.opacity = ki(u.opacity, i.opacity, 1), ec(p, u), b && (p.lineWidth = ki(u.lineWidth, i.lineWidth, _), p.lineDash = q(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = b), w && (p.fill = w);
    var x = e.contentWidth, C = e.contentHeight;
    m.setBoundingRect(new et(Mn(p.x, x, p.textAlign), Ei(p.y, C, p.textBaseline), x, C));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, f = e.borderColor, h = l && l.image, v = l && !h, c = e.borderRadius, d = this, m, p;
    if (v || e.lineHeight || u && f) {
      m = this._getOrCreateChild(Pt), m.useStyle(m.createStyle()), m.style.fill = null;
      var g = m.shape;
      g.x = n, g.y = a, g.width = o, g.height = s, g.r = c, m.dirtyShape();
    }
    if (v) {
      var y = m.style;
      y.fill = l || null, y.fillOpacity = q(e.fillOpacity, 1);
    } else if (h) {
      p = this._getOrCreateChild(Sr), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && f) {
      var y = m.style;
      y.lineWidth = u, y.stroke = f, y.strokeOpacity = q(e.strokeOpacity, 1), y.lineDash = e.borderDash, y.lineDashOffset = e.borderDashOffset || 0, m.strokeContainThreshold = 0, m.hasFill() && m.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var w = (m || p).style;
    w.shadowBlur = e.shadowBlur || 0, w.shadowColor = e.shadowColor || "transparent", w.shadowOffsetX = e.shadowOffsetX || 0, w.shadowOffsetY = e.shadowOffsetY || 0, w.opacity = ki(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return y1(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      m1(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Me(i) || e.textFont || e.font;
  }, t;
}(_a), p1 = { left: !0, right: 1, center: 1 }, g1 = { top: 1, bottom: 1, middle: 1 }, tc = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function m1(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? af + "px" : r + "px";
}
function ec(r, t) {
  for (var e = 0; e < tc.length; e++) {
    var i = tc[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function y1(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function _1(r) {
  return rc(r), D(r.rich, rc), r;
}
function rc(r) {
  if (r) {
    r.font = we.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || p1[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || g1[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = yp(r.padding));
  }
}
function ic(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function nc(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function ac(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function oc(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function js(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var sc = 1e-4, $p = 20;
function w1(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function lc(r, t, e, i) {
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
function Rt(r, t) {
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
  return z(r) ? w1(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function _t(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), $p), r = (+r).toFixed(t), e ? r : +r;
}
function $e(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return hu(r);
}
function hu(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function S1(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function b1(r, t) {
  var e = Math.max($e(r), $e(t)), i = r + t;
  return e > $p ? i : _t(i, e);
}
function Gp(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function Io(r) {
  return r > -sc && r < sc;
}
var x1 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Xe(r) {
  if (r instanceof Date)
    return r;
  if (z(r)) {
    var t = x1.exec(r);
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
function T1(r) {
  return Math.pow(10, ss(r));
}
function ss(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function Wp(r, t) {
  var e = ss(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function Oo(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !z(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function Up(r) {
  return !isNaN(Oo(r));
}
function Yp() {
  return Math.round(Math.random() * 9);
}
function Xp(r, t) {
  return t === 0 ? r : Xp(t, r % t);
}
function uc(r, t) {
  return r == null ? t : t == null ? r : r * t / Xp(r, t);
}
var C1 = "[ECharts] ", fc = {}, D1 = typeof console < "u" && console.warn && console.log;
function ls(r, t, e) {
  if (D1) {
    if (e) {
      if (fc[t])
        return;
      fc[t] = !0;
    }
    console[r](C1 + t);
  }
}
function A1(r, t) {
  ls("log", r, t);
}
function Et(r, t) {
  ls("warn", r, t);
}
function Lt(r, t) {
  ls("error", r, t);
}
function Le(r) {
  process.env.NODE_ENV !== "production" && ls("warn", "DEPRECATED: " + r, !0);
}
function St(r, t, e) {
  process.env.NODE_ENV !== "production" && Le((e ? "[" + e + "]" : "") + (r + " is deprecated, use " + t + " instead."));
}
function Ro() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  var e = "";
  if (process.env.NODE_ENV !== "production") {
    var i = function(n) {
      return n === void 0 ? "undefined" : n === 1 / 0 ? "Infinity" : n === -1 / 0 ? "-Infinity" : ta(n) ? "NaN" : n instanceof Date ? "Date(" + n.toISOString() + ")" : U(n) ? "function () { ... }" : R_(n) ? n + "" : null;
    };
    e = G(r, function(n) {
      if (z(n))
        return n;
      var a = i(n);
      if (a != null)
        return a;
      if (typeof JSON < "u" && JSON.stringify)
        try {
          return JSON.stringify(n, function(o, s) {
            var l = i(s);
            return l ?? s;
          });
        } catch {
          return "?";
        }
      else
        return "?";
    }).join(" ");
  }
  return e;
}
function Ht(r) {
  throw new Error(r);
}
function hc(r, t, e) {
  return (t - r) * e + r;
}
var Zp = "series\0", M1 = "\0_ec_\0";
function Nt(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function cc(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var vc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function wa(r) {
  return H(r) && !F(r) && !(r instanceof Date) ? r.value : r;
}
function E1(r) {
  return H(r) && !(r instanceof Array);
}
function P1(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = K();
  D(t, function(l, u) {
    if (!H(l)) {
      t[u] = null;
      return;
    }
    process.env.NODE_ENV !== "production" && (l.id != null && !pc(l.id) && dc(l.id), l.name != null && !pc(l.name) && dc(l.name));
  });
  var s = L1(r, o, e);
  return (i || n) && I1(s, r, o, t), i && O1(s, t), i || n ? R1(s, t, n) : a && N1(s, t), k1(s), s;
}
function L1(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Zi(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function I1(r, t, e, i) {
  D(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = zn(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        Z(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function O1(r, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Zi(e) && !Zi(a) && qp("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function R1(r, t, e) {
  D(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Zi(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !qp("id", i, n.existing));
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
function N1(r, t) {
  D(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function k1(r) {
  var t = K();
  D(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), D(r, function(e) {
    var i = e.newOption;
    Z(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (H(a)) {
      if (o.name = a.name != null ? zn(a.name) : n ? n.name : Zp + i, n)
        o.id = zn(n.id);
      else if (a.id != null)
        o.id = zn(a.id);
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
function qp(r, t, e) {
  var i = Pe(t[r], null), n = Pe(e[r], null);
  return i != null && n != null && i === n;
}
function zn(r) {
  if (process.env.NODE_ENV !== "production" && r == null)
    throw new Error();
  return Pe(r, "");
}
function Pe(r, t) {
  return r == null ? t : z(r) ? r : ct(r) || xo(r) ? r + "" : t;
}
function dc(r) {
  process.env.NODE_ENV !== "production" && Et("`" + r + "` is invalid id or name. Must be a string or number.");
}
function pc(r) {
  return xo(r) || Up(r);
}
function Kp(r) {
  var t = r.name;
  return !!(t && t.indexOf(Zp));
}
function Zi(r) {
  return r && r.id != null && zn(r.id).indexOf(M1) === 0;
}
function B1(r, t, e) {
  D(r, function(i) {
    var n = i.newOption;
    H(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = F1(t, n, i.existing, e));
  });
}
function F1(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function li(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return F(t.dataIndex) ? G(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return F(t.name) ? G(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function wt() {
  var r = "__ec_inner_" + V1++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var V1 = Yp();
function Js(r, t, e) {
  var i = yf(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, f) {
    var h = Sa(r, f, u, {
      useDefault: l === f,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[f + "Models"] = h.models, s[f + "Model"] = h.models[0];
  }), s;
}
function yf(r, t) {
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
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], f = u[1], h = (u[2] || "").toLowerCase();
    if (!(!f || !h || t && t.includeMainTypes && ut(t.includeMainTypes, f) < 0)) {
      o = o || !!f;
      var v = n.get(f) || n.set(f, {});
      v[h] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var ye = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function Sa(r, t, e, i) {
  i = i || ye;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (Z(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (Z(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function Qp(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function z1(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function H1(r) {
  return r === "auto" ? W.domSupported ? "html" : "richText" : r || "html";
}
function $1(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (ct(i)) {
    var o = hc(e || 0, i, n);
    return _t(o, a ? Math.max($e(e || 0), $e(i)) : t);
  } else {
    if (z(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, f = Math.max(l ? l.length : 0, u.length), h = 0; h < f; ++h) {
      var v = r.getDimensionInfo(h);
      if (v && v.type === "ordinal")
        s[h] = (n < 1 && l ? l : u)[h];
      else {
        var c = l && l[h] ? l[h] : 0, d = u[h], o = hc(c, d, n);
        s[h] = _t(o, a ? Math.max($e(c), $e(d)) : t);
      }
    }
    return s;
  }
}
var ot = wt(), G1 = function(r, t, e, i) {
  if (i) {
    var n = ot(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = ot(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, gc = 1, mc = {}, jp = wt(), _f = wt(), wf = 0, us = 1, fs = 2, Ie = ["emphasis", "blur", "select"], yc = ["normal", "emphasis", "blur", "select"], W1 = 10, U1 = 9, ri = "highlight", ho = "downplay", Hn = "select", co = "unselect", $n = "toggleSelect";
function gi(r) {
  return r != null && r !== "none";
}
function hs(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function Jp(r) {
  hs(r, "emphasis", fs);
}
function tg(r) {
  r.hoverState === fs && hs(r, "normal", wf);
}
function Sf(r) {
  hs(r, "blur", us);
}
function eg(r) {
  r.hoverState === us && hs(r, "normal", wf);
}
function Y1(r) {
  r.selected = !0;
}
function X1(r) {
  r.selected = !1;
}
function _c(r, t, e) {
  t(r, e);
}
function je(r, t, e) {
  _c(r, t, e), r.isGroup && r.traverse(function(i) {
    _c(i, t, e);
  });
}
function wc(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = fs;
      break;
    case "normal":
      r.hoverState = wf;
      break;
    case "blur":
      r.hoverState = us;
      break;
    case "select":
      r.selected = !0;
  }
}
function Z1(r, t, e, i) {
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
function q1(r, t, e, i) {
  var n = e && ut(e, "select") >= 0, a = !1;
  if (r instanceof nt) {
    var o = jp(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (gi(s) || gi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = N({}, i), u = N({}, u), u.fill = s) : !gi(u.fill) && gi(s) ? (a = !0, i = N({}, i), u = N({}, u), u.fill = Gh(s)) : !gi(u.stroke) && gi(l) && (a || (i = N({}, i), u = N({}, u)), u.stroke = Gh(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = N({}, i));
    var f = r.z2EmphasisLift;
    i.z2 = r.z2 + (f ?? W1);
  }
  return i;
}
function K1(r, t, e) {
  if (e && e.z2 == null) {
    e = N({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? U1);
  }
  return e;
}
function Q1(r, t, e) {
  var i = ut(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : Z1(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = N({}, e), o = N({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function tl(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return q1(this, r, t, e);
    if (r === "blur")
      return Q1(this, r, e);
    if (r === "select")
      return K1(this, r, e);
  }
  return e;
}
function j1(r) {
  r.stateProxy = tl;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = tl), e && (e.stateProxy = tl);
}
function Sc(r, t) {
  !ag(r, t) && !r.__highByOuter && je(r, Jp);
}
function bc(r, t) {
  !ag(r, t) && !r.__highByOuter && je(r, tg);
}
function No(r, t) {
  r.__highByOuter |= 1 << (t || 0), je(r, Jp);
}
function ko(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && je(r, tg);
}
function J1(r) {
  je(r, Sf);
}
function rg(r) {
  je(r, eg);
}
function ig(r) {
  je(r, Y1);
}
function ng(r) {
  je(r, X1);
}
function ag(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function og(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = _f(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      eg(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), D(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function cu(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, f) {
    for (var h = 0; h < f.length; h++) {
      var v = u.getItemGraphicEl(f[h]);
      v && rg(v);
    }
  }
  if (r != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(r), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var f = o === u, h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var v = h && s ? h === s : f;
      if (!// Not blur other series if blurScope series
      (e === "series" && !f || e === "coordinateSystem" && !v || t === "series" && f)) {
        var c = i.getViewOfSeriesModel(u);
        if (c.group.traverse(function(p) {
          p.__highByOuter && f && t === "self" || Sf(p);
        }), Ut(t))
          a(u.getData(), t);
        else if (H(t))
          for (var d = ht(t), m = 0; m < d.length; m++)
            a(u.getData(d[m]), t[d[m]]);
        l.push(u), _f(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, f) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(f);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function vu(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      _f(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        Sf(a);
      });
    }
  }
}
function tw(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (!n) {
    process.env.NODE_ENV !== "production" && Lt("Unknown dataType " + t.dataType);
    return;
  }
  var a = li(n, t);
  a = (F(a) ? a[0] : a) || 0;
  var o = n.getItemGraphicEl(a);
  if (!o)
    for (var s = n.count(), l = 0; !o && l < s; )
      o = n.getItemGraphicEl(l++);
  if (o) {
    var u = ot(o);
    cu(i, u.focus, u.blurScope, e);
  } else {
    var f = r.get(["emphasis", "focus"]), h = r.get(["emphasis", "blurScope"]);
    f != null && cu(i, f, h, e);
  }
}
function bf(r, t, e, i) {
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
    if (process.env.NODE_ENV !== "production" && !qi(s[u]) && Lt("param should be highDownDispatcher"), ot(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function ew(r, t, e) {
  process.env.NODE_ENV !== "production" && !qi(r) && Lt("param should be highDownDispatcher");
  var i = ot(r), n = bf(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && vu(i.componentMainType, i.componentIndex, e), D(a, function(s) {
    return Sc(s, t);
  })) : (cu(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && vu(i.componentMainType, i.componentIndex, e), Sc(r, t));
}
function rw(r, t, e) {
  process.env.NODE_ENV !== "production" && !qi(r) && Lt("param should be highDownDispatcher"), og(e);
  var i = ot(r), n = bf(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? D(n, function(a) {
    return bc(a, t);
  }) : bc(r, t);
}
function iw(r, t, e) {
  if (pu(t)) {
    var i = t.dataType, n = r.getData(i), a = li(n, t);
    F(a) || (a = [a]), r[t.type === $n ? "toggleSelect" : t.type === Hn ? "select" : "unselect"](a, i);
  }
}
function xc(r) {
  var t = r.getAllData();
  D(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? ig(a) : ng(a);
    });
  });
}
function nw(r) {
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
function aw(r, t, e) {
  sg(r, !0), je(r, j1), sw(r, t, e);
}
function ow(r) {
  sg(r, !1);
}
function Bo(r, t, e, i) {
  i ? ow(r) : aw(r, t, e);
}
function sw(r, t, e) {
  var i = ot(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var Tc = ["emphasis", "blur", "select"], lw = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function du(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < Tc.length; n++) {
    var a = Tc[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[lw[e]]();
  }
}
function sg(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function qi(r) {
  return !!(r && r.__highDownDispatcher);
}
function uw(r) {
  var t = mc[r];
  return t == null && gc <= 32 && (t = mc[r] = gc++), t;
}
function pu(r) {
  var t = r.type;
  return t === Hn || t === co || t === $n;
}
function Cc(r) {
  var t = r.type;
  return t === ri || t === ho;
}
function fw(r) {
  var t = jp(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var mi = si.CMD, hw = [[], [], []], Dc = Math.sqrt, cw = Math.atan2;
function vw(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, f = mi.M, h = mi.C, v = mi.L, c = mi.R, d = mi.A, m = mi.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case f:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case m:
          a = 2;
          break;
        case d:
          var p = t[4], g = t[5], y = Dc(t[0] * t[0] + t[1] * t[1]), _ = Dc(t[2] * t[2] + t[3] * t[3]), w = cw(-t[1] / _, t[0] / y);
          e[o] *= y, e[o++] += p, e[o] *= _, e[o++] += g, e[o++] *= y, e[o++] *= _, e[o++] += w, e[o++] += w, o += 2, s = o;
          break;
        case c:
          u[0] = e[o++], u[1] = e[o++], fe(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], fe(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var b = hw[l];
        b[0] = e[o++], b[1] = e[o++], fe(b, b, t), e[s++] = b[0], e[s++] = b[1];
      }
    }
    r.increaseVersion();
  }
}
var el = Math.sqrt, Ba = Math.sin, Fa = Math.cos, dn = Math.PI;
function Ac(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function gu(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (Ac(r) * Ac(t));
}
function Mc(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(gu(r, t));
}
function Ec(r, t, e, i, n, a, o, s, l, u, f) {
  var h = l * (dn / 180), v = Fa(h) * (r - e) / 2 + Ba(h) * (t - i) / 2, c = -1 * Ba(h) * (r - e) / 2 + Fa(h) * (t - i) / 2, d = v * v / (o * o) + c * c / (s * s);
  d > 1 && (o *= el(d), s *= el(d));
  var m = (n === a ? -1 : 1) * el((o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) / (o * o * (c * c) + s * s * (v * v))) || 0, p = m * o * c / s, g = m * -s * v / o, y = (r + e) / 2 + Fa(h) * p - Ba(h) * g, _ = (t + i) / 2 + Ba(h) * p + Fa(h) * g, w = Mc([1, 0], [(v - p) / o, (c - g) / s]), b = [(v - p) / o, (c - g) / s], S = [(-1 * v - p) / o, (-1 * c - g) / s], x = Mc(b, S);
  if (gu(b, S) <= -1 && (x = dn), gu(b, S) >= 1 && (x = 0), x < 0) {
    var C = Math.round(x / dn * 1e6) / 1e6;
    x = dn * 2 + C % 2 * dn;
  }
  f.addData(u, y, _, o, s, w, x, h, a);
}
var dw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, pw = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function gw(r) {
  var t = new si();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = si.CMD, l = r.match(dw);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var f = l[u], h = f.charAt(0), v = void 0, c = f.match(pw) || [], d = c.length, m = 0; m < d; m++)
      c[m] = parseFloat(c[m]);
    for (var p = 0; p < d; ) {
      var g = void 0, y = void 0, _ = void 0, w = void 0, b = void 0, S = void 0, x = void 0, C = e, A = i, M = void 0, T = void 0;
      switch (h) {
        case "l":
          e += c[p++], i += c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "L":
          e = c[p++], i = c[p++], v = s.L, t.addData(v, e, i);
          break;
        case "m":
          e += c[p++], i += c[p++], v = s.M, t.addData(v, e, i), n = e, a = i, h = "l";
          break;
        case "M":
          e = c[p++], i = c[p++], v = s.M, t.addData(v, e, i), n = e, a = i, h = "L";
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
          g = e, y = i, M = t.len(), T = t.data, o === s.C && (g += e - T[M - 4], y += i - T[M - 3]), v = s.C, C = c[p++], A = c[p++], e = c[p++], i = c[p++], t.addData(v, g, y, C, A, e, i);
          break;
        case "s":
          g = e, y = i, M = t.len(), T = t.data, o === s.C && (g += e - T[M - 4], y += i - T[M - 3]), v = s.C, C = e + c[p++], A = i + c[p++], e += c[p++], i += c[p++], t.addData(v, g, y, C, A, e, i);
          break;
        case "Q":
          C = c[p++], A = c[p++], e = c[p++], i = c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "q":
          C = c[p++] + e, A = c[p++] + i, e += c[p++], i += c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "T":
          g = e, y = i, M = t.len(), T = t.data, o === s.Q && (g += e - T[M - 4], y += i - T[M - 3]), e = c[p++], i = c[p++], v = s.Q, t.addData(v, g, y, e, i);
          break;
        case "t":
          g = e, y = i, M = t.len(), T = t.data, o === s.Q && (g += e - T[M - 4], y += i - T[M - 3]), e += c[p++], i += c[p++], v = s.Q, t.addData(v, g, y, e, i);
          break;
        case "A":
          _ = c[p++], w = c[p++], b = c[p++], S = c[p++], x = c[p++], C = e, A = i, e = c[p++], i = c[p++], v = s.A, Ec(C, A, e, i, S, x, _, w, b, v, t);
          break;
        case "a":
          _ = c[p++], w = c[p++], b = c[p++], S = c[p++], x = c[p++], C = e, A = i, e += c[p++], i += c[p++], v = s.A, Ec(C, A, e, i, S, x, _, w, b, v, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var lg = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(nt);
function ug(r) {
  return r.setData != null;
}
function fg(r, t) {
  var e = gw(r), i = N({}, t);
  return i.buildPath = function(n) {
    if (ug(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    vw(e, n), this.dirtyShape();
  }, i;
}
function mw(r, t) {
  return new lg(fg(r, t));
}
function yw(r, t) {
  var e = fg(r, t), i = function(n) {
    B(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(lg);
  return i;
}
function _w(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new nt(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (ug(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var Bt = function(r) {
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
    if (e && (e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), process.env.NODE_ENV !== "production" && e.__hostTarget))
      throw "This elemenet has been used as an attachment";
    return this;
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
    for (var i = new et(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), f = l.getLocalTransform(a);
        f ? (et.applyTransform(i, u, f), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(as);
Bt.prototype.type = "group";
var ww = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), cs = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new ww();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(nt);
cs.prototype.type = "circle";
var Sw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), xf = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Sw();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, f = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o), e.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o), e.closePath();
  }, t;
}(nt);
xf.prototype.type = "ellipse";
var hg = Math.PI, rl = hg * 2, zr = Math.sin, yi = Math.cos, bw = Math.acos, Tt = Math.atan2, Pc = Math.abs, Gn = Math.sqrt, Ln = Math.max, De = Math.min, pe = 1e-4;
function xw(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, v = h * l - f * u;
  if (!(v * v < pe))
    return v = (f * (t - a) - h * (r - n)) / v, [r + v * l, t + v * u];
}
function Va(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / Gn(s * s + l * l), f = u * l, h = -u * s, v = r + f, c = t + h, d = e + f, m = i + h, p = (v + d) / 2, g = (c + m) / 2, y = d - v, _ = m - c, w = y * y + _ * _, b = n - a, S = v * m - d * c, x = (_ < 0 ? -1 : 1) * Gn(Ln(0, b * b * w - S * S)), C = (S * _ - y * x) / w, A = (-S * y - _ * x) / w, M = (S * _ + y * x) / w, T = (-S * y + _ * x) / w, E = C - p, P = A - g, L = M - p, I = T - g;
  return E * E + P * P > L * L + I * I && (C = M, A = T), {
    cx: C,
    cy: A,
    x0: -f,
    y0: -h,
    x1: C * (n / b - 1),
    y1: A * (n / b - 1)
  };
}
function Tw(r) {
  var t;
  if (F(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function Cw(r, t) {
  var e, i = Ln(t.r, 0), n = Ln(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = t.cx, h = t.cy, v = !!t.clockwise, c = Pc(u - l), d = c > rl && c % rl;
      if (d > pe && (c = d), !(i > pe))
        r.moveTo(f, h);
      else if (c > rl - pe)
        r.moveTo(f + i * yi(l), h + i * zr(l)), r.arc(f, h, i, l, u, !v), n > pe && (r.moveTo(f + n * yi(u), h + n * zr(u)), r.arc(f, h, n, u, l, v));
      else {
        var m = void 0, p = void 0, g = void 0, y = void 0, _ = void 0, w = void 0, b = void 0, S = void 0, x = void 0, C = void 0, A = void 0, M = void 0, T = void 0, E = void 0, P = void 0, L = void 0, I = i * yi(l), O = i * zr(l), V = n * yi(u), R = n * zr(u), k = c > pe;
        if (k) {
          var $ = t.cornerRadius;
          $ && (e = Tw($), m = e[0], p = e[1], g = e[2], y = e[3]);
          var X = Pc(i - n) / 2;
          if (_ = De(X, g), w = De(X, y), b = De(X, m), S = De(X, p), A = x = Ln(_, w), M = C = Ln(b, S), (x > pe || C > pe) && (T = i * yi(u), E = i * zr(u), P = n * yi(l), L = n * zr(l), c < hg)) {
            var Q = xw(I, O, P, L, T, E, V, R);
            if (Q) {
              var at = I - Q[0], ft = O - Q[1], gt = T - Q[0], ve = E - Q[1], xr = 1 / zr(bw((at * gt + ft * ve) / (Gn(at * at + ft * ft) * Gn(gt * gt + ve * ve))) / 2), hi = Gn(Q[0] * Q[0] + Q[1] * Q[1]);
              A = De(x, (i - hi) / (xr + 1)), M = De(C, (n - hi) / (xr - 1));
            }
          }
        }
        if (!k)
          r.moveTo(f + I, h + O);
        else if (A > pe) {
          var Xt = De(g, A), bt = De(y, A), Y = Va(P, L, I, O, i, Xt, v), j = Va(T, E, V, R, i, bt, v);
          r.moveTo(f + Y.cx + Y.x0, h + Y.cy + Y.y0), A < x && Xt === bt ? r.arc(f + Y.cx, h + Y.cy, A, Tt(Y.y0, Y.x0), Tt(j.y0, j.x0), !v) : (Xt > 0 && r.arc(f + Y.cx, h + Y.cy, Xt, Tt(Y.y0, Y.x0), Tt(Y.y1, Y.x1), !v), r.arc(f, h, i, Tt(Y.cy + Y.y1, Y.cx + Y.x1), Tt(j.cy + j.y1, j.cx + j.x1), !v), bt > 0 && r.arc(f + j.cx, h + j.cy, bt, Tt(j.y1, j.x1), Tt(j.y0, j.x0), !v));
        } else
          r.moveTo(f + I, h + O), r.arc(f, h, i, l, u, !v);
        if (!(n > pe) || !k)
          r.lineTo(f + V, h + R);
        else if (M > pe) {
          var Xt = De(m, M), bt = De(p, M), Y = Va(V, R, T, E, n, -bt, v), j = Va(I, O, P, L, n, -Xt, v);
          r.lineTo(f + Y.cx + Y.x0, h + Y.cy + Y.y0), M < C && Xt === bt ? r.arc(f + Y.cx, h + Y.cy, M, Tt(Y.y0, Y.x0), Tt(j.y0, j.x0), !v) : (bt > 0 && r.arc(f + Y.cx, h + Y.cy, bt, Tt(Y.y0, Y.x0), Tt(Y.y1, Y.x1), !v), r.arc(f, h, n, Tt(Y.cy + Y.y1, Y.cx + Y.x1), Tt(j.cy + j.y1, j.cx + j.x1), v), Xt > 0 && r.arc(f + j.cx, h + j.cy, Xt, Tt(j.y1, j.x1), Tt(j.y0, j.x0), !v));
        } else
          r.lineTo(f + V, h + R), r.arc(f, h, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var Dw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), rn = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Dw();
  }, t.prototype.buildPath = function(e, i) {
    Cw(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(nt);
rn.prototype.type = "sector";
var Aw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), Tf = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Aw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(nt);
Tf.prototype.type = "ring";
function Mw(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, f, h;
  if (i) {
    f = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var v = 0, c = r.length; v < c; v++)
      Li(f, f, r[v]), Ii(h, h, r[v]);
    Li(f, f, i[0]), Ii(h, h, i[1]);
  }
  for (var v = 0, c = r.length; v < c; v++) {
    var d = r[v];
    if (e)
      l = r[v ? v - 1 : c - 1], u = r[(v + 1) % c];
    else if (v === 0 || v === c - 1) {
      n.push(v0(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    d0(a, u, l), Os(a, a, t);
    var m = tu(d, l), p = tu(d, u), g = m + p;
    g !== 0 && (m /= g, p /= g), Os(o, a, -m), Os(s, a, p);
    var y = Oh([], d, o), _ = Oh([], d, s);
    i && (Ii(y, y, f), Li(y, y, h), Ii(_, _, f), Li(_, _, h)), n.push(y), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function cg(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Mw(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], f = n[(s + 1) % o];
        r.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, h = n.length; s < h; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var Ew = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Cf = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ew();
  }, t.prototype.buildPath = function(e, i) {
    cg(e, i, !0);
  }, t;
}(nt);
Cf.prototype.type = "polygon";
var Pw = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Df = function(r) {
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
    return new Pw();
  }, t.prototype.buildPath = function(e, i) {
    cg(e, i, !1);
  }, t;
}(nt);
Df.prototype.type = "polyline";
var Lw = {}, Iw = /* @__PURE__ */ function() {
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
    return new Iw();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = zp(Lw, i, this.style);
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
}(nt);
wr.prototype.type = "line";
var Ft = [], Ow = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function Lc(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? Bh : xt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? Bh : xt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? Fh : zt)(r.x1, r.cpx1, r.x2, t),
    (e ? Fh : zt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var Af = function(r) {
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
    return new Ow();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, f = i.cpx2, h = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), f == null || h == null ? (v < 1 && (Mo(n, l, o, v, Ft), l = Ft[1], o = Ft[2], Mo(a, u, s, v, Ft), u = Ft[1], s = Ft[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Ao(n, l, f, o, v, Ft), l = Ft[1], f = Ft[2], o = Ft[3], Ao(a, u, h, s, v, Ft), u = Ft[1], h = Ft[2], s = Ft[3]), e.bezierCurveTo(l, u, f, h, o, s)));
  }, t.prototype.pointAt = function(e) {
    return Lc(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = Lc(this.shape, e, !0);
    return m0(i, i);
  }, t;
}(nt);
Af.prototype.type = "bezier-curve";
var Rw = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), vs = function(r) {
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
    return new Rw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, f = Math.cos(s), h = Math.sin(s);
    e.moveTo(f * o + n, h * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
}(nt);
vs.prototype.type = "arc";
var Nw = function(r) {
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
    return this._updatePathDirty.call(this), nt.prototype.getBoundingRect.call(this);
  }, t;
}(nt), vg = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), dg = function(r) {
  B(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(vg), kw = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(vg), Hr = [0, 0], $r = [0, 0], za = new lt(), Ha = new lt(), Fo = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new lt();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new lt();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    lt.sub(n[0], i[1], i[0]), lt.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return za.set(1 / 0, 1 / 0), Ha.set(0, 0), !this._intersectCheckOneSide(this, t, za, Ha, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, za, Ha, n, -1) && (i = !1, n) || n || lt.copy(e, i ? za : Ha), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, Hr), this._getProjMinMaxOnAxis(l, e._corners, $r), Hr[1] < $r[0] || Hr[0] > $r[1]) {
        if (s = !1, a)
          return s;
        var f = Math.abs($r[0] - Hr[1]), h = Math.abs(Hr[0] - $r[1]);
        Math.min(f, h) > n.len() && (f < h ? lt.scale(n, u, -f * o) : lt.scale(n, u, h * o));
      } else if (i) {
        var f = Math.abs($r[0] - Hr[1]), h = Math.abs(Hr[0] - $r[1]);
        Math.min(f, h) < i.len() && (f < h ? lt.scale(i, u, f * o) : lt.scale(i, u, -h * o));
      }
    }
    return s;
  }, r.prototype._getProjMinMaxOnAxis = function(t, e, i) {
    for (var n = this._axes[t], a = this._origin, o = e[0].dot(n) + a[t], s = o, l = o, u = 1; u < e.length; u++) {
      var f = e[u].dot(n) + a[t];
      s = Math.min(f, s), l = Math.max(f, l);
    }
    i[0] = s, i[1] = l;
  }, r;
}(), Bw = [], Fw = function(r) {
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
      for (var e = new et(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(Bw)), e.union(a);
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
}(_a), Vw = wt();
function zw(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, f = void 0, h = void 0;
    i ? (u = q(i.duration, 200), f = q(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), f = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (f = a.easing), a.delay != null && (h = a.delay)), U(h) && (h = h(e, n)), U(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: h,
      easing: f
    };
    return v;
  } else
    return null;
}
function Mf(r, t, e, i, n, a, o) {
  var s = !1, l;
  U(n) ? (o = a, a = n, n = null) : H(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var f = zw(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (f && f.duration > 0) {
    var h = f.duration, v = f.delay, c = f.easing, d = {
      duration: h,
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
function he(r, t, e, i, n, a) {
  Mf("update", r, t, e, i, n, a);
}
function Ze(r, t, e, i, n, a) {
  Mf("enter", r, t, e, i, n, a);
}
function Wn(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Vo(r, t, e, i, n, a) {
  Wn(r) || Mf("leave", r, t, e, i, n, a);
}
function Ic(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Vo(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function mu(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || Ic(n, t, e, i);
  }) : Ic(r, t, e, i);
}
function pg(r) {
  Vw(r).oldStyle = r.style;
}
var zo = Math.max, Ho = Math.min, yu = {};
function Hw(r) {
  return nt.extend(r);
}
var $w = yw;
function Gw(r, t) {
  return $w(r, t);
}
function be(r, t) {
  yu[r] = t;
}
function Ww(r) {
  if (yu.hasOwnProperty(r))
    return yu[r];
}
function Ef(r, t, e, i) {
  var n = mw(r, t);
  return e && (i === "center" && (e = mg(e, n.getBoundingRect())), yg(n, e)), n;
}
function gg(r, t, e) {
  var i = new Sr({
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
        i.setStyle(mg(t, a));
      }
    }
  });
  return i;
}
function mg(r, t) {
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
var Uw = _w;
function yg(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function ia(r, t) {
  return zp(r, r, {
    lineWidth: t
  }), r;
}
function Yw(r) {
  return Hp(r.shape, r.shape, r.style), r;
}
var Xw = Kr;
function Zw(r, t) {
  for (var e = ff([]); r && r !== t; )
    Fi(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function Pf(r, t, e) {
  return t && !Ut(t) && (t = pf.getLocalTransform(t)), e && (t = cf([], t)), fe([], r, t);
}
function qw(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = Pf(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Oc(r) {
  return !r.isGroup;
}
function Kw(r) {
  return r.shape != null;
}
function _g(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      Oc(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return Kw(o) && (s.shape = N({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (Oc(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), he(o, l, e, ot(o).dataIndex);
      }
    }
  });
}
function Qw(r, t) {
  return G(r, function(e) {
    var i = e[0];
    i = zo(i, t.x), i = Ho(i, t.x + t.width);
    var n = e[1];
    return n = zo(n, t.y), n = Ho(n, t.y + t.height), [i, n];
  });
}
function jw(r, t) {
  var e = zo(r.x, t.x), i = Ho(r.x + r.width, t.x + t.width), n = zo(r.y, t.y), a = Ho(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function wg(r, t, e) {
  var i = N({
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
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), st(n, e), new Sr(i)) : Ef(r.replace("path://", ""), i, e, "center");
}
function Jw(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Sg(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Sg(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, v = il(f, h, l, u);
  if (tS(v))
    return !1;
  var c = r - n, d = t - a, m = il(c, d, l, u) / v;
  if (m < 0 || m > 1)
    return !1;
  var p = il(c, d, f, h) / v;
  return !(p < 0 || p > 1);
}
function il(r, t, e, i) {
  return r * i - e * t;
}
function tS(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function Lf(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = z(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && D(ht(l), function(f) {
    Xi(s, f) || (s[f] = l[f], s.$vars.push(f));
  });
  var u = ot(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: st({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function Rc(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function ds(r, t) {
  if (r)
    if (F(r))
      for (var e = 0; e < r.length; e++)
        Rc(r[e], t);
    else
      Rc(r, t);
}
be("circle", cs);
be("ellipse", xf);
be("sector", rn);
be("ring", Tf);
be("polygon", Cf);
be("polyline", Df);
be("rect", Pt);
be("line", wr);
be("bezierCurve", Af);
be("arc", vs);
const eS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: vs,
  BezierCurve: Af,
  BoundingRect: et,
  Circle: cs,
  CompoundPath: Nw,
  Ellipse: xf,
  Group: Bt,
  Image: Sr,
  IncrementalDisplayable: Fw,
  Line: wr,
  LinearGradient: dg,
  OrientedBoundingRect: Fo,
  Path: nt,
  Point: lt,
  Polygon: Cf,
  Polyline: Df,
  RadialGradient: kw,
  Rect: Pt,
  Ring: Tf,
  Sector: rn,
  Text: we,
  applyTransform: Pf,
  clipPointsByRect: Qw,
  clipRectByRect: jw,
  createIcon: wg,
  extendPath: Gw,
  extendShape: Hw,
  getShapeClass: Ww,
  getTransform: Zw,
  groupTransition: _g,
  initProps: Ze,
  isElementRemoved: Wn,
  lineLineIntersect: Sg,
  linePolygonIntersect: Jw,
  makeImage: gg,
  makePath: Ef,
  mergePath: Uw,
  registerShape: be,
  removeElement: Vo,
  removeElementWithFadeOut: mu,
  resizePath: yg,
  setTooltipConfig: Lf,
  subPixelOptimize: Xw,
  subPixelOptimizeLine: ia,
  subPixelOptimizeRect: Yw,
  transformDirection: qw,
  traverseElements: ds,
  updateProps: he
}, Symbol.toStringTag, { value: "Module" }));
var ps = {};
function rS(r, t) {
  for (var e = 0; e < Ie.length; e++) {
    var i = Ie[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function Nc(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = U(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ie.length; u++) {
    var f = Ie[u], h = t[f];
    l[f] = q(i ? i.getFormattedLabel(n, f, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function If(r, t, e, i) {
  e = e || ps;
  for (var n = r instanceof we, a = !1, o = 0; o < yc.length; o++) {
    var s = t[yc[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new we(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = Nc(e, t), f = t.normal, h = !!f.getShallow("show"), v = na(f, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(kc(f, e, !1));
    for (var o = 0; o < Ie.length; o++) {
      var c = Ie[o], s = t[c];
      if (s) {
        var d = l.ensureState(c), m = !!q(s.getShallow("show"), h);
        if (m !== h && (d.ignore = !m), d.style = na(s, i && i[c], e, !0, !n), d.style.text = u[c], !n) {
          var p = r.ensureState(c);
          p.textConfig = kc(s, e, !0);
        }
      }
    }
    l.silent = !!f.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !h, l.useStyle(v), l.dirty(), e.enableTextSetter && (ms(l).setLabelText = function(g) {
      var y = Nc(e, t, g);
      rS(l, y);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function gs(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < Ie.length; i++) {
    var n = Ie[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function na(r, t, e, i, n) {
  var a = {};
  return iS(a, r, e, i, n), t && N(a, t), a;
}
function kc(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = q(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function iS(r, t, e, i, n) {
  e = e || ps;
  var a = t.ecModel, o = a && a.option.textStyle, s = nS(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var f = t.getModel(["rich", u]);
        zc(l[u] = {}, f, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var h = t.get("overflow");
  h && (r.overflow = h);
  var v = t.get("minMargin");
  v != null && (r.margin = v), zc(r, t, o, e, i, n, !0, !1);
}
function nS(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || ps).rich;
    if (e) {
      t = t || {};
      for (var i = ht(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var Bc = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], Fc = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Vc = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function zc(r, t, e, i, n, a, o, s) {
  e = !n && e || ps;
  var l = i && i.inheritColor, u = t.getShallow("color"), f = t.getShallow("textBorderColor"), h = q(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (process.env.NODE_ENV !== "production" && u === "auto" && St("color: 'auto'", "color: 'inherit'"), l ? u = l : u = null), (f === "inherit" || f === "auto") && (process.env.NODE_ENV !== "production" && f === "auto" && St("color: 'auto'", "color: 'inherit'"), l ? f = l : f = null), a || (u = u || e.color, f = f || e.textBorderColor), u != null && (r.fill = u), f != null && (r.stroke = f);
  var v = q(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var c = q(t.getShallow("textBorderType"), e.textBorderType);
  c != null && (r.lineDash = c);
  var d = q(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  d != null && (r.lineDashOffset = d), !n && h == null && !s && (h = i && i.defaultOpacity), h != null && (r.opacity = h), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var m = 0; m < Bc.length; m++) {
    var p = Bc[m], g = q(t.getShallow(p), e[p]);
    g != null && (r[p] = g);
  }
  for (var m = 0; m < Fc.length; m++) {
    var p = Fc[m], g = t.getShallow(p);
    g != null && (r[p] = g);
  }
  if (r.verticalAlign == null) {
    var y = t.getShallow("baseline");
    y != null && (r.verticalAlign = y);
  }
  if (!o || !i.disableBox) {
    for (var m = 0; m < Vc.length; m++) {
      var p = Vc[m], g = t.getShallow(p);
      g != null && (r[p] = g);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (process.env.NODE_ENV !== "production" && r.backgroundColor === "auto" && St("backgroundColor: 'auto'", "backgroundColor: 'inherit'"), r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (process.env.NODE_ENV !== "production" && r.borderColor === "auto" && St("borderColor: 'auto'", "borderColor: 'inherit'"), r.borderColor = l);
  }
}
function aS(r, t) {
  var e = t && t.getModel("textStyle");
  return Me([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var ms = wt();
function oS(r, t, e, i) {
  if (r) {
    var n = ms(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var sS = ["textStyle", "color"], nl = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], al = new we(), lS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(sS) : null);
    }, r.prototype.getFont = function() {
      return aS({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < nl.length; i++)
        e[nl[i]] = this.getShallow(nl[i]);
      return al.useStyle(e), al.update(), al.getBoundingRect();
    }, r;
  }()
), bg = [
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
], uS = ea(bg), fS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return uS(this, t);
    }, r;
  }()
), xg = [
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
], hS = ea(xg), cS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return hS(this, t, e);
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
      return new t(J(this.option));
    }, r.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, r.prototype.resolveParentPath = function(t) {
      return t;
    }, r.prototype.isAnimationEnabled = function() {
      if (!W.node && this.option) {
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
uf(yt);
Z_(yt);
Ne(yt, fS);
Ne(yt, cS);
Ne(yt, J_);
Ne(yt, lS);
function pn(r) {
  return r == null ? 0 : r.length || 1;
}
function Hc(r) {
  return r;
}
var vS = (
  /** @class */
  function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || Hc, this._newKeyGetter = n || Hc, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = pn(l);
        if (u > 1) {
          var f = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(f, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, r.prototype._executeMultiple = function() {
      var t = this._old, e = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(e, n, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = i[l], f = n[l], h = pn(u), v = pn(f);
        if (h > 1 && v === 1)
          this._updateManyToOne && this._updateManyToOne(f, u), n[l] = null;
        else if (h === 1 && v > 1)
          this._updateOneToMany && this._updateOneToMany(f, u), n[l] = null;
        else if (h === 1 && v === 1)
          this._update && this._update(f, u), n[l] = null;
        else if (h > 1 && v > 1)
          this._updateManyToMany && this._updateManyToMany(f, u), n[l] = null;
        else if (h > 1)
          for (var c = 0; c < h; c++)
            this._remove && this._remove(u[c]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, r.prototype._performRestAdd = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = e[n], o = pn(a);
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
          var l = e[s], u = pn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  }()
), _u = K(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), ce = "original", Yt = "arrayRows", Be = "objectRows", Je = "keyedColumns", Ue = "typedArray", Tg = "unknown", Ye = "column", nn = "row", qt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, Cg = wt();
function dS(r) {
  Cg(r).datasetMap = K();
}
function pS(r, t, e) {
  var i = {}, n = Dg(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = Cg(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, f, h;
  r = r.slice(), D(r, function(m, p) {
    var g = H(m) ? m : r[p] = {
      name: m
    };
    g.type === "ordinal" && f == null && (f = p, h = d(g)), i[g.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: h,
    valueWayDim: 0
  });
  D(r, function(m, p) {
    var g = m.name, y = d(m);
    if (f == null) {
      var _ = v.valueWayDim;
      c(i[g], _, y), c(o, _, y), v.valueWayDim += y;
    } else if (f === p)
      c(i[g], 0, y), c(a, 0, y);
    else {
      var _ = v.categoryWayDim;
      c(i[g], _, y), c(o, _, y), v.categoryWayDim += y;
    }
  });
  function c(m, p, g) {
    for (var y = 0; y < g; y++)
      m.push(p + y);
  }
  function d(m) {
    var p = m.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function Dg(r) {
  var t = r.get("data", !0);
  if (!t)
    return Sa(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, ye).models[0];
}
function gS(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : Sa(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, ye).models;
}
function Ag(r, t) {
  return mS(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function mS(r, t, e, i, n, a) {
  var o, s = 5;
  if (kt(r))
    return qt.Not;
  var l, u;
  if (i) {
    var f = i[a];
    H(f) ? (l = f.name, u = f.type) : z(f) && (l = f);
  }
  if (u != null)
    return u === "ordinal" ? qt.Must : qt.Not;
  if (t === Yt) {
    var h = r;
    if (e === nn) {
      for (var v = h[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = w(v[n + c])) != null)
          return o;
    } else
      for (var c = 0; c < h.length && c < s; c++) {
        var d = h[n + c];
        if (d && (o = w(d[a])) != null)
          return o;
      }
  } else if (t === Be) {
    var m = r;
    if (!l)
      return qt.Not;
    for (var c = 0; c < m.length && c < s; c++) {
      var p = m[c];
      if (p && (o = w(p[l])) != null)
        return o;
    }
  } else if (t === Je) {
    var g = r;
    if (!l)
      return qt.Not;
    var v = g[l];
    if (!v || kt(v))
      return qt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = w(v[c])) != null)
        return o;
  } else if (t === ce)
    for (var y = r, c = 0; c < y.length && c < s; c++) {
      var p = y[c], _ = wa(p);
      if (!F(_))
        return qt.Not;
      if ((o = w(_[a])) != null)
        return o;
    }
  function w(b) {
    var S = z(b);
    if (b != null && Number.isFinite(Number(b)) && b !== "")
      return S ? qt.Might : qt.Not;
    if (S && b !== "-")
      return qt.Must;
  }
  return qt.Not;
}
var ys = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === Je ? {} : []), this.sourceFormat = t.sourceFormat || Tg, this.seriesLayoutBy = t.seriesLayoutBy || Ye, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && Ag(this, i) === qt.Must && (n.type = "ordinal");
        }
    }
    return r;
  }()
);
function Of(r) {
  return r instanceof ys;
}
function wu(r, t, e) {
  e = e || Eg(r);
  var i = t.seriesLayoutBy, n = _S(r, e, i, t.sourceHeader, t.dimensions), a = new ys({
    data: r,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: J(t)
  });
  return a;
}
function Mg(r) {
  return new ys({
    data: r,
    sourceFormat: kt(r) ? Ue : ce
  });
}
function yS(r) {
  return new ys({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: J(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function Eg(r) {
  var t = Tg;
  if (kt(r))
    t = Ue;
  else if (F(r)) {
    r.length === 0 && (t = Yt);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if (F(n) || kt(n)) {
          t = Yt;
          break;
        } else if (H(n)) {
          t = Be;
          break;
        }
      }
    }
  } else if (H(r)) {
    for (var a in r)
      if (Xi(r, a) && Ut(r[a])) {
        t = Je;
        break;
      }
  }
  return t;
}
function _S(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: $c(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Yt) {
    var s = r;
    i === "auto" || i == null ? Gc(function(u) {
      u != null && u !== "-" && (z(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = ct(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Gc(function(u, f) {
      n[f] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === nn ? s.length : s[0] ? s[0].length : null;
  } else if (t === Be)
    n || (n = wS(r));
  else if (t === Je)
    n || (n = [], D(r, function(u, f) {
      n.push(f);
    }));
  else if (t === ce) {
    var l = wa(r[0]);
    a = F(l) && l.length || 1;
  } else t === Ue && process.env.NODE_ENV !== "production" && Z(!!n, "dimensions must be given if data is TypedArray.");
  return {
    startIndex: o,
    dimensionsDefine: $c(n),
    dimensionsDetectedCount: a
  };
}
function wS(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return ht(e);
}
function $c(r) {
  if (r) {
    var t = K();
    return G(r, function(e, i) {
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
function Gc(r, t, e, i) {
  if (t === nn)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function Pg(r) {
  var t = r.sourceFormat;
  return t === Be || t === Je;
}
var Gr, Wr, Ur, Wc, Uc, Lg = (
  /** @class */
  function() {
    function r(t, e) {
      var i = Of(t) ? t : Mg(t);
      this._source = i;
      var n = this._data = i.data;
      if (i.sourceFormat === Ue) {
        if (process.env.NODE_ENV !== "production" && e == null)
          throw new Error("Typed array data must specify dimension size");
        this._offset = 0, this._dimSize = e, this._data = n;
      }
      Uc(this, n, i);
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
      Uc = function(o, s, l) {
        var u = l.sourceFormat, f = l.seriesLayoutBy, h = l.startIndex, v = l.dimensionsDefine, c = Wc[Rf(u, f)];
        if (process.env.NODE_ENV !== "production" && Z(c, "Invalide sourceFormat: " + u), N(o, c), u === Ue)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var d = Ig(u, f);
          o.getItem = pt(d, null, s, h, v);
          var m = Og(u, f);
          o.count = pt(m, null, s, h, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, f = u * o, h = 0; h < u; h++)
          s[h] = l[f + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var f = this._data, h = this._dimSize, v = 0; v < h; v++) {
          for (var c = u[v], d = c[0] == null ? 1 / 0 : c[0], m = c[1] == null ? -1 / 0 : c[1], p = s - o, g = l[v], y = 0; y < p; y++) {
            var _ = f[y * h + v];
            g[o + y] = _, _ < d && (d = _), _ > m && (m = _);
          }
          c[0] = d, c[1] = m;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Wc = (t = {}, t[Yt + "_" + Ye] = {
        pure: !0,
        appendData: a
      }, t[Yt + "_" + nn] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[Be] = {
        pure: !0,
        appendData: a
      }, t[Je] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          D(o, function(l, u) {
            for (var f = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              f.push(l[h]);
          });
        }
      }, t[ce] = {
        appendData: a
      }, t[Ue] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          process.env.NODE_ENV !== "production" && Z(kt(o), "Added data must be TypedArray if data in initialization is TypedArray"), this._data = o;
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
), Yc = function(r, t, e, i) {
  return r[i];
}, SS = (Gr = {}, Gr[Yt + "_" + Ye] = function(r, t, e, i) {
  return r[i + t];
}, Gr[Yt + "_" + nn] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Gr[Be] = Yc, Gr[Je] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name;
    if (process.env.NODE_ENV !== "production" && s == null)
      throw new Error();
    var l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Gr[ce] = Yc, Gr);
function Ig(r, t) {
  var e = SS[Rf(r, t)];
  return process.env.NODE_ENV !== "production" && Z(e, 'Do not support get item on "' + r + '", "' + t + '".'), e;
}
var Xc = function(r, t, e) {
  return r.length;
}, bS = (Wr = {}, Wr[Yt + "_" + Ye] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, Wr[Yt + "_" + nn] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, Wr[Be] = Xc, Wr[Je] = function(r, t, e) {
  var i = e[0].name;
  if (process.env.NODE_ENV !== "production" && i == null)
    throw new Error();
  var n = r[i];
  return n ? n.length : 0;
}, Wr[ce] = Xc, Wr);
function Og(r, t) {
  var e = bS[Rf(r, t)];
  return process.env.NODE_ENV !== "production" && Z(e, 'Do not support count on "' + r + '", "' + t + '".'), e;
}
var ol = function(r, t, e) {
  return r[t];
}, xS = (Ur = {}, Ur[Yt] = ol, Ur[Be] = function(r, t, e) {
  return r[e];
}, Ur[Je] = ol, Ur[ce] = function(r, t, e) {
  var i = wa(r);
  return i instanceof Array ? i[t] : i;
}, Ur[Ue] = ol, Ur);
function Rg(r) {
  var t = xS[r];
  return process.env.NODE_ENV !== "production" && Z(t, 'Do not support get value on "' + r + '".'), t;
}
function Rf(r, t) {
  return r === Yt ? r + "_" + t : r;
}
function Ki(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return Rg(a)(i, o, s);
      } else {
        var l = i;
        return a === ce && (l = wa(i)), l;
      }
    }
  }
}
var TS = (
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
function CS(r, t) {
  var e = {}, i = e.encode = {}, n = K(), a = [], o = [], s = {};
  D(r.dimensions, function(v) {
    var c = r.getDimensionInfo(v), d = c.coordDim;
    if (d) {
      process.env.NODE_ENV !== "production" && Z(_u.get(d) == null);
      var m = c.coordDimIndex;
      sl(i, d)[m] = v, c.isExtraCoord || (n.set(d, 1), AS(c.type) && (a[0] = v), sl(s, d)[m] = r.getDimensionIndex(c.name)), c.defaultTooltip && o.push(v);
    }
    _u.each(function(p, g) {
      var y = sl(i, g), _ = c.otherDims[g];
      _ != null && _ !== !1 && (y[_] = c.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, c) {
    var d = i[c];
    u[c] = d[0], l = l.concat(d);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = G(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var f = i.label;
  f && f.length && (a = f.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new TS(s, t), e;
}
function sl(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function DS(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function AS(r) {
  return !(r === "ordinal" || r === "time");
}
var vo = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.otherDims = {}, t != null && N(this, t);
    }
    return r;
  }()
);
function po(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !ct(r) && r != null && r !== "-" && (r = +Xe(r)), r == null || r === "" ? NaN : Number(r));
}
K({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +Xe(r);
  },
  trim: function(r) {
    return z(r) ? Me(r) : r;
  }
});
var MS = (
  /** @class */
  function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = ct(t) ? t : Oo(t), n = ct(e) ? e : Oo(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = z(t), l = z(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  }()
), _s = "undefined", ES = typeof Uint32Array === _s ? Array : Uint32Array, PS = typeof Uint16Array === _s ? Array : Uint16Array, Ng = typeof Int32Array === _s ? Array : Int32Array, Zc = typeof Float64Array === _s ? Array : Float64Array, kg = {
  float: Zc,
  int: Ng,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Zc
}, ll;
function _i(r) {
  return r > 65535 ? ES : PS;
}
function wi() {
  return [1 / 0, -1 / 0];
}
function LS(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function qc(r, t, e, i, n) {
  var a = kg[e || "float"];
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
var Su = (
  /** @class */
  function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = K();
    }
    return r.prototype.initData = function(t, e, i) {
      process.env.NODE_ENV !== "production" && Z(U(t.getItem) && U(t.count), "Invalid data provider."), this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = ll[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [];
      var o = Pg(n);
      this._dimensions = G(e, function(s) {
        return process.env.NODE_ENV !== "production" && o && Z(s.property != null), {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: s.type,
          property: s.property
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
      }, i.set(t, a), this._chunks[a] = new kg[e || "float"](this._rawCount), this._rawExtent[a] = wi(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = wi());
      for (var l = a[t], u = o; u < s; u++) {
        var f = i[u] = e.parseAndCollect(i[u]);
        isNaN(f) || (l[0] = Math.min(f, l[0]), l[1] = Math.max(f, l[1]));
      }
      n.ordinalMeta = e, n.ordinalOffset = s, n.type = "ordinal";
    }, r.prototype.getOrdinalMeta = function(t) {
      var e = this._dimensions[t], i = e.ordinalMeta;
      return i;
    }, r.prototype.getDimensionProperty = function(t) {
      var e = this._dimensions[t];
      return e && e.property;
    }, r.prototype.appendData = function(t) {
      process.env.NODE_ENV !== "production" && Z(!this._indices, "appendData can only be called on raw data.");
      var e = this._provider, i = this.count();
      e.appendData(t);
      var n = e.count();
      return e.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, r.prototype.appendValues = function(t, e) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e || 0), u = 0; u < a; u++) {
        var f = n[u];
        qc(i, u, f.type, l, !0);
      }
      for (var h = [], v = s; v < l; v++)
        for (var c = v - s, d = 0; d < a; d++) {
          var f = n[d], m = ll.arrayRows.call(this, t[c] || h, f.property, c, d);
          i[d][v] = m;
          var p = o[d];
          m < p[0] && (p[0] = m), m > p[1] && (p[1] = m);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = G(o, function(y) {
        return y.property;
      }), f = 0; f < s; f++) {
        var h = o[f];
        l[f] || (l[f] = wi()), qc(a, f, h.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], c = t; c < e; c++) {
          v = n.getItem(c, v);
          for (var d = 0; d < s; d++) {
            var m = a[d], p = this._dimValueGetter(v, u[d], c, d);
            m[c] = p;
            var g = l[d];
            p < g[0] && (g[0] = p), p > g[1] && (g[1] = p);
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
      for (var s = 1 / 0, l = -1, u = 0, f = 0, h = this.count(); f < h; f++) {
        var v = this.getRawIndex(f), c = e - a[v], d = Math.abs(c);
        d <= i && ((d < s || d === s && c >= 0 && l < 0) && (s = d, l = c, u = 0), c === l && (o[u++] = f));
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
        var i = _i(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = _i(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, f = t[0], h = i._chunks, v = 0; v < n; v++) {
        var c = void 0, d = i.getRawIndex(v);
        if (l === 0)
          c = e(v);
        else if (l === 1) {
          var m = h[f][d];
          c = e(m, v);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = h[t[p]][d];
          s[p] = v, c = e.apply(null, s);
        }
        c && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = ht(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = _i(e._rawCount), l = new s(o), u = 0, f = n[0], h = t[f][0], v = t[f][1], c = e._chunks, d = !1;
      if (!e._indices) {
        var m = 0;
        if (a === 1) {
          for (var p = c[n[0]], g = 0; g < i; g++) {
            var y = p[g];
            (y >= h && y <= v || isNaN(y)) && (l[u++] = m), m++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = c[n[0]], _ = c[n[1]], w = t[n[1]][0], b = t[n[1]][1], g = 0; g < i; g++) {
            var y = p[g], S = _[g];
            (y >= h && y <= v || isNaN(y)) && (S >= w && S <= b || isNaN(S)) && (l[u++] = m), m++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var g = 0; g < o; g++) {
            var x = e.getRawIndex(g), y = c[n[0]][x];
            (y >= h && y <= v || isNaN(y)) && (l[u++] = x);
          }
        else
          for (var g = 0; g < o; g++) {
            for (var C = !0, x = e.getRawIndex(g), A = 0; A < a; A++) {
              var M = n[A], y = c[M][x];
              (y < t[M][0] || y > t[M][1]) && (C = !1);
            }
            C && (l[u++] = e.getRawIndex(g));
          }
      return u < o && (e._indices = l), e._count = u, e._extent = [], e._updateGetRawIdx(), e;
    }, r.prototype.map = function(t, e) {
      var i = this.clone(t);
      return this._updateDims(i, t, e), i;
    }, r.prototype.modify = function(t, e) {
      this._updateDims(this, t, e);
    }, r.prototype._updateDims = function(t, e, i) {
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, f = 0; f < e.length; f++)
        u[e[f]] = wi();
      for (var h = 0; h < s; h++) {
        for (var v = t.getRawIndex(h), c = 0; c < o; c++)
          l[c] = n[e[c]][v];
        l[o] = h;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var f = 0; f < d.length; f++) {
            var m = e[f], p = d[f], g = u[m], y = n[m];
            y && (y[v] = p), p < g[0] && (g[0] = p), p > g[1] && (g[1] = p);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), f, h, v, c = new (_i(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      c[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var m = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), g = (p + m) / 2, y = 0, _ = m; _ < p; _++) {
          var w = this.getRawIndex(_), b = a[w];
          isNaN(b) || (y += b);
        }
        y /= p - m;
        var S = d, x = Math.min(d + l, o), C = d - 1, A = a[u];
        f = -1, v = S;
        for (var M = -1, T = 0, _ = S; _ < x; _++) {
          var w = this.getRawIndex(_), b = a[w];
          if (isNaN(b)) {
            T++, M < 0 && (M = w);
            continue;
          }
          h = Math.abs((C - g) * (b - A) - (C - _) * (y - A)), h > f && (f = h, v = w);
        }
        T > 0 && T < x - S && (c[s++] = Math.min(M, v), v = Math.max(M, v)), c[s++] = v, u = v;
      }
      return c[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = c, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (_i(this._rawCount))(Math.ceil(s / a) * 2), u = 0, f = 0; f < s; f += a) {
        var h = f, v = o[this.getRawIndex(h)], c = f, d = o[this.getRawIndex(c)], m = a;
        f + a > s && (m = s - f);
        for (var p = 0; p < m; p++) {
          var g = this.getRawIndex(f + p), y = o[g];
          y < v && (v = y, h = f + p), y > d && (d = y, c = f + p);
        }
        var _ = this.getRawIndex(h), w = this.getRawIndex(c);
        h < c ? (l[u++] = _, l[u++] = w) : (l[u++] = w, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], f = this.count(), h = a._rawExtent[t] = wi(), v = new (_i(this._rawCount))(Math.ceil(f / l)), c = 0, d = 0; d < f; d += l) {
        l > f - d && (l = f - d, s.length = l);
        for (var m = 0; m < l; m++) {
          var p = this.getRawIndex(d + m);
          s[m] = u[p];
        }
        var g = i(s), y = this.getRawIndex(Math.min(d + n(s, g) || 0, f - 1));
        u[y] = g, g < h[0] && (h[0] = g), g > h[1] && (h[1] = g), v[c++] = y;
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
      var e = this._chunks[t], i = wi();
      if (!e)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var f = this.getRawIndex(u), h = e[f];
        h < s && (s = h), h > l && (l = h);
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
      var i = new r(), n = this._chunks, a = t && tn(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? LS(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, r.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = J(this._extent), t._rawExtent = J(this._rawExtent);
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
        return po(e[a], this._dimensions[a]);
      }
      ll = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return po(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return po(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    }(), r;
  }()
), IS = wt(), OS = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Bg = (
  /** @class */
  function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = zg(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return q(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = Pg(this.source), i = !Hg(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, f = void 0, h = this.dimensions[s];
        if (h && h.storeDimIndex === o)
          l = e ? h.name : null, u = h.type, f = h.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = e ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: f
        }), e && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += OS[u] || "f", f && (n += f.uid), n += "$";
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
function Fg(r) {
  return r instanceof Bg;
}
function Vg(r) {
  for (var t = K(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = H(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function zg(r) {
  var t = IS(r);
  return t.dimNameMap || (t.dimNameMap = Vg(r.dimensionsDefine));
}
function Hg(r) {
  return r > 30;
}
var gn = H, ir = G, RS = typeof Int32Array > "u" ? Array : Int32Array, NS = "e\0\0", Kc = -1, kS = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], BS = ["_approximateExtent"], Qc, $a, mn, Si, ul, yn, fl, FS = (
  /** @class */
  function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      Fg(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, f = 0; f < i.length; f++) {
        var h = i[f], v = z(h) ? new vo({
          name: h
        }) : h instanceof vo ? h : new vo(h), c = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = c, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(c), a[c] = v, u[c] != null && (l = !0), v.createInvertedIndices && (s[c] = []), d.itemName === 0 && (this._nameDimIdx = f), d.itemId === 0 && (this._idDimIdx = f), process.env.NODE_ENV !== "production" && Z(n || v.storeDimIndex >= 0), n && (v.storeDimIndex = f);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var m = this._dimIdxToName = K();
        D(o, function(p) {
          m.set(a[p].storeDimIndex, p);
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
      if (ct(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, r.prototype._getStoreDimIndex = function(t) {
      var e = this.getDimensionIndex(t);
      if (process.env.NODE_ENV !== "production" && e == null)
        throw new Error("Unknown dimension " + t);
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
      if (t instanceof Su && (a = t), !a) {
        var o = this.dimensions, s = Of(t) || Ut(t) ? new Lg(t, o.length) : t;
        a = new Su();
        var l = ir(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = CS(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && fl(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Ue && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === ce;
        if (l && !n.pure)
          for (var u = [], f = t; f < e; f++) {
            var h = n.getItem(f, u);
            if (!this.hasItemOption && E1(h) && (this.hasItemOption = !0), h) {
              var v = h.name;
              a[f] == null && v != null && (a[f] = Pe(v, null));
              var c = h.id;
              o[f] == null && c != null && (o[f] = Pe(c, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var f = t; f < e; f++)
            fl(this, f);
        Qc(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      gn(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = mn(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return $a(this, this.getRawIndex(t));
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
      return F(t) ? n.getValues(ir(t, function(a) {
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
      var i = t && this._invertedIndicesMap[t];
      if (process.env.NODE_ENV !== "production" && !i)
        throw new Error("Do not supported yet");
      var n = i && i[e];
      return n == null || isNaN(n) ? Kc : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      U(t) && (i = e, e = t, t = []);
      var n = i || this, a = ir(Si(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? pt(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      U(t) && (i = e, e = t, t = []);
      var n = i || this, a = ir(Si(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? pt(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = ht(t);
      return D(n, function(a) {
        var o = e._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, r.prototype.mapArray = function(t, e, i) {
      U(t) && (i = e, e = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(e && e.apply(this, arguments));
      }, i), n;
    }, r.prototype.map = function(t, e, i, n) {
      var a = i || n || this, o = ir(Si(t), this._getStoreDimIndex, this), s = yn(this);
      return s._store = this._store.map(o, a ? pt(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = this, o = i || n || this;
      process.env.NODE_ENV !== "production" && D(Si(t), function(l) {
        var u = a.getDimensionInfo(l);
        u.isCalculationCoord || console.error("Danger: only stack dimension can be modified");
      });
      var s = ir(Si(t), this._getStoreDimIndex, this);
      this._store.modify(s, o ? pt(e, o) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = yn(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = yn(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = yn(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new yt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new vS(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return $a(t, i);
      }, function(i) {
        return $a(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, gn(t) ? N(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), F(a) ? a = a.slice() : gn(a) && (a = N({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, gn(e) ? N(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      gn(t) ? N(this._layout, t) : this._layout[t] = e;
    }, r.prototype.getLayout = function(t) {
      return this._layout[t];
    }, r.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, r.prototype.setItemLayout = function(t, e, i) {
      this._itemLayouts[t] = i ? N(this._itemLayouts[t] || {}, e) : e;
    }, r.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, r.prototype.setItemGraphicEl = function(t, e) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      G1(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      D(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : ir(this.dimensions, this._getDimInfo, this), this.hostModel)), ul(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      U(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(lf(arguments)));
      });
    }, r.internalField = function() {
      Qc = function(t) {
        var e = t._invertedIndicesMap;
        D(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new RS(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = Kc;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, mn = function(t, e, i) {
        return Pe(t._getCategory(e, i), null);
      }, $a = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = mn(t, t._idDimIdx, e)), i == null && (i = NS + e), i;
      }, Si = function(t) {
        return F(t) || (t = t != null ? [t] : []), t;
      }, yn = function(t) {
        var e = new r(t._schema ? t._schema : ir(t.dimensions, t._getDimInfo, t), t.hostModel);
        return ul(e, t), e;
      }, ul = function(t, e) {
        D(kS.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, D(BS, function(i) {
          t[i] = J(e[i]);
        }), t._calculationInfo = N({}, e._calculationInfo);
      }, fl = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = mn(t, a, e)), l == null && o != null && (n[e] = l = mn(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, f = u[s] = (u[s] || 0) + 1;
          l = s, f > 1 && (l += "__ec__" + f), n[e] = l;
        }
      };
    }(), r;
  }()
);
function VS(r, t) {
  Of(r) || (r = Mg(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = K(), a = [], o = HS(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && Hg(o), l = i === r.dimensionsDefine, u = l ? zg(r) : Vg(i), f = t.encodeDefine;
  !f && t.encodeDefaulter && (f = t.encodeDefaulter(r, o));
  for (var h = K(f), v = new Ng(o), c = 0; c < v.length; c++)
    v[c] = -1;
  function d(A) {
    var M = v[A];
    if (M < 0) {
      var T = i[A], E = H(T) ? T : {
        name: T
      }, P = new vo(), L = E.name;
      L != null && u.get(L) != null && (P.name = P.displayName = L), E.type != null && (P.type = E.type), E.displayName != null && (P.displayName = E.displayName);
      var I = a.length;
      return v[A] = I, P.storeDimIndex = A, a.push(P), P;
    }
    return a[M];
  }
  if (!s)
    for (var c = 0; c < o; c++)
      d(c);
  h.each(function(A, M) {
    var T = Nt(A).slice();
    if (T.length === 1 && !z(T[0]) && T[0] < 0) {
      h.set(M, !1);
      return;
    }
    var E = h.set(M, []);
    D(T, function(P, L) {
      var I = z(P) ? u.get(P) : P;
      I != null && I < o && (E[L] = I, p(d(I), M, L));
    });
  });
  var m = 0;
  D(e, function(A) {
    var M, T, E, P;
    if (z(A))
      M = A, P = {};
    else {
      P = A, M = P.name;
      var L = P.ordinalMeta;
      P.ordinalMeta = null, P = N({}, P), P.ordinalMeta = L, T = P.dimsDef, E = P.otherDims, P.name = P.coordDim = P.coordDimIndex = P.dimsDef = P.otherDims = null;
    }
    var I = h.get(M);
    if (I !== !1) {
      if (I = Nt(I), !I.length)
        for (var O = 0; O < (T && T.length || 1); O++) {
          for (; m < o && d(m).coordDim != null; )
            m++;
          m < o && I.push(m++);
        }
      D(I, function(V, R) {
        var k = d(V);
        if (l && P.type != null && (k.type = P.type), p(st(k, P), M, R), k.name == null && T) {
          var $ = T[R];
          !H($) && ($ = {
            name: $
          }), k.name = k.displayName = $.name, k.defaultTooltip = $.defaultTooltip;
        }
        E && st(k.otherDims, E);
      });
    }
  });
  function p(A, M, T) {
    _u.get(M) != null ? A.otherDims[M] = T : (A.coordDim = M, A.coordDimIndex = T, n.set(M, !0));
  }
  var g = t.generateCoord, y = t.generateCoordCount, _ = y != null;
  y = g ? y || 1 : 0;
  var w = g || "value";
  function b(A) {
    A.name == null && (A.name = A.coordDim);
  }
  if (s)
    D(a, function(A) {
      b(A);
    }), a.sort(function(A, M) {
      return A.storeDimIndex - M.storeDimIndex;
    });
  else
    for (var S = 0; S < o; S++) {
      var x = d(S), C = x.coordDim;
      C == null && (x.coordDim = $S(w, n, _), x.coordDimIndex = 0, (!g || y <= 0) && (x.isExtraCoord = !0), y--), b(x), x.type == null && (Ag(r, S) === qt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return zS(a), new Bg({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function zS(r) {
  for (var t = K(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function HS(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return D(t, function(a) {
    var o;
    H(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function $S(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var hl = {}, Nf = (
  /** @class */
  function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      D(hl, function(n, a) {
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
      hl[t] = e;
    }, r.get = function(t) {
      return hl[t];
    }, r;
  }()
), GS = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = K(), this.categoryAxisMap = K(), this.coordSysName = t;
    }
    return r;
  }()
);
function WS(r) {
  var t = r.get("coordinateSystem"), e = new GS(t), i = US[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var US = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", ye).models[0], a = r.getReferringComponents("yAxis", ye).models[0];
    if (process.env.NODE_ENV !== "production") {
      if (!n)
        throw new Error('xAxis "' + oi(r.get("xAxisIndex"), r.get("xAxisId"), 0) + '" not found');
      if (!a)
        throw new Error('yAxis "' + oi(r.get("xAxisIndex"), r.get("yAxisId"), 0) + '" not found');
    }
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), bi(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), bi(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", ye).models[0];
    if (process.env.NODE_ENV !== "production" && !n)
      throw new Error("singleAxis should be specified.");
    t.coordSysDims = ["single"], e.set("single", n), bi(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", ye).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    if (process.env.NODE_ENV !== "production") {
      if (!o)
        throw new Error("angleAxis option not found");
      if (!a)
        throw new Error("radiusAxis option not found");
    }
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), bi(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), bi(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    D(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), f = o[l];
      e.set(f, u), bi(u) && (i.set(f, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function bi(r) {
  return r.get("type") === "category";
}
function YS(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  XS(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, f, h, v;
  if (D(a, function(y, _) {
    z(y) && (a[_] = y = {
      name: y
    }), l && !y.isExtraCoord && (!i && !u && y.ordinalMeta && (u = y), !f && y.type !== "ordinal" && y.type !== "time" && (!n || n === y.coordDim) && (f = y));
  }), f && !i && !u && (i = !0), f) {
    h = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var c = f.coordDim, d = f.type, m = 0;
    D(a, function(y) {
      y.coordDim === c && m++;
    });
    var p = {
      name: h,
      coordDim: c,
      coordDimIndex: m,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, g = {
      name: v,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: v,
      coordDimIndex: m + 1,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(v, d), g.storeDimIndex = s.ensureCalculationDimension(h, d)), o.appendCalculationDimension(p), o.appendCalculationDimension(g)) : (a.push(p), a.push(g));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: h
  };
}
function XS(r) {
  return !Fg(r.schema);
}
function Qi(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function ZS(r, t) {
  return Qi(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function qS(r, t) {
  var e = r.get("coordinateSystem"), i = Nf.get(e), n;
  return t && t.coordSysDims && (n = G(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = DS(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function KS(r, t, e) {
  var i, n;
  return e && D(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function kf(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === ce;
  var o = WS(t), s = qS(t, o), l = e.useEncodeDefaulter, u = U(l) ? l : l ? Qt(pS, s, t) : null, f = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, h = VS(n, f), v = KS(h.dimensions, e.createInvertedIndices, o), c = a ? null : i.getSharedDataStore(h), d = YS(t, {
    schema: h,
    store: c
  }), m = new FS(h, t);
  m.setCalculationInfo(d);
  var p = v != null && QS(n) ? function(g, y, _, w) {
    return w === v ? _ : this.defaultDimValueGetter(g, y, _, w);
  } : null;
  return m.hasItemOption = !1, m.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : c,
    null,
    p
  ), m;
}
function QS(r) {
  if (r.sourceFormat === ce) {
    var t = jS(r.data || []);
    return !F(wa(t));
  }
}
function jS(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var JS = Math.round(Math.random() * 10);
function ws(r) {
  return [r || "", JS++].join("_");
}
function tb(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Ee(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Ee(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function eb(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), f = u.graph, h = u.noEntryList, v = {};
    for (D(a, function(y) {
      v[y] = !0;
    }); h.length; ) {
      var c = h.pop(), d = f[c], m = !!v[c];
      m && (s.call(l, c, d.originalDeps.slice()), delete v[c]), D(d.successor, m ? g : p);
    }
    D(v, function() {
      var y = "";
      throw process.env.NODE_ENV !== "production" && (y = Ro("Circular dependency may exists: ", v, a, o)), new Error(y);
    });
    function p(y) {
      f[y].entryCount--, f[y].entryCount === 0 && h.push(y);
    }
    function g(y) {
      v[y] = !0, p(y);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return D(a, function(l) {
      var u = i(o, l), f = u.originalDeps = t(l), h = n(f, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), D(h, function(v) {
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
function rb(r, t) {
  return it(it({}, r, !0), t, !0);
}
var ib = Math.log(2);
function bu(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / ib);
    return r[e][l];
  }
  for (var u = i | 1 << e, f = e + 1; i & 1 << f; )
    f++;
  for (var h = 0, v = 0, c = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (h += (c % 2 ? -1 : 1) * r[e][v] * bu(r, t - 1, f, u, n | d, a), c++);
  }
  return a[o] = h, h;
}
function jc(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = bu(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * bu(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, f) {
      var h = u * a[6] + f * a[7] + 1;
      l[0] = (u * a[0] + f * a[1] + a[2]) / h, l[1] = (u * a[3] + f * a[4] + a[5]) / h;
    };
  }
}
var Jc = "___zrEVENTSAVED", cl = [];
function nb(r, t, e, i, n) {
  return xu(cl, t, i, n, !0) && xu(r, e, cl[0], cl[1]);
}
function xu(r, t, e, i, n) {
  if (t.getBoundingClientRect && W.domSupported && !$g(t)) {
    var a = t[Jc] || (t[Jc] = {}), o = ab(t, a), s = ob(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function ab(r, t) {
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
function ob(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var f = r[u].getBoundingClientRect(), h = 2 * u, v = f.left, c = f.top;
    o.push(v, c), l = l && a && v === a[h] && c === a[h + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? jc(s, o) : jc(o, s));
}
function $g(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var sb = /([&<>"'])/g, lb = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function $t(r) {
  return r == null ? "" : (r + "").replace(sb, function(t, e) {
    return lb[e];
  });
}
const ub = {
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
}, fb = {
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
var $o = "ZH", Bf = "EN", Hi = Bf, go = {}, Ff = {}, Gg = W.domSupported ? function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Hi).toUpperCase()
  );
  return r.indexOf($o) > -1 ? $o : Hi;
}() : Hi;
function Wg(r, t) {
  r = r.toUpperCase(), Ff[r] = new yt(t), go[r] = t;
}
function hb(r) {
  if (z(r)) {
    var t = go[r.toUpperCase()] || {};
    return r === $o || r === Bf ? J(t) : it(J(t), J(go[Hi]), !1);
  } else
    return it(J(r), J(go[Hi]), !1);
}
function cb(r) {
  return Ff[r];
}
function vb() {
  return Ff[Hi];
}
Wg(Bf, ub);
Wg($o, fb);
var Vf = 1e3, zf = Vf * 60, Un = zf * 60, ue = Un * 24, tv = ue * 365, In = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Ga = "{yyyy}-{MM}-{dd}", ev = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Ga,
  hour: Ga + " " + In.hour,
  minute: Ga + " " + In.minute,
  second: Ga + " " + In.second,
  millisecond: In.none
}, vl = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Ug = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function nr(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function $i(r) {
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
function db(r) {
  return r === $i(r);
}
function pb(r) {
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
function Ss(r, t, e, i) {
  var n = Xe(r), a = n[Hf(e)](), o = n[Gi(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[bs(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), f = n[aa(e)](), h = (f - 1) % 12 + 1, v = n[xs(e)](), c = n[Ts(e)](), d = n[Cs(e)](), m = f >= 12 ? "pm" : "am", p = m.toUpperCase(), g = i instanceof yt ? i : cb(i || Gg) || vb(), y = g.getModel("time"), _ = y.get("month"), w = y.get("monthAbbr"), b = y.get("dayOfWeek"), S = y.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, m + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, nr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, w[o - 1]).replace(/{MM}/g, nr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, nr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, b[u]).replace(/{ee}/g, S[u]).replace(/{e}/g, u + "").replace(/{HH}/g, nr(f, 2)).replace(/{H}/g, f + "").replace(/{hh}/g, nr(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, nr(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, nr(c, 2)).replace(/{s}/g, c + "").replace(/{SSS}/g, nr(d, 3)).replace(/{S}/g, d + "");
}
function gb(r, t, e, i, n) {
  var a = null;
  if (z(e))
    a = e;
  else if (U(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = N({}, In);
    if (r.level > 0)
      for (var s = 0; s < vl.length; ++s)
        o[vl[s]] = "{primary|" + o[vl[s]] + "}";
    var l = e ? e.inherit === !1 ? e : st(e, o) : o, u = Yg(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var f = Ug.indexOf(u), s = f - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (F(a)) {
      var h = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      h = Math.min(h, a.length - 1), a = a[h];
    }
  }
  return Ss(new Date(r.value), a, n, i);
}
function Yg(r, t) {
  var e = Xe(r), i = e[Gi(t)]() + 1, n = e[bs(t)](), a = e[aa(t)](), o = e[xs(t)](), s = e[Ts(t)](), l = e[Cs(t)](), u = l === 0, f = u && s === 0, h = f && o === 0, v = h && a === 0, c = v && n === 1, d = c && i === 1;
  return d ? "year" : c ? "month" : v ? "day" : h ? "hour" : f ? "minute" : u ? "second" : "millisecond";
}
function rv(r, t, e) {
  var i = ct(r) ? Xe(r) : r;
  switch (t = t || Yg(r, e), t) {
    case "year":
      return i[Hf(e)]();
    case "half-year":
      return i[Gi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Gi(e)]() + 1) / 4);
    case "month":
      return i[Gi(e)]();
    case "day":
      return i[bs(e)]();
    case "half-day":
      return i[aa(e)]() / 24;
    case "hour":
      return i[aa(e)]();
    case "minute":
      return i[xs(e)]();
    case "second":
      return i[Ts(e)]();
    case "millisecond":
      return i[Cs(e)]();
  }
}
function Hf(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Gi(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function bs(r) {
  return r ? "getUTCDate" : "getDate";
}
function aa(r) {
  return r ? "getUTCHours" : "getHours";
}
function xs(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function Ts(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function Cs(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function mb(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function Xg(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function Zg(r) {
  return r ? "setUTCDate" : "setDate";
}
function qg(r) {
  return r ? "setUTCHours" : "setHours";
}
function Kg(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function Qg(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function jg(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function Jg(r) {
  if (!Up(r))
    return z(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function tm(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var $f = yp;
function Tu(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(f) {
    return f && Me(f) ? f : "-";
  }
  function a(f) {
    return !!(f != null && !isNaN(f) && isFinite(f));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? Xe(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Ss(l, i, e);
  }
  if (t === "ordinal")
    return xo(r) ? n(r) : ct(r) && a(r) ? r + "" : "-";
  var u = Oo(r);
  return a(u) ? Jg(u) : xo(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var iv = ["a", "b", "c", "d", "e", "f", "g"], dl = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function em(r, t, e) {
  F(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = iv[a];
    r = r.replace(dl(o), dl(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(dl(iv[l], s), e ? $t(u) : u);
    }
  return r;
}
function yb(r, t) {
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
function ui(r, t) {
  return t = t || "transparent", z(r) ? r : H(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var mo = D, _b = ["left", "right", "top", "bottom", "width", "height"], Wa = [["width", "left", "right"], ["height", "top", "bottom"]];
function rm(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var f = l.getBoundingRect(), h = t.childAt(u + 1), v = h && h.getBoundingRect(), c, d;
    if (r === "horizontal") {
      var m = f.width + (v ? -v.x + f.x : 0);
      c = a + m, c > i || l.newline ? (a = 0, c = m, o += s + e, s = f.height) : s = Math.max(s, f.height);
    } else {
      var p = f.height + (v ? -v.y + f.y : 0);
      d = o + p, d > n || l.newline ? (a += s + e, o = 0, d = p, s = f.width) : s = Math.max(s, f.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = c + e : o = d + e);
  });
}
Qt(rm, "vertical");
Qt(rm, "horizontal");
function im(r, t, e) {
  e = $f(e || 0);
  var i = t.width, n = t.height, a = Rt(r.left, i), o = Rt(r.top, n), s = Rt(r.right, i), l = Rt(r.bottom, n), u = Rt(r.width, i), f = Rt(r.height, n), h = e[2] + e[0], v = e[1] + e[3], c = r.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(f) && (f = n - l - h - o), c != null && (isNaN(u) && isNaN(f) && (c > i / n ? u = i * 0.8 : f = n * 0.8), isNaN(u) && (u = c * f), isNaN(f) && (f = u / c)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - f - h), r.left || r.right) {
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
      o = n / 2 - f / 2 - e[0];
      break;
    case "bottom":
      o = n - f - h;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(f) && (f = n - h - o - (l || 0));
  var d = new et(a + e[3], o + e[0], u, f);
  return d.margin = e, d;
}
function oa(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return H(t) ? t : t ? {
    type: t
  } : null;
}
function sa(r, t, e) {
  var i = e && e.ignoreSize;
  !F(i) && (i = [i, i]);
  var n = o(Wa[0], 0), a = o(Wa[1], 1);
  u(Wa[0], r, n), u(Wa[1], r, a);
  function o(f, h) {
    var v = {}, c = 0, d = {}, m = 0, p = 2;
    if (mo(f, function(_) {
      d[_] = r[_];
    }), mo(f, function(_) {
      s(t, _) && (v[_] = d[_] = t[_]), l(v, _) && c++, l(d, _) && m++;
    }), i[h])
      return l(t, f[1]) ? d[f[2]] = null : l(t, f[2]) && (d[f[1]] = null), d;
    if (m === p || !c)
      return d;
    if (c >= p)
      return v;
    for (var g = 0; g < f.length; g++) {
      var y = f[g];
      if (!s(v, y) && s(r, y)) {
        v[y] = r[y];
        break;
      }
    }
    return v;
  }
  function s(f, h) {
    return f.hasOwnProperty(h);
  }
  function l(f, h) {
    return f[h] != null && f[h] !== "auto";
  }
  function u(f, h, v) {
    mo(f, function(c) {
      h[c] = v[c];
    });
  }
}
function Gf(r) {
  return wb({}, r);
}
function wb(r, t) {
  return t && r && mo(_b, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var Sb = wt(), rt = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = ws("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = oa(this), a = n ? Gf(e) : {}, o = i.getTheme();
      it(e, o.get(this.mainType)), it(e, this.getDefaultOption()), n && sa(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      it(this.option, e, !0);
      var n = oa(this);
      n && sa(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!U_(e))
        return e.defaultOption;
      var i = Sb(this);
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
      return Sa(this.ecModel, e, {
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
xp(rt, yt);
is(rt);
tb(rt);
eb(rt, bb);
function bb(r) {
  var t = [];
  return D(rt.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = G(t, function(e) {
    return Ee(e).main;
  }), r !== "dataset" && ut(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var nv = wt();
wt();
var Wf = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Nt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return Tb(this, nv, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      Cb(this, nv);
    }, r;
  }()
);
function xb(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function Tb(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var f = o == null || !i ? e : xb(i, o);
  if (f = f || e, !(!f || !f.length)) {
    var h = f[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % f.length, h;
  }
}
function Cb(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var Db = /\{@(.+?)\}/g, Ab = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getDataParams = function(t, e) {
      var i = this.getData(e), n = this.getRawValue(t, e), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], f = l && l.stroke, h = this.mainType, v = h === "series", c = i.userOutput && i.userOutput.get();
      return {
        componentType: h,
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
        borderColor: f,
        dimensionNames: c ? c.fullDimensions : null,
        encode: c ? c.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, r.prototype.getFormattedLabel = function(t, e, i, n, a, o) {
      e = e || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && F(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (U(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if (z(a)) {
        var f = em(a, l);
        return f.replace(Db, function(h, v) {
          var c = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(c - 1) === "]" && (d = +d.slice(1, c - 1), process.env.NODE_ENV !== "production" && isNaN(d) && Lt("Invalide label formatter: @" + v + ", only support @[0], @[1], @[2], ..."));
          var m = Ki(s, t, d);
          if (o && F(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (m = o.interpolatedValue[p]);
          }
          return m != null ? m + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return Ki(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  }()
);
function av(r) {
  var t, e;
  return H(r) ? r.type ? e = r : process.env.NODE_ENV !== "production" && console.warn("The return type of `formatTooltip` is not supported: " + Ro(r)) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function Yn(r) {
  return new Mb(r);
}
var Mb = (
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
      var o = f(this._modBy), s = this._modDataCount || 0, l = f(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function f(y) {
        return !(y >= 1) && (y = 1), y;
      }
      var h;
      (this._dirty || a === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (e ? (process.env.NODE_ENV !== "production" && Z(e._outputDueEnd != null), this._dueEnd = e._outputDueEnd) : (process.env.NODE_ENV !== "production" && Z(!this._progress || this._count), this._dueEnd = this._count ? this._count(this.context) : 1 / 0), this._progress) {
        var c = this._dueIndex, d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (h || c < d)) {
          var m = this._progress;
          if (F(m))
            for (var p = 0; p < m.length; p++)
              this._doProgress(m[p], c, d, l, u);
          else
            this._doProgress(m, c, d, l, u);
        }
        this._dueIndex = d;
        var g = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        process.env.NODE_ENV !== "production" && Z(g >= this._outputDueEnd), this._outputDueEnd = g;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      ov.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: ov.next
      }, this.context);
    }, r.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var e, i;
      !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), F(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, r.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, r.prototype.pipe = function(t) {
      process.env.NODE_ENV !== "production" && Z(t && !t._disposed && t !== this), (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
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
), ov = /* @__PURE__ */ function() {
  var r, t, e, i, n, a = {
    reset: function(l, u, f, h) {
      t = l, r = u, e = f, i = h, n = Math.ceil(i / e), a.next = e > 1 && i > 0 ? s : o;
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
}(), Eb = (
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
      return po(t, e);
    }, r;
  }()
);
function Pb(r, t) {
  var e = new Eb(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== Ye && (process.env.NODE_ENV !== "production" && (o = '`seriesLayoutBy` of upstream dataset can only be "column" in data transform.'), Ht(o));
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    D(u, function(m, p) {
      var g = m.name, y = {
        index: p,
        name: g,
        displayName: m.displayName
      };
      if (s.push(y), g != null) {
        var _ = "";
        Xi(l, g) && (process.env.NODE_ENV !== "production" && (_ = 'dimension name "' + g + '" duplicated.'), Ht(_)), l[g] = y;
      }
    });
  else
    for (var f = 0; f < r.dimensionsDetectedCount; f++)
      s.push({
        index: f
      });
  var h = Ig(n, Ye);
  t.__isBuiltIn && (e.getRawDataItem = function(m) {
    return h(i, a, s, m);
  }, e.getRawData = pt(Lb, null, r)), e.cloneRawData = pt(Ib, null, r);
  var v = Og(n, Ye);
  e.count = pt(v, null, i, a, s);
  var c = Rg(n);
  e.retrieveValue = function(m, p) {
    var g = h(i, a, s, m);
    return d(g, p);
  };
  var d = e.retrieveValueFromItem = function(m, p) {
    if (m != null) {
      var g = s[p];
      if (g)
        return c(m, p, g.name);
    }
  };
  return e.getDimensionInfo = pt(Ob, null, s, l), e.cloneAllDimensionInfo = pt(Rb, null, s), e;
}
function Lb(r) {
  var t = r.sourceFormat;
  if (!Uf(t)) {
    var e = "";
    process.env.NODE_ENV !== "production" && (e = "`getRawData` is not supported in source format " + t), Ht(e);
  }
  return r.data;
}
function Ib(r) {
  var t = r.sourceFormat, e = r.data;
  if (!Uf(t)) {
    var i = "";
    process.env.NODE_ENV !== "production" && (i = "`cloneRawData` is not supported in source format " + t), Ht(i);
  }
  if (t === Yt) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === Be) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(N({}, e[a]));
    return n;
  }
}
function Ob(r, t, e) {
  if (e != null) {
    if (ct(e) || !isNaN(e) && !Xi(t, e))
      return r[e];
    if (Xi(t, e))
      return t[e];
  }
}
function Rb(r) {
  return J(r);
}
var nm = K();
function Nb(r) {
  r = J(r);
  var t = r.type, e = "";
  t || (process.env.NODE_ENV !== "production" && (e = "Must have a `type` when `registerTransform`."), Ht(e));
  var i = t.split(":");
  i.length !== 2 && (process.env.NODE_ENV !== "production" && (e = 'Name must include namespace like "ns:regression".'), Ht(e));
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, nm.set(t, r);
}
function kb(r, t, e) {
  var i = Nt(r), n = i.length, a = "";
  n || (process.env.NODE_ENV !== "production" && (a = "If `transform` declared, it should at least contain one transform."), Ht(a));
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = Bb(l, t, e, n === 1 ? null : o), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Bb(r, t, e, i) {
  var n = "";
  t.length || (process.env.NODE_ENV !== "production" && (n = "Must have at least one upstream dataset."), Ht(n)), H(r) || (process.env.NODE_ENV !== "production" && (n = "transform declaration must be an object rather than " + typeof r + "."), Ht(n));
  var a = r.type, o = nm.get(a);
  o || (process.env.NODE_ENV !== "production" && (n = 'Can not find transform on type "' + a + '".'), Ht(n));
  var s = G(t, function(f) {
    return Pb(f, o);
  }), l = Nt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: J(r.config)
  }));
  if (process.env.NODE_ENV !== "production" && r.print) {
    var u = G(l, function(f) {
      var h = i != null ? " === pipe index: " + i : "";
      return ["=== dataset index: " + e.datasetIndex + h + " ===", "- transform result data:", Ro(f.data), "- transform result dimensions:", Ro(f.dimensions)].join(`
`);
    }).join(`
`);
    A1(u);
  }
  return G(l, function(f, h) {
    var v = "";
    H(f) || (process.env.NODE_ENV !== "production" && (v = "A transform should not return some empty results."), Ht(v)), f.data || (process.env.NODE_ENV !== "production" && (v = "Transform result data should be not be null or undefined"), Ht(v));
    var c = Eg(f.data);
    Uf(c) || (process.env.NODE_ENV !== "production" && (v = "Transform result data should be array rows or object rows."), Ht(v));
    var d, m = t[0];
    if (m && h === 0 && !f.dimensions) {
      var p = m.startIndex;
      p && (f.data = m.data.slice(0, p).concat(f.data)), d = {
        seriesLayoutBy: Ye,
        sourceHeader: p,
        dimensions: m.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: Ye,
        sourceHeader: 0,
        dimensions: f.dimensions
      };
    return wu(f.data, d, null);
  });
}
function Uf(r) {
  return r === Yt || r === Be;
}
var Fb = (
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
      if (_n(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var f = e[0];
          f.prepareSource(), u = f.getSource(), s = u.data, l = u.sourceFormat, a = [f._getVersionSign()];
        } else
          s = o.get("data", !0), l = kt(s) ? Ue : ce, a = [];
        var h = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, c = q(h.seriesLayoutBy, v.seriesLayoutBy) || null, d = q(h.sourceHeader, v.sourceHeader), m = q(h.dimensions, v.dimensions), p = c !== v.seriesLayoutBy || !!d != !!v.sourceHeader || m;
        n = p ? [wu(s, {
          seriesLayoutBy: c,
          sourceHeader: d,
          dimensions: m
        }, l)] : [];
      } else {
        var g = t;
        if (i) {
          var y = this._applyTransform(e);
          n = y.sourceList, a = y.upstreamSignList;
        } else {
          var _ = g.get("source", !0);
          n = [wu(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      process.env.NODE_ENV !== "production" && Z(n && a), this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (process.env.NODE_ENV !== "production" && Z(n != null || i != null), n != null) {
        var a = "";
        t.length !== 1 && (process.env.NODE_ENV !== "production" && (a = "When using `fromTransformResult`, there should be only one upstream dataset"), sv(a));
      }
      var o, s = [], l = [];
      return D(t, function(u) {
        u.prepareSource();
        var f = u.getSource(n || 0), h = "";
        n != null && !f && (process.env.NODE_ENV !== "production" && (h = "Can not retrieve result by `fromTransformResult`: " + n), sv(h)), s.push(f), l.push(u._getVersionSign());
      }), i ? o = kb(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [yS(s[0])]), {
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
      process.env.NODE_ENV !== "production" && Z(_n(this._sourceHost), "Can only call getDataStore on series source manager.");
      var e = t.makeStoreSchema();
      return this._innerGetDataStore(e.dimensions, t.source, e.hash);
    }, r.prototype._innerGetDataStore = function(t, e, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        _n(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new Su(), s.initData(new Lg(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (_n(t)) {
        var e = Dg(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return G(gS(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (_n(t))
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
function _n(r) {
  return r.mainType === "series";
}
function sv(r) {
  throw new Error(r);
}
var Vb = "line-height:1";
function am(r) {
  var t = r.lineHeight;
  return t == null ? Vb : "line-height:" + $t(t + "") + "px";
}
function om(r, t) {
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
var zb = [0, 10, 20, 30], Hb = ["", `
`, `

`, `


`];
function la(r, t) {
  return t.type = r, t;
}
function Cu(r) {
  return r.type === "section";
}
function sm(r) {
  return Cu(r) ? $b : Gb;
}
function lm(r) {
  if (Cu(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return D(r.blocks, function(n) {
      var a = lm(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Cu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function $b(r, t, e, i) {
  var n = t.noHeader, a = Wb(lm(t)), o = [], s = t.blocks || [];
  Z(!s || F(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Xi(u, l)) {
      var f = new MS(u[l], null);
      s.sort(function(m, p) {
        return f.evaluate(m.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  D(s, function(m, p) {
    var g = t.valueFormatter, y = sm(m)(
      // Inherit valueFormatter
      g ? N(N({}, r), {
        valueFormatter: g
      }) : r,
      m,
      p > 0 ? a.html : 0,
      i
    );
    y != null && o.push(y);
  });
  var h = r.renderMode === "richText" ? o.join(a.richText) : Du(i, o.join(""), n ? e : a.html);
  if (n)
    return h;
  var v = Tu(t.header, "ordinal", r.useUTC), c = om(i, r.renderMode).nameStyle, d = am(i);
  return r.renderMode === "richText" ? um(r, v, c) + a.richText + h : Du(i, '<div style="' + c + ";" + d + ';">' + $t(v) + "</div>" + h, e);
}
function Gb(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, f = t.valueFormatter || r.valueFormatter || function(w) {
    return w = F(w) ? w : [w], G(w, function(b, S) {
      return Tu(b, F(c) ? c[S] : c, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : Tu(l, "ordinal", u), c = t.valueType, d = o ? [] : f(t.value, t.dataIndex), m = !s || !a, p = !s && a, g = om(i, n), y = g.nameStyle, _ = g.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : um(r, v, y)) + (o ? "" : Xb(r, d, m, p, _)) : Du(i, (s ? "" : h) + (a ? "" : Ub(v, !s, y)) + (o ? "" : Yb(d, m, p, _)), e);
  }
}
function lv(r, t, e, i, n, a) {
  if (r) {
    var o = sm(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function Wb(r) {
  return {
    html: zb[r],
    richText: Hb[r]
  };
}
function Du(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = am(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function Ub(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + $t(r) + "</span>";
}
function Yb(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = F(r) ? r : [r], '<span style="' + a + ";" + i + '">' + G(r, function(o) {
    return $t(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function um(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function Xb(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle(F(t) ? t.join("  ") : t, a);
}
function Zb(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return ui(i);
}
function fm(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var pl = (
  /** @class */
  function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = Yp();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = yb({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return z(a) ? a : (process.env.NODE_ENV !== "production" && Z(n), this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      F(e) ? D(e, function(a) {
        return N(i, a);
      }) : N(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  }()
);
function qb(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = F(s), u = Zb(t, e), f, h, v, c;
  if (o > 1 || l && !o) {
    var d = Kb(s, t, e, a, u);
    f = d.inlineValues, h = d.inlineValueTypes, v = d.blocks, c = d.inlineValues[0];
  } else if (o) {
    var m = n.getDimensionInfo(a[0]);
    c = f = Ki(n, e, a[0]), h = m.type;
  } else
    c = f = l ? s[0] : s;
  var p = Kp(t), g = p && t.name || "", y = n.getName(e), _ = i ? g : y;
  return la("section", {
    header: g,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: c,
    blocks: [la("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Me(_),
      value: f,
      valueType: h,
      dataIndex: e
    })].concat(v || [])
  });
}
function Kb(r, t, e, i, n) {
  var a = t.getData(), o = tn(r, function(h, v, c) {
    var d = a.getDimensionInfo(c);
    return h = h || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? D(i, function(h) {
    f(Ki(a, e, h), h);
  }) : D(r, f);
  function f(h, v) {
    var c = a.getDimensionInfo(v);
    !c || c.otherDims.tooltip === !1 || (o ? u.push(la("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: c.displayName,
      value: h,
      valueType: c.type
    })) : (s.push(h), l.push(c.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var ar = wt();
function Ua(r, t) {
  return r.getName(t) || r.getId(t);
}
var Qb = "__universalTransitionEnabled", Oe = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Yn({
        count: Jb,
        reset: tx
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = ar(this).sourceManager = new Fb(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      fv(o, this), this.dataTask.context.data = o, process.env.NODE_ENV !== "production" && Z(o, "getInitialData returned invalid data."), ar(this).dataBeforeProcessed = o, uv(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = oa(this), a = n ? Gf(e) : {}, o = this.subType;
      rt.hasClass(o) && (o += "Series"), it(e, i.getTheme().get(this.subType)), it(e, this.getDefaultOption()), cc(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && sa(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = it(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = oa(this);
      n && sa(this.option, e, n);
      var a = ar(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      fv(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, ar(this).dataBeforeProcessed = o, uv(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !kt(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && cc(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Au(this);
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
      var i = Au(this);
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
      return qb({
        series: this,
        dataIndex: e,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var e = this.ecModel;
      if (W.node && !(e && e.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(e, i, n) {
      var a = this.ecModel, o = Wf.prototype.getColorFromPalette.call(this, e, i, n);
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
          var l = e[s], u = Ua(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = ht(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[Ua(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[Qb])
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
          for (var u = o.selectedMap, f = 0; f < l; f++) {
            var h = i[f], v = Ua(e, h);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var c = i[l - 1], v = Ua(e, c);
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
      return rt.registerClass(e);
    }, t.protoInitialize = function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    }(), t;
  }(rt)
);
Ne(Oe, Ab);
Ne(Oe, Wf);
xp(Oe, rt);
function uv(r) {
  var t = r.name;
  Kp(r) || (r.name = jb(r) || t);
}
function jb(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function Jb(r) {
  return r.model.getRawData().count();
}
function tx(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), ex;
}
function ex(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function fv(r, t) {
  D(F_(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, Qt(rx, t));
  });
}
function rx(r, t) {
  var e = Au(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Au(r) {
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
var ix = nt.extend({
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
}), nx = nt.extend({
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
}), ax = nt.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), f = Math.cos(u) * o, h = Math.sin(u), v = Math.cos(u), c = o * 0.6, d = o * 0.7;
    r.moveTo(e - f, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + f - h * c, l + s + v * c, e, i - d, e, i), r.bezierCurveTo(e, i - d, e - f + h * c, l + s + v * c, e - f, l + s), r.closePath();
  }
}), ox = nt.extend({
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
}), sx = {
  line: wr,
  rect: Pt,
  roundRect: Pt,
  square: Pt,
  circle: cs,
  diamond: nx,
  pin: ax,
  arrow: ox,
  triangle: ix
}, lx = {
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
}, Mu = {};
D(sx, function(r, t) {
  Mu[t] = new r();
});
var ux = nt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = To(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Mu[i];
      n || (i = "rect", n = Mu[i]), lx[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function fx(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function ua(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = gg(r.slice(8), new et(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = Ef(r.slice(7), {}, new et(t, e, i, n), o ? "center" : "cover") : l = new ux({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = fx, a && l.setColor(a), l;
}
function hx(r) {
  return F(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function hm(r, t) {
  if (r != null)
    return F(r) || (r = [r, r]), [Rt(r[0], t[0]) || 0, Rt(q(r[1], r[0]), t[1]) || 0];
}
var cx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      if (process.env.NODE_ENV !== "production") {
        var i = e.coordinateSystem;
        if (i !== "polar" && i !== "cartesian2d")
          throw new Error("Line not support coordinateSystem besides cartesian and polar");
      }
      return kf(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new Bt(), n = ua("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = ua(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
      i.add(u), u.setStyle(e.itemStyle);
      var f = e.iconRotate === "inherit" ? o : e.iconRotate || 0;
      return u.rotation = f * Math.PI / 180, u.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), i;
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
  }(Oe)
);
function Yf(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = Ki(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(Ki(r, t, e[o]));
    return a.join(" ");
  }
}
function cm(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!F(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Xf = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = ua(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = vx, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      No(this.childAt(0));
    }, t.prototype.downplay = function() {
      ko(this.childAt(0));
    }, t.prototype.setZ = function(e, i) {
      var n = this.childAt(0);
      n.zlevel = e, n.z = i;
    }, t.prototype.setDraggable = function(e, i) {
      var n = this.childAt(0);
      n.draggable = e, n.cursor = !i && e ? "move" : n.cursor;
    }, t.prototype.updateData = function(e, i, n, a) {
      this.silent = !1;
      var o = e.getItemVisual(i, "symbol") || "circle", s = e.hostModel, l = t.getSymbolSize(e, i), u = o !== this._symbolType, f = a && a.disableAnimation;
      if (u) {
        var h = e.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, e, i, l, h);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var c = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        f ? v.attr(c) : he(v, c, s, i), pg(v);
      }
      if (this._updateCommon(e, i, l, n, a), u) {
        var v = this.childAt(0);
        if (!f) {
          var c = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: v.style.opacity
            }
          };
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, Ze(v, c, s, i);
        }
      }
      f && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, f, h, v, c, d, m, p, g;
      if (a && (u = a.emphasisItemStyle, f = a.blurItemStyle, h = a.selectItemStyle, v = a.focus, c = a.blurScope, m = a.labelStatesModels, p = a.hoverScale, g = a.cursorStyle, d = a.emphasisDisabled), !a || e.hasItemOption) {
        var y = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = y.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), h = y.getModel(["select", "itemStyle"]).getItemStyle(), f = y.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), c = _.get("blurScope"), d = _.get("disabled"), m = gs(y), p = _.getShallow("scale"), g = y.getShallow("cursor");
      }
      var w = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (w || 0) * Math.PI / 180 || 0);
      var b = hm(e.getItemVisual(i, "symbolOffset"), n);
      b && (s.x = b[0], s.y = b[1]), g && s.attr("cursor", g);
      var S = e.getItemVisual(i, "style"), x = S.fill;
      if (s instanceof Sr) {
        var C = s.style;
        s.useStyle(N({
          // TODO other properties like x, y ?
          image: C.image,
          x: C.x,
          y: C.y,
          width: C.width,
          height: C.height
        }, S));
      } else
        s.__isEmptyBrush ? s.useStyle(N({}, S)) : s.useStyle(S), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var A = e.getItemVisual(i, "liftZ"), M = this._z2;
      A != null ? M == null && (this._z2 = s.z2, s.z2 += A) : M != null && (s.z2 = M, this._z2 = null);
      var T = o && o.useNameLabel;
      If(s, m, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: E,
        inheritColor: x,
        defaultOpacity: S.opacity
      });
      function E(I) {
        return T ? e.getName(I) : Yf(e, I);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var P = s.ensureState("emphasis");
      P.style = u, s.ensureState("select").style = h, s.ensureState("blur").style = f;
      var L = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      P.scaleX = this._sizeX * L, P.scaleY = this._sizeY * L, this.setSymbolScale(1), Bo(this, v, c, d);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = ot(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Vo(l, {
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
      Vo(a, {
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
      return hx(e.getItemVisual(i, "symbolSize"));
    }, t;
  }(Bt)
);
function vx(r, t) {
  this.parent.drift(r, t);
}
function gl(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function hv(r) {
  return r != null && !H(r) && (r = {
    isIgnore: r
  }), r || {};
}
function cv(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: gs(t),
    cursorStyle: t.get("cursor")
  };
}
var dx = (
  /** @class */
  function() {
    function r(t) {
      this.group = new Bt(), this._SymbolCtor = t || Xf;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = hv(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = cv(t), u = {
        disableAnimation: s
      }, f = e.getSymbolPoint || function(h) {
        return t.getItemLayout(h);
      };
      a || i.removeAll(), t.diff(a).add(function(h) {
        var v = f(h);
        if (gl(t, v, h, e)) {
          var c = new o(t, h, l, u);
          c.setPosition(v), t.setItemGraphicEl(h, c), i.add(c);
        }
      }).update(function(h, v) {
        var c = a.getItemGraphicEl(v), d = f(h);
        if (!gl(t, d, h, e)) {
          i.remove(c);
          return;
        }
        var m = t.getItemVisual(h, "symbol") || "circle", p = c && c.getSymbolType && c.getSymbolType();
        if (!c || p && p !== m)
          i.remove(c), c = new o(t, h, l, u), c.setPosition(d);
        else {
          c.updateData(t, h, l, u);
          var g = {
            x: d[0],
            y: d[1]
          };
          s ? c.attr(g) : he(c, g, n);
        }
        i.add(c), t.setItemGraphicEl(h, c);
      }).remove(function(h) {
        var v = a.getItemGraphicEl(h);
        v && v.fadeOut(function() {
          i.remove(v);
        }, n);
      }).execute(), this._getSymbolPoint = f, this._data = t;
    }, r.prototype.updateLayout = function() {
      var t = this, e = this._data;
      e && e.eachItemGraphicEl(function(i, n) {
        var a = t._getSymbolPoint(n);
        i.setPosition(a), i.markRedraw();
      });
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = cv(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = hv(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (gl(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      ds(this._progressiveEls || this.group, t);
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
function vm(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = px(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), f = s === "x" || s === "radius" ? 1 : 0, h = G(r.dimensions, function(d) {
    return t.mapDimension(d);
  }), v = !1, c = t.getCalculationInfo("stackResultDimension");
  return Qi(
    t,
    h[0]
    /* , dims[1] */
  ) && (v = !0, h[0] = c), Qi(
    t,
    h[1]
    /* , dims[0] */
  ) && (v = !0, h[1] = c), {
    dataDimsForPoint: h,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!v,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function px(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : ct(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function dm(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
var pm = typeof Float32Array < "u", gx = pm ? Float32Array : Array;
function Ge(r) {
  return F(r) ? pm ? new Float32Array(r) : r : new gx(r);
}
function mx(r, t) {
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
function yx(r, t, e, i, n, a, o, s) {
  for (var l = mx(r, t), u = [], f = [], h = [], v = [], c = [], d = [], m = [], p = vm(n, t, o), g = r.getLayout("points") || [], y = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var w = l[_], b = !0, S = void 0, x = void 0;
    switch (w.cmd) {
      case "=":
        S = w.idx * 2, x = w.idx1 * 2;
        var C = g[S], A = g[S + 1], M = y[x], T = y[x + 1];
        (isNaN(C) || isNaN(A)) && (C = M, A = T), u.push(C, A), f.push(M, T), h.push(e[S], e[S + 1]), v.push(i[x], i[x + 1]), m.push(t.getRawIndex(w.idx1));
        break;
      case "+":
        var E = w.idx, P = p.dataDimsForPoint, L = n.dataToPoint([t.get(P[0], E), t.get(P[1], E)]);
        x = E * 2, u.push(L[0], L[1]), f.push(y[x], y[x + 1]);
        var I = dm(p, n, t, E);
        h.push(I[0], I[1]), v.push(i[x], i[x + 1]), m.push(t.getRawIndex(E));
        break;
      case "-":
        b = !1;
    }
    b && (c.push(w), d.push(d.length));
  }
  d.sort(function(gt, ve) {
    return m[gt] - m[ve];
  });
  for (var O = u.length, V = Ge(O), R = Ge(O), k = Ge(O), $ = Ge(O), X = [], _ = 0; _ < d.length; _++) {
    var Q = d[_], at = _ * 2, ft = Q * 2;
    V[at] = u[ft], V[at + 1] = u[ft + 1], R[at] = f[ft], R[at + 1] = f[ft + 1], k[at] = h[ft], k[at + 1] = h[ft + 1], $[at] = v[ft], $[at + 1] = v[ft + 1], X[_] = c[Q];
  }
  return {
    current: V,
    next: R,
    stackedOnCurrent: k,
    stackedOnNext: $,
    status: X
  };
}
var or = Math.min, sr = Math.max;
function ii(r, t) {
  return isNaN(r) || isNaN(t);
}
function Eu(r, t, e, i, n, a, o, s, l) {
  for (var u, f, h, v, c, d, m = e, p = 0; p < i; p++) {
    var g = t[m * 2], y = t[m * 2 + 1];
    if (m >= n || m < 0)
      break;
    if (ii(g, y)) {
      if (l) {
        m += a;
        continue;
      }
      break;
    }
    if (m === e)
      r[a > 0 ? "moveTo" : "lineTo"](g, y), h = g, v = y;
    else {
      var _ = g - u, w = y - f;
      if (_ * _ + w * w < 0.5) {
        m += a;
        continue;
      }
      if (o > 0) {
        for (var b = m + a, S = t[b * 2], x = t[b * 2 + 1]; S === g && x === y && p < i; )
          p++, b += a, m += a, S = t[b * 2], x = t[b * 2 + 1], g = t[m * 2], y = t[m * 2 + 1], _ = g - u, w = y - f;
        var C = p + 1;
        if (l)
          for (; ii(S, x) && C < i; )
            C++, b += a, S = t[b * 2], x = t[b * 2 + 1];
        var A = 0.5, M = 0, T = 0, E = void 0, P = void 0;
        if (C >= i || ii(S, x))
          c = g, d = y;
        else {
          M = S - u, T = x - f;
          var L = g - u, I = S - g, O = y - f, V = x - y, R = void 0, k = void 0;
          if (s === "x") {
            R = Math.abs(L), k = Math.abs(I);
            var $ = M > 0 ? 1 : -1;
            c = g - $ * R * o, d = y, E = g + $ * k * o, P = y;
          } else if (s === "y") {
            R = Math.abs(O), k = Math.abs(V);
            var X = T > 0 ? 1 : -1;
            c = g, d = y - X * R * o, E = g, P = y + X * k * o;
          } else
            R = Math.sqrt(L * L + O * O), k = Math.sqrt(I * I + V * V), A = k / (k + R), c = g - M * o * (1 - A), d = y - T * o * (1 - A), E = g + M * o * A, P = y + T * o * A, E = or(E, sr(S, g)), P = or(P, sr(x, y)), E = sr(E, or(S, g)), P = sr(P, or(x, y)), M = E - g, T = P - y, c = g - M * R / k, d = y - T * R / k, c = or(c, sr(u, g)), d = or(d, sr(f, y)), c = sr(c, or(u, g)), d = sr(d, or(f, y)), M = g - c, T = y - d, E = g + M * k / R, P = y + T * k / R;
        }
        r.bezierCurveTo(h, v, c, d, g, y), h = E, v = P;
      } else
        r.lineTo(g, y);
    }
    u = g, f = y, m += a;
  }
  return p;
}
var gm = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  }()
), _x = (
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
      return new gm();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && ii(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && ii(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += Eu(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = si.CMD, s, l, u = i === "x", f = [], h = 0; h < a.length; ) {
        var v = a[h++], c = void 0, d = void 0, m = void 0, p = void 0, g = void 0, y = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[h++], l = a[h++];
            break;
          case o.L:
            if (c = a[h++], d = a[h++], _ = u ? (e - s) / (c - s) : (e - l) / (d - l), _ <= 1 && _ >= 0) {
              var w = u ? (d - l) * _ + l : (c - s) * _ + s;
              return u ? [e, w] : [w, e];
            }
            s = c, l = d;
            break;
          case o.C:
            c = a[h++], d = a[h++], m = a[h++], p = a[h++], g = a[h++], y = a[h++];
            var b = u ? Do(s, c, m, g, e, f) : Do(l, d, p, y, e, f);
            if (b > 0)
              for (var S = 0; S < b; S++) {
                var x = f[S];
                if (x <= 1 && x >= 0) {
                  var w = u ? xt(l, d, p, y, x) : xt(s, c, m, g, x);
                  return u ? [e, w] : [w, e];
                }
              }
            s = g, l = y;
            break;
        }
      }
    }, t;
  }(nt)
), Sx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(gm)
), bx = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new Sx();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && ii(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && ii(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = Eu(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        Eu(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  }(nt)
);
function Zf() {
  var r = wt();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var mm = wt(), xx = Zf(), _e = (
  /** @class */
  function() {
    function r() {
      this.group = new Bt(), this.uid = ws("viewChart"), this.renderTask = Yn({
        plan: Tx,
        reset: Cx
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("render method must been implemented");
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      if (!a) {
        process.env.NODE_ENV !== "production" && Lt("Unknown dataType " + n.dataType);
        return;
      }
      dv(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      if (!a) {
        process.env.NODE_ENV !== "production" && Lt("Unknown dataType " + n.dataType);
        return;
      }
      dv(a, n, "normal");
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
      ds(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      mm(t).updateMethod = e;
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.type = "chart";
    }(), r;
  }()
);
function vv(r, t, e) {
  r && qi(r) && (t === "emphasis" ? No : ko)(r, e);
}
function dv(r, t, e) {
  var i = li(r, t), n = t && t.highlightKey != null ? uw(t.highlightKey) : null;
  i != null ? D(Nt(i), function(a) {
    vv(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    vv(a, e, n);
  });
}
uf(_e, ["dispose"]);
is(_e);
function Tx(r) {
  return xx(r.model);
}
function Cx(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && mm(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), Dx[l];
}
var Dx = {
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
};
function ym(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, f = e.get(["lineStyle", "width"]) || 0;
  o -= f / 2, s -= f / 2, l += f, u += f, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var h = new Pt({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var v = r.getBaseAxis(), c = v.isHorizontal(), d = v.inverse;
    c ? (d && (h.shape.x += l), h.shape.width = 0) : (d || (h.shape.y += u), h.shape.height = 0);
    var m = U(n) ? function(p) {
      n(p, h);
    } : null;
    Ze(h, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, m);
  }
  return h;
}
function _m(r, t, e) {
  var i = r.getArea(), n = _t(i.r0, 1), a = _t(i.r, 1), o = new rn({
    shape: {
      cx: _t(r.cx, 1),
      cy: _t(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, Ze(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function Ax(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return _m(r, t, e);
    if (r.type === "cartesian2d")
      return ym(r, t, e, i, n);
  } else return null;
  return null;
}
function qf(r, t) {
  return r.type === t;
}
function pv(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function gv(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function mv(r, t) {
  var e = gv(r), i = e[0], n = e[1], a = gv(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function yv(r) {
  return ct(r) ? r : r ? 0.5 : 0;
}
function Mx(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = Ge(i * 2), a = 0; a < i; a++) {
    var o = dm(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function lr(r, t, e, i, n) {
  var a = e.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], f = [], h = [], v = [];
  if (n) {
    for (l = 0; l < r.length; l += 2) {
      var c = t || r;
      !isNaN(c[l]) && !isNaN(c[l + 1]) && v.push(r[l], r[l + 1]);
    }
    r = v;
  }
  for (l = 0; l < r.length - 2; l += 2)
    switch (h[0] = r[l + 2], h[1] = r[l + 3], f[0] = r[l], f[1] = r[l + 1], s.push(f[0], f[1]), i) {
      case "end":
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var d = (f[o] + h[o]) / 2, m = [];
        u[o] = m[o] = d, u[1 - o] = f[1 - o], m[1 - o] = h[1 - o], s.push(u[0], u[1]), s.push(m[0], m[1]);
        break;
      default:
        u[o] = f[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function Ex(r, t) {
  var e = [], i = r.length, n, a;
  function o(f, h, v) {
    var c = f.coord, d = (v - c) / (h.coord - c), m = M0(d, [f.color, h.color]);
    return {
      coord: v,
      color: m
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
function Px(r, t, e) {
  var i = r.getVisual("visualMeta");
  if (!(!i || !i.length || !r.count())) {
    if (t.type !== "cartesian2d") {
      process.env.NODE_ENV !== "production" && console.warn("Visual map on line style is only supported on cartesian2d.");
      return;
    }
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = r.getDimensionInfo(i[o].dimension);
      if (n = s && s.coordDim, n === "x" || n === "y") {
        a = i[o];
        break;
      }
    }
    if (!a) {
      process.env.NODE_ENV !== "production" && console.warn("Visual map on line style only support x or y dimension.");
      return;
    }
    var l = t.getAxis(n), u = G(a.stops, function(_) {
      return {
        coord: l.toGlobalCoord(l.dataToCoord(_.value)),
        color: _.color
      };
    }), f = u.length, h = a.outerColors.slice();
    f && u[0].coord > u[f - 1].coord && (u.reverse(), h.reverse());
    var v = Ex(u, n === "x" ? e.getWidth() : e.getHeight()), c = v.length;
    if (!c && f)
      return u[0].coord < 0 ? h[1] ? h[1] : u[f - 1].color : h[0] ? h[0] : u[0].color;
    var d = 10, m = v[0].coord - d, p = v[c - 1].coord + d, g = p - m;
    if (g < 1e-3)
      return "transparent";
    D(v, function(_) {
      _.offset = (_.coord - m) / g;
    }), v.push({
      // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
      offset: c ? v[c - 1].offset : 0.5,
      color: h[1] || "transparent"
    }), v.unshift({
      offset: c ? v[0].offset : 0.5,
      color: h[0] || "transparent"
    });
    var y = new dg(0, 0, 0, 0, v, !0);
    return y[n] = m, y[n + "2"] = p, y;
  }
}
function Lx(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && Ix(a, t))) {
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
function Ix(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (Xf.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function Ox(r, t) {
  return isNaN(r) || isNaN(t);
}
function Rx(r) {
  for (var t = r.length / 2; t > 0 && Ox(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function _v(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function Nx(r, t, e) {
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
function wm(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Ie.length; t++)
    if (r.get([Ie[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function ml(r, t, e, i) {
  if (qf(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = wm(i) ? function(c, d) {
      r._endLabelOnDuring(c, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), f = ym(t, e, i, function() {
      var c = r._endLabel;
      c && e && s.originalX != null && c.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!i.get("clip", !0)) {
      var h = f.shape, v = Math.max(h.width, h.height);
      u ? (h.y -= v, h.height += v * 2) : (h.x -= v, h.width += v * 2);
    }
    return l && l(1, f), f;
  } else
    return process.env.NODE_ENV !== "production" && i.get(["endLabel", "show"]) && console.warn("endLabel is not supported for lines in polar systems."), _m(t, e, i);
}
function kx(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var Bx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new Bt(), i = new dx();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = pt(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), f = s.getLayout("points") || [], h = a.type === "polar", v = this._coordSys, c = this._symbolDraw, d = this._polyline, m = this._polygon, p = this._lineGroup, g = !i.ssr && e.get("animation"), y = !u.isEmpty(), _ = u.get("origin"), w = vm(a, s, _), b = y && Mx(a, s, w), S = e.get("showSymbol"), x = e.get("connectNulls"), C = S && !h && Lx(e, s, a), A = this._data;
      A && A.eachItemGraphicEl(function(gt, ve) {
        gt.__temp && (o.remove(gt), A.setItemGraphicEl(ve, null));
      }), S || c.remove(), o.add(p);
      var M = h ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var E = Px(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && M === this._step))
        S && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(gt) {
            return [f[gt * 2], f[gt * 2 + 1]];
          }
        }), g && this._initSymbolLabelAnimation(s, a, T), M && (b && (b = lr(b, f, a, M, x)), f = lr(f, null, a, M, x)), d = this._newPolyline(f), y ? m = this._newPolygon(f, b) : m && (p.remove(m), m = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, ui(E)), p.setClipPath(ml(this, a, !0, e));
      else {
        y && !m ? m = this._newPolygon(f, b) : m && !y && (p.remove(m), m = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, ui(E));
        var P = p.getClipPath();
        if (P) {
          var L = ml(this, a, !1, e);
          Ze(P, {
            shape: L.shape
          }, e);
        } else
          p.setClipPath(ml(this, a, !0, e));
        S && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(gt) {
            return [f[gt * 2], f[gt * 2 + 1]];
          }
        }), (!pv(this._stackedOnPoints, b) || !pv(this._points, f)) && (g ? this._doUpdateAnimation(s, b, a, n, M, _, x) : (M && (b && (b = lr(b, f, a, M, x)), f = lr(f, null, a, M, x)), d.setShape({
          points: f
        }), m && m.setShape({
          points: f,
          stackedOnPoints: b
        })));
      }
      var I = e.getModel("emphasis"), O = I.get("focus"), V = I.get("blurScope"), R = I.get("disabled");
      if (d.useStyle(st(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: E,
          lineJoin: "bevel"
        }
      )), du(d, e, "lineStyle"), d.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var k = d.getState("emphasis").style;
        k.lineWidth = +d.style.lineWidth + 1;
      }
      ot(d).seriesIndex = e.seriesIndex, Bo(d, O, V, R);
      var $ = yv(e.get("smooth")), X = e.get("smoothMonotone");
      if (d.setShape({
        smooth: $,
        smoothMonotone: X,
        connectNulls: x
      }), m) {
        var Q = s.getCalculationInfo("stackedOnSeries"), at = 0;
        m.useStyle(st(u.getAreaStyle(), {
          fill: E,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), Q && (at = yv(Q.get("smooth"))), m.setShape({
          smooth: $,
          stackedOnSmooth: at,
          smoothMonotone: X,
          connectNulls: x
        }), du(m, e, "areaStyle"), ot(m).seriesIndex = e.seriesIndex, Bo(m, O, V, R);
      }
      var ft = this._changePolyState;
      s.eachItemGraphicEl(function(gt) {
        gt && (gt.onHoverStateChange = ft);
      }), this._polyline.onHoverStateChange = ft, this._data = s, this._coordSys = a, this._stackedOnPoints = b, this._points = f, this._step = M, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, d), m && this.packEventData(e, m));
    }, t.prototype.packEventData = function(e, i) {
      ot(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(e, i, n, a) {
      var o = e.getData(), s = li(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2], h = l[s * 2 + 1];
          if (isNaN(f) || isNaN(h) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(f, h))
            return;
          var v = e.get("zlevel") || 0, c = e.get("z") || 0;
          u = new Xf(o, s), u.x = f, u.y = h, u.setZ(v, c);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = v, d.z = c, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        _e.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = li(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        _e.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      wc(this._polyline, e), i && wc(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new _x({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new bx({
        shape: {
          points: e,
          stackedOnPoints: i
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function(e, i, n) {
      var a, o, s = i.getBaseAxis(), l = s.inverse;
      i.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : i.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = e.hostModel, f = u.get("animationDuration");
      U(f) && (f = f(null));
      var h = u.get("animationDelay") || 0, v = U(h) ? h(null) : h;
      e.eachItemGraphicEl(function(c, d) {
        var m = c;
        if (m) {
          var p = [c.x, c.y], g = void 0, y = void 0, _ = void 0;
          if (n)
            if (o) {
              var w = n, b = i.pointToCoord(p);
              a ? (g = w.startAngle, y = w.endAngle, _ = -b[1] / 180 * Math.PI) : (g = w.r0, y = w.r, _ = b[0]);
            } else {
              var S = n;
              a ? (g = S.x, y = S.x + S.width, _ = c.x) : (g = S.y + S.height, y = S.y, _ = c.y);
            }
          var x = y === g ? 0 : (_ - g) / (y - g);
          l && (x = 1 - x);
          var C = U(h) ? h(d) : f * x + v, A = m.getSymbolPath(), M = A.getTextContent();
          m.attr({
            scaleX: 0,
            scaleY: 0
          }), m.animateTo({
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
      if (wm(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new we({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var f = Rx(l);
        f >= 0 && (If(s, gs(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: f,
          defaultText: function(h, v, c) {
            return c != null ? cm(o, c) : Yf(o, h);
          },
          enableTextSetter: !0
        }, kx(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, f = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var h = n.getLayout("points"), v = n.hostModel, c = v.get("connectNulls"), d = s.get("precision"), m = s.get("distance") || 0, p = l.getBaseAxis(), g = p.isHorizontal(), y = p.inverse, _ = i.shape, w = y ? g ? _.x : _.y + _.height : g ? _.x + _.width : _.y, b = (g ? m : 0) * (y ? -1 : 1), S = (g ? 0 : -m) * (y ? -1 : 1), x = g ? "x" : "y", C = Nx(h, w, x), A = C.range, M = A[1] - A[0], T = void 0;
        if (M >= 1) {
          if (M > 1 && !c) {
            var E = _v(h, A[0]);
            u.attr({
              x: E[0] + b,
              y: E[1] + S
            }), o && (T = v.getRawValue(A[0]));
          } else {
            var E = f.getPointOn(w, x);
            E && u.attr({
              x: E[0] + b,
              y: E[1] + S
            });
            var P = v.getRawValue(A[0]), L = v.getRawValue(A[1]);
            o && (T = $1(n, d, P, L, C.t));
          }
          a.lastFrameIndex = A[0];
        } else {
          var I = e === 1 || a.lastFrameIndex > 0 ? A[0] : 0, E = _v(h, I);
          o && (T = v.getRawValue(I)), u.attr({
            x: E[0] + b,
            y: E[1] + S
          });
        }
        if (o) {
          var O = ms(u);
          typeof O.setLabelText == "function" && O.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, f = this._polygon, h = e.hostModel, v = yx(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), c = v.current, d = v.stackedOnCurrent, m = v.next, p = v.stackedOnNext;
      if (o && (d = lr(v.stackedOnCurrent, v.current, n, o, l), c = lr(v.current, null, n, o, l), p = lr(v.stackedOnNext, v.next, n, o, l), m = lr(v.next, null, n, o, l)), mv(c, m) > 3e3 || f && mv(d, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: m
        }), f && (f.stopAnimation(), f.setShape({
          points: m,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = c;
      var g = {
        shape: {
          points: m
        }
      };
      v.current !== c && (g.shape.__points = v.next), u.stopAnimation(), he(u, g, h), f && (f.setShape({
        // Reuse the points with polyline.
        points: c,
        stackedOnPoints: d
      }), f.stopAnimation(), he(f, {
        shape: {
          stackedOnPoints: p
        }
      }, h), u.shape.points !== f.shape.points && (f.shape.points = u.shape.points));
      for (var y = [], _ = v.status, w = 0; w < _.length; w++) {
        var b = _[w].cmd;
        if (b === "=") {
          var S = e.getItemGraphicEl(_[w].idx1);
          S && y.push({
            el: S,
            ptIdx: w
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        f && f.dirtyShape();
        for (var x = u.shape.__points, C = 0; C < y.length; C++) {
          var A = y[C].el, M = y[C].ptIdx * 2;
          A.x = x[M], A.y = x[M + 1], A.markRedraw();
        }
      });
    }, t.prototype.remove = function(e) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(_e)
);
function Fx(r, t) {
  return {
    seriesType: r,
    plan: Zf(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = G(n.dimensions, function(h) {
          return i.mapDimension(h);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        Qi(i, a[0]) && (a[0] = s), Qi(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), f = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(h, v) {
            for (var c = h.end - h.start, d = Ge(c * o), m = [], p = [], g = h.start, y = 0; g < h.end; g++) {
              var _ = void 0;
              if (o === 1) {
                var w = l.get(u, g);
                _ = n.dataToPoint(w, null, p);
              } else
                m[0] = l.get(u, g), m[1] = l.get(f, g), _ = n.dataToPoint(m, null, p);
              d[y++] = _[0], d[y++] = _[1];
            }
            v.setLayout("points", d);
          }
        };
      }
    }
  };
}
var Vx = {
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
}, zx = function(r) {
  return Math.round(r.length / 2);
};
function Sm(r) {
  return {
    seriesType: r,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, e, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), f = l.getExtent(), h = i.getDevicePixelRatio(), v = Math.abs(f[1] - f[0]) * (h || 1), c = Math.round(s / v);
        if (isFinite(c) && c > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / c)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / c));
          var d = void 0;
          z(a) ? d = Vx[a] : U(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / c, d, zx));
        }
      }
    }
  };
}
function Hx(r) {
  r.registerChartView(Bx), r.registerSeriesModel(cx), r.registerLayout(Fx("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Sm("line"));
}
var $x = "__ec_stack_";
function bm(r) {
  return r.get("stack") || $x + r.seriesIndex;
}
function Kf(r) {
  return r.dim + r.index;
}
function xm(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    Cm(i) && e.push(i);
  }), e;
}
function Gx(r) {
  var t = {};
  D(r, function(l) {
    var u = l.coordinateSystem, f = u.getBaseAxis();
    if (!(f.type !== "time" && f.type !== "value"))
      for (var h = l.getData(), v = f.dim + "_" + f.index, c = h.getDimensionIndex(h.mapDimension(f.dim)), d = h.getStore(), m = 0, p = d.count(); m < p; ++m) {
        var g = d.get(c, m);
        t[v] ? t[v].push(g) : t[v] = [g];
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
function Tm(r) {
  var t = Gx(r), e = [];
  return D(r, function(i) {
    var n = i.coordinateSystem, a = n.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], f = Math.abs(o[1] - o[0]), h = a.scale.getExtent(), v = Math.abs(h[1] - h[0]);
      s = u ? f / v * u : f;
    } else {
      var c = i.getData();
      s = Math.abs(o[1] - o[0]) / c.count();
    }
    var d = Rt(i.get("barWidth"), s), m = Rt(i.get("barMaxWidth"), s), p = Rt(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (Dm(i) ? 0.5 : 1),
      s
    ), g = i.get("barGap"), y = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: m,
      barMinWidth: p,
      barGap: g,
      barCategoryGap: y,
      axisKey: Kf(a),
      stackId: bm(i)
    });
  }), Wx(e);
}
function Wx(r) {
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
    var f = i.barWidth;
    f && !l[u].width && (l[u].width = f, f = Math.min(s.remainedWidth, f), s.remainedWidth -= f);
    var h = i.barMaxWidth;
    h && (l[u].maxWidth = h);
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
      var l = ht(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Rt(s, o), f = Rt(i.gap, 1), h = i.remainedWidth, v = i.autoWidthCount, c = (h - u) / (v + (v - 1) * f);
    c = Math.max(c, 0), D(a, function(g) {
      var y = g.maxWidth, _ = g.minWidth;
      if (g.width) {
        var w = g.width;
        y && (w = Math.min(w, y)), _ && (w = Math.max(w, _)), g.width = w, h -= w + f * w, v--;
      } else {
        var w = c;
        y && y < w && (w = Math.min(y, h)), _ && _ > w && (w = _), w !== c && (g.width = w, h -= w + f * w, v--);
      }
    }), c = (h - u) / (v + (v - 1) * f), c = Math.max(c, 0);
    var d = 0, m;
    D(a, function(g, y) {
      g.width || (g.width = c), m = g, d += g.width * (1 + f);
    }), m && (d -= m.width * f);
    var p = -d / 2;
    D(a, function(g, y) {
      e[n][y] = e[n][y] || {
        bandWidth: o,
        offset: p,
        width: g.width
      }, p += g.width * (1 + f);
    });
  }), e;
}
function Ux(r, t, e) {
  if (r && t) {
    var i = r[Kf(t)];
    return i;
  }
}
function Yx(r, t) {
  var e = xm(r, t), i = Tm(e);
  D(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = bm(n), u = i[Kf(s)][l], f = u.offset, h = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: f,
      size: h
    });
  });
}
function Xx(r) {
  return {
    seriesType: r,
    plan: Zf(),
    reset: function(t) {
      if (Cm(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), f = e.getCalculationInfo("stackResultDimension"), h = Qi(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), c = Zx(n, a), d = Dm(t), m = t.get("barMinHeight") || 0, p = f && e.getDimensionIndex(f), g = e.getLayout("size"), y = e.getLayout("offset");
        return {
          progress: function(_, w) {
            for (var b = _.count, S = d && Ge(b * 3), x = d && l && Ge(b * 3), C = d && Ge(b), A = i.master.getRect(), M = v ? A.width : A.height, T, E = w.getStore(), P = 0; (T = _.next()) != null; ) {
              var L = E.get(h ? p : o, T), I = E.get(s, T), O = c, V = void 0;
              h && (V = +L - E.get(o, T));
              var R = void 0, k = void 0, $ = void 0, X = void 0;
              if (v) {
                var Q = i.dataToPoint([L, I]);
                if (h) {
                  var at = i.dataToPoint([V, I]);
                  O = at[0];
                }
                R = O, k = Q[1] + y, $ = Q[0] - O, X = g, Math.abs($) < m && ($ = ($ < 0 ? -1 : 1) * m);
              } else {
                var Q = i.dataToPoint([I, L]);
                if (h) {
                  var at = i.dataToPoint([I, V]);
                  O = at[1];
                }
                R = Q[0] + y, k = O, $ = g, X = Q[1] - O, Math.abs(X) < m && (X = (X <= 0 ? -1 : 1) * m);
              }
              d ? (S[P] = R, S[P + 1] = k, S[P + 2] = v ? $ : X, x && (x[P] = v ? A.x : R, x[P + 1] = v ? k : A.y, x[P + 2] = M), C[T] = T) : w.setItemLayout(T, {
                x: R,
                y: k,
                width: $,
                height: X
              }), P += 3;
            }
            d && w.setLayout({
              largePoints: S,
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
function Cm(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function Dm(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function Zx(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var Pu = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return kf(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          D(a.getAxes(), function(v, c) {
            if (v.type === "category" && i != null) {
              var d = v.getTicksCoords(), m = v.getTickModel().get("alignWithLabel"), p = o[c], g = i[c] === "x1" || i[c] === "y1";
              if (g && !m && (p += 1), d.length < 2)
                return;
              if (d.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[g ? 1 : 0]);
                return;
              }
              for (var y = void 0, _ = void 0, w = 1, b = 0; b < d.length; b++) {
                var S = d[b].coord, x = b === d.length - 1 ? d[b - 1].tickValue + w : d[b].tickValue;
                if (x === p) {
                  _ = S;
                  break;
                } else if (x < p)
                  y = S;
                else if (y != null && x > p) {
                  _ = (S + y) / 2;
                  break;
                }
                b === 1 && (w = x - d[0].tickValue);
              }
              _ == null && (y ? y && (_ = d[d.length - 1].coord) : _ = d[0].coord), s[c] = v.toGlobalCoord(_);
            }
          });
        else {
          var l = this.getData(), u = l.getLayout("offset"), f = l.getLayout("size"), h = a.getBaseAxis().isHorizontal() ? 0 : 1;
          s[h] += u + f / 2;
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
  }(Oe)
);
Oe.registerClass(Pu);
var qx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return kf(null, this, {
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
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = rb(Pu.defaultOption, {
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
  }(Pu)
), Go = "\0__throttleOriginMethod", wv = "\0__throttleRate", Sv = "\0__throttleType";
function Qf(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, f;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var c = [], d = 0; d < arguments.length; d++)
      c[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = c;
    var m = f || t, p = f || e;
    f = null, s = i - (p ? n : a) - m, clearTimeout(o), p ? o = setTimeout(h, m) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(c) {
    f = c;
  }, v;
}
function Am(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[Go] || n, o = n[Sv], s = n[wv];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = Qf(a, e, i === "debounce"), n[Go] = a, n[Sv] = i, n[wv] = e;
    }
    return n;
  }
}
function Lu(r, t) {
  var e = r[t];
  e && e[Go] && (e.clear && e.clear(), r[t] = e[Go]);
}
var Kx = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  }()
), bv = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new Kx();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, f = i.startAngle, h = i.endAngle, v = i.clockwise, c = Math.PI * 2, d = v ? h - f < c : f - h < c;
      d || (f = h - (v ? c : -c));
      var m = Math.cos(f), p = Math.sin(f), g = Math.cos(h), y = Math.sin(h);
      d ? (e.moveTo(m * o + n, p * o + a), e.arc(m * u + n, p * u + a, l, -Math.PI + f, f, !v)) : e.moveTo(m * s + n, p * s + a), e.arc(n, a, s, f, h, !v), e.arc(g * u + n, y * u + a, l, h - Math.PI * 2, h - Math.PI, !v), o !== 0 && e.arc(n, a, o, h, f, v);
    }, t;
  }(nt)
);
function Qx(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return To(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, f = u.cx, h = u.cy, v = u.r, c = u.r0, d = (v + c) / 2, m = u.startAngle, p = u.endAngle, g = (m + p) / 2, y = e ? Math.abs(v - c) / 2 : 0, _ = Math.cos, w = Math.sin, b = f + v * _(m), S = h + v * w(m), x = "left", C = "top";
    switch (s) {
      case "startArc":
        b = f + (c - l) * _(g), S = h + (c - l) * w(g), x = "center", C = "top";
        break;
      case "insideStartArc":
        b = f + (c + l) * _(g), S = h + (c + l) * w(g), x = "center", C = "bottom";
        break;
      case "startAngle":
        b = f + d * _(m) + Ya(m, l + y, !1), S = h + d * w(m) + Xa(m, l + y, !1), x = "right", C = "middle";
        break;
      case "insideStartAngle":
        b = f + d * _(m) + Ya(m, -l + y, !1), S = h + d * w(m) + Xa(m, -l + y, !1), x = "left", C = "middle";
        break;
      case "middle":
        b = f + d * _(g), S = h + d * w(g), x = "center", C = "middle";
        break;
      case "endArc":
        b = f + (v + l) * _(g), S = h + (v + l) * w(g), x = "center", C = "bottom";
        break;
      case "insideEndArc":
        b = f + (v - l) * _(g), S = h + (v - l) * w(g), x = "center", C = "top";
        break;
      case "endAngle":
        b = f + d * _(p) + Ya(p, l + y, !0), S = h + d * w(p) + Xa(p, l + y, !0), x = "left", C = "middle";
        break;
      case "insideEndAngle":
        b = f + d * _(p) + Ya(p, -l + y, !0), S = h + d * w(p) + Xa(p, -l + y, !0), x = "right", C = "middle";
        break;
      default:
        return To(i, n, a);
    }
    return i = i || {}, i.x = b, i.y = S, i.align = x, i.verticalAlign = C, i;
  };
}
function jx(r, t, e, i) {
  if (ct(i)) {
    r.setTextConfig({
      rotation: i
    });
    return;
  } else if (F(t)) {
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
  var f = Math.PI * 1.5 - l;
  u === "middle" && f > Math.PI / 2 && f < Math.PI * 1.5 && (f -= Math.PI), r.setTextConfig({
    rotation: f
  });
}
function Ya(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function Xa(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function Jx(r, t, e) {
  var i = r.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  F(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: G(i, function(a) {
      return _r(a, n);
    })
  };
}
var yl = Math.max, _l = Math.min;
function tT(r, t) {
  var e = r.getArea && r.getArea();
  if (qf(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var eT = (
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
      o === "cartesian2d" || o === "polar" ? (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(e, i, n) : this._renderNormal(e, i, n, a)) : process.env.NODE_ENV !== "production" && Et("Only cartesian2d and polar supported for bar.");
    }, t.prototype.incrementalPrepareRender = function(e) {
      this._clear(), this._updateDrawMode(e), this._updateLargeClip(e);
    }, t.prototype.incrementalRender = function(e, i) {
      this._progressiveEls = [], this._incrementalRenderLarge(e, i);
    }, t.prototype.eachRendered = function(e) {
      ds(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, f = u.getBaseAxis(), h;
      u.type === "cartesian2d" ? h = f.isHorizontal() : u.type === "polar" && (h = f.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, c = rT(e, u);
      c && this._enableRealtimeSort(c, s, n);
      var d = e.get("clip", !0) || c, m = tT(u, s);
      o.removeClipPath();
      var p = e.get("roundCap", !0), g = e.get("showBackground", !0), y = e.getModel("backgroundStyle"), _ = y.get("borderRadius") || 0, w = [], b = this._backgroundEls, S = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function C(T) {
        var E = Za[u.type](s, T), P = uT(u, h, E);
        return P.useStyle(y.getItemStyle()), u.type === "cartesian2d" ? P.setShape("r", _) : P.setShape("cornerRadius", _), w[T] = P, P;
      }
      s.diff(l).add(function(T) {
        var E = s.getItemModel(T), P = Za[u.type](s, T, E);
        if (g && C(T), !(!s.hasValue(T) || !Av[u.type](P))) {
          var L = !1;
          d && (L = xv[u.type](m, P));
          var I = Tv[u.type](e, s, T, P, h, v, f.model, !1, p);
          c && (I.forceLabelAnimation = !0), Mv(I, s, T, E, P, e, h, u.type === "polar"), S ? I.attr({
            shape: P
          }) : c ? Cv(c, v, I, P, T, h, !1, !1) : Ze(I, {
            shape: P
          }, e, T), s.setItemGraphicEl(T, I), o.add(I), I.ignore = L;
        }
      }).update(function(T, E) {
        var P = s.getItemModel(T), L = Za[u.type](s, T, P);
        if (g) {
          var I = void 0;
          b.length === 0 ? I = C(E) : (I = b[E], I.useStyle(y.getItemStyle()), u.type === "cartesian2d" ? I.setShape("r", _) : I.setShape("cornerRadius", _), w[T] = I);
          var O = Za[u.type](s, T), V = Em(h, O, u);
          he(I, {
            shape: V
          }, v, T);
        }
        var R = l.getItemGraphicEl(E);
        if (!s.hasValue(T) || !Av[u.type](L)) {
          o.remove(R);
          return;
        }
        var k = !1;
        if (d && (k = xv[u.type](m, L), k && o.remove(R)), R ? pg(R) : R = Tv[u.type](e, s, T, L, h, v, f.model, !!R, p), c && (R.forceLabelAnimation = !0), x) {
          var $ = R.getTextContent();
          if ($) {
            var X = ms($);
            X.prevValue != null && (X.prevValue = X.value);
          }
        } else
          Mv(R, s, T, P, L, e, h, u.type === "polar");
        S ? R.attr({
          shape: L
        }) : c ? Cv(c, v, R, L, T, h, !0, x) : he(R, {
          shape: L
        }, e, T, null), s.setItemGraphicEl(T, R), R.ignore = k, o.add(R);
      }).remove(function(T) {
        var E = l.getItemGraphicEl(T);
        E && mu(E, e, T);
      }).execute();
      var A = this._backgroundGroup || (this._backgroundGroup = new Bt());
      A.removeAll();
      for (var M = 0; M < w.length; ++M)
        A.add(w[M]);
      o.add(A), this._backgroundEls = w, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Pv(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Pv(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && Ax(e.coordinateSystem, !1, e), n = this.group;
      i ? n.setClipPath(i) : n.removeClipPath();
    }, t.prototype._enableRealtimeSort = function(e, i, n) {
      var a = this;
      if (i.count()) {
        var o = e.baseAxis;
        if (this._isFirstFrame)
          this._dispatchInitSort(i, e, n), this._isFirstFrame = !1;
        else {
          var s = function(l) {
            var u = i.getItemGraphicEl(l), f = u && u.shape;
            return f && // The result should be consistent with the initial sort by data value.
            // Do not support the case that both positive and negative exist.
            Math.abs(o.isHorizontal() ? f.height : f.width) || 0;
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
        ordinalNumbers: G(a, function(o) {
          return o.ordinalNumber;
        })
      };
    }, t.prototype._isOrderChangedWithinSameData = function(e, i, n) {
      for (var a = n.scale, o = e.mapDimension(n.dim), s = Number.MAX_VALUE, l = 0, u = a.getOrdinalMeta().categories.length; l < u; ++l) {
        var f = e.rawIndexOf(o, a.getRawOrdinalNumber(l)), h = f < 0 ? Number.MIN_VALUE : i(e.indexOfRawIndex(f));
        if (h > s)
          return !0;
        s = h;
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
        mu(a, e, ot(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(_e)
), xv = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = yl(t.x, r.x), s = _l(t.x + t.width, n), l = yl(t.y, r.y), u = _l(t.y + t.height, a), f = s < o, h = u < l;
    return t.x = f && o > n ? s : o, t.y = h && l > a ? u : l, t.width = f ? 0 : s - o, t.height = h ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), f || h;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = _l(t.r, r.r), a = yl(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, Tv = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new Pt({
      shape: N({}, i),
      z2: 1
    });
    if (u.__dataIndex = e, u.name = "item", a) {
      var f = u.shape, h = n ? "height" : "width";
      f[h] = 0;
    }
    return u;
  },
  polar: function(r, t, e, i, n, a, o, s, l) {
    var u = !n && l ? bv : rn, f = new u({
      shape: i,
      z2: 1
    });
    f.name = "item";
    var h = Mm(n);
    if (f.calculateTextPosition = Qx(h, {
      isRoundCap: u === bv
    }), a) {
      var v = f.shape, c = n ? "r" : "endAngle", d = {};
      v[c] = n ? i.r0 : i.startAngle, d[c] = i[c], (s ? he : Ze)(f, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return f;
  }
};
function rT(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (process.env.NODE_ENV !== "production" && e && (i.type !== "category" && Et("`realtimeSort` will not work because this bar series is not based on a category axis."), t.type !== "cartesian2d" && Et("`realtimeSort` will not work because this bar series is not on cartesian2d.")), e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function Cv(r, t, e, i, n, a, o, s) {
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
  }), s || (o ? he : Ze)(e, {
    shape: l
  }, t, n, null);
  var f = t ? r.baseAxis.model : null;
  (o ? he : Ze)(e, {
    shape: u
  }, f, n);
}
function Dv(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var iT = ["x", "y", "width", "height"], nT = ["cx", "cy", "r", "startAngle", "endAngle"], Av = {
  cartesian2d: function(r) {
    return !Dv(r, iT);
  },
  polar: function(r) {
    return !Dv(r, nT);
  }
}, Za = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? oT(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
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
function aT(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function Mm(r) {
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
function Mv(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var f = r.shape, h = Jx(i.getModel("itemStyle"), f);
      N(f, h), r.setShape(f);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var c = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", d = gs(i);
  If(r, d, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: Yf(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c
  });
  var m = r.getTextContent();
  if (s && m) {
    var p = i.get(["label", "position"]);
    r.textConfig.inside = p === "middle" ? !0 : null, jx(r, p === "outside" ? c : p, Mm(o), i.get(["label", "rotate"]));
  }
  oS(m, d, a.getRawValue(e), function(y) {
    return cm(t, y);
  });
  var g = i.getModel(["emphasis"]);
  Bo(r, g.get("focus"), g.get("blurScope"), g.get("disabled")), du(r, i), aT(n) && (r.style.fill = "none", r.style.stroke = "none", D(r.states, function(y) {
    y.style && (y.style.fill = y.style.stroke = "none");
  }));
}
function oT(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var sT = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
    }
    return r;
  }()
), Ev = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new sT();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, f = 0; f < n.length; f += 3)
        l[a] = u, l[o] = n[f + 2], s[a] = n[f + a], s[o] = n[f + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(nt)
);
function Pv(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var f = new Ev({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    f.baseDimIdx = a, f.largeDataIndices = o, f.barWidth = s, f.useStyle(l.getItemStyle()), t.add(f), e && e.push(f);
  }
  var h = new Ev({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, t.add(h), h.useStyle(n.getVisual("style")), h.style.stroke = null, ot(h).seriesIndex = r.seriesIndex, r.get("silent") || (h.on("mousedown", Lv), h.on("mousemove", Lv)), e && e.push(h);
}
var Lv = Qf(function(r) {
  var t = this, e = lT(t, r.offsetX, r.offsetY);
  ot(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function lT(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, f = 0, h = a.length / 3; f < h; f++) {
    var v = f * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[f];
  }
  return -1;
}
function Em(r, t, e) {
  if (qf(e, "cartesian2d")) {
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
function uT(r, t, e) {
  var i = r.type === "polar" ? rn : Pt;
  return new i({
    shape: Em(t, e, r),
    silent: !0,
    z2: 0
  });
}
function fT(r) {
  r.registerChartView(eT), r.registerSeriesModel(qx), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, Qt(Yx, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, Xx("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Sm("bar")), r.registerAction({
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
function xi(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || (process.env.NODE_ENV !== "production" && Le("event " + a + " is deprecated."), i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, f = 0; f < u.length; f++)
      if (u[f].seriesIndex === s) {
        var h = o.getData(), v = li(h, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: F(v) ? h.getName(v[0]) : h.getName(v),
          selected: z(l) ? l : N({}, l)
        });
      }
  }));
}
function hT(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (xi("map", "selectchanged", t, n, i), xi("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (xi("map", "selected", t, n, i), xi("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (xi("map", "unselected", t, n, i), xi("pie", "unselected", t, n, i));
  });
}
function cT(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var f = s ? new Fo(o, a) : null;
      t.push({
        label: n,
        labelLine: i.labelLine,
        rect: u,
        localRect: o,
        obb: f,
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
function vT(r) {
  var t = [];
  r.sort(function(m, p) {
    return p.priority - m.priority;
  });
  var e = new et(0, 0, 0, 0);
  function i(m) {
    if (!m.ignore) {
      var p = m.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    m.ignore = !0;
  }
  for (var n = 0; n < r.length; n++) {
    var a = r[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, f = a.labelLine;
    e.copy(a.rect), e.width -= 0.1, e.height -= 0.1, e.x += 0.05, e.y += 0.05;
    for (var h = a.obb, v = !1, c = 0; c < t.length; c++) {
      var d = t[c];
      if (e.intersect(d.rect)) {
        if (o && d.axisAligned) {
          v = !0;
          break;
        }
        if (d.obb || (d.obb = new Fo(d.localRect, d.transform)), h || (h = new Fo(s, l)), h.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), f && i(f)) : (u.attr("ignore", a.defaultAttr.ignore), f && f.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var Ti = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), dT = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Ti(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new Ti(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new Ti(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Ti(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new Ti(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Ti(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), pT = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, wl = [], gT = W.browser.firefox && +W.browser.version.split(".")[0] < 39;
function Iu(r, t, e, i) {
  return e = e || {}, i ? Iv(r, t, e) : gT && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Iv(r, t, e), e;
}
function Iv(r, t, e) {
  if (W.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if ($g(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (xu(wl, r, i, n)) {
      e.zrX = wl[0], e.zrY = wl[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function jf(r) {
  return r || window.event;
}
function ie(r, t, e) {
  if (t = jf(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Iu(r, o, t, e);
  } else {
    Iu(r, t, t, e);
    var a = mT(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && pT.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function mT(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function yT(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function _T(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Pm = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, wT = function() {
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
        var l = n[o], u = Iu(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Sl)
      if (Sl.hasOwnProperty(e)) {
        var i = Sl[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function Ov(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function ST(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Sl = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = Ov(i) / Ov(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = ST(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
}, Lm = "silent";
function bT(r, t, e) {
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
    stop: xT
  };
}
function xT() {
  Pm(this.event);
}
var TT = function(r) {
  B(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(ke), wn = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), CT = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], bl = new et(0, 0, 0, 0), Im = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new wn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new TT(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new dT(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (D(CT, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = Om(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new wn(i, n) : this.findHover(i, n), u = l.target, f = this.proxy;
    f.setCursor && f.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new wn(0, 0);
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
      for (var o = "on" + i, s = bT(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new wn(e, i);
    if (Rv(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, f = new et(e - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var v = a[h];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (bl.copy(v.getBoundingRect()), v.transform && bl.applyTransform(v.transform), bl.intersect(f) && s.push(v));
      }
      if (s.length)
        for (var c = 4, d = Math.PI / 12, m = Math.PI * 2, p = 0; p < u; p += c)
          for (var g = 0; g < m; g += d) {
            var y = e + p * Math.cos(g), _ = i + p * Math.sin(g);
            if (Rv(s, o, y, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new wT());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new wn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(ke);
D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  Im.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = Om(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || y0(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function DT(r, t, e) {
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
    return n ? Lm : !0;
  }
  return !1;
}
function Rv(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = DT(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Lm)) {
      t.target = o;
      break;
    }
  }
}
function Om(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Rm = 32, Sn = 7;
function AT(r) {
  for (var t = 0; r >= Rm; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function Nv(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    MT(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function MT(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function kv(r, t, e, i, n) {
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
function xl(r, t, e, i, n, a) {
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
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) > 0 ? o = f + 1 : l = f;
  }
  return l;
}
function Tl(r, t, e, i, n, a) {
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
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) < 0 ? l = f : o = f + 1;
  }
  return l;
}
function ET(r, t) {
  var e = Sn, i, n, a = 0, o = [];
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
      f(c);
    }
  }
  function u() {
    for (; a > 1; ) {
      var c = a - 2;
      c > 0 && n[c - 1] < n[c + 1] && c--, f(c);
    }
  }
  function f(c) {
    var d = i[c], m = n[c], p = i[c + 1], g = n[c + 1];
    n[c] = m + g, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var y = Tl(r[p], r, d, m, 0, t);
    d += y, m -= y, m !== 0 && (g = xl(r[d + m - 1], r, p, g, g - 1, t), g !== 0 && (m <= g ? h(d, m, p, g) : v(d, m, p, g)));
  }
  function h(c, d, m, p) {
    var g = 0;
    for (g = 0; g < d; g++)
      o[g] = r[c + g];
    var y = 0, _ = m, w = c;
    if (r[w++] = r[_++], --p === 0) {
      for (g = 0; g < d; g++)
        r[w + g] = o[y + g];
      return;
    }
    if (d === 1) {
      for (g = 0; g < p; g++)
        r[w + g] = r[_ + g];
      r[w + p] = o[y];
      return;
    }
    for (var b = e, S, x, C; ; ) {
      S = 0, x = 0, C = !1;
      do
        if (t(r[_], o[y]) < 0) {
          if (r[w++] = r[_++], x++, S = 0, --p === 0) {
            C = !0;
            break;
          }
        } else if (r[w++] = o[y++], S++, x = 0, --d === 1) {
          C = !0;
          break;
        }
      while ((S | x) < b);
      if (C)
        break;
      do {
        if (S = Tl(r[_], o, y, d, 0, t), S !== 0) {
          for (g = 0; g < S; g++)
            r[w + g] = o[y + g];
          if (w += S, y += S, d -= S, d <= 1) {
            C = !0;
            break;
          }
        }
        if (r[w++] = r[_++], --p === 0) {
          C = !0;
          break;
        }
        if (x = xl(o[y], r, _, p, 0, t), x !== 0) {
          for (g = 0; g < x; g++)
            r[w + g] = r[_ + g];
          if (w += x, _ += x, p -= x, p === 0) {
            C = !0;
            break;
          }
        }
        if (r[w++] = o[y++], --d === 1) {
          C = !0;
          break;
        }
        b--;
      } while (S >= Sn || x >= Sn);
      if (C)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (e = b, e < 1 && (e = 1), d === 1) {
      for (g = 0; g < p; g++)
        r[w + g] = r[_ + g];
      r[w + p] = o[y];
    } else {
      if (d === 0)
        throw new Error();
      for (g = 0; g < d; g++)
        r[w + g] = o[y + g];
    }
  }
  function v(c, d, m, p) {
    var g = 0;
    for (g = 0; g < p; g++)
      o[g] = r[m + g];
    var y = c + d - 1, _ = p - 1, w = m + p - 1, b = 0, S = 0;
    if (r[w--] = r[y--], --d === 0) {
      for (b = w - (p - 1), g = 0; g < p; g++)
        r[b + g] = o[g];
      return;
    }
    if (p === 1) {
      for (w -= d, y -= d, S = w + 1, b = y + 1, g = d - 1; g >= 0; g--)
        r[S + g] = r[b + g];
      r[w] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var C = 0, A = 0, M = !1;
      do
        if (t(o[_], r[y]) < 0) {
          if (r[w--] = r[y--], C++, A = 0, --d === 0) {
            M = !0;
            break;
          }
        } else if (r[w--] = o[_--], A++, C = 0, --p === 1) {
          M = !0;
          break;
        }
      while ((C | A) < x);
      if (M)
        break;
      do {
        if (C = d - Tl(o[_], r, c, d, d - 1, t), C !== 0) {
          for (w -= C, y -= C, d -= C, S = w + 1, b = y + 1, g = C - 1; g >= 0; g--)
            r[S + g] = r[b + g];
          if (d === 0) {
            M = !0;
            break;
          }
        }
        if (r[w--] = o[_--], --p === 1) {
          M = !0;
          break;
        }
        if (A = p - xl(r[y], o, 0, p, p - 1, t), A !== 0) {
          for (w -= A, _ -= A, p -= A, S = w + 1, b = _ + 1, g = 0; g < A; g++)
            r[S + g] = o[b + g];
          if (p <= 1) {
            M = !0;
            break;
          }
        }
        if (r[w--] = r[y--], --d === 0) {
          M = !0;
          break;
        }
        x--;
      } while (C >= Sn || A >= Sn);
      if (M)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), p === 1) {
      for (w -= d, y -= d, S = w + 1, b = y + 1, g = d - 1; g >= 0; g--)
        r[S + g] = r[b + g];
      r[w] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (b = w - (p - 1), g = 0; g < p; g++)
        r[b + g] = o[g];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function yo(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Rm) {
      a = Nv(r, e, i, t), kv(r, e, i, e + a, t);
      return;
    }
    var o = ET(r, t), s = AT(n);
    do {
      if (a = Nv(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), kv(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Bv = !1;
function Cl() {
  Bv || (Bv = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Fv(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var PT = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Fv;
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
    i.length = this._displayListLen, yo(i, Fv);
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
        var f = t;
        e && e.length ? f.__clipPaths = e : f.__clipPaths && f.__clipPaths.length > 0 && (f.__clipPaths = []), isNaN(f.z) && (Cl(), f.z = 0), isNaN(f.z2) && (Cl(), f.z2 = 0), isNaN(f.zlevel) && (Cl(), f.zlevel = 0), this._displayList[this._displayListLen++] = f;
      }
      var h = t.getDecalElement && t.getDecalElement();
      h && this._updateAndAddDisplayable(h, e, i);
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
}(), Wo;
Wo = W.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
function Ri() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var LT = function(r) {
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
    for (var i = Ri() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (Wo(i), !e._paused && e.update());
    }
    Wo(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Ri(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Ri(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Ri() - this._pauseStart, this._paused = !1);
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
}(ke), IT = 300, Dl = W.domSupported, Al = function() {
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
  }, i = G(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
}(), Vv = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, zv = !1;
function Ou(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function OT(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function Ml(r) {
  r && (r.zrByTouch = !0);
}
function RT(r, t) {
  return ie(r.dom, new NT(r, t), !0);
}
function Nm(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var NT = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), ge = {
  mousedown: function(r) {
    r = ie(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = ie(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = ie(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = ie(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    Nm(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    zv = !0, r = ie(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    zv || (r = ie(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = ie(this.dom, r), Ml(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), ge.mousemove.call(this, r), ge.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = ie(this.dom, r), Ml(r), this.handler.processGesture(r, "change"), ge.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = ie(this.dom, r), Ml(r), this.handler.processGesture(r, "end"), ge.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < IT && ge.click.call(this, r);
  },
  pointerdown: function(r) {
    ge.mousedown.call(this, r);
  },
  pointermove: function(r) {
    Ou(r) || ge.mousemove.call(this, r);
  },
  pointerup: function(r) {
    ge.mouseup.call(this, r);
  },
  pointerout: function(r) {
    Ou(r) || ge.mouseout.call(this, r);
  }
};
D(["click", "dblclick", "contextmenu"], function(r) {
  ge[r] = function(t) {
    t = ie(this.dom, t), this.trigger(r, t);
  };
});
var Ru = {
  pointermove: function(r) {
    Ou(r) || Ru.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Ru.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function kT(r, t) {
  var e = t.domHandlers;
  W.pointerEventsSupported ? D(Al.pointer, function(i) {
    _o(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (W.touchEventsSupported && D(Al.touch, function(i) {
    _o(t, i, function(n) {
      e[i].call(r, n), OT(t);
    });
  }), D(Al.mouse, function(i) {
    _o(t, i, function(n) {
      n = jf(n), t.touching || e[i].call(r, n);
    });
  }));
}
function BT(r, t) {
  W.pointerEventsSupported ? D(Vv.pointer, e) : W.touchEventsSupported || D(Vv.mouse, e);
  function e(i) {
    function n(a) {
      a = jf(a), Nm(r, a.target) || (a = RT(r, a), t.domHandlers[i].call(r, a));
    }
    _o(t, i, n, { capture: !0 });
  }
}
function _o(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, yT(r.domTarget, t, e, i);
}
function El(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && _T(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var Hv = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), FT = function(r) {
  B(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new Hv(e, ge), Dl && (n._globalHandlerScope = new Hv(document, Ru)), kT(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    El(this._localHandlerScope), Dl && El(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, Dl && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? BT(this, i) : El(i);
    }
  }, t;
}(ke);
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var On = {}, km = {};
function VT(r) {
  delete km[r];
}
function zT(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return Eo(r, 1) < ou;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += Eo(t[n].color, 1);
    return e /= i, e < ou;
  }
  return !1;
}
var HT = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new PT(), o = i.renderer || "canvas";
    if (On[o] || (o = ht(On)[0]), process.env.NODE_ENV !== "production" && !On[o])
      throw new Error("Renderer '" + o + "' is not imported. Please import it first.");
    i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new On[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !W.node && !W.worker && !l ? new FT(s.getViewportRoot(), s.root) : null, f = i.useCoarsePointer, h = f == null || f === "auto" ? W.touchEventsSupported : !!f, v = 44, c;
    h && (c = q(i.pointerSize, v)), this.handler = new Im(a, s, u, s.root, c), this.animation = new LT({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = zT(t));
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
    var e, i = Ri();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Ri();
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
        t[e] instanceof Bt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, VT(this.id));
  }, r;
}();
function $v(r, t) {
  var e = new HT(mp(), r, t);
  return km[e.id] = e, e;
}
function $T(r, t) {
  On[r] = t;
}
var Bm = "";
typeof navigator < "u" && (Bm = navigator.platform || "");
var Ci = "rgba(0, 0, 0, 0.2)";
const GT = {
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
    fontFamily: Bm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var WT = K();
function UT(r, t, e) {
  var i = WT.get(t);
  if (!i)
    return e;
  var n = i(r);
  if (!n)
    return e;
  if (process.env.NODE_ENV !== "production")
    for (var a = 0; a < n.length; a++)
      Z(Zi(n[a]));
  return e.concat(n);
}
var qa, bn, Gv, Pl = "\0_ec_inner", Wv = 1, YT = {
  grid: "GridComponent",
  polar: "PolarComponent",
  geo: "GeoComponent",
  singleAxis: "SingleAxisComponent",
  parallel: "ParallelComponent",
  calendar: "CalendarComponent",
  graphic: "GraphicComponent",
  toolbox: "ToolboxComponent",
  tooltip: "TooltipComponent",
  axisPointer: "AxisPointerComponent",
  brush: "BrushComponent",
  title: "TitleComponent",
  timeline: "TimelineComponent",
  markPoint: "MarkPointComponent",
  markLine: "MarkLineComponent",
  markArea: "MarkAreaComponent",
  legend: "LegendComponent",
  dataZoom: "DataZoomComponent",
  visualMap: "VisualMapComponent",
  // aria: 'AriaComponent',
  // dataset: 'DatasetComponent',
  // Dependencies
  xAxis: "GridComponent",
  yAxis: "GridComponent",
  angleAxis: "PolarComponent",
  radiusAxis: "PolarComponent"
}, XT = {
  line: "LineChart",
  bar: "BarChart",
  pie: "PieChart",
  scatter: "ScatterChart",
  radar: "RadarChart",
  map: "MapChart",
  tree: "TreeChart",
  treemap: "TreemapChart",
  graph: "GraphChart",
  gauge: "GaugeChart",
  funnel: "FunnelChart",
  parallel: "ParallelChart",
  sankey: "SankeyChart",
  boxplot: "BoxplotChart",
  candlestick: "CandlestickChart",
  effectScatter: "EffectScatterChart",
  lines: "LinesChart",
  heatmap: "HeatmapChart",
  pictorialBar: "PictorialBarChart",
  themeRiver: "ThemeRiverChart",
  sunburst: "SunburstChart",
  custom: "CustomChart"
}, Uo = {};
function ZT(r) {
  D(r, function(t, e) {
    if (!rt.hasClass(e)) {
      var i = YT[e];
      i && !Uo[i] && (Lt("Component " + e + ` is used but not imported.
import { ` + i + ` } from 'echarts/components';
echarts.use([` + i + "]);"), Uo[i] = !0);
    }
  });
}
var Jf = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new yt(a), this._locale = new yt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      process.env.NODE_ENV !== "production" && (Z(e != null, "option is null/undefined"), Z(e[Pl] !== Wv, "please use chart.getOption()"));
      var a = Xv(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, Xv(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        process.env.NODE_ENV !== "production" && ZT(o), !this.option || e === "recreate" ? Gv(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
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
      dS(this), D(e, function(h, v) {
        h != null && (rt.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? J(h) : it(n[v], h, !0));
      }), u && u.each(function(h, v) {
        rt.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), rt.topologicalTravel(s, rt.getAllClassMainTypes(), f, this);
      function f(h) {
        var v = UT(this, h, Nt(e[h])), c = a.get(h), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          c ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), m = P1(c, v, d);
        B1(m, h, rt), n[h] = null, a.set(h, null), o.set(h, 0);
        var p = [], g = [], y = 0, _, w;
        D(m, function(b, S) {
          var x = b.existing, C = b.newOption;
          if (!C)
            x && (x.mergeOption({}, this), x.optionUpdated({}, !1));
          else {
            var A = h === "series", M = rt.getClass(
              h,
              b.keyInfo.subType,
              !A
              // Give a more detailed warn later if series don't exists
            );
            if (!M) {
              if (process.env.NODE_ENV !== "production") {
                var T = b.keyInfo.subType, E = XT[T];
                Uo[T] || (Uo[T] = !0, Lt(E ? "Series " + T + ` is used but not imported.
import { ` + E + ` } from 'echarts/charts';
echarts.use([` + E + "]);" : "Unknown series " + T));
              }
              return;
            }
            if (h === "tooltip") {
              if (_) {
                process.env.NODE_ENV !== "production" && (w || (Et("Currently only one tooltip component is allowed."), w = !0));
                return;
              }
              _ = !0;
            }
            if (x && x.constructor === M)
              x.name = b.keyInfo.name, x.mergeOption(C, this), x.optionUpdated(C, !1);
            else {
              var P = N({
                componentIndex: S
              }, b.keyInfo);
              x = new M(C, this, this, P), N(x, P), b.brandNew && (x.__requireNewView = !0), x.init(C, this, this), x.optionUpdated(null, !0);
            }
          }
          x ? (p.push(x.option), g.push(x), y++) : (p.push(void 0), g.push(void 0));
        }, this), n[h] = p, a.set(h, g), o.set(h, y), h === "series" && qa(this);
      }
      this._seriesIndices || qa(this);
    }, t.prototype.getOption = function() {
      var e = J(this.option);
      return D(e, function(i, n) {
        if (rt.hasClass(n)) {
          for (var a = Nt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Zi(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[Pl], e;
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
      return n != null ? (l = [], D(Nt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Uv("id", a, s) : o != null ? l = Uv("name", o, s) : l = Mt(s, function(u) {
        return !!u;
      }), Yv(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : Mt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Yv(o, e));
      function s(u) {
        var f = n + "Index", h = n + "Id", v = n + "Name";
        return u && (u[f] != null || u[h] != null || u[v] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[f],
          id: u[h],
          name: u[v]
        } : null;
      }
      function l(u) {
        return e.filter ? Mt(u, e.filter) : u;
      }
    }, t.prototype.eachComponent = function(e, i, n) {
      var a = this._componentsMap;
      if (U(e)) {
        var o = i, s = e;
        a.each(function(h, v) {
          for (var c = 0; h && c < h.length; c++) {
            var d = h[c];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = z(e) ? a.get(e) : H(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var f = l[u];
          f && i.call(n, f, f.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Pe(e, null);
      return Mt(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(e) {
      return this._componentsMap.get("series")[e];
    }, t.prototype.getSeriesByType = function(e) {
      return Mt(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === e;
      });
    }, t.prototype.getSeries = function() {
      return Mt(this._componentsMap.get("series"), function(e) {
        return !!e;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(e, i) {
      bn(this), D(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      D(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      bn(this), D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return D(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return bn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      bn(this);
      var n = [];
      D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = K(n);
    }, t.prototype.restoreData = function(e) {
      qa(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        rt.hasClass(o) && n.push(o);
      }), rt.topologicalTravel(n, rt.getAllClassMainTypes(), function(a) {
        D(i.get(a), function(o) {
          o && (a !== "series" || !qT(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      qa = function(e) {
        var i = e._seriesIndices = [];
        D(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = K(i);
      }, bn = function(e) {
        if (process.env.NODE_ENV !== "production" && !e._seriesIndices)
          throw new Error("Option should contains series.");
      }, Gv = function(e, i) {
        e.option = {}, e.option[Pl] = Wv, e._componentsMap = K({
          series: []
        }), e._componentsCount = K();
        var n = i.aria;
        H(n) && n.enabled == null && (n.enabled = !0), KT(i, e._theme.option), it(i, GT, !1), e._mergeOption(i, null);
      };
    }(), t;
  }(yt)
);
function qT(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function KT(r, t) {
  var e = r.color && !r.colorLayer;
  D(t, function(i, n) {
    n === "colorLayer" && e || rt.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? it(r[n], i, !1) : J(i) : r[n] == null && (r[n] = i));
  });
}
function Uv(r, t, e) {
  if (F(t)) {
    var i = K();
    return D(t, function(a) {
      if (a != null) {
        var o = Pe(a, null);
        o != null && i.set(a, !0);
      }
    }), Mt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Pe(t, null);
    return Mt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function Yv(r, t) {
  return t.hasOwnProperty("subType") ? Mt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function Xv(r) {
  var t = K();
  return r && D(Nt(r.replaceMerge), function(e) {
    process.env.NODE_ENV !== "production" && Z(rt.hasClass(e), '"' + e + '" is not valid component main type in "replaceMerge"'), t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Ne(Jf, Wf);
var QT = [
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
], Fm = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      D(QT, function(e) {
        this[e] = pt(t[e], t);
      }, this);
    }
    return r;
  }()
), jT = /^(min|max)?(.+)$/, JT = (
  /** @class */
  function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (D(Nt(t.series), function(o) {
        o && o.data && kt(o.data) && Ql(o.data);
      }), D(Nt(t.dataset), function(o) {
        o && o.source && kt(o.source) && Ql(o.source);
      })), t = J(t);
      var n = this._optionBackup, a = tC(t, e, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, r.prototype.mountOption = function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], J(t ? e.baseOption : this._newBaseOption);
    }, r.prototype.getTimelineOption = function(t) {
      var e, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (e = J(
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
        eC(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !iC(o, this._currentMediaIndices) && (s = G(o, function(f) {
        return J(f === -1 ? a.option : n[f].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  }()
);
function tC(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, f = !!r.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || f) && (r.options = r.media = null), a = r), f && (F(u) ? D(u, function(c) {
    process.env.NODE_ENV !== "production" && c && !c.option && H(c.query) && H(c.query.option) && Lt("Illegal media option. Must be like { media: [ { query: {}, option: {} } ] }"), c && c.option && (c.query ? i.push(c) : n || (n = c));
  }) : process.env.NODE_ENV !== "production" && Lt("Illegal media option. Must be an array. Like { media: [ {...}, {...} ] }")), v(a), D(l, function(c) {
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
function eC(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return D(r, function(a, o) {
    var s = o.match(jT);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      rC(i[u], a, l) || (n = !1);
    }
  }), n;
}
function rC(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function iC(r, t) {
  return r.join(",") === t.join(",");
}
var Jt = D, fa = H, Zv = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Ll(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = Zv.length; e < i; e++) {
      var n = Zv[e], a = t.normal, o = t.emphasis;
      a && a[n] && (process.env.NODE_ENV !== "production" && St("itemStyle.normal." + n, n), r[n] = r[n] || {}, r[n].normal ? it(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (process.env.NODE_ENV !== "production" && St("itemStyle.emphasis." + n, "emphasis." + n), r[n] = r[n] || {}, r[n].emphasis ? it(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function At(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (process.env.NODE_ENV !== "production" && Le("'normal' hierarchy in " + t + " has been removed since 4.0. All style properties are configured in " + t + " directly now."), e ? (r[t].normal = r[t].emphasis = null, st(r[t], i)) : r[t] = i), n && (process.env.NODE_ENV !== "production" && Le(t + ".emphasis has been changed to emphasis." + t + " since 4.0"), r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function Rn(r) {
  At(r, "itemStyle"), At(r, "lineStyle"), At(r, "areaStyle"), At(r, "label"), At(r, "labelLine"), At(r, "upperLabel"), At(r, "edgeLabel");
}
function mt(r, t) {
  var e = fa(r) && r[t], i = fa(e) && e.textStyle;
  if (i) {
    process.env.NODE_ENV !== "production" && Le("textStyle hierarchy in " + t + " has been removed since 4.0. All textStyle properties are configured in " + t + " directly now.");
    for (var n = 0, a = vc.length; n < a; n++) {
      var o = vc[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
  }
}
function ne(r) {
  r && (Rn(r), mt(r, "label"), r.emphasis && mt(r.emphasis, "label"));
}
function nC(r) {
  if (fa(r)) {
    Ll(r), Rn(r), mt(r, "label"), mt(r, "upperLabel"), mt(r, "edgeLabel"), r.emphasis && (mt(r.emphasis, "label"), mt(r.emphasis, "upperLabel"), mt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (Ll(t), ne(t));
    var e = r.markLine;
    e && (Ll(e), ne(e));
    var i = r.markArea;
    i && ne(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !kt(a))
        for (var o = 0; o < a.length; o++)
          ne(a[o]);
      D(r.categories, function(u) {
        Rn(u);
      });
    }
    if (n && !kt(n))
      for (var o = 0; o < n.length; o++)
        ne(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ne(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        F(l[o]) ? (ne(l[o][0]), ne(l[o][1])) : ne(l[o]);
    r.type === "gauge" ? (mt(r, "axisLabel"), mt(r, "title"), mt(r, "detail")) : r.type === "treemap" ? (At(r.breadcrumb, "itemStyle"), D(r.levels, function(u) {
      Rn(u);
    })) : r.type === "tree" && Rn(r.leaves);
  }
}
function ze(r) {
  return F(r) ? r : r ? [r] : [];
}
function qv(r) {
  return (F(r) ? r[0] : r) || {};
}
function aC(r, t) {
  Jt(ze(r.series), function(i) {
    fa(i) && nC(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Jt(e, function(i) {
    Jt(ze(r[i]), function(n) {
      n && (mt(n, "axisLabel"), mt(n.axisPointer, "label"));
    });
  }), Jt(ze(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    mt(n, "axisLabel"), mt(n && n.axisPointer, "label");
  }), Jt(ze(r.calendar), function(i) {
    At(i, "itemStyle"), mt(i, "dayLabel"), mt(i, "monthLabel"), mt(i, "yearLabel");
  }), Jt(ze(r.radar), function(i) {
    mt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name, process.env.NODE_ENV !== "production" && Le("name property in radar component has been changed to axisName")), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap, process.env.NODE_ENV !== "production" && Le("nameGap property in radar component has been changed to axisNameGap")), process.env.NODE_ENV !== "production" && Jt(i.indicator, function(n) {
      n.text && St("text", "name", "radar.indicator");
    });
  }), Jt(ze(r.geo), function(i) {
    fa(i) && (ne(i), Jt(ze(i.regions), function(n) {
      ne(n);
    }));
  }), Jt(ze(r.timeline), function(i) {
    ne(i), At(i, "label"), At(i, "itemStyle"), At(i, "controlStyle", !0);
    var n = i.data;
    F(n) && D(n, function(a) {
      H(a) && (At(a, "label"), At(a, "itemStyle"));
    });
  }), Jt(ze(r.toolbox), function(i) {
    At(i, "iconStyle"), Jt(i.feature, function(n) {
      At(n, "iconStyle");
    });
  }), mt(qv(r.axisPointer), "label"), mt(qv(r.tooltip).axisPointer, "label");
}
function oC(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function sC(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function Kv(r) {
  r && D(lC, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var lC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], uC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Il = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function xn(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < Il.length; e++) {
      var i = Il[e][1], n = Il[e][0];
      t[i] != null && (t[n] = t[i], process.env.NODE_ENV !== "production" && St(i, n));
    }
}
function Qv(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (process.env.NODE_ENV !== "production" && St("label.margin", "label.edgeDistance", "pie"), r.edgeDistance = r.margin);
}
function jv(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay, process.env.NODE_ENV !== "production" && St("downplay", "blur", "sunburst"));
}
function fC(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (process.env.NODE_ENV !== "production" && St("focusNodeAdjacency", "emphasis: { focus: 'adjacency'}", "graph/sankey"), r.emphasis.focus = "adjacency"));
}
function Vm(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && Vm(r[e].children, t);
}
function zm(r, t) {
  aC(r, t), r.series = Nt(r.series), D(r.series, function(e) {
    if (H(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow, process.env.NODE_ENV !== "production" && St("clipOverflow", "clip", "line"));
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise, process.env.NODE_ENV !== "production" && St("clockWise", "clockwise")), Qv(e.label);
        var n = e.data;
        if (n && !kt(n))
          for (var a = 0; a < n.length; a++)
            Qv(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (process.env.NODE_ENV !== "production" && St("hoverOffset", "emphasis.scaleSize"), e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = oC(e, "pointer.color");
        o != null && sC(e, "itemStyle.color", o);
      } else if (i === "bar") {
        xn(e), xn(e.backgroundStyle), xn(e.emphasis);
        var n = e.data;
        if (n && !kt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (xn(n[a]), xn(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s, process.env.NODE_ENV !== "production" && St("highlightPolicy", "emphasis.focus", "sunburst"))), jv(e), Vm(e.data, jv);
      } else i === "graph" || i === "sankey" ? fC(e) : i === "map" && (e.mapType && !e.map && (process.env.NODE_ENV !== "production" && St("mapType", "map", "map"), e.map = e.mapType), e.mapLocation && (process.env.NODE_ENV !== "production" && Le("`mapLocation` is not used anymore."), st(e, e.mapLocation)));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (process.env.NODE_ENV !== "production" && St("hoverAnimation", "emphasis.scale"), e.emphasis.scale = e.hoverAnimation)), Kv(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), D(uC, function(e) {
    var i = r[e];
    i && (F(i) || (i = [i]), D(i, function(n) {
      Kv(n);
    }));
  });
}
function hC(r) {
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
  }), t.each(cC);
}
function cC(r) {
  D(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, f, h) {
      var v = o.get(t.stackedDimension, h);
      if (isNaN(v))
        return n;
      var c, d;
      s ? d = o.getRawIndex(h) : c = o.get(t.stackedByDimension, h);
      for (var m = NaN, p = e - 1; p >= 0; p--) {
        var g = r[p];
        if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {
          var y = g.data.getByRawIndex(g.stackResultDimension, d);
          if (l === "all" || l === "positive" && y > 0 || l === "negative" && y < 0 || l === "samesign" && v >= 0 && y > 0 || l === "samesign" && v <= 0 && y < 0) {
            v = b1(v, y), m = y;
            break;
          }
        }
      }
      return i[0] = v, i[1] = m, i;
    });
  });
}
var qe = (
  /** @class */
  function() {
    function r() {
      this.group = new Bt(), this.uid = ws("viewComponent");
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
uf(qe);
is(qe);
var Jv = wt(), td = {
  itemStyle: ea(xg, !0),
  lineStyle: ea(bg, !0)
}, vC = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function Hm(r, t) {
  var e = r.visualStyleMapper || td[t];
  return e || (console.warn("Unknown style type '" + t + "'."), td.itemStyle);
}
function $m(r, t) {
  var e = r.visualDrawType || vC[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var dC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = Hm(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = $m(r, i), u = o[l], f = U(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || f || h) {
      var v = r.getColorFromPalette(
        // TODO series count changed.
        r.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, e.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || U(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || U(o.stroke) ? v : o.stroke;
    }
    if (e.setVisual("style", o), e.setVisual("drawType", l), !t.isSeriesFiltered(r) && f)
      return e.setVisual("colorFromPalette", !1), {
        dataEach: function(c, d) {
          var m = r.getDataParams(d), p = N({}, o);
          p[l] = f(m), c.setItemVisual(d, "style", p);
        }
      };
  }
}, Tn = new yt(), pC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = Hm(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            Tn.option = l[i];
            var u = n(Tn), f = o.ensureUniqueItemVisual(s, "style");
            N(f, u), Tn.option.decal && (o.setItemVisual(s, "decal", Tn.option.decal), Tn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, gC = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = K();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Jv(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Jv(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = $m(e, s);
        a.each(function(u) {
          var f = a.getRawIndex(u);
          n[f] = u;
        }), i.each(function(u) {
          var f = n[u], h = a.getItemVisual(f, "colorFromPalette");
          if (h) {
            var v = a.ensureUniqueItemVisual(f, "style"), c = i.getName(u) || u + "", d = i.count();
            v[l] = e.getColorFromPalette(c, o, d);
          }
        });
      }
    });
  }
}, Ka = Math.PI;
function mC(r, t) {
  t = t || {}, st(t, {
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
  var e = new Bt(), i = new Pt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new we({
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
  }), a = new Pt({
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
  return t.showSpinner && (o = new vs({
    shape: {
      startAngle: -Ka / 2,
      endAngle: -Ka / 2 + 0.1,
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
    endAngle: Ka * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Ka * 3 / 2
  }).delay(300).start("circularInOut"), e.add(o)), e.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (r.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), f = r.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: f
    }), a.setShape({
      x: u - l,
      y: f - l,
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
var Gm = (
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
        process.env.NODE_ENV !== "production" && (o = '"reset" and "overallReset" must not be both specified.'), Z(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
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
          var f = o._stageTaskMap.get(l.uid), h = f.seriesTaskMap, v = f.overallTask;
          if (v) {
            var c, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), c = !0);
            }), c && v.dirty(), o.updatePayload(v, i);
            var m = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(m);
            }), v.perform(m) && (a = !0);
          } else h && h.each(function(p, g) {
            s(n, p) && p.dirty();
            var y = o.getPerformArgs(p, n.block);
            y.skip = !l.performRawSeries && e.isSeriesFiltered(p.context.model), o.updatePayload(p, i), p.perform(y) && (a = !0);
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
      t.createOnAllSeries ? i.eachRawSeries(f) : l ? i.eachRawSeriesByType(l, f) : u && u(i, n).each(f);
      function f(h) {
        var v = h.uid, c = s.set(v, o && o.get(v) || Yn({
          plan: bC,
          reset: xC,
          count: CC
        }));
        c.context = {
          model: h,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(h, c);
      }
    }, r.prototype._createOverallStageTask = function(t, e, i, n) {
      var a = this, o = e.overallTask = e.overallTask || Yn({
        reset: yC
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = K(), u = t.seriesType, f = t.getTargetSeries, h = !0, v = !1, c = "";
      process.env.NODE_ENV !== "production" && (c = '"createOnAllSeries" is not supported for "overallReset", because it will block all streams.'), Z(!t.createOnAllSeries, c), u ? i.eachRawSeriesByType(u, d) : f ? f(i, n).each(d) : (h = !1, D(i.getSeries(), d));
      function d(m) {
        var p = m.uid, g = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, Yn({
          reset: _C,
          onDirty: SC
        })));
        g.context = {
          model: m,
          overallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, g.agent = o, g.__block = h, a._pipe(m, g);
      }
      v && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return U(t) && (t = {
        overallReset: t,
        seriesType: DC(t)
      }), t.uid = ws("stageHandler"), e && (t.visualType = e), t;
    }, r;
  }()
);
function yC(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function _C(r) {
  return r.overallProgress && wC;
}
function wC() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function SC() {
  this.agent && this.agent.dirty();
}
function bC(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function xC(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Nt(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? G(t, function(e, i) {
    return Wm(i);
  }) : TC;
}
var TC = Wm(0);
function Wm(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function CC(r) {
  return r.data.count();
}
function DC(r) {
  Yo = null;
  try {
    r(ha, Um);
  } catch {
  }
  return Yo;
}
var ha = {}, Um = {}, Yo;
Ym(ha, Jf);
Ym(Um, Fm);
ha.eachSeriesByType = ha.eachRawSeriesByType = function(r) {
  Yo = r;
};
ha.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Yo = r.subType);
};
function Ym(r, t) {
  for (var e in t.prototype)
    r[e] = Wt;
}
var ed = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const AC = {
  color: ed,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], ed]
};
var Dt = "#B9B8CE", rd = "#100C2A", Qa = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Dt
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
}, id = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], Xm = {
  darkMode: !0,
  color: id,
  backgroundColor: rd,
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
      color: Dt
    },
    pageTextStyle: {
      color: Dt
    }
  },
  textStyle: {
    color: Dt
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
      borderColor: Dt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Dt
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
      color: Dt
    }
  },
  timeline: {
    lineStyle: {
      color: Dt
    },
    label: {
      color: Dt
    },
    controlStyle: {
      color: Dt,
      borderColor: Dt
    }
  },
  calendar: {
    itemStyle: {
      color: rd
    },
    dayLabel: {
      color: Dt
    },
    monthLabel: {
      color: Dt
    },
    yearLabel: {
      color: Dt
    }
  },
  timeAxis: Qa(),
  logAxis: Qa(),
  valueAxis: Qa(),
  categoryAxis: Qa(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: id
  },
  gauge: {
    title: {
      color: Dt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Dt
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
Xm.categoryAxis.splitLine.show = !1;
var MC = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (z(t)) {
        var a = Ee(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        D(t, function(l, u) {
          for (var f = !1, h = 0; h < o.length; h++) {
            var v = o[h], c = u.lastIndexOf(v);
            if (c > 0 && c === u.length - v.length) {
              var d = u.slice(0, c);
              d !== "data" && (e.mainType = d, e[v.toLowerCase()] = l, f = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, f = !0), f || (n[u] = l);
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
      return f(l, o, "mainType") && f(l, o, "subType") && f(l, o, "index", "componentIndex") && f(l, o, "name") && f(l, o, "id") && f(u, a, "name") && f(u, a, "dataIndex") && f(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, n, a));
      function f(h, v, c, d) {
        return h[c] == null || v[d || c] === h[c];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  }()
), Nu = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], nd = Nu.concat(["symbolKeepAspect"]), EC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Nu.length; o++) {
      var s = Nu[o], l = r.get(s);
      U(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(N({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = ht(n);
    function f(h, v) {
      for (var c = r.getRawValue(v), d = r.getDataParams(v), m = 0; m < u.length; m++) {
        var p = u[m];
        h.setItemVisual(v, p, n[p](c, d));
      }
    }
    return {
      dataEach: a ? f : null
    };
  }
}, PC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < nd.length; s++) {
        var l = nd[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function LC(r, t, e) {
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
    default:
      process.env.NODE_ENV !== "production" && console.warn("Unknown visual type " + e);
  }
}
function IC(r, t) {
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
    default:
      process.env.NODE_ENV !== "production" && console.warn("Unknown visual type " + t);
  }
}
function Nn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var OC = Math.round(Math.random() * 9), RC = typeof Object.defineProperty == "function", NC = function() {
  function r() {
    this._id = "__ec_inner_" + OC++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return RC ? Object.defineProperty(i, this._id, {
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
}();
function Qr(r) {
  return isFinite(r);
}
function kC(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = Qr(i) ? i : 0, n = Qr(n) ? n : 1, a = Qr(a) ? a : 0, o = Qr(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function BC(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = Qr(o) ? o : 0.5, s = Qr(s) ? s : 0.5, l = l >= 0 && Qr(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function ku(r, t, e) {
  for (var i = t.type === "radial" ? BC(r, t, e) : kC(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function FC(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function ja(r) {
  return parseInt(r, 10);
}
function Ja(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || ja(s[i]) || ja(r.style[i])) - (ja(s[a]) || 0) - (ja(s[o]) || 0) | 0;
}
function VC(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : ct(r) ? [r] : F(r) ? r : null;
}
function Zm(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && VC(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = G(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var zC = new si(!0);
function Xo(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function ad(r) {
  return typeof r == "string" && r !== "none";
}
function Zo(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function od(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function sd(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Bu(r, t, e) {
  var i = Cp(t.image, t.__image, e);
  if (ns(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * V_), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function HC(r, t, e, i) {
  var n, a = Xo(e), o = Zo(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var f = t.path || zC, h = t.__dirty;
  if (!i) {
    var v = e.fill, c = e.stroke, d = o && !!v.colorStops, m = a && !!c.colorStops, p = o && !!v.image, g = a && !!c.image, y = void 0, _ = void 0, w = void 0, b = void 0, S = void 0;
    (d || m) && (S = t.getBoundingRect()), d && (y = h ? ku(r, v, S) : t.__canvasFillGradient, t.__canvasFillGradient = y), m && (_ = h ? ku(r, c, S) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (w = h || !t.__canvasFillPattern ? Bu(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = w), g && (b = h || !t.__canvasStrokePattern ? Bu(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = w), d ? r.fillStyle = y : p && (w ? r.fillStyle = w : o = !1), m ? r.strokeStyle = _ : g && (b ? r.strokeStyle = b : a = !1);
  }
  var x = t.getGlobalScale();
  f.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var C, A;
  r.setLineDash && e.lineDash && (n = Zm(t), C = n[0], A = n[1]);
  var M = !0;
  (u || h & Pi) && (f.setDPR(r.dpr), l ? f.setContext(null) : (f.setContext(r), M = !1), f.reset(), t.buildPath(f, t.shape, i), f.toStatic(), t.pathUpdated()), M && f.rebuildPath(r, l ? s : 1), C && (r.setLineDash(C), r.lineDashOffset = A), i || (e.strokeFirst ? (a && sd(r, e), o && od(r, e)) : (o && od(r, e), a && sd(r, e))), C && r.setLineDash([]);
}
function $C(r, t, e) {
  var i = t.__image = Cp(e.image, t.__image, t, t.onload);
  if (!(!i || !ns(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var u = e.sx || 0, f = e.sy || 0;
      r.drawImage(i, u, f, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var u = e.sx, f = e.sy, h = o - u, v = s - f;
      r.drawImage(i, u, f, h, v, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function GC(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || ai, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = Zm(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (Xo(e) && r.strokeText(n, e.x, e.y), Zo(e) && r.fillText(n, e.x, e.y)) : (Zo(e) && r.fillText(n, e.x, e.y), Xo(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var ld = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], ud = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function qm(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    Gt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? ei.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (Gt(r, n), a = !0), r.globalCompositeOperation = t.blend || ei.blend);
  for (var s = 0; s < ld.length; s++) {
    var l = ld[s];
    (i || t[l] !== e[l]) && (a || (Gt(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (Gt(r, n), a = !0), r.shadowColor = t.shadowColor || ei.shadowColor), a;
}
function fd(r, t, e, i, n) {
  var a = ca(t, n.inHover), o = i ? null : e && ca(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = qm(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Gt(r, n), s = !0), ad(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Gt(r, n), s = !0), ad(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Gt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (Gt(r, n), s = !0), r.lineWidth = u);
  }
  for (var f = 0; f < ud.length; f++) {
    var h = ud[f], v = h[0];
    (i || a[v] !== o[v]) && (s || (Gt(r, n), s = !0), r[v] = a[v] || h[1]);
  }
  return s;
}
function WC(r, t, e, i, n) {
  return qm(r, ca(t, n.inHover), e && ca(e, n.inHover), i, n);
}
function Km(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function UC(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), Km(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function YC(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var hd = 1, cd = 2, vd = 3, dd = 4;
function XC(r) {
  var t = Zo(r), e = Xo(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function Gt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function ca(r, t) {
  return t && r.__hoverStyle || r.style;
}
function Qm(r, t) {
  jr(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function jr(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Kt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || FC(a, o)) && (o && o.length && (Gt(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (Gt(r, e), r.save(), UC(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var f = t instanceof nt && t.autoBatch && XC(t.style);
  s || YC(n, u.transform) ? (Gt(r, e), Km(r, t)) : f || Gt(r, e);
  var h = ca(t, e.inHover);
  t instanceof nt ? (e.lastDrawType !== hd && (l = !0, e.lastDrawType = hd), fd(r, t, u, l, e), (!f || !e.batchFill && !e.batchStroke) && r.beginPath(), HC(r, t, h, f), f && (e.batchFill = h.fill || "", e.batchStroke = h.stroke || "")) : t instanceof Lo ? (e.lastDrawType !== vd && (l = !0, e.lastDrawType = vd), fd(r, t, u, l, e), GC(r, t, h)) : t instanceof Sr ? (e.lastDrawType !== cd && (l = !0, e.lastDrawType = cd), WC(r, t, u, l, e), $C(r, t, h)) : t.getTemporalDisplayables && (e.lastDrawType !== dd && (l = !0, e.lastDrawType = dd), ZC(r, t, e)), f && i && Gt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function ZC(r, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), jr(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, f = n.length; u < f; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), jr(r, l, a, u === f - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Ol = new NC(), pd = new ya(100), gd = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function md(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Ol.delete(r);
  var a = Ol.get(r);
  if (a)
    return a;
  var o = st(r, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Ol.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var f = [e], h = !0, v = 0; v < gd.length; ++v) {
      var c = o[gd[v]];
      if (c != null && !F(c) && !z(c) && !ct(c) && typeof c != "boolean") {
        h = !1;
        break;
      }
      f.push(c);
    }
    var d;
    if (h) {
      d = f.join(",") + (n ? "-svg" : "");
      var m = pd.get(d);
      m && (n ? u.svgElement = m : u.image = m);
    }
    var p = Jm(o.dashArrayX), g = qC(o.dashArrayY), y = jm(o.symbol), _ = KC(p), w = ty(g), b = !n && ji.createCanvas(), S = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = A(), C;
    b && (b.width = x.width * e, b.height = x.height * e, C = b.getContext("2d")), M(), h && pd.put(d, b || S), u.image = b, u.svgElement = S, u.svgWidth = x.width, u.svgHeight = x.height;
    function A() {
      for (var T = 1, E = 0, P = _.length; E < P; ++E)
        T = uc(T, _[E]);
      for (var L = 1, E = 0, P = y.length; E < P; ++E)
        L = uc(L, y[E].length);
      T *= L;
      var I = w * _.length * y.length;
      if (process.env.NODE_ENV !== "production") {
        var O = function(V) {
          console.warn("Calculated decal size is greater than " + V + " due to decal option settings so " + V + " is used for the decal size. Please consider changing the decal option to make a smaller decal or set " + V + " to be larger to avoid incontinuity.");
        };
        T > o.maxTileWidth && O("maxTileWidth"), I > o.maxTileHeight && O("maxTileHeight");
      }
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(I, o.maxTileHeight))
      };
    }
    function M() {
      C && (C.clearRect(0, 0, b.width, b.height), o.backgroundColor && (C.fillStyle = o.backgroundColor, C.fillRect(0, 0, b.width, b.height)));
      for (var T = 0, E = 0; E < g.length; ++E)
        T += g[E];
      if (T <= 0)
        return;
      for (var P = -w, L = 0, I = 0, O = 0; P < x.height; ) {
        if (L % 2 === 0) {
          for (var V = I / 2 % y.length, R = 0, k = 0, $ = 0; R < x.width * 2; ) {
            for (var X = 0, E = 0; E < p[O].length; ++E)
              X += p[O][E];
            if (X <= 0)
              break;
            if (k % 2 === 0) {
              var Q = (1 - o.symbolSize) * 0.5, at = R + p[O][k] * Q, ft = P + g[L] * Q, gt = p[O][k] * o.symbolSize, ve = g[L] * o.symbolSize, xr = $ / 2 % y[V].length;
              hi(at, ft, gt, ve, y[V][xr]);
            }
            R += p[O][k], ++$, ++k, k === p[O].length && (k = 0);
          }
          ++O, O === p.length && (O = 0);
        }
        P += g[L], ++I, ++L, L === g.length && (L = 0);
      }
      function hi(Xt, bt, Y, j, Tr) {
        var It = n ? 1 : e, vh = ua(Tr, Xt * It, bt * It, Y * It, j * It, o.color, o.symbolKeepAspect);
        if (n) {
          var dh = i.painter.renderOneToVNode(vh);
          dh && S.children.push(dh);
        } else
          Qm(C, vh);
      }
    }
  }
}
function jm(r) {
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
    return jm([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    z(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function Jm(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (ct(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!ct(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return Jm([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (ct(r[i])) {
      var t = Math.ceil(r[i]);
      n.push([t, t]);
    } else {
      var t = G(r[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function qC(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (ct(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = G(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function KC(r) {
  return G(r, function(t) {
    return ty(t);
  });
}
function ty(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function QC(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = md(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = md(n, t);
      }
    }
  });
}
var me = new ke(), qo = {};
function jC(r, t) {
  process.env.NODE_ENV !== "production" && qo[r] && Lt("Already has an implementation of " + r + "."), qo[r] = t;
}
function JC(r) {
  return process.env.NODE_ENV !== "production" && (qo[r] || Lt("Implementation of " + r + " doesn't exists.")), qo[r];
}
var tD = 1, eD = 800, rD = 900, iD = 1e3, nD = 2e3, aD = 5e3, ey = 1e3, oD = 1100, th = 2e3, ry = 3e3, sD = 4e3, Ds = 4500, lD = 4600, uD = 5e3, fD = 6e3, iy = 7e3, hD = {
  PROCESSOR: {
    FILTER: iD,
    SERIES_FILTER: eD,
    STATISTIC: aD
  },
  VISUAL: {
    LAYOUT: ey,
    PROGRESSIVE_LAYOUT: oD,
    GLOBAL: th,
    CHART: ry,
    POST_CHART_LAYOUT: lD,
    COMPONENT: sD,
    BRUSH: uD,
    CHART_ITEM: Ds,
    ARIA: fD,
    DECAL: iy
  }
}, Ct = "__flagInMainProcess", Vt = "__pendingUpdate", Rl = "__needsUpdateStatus", yd = /^[a-zA-Z0-9_]+$/, Nl = "__connectUpdateStatus", _d = 0, cD = 1, vD = 2;
function ny(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      Zt(this.id);
      return;
    }
    return oy(this, r, t);
  };
}
function ay(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return oy(this, r, t);
  };
}
function oy(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), ke.prototype[t].apply(r, e);
}
var sy = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(ke)
), ly = sy.prototype;
ly.on = ay("on");
ly.off = ay("off");
var Di, kl, to, ur, Bl, Fl, Vl, Cn, Dn, wd, Sd, zl, bd, eo, xd, uy, te, Td, fy = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, new MC()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, z(i) && (i = hy[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      if (process.env.NODE_ENV !== "production") {
        var u = (
          /* eslint-disable-next-line */
          W.hasGlobalWindow ? window : global
        );
        u && (o = q(u.__ECHARTS__DEFAULT__RENDERER__, o), s = q(u.__ECHARTS__DEFAULT__COARSE_POINTER, s), l = q(u.__ECHARTS__DEFAULT__USE_DIRTY_RECT__, l));
      }
      n.ssr;
      var f = a._zr = $v(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: q(n.useDirtyRect, l),
        useCoarsePointer: q(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = Qf(pt(f.flush, f), 17), i = J(i), i && zm(i, !0), a._theme = i, a._locale = hb(n.locale || Gg), a._coordSysMgr = new Nf();
      var h = a._api = xd(a);
      function v(c, d) {
        return c.__prio - d.__prio;
      }
      return yo(Qo, v), yo(Fu, v), a._scheduler = new Gm(a, h, Fu, Qo), a._messageCenter = new sy(), a._initEvents(), a.resize = pt(a.resize, a), f.animation.on("frame", a._onframe, a), wd(f, a), Sd(f, a), Ql(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        Td(this);
        var e = this._scheduler;
        if (this[Vt]) {
          var i = this[Vt].silent;
          this[Ct] = !0;
          try {
            Di(this), ur.update.call(this, null, this[Vt].updateParams);
          } catch (l) {
            throw this[Ct] = !1, this[Vt] = null, l;
          }
          this._zr.flush(), this[Ct] = !1, this[Vt] = null, Cn.call(this, i), Dn.call(this, i);
        } else if (e.unfinished) {
          var n = tD, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Fl(this, a), e.performVisualTasks(a), eo(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
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
      if (this[Ct]) {
        process.env.NODE_ENV !== "production" && Lt("`setOption` should not be called during main process.");
        return;
      }
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      var a, o, s;
      if (H(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Ct] = !0, !this._model || i) {
        var l = new JT(this._api), u = this._theme, f = this._model = new Jf();
        f.scheduler = this._scheduler, f.ssr = this._ssr, f.init(null, null, null, u, this._locale, l);
      }
      this._model.setOption(e, {
        replaceMerge: o
      }, Vu);
      var h = {
        seriesTransition: s,
        optionChanged: !0
      };
      if (n)
        this[Vt] = {
          silent: a,
          updateParams: h
        }, this[Ct] = !1, this.getZr().wakeUp();
      else {
        try {
          Di(this), ur.update.call(this, null, h);
        } catch (v) {
          throw this[Vt] = null, this[Ct] = !1, v;
        }
        this._ssr || this._zr.flush(), this[Vt] = null, this[Ct] = !1, Cn.call(this, a), Dn.call(this, a);
      }
    }, t.prototype.setTheme = function() {
      Le("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || W.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(e) {
      return process.env.NODE_ENV !== "production" && St("getRenderedCanvas", "renderToCanvas"), this.renderToCanvas(e);
    }, t.prototype.renderToCanvas = function(e) {
      e = e || {};
      var i = this._zr.painter;
      if (process.env.NODE_ENV !== "production" && i.type !== "canvas")
        throw new Error("renderToCanvas can only be used in the canvas renderer.");
      return i.getRenderedCanvas({
        backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(e) {
      e = e || {};
      var i = this._zr.painter;
      if (process.env.NODE_ENV !== "production" && i.type !== "svg")
        throw new Error("renderToSVGString can only be used in the svg renderer.");
      return i.renderToString({
        useViewBox: e.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (W.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return D(i, function(n) {
          n.stopAnimation(null, !0);
        }), e.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(e) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      e = e || {};
      var i = e.excludeComponents, n = this._model, a = [], o = this;
      D(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var f = o._componentsMap[u.__viewId];
          f.group.ignore || (a.push(f), f.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return D(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (Cd[n]) {
        var l = s, u = s, f = -s, h = -s, v = [], c = e && e.pixelRatio || this.getDevicePixelRatio();
        D(Zn, function(_, w) {
          if (_.group === n) {
            var b = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(J(e)), S = _.getDom().getBoundingClientRect();
            l = a(S.left, l), u = a(S.top, u), f = o(S.right, f), h = o(S.bottom, h), v.push({
              dom: b,
              left: S.left,
              top: S.top
            });
          }
        }), l *= c, u *= c, f *= c, h *= c;
        var d = f - l, m = h - u, p = ji.createCanvas(), g = $v(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (g.resize({
          width: d,
          height: m
        }), i) {
          var y = "";
          return D(v, function(_) {
            var w = _.left - l, b = _.top - u;
            y += '<g transform="translate(' + w + "," + b + ')">' + _.dom + "</g>";
          }), g.painter.getSvgRoot().innerHTML = y, e.connectedBackgroundColor && g.painter.setBackgroundColor(e.connectedBackgroundColor), g.refreshImmediately(), g.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && g.add(new Pt({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: m
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), D(v, function(_) {
            var w = new Sr({
              style: {
                x: _.left * c - l,
                y: _.top * c - u,
                image: _.dom
              }
            });
            g.add(w);
          }), g.refreshImmediately(), p.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return Bl(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return Bl(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      var n = this._model, a, o = Js(n, e);
      return D(o, function(s, l) {
        l.indexOf("Models") >= 0 && D(s, function(u) {
          var f = u.coordinateSystem;
          if (f && f.containPoint)
            a = a || !!f.containPoint(i);
          else if (l === "seriesModels") {
            var h = this._chartsMap[u.__viewId];
            h && h.containPoint ? a = a || h.containPoint(i, u) : process.env.NODE_ENV !== "production" && Et(l + ": " + (h ? "The found component do not support containPoint." : "No view mapping to the found component."));
          } else
            process.env.NODE_ENV !== "production" && Et(l + ": containPoint is not supported");
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(e, i) {
      var n = this._model, a = Js(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel;
      process.env.NODE_ENV !== "production" && (o || Et("There is no specified series model"));
      var s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? LC(s, l, i) : IC(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      D(dD, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && Nn(s, function(d) {
            var m = ot(d);
            if (m && m.dataIndex != null) {
              var p = m.dataModel || o.getSeriesByIndex(m.seriesIndex);
              return l = p && p.getDataParams(m.dataIndex, m.dataType, s) || {}, !0;
            } else if (m.eventData)
              return l = N({}, m.eventData), !0;
          }, !0), l) {
            var f = l.componentType, h = l.componentIndex;
            (f === "markLine" || f === "markPoint" || f === "markArea") && (f = "series", h = l.seriesIndex);
            var v = f && h != null && o.getComponent(f, h), c = v && e[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            process.env.NODE_ENV !== "production" && !u && !(v && c) && Et("model or view can not be found by params"), l.event = a, l.type = i, e._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: c
            }, e.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(i, n, e);
      }), D(Xn, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), D(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), hT(this._messageCenter, this, this._api);
    }, t.prototype.isDisposed = function() {
      return this._disposed;
    }, t.prototype.clear = function() {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function() {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      this._disposed = !0;
      var e = this.getDom();
      e && Qp(this.getDom(), rh, "");
      var i = this, n = i._api, a = i._model;
      D(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), D(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete Zn[i.id];
    }, t.prototype.resize = function(e) {
      if (this[Ct]) {
        process.env.NODE_ENV !== "production" && Lt("`resize` should not be called during main process.");
        return;
      }
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      this._zr.resize(e);
      var i = this._model;
      if (this._loadingFX && this._loadingFX.resize(), !!i) {
        var n = i.resetOption("media"), a = e && e.silent;
        this[Vt] && (a == null && (a = this[Vt].silent), n = !0, this[Vt] = null), this[Ct] = !0;
        try {
          n && Di(this), ur.update.call(this, {
            type: "resize",
            animation: N({
              // Disable animation
              duration: 0
            }, e && e.animation)
          });
        } catch (o) {
          throw this[Ct] = !1, o;
        }
        this[Ct] = !1, Cn.call(this, a), Dn.call(this, a);
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      if (H(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !zu[e]) {
        process.env.NODE_ENV !== "production" && Et("Loading effects " + e + " not exists.");
        return;
      }
      var n = zu[e](this._api, i), a = this._zr;
      this._loadingFX = n, a.add(n);
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = N({}, e);
      return i.type = Xn[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      if (H(i) || (i = {
        silent: !!i
      }), !!Ko[e.type] && this._model) {
        if (this[Ct]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Vl.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && W.browser.weChat && this._throttledZrFlush(), Cn.call(this, n), Dn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      me.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(e) {
      if (this._disposed) {
        Zt(this.id);
        return;
      }
      var i = e.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      process.env.NODE_ENV !== "production" && Z(e.data && a), a.appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = function() {
      Di = function(h) {
        var v = h._scheduler;
        v.restorePipelines(h._model), v.prepareStageTasks(), kl(h, !0), kl(h, !1), v.plan();
      }, kl = function(h, v) {
        for (var c = h._model, d = h._scheduler, m = v ? h._componentsViews : h._chartsViews, p = v ? h._componentsMap : h._chartsMap, g = h._zr, y = h._api, _ = 0; _ < m.length; _++)
          m[_].__alive = !1;
        v ? c.eachComponent(function(S, x) {
          S !== "series" && w(x);
        }) : c.eachSeries(w);
        function w(S) {
          var x = S.__requireNewView;
          S.__requireNewView = !1;
          var C = "_ec_" + S.id + "_" + S.type, A = !x && p[C];
          if (!A) {
            var M = Ee(S.type), T = v ? qe.getClass(M.main, M.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              _e.getClass(M.sub)
            );
            process.env.NODE_ENV !== "production" && Z(T, M.sub + " does not exist."), A = new T(), A.init(c, y), p[C] = A, m.push(A), g.add(A.group);
          }
          S.__viewId = A.__id = C, A.__alive = !0, A.__model = S, A.group.__ecComponentInfo = {
            mainType: S.mainType,
            index: S.componentIndex
          }, !v && d.prepareView(A, S, c, y);
        }
        for (var _ = 0; _ < m.length; ) {
          var b = m[_];
          b.__alive ? _++ : (!v && b.renderTask.dispose(), g.remove(b.group), b.dispose(c, y), m.splice(_, 1), p[b.__id] === b && delete p[b.__id], b.__id = b.group.__ecComponentInfo = null);
        }
      }, to = function(h, v, c, d, m) {
        var p = h._model;
        if (p.setUpdatePayload(c), !d) {
          D([].concat(h._componentsViews).concat(h._chartsViews), b);
          return;
        }
        var g = {};
        g[d + "Id"] = c[d + "Id"], g[d + "Index"] = c[d + "Index"], g[d + "Name"] = c[d + "Name"];
        var y = {
          mainType: d,
          query: g
        };
        m && (y.subType = m);
        var _ = c.excludeSeriesId, w;
        _ != null && (w = K(), D(Nt(_), function(S) {
          var x = Pe(S, null);
          x != null && w.set(x, !0);
        })), p && p.eachComponent(y, function(S) {
          var x = w && w.get(S.id) != null;
          if (!x)
            if (Cc(c))
              if (S instanceof Oe)
                c.type === ri && !c.notBlur && !S.get(["emphasis", "disabled"]) && tw(S, c, h._api);
              else {
                var C = bf(S.mainType, S.componentIndex, c.name, h._api), A = C.focusSelf, M = C.dispatchers;
                c.type === ri && A && !c.notBlur && vu(S.mainType, S.componentIndex, h._api), M && D(M, function(T) {
                  c.type === ri ? No(T) : ko(T);
                });
              }
            else pu(c) && S instanceof Oe && (iw(S, c, h._api), xc(S), te(h));
        }, h), p && p.eachComponent(y, function(S) {
          var x = w && w.get(S.id) != null;
          x || b(h[d === "series" ? "_chartsMap" : "_componentsMap"][S.__viewId]);
        }, h);
        function b(S) {
          S && S.__alive && S[v] && S[v](S.__model, p, h._api, c);
        }
      }, ur = {
        prepareAndUpdate: function(h) {
          Di(this), ur.update.call(this, h, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: h.newOption != null
          });
        },
        update: function(h, v) {
          var c = this._model, d = this._api, m = this._zr, p = this._coordSysMgr, g = this._scheduler;
          if (c) {
            c.setUpdatePayload(h), g.restoreData(c, h), g.performSeriesTasks(c), p.create(c, d), g.performDataProcessorTasks(c, h), Fl(this, c), p.update(c, d), e(c), g.performVisualTasks(c, h), zl(this, c, d, h, v);
            var y = c.get("backgroundColor") || "transparent", _ = c.get("darkMode");
            m.setBackgroundColor(y), _ != null && _ !== "auto" && m.setDarkMode(_), me.trigger("afterupdate", c, d);
          }
        },
        updateTransform: function(h) {
          var v = this, c = this._model, d = this._api;
          if (c) {
            c.setUpdatePayload(h);
            var m = [];
            c.eachComponent(function(g, y) {
              if (g !== "series") {
                var _ = v.getViewOfComponentModel(y);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var w = _.updateTransform(y, c, d, h);
                    w && w.update && m.push(_);
                  } else
                    m.push(_);
              }
            });
            var p = K();
            c.eachSeries(function(g) {
              var y = v._chartsMap[g.__viewId];
              if (y.updateTransform) {
                var _ = y.updateTransform(g, c, d, h);
                _ && _.update && p.set(g.uid, 1);
              } else
                p.set(g.uid, 1);
            }), e(c), this._scheduler.performVisualTasks(c, h, {
              setDirty: !0,
              dirtyMap: p
            }), eo(this, c, d, h, {}, p), me.trigger("afterupdate", c, d);
          }
        },
        updateView: function(h) {
          var v = this._model;
          v && (v.setUpdatePayload(h), _e.markUpdateMethod(h, "updateView"), e(v), this._scheduler.performVisualTasks(v, h, {
            setDirty: !0
          }), zl(this, v, this._api, h, {}), me.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(h) {
          var v = this, c = this._model;
          c && (c.setUpdatePayload(h), c.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), _e.markUpdateMethod(h, "updateVisual"), e(c), this._scheduler.performVisualTasks(c, h, {
            visualType: "visual",
            setDirty: !0
          }), c.eachComponent(function(d, m) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(m);
              p && p.__alive && p.updateVisual(m, c, v._api, h);
            }
          }), c.eachSeries(function(d) {
            var m = v._chartsMap[d.__viewId];
            m.updateVisual(d, c, v._api, h);
          }), me.trigger("afterupdate", c, this._api));
        },
        updateLayout: function(h) {
          ur.update.call(this, h);
        }
      }, Bl = function(h, v, c, d) {
        if (h._disposed) {
          Zt(h.id);
          return;
        }
        for (var m = h._model, p = h._coordSysMgr.getCoordinateSystems(), g, y = Js(m, c), _ = 0; _ < p.length; _++) {
          var w = p[_];
          if (w[v] && (g = w[v](m, y, d)) != null)
            return g;
        }
        process.env.NODE_ENV !== "production" && Et("No coordinate system that supports " + v + " found by the given finder.");
      }, Fl = function(h, v) {
        var c = h._chartsMap, d = h._scheduler;
        v.eachSeries(function(m) {
          d.updateStreamModes(m, c[m.__viewId]);
        });
      }, Vl = function(h, v) {
        var c = this, d = this.getModel(), m = h.type, p = h.escapeConnect, g = Ko[m], y = g.actionInfo, _ = (y.update || "update").split(":"), w = _.pop(), b = _[0] != null && Ee(_[0]);
        this[Ct] = !0;
        var S = [h], x = !1;
        h.batch && (x = !0, S = G(h.batch, function(L) {
          return L = st(N({}, L), h), L.batch = null, L;
        }));
        var C = [], A, M = pu(h), T = Cc(h);
        if (T && og(this._api), D(S, function(L) {
          if (A = g.action(L, c._model, c._api), A = A || N({}, L), A.type = y.event || A.type, C.push(A), T) {
            var I = yf(h), O = I.queryOptionMap, V = I.mainTypeSpecified, R = V ? O.keys()[0] : "series";
            to(c, w, L, R), te(c);
          } else M ? (to(c, w, L, "series"), te(c)) : b && to(c, w, L, b.main, b.sub);
        }), w !== "none" && !T && !M && !b)
          try {
            this[Vt] ? (Di(this), ur.update.call(this, h), this[Vt] = null) : ur[w].call(this, h);
          } catch (L) {
            throw this[Ct] = !1, L;
          }
        if (x ? A = {
          type: y.event || m,
          escapeConnect: p,
          batch: C
        } : A = C[0], this[Ct] = !1, !v) {
          var E = this._messageCenter;
          if (E.trigger(A.type, A), M) {
            var P = {
              type: "selectchanged",
              escapeConnect: p,
              selected: nw(d),
              isFromClick: h.isFromClick || !1,
              fromAction: h.type,
              fromActionPayload: h
            };
            E.trigger(P.type, P);
          }
        }
      }, Cn = function(h) {
        for (var v = this._pendingActions; v.length; ) {
          var c = v.shift();
          Vl.call(this, c, h);
        }
      }, Dn = function(h) {
        !h && this.trigger("updated");
      }, wd = function(h, v) {
        h.on("rendered", function(c) {
          v.trigger("rendered", c), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !v[Vt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, Sd = function(h, v) {
        h.on("mouseover", function(c) {
          var d = c.target, m = Nn(d, qi);
          m && (ew(m, c, v._api), te(v));
        }).on("mouseout", function(c) {
          var d = c.target, m = Nn(d, qi);
          m && (rw(m, c, v._api), te(v));
        }).on("click", function(c) {
          var d = c.target, m = Nn(d, function(y) {
            return ot(y).dataIndex != null;
          }, !0);
          if (m) {
            var p = m.selected ? "unselect" : "select", g = ot(m);
            v._api.dispatchAction({
              type: p,
              dataType: g.dataType,
              dataIndexInside: g.dataIndex,
              seriesIndex: g.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function e(h) {
        h.clearColorPalette(), h.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(h) {
        var v = [], c = [], d = !1;
        if (h.eachComponent(function(y, _) {
          var w = _.get("zlevel") || 0, b = _.get("z") || 0, S = _.getZLevelKey();
          d = d || !!S, (y === "series" ? c : v).push({
            zlevel: w,
            z: b,
            idx: _.componentIndex,
            type: y,
            key: S
          });
        }), d) {
          var m = v.concat(c), p, g;
          yo(m, function(y, _) {
            return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
          }), D(m, function(y) {
            var _ = h.getComponent(y.type, y.idx), w = y.zlevel, b = y.key;
            p != null && (w = Math.max(p, w)), b ? (w === p && b !== g && w++, g = b) : g && (w === p && w++, g = ""), p = w, _.setZLevel(w);
          });
        }
      }
      zl = function(h, v, c, d, m) {
        i(v), bd(h, v, c, d, m), D(h._chartsViews, function(p) {
          p.__alive = !1;
        }), eo(h, v, c, d, m), D(h._chartsViews, function(p) {
          p.__alive || p.remove(v, c);
        });
      }, bd = function(h, v, c, d, m, p) {
        D(p || h._componentsViews, function(g) {
          var y = g.__model;
          u(y, g), g.render(y, v, c, d), s(y, g), f(y, g);
        });
      }, eo = function(h, v, c, d, m, p) {
        var g = h._scheduler;
        m = N(m || {}, {
          updatedSeries: v.getSeries()
        }), me.trigger("series:beforeupdate", v, c, m);
        var y = !1;
        v.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          w.__alive = !0;
          var b = w.renderTask;
          g.updatePayload(b, d), u(_, w), p && p.get(_.uid) && b.dirty(), b.perform(g.getPerformArgs(b)) && (y = !0), w.group.silent = !!_.get("silent"), o(_, w), xc(_);
        }), g.unfinished = y || g.unfinished, me.trigger("series:layoutlabels", v, c, m), me.trigger("series:transition", v, c, m), v.eachSeries(function(_) {
          var w = h._chartsMap[_.__viewId];
          s(_, w), f(_, w);
        }), a(h, v), me.trigger("series:afterupdate", v, c, m);
      }, te = function(h) {
        h[Rl] = !0, h.getZr().wakeUp();
      }, Td = function(h) {
        h[Rl] && (h.getZr().storage.traverse(function(v) {
          Wn(v) || n(v);
        }), h[Rl] = !1);
      };
      function n(h) {
        for (var v = [], c = h.currentStates, d = 0; d < c.length; d++) {
          var m = c[d];
          m === "emphasis" || m === "blur" || m === "select" || v.push(m);
        }
        h.selected && h.states.select && v.push("select"), h.hoverState === fs && h.states.emphasis ? v.push("emphasis") : h.hoverState === us && h.states.blur && v.push("blur"), h.useStates(v);
      }
      function a(h, v) {
        var c = h._zr, d = c.storage, m = 0;
        d.traverse(function(p) {
          p.isGroup || m++;
        }), m > v.get("hoverLayerThreshold") && !W.node && !W.worker && v.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var g = h._chartsMap[p.__viewId];
            g.__alive && g.eachRendered(function(y) {
              y.states.emphasis && (y.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(h, v) {
        var c = h.get("blendMode") || null;
        v.eachRendered(function(d) {
          d.isGroup || (d.style.blend = c);
        });
      }
      function s(h, v) {
        if (!h.preventAutoZ) {
          var c = h.get("z") || 0, d = h.get("zlevel") || 0;
          v.eachRendered(function(m) {
            return l(m, c, d, -1 / 0), !0;
          });
        }
      }
      function l(h, v, c, d) {
        var m = h.getTextContent(), p = h.getTextGuideLine(), g = h.isGroup;
        if (g)
          for (var y = h.childrenRef(), _ = 0; _ < y.length; _++)
            d = Math.max(l(y[_], v, c, d), d);
        else
          h.z = v, h.zlevel = c, d = Math.max(h.z2, d);
        if (m && (m.z = v, m.zlevel = c, isFinite(d) && (m.z2 = d + 2)), p) {
          var w = h.textGuideLineConfig;
          p.z = v, p.zlevel = c, isFinite(d) && (p.z2 = d + (w && w.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(h, v) {
        v.eachRendered(function(c) {
          if (!Wn(c)) {
            var d = c.getTextContent(), m = c.getTextGuideLine();
            c.stateTransition && (c.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), m && m.stateTransition && (m.stateTransition = null), c.hasState() ? (c.prevStates = c.currentStates, c.clearStates()) : c.prevStates && (c.prevStates = null);
          }
        });
      }
      function f(h, v) {
        var c = h.getModel("stateAnimation"), d = h.isAnimationEnabled(), m = c.get("duration"), p = m > 0 ? {
          duration: m,
          delay: c.get("delay"),
          easing: c.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(g) {
          if (g.states && g.states.emphasis) {
            if (Wn(g))
              return;
            if (g instanceof nt && fw(g), g.__dirty) {
              var y = g.prevStates;
              y && g.useStates(y);
            }
            if (d) {
              g.stateTransition = p;
              var _ = g.getTextContent(), w = g.getTextGuideLine();
              _ && (_.stateTransition = p), w && (w.stateTransition = p);
            }
            g.__dirty && n(g);
          }
        });
      }
      xd = function(h) {
        return new /** @class */
        (function(v) {
          B(c, v);
          function c() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return c.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, c.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var m = d.__ecComponentInfo;
              if (m != null)
                return h._model.getComponent(m.mainType, m.index);
              d = d.parent;
            }
          }, c.prototype.enterEmphasis = function(d, m) {
            No(d, m), te(h);
          }, c.prototype.leaveEmphasis = function(d, m) {
            ko(d, m), te(h);
          }, c.prototype.enterBlur = function(d) {
            J1(d), te(h);
          }, c.prototype.leaveBlur = function(d) {
            rg(d), te(h);
          }, c.prototype.enterSelect = function(d) {
            ig(d), te(h);
          }, c.prototype.leaveSelect = function(d) {
            ng(d), te(h);
          }, c.prototype.getModel = function() {
            return h.getModel();
          }, c.prototype.getViewOfComponentModel = function(d) {
            return h.getViewOfComponentModel(d);
          }, c.prototype.getViewOfSeriesModel = function(d) {
            return h.getViewOfSeriesModel(d);
          }, c;
        }(Fm))(h);
      }, uy = function(h) {
        function v(c, d) {
          for (var m = 0; m < c.length; m++) {
            var p = c[m];
            p[Nl] = d;
          }
        }
        D(Xn, function(c, d) {
          h._messageCenter.on(d, function(m) {
            if (Cd[h.group] && h[Nl] !== _d) {
              if (m && m.escapeConnect)
                return;
              var p = h.makeActionFromEvent(m), g = [];
              D(Zn, function(y) {
                y !== h && y.group === h.group && g.push(y);
              }), v(g, _d), D(g, function(y) {
                y[Nl] !== cD && y.dispatchAction(p);
              }), v(g, vD);
            }
          });
        });
      };
    }(), t;
  }(ke)
), eh = fy.prototype;
eh.on = ny("on");
eh.off = ny("off");
eh.one = function(r, t, e) {
  var i = this;
  Le("ECharts#one is deprecated.");
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var dD = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
function Zt(r) {
  process.env.NODE_ENV !== "production" && Et("Instance " + r + " has been disposed");
}
var Ko = {}, Xn = {}, Fu = [], Vu = [], Qo = [], hy = {}, zu = {}, Zn = {}, Cd = {}, pD = +/* @__PURE__ */ new Date() - 0, rh = "_echarts_instance_";
function gD(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    if (process.env.NODE_ENV !== "production" && !r)
      throw new Error("Initialize failed: invalid dom.");
    var n = mD(r);
    if (n)
      return process.env.NODE_ENV !== "production" && Et("There is a chart instance already initialized on the dom."), n;
    process.env.NODE_ENV !== "production" && Yi(r) && r.nodeName.toUpperCase() !== "CANVAS" && (!r.clientWidth && (!e || e.width == null) || !r.clientHeight && (!e || e.height == null)) && Et("Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.For example, you may need to call this in the callback of window.onload.");
  }
  var a = new fy(r, t, e);
  return a.id = "ec_" + pD++, Zn[a.id] = a, i && Qp(r, rh, a.id), uy(a), me.trigger("afterinit", a), a;
}
function mD(r) {
  return Zn[z1(r, rh)];
}
function cy(r, t) {
  hy[r] = t;
}
function vy(r) {
  ut(Vu, r) < 0 && Vu.push(r);
}
function dy(r, t) {
  nh(Fu, r, t, nD);
}
function yD(r) {
  ih("afterinit", r);
}
function _D(r) {
  ih("afterupdate", r);
}
function ih(r, t) {
  me.on(r, t);
}
function an(r, t, e) {
  U(t) && (e = t, t = "");
  var i = H(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !Xn[t] && (Z(yd.test(i) && yd.test(t)), Ko[i] || (Ko[i] = {
    action: e,
    actionInfo: r
  }), Xn[t] = i);
}
function wD(r, t) {
  Nf.register(r, t);
}
function SD(r, t) {
  nh(Qo, r, t, ey, "layout");
}
function fi(r, t) {
  nh(Qo, r, t, ry, "visual");
}
var Dd = [];
function nh(r, t, e, i, n) {
  if ((U(t) || H(t)) && (e = t, t = i), process.env.NODE_ENV !== "production") {
    if (isNaN(t) || t == null)
      throw new Error("Illegal priority");
    D(r, function(o) {
      Z(o.__raw !== e);
    });
  }
  if (!(ut(Dd, e) >= 0)) {
    Dd.push(e);
    var a = Gm.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function py(r, t) {
  zu[r] = t;
}
function bD(r, t, e) {
  var i = JC("registerMap");
  i && i(r, t, e);
}
var xD = Nb;
fi(th, dC);
fi(Ds, pC);
fi(Ds, gC);
fi(th, EC);
fi(Ds, PC);
fi(iy, QC);
vy(zm);
dy(rD, hC);
py("default", mC);
an({
  type: ri,
  event: ri,
  update: ri
}, Wt);
an({
  type: ho,
  event: ho,
  update: ho
}, Wt);
an({
  type: Hn,
  event: Hn,
  update: Hn
}, Wt);
an({
  type: co,
  event: co,
  update: co
}, Wt);
an({
  type: $n,
  event: $n,
  update: $n
}, Wt);
cy("light", AC);
cy("dark", Xm);
var Ad = [], TD = {
  registerPreprocessor: vy,
  registerProcessor: dy,
  registerPostInit: yD,
  registerPostUpdate: _D,
  registerUpdateLifecycle: ih,
  registerAction: an,
  registerCoordinateSystem: wD,
  registerLayout: SD,
  registerVisual: fi,
  registerTransform: xD,
  registerLoading: py,
  registerMap: bD,
  registerImpl: jC,
  PRIORITY: hD,
  ComponentModel: rt,
  ComponentView: qe,
  SeriesModel: Oe,
  ChartView: _e,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    rt.registerClass(r);
  },
  registerComponentView: function(r) {
    qe.registerClass(r);
  },
  registerSeriesModel: function(r) {
    Oe.registerClass(r);
  },
  registerChartView: function(r) {
    _e.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    rt.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    $T(r, t);
  }
};
function va(r) {
  if (F(r)) {
    D(r, function(t) {
      va(t);
    });
    return;
  }
  ut(Ad, r) >= 0 || (Ad.push(r), U(r) && (r = {
    install: r
  }), r.install(TD));
}
var CD = (
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
  }(rt)
), DD = (
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
), Hu = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", ye).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(rt)
);
Ne(Hu, DD);
var gy = {
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
}, AD = it({
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
}, gy), ah = it({
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
}, gy), MD = it({
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
}, ah), ED = st({
  logBase: 10
}, ah);
const PD = {
  category: AD,
  value: ah,
  time: MD,
  log: ED
};
var LD = 0, $u = (
  /** @class */
  function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++LD;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && G(i, ID);
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
function ID(r) {
  return H(r) && r.value != null ? r.value : r + "";
}
var OD = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Md(r, t, e, i) {
  D(OD, function(n, a) {
    var o = it(it({}, PD[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var f = l !== null && l.apply(this, arguments) || this;
          return f.type = t + "Axis." + a, f;
        }
        return u.prototype.mergeDefaultAndTheme = function(f, h) {
          var v = oa(this), c = v ? Gf(f) : {}, d = h.getTheme();
          it(f, d.get(a + "Axis")), it(f, this.getDefaultOption()), f.type = Ed(f), v && sa(f, c, v);
        }, u.prototype.optionUpdated = function() {
          var f = this.option;
          f.type === "category" && (this.__ordinalMeta = $u.createByAxisModel(this));
        }, u.prototype.getCategories = function(f) {
          var h = this.option;
          if (h.type === "category")
            return f ? h.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      }(e)
    );
    r.registerComponentModel(s);
  }), r.registerSubTypeDefaulter(t + "Axis", Ed);
}
function Ed(r) {
  return r.type || (r.data ? "category" : "value");
}
var Fe = (
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
is(Fe);
function RD(r) {
  var t = Math.pow(10, ss(Math.abs(r))), e = Math.abs(r / t);
  return e === 0 || e === 1 || e === 2 || e === 3 || e === 5;
}
function Gu(r) {
  return r.type === "interval" || r.type === "log";
}
function ND(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = Wp(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = my(o), l = n.niceTickExtent = [_t(Math.ceil(r[0] / o) * o, s), _t(Math.floor(r[1] / o) * o, s)];
  return kD(l, r), n;
}
function Hl(r) {
  var t = Math.pow(10, ss(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, _t(e * t);
}
function my(r) {
  return $e(r) + 2;
}
function Pd(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function kD(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), Pd(r, 0, t), Pd(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function As(r, t) {
  return r >= t[0] && r <= t[1];
}
function Ms(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function Es(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var oh = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new $u({})), F(n) && (n = new $u({
        categories: G(n, function(a) {
          return H(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : z(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), As(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), Ms(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round(Es(e, this._extent)), this.getRawOrdinalNumber(e);
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
      for (var f = 0; o < s; ++o) {
        for (; a[f] != null; )
          f++;
        n.push(f), a[f] = o;
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
  }(Fe)
);
Fe.registerClass(oh);
var Yr = _t, on = (
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
      return As(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return Ms(e, this._extent);
    }, t.prototype.scale = function(e) {
      return Es(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = my(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: Yr(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = Yr(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var f = s.length ? s[s.length - 1].value : a[1];
      return n[1] > f && (e ? s.push({
        value: Yr(f + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, f = [], h = s.value - l.value, v = h / e; u < e - 1; ) {
          var c = Yr(l.value + (u + 1) * v);
          c > a[0] && c < a[1] && f.push(c), u++;
        }
        n.push(f);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = $e(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = Yr(e.value, n, !0);
      return Jg(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = ND(a, e, i, n);
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
      e.fixMin || (i[0] = Yr(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = Yr(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  }(Fe)
);
Fe.registerClass(on);
var BD = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, yy = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return Ss(e.value, ev[pb($i(this._minLevelUnit))] || ev.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return gb(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = WD(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= ue, i[1] += ue), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - ue;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = ro.length, l = Math.min(BD(ro, this._approxInterval, 0, s), s - 1);
      this._interval = ro[l][1], this._minLevelUnit = ro[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return ct(e) ? e : +Xe(e);
    }, t.prototype.contain = function(e) {
      return As(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return Ms(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return Es(e, this._extent);
    }, t.type = "time", t;
  }(on)
), ro = [
  // Format                           interval
  ["second", Vf],
  ["minute", zf],
  ["hour", Un],
  ["quarter-day", Un * 6],
  ["half-day", Un * 12],
  ["day", ue * 1.2],
  ["half-week", ue * 3.5],
  ["week", ue * 7],
  ["month", ue * 31],
  ["quarter", ue * 95],
  ["half-year", tv / 2],
  ["year", tv]
  // 1Y
];
function FD(r, t, e, i) {
  var n = Xe(t), a = Xe(e), o = function(d) {
    return rv(n, d, i) === rv(a, d, i);
  }, s = function() {
    return o("year");
  }, l = function() {
    return s() && o("month");
  }, u = function() {
    return l() && o("day");
  }, f = function() {
    return u() && o("hour");
  }, h = function() {
    return f() && o("minute");
  }, v = function() {
    return h() && o("second");
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
      return f();
    case "minute":
      return h();
    case "second":
      return v();
    case "millisecond":
      return c();
  }
}
function VD(r, t) {
  return r /= ue, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function zD(r) {
  var t = 30 * ue;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function HD(r) {
  return r /= Un, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function Ld(r, t) {
  return r /= t ? zf : Vf, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function $D(r) {
  return Wp(r);
}
function GD(r, t, e) {
  var i = new Date(r);
  switch ($i(t)) {
    case "year":
    case "month":
      i[Xg(e)](0);
    case "day":
      i[Zg(e)](1);
    case "hour":
      i[qg(e)](0);
    case "minute":
      i[Kg(e)](0);
    case "second":
      i[Qg(e)](0), i[jg(e)](0);
  }
  return i.getTime();
}
function WD(r, t, e, i) {
  var n = 1e4, a = Ug, o = 0;
  function s(M, T, E, P, L, I, O) {
    for (var V = new Date(T), R = T, k = V[P](); R < E && R <= i[1]; )
      O.push({
        value: R
      }), k += M, V[L](k), R = V.getTime();
    O.push({
      value: R,
      notAdd: !0
    });
  }
  function l(M, T, E) {
    var P = [], L = !T.length;
    if (!FD($i(M), i[0], i[1], e)) {
      L && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: GD(new Date(i[0]), M, e)
      }, {
        value: i[1]
      }]);
      for (var I = 0; I < T.length - 1; I++) {
        var O = T[I].value, V = T[I + 1].value;
        if (O !== V) {
          var R = void 0, k = void 0, $ = void 0, X = !1;
          switch (M) {
            case "year":
              R = Math.max(1, Math.round(t / ue / 365)), k = Hf(e), $ = mb(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              R = zD(t), k = Gi(e), $ = Xg(e);
              break;
            case "week":
            case "half-week":
            case "day":
              R = VD(t), k = bs(e), $ = Zg(e), X = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              R = HD(t), k = aa(e), $ = qg(e);
              break;
            case "minute":
              R = Ld(t, !0), k = xs(e), $ = Kg(e);
              break;
            case "second":
              R = Ld(t, !1), k = Ts(e), $ = Qg(e);
              break;
            case "millisecond":
              R = $D(t), k = Cs(e), $ = jg(e);
              break;
          }
          s(R, O, V, k, $, X, P), M === "year" && E.length > 1 && I === 0 && E.unshift({
            value: E[0].value - R
          });
        }
      }
      for (var I = 0; I < P.length; I++)
        E.push(P[I]);
      return P;
    }
  }
  for (var u = [], f = [], h = 0, v = 0, c = 0; c < a.length && o++ < n; ++c) {
    var d = $i(a[c]);
    if (db(a[c])) {
      l(a[c], u[u.length - 1] || [], f);
      var m = a[c + 1] ? $i(a[c + 1]) : null;
      if (d !== m) {
        if (f.length) {
          v = h, f.sort(function(M, T) {
            return M.value - T.value;
          });
          for (var p = [], g = 0; g < f.length; ++g) {
            var y = f[g].value;
            (g === 0 || f[g - 1].value !== y) && (p.push(f[g]), y >= i[0] && y <= i[1] && h++);
          }
          var _ = (i[1] - i[0]) / t;
          if (h > _ * 1.5 && v > _ / 1.5 || (u.push(p), h > _ || r === a[c]))
            break;
        }
        f = [];
      }
    }
  }
  process.env.NODE_ENV !== "production" && o >= n && Et("Exceed safe limit.");
  for (var w = Mt(G(u, function(M) {
    return Mt(M, function(T) {
      return T.value >= i[0] && T.value <= i[1] && !T.notAdd;
    });
  }), function(M) {
    return M.length > 0;
  }), b = [], S = w.length - 1, c = 0; c < w.length; ++c)
    for (var x = w[c], C = 0; C < x.length; ++C)
      b.push({
        value: x[C].value,
        level: S - c
      });
  b.sort(function(M, T) {
    return M.value - T.value;
  });
  for (var A = [], c = 0; c < b.length; ++c)
    (c === 0 || b[c].value !== b[c - 1].value) && A.push(b[c]);
  return A;
}
Fe.registerClass(yy);
var Id = Fe.prototype, qn = on.prototype, UD = _t, YD = Math.floor, XD = Math.ceil, io = Math.pow, de = Math.log, sh = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new on(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = qn.getTicks.call(this, e);
      return G(o, function(s) {
        var l = s.value, u = _t(io(this.base, l));
        return u = l === n[0] && this._fixMin ? no(u, a[0]) : u, u = l === n[1] && this._fixMax ? no(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = de(this.base);
      e = de(Math.max(0, e)) / n, i = de(Math.max(0, i)) / n, qn.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = Id.getExtent.call(this);
      i[0] = io(e, i[0]), i[1] = io(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = no(i[0], a[0])), this._fixMax && (i[1] = no(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = de(e[0]) / de(i), e[1] = de(e[1]) / de(i), Id.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = T1(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [_t(XD(i[0] / a) * a), _t(YD(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      qn.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = de(e) / de(this.base), As(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = de(e) / de(this.base), Ms(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Es(e, this._extent), io(this.base, e);
    }, t.type = "log", t;
  }(Fe)
), _y = sh.prototype;
_y.getMinorTicks = qn.getMinorTicks;
_y.getLabel = qn.getLabel;
function no(r, t) {
  return UD(r, $e(t));
}
Fe.registerClass(sh);
var ZD = (
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
      U(o) ? this._modelMinNum = ao(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = ao(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (U(s) ? this._modelMaxNum = ao(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = ao(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = F(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? (process.env.NODE_ENV !== "production" && console.warn('Boolean type for boundaryGap is only allowed for ordinal axis. Please use string in percentage instead, e.g., "20%". Currently, boundaryGap is set to be 0.'), this._boundaryGapInner = [0, 0]) : this._boundaryGapInner = [_r(u[0], 1), _r(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, f = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var h = ta(s) || ta(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !f && (l = 0));
      var v = this._determinedMin, c = this._determinedMax;
      return v != null && (s = v, u = !0), c != null && (l = c, f = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: f,
        isBlank: h
      };
    }, r.prototype.modifyDataMinMax = function(t, e) {
      process.env.NODE_ENV !== "production" && Z(!this.frozen), this[KD[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = qD[t];
      process.env.NODE_ENV !== "production" && Z(!this.frozen && this[i] == null), this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  }()
), qD = {
  min: "_determinedMin",
  max: "_determinedMax"
}, KD = {
  min: "_dataMin",
  max: "_dataMax"
};
function QD(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new ZD(r, t, e), r.rawExtentInfo = i, i);
}
function ao(r, t) {
  return t == null ? null : ta(t) ? NaN : r.parse(t);
}
function wy(r, t) {
  var e = r.type, i = QD(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = xm("bar", o), l = !1;
    if (D(s, function(h) {
      l = l || h.getBaseAxis() === t.axis;
    }), l) {
      var u = Tm(s), f = jD(n, a, t, u);
      n = f.min, a = f.max;
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
function jD(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = Ux(i, e.axis);
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
  var u = s + l, f = t - r, h = 1 - (s + l) / a, v = f / h - f;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function Od(r, t) {
  var e = t, i = wy(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof sh && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function JD(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      case "category":
        return new oh({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new yy({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (Fe.getClass(t) || on)();
    }
}
function tA(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function sn(r) {
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
  }(t) : U(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(lh(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function lh(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function eA(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof oh ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = sn(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var f = 0; f < n; f += u) {
      var h = i ? i[f] : {
        value: a[0] + f
      }, v = s(h, f), c = o.getTextRect(v), d = rA(c, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function rA(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new et(r.x, r.y, a, o);
  return s;
}
function uh(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function Sy(r) {
  return r.type === "category" && uh(r.getLabelModel()) === 0;
}
function iA(r, t) {
  var e = {};
  return D(r.mapDimensionsAll(t), function(i) {
    e[ZS(r, i)] = !0;
  }), ht(e);
}
var nA = (
  /** @class */
  function() {
    function r(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return r.prototype.getAxis = function(t) {
      return this._axes[t];
    }, r.prototype.getAxes = function() {
      return G(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, r.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), Mt(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  }()
), Wu = ["x", "y"];
function Rd(r) {
  return r.type === "interval" || r.type === "time";
}
var aA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = Wu, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Rd(e) || !Rd(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var f = (s[0] - o[0]) / l, h = (s[1] - o[1]) / u, v = o[0] - n[0] * f, c = o[1] - a[0] * h, d = this._transform = [f, 0, 0, h, v, c];
          this._invTransform = cf([], d);
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
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new et(n[0], n[1], a[0] - n[0], a[1] - n[1]);
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
      return new et(a, o, s, l);
    }, t;
  }(nA)
), da = wt();
function by(r, t) {
  var e = G(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function oA(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = sn(r), i = r.scale.getExtent(), n = by(r, t), a = Mt(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: G(a, function(o) {
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
  return r.type === "category" ? lA(r) : fA(r);
}
function sA(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = by(r, e);
    return {
      ticks: Mt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? uA(r, t) : {
    ticks: G(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function lA(r) {
  var t = r.getLabelModel(), e = xy(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function xy(r, t) {
  var e = Ty(r, "labels"), i = uh(t), n = Cy(e, i);
  if (n)
    return n;
  var a, o;
  return U(i) ? a = My(r, i) : (o = i === "auto" ? hA(r) : i, a = Ay(r, o)), Dy(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function uA(r, t) {
  var e = Ty(r, "ticks"), i = uh(t), n = Cy(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), U(i))
    a = My(r, i, !0);
  else if (i === "auto") {
    var s = xy(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = G(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = Ay(r, o, !0);
  return Dy(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function fA(r) {
  var t = r.scale.getTicks(), e = sn(r);
  return {
    labels: G(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: e(i, n),
        rawLabel: r.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function Ty(r, t) {
  return da(r)[t] || (da(r)[t] = []);
}
function Cy(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function Dy(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function hA(r) {
  var t = da(r).autoInterval;
  return t ?? (da(r).autoInterval = r.calculateCategoryInterval());
}
function cA(r) {
  var t = vA(r), e = sn(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), f = Math.abs(u * Math.cos(i)), h = Math.abs(u * Math.sin(i)), v = 0, c = 0; l <= a[1]; l += s) {
    var d = 0, m = 0, p = vf(e({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, m = p.height * 1.3, v = Math.max(v, d, 7), c = Math.max(c, m, 7);
  }
  var g = v / f, y = c / h;
  isNaN(g) && (g = 1 / 0), isNaN(y) && (y = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(g, y))), w = da(r.model), b = r.getExtent(), S = w.lastAutoInterval, x = w.lastTickCount;
  return S != null && x != null && Math.abs(S - _) <= 1 && Math.abs(x - o) <= 1 && S > _ && w.axisExtent0 === b[0] && w.axisExtent1 === b[1] ? _ = S : (w.lastTickCount = o, w.lastAutoInterval = _, w.axisExtent0 = b[0], w.axisExtent1 = b[1]), _;
}
function vA(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function Ay(r, t, e) {
  var i = sn(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], f = n.count();
  u !== 0 && l > 1 && f / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var h = Sy(r), v = o.get("showMinLabel") || h, c = o.get("showMaxLabel") || h;
  v && u !== a[0] && m(a[0]);
  for (var d = u; d <= a[1]; d += l)
    m(d);
  c && d - l !== a[1] && m(a[1]);
  function m(p) {
    var g = {
      value: p
    };
    s.push(e ? p : {
      formattedLabel: i(g),
      rawLabel: n.getLabel(g),
      tickValue: p
    });
  }
  return s;
}
function My(r, t, e) {
  var i = r.scale, n = sn(r), a = [];
  return D(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Nd = [0, 1], dA = (
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
      return S1(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), kd(i, n.count())), lc(t, Nd, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), kd(i, n.count()));
      var a = lc(t, i, Nd, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = sA(this, e), n = i.ticks, a = G(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return pA(this, a, o, t.clamp), a;
    }, r.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), e = t.get("splitNumber");
      e > 0 && e < 100 || (e = 5);
      var i = this.scale.getMinorTicks(e), n = G(i, function(a) {
        return G(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, r.prototype.getViewLabels = function() {
      return oA(this).labels;
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
      return cA(this);
    }, r;
  }()
);
function kd(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function pA(r, t, e, i) {
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
    var f = r.scale.getExtent();
    s = 1 + f[1] - t[n - 1].tickValue, o = {
      coord: t[n - 1].coord + u * s,
      tickValue: f[1] + 1
    }, t.push(o);
  }
  var h = a[0] > a[1];
  v(t[0].coord, a[0]) && (i ? t[0].coord = a[0] : t.shift()), i && v(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), v(a[1], o.coord) && (i ? o.coord = a[1] : t.pop()), i && v(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function v(c, d) {
    return c = _t(c), d = _t(d), h ? c > d : c < d;
  }
}
var gA = (
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
  }(dA)
);
function Uu(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, f = i.getRect(), h = [f.x, f.x + f.width, f.y, f.y + f.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = t.get("offset") || 0, d = u === "x" ? [h[2] - c, h[3] + c] : [h[0] - c, h[1] + c];
  if (o) {
    var m = o.toGlobalCoord(o.dataToCoord(0));
    d[v.onZero] = Math.max(Math.min(m, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[v[l]] : h[0], u === "x" ? d[v[l]] : h[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), oi(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var g = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -g : g, a.z2 = 1, a;
}
function Bd(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function Fd(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, ye).models[0];
    if (process.env.NODE_ENV !== "production" && !a)
      throw new Error(n + ' "' + ki(r.get(n + "Index"), r.get(n + "Id"), 0) + '" not found');
    t[i] = a;
  }), t;
}
var $l = Math.log;
function mA(r, t, e) {
  var i = on.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = wy(r, t), u = l.extent, f = l.fixMin, h = l.fixMax;
  if (r.type === "log") {
    var v = $l(r.base);
    u = [$l(u[0]) / v, $l(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: f,
    fixMax: h
  });
  var c = i.getExtent.call(r);
  f && (u[0] = c[0]), h && (u[1] = c[1]);
  var d = i.getInterval.call(r), m = u[0], p = u[1];
  if (f && h)
    d = (p - m) / o;
  else if (f)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = Hl(d), p = u[0] + d * o;
  else if (h)
    for (m = u[1] - d * o; m > u[0] && isFinite(m) && isFinite(u[0]); )
      d = Hl(d), m = u[1] - d * o;
  else {
    var g = r.getTicks().length - 1;
    g > o && (d = Hl(d));
    var y = d * o;
    p = Math.ceil(u[1] / d) * d, m = _t(p - y), m < 0 && u[0] >= 0 ? (m = 0, p = _t(y)) : p > 0 && u[1] <= 0 && (p = 0, m = -_t(y));
  }
  var _ = (n[0].value - a[0].value) / s, w = (n[o].value - a[o].value) / s;
  if (i.setExtent.call(r, m + d * _, p + d * w), i.setInterval.call(r, d), (_ || w) && i.setNiceExtent.call(r, m + d, p - d), process.env.NODE_ENV !== "production") {
    var b = i.getTicks.call(r);
    b[1] && (!RD(d) || hu(b[1].value) > hu(d)) && Et(
      // eslint-disable-next-line
      "The ticks may be not readable when set min: " + t.get("min") + ", max: " + t.get("max") + " and alignTicks: true"
    );
  }
}
var yA = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = Wu, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = ht(o), u = l.length;
        if (u) {
          for (var f = [], h = u - 1; h >= 0; h--) {
            var v = +l[h], c = o[v], d = c.model, m = c.scale;
            // Only value and log axis without interval support alignTicks.
            Gu(m) && d.get("alignTicks") && d.get("interval") == null ? f.push(c) : (Od(m, d), Gu(m) && (s = c));
          }
          f.length && (s || (s = f.pop(), Od(s.scale, s.model)), D(f, function(p) {
            mA(p.scale, p.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      D(i.x, function(o) {
        Vd(i, "y", o, a);
      }), D(i.y, function(o) {
        Vd(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = im(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (D(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var f = eA(u);
          if (f) {
            var h = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[h] -= f[h] + v, u.position === "top" ? o.y += f.height + v : u.position === "left" && (o.x += f.width + v);
          }
        }
      }), l()), D(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        D(s, function(u) {
          var f = u.isHorizontal(), h = f ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(h[v], h[1 - v]), _A(u, f ? o.x : o.y);
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
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", ye).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", ye).models[0], a = t.gridModel, o = this._coordsList, s, l;
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
      this._axesMap = s, D(s.x, function(f, h) {
        D(s.y, function(v, c) {
          var d = "x" + h + "y" + c, m = new aA(d);
          m.master = n, m.model = t, n._coordsMap[d] = m, n._coordsList.push(m), m.addAxis(f), m.addAxis(v);
        });
      });
      function u(f) {
        return function(h, v) {
          if (Gl(h, t)) {
            var c = h.get("position");
            f === "x" ? c !== "top" && c !== "bottom" && (c = o.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = o.left ? "right" : "left"), o[c] = !0;
            var d = new gA(f, JD(h), [0, 0], h.get("type"), c), m = d.type === "category";
            d.onBand = m && h.get("boundaryGap"), d.inverse = h.get("inverse"), h.axis = d, d.model = h, d.grid = a, d.index = v, a._axesList.push(d), s[f][v] = d, l[f]++;
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
        if (Bd(n)) {
          var a = Fd(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Gl(o, e) || !Gl(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), f = l.getAxis("x"), h = l.getAxis("y");
          i(u, f), i(u, h);
        }
      }, this);
      function i(n, a) {
        D(iA(n, a.dim), function(o) {
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
        if (Bd(n)) {
          var a = Fd(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel();
          if (process.env.NODE_ENV !== "production") {
            if (!l)
              throw new Error('Grid "' + ki(o.get("gridIndex"), o.get("gridId"), 0) + '" not found');
            if (o.getCoordSysModel() !== s.getCoordSysModel())
              throw new Error("xAxis and yAxis must use the same grid");
          }
          var u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = Wu, r;
  }()
);
function Gl(r, t) {
  return r.getCoordSysModel() === t;
}
function Vd(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    zd(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && zd(n[u]) && !i[f(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[f(a)] = !0);
  function f(h) {
    return h.dim + "_" + h.index;
  }
}
function zd(r) {
  return r && r.type !== "category" && r.type !== "time" && tA(r);
}
function _A(r, t) {
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
var dr = Math.PI, yr = (
  /** @class */
  function() {
    function r(t, e) {
      this.group = new Bt(), this.opt = e, this.axisModel = t, st(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Bt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!Hd[t];
    }, r.prototype.add = function(t) {
      Hd[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = Gp(e - t), a, o;
      return Io(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Io(n - dr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < dr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), Hd = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (fe(s, s, o), fe(l, l, o));
      var f = N({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), h = new wr({
        shape: {
          x1: s[0],
          y1: s[1],
          x2: l[0],
          y2: l[1]
        },
        style: f,
        strokeContainThreshold: r.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      ia(h.shape, h.style.lineWidth), h.anid = "line", e.add(h);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var c = t.get(["axisLine", "symbolSize"]);
        z(v) && (v = [v, v]), (z(c) || ct(c)) && (c = [c, c]);
        var d = hm(t.get(["axisLine", "symbolOffset"]) || 0, c), m = c[0], p = c[1];
        D([{
          rotate: r.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(g, y) {
          if (v[y] !== "none" && v[y] != null) {
            var _ = ua(v[y], -m / 2, -p / 2, m, p, f.stroke, !0), w = g.r + g.offset, b = u ? l : s;
            _.attr({
              rotation: g.rotate,
              x: b[0] + w * Math.cos(r.rotation),
              y: b[1] - w * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = bA(e, i, t, r), a = TA(e, i, t, r);
    if (SA(t, a, n), xA(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = cT(G(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      vT(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = oi(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), f = u[0] > u[1] ? -1 : 1, h = [
        a === "start" ? u[0] - f * l : a === "end" ? u[1] + f * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Gd(a) ? r.labelOffset + o * l : 0
      ], v, c = t.get("nameRotate");
      c != null && (c = c * dr / 180);
      var d;
      Gd(a) ? v = yr.innerTextLayout(
        r.rotation,
        c ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = wA(r.rotation, a, c || 0, u), d = r.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var m = s.getFont(), p = t.get("nameTruncate", !0) || {}, g = p.ellipsis, y = oi(r.nameTruncateMaxWidth, p.maxWidth, d), _ = new we({
        x: h[0],
        y: h[1],
        rotation: v.rotation,
        silent: yr.isLabelSilent(t),
        style: na(s, {
          text: n,
          font: m,
          overflow: "truncate",
          width: y,
          ellipsis: g,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || v.textAlign,
          verticalAlign: s.get("verticalAlign") || v.textVerticalAlign
        }),
        z2: 1
      });
      if (Lf({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var w = yr.makeAxisEventDataBase(t);
        w.targetType = "axisName", w.name = n, ot(_).eventData = w;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function wA(r, t, e, i) {
  var n = Gp(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Io(n - dr / 2) ? (o = l ? "bottom" : "top", a = "center") : Io(n - dr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < dr * 1.5 && n > dr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function SA(r, t, e) {
  if (!Sy(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], f = e[1], h = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (ee(a), ee(u)) : $d(a, o) && (i ? (ee(o), ee(f)) : (ee(a), ee(u))), n === !1 ? (ee(s), ee(h)) : $d(l, s) && (n ? (ee(l), ee(v)) : (ee(s), ee(h)));
  }
}
function ee(r) {
  r && (r.ignore = !0);
}
function $d(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = ff([]);
    return hf(n, n, -r.rotation), e.applyTransform(Fi([], n, r.getLocalTransform())), i.applyTransform(Fi([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function Gd(r) {
  return r === "middle" || r === "center";
}
function Ey(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (fe(o, o, t), fe(s, s, t));
    var f = new wr({
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
    ia(f.shape, f.style.lineWidth), f.anid = n + "_" + r[l].tickValue, a.push(f);
  }
  return a;
}
function bA(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), f = Ey(u, t.transform, l, st(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), h = 0; h < f.length; h++)
      r.add(f[h]);
    return f;
  }
}
function xA(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = st(s.getLineStyle(), st(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), f = 0; f < o.length; f++)
        for (var h = Ey(o[f], t.transform, l, u, "minorticks_" + f), v = 0; v < h.length; v++)
          r.add(h[v]);
  }
}
function TA(r, t, e, i) {
  var n = e.axis, a = oi(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (oi(i.labelRotate, o.get("rotate")) || 0) * dr / 180, f = yr.innerTextLayout(i.rotation, u, i.labelDirection), h = e.getCategories && e.getCategories(!0), v = [], c = yr.isLabelSilent(e), d = e.get("triggerEvent");
    return D(l, function(m, p) {
      var g = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(m.tickValue) : m.tickValue, y = m.formattedLabel, _ = m.rawLabel, w = o;
      if (h && h[g]) {
        var b = h[g];
        H(b) && b.textStyle && (w = new yt(b.textStyle, o, e.ecModel));
      }
      var S = w.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(g), C = w.getShallow("align", !0) || f.textAlign, A = q(w.getShallow("alignMinLabel", !0), C), M = q(w.getShallow("alignMaxLabel", !0), C), T = w.getShallow("verticalAlign", !0) || w.getShallow("baseline", !0) || f.textVerticalAlign, E = q(w.getShallow("verticalAlignMinLabel", !0), T), P = q(w.getShallow("verticalAlignMaxLabel", !0), T), L = new we({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: f.rotation,
        silent: c,
        z2: 10 + (m.level || 0),
        style: na(w, {
          text: y,
          align: p === 0 ? A : p === l.length - 1 ? M : C,
          verticalAlign: p === 0 ? E : p === l.length - 1 ? P : T,
          fill: U(S) ? S(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? g + "" : g,
            p
          ) : S
        })
      });
      if (L.anid = "label_" + g, Lf({
        el: L,
        componentModel: e,
        itemName: y,
        formatterParamsExtra: {
          isTruncated: function() {
            return L.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var I = yr.makeAxisEventDataBase(e);
        I.targetType = "axisLabel", I.value = _, I.tickIndex = p, n.type === "category" && (I.dataIndex = g), ot(L).eventData = I;
      }
      t.add(L), L.updateTransform(), v.push(L), r.add(L), L.decomposeTransform();
    }), v;
  }
}
function CA(r, t) {
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
  return DA(e, r, t), e.seriesInvolved && MA(e, r), e;
}
function DA(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  D(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = pa(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var f = s.model, h = f.getModel("tooltip", i);
    if (D(s.getAxes(), Qt(m, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var v = h.get("trigger") === "axis", c = h.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (v || c) && D(d.baseAxes, Qt(m, c ? "cross" : !0, v)), c && D(d.otherAxes, Qt(m, "cross", !1));
    }
    function m(p, g, y) {
      var _ = y.model.getModel("axisPointer", n), w = _.get("show");
      if (!(!w || w === "auto" && !p && !Yu(_))) {
        g == null && (g = _.get("triggerTooltip")), _ = p ? AA(y, h, n, t, p, g) : _;
        var b = _.get("snap"), S = _.get("triggerEmphasis"), x = pa(y.model), C = g || b || y.type === "category", A = r.axesInfo[x] = {
          key: x,
          axis: y,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: g,
          triggerEmphasis: S,
          involveSeries: C,
          snap: b,
          useHandle: Yu(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = A, r.seriesInvolved = r.seriesInvolved || C;
        var M = EA(a, y);
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
function AA(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  D(s, function(v) {
    l[v] = J(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var f = o.get(["label", "show"]);
    if (u.show = f ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && st(u, h.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new yt(l, e, i));
}
function MA(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || D(r.coordSysAxesInfo[pa(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function EA(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (Wl(a[i + "AxisId"], e.id) || Wl(a[i + "AxisIndex"], e.componentIndex) || Wl(a[i + "AxisName"], e.name))
      return n;
  }
}
function Wl(r, t) {
  return r === "all" || F(r) && ut(r, t) >= 0 || r === t;
}
function PA(r) {
  var t = fh(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = Yu(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function fh(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[pa(r)];
}
function LA(r) {
  var t = fh(r);
  return t && t.axisPointerModel;
}
function Yu(r) {
  return !!r.get(["handle", "show"]);
}
function pa(r) {
  return r.type + "||" + r.id;
}
var Ul = {}, Py = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && PA(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
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
        var o = LA(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      if (process.env.NODE_ENV !== "production" && Ul[e])
        throw new Error("axisPointer " + e + " exists");
      Ul[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && Ul[e];
    }, t.type = "axis", t;
  }(qe)
), Xu = wt();
function IA(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var f = s.length, h = Xu(r).splitAreaColors, v = K(), c = 0;
      if (h)
        for (var d = 0; d < u.length; d++) {
          var m = h.get(u[d].tickValue);
          if (m != null) {
            c = (m + (f - 1) * d) % f;
            break;
          }
        }
      var p = n.toGlobalCoord(u[0].coord), g = o.getAreaStyle();
      s = F(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var y = n.toGlobalCoord(u[d].coord), _ = void 0, w = void 0, b = void 0, S = void 0;
        n.isHorizontal() ? (_ = p, w = l.y, b = y - _, S = l.height, p = _ + b) : (_ = l.x, w = p, b = l.width, S = y - w, p = w + S);
        var x = u[d - 1].tickValue;
        x != null && v.set(x, c), t.add(new Pt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: w,
            width: b,
            height: S
          },
          style: st({
            fill: s[c]
          }, g),
          autoBatch: !0,
          silent: !0
        })), c = (c + 1) % f;
      }
      Xu(r).splitAreaColors = v;
    }
  }
}
function OA(r) {
  Xu(r).splitAreaColors = null;
}
var RA = ["axisLine", "axisTickLabel", "axisName"], NA = ["splitArea", "splitLine", "minorSplitLine"], Ly = (
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
      if (this._axisGroup = new Bt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = Uu(s, e), u = new yr(e, N({
          handleAutoShown: function(h) {
            for (var v = s.coordinateSystem.getCartesians(), c = 0; c < v.length; c++)
              if (Gu(v[c].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        D(RA, u.add, u), this._axisGroup.add(u.getGroup()), D(NA, function(h) {
          e.get([h, "show"]) && kA[h](this, this._axisGroup, e, s);
        }, this);
        var f = a && a.type === "changeAxisOrder" && a.isInitSort;
        f || _g(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      OA(this);
    }, t.type = "cartesianAxis", t;
  }(Py)
), kA = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = F(s) ? s : [s];
      for (var f = i.coordinateSystem.getRect(), h = n.isHorizontal(), v = 0, c = n.getTicksCoords({
        tickModel: a
      }), d = [], m = [], p = o.getLineStyle(), g = 0; g < c.length; g++) {
        var y = n.toGlobalCoord(c[g].coord);
        if (!(g === 0 && !l || g === c.length - 1 && !u)) {
          var _ = c[g].tickValue;
          h ? (d[0] = y, d[1] = f.y, m[0] = y, m[1] = f.y + f.height) : (d[0] = f.x, d[1] = y, m[0] = f.x + f.width, m[1] = y);
          var w = v++ % s.length, b = new wr({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: m[0],
              y2: m[1]
            },
            style: st({
              stroke: s[w]
            }, p),
            silent: !0
          });
          ia(b.shape, p.lineWidth), t.add(b);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var f = [], h = [], v = o.getLineStyle(), c = 0; c < u.length; c++)
        for (var d = 0; d < u[c].length; d++) {
          var m = n.toGlobalCoord(u[c][d].coord);
          l ? (f[0] = m, f[1] = s.y, h[0] = m, h[1] = s.y + s.height) : (f[0] = s.x, f[1] = m, h[0] = s.x + s.width, h[1] = m);
          var p = new wr({
            anid: "minor_line_" + u[c][d].tickValue,
            autoBatch: !0,
            shape: {
              x1: f[0],
              y1: f[1],
              x2: h[0],
              y2: h[1]
            },
            style: v,
            silent: !0
          });
          ia(p.shape, v.lineWidth), t.add(p);
        }
  },
  splitArea: function(r, t, e, i) {
    IA(r, t, e, i);
  }
}, Iy = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  }(Ly)
), BA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = Iy.type, e;
    }
    return t.type = "yAxis", t;
  }(Ly)
), FA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new Pt({
        shape: e.coordinateSystem.getRect(),
        style: st({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(qe)
), Wd = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function VA(r) {
  r.registerComponentView(FA), r.registerComponentModel(CD), r.registerCoordinateSystem("cartesian2d", yA), Md(r, "x", Hu, Wd), Md(r, "y", Hu, Wd), r.registerComponentView(Iy), r.registerComponentView(BA), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var Zr = wt(), Ud = J, Yl = pt, zA = (
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
        var f = u.graphicKey;
        f !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = f;
        var h = this._moveAnimation = this.determineAnimation(t, e);
        if (!s)
          s = this._group = new Bt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = Qt(Yd, e, h);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        Zd(s, e, !0), this._renderHandle(a);
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
          var l = fh(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = Zr(t).pointerEl = new eS[a.type](Ud(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = Zr(t).labelEl = new we(Ud(e.label));
        t.add(a), Xd(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = Zr(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = Zr(t).labelEl;
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
        this._handle || (s = !0, n = this._handle = wg(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Pm(u.event);
          },
          onmousedown: Yl(this._onHandleDragMove, this, 0, 0),
          drift: Yl(this._onHandleDragMove, this),
          ondragend: Yl(this._onHandleDragEnd, this)
        }), i.add(n)), Zd(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        F(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, Am(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      Yd(this._axisPointerModel, !e && this._moveAnimation, this._handle, Xl(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Xl(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Xl(n)), Zr(i).lastProp = null, this._doDispatchAxisPointer();
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
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Lu(this, "_doDispatchAxisPointer");
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
  Oy(Zr(e).lastProp, i) || (Zr(e).lastProp = i, t ? he(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function Oy(r, t) {
  if (H(r) && H(t)) {
    var e = !0;
    return D(t, function(i, n) {
      e = e && Oy(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function Xd(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Xl(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function Zd(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function HA(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function $A(r, t, e, i, n) {
  var a = e.get("value"), o = Ry(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = $f(s.get("padding") || 0), u = s.getFont(), f = vf(o, u), h = n.position, v = f.width + l[1] + l[3], c = f.height + l[0] + l[2], d = n.align;
  d === "right" && (h[0] -= v), d === "center" && (h[0] -= v / 2);
  var m = n.verticalAlign;
  m === "bottom" && (h[1] -= c), m === "middle" && (h[1] -= c / 2), GA(h, v, c, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: na(s, {
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
function GA(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function Ry(r, t, e, i, n) {
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
      value: lh(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    D(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), f = l.dataIndexInside, h = u && u.getDataParams(f);
      h && s.seriesData.push(h);
    }), z(o) ? a = o.replace("{value}", a) : U(o) && (a = o(s));
  }
  return a;
}
function Ny(r, t, e) {
  var i = Bi();
  return hf(i, i, e.rotation), Jl(i, i, e.position), Pf([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function WA(r, t, e, i, n, a) {
  var o = yr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), $A(t, i, n, a, {
    position: Ny(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function UA(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function YA(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var XA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), f = qd(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = HA(a), c = ZA[u](s, h, f);
        c.style = v, e.graphicKey = c.type, e.pointer = c;
      }
      var d = Uu(l.model, n);
      WA(
        // @ts-ignore
        i,
        e,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = Uu(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = Ny(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = qd(s, o).getOtherAxis(o).getGlobalExtent(), f = o.dim === "x" ? 0 : 1, h = [e.x, e.y];
      h[f] += i[f], h[f] = Math.min(l[1], h[f]), h[f] = Math.max(l[0], h[f]);
      var v = (u[1] + u[0]) / 2, c = [v, v];
      c[f] = h[f];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: h[0],
        y: h[1],
        rotation: e.rotation,
        cursorPoint: c,
        tooltipOption: d[f]
      };
    }, t;
  }(zA)
);
function qd(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var ZA = {
  line: function(r, t, e) {
    var i = UA([t, e[0]], [t, e[1]], Kd(r));
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
      shape: YA([t - i / 2, e[0]], [i, n], Kd(r))
    };
  }
};
function Kd(r) {
  return r.dim === "x" ? 0 : 1;
}
var qA = (
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
  }(rt)
), We = wt(), KA = D;
function ky(r, t, e) {
  if (!W.node) {
    var i = t.getZr();
    We(i).records || (We(i).records = {}), QA(i, t);
    var n = We(i).records[r] || (We(i).records[r] = {});
    n.handler = e;
  }
}
function QA(r, t) {
  if (We(r).initialized)
    return;
  We(r).initialized = !0, e("click", Qt(Qd, "click")), e("mousemove", Qt(Qd, "mousemove")), e("globalout", JA);
  function e(i, n) {
    r.on(i, function(a) {
      var o = tM(t);
      KA(We(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), jA(o.pendings, t);
    });
  }
}
function jA(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function JA(r, t, e) {
  r.handler("leave", null, e);
}
function Qd(r, t, e, i) {
  t.handler(r, e, i);
}
function tM(r) {
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
function Zu(r, t) {
  if (!W.node) {
    var e = t.getZr(), i = (We(e).records || {})[r];
    i && (We(e).records[r] = null);
  }
}
var eM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      ky("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      Zu("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      Zu("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(qe)
);
function By(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = li(a, r);
  if (o == null || o < 0 || F(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), f = l.getOtherAxis(u), h = f.dim, v = u.dim, c = h === "x" || h === "radius" ? 1 : 0, d = a.mapDimension(v), m = [];
      m[c] = a.get(d, o), m[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(m) || [];
    } else
      e = l.dataToPoint(a.getValues(G(l.dimensions, function(g) {
        return a.mapDimension(g);
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
var jd = wt();
function rM(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || pt(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    wo(n) && (n = By({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = wo(n), u = a.axesInfo, f = s.axesInfo, h = i === "leave" || wo(n), v = {}, c = {}, d = {
      list: [],
      map: {}
    }, m = {
      showPointer: Qt(nM, c),
      showTooltip: Qt(aM, d)
    };
    D(s.coordSysMap, function(g, y) {
      var _ = l || g.containPoint(n);
      D(s.coordSysAxesInfo[y], function(w, b) {
        var S = w.axis, x = uM(u, w);
        if (!h && _ && (!u || x)) {
          var C = x && x.value;
          C == null && !l && (C = S.pointToData(n)), C != null && Jd(w, C, m, !1, v);
        }
      });
    });
    var p = {};
    return D(f, function(g, y) {
      var _ = g.linkGroup;
      _ && !c[y] && D(_.axesInfo, function(w, b) {
        var S = c[b];
        if (w !== g && S) {
          var x = S.value;
          _.mapper && (x = g.axis.scale.parse(_.mapper(x, tp(w), tp(g)))), p[g.key] = x;
        }
      });
    }), D(p, function(g, y) {
      Jd(f[y], g, m, !0, v);
    }), oM(c, f, v), sM(d, n, r, o), lM(f, o, e), v;
  }
}
function Jd(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = iM(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && N(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function iM(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return D(t.seriesModels, function(l, u) {
    var f = l.getData().mapDimensionsAll(i), h, v;
    if (l.getAxisTooltipData) {
      var c = l.getAxisTooltipData(f, r, e);
      v = c.dataIndices, h = c.nestestValue;
    } else {
      if (v = l.getData().indicesOfNearest(
        f[0],
        r,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        e.type === "category" ? 0.5 : null
      ), !v.length)
        return;
      h = l.getData().get(f[0], v[0]);
    }
    if (!(h == null || !isFinite(h))) {
      var d = r - h, m = Math.abs(d);
      m <= o && ((m < o || d >= 0 && s < 0) && (o = m, s = d, n = h, a.length = 0), D(v, function(p) {
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
function nM(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function aM(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = pa(l), f = r.map[u];
    f || (f = r.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, r.list.push(f)), f.dataByAxis.push({
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
function oM(r, t, e) {
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
function sM(r, t, e, i) {
  if (wo(t) || !r.list.length) {
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
function lM(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = jd(i)[n] || {}, o = jd(i)[n] = {};
  D(r, function(u, f) {
    var h = u.axisPointerModel.option;
    h.status === "show" && u.triggerEmphasis && D(h.seriesDataIndices, function(v) {
      var c = v.seriesIndex + " | " + v.dataIndex;
      o[c] = v;
    });
  });
  var s = [], l = [];
  D(a, function(u, f) {
    !o[f] && l.push(u);
  }), D(o, function(u, f) {
    !a[f] && s.push(u);
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
function uM(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function tp(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function wo(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function Fy(r) {
  Py.registerAxisPointerClass("CartesianAxisPointer", XA), r.registerComponentModel(qA), r.registerComponentView(eM), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !F(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = CA(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, rM);
}
function fM(r) {
  va(VA), va(Fy);
}
var hM = (
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
  }(rt)
);
function Vy(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function zy(r) {
  if (W.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var Hy = zy(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), cM = zy(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function $y(r, t) {
  if (!r)
    return t;
  t = tm(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function vM(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var dM = $y(cM, "transition"), hh = $y(Hy, "transform"), pM = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (W.transform3dSupported ? "will-change:transform;" : "");
function gM(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function mM(r, t, e) {
  if (!z(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = ui(t);
  var a = gM(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = hh + ":", u;
  ut(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var f = u * Math.PI / 180, h = o + n, v = h * Math.abs(Math.cos(f)) + h * Math.abs(Math.sin(f)), c = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + c + "px";
  var d = t + " solid " + n + "px;", m = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + m.join("") + '"></div>';
}
function yM(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += W.transformSupported ? "," + hh + i : ",left" + i + ",top" + i), dM + ":" + n;
}
function ep(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!W.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = W.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + hh + ":" + o + ";" : [["top", 0], ["left", 0], [Hy, o]];
}
function _M(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = q(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), D(["decoration", "align"], function(u) {
    var f = r.get(u);
    f && t.push("text-" + u + ":" + f);
  }), t.join(";");
}
function wM(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), f = r.getModel("textStyle"), h = fm(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(yM(n, e)), a && i.push("background-color:" + a), D(["width", "color", "radius"], function(c) {
    var d = "border-" + c, m = tm(d), p = r.get(m);
    p != null && i.push(d + ":" + p + (c === "color" ? "" : "px"));
  }), i.push(_M(f)), h != null && i.push("padding:" + $f(h).join("px ") + "px"), i.join(";") + ";";
}
function rp(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && nb(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var SM = (
  /** @class */
  function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, W.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (z(a) ? document.querySelector(a) : Yi(a) ? a : U(a) && a(t.getDom()));
      rp(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, f = n.painter.getViewportRoot();
          ie(f, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = vM(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = pM + wM(t, !this._firstShow, this._longHide) + ep(a[0], a[1], !0) + ("border-color:" + ui(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (z(a) && i.get("trigger") === "item" && !Vy(i) && (s = mM(i, n, a)), z(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", F(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Yi(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if (rp(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = ep(i[0], i[1]);
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
      e.visibility = "hidden", e.opacity = "0", W.transform3dSupported && (e.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(pt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  }()
), bM = (
  /** @class */
  function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), np(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      H(t) && Ht(process.env.NODE_ENV !== "production" ? "Passing DOM nodes as content is not supported in richText tooltip!" : ""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new we({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: fm(i, "richText"),
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
      var t = this.el, e = this.el.getBoundingRect(), i = ip(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        np(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = hr(a.borderWidth || 0), s = ip(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(pt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  }()
);
function hr(r) {
  return Math.max(0, r);
}
function ip(r) {
  var t = hr(r.shadowBlur || 0), e = hr(r.shadowOffsetX || 0), i = hr(r.shadowOffsetY || 0);
  return {
    left: hr(t - e),
    right: hr(t + e),
    top: hr(t - i),
    bottom: hr(t + i)
  };
}
function np(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var xM = new Pt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), TM = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(W.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = H1(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new bM(i) : new SM(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(W.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? Am(this, "_updatePosition", 50, "fixRate") : Lu(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      ky("itemTooltip", this._api, pt(function(n, a, o) {
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
      if (!(a.from === this.uid || W.node || !n.getDom())) {
        var o = ap(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = MM(a, i, n);
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
          var f = xM;
          f.x = a.x, f.y = a.y, f.update(), ot(f).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: f
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
          var h = By(a, i), v = h.point[0], c = h.point[1];
          v != null && c != null && this._tryShow({
            offsetX: v,
            offsetY: c,
            target: h.el,
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(ap(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var f = u.getData(), h = An([f.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (h.get("trigger") === "axis")
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
          var s = ot(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          Nn(n, function(f) {
            if (ot(f).dataIndex != null)
              return l = f, !0;
            if (ot(f).tooltipConfig != null)
              return u = f, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = pt(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = An([i.tooltipOption], a), l = this._renderMode, u = [], f = la("section", {
        blocks: [],
        noHeader: !0
      }), h = [], v = new pl();
      D(e, function(y) {
        D(y.dataByAxis, function(_) {
          var w = n.getComponent(_.axisDim + "Axis", _.axisIndex), b = _.value;
          if (!(!w || b == null)) {
            var S = Ry(b, w.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = la("section", {
              header: S,
              noHeader: !Me(S),
              sortBlocks: !0,
              blocks: []
            });
            f.blocks.push(x), D(_.seriesDataIndices, function(C) {
              var A = n.getSeriesByIndex(C.seriesIndex), M = C.dataIndexInside, T = A.getDataParams(M);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = lh(w.axis, {
                  value: b
                }), T.axisValueLabel = S, T.marker = v.makeTooltipMarker("item", ui(T.color), l);
                var E = av(A.formatTooltip(M, !0, null)), P = E.frag;
                if (P) {
                  var L = An([A], a).get("valueFormatter");
                  x.blocks.push(L ? N({
                    valueFormatter: L
                  }, P) : P);
                }
                E.text && h.push(E.text), u.push(T);
              }
            });
          }
        });
      }), f.blocks.reverse(), h.reverse();
      var c = i.position, d = s.get("order"), m = lv(f, v, l, d, n.get("useUTC"), s.get("textStyle"));
      m && h.unshift(m);
      var p = l === "richText" ? `

` : "<br/>", g = h.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, g, u, Math.random() + "", o[0], o[1], c, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = ot(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, f = o.dataIndex, h = o.dataType, v = u.getData(h), c = this._renderMode, d = e.positionDefault, m = An([v.getItemModel(f), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = m.get("trigger");
      if (!(p != null && p !== "item")) {
        var g = u.getDataParams(f, h), y = new pl();
        g.marker = y.makeTooltipMarker("item", ui(g.color), c);
        var _ = av(u.formatTooltip(f, !1, h)), w = m.get("order"), b = m.get("valueFormatter"), S = _.frag, x = S ? lv(b ? N({
          valueFormatter: b
        }, S) : S, y, c, w, a.get("useUTC"), m.get("textStyle")) : _.text, C = "item_" + u.name + "_" + f;
        this._showOrMove(m, function() {
          this._showTooltipContent(m, x, g, C, e.offsetX, e.offsetY, e.position, e.target, y);
        }), n({
          type: "showTip",
          dataIndexInside: f,
          dataIndex: v.getRawIndex(f),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(e, i, n) {
      var a = this._renderMode === "html", o = ot(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (z(l)) {
        var f = l;
        l = {
          content: f,
          // Fixed formatter
          formatter: f
        }, u = !0;
      }
      u && a && l.content && (l = J(l), l.content = $t(l.content));
      var h = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && h.push(v), h.push({
        formatter: l.content
      });
      var c = e.positionDefault, d = An(h, this._tooltipModel, c ? {
        position: c
      } : null), m = d.get("content"), p = Math.random() + "", g = new pl();
      this._showOrMove(d, function() {
        var y = J(d.get("formatterParams") || {});
        this._showTooltipContent(d, m, y, p, e.offsetX, e.offsetY, e.position, i, g);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(e, i, n, a, o, s, l, u, f) {
      if (this._ticket = "", !(!e.get("showContent") || !e.get("show"))) {
        var h = this._tooltipContent;
        h.setEnterable(e.get("enterable"));
        var v = e.get("formatter");
        l = l || e.get("position");
        var c = i, d = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), m = d.color;
        if (v)
          if (z(v)) {
            var p = e.ecModel.get("useUTC"), g = F(n) ? n[0] : n, y = g && g.axisType && g.axisType.indexOf("time") >= 0;
            c = v, y && (c = Ss(g.axisValue, c, p)), c = em(c, n, !0);
          } else if (U(v)) {
            var _ = pt(function(w, b) {
              w === this._ticket && (h.setContent(b, f, e, m, l), this._updatePosition(e, l, o, s, h, n, u));
            }, this);
            this._ticket = a, c = v(n, a, _);
          } else
            c = v;
        h.setContent(c, f, e, m, l), h.show(e, m), this._updatePosition(e, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(e, i, n, a) {
      if (n === "axis" || F(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!F(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(e, i, n, a, o, s, l) {
      var u = this._api.getWidth(), f = this._api.getHeight();
      i = i || e.get("position");
      var h = o.getSize(), v = e.get("align"), c = e.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), U(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, f],
        contentSize: h.slice()
      })), F(i))
        n = Rt(i[0], u), a = Rt(i[1], f);
      else if (H(i)) {
        var m = i;
        m.width = h[0], m.height = h[1];
        var p = im(m, {
          width: u,
          height: f
        });
        n = p.x, a = p.y, v = null, c = null;
      } else if (z(i) && l) {
        var g = AM(i, d, h, e.get("borderWidth"));
        n = g[0], a = g[1];
      } else {
        var g = CM(n, a, o, u, f, v ? null : 20, c ? null : 20);
        n = g[0], a = g[1];
      }
      if (v && (n -= op(v) ? h[0] / 2 : v === "right" ? h[0] : 0), c && (a -= op(c) ? h[1] / 2 : c === "bottom" ? h[1] : 0), Vy(e)) {
        var g = DM(n, a, o, u, f);
        n = g[0], a = g[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && D(n, function(s, l) {
        var u = s.dataByAxis || [], f = e[l] || {}, h = f.dataByAxis || [];
        o = o && u.length === h.length, o && D(u, function(v, c) {
          var d = h[c] || {}, m = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && m.length === p.length, o && D(m, function(g, y) {
            var _ = p[y];
            o = o && g.seriesIndex === _.seriesIndex && g.dataIndex === _.dataIndex;
          }), a && D(v.seriesDataIndices, function(g) {
            var y = g.seriesIndex, _ = i[y], w = a[y];
            _ && w && w.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(e, i) {
      W.node || !i.getDom() || (Lu(this, "_updatePosition"), this._tooltipContent.dispose(), Zu("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(qe)
);
function An(r, t, e) {
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
function ap(r, t) {
  return r.dispatchAction || pt(t.dispatchAction, t);
}
function CM(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function DM(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function AM(r, t, e, i) {
  var n = e[0], a = e[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, f = t.height;
  switch (r) {
    case "inside":
      s = t.x + u / 2 - n / 2, l = t.y + f / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - n / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - n / 2, l = t.y + f + o;
      break;
    case "left":
      s = t.x - n - o, l = t.y + f / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + f / 2 - a / 2;
  }
  return [s, l];
}
function op(r) {
  return r === "center" || r === "middle";
}
function MM(r, t, e) {
  var i = yf(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = Sa(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var f = ot(u).tooltipConfig;
        if (f && f.name === r.name)
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
function EM(r) {
  va(Fy), r.registerComponentModel(hM), r.registerComponentView(TM), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Wt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Wt);
}
function sp(r, t, e) {
  var i = ji.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var Zl = function(r) {
  B(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Po, typeof e == "string" ? o = sp(e, i, n) : H(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (Sp(o), o.onselectstart = function() {
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
    this.domBack = sp("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new et(0, 0, 0, 0);
    function f(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var _ = new et(0, 0, 0, 0);
          _.copy(y), o.push(_);
        } else {
          for (var w = !1, b = 1 / 0, S = 0, x = 0; x < o.length; ++x) {
            var C = o[x];
            if (C.intersect(y)) {
              var A = new et(0, 0, 0, 0);
              A.copy(C), A.union(y), o[x] = A, w = !0;
              break;
            } else if (l) {
              u.copy(y), u.union(C);
              var M = y.width * y.height, T = C.width * C.height, E = u.width * u.height, P = E - M - T;
              P < b && (b = P, S = x);
            }
          }
          if (l && (o[S].union(y), w = !0), !w) {
            var _ = new et(0, 0, 0, 0);
            _.copy(y), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = this.__startIndex; h < this.__endIndex; ++h) {
      var v = e[h];
      if (v) {
        var c = v.shouldBePainted(n, a, !0, !0), d = v.__isRendered && (v.__dirty & Kt || !c) ? v.getPrevPaintRect() : null;
        d && f(d);
        var m = c && (v.__dirty & Kt || !v.__isRendered) ? v.getPaintRect() : null;
        m && f(m);
      }
    }
    for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
      var v = i[h], c = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!c || !v.__zr) && v.__isRendered) {
        var d = v.getPrevPaintRect();
        d && f(d);
      }
    }
    var p;
    do {
      p = !1;
      for (var h = 0; h < o.length; ) {
        if (o[h].isZero()) {
          o.splice(h, 1);
          continue;
        }
        for (var g = h + 1; g < o.length; )
          o[h].intersect(o[g]) ? (p = !0, o[h].union(o[g]), o.splice(g, 1)) : g++;
        h++;
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
    var u = this.motionBlur && !e, f = this.lastFrameAlpha, h = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
    var c = this.domBack;
    function d(m, p, g, y) {
      if (o.clearRect(m, p, g, y), i && i !== "transparent") {
        var _ = void 0;
        if (es(i)) {
          var w = i.global || i.__width === g && i.__height === y;
          _ = w && i.__canvasGradient || ku(o, i, {
            x: 0,
            y: 0,
            width: g,
            height: y
          }), i.__canvasGradient = _, i.__width = g, i.__height = y;
        } else O_(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, _ = Bu(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(m, p, g, y), o.restore();
      }
      u && (o.save(), o.globalAlpha = f, o.drawImage(c, m, p, g, y), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && D(n, function(m) {
      d(m.x * h, m.y * h, m.width * h, m.height * h);
    });
  }, t;
}(ke), lp = 1e5, Xr = 314159, oo = 0.01, PM = 1e-3;
function LM(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function IM(r, t) {
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
var OM = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = N({}, i || {}), this.dpr = i.devicePixelRatio || Po, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Sp(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var f = t, h = f.width, v = f.height;
      i.width != null && (h = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, f.width = h * this.dpr, f.height = v * this.dpr, this._width = h, this._height = v;
      var c = new Zl(f, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), l[Xr] = c, c.zlevel = Xr, s.push(Xr), this._domRoot = t;
    } else {
      this._width = Ja(t, 0, i), this._height = Ja(t, 1, i);
      var u = this._domRoot = IM(this._width, this._height);
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
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(lp)), a || (a = i.ctx, a.save()), jr(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(lp);
  }, r.prototype.paintOne = function(t, e) {
    Qm(t, e);
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
        Wo(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(Xr).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var f = !0, h = !1, v = function(m) {
      var p = a[m], g = p.ctx, y = o && p.createRepaintRects(t, e, c._width, c._height), _ = i ? p.__startIndex : p.__drawIndex, w = !i && p.incremental && Date.now, b = w && Date.now(), S = p.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, S, y);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && p.clear(!1, S, y);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var C, A = function(P) {
        var L = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (C = _; C < p.__endIndex; C++) {
          var I = t[C];
          if (I.__inHover && (h = !0), n._doPaintEl(I, p, o, P, L, C === p.__endIndex - 1), w) {
            var O = Date.now() - b;
            if (O > 15)
              break;
          }
        }
        L.prevElClipPaths && g.restore();
      };
      if (y)
        if (y.length === 0)
          C = p.__endIndex;
        else
          for (var M = c.dpr, T = 0; T < y.length; ++T) {
            var E = y[T];
            g.save(), g.beginPath(), g.rect(E.x * M, E.y * M, E.width * M, E.height * M), g.clip(), A(E), g.restore();
          }
      else
        g.save(), A(), g.restore();
      p.__drawIndex = C, p.__drawIndex < p.__endIndex && (f = !1);
    }, c = this, d = 0; d < a.length; d++)
      v(d);
    return W.wxa && D(this._layers, function(m) {
      m && m.ctx && m.ctx.draw && m.ctx.draw();
    }), {
      finished: f,
      needsRefreshHover: h
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (jr(s, t, a, o), t.setPrevPaintRect(l));
    } else
      jr(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Xr);
    var i = this._layers[t];
    return i || (i = new Zl("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? it(i, this._layerConfig[t], !0) : this._layerConfig[t - oo] && it(i, this._layerConfig[t - oo], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (i[t]) {
      process.env.NODE_ENV !== "production" && ti("ZLevel " + t + " has been used already");
      return;
    }
    if (!LM(e)) {
      process.env.NODE_ENV !== "production" && ti("Layer of zlevel " + t + " is not valid");
      return;
    }
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
    this.eachBuiltinLayer(function(h, v) {
      h.__dirty = h.__used = !1;
    });
    function e(h) {
      a && (a.__endIndex !== h && (a.__dirty = !0), a.__endIndex = h);
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
      var n = t[l], u = n.zlevel, f = void 0;
      s !== u && (s = u, o = 0), n.incremental ? (f = this.getLayer(u + PM, this._needsManuallyCompositing), f.incremental = !0, o = 1) : f = this.getLayer(u + (o > 0 ? oo : 0), this._needsManuallyCompositing), f.__builtin__ || ti("ZLevel " + u + " has been used by unkown layer " + f.id), f !== a && (f.__used = !0, f.__startIndex !== l && (f.__dirty = !0), f.__startIndex = l, f.incremental ? f.__drawIndex = -1 : f.__drawIndex = l, e(l), a = f), n.__dirty & Kt && !n.__inHover && (f.__dirty = !0, f.incremental && f.__drawIndex < 0 && (f.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(h, v) {
      !h.__used && h.getElementCount() > 0 && (h.__dirty = !0, h.__startIndex = h.__endIndex = h.__drawIndex = 0), h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex);
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
        if (a === t || a === t + oo) {
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
      if (t != null && (n.width = t), e != null && (n.height = e), t = Ja(a, 0, n), e = Ja(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(Xr).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Xr].dom;
    var e = new Zl("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(h) {
        h.__builtin__ ? i.drawImage(h.dom, 0, 0, n, a) : h.renderToCanvas && (i.save(), h.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var f = s[l];
        jr(i, f, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function RM(r) {
  r.registerPainter("canvas", OM);
}
var NM = Object.defineProperty, kM = Object.getOwnPropertyDescriptor, ch = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? kM(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && NM(t, e, n), n;
};
va([fT, Hx, fM, EM, RM]);
let ga = class extends Jr {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".canvas");
    this.chart = gD(r, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(r), this.applyOption();
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
    return vt`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
ga.styles = Qu`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
ch([
  Ke({ attribute: !1 })
], ga.prototype, "option", 2);
ch([
  Ke({ type: String })
], ga.prototype, "height", 2);
ga = ch([
  rf("ia-chart")
], ga);
const Gy = "—";
function Ai(r, t) {
  return r === null || Number.isNaN(r) ? Gy : Math.abs(r) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    r / 1e3
  )} kW` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(r)} W`;
}
function ql(r, t) {
  return r === null || Number.isNaN(r) ? Gy : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r * 100)}%`;
}
function BM(r) {
  if (r < 60) return `${Math.round(r)} с`;
  const t = Math.round(r / 60);
  return t < 60 ? `${t} хв` : `${Math.floor(t / 60)} год ${t % 60} хв`;
}
var FM = Object.defineProperty, VM = Object.getOwnPropertyDescriptor, br = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? VM(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && FM(t, e, n), n;
};
const zM = {
  raw: "Точні дані",
  mixed: "Змішано",
  lts: "Погодинні середні"
};
let Re = class extends Jr {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.requestId = 0;
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = m_(this.range, /* @__PURE__ */ new Date()), i = await p_(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = String(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = (n) => n === null ? "" : ql(n / r.rated_power, t) + " ном.", i = [
      ["Середнє", Ai(r.kpi.mean, t), e(r.kpi.mean)],
      ["Медіана", Ai(r.kpi.median, t), ""],
      ["P95", Ai(r.kpi.p95, t), ""],
      ["Пік", Ai(r.kpi.max, t), e(r.kpi.max)],
      ["Стійке 15 хв", Ai(r.kpi.max_sustained_15m, t), ""],
      [">80% номіналу", ql(r.kpi.fraction_above_80pct, t), "часу"]
    ];
    return vt`<div class="kpi">
      ${i.map(
      ([n, a, o]) => vt`<div class="cell">
          <span class="label">${n}</span>
          <span class="value">${a}</span>
          <span class="hint">${o}</span>
        </div>`
    )}
    </div>`;
  }
  renderOverloads(r) {
    if (!r.overloads.length)
      return vt`<p class="empty">Перевантажень за цей період не було.</p>`;
    const t = this.hass.locale.language;
    return vt`<table>
      <thead>
        <tr><th>Початок</th><th>Тривалість</th><th>Пік</th></tr>
      </thead>
      <tbody>
        ${r.overloads.map(
      (e) => vt`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${BM(e.seconds)}</td>
            <td>${Ai(e.peak, t)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    if (this.error)
      return vt`<div class="notice">
        Не вдалося завантажити дані: ${this.error}
        <button @click=${() => this.load()}>Спробувати ще</button>
      </div>`;
    if (!this.payload)
      return vt`<div class="notice">Розрахунок…</div>`;
    const r = this.payload, t = this.hass.locale.language;
    return vt`
      <div class="status">
        <span class="badge">${zM[r.precision]}</span>
        ${r.coverage < 0.95 ? vt`<span class="warn">
              Дані відсутні ${ql(1 - r.coverage, t)} часу
            </span>` : dt}
        ${r.clamped ? vt`<span class="warn">Період скорочено до максимально дозволеного</span>` : dt}
        ${r.histogram.clipped_low_seconds + r.histogram.clipped_high_seconds > 0 ? vt`<span class="warn">
              Частина значень вийшла за діапазон гістограми й показана в крайніх корзинах
            </span>` : dt}
        ${this.loading ? vt`<span class="warn">Оновлення…</span>` : dt}
      </div>

      ${this.renderKpi(r)}

      <section>
        <header>
          <h2>Скільки часу на якій потужності</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? "у % від номіналу" : "у ватах"}</button>
        </header>
        <ia-chart .option=${y_(r, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Крива тривалості навантаження</h2>
        <ia-chart .option=${__(r)}></ia-chart>
      </section>

      <section>
        <h2>Розподіл по діапазонах номіналу</h2>
        <ia-chart .option=${w_(r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Епізоди перевантаження</h2>
        ${this.renderOverloads(r)}
      </section>
    `;
  }
};
Re.styles = Qu`
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
br([
  Ke({ attribute: !1 })
], Re.prototype, "hass", 2);
br([
  Ke({ type: String })
], Re.prototype, "entryId", 2);
br([
  Ke({ type: String })
], Re.prototype, "range", 2);
br([
  Qe()
], Re.prototype, "payload", 2);
br([
  Qe()
], Re.prototype, "error", 2);
br([
  Qe()
], Re.prototype, "loading", 2);
br([
  Qe()
], Re.prototype, "mode", 2);
Re = br([
  rf("ia-load-tab")
], Re);
var HM = Object.defineProperty, $M = Object.getOwnPropertyDescriptor, tr = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? $M(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && HM(t, e, n), n;
};
const up = [
  { id: "load", label: "Навантаження" },
  { id: "battery", label: "Акумулятор" },
  { id: "seasonal", label: "Сезонність" },
  { id: "balance", label: "Баланс" }
];
let Se = class extends Jr {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.readLocation = () => {
      const t = window.location.pathname.split("/").filter(Boolean)[1];
      t && up.some((i) => i.id === t) && (this.tab = t);
      const e = new URLSearchParams(window.location.search).get("range");
      e && Dh.includes(e) && (this.range = e);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  writeLocation() {
    const r = `/inverter-analytics/${this.tab}?range=${this.range}`;
    window.history.replaceState(null, "", r);
  }
  async loadConfig() {
    try {
      this.config = await d_(this.hass), this.entryId ??= this.config.entries[0]?.entry_id;
    } catch (r) {
      this.error = String(r);
    }
  }
  selectTab(r) {
    this.tab = r, this.writeLocation();
  }
  selectRange(r) {
    this.range = r, this.writeLocation();
  }
  render() {
    return this.error ? vt`<div class="notice">Не вдалося завантажити конфігурацію: ${this.error}</div>` : this.config ? this.config.entries.length ? vt`
      <div class="header">
        <h1>Аналітика інвертора</h1>
        ${this.config.entries.length > 1 ? vt`<select @change=${(r) => {
      this.entryId = r.target.value;
    }}>
              ${this.config.entries.map(
      (r) => vt`<option value=${r.entry_id}>${r.title}</option>`
    )}
            </select>` : dt}
        <div class="ranges">
          ${Dh.map(
      (r) => vt`<button
              class=${r === this.range ? "active" : ""}
              @click=${() => this.selectRange(r)}
            >${g_[r]}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${up.map(
      (r) => vt`<button
            class=${r.id === this.tab ? "active" : ""}
            @click=${() => this.selectTab(r.id)}
          >${r.label}</button>`
    )}
      </nav>

      <main>
        ${this.tab === "load" ? vt`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : vt`<div class="notice">Ця вкладка з'явиться в наступних версіях.</div>`}
      </main>
    ` : vt`<div class="notice">
        Жодного інвертора не налаштовано. Додайте інтеграцію Inverter Analytics у налаштуваннях.
      </div>` : vt`<div class="notice">Завантаження…</div>`;
  }
};
Se.styles = Qu`
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
tr([
  Ke({ attribute: !1 })
], Se.prototype, "hass", 2);
tr([
  Ke({ type: Boolean })
], Se.prototype, "narrow", 2);
tr([
  Ke({ attribute: !1 })
], Se.prototype, "route", 2);
tr([
  Qe()
], Se.prototype, "config", 2);
tr([
  Qe()
], Se.prototype, "error", 2);
tr([
  Qe()
], Se.prototype, "entryId", 2);
tr([
  Qe()
], Se.prototype, "tab", 2);
tr([
  Qe()
], Se.prototype, "range", 2);
Se = tr([
  rf("inverter-analytics-panel")
], Se);
export {
  Se as InverterAnalyticsPanel
};

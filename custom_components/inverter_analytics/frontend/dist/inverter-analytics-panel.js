/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = globalThis, mc = rs.ShadowRoot && (rs.ShadyCSS === void 0 || rs.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _c = Symbol(), Of = /* @__PURE__ */ new WeakMap();
let qg = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== _c) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (mc && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Of.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Of.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const H_ = (r) => new qg(typeof r == "string" ? r : r + "", void 0, _c), we = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new qg(e, r, _c);
}, V_ = (r, t) => {
  if (mc) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = rs.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, Ef = mc ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return H_(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: G_, defineProperty: W_, getOwnPropertyDescriptor: U_, getOwnPropertyNames: Y_, getOwnPropertySymbols: X_, getPrototypeOf: q_ } = Object, Qs = globalThis, kf = Qs.trustedTypes, Z_ = kf ? kf.emptyScript : "", K_ = Qs.reactiveElementPolyfillSupport, ba = (r, t) => r, bs = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Z_ : null;
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
} }, bc = (r, t) => !G_(r, t), Nf = { attribute: !0, type: String, converter: bs, reflect: !1, useDefault: !1, hasChanged: bc };
Symbol.metadata ??= Symbol("metadata"), Qs.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let sn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Nf) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && W_(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = U_(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Nf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ba("elementProperties"))) return;
    const t = q_(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ba("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ba("properties"))) {
      const e = this.properties, i = [...Y_(e), ...X_(e)];
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
      for (const n of i) e.unshift(Ef(n));
    } else t !== void 0 && e.push(Ef(t));
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
    return V_(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : bs).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : bs;
      this._$Em = n;
      const s = o.fromAttribute(e, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? bc)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
sn.elementStyles = [], sn.shadowRootOptions = { mode: "open" }, sn[ba("elementProperties")] = /* @__PURE__ */ new Map(), sn[ba("finalized")] = /* @__PURE__ */ new Map(), K_?.({ ReactiveElement: sn }), (Qs.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wc = globalThis, Bf = (r) => r, ws = wc.trustedTypes, zf = ws ? ws.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Zg = "$lit$", Nr = `lit$${Math.random().toFixed(9).slice(2)}$`, Kg = "?" + Nr, Q_ = `<${Kg}>`, Ii = document, Ra = () => Ii.createComment(""), Oa = (r) => r === null || typeof r != "object" && typeof r != "function", Sc = Array.isArray, j_ = (r) => Sc(r) || typeof r?.[Symbol.iterator] == "function", Nl = `[ 	
\f\r]`, Wn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ff = /-->/g, Hf = />/g, Zr = RegExp(`>|${Nl}(?:([^\\s"'>=/]+)(${Nl}*=${Nl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vf = /'/g, Gf = /"/g, Qg = /^(?:script|style|textarea|title)$/i, J_ = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), L = J_(1), Tn = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Wf = /* @__PURE__ */ new WeakMap(), wi = Ii.createTreeWalker(Ii, 129);
function jg(r, t) {
  if (!Sc(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zf !== void 0 ? zf.createHTML(t) : t;
}
const tb = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Wn;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, h, c = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, h = o.exec(l), h !== null); ) v = o.lastIndex, o === Wn ? h[1] === "!--" ? o = Ff : h[1] !== void 0 ? o = Hf : h[2] !== void 0 ? (Qg.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Zr) : h[3] !== void 0 && (o = Zr) : o === Zr ? h[0] === ">" ? (o = n ?? Wn, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Zr : h[3] === '"' ? Gf : Vf) : o === Gf || o === Vf ? o = Zr : o === Ff || o === Hf ? o = Wn : (o = Zr, n = void 0);
    const f = o === Zr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === Wn ? l + Q_ : c >= 0 ? (i.push(u), l.slice(0, c) + Zg + l.slice(c) + Nr + f) : l + Nr + (c === -2 ? s : f);
  }
  return [jg(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ea {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = tb(t, e);
    if (this.el = Ea.createElement(u, i), wi.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = wi.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Zg)) {
          const v = h[o++], f = n.getAttribute(c).split(Nr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: f, ctor: d[1] === "." ? rb : d[1] === "?" ? ib : d[1] === "@" ? nb : js }), n.removeAttribute(c);
        } else c.startsWith(Nr) && (l.push({ type: 6, index: a }), n.removeAttribute(c));
        if (Qg.test(n.tagName)) {
          const c = n.textContent.split(Nr), v = c.length - 1;
          if (v > 0) {
            n.textContent = ws ? ws.emptyScript : "";
            for (let f = 0; f < v; f++) n.append(c[f], Ra()), wi.nextNode(), l.push({ type: 2, index: ++a });
            n.append(c[v], Ra());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Kg) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(Nr, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += Nr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = Ii.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Cn(r, t, e = r, i) {
  if (t === Tn) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = Oa(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = Cn(r, n._$AS(r, t.values), n, i)), t;
}
class eb {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? Ii).importNode(e, !0);
    wi.currentNode = n;
    let a = wi.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new eo(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new ab(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = wi.nextNode(), o++);
    }
    return wi.currentNode = Ii, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class eo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Cn(this, t, e), Oa(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== Tn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : j_(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && Oa(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ii.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ea.createElement(jg(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const a = new eb(n, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Wf.get(t.strings);
    return e === void 0 && Wf.set(t.strings, e = new Ea(t)), e;
  }
  k(t) {
    Sc(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new eo(this.O(Ra()), this.O(Ra()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Bf(t).nextSibling;
      Bf(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class js {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = k;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Cn(this, t, e, 0), o = !Oa(t) || t !== this._$AH && t !== Tn, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Cn(this, s[i + l], e, l), u === Tn && (u = this._$AH[l]), o ||= !Oa(u) || u !== this._$AH[l], u === k ? t = k : t !== k && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class rb extends js {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class ib extends js {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class nb extends js {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Cn(this, t, e, 0) ?? k) === Tn) return;
    const i = this._$AH, n = t === k && i !== k || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== k && (i === k || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ab {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Cn(this, t);
  }
}
const ob = wc.litHtmlPolyfillSupport;
ob?.(Ea, eo), (wc.litHtmlVersions ??= []).push("3.3.3");
const sb = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = n = new eo(t.insertBefore(Ra(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xc = globalThis;
class Gt extends sn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = sb(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Tn;
  }
}
Gt._$litElement$ = !0, Gt.finalized = !0, xc.litElementHydrateSupport?.({ LitElement: Gt });
const lb = xc.litElementPolyfillSupport;
lb?.({ LitElement: Gt });
(xc.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ub = { attribute: !0, type: String, converter: bs, reflect: !1, hasChanged: bc }, hb = (r = ub, t, e) => {
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
function it(r) {
  return (t, e) => typeof e == "object" ? hb(r, t, e) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(r) {
  return it({ ...r, state: !0, attribute: !1 });
}
function cb(r) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function fb(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function vb(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function db(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/seasonality",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function pb(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/balance",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function gb(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/grid",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function yb(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/sizing",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
function Ft(r, t, e) {
  const i = new Intl.PluralRules(r).select(t);
  return i === "one" ? e.one : i === "few" ? e.few ?? e.other : i === "many" ? e.many ?? e.other : e.other;
}
const mb = {
  common: {
    and: "and",
    // The words every tab shares: its error notice, its status line, the
    // first columns of its episode tables.
    couldNotLoadData: (r) => `Could not load data: ${r.error}`,
    tryAgain: "Try again",
    computing: "Computing…",
    refreshing: "Refreshing…",
    periodShortened: "Period shortened to the maximum allowed",
    start: "Start",
    duration: "Duration",
    peak: "Peak",
    coversOfPeriod: (r) => `Covers ${r.share} of the period`
  },
  units: {
    w: "W",
    kw: "kW",
    kwh: "kWh",
    s: "s",
    min: "min",
    h: "h",
    ofRated: "of rated"
  },
  panel: {
    language: "Language",
    couldNotLoad: (r) => `Could not load configuration: ${r.error}`,
    loading: "Loading…",
    noInverter: "No inverter is configured yet. Add the Inverter Analytics integration in settings.",
    tabs: {
      load: "Load",
      battery: "Battery",
      seasonal: "Seasonality",
      balance: "Balance",
      grid: "Grid",
      sizing: "Sizing"
    },
    // The notice on a tab whose sensors are not mapped. One role or several
    // changes more than a pronoun, so each is a whole paragraph.
    missingOne: (r) => `${r.feature} needs ${r.roles}, and it is not mapped to this inverter. Nothing here is broken and there is no data missing — this page has simply not been told which of your sensors that is.`,
    missingMany: (r) => `${r.feature} needs ${r.roles}, and none of them are mapped to this inverter. Nothing here is broken and there is no data missing — this page has simply not been told which of your sensors those are.`,
    reconfigureBefore: "Open the integration, choose ",
    reconfigure: "Reconfigure",
    reconfigureAfter: ", and it will offer what it can find in your installation.",
    goToSettings: "Go to Inverter Analytics settings"
  },
  ranges: {
    "24h": "24 h",
    "7d": "7 days",
    "30d": "30 days",
    month: "This month",
    year: "Year"
  },
  // The backend sends a label with each feature too; these win so the name
  // follows the panel's language. Keyed as FEATURES in roles.py.
  features: {
    load: "Load analytics",
    battery: "Battery analytics",
    seasonal: "Seasonality",
    balance: "Energy balance",
    grid: "Grid outages",
    sizing: "Sizing"
  },
  // The setup form's field labels; see roles.ts.
  roles: {
    load_power: "Load power",
    load_power_phase: "Load power per phase",
    rated_power: "Rated power",
    rated_power_per_phase: "Rated power per phase",
    pv_power: "PV power",
    pv_power_string: "PV power per string",
    battery_power: "Battery power",
    grid_power: "Grid power",
    grid_power_phase: "Grid power per phase",
    battery_soc: "Battery state of charge",
    battery_capacity: "Battery capacity",
    grid_connected: "Grid connected",
    pv_energy_total: "PV energy total",
    load_energy_total: "Load energy total",
    battery_charge_total: "Battery charge energy total",
    battery_discharge_total: "Battery discharge energy total",
    grid_import_total: "Grid import total",
    grid_export_total: "Grid export total"
  },
  // Backend error codes with a fixed message. invalid_config is not here:
  // its message names the role and value at fault, which a fixed sentence
  // would lose.
  errors: {
    not_found: "Inverter not found or disabled",
    invalid_window: "Window end must be later than its start"
  },
  // format.ts: precisionLabel and coverageWarning.
  format: {
    exactData: "Exact data",
    hourlyAverages: "Hourly averages",
    mixed: "Mixed",
    mixedSince: (r) => `Mixed since ${r.date}`,
    noData: "No data for this period",
    coversUnderOnePercent: "Data covers less than 1% of the period",
    coversOnly: (r) => `Data covers only ${r.share} of the period`
  },
  // verdict.ts: the sizing verdicts and why one is withheld.
  verdict: {
    enough: "Enough",
    borderline: "Borderline",
    short: "Short",
    none: "No verdict",
    // Keyed by sizing card.
    noData: {
      inverter: "There are no statistics for the load in this span.",
      battery: "There are no statistics for the battery's charge in this span.",
      solar: "There are no statistics for the counters in this span, or too little consumption to take a share of."
    },
    neverFull: "The battery never filled in this span, so the nights say nothing about its size.",
    hintNeverFilled: "never filled",
    hintNoData: "no data"
  },
  // charts/options.ts: axis names, legend entries and series names. A legend
  // finds its series by name, so both sides read the same entry here.
  charts: {
    // The locale the charts write month names and numbers in, also used by
    // the month table. It is the panel language's own locale, not Home
    // Assistant's: an English panel has always said "Mar" and "2.5",
    // whatever the profile's locale.
    locale: "en",
    percentOfTime: "% of time",
    percentImbalance: "% imbalance",
    percentCharge: "% charge",
    percentOfMeasuredTime: "% of measured time",
    hour: "hour",
    hours: "hours",
    mean: "Mean",
    peak: "Peak",
    load: "Load",
    pv: "PV",
    // The two rows of the balance bar: what came into the system, what left it.
    in: "In",
    out: "Out",
    // The six energy counters as movements of energy, in the order shown.
    // Not the setup-form names in roles: "From grid" is right on an axis and
    // useless in an instruction to go and map a sensor.
    flows: {
      pv_energy_total: "Solar",
      grid_import_total: "From grid",
      battery_discharge_total: "From battery",
      load_energy_total: "House",
      grid_export_total: "To grid",
      battery_charge_total: "To battery"
    },
    // The by-day outage tooltip.
    hoursWithoutGrid: (r) => `${r.hours} h without grid`,
    outagesBegan: (r) => r.n === 0 ? "no outages began" : Ft("en", r.n, {
      one: `${r.n} outage began`,
      other: `${r.n} outages began`
    })
  },
  load: {
    // A total and its parts that disagree. Two sentences rather than one with
    // the subject slotted in: in Ukrainian the subject's gender changes the words around it.
    loadConsistency: (r) => `Total load averages ${r.total} while the phases add up to ${r.partsTotal}. Is one of them mapped to the wrong sensor?`,
    pvConsistency: (r) => `Total PV power averages ${r.total} while the strings add up to ${r.partsTotal}. Is one of them mapped to the wrong sensor?`,
    histogramClipped: "Some values fell outside the histogram range and are shown in its edge buckets",
    mean: "Mean",
    median: "Median",
    sustained15m: "Sustained 15 min",
    above80OfRated: ">80% of rated",
    ofTime: "of time",
    shareOfRated: (r) => `${r.share} of rated`,
    noOverloads: "No overloads in this period.",
    timeAtPowerLevel: "Time spent at each power level",
    asPercentOfRated: "as % of rated",
    inWatts: "in watts",
    durationCurve: "Load duration curve",
    ratedBands: "Distribution across rated-power bands",
    overloadEpisodes: "Overload episodes"
  },
  battery: {
    meanCharge: "Mean charge",
    overWholePeriod: "over the whole period",
    lowestCharge: "Lowest charge",
    exactDataOnly: "exact data only",
    needsExactData: "needs exact data",
    below: (r) => `Below ${r.level}`,
    dips: "Dips",
    lastingOverMinute: "lasting over a minute",
    meanLowPoint: "Mean low point",
    acrossThoseDips: "across those dips",
    dipsNotMeasurable: 'This period is covered only by hourly averages, which record the mean charge across each hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips cannot be counted at all — an empty table would read as "none happened". Pick a shorter period to see them.',
    noEpisodes: (r) => `The charge never stayed below ${r.level} for more than a minute in this period.`,
    lowest: "Lowest",
    recoveredTo: "Recovered to",
    dipsCountedFrom: (r) => `Dips counted from ${r.date}, where exact data begins`,
    timeAtSoc: "Time spent at each state of charge",
    chargeBands: "Distribution across charge bands",
    lowChargeEpisodes: "Low-charge episodes",
    // The heading itself is sections.charge.title, shared with the section.
    mapPowerSensor: "Map a battery power sensor in the integration's options to see how much moves in and out, and how much of the time the battery is working."
  },
  seasonality: {
    monthsIn: (r) => `Months in ${r.timezone}`,
    meanByMonth: "Mean power by month",
    // A thin month still has a bar; an absent one has none. Counted apart, so
    // one sentence never says nine months are grey when one of them is.
    thinMonths: (r) => Ft("en", r.n, {
      one: `One month is covered by less than ${r.share} of its days and is drawn in grey.`,
      other: `${r.n} months are covered by less than ${r.share} of their days and are drawn in grey.`
    }),
    partialNotLower: "A month the recorder only saw part of is not a lower month; the figures stand, the comparison does not.",
    absentMonths: (r) => Ft("en", r.n, {
      one: "One month has no recorded data at all and carries no bar.",
      other: `${r.n} months have no recorded data at all and carry no bar.`
    }),
    statisticsFromStart: "Home Assistant keeps long-term statistics only from the moment a sensor starts producing them.",
    monthByMonth: "Month by month",
    month: "Month",
    meanLoad: "Mean load",
    busiestHour: "Busiest hour",
    meanPv: "Mean PV",
    ofTheMonth: "Of the month",
    busiestHourNote: `"Busiest hour" is the highest hourly average, not the highest load. Beyond the recorder's retention Home Assistant keeps only an hourly mean, so a brief peak inside an hour has already been averaged away by the time this page sees it.`,
    meanByHour: "Mean power by hour of day",
    byHourNote: "Averaged across the whole period, so it blends the seasons. The heat map below is the same question asked per month.",
    hourByMonth: "Hour of day, month by month",
    heatmapNote: "Where a winter evening peak and a summer midday one stop being two averages and become two shapes. Hours with no recorded data are left blank rather than drawn as zero."
  },
  balance: {
    hourlyStatistics: "Hourly statistics",
    daysIn: (r) => `Days in ${r.timezone}`,
    countedUpTo: (r) => `Counted up to ${r.time}`,
    noEnergyStatistics: "No energy statistics in this period",
    intoSystem: "into the system",
    outOfIt: "out of it",
    inAgainstOut: "In against out",
    needsAllSix: (r) => `The books can only be closed with all six counters mapped. Missing: ${r.missing}. Until then the difference between the two bars would measure what is not mapped rather than what was lost.`,
    // The balance line, split around the <strong> amount the template holds.
    // Unaccounted and more-out are two endings, not a word slot.
    inOut: (r) => `In ${r.in}, out ${r.out} —`,
    unaccountedFor: (r) => `unaccounted for (${r.share}).`,
    moreOutThanIn: (r) => `more out than in (${r.share}).`,
    unaccountedNote: "Conversion and battery round-trip losses live in this figure, and so does every disagreement between the six meters. It is called unaccounted rather than losses because nothing here can tell heat in the inverter from error in a clamp.",
    ratiosTitle: "Self-sufficiency and self-consumption",
    ratiosNeedCounters: "Self-sufficiency needs the house and grid-import counters; self-consumption needs solar and grid export.",
    selfSufficiency: "Self-sufficiency",
    selfConsumption: "Self-consumption",
    dayByDay: "Day by day",
    noDays: "No days with energy statistics in this period.",
    dayByDayNote: "Two bars a day: what came in, and what went out. Adding the two together would count the same energy twice. Energy is read from Home Assistant's hourly statistics, which is where counter resets are already accounted for. The current hour is compiled only once it ends, so a period running up to now stops at the last completed hour."
  },
  grid: {
    outages: "Outages",
    withoutGrid: "Without grid",
    unrecordedAssumedOff: (r) => `+ ${r.duration} unrecorded, assumed off`,
    shareOfTime: "Share of time",
    ofMeasuredTime: "of measured time",
    longest: "Longest",
    fromTime: (r) => `from ${r.time}`,
    meanDuration: "Mean duration",
    briefInterruptions: "Brief interruptions",
    underAMinute: "under a minute",
    // An outage cut by the window's start or still going is longer than seen.
    atLeast: (r) => `at least ${r.duration}`,
    noOutages: (r) => `No outages in this period — none in ${r.duration} of measurement.`,
    chargeAtStart: "Charge at start",
    lowest: "Lowest",
    atEnd: "At end",
    meanLoad: "Mean load",
    unrecorded: (r) => `(${r.duration} unrecorded)`,
    noAutonomy: "No autonomy estimate.",
    // Keyed by AutonomyReason; the one with a figure is a function.
    autonomyReasons: {
      no_soc: "It needs the battery's state of charge, which is not mapped to this inverter.",
      no_outages: "There were no outages in this period to read a discharge rate from.",
      no_soc_in_outages: "The battery's charge was not recorded during any of this period's outages, so there is no discharge to read a rate from.",
      no_net_discharge: "The charge did not fall during this period's outages — the sun covered them — so there is no discharge rate to read."
    },
    tooLittleEvidence: (r) => `The outages with a charge reading at both ends add up to ${r.hours}, and an estimate needs at least an hour.`,
    fromFullTo: (r) => `From full to ${r.level}`,
    fromNow: "From where it is now",
    chargeNow: "Charge now",
    dischargeRate: "Discharge rate",
    pointsPerHour: (r) => `${r.rate} pts/h`,
    evidenceNote: (r) => `At the rate seen during this period's outages — ${r.hours} of them. Whether a summer afternoon's outage says anything about a winter evening's is for the reader to judge; the mean load beside it is there to help.`,
    // Why counting starts late: two whole sentences rather than a clause slot.
    countedFromInferred: (r) => `Outages counted from ${r.date} — earlier history is only hourly averages, which cannot say when inside an hour the grid was gone`,
    countedFromNoHistory: (r) => `Outages counted from ${r.date} — the recorder keeps no earlier history of this sensor`,
    inferredBanner: "Inferred from power flows, not measured. A night the battery carries the house with nothing crossing the grid connection looks exactly like an outage, and a daytime outage the sun covers is not seen at all. Map a sensor that reports grid presence to measure instead.",
    hoursByDay: "Hours without grid, by day",
    noDaysWithData: "No days with data in this period.",
    missingDays: (r) => Ft("en", r.n, {
      one: `${r.n} day in this period had no data and is not drawn.`,
      other: `${r.n} days in this period had no data and are not drawn.`
    }),
    shareByHour: "Share of time without grid, by hour of day",
    hoursNeverRecorded: "Hours the sensor never recorded are left empty rather than drawn at zero.",
    autonomy: "Autonomy"
  },
  sizing: {
    cards: {
      inverter: "Inverter, against the load",
      battery: "Battery, against the nights",
      solar: "Sun, against the consumption"
    },
    // The month-table columns, and the part named before each rule.
    parts: {
      inverter: "Inverter",
      battery: "Battery",
      solar: "Sun"
    },
    // The one figure in a month cell.
    hoursAtRated: (r) => `${r.hours} h at rated`,
    // The total is a number so a language can inflect "days" by it.
    daysOf: (r) => `${r.days} of ${r.total} days`,
    ofLoad: (r) => `${r.share} of load`,
    // The evidence rows of each card.
    countOf: (r) => `${r.count} of ${r.total}`,
    hoursReachedRated: "Hours the load reached rated power",
    hoursAboveOfRated: (r) => `Hours above ${r.share} of rated`,
    highestPeak: "Highest hourly peak",
    daysFilledAndLow: "Days it filled, and still hit the low mark",
    daysLowWithoutFilling: "Days it hit the low mark without filling",
    daysFilled: "Days it filled",
    lowestCharge: "Lowest charge",
    productionShare: "Production as a share of consumption",
    producedConsumed: "Produced / consumed",
    selfSufficiency: "Self-sufficiency",
    daysBatteryFilled: "Days the battery filled",
    // The rule each verdict was read by, in the reader's own numbers. With no
    // charge sensor mapped the solar rule has no fill clause, and is a
    // sentence of its own rather than one with a hole in it.
    inverterRule: (r) => `Short when the load reached rated power in more than ${r.shortShare} of hours; borderline on any such hour, or above ${r.highShare} of rated in more than ${r.borderlineShare} of hours.`,
    batteryRule: (r) => `Counted over days with data: short when the battery filled to ${r.full} and still fell to ${r.low} on at least ${r.share} of them; borderline when it happened at all; no verdict for a span in which it never filled. A day it ran low without filling counts against the sun, not the battery.`,
    solarRuleWithFill: (r) => `Enough when production is at least ${r.enough} of consumption and the battery filled on at least ${r.fill} of days; borderline from ${r.borderline} of consumption; short below.`,
    solarRule: (r) => `Enough when production is at least ${r.enough} of consumption; borderline from ${r.borderline} of consumption; short below.`,
    // What a card is short of before a verdict can be read. Rated power is a
    // number in the options, not an entity, so it is "not set", not "not
    // mapped"; the count lets a language agree with one role or several.
    needsNotSet: (r) => `Needs ${r.roles}, which is not set for this inverter.`,
    needsNotMapped: (r) => `Needs ${r.roles}, not mapped to this inverter.`,
    thresholdsInverted: (r) => `The full mark (${r.full}) is at or below the low mark (${r.low}), so no day can be judged. Raise Full battery charge or lower Low battery charge in the integration's options.`,
    // Split around the <code>state_class</code> the template holds.
    noStatisticsBefore: (r) => `${r.sensors} keeps no long-term statistics — it has no`,
    noStatisticsAfter: (r) => "— so this card cannot be read from it.",
    readFrom: (r) => `Read from ${r.share} of the period.`,
    batteryNotFilling: (r) => `Production covers the load, but the battery filled on only ${r.share} of days — export by day and import by night.`,
    cellCoverage: (r) => `from ${r.share}`,
    noMonths: "No month falls inside this period.",
    ofTheMonth: (r) => `from ${r.share} of the month`,
    statisticsCoverUpTo: (r) => `Statistics cover up to ${r.time}`,
    noStatistics: "No statistics in this period",
    greyMonths: (r) => `A month drawn in grey was seen for less than ${r.share} of its length; its verdict stands on that part alone. The first and last months of a period are almost always partial.`,
    howVerdictsRead: "How the verdicts are read",
    ruleLine: (r) => `${r.part} — ${r.rule}`,
    hourlyNotMean: "Every month is judged from hourly statistics — the peak and the floor of each hour, not the mean — so a verdict for last winter is read the same way as one for last week. Nothing here is a combined score: which part is short is the whole point."
  },
  sections: {
    charge: {
      title: "Charging and discharging",
      signInverted: `The charge rises while this battery reports discharging. The power sensor's direction is probably reversed — tick "Invert battery power" in the integration's options. Until then charging and discharging are swapped everywhere on this page.`,
      meanChargePower: "Mean charge power",
      meanDischargePower: "Mean discharge power",
      ofTheTime: "Of the time",
      resting: "Resting",
      below: "Below",
      discharged: "Discharged",
      charged: "Charged",
      roundTripEfficiency: "Round-trip efficiency",
      outOfWhatWentIn: "Out of what went in",
      fullCyclesPerDay: "Full cycles per day",
      needsCapacity: "Needs the battery capacity",
      setCapacity: "Set the battery capacity in the integration's options and this becomes the energy discharged each day divided by one full charge. It is not guessed from the state of charge, which would count a shallow cycle the same as a deep one.",
      integrated: "Energy is integrated from the power readings rather than read off a meter, so a period with gaps understates it — compare it against the coverage above. Map the battery's charge and discharge counters in the options to read the inverter's own accounting instead, and to get round-trip efficiency.",
      noEfficiency: "No round-trip efficiency for this period.",
      // Below and above are two sentences, not a word slot: the comparative
      // agrees with its noun in Ukrainian.
      driftBelow: (r) => `The charge ended ${r.n} ${Ft("en", r.n, { one: "point", other: "points" })} below where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      driftAbove: (r) => `The charge ended ${r.n} ${Ft("en", r.n, { one: "point", other: "points" })} above where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      tooLittle: "There was too little charging and discharging to divide one by the other."
    },
    phases: {
      title: "Phases",
      positional: (r) => `Phase ${r.n}`,
      shareOfLoad: "Share of load",
      peakVs: (r) => `Peak vs ${r.rating}`,
      neverAboveFloor: (r) => `Total load never rose above ${r.floor}, so there was nothing to measure the spread against in this period.`,
      meanImbalance: "Mean imbalance",
      p95Imbalance: "P95 imbalance",
      above: (r) => `Above ${r.threshold}`,
      ofMeasuredTime: "of the measured time",
      measuredOver: (r) => `Measured over ${r.duration} (${r.share} of the period).`,
      belowFloorExcluded: (r) => `A further ${r.duration} sat below ${r.floor} of total load and is excluded: at standby power a few watts of difference is a large percentage and means nothing.`,
      noSustained: "No sustained imbalance in this period.",
      worst: "Worst",
      derivedRating: (r) => `No per-phase rating is configured, so the total is split across ${r.n} ${Ft("en", r.n, { one: "phase", other: "phases" })} — ${r.rating} each. Set the real figure in the integration's options if the hardware differs.`,
      alignedLow: (r) => `All phases had data at the same moment for only ${r.share} of the period. The spread cannot be measured while any one phase is unknown.`,
      imbalance: "Imbalance",
      sustainedEpisodes: "Sustained imbalance episodes"
    },
    strings: {
      title: "PV strings",
      positional: (r) => `String ${r.n}`,
      shareOfPv: "Share of PV",
      alignedLow: (r) => `All strings had data at the same moment for only ${r.share} of the period, so the shares are of that time rather than the whole window.`,
      compare: "A string consistently below its neighbour points at shading, a different orientation or a fault. Compare mean rather than peak: peaks coincide, averages do not."
    }
  }
}, _b = {
  common: {
    and: "і",
    couldNotLoadData: (r) => `Не вдалося завантажити дані: ${r.error}`,
    tryAgain: "Спробувати ще раз",
    computing: "Обчислення…",
    refreshing: "Оновлення…",
    periodShortened: "Період скорочено до максимально дозволеного",
    start: "Початок",
    duration: "Тривалість",
    peak: "Пік",
    coversOfPeriod: (r) => `Дані покривають ${r.share} періоду`
  },
  units: {
    w: "Вт",
    kw: "кВт",
    kwh: "кВт·год",
    s: "с",
    min: "хв",
    h: "год",
    ofRated: "від номінальної"
  },
  panel: {
    language: "Мова",
    couldNotLoad: (r) => `Не вдалося завантажити конфігурацію: ${r.error}`,
    loading: "Завантаження…",
    noInverter: "Ще не налаштовано жодного інвертора. Додайте інтеграцію Inverter Analytics у налаштуваннях.",
    tabs: {
      load: "Навантаження",
      battery: "Батарея",
      seasonal: "Сезонність",
      balance: "Баланс",
      grid: "Мережа",
      sizing: "Достатність"
    },
    missingOne: (r) => `Для розділу «${r.feature}» потрібне поле «${r.roles}», але для цього інвертора його не вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, який із ваших сенсорів це.`,
    missingMany: (r) => `Для розділу «${r.feature}» потрібні поля ${r.roles}, але для цього інвертора жодне з них не вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, які з ваших сенсорів це.`,
    reconfigureBefore: "Відкрийте інтеграцію, виберіть ",
    reconfigure: "Переналаштувати",
    reconfigureAfter: ", і вона запропонує те, що зможе знайти у вашій інсталяції.",
    goToSettings: "Перейти до налаштувань Inverter Analytics"
  },
  ranges: {
    "24h": "24 год",
    "7d": "7 днів",
    "30d": "30 днів",
    month: "Цей місяць",
    year: "Рік"
  },
  features: {
    load: "Аналітика навантаження",
    battery: "Аналітика батареї",
    seasonal: "Сезонність",
    balance: "Енергобаланс",
    grid: "Відключення мережі",
    sizing: "Достатність"
  },
  roles: {
    load_power: "Потужність навантаження",
    load_power_phase: "Потужність навантаження по фазах",
    rated_power: "Номінальна потужність",
    rated_power_per_phase: "Номінальна потужність на фазу",
    pv_power: "Потужність СЕС",
    pv_power_string: "Потужність СЕС по стрінгах",
    battery_power: "Потужність батареї",
    grid_power: "Потужність мережі",
    grid_power_phase: "Потужність мережі по фазах",
    battery_soc: "Рівень заряду батареї",
    battery_capacity: "Ємність батареї",
    grid_connected: "Мережа підключена",
    pv_energy_total: "Лічильник генерації СЕС",
    load_energy_total: "Лічильник споживання",
    battery_charge_total: "Лічильник заряду батареї",
    battery_discharge_total: "Лічильник розряду батареї",
    grid_import_total: "Лічильник імпорту з мережі",
    grid_export_total: "Лічильник експорту в мережу"
  },
  errors: {
    not_found: "Інвертор не знайдено або вимкнено",
    invalid_window: "Кінець періоду має бути пізніше за його початок"
  },
  format: {
    exactData: "Точні дані",
    hourlyAverages: "Погодинні середні",
    mixed: "Змішані",
    mixedSince: (r) => `Змішані з ${r.date}`,
    noData: "Немає даних за цей період",
    coversUnderOnePercent: "Дані покривають менше ніж 1% періоду",
    coversOnly: (r) => `Дані покривають лише ${r.share} періоду`
  },
  verdict: {
    enough: "Достатньо",
    borderline: "На межі",
    short: "Замало",
    none: "Без вердикту",
    noData: {
      inverter: "За цей період немає статистики навантаження.",
      battery: "За цей період немає статистики рівня заряду батареї.",
      solar: "За цей період немає статистики лічильників або споживання замало, щоб рахувати частку."
    },
    neverFull: "За цей період батарея жодного разу не зарядилася повністю, тож ночі нічого не кажуть про її ємність.",
    hintNeverFilled: "без повного заряду",
    hintNoData: "немає даних"
  },
  charts: {
    locale: "uk",
    percentOfTime: "% часу",
    percentImbalance: "% перекосу фаз",
    percentCharge: "% заряду",
    percentOfMeasuredTime: "% виміряного часу",
    hour: "година",
    hours: "години",
    mean: "Середнє",
    peak: "Пік",
    load: "Навантаження",
    pv: "СЕС",
    in: "Надходження",
    out: "Витрата",
    flows: {
      pv_energy_total: "Сонце",
      grid_import_total: "З мережі",
      battery_discharge_total: "З батареї",
      load_energy_total: "Будинок",
      grid_export_total: "У мережу",
      battery_charge_total: "У батарею"
    },
    hoursWithoutGrid: (r) => `${r.hours} год без мережі`,
    // The verb agrees with the count: 1 відключення почалося, 2 почалися,
    // 5 відключень почалося.
    outagesBegan: (r) => r.n === 0 ? "жодне відключення не почалося" : Ft("uk", r.n, {
      one: `${r.n} відключення почалося`,
      few: `${r.n} відключення почалися`,
      many: `${r.n} відключень почалося`,
      other: `${r.n} відключення почалося`
    })
  },
  load: {
    loadConsistency: (r) => `Загальне навантаження в середньому становить ${r.total}, а сума фаз — ${r.partsTotal}. Можливо, для одного з цих показників вказано не той сенсор?`,
    pvConsistency: (r) => `Загальна потужність СЕС у середньому становить ${r.total}, а сума стрінгів — ${r.partsTotal}. Можливо, для одного з цих показників вказано не той сенсор?`,
    histogramClipped: "Деякі значення вийшли за межі гістограми й показані в її крайніх інтервалах",
    mean: "Середнє",
    median: "Медіана",
    sustained15m: "Тривала 15 хв",
    // Elliptical for "від номінальної потужності", as units.ofRated.
    above80OfRated: ">80% від номінальної",
    ofTime: "часу",
    shareOfRated: (r) => `${r.share} від номінальної`,
    noOverloads: "За цей період перевантажень не було.",
    timeAtPowerLevel: "Час на кожному рівні потужності",
    asPercentOfRated: "у % від номінальної",
    inWatts: "у ватах",
    durationCurve: "Крива тривалості навантаження",
    ratedBands: "Розподіл за діапазонами номінальної потужності",
    overloadEpisodes: "Епізоди перевантаження"
  },
  battery: {
    meanCharge: "Середній заряд",
    overWholePeriod: "за весь період",
    lowestCharge: "Найнижчий заряд",
    exactDataOnly: "лише точні дані",
    needsExactData: "потрібні точні дані",
    below: (r) => `Нижче ${r.level}`,
    dips: "Провали",
    lastingOverMinute: "довші за хвилину",
    meanLowPoint: "Середній мінімум",
    acrossThoseDips: "серед цих провалів",
    dipsNotMeasurable: "Цей період покривають лише погодинні середні, які записують середній заряд за кожну годину. Падіння до 8% на двадцять хвилин виглядає там як цілком спокійне число, тож провали взагалі неможливо порахувати — порожня таблиця читалася б як «нічого не сталося». Виберіть коротший період, щоб їх побачити.",
    noEpisodes: (r) => `За цей період заряд жодного разу не тримався нижче ${r.level} довше ніж хвилину.`,
    lowest: "Найнижчий",
    recoveredTo: "Відновився до",
    dipsCountedFrom: (r) => `Провали пораховано з ${r.date}, звідки починаються точні дані`,
    timeAtSoc: "Час на кожному рівні заряду",
    chargeBands: "Розподіл за діапазонами заряду",
    lowChargeEpisodes: "Епізоди низького заряду",
    mapPowerSensor: "Вкажіть сенсор потужності батареї в параметрах інтеграції, щоб побачити, скільки енергії входить і виходить і яку частку часу батарея працює."
  },
  seasonality: {
    monthsIn: (r) => `Місяці за часовим поясом ${r.timezone}`,
    meanByMonth: "Середня потужність за місяцями",
    // 1 місяць має, 3 місяці мають, 5 місяців мають; "Один" only for 1 itself,
    // since 21 falls in the same form.
    thinMonths: (r) => Ft("uk", r.n, {
      one: `${r.n === 1 ? "Один" : r.n} місяць має дані менш ніж за ${r.share} своїх днів і показаний сірим.`,
      few: `${r.n} місяці мають дані менш ніж за ${r.share} своїх днів і показані сірим.`,
      many: `${r.n} місяців мають дані менш ніж за ${r.share} своїх днів і показані сірим.`,
      other: `${r.n} місяця мають дані менш ніж за ${r.share} своїх днів і показані сірим.`
    }),
    partialNotLower: "Місяць, який реєстратор бачив лише частково, — не нижчий місяць: самі значення правильні, а порівняння — ні.",
    // Для одного місяця, для 21 місяця, для 3 місяців, для 5 місяців.
    absentMonths: (r) => Ft("uk", r.n, {
      one: r.n === 1 ? "Для одного місяця немає жодних записаних даних, тож стовпчика в нього немає." : `Для ${r.n} місяця немає жодних записаних даних, тож стовпчиків у них немає.`,
      few: `Для ${r.n} місяців немає жодних записаних даних, тож стовпчиків у них немає.`,
      many: `Для ${r.n} місяців немає жодних записаних даних, тож стовпчиків у них немає.`,
      other: `Для ${r.n} місяця немає жодних записаних даних, тож стовпчиків у них немає.`
    }),
    statisticsFromStart: "Home Assistant зберігає довгострокову статистику лише з моменту, коли сенсор починає її створювати.",
    monthByMonth: "Місяць за місяцем",
    month: "Місяць",
    meanLoad: "Середнє навантаження",
    busiestHour: "Найнавантаженіша година",
    meanPv: "Середня генерація СЕС",
    ofTheMonth: "Покриття даними",
    busiestHourNote: "«Найнавантаженіша година» — це найбільше погодинне середнє, а не найбільше навантаження. За межами строку зберігання реєстратора Home Assistant тримає лише середнє за годину, тож короткий пік усередині години вже усереднено, коли ця сторінка його бачить.",
    meanByHour: "Середня потужність за годиною доби",
    byHourNote: "Усереднено за весь період, тож пори року змішуються. Теплова карта нижче ставить те саме питання для кожного місяця окремо.",
    hourByMonth: "Година доби, місяць за місяцем",
    heatmapNote: "Тут зимовий вечірній пік і літній полуденний перестають бути двома середніми й стають двома формами. Години без записаних даних лишаються порожніми, а не показуються нулем."
  },
  balance: {
    hourlyStatistics: "Погодинна статистика",
    daysIn: (r) => `Дні за часовим поясом ${r.timezone}`,
    countedUpTo: (r) => `Пораховано до ${r.time}`,
    noEnergyStatistics: "За цей період немає статистики енергії",
    intoSystem: "у систему",
    outOfIt: "із системи",
    inAgainstOut: "Надходження проти витрати",
    needsAllSix: (r) => `Баланс можна звести лише тоді, коли вказано всі шість лічильників. Бракує: ${r.missing}. Доти різниця між двома стовпчиками вимірювала б те, що не вказано, а не те, що втрачено.`,
    inOut: (r) => `Надійшло ${r.in}, вийшло ${r.out} —`,
    unaccountedFor: (r) => `не враховано (${r.share}).`,
    moreOutThanIn: (r) => `вийшло більше, ніж надійшло (${r.share}).`,
    unaccountedNote: "У цьому значенні — втрати на перетворення й на заряд-розряд батареї, а також кожна розбіжність між шістьма лічильниками. Його названо неврахованим, а не втратами, бо ніщо тут не відрізнить нагрів в інверторі від похибки струмових кліщів.",
    ratiosTitle: "Самозабезпечення й самоспоживання",
    ratiosNeedCounters: "Для самозабезпечення потрібні лічильники будинку й імпорту з мережі; для самоспоживання — сонячної генерації й експорту в мережу.",
    selfSufficiency: "Самозабезпечення",
    selfConsumption: "Самоспоживання",
    dayByDay: "День за днем",
    noDays: "За цей період немає днів зі статистикою енергії.",
    dayByDayNote: "Два стовпчики на день: що надійшло і що вийшло. Якщо їх скласти, та сама енергія порахувалася б двічі. Енергію читають із погодинної статистики Home Assistant, де скидання лічильників уже враховано. Поточна година зводиться лише після її завершення, тож період до теперішнього моменту закінчується останньою повною годиною."
  },
  grid: {
    outages: "Відключення",
    withoutGrid: "Без мережі",
    unrecordedAssumedOff: (r) => `+ ${r.duration} без записів, прийнято як без мережі`,
    shareOfTime: "Частка часу",
    ofMeasuredTime: "виміряного часу",
    longest: "Найдовше",
    fromTime: (r) => `з ${r.time}`,
    meanDuration: "Середня тривалість",
    briefInterruptions: "Короткі перебої",
    underAMinute: "коротші за хвилину",
    atLeast: (r) => `щонайменше ${r.duration}`,
    noOutages: (r) => `За цей період відключень не було — жодного за ${r.duration} вимірювань.`,
    chargeAtStart: "Заряд на початку",
    lowest: "Найнижчий",
    atEnd: "Наприкінці",
    meanLoad: "Середнє навантаження",
    unrecorded: (r) => `(${r.duration} без записів)`,
    noAutonomy: "Оцінки автономності немає.",
    autonomyReasons: {
      no_soc: "Для неї потрібен рівень заряду батареї, а його для цього інвертора не вказано.",
      no_outages: "За цей період не було відключень, за якими можна було б визначити швидкість розряду.",
      no_soc_in_outages: "Під час жодного з відключень цього періоду рівень заряду батареї не записувався, тож немає розряду, за яким можна було б визначити швидкість.",
      no_net_discharge: "Під час відключень цього періоду заряд не знижувався — їх покрило сонце, — тож швидкості розряду визначити немає з чого."
    },
    tooLittleEvidence: (r) => `Відключення з показами заряду на початку й наприкінці разом тривають ${r.hours}, а для оцінки потрібна щонайменше година.`,
    fromFullTo: (r) => `Від повного до ${r.level}`,
    fromNow: "Від поточного рівня",
    chargeNow: "Заряд зараз",
    dischargeRate: "Швидкість розряду",
    // Відсоткових пунктів рівня заряду за годину.
    pointsPerHour: (r) => `${r.rate} в.п./год`,
    evidenceNote: (r) => `За швидкістю, що спостерігалася під час відключень цього періоду, — а їх разом ${r.hours}. Чи каже щось відключення літнього пообіддя про зимовий вечір, вирішувати вам; середнє навантаження поруч допоможе це оцінити.`,
    countedFromInferred: (r) => `Відключення пораховано з ${r.date} — для давнішого часу є лише погодинні середні, з яких не видно, коли саме в межах години зникала мережа`,
    countedFromNoHistory: (r) => `Відключення пораховано з ${r.date} — давнішої історії цього сенсора реєстратор не зберігає`,
    inferredBanner: "Визначено за потоками потужності, а не виміряно. Ніч, коли будинок живить батарея і через підключення до мережі нічого не проходить, виглядає точнісінько як відключення, а денного відключення, яке покриває сонце, взагалі не видно. Щоб вимірювати, вкажіть сенсор, який повідомляє про наявність мережі.",
    hoursByDay: "Години без мережі, за днями",
    noDaysWithData: "За цей період немає днів із даними.",
    // 1 і 21 день не має, 3 дні не мають, 5 днів не мають.
    missingDays: (r) => Ft("uk", r.n, {
      one: `${r.n} день цього періоду не має даних і не показаний.`,
      few: `${r.n} дні цього періоду не мають даних і не показані.`,
      many: `${r.n} днів цього періоду не мають даних і не показані.`,
      other: `${r.n} дня цього періоду не мають даних і не показані.`
    }),
    shareByHour: "Частка часу без мережі, за годиною доби",
    hoursNeverRecorded: "Години, яких сенсор жодного разу не записав, лишаються порожніми, а не показуються нулем.",
    autonomy: "Автономність"
  },
  sizing: {
    cards: {
      inverter: "Інвертор проти навантаження",
      battery: "Батарея проти ночей",
      solar: "Сонце проти споживання"
    },
    parts: {
      inverter: "Інвертор",
      battery: "Батарея",
      solar: "Сонце"
    },
    hoursAtRated: (r) => `${r.hours} год на номінальній`,
    // Genitive after «з»: з 1 дня, з 3 днів, з 30 днів, з 21 дня.
    daysOf: (r) => `${r.days} з ${r.total} ` + Ft("uk", r.total, { one: "дня", few: "днів", many: "днів", other: "дня" }),
    ofLoad: (r) => `${r.share} від споживання`,
    countOf: (r) => `${r.count} з ${r.total}`,
    hoursReachedRated: "Годин, коли навантаження досягало номінальної потужності",
    // «Сягало» — досягало щонайменше цієї частки, як і рахує код (>=).
    hoursAboveOfRated: (r) => `Годин, коли навантаження сягало ${r.share} від номінальної`,
    highestPeak: "Найвищий погодинний пік",
    daysFilledAndLow: "Днів, коли батарея зарядилася повністю й однаково опустилася нижче низької позначки",
    daysLowWithoutFilling: "Днів, коли вона опустилася нижче низької позначки, не зарядившись повністю",
    daysFilled: "Днів, коли вона зарядилася повністю",
    lowestCharge: "Найнижчий заряд",
    productionShare: "Генерація як частка споживання",
    producedConsumed: "Згенеровано / спожито",
    selfSufficiency: "Самозабезпечення",
    daysBatteryFilled: "Днів із повним зарядом батареї",
    // Each rule says what sizing.py computes: "more than" is strict, "at
    // least" and "from" include the mark, "below the low mark" is strict.
    inverterRule: (r) => `Замало, якщо навантаження досягало номінальної потужності в більш ніж ${r.shortShare} годин; на межі — якщо таке траплялося хоча б в одну годину або якщо навантаження сягало ${r.highShare} від номінальної в більш ніж ${r.borderlineShare} годин.`,
    batteryRule: (r) => `Рахується за днями з даними: замало, якщо щонайменше в ${r.share} із них батарея зарядилася до ${r.full} і все одно опустилася нижче ${r.low}; на межі — якщо таке траплялося хоча б раз; без вердикту — для періоду, у якому вона жодного разу не зарядилася повністю. День, коли батарея опустилася нижче цієї позначки, так і не зарядившись повністю, зараховується як недолік сонця, а не батареї.`,
    solarRuleWithFill: (r) => `Достатньо, якщо генерація становить щонайменше ${r.enough} споживання і батарея заряджалася повністю щонайменше в ${r.fill} днів; на межі — від ${r.borderline} споживання; замало — якщо менше.`,
    solarRule: (r) => `Достатньо, якщо генерація становить щонайменше ${r.enough} споживання; на межі — від ${r.borderline} споживання; замало — якщо менше.`,
    needsNotSet: (r) => `Потрібне значення «${r.roles}», але для цього інвертора його не задано.`,
    needsNotMapped: (r) => r.n === 1 ? `Потрібне поле «${r.roles}», але для цього інвертора його не вказано.` : `Потрібні поля ${r.roles}, але для цього інвертора їх не вказано.`,
    // The option names as the integration's form shows them in Ukrainian.
    thresholdsInverted: (r) => `Позначка повного заряду (${r.full}) не вища за позначку низького (${r.low}), тож жоден день неможливо оцінити. Підвищте «Повний заряд батареї» або знизьте «Низький заряд батареї» в параметрах інтеграції.`,
    // One sensor or a list of them: the verb and pronoun follow, not the
    // plural category — 21 sensors are still «вони».
    noStatisticsBefore: (r) => r.n === 1 ? `${r.sensors} не зберігає довгострокової статистики — у нього немає` : `${r.sensors} не зберігають довгострокової статистики — у них немає`,
    noStatisticsAfter: (r) => r.n === 1 ? "— тож цю картку з нього не прочитати." : "— тож цю картку з них не прочитати.",
    readFrom: (r) => `Оцінено за ${r.share} періоду.`,
    batteryNotFilling: (r) => `Генерація покриває споживання, але батарея заряджалася повністю лише в ${r.share} днів — удень експорт, уночі імпорт.`,
    cellCoverage: (r) => `покриття ${r.share}`,
    noMonths: "У цей період не потрапляє жоден місяць.",
    ofTheMonth: (r) => `дані за ${r.share} місяця`,
    statisticsCoverUpTo: (r) => `Статистика охоплює час до ${r.time}`,
    noStatistics: "За цей період немає статистики",
    greyMonths: (r) => `Місяць, показаний сірим, має дані менш ніж за ${r.share} своєї тривалості; його вердикт спирається лише на цю частину. Перший і останній місяці періоду майже завжди неповні.`,
    howVerdictsRead: "Як визначаються вердикти",
    ruleLine: (r) => `${r.part} — ${r.rule}`,
    hourlyNotMean: "Кожен місяць оцінюється за погодинною статистикою — за піком і мінімумом кожної години, а не за середнім, — тож вердикт для минулої зими виноситься так само, як для минулого тижня. Тут немає жодної зведеної оцінки: уся суть у тому, щоб показати, якої саме частини замало."
  },
  sections: {
    charge: {
      title: "Заряд і розряд",
      signInverted: "Рівень заряду зростає, хоча батарея повідомляє про розряд. Напрям сенсора потужності, ймовірно, обернений — позначте «Інвертувати знак потужності батареї» в параметрах інтеграції. Доти заряд і розряд на цій сторінці всюди переплутані місцями.",
      meanChargePower: "Середня потужність заряду",
      meanDischargePower: "Середня потужність розряду",
      ofTheTime: "Частка часу",
      resting: "Простій",
      below: "Нижче",
      discharged: "Розряджено",
      charged: "Заряджено",
      roundTripEfficiency: "ККД заряду-розряду",
      outOfWhatWentIn: "Від того, що надійшло",
      fullCyclesPerDay: "Повних циклів на добу",
      needsCapacity: "Потрібна ємність батареї",
      setCapacity: "Вкажіть ємність батареї в параметрах інтеграції, і тут буде енергія, розряджена за добу, поділена на один повний заряд. Її не вгадують за рівнем заряду, бо тоді неглибокий цикл рахувався б так само, як глибокий.",
      integrated: "Енергію обчислено з показів потужності, а не зчитано з лічильника, тому період із пропусками її занижує — порівняйте її з покриттям даними вище. Вкажіть лічильники заряду й розряду батареї в параметрах, щоб натомість читати власний облік інвертора й отримати ККД заряду-розряду.",
      noEfficiency: "За цей період ККД заряду-розряду немає.",
      // 1 пункт, 2 пункти, 5 пунктів.
      driftBelow: (r) => `Наприкінці рівень заряду був на ${r.n} ${Ft("uk", r.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" })} нижчим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.`,
      driftAbove: (r) => `Наприкінці рівень заряду був на ${r.n} ${Ft("uk", r.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" })} вищим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.`,
      tooLittle: "Заряду й розряду було замало, щоб ділити одне на інше."
    },
    phases: {
      title: "Фази",
      positional: (r) => `Фаза ${r.n}`,
      shareOfLoad: "Частка навантаження",
      peakVs: (r) => `Пік щодо ${r.rating}`,
      neverAboveFloor: (r) => `Загальне навантаження жодного разу не перевищило ${r.floor}, тож за цей період не було відносно чого вимірювати перекіс фаз.`,
      meanImbalance: "Середній перекіс фаз",
      p95Imbalance: "P95 перекосу фаз",
      above: (r) => `Понад ${r.threshold}`,
      ofMeasuredTime: "виміряного часу",
      measuredOver: (r) => `Виміряно за ${r.duration} (${r.share} періоду).`,
      belowFloorExcluded: (r) => `Ще ${r.duration} загальне навантаження було нижче ${r.floor}, і цей час виключено: за потужності очікування різниця в кілька ватів дає великий відсоток і нічого не означає.`,
      noSustained: "За цей період тривалого перекосу фаз не було.",
      worst: "Найбільший",
      // поділено на 1 фазу, 3 фази, 5 фаз.
      derivedRating: (r) => `Номінальну потужність на фазу не налаштовано, тому загальну поділено на ${r.n} ${Ft("uk", r.n, { one: "фазу", few: "фази", many: "фаз", other: "фази" })} — по ${r.rating} на кожну. Якщо обладнання інше, вкажіть справжнє значення в параметрах інтеграції.`,
      alignedLow: (r) => `Усі фази мали дані одночасно лише для ${r.share} періоду. Перекіс фаз неможливо виміряти, поки дані хоча б однієї фази невідомі.`,
      imbalance: "Перекіс фаз",
      sustainedEpisodes: "Епізоди тривалого перекосу фаз"
    },
    strings: {
      title: "Стрінги СЕС",
      positional: (r) => `Стрінг ${r.n}`,
      shareOfPv: "Частка СЕС",
      alignedLow: (r) => `Усі стрінги мали дані одночасно лише для ${r.share} періоду, тож частки рахуються від цього часу, а не від усього періоду.`,
      compare: "Стрінг, що постійно видає менше за сусідній, вказує на затінення, іншу орієнтацію або несправність. Порівнюйте середнє, а не пік: піки збігаються, середні — ні."
    }
  }
}, bb = ["en", "uk"], Jg = "inverter-analytics.lang", wb = { en: mb, uk: _b };
function ty(r) {
  return r === "en" || r === "uk";
}
function Tc(r) {
  return (r ?? "").toLowerCase().startsWith("uk");
}
function Sb(r, t) {
  return ty(r) ? r : Tc(t) ? "uk" : "en";
}
function xb(r, t) {
  return r === "uk" ? "uk" : !t || Tc(t) ? "en" : t;
}
function ey(r) {
  return wb[r];
}
function ro(r) {
  return ey(Tc(r) ? "uk" : "en");
}
let fa, Ss;
const sh = /* @__PURE__ */ new Set();
function Tb() {
  if (fa === void 0)
    try {
      const r = globalThis.localStorage?.getItem(Jg) ?? null;
      fa = ty(r) ? r : null;
    } catch {
      fa = null;
    }
  return fa;
}
function ry() {
  for (const r of sh) r();
}
function lh() {
  return Sb(Tb(), Ss);
}
function uh() {
  return xb(lh(), Ss);
}
function Cb(r) {
  fa = r;
  try {
    globalThis.localStorage?.setItem(Jg, r);
  } catch {
  }
  ry();
}
function Mb(r) {
  if (r === Ss) return;
  const t = uh();
  Ss = r, uh() !== t && ry();
}
function Db(r) {
  return sh.add(r), () => sh.delete(r);
}
const Js = "—";
function pt(r, t) {
  if (r === null || Number.isNaN(r)) return Js;
  const e = ro(t);
  return Math.abs(r) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    r / 1e3
  )} ${e.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(r)} ${e.units.w}`;
}
function K(r, t) {
  return r === null || Number.isNaN(r) ? Js : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r * 100)}%`;
}
function hr(r, t) {
  return r === null || Number.isNaN(r) ? Js : r <= 0 ? "0%" : r < 1e-3 ? "<0.1%" : K(r, t);
}
const Ab = 10 * 60;
function Xt(r, t) {
  if (r === null || Number.isNaN(r)) return Js;
  const { units: e } = ro(t);
  return `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r)} ${e.kwh}`;
}
function qt(r, t) {
  const { units: e } = ro(t);
  if (r < 60) return `${Math.round(r)} ${e.s}`;
  const i = Math.round(r);
  if (i < Ab) {
    const a = i % 60, o = (i - a) / 60;
    return a === 0 ? `${o} ${e.min}` : `${o} ${e.min} ${a} ${e.s}`;
  }
  const n = Math.round(i / 60);
  return n < 60 ? `${n} ${e.min}` : `${Math.floor(n / 60)} ${e.h} ${n % 60} ${e.min}`;
}
function Ei(r, t) {
  if (typeof r == "object" && r !== null && "code" in r) {
    const e = r.code;
    if (typeof e == "string" && Object.prototype.hasOwnProperty.call(t.errors, e))
      return t.errors[e];
  }
  if (typeof r == "object" && r !== null && "message" in r) {
    const e = r.message;
    if (typeof e == "string" && e) return e;
  }
  return String(r);
}
function tl(r, t, e) {
  const { format: i } = ro(e);
  return r === "raw" ? i.exactData : r === "lts" ? i.hourlyAverages : t ? i.mixedSince({ date: new Date(t).toLocaleDateString(e) }) : i.mixed;
}
function ka(r, t) {
  if (r >= 0.95) return null;
  const { format: e } = ro(t);
  return r <= 0 ? e.noData : r < 0.01 ? e.coversUnderOnePercent : e.coversOnly({ share: K(r, t) });
}
function Ib(r) {
  let t;
  return () => (t ??= r().finally(() => {
    t = void 0;
  }), t);
}
const iy = ["24h", "7d", "30d", "month", "year"];
function Lb(r, t) {
  return r.ranges[t];
}
const fo = 24 * 3600 * 1e3, Uf = 60 * 1e3;
function kn(r, t) {
  const e = new Date(Math.floor(t.getTime() / Uf) * Uf);
  switch (r) {
    case "24h":
      return { start: new Date(e.getTime() - fo), end: e };
    case "7d":
      return { start: new Date(e.getTime() - 7 * fo), end: e };
    case "30d":
      return { start: new Date(e.getTime() - 30 * fo), end: e };
    case "month":
      return { start: new Date(e.getFullYear(), e.getMonth(), 1, 0, 0, 0, 0), end: e };
    case "year":
      return { start: new Date(e.getTime() - 365 * fo), end: e };
  }
}
function Pb(r, t, e, i) {
  const a = r.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && e.includes(a) ? a : i.tab,
    range: s && iy.includes(s) ? s : i.range,
    entryId: l || i.entryId
  };
}
function $b(r, t) {
  const e = new URLSearchParams({ range: t.range });
  return t.entryId && e.set("entry", t.entryId), `${r}/${t.tab}?${e.toString()}`;
}
class je {
  constructor(t) {
    this.host = t, t.addController(this);
  }
  hostConnected() {
    this.unsubscribe = Db(() => this.host.requestUpdate());
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
  get lang() {
    return lh();
  }
  get m() {
    return ey(lh());
  }
  get locale() {
    return uh();
  }
}
function Rb(r, t) {
  return r.roles[t] ?? t;
}
function ny(r, t) {
  const e = t.map((i) => Rb(r, i));
  return e.length <= 1 ? e.join("") : `${e.slice(0, -1).join(", ")} ${r.common.and} ${e[e.length - 1]}`;
}
const Ob = /^(load|grid|pv)_p(\d+)$/;
function xs(r, t) {
  const e = Ob.exec(t.key);
  if (!e) return t.label;
  const i = Number(e[2]);
  return e[1] === "pv" ? r.sections.strings.positional({ n: i }) : r.sections.phases.positional({ n: i });
}
const Eb = "/config/integrations/integration/inverter_analytics", at = {
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
function re() {
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
const wt = (r, t) => Number(r.toFixed(t)), ay = (r, t, e) => new Intl.NumberFormat(e.charts.locale, {
  maximumFractionDigits: t,
  useGrouping: !1
}).format(wt(r, t));
function kb(r, t, e) {
  const { base: i, axis: n } = re(), a = r.histogram.buckets, o = a.map(
    (s) => t === "watts" ? String(wt(s.start, 0)) : ay(s.start / r.rated_power * 100, 1, e)
  );
  return {
    ...i,
    xAxis: {
      ...n,
      type: "category",
      data: o,
      name: t === "watts" ? e.units.w : `% ${e.units.ofRated}`,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: e.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: a.map((s) => wt(s.fraction * 100, 2)),
        itemStyle: { color: at.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Nb(r, t) {
  const { base: e, axis: i } = re();
  return {
    ...e,
    xAxis: { ...i, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...i, type: "value", name: t.units.w },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: at.load },
        itemStyle: { color: at.load },
        data: r.duration_curve.map((n) => [
          wt(n.fraction * 100, 2),
          wt(n.value, 1)
        ])
      }
    ]
  };
}
function Bb(r, t) {
  const { base: e, axis: i } = re(), n = [...r.bands].reverse();
  return {
    ...e,
    xAxis: { ...i, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...i, type: "category", data: n.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: n.map((a) => wt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => n[a.dataIndex].key === "100+" ? at.overload : at.load
        }
      }
    ]
  };
}
function zb(r, t) {
  const { base: e, axis: i } = re(), n = r.histogram;
  return {
    ...e,
    xAxis: {
      ...i,
      type: "category",
      data: n.map((a) => String(wt(a.start * 100, 0))),
      name: t.charts.percentImbalance,
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: n.map((a) => wt(a.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (a) => n[a.dataIndex].start >= r.threshold ? at.overload : at.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Fb(r, t, e) {
  const { base: i, axis: n } = re();
  return {
    ...i,
    // Two bar colours with nothing naming them is a guess. The shared grid
    // starts 24px from the top, which is exactly where the legend draws, so
    // the plot has to be pushed down to make room for it.
    legend: { data: [e.charts.mean, e.charts.peak], top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 48 },
    xAxis: { ...n, type: "category", data: r.map((a) => xs(e, a)) },
    yAxis: { ...n, type: "value", name: e.units.w },
    series: [
      {
        name: e.charts.mean,
        type: "bar",
        data: r.map((a) => a.mean === null ? null : wt(a.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: e.charts.peak,
        type: "bar",
        data: r.map((a) => a.peak === null ? null : wt(a.peak, 1)),
        itemStyle: { color: at.muted }
      }
    ]
  };
}
function Hb(r, t) {
  const { base: e, axis: i } = re(), n = r.histogram.buckets;
  return {
    ...e,
    xAxis: {
      ...i,
      type: "category",
      data: n.map((a) => String(wt(a.start, 0))),
      name: t.charts.percentCharge,
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: n.map((a) => wt(a.fraction * 100, 2)),
        // Everything under the configured low mark is the part worth looking
        // at, coloured as a warning rather than left for the reader to compare
        // against a number written elsewhere on the page.
        itemStyle: {
          color: (a) => n[a.dataIndex].end <= r.low_pct ? at.overload : at.battery
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Vb(r, t) {
  const { base: e, axis: i } = re(), n = [...r].reverse();
  return {
    ...e,
    xAxis: { ...i, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...i, type: "category", data: n.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: n.map((a) => wt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => n[a.dataIndex].key === "0-20" ? at.overload : at.battery
        }
      }
    ]
  };
}
function Cc(r, t, e) {
  const [i, n] = r.split("-").map(Number), a = new Date(Date.UTC(2e3, n - 1, 1)).toLocaleDateString(e, { month: "short" });
  return t && t.slice(0, 4) === String(i) ? a : `${a} ${i}`;
}
function Gb(r, t, e) {
  const { base: i, axis: n } = re(), a = r.map((s, l) => Cc(s.key, r[l - 1]?.key, e.charts.locale)), o = [
    {
      name: e.charts.load,
      type: "bar",
      data: r.map((s) => s.load_mean === null ? null : wt(s.load_mean, 1)),
      // An incomplete month keeps its bar and loses its solidity: dropping it
      // would leave a hole the reader fills in with a reason of their own.
      itemStyle: {
        color: (s) => r[s.dataIndex].complete ? at.load : at.muted
      }
    }
  ];
  return t && o.push({
    name: e.charts.pv,
    type: "bar",
    data: r.map((s) => s.pv_mean === null ? null : wt(s.pv_mean, 1)),
    itemStyle: { color: at.pv }
  }), {
    ...i,
    legend: t ? { data: [e.charts.load, e.charts.pv], top: 0, textStyle: i.textStyle } : void 0,
    grid: { ...i.grid, top: t ? 48 : 24 },
    xAxis: { ...n, type: "category", data: a },
    yAxis: { ...n, type: "value", name: e.units.w },
    series: o
  };
}
function Wb(r, t, e) {
  const { base: i, axis: n } = re(), a = [
    {
      name: e.charts.load,
      type: "line",
      showSymbol: !1,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: at.load },
      itemStyle: { color: at.load },
      data: r.map((o) => o.load_mean === null ? null : wt(o.load_mean, 1))
    }
  ];
  return t && a.push({
    name: e.charts.pv,
    type: "line",
    showSymbol: !1,
    lineStyle: { color: at.pv },
    itemStyle: { color: at.pv },
    data: r.map((o) => o.pv_mean === null ? null : wt(o.pv_mean, 1))
  }), {
    ...i,
    legend: t ? { data: [e.charts.load, e.charts.pv], top: 0, textStyle: i.textStyle } : void 0,
    grid: { ...i.grid, top: t ? 48 : 24 },
    xAxis: {
      ...n,
      type: "category",
      data: r.map((o) => String(o.hour)),
      name: e.charts.hour,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: e.units.w },
    series: a
  };
}
function Ub(r, t, e) {
  const { base: i, axis: n } = re(), a = t.map((h) => h.key), o = a.map((h, c) => Cc(h, a[c - 1], e.charts.locale)), s = new Map(a.map((h, c) => [h, c])), l = r.filter((h) => h.load_mean !== null && s.has(h.month)).map((h) => [s.get(h.month), h.hour, wt(h.load_mean, 1)]), u = l.map((h) => h[2]);
  return {
    ...i,
    tooltip: { trigger: "item" },
    grid: { ...i.grid, top: 48, bottom: 60 },
    xAxis: { ...n, type: "category", data: o, splitArea: { show: !0 } },
    yAxis: {
      ...n,
      type: "category",
      data: Array.from({ length: 24 }, (h, c) => String(c)),
      name: e.charts.hour
    },
    visualMap: {
      min: u.length ? Math.min(...u) : 0,
      max: u.length ? Math.max(...u) : 1,
      calculable: !0,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: i.textStyle,
      inRange: { color: [at.battery, at.pv, at.overload] }
    },
    series: [{ type: "heatmap", data: l }]
  };
}
function Mn(r, t) {
  return r.charts.flows[t] ?? t;
}
const oy = {
  pv_energy_total: at.pv,
  grid_import_total: at.grid,
  battery_discharge_total: at.battery,
  load_energy_total: at.load,
  grid_export_total: at.gridExport,
  battery_charge_total: at.batteryCharge
};
function Yb(r, t, e, i) {
  const { base: n, axis: a } = re(), o = [...t, ...e].filter((s) => s in r);
  return {
    ...n,
    legend: { data: o.map((s) => Mn(i, s)), top: 0, textStyle: n.textStyle },
    grid: { ...n.grid, top: 56 },
    xAxis: { ...a, type: "value", name: i.units.kwh },
    yAxis: { ...a, type: "category", data: [i.charts.out, i.charts.in] },
    series: o.map((s) => ({
      name: Mn(i, s),
      type: "bar",
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: oy[s] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: t.includes(s) ? [null, wt(r[s], 3)] : [wt(r[s], 3), null]
    }))
  };
}
function Xb(r, t, e, i) {
  const { base: n, axis: a } = re(), o = [...t, ...e].filter(
    (s) => r.some((l) => s in l.flows)
  );
  return {
    ...n,
    legend: { data: o.map((s) => Mn(i, s)), top: 0, textStyle: n.textStyle },
    grid: { ...n.grid, top: 56 },
    xAxis: { ...a, type: "category", data: r.map((s) => s.day.slice(5)) },
    yAxis: { ...a, type: "value", name: i.units.kwh },
    series: o.map((s) => ({
      name: Mn(i, s),
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: oy[s] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: r.map((l) => s in l.flows ? wt(l.flows[s], 3) : null)
    }))
  };
}
function qb(r, t) {
  const { base: e, axis: i } = re();
  return {
    ...e,
    tooltip: {
      ...e.tooltip,
      // How many outages began on a day is the other thing the by-day view has
      // to answer, and a second axis for a count of two or three would cost
      // more than it says. The tooltip is where it fits.
      formatter: (n) => {
        const a = n[0], o = r[a.dataIndex].count, s = t.charts.hoursWithoutGrid({ hours: ay(a.value, 2, t) });
        return `${a.name}<br/>${s}<br/>${t.charts.outagesBegan({ n: o })}`;
      }
    },
    xAxis: { ...i, type: "category", data: r.map((n) => n.day.slice(5)) },
    yAxis: { ...i, type: "value", name: t.charts.hours },
    series: [
      {
        type: "bar",
        // Days the sensor had no data for are not in the list at all, so
        // every bar here stands on measured time.
        data: r.map((n) => wt(n.off_seconds / 3600, 2)),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function Zb(r, t) {
  const { base: e, axis: i } = re();
  return {
    ...e,
    xAxis: { ...i, type: "category", data: r.map((n) => `${n.hour}`) },
    yAxis: { ...i, type: "value", name: t.charts.percentOfMeasuredTime, min: 0, max: 100 },
    series: [
      {
        type: "bar",
        // A share rather than raw hours: under uneven coverage raw hours
        // compare an hour the recorder saw ten times with one it saw twice.
        // An hour with no measured time stays a hole, not a zero.
        data: r.map(
          (n) => n.measured_seconds > 0 ? wt(n.off_seconds / n.measured_seconds * 100, 2) : null
        ),
        itemStyle: { color: at.overload }
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
var hh = function(r, t) {
  return hh = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, hh(r, t);
};
function B(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  hh(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Kb = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), Qb = /* @__PURE__ */ function() {
  function r() {
    this.browser = new Kb(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), Y = new Qb();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (Y.wxa = !0, Y.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? Y.worker = !0 : !Y.hasGlobalWindow || "Deno" in window ? (Y.node = !0, Y.svgSupported = !0) : jb(navigator.userAgent, Y);
function jb(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var Mc = 12, Jb = "sans-serif", Li = Mc + "px " + Jb, t1 = 20, e1 = 100, r1 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function i1(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - t1) / e1;
    t[i] = n;
  }
  return t;
}
var n1 = i1(r1), Wr = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Wr.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || Li), r.measureText(e);
      e = e || "", i = i || Li;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Mc, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = n1[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, sy = Nn([
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
}, {}), ly = Nn([
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
}, {}), io = Object.prototype.toString, el = Array.prototype, a1 = el.forEach, o1 = el.filter, Dc = el.slice, s1 = el.map, Yf = function() {
}.constructor, vo = Yf ? Yf.prototype : null, Ac = "__proto__", l1 = 2311;
function uy() {
  return l1++;
}
function Ic() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function X(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = io.call(r);
  if (e === "[object Array]") {
    if (!wa(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = X(r[i]);
    }
  } else if (ly[e]) {
    if (!wa(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!sy[e] && !wa(r) && !Na(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== Ac && (t[o] = X(r[o]));
  }
  return t;
}
function nt(r, t, e) {
  if (!V(t) || !V(r))
    return e ? X(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Ac) {
      var n = r[i], a = t[i];
      V(a) && V(n) && !z(a) && !z(n) && !Na(a) && !Na(n) && !Xf(a) && !Xf(n) && !wa(a) && !wa(n) ? nt(n, a, e) : (e || !(i in r)) && (r[i] = X(t[i]));
    }
  return r;
}
function N(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== Ac && (r[e] = t[e]);
  return r;
}
function ut(r, t, e) {
  for (var i = gt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function vt(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function u1(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function Je(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    ut(r, t);
}
function Jt(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function C(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === a1)
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
    return Lc(r);
  if (r.map && r.map === s1)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function Nn(r, t, e, i) {
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
    return Lc(r);
  if (r.filter && r.filter === o1)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function gt(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function h1(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(Dc.call(arguments)));
  };
}
var J = vo && q(vo.bind) ? vo.call.bind(vo.bind) : h1;
function Dt(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(Dc.call(arguments)));
  };
}
function z(r) {
  return Array.isArray ? Array.isArray(r) : io.call(r) === "[object Array]";
}
function q(r) {
  return typeof r == "function";
}
function H(r) {
  return typeof r == "string";
}
function ch(r) {
  return io.call(r) === "[object String]";
}
function yt(r) {
  return typeof r == "number";
}
function V(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Xf(r) {
  return !!sy[io.call(r)];
}
function te(r) {
  return !!ly[io.call(r)];
}
function Na(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function rl(r) {
  return r.colorStops != null;
}
function c1(r) {
  return r.image != null;
}
function Ts(r) {
  return r !== r;
}
function Dn() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function tt(r, t) {
  return r ?? t;
}
function is(r, t, e) {
  return r ?? t ?? e;
}
function Lc(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return Dc.apply(r, t);
}
function hy(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function Xe(r, t) {
  if (!r)
    throw new Error(t);
}
function We(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var cy = "__ec_primitive__";
function fh(r) {
  r[cy] = !0;
}
function wa(r) {
  return r[cy];
}
var f1 = function() {
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
    return gt(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
}(), fy = typeof Map == "function";
function v1() {
  return fy ? /* @__PURE__ */ new Map() : new f1();
}
var d1 = function() {
  function r(t) {
    var e = z(t);
    this.data = v1();
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
    return fy ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function j(r) {
  return new d1(r);
}
function p1(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function il(r, t) {
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
function vy(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Pi(r, t) {
  return r.hasOwnProperty(t);
}
function Wt() {
}
var g1 = 180 / Math.PI;
function Bn(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function y1(r) {
  return [r[0], r[1]];
}
function qf(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function m1(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function _1(r) {
  return Math.sqrt(b1(r));
}
function b1(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Bl(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function w1(r, t) {
  var e = _1(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function vh(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var S1 = vh;
function x1(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var pn = x1;
function me(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function hn(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function cn(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var Gi = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), T1 = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Gi(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new Gi(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new Gi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Gi(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new Gi(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Gi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), tr = function() {
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
}(), C1 = Math.log(2);
function dh(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / C1);
    return r[e][l];
  }
  for (var u = i | 1 << e, h = e + 1; i & 1 << h; )
    h++;
  for (var c = 0, v = 0, f = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (c += (f % 2 ? -1 : 1) * r[e][v] * dh(r, t - 1, h, u, n | d, a), f++);
  }
  return a[o] = c, c;
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
  ], i = {}, n = dh(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * dh(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, h) {
      var c = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / c, l[1] = (u * a[3] + h * a[4] + a[5]) / c;
    };
  }
}
var Kf = "___zrEVENTSAVED", zl = [];
function M1(r, t, e, i, n) {
  return ph(zl, t, i, n, !0) && ph(r, e, zl[0], zl[1]);
}
function ph(r, t, e, i, n) {
  if (t.getBoundingClientRect && Y.domSupported && !dy(t)) {
    var a = t[Kf] || (t[Kf] = {}), o = D1(t, a), s = A1(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function D1(r, t) {
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
function A1(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = r[u].getBoundingClientRect(), c = 2 * u, v = h.left, f = h.top;
    o.push(v, f), l = l && a && v === a[c] && f === a[c + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Zf(s, o) : Zf(o, s));
}
function dy(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var I1 = /([&<>"'])/g, L1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Zt(r) {
  return r == null ? "" : (r + "").replace(I1, function(t, e) {
    return L1[e];
  });
}
var P1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Fl = [], $1 = Y.browser.firefox && +Y.browser.version.split(".")[0] < 39;
function gh(r, t, e, i) {
  return e = e || {}, i ? Qf(r, t, e) : $1 && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Qf(r, t, e), e;
}
function Qf(r, t, e) {
  if (Y.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (dy(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (ph(Fl, r, i, n)) {
      e.zrX = Fl[0], e.zrY = Fl[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function Pc(r) {
  return r || window.event;
}
function ce(r, t, e) {
  if (t = Pc(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && gh(r, o, t, e);
  } else {
    gh(r, t, t, e);
    var a = R1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && P1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function R1(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function O1(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function E1(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Ba = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, k1 = function() {
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
        var l = n[o], u = gh(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Hl)
      if (Hl.hasOwnProperty(e)) {
        var i = Hl[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function jf(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function N1(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Hl = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = jf(i) / jf(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = N1(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function gn() {
  return [1, 0, 0, 1, 0, 0];
}
function $c(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function B1(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function yn(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function yh(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function Rc(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(e), c = Math.cos(e);
  return r[0] = n * c + s * h, r[1] = -n * h + s * c, r[2] = a * c + l * h, r[3] = -a * h + c * l, r[4] = c * (o - i[0]) + h * (u - i[1]) + i[0], r[5] = c * (u - i[1]) - h * (o - i[0]) + i[1], r;
}
function z1(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function Oc(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var dt = function() {
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
}(), po = Math.min, go = Math.max, Kr = new dt(), Qr = new dt(), jr = new dt(), Jr = new dt(), Un = new dt(), Yn = new dt(), lt = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = po(t.x, this.x), i = po(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = go(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = go(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = gn();
    return yh(a, a, [-e.x, -e.y]), z1(a, a, [i, n]), yh(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, h = t.y, c = t.y + t.height, v = !(a < l || u < n || s < h || c < o);
    if (e) {
      var f = 1 / 0, d = 0, g = Math.abs(a - l), p = Math.abs(u - n), y = Math.abs(s - h), m = Math.abs(c - o), _ = Math.min(g, p), b = Math.min(y, m);
      a < l || u < n ? _ > d && (d = _, g < p ? dt.set(Yn, -g, 0) : dt.set(Yn, p, 0)) : _ < f && (f = _, g < p ? dt.set(Un, g, 0) : dt.set(Un, -p, 0)), s < h || c < o ? b > d && (d = b, y < m ? dt.set(Yn, 0, -y) : dt.set(Yn, 0, m)) : _ < f && (f = _, y < m ? dt.set(Un, 0, y) : dt.set(Un, 0, -m));
    }
    return e && dt.copy(e, v ? Un : Yn), v;
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
    Kr.x = jr.x = e.x, Kr.y = Jr.y = e.y, Qr.x = Jr.x = e.x + e.width, Qr.y = jr.y = e.y + e.height, Kr.transform(i), Jr.transform(i), Qr.transform(i), jr.transform(i), t.x = po(Kr.x, Qr.x, jr.x, Jr.x), t.y = po(Kr.y, Qr.y, jr.y, Jr.y);
    var l = go(Kr.x, Qr.x, jr.x, Jr.x), u = go(Kr.y, Qr.y, jr.y, Jr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
}(), py = "silent";
function F1(r, t, e) {
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
    stop: H1
  };
}
function H1() {
  Ba(this.event);
}
var V1 = function(r) {
  B(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(tr), Xn = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), G1 = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Vl = new lt(0, 0, 0, 0), gy = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new Xn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new V1(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new T1(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (C(G1, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = yy(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new Xn(i, n) : this.findHover(i, n), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new Xn(0, 0);
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
      for (var o = "on" + i, s = F1(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new Xn(e, i);
    if (Jf(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new lt(e - u, i - u, l, l), c = a.length - 1; c >= 0; c--) {
        var v = a[c];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Vl.copy(v.getBoundingRect()), v.transform && Vl.applyTransform(v.transform), Vl.intersect(h) && s.push(v));
      }
      if (s.length)
        for (var f = 4, d = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += f)
          for (var y = 0; y < g; y += d) {
            var m = e + p * Math.cos(y), _ = i + p * Math.sin(y);
            if (Jf(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new k1());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new Xn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(tr);
C(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  gy.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = yy(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || S1(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function W1(r, t, e) {
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
    return n ? py : !0;
  }
  return !1;
}
function Jf(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = W1(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== py)) {
      t.target = o;
      break;
    }
  }
}
function yy(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var my = 32, qn = 7;
function U1(r) {
  for (var t = 0; r >= my; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function tv(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    Y1(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function Y1(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function ev(r, t, e, i, n) {
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
function Gl(r, t, e, i, n, a) {
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
function Wl(r, t, e, i, n, a) {
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
function X1(r, t) {
  var e = qn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(f, d) {
    i[a] = f, n[a] = d, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var f = a - 2;
      if (f >= 1 && n[f - 1] <= n[f] + n[f + 1] || f >= 2 && n[f - 2] <= n[f] + n[f - 1])
        n[f - 1] < n[f + 1] && f--;
      else if (n[f] > n[f + 1])
        break;
      h(f);
    }
  }
  function u() {
    for (; a > 1; ) {
      var f = a - 2;
      f > 0 && n[f - 1] < n[f + 1] && f--, h(f);
    }
  }
  function h(f) {
    var d = i[f], g = n[f], p = i[f + 1], y = n[f + 1];
    n[f] = g + y, f === a - 3 && (i[f + 1] = i[f + 2], n[f + 1] = n[f + 2]), a--;
    var m = Wl(r[p], r, d, g, 0, t);
    d += m, g -= m, g !== 0 && (y = Gl(r[d + g - 1], r, p, y, y - 1, t), y !== 0 && (g <= y ? c(d, g, p, y) : v(d, g, p, y)));
  }
  function c(f, d, g, p) {
    var y = 0;
    for (y = 0; y < d; y++)
      o[y] = r[f + y];
    var m = 0, _ = g, b = f;
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
    for (var S = e, w, x, M; ; ) {
      w = 0, x = 0, M = !1;
      do
        if (t(r[_], o[m]) < 0) {
          if (r[b++] = r[_++], x++, w = 0, --p === 0) {
            M = !0;
            break;
          }
        } else if (r[b++] = o[m++], w++, x = 0, --d === 1) {
          M = !0;
          break;
        }
      while ((w | x) < S);
      if (M)
        break;
      do {
        if (w = Wl(r[_], o, m, d, 0, t), w !== 0) {
          for (y = 0; y < w; y++)
            r[b + y] = o[m + y];
          if (b += w, m += w, d -= w, d <= 1) {
            M = !0;
            break;
          }
        }
        if (r[b++] = r[_++], --p === 0) {
          M = !0;
          break;
        }
        if (x = Gl(o[m], r, _, p, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            r[b + y] = r[_ + y];
          if (b += x, _ += x, p -= x, p === 0) {
            M = !0;
            break;
          }
        }
        if (r[b++] = o[m++], --d === 1) {
          M = !0;
          break;
        }
        S--;
      } while (w >= qn || x >= qn);
      if (M)
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
  function v(f, d, g, p) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = r[g + y];
    var m = f + d - 1, _ = p - 1, b = g + p - 1, S = 0, w = 0;
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
      var M = 0, D = 0, A = !1;
      do
        if (t(o[_], r[m]) < 0) {
          if (r[b--] = r[m--], M++, D = 0, --d === 0) {
            A = !0;
            break;
          }
        } else if (r[b--] = o[_--], D++, M = 0, --p === 1) {
          A = !0;
          break;
        }
      while ((M | D) < x);
      if (A)
        break;
      do {
        if (M = d - Wl(o[_], r, f, d, d - 1, t), M !== 0) {
          for (b -= M, m -= M, d -= M, w = b + 1, S = m + 1, y = M - 1; y >= 0; y--)
            r[w + y] = r[S + y];
          if (d === 0) {
            A = !0;
            break;
          }
        }
        if (r[b--] = o[_--], --p === 1) {
          A = !0;
          break;
        }
        if (D = p - Gl(r[m], o, 0, p, p - 1, t), D !== 0) {
          for (b -= D, _ -= D, p -= D, w = b + 1, S = _ + 1, y = 0; y < D; y++)
            r[w + y] = o[S + y];
          if (p <= 1) {
            A = !0;
            break;
          }
        }
        if (r[b--] = r[m--], --d === 0) {
          A = !0;
          break;
        }
        x--;
      } while (M >= qn || D >= qn);
      if (A)
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
function ns(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < my) {
      a = tv(r, e, i, t), ev(r, e, i, e + a, t);
      return;
    }
    var o = X1(r, t), s = U1(n);
    do {
      if (a = tv(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), ev(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var ae = 1, va = 2, ln = 4, rv = !1;
function Ul() {
  rv || (rv = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function iv(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var q1 = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = iv;
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
    i.length = this._displayListLen, ns(i, iv);
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
          t.__dirty && (u.__dirty |= ae), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        e && e.length ? h.__clipPaths = e : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (Ul(), h.z = 0), isNaN(h.z2) && (Ul(), h.z2 = 0), isNaN(h.zlevel) && (Ul(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
      }
      var c = t.getDecalElement && t.getDecalElement();
      c && this._updateAndAddDisplayable(c, e, i);
      var v = t.getTextGuideLine();
      v && this._updateAndAddDisplayable(v, e, i);
      var f = t.getTextContent();
      f && this._updateAndAddDisplayable(f, e, i);
    }
  }, r.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, r.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var e = 0, i = t.length; e < i; e++)
        this.delRoot(t[e]);
      return;
    }
    var n = vt(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
}(), Cs;
Cs = Y.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var Sa = {
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
    return 1 - Sa.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? Sa.bounceIn(r * 2) * 0.5 : Sa.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, yo = Math.pow, Hr = Math.sqrt, Ms = 1e-8, _y = 1e-4, nv = Hr(3), mo = 1 / 3, Ge = Bn(), de = Bn(), mn = Bn();
function Br(r) {
  return r > -Ms && r < Ms;
}
function by(r) {
  return r > Ms || r < -Ms;
}
function $t(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function av(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function Ds(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, h = s * s - 3 * o * l, c = s * l - 9 * o * u, v = l * l - 3 * s * u, f = 0;
  if (Br(h) && Br(c))
    if (Br(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[f++] = d);
    }
  else {
    var g = c * c - 4 * h * v;
    if (Br(g)) {
      var p = c / h, d = -s / o + p, y = -p / 2;
      d >= 0 && d <= 1 && (a[f++] = d), y >= 0 && y <= 1 && (a[f++] = y);
    } else if (g > 0) {
      var m = Hr(g), _ = h * s + 1.5 * o * (-c + m), b = h * s + 1.5 * o * (-c - m);
      _ < 0 ? _ = -yo(-_, mo) : _ = yo(_, mo), b < 0 ? b = -yo(-b, mo) : b = yo(b, mo);
      var d = (-s - (_ + b)) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d);
    } else {
      var S = (2 * h * s - 3 * o * c) / (2 * Hr(h * h * h)), w = Math.acos(S) / 3, x = Hr(h), M = Math.cos(w), d = (-s - 2 * x * M) / (3 * o), y = (-s + x * (M + nv * Math.sin(w))) / (3 * o), D = (-s + x * (M - nv * Math.sin(w))) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d), y >= 0 && y <= 1 && (a[f++] = y), D >= 0 && D <= 1 && (a[f++] = D);
    }
  }
  return f;
}
function wy(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (Br(o)) {
    if (by(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = a * a - 4 * o * s;
    if (Br(h))
      n[0] = -a / (2 * o);
    else if (h > 0) {
      var c = Hr(h), u = (-a + c) / (2 * o), v = (-a - c) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function As(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, h = (l - s) * n + s, c = (h - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i;
}
function Z1(r, t, e, i, n, a, o, s, l, u, h) {
  var c, v = 5e-3, f = 1 / 0, d, g, p, y;
  Ge[0] = l, Ge[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    de[0] = $t(r, e, n, o, m), de[1] = $t(t, i, a, s, m), p = pn(Ge, de), p < f && (c = m, f = p);
  f = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < _y); _++)
    d = c - v, g = c + v, de[0] = $t(r, e, n, o, d), de[1] = $t(t, i, a, s, d), p = pn(de, Ge), d >= 0 && p < f ? (c = d, f = p) : (mn[0] = $t(r, e, n, o, g), mn[1] = $t(t, i, a, s, g), y = pn(mn, Ge), g <= 1 && y < f ? (c = g, f = y) : v *= 0.5);
  return Hr(f);
}
function K1(r, t, e, i, n, a, o, s, l) {
  for (var u = r, h = t, c = 0, v = 1 / l, f = 1; f <= l; f++) {
    var d = f * v, g = $t(r, e, n, o, d), p = $t(t, i, a, s, d), y = g - u, m = p - h;
    c += Math.sqrt(y * y + m * m), u = g, h = p;
  }
  return c;
}
function Kt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function ov(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function Q1(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (Br(a)) {
    if (by(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = o * o - 4 * a * s;
    if (Br(h)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (h > 0) {
      var c = Hr(h), u = (-o + c) / (2 * a), v = (-o - c) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Sy(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function Is(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function j1(r, t, e, i, n, a, o, s, l) {
  var u, h = 5e-3, c = 1 / 0;
  Ge[0] = o, Ge[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    de[0] = Kt(r, e, n, v), de[1] = Kt(t, i, a, v);
    var f = pn(Ge, de);
    f < c && (u = v, c = f);
  }
  c = 1 / 0;
  for (var d = 0; d < 32 && !(h < _y); d++) {
    var g = u - h, p = u + h;
    de[0] = Kt(r, e, n, g), de[1] = Kt(t, i, a, g);
    var f = pn(de, Ge);
    if (g >= 0 && f < c)
      u = g, c = f;
    else {
      mn[0] = Kt(r, e, n, p), mn[1] = Kt(t, i, a, p);
      var y = pn(mn, Ge);
      p <= 1 && y < c ? (u = p, c = y) : h *= 0.5;
    }
  }
  return Hr(c);
}
function J1(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, h = 1 / o, c = 1; c <= o; c++) {
    var v = c * h, f = Kt(r, e, n, v), d = Kt(t, i, a, v), g = f - s, p = d - l;
    u += Math.sqrt(g * g + p * p), s = f, l = d;
  }
  return u;
}
var tw = /cubic-bezier\(([0-9,\.e ]+)\)/;
function xy(r) {
  var t = r && tw.exec(r);
  if (t) {
    var e = t[1].split(","), i = +We(e[0]), n = +We(e[1]), a = +We(e[2]), o = +We(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Ds(0, i, a, 1, l, s) && $t(0, n, o, 1, s[0]);
    };
  }
}
var ew = function() {
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
    this.easing = t, this.easingFunc = q(t) ? t : Sa[t] || xy(t);
  }, r;
}(), Ty = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), rw = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new Ty(t);
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
}(), no = function() {
  function r(t) {
    this._list = new rw(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new Ty(e), s.key = t, i.insertEntry(s), n[t] = s;
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
}(), sv = {
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
function Pe(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function iw(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 360 ? 360 : r;
}
function za(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Yl(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? Pe(parseFloat(t) / 100 * 255) : Pe(parseInt(t, 10));
}
function Ci(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? za(parseFloat(t) / 100) : za(parseFloat(t));
}
function Xl(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function zr(r, t, e) {
  return r + (t - r) * e;
}
function he(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function mh(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var Cy = new no(20), _o = null;
function Wi(r, t) {
  _o && mh(_o, t), _o = Cy.put(r, _o || t.slice());
}
function _e(r, t) {
  if (r) {
    t = t || [];
    var e = Cy.get(r);
    if (e)
      return mh(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in sv)
      return mh(t, sv[i]), Wi(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          he(t, 0, 0, 0, 1);
          return;
        }
        return he(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Wi(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          he(t, 0, 0, 0, 1);
          return;
        }
        return he(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Wi(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? he(t, +u[0], +u[1], +u[2], 1) : he(t, 0, 0, 0, 1);
          h = Ci(u.pop());
        case "rgb":
          if (u.length >= 3)
            return he(t, Yl(u[0]), Yl(u[1]), Yl(u[2]), u.length === 3 ? h : Ci(u[3])), Wi(r, t), t;
          he(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            he(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Ci(u[3]), _h(u, t), Wi(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            he(t, 0, 0, 0, 1);
            return;
          }
          return _h(u, t), Wi(r, t), t;
        default:
          return;
      }
    }
    he(t, 0, 0, 0, 1);
  }
}
function _h(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Ci(r[1]), n = Ci(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], he(t, Pe(Xl(o, a, e + 1 / 3) * 255), Pe(Xl(o, a, e) * 255), Pe(Xl(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function nw(r) {
  if (r) {
    var t = r[0] / 255, e = r[1] / 255, i = r[2] / 255, n = Math.min(t, e, i), a = Math.max(t, e, i), o = a - n, s = (a + n) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + n) : u = o / (2 - a - n);
      var h = ((a - t) / 6 + o / 2) / o, c = ((a - e) / 6 + o / 2) / o, v = ((a - i) / 6 + o / 2) / o;
      t === a ? l = v - c : e === a ? l = 1 / 3 + h - v : i === a && (l = 2 / 3 + c - h), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var f = [l * 360, u, s];
    return r[3] != null && f.push(r[3]), f;
  }
}
function lv(r, t) {
  var e = _e(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return cr(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function ql(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    e = e || [];
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = t[n], s = t[a], l = i - n;
    return e[0] = Pe(zr(o[0], s[0], l)), e[1] = Pe(zr(o[1], s[1], l)), e[2] = Pe(zr(o[2], s[2], l)), e[3] = za(zr(o[3], s[3], l)), e;
  }
}
function aw(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = _e(t[n]), s = _e(t[a]), l = i - n, u = cr([
      Pe(zr(o[0], s[0], l)),
      Pe(zr(o[1], s[1], l)),
      Pe(zr(o[2], s[2], l)),
      za(zr(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function Zl(r, t, e, i) {
  var n = _e(r);
  if (r)
    return n = nw(n), t != null && (n[0] = iw(t)), e != null && (n[1] = Ci(e)), i != null && (n[2] = Ci(i)), cr(_h(n), "rgba");
}
function ow(r, t) {
  var e = _e(r);
  if (e && t != null)
    return e[3] = za(t), cr(e, "rgba");
}
function cr(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function Ls(r, t) {
  var e = _e(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var uv = new no(100);
function hv(r) {
  if (H(r)) {
    var t = uv.get(r);
    return t || (t = lv(r, -0.1), uv.put(r, t)), t;
  } else if (rl(r)) {
    var e = N({}, r);
    return e.colorStops = U(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: lv(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function sw(r) {
  return r.type === "linear";
}
function lw(r) {
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
var bh = Array.prototype.slice;
function or(r, t, e) {
  return (t - r) * e + r;
}
function Kl(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = or(t[a], e[a], i);
  return r;
}
function uw(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = or(t[o][s], e[o][s], i);
  }
  return r;
}
function bo(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function cv(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function hw(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function cw(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : bh.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(i[l][h]) && (i[l][h] = n[l][h]);
  }
}
function as(r) {
  if (Jt(r)) {
    var t = r.length;
    if (Jt(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(bh.call(r[i]));
      return e;
    }
    return bh.call(r);
  }
  return r;
}
function os(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function fw(r) {
  return Jt(r && r[0]) ? 2 : 1;
}
var wo = 0, ss = 1, My = 2, da = 3, wh = 4, Sh = 5, fv = 6;
function vv(r) {
  return r === wh || r === Sh;
}
function So(r) {
  return r === ss || r === My;
}
var Zn = [0, 0, 0, 0], vw = function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = fv, l = e;
    if (Jt(e)) {
      var u = fw(e);
      s = u, (u === 1 && !yt(e[0]) || u === 2 && !yt(e[0][0])) && (o = !0);
    } else if (yt(e) && !Ts(e))
      s = wo;
    else if (H(e))
      if (!isNaN(+e))
        s = wo;
      else {
        var h = _e(e);
        h && (l = h, s = da);
      }
    else if (rl(e)) {
      var c = N({}, l);
      c.colorStops = U(e.colorStops, function(f) {
        return {
          offset: f.offset,
          color: _e(f.color)
        };
      }), sw(e) ? s = wh : lw(e) && (s = Sh), l = c;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === fv) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = q(i) ? i : Sa[i] || xy(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = So(n), u = vv(n), h = 0; h < a; h++) {
      var c = i[h], v = c.value, f = o.value;
      c.percent = c.time / t, s || (l && h !== a - 1 ? cw(v, f, n) : u && hw(v.colorStops, f.colorStops));
    }
    if (!s && n !== Sh && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var d = i[0].value, h = 0; h < a; h++)
        n === wo ? i[h].additiveValue = i[h].value - d : n === da ? i[h].additiveValue = bo([], i[h].value, d, -1) : So(n) && (i[h].additiveValue = n === ss ? bo([], i[h].value, d, -1) : cv([], i[h].value, d, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === da, h, c = this._lastFr, v = Math.min, f, d;
      if (s === 1)
        f = d = o[0];
      else {
        if (e < 0)
          h = 0;
        else if (e < this._lastFrP) {
          var g = v(c + 1, s - 1);
          for (h = g; h >= 0 && !(o[h].percent <= e); h--)
            ;
          h = v(h, s - 2);
        } else {
          for (h = c; h < s && !(o[h].percent > e); h++)
            ;
          h = v(h - 1, s - 2);
        }
        d = o[h + 1], f = o[h];
      }
      if (f && d) {
        this._lastFr = h, this._lastFrP = e;
        var p = d.percent - f.percent, y = p === 0 ? 1 : v((e - f.percent) / p, 1);
        d.easingFunc && (y = d.easingFunc(y));
        var m = i ? this._additiveValue : u ? Zn : t[l];
        if ((So(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? f.rawValue : d.rawValue;
        else if (So(a))
          a === ss ? Kl(m, f[n], d[n], y) : uw(m, f[n], d[n], y);
        else if (vv(a)) {
          var _ = f[n], b = d[n], S = a === wh;
          t[l] = {
            type: S ? "linear" : "radial",
            x: or(_.x, b.x, y),
            y: or(_.y, b.y, y),
            colorStops: U(_.colorStops, function(x, M) {
              var D = b.colorStops[M];
              return {
                offset: or(x.offset, D.offset, y),
                color: os(Kl([], x.color, D.color, y))
              };
            }),
            global: b.global
          }, S ? (t[l].x2 = or(_.x2, b.x2, y), t[l].y2 = or(_.y2, b.y2, y)) : t[l].r = or(_.r, b.r, y);
        } else if (u)
          Kl(m, f[n], d[n], y), i || (t[l] = os(m));
        else {
          var w = or(f[n], d[n], y);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === wo ? t[i] = t[i] + n : e === da ? (_e(t[i], Zn), bo(Zn, Zn, n, 1), t[i] = os(Zn)) : e === ss ? bo(t[i], t[i], n, 1) : e === My && cv(t[i], t[i], n, 1);
  }, r;
}(), Ec = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      Ic("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, e, gt(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new vw(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var c = h.keyframes, v = c[c.length - 1];
          u = v && v.value, h.valType === da && u && (u = os(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, as(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, as(e[s]), n);
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
            var c = u[h - 1];
            c && (e._target[s.propName] = c.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new ew({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(f) {
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
              i[p].step(e._target, f);
            var y = e._onframeCbs;
            if (y)
              for (var p = 0; p < y.length; p++)
                y[p](e._target, f);
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
          l && (t[a] = as(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || gt(t);
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
function fn() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var dw = function(r) {
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
    for (var i = fn() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (Cs(i), !e._paused && e.update());
    }
    Cs(i);
  }, t.prototype.start = function() {
    this._running || (this._time = fn(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = fn(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += fn() - this._pauseStart, this._paused = !1);
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
    var n = new Ec(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(tr), pw = 300, Ql = Y.domSupported, jl = function() {
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
}(), dv = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, pv = !1;
function xh(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function gw(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function Jl(r) {
  r && (r.zrByTouch = !0);
}
function yw(r, t) {
  return ce(r.dom, new mw(r, t), !0);
}
function Dy(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var mw = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), Ae = {
  mousedown: function(r) {
    r = ce(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = ce(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = ce(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = ce(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    Dy(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    pv = !0, r = ce(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    pv || (r = ce(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = ce(this.dom, r), Jl(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), Ae.mousemove.call(this, r), Ae.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = ce(this.dom, r), Jl(r), this.handler.processGesture(r, "change"), Ae.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = ce(this.dom, r), Jl(r), this.handler.processGesture(r, "end"), Ae.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < pw && Ae.click.call(this, r);
  },
  pointerdown: function(r) {
    Ae.mousedown.call(this, r);
  },
  pointermove: function(r) {
    xh(r) || Ae.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Ae.mouseup.call(this, r);
  },
  pointerout: function(r) {
    xh(r) || Ae.mouseout.call(this, r);
  }
};
C(["click", "dblclick", "contextmenu"], function(r) {
  Ae[r] = function(t) {
    t = ce(this.dom, t), this.trigger(r, t);
  };
});
var Th = {
  pointermove: function(r) {
    xh(r) || Th.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Th.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function _w(r, t) {
  var e = t.domHandlers;
  Y.pointerEventsSupported ? C(jl.pointer, function(i) {
    ls(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (Y.touchEventsSupported && C(jl.touch, function(i) {
    ls(t, i, function(n) {
      e[i].call(r, n), gw(t);
    });
  }), C(jl.mouse, function(i) {
    ls(t, i, function(n) {
      n = Pc(n), t.touching || e[i].call(r, n);
    });
  }));
}
function bw(r, t) {
  Y.pointerEventsSupported ? C(dv.pointer, e) : Y.touchEventsSupported || C(dv.mouse, e);
  function e(i) {
    function n(a) {
      a = Pc(a), Dy(r, a.target) || (a = yw(r, a), t.domHandlers[i].call(r, a));
    }
    ls(t, i, n, { capture: !0 });
  }
}
function ls(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, O1(r.domTarget, t, e, i);
}
function tu(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && E1(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var gv = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), ww = function(r) {
  B(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new gv(e, Ae), Ql && (n._globalHandlerScope = new gv(document, Th)), _w(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    tu(this._localHandlerScope), Ql && tu(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, Ql && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? bw(this, i) : tu(i);
    }
  }, t;
}(tr), Ay = 1;
Y.hasGlobalWindow && (Ay = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Ps = Ay, Ch = 0.4, Mh = "#333", Dh = "#ccc", Sw = "#eee", yv = $c, mv = 5e-5;
function ti(r) {
  return r > mv || r < -mv;
}
var ei = [], Ui = [], eu = gn(), ru = Math.abs, kc = function() {
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
    return ti(this.rotation) || ti(this.x) || ti(this.y) || ti(this.scaleX - 1) || ti(this.scaleY - 1) || ti(this.skewX) || ti(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (yv(i), this.invTransform = null);
      return;
    }
    i = i || gn(), e ? this.getLocalTransform(i) : yv(i), t && (e ? yn(i, t, i) : B1(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(ei);
      var i = ei[0] < 0 ? -1 : 1, n = ei[1] < 0 ? -1 : 1, a = ((ei[0] - i) * e + i) / ei[0] || 0, o = ((ei[1] - n) * e + n) / ei[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || gn(), Oc(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || gn(), yn(Ui, t.invTransform, e), e = Ui);
      var i = this.originX, n = this.originY;
      (i || n) && (eu[4] = i, eu[5] = n, yn(Ui, e, eu), Ui[4] -= i, Ui[5] -= n, e = Ui), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && me(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && me(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && ru(t[0] - 1) > 1e-10 && ru(t[3] - 1) > 1e-10 ? Math.sqrt(ru(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    xw(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, c = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, f = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, g = n + l;
      e[4] = -d * a - v * g * o, e[5] = -g * o - f * d * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = f * a, e[2] = v * o, u && Rc(e, e, u), e[4] += i + h, e[5] += n + c, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), Fa = [
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
function xw(r, t) {
  for (var e = 0; e < Fa.length; e++) {
    var i = Fa[e];
    r[i] = t[i];
  }
}
var _v = {};
function oe(r, t) {
  t = t || Li;
  var e = _v[t];
  e || (e = _v[t] = new no(500));
  var i = e.get(r);
  return i == null && (i = Wr.measureText(r, t).width, e.put(r, i)), i;
}
function bv(r, t, e, i) {
  var n = oe(r, t), a = Bc(t), o = pa(0, n, e), s = un(0, a, i), l = new lt(o, s, n, a);
  return l;
}
function Nc(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return bv(n[0], t, e, i);
  for (var o = new lt(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = bv(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function pa(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function un(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Bc(r) {
  return oe("国", r);
}
function qe(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function $s(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, h = "left", c = "top";
  if (i instanceof Array)
    l += qe(i[0], e.width), u += qe(i[1], e.height), h = null, c = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, h = "right", c = "middle";
        break;
      case "right":
        l += n + o, u += s, c = "middle";
        break;
      case "top":
        l += o / 2, u -= n, h = "center", c = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, h = "center";
        break;
      case "inside":
        l += o / 2, u += s, h = "center", c = "middle";
        break;
      case "insideLeft":
        l += n, u += s, c = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, h = "right", c = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, h = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, h = "center", c = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, h = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, c = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, h = "right", c = "bottom";
        break;
    }
  return r = r || {}, r.x = l, r.y = u, r.align = h, r.verticalAlign = c, r;
}
var iu = "__zr_normal__", nu = Fa.concat(["ignore"]), Tw = Nn(Fa, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), Yi = {}, Cw = new lt(0, 0, 0, 0), nl = function() {
  function r(t) {
    this.id = uy(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = Cw;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), n || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(Yi, i, h) : $s(Yi, i, h), a.x = Yi.x, a.y = Yi.y, o = Yi.align, s = Yi.verticalAlign;
        var c = i.origin;
        if (c && i.rotation != null) {
          var v = void 0, f = void 0;
          c === "center" ? (v = h.width * 0.5, f = h.height * 0.5) : (v = qe(c[0], h.width), f = qe(c[1], h.height)), u = !0, a.originX = -a.x + v + (n ? 0 : h.x), a.originY = -a.y + f + (n ? 0 : h.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      g && this.canBeInsideText() ? (y = i.insideFill, m = i.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = i.outsideFill, m = i.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== p.fill || m !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = y, p.stroke = m, p.autoStroke = _, p.align = o, p.verticalAlign = s, e.setDefaultTextStyle(p)), e.__dirty |= ae, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Dh : Mh;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && _e(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, cr(i, "rgba");
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
    else if (V(t))
      for (var i = t, n = gt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== iu)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, nu);
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
    this.useState(iu, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === iu, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(vt(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Ic("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var c = this._textContent, v = this._textGuide;
        return c && c.useState(t, e, i, h), v && v.useState(t, e, i, h), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ae), u;
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
      var c = n[o - 1], v = !!(c && c.hoverLayer || i);
      v && this._toggleHoverLayerFlag(!0);
      var f = this._mergeStates(n), d = this.stateTransition;
      this.saveCurrentToNormalState(f), this._applyStateObj(t.join(","), f, this._normalState, !1, !e && !this.__inHover && d && d.duration > 0, d);
      var g = this._textContent, p = this._textGuide;
      g && g.useStates(t, e, v), p && p.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ae);
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
    var e = vt(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = vt(n, t), o = vt(n, e) >= 0;
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
    for (var l = {}, u = !1, h = 0; h < nu.length; h++) {
      var c = nu[h], v = a && Tw[c];
      e && e[c] != null ? v ? (u = !0, l[c] = e[c]) : this[c] = e[c] : s && i[c] != null && (v ? (u = !0, l[c] = i[c]) : this[c] = i[c]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var f = this.animators[h], d = f.targetName;
        f.getLoop() || f.__changeFinalValue(d ? (e || i)[d] : e || i);
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new kc(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= ae;
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
    var n = t ? this[t] : this, a = new Ec(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = vt(a, t);
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
    au(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    au(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = au(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = ae;
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
Je(nl, tr);
Je(nl, kc);
function au(r, t, e, i, n) {
  e = e || {};
  var a = [];
  Iy(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, c = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(d, g) {
    e.during(g);
  });
  for (var v = 0; v < a.length; v++) {
    var f = a[v];
    h && f.done(h), c && f.aborted(c), e.force && f.duration(e.duration), f.start(e.easing);
  }
  return a;
}
function ou(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function Mw(r) {
  return Jt(r[0]);
}
function Dw(r, t, e) {
  if (Jt(t[e]))
    if (Jt(r[e]) || (r[e] = []), te(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), ou(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (Mw(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? ou(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        ou(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function Aw(r, t) {
  return r === t || Jt(r) && Jt(t) && Iw(r, t);
}
function Iw(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function Iy(r, t, e, i, n, a, o, s) {
  for (var l = gt(i), u = n.duration, h = n.delay, c = n.additive, v = n.setToFinal, f = !V(a), d = r.animators, g = [], p = 0; p < l.length; p++) {
    var y = l[p], m = i[y];
    if (m != null && e[y] != null && (f || a[y]))
      if (V(m) && !Jt(m) && !rl(m)) {
        if (t) {
          s || (e[y] = m, r.updateDuringAnimation(t));
          continue;
        }
        Iy(r, y, e[y], m, n, a && a[y], o, s);
      } else
        g.push(y);
    else s || (e[y] = m, r.updateDuringAnimation(t), g.push(y));
  }
  var _ = g.length;
  if (!c && _)
    for (var b = 0; b < d.length; b++) {
      var S = d[b];
      if (S.targetName === t) {
        var w = S.stopTracks(g);
        if (w) {
          var x = vt(d, S);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (g = Pt(g, function(T) {
    return !Aw(i[T], e[T]);
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
        A[y] = as(e[y]), Dw(e, i, y);
      }
    }
    var S = new Ec(e, !1, !1, c ? Pt(d, function(I) {
      return I.targetName === t;
    }) : null);
    S.targetName = t, n.scope && (S.scope = n.scope), v && M && S.whenWithKeys(0, M, g), A && S.whenWithKeys(0, A, g), S.whenWithKeys(u ?? 500, s ? D : i, g).delay(h || 0), r.addAnimator(S, t), o.push(S);
  }
}
var Ct = function(r) {
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
    var n = vt(this._children, e);
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
    var i = this.__zr, n = this._children, a = vt(n, e);
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
    for (var i = new lt(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (lt.applyTransform(i, u, h), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(nl);
Ct.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var us = {}, Ly = {};
function Lw(r) {
  delete Ly[r];
}
function Pw(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return Ls(r, 1) < Ch;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += Ls(t[n].color, 1);
    return e /= i, e < Ch;
  }
  return !1;
}
var $w = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new q1(), o = i.renderer || "canvas";
    us[o] || (o = gt(us)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new us[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !Y.node && !Y.worker && !l ? new ww(s.getViewportRoot(), s.root) : null, h = i.useCoarsePointer, c = h == null || h === "auto" ? Y.touchEventsSupported : !!h, v = 44, f;
    c && (f = tt(i.pointerSize, v)), this.handler = new gy(a, s, u, s.root, f), this.animation = new dw({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = Pw(t));
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
    var e, i = fn();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = fn();
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
        t[e] instanceof Ct && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Lw(this.id));
  }, r;
}();
function wv(r, t) {
  var e = new $w(uy(), r, t);
  return Ly[e.id] = e, e;
}
function Rw(r, t) {
  us[r] = t;
}
var Sv = 1e-4, Py = 20;
function Ow(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function vr(r, t, e, i) {
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
  return H(r) ? Ow(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function Mt(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Py), r = (+r).toFixed(t), e ? r : +r;
}
function $y(r) {
  return r.sort(function(t, e) {
    return t - e;
  }), r;
}
function sr(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return Ew(r);
}
function Ew(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function kw(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function Nw(r, t) {
  var e = Math.max(sr(r), sr(t)), i = r + t;
  return e > Py ? i : Mt(i, e);
}
function Ry(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function Rs(r) {
  return r > -Sv && r < Sv;
}
var Bw = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function dr(r) {
  if (r instanceof Date)
    return r;
  if (H(r)) {
    var t = Bw.exec(r);
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
function zw(r) {
  return Math.pow(10, zc(r));
}
function zc(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function Oy(r, t) {
  var e = zc(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function xv(r) {
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
function Os(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !H(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function Fw(r) {
  return !isNaN(Os(r));
}
function Ey() {
  return Math.round(Math.random() * 9);
}
function ky(r, t) {
  return t === 0 ? r : ky(t, r % t);
}
function Tv(r, t) {
  return r == null ? t : t == null ? r : r * t / ky(r, t);
}
function Qt(r) {
  throw new Error(r);
}
function Cv(r, t, e) {
  return (t - r) * e + r;
}
var Ny = "series\0", Hw = "\0_ec_\0";
function Rt(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function Mv(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var Dv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function ao(r) {
  return V(r) && !z(r) && !(r instanceof Date) ? r.value : r;
}
function Vw(r) {
  return V(r) && !(r instanceof Array);
}
function Gw(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = j();
  C(t, function(l, u) {
    if (!V(l)) {
      t[u] = null;
      return;
    }
  });
  var s = Ww(r, o, e);
  return (i || n) && Uw(s, r, o, t), i && Yw(s, t), i || n ? Xw(s, t, n) : a && qw(s, t), Zw(s), s;
}
function Ww(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Ha(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function Uw(r, t, e, i) {
  C(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = xa(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        Xe(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function Yw(r, t) {
  C(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Ha(e) && !Ha(a) && By("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function Xw(r, t, e) {
  C(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Ha(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !By("id", i, n.existing));
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
function qw(r, t) {
  C(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function Zw(r) {
  var t = j();
  C(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), C(r, function(e) {
    var i = e.newOption;
    Xe(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), C(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (V(a)) {
      if (o.name = a.name != null ? xa(a.name) : n ? n.name : Ny + i, n)
        o.id = xa(n.id);
      else if (a.id != null)
        o.id = xa(a.id);
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
function By(r, t, e) {
  var i = $e(t[r], null), n = $e(e[r], null);
  return i != null && n != null && i === n;
}
function xa(r) {
  return $e(r, "");
}
function $e(r, t) {
  return r == null ? t : H(r) ? r : yt(r) || ch(r) ? r + "" : t;
}
function Fc(r) {
  var t = r.name;
  return !!(t && t.indexOf(Ny));
}
function Ha(r) {
  return r && r.id != null && xa(r.id).indexOf(Hw) === 0;
}
function Kw(r, t, e) {
  C(r, function(i) {
    var n = i.newOption;
    V(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = Qw(t, n, i.existing, e));
  });
}
function Qw(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function jw(r, t) {
  var e = {}, i = {};
  return n(r || [], e), n(t || [], i, e), [a(e), a(i)];
  function n(o, s, l) {
    for (var u = 0, h = o.length; u < h; u++) {
      var c = $e(o[u].seriesId, null);
      if (c == null)
        return;
      for (var v = Rt(o[u].dataIndex), f = l && l[c], d = 0, g = v.length; d < g; d++) {
        var p = v[d];
        f && f[p] ? f[p] = null : (s[c] || (s[c] = {}))[p] = 1;
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
function $i(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return z(t.dataIndex) ? U(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return z(t.name) ? U(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function It() {
  var r = "__ec_inner_" + Jw++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var Jw = Ey();
function su(r, t, e) {
  var i = Hc(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, h) {
    var c = oo(r, h, u, {
      useDefault: l === h,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[h + "Models"] = c.models, s[h + "Model"] = c.models[0];
  }), s;
}
function Hc(r, t) {
  var e;
  if (H(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = j(), a = {}, o = !1;
  return C(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], h = u[1], c = (u[2] || "").toLowerCase();
    if (!(!h || !c || t && t.includeMainTypes && vt(t.includeMainTypes, h) < 0)) {
      o = o || !!h;
      var v = n.get(h) || n.set(h, {});
      v[c] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var Le = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function oo(r, t, e, i) {
  i = i || Le;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (Xe(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (Xe(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function zy(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function tS(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function eS(r) {
  return r === "auto" ? Y.domSupported ? "html" : "richText" : r || "html";
}
function rS(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (yt(i)) {
    var o = Cv(e || 0, i, n);
    return Mt(o, a ? Math.max(sr(e || 0), sr(i)) : t);
  } else {
    if (H(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, h = Math.max(l ? l.length : 0, u.length), c = 0; c < h; ++c) {
      var v = r.getDimensionInfo(c);
      if (v && v.type === "ordinal")
        s[c] = (n < 1 && l ? l : u)[c];
      else {
        var f = l && l[c] ? l[c] : 0, d = u[c], o = Cv(f, d, n);
        s[c] = Mt(o, a ? Math.max(sr(f), sr(d)) : t);
      }
    }
    return s;
  }
}
var iS = ".", ri = "___EC__COMPONENT__CONTAINER___", Fy = "___EC__EXTENDED_CLASS___";
function Ue(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(iS);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function nS(r) {
  Xe(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function aS(r) {
  return !!(r && r[Fy]);
}
function Vc(r, t) {
  r.$constructor = r, r.extend = function(e) {
    var i = this, n;
    return oS(i) ? n = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, u1(n, this)), N(n.prototype, e), n[Fy] = !0, n.extend = this.extend, n.superCall = uS, n.superApply = hS, n.superClass = i, n;
  };
}
function oS(r) {
  return q(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function Hy(r, t) {
  r.extend = t.extend;
}
var sS = Math.round(Math.random() * 10);
function lS(r) {
  var t = ["__\0is_clz", sS++].join("_");
  r.prototype[t] = !0, r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function uS(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function hS(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function al(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      nS(n), i.prototype.type = n;
      var a = Ue(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== ri) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[ri] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Ue(i), a = [], o = t[n.main];
    return o && o[ri] ? C(o, function(s, l) {
      l !== ri && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Ue(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return C(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Ue(i), a = t[n.main];
    return a && a[ri];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[ri]) && (n = t[i.main] = {}, n[ri] = !0), n;
  }
}
function Va(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && vt(n, l) >= 0 || a && vt(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var cS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], fS = Va(cS), vS = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return fS(this, t, e);
    }, r;
  }()
), Ah = new no(50);
function dS(r) {
  if (typeof r == "string") {
    var t = Ah.get(r);
    return t && t.image;
  } else
    return r;
}
function Vy(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = Ah.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !ol(t) && a.pending.push(o)) : (t = Wr.loadImage(r, Av, Av), t.__zrImageSrc = r, Ah.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function Av() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function ol(r) {
  return r && r.width && r.height;
}
var lu = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function pS(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Gy(e, i, n, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    Wy(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function Gy(r, t, e, i) {
  i = i || {};
  var n = N({}, i);
  n.font = t, e = tt(e, "..."), n.maxIterations = tt(i.maxIterations, 2);
  var a = n.minChar = tt(i.minChar, 0);
  n.cnCharWidth = oe("国", t);
  var o = n.ascCharWidth = oe("a", t);
  n.placeholder = tt(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = oe(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function Wy(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = oe(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? gS(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = oe(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function gS(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function yS(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Bc(n), s = tt(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, c = t.width, v;
  c != null && (e === "break" || e === "breakAll") ? v = r ? Uy(r, t.font, c, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var f = v.length * s, d = tt(t.height, f);
  if (f > d && u) {
    var g = Math.floor(d / s);
    h = h || v.length > g, v = v.slice(0, g);
  }
  if (r && a && c != null)
    for (var p = Gy(c, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < v.length; m++)
      Wy(y, v[m], p), v[m] = y.textLine, h = h || y.isTruncated;
  for (var _ = d, b = 0, m = 0; m < v.length; m++)
    b = Math.max(oe(v[m], n), b);
  c == null && (c = b);
  var S = b;
  return i && (_ += i[0] + i[2], S += i[1] + i[3], c += i[1] + i[3]), l && (S = c), {
    lines: v,
    height: d,
    outerWidth: S,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: b,
    contentHeight: f,
    width: c,
    isTruncated: h
  };
}
var mS = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), Iv = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), _S = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
}();
function bS(r, t) {
  var e = new _S();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = lu.lastIndex = 0, l; (l = lu.exec(r)) != null; ) {
    var u = l.index;
    u > s && uu(e, r.substring(s, u), t, o), uu(e, l[2], t, o, l[1]), s = lu.lastIndex;
  }
  s < r.length && uu(e, r.substring(s, r.length), t, o);
  var h = [], c = 0, v = 0, f = t.padding, d = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function y(W, Q, et) {
    W.width = Q, W.lineHeight = et, c += et, v = Math.max(v, Q);
  }
  t: for (var m = 0; m < e.lines.length; m++) {
    for (var _ = e.lines[m], b = 0, S = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], M = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = M.padding, A = D ? D[1] + D[3] : 0, T = x.font = M.font || t.font;
      x.contentHeight = Bc(T);
      var I = tt(M.height, x.contentHeight);
      if (x.innerHeight = I, D && (I += D[0] + D[2]), x.height = I, x.lineHeight = is(M.lineHeight, t.lineHeight, I), x.align = M && M.align || t.align, x.verticalAlign = M && M.verticalAlign || "middle", g && n != null && c + x.lineHeight > n) {
        var P = e.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, S, b), e.lines = e.lines.slice(0, m + 1)) : e.lines = e.lines.slice(0, m), e.isTruncated = e.isTruncated || e.lines.length < P;
        break t;
      }
      var $ = M.width, R = $ == null || $ === "auto";
      if (typeof $ == "string" && $.charAt($.length - 1) === "%")
        x.percentWidth = $, h.push(x), x.contentWidth = oe(x.text, T);
      else {
        if (R) {
          var O = M.backgroundColor, G = O && O.image;
          G && (G = dS(G), ol(G) && (x.width = Math.max(x.width, G.width * I / G.height)));
        }
        var E = d && i != null ? i - S : null;
        E != null && E < x.width ? !R || E < A ? (x.text = "", x.width = x.contentWidth = 0) : (pS(p, x.text, E - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, e.isTruncated = e.isTruncated || p.isTruncated, x.width = x.contentWidth = oe(x.text, T)) : x.contentWidth = oe(x.text, T);
      }
      x.width += A, S += x.width, M && (b = Math.max(b, x.lineHeight));
    }
    y(_, S, b);
  }
  e.outerWidth = e.width = tt(i, v), e.outerHeight = e.height = tt(n, c), e.contentHeight = c, e.contentWidth = v, f && (e.outerWidth += f[1] + f[3], e.outerHeight += f[0] + f[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * e.width;
  }
  return e;
}
function uu(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, h, c;
  if (i) {
    var v = o.padding, f = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = qe(o.width, i.width) + f;
      s.length > 0 && d + i.accumWidth > i.width && (h = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var g = Uy(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + f, c = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var y = h[p], m = new mS();
    if (m.styleName = n, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = c ? c[p] : oe(y, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Iv())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new Iv([m]));
  }
}
function wS(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var SS = Nn(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function xS(r) {
  return wS(r) ? !!SS[r] : !0;
}
function Uy(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, c = 0; c < r.length; c++) {
    var v = r.charAt(c);
    if (v === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var f = oe(v, t), d = i ? !1 : !xS(v);
    if (a.length ? h + f > e : n + h + f > e) {
      h ? (s || l) && (d ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += v, u += f, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = v, h = f)) : d ? (a.push(l), o.push(u), l = v, u = f) : (a.push(v), o.push(f));
      continue;
    }
    h += f, d ? (l += v, u += f) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += n), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var Ih = "__zr_style_" + Math.round(Math.random() * 10), Mi = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, sl = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Mi[Ih] = !0;
var Lv = ["z", "z2", "invisible"], TS = ["invisible"], so = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = gt(e), n = 0; n < i.length; n++) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && CS(this, e, i) || o && !o[0] && !o[3])
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
      e = this._paintRect || (this._paintRect = new lt(0, 0, 0, 0)), i ? lt.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new lt(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
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
    e || this.markRedraw(), this.__dirty |= va, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & va);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~va;
  }, t.prototype.createStyle = function(e) {
    return il(Mi, e);
  }, t.prototype.useStyle = function(e) {
    e[Ih] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Ih];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, Lv);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var c = gt(h), v = 0; v < c.length; v++) {
            var f = c[v];
            f in u && (u[f] = u[f], this.style[f] = h[f]);
          }
        for (var d = gt(u), v = 0; v < d.length; v++) {
          var f = d[v];
          this.style[f] = this.style[f];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? TS : Lv, v = 0; v < g.length; v++) {
      var f = g[v];
      i && i[f] != null ? this[f] = i[f] : l && n[f] != null && (this[f] = n[f]);
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
    return sl;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = ae | va;
  }(), t;
}(nl), hu = new lt(0, 0, 0, 0), cu = new lt(0, 0, 0, 0);
function CS(r, t, e) {
  return hu.copy(r.getBoundingRect()), r.transform && hu.applyTransform(r.transform), cu.width = t, cu.height = e, !hu.intersect(cu);
}
var pe = Math.min, ge = Math.max, fu = Math.sin, vu = Math.cos, ii = Math.PI * 2, xo = Bn(), To = Bn(), Co = Bn();
function Pv(r, t, e, i, n, a) {
  n[0] = pe(r, e), n[1] = pe(t, i), a[0] = ge(r, e), a[1] = ge(t, i);
}
var $v = [], Rv = [];
function MS(r, t, e, i, n, a, o, s, l, u) {
  var h = wy, c = $t, v = h(r, e, n, o, $v);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var f = 0; f < v; f++) {
    var d = c(r, e, n, o, $v[f]);
    l[0] = pe(d, l[0]), u[0] = ge(d, u[0]);
  }
  v = h(t, i, a, s, Rv);
  for (var f = 0; f < v; f++) {
    var g = c(t, i, a, s, Rv[f]);
    l[1] = pe(g, l[1]), u[1] = ge(g, u[1]);
  }
  l[0] = pe(r, l[0]), u[0] = ge(r, u[0]), l[0] = pe(o, l[0]), u[0] = ge(o, u[0]), l[1] = pe(t, l[1]), u[1] = ge(t, u[1]), l[1] = pe(s, l[1]), u[1] = ge(s, u[1]);
}
function DS(r, t, e, i, n, a, o, s) {
  var l = Sy, u = Kt, h = ge(pe(l(r, e, n), 1), 0), c = ge(pe(l(t, i, a), 1), 0), v = u(r, e, n, h), f = u(t, i, a, c);
  o[0] = pe(r, n, v), o[1] = pe(t, a, f), s[0] = ge(r, n, v), s[1] = ge(t, a, f);
}
function AS(r, t, e, i, n, a, o, s, l) {
  var u = hn, h = cn, c = Math.abs(n - a);
  if (c % ii < 1e-4 && c > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (xo[0] = vu(n) * e + r, xo[1] = fu(n) * i + t, To[0] = vu(a) * e + r, To[1] = fu(a) * i + t, u(s, xo, To), h(l, xo, To), n = n % ii, n < 0 && (n = n + ii), a = a % ii, a < 0 && (a = a + ii), n > a && !o ? a += ii : n < a && o && (n += ii), o) {
    var v = a;
    a = n, n = v;
  }
  for (var f = 0; f < a; f += Math.PI / 2)
    f > n && (Co[0] = vu(f) * e + r, Co[1] = fu(f) * i + t, u(s, Co, s), h(l, Co, l));
}
var st = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, ni = [], ai = [], Be = [], Cr = [], ze = [], Fe = [], du = Math.min, pu = Math.max, oi = Math.cos, si = Math.sin, nr = Math.abs, Lh = Math.PI, Or = Lh * 2, gu = typeof Float32Array < "u", Kn = [];
function yu(r) {
  var t = Math.round(r / Lh * 1e8) / 1e8;
  return t % 2 * Lh;
}
function IS(r, t) {
  var e = yu(r[0]);
  e < 0 && (e += Or);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= Or ? n = e + Or : t && e - n >= Or ? n = e - Or : !t && e > n ? n = e + (Or - yu(e - n)) : t && e < n && (n = e - (Or - yu(n - e))), r[0] = e, r[1] = n;
}
var Ri = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = nr(i / Ps / t) || 0, this._uy = nr(i / Ps / e) || 0);
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
    return this._drawPendingPt(), this.addData(st.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = nr(t - this._xi), n = nr(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(st.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(st.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(st.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), Kn[0] = n, Kn[1] = a, IS(Kn, o), n = Kn[0], a = Kn[1];
    var s = a - n;
    return this.addData(st.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = oi(a) * i + t, this._yi = si(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(st.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(st.Z);
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
    !(this.data && this.data.length === e) && gu && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    gu && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var h = this.data;
      this._len + arguments.length > h.length && (this._expandData(), h = this.data);
      for (var c = 0; c < arguments.length; c++)
        h[this._len++] = arguments[c];
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
      t instanceof Array && (t.length = this._len, gu && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    Be[0] = Be[1] = ze[0] = ze[1] = Number.MAX_VALUE, Cr[0] = Cr[1] = Fe[0] = Fe[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case st.M:
          e = n = t[o++], i = a = t[o++], ze[0] = n, ze[1] = a, Fe[0] = n, Fe[1] = a;
          break;
        case st.L:
          Pv(e, i, t[o], t[o + 1], ze, Fe), e = t[o++], i = t[o++];
          break;
        case st.C:
          MS(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], ze, Fe), e = t[o++], i = t[o++];
          break;
        case st.Q:
          DS(e, i, t[o++], t[o++], t[o], t[o + 1], ze, Fe), e = t[o++], i = t[o++];
          break;
        case st.A:
          var u = t[o++], h = t[o++], c = t[o++], v = t[o++], f = t[o++], d = t[o++] + f;
          o += 1;
          var g = !t[o++];
          l && (n = oi(f) * c + u, a = si(f) * v + h), AS(u, h, c, v, f, d, g, ze, Fe), e = oi(d) * c + u, i = si(d) * v + h;
          break;
        case st.R:
          n = e = t[o++], a = i = t[o++];
          var p = t[o++], y = t[o++];
          Pv(n, a, n + p, a + y, ze, Fe);
          break;
        case st.Z:
          e = n, i = a;
          break;
      }
      hn(Be, Be, ze), cn(Cr, Cr, Fe);
    }
    return o === 0 && (Be[0] = Be[1] = Cr[0] = Cr[1] = 0), new lt(Be[0], Be[1], Cr[0] - Be[0], Cr[1] - Be[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, c = 0, v = 0; v < e; ) {
      var f = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var g = -1;
      switch (f) {
        case st.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case st.L: {
          var p = t[v++], y = t[v++], m = p - a, _ = y - o;
          (nr(m) > i || nr(_) > n || v === e - 1) && (g = Math.sqrt(m * m + _ * _), a = p, o = y);
          break;
        }
        case st.C: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++], w = t[v++], x = t[v++];
          g = K1(a, o, b, S, p, y, w, x, 10), a = w, o = x;
          break;
        }
        case st.Q: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++];
          g = J1(a, o, b, S, p, y, 10), a = p, o = y;
          break;
        }
        case st.A:
          var M = t[v++], D = t[v++], A = t[v++], T = t[v++], I = t[v++], P = t[v++], $ = P + I;
          v += 1, d && (s = oi(I) * A + M, l = si(I) * T + D), g = pu(A, T) * du(Or, Math.abs(P)), a = oi($) * A + M, o = si($) * T + D;
          break;
        case st.R: {
          s = a = t[v++], l = o = t[v++];
          var R = t[v++], O = t[v++];
          g = R * 2 + O * 2;
          break;
        }
        case st.Z: {
          var m = s - a, _ = l - o;
          g = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[c++] = g, h += g);
    }
    return this._pathLen = h, h;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, h, c, v, f = e < 1, d, g, p = 0, y = 0, m, _ = 0, b, S;
    if (!(f && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, g = this._pathLen, m = e * g, !m)))
      t: for (var w = 0; w < o; ) {
        var x = i[w++], M = w === 1;
        switch (M && (u = i[w], h = i[w + 1], s = u, l = h), x !== st.L && _ > 0 && (t.lineTo(b, S), _ = 0), x) {
          case st.M:
            s = u = i[w++], l = h = i[w++], t.moveTo(u, h);
            break;
          case st.L: {
            c = i[w++], v = i[w++];
            var D = nr(c - u), A = nr(v - h);
            if (D > n || A > a) {
              if (f) {
                var T = d[y++];
                if (p + T > m) {
                  var I = (m - p) / T;
                  t.lineTo(u * (1 - I) + c * I, h * (1 - I) + v * I);
                  break t;
                }
                p += T;
              }
              t.lineTo(c, v), u = c, h = v, _ = 0;
            } else {
              var P = D * D + A * A;
              P > _ && (b = c, S = v, _ = P);
            }
            break;
          }
          case st.C: {
            var $ = i[w++], R = i[w++], O = i[w++], G = i[w++], E = i[w++], F = i[w++];
            if (f) {
              var T = d[y++];
              if (p + T > m) {
                var I = (m - p) / T;
                As(u, $, O, E, I, ni), As(h, R, G, F, I, ai), t.bezierCurveTo(ni[1], ai[1], ni[2], ai[2], ni[3], ai[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo($, R, O, G, E, F), u = E, h = F;
            break;
          }
          case st.Q: {
            var $ = i[w++], R = i[w++], O = i[w++], G = i[w++];
            if (f) {
              var T = d[y++];
              if (p + T > m) {
                var I = (m - p) / T;
                Is(u, $, O, I, ni), Is(h, R, G, I, ai), t.quadraticCurveTo(ni[1], ai[1], ni[2], ai[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo($, R, O, G), u = O, h = G;
            break;
          }
          case st.A:
            var W = i[w++], Q = i[w++], et = i[w++], ft = i[w++], mt = i[w++], St = i[w++], xe = i[w++], Xr = !i[w++], Vi = et > ft ? et : ft, ie = nr(et - ft) > 1e-3, Lt = mt + St, Z = !1;
            if (f) {
              var T = d[y++];
              p + T > m && (Lt = mt + St * (m - p) / T, Z = !0), p += T;
            }
            if (ie && t.ellipse ? t.ellipse(W, Q, et, ft, xe, mt, Lt, Xr) : t.arc(W, Q, Vi, mt, Lt, Xr), Z)
              break t;
            M && (s = oi(mt) * et + W, l = si(mt) * ft + Q), u = oi(Lt) * et + W, h = si(Lt) * ft + Q;
            break;
          case st.R:
            s = u = i[w], l = h = i[w + 1], c = i[w++], v = i[w++];
            var rt = i[w++], qr = i[w++];
            if (f) {
              var T = d[y++];
              if (p + T > m) {
                var zt = m - p;
                t.moveTo(c, v), t.lineTo(c + du(zt, rt), v), zt -= rt, zt > 0 && t.lineTo(c + rt, v + du(zt, qr)), zt -= qr, zt > 0 && t.lineTo(c + pu(rt - zt, 0), v + qr), zt -= rt, zt > 0 && t.lineTo(c, v + pu(qr - zt, 0));
                break t;
              }
              p += T;
            }
            t.rect(c, v, rt, qr);
            break;
          case st.Z:
            if (f) {
              var T = d[y++];
              if (p + T > m) {
                var I = (m - p) / T;
                t.lineTo(u * (1 - I) + s * I, h * (1 - I) + l * I);
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
  }, r.CMD = st, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function Xi(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    l = (t - i) / (r - e), u = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var h = l * a - o + u, c = h * h / (l * l + 1);
  return c <= s / 2 * s / 2;
}
function LS(r, t, e, i, n, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var c = l;
  if (h > t + c && h > i + c && h > a + c && h > s + c || h < t - c && h < i - c && h < a - c && h < s - c || u > r + c && u > e + c && u > n + c && u > o + c || u < r - c && u < e - c && u < n - c && u < o - c)
    return !1;
  var v = Z1(r, t, e, i, n, a, o, s, u, h);
  return v <= c / 2;
}
function PS(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var h = j1(r, t, e, i, n, a, s, l);
  return h <= u / 2;
}
var Ov = Math.PI * 2;
function Mo(r) {
  return r %= Ov, r < 0 && (r += Ov), r;
}
var Qn = Math.PI * 2;
function $S(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > e || h + u < e)
    return !1;
  if (Math.abs(i - n) % Qn < 1e-4)
    return !0;
  if (a) {
    var c = i;
    i = Mo(n), n = Mo(c);
  } else
    i = Mo(i), n = Mo(n);
  i > n && (n += Qn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += Qn), v >= i && v <= n || v + Qn >= i && v + Qn <= n;
}
function li(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var Mr = Ri.CMD, ui = Math.PI * 2, RS = 1e-4;
function OS(r, t) {
  return Math.abs(r - t) < RS;
}
var Ht = [-1, -1, -1], ve = [-1, -1];
function ES() {
  var r = ve[0];
  ve[0] = ve[1], ve[1] = r;
}
function kS(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var h = Ds(t, i, a, s, u, Ht);
  if (h === 0)
    return 0;
  for (var c = 0, v = -1, f = void 0, d = void 0, g = 0; g < h; g++) {
    var p = Ht[g], y = p === 0 || p === 1 ? 0.5 : 1, m = $t(r, e, n, o, p);
    m < l || (v < 0 && (v = wy(t, i, a, s, ve), ve[1] < ve[0] && v > 1 && ES(), f = $t(t, i, a, s, ve[0]), v > 1 && (d = $t(t, i, a, s, ve[1]))), v === 2 ? p < ve[0] ? c += f < t ? y : -y : p < ve[1] ? c += d < f ? y : -y : c += s < d ? y : -y : p < ve[0] ? c += f < t ? y : -y : c += s < f ? y : -y);
  }
  return c;
}
function NS(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = Q1(t, i, a, s, Ht);
  if (l === 0)
    return 0;
  var u = Sy(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, c = Kt(t, i, a, u), v = 0; v < l; v++) {
      var f = Ht[v] === 0 || Ht[v] === 1 ? 0.5 : 1, d = Kt(r, e, n, Ht[v]);
      d < o || (Ht[v] < u ? h += c < t ? f : -f : h += a < c ? f : -f);
    }
    return h;
  } else {
    var f = Ht[0] === 0 || Ht[0] === 1 ? 0.5 : 1, d = Kt(r, e, n, Ht[0]);
    return d < o ? 0 : a < t ? f : -f;
  }
}
function BS(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  Ht[0] = -l, Ht[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= ui - 1e-4) {
    i = 0, n = ui;
    var h = a ? 1 : -1;
    return o >= Ht[0] + r && o <= Ht[1] + r ? h : 0;
  }
  if (i > n) {
    var c = i;
    i = n, n = c;
  }
  i < 0 && (i += ui, n += ui);
  for (var v = 0, f = 0; f < 2; f++) {
    var d = Ht[f];
    if (d + r > o) {
      var g = Math.atan2(s, d), h = a ? 1 : -1;
      g < 0 && (g = ui + g), (g >= i && g <= n || g + ui >= i && g + ui <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), v += h);
    }
  }
  return v;
}
function Yy(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, h = 0, c = 0, v, f, d = 0; d < o; ) {
    var g = a[d++], p = d === 1;
    switch (g === Mr.M && d > 1 && (e || (s += li(l, u, h, c, i, n))), p && (l = a[d], u = a[d + 1], h = l, c = u), g) {
      case Mr.M:
        h = a[d++], c = a[d++], l = h, u = c;
        break;
      case Mr.L:
        if (e) {
          if (Xi(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += li(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.C:
        if (e) {
          if (LS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += kS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.Q:
        if (e) {
          if (PS(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += NS(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.A:
        var y = a[d++], m = a[d++], _ = a[d++], b = a[d++], S = a[d++], w = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(S) * _ + y, f = Math.sin(S) * b + m, p ? (h = v, c = f) : s += li(l, u, v, f, i, n);
        var M = (i - y) * b / _ + y;
        if (e) {
          if ($S(y, m, b, S, S + w, x, t, M, n))
            return !0;
        } else
          s += BS(y, m, b, S, S + w, x, M, n);
        l = Math.cos(S + w) * _ + y, u = Math.sin(S + w) * b + m;
        break;
      case Mr.R:
        h = l = a[d++], c = u = a[d++];
        var D = a[d++], A = a[d++];
        if (v = h + D, f = c + A, e) {
          if (Xi(h, c, v, c, t, i, n) || Xi(v, c, v, f, t, i, n) || Xi(v, f, h, f, t, i, n) || Xi(h, f, h, c, t, i, n))
            return !0;
        } else
          s += li(v, c, v, f, i, n), s += li(h, f, h, c, i, n);
        break;
      case Mr.Z:
        if (e) {
          if (Xi(l, u, h, c, t, i, n))
            return !0;
        } else
          s += li(l, u, h, c, i, n);
        l = h, u = c;
        break;
    }
  }
  return !e && !OS(u, c) && (s += li(l, u, h, c, i, n) || 0), s !== 0;
}
function zS(r, t, e) {
  return Yy(r, 0, !1, t, e);
}
function FS(r, t, e, i) {
  return Yy(r, t, !0, e, i);
}
var Xy = ut({
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
}, Mi), HS = {
  style: ut({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, sl.style)
}, mu = Fa.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ct = function(r) {
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
      for (var s = 0; s < mu.length; ++s)
        n[mu[s]] = this[mu[s]];
      n.__dirty |= ae;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = gt(e);
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
      if (H(e)) {
        var i = Ls(e, 0);
        return i > 0.5 ? Mh : i > 0.2 ? Sw : Dh;
      } else if (e)
        return Dh;
    }
    return Mh;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (H(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Ls(e, 0) < Ch;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~ln;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Ri(!1);
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
      (a || this.__dirty & ln) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), FS(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return zS(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= ln, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & ln);
  }, t.prototype.createStyle = function(e) {
    return il(Xy, e);
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
        for (var h = {}, c = gt(u), v = 0; v < c.length; v++) {
          var f = c[v];
          typeof u[f] == "object" ? this.shape[f] = u[f] : h[f] = u[f];
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
    return HS;
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
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = ae | va | ln;
  }(), t;
}(so), VS = ut({
  strokeFirst: !0,
  font: Li,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Xy), Es = function(r) {
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
    return il(VS, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = Nc(i, e.font, e.textAlign, e.textBaseline);
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
}(so);
Es.prototype.type = "tspan";
var GS = ut({
  x: 0,
  y: 0
}, Mi), WS = {
  style: ut({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, sl.style)
};
function US(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var er = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return il(GS, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = US(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return WS;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new lt(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(so);
er.prototype.type = "image";
function YS(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, h;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var c;
  s + l > n && (c = s + l, s *= n / c, l *= n / c), u + h > n && (c = u + h, u *= n / c, h *= n / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + h > a && (c = s + h, s *= a / c, h *= a / c), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + h, i + a), h !== 0 && r.arc(e + h, i + a - h, h, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var vn = Math.round;
function qy(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (vn(i * 2) === vn(n * 2) && (r.x1 = r.x2 = Si(i, s, !0)), vn(a * 2) === vn(o * 2) && (r.y1 = r.y2 = Si(a, s, !0))), r;
  }
}
function Zy(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = Si(i, s, !0), r.y = Si(n, s, !0), r.width = Math.max(Si(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(Si(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function Si(r, t, e) {
  if (!t)
    return r;
  var i = vn(r * 2);
  return (i + vn(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var XS = /* @__PURE__ */ function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
}(), qS = {}, bt = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new XS();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Zy(qS, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? YS(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(ct);
bt.prototype.type = "rect";
var Ev = {
  fill: "#000"
}, kv = 2, ZS = {
  style: ut({
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
  }, sl.style)
}, At = function(r) {
  B(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = Ev, i.attr(e), i;
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
    this._childCursor = 0, tx(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
      for (var e = new lt(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || Ev;
  }, t.prototype.setTextContent = function(e) {
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return N(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = gt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, N(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return ZS;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || Li, n = e.padding, a = Gv(e), o = yS(a, e), s = _u(e), l = !!e.backgroundColor, u = o.outerHeight, h = o.outerWidth, c = o.contentWidth, v = o.lines, f = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = e.x || 0, p = e.y || 0, y = e.align || d.align || "left", m = e.verticalAlign || d.verticalAlign || "top", _ = g, b = un(p, o.contentHeight, m);
    if (s || n) {
      var S = pa(g, h, y), w = un(p, u, m);
      s && this._renderBackground(e, e, S, w, h, u);
    }
    b += f / 2, n && (_ = Vv(g, y, n), m === "top" ? b += n[0] : m === "bottom" && (b -= n[2]));
    for (var x = 0, M = !1, D = Hv("fill" in e ? e.fill : (M = !0, d.fill)), A = Fv("stroke" in e ? e.stroke : !l && (!d.autoStroke || M) ? (x = kv, d.stroke) : null), T = e.textShadowBlur > 0, I = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), P = o.calculatedLineHeight, $ = 0; $ < v.length; $++) {
      var R = this._getOrCreateChild(Es), O = R.createStyle();
      R.useStyle(O), O.text = v[$], O.x = _, O.y = b, O.textAlign = y, O.textBaseline = "middle", O.opacity = e.opacity, O.strokeFirst = !0, T && (O.shadowBlur = e.textShadowBlur || 0, O.shadowColor = e.textShadowColor || "transparent", O.shadowOffsetX = e.textShadowOffsetX || 0, O.shadowOffsetY = e.textShadowOffsetY || 0), O.stroke = A, O.fill = D, A && (O.lineWidth = e.lineWidth || x, O.lineDash = e.lineDash, O.lineDashOffset = e.lineDashOffset || 0), O.font = i, Bv(O, e), b += f, I && R.setBoundingRect(new lt(pa(O.x, c, O.textAlign), un(O.y, P, O.textBaseline), c, P));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = Gv(e), n = bS(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, h = e.y || 0, c = this._defaultStyle, v = e.align || c.align, f = e.verticalAlign || c.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = pa(u, o, v), g = un(h, s, f), p = d, y = g;
    l && (p += l[3], y += l[0]);
    var m = p + a;
    _u(e) && this._renderBackground(e, e, d, g, o, s);
    for (var _ = !!e.backgroundColor, b = 0; b < n.lines.length; b++) {
      for (var S = n.lines[b], w = S.tokens, x = w.length, M = S.lineHeight, D = S.width, A = 0, T = p, I = m, P = x - 1, $ = void 0; A < x && ($ = w[A], !$.align || $.align === "left"); )
        this._placeToken($, e, M, y, T, "left", _), D -= $.width, T += $.width, A++;
      for (; P >= 0 && ($ = w[P], $.align === "right"); )
        this._placeToken($, e, M, y, I, "right", _), D -= $.width, I -= $.width, P--;
      for (T += (a - (T - p) - (m - I) - D) / 2; A <= P; )
        $ = w[A], this._placeToken($, e, M, y, T + $.width / 2, "center", _), T += $.width, A++;
      y += M;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var h = e.verticalAlign, c = a + n / 2;
    h === "top" ? c = a + e.height / 2 : h === "bottom" && (c = a + n - e.height / 2);
    var v = !e.isLineHolder && _u(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, c - e.height / 2, e.width, e.height);
    var f = !!u.backgroundColor, d = e.textPadding;
    d && (o = Vv(o, s, d), c -= e.height / 2 - d[0] - e.innerHeight / 2);
    var g = this._getOrCreateChild(Es), p = g.createStyle();
    g.useStyle(p);
    var y = this._defaultStyle, m = !1, _ = 0, b = Hv("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, y.fill)), S = Fv("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !f && !l && (!y.autoStroke || m) ? (_ = kv, y.stroke) : null), w = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = e.text, p.x = o, p.y = c, w && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = e.font || Li, p.opacity = is(u.opacity, i.opacity, 1), Bv(p, u), S && (p.lineWidth = is(u.lineWidth, i.lineWidth, _), p.lineDash = tt(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), b && (p.fill = b);
    var x = e.contentWidth, M = e.contentHeight;
    g.setBoundingRect(new lt(pa(p.x, x, p.textAlign), un(p.y, M, p.textBaseline), x, M));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, h = e.borderColor, c = l && l.image, v = l && !c, f = e.borderRadius, d = this, g, p;
    if (v || e.lineHeight || u && h) {
      g = this._getOrCreateChild(bt), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = n, y.y = a, y.width = o, y.height = s, y.r = f, g.dirtyShape();
    }
    if (v) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = tt(e.fillOpacity, 1);
    } else if (c) {
      p = this._getOrCreateChild(er), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = tt(e.strokeOpacity, 1), m.lineDash = e.borderDash, m.lineDashOffset = e.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || p).style;
    b.shadowBlur = e.shadowBlur || 0, b.shadowColor = e.shadowColor || "transparent", b.shadowOffsetX = e.shadowOffsetX || 0, b.shadowOffsetY = e.shadowOffsetY || 0, b.opacity = is(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return JS(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      jS(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && We(i) || e.textFont || e.font;
  }, t;
}(so), KS = { left: !0, right: 1, center: 1 }, QS = { top: 1, bottom: 1, middle: 1 }, Nv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function jS(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? Mc + "px" : r + "px";
}
function Bv(r, t) {
  for (var e = 0; e < Nv.length; e++) {
    var i = Nv[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function JS(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function tx(r) {
  return zv(r), C(r.rich, zv), r;
}
function zv(r) {
  if (r) {
    r.font = At.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || KS[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || QS[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = hy(r.padding));
  }
}
function Fv(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Hv(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Vv(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function Gv(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function _u(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var ot = It(), ex = function(r, t, e, i) {
  if (i) {
    var n = ot(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = ot(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Wv = 1, Uv = {}, Ky = It(), Gc = It(), Wc = 0, ll = 1, ul = 2, Ze = ["emphasis", "blur", "select"], Yv = ["normal", "emphasis", "blur", "select"], rx = 10, ix = 9, Di = "highlight", hs = "downplay", Ta = "select", cs = "unselect", Ca = "toggleSelect";
function qi(r) {
  return r != null && r !== "none";
}
function hl(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function Qy(r) {
  hl(r, "emphasis", ul);
}
function jy(r) {
  r.hoverState === ul && hl(r, "normal", Wc);
}
function Uc(r) {
  hl(r, "blur", ll);
}
function Jy(r) {
  r.hoverState === ll && hl(r, "normal", Wc);
}
function nx(r) {
  r.selected = !0;
}
function ax(r) {
  r.selected = !1;
}
function Xv(r, t, e) {
  t(r, e);
}
function Sr(r, t, e) {
  Xv(r, t, e), r.isGroup && r.traverse(function(i) {
    Xv(i, t, e);
  });
}
function qv(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = ul;
      break;
    case "normal":
      r.hoverState = Wc;
      break;
    case "blur":
      r.hoverState = ll;
      break;
    case "select":
      r.selected = !0;
  }
}
function ox(r, t, e, i) {
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
function sx(r, t, e, i) {
  var n = e && vt(e, "select") >= 0, a = !1;
  if (r instanceof ct) {
    var o = Ky(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (qi(s) || qi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = N({}, i), u = N({}, u), u.fill = s) : !qi(u.fill) && qi(s) ? (a = !0, i = N({}, i), u = N({}, u), u.fill = hv(s)) : !qi(u.stroke) && qi(l) && (a || (i = N({}, i), u = N({}, u)), u.stroke = hv(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = N({}, i));
    var h = r.z2EmphasisLift;
    i.z2 = r.z2 + (h ?? rx);
  }
  return i;
}
function lx(r, t, e) {
  if (e && e.z2 == null) {
    e = N({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? ix);
  }
  return e;
}
function ux(r, t, e) {
  var i = vt(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : ox(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = N({}, e), o = N({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function bu(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return sx(this, r, t, e);
    if (r === "blur")
      return ux(this, r, e);
    if (r === "select")
      return lx(this, r, e);
  }
  return e;
}
function hx(r) {
  r.stateProxy = bu;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = bu), e && (e.stateProxy = bu);
}
function Zv(r, t) {
  !im(r, t) && !r.__highByOuter && Sr(r, Qy);
}
function Kv(r, t) {
  !im(r, t) && !r.__highByOuter && Sr(r, jy);
}
function ks(r, t) {
  r.__highByOuter |= 1 << (t || 0), Sr(r, Qy);
}
function Ns(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && Sr(r, jy);
}
function cx(r) {
  Sr(r, Uc);
}
function tm(r) {
  Sr(r, Jy);
}
function em(r) {
  Sr(r, nx);
}
function rm(r) {
  Sr(r, ax);
}
function im(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function nm(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Gc(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      Jy(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), C(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function Ph(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, h) {
    for (var c = 0; c < h.length; c++) {
      var v = u.getItemGraphicEl(h[c]);
      v && tm(v);
    }
  }
  if (r != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(r), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var h = o === u, c = u.coordinateSystem;
      c && c.master && (c = c.master);
      var v = c && s ? c === s : h;
      if (!// Not blur other series if blurScope series
      (e === "series" && !h || e === "coordinateSystem" && !v || t === "series" && h)) {
        var f = i.getViewOfSeriesModel(u);
        if (f.group.traverse(function(p) {
          p.__highByOuter && h && t === "self" || Uc(p);
        }), Jt(t))
          a(u.getData(), t);
        else if (V(t))
          for (var d = gt(t), g = 0; g < d.length; g++)
            a(u.getData(d[g]), t[d[g]]);
        l.push(u), Gc(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, h) {
      if (u !== "series") {
        var c = i.getViewOfComponentModel(h);
        c && c.toggleBlurSeries && c.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function $h(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      Gc(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        Uc(a);
      });
    }
  }
}
function fx(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (n) {
    var a = $i(n, t);
    a = (z(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = ot(o);
      Ph(i, u.focus, u.blurScope, e);
    } else {
      var h = r.get(["emphasis", "focus"]), c = r.get(["emphasis", "blurScope"]);
      h != null && Ph(i, h, c, e);
    }
  }
}
function Yc(r, t, e, i) {
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
    if (ot(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function vx(r, t, e) {
  var i = ot(r), n = Yc(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && $h(i.componentMainType, i.componentIndex, e), C(a, function(s) {
    return Zv(s, t);
  })) : (Ph(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && $h(i.componentMainType, i.componentIndex, e), Zv(r, t));
}
function dx(r, t, e) {
  nm(e);
  var i = ot(r), n = Yc(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? C(n, function(a) {
    return Kv(a, t);
  }) : Kv(r, t);
}
function px(r, t, e) {
  if (kh(t)) {
    var i = t.dataType, n = r.getData(i), a = $i(n, t);
    z(a) || (a = [a]), r[t.type === Ca ? "toggleSelect" : t.type === Ta ? "select" : "unselect"](a, i);
  }
}
function Qv(r) {
  var t = r.getAllData();
  C(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? em(a) : rm(a);
    });
  });
}
function gx(r) {
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
function Rh(r, t, e) {
  Xc(r, !0), Sr(r, hx), mx(r, t, e);
}
function yx(r) {
  Xc(r, !1);
}
function Ga(r, t, e, i) {
  i ? yx(r) : Rh(r, t, e);
}
function mx(r, t, e) {
  var i = ot(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var jv = ["emphasis", "blur", "select"], _x = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Oh(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < jv.length; n++) {
    var a = jv[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[_x[e]]();
  }
}
function Xc(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function Eh(r) {
  return !!(r && r.__highDownDispatcher);
}
function bx(r) {
  var t = Uv[r];
  return t == null && Wv <= 32 && (t = Uv[r] = Wv++), t;
}
function kh(r) {
  var t = r.type;
  return t === Ta || t === cs || t === Ca;
}
function Jv(r) {
  var t = r.type;
  return t === Di || t === hs;
}
function Sx(r) {
  var t = Ky(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var Zi = Ri.CMD, xx = [[], [], []], td = Math.sqrt, Tx = Math.atan2;
function Cx(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, h = Zi.M, c = Zi.C, v = Zi.L, f = Zi.R, d = Zi.A, g = Zi.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case h:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case c:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case d:
          var p = t[4], y = t[5], m = td(t[0] * t[0] + t[1] * t[1]), _ = td(t[2] * t[2] + t[3] * t[3]), b = Tx(-t[1] / _, t[0] / m);
          e[o] *= m, e[o++] += p, e[o] *= _, e[o++] += y, e[o++] *= m, e[o++] *= _, e[o++] += b, e[o++] += b, o += 2, s = o;
          break;
        case f:
          u[0] = e[o++], u[1] = e[o++], me(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], me(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = xx[l];
        S[0] = e[o++], S[1] = e[o++], me(S, S, t), e[s++] = S[0], e[s++] = S[1];
      }
    }
    r.increaseVersion();
  }
}
var wu = Math.sqrt, Do = Math.sin, Ao = Math.cos, jn = Math.PI;
function ed(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function Nh(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (ed(r) * ed(t));
}
function rd(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(Nh(r, t));
}
function id(r, t, e, i, n, a, o, s, l, u, h) {
  var c = l * (jn / 180), v = Ao(c) * (r - e) / 2 + Do(c) * (t - i) / 2, f = -1 * Do(c) * (r - e) / 2 + Ao(c) * (t - i) / 2, d = v * v / (o * o) + f * f / (s * s);
  d > 1 && (o *= wu(d), s *= wu(d));
  var g = (n === a ? -1 : 1) * wu((o * o * (s * s) - o * o * (f * f) - s * s * (v * v)) / (o * o * (f * f) + s * s * (v * v))) || 0, p = g * o * f / s, y = g * -s * v / o, m = (r + e) / 2 + Ao(c) * p - Do(c) * y, _ = (t + i) / 2 + Do(c) * p + Ao(c) * y, b = rd([1, 0], [(v - p) / o, (f - y) / s]), S = [(v - p) / o, (f - y) / s], w = [(-1 * v - p) / o, (-1 * f - y) / s], x = rd(S, w);
  if (Nh(S, w) <= -1 && (x = jn), Nh(S, w) >= 1 && (x = 0), x < 0) {
    var M = Math.round(x / jn * 1e6) / 1e6;
    x = jn * 2 + M % 2 * jn;
  }
  h.addData(u, m, _, o, s, b, x, c, a);
}
var Mx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Dx = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Ax(r) {
  var t = new Ri();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = Ri.CMD, l = r.match(Mx);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], c = h.charAt(0), v = void 0, f = h.match(Dx) || [], d = f.length, g = 0; g < d; g++)
      f[g] = parseFloat(f[g]);
    for (var p = 0; p < d; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = e, D = i, A = void 0, T = void 0;
      switch (c) {
        case "l":
          e += f[p++], i += f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "L":
          e = f[p++], i = f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "m":
          e += f[p++], i += f[p++], v = s.M, t.addData(v, e, i), n = e, a = i, c = "l";
          break;
        case "M":
          e = f[p++], i = f[p++], v = s.M, t.addData(v, e, i), n = e, a = i, c = "L";
          break;
        case "h":
          e += f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "H":
          e = f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "v":
          i += f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "V":
          i = f[p++], v = s.L, t.addData(v, e, i);
          break;
        case "C":
          v = s.C, t.addData(v, f[p++], f[p++], f[p++], f[p++], f[p++], f[p++]), e = f[p - 2], i = f[p - 1];
          break;
        case "c":
          v = s.C, t.addData(v, f[p++] + e, f[p++] + i, f[p++] + e, f[p++] + i, f[p++] + e, f[p++] + i), e += f[p - 2], i += f[p - 1];
          break;
        case "S":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, M = f[p++], D = f[p++], e = f[p++], i = f[p++], t.addData(v, y, m, M, D, e, i);
          break;
        case "s":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, M = e + f[p++], D = i + f[p++], e += f[p++], i += f[p++], t.addData(v, y, m, M, D, e, i);
          break;
        case "Q":
          M = f[p++], D = f[p++], e = f[p++], i = f[p++], v = s.Q, t.addData(v, M, D, e, i);
          break;
        case "q":
          M = f[p++] + e, D = f[p++] + i, e += f[p++], i += f[p++], v = s.Q, t.addData(v, M, D, e, i);
          break;
        case "T":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e = f[p++], i = f[p++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "t":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e += f[p++], i += f[p++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "A":
          _ = f[p++], b = f[p++], S = f[p++], w = f[p++], x = f[p++], M = e, D = i, e = f[p++], i = f[p++], v = s.A, id(M, D, e, i, w, x, _, b, S, v, t);
          break;
        case "a":
          _ = f[p++], b = f[p++], S = f[p++], w = f[p++], x = f[p++], M = e, D = i, e += f[p++], i += f[p++], v = s.A, id(M, D, e, i, w, x, _, b, S, v, t);
          break;
      }
    }
    (c === "z" || c === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var am = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(ct);
function om(r) {
  return r.setData != null;
}
function sm(r, t) {
  var e = Ax(r), i = N({}, t);
  return i.buildPath = function(n) {
    if (om(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    Cx(e, n), this.dirtyShape();
  }, i;
}
function Ix(r, t) {
  return new am(sm(r, t));
}
function Lx(r, t) {
  var e = sm(r, t), i = function(n) {
    B(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(am);
  return i;
}
function Px(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ct(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (om(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var $x = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), cl = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new $x();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(ct);
cl.prototype.type = "circle";
var Rx = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), qc = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Rx();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, h = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), e.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), e.closePath();
  }, t;
}(ct);
qc.prototype.type = "ellipse";
var lm = Math.PI, Su = lm * 2, hi = Math.sin, Ki = Math.cos, Ox = Math.acos, Ot = Math.atan2, nd = Math.abs, Ma = Math.sqrt, ga = Math.max, He = Math.min, De = 1e-4;
function Ex(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, c = s - a, v = c * l - h * u;
  if (!(v * v < De))
    return v = (h * (t - a) - c * (r - n)) / v, [r + v * l, t + v * u];
}
function Io(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / Ma(s * s + l * l), h = u * l, c = -u * s, v = r + h, f = t + c, d = e + h, g = i + c, p = (v + d) / 2, y = (f + g) / 2, m = d - v, _ = g - f, b = m * m + _ * _, S = n - a, w = v * g - d * f, x = (_ < 0 ? -1 : 1) * Ma(ga(0, S * S * b - w * w)), M = (w * _ - m * x) / b, D = (-w * m - _ * x) / b, A = (w * _ + m * x) / b, T = (-w * m + _ * x) / b, I = M - p, P = D - y, $ = A - p, R = T - y;
  return I * I + P * P > $ * $ + R * R && (M = A, D = T), {
    cx: M,
    cy: D,
    x0: -h,
    y0: -c,
    x1: M * (n / S - 1),
    y1: D * (n / S - 1)
  };
}
function kx(r) {
  var t;
  if (z(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function Nx(r, t) {
  var e, i = ga(t.r, 0), n = ga(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, c = t.cy, v = !!t.clockwise, f = nd(u - l), d = f > Su && f % Su;
      if (d > De && (f = d), !(i > De))
        r.moveTo(h, c);
      else if (f > Su - De)
        r.moveTo(h + i * Ki(l), c + i * hi(l)), r.arc(h, c, i, l, u, !v), n > De && (r.moveTo(h + n * Ki(u), c + n * hi(u)), r.arc(h, c, n, u, l, v));
      else {
        var g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = void 0, D = void 0, A = void 0, T = void 0, I = void 0, P = void 0, $ = void 0, R = i * Ki(l), O = i * hi(l), G = n * Ki(u), E = n * hi(u), F = f > De;
        if (F) {
          var W = t.cornerRadius;
          W && (e = kx(W), g = e[0], p = e[1], y = e[2], m = e[3]);
          var Q = nd(i - n) / 2;
          if (_ = He(Q, y), b = He(Q, m), S = He(Q, g), w = He(Q, p), D = x = ga(_, b), A = M = ga(S, w), (x > De || M > De) && (T = i * Ki(u), I = i * hi(u), P = n * Ki(l), $ = n * hi(l), f < lm)) {
            var et = Ex(R, O, P, $, T, I, G, E);
            if (et) {
              var ft = R - et[0], mt = O - et[1], St = T - et[0], xe = I - et[1], Xr = 1 / hi(Ox((ft * St + mt * xe) / (Ma(ft * ft + mt * mt) * Ma(St * St + xe * xe))) / 2), Vi = Ma(et[0] * et[0] + et[1] * et[1]);
              D = He(x, (i - Vi) / (Xr + 1)), A = He(M, (n - Vi) / (Xr - 1));
            }
          }
        }
        if (!F)
          r.moveTo(h + R, c + O);
        else if (D > De) {
          var ie = He(y, D), Lt = He(m, D), Z = Io(P, $, R, O, i, ie, v), rt = Io(T, I, G, E, i, Lt, v);
          r.moveTo(h + Z.cx + Z.x0, c + Z.cy + Z.y0), D < x && ie === Lt ? r.arc(h + Z.cx, c + Z.cy, D, Ot(Z.y0, Z.x0), Ot(rt.y0, rt.x0), !v) : (ie > 0 && r.arc(h + Z.cx, c + Z.cy, ie, Ot(Z.y0, Z.x0), Ot(Z.y1, Z.x1), !v), r.arc(h, c, i, Ot(Z.cy + Z.y1, Z.cx + Z.x1), Ot(rt.cy + rt.y1, rt.cx + rt.x1), !v), Lt > 0 && r.arc(h + rt.cx, c + rt.cy, Lt, Ot(rt.y1, rt.x1), Ot(rt.y0, rt.x0), !v));
        } else
          r.moveTo(h + R, c + O), r.arc(h, c, i, l, u, !v);
        if (!(n > De) || !F)
          r.lineTo(h + G, c + E);
        else if (A > De) {
          var ie = He(g, A), Lt = He(p, A), Z = Io(G, E, T, I, n, -Lt, v), rt = Io(R, O, P, $, n, -ie, v);
          r.lineTo(h + Z.cx + Z.x0, c + Z.cy + Z.y0), A < M && ie === Lt ? r.arc(h + Z.cx, c + Z.cy, A, Ot(Z.y0, Z.x0), Ot(rt.y0, rt.x0), !v) : (Lt > 0 && r.arc(h + Z.cx, c + Z.cy, Lt, Ot(Z.y0, Z.x0), Ot(Z.y1, Z.x1), !v), r.arc(h, c, n, Ot(Z.cy + Z.y1, Z.cx + Z.x1), Ot(rt.cy + rt.y1, rt.cx + rt.x1), v), ie > 0 && r.arc(h + rt.cx, c + rt.cy, ie, Ot(rt.y1, rt.x1), Ot(rt.y0, rt.x0), !v));
        } else
          r.lineTo(h + G, c + E), r.arc(h, c, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var Bx = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), zn = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Bx();
  }, t.prototype.buildPath = function(e, i) {
    Nx(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(ct);
zn.prototype.type = "sector";
var zx = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), Zc = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new zx();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(ct);
Zc.prototype.type = "ring";
function Fx(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, h, c;
  if (i) {
    h = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var v = 0, f = r.length; v < f; v++)
      hn(h, h, r[v]), cn(c, c, r[v]);
    hn(h, h, i[0]), cn(c, c, i[1]);
  }
  for (var v = 0, f = r.length; v < f; v++) {
    var d = r[v];
    if (e)
      l = r[v ? v - 1 : f - 1], u = r[(v + 1) % f];
    else if (v === 0 || v === f - 1) {
      n.push(y1(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    m1(a, u, l), Bl(a, a, t);
    var g = vh(d, l), p = vh(d, u), y = g + p;
    y !== 0 && (g /= y, p /= y), Bl(o, a, -g), Bl(s, a, p);
    var m = qf([], d, o), _ = qf([], d, s);
    i && (cn(m, m, h), hn(m, m, c), cn(_, _, h), hn(_, _, c)), n.push(m), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function um(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Fx(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], h = n[(s + 1) % o];
        r.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, c = n.length; s < c; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var Hx = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), fl = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Hx();
  }, t.prototype.buildPath = function(e, i) {
    um(e, i, !0);
  }, t;
}(ct);
fl.prototype.type = "polygon";
var Vx = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), Kc = function(r) {
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
    return new Vx();
  }, t.prototype.buildPath = function(e, i) {
    um(e, i, !1);
  }, t;
}(ct);
Kc.prototype.type = "polyline";
var Gx = {}, Wx = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
}(), Ur = function(r) {
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
    return new Wx();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = qy(Gx, i, this.style);
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
}(ct);
Ur.prototype.type = "line";
var Ut = [], Ux = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function ad(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? av : $t)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? av : $t)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? ov : Kt)(r.x1, r.cpx1, r.x2, t),
    (e ? ov : Kt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var Qc = function(r) {
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
    return new Ux();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, h = i.cpx2, c = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), h == null || c == null ? (v < 1 && (Is(n, l, o, v, Ut), l = Ut[1], o = Ut[2], Is(a, u, s, v, Ut), u = Ut[1], s = Ut[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (As(n, l, h, o, v, Ut), l = Ut[1], h = Ut[2], o = Ut[3], As(a, u, c, s, v, Ut), u = Ut[1], c = Ut[2], s = Ut[3]), e.bezierCurveTo(l, u, h, c, o, s)));
  }, t.prototype.pointAt = function(e) {
    return ad(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = ad(this.shape, e, !0);
    return w1(i, i);
  }, t;
}(ct);
Qc.prototype.type = "bezier-curve";
var Yx = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), vl = function(r) {
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
    return new Yx();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, h = Math.cos(s), c = Math.sin(s);
    e.moveTo(h * o + n, c * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
}(ct);
vl.prototype.type = "arc";
var Xx = function(r) {
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
    return this._updatePathDirty.call(this), ct.prototype.getBoundingRect.call(this);
  }, t;
}(ct), hm = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), jc = function(r) {
  B(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(hm), qx = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(hm), ci = [0, 0], fi = [0, 0], Lo = new dt(), Po = new dt(), Bs = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new dt();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new dt();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    dt.sub(n[0], i[1], i[0]), dt.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return Lo.set(1 / 0, 1 / 0), Po.set(0, 0), !this._intersectCheckOneSide(this, t, Lo, Po, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, Lo, Po, n, -1) && (i = !1, n) || n || dt.copy(e, i ? Lo : Po), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, ci), this._getProjMinMaxOnAxis(l, e._corners, fi), ci[1] < fi[0] || ci[0] > fi[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(fi[0] - ci[1]), c = Math.abs(ci[0] - fi[1]);
        Math.min(h, c) > n.len() && (h < c ? dt.scale(n, u, -h * o) : dt.scale(n, u, c * o));
      } else if (i) {
        var h = Math.abs(fi[0] - ci[1]), c = Math.abs(ci[0] - fi[1]);
        Math.min(h, c) < i.len() && (h < c ? dt.scale(i, u, h * o) : dt.scale(i, u, -c * o));
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
}(), Zx = [], Kx = function(r) {
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
      for (var e = new lt(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(Zx)), e.union(a);
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
}(so), Qx = It();
function jx(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, h = void 0, c = void 0;
    i ? (u = tt(i.duration, 200), h = tt(i.easing, "cubicOut"), c = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), c = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (c = a.delay)), q(c) && (c = c(e, n)), q(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: c,
      easing: h
    };
    return v;
  } else
    return null;
}
function Jc(r, t, e, i, n, a, o) {
  var s = !1, l;
  q(n) ? (o = a, a = n, n = null) : V(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var h = jx(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (h && h.duration > 0) {
    var c = h.duration, v = h.delay, f = h.easing, d = {
      duration: c,
      delay: v || 0,
      easing: f,
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
function se(r, t, e, i, n, a) {
  Jc("update", r, t, e, i, n, a);
}
function pr(r, t, e, i, n, a) {
  Jc("enter", r, t, e, i, n, a);
}
function Da(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function zs(r, t, e, i, n, a) {
  Da(r) || Jc("leave", r, t, e, i, n, a);
}
function od(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), zs(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function Bh(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || od(n, t, e, i);
  }) : od(r, t, e, i);
}
function cm(r) {
  Qx(r).oldStyle = r.style;
}
var Fs = Math.max, Hs = Math.min, zh = {};
function Jx(r) {
  return ct.extend(r);
}
var tT = Lx;
function eT(r, t) {
  return tT(r, t);
}
function Ne(r, t) {
  zh[r] = t;
}
function rT(r) {
  if (zh.hasOwnProperty(r))
    return zh[r];
}
function tf(r, t, e, i) {
  var n = Ix(r, t);
  return e && (i === "center" && (e = vm(e, n.getBoundingRect())), dm(n, e)), n;
}
function fm(r, t, e) {
  var i = new er({
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
        i.setStyle(vm(t, a));
      }
    }
  });
  return i;
}
function vm(r, t) {
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
var iT = Px;
function dm(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function Wa(r, t) {
  return qy(r, r, {
    lineWidth: t
  }), r;
}
function nT(r) {
  return Zy(r.shape, r.shape, r.style), r;
}
var aT = Si;
function fs(r, t) {
  for (var e = $c([]); r && r !== t; )
    yn(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function _n(r, t, e) {
  return t && !Jt(t) && (t = kc.getLocalTransform(t)), e && (t = Oc([], t)), me([], r, t);
}
function pm(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = _n(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function sd(r) {
  return !r.isGroup;
}
function oT(r) {
  return r.shape != null;
}
function gm(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      sd(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return oT(o) && (s.shape = N({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (sd(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), se(o, l, e, ot(o).dataIndex);
      }
    }
  });
}
function sT(r, t) {
  return U(r, function(e) {
    var i = e[0];
    i = Fs(i, t.x), i = Hs(i, t.x + t.width);
    var n = e[1];
    return n = Fs(n, t.y), n = Hs(n, t.y + t.height), [i, n];
  });
}
function lT(r, t) {
  var e = Fs(r.x, t.x), i = Hs(r.x + r.width, t.x + t.width), n = Fs(r.y, t.y), a = Hs(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function ef(r, t, e) {
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
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), ut(n, e), new er(i)) : tf(r.replace("path://", ""), i, e, "center");
}
function uT(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (ym(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function ym(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, c = s - a, v = xu(h, c, l, u);
  if (hT(v))
    return !1;
  var f = r - n, d = t - a, g = xu(f, d, l, u) / v;
  if (g < 0 || g > 1)
    return !1;
  var p = xu(f, d, h, c) / v;
  return !(p < 0 || p > 1);
}
function xu(r, t, e, i) {
  return r * i - e * t;
}
function hT(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function dl(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = H(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && C(gt(l), function(h) {
    Pi(s, h) || (s[h] = l[h], s.$vars.push(h));
  });
  var u = ot(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ut({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function ld(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function lo(r, t) {
  if (r)
    if (z(r))
      for (var e = 0; e < r.length; e++)
        ld(r[e], t);
    else
      ld(r, t);
}
Ne("circle", cl);
Ne("ellipse", qc);
Ne("sector", zn);
Ne("ring", Zc);
Ne("polygon", fl);
Ne("polyline", Kc);
Ne("rect", bt);
Ne("line", Ur);
Ne("bezierCurve", Qc);
Ne("arc", vl);
const cT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: vl,
  BezierCurve: Qc,
  BoundingRect: lt,
  Circle: cl,
  CompoundPath: Xx,
  Ellipse: qc,
  Group: Ct,
  Image: er,
  IncrementalDisplayable: Kx,
  Line: Ur,
  LinearGradient: jc,
  OrientedBoundingRect: Bs,
  Path: ct,
  Point: dt,
  Polygon: fl,
  Polyline: Kc,
  RadialGradient: qx,
  Rect: bt,
  Ring: Zc,
  Sector: zn,
  Text: At,
  applyTransform: _n,
  clipPointsByRect: sT,
  clipRectByRect: lT,
  createIcon: ef,
  extendPath: eT,
  extendShape: Jx,
  getShapeClass: rT,
  getTransform: fs,
  groupTransition: gm,
  initProps: pr,
  isElementRemoved: Da,
  lineLineIntersect: ym,
  linePolygonIntersect: uT,
  makeImage: fm,
  makePath: tf,
  mergePath: iT,
  registerShape: Ne,
  removeElement: zs,
  removeElementWithFadeOut: Bh,
  resizePath: dm,
  setTooltipConfig: dl,
  subPixelOptimize: aT,
  subPixelOptimizeLine: Wa,
  subPixelOptimizeRect: nT,
  transformDirection: pm,
  traverseElements: lo,
  updateProps: se
}, Symbol.toStringTag, { value: "Module" }));
var pl = {};
function fT(r, t) {
  for (var e = 0; e < Ze.length; e++) {
    var i = Ze[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function ud(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = q(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ze.length; u++) {
    var h = Ze[u], c = t[h];
    l[h] = tt(i ? i.getFormattedLabel(n, h, null, a, c && c.get("formatter")) : null, s);
  }
  return l;
}
function uo(r, t, e, i) {
  e = e || pl;
  for (var n = r instanceof At, a = !1, o = 0; o < Yv.length; o++) {
    var s = t[Yv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new At(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = ud(e, t), h = t.normal, c = !!h.getShallow("show"), v = Ye(h, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(hd(h, e, !1));
    for (var o = 0; o < Ze.length; o++) {
      var f = Ze[o], s = t[f];
      if (s) {
        var d = l.ensureState(f), g = !!tt(s.getShallow("show"), c);
        if (g !== c && (d.ignore = !g), d.style = Ye(s, i && i[f], e, !0, !n), d.style.text = u[f], !n) {
          var p = r.ensureState(f);
          p.textConfig = hd(s, e, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !c, l.useStyle(v), l.dirty(), e.enableTextSetter && (gl(l).setLabelText = function(y) {
      var m = ud(e, t, y);
      fT(l, m);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function An(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < Ze.length; i++) {
    var n = Ze[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function Ye(r, t, e, i, n) {
  var a = {};
  return vT(a, r, e, i, n), t && N(a, t), a;
}
function hd(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = tt(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function vT(r, t, e, i, n) {
  e = e || pl;
  var a = t.ecModel, o = a && a.option.textStyle, s = dT(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        dd(l[u] = {}, h, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var c = t.get("overflow");
  c && (r.overflow = c);
  var v = t.get("minMargin");
  v != null && (r.margin = v), dd(r, t, o, e, i, n, !0, !1);
}
function dT(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || pl).rich;
    if (e) {
      t = t || {};
      for (var i = gt(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var cd = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], fd = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], vd = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function dd(r, t, e, i, n, a, o, s) {
  e = !n && e || pl;
  var l = i && i.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), c = tt(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || e.color, h = h || e.textBorderColor), u != null && (r.fill = u), h != null && (r.stroke = h);
  var v = tt(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var f = tt(t.getShallow("textBorderType"), e.textBorderType);
  f != null && (r.lineDash = f);
  var d = tt(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  d != null && (r.lineDashOffset = d), !n && c == null && !s && (c = i && i.defaultOpacity), c != null && (r.opacity = c), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var g = 0; g < cd.length; g++) {
    var p = cd[g], y = tt(t.getShallow(p), e[p]);
    y != null && (r[p] = y);
  }
  for (var g = 0; g < fd.length; g++) {
    var p = fd[g], y = t.getShallow(p);
    y != null && (r[p] = y);
  }
  if (r.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (r.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var g = 0; g < vd.length; g++) {
      var p = vd[g], y = t.getShallow(p);
      y != null && (r[p] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (r.borderColor = l);
  }
}
function pT(r, t) {
  var e = t && t.getModel("textStyle");
  return We([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var gl = It();
function gT(r, t, e, i) {
  if (r) {
    var n = gl(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var yT = ["textStyle", "color"], Tu = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Cu = new At(), mT = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(yT) : null);
    }, r.prototype.getFont = function() {
      return pT({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < Tu.length; i++)
        e[Tu[i]] = this.getShallow(Tu[i]);
      return Cu.useStyle(e), Cu.update(), Cu.getBoundingRect();
    }, r;
  }()
), mm = [
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
], _T = Va(mm), bT = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return _T(this, t);
    }, r;
  }()
), _m = [
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
], wT = Va(_m), ST = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return wT(this, t, e);
    }, r;
  }()
), xt = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.parentModel = e, this.ecModel = i, this.option = t;
    }
    return r.prototype.init = function(t, e, i) {
    }, r.prototype.mergeOption = function(t, e) {
      nt(this.option, t, !0);
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
Vc(xt);
lS(xt);
Je(xt, bT);
Je(xt, ST);
Je(xt, vS);
Je(xt, mT);
var xT = Math.round(Math.random() * 10);
function yl(r) {
  return [r || "", xT++].join("_");
}
function TT(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Ue(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Ue(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function CT(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), h = u.graph, c = u.noEntryList, v = {};
    for (C(a, function(m) {
      v[m] = !0;
    }); c.length; ) {
      var f = c.pop(), d = h[f], g = !!v[f];
      g && (s.call(l, f, d.originalDeps.slice()), delete v[f]), C(d.successor, g ? y : p);
    }
    C(v, function() {
      var m = "";
      throw new Error(m);
    });
    function p(m) {
      h[m].entryCount--, h[m].entryCount === 0 && c.push(m);
    }
    function y(m) {
      v[m] = !0, p(m);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return C(a, function(l) {
      var u = i(o, l), h = u.originalDeps = t(l), c = n(h, a);
      u.entryCount = c.length, u.entryCount === 0 && s.push(l), C(c, function(v) {
        vt(u.predecessor, v) < 0 && u.predecessor.push(v);
        var f = i(o, v);
        vt(f.successor, v) < 0 && f.successor.push(l);
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
      vt(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function ml(r, t) {
  return nt(nt({}, r, !0), t, !0);
}
const MT = {
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
}, DT = {
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
var Vs = "ZH", rf = "EN", bn = rf, vs = {}, nf = {}, bm = Y.domSupported ? function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || bn).toUpperCase()
  );
  return r.indexOf(Vs) > -1 ? Vs : bn;
}() : bn;
function wm(r, t) {
  r = r.toUpperCase(), nf[r] = new xt(t), vs[r] = t;
}
function AT(r) {
  if (H(r)) {
    var t = vs[r.toUpperCase()] || {};
    return r === Vs || r === rf ? X(t) : nt(X(t), X(vs[bn]), !1);
  } else
    return nt(X(r), X(vs[bn]), !1);
}
function IT(r) {
  return nf[r];
}
function LT() {
  return nf[bn];
}
wm(rf, MT);
wm(Vs, DT);
var af = 1e3, of = af * 60, Aa = of * 60, ye = Aa * 24, pd = ye * 365, ya = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, $o = "{yyyy}-{MM}-{dd}", gd = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: $o,
  hour: $o + " " + ya.hour,
  minute: $o + " " + ya.minute,
  second: $o + " " + ya.second,
  millisecond: ya.none
}, Mu = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Sm = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function Dr(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function wn(r) {
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
function PT(r) {
  return r === wn(r);
}
function $T(r) {
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
function _l(r, t, e, i) {
  var n = dr(r), a = n[sf(e)](), o = n[Sn(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[bl(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), h = n[Ua(e)](), c = (h - 1) % 12 + 1, v = n[wl(e)](), f = n[Sl(e)](), d = n[xl(e)](), g = h >= 12 ? "pm" : "am", p = g.toUpperCase(), y = i instanceof xt ? i : IT(i || bm) || LT(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), S = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Dr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, Dr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Dr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Dr(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Dr(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Dr(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, Dr(f, 2)).replace(/{s}/g, f + "").replace(/{SSS}/g, Dr(d, 3)).replace(/{S}/g, d + "");
}
function RT(r, t, e, i, n) {
  var a = null;
  if (H(e))
    a = e;
  else if (q(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = N({}, ya);
    if (r.level > 0)
      for (var s = 0; s < Mu.length; ++s)
        o[Mu[s]] = "{primary|" + o[Mu[s]] + "}";
    var l = e ? e.inherit === !1 ? e : ut(e, o) : o, u = xm(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = Sm.indexOf(u), s = h - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (z(a)) {
      var c = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      c = Math.min(c, a.length - 1), a = a[c];
    }
  }
  return _l(new Date(r.value), a, n, i);
}
function xm(r, t) {
  var e = dr(r), i = e[Sn(t)]() + 1, n = e[bl(t)](), a = e[Ua(t)](), o = e[wl(t)](), s = e[Sl(t)](), l = e[xl(t)](), u = l === 0, h = u && s === 0, c = h && o === 0, v = c && a === 0, f = v && n === 1, d = f && i === 1;
  return d ? "year" : f ? "month" : v ? "day" : c ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function yd(r, t, e) {
  var i = yt(r) ? dr(r) : r;
  switch (t = t || xm(r, e), t) {
    case "year":
      return i[sf(e)]();
    case "half-year":
      return i[Sn(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Sn(e)]() + 1) / 4);
    case "month":
      return i[Sn(e)]();
    case "day":
      return i[bl(e)]();
    case "half-day":
      return i[Ua(e)]() / 24;
    case "hour":
      return i[Ua(e)]();
    case "minute":
      return i[wl(e)]();
    case "second":
      return i[Sl(e)]();
    case "millisecond":
      return i[xl(e)]();
  }
}
function sf(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Sn(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function bl(r) {
  return r ? "getUTCDate" : "getDate";
}
function Ua(r) {
  return r ? "getUTCHours" : "getHours";
}
function wl(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function Sl(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function xl(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function OT(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function Tm(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function Cm(r) {
  return r ? "setUTCDate" : "setDate";
}
function Mm(r) {
  return r ? "setUTCHours" : "setHours";
}
function Dm(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function Am(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function Im(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function Lm(r) {
  if (!Fw(r))
    return H(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function Pm(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var ho = hy;
function Fh(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(h) {
    return h && We(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? dr(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return _l(l, i, e);
  }
  if (t === "ordinal")
    return ch(r) ? n(r) : yt(r) && a(r) ? r + "" : "-";
  var u = Os(r);
  return a(u) ? Lm(u) : ch(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var md = ["a", "b", "c", "d", "e", "f", "g"], Du = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function $m(r, t, e) {
  z(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = md[a];
    r = r.replace(Du(o), Du(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(Du(md[l], s), e ? Zt(u) : u);
    }
  return r;
}
function ET(r, t) {
  var e = H(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Zt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Zt(i) + ";" + (t || "") + '"></span>';
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
function Oi(r, t) {
  return t = t || "transparent", H(r) ? r : V(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var ds = C, kT = ["left", "right", "top", "bottom", "width", "height"], Ro = [["width", "left", "right"], ["height", "top", "bottom"]];
function lf(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), c = t.childAt(u + 1), v = c && c.getBoundingRect(), f, d;
    if (r === "horizontal") {
      var g = h.width + (v ? -v.x + h.x : 0);
      f = a + g, f > i || l.newline ? (a = 0, f = g, o += s + e, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (v ? -v.y + h.y : 0);
      d = o + p, d > n || l.newline ? (a += s + e, o = 0, d = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = f + e : o = d + e);
  });
}
var xn = lf;
Dt(lf, "vertical");
Dt(lf, "horizontal");
function In(r, t, e) {
  e = ho(e || 0);
  var i = t.width, n = t.height, a = Vt(r.left, i), o = Vt(r.top, n), s = Vt(r.right, i), l = Vt(r.bottom, n), u = Vt(r.width, i), h = Vt(r.height, n), c = e[2] + e[0], v = e[1] + e[3], f = r.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(h) && (h = n - l - c - o), f != null && (isNaN(u) && isNaN(h) && (f > i / n ? u = i * 0.8 : h = n * 0.8), isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - h - c), r.left || r.right) {
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
      o = n - h - c;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(h) && (h = n - c - o - (l || 0));
  var d = new lt(a + e[3], o + e[0], u, h);
  return d.margin = e, d;
}
function NT(r, t, e, i, n, a) {
  a = a || r, a.x = r.x, a.y = r.y;
  var o;
  if (o = r.getBoundingRect(), r.needLocalTransform()) {
    var s = r.getLocalTransform();
    o = o.clone(), o.applyTransform(s);
  }
  var l = In(ut({
    width: o.width,
    height: o.height
  }, t), e, i), u = l.x - o.x, h = l.y - o.y;
  return a.x += u, a.y += h, a === r && r.markRedraw(), !0;
}
function Ya(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return V(t) ? t : t ? {
    type: t
  } : null;
}
function Ln(r, t, e) {
  var i = e && e.ignoreSize;
  !z(i) && (i = [i, i]);
  var n = o(Ro[0], 0), a = o(Ro[1], 1);
  u(Ro[0], r, n), u(Ro[1], r, a);
  function o(h, c) {
    var v = {}, f = 0, d = {}, g = 0, p = 2;
    if (ds(h, function(_) {
      d[_] = r[_];
    }), ds(h, function(_) {
      s(t, _) && (v[_] = d[_] = t[_]), l(v, _) && f++, l(d, _) && g++;
    }), i[c])
      return l(t, h[1]) ? d[h[2]] = null : l(t, h[2]) && (d[h[1]] = null), d;
    if (g === p || !f)
      return d;
    if (f >= p)
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
  function s(h, c) {
    return h.hasOwnProperty(c);
  }
  function l(h, c) {
    return h[c] != null && h[c] !== "auto";
  }
  function u(h, c, v) {
    ds(h, function(f) {
      c[f] = v[f];
    });
  }
}
function Tl(r) {
  return BT({}, r);
}
function BT(r, t) {
  return t && r && ds(kT, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var zT = It(), ht = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = yl("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Ya(this), a = n ? Tl(e) : {}, o = i.getTheme();
      nt(e, o.get(this.mainType)), nt(e, this.getDefaultOption()), n && Ln(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      nt(this.option, e, !0);
      var n = Ya(this);
      n && Ln(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!aS(e))
        return e.defaultOption;
      var i = zT(this);
      if (!i.defaultOption) {
        for (var n = [], a = e; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = nt(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(e, i) {
      var n = e + "Index", a = e + "Id";
      return oo(this.ecModel, e, {
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
  }(xt)
);
Hy(ht, xt);
al(ht);
TT(ht);
CT(ht, FT);
function FT(r) {
  var t = [];
  return C(ht.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = U(t, function(e) {
    return Ue(e).main;
  }), r !== "dataset" && vt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Rm = "";
typeof navigator < "u" && (Rm = navigator.platform || "");
var Qi = "rgba(0, 0, 0, 0.2)";
const HT = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: Qi,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: Qi,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: Qi,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: Qi,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: Qi,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: Qi,
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
    fontFamily: Rm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Om = j(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Se = "original", ee = "arrayRows", rr = "objectRows", xr = "keyedColumns", Vr = "typedArray", Em = "unknown", fr = "column", Fn = "row", ne = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, km = It();
function VT(r) {
  km(r).datasetMap = j();
}
function GT(r, t, e) {
  var i = {}, n = Nm(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = km(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, h, c;
  r = r.slice(), C(r, function(g, p) {
    var y = V(g) ? g : r[p] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = p, c = d(y)), i[y.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  C(r, function(g, p) {
    var y = g.name, m = d(g);
    if (h == null) {
      var _ = v.valueWayDim;
      f(i[y], _, m), f(o, _, m), v.valueWayDim += m;
    } else if (h === p)
      f(i[y], 0, m), f(a, 0, m);
    else {
      var _ = v.categoryWayDim;
      f(i[y], _, m), f(o, _, m), v.categoryWayDim += m;
    }
  });
  function f(g, p, y) {
    for (var m = 0; m < y; m++)
      g.push(p + m);
  }
  function d(g) {
    var p = g.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function Nm(r) {
  var t = r.get("data", !0);
  if (!t)
    return oo(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, Le).models[0];
}
function WT(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : oo(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, Le).models;
}
function Bm(r, t) {
  return UT(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function UT(r, t, e, i, n, a) {
  var o, s = 5;
  if (te(r))
    return ne.Not;
  var l, u;
  if (i) {
    var h = i[a];
    V(h) ? (l = h.name, u = h.type) : H(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? ne.Must : ne.Not;
  if (t === ee) {
    var c = r;
    if (e === Fn) {
      for (var v = c[a], f = 0; f < (v || []).length && f < s; f++)
        if ((o = b(v[n + f])) != null)
          return o;
    } else
      for (var f = 0; f < c.length && f < s; f++) {
        var d = c[n + f];
        if (d && (o = b(d[a])) != null)
          return o;
      }
  } else if (t === rr) {
    var g = r;
    if (!l)
      return ne.Not;
    for (var f = 0; f < g.length && f < s; f++) {
      var p = g[f];
      if (p && (o = b(p[l])) != null)
        return o;
    }
  } else if (t === xr) {
    var y = r;
    if (!l)
      return ne.Not;
    var v = y[l];
    if (!v || te(v))
      return ne.Not;
    for (var f = 0; f < v.length && f < s; f++)
      if ((o = b(v[f])) != null)
        return o;
  } else if (t === Se)
    for (var m = r, f = 0; f < m.length && f < s; f++) {
      var p = m[f], _ = ao(p);
      if (!z(_))
        return ne.Not;
      if ((o = b(_[a])) != null)
        return o;
    }
  function b(S) {
    var w = H(S);
    if (S != null && Number.isFinite(Number(S)) && S !== "")
      return w ? ne.Might : ne.Not;
    if (w && S !== "-")
      return ne.Must;
  }
  return ne.Not;
}
var YT = j();
function XT(r, t, e) {
  var i = YT.get(t);
  if (!i)
    return e;
  var n = i(r);
  return n ? e.concat(n) : e;
}
var _d = It();
It();
var uf = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Rt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return ZT(this, _d, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      KT(this, _d);
    }, r;
  }()
);
function qT(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function ZT(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var h = o == null || !i ? e : qT(i, o);
  if (h = h || e, !(!h || !h.length)) {
    var c = h[l];
    return n && (u[n] = c), s.paletteIdx = (l + 1) % h.length, c;
  }
}
function KT(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var Oo, Jn, bd, wd = "\0_ec_inner", QT = 1, hf = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new xt(a), this._locale = new xt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      var a = Td(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, Td(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        !this.option || e === "recreate" ? bd(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
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
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = j(), u = i && i.replaceMergeMainTypeMap;
      VT(this), C(e, function(c, v) {
        c != null && (ht.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? X(c) : nt(n[v], c, !0));
      }), u && u.each(function(c, v) {
        ht.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), ht.topologicalTravel(s, ht.getAllClassMainTypes(), h, this);
      function h(c) {
        var v = XT(this, c, Rt(e[c])), f = a.get(c), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          f ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = Gw(f, v, d);
        Kw(g, c, ht), n[c] = null, a.set(c, null), o.set(c, 0);
        var p = [], y = [], m = 0, _;
        C(g, function(b, S) {
          var w = b.existing, x = b.newOption;
          if (!x)
            w && (w.mergeOption({}, this), w.optionUpdated({}, !1));
          else {
            var M = c === "series", D = ht.getClass(
              c,
              b.keyInfo.subType,
              !M
              // Give a more detailed warn later if series don't exists
            );
            if (!D)
              return;
            if (c === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (w && w.constructor === D)
              w.name = b.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              var A = N({
                componentIndex: S
              }, b.keyInfo);
              w = new D(x, this, this, A), N(w, A), b.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (p.push(w.option), y.push(w), m++) : (p.push(void 0), y.push(void 0));
        }, this), n[c] = p, a.set(c, y), o.set(c, m), c === "series" && Oo(this);
      }
      this._seriesIndices || Oo(this);
    }, t.prototype.getOption = function() {
      var e = X(this.option);
      return C(e, function(i, n) {
        if (ht.hasClass(n)) {
          for (var a = Rt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Ha(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[wd], e;
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
      return n != null ? (l = [], C(Rt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Sd("id", a, s) : o != null ? l = Sd("name", o, s) : l = Pt(s, function(u) {
        return !!u;
      }), xd(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : Pt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(xd(o, e));
      function s(u) {
        var h = n + "Index", c = n + "Id", v = n + "Name";
        return u && (u[h] != null || u[c] != null || u[v] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[h],
          id: u[c],
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
        a.each(function(c, v) {
          for (var f = 0; c && f < c.length; f++) {
            var d = c[f];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = H(e) ? a.get(e) : V(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && i.call(n, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = $e(e, null);
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
      Jn(this), C(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      C(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      Jn(this), C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return C(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return Jn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      Jn(this);
      var n = [];
      C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = j(n);
    }, t.prototype.restoreData = function(e) {
      Oo(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        ht.hasClass(o) && n.push(o);
      }), ht.topologicalTravel(n, ht.getAllClassMainTypes(), function(a) {
        C(i.get(a), function(o) {
          o && (a !== "series" || !jT(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      Oo = function(e) {
        var i = e._seriesIndices = [];
        C(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = j(i);
      }, Jn = function(e) {
      }, bd = function(e, i) {
        e.option = {}, e.option[wd] = QT, e._componentsMap = j({
          series: []
        }), e._componentsCount = j();
        var n = i.aria;
        V(n) && n.enabled == null && (n.enabled = !0), JT(i, e._theme.option), nt(i, HT, !1), e._mergeOption(i, null);
      };
    }(), t;
  }(xt)
);
function jT(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function JT(r, t) {
  var e = r.color && !r.colorLayer;
  C(t, function(i, n) {
    n === "colorLayer" && e || ht.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? nt(r[n], i, !1) : X(i) : r[n] == null && (r[n] = i));
  });
}
function Sd(r, t, e) {
  if (z(t)) {
    var i = j();
    return C(t, function(a) {
      if (a != null) {
        var o = $e(a, null);
        o != null && i.set(a, !0);
      }
    }), Pt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = $e(t, null);
    return Pt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function xd(r, t) {
  return t.hasOwnProperty("subType") ? Pt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function Td(r) {
  var t = j();
  return r && C(Rt(r.replaceMerge), function(e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Je(hf, uf);
var tC = [
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
], zm = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      C(tC, function(e) {
        this[e] = J(t[e], t);
      }, this);
    }
    return r;
  }()
), Au = {}, Cl = (
  /** @class */
  function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      C(Au, function(n, a) {
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
      Au[t] = e;
    }, r.get = function(t) {
      return Au[t];
    }, r;
  }()
), eC = /^(min|max)?(.+)$/, rC = (
  /** @class */
  function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (C(Rt(t.series), function(o) {
        o && o.data && te(o.data) && fh(o.data);
      }), C(Rt(t.dataset), function(o) {
        o && o.source && te(o.source) && fh(o.source);
      })), t = X(t);
      var n = this._optionBackup, a = iC(t, e, !n);
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
        nC(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !oC(o, this._currentMediaIndices) && (s = U(o, function(h) {
        return X(h === -1 ? a.option : n[h].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  }()
);
function iC(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, h = !!r.media, c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || h) && (r.options = r.media = null), a = r), h && z(u) && C(u, function(f) {
    f && f.option && (f.query ? i.push(f) : n || (n = f));
  }), v(a), C(l, function(f) {
    return v(f);
  }), C(i, function(f) {
    return v(f.option);
  });
  function v(f) {
    C(t, function(d) {
      d(f, e);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function nC(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return C(r, function(a, o) {
    var s = o.match(eC);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      aC(i[u], a, l) || (n = !1);
    }
  }), n;
}
function aC(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function oC(r, t) {
  return r.join(",") === t.join(",");
}
var Te = C, Xa = V, Cd = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Iu(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = Cd.length; e < i; e++) {
      var n = Cd[e], a = t.normal, o = t.emphasis;
      a && a[n] && (r[n] = r[n] || {}, r[n].normal ? nt(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (r[n] = r[n] || {}, r[n].emphasis ? nt(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function Nt(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (e ? (r[t].normal = r[t].emphasis = null, ut(r[t], i)) : r[t] = i), n && (r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function ma(r) {
  Nt(r, "itemStyle"), Nt(r, "lineStyle"), Nt(r, "areaStyle"), Nt(r, "label"), Nt(r, "labelLine"), Nt(r, "upperLabel"), Nt(r, "edgeLabel");
}
function Tt(r, t) {
  var e = Xa(r) && r[t], i = Xa(e) && e.textStyle;
  if (i)
    for (var n = 0, a = Dv.length; n < a; n++) {
      var o = Dv[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
}
function fe(r) {
  r && (ma(r), Tt(r, "label"), r.emphasis && Tt(r.emphasis, "label"));
}
function sC(r) {
  if (Xa(r)) {
    Iu(r), ma(r), Tt(r, "label"), Tt(r, "upperLabel"), Tt(r, "edgeLabel"), r.emphasis && (Tt(r.emphasis, "label"), Tt(r.emphasis, "upperLabel"), Tt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (Iu(t), fe(t));
    var e = r.markLine;
    e && (Iu(e), fe(e));
    var i = r.markArea;
    i && fe(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !te(a))
        for (var o = 0; o < a.length; o++)
          fe(a[o]);
      C(r.categories, function(u) {
        ma(u);
      });
    }
    if (n && !te(n))
      for (var o = 0; o < n.length; o++)
        fe(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        fe(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        z(l[o]) ? (fe(l[o][0]), fe(l[o][1])) : fe(l[o]);
    r.type === "gauge" ? (Tt(r, "axisLabel"), Tt(r, "title"), Tt(r, "detail")) : r.type === "treemap" ? (Nt(r.breadcrumb, "itemStyle"), C(r.levels, function(u) {
      ma(u);
    })) : r.type === "tree" && ma(r.leaves);
  }
}
function ar(r) {
  return z(r) ? r : r ? [r] : [];
}
function Md(r) {
  return (z(r) ? r[0] : r) || {};
}
function lC(r, t) {
  Te(ar(r.series), function(i) {
    Xa(i) && sC(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Te(e, function(i) {
    Te(ar(r[i]), function(n) {
      n && (Tt(n, "axisLabel"), Tt(n.axisPointer, "label"));
    });
  }), Te(ar(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    Tt(n, "axisLabel"), Tt(n && n.axisPointer, "label");
  }), Te(ar(r.calendar), function(i) {
    Nt(i, "itemStyle"), Tt(i, "dayLabel"), Tt(i, "monthLabel"), Tt(i, "yearLabel");
  }), Te(ar(r.radar), function(i) {
    Tt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), Te(ar(r.geo), function(i) {
    Xa(i) && (fe(i), Te(ar(i.regions), function(n) {
      fe(n);
    }));
  }), Te(ar(r.timeline), function(i) {
    fe(i), Nt(i, "label"), Nt(i, "itemStyle"), Nt(i, "controlStyle", !0);
    var n = i.data;
    z(n) && C(n, function(a) {
      V(a) && (Nt(a, "label"), Nt(a, "itemStyle"));
    });
  }), Te(ar(r.toolbox), function(i) {
    Nt(i, "iconStyle"), Te(i.feature, function(n) {
      Nt(n, "iconStyle");
    });
  }), Tt(Md(r.axisPointer), "label"), Tt(Md(r.tooltip).axisPointer, "label");
}
function uC(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function hC(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function Dd(r) {
  r && C(cC, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var cC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], fC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Lu = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function ta(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < Lu.length; e++) {
      var i = Lu[e][1], n = Lu[e][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Ad(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (r.edgeDistance = r.margin);
}
function Id(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay);
}
function vC(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (r.emphasis.focus = "adjacency"));
}
function Fm(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && Fm(r[e].children, t);
}
function Hm(r, t) {
  lC(r, t), r.series = Rt(r.series), C(r.series, function(e) {
    if (V(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise), Ad(e.label);
        var n = e.data;
        if (n && !te(n))
          for (var a = 0; a < n.length; a++)
            Ad(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = uC(e, "pointer.color");
        o != null && hC(e, "itemStyle.color", o);
      } else if (i === "bar") {
        ta(e), ta(e.backgroundStyle), ta(e.emphasis);
        var n = e.data;
        if (n && !te(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (ta(n[a]), ta(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s)), Id(e), Fm(e.data, Id);
      } else i === "graph" || i === "sankey" ? vC(e) : i === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && ut(e, e.mapLocation));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), Dd(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), C(fC, function(e) {
    var i = r[e];
    i && (z(i) || (i = [i]), C(i, function(n) {
      Dd(n);
    }));
  });
}
function dC(r) {
  var t = j();
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
  }), t.each(pC);
}
function pC(r) {
  C(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, c) {
      var v = o.get(t.stackedDimension, c);
      if (isNaN(v))
        return n;
      var f, d;
      s ? d = o.getRawIndex(c) : f = o.get(t.stackedByDimension, c);
      for (var g = NaN, p = e - 1; p >= 0; p--) {
        var y = r[p];
        if (s || (d = y.data.rawIndexOf(y.stackedByDimension, f)), d >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = Nw(v, m), g = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = g, i;
    });
  });
}
var Ml = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === xr ? {} : []), this.sourceFormat = t.sourceFormat || Em, this.seriesLayoutBy = t.seriesLayoutBy || fr, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && Bm(this, i) === ne.Must && (n.type = "ordinal");
        }
    }
    return r;
  }()
);
function cf(r) {
  return r instanceof Ml;
}
function Hh(r, t, e) {
  e = e || Gm(r);
  var i = t.seriesLayoutBy, n = yC(r, e, i, t.sourceHeader, t.dimensions), a = new Ml({
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
function Vm(r) {
  return new Ml({
    data: r,
    sourceFormat: te(r) ? Vr : Se
  });
}
function gC(r) {
  return new Ml({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: X(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function Gm(r) {
  var t = Em;
  if (te(r))
    t = Vr;
  else if (z(r)) {
    r.length === 0 && (t = ee);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if (z(n) || te(n)) {
          t = ee;
          break;
        } else if (V(n)) {
          t = rr;
          break;
        }
      }
    }
  } else if (V(r)) {
    for (var a in r)
      if (Pi(r, a) && Jt(r[a])) {
        t = xr;
        break;
      }
  }
  return t;
}
function yC(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: Ld(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === ee) {
    var s = r;
    i === "auto" || i == null ? Pd(function(u) {
      u != null && u !== "-" && (H(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = yt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Pd(function(u, h) {
      n[h] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === Fn ? s.length : s[0] ? s[0].length : null;
  } else if (t === rr)
    n || (n = mC(r));
  else if (t === xr)
    n || (n = [], C(r, function(u, h) {
      n.push(h);
    }));
  else if (t === Se) {
    var l = ao(r[0]);
    a = z(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Ld(n),
    dimensionsDetectedCount: a
  };
}
function mC(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return gt(e);
}
function Ld(r) {
  if (r) {
    var t = j();
    return U(r, function(e, i) {
      e = V(e) ? e : {
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
function Pd(r, t, e, i) {
  if (t === Fn)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function Wm(r) {
  var t = r.sourceFormat;
  return t === rr || t === xr;
}
var vi, di, pi, $d, Rd, Um = (
  /** @class */
  function() {
    function r(t, e) {
      var i = cf(t) ? t : Vm(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === Vr && (this._offset = 0, this._dimSize = e, this._data = n), Rd(this, n, i);
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
      Rd = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, c = l.startIndex, v = l.dimensionsDefine, f = $d[ff(u, h)];
        if (N(o, f), u === Vr)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var d = Ym(u, h);
          o.getItem = J(d, null, s, c, v);
          var g = Xm(u, h);
          o.count = J(g, null, s, c, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, h = u * o, c = 0; c < u; c++)
          s[c] = l[h + c];
        return s;
      }, i = function(o, s, l, u) {
        for (var h = this._data, c = this._dimSize, v = 0; v < c; v++) {
          for (var f = u[v], d = f[0] == null ? 1 / 0 : f[0], g = f[1] == null ? -1 / 0 : f[1], p = s - o, y = l[v], m = 0; m < p; m++) {
            var _ = h[m * c + v];
            y[o + m] = _, _ < d && (d = _), _ > g && (g = _);
          }
          f[0] = d, f[1] = g;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      $d = (t = {}, t[ee + "_" + fr] = {
        pure: !0,
        appendData: a
      }, t[ee + "_" + Fn] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[rr] = {
        pure: !0,
        appendData: a
      }, t[xr] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          C(o, function(l, u) {
            for (var h = s[u] || (s[u] = []), c = 0; c < (l || []).length; c++)
              h.push(l[c]);
          });
        }
      }, t[Se] = {
        appendData: a
      }, t[Vr] = {
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
), Od = function(r, t, e, i) {
  return r[i];
}, _C = (vi = {}, vi[ee + "_" + fr] = function(r, t, e, i) {
  return r[i + t];
}, vi[ee + "_" + Fn] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, vi[rr] = Od, vi[xr] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name, l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, vi[Se] = Od, vi);
function Ym(r, t) {
  var e = _C[ff(r, t)];
  return e;
}
var Ed = function(r, t, e) {
  return r.length;
}, bC = (di = {}, di[ee + "_" + fr] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, di[ee + "_" + Fn] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, di[rr] = Ed, di[xr] = function(r, t, e) {
  var i = e[0].name, n = r[i];
  return n ? n.length : 0;
}, di[Se] = Ed, di);
function Xm(r, t) {
  var e = bC[ff(r, t)];
  return e;
}
var Pu = function(r, t, e) {
  return r[t];
}, wC = (pi = {}, pi[ee] = Pu, pi[rr] = function(r, t, e) {
  return r[e];
}, pi[xr] = Pu, pi[Se] = function(r, t, e) {
  var i = ao(r);
  return i instanceof Array ? i[t] : i;
}, pi[Vr] = Pu, pi);
function qm(r) {
  var t = wC[r];
  return t;
}
function ff(r, t) {
  return r === ee ? r + "_" + t : r;
}
function Pn(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return qm(a)(i, o, s);
      } else {
        var l = i;
        return a === Se && (l = ao(i)), l;
      }
    }
  }
}
var SC = /\{@(.+?)\}/g, xC = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getDataParams = function(t, e) {
      var i = this.getData(e), n = this.getRawValue(t, e), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], h = l && l.stroke, c = this.mainType, v = c === "series", f = i.userOutput && i.userOutput.get();
      return {
        componentType: c,
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
        dimensionNames: f ? f.fullDimensions : null,
        encode: f ? f.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, r.prototype.getFormattedLabel = function(t, e, i, n, a, o) {
      e = e || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && z(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (q(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if (H(a)) {
        var h = $m(a, l);
        return h.replace(SC, function(c, v) {
          var f = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(f - 1) === "]" && (d = +d.slice(1, f - 1));
          var g = Pn(s, t, d);
          if (o && z(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return Pn(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  }()
);
function kd(r) {
  var t, e;
  return V(r) ? r.type && (e = r) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function Ia(r) {
  return new TC(r);
}
var TC = (
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
      var c;
      (this._dirty || a === "reset") && (this._dirty = !1, c = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (e ? this._dueEnd = e._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var f = this._dueIndex, d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (c || f < d)) {
          var g = this._progress;
          if (z(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], f, d, l, u);
          else
            this._doProgress(g, f, d, l, u);
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
      Nd.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: Nd.next
      }, this.context);
    }, r.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var e, i;
      !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), z(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
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
), Nd = /* @__PURE__ */ function() {
  var r, t, e, i, n, a = {
    reset: function(l, u, h, c) {
      t = l, r = u, e = h, i = c, n = Math.ceil(i / e), a.next = e > 1 && i > 0 ? s : o;
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
function ps(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !yt(r) && r != null && r !== "-" && (r = +dr(r)), r == null || r === "" ? NaN : Number(r));
}
j({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +dr(r);
  },
  trim: function(r) {
    return H(r) ? We(r) : r;
  }
});
var CC = (
  /** @class */
  function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = yt(t) ? t : Os(t), n = yt(e) ? e : Os(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = H(t), l = H(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  }()
), MC = (
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
      return ps(t, e);
    }, r;
  }()
);
function DC(r, t) {
  var e = new MC(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== fr && Qt(o);
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    C(u, function(g, p) {
      var y = g.name, m = {
        index: p,
        name: y,
        displayName: g.displayName
      };
      if (s.push(m), y != null) {
        var _ = "";
        Pi(l, y) && Qt(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < r.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var c = Ym(n, fr);
  t.__isBuiltIn && (e.getRawDataItem = function(g) {
    return c(i, a, s, g);
  }, e.getRawData = J(AC, null, r)), e.cloneRawData = J(IC, null, r);
  var v = Xm(n, fr);
  e.count = J(v, null, i, a, s);
  var f = qm(n);
  e.retrieveValue = function(g, p) {
    var y = c(i, a, s, g);
    return d(y, p);
  };
  var d = e.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var y = s[p];
      if (y)
        return f(g, p, y.name);
    }
  };
  return e.getDimensionInfo = J(LC, null, s, l), e.cloneAllDimensionInfo = J(PC, null, s), e;
}
function AC(r) {
  var t = r.sourceFormat;
  if (!vf(t)) {
    var e = "";
    Qt(e);
  }
  return r.data;
}
function IC(r) {
  var t = r.sourceFormat, e = r.data;
  if (!vf(t)) {
    var i = "";
    Qt(i);
  }
  if (t === ee) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === rr) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(N({}, e[a]));
    return n;
  }
}
function LC(r, t, e) {
  if (e != null) {
    if (yt(e) || !isNaN(e) && !Pi(t, e))
      return r[e];
    if (Pi(t, e))
      return t[e];
  }
}
function PC(r) {
  return X(r);
}
var Zm = j();
function $C(r) {
  r = X(r);
  var t = r.type, e = "";
  t || Qt(e);
  var i = t.split(":");
  i.length !== 2 && Qt(e);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, Zm.set(t, r);
}
function RC(r, t, e) {
  var i = Rt(r), n = i.length, a = "";
  n || Qt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = OC(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function OC(r, t, e, i) {
  var n = "";
  t.length || Qt(n), V(r) || Qt(n);
  var a = r.type, o = Zm.get(a);
  o || Qt(n);
  var s = U(t, function(u) {
    return DC(u, o);
  }), l = Rt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: X(r.config)
  }));
  return U(l, function(u, h) {
    var c = "";
    V(u) || Qt(c), u.data || Qt(c);
    var v = Gm(u.data);
    vf(v) || Qt(c);
    var f, d = t[0];
    if (d && h === 0 && !u.dimensions) {
      var g = d.startIndex;
      g && (u.data = d.data.slice(0, g).concat(u.data)), f = {
        seriesLayoutBy: fr,
        sourceHeader: g,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      f = {
        seriesLayoutBy: fr,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Hh(u.data, f, null);
  });
}
function vf(r) {
  return r === ee || r === rr;
}
var Dl = "undefined", EC = typeof Uint32Array === Dl ? Array : Uint32Array, kC = typeof Uint16Array === Dl ? Array : Uint16Array, Km = typeof Int32Array === Dl ? Array : Int32Array, Bd = typeof Float64Array === Dl ? Array : Float64Array, Qm = {
  float: Bd,
  int: Km,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Bd
}, $u;
function ji(r) {
  return r > 65535 ? EC : kC;
}
function Ji() {
  return [1 / 0, -1 / 0];
}
function NC(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function zd(r, t, e, i, n) {
  var a = Qm[e || "float"];
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
var Vh = (
  /** @class */
  function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = j();
    }
    return r.prototype.initData = function(t, e, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = $u[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], Wm(n), this._dimensions = U(e, function(o) {
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
      }, i.set(t, a), this._chunks[a] = new Qm[e || "float"](this._rawCount), this._rawExtent[a] = Ji(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Ji());
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
        zd(i, u, h.type, l, !0);
      }
      for (var c = [], v = s; v < l; v++)
        for (var f = v - s, d = 0; d < a; d++) {
          var h = n[d], g = $u.arrayRows.call(this, t[f] || c, h.property, f, d);
          i[d][v] = g;
          var p = o[d];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = U(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var c = o[h];
        l[h] || (l[h] = Ji()), zd(a, h, c.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], f = t; f < e; f++) {
          v = n.getItem(f, v);
          for (var d = 0; d < s; d++) {
            var g = a[d], p = this._dimValueGetter(v, u[d], f, d);
            g[f] = p;
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
      for (var s = 1 / 0, l = -1, u = 0, h = 0, c = this.count(); h < c; h++) {
        var v = this.getRawIndex(h), f = e - a[v], d = Math.abs(f);
        d <= i && ((d < s || d === s && f >= 0 && l < 0) && (s = d, l = f, u = 0), f === l && (o[u++] = h));
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
        var i = ji(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = ji(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, h = t[0], c = i._chunks, v = 0; v < n; v++) {
        var f = void 0, d = i.getRawIndex(v);
        if (l === 0)
          f = e(v);
        else if (l === 1) {
          var g = c[h][d];
          f = e(g, v);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = c[t[p]][d];
          s[p] = v, f = e.apply(null, s);
        }
        f && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = gt(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = ji(e._rawCount), l = new s(o), u = 0, h = n[0], c = t[h][0], v = t[h][1], f = e._chunks, d = !1;
      if (!e._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = f[n[0]], y = 0; y < i; y++) {
            var m = p[y];
            (m >= c && m <= v || isNaN(m)) && (l[u++] = g), g++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = f[n[0]], _ = f[n[1]], b = t[n[1]][0], S = t[n[1]][1], y = 0; y < i; y++) {
            var m = p[y], w = _[y];
            (m >= c && m <= v || isNaN(m)) && (w >= b && w <= S || isNaN(w)) && (l[u++] = g), g++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = e.getRawIndex(y), m = f[n[0]][x];
            (m >= c && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var M = !0, x = e.getRawIndex(y), D = 0; D < a; D++) {
              var A = n[D], m = f[A][x];
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
        u[e[h]] = Ji();
      for (var c = 0; c < s; c++) {
        for (var v = t.getRawIndex(c), f = 0; f < o; f++)
          l[f] = n[e[f]][v];
        l[o] = c;
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
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), h, c, v, f = new (ji(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      f[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var g = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), y = (p + g) / 2, m = 0, _ = g; _ < p; _++) {
          var b = this.getRawIndex(_), S = a[b];
          isNaN(S) || (m += S);
        }
        m /= p - g;
        var w = d, x = Math.min(d + l, o), M = d - 1, D = a[u];
        h = -1, v = w;
        for (var A = -1, T = 0, _ = w; _ < x; _++) {
          var b = this.getRawIndex(_), S = a[b];
          if (isNaN(S)) {
            T++, A < 0 && (A = b);
            continue;
          }
          c = Math.abs((M - y) * (S - D) - (M - _) * (m - D)), c > h && (h = c, v = b);
        }
        T > 0 && T < x - w && (f[s++] = Math.min(A, v), v = Math.max(A, v)), f[s++] = v, u = v;
      }
      return f[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = f, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (ji(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var c = h, v = o[this.getRawIndex(c)], f = h, d = o[this.getRawIndex(f)], g = a;
        h + a > s && (g = s - h);
        for (var p = 0; p < g; p++) {
          var y = this.getRawIndex(h + p), m = o[y];
          m < v && (v = m, c = h + p), m > d && (d = m, f = h + p);
        }
        var _ = this.getRawIndex(c), b = this.getRawIndex(f);
        c < f ? (l[u++] = _, l[u++] = b) : (l[u++] = b, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], h = this.count(), c = a._rawExtent[t] = Ji(), v = new (ji(this._rawCount))(Math.ceil(h / l)), f = 0, d = 0; d < h; d += l) {
        l > h - d && (l = h - d, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(d + g);
          s[g] = u[p];
        }
        var y = i(s), m = this.getRawIndex(Math.min(d + n(s, y) || 0, h - 1));
        u[m] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), v[f++] = m;
      }
      return a._count = f, a._indices = v, a._updateGetRawIdx(), a;
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
      var e = this._chunks[t], i = Ji();
      if (!e)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var h = this.getRawIndex(u), c = e[h];
        c < s && (s = c), c > l && (l = c);
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
      var i = new r(), n = this._chunks, a = t && Nn(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? NC(n[o]) : n[o];
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
        return ps(e[a], this._dimensions[a]);
      }
      $u = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return ps(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return ps(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    }(), r;
  }()
), BC = (
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
      if (Eo(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var h = e[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = te(s) ? Vr : Se, a = [];
        var c = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, f = tt(c.seriesLayoutBy, v.seriesLayoutBy) || null, d = tt(c.sourceHeader, v.sourceHeader), g = tt(c.dimensions, v.dimensions), p = f !== v.seriesLayoutBy || !!d != !!v.sourceHeader || g;
        n = p ? [Hh(s, {
          seriesLayoutBy: f,
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
          n = [Hh(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Fd(a);
      }
      var o, s = [], l = [];
      return C(t, function(u) {
        u.prepareSource();
        var h = u.getSource(n || 0), c = "";
        n != null && !h && Fd(c), s.push(h), l.push(u._getVersionSign());
      }), i ? o = RC(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [gC(s[0])]), {
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
        Eo(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new Vh(), s.initData(new Um(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Eo(t)) {
        var e = Nm(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return U(WT(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (Eo(t))
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
function Eo(r) {
  return r.mainType === "series";
}
function Fd(r) {
  throw new Error(r);
}
var zC = "line-height:1";
function jm(r) {
  var t = r.lineHeight;
  return t == null ? zC : "line-height:" + Zt(t + "") + "px";
}
function Jm(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Zt(i + "") + "px;color:" + Zt(e) + ";font-weight:" + Zt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Zt(o + "") + "px;color:" + Zt(a) + ";font-weight:" + Zt(s + "")
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
var FC = [0, 10, 20, 30], HC = ["", `
`, `

`, `


`];
function qa(r, t) {
  return t.type = r, t;
}
function Gh(r) {
  return r.type === "section";
}
function t0(r) {
  return Gh(r) ? VC : GC;
}
function e0(r) {
  if (Gh(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return C(r.blocks, function(n) {
      var a = e0(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Gh(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function VC(r, t, e, i) {
  var n = t.noHeader, a = WC(e0(t)), o = [], s = t.blocks || [];
  Xe(!s || z(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Pi(u, l)) {
      var h = new CC(u[l], null);
      s.sort(function(g, p) {
        return h.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  C(s, function(g, p) {
    var y = t.valueFormatter, m = t0(g)(
      // Inherit valueFormatter
      y ? N(N({}, r), {
        valueFormatter: y
      }) : r,
      g,
      p > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var c = r.renderMode === "richText" ? o.join(a.richText) : Wh(i, o.join(""), n ? e : a.html);
  if (n)
    return c;
  var v = Fh(t.header, "ordinal", r.useUTC), f = Jm(i, r.renderMode).nameStyle, d = jm(i);
  return r.renderMode === "richText" ? r0(r, v, f) + a.richText + c : Wh(i, '<div style="' + f + ";" + d + ';">' + Zt(v) + "</div>" + c, e);
}
function GC(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, h = t.valueFormatter || r.valueFormatter || function(b) {
    return b = z(b) ? b : [b], U(b, function(S, w) {
      return Fh(S, z(f) ? f[w] : f, u);
    });
  };
  if (!(a && o)) {
    var c = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : Fh(l, "ordinal", u), f = t.valueType, d = o ? [] : h(t.value, t.dataIndex), g = !s || !a, p = !s && a, y = Jm(i, n), m = y.nameStyle, _ = y.valueStyle;
    return n === "richText" ? (s ? "" : c) + (a ? "" : r0(r, v, m)) + (o ? "" : XC(r, d, g, p, _)) : Wh(i, (s ? "" : c) + (a ? "" : UC(v, !s, m)) + (o ? "" : YC(d, g, p, _)), e);
  }
}
function Hd(r, t, e, i, n, a) {
  if (r) {
    var o = t0(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function WC(r) {
  return {
    html: FC[r],
    richText: HC[r]
  };
}
function Wh(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = jm(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function UC(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + Zt(r) + "</span>";
}
function YC(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = z(r) ? r : [r], '<span style="' + a + ";" + i + '">' + U(r, function(o) {
    return Zt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function r0(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function XC(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle(z(t) ? t.join("  ") : t, a);
}
function qC(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return Oi(i);
}
function i0(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var Ru = (
  /** @class */
  function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = Ey();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = ET({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return H(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      z(e) ? C(e, function(a) {
        return N(i, a);
      }) : N(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  }()
);
function ZC(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = z(s), u = qC(t, e), h, c, v, f;
  if (o > 1 || l && !o) {
    var d = KC(s, t, e, a, u);
    h = d.inlineValues, c = d.inlineValueTypes, v = d.blocks, f = d.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    f = h = Pn(n, e, a[0]), c = g.type;
  } else
    f = h = l ? s[0] : s;
  var p = Fc(t), y = p && t.name || "", m = n.getName(e), _ = i ? y : m;
  return qa("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: f,
    blocks: [qa("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !We(_),
      value: h,
      valueType: c,
      dataIndex: e
    })].concat(v || [])
  });
}
function KC(r, t, e, i, n) {
  var a = t.getData(), o = Nn(r, function(c, v, f) {
    var d = a.getDimensionInfo(f);
    return c = c || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? C(i, function(c) {
    h(Pn(a, e, c), c);
  }) : C(r, h);
  function h(c, v) {
    var f = a.getDimensionInfo(v);
    !f || f.otherDims.tooltip === !1 || (o ? u.push(qa("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: f.displayName,
      value: c,
      valueType: f.type
    })) : (s.push(c), l.push(f.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Ar = It();
function ko(r, t) {
  return r.getName(t) || r.getId(t);
}
var QC = "__universalTransitionEnabled", Re = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Ia({
        count: JC,
        reset: tM
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = Ar(this).sourceManager = new BC(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      Gd(o, this), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Vd(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Ya(this), a = n ? Tl(e) : {}, o = this.subType;
      ht.hasClass(o) && (o += "Series"), nt(e, i.getTheme().get(this.subType)), nt(e, this.getDefaultOption()), Mv(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Ln(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = nt(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = Ya(this);
      n && Ln(this.option, e, n);
      var a = Ar(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      Gd(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Vd(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !te(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && Mv(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Uh(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return Ar(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = Uh(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      Ar(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return j(e);
    }, t.prototype.getSourceManager = function() {
      return Ar(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Ar(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return ZC({
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
      var a = this.ecModel, o = uf.prototype.getColorFromPalette.call(this, e, i, n);
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
          var l = e[s], u = ko(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = gt(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[ko(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[QC])
        return !0;
      var e = this.option.universalTransition;
      return e ? e === !0 ? !0 : e && e.enabled : !1;
    }, t.prototype._innerSelect = function(e, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          V(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, h = 0; h < l; h++) {
            var c = i[h], v = ko(e, c);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(c);
          }
        } else if (s === "single" || s === !0) {
          var f = i[l - 1], v = ko(e, f);
          o.selectedMap = (n = {}, n[v] = !0, n), this._selectedDataIndicesMap = (a = {}, a[v] = e.getRawIndex(f), a);
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
      return ht.registerClass(e);
    }, t.protoInitialize = function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    }(), t;
  }(ht)
);
Je(Re, xC);
Je(Re, uf);
Hy(Re, ht);
function Vd(r) {
  var t = r.name;
  Fc(r) || (r.name = jC(r) || t);
}
function jC(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return C(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function JC(r) {
  return r.model.getRawData().count();
}
function tM(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), eM;
}
function eM(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Gd(r, t) {
  C(p1(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, Dt(rM, t));
  });
}
function rM(r, t) {
  var e = Uh(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Uh(r) {
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
      this.group = new Ct(), this.uid = yl("viewComponent");
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
Vc(Oe);
al(Oe);
function df() {
  var r = It();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var n0 = It(), iM = df(), be = (
  /** @class */
  function() {
    function r() {
      this.group = new Ct(), this.uid = yl("viewChart"), this.renderTask = Ia({
        plan: nM,
        reset: aM
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Ud(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Ud(a, n, "normal");
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
      lo(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      n0(t).updateMethod = e;
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.type = "chart";
    }(), r;
  }()
);
function Wd(r, t, e) {
  r && Eh(r) && (t === "emphasis" ? ks : Ns)(r, e);
}
function Ud(r, t, e) {
  var i = $i(r, t), n = t && t.highlightKey != null ? bx(t.highlightKey) : null;
  i != null ? C(Rt(i), function(a) {
    Wd(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    Wd(a, e, n);
  });
}
Vc(be);
al(be);
function nM(r) {
  return iM(r.model);
}
function aM(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && n0(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), oM[l];
}
var oM = {
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
}, Gs = "\0__throttleOriginMethod", Yd = "\0__throttleRate", Xd = "\0__throttleType";
function pf(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function c() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var f = [], d = 0; d < arguments.length; d++)
      f[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = f;
    var g = h || t, p = h || e;
    h = null, s = i - (p ? n : a) - g, clearTimeout(o), p ? o = setTimeout(c, g) : s >= 0 ? c() : o = setTimeout(c, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(f) {
    h = f;
  }, v;
}
function a0(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[Gs] || n, o = n[Xd], s = n[Yd];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = pf(a, e, i === "debounce"), n[Gs] = a, n[Xd] = i, n[Yd] = e;
    }
    return n;
  }
}
function Yh(r, t) {
  var e = r[t];
  e && e[Gs] && (e.clear && e.clear(), r[t] = e[Gs]);
}
var qd = It(), Zd = {
  itemStyle: Va(_m, !0),
  lineStyle: Va(mm, !0)
}, sM = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function o0(r, t) {
  var e = r.visualStyleMapper || Zd[t];
  return e || (console.warn("Unknown style type '" + t + "'."), Zd.itemStyle);
}
function s0(r, t) {
  var e = r.visualDrawType || sM[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var lM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = o0(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = s0(r, i), u = o[l], h = q(u) ? u : null, c = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || h || c) {
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
        dataEach: function(f, d) {
          var g = r.getDataParams(d), p = N({}, o);
          p[l] = h(g), f.setItemVisual(d, "style", p);
        }
      };
  }
}, ea = new xt(), uM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = o0(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            ea.option = l[i];
            var u = n(ea), h = o.ensureUniqueItemVisual(s, "style");
            N(h, u), ea.option.decal && (o.setItemVisual(s, "decal", ea.option.decal), ea.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, hM = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = j();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), qd(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = qd(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = s0(e, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          n[h] = u;
        }), i.each(function(u) {
          var h = n[u], c = a.getItemVisual(h, "colorFromPalette");
          if (c) {
            var v = a.ensureUniqueItemVisual(h, "style"), f = i.getName(u) || u + "", d = i.count();
            v[l] = e.getColorFromPalette(f, o, d);
          }
        });
      }
    });
  }
}, No = Math.PI;
function cM(r, t) {
  t = t || {}, ut(t, {
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
  var e = new Ct(), i = new bt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new At({
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
  }), a = new bt({
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
  return t.showSpinner && (o = new vl({
    shape: {
      startAngle: -No / 2,
      endAngle: -No / 2 + 0.1,
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
    endAngle: No * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: No * 3 / 2
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
var l0 = (
  /** @class */
  function() {
    function r(t, e, i, n) {
      this._stageTaskMap = j(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
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
      var e = this, i = e._pipelineMap = j();
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
        Xe(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
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
          var h = o._stageTaskMap.get(l.uid), c = h.seriesTaskMap, v = h.overallTask;
          if (v) {
            var f, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), f = !0);
            }), f && v.dirty(), o.updatePayload(v, i);
            var g = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(g);
            }), v.perform(g) && (a = !0);
          } else c && c.each(function(p, y) {
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
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = j(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : u && u(i, n).each(h);
      function h(c) {
        var v = c.uid, f = s.set(v, o && o.get(v) || Ia({
          plan: gM,
          reset: yM,
          count: _M
        }));
        f.context = {
          model: c,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(c, f);
      }
    }, r.prototype._createOverallStageTask = function(t, e, i, n) {
      var a = this, o = e.overallTask = e.overallTask || Ia({
        reset: fM
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = j(), u = t.seriesType, h = t.getTargetSeries, c = !0, v = !1, f = "";
      Xe(!t.createOnAllSeries, f), u ? i.eachRawSeriesByType(u, d) : h ? h(i, n).each(d) : (c = !1, C(i.getSeries(), d));
      function d(g) {
        var p = g.uid, y = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, Ia({
          reset: vM,
          onDirty: pM
        })));
        y.context = {
          model: g,
          overallProgress: c
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, y.agent = o, y.__block = c, a._pipe(g, y);
      }
      v && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return q(t) && (t = {
        overallReset: t,
        seriesType: bM(t)
      }), t.uid = yl("stageHandler"), e && (t.visualType = e), t;
    }, r;
  }()
);
function fM(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function vM(r) {
  return r.overallProgress && dM;
}
function dM() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function pM() {
  this.agent && this.agent.dirty();
}
function gM(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function yM(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Rt(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? U(t, function(e, i) {
    return u0(i);
  }) : mM;
}
var mM = u0(0);
function u0(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function _M(r) {
  return r.data.count();
}
function bM(r) {
  Ws = null;
  try {
    r(Za, h0);
  } catch {
  }
  return Ws;
}
var Za = {}, h0 = {}, Ws;
c0(Za, hf);
c0(h0, zm);
Za.eachSeriesByType = Za.eachRawSeriesByType = function(r) {
  Ws = r;
};
Za.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Ws = r.subType);
};
function c0(r, t) {
  for (var e in t.prototype)
    r[e] = Wt;
}
var Kd = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const wM = {
  color: Kd,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Kd]
};
var kt = "#B9B8CE", Qd = "#100C2A", Bo = function() {
  return {
    axisLine: {
      lineStyle: {
        color: kt
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
}, jd = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], f0 = {
  darkMode: !0,
  color: jd,
  backgroundColor: Qd,
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
      color: kt
    },
    pageTextStyle: {
      color: kt
    }
  },
  textStyle: {
    color: kt
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
      borderColor: kt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: kt
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
      color: kt
    }
  },
  timeline: {
    lineStyle: {
      color: kt
    },
    label: {
      color: kt
    },
    controlStyle: {
      color: kt,
      borderColor: kt
    }
  },
  calendar: {
    itemStyle: {
      color: Qd
    },
    dayLabel: {
      color: kt
    },
    monthLabel: {
      color: kt
    },
    yearLabel: {
      color: kt
    }
  },
  timeAxis: Bo(),
  logAxis: Bo(),
  valueAxis: Bo(),
  categoryAxis: Bo(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: jd
  },
  gauge: {
    title: {
      color: kt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: kt
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
f0.categoryAxis.splitLine.show = !1;
var SM = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (H(t)) {
        var a = Ue(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        C(t, function(l, u) {
          for (var h = !1, c = 0; c < o.length; c++) {
            var v = o[c], f = u.lastIndexOf(v);
            if (f > 0 && f === u.length - v.length) {
              var d = u.slice(0, f);
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
      function h(c, v, f, d) {
        return c[f] == null || v[d || f] === c[f];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  }()
), Xh = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Jd = Xh.concat(["symbolKeepAspect"]), xM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Xh.length; o++) {
      var s = Xh[o], l = r.get(s);
      q(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(N({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = gt(n);
    function h(c, v) {
      for (var f = r.getRawValue(v), d = r.getDataParams(v), g = 0; g < u.length; g++) {
        var p = u[g];
        c.setItemVisual(v, p, n[p](f, d));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, TM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < Jd.length; s++) {
        var l = Jd[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function v0(r, t, e) {
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
function d0(r, t) {
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
function CM(r, t, e, i) {
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
function tn(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var c = o.getData(), v = $i(c, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: z(v) ? c.getName(v[0]) : c.getName(v),
          selected: H(l) ? l : N({}, l)
        });
      }
  });
}
function MM(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (tn("map", "selectchanged", t, n, i), tn("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (tn("map", "selected", t, n, i), tn("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (tn("map", "unselected", t, n, i), tn("pie", "unselected", t, n, i));
  });
}
function dn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var DM = Math.round(Math.random() * 9), AM = typeof Object.defineProperty == "function", IM = function() {
  function r() {
    this._id = "__ec_inner_" + DM++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return AM ? Object.defineProperty(i, this._id, {
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
}(), LM = ct.extend({
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
}), PM = ct.extend({
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
}), $M = ct.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), v = Math.cos(u), f = o * 0.6, d = o * 0.7;
    r.moveTo(e - h, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + h - c * f, l + s + v * f, e, i - d, e, i), r.bezierCurveTo(e, i - d, e - h + c * f, l + s + v * f, e - h, l + s), r.closePath();
  }
}), RM = ct.extend({
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
}), OM = {
  line: Ur,
  rect: bt,
  roundRect: bt,
  square: bt,
  circle: cl,
  diamond: PM,
  pin: $M,
  arrow: RM,
  triangle: LM
}, EM = {
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
}, qh = {};
C(OM, function(r, t) {
  qh[t] = new r();
});
var kM = ct.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = $s(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = qh[i];
      n || (i = "rect", n = qh[i]), EM[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function NM(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function gr(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = fm(r.slice(8), new lt(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = tf(r.slice(7), {}, new lt(t, e, i, n), o ? "center" : "cover") : l = new kM({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = NM, a && l.setColor(a), l;
}
function BM(r) {
  return z(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function p0(r, t) {
  if (r != null)
    return z(r) || (r = [r, r]), [Vt(r[0], t[0]) || 0, Vt(tt(r[1], r[0]), t[1]) || 0];
}
function xi(r) {
  return isFinite(r);
}
function zM(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = xi(i) ? i : 0, n = xi(n) ? n : 1, a = xi(a) ? a : 0, o = xi(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function FM(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = xi(o) ? o : 0.5, s = xi(s) ? s : 0.5, l = l >= 0 && xi(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Zh(r, t, e) {
  for (var i = t.type === "radial" ? FM(r, t, e) : zM(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function HM(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function zo(r) {
  return parseInt(r, 10);
}
function Fo(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || zo(s[i]) || zo(r.style[i])) - (zo(s[a]) || 0) - (zo(s[o]) || 0) | 0;
}
function VM(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : yt(r) ? [r] : z(r) ? r : null;
}
function g0(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && VM(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = U(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var GM = new Ri(!0);
function Us(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function tp(r) {
  return typeof r == "string" && r !== "none";
}
function Ys(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function ep(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function rp(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Kh(r, t, e) {
  var i = Vy(t.image, t.__image, e);
  if (ol(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * g1), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function WM(r, t, e, i) {
  var n, a = Us(e), o = Ys(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || GM, c = t.__dirty;
  if (!i) {
    var v = e.fill, f = e.stroke, d = o && !!v.colorStops, g = a && !!f.colorStops, p = o && !!v.image, y = a && !!f.image, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0;
    (d || g) && (w = t.getBoundingRect()), d && (m = c ? Zh(r, v, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = c ? Zh(r, f, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (b = c || !t.__canvasFillPattern ? Kh(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = c || !t.__canvasStrokePattern ? Kh(r, f, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), d ? r.fillStyle = m : p && (b ? r.fillStyle = b : o = !1), g ? r.strokeStyle = _ : y && (S ? r.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var M, D;
  r.setLineDash && e.lineDash && (n = g0(t), M = n[0], D = n[1]);
  var A = !0;
  (u || c & ln) && (h.setDPR(r.dpr), l ? h.setContext(null) : (h.setContext(r), A = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), A && h.rebuildPath(r, l ? s : 1), M && (r.setLineDash(M), r.lineDashOffset = D), i || (e.strokeFirst ? (a && rp(r, e), o && ep(r, e)) : (o && ep(r, e), a && rp(r, e))), M && r.setLineDash([]);
}
function UM(r, t, e) {
  var i = t.__image = Vy(e.image, t.__image, t, t.onload);
  if (!(!i || !ol(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var u = e.sx || 0, h = e.sy || 0;
      r.drawImage(i, u, h, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var u = e.sx, h = e.sy, c = o - u, v = s - h;
      r.drawImage(i, u, h, c, v, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function YM(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || Li, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = g0(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (Us(e) && r.strokeText(n, e.x, e.y), Ys(e) && r.fillText(n, e.x, e.y)) : (Ys(e) && r.fillText(n, e.x, e.y), Us(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var ip = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], np = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function y0(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    jt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? Mi.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (jt(r, n), a = !0), r.globalCompositeOperation = t.blend || Mi.blend);
  for (var s = 0; s < ip.length; s++) {
    var l = ip[s];
    (i || t[l] !== e[l]) && (a || (jt(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (jt(r, n), a = !0), r.shadowColor = t.shadowColor || Mi.shadowColor), a;
}
function ap(r, t, e, i, n) {
  var a = Ka(t, n.inHover), o = i ? null : e && Ka(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = y0(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (jt(r, n), s = !0), tp(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (jt(r, n), s = !0), tp(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (jt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (jt(r, n), s = !0), r.lineWidth = u);
  }
  for (var h = 0; h < np.length; h++) {
    var c = np[h], v = c[0];
    (i || a[v] !== o[v]) && (s || (jt(r, n), s = !0), r[v] = a[v] || c[1]);
  }
  return s;
}
function XM(r, t, e, i, n) {
  return y0(r, Ka(t, n.inHover), e && Ka(e, n.inHover), i, n);
}
function m0(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function qM(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), m0(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function ZM(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var op = 1, sp = 2, lp = 3, up = 4;
function KM(r) {
  var t = Ys(r), e = Us(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function jt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Ka(r, t) {
  return t && r.__hoverStyle || r.style;
}
function _0(r, t) {
  Ti(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Ti(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~ae, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || HM(a, o)) && (o && o.length && (jt(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (jt(r, e), r.save(), qM(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var h = t instanceof ct && t.autoBatch && KM(t.style);
  s || ZM(n, u.transform) ? (jt(r, e), m0(r, t)) : h || jt(r, e);
  var c = Ka(t, e.inHover);
  t instanceof ct ? (e.lastDrawType !== op && (l = !0, e.lastDrawType = op), ap(r, t, u, l, e), (!h || !e.batchFill && !e.batchStroke) && r.beginPath(), WM(r, t, c, h), h && (e.batchFill = c.fill || "", e.batchStroke = c.stroke || "")) : t instanceof Es ? (e.lastDrawType !== lp && (l = !0, e.lastDrawType = lp), ap(r, t, u, l, e), YM(r, t, c)) : t instanceof er ? (e.lastDrawType !== sp && (l = !0, e.lastDrawType = sp), XM(r, t, u, l, e), UM(r, t, c)) : t.getTemporalDisplayables && (e.lastDrawType !== up && (l = !0, e.lastDrawType = up), QM(r, t, e)), h && i && jt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function QM(r, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Ti(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = n.length; u < h; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Ti(r, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Ou = new IM(), hp = new no(100), cp = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Qh(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Ou.delete(r);
  var a = Ou.get(r);
  if (a)
    return a;
  var o = ut(r, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Ou.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var h = [e], c = !0, v = 0; v < cp.length; ++v) {
      var f = o[cp[v]];
      if (f != null && !z(f) && !H(f) && !yt(f) && typeof f != "boolean") {
        c = !1;
        break;
      }
      h.push(f);
    }
    var d;
    if (c) {
      d = h.join(",") + (n ? "-svg" : "");
      var g = hp.get(d);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var p = w0(o.dashArrayX), y = jM(o.dashArrayY), m = b0(o.symbol), _ = JM(p), b = S0(y), S = !n && Wr.createCanvas(), w = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), M;
    S && (S.width = x.width * e, S.height = x.height * e, M = S.getContext("2d")), A(), c && hp.put(d, S || w), u.image = S, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, I = 0, P = _.length; I < P; ++I)
        T = Tv(T, _[I]);
      for (var $ = 1, I = 0, P = m.length; I < P; ++I)
        $ = Tv($, m[I].length);
      T *= $;
      var R = b * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(R, o.maxTileHeight))
      };
    }
    function A() {
      M && (M.clearRect(0, 0, S.width, S.height), o.backgroundColor && (M.fillStyle = o.backgroundColor, M.fillRect(0, 0, S.width, S.height)));
      for (var T = 0, I = 0; I < y.length; ++I)
        T += y[I];
      if (T <= 0)
        return;
      for (var P = -b, $ = 0, R = 0, O = 0; P < x.height; ) {
        if ($ % 2 === 0) {
          for (var G = R / 2 % m.length, E = 0, F = 0, W = 0; E < x.width * 2; ) {
            for (var Q = 0, I = 0; I < p[O].length; ++I)
              Q += p[O][I];
            if (Q <= 0)
              break;
            if (F % 2 === 0) {
              var et = (1 - o.symbolSize) * 0.5, ft = E + p[O][F] * et, mt = P + y[$] * et, St = p[O][F] * o.symbolSize, xe = y[$] * o.symbolSize, Xr = W / 2 % m[G].length;
              Vi(ft, mt, St, xe, m[G][Xr]);
            }
            E += p[O][F], ++W, ++F, F === p[O].length && (F = 0);
          }
          ++O, O === p.length && (O = 0);
        }
        P += y[$], ++R, ++$, $ === y.length && ($ = 0);
      }
      function Vi(ie, Lt, Z, rt, qr) {
        var zt = n ? 1 : e, $f = gr(qr, ie * zt, Lt * zt, Z * zt, rt * zt, o.color, o.symbolKeepAspect);
        if (n) {
          var Rf = i.painter.renderOneToVNode($f);
          Rf && w.children.push(Rf);
        } else
          _0(M, $f);
      }
    }
  }
}
function b0(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if (H(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!H(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return b0([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    H(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function w0(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (yt(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!yt(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return w0([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (yt(r[i])) {
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
function jM(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (yt(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = U(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function JM(r) {
  return U(r, function(t) {
    return S0(t);
  });
}
function S0(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function tD(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = Qh(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = Qh(n, t);
      }
    }
  });
}
var Ie = new tr(), x0 = {};
function eD(r, t) {
  x0[r] = t;
}
function rD(r) {
  return x0[r];
}
var iD = 1, nD = 800, aD = 900, oD = 1e3, sD = 2e3, lD = 5e3, T0 = 1e3, uD = 1100, gf = 2e3, C0 = 3e3, hD = 4e3, Al = 4500, cD = 4600, fD = 5e3, vD = 6e3, M0 = 7e3, dD = {
  PROCESSOR: {
    FILTER: oD,
    SERIES_FILTER: nD,
    STATISTIC: lD
  },
  VISUAL: {
    LAYOUT: T0,
    PROGRESSIVE_LAYOUT: uD,
    GLOBAL: gf,
    CHART: C0,
    POST_CHART_LAYOUT: cD,
    COMPONENT: hD,
    BRUSH: fD,
    CHART_ITEM: Al,
    ARIA: vD,
    DECAL: M0
  }
}, Et = "__flagInMainProcess", Yt = "__pendingUpdate", Eu = "__needsUpdateStatus", fp = /^[a-zA-Z0-9_]+$/, ku = "__connectUpdateStatus", vp = 0, pD = 1, gD = 2;
function D0(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return I0(this, r, t);
  };
}
function A0(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return I0(this, r, t);
  };
}
function I0(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), tr.prototype[t].apply(r, e);
}
var L0 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(tr)
), P0 = L0.prototype;
P0.on = A0("on");
P0.off = A0("off");
var en, Nu, Ho, Ir, Bu, zu, Fu, ra, ia, dp, pp, Hu, gp, Vo, yp, $0, le, mp, R0 = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, new SM()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, H(i) && (i = O0[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = wv(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: tt(n.useDirtyRect, l),
        useCoarsePointer: tt(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = pf(J(u.flush, u), 17), i = X(i), i && Hm(i, !0), a._theme = i, a._locale = AT(n.locale || bm), a._coordSysMgr = new Cl();
      var h = a._api = yp(a);
      function c(v, f) {
        return v.__prio - f.__prio;
      }
      return ns(qs, c), ns(jh, c), a._scheduler = new l0(a, h, jh, qs), a._messageCenter = new L0(), a._initEvents(), a.resize = J(a.resize, a), u.animation.on("frame", a._onframe, a), dp(u, a), pp(u, a), fh(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        mp(this);
        var e = this._scheduler;
        if (this[Yt]) {
          var i = this[Yt].silent;
          this[Et] = !0;
          try {
            en(this), Ir.update.call(this, null, this[Yt].updateParams);
          } catch (l) {
            throw this[Et] = !1, this[Yt] = null, l;
          }
          this._zr.flush(), this[Et] = !1, this[Yt] = null, ra.call(this, i), ia.call(this, i);
        } else if (e.unfinished) {
          var n = iD, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), zu(this, a), e.performVisualTasks(a), Vo(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
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
      if (!this[Et]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (V(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Et] = !0, !this._model || i) {
          var l = new rC(this._api), u = this._theme, h = this._model = new hf();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(e, {
          replaceMerge: o
        }, Jh);
        var c = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Yt] = {
            silent: a,
            updateParams: c
          }, this[Et] = !1, this.getZr().wakeUp();
        else {
          try {
            en(this), Ir.update.call(this, null, c);
          } catch (v) {
            throw this[Yt] = null, this[Et] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Yt] = null, this[Et] = !1, ra.call(this, a), ia.call(this, a);
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
      if (_p[n]) {
        var l = s, u = s, h = -s, c = -s, v = [], f = e && e.pixelRatio || this.getDevicePixelRatio();
        C(Pa, function(_, b) {
          if (_.group === n) {
            var S = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(X(e)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), c = o(w.bottom, c), v.push({
              dom: S,
              left: w.left,
              top: w.top
            });
          }
        }), l *= f, u *= f, h *= f, c *= f;
        var d = h - l, g = c - u, p = Wr.createCanvas(), y = wv(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (y.resize({
          width: d,
          height: g
        }), i) {
          var m = "";
          return C(v, function(_) {
            var b = _.left - l, S = _.top - u;
            m += '<g transform="translate(' + b + "," + S + ')">' + _.dom + "</g>";
          }), y.painter.getSvgRoot().innerHTML = m, e.connectedBackgroundColor && y.painter.setBackgroundColor(e.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && y.add(new bt({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: g
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), C(v, function(_) {
            var b = new er({
              style: {
                x: _.left * f - l,
                y: _.top * f - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), p.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return Bu(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return Bu(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = su(n, e);
      return C(o, function(s, l) {
        l.indexOf("Models") >= 0 && C(s, function(u) {
          var h = u.coordinateSystem;
          if (h && h.containPoint)
            a = a || !!h.containPoint(i);
          else if (l === "seriesModels") {
            var c = this._chartsMap[u.__viewId];
            c && c.containPoint && (a = a || c.containPoint(i, u));
          }
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(e, i) {
      var n = this._model, a = su(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? v0(s, l, i) : d0(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      C(yD, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && dn(s, function(d) {
            var g = ot(d);
            if (g && g.dataIndex != null) {
              var p = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = p && p.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = N({}, g.eventData), !0;
          }, !0), l) {
            var h = l.componentType, c = l.componentIndex;
            (h === "markLine" || h === "markPoint" || h === "markArea") && (h = "series", c = l.seriesIndex);
            var v = h && c != null && o.getComponent(h, c), f = v && e[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            l.event = a, l.type = i, e._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: f
            }, e.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(i, n, e);
      }), C(La, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), C(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), MM(this._messageCenter, this, this._api);
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
      e && zy(this.getDom(), mf, "");
      var i = this, n = i._api, a = i._model;
      C(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), C(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete Pa[i.id];
    }, t.prototype.resize = function(e) {
      if (!this[Et]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(e);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = e && e.silent;
          this[Yt] && (a == null && (a = this[Yt].silent), n = !0, this[Yt] = null), this[Et] = !0;
          try {
            n && en(this), Ir.update.call(this, {
              type: "resize",
              animation: N({
                // Disable animation
                duration: 0
              }, e && e.animation)
            });
          } catch (o) {
            throw this[Et] = !1, o;
          }
          this[Et] = !1, ra.call(this, a), ia.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !!tc[e]) {
        var n = tc[e](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = N({}, e);
      return i.type = La[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(i) || (i = {
        silent: !!i
      }), !!Xs[e.type] && this._model) {
        if (this[Et]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Fu.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && Y.browser.weChat && this._throttledZrFlush(), ra.call(this, n), ia.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      Ie.trigger("series:layoutlabels", this._model, this._api, {
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
      en = function(c) {
        var v = c._scheduler;
        v.restorePipelines(c._model), v.prepareStageTasks(), Nu(c, !0), Nu(c, !1), v.plan();
      }, Nu = function(c, v) {
        for (var f = c._model, d = c._scheduler, g = v ? c._componentsViews : c._chartsViews, p = v ? c._componentsMap : c._chartsMap, y = c._zr, m = c._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        v ? f.eachComponent(function(w, x) {
          w !== "series" && b(x);
        }) : f.eachSeries(b);
        function b(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var M = "_ec_" + w.id + "_" + w.type, D = !x && p[M];
          if (!D) {
            var A = Ue(w.type), T = v ? Oe.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              be.getClass(A.sub)
            );
            D = new T(), D.init(f, m), p[M] = D, g.push(D), y.add(D.group);
          }
          w.__viewId = D.__id = M, D.__alive = !0, D.__model = w, D.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !v && d.prepareView(D, w, f, m);
        }
        for (var _ = 0; _ < g.length; ) {
          var S = g[_];
          S.__alive ? _++ : (!v && S.renderTask.dispose(), y.remove(S.group), S.dispose(f, m), g.splice(_, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, Ho = function(c, v, f, d, g) {
        var p = c._model;
        if (p.setUpdatePayload(f), !d) {
          C([].concat(c._componentsViews).concat(c._chartsViews), S);
          return;
        }
        var y = {};
        y[d + "Id"] = f[d + "Id"], y[d + "Index"] = f[d + "Index"], y[d + "Name"] = f[d + "Name"];
        var m = {
          mainType: d,
          query: y
        };
        g && (m.subType = g);
        var _ = f.excludeSeriesId, b;
        _ != null && (b = j(), C(Rt(_), function(w) {
          var x = $e(w, null);
          x != null && b.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          if (!x)
            if (Jv(f))
              if (w instanceof Re)
                f.type === Di && !f.notBlur && !w.get(["emphasis", "disabled"]) && fx(w, f, c._api);
              else {
                var M = Yc(w.mainType, w.componentIndex, f.name, c._api), D = M.focusSelf, A = M.dispatchers;
                f.type === Di && D && !f.notBlur && $h(w.mainType, w.componentIndex, c._api), A && C(A, function(T) {
                  f.type === Di ? ks(T) : Ns(T);
                });
              }
            else kh(f) && w instanceof Re && (px(w, f, c._api), Qv(w), le(c));
        }, c), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          x || S(c[d === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, c);
        function S(w) {
          w && w.__alive && w[v] && w[v](w.__model, p, c._api, f);
        }
      }, Ir = {
        prepareAndUpdate: function(c) {
          en(this), Ir.update.call(this, c, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: c.newOption != null
          });
        },
        update: function(c, v) {
          var f = this._model, d = this._api, g = this._zr, p = this._coordSysMgr, y = this._scheduler;
          if (f) {
            f.setUpdatePayload(c), y.restoreData(f, c), y.performSeriesTasks(f), p.create(f, d), y.performDataProcessorTasks(f, c), zu(this, f), p.update(f, d), e(f), y.performVisualTasks(f, c), Hu(this, f, d, c, v);
            var m = f.get("backgroundColor") || "transparent", _ = f.get("darkMode");
            g.setBackgroundColor(m), _ != null && _ !== "auto" && g.setDarkMode(_), Ie.trigger("afterupdate", f, d);
          }
        },
        updateTransform: function(c) {
          var v = this, f = this._model, d = this._api;
          if (f) {
            f.setUpdatePayload(c);
            var g = [];
            f.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = v.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var b = _.updateTransform(m, f, d, c);
                    b && b.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = j();
            f.eachSeries(function(y) {
              var m = v._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, f, d, c);
                _ && _.update && p.set(y.uid, 1);
              } else
                p.set(y.uid, 1);
            }), e(f), this._scheduler.performVisualTasks(f, c, {
              setDirty: !0,
              dirtyMap: p
            }), Vo(this, f, d, c, {}, p), Ie.trigger("afterupdate", f, d);
          }
        },
        updateView: function(c) {
          var v = this._model;
          v && (v.setUpdatePayload(c), be.markUpdateMethod(c, "updateView"), e(v), this._scheduler.performVisualTasks(v, c, {
            setDirty: !0
          }), Hu(this, v, this._api, c, {}), Ie.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(c) {
          var v = this, f = this._model;
          f && (f.setUpdatePayload(c), f.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), be.markUpdateMethod(c, "updateVisual"), e(f), this._scheduler.performVisualTasks(f, c, {
            visualType: "visual",
            setDirty: !0
          }), f.eachComponent(function(d, g) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, f, v._api, c);
            }
          }), f.eachSeries(function(d) {
            var g = v._chartsMap[d.__viewId];
            g.updateVisual(d, f, v._api, c);
          }), Ie.trigger("afterupdate", f, this._api));
        },
        updateLayout: function(c) {
          Ir.update.call(this, c);
        }
      }, Bu = function(c, v, f, d) {
        if (c._disposed) {
          c.id;
          return;
        }
        for (var g = c._model, p = c._coordSysMgr.getCoordinateSystems(), y, m = su(g, f), _ = 0; _ < p.length; _++) {
          var b = p[_];
          if (b[v] && (y = b[v](g, m, d)) != null)
            return y;
        }
      }, zu = function(c, v) {
        var f = c._chartsMap, d = c._scheduler;
        v.eachSeries(function(g) {
          d.updateStreamModes(g, f[g.__viewId]);
        });
      }, Fu = function(c, v) {
        var f = this, d = this.getModel(), g = c.type, p = c.escapeConnect, y = Xs[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), S = _[0] != null && Ue(_[0]);
        this[Et] = !0;
        var w = [c], x = !1;
        c.batch && (x = !0, w = U(c.batch, function($) {
          return $ = ut(N({}, $), c), $.batch = null, $;
        }));
        var M = [], D, A = kh(c), T = Jv(c);
        if (T && nm(this._api), C(w, function($) {
          if (D = y.action($, f._model, f._api), D = D || N({}, $), D.type = m.event || D.type, M.push(D), T) {
            var R = Hc(c), O = R.queryOptionMap, G = R.mainTypeSpecified, E = G ? O.keys()[0] : "series";
            Ho(f, b, $, E), le(f);
          } else A ? (Ho(f, b, $, "series"), le(f)) : S && Ho(f, b, $, S.main, S.sub);
        }), b !== "none" && !T && !A && !S)
          try {
            this[Yt] ? (en(this), Ir.update.call(this, c), this[Yt] = null) : Ir[b].call(this, c);
          } catch ($) {
            throw this[Et] = !1, $;
          }
        if (x ? D = {
          type: m.event || g,
          escapeConnect: p,
          batch: M
        } : D = M[0], this[Et] = !1, !v) {
          var I = this._messageCenter;
          if (I.trigger(D.type, D), A) {
            var P = {
              type: "selectchanged",
              escapeConnect: p,
              selected: gx(d),
              isFromClick: c.isFromClick || !1,
              fromAction: c.type,
              fromActionPayload: c
            };
            I.trigger(P.type, P);
          }
        }
      }, ra = function(c) {
        for (var v = this._pendingActions; v.length; ) {
          var f = v.shift();
          Fu.call(this, f, c);
        }
      }, ia = function(c) {
        !c && this.trigger("updated");
      }, dp = function(c, v) {
        c.on("rendered", function(f) {
          v.trigger("rendered", f), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          c.animation.isFinished() && !v[Yt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, pp = function(c, v) {
        c.on("mouseover", function(f) {
          var d = f.target, g = dn(d, Eh);
          g && (vx(g, f, v._api), le(v));
        }).on("mouseout", function(f) {
          var d = f.target, g = dn(d, Eh);
          g && (dx(g, f, v._api), le(v));
        }).on("click", function(f) {
          var d = f.target, g = dn(d, function(m) {
            return ot(m).dataIndex != null;
          }, !0);
          if (g) {
            var p = g.selected ? "unselect" : "select", y = ot(g);
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
      function e(c) {
        c.clearColorPalette(), c.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(c) {
        var v = [], f = [], d = !1;
        if (c.eachComponent(function(m, _) {
          var b = _.get("zlevel") || 0, S = _.get("z") || 0, w = _.getZLevelKey();
          d = d || !!w, (m === "series" ? f : v).push({
            zlevel: b,
            z: S,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), d) {
          var g = v.concat(f), p, y;
          ns(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), C(g, function(m) {
            var _ = c.getComponent(m.type, m.idx), b = m.zlevel, S = m.key;
            p != null && (b = Math.max(p, b)), S ? (b === p && S !== y && b++, y = S) : y && (b === p && b++, y = ""), p = b, _.setZLevel(b);
          });
        }
      }
      Hu = function(c, v, f, d, g) {
        i(v), gp(c, v, f, d, g), C(c._chartsViews, function(p) {
          p.__alive = !1;
        }), Vo(c, v, f, d, g), C(c._chartsViews, function(p) {
          p.__alive || p.remove(v, f);
        });
      }, gp = function(c, v, f, d, g, p) {
        C(p || c._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, v, f, d), s(m, y), h(m, y);
        });
      }, Vo = function(c, v, f, d, g, p) {
        var y = c._scheduler;
        g = N(g || {}, {
          updatedSeries: v.getSeries()
        }), Ie.trigger("series:beforeupdate", v, f, g);
        var m = !1;
        v.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          b.__alive = !0;
          var S = b.renderTask;
          y.updatePayload(S, d), u(_, b), p && p.get(_.uid) && S.dirty(), S.perform(y.getPerformArgs(S)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), Qv(_);
        }), y.unfinished = m || y.unfinished, Ie.trigger("series:layoutlabels", v, f, g), Ie.trigger("series:transition", v, f, g), v.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(c, v), Ie.trigger("series:afterupdate", v, f, g);
      }, le = function(c) {
        c[Eu] = !0, c.getZr().wakeUp();
      }, mp = function(c) {
        c[Eu] && (c.getZr().storage.traverse(function(v) {
          Da(v) || n(v);
        }), c[Eu] = !1);
      };
      function n(c) {
        for (var v = [], f = c.currentStates, d = 0; d < f.length; d++) {
          var g = f[d];
          g === "emphasis" || g === "blur" || g === "select" || v.push(g);
        }
        c.selected && c.states.select && v.push("select"), c.hoverState === ul && c.states.emphasis ? v.push("emphasis") : c.hoverState === ll && c.states.blur && v.push("blur"), c.useStates(v);
      }
      function a(c, v) {
        var f = c._zr, d = f.storage, g = 0;
        d.traverse(function(p) {
          p.isGroup || g++;
        }), g > v.get("hoverLayerThreshold") && !Y.node && !Y.worker && v.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var y = c._chartsMap[p.__viewId];
            y.__alive && y.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(c, v) {
        var f = c.get("blendMode") || null;
        v.eachRendered(function(d) {
          d.isGroup || (d.style.blend = f);
        });
      }
      function s(c, v) {
        if (!c.preventAutoZ) {
          var f = c.get("z") || 0, d = c.get("zlevel") || 0;
          v.eachRendered(function(g) {
            return l(g, f, d, -1 / 0), !0;
          });
        }
      }
      function l(c, v, f, d) {
        var g = c.getTextContent(), p = c.getTextGuideLine(), y = c.isGroup;
        if (y)
          for (var m = c.childrenRef(), _ = 0; _ < m.length; _++)
            d = Math.max(l(m[_], v, f, d), d);
        else
          c.z = v, c.zlevel = f, d = Math.max(c.z2, d);
        if (g && (g.z = v, g.zlevel = f, isFinite(d) && (g.z2 = d + 2)), p) {
          var b = c.textGuideLineConfig;
          p.z = v, p.zlevel = f, isFinite(d) && (p.z2 = d + (b && b.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(c, v) {
        v.eachRendered(function(f) {
          if (!Da(f)) {
            var d = f.getTextContent(), g = f.getTextGuideLine();
            f.stateTransition && (f.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), f.hasState() ? (f.prevStates = f.currentStates, f.clearStates()) : f.prevStates && (f.prevStates = null);
          }
        });
      }
      function h(c, v) {
        var f = c.getModel("stateAnimation"), d = c.isAnimationEnabled(), g = f.get("duration"), p = g > 0 ? {
          duration: g,
          delay: f.get("delay"),
          easing: f.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (Da(y))
              return;
            if (y instanceof ct && Sx(y), y.__dirty) {
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
      yp = function(c) {
        return new /** @class */
        (function(v) {
          B(f, v);
          function f() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return f.prototype.getCoordinateSystems = function() {
            return c._coordSysMgr.getCoordinateSystems();
          }, f.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var g = d.__ecComponentInfo;
              if (g != null)
                return c._model.getComponent(g.mainType, g.index);
              d = d.parent;
            }
          }, f.prototype.enterEmphasis = function(d, g) {
            ks(d, g), le(c);
          }, f.prototype.leaveEmphasis = function(d, g) {
            Ns(d, g), le(c);
          }, f.prototype.enterBlur = function(d) {
            cx(d), le(c);
          }, f.prototype.leaveBlur = function(d) {
            tm(d), le(c);
          }, f.prototype.enterSelect = function(d) {
            em(d), le(c);
          }, f.prototype.leaveSelect = function(d) {
            rm(d), le(c);
          }, f.prototype.getModel = function() {
            return c.getModel();
          }, f.prototype.getViewOfComponentModel = function(d) {
            return c.getViewOfComponentModel(d);
          }, f.prototype.getViewOfSeriesModel = function(d) {
            return c.getViewOfSeriesModel(d);
          }, f;
        }(zm))(c);
      }, $0 = function(c) {
        function v(f, d) {
          for (var g = 0; g < f.length; g++) {
            var p = f[g];
            p[ku] = d;
          }
        }
        C(La, function(f, d) {
          c._messageCenter.on(d, function(g) {
            if (_p[c.group] && c[ku] !== vp) {
              if (g && g.escapeConnect)
                return;
              var p = c.makeActionFromEvent(g), y = [];
              C(Pa, function(m) {
                m !== c && m.group === c.group && y.push(m);
              }), v(y, vp), C(y, function(m) {
                m[ku] !== pD && m.dispatchAction(p);
              }), v(y, gD);
            }
          });
        });
      };
    }(), t;
  }(tr)
), yf = R0.prototype;
yf.on = D0("on");
yf.off = D0("off");
yf.one = function(r, t, e) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var yD = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Xs = {}, La = {}, jh = [], Jh = [], qs = [], O0 = {}, tc = {}, Pa = {}, _p = {}, mD = +/* @__PURE__ */ new Date() - 0, mf = "_echarts_instance_";
function _D(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    var n = bD(r);
    if (n)
      return n;
  }
  var a = new R0(r, t, e);
  return a.id = "ec_" + mD++, Pa[a.id] = a, i && zy(r, mf, a.id), $0(a), Ie.trigger("afterinit", a), a;
}
function bD(r) {
  return Pa[tS(r, mf)];
}
function E0(r, t) {
  O0[r] = t;
}
function k0(r) {
  vt(Jh, r) < 0 && Jh.push(r);
}
function N0(r, t) {
  bf(jh, r, t, sD);
}
function wD(r) {
  _f("afterinit", r);
}
function SD(r) {
  _f("afterupdate", r);
}
function _f(r, t) {
  Ie.on(r, t);
}
function Hn(r, t, e) {
  q(t) && (e = t, t = "");
  var i = V(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !La[t] && (Xe(fp.test(i) && fp.test(t)), Xs[i] || (Xs[i] = {
    action: e,
    actionInfo: r
  }), La[t] = i);
}
function xD(r, t) {
  Cl.register(r, t);
}
function TD(r, t) {
  bf(qs, r, t, T0, "layout");
}
function ki(r, t) {
  bf(qs, r, t, C0, "visual");
}
var bp = [];
function bf(r, t, e, i, n) {
  if ((q(t) || V(t)) && (e = t, t = i), !(vt(bp, e) >= 0)) {
    bp.push(e);
    var a = l0.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function B0(r, t) {
  tc[r] = t;
}
function CD(r, t, e) {
  var i = rD("registerMap");
  i && i(r, t, e);
}
var MD = $C;
ki(gf, lM);
ki(Al, uM);
ki(Al, hM);
ki(gf, xM);
ki(Al, TM);
ki(M0, tD);
k0(Hm);
N0(aD, dC);
B0("default", cM);
Hn({
  type: Di,
  event: Di,
  update: Di
}, Wt);
Hn({
  type: hs,
  event: hs,
  update: hs
}, Wt);
Hn({
  type: Ta,
  event: Ta,
  update: Ta
}, Wt);
Hn({
  type: cs,
  event: cs,
  update: cs
}, Wt);
Hn({
  type: Ca,
  event: Ca,
  update: Ca
}, Wt);
E0("light", wM);
E0("dark", f0);
function na(r) {
  return r == null ? 0 : r.length || 1;
}
function wp(r) {
  return r;
}
var DD = (
  /** @class */
  function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || wp, this._newKeyGetter = n || wp, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = na(l);
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
        var l = a[s], u = i[l], h = n[l], c = na(u), v = na(h);
        if (c > 1 && v === 1)
          this._updateManyToOne && this._updateManyToOne(h, u), n[l] = null;
        else if (c === 1 && v > 1)
          this._updateOneToMany && this._updateOneToMany(h, u), n[l] = null;
        else if (c === 1 && v === 1)
          this._update && this._update(h, u), n[l] = null;
        else if (c > 1 && v > 1)
          this._updateManyToMany && this._updateManyToMany(h, u), n[l] = null;
        else if (c > 1)
          for (var f = 0; f < c; f++)
            this._remove && this._remove(u[f]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, r.prototype._performRestAdd = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = e[n], o = na(a);
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
          var l = e[s], u = na(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  }()
), AD = (
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
function ID(r, t) {
  var e = {}, i = e.encode = {}, n = j(), a = [], o = [], s = {};
  C(r.dimensions, function(v) {
    var f = r.getDimensionInfo(v), d = f.coordDim;
    if (d) {
      var g = f.coordDimIndex;
      Vu(i, d)[g] = v, f.isExtraCoord || (n.set(d, 1), PD(f.type) && (a[0] = v), Vu(s, d)[g] = r.getDimensionIndex(f.name)), f.defaultTooltip && o.push(v);
    }
    Om.each(function(p, y) {
      var m = Vu(i, y), _ = f.otherDims[y];
      _ != null && _ !== !1 && (m[_] = f.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, f) {
    var d = i[f];
    u[f] = d[0], l = l.concat(d);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = U(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var h = i.label;
  h && h.length && (a = h.slice());
  var c = i.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new AD(s, t), e;
}
function Vu(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function LD(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function PD(r) {
  return !(r === "ordinal" || r === "time");
}
var gs = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.otherDims = {}, t != null && N(this, t);
    }
    return r;
  }()
), $D = It(), RD = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, z0 = (
  /** @class */
  function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = V0(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return tt(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = Wm(this.source), i = !G0(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, h = void 0, c = this.dimensions[s];
        if (c && c.storeDimIndex === o)
          l = e ? c.name : null, u = c.type, h = c.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = e ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: h
        }), e && l != null && (!c || !c.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += RD[u] || "f", h && (n += h.uid), n += "$";
      }
      var f = this.source, d = [f.seriesLayoutBy, f.startIndex, n].join("$$");
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
function F0(r) {
  return r instanceof z0;
}
function H0(r) {
  for (var t = j(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = V(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function V0(r) {
  var t = $D(r);
  return t.dimNameMap || (t.dimNameMap = H0(r.dimensionsDefine));
}
function G0(r) {
  return r > 30;
}
var aa = V, Lr = U, OD = typeof Int32Array > "u" ? Array : Int32Array, ED = "e\0\0", Sp = -1, kD = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], ND = ["_approximateExtent"], xp, Go, oa, sa, Gu, la, Wu, BD = (
  /** @class */
  function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      F0(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < i.length; h++) {
        var c = i[h], v = H(c) ? new gs({
          name: c
        }) : c instanceof gs ? c : new gs(c), f = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = f, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(f), a[f] = v, u[f] != null && (l = !0), v.createInvertedIndices && (s[f] = []), d.itemName === 0 && (this._nameDimIdx = h), d.itemId === 0 && (this._idDimIdx = h), n && (v.storeDimIndex = h);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = j();
        C(o, function(p) {
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
      if (yt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof Vh && (a = t), !a) {
        var o = this.dimensions, s = cf(t) || Jt(t) ? new Um(t, o.length) : t;
        a = new Vh();
        var l = Lr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = ID(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && Wu(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Vr && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === Se;
        if (l && !n.pure)
          for (var u = [], h = t; h < e; h++) {
            var c = n.getItem(h, u);
            if (!this.hasItemOption && Vw(c) && (this.hasItemOption = !0), c) {
              var v = c.name;
              a[h] == null && v != null && (a[h] = $e(v, null));
              var f = c.id;
              o[h] == null && f != null && (o[h] = $e(f, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < e; h++)
            Wu(this, h);
        xp(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      aa(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = oa(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return Go(this, this.getRawIndex(t));
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
      return z(t) ? n.getValues(Lr(t, function(a) {
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
      return n == null || isNaN(n) ? Sp : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = Lr(sa(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? J(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      q(t) && (i = e, e = t, t = []);
      var n = i || this, a = Lr(sa(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? J(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = gt(t);
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
      var a = i || n || this, o = Lr(sa(t), this._getStoreDimIndex, this), s = la(this);
      return s._store = this._store.map(o, a ? J(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = i || n || this, o = Lr(sa(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? J(e, a) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = la(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = la(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = la(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new xt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new DD(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Go(t, i);
      }, function(i) {
        return Go(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, aa(t) ? N(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), z(a) ? a = a.slice() : aa(a) && (a = N({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, aa(e) ? N(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      aa(t) ? N(this._layout, t) : this._layout[t] = e;
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
      ex(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      C(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : Lr(this.dimensions, this._getDimInfo, this), this.hostModel)), Gu(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(Lc(arguments)));
      });
    }, r.internalField = function() {
      xp = function(t) {
        var e = t._invertedIndicesMap;
        C(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new OD(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = Sp;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, oa = function(t, e, i) {
        return $e(t._getCategory(e, i), null);
      }, Go = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = oa(t, t._idDimIdx, e)), i == null && (i = ED + e), i;
      }, sa = function(t) {
        return z(t) || (t = t != null ? [t] : []), t;
      }, la = function(t) {
        var e = new r(t._schema ? t._schema : Lr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Gu(e, t), e;
      }, Gu = function(t, e) {
        C(kD.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, C(ND, function(i) {
          t[i] = X(e[i]);
        }), t._calculationInfo = N({}, e._calculationInfo);
      }, Wu = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = oa(t, a, e)), l == null && o != null && (n[e] = l = oa(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), n[e] = l;
        }
      };
    }(), r;
  }()
);
function zD(r, t) {
  cf(r) || (r = Vm(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = j(), a = [], o = HD(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && G0(o), l = i === r.dimensionsDefine, u = l ? V0(r) : H0(i), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(r, o));
  for (var c = j(h), v = new Km(o), f = 0; f < v.length; f++)
    v[f] = -1;
  function d(D) {
    var A = v[D];
    if (A < 0) {
      var T = i[D], I = V(T) ? T : {
        name: T
      }, P = new gs(), $ = I.name;
      $ != null && u.get($) != null && (P.name = P.displayName = $), I.type != null && (P.type = I.type), I.displayName != null && (P.displayName = I.displayName);
      var R = a.length;
      return v[D] = R, P.storeDimIndex = D, a.push(P), P;
    }
    return a[A];
  }
  if (!s)
    for (var f = 0; f < o; f++)
      d(f);
  c.each(function(D, A) {
    var T = Rt(D).slice();
    if (T.length === 1 && !H(T[0]) && T[0] < 0) {
      c.set(A, !1);
      return;
    }
    var I = c.set(A, []);
    C(T, function(P, $) {
      var R = H(P) ? u.get(P) : P;
      R != null && R < o && (I[$] = R, p(d(R), A, $));
    });
  });
  var g = 0;
  C(e, function(D) {
    var A, T, I, P;
    if (H(D))
      A = D, P = {};
    else {
      P = D, A = P.name;
      var $ = P.ordinalMeta;
      P.ordinalMeta = null, P = N({}, P), P.ordinalMeta = $, T = P.dimsDef, I = P.otherDims, P.name = P.coordDim = P.coordDimIndex = P.dimsDef = P.otherDims = null;
    }
    var R = c.get(A);
    if (R !== !1) {
      if (R = Rt(R), !R.length)
        for (var O = 0; O < (T && T.length || 1); O++) {
          for (; g < o && d(g).coordDim != null; )
            g++;
          g < o && R.push(g++);
        }
      C(R, function(G, E) {
        var F = d(G);
        if (l && P.type != null && (F.type = P.type), p(ut(F, P), A, E), F.name == null && T) {
          var W = T[E];
          !V(W) && (W = {
            name: W
          }), F.name = F.displayName = W.name, F.defaultTooltip = W.defaultTooltip;
        }
        I && ut(F.otherDims, I);
      });
    }
  });
  function p(D, A, T) {
    Om.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, n.set(A, !0));
  }
  var y = t.generateCoord, m = t.generateCoordCount, _ = m != null;
  m = y ? m || 1 : 0;
  var b = y || "value";
  function S(D) {
    D.name == null && (D.name = D.coordDim);
  }
  if (s)
    C(a, function(D) {
      S(D);
    }), a.sort(function(D, A) {
      return D.storeDimIndex - A.storeDimIndex;
    });
  else
    for (var w = 0; w < o; w++) {
      var x = d(w), M = x.coordDim;
      M == null && (x.coordDim = VD(b, n, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (Bm(r, w) === ne.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return FD(a), new z0({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function FD(r) {
  for (var t = j(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function HD(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return C(t, function(a) {
    var o;
    V(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function VD(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var GD = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = j(), this.categoryAxisMap = j(), this.coordSysName = t;
    }
    return r;
  }()
);
function WD(r) {
  var t = r.get("coordinateSystem"), e = new GD(t), i = UD[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var UD = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", Le).models[0], a = r.getReferringComponents("yAxis", Le).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), rn(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), rn(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", Le).models[0];
    t.coordSysDims = ["single"], e.set("single", n), rn(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", Le).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), rn(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), rn(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    C(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), h = o[l];
      e.set(h, u), rn(u) && (i.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function rn(r) {
  return r.get("type") === "category";
}
function YD(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  XD(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, h, c, v;
  if (C(a, function(m, _) {
    H(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (h = m));
  }), h && !i && !u && (i = !0), h) {
    c = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var f = h.coordDim, d = h.type, g = 0;
    C(a, function(m) {
      m.coordDim === f && g++;
    });
    var p = {
      name: c,
      coordDim: f,
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
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(v, d), y.storeDimIndex = s.ensureCalculationDimension(c, d)), o.appendCalculationDimension(p), o.appendCalculationDimension(y)) : (a.push(p), a.push(y));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: c
  };
}
function XD(r) {
  return !F0(r.schema);
}
function $n(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function qD(r, t) {
  return $n(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function ZD(r, t) {
  var e = r.get("coordinateSystem"), i = Cl.get(e), n;
  return t && t.coordSysDims && (n = U(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = LD(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function KD(r, t, e) {
  var i, n;
  return e && C(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function Il(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === Se;
  var o = WD(t), s = ZD(t, o), l = e.useEncodeDefaulter, u = q(l) ? l : l ? Dt(GT, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, c = zD(n, h), v = KD(c.dimensions, e.createInvertedIndices, o), f = a ? null : i.getSharedDataStore(c), d = YD(t, {
    schema: c,
    store: f
  }), g = new BD(c, t);
  g.setCalculationInfo(d);
  var p = v != null && QD(n) ? function(y, m, _, b) {
    return b === v ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : f,
    null,
    p
  ), g;
}
function QD(r) {
  if (r.sourceFormat === Se) {
    var t = jD(r.data || []);
    return !z(ao(t));
  }
}
function jD(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var ir = (
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
al(ir);
var JD = 0, ec = (
  /** @class */
  function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++JD;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && U(i, tA);
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
      if (!H(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = j(this.categories));
    }, r;
  }()
);
function tA(r) {
  return V(r) && r.value != null ? r.value : r + "";
}
function rc(r) {
  return r.type === "interval" || r.type === "log";
}
function eA(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = Oy(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = W0(o), l = n.niceTickExtent = [Mt(Math.ceil(r[0] / o) * o, s), Mt(Math.floor(r[1] / o) * o, s)];
  return rA(l, r), n;
}
function Uu(r) {
  var t = Math.pow(10, zc(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, Mt(e * t);
}
function W0(r) {
  return sr(r) + 2;
}
function Tp(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function rA(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), Tp(r, 0, t), Tp(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function Ll(r, t) {
  return r >= t[0] && r <= t[1];
}
function Pl(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function $l(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var wf = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new ec({})), z(n) && (n = new ec({
        categories: U(n, function(a) {
          return V(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : H(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), Ll(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), Pl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round($l(e, this._extent)), this.getRawOrdinalNumber(e);
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
  }(ir)
);
ir.registerClass(wf);
var gi = Mt, Vn = (
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
      return Ll(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return Pl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return $l(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = W0(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: gi(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = gi(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var h = s.length ? s[s.length - 1].value : a[1];
      return n[1] > h && (e ? s.push({
        value: gi(h + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, h = [], c = s.value - l.value, v = c / e; u < e - 1; ) {
          var f = gi(l.value + (u + 1) * v);
          f > a[0] && f < a[1] && h.push(f), u++;
        }
        n.push(h);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = sr(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = gi(e.value, n, !0);
      return Lm(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = eA(a, e, i, n);
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
      e.fixMin || (i[0] = gi(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = gi(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  }(ir)
);
ir.registerClass(Vn);
var U0 = typeof Float32Array < "u", iA = U0 ? Float32Array : Array;
function lr(r) {
  return z(r) ? U0 ? new Float32Array(r) : r : new iA(r);
}
var nA = "__ec_stack_";
function Y0(r) {
  return r.get("stack") || nA + r.seriesIndex;
}
function Sf(r) {
  return r.dim + r.index;
}
function X0(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    Z0(i) && e.push(i);
  }), e;
}
function aA(r) {
  var t = {};
  C(r, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var c = l.getData(), v = h.dim + "_" + h.index, f = c.getDimensionIndex(c.mapDimension(h.dim)), d = c.getStore(), g = 0, p = d.count(); g < p; ++g) {
        var y = d.get(f, g);
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
function q0(r) {
  var t = aA(r), e = [];
  return C(r, function(i) {
    var n = i.coordinateSystem, a = n.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], h = Math.abs(o[1] - o[0]), c = a.scale.getExtent(), v = Math.abs(c[1] - c[0]);
      s = u ? h / v * u : h;
    } else {
      var f = i.getData();
      s = Math.abs(o[1] - o[0]) / f.count();
    }
    var d = Vt(i.get("barWidth"), s), g = Vt(i.get("barMaxWidth"), s), p = Vt(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (K0(i) ? 0.5 : 1),
      s
    ), y = i.get("barGap"), m = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: g,
      barMinWidth: p,
      barGap: y,
      barCategoryGap: m,
      axisKey: Sf(a),
      stackId: Y0(i)
    });
  }), oA(e);
}
function oA(r) {
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
    var c = i.barMaxWidth;
    c && (l[u].maxWidth = c);
    var v = i.barMinWidth;
    v && (l[u].minWidth = v);
    var f = i.barGap;
    f != null && (s.gap = f);
    var d = i.barCategoryGap;
    d != null && (s.categoryGap = d);
  });
  var e = {};
  return C(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = gt(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Vt(s, o), h = Vt(i.gap, 1), c = i.remainedWidth, v = i.autoWidthCount, f = (c - u) / (v + (v - 1) * h);
    f = Math.max(f, 0), C(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var b = y.width;
        m && (b = Math.min(b, m)), _ && (b = Math.max(b, _)), y.width = b, c -= b + h * b, v--;
      } else {
        var b = f;
        m && m < b && (b = Math.min(m, c)), _ && _ > b && (b = _), b !== f && (y.width = b, c -= b + h * b, v--);
      }
    }), f = (c - u) / (v + (v - 1) * h), f = Math.max(f, 0);
    var d = 0, g;
    C(a, function(y, m) {
      y.width || (y.width = f), g = y, d += y.width * (1 + h);
    }), g && (d -= g.width * h);
    var p = -d / 2;
    C(a, function(y, m) {
      e[n][m] = e[n][m] || {
        bandWidth: o,
        offset: p,
        width: y.width
      }, p += y.width * (1 + h);
    });
  }), e;
}
function sA(r, t, e) {
  if (r && t) {
    var i = r[Sf(t)];
    return i;
  }
}
function lA(r, t) {
  var e = X0(r, t), i = q0(e);
  C(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = Y0(n), u = i[Sf(s)][l], h = u.offset, c = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: c
    });
  });
}
function uA(r) {
  return {
    seriesType: r,
    plan: df(),
    reset: function(t) {
      if (Z0(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), h = e.getCalculationInfo("stackResultDimension"), c = $n(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), f = hA(n, a), d = K0(t), g = t.get("barMinHeight") || 0, p = h && e.getDimensionIndex(h), y = e.getLayout("size"), m = e.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var S = _.count, w = d && lr(S * 3), x = d && l && lr(S * 3), M = d && lr(S), D = i.master.getRect(), A = v ? D.width : D.height, T, I = b.getStore(), P = 0; (T = _.next()) != null; ) {
              var $ = I.get(c ? p : o, T), R = I.get(s, T), O = f, G = void 0;
              c && (G = +$ - I.get(o, T));
              var E = void 0, F = void 0, W = void 0, Q = void 0;
              if (v) {
                var et = i.dataToPoint([$, R]);
                if (c) {
                  var ft = i.dataToPoint([G, R]);
                  O = ft[0];
                }
                E = O, F = et[1] + m, W = et[0] - O, Q = y, Math.abs(W) < g && (W = (W < 0 ? -1 : 1) * g);
              } else {
                var et = i.dataToPoint([R, $]);
                if (c) {
                  var ft = i.dataToPoint([R, G]);
                  O = ft[1];
                }
                E = et[0] + m, F = O, W = y, Q = et[1] - O, Math.abs(Q) < g && (Q = (Q <= 0 ? -1 : 1) * g);
              }
              d ? (w[P] = E, w[P + 1] = F, w[P + 2] = v ? W : Q, x && (x[P] = v ? D.x : E, x[P + 1] = v ? F : D.y, x[P + 2] = A), M[T] = T) : b.setItemLayout(T, {
                x: E,
                y: F,
                width: W,
                height: Q
              }), P += 3;
            }
            d && b.setLayout({
              largePoints: w,
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
function Z0(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function K0(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function hA(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var cA = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, Q0 = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return _l(e.value, gd[$T(wn(this._minLevelUnit))] || gd.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return RT(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = mA(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= ye, i[1] += ye), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - ye;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = Wo.length, l = Math.min(cA(Wo, this._approxInterval, 0, s), s - 1);
      this._interval = Wo[l][1], this._minLevelUnit = Wo[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return yt(e) ? e : +dr(e);
    }, t.prototype.contain = function(e) {
      return Ll(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return Pl(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return $l(e, this._extent);
    }, t.type = "time", t;
  }(Vn)
), Wo = [
  // Format                           interval
  ["second", af],
  ["minute", of],
  ["hour", Aa],
  ["quarter-day", Aa * 6],
  ["half-day", Aa * 12],
  ["day", ye * 1.2],
  ["half-week", ye * 3.5],
  ["week", ye * 7],
  ["month", ye * 31],
  ["quarter", ye * 95],
  ["half-year", pd / 2],
  ["year", pd]
  // 1Y
];
function fA(r, t, e, i) {
  var n = dr(t), a = dr(e), o = function(d) {
    return yd(n, d, i) === yd(a, d, i);
  }, s = function() {
    return o("year");
  }, l = function() {
    return s() && o("month");
  }, u = function() {
    return l() && o("day");
  }, h = function() {
    return u() && o("hour");
  }, c = function() {
    return h() && o("minute");
  }, v = function() {
    return c() && o("second");
  }, f = function() {
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
      return c();
    case "second":
      return v();
    case "millisecond":
      return f();
  }
}
function vA(r, t) {
  return r /= ye, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function dA(r) {
  var t = 30 * ye;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function pA(r) {
  return r /= Aa, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function Cp(r, t) {
  return r /= t ? of : af, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function gA(r) {
  return Oy(r);
}
function yA(r, t, e) {
  var i = new Date(r);
  switch (wn(t)) {
    case "year":
    case "month":
      i[Tm(e)](0);
    case "day":
      i[Cm(e)](1);
    case "hour":
      i[Mm(e)](0);
    case "minute":
      i[Dm(e)](0);
    case "second":
      i[Am(e)](0), i[Im(e)](0);
  }
  return i.getTime();
}
function mA(r, t, e, i) {
  var n = 1e4, a = Sm, o = 0;
  function s(A, T, I, P, $, R, O) {
    for (var G = new Date(T), E = T, F = G[P](); E < I && E <= i[1]; )
      O.push({
        value: E
      }), F += A, G[$](F), E = G.getTime();
    O.push({
      value: E,
      notAdd: !0
    });
  }
  function l(A, T, I) {
    var P = [], $ = !T.length;
    if (!fA(wn(A), i[0], i[1], e)) {
      $ && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: yA(new Date(i[0]), A, e)
      }, {
        value: i[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var O = T[R].value, G = T[R + 1].value;
        if (O !== G) {
          var E = void 0, F = void 0, W = void 0, Q = !1;
          switch (A) {
            case "year":
              E = Math.max(1, Math.round(t / ye / 365)), F = sf(e), W = OT(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              E = dA(t), F = Sn(e), W = Tm(e);
              break;
            case "week":
            case "half-week":
            case "day":
              E = vA(t), F = bl(e), W = Cm(e), Q = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              E = pA(t), F = Ua(e), W = Mm(e);
              break;
            case "minute":
              E = Cp(t, !0), F = wl(e), W = Dm(e);
              break;
            case "second":
              E = Cp(t, !1), F = Sl(e), W = Am(e);
              break;
            case "millisecond":
              E = gA(t), F = xl(e), W = Im(e);
              break;
          }
          s(E, O, G, F, W, Q, P), A === "year" && I.length > 1 && R === 0 && I.unshift({
            value: I[0].value - E
          });
        }
      }
      for (var R = 0; R < P.length; R++)
        I.push(P[R]);
      return P;
    }
  }
  for (var u = [], h = [], c = 0, v = 0, f = 0; f < a.length && o++ < n; ++f) {
    var d = wn(a[f]);
    if (PT(a[f])) {
      l(a[f], u[u.length - 1] || [], h);
      var g = a[f + 1] ? wn(a[f + 1]) : null;
      if (d !== g) {
        if (h.length) {
          v = c, h.sort(function(A, T) {
            return A.value - T.value;
          });
          for (var p = [], y = 0; y < h.length; ++y) {
            var m = h[y].value;
            (y === 0 || h[y - 1].value !== m) && (p.push(h[y]), m >= i[0] && m <= i[1] && c++);
          }
          var _ = (i[1] - i[0]) / t;
          if (c > _ * 1.5 && v > _ / 1.5 || (u.push(p), c > _ || r === a[f]))
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
  }), S = [], w = b.length - 1, f = 0; f < b.length; ++f)
    for (var x = b[f], M = 0; M < x.length; ++M)
      S.push({
        value: x[M].value,
        level: w - f
      });
  S.sort(function(A, T) {
    return A.value - T.value;
  });
  for (var D = [], f = 0; f < S.length; ++f)
    (f === 0 || S[f].value !== S[f - 1].value) && D.push(S[f]);
  return D;
}
ir.registerClass(Q0);
var Mp = ir.prototype, $a = Vn.prototype, _A = Mt, bA = Math.floor, wA = Math.ceil, Uo = Math.pow, Ce = Math.log, xf = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new Vn(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = $a.getTicks.call(this, e);
      return U(o, function(s) {
        var l = s.value, u = Mt(Uo(this.base, l));
        return u = l === n[0] && this._fixMin ? Yo(u, a[0]) : u, u = l === n[1] && this._fixMax ? Yo(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = Ce(this.base);
      e = Ce(Math.max(0, e)) / n, i = Ce(Math.max(0, i)) / n, $a.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = Mp.getExtent.call(this);
      i[0] = Uo(e, i[0]), i[1] = Uo(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = Yo(i[0], a[0])), this._fixMax && (i[1] = Yo(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = Ce(e[0]) / Ce(i), e[1] = Ce(e[1]) / Ce(i), Mp.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = zw(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [Mt(wA(i[0] / a) * a), Mt(bA(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      $a.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = Ce(e) / Ce(this.base), Ll(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = Ce(e) / Ce(this.base), Pl(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = $l(e, this._extent), Uo(this.base, e);
    }, t.type = "log", t;
  }(ir)
), j0 = xf.prototype;
j0.getMinorTicks = $a.getMinorTicks;
j0.getLabel = $a.getLabel;
function Yo(r, t) {
  return _A(r, sr(t));
}
ir.registerClass(xf);
var SA = (
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
      q(o) ? this._modelMinNum = Xo(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = Xo(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (q(s) ? this._modelMaxNum = Xo(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = Xo(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = z(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [qe(u[0], 1), qe(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var c = Ts(s) || Ts(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !h && (l = 0));
      var v = this._determinedMin, f = this._determinedMax;
      return v != null && (s = v, u = !0), f != null && (l = f, h = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: h,
        isBlank: c
      };
    }, r.prototype.modifyDataMinMax = function(t, e) {
      this[TA[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = xA[t];
      this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  }()
), xA = {
  min: "_determinedMin",
  max: "_determinedMax"
}, TA = {
  min: "_dataMin",
  max: "_dataMax"
};
function CA(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new SA(r, t, e), r.rawExtentInfo = i, i);
}
function Xo(r, t) {
  return t == null ? null : Ts(t) ? NaN : r.parse(t);
}
function J0(r, t) {
  var e = r.type, i = CA(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = X0("bar", o), l = !1;
    if (C(s, function(c) {
      l = l || c.getBaseAxis() === t.axis;
    }), l) {
      var u = q0(s), h = MA(n, a, t, u);
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
function MA(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = sA(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  C(o, function(f) {
    s = Math.min(f.offset, s);
  });
  var l = -1 / 0;
  C(o, function(f) {
    l = Math.max(f.offset + f.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - r, c = 1 - (s + l) / a, v = h / c - h;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function Dp(r, t) {
  var e = t, i = J0(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof xf && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function DA(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      case "category":
        return new wf({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new Q0({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (ir.getClass(t) || Vn)();
    }
}
function AA(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function Gn(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  }(t) : H(t) ? /* @__PURE__ */ function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  }(t) : q(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(Tf(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function Tf(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function IA(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof wf ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = Gn(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var h = 0; h < n; h += u) {
      var c = i ? i[h] : {
        value: a[0] + h
      }, v = s(c, h), f = o.getTextRect(v), d = LA(f, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function LA(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new lt(r.x, r.y, a, o);
  return s;
}
function Cf(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function t_(r) {
  return r.type === "category" && Cf(r.getLabelModel()) === 0;
}
function PA(r, t) {
  var e = {};
  return C(r.mapDimensionsAll(t), function(i) {
    e[qD(r, i)] = !0;
  }), gt(e);
}
var $A = (
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
), Ap = [], RA = {
  registerPreprocessor: k0,
  registerProcessor: N0,
  registerPostInit: wD,
  registerPostUpdate: SD,
  registerUpdateLifecycle: _f,
  registerAction: Hn,
  registerCoordinateSystem: xD,
  registerLayout: TD,
  registerVisual: ki,
  registerTransform: MD,
  registerLoading: B0,
  registerMap: CD,
  registerImpl: eD,
  PRIORITY: dD,
  ComponentModel: ht,
  ComponentView: Oe,
  SeriesModel: Re,
  ChartView: be,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    ht.registerClass(r);
  },
  registerComponentView: function(r) {
    Oe.registerClass(r);
  },
  registerSeriesModel: function(r) {
    Re.registerClass(r);
  },
  registerChartView: function(r) {
    be.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    ht.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    Rw(r, t);
  }
};
function Ke(r) {
  if (z(r)) {
    C(r, function(t) {
      Ke(t);
    });
    return;
  }
  vt(Ap, r) >= 0 || (Ap.push(r), q(r) && (r = {
    install: r
  }), r.install(RA));
}
var Qa = It();
function e_(r, t) {
  var e = U(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function OA(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = Gn(r), i = r.scale.getExtent(), n = e_(r, t), a = Pt(n, function(o) {
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
  return r.type === "category" ? kA(r) : BA(r);
}
function EA(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = e_(r, e);
    return {
      ticks: Pt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? NA(r, t) : {
    ticks: U(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function kA(r) {
  var t = r.getLabelModel(), e = r_(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function r_(r, t) {
  var e = i_(r, "labels"), i = Cf(t), n = n_(e, i);
  if (n)
    return n;
  var a, o;
  return q(i) ? a = s_(r, i) : (o = i === "auto" ? zA(r) : i, a = o_(r, o)), a_(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function NA(r, t) {
  var e = i_(r, "ticks"), i = Cf(t), n = n_(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), q(i))
    a = s_(r, i, !0);
  else if (i === "auto") {
    var s = r_(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = U(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = o_(r, o, !0);
  return a_(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function BA(r) {
  var t = r.scale.getTicks(), e = Gn(r);
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
function i_(r, t) {
  return Qa(r)[t] || (Qa(r)[t] = []);
}
function n_(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function a_(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function zA(r) {
  var t = Qa(r).autoInterval;
  return t ?? (Qa(r).autoInterval = r.calculateCategoryInterval());
}
function FA(r) {
  var t = HA(r), e = Gn(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), v = 0, f = 0; l <= a[1]; l += s) {
    var d = 0, g = 0, p = Nc(e({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, g = p.height * 1.3, v = Math.max(v, d, 7), f = Math.max(f, g, 7);
  }
  var y = v / h, m = f / c;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = Qa(r.model), S = r.getExtent(), w = b.lastAutoInterval, x = b.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && b.axisExtent0 === S[0] && b.axisExtent1 === S[1] ? _ = w : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = S[0], b.axisExtent1 = S[1]), _;
}
function HA(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function o_(r, t, e) {
  var i = Gn(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = n.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var c = t_(r), v = o.get("showMinLabel") || c, f = o.get("showMaxLabel") || c;
  v && u !== a[0] && g(a[0]);
  for (var d = u; d <= a[1]; d += l)
    g(d);
  f && d - l !== a[1] && g(a[1]);
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
function s_(r, t, e) {
  var i = r.scale, n = Gn(r), a = [];
  return C(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Ip = [0, 1], VA = (
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
      return kw(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), Lp(i, n.count())), vr(t, Ip, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), Lp(i, n.count()));
      var a = vr(t, i, Ip, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = EA(this, e), n = i.ticks, a = U(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return GA(this, a, o, t.clamp), a;
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
      return OA(this).labels;
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
      return FA(this);
    }, r;
  }()
);
function Lp(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function GA(r, t, e, i) {
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
    C(t, function(f) {
      f.coord -= u / 2;
    });
    var h = r.scale.getExtent();
    s = 1 + h[1] - t[n - 1].tickValue, o = {
      coord: t[n - 1].coord + u * s,
      tickValue: h[1] + 1
    }, t.push(o);
  }
  var c = a[0] > a[1];
  v(t[0].coord, a[0]) && (i ? t[0].coord = a[0] : t.shift()), i && v(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), v(a[1], o.coord) && (i ? o.coord = a[1] : t.pop()), i && v(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function v(f, d) {
    return f = Mt(f), d = Mt(d), c ? f > d : f < d;
  }
}
function WA(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new Bs(o, a) : null;
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
function UA(r) {
  var t = [];
  r.sort(function(g, p) {
    return p.priority - g.priority;
  });
  var e = new lt(0, 0, 0, 0);
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
    for (var c = a.obb, v = !1, f = 0; f < t.length; f++) {
      var d = t[f];
      if (e.intersect(d.rect)) {
        if (o && d.axisAligned) {
          v = !0;
          break;
        }
        if (d.obb || (d.obb = new Bs(d.localRect, d.transform)), c || (c = new Bs(s, l)), c.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), h && i(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var YA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      return Il(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new Ct(), n = gr("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = gr(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
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
  }(Re)
);
function Mf(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = Pn(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(Pn(r, t, e[o]));
    return a.join(" ");
  }
}
function l_(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!z(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Df = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = gr(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = XA, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      ks(this.childAt(0));
    }, t.prototype.downplay = function() {
      Ns(this.childAt(0));
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
        var c = e.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, e, i, l, c);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var f = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        h ? v.attr(f) : se(v, f, s, i), cm(v);
      }
      if (this._updateCommon(e, i, l, n, a), u) {
        var v = this.childAt(0);
        if (!h) {
          var f = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: v.style.opacity
            }
          };
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, pr(v, f, s, i);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, h, c, v, f, d, g, p, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, c = a.selectItemStyle, v = a.focus, f = a.blurScope, g = a.labelStatesModels, p = a.hoverScale, y = a.cursorStyle, d = a.emphasisDisabled), !a || e.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), c = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), f = _.get("blurScope"), d = _.get("disabled"), g = An(m), p = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var S = p0(e.getItemVisual(i, "symbolOffset"), n);
      S && (s.x = S[0], s.y = S[1]), y && s.attr("cursor", y);
      var w = e.getItemVisual(i, "style"), x = w.fill;
      if (s instanceof er) {
        var M = s.style;
        s.useStyle(N({
          // TODO other properties like x, y ?
          image: M.image,
          x: M.x,
          y: M.y,
          width: M.width,
          height: M.height
        }, w));
      } else
        s.__isEmptyBrush ? s.useStyle(N({}, w)) : s.useStyle(w), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var D = e.getItemVisual(i, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      uo(s, g, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: I,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function I(R) {
        return T ? e.getName(R) : Mf(e, R);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var P = s.ensureState("emphasis");
      P.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = h;
      var $ = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      P.scaleX = this._sizeX * $, P.scaleY = this._sizeY * $, this.setSymbolScale(1), Ga(this, v, f, d);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = ot(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && zs(l, {
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
      zs(a, {
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
      return BM(e.getItemVisual(i, "symbolSize"));
    }, t;
  }(Ct)
);
function XA(r, t) {
  this.parent.drift(r, t);
}
function Yu(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function Pp(r) {
  return r != null && !V(r) && (r = {
    isIgnore: r
  }), r || {};
}
function $p(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: An(t),
    cursorStyle: t.get("cursor")
  };
}
var qA = (
  /** @class */
  function() {
    function r(t) {
      this.group = new Ct(), this._SymbolCtor = t || Df;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = Pp(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = $p(t), u = {
        disableAnimation: s
      }, h = e.getSymbolPoint || function(c) {
        return t.getItemLayout(c);
      };
      a || i.removeAll(), t.diff(a).add(function(c) {
        var v = h(c);
        if (Yu(t, v, c, e)) {
          var f = new o(t, c, l, u);
          f.setPosition(v), t.setItemGraphicEl(c, f), i.add(f);
        }
      }).update(function(c, v) {
        var f = a.getItemGraphicEl(v), d = h(c);
        if (!Yu(t, d, c, e)) {
          i.remove(f);
          return;
        }
        var g = t.getItemVisual(c, "symbol") || "circle", p = f && f.getSymbolType && f.getSymbolType();
        if (!f || p && p !== g)
          i.remove(f), f = new o(t, c, l, u), f.setPosition(d);
        else {
          f.updateData(t, c, l, u);
          var y = {
            x: d[0],
            y: d[1]
          };
          s ? f.attr(y) : se(f, y, n);
        }
        i.add(f), t.setItemGraphicEl(c, f);
      }).remove(function(c) {
        var v = a.getItemGraphicEl(c);
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
      this._seriesScope = $p(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = Pp(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (Yu(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      lo(this._progressiveEls || this.group, t);
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
function u_(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = ZA(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, c = U(r.dimensions, function(d) {
    return t.mapDimension(d);
  }), v = !1, f = t.getCalculationInfo("stackResultDimension");
  return $n(
    t,
    c[0]
    /* , dims[1] */
  ) && (v = !0, c[0] = f), $n(
    t,
    c[1]
    /* , dims[0] */
  ) && (v = !0, c[1] = f), {
    dataDimsForPoint: c,
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
function ZA(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : yt(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function h_(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function KA(r, t) {
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
function QA(r, t, e, i, n, a, o, s) {
  for (var l = KA(r, t), u = [], h = [], c = [], v = [], f = [], d = [], g = [], p = u_(n, t, o), y = r.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], S = !0, w = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        w = b.idx * 2, x = b.idx1 * 2;
        var M = y[w], D = y[w + 1], A = m[x], T = m[x + 1];
        (isNaN(M) || isNaN(D)) && (M = A, D = T), u.push(M, D), h.push(A, T), c.push(e[w], e[w + 1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var I = b.idx, P = p.dataDimsForPoint, $ = n.dataToPoint([t.get(P[0], I), t.get(P[1], I)]);
        x = I * 2, u.push($[0], $[1]), h.push(m[x], m[x + 1]);
        var R = h_(p, n, t, I);
        c.push(R[0], R[1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(I));
        break;
      case "-":
        S = !1;
    }
    S && (f.push(b), d.push(d.length));
  }
  d.sort(function(St, xe) {
    return g[St] - g[xe];
  });
  for (var O = u.length, G = lr(O), E = lr(O), F = lr(O), W = lr(O), Q = [], _ = 0; _ < d.length; _++) {
    var et = d[_], ft = _ * 2, mt = et * 2;
    G[ft] = u[mt], G[ft + 1] = u[mt + 1], E[ft] = h[mt], E[ft + 1] = h[mt + 1], F[ft] = c[mt], F[ft + 1] = c[mt + 1], W[ft] = v[mt], W[ft + 1] = v[mt + 1], Q[_] = f[et];
  }
  return {
    current: G,
    next: E,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: Q
  };
}
var Pr = Math.min, $r = Math.max;
function Ai(r, t) {
  return isNaN(r) || isNaN(t);
}
function ic(r, t, e, i, n, a, o, s, l) {
  for (var u, h, c, v, f, d, g = e, p = 0; p < i; p++) {
    var y = t[g * 2], m = t[g * 2 + 1];
    if (g >= n || g < 0)
      break;
    if (Ai(y, m)) {
      if (l) {
        g += a;
        continue;
      }
      break;
    }
    if (g === e)
      r[a > 0 ? "moveTo" : "lineTo"](y, m), c = y, v = m;
    else {
      var _ = y - u, b = m - h;
      if (_ * _ + b * b < 0.5) {
        g += a;
        continue;
      }
      if (o > 0) {
        for (var S = g + a, w = t[S * 2], x = t[S * 2 + 1]; w === y && x === m && p < i; )
          p++, S += a, g += a, w = t[S * 2], x = t[S * 2 + 1], y = t[g * 2], m = t[g * 2 + 1], _ = y - u, b = m - h;
        var M = p + 1;
        if (l)
          for (; Ai(w, x) && M < i; )
            M++, S += a, w = t[S * 2], x = t[S * 2 + 1];
        var D = 0.5, A = 0, T = 0, I = void 0, P = void 0;
        if (M >= i || Ai(w, x))
          f = y, d = m;
        else {
          A = w - u, T = x - h;
          var $ = y - u, R = w - y, O = m - h, G = x - m, E = void 0, F = void 0;
          if (s === "x") {
            E = Math.abs($), F = Math.abs(R);
            var W = A > 0 ? 1 : -1;
            f = y - W * E * o, d = m, I = y + W * F * o, P = m;
          } else if (s === "y") {
            E = Math.abs(O), F = Math.abs(G);
            var Q = T > 0 ? 1 : -1;
            f = y, d = m - Q * E * o, I = y, P = m + Q * F * o;
          } else
            E = Math.sqrt($ * $ + O * O), F = Math.sqrt(R * R + G * G), D = F / (F + E), f = y - A * o * (1 - D), d = m - T * o * (1 - D), I = y + A * o * D, P = m + T * o * D, I = Pr(I, $r(w, y)), P = Pr(P, $r(x, m)), I = $r(I, Pr(w, y)), P = $r(P, Pr(x, m)), A = I - y, T = P - m, f = y - A * E / F, d = m - T * E / F, f = Pr(f, $r(u, y)), d = Pr(d, $r(h, m)), f = $r(f, Pr(u, y)), d = $r(d, Pr(h, m)), A = y - f, T = m - d, I = y + A * F / E, P = m + T * F / E;
        }
        r.bezierCurveTo(c, v, f, d, y, m), c = I, v = P;
      } else
        r.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return p;
}
var c_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  }()
), jA = (
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
      return new c_();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && Ai(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && Ai(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += ic(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = Ri.CMD, s, l, u = i === "x", h = [], c = 0; c < a.length; ) {
        var v = a[c++], f = void 0, d = void 0, g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (f = a[c++], d = a[c++], _ = u ? (e - s) / (f - s) : (e - l) / (d - l), _ <= 1 && _ >= 0) {
              var b = u ? (d - l) * _ + l : (f - s) * _ + s;
              return u ? [e, b] : [b, e];
            }
            s = f, l = d;
            break;
          case o.C:
            f = a[c++], d = a[c++], g = a[c++], p = a[c++], y = a[c++], m = a[c++];
            var S = u ? Ds(s, f, g, y, e, h) : Ds(l, d, p, m, e, h);
            if (S > 0)
              for (var w = 0; w < S; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var b = u ? $t(l, d, p, m, x) : $t(s, f, g, y, x);
                  return u ? [e, b] : [b, e];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(ct)
), JA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(c_)
), t2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new JA();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && Ai(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && Ai(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = ic(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        ic(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  }(ct)
);
function f_(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = e.get(["lineStyle", "width"]) || 0;
  o -= h / 2, s -= h / 2, l += h, u += h, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var c = new bt({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var v = r.getBaseAxis(), f = v.isHorizontal(), d = v.inverse;
    f ? (d && (c.shape.x += l), c.shape.width = 0) : (d || (c.shape.y += u), c.shape.height = 0);
    var g = q(n) ? function(p) {
      n(p, c);
    } : null;
    pr(c, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, g);
  }
  return c;
}
function v_(r, t, e) {
  var i = r.getArea(), n = Mt(i.r0, 1), a = Mt(i.r, 1), o = new zn({
    shape: {
      cx: Mt(r.cx, 1),
      cy: Mt(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, pr(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function e2(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return v_(r, t, e);
    if (r.type === "cartesian2d")
      return f_(r, t, e, i, n);
  } else return null;
  return null;
}
function Rl(r, t) {
  return r.type === t;
}
function Rp(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function Op(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function Ep(r, t) {
  var e = Op(r), i = e[0], n = e[1], a = Op(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function kp(r) {
  return yt(r) ? r : r ? 0.5 : 0;
}
function r2(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = lr(i * 2), a = 0; a < i; a++) {
    var o = h_(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function Rr(r, t, e, i, n) {
  var a = e.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], h = [], c = [], v = [];
  if (n) {
    for (l = 0; l < r.length; l += 2) {
      var f = t || r;
      !isNaN(f[l]) && !isNaN(f[l + 1]) && v.push(r[l], r[l + 1]);
    }
    r = v;
  }
  for (l = 0; l < r.length - 2; l += 2)
    switch (c[0] = r[l + 2], c[1] = r[l + 3], h[0] = r[l], h[1] = r[l + 1], s.push(h[0], h[1]), i) {
      case "end":
        u[o] = c[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var d = (h[o] + c[o]) / 2, g = [];
        u[o] = g[o] = d, u[1 - o] = h[1 - o], g[1 - o] = c[1 - o], s.push(u[0], u[1]), s.push(g[0], g[1]);
        break;
      default:
        u[o] = h[o], u[1 - o] = c[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function i2(r, t) {
  var e = [], i = r.length, n, a;
  function o(h, c, v) {
    var f = h.coord, d = (v - f) / (c.coord - f), g = aw(d, [h.color, c.color]);
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
function n2(r, t, e) {
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
      }), h = u.length, c = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), c.reverse());
      var v = i2(u, n === "x" ? e.getWidth() : e.getHeight()), f = v.length;
      if (!f && h)
        return u[0].coord < 0 ? c[1] ? c[1] : u[h - 1].color : c[0] ? c[0] : u[0].color;
      var d = 10, g = v[0].coord - d, p = v[f - 1].coord + d, y = p - g;
      if (y < 1e-3)
        return "transparent";
      C(v, function(_) {
        _.offset = (_.coord - g) / y;
      }), v.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: f ? v[f - 1].offset : 0.5,
        color: c[1] || "transparent"
      }), v.unshift({
        offset: f ? v[0].offset : 0.5,
        color: c[0] || "transparent"
      });
      var m = new jc(0, 0, 0, 0, v, !0);
      return m[n] = g, m[n + "2"] = p, m;
    }
  }
}
function a2(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && o2(a, t))) {
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
function o2(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (Df.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function s2(r, t) {
  return isNaN(r) || isNaN(t);
}
function l2(r) {
  for (var t = r.length / 2; t > 0 && s2(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function Np(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function u2(r, t, e) {
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
function d_(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Ze.length; t++)
    if (r.get([Ze[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function Xu(r, t, e, i) {
  if (Rl(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = d_(i) ? function(f, d) {
      r._endLabelOnDuring(f, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = f_(t, e, i, function() {
      var f = r._endLabel;
      f && e && s.originalX != null && f.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!i.get("clip", !0)) {
      var c = h.shape, v = Math.max(c.width, c.height);
      u ? (c.y -= v, c.height += v * 2) : (c.x -= v, c.width += v * 2);
    }
    return l && l(1, h), h;
  } else
    return v_(t, e, i);
}
function h2(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var c2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new Ct(), i = new qA();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = J(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), h = s.getLayout("points") || [], c = a.type === "polar", v = this._coordSys, f = this._symbolDraw, d = this._polyline, g = this._polygon, p = this._lineGroup, y = !i.ssr && e.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = u_(a, s, _), S = m && r2(a, s, b), w = e.get("showSymbol"), x = e.get("connectNulls"), M = w && !c && a2(e, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(St, xe) {
        St.__temp && (o.remove(St), D.setItemGraphicEl(xe, null));
      }), w || f.remove(), o.add(p);
      var A = c ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var I = n2(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && A === this._step))
        w && f.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(St) {
            return [h[St * 2], h[St * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), d = this._newPolyline(h), m ? g = this._newPolygon(h, S) : g && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(e, a, Oi(I)), p.setClipPath(Xu(this, a, !0, e));
      else {
        m && !g ? g = this._newPolygon(h, S) : g && !m && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(e, a, Oi(I));
        var P = p.getClipPath();
        if (P) {
          var $ = Xu(this, a, !1, e);
          pr(P, {
            shape: $.shape
          }, e);
        } else
          p.setClipPath(Xu(this, a, !0, e));
        w && f.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(St) {
            return [h[St * 2], h[St * 2 + 1]];
          }
        }), (!Rp(this._stackedOnPoints, S) || !Rp(this._points, h)) && (y ? this._doUpdateAnimation(s, S, a, n, A, _, x) : (A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), d.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: S
        })));
      }
      var R = e.getModel("emphasis"), O = R.get("focus"), G = R.get("blurScope"), E = R.get("disabled");
      if (d.useStyle(ut(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: I,
          lineJoin: "bevel"
        }
      )), Oh(d, e, "lineStyle"), d.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = d.getState("emphasis").style;
        F.lineWidth = +d.style.lineWidth + 1;
      }
      ot(d).seriesIndex = e.seriesIndex, Ga(d, O, G, E);
      var W = kp(e.get("smooth")), Q = e.get("smoothMonotone");
      if (d.setShape({
        smooth: W,
        smoothMonotone: Q,
        connectNulls: x
      }), g) {
        var et = s.getCalculationInfo("stackedOnSeries"), ft = 0;
        g.useStyle(ut(u.getAreaStyle(), {
          fill: I,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), et && (ft = kp(et.get("smooth"))), g.setShape({
          smooth: W,
          stackedOnSmooth: ft,
          smoothMonotone: Q,
          connectNulls: x
        }), Oh(g, e, "areaStyle"), ot(g).seriesIndex = e.seriesIndex, Ga(g, O, G, E);
      }
      var mt = this._changePolyState;
      s.eachItemGraphicEl(function(St) {
        St && (St.onHoverStateChange = mt);
      }), this._polyline.onHoverStateChange = mt, this._data = s, this._coordSys = a, this._stackedOnPoints = S, this._points = h, this._step = A, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, d), g && this.packEventData(e, g));
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
      var o = e.getData(), s = $i(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], c = l[s * 2 + 1];
          if (isNaN(h) || isNaN(c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, c))
            return;
          var v = e.get("zlevel") || 0, f = e.get("z") || 0;
          u = new Df(o, s), u.x = h, u.y = c, u.setZ(v, f);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = v, d.z = f, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        be.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = $i(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        be.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      qv(this._polyline, e), i && qv(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new jA({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new t2({
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
      var c = u.get("animationDelay") || 0, v = q(c) ? c(null) : c;
      e.eachItemGraphicEl(function(f, d) {
        var g = f;
        if (g) {
          var p = [f.x, f.y], y = void 0, m = void 0, _ = void 0;
          if (n)
            if (o) {
              var b = n, S = i.pointToCoord(p);
              a ? (y = b.startAngle, m = b.endAngle, _ = -S[1] / 180 * Math.PI) : (y = b.r0, m = b.r, _ = S[0]);
            } else {
              var w = n;
              a ? (y = w.x, m = w.x + w.width, _ = f.x) : (y = w.y + w.height, m = w.y, _ = f.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var M = q(c) ? c(d) : h * x + v, D = g.getSymbolPath(), A = D.getTextContent();
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
      if (d_(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new At({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = l2(l);
        h >= 0 && (uo(s, An(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: h,
          defaultText: function(c, v, f) {
            return f != null ? l_(o, f) : Mf(o, c);
          },
          enableTextSetter: !0
        }, h2(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = n.getLayout("points"), v = n.hostModel, f = v.get("connectNulls"), d = s.get("precision"), g = s.get("distance") || 0, p = l.getBaseAxis(), y = p.isHorizontal(), m = p.inverse, _ = i.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, S = (y ? g : 0) * (m ? -1 : 1), w = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", M = u2(c, b, x), D = M.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !f) {
            var I = Np(c, D[0]);
            u.attr({
              x: I[0] + S,
              y: I[1] + w
            }), o && (T = v.getRawValue(D[0]));
          } else {
            var I = h.getPointOn(b, x);
            I && u.attr({
              x: I[0] + S,
              y: I[1] + w
            });
            var P = v.getRawValue(D[0]), $ = v.getRawValue(D[1]);
            o && (T = rS(n, d, P, $, M.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = e === 1 || a.lastFrameIndex > 0 ? D[0] : 0, I = Np(c, R);
          o && (T = v.getRawValue(R)), u.attr({
            x: I[0] + S,
            y: I[1] + w
          });
        }
        if (o) {
          var O = gl(u);
          typeof O.setLabelText == "function" && O.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, h = this._polygon, c = e.hostModel, v = QA(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), f = v.current, d = v.stackedOnCurrent, g = v.next, p = v.stackedOnNext;
      if (o && (d = Rr(v.stackedOnCurrent, v.current, n, o, l), f = Rr(v.current, null, n, o, l), p = Rr(v.stackedOnNext, v.next, n, o, l), g = Rr(v.next, null, n, o, l)), Ep(f, g) > 3e3 || h && Ep(d, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: g
        }), h && (h.stopAnimation(), h.setShape({
          points: g,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = f;
      var y = {
        shape: {
          points: g
        }
      };
      v.current !== f && (y.shape.__points = v.next), u.stopAnimation(), se(u, y, c), h && (h.setShape({
        // Reuse the points with polyline.
        points: f,
        stackedOnPoints: d
      }), h.stopAnimation(), se(h, {
        shape: {
          stackedOnPoints: p
        }
      }, c), u.shape.points !== h.shape.points && (h.shape.points = u.shape.points));
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
  }(be)
);
function f2(r, t) {
  return {
    seriesType: r,
    plan: df(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = U(n.dimensions, function(c) {
          return i.mapDimension(c);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        $n(i, a[0]) && (a[0] = s), $n(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), h = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(c, v) {
            for (var f = c.end - c.start, d = lr(f * o), g = [], p = [], y = c.start, m = 0; y < c.end; y++) {
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
var v2 = {
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
}, d2 = function(r) {
  return Math.round(r.length / 2);
};
function p_(r) {
  return {
    seriesType: r,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, e, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), h = l.getExtent(), c = i.getDevicePixelRatio(), v = Math.abs(h[1] - h[0]) * (c || 1), f = Math.round(s / v);
        if (isFinite(f) && f > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / f)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / f));
          var d = void 0;
          H(a) ? d = v2[a] : q(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / f, d, d2));
        }
      }
    }
  };
}
function p2(r) {
  r.registerChartView(c2), r.registerSeriesModel(YA), r.registerLayout(f2("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, p_("line"));
}
var nc = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return Il(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          C(a.getAxes(), function(v, f) {
            if (v.type === "category" && i != null) {
              var d = v.getTicksCoords(), g = v.getTickModel().get("alignWithLabel"), p = o[f], y = i[f] === "x1" || i[f] === "y1";
              if (y && !g && (p += 1), d.length < 2)
                return;
              if (d.length === 2) {
                s[f] = v.toGlobalCoord(v.getExtent()[y ? 1 : 0]);
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
              _ == null && (m ? m && (_ = d[d.length - 1].coord) : _ = d[0].coord), s[f] = v.toGlobalCoord(_);
            }
          });
        else {
          var l = this.getData(), u = l.getLayout("offset"), h = l.getLayout("size"), c = a.getBaseAxis().isHorizontal() ? 0 : 1;
          s[c] += u + h / 2;
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
  }(Re)
);
Re.registerClass(nc);
var g2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return Il(null, this, {
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
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = ml(nc.defaultOption, {
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
  }(nc)
), y2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  }()
), Bp = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new y2();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, h = i.startAngle, c = i.endAngle, v = i.clockwise, f = Math.PI * 2, d = v ? c - h < f : h - c < f;
      d || (h = c - (v ? f : -f));
      var g = Math.cos(h), p = Math.sin(h), y = Math.cos(c), m = Math.sin(c);
      d ? (e.moveTo(g * o + n, p * o + a), e.arc(g * u + n, p * u + a, l, -Math.PI + h, h, !v)) : e.moveTo(g * s + n, p * s + a), e.arc(n, a, s, h, c, !v), e.arc(y * u + n, m * u + a, l, c - Math.PI * 2, c - Math.PI, !v), o !== 0 && e.arc(n, a, o, c, h, v);
    }, t;
  }(ct)
);
function m2(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return $s(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, h = u.cx, c = u.cy, v = u.r, f = u.r0, d = (v + f) / 2, g = u.startAngle, p = u.endAngle, y = (g + p) / 2, m = e ? Math.abs(v - f) / 2 : 0, _ = Math.cos, b = Math.sin, S = h + v * _(g), w = c + v * b(g), x = "left", M = "top";
    switch (s) {
      case "startArc":
        S = h + (f - l) * _(y), w = c + (f - l) * b(y), x = "center", M = "top";
        break;
      case "insideStartArc":
        S = h + (f + l) * _(y), w = c + (f + l) * b(y), x = "center", M = "bottom";
        break;
      case "startAngle":
        S = h + d * _(g) + qo(g, l + m, !1), w = c + d * b(g) + Zo(g, l + m, !1), x = "right", M = "middle";
        break;
      case "insideStartAngle":
        S = h + d * _(g) + qo(g, -l + m, !1), w = c + d * b(g) + Zo(g, -l + m, !1), x = "left", M = "middle";
        break;
      case "middle":
        S = h + d * _(y), w = c + d * b(y), x = "center", M = "middle";
        break;
      case "endArc":
        S = h + (v + l) * _(y), w = c + (v + l) * b(y), x = "center", M = "bottom";
        break;
      case "insideEndArc":
        S = h + (v - l) * _(y), w = c + (v - l) * b(y), x = "center", M = "top";
        break;
      case "endAngle":
        S = h + d * _(p) + qo(p, l + m, !0), w = c + d * b(p) + Zo(p, l + m, !0), x = "left", M = "middle";
        break;
      case "insideEndAngle":
        S = h + d * _(p) + qo(p, -l + m, !0), w = c + d * b(p) + Zo(p, -l + m, !0), x = "right", M = "middle";
        break;
      default:
        return $s(i, n, a);
    }
    return i = i || {}, i.x = S, i.y = w, i.align = x, i.verticalAlign = M, i;
  };
}
function _2(r, t, e, i) {
  if (yt(i)) {
    r.setTextConfig({
      rotation: i
    });
    return;
  } else if (z(t)) {
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
function qo(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function Zo(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function b2(r, t, e) {
  var i = r.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  z(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: U(i, function(a) {
      return qe(a, n);
    })
  };
}
var qu = Math.max, Zu = Math.min;
function w2(r, t) {
  var e = r.getArea && r.getArea();
  if (Rl(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var S2 = (
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
      lo(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, h = u.getBaseAxis(), c;
      u.type === "cartesian2d" ? c = h.isHorizontal() : u.type === "polar" && (c = h.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, f = x2(e, u);
      f && this._enableRealtimeSort(f, s, n);
      var d = e.get("clip", !0) || f, g = w2(u, s);
      o.removeClipPath();
      var p = e.get("roundCap", !0), y = e.get("showBackground", !0), m = e.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], S = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function M(T) {
        var I = Ko[u.type](s, T), P = L2(u, c, I);
        return P.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? P.setShape("r", _) : P.setShape("cornerRadius", _), b[T] = P, P;
      }
      s.diff(l).add(function(T) {
        var I = s.getItemModel(T), P = Ko[u.type](s, T, I);
        if (y && M(T), !(!s.hasValue(T) || !Gp[u.type](P))) {
          var $ = !1;
          d && ($ = zp[u.type](g, P));
          var R = Fp[u.type](e, s, T, P, c, v, h.model, !1, p);
          f && (R.forceLabelAnimation = !0), Wp(R, s, T, I, P, e, c, u.type === "polar"), w ? R.attr({
            shape: P
          }) : f ? Hp(f, v, R, P, T, c, !1, !1) : pr(R, {
            shape: P
          }, e, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = $;
        }
      }).update(function(T, I) {
        var P = s.getItemModel(T), $ = Ko[u.type](s, T, P);
        if (y) {
          var R = void 0;
          S.length === 0 ? R = M(I) : (R = S[I], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), b[T] = R);
          var O = Ko[u.type](s, T), G = y_(c, O, u);
          se(R, {
            shape: G
          }, v, T);
        }
        var E = l.getItemGraphicEl(I);
        if (!s.hasValue(T) || !Gp[u.type]($)) {
          o.remove(E);
          return;
        }
        var F = !1;
        if (d && (F = zp[u.type](g, $), F && o.remove(E)), E ? cm(E) : E = Fp[u.type](e, s, T, $, c, v, h.model, !!E, p), f && (E.forceLabelAnimation = !0), x) {
          var W = E.getTextContent();
          if (W) {
            var Q = gl(W);
            Q.prevValue != null && (Q.prevValue = Q.value);
          }
        } else
          Wp(E, s, T, P, $, e, c, u.type === "polar");
        w ? E.attr({
          shape: $
        }) : f ? Hp(f, v, E, $, T, c, !0, x) : se(E, {
          shape: $
        }, e, T, null), s.setItemGraphicEl(T, E), E.ignore = F, o.add(E);
      }).remove(function(T) {
        var I = l.getItemGraphicEl(T);
        I && Bh(I, e, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new Ct());
      D.removeAll();
      for (var A = 0; A < b.length; ++A)
        D.add(b[A]);
      o.add(D), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Yp(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Yp(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && e2(e.coordinateSystem, !1, e), n = this.group;
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
        var h = e.rawIndexOf(o, a.getRawOrdinalNumber(l)), c = h < 0 ? Number.MIN_VALUE : i(e.indexOfRawIndex(h));
        if (c > s)
          return !0;
        s = c;
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
        Bh(a, e, ot(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(be)
), zp = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = qu(t.x, r.x), s = Zu(t.x + t.width, n), l = qu(t.y, r.y), u = Zu(t.y + t.height, a), h = s < o, c = u < l;
    return t.x = h && o > n ? s : o, t.y = c && l > a ? u : l, t.width = h ? 0 : s - o, t.height = c ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), h || c;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = Zu(t.r, r.r), a = qu(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, Fp = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new bt({
      shape: N({}, i),
      z2: 1
    });
    if (u.__dataIndex = e, u.name = "item", a) {
      var h = u.shape, c = n ? "height" : "width";
      h[c] = 0;
    }
    return u;
  },
  polar: function(r, t, e, i, n, a, o, s, l) {
    var u = !n && l ? Bp : zn, h = new u({
      shape: i,
      z2: 1
    });
    h.name = "item";
    var c = g_(n);
    if (h.calculateTextPosition = m2(c, {
      isRoundCap: u === Bp
    }), a) {
      var v = h.shape, f = n ? "r" : "endAngle", d = {};
      v[f] = n ? i.r0 : i.startAngle, d[f] = i[f], (s ? se : pr)(h, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function x2(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function Hp(r, t, e, i, n, a, o, s) {
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
  }), s || (o ? se : pr)(e, {
    shape: l
  }, t, n, null);
  var h = t ? r.baseAxis.model : null;
  (o ? se : pr)(e, {
    shape: u
  }, h, n);
}
function Vp(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var T2 = ["x", "y", "width", "height"], C2 = ["cx", "cy", "r", "startAngle", "endAngle"], Gp = {
  cartesian2d: function(r) {
    return !Vp(r, T2);
  },
  polar: function(r) {
    return !Vp(r, C2);
  }
}, Ko = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? D2(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
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
function M2(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function g_(r) {
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
function Wp(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = r.shape, c = b2(i.getModel("itemStyle"), h);
      N(h, c), r.setShape(h);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var f = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", d = An(i);
  uo(r, d, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: Mf(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: f
  });
  var g = r.getTextContent();
  if (s && g) {
    var p = i.get(["label", "position"]);
    r.textConfig.inside = p === "middle" ? !0 : null, _2(r, p === "outside" ? f : p, g_(o), i.get(["label", "rotate"]));
  }
  gT(g, d, a.getRawValue(e), function(m) {
    return l_(t, m);
  });
  var y = i.getModel(["emphasis"]);
  Ga(r, y.get("focus"), y.get("blurScope"), y.get("disabled")), Oh(r, i), M2(n) && (r.style.fill = "none", r.style.stroke = "none", C(r.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function D2(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var A2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
    }
    return r;
  }()
), Up = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new A2();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < n.length; h += 3)
        l[a] = u, l[o] = n[h + 2], s[a] = n[h + a], s[o] = n[h + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(ct)
);
function Yp(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new Up({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), e && e.push(h);
  }
  var c = new Up({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  c.baseDimIdx = a, c.largeDataIndices = o, c.barWidth = s, t.add(c), c.useStyle(n.getVisual("style")), c.style.stroke = null, ot(c).seriesIndex = r.seriesIndex, r.get("silent") || (c.on("mousedown", Xp), c.on("mousemove", Xp)), e && e.push(c);
}
var Xp = pf(function(r) {
  var t = this, e = I2(t, r.offsetX, r.offsetY);
  ot(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function I2(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, h = 0, c = a.length / 3; h < c; h++) {
    var v = h * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function y_(r, t, e) {
  if (Rl(e, "cartesian2d")) {
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
function L2(r, t, e) {
  var i = r.type === "polar" ? zn : bt;
  return new i({
    shape: y_(t, e, r),
    silent: !0,
    z2: 0
  });
}
function P2(r) {
  r.registerChartView(S2), r.registerSeriesModel(g2), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, Dt(lA, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, uA("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, p_("bar")), r.registerAction({
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
var $2 = (
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
  }(ht)
), ac = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", Le).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(ht)
);
Je(ac, $A);
var m_ = {
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
}, R2 = nt({
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
}, m_), Af = nt({
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
}, m_), O2 = nt({
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
}, Af), E2 = ut({
  logBase: 10
}, Af);
const k2 = {
  category: R2,
  value: Af,
  time: O2,
  log: E2
};
var N2 = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function qp(r, t, e, i) {
  C(N2, function(n, a) {
    var o = nt(nt({}, k2[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, c) {
          var v = Ya(this), f = v ? Tl(h) : {}, d = c.getTheme();
          nt(h, d.get(a + "Axis")), nt(h, this.getDefaultOption()), h.type = Zp(h), v && Ln(h, f, v);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = ec.createByAxisModel(this));
        }, u.prototype.getCategories = function(h) {
          var c = this.option;
          if (c.type === "category")
            return h ? c.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      }(e)
    );
    r.registerComponentModel(s);
  }), r.registerSubTypeDefaulter(t + "Axis", Zp);
}
function Zp(r) {
  return r.type || (r.data ? "category" : "value");
}
var B2 = (
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
), oc = ["x", "y"];
function Kp(r) {
  return r.type === "interval" || r.type === "time";
}
var z2 = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = oc, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Kp(e) || !Kp(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, c = (s[1] - o[1]) / u, v = o[0] - n[0] * h, f = o[1] - a[0] * c, d = this._transform = [h, 0, 0, c, v, f];
          this._invTransform = Oc([], d);
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
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new lt(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return me(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return me(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new lt(a, o, s, l);
    }, t;
  }(B2)
), F2 = (
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
  }(VA)
);
function sc(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, h = i.getRect(), c = [h.x, h.x + h.width, h.y, h.y + h.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, f = t.get("offset") || 0, d = u === "x" ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    d[v.onZero] = Math.max(Math.min(g, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[v[l]] : c[0], u === "x" ? d[v[l]] : c[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Dn(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function Qp(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function jp(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return C(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, Le).models[0];
    t[i] = a;
  }), t;
}
var Ku = Math.log;
function H2(r, t, e) {
  var i = Vn.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = J0(r, t), u = l.extent, h = l.fixMin, c = l.fixMax;
  if (r.type === "log") {
    var v = Ku(r.base);
    u = [Ku(u[0]) / v, Ku(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: c
  });
  var f = i.getExtent.call(r);
  h && (u[0] = f[0]), c && (u[1] = f[1]);
  var d = i.getInterval.call(r), g = u[0], p = u[1];
  if (h && c)
    d = (p - g) / o;
  else if (h)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = Uu(d), p = u[0] + d * o;
  else if (c)
    for (g = u[1] - d * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      d = Uu(d), g = u[1] - d * o;
  else {
    var y = r.getTicks().length - 1;
    y > o && (d = Uu(d));
    var m = d * o;
    p = Math.ceil(u[1] / d) * d, g = Mt(p - m), g < 0 && u[0] >= 0 ? (g = 0, p = Mt(m)) : p > 0 && u[1] <= 0 && (p = 0, g = -Mt(m));
  }
  var _ = (n[0].value - a[0].value) / s, b = (n[o].value - a[o].value) / s;
  i.setExtent.call(r, g + d * _, p + d * b), i.setInterval.call(r, d), (_ || b) && i.setNiceExtent.call(r, g + d, p - d);
}
var V2 = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = oc, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = gt(o), u = l.length;
        if (u) {
          for (var h = [], c = u - 1; c >= 0; c--) {
            var v = +l[c], f = o[v], d = f.model, g = f.scale;
            // Only value and log axis without interval support alignTicks.
            rc(g) && d.get("alignTicks") && d.get("interval") == null ? h.push(f) : (Dp(g, d), rc(g) && (s = f));
          }
          h.length && (s || (s = h.pop(), Dp(s.scale, s.model)), C(h, function(p) {
            H2(p.scale, p.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      C(i.x, function(o) {
        Jp(i, "y", o, a);
      }), C(i.y, function(o) {
        Jp(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = In(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (C(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = IA(u);
          if (h) {
            var c = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[c] -= h[c] + v, u.position === "top" ? o.y += h.height + v : u.position === "left" && (o.x += h.width + v);
          }
        }
      }), l()), C(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        C(s, function(u) {
          var h = u.isHorizontal(), c = h ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(c[v], c[1 - v]), G2(u, h ? o.x : o.y);
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
      V(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
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
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", Le).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", Le).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, vt(o, s) < 0 && (s = null);
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
      this._axesMap = s, C(s.x, function(h, c) {
        C(s.y, function(v, f) {
          var d = "x" + c + "y" + f, g = new z2(d);
          g.master = n, g.model = t, n._coordsMap[d] = g, n._coordsList.push(g), g.addAxis(h), g.addAxis(v);
        });
      });
      function u(h) {
        return function(c, v) {
          if (Qu(c, t)) {
            var f = c.get("position");
            h === "x" ? f !== "top" && f !== "bottom" && (f = o.bottom ? "top" : "bottom") : f !== "left" && f !== "right" && (f = o.left ? "right" : "left"), o[f] = !0;
            var d = new F2(h, DA(c), [0, 0], c.get("type"), f), g = d.type === "category";
            d.onBand = g && c.get("boundaryGap"), d.inverse = c.get("inverse"), c.axis = d, d.model = c, d.grid = a, d.index = v, a._axesList.push(d), s[h][v] = d, l[h]++;
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
        if (Qp(n)) {
          var a = jp(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Qu(o, e) || !Qu(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), h = l.getAxis("x"), c = l.getAxis("y");
          i(u, h), i(u, c);
        }
      }, this);
      function i(n, a) {
        C(PA(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return C(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        vt(e, a) < 0 && e.push(a), vt(i, o) < 0 && i.push(o);
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
        if (Qp(n)) {
          var a = jp(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = oc, r;
  }()
);
function Qu(r, t) {
  return r.getCoordSysModel() === t;
}
function Jp(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    tg(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && tg(n[u]) && !i[h(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[h(a)] = !0);
  function h(c) {
    return c.dim + "_" + c.index;
  }
}
function tg(r) {
  return r && r.type !== "category" && r.type !== "time" && AA(r);
}
function G2(r, t) {
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
var Fr = Math.PI, Gr = (
  /** @class */
  function() {
    function r(t, e) {
      this.group = new Ct(), this.opt = e, this.axisModel = t, ut(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Ct({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!eg[t];
    }, r.prototype.add = function(t) {
      eg[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = Ry(e - t), a, o;
      return Rs(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Rs(n - Fr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < Fr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), eg = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (me(s, s, o), me(l, l, o));
      var h = N({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), c = new Ur({
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
      Wa(c.shape, c.style.lineWidth), c.anid = "line", e.add(c);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var f = t.get(["axisLine", "symbolSize"]);
        H(v) && (v = [v, v]), (H(f) || yt(f)) && (f = [f, f]);
        var d = p0(t.get(["axisLine", "symbolOffset"]) || 0, f), g = f[0], p = f[1];
        C([{
          rotate: r.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = gr(v[m], -g / 2, -p / 2, g, p, h.stroke, !0), b = y.r + y.offset, S = u ? l : s;
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
    var n = Y2(e, i, t, r), a = q2(e, i, t, r);
    if (U2(t, a, n), X2(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = WA(U(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      UA(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = Dn(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, c = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        ig(a) ? r.labelOffset + o * l : 0
      ], v, f = t.get("nameRotate");
      f != null && (f = f * Fr / 180);
      var d;
      ig(a) ? v = Gr.innerTextLayout(
        r.rotation,
        f ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = W2(r.rotation, a, f || 0, u), d = r.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, y = p.ellipsis, m = Dn(r.nameTruncateMaxWidth, p.maxWidth, d), _ = new At({
        x: c[0],
        y: c[1],
        rotation: v.rotation,
        silent: Gr.isLabelSilent(t),
        style: Ye(s, {
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
      if (dl({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var b = Gr.makeAxisEventDataBase(t);
        b.targetType = "axisName", b.name = n, ot(_).eventData = b;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function W2(r, t, e, i) {
  var n = Ry(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Rs(n - Fr / 2) ? (o = l ? "bottom" : "top", a = "center") : Rs(n - Fr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < Fr * 1.5 && n > Fr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function U2(r, t, e) {
  if (!t_(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], h = e[1], c = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (ue(a), ue(u)) : rg(a, o) && (i ? (ue(o), ue(h)) : (ue(a), ue(u))), n === !1 ? (ue(s), ue(c)) : rg(l, s) && (n ? (ue(l), ue(v)) : (ue(s), ue(c)));
  }
}
function ue(r) {
  r && (r.ignore = !0);
}
function rg(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = $c([]);
    return Rc(n, n, -r.rotation), e.applyTransform(yn([], n, r.getLocalTransform())), i.applyTransform(yn([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function ig(r) {
  return r === "middle" || r === "center";
}
function __(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (me(o, o, t), me(s, s, t));
    var h = new Ur({
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
    Wa(h.shape, h.style.lineWidth), h.anid = n + "_" + r[l].tickValue, a.push(h);
  }
  return a;
}
function Y2(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), h = __(u, t.transform, l, ut(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), c = 0; c < h.length; c++)
      r.add(h[c]);
    return h;
  }
}
function X2(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ut(s.getLineStyle(), ut(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var c = __(o[h], t.transform, l, u, "minorticks_" + h), v = 0; v < c.length; v++)
          r.add(c[v]);
  }
}
function q2(r, t, e, i) {
  var n = e.axis, a = Dn(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (Dn(i.labelRotate, o.get("rotate")) || 0) * Fr / 180, h = Gr.innerTextLayout(i.rotation, u, i.labelDirection), c = e.getCategories && e.getCategories(!0), v = [], f = Gr.isLabelSilent(e), d = e.get("triggerEvent");
    return C(l, function(g, p) {
      var y = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (c && c[y]) {
        var S = c[y];
        V(S) && S.textStyle && (b = new xt(S.textStyle, o, e.ecModel));
      }
      var w = b.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(y), M = b.getShallow("align", !0) || h.textAlign, D = tt(b.getShallow("alignMinLabel", !0), M), A = tt(b.getShallow("alignMaxLabel", !0), M), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, I = tt(b.getShallow("verticalAlignMinLabel", !0), T), P = tt(b.getShallow("verticalAlignMaxLabel", !0), T), $ = new At({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: h.rotation,
        silent: f,
        z2: 10 + (g.level || 0),
        style: Ye(b, {
          text: m,
          align: p === 0 ? D : p === l.length - 1 ? A : M,
          verticalAlign: p === 0 ? I : p === l.length - 1 ? P : T,
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
      if ($.anid = "label_" + y, dl({
        el: $,
        componentModel: e,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return $.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var R = Gr.makeAxisEventDataBase(e);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = p, n.type === "category" && (R.dataIndex = y), ot($).eventData = R;
      }
      t.add($), $.updateTransform(), v.push($), r.add($), $.decomposeTransform();
    }), v;
  }
}
function Z2(r, t) {
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
  return K2(e, r, t), e.seriesInvolved && j2(e, r), e;
}
function K2(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  C(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = ja(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var h = s.model, c = h.getModel("tooltip", i);
    if (C(s.getAxes(), Dt(g, !1, null)), s.getTooltipAxes && i && c.get("show")) {
      var v = c.get("trigger") === "axis", f = c.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (v || f) && C(d.baseAxes, Dt(g, f ? "cross" : !0, v)), f && C(d.otherAxes, Dt(g, "cross", !1));
    }
    function g(p, y, m) {
      var _ = m.model.getModel("axisPointer", n), b = _.get("show");
      if (!(!b || b === "auto" && !p && !lc(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = p ? Q2(m, c, n, t, p, y) : _;
        var S = _.get("snap"), w = _.get("triggerEmphasis"), x = ja(m.model), M = y || S || m.type === "category", D = r.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: M,
          snap: S,
          useHandle: lc(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, r.seriesInvolved = r.seriesInvolved || M;
        var A = J2(a, m);
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
function Q2(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  C(s, function(v) {
    l[v] = X(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var c = l.lineStyle = o.get("crossStyle");
      c && ut(u, c.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new xt(l, e, i));
}
function j2(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || C(r.coordSysAxesInfo[ja(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function J2(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (ju(a[i + "AxisId"], e.id) || ju(a[i + "AxisIndex"], e.componentIndex) || ju(a[i + "AxisName"], e.name))
      return n;
  }
}
function ju(r, t) {
  return r === "all" || z(r) && vt(r, t) >= 0 || r === t;
}
function tI(r) {
  var t = If(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = lc(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function If(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[ja(r)];
}
function eI(r) {
  var t = If(r);
  return t && t.axisPointerModel;
}
function lc(r) {
  return !!r.get(["handle", "show"]);
}
function ja(r) {
  return r.type + "||" + r.id;
}
var ng = {}, b_ = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && tI(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
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
        var o = eI(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      ng[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && ng[e];
    }, t.type = "axis", t;
  }(Oe)
), uc = It();
function rI(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, c = uc(r).splitAreaColors, v = j(), f = 0;
      if (c)
        for (var d = 0; d < u.length; d++) {
          var g = c.get(u[d].tickValue);
          if (g != null) {
            f = (g + (h - 1) * d) % h;
            break;
          }
        }
      var p = n.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = z(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var m = n.toGlobalCoord(u[d].coord), _ = void 0, b = void 0, S = void 0, w = void 0;
        n.isHorizontal() ? (_ = p, b = l.y, S = m - _, w = l.height, p = _ + S) : (_ = l.x, b = p, S = l.width, w = m - b, p = b + w);
        var x = u[d - 1].tickValue;
        x != null && v.set(x, f), t.add(new bt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: b,
            width: S,
            height: w
          },
          style: ut({
            fill: s[f]
          }, y),
          autoBatch: !0,
          silent: !0
        })), f = (f + 1) % h;
      }
      uc(r).splitAreaColors = v;
    }
  }
}
function iI(r) {
  uc(r).splitAreaColors = null;
}
var nI = ["axisLine", "axisTickLabel", "axisName"], aI = ["splitArea", "splitLine", "minorSplitLine"], w_ = (
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
      if (this._axisGroup = new Ct(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = sc(s, e), u = new Gr(e, N({
          handleAutoShown: function(c) {
            for (var v = s.coordinateSystem.getCartesians(), f = 0; f < v.length; f++)
              if (rc(v[f].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        C(nI, u.add, u), this._axisGroup.add(u.getGroup()), C(aI, function(c) {
          e.get([c, "show"]) && oI[c](this, this._axisGroup, e, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || gm(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      iI(this);
    }, t.type = "cartesianAxis", t;
  }(b_)
), oI = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = z(s) ? s : [s];
      for (var h = i.coordinateSystem.getRect(), c = n.isHorizontal(), v = 0, f = n.getTicksCoords({
        tickModel: a
      }), d = [], g = [], p = o.getLineStyle(), y = 0; y < f.length; y++) {
        var m = n.toGlobalCoord(f[y].coord);
        if (!(y === 0 && !l || y === f.length - 1 && !u)) {
          var _ = f[y].tickValue;
          c ? (d[0] = m, d[1] = h.y, g[0] = m, g[1] = h.y + h.height) : (d[0] = h.x, d[1] = m, g[0] = h.x + h.width, g[1] = m);
          var b = v++ % s.length, S = new Ur({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: g[0],
              y2: g[1]
            },
            style: ut({
              stroke: s[b]
            }, p),
            silent: !0
          });
          Wa(S.shape, p.lineWidth), t.add(S);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var h = [], c = [], v = o.getLineStyle(), f = 0; f < u.length; f++)
        for (var d = 0; d < u[f].length; d++) {
          var g = n.toGlobalCoord(u[f][d].coord);
          l ? (h[0] = g, h[1] = s.y, c[0] = g, c[1] = s.y + s.height) : (h[0] = s.x, h[1] = g, c[0] = s.x + s.width, c[1] = g);
          var p = new Ur({
            anid: "minor_line_" + u[f][d].tickValue,
            autoBatch: !0,
            shape: {
              x1: h[0],
              y1: h[1],
              x2: c[0],
              y2: c[1]
            },
            style: v,
            silent: !0
          });
          Wa(p.shape, v.lineWidth), t.add(p);
        }
  },
  splitArea: function(r, t, e, i) {
    rI(r, t, e, i);
  }
}, S_ = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  }(w_)
), sI = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = S_.type, e;
    }
    return t.type = "yAxis", t;
  }(w_)
), lI = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new bt({
        shape: e.coordinateSystem.getRect(),
        style: ut({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(Oe)
), ag = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function uI(r) {
  r.registerComponentView(lI), r.registerComponentModel($2), r.registerCoordinateSystem("cartesian2d", V2), qp(r, "x", ac, ag), qp(r, "y", ac, ag), r.registerComponentView(S_), r.registerComponentView(sI), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var Ja = C, hI = V, Zs = -1, Bt = (
  /** @class */
  function() {
    function r(t) {
      var e = t.mappingMethod, i = t.type, n = this.option = X(t);
      this.type = i, this.mappingMethod = e, this._normalizeData = vI[e];
      var a = r.visualHandlers[i];
      this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._normalizedToVisual = a._normalizedToVisual[e], e === "piecewise" ? (Ju(n), cI(n)) : e === "category" ? n.categories ? fI(n) : Ju(n, !0) : (Xe(e !== "linear" || n.dataExtent), Ju(n));
    }
    return r.prototype.mapValueToVisual = function(t) {
      var e = this._normalizeData(t);
      return this._normalizedToVisual(e, t);
    }, r.prototype.getNormalizer = function() {
      return J(this._normalizeData, this);
    }, r.listVisualTypes = function() {
      return gt(r.visualHandlers);
    }, r.isValidType = function(t) {
      return r.visualHandlers.hasOwnProperty(t);
    }, r.eachVisual = function(t, e, i) {
      V(t) ? C(t, e, i) : e.call(i, t);
    }, r.mapVisual = function(t, e, i) {
      var n, a = z(t) ? [] : V(t) ? {} : (n = !0, null);
      return r.eachVisual(t, function(o, s) {
        var l = e.call(i, o, s);
        n ? a = l : a[s] = l;
      }), a;
    }, r.retrieveVisuals = function(t) {
      var e = {}, i;
      return t && Ja(r.visualHandlers, function(n, a) {
        t.hasOwnProperty(a) && (e[a] = t[a], i = !0);
      }), i ? e : null;
    }, r.prepareVisualTypes = function(t) {
      if (z(t))
        t = t.slice();
      else if (hI(t)) {
        var e = [];
        Ja(t, function(i, n) {
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
          if (l === t || H(l) && l === t + "")
            return o;
          i && v(l, o);
        }
      }
      for (var o = 0, s = e.length; o < s; o++) {
        var u = e[o], h = u.interval, c = u.close;
        if (h) {
          if (h[0] === -1 / 0) {
            if (jo(c[1], t, h[1]))
              return o;
          } else if (h[1] === 1 / 0) {
            if (jo(c[0], h[0], t))
              return o;
          } else if (jo(c[0], h[0], t) && jo(c[1], t, h[1]))
            return o;
          i && v(h[0], o), i && v(h[1], o);
        }
      }
      if (i)
        return t === 1 / 0 ? e.length - 1 : t === -1 / 0 ? 0 : n;
      function v(f, d) {
        var g = Math.abs(f - t);
        g < a && (a = g, n = d);
      }
    }, r.visualHandlers = {
      color: {
        applyVisual: ua("color"),
        getColorMapper: function() {
          var t = this.option;
          return J(t.mappingMethod === "category" ? function(e, i) {
            return !i && (e = this._normalizeData(e)), _a.call(this, e);
          } : function(e, i, n) {
            var a = !!n;
            return !i && (e = this._normalizeData(e)), n = ql(e, t.parsedVisual, n), a ? n : cr(n, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(t) {
            return cr(ql(t, this.option.parsedVisual), "rgba");
          },
          category: _a,
          piecewise: function(t, e) {
            var i = cc.call(this, e);
            return i == null && (i = cr(ql(t, this.option.parsedVisual), "rgba")), i;
          },
          fixed: _i
        }
      },
      colorHue: Qo(function(t, e) {
        return Zl(t, e);
      }),
      colorSaturation: Qo(function(t, e) {
        return Zl(t, null, e);
      }),
      colorLightness: Qo(function(t, e) {
        return Zl(t, null, null, e);
      }),
      colorAlpha: Qo(function(t, e) {
        return ow(t, e);
      }),
      decal: {
        applyVisual: ua("decal"),
        _normalizedToVisual: {
          linear: null,
          category: _a,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: ua("opacity"),
        _normalizedToVisual: hc([0, 1])
      },
      liftZ: {
        applyVisual: ua("liftZ"),
        _normalizedToVisual: {
          linear: _i,
          category: _i,
          piecewise: _i,
          fixed: _i
        }
      },
      symbol: {
        applyVisual: function(t, e, i) {
          var n = this.mapValueToVisual(t);
          i("symbol", n);
        },
        _normalizedToVisual: {
          linear: og,
          category: _a,
          piecewise: function(t, e) {
            var i = cc.call(this, e);
            return i == null && (i = og.call(this, t)), i;
          },
          fixed: _i
        }
      },
      symbolSize: {
        applyVisual: ua("symbolSize"),
        _normalizedToVisual: hc([0, 1])
      }
    }, r;
  }()
);
function cI(r) {
  var t = r.pieceList;
  r.hasSpecialVisual = !1, C(t, function(e, i) {
    e.originIndex = i, e.visual != null && (r.hasSpecialVisual = !0);
  });
}
function fI(r) {
  var t = r.categories, e = r.categoryMap = {}, i = r.visual;
  if (Ja(t, function(o, s) {
    e[o] = s;
  }), !z(i)) {
    var n = [];
    V(i) ? Ja(i, function(o, s) {
      var l = e[s];
      n[l ?? Zs] = o;
    }) : n[Zs] = i, i = x_(r, n);
  }
  for (var a = t.length - 1; a >= 0; a--)
    i[a] == null && (delete e[t[a]], t.pop());
}
function Ju(r, t) {
  var e = r.visual, i = [];
  V(e) ? Ja(e, function(a) {
    i.push(a);
  }) : e != null && i.push(e);
  var n = {
    color: 1,
    symbol: 1
  };
  !t && i.length === 1 && !n.hasOwnProperty(r.type) && (i[1] = i[0]), x_(r, i);
}
function Qo(r) {
  return {
    applyVisual: function(t, e, i) {
      var n = this.mapValueToVisual(t);
      i("color", r(e("color"), n));
    },
    _normalizedToVisual: hc([0, 1])
  };
}
function og(r) {
  var t = this.option.visual;
  return t[Math.round(vr(r, [0, 1], [0, t.length - 1], !0))] || {};
}
function ua(r) {
  return function(t, e, i) {
    i(r, this.mapValueToVisual(t));
  };
}
function _a(r) {
  var t = this.option.visual;
  return t[this.option.loop && r !== Zs ? r % t.length : r];
}
function _i() {
  return this.option.visual[0];
}
function hc(r) {
  return {
    linear: function(t) {
      return vr(t, r, this.option.visual, !0);
    },
    category: _a,
    piecewise: function(t, e) {
      var i = cc.call(this, e);
      return i == null && (i = vr(t, r, this.option.visual, !0)), i;
    },
    fixed: _i
  };
}
function cc(r) {
  var t = this.option, e = t.pieceList;
  if (t.hasSpecialVisual) {
    var i = Bt.findPieceIndex(r, e), n = e[i];
    if (n && n.visual)
      return n.visual[this.type];
  }
}
function x_(r, t) {
  return r.visual = t, r.type === "color" && (r.parsedVisual = U(t, function(e) {
    var i = _e(e);
    return i || [0, 0, 0, 1];
  })), t;
}
var vI = {
  linear: function(r) {
    return vr(r, this.option.dataExtent, [0, 1], !0);
  },
  piecewise: function(r) {
    var t = this.option.pieceList, e = Bt.findPieceIndex(r, t, !0);
    if (e != null)
      return vr(e, [0, t.length - 1], [0, 1], !0);
  },
  category: function(r) {
    var t = this.option.categories ? this.option.categoryMap[r] : r;
    return t ?? Zs;
  },
  fixed: Wt
};
function jo(r, t, e) {
  return r ? t <= e : t < e;
}
function dI(r, t, e, i, n, a) {
  r = r || 0;
  var o = e[1] - e[0];
  if (n != null && (n = nn(n, [0, o])), a != null && (a = Math.max(a, n ?? 0)), i === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = nn(s, [0, o]), n = a = nn(s, [n, a]), i = 0;
  }
  t[0] = nn(t[0], e), t[1] = nn(t[1], e);
  var l = th(t, i);
  t[i] += r;
  var u = n || 0, h = e.slice();
  l.sign < 0 ? h[0] += u : h[1] -= u, t[i] = nn(t[i], h);
  var c;
  return c = th(t, i), n != null && (c.sign !== l.sign || c.span < n) && (t[1 - i] = t[i] + l.sign * n), c = th(t, i), a != null && c.span > a && (t[1 - i] = t[i] + c.sign * a), t;
}
function th(r, t) {
  var e = r[t] - r[1 - t];
  return {
    span: Math.abs(e),
    sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1
  };
}
function nn(r, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, r));
}
var pI = 256, gI = (
  /** @class */
  function() {
    function r() {
      this.blurSize = 30, this.pointSize = 20, this.maxOpacity = 1, this.minOpacity = 0, this._gradientPixels = {
        inRange: null,
        outOfRange: null
      };
      var t = Wr.createCanvas();
      this.canvas = t;
    }
    return r.prototype.update = function(t, e, i, n, a, o) {
      var s = this._getBrush(), l = this._getGradient(a, "inRange"), u = this._getGradient(a, "outOfRange"), h = this.pointSize + this.blurSize, c = this.canvas, v = c.getContext("2d"), f = t.length;
      c.width = e, c.height = i;
      for (var d = 0; d < f; ++d) {
        var g = t[d], p = g[0], y = g[1], m = g[2], _ = n(m);
        v.globalAlpha = _, v.drawImage(s, p - h, y - h);
      }
      if (!c.width || !c.height)
        return c;
      for (var b = v.getImageData(0, 0, c.width, c.height), S = b.data, w = 0, x = S.length, M = this.minOpacity, D = this.maxOpacity, A = D - M; w < x; ) {
        var _ = S[w + 3] / 256, T = Math.floor(_ * (pI - 1)) * 4;
        if (_ > 0) {
          var I = o(_) ? l : u;
          _ > 0 && (_ = _ * A + M), S[w++] = I[T], S[w++] = I[T + 1], S[w++] = I[T + 2], S[w++] = I[T + 3] * _ * 256;
        } else
          w += 4;
      }
      return v.putImageData(b, 0, 0), c;
    }, r.prototype._getBrush = function() {
      var t = this._brushCanvas || (this._brushCanvas = Wr.createCanvas()), e = this.pointSize + this.blurSize, i = e * 2;
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
function yI(r, t, e) {
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
function mI(r, t) {
  var e = r[1] - r[0];
  return t = [(t[0] - r[0]) / e, (t[1] - r[0]) / e], function(i) {
    return i >= t[0] && i <= t[1];
  };
}
function sg(r) {
  var t = r.dimensions;
  return t[0] === "lng" && t[1] === "lat";
}
var _I = (
  /** @class */
  function(r) {
    B(t, r);
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
      o.type === "cartesian2d" || o.type === "calendar" ? this._renderOnCartesianAndCalendar(e, n, 0, e.getData().count()) : sg(o) && this._renderOnGeo(o, e, a, n);
    }, t.prototype.incrementalPrepareRender = function(e, i, n) {
      this.group.removeAll();
    }, t.prototype.incrementalRender = function(e, i, n, a) {
      var o = i.coordinateSystem;
      o && (sg(o) ? this.render(i, n, a) : (this._progressiveEls = [], this._renderOnCartesianAndCalendar(i, a, e.start, e.end, !0)));
    }, t.prototype.eachRendered = function(e) {
      lo(this._progressiveEls || this.group, e);
    }, t.prototype._renderOnCartesianAndCalendar = function(e, i, n, a, o) {
      var s = e.coordinateSystem, l = Rl(s, "cartesian2d"), u, h, c, v;
      if (l) {
        var f = s.getAxis("x"), d = s.getAxis("y");
        u = f.getBandWidth() + 0.5, h = d.getBandWidth() + 0.5, c = f.scale.getExtent(), v = d.scale.getExtent();
      }
      for (var g = this.group, p = e.getData(), y = e.getModel(["emphasis", "itemStyle"]).getItemStyle(), m = e.getModel(["blur", "itemStyle"]).getItemStyle(), _ = e.getModel(["select", "itemStyle"]).getItemStyle(), b = e.get(["itemStyle", "borderRadius"]), S = An(e), w = e.getModel("emphasis"), x = w.get("focus"), M = w.get("blurScope"), D = w.get("disabled"), A = l ? [p.mapDimension("x"), p.mapDimension("y"), p.mapDimension("value")] : [p.mapDimension("time"), p.mapDimension("value")], T = n; T < a; T++) {
        var I = void 0, P = p.getItemVisual(T, "style");
        if (l) {
          var $ = p.get(A[0], T), R = p.get(A[1], T);
          if (isNaN(p.get(A[2], T)) || isNaN($) || isNaN(R) || $ < c[0] || $ > c[1] || R < v[0] || R > v[1])
            continue;
          var O = s.dataToPoint([$, R]);
          I = new bt({
            shape: {
              x: O[0] - u / 2,
              y: O[1] - h / 2,
              width: u,
              height: h
            },
            style: P
          });
        } else {
          if (isNaN(p.get(A[1], T)))
            continue;
          I = new bt({
            z2: 1,
            shape: s.dataToRect([p.get(A[0], T)]).contentShape,
            style: P
          });
        }
        if (p.hasItemOption) {
          var G = p.getItemModel(T), E = G.getModel("emphasis");
          y = E.getModel("itemStyle").getItemStyle(), m = G.getModel(["blur", "itemStyle"]).getItemStyle(), _ = G.getModel(["select", "itemStyle"]).getItemStyle(), b = G.get(["itemStyle", "borderRadius"]), x = E.get("focus"), M = E.get("blurScope"), D = E.get("disabled"), S = An(G);
        }
        I.shape.r = b;
        var F = e.getRawValue(T), W = "-";
        F && F[2] != null && (W = F[2] + ""), uo(I, S, {
          labelFetcher: e,
          labelDataIndex: T,
          defaultOpacity: P.opacity,
          defaultText: W
        }), I.ensureState("emphasis").style = y, I.ensureState("blur").style = m, I.ensureState("select").style = _, Ga(I, x, M, D), I.incremental = o, o && (I.states.emphasis.hoverLayer = !0), g.add(I), p.setItemGraphicEl(T, I), this._progressiveEls && this._progressiveEls.push(I);
      }
    }, t.prototype._renderOnGeo = function(e, i, n, a) {
      var o = n.targetVisuals.inRange, s = n.targetVisuals.outOfRange, l = i.getData(), u = this._hmLayer || this._hmLayer || new gI();
      u.blurSize = i.get("blurSize"), u.pointSize = i.get("pointSize"), u.minOpacity = i.get("minOpacity"), u.maxOpacity = i.get("maxOpacity");
      var h = e.getViewRect().clone(), c = e.getRoamTransform();
      h.applyTransform(c);
      var v = Math.max(h.x, 0), f = Math.max(h.y, 0), d = Math.min(h.width + h.x, a.getWidth()), g = Math.min(h.height + h.y, a.getHeight()), p = d - v, y = g - f, m = [l.mapDimension("lng"), l.mapDimension("lat"), l.mapDimension("value")], _ = l.mapArray(m, function(x, M, D) {
        var A = e.dataToPoint([x, M]);
        return A[0] -= v, A[1] -= f, A.push(D), A;
      }), b = n.getExtent(), S = n.type === "visualMap.continuous" ? mI(b, n.option.range) : yI(b, n.getPieceList(), n.option.selected);
      u.update(_, p, y, o.color.getNormalizer(), {
        inRange: o.color.getColorMapper(),
        outOfRange: s.color.getColorMapper()
      }, S);
      var w = new er({
        style: {
          width: p,
          height: y,
          x: v,
          y: f,
          image: u.canvas
        },
        silent: !0
      });
      this.group.add(w);
    }, t.type = "heatmap", t;
  }(be)
), bI = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return Il(null, this, {
        generateCoord: "value"
      });
    }, t.prototype.preventIncremental = function() {
      var e = Cl.get(this.get("coordinateSystem"));
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
  }(Re)
);
function wI(r) {
  r.registerChartView(_I), r.registerSeriesModel(bI);
}
var bi = It(), lg = X, eh = J, SI = (
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
        var c = this._moveAnimation = this.determineAnimation(t, e);
        if (!s)
          s = this._group = new Ct(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = Dt(ug, e, c);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        cg(s, e, !0), this._renderHandle(a);
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
          var l = If(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = bi(t).pointerEl = new cT[a.type](lg(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = bi(t).labelEl = new At(lg(e.label));
        t.add(a), hg(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = bi(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = bi(t).labelEl;
      a && (a.setStyle(e.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: e.label.x,
        y: e.label.y
      }), hg(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = ef(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Ba(u.event);
          },
          onmousedown: eh(this._onHandleDragMove, this, 0, 0),
          drift: eh(this._onHandleDragMove, this),
          ondragend: eh(this._onHandleDragEnd, this)
        }), i.add(n)), cg(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        z(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, a0(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      ug(this._axisPointerModel, !e && this._moveAnimation, this._handle, rh(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(rh(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(rh(n)), bi(i).lastProp = null, this._doDispatchAxisPointer();
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
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Yh(this, "_doDispatchAxisPointer");
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
function ug(r, t, e, i) {
  T_(bi(e).lastProp, i) || (bi(e).lastProp = i, t ? se(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function T_(r, t) {
  if (V(r) && V(t)) {
    var e = !0;
    return C(t, function(i, n) {
      e = e && T_(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function hg(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function rh(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function cg(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function xI(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function TI(r, t, e, i, n) {
  var a = e.get("value"), o = C_(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = ho(s.get("padding") || 0), u = s.getFont(), h = Nc(o, u), c = n.position, v = h.width + l[1] + l[3], f = h.height + l[0] + l[2], d = n.align;
  d === "right" && (c[0] -= v), d === "center" && (c[0] -= v / 2);
  var g = n.verticalAlign;
  g === "bottom" && (c[1] -= f), g === "middle" && (c[1] -= f / 2), CI(c, v, f, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: c[0],
    y: c[1],
    style: Ye(s, {
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
function CI(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function C_(r, t, e, i, n) {
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
      value: Tf(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    C(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, c = u && u.getDataParams(h);
      c && s.seriesData.push(c);
    }), H(o) ? a = o.replace("{value}", a) : q(o) && (a = o(s));
  }
  return a;
}
function M_(r, t, e) {
  var i = gn();
  return Rc(i, i, e.rotation), yh(i, i, e.position), _n([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function MI(r, t, e, i, n, a) {
  var o = Gr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), TI(t, i, n, a, {
    position: M_(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function DI(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function AI(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var II = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), h = fg(l, s).getOtherAxis(s).getGlobalExtent(), c = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = xI(a), f = LI[u](s, c, h);
        f.style = v, e.graphicKey = f.type, e.pointer = f;
      }
      var d = sc(l.model, n);
      MI(
        // @ts-ignore
        i,
        e,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = sc(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = M_(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = fg(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, c = [e.x, e.y];
      c[h] += i[h], c[h] = Math.min(l[1], c[h]), c[h] = Math.max(l[0], c[h]);
      var v = (u[1] + u[0]) / 2, f = [v, v];
      f[h] = c[h];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: c[0],
        y: c[1],
        rotation: e.rotation,
        cursorPoint: f,
        tooltipOption: d[h]
      };
    }, t;
  }(SI)
);
function fg(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var LI = {
  line: function(r, t, e) {
    var i = DI([t, e[0]], [t, e[1]], vg(r));
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
      shape: AI([t - i / 2, e[0]], [i, n], vg(r))
    };
  }
};
function vg(r) {
  return r.dim === "x" ? 0 : 1;
}
var PI = (
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
  }(ht)
), ur = It(), $I = C;
function D_(r, t, e) {
  if (!Y.node) {
    var i = t.getZr();
    ur(i).records || (ur(i).records = {}), RI(i, t);
    var n = ur(i).records[r] || (ur(i).records[r] = {});
    n.handler = e;
  }
}
function RI(r, t) {
  if (ur(r).initialized)
    return;
  ur(r).initialized = !0, e("click", Dt(dg, "click")), e("mousemove", Dt(dg, "mousemove")), e("globalout", EI);
  function e(i, n) {
    r.on(i, function(a) {
      var o = kI(t);
      $I(ur(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), OI(o.pendings, t);
    });
  }
}
function OI(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function EI(r, t, e) {
  r.handler("leave", null, e);
}
function dg(r, t, e, i) {
  t.handler(r, e, i);
}
function kI(r) {
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
function fc(r, t) {
  if (!Y.node) {
    var e = t.getZr(), i = (ur(e).records || {})[r];
    i && (ur(e).records[r] = null);
  }
}
var NI = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      D_("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      fc("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      fc("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(Oe)
);
function A_(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = $i(a, r);
  if (o == null || o < 0 || z(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), c = h.dim, v = u.dim, f = c === "x" || c === "radius" ? 1 : 0, d = a.mapDimension(v), g = [];
      g[f] = a.get(d, o), g[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(g) || [];
    } else
      e = l.dataToPoint(a.getValues(U(l.dimensions, function(y) {
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
var pg = It();
function BI(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || J(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    ys(n) && (n = A_({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = ys(n), u = a.axesInfo, h = s.axesInfo, c = i === "leave" || ys(n), v = {}, f = {}, d = {
      list: [],
      map: {}
    }, g = {
      showPointer: Dt(FI, f),
      showTooltip: Dt(HI, d)
    };
    C(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(n);
      C(s.coordSysAxesInfo[m], function(b, S) {
        var w = b.axis, x = UI(u, b);
        if (!c && _ && (!u || x)) {
          var M = x && x.value;
          M == null && !l && (M = w.pointToData(n)), M != null && gg(b, M, g, !1, v);
        }
      });
    });
    var p = {};
    return C(h, function(y, m) {
      var _ = y.linkGroup;
      _ && !f[m] && C(_.axesInfo, function(b, S) {
        var w = f[S];
        if (b !== y && w) {
          var x = w.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, yg(b), yg(y)))), p[y.key] = x;
        }
      });
    }), C(p, function(y, m) {
      gg(h[m], y, g, !0, v);
    }), VI(f, h, v), GI(d, n, r, o), WI(h, o, e), v;
  }
}
function gg(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = zI(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && N(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function zI(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return C(t.seriesModels, function(l, u) {
    var h = l.getData().mapDimensionsAll(i), c, v;
    if (l.getAxisTooltipData) {
      var f = l.getAxisTooltipData(h, r, e);
      v = f.dataIndices, c = f.nestestValue;
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
      c = l.getData().get(h[0], v[0]);
    }
    if (!(c == null || !isFinite(c))) {
      var d = r - c, g = Math.abs(d);
      g <= o && ((g < o || d >= 0 && s < 0) && (o = g, s = d, n = c, a.length = 0), C(v, function(p) {
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
function FI(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function HI(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = ja(l), h = r.map[u];
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
function VI(r, t, e) {
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
function GI(r, t, e, i) {
  if (ys(t) || !r.list.length) {
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
function WI(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = pg(i)[n] || {}, o = pg(i)[n] = {};
  C(r, function(u, h) {
    var c = u.axisPointerModel.option;
    c.status === "show" && u.triggerEmphasis && C(c.seriesDataIndices, function(v) {
      var f = v.seriesIndex + " | " + v.dataIndex;
      o[f] = v;
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
function UI(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function yg(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function ys(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function I_(r) {
  b_.registerAxisPointerClass("CartesianAxisPointer", II), r.registerComponentModel(PI), r.registerComponentView(NI), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !z(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = Z2(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, BI);
}
function YI(r) {
  Ke(uI), Ke(I_);
}
function XI(r, t) {
  var e = ho(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), r = new bt({
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
var qI = (
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
  }(ht)
);
function L_(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function P_(r) {
  if (Y.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var $_ = P_(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), ZI = P_(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function R_(r, t) {
  if (!r)
    return t;
  t = Pm(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function KI(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var QI = R_(ZI, "transition"), Lf = R_($_, "transform"), jI = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (Y.transform3dSupported ? "will-change:transform;" : "");
function JI(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function tL(r, t, e) {
  if (!H(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = Oi(t);
  var a = JI(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Lf + ":", u;
  vt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, c = o + n, v = c * Math.abs(Math.cos(h)) + c * Math.abs(Math.sin(h)), f = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + f + "px";
  var d = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function eL(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += Y.transformSupported ? "," + Lf + i : ",left" + i + ",top" + i), QI + ":" + n;
}
function mg(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!Y.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = Y.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + Lf + ":" + o + ";" : [["top", 0], ["left", 0], [$_, o]];
}
function rL(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = tt(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), C(["decoration", "align"], function(u) {
    var h = r.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function iL(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), h = r.getModel("textStyle"), c = i0(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(eL(n, e)), a && i.push("background-color:" + a), C(["width", "color", "radius"], function(f) {
    var d = "border-" + f, g = Pm(d), p = r.get(g);
    p != null && i.push(d + ":" + p + (f === "color" ? "" : "px"));
  }), i.push(rL(h)), c != null && i.push("padding:" + ho(c).join("px ") + "px"), i.join(";") + ";";
}
function _g(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && M1(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var nL = (
  /** @class */
  function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, Y.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (H(a) ? document.querySelector(a) : Na(a) ? a : q(a) && a(t.getDom()));
      _g(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, h = n.painter.getViewportRoot();
          ce(h, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = KI(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = jI + iL(t, !this._firstShow, this._longHide) + mg(a[0], a[1], !0) + ("border-color:" + Oi(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (H(a) && i.get("trigger") === "item" && !L_(i) && (s = tL(i, n, a)), H(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", z(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Na(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if (_g(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = mg(i[0], i[1]);
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
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(J(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  }()
), aL = (
  /** @class */
  function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), wg(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      V(t) && Qt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new At({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: i0(i, "richText"),
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
      var t = this.el, e = this.el.getBoundingRect(), i = bg(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        wg(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = Er(a.borderWidth || 0), s = bg(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(J(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  }()
);
function Er(r) {
  return Math.max(0, r);
}
function bg(r) {
  var t = Er(r.shadowBlur || 0), e = Er(r.shadowOffsetX || 0), i = Er(r.shadowOffsetY || 0);
  return {
    left: Er(t - e),
    right: Er(t + e),
    top: Er(t - i),
    bottom: Er(t + i)
  };
}
function wg(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var oL = new bt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), sL = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(Y.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = eS(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new aL(i) : new nL(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(Y.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? a0(this, "_updatePosition", 50, "fixRate") : Yh(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      D_("itemTooltip", this._api, J(function(n, a, o) {
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
        var o = Sg(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = cL(a, i, n);
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
          var h = oL;
          h.x = a.x, h.y = a.y, h.update(), ot(h).tooltipConfig = {
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
          var c = A_(a, i), v = c.point[0], f = c.point[1];
          v != null && f != null && this._tryShow({
            offsetX: v,
            offsetY: f,
            target: c.el,
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Sg(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), c = ha([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (c.get("trigger") === "axis")
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
          dn(n, function(h) {
            if (ot(h).dataIndex != null)
              return l = h, !0;
            if (ot(h).tooltipConfig != null)
              return u = h, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = J(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = ha([i.tooltipOption], a), l = this._renderMode, u = [], h = qa("section", {
        blocks: [],
        noHeader: !0
      }), c = [], v = new Ru();
      C(e, function(m) {
        C(m.dataByAxis, function(_) {
          var b = n.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!b || S == null)) {
            var w = C_(S, b.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = qa("section", {
              header: w,
              noHeader: !We(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), C(_.seriesDataIndices, function(M) {
              var D = n.getSeriesByIndex(M.seriesIndex), A = M.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = Tf(b.axis, {
                  value: S
                }), T.axisValueLabel = w, T.marker = v.makeTooltipMarker("item", Oi(T.color), l);
                var I = kd(D.formatTooltip(A, !0, null)), P = I.frag;
                if (P) {
                  var $ = ha([D], a).get("valueFormatter");
                  x.blocks.push($ ? N({
                    valueFormatter: $
                  }, P) : P);
                }
                I.text && c.push(I.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), c.reverse();
      var f = i.position, d = s.get("order"), g = Hd(h, v, l, d, n.get("useUTC"), s.get("textStyle"));
      g && c.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", y = c.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, f, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], f, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = ot(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, c = o.dataType, v = u.getData(c), f = this._renderMode, d = e.positionDefault, g = ha([v.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var y = u.getDataParams(h, c), m = new Ru();
        y.marker = m.makeTooltipMarker("item", Oi(y.color), f);
        var _ = kd(u.formatTooltip(h, !1, c)), b = g.get("order"), S = g.get("valueFormatter"), w = _.frag, x = w ? Hd(S ? N({
          valueFormatter: S
        }, w) : w, m, f, b, a.get("useUTC"), g.get("textStyle")) : _.text, M = "item_" + u.name + "_" + h;
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
      var a = this._renderMode === "html", o = ot(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (H(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = X(l), l.content = Zt(l.content));
      var c = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && c.push(v), c.push({
        formatter: l.content
      });
      var f = e.positionDefault, d = ha(c, this._tooltipModel, f ? {
        position: f
      } : null), g = d.get("content"), p = Math.random() + "", y = new Ru();
      this._showOrMove(d, function() {
        var m = X(d.get("formatterParams") || {});
        this._showTooltipContent(d, g, m, p, e.offsetX, e.offsetY, e.position, i, y);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(e, i, n, a, o, s, l, u, h) {
      if (this._ticket = "", !(!e.get("showContent") || !e.get("show"))) {
        var c = this._tooltipContent;
        c.setEnterable(e.get("enterable"));
        var v = e.get("formatter");
        l = l || e.get("position");
        var f = i, d = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), g = d.color;
        if (v)
          if (H(v)) {
            var p = e.ecModel.get("useUTC"), y = z(n) ? n[0] : n, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            f = v, m && (f = _l(y.axisValue, f, p)), f = $m(f, n, !0);
          } else if (q(v)) {
            var _ = J(function(b, S) {
              b === this._ticket && (c.setContent(S, h, e, g, l), this._updatePosition(e, l, o, s, c, n, u));
            }, this);
            this._ticket = a, f = v(n, a, _);
          } else
            f = v;
        c.setContent(f, h, e, g, l), c.show(e, g), this._updatePosition(e, l, o, s, c, n, u);
      }
    }, t.prototype._getNearestPoint = function(e, i, n, a) {
      if (n === "axis" || z(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!z(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(e, i, n, a, o, s, l) {
      var u = this._api.getWidth(), h = this._api.getHeight();
      i = i || e.get("position");
      var c = o.getSize(), v = e.get("align"), f = e.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), q(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, h],
        contentSize: c.slice()
      })), z(i))
        n = Vt(i[0], u), a = Vt(i[1], h);
      else if (V(i)) {
        var g = i;
        g.width = c[0], g.height = c[1];
        var p = In(g, {
          width: u,
          height: h
        });
        n = p.x, a = p.y, v = null, f = null;
      } else if (H(i) && l) {
        var y = hL(i, d, c, e.get("borderWidth"));
        n = y[0], a = y[1];
      } else {
        var y = lL(n, a, o, u, h, v ? null : 20, f ? null : 20);
        n = y[0], a = y[1];
      }
      if (v && (n -= xg(v) ? c[0] / 2 : v === "right" ? c[0] : 0), f && (a -= xg(f) ? c[1] / 2 : f === "bottom" ? c[1] : 0), L_(e)) {
        var y = uL(n, a, o, u, h);
        n = y[0], a = y[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && C(n, function(s, l) {
        var u = s.dataByAxis || [], h = e[l] || {}, c = h.dataByAxis || [];
        o = o && u.length === c.length, o && C(u, function(v, f) {
          var d = c[f] || {}, g = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && g.length === p.length, o && C(g, function(y, m) {
            var _ = p[m];
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
      Y.node || !i.getDom() || (Yh(this, "_updatePosition"), this._tooltipContent.dispose(), fc("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(Oe)
);
function ha(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new xt(e, i, i), n = new xt(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof xt && (o = o.get("tooltip", !0)), H(o) && (o = {
      formatter: o
    }), o && (n = new xt(o, n, i)));
  }
  return n;
}
function Sg(r, t) {
  return r.dispatchAction || J(t.dispatchAction, t);
}
function lL(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function uL(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function hL(r, t, e, i) {
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
function xg(r) {
  return r === "center" || r === "middle";
}
function cL(r, t, e) {
  var i = Hc(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = oo(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var h = ot(u).tooltipConfig;
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
function fL(r) {
  Ke(I_), r.registerComponentModel(qI), r.registerComponentView(sL), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Wt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Wt);
}
var Tg = C;
function Cg(r) {
  if (r) {
    for (var t in r)
      if (r.hasOwnProperty(t))
        return !0;
  }
}
function Mg(r, t, e) {
  var i = {};
  return Tg(t, function(a) {
    var o = i[a] = n();
    Tg(r[a], function(s, l) {
      if (Bt.isValidType(l)) {
        var u = {
          type: l,
          visual: s
        };
        e && e(u, a), o[l] = new Bt(u), l === "opacity" && (u = X(u), u.type = "colorAlpha", o.__hidden.__alphaForOpacity = new Bt(u));
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
function vL(r, t, e) {
  var i;
  C(e, function(n) {
    t.hasOwnProperty(n) && Cg(t[n]) && (i = !0);
  }), i && C(e, function(n) {
    t.hasOwnProperty(n) && Cg(t[n]) ? r[n] = X(t[n]) : delete r[n];
  });
}
function dL(r, t, e, i) {
  var n = {};
  return C(r, function(a) {
    var o = Bt.prepareVisualTypes(t[a]);
    n[a] = o;
  }), {
    progress: function(o, s) {
      var l;
      i != null && (l = s.getDimensionIndex(i));
      function u(S) {
        return v0(s, c, S);
      }
      function h(S, w) {
        CM(s, c, S, w);
      }
      for (var c, v = s.getStore(); (c = o.next()) != null; ) {
        var f = s.getRawDataItem(c);
        if (!(f && f.visualMap === !1))
          for (var d = i != null ? v.get(l, c) : c, g = e(d), p = t[g], y = n[g], m = 0, _ = y.length; m < _; m++) {
            var b = y[m];
            p[b] && p[b].applyVisual(d, u, h);
          }
      }
    }
  };
}
var pL = function(r, t) {
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
}, vc = (
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
      i === !0 && (i = e.selector = ["all", "inverse"]), z(i) && C(i, function(a, o) {
        H(a) && (a = {
          type: a
        }), i[o] = nt(a, pL(n, a.type));
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
          var c = l.legendVisualProvider, v = c.getAllNames();
          e.isSeriesFiltered(l) || (n = n.concat(v)), v.length ? i = i.concat(v) : h = !0;
        } else
          h = !0;
        h && Fc(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = j(), s = U(a, function(l) {
        return (H(l) || yt(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new xt(l, this, this.ecModel));
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
      return !(i.hasOwnProperty(e) && !i[e]) && vt(this._availableNames, e) >= 0;
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
  }(ht)
), an = Dt, dc = C, Jo = Ct, O_ = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !1, e;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new Jo()), this.group.add(this._selectorGroup = new Jo()), this._isFirstRender = !0;
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
        var h = e.getBoxLayoutParams(), c = {
          width: n.getWidth(),
          height: n.getHeight()
        }, v = e.get("padding"), f = In(h, c, v), d = this.layoutInner(e, o, f, a, l, u), g = In(ut({
          width: d.width,
          height: d.height
        }, h), c, v);
        this.group.x = g.x - d.x, this.group.y = g.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = XI(d, e));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this.getContentGroup(), h = j(), c = i.get("selectedMode"), v = [];
      n.eachRawSeries(function(f) {
        !f.get("legendHoverLink") && v.push(f.id);
      }), dc(i.getData(), function(f, d) {
        var g = f.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var p = new Jo();
          p.newline = !0, u.add(p);
          return;
        }
        var y = n.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), S = m.getVisual("style"), w = this._createItem(y, g, d, f, i, e, _, S, b, c, a);
            w.on("click", an(Dg, g, null, a, v)).on("mouseover", an(pc, y.name, null, a, v)).on("mouseout", an(gc, y.name, null, a, v)), n.ssr && w.eachChild(function(x) {
              var M = ot(x);
              M.seriesIndex = y.seriesIndex, M.dataIndex = d, M.ssrType = "legend";
            }), h.set(g, !0);
          } else
            n.eachRawSeries(function(x) {
              if (!h.get(g) && x.legendVisualProvider) {
                var M = x.legendVisualProvider;
                if (!M.containName(g))
                  return;
                var D = M.indexOfName(g), A = M.getItemVisual(D, "style"), T = M.getItemVisual(D, "legendIcon"), I = _e(A.fill);
                I && I[3] === 0 && (I[3] = 0.2, A = N(N({}, A), {
                  fill: cr(I, "rgba")
                }));
                var P = this._createItem(x, g, d, f, i, e, {}, A, T, c, a);
                P.on("click", an(Dg, null, g, a, v)).on("mouseover", an(pc, null, g, a, v)).on("mouseout", an(gc, null, g, a, v)), n.ssr && P.eachChild(function($) {
                  var R = ot($);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = d, R.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(e, i, n, a, o) {
      var s = this.getSelectorGroup();
      dc(e, function(u) {
        var h = u.type, c = new At({
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
        s.add(c);
        var v = i.getModel("selectorLabel"), f = i.getModel(["emphasis", "selectorLabel"]);
        uo(c, {
          normal: v,
          emphasis: f
        }, {
          defaultText: u.title
        }), Rh(c);
      });
    }, t.prototype._createItem = function(e, i, n, a, o, s, l, u, h, c, v) {
      var f = e.visualDrawType, d = o.get("itemWidth"), g = o.get("itemHeight"), p = o.isSelected(i), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = gL(h, a, l, u, f, p, v), S = new Jo(), w = a.getModel("textStyle");
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
        S.add(yL({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var M = s === "left" ? d + 5 : -5, D = s, A = o.get("formatter"), T = i;
      H(A) && A ? T = A.replace("{name}", i ?? "") : q(A) && (T = A(i));
      var I = p ? w.getTextColor() : a.get("inactiveColor");
      S.add(new At({
        style: Ye(w, {
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
      var P = new bt({
        shape: S.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), $ = a.getModel("tooltip");
      return $.get("show") && dl({
        el: P,
        componentModel: o,
        itemName: i,
        itemTooltipOption: $.option
      }), S.add(P), S.eachChild(function(R) {
        R.silent = !0;
      }), P.silent = !c, this.getContentGroup().add(S), Rh(S), S.__legendDataIndex = n, S;
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      xn(e.get("orient"), l, e.get("itemGap"), n.width, n.height);
      var h = l.getBoundingRect(), c = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        xn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          e.get("selectorItemGap", !0)
        );
        var v = u.getBoundingRect(), f = [-v.x, -v.y], d = e.get("selectorButtonGap", !0), g = e.getOrient().index, p = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
        s === "end" ? f[g] += h[p] + d : c[g] += v[p] + d, f[1 - g] += h[y] / 2 - v[y] / 2, u.x = f[0], u.y = f[1], l.x = c[0], l.y = c[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[p] = h[p] + d + v[p], _[y] = Math.max(h[y], v[y]), _[m] = Math.min(0, v[m] + f[1 - g]), _;
      } else
        return l.x = c[0], l.y = c[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(Oe)
);
function gL(r, t, e, i, n, a, o) {
  function s(p, y) {
    p.lineWidth === "auto" && (p.lineWidth = y.lineWidth > 0 ? 2 : 0), dc(p, function(m, _) {
      p[_] === "inherit" && (p[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = r.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", c = l.getShallow("decal");
  u.decal = !c || c === "inherit" ? i.decal : Qh(c, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[h]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : e).opacity), s(u, i);
  var v = t.getModel("lineStyle"), f = v.getLineStyle();
  if (s(f, e), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), f.stroke === "auto" && (f.stroke = i.fill), !a) {
    var d = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = d === "auto" ? i.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), f.stroke = v.get("inactiveColor"), f.lineWidth = v.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: f
  };
}
function yL(r) {
  var t = r.icon || "roundRect", e = gr(t, 0, 0, r.itemWidth, r.itemHeight, r.itemStyle.fill, r.symbolKeepAspect);
  return e.setStyle(r.itemStyle), e.rotation = (r.iconRotate || 0) * Math.PI / 180, e.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), t.indexOf("empty") > -1 && (e.style.stroke = e.style.fill, e.style.fill = "#fff", e.style.lineWidth = 2), e;
}
function Dg(r, t, e, i) {
  gc(r, t, e, i), e.dispatchAction({
    type: "legendToggleSelect",
    name: r ?? t
  }), pc(r, t, e, i);
}
function E_(r) {
  for (var t = r.getZr().storage.getDisplayList(), e, i = 0, n = t.length; i < n && !(e = t[i].states.emphasis); )
    i++;
  return e && e.hoverLayer;
}
function pc(r, t, e, i) {
  E_(e) || e.dispatchAction({
    type: "highlight",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function gc(r, t, e, i) {
  E_(e) || e.dispatchAction({
    type: "downplay",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function mL(r) {
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
function ca(r, t, e) {
  var i = r === "allSelect" || r === "inverseSelect", n = {}, a = [];
  e.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[r]() : s[r](t.name), Ag(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return e.eachComponent("legend", function(s) {
    C(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), Ag(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function Ag(r, t) {
  var e = t || {};
  return C(r.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = r.isSelected(n);
      Pi(e, n) ? e[n] = e[n] && a : e[n] = a;
    }
  }), e;
}
function _L(r) {
  r.registerAction("legendToggleSelect", "legendselectchanged", Dt(ca, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", Dt(ca, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", Dt(ca, "inverseSelect")), r.registerAction("legendSelect", "legendselected", Dt(ca, "select")), r.registerAction("legendUnSelect", "legendunselected", Dt(ca, "unSelect"));
}
function k_(r) {
  r.registerComponentModel(vc), r.registerComponentView(O_), r.registerProcessor(r.PRIORITY.PROCESSOR.SERIES_FILTER, mL), r.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), _L(r);
}
var bL = (
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
      var a = Tl(e);
      r.prototype.init.call(this, e, i, n), Ig(this, e, a);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), Ig(this, this.option, e);
    }, t.type = "legend.scroll", t.defaultOption = ml(vc.defaultOption, {
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
  }(vc)
);
function Ig(r, t, e) {
  var i = r.getOrient(), n = [1, 1];
  n[i.index] = 0, Ln(t, e, {
    type: "box",
    ignoreSize: !!n
  });
}
var Lg = Ct, ih = ["width", "height"], nh = ["x", "y"], wL = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !0, e._currentIndex = 0, e;
    }
    return t.prototype.init = function() {
      r.prototype.init.call(this), this.group.add(this._containerGroup = new Lg()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Lg());
    }, t.prototype.resetInner = function() {
      r.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this;
      r.prototype.renderInner.call(this, e, i, n, a, o, s, l);
      var h = this._controllerGroup, c = i.get("pageIconSize", !0), v = z(c) ? c : [c, c];
      d("pagePrev", 0);
      var f = i.getModel("pageTextStyle");
      h.add(new At({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: f.getTextColor(),
          font: f.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), d("pageNext", 1);
      function d(g, p) {
        var y = g + "DataIndex", m = ef(i.get("pageIcons", !0)[i.getOrient().name][p], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: J(u._pageGo, u, y, i, a)
        }, {
          x: -v[0] / 2,
          y: -v[1] / 2,
          width: v[0],
          height: v[1]
        });
        m.name = g, h.add(m);
      }
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = e.getOrient().index, h = ih[u], c = nh[u], v = ih[1 - u], f = nh[1 - u];
      o && xn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        e.get("selectorItemGap", !0)
      );
      var d = e.get("selectorButtonGap", !0), g = l.getBoundingRect(), p = [-g.x, -g.y], y = X(n);
      o && (y[h] = n[h] - g[h] - d);
      var m = this._layoutContentAndController(e, a, y, u, h, v, f, c);
      if (o) {
        if (s === "end")
          p[u] += m[h] + d;
        else {
          var _ = g[h] + d;
          p[u] -= _, m[c] -= _;
        }
        m[h] += g[h] + d, p[1 - u] += m[f] + m[v] / 2 - g[v] / 2, m[v] = Math.max(m[v], g[v]), m[f] = Math.min(m[f], g[f] + p[1 - u]), l.x = p[0], l.y = p[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(e, i, n, a, o, s, l, u) {
      var h = this.getContentGroup(), c = this._containerGroup, v = this._controllerGroup;
      xn(e.get("orient"), h, e.get("itemGap"), a ? n.width : null, a ? null : n.height), xn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        v,
        e.get("pageButtonItemGap", !0)
      );
      var f = h.getBoundingRect(), d = v.getBoundingRect(), g = this._showController = f[o] > n[o], p = [-f.x, -f.y];
      i || (p[a] = h[u]);
      var y = [0, 0], m = [-d.x, -d.y], _ = tt(e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (g) {
        var b = e.get("pageButtonPosition", !0);
        b === "end" ? m[a] += n[o] - d[o] : y[a] += d[o] + _;
      }
      m[1 - a] += f[s] / 2 - d[s] / 2, h.setPosition(p), c.setPosition(y), v.setPosition(m);
      var S = {
        x: 0,
        y: 0
      };
      if (S[o] = g ? n[o] : f[o], S[s] = Math.max(f[s], d[s]), S[l] = Math.min(0, d[l] + m[1 - a]), c.__rectSize = n[o], g) {
        var w = {
          x: 0,
          y: 0
        };
        w[o] = Math.max(n[o] - d[o] - _, 0), w[s] = S[s], c.setClipPath(new bt({
          shape: w
        })), c.__rectSize = w[o];
      } else
        v.eachChild(function(M) {
          M.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(e);
      return x.pageIndex != null && se(
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
      C(["pagePrev", "pageNext"], function(h) {
        var c = h + "DataIndex", v = i[c] != null, f = n.childOfName(h);
        f && (f.setStyle("fill", v ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), f.cursor = v ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = e.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", H(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(e) {
      var i = e.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = e.getOrient().index, s = ih[o], l = nh[o], u = this._findTargetItemIndex(i), h = n.children(), c = h[u], v = h.length, f = v ? 1 : 0, d = {
        contentPosition: [n.x, n.y],
        pageCount: f,
        pageIndex: f - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!c)
        return d;
      var g = b(c);
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
          var x = w.getBoundingRect(), M = x[l] + w[l];
          return {
            s: M,
            e: M + x[s],
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
  }(O_)
);
function SL(r) {
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
function xL(r) {
  Ke(k_), r.registerComponentModel(bL), r.registerComponentView(wL), SL(r);
}
function TL(r) {
  Ke(k_), Ke(xL);
}
var N_ = {
  /**
   * @public
   */
  get: function(r, t, e) {
    var i = X((CL[r] || {})[t]);
    return e && z(i) ? i[i.length - 1] : i;
  }
}, CL = {
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
}, Pg = Bt.mapVisual, ML = Bt.eachVisual, DL = z, $g = C, AL = $y, IL = vr, Ks = (
  /** @class */
  function(r) {
    B(t, r);
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
      !i && vL(n, e, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();
    }, t.prototype.resetVisual = function(e) {
      var i = this.stateList;
      e = J(e, this), this.controllerVisuals = Mg(this.option.controller, i, e), this.targetVisuals = Mg(this.option.target, i, e);
    }, t.prototype.getItemSymbol = function() {
      return null;
    }, t.prototype.getTargetSeriesIndices = function() {
      var e = this.option.seriesIndex, i = [];
      return e == null || e === "all" ? this.ecModel.eachSeries(function(n, a) {
        i.push(a);
      }) : i = Rt(e), i;
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
      n = n || ["<", ">"], z(e) && (e = e.slice(), u = !0);
      var h = i ? e : u ? [c(e[0]), c(e[1])] : c(e);
      if (H(l))
        return l.replace("{value}", u ? h[0] : h).replace("{value2}", u ? h[1] : h);
      if (q(l))
        return u ? l(e[0], e[1]) : l(e);
      if (u)
        return e[0] === s[0] ? n[0] + " " + h[1] : e[1] === s[1] ? n[1] + " " + h[0] : h[0] + " - " + h[1];
      return h;
      function c(v) {
        return v === s[0] ? "min" : v === s[1] ? "max" : (+v).toFixed(Math.min(o, 20));
      }
    }, t.prototype.resetExtent = function() {
      var e = this.option, i = AL([e.min, e.max]);
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
      nt(a, n), nt(o, n);
      var s = this.isCategory();
      l.call(this, a), l.call(this, o), u.call(this, a, "inRange", "outOfRange"), h.call(this, o);
      function l(c) {
        DL(i.color) && !c.inRange && (c.inRange = {
          color: i.color.slice().reverse()
        }), c.inRange = c.inRange || {
          color: e.get("gradientColor")
        };
      }
      function u(c, v, f) {
        var d = c[v], g = c[f];
        d && !g && (g = c[f] = {}, $g(d, function(p, y) {
          if (Bt.isValidType(y)) {
            var m = N_.get(y, "inactive", s);
            m != null && (g[y] = m, y === "color" && !g.hasOwnProperty("opacity") && !g.hasOwnProperty("colorAlpha") && (g.opacity = [0, 0]));
          }
        }));
      }
      function h(c) {
        var v = (c.inRange || {}).symbol || (c.outOfRange || {}).symbol, f = (c.inRange || {}).symbolSize || (c.outOfRange || {}).symbolSize, d = this.get("inactiveColor"), g = this.getItemSymbol(), p = g || "roundRect";
        $g(this.stateList, function(y) {
          var m = this.itemSize, _ = c[y];
          _ || (_ = c[y] = {
            color: s ? d : [d]
          }), _.symbol == null && (_.symbol = v && X(v) || (s ? p : [p])), _.symbolSize == null && (_.symbolSize = f && X(f) || (s ? m[0] : [m[0], m[0]])), _.symbol = Pg(_.symbol, function(w) {
            return w === "none" ? p : w;
          });
          var b = _.symbolSize;
          if (b != null) {
            var S = -1 / 0;
            ML(b, function(w) {
              w > S && (S = w);
            }), _.symbolSize = Pg(b, function(w) {
              return IL(w, [0, S], [0, m[0]], !0);
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
  }(ht)
), Rg = [20, 140], LL = (
  /** @class */
  function(r) {
    B(t, r);
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
      (e[0] == null || isNaN(e[0])) && (e[0] = Rg[0]), (e[1] == null || isNaN(e[1])) && (e[1] = Rg[1]);
    }, t.prototype._resetRange = function() {
      var e = this.getExtent(), i = this.option.range;
      !i || i.auto ? (e.auto = 1, this.option.range = e) : z(i) && (i[0] > i[1] && i.reverse(), i[0] = Math.max(i[0], e[0]), i[1] = Math.min(i[1], e[1]));
    }, t.prototype.completeVisualOption = function() {
      r.prototype.completeVisualOption.apply(this, arguments), C(this.stateList, function(e) {
        var i = this.option.controller[e].symbolSize;
        i && i[0] !== i[1] && (i[0] = i[1] / 3);
      }, this);
    }, t.prototype.setSelected = function(e) {
      this.option.range = e.slice(), this._resetRange();
    }, t.prototype.getSelected = function() {
      var e = this.getExtent(), i = $y((this.get("range") || []).slice());
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
      var i = Og(this, "outOfRange", this.getExtent()), n = Og(this, "inRange", this.option.range.slice()), a = [];
      function o(f, d) {
        a.push({
          value: f,
          color: e(f, d)
        });
      }
      for (var s = 0, l = 0, u = n.length, h = i.length; l < h && (!n.length || i[l] <= n[0]); l++)
        i[l] < n[s] && o(i[l], "outOfRange");
      for (var c = 1; s < u; s++, c = 0)
        c && a.length && o(n[s], "outOfRange"), o(n[s], "inRange");
      for (var c = 1; l < h; l++)
        (!n.length || n[n.length - 1] < i[l]) && (c && (a.length && o(a[a.length - 1].value, "outOfRange"), c = 0), o(i[l], "outOfRange"));
      var v = a.length;
      return {
        stops: a,
        outerColors: [v ? a[0].color : "transparent", v ? a[v - 1].color : "transparent"]
      };
    }, t.type = "visualMap.continuous", t.defaultOption = ml(Ks.defaultOption, {
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
  }(Ks)
);
function Og(r, t, e) {
  if (e[0] === e[1])
    return e.slice();
  for (var i = 200, n = (e[1] - e[0]) / i, a = e[0], o = [], s = 0; s <= i && a < e[1]; s++)
    o.push(a), a += n;
  return o.push(e[1]), o;
}
var B_ = (
  /** @class */
  function(r) {
    B(t, r);
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
      var i = this.visualMapModel, n = ho(i.get("padding") || 0), a = e.getBoundingRect();
      e.add(new bt({
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
      function u(f) {
        return s[f];
      }
      function h(f, d) {
        s[f] = d;
      }
      var c = o.controllerVisuals[a || o.getValueState(e)], v = Bt.prepareVisualTypes(c);
      return C(v, function(f) {
        var d = c[f];
        n.convertOpacityToAlpha && f === "opacity" && (f = "colorAlpha", d = c.__alphaForOpacity), Bt.dependsOn(f, i) && d && d.applyVisual(e, u, h);
      }), s[i];
    }, t.prototype.positionGroup = function(e) {
      var i = this.visualMapModel, n = this.api;
      NT(e, i.getBoxLayoutParams(), {
        width: n.getWidth(),
        height: n.getHeight()
      });
    }, t.prototype.doRender = function(e, i, n, a) {
    }, t.type = "visualMap", t;
  }(Oe)
), Eg = [["left", "right", "width"], ["top", "bottom", "height"]];
function z_(r, t, e) {
  var i = r.option, n = i.align;
  if (n != null && n !== "auto")
    return n;
  for (var a = {
    width: t.getWidth(),
    height: t.getHeight()
  }, o = i.orient === "horizontal" ? 1 : 0, s = Eg[o], l = [0, null, 10], u = {}, h = 0; h < 3; h++)
    u[Eg[1 - o][h]] = l[h], u[s[h]] = h === 2 ? e[0] : i[s[h]];
  var c = [["x", "width", 3], ["y", "height", 0]][o], v = In(u, a, i.padding);
  return s[(v.margin[c[2]] || 0) + v[c[0]] + v[c[1]] * 0.5 < a[c[1]] * 0.5 ? 0 : 1];
}
function ms(r, t) {
  return C(r || [], function(e) {
    e.dataIndex != null && (e.dataIndexInside = e.dataIndex, e.dataIndex = null), e.highlightKey = "visualMap" + (t ? t.componentIndex : "");
  }), r;
}
var Ve = vr, PL = C, kg = Math.min, ah = Math.max, $L = 12, RL = 6, OL = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._shapes = {}, e._dataInterval = [], e._handleEnds = [], e._hoverLinkDataIndices = [], e;
    }
    return t.prototype.init = function(e, i) {
      r.prototype.init.call(this, e, i), this._hoverLinkFromSeriesMouseOver = J(this._hoverLinkFromSeriesMouseOver, this), this._hideIndicator = J(this._hideIndicator, this);
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
        var o = this.visualMapModel, s = o.get("textGap"), l = o.itemSize, u = this._shapes.mainGroup, h = this._applyTransform([l[0] / 2, n === 0 ? -s : l[1] + s], u), c = this._applyTransform(n === 0 ? "bottom" : "top", u), v = this._orient, f = this.visualMapModel.textStyleModel;
        this.group.add(new At({
          style: Ye(f, {
            x: h[0],
            y: h[1],
            verticalAlign: v === "horizontal" ? "middle" : c,
            align: v === "horizontal" ? c : "center",
            text: a
          })
        }));
      }
    }, t.prototype._renderBar = function(e) {
      var i = this.visualMapModel, n = this._shapes, a = i.itemSize, o = this._orient, s = this._useHandle, l = z_(i, this.api, a), u = n.mainGroup = this._createBarGroup(l), h = new Ct();
      u.add(h), h.add(n.outOfRange = Ng()), h.add(n.inRange = Ng(null, s ? zg(this._orient) : null, J(this._dragHandle, this, "all", !1), J(this._dragHandle, this, "all", !0))), h.setClipPath(new bt({
        shape: {
          x: 0,
          y: 0,
          width: a[0],
          height: a[1],
          r: 3
        }
      }));
      var c = i.textStyleModel.getTextRect("国"), v = ah(c.width, c.height);
      s && (n.handleThumbs = [], n.handleLabels = [], n.handleLabelPoints = [], this._createHandle(i, u, 0, a, v, o), this._createHandle(i, u, 1, a, v, o)), this._createIndicator(i, u, a, v, o), e.add(u);
    }, t.prototype._createHandle = function(e, i, n, a, o, s) {
      var l = J(this._dragHandle, this, n, !1), u = J(this._dragHandle, this, n, !0), h = qe(e.get("handleSize"), a[0]), c = gr(e.get("handleIcon"), -h / 2, -h / 2, h, h, null, !0), v = zg(this._orient);
      c.attr({
        cursor: v,
        draggable: !0,
        drift: l,
        ondragend: u,
        onmousemove: function(y) {
          Ba(y.event);
        }
      }), c.x = a[0] / 2, c.useStyle(e.getModel("handleStyle").getItemStyle()), c.setStyle({
        strokeNoScale: !0,
        strokeFirst: !0
      }), c.style.lineWidth *= 2, c.ensureState("emphasis").style = e.getModel(["emphasis", "handleStyle"]).getItemStyle(), Xc(c, !0), i.add(c);
      var f = this.visualMapModel.textStyleModel, d = new At({
        cursor: v,
        draggable: !0,
        drift: l,
        onmousemove: function(y) {
          Ba(y.event);
        },
        ondragend: u,
        style: Ye(f, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      d.ensureState("blur").style = {
        opacity: 0.1
      }, d.stateTransition = {
        duration: 200
      }, this.group.add(d);
      var g = [h, 0], p = this._shapes;
      p.handleThumbs[n] = c, p.handleLabelPoints[n] = g, p.handleLabels[n] = d;
    }, t.prototype._createIndicator = function(e, i, n, a, o) {
      var s = qe(e.get("indicatorSize"), n[0]), l = gr(e.get("indicatorIcon"), -s / 2, -s / 2, s, s, null, !0);
      l.attr({
        cursor: "move",
        invisible: !0,
        silent: !0,
        x: n[0] / 2
      });
      var u = e.getModel("indicatorStyle").getItemStyle();
      if (l instanceof er) {
        var h = l.style;
        l.useStyle(N({
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
      var c = this.visualMapModel.textStyleModel, v = new At({
        silent: !0,
        invisible: !0,
        style: Ye(c, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      this.group.add(v);
      var f = [(o === "horizontal" ? a / 2 : RL) + n[0] / 2, 0], d = this._shapes;
      d.indicator = l, d.indicatorLabel = v, d.indicatorLabelPoint = f, this._firstShowIndicator = !0;
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
        }), i ? !this._hovering && this._clearHoverLinkToSeries() : Bg(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[e], !1);
      }
    }, t.prototype._resetInterval = function() {
      var e = this.visualMapModel, i = this._dataInterval = e.getSelected(), n = e.getExtent(), a = [0, e.itemSize[1]];
      this._handleEnds = [Ve(i[0], n, a, !0), Ve(i[1], n, a, !0)];
    }, t.prototype._updateInterval = function(e, i) {
      i = i || 0;
      var n = this.visualMapModel, a = this._handleEnds, o = [0, n.itemSize[1]];
      dI(
        i,
        a,
        o,
        e,
        // cross is forbidden
        0
      );
      var s = n.getExtent();
      this._dataInterval = [Ve(a[0], o, s, !0), Ve(a[1], o, s, !0)];
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
        barColor: new jc(0, 0, 0, 1, s),
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
      return new Ct(i === "horizontal" && !n ? {
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
        PL([0, 1], function(c) {
          var v = o[c];
          v.setStyle("fill", i.handlesColor[c]), v.y = e[c];
          var f = Ve(e[c], [0, l[1]], u, !0), d = this.getControllerVisual(f, "symbolSize");
          v.scaleX = v.scaleY = d / l[0], v.x = l[0] - d / 2;
          var g = _n(n.handleLabelPoints[c], fs(v, this.group));
          if (this._orient === "horizontal") {
            var p = h === "left" || h === "top" ? (l[0] - d) / 2 : (l[0] - d) / -2;
            g[1] += p;
          }
          s[c].setStyle({
            x: g[0],
            y: g[1],
            text: a.formatValueText(this._dataInterval[c]),
            verticalAlign: "middle",
            align: this._orient === "vertical" ? this._applyTransform("left", n.mainGroup) : "center"
          });
        }, this);
      }
    }, t.prototype._showIndicator = function(e, i, n, a) {
      var o = this.visualMapModel, s = o.getExtent(), l = o.itemSize, u = [0, l[1]], h = this._shapes, c = h.indicator;
      if (c) {
        c.attr("invisible", !1);
        var v = {
          convertOpacityToAlpha: !0
        }, f = this.getControllerVisual(e, "color", v), d = this.getControllerVisual(e, "symbolSize"), g = Ve(e, s, u, !0), p = l[0] - d / 2, y = {
          x: c.x,
          y: c.y
        };
        c.y = g, c.x = p;
        var m = _n(h.indicatorLabelPoint, fs(c, this.group)), _ = h.indicatorLabel;
        _.attr("invisible", !1);
        var b = this._applyTransform("left", h.mainGroup), S = this._orient, w = S === "horizontal";
        _.setStyle({
          text: (n || "") + o.formatValueText(i),
          verticalAlign: w ? b : "middle",
          align: w ? "center" : b
        });
        var x = {
          x: p,
          y: g,
          style: {
            fill: f
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
          c.x = y.x, c.y = y.y, c.animateTo(x, D), _.animateTo(M, D);
        } else
          c.attr(x), _.attr(M);
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
          a[1] = kg(ah(0, a[1]), n[1]), e._doHoverLinkToSeries(a[1], 0 <= a[0] && a[0] <= n[0]);
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
        e = kg(ah(o[0], e), o[1]);
        var l = EL(n, s, o), u = [e - l, e + l], h = Ve(e, o, s, !0), c = [Ve(u[0], o, s, !0), Ve(u[1], o, s, !0)];
        u[0] < o[0] && (c[0] = -1 / 0), u[1] > o[1] && (c[1] = 1 / 0), i && (c[0] === -1 / 0 ? this._showIndicator(h, c[1], "< ", l) : c[1] === 1 / 0 ? this._showIndicator(h, c[0], "> ", l) : this._showIndicator(h, h, "≈ ", l));
        var v = this._hoverLinkDataIndices, f = [];
        (i || Bg(n)) && (f = this._hoverLinkDataIndices = n.findTargetDataIndices(c));
        var d = jw(v, f);
        this._dispatchHighDown("downplay", ms(d[0], n)), this._dispatchHighDown("highlight", ms(d[1], n));
      }
    }, t.prototype._hoverLinkFromSeriesMouseOver = function(e) {
      var i;
      if (dn(e.target, function(l) {
        var u = ot(l);
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
      this._dispatchHighDown("downplay", ms(e, this.visualMapModel)), e.length = 0;
    }, t.prototype._clearHoverLinkFromSeries = function() {
      this._hideIndicator();
      var e = this.api.getZr();
      e.off("mouseover", this._hoverLinkFromSeriesMouseOver), e.off("mouseout", this._hideIndicator);
    }, t.prototype._applyTransform = function(e, i, n, a) {
      var o = fs(i, a ? null : this.group);
      return z(e) ? _n(e, o, n) : pm(e, o, n);
    }, t.prototype._dispatchHighDown = function(e, i) {
      i && i.length && this.api.dispatchAction({
        type: e,
        batch: i
      });
    }, t.prototype.dispose = function() {
      this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();
    }, t.type = "visualMap.continuous", t;
  }(B_)
);
function Ng(r, t, e, i) {
  return new fl({
    shape: {
      points: r
    },
    draggable: !!e,
    cursor: t,
    drift: e,
    onmousemove: function(n) {
      Ba(n.event);
    },
    ondragend: i
  });
}
function EL(r, t, e) {
  var i = $L / 2, n = r.get("hoverLinkDataSize");
  return n && (i = Ve(n, t, e, !0) / 2), i;
}
function Bg(r) {
  var t = r.get("hoverLinkOnHandle");
  return !!(t ?? r.get("realtime"));
}
function zg(r) {
  return r === "vertical" ? "ns-resize" : "ew-resize";
}
var kL = {
  type: "selectDataRange",
  event: "dataRangeSelected",
  // FIXME use updateView appears wrong
  update: "update"
}, NL = function(r, t) {
  t.eachComponent({
    mainType: "visualMap",
    query: r
  }, function(e) {
    e.setSelected(r.selected);
  });
}, BL = [
  {
    createOnAllSeries: !0,
    reset: function(r, t) {
      var e = [];
      return t.eachComponent("visualMap", function(i) {
        var n = r.pipelineContext;
        !i.isTargetSeries(r) || n && n.large || e.push(dL(i.stateList, i.targetVisuals, J(i.getValueState, i), i.getDataDimensionIndex(r.getData())));
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
          var a = n.getVisualMeta(J(zL, null, r, n)) || {
            stops: [],
            outerColors: []
          }, o = n.getDataDimensionIndex(e);
          o >= 0 && (a.dimension = o, i.push(a));
        }
      }), r.getData().setVisual("visualMeta", i);
    }
  }
];
function zL(r, t, e, i) {
  for (var n = t.targetVisuals[i], a = Bt.prepareVisualTypes(n), o = {
    color: d0(r.getData(), "color")
    // default color.
  }, s = 0, l = a.length; s < l; s++) {
    var u = a[s], h = n[u === "opacity" ? "__alphaForOpacity" : u];
    h && h.applyVisual(e, c, v);
  }
  return o.color;
  function c(f) {
    return o[f];
  }
  function v(f, d) {
    o[f] = d;
  }
}
var Fg = C;
function FL(r) {
  var t = r && r.visualMap;
  z(t) || (t = t ? [t] : []), Fg(t, function(e) {
    if (e) {
      on(e, "splitList") && !on(e, "pieces") && (e.pieces = e.splitList, delete e.splitList);
      var i = e.pieces;
      i && z(i) && Fg(i, function(n) {
        V(n) && (on(n, "start") && !on(n, "min") && (n.min = n.start), on(n, "end") && !on(n, "max") && (n.max = n.end));
      });
    }
  });
}
function on(r, t) {
  return r && r.hasOwnProperty && r.hasOwnProperty(t);
}
var Hg = !1;
function F_(r) {
  Hg || (Hg = !0, r.registerSubTypeDefaulter("visualMap", function(t) {
    return !t.categories && (!(t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) || t.calculable) ? "continuous" : "piecewise";
  }), r.registerAction(kL, NL), C(BL, function(t) {
    r.registerVisual(r.PRIORITY.VISUAL.COMPONENT, t);
  }), r.registerPreprocessor(FL));
}
function HL(r) {
  r.registerComponentModel(LL), r.registerComponentView(OL), F_(r);
}
var VL = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._pieceList = [], e;
    }
    return t.prototype.optionUpdated = function(e, i) {
      r.prototype.optionUpdated.apply(this, arguments), this.resetExtent();
      var n = this._mode = this._determineMode();
      this._pieceList = [], GL[this._mode].call(this, this._pieceList), this._resetSelected(e, i);
      var a = this.option.categories;
      this.resetVisual(function(o, s) {
        n === "categories" ? (o.mappingMethod = "category", o.categories = X(a)) : (o.dataExtent = this.getExtent(), o.mappingMethod = "piecewise", o.pieceList = U(this._pieceList, function(l) {
          return l = X(l), s !== "inRange" && (l.visual = null), l;
        }));
      });
    }, t.prototype.completeVisualOption = function() {
      var e = this.option, i = {}, n = Bt.listVisualTypes(), a = this.isCategory();
      C(e.pieces, function(s) {
        C(n, function(l) {
          s.hasOwnProperty(l) && (i[l] = 1);
        });
      }), C(i, function(s, l) {
        var u = !1;
        C(this.stateList, function(h) {
          u = u || o(e, h, l) || o(e.target, h, l);
        }, this), !u && C(this.stateList, function(h) {
          (e[h] || (e[h] = {}))[l] = N_.get(l, h === "inRange" ? "active" : "inactive", a);
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
      var i = Bt.findPieceIndex(e, this._pieceList);
      return i != null && this.option.selected[this.getSelectedMapKey(this._pieceList[i])] ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(e) {
      var i = [], n = this._pieceList;
      return this.eachTargetSeries(function(a) {
        var o = [], s = a.getData();
        s.each(this.getDataDimensionIndex(s), function(l, u) {
          var h = Bt.findPieceIndex(l, n);
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
      function o(h, c) {
        var v = a.getRepresentValue({
          interval: h
        });
        c || (c = a.getValueState(v));
        var f = e(v, c);
        h[0] === -1 / 0 ? n[0] = f : h[1] === 1 / 0 ? n[1] = f : i.push({
          value: h[0],
          color: f
        }, {
          value: h[1],
          color: f
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
        var c = h.interval;
        c && (c[0] > u && o([u, c[0]], "outOfRange"), o(c.slice()), u = c[1]);
      }, this), {
        stops: i,
        outerColors: n
      };
    }, t.type = "visualMap.piecewise", t.defaultOption = ml(Ks.defaultOption, {
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
  }(Ks)
), GL = {
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
    }), xv(r), C(r, function(u, h) {
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
    }, this), Vg(t, r);
  },
  pieces: function(r) {
    var t = this.option;
    C(t.pieces, function(e, i) {
      V(e) || (e = {
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
        for (var o = n.interval = [], s = n.close = [0, 0], l = [1, 0, 1], u = [-1 / 0, 1 / 0], h = [], c = 0; c < 2; c++) {
          for (var v = [["gte", "gt", "min"], ["lte", "lt", "max"]][c], f = 0; f < 3 && o[c] == null; f++)
            o[c] = e[v[f]], s[c] = l[f], h[c] = f === 2;
          o[c] == null && (o[c] = u[c]);
        }
        h[0] && o[1] === 1 / 0 && (s[0] = 0), h[1] && o[0] === -1 / 0 && (s[1] = 0), o[0] === o[1] && s[0] && s[1] && (n.value = o[0]);
      }
      n.visual = Bt.retrieveVisuals(e), r.push(n);
    }, this), Vg(t, r), xv(r), C(r, function(e) {
      var i = e.close, n = [["<", "≤"][i[1]], [">", "≥"][i[0]]];
      e.text = e.text || this.formatValueText(e.value != null ? e.value : e.interval, !1, n);
    }, this);
  }
};
function Vg(r, t) {
  var e = r.inverse;
  (r.orient === "vertical" ? !e : e) && t.reverse();
}
var WL = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.doRender = function() {
      var e = this.group;
      e.removeAll();
      var i = this.visualMapModel, n = i.get("textGap"), a = i.textStyleModel, o = a.getFont(), s = a.getTextColor(), l = this._getItemAlign(), u = i.itemSize, h = this._getViewData(), c = h.endsText, v = Dn(i.get("showLabel", !0), !c), f = !i.get("selectedMode");
      c && this._renderEndsText(e, c[0], u, v, l), C(h.viewPieceList, function(d) {
        var g = d.piece, p = new Ct();
        p.onclick = J(this._onItemClick, this, g), this._enableHoverLink(p, d.indexInModelPieceList);
        var y = i.getRepresentValue(g);
        if (this._createItemSymbol(p, y, [0, 0, u[0], u[1]], f), v) {
          var m = this.visualMapModel.getValueState(y);
          p.add(new At({
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
            silent: f
          }));
        }
        e.add(p);
      }, this), c && this._renderEndsText(e, c[1], u, v, l), xn(i.get("orient"), e, i.get("itemGap")), this.renderBackground(e), this.positionGroup(e);
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
          batch: ms(s.findTargetDataIndices(i), s)
        });
      };
    }, t.prototype._getItemAlign = function() {
      var e = this.visualMapModel, i = e.option;
      if (i.orient === "vertical")
        return z_(e, this.api, e.itemSize);
      var n = i.align;
      return (!n || n === "auto") && (n = "left"), n;
    }, t.prototype._renderEndsText = function(e, i, n, a, o) {
      if (i) {
        var s = new Ct(), l = this.visualMapModel.textStyleModel;
        s.add(new At({
          style: Ye(l, {
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
      var o = gr(
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
  }(B_)
);
function UL(r) {
  r.registerComponentModel(VL), r.registerComponentView(WL), F_(r);
}
function YL(r) {
  Ke(HL), Ke(UL);
}
function Gg(r, t, e) {
  var i = Wr.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var oh = function(r) {
  B(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Ps, typeof e == "string" ? o = Gg(e, i, n) : V(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (vy(o), o.onselectstart = function() {
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
    this.domBack = Gg("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new lt(0, 0, 0, 0);
    function h(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new lt(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var b = !1, S = 1 / 0, w = 0, x = 0; x < o.length; ++x) {
            var M = o[x];
            if (M.intersect(m)) {
              var D = new lt(0, 0, 0, 0);
              D.copy(M), D.union(m), o[x] = D, b = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(M);
              var A = m.width * m.height, T = M.width * M.height, I = u.width * u.height, P = I - A - T;
              P < S && (S = P, w = x);
            }
          }
          if (l && (o[w].union(m), b = !0), !b) {
            var _ = new lt(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var c = this.__startIndex; c < this.__endIndex; ++c) {
      var v = e[c];
      if (v) {
        var f = v.shouldBePainted(n, a, !0, !0), d = v.__isRendered && (v.__dirty & ae || !f) ? v.getPrevPaintRect() : null;
        d && h(d);
        var g = f && (v.__dirty & ae || !v.__isRendered) ? v.getPaintRect() : null;
        g && h(g);
      }
    }
    for (var c = this.__prevStartIndex; c < this.__prevEndIndex; ++c) {
      var v = i[c], f = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!f || !v.__zr) && v.__isRendered) {
        var d = v.getPrevPaintRect();
        d && h(d);
      }
    }
    var p;
    do {
      p = !1;
      for (var c = 0; c < o.length; ) {
        if (o[c].isZero()) {
          o.splice(c, 1);
          continue;
        }
        for (var y = c + 1; y < o.length; )
          o[c].intersect(o[y]) ? (p = !0, o[c].union(o[y]), o.splice(y, 1)) : y++;
        c++;
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
    var u = this.motionBlur && !e, h = this.lastFrameAlpha, c = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / c, l / c));
    var f = this.domBack;
    function d(g, p, y, m) {
      if (o.clearRect(g, p, y, m), i && i !== "transparent") {
        var _ = void 0;
        if (rl(i)) {
          var b = i.global || i.__width === y && i.__height === m;
          _ = b && i.__canvasGradient || Zh(o, i, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), i.__canvasGradient = _, i.__width = y, i.__height = m;
        } else c1(i) && (i.scaleX = i.scaleX || c, i.scaleY = i.scaleY || c, _ = Kh(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(g, p, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(f, g, p, y, m), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && C(n, function(g) {
      d(g.x * c, g.y * c, g.width * c, g.height * c);
    });
  }, t;
}(tr), Wg = 1e5, yi = 314159, ts = 0.01, XL = 1e-3;
function qL(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function ZL(r, t) {
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
var KL = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = N({}, i || {}), this.dpr = i.devicePixelRatio || Ps, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (vy(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, c = h.width, v = h.height;
      i.width != null && (c = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, h.width = c * this.dpr, h.height = v * this.dpr, this._width = c, this._height = v;
      var f = new oh(h, this, this.dpr);
      f.__builtin__ = !0, f.initContext(), l[yi] = f, f.zlevel = yi, s.push(yi), this._domRoot = t;
    } else {
      this._width = Fo(t, 0, i), this._height = Fo(t, 1, i);
      var u = this._domRoot = ZL(this._width, this._height);
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
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Wg)), a || (a = i.ctx, a.save()), Ti(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Wg);
  }, r.prototype.paintOne = function(t, e) {
    _0(t, e);
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
        Cs(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(yi).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var h = !0, c = !1, v = function(g) {
      var p = a[g], y = p.ctx, m = o && p.createRepaintRects(t, e, f._width, f._height), _ = i ? p.__startIndex : p.__drawIndex, b = !i && p.incremental && Date.now, S = b && Date.now(), w = p.zlevel === f._zlevelList[0] ? f._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, w, m);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && p.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var M, D = function(P) {
        var $ = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (M = _; M < p.__endIndex; M++) {
          var R = t[M];
          if (R.__inHover && (c = !0), n._doPaintEl(R, p, o, P, $, M === p.__endIndex - 1), b) {
            var O = Date.now() - S;
            if (O > 15)
              break;
          }
        }
        $.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          M = p.__endIndex;
        else
          for (var A = f.dpr, T = 0; T < m.length; ++T) {
            var I = m[T];
            y.save(), y.beginPath(), y.rect(I.x * A, I.y * A, I.width * A, I.height * A), y.clip(), D(I), y.restore();
          }
      else
        y.save(), D(), y.restore();
      p.__drawIndex = M, p.__drawIndex < p.__endIndex && (h = !1);
    }, f = this, d = 0; d < a.length; d++)
      v(d);
    return Y.wxa && C(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: c
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Ti(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Ti(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = yi);
    var i = this._layers[t];
    return i || (i = new oh("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? nt(i, this._layerConfig[t], !0) : this._layerConfig[t - ts] && nt(i, this._layerConfig[t - ts], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && qL(e)) {
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
    this.eachBuiltinLayer(function(c, v) {
      c.__dirty = c.__used = !1;
    });
    function e(c) {
      a && (a.__endIndex !== c && (a.__dirty = !0), a.__endIndex = c);
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
      s !== u && (s = u, o = 0), n.incremental ? (h = this.getLayer(u + XL, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? ts : 0), this._needsManuallyCompositing), h.__builtin__ || Ic("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), a = h), n.__dirty & ae && !n.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(c, v) {
      !c.__used && c.getElementCount() > 0 && (c.__dirty = !0, c.__startIndex = c.__endIndex = c.__drawIndex = 0), c.__dirty && c.__drawIndex < 0 && (c.__drawIndex = c.__startIndex);
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
      i[t] ? nt(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + ts) {
          var o = this._layers[a];
          nt(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(vt(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = Fo(a, 0, n), e = Fo(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(yi).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[yi].dom;
    var e = new oh("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(c) {
        c.__builtin__ ? i.drawImage(c.dom, 0, 0, n, a) : c.renderToCanvas && (i.save(), c.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var h = s[l];
        Ti(i, h, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function QL(r) {
  r.registerPainter("canvas", KL);
}
const jL = [
  P2,
  wI,
  p2,
  YI,
  TL,
  fL,
  YL,
  QL
];
var JL = Object.defineProperty, tP = Object.getOwnPropertyDescriptor, Pf = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? tP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && JL(t, e, n), n;
};
Ke(jL);
let to = class extends Gt {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".canvas");
    this.chart = _D(r, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(r), this.applyOption();
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
    return L`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
to.styles = we`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
Pf([
  it({ attribute: !1 })
], to.prototype, "option", 2);
Pf([
  it({ type: String })
], to.prototype, "height", 2);
to = Pf([
  ke("ia-chart")
], to);
var eP = Object.defineProperty, rP = Object.getOwnPropertyDescriptor, Ni = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? rP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && eP(t, e, n), n;
};
const _s = ["pv_energy_total", "grid_import_total", "battery_discharge_total"], yc = ["load_energy_total", "grid_export_total", "battery_charge_total"], iP = [..._s, ...yc];
let yr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new je(this), this.requestId = 0;
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
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await pb(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderTotals(r) {
    const t = this.i18n.m, e = this.i18n.locale;
    return L`<div class="kpi">
      ${iP.filter((i) => i in r.totals).map(
      (i) => L`<div class="cell">
          <span class="label">${Mn(t, i)}</span>
          <span class="value">${Xt(r.totals[i], e)}</span>
          <span class="hint">
            ${_s.includes(i) ? t.balance.intoSystem : t.balance.outOfIt}
          </span>
        </div>`
    )}
    </div>`;
  }
  renderBalance(r) {
    const t = this.i18n.m, e = this.i18n.locale;
    return r.unaccounted === null ? L`<p class="empty">
        ${t.balance.needsAllSix({
      missing: r.missing.map((i) => Mn(t, i)).join(", ")
    })}
      </p>` : L`
      <p class="balance">
        ${t.balance.inOut({
      in: Xt(r.sources_total, e),
      out: Xt(r.sinks_total, e)
    })}
        <strong>${Xt(Math.abs(r.unaccounted), e)}</strong>
        ${(r.unaccounted >= 0 ? t.balance.unaccountedFor : t.balance.moreOutThanIn)({
      share: K(r.unaccounted_share, e)
    })}
      </p>
      <p class="note">${t.balance.unaccountedNote}</p>
    `;
  }
  renderRatios(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = r.totals, n = (a) => a in i;
    return r.self_sufficiency === null && r.self_consumption === null ? L`<p class="empty">${t.balance.ratiosNeedCounters}</p>` : L`<div class="kpi">
      ${r.self_sufficiency !== null ? L`<div class="cell">
            <span class="label">${t.balance.selfSufficiency}</span>
            <span class="value">${K(r.self_sufficiency, e)}</span>
            <span class="hint">
              ${n("load_energy_total") && n("grid_import_total") ? `(${Xt(i.load_energy_total, e)} − ${Xt(
      i.grid_import_total,
      e
    )}) ÷ ${Xt(i.load_energy_total, e)}` : ""}
            </span>
          </div>` : k}
      ${r.self_consumption !== null ? L`<div class="cell">
            <span class="label">${t.balance.selfConsumption}</span>
            <span class="value">${K(r.self_consumption, e)}</span>
            <span class="hint">
              ${n("pv_energy_total") && n("grid_export_total") ? `(${Xt(i.pv_energy_total, e)} − ${Xt(
      i.grid_export_total,
      e
    )}) ÷ ${Xt(i.pv_energy_total, e)}` : ""}
            </span>
          </div>` : k}
    </div>`;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale;
    return L`
      <div class="status">
        <span class="badge">${r.balance.hourlyStatistics}</span>
        <span class="badge">${r.balance.daysIn({ timezone: t.timezone })}</span>
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${!t.covers_whole_window && t.covered_end ? L`<span class="warn">
              ${r.balance.countedUpTo({
      time: new Date(t.covered_end).toLocaleString(e)
    })}
            </span>` : k}
        ${t.covered_end ? k : L`<span class="warn">${r.balance.noEnergyStatistics}</span>`}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      ${this.renderTotals(t)}

      <section>
        <h2>${r.balance.inAgainstOut}</h2>
        <ia-chart
          .option=${Yb(t.totals, _s, yc, r)}
          height="220px"
        ></ia-chart>
        ${this.renderBalance(t)}
      </section>

      <section>
        <h2>${r.balance.ratiosTitle}</h2>
        ${this.renderRatios(t)}
      </section>

      <section>
        <h2>${r.balance.dayByDay}</h2>
        ${t.days.length ? L`<ia-chart
              .option=${Xb(t.days, _s, yc, r)}
            ></ia-chart>` : L`<p class="empty">${r.balance.noDays}</p>`}
        <p class="note">${r.balance.dayByDayNote}</p>
      </section>
    `;
  }
};
yr.styles = we`
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
Ni([
  it({ attribute: !1 })
], yr.prototype, "hass", 2);
Ni([
  it({ type: String })
], yr.prototype, "entryId", 2);
Ni([
  it({ type: String })
], yr.prototype, "range", 2);
Ni([
  _t()
], yr.prototype, "payload", 2);
Ni([
  _t()
], yr.prototype, "error", 2);
Ni([
  _t()
], yr.prototype, "loading", 2);
yr = Ni([
  ke("ia-balance-tab")
], yr);
const co = we`
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
var nP = Object.defineProperty, aP = Object.getOwnPropertyDescriptor, Ol = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? aP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && nP(t, e, n), n;
};
let Rn = class extends Gt {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en", this.i18n = new je(this);
  }
  render() {
    const t = this.i18n.m.sections.charge, e = this.flow;
    return L`
      <section>
        <h2>${t.title}</h2>

        ${e.sign_looks_inverted ? L`<p class="warn">${t.signInverted}</p>` : k}

        <div class="cards">
          <div class="card">
            <span class="name">${t.meanChargePower}</span>
            <span class="value">${pt(e.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span><span>${K(e.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.meanDischargePower}</span>
            <span class="value">${pt(e.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span>
              <span>${K(e.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.resting}</span>
            <span class="value">${K(e.share_idle, this.locale)}</span>
            <span class="row">
              <span>${t.below}</span><span>${pt(e.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.discharged}</span>
            <span class="value">${Xt(e.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>${t.charged}</span><span>${Xt(e.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${e.round_trip_efficiency !== null ? L`<div class="card">
                <span class="name">${t.roundTripEfficiency}</span>
                <span class="value">
                  ${K(e.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>${t.outOfWhatWentIn}</span></span>
              </div>` : k}
          <div class="card">
            <span class="name">${t.fullCyclesPerDay}</span>
            <span class="value">
              ${e.cycles_per_day === null ? "—" : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      e.cycles_per_day
    )}
            </span>
            ${e.cycles_per_day === null ? L`<span class="row"><span>${t.needsCapacity}</span></span>` : k}
          </div>
        </div>

        ${e.cycles_per_day === null && !this.hasCapacity ? L`<p class="note">${t.setCapacity}</p>` : k}

        ${e.energy_metered ? k : L`<p class="note">${t.integrated}</p>`}
        ${e.energy_metered && e.round_trip_efficiency === null ? L`<p class="note">
              ${t.noEfficiency}
              ${e.soc_drift_pct !== null && Math.abs(e.soc_drift_pct) > e.efficiency_max_drift_pct ? (e.soc_drift_pct < 0 ? t.driftBelow : t.driftAbove)({
      n: Math.abs(Math.round(e.soc_drift_pct))
    }) : t.tooLittle}
            </p>` : k}
      </section>
    `;
  }
};
Rn.styles = [co, we`:host { display: block; }`];
Ol([
  it({ attribute: !1 })
], Rn.prototype, "flow", 2);
Ol([
  it({ type: Boolean })
], Rn.prototype, "hasCapacity", 2);
Ol([
  it({ type: String })
], Rn.prototype, "locale", 2);
Rn = Ol([
  ke("ia-charge-section")
], Rn);
var oP = Object.defineProperty, sP = Object.getOwnPropertyDescriptor, Bi = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? sP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && oP(t, e, n), n;
};
let mr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new je(this), this.requestId = 0;
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
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await vb(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = r.dips_measurable, n = "—", a = [
      [
        t.battery.meanCharge,
        K(mi(r.kpi.mean_soc), e),
        t.battery.overWholePeriod
      ],
      [
        t.battery.lowestCharge,
        i ? K(mi(r.kpi.min_soc), e) : n,
        i ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.below({ level: K(mi(r.low_pct), e) }),
        i ? qt(r.kpi.seconds_below_low, e) : n,
        i ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.dips,
        i ? String(r.kpi.dip_count) : n,
        i ? t.battery.lastingOverMinute : t.battery.needsExactData
      ],
      [
        t.battery.meanLowPoint,
        i ? K(mi(r.kpi.mean_low_point), e) : n,
        i ? t.battery.acrossThoseDips : t.battery.needsExactData
      ]
    ];
    return L`<div class="kpi">
      ${a.map(
      ([o, s, l]) => L`<div class="cell">
          <span class="label">${o}</span>
          <span class="value">${s}</span>
          <span class="hint">${l}</span>
        </div>`
    )}
    </div>`;
  }
  renderEpisodes(r) {
    const t = this.i18n.m, e = this.i18n.locale;
    return r.dips_measurable ? r.episodes.length ? L`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          <th>${t.battery.lowest}</th>
          <th>${t.battery.recoveredTo}</th>
        </tr>
      </thead>
      <tbody>
        ${r.episodes.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(e)}</td>
            <td>${qt(i.seconds, e)}</td>
            <td>${K(mi(i.lowest), e)}</td>
            <td>${K(mi(i.recovered_to), e)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : L`<p class="empty">
        ${t.battery.noEpisodes({ level: K(mi(r.low_pct), e) })}
      </p>` : L`<p class="empty">${t.battery.dipsNotMeasurable}</p>`;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale, i = ka(t.coverage, e);
    return L`
      <div class="status">
        <span class="badge">${tl(t.precision, t.boundary, e)}</span>
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${t.raw_from && t.dips_restricted && t.dips_measurable ? L`<span class="warn">
              ${r.battery.dipsCountedFrom({
      date: new Date(t.raw_from).toLocaleDateString(e)
    })}
            </span>` : k}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      ${this.renderKpi(t)}

      <section>
        <h2>${r.battery.timeAtSoc}</h2>
        <ia-chart .option=${Hb(t, r)}></ia-chart>
      </section>

      <section>
        <h2>${r.battery.chargeBands}</h2>
        <ia-chart .option=${Vb(t.bands, r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${r.battery.lowChargeEpisodes}</h2>
        ${this.renderEpisodes(t)}
      </section>

      ${t.power ? L`<ia-charge-section
            .flow=${t.power}
            .hasCapacity=${t.has_capacity}
            .locale=${e}
          ></ia-charge-section>` : L`<section>
            <h2>${r.sections.charge.title}</h2>
            <p class="empty">${r.battery.mapPowerSensor}</p>
          </section>`}
    `;
  }
};
mr.styles = we`
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
Bi([
  it({ attribute: !1 })
], mr.prototype, "hass", 2);
Bi([
  it({ type: String })
], mr.prototype, "entryId", 2);
Bi([
  it({ type: String })
], mr.prototype, "range", 2);
Bi([
  _t()
], mr.prototype, "payload", 2);
Bi([
  _t()
], mr.prototype, "error", 2);
Bi([
  _t()
], mr.prototype, "loading", 2);
mr = Bi([
  ke("ia-battery-tab")
], mr);
function mi(r) {
  return r === null ? null : r / 100;
}
var lP = Object.defineProperty, uP = Object.getOwnPropertyDescriptor, zi = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? uP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && lP(t, e, n), n;
};
const kr = "—";
function es(r, t) {
  return r === null ? kr : qt(r * 3600, t);
}
function hP(r, t) {
  return new Intl.NumberFormat(t.charts.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    useGrouping: !1
  }).format(r);
}
const cP = 24 * 3600 * 1e3;
function fP(r, t) {
  const e = new Date(r), i = new Date(new Date(t).getTime() - 1), n = (a) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  return Math.round((n(i) - n(e)) / cP) + 1;
}
let _r = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new je(this), this.requestId = 0;
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
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await gb(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = r.kpi, n = r.measured_seconds > 0, a = [
      [t.grid.outages, n ? `${i.count}` : kr, ""],
      [
        t.grid.withoutGrid,
        n ? qt(i.off_seconds, e) : kr,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        i.bridged_seconds > 0 ? t.grid.unrecordedAssumedOff({
          duration: qt(i.bridged_seconds, e)
        }) : ""
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      [t.grid.shareOfTime, hr(i.off_share, e), t.grid.ofMeasuredTime],
      [
        t.grid.longest,
        i.longest_seconds === null ? kr : qt(i.longest_seconds, e),
        i.longest_start ? t.grid.fromTime({ time: new Date(i.longest_start).toLocaleString(e) }) : ""
      ],
      [
        t.grid.meanDuration,
        i.mean_seconds === null ? kr : qt(i.mean_seconds, e),
        ""
      ]
    ];
    return i.brief_interruptions !== null && a.push([t.grid.briefInterruptions, `${i.brief_interruptions}`, t.grid.underAMinute]), L`<div class="kpi">
      ${a.map(
      ([o, s, l]) => L`<div class="cell">
          <span class="label">${o}</span>
          <span class="value">${s}</span>
          <span class="hint">${l}</span>
        </div>`
    )}
    </div>`;
  }
  renderDuration(r) {
    const t = r.started_before_window || r.ongoing, e = qt(r.seconds, this.i18n.locale);
    return t ? this.i18n.m.grid.atLeast({ duration: e }) : e;
  }
  renderEpisodes(r) {
    const t = this.i18n.m, e = this.i18n.locale;
    if (!r.episodes.length)
      return L`<p class="empty">
        ${t.grid.noOutages({ duration: qt(r.measured_seconds, e) })}
      </p>`;
    const i = (n) => n == null ? kr : K(n / 100, e);
    return L`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          ${r.has_soc ? L`<th>${t.grid.chargeAtStart}</th>
                <th>${t.grid.lowest}</th>
                <th>${t.grid.atEnd}</th>` : k}
          ${r.has_load ? L`<th>${t.grid.meanLoad}</th>` : k}
        </tr>
      </thead>
      <tbody>
        ${r.episodes.map(
      (n) => L`<tr>
            <td>${new Date(n.start).toLocaleString(e)}</td>
            <td>
              ${this.renderDuration(n)}
              ${n.bridged_seconds > 0 ? L`<span class="hint"
                    >${t.grid.unrecorded({
        duration: qt(n.bridged_seconds, e)
      })}</span
                  >` : k}
            </td>
            ${r.has_soc ? L`<td>${i(n.soc_start)}</td>
                  <td class=${n.below_low ? "low" : ""}>${i(n.soc_min)}</td>
                  <td>${i(n.soc_end)}</td>` : k}
            ${r.has_load ? L`<td>${pt(n.load_mean_w ?? null, e)}</td>` : k}
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  renderAutonomy(r, t) {
    const e = this.i18n.m, i = this.i18n.locale;
    if (r.reason !== null) {
      const a = {
        ...e.grid.autonomyReasons,
        too_little_evidence: e.grid.tooLittleEvidence({
          hours: es(r.evidence_hours, i)
        })
      };
      return L`<p class="note">${e.grid.noAutonomy} ${a[r.reason]}</p>`;
    }
    const n = r.rate_pct_per_hour;
    return L`
      <div class="cards">
        <div class="card">
          <span class="name"
            >${e.grid.fromFullTo({ level: K(t / 100, i) })}</span
          >
          <span class="value">${es(r.hours_from_full, i)}</span>
        </div>
        <div class="card">
          <span class="name">${e.grid.fromNow}</span>
          <span class="value">${es(r.hours_from_now, i)}</span>
          <span class="row">
            <span>${e.grid.chargeNow}</span>
            <span
              >${r.soc_now === null ? kr : K(r.soc_now / 100, i)}</span
            >
          </span>
        </div>
        <div class="card">
          <span class="name">${e.grid.dischargeRate}</span>
          <span class="value"
            >${n === null ? kr : e.grid.pointsPerHour({ rate: hP(n, e) })}</span
          >
          <span class="row">
            <span>${e.grid.meanLoad}</span>
            <span>${pt(r.load_mean_w, i)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        ${e.grid.evidenceNote({ hours: es(r.evidence_hours, i) })}
      </p>
    `;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale, i = ka(t.coverage, e), n = t.days.length === 0, a = fP(t.counted_from ?? t.window.start, t.window.end) - t.days.length, o = t.counted_from ? new Date(t.counted_from).toLocaleDateString(e) : null;
    return L`
      <div class="status">
        <span class="badge">${tl(t.precision, t.boundary, e)}</span>
        ${o ? L`<span class="warn">
              ${t.source === "inferred" ? r.grid.countedFromInferred({ date: o }) : r.grid.countedFromNoHistory({ date: o })}
            </span>` : k}
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      ${t.source === "inferred" ? L`<p class="banner">${r.grid.inferredBanner}</p>` : k}

      ${this.renderKpi(t)}

      <section>
        <h2>${r.grid.hoursByDay}</h2>
        ${n ? L`<p class="empty">${r.grid.noDaysWithData}</p>` : L`<ia-chart
                .option=${qb(t.days, r)}
                height="220px"
              ></ia-chart>
              ${a > 0 ? L`<p class="note">${r.grid.missingDays({ n: a })}</p>` : k}`}
      </section>

      <section>
        <h2>${r.grid.shareByHour}</h2>
        <ia-chart .option=${Zb(t.hours, r)} height="220px"></ia-chart>
        <p class="note">${r.grid.hoursNeverRecorded}</p>
      </section>

      <section>
        <h2>${r.grid.outages}</h2>
        ${this.renderEpisodes(t)}
      </section>

      <section>
        <h2>${r.grid.autonomy}</h2>
        ${this.renderAutonomy(t.autonomy, t.low_pct)}
      </section>
    `;
  }
};
_r.styles = [
  co,
  we`
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
      .banner {
        border: 1px solid var(--warning-color);
        border-radius: 12px;
        padding: 12px 16px;
        margin: 0 0 16px;
        font-size: 13px;
      }
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
      /* Scoped to the KPI cells: the autonomy cards keep the shared
         .card .value size, so an unscoped rule here would be a rule that
         only ever loses. */
      .cell .value { font-size: 22px; font-weight: 500; }
      .hint { font-size: 12px; color: var(--secondary-text-color); }
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
      td.low { color: var(--error-color, #d64545); font-weight: 500; }
      .empty { color: var(--secondary-text-color); margin: 0; }
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
    `
];
zi([
  it({ attribute: !1 })
], _r.prototype, "hass", 2);
zi([
  it({ type: String })
], _r.prototype, "entryId", 2);
zi([
  it({ type: String })
], _r.prototype, "range", 2);
zi([
  _t()
], _r.prototype, "payload", 2);
zi([
  _t()
], _r.prototype, "error", 2);
zi([
  _t()
], _r.prototype, "loading", 2);
_r = zi([
  ke("ia-grid-tab")
], _r);
var vP = Object.defineProperty, dP = Object.getOwnPropertyDescriptor, El = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? dP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && vP(t, e, n), n;
};
let On = class extends Gt {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new je(this);
  }
  renderCards() {
    const r = this.i18n.m, t = r.sections.phases, { rating_per_phase: e } = this.phases;
    return L`<div class="cards">
      ${this.phases.per_phase.map((i) => {
      const n = this.series[i.key]?.coverage;
      return L`<div class="card">
          <span class="name">${xs(r, i)}</span>
          <span class="value">${pt(i.mean, this.locale)}</span>
          <span class="row"><span>${r.common.peak}</span><span>${pt(i.peak, this.locale)}</span></span>
          <span class="row"><span>P95</span><span>${pt(i.p95, this.locale)}</span></span>
          <span class="row"><span>${t.shareOfLoad}</span><span>${K(i.share, this.locale)}</span></span>
          <span class="row">
            <span>${t.peakVs({ rating: pt(e, this.locale) })}</span>
            <span>${K(i.headroom, this.locale)}</span>
          </span>
          ${n !== void 0 && n < 0.95 ? L`<span class="warn">
                ${r.common.coversOfPeriod({ share: hr(n, this.locale) })}
              </span>` : k}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const r = this.i18n.m, t = r.sections.phases, { imbalance: e } = this.phases;
    return e.mean === null ? L`<p class="empty">
        ${t.neverAboveFloor({ floor: pt(e.floor_w, this.locale) })}
      </p>` : L`
      <div class="cards">
        <div class="card">
          <span class="name">${t.meanImbalance}</span>
          <span class="value">${K(e.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">${t.p95Imbalance}</span>
          <span class="value">${K(e.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">
            ${t.above({ threshold: K(e.threshold, this.locale) })}
          </span>
          <span class="value">${K(e.fraction_above, this.locale)}</span>
          <span class="row"><span>${t.ofMeasuredTime}</span></span>
        </div>
      </div>
      <ia-chart .option=${zb(e, r)}></ia-chart>
      <p class="note">
        ${t.measuredOver({
      duration: qt(e.analysed_seconds, this.locale),
      share: hr(e.coverage, this.locale)
    })}${e.below_floor_seconds > 0 ? L` ${t.belowFloorExcluded({
      duration: qt(e.below_floor_seconds, this.locale),
      floor: pt(e.floor_w, this.locale)
    })}` : k}
      </p>
    `;
  }
  renderEpisodes() {
    const r = this.i18n.m, { episodes: t, per_phase: e } = this.phases;
    return t.length ? L`<table>
      <thead>
        <tr>
          <th>${r.common.start}</th>
          <th>${r.common.duration}</th>
          <th>${r.sections.phases.worst}</th>
          ${e.map((i) => L`<th>${xs(r, i)}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${t.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(this.locale)}</td>
            <td>${qt(i.seconds, this.locale)}</td>
            <td>${K(i.peak_imbalance, this.locale)}</td>
            ${i.phases.map((n) => L`<td>${pt(n, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : L`<p class="empty">${r.sections.phases.noSustained}</p>`;
  }
  render() {
    const { imbalance: r, rating_per_phase: t, rating_per_phase_derived: e, rating_per_phase_divisor: i } = this.phases, n = this.i18n.m.sections.phases;
    return L`
      <section>
        <h2>${n.title}</h2>
        ${this.renderCards()}
        ${e ? L`<p class="note">
              ${n.derivedRating({
      n: i,
      rating: pt(t, this.locale)
    })}
            </p>` : k}
        ${r.aligned_coverage < 0.95 ? L`<p class="warn">
              ${n.alignedLow({ share: hr(r.aligned_coverage, this.locale) })}
            </p>` : k}

        <h3>${n.imbalance}</h3>
        ${this.renderImbalance()}

        <h3>${n.sustainedEpisodes}</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
On.styles = [co, we`:host { display: block; }`];
El([
  it({ attribute: !1 })
], On.prototype, "phases", 2);
El([
  it({ attribute: !1 })
], On.prototype, "series", 2);
El([
  it({ type: String })
], On.prototype, "locale", 2);
On = El([
  ke("ia-phases-section")
], On);
var pP = Object.defineProperty, gP = Object.getOwnPropertyDescriptor, kl = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? gP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && pP(t, e, n), n;
};
let En = class extends Gt {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new je(this);
  }
  render() {
    const r = this.i18n.m, t = r.sections.strings, { parts: e, aligned_coverage: i } = this.strings;
    return L`
      <section>
        <h2>${t.title}</h2>
        <div class="cards">
          ${e.map((n) => {
      const a = this.series[n.key]?.coverage;
      return L`<div class="card">
              <span class="name">${xs(r, n)}</span>
              <span class="value">${pt(n.mean, this.locale)}</span>
              <span class="row"><span>${r.common.peak}</span><span>${pt(n.peak, this.locale)}</span></span>
              <span class="row"><span>${t.shareOfPv}</span><span>${K(n.share, this.locale)}</span></span>
              ${a !== void 0 && a < 0.95 ? L`<span class="warn">
                    ${r.common.coversOfPeriod({ share: hr(a, this.locale) })}
                  </span>` : k}
            </div>`;
    })}
        </div>
        <ia-chart .option=${Fb(e, at.pv, r)}></ia-chart>
        ${i < 0.95 ? L`<p class="warn">
              ${t.alignedLow({ share: hr(i, this.locale) })}
            </p>` : k}
        <p class="note">${t.compare}</p>
      </section>
    `;
  }
};
En.styles = [co, we`:host { display: block; }`];
kl([
  it({ attribute: !1 })
], En.prototype, "strings", 2);
kl([
  it({ attribute: !1 })
], En.prototype, "series", 2);
kl([
  it({ type: String })
], En.prototype, "locale", 2);
En = kl([
  ke("ia-strings-section")
], En);
var yP = Object.defineProperty, mP = Object.getOwnPropertyDescriptor, Yr = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? mP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && yP(t, e, n), n;
};
let Qe = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.i18n = new je(this), this.requestId = 0;
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
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await fb(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
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
  renderConsistency(r, t) {
    if (!r?.beyond_margin) return k;
    const e = this.i18n.locale;
    return L`<span class="warn">
      ${t({
      total: pt(r.total_mean, e),
      partsTotal: pt(r.parts_mean, e)
    })}
    </span>`;
  }
  renderKpi(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = (a) => a === null ? "" : t.load.shareOfRated({ share: K(a / r.rated_power, e) }), n = [
      [t.load.mean, pt(r.kpi.mean, e), i(r.kpi.mean)],
      [t.load.median, pt(r.kpi.median, e), ""],
      ["P95", pt(r.kpi.p95, e), ""],
      [t.common.peak, pt(r.kpi.max, e), i(r.kpi.max)],
      [t.load.sustained15m, pt(r.kpi.max_sustained_15m, e), ""],
      [
        t.load.above80OfRated,
        K(r.kpi.fraction_above_80pct, e),
        t.load.ofTime
      ]
    ];
    return L`<div class="kpi">
      ${n.map(
      ([a, o, s]) => L`<div class="cell">
          <span class="label">${a}</span>
          <span class="value">${o}</span>
          <span class="hint">${s}</span>
        </div>`
    )}
    </div>`;
  }
  renderOverloads(r) {
    const t = this.i18n.m;
    if (!r.overloads.length)
      return L`<p class="empty">${t.load.noOverloads}</p>`;
    const e = this.i18n.locale;
    return L`<table>
      <thead>
        <tr><th>${t.common.start}</th><th>${t.common.duration}</th><th>${t.common.peak}</th></tr>
      </thead>
      <tbody>
        ${r.overloads.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(e)}</td>
            <td>${qt(i.seconds, e)}</td>
            <td>${pt(i.peak, e)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale;
    return L`
      <div class="status">
        <span class="badge">${tl(t.precision, t.boundary, e)}</span>
        ${ka(t.coverage, e) ? L`<span class="warn">${ka(t.coverage, e)}</span>` : k}
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${t.histogram.clipped_low_seconds + t.histogram.clipped_high_seconds > 0 ? L`<span class="warn">${r.load.histogramClipped}</span>` : k}
        ${this.renderConsistency(t.consistency.load, r.load.loadConsistency)}
        ${this.renderConsistency(t.consistency.pv, r.load.pvConsistency)}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      ${this.renderKpi(t)}

      <section>
        <header>
          <h2>${r.load.timeAtPowerLevel}</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? r.load.asPercentOfRated : r.load.inWatts}</button>
        </header>
        <ia-chart .option=${kb(t, this.mode, r)}></ia-chart>
      </section>

      <section>
        <h2>${r.load.durationCurve}</h2>
        <ia-chart .option=${Nb(t, r)}></ia-chart>
      </section>

      <section>
        <h2>${r.load.ratedBands}</h2>
        <ia-chart .option=${Bb(t, r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${r.load.overloadEpisodes}</h2>
        ${this.renderOverloads(t)}
      </section>

      ${t.phases ? L`<ia-phases-section
            .phases=${t.phases}
            .series=${t.series}
            .locale=${e}
          ></ia-phases-section>` : k}

      ${t.strings ? L`<ia-strings-section
            .strings=${t.strings}
            .series=${t.series}
            .locale=${e}
          ></ia-strings-section>` : k}
    `;
  }
};
Qe.styles = we`
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
Yr([
  it({ attribute: !1 })
], Qe.prototype, "hass", 2);
Yr([
  it({ type: String })
], Qe.prototype, "entryId", 2);
Yr([
  it({ type: String })
], Qe.prototype, "range", 2);
Yr([
  _t()
], Qe.prototype, "payload", 2);
Yr([
  _t()
], Qe.prototype, "error", 2);
Yr([
  _t()
], Qe.prototype, "loading", 2);
Yr([
  _t()
], Qe.prototype, "mode", 2);
Qe = Yr([
  ke("ia-load-tab")
], Qe);
var _P = Object.defineProperty, bP = Object.getOwnPropertyDescriptor, Fi = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? bP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && _P(t, e, n), n;
};
let br = class extends Gt {
  constructor() {
    super(...arguments), this.range = "year", this.loading = !1, this.i18n = new je(this), this.requestId = 0;
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
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await db(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderMonthTable(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = r.months.map((n) => n.key);
    return L`<table>
      <thead>
        <tr>
          <th>${t.seasonality.month}</th>
          <th>${t.seasonality.meanLoad}</th>
          <th>${t.seasonality.busiestHour}</th>
          ${r.has_pv ? L`<th>${t.seasonality.meanPv}</th>` : k}
          <th>${t.seasonality.ofTheMonth}</th>
        </tr>
      </thead>
      <tbody>
        ${r.months.map(
      (n, a) => L`<tr class=${n.complete ? "" : "partial"}>
            <td>${Cc(n.key, i[a - 1], t.charts.locale)}</td>
            <td>${pt(n.load_mean, e)}</td>
            <td>${pt(n.load_peak_hourly, e)}</td>
            ${r.has_pv ? L`<td>${pt(n.pv_mean, e)}</td>` : k}
            <td>${K(n.coverage, e)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale, i = ka(t.coverage, e), n = t.months.filter((o) => !o.complete && o.load_mean !== null), a = t.months.filter((o) => o.load_mean === null);
    return L`
      <div class="status">
        <span class="badge">${tl(t.precision, t.boundary, e)}</span>
        <span class="badge">${r.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      <section>
        <h2>${r.seasonality.meanByMonth}</h2>
        <ia-chart .option=${Gb(t.months, t.has_pv, r)}></ia-chart>
        ${n.length ? L`<p class="note">
              ${r.seasonality.thinMonths({
      n: n.length,
      share: K(t.incomplete_below, e)
    })}
              ${r.seasonality.partialNotLower}
            </p>` : k}
        ${a.length ? L`<p class="note">
              ${r.seasonality.absentMonths({ n: a.length })}
              ${r.seasonality.statisticsFromStart}
            </p>` : k}
      </section>

      <section>
        <h2>${r.seasonality.monthByMonth}</h2>
        ${this.renderMonthTable(t)}
        <p class="note">${r.seasonality.busiestHourNote}</p>
      </section>

      <section>
        <h2>${r.seasonality.meanByHour}</h2>
        <ia-chart .option=${Wb(t.hours, t.has_pv, r)}></ia-chart>
        <p class="note">${r.seasonality.byHourNote}</p>
      </section>

      <section>
        <h2>${r.seasonality.hourByMonth}</h2>
        <ia-chart
          .option=${Ub(t.cells, t.months, r)}
          height="420px"
        ></ia-chart>
        <p class="note">${r.seasonality.heatmapNote}</p>
      </section>
    `;
  }
};
br.styles = we`
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
Fi([
  it({ attribute: !1 })
], br.prototype, "hass", 2);
Fi([
  it({ type: String })
], br.prototype, "entryId", 2);
Fi([
  it({ type: String })
], br.prototype, "range", 2);
Fi([
  _t()
], br.prototype, "payload", 2);
Fi([
  _t()
], br.prototype, "error", 2);
Fi([
  _t()
], br.prototype, "loading", 2);
br = Fi([
  ke("ia-seasonality-tab")
], br);
function Ug(r, t) {
  switch (t) {
    case "enough":
      return r.verdict.enough;
    case "borderline":
      return r.verdict.borderline;
    case "short":
      return r.verdict.short;
    default:
      return r.verdict.none;
  }
}
function Yg(r, t, e) {
  return t === "battery" && e === "never_full" ? r.verdict.neverFull : r.verdict.noData[t];
}
function wP(r, t, e) {
  return t === "battery" && e === "never_full" ? r.verdict.hintNeverFilled : r.verdict.hintNoData;
}
var SP = Object.defineProperty, xP = Object.getOwnPropertyDescriptor, Hi = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? xP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && SP(t, e, n), n;
};
const TP = ["inverter", "battery", "solar"], Me = "—";
function CP(r, t) {
  const [e, i] = r.split("-").map(Number);
  return new Date(e, i - 1, 1).toLocaleDateString(t, {
    month: "short",
    year: "numeric"
  });
}
let wr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new je(this), this.requestId = 0;
  }
  willUpdate(r) {
    (r.has("entryId") || r.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const r = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: e } = kn(this.range, /* @__PURE__ */ new Date()), i = await yb(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = t;
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  /** The one figure a rule turned on, for a month cell. */
  cellFigure(r, t, e) {
    const i = this.i18n.m, n = t.evidence;
    return r === "inverter" ? i.sizing.hoursAtRated({ hours: `${n.hours_at_rated ?? 0}` }) : r === "battery" ? i.sizing.daysOf({
      days: `${n.days_full_and_low ?? 0}`,
      total: n.days_with_data ?? 0
    }) : n.production_share === null || n.production_share === void 0 ? Me : i.sizing.ofLoad({ share: K(n.production_share, e) });
  }
  renderEvidence(r, t, e, i) {
    const n = this.i18n.m, a = t.evidence, o = (l, u) => n.sizing.countOf({ count: `${l ?? Me}`, total: `${u ?? Me}` }), s = (l, u) => L`<span class="row"><span>${l}</span><span>${u}</span></span>`;
    return r === "inverter" ? L`
        ${s(n.sizing.hoursReachedRated, o(a.hours_at_rated, a.measured_hours))}
        ${s(
      n.sizing.hoursAboveOfRated({ share: K(e.high_load_share, i) }),
      `${a.hours_above_high ?? Me}`
    )}
        ${s(n.sizing.highestPeak, pt(a.peak_w ?? null, i))}
      ` : r === "battery" ? L`
        ${s(n.sizing.daysFilledAndLow, o(a.days_full_and_low, a.days_with_data))}
        ${s(n.sizing.daysLowWithoutFilling, `${a.days_low_without_full ?? Me}`)}
        ${s(n.sizing.daysFilled, `${a.days_full ?? Me}`)}
        ${s(
      n.sizing.lowestCharge,
      a.lowest_pct === null || a.lowest_pct === void 0 ? Me : K(a.lowest_pct / 100, i)
    )}
      ` : L`
      ${s(
      n.sizing.productionShare,
      a.production_share === null || a.production_share === void 0 ? Me : K(a.production_share, i)
    )}
      ${s(
      n.sizing.producedConsumed,
      `${Xt(a.pv_kwh ?? null, i)} / ${Xt(a.load_kwh ?? null, i)}`
    )}
      ${s(
      n.sizing.selfSufficiency,
      a.self_sufficiency === null || a.self_sufficiency === void 0 ? Me : K(a.self_sufficiency, i)
    )}
      ${s(
      n.sizing.daysBatteryFilled,
      a.fill_share === null || a.fill_share === void 0 ? Me : K(a.fill_share, i)
    )}
    `;
  }
  /**
   * The rule the verdict was read by, in the reader's own numbers.
   *
   * Takes the whole payload and not just the rules because the solar rule is
   * not the same rule on every installation: with no charge sensor mapped
   * there is no fill share, and printing the clause anyway would describe a
   * condition the verdict never tested.
   */
  ruleSentence(r, t, e) {
    const i = this.i18n.m, n = t.rules, a = (l) => K(l, e);
    if (r === "inverter")
      return i.sizing.inverterRule({
        shortShare: a(n.inverter_short_share),
        highShare: a(n.high_load_share),
        borderlineShare: a(n.inverter_borderline_share)
      });
    if (r === "battery")
      return i.sizing.batteryRule({
        full: a(n.full_pct / 100),
        low: a(n.low_pct / 100),
        share: a(n.battery_short_share)
      });
    const o = a(n.solar_enough_share), s = a(n.solar_borderline_share);
    return t.cards.battery.missing.length ? i.sizing.solarRule({ enough: o, borderline: s }) : i.sizing.solarRuleWithFill({ enough: o, fill: a(n.solar_fill_share), borderline: s });
  }
  /**
   * What the card is short of before any verdict can be read, or null.
   *
   * The configuration answers come in one order: a role that is not mapped,
   * then marks that cannot be told apart, then a sensor that keeps no
   * statistics. Each of them is something the reader can go and change, and
   * each makes the verdict below it meaningless, so they outrank it.
   */
  renderSetupNote(r, t) {
    const e = this.i18n.m, i = this.i18n.locale, n = t.cards[r];
    if (n.missing.length) {
      const a = n.missing.length === 1 && n.missing[0] === "rated_power", o = ny(e, n.missing);
      return L`<p class="note">
        ${a ? e.sizing.needsNotSet({ roles: o }) : e.sizing.needsNotMapped({ roles: o, n: n.missing.length })}
      </p>`;
    }
    if (n.thresholds_inverted)
      return L`<p class="note">
        ${e.sizing.thresholdsInverted({
        full: K(t.rules.full_pct / 100, i),
        low: K(t.rules.low_pct / 100, i)
      })}
      </p>`;
    if (n.no_statistics.length) {
      const a = n.no_statistics.length;
      return L`<p class="note">
        ${e.sizing.noStatisticsBefore({ sensors: n.no_statistics.join(", "), n: a })}
        <code>state_class</code> ${e.sizing.noStatisticsAfter({ n: a })}
      </p>`;
    }
    return null;
  }
  /**
   * How little of the period this card's own sensor was seen for, when that
   * is little. A verdict read from twelve days of a ninety-day window is a
   * verdict about twelve days, and a flat "Short" above the period selector
   * does not say so. Silent above the threshold: the ordinary case is a card
   * that saw the whole period, and a line saying so on every card is noise.
   * Silent at nothing at all, too: the withheld sentence above it has already
   * said there are no statistics, and "read from 0%" only repeats it.
   */
  renderCoverageNote(r, t) {
    if (r.coverage === 0 || r.coverage >= t.incomplete_below) return k;
    const e = this.i18n.locale;
    return L`<p class="note">
      ${this.i18n.m.sizing.readFrom({ share: hr(r.coverage, e) })}
    </p>`;
  }
  renderCard(r, t) {
    const e = this.i18n.m, i = this.i18n.locale, n = t.period[r], a = this.renderSetupNote(r, t);
    let o;
    return a !== null ? o = a : n === null ? o = L`<p class="note">${Yg(e, r, "no_data")}</p>` : n.verdict === null ? o = L`
        <p class="note">${Yg(e, r, n.reason ?? "no_data")}</p>
        ${this.renderCoverageNote(n, t)}
      ` : o = L`
        ${this.renderEvidence(r, n, t.rules, i)}
        ${this.renderCoverageNote(n, t)}
        ${n.note === "covers_but_battery_not_filling" ? L`<p class="note">
              ${e.sizing.batteryNotFilling({
      share: K(n.evidence.fill_share ?? 0, i)
    })}
            </p>` : k}
        <p class="note">${this.ruleSentence(r, t, i)}</p>
      `, L`<div class="card">
      <span class="name">${e.sizing.cards[r]}</span>
      <span class="value ${n?.verdict ?? "none"}"
        >${Ug(e, n?.verdict ?? null)}</span
      >
      ${o}
    </div>`;
  }
  renderMonths(r) {
    const t = this.i18n.m, e = this.i18n.locale, i = (n, a) => {
      const o = a[n];
      if (o === null || r.cards[n].no_statistics.length)
        return L`<td class="none">${Me}</td>`;
      const s = a.complete && o.coverage < r.incomplete_below;
      return L`<td class=${o.verdict ?? "none"}>
        ${Ug(t, o.verdict)}
        ${o.verdict === null ? (
        // Why there is no verdict: a month the battery never filled is the
        // rule working, a month with no statistics is missing data, and
        // "No verdict" alone reads the same for both.
        L`<span class="hint">${wP(t, n, o.reason ?? "no_data")}</span>`
      ) : L`<span class="hint">${this.cellFigure(n, o, e)}</span>`}
        ${s ? L`<span class="hint"
              >${t.sizing.cellCoverage({ share: hr(o.coverage, e) })}</span
            >` : k}
      </td>`;
    };
    return r.months.length ? L`<table>
      <thead>
        <tr>
          <th>${t.seasonality.month}</th>
          <th>${t.sizing.parts.inverter}</th>
          <th>${t.sizing.parts.battery}</th>
          <th>${t.sizing.parts.solar}</th>
        </tr>
      </thead>
      <tbody>
        ${r.months.map(
      (n) => L`<tr class=${n.complete ? "" : "partial"}>
            <td>
              ${CP(n.key, e)}
              ${n.coverage === 0 ? L`<span class="hint">${t.verdict.hintNoData}</span>` : n.complete ? k : L`<span class="hint"
                      >${t.sizing.ofTheMonth({
        share: hr(n.coverage, e)
      })}</span
                    >`}
            </td>
            ${i("inverter", n)} ${i("battery", n)} ${i("solar", n)}
          </tr>`
    )}
      </tbody>
    </table>` : L`<p class="empty">${t.sizing.noMonths}</p>`;
  }
  render() {
    const r = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${r.common.couldNotLoadData({ error: Ei(this.error, r) })}
        <button @click=${() => this.load()}>${r.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${r.common.computing}</div>`;
    const t = this.payload, e = this.i18n.locale, i = (n) => r.sizing.ruleLine({
      part: r.sizing.parts[n],
      rule: this.ruleSentence(n, t, e)
    });
    return L`
      <div class="status">
        <span class="badge">${r.balance.hourlyStatistics}</span>
        <span class="badge">${r.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${t.clamped ? L`<span class="warn">${r.common.periodShortened}</span>` : k}
        ${!t.covers_whole_window && t.covered_end ? L`<span class="warn"
              >${r.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(e)
    })}</span
            >` : k}
        ${t.covered_end ? k : L`<span class="warn">${r.sizing.noStatistics}</span>`}
        ${this.loading ? L`<span class="warn">${r.common.refreshing}</span>` : k}
      </div>

      <section>
        <div class="cards">${TP.map((n) => this.renderCard(n, t))}</div>
      </section>

      <section>
        <h2>${r.seasonality.monthByMonth}</h2>
        ${this.renderMonths(t)}
        <p class="note">
          ${r.sizing.greyMonths({ share: K(t.incomplete_below, e) })}
        </p>
      </section>

      <section>
        <h2>${r.sizing.howVerdictsRead}</h2>
        <p class="note">${i("inverter")}</p>
        <p class="note">${i("battery")}</p>
        <p class="note">${i("solar")}</p>
        <p class="note">${r.sizing.hourlyNotMean}</p>
      </section>
    `;
  }
};
wr.styles = [
  co,
  we`
      :host {
        display: block;
      }
      .status {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .badge {
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        padding: 2px 10px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .card .value.enough,
      td.enough {
        color: var(--success-color, #2fa84f);
      }
      .card .value.borderline,
      td.borderline {
        color: var(--warning-color, #f7b32b);
      }
      .card .value.short,
      td.short {
        color: var(--error-color, #d64545);
      }
      .card .value.none,
      td.none {
        color: var(--secondary-text-color);
      }
      td .hint {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 400;
      }
      td.enough,
      td.borderline,
      td.short {
        font-weight: 500;
      }
      tr.partial td {
        color: var(--secondary-text-color);
      }
      .notice {
        padding: 24px;
        color: var(--secondary-text-color);
      }
      code {
        font-size: 12px;
      }
      button {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font: inherit;
      }
    `
];
Hi([
  it({ attribute: !1 })
], wr.prototype, "hass", 2);
Hi([
  it({ type: String })
], wr.prototype, "entryId", 2);
Hi([
  it({ type: String })
], wr.prototype, "range", 2);
Hi([
  _t()
], wr.prototype, "payload", 2);
Hi([
  _t()
], wr.prototype, "error", 2);
Hi([
  _t()
], wr.prototype, "loading", 2);
wr = Hi([
  ke("ia-sizing-tab")
], wr);
var MP = Object.defineProperty, DP = Object.getOwnPropertyDescriptor, Tr = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? DP(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && MP(t, e, n), n;
};
const AP = "/inverter-analytics", Xg = ["load", "battery", "seasonal", "balance", "grid", "sizing"];
let Ee = class extends Gt {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.i18n = new je(this), this.readLocation = () => {
      const r = Pb(
        window.location.pathname,
        window.location.search,
        Xg,
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = r.tab, this.range = r.range, this.entryId = r.entryId;
    }, this.loadConfig = Ib(() => this.requestConfig());
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.hass && this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  willUpdate(r) {
    r.has("hass") && Mb(this.hass?.locale?.language), r.has("hass") && this.hass && !this.config && this.error === void 0 && this.loadConfig();
  }
  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  writeLocation(r = !1) {
    const t = $b(AP, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    r ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await cb(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
    } catch (r) {
      this.error = r === void 0 ? String(r) : r;
    }
  }
  get entry() {
    return this.config?.entries.find((r) => r.entry_id === this.entryId);
  }
  /**
   * What the backend says about one tab. A tab with no feature of its own is
   * treated as available: the panel must not hide a tab because a version of
   * the integration older than the tab had nothing to say about it.
   */
  feature(r) {
    return this.entry?.features?.find((t) => t.key === r);
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
    const r = this.i18n.m;
    return this.error !== void 0 ? L`<div class="notice">
        ${r.panel.couldNotLoad({ error: Ei(this.error, r) })}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          ${r.common.tryAgain}
        </button>
      </div>` : this.config ? this.config.entries.length ? L`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1 ? L`<select
              @change=${(t) => {
      this.selectEntry(t.target.value);
    }}
            >
              ${this.config.entries.map(
      // ?selected on the option, not .value on the select: Lit sets
      // properties before the children exist, so on first render the
      // assignment lands on an empty select and the browser falls
      // back to the first entry. The page then showed one inverter's
      // data under another inverter's name.
      (t) => L`<option
                  value=${t.entry_id}
                  ?selected=${t.entry_id === this.entryId}
                >
                  ${t.title}
                </option>`
    )}
            </select>` : k}
        <div class="langs" role="group" aria-label=${r.panel.language}>
          ${bb.map(
      (t) => L`<button
              class=${t === this.i18n.lang ? "active" : ""}
              @click=${() => Cb(t)}
            >${t.toUpperCase()}</button>`
    )}
        </div>
        <div class="ranges">
          ${iy.map(
      (t) => L`<button
              class=${t === this.range ? "active" : ""}
              @click=${() => this.selectRange(t)}
            >${Lb(r, t)}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${Xg.map((t) => {
      const e = this.feature(t)?.available === !1;
      return L`<button
            class="${t === this.tab ? "active" : ""} ${e ? "muted" : ""}"
            @click=${() => this.selectTab(t)}
          >${r.panel.tabs[t]}</button>`;
    })}
      </nav>

      <main>
        ${this.renderTab()}
      </main>
    ` : L`<div class="notice">
        ${r.panel.noInverter}
      </div>` : L`<div class="notice">${r.panel.loading}</div>`;
  }
  /**
   * The tab, or an explanation of why it cannot be drawn.
   *
   * "No data" and "you have not told me which sensor that is" are different
   * statements, and the page used to make only the first of them: asking for
   * battery analytics from an inverter with no state-of-charge sensor mapped
   * answered with the words "battery_soc is not configured" under the heading
   * "Could not load data", which reads as a fault rather than as a setting.
   */
  renderTab() {
    const r = this.i18n.m, t = this.feature(this.tab);
    if (t && !t.available) {
      const e = {
        feature: r.features[t.key] ?? t.label,
        roles: ny(r, t.missing)
      };
      return L`<div class="notice">
        <p>
          ${t.missing.length === 1 ? r.panel.missingOne(e) : r.panel.missingMany(e)}
        </p>
        <p>
          ${r.panel.reconfigureBefore}<strong>${r.panel.reconfigure}</strong>${r.panel.reconfigureAfter}
        </p>
        <a href=${Eb}>${r.panel.goToSettings}</a>
      </div>`;
    }
    return L`
        ${this.tab === "load" ? L`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : k}
        ${this.tab === "battery" ? L`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>` : k}
        ${this.tab === "seasonal" ? L`<ia-seasonality-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-seasonality-tab>` : k}
        ${this.tab === "balance" ? L`<ia-balance-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-balance-tab>` : k}
        ${this.tab === "grid" ? L`<ia-grid-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-grid-tab>` : k}
        ${this.tab === "sizing" ? L`<ia-sizing-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-sizing-tab>` : k}
    `;
  }
};
Ee.styles = we`
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
    .langs { display: flex; gap: 4px; margin-left: auto; }
    .ranges { display: flex; gap: 4px; flex-wrap: wrap; }
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
    button.muted { color: var(--secondary-text-color); border-style: dashed; }
    button.muted.active { color: var(--primary-color); }
    .notice { padding: 24px; color: var(--secondary-text-color); max-width: 60ch; }
    .notice p { margin: 0 0 12px; }
    .notice a { color: var(--primary-color); }
    select {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 8px;
      font: inherit;
    }
  `;
Tr([
  it({ attribute: !1 })
], Ee.prototype, "hass", 2);
Tr([
  it({ type: Boolean })
], Ee.prototype, "narrow", 2);
Tr([
  it({ attribute: !1 })
], Ee.prototype, "route", 2);
Tr([
  _t()
], Ee.prototype, "config", 2);
Tr([
  _t()
], Ee.prototype, "error", 2);
Tr([
  _t()
], Ee.prototype, "entryId", 2);
Tr([
  _t()
], Ee.prototype, "tab", 2);
Tr([
  _t()
], Ee.prototype, "range", 2);
Ee = Tr([
  ke("inverter-analytics-panel")
], Ee);
export {
  Ee as InverterAnalyticsPanel
};

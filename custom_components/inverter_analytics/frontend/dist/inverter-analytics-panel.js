/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const is = globalThis, _c = is.ShadowRoot && (is.ShadyCSS === void 0 || is.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bc = Symbol(), Ef = /* @__PURE__ */ new WeakMap();
let Kg = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== bc) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (_c && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = Ef.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ef.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const G0 = (e) => new Kg(typeof e == "string" ? e : e + "", void 0, bc), we = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new Kg(r, e, bc);
}, W0 = (e, t) => {
  if (_c) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = is.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, kf = _c ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return G0(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: U0, defineProperty: Y0, getOwnPropertyDescriptor: X0, getOwnPropertyNames: q0, getOwnPropertySymbols: Z0, getPrototypeOf: K0 } = Object, Qs = globalThis, Nf = Qs.trustedTypes, j0 = Nf ? Nf.emptyScript : "", Q0 = Qs.reactiveElementPolyfillSupport, wa = (e, t) => e, ws = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? j0 : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, wc = (e, t) => !U0(e, t), Bf = { attribute: !0, type: String, converter: ws, reflect: !1, useDefault: !1, hasChanged: wc };
Symbol.metadata ??= Symbol("metadata"), Qs.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let sn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Bf) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && Y0(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: a } = X0(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
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
    if (this.hasOwnProperty(wa("elementProperties"))) return;
    const t = K0(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(wa("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(wa("properties"))) {
      const r = this.properties, i = [...q0(r), ...Z0(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) r.unshift(kf(n));
    } else t !== void 0 && r.push(kf(t));
    return r;
  }
  static _$Eu(t, r) {
    const i = r.attribute;
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
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return W0(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, i) {
    this._$AK(t, i);
  }
  _$ET(t, r) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : ws).toAttribute(r, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ws;
      this._$Em = n;
      const s = o.fromAttribute(r, a.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, i, n = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? wc)(a, r) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: i, reflect: n, wrapped: a }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (r = void 0), this._$AL.set(t, r)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
sn.elementStyles = [], sn.shadowRootOptions = { mode: "open" }, sn[wa("elementProperties")] = /* @__PURE__ */ new Map(), sn[wa("finalized")] = /* @__PURE__ */ new Map(), Q0?.({ ReactiveElement: sn }), (Qs.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sc = globalThis, zf = (e) => e, Ss = Sc.trustedTypes, Ff = Ss ? Ss.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jg = "$lit$", Nr = `lit$${Math.random().toFixed(9).slice(2)}$`, Qg = "?" + Nr, J0 = `<${Qg}>`, Ii = document, Oa = () => Ii.createComment(""), Ea = (e) => e === null || typeof e != "object" && typeof e != "function", xc = Array.isArray, tb = (e) => xc(e) || typeof e?.[Symbol.iterator] == "function", Bl = `[ 	
\f\r]`, Wn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Hf = /-->/g, Vf = />/g, Zr = RegExp(`>|${Bl}(?:([^\\s"'>=/]+)(${Bl}*=${Bl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gf = /'/g, Wf = /"/g, Jg = /^(?:script|style|textarea|title)$/i, eb = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), L = eb(1), Tn = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Uf = /* @__PURE__ */ new WeakMap(), wi = Ii.createTreeWalker(Ii, 129);
function ty(e, t) {
  if (!xc(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ff !== void 0 ? Ff.createHTML(t) : t;
}
const rb = (e, t) => {
  const r = e.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Wn;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, h, c = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, h = o.exec(l), h !== null); ) v = o.lastIndex, o === Wn ? h[1] === "!--" ? o = Hf : h[1] !== void 0 ? o = Vf : h[2] !== void 0 ? (Jg.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Zr) : h[3] !== void 0 && (o = Zr) : o === Zr ? h[0] === ">" ? (o = n ?? Wn, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Zr : h[3] === '"' ? Wf : Gf) : o === Wf || o === Gf ? o = Zr : o === Hf || o === Vf ? o = Wn : (o = Zr, n = void 0);
    const f = o === Zr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === Wn ? l + J0 : c >= 0 ? (i.push(u), l.slice(0, c) + jg + l.slice(c) + Nr + f) : l + Nr + (c === -2 ? s : f);
  }
  return [ty(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ka {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = rb(t, r);
    if (this.el = ka.createElement(u, i), wi.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = wi.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(jg)) {
          const v = h[o++], f = n.getAttribute(c).split(Nr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: f, ctor: d[1] === "." ? nb : d[1] === "?" ? ab : d[1] === "@" ? ob : Js }), n.removeAttribute(c);
        } else c.startsWith(Nr) && (l.push({ type: 6, index: a }), n.removeAttribute(c));
        if (Jg.test(n.tagName)) {
          const c = n.textContent.split(Nr), v = c.length - 1;
          if (v > 0) {
            n.textContent = Ss ? Ss.emptyScript : "";
            for (let f = 0; f < v; f++) n.append(c[f], Oa()), wi.nextNode(), l.push({ type: 2, index: ++a });
            n.append(c[v], Oa());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Qg) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(Nr, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += Nr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const i = Ii.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Cn(e, t, r = e, i) {
  if (t === Tn) return t;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const a = Ea(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (t = Cn(e, n._$AS(e, t.values), n, i)), t;
}
class ib {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: i } = this._$AD, n = (t?.creationScope ?? Ii).importNode(r, !0);
    wi.currentNode = n;
    let a = wi.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new io(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new sb(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = wi.nextNode(), o++);
    }
    return wi.currentNode = Ii, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class io {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = Cn(this, t, r), Ea(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== Tn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : tb(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && Ea(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ii.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ka.createElement(ty(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const a = new ib(n, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = Uf.get(t.strings);
    return r === void 0 && Uf.set(t.strings, r = new ka(t)), r;
  }
  k(t) {
    xc(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const a of t) n === r.length ? r.push(i = new io(this.O(Oa()), this.O(Oa()), this, this.options)) : i = r[n], i._$AI(a), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const i = zf(t).nextSibling;
      zf(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Js {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, a) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = k;
  }
  _$AI(t, r = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Cn(this, t, r, 0), o = !Ea(t) || t !== this._$AH && t !== Tn, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Cn(this, s[i + l], r, l), u === Tn && (u = this._$AH[l]), o ||= !Ea(u) || u !== this._$AH[l], u === k ? t = k : t !== k && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class nb extends Js {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class ab extends Js {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class ob extends Js {
  constructor(t, r, i, n, a) {
    super(t, r, i, n, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Cn(this, t, r, 0) ?? k) === Tn) return;
    const i = this._$AH, n = t === k && i !== k || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== k && (i === k || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class sb {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Cn(this, t);
  }
}
const lb = Sc.litHtmlPolyfillSupport;
lb?.(ka, io), (Sc.litHtmlVersions ??= []).push("3.3.3");
const ub = (e, t, r) => {
  const i = r?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = r?.renderBefore ?? null;
    i._$litPart$ = n = new io(t.insertBefore(Oa(), a), a, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tc = globalThis;
class Gt extends sn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ub(r, this.renderRoot, this.renderOptions);
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
Gt._$litElement$ = !0, Gt.finalized = !0, Tc.litElementHydrateSupport?.({ LitElement: Gt });
const hb = Tc.litElementPolyfillSupport;
hb?.({ LitElement: Gt });
(Tc.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cb = { attribute: !0, type: String, converter: ws, reflect: !1, hasChanged: wc }, fb = (e = cb, t, r) => {
  const { kind: i, metadata: n } = r;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(r.name, e), i === "accessor") {
    const { name: o } = r;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(o, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, e, s), s;
    } };
  }
  if (i === "setter") {
    const { name: o } = r;
    return function(s) {
      const l = this[o];
      t.call(this, s), this.requestUpdate(o, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function it(e) {
  return (t, r) => typeof r == "object" ? fb(e, t, r) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(e) {
  return it({ ...e, state: !0, attribute: !1 });
}
function vb(e) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function db(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
function pb(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
function gb(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/seasonality",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
function yb(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/balance",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
function mb(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/grid",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
function _b(e, t, r, i) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/sizing",
    entry_id: t,
    start: r.toISOString(),
    end: i.toISOString()
  });
}
const Yf = /* @__PURE__ */ new Map();
function bb(e) {
  let t = Yf.get(e);
  return t || (t = new Intl.PluralRules(e), Yf.set(e, t)), t;
}
function Ft(e, t, r) {
  const i = bb(e).select(t);
  return i === "one" ? r.one : i === "few" ? r.few ?? r.other : i === "many" ? r.many ?? r.other : r.other;
}
const wb = {
  common: {
    and: "and",
    // One name inside a list, set off the way the language sets off a name it
    // quotes: English leaves a role name bare, Ukrainian puts it in «».
    quoted: (e) => e.text,
    // The words every tab shares: its error notice, its status line, the
    // first columns of its episode tables.
    couldNotLoadData: (e) => `Could not load data: ${e.error}`,
    tryAgain: "Try again",
    computing: "Computing…",
    refreshing: "Refreshing…",
    periodShortened: "Period shortened to the maximum allowed",
    start: "Start",
    duration: "Duration",
    peak: "Peak",
    coversOfPeriod: (e) => `Covers ${e.share} of the period`,
    meanLoad: "Mean load",
    selfSufficiency: "Self-sufficiency"
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
    couldNotLoad: (e) => `Could not load configuration: ${e.error}`,
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
    // Role names reach every sentence already set off by common.quoted, one
    // by one: the caller quotes, no dictionary function adds its own quotes.
    missingOne: (e) => `${e.feature} needs ${e.roles}, and it is not mapped to this inverter. Nothing here is broken and there is no data missing — this page has simply not been told which of your sensors that is.`,
    missingMany: (e) => `${e.feature} needs ${e.roles}, and none of them are mapped to this inverter. Nothing here is broken and there is no data missing — this page has simply not been told which of your sensors those are.`,
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
    mixedSince: (e) => `Mixed since ${e.date}`,
    noData: "No data for this period",
    coversUnderOnePercent: "Data covers less than 1% of the period",
    coversOnly: (e) => `Data covers only ${e.share} of the period`
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
    // Battery reason "never_full" when full is the battery's own charge limit.
    neverReachedLimit: "The battery never reached its charge limit in this span, so the nights say nothing about its size.",
    hintLimitNotReached: "limit not reached",
    hintNoData: "no data",
    // Solar reason "no_fill": a no-export system whose sun is read from days
    // the battery was full, with no charge data in the span. It names neither
    // the limit nor the mark, so it reads true in both full modes.
    noFill: "With no export the sun is read from how often the battery filled, and there is no charge data for this span.",
    hintNoFill: "no charge data"
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
    hoursWithoutGrid: (e) => `${e.hours} h without grid`,
    outagesBegan: (e) => e.n === 0 ? "no outages began" : Ft("en", e.n, {
      one: `${e.n} outage began`,
      other: `${e.n} outages began`
    })
  },
  load: {
    // A total and its parts that disagree. Two sentences rather than one with
    // the subject slotted in: in Ukrainian the subject's gender changes the words around it.
    loadConsistency: (e) => `Total load averages ${e.total} while the phases add up to ${e.partsTotal}. Is one of them mapped to the wrong sensor?`,
    pvConsistency: (e) => `Total PV power averages ${e.total} while the strings add up to ${e.partsTotal}. Is one of them mapped to the wrong sensor?`,
    histogramClipped: "Some values fell outside the histogram range and are shown in its edge buckets",
    mean: "Mean",
    median: "Median",
    sustained15m: "Sustained 15 min",
    above80OfRated: ">80% of rated",
    ofTime: "of time",
    shareOfRated: (e) => `${e.share} of rated`,
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
    below: (e) => `Below ${e.level}`,
    dips: "Dips",
    lastingOverMinute: "lasting over a minute",
    meanLowPoint: "Mean low point",
    acrossThoseDips: "across those dips",
    dipsNotMeasurable: 'This period is covered only by hourly averages, which record the mean charge across each hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips cannot be counted at all — an empty table would read as "none happened". Pick a shorter period to see them.',
    noEpisodes: (e) => `The charge never stayed below ${e.level} for more than a minute in this period.`,
    lowest: "Lowest",
    recoveredTo: "Recovered to",
    dipsCountedFrom: (e) => `Dips counted from ${e.date}, where exact data begins`,
    timeAtSoc: "Time spent at each state of charge",
    chargeBands: "Distribution across charge bands",
    lowChargeEpisodes: "Low-charge episodes",
    // The heading itself is sections.charge.title, shared with the section.
    mapPowerSensor: "Map a battery power sensor in the integration's options to see how much moves in and out, and how much of the time the battery is working."
  },
  seasonality: {
    monthsIn: (e) => `Months in ${e.timezone}`,
    meanByMonth: "Mean power by month",
    // A thin month still has a bar; an absent one has none. Counted apart, so
    // one sentence never says nine months are grey when one of them is.
    thinMonths: (e) => Ft("en", e.n, {
      one: `One month is covered by less than ${e.share} of its days and is drawn in grey.`,
      other: `${e.n} months are covered by less than ${e.share} of their days and are drawn in grey.`
    }),
    partialNotLower: "A month the recorder only saw part of is not a lower month; the figures stand, the comparison does not.",
    absentMonths: (e) => Ft("en", e.n, {
      one: "One month has no recorded data at all and carries no bar.",
      other: `${e.n} months have no recorded data at all and carry no bar.`
    }),
    statisticsFromStart: "Home Assistant keeps long-term statistics only from the moment a sensor starts producing them.",
    monthByMonth: "Month by month",
    month: "Month",
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
    daysIn: (e) => `Days in ${e.timezone}`,
    countedUpTo: (e) => `Counted up to ${e.time}`,
    noEnergyStatistics: "No energy statistics in this period",
    intoSystem: "into the system",
    outOfIt: "out of it",
    inAgainstOut: "In against out",
    needsAllSix: (e) => `The books can only be closed with all six counters mapped. Missing: ${e.missing}. Until then the difference between the two bars would measure what is not mapped rather than what was lost.`,
    // The balance line, split around the <strong> amount the template holds.
    // Unaccounted and more-out are two endings, not a word slot.
    inOut: (e) => `In ${e.in}, out ${e.out} —`,
    unaccountedFor: (e) => `unaccounted for (${e.share}).`,
    moreOutThanIn: (e) => `more out than in (${e.share}).`,
    unaccountedNote: "Conversion and battery round-trip losses live in this figure, and so does every disagreement between the six meters. It is called unaccounted rather than losses because nothing here can tell heat in the inverter from error in a clamp.",
    ratiosTitle: "Self-sufficiency and self-consumption",
    ratiosNeedCounters: "Self-sufficiency needs the house and grid-import counters; self-consumption needs solar and grid export.",
    selfConsumption: "Self-consumption",
    dayByDay: "Day by day",
    noDays: "No days with energy statistics in this period.",
    dayByDayNote: "Two bars a day: what came in, and what went out. Adding the two together would count the same energy twice. Energy is read from Home Assistant's hourly statistics, which is where counter resets are already accounted for. The current hour is compiled only once it ends, so a period running up to now stops at the last completed hour."
  },
  grid: {
    outages: "Outages",
    withoutGrid: "Without grid",
    unrecordedAssumedOff: (e) => `+ ${e.duration} unrecorded, assumed off`,
    shareOfTime: "Share of time",
    ofMeasuredTime: "of measured time",
    longest: "Longest",
    fromTime: (e) => `from ${e.time}`,
    meanDuration: "Mean duration",
    briefInterruptions: "Brief interruptions",
    underAMinute: "under a minute",
    // An outage cut by the window's start or still going is longer than seen.
    atLeast: (e) => `at least ${e.duration}`,
    noOutages: (e) => `No outages in this period — none in ${e.duration} of measurement.`,
    chargeAtStart: "Charge at start",
    lowest: "Lowest",
    atEnd: "At end",
    unrecorded: (e) => `(${e.duration} unrecorded)`,
    noAutonomy: "No autonomy estimate.",
    // Keyed by AutonomyReason; the one with a figure is a function.
    autonomyReasons: {
      no_soc: "It needs the battery's state of charge, which is not mapped to this inverter.",
      no_outages: "There were no outages in this period to read a discharge rate from.",
      no_soc_in_outages: "The battery's charge was not recorded during any of this period's outages, so there is no discharge to read a rate from.",
      no_net_discharge: "The charge did not fall during this period's outages — the sun covered them — so there is no discharge rate to read."
    },
    tooLittleEvidence: (e) => `The charge spent ${e.hours} falling to the lowest point of each outage, and an estimate needs at least an hour.`,
    fromFullTo: (e) => `From full to ${e.level}`,
    fromNow: "From where it is now",
    chargeNow: "Charge now",
    dischargeRate: "Discharge rate",
    pointsPerHour: (e) => `${e.rate} pts/h`,
    evidenceNote: (e) => `At the rate seen during this period's outages, over the ${e.hours} the charge spent falling to each one's lowest point. Whether a summer afternoon's outage says anything about a winter evening's is for the reader to judge; the mean load beside it is there to help.`,
    hoursLeft: "Hours left",
    neededAtStart: "Needed at start",
    didNotLast: "did not last",
    moreThanFull: "more than a full battery",
    // Keyed by ReserveReason.
    reserveReasons: {
      no_soc: "no charge data",
      cut: "cut by the period",
      no_net_discharge: "sun covered it",
      too_short: "too short to judge"
    },
    hardestOutageNeeds: "Hardest outage needs",
    hardestOutageOn: (e) => `Outage of ${e.date}`,
    noHardestOutage: "No outage long enough to judge",
    outagesCovered: "Outages covered",
    coveredOf: (e) => `${e.covered} of ${e.judged}`,
    coveredHint: (e) => `Never below ${e.level}`,
    reserveNote: "Hours left are read from the lowest point of each outage, at the rate the charge fell to reach it, and the charge needed is the low mark plus that fall. Both depend on the hour and the load: a daytime outage says little about a night one.",
    // Why counting starts late: two whole sentences rather than a clause slot.
    countedFromInferred: (e) => `Outages counted from ${e.date} — earlier history is only hourly averages, which cannot say when inside an hour the grid was gone`,
    countedFromNoHistory: (e) => `Outages counted from ${e.date} — the recorder keeps no earlier history of this sensor`,
    inferredBanner: "Inferred from power flows, not measured. A night the battery carries the house with nothing crossing the grid connection looks exactly like an outage, and a daytime outage the sun covers is not seen at all. Map a sensor that reports grid presence to measure instead.",
    hoursByDay: "Hours without grid, by day",
    noDaysWithData: "No days with data in this period.",
    missingDays: (e) => Ft("en", e.n, {
      one: `${e.n} day in this period had no data and is not drawn.`,
      other: `${e.n} days in this period had no data and are not drawn.`
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
    hoursAtRated: (e) => `${e.hours} h at rated`,
    // The total is a number so a language can inflect "days" by it.
    daysOf: (e) => `${e.days} of ${e.total} days`,
    ofLoad: (e) => `${e.share} of load`,
    // The evidence rows of each card.
    countOf: (e) => `${e.count} of ${e.total}`,
    hoursReachedRated: "Hours the load reached rated power",
    hoursAboveOfRated: (e) => `Hours above ${e.share} of rated`,
    highestPeak: "Highest hourly peak",
    daysFilledAndLow: "Days it filled, and still hit the low mark",
    daysLowWithoutFilling: "Days it hit the low mark without filling",
    daysFilled: "Days it filled",
    lowestCharge: "Lowest charge",
    productionShare: "Production as a share of consumption",
    producedConsumed: "Produced / consumed",
    daysBatteryFilled: "Days the battery filled",
    // The rule each verdict was read by, in the reader's own numbers, saying
    // exactly what sizing.py tests: "reaching" is >=, "fell below" is <. With no
    // charge sensor mapped the solar rule has no fill clause, and is a
    // sentence of its own rather than one with a hole in it.
    inverterRule: (e) => `Short when the load reached rated power in more than ${e.shortShare} of hours; borderline on any such hour, or reaching ${e.highShare} of rated in more than ${e.borderlineShare} of hours.`,
    batteryRule: (e) => `Counted over days with data: short when the battery filled to ${e.full} and still fell below ${e.low} on at least ${e.share} of them; borderline when it happened at all; no verdict for a span in which it never filled. A day it ran low without filling counts against the sun, not the battery.`,
    // The battery rule when "full" is the battery's own charge limit.
    batteryRuleCeiling: (e) => `Counted over days with data: short when the battery reached its charge limit with the sun up and still fell below ${e.low} on at least ${e.share} of them; borderline when it happened at all; no verdict for a span in which it never reached its limit. A day it ran low without reaching it counts against the sun, not the battery.`,
    solarRuleWithFill: (e) => `Enough when production is at least ${e.enough} of consumption and the battery filled on at least ${e.fill} of days; borderline from ${e.borderline} of consumption; short below.`,
    solarRule: (e) => `Enough when production is at least ${e.enough} of consumption; borderline from ${e.borderline} of consumption; short below.`,
    // The Sun rule of a system that kept its production in.
    solarRuleNoExport: (e) => `With no export, production cannot pass consumption, so the sun is read from the battery: enough when it reached its charge limit with the sun up on at least ${e.fill} of days; borderline from ${e.borderlineFill} of days, or from ${e.borderline} of consumption; short below.`,
    // The same rule when full is the fixed mark from the options.
    solarRuleNoExportFixed: (e) => `With no export, production cannot pass consumption, so the sun is read from the battery: enough when it reached ${e.full} on at least ${e.fill} of days; borderline from ${e.borderlineFill} of days, or from ${e.borderline} of consumption; short below.`,
    // Which "full" the battery and Sun verdicts were read by.
    fullModeCeiling: "Full means the battery reached its own charge limit: the inverter stopped charging while the sun was up. A limit set below 100% for the summer still counts.",
    // The fixed mark, and why it was read: the roles to map, or the mapped
    // roles that kept no statistics. The roles arrive set off by
    // common.quoted; the count lets a language agree with one or several.
    fullModeFixed: (e) => `Full means a charge of at least ${e.full}. Map ${e.roles} to read the battery's own limit instead.`,
    fullModeNoRows: (e) => `${e.roles} ${e.n === 1 ? "keeps" : "keep"} no statistics for this period, so full is the fixed mark of ${e.full}.`,
    fullModePlain: (e) => `Full means a charge of at least ${e.full}.`,
    // What a card is short of before a verdict can be read. Rated power is a
    // number in the options, not an entity, so it is "not set", not "not
    // mapped"; the count lets a language agree with one role or several.
    // Both get their roles already set off by common.quoted, one by one, so
    // a language that quotes names quotes every name in a list.
    needsNotSet: (e) => `Needs ${e.roles}, which is not set for this inverter.`,
    needsNotMapped: (e) => `Needs ${e.roles}, not mapped to this inverter.`,
    thresholdsInverted: (e) => `The full mark (${e.full}) is at or below the low mark (${e.low}), so no day can be judged. Raise Full battery charge or lower Low battery charge in the integration's options.`,
    // Split around the <code>state_class</code> the template holds.
    noStatisticsBefore: (e) => `${e.sensors} keeps no long-term statistics — it has no`,
    noStatisticsAfter: (e) => "— so this card cannot be read from it.",
    readFrom: (e) => `Read from ${e.share} of the period.`,
    batteryNotFilling: (e) => `Production covers the load, but the battery filled on only ${e.share} of days — export by day and import by night.`,
    cellCoverage: (e) => `from ${e.share}`,
    noMonths: "No month falls inside this period.",
    ofTheMonth: (e) => `from ${e.share} of the month`,
    statisticsCoverUpTo: (e) => `Statistics cover up to ${e.time}`,
    noStatistics: "No statistics in this period",
    greyMonths: (e) => `A month drawn in grey was seen for less than ${e.share} of its length; its verdict stands on that part alone. The first and last months of a period are almost always partial.`,
    howVerdictsRead: "How the verdicts are read",
    ruleLine: (e) => `${e.part} — ${e.rule}`,
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
      driftBelow: (e) => `The charge ended ${e.n} ${Ft("en", e.n, { one: "point", other: "points" })} below where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      driftAbove: (e) => `The charge ended ${e.n} ${Ft("en", e.n, { one: "point", other: "points" })} above where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      tooLittle: "There was too little charging and discharging to divide one by the other."
    },
    phases: {
      title: "Phases",
      positional: (e) => `Phase ${e.n}`,
      shareOfLoad: "Share of load",
      peakVs: (e) => `Peak vs ${e.rating}`,
      neverAboveFloor: (e) => `Total load never rose above ${e.floor}, so there was nothing to measure the spread against in this period.`,
      meanImbalance: "Mean imbalance",
      p95Imbalance: "P95 imbalance",
      above: (e) => `Above ${e.threshold}`,
      ofMeasuredTime: "of the measured time",
      measuredOver: (e) => `Measured over ${e.duration} (${e.share} of the period).`,
      belowFloorExcluded: (e) => `A further ${e.duration} sat below ${e.floor} of total load and is excluded: at standby power a few watts of difference is a large percentage and means nothing.`,
      noSustained: "No sustained imbalance in this period.",
      worst: "Worst",
      derivedRating: (e) => `No per-phase rating is configured, so the total is split across ${e.n} ${Ft("en", e.n, { one: "phase", other: "phases" })} — ${e.rating} each. Set the real figure in the integration's options if the hardware differs.`,
      alignedLow: (e) => `All phases had data at the same moment for only ${e.share} of the period. The spread cannot be measured while any one phase is unknown.`,
      imbalance: "Imbalance",
      sustainedEpisodes: "Sustained imbalance episodes"
    },
    strings: {
      title: "PV strings",
      positional: (e) => `String ${e.n}`,
      shareOfPv: "Share of PV",
      alignedLow: (e) => `All strings had data at the same moment for only ${e.share} of the period, so the shares are of that time rather than the whole window.`,
      compare: "A string consistently below its neighbour points at shading, a different orientation or a fault. Compare mean rather than peak: peaks coincide, averages do not."
    }
  }
}, Sb = {
  common: {
    and: "і",
    quoted: (e) => `«${e.text}»`,
    couldNotLoadData: (e) => `Не вдалося завантажити дані: ${e.error}`,
    tryAgain: "Спробувати ще раз",
    computing: "Обчислення…",
    refreshing: "Оновлення…",
    periodShortened: "Період скорочено до максимально дозволеного",
    start: "Початок",
    duration: "Тривалість",
    peak: "Пік",
    coversOfPeriod: (e) => `Дані покривають ${e.share} періоду`,
    meanLoad: "Середнє навантаження",
    selfSufficiency: "Самозабезпечення"
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
    couldNotLoad: (e) => `Не вдалося завантажити конфігурацію: ${e.error}`,
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
    missingOne: (e) => `Для розділу «${e.feature}» потрібне поле ${e.roles}, але для цього інвертора його не вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, який із ваших сенсорів це.`,
    missingMany: (e) => `Для розділу «${e.feature}» потрібні поля ${e.roles}, але для цього інвертора жодне з них не вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, які з ваших сенсорів це.`,
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
    mixedSince: (e) => `Змішані з ${e.date}`,
    noData: "Немає даних за цей період",
    coversUnderOnePercent: "Дані покривають менше ніж 1% періоду",
    coversOnly: (e) => `Дані покривають лише ${e.share} періоду`
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
    neverReachedLimit: "За цей період батарея жодного разу не досягла ліміту заряду, тож ночі нічого не кажуть про її ємність.",
    hintLimitNotReached: "ліміт не досягнуто",
    hintNoData: "немає даних",
    noFill: "Без експорту сонце оцінюється за тим, як часто батарея заряджалася повністю, а даних про заряд за цей період немає.",
    hintNoFill: "немає даних заряду"
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
    in: "Надійшло",
    out: "Вийшло",
    flows: {
      pv_energy_total: "Сонце",
      grid_import_total: "З мережі",
      battery_discharge_total: "З батареї",
      load_energy_total: "Будинок",
      grid_export_total: "У мережу",
      battery_charge_total: "У батарею"
    },
    hoursWithoutGrid: (e) => `${e.hours} год без мережі`,
    // The verb agrees with the count: 1 відключення почалося, 2 почалися,
    // 5 відключень почалося.
    outagesBegan: (e) => e.n === 0 ? "жодне відключення не почалося" : Ft("uk", e.n, {
      one: `${e.n} відключення почалося`,
      few: `${e.n} відключення почалися`,
      many: `${e.n} відключень почалося`,
      other: `${e.n} відключення почалося`
    })
  },
  load: {
    loadConsistency: (e) => `Загальне навантаження в середньому становить ${e.total}, а сума фаз — ${e.partsTotal}. Можливо, для одного з цих показників вказано не той сенсор?`,
    pvConsistency: (e) => `Загальна потужність СЕС у середньому становить ${e.total}, а сума стрінгів — ${e.partsTotal}. Можливо, для одного з цих показників вказано не той сенсор?`,
    histogramClipped: "Деякі значення вийшли за межі гістограми й показані в її крайніх інтервалах",
    mean: "Середнє",
    median: "Медіана",
    sustained15m: "Тривала 15 хв",
    // Elliptical for "від номінальної потужності", as units.ofRated.
    above80OfRated: ">80% від номінальної",
    ofTime: "часу",
    shareOfRated: (e) => `${e.share} від номінальної`,
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
    below: (e) => `Нижче ${e.level}`,
    dips: "Провали",
    lastingOverMinute: "довші за хвилину",
    meanLowPoint: "Середній мінімум",
    acrossThoseDips: "серед цих провалів",
    dipsNotMeasurable: "Цей період покривають лише погодинні середні, які записують середній заряд за кожну годину. Падіння до 8% на двадцять хвилин виглядає там як цілком спокійне число, тож провали взагалі неможливо порахувати — порожня таблиця читалася б як «нічого не сталося». Виберіть коротший період, щоб їх побачити.",
    noEpisodes: (e) => `За цей період заряд жодного разу не тримався нижче ${e.level} довше ніж хвилину.`,
    lowest: "Найнижчий",
    recoveredTo: "Відновився до",
    dipsCountedFrom: (e) => `Провали пораховано з ${e.date}, звідки починаються точні дані`,
    timeAtSoc: "Час на кожному рівні заряду",
    chargeBands: "Розподіл за діапазонами заряду",
    lowChargeEpisodes: "Епізоди низького заряду",
    mapPowerSensor: "Вкажіть сенсор потужності батареї в параметрах інтеграції, щоб побачити, скільки енергії входить і виходить і яку частку часу батарея працює."
  },
  seasonality: {
    monthsIn: (e) => `Місяці за часовим поясом ${e.timezone}`,
    meanByMonth: "Середня потужність за місяцями",
    // 1 місяць має, 3 місяці мають, 5 місяців мають; "Один" only for 1 itself,
    // since 21 falls in the same form.
    thinMonths: (e) => Ft("uk", e.n, {
      one: `${e.n === 1 ? "Один" : e.n} місяць має дані менш ніж за ${e.share} своїх днів і показаний сірим.`,
      few: `${e.n} місяці мають дані менш ніж за ${e.share} своїх днів і показані сірим.`,
      many: `${e.n} місяців мають дані менш ніж за ${e.share} своїх днів і показані сірим.`,
      other: `${e.n} місяця мають дані менш ніж за ${e.share} своїх днів і показані сірим.`
    }),
    partialNotLower: "Місяць, який реєстратор бачив лише частково, — не нижчий місяць: самі значення правильні, а порівняння — ні.",
    // Для одного місяця, для 21 місяця, для 3 місяців, для 5 місяців.
    absentMonths: (e) => Ft("uk", e.n, {
      one: e.n === 1 ? "Для одного місяця немає жодних записаних даних, тож стовпчика в нього немає." : `Для ${e.n} місяця немає жодних записаних даних, тож стовпчиків у них немає.`,
      few: `Для ${e.n} місяців немає жодних записаних даних, тож стовпчиків у них немає.`,
      many: `Для ${e.n} місяців немає жодних записаних даних, тож стовпчиків у них немає.`,
      other: `Для ${e.n} місяця немає жодних записаних даних, тож стовпчиків у них немає.`
    }),
    statisticsFromStart: "Home Assistant зберігає довгострокову статистику лише з моменту, коли сенсор починає її створювати.",
    monthByMonth: "Місяць за місяцем",
    month: "Місяць",
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
    daysIn: (e) => `Дні за часовим поясом ${e.timezone}`,
    countedUpTo: (e) => `Пораховано до ${e.time}`,
    noEnergyStatistics: "За цей період немає статистики енергії",
    intoSystem: "у систему",
    outOfIt: "із системи",
    inAgainstOut: "Надійшло й вийшло",
    needsAllSix: (e) => `Баланс можна звести лише тоді, коли вказано всі шість лічильників. Бракує: ${e.missing}. Доти різниця між двома стовпчиками вимірювала б те, що не вказано, а не те, що втрачено.`,
    inOut: (e) => `Надійшло ${e.in}, вийшло ${e.out} —`,
    unaccountedFor: (e) => `не враховано (${e.share}).`,
    moreOutThanIn: (e) => `вийшло більше, ніж надійшло (${e.share}).`,
    unaccountedNote: "У цьому значенні — втрати на перетворення й на заряд-розряд батареї, а також кожна розбіжність між шістьма лічильниками. Його названо неврахованим, а не втратами, бо ніщо тут не відрізнить нагрів в інверторі від похибки струмових кліщів.",
    ratiosTitle: "Самозабезпечення й самоспоживання",
    ratiosNeedCounters: "Для самозабезпечення потрібні лічильники будинку й імпорту з мережі; для самоспоживання — сонячної генерації й експорту в мережу.",
    selfConsumption: "Самоспоживання",
    dayByDay: "День за днем",
    noDays: "За цей період немає днів зі статистикою енергії.",
    dayByDayNote: "Два стовпчики на день: що надійшло і що вийшло. Якщо їх скласти, та сама енергія порахувалася б двічі. Енергію читають із погодинної статистики Home Assistant, де скидання лічильників уже враховано. Поточна година зводиться лише після її завершення, тож період до теперішнього моменту закінчується останньою повною годиною."
  },
  grid: {
    outages: "Відключення",
    withoutGrid: "Без мережі",
    unrecordedAssumedOff: (e) => `+ ${e.duration} без записів, вважаємо відключенням`,
    shareOfTime: "Частка часу",
    ofMeasuredTime: "виміряного часу",
    longest: "Найдовше",
    fromTime: (e) => `з ${e.time}`,
    meanDuration: "Середня тривалість",
    briefInterruptions: "Короткі перебої",
    underAMinute: "коротші за хвилину",
    atLeast: (e) => `щонайменше ${e.duration}`,
    noOutages: (e) => `За цей період відключень не було — жодного за ${e.duration} вимірювань.`,
    chargeAtStart: "Заряд на початку",
    lowest: "Найнижчий",
    atEnd: "Наприкінці",
    unrecorded: (e) => `(${e.duration} без записів)`,
    noAutonomy: "Оцінки автономності немає.",
    autonomyReasons: {
      no_soc: "Для неї потрібен рівень заряду батареї, а його для цього інвертора не вказано.",
      no_outages: "За цей період не було відключень, за якими можна було б визначити швидкість розряду.",
      no_soc_in_outages: "Під час жодного з відключень цього періоду рівень заряду батареї не записувався, тож немає розряду, за яким можна було б визначити швидкість.",
      no_net_discharge: "Під час відключень цього періоду заряд не знижувався — їх покрило сонце, — тож швидкості розряду визначити немає з чого."
    },
    tooLittleEvidence: (e) => `Заряд знижувався до найнижчої точки кожного відключення разом ${e.hours}, а для оцінки потрібна щонайменше година.`,
    fromFullTo: (e) => `Від повного до ${e.level}`,
    fromNow: "Від поточного рівня",
    chargeNow: "Заряд зараз",
    dischargeRate: "Швидкість розряду",
    // Відсоткових пунктів рівня заряду за годину.
    pointsPerHour: (e) => `${e.rate} в.п./год`,
    evidenceNote: (e) => `За швидкістю, що спостерігалася під час відключень цього періоду, — за ${e.hours}, поки заряд знижувався до найнижчої точки кожного з них. Чи каже щось відключення літнього пообіддя про зимовий вечір, вирішувати вам; середнє навантаження поруч допоможе це оцінити.`,
    hoursLeft: "Ще витримала б",
    neededAtStart: "Потрібно на старті",
    didNotLast: "не витримала",
    moreThanFull: "більше за повну батарею",
    reserveReasons: {
      no_soc: "немає даних заряду",
      cut: "обрізане періодом",
      no_net_discharge: "покрило сонце",
      too_short: "закоротке для оцінки"
    },
    hardestOutageNeeds: "Найважче відключення потребує",
    hardestOutageOn: (e) => `Відключення ${e.date}`,
    noHardestOutage: "Жодного відключення, достатньо довгого для оцінки",
    outagesCovered: "Покрито відключень",
    coveredOf: (e) => `${e.covered} з ${e.judged}`,
    coveredHint: (e) => `Ні разу нижче ${e.level}`,
    reserveNote: "Скільки ще витримала б батарея, рахується від найнижчої точки кожного відключення, з тією швидкістю, з якою заряд падав до неї, а потрібний на старті заряд — це низька позначка плюс це падіння. Обидва показники залежать від години й навантаження: денне відключення мало що каже про нічне.",
    countedFromInferred: (e) => `Відключення пораховано з ${e.date} — для давнішого часу є лише погодинні середні, з яких не видно, коли саме в межах години зникала мережа`,
    countedFromNoHistory: (e) => `Відключення пораховано з ${e.date} — давнішої історії цього сенсора реєстратор не зберігає`,
    inferredBanner: "Визначено за потоками потужності, а не виміряно. Ніч, коли будинок живить батарея і через підключення до мережі нічого не проходить, виглядає точнісінько як відключення, а денного відключення, яке покриває сонце, взагалі не видно. Щоб вимірювати, вкажіть сенсор, який повідомляє про наявність мережі.",
    hoursByDay: "Години без мережі, за днями",
    noDaysWithData: "За цей період немає днів із даними.",
    // 1 і 21 день не має, 3 дні не мають, 5 днів не мають.
    missingDays: (e) => Ft("uk", e.n, {
      one: `${e.n} день цього періоду не має даних і не показаний.`,
      few: `${e.n} дні цього періоду не мають даних і не показані.`,
      many: `${e.n} днів цього періоду не мають даних і не показані.`,
      other: `${e.n} дня цього періоду не мають даних і не показані.`
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
    hoursAtRated: (e) => `${e.hours} год на номінальній`,
    // Genitive after «з»: з 1 дня, з 3 днів, з 30 днів, з 21 дня.
    daysOf: (e) => `${e.days} з ${e.total} ` + Ft("uk", e.total, { one: "дня", few: "днів", many: "днів", other: "дня" }),
    ofLoad: (e) => `${e.share} від споживання`,
    countOf: (e) => `${e.count} з ${e.total}`,
    hoursReachedRated: "Годин, коли навантаження досягало номінальної потужності",
    // «Сягало» — досягало щонайменше цієї частки, як і рахує код (>=).
    hoursAboveOfRated: (e) => `Годин, коли навантаження сягало ${e.share} від номінальної`,
    highestPeak: "Найвищий погодинний пік",
    daysFilledAndLow: "Днів, коли батарея зарядилася повністю й однаково опустилася нижче низької позначки",
    daysLowWithoutFilling: "Днів, коли вона опустилася нижче низької позначки, не зарядившись повністю",
    daysFilled: "Днів, коли вона зарядилася повністю",
    lowestCharge: "Найнижчий заряд",
    productionShare: "Генерація як частка споживання",
    producedConsumed: "Згенеровано / спожито",
    daysBatteryFilled: "Днів із повним зарядом батареї",
    // Each rule says what sizing.py computes: "more than" is strict, "at
    // least" and "from" include the mark, "below the low mark" is strict.
    inverterRule: (e) => `Замало, якщо навантаження досягало номінальної потужності в більш ніж ${e.shortShare} годин; на межі — якщо таке траплялося хоча б в одну годину або якщо навантаження сягало ${e.highShare} від номінальної в більш ніж ${e.borderlineShare} годин.`,
    batteryRule: (e) => `Рахується за днями з даними: замало, якщо щонайменше в ${e.share} із них батарея зарядилася до ${e.full} і все одно опустилася нижче ${e.low}; на межі — якщо таке траплялося хоча б раз; без вердикту — для періоду, у якому вона жодного разу не зарядилася повністю. День, коли батарея опустилася нижче цієї позначки, так і не зарядившись повністю, зараховується як недолік сонця, а не батареї.`,
    batteryRuleCeiling: (e) => `Рахується за днями з даними: замало, якщо щонайменше в ${e.share} із них батарея досягла ліміту заряду, поки світило сонце, і все одно опустилася нижче ${e.low}; на межі — якщо таке траплялося хоча б раз; без вердикту — для періоду, у якому вона жодного разу не досягла ліміту. День, коли батарея опустилася нижче цієї позначки, так і не досягнувши ліміту, зараховується як недолік сонця, а не батареї.`,
    solarRuleWithFill: (e) => `Достатньо, якщо генерація становить щонайменше ${e.enough} споживання і батарея заряджалася повністю щонайменше в ${e.fill} днів; на межі — від ${e.borderline} споживання; замало — якщо менше.`,
    solarRule: (e) => `Достатньо, якщо генерація становить щонайменше ${e.enough} споживання; на межі — від ${e.borderline} споживання; замало — якщо менше.`,
    solarRuleNoExport: (e) => `Без експорту генерація не може перевищити споживання, тож сонце оцінюється за батареєю: достатньо, якщо вона досягала ліміту заряду, поки світило сонце, щонайменше в ${e.fill} днів; на межі — від ${e.borderlineFill} днів або від ${e.borderline} споживання; замало — якщо менше.`,
    solarRuleNoExportFixed: (e) => `Без експорту генерація не може перевищити споживання, тож сонце оцінюється за батареєю: достатньо, якщо вона заряджалася до ${e.full} щонайменше в ${e.fill} днів; на межі — від ${e.borderlineFill} днів або від ${e.borderline} споживання; замало — якщо менше.`,
    fullModeCeiling: "Повний заряд означає, що батарея досягла власного ліміту заряду: інвертор припинив заряджання, поки світило сонце. Ліміт, знижений на літо нижче 100%, теж враховується.",
    fullModeFixed: (e) => `Повний заряд означає рівень заряду щонайменше ${e.full}. Вкажіть ${e.roles}, щоб натомість зчитувати власний ліміт заряду батареї.`,
    fullModeNoRows: (e) => e.n === 1 ? `Сенсор ${e.roles} не має статистики за цей період, тож повний заряд визначається фіксованою позначкою ${e.full}.` : `Сенсори ${e.roles} не мають статистики за цей період, тож повний заряд визначається фіксованою позначкою ${e.full}.`,
    fullModePlain: (e) => `Повний заряд означає рівень заряду щонайменше ${e.full}.`,
    needsNotSet: (e) => `Потрібне значення ${e.roles}, але для цього інвертора його не задано.`,
    needsNotMapped: (e) => e.n === 1 ? `Потрібне поле ${e.roles}, але для цього інвертора його не вказано.` : `Потрібні поля ${e.roles}, але для цього інвертора їх не вказано.`,
    // The option names as the integration's form shows them in Ukrainian.
    thresholdsInverted: (e) => `Позначка повного заряду (${e.full}) не вища за позначку низького (${e.low}), тож жоден день неможливо оцінити. Підвищте «Повний заряд батареї» або знизьте «Низький заряд батареї» в параметрах інтеграції.`,
    // One sensor or a list of them: the verb and pronoun follow, not the
    // plural category — 21 sensors are still «вони».
    noStatisticsBefore: (e) => e.n === 1 ? `${e.sensors} не зберігає довгострокової статистики — у нього немає` : `${e.sensors} не зберігають довгострокової статистики — у них немає`,
    noStatisticsAfter: (e) => e.n === 1 ? "— тож цю картку з нього не прочитати." : "— тож цю картку з них не прочитати.",
    readFrom: (e) => `Оцінено за ${e.share} періоду.`,
    batteryNotFilling: (e) => `Генерація покриває споживання, але батарея заряджалася повністю лише в ${e.share} днів — удень експорт, уночі імпорт.`,
    cellCoverage: (e) => `покриття ${e.share}`,
    noMonths: "У цей період не потрапляє жоден місяць.",
    ofTheMonth: (e) => `дані за ${e.share} місяця`,
    statisticsCoverUpTo: (e) => `Статистика охоплює час до ${e.time}`,
    noStatistics: "За цей період немає статистики",
    greyMonths: (e) => `Місяць, показаний сірим, має дані менш ніж за ${e.share} своєї тривалості; його вердикт спирається лише на цю частину. Перший і останній місяці періоду майже завжди неповні.`,
    howVerdictsRead: "Як визначаються вердикти",
    ruleLine: (e) => `${e.part} — ${e.rule}`,
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
      driftBelow: (e) => `Наприкінці рівень заряду був на ${e.n} ` + Ft("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " нижчим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
      driftAbove: (e) => `Наприкінці рівень заряду був на ${e.n} ` + Ft("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " вищим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
      tooLittle: "Заряду й розряду було замало, щоб ділити одне на інше."
    },
    phases: {
      title: "Фази",
      positional: (e) => `Фаза ${e.n}`,
      shareOfLoad: "Частка навантаження",
      peakVs: (e) => `Пік щодо ${e.rating}`,
      neverAboveFloor: (e) => `Загальне навантаження жодного разу не перевищило ${e.floor}, тож за цей період не було відносно чого вимірювати перекіс фаз.`,
      meanImbalance: "Середній перекіс фаз",
      p95Imbalance: "P95 перекосу фаз",
      above: (e) => `Понад ${e.threshold}`,
      ofMeasuredTime: "виміряного часу",
      measuredOver: (e) => `Виміряно за ${e.duration} (${e.share} періоду).`,
      belowFloorExcluded: (e) => `Ще ${e.duration} загальне навантаження було нижче ${e.floor}, і цей час виключено: за потужності очікування різниця в кілька ватів дає великий відсоток і нічого не означає.`,
      noSustained: "За цей період тривалого перекосу фаз не було.",
      worst: "Найбільший",
      // поділено на 1 фазу, 3 фази, 5 фаз.
      derivedRating: (e) => `Номінальну потужність на фазу не налаштовано, тому загальну поділено на ${e.n} ${Ft("uk", e.n, { one: "фазу", few: "фази", many: "фаз", other: "фази" })} — по ${e.rating} на кожну. Якщо обладнання інше, вкажіть справжнє значення в параметрах інтеграції.`,
      alignedLow: (e) => `Усі фази мали дані одночасно лише протягом ${e.share} періоду. Перекіс фаз неможливо виміряти, поки дані хоча б однієї фази невідомі.`,
      imbalance: "Перекіс фаз",
      sustainedEpisodes: "Епізоди тривалого перекосу фаз"
    },
    strings: {
      title: "Стрінги СЕС",
      positional: (e) => `Стрінг ${e.n}`,
      shareOfPv: "Частка СЕС",
      alignedLow: (e) => `Усі стрінги мали дані одночасно лише протягом ${e.share} періоду, тож частки рахуються від цього часу, а не від усього періоду.`,
      compare: "Стрінг, що постійно видає менше за сусідній, вказує на затінення, іншу орієнтацію або несправність. Порівнюйте середнє, а не пік: піки збігаються, середні — ні."
    }
  }
}, xb = ["en", "uk"], ey = "inverter-analytics.lang", Tb = { en: wb, uk: Sb };
function ry(e) {
  return e === "en" || e === "uk";
}
function Cc(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function Cb(e, t) {
  return ry(e) ? e : Cc(t) ? "uk" : "en";
}
function Mb(e, t) {
  return e === "uk" ? "uk" : !t || Cc(t) ? "en" : t;
}
function iy(e) {
  return Tb[e];
}
function no(e) {
  return iy(Cc(e) ? "uk" : "en");
}
let va, xs;
const lh = /* @__PURE__ */ new Set();
function Db() {
  if (va === void 0)
    try {
      const e = globalThis.localStorage?.getItem(ey) ?? null;
      va = ry(e) ? e : null;
    } catch {
      va = null;
    }
  return va;
}
function ny() {
  for (const e of lh) e();
}
function uh() {
  return Cb(Db(), xs);
}
function hh() {
  return Mb(uh(), xs);
}
function Ab(e) {
  va = e;
  try {
    globalThis.localStorage?.setItem(ey, e);
  } catch {
  }
  ny();
}
function Ib(e) {
  if (e === xs) return;
  const t = hh();
  xs = e, hh() !== t && ny();
}
function Lb(e) {
  return lh.add(e), () => lh.delete(e);
}
const tl = "—";
function pt(e, t) {
  if (e === null || Number.isNaN(e)) return tl;
  const r = no(t);
  return Math.abs(e) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    e / 1e3
  )} ${r.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${r.units.w}`;
}
function Y(e, t) {
  return e === null || Number.isNaN(e) ? tl : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e * 100)}%`;
}
function cr(e, t) {
  return e === null || Number.isNaN(e) ? tl : e <= 0 ? "0%" : e < 1e-3 ? "<0.1%" : Y(e, t);
}
const Pb = 10 * 60;
function Xt(e, t) {
  if (e === null || Number.isNaN(e)) return tl;
  const { units: r } = no(t);
  return `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e)} ${r.kwh}`;
}
function $b(e, t) {
  const r = e.toFixed(1), i = new Intl.NumberFormat(t).formatToParts(1.5).find((n) => n.type === "decimal")?.value ?? ".";
  return i === "." ? r : r.replace(".", i);
}
function qt(e, t) {
  const { units: r } = no(t);
  if (e < 60) return `${Math.round(e)} ${r.s}`;
  const i = Math.round(e);
  if (i < Pb) {
    const a = i % 60, o = (i - a) / 60;
    return a === 0 ? `${o} ${r.min}` : `${o} ${r.min} ${a} ${r.s}`;
  }
  const n = Math.round(i / 60);
  return n < 60 ? `${n} ${r.min}` : `${Math.floor(n / 60)} ${r.h} ${n % 60} ${r.min}`;
}
function Ei(e, t) {
  if (typeof e == "object" && e !== null && "code" in e) {
    const r = e.code;
    if (typeof r == "string" && Object.prototype.hasOwnProperty.call(t.errors, r))
      return t.errors[r];
  }
  if (typeof e == "object" && e !== null && "message" in e) {
    const r = e.message;
    if (typeof r == "string" && r) return r;
  }
  return String(e);
}
function el(e, t, r) {
  const { format: i } = no(r);
  return e === "raw" ? i.exactData : e === "lts" ? i.hourlyAverages : t ? i.mixedSince({ date: new Date(t).toLocaleDateString(r) }) : i.mixed;
}
function Na(e, t) {
  if (e >= 0.95) return null;
  const { format: r } = no(t);
  return e <= 0 ? r.noData : e < 0.01 ? r.coversUnderOnePercent : r.coversOnly({ share: Y(e, t) });
}
function Rb(e) {
  let t;
  return () => (t ??= e().finally(() => {
    t = void 0;
  }), t);
}
const ay = ["24h", "7d", "30d", "month", "year"];
function Ob(e, t) {
  return e.ranges[t];
}
const po = 24 * 3600 * 1e3, Xf = 60 * 1e3;
function kn(e, t) {
  const r = new Date(Math.floor(t.getTime() / Xf) * Xf);
  switch (e) {
    case "24h":
      return { start: new Date(r.getTime() - po), end: r };
    case "7d":
      return { start: new Date(r.getTime() - 7 * po), end: r };
    case "30d":
      return { start: new Date(r.getTime() - 30 * po), end: r };
    case "month":
      return { start: new Date(r.getFullYear(), r.getMonth(), 1, 0, 0, 0, 0), end: r };
    case "year":
      return { start: new Date(r.getTime() - 365 * po), end: r };
  }
}
function Eb(e, t, r, i) {
  const a = e.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && r.includes(a) ? a : i.tab,
    range: s && ay.includes(s) ? s : i.range,
    entryId: l || i.entryId
  };
}
function kb(e, t) {
  const r = new URLSearchParams({ range: t.range });
  return t.entryId && r.set("entry", t.entryId), `${e}/${t.tab}?${r.toString()}`;
}
class Je {
  constructor(t) {
    this.host = t, t.addController(this);
  }
  hostConnected() {
    this.unsubscribe = Lb(() => this.host.requestUpdate());
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
  get lang() {
    return uh();
  }
  get m() {
    return iy(uh());
  }
  get locale() {
    return hh();
  }
}
function Nb(e, t) {
  return e.roles[t] ?? t;
}
function Ba(e, t, r = !1) {
  const i = t.map((n) => {
    const a = Nb(e, n);
    return r ? e.common.quoted({ text: a }) : a;
  });
  return i.length <= 1 ? i.join("") : `${i.slice(0, -1).join(", ")} ${e.common.and} ${i[i.length - 1]}`;
}
const Bb = /^(load|grid|pv)_p(\d+)$/;
function Ts(e, t) {
  const r = Bb.exec(t.key);
  if (!r) return t.label;
  const i = Number(r[2]);
  return r[1] === "pv" ? e.sections.strings.positional({ n: i }) : e.sections.phases.positional({ n: i });
}
const zb = "/config/integrations/integration/inverter_analytics", at = {
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
  const e = typeof document > "u" ? null : getComputedStyle(document.documentElement), t = e?.getPropertyValue("--primary-text-color").trim() || "#212121", r = e?.getPropertyValue("--divider-color").trim() || "#e0e0e0";
  return {
    base: {
      backgroundColor: "transparent",
      textStyle: { color: t, fontFamily: "inherit" },
      grid: { left: 56, right: 24, top: 24, bottom: 40, containLabel: !0 },
      tooltip: { trigger: "axis" }
    },
    axis: {
      axisLine: { lineStyle: { color: r } },
      axisLabel: { color: t },
      splitLine: { lineStyle: { color: r } },
      nameTextStyle: { color: t }
    }
  };
}
const wt = (e, t) => Number(e.toFixed(t)), oy = (e, t, r) => new Intl.NumberFormat(r.charts.locale, {
  maximumFractionDigits: t,
  useGrouping: !1
}).format(wt(e, t));
function Fb(e, t, r) {
  const { base: i, axis: n } = re(), a = e.histogram.buckets, o = a.map(
    (s) => t === "watts" ? String(wt(s.start, 0)) : oy(s.start / e.rated_power * 100, 1, r)
  );
  return {
    ...i,
    xAxis: {
      ...n,
      type: "category",
      data: o,
      name: t === "watts" ? r.units.w : `% ${r.units.ofRated}`,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: r.charts.percentOfTime },
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
function Hb(e, t) {
  const { base: r, axis: i } = re();
  return {
    ...r,
    xAxis: { ...i, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...i, type: "value", name: t.units.w },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: at.load },
        itemStyle: { color: at.load },
        data: e.duration_curve.map((n) => [
          wt(n.fraction * 100, 2),
          wt(n.value, 1)
        ])
      }
    ]
  };
}
function Vb(e, t) {
  const { base: r, axis: i } = re(), n = [...e.bands].reverse();
  return {
    ...r,
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
function Gb(e, t) {
  const { base: r, axis: i } = re(), n = e.histogram;
  return {
    ...r,
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
          color: (a) => n[a.dataIndex].start >= e.threshold ? at.overload : at.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Wb(e, t, r) {
  const { base: i, axis: n } = re();
  return {
    ...i,
    // Two bar colours with nothing naming them is a guess. The shared grid
    // starts 24px from the top, which is exactly where the legend draws, so
    // the plot has to be pushed down to make room for it.
    legend: { data: [r.charts.mean, r.charts.peak], top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 48 },
    xAxis: { ...n, type: "category", data: e.map((a) => Ts(r, a)) },
    yAxis: { ...n, type: "value", name: r.units.w },
    series: [
      {
        name: r.charts.mean,
        type: "bar",
        data: e.map((a) => a.mean === null ? null : wt(a.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: r.charts.peak,
        type: "bar",
        data: e.map((a) => a.peak === null ? null : wt(a.peak, 1)),
        itemStyle: { color: at.muted }
      }
    ]
  };
}
function Ub(e, t) {
  const { base: r, axis: i } = re(), n = e.histogram.buckets;
  return {
    ...r,
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
          color: (a) => n[a.dataIndex].end <= e.low_pct ? at.overload : at.battery
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function Yb(e, t) {
  const { base: r, axis: i } = re(), n = [...e].reverse();
  return {
    ...r,
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
function Mc(e, t, r) {
  const [i, n] = e.split("-").map(Number), a = new Date(Date.UTC(2e3, n - 1, 1)).toLocaleDateString(r, {
    month: "short"
  });
  return t && t.slice(0, 4) === String(i) ? a : `${a} ${i}`;
}
function Xb(e, t, r) {
  const { base: i, axis: n } = re(), a = e.map(
    (s, l) => Mc(s.key, e[l - 1]?.key, r.charts.locale)
  ), o = [
    {
      name: r.charts.load,
      type: "bar",
      data: e.map((s) => s.load_mean === null ? null : wt(s.load_mean, 1)),
      // An incomplete month keeps its bar and loses its solidity: dropping it
      // would leave a hole the reader fills in with a reason of their own.
      itemStyle: {
        color: (s) => e[s.dataIndex].complete ? at.load : at.muted
      }
    }
  ];
  return t && o.push({
    name: r.charts.pv,
    type: "bar",
    data: e.map((s) => s.pv_mean === null ? null : wt(s.pv_mean, 1)),
    itemStyle: { color: at.pv }
  }), {
    ...i,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: i.textStyle } : void 0,
    grid: { ...i.grid, top: t ? 48 : 24 },
    xAxis: { ...n, type: "category", data: a },
    yAxis: { ...n, type: "value", name: r.units.w },
    series: o
  };
}
function qb(e, t, r) {
  const { base: i, axis: n } = re(), a = [
    {
      name: r.charts.load,
      type: "line",
      showSymbol: !1,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: at.load },
      itemStyle: { color: at.load },
      data: e.map((o) => o.load_mean === null ? null : wt(o.load_mean, 1))
    }
  ];
  return t && a.push({
    name: r.charts.pv,
    type: "line",
    showSymbol: !1,
    lineStyle: { color: at.pv },
    itemStyle: { color: at.pv },
    data: e.map((o) => o.pv_mean === null ? null : wt(o.pv_mean, 1))
  }), {
    ...i,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: i.textStyle } : void 0,
    grid: { ...i.grid, top: t ? 48 : 24 },
    xAxis: {
      ...n,
      type: "category",
      data: e.map((o) => String(o.hour)),
      name: r.charts.hour,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: r.units.w },
    series: a
  };
}
function Zb(e, t, r) {
  const { base: i, axis: n } = re(), a = t.map((h) => h.key), o = a.map((h, c) => Mc(h, a[c - 1], r.charts.locale)), s = new Map(a.map((h, c) => [h, c])), l = e.filter((h) => h.load_mean !== null && s.has(h.month)).map((h) => [s.get(h.month), h.hour, wt(h.load_mean, 1)]), u = l.map((h) => h[2]);
  return {
    ...i,
    tooltip: { trigger: "item" },
    grid: { ...i.grid, top: 48, bottom: 60 },
    xAxis: { ...n, type: "category", data: o, splitArea: { show: !0 } },
    yAxis: {
      ...n,
      type: "category",
      data: Array.from({ length: 24 }, (h, c) => String(c)),
      name: r.charts.hour
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
function Mn(e, t) {
  return e.charts.flows[t] ?? t;
}
const sy = {
  pv_energy_total: at.pv,
  grid_import_total: at.grid,
  battery_discharge_total: at.battery,
  load_energy_total: at.load,
  grid_export_total: at.gridExport,
  battery_charge_total: at.batteryCharge
};
function Kb(e, t, r, i) {
  const { base: n, axis: a } = re(), o = [...t, ...r].filter((s) => s in e);
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
      itemStyle: { color: sy[s] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: t.includes(s) ? [null, wt(e[s], 3)] : [wt(e[s], 3), null]
    }))
  };
}
function jb(e, t, r, i) {
  const { base: n, axis: a } = re(), o = [...t, ...r].filter(
    (s) => e.some((l) => s in l.flows)
  );
  return {
    ...n,
    legend: { data: o.map((s) => Mn(i, s)), top: 0, textStyle: n.textStyle },
    grid: { ...n.grid, top: 56 },
    xAxis: { ...a, type: "category", data: e.map((s) => s.day.slice(5)) },
    yAxis: { ...a, type: "value", name: i.units.kwh },
    series: o.map((s) => ({
      name: Mn(i, s),
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: sy[s] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: e.map((l) => s in l.flows ? wt(l.flows[s], 3) : null)
    }))
  };
}
function Qb(e, t) {
  const { base: r, axis: i } = re();
  return {
    ...r,
    tooltip: {
      ...r.tooltip,
      // How many outages began on a day is the other thing the by-day view has
      // to answer, and a second axis for a count of two or three would cost
      // more than it says. The tooltip is where it fits.
      formatter: (n) => {
        const a = n[0], o = e[a.dataIndex].count, s = t.charts.hoursWithoutGrid({ hours: oy(a.value, 2, t) });
        return `${a.name}<br/>${s}<br/>${t.charts.outagesBegan({ n: o })}`;
      }
    },
    xAxis: { ...i, type: "category", data: e.map((n) => n.day.slice(5)) },
    yAxis: { ...i, type: "value", name: t.charts.hours },
    series: [
      {
        type: "bar",
        // Days the sensor had no data for are not in the list at all, so
        // every bar here stands on measured time.
        data: e.map((n) => wt(n.off_seconds / 3600, 2)),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function Jb(e, t) {
  const { base: r, axis: i } = re();
  return {
    ...r,
    xAxis: { ...i, type: "category", data: e.map((n) => `${n.hour}`) },
    yAxis: { ...i, type: "value", name: t.charts.percentOfMeasuredTime, min: 0, max: 100 },
    series: [
      {
        type: "bar",
        // A share rather than raw hours: under uneven coverage raw hours
        // compare an hour the recorder saw ten times with one it saw twice.
        // An hour with no measured time stays a hole, not a zero.
        data: e.map(
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
var ch = function(e, t) {
  return ch = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
  }, ch(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ch(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var t1 = /* @__PURE__ */ function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
}(), e1 = /* @__PURE__ */ function() {
  function e() {
    this.browser = new t1(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
}(), X = new e1();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (X.wxa = !0, X.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? X.worker = !0 : !X.hasGlobalWindow || "Deno" in window ? (X.node = !0, X.svgSupported = !0) : r1(navigator.userAgent, X);
function r1(e, t) {
  var r = t.browser, i = e.match(/Firefox\/([\d.]+)/), n = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  i && (r.firefox = !0, r.version = i[1]), n && (r.ie = !0, r.version = n[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
}
var Dc = 12, i1 = "sans-serif", Li = Dc + "px " + i1, n1 = 20, a1 = 100, o1 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function s1(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var i = String.fromCharCode(r + 32), n = (e.charCodeAt(r) - n1) / a1;
    t[i] = n;
  }
  return t;
}
var l1 = s1(o1), Wr = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var e, t;
    return function(r, i) {
      if (!e) {
        var n = Wr.createCanvas();
        e = n && n.getContext("2d");
      }
      if (e)
        return t !== i && (t = e.font = i || Li), e.measureText(r);
      r = r || "", i = i || Li;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Dc, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = l1[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(e, t, r) {
    var i = new Image();
    return i.onload = t, i.onerror = r, i.src = e, i;
  }
}, ly = Nn([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(e, t) {
  return e["[object " + t + "]"] = !0, e;
}, {}), uy = Nn([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(e, t) {
  return e["[object " + t + "Array]"] = !0, e;
}, {}), ao = Object.prototype.toString, rl = Array.prototype, u1 = rl.forEach, h1 = rl.filter, Ac = rl.slice, c1 = rl.map, qf = function() {
}.constructor, go = qf ? qf.prototype : null, Ic = "__proto__", f1 = 2311;
function hy() {
  return f1++;
}
function Lc() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function q(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = ao.call(e);
  if (r === "[object Array]") {
    if (!Sa(e)) {
      t = [];
      for (var i = 0, n = e.length; i < n; i++)
        t[i] = q(e[i]);
    }
  } else if (uy[r]) {
    if (!Sa(e)) {
      var a = e.constructor;
      if (a.from)
        t = a.from(e);
      else {
        t = new a(e.length);
        for (var i = 0, n = e.length; i < n; i++)
          t[i] = e[i];
      }
    }
  } else if (!ly[r] && !Sa(e) && !za(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== Ic && (t[o] = q(e[o]));
  }
  return t;
}
function nt(e, t, r) {
  if (!V(t) || !V(e))
    return r ? q(t) : e;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Ic) {
      var n = e[i], a = t[i];
      V(a) && V(n) && !z(a) && !z(n) && !za(a) && !za(n) && !Zf(a) && !Zf(n) && !Sa(a) && !Sa(n) ? nt(n, a, r) : (r || !(i in e)) && (e[i] = q(t[i]));
    }
  return e;
}
function N(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== Ic && (e[r] = t[r]);
  return e;
}
function ut(e, t, r) {
  for (var i = gt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    e[o] == null && (e[o] = t[o]);
  }
  return e;
}
function vt(e, t) {
  if (e) {
    if (e.indexOf)
      return e.indexOf(t);
    for (var r = 0, i = e.length; r < i; r++)
      if (e[r] === t)
        return r;
  }
  return -1;
}
function v1(e, t) {
  var r = e.prototype;
  function i() {
  }
  i.prototype = t.prototype, e.prototype = new i();
  for (var n in r)
    r.hasOwnProperty(n) && (e.prototype[n] = r[n]);
  e.prototype.constructor = e, e.superClass = t;
}
function tr(e, t, r) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else
    ut(e, t);
}
function Jt(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function C(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === u1)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var i = 0, n = e.length; i < n; i++)
        t.call(r, e[i], i, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function U(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return Pc(e);
  if (e.map && e.map === c1)
    return e.map(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    i.push(t.call(r, e[n], n, e));
  return i;
}
function Nn(e, t, r, i) {
  if (e && t) {
    for (var n = 0, a = e.length; n < a; n++)
      r = t.call(i, r, e[n], n, e);
    return r;
  }
}
function Pt(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return Pc(e);
  if (e.filter && e.filter === h1)
    return e.filter(t, r);
  for (var i = [], n = 0, a = e.length; n < a; n++)
    t.call(r, e[n], n, e) && i.push(e[n]);
  return i;
}
function gt(e) {
  if (!e)
    return [];
  if (Object.keys)
    return Object.keys(e);
  var t = [];
  for (var r in e)
    e.hasOwnProperty(r) && t.push(r);
  return t;
}
function d1(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return function() {
    return e.apply(t, r.concat(Ac.call(arguments)));
  };
}
var J = go && Z(go.bind) ? go.call.bind(go.bind) : d1;
function Dt(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(Ac.call(arguments)));
  };
}
function z(e) {
  return Array.isArray ? Array.isArray(e) : ao.call(e) === "[object Array]";
}
function Z(e) {
  return typeof e == "function";
}
function H(e) {
  return typeof e == "string";
}
function fh(e) {
  return ao.call(e) === "[object String]";
}
function yt(e) {
  return typeof e == "number";
}
function V(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function Zf(e) {
  return !!ly[ao.call(e)];
}
function te(e) {
  return !!uy[ao.call(e)];
}
function za(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function il(e) {
  return e.colorStops != null;
}
function p1(e) {
  return e.image != null;
}
function Cs(e) {
  return e !== e;
}
function Dn() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = 0, i = e.length; r < i; r++)
    if (e[r] != null)
      return e[r];
}
function tt(e, t) {
  return e ?? t;
}
function ns(e, t, r) {
  return e ?? t ?? r;
}
function Pc(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return Ac.apply(e, t);
}
function cy(e) {
  if (typeof e == "number")
    return [e, e, e, e];
  var t = e.length;
  return t === 2 ? [e[0], e[1], e[0], e[1]] : t === 3 ? [e[0], e[1], e[2], e[1]] : e;
}
function qe(e, t) {
  if (!e)
    throw new Error(t);
}
function Ue(e) {
  return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var fy = "__ec_primitive__";
function vh(e) {
  e[fy] = !0;
}
function Sa(e) {
  return e[fy];
}
var g1 = function() {
  function e() {
    this.data = {};
  }
  return e.prototype.delete = function(t) {
    var r = this.has(t);
    return r && delete this.data[t], r;
  }, e.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, e.prototype.get = function(t) {
    return this.data[t];
  }, e.prototype.set = function(t, r) {
    return this.data[t] = r, this;
  }, e.prototype.keys = function() {
    return gt(this.data);
  }, e.prototype.forEach = function(t) {
    var r = this.data;
    for (var i in r)
      r.hasOwnProperty(i) && t(r[i], i);
  }, e;
}(), vy = typeof Map == "function";
function y1() {
  return vy ? /* @__PURE__ */ new Map() : new g1();
}
var m1 = function() {
  function e(t) {
    var r = z(t);
    this.data = y1();
    var i = this;
    t instanceof e ? t.each(n) : t && C(t, n);
    function n(a, o) {
      r ? i.set(a, o) : i.set(o, a);
    }
  }
  return e.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, e.prototype.get = function(t) {
    return this.data.get(t);
  }, e.prototype.set = function(t, r) {
    return this.data.set(t, r), r;
  }, e.prototype.each = function(t, r) {
    this.data.forEach(function(i, n) {
      t.call(r, i, n);
    });
  }, e.prototype.keys = function() {
    var t = this.data.keys();
    return vy ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
}();
function Q(e) {
  return new m1(e);
}
function _1(e, t) {
  for (var r = new e.constructor(e.length + t.length), i = 0; i < e.length; i++)
    r[i] = e[i];
  for (var n = e.length, i = 0; i < t.length; i++)
    r[i + n] = t[i];
  return r;
}
function nl(e, t) {
  var r;
  if (Object.create)
    r = Object.create(e);
  else {
    var i = function() {
    };
    i.prototype = e, r = new i();
  }
  return t && N(r, t), r;
}
function dy(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Pi(e, t) {
  return e.hasOwnProperty(t);
}
function Wt() {
}
var b1 = 180 / Math.PI;
function Bn(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function w1(e) {
  return [e[0], e[1]];
}
function Kf(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function S1(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function x1(e) {
  return Math.sqrt(T1(e));
}
function T1(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function zl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function C1(e, t) {
  var r = x1(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function dh(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var M1 = dh;
function D1(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var pn = D1;
function me(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function hn(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function cn(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var Gi = /* @__PURE__ */ function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
}(), A1 = function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Gi(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, r.drift(a, o, t), this.handler.dispatchToElement(new Gi(r, t), "drag", t.event);
      var s = this.handler.findHover(i, n, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new Gi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Gi(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new Gi(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Gi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
}(), er = function() {
  function e(t) {
    t && (this._$eventProcessor = t);
  }
  return e.prototype.on = function(t, r, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof r == "function" && (n = i, i = r, r = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var l = {
      h: i,
      query: r,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, u = a[t].length - 1, h = a[t][u];
    return h && h.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, e.prototype.isSilent = function(t) {
    var r = this._$handlers;
    return !r || !r[t] || !r[t].length;
  }, e.prototype.off = function(t, r) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (r) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== r && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, e.prototype.trigger = function(t) {
    for (var r = [], i = 1; i < arguments.length; i++)
      r[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = r.length, s = n.length, l = 0; l < s; l++) {
        var u = n[l];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, r[0]);
              break;
            case 2:
              u.h.call(u.ctx, r[0], r[1]);
              break;
            default:
              u.h.apply(u.ctx, r);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, e.prototype.triggerWithContext = function(t) {
    for (var r = [], i = 1; i < arguments.length; i++)
      r[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = r.length, s = r[o - 1], l = n.length, u = 0; u < l; u++) {
        var h = n[u];
        if (!(a && a.filter && h.query != null && !a.filter(t, h.query)))
          switch (o) {
            case 0:
              h.h.call(s);
              break;
            case 1:
              h.h.call(s, r[0]);
              break;
            case 2:
              h.h.call(s, r[0], r[1]);
              break;
            default:
              h.h.apply(s, r.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, e;
}(), I1 = Math.log(2);
function ph(e, t, r, i, n, a) {
  var o = i + "-" + n, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / I1);
    return e[r][l];
  }
  for (var u = i | 1 << r, h = r + 1; i & 1 << h; )
    h++;
  for (var c = 0, v = 0, f = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (c += (f % 2 ? -1 : 1) * e[r][v] * ph(e, t - 1, h, u, n | d, a), f++);
  }
  return a[o] = c, c;
}
function jf(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], i = {}, n = ph(r, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * ph(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, h) {
      var c = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / c, l[1] = (u * a[3] + h * a[4] + a[5]) / c;
    };
  }
}
var Qf = "___zrEVENTSAVED", Fl = [];
function L1(e, t, r, i, n) {
  return gh(Fl, t, i, n, !0) && gh(e, r, Fl[0], Fl[1]);
}
function gh(e, t, r, i, n) {
  if (t.getBoundingClientRect && X.domSupported && !py(t)) {
    var a = t[Qf] || (t[Qf] = {}), o = P1(t, a), s = $1(o, a, n);
    if (s)
      return s(e, r, i), !0;
  }
  return !1;
}
function P1(e, t) {
  var r = t.markers;
  if (r)
    return r;
  r = t.markers = [];
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
    ].join("!important;"), e.appendChild(o), r.push(o);
  }
  return r;
}
function $1(e, t, r) {
  for (var i = r ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = e[u].getBoundingClientRect(), c = 2 * u, v = h.left, f = h.top;
    o.push(v, f), l = l && a && v === a[c] && f === a[c + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = r ? jf(s, o) : jf(o, s));
}
function py(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var R1 = /([&<>"'])/g, O1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Zt(e) {
  return e == null ? "" : (e + "").replace(R1, function(t, r) {
    return O1[r];
  });
}
var E1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Hl = [], k1 = X.browser.firefox && +X.browser.version.split(".")[0] < 39;
function yh(e, t, r, i) {
  return r = r || {}, i ? Jf(e, t, r) : k1 && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : Jf(e, t, r), r;
}
function Jf(e, t, r) {
  if (X.domSupported && e.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (py(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = i - a.left, r.zrY = n - a.top;
      return;
    } else if (gh(Hl, e, i, n)) {
      r.zrX = Hl[0], r.zrY = Hl[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function $c(e) {
  return e || window.event;
}
function ce(e, t, r) {
  if (t = $c(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && yh(e, o, t, r);
  } else {
    yh(e, t, t, r);
    var a = N1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && E1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function N1(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, i = e.deltaY;
  if (r == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : r), a = i > 0 ? -1 : i < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * n * a;
}
function B1(e, t, r, i) {
  e.addEventListener(t, r, i);
}
function z1(e, t, r, i) {
  e.removeEventListener(t, r, i);
}
var Fa = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, F1 = function() {
  function e() {
    this._track = [];
  }
  return e.prototype.recognize = function(t, r, i) {
    return this._doTrack(t, r, i), this._recognize(t);
  }, e.prototype.clear = function() {
    return this._track.length = 0, this;
  }, e.prototype._doTrack = function(t, r, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: r,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var l = n[o], u = yh(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Vl)
      if (Vl.hasOwnProperty(r)) {
        var i = Vl[r](this._track, t);
        if (i)
          return i;
      }
  }, e;
}();
function tv(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function H1(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Vl = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var i = (e[r - 1] || {}).points, n = (e[r - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = tv(i) / tv(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = H1(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function gn() {
  return [1, 0, 0, 1, 0, 0];
}
function Rc(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function V1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function yn(e, t, r) {
  var i = t[0] * r[0] + t[2] * r[1], n = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function mh(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function Oc(e, t, r, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(r), c = Math.cos(r);
  return e[0] = n * c + s * h, e[1] = -n * h + s * c, e[2] = a * c + l * h, e[3] = -a * h + c * l, e[4] = c * (o - i[0]) + h * (u - i[1]) + i[0], e[5] = c * (u - i[1]) - h * (o - i[0]) + i[1], e;
}
function G1(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = t[0] * i, e[1] = t[1] * n, e[2] = t[2] * i, e[3] = t[3] * n, e[4] = t[4] * i, e[5] = t[5] * n, e;
}
function Ec(e, t) {
  var r = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = r * o - a * i;
  return l ? (l = 1 / l, e[0] = o * l, e[1] = -a * l, e[2] = -i * l, e[3] = r * l, e[4] = (i * s - o * n) * l, e[5] = (a * n - r * s) * l, e) : null;
}
var dt = function() {
  function e(t, r) {
    this.x = t || 0, this.y = r || 0;
  }
  return e.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, e.prototype.clone = function() {
    return new e(this.x, this.y);
  }, e.prototype.set = function(t, r) {
    return this.x = t, this.y = r, this;
  }, e.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, e.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, e.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, e.prototype.scaleAndAdd = function(t, r) {
    this.x += t.x * r, this.y += t.y * r;
  }, e.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, e.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, e.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, e.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, e.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, e.prototype.distance = function(t) {
    var r = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(r * r + i * i);
  }, e.prototype.distanceSquare = function(t) {
    var r = this.x - t.x, i = this.y - t.y;
    return r * r + i * i;
  }, e.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, e.prototype.transform = function(t) {
    if (t) {
      var r = this.x, i = this.y;
      return this.x = t[0] * r + t[2] * i + t[4], this.y = t[1] * r + t[3] * i + t[5], this;
    }
  }, e.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, e.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.set = function(t, r, i) {
    t.x = r, t.y = i;
  }, e.copy = function(t, r) {
    t.x = r.x, t.y = r.y;
  }, e.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, e.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, e.dot = function(t, r) {
    return t.x * r.x + t.y * r.y;
  }, e.add = function(t, r, i) {
    t.x = r.x + i.x, t.y = r.y + i.y;
  }, e.sub = function(t, r, i) {
    t.x = r.x - i.x, t.y = r.y - i.y;
  }, e.scale = function(t, r, i) {
    t.x = r.x * i, t.y = r.y * i;
  }, e.scaleAndAdd = function(t, r, i, n) {
    t.x = r.x + i.x * n, t.y = r.y + i.y * n;
  }, e.lerp = function(t, r, i, n) {
    var a = 1 - n;
    t.x = a * r.x + n * i.x, t.y = a * r.y + n * i.y;
  }, e;
}(), yo = Math.min, mo = Math.max, Kr = new dt(), jr = new dt(), Qr = new dt(), Jr = new dt(), Un = new dt(), Yn = new dt(), lt = function() {
  function e(t, r, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (r = r + n, n = -n), this.x = t, this.y = r, this.width = i, this.height = n;
  }
  return e.prototype.union = function(t) {
    var r = yo(t.x, this.x), i = yo(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = mo(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = mo(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = r, this.y = i;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    var r = this, i = t.width / r.width, n = t.height / r.height, a = gn();
    return mh(a, a, [-r.x, -r.y]), G1(a, a, [i, n]), mh(a, a, [t.x, t.y]), a;
  }, e.prototype.intersect = function(t, r) {
    if (!t)
      return !1;
    t instanceof e || (t = e.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, h = t.y, c = t.y + t.height, v = !(a < l || u < n || s < h || c < o);
    if (r) {
      var f = 1 / 0, d = 0, g = Math.abs(a - l), p = Math.abs(u - n), y = Math.abs(s - h), m = Math.abs(c - o), _ = Math.min(g, p), b = Math.min(y, m);
      a < l || u < n ? _ > d && (d = _, g < p ? dt.set(Yn, -g, 0) : dt.set(Yn, p, 0)) : _ < f && (f = _, g < p ? dt.set(Un, g, 0) : dt.set(Un, -p, 0)), s < h || c < o ? b > d && (d = b, y < m ? dt.set(Yn, 0, -y) : dt.set(Yn, 0, m)) : _ < f && (f = _, y < m ? dt.set(Un, 0, y) : dt.set(Un, 0, -m));
    }
    return r && dt.copy(r, v ? Un : Yn), v;
  }, e.prototype.contain = function(t, r) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && r >= i.y && r <= i.y + i.height;
  }, e.prototype.clone = function() {
    return new e(this.x, this.y, this.width, this.height);
  }, e.prototype.copy = function(t) {
    e.copy(this, t);
  }, e.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, e.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, e.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, e.create = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e.copy = function(t, r) {
    t.x = r.x, t.y = r.y, t.width = r.width, t.height = r.height;
  }, e.applyTransform = function(t, r, i) {
    if (!i) {
      t !== r && e.copy(t, r);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = r.x * n + o, t.y = r.y * a + s, t.width = r.width * n, t.height = r.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    Kr.x = Qr.x = r.x, Kr.y = Jr.y = r.y, jr.x = Jr.x = r.x + r.width, jr.y = Qr.y = r.y + r.height, Kr.transform(i), Jr.transform(i), jr.transform(i), Qr.transform(i), t.x = yo(Kr.x, jr.x, Qr.x, Jr.x), t.y = yo(Kr.y, jr.y, Qr.y, Jr.y);
    var l = mo(Kr.x, jr.x, Qr.x, Jr.x), u = mo(Kr.y, jr.y, Qr.y, Jr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e;
}(), gy = "silent";
function W1(e, t, r) {
  return {
    type: e,
    event: r,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: r.zrX,
    offsetY: r.zrY,
    gestureEvent: r.gestureEvent,
    pinchX: r.pinchX,
    pinchY: r.pinchY,
    pinchScale: r.pinchScale,
    wheelDelta: r.zrDelta,
    zrByTouch: r.zrByTouch,
    which: r.which,
    stop: U1
  };
}
function U1() {
  Fa(this.event);
}
var Y1 = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(er), Xn = /* @__PURE__ */ function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
}(), X1 = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Gl = new lt(0, 0, 0, 0), yy = function(e) {
  B(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new Xn(0, 0), s.storage = r, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new Y1(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new A1(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (C(X1, function(i) {
      r.on && r.on(i, this[i], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var i = r.zrX, n = r.zrY, a = my(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new Xn(i, n) : this.findHover(i, n), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var i = r.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new Xn(0, 0);
  }, t.prototype.dispatch = function(r, i) {
    var n = this[r];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(r) {
    var i = this.proxy;
    i.setCursor && i.setCursor(r);
  }, t.prototype.dispatchToElement = function(r, i, n) {
    r = r || {};
    var a = r.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = W1(i, r, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(r, i, n) {
    var a = this.storage.getDisplayList(), o = new Xn(r, i);
    if (ev(a, o, r, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new lt(r - u, i - u, l, l), c = a.length - 1; c >= 0; c--) {
        var v = a[c];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Gl.copy(v.getBoundingRect()), v.transform && Gl.applyTransform(v.transform), Gl.intersect(h) && s.push(v));
      }
      if (s.length)
        for (var f = 4, d = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += f)
          for (var y = 0; y < g; y += d) {
            var m = r + p * Math.cos(y), _ = i + p * Math.sin(y);
            if (ev(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, i) {
    this._gestureMgr || (this._gestureMgr = new F1());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new Xn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(er);
C(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  yy.prototype[e] = function(t) {
    var r = t.zrX, i = t.zrY, n = my(this, r, i), a, o;
    if ((e !== "mouseup" || !n) && (a = this.findHover(r, i), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || M1(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function q1(e, t, r) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, r)) {
    for (var i = e, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, r))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? gy : !0;
  }
  return !1;
}
function ev(e, t, r, i, n) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== n && !o.ignore && (s = q1(o, r, i)) && (!t.topTarget && (t.topTarget = o), s !== gy)) {
      t.target = o;
      break;
    }
  }
}
function my(e, t, r) {
  var i = e.painter;
  return t < 0 || t > i.getWidth() || r < 0 || r > i.getHeight();
}
var _y = 32, qn = 7;
function Z1(e) {
  for (var t = 0; e >= _y; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function rv(e, t, r, i) {
  var n = t + 1;
  if (n === r)
    return 1;
  if (i(e[n++], e[t]) < 0) {
    for (; n < r && i(e[n], e[n - 1]) < 0; )
      n++;
    K1(e, t, n);
  } else
    for (; n < r && i(e[n], e[n - 1]) >= 0; )
      n++;
  return n - t;
}
function K1(e, t, r) {
  for (r--; t < r; ) {
    var i = e[t];
    e[t++] = e[r], e[r--] = i;
  }
}
function iv(e, t, r, i, n) {
  for (i === t && i++; i < r; i++) {
    for (var a = e[i], o = t, s = i, l; o < s; )
      l = o + s >>> 1, n(a, e[l]) < 0 ? s = l : o = l + 1;
    var u = i - o;
    switch (u) {
      case 3:
        e[o + 3] = e[o + 2];
      case 2:
        e[o + 2] = e[o + 1];
      case 1:
        e[o + 1] = e[o];
        break;
      default:
        for (; u > 0; )
          e[o + u] = e[o + u - 1], u--;
    }
    e[o] = a;
  }
}
function Wl(e, t, r, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + n]) > 0) {
    for (s = i - n; l < s && a(e, t[r + n + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  } else {
    for (s = n + 1; l < s && a(e, t[r + n - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(e, t[r + h]) > 0 ? o = h + 1 : l = h;
  }
  return l;
}
function Ul(e, t, r, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + n]) < 0) {
    for (s = n + 1; l < s && a(e, t[r + n - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  } else {
    for (s = i - n; l < s && a(e, t[r + n + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(e, t[r + h]) < 0 ? l = h : o = h + 1;
  }
  return l;
}
function j1(e, t) {
  var r = qn, i, n, a = 0, o = [];
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
    var m = Ul(e[p], e, d, g, 0, t);
    d += m, g -= m, g !== 0 && (y = Wl(e[d + g - 1], e, p, y, y - 1, t), y !== 0 && (g <= y ? c(d, g, p, y) : v(d, g, p, y)));
  }
  function c(f, d, g, p) {
    var y = 0;
    for (y = 0; y < d; y++)
      o[y] = e[f + y];
    var m = 0, _ = g, b = f;
    if (e[b++] = e[_++], --p === 0) {
      for (y = 0; y < d; y++)
        e[b + y] = o[m + y];
      return;
    }
    if (d === 1) {
      for (y = 0; y < p; y++)
        e[b + y] = e[_ + y];
      e[b + p] = o[m];
      return;
    }
    for (var S = r, w, x, M; ; ) {
      w = 0, x = 0, M = !1;
      do
        if (t(e[_], o[m]) < 0) {
          if (e[b++] = e[_++], x++, w = 0, --p === 0) {
            M = !0;
            break;
          }
        } else if (e[b++] = o[m++], w++, x = 0, --d === 1) {
          M = !0;
          break;
        }
      while ((w | x) < S);
      if (M)
        break;
      do {
        if (w = Ul(e[_], o, m, d, 0, t), w !== 0) {
          for (y = 0; y < w; y++)
            e[b + y] = o[m + y];
          if (b += w, m += w, d -= w, d <= 1) {
            M = !0;
            break;
          }
        }
        if (e[b++] = e[_++], --p === 0) {
          M = !0;
          break;
        }
        if (x = Wl(o[m], e, _, p, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            e[b + y] = e[_ + y];
          if (b += x, _ += x, p -= x, p === 0) {
            M = !0;
            break;
          }
        }
        if (e[b++] = o[m++], --d === 1) {
          M = !0;
          break;
        }
        S--;
      } while (w >= qn || x >= qn);
      if (M)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (r = S, r < 1 && (r = 1), d === 1) {
      for (y = 0; y < p; y++)
        e[b + y] = e[_ + y];
      e[b + p] = o[m];
    } else {
      if (d === 0)
        throw new Error();
      for (y = 0; y < d; y++)
        e[b + y] = o[m + y];
    }
  }
  function v(f, d, g, p) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = e[g + y];
    var m = f + d - 1, _ = p - 1, b = g + p - 1, S = 0, w = 0;
    if (e[b--] = e[m--], --d === 0) {
      for (S = b - (p - 1), y = 0; y < p; y++)
        e[S + y] = o[y];
      return;
    }
    if (p === 1) {
      for (b -= d, m -= d, w = b + 1, S = m + 1, y = d - 1; y >= 0; y--)
        e[w + y] = e[S + y];
      e[b] = o[_];
      return;
    }
    for (var x = r; ; ) {
      var M = 0, D = 0, A = !1;
      do
        if (t(o[_], e[m]) < 0) {
          if (e[b--] = e[m--], M++, D = 0, --d === 0) {
            A = !0;
            break;
          }
        } else if (e[b--] = o[_--], D++, M = 0, --p === 1) {
          A = !0;
          break;
        }
      while ((M | D) < x);
      if (A)
        break;
      do {
        if (M = d - Ul(o[_], e, f, d, d - 1, t), M !== 0) {
          for (b -= M, m -= M, d -= M, w = b + 1, S = m + 1, y = M - 1; y >= 0; y--)
            e[w + y] = e[S + y];
          if (d === 0) {
            A = !0;
            break;
          }
        }
        if (e[b--] = o[_--], --p === 1) {
          A = !0;
          break;
        }
        if (D = p - Wl(e[m], o, 0, p, p - 1, t), D !== 0) {
          for (b -= D, _ -= D, p -= D, w = b + 1, S = _ + 1, y = 0; y < D; y++)
            e[w + y] = o[S + y];
          if (p <= 1) {
            A = !0;
            break;
          }
        }
        if (e[b--] = e[m--], --d === 0) {
          A = !0;
          break;
        }
        x--;
      } while (M >= qn || D >= qn);
      if (A)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (r = x, r < 1 && (r = 1), p === 1) {
      for (b -= d, m -= d, w = b + 1, S = m + 1, y = d - 1; y >= 0; y--)
        e[w + y] = e[S + y];
      e[b] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (S = b - (p - 1), y = 0; y < p; y++)
        e[S + y] = o[y];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function as(e, t, r, i) {
  r || (r = 0), i || (i = e.length);
  var n = i - r;
  if (!(n < 2)) {
    var a = 0;
    if (n < _y) {
      a = rv(e, r, i, t), iv(e, r, i, r + a, t);
      return;
    }
    var o = j1(e, t), s = Z1(n);
    do {
      if (a = rv(e, r, i, t), a < s) {
        var l = n;
        l > s && (l = s), iv(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), n -= a, r += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var ae = 1, da = 2, ln = 4, nv = !1;
function Yl() {
  nv || (nv = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function av(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var Q1 = function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = av;
  }
  return e.prototype.traverse = function(t, r) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, r);
  }, e.prototype.getDisplayList = function(t, r) {
    r = r || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(r), i;
  }, e.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var r = this._roots, i = this._displayList, n = 0, a = r.length; n < a; n++)
      this._updateAndAddDisplayable(r[n], null, t);
    i.length = this._displayListLen, as(i, av);
  }, e.prototype._updateAndAddDisplayable = function(t, r, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        r = null;
      else if (n) {
        r ? r = r.slice() : r = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), r.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= ae), this._updateAndAddDisplayable(u, r, i);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        r && r.length ? h.__clipPaths = r : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (Yl(), h.z = 0), isNaN(h.z2) && (Yl(), h.z2 = 0), isNaN(h.zlevel) && (Yl(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
      }
      var c = t.getDecalElement && t.getDecalElement();
      c && this._updateAndAddDisplayable(c, r, i);
      var v = t.getTextGuideLine();
      v && this._updateAndAddDisplayable(v, r, i);
      var f = t.getTextContent();
      f && this._updateAndAddDisplayable(f, r, i);
    }
  }, e.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, e.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var r = 0, i = t.length; r < i; r++)
        this.delRoot(t[r]);
      return;
    }
    var n = vt(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, e.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, e.prototype.getRoots = function() {
    return this._roots;
  }, e.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, e;
}(), Ms;
Ms = X.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var xa = {
  linear: function(e) {
    return e;
  },
  quadraticIn: function(e) {
    return e * e;
  },
  quadraticOut: function(e) {
    return e * (2 - e);
  },
  quadraticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
  },
  cubicIn: function(e) {
    return e * e * e;
  },
  cubicOut: function(e) {
    return --e * e * e + 1;
  },
  cubicInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
  },
  quarticIn: function(e) {
    return e * e * e * e;
  },
  quarticOut: function(e) {
    return 1 - --e * e * e * e;
  },
  quarticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2);
  },
  quinticIn: function(e) {
    return e * e * e * e * e;
  },
  quinticOut: function(e) {
    return --e * e * e * e * e + 1;
  },
  quinticInOut: function(e) {
    return (e *= 2) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2);
  },
  sinusoidalIn: function(e) {
    return 1 - Math.cos(e * Math.PI / 2);
  },
  sinusoidalOut: function(e) {
    return Math.sin(e * Math.PI / 2);
  },
  sinusoidalInOut: function(e) {
    return 0.5 * (1 - Math.cos(Math.PI * e));
  },
  exponentialIn: function(e) {
    return e === 0 ? 0 : Math.pow(1024, e - 1);
  },
  exponentialOut: function(e) {
    return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
  },
  exponentialInOut: function(e) {
    return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? 0.5 * Math.pow(1024, e - 1) : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
  },
  circularIn: function(e) {
    return 1 - Math.sqrt(1 - e * e);
  },
  circularOut: function(e) {
    return Math.sqrt(1 - --e * e);
  },
  circularInOut: function(e) {
    return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  },
  elasticIn: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(e) {
    var t, r = 0.1, i = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), (e *= 2) < 1 ? -0.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i)) : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(e) {
    var t = 1.70158;
    return e * e * ((t + 1) * e - t);
  },
  backOut: function(e) {
    var t = 1.70158;
    return --e * e * ((t + 1) * e + t) + 1;
  },
  backInOut: function(e) {
    var t = 2.5949095;
    return (e *= 2) < 1 ? 0.5 * (e * e * ((t + 1) * e - t)) : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
  },
  bounceIn: function(e) {
    return 1 - xa.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? xa.bounceIn(e * 2) * 0.5 : xa.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, _o = Math.pow, Hr = Math.sqrt, Ds = 1e-8, by = 1e-4, ov = Hr(3), bo = 1 / 3, We = Bn(), de = Bn(), mn = Bn();
function Br(e) {
  return e > -Ds && e < Ds;
}
function wy(e) {
  return e > Ds || e < -Ds;
}
function $t(e, t, r, i, n) {
  var a = 1 - n;
  return a * a * (a * e + 3 * n * t) + n * n * (n * i + 3 * a * r);
}
function sv(e, t, r, i, n) {
  var a = 1 - n;
  return 3 * (((t - e) * a + 2 * (r - t) * n) * a + (i - r) * n * n);
}
function As(e, t, r, i, n, a) {
  var o = i + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - n, h = s * s - 3 * o * l, c = s * l - 9 * o * u, v = l * l - 3 * s * u, f = 0;
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
      _ < 0 ? _ = -_o(-_, bo) : _ = _o(_, bo), b < 0 ? b = -_o(-b, bo) : b = _o(b, bo);
      var d = (-s - (_ + b)) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d);
    } else {
      var S = (2 * h * s - 3 * o * c) / (2 * Hr(h * h * h)), w = Math.acos(S) / 3, x = Hr(h), M = Math.cos(w), d = (-s - 2 * x * M) / (3 * o), y = (-s + x * (M + ov * Math.sin(w))) / (3 * o), D = (-s + x * (M - ov * Math.sin(w))) / (3 * o);
      d >= 0 && d <= 1 && (a[f++] = d), y >= 0 && y <= 1 && (a[f++] = y), D >= 0 && D <= 1 && (a[f++] = D);
    }
  }
  return f;
}
function Sy(e, t, r, i, n) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * i - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (Br(o)) {
    if (wy(a)) {
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
function Is(e, t, r, i, n, a) {
  var o = (t - e) * n + e, s = (r - t) * n + t, l = (i - r) * n + r, u = (s - o) * n + o, h = (l - s) * n + s, c = (h - u) * n + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i;
}
function J1(e, t, r, i, n, a, o, s, l, u, h) {
  var c, v = 5e-3, f = 1 / 0, d, g, p, y;
  We[0] = l, We[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    de[0] = $t(e, r, n, o, m), de[1] = $t(t, i, a, s, m), p = pn(We, de), p < f && (c = m, f = p);
  f = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < by); _++)
    d = c - v, g = c + v, de[0] = $t(e, r, n, o, d), de[1] = $t(t, i, a, s, d), p = pn(de, We), d >= 0 && p < f ? (c = d, f = p) : (mn[0] = $t(e, r, n, o, g), mn[1] = $t(t, i, a, s, g), y = pn(mn, We), g <= 1 && y < f ? (c = g, f = y) : v *= 0.5);
  return Hr(f);
}
function tw(e, t, r, i, n, a, o, s, l) {
  for (var u = e, h = t, c = 0, v = 1 / l, f = 1; f <= l; f++) {
    var d = f * v, g = $t(e, r, n, o, d), p = $t(t, i, a, s, d), y = g - u, m = p - h;
    c += Math.sqrt(y * y + m * m), u = g, h = p;
  }
  return c;
}
function Kt(e, t, r, i) {
  var n = 1 - i;
  return n * (n * e + 2 * i * t) + i * i * r;
}
function lv(e, t, r, i) {
  return 2 * ((1 - i) * (t - e) + i * (r - t));
}
function ew(e, t, r, i, n) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - i, l = 0;
  if (Br(a)) {
    if (wy(o)) {
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
function xy(e, t, r) {
  var i = e + r - 2 * t;
  return i === 0 ? 0.5 : (e - t) / i;
}
function Ls(e, t, r, i, n) {
  var a = (t - e) * i + e, o = (r - t) * i + t, s = (o - a) * i + a;
  n[0] = e, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = r;
}
function rw(e, t, r, i, n, a, o, s, l) {
  var u, h = 5e-3, c = 1 / 0;
  We[0] = o, We[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    de[0] = Kt(e, r, n, v), de[1] = Kt(t, i, a, v);
    var f = pn(We, de);
    f < c && (u = v, c = f);
  }
  c = 1 / 0;
  for (var d = 0; d < 32 && !(h < by); d++) {
    var g = u - h, p = u + h;
    de[0] = Kt(e, r, n, g), de[1] = Kt(t, i, a, g);
    var f = pn(de, We);
    if (g >= 0 && f < c)
      u = g, c = f;
    else {
      mn[0] = Kt(e, r, n, p), mn[1] = Kt(t, i, a, p);
      var y = pn(mn, We);
      p <= 1 && y < c ? (u = p, c = y) : h *= 0.5;
    }
  }
  return Hr(c);
}
function iw(e, t, r, i, n, a, o) {
  for (var s = e, l = t, u = 0, h = 1 / o, c = 1; c <= o; c++) {
    var v = c * h, f = Kt(e, r, n, v), d = Kt(t, i, a, v), g = f - s, p = d - l;
    u += Math.sqrt(g * g + p * p), s = f, l = d;
  }
  return u;
}
var nw = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Ty(e) {
  var t = e && nw.exec(e);
  if (t) {
    var r = t[1].split(","), i = +Ue(r[0]), n = +Ue(r[1]), a = +Ue(r[2]), o = +Ue(r[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : As(0, i, a, 1, l, s) && $t(0, n, o, 1, s[0]);
    };
  }
}
var aw = function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Wt, this.ondestroy = t.ondestroy || Wt, this.onrestart = t.onrestart || Wt, t.easing && this.setEasing(t.easing);
  }
  return e.prototype.step = function(t, r) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += r;
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
  }, e.prototype.pause = function() {
    this._paused = !0;
  }, e.prototype.resume = function() {
    this._paused = !1;
  }, e.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = Z(t) ? t : xa[t] || Ty(t);
  }, e;
}(), Cy = /* @__PURE__ */ function() {
  function e(t) {
    this.value = t;
  }
  return e;
}(), ow = function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new Cy(t);
    return this.insertEntry(r), r;
  }, e.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, e.prototype.remove = function(t) {
    var r = t.prev, i = t.next;
    r ? r.next = i : this.head = i, i ? i.prev = r : this.tail = r, t.next = t.prev = null, this._len--;
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, e;
}(), oo = function() {
  function e(t) {
    this._list = new ow(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new Cy(r), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, e.prototype.get = function(t) {
    var r = this._map[t], i = this._list;
    if (r != null)
      return r !== i.tail && (i.remove(r), i.insertEntry(r)), r.value;
  }, e.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, e.prototype.len = function() {
    return this._list.len();
  }, e;
}(), uv = {
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
function Pe(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function sw(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 360 ? 360 : e;
}
function Ha(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Xl(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Pe(parseFloat(t) / 100 * 255) : Pe(parseInt(t, 10));
}
function Ci(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Ha(parseFloat(t) / 100) : Ha(parseFloat(t));
}
function ql(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function zr(e, t, r) {
  return e + (t - e) * r;
}
function he(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function _h(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var My = new oo(20), wo = null;
function Wi(e, t) {
  wo && _h(wo, t), wo = My.put(e, wo || t.slice());
}
function _e(e, t) {
  if (e) {
    t = t || [];
    var r = My.get(e);
    if (r)
      return _h(t, r);
    e = e + "";
    var i = e.replace(/ /g, "").toLowerCase();
    if (i in uv)
      return _h(t, uv[i]), Wi(e, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          he(t, 0, 0, 0, 1);
          return;
        }
        return he(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Wi(e, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          he(t, 0, 0, 0, 1);
          return;
        }
        return he(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Wi(e, t), t;
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
            return he(t, Xl(u[0]), Xl(u[1]), Xl(u[2]), u.length === 3 ? h : Ci(u[3])), Wi(e, t), t;
          he(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            he(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Ci(u[3]), bh(u, t), Wi(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            he(t, 0, 0, 0, 1);
            return;
          }
          return bh(u, t), Wi(e, t), t;
        default:
          return;
      }
    }
    he(t, 0, 0, 0, 1);
  }
}
function bh(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, i = Ci(e[1]), n = Ci(e[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], he(t, Pe(ql(o, a, r + 1 / 3) * 255), Pe(ql(o, a, r) * 255), Pe(ql(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function lw(e) {
  if (e) {
    var t = e[0] / 255, r = e[1] / 255, i = e[2] / 255, n = Math.min(t, r, i), a = Math.max(t, r, i), o = a - n, s = (a + n) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + n) : u = o / (2 - a - n);
      var h = ((a - t) / 6 + o / 2) / o, c = ((a - r) / 6 + o / 2) / o, v = ((a - i) / 6 + o / 2) / o;
      t === a ? l = v - c : r === a ? l = 1 / 3 + h - v : i === a && (l = 2 / 3 + c - h), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var f = [l * 360, u, s];
    return e[3] != null && f.push(e[3]), f;
  }
}
function hv(e, t) {
  var r = _e(e);
  if (r) {
    for (var i = 0; i < 3; i++)
      r[i] = r[i] * (1 - t) | 0, r[i] > 255 ? r[i] = 255 : r[i] < 0 && (r[i] = 0);
    return fr(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function Zl(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    r = r || [];
    var i = e * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = t[n], s = t[a], l = i - n;
    return r[0] = Pe(zr(o[0], s[0], l)), r[1] = Pe(zr(o[1], s[1], l)), r[2] = Pe(zr(o[2], s[2], l)), r[3] = Ha(zr(o[3], s[3], l)), r;
  }
}
function uw(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    var i = e * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = _e(t[n]), s = _e(t[a]), l = i - n, u = fr([
      Pe(zr(o[0], s[0], l)),
      Pe(zr(o[1], s[1], l)),
      Pe(zr(o[2], s[2], l)),
      Ha(zr(o[3], s[3], l))
    ], "rgba");
    return r ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function Kl(e, t, r, i) {
  var n = _e(e);
  if (e)
    return n = lw(n), t != null && (n[0] = sw(t)), r != null && (n[1] = Ci(r)), i != null && (n[2] = Ci(i)), fr(bh(n), "rgba");
}
function hw(e, t) {
  var r = _e(e);
  if (r && t != null)
    return r[3] = Ha(t), fr(r, "rgba");
}
function fr(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function Ps(e, t) {
  var r = _e(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var cv = new oo(100);
function fv(e) {
  if (H(e)) {
    var t = cv.get(e);
    return t || (t = hv(e, -0.1), cv.put(e, t)), t;
  } else if (il(e)) {
    var r = N({}, e);
    return r.colorStops = U(e.colorStops, function(i) {
      return {
        offset: i.offset,
        color: hv(i.color, -0.1)
      };
    }), r;
  }
  return e;
}
function cw(e) {
  return e.type === "linear";
}
function fw(e) {
  return e.type === "radial";
}
(function() {
  return X.hasGlobalWindow && Z(window.btoa) ? function(e) {
    return window.btoa(unescape(encodeURIComponent(e)));
  } : typeof Buffer < "u" ? function(e) {
    return Buffer.from(e).toString("base64");
  } : function(e) {
    return null;
  };
})();
var wh = Array.prototype.slice;
function sr(e, t, r) {
  return (t - e) * r + e;
}
function jl(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = sr(t[a], r[a], i);
  return e;
}
function vw(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = sr(t[o][s], r[o][s], i);
  }
  return e;
}
function So(e, t, r, i) {
  for (var n = t.length, a = 0; a < n; a++)
    e[a] = t[a] + r[a] * i;
  return e;
}
function vv(e, t, r, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * i;
  }
  return e;
}
function dw(e, t) {
  for (var r = e.length, i = t.length, n = r > i ? t : e, a = Math.min(r, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function pw(e, t, r) {
  var i = e, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(r === 1 ? n[l] : wh.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (r === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(i[l][h]) && (i[l][h] = n[l][h]);
  }
}
function os(e) {
  if (Jt(e)) {
    var t = e.length;
    if (Jt(e[0])) {
      for (var r = [], i = 0; i < t; i++)
        r.push(wh.call(e[i]));
      return r;
    }
    return wh.call(e);
  }
  return e;
}
function ss(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function gw(e) {
  return Jt(e && e[0]) ? 2 : 1;
}
var xo = 0, ls = 1, Dy = 2, pa = 3, Sh = 4, xh = 5, dv = 6;
function pv(e) {
  return e === Sh || e === xh;
}
function To(e) {
  return e === ls || e === Dy;
}
var Zn = [0, 0, 0, 0], yw = function() {
  function e(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return e.prototype.isFinished = function() {
    return this._finished;
  }, e.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, e.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, e.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, e.prototype.addKeyframe = function(t, r, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = dv, l = r;
    if (Jt(r)) {
      var u = gw(r);
      s = u, (u === 1 && !yt(r[0]) || u === 2 && !yt(r[0][0])) && (o = !0);
    } else if (yt(r) && !Cs(r))
      s = xo;
    else if (H(r))
      if (!isNaN(+r))
        s = xo;
      else {
        var h = _e(r);
        h && (l = h, s = pa);
      }
    else if (il(r)) {
      var c = N({}, l);
      c.colorStops = U(r.colorStops, function(f) {
        return {
          offset: f.offset,
          color: _e(f.color)
        };
      }), cw(r) ? s = Sh : fw(r) && (s = xh), l = c;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === dv) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = Z(i) ? i : xa[i] || Ty(i)), n.push(v), v;
  }, e.prototype.prepare = function(t, r) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = To(n), u = pv(n), h = 0; h < a; h++) {
      var c = i[h], v = c.value, f = o.value;
      c.percent = c.time / t, s || (l && h !== a - 1 ? pw(v, f, n) : u && dw(v.colorStops, f.colorStops));
    }
    if (!s && n !== xh && r && this.needsAnimate() && r.needsAnimate() && n === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var d = i[0].value, h = 0; h < a; h++)
        n === xo ? i[h].additiveValue = i[h].value - d : n === pa ? i[h].additiveValue = So([], i[h].value, d, -1) : To(n) && (i[h].additiveValue = n === ls ? So([], i[h].value, d, -1) : vv([], i[h].value, d, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === pa, h, c = this._lastFr, v = Math.min, f, d;
      if (s === 1)
        f = d = o[0];
      else {
        if (r < 0)
          h = 0;
        else if (r < this._lastFrP) {
          var g = v(c + 1, s - 1);
          for (h = g; h >= 0 && !(o[h].percent <= r); h--)
            ;
          h = v(h, s - 2);
        } else {
          for (h = c; h < s && !(o[h].percent > r); h++)
            ;
          h = v(h - 1, s - 2);
        }
        d = o[h + 1], f = o[h];
      }
      if (f && d) {
        this._lastFr = h, this._lastFrP = r;
        var p = d.percent - f.percent, y = p === 0 ? 1 : v((r - f.percent) / p, 1);
        d.easingFunc && (y = d.easingFunc(y));
        var m = i ? this._additiveValue : u ? Zn : t[l];
        if ((To(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? f.rawValue : d.rawValue;
        else if (To(a))
          a === ls ? jl(m, f[n], d[n], y) : vw(m, f[n], d[n], y);
        else if (pv(a)) {
          var _ = f[n], b = d[n], S = a === Sh;
          t[l] = {
            type: S ? "linear" : "radial",
            x: sr(_.x, b.x, y),
            y: sr(_.y, b.y, y),
            colorStops: U(_.colorStops, function(x, M) {
              var D = b.colorStops[M];
              return {
                offset: sr(x.offset, D.offset, y),
                color: ss(jl([], x.color, D.color, y))
              };
            }),
            global: b.global
          }, S ? (t[l].x2 = sr(_.x2, b.x2, y), t[l].y2 = sr(_.y2, b.y2, y)) : t[l].r = sr(_.r, b.r, y);
        } else if (u)
          jl(m, f[n], d[n], y), i || (t[l] = ss(m));
        else {
          var w = sr(f[n], d[n], y);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, i = this.propName, n = this._additiveValue;
    r === xo ? t[i] = t[i] + n : r === pa ? (_e(t[i], Zn), So(Zn, Zn, n, 1), t[i] = ss(Zn)) : r === ls ? So(t[i], t[i], n, 1) : r === Dy && vv(t[i], t[i], n, 1);
  }, e;
}(), kc = function() {
  function e(t, r, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && n) {
      Lc("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return e.prototype.getMaxTime = function() {
    return this._maxTime;
  }, e.prototype.getDelay = function() {
    return this._delay;
  }, e.prototype.getLoop = function() {
    return this._loop;
  }, e.prototype.getTarget = function() {
    return this._target;
  }, e.prototype.changeTarget = function(t) {
    this._target = t;
  }, e.prototype.when = function(t, r, i) {
    return this.whenWithKeys(t, r, gt(r), i);
  }, e.prototype.whenWithKeys = function(t, r, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new yw(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var c = h.keyframes, v = c[c.length - 1];
          u = v && v.value, h.valType === pa && u && (u = ss(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, os(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, os(r[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, e.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, e.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, e.prototype.isPaused = function() {
    return !!this._paused;
  }, e.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, e.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var r = t.length, i = 0; i < r; i++)
        t[i].call(this);
  }, e.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, r = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, r)
      for (var i = 0; i < r.length; i++)
        r[i].call(this);
  }, e.prototype._setTracksFinished = function() {
    for (var t = this._tracks, r = this._trackKeys, i = 0; i < r.length; i++)
      t[r[i]].setFinished();
  }, e.prototype._getAdditiveTrack = function(t) {
    var r, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (r = a);
      }
    return r;
  }, e.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var r = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, h = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var c = u[h - 1];
            c && (r._target[s.propName] = c.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new aw({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(f) {
            r._started = 2;
            var d = r._additiveAnimators;
            if (d) {
              for (var g = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  g = !0;
                  break;
                }
              g || (r._additiveAnimators = null);
            }
            for (var p = 0; p < i.length; p++)
              i[p].step(r._target, f);
            var y = r._onframeCbs;
            if (y)
              for (var p = 0; p < y.length; p++)
                y[p](r._target, f);
          },
          ondestroy: function() {
            r._doneCallback();
          }
        });
        this._clip = v, this.animation && this.animation.addClip(v), t && v.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, e.prototype.stop = function(t) {
    if (this._clip) {
      var r = this._clip;
      t && r.onframe(1), this._abortedCallback();
    }
  }, e.prototype.delay = function(t) {
    return this._delay = t, this;
  }, e.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, e.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, e.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, e.prototype.getClip = function() {
    return this._clip;
  }, e.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, e.prototype.getTracks = function() {
    var t = this;
    return U(this._trackKeys, function(r) {
      return t._tracks[r];
    });
  }, e.prototype.stopTracks = function(t, r) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (r ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, e.prototype.saveTo = function(t, r, i) {
    if (t) {
      r = r || this._trackKeys;
      for (var n = 0; n < r.length; n++) {
        var a = r[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[i ? 0 : s.length - 1];
          l && (t[a] = os(l.rawValue));
        }
      }
    }
  }, e.prototype.__changeFinalValue = function(t, r) {
    r = r || gt(t);
    for (var i = 0; i < r.length; i++) {
      var n = r[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, e;
}();
function fn() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var mw = function(e) {
  B(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, r = r || {}, i.stage = r.stage || {}, i;
  }
  return t.prototype.addClip = function(r) {
    r.animation && this.removeClip(r), this._head ? (this._tail.next = r, r.prev = this._tail, r.next = null, this._tail = r) : this._head = this._tail = r, r.animation = this;
  }, t.prototype.addAnimator = function(r) {
    r.animation = this;
    var i = r.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(r) {
    if (r.animation) {
      var i = r.prev, n = r.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, r.next = r.prev = r.animation = null;
    }
  }, t.prototype.removeAnimator = function(r) {
    var i = r.getClip();
    i && this.removeClip(i), r.animation = null;
  }, t.prototype.update = function(r) {
    for (var i = fn() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, r || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function i() {
      r._running && (Ms(i), !r._paused && r.update());
    }
    Ms(i);
  }, t.prototype.start = function() {
    this._running || (this._time = fn(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = fn(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += fn() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var r = this._head; r; ) {
      var i = r.next;
      r.prev = r.next = r.animation = null, r = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(r, i) {
    i = i || {}, this.start();
    var n = new kc(r, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(er), _w = 300, Ql = X.domSupported, Jl = function() {
  var e = [
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
  ], r = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = U(e, function(n) {
    var a = n.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: e,
    touch: t,
    pointer: i
  };
}(), gv = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, yv = !1;
function Th(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function bw(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function tu(e) {
  e && (e.zrByTouch = !0);
}
function ww(e, t) {
  return ce(e.dom, new Sw(e, t), !0);
}
function Ay(e, t) {
  for (var r = t, i = !1; r && r.nodeType !== 9 && !(i = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return i;
}
var Sw = /* @__PURE__ */ function() {
  function e(t, r) {
    this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return e;
}(), Ae = {
  mousedown: function(e) {
    e = ce(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
  },
  mousemove: function(e) {
    e = ce(this.dom, e);
    var t = this.__mayPointerCapture;
    t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    e = ce(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
  },
  mouseout: function(e) {
    e = ce(this.dom, e);
    var t = e.toElement || e.relatedTarget;
    Ay(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    yv = !0, e = ce(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    yv || (e = ce(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = ce(this.dom, e), tu(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), Ae.mousemove.call(this, e), Ae.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = ce(this.dom, e), tu(e), this.handler.processGesture(e, "change"), Ae.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = ce(this.dom, e), tu(e), this.handler.processGesture(e, "end"), Ae.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < _w && Ae.click.call(this, e);
  },
  pointerdown: function(e) {
    Ae.mousedown.call(this, e);
  },
  pointermove: function(e) {
    Th(e) || Ae.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Ae.mouseup.call(this, e);
  },
  pointerout: function(e) {
    Th(e) || Ae.mouseout.call(this, e);
  }
};
C(["click", "dblclick", "contextmenu"], function(e) {
  Ae[e] = function(t) {
    t = ce(this.dom, t), this.trigger(e, t);
  };
});
var Ch = {
  pointermove: function(e) {
    Th(e) || Ch.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Ch.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function xw(e, t) {
  var r = t.domHandlers;
  X.pointerEventsSupported ? C(Jl.pointer, function(i) {
    us(t, i, function(n) {
      r[i].call(e, n);
    });
  }) : (X.touchEventsSupported && C(Jl.touch, function(i) {
    us(t, i, function(n) {
      r[i].call(e, n), bw(t);
    });
  }), C(Jl.mouse, function(i) {
    us(t, i, function(n) {
      n = $c(n), t.touching || r[i].call(e, n);
    });
  }));
}
function Tw(e, t) {
  X.pointerEventsSupported ? C(gv.pointer, r) : X.touchEventsSupported || C(gv.mouse, r);
  function r(i) {
    function n(a) {
      a = $c(a), Ay(e, a.target) || (a = ww(e, a), t.domHandlers[i].call(e, a));
    }
    us(t, i, n, { capture: !0 });
  }
}
function us(e, t, r, i) {
  e.mounted[t] = r, e.listenerOpts[t] = i, B1(e.domTarget, t, r, i);
}
function eu(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && z1(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var mv = /* @__PURE__ */ function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
}(), Cw = function(e) {
  B(t, e);
  function t(r, i) {
    var n = e.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = r, n.painterRoot = i, n._localHandlerScope = new mv(r, Ae), Ql && (n._globalHandlerScope = new mv(document, Ch)), xw(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    eu(this._localHandlerScope), Ql && eu(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, Ql && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var i = this._globalHandlerScope;
      r ? Tw(this, i) : eu(i);
    }
  }, t;
}(er), Iy = 1;
X.hasGlobalWindow && (Iy = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var $s = Iy, Mh = 0.4, Dh = "#333", Ah = "#ccc", Mw = "#eee", _v = Rc, bv = 5e-5;
function ti(e) {
  return e > bv || e < -bv;
}
var ei = [], Ui = [], ru = gn(), iu = Math.abs, Nc = function() {
  function e() {
  }
  return e.prototype.getLocalTransform = function(t) {
    return e.getLocalTransform(this, t);
  }, e.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, e.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, e.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, e.prototype.needLocalTransform = function() {
    return ti(this.rotation) || ti(this.x) || ti(this.y) || ti(this.scaleX - 1) || ti(this.scaleY - 1) || ti(this.skewX) || ti(this.skewY);
  }, e.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, r = this.needLocalTransform(), i = this.transform;
    if (!(r || t)) {
      i && (_v(i), this.invTransform = null);
      return;
    }
    i = i || gn(), r ? this.getLocalTransform(i) : _v(i), t && (r ? yn(i, t, i) : V1(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(ei);
      var i = ei[0] < 0 ? -1 : 1, n = ei[1] < 0 ? -1 : 1, a = ((ei[0] - i) * r + i) / ei[0] || 0, o = ((ei[1] - n) * r + n) / ei[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || gn(), Ec(this.invTransform, t);
  }, e.prototype.getComputedTransform = function() {
    for (var t = this, r = []; t; )
      r.push(t), t = t.parent;
    for (; t = r.pop(); )
      t.updateTransform();
    return this.transform;
  }, e.prototype.setLocalTransform = function(t) {
    if (t) {
      var r = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), r = Math.sqrt(r), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = r, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, e.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, r = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || gn(), yn(Ui, t.invTransform, r), r = Ui);
      var i = this.originX, n = this.originY;
      (i || n) && (ru[4] = i, ru[5] = n, yn(Ui, r, ru), Ui[4] -= i, Ui[5] -= n, r = Ui), this.setLocalTransform(r);
    }
  }, e.prototype.getGlobalScale = function(t) {
    var r = this.transform;
    return t = t || [], r ? (t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (t[0] = -t[0]), r[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, e.prototype.transformCoordToLocal = function(t, r) {
    var i = [t, r], n = this.invTransform;
    return n && me(i, i, n), i;
  }, e.prototype.transformCoordToGlobal = function(t, r) {
    var i = [t, r], n = this.transform;
    return n && me(i, i, n), i;
  }, e.prototype.getLineScale = function() {
    var t = this.transform;
    return t && iu(t[0] - 1) > 1e-10 && iu(t[3] - 1) > 1e-10 ? Math.sqrt(iu(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    Dw(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, c = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, f = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, g = n + l;
      r[4] = -d * a - v * g * o, r[5] = -g * o - f * d * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = f * a, r[2] = v * o, u && Oc(r, r, u), r[4] += i + h, r[5] += n + c, r;
  }, e.initDefaultProps = function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), e;
}(), Va = [
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
function Dw(e, t) {
  for (var r = 0; r < Va.length; r++) {
    var i = Va[r];
    e[i] = t[i];
  }
}
var wv = {};
function oe(e, t) {
  t = t || Li;
  var r = wv[t];
  r || (r = wv[t] = new oo(500));
  var i = r.get(e);
  return i == null && (i = Wr.measureText(e, t).width, r.put(e, i)), i;
}
function Sv(e, t, r, i) {
  var n = oe(e, t), a = zc(t), o = ga(0, n, r), s = un(0, a, i), l = new lt(o, s, n, a);
  return l;
}
function Bc(e, t, r, i) {
  var n = ((e || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return Sv(n[0], t, r, i);
  for (var o = new lt(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = Sv(n[s], t, r, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function ga(e, t, r) {
  return r === "right" ? e -= t : r === "center" && (e -= t / 2), e;
}
function un(e, t, r) {
  return r === "middle" ? e -= t / 2 : r === "bottom" && (e -= t), e;
}
function zc(e) {
  return oe("国", e);
}
function Ze(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function Rs(e, t, r) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, h = "left", c = "top";
  if (i instanceof Array)
    l += Ze(i[0], r.width), u += Ze(i[1], r.height), h = null, c = null;
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
  return e = e || {}, e.x = l, e.y = u, e.align = h, e.verticalAlign = c, e;
}
var nu = "__zr_normal__", au = Va.concat(["ignore"]), Aw = Nn(Va, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), Yi = {}, Iw = new lt(0, 0, 0, 0), al = function() {
  function e(t) {
    this.id = hy(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return e.prototype._init = function(t) {
    this.attr(t);
  }, e.prototype.drift = function(t, r, i) {
    switch (this.draggable) {
      case "horizontal":
        r = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += r, this.decomposeTransform(), this.markRedraw();
  }, e.prototype.beforeUpdate = function() {
  }, e.prototype.afterUpdate = function() {
  }, e.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, e.prototype.updateInnerText = function(t) {
    var r = this._textContent;
    if (r && (!r.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = r.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = n ? this : null;
      var u = !1;
      if (a.copyTransform(r), i.position != null) {
        var h = Iw;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), n || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(Yi, i, h) : Rs(Yi, i, h), a.x = Yi.x, a.y = Yi.y, o = Yi.align, s = Yi.verticalAlign;
        var c = i.origin;
        if (c && i.rotation != null) {
          var v = void 0, f = void 0;
          c === "center" ? (v = h.width * 0.5, f = h.height * 0.5) : (v = Ze(c[0], h.width), f = Ze(c[1], h.height)), u = !0, a.originX = -a.x + v + (n ? 0 : h.x), a.originY = -a.y + f + (n ? 0 : h.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      g && this.canBeInsideText() ? (y = i.insideFill, m = i.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = i.outsideFill, m = i.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== p.fill || m !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = y, p.stroke = m, p.autoStroke = _, p.align = o, p.verticalAlign = s, r.setDefaultTextStyle(p)), r.__dirty |= ae, l && r.dirtyStyle(!0);
    }
  }, e.prototype.canBeInsideText = function() {
    return !0;
  }, e.prototype.getInsideTextFill = function() {
    return "#fff";
  }, e.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, e.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Ah : Dh;
  }, e.prototype.getOutsideStroke = function(t) {
    var r = this.__zr && this.__zr.getBackgroundColor(), i = typeof r == "string" && _e(r);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, fr(i, "rgba");
  }, e.prototype.traverse = function(t, r) {
  }, e.prototype.attrKV = function(t, r) {
    t === "textConfig" ? this.setTextConfig(r) : t === "textContent" ? this.setTextContent(r) : t === "clipPath" ? this.setClipPath(r) : t === "extra" ? (this.extra = this.extra || {}, N(this.extra, r)) : this[t] = r;
  }, e.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, e.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, e.prototype.attr = function(t, r) {
    if (typeof t == "string")
      this.attrKV(t, r);
    else if (V(t))
      for (var i = t, n = gt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== nu)) {
        var o = n.targetName, s = o ? r[o] : r;
        n.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, au);
  }, e.prototype._savePrimaryToNormal = function(t, r, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in r) && (r[a] = this[a]);
    }
  }, e.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, e.prototype.getState = function(t) {
    return this.states[t];
  }, e.prototype.ensureState = function(t) {
    var r = this.states;
    return r[t] || (r[t] = {}), r[t];
  }, e.prototype.clearStates = function(t) {
    this.useState(nu, !1, t);
  }, e.prototype.useState = function(t, r, i, n) {
    var a = t === nu, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(vt(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Lc("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, r, !i && !this.__inHover && l && l.duration > 0, l);
        var c = this._textContent, v = this._textGuide;
        return c && c.useState(t, r, i, h), v && v.useState(t, r, i, h), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ae), u;
      }
    }
  }, e.prototype.useStates = function(t, r, i) {
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
      this.saveCurrentToNormalState(f), this._applyStateObj(t.join(","), f, this._normalState, !1, !r && !this.__inHover && d && d.duration > 0, d);
      var g = this._textContent, p = this._textGuide;
      g && g.useStates(t, r, v), p && p.useStates(t, r, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ae);
    }
  }, e.prototype.isSilent = function() {
    for (var t = this.silent, r = this.parent; !t && r; ) {
      if (r.silent) {
        t = !0;
        break;
      }
      r = r.parent;
    }
    return t;
  }, e.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var r = this.animators[t];
      r.targetName && r.changeTarget(this[r.targetName]);
    }
  }, e.prototype.removeState = function(t) {
    var r = vt(this.currentStates, t);
    if (r >= 0) {
      var i = this.currentStates.slice();
      i.splice(r, 1), this.useStates(i);
    }
  }, e.prototype.replaceState = function(t, r, i) {
    var n = this.currentStates.slice(), a = vt(n, t), o = vt(n, r) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = r : i && !o && n.push(r), this.useStates(n);
  }, e.prototype.toggleState = function(t, r) {
    r ? this.useState(t, !0) : this.removeState(t);
  }, e.prototype._mergeStates = function(t) {
    for (var r = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      N(r, a), a.textConfig && (i = i || {}, N(i, a.textConfig));
    }
    return i && (r.textConfig = i), r;
  }, e.prototype._applyStateObj = function(t, r, i, n, a, o) {
    var s = !(r && n);
    r && r.textConfig ? (this.textConfig = N({}, n ? this.textConfig : i.textConfig), N(this.textConfig, r.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, h = 0; h < au.length; h++) {
      var c = au[h], v = a && Aw[c];
      r && r[c] != null ? v ? (u = !0, l[c] = r[c]) : this[c] = r[c] : s && i[c] != null && (v ? (u = !0, l[c] = i[c]) : this[c] = i[c]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var f = this.animators[h], d = f.targetName;
        f.getLoop() || f.__changeFinalValue(d ? (r || i)[d] : r || i);
      }
    u && this._transitionState(t, l, o);
  }, e.prototype._attachComponent = function(t) {
    if (!(t.__zr && !t.__hostTarget) && t !== this) {
      var r = this.__zr;
      r && t.addSelfToZr(r), t.__zr = r, t.__hostTarget = this;
    }
  }, e.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, e.prototype.getClipPath = function() {
    return this._clipPath;
  }, e.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, e.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, e.prototype.getTextContent = function() {
    return this._textContent;
  }, e.prototype.setTextContent = function(t) {
    var r = this._textContent;
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new Nc(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, e.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), N(this.textConfig, t), this.markRedraw();
  }, e.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, e.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, e.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, e.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, e.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, e.prototype.markRedraw = function() {
    this.__dirty |= ae;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, e.prototype.dirty = function() {
    this.markRedraw();
  }, e.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var r = this._textContent, i = this._textGuide;
    r && (r.__inHover = t), i && (i.__inHover = t);
  }, e.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var r = this.animators;
      if (r)
        for (var i = 0; i < r.length; i++)
          t.animation.addAnimator(r[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, e.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var r = this.animators;
      if (r)
        for (var i = 0; i < r.length; i++)
          t.animation.removeAnimator(r[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, e.prototype.animate = function(t, r, i) {
    var n = t ? this[t] : this, a = new kc(n, r, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, e.prototype.addAnimator = function(t, r) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(r);
    }).done(function() {
      var a = n.animators, o = vt(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, e.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, e.prototype.stopAnimation = function(t, r) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(r) : a.push(s);
    }
    return this.animators = a, this;
  }, e.prototype.animateTo = function(t, r, i) {
    ou(this, t, r, i);
  }, e.prototype.animateFrom = function(t, r, i) {
    ou(this, t, r, i, !0);
  }, e.prototype._transitionState = function(t, r, i, n) {
    for (var a = ou(this, r, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, e.prototype.getBoundingRect = function() {
    return null;
  }, e.prototype.getPaintRect = function() {
    return null;
  }, e.initDefaultProps = function() {
    var t = e.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = ae;
    function r(i, n, a, o) {
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
    Object.defineProperty && (r("position", "_legacyPos", "x", "y"), r("scale", "_legacyScale", "scaleX", "scaleY"), r("origin", "_legacyOrigin", "originX", "originY"));
  }(), e;
}();
tr(al, er);
tr(al, Nc);
function ou(e, t, r, i, n) {
  r = r || {};
  var a = [];
  Ly(e, "", e, t, r, i, a, n);
  var o = a.length, s = !1, l = r.done, u = r.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, c = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(d, g) {
    r.during(g);
  });
  for (var v = 0; v < a.length; v++) {
    var f = a[v];
    h && f.done(h), c && f.aborted(c), r.force && f.duration(r.duration), f.start(r.easing);
  }
  return a;
}
function su(e, t, r) {
  for (var i = 0; i < r; i++)
    e[i] = t[i];
}
function Lw(e) {
  return Jt(e[0]);
}
function Pw(e, t, r) {
  if (Jt(t[r]))
    if (Jt(e[r]) || (e[r] = []), te(t[r])) {
      var i = t[r].length;
      e[r].length !== i && (e[r] = new t[r].constructor(i), su(e[r], t[r], i));
    } else {
      var n = t[r], a = e[r], o = n.length;
      if (Lw(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? su(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        su(a, n, o);
      a.length = n.length;
    }
  else
    e[r] = t[r];
}
function $w(e, t) {
  return e === t || Jt(e) && Jt(t) && Rw(e, t);
}
function Rw(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var i = 0; i < r; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
function Ly(e, t, r, i, n, a, o, s) {
  for (var l = gt(i), u = n.duration, h = n.delay, c = n.additive, v = n.setToFinal, f = !V(a), d = e.animators, g = [], p = 0; p < l.length; p++) {
    var y = l[p], m = i[y];
    if (m != null && r[y] != null && (f || a[y]))
      if (V(m) && !Jt(m) && !il(m)) {
        if (t) {
          s || (r[y] = m, e.updateDuringAnimation(t));
          continue;
        }
        Ly(e, y, r[y], m, n, a && a[y], o, s);
      } else
        g.push(y);
    else s || (r[y] = m, e.updateDuringAnimation(t), g.push(y));
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
    return !$w(i[T], r[T]);
  }), _ = g.length), _ > 0 || n.force && !o.length) {
    var M = void 0, D = void 0, A = void 0;
    if (s) {
      D = {}, v && (M = {});
      for (var b = 0; b < _; b++) {
        var y = g[b];
        D[y] = r[y], v ? M[y] = i[y] : r[y] = i[y];
      }
    } else if (v) {
      A = {};
      for (var b = 0; b < _; b++) {
        var y = g[b];
        A[y] = os(r[y]), Pw(r, i, y);
      }
    }
    var S = new kc(r, !1, !1, c ? Pt(d, function(I) {
      return I.targetName === t;
    }) : null);
    S.targetName = t, n.scope && (S.scope = n.scope), v && M && S.whenWithKeys(0, M, g), A && S.whenWithKeys(0, A, g), S.whenWithKeys(u ?? 500, s ? D : i, g).delay(h || 0), e.addAnimator(S, t), o.push(S);
  }
}
var Ct = function(e) {
  B(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(r), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(r) {
    return this._children[r];
  }, t.prototype.childOfName = function(r) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === r)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(r) {
    return r && r !== this && r.parent !== this && (this._children.push(r), this._doAdd(r)), this;
  }, t.prototype.addBefore = function(r, i) {
    if (r && r !== this && r.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, r), this._doAdd(r));
    }
    return this;
  }, t.prototype.replace = function(r, i) {
    var n = vt(this._children, r);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(r, i) {
    var n = this._children, a = n[i];
    if (r && r !== this && r.parent !== this && r !== a) {
      n[i] = r, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(r);
    }
    return this;
  }, t.prototype._doAdd = function(r) {
    r.parent && r.parent.remove(r), r.parent = this;
    var i = this.__zr;
    i && i !== r.__zr && r.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(r) {
    var i = this.__zr, n = this._children, a = vt(n, r);
    return a < 0 ? this : (n.splice(a, 1), r.parent = null, i && r.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var r = this._children, i = this.__zr, n = 0; n < r.length; n++) {
      var a = r[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return r.length = 0, this;
  }, t.prototype.eachChild = function(r, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      r.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(r, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = r.call(i, a);
      a.isGroup && !o && a.traverse(r, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(r);
    }
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(r);
    }
  }, t.prototype.getBoundingRect = function(r) {
    for (var i = new lt(0, 0, 0, 0), n = r || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (lt.applyTransform(i, u, h), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(al);
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
var hs = {}, Py = {};
function Ow(e) {
  delete Py[e];
}
function Ew(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return Ps(e, 1) < Mh;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, i = t.length, n = 0; n < i; n++)
      r += Ps(t[n].color, 1);
    return r /= i, r < Mh;
  }
  return !1;
}
var kw = function() {
  function e(t, r, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = r, this.id = t;
    var a = new Q1(), o = i.renderer || "canvas";
    hs[o] || (o = gt(hs)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new hs[o](r, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !X.node && !X.worker && !l ? new Cw(s.getViewportRoot(), s.root) : null, h = i.useCoarsePointer, c = h == null || h === "auto" ? X.touchEventsSupported : !!h, v = 44, f;
    c && (f = tt(i.pointerSize, v)), this.handler = new yy(a, s, u, s.root, f), this.animation = new mw({
      stage: {
        update: l ? null : function() {
          return n._flush(!0);
        }
      }
    }), l || this.animation.start();
  }
  return e.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, e.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, e.prototype.configLayer = function(t, r) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, r), this.refresh());
  }, e.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = Ew(t));
  }, e.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, e.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, e.prototype.isDarkMode = function() {
    return this._darkMode;
  }, e.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, e.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, e.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, e.prototype._flush = function(t) {
    var r, i = fn();
    this._needsRefresh && (r = !0, this.refreshImmediately(t)), this._needsRefreshHover && (r = !0, this.refreshHoverImmediately());
    var n = fn();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, e.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, e.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, e.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, e.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
  }, e.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, e.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, e.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, e.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, e.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, e.prototype.findHover = function(t, r) {
    if (!this._disposed)
      return this.handler.findHover(t, r);
  }, e.prototype.on = function(t, r, i) {
    return this._disposed || this.handler.on(t, r, i), this;
  }, e.prototype.off = function(t, r) {
    this._disposed || this.handler.off(t, r);
  }, e.prototype.trigger = function(t, r) {
    this._disposed || this.handler.trigger(t, r);
  }, e.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), r = 0; r < t.length; r++)
        t[r] instanceof Ct && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Ow(this.id));
  }, e;
}();
function xv(e, t) {
  var r = new kw(hy(), e, t);
  return Py[r.id] = r, r;
}
function Nw(e, t) {
  hs[e] = t;
}
var Tv = 1e-4, $y = 20;
function Bw(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function dr(e, t, r, i) {
  var n = t[0], a = t[1], o = r[0], s = r[1], l = a - n, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (i)
    if (l > 0) {
      if (e <= n)
        return o;
      if (e >= a)
        return s;
    } else {
      if (e >= n)
        return o;
      if (e <= a)
        return s;
    }
  else {
    if (e === n)
      return o;
    if (e === a)
      return s;
  }
  return (e - n) / l * u + o;
}
function Vt(e, t) {
  switch (e) {
    case "center":
    case "middle":
      e = "50%";
      break;
    case "left":
    case "top":
      e = "0%";
      break;
    case "right":
    case "bottom":
      e = "100%";
      break;
  }
  return H(e) ? Bw(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : e == null ? NaN : +e;
}
function Mt(e, t, r) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), $y), e = (+e).toFixed(t), r ? e : +e;
}
function Ry(e) {
  return e.sort(function(t, r) {
    return t - r;
  }), e;
}
function lr(e) {
  if (e = +e, isNaN(e))
    return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (Math.round(e * t) / t === e)
        return r;
  }
  return zw(e);
}
function zw(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), i = r > 0 ? +t.slice(r + 1) : 0, n = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function Fw(e, t) {
  var r = Math.log, i = Math.LN10, n = Math.floor(r(e[1] - e[0]) / i), a = Math.round(r(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function Hw(e, t) {
  var r = Math.max(lr(e), lr(t)), i = e + t;
  return r > $y ? i : Mt(i, r);
}
function Oy(e) {
  var t = Math.PI * 2;
  return (e % t + t) % t;
}
function Os(e) {
  return e > -Tv && e < Tv;
}
var Vw = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function pr(e) {
  if (e instanceof Date)
    return e;
  if (H(e)) {
    var t = Vw.exec(e);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var r = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (r -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, r, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (e == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(e));
}
function Gw(e) {
  return Math.pow(10, Fc(e));
}
function Fc(e) {
  if (e === 0)
    return 0;
  var t = Math.floor(Math.log(e) / Math.LN10);
  return e / Math.pow(10, t) >= 10 && t++, t;
}
function Ey(e, t) {
  var r = Fc(e), i = Math.pow(10, r), n = e / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, e = a * i, r >= -20 ? +e.toFixed(r < 0 ? -r : 0) : e;
}
function Cv(e) {
  e.sort(function(l, u) {
    return s(l, u, 0) ? -1 : 1;
  });
  for (var t = -1 / 0, r = 1, i = 0; i < e.length; ) {
    for (var n = e[i].interval, a = e[i].close, o = 0; o < 2; o++)
      n[o] <= t && (n[o] = t, a[o] = o ? 1 : 1 - r), t = n[o], r = a[o];
    n[0] === n[1] && a[0] * a[1] !== 1 ? e.splice(i, 1) : i++;
  }
  return e;
  function s(l, u, h) {
    return l.interval[h] < u.interval[h] || l.interval[h] === u.interval[h] && (l.close[h] - u.close[h] === (h ? -1 : 1) || !h && s(l, u, 1));
  }
}
function Es(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !H(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function Ww(e) {
  return !isNaN(Es(e));
}
function ky() {
  return Math.round(Math.random() * 9);
}
function Ny(e, t) {
  return t === 0 ? e : Ny(t, e % t);
}
function Mv(e, t) {
  return e == null ? t : t == null ? e : e * t / Ny(e, t);
}
function jt(e) {
  throw new Error(e);
}
function Dv(e, t, r) {
  return (t - e) * r + e;
}
var By = "series\0", Uw = "\0_ec_\0";
function Rt(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function Av(e, t, r) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var i = 0, n = r.length; i < n; i++) {
      var a = r[i];
      !e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var Iv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function so(e) {
  return V(e) && !z(e) && !(e instanceof Date) ? e.value : e;
}
function Yw(e) {
  return V(e) && !(e instanceof Array);
}
function Xw(e, t, r) {
  var i = r === "normalMerge", n = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = Q();
  C(t, function(l, u) {
    if (!V(l)) {
      t[u] = null;
      return;
    }
  });
  var s = qw(e, o, r);
  return (i || n) && Zw(s, e, o, t), i && Kw(s, t), i || n ? jw(s, t, n) : a && Qw(s, t), Jw(s), s;
}
function qw(e, t, r) {
  var i = [];
  if (r === "replaceAll")
    return i;
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: r === "replaceMerge" || Ga(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function Zw(e, t, r, i) {
  C(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = Ta(n.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        qe(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function Kw(e, t) {
  C(t, function(r, i) {
    if (!(!r || r.name == null))
      for (var n = 0; n < e.length; n++) {
        var a = e[n].existing;
        if (!e[n].newOption && a && (a.id == null || r.id == null) && !Ga(r) && !Ga(a) && zy("name", a, r)) {
          e[n].newOption = r, t[i] = null;
          return;
        }
      }
  });
}
function jw(e, t, r) {
  C(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = e[a]) && (n.newOption || Ga(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !zy("id", i, n.existing));
      )
        a++;
      n ? (n.newOption = i, n.brandNew = r) : e.push({
        newOption: i,
        brandNew: r,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function Qw(e, t) {
  C(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function Jw(e) {
  var t = Q();
  C(e, function(r) {
    var i = r.existing;
    i && t.set(i.id, r);
  }), C(e, function(r) {
    var i = r.newOption;
    qe(!i || i.id == null || !t.get(i.id) || t.get(i.id) === r, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, r), !r.keyInfo && (r.keyInfo = {});
  }), C(e, function(r, i) {
    var n = r.existing, a = r.newOption, o = r.keyInfo;
    if (V(a)) {
      if (o.name = a.name != null ? Ta(a.name) : n ? n.name : By + i, n)
        o.id = Ta(n.id);
      else if (a.id != null)
        o.id = Ta(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (t.get(o.id));
      }
      t.set(o.id, r);
    }
  });
}
function zy(e, t, r) {
  var i = $e(t[e], null), n = $e(r[e], null);
  return i != null && n != null && i === n;
}
function Ta(e) {
  return $e(e, "");
}
function $e(e, t) {
  return e == null ? t : H(e) ? e : yt(e) || fh(e) ? e + "" : t;
}
function Hc(e) {
  var t = e.name;
  return !!(t && t.indexOf(By));
}
function Ga(e) {
  return e && e.id != null && Ta(e.id).indexOf(Uw) === 0;
}
function tS(e, t, r) {
  C(e, function(i) {
    var n = i.newOption;
    V(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = eS(t, n, i.existing, r));
  });
}
function eS(e, t, r, i) {
  var n = t.type ? t.type : r ? r.subType : i.determineSubType(e, t);
  return n;
}
function rS(e, t) {
  var r = {}, i = {};
  return n(e || [], r), n(t || [], i, r), [a(r), a(i)];
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
function $i(e, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return z(t.dataIndex) ? U(t.dataIndex, function(r) {
      return e.indexOfRawIndex(r);
    }) : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return z(t.name) ? U(t.name, function(r) {
      return e.indexOfName(r);
    }) : e.indexOfName(t.name);
}
function It() {
  var e = "__ec_inner_" + iS++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var iS = ky();
function lu(e, t, r) {
  var i = Vc(t, r), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = r ? r.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, h) {
    var c = lo(e, h, u, {
      useDefault: l === h,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[h + "Models"] = c.models, s[h + "Model"] = c.models[0];
  }), s;
}
function Vc(e, t) {
  var r;
  if (H(e)) {
    var i = {};
    i[e + "Index"] = 0, r = i;
  } else
    r = e;
  var n = Q(), a = {}, o = !1;
  return C(r, function(s, l) {
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
function lo(e, t, r, i) {
  i = i || Le;
  var n = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (qe(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (qe(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = e.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function Fy(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function nS(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function aS(e) {
  return e === "auto" ? X.domSupported ? "html" : "richText" : e || "html";
}
function oS(e, t, r, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (yt(i)) {
    var o = Dv(r || 0, i, n);
    return Mt(o, a ? Math.max(lr(r || 0), lr(i)) : t);
  } else {
    if (H(i))
      return n < 1 ? r : i;
    for (var s = [], l = r, u = i, h = Math.max(l ? l.length : 0, u.length), c = 0; c < h; ++c) {
      var v = e.getDimensionInfo(c);
      if (v && v.type === "ordinal")
        s[c] = (n < 1 && l ? l : u)[c];
      else {
        var f = l && l[c] ? l[c] : 0, d = u[c], o = Dv(f, d, n);
        s[c] = Mt(o, a ? Math.max(lr(f), lr(d)) : t);
      }
    }
    return s;
  }
}
var sS = ".", ri = "___EC__COMPONENT__CONTAINER___", Hy = "___EC__EXTENDED_CLASS___";
function Ye(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(sS);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function lS(e) {
  qe(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function uS(e) {
  return !!(e && e[Hy]);
}
function Gc(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var i = this, n;
    return hS(i) ? n = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (r.$constructor || i).apply(this, arguments);
    }, v1(n, this)), N(n.prototype, r), n[Hy] = !0, n.extend = this.extend, n.superCall = vS, n.superApply = dS, n.superClass = i, n;
  };
}
function hS(e) {
  return Z(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Vy(e, t) {
  e.extend = t.extend;
}
var cS = Math.round(Math.random() * 10);
function fS(e) {
  var t = ["__\0is_clz", cS++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function vS(e, t) {
  for (var r = [], i = 2; i < arguments.length; i++)
    r[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(e, r);
}
function dS(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function ol(e) {
  var t = {};
  e.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      lS(n), i.prototype.type = n;
      var a = Ye(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== ri) {
        var o = r(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, e.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[ri] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, e.getClassesByMainType = function(i) {
    var n = Ye(i), a = [], o = t[n.main];
    return o && o[ri] ? C(o, function(s, l) {
      l !== ri && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(i) {
    var n = Ye(i);
    return !!t[n.main];
  }, e.getAllClassMainTypes = function() {
    var i = [];
    return C(t, function(n, a) {
      i.push(a);
    }), i;
  }, e.hasSubTypes = function(i) {
    var n = Ye(i), a = t[n.main];
    return a && a[ri];
  };
  function r(i) {
    var n = t[i.main];
    return (!n || !n[ri]) && (n = t[i.main] = {}, n[ri] = !0), n;
  }
}
function Wa(e, t) {
  for (var r = 0; r < e.length; r++)
    e[r][1] || (e[r][1] = e[r][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < e.length; s++) {
      var l = e[s][1];
      if (!(n && vt(n, l) >= 0 || a && vt(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[e[s][0]] = u);
      }
    }
    return o;
  };
}
var pS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], gS = Wa(pS), yS = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return gS(this, t, r);
    }, e;
  }()
), Ih = new oo(50);
function mS(e) {
  if (typeof e == "string") {
    var t = Ih.get(e);
    return t && t.image;
  } else
    return e;
}
function Gy(e, t, r, i, n) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = Ih.get(e), o = { hostEl: r, cb: i, cbPayload: n };
      return a ? (t = a.image, !sl(t) && a.pending.push(o)) : (t = Wr.loadImage(e, Lv, Lv), t.__zrImageSrc = e, Ih.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function Lv() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], i = r.cb;
    i && i(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function sl(e) {
  return e && e.width && e.height;
}
var uu = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function _S(e, t, r, i, n, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Wy(r, i, n, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    Uy(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function Wy(e, t, r, i) {
  i = i || {};
  var n = N({}, i);
  n.font = t, r = tt(r, "..."), n.maxIterations = tt(i.maxIterations, 2);
  var a = n.minChar = tt(i.minChar, 0);
  n.cnCharWidth = oe("国", t);
  var o = n.ascCharWidth = oe("a", t);
  n.placeholder = tt(i.placeholder, "");
  for (var s = e = Math.max(0, e - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = oe(r, t);
  return u > s && (r = "", u = 0), s = e - u, n.ellipsis = r, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = e, n;
}
function Uy(e, t, r) {
  var i = r.containerWidth, n = r.font, a = r.contentWidth;
  if (!i) {
    e.textLine = "", e.isTruncated = !1;
    return;
  }
  var o = oe(t, n);
  if (o <= i) {
    e.textLine = t, e.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= r.maxIterations) {
      t += r.ellipsis;
      break;
    }
    var l = s === 0 ? bS(t, a, r.ascCharWidth, r.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = oe(t, n);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function bS(e, t, r, i) {
  for (var n = 0, a = 0, o = e.length; a < o && n < t; a++) {
    var s = e.charCodeAt(a);
    n += 0 <= s && s <= 127 ? r : i;
  }
  return a;
}
function wS(e, t) {
  e != null && (e += "");
  var r = t.overflow, i = t.padding, n = t.font, a = r === "truncate", o = zc(n), s = tt(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, c = t.width, v;
  c != null && (r === "break" || r === "breakAll") ? v = e ? Yy(e, t.font, c, r === "breakAll", 0).lines : [] : v = e ? e.split(`
`) : [];
  var f = v.length * s, d = tt(t.height, f);
  if (f > d && u) {
    var g = Math.floor(d / s);
    h = h || v.length > g, v = v.slice(0, g);
  }
  if (e && a && c != null)
    for (var p = Wy(c, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < v.length; m++)
      Uy(y, v[m], p), v[m] = y.textLine, h = h || y.isTruncated;
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
var SS = /* @__PURE__ */ function() {
  function e() {
  }
  return e;
}(), Pv = /* @__PURE__ */ function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
}(), xS = /* @__PURE__ */ function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
}();
function TS(e, t) {
  var r = new xS();
  if (e != null && (e += ""), !e)
    return r;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = uu.lastIndex = 0, l; (l = uu.exec(e)) != null; ) {
    var u = l.index;
    u > s && hu(r, e.substring(s, u), t, o), hu(r, l[2], t, o, l[1]), s = uu.lastIndex;
  }
  s < e.length && hu(r, e.substring(s, e.length), t, o);
  var h = [], c = 0, v = 0, f = t.padding, d = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function y(W, j, et) {
    W.width = j, W.lineHeight = et, c += et, v = Math.max(v, j);
  }
  t: for (var m = 0; m < r.lines.length; m++) {
    for (var _ = r.lines[m], b = 0, S = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], M = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = M.padding, A = D ? D[1] + D[3] : 0, T = x.font = M.font || t.font;
      x.contentHeight = zc(T);
      var I = tt(M.height, x.contentHeight);
      if (x.innerHeight = I, D && (I += D[0] + D[2]), x.height = I, x.lineHeight = ns(M.lineHeight, t.lineHeight, I), x.align = M && M.align || t.align, x.verticalAlign = M && M.verticalAlign || "middle", g && n != null && c + x.lineHeight > n) {
        var P = r.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, S, b), r.lines = r.lines.slice(0, m + 1)) : r.lines = r.lines.slice(0, m), r.isTruncated = r.isTruncated || r.lines.length < P;
        break t;
      }
      var $ = M.width, R = $ == null || $ === "auto";
      if (typeof $ == "string" && $.charAt($.length - 1) === "%")
        x.percentWidth = $, h.push(x), x.contentWidth = oe(x.text, T);
      else {
        if (R) {
          var O = M.backgroundColor, G = O && O.image;
          G && (G = mS(G), sl(G) && (x.width = Math.max(x.width, G.width * I / G.height)));
        }
        var E = d && i != null ? i - S : null;
        E != null && E < x.width ? !R || E < A ? (x.text = "", x.width = x.contentWidth = 0) : (_S(p, x.text, E - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, r.isTruncated = r.isTruncated || p.isTruncated, x.width = x.contentWidth = oe(x.text, T)) : x.contentWidth = oe(x.text, T);
      }
      x.width += A, S += x.width, M && (b = Math.max(b, x.lineHeight));
    }
    y(_, S, b);
  }
  r.outerWidth = r.width = tt(i, v), r.outerHeight = r.height = tt(n, c), r.contentHeight = c, r.contentWidth = v, f && (r.outerWidth += f[1] + f[3], r.outerHeight += f[0] + f[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * r.width;
  }
  return r;
}
function hu(e, t, r, i, n) {
  var a = t === "", o = n && r.rich[n] || {}, s = e.lines, l = o.font || r.font, u = !1, h, c;
  if (i) {
    var v = o.padding, f = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = Ze(o.width, i.width) + f;
      s.length > 0 && d + i.accumWidth > i.width && (h = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var g = Yy(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + f, c = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var y = h[p], m = new SS();
    if (m.styleName = n, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = c ? c[p] : oe(y, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Pv())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new Pv([m]));
  }
}
function CS(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var MS = Nn(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function DS(e) {
  return CS(e) ? !!MS[e] : !0;
}
function Yy(e, t, r, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, c = 0; c < e.length; c++) {
    var v = e.charAt(c);
    if (v === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var f = oe(v, t), d = i ? !1 : !DS(v);
    if (a.length ? h + f > r : n + h + f > r) {
      h ? (s || l) && (d ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += v, u += f, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = v, h = f)) : d ? (a.push(l), o.push(u), l = v, u = f) : (a.push(v), o.push(f));
      continue;
    }
    h += f, d ? (l += v, u += f) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = e, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += n), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var Lh = "__zr_style_" + Math.round(Math.random() * 10), Mi = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, ll = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Mi[Lh] = !0;
var $v = ["z", "z2", "invisible"], AS = ["invisible"], uo = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype._init = function(r) {
    for (var i = gt(r), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(r[a]) : e.prototype.attrKV.call(this, a, r[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(r, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && IS(this, r, i) || o && !o[0] && !o[3])
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
  }, t.prototype.contain = function(r, i) {
    return this.rectContain(r, i);
  }, t.prototype.traverse = function(r, i) {
    r.call(i, this);
  }, t.prototype.rectContain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var r = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      r = this._paintRect || (this._paintRect = new lt(0, 0, 0, 0)), i ? lt.applyTransform(r, n, i) : r.copy(n), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
      var u = this.dirtyRectTolerance;
      r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2));
    }
    return r;
  }, t.prototype.setPrevPaintRect = function(r) {
    r ? (this._prevPaintRect = this._prevPaintRect || new lt(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(r) {
    return this.animate("style", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(r, i) {
    r !== "style" ? e.prototype.attrKV.call(this, r, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(r, i) {
    return typeof r == "string" ? this.style[r] = i : N(this.style, r), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= da, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & da);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~da;
  }, t.prototype.createStyle = function(r) {
    return nl(Mi, r);
  }, t.prototype.useStyle = function(r) {
    r[Lh] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(r) {
    return r[Lh];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, i, $v);
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
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
        this._transitionState(r, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? AS : $v, v = 0; v < g.length; v++) {
      var f = g[v];
      i && i[f] != null ? this[f] = i[f] : l && n[f] != null && (this[f] = n[f]);
    }
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(r, i) {
    return N(r, i), r;
  }, t.prototype.getAnimationStyleProps = function() {
    return ll;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = ae | da;
  }(), t;
}(al), cu = new lt(0, 0, 0, 0), fu = new lt(0, 0, 0, 0);
function IS(e, t, r) {
  return cu.copy(e.getBoundingRect()), e.transform && cu.applyTransform(e.transform), fu.width = t, fu.height = r, !cu.intersect(fu);
}
var pe = Math.min, ge = Math.max, vu = Math.sin, du = Math.cos, ii = Math.PI * 2, Co = Bn(), Mo = Bn(), Do = Bn();
function Rv(e, t, r, i, n, a) {
  n[0] = pe(e, r), n[1] = pe(t, i), a[0] = ge(e, r), a[1] = ge(t, i);
}
var Ov = [], Ev = [];
function LS(e, t, r, i, n, a, o, s, l, u) {
  var h = Sy, c = $t, v = h(e, r, n, o, Ov);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var f = 0; f < v; f++) {
    var d = c(e, r, n, o, Ov[f]);
    l[0] = pe(d, l[0]), u[0] = ge(d, u[0]);
  }
  v = h(t, i, a, s, Ev);
  for (var f = 0; f < v; f++) {
    var g = c(t, i, a, s, Ev[f]);
    l[1] = pe(g, l[1]), u[1] = ge(g, u[1]);
  }
  l[0] = pe(e, l[0]), u[0] = ge(e, u[0]), l[0] = pe(o, l[0]), u[0] = ge(o, u[0]), l[1] = pe(t, l[1]), u[1] = ge(t, u[1]), l[1] = pe(s, l[1]), u[1] = ge(s, u[1]);
}
function PS(e, t, r, i, n, a, o, s) {
  var l = xy, u = Kt, h = ge(pe(l(e, r, n), 1), 0), c = ge(pe(l(t, i, a), 1), 0), v = u(e, r, n, h), f = u(t, i, a, c);
  o[0] = pe(e, n, v), o[1] = pe(t, a, f), s[0] = ge(e, n, v), s[1] = ge(t, a, f);
}
function $S(e, t, r, i, n, a, o, s, l) {
  var u = hn, h = cn, c = Math.abs(n - a);
  if (c % ii < 1e-4 && c > 1e-4) {
    s[0] = e - r, s[1] = t - i, l[0] = e + r, l[1] = t + i;
    return;
  }
  if (Co[0] = du(n) * r + e, Co[1] = vu(n) * i + t, Mo[0] = du(a) * r + e, Mo[1] = vu(a) * i + t, u(s, Co, Mo), h(l, Co, Mo), n = n % ii, n < 0 && (n = n + ii), a = a % ii, a < 0 && (a = a + ii), n > a && !o ? a += ii : n < a && o && (n += ii), o) {
    var v = a;
    a = n, n = v;
  }
  for (var f = 0; f < a; f += Math.PI / 2)
    f > n && (Do[0] = du(f) * r + e, Do[1] = vu(f) * i + t, u(s, Do, s), h(l, Do, l));
}
var st = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, ni = [], ai = [], Be = [], Mr = [], ze = [], Fe = [], pu = Math.min, gu = Math.max, oi = Math.cos, si = Math.sin, ar = Math.abs, Ph = Math.PI, Er = Ph * 2, yu = typeof Float32Array < "u", Kn = [];
function mu(e) {
  var t = Math.round(e / Ph * 1e8) / 1e8;
  return t % 2 * Ph;
}
function RS(e, t) {
  var r = mu(e[0]);
  r < 0 && (r += Er);
  var i = r - e[0], n = e[1];
  n += i, !t && n - r >= Er ? n = r + Er : t && r - n >= Er ? n = r - Er : !t && r > n ? n = r + (Er - mu(r - n)) : t && r < n && (n = r - (Er - mu(n - r))), e[0] = r, e[1] = n;
}
var Ri = function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, i) {
    i = i || 0, i > 0 && (this._ux = ar(i / $s / t) || 0, this._uy = ar(i / $s / r) || 0);
  }, e.prototype.setDPR = function(t) {
    this.dpr = t;
  }, e.prototype.setContext = function(t) {
    this._ctx = t;
  }, e.prototype.getContext = function() {
    return this._ctx;
  }, e.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, e.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, e.prototype.moveTo = function(t, r) {
    return this._drawPendingPt(), this.addData(st.M, t, r), this._ctx && this._ctx.moveTo(t, r), this._x0 = t, this._y0 = r, this._xi = t, this._yi = r, this;
  }, e.prototype.lineTo = function(t, r) {
    var i = ar(t - this._xi), n = ar(r - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(st.L, t, r), this._ctx && a && this._ctx.lineTo(t, r), a)
      this._xi = t, this._yi = r, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = r, this._pendingPtDist = o);
    }
    return this;
  }, e.prototype.bezierCurveTo = function(t, r, i, n, a, o) {
    return this._drawPendingPt(), this.addData(st.C, t, r, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, r, i, n, a, o), this._xi = a, this._yi = o, this;
  }, e.prototype.quadraticCurveTo = function(t, r, i, n) {
    return this._drawPendingPt(), this.addData(st.Q, t, r, i, n), this._ctx && this._ctx.quadraticCurveTo(t, r, i, n), this._xi = i, this._yi = n, this;
  }, e.prototype.arc = function(t, r, i, n, a, o) {
    this._drawPendingPt(), Kn[0] = n, Kn[1] = a, RS(Kn, o), n = Kn[0], a = Kn[1];
    var s = a - n;
    return this.addData(st.A, t, r, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, i, n, a, o), this._xi = oi(a) * i + t, this._yi = si(a) * i + r, this;
  }, e.prototype.arcTo = function(t, r, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, r, i, n, a), this;
  }, e.prototype.rect = function(t, r, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, r, i, n), this.addData(st.R, t, r, i, n), this;
  }, e.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(st.Z);
    var t = this._ctx, r = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = r, this._yi = i, this;
  }, e.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, e.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.setData = function(t) {
    var r = t.length;
    !(this.data && this.data.length === r) && yu && (this.data = new Float32Array(r));
    for (var i = 0; i < r; i++)
      this.data[i] = t[i];
    this._len = r;
  }, e.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var r = t.length, i = 0, n = this._len, a = 0; a < r; a++)
      i += t[a].len();
    yu && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < r; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, e.prototype.addData = function(t, r, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var h = this.data;
      this._len + arguments.length > h.length && (this._expandData(), h = this.data);
      for (var c = 0; c < arguments.length; c++)
        h[this._len++] = arguments[c];
    }
  }, e.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, e.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], r = 0; r < this._len; r++)
        t[r] = this.data[r];
      this.data = t;
    }
  }, e.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, yu && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, e.prototype.getBoundingRect = function() {
    Be[0] = Be[1] = ze[0] = ze[1] = Number.MAX_VALUE, Mr[0] = Mr[1] = Fe[0] = Fe[1] = -Number.MAX_VALUE;
    var t = this.data, r = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (r = t[o], i = t[o + 1], n = r, a = i), s) {
        case st.M:
          r = n = t[o++], i = a = t[o++], ze[0] = n, ze[1] = a, Fe[0] = n, Fe[1] = a;
          break;
        case st.L:
          Rv(r, i, t[o], t[o + 1], ze, Fe), r = t[o++], i = t[o++];
          break;
        case st.C:
          LS(r, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], ze, Fe), r = t[o++], i = t[o++];
          break;
        case st.Q:
          PS(r, i, t[o++], t[o++], t[o], t[o + 1], ze, Fe), r = t[o++], i = t[o++];
          break;
        case st.A:
          var u = t[o++], h = t[o++], c = t[o++], v = t[o++], f = t[o++], d = t[o++] + f;
          o += 1;
          var g = !t[o++];
          l && (n = oi(f) * c + u, a = si(f) * v + h), $S(u, h, c, v, f, d, g, ze, Fe), r = oi(d) * c + u, i = si(d) * v + h;
          break;
        case st.R:
          n = r = t[o++], a = i = t[o++];
          var p = t[o++], y = t[o++];
          Rv(n, a, n + p, a + y, ze, Fe);
          break;
        case st.Z:
          r = n, i = a;
          break;
      }
      hn(Be, Be, ze), cn(Mr, Mr, Fe);
    }
    return o === 0 && (Be[0] = Be[1] = Mr[0] = Mr[1] = 0), new lt(Be[0], Be[1], Mr[0] - Be[0], Mr[1] - Be[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, c = 0, v = 0; v < r; ) {
      var f = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var g = -1;
      switch (f) {
        case st.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case st.L: {
          var p = t[v++], y = t[v++], m = p - a, _ = y - o;
          (ar(m) > i || ar(_) > n || v === r - 1) && (g = Math.sqrt(m * m + _ * _), a = p, o = y);
          break;
        }
        case st.C: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++], w = t[v++], x = t[v++];
          g = tw(a, o, b, S, p, y, w, x, 10), a = w, o = x;
          break;
        }
        case st.Q: {
          var b = t[v++], S = t[v++], p = t[v++], y = t[v++];
          g = iw(a, o, b, S, p, y, 10), a = p, o = y;
          break;
        }
        case st.A:
          var M = t[v++], D = t[v++], A = t[v++], T = t[v++], I = t[v++], P = t[v++], $ = P + I;
          v += 1, d && (s = oi(I) * A + M, l = si(I) * T + D), g = gu(A, T) * pu(Er, Math.abs(P)), a = oi($) * A + M, o = si($) * T + D;
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
  }, e.prototype.rebuildPath = function(t, r) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, h, c, v, f = r < 1, d, g, p = 0, y = 0, m, _ = 0, b, S;
    if (!(f && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, g = this._pathLen, m = r * g, !m)))
      t: for (var w = 0; w < o; ) {
        var x = i[w++], M = w === 1;
        switch (M && (u = i[w], h = i[w + 1], s = u, l = h), x !== st.L && _ > 0 && (t.lineTo(b, S), _ = 0), x) {
          case st.M:
            s = u = i[w++], l = h = i[w++], t.moveTo(u, h);
            break;
          case st.L: {
            c = i[w++], v = i[w++];
            var D = ar(c - u), A = ar(v - h);
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
                Is(u, $, O, E, I, ni), Is(h, R, G, F, I, ai), t.bezierCurveTo(ni[1], ai[1], ni[2], ai[2], ni[3], ai[3]);
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
                Ls(u, $, O, I, ni), Ls(h, R, G, I, ai), t.quadraticCurveTo(ni[1], ai[1], ni[2], ai[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo($, R, O, G), u = O, h = G;
            break;
          }
          case st.A:
            var W = i[w++], j = i[w++], et = i[w++], ft = i[w++], mt = i[w++], St = i[w++], xe = i[w++], Xr = !i[w++], Vi = et > ft ? et : ft, ie = ar(et - ft) > 1e-3, Lt = mt + St, K = !1;
            if (f) {
              var T = d[y++];
              p + T > m && (Lt = mt + St * (m - p) / T, K = !0), p += T;
            }
            if (ie && t.ellipse ? t.ellipse(W, j, et, ft, xe, mt, Lt, Xr) : t.arc(W, j, Vi, mt, Lt, Xr), K)
              break t;
            M && (s = oi(mt) * et + W, l = si(mt) * ft + j), u = oi(Lt) * et + W, h = si(Lt) * ft + j;
            break;
          case st.R:
            s = u = i[w], l = h = i[w + 1], c = i[w++], v = i[w++];
            var rt = i[w++], qr = i[w++];
            if (f) {
              var T = d[y++];
              if (p + T > m) {
                var zt = m - p;
                t.moveTo(c, v), t.lineTo(c + pu(zt, rt), v), zt -= rt, zt > 0 && t.lineTo(c + rt, v + pu(zt, qr)), zt -= qr, zt > 0 && t.lineTo(c + gu(rt - zt, 0), v + qr), zt -= rt, zt > 0 && t.lineTo(c, v + gu(qr - zt, 0));
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
  }, e.prototype.clone = function() {
    var t = new e(), r = this.data;
    return t.data = r.slice ? r.slice() : Array.prototype.slice.call(r), t._len = this._len, t;
  }, e.CMD = st, e.initDefaultProps = function() {
    var t = e.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), e;
}();
function Xi(e, t, r, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = e;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > e + s && a > r + s || a < e - s && a < r - s)
    return !1;
  if (e !== r)
    l = (t - i) / (e - r), u = (e * i - r * t) / (e - r);
  else
    return Math.abs(a - e) <= s / 2;
  var h = l * a - o + u, c = h * h / (l * l + 1);
  return c <= s / 2 * s / 2;
}
function OS(e, t, r, i, n, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var c = l;
  if (h > t + c && h > i + c && h > a + c && h > s + c || h < t - c && h < i - c && h < a - c && h < s - c || u > e + c && u > r + c && u > n + c && u > o + c || u < e - c && u < r - c && u < n - c && u < o - c)
    return !1;
  var v = J1(e, t, r, i, n, a, o, s, u, h);
  return v <= c / 2;
}
function ES(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > e + u && s > r + u && s > n + u || s < e - u && s < r - u && s < n - u)
    return !1;
  var h = rw(e, t, r, i, n, a, s, l);
  return h <= u / 2;
}
var kv = Math.PI * 2;
function Ao(e) {
  return e %= kv, e < 0 && (e += kv), e;
}
var jn = Math.PI * 2;
function kS(e, t, r, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= e, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > r || h + u < r)
    return !1;
  if (Math.abs(i - n) % jn < 1e-4)
    return !0;
  if (a) {
    var c = i;
    i = Ao(n), n = Ao(c);
  } else
    i = Ao(i), n = Ao(n);
  i > n && (n += jn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += jn), v >= i && v <= n || v + jn >= i && v + jn <= n;
}
function li(e, t, r, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var Dr = Ri.CMD, ui = Math.PI * 2, NS = 1e-4;
function BS(e, t) {
  return Math.abs(e - t) < NS;
}
var Ht = [-1, -1, -1], ve = [-1, -1];
function zS() {
  var e = ve[0];
  ve[0] = ve[1], ve[1] = e;
}
function FS(e, t, r, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var h = As(t, i, a, s, u, Ht);
  if (h === 0)
    return 0;
  for (var c = 0, v = -1, f = void 0, d = void 0, g = 0; g < h; g++) {
    var p = Ht[g], y = p === 0 || p === 1 ? 0.5 : 1, m = $t(e, r, n, o, p);
    m < l || (v < 0 && (v = Sy(t, i, a, s, ve), ve[1] < ve[0] && v > 1 && zS(), f = $t(t, i, a, s, ve[0]), v > 1 && (d = $t(t, i, a, s, ve[1]))), v === 2 ? p < ve[0] ? c += f < t ? y : -y : p < ve[1] ? c += d < f ? y : -y : c += s < d ? y : -y : p < ve[0] ? c += f < t ? y : -y : c += s < f ? y : -y);
  }
  return c;
}
function HS(e, t, r, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = ew(t, i, a, s, Ht);
  if (l === 0)
    return 0;
  var u = xy(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, c = Kt(t, i, a, u), v = 0; v < l; v++) {
      var f = Ht[v] === 0 || Ht[v] === 1 ? 0.5 : 1, d = Kt(e, r, n, Ht[v]);
      d < o || (Ht[v] < u ? h += c < t ? f : -f : h += a < c ? f : -f);
    }
    return h;
  } else {
    var f = Ht[0] === 0 || Ht[0] === 1 ? 0.5 : 1, d = Kt(e, r, n, Ht[0]);
    return d < o ? 0 : a < t ? f : -f;
  }
}
function VS(e, t, r, i, n, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Ht[0] = -l, Ht[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= ui - 1e-4) {
    i = 0, n = ui;
    var h = a ? 1 : -1;
    return o >= Ht[0] + e && o <= Ht[1] + e ? h : 0;
  }
  if (i > n) {
    var c = i;
    i = n, n = c;
  }
  i < 0 && (i += ui, n += ui);
  for (var v = 0, f = 0; f < 2; f++) {
    var d = Ht[f];
    if (d + e > o) {
      var g = Math.atan2(s, d), h = a ? 1 : -1;
      g < 0 && (g = ui + g), (g >= i && g <= n || g + ui >= i && g + ui <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), v += h);
    }
  }
  return v;
}
function Xy(e, t, r, i, n) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, h = 0, c = 0, v, f, d = 0; d < o; ) {
    var g = a[d++], p = d === 1;
    switch (g === Dr.M && d > 1 && (r || (s += li(l, u, h, c, i, n))), p && (l = a[d], u = a[d + 1], h = l, c = u), g) {
      case Dr.M:
        h = a[d++], c = a[d++], l = h, u = c;
        break;
      case Dr.L:
        if (r) {
          if (Xi(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += li(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Dr.C:
        if (r) {
          if (OS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += FS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Dr.Q:
        if (r) {
          if (ES(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += HS(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Dr.A:
        var y = a[d++], m = a[d++], _ = a[d++], b = a[d++], S = a[d++], w = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(S) * _ + y, f = Math.sin(S) * b + m, p ? (h = v, c = f) : s += li(l, u, v, f, i, n);
        var M = (i - y) * b / _ + y;
        if (r) {
          if (kS(y, m, b, S, S + w, x, t, M, n))
            return !0;
        } else
          s += VS(y, m, b, S, S + w, x, M, n);
        l = Math.cos(S + w) * _ + y, u = Math.sin(S + w) * b + m;
        break;
      case Dr.R:
        h = l = a[d++], c = u = a[d++];
        var D = a[d++], A = a[d++];
        if (v = h + D, f = c + A, r) {
          if (Xi(h, c, v, c, t, i, n) || Xi(v, c, v, f, t, i, n) || Xi(v, f, h, f, t, i, n) || Xi(h, f, h, c, t, i, n))
            return !0;
        } else
          s += li(v, c, v, f, i, n), s += li(h, f, h, c, i, n);
        break;
      case Dr.Z:
        if (r) {
          if (Xi(l, u, h, c, t, i, n))
            return !0;
        } else
          s += li(l, u, h, c, i, n);
        l = h, u = c;
        break;
    }
  }
  return !r && !BS(u, c) && (s += li(l, u, h, c, i, n) || 0), s !== 0;
}
function GS(e, t, r) {
  return Xy(e, 0, !1, t, r);
}
function WS(e, t, r, i) {
  return Xy(e, t, !0, r, i);
}
var qy = ut({
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
}, Mi), US = {
  style: ut({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, ll.style)
}, _u = Va.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), ct = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.update = function() {
    var r = this;
    e.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(l) {
        r.buildPath(l, r.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < _u.length; ++s)
        n[_u[s]] = this[_u[s]];
      n.__dirty |= ae;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(r) {
    var i = gt(r);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = r[o];
      o === "style" ? this.style ? N(this.style, s) : this.useStyle(s) : o === "shape" ? N(this.shape, s) : e.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var r = this.style.fill;
    if (r !== "none") {
      if (H(r)) {
        var i = Ps(r, 0);
        return i > 0.5 ? Dh : i > 0.2 ? Mw : Ah;
      } else if (r)
        return Ah;
    }
    return Dh;
  }, t.prototype.getInsideTextStroke = function(r) {
    var i = this.style.fill;
    if (H(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Ps(r, 0) < Mh;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(r, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~ln;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Ri(!1);
  }, t.prototype.hasStroke = function() {
    var r = this.style, i = r.stroke;
    return !(i == null || i === "none" || !(r.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var r = this.style, i = r.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var r = this._rect, i = this.style, n = !r;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & ln) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
    }
    if (this._rect = r, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = r.clone());
      if (this.__dirty || n) {
        s.copy(r);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var h = this.strokeContainThreshold;
          u = Math.max(u, h ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return r;
  }, t.prototype.contain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect(), o = this.style;
    if (r = n[0], i = n[1], a.contain(r, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), WS(s, l / u, r, i)))
          return !0;
      }
      if (this.hasFill())
        return GS(s, r, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= ln, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(r) {
    return this.animate("shape", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : r === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(r, i) {
    r === "shape" ? this.setShape(i) : e.prototype.attrKV.call(this, r, i);
  }, t.prototype.setShape = function(r, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof r == "string" ? n[r] = i : N(n, r), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & ln);
  }, t.prototype.createStyle = function(r) {
    return nl(qy, r);
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var i = this._normalState;
    r.shape && !i.shape && (i.shape = N({}, this.shape));
  }, t.prototype._applyStateObj = function(r, i, n, a, o, s) {
    e.prototype._applyStateObj.call(this, r, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = N({}, n.shape), N(u, i.shape)) : (u = N({}, a ? this.shape : n.shape), N(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = N({}, this.shape);
        for (var h = {}, c = gt(u), v = 0; v < c.length; v++) {
          var f = c[v];
          typeof u[f] == "object" ? this.shape[f] = u[f] : h[f] = u[f];
        }
        this._transitionState(r, {
          shape: h
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(r) {
    for (var i = e.prototype._mergeStates.call(this, r), n, a = 0; a < r.length; a++) {
      var o = r[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return US;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(r) {
    var i = function(a) {
      B(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return r.init && r.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return q(r.style);
      }, o.prototype.getDefaultShape = function() {
        return q(r.shape);
      }, o;
    }(t);
    for (var n in r)
      typeof r[n] == "function" && (i.prototype[n] = r[n]);
    return i;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = ae | da | ln;
  }(), t;
}(uo), YS = ut({
  strokeFirst: !0,
  font: Li,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, qy), ks = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var r = this.style, i = r.stroke;
    return i != null && i !== "none" && r.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var r = this.style, i = r.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(r) {
    return nl(YS, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    if (!this._rect) {
      var i = r.text;
      i != null ? i += "" : i = "";
      var n = Bc(i, r.font, r.textAlign, r.textBaseline);
      if (n.x += r.x || 0, n.y += r.y || 0, this.hasStroke()) {
        var a = r.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.dirtyRectTolerance = 10;
  }(), t;
}(uo);
ks.prototype.type = "tspan";
var XS = ut({
  x: 0,
  y: 0
}, Mi), qS = {
  style: ut({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, ll.style)
};
function ZS(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var rr = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return nl(XS, r);
  }, t.prototype._getSize = function(r) {
    var i = this.style, n = i[r];
    if (n != null)
      return n;
    var a = ZS(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = i[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return qS;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new lt(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(uo);
rr.prototype.type = "image";
function KS(e, t) {
  var r = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, h;
  n < 0 && (r = r + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var c;
  s + l > n && (c = s + l, s *= n / c, l *= n / c), u + h > n && (c = u + h, u *= n / c, h *= n / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + h > a && (c = s + h, s *= a / c, h *= a / c), e.moveTo(r + s, i), e.lineTo(r + n - l, i), l !== 0 && e.arc(r + n - l, i + l, l, -Math.PI / 2, 0), e.lineTo(r + n, i + a - u), u !== 0 && e.arc(r + n - u, i + a - u, u, 0, Math.PI / 2), e.lineTo(r + h, i + a), h !== 0 && e.arc(r + h, i + a - h, h, Math.PI / 2, Math.PI), e.lineTo(r, i + s), s !== 0 && e.arc(r + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var vn = Math.round;
function Zy(e, t, r) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    e.x1 = i, e.x2 = n, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (vn(i * 2) === vn(n * 2) && (e.x1 = e.x2 = Si(i, s, !0)), vn(a * 2) === vn(o * 2) && (e.y1 = e.y2 = Si(a, s, !0))), e;
  }
}
function Ky(e, t, r) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    e.x = i, e.y = n, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = Si(i, s, !0), e.y = Si(n, s, !0), e.width = Math.max(Si(i + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(Si(n + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function Si(e, t, r) {
  if (!t)
    return e;
  var i = vn(e * 2);
  return (i + vn(t)) % 2 === 0 ? i / 2 : (i + (r ? 1 : -1)) / 2;
}
var jS = /* @__PURE__ */ function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
}(), QS = {}, bt = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new jS();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Ky(QS, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? KS(r, i) : r.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(ct);
bt.prototype.type = "rect";
var Nv = {
  fill: "#000"
}, Bv = 2, JS = {
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
  }, ll.style)
}, At = function(e) {
  B(t, e);
  function t(r) {
    var i = e.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = Nv, i.attr(r), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var r = 0; r < this._children.length; r++) {
      var i = this._children[r];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var r = this.innerTransformable;
    r ? (r.updateTransform(), r.transform && (this.transform = r.transform)) : e.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(r) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(r) : e.prototype.getLocalTransform.call(this, r);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, nx(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = r;
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var r = new lt(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || r;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(r) {
    this._defaultStyle = r || Nv;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, i) {
    if (!i)
      return r;
    var n = i.rich, a = r.rich || n && {};
    return N(r, i), n && a ? (this._mergeRich(a, n), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, i) {
    for (var n = gt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      r[o] = r[o] || {}, N(r[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return JS;
  }, t.prototype._getOrCreateChild = function(r) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof r)) && (i = new r()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, i = r.font || Li, n = r.padding, a = Uv(r), o = wS(a, r), s = bu(r), l = !!r.backgroundColor, u = o.outerHeight, h = o.outerWidth, c = o.contentWidth, v = o.lines, f = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = r.x || 0, p = r.y || 0, y = r.align || d.align || "left", m = r.verticalAlign || d.verticalAlign || "top", _ = g, b = un(p, o.contentHeight, m);
    if (s || n) {
      var S = ga(g, h, y), w = un(p, u, m);
      s && this._renderBackground(r, r, S, w, h, u);
    }
    b += f / 2, n && (_ = Wv(g, y, n), m === "top" ? b += n[0] : m === "bottom" && (b -= n[2]));
    for (var x = 0, M = !1, D = Gv("fill" in r ? r.fill : (M = !0, d.fill)), A = Vv("stroke" in r ? r.stroke : !l && (!d.autoStroke || M) ? (x = Bv, d.stroke) : null), T = r.textShadowBlur > 0, I = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), P = o.calculatedLineHeight, $ = 0; $ < v.length; $++) {
      var R = this._getOrCreateChild(ks), O = R.createStyle();
      R.useStyle(O), O.text = v[$], O.x = _, O.y = b, O.textAlign = y, O.textBaseline = "middle", O.opacity = r.opacity, O.strokeFirst = !0, T && (O.shadowBlur = r.textShadowBlur || 0, O.shadowColor = r.textShadowColor || "transparent", O.shadowOffsetX = r.textShadowOffsetX || 0, O.shadowOffsetY = r.textShadowOffsetY || 0), O.stroke = A, O.fill = D, A && (O.lineWidth = r.lineWidth || x, O.lineDash = r.lineDash, O.lineDashOffset = r.lineDashOffset || 0), O.font = i, Fv(O, r), b += f, I && R.setBoundingRect(new lt(ga(O.x, c, O.textAlign), un(O.y, P, O.textBaseline), c, P));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, i = Uv(r), n = TS(i, r), a = n.width, o = n.outerWidth, s = n.outerHeight, l = r.padding, u = r.x || 0, h = r.y || 0, c = this._defaultStyle, v = r.align || c.align, f = r.verticalAlign || c.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = ga(u, o, v), g = un(h, s, f), p = d, y = g;
    l && (p += l[3], y += l[0]);
    var m = p + a;
    bu(r) && this._renderBackground(r, r, d, g, o, s);
    for (var _ = !!r.backgroundColor, b = 0; b < n.lines.length; b++) {
      for (var S = n.lines[b], w = S.tokens, x = w.length, M = S.lineHeight, D = S.width, A = 0, T = p, I = m, P = x - 1, $ = void 0; A < x && ($ = w[A], !$.align || $.align === "left"); )
        this._placeToken($, r, M, y, T, "left", _), D -= $.width, T += $.width, A++;
      for (; P >= 0 && ($ = w[P], $.align === "right"); )
        this._placeToken($, r, M, y, I, "right", _), D -= $.width, I -= $.width, P--;
      for (T += (a - (T - p) - (m - I) - D) / 2; A <= P; )
        $ = w[A], this._placeToken($, r, M, y, T + $.width / 2, "center", _), T += $.width, A++;
      y += M;
    }
  }, t.prototype._placeToken = function(r, i, n, a, o, s, l) {
    var u = i.rich[r.styleName] || {};
    u.text = r.text;
    var h = r.verticalAlign, c = a + n / 2;
    h === "top" ? c = a + r.height / 2 : h === "bottom" && (c = a + n - r.height / 2);
    var v = !r.isLineHolder && bu(u);
    v && this._renderBackground(u, i, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, c - r.height / 2, r.width, r.height);
    var f = !!u.backgroundColor, d = r.textPadding;
    d && (o = Wv(o, s, d), c -= r.height / 2 - d[0] - r.innerHeight / 2);
    var g = this._getOrCreateChild(ks), p = g.createStyle();
    g.useStyle(p);
    var y = this._defaultStyle, m = !1, _ = 0, b = Gv("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, y.fill)), S = Vv("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !f && !l && (!y.autoStroke || m) ? (_ = Bv, y.stroke) : null), w = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = c, w && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || Li, p.opacity = ns(u.opacity, i.opacity, 1), Fv(p, u), S && (p.lineWidth = ns(u.lineWidth, i.lineWidth, _), p.lineDash = tt(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = S), b && (p.fill = b);
    var x = r.contentWidth, M = r.contentHeight;
    g.setBoundingRect(new lt(ga(p.x, x, p.textAlign), un(p.y, M, p.textBaseline), x, M));
  }, t.prototype._renderBackground = function(r, i, n, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, h = r.borderColor, c = l && l.image, v = l && !c, f = r.borderRadius, d = this, g, p;
    if (v || r.lineHeight || u && h) {
      g = this._getOrCreateChild(bt), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = n, y.y = a, y.width = o, y.height = s, y.r = f, g.dirtyShape();
    }
    if (v) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = tt(r.fillOpacity, 1);
    } else if (c) {
      p = this._getOrCreateChild(rr), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = tt(r.strokeOpacity, 1), m.lineDash = r.borderDash, m.lineDashOffset = r.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || p).style;
    b.shadowBlur = r.shadowBlur || 0, b.shadowColor = r.shadowColor || "transparent", b.shadowOffsetX = r.shadowOffsetX || 0, b.shadowOffsetY = r.shadowOffsetY || 0, b.opacity = ns(r.opacity, i.opacity, 1);
  }, t.makeFont = function(r) {
    var i = "";
    return ix(r) && (i = [
      r.fontStyle,
      r.fontWeight,
      rx(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), i && Ue(i) || r.textFont || r.font;
  }, t;
}(uo), tx = { left: !0, right: 1, center: 1 }, ex = { top: 1, bottom: 1, middle: 1 }, zv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function rx(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? Dc + "px" : e + "px";
}
function Fv(e, t) {
  for (var r = 0; r < zv.length; r++) {
    var i = zv[r], n = t[i];
    n != null && (e[i] = n);
  }
}
function ix(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function nx(e) {
  return Hv(e), C(e.rich, Hv), e;
}
function Hv(e) {
  if (e) {
    e.font = At.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || tx[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || ex[r] ? r : "top";
    var i = e.padding;
    i && (e.padding = cy(e.padding));
  }
}
function Vv(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Gv(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Wv(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function Uv(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function bu(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var ot = It(), ax = function(e, t, r, i) {
  if (i) {
    var n = ot(i);
    n.dataIndex = r, n.dataType = t, n.seriesIndex = e, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = ot(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Yv = 1, Xv = {}, jy = It(), Wc = It(), Uc = 0, ul = 1, hl = 2, Ke = ["emphasis", "blur", "select"], qv = ["normal", "emphasis", "blur", "select"], ox = 10, sx = 9, Di = "highlight", cs = "downplay", Ca = "select", fs = "unselect", Ma = "toggleSelect";
function qi(e) {
  return e != null && e !== "none";
}
function cl(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function Qy(e) {
  cl(e, "emphasis", hl);
}
function Jy(e) {
  e.hoverState === hl && cl(e, "normal", Uc);
}
function Yc(e) {
  cl(e, "blur", ul);
}
function tm(e) {
  e.hoverState === ul && cl(e, "normal", Uc);
}
function lx(e) {
  e.selected = !0;
}
function ux(e) {
  e.selected = !1;
}
function Zv(e, t, r) {
  t(e, r);
}
function xr(e, t, r) {
  Zv(e, t, r), e.isGroup && e.traverse(function(i) {
    Zv(i, t, r);
  });
}
function Kv(e, t) {
  switch (t) {
    case "emphasis":
      e.hoverState = hl;
      break;
    case "normal":
      e.hoverState = Uc;
      break;
    case "blur":
      e.hoverState = ul;
      break;
    case "select":
      e.selected = !0;
  }
}
function hx(e, t, r, i) {
  for (var n = e.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = n[s];
    a[s] = l ?? (i && i[s]);
  }
  for (var o = 0; o < e.animators.length; o++) {
    var u = e.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(r) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function cx(e, t, r, i) {
  var n = r && vt(r, "select") >= 0, a = !1;
  if (e instanceof ct) {
    var o = jy(e), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (qi(s) || qi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = N({}, i), u = N({}, u), u.fill = s) : !qi(u.fill) && qi(s) ? (a = !0, i = N({}, i), u = N({}, u), u.fill = fv(s)) : !qi(u.stroke) && qi(l) && (a || (i = N({}, i), u = N({}, u)), u.stroke = fv(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = N({}, i));
    var h = e.z2EmphasisLift;
    i.z2 = e.z2 + (h ?? ox);
  }
  return i;
}
function fx(e, t, r) {
  if (r && r.z2 == null) {
    r = N({}, r);
    var i = e.z2SelectLift;
    r.z2 = e.z2 + (i ?? sx);
  }
  return r;
}
function vx(e, t, r) {
  var i = vt(e.currentStates, t) >= 0, n = e.style.opacity, a = i ? null : hx(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = N({}, r), o = N({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), r.style = o), r;
}
function wu(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return cx(this, e, t, r);
    if (e === "blur")
      return vx(this, e, r);
    if (e === "select")
      return fx(this, e, r);
  }
  return r;
}
function dx(e) {
  e.stateProxy = wu;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = wu), r && (r.stateProxy = wu);
}
function jv(e, t) {
  !nm(e, t) && !e.__highByOuter && xr(e, Qy);
}
function Qv(e, t) {
  !nm(e, t) && !e.__highByOuter && xr(e, Jy);
}
function Ns(e, t) {
  e.__highByOuter |= 1 << (t || 0), xr(e, Qy);
}
function Bs(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && xr(e, Jy);
}
function px(e) {
  xr(e, Yc);
}
function em(e) {
  xr(e, tm);
}
function rm(e) {
  xr(e, lx);
}
function im(e) {
  xr(e, ux);
}
function nm(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function am(e) {
  var t = e.getModel(), r = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Wc(a), s = n === "series", l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      tm(u);
    }), s && r.push(a)), o.isBlured = !1;
  }), C(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(r, !1, t);
  });
}
function $h(e, t, r, i) {
  var n = i.getModel();
  r = r || "coordinateSystem";
  function a(u, h) {
    for (var c = 0; c < h.length; c++) {
      var v = u.getItemGraphicEl(h[c]);
      v && em(v);
    }
  }
  if (e != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(e), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var h = o === u, c = u.coordinateSystem;
      c && c.master && (c = c.master);
      var v = c && s ? c === s : h;
      if (!// Not blur other series if blurScope series
      (r === "series" && !h || r === "coordinateSystem" && !v || t === "series" && h)) {
        var f = i.getViewOfSeriesModel(u);
        if (f.group.traverse(function(p) {
          p.__highByOuter && h && t === "self" || Yc(p);
        }), Jt(t))
          a(u.getData(), t);
        else if (V(t))
          for (var d = gt(t), g = 0; g < d.length; g++)
            a(u.getData(d[g]), t[d[g]]);
        l.push(u), Wc(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, h) {
      if (u !== "series") {
        var c = i.getViewOfComponentModel(h);
        c && c.toggleBlurSeries && c.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function Rh(e, t, r) {
  if (!(e == null || t == null)) {
    var i = r.getModel().getComponent(e, t);
    if (i) {
      Wc(i).isBlured = !0;
      var n = r.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        Yc(a);
      });
    }
  }
}
function gx(e, t, r) {
  var i = e.seriesIndex, n = e.getData(t.dataType);
  if (n) {
    var a = $i(n, t);
    a = (z(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = ot(o);
      $h(i, u.focus, u.blurScope, r);
    } else {
      var h = e.get(["emphasis", "focus"]), c = e.get(["emphasis", "blurScope"]);
      h != null && $h(i, h, c, r);
    }
  }
}
function Xc(e, t, r, i) {
  var n = {
    focusSelf: !1,
    dispatchers: null
  };
  if (e == null || e === "series" || t == null || r == null)
    return n;
  var a = i.getModel().getComponent(e, t);
  if (!a)
    return n;
  var o = i.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return n;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (ot(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function yx(e, t, r) {
  var i = ot(e), n = Xc(i.componentMainType, i.componentIndex, i.componentHighDownName, r), a = n.dispatchers, o = n.focusSelf;
  a ? (o && Rh(i.componentMainType, i.componentIndex, r), C(a, function(s) {
    return jv(s, t);
  })) : ($h(i.seriesIndex, i.focus, i.blurScope, r), i.focus === "self" && Rh(i.componentMainType, i.componentIndex, r), jv(e, t));
}
function mx(e, t, r) {
  am(r);
  var i = ot(e), n = Xc(i.componentMainType, i.componentIndex, i.componentHighDownName, r).dispatchers;
  n ? C(n, function(a) {
    return Qv(a, t);
  }) : Qv(e, t);
}
function _x(e, t, r) {
  if (Nh(t)) {
    var i = t.dataType, n = e.getData(i), a = $i(n, t);
    z(a) || (a = [a]), e[t.type === Ma ? "toggleSelect" : t.type === Ca ? "select" : "unselect"](a, i);
  }
}
function Jv(e) {
  var t = e.getAllData();
  C(t, function(r) {
    var i = r.data, n = r.type;
    i.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, n) ? rm(a) : im(a);
    });
  });
}
function bx(e) {
  var t = [];
  return e.eachSeries(function(r) {
    var i = r.getAllData();
    C(i, function(n) {
      n.data;
      var a = n.type, o = r.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: r.seriesIndex
        };
        a != null && (s.dataType = a), t.push(s);
      }
    });
  }), t;
}
function Oh(e, t, r) {
  qc(e, !0), xr(e, dx), xx(e, t, r);
}
function Sx(e) {
  qc(e, !1);
}
function Ua(e, t, r, i) {
  i ? Sx(e) : Oh(e, t, r);
}
function xx(e, t, r) {
  var i = ot(e);
  t != null ? (i.focus = t, i.blurScope = r) : i.focus && (i.focus = null);
}
var td = ["emphasis", "blur", "select"], Tx = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Eh(e, t, r, i) {
  r = r || "itemStyle";
  for (var n = 0; n < td.length; n++) {
    var a = td[n], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[Tx[r]]();
  }
}
function qc(e, t) {
  var r = t === !1, i = e;
  e.highDownSilentOnTouch && (i.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !r);
}
function kh(e) {
  return !!(e && e.__highDownDispatcher);
}
function Cx(e) {
  var t = Xv[e];
  return t == null && Yv <= 32 && (t = Xv[e] = Yv++), t;
}
function Nh(e) {
  var t = e.type;
  return t === Ca || t === fs || t === Ma;
}
function ed(e) {
  var t = e.type;
  return t === Di || t === cs;
}
function Mx(e) {
  var t = jy(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var Zi = Ri.CMD, Dx = [[], [], []], rd = Math.sqrt, Ax = Math.atan2;
function Ix(e, t) {
  if (t) {
    var r = e.data, i = e.len(), n, a, o, s, l, u, h = Zi.M, c = Zi.C, v = Zi.L, f = Zi.R, d = Zi.A, g = Zi.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = r[o++], s = o, a = 0, n) {
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
          var p = t[4], y = t[5], m = rd(t[0] * t[0] + t[1] * t[1]), _ = rd(t[2] * t[2] + t[3] * t[3]), b = Ax(-t[1] / _, t[0] / m);
          r[o] *= m, r[o++] += p, r[o] *= _, r[o++] += y, r[o++] *= m, r[o++] *= _, r[o++] += b, r[o++] += b, o += 2, s = o;
          break;
        case f:
          u[0] = r[o++], u[1] = r[o++], me(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], me(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = Dx[l];
        S[0] = r[o++], S[1] = r[o++], me(S, S, t), r[s++] = S[0], r[s++] = S[1];
      }
    }
    e.increaseVersion();
  }
}
var Su = Math.sqrt, Io = Math.sin, Lo = Math.cos, Qn = Math.PI;
function id(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Bh(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (id(e) * id(t));
}
function nd(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Bh(e, t));
}
function ad(e, t, r, i, n, a, o, s, l, u, h) {
  var c = l * (Qn / 180), v = Lo(c) * (e - r) / 2 + Io(c) * (t - i) / 2, f = -1 * Io(c) * (e - r) / 2 + Lo(c) * (t - i) / 2, d = v * v / (o * o) + f * f / (s * s);
  d > 1 && (o *= Su(d), s *= Su(d));
  var g = (n === a ? -1 : 1) * Su((o * o * (s * s) - o * o * (f * f) - s * s * (v * v)) / (o * o * (f * f) + s * s * (v * v))) || 0, p = g * o * f / s, y = g * -s * v / o, m = (e + r) / 2 + Lo(c) * p - Io(c) * y, _ = (t + i) / 2 + Io(c) * p + Lo(c) * y, b = nd([1, 0], [(v - p) / o, (f - y) / s]), S = [(v - p) / o, (f - y) / s], w = [(-1 * v - p) / o, (-1 * f - y) / s], x = nd(S, w);
  if (Bh(S, w) <= -1 && (x = Qn), Bh(S, w) >= 1 && (x = 0), x < 0) {
    var M = Math.round(x / Qn * 1e6) / 1e6;
    x = Qn * 2 + M % 2 * Qn;
  }
  h.addData(u, m, _, o, s, b, x, c, a);
}
var Lx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Px = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function $x(e) {
  var t = new Ri();
  if (!e)
    return t;
  var r = 0, i = 0, n = r, a = i, o, s = Ri.CMD, l = e.match(Lx);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], c = h.charAt(0), v = void 0, f = h.match(Px) || [], d = f.length, g = 0; g < d; g++)
      f[g] = parseFloat(f[g]);
    for (var p = 0; p < d; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = r, D = i, A = void 0, T = void 0;
      switch (c) {
        case "l":
          r += f[p++], i += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "L":
          r = f[p++], i = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "m":
          r += f[p++], i += f[p++], v = s.M, t.addData(v, r, i), n = r, a = i, c = "l";
          break;
        case "M":
          r = f[p++], i = f[p++], v = s.M, t.addData(v, r, i), n = r, a = i, c = "L";
          break;
        case "h":
          r += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "H":
          r = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "v":
          i += f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "V":
          i = f[p++], v = s.L, t.addData(v, r, i);
          break;
        case "C":
          v = s.C, t.addData(v, f[p++], f[p++], f[p++], f[p++], f[p++], f[p++]), r = f[p - 2], i = f[p - 1];
          break;
        case "c":
          v = s.C, t.addData(v, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i, f[p++] + r, f[p++] + i), r += f[p - 2], i += f[p - 1];
          break;
        case "S":
          y = r, m = i, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += i - T[A - 3]), v = s.C, M = f[p++], D = f[p++], r = f[p++], i = f[p++], t.addData(v, y, m, M, D, r, i);
          break;
        case "s":
          y = r, m = i, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += i - T[A - 3]), v = s.C, M = r + f[p++], D = i + f[p++], r += f[p++], i += f[p++], t.addData(v, y, m, M, D, r, i);
          break;
        case "Q":
          M = f[p++], D = f[p++], r = f[p++], i = f[p++], v = s.Q, t.addData(v, M, D, r, i);
          break;
        case "q":
          M = f[p++] + r, D = f[p++] + i, r += f[p++], i += f[p++], v = s.Q, t.addData(v, M, D, r, i);
          break;
        case "T":
          y = r, m = i, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += i - T[A - 3]), r = f[p++], i = f[p++], v = s.Q, t.addData(v, y, m, r, i);
          break;
        case "t":
          y = r, m = i, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += i - T[A - 3]), r += f[p++], i += f[p++], v = s.Q, t.addData(v, y, m, r, i);
          break;
        case "A":
          _ = f[p++], b = f[p++], S = f[p++], w = f[p++], x = f[p++], M = r, D = i, r = f[p++], i = f[p++], v = s.A, ad(M, D, r, i, w, x, _, b, S, v, t);
          break;
        case "a":
          _ = f[p++], b = f[p++], S = f[p++], w = f[p++], x = f[p++], M = r, D = i, r += f[p++], i += f[p++], v = s.A, ad(M, D, r, i, w, x, _, b, S, v, t);
          break;
      }
    }
    (c === "z" || c === "Z") && (v = s.Z, t.addData(v), r = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var om = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
}(ct);
function sm(e) {
  return e.setData != null;
}
function lm(e, t) {
  var r = $x(e), i = N({}, t);
  return i.buildPath = function(n) {
    if (sm(n)) {
      n.setData(r.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      r.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    Ix(r, n), this.dirtyShape();
  }, i;
}
function Rx(e, t) {
  return new om(lm(e, t));
}
function Ox(e, t) {
  var r = lm(e, t), i = function(n) {
    B(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  }(om);
  return i;
}
function Ex(e, t) {
  for (var r = [], i = e.length, n = 0; n < i; n++) {
    var a = e[n];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new ct(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (sm(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var kx = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
}(), fl = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new kx();
  }, t.prototype.buildPath = function(r, i) {
    r.moveTo(i.cx + i.r, i.cy), r.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(ct);
fl.prototype.type = "circle";
var Nx = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
}(), Zc = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Nx();
  }, t.prototype.buildPath = function(r, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, h = l * n;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), r.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), r.closePath();
  }, t;
}(ct);
Zc.prototype.type = "ellipse";
var um = Math.PI, xu = um * 2, hi = Math.sin, Ki = Math.cos, Bx = Math.acos, Ot = Math.atan2, od = Math.abs, Da = Math.sqrt, ya = Math.max, He = Math.min, De = 1e-4;
function zx(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, h = o - n, c = s - a, v = c * l - h * u;
  if (!(v * v < De))
    return v = (h * (t - a) - c * (e - n)) / v, [e + v * l, t + v * u];
}
function Po(e, t, r, i, n, a, o) {
  var s = e - r, l = t - i, u = (o ? a : -a) / Da(s * s + l * l), h = u * l, c = -u * s, v = e + h, f = t + c, d = r + h, g = i + c, p = (v + d) / 2, y = (f + g) / 2, m = d - v, _ = g - f, b = m * m + _ * _, S = n - a, w = v * g - d * f, x = (_ < 0 ? -1 : 1) * Da(ya(0, S * S * b - w * w)), M = (w * _ - m * x) / b, D = (-w * m - _ * x) / b, A = (w * _ + m * x) / b, T = (-w * m + _ * x) / b, I = M - p, P = D - y, $ = A - p, R = T - y;
  return I * I + P * P > $ * $ + R * R && (M = A, D = T), {
    cx: M,
    cy: D,
    x0: -h,
    y0: -c,
    x1: M * (n / S - 1),
    y1: D * (n / S - 1)
  };
}
function Fx(e) {
  var t;
  if (z(e)) {
    var r = e.length;
    if (!r)
      return e;
    r === 1 ? t = [e[0], e[0], 0, 0] : r === 2 ? t = [e[0], e[0], e[1], e[1]] : r === 3 ? t = e.concat(e[2]) : t = e;
  } else
    t = [e, e, e, e];
  return t;
}
function Hx(e, t) {
  var r, i = ya(t.r, 0), n = ya(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, c = t.cy, v = !!t.clockwise, f = od(u - l), d = f > xu && f % xu;
      if (d > De && (f = d), !(i > De))
        e.moveTo(h, c);
      else if (f > xu - De)
        e.moveTo(h + i * Ki(l), c + i * hi(l)), e.arc(h, c, i, l, u, !v), n > De && (e.moveTo(h + n * Ki(u), c + n * hi(u)), e.arc(h, c, n, u, l, v));
      else {
        var g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = void 0, D = void 0, A = void 0, T = void 0, I = void 0, P = void 0, $ = void 0, R = i * Ki(l), O = i * hi(l), G = n * Ki(u), E = n * hi(u), F = f > De;
        if (F) {
          var W = t.cornerRadius;
          W && (r = Fx(W), g = r[0], p = r[1], y = r[2], m = r[3]);
          var j = od(i - n) / 2;
          if (_ = He(j, y), b = He(j, m), S = He(j, g), w = He(j, p), D = x = ya(_, b), A = M = ya(S, w), (x > De || M > De) && (T = i * Ki(u), I = i * hi(u), P = n * Ki(l), $ = n * hi(l), f < um)) {
            var et = zx(R, O, P, $, T, I, G, E);
            if (et) {
              var ft = R - et[0], mt = O - et[1], St = T - et[0], xe = I - et[1], Xr = 1 / hi(Bx((ft * St + mt * xe) / (Da(ft * ft + mt * mt) * Da(St * St + xe * xe))) / 2), Vi = Da(et[0] * et[0] + et[1] * et[1]);
              D = He(x, (i - Vi) / (Xr + 1)), A = He(M, (n - Vi) / (Xr - 1));
            }
          }
        }
        if (!F)
          e.moveTo(h + R, c + O);
        else if (D > De) {
          var ie = He(y, D), Lt = He(m, D), K = Po(P, $, R, O, i, ie, v), rt = Po(T, I, G, E, i, Lt, v);
          e.moveTo(h + K.cx + K.x0, c + K.cy + K.y0), D < x && ie === Lt ? e.arc(h + K.cx, c + K.cy, D, Ot(K.y0, K.x0), Ot(rt.y0, rt.x0), !v) : (ie > 0 && e.arc(h + K.cx, c + K.cy, ie, Ot(K.y0, K.x0), Ot(K.y1, K.x1), !v), e.arc(h, c, i, Ot(K.cy + K.y1, K.cx + K.x1), Ot(rt.cy + rt.y1, rt.cx + rt.x1), !v), Lt > 0 && e.arc(h + rt.cx, c + rt.cy, Lt, Ot(rt.y1, rt.x1), Ot(rt.y0, rt.x0), !v));
        } else
          e.moveTo(h + R, c + O), e.arc(h, c, i, l, u, !v);
        if (!(n > De) || !F)
          e.lineTo(h + G, c + E);
        else if (A > De) {
          var ie = He(g, A), Lt = He(p, A), K = Po(G, E, T, I, n, -Lt, v), rt = Po(R, O, P, $, n, -ie, v);
          e.lineTo(h + K.cx + K.x0, c + K.cy + K.y0), A < M && ie === Lt ? e.arc(h + K.cx, c + K.cy, A, Ot(K.y0, K.x0), Ot(rt.y0, rt.x0), !v) : (Lt > 0 && e.arc(h + K.cx, c + K.cy, Lt, Ot(K.y0, K.x0), Ot(K.y1, K.x1), !v), e.arc(h, c, n, Ot(K.cy + K.y1, K.cx + K.x1), Ot(rt.cy + rt.y1, rt.cx + rt.x1), v), ie > 0 && e.arc(h + rt.cx, c + rt.cy, ie, Ot(rt.y1, rt.x1), Ot(rt.y0, rt.x0), !v));
        } else
          e.lineTo(h + G, c + E), e.arc(h, c, n, u, l, v);
      }
      e.closePath();
    }
  }
}
var Vx = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
}(), zn = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Vx();
  }, t.prototype.buildPath = function(r, i) {
    Hx(r, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(ct);
zn.prototype.type = "sector";
var Gx = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
}(), Kc = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Gx();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    r.moveTo(n + i.r, a), r.arc(n, a, i.r, 0, o, !1), r.moveTo(n + i.r0, a), r.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(ct);
Kc.prototype.type = "ring";
function Wx(e, t, r, i) {
  var n = [], a = [], o = [], s = [], l, u, h, c;
  if (i) {
    h = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var v = 0, f = e.length; v < f; v++)
      hn(h, h, e[v]), cn(c, c, e[v]);
    hn(h, h, i[0]), cn(c, c, i[1]);
  }
  for (var v = 0, f = e.length; v < f; v++) {
    var d = e[v];
    if (r)
      l = e[v ? v - 1 : f - 1], u = e[(v + 1) % f];
    else if (v === 0 || v === f - 1) {
      n.push(w1(e[v]));
      continue;
    } else
      l = e[v - 1], u = e[v + 1];
    S1(a, u, l), zl(a, a, t);
    var g = dh(d, l), p = dh(d, u), y = g + p;
    y !== 0 && (g /= y, p /= y), zl(o, a, -g), zl(s, a, p);
    var m = Kf([], d, o), _ = Kf([], d, s);
    i && (cn(m, m, h), hn(m, m, c), cn(_, _, h), hn(_, _, c)), n.push(m), n.push(_);
  }
  return r && n.push(n.shift()), n;
}
function hm(e, t, r) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Wx(n, i, r, t.smoothConstraint);
      e.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], h = n[(s + 1) % o];
        e.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
      }
    } else {
      e.moveTo(n[0][0], n[0][1]);
      for (var s = 1, c = n.length; s < c; s++)
        e.lineTo(n[s][0], n[s][1]);
    }
    r && e.closePath();
  }
}
var Ux = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), vl = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ux();
  }, t.prototype.buildPath = function(r, i) {
    hm(r, i, !0);
  }, t;
}(ct);
vl.prototype.type = "polygon";
var Yx = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), jc = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Yx();
  }, t.prototype.buildPath = function(r, i) {
    hm(r, i, !1);
  }, t;
}(ct);
jc.prototype.type = "polyline";
var Xx = {}, qx = /* @__PURE__ */ function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return e;
}(), Ur = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new qx();
  }, t.prototype.buildPath = function(r, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Zy(Xx, i, this.style);
      n = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var u = i.percent;
    u !== 0 && (r.moveTo(n, a), u < 1 && (o = n * (1 - u) + o * u, s = a * (1 - u) + s * u), r.lineTo(o, s));
  }, t.prototype.pointAt = function(r) {
    var i = this.shape;
    return [
      i.x1 * (1 - r) + i.x2 * r,
      i.y1 * (1 - r) + i.y2 * r
    ];
  }, t;
}(ct);
Ur.prototype.type = "line";
var Ut = [], Zx = /* @__PURE__ */ function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
}();
function sd(e, t, r) {
  var i = e.cpx2, n = e.cpy2;
  return i != null || n != null ? [
    (r ? sv : $t)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? sv : $t)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? lv : Kt)(e.x1, e.cpx1, e.x2, t),
    (r ? lv : Kt)(e.y1, e.cpy1, e.y2, t)
  ];
}
var Qc = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Zx();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, h = i.cpx2, c = i.cpy2, v = i.percent;
    v !== 0 && (r.moveTo(n, a), h == null || c == null ? (v < 1 && (Ls(n, l, o, v, Ut), l = Ut[1], o = Ut[2], Ls(a, u, s, v, Ut), u = Ut[1], s = Ut[2]), r.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Is(n, l, h, o, v, Ut), l = Ut[1], h = Ut[2], o = Ut[3], Is(a, u, c, s, v, Ut), u = Ut[1], c = Ut[2], s = Ut[3]), r.bezierCurveTo(l, u, h, c, o, s)));
  }, t.prototype.pointAt = function(r) {
    return sd(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var i = sd(this.shape, r, !0);
    return C1(i, i);
  }, t;
}(ct);
Qc.prototype.type = "bezier-curve";
var Kx = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
}(), dl = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Kx();
  }, t.prototype.buildPath = function(r, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, h = Math.cos(s), c = Math.sin(s);
    r.moveTo(h * o + n, c * o + a), r.arc(n, a, o, s, l, !u);
  }, t;
}(ct);
dl.prototype.type = "arc";
var jx = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.type = "compound", r;
  }
  return t.prototype._updatePathDirty = function() {
    for (var r = this.shape.paths, i = this.shapeChanged(), n = 0; n < r.length; n++)
      i = i || r[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var r = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < r.length; n++)
      r[n].path || r[n].createPathProxy(), r[n].path.setScale(i[0], i[1], r[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(r, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(r, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var r = this.shape.paths || [], i = 0; i < r.length; i++)
      r[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), ct.prototype.getBoundingRect.call(this);
  }, t;
}(ct), cm = function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
}(), Jc = function(e) {
  B(t, e);
  function t(r, i, n, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(cm), Qx = function(e) {
  B(t, e);
  function t(r, i, n, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(cm), ci = [0, 0], fi = [0, 0], $o = new dt(), Ro = new dt(), zs = function() {
  function e(t, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new dt();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new dt();
    t && this.fromBoundingRect(t, r);
  }
  return e.prototype.fromBoundingRect = function(t, r) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        i[u].transform(r);
    dt.sub(n[0], i[1], i[0]), dt.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, e.prototype.intersect = function(t, r) {
    var i = !0, n = !r;
    return $o.set(1 / 0, 1 / 0), Ro.set(0, 0), !this._intersectCheckOneSide(this, t, $o, Ro, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, $o, Ro, n, -1) && (i = !1, n) || n || dt.copy(r, i ? $o : Ro), i;
  }, e.prototype._intersectCheckOneSide = function(t, r, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, ci), this._getProjMinMaxOnAxis(l, r._corners, fi), ci[1] < fi[0] || ci[0] > fi[1]) {
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
  }, e.prototype._getProjMinMaxOnAxis = function(t, r, i) {
    for (var n = this._axes[t], a = this._origin, o = r[0].dot(n) + a[t], s = o, l = o, u = 1; u < r.length; u++) {
      var h = r[u].dot(n) + a[t];
      s = Math.min(h, s), l = Math.max(h, l);
    }
    i[0] = s, i[1] = l;
  }, e;
}(), Jx = [], tT = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.notClear = !0, r.incremental = !0, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r;
  }
  return t.prototype.traverse = function(r, i) {
    r.call(i, this);
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
  }, t.prototype.addDisplayable = function(r, i) {
    i ? this._temporaryDisplayables.push(r) : this._displayables.push(r), this.markRedraw();
  }, t.prototype.addDisplayables = function(r, i) {
    i = i || !1;
    for (var n = 0; n < r.length; n++)
      this.addDisplayable(r[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(r) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      r && r(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      r && r(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var r = this._cursor; r < this._displayables.length; r++) {
      var i = this._displayables[r];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var r = 0; r < this._temporaryDisplayables.length; r++) {
      var i = this._temporaryDisplayables[r];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var r = new lt(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(Jx)), r.union(a);
      }
      this._rect = r;
    }
    return this._rect;
  }, t.prototype.contain = function(r, i) {
    var n = this.transformCoordToLocal(r, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(r, i))
          return !0;
      }
    return !1;
  }, t;
}(uo), eT = It();
function rT(e, t, r, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = e === "update";
  if (s) {
    var u = void 0, h = void 0, c = void 0;
    i ? (u = tt(i.duration, 200), h = tt(i.easing, "cubicOut"), c = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), c = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (c = a.delay)), Z(c) && (c = c(r, n)), Z(u) && (u = u(r));
    var v = {
      duration: u || 0,
      delay: c,
      easing: h
    };
    return v;
  } else
    return null;
}
function tf(e, t, r, i, n, a, o) {
  var s = !1, l;
  Z(n) ? (o = a, a = n, n = null) : V(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var h = rT(e, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
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
      scope: e,
      during: o
    };
    s ? t.animateFrom(r, d) : t.animateTo(r, d);
  } else
    t.stopAnimation(), !s && t.attr(r), o && o(1), a && a();
}
function se(e, t, r, i, n, a) {
  tf("update", e, t, r, i, n, a);
}
function gr(e, t, r, i, n, a) {
  tf("enter", e, t, r, i, n, a);
}
function Aa(e) {
  if (!e.__zr)
    return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function Fs(e, t, r, i, n, a) {
  Aa(e) || tf("leave", e, t, r, i, n, a);
}
function ld(e, t, r, i) {
  e.removeTextContent(), e.removeTextGuideLine(), Fs(e, {
    style: {
      opacity: 0
    }
  }, t, r, i);
}
function zh(e, t, r) {
  function i() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(n) {
    n.isGroup || ld(n, t, r, i);
  }) : ld(e, t, r, i);
}
function fm(e) {
  eT(e).oldStyle = e.style;
}
var Hs = Math.max, Vs = Math.min, Fh = {};
function iT(e) {
  return ct.extend(e);
}
var nT = Ox;
function aT(e, t) {
  return nT(e, t);
}
function Ne(e, t) {
  Fh[e] = t;
}
function oT(e) {
  if (Fh.hasOwnProperty(e))
    return Fh[e];
}
function ef(e, t, r, i) {
  var n = Rx(e, t);
  return r && (i === "center" && (r = dm(r, n.getBoundingRect())), pm(n, r)), n;
}
function vm(e, t, r) {
  var i = new rr({
    style: {
      image: e,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(n) {
      if (r === "center") {
        var a = {
          width: n.width,
          height: n.height
        };
        i.setStyle(dm(t, a));
      }
    }
  });
  return i;
}
function dm(e, t) {
  var r = t.width / t.height, i = e.height * r, n;
  i <= e.width ? n = e.height : (i = e.width, n = i / r);
  var a = e.x + e.width / 2, o = e.y + e.height / 2;
  return {
    x: a - i / 2,
    y: o - n / 2,
    width: i,
    height: n
  };
}
var sT = Ex;
function pm(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), i = r.calculateTransform(t);
    e.applyTransform(i);
  }
}
function Ya(e, t) {
  return Zy(e, e, {
    lineWidth: t
  }), e;
}
function lT(e) {
  return Ky(e.shape, e.shape, e.style), e;
}
var uT = Si;
function vs(e, t) {
  for (var r = Rc([]); e && e !== t; )
    yn(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function _n(e, t, r) {
  return t && !Jt(t) && (t = Nc.getLocalTransform(t)), r && (t = Ec([], t)), me([], e, t);
}
function gm(e, t, r) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [e === "left" ? -i : e === "right" ? i : 0, e === "top" ? -n : e === "bottom" ? n : 0];
  return a = _n(a, t, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function ud(e) {
  return !e.isGroup;
}
function hT(e) {
  return e.shape != null;
}
function ym(e, t, r) {
  if (!e || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      ud(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return hT(o) && (s.shape = N({}, o.shape)), s;
  }
  var a = i(e);
  t.traverse(function(o) {
    if (ud(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), se(o, l, r, ot(o).dataIndex);
      }
    }
  });
}
function cT(e, t) {
  return U(e, function(r) {
    var i = r[0];
    i = Hs(i, t.x), i = Vs(i, t.x + t.width);
    var n = r[1];
    return n = Hs(n, t.y), n = Vs(n, t.y + t.height), [i, n];
  });
}
function fT(e, t) {
  var r = Hs(e.x, t.x), i = Vs(e.x + e.width, t.x + t.width), n = Hs(e.y, t.y), a = Vs(e.y + e.height, t.y + t.height);
  if (i >= r && a >= n)
    return {
      x: r,
      y: n,
      width: i - r,
      height: a - n
    };
}
function rf(e, t, r) {
  var i = N({
    rectHover: !0
  }, t), n = i.style = {
    strokeNoScale: !0
  };
  if (r = r || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, e)
    return e.indexOf("image://") === 0 ? (n.image = e.slice(8), ut(n, r), new rr(i)) : ef(e.replace("path://", ""), i, r, "center");
}
function vT(e, t, r, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (mm(e, t, r, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function mm(e, t, r, i, n, a, o, s) {
  var l = r - e, u = i - t, h = o - n, c = s - a, v = Tu(h, c, l, u);
  if (dT(v))
    return !1;
  var f = e - n, d = t - a, g = Tu(f, d, l, u) / v;
  if (g < 0 || g > 1)
    return !1;
  var p = Tu(f, d, h, c) / v;
  return !(p < 0 || p > 1);
}
function Tu(e, t, r, i) {
  return e * i - r * t;
}
function dT(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function pl(e) {
  var t = e.itemTooltipOption, r = e.componentModel, i = e.itemName, n = H(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && C(gt(l), function(h) {
    Pi(s, h) || (s[h] = l[h], s.$vars.push(h));
  });
  var u = ot(e.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ut({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function hd(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function ho(e, t) {
  if (e)
    if (z(e))
      for (var r = 0; r < e.length; r++)
        hd(e[r], t);
    else
      hd(e, t);
}
Ne("circle", fl);
Ne("ellipse", Zc);
Ne("sector", zn);
Ne("ring", Kc);
Ne("polygon", vl);
Ne("polyline", jc);
Ne("rect", bt);
Ne("line", Ur);
Ne("bezierCurve", Qc);
Ne("arc", dl);
const pT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: dl,
  BezierCurve: Qc,
  BoundingRect: lt,
  Circle: fl,
  CompoundPath: jx,
  Ellipse: Zc,
  Group: Ct,
  Image: rr,
  IncrementalDisplayable: tT,
  Line: Ur,
  LinearGradient: Jc,
  OrientedBoundingRect: zs,
  Path: ct,
  Point: dt,
  Polygon: vl,
  Polyline: jc,
  RadialGradient: Qx,
  Rect: bt,
  Ring: Kc,
  Sector: zn,
  Text: At,
  applyTransform: _n,
  clipPointsByRect: cT,
  clipRectByRect: fT,
  createIcon: rf,
  extendPath: aT,
  extendShape: iT,
  getShapeClass: oT,
  getTransform: vs,
  groupTransition: ym,
  initProps: gr,
  isElementRemoved: Aa,
  lineLineIntersect: mm,
  linePolygonIntersect: vT,
  makeImage: vm,
  makePath: ef,
  mergePath: sT,
  registerShape: Ne,
  removeElement: Fs,
  removeElementWithFadeOut: zh,
  resizePath: pm,
  setTooltipConfig: pl,
  subPixelOptimize: uT,
  subPixelOptimizeLine: Ya,
  subPixelOptimizeRect: lT,
  transformDirection: gm,
  traverseElements: ho,
  updateProps: se
}, Symbol.toStringTag, { value: "Module" }));
var gl = {};
function gT(e, t) {
  for (var r = 0; r < Ke.length; r++) {
    var i = Ke[r], n = t[i], a = e.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function cd(e, t, r) {
  var i = e.labelFetcher, n = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = Z(e.defaultText) ? e.defaultText(n, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ke.length; u++) {
    var h = Ke[u], c = t[h];
    l[h] = tt(i ? i.getFormattedLabel(n, h, null, a, c && c.get("formatter")) : null, s);
  }
  return l;
}
function co(e, t, r, i) {
  r = r || gl;
  for (var n = e instanceof At, a = !1, o = 0; o < qv.length; o++) {
    var s = t[qv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? e : e.getTextContent();
  if (a) {
    n || (l || (l = new At(), e.setTextContent(l)), e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = cd(r, t), h = t.normal, c = !!h.getShallow("show"), v = Xe(h, i && i.normal, r, !1, !n);
    v.text = u.normal, n || e.setTextConfig(fd(h, r, !1));
    for (var o = 0; o < Ke.length; o++) {
      var f = Ke[o], s = t[f];
      if (s) {
        var d = l.ensureState(f), g = !!tt(s.getShallow("show"), c);
        if (g !== c && (d.ignore = !g), d.style = Xe(s, i && i[f], r, !0, !n), d.style.text = u[f], !n) {
          var p = e.ensureState(f);
          p.textConfig = fd(s, r, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !c, l.useStyle(v), l.dirty(), r.enableTextSetter && (yl(l).setLabelText = function(y) {
      var m = cd(r, t, y);
      gT(l, m);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function An(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, i = 0; i < Ke.length; i++) {
    var n = Ke[i];
    r[n] = e.getModel([n, t]);
  }
  return r;
}
function Xe(e, t, r, i, n) {
  var a = {};
  return yT(a, e, r, i, n), t && N(a, t), a;
}
function fd(e, t, r) {
  t = t || {};
  var i = {}, n, a = e.getShallow("rotate"), o = tt(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return n = e.getShallow("position") || (r ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function yT(e, t, r, i, n) {
  r = r || gl;
  var a = t.ecModel, o = a && a.option.textStyle, s = mT(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        gd(l[u] = {}, h, o, r, i, n, !1, !0);
      }
  }
  l && (e.rich = l);
  var c = t.get("overflow");
  c && (e.overflow = c);
  var v = t.get("minMargin");
  v != null && (e.margin = v), gd(e, t, o, r, i, n, !0, !1);
}
function mT(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || gl).rich;
    if (r) {
      t = t || {};
      for (var i = gt(r), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var vd = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], dd = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], pd = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function gd(e, t, r, i, n, a, o, s) {
  r = !n && r || gl;
  var l = i && i.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), c = tt(t.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || r.color, h = h || r.textBorderColor), u != null && (e.fill = u), h != null && (e.stroke = h);
  var v = tt(t.getShallow("textBorderWidth"), r.textBorderWidth);
  v != null && (e.lineWidth = v);
  var f = tt(t.getShallow("textBorderType"), r.textBorderType);
  f != null && (e.lineDash = f);
  var d = tt(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  d != null && (e.lineDashOffset = d), !n && c == null && !s && (c = i && i.defaultOpacity), c != null && (e.opacity = c), !n && !a && e.fill == null && i.inheritColor && (e.fill = i.inheritColor);
  for (var g = 0; g < vd.length; g++) {
    var p = vd[g], y = tt(t.getShallow(p), r[p]);
    y != null && (e[p] = y);
  }
  for (var g = 0; g < dd.length; g++) {
    var p = dd[g], y = t.getShallow(p);
    y != null && (e[p] = y);
  }
  if (e.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (e.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var g = 0; g < pd.length; g++) {
      var p = pd[g], y = t.getShallow(p);
      y != null && (e[p] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (e.borderDash = _), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && l && (e.backgroundColor = l), (e.borderColor === "auto" || e.borderColor === "inherit") && l && (e.borderColor = l);
  }
}
function _T(e, t) {
  var r = t && t.getModel("textStyle");
  return Ue([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var yl = It();
function bT(e, t, r, i) {
  if (e) {
    var n = yl(e);
    n.prevValue = n.value, n.value = r;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var wT = ["textStyle", "color"], Cu = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Mu = new At(), ST = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(wT) : null);
    }, e.prototype.getFont = function() {
      return _T({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < Cu.length; i++)
        r[Cu[i]] = this.getShallow(Cu[i]);
      return Mu.useStyle(r), Mu.update(), Mu.getBoundingRect();
    }, e;
  }()
), _m = [
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
], xT = Wa(_m), TT = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return xT(this, t);
    }, e;
  }()
), bm = [
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
], CT = Wa(bm), MT = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return CT(this, t, r);
    }, e;
  }()
), xt = (
  /** @class */
  function() {
    function e(t, r, i) {
      this.parentModel = r, this.ecModel = i, this.option = t;
    }
    return e.prototype.init = function(t, r, i) {
    }, e.prototype.mergeOption = function(t, r) {
      nt(this.option, t, !0);
    }, e.prototype.get = function(t, r) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !r && this.parentModel);
    }, e.prototype.getShallow = function(t, r) {
      var i = this.option, n = i == null ? i : i[t];
      if (n == null && !r) {
        var a = this.parentModel;
        a && (n = a.getShallow(t));
      }
      return n;
    }, e.prototype.getModel = function(t, r) {
      var i = t != null, n = i ? this.parsePath(t) : null, a = i ? this._doGet(n) : this.option;
      return r = r || this.parentModel && this.parentModel.getModel(this.resolveParentPath(n)), new e(a, r, this.ecModel);
    }, e.prototype.isEmpty = function() {
      return this.option == null;
    }, e.prototype.restoreData = function() {
    }, e.prototype.clone = function() {
      var t = this.constructor;
      return new t(q(this.option));
    }, e.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, e.prototype.resolveParentPath = function(t) {
      return t;
    }, e.prototype.isAnimationEnabled = function() {
      if (!X.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, e.prototype._doGet = function(t, r) {
      var i = this.option;
      if (!t)
        return i;
      for (var n = 0; n < t.length && !(t[n] && (i = i && typeof i == "object" ? i[t[n]] : null, i == null)); n++)
        ;
      return i == null && r && (i = r._doGet(this.resolveParentPath(t), r.parentModel)), i;
    }, e;
  }()
);
Gc(xt);
fS(xt);
tr(xt, TT);
tr(xt, MT);
tr(xt, yS);
tr(xt, ST);
var DT = Math.round(Math.random() * 10);
function ml(e) {
  return [e || "", DT++].join("_");
}
function AT(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, i) {
    var n = Ye(r);
    t[n.main] = i;
  }, e.determineSubType = function(r, i) {
    var n = i.type;
    if (!n) {
      var a = Ye(r).main;
      e.hasSubTypes(r) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function IT(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), h = u.graph, c = u.noEntryList, v = {};
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
  function r(a) {
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
function _l(e, t) {
  return nt(nt({}, e, !0), t, !0);
}
const LT = {
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
}, PT = {
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
var Gs = "ZH", nf = "EN", bn = nf, ds = {}, af = {}, wm = X.domSupported ? function() {
  var e = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || bn).toUpperCase()
  );
  return e.indexOf(Gs) > -1 ? Gs : bn;
}() : bn;
function Sm(e, t) {
  e = e.toUpperCase(), af[e] = new xt(t), ds[e] = t;
}
function $T(e) {
  if (H(e)) {
    var t = ds[e.toUpperCase()] || {};
    return e === Gs || e === nf ? q(t) : nt(q(t), q(ds[bn]), !1);
  } else
    return nt(q(e), q(ds[bn]), !1);
}
function RT(e) {
  return af[e];
}
function OT() {
  return af[bn];
}
Sm(nf, LT);
Sm(Gs, PT);
var of = 1e3, sf = of * 60, Ia = sf * 60, ye = Ia * 24, yd = ye * 365, ma = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Oo = "{yyyy}-{MM}-{dd}", md = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Oo,
  hour: Oo + " " + ma.hour,
  minute: Oo + " " + ma.minute,
  second: Oo + " " + ma.second,
  millisecond: ma.none
}, Du = ["year", "month", "day", "hour", "minute", "second", "millisecond"], xm = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function Ar(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function wn(e) {
  switch (e) {
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
      return e;
  }
}
function ET(e) {
  return e === wn(e);
}
function kT(e) {
  switch (e) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function bl(e, t, r, i) {
  var n = pr(e), a = n[lf(r)](), o = n[Sn(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[wl(r)](), u = n["get" + (r ? "UTC" : "") + "Day"](), h = n[Xa(r)](), c = (h - 1) % 12 + 1, v = n[Sl(r)](), f = n[xl(r)](), d = n[Tl(r)](), g = h >= 12 ? "pm" : "am", p = g.toUpperCase(), y = i instanceof xt ? i : RT(i || wm) || OT(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), S = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Ar(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, Ar(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Ar(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Ar(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Ar(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Ar(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, Ar(f, 2)).replace(/{s}/g, f + "").replace(/{SSS}/g, Ar(d, 3)).replace(/{S}/g, d + "");
}
function NT(e, t, r, i, n) {
  var a = null;
  if (H(r))
    a = r;
  else if (Z(r))
    a = r(e.value, t, {
      level: e.level
    });
  else {
    var o = N({}, ma);
    if (e.level > 0)
      for (var s = 0; s < Du.length; ++s)
        o[Du[s]] = "{primary|" + o[Du[s]] + "}";
    var l = r ? r.inherit === !1 ? r : ut(r, o) : o, u = Tm(e.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = xm.indexOf(u), s = h - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (z(a)) {
      var c = e.level == null ? 0 : e.level >= 0 ? e.level : a.length + e.level;
      c = Math.min(c, a.length - 1), a = a[c];
    }
  }
  return bl(new Date(e.value), a, n, i);
}
function Tm(e, t) {
  var r = pr(e), i = r[Sn(t)]() + 1, n = r[wl(t)](), a = r[Xa(t)](), o = r[Sl(t)](), s = r[xl(t)](), l = r[Tl(t)](), u = l === 0, h = u && s === 0, c = h && o === 0, v = c && a === 0, f = v && n === 1, d = f && i === 1;
  return d ? "year" : f ? "month" : v ? "day" : c ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function _d(e, t, r) {
  var i = yt(e) ? pr(e) : e;
  switch (t = t || Tm(e, r), t) {
    case "year":
      return i[lf(r)]();
    case "half-year":
      return i[Sn(r)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Sn(r)]() + 1) / 4);
    case "month":
      return i[Sn(r)]();
    case "day":
      return i[wl(r)]();
    case "half-day":
      return i[Xa(r)]() / 24;
    case "hour":
      return i[Xa(r)]();
    case "minute":
      return i[Sl(r)]();
    case "second":
      return i[xl(r)]();
    case "millisecond":
      return i[Tl(r)]();
  }
}
function lf(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function Sn(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function wl(e) {
  return e ? "getUTCDate" : "getDate";
}
function Xa(e) {
  return e ? "getUTCHours" : "getHours";
}
function Sl(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function xl(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function Tl(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function BT(e) {
  return e ? "setUTCFullYear" : "setFullYear";
}
function Cm(e) {
  return e ? "setUTCMonth" : "setMonth";
}
function Mm(e) {
  return e ? "setUTCDate" : "setDate";
}
function Dm(e) {
  return e ? "setUTCHours" : "setHours";
}
function Am(e) {
  return e ? "setUTCMinutes" : "setMinutes";
}
function Im(e) {
  return e ? "setUTCSeconds" : "setSeconds";
}
function Lm(e) {
  return e ? "setUTCMilliseconds" : "setMilliseconds";
}
function Pm(e) {
  if (!Ww(e))
    return H(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function $m(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, i) {
    return i.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var fo = cy;
function Hh(e, t, r) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(h) {
    return h && Ue(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = e instanceof Date;
  if (o || s) {
    var l = o ? pr(e) : e;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return bl(l, i, r);
  }
  if (t === "ordinal")
    return fh(e) ? n(e) : yt(e) && a(e) ? e + "" : "-";
  var u = Es(e);
  return a(u) ? Pm(u) : fh(e) ? n(e) : typeof e == "boolean" ? e + "" : "-";
}
var bd = ["a", "b", "c", "d", "e", "f", "g"], Au = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Rm(e, t, r) {
  z(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = bd[a];
    e = e.replace(Au(o), Au(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      e = e.replace(Au(bd[l], s), r ? Zt(u) : u);
    }
  return e;
}
function zT(e, t) {
  var r = H(e) ? {
    color: e,
    extraCssText: t
  } : e || {}, i = r.color, n = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Zt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Zt(i) + ";" + (t || "") + '"></span>';
  var o = r.markerId || "markerX";
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
function Oi(e, t) {
  return t = t || "transparent", H(e) ? e : V(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var ps = C, FT = ["left", "right", "top", "bottom", "width", "height"], Eo = [["width", "left", "right"], ["height", "top", "bottom"]];
function uf(e, t, r, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), c = t.childAt(u + 1), v = c && c.getBoundingRect(), f, d;
    if (e === "horizontal") {
      var g = h.width + (v ? -v.x + h.x : 0);
      f = a + g, f > i || l.newline ? (a = 0, f = g, o += s + r, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (v ? -v.y + h.y : 0);
      d = o + p, d > n || l.newline ? (a += s + r, o = 0, d = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = f + r : o = d + r);
  });
}
var xn = uf;
Dt(uf, "vertical");
Dt(uf, "horizontal");
function In(e, t, r) {
  r = fo(r || 0);
  var i = t.width, n = t.height, a = Vt(e.left, i), o = Vt(e.top, n), s = Vt(e.right, i), l = Vt(e.bottom, n), u = Vt(e.width, i), h = Vt(e.height, n), c = r[2] + r[0], v = r[1] + r[3], f = e.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(h) && (h = n - l - c - o), f != null && (isNaN(u) && isNaN(h) && (f > i / n ? u = i * 0.8 : h = n * 0.8), isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - h - c), e.left || e.right) {
    case "center":
      a = i / 2 - u / 2 - r[3];
      break;
    case "right":
      a = i - u - v;
      break;
  }
  switch (e.top || e.bottom) {
    case "middle":
    case "center":
      o = n / 2 - h / 2 - r[0];
      break;
    case "bottom":
      o = n - h - c;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(h) && (h = n - c - o - (l || 0));
  var d = new lt(a + r[3], o + r[0], u, h);
  return d.margin = r, d;
}
function HT(e, t, r, i, n, a) {
  a = a || e, a.x = e.x, a.y = e.y;
  var o;
  if (o = e.getBoundingRect(), e.needLocalTransform()) {
    var s = e.getLocalTransform();
    o = o.clone(), o.applyTransform(s);
  }
  var l = In(ut({
    width: o.width,
    height: o.height
  }, t), r, i), u = l.x - o.x, h = l.y - o.y;
  return a.x += u, a.y += h, a === e && e.markRedraw(), !0;
}
function qa(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return V(t) ? t : t ? {
    type: t
  } : null;
}
function Ln(e, t, r) {
  var i = r && r.ignoreSize;
  !z(i) && (i = [i, i]);
  var n = o(Eo[0], 0), a = o(Eo[1], 1);
  u(Eo[0], e, n), u(Eo[1], e, a);
  function o(h, c) {
    var v = {}, f = 0, d = {}, g = 0, p = 2;
    if (ps(h, function(_) {
      d[_] = e[_];
    }), ps(h, function(_) {
      s(t, _) && (v[_] = d[_] = t[_]), l(v, _) && f++, l(d, _) && g++;
    }), i[c])
      return l(t, h[1]) ? d[h[2]] = null : l(t, h[2]) && (d[h[1]] = null), d;
    if (g === p || !f)
      return d;
    if (f >= p)
      return v;
    for (var y = 0; y < h.length; y++) {
      var m = h[y];
      if (!s(v, m) && s(e, m)) {
        v[m] = e[m];
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
    ps(h, function(f) {
      c[f] = v[f];
    });
  }
}
function Cl(e) {
  return VT({}, e);
}
function VT(e, t) {
  return t && e && ps(FT, function(r) {
    t.hasOwnProperty(r) && (e[r] = t[r]);
  }), e;
}
var GT = It(), ht = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, i, n) {
      var a = e.call(this, r, i, n) || this;
      return a.uid = ml("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = qa(this), a = n ? Cl(r) : {}, o = i.getTheme();
      nt(r, o.get(this.mainType)), nt(r, this.getDefaultOption()), n && Ln(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      nt(this.option, r, !0);
      var n = qa(this);
      n && Ln(this.option, r, n);
    }, t.prototype.optionUpdated = function(r, i) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!uS(r))
        return r.defaultOption;
      var i = GT(this);
      if (!i.defaultOption) {
        for (var n = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = nt(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(r, i) {
      var n = r + "Index", a = r + "Id";
      return lo(this.ecModel, r, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      var r = this;
      return {
        left: r.get("left"),
        top: r.get("top"),
        right: r.get("right"),
        bottom: r.get("bottom"),
        width: r.get("width"),
        height: r.get("height")
      };
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(r) {
      this.option.zlevel = r;
    }, t.protoInitialize = function() {
      var r = t.prototype;
      r.type = "component", r.id = "", r.name = "", r.mainType = "", r.subType = "", r.componentIndex = 0;
    }(), t;
  }(xt)
);
Vy(ht, xt);
ol(ht);
AT(ht);
IT(ht, WT);
function WT(e) {
  var t = [];
  return C(ht.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = U(t, function(r) {
    return Ye(r).main;
  }), e !== "dataset" && vt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Om = "";
typeof navigator < "u" && (Om = navigator.platform || "");
var ji = "rgba(0, 0, 0, 0.2)";
const UT = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: ji,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: ji,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: ji,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: ji,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: ji,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: ji,
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
    fontFamily: Om.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Em = Q(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Se = "original", ee = "arrayRows", ir = "objectRows", Tr = "keyedColumns", Vr = "typedArray", km = "unknown", vr = "column", Fn = "row", ne = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, Nm = It();
function YT(e) {
  Nm(e).datasetMap = Q();
}
function XT(e, t, r) {
  var i = {}, n = Bm(t);
  if (!n || !e)
    return i;
  var a = [], o = [], s = t.ecModel, l = Nm(s).datasetMap, u = n.uid + "_" + r.seriesLayoutBy, h, c;
  e = e.slice(), C(e, function(g, p) {
    var y = V(g) ? g : e[p] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = p, c = d(y)), i[y.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  C(e, function(g, p) {
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
function Bm(e) {
  var t = e.get("data", !0);
  if (!t)
    return lo(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, Le).models[0];
}
function qT(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : lo(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, Le).models;
}
function zm(e, t) {
  return ZT(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function ZT(e, t, r, i, n, a) {
  var o, s = 5;
  if (te(e))
    return ne.Not;
  var l, u;
  if (i) {
    var h = i[a];
    V(h) ? (l = h.name, u = h.type) : H(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? ne.Must : ne.Not;
  if (t === ee) {
    var c = e;
    if (r === Fn) {
      for (var v = c[a], f = 0; f < (v || []).length && f < s; f++)
        if ((o = b(v[n + f])) != null)
          return o;
    } else
      for (var f = 0; f < c.length && f < s; f++) {
        var d = c[n + f];
        if (d && (o = b(d[a])) != null)
          return o;
      }
  } else if (t === ir) {
    var g = e;
    if (!l)
      return ne.Not;
    for (var f = 0; f < g.length && f < s; f++) {
      var p = g[f];
      if (p && (o = b(p[l])) != null)
        return o;
    }
  } else if (t === Tr) {
    var y = e;
    if (!l)
      return ne.Not;
    var v = y[l];
    if (!v || te(v))
      return ne.Not;
    for (var f = 0; f < v.length && f < s; f++)
      if ((o = b(v[f])) != null)
        return o;
  } else if (t === Se)
    for (var m = e, f = 0; f < m.length && f < s; f++) {
      var p = m[f], _ = so(p);
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
var KT = Q();
function jT(e, t, r) {
  var i = KT.get(t);
  if (!i)
    return r;
  var n = i(e);
  return n ? r.concat(n) : r;
}
var wd = It();
It();
var hf = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, i) {
      var n = Rt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return JT(this, wd, n, a, t, r, i);
    }, e.prototype.clearColorPalette = function() {
      tC(this, wd);
    }, e;
  }()
);
function QT(e, t) {
  for (var r = e.length, i = 0; i < r; i++)
    if (e[i].length > t)
      return e[i];
  return e[r - 1];
}
function JT(e, t, r, i, n, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var h = o == null || !i ? r : QT(i, o);
  if (h = h || r, !(!h || !h.length)) {
    var c = h[l];
    return n && (u[n] = c), s.paletteIdx = (l + 1) % h.length, c;
  }
}
function tC(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var ko, Jn, Sd, xd = "\0_ec_inner", eC = 1, cf = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new xt(a), this._locale = new xt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, i, n) {
      var a = Md(i);
      this._optionManager.setOption(r, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, i) {
      return this._resetOption(r, Md(i));
    }, t.prototype._resetOption = function(r, i) {
      var n = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? Sd(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && C(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(r) {
      this._mergeOption(r, null);
    }, t.prototype._mergeOption = function(r, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = Q(), u = i && i.replaceMergeMainTypeMap;
      YT(this), C(r, function(c, v) {
        c != null && (ht.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? q(c) : nt(n[v], c, !0));
      }), u && u.each(function(c, v) {
        ht.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), ht.topologicalTravel(s, ht.getAllClassMainTypes(), h, this);
      function h(c) {
        var v = jT(this, c, Rt(r[c])), f = a.get(c), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          f ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = Xw(f, v, d);
        tS(g, c, ht), n[c] = null, a.set(c, null), o.set(c, 0);
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
        }, this), n[c] = p, a.set(c, y), o.set(c, m), c === "series" && ko(this);
      }
      this._seriesIndices || ko(this);
    }, t.prototype.getOption = function() {
      var r = q(this.option);
      return C(r, function(i, n) {
        if (ht.hasClass(n)) {
          for (var a = Rt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Ga(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[n] = a;
        }
      }), delete r[xd], r;
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(r) {
      this._payload = r;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(r, i) {
      var n = this._componentsMap.get(r);
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
    }, t.prototype.queryComponents = function(r) {
      var i = r.mainType;
      if (!i)
        return [];
      var n = r.index, a = r.id, o = r.name, s = this._componentsMap.get(i);
      if (!s || !s.length)
        return [];
      var l;
      return n != null ? (l = [], C(Rt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Td("id", a, s) : o != null ? l = Td("name", o, s) : l = Pt(s, function(u) {
        return !!u;
      }), Cd(l, r);
    }, t.prototype.findComponents = function(r) {
      var i = r.query, n = r.mainType, a = s(i), o = a ? this.queryComponents(a) : Pt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Cd(o, r));
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
        return r.filter ? Pt(u, r.filter) : u;
      }
    }, t.prototype.eachComponent = function(r, i, n) {
      var a = this._componentsMap;
      if (Z(r)) {
        var o = i, s = r;
        a.each(function(c, v) {
          for (var f = 0; c && f < c.length; f++) {
            var d = c[f];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = H(r) ? a.get(r) : V(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && i.call(n, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var i = $e(r, null);
      return Pt(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(r) {
      return this._componentsMap.get("series")[r];
    }, t.prototype.getSeriesByType = function(r) {
      return Pt(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === r;
      });
    }, t.prototype.getSeries = function() {
      return Pt(this._componentsMap.get("series"), function(r) {
        return !!r;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(r, i) {
      Jn(this), C(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        r.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(r, i) {
      C(this._componentsMap.get("series"), function(n) {
        n && r.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, i, n) {
      Jn(this), C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, i, n) {
      return C(this.getSeriesByType(r), i, n);
    }, t.prototype.isSeriesFiltered = function(r) {
      return Jn(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, i) {
      Jn(this);
      var n = [];
      C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = Q(n);
    }, t.prototype.restoreData = function(r) {
      ko(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        ht.hasClass(o) && n.push(o);
      }), ht.topologicalTravel(n, ht.getAllClassMainTypes(), function(a) {
        C(i.get(a), function(o) {
          o && (a !== "series" || !rC(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      ko = function(r) {
        var i = r._seriesIndices = [];
        C(r._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), r._seriesIndicesMap = Q(i);
      }, Jn = function(r) {
      }, Sd = function(r, i) {
        r.option = {}, r.option[xd] = eC, r._componentsMap = Q({
          series: []
        }), r._componentsCount = Q();
        var n = i.aria;
        V(n) && n.enabled == null && (n.enabled = !0), iC(i, r._theme.option), nt(i, UT, !1), r._mergeOption(i, null);
      };
    }(), t;
  }(xt)
);
function rC(e, t) {
  if (t) {
    var r = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return r != null && e.componentIndex !== r || i != null && e.id !== i || n != null && e.name !== n;
  }
}
function iC(e, t) {
  var r = e.color && !e.colorLayer;
  C(t, function(i, n) {
    n === "colorLayer" && r || ht.hasClass(n) || (typeof i == "object" ? e[n] = e[n] ? nt(e[n], i, !1) : q(i) : e[n] == null && (e[n] = i));
  });
}
function Td(e, t, r) {
  if (z(t)) {
    var i = Q();
    return C(t, function(a) {
      if (a != null) {
        var o = $e(a, null);
        o != null && i.set(a, !0);
      }
    }), Pt(r, function(a) {
      return a && i.get(a[e]);
    });
  } else {
    var n = $e(t, null);
    return Pt(r, function(a) {
      return a && n != null && a[e] === n;
    });
  }
}
function Cd(e, t) {
  return t.hasOwnProperty("subType") ? Pt(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function Md(e) {
  var t = Q();
  return e && C(Rt(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
tr(cf, hf);
var nC = [
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
    function e(t) {
      C(nC, function(r) {
        this[r] = J(t[r], t);
      }, this);
    }
    return e;
  }()
), Iu = {}, Ml = (
  /** @class */
  function() {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function(t, r) {
      var i = [];
      C(Iu, function(n, a) {
        var o = n.create(t, r);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, e.prototype.update = function(t, r) {
      C(this._coordinateSystems, function(i) {
        i.update && i.update(t, r);
      });
    }, e.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, e.register = function(t, r) {
      Iu[t] = r;
    }, e.get = function(t) {
      return Iu[t];
    }, e;
  }()
), aC = /^(min|max)?(.+)$/, oC = (
  /** @class */
  function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, i) {
      t && (C(Rt(t.series), function(o) {
        o && o.data && te(o.data) && vh(o.data);
      }), C(Rt(t.dataset), function(o) {
        o && o.source && te(o.source) && vh(o.source);
      })), t = q(t);
      var n = this._optionBackup, a = sC(t, r, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, e.prototype.mountOption = function(t) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], q(t ? r.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function(t) {
      var r, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (r = q(
          // FIXME:TS as TimelineModel or quivlant interface
          i[n.getCurrentIndex()]
        ));
      }
      return r;
    }, e.prototype.getMediaOption = function(t) {
      var r = this._api.getWidth(), i = this._api.getHeight(), n = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!n.length && !a)
        return s;
      for (var l = 0, u = n.length; l < u; l++)
        lC(n[l].query, r, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !hC(o, this._currentMediaIndices) && (s = U(o, function(h) {
        return q(h === -1 ? a.option : n[h].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  }()
);
function sC(e, t, r) {
  var i = [], n, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, h = !!e.media, c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || h) && (e.options = e.media = null), a = e), h && z(u) && C(u, function(f) {
    f && f.option && (f.query ? i.push(f) : n || (n = f));
  }), v(a), C(l, function(f) {
    return v(f);
  }), C(i, function(f) {
    return v(f.option);
  });
  function v(f) {
    C(t, function(d) {
      d(f, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function lC(e, t, r) {
  var i = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, n = !0;
  return C(e, function(a, o) {
    var s = o.match(aC);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      uC(i[u], a, l) || (n = !1);
    }
  }), n;
}
function uC(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function hC(e, t) {
  return e.join(",") === t.join(",");
}
var Te = C, Za = V, Dd = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Lu(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, i = Dd.length; r < i; r++) {
      var n = Dd[r], a = t.normal, o = t.emphasis;
      a && a[n] && (e[n] = e[n] || {}, e[n].normal ? nt(e[n].normal, a[n]) : e[n].normal = a[n], a[n] = null), o && o[n] && (e[n] = e[n] || {}, e[n].emphasis ? nt(e[n].emphasis, o[n]) : e[n].emphasis = o[n], o[n] = null);
    }
}
function Nt(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var i = e[t].normal, n = e[t].emphasis;
    i && (r ? (e[t].normal = e[t].emphasis = null, ut(e[t], i)) : e[t] = i), n && (e.emphasis = e.emphasis || {}, e.emphasis[t] = n, n.focus && (e.emphasis.focus = n.focus), n.blurScope && (e.emphasis.blurScope = n.blurScope));
  }
}
function _a(e) {
  Nt(e, "itemStyle"), Nt(e, "lineStyle"), Nt(e, "areaStyle"), Nt(e, "label"), Nt(e, "labelLine"), Nt(e, "upperLabel"), Nt(e, "edgeLabel");
}
function Tt(e, t) {
  var r = Za(e) && e[t], i = Za(r) && r.textStyle;
  if (i)
    for (var n = 0, a = Iv.length; n < a; n++) {
      var o = Iv[n];
      i.hasOwnProperty(o) && (r[o] = i[o]);
    }
}
function fe(e) {
  e && (_a(e), Tt(e, "label"), e.emphasis && Tt(e.emphasis, "label"));
}
function cC(e) {
  if (Za(e)) {
    Lu(e), _a(e), Tt(e, "label"), Tt(e, "upperLabel"), Tt(e, "edgeLabel"), e.emphasis && (Tt(e.emphasis, "label"), Tt(e.emphasis, "upperLabel"), Tt(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (Lu(t), fe(t));
    var r = e.markLine;
    r && (Lu(r), fe(r));
    var i = e.markArea;
    i && fe(i);
    var n = e.data;
    if (e.type === "graph") {
      n = n || e.nodes;
      var a = e.links || e.edges;
      if (a && !te(a))
        for (var o = 0; o < a.length; o++)
          fe(a[o]);
      C(e.categories, function(u) {
        _a(u);
      });
    }
    if (n && !te(n))
      for (var o = 0; o < n.length; o++)
        fe(n[o]);
    if (t = e.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        fe(s[o]);
    if (r = e.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        z(l[o]) ? (fe(l[o][0]), fe(l[o][1])) : fe(l[o]);
    e.type === "gauge" ? (Tt(e, "axisLabel"), Tt(e, "title"), Tt(e, "detail")) : e.type === "treemap" ? (Nt(e.breadcrumb, "itemStyle"), C(e.levels, function(u) {
      _a(u);
    })) : e.type === "tree" && _a(e.leaves);
  }
}
function or(e) {
  return z(e) ? e : e ? [e] : [];
}
function Ad(e) {
  return (z(e) ? e[0] : e) || {};
}
function fC(e, t) {
  Te(or(e.series), function(i) {
    Za(i) && cC(i);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Te(r, function(i) {
    Te(or(e[i]), function(n) {
      n && (Tt(n, "axisLabel"), Tt(n.axisPointer, "label"));
    });
  }), Te(or(e.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    Tt(n, "axisLabel"), Tt(n && n.axisPointer, "label");
  }), Te(or(e.calendar), function(i) {
    Nt(i, "itemStyle"), Tt(i, "dayLabel"), Tt(i, "monthLabel"), Tt(i, "yearLabel");
  }), Te(or(e.radar), function(i) {
    Tt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), Te(or(e.geo), function(i) {
    Za(i) && (fe(i), Te(or(i.regions), function(n) {
      fe(n);
    }));
  }), Te(or(e.timeline), function(i) {
    fe(i), Nt(i, "label"), Nt(i, "itemStyle"), Nt(i, "controlStyle", !0);
    var n = i.data;
    z(n) && C(n, function(a) {
      V(a) && (Nt(a, "label"), Nt(a, "itemStyle"));
    });
  }), Te(or(e.toolbox), function(i) {
    Nt(i, "iconStyle"), Te(i.feature, function(n) {
      Nt(n, "iconStyle");
    });
  }), Tt(Ad(e.axisPointer), "label"), Tt(Ad(e.tooltip).axisPointer, "label");
}
function vC(e, t) {
  for (var r = t.split(","), i = e, n = 0; n < r.length && (i = i && i[r[n]], i != null); n++)
    ;
  return i;
}
function dC(e, t, r, i) {
  for (var n = t.split(","), a = e, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = r);
}
function Id(e) {
  e && C(pC, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var pC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], gC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Pu = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function ta(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < Pu.length; r++) {
      var i = Pu[r][1], n = Pu[r][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Ld(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function Pd(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function yC(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function Hm(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && Hm(e[r].children, t);
}
function Vm(e, t) {
  fC(e, t), e.series = Rt(e.series), C(e.series, function(r) {
    if (V(r)) {
      var i = r.type;
      if (i === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), Ld(r.label);
        var n = r.data;
        if (n && !te(n))
          for (var a = 0; a < n.length; a++)
            Ld(n[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (i === "gauge") {
        var o = vC(r, "pointer.color");
        o != null && dC(r, "itemStyle.color", o);
      } else if (i === "bar") {
        ta(r), ta(r.backgroundStyle), ta(r.emphasis);
        var n = r.data;
        if (n && !te(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (ta(n[a]), ta(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Pd(r), Hm(r.data, Pd);
      } else i === "graph" || i === "sankey" ? yC(r) : i === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && ut(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Id(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), C(gC, function(r) {
    var i = e[r];
    i && (z(i) || (i = [i]), C(i, function(n) {
      Id(n);
    }));
  });
}
function mC(e) {
  var t = Q();
  e.eachSeries(function(r) {
    var i = r.get("stack");
    if (i) {
      var n = t.get(i) || t.set(i, []), a = r.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: r
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      n.length && a.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(o);
    }
  }), t.each(_C);
}
function _C(e) {
  C(e, function(t, r) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, c) {
      var v = o.get(t.stackedDimension, c);
      if (isNaN(v))
        return n;
      var f, d;
      s ? d = o.getRawIndex(c) : f = o.get(t.stackedByDimension, c);
      for (var g = NaN, p = r - 1; p >= 0; p--) {
        var y = e[p];
        if (s || (d = y.data.rawIndexOf(y.stackedByDimension, f)), d >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = Hw(v, m), g = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = g, i;
    });
  });
}
var Dl = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === Tr ? {} : []), this.sourceFormat = t.sourceFormat || km, this.seriesLayoutBy = t.seriesLayoutBy || vr, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var i = 0; i < r.length; i++) {
          var n = r[i];
          n.type == null && zm(this, i) === ne.Must && (n.type = "ordinal");
        }
    }
    return e;
  }()
);
function ff(e) {
  return e instanceof Dl;
}
function Vh(e, t, r) {
  r = r || Wm(e);
  var i = t.seriesLayoutBy, n = wC(e, r, i, t.sourceHeader, t.dimensions), a = new Dl({
    data: e,
    sourceFormat: r,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: q(t)
  });
  return a;
}
function Gm(e) {
  return new Dl({
    data: e,
    sourceFormat: te(e) ? Vr : Se
  });
}
function bC(e) {
  return new Dl({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: q(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function Wm(e) {
  var t = km;
  if (te(e))
    t = Vr;
  else if (z(e)) {
    e.length === 0 && (t = ee);
    for (var r = 0, i = e.length; r < i; r++) {
      var n = e[r];
      if (n != null) {
        if (z(n) || te(n)) {
          t = ee;
          break;
        } else if (V(n)) {
          t = ir;
          break;
        }
      }
    }
  } else if (V(e)) {
    for (var a in e)
      if (Pi(e, a) && Jt(e[a])) {
        t = Tr;
        break;
      }
  }
  return t;
}
function wC(e, t, r, i, n) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: $d(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === ee) {
    var s = e;
    i === "auto" || i == null ? Rd(function(u) {
      u != null && u !== "-" && (H(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = yt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Rd(function(u, h) {
      n[h] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = n ? n.length : r === Fn ? s.length : s[0] ? s[0].length : null;
  } else if (t === ir)
    n || (n = SC(e));
  else if (t === Tr)
    n || (n = [], C(e, function(u, h) {
      n.push(h);
    }));
  else if (t === Se) {
    var l = so(e[0]);
    a = z(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: $d(n),
    dimensionsDetectedCount: a
  };
}
function SC(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return gt(r);
}
function $d(e) {
  if (e) {
    var t = Q();
    return U(e, function(r, i) {
      r = V(r) ? r : {
        name: r
      };
      var n = {
        name: r.name,
        displayName: r.displayName,
        type: r.type
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
function Rd(e, t, r, i) {
  if (t === Fn)
    for (var n = 0; n < r.length && n < i; n++)
      e(r[n] ? r[n][0] : null, n);
  else
    for (var a = r[0] || [], n = 0; n < a.length && n < i; n++)
      e(a[n], n);
}
function Um(e) {
  var t = e.sourceFormat;
  return t === ir || t === Tr;
}
var vi, di, pi, Od, Ed, Ym = (
  /** @class */
  function() {
    function e(t, r) {
      var i = ff(t) ? t : Gm(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === Vr && (this._offset = 0, this._dimSize = r, this._data = n), Ed(this, n, i);
    }
    return e.prototype.getSource = function() {
      return this._source;
    }, e.prototype.count = function() {
      return 0;
    }, e.prototype.getItem = function(t, r) {
    }, e.prototype.appendData = function(t) {
    }, e.prototype.clean = function() {
    }, e.protoInitialize = function() {
      var t = e.prototype;
      t.pure = !1, t.persistent = !0;
    }(), e.internalField = function() {
      var t;
      Ed = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, c = l.startIndex, v = l.dimensionsDefine, f = Od[vf(u, h)];
        if (N(o, f), u === Vr)
          o.getItem = r, o.count = n, o.fillStorage = i;
        else {
          var d = Xm(u, h);
          o.getItem = J(d, null, s, c, v);
          var g = qm(u, h);
          o.count = J(g, null, s, c, v);
        }
      };
      var r = function(o, s) {
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
      Od = (t = {}, t[ee + "_" + vr] = {
        pure: !0,
        appendData: a
      }, t[ee + "_" + Fn] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[ir] = {
        pure: !0,
        appendData: a
      }, t[Tr] = {
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
    }(), e;
  }()
), kd = function(e, t, r, i) {
  return e[i];
}, xC = (vi = {}, vi[ee + "_" + vr] = function(e, t, r, i) {
  return e[i + t];
}, vi[ee + "_" + Fn] = function(e, t, r, i, n) {
  i += t;
  for (var a = n || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, vi[ir] = kd, vi[Tr] = function(e, t, r, i, n) {
  for (var a = n || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = e[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, vi[Se] = kd, vi);
function Xm(e, t) {
  var r = xC[vf(e, t)];
  return r;
}
var Nd = function(e, t, r) {
  return e.length;
}, TC = (di = {}, di[ee + "_" + vr] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, di[ee + "_" + Fn] = function(e, t, r) {
  var i = e[0];
  return i ? Math.max(0, i.length - t) : 0;
}, di[ir] = Nd, di[Tr] = function(e, t, r) {
  var i = r[0].name, n = e[i];
  return n ? n.length : 0;
}, di[Se] = Nd, di);
function qm(e, t) {
  var r = TC[vf(e, t)];
  return r;
}
var $u = function(e, t, r) {
  return e[t];
}, CC = (pi = {}, pi[ee] = $u, pi[ir] = function(e, t, r) {
  return e[r];
}, pi[Tr] = $u, pi[Se] = function(e, t, r) {
  var i = so(e);
  return i instanceof Array ? i[t] : i;
}, pi[Vr] = $u, pi);
function Zm(e) {
  var t = CC[e];
  return t;
}
function vf(e, t) {
  return e === ee ? e + "_" + t : e;
}
function Pn(e, t, r) {
  if (e) {
    var i = e.getRawDataItem(t);
    if (i != null) {
      var n = e.getStore(), a = n.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = n.getDimensionProperty(o);
        return Zm(a)(i, o, s);
      } else {
        var l = i;
        return a === Se && (l = so(i)), l;
      }
    }
  }
}
var MC = /\{@(.+?)\}/g, DC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getDataParams = function(t, r) {
      var i = this.getData(r), n = this.getRawValue(t, r), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], h = l && l.stroke, c = this.mainType, v = c === "series", f = i.userOutput && i.userOutput.get();
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
        dataType: r,
        value: n,
        color: u,
        borderColor: h,
        dimensionNames: f ? f.fullDimensions : null,
        encode: f ? f.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, e.prototype.getFormattedLabel = function(t, r, i, n, a, o) {
      r = r || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && z(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (Z(a))
        return l.status = r, l.dimensionIndex = n, a(l);
      if (H(a)) {
        var h = Rm(a, l);
        return h.replace(MC, function(c, v) {
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
    }, e.prototype.getRawValue = function(t, r) {
      return Pn(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, i) {
    }, e;
  }()
);
function Bd(e) {
  var t, r;
  return V(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function La(e) {
  return new AC(e);
}
var AC = (
  /** @class */
  function() {
    function e(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return e.prototype.perform = function(t) {
      var r = this._upstream, i = t && t.skip;
      if (this._dirty && r) {
        var n = this.context;
        n.data = n.outputData = r.context.outputData;
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
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
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
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, i, n, a) {
      zd.reset(r, i, n, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: i,
        count: i - r,
        next: zd.next
      }, this.context);
    }, e.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, i;
      !t && this._reset && (r = this._reset(this.context), r && r.progress && (i = r.forceFirstProgress, r = r.progress), z(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, e.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, e.prototype.pipe = function(t) {
      (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
    }, e.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, e.prototype.getUpstream = function() {
      return this._upstream;
    }, e.prototype.getDownstream = function() {
      return this._downstream;
    }, e.prototype.setOutputEnd = function(t) {
      this._outputDueEnd = this._settedOutputEnd = t;
    }, e;
  }()
), zd = /* @__PURE__ */ function() {
  var e, t, r, i, n, a = {
    reset: function(l, u, h, c) {
      t = l, e = u, r = h, i = c, n = Math.ceil(i / r), a.next = r > 1 && i > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < e ? t++ : null;
  }
  function s() {
    var l = t % n * r + Math.ceil(t / n), u = t >= e ? null : l < i ? l : t;
    return t++, u;
  }
}();
function gs(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !yt(e) && e != null && e !== "-" && (e = +pr(e)), e == null || e === "" ? NaN : Number(e));
}
Q({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +pr(e);
  },
  trim: function(e) {
    return H(e) ? Ue(e) : e;
  }
});
var IC = (
  /** @class */
  function() {
    function e(t, r) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, r == null && (r = i ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var i = yt(t) ? t : Es(t), n = yt(r) ? r : Es(r), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = H(t), l = H(r);
        s && (i = l ? t : 0), l && (n = s ? r : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, e;
  }()
), LC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getRawData = function() {
      throw new Error("not supported");
    }, e.prototype.getRawDataItem = function(t) {
      throw new Error("not supported");
    }, e.prototype.cloneRawData = function() {
    }, e.prototype.getDimensionInfo = function(t) {
    }, e.prototype.cloneAllDimensionInfo = function() {
    }, e.prototype.count = function() {
    }, e.prototype.retrieveValue = function(t, r) {
    }, e.prototype.retrieveValueFromItem = function(t, r) {
    }, e.prototype.convertValue = function(t, r) {
      return gs(t, r);
    }, e;
  }()
);
function PC(e, t) {
  var r = new LC(), i = e.data, n = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
  e.seriesLayoutBy !== vr && jt(o);
  var s = [], l = {}, u = e.dimensionsDefine;
  if (u)
    C(u, function(g, p) {
      var y = g.name, m = {
        index: p,
        name: y,
        displayName: g.displayName
      };
      if (s.push(m), y != null) {
        var _ = "";
        Pi(l, y) && jt(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < e.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var c = Xm(n, vr);
  t.__isBuiltIn && (r.getRawDataItem = function(g) {
    return c(i, a, s, g);
  }, r.getRawData = J($C, null, e)), r.cloneRawData = J(RC, null, e);
  var v = qm(n, vr);
  r.count = J(v, null, i, a, s);
  var f = Zm(n);
  r.retrieveValue = function(g, p) {
    var y = c(i, a, s, g);
    return d(y, p);
  };
  var d = r.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var y = s[p];
      if (y)
        return f(g, p, y.name);
    }
  };
  return r.getDimensionInfo = J(OC, null, s, l), r.cloneAllDimensionInfo = J(EC, null, s), r;
}
function $C(e) {
  var t = e.sourceFormat;
  if (!df(t)) {
    var r = "";
    jt(r);
  }
  return e.data;
}
function RC(e) {
  var t = e.sourceFormat, r = e.data;
  if (!df(t)) {
    var i = "";
    jt(i);
  }
  if (t === ee) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(r[a].slice());
    return n;
  } else if (t === ir) {
    for (var n = [], a = 0, o = r.length; a < o; a++)
      n.push(N({}, r[a]));
    return n;
  }
}
function OC(e, t, r) {
  if (r != null) {
    if (yt(r) || !isNaN(r) && !Pi(t, r))
      return e[r];
    if (Pi(t, r))
      return t[r];
  }
}
function EC(e) {
  return q(e);
}
var Km = Q();
function kC(e) {
  e = q(e);
  var t = e.type, r = "";
  t || jt(r);
  var i = t.split(":");
  i.length !== 2 && jt(r);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), e.__isBuiltIn = n, Km.set(t, e);
}
function NC(e, t, r) {
  var i = Rt(e), n = i.length, a = "";
  n || jt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = BC(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function BC(e, t, r, i) {
  var n = "";
  t.length || jt(n), V(e) || jt(n);
  var a = e.type, o = Km.get(a);
  o || jt(n);
  var s = U(t, function(u) {
    return PC(u, o);
  }), l = Rt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: q(e.config)
  }));
  return U(l, function(u, h) {
    var c = "";
    V(u) || jt(c), u.data || jt(c);
    var v = Wm(u.data);
    df(v) || jt(c);
    var f, d = t[0];
    if (d && h === 0 && !u.dimensions) {
      var g = d.startIndex;
      g && (u.data = d.data.slice(0, g).concat(u.data)), f = {
        seriesLayoutBy: vr,
        sourceHeader: g,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      f = {
        seriesLayoutBy: vr,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Vh(u.data, f, null);
  });
}
function df(e) {
  return e === ee || e === ir;
}
var Al = "undefined", zC = typeof Uint32Array === Al ? Array : Uint32Array, FC = typeof Uint16Array === Al ? Array : Uint16Array, jm = typeof Int32Array === Al ? Array : Int32Array, Fd = typeof Float64Array === Al ? Array : Float64Array, Qm = {
  float: Fd,
  int: jm,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Fd
}, Ru;
function Qi(e) {
  return e > 65535 ? zC : FC;
}
function Ji() {
  return [1 / 0, -1 / 0];
}
function HC(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function Hd(e, t, r, i, n) {
  var a = Qm[r || "float"];
  if (n) {
    var o = e[t], s = o && o.length;
    if (s !== i) {
      for (var l = new a(i), u = 0; u < s; u++)
        l[u] = o[u];
      e[t] = l;
    }
  } else
    e[t] = new a(i);
}
var Gh = (
  /** @class */
  function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Q();
    }
    return e.prototype.initData = function(t, r, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Ru[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], Um(n), this._dimensions = U(r, function(o) {
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: o.type,
          property: o.property
        };
      }), this._initDataFromProvider(0, t.count());
    }, e.prototype.getProvider = function() {
      return this._provider;
    }, e.prototype.getSource = function() {
      return this._provider.getSource();
    }, e.prototype.ensureCalculationDimension = function(t, r) {
      var i = this._calcDimNameToIdx, n = this._dimensions, a = i.get(t);
      if (a != null) {
        if (n[a].type === r)
          return a;
      } else
        a = n.length;
      return n[a] = {
        type: r
      }, i.set(t, a), this._chunks[a] = new Qm[r || "float"](this._rawCount), this._rawExtent[a] = Ji(), a;
    }, e.prototype.collectOrdinalMeta = function(t, r) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Ji());
      for (var l = a[t], u = o; u < s; u++) {
        var h = i[u] = r.parseAndCollect(i[u]);
        isNaN(h) || (l[0] = Math.min(h, l[0]), l[1] = Math.max(h, l[1]));
      }
      n.ordinalMeta = r, n.ordinalOffset = s, n.type = "ordinal";
    }, e.prototype.getOrdinalMeta = function(t) {
      var r = this._dimensions[t], i = r.ordinalMeta;
      return i;
    }, e.prototype.getDimensionProperty = function(t) {
      var r = this._dimensions[t];
      return r && r.property;
    }, e.prototype.appendData = function(t) {
      var r = this._provider, i = this.count();
      r.appendData(t);
      var n = r.count();
      return r.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, e.prototype.appendValues = function(t, r) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, r || 0), u = 0; u < a; u++) {
        var h = n[u];
        Hd(i, u, h.type, l, !0);
      }
      for (var c = [], v = s; v < l; v++)
        for (var f = v - s, d = 0; d < a; d++) {
          var h = n[d], g = Ru.arrayRows.call(this, t[f] || c, h.property, f, d);
          i[d][v] = g;
          var p = o[d];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = U(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var c = o[h];
        l[h] || (l[h] = Ji()), Hd(a, h, c.type, r, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, r, a, l);
      else
        for (var v = [], f = t; f < r; f++) {
          v = n.getItem(f, v);
          for (var d = 0; d < s; d++) {
            var g = a[d], p = this._dimValueGetter(v, u[d], f, d);
            g[f] = p;
            var y = l[d];
            p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      !n.persistent && n.clean && n.clean(), this._rawCount = this._count = r, this._extent = [];
    }, e.prototype.count = function() {
      return this._count;
    }, e.prototype.get = function(t, r) {
      if (!(r >= 0 && r < this._count))
        return NaN;
      var i = this._chunks[t];
      return i ? i[this.getRawIndex(r)] : NaN;
    }, e.prototype.getValues = function(t, r) {
      var i = [], n = [];
      if (r == null) {
        r = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          n.push(a);
      } else
        n = t;
      for (var a = 0, o = n.length; a < o; a++)
        i.push(this.get(n[a], r));
      return i;
    }, e.prototype.getByRawIndex = function(t, r) {
      if (!(r >= 0 && r < this._rawCount))
        return NaN;
      var i = this._chunks[t];
      return i ? i[r] : NaN;
    }, e.prototype.getSum = function(t) {
      var r = this._chunks[t], i = 0;
      if (r)
        for (var n = 0, a = this.count(); n < a; n++) {
          var o = this.get(t, n);
          isNaN(o) || (i += o);
        }
      return i;
    }, e.prototype.getMedian = function(t) {
      var r = [];
      this.each([t], function(a) {
        isNaN(a) || r.push(a);
      });
      var i = r.sort(function(a, o) {
        return a - o;
      }), n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;
    }, e.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var r = this._indices, i = r[t];
      if (i != null && i < this._count && i === t)
        return t;
      for (var n = 0, a = this._count - 1; n <= a; ) {
        var o = (n + a) / 2 | 0;
        if (r[o] < t)
          n = o + 1;
        else if (r[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, e.prototype.indicesOfNearest = function(t, r, i) {
      var n = this._chunks, a = n[t], o = [];
      if (!a)
        return o;
      i == null && (i = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, h = 0, c = this.count(); h < c; h++) {
        var v = this.getRawIndex(h), f = r - a[v], d = Math.abs(f);
        d <= i && ((d < s || d === s && f >= 0 && l < 0) && (s = d, l = f, u = 0), f === l && (o[u++] = h));
      }
      return o.length = u, o;
    }, e.prototype.getIndices = function() {
      var t, r = this._indices;
      if (r) {
        var i = r.constructor, n = this._count;
        if (i === Array) {
          t = new i(n);
          for (var a = 0; a < n; a++)
            t[a] = r[a];
        } else
          t = new i(r.buffer, 0, n);
      } else {
        var i = Qi(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, e.prototype.filter = function(t, r) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = Qi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, h = t[0], c = i._chunks, v = 0; v < n; v++) {
        var f = void 0, d = i.getRawIndex(v);
        if (l === 0)
          f = r(v);
        else if (l === 1) {
          var g = c[h][d];
          f = r(g, v);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = c[t[p]][d];
          s[p] = v, f = r.apply(null, s);
        }
        f && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, e.prototype.selectRange = function(t) {
      var r = this.clone(), i = r._count;
      if (!i)
        return this;
      var n = gt(t), a = n.length;
      if (!a)
        return this;
      var o = r.count(), s = Qi(r._rawCount), l = new s(o), u = 0, h = n[0], c = t[h][0], v = t[h][1], f = r._chunks, d = !1;
      if (!r._indices) {
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
            var x = r.getRawIndex(y), m = f[n[0]][x];
            (m >= c && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var M = !0, x = r.getRawIndex(y), D = 0; D < a; D++) {
              var A = n[D], m = f[A][x];
              (m < t[A][0] || m > t[A][1]) && (M = !1);
            }
            M && (l[u++] = r.getRawIndex(y));
          }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r;
    }, e.prototype.map = function(t, r) {
      var i = this.clone(t);
      return this._updateDims(i, t, r), i;
    }, e.prototype.modify = function(t, r) {
      this._updateDims(this, t, r);
    }, e.prototype._updateDims = function(t, r, i) {
      for (var n = t._chunks, a = [], o = r.length, s = t.count(), l = [], u = t._rawExtent, h = 0; h < r.length; h++)
        u[r[h]] = Ji();
      for (var c = 0; c < s; c++) {
        for (var v = t.getRawIndex(c), f = 0; f < o; f++)
          l[f] = n[r[f]][v];
        l[o] = c;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var h = 0; h < d.length; h++) {
            var g = r[h], p = d[h], y = u[g], m = n[g];
            m && (m[v] = p), p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), h, c, v, f = new (Qi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
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
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / r), o = n[t], s = this.count(), l = new (Qi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
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
    }, e.prototype.downSample = function(t, r, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], h = this.count(), c = a._rawExtent[t] = Ji(), v = new (Qi(this._rawCount))(Math.ceil(h / l)), f = 0, d = 0; d < h; d += l) {
        l > h - d && (l = h - d, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(d + g);
          s[g] = u[p];
        }
        var y = i(s), m = this.getRawIndex(Math.min(d + n(s, y) || 0, h - 1));
        u[m] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), v[f++] = m;
      }
      return a._count = f, a._indices = v, a._updateGetRawIdx(), a;
    }, e.prototype.each = function(t, r) {
      if (this._count)
        for (var i = t.length, n = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (i) {
            case 0:
              r(a);
              break;
            case 1:
              r(n[t[0]][s], a);
              break;
            case 2:
              r(n[t[0]][s], n[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < i; l++)
                u[l] = n[t[l]][s];
              u[l] = a, r.apply(null, u);
          }
        }
    }, e.prototype.getDataExtent = function(t) {
      var r = this._chunks[t], i = Ji();
      if (!r)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var h = this.getRawIndex(u), c = r[h];
        c < s && (s = c), c > l && (l = c);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, e.prototype.getRawDataItem = function(t) {
      var r = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(r);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][r]);
      return i;
    }, e.prototype.clone = function(t, r) {
      var i = new e(), n = this._chunks, a = t && Nn(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? HC(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), r || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, e.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = q(this._extent), t._rawExtent = q(this._rawExtent);
    }, e.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, r = void 0;
        if (t === Array) {
          var i = this._indices.length;
          r = new t(i);
          for (var n = 0; n < i; n++)
            r[n] = this._indices[n];
        } else
          r = new t(this._indices);
        return r;
      }
      return null;
    }, e.prototype._getRawIdxIdentity = function(t) {
      return t;
    }, e.prototype._getRawIdx = function(t) {
      return t < this._count && t >= 0 ? this._indices[t] : -1;
    }, e.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, e.internalField = function() {
      function t(r, i, n, a) {
        return gs(r[a], this._dimensions[a]);
      }
      Ru = {
        arrayRows: t,
        objectRows: function(r, i, n, a) {
          return gs(r[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, i, n, a) {
          var o = r && (r.value == null ? r : r.value);
          return gs(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, i, n, a) {
          return r[a];
        }
      };
    }(), e;
  }()
), VC = (
  /** @class */
  function() {
    function e(t) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = t;
    }
    return e.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, e.prototype._setLocalSource = function(t, r) {
      this._sourceList = t, this._upstreamSignList = r, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, e.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, e.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, e.prototype._createSource = function() {
      this._setLocalSource([], []);
      var t = this._sourceHost, r = this._getUpstreamSourceManagers(), i = !!r.length, n, a;
      if (No(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var h = r[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = te(s) ? Vr : Se, a = [];
        var c = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, f = tt(c.seriesLayoutBy, v.seriesLayoutBy) || null, d = tt(c.sourceHeader, v.sourceHeader), g = tt(c.dimensions, v.dimensions), p = f !== v.seriesLayoutBy || !!d != !!v.sourceHeader || g;
        n = p ? [Vh(s, {
          seriesLayoutBy: f,
          sourceHeader: d,
          dimensions: g
        }, l)] : [];
      } else {
        var y = t;
        if (i) {
          var m = this._applyTransform(r);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          n = [Vh(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, i = r.get("transform", !0), n = r.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Vd(a);
      }
      var o, s = [], l = [];
      return C(t, function(u) {
        u.prepareSource();
        var h = u.getSource(n || 0), c = "";
        n != null && !h && Vd(c), s.push(h), l.push(u._getVersionSign());
      }), i ? o = NC(i, s, {
        datasetIndex: r.componentIndex
      }) : n != null && (o = [bC(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, e.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), r = 0; r < t.length; r++) {
        var i = t[r];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          i._isDirty() || this._upstreamSignList[r] !== i._getVersionSign()
        )
          return !0;
      }
    }, e.prototype.getSource = function(t) {
      t = t || 0;
      var r = this._sourceList[t];
      if (!r) {
        var i = this._getUpstreamSourceManagers();
        return i[0] && i[0].getSource(t);
      }
      return r;
    }, e.prototype.getSharedDataStore = function(t) {
      var r = t.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, t.source, r.hash);
    }, e.prototype._innerGetDataStore = function(t, r, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        No(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, i) : (s = new Gh(), s.initData(new Ym(r, t.length), t)), o[i] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (No(t)) {
        var r = Bm(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return U(qT(t), function(i) {
          return i.getSourceManager();
        });
    }, e.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, r, i, n;
      if (No(t))
        r = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), n = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        r = a.get("seriesLayoutBy", !0), i = a.get("sourceHeader", !0), n = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: r,
        sourceHeader: i,
        dimensions: n
      };
    }, e;
  }()
);
function No(e) {
  return e.mainType === "series";
}
function Vd(e) {
  throw new Error(e);
}
var GC = "line-height:1";
function Jm(e) {
  var t = e.lineHeight;
  return t == null ? GC : "line-height:" + Zt(t + "") + "px";
}
function t_(e, t) {
  var r = e.color || "#6e7079", i = e.fontSize || 12, n = e.fontWeight || "400", a = e.color || "#464646", o = e.fontSize || 14, s = e.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Zt(i + "") + "px;color:" + Zt(r) + ";font-weight:" + Zt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Zt(o + "") + "px;color:" + Zt(a) + ";font-weight:" + Zt(s + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: r,
      fontWeight: n
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var WC = [0, 10, 20, 30], UC = ["", `
`, `

`, `


`];
function Ka(e, t) {
  return t.type = e, t;
}
function Wh(e) {
  return e.type === "section";
}
function e_(e) {
  return Wh(e) ? YC : XC;
}
function r_(e) {
  if (Wh(e)) {
    var t = 0, r = e.blocks.length, i = r > 1 || r > 0 && !e.noHeader;
    return C(e.blocks, function(n) {
      var a = r_(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Wh(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function YC(e, t, r, i) {
  var n = t.noHeader, a = qC(r_(t)), o = [], s = t.blocks || [];
  qe(!s || z(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Pi(u, l)) {
      var h = new IC(u[l], null);
      s.sort(function(g, p) {
        return h.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  C(s, function(g, p) {
    var y = t.valueFormatter, m = e_(g)(
      // Inherit valueFormatter
      y ? N(N({}, e), {
        valueFormatter: y
      }) : e,
      g,
      p > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var c = e.renderMode === "richText" ? o.join(a.richText) : Uh(i, o.join(""), n ? r : a.html);
  if (n)
    return c;
  var v = Hh(t.header, "ordinal", e.useUTC), f = t_(i, e.renderMode).nameStyle, d = Jm(i);
  return e.renderMode === "richText" ? i_(e, v, f) + a.richText + c : Uh(i, '<div style="' + f + ";" + d + ';">' + Zt(v) + "</div>" + c, r);
}
function XC(e, t, r, i) {
  var n = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, h = t.valueFormatter || e.valueFormatter || function(b) {
    return b = z(b) ? b : [b], U(b, function(S, w) {
      return Hh(S, z(f) ? f[w] : f, u);
    });
  };
  if (!(a && o)) {
    var c = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : Hh(l, "ordinal", u), f = t.valueType, d = o ? [] : h(t.value, t.dataIndex), g = !s || !a, p = !s && a, y = t_(i, n), m = y.nameStyle, _ = y.valueStyle;
    return n === "richText" ? (s ? "" : c) + (a ? "" : i_(e, v, m)) + (o ? "" : jC(e, d, g, p, _)) : Uh(i, (s ? "" : c) + (a ? "" : ZC(v, !s, m)) + (o ? "" : KC(d, g, p, _)), r);
  }
}
function Gd(e, t, r, i, n, a) {
  if (e) {
    var o = e_(e), s = {
      useUTC: n,
      renderMode: r,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function qC(e) {
  return {
    html: WC[e],
    richText: UC[e]
  };
}
function Uh(e, t, r) {
  var i = '<div style="clear:both"></div>', n = "margin: " + r + "px 0 0", a = Jm(e);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function ZC(e, t, r) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + i + '">' + Zt(e) + "</span>";
}
function KC(e, t, r, i) {
  var n = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return e = z(e) ? e : [e], '<span style="' + a + ";" + i + '">' + U(e, function(o) {
    return Zt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function i_(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function jC(e, t, r, i, n) {
  var a = [n], o = i ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(z(t) ? t.join("  ") : t, a);
}
function QC(e, t) {
  var r = e.getData().getItemVisual(t, "style"), i = r[e.visualDrawType];
  return Oi(i);
}
function n_(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var Ou = (
  /** @class */
  function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = ky();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = zT({
        color: r,
        type: t,
        renderMode: i,
        markerId: n
      });
      return H(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, e.prototype.wrapRichTextStyle = function(t, r) {
      var i = {};
      z(r) ? C(r, function(a) {
        return N(i, a);
      }) : N(i, r);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, e;
  }()
);
function JC(e) {
  var t = e.series, r = e.dataIndex, i = e.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = z(s), u = QC(t, r), h, c, v, f;
  if (o > 1 || l && !o) {
    var d = tM(s, t, r, a, u);
    h = d.inlineValues, c = d.inlineValueTypes, v = d.blocks, f = d.inlineValues[0];
  } else if (o) {
    var g = n.getDimensionInfo(a[0]);
    f = h = Pn(n, r, a[0]), c = g.type;
  } else
    f = h = l ? s[0] : s;
  var p = Hc(t), y = p && t.name || "", m = n.getName(r), _ = i ? y : m;
  return Ka("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: f,
    blocks: [Ka("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Ue(_),
      value: h,
      valueType: c,
      dataIndex: r
    })].concat(v || [])
  });
}
function tM(e, t, r, i, n) {
  var a = t.getData(), o = Nn(e, function(c, v, f) {
    var d = a.getDimensionInfo(f);
    return c = c || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? C(i, function(c) {
    h(Pn(a, r, c), c);
  }) : C(e, h);
  function h(c, v) {
    var f = a.getDimensionInfo(v);
    !f || f.otherDims.tooltip === !1 || (o ? u.push(Ka("nameValue", {
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
var Ir = It();
function Bo(e, t) {
  return e.getName(t) || e.getId(t);
}
var eM = "__universalTransitionEnabled", Re = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = La({
        count: iM,
        reset: nM
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, n);
      var a = Ir(this).sourceManager = new VC(this);
      a.prepareSource();
      var o = this.getInitialData(r, n);
      Ud(o, this), this.dataTask.context.data = o, Ir(this).dataBeforeProcessed = o, Wd(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, i) {
      var n = qa(this), a = n ? Cl(r) : {}, o = this.subType;
      ht.hasClass(o) && (o += "Series"), nt(r, i.getTheme().get(this.subType)), nt(r, this.getDefaultOption()), Av(r, "label", ["show"]), this.fillDataTextStyle(r.data), n && Ln(r, a, n);
    }, t.prototype.mergeOption = function(r, i) {
      r = nt(this.option, r, !0), this.fillDataTextStyle(r.data);
      var n = qa(this);
      n && Ln(this.option, r, n);
      var a = Ir(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, i);
      Ud(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Ir(this).dataBeforeProcessed = o, Wd(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !te(r))
        for (var i = ["show"], n = 0; n < r.length; n++)
          r[n] && r[n].label && Av(r[n], "label", i);
    }, t.prototype.getInitialData = function(r, i) {
    }, t.prototype.appendData = function(r) {
      var i = this.getRawData();
      i.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var i = Yh(this);
      if (i) {
        var n = i.context.data;
        return r == null || !n.getLinkedData ? n : n.getLinkedData(r);
      } else
        return Ir(this).data;
    }, t.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, t.prototype.setData = function(r) {
      var i = Yh(this);
      if (i) {
        var n = i.context;
        n.outputData = r, i !== this.dataTask && (n.data = r);
      }
      Ir(this).data = r;
    }, t.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return Q(r);
    }, t.prototype.getSourceManager = function() {
      return Ir(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Ir(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, t.prototype.formatTooltip = function(r, i, n) {
      return JC({
        series: this,
        dataIndex: r,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (X.node && !(r && r.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(r, i, n) {
      var a = this.ecModel, o = hf.prototype.getColorFromPalette.call(this, r, i, n);
      return o || (o = a.getColorFromPalette(r, i, n)), o;
    }, t.prototype.coordDimToDataDim = function(r) {
      return this.getRawData().mapDimensionsAll(r);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(r, i) {
      this._innerSelect(this.getData(i), r);
    }, t.prototype.unselect = function(r, i) {
      var n = this.option.selectedMap;
      if (n) {
        var a = this.option.selectedMode, o = this.getData(i);
        if (a === "series" || n === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < r.length; s++) {
          var l = r[s], u = Bo(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(r, i) {
      for (var n = [], a = 0; a < r.length; a++)
        n[0] = r[a], this.isSelected(r[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, i = gt(r), n = [], a = 0; a < i.length; a++) {
        var o = r[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(r, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[Bo(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[eM])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, t.prototype._innerSelect = function(r, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          V(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, h = 0; h < l; h++) {
            var c = i[h], v = Bo(r, c);
            u[v] = !0, this._selectedDataIndicesMap[v] = r.getRawIndex(c);
          }
        } else if (s === "single" || s === !0) {
          var f = i[l - 1], v = Bo(r, f);
          o.selectedMap = (n = {}, n[v] = !0, n), this._selectedDataIndicesMap = (a = {}, a[v] = r.getRawIndex(f), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(r) {
      if (!this.option.selectedMap) {
        var i = [];
        r.hasItemOption && r.each(function(n) {
          var a = r.getRawDataItem(n);
          a && a.selected && i.push(n);
        }), i.length > 0 && this._innerSelect(r, i);
      }
    }, t.registerClass = function(r) {
      return ht.registerClass(r);
    }, t.protoInitialize = function() {
      var r = t.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill";
    }(), t;
  }(ht)
);
tr(Re, DC);
tr(Re, hf);
Vy(Re, ht);
function Wd(e) {
  var t = e.name;
  Hc(e) || (e.name = rM(e) || t);
}
function rM(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), i = [];
  return C(r, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function iM(e) {
  return e.model.getRawData().count();
}
function nM(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), aM;
}
function aM(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Ud(e, t) {
  C(_1(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, Dt(oM, t));
  });
}
function oM(e, t) {
  var r = Yh(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function Yh(e) {
  var t = (e.ecModel || {}).scheduler, r = t && t.getPipeline(e.uid);
  if (r) {
    var i = r.currentTask;
    if (i) {
      var n = i.agentStubMap;
      n && (i = n.get(e.uid));
    }
    return i;
  }
}
var Oe = (
  /** @class */
  function() {
    function e() {
      this.group = new Ct(), this.uid = ml("viewComponent");
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, i, n) {
    }, e.prototype.updateLayout = function(t, r, i, n) {
    }, e.prototype.updateVisual = function(t, r, i, n) {
    }, e.prototype.toggleBlurSeries = function(t, r, i) {
    }, e.prototype.eachRendered = function(t) {
      var r = this.group;
      r && r.traverse(t);
    }, e;
  }()
);
Gc(Oe);
ol(Oe);
function pf() {
  var e = It();
  return function(t) {
    var r = e(t), i = t.pipelineContext, n = !!r.large, a = !!r.progressiveRender, o = r.large = !!(i && i.large), s = r.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var a_ = It(), sM = pf(), be = (
  /** @class */
  function() {
    function e() {
      this.group = new Ct(), this.uid = ml("viewChart"), this.renderTask = La({
        plan: lM,
        reset: uM
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, i, n) {
    }, e.prototype.highlight = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Xd(a, n, "emphasis");
    }, e.prototype.downplay = function(t, r, i, n) {
      var a = t.getData(n && n.dataType);
      a && Xd(a, n, "normal");
    }, e.prototype.remove = function(t, r) {
      this.group.removeAll();
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.updateLayout = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.updateVisual = function(t, r, i, n) {
      this.render(t, r, i, n);
    }, e.prototype.eachRendered = function(t) {
      ho(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      a_(t).updateMethod = r;
    }, e.protoInitialize = function() {
      var t = e.prototype;
      t.type = "chart";
    }(), e;
  }()
);
function Yd(e, t, r) {
  e && kh(e) && (t === "emphasis" ? Ns : Bs)(e, r);
}
function Xd(e, t, r) {
  var i = $i(e, t), n = t && t.highlightKey != null ? Cx(t.highlightKey) : null;
  i != null ? C(Rt(i), function(a) {
    Yd(e.getItemGraphicEl(a), r, n);
  }) : e.eachItemGraphicEl(function(a) {
    Yd(a, r, n);
  });
}
Gc(be);
ol(be);
function lM(e) {
  return sM(e.model);
}
function uM(e) {
  var t = e.model, r = e.ecModel, i = e.api, n = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = n && a_(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, i, n), hM[l];
}
var hM = {
  incrementalPrepareRender: {
    progress: function(e, t) {
      t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(e, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
}, Ws = "\0__throttleOriginMethod", qd = "\0__throttleRate", Zd = "\0__throttleType";
function gf(e, t, r) {
  var i, n = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function c() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var v = function() {
    for (var f = [], d = 0; d < arguments.length; d++)
      f[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = f;
    var g = h || t, p = h || r;
    h = null, s = i - (p ? n : a) - g, clearTimeout(o), p ? o = setTimeout(c, g) : s >= 0 ? c() : o = setTimeout(c, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(f) {
    h = f;
  }, v;
}
function o_(e, t, r, i) {
  var n = e[t];
  if (n) {
    var a = n[Ws] || n, o = n[Zd], s = n[qd];
    if (s !== r || o !== i) {
      if (r == null || !i)
        return e[t] = a;
      n = e[t] = gf(a, r, i === "debounce"), n[Ws] = a, n[Zd] = i, n[qd] = r;
    }
    return n;
  }
}
function Xh(e, t) {
  var r = e[t];
  r && r[Ws] && (r.clear && r.clear(), e[t] = r[Ws]);
}
var Kd = It(), jd = {
  itemStyle: Wa(bm, !0),
  lineStyle: Wa(_m, !0)
}, cM = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function s_(e, t) {
  var r = e.visualStyleMapper || jd[t];
  return r || (console.warn("Unknown style type '" + t + "'."), jd.itemStyle);
}
function l_(e, t) {
  var r = e.visualDrawType || cM[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var fM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = e.getModel(i), a = s_(e, i), o = a(n), s = n.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = l_(e, i), u = o[l], h = Z(u) ? u : null, c = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || h || c) {
      var v = e.getColorFromPalette(
        // TODO series count changed.
        e.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || Z(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || Z(o.stroke) ? v : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !t.isSeriesFiltered(e) && h)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(f, d) {
          var g = e.getDataParams(d), p = N({}, o);
          p[l] = h(g), f.setItemVisual(d, "style", p);
        }
      };
  }
}, ea = new xt(), vM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
      var r = e.getData(), i = e.visualStyleAccessPath || "itemStyle", n = s_(e, i), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
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
}, dM = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = Q();
    e.eachSeries(function(r) {
      var i = r.getColorBy();
      if (!r.isColorBySeries()) {
        var n = r.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Kd(r).scope = a;
      }
    }), e.eachSeries(function(r) {
      if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
        var i = r.getRawData(), n = {}, a = r.getData(), o = Kd(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = l_(r, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          n[h] = u;
        }), i.each(function(u) {
          var h = n[u], c = a.getItemVisual(h, "colorFromPalette");
          if (c) {
            var v = a.ensureUniqueItemVisual(h, "style"), f = i.getName(u) || u + "", d = i.count();
            v[l] = r.getColorFromPalette(f, o, d);
          }
        });
      }
    });
  }
}, zo = Math.PI;
function pM(e, t) {
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
  var r = new Ct(), i = new bt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  r.add(i);
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
  r.add(a);
  var o;
  return t.showSpinner && (o = new dl({
    shape: {
      startAngle: -zo / 2,
      endAngle: -zo / 2 + 0.1,
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
    endAngle: zo * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: zo * 3 / 2
  }).delay(300).start("circularInOut"), r.add(o)), r.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (e.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), h = e.getHeight() / 2;
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
      width: e.getWidth(),
      height: e.getHeight()
    });
  }, r.resize(), r;
}
var u_ = (
  /** @class */
  function() {
    function e(t, r, i, n) {
      this._stageTaskMap = Q(), this.ecInstance = t, this.api = r, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
    }
    return e.prototype.restoreData = function(t, r) {
      t.restoreData(r), this._stageTaskMap.each(function(i) {
        var n = i.overallTask;
        n && n.dirty();
      });
    }, e.prototype.getPerformArgs = function(t, r) {
      if (t.__pipeline) {
        var i = this._pipelineMap.get(t.__pipeline.id), n = i.context, a = !r && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex, o = a ? i.step : null, s = n && n.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, e.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, e.prototype.updateStreamModes = function(t, r) {
      var i = this._pipelineMap.get(t.uid), n = t.getData(), a = n.count(), o = i.progressiveEnabled && r.incrementalPrepareRender && a >= i.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = i.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, e.prototype.restorePipelines = function(t) {
      var r = this, i = r._pipelineMap = Q();
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
        }), r._pipe(n, n.dataTask);
      });
    }, e.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, r = this.api.getModel(), i = this.api;
      C(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        qe(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, r, i), n.overallReset && this._createOverallStageTask(n, a, r, i);
      }, this);
    }, e.prototype.prepareView = function(t, r, i, n) {
      var a = t.renderTask, o = a.context;
      o.model = r, o.ecModel = i, o.api = n, a.__block = !t.incrementalPrepareRender, this._pipe(r, a);
    }, e.prototype.performDataProcessorTasks = function(t, r) {
      this._performStageTasks(this._dataProcessorHandlers, t, r, {
        block: !0
      });
    }, e.prototype.performVisualTasks = function(t, r, i) {
      this._performStageTasks(this._visualHandlers, t, r, i);
    }, e.prototype._performStageTasks = function(t, r, i, n) {
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
            m.skip = !l.performRawSeries && r.isSeriesFiltered(p.context.model), o.updatePayload(p, i), p.perform(m) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, e.prototype.performSeriesTasks = function(t) {
      var r;
      t.eachSeries(function(i) {
        r = i.dataTask.perform() || r;
      }), this.unfinished = r || this.unfinished;
    }, e.prototype.plan = function() {
      this._pipelineMap.each(function(t) {
        var r = t.tail;
        do {
          if (r.__block) {
            t.blockIndex = r.__idxInPipeline;
            break;
          }
          r = r.getUpstream();
        } while (r);
      });
    }, e.prototype.updatePayload = function(t, r) {
      r !== "remain" && (t.context.payload = r);
    }, e.prototype._createSeriesStageTask = function(t, r, i, n) {
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = Q(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : u && u(i, n).each(h);
      function h(c) {
        var v = c.uid, f = s.set(v, o && o.get(v) || La({
          plan: bM,
          reset: wM,
          count: xM
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
    }, e.prototype._createOverallStageTask = function(t, r, i, n) {
      var a = this, o = r.overallTask = r.overallTask || La({
        reset: gM
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Q(), u = t.seriesType, h = t.getTargetSeries, c = !0, v = !1, f = "";
      qe(!t.createOnAllSeries, f), u ? i.eachRawSeriesByType(u, d) : h ? h(i, n).each(d) : (c = !1, C(i.getSeries(), d));
      function d(g) {
        var p = g.uid, y = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, La({
          reset: yM,
          onDirty: _M
        })));
        y.context = {
          model: g,
          overallProgress: c
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, y.agent = o, y.__block = c, a._pipe(g, y);
      }
      v && o.dirty();
    }, e.prototype._pipe = function(t, r) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = r), n.tail && n.tail.pipe(r), n.tail = r, r.__idxInPipeline = n.count++, r.__pipeline = n;
    }, e.wrapStageHandler = function(t, r) {
      return Z(t) && (t = {
        overallReset: t,
        seriesType: TM(t)
      }), t.uid = ml("stageHandler"), r && (t.visualType = r), t;
    }, e;
  }()
);
function gM(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function yM(e) {
  return e.overallProgress && mM;
}
function mM() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function _M() {
  this.agent && this.agent.dirty();
}
function bM(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function wM(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = Rt(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? U(t, function(r, i) {
    return h_(i);
  }) : SM;
}
var SM = h_(0);
function h_(e) {
  return function(t, r) {
    var i = r.data, n = r.resetDefines[e];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function xM(e) {
  return e.data.count();
}
function TM(e) {
  Us = null;
  try {
    e(ja, c_);
  } catch {
  }
  return Us;
}
var ja = {}, c_ = {}, Us;
f_(ja, cf);
f_(c_, Fm);
ja.eachSeriesByType = ja.eachRawSeriesByType = function(e) {
  Us = e;
};
ja.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (Us = e.subType);
};
function f_(e, t) {
  for (var r in t.prototype)
    e[r] = Wt;
}
var Qd = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const CM = {
  color: Qd,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Qd]
};
var kt = "#B9B8CE", Jd = "#100C2A", Fo = function() {
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
}, tp = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], v_ = {
  darkMode: !0,
  color: tp,
  backgroundColor: Jd,
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
      color: Jd
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
  timeAxis: Fo(),
  logAxis: Fo(),
  valueAxis: Fo(),
  categoryAxis: Fo(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: tp
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
v_.categoryAxis.splitLine.show = !1;
var MM = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, i = {}, n = {};
      if (H(t)) {
        var a = Ye(t);
        r.mainType = a.main || null, r.subType = a.sub || null;
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
              d !== "data" && (r.mainType = d, r[v.toLowerCase()] = l, h = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, h = !0), h || (n[u] = l);
        });
      }
      return {
        cptQuery: r,
        dataQuery: i,
        otherQuery: n
      };
    }, e.prototype.filter = function(t, r) {
      var i = this.eventInfo;
      if (!i)
        return !0;
      var n = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
      if (!o || !s)
        return !0;
      var l = r.cptQuery, u = r.dataQuery;
      return h(l, o, "mainType") && h(l, o, "subType") && h(l, o, "index", "componentIndex") && h(l, o, "name") && h(l, o, "id") && h(u, a, "name") && h(u, a, "dataIndex") && h(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, r.otherQuery, n, a));
      function h(c, v, f, d) {
        return c[f] == null || v[d || f] === c[f];
      }
    }, e.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, e;
  }()
), qh = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], ep = qh.concat(["symbolKeepAspect"]), DM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < qh.length; o++) {
      var s = qh[o], l = e.get(s);
      Z(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || e.defaultSymbol, r.setVisual(N({
      legendIcon: e.legendIcon || i.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(e))
      return;
    var u = gt(n);
    function h(c, v) {
      for (var f = e.getRawValue(v), d = e.getDataParams(v), g = 0; g < u.length; g++) {
        var p = u[g];
        c.setItemVisual(v, p, n[p](f, d));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, AM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < ep.length; s++) {
        var l = ep[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? i : null
    };
  }
};
function d_(e, t, r) {
  switch (r) {
    case "color":
      var i = e.getItemVisual(t, "style");
      return i[e.getVisual("drawType")];
    case "opacity":
      return e.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getItemVisual(t, r);
  }
}
function p_(e, t) {
  switch (t) {
    case "color":
      var r = e.getVisual("style");
      return r[e.getVisual("drawType")];
    case "opacity":
      return e.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getVisual(t);
  }
}
function IM(e, t, r, i) {
  switch (r) {
    case "color":
      var n = e.ensureUniqueItemVisual(t, "style");
      n[e.getVisual("drawType")] = i, e.setItemVisual(t, "colorFromPalette", !1);
      break;
    case "opacity":
      e.ensureUniqueItemVisual(t, "style").opacity = i;
      break;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      e.setItemVisual(t, r, i);
      break;
  }
}
function tn(e, t, r, i, n) {
  var a = e + t;
  r.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var c = o.getData(), v = $i(c, n.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: z(v) ? c.getName(v[0]) : c.getName(v),
          selected: H(l) ? l : N({}, l)
        });
      }
  });
}
function LM(e, t, r) {
  e.on("selectchanged", function(i) {
    var n = r.getModel();
    i.isFromClick ? (tn("map", "selectchanged", t, n, i), tn("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (tn("map", "selected", t, n, i), tn("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (tn("map", "unselected", t, n, i), tn("pie", "unselected", t, n, i));
  });
}
function dn(e, t, r) {
  for (var i; e && !(t(e) && (i = e, r)); )
    e = e.__hostTarget || e.parent;
  return i;
}
var PM = Math.round(Math.random() * 9), $M = typeof Object.defineProperty == "function", RM = function() {
  function e() {
    this._id = "__ec_inner_" + PM++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var i = this._guard(t);
    return $M ? Object.defineProperty(i, this._id, {
      value: r,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = r, this;
  }, e.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, e.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, e.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, e;
}(), OM = ct.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    e.moveTo(r, i - a), e.lineTo(r + n, i + a), e.lineTo(r - n, i + a), e.closePath();
  }
}), EM = ct.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    e.moveTo(r, i - a), e.lineTo(r + n, i), e.lineTo(r, i + a), e.lineTo(r - n, i), e.closePath();
  }
}), kM = ct.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), v = Math.cos(u), f = o * 0.6, d = o * 0.7;
    e.moveTo(r - h, l + s), e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), e.bezierCurveTo(r + h - c * f, l + s + v * f, r, i - d, r, i), e.bezierCurveTo(r, i - d, r - h + c * f, l + s + v * f, r - h, l + s), e.closePath();
  }
}), NM = ct.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.height, i = t.width, n = t.x, a = t.y, o = i / 3 * 2;
    e.moveTo(n, a), e.lineTo(n + o, a + r), e.lineTo(n, a + r / 4 * 3), e.lineTo(n - o, a + r), e.lineTo(n, a), e.closePath();
  }
}), BM = {
  line: Ur,
  rect: bt,
  roundRect: bt,
  square: bt,
  circle: fl,
  diamond: EM,
  pin: kM,
  arrow: NM,
  triangle: OM
}, zM = {
  line: function(e, t, r, i, n) {
    n.x1 = e, n.y1 = t + i / 2, n.x2 = e + r, n.y2 = t + i / 2;
  },
  rect: function(e, t, r, i, n) {
    n.x = e, n.y = t, n.width = r, n.height = i;
  },
  roundRect: function(e, t, r, i, n) {
    n.x = e, n.y = t, n.width = r, n.height = i, n.r = Math.min(r, i) / 4;
  },
  square: function(e, t, r, i, n) {
    var a = Math.min(r, i);
    n.x = e, n.y = t, n.width = a, n.height = a;
  },
  circle: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.r = Math.min(r, i) / 2;
  },
  diamond: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.width = r, n.height = i;
  },
  pin: function(e, t, r, i, n) {
    n.x = e + r / 2, n.y = t + i / 2, n.width = r, n.height = i;
  },
  arrow: function(e, t, r, i, n) {
    n.x = e + r / 2, n.y = t + i / 2, n.width = r, n.height = i;
  },
  triangle: function(e, t, r, i, n) {
    n.cx = e + r / 2, n.cy = t + i / 2, n.width = r, n.height = i;
  }
}, Zh = {};
C(BM, function(e, t) {
  Zh[t] = new e();
});
var FM = ct.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var i = Rs(e, t, r), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = r.y + r.height * 0.4), i;
  },
  buildPath: function(e, t, r) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Zh[i];
      n || (i = "rect", n = Zh[i]), zM[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(e, n.shape, r);
    }
  }
});
function HM(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function yr(e, t, r, i, n, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = vm(e.slice(8), new lt(t, r, i, n), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = ef(e.slice(7), {}, new lt(t, r, i, n), o ? "center" : "cover") : l = new FM({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = HM, a && l.setColor(a), l;
}
function VM(e) {
  return z(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0];
}
function g_(e, t) {
  if (e != null)
    return z(e) || (e = [e, e]), [Vt(e[0], t[0]) || 0, Vt(tt(e[1], e[0]), t[1]) || 0];
}
function xi(e) {
  return isFinite(e);
}
function GM(e, t, r) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * r.width + r.x, n = n * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), i = xi(i) ? i : 0, n = xi(n) ? n : 1, a = xi(a) ? a : 0, o = xi(o) ? o : 0;
  var s = e.createLinearGradient(i, a, n, o);
  return s;
}
function WM(e, t, r) {
  var i = r.width, n = r.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + r.x, s = s * n + r.y, l = l * a), o = xi(o) ? o : 0.5, s = xi(s) ? s : 0.5, l = l >= 0 && xi(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Kh(e, t, r) {
  for (var i = t.type === "radial" ? WM(e, t, r) : GM(e, t, r), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function UM(e, t) {
  if (e === t || !e && !t)
    return !1;
  if (!e || !t || e.length !== t.length)
    return !0;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !0;
  return !1;
}
function Ho(e) {
  return parseInt(e, 10);
}
function Vo(e, t, r) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (r[i] != null && r[i] !== "auto")
    return parseFloat(r[i]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[n] || Ho(s[i]) || Ho(e.style[i])) - (Ho(s[a]) || 0) - (Ho(s[o]) || 0) | 0;
}
function YM(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : yt(e) ? [e] : z(e) ? e : null;
}
function y_(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && YM(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (r) {
    var n = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    n && n !== 1 && (r = U(r, function(a) {
      return a / n;
    }), i /= n);
  }
  return [r, i];
}
var XM = new Ri(!0);
function Ys(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function rp(e) {
  return typeof e == "string" && e !== "none";
}
function Xs(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function ip(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function np(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function jh(e, t, r) {
  var i = Gy(t.image, t.__image, r);
  if (sl(i)) {
    var n = e.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * b1), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function qM(e, t, r, i) {
  var n, a = Ys(r), o = Xs(r), s = r.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || XM, c = t.__dirty;
  if (!i) {
    var v = r.fill, f = r.stroke, d = o && !!v.colorStops, g = a && !!f.colorStops, p = o && !!v.image, y = a && !!f.image, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0;
    (d || g) && (w = t.getBoundingRect()), d && (m = c ? Kh(e, v, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = c ? Kh(e, f, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (b = c || !t.__canvasFillPattern ? jh(e, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = c || !t.__canvasStrokePattern ? jh(e, f, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), d ? e.fillStyle = m : p && (b ? e.fillStyle = b : o = !1), g ? e.strokeStyle = _ : y && (S ? e.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var M, D;
  e.setLineDash && r.lineDash && (n = y_(t), M = n[0], D = n[1]);
  var A = !0;
  (u || c & ln) && (h.setDPR(e.dpr), l ? h.setContext(null) : (h.setContext(e), A = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), A && h.rebuildPath(e, l ? s : 1), M && (e.setLineDash(M), e.lineDashOffset = D), i || (r.strokeFirst ? (a && np(e, r), o && ip(e, r)) : (o && ip(e, r), a && np(e, r))), M && e.setLineDash([]);
}
function ZM(e, t, r) {
  var i = t.__image = Gy(r.image, t.__image, t, t.onload);
  if (!(!i || !sl(i))) {
    var n = r.x || 0, a = r.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0, h = r.sy || 0;
      e.drawImage(i, u, h, r.sWidth, r.sHeight, n, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx, h = r.sy, c = o - u, v = s - h;
      e.drawImage(i, u, h, c, v, n, a, o, s);
    } else
      e.drawImage(i, n, a, o, s);
  }
}
function KM(e, t, r) {
  var i, n = r.text;
  if (n != null && (n += ""), n) {
    e.font = r.font || Li, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (i = y_(t), a = i[0], o = i[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (Ys(r) && e.strokeText(n, r.x, r.y), Xs(r) && e.fillText(n, r.x, r.y)) : (Xs(r) && e.fillText(n, r.x, r.y), Ys(r) && e.strokeText(n, r.x, r.y)), a && e.setLineDash([]);
  }
}
var ap = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], op = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function m_(e, t, r, i, n) {
  var a = !1;
  if (!i && (r = r || {}, t === r))
    return !1;
  if (i || t.opacity !== r.opacity) {
    Qt(e, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? Mi.opacity : o;
  }
  (i || t.blend !== r.blend) && (a || (Qt(e, n), a = !0), e.globalCompositeOperation = t.blend || Mi.blend);
  for (var s = 0; s < ap.length; s++) {
    var l = ap[s];
    (i || t[l] !== r[l]) && (a || (Qt(e, n), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== r.shadowColor) && (a || (Qt(e, n), a = !0), e.shadowColor = t.shadowColor || Mi.shadowColor), a;
}
function sp(e, t, r, i, n) {
  var a = Qa(t, n.inHover), o = i ? null : r && Qa(r, n.inHover) || {};
  if (a === o)
    return !1;
  var s = m_(e, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Qt(e, n), s = !0), rp(a.fill) && (e.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Qt(e, n), s = !0), rp(a.stroke) && (e.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Qt(e, n), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (Qt(e, n), s = !0), e.lineWidth = u);
  }
  for (var h = 0; h < op.length; h++) {
    var c = op[h], v = c[0];
    (i || a[v] !== o[v]) && (s || (Qt(e, n), s = !0), e[v] = a[v] || c[1]);
  }
  return s;
}
function jM(e, t, r, i, n) {
  return m_(e, Qa(t, n.inHover), r && Qa(r, n.inHover), i, n);
}
function __(e, t) {
  var r = t.transform, i = e.dpr || 1;
  r ? e.setTransform(i * r[0], i * r[1], i * r[2], i * r[3], i * r[4], i * r[5]) : e.setTransform(i, 0, 0, i, 0, 0);
}
function QM(e, t, r) {
  for (var i = !1, n = 0; n < e.length; n++) {
    var a = e[n];
    i = i || a.isZeroArea(), __(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = i;
}
function JM(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var lp = 1, up = 2, hp = 3, cp = 4;
function tD(e) {
  var t = Xs(e), r = Ys(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function Qt(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Qa(e, t) {
  return t && e.__hoverStyle || e.style;
}
function b_(e, t) {
  Ti(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Ti(e, t, r, i) {
  var n = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~ae, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = r.prevElClipPaths, s = !1, l = !1;
  if ((!o || UM(a, o)) && (o && o.length && (Qt(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (Qt(e, r), e.save(), QM(a, e, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var h = t instanceof ct && t.autoBatch && tD(t.style);
  s || JM(n, u.transform) ? (Qt(e, r), __(e, t)) : h || Qt(e, r);
  var c = Qa(t, r.inHover);
  t instanceof ct ? (r.lastDrawType !== lp && (l = !0, r.lastDrawType = lp), sp(e, t, u, l, r), (!h || !r.batchFill && !r.batchStroke) && e.beginPath(), qM(e, t, c, h), h && (r.batchFill = c.fill || "", r.batchStroke = c.stroke || "")) : t instanceof ks ? (r.lastDrawType !== hp && (l = !0, r.lastDrawType = hp), sp(e, t, u, l, r), KM(e, t, c)) : t instanceof rr ? (r.lastDrawType !== up && (l = !0, r.lastDrawType = up), jM(e, t, u, l, r), ZM(e, t, c)) : t.getTemporalDisplayables && (r.lastDrawType !== cp && (l = !0, r.lastDrawType = cp), eD(e, t, r)), h && i && Qt(e, r), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function eD(e, t, r) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  e.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: r.viewWidth,
    viewHeight: r.viewHeight,
    inHover: r.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Ti(e, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = n.length; u < h; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Ti(e, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Eu = new RM(), fp = new oo(100), vp = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Qh(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  e.dirty && Eu.delete(e);
  var a = Eu.get(e);
  if (a)
    return a;
  var o = ut(e, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / r, Eu.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var h = [r], c = !0, v = 0; v < vp.length; ++v) {
      var f = o[vp[v]];
      if (f != null && !z(f) && !H(f) && !yt(f) && typeof f != "boolean") {
        c = !1;
        break;
      }
      h.push(f);
    }
    var d;
    if (c) {
      d = h.join(",") + (n ? "-svg" : "");
      var g = fp.get(d);
      g && (n ? u.svgElement = g : u.image = g);
    }
    var p = S_(o.dashArrayX), y = rD(o.dashArrayY), m = w_(o.symbol), _ = iD(p), b = x_(y), S = !n && Wr.createCanvas(), w = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), M;
    S && (S.width = x.width * r, S.height = x.height * r, M = S.getContext("2d")), A(), c && fp.put(d, S || w), u.image = S, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, I = 0, P = _.length; I < P; ++I)
        T = Mv(T, _[I]);
      for (var $ = 1, I = 0, P = m.length; I < P; ++I)
        $ = Mv($, m[I].length);
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
            for (var j = 0, I = 0; I < p[O].length; ++I)
              j += p[O][I];
            if (j <= 0)
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
      function Vi(ie, Lt, K, rt, qr) {
        var zt = n ? 1 : r, Rf = yr(qr, ie * zt, Lt * zt, K * zt, rt * zt, o.color, o.symbolKeepAspect);
        if (n) {
          var Of = i.painter.renderOneToVNode(Rf);
          Of && w.children.push(Of);
        } else
          b_(M, Rf);
      }
    }
  }
}
function w_(e) {
  if (!e || e.length === 0)
    return [["rect"]];
  if (H(e))
    return [[e]];
  for (var t = !0, r = 0; r < e.length; ++r)
    if (!H(e[r])) {
      t = !1;
      break;
    }
  if (t)
    return w_([e]);
  for (var i = [], r = 0; r < e.length; ++r)
    H(e[r]) ? i.push([e[r]]) : i.push(e[r]);
  return i;
}
function S_(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (yt(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, i = 0; i < e.length; ++i)
    if (!yt(e[i])) {
      r = !1;
      break;
    }
  if (r)
    return S_([e]);
  for (var n = [], i = 0; i < e.length; ++i)
    if (yt(e[i])) {
      var t = Math.ceil(e[i]);
      n.push([t, t]);
    } else {
      var t = U(e[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function rD(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (yt(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = U(e, function(i) {
    return Math.ceil(i);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function iD(e) {
  return U(e, function(t) {
    return x_(t);
  });
}
function x_(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function nD(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var i = r.getData();
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
var Ie = new er(), T_ = {};
function aD(e, t) {
  T_[e] = t;
}
function oD(e) {
  return T_[e];
}
var sD = 1, lD = 800, uD = 900, hD = 1e3, cD = 2e3, fD = 5e3, C_ = 1e3, vD = 1100, yf = 2e3, M_ = 3e3, dD = 4e3, Il = 4500, pD = 4600, gD = 5e3, yD = 6e3, D_ = 7e3, mD = {
  PROCESSOR: {
    FILTER: hD,
    SERIES_FILTER: lD,
    STATISTIC: fD
  },
  VISUAL: {
    LAYOUT: C_,
    PROGRESSIVE_LAYOUT: vD,
    GLOBAL: yf,
    CHART: M_,
    POST_CHART_LAYOUT: pD,
    COMPONENT: dD,
    BRUSH: gD,
    CHART_ITEM: Il,
    ARIA: yD,
    DECAL: D_
  }
}, Et = "__flagInMainProcess", Yt = "__pendingUpdate", ku = "__needsUpdateStatus", dp = /^[a-zA-Z0-9_]+$/, Nu = "__connectUpdateStatus", pp = 0, _D = 1, bD = 2;
function A_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return L_(this, e, t);
  };
}
function I_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return L_(this, e, t);
  };
}
function L_(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), er.prototype[t].apply(e, r);
}
var P_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(er)
), $_ = P_.prototype;
$_.on = I_("on");
$_.off = I_("off");
var en, Bu, Go, Lr, zu, Fu, Hu, ra, ia, gp, yp, Vu, mp, Wo, _p, R_, le, bp, O_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, i, n) {
      var a = e.call(this, new MM()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, H(i) && (i = E_[i]), a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = xv(r, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: tt(n.useDirtyRect, l),
        useCoarsePointer: tt(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = gf(J(u.flush, u), 17), i = q(i), i && Vm(i, !0), a._theme = i, a._locale = $T(n.locale || wm), a._coordSysMgr = new Ml();
      var h = a._api = _p(a);
      function c(v, f) {
        return v.__prio - f.__prio;
      }
      return as(Zs, c), as(Jh, c), a._scheduler = new u_(a, h, Jh, Zs), a._messageCenter = new P_(), a._initEvents(), a.resize = J(a.resize, a), u.animation.on("frame", a._onframe, a), gp(u, a), yp(u, a), vh(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        bp(this);
        var r = this._scheduler;
        if (this[Yt]) {
          var i = this[Yt].silent;
          this[Et] = !0;
          try {
            en(this), Lr.update.call(this, null, this[Yt].updateParams);
          } catch (l) {
            throw this[Et] = !1, this[Yt] = null, l;
          }
          this._zr.flush(), this[Et] = !1, this[Yt] = null, ra.call(this, i), ia.call(this, i);
        } else if (r.unfinished) {
          var n = sD, a = this._model, o = this._api;
          r.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Fu(this, a), r.performVisualTasks(a), Wo(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
          } while (n > 0 && r.unfinished);
          r.unfinished || this._zr.flush();
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
    }, t.prototype.setOption = function(r, i, n) {
      if (!this[Et]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (V(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Et] = !0, !this._model || i) {
          var l = new oC(this._api), u = this._theme, h = this._model = new cf();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, tc);
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
            en(this), Lr.update.call(this, null, c);
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
      return this._zr.painter.dpr || X.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(r) {
      return this.renderToCanvas(r);
    }, t.prototype.renderToCanvas = function(r) {
      r = r || {};
      var i = this._zr.painter;
      return i.getRenderedCanvas({
        backgroundColor: r.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: r.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(r) {
      r = r || {};
      var i = this._zr.painter;
      return i.renderToString({
        useViewBox: r.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (X.svgSupported) {
        var r = this._zr, i = r.storage.getDisplayList();
        return C(i, function(n) {
          n.stopAnimation(null, !0);
        }), r.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      r = r || {};
      var i = r.excludeComponents, n = this._model, a = [], o = this;
      C(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var h = o._componentsMap[u.__viewId];
          h.group.ignore || (a.push(h), h.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(r).toDataURL("image/" + (r && r.type || "png"));
      return C(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = r.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (wp[n]) {
        var l = s, u = s, h = -s, c = -s, v = [], f = r && r.pixelRatio || this.getDevicePixelRatio();
        C($a, function(_, b) {
          if (_.group === n) {
            var S = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(q(r)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), c = o(w.bottom, c), v.push({
              dom: S,
              left: w.left,
              top: w.top
            });
          }
        }), l *= f, u *= f, h *= f, c *= f;
        var d = h - l, g = c - u, p = Wr.createCanvas(), y = xv(p, {
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
          }), y.painter.getSvgRoot().innerHTML = m, r.connectedBackgroundColor && y.painter.setBackgroundColor(r.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && y.add(new bt({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: g
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), C(v, function(_) {
            var b = new rr({
              style: {
                x: _.left * f - l,
                y: _.top * f - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), p.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, t.prototype.convertToPixel = function(r, i) {
      return zu(this, "convertToPixel", r, i);
    }, t.prototype.convertFromPixel = function(r, i) {
      return zu(this, "convertFromPixel", r, i);
    }, t.prototype.containPixel = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = lu(n, r);
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
    }, t.prototype.getVisual = function(r, i) {
      var n = this._model, a = lu(n, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? d_(s, l, i) : p_(s, i);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      C(wD, function(i) {
        var n = function(a) {
          var o = r.getModel(), s = a.target, l, u = i === "globalout";
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
            var v = h && c != null && o.getComponent(h, c), f = v && r[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            l.event = a, l.type = i, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: f
            }, r.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, r._zr.on(i, n, r);
      }), C(Pa, function(i, n) {
        r._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, r);
      }), C(["selectchanged"], function(i) {
        r._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, r);
      }), LM(this._messageCenter, this, this._api);
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
      var r = this.getDom();
      r && Fy(this.getDom(), _f, "");
      var i = this, n = i._api, a = i._model;
      C(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), C(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete $a[i.id];
    }, t.prototype.resize = function(r) {
      if (!this[Et]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = r && r.silent;
          this[Yt] && (a == null && (a = this[Yt].silent), n = !0, this[Yt] = null), this[Et] = !0;
          try {
            n && en(this), Lr.update.call(this, {
              type: "resize",
              animation: N({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[Et] = !1, o;
          }
          this[Et] = !1, ra.call(this, a), ia.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(r) && (i = r, r = ""), r = r || "default", this.hideLoading(), !!ec[r]) {
        var n = ec[r](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(r) {
      var i = N({}, r);
      return i.type = Pa[r.type], i;
    }, t.prototype.dispatchAction = function(r, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(i) || (i = {
        silent: !!i
      }), !!qs[r.type] && this._model) {
        if (this[Et]) {
          this._pendingActions.push(r);
          return;
        }
        var n = i.silent;
        Hu.call(this, r, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && X.browser.weChat && this._throttledZrFlush(), ra.call(this, n), ia.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      Ie.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = r.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      a.appendData(r), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = function() {
      en = function(c) {
        var v = c._scheduler;
        v.restorePipelines(c._model), v.prepareStageTasks(), Bu(c, !0), Bu(c, !1), v.plan();
      }, Bu = function(c, v) {
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
            var A = Ye(w.type), T = v ? Oe.getClass(A.main, A.sub) : (
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
      }, Go = function(c, v, f, d, g) {
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
        _ != null && (b = Q(), C(Rt(_), function(w) {
          var x = $e(w, null);
          x != null && b.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          if (!x)
            if (ed(f))
              if (w instanceof Re)
                f.type === Di && !f.notBlur && !w.get(["emphasis", "disabled"]) && gx(w, f, c._api);
              else {
                var M = Xc(w.mainType, w.componentIndex, f.name, c._api), D = M.focusSelf, A = M.dispatchers;
                f.type === Di && D && !f.notBlur && Rh(w.mainType, w.componentIndex, c._api), A && C(A, function(T) {
                  f.type === Di ? Ns(T) : Bs(T);
                });
              }
            else Nh(f) && w instanceof Re && (_x(w, f, c._api), Jv(w), le(c));
        }, c), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          x || S(c[d === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, c);
        function S(w) {
          w && w.__alive && w[v] && w[v](w.__model, p, c._api, f);
        }
      }, Lr = {
        prepareAndUpdate: function(c) {
          en(this), Lr.update.call(this, c, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: c.newOption != null
          });
        },
        update: function(c, v) {
          var f = this._model, d = this._api, g = this._zr, p = this._coordSysMgr, y = this._scheduler;
          if (f) {
            f.setUpdatePayload(c), y.restoreData(f, c), y.performSeriesTasks(f), p.create(f, d), y.performDataProcessorTasks(f, c), Fu(this, f), p.update(f, d), r(f), y.performVisualTasks(f, c), Vu(this, f, d, c, v);
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
            var p = Q();
            f.eachSeries(function(y) {
              var m = v._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, f, d, c);
                _ && _.update && p.set(y.uid, 1);
              } else
                p.set(y.uid, 1);
            }), r(f), this._scheduler.performVisualTasks(f, c, {
              setDirty: !0,
              dirtyMap: p
            }), Wo(this, f, d, c, {}, p), Ie.trigger("afterupdate", f, d);
          }
        },
        updateView: function(c) {
          var v = this._model;
          v && (v.setUpdatePayload(c), be.markUpdateMethod(c, "updateView"), r(v), this._scheduler.performVisualTasks(v, c, {
            setDirty: !0
          }), Vu(this, v, this._api, c, {}), Ie.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(c) {
          var v = this, f = this._model;
          f && (f.setUpdatePayload(c), f.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), be.markUpdateMethod(c, "updateVisual"), r(f), this._scheduler.performVisualTasks(f, c, {
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
          Lr.update.call(this, c);
        }
      }, zu = function(c, v, f, d) {
        if (c._disposed) {
          c.id;
          return;
        }
        for (var g = c._model, p = c._coordSysMgr.getCoordinateSystems(), y, m = lu(g, f), _ = 0; _ < p.length; _++) {
          var b = p[_];
          if (b[v] && (y = b[v](g, m, d)) != null)
            return y;
        }
      }, Fu = function(c, v) {
        var f = c._chartsMap, d = c._scheduler;
        v.eachSeries(function(g) {
          d.updateStreamModes(g, f[g.__viewId]);
        });
      }, Hu = function(c, v) {
        var f = this, d = this.getModel(), g = c.type, p = c.escapeConnect, y = qs[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), S = _[0] != null && Ye(_[0]);
        this[Et] = !0;
        var w = [c], x = !1;
        c.batch && (x = !0, w = U(c.batch, function($) {
          return $ = ut(N({}, $), c), $.batch = null, $;
        }));
        var M = [], D, A = Nh(c), T = ed(c);
        if (T && am(this._api), C(w, function($) {
          if (D = y.action($, f._model, f._api), D = D || N({}, $), D.type = m.event || D.type, M.push(D), T) {
            var R = Vc(c), O = R.queryOptionMap, G = R.mainTypeSpecified, E = G ? O.keys()[0] : "series";
            Go(f, b, $, E), le(f);
          } else A ? (Go(f, b, $, "series"), le(f)) : S && Go(f, b, $, S.main, S.sub);
        }), b !== "none" && !T && !A && !S)
          try {
            this[Yt] ? (en(this), Lr.update.call(this, c), this[Yt] = null) : Lr[b].call(this, c);
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
              selected: bx(d),
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
          Hu.call(this, f, c);
        }
      }, ia = function(c) {
        !c && this.trigger("updated");
      }, gp = function(c, v) {
        c.on("rendered", function(f) {
          v.trigger("rendered", f), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          c.animation.isFinished() && !v[Yt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, yp = function(c, v) {
        c.on("mouseover", function(f) {
          var d = f.target, g = dn(d, kh);
          g && (yx(g, f, v._api), le(v));
        }).on("mouseout", function(f) {
          var d = f.target, g = dn(d, kh);
          g && (mx(g, f, v._api), le(v));
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
      function r(c) {
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
          as(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), C(g, function(m) {
            var _ = c.getComponent(m.type, m.idx), b = m.zlevel, S = m.key;
            p != null && (b = Math.max(p, b)), S ? (b === p && S !== y && b++, y = S) : y && (b === p && b++, y = ""), p = b, _.setZLevel(b);
          });
        }
      }
      Vu = function(c, v, f, d, g) {
        i(v), mp(c, v, f, d, g), C(c._chartsViews, function(p) {
          p.__alive = !1;
        }), Wo(c, v, f, d, g), C(c._chartsViews, function(p) {
          p.__alive || p.remove(v, f);
        });
      }, mp = function(c, v, f, d, g, p) {
        C(p || c._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, v, f, d), s(m, y), h(m, y);
        });
      }, Wo = function(c, v, f, d, g, p) {
        var y = c._scheduler;
        g = N(g || {}, {
          updatedSeries: v.getSeries()
        }), Ie.trigger("series:beforeupdate", v, f, g);
        var m = !1;
        v.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          b.__alive = !0;
          var S = b.renderTask;
          y.updatePayload(S, d), u(_, b), p && p.get(_.uid) && S.dirty(), S.perform(y.getPerformArgs(S)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), Jv(_);
        }), y.unfinished = m || y.unfinished, Ie.trigger("series:layoutlabels", v, f, g), Ie.trigger("series:transition", v, f, g), v.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(c, v), Ie.trigger("series:afterupdate", v, f, g);
      }, le = function(c) {
        c[ku] = !0, c.getZr().wakeUp();
      }, bp = function(c) {
        c[ku] && (c.getZr().storage.traverse(function(v) {
          Aa(v) || n(v);
        }), c[ku] = !1);
      };
      function n(c) {
        for (var v = [], f = c.currentStates, d = 0; d < f.length; d++) {
          var g = f[d];
          g === "emphasis" || g === "blur" || g === "select" || v.push(g);
        }
        c.selected && c.states.select && v.push("select"), c.hoverState === hl && c.states.emphasis ? v.push("emphasis") : c.hoverState === ul && c.states.blur && v.push("blur"), c.useStates(v);
      }
      function a(c, v) {
        var f = c._zr, d = f.storage, g = 0;
        d.traverse(function(p) {
          p.isGroup || g++;
        }), g > v.get("hoverLayerThreshold") && !X.node && !X.worker && v.eachSeries(function(p) {
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
          if (!Aa(f)) {
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
            if (Aa(y))
              return;
            if (y instanceof ct && Mx(y), y.__dirty) {
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
      _p = function(c) {
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
            Ns(d, g), le(c);
          }, f.prototype.leaveEmphasis = function(d, g) {
            Bs(d, g), le(c);
          }, f.prototype.enterBlur = function(d) {
            px(d), le(c);
          }, f.prototype.leaveBlur = function(d) {
            em(d), le(c);
          }, f.prototype.enterSelect = function(d) {
            rm(d), le(c);
          }, f.prototype.leaveSelect = function(d) {
            im(d), le(c);
          }, f.prototype.getModel = function() {
            return c.getModel();
          }, f.prototype.getViewOfComponentModel = function(d) {
            return c.getViewOfComponentModel(d);
          }, f.prototype.getViewOfSeriesModel = function(d) {
            return c.getViewOfSeriesModel(d);
          }, f;
        }(Fm))(c);
      }, R_ = function(c) {
        function v(f, d) {
          for (var g = 0; g < f.length; g++) {
            var p = f[g];
            p[Nu] = d;
          }
        }
        C(Pa, function(f, d) {
          c._messageCenter.on(d, function(g) {
            if (wp[c.group] && c[Nu] !== pp) {
              if (g && g.escapeConnect)
                return;
              var p = c.makeActionFromEvent(g), y = [];
              C($a, function(m) {
                m !== c && m.group === c.group && y.push(m);
              }), v(y, pp), C(y, function(m) {
                m[Nu] !== _D && m.dispatchAction(p);
              }), v(y, bD);
            }
          });
        });
      };
    }(), t;
  }(er)
), mf = O_.prototype;
mf.on = A_("on");
mf.off = A_("off");
mf.one = function(e, t, r) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(e, n);
  }
  this.on.call(this, e, n, r);
};
var wD = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var qs = {}, Pa = {}, Jh = [], tc = [], Zs = [], E_ = {}, ec = {}, $a = {}, wp = {}, SD = +/* @__PURE__ */ new Date() - 0, _f = "_echarts_instance_";
function xD(e, t, r) {
  var i = !(r && r.ssr);
  if (i) {
    var n = TD(e);
    if (n)
      return n;
  }
  var a = new O_(e, t, r);
  return a.id = "ec_" + SD++, $a[a.id] = a, i && Fy(e, _f, a.id), R_(a), Ie.trigger("afterinit", a), a;
}
function TD(e) {
  return $a[nS(e, _f)];
}
function k_(e, t) {
  E_[e] = t;
}
function N_(e) {
  vt(tc, e) < 0 && tc.push(e);
}
function B_(e, t) {
  wf(Jh, e, t, cD);
}
function CD(e) {
  bf("afterinit", e);
}
function MD(e) {
  bf("afterupdate", e);
}
function bf(e, t) {
  Ie.on(e, t);
}
function Hn(e, t, r) {
  Z(t) && (r = t, t = "");
  var i = V(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || i).toLowerCase(), t = e.event, !Pa[t] && (qe(dp.test(i) && dp.test(t)), qs[i] || (qs[i] = {
    action: r,
    actionInfo: e
  }), Pa[t] = i);
}
function DD(e, t) {
  Ml.register(e, t);
}
function AD(e, t) {
  wf(Zs, e, t, C_, "layout");
}
function ki(e, t) {
  wf(Zs, e, t, M_, "visual");
}
var Sp = [];
function wf(e, t, r, i, n) {
  if ((Z(t) || V(t)) && (r = t, t = i), !(vt(Sp, r) >= 0)) {
    Sp.push(r);
    var a = u_.wrapStageHandler(r, n);
    a.__prio = t, a.__raw = r, e.push(a);
  }
}
function z_(e, t) {
  ec[e] = t;
}
function ID(e, t, r) {
  var i = oD("registerMap");
  i && i(e, t, r);
}
var LD = kC;
ki(yf, fM);
ki(Il, vM);
ki(Il, dM);
ki(yf, DM);
ki(Il, AM);
ki(D_, nD);
N_(Vm);
B_(uD, mC);
z_("default", pM);
Hn({
  type: Di,
  event: Di,
  update: Di
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
Hn({
  type: fs,
  event: fs,
  update: fs
}, Wt);
Hn({
  type: Ma,
  event: Ma,
  update: Ma
}, Wt);
k_("light", CM);
k_("dark", v_);
function na(e) {
  return e == null ? 0 : e.length || 1;
}
function xp(e) {
  return e;
}
var PD = (
  /** @class */
  function() {
    function e(t, r, i, n, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = i || xp, this._newKeyGetter = n || xp, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return e.prototype.add = function(t) {
      return this._add = t, this;
    }, e.prototype.update = function(t) {
      return this._update = t, this;
    }, e.prototype.updateManyToOne = function(t) {
      return this._updateManyToOne = t, this;
    }, e.prototype.updateOneToMany = function(t) {
      return this._updateOneToMany = t, this;
    }, e.prototype.updateManyToMany = function(t) {
      return this._updateManyToMany = t, this;
    }, e.prototype.remove = function(t) {
      return this._remove = t, this;
    }, e.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, e.prototype._executeOneToOne = function() {
      var t = this._old, r = this._new, i = {}, n = new Array(t.length), a = new Array(r.length);
      this._initIndexMap(t, null, n, "_oldKeyGetter"), this._initIndexMap(r, i, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = n[o], l = i[s], u = na(l);
        if (u > 1) {
          var h = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(h, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, e.prototype._executeMultiple = function() {
      var t = this._old, r = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(r, n, o, "_newKeyGetter");
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
    }, e.prototype._performRestAdd = function(t, r) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = r[n], o = na(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        r[n] = null;
      }
    }, e.prototype._initIndexMap = function(t, r, i, n) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[n](t[o], o);
        if (a || (i[o] = s), !!r) {
          var l = r[s], u = na(l);
          u === 0 ? (r[s] = o, a && i.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  }()
), $D = (
  /** @class */
  function() {
    function e(t, r) {
      this._encode = t, this._schema = r;
    }
    return e.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, e.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, e;
  }()
);
function RD(e, t) {
  var r = {}, i = r.encode = {}, n = Q(), a = [], o = [], s = {};
  C(e.dimensions, function(v) {
    var f = e.getDimensionInfo(v), d = f.coordDim;
    if (d) {
      var g = f.coordDimIndex;
      Gu(i, d)[g] = v, f.isExtraCoord || (n.set(d, 1), ED(f.type) && (a[0] = v), Gu(s, d)[g] = e.getDimensionIndex(f.name)), f.defaultTooltip && o.push(v);
    }
    Em.each(function(p, y) {
      var m = Gu(i, y), _ = f.otherDims[y];
      _ != null && _ !== !1 && (m[_] = f.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, f) {
    var d = i[f];
    u[f] = d[0], l = l.concat(d);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = U(l, function(v) {
    return e.getDimensionInfo(v).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var h = i.label;
  h && h.length && (a = h.slice());
  var c = i.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, r.userOutput = new $D(s, t), r;
}
function Gu(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function OD(e) {
  return e === "category" ? "ordinal" : e === "time" ? "time" : "float";
}
function ED(e) {
  return !(e === "ordinal" || e === "time");
}
var ys = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.otherDims = {}, t != null && N(this, t);
    }
    return e;
  }()
), kD = It(), ND = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, F_ = (
  /** @class */
  function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = G_(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return tt(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = Um(this.source), i = !W_(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, h = void 0, c = this.dimensions[s];
        if (c && c.storeDimIndex === o)
          l = r ? c.name : null, u = c.type, h = c.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = r ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: h
        }), r && l != null && (!c || !c.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += ND[u] || "f", h && (n += h.uid), n += "$";
      }
      var f = this.source, d = [f.seriesLayoutBy, f.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: d
      };
    }, e.prototype.makeOutputDimensionNames = function() {
      for (var t = [], r = 0, i = 0; r < this._fullDimCount; r++) {
        var n = void 0, a = this.dimensions[i];
        if (a && a.storeDimIndex === r)
          a.isCalculationCoord || (n = a.name), i++;
        else {
          var o = this.getSourceDimension(r);
          o && (n = o.name);
        }
        t.push(n);
      }
      return t;
    }, e.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, e;
  }()
);
function H_(e) {
  return e instanceof F_;
}
function V_(e) {
  for (var t = Q(), r = 0; r < (e || []).length; r++) {
    var i = e[r], n = V(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, r);
  }
  return t;
}
function G_(e) {
  var t = kD(e);
  return t.dimNameMap || (t.dimNameMap = V_(e.dimensionsDefine));
}
function W_(e) {
  return e > 30;
}
var aa = V, Pr = U, BD = typeof Int32Array > "u" ? Array : Int32Array, zD = "e\0\0", Tp = -1, FD = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], HD = ["_approximateExtent"], Cp, Uo, oa, sa, Wu, la, Uu, VD = (
  /** @class */
  function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      H_(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < i.length; h++) {
        var c = i[h], v = H(c) ? new ys({
          name: c
        }) : c instanceof ys ? c : new ys(c), f = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = f, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(f), a[f] = v, u[f] != null && (l = !0), v.createInvertedIndices && (s[f] = []), d.itemName === 0 && (this._nameDimIdx = h), d.itemId === 0 && (this._idDimIdx = h), n && (v.storeDimIndex = h);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = r, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = Q();
        C(o, function(p) {
          g.set(a[p].storeDimIndex, p);
        });
      }
    }
    return e.prototype.getDimension = function(t) {
      var r = this._recognizeDimIndex(t);
      if (r == null)
        return t;
      if (r = t, !this._dimOmitted)
        return this.dimensions[r];
      var i = this._dimIdxToName.get(r);
      if (i != null)
        return i;
      var n = this._schema.getSourceDimension(r);
      if (n)
        return n.name;
    }, e.prototype.getDimensionIndex = function(t) {
      var r = this._recognizeDimIndex(t);
      if (r != null)
        return r;
      if (t == null)
        return -1;
      var i = this._getDimInfo(t);
      return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, e.prototype._recognizeDimIndex = function(t) {
      if (yt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, e.prototype._getStoreDimIndex = function(t) {
      var r = this.getDimensionIndex(t);
      return r;
    }, e.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, e.prototype._initGetDimensionInfo = function(t) {
      var r = this._dimInfos;
      this._getDimInfo = t ? function(i) {
        return r.hasOwnProperty(i) ? r[i] : void 0;
      } : function(i) {
        return r[i];
      };
    }, e.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, e.prototype.mapDimension = function(t, r) {
      var i = this._dimSummary;
      if (r == null)
        return i.encodeFirstDimNotExtra[t];
      var n = i.encode[t];
      return n ? n[r] : null;
    }, e.prototype.mapDimensionsAll = function(t) {
      var r = this._dimSummary, i = r.encode[t];
      return (i || []).slice();
    }, e.prototype.getStore = function() {
      return this._store;
    }, e.prototype.initData = function(t, r, i) {
      var n = this, a;
      if (t instanceof Gh && (a = t), !a) {
        var o = this.dimensions, s = ff(t) || Jt(t) ? new Ym(t, o.length) : t;
        a = new Gh();
        var l = Pr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = RD(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var i = this._store.appendValues(t, r && r.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = r[l], o && Uu(this, s);
        }
    }, e.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, r = this.dimensions, i = 0; i < r.length; i++) {
        var n = this._dimInfos[r[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, e.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Vr && !t.fillStorage;
    }, e.prototype._doInit = function(t, r) {
      if (!(t >= r)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === Se;
        if (l && !n.pure)
          for (var u = [], h = t; h < r; h++) {
            var c = n.getItem(h, u);
            if (!this.hasItemOption && Yw(c) && (this.hasItemOption = !0), c) {
              var v = c.name;
              a[h] == null && v != null && (a[h] = $e(v, null));
              var f = c.id;
              o[h] == null && f != null && (o[h] = $e(f, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < r; h++)
            Uu(this, h);
        Cp(this);
      }
    }, e.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      aa(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), i = this._nameList[r];
      return i == null && this._nameDimIdx != null && (i = oa(this, this._nameDimIdx, r)), i == null && (i = ""), i;
    }, e.prototype._getCategory = function(t, r) {
      var i = this._store.get(t, r), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, e.prototype.getId = function(t) {
      return Uo(this, this.getRawIndex(t));
    }, e.prototype.count = function() {
      return this._store.count();
    }, e.prototype.get = function(t, r) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.get(n.storeDimIndex, r);
    }, e.prototype.getByRawIndex = function(t, r) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.getByRawIndex(n.storeDimIndex, r);
    }, e.prototype.getIndices = function() {
      return this._store.getIndices();
    }, e.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, e.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, e.prototype.getValues = function(t, r) {
      var i = this, n = this._store;
      return z(t) ? n.getValues(Pr(t, function(a) {
        return i._getStoreDimIndex(a);
      }), r) : n.getValues(t);
    }, e.prototype.hasValue = function(t) {
      for (var r = this._dimSummary.dataDimIndicesOnCoord, i = 0, n = r.length; i < n; i++)
        if (isNaN(this._store.get(r[i], t)))
          return !1;
      return !0;
    }, e.prototype.indexOfName = function(t) {
      for (var r = 0, i = this._store.count(); r < i; r++)
        if (this.getName(r) === t)
          return r;
      return -1;
    }, e.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, e.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, e.prototype.rawIndexOf = function(t, r) {
      var i = t && this._invertedIndicesMap[t], n = i && i[r];
      return n == null || isNaN(n) ? Tp : n;
    }, e.prototype.indicesOfNearest = function(t, r, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), r, i);
    }, e.prototype.each = function(t, r, i) {
      Z(t) && (i = r, r = t, t = []);
      var n = i || this, a = Pr(sa(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? J(r, n) : r);
    }, e.prototype.filterSelf = function(t, r, i) {
      Z(t) && (i = r, r = t, t = []);
      var n = i || this, a = Pr(sa(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? J(r, n) : r), this;
    }, e.prototype.selectRange = function(t) {
      var r = this, i = {}, n = gt(t);
      return C(n, function(a) {
        var o = r._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, e.prototype.mapArray = function(t, r, i) {
      Z(t) && (i = r, r = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(r && r.apply(this, arguments));
      }, i), n;
    }, e.prototype.map = function(t, r, i, n) {
      var a = i || n || this, o = Pr(sa(t), this._getStoreDimIndex, this), s = la(this);
      return s._store = this._store.map(o, a ? J(r, a) : r), s;
    }, e.prototype.modify = function(t, r, i, n) {
      var a = i || n || this, o = Pr(sa(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? J(r, a) : r);
    }, e.prototype.downSample = function(t, r, i, n) {
      var a = la(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), r, i, n), a;
    }, e.prototype.minmaxDownSample = function(t, r) {
      var i = la(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.lttbDownSample = function(t, r) {
      var i = la(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r), i;
    }, e.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, e.prototype.getItemModel = function(t) {
      var r = this.hostModel, i = this.getRawDataItem(t);
      return new xt(i, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new PD(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Uo(t, i);
      }, function(i) {
        return Uo(r, i);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, aa(t) ? N(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var i = this._itemVisuals[t], n = i && i[r];
      return n ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[r];
      return a == null && (a = this.getVisual(r), z(a) ? a = a.slice() : aa(a) && (a = N({}, a)), n[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, aa(r) ? N(n, r) : n[r] = i;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      aa(t) ? N(this._layout, t) : this._layout[t] = r;
    }, e.prototype.getLayout = function(t) {
      return this._layout[t];
    }, e.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, e.prototype.setItemLayout = function(t, r, i) {
      this._itemLayouts[t] = i ? N(this._itemLayouts[t] || {}, r) : r;
    }, e.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function(t, r) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      ax(i, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      C(this._graphicEls, function(i, n) {
        i && t && t.call(r, i, n);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : Pr(this.dimensions, this._getDimInfo, this), this.hostModel)), Wu(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var i = this[t];
      Z(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return r.apply(this, [n].concat(Pc(arguments)));
      });
    }, e.internalField = function() {
      Cp = function(t) {
        var r = t._invertedIndicesMap;
        C(r, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = r[n] = new BD(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = Tp;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, oa = function(t, r, i) {
        return $e(t._getCategory(r, i), null);
      }, Uo = function(t, r) {
        var i = t._idList[r];
        return i == null && t._idDimIdx != null && (i = oa(t, t._idDimIdx, r)), i == null && (i = zD + r), i;
      }, sa = function(t) {
        return z(t) || (t = t != null ? [t] : []), t;
      }, la = function(t) {
        var r = new e(t._schema ? t._schema : Pr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Wu(r, t), r;
      }, Wu = function(t, r) {
        C(FD.concat(r.__wrappedMethods || []), function(i) {
          r.hasOwnProperty(i) && (t[i] = r[i]);
        }), t.__wrappedMethods = r.__wrappedMethods, C(HD, function(i) {
          t[i] = q(r[i]);
        }), t._calculationInfo = N({}, r._calculationInfo);
      }, Uu = function(t, r) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[r], l = n[r];
        if (s == null && a != null && (i[r] = s = oa(t, a, r)), l == null && o != null && (n[r] = l = oa(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), n[r] = l;
        }
      };
    }(), e;
  }()
);
function GD(e, t) {
  ff(e) || (e = Gm(e)), t = t || {};
  var r = t.coordDimensions || [], i = t.dimensionsDefine || e.dimensionsDefine || [], n = Q(), a = [], o = UD(e, r, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && W_(o), l = i === e.dimensionsDefine, u = l ? G_(e) : V_(i), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(e, o));
  for (var c = Q(h), v = new jm(o), f = 0; f < v.length; f++)
    v[f] = -1;
  function d(D) {
    var A = v[D];
    if (A < 0) {
      var T = i[D], I = V(T) ? T : {
        name: T
      }, P = new ys(), $ = I.name;
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
  C(r, function(D) {
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
    Em.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, n.set(A, !0));
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
      M == null && (x.coordDim = YD(b, n, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (zm(e, w) === ne.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return WD(a), new F_({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function WD(e) {
  for (var t = Q(), r = 0; r < e.length; r++) {
    var i = e[r], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function UD(e, t, r, i) {
  var n = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, i || 0);
  return C(t, function(a) {
    var o;
    V(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function YD(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var i = 0; t.hasKey(e + i); )
      i++;
    e += i;
  }
  return t.set(e, !0), e;
}
var XD = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.coordSysDims = [], this.axisMap = Q(), this.categoryAxisMap = Q(), this.coordSysName = t;
    }
    return e;
  }()
);
function qD(e) {
  var t = e.get("coordinateSystem"), r = new XD(t), i = ZD[t];
  if (i)
    return i(e, r, r.axisMap, r.categoryAxisMap), r;
}
var ZD = {
  cartesian2d: function(e, t, r, i) {
    var n = e.getReferringComponents("xAxis", Le).models[0], a = e.getReferringComponents("yAxis", Le).models[0];
    t.coordSysDims = ["x", "y"], r.set("x", n), r.set("y", a), rn(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), rn(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(e, t, r, i) {
    var n = e.getReferringComponents("singleAxis", Le).models[0];
    t.coordSysDims = ["single"], r.set("single", n), rn(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(e, t, r, i) {
    var n = e.getReferringComponents("polar", Le).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], r.set("radius", a), r.set("angle", o), rn(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), rn(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(e, t, r, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(e, t, r, i) {
    var n = e.ecModel, a = n.getComponent("parallel", e.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    C(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), h = o[l];
      r.set(h, u), rn(u) && (i.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function rn(e) {
  return e.get("type") === "category";
}
function KD(e, t, r) {
  r = r || {};
  var i = r.byIndex, n = r.stackedCoordDimension, a, o, s;
  jD(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(e && e.get("stack")), u, h, c, v;
  if (C(a, function(m, _) {
    H(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (h = m));
  }), h && !i && !u && (i = !0), h) {
    c = "__\0ecstackresult_" + e.id, v = "__\0ecstackedover_" + e.id, u && (u.createInvertedIndices = !0);
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
function jD(e) {
  return !H_(e.schema);
}
function $n(e, t) {
  return !!t && t === e.getCalculationInfo("stackedDimension");
}
function QD(e, t) {
  return $n(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
function JD(e, t) {
  var r = e.get("coordinateSystem"), i = Ml.get(r), n;
  return t && t.coordSysDims && (n = U(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = OD(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function tA(e, t, r) {
  var i, n;
  return r && C(e, function(a, o) {
    var s = a.coordDim, l = r.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (e[i].otherDims.itemName = 0), i;
}
function Ll(e, t, r) {
  r = r || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === Se;
  var o = qD(t), s = JD(t, o), l = r.useEncodeDefaulter, u = Z(l) ? l : l ? Dt(XT, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: r.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, c = GD(n, h), v = tA(c.dimensions, r.createInvertedIndices, o), f = a ? null : i.getSharedDataStore(c), d = KD(t, {
    schema: c,
    store: f
  }), g = new VD(c, t);
  g.setCalculationInfo(d);
  var p = v != null && eA(n) ? function(y, m, _, b) {
    return b === v ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : f,
    null,
    p
  ), g;
}
function eA(e) {
  if (e.sourceFormat === Se) {
    var t = rA(e.data || []);
    return !z(so(t));
  }
}
function rA(e) {
  for (var t = 0; t < e.length && e[t] == null; )
    t++;
  return e[t];
}
var nr = (
  /** @class */
  function() {
    function e(t) {
      this._setting = t || {}, this._extent = [1 / 0, -1 / 0];
    }
    return e.prototype.getSetting = function(t) {
      return this._setting[t];
    }, e.prototype.unionExtent = function(t) {
      var r = this._extent;
      t[0] < r[0] && (r[0] = t[0]), t[1] > r[1] && (r[1] = t[1]);
    }, e.prototype.unionExtentFromData = function(t, r) {
      this.unionExtent(t.getApproximateExtent(r));
    }, e.prototype.getExtent = function() {
      return this._extent.slice();
    }, e.prototype.setExtent = function(t, r) {
      var i = this._extent;
      isNaN(t) || (i[0] = t), isNaN(r) || (i[1] = r);
    }, e.prototype.isInExtentRange = function(t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }, e.prototype.isBlank = function() {
      return this._isBlank;
    }, e.prototype.setBlank = function(t) {
      this._isBlank = t;
    }, e;
  }()
);
ol(nr);
var iA = 0, rc = (
  /** @class */
  function() {
    function e(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++iA;
    }
    return e.createByAxisModel = function(t) {
      var r = t.option, i = r.data, n = i && U(i, nA);
      return new e({
        categories: n,
        needCollect: !n,
        // deduplication is default in axis.
        deduplication: r.dedplication !== !1
      });
    }, e.prototype.getOrdinal = function(t) {
      return this._getOrCreateMap().get(t);
    }, e.prototype.parseAndCollect = function(t) {
      var r, i = this._needCollect;
      if (!H(t) && !i)
        return t;
      if (i && !this._deduplication)
        return r = this.categories.length, this.categories[r] = t, r;
      var n = this._getOrCreateMap();
      return r = n.get(t), r == null && (i ? (r = this.categories.length, this.categories[r] = t, n.set(t, r)) : r = NaN), r;
    }, e.prototype._getOrCreateMap = function() {
      return this._map || (this._map = Q(this.categories));
    }, e;
  }()
);
function nA(e) {
  return V(e) && e.value != null ? e.value : e + "";
}
function ic(e) {
  return e.type === "interval" || e.type === "log";
}
function aA(e, t, r, i) {
  var n = {}, a = e[1] - e[0], o = n.interval = Ey(a / t);
  r != null && o < r && (o = n.interval = r), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = U_(o), l = n.niceTickExtent = [Mt(Math.ceil(e[0] / o) * o, s), Mt(Math.floor(e[1] / o) * o, s)];
  return oA(l, e), n;
}
function Yu(e) {
  var t = Math.pow(10, Fc(e)), r = e / t;
  return r ? r === 2 ? r = 3 : r === 3 ? r = 5 : r *= 2 : r = 1, Mt(r * t);
}
function U_(e) {
  return lr(e) + 2;
}
function Mp(e, t, r) {
  e[t] = Math.max(Math.min(e[t], r[1]), r[0]);
}
function oA(e, t) {
  !isFinite(e[0]) && (e[0] = t[0]), !isFinite(e[1]) && (e[1] = t[1]), Mp(e, 0, t), Mp(e, 1, t), e[0] > e[1] && (e[0] = e[1]);
}
function Pl(e, t) {
  return e >= t[0] && e <= t[1];
}
function $l(e, t) {
  return t[1] === t[0] ? 0.5 : (e - t[0]) / (t[1] - t[0]);
}
function Rl(e, t) {
  return e * (t[1] - t[0]) + t[0];
}
var Sf = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new rc({})), z(n) && (n = new rc({
        categories: U(n, function(a) {
          return V(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(r) {
      return r == null ? NaN : H(r) ? this._ordinalMeta.getOrdinal(r) : Math.round(r);
    }, t.prototype.contain = function(r) {
      return r = this.parse(r), Pl(r, this._extent) && this._ordinalMeta.categories[r] != null;
    }, t.prototype.normalize = function(r) {
      return r = this._getTickNumber(this.parse(r)), $l(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Math.round(Rl(r, this._extent)), this.getRawOrdinalNumber(r);
    }, t.prototype.getTicks = function() {
      for (var r = [], i = this._extent, n = i[0]; n <= i[1]; )
        r.push({
          value: n
        }), n++;
      return r;
    }, t.prototype.getMinorTicks = function(r) {
    }, t.prototype.setSortInfo = function(r) {
      if (r == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var i = r.ordinalNumbers, n = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, i.length); o < l; ++o) {
        var u = i[o];
        n[o] = u, a[u] = o;
      }
      for (var h = 0; o < s; ++o) {
        for (; a[h] != null; )
          h++;
        n.push(h), a[h] = o;
      }
    }, t.prototype._getTickNumber = function(r) {
      var i = this._ticksByOrdinalNumber;
      return i && r >= 0 && r < i.length ? i[r] : r;
    }, t.prototype.getRawOrdinalNumber = function(r) {
      var i = this._ordinalNumbersByTick;
      return i && r >= 0 && r < i.length ? i[r] : r;
    }, t.prototype.getLabel = function(r) {
      if (!this.isBlank()) {
        var i = this.getRawOrdinalNumber(r.value), n = this._ordinalMeta.categories[i];
        return n == null ? "" : n + "";
      }
    }, t.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function(r, i) {
      this.unionExtent(r.getApproximateExtent(i));
    }, t.prototype.isInExtentRange = function(r) {
      return r = this._getTickNumber(r), this._extent[0] <= r && this._extent[1] >= r;
    }, t.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function() {
    }, t.prototype.calcNiceExtent = function() {
    }, t.type = "ordinal", t;
  }(nr)
);
nr.registerClass(Sf);
var gi = Mt, Vn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "interval", r._interval = 0, r._intervalPrecision = 2, r;
    }
    return t.prototype.parse = function(r) {
      return r;
    }, t.prototype.contain = function(r) {
      return Pl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return $l(r, this._extent);
    }, t.prototype.scale = function(r) {
      return Rl(r, this._extent);
    }, t.prototype.setExtent = function(r, i) {
      var n = this._extent;
      isNaN(r) || (n[0] = parseFloat(r)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(r) {
      var i = this._extent;
      r[0] < i[0] && (i[0] = r[0]), r[1] > i[1] && (i[1] = r[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(r) {
      this._interval = r, this._niceExtent = this._extent.slice(), this._intervalPrecision = U_(r);
    }, t.prototype.getTicks = function(r) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (r ? s.push({
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
      return n[1] > h && (r ? s.push({
        value: gi(h + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(r) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, h = [], c = s.value - l.value, v = c / r; u < r - 1; ) {
          var f = gi(l.value + (u + 1) * v);
          f > a[0] && f < a[1] && h.push(f), u++;
        }
        n.push(h);
      }
      return n;
    }, t.prototype.getLabel = function(r, i) {
      if (r == null)
        return "";
      var n = i && i.precision;
      n == null ? n = lr(r.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = gi(r.value, n, !0);
      return Pm(a);
    }, t.prototype.calcNiceTicks = function(r, i, n) {
      r = r || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = aA(a, r, i, n);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function(r) {
      var i = this._extent;
      if (i[0] === i[1])
        if (i[0] !== 0) {
          var n = Math.abs(i[0]);
          r.fixMax || (i[1] += n / 2), i[0] -= n / 2;
        } else
          i[1] = 1;
      var a = i[1] - i[0];
      isFinite(a) || (i[0] = 0, i[1] = 1), this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval);
      var o = this._interval;
      r.fixMin || (i[0] = gi(Math.floor(i[0] / o) * o)), r.fixMax || (i[1] = gi(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(r, i) {
      this._niceExtent = [r, i];
    }, t.type = "interval", t;
  }(nr)
);
nr.registerClass(Vn);
var Y_ = typeof Float32Array < "u", sA = Y_ ? Float32Array : Array;
function ur(e) {
  return z(e) ? Y_ ? new Float32Array(e) : e : new sA(e);
}
var lA = "__ec_stack_";
function X_(e) {
  return e.get("stack") || lA + e.seriesIndex;
}
function xf(e) {
  return e.dim + e.index;
}
function q_(e, t) {
  var r = [];
  return t.eachSeriesByType(e, function(i) {
    K_(i) && r.push(i);
  }), r;
}
function uA(e) {
  var t = {};
  C(e, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var c = l.getData(), v = h.dim + "_" + h.index, f = c.getDimensionIndex(c.mapDimension(h.dim)), d = c.getStore(), g = 0, p = d.count(); g < p; ++g) {
        var y = d.get(f, g);
        t[v] ? t[v].push(y) : t[v] = [y];
      }
  });
  var r = {};
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
        r[i] = a;
      }
    }
  return r;
}
function Z_(e) {
  var t = uA(e), r = [];
  return C(e, function(i) {
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
      i.get("barMinWidth") || (j_(i) ? 0.5 : 1),
      s
    ), y = i.get("barGap"), m = i.get("barCategoryGap");
    r.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: g,
      barMinWidth: p,
      barGap: y,
      barCategoryGap: m,
      axisKey: xf(a),
      stackId: X_(i)
    });
  }), hA(r);
}
function hA(e) {
  var t = {};
  C(e, function(i, n) {
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
  var r = {};
  return C(t, function(i, n) {
    r[n] = {};
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
      r[n][m] = r[n][m] || {
        bandWidth: o,
        offset: p,
        width: y.width
      }, p += y.width * (1 + h);
    });
  }), r;
}
function cA(e, t, r) {
  if (e && t) {
    var i = e[xf(t)];
    return i;
  }
}
function fA(e, t) {
  var r = q_(e, t), i = Z_(r);
  C(r, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = X_(n), u = i[xf(s)][l], h = u.offset, c = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: c
    });
  });
}
function vA(e) {
  return {
    seriesType: e,
    plan: pf(),
    reset: function(t) {
      if (K_(t)) {
        var r = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = r.getDimensionIndex(r.mapDimension(a.dim)), s = r.getDimensionIndex(r.mapDimension(n.dim)), l = t.get("showBackground", !0), u = r.mapDimension(a.dim), h = r.getCalculationInfo("stackResultDimension"), c = $n(r, u) && !!r.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), f = dA(n, a), d = j_(t), g = t.get("barMinHeight") || 0, p = h && r.getDimensionIndex(h), y = r.getLayout("size"), m = r.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var S = _.count, w = d && ur(S * 3), x = d && l && ur(S * 3), M = d && ur(S), D = i.master.getRect(), A = v ? D.width : D.height, T, I = b.getStore(), P = 0; (T = _.next()) != null; ) {
              var $ = I.get(c ? p : o, T), R = I.get(s, T), O = f, G = void 0;
              c && (G = +$ - I.get(o, T));
              var E = void 0, F = void 0, W = void 0, j = void 0;
              if (v) {
                var et = i.dataToPoint([$, R]);
                if (c) {
                  var ft = i.dataToPoint([G, R]);
                  O = ft[0];
                }
                E = O, F = et[1] + m, W = et[0] - O, j = y, Math.abs(W) < g && (W = (W < 0 ? -1 : 1) * g);
              } else {
                var et = i.dataToPoint([R, $]);
                if (c) {
                  var ft = i.dataToPoint([R, G]);
                  O = ft[1];
                }
                E = et[0] + m, F = O, W = y, j = et[1] - O, Math.abs(j) < g && (j = (j <= 0 ? -1 : 1) * g);
              }
              d ? (w[P] = E, w[P + 1] = F, w[P + 2] = v ? W : j, x && (x[P] = v ? D.x : E, x[P + 1] = v ? F : D.y, x[P + 2] = A), M[T] = T) : b.setItemLayout(T, {
                x: E,
                y: F,
                width: W,
                height: j
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
function K_(e) {
  return e.coordinateSystem && e.coordinateSystem.type === "cartesian2d";
}
function j_(e) {
  return e.pipelineContext && e.pipelineContext.large;
}
function dA(e, t) {
  var r = t.model.get("startValue");
  return r || (r = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? r > 0 ? r : 1 : r));
}
var pA = function(e, t, r, i) {
  for (; r < i; ) {
    var n = r + i >>> 1;
    e[n][1] < t ? r = n + 1 : i = n;
  }
  return r;
}, Q_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(r) {
      var i = this.getSetting("useUTC");
      return bl(r.value, md[kT(wn(this._minLevelUnit))] || md.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(r, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return NT(r, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var r = this._interval, i = this._extent, n = [];
      if (!r)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = SA(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(r) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= ye, i[1] += ye), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - ye;
      }
      this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval);
    }, t.prototype.calcNiceTicks = function(r, i, n) {
      r = r || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / r, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = Yo.length, l = Math.min(pA(Yo, this._approxInterval, 0, s), s - 1);
      this._interval = Yo[l][1], this._minLevelUnit = Yo[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(r) {
      return yt(r) ? r : +pr(r);
    }, t.prototype.contain = function(r) {
      return Pl(this.parse(r), this._extent);
    }, t.prototype.normalize = function(r) {
      return $l(this.parse(r), this._extent);
    }, t.prototype.scale = function(r) {
      return Rl(r, this._extent);
    }, t.type = "time", t;
  }(Vn)
), Yo = [
  // Format                           interval
  ["second", of],
  ["minute", sf],
  ["hour", Ia],
  ["quarter-day", Ia * 6],
  ["half-day", Ia * 12],
  ["day", ye * 1.2],
  ["half-week", ye * 3.5],
  ["week", ye * 7],
  ["month", ye * 31],
  ["quarter", ye * 95],
  ["half-year", yd / 2],
  ["year", yd]
  // 1Y
];
function gA(e, t, r, i) {
  var n = pr(t), a = pr(r), o = function(d) {
    return _d(n, d, i) === _d(a, d, i);
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
  switch (e) {
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
function yA(e, t) {
  return e /= ye, e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1;
}
function mA(e) {
  var t = 30 * ye;
  return e /= t, e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1;
}
function _A(e) {
  return e /= Ia, e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1;
}
function Dp(e, t) {
  return e /= t ? sf : of, e > 30 ? 30 : e > 20 ? 20 : e > 15 ? 15 : e > 10 ? 10 : e > 5 ? 5 : e > 2 ? 2 : 1;
}
function bA(e) {
  return Ey(e);
}
function wA(e, t, r) {
  var i = new Date(e);
  switch (wn(t)) {
    case "year":
    case "month":
      i[Cm(r)](0);
    case "day":
      i[Mm(r)](1);
    case "hour":
      i[Dm(r)](0);
    case "minute":
      i[Am(r)](0);
    case "second":
      i[Im(r)](0), i[Lm(r)](0);
  }
  return i.getTime();
}
function SA(e, t, r, i) {
  var n = 1e4, a = xm, o = 0;
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
    if (!gA(wn(A), i[0], i[1], r)) {
      $ && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: wA(new Date(i[0]), A, r)
      }, {
        value: i[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var O = T[R].value, G = T[R + 1].value;
        if (O !== G) {
          var E = void 0, F = void 0, W = void 0, j = !1;
          switch (A) {
            case "year":
              E = Math.max(1, Math.round(t / ye / 365)), F = lf(r), W = BT(r);
              break;
            case "half-year":
            case "quarter":
            case "month":
              E = mA(t), F = Sn(r), W = Cm(r);
              break;
            case "week":
            case "half-week":
            case "day":
              E = yA(t), F = wl(r), W = Mm(r), j = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              E = _A(t), F = Xa(r), W = Dm(r);
              break;
            case "minute":
              E = Dp(t, !0), F = Sl(r), W = Am(r);
              break;
            case "second":
              E = Dp(t, !1), F = xl(r), W = Im(r);
              break;
            case "millisecond":
              E = bA(t), F = Tl(r), W = Lm(r);
              break;
          }
          s(E, O, G, F, W, j, P), A === "year" && I.length > 1 && R === 0 && I.unshift({
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
    if (ET(a[f])) {
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
          if (c > _ * 1.5 && v > _ / 1.5 || (u.push(p), c > _ || e === a[f]))
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
nr.registerClass(Q_);
var Ap = nr.prototype, Ra = Vn.prototype, xA = Mt, TA = Math.floor, CA = Math.ceil, Xo = Math.pow, Ce = Math.log, Tf = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "log", r.base = 10, r._originalScale = new Vn(), r._interval = 0, r;
    }
    return t.prototype.getTicks = function(r) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = Ra.getTicks.call(this, r);
      return U(o, function(s) {
        var l = s.value, u = Mt(Xo(this.base, l));
        return u = l === n[0] && this._fixMin ? qo(u, a[0]) : u, u = l === n[1] && this._fixMax ? qo(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(r, i) {
      var n = Ce(this.base);
      r = Ce(Math.max(0, r)) / n, i = Ce(Math.max(0, i)) / n, Ra.setExtent.call(this, r, i);
    }, t.prototype.getExtent = function() {
      var r = this.base, i = Ap.getExtent.call(this);
      i[0] = Xo(r, i[0]), i[1] = Xo(r, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = qo(i[0], a[0])), this._fixMax && (i[1] = qo(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(r) {
      this._originalScale.unionExtent(r);
      var i = this.base;
      r[0] = Ce(r[0]) / Ce(i), r[1] = Ce(r[1]) / Ce(i), Ap.unionExtent.call(this, r);
    }, t.prototype.unionExtentFromData = function(r, i) {
      this.unionExtent(r.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(r) {
      r = r || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = Gw(n), o = r / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [Mt(CA(i[0] / a) * a), Mt(TA(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(r) {
      Ra.calcNiceExtent.call(this, r), this._fixMin = r.fixMin, this._fixMax = r.fixMax;
    }, t.prototype.parse = function(r) {
      return r;
    }, t.prototype.contain = function(r) {
      return r = Ce(r) / Ce(this.base), Pl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return r = Ce(r) / Ce(this.base), $l(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Rl(r, this._extent), Xo(this.base, r);
    }, t.type = "log", t;
  }(nr)
), J_ = Tf.prototype;
J_.getMinorTicks = Ra.getMinorTicks;
J_.getLabel = Ra.getLabel;
function qo(e, t) {
  return xA(e, lr(t));
}
nr.registerClass(Tf);
var MA = (
  /** @class */
  function() {
    function e(t, r, i) {
      this._prepareParams(t, r, i);
    }
    return e.prototype._prepareParams = function(t, r, i) {
      i[1] < i[0] && (i = [NaN, NaN]), this._dataMin = i[0], this._dataMax = i[1];
      var n = this._isOrdinal = t.type === "ordinal";
      this._needCrossZero = t.type === "interval" && r.getNeedCrossZero && r.getNeedCrossZero();
      var a = r.get("min", !0);
      a == null && (a = r.get("startValue", !0));
      var o = this._modelMinRaw = a;
      Z(o) ? this._modelMinNum = Zo(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = Zo(t, o));
      var s = this._modelMaxRaw = r.get("max", !0);
      if (Z(s) ? this._modelMaxNum = Zo(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = Zo(t, s)), n)
        this._axisDataLen = r.getCategories().length;
      else {
        var l = r.get("boundaryGap"), u = z(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [Ze(u[0], 1), Ze(u[1], 1)];
      }
    }, e.prototype.calculate = function() {
      var t = this._isOrdinal, r = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - r || Math.abs(r), s = this._modelMinRaw === "dataMin" ? r : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? n ? 0 : NaN : r - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var c = Cs(s) || Cs(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !h && (l = 0));
      var v = this._determinedMin, f = this._determinedMax;
      return v != null && (s = v, u = !0), f != null && (l = f, h = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: h,
        isBlank: c
      };
    }, e.prototype.modifyDataMinMax = function(t, r) {
      this[AA[t]] = r;
    }, e.prototype.setDeterminedMinMax = function(t, r) {
      var i = DA[t];
      this[i] = r;
    }, e.prototype.freeze = function() {
      this.frozen = !0;
    }, e;
  }()
), DA = {
  min: "_determinedMin",
  max: "_determinedMax"
}, AA = {
  min: "_dataMin",
  max: "_dataMax"
};
function IA(e, t, r) {
  var i = e.rawExtentInfo;
  return i || (i = new MA(e, t, r), e.rawExtentInfo = i, i);
}
function Zo(e, t) {
  return t == null ? null : Cs(t) ? NaN : e.parse(t);
}
function t0(e, t) {
  var r = e.type, i = IA(e, t, e.getExtent()).calculate();
  e.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && r === "time") {
    var s = q_("bar", o), l = !1;
    if (C(s, function(c) {
      l = l || c.getBaseAxis() === t.axis;
    }), l) {
      var u = Z_(s), h = LA(n, a, t, u);
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
function LA(e, t, r, i) {
  var n = r.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = cA(i, r.axis);
  if (o === void 0)
    return {
      min: e,
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
  var u = s + l, h = t - e, c = 1 - (s + l) / a, v = h / c - h;
  return t += v * (l / u), e -= v * (s / u), {
    min: e,
    max: t
  };
}
function Ip(e, t) {
  var r = t, i = t0(e, r), n = i.extent, a = r.get("splitNumber");
  e instanceof Tf && (e.base = r.get("logBase"));
  var o = e.type, s = r.get("interval"), l = o === "interval" || o === "time";
  e.setExtent(n[0], n[1]), e.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? r.get("minInterval") : null,
    maxInterval: l ? r.get("maxInterval") : null
  }), s != null && e.setInterval && e.setInterval(s);
}
function PA(e, t) {
  if (t = t || e.get("type"), t)
    switch (t) {
      case "category":
        return new Sf({
          ordinalMeta: e.getOrdinalMeta ? e.getOrdinalMeta() : e.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new Q_({
          locale: e.ecModel.getLocaleModel(),
          useUTC: e.ecModel.get("useUTC")
        });
      default:
        return new (nr.getClass(t) || Vn)();
    }
}
function $A(e) {
  var t = e.scale.getExtent(), r = t[0], i = t[1];
  return !(r > 0 && i > 0 || r < 0 && i < 0);
}
function Gn(e) {
  var t = e.getLabelModel().get("formatter"), r = e.type === "category" ? e.scale.getExtent()[0] : null;
  return e.scale.type === "time" ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e.scale.getFormattedLabel(n, a, i);
    };
  }(t) : H(t) ? /* @__PURE__ */ function(i) {
    return function(n) {
      var a = e.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  }(t) : Z(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return r != null && (a = n.value - r), i(Cf(e, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return e.scale.getLabel(i);
  };
}
function Cf(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function RA(e) {
  var t = e.model, r = e.scale;
  if (!(!t.get(["axisLabel", "show"]) || r.isBlank())) {
    var i, n, a = r.getExtent();
    r instanceof Sf ? n = r.count() : (i = r.getTicks(), n = i.length);
    var o = e.getLabelModel(), s = Gn(e), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var h = 0; h < n; h += u) {
      var c = i ? i[h] : {
        value: a[0] + h
      }, v = s(c, h), f = o.getTextRect(v), d = OA(f, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function OA(e, t) {
  var r = t * Math.PI / 180, i = e.width, n = e.height, a = i * Math.abs(Math.cos(r)) + Math.abs(n * Math.sin(r)), o = i * Math.abs(Math.sin(r)) + Math.abs(n * Math.cos(r)), s = new lt(e.x, e.y, a, o);
  return s;
}
function Mf(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function e0(e) {
  return e.type === "category" && Mf(e.getLabelModel()) === 0;
}
function EA(e, t) {
  var r = {};
  return C(e.mapDimensionsAll(t), function(i) {
    r[QD(e, i)] = !0;
  }), gt(r);
}
var kA = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getNeedCrossZero = function() {
      var t = this.option;
      return !t.scale;
    }, e.prototype.getCoordSysModel = function() {
    }, e;
  }()
), Lp = [], NA = {
  registerPreprocessor: N_,
  registerProcessor: B_,
  registerPostInit: CD,
  registerPostUpdate: MD,
  registerUpdateLifecycle: bf,
  registerAction: Hn,
  registerCoordinateSystem: DD,
  registerLayout: AD,
  registerVisual: ki,
  registerTransform: LD,
  registerLoading: z_,
  registerMap: ID,
  registerImpl: aD,
  PRIORITY: mD,
  ComponentModel: ht,
  ComponentView: Oe,
  SeriesModel: Re,
  ChartView: be,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    ht.registerClass(e);
  },
  registerComponentView: function(e) {
    Oe.registerClass(e);
  },
  registerSeriesModel: function(e) {
    Re.registerClass(e);
  },
  registerChartView: function(e) {
    be.registerClass(e);
  },
  registerSubTypeDefaulter: function(e, t) {
    ht.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    Nw(e, t);
  }
};
function je(e) {
  if (z(e)) {
    C(e, function(t) {
      je(t);
    });
    return;
  }
  vt(Lp, e) >= 0 || (Lp.push(e), Z(e) && (e = {
    install: e
  }), e.install(NA));
}
var Ja = It();
function r0(e, t) {
  var r = U(t, function(i) {
    return e.scale.parse(i);
  });
  return e.type === "time" && r.length > 0 && (r.sort(), r.unshift(r[0]), r.push(r[r.length - 1])), r;
}
function BA(e) {
  var t = e.getLabelModel().get("customValues");
  if (t) {
    var r = Gn(e), i = e.scale.getExtent(), n = r0(e, t), a = Pt(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: U(a, function(o) {
        var s = {
          value: o
        };
        return {
          formattedLabel: r(s),
          rawLabel: e.scale.getLabel(s),
          tickValue: o
        };
      })
    };
  }
  return e.type === "category" ? FA(e) : VA(e);
}
function zA(e, t) {
  var r = e.getTickModel().get("customValues");
  if (r) {
    var i = e.scale.getExtent(), n = r0(e, r);
    return {
      ticks: Pt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return e.type === "category" ? HA(e, t) : {
    ticks: U(e.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function FA(e) {
  var t = e.getLabelModel(), r = i0(e, t);
  return !t.get("show") || e.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: r.labelCategoryInterval
  } : r;
}
function i0(e, t) {
  var r = n0(e, "labels"), i = Mf(t), n = a0(r, i);
  if (n)
    return n;
  var a, o;
  return Z(i) ? a = l0(e, i) : (o = i === "auto" ? GA(e) : i, a = s0(e, o)), o0(r, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function HA(e, t) {
  var r = n0(e, "ticks"), i = Mf(t), n = a0(r, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || e.scale.isBlank()) && (a = []), Z(i))
    a = l0(e, i, !0);
  else if (i === "auto") {
    var s = i0(e, e.getLabelModel());
    o = s.labelCategoryInterval, a = U(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = s0(e, o, !0);
  return o0(r, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function VA(e) {
  var t = e.scale.getTicks(), r = Gn(e);
  return {
    labels: U(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: r(i, n),
        rawLabel: e.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function n0(e, t) {
  return Ja(e)[t] || (Ja(e)[t] = []);
}
function a0(e, t) {
  for (var r = 0; r < e.length; r++)
    if (e[r].key === t)
      return e[r].value;
}
function o0(e, t, r) {
  return e.push({
    key: t,
    value: r
  }), r;
}
function GA(e) {
  var t = Ja(e).autoInterval;
  return t ?? (Ja(e).autoInterval = e.calculateCategoryInterval());
}
function WA(e) {
  var t = UA(e), r = Gn(e), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = e.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = e.dataToCoord(l + 1) - e.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), v = 0, f = 0; l <= a[1]; l += s) {
    var d = 0, g = 0, p = Bc(r({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, g = p.height * 1.3, v = Math.max(v, d, 7), f = Math.max(f, g, 7);
  }
  var y = v / h, m = f / c;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = Ja(e.model), S = e.getExtent(), w = b.lastAutoInterval, x = b.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && b.axisExtent0 === S[0] && b.axisExtent1 === S[1] ? _ = w : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = S[0], b.axisExtent1 = S[1]), _;
}
function UA(e) {
  var t = e.getLabelModel();
  return {
    axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function s0(e, t, r) {
  var i = Gn(e), n = e.scale, a = n.getExtent(), o = e.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = n.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var c = e0(e), v = o.get("showMinLabel") || c, f = o.get("showMaxLabel") || c;
  v && u !== a[0] && g(a[0]);
  for (var d = u; d <= a[1]; d += l)
    g(d);
  f && d - l !== a[1] && g(a[1]);
  function g(p) {
    var y = {
      value: p
    };
    s.push(r ? p : {
      formattedLabel: i(y),
      rawLabel: n.getLabel(y),
      tickValue: p
    });
  }
  return s;
}
function l0(e, t, r) {
  var i = e.scale, n = Gn(e), a = [];
  return C(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(r ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Pp = [0, 1], YA = (
  /** @class */
  function() {
    function e(t, r, i) {
      this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = r, this._extent = i || [0, 0];
    }
    return e.prototype.contain = function(t) {
      var r = this._extent, i = Math.min(r[0], r[1]), n = Math.max(r[0], r[1]);
      return t >= i && t <= n;
    }, e.prototype.containData = function(t) {
      return this.scale.contain(t);
    }, e.prototype.getExtent = function() {
      return this._extent.slice();
    }, e.prototype.getPixelPrecision = function(t) {
      return Fw(t || this.scale.getExtent(), this._extent);
    }, e.prototype.setExtent = function(t, r) {
      var i = this._extent;
      i[0] = t, i[1] = r;
    }, e.prototype.dataToCoord = function(t, r) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), $p(i, n.count())), dr(t, Pp, i, r);
    }, e.prototype.coordToData = function(t, r) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), $p(i, n.count()));
      var a = dr(t, i, Pp, r);
      return this.scale.scale(a);
    }, e.prototype.pointToData = function(t, r) {
    }, e.prototype.getTicksCoords = function(t) {
      t = t || {};
      var r = t.tickModel || this.getTickModel(), i = zA(this, r), n = i.ticks, a = U(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = r.get("alignWithLabel");
      return XA(this, a, o, t.clamp), a;
    }, e.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), r = t.get("splitNumber");
      r > 0 && r < 100 || (r = 5);
      var i = this.scale.getMinorTicks(r), n = U(i, function(a) {
        return U(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, e.prototype.getViewLabels = function() {
      return BA(this).labels;
    }, e.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, e.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, e.prototype.getBandWidth = function() {
      var t = this._extent, r = this.scale.getExtent(), i = r[1] - r[0] + (this.onBand ? 1 : 0);
      i === 0 && (i = 1);
      var n = Math.abs(t[1] - t[0]);
      return Math.abs(n) / i;
    }, e.prototype.calculateCategoryInterval = function() {
      return WA(this);
    }, e;
  }()
);
function $p(e, t) {
  var r = e[1] - e[0], i = t, n = r / i / 2;
  e[0] += n, e[1] -= n;
}
function XA(e, t, r, i) {
  var n = t.length;
  if (!e.onBand || r || !n)
    return;
  var a = e.getExtent(), o, s;
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
    var h = e.scale.getExtent();
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
function qA(e) {
  for (var t = [], r = 0; r < e.length; r++) {
    var i = e[r];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new zs(o, a) : null;
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
function ZA(e) {
  var t = [];
  e.sort(function(g, p) {
    return p.priority - g.priority;
  });
  var r = new lt(0, 0, 0, 0);
  function i(g) {
    if (!g.ignore) {
      var p = g.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    g.ignore = !0;
  }
  for (var n = 0; n < e.length; n++) {
    var a = e[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, h = a.labelLine;
    r.copy(a.rect), r.width -= 0.1, r.height -= 0.1, r.x += 0.05, r.y += 0.05;
    for (var c = a.obb, v = !1, f = 0; f < t.length; f++) {
      var d = t[f];
      if (r.intersect(d.rect)) {
        if (o && d.axisAligned) {
          v = !0;
          break;
        }
        if (d.obb || (d.obb = new zs(d.localRect, d.transform)), c || (c = new zs(s, l)), c.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), h && i(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var KA = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.hasSymbolVisual = !0, r;
    }
    return t.prototype.getInitialData = function(r) {
      return Ll(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(r) {
      var i = new Ct(), n = yr("line", 0, r.itemHeight / 2, r.itemWidth, 0, r.lineStyle.stroke, !1);
      i.add(n), n.setStyle(r.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = r.itemHeight * 0.8, u = yr(s, (r.itemWidth - l) / 2, (r.itemHeight - l) / 2, l, l, r.itemStyle.fill);
      i.add(u), u.setStyle(r.itemStyle);
      var h = r.iconRotate === "inherit" ? o : r.iconRotate || 0;
      return u.rotation = h * Math.PI / 180, u.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), i;
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
function Df(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel"), i = r.length;
  if (i === 1) {
    var n = Pn(e, t, r[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < r.length; o++)
      a.push(Pn(e, t, r[o]));
    return a.join(" ");
  }
}
function u0(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel");
  if (!z(t))
    return t + "";
  for (var i = [], n = 0; n < r.length; n++) {
    var a = e.getDimensionIndex(r[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Af = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, i, n, a) {
      var o = e.call(this) || this;
      return o.updateData(r, i, n, a), o;
    }
    return t.prototype._createSymbol = function(r, i, n, a, o) {
      this.removeAll();
      var s = yr(r, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = jA, this._symbolType = r, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(r) {
      this.childAt(0).stopAnimation(null, r);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Ns(this.childAt(0));
    }, t.prototype.downplay = function() {
      Bs(this.childAt(0));
    }, t.prototype.setZ = function(r, i) {
      var n = this.childAt(0);
      n.zlevel = r, n.z = i;
    }, t.prototype.setDraggable = function(r, i) {
      var n = this.childAt(0);
      n.draggable = r, n.cursor = !i && r ? "move" : n.cursor;
    }, t.prototype.updateData = function(r, i, n, a) {
      this.silent = !1;
      var o = r.getItemVisual(i, "symbol") || "circle", s = r.hostModel, l = t.getSymbolSize(r, i), u = o !== this._symbolType, h = a && a.disableAnimation;
      if (u) {
        var c = r.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, r, i, l, c);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var f = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        h ? v.attr(f) : se(v, f, s, i), fm(v);
      }
      if (this._updateCommon(r, i, l, n, a), u) {
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
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, gr(v, f, s, i);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(r, i, n, a, o) {
      var s = this.childAt(0), l = r.hostModel, u, h, c, v, f, d, g, p, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, c = a.selectItemStyle, v = a.focus, f = a.blurScope, g = a.labelStatesModels, p = a.hoverScale, y = a.cursorStyle, d = a.emphasisDisabled), !a || r.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : r.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), c = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), f = _.get("blurScope"), d = _.get("disabled"), g = An(m), p = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = r.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var S = g_(r.getItemVisual(i, "symbolOffset"), n);
      S && (s.x = S[0], s.y = S[1]), y && s.attr("cursor", y);
      var w = r.getItemVisual(i, "style"), x = w.fill;
      if (s instanceof rr) {
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
      var D = r.getItemVisual(i, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      co(s, g, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: I,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function I(R) {
        return T ? r.getName(R) : Df(r, R);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var P = s.ensureState("emphasis");
      P.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = h;
      var $ = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      P.scaleX = this._sizeX * $, P.scaleY = this._sizeY * $, this.setSymbolScale(1), Ua(this, v, f, d);
    }, t.prototype.setSymbolScale = function(r) {
      this.scaleX = this.scaleY = r;
    }, t.prototype.fadeOut = function(r, i, n) {
      var a = this.childAt(0), o = ot(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Fs(l, {
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
      Fs(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, i, {
        dataIndex: o,
        cb: r,
        removeOpt: s
      });
    }, t.getSymbolSize = function(r, i) {
      return VM(r.getItemVisual(i, "symbolSize"));
    }, t;
  }(Ct)
);
function jA(e, t) {
  this.parent.drift(e, t);
}
function Xu(e, t, r, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(r)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && e.getItemVisual(r, "symbol") !== "none";
}
function Rp(e) {
  return e != null && !V(e) && (e = {
    isIgnore: e
  }), e || {};
}
function Op(e) {
  var t = e.hostModel, r = t.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: An(t),
    cursorStyle: t.get("cursor")
  };
}
var QA = (
  /** @class */
  function() {
    function e(t) {
      this.group = new Ct(), this._SymbolCtor = t || Af;
    }
    return e.prototype.updateData = function(t, r) {
      this._progressiveEls = null, r = Rp(r);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = r.disableAnimation, l = Op(t), u = {
        disableAnimation: s
      }, h = r.getSymbolPoint || function(c) {
        return t.getItemLayout(c);
      };
      a || i.removeAll(), t.diff(a).add(function(c) {
        var v = h(c);
        if (Xu(t, v, c, r)) {
          var f = new o(t, c, l, u);
          f.setPosition(v), t.setItemGraphicEl(c, f), i.add(f);
        }
      }).update(function(c, v) {
        var f = a.getItemGraphicEl(v), d = h(c);
        if (!Xu(t, d, c, r)) {
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
    }, e.prototype.updateLayout = function() {
      var t = this, r = this._data;
      r && r.eachItemGraphicEl(function(i, n) {
        var a = t._getSymbolPoint(n);
        i.setPosition(a), i.markRedraw();
      });
    }, e.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = Op(t), this._data = null, this.group.removeAll();
    }, e.prototype.incrementalUpdate = function(t, r, i) {
      this._progressiveEls = [], i = Rp(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = r.getItemLayout(a);
        if (Xu(r, o, a, i)) {
          var s = new this._SymbolCtor(r, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), r.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, e.prototype.eachRendered = function(t) {
      ho(this._progressiveEls || this.group, t);
    }, e.prototype.remove = function(t) {
      var r = this.group, i = this._data;
      i && t ? i.eachItemGraphicEl(function(n) {
        n.fadeOut(function() {
          r.remove(n);
        }, i.hostModel);
      }) : r.removeAll();
    }, e;
  }()
);
function h0(e, t, r) {
  var i = e.getBaseAxis(), n = e.getOtherAxis(i), a = JA(n, r), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, c = U(e.dimensions, function(d) {
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
function JA(e, t) {
  var r = 0, i = e.scale.getExtent();
  return t === "start" ? r = i[0] : t === "end" ? r = i[1] : yt(t) && !isNaN(t) ? r = t : i[0] > 0 ? r = i[0] : i[1] < 0 && (r = i[1]), r;
}
function c0(e, t, r, i) {
  var n = NaN;
  e.stacked && (n = r.get(r.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = e.valueStart);
  var a = e.baseDataOffset, o = [];
  return o[a] = r.get(e.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function t2(e, t) {
  var r = [];
  return t.diff(e).add(function(i) {
    r.push({
      cmd: "+",
      idx: i
    });
  }).update(function(i, n) {
    r.push({
      cmd: "=",
      idx: n,
      idx1: i
    });
  }).remove(function(i) {
    r.push({
      cmd: "-",
      idx: i
    });
  }).execute(), r;
}
function e2(e, t, r, i, n, a, o, s) {
  for (var l = t2(e, t), u = [], h = [], c = [], v = [], f = [], d = [], g = [], p = h0(n, t, o), y = e.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], S = !0, w = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        w = b.idx * 2, x = b.idx1 * 2;
        var M = y[w], D = y[w + 1], A = m[x], T = m[x + 1];
        (isNaN(M) || isNaN(D)) && (M = A, D = T), u.push(M, D), h.push(A, T), c.push(r[w], r[w + 1]), v.push(i[x], i[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var I = b.idx, P = p.dataDimsForPoint, $ = n.dataToPoint([t.get(P[0], I), t.get(P[1], I)]);
        x = I * 2, u.push($[0], $[1]), h.push(m[x], m[x + 1]);
        var R = c0(p, n, t, I);
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
  for (var O = u.length, G = ur(O), E = ur(O), F = ur(O), W = ur(O), j = [], _ = 0; _ < d.length; _++) {
    var et = d[_], ft = _ * 2, mt = et * 2;
    G[ft] = u[mt], G[ft + 1] = u[mt + 1], E[ft] = h[mt], E[ft + 1] = h[mt + 1], F[ft] = c[mt], F[ft + 1] = c[mt + 1], W[ft] = v[mt], W[ft + 1] = v[mt + 1], j[_] = f[et];
  }
  return {
    current: G,
    next: E,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: j
  };
}
var $r = Math.min, Rr = Math.max;
function Ai(e, t) {
  return isNaN(e) || isNaN(t);
}
function nc(e, t, r, i, n, a, o, s, l) {
  for (var u, h, c, v, f, d, g = r, p = 0; p < i; p++) {
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
    if (g === r)
      e[a > 0 ? "moveTo" : "lineTo"](y, m), c = y, v = m;
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
            var j = T > 0 ? 1 : -1;
            f = y, d = m - j * E * o, I = y, P = m + j * F * o;
          } else
            E = Math.sqrt($ * $ + O * O), F = Math.sqrt(R * R + G * G), D = F / (F + E), f = y - A * o * (1 - D), d = m - T * o * (1 - D), I = y + A * o * D, P = m + T * o * D, I = $r(I, Rr(w, y)), P = $r(P, Rr(x, m)), I = Rr(I, $r(w, y)), P = Rr(P, $r(x, m)), A = I - y, T = P - m, f = y - A * E / F, d = m - T * E / F, f = $r(f, Rr(u, y)), d = $r(d, Rr(h, m)), f = Rr(f, $r(u, y)), d = Rr(d, $r(h, m)), A = y - f, T = m - d, I = y + A * F / E, P = m + T * F / E;
        }
        e.bezierCurveTo(c, v, f, d, y, m), c = I, v = P;
      } else
        e.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return p;
}
var f0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return e;
  }()
), r2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      return i.type = "ec-polyline", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new f0();
    }, t.prototype.buildPath = function(r, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && Ai(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && Ai(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += nc(r, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(r, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = Ri.CMD, s, l, u = i === "x", h = [], c = 0; c < a.length; ) {
        var v = a[c++], f = void 0, d = void 0, g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (f = a[c++], d = a[c++], _ = u ? (r - s) / (f - s) : (r - l) / (d - l), _ <= 1 && _ >= 0) {
              var b = u ? (d - l) * _ + l : (f - s) * _ + s;
              return u ? [r, b] : [b, r];
            }
            s = f, l = d;
            break;
          case o.C:
            f = a[c++], d = a[c++], g = a[c++], p = a[c++], y = a[c++], m = a[c++];
            var S = u ? As(s, f, g, y, r, h) : As(l, d, p, m, r, h);
            if (S > 0)
              for (var w = 0; w < S; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var b = u ? $t(l, d, p, m, x) : $t(s, f, g, y, x);
                  return u ? [r, b] : [b, r];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(ct)
), i2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(f0)
), n2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new i2();
    }, t.prototype.buildPath = function(r, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && Ai(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && Ai(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = nc(r, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        nc(r, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, r.closePath();
      }
    }, t;
  }(ct)
);
function v0(e, t, r, i, n) {
  var a = e.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = r.get(["lineStyle", "width"]) || 0;
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
    var v = e.getBaseAxis(), f = v.isHorizontal(), d = v.inverse;
    f ? (d && (c.shape.x += l), c.shape.width = 0) : (d || (c.shape.y += u), c.shape.height = 0);
    var g = Z(n) ? function(p) {
      n(p, c);
    } : null;
    gr(c, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, r, null, i, g);
  }
  return c;
}
function d0(e, t, r) {
  var i = e.getArea(), n = Mt(i.r0, 1), a = Mt(i.r, 1), o = new zn({
    shape: {
      cx: Mt(e.cx, 1),
      cy: Mt(e.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = e.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, gr(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, r);
  }
  return o;
}
function a2(e, t, r, i, n) {
  if (e) {
    if (e.type === "polar")
      return d0(e, t, r);
    if (e.type === "cartesian2d")
      return v0(e, t, r, i, n);
  } else return null;
  return null;
}
function Ol(e, t) {
  return e.type === t;
}
function Ep(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return;
    return !0;
  }
}
function kp(e) {
  for (var t = 1 / 0, r = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < e.length; ) {
    var o = e[a++], s = e[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (r = Math.min(s, r), n = Math.max(s, n));
  }
  return [[t, r], [i, n]];
}
function Np(e, t) {
  var r = kp(e), i = r[0], n = r[1], a = kp(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function Bp(e) {
  return yt(e) ? e : e ? 0.5 : 0;
}
function o2(e, t, r) {
  if (!r.valueDim)
    return [];
  for (var i = t.count(), n = ur(i * 2), a = 0; a < i; a++) {
    var o = c0(r, e, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function Or(e, t, r, i, n) {
  var a = r.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], h = [], c = [], v = [];
  if (n) {
    for (l = 0; l < e.length; l += 2) {
      var f = t || e;
      !isNaN(f[l]) && !isNaN(f[l + 1]) && v.push(e[l], e[l + 1]);
    }
    e = v;
  }
  for (l = 0; l < e.length - 2; l += 2)
    switch (c[0] = e[l + 2], c[1] = e[l + 3], h[0] = e[l], h[1] = e[l + 1], s.push(h[0], h[1]), i) {
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
  return s.push(e[l++], e[l++]), s;
}
function s2(e, t) {
  var r = [], i = e.length, n, a;
  function o(h, c, v) {
    var f = h.coord, d = (v - f) / (c.coord - f), g = uw(d, [h.color, c.color]);
    return {
      coord: v,
      color: g
    };
  }
  for (var s = 0; s < i; s++) {
    var l = e[s], u = l.coord;
    if (u < 0)
      n = l;
    else if (u > t) {
      a ? r.push(o(a, l, t)) : n && r.push(o(n, l, 0), o(n, l, t));
      break;
    } else
      n && (r.push(o(n, l, 0)), n = null), r.push(l), a = l;
  }
  return r;
}
function l2(e, t, r) {
  var i = e.getVisual("visualMeta");
  if (!(!i || !i.length || !e.count()) && t.type === "cartesian2d") {
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = e.getDimensionInfo(i[o].dimension);
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
      var v = s2(u, n === "x" ? r.getWidth() : r.getHeight()), f = v.length;
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
      var m = new Jc(0, 0, 0, 0, v, !0);
      return m[n] = g, m[n + "2"] = p, m;
    }
  }
}
function u2(e, t, r) {
  var i = e.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (a && !(n && h2(a, t))) {
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
function h2(e, t) {
  var r = e.getExtent(), i = Math.abs(r[1] - r[0]) / e.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (Af.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[e.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function c2(e, t) {
  return isNaN(e) || isNaN(t);
}
function f2(e) {
  for (var t = e.length / 2; t > 0 && c2(e[t * 2 - 2], e[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function zp(e, t) {
  return [e[t * 2], e[t * 2 + 1]];
}
function v2(e, t, r) {
  for (var i = e.length / 2, n = r === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < i; u++)
    if (o = e[u * 2 + n], !(isNaN(o) || isNaN(e[u * 2 + 1 - n]))) {
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
function p0(e) {
  if (e.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Ke.length; t++)
    if (e.get([Ke[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function qu(e, t, r, i) {
  if (Ol(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = p0(i) ? function(f, d) {
      e._endLabelOnDuring(f, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = v0(t, r, i, function() {
      var f = e._endLabel;
      f && r && s.originalX != null && f.attr({
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
    return d0(t, r, i);
}
function d2(e, t) {
  var r = t.getBaseAxis(), i = r.isHorizontal(), n = r.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: e.get("align") || a,
      verticalAlign: e.get("verticalAlign") || o
    }
  };
}
var p2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var r = new Ct(), i = new QA();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = r, this._changePolyState = J(this._changePolyState, this);
    }, t.prototype.render = function(r, i, n) {
      var a = r.coordinateSystem, o = this.group, s = r.getData(), l = r.getModel("lineStyle"), u = r.getModel("areaStyle"), h = s.getLayout("points") || [], c = a.type === "polar", v = this._coordSys, f = this._symbolDraw, d = this._polyline, g = this._polygon, p = this._lineGroup, y = !i.ssr && r.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = h0(a, s, _), S = m && o2(a, s, b), w = r.get("showSymbol"), x = r.get("connectNulls"), M = w && !c && u2(r, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(St, xe) {
        St.__temp && (o.remove(St), D.setItemGraphicEl(xe, null));
      }), w || f.remove(), o.add(p);
      var A = c ? !1 : r.get("step"), T;
      a && a.getArea && r.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var I = l2(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && A === this._step))
        w && f.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(St) {
            return [h[St * 2], h[St * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (S && (S = Or(S, h, a, A, x)), h = Or(h, null, a, A, x)), d = this._newPolyline(h), m ? g = this._newPolygon(h, S) : g && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Oi(I)), p.setClipPath(qu(this, a, !0, r));
      else {
        m && !g ? g = this._newPolygon(h, S) : g && !m && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Oi(I));
        var P = p.getClipPath();
        if (P) {
          var $ = qu(this, a, !1, r);
          gr(P, {
            shape: $.shape
          }, r);
        } else
          p.setClipPath(qu(this, a, !0, r));
        w && f.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(St) {
            return [h[St * 2], h[St * 2 + 1]];
          }
        }), (!Ep(this._stackedOnPoints, S) || !Ep(this._points, h)) && (y ? this._doUpdateAnimation(s, S, a, n, A, _, x) : (A && (S && (S = Or(S, h, a, A, x)), h = Or(h, null, a, A, x)), d.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: S
        })));
      }
      var R = r.getModel("emphasis"), O = R.get("focus"), G = R.get("blurScope"), E = R.get("disabled");
      if (d.useStyle(ut(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: I,
          lineJoin: "bevel"
        }
      )), Eh(d, r, "lineStyle"), d.style.lineWidth > 0 && r.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = d.getState("emphasis").style;
        F.lineWidth = +d.style.lineWidth + 1;
      }
      ot(d).seriesIndex = r.seriesIndex, Ua(d, O, G, E);
      var W = Bp(r.get("smooth")), j = r.get("smoothMonotone");
      if (d.setShape({
        smooth: W,
        smoothMonotone: j,
        connectNulls: x
      }), g) {
        var et = s.getCalculationInfo("stackedOnSeries"), ft = 0;
        g.useStyle(ut(u.getAreaStyle(), {
          fill: I,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), et && (ft = Bp(et.get("smooth"))), g.setShape({
          smooth: W,
          stackedOnSmooth: ft,
          smoothMonotone: j,
          connectNulls: x
        }), Eh(g, r, "areaStyle"), ot(g).seriesIndex = r.seriesIndex, Ua(g, O, G, E);
      }
      var mt = this._changePolyState;
      s.eachItemGraphicEl(function(St) {
        St && (St.onHoverStateChange = mt);
      }), this._polyline.onHoverStateChange = mt, this._data = s, this._coordSys = a, this._stackedOnPoints = S, this._points = h, this._step = A, this._valueOrigin = _, r.get("triggerLineEvent") && (this.packEventData(r, d), g && this.packEventData(r, g));
    }, t.prototype.packEventData = function(r, i) {
      ot(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: r.componentIndex,
        seriesIndex: r.seriesIndex,
        seriesName: r.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(r, i, n, a) {
      var o = r.getData(), s = $i(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], c = l[s * 2 + 1];
          if (isNaN(h) || isNaN(c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, c))
            return;
          var v = r.get("zlevel") || 0, f = r.get("z") || 0;
          u = new Af(o, s), u.x = h, u.y = c, u.setZ(v, f);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = v, d.z = f, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        be.prototype.highlight.call(this, r, i, n, a);
    }, t.prototype.downplay = function(r, i, n, a) {
      var o = r.getData(), s = $i(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        be.prototype.downplay.call(this, r, i, n, a);
    }, t.prototype._changePolyState = function(r) {
      var i = this._polygon;
      Kv(this._polyline, r), i && Kv(i, r);
    }, t.prototype._newPolyline = function(r) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new r2({
        shape: {
          points: r
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(r, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new n2({
        shape: {
          points: r,
          stackedOnPoints: i
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function(r, i, n) {
      var a, o, s = i.getBaseAxis(), l = s.inverse;
      i.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : i.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = r.hostModel, h = u.get("animationDuration");
      Z(h) && (h = h(null));
      var c = u.get("animationDelay") || 0, v = Z(c) ? c(null) : c;
      r.eachItemGraphicEl(function(f, d) {
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
          var M = Z(c) ? c(d) : h * x + v, D = g.getSymbolPath(), A = D.getTextContent();
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
    }, t.prototype._initOrUpdateEndLabel = function(r, i, n) {
      var a = r.getModel("endLabel");
      if (p0(r)) {
        var o = r.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new At({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = f2(l);
        h >= 0 && (co(s, An(r, "endLabel"), {
          inheritColor: n,
          labelFetcher: r,
          labelDataIndex: h,
          defaultText: function(c, v, f) {
            return f != null ? u0(o, f) : Df(o, c);
          },
          enableTextSetter: !0
        }, d2(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(r, i, n, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        r < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = n.getLayout("points"), v = n.hostModel, f = v.get("connectNulls"), d = s.get("precision"), g = s.get("distance") || 0, p = l.getBaseAxis(), y = p.isHorizontal(), m = p.inverse, _ = i.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, S = (y ? g : 0) * (m ? -1 : 1), w = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", M = v2(c, b, x), D = M.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !f) {
            var I = zp(c, D[0]);
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
            o && (T = oS(n, d, P, $, M.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = r === 1 || a.lastFrameIndex > 0 ? D[0] : 0, I = zp(c, R);
          o && (T = v.getRawValue(R)), u.attr({
            x: I[0] + S,
            y: I[1] + w
          });
        }
        if (o) {
          var O = yl(u);
          typeof O.setLabelText == "function" && O.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(r, i, n, a, o, s, l) {
      var u = this._polyline, h = this._polygon, c = r.hostModel, v = e2(this._data, r, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), f = v.current, d = v.stackedOnCurrent, g = v.next, p = v.stackedOnNext;
      if (o && (d = Or(v.stackedOnCurrent, v.current, n, o, l), f = Or(v.current, null, n, o, l), p = Or(v.stackedOnNext, v.next, n, o, l), g = Or(v.next, null, n, o, l)), Np(f, g) > 3e3 || h && Np(d, p) > 3e3) {
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
          var w = r.getItemGraphicEl(_[b].idx1);
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
    }, t.prototype.remove = function(r) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(be)
);
function g2(e, t) {
  return {
    seriesType: e,
    plan: pf(),
    reset: function(r) {
      var i = r.getData(), n = r.coordinateSystem;
      if (r.pipelineContext, !!n) {
        var a = U(n.dimensions, function(c) {
          return i.mapDimension(c);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        $n(i, a[0]) && (a[0] = s), $n(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), h = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(c, v) {
            for (var f = c.end - c.start, d = ur(f * o), g = [], p = [], y = c.start, m = 0; y < c.end; y++) {
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
var y2 = {
  average: function(e) {
    for (var t = 0, r = 0, i = 0; i < e.length; i++)
      isNaN(e[i]) || (t += e[i], r++);
    return r === 0 ? NaN : t / r;
  },
  sum: function(e) {
    for (var t = 0, r = 0; r < e.length; r++)
      t += e[r] || 0;
    return t;
  },
  max: function(e) {
    for (var t = -1 / 0, r = 0; r < e.length; r++)
      e[r] > t && (t = e[r]);
    return isFinite(t) ? t : NaN;
  },
  min: function(e) {
    for (var t = 1 / 0, r = 0; r < e.length; r++)
      e[r] < t && (t = e[r]);
    return isFinite(t) ? t : NaN;
  },
  // TODO
  // Median
  nearest: function(e) {
    return e[0];
  }
}, m2 = function(e) {
  return Math.round(e.length / 2);
};
function g0(e) {
  return {
    seriesType: e,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, r, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), h = l.getExtent(), c = i.getDevicePixelRatio(), v = Math.abs(h[1] - h[0]) * (c || 1), f = Math.round(s / v);
        if (isFinite(f) && f > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / f)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / f));
          var d = void 0;
          H(a) ? d = y2[a] : Z(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / f, d, m2));
        }
      }
    }
  };
}
function _2(e) {
  e.registerChartView(p2), e.registerSeriesModel(KA), e.registerLayout(g2("line")), e.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var r = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = r.getVisual("style").fill), r.setVisual("legendLineStyle", i);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, g0("line"));
}
var ac = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, i) {
      return Ll(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(r, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(r), s = a.dataToPoint(o);
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
Re.registerClass(ac);
var b2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function() {
      return Ll(null, this, {
        useEncodeDefaulter: !0,
        createInvertedIndices: !!this.get("realtimeSort", !0) || null
      });
    }, t.prototype.getProgressive = function() {
      return this.get("large") ? this.get("progressive") : !1;
    }, t.prototype.getProgressiveThreshold = function() {
      var r = this.get("progressiveThreshold"), i = this.get("largeThreshold");
      return i > r && (r = i), r;
    }, t.prototype.brushSelector = function(r, i, n) {
      return n.rect(i.getItemLayout(r));
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = _l(ac.defaultOption, {
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
  }(ac)
), w2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return e;
  }()
), Fp = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new w2();
    }, t.prototype.buildPath = function(r, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, h = i.startAngle, c = i.endAngle, v = i.clockwise, f = Math.PI * 2, d = v ? c - h < f : h - c < f;
      d || (h = c - (v ? f : -f));
      var g = Math.cos(h), p = Math.sin(h), y = Math.cos(c), m = Math.sin(c);
      d ? (r.moveTo(g * o + n, p * o + a), r.arc(g * u + n, p * u + a, l, -Math.PI + h, h, !v)) : r.moveTo(g * s + n, p * s + a), r.arc(n, a, s, h, c, !v), r.arc(y * u + n, m * u + a, l, c - Math.PI * 2, c - Math.PI, !v), o !== 0 && r.arc(n, a, o, c, h, v);
    }, t;
  }(ct)
);
function S2(e, t) {
  t = t || {};
  var r = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return Rs(i, n, a);
    var s = e(o), l = n.distance != null ? n.distance : 5, u = this.shape, h = u.cx, c = u.cy, v = u.r, f = u.r0, d = (v + f) / 2, g = u.startAngle, p = u.endAngle, y = (g + p) / 2, m = r ? Math.abs(v - f) / 2 : 0, _ = Math.cos, b = Math.sin, S = h + v * _(g), w = c + v * b(g), x = "left", M = "top";
    switch (s) {
      case "startArc":
        S = h + (f - l) * _(y), w = c + (f - l) * b(y), x = "center", M = "top";
        break;
      case "insideStartArc":
        S = h + (f + l) * _(y), w = c + (f + l) * b(y), x = "center", M = "bottom";
        break;
      case "startAngle":
        S = h + d * _(g) + Ko(g, l + m, !1), w = c + d * b(g) + jo(g, l + m, !1), x = "right", M = "middle";
        break;
      case "insideStartAngle":
        S = h + d * _(g) + Ko(g, -l + m, !1), w = c + d * b(g) + jo(g, -l + m, !1), x = "left", M = "middle";
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
        S = h + d * _(p) + Ko(p, l + m, !0), w = c + d * b(p) + jo(p, l + m, !0), x = "left", M = "middle";
        break;
      case "insideEndAngle":
        S = h + d * _(p) + Ko(p, -l + m, !0), w = c + d * b(p) + jo(p, -l + m, !0), x = "right", M = "middle";
        break;
      default:
        return Rs(i, n, a);
    }
    return i = i || {}, i.x = S, i.y = w, i.align = x, i.verticalAlign = M, i;
  };
}
function x2(e, t, r, i) {
  if (yt(i)) {
    e.setTextConfig({
      rotation: i
    });
    return;
  } else if (z(t)) {
    e.setTextConfig({
      rotation: 0
    });
    return;
  }
  var n = e.shape, a = n.clockwise ? n.startAngle : n.endAngle, o = n.clockwise ? n.endAngle : n.startAngle, s = (a + o) / 2, l, u = r(t);
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
      e.setTextConfig({
        rotation: 0
      });
      return;
  }
  var h = Math.PI * 1.5 - l;
  u === "middle" && h > Math.PI / 2 && h < Math.PI * 1.5 && (h -= Math.PI), e.setTextConfig({
    rotation: h
  });
}
function Ko(e, t, r) {
  return t * Math.sin(e) * (r ? -1 : 1);
}
function jo(e, t, r) {
  return t * Math.cos(e) * (r ? 1 : -1);
}
function T2(e, t, r) {
  var i = e.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  z(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: U(i, function(a) {
      return Ze(a, n);
    })
  };
}
var Zu = Math.max, Ku = Math.min;
function C2(e, t) {
  var r = e.getArea && e.getArea();
  if (Ol(e, "cartesian2d")) {
    var i = e.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (r.x -= n, r.width += n * 2) : (r.y -= n, r.height += n * 2);
    }
  }
  return r;
}
var M2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e.call(this) || this;
      return r.type = t.type, r._isFirstFrame = !0, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this._model = r, this._removeOnRenderedListener(n), this._updateDrawMode(r);
      var o = r.get("coordinateSystem");
      (o === "cartesian2d" || o === "polar") && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(r, i, n) : this._renderNormal(r, i, n, a));
    }, t.prototype.incrementalPrepareRender = function(r) {
      this._clear(), this._updateDrawMode(r), this._updateLargeClip(r);
    }, t.prototype.incrementalRender = function(r, i) {
      this._progressiveEls = [], this._incrementalRenderLarge(r, i);
    }, t.prototype.eachRendered = function(r) {
      ho(this._progressiveEls || this.group, r);
    }, t.prototype._updateDrawMode = function(r) {
      var i = r.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(r, i, n, a) {
      var o = this.group, s = r.getData(), l = this._data, u = r.coordinateSystem, h = u.getBaseAxis(), c;
      u.type === "cartesian2d" ? c = h.isHorizontal() : u.type === "polar" && (c = h.dim === "angle");
      var v = r.isAnimationEnabled() ? r : null, f = D2(r, u);
      f && this._enableRealtimeSort(f, s, n);
      var d = r.get("clip", !0) || f, g = C2(u, s);
      o.removeClipPath();
      var p = r.get("roundCap", !0), y = r.get("showBackground", !0), m = r.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], S = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function M(T) {
        var I = Qo[u.type](s, T), P = O2(u, c, I);
        return P.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? P.setShape("r", _) : P.setShape("cornerRadius", _), b[T] = P, P;
      }
      s.diff(l).add(function(T) {
        var I = s.getItemModel(T), P = Qo[u.type](s, T, I);
        if (y && M(T), !(!s.hasValue(T) || !Up[u.type](P))) {
          var $ = !1;
          d && ($ = Hp[u.type](g, P));
          var R = Vp[u.type](r, s, T, P, c, v, h.model, !1, p);
          f && (R.forceLabelAnimation = !0), Yp(R, s, T, I, P, r, c, u.type === "polar"), w ? R.attr({
            shape: P
          }) : f ? Gp(f, v, R, P, T, c, !1, !1) : gr(R, {
            shape: P
          }, r, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = $;
        }
      }).update(function(T, I) {
        var P = s.getItemModel(T), $ = Qo[u.type](s, T, P);
        if (y) {
          var R = void 0;
          S.length === 0 ? R = M(I) : (R = S[I], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), b[T] = R);
          var O = Qo[u.type](s, T), G = m0(c, O, u);
          se(R, {
            shape: G
          }, v, T);
        }
        var E = l.getItemGraphicEl(I);
        if (!s.hasValue(T) || !Up[u.type]($)) {
          o.remove(E);
          return;
        }
        var F = !1;
        if (d && (F = Hp[u.type](g, $), F && o.remove(E)), E ? fm(E) : E = Vp[u.type](r, s, T, $, c, v, h.model, !!E, p), f && (E.forceLabelAnimation = !0), x) {
          var W = E.getTextContent();
          if (W) {
            var j = yl(W);
            j.prevValue != null && (j.prevValue = j.value);
          }
        } else
          Yp(E, s, T, P, $, r, c, u.type === "polar");
        w ? E.attr({
          shape: $
        }) : f ? Gp(f, v, E, $, T, c, !0, x) : se(E, {
          shape: $
        }, r, T, null), s.setItemGraphicEl(T, E), E.ignore = F, o.add(E);
      }).remove(function(T) {
        var I = l.getItemGraphicEl(T);
        I && zh(I, r, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new Ct());
      D.removeAll();
      for (var A = 0; A < b.length; ++A)
        D.add(b[A]);
      o.add(D), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(r, i, n) {
      this._clear(), qp(r, this.group), this._updateLargeClip(r);
    }, t.prototype._incrementalRenderLarge = function(r, i) {
      this._removeBackground(), qp(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(r) {
      var i = r.get("clip", !0) && a2(r.coordinateSystem, !1, r), n = this.group;
      i ? n.setClipPath(i) : n.removeClipPath();
    }, t.prototype._enableRealtimeSort = function(r, i, n) {
      var a = this;
      if (i.count()) {
        var o = r.baseAxis;
        if (this._isFirstFrame)
          this._dispatchInitSort(i, r, n), this._isFirstFrame = !1;
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
    }, t.prototype._dataSort = function(r, i, n) {
      var a = [];
      return r.each(r.mapDimension(i.dim), function(o, s) {
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
    }, t.prototype._isOrderChangedWithinSameData = function(r, i, n) {
      for (var a = n.scale, o = r.mapDimension(n.dim), s = Number.MAX_VALUE, l = 0, u = a.getOrdinalMeta().categories.length; l < u; ++l) {
        var h = r.rawIndexOf(o, a.getRawOrdinalNumber(l)), c = h < 0 ? Number.MIN_VALUE : i(r.indexOfRawIndex(h));
        if (c > s)
          return !0;
        s = c;
      }
      return !1;
    }, t.prototype._isOrderDifferentInView = function(r, i) {
      for (var n = i.scale, a = n.getExtent(), o = Math.max(0, a[0]), s = Math.min(a[1], n.getOrdinalMeta().categories.length - 1); o <= s; ++o)
        if (r.ordinalNumbers[o] !== n.getRawOrdinalNumber(o))
          return !0;
    }, t.prototype._updateSortWithinSameData = function(r, i, n, a) {
      if (this._isOrderChangedWithinSameData(r, i, n)) {
        var o = this._dataSort(r, n, i);
        this._isOrderDifferentInView(o, n) && (this._removeOnRenderedListener(a), a.dispatchAction({
          type: "changeAxisOrder",
          componentType: n.dim + "Axis",
          axisId: n.index,
          sortInfo: o
        }));
      }
    }, t.prototype._dispatchInitSort = function(r, i, n) {
      var a = i.baseAxis, o = this._dataSort(r, a, function(s) {
        return r.get(r.mapDimension(i.otherAxis.dim), s);
      });
      n.dispatchAction({
        type: "changeAxisOrder",
        componentType: a.dim + "Axis",
        isInitSort: !0,
        axisId: a.index,
        sortInfo: o
      });
    }, t.prototype.remove = function(r, i) {
      this._clear(this._model), this._removeOnRenderedListener(i);
    }, t.prototype.dispose = function(r, i) {
      this._removeOnRenderedListener(i);
    }, t.prototype._removeOnRenderedListener = function(r) {
      this._onRendered && (r.getZr().off("rendered", this._onRendered), this._onRendered = null);
    }, t.prototype._clear = function(r) {
      var i = this.group, n = this._data;
      r && r.isAnimationEnabled() && n && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n.eachItemGraphicEl(function(a) {
        zh(a, r, ot(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(be)
), Hp = {
  cartesian2d: function(e, t) {
    var r = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    r < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = e.x + e.width, a = e.y + e.height, o = Zu(t.x, e.x), s = Ku(t.x + t.width, n), l = Zu(t.y, e.y), u = Ku(t.y + t.height, a), h = s < o, c = u < l;
    return t.x = h && o > n ? s : o, t.y = c && l > a ? u : l, t.width = h ? 0 : s - o, t.height = c ? 0 : u - l, r < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), h || c;
  },
  polar: function(e, t) {
    var r = t.r0 <= t.r ? 1 : -1;
    if (r < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = Ku(t.r, e.r), a = Zu(t.r0, e.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (r < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, Vp = {
  cartesian2d: function(e, t, r, i, n, a, o, s, l) {
    var u = new bt({
      shape: N({}, i),
      z2: 1
    });
    if (u.__dataIndex = r, u.name = "item", a) {
      var h = u.shape, c = n ? "height" : "width";
      h[c] = 0;
    }
    return u;
  },
  polar: function(e, t, r, i, n, a, o, s, l) {
    var u = !n && l ? Fp : zn, h = new u({
      shape: i,
      z2: 1
    });
    h.name = "item";
    var c = y0(n);
    if (h.calculateTextPosition = S2(c, {
      isRoundCap: u === Fp
    }), a) {
      var v = h.shape, f = n ? "r" : "endAngle", d = {};
      v[f] = n ? i.r0 : i.startAngle, d[f] = i[f], (s ? se : gr)(h, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function D2(e, t) {
  var r = e.get("realtimeSort", !0), i = t.getBaseAxis();
  if (r && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function Gp(e, t, r, i, n, a, o, s) {
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
  }), s || (o ? se : gr)(r, {
    shape: l
  }, t, n, null);
  var h = t ? e.baseAxis.model : null;
  (o ? se : gr)(r, {
    shape: u
  }, h, n);
}
function Wp(e, t) {
  for (var r = 0; r < t.length; r++)
    if (!isFinite(e[t[r]]))
      return !0;
  return !1;
}
var A2 = ["x", "y", "width", "height"], I2 = ["cx", "cy", "r", "startAngle", "endAngle"], Up = {
  cartesian2d: function(e) {
    return !Wp(e, A2);
  },
  polar: function(e) {
    return !Wp(e, I2);
  }
}, Qo = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(e, t, r) {
    var i = e.getItemLayout(t), n = r ? P2(r, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
    return {
      x: i.x + a * n / 2,
      y: i.y + o * n / 2,
      width: i.width - a * n,
      height: i.height - o * n
    };
  },
  polar: function(e, t, r) {
    var i = e.getItemLayout(t);
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
function L2(e) {
  return e.startAngle != null && e.endAngle != null && e.startAngle === e.endAngle;
}
function y0(e) {
  return /* @__PURE__ */ function(t) {
    var r = t ? "Arc" : "Angle";
    return function(i) {
      switch (i) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return i + r;
        default:
          return i;
      }
    };
  }(e);
}
function Yp(e, t, r, i, n, a, o, s) {
  var l = t.getItemVisual(r, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = e.shape, c = T2(i.getModel("itemStyle"), h);
      N(h, c), e.setShape(h);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    e.setShape("r", u);
  }
  e.useStyle(l);
  var v = i.getShallow("cursor");
  v && e.attr("cursor", v);
  var f = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", d = An(i);
  co(e, d, {
    labelFetcher: a,
    labelDataIndex: r,
    defaultText: Df(a.getData(), r),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: f
  });
  var g = e.getTextContent();
  if (s && g) {
    var p = i.get(["label", "position"]);
    e.textConfig.inside = p === "middle" ? !0 : null, x2(e, p === "outside" ? f : p, y0(o), i.get(["label", "rotate"]));
  }
  bT(g, d, a.getRawValue(r), function(m) {
    return u0(t, m);
  });
  var y = i.getModel(["emphasis"]);
  Ua(e, y.get("focus"), y.get("blurScope"), y.get("disabled")), Eh(e, i), L2(n) && (e.style.fill = "none", e.style.stroke = "none", C(e.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function P2(e, t) {
  var r = e.get(["itemStyle", "borderColor"]);
  if (!r || r === "none")
    return 0;
  var i = e.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var $2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
    }
    return e;
  }()
), Xp = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var i = e.call(this, r) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new $2();
    }, t.prototype.buildPath = function(r, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < n.length; h += 3)
        l[a] = u, l[o] = n[h + 2], s[a] = n[h + a], s[o] = n[h + o], r.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(ct)
);
function qp(e, t, r, i) {
  var n = e.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = e.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new Xp({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), r && r.push(h);
  }
  var c = new Xp({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  c.baseDimIdx = a, c.largeDataIndices = o, c.barWidth = s, t.add(c), c.useStyle(n.getVisual("style")), c.style.stroke = null, ot(c).seriesIndex = e.seriesIndex, e.get("silent") || (c.on("mousedown", Zp), c.on("mousemove", Zp)), r && r.push(c);
}
var Zp = gf(function(e) {
  var t = this, r = R2(t, e.offsetX, e.offsetY);
  ot(t).dataIndex = r >= 0 ? r : null;
}, 30, !1);
function R2(e, t, r) {
  for (var i = e.baseDimIdx, n = 1 - i, a = e.shape.points, o = e.largeDataIndices, s = [], l = [], u = e.barWidth, h = 0, c = a.length / 3; h < c; h++) {
    var v = h * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && r >= s[1] && r <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function m0(e, t, r) {
  if (Ol(r, "cartesian2d")) {
    var i = t, n = r.getArea();
    return {
      x: e ? i.x : n.x,
      y: e ? n.y : i.y,
      width: e ? i.width : n.width,
      height: e ? n.height : i.height
    };
  } else {
    var n = r.getArea(), a = t;
    return {
      cx: n.cx,
      cy: n.cy,
      r0: e ? n.r0 : a.r0,
      r: e ? n.r : a.r,
      startAngle: e ? a.startAngle : 0,
      endAngle: e ? a.endAngle : Math.PI * 2
    };
  }
}
function O2(e, t, r) {
  var i = e.type === "polar" ? zn : bt;
  return new i({
    shape: m0(t, r, e),
    silent: !0,
    z2: 0
  });
}
function E2(e) {
  e.registerChartView(M2), e.registerSeriesModel(b2), e.registerLayout(e.PRIORITY.VISUAL.LAYOUT, Dt(fA, "bar")), e.registerLayout(e.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, vA("bar")), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, g0("bar")), e.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function(t, r) {
    var i = t.componentType || "series";
    r.eachComponent({
      mainType: i,
      query: t
    }, function(n) {
      t.sortInfo && n.axis.setCategorySortInfo(t.sortInfo);
    });
  });
}
var k2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
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
), oc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", Le).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(ht)
);
tr(oc, kA);
var _0 = {
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
}, N2 = nt({
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
}, _0), If = nt({
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
}, _0), B2 = nt({
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
}, If), z2 = ut({
  logBase: 10
}, If);
const F2 = {
  category: N2,
  value: If,
  time: B2,
  log: z2
};
var H2 = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Kp(e, t, r, i) {
  C(H2, function(n, a) {
    var o = nt(nt({}, F2[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, c) {
          var v = qa(this), f = v ? Cl(h) : {}, d = c.getTheme();
          nt(h, d.get(a + "Axis")), nt(h, this.getDefaultOption()), h.type = jp(h), v && Ln(h, f, v);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = rc.createByAxisModel(this));
        }, u.prototype.getCategories = function(h) {
          var c = this.option;
          if (c.type === "category")
            return h ? c.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      }(r)
    );
    e.registerComponentModel(s);
  }), e.registerSubTypeDefaulter(t + "Axis", jp);
}
function jp(e) {
  return e.type || (e.data ? "category" : "value");
}
var V2 = (
  /** @class */
  function() {
    function e(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return e.prototype.getAxis = function(t) {
      return this._axes[t];
    }, e.prototype.getAxes = function() {
      return U(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, e.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), Pt(this.getAxes(), function(r) {
        return r.scale.type === t;
      });
    }, e.prototype.addAxis = function(t) {
      var r = t.dim;
      this._axes[r] = t, this._dimList.push(r);
    }, e;
  }()
), sc = ["x", "y"];
function Qp(e) {
  return e.type === "interval" || e.type === "time";
}
var G2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "cartesian2d", r.dimensions = sc, r;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var r = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Qp(r) || !Qp(i))) {
        var n = r.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, c = (s[1] - o[1]) / u, v = o[0] - n[0] * h, f = o[1] - a[0] * c, d = this._transform = [h, 0, 0, c, v, f];
          this._invTransform = Ec([], d);
        }
      }
    }, t.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function(r) {
      var i = this.getAxis("x"), n = this.getAxis("y");
      return i.contain(i.toLocalCoord(r[0])) && n.contain(n.toLocalCoord(r[1]));
    }, t.prototype.containData = function(r) {
      return this.getAxis("x").containData(r[0]) && this.getAxis("y").containData(r[1]);
    }, t.prototype.containZone = function(r, i) {
      var n = this.dataToPoint(r), a = this.dataToPoint(i), o = this.getArea(), s = new lt(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(r, i, n) {
      n = n || [];
      var a = r[0], o = r[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return me(n, r, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(r, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(r[0]), u = a.parse(r[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(r, i) {
      var n = [];
      if (this._invTransform)
        return me(n, r, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(r[0]), i), n[1] = o.coordToData(o.toLocalCoord(r[1]), i), n;
    }, t.prototype.getOtherAxis = function(r) {
      return this.getAxis(r.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(r) {
      r = r || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - r, o = Math.min(n[0], n[1]) - r, s = Math.max(i[0], i[1]) - a + r, l = Math.max(n[0], n[1]) - o + r;
      return new lt(a, o, s, l);
    }, t;
  }(V2)
), W2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, i, n, a, o) {
      var s = e.call(this, r, i, n) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return t.prototype.isHorizontal = function() {
      var r = this.position;
      return r === "top" || r === "bottom";
    }, t.prototype.getGlobalExtent = function(r) {
      var i = this.getExtent();
      return i[0] = this.toGlobalCoord(i[0]), i[1] = this.toGlobalCoord(i[1]), r && i[0] > i[1] && i.reverse(), i;
    }, t.prototype.pointToData = function(r, i) {
      return this.coordToData(this.toLocalCoord(r[this.dim === "x" ? 0 : 1]), i);
    }, t.prototype.setCategorySortInfo = function(r) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = r, this.scale.setSortInfo(r);
    }, t;
  }(YA)
);
function lc(e, t, r) {
  r = r || {};
  var i = e.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, h = i.getRect(), c = [h.x, h.x + h.width, h.y, h.y + h.height], v = {
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
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Dn(r.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function Jp(e) {
  return e.get("coordinateSystem") === "cartesian2d";
}
function tg(e) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return C(t, function(r, i) {
    var n = i.replace(/Model$/, ""), a = e.getReferringComponents(n, Le).models[0];
    t[i] = a;
  }), t;
}
var ju = Math.log;
function U2(e, t, r) {
  var i = Vn.prototype, n = i.getTicks.call(r), a = i.getTicks.call(r, !0), o = n.length - 1, s = i.getInterval.call(r), l = t0(e, t), u = l.extent, h = l.fixMin, c = l.fixMax;
  if (e.type === "log") {
    var v = ju(e.base);
    u = [ju(u[0]) / v, ju(u[1]) / v];
  }
  e.setExtent(u[0], u[1]), e.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: c
  });
  var f = i.getExtent.call(e);
  h && (u[0] = f[0]), c && (u[1] = f[1]);
  var d = i.getInterval.call(e), g = u[0], p = u[1];
  if (h && c)
    d = (p - g) / o;
  else if (h)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = Yu(d), p = u[0] + d * o;
  else if (c)
    for (g = u[1] - d * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      d = Yu(d), g = u[1] - d * o;
  else {
    var y = e.getTicks().length - 1;
    y > o && (d = Yu(d));
    var m = d * o;
    p = Math.ceil(u[1] / d) * d, g = Mt(p - m), g < 0 && u[0] >= 0 ? (g = 0, p = Mt(m)) : p > 0 && u[1] <= 0 && (p = 0, g = -Mt(m));
  }
  var _ = (n[0].value - a[0].value) / s, b = (n[o].value - a[o].value) / s;
  i.setExtent.call(e, g + d * _, p + d * b), i.setInterval.call(e, d), (_ || b) && i.setNiceExtent.call(e, g + d, p - d);
}
var Y2 = (
  /** @class */
  function() {
    function e(t, r, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = sc, this._initCartesian(t, r, i), this.model = t;
    }
    return e.prototype.getRect = function() {
      return this._rect;
    }, e.prototype.update = function(t, r) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = gt(o), u = l.length;
        if (u) {
          for (var h = [], c = u - 1; c >= 0; c--) {
            var v = +l[c], f = o[v], d = f.model, g = f.scale;
            // Only value and log axis without interval support alignTicks.
            ic(g) && d.get("alignTicks") && d.get("interval") == null ? h.push(f) : (Ip(g, d), ic(g) && (s = f));
          }
          h.length && (s || (s = h.pop(), Ip(s.scale, s.model)), C(h, function(p) {
            U2(p.scale, p.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      C(i.x, function(o) {
        eg(i, "y", o, a);
      }), C(i.y, function(o) {
        eg(i, "x", o, a);
      }), this.resize(this.model, r);
    }, e.prototype.resize = function(t, r, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = In(n, {
        width: r.getWidth(),
        height: r.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (C(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = RA(u);
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
          u.setExtent(c[v], c[1 - v]), X2(u, h ? o.x : o.y);
        });
      }
    }, e.prototype.getAxis = function(t, r) {
      var i = this._axesMap[t];
      if (i != null)
        return i[r || 0];
    }, e.prototype.getAxes = function() {
      return this._axesList.slice();
    }, e.prototype.getCartesian = function(t, r) {
      if (t != null && r != null) {
        var i = "x" + t + "y" + r;
        return this._coordsMap[i];
      }
      V(t) && (r = t.yAxisIndex, t = t.xAxisIndex);
      for (var n = 0, a = this._coordsList; n < a.length; n++)
        if (a[n].getAxis("x").index === t || a[n].getAxis("y").index === r)
          return a[n];
    }, e.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, e.prototype.convertToPixel = function(t, r, i) {
      var n = this._findConvertTarget(r);
      return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null;
    }, e.prototype.convertFromPixel = function(t, r, i) {
      var n = this._findConvertTarget(r);
      return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null;
    }, e.prototype._findConvertTarget = function(t) {
      var r = t.seriesModel, i = t.xAxisModel || r && r.getReferringComponents("xAxis", Le).models[0], n = t.yAxisModel || r && r.getReferringComponents("yAxis", Le).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (r)
        s = r.coordinateSystem, vt(o, s) < 0 && (s = null);
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
    }, e.prototype.containPoint = function(t) {
      var r = this._coordsList[0];
      if (r)
        return r.containPoint(t);
    }, e.prototype._initCartesian = function(t, r, i) {
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
      if (r.eachComponent("xAxis", u("x"), this), r.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
        this._axesMap = {}, this._axesList = [];
        return;
      }
      this._axesMap = s, C(s.x, function(h, c) {
        C(s.y, function(v, f) {
          var d = "x" + c + "y" + f, g = new G2(d);
          g.master = n, g.model = t, n._coordsMap[d] = g, n._coordsList.push(g), g.addAxis(h), g.addAxis(v);
        });
      });
      function u(h) {
        return function(c, v) {
          if (Qu(c, t)) {
            var f = c.get("position");
            h === "x" ? f !== "top" && f !== "bottom" && (f = o.bottom ? "top" : "bottom") : f !== "left" && f !== "right" && (f = o.left ? "right" : "left"), o[f] = !0;
            var d = new W2(h, PA(c), [0, 0], c.get("type"), f), g = d.type === "category";
            d.onBand = g && c.get("boundaryGap"), d.inverse = c.get("inverse"), c.axis = d, d.model = c, d.grid = a, d.index = v, a._axesList.push(d), s[h][v] = d, l[h]++;
          }
        };
      }
    }, e.prototype._updateScale = function(t, r) {
      C(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (Jp(n)) {
          var a = tg(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Qu(o, r) || !Qu(s, r))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), h = l.getAxis("x"), c = l.getAxis("y");
          i(u, h), i(u, c);
        }
      }, this);
      function i(n, a) {
        C(EA(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, e.prototype.getTooltipAxes = function(t) {
      var r = [], i = [];
      return C(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        vt(r, a) < 0 && r.push(a), vt(i, o) < 0 && i.push(o);
      }), {
        baseAxes: r,
        otherAxes: i
      };
    }, e.create = function(t, r) {
      var i = [];
      return t.eachComponent("grid", function(n, a) {
        var o = new e(n, t, r);
        o.name = "grid_" + a, o.resize(n, r, !0), n.coordinateSystem = o, i.push(o);
      }), t.eachSeries(function(n) {
        if (Jp(n)) {
          var a = tg(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, e.dimensions = sc, e;
  }()
);
function Qu(e, t) {
  return e.getCoordSysModel() === t;
}
function eg(e, t, r, i) {
  r.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = e[t], a, o = r.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    rg(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && rg(n[u]) && !i[h(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[h(a)] = !0);
  function h(c) {
    return c.dim + "_" + c.index;
  }
}
function rg(e) {
  return e && e.type !== "category" && e.type !== "time" && $A(e);
}
function X2(e, t) {
  var r = e.getExtent(), i = r[0] + r[1];
  e.toGlobalCoord = e.dim === "x" ? function(n) {
    return n + t;
  } : function(n) {
    return i - n + t;
  }, e.toLocalCoord = e.dim === "x" ? function(n) {
    return n - t;
  } : function(n) {
    return i - n + t;
  };
}
var Fr = Math.PI, Gr = (
  /** @class */
  function() {
    function e(t, r) {
      this.group = new Ct(), this.opt = r, this.axisModel = t, ut(r, {
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
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return e.prototype.hasBuilder = function(t) {
      return !!ig[t];
    }, e.prototype.add = function(t) {
      ig[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function() {
      return this.group;
    }, e.innerTextLayout = function(t, r, i) {
      var n = Oy(r - t), a, o;
      return Os(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Os(n - Fr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < Fr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
        rotation: n,
        textAlign: a,
        textVerticalAlign: o
      };
    }, e.makeAxisEventDataBase = function(t) {
      var r = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return r[t.mainType + "Index"] = t.componentIndex, r;
    }, e.isLabelSilent = function(t) {
      var r = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || r && r.show);
    }, e;
  }()
), ig = {
  axisLine: function(e, t, r, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && e.handleAutoShown && (n = e.handleAutoShown("axisLine")), !!n) {
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
        strokeContainThreshold: e.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      Ya(c.shape, c.style.lineWidth), c.anid = "line", r.add(c);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var f = t.get(["axisLine", "symbolSize"]);
        H(v) && (v = [v, v]), (H(f) || yt(f)) && (f = [f, f]);
        var d = g_(t.get(["axisLine", "symbolOffset"]) || 0, f), g = f[0], p = f[1];
        C([{
          rotate: e.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = yr(v[m], -g / 2, -p / 2, g, p, h.stroke, !0), b = y.r + y.offset, S = u ? l : s;
            _.attr({
              rotation: y.rotate,
              x: S[0] + b * Math.cos(e.rotation),
              y: S[1] - b * Math.sin(e.rotation),
              silent: !0,
              z2: 11
            }), r.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(e, t, r, i) {
    var n = K2(r, i, t, e), a = Q2(r, i, t, e);
    if (Z2(t, a, n), j2(r, i, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = qA(U(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      ZA(o);
    }
  },
  axisName: function(e, t, r, i) {
    var n = Dn(e.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = e.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, c = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        ag(a) ? e.labelOffset + o * l : 0
      ], v, f = t.get("nameRotate");
      f != null && (f = f * Fr / 180);
      var d;
      ag(a) ? v = Gr.innerTextLayout(
        e.rotation,
        f ?? e.rotation,
        // Adapt to axis.
        o
      ) : (v = q2(e.rotation, a, f || 0, u), d = e.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, y = p.ellipsis, m = Dn(e.nameTruncateMaxWidth, p.maxWidth, d), _ = new At({
        x: c[0],
        y: c[1],
        rotation: v.rotation,
        silent: Gr.isLabelSilent(t),
        style: Xe(s, {
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
      if (pl({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var b = Gr.makeAxisEventDataBase(t);
        b.targetType = "axisName", b.name = n, ot(_).eventData = b;
      }
      i.add(_), _.updateTransform(), r.add(_), _.decomposeTransform();
    }
  }
};
function q2(e, t, r, i) {
  var n = Oy(r - e), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Os(n - Fr / 2) ? (o = l ? "bottom" : "top", a = "center") : Os(n - Fr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < Fr * 1.5 && n > Fr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function Z2(e, t, r) {
  if (!e0(e.axis)) {
    var i = e.get(["axisLabel", "showMinLabel"]), n = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], r = r || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = r[0], h = r[1], c = r[r.length - 1], v = r[r.length - 2];
    i === !1 ? (ue(a), ue(u)) : ng(a, o) && (i ? (ue(o), ue(h)) : (ue(a), ue(u))), n === !1 ? (ue(s), ue(c)) : ng(l, s) && (n ? (ue(l), ue(v)) : (ue(s), ue(c)));
  }
}
function ue(e) {
  e && (e.ignore = !0);
}
function ng(e, t) {
  var r = e && e.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!r || !i)) {
    var n = Rc([]);
    return Oc(n, n, -e.rotation), r.applyTransform(yn([], n, e.getLocalTransform())), i.applyTransform(yn([], n, t.getLocalTransform())), r.intersect(i);
  }
}
function ag(e) {
  return e === "middle" || e === "center";
}
function b0(e, t, r, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (me(o, o, t), me(s, s, t));
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
    Ya(h.shape, h.style.lineWidth), h.anid = n + "_" + e[l].tickValue, a.push(h);
  }
  return a;
}
function K2(e, t, r, i) {
  var n = r.axis, a = r.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), h = b0(u, t.transform, l, ut(s.getLineStyle(), {
      stroke: r.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), c = 0; c < h.length; c++)
      e.add(h[c]);
    return h;
  }
}
function j2(e, t, r, i) {
  var n = r.axis, a = r.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ut(s.getLineStyle(), ut(r.getModel("axisTick").getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var c = b0(o[h], t.transform, l, u, "minorticks_" + h), v = 0; v < c.length; v++)
          e.add(c[v]);
  }
}
function Q2(e, t, r, i) {
  var n = r.axis, a = Dn(i.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = r.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (Dn(i.labelRotate, o.get("rotate")) || 0) * Fr / 180, h = Gr.innerTextLayout(i.rotation, u, i.labelDirection), c = r.getCategories && r.getCategories(!0), v = [], f = Gr.isLabelSilent(r), d = r.get("triggerEvent");
    return C(l, function(g, p) {
      var y = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (c && c[y]) {
        var S = c[y];
        V(S) && S.textStyle && (b = new xt(S.textStyle, o, r.ecModel));
      }
      var w = b.getTextColor() || r.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(y), M = b.getShallow("align", !0) || h.textAlign, D = tt(b.getShallow("alignMinLabel", !0), M), A = tt(b.getShallow("alignMaxLabel", !0), M), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, I = tt(b.getShallow("verticalAlignMinLabel", !0), T), P = tt(b.getShallow("verticalAlignMaxLabel", !0), T), $ = new At({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: h.rotation,
        silent: f,
        z2: 10 + (g.level || 0),
        style: Xe(b, {
          text: m,
          align: p === 0 ? D : p === l.length - 1 ? A : M,
          verticalAlign: p === 0 ? I : p === l.length - 1 ? P : T,
          fill: Z(w) ? w(
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
      if ($.anid = "label_" + y, pl({
        el: $,
        componentModel: r,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return $.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var R = Gr.makeAxisEventDataBase(r);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = p, n.type === "category" && (R.dataIndex = y), ot($).eventData = R;
      }
      t.add($), $.updateTransform(), v.push($), e.add($), $.decomposeTransform();
    }), v;
  }
}
function J2(e, t) {
  var r = {
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
  return tI(r, e, t), r.seriesInvolved && rI(r, e), r;
}
function tI(e, t, r) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  C(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = to(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var h = s.model, c = h.getModel("tooltip", i);
    if (C(s.getAxes(), Dt(g, !1, null)), s.getTooltipAxes && i && c.get("show")) {
      var v = c.get("trigger") === "axis", f = c.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (v || f) && C(d.baseAxes, Dt(g, f ? "cross" : !0, v)), f && C(d.otherAxes, Dt(g, "cross", !1));
    }
    function g(p, y, m) {
      var _ = m.model.getModel("axisPointer", n), b = _.get("show");
      if (!(!b || b === "auto" && !p && !uc(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = p ? eI(m, c, n, t, p, y) : _;
        var S = _.get("snap"), w = _.get("triggerEmphasis"), x = to(m.model), M = y || S || m.type === "category", D = e.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: M,
          snap: S,
          useHandle: uc(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, e.seriesInvolved = e.seriesInvolved || M;
        var A = iI(a, m);
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
function eI(e, t, r, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  C(s, function(v) {
    l[v] = q(o.get(v));
  }), l.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var c = l.lineStyle = o.get("crossStyle");
      c && ut(u, c.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new xt(l, r, i));
}
function rI(e, t) {
  t.eachSeries(function(r) {
    var i = r.coordinateSystem, n = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || C(e.coordSysAxesInfo[to(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function iI(e, t) {
  for (var r = t.model, i = t.dim, n = 0; n < e.length; n++) {
    var a = e[n] || {};
    if (Ju(a[i + "AxisId"], r.id) || Ju(a[i + "AxisIndex"], r.componentIndex) || Ju(a[i + "AxisName"], r.name))
      return n;
  }
}
function Ju(e, t) {
  return e === "all" || z(e) && vt(e, t) >= 0 || e === t;
}
function nI(e) {
  var t = Lf(e);
  if (t) {
    var r = t.axisPointerModel, i = t.axis.scale, n = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = i.parse(o));
    var s = uc(r);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Lf(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[to(e)];
}
function aI(e) {
  var t = Lf(e);
  return t && t.axisPointerModel;
}
function uc(e) {
  return !!e.get(["handle", "show"]);
}
function to(e) {
  return e.type + "||" + e.id;
}
var og = {}, w0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this.axisPointerClass && nI(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, n, !0);
    }, t.prototype.updateAxisPointer = function(r, i, n, a) {
      this._doUpdateAxisPointerClass(r, n, !1);
    }, t.prototype.remove = function(r, i) {
      var n = this._axisPointer;
      n && n.remove(i);
    }, t.prototype.dispose = function(r, i) {
      this._disposeAxisPointer(i), e.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(r, i, n) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = aI(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, i) {
      og[r] = i;
    }, t.getAxisPointerClass = function(r) {
      return r && og[r];
    }, t.type = "axis", t;
  }(Oe)
), hc = It();
function oI(e, t, r, i) {
  var n = r.axis;
  if (!n.scale.isBlank()) {
    var a = r.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, c = hc(e).splitAreaColors, v = Q(), f = 0;
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
      hc(e).splitAreaColors = v;
    }
  }
}
function sI(e) {
  hc(e).splitAreaColors = null;
}
var lI = ["axisLine", "axisTickLabel", "axisName"], uI = ["splitArea", "splitLine", "minorSplitLine"], S0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.axisPointerClass = "CartesianAxisPointer", r;
    }
    return t.prototype.render = function(r, i, n, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new Ct(), this.group.add(this._axisGroup), !!r.get("show")) {
        var s = r.getCoordSysModel(), l = lc(s, r), u = new Gr(r, N({
          handleAutoShown: function(c) {
            for (var v = s.coordinateSystem.getCartesians(), f = 0; f < v.length; f++)
              if (ic(v[f].getOtherAxis(r.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        C(lI, u.add, u), this._axisGroup.add(u.getGroup()), C(uI, function(c) {
          r.get([c, "show"]) && hI[c](this, this._axisGroup, r, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || ym(o, this._axisGroup, r), e.prototype.render.call(this, r, i, n, a);
      }
    }, t.prototype.remove = function() {
      sI(this);
    }, t.type = "cartesianAxis", t;
  }(w0)
), hI = {
  splitLine: function(e, t, r, i) {
    var n = r.axis;
    if (!n.scale.isBlank()) {
      var a = r.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
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
          Ya(S.shape, p.lineWidth), t.add(S);
        }
      }
    }
  },
  minorSplitLine: function(e, t, r, i) {
    var n = r.axis, a = r.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
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
          Ya(p.shape, v.lineWidth), t.add(p);
        }
  },
  splitArea: function(e, t, r, i) {
    oI(e, t, r, i);
  }
}, x0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.type = "xAxis", t;
  }(S0)
), cI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = x0.type, r;
    }
    return t.type = "yAxis", t;
  }(S0)
), fI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "grid", r;
    }
    return t.prototype.render = function(r, i) {
      this.group.removeAll(), r.get("show") && this.group.add(new bt({
        shape: r.coordinateSystem.getRect(),
        style: ut({
          fill: r.get("backgroundColor")
        }, r.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(Oe)
), sg = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function vI(e) {
  e.registerComponentView(fI), e.registerComponentModel(k2), e.registerCoordinateSystem("cartesian2d", Y2), Kp(e, "x", oc, sg), Kp(e, "y", oc, sg), e.registerComponentView(x0), e.registerComponentView(cI), e.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var eo = C, dI = V, Ks = -1, Bt = (
  /** @class */
  function() {
    function e(t) {
      var r = t.mappingMethod, i = t.type, n = this.option = q(t);
      this.type = i, this.mappingMethod = r, this._normalizeData = yI[r];
      var a = e.visualHandlers[i];
      this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._normalizedToVisual = a._normalizedToVisual[r], r === "piecewise" ? (th(n), pI(n)) : r === "category" ? n.categories ? gI(n) : th(n, !0) : (qe(r !== "linear" || n.dataExtent), th(n));
    }
    return e.prototype.mapValueToVisual = function(t) {
      var r = this._normalizeData(t);
      return this._normalizedToVisual(r, t);
    }, e.prototype.getNormalizer = function() {
      return J(this._normalizeData, this);
    }, e.listVisualTypes = function() {
      return gt(e.visualHandlers);
    }, e.isValidType = function(t) {
      return e.visualHandlers.hasOwnProperty(t);
    }, e.eachVisual = function(t, r, i) {
      V(t) ? C(t, r, i) : r.call(i, t);
    }, e.mapVisual = function(t, r, i) {
      var n, a = z(t) ? [] : V(t) ? {} : (n = !0, null);
      return e.eachVisual(t, function(o, s) {
        var l = r.call(i, o, s);
        n ? a = l : a[s] = l;
      }), a;
    }, e.retrieveVisuals = function(t) {
      var r = {}, i;
      return t && eo(e.visualHandlers, function(n, a) {
        t.hasOwnProperty(a) && (r[a] = t[a], i = !0);
      }), i ? r : null;
    }, e.prepareVisualTypes = function(t) {
      if (z(t))
        t = t.slice();
      else if (dI(t)) {
        var r = [];
        eo(t, function(i, n) {
          r.push(n);
        }), t = r;
      } else
        return [];
      return t.sort(function(i, n) {
        return n === "color" && i !== "color" && i.indexOf("color") === 0 ? 1 : -1;
      }), t;
    }, e.dependsOn = function(t, r) {
      return r === "color" ? !!(t && t.indexOf(r) === 0) : t === r;
    }, e.findPieceIndex = function(t, r, i) {
      for (var n, a = 1 / 0, o = 0, s = r.length; o < s; o++) {
        var l = r[o].value;
        if (l != null) {
          if (l === t || H(l) && l === t + "")
            return o;
          i && v(l, o);
        }
      }
      for (var o = 0, s = r.length; o < s; o++) {
        var u = r[o], h = u.interval, c = u.close;
        if (h) {
          if (h[0] === -1 / 0) {
            if (ts(c[1], t, h[1]))
              return o;
          } else if (h[1] === 1 / 0) {
            if (ts(c[0], h[0], t))
              return o;
          } else if (ts(c[0], h[0], t) && ts(c[1], t, h[1]))
            return o;
          i && v(h[0], o), i && v(h[1], o);
        }
      }
      if (i)
        return t === 1 / 0 ? r.length - 1 : t === -1 / 0 ? 0 : n;
      function v(f, d) {
        var g = Math.abs(f - t);
        g < a && (a = g, n = d);
      }
    }, e.visualHandlers = {
      color: {
        applyVisual: ua("color"),
        getColorMapper: function() {
          var t = this.option;
          return J(t.mappingMethod === "category" ? function(r, i) {
            return !i && (r = this._normalizeData(r)), ba.call(this, r);
          } : function(r, i, n) {
            var a = !!n;
            return !i && (r = this._normalizeData(r)), n = Zl(r, t.parsedVisual, n), a ? n : fr(n, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(t) {
            return fr(Zl(t, this.option.parsedVisual), "rgba");
          },
          category: ba,
          piecewise: function(t, r) {
            var i = fc.call(this, r);
            return i == null && (i = fr(Zl(t, this.option.parsedVisual), "rgba")), i;
          },
          fixed: _i
        }
      },
      colorHue: Jo(function(t, r) {
        return Kl(t, r);
      }),
      colorSaturation: Jo(function(t, r) {
        return Kl(t, null, r);
      }),
      colorLightness: Jo(function(t, r) {
        return Kl(t, null, null, r);
      }),
      colorAlpha: Jo(function(t, r) {
        return hw(t, r);
      }),
      decal: {
        applyVisual: ua("decal"),
        _normalizedToVisual: {
          linear: null,
          category: ba,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: ua("opacity"),
        _normalizedToVisual: cc([0, 1])
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
        applyVisual: function(t, r, i) {
          var n = this.mapValueToVisual(t);
          i("symbol", n);
        },
        _normalizedToVisual: {
          linear: lg,
          category: ba,
          piecewise: function(t, r) {
            var i = fc.call(this, r);
            return i == null && (i = lg.call(this, t)), i;
          },
          fixed: _i
        }
      },
      symbolSize: {
        applyVisual: ua("symbolSize"),
        _normalizedToVisual: cc([0, 1])
      }
    }, e;
  }()
);
function pI(e) {
  var t = e.pieceList;
  e.hasSpecialVisual = !1, C(t, function(r, i) {
    r.originIndex = i, r.visual != null && (e.hasSpecialVisual = !0);
  });
}
function gI(e) {
  var t = e.categories, r = e.categoryMap = {}, i = e.visual;
  if (eo(t, function(o, s) {
    r[o] = s;
  }), !z(i)) {
    var n = [];
    V(i) ? eo(i, function(o, s) {
      var l = r[s];
      n[l ?? Ks] = o;
    }) : n[Ks] = i, i = T0(e, n);
  }
  for (var a = t.length - 1; a >= 0; a--)
    i[a] == null && (delete r[t[a]], t.pop());
}
function th(e, t) {
  var r = e.visual, i = [];
  V(r) ? eo(r, function(a) {
    i.push(a);
  }) : r != null && i.push(r);
  var n = {
    color: 1,
    symbol: 1
  };
  !t && i.length === 1 && !n.hasOwnProperty(e.type) && (i[1] = i[0]), T0(e, i);
}
function Jo(e) {
  return {
    applyVisual: function(t, r, i) {
      var n = this.mapValueToVisual(t);
      i("color", e(r("color"), n));
    },
    _normalizedToVisual: cc([0, 1])
  };
}
function lg(e) {
  var t = this.option.visual;
  return t[Math.round(dr(e, [0, 1], [0, t.length - 1], !0))] || {};
}
function ua(e) {
  return function(t, r, i) {
    i(e, this.mapValueToVisual(t));
  };
}
function ba(e) {
  var t = this.option.visual;
  return t[this.option.loop && e !== Ks ? e % t.length : e];
}
function _i() {
  return this.option.visual[0];
}
function cc(e) {
  return {
    linear: function(t) {
      return dr(t, e, this.option.visual, !0);
    },
    category: ba,
    piecewise: function(t, r) {
      var i = fc.call(this, r);
      return i == null && (i = dr(t, e, this.option.visual, !0)), i;
    },
    fixed: _i
  };
}
function fc(e) {
  var t = this.option, r = t.pieceList;
  if (t.hasSpecialVisual) {
    var i = Bt.findPieceIndex(e, r), n = r[i];
    if (n && n.visual)
      return n.visual[this.type];
  }
}
function T0(e, t) {
  return e.visual = t, e.type === "color" && (e.parsedVisual = U(t, function(r) {
    var i = _e(r);
    return i || [0, 0, 0, 1];
  })), t;
}
var yI = {
  linear: function(e) {
    return dr(e, this.option.dataExtent, [0, 1], !0);
  },
  piecewise: function(e) {
    var t = this.option.pieceList, r = Bt.findPieceIndex(e, t, !0);
    if (r != null)
      return dr(r, [0, t.length - 1], [0, 1], !0);
  },
  category: function(e) {
    var t = this.option.categories ? this.option.categoryMap[e] : e;
    return t ?? Ks;
  },
  fixed: Wt
};
function ts(e, t, r) {
  return e ? t <= r : t < r;
}
function mI(e, t, r, i, n, a) {
  e = e || 0;
  var o = r[1] - r[0];
  if (n != null && (n = nn(n, [0, o])), a != null && (a = Math.max(a, n ?? 0)), i === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = nn(s, [0, o]), n = a = nn(s, [n, a]), i = 0;
  }
  t[0] = nn(t[0], r), t[1] = nn(t[1], r);
  var l = eh(t, i);
  t[i] += e;
  var u = n || 0, h = r.slice();
  l.sign < 0 ? h[0] += u : h[1] -= u, t[i] = nn(t[i], h);
  var c;
  return c = eh(t, i), n != null && (c.sign !== l.sign || c.span < n) && (t[1 - i] = t[i] + l.sign * n), c = eh(t, i), a != null && c.span > a && (t[1 - i] = t[i] + c.sign * a), t;
}
function eh(e, t) {
  var r = e[t] - e[1 - t];
  return {
    span: Math.abs(r),
    sign: r > 0 ? -1 : r < 0 ? 1 : t ? -1 : 1
  };
}
function nn(e, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, e));
}
var _I = 256, bI = (
  /** @class */
  function() {
    function e() {
      this.blurSize = 30, this.pointSize = 20, this.maxOpacity = 1, this.minOpacity = 0, this._gradientPixels = {
        inRange: null,
        outOfRange: null
      };
      var t = Wr.createCanvas();
      this.canvas = t;
    }
    return e.prototype.update = function(t, r, i, n, a, o) {
      var s = this._getBrush(), l = this._getGradient(a, "inRange"), u = this._getGradient(a, "outOfRange"), h = this.pointSize + this.blurSize, c = this.canvas, v = c.getContext("2d"), f = t.length;
      c.width = r, c.height = i;
      for (var d = 0; d < f; ++d) {
        var g = t[d], p = g[0], y = g[1], m = g[2], _ = n(m);
        v.globalAlpha = _, v.drawImage(s, p - h, y - h);
      }
      if (!c.width || !c.height)
        return c;
      for (var b = v.getImageData(0, 0, c.width, c.height), S = b.data, w = 0, x = S.length, M = this.minOpacity, D = this.maxOpacity, A = D - M; w < x; ) {
        var _ = S[w + 3] / 256, T = Math.floor(_ * (_I - 1)) * 4;
        if (_ > 0) {
          var I = o(_) ? l : u;
          _ > 0 && (_ = _ * A + M), S[w++] = I[T], S[w++] = I[T + 1], S[w++] = I[T + 2], S[w++] = I[T + 3] * _ * 256;
        } else
          w += 4;
      }
      return v.putImageData(b, 0, 0), c;
    }, e.prototype._getBrush = function() {
      var t = this._brushCanvas || (this._brushCanvas = Wr.createCanvas()), r = this.pointSize + this.blurSize, i = r * 2;
      t.width = i, t.height = i;
      var n = t.getContext("2d");
      return n.clearRect(0, 0, i, i), n.shadowOffsetX = i, n.shadowBlur = this.blurSize, n.shadowColor = "#000", n.beginPath(), n.arc(-r, r, this.pointSize, 0, Math.PI * 2, !0), n.closePath(), n.fill(), t;
    }, e.prototype._getGradient = function(t, r) {
      for (var i = this._gradientPixels, n = i[r] || (i[r] = new Uint8ClampedArray(256 * 4)), a = [0, 0, 0, 0], o = 0, s = 0; s < 256; s++)
        t[r](s / 255, !0, a), n[o++] = a[0], n[o++] = a[1], n[o++] = a[2], n[o++] = a[3];
      return n;
    }, e;
  }()
);
function wI(e, t, r) {
  var i = e[1] - e[0];
  t = U(t, function(o) {
    return {
      interval: [(o.interval[0] - e[0]) / i, (o.interval[1] - e[0]) / i]
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
    return s >= 0 && s < n && r[s];
  };
}
function SI(e, t) {
  var r = e[1] - e[0];
  return t = [(t[0] - e[0]) / r, (t[1] - e[0]) / r], function(i) {
    return i >= t[0] && i <= t[1];
  };
}
function ug(e) {
  var t = e.dimensions;
  return t[0] === "lng" && t[1] === "lat";
}
var xI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n) {
      var a;
      i.eachComponent("visualMap", function(s) {
        s.eachTargetSeries(function(l) {
          l === r && (a = s);
        });
      }), this._progressiveEls = null, this.group.removeAll();
      var o = r.coordinateSystem;
      o.type === "cartesian2d" || o.type === "calendar" ? this._renderOnCartesianAndCalendar(r, n, 0, r.getData().count()) : ug(o) && this._renderOnGeo(o, r, a, n);
    }, t.prototype.incrementalPrepareRender = function(r, i, n) {
      this.group.removeAll();
    }, t.prototype.incrementalRender = function(r, i, n, a) {
      var o = i.coordinateSystem;
      o && (ug(o) ? this.render(i, n, a) : (this._progressiveEls = [], this._renderOnCartesianAndCalendar(i, a, r.start, r.end, !0)));
    }, t.prototype.eachRendered = function(r) {
      ho(this._progressiveEls || this.group, r);
    }, t.prototype._renderOnCartesianAndCalendar = function(r, i, n, a, o) {
      var s = r.coordinateSystem, l = Ol(s, "cartesian2d"), u, h, c, v;
      if (l) {
        var f = s.getAxis("x"), d = s.getAxis("y");
        u = f.getBandWidth() + 0.5, h = d.getBandWidth() + 0.5, c = f.scale.getExtent(), v = d.scale.getExtent();
      }
      for (var g = this.group, p = r.getData(), y = r.getModel(["emphasis", "itemStyle"]).getItemStyle(), m = r.getModel(["blur", "itemStyle"]).getItemStyle(), _ = r.getModel(["select", "itemStyle"]).getItemStyle(), b = r.get(["itemStyle", "borderRadius"]), S = An(r), w = r.getModel("emphasis"), x = w.get("focus"), M = w.get("blurScope"), D = w.get("disabled"), A = l ? [p.mapDimension("x"), p.mapDimension("y"), p.mapDimension("value")] : [p.mapDimension("time"), p.mapDimension("value")], T = n; T < a; T++) {
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
        var F = r.getRawValue(T), W = "-";
        F && F[2] != null && (W = F[2] + ""), co(I, S, {
          labelFetcher: r,
          labelDataIndex: T,
          defaultOpacity: P.opacity,
          defaultText: W
        }), I.ensureState("emphasis").style = y, I.ensureState("blur").style = m, I.ensureState("select").style = _, Ua(I, x, M, D), I.incremental = o, o && (I.states.emphasis.hoverLayer = !0), g.add(I), p.setItemGraphicEl(T, I), this._progressiveEls && this._progressiveEls.push(I);
      }
    }, t.prototype._renderOnGeo = function(r, i, n, a) {
      var o = n.targetVisuals.inRange, s = n.targetVisuals.outOfRange, l = i.getData(), u = this._hmLayer || this._hmLayer || new bI();
      u.blurSize = i.get("blurSize"), u.pointSize = i.get("pointSize"), u.minOpacity = i.get("minOpacity"), u.maxOpacity = i.get("maxOpacity");
      var h = r.getViewRect().clone(), c = r.getRoamTransform();
      h.applyTransform(c);
      var v = Math.max(h.x, 0), f = Math.max(h.y, 0), d = Math.min(h.width + h.x, a.getWidth()), g = Math.min(h.height + h.y, a.getHeight()), p = d - v, y = g - f, m = [l.mapDimension("lng"), l.mapDimension("lat"), l.mapDimension("value")], _ = l.mapArray(m, function(x, M, D) {
        var A = r.dataToPoint([x, M]);
        return A[0] -= v, A[1] -= f, A.push(D), A;
      }), b = n.getExtent(), S = n.type === "visualMap.continuous" ? SI(b, n.option.range) : wI(b, n.getPieceList(), n.option.selected);
      u.update(_, p, y, o.color.getNormalizer(), {
        inRange: o.color.getColorMapper(),
        outOfRange: s.color.getColorMapper()
      }, S);
      var w = new rr({
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
), TI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, i) {
      return Ll(null, this, {
        generateCoord: "value"
      });
    }, t.prototype.preventIncremental = function() {
      var r = Ml.get(this.get("coordinateSystem"));
      if (r && r.dimensions)
        return r.dimensions[0] === "lng" && r.dimensions[1] === "lat";
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
function CI(e) {
  e.registerChartView(xI), e.registerSeriesModel(TI);
}
var bi = It(), hg = q, rh = J, MI = (
  /** @class */
  function() {
    function e() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return e.prototype.render = function(t, r, i, n) {
      var a = r.get("value"), o = r.get("status");
      if (this._axisModel = t, this._axisPointerModel = r, this._api = i, !(!n && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, r, i);
        var h = u.graphicKey;
        h !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = h;
        var c = this._moveAnimation = this.determineAnimation(t, r);
        if (!s)
          s = this._group = new Ct(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), i.getZr().add(s);
        else {
          var v = Dt(cg, r, c);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, r);
        }
        vg(s, r, !0), this._renderHandle(a);
      }
    }, e.prototype.remove = function(t) {
      this.clear(t);
    }, e.prototype.dispose = function(t) {
      this.clear(t);
    }, e.prototype.determineAnimation = function(t, r) {
      var i = r.get("animation"), n = t.axis, a = n.type === "category", o = r.get("snap");
      if (!o && !a)
        return !1;
      if (i === "auto" || i == null) {
        var s = this.animationThreshold;
        if (a && n.getBandWidth() > s)
          return !0;
        if (o) {
          var l = Lf(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, e.prototype.makeElOption = function(t, r, i, n, a) {
    }, e.prototype.createPointerEl = function(t, r, i, n) {
      var a = r.pointer;
      if (a) {
        var o = bi(t).pointerEl = new pT[a.type](hg(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, i, n) {
      if (r.label) {
        var a = bi(t).labelEl = new At(hg(r.label));
        t.add(a), fg(a, n);
      }
    }, e.prototype.updatePointerEl = function(t, r, i) {
      var n = bi(t).pointerEl;
      n && r.pointer && (n.setStyle(r.pointer.style), i(n, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, i, n) {
      var a = bi(t).labelEl;
      a && (a.setStyle(r.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), fg(a, n));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = rf(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Fa(u.event);
          },
          onmousedown: rh(this._onHandleDragMove, this, 0, 0),
          drift: rh(this._onHandleDragMove, this),
          ondragend: rh(this._onHandleDragEnd, this)
        }), i.add(n)), vg(n, r, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        z(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, o_(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      cg(this._axisPointerModel, !r && this._moveAnimation, this._handle, ih(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(ih(i), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(ih(n)), bi(i).lastProp = null, this._doDispatchAxisPointer();
      }
    }, e.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var r = this._payloadInfo, i = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: r.cursorPoint[0],
          y: r.cursorPoint[1],
          tooltipOption: r.tooltipOption,
          axesInfo: [{
            axisDim: i.axis.dim,
            axisIndex: i.componentIndex
          }]
        });
      }
    }, e.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var t = this._handle;
      if (t) {
        var r = this._axisPointerModel.get("value");
        this._moveHandleToValue(r), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, e.prototype.clear = function(t) {
      this._lastValue = null, this._lastStatus = null;
      var r = t.getZr(), i = this._group, n = this._handle;
      r && i && (this._lastGraphicKey = null, i && r.remove(i), n && r.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Xh(this, "_doDispatchAxisPointer");
    }, e.prototype.doClear = function() {
    }, e.prototype.buildLabel = function(t, r, i) {
      return i = i || 0, {
        x: t[i],
        y: t[1 - i],
        width: r[i],
        height: r[1 - i]
      };
    }, e;
  }()
);
function cg(e, t, r, i) {
  C0(bi(r).lastProp, i) || (bi(r).lastProp = i, t ? se(r, i, e) : (r.stopAnimation(), r.attr(i)));
}
function C0(e, t) {
  if (V(e) && V(t)) {
    var r = !0;
    return C(t, function(i, n) {
      r = r && C0(e[n], i);
    }), !!r;
  } else
    return e === t;
}
function fg(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function ih(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function vg(e, t, r) {
  var i = t.get("z"), n = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = r);
  });
}
function DI(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), i;
  return t === "line" ? (i = r.getLineStyle(), i.fill = null) : t === "shadow" && (i = r.getAreaStyle(), i.stroke = null), i;
}
function AI(e, t, r, i, n) {
  var a = r.get("value"), o = M0(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = fo(s.get("padding") || 0), u = s.getFont(), h = Bc(o, u), c = n.position, v = h.width + l[1] + l[3], f = h.height + l[0] + l[2], d = n.align;
  d === "right" && (c[0] -= v), d === "center" && (c[0] -= v / 2);
  var g = n.verticalAlign;
  g === "bottom" && (c[1] -= f), g === "middle" && (c[1] -= f / 2), II(c, v, f, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: c[0],
    y: c[1],
    style: Xe(s, {
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
function II(e, t, r, i) {
  var n = i.getWidth(), a = i.getHeight();
  e[0] = Math.min(e[0] + t, n) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function M0(e, t, r, i, n) {
  e = t.scale.parse(e);
  var a = t.scale.getLabel({
    value: e
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: n.precision
  }), o = n.formatter;
  if (o) {
    var s = {
      value: Cf(t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    C(i, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, c = u && u.getDataParams(h);
      c && s.seriesData.push(c);
    }), H(o) ? a = o.replace("{value}", a) : Z(o) && (a = o(s));
  }
  return a;
}
function D0(e, t, r) {
  var i = gn();
  return Oc(i, i, r.rotation), mh(i, i, r.position), _n([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], i);
}
function LI(e, t, r, i, n, a) {
  var o = Gr.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = n.get(["label", "margin"]), AI(t, i, n, a, {
    position: D0(i.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function PI(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function $I(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
var RI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), h = dg(l, s).getOtherAxis(s).getGlobalExtent(), c = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = DI(a), f = OI[u](s, c, h);
        f.style = v, r.graphicKey = f.type, r.pointer = f;
      }
      var d = lc(l.model, n);
      LI(
        // @ts-ignore
        i,
        r,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(r, i, n) {
      var a = lc(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = D0(i.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = dg(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, c = [r.x, r.y];
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
        rotation: r.rotation,
        cursorPoint: f,
        tooltipOption: d[h]
      };
    }, t;
  }(MI)
);
function dg(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var OI = {
  line: function(e, t, r) {
    var i = PI([t, r[0]], [t, r[1]], pg(e));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(e, t, r) {
    var i = Math.max(1, e.getBandWidth()), n = r[1] - r[0];
    return {
      type: "Rect",
      shape: $I([t - i / 2, r[0]], [i, n], pg(e))
    };
  }
};
function pg(e) {
  return e.dim === "x" ? 0 : 1;
}
var EI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
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
), hr = It(), kI = C;
function A0(e, t, r) {
  if (!X.node) {
    var i = t.getZr();
    hr(i).records || (hr(i).records = {}), NI(i, t);
    var n = hr(i).records[e] || (hr(i).records[e] = {});
    n.handler = r;
  }
}
function NI(e, t) {
  if (hr(e).initialized)
    return;
  hr(e).initialized = !0, r("click", Dt(gg, "click")), r("mousemove", Dt(gg, "mousemove")), r("globalout", zI);
  function r(i, n) {
    e.on(i, function(a) {
      var o = FI(t);
      kI(hr(e).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), BI(o.pendings, t);
    });
  }
}
function BI(e, t) {
  var r = e.showTip.length, i = e.hideTip.length, n;
  r ? n = e.showTip[r - 1] : i && (n = e.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function zI(e, t, r) {
  e.handler("leave", null, r);
}
function gg(e, t, r, i) {
  t.handler(e, r, i);
}
function FI(e) {
  var t = {
    showTip: [],
    hideTip: []
  }, r = function(i) {
    var n = t[i.type];
    n ? n.push(i) : (i.dispatchAction = r, e.dispatchAction(i));
  };
  return {
    dispatchAction: r,
    pendings: t
  };
}
function vc(e, t) {
  if (!X.node) {
    var r = t.getZr(), i = (hr(r).records || {})[e];
    i && (hr(r).records[e] = null);
  }
}
var HI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, i, n) {
      var a = i.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      A0("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, i) {
      vc("axisPointer", i);
    }, t.prototype.dispose = function(r, i) {
      vc("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(Oe)
);
function I0(e, t) {
  var r = [], i = e.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = $i(a, e);
  if (o == null || o < 0 || z(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    r = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), c = h.dim, v = u.dim, f = c === "x" || c === "radius" ? 1 : 0, d = a.mapDimension(v), g = [];
      g[f] = a.get(d, o), g[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(g) || [];
    } else
      r = l.dataToPoint(a.getValues(U(l.dimensions, function(y) {
        return a.mapDimension(y);
      }), o)) || [];
  else if (s) {
    var p = s.getBoundingRect().clone();
    p.applyTransform(s.transform), r = [p.x + p.width / 2, p.y + p.height / 2];
  }
  return {
    point: r,
    el: s
  };
}
var yg = It();
function VI(e, t, r) {
  var i = e.currTrigger, n = [e.x, e.y], a = e, o = e.dispatchAction || J(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    ms(n) && (n = I0({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = ms(n), u = a.axesInfo, h = s.axesInfo, c = i === "leave" || ms(n), v = {}, f = {}, d = {
      list: [],
      map: {}
    }, g = {
      showPointer: Dt(WI, f),
      showTooltip: Dt(UI, d)
    };
    C(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(n);
      C(s.coordSysAxesInfo[m], function(b, S) {
        var w = b.axis, x = ZI(u, b);
        if (!c && _ && (!u || x)) {
          var M = x && x.value;
          M == null && !l && (M = w.pointToData(n)), M != null && mg(b, M, g, !1, v);
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
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, _g(b), _g(y)))), p[y.key] = x;
        }
      });
    }), C(p, function(y, m) {
      mg(h[m], y, g, !0, v);
    }), YI(f, h, v), XI(d, n, e, o), qI(h, o, r), v;
  }
}
function mg(e, t, r, i, n) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = GI(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && N(n, s[0]), !i && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function GI(e, t) {
  var r = t.axis, i = r.dim, n = e, a = [], o = Number.MAX_VALUE, s = -1;
  return C(t.seriesModels, function(l, u) {
    var h = l.getData().mapDimensionsAll(i), c, v;
    if (l.getAxisTooltipData) {
      var f = l.getAxisTooltipData(h, e, r);
      v = f.dataIndices, c = f.nestestValue;
    } else {
      if (v = l.getData().indicesOfNearest(
        h[0],
        e,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        r.type === "category" ? 0.5 : null
      ), !v.length)
        return;
      c = l.getData().get(h[0], v[0]);
    }
    if (!(c == null || !isFinite(c))) {
      var d = e - c, g = Math.abs(d);
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
function WI(e, t, r, i) {
  e[t.key] = {
    value: r,
    payloadBatch: i
  };
}
function UI(e, t, r, i) {
  var n = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = to(l), h = e.map[u];
    h || (h = e.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, e.list.push(h)), h.dataByAxis.push({
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
function YI(e, t, r) {
  var i = r.axesInfo = [];
  C(t, function(n, a) {
    var o = n.axisPointerModel.option, s = e[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function XI(e, t, r, i) {
  if (ms(t) || !e.list.length) {
    i({
      type: "hideTip"
    });
    return;
  }
  var n = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  i({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: n.dataIndexInside,
    dataIndex: n.dataIndex,
    seriesIndex: n.seriesIndex,
    dataByCoordSys: e.list
  });
}
function qI(e, t, r) {
  var i = r.getZr(), n = "axisPointerLastHighlights", a = yg(i)[n] || {}, o = yg(i)[n] = {};
  C(e, function(u, h) {
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
  }), l.length && r.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && r.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function ZI(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var i = e[r];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function _g(e) {
  var t = e.axis.model, r = {}, i = r.axisDim = e.axis.dim;
  return r.axisIndex = r[i + "AxisIndex"] = t.componentIndex, r.axisName = r[i + "AxisName"] = t.name, r.axisId = r[i + "AxisId"] = t.id, r;
}
function ms(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function L0(e) {
  w0.registerAxisPointerClass("CartesianAxisPointer", RI), e.registerComponentModel(EI), e.registerComponentView(HI), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !z(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function(t, r) {
    t.getComponent("axisPointer").coordSysAxesInfo = J2(t, r);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, VI);
}
function KI(e) {
  je(vI), je(L0);
}
function jI(e, t) {
  var r = fo(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), e = new bt({
    shape: {
      x: e.x - r[3],
      y: e.y - r[0],
      width: e.width + r[1] + r[3],
      height: e.height + r[0] + r[2],
      r: t.get("borderRadius")
    },
    style: i,
    silent: !0,
    z2: -1
  }), e;
}
var QI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
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
function P0(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function $0(e) {
  if (X.domSupported) {
    for (var t = document.documentElement.style, r = 0, i = e.length; r < i; r++)
      if (e[r] in t)
        return e[r];
  }
}
var R0 = $0(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), JI = $0(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function O0(e, t) {
  if (!e)
    return t;
  t = $m(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function tL(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var eL = O0(JI, "transition"), Pf = O0(R0, "transform"), rL = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (X.transform3dSupported ? "will-change:transform;" : "");
function iL(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function nL(e, t, r) {
  if (!H(r) || r === "inside")
    return "";
  var i = e.get("backgroundColor"), n = e.get("borderWidth");
  t = Oi(t);
  var a = iL(r), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Pf + ":", u;
  vt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, c = o + n, v = c * Math.abs(Math.cos(h)) + c * Math.abs(Math.sin(h)), f = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + f + "px";
  var d = t + " solid " + n + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function aL(e, t) {
  var r = "cubic-bezier(0.23,1,0.32,1)", i = " " + e / 2 + "s " + r, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + e + "s " + r, n += X.transformSupported ? "," + Pf + i : ",left" + i + ",top" + i), eL + ":" + n;
}
function bg(e, t, r) {
  var i = e.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!X.transformSupported)
    return r ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = X.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + Pf + ":" + o + ";" : [["top", 0], ["left", 0], [R0, o]];
}
function oL(e) {
  var t = [], r = e.get("fontSize"), i = e.getTextColor();
  i && t.push("color:" + i), t.push("font:" + e.getFont());
  var n = tt(e.get("lineHeight"), Math.round(r * 3 / 2));
  r && t.push("line-height:" + n + "px");
  var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, l = e.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), C(["decoration", "align"], function(u) {
    var h = e.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function sL(e, t, r) {
  var i = [], n = e.get("transitionDuration"), a = e.get("backgroundColor"), o = e.get("shadowBlur"), s = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), h = e.getModel("textStyle"), c = n_(e, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(aL(n, r)), a && i.push("background-color:" + a), C(["width", "color", "radius"], function(f) {
    var d = "border-" + f, g = $m(d), p = e.get(g);
    p != null && i.push(d + ":" + p + (f === "color" ? "" : "px"));
  }), i.push(oL(h)), c != null && i.push("padding:" + fo(c).join("px ") + "px"), i.join(";") + ";";
}
function wg(e, t, r, i, n) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && L1(e, o, r, i, n);
  } else {
    e[0] = i, e[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var lL = (
  /** @class */
  function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, X.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = r.appendTo, o = a && (H(a) ? document.querySelector(a) : za(a) ? a : Z(a) && a(t.getDom()));
      wg(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
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
    return e.prototype.update = function(t) {
      if (!this._container) {
        var r = this._api.getDom(), i = tL(r, "position"), n = r.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = rL + sL(t, !this._firstShow, this._longHide) + bg(a[0], a[1], !0) + ("border-color:" + Oi(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (H(a) && i.get("trigger") === "item" && !P0(i) && (s = nL(i, n, a)), H(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", z(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          za(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, e.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, e.prototype.getSize = function() {
      var t = this.el;
      return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
    }, e.prototype.moveTo = function(t, r) {
      if (this.el) {
        var i = this._styleCoord;
        if (wg(i, this._zr, this._container, t, r), i[0] != null && i[1] != null) {
          var n = this.el.style, a = bg(i[0], i[1]);
          C(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      var t = this, r = this.el.style;
      r.visibility = "hidden", r.opacity = "0", X.transform3dSupported && (r.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(J(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, e;
  }()
), uL = (
  /** @class */
  function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), xg(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return e.prototype.update = function(t) {
      var r = t.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, e.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function(t, r, i, n, a) {
      var o = this;
      V(t) && jt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new At({
        style: {
          rich: r.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: n_(i, "richText"),
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
    }, e.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, e.prototype.getSize = function() {
      var t = this.el, r = this.el.getBoundingRect(), i = Sg(t.style);
      return [r.width + i.left + i.right, r.height + i.top + i.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        xg(n, this._zr, t, r), t = n[0], r = n[1];
        var a = i.style, o = kr(a.borderWidth || 0), s = Sg(a);
        i.x = t + o + s.left, i.y = r + o + s.top, i.markRedraw();
      }
    }, e.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], r = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
    }, e.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, e.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(J(this.hide, this), t)) : this.hide());
    }, e.prototype.isShow = function() {
      return this._show;
    }, e.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, e;
  }()
);
function kr(e) {
  return Math.max(0, e);
}
function Sg(e) {
  var t = kr(e.shadowBlur || 0), r = kr(e.shadowOffsetX || 0), i = kr(e.shadowOffsetY || 0);
  return {
    left: kr(t - r),
    right: kr(t + r),
    top: kr(t - i),
    bottom: kr(t + i)
  };
}
function xg(e, t, r, i) {
  e[0] = r, e[1] = i, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var hL = new bt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), cL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, i) {
      if (!(X.node || !i.getDom())) {
        var n = r.getComponent("tooltip"), a = this._renderMode = aS(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new uL(i) : new lL(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, i, n) {
      if (!(X.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? o_(this, "_updatePosition", 50, "fixRate") : Xh(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, i = r.get("triggerOn");
      A0("itemTooltip", this._api, J(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var r = this._tooltipModel, i = this._ecModel, n = this._api, a = r.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !n.isDisposed() && o.manuallyShowTip(r, i, n, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(r, i, n, a) {
      if (!(a.from === this.uid || X.node || !n.getDom())) {
        var o = Tg(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = pL(a, i, n);
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
          var h = hL;
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
          if (this._manuallyAxisShowTip(r, i, n, a))
            return;
          var c = I0(a, i), v = c.point[0], f = c.point[1];
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
    }, t.prototype.manuallyHideTip = function(r, i, n, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Tg(a, n));
    }, t.prototype._manuallyAxisShowTip = function(r, i, n, a) {
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
    }, t.prototype._tryShow = function(r, i) {
      var n = r.target, a = this._tooltipModel;
      if (a) {
        this._lastX = r.offsetX, this._lastY = r.offsetY;
        var o = r.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, r);
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
          }, !0), l ? this._showSeriesItemTooltip(r, l, i) : u ? this._showComponentItemTooltip(r, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(r, i) {
      var n = r.get("showDelay");
      i = J(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(r, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = ha([i.tooltipOption], a), l = this._renderMode, u = [], h = Ka("section", {
        blocks: [],
        noHeader: !0
      }), c = [], v = new Ou();
      C(r, function(m) {
        C(m.dataByAxis, function(_) {
          var b = n.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!b || S == null)) {
            var w = M0(S, b.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = Ka("section", {
              header: w,
              noHeader: !Ue(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), C(_.seriesDataIndices, function(M) {
              var D = n.getSeriesByIndex(M.seriesIndex), A = M.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = Cf(b.axis, {
                  value: S
                }), T.axisValueLabel = w, T.marker = v.makeTooltipMarker("item", Oi(T.color), l);
                var I = Bd(D.formatTooltip(A, !0, null)), P = I.frag;
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
      var f = i.position, d = s.get("order"), g = Gd(h, v, l, d, n.get("useUTC"), s.get("textStyle"));
      g && c.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", y = c.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, f, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], f, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, i, n) {
      var a = this._ecModel, o = ot(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, c = o.dataType, v = u.getData(c), f = this._renderMode, d = r.positionDefault, g = ha([v.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var y = u.getDataParams(h, c), m = new Ou();
        y.marker = m.makeTooltipMarker("item", Oi(y.color), f);
        var _ = Bd(u.formatTooltip(h, !1, c)), b = g.get("order"), S = g.get("valueFormatter"), w = _.frag, x = w ? Gd(S ? N({
          valueFormatter: S
        }, w) : w, m, f, b, a.get("useUTC"), g.get("textStyle")) : _.text, M = "item_" + u.name + "_" + h;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, x, y, M, r.offsetX, r.offsetY, r.position, r.target, m);
        }), n({
          type: "showTip",
          dataIndexInside: h,
          dataIndex: v.getRawIndex(h),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(r, i, n) {
      var a = this._renderMode === "html", o = ot(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (H(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = q(l), l.content = Zt(l.content));
      var c = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && c.push(v), c.push({
        formatter: l.content
      });
      var f = r.positionDefault, d = ha(c, this._tooltipModel, f ? {
        position: f
      } : null), g = d.get("content"), p = Math.random() + "", y = new Ou();
      this._showOrMove(d, function() {
        var m = q(d.get("formatterParams") || {});
        this._showTooltipContent(d, g, m, p, r.offsetX, r.offsetY, r.position, i, y);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(r, i, n, a, o, s, l, u, h) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var c = this._tooltipContent;
        c.setEnterable(r.get("enterable"));
        var v = r.get("formatter");
        l = l || r.get("position");
        var f = i, d = this._getNearestPoint([o, s], n, r.get("trigger"), r.get("borderColor")), g = d.color;
        if (v)
          if (H(v)) {
            var p = r.ecModel.get("useUTC"), y = z(n) ? n[0] : n, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            f = v, m && (f = bl(y.axisValue, f, p)), f = Rm(f, n, !0);
          } else if (Z(v)) {
            var _ = J(function(b, S) {
              b === this._ticket && (c.setContent(S, h, r, g, l), this._updatePosition(r, l, o, s, c, n, u));
            }, this);
            this._ticket = a, f = v(n, a, _);
          } else
            f = v;
        c.setContent(f, h, r, g, l), c.show(r, g), this._updatePosition(r, l, o, s, c, n, u);
      }
    }, t.prototype._getNearestPoint = function(r, i, n, a) {
      if (n === "axis" || z(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!z(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(r, i, n, a, o, s, l) {
      var u = this._api.getWidth(), h = this._api.getHeight();
      i = i || r.get("position");
      var c = o.getSize(), v = r.get("align"), f = r.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), Z(i) && (i = i([n, a], s, o.el, d, {
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
        var y = dL(i, d, c, r.get("borderWidth"));
        n = y[0], a = y[1];
      } else {
        var y = fL(n, a, o, u, h, v ? null : 20, f ? null : 20);
        n = y[0], a = y[1];
      }
      if (v && (n -= Cg(v) ? c[0] / 2 : v === "right" ? c[0] : 0), f && (a -= Cg(f) ? c[1] / 2 : f === "bottom" ? c[1] : 0), P0(r)) {
        var y = vL(n, a, o, u, h);
        n = y[0], a = y[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === r.length;
      return o && C(n, function(s, l) {
        var u = s.dataByAxis || [], h = r[l] || {}, c = h.dataByAxis || [];
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
      }), this._lastDataByCoordSys = r, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(r, i) {
      X.node || !i.getDom() || (Xh(this, "_updatePosition"), this._tooltipContent.dispose(), vc("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(Oe)
);
function ha(e, t, r) {
  var i = t.ecModel, n;
  r ? (n = new xt(r, i, i), n = new xt(t.option, n, i)) : n = t;
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o && (o instanceof xt && (o = o.get("tooltip", !0)), H(o) && (o = {
      formatter: o
    }), o && (n = new xt(o, n, i)));
  }
  return n;
}
function Tg(e, t) {
  return e.dispatchAction || J(t.dispatchAction, t);
}
function fL(e, t, r, i, n, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > i ? e -= l + a : e += a), o != null && (t + u + o > n ? t -= u + o : t += o), [e, t];
}
function vL(e, t, r, i, n) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, i) - o, t = Math.min(t + s, n) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function dL(e, t, r, i) {
  var n = r[0], a = r[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, h = t.height;
  switch (e) {
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
function Cg(e) {
  return e === "center" || e === "middle";
}
function pL(e, t, r) {
  var i = Vc(e).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = lo(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var h = ot(u).tooltipConfig;
        if (h && h.name === e.name)
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
function gL(e) {
  je(L0), e.registerComponentModel(QI), e.registerComponentView(cL), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Wt), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Wt);
}
var Mg = C;
function Dg(e) {
  if (e) {
    for (var t in e)
      if (e.hasOwnProperty(t))
        return !0;
  }
}
function Ag(e, t, r) {
  var i = {};
  return Mg(t, function(a) {
    var o = i[a] = n();
    Mg(e[a], function(s, l) {
      if (Bt.isValidType(l)) {
        var u = {
          type: l,
          visual: s
        };
        r && r(u, a), o[l] = new Bt(u), l === "opacity" && (u = q(u), u.type = "colorAlpha", o.__hidden.__alphaForOpacity = new Bt(u));
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
function yL(e, t, r) {
  var i;
  C(r, function(n) {
    t.hasOwnProperty(n) && Dg(t[n]) && (i = !0);
  }), i && C(r, function(n) {
    t.hasOwnProperty(n) && Dg(t[n]) ? e[n] = q(t[n]) : delete e[n];
  });
}
function mL(e, t, r, i) {
  var n = {};
  return C(e, function(a) {
    var o = Bt.prepareVisualTypes(t[a]);
    n[a] = o;
  }), {
    progress: function(o, s) {
      var l;
      i != null && (l = s.getDimensionIndex(i));
      function u(S) {
        return d_(s, c, S);
      }
      function h(S, w) {
        IM(s, c, S, w);
      }
      for (var c, v = s.getStore(); (c = o.next()) != null; ) {
        var f = s.getRawDataItem(c);
        if (!(f && f.visualMap === !1))
          for (var d = i != null ? v.get(l, c) : c, g = r(d), p = t[g], y = n[g], m = 0, _ = y.length; m < _; m++) {
            var b = y[m];
            p[b] && p[b].applyVisual(d, u, h);
          }
      }
    }
  };
}
var _L = function(e, t) {
  if (t === "all")
    return {
      type: "all",
      title: e.getLocaleModel().get(["legend", "selector", "all"])
    };
  if (t === "inverse")
    return {
      type: "inverse",
      title: e.getLocaleModel().get(["legend", "selector", "inverse"])
    };
}, dc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.layoutMode = {
        type: "box",
        // legend.width/height are maxWidth/maxHeight actually,
        // whereas real width/height is calculated by its content.
        // (Setting {left: 10, right: 10} does not make sense).
        // So consider the case:
        // `setOption({legend: {left: 10});`
        // then `setOption({legend: {right: 10});`
        // The previous `left` should be cleared by setting `ignoreSize`.
        ignoreSize: !0
      }, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n), r.selected = r.selected || {}, this._updateSelector(r);
    }, t.prototype.mergeOption = function(r, i) {
      e.prototype.mergeOption.call(this, r, i), this._updateSelector(r);
    }, t.prototype._updateSelector = function(r) {
      var i = r.selector, n = this.ecModel;
      i === !0 && (i = r.selector = ["all", "inverse"]), z(i) && C(i, function(a, o) {
        H(a) && (a = {
          type: a
        }), i[o] = nt(a, _L(n, a.type));
      });
    }, t.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var r = this._data;
      if (r[0] && this.get("selectedMode") === "single") {
        for (var i = !1, n = 0; n < r.length; n++) {
          var a = r[n].get("name");
          if (this.isSelected(a)) {
            this.select(a), i = !0;
            break;
          }
        }
        !i && this.select(r[0].get("name"));
      }
    }, t.prototype._updateData = function(r) {
      var i = [], n = [];
      r.eachRawSeries(function(l) {
        var u = l.name;
        n.push(u);
        var h;
        if (l.legendVisualProvider) {
          var c = l.legendVisualProvider, v = c.getAllNames();
          r.isSeriesFiltered(l) || (n = n.concat(v)), v.length ? i = i.concat(v) : h = !0;
        } else
          h = !0;
        h && Hc(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = Q(), s = U(a, function(l) {
        return (H(l) || yt(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new xt(l, this, this.ecModel));
      }, this);
      this._data = Pt(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(r) {
      var i = this.option.selected, n = this.get("selectedMode");
      if (n === "single") {
        var a = this._data;
        C(a, function(o) {
          i[o.get("name")] = !1;
        });
      }
      i[r] = !0;
    }, t.prototype.unSelect = function(r) {
      this.get("selectedMode") !== "single" && (this.option.selected[r] = !1);
    }, t.prototype.toggleSelected = function(r) {
      var i = this.option.selected;
      i.hasOwnProperty(r) || (i[r] = !0), this[i[r] ? "unSelect" : "select"](r);
    }, t.prototype.allSelect = function() {
      var r = this._data, i = this.option.selected;
      C(r, function(n) {
        i[n.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var r = this._data, i = this.option.selected;
      C(r, function(n) {
        var a = n.get("name", !0);
        i.hasOwnProperty(a) || (i[a] = !0), i[a] = !i[a];
      });
    }, t.prototype.isSelected = function(r) {
      var i = this.option.selected;
      return !(i.hasOwnProperty(r) && !i[r]) && vt(this._availableNames, r) >= 0;
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
), an = Dt, pc = C, es = Ct, E0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !1, r;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new es()), this.group.add(this._selectorGroup = new es()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, t.prototype.render = function(r, i, n) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!r.get("show", !0)) {
        var o = r.get("align"), s = r.get("orient");
        (!o || o === "auto") && (o = r.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = r.get("selector", !0), u = r.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, r, i, n, l, s, u);
        var h = r.getBoxLayoutParams(), c = {
          width: n.getWidth(),
          height: n.getHeight()
        }, v = r.get("padding"), f = In(h, c, v), d = this.layoutInner(r, o, f, a, l, u), g = In(ut({
          width: d.width,
          height: d.height
        }, h), c, v);
        this.group.x = g.x - d.x, this.group.y = g.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = jI(d, r));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(r, i, n, a, o, s, l) {
      var u = this.getContentGroup(), h = Q(), c = i.get("selectedMode"), v = [];
      n.eachRawSeries(function(f) {
        !f.get("legendHoverLink") && v.push(f.id);
      }), pc(i.getData(), function(f, d) {
        var g = f.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var p = new es();
          p.newline = !0, u.add(p);
          return;
        }
        var y = n.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), S = m.getVisual("style"), w = this._createItem(y, g, d, f, i, r, _, S, b, c, a);
            w.on("click", an(Ig, g, null, a, v)).on("mouseover", an(gc, y.name, null, a, v)).on("mouseout", an(yc, y.name, null, a, v)), n.ssr && w.eachChild(function(x) {
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
                  fill: fr(I, "rgba")
                }));
                var P = this._createItem(x, g, d, f, i, r, {}, A, T, c, a);
                P.on("click", an(Ig, null, g, a, v)).on("mouseover", an(gc, null, g, a, v)).on("mouseout", an(yc, null, g, a, v)), n.ssr && P.eachChild(function($) {
                  var R = ot($);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = d, R.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(r, i, n, a, o) {
      var s = this.getSelectorGroup();
      pc(r, function(u) {
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
        co(c, {
          normal: v,
          emphasis: f
        }, {
          defaultText: u.title
        }), Oh(c);
      });
    }, t.prototype._createItem = function(r, i, n, a, o, s, l, u, h, c, v) {
      var f = r.visualDrawType, d = o.get("itemWidth"), g = o.get("itemHeight"), p = o.isSelected(i), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = bL(h, a, l, u, f, p, v), S = new es(), w = a.getModel("textStyle");
      if (Z(r.getLegendIcon) && (!_ || _ === "inherit"))
        S.add(r.getLegendIcon({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: y,
          itemStyle: b.itemStyle,
          lineStyle: b.lineStyle,
          symbolKeepAspect: m
        }));
      else {
        var x = _ === "inherit" && r.getData().getVisual("symbol") ? y === "inherit" ? r.getData().getVisual("symbolRotate") : y : 0;
        S.add(wL({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var M = s === "left" ? d + 5 : -5, D = s, A = o.get("formatter"), T = i;
      H(A) && A ? T = A.replace("{name}", i ?? "") : Z(A) && (T = A(i));
      var I = p ? w.getTextColor() : a.get("inactiveColor");
      S.add(new At({
        style: Xe(w, {
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
      return $.get("show") && pl({
        el: P,
        componentModel: o,
        itemName: i,
        itemTooltipOption: $.option
      }), S.add(P), S.eachChild(function(R) {
        R.silent = !0;
      }), P.silent = !c, this.getContentGroup().add(S), Oh(S), S.__legendDataIndex = n, S;
    }, t.prototype.layoutInner = function(r, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      xn(r.get("orient"), l, r.get("itemGap"), n.width, n.height);
      var h = l.getBoundingRect(), c = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        xn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          r.get("selectorItemGap", !0)
        );
        var v = u.getBoundingRect(), f = [-v.x, -v.y], d = r.get("selectorButtonGap", !0), g = r.getOrient().index, p = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
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
function bL(e, t, r, i, n, a, o) {
  function s(p, y) {
    p.lineWidth === "auto" && (p.lineWidth = y.lineWidth > 0 ? 2 : 0), pc(p, function(m, _) {
      p[_] === "inherit" && (p[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = e.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", c = l.getShallow("decal");
  u.decal = !c || c === "inherit" ? i.decal : Qh(c, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[h]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : r).opacity), s(u, i);
  var v = t.getModel("lineStyle"), f = v.getLineStyle();
  if (s(f, r), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), f.stroke === "auto" && (f.stroke = i.fill), !a) {
    var d = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = d === "auto" ? i.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), f.stroke = v.get("inactiveColor"), f.lineWidth = v.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: f
  };
}
function wL(e) {
  var t = e.icon || "roundRect", r = yr(t, 0, 0, e.itemWidth, e.itemHeight, e.itemStyle.fill, e.symbolKeepAspect);
  return r.setStyle(e.itemStyle), r.rotation = (e.iconRotate || 0) * Math.PI / 180, r.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), t.indexOf("empty") > -1 && (r.style.stroke = r.style.fill, r.style.fill = "#fff", r.style.lineWidth = 2), r;
}
function Ig(e, t, r, i) {
  yc(e, t, r, i), r.dispatchAction({
    type: "legendToggleSelect",
    name: e ?? t
  }), gc(e, t, r, i);
}
function k0(e) {
  for (var t = e.getZr().storage.getDisplayList(), r, i = 0, n = t.length; i < n && !(r = t[i].states.emphasis); )
    i++;
  return r && r.hoverLayer;
}
function gc(e, t, r, i) {
  k0(r) || r.dispatchAction({
    type: "highlight",
    seriesName: e,
    name: t,
    excludeSeriesId: i
  });
}
function yc(e, t, r, i) {
  k0(r) || r.dispatchAction({
    type: "downplay",
    seriesName: e,
    name: t,
    excludeSeriesId: i
  });
}
function SL(e) {
  var t = e.findComponents({
    mainType: "legend"
  });
  t && t.length && e.filterSeries(function(r) {
    for (var i = 0; i < t.length; i++)
      if (!t[i].isSelected(r.name))
        return !1;
    return !0;
  });
}
function ca(e, t, r) {
  var i = e === "allSelect" || e === "inverseSelect", n = {}, a = [];
  r.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[e]() : s[e](t.name), Lg(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return r.eachComponent("legend", function(s) {
    C(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), Lg(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function Lg(e, t) {
  var r = t || {};
  return C(e.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = e.isSelected(n);
      Pi(r, n) ? r[n] = r[n] && a : r[n] = a;
    }
  }), r;
}
function xL(e) {
  e.registerAction("legendToggleSelect", "legendselectchanged", Dt(ca, "toggleSelected")), e.registerAction("legendAllSelect", "legendselectall", Dt(ca, "allSelect")), e.registerAction("legendInverseSelect", "legendinverseselect", Dt(ca, "inverseSelect")), e.registerAction("legendSelect", "legendselected", Dt(ca, "select")), e.registerAction("legendUnSelect", "legendunselected", Dt(ca, "unSelect"));
}
function N0(e) {
  e.registerComponentModel(dc), e.registerComponentView(E0), e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, SL), e.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), xL(e);
}
var TL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.setScrollDataIndex = function(r) {
      this.option.scrollDataIndex = r;
    }, t.prototype.init = function(r, i, n) {
      var a = Cl(r);
      e.prototype.init.call(this, r, i, n), Pg(this, r, a);
    }, t.prototype.mergeOption = function(r, i) {
      e.prototype.mergeOption.call(this, r, i), Pg(this, this.option, r);
    }, t.type = "legend.scroll", t.defaultOption = _l(dc.defaultOption, {
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
  }(dc)
);
function Pg(e, t, r) {
  var i = e.getOrient(), n = [1, 1];
  n[i.index] = 0, Ln(t, r, {
    type: "box",
    ignoreSize: !!n
  });
}
var $g = Ct, nh = ["width", "height"], ah = ["x", "y"], CL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !0, r._currentIndex = 0, r;
    }
    return t.prototype.init = function() {
      e.prototype.init.call(this), this.group.add(this._containerGroup = new $g()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new $g());
    }, t.prototype.resetInner = function() {
      e.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(r, i, n, a, o, s, l) {
      var u = this;
      e.prototype.renderInner.call(this, r, i, n, a, o, s, l);
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
        var y = g + "DataIndex", m = rf(i.get("pageIcons", !0)[i.getOrient().name][p], {
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
    }, t.prototype.layoutInner = function(r, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = r.getOrient().index, h = nh[u], c = ah[u], v = nh[1 - u], f = ah[1 - u];
      o && xn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        r.get("selectorItemGap", !0)
      );
      var d = r.get("selectorButtonGap", !0), g = l.getBoundingRect(), p = [-g.x, -g.y], y = q(n);
      o && (y[h] = n[h] - g[h] - d);
      var m = this._layoutContentAndController(r, a, y, u, h, v, f, c);
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
    }, t.prototype._layoutContentAndController = function(r, i, n, a, o, s, l, u) {
      var h = this.getContentGroup(), c = this._containerGroup, v = this._controllerGroup;
      xn(r.get("orient"), h, r.get("itemGap"), a ? n.width : null, a ? null : n.height), xn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        v,
        r.get("pageButtonItemGap", !0)
      );
      var f = h.getBoundingRect(), d = v.getBoundingRect(), g = this._showController = f[o] > n[o], p = [-f.x, -f.y];
      i || (p[a] = h[u]);
      var y = [0, 0], m = [-d.x, -d.y], _ = tt(r.get("pageButtonGap", !0), r.get("itemGap", !0));
      if (g) {
        var b = r.get("pageButtonPosition", !0);
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
      var x = this._getPageInfo(r);
      return x.pageIndex != null && se(
        h,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        g ? r : null
      ), this._updatePageInfoView(r, x), S;
    }, t.prototype._pageGo = function(r, i, n) {
      var a = this._getPageInfo(i)[r];
      a != null && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: i.id
      });
    }, t.prototype._updatePageInfoView = function(r, i) {
      var n = this._controllerGroup;
      C(["pagePrev", "pageNext"], function(h) {
        var c = h + "DataIndex", v = i[c] != null, f = n.childOfName(h);
        f && (f.setStyle("fill", v ? r.get("pageIconColor", !0) : r.get("pageIconInactiveColor", !0)), f.cursor = v ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = r.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", H(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(r) {
      var i = r.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = r.getOrient().index, s = nh[o], l = ah[o], u = this._findTargetItemIndex(i), h = n.children(), c = h[u], v = h.length, f = v ? 1 : 0, d = {
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
    }, t.prototype._findTargetItemIndex = function(r) {
      if (!this._showController)
        return 0;
      var i, n = this.getContentGroup(), a;
      return n.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === r && (i = s);
      }), i ?? a;
    }, t.type = "legend.scroll", t;
  }(E0)
);
function ML(e) {
  e.registerAction("legendScroll", "legendscroll", function(t, r) {
    var i = t.scrollDataIndex;
    i != null && r.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function(n) {
      n.setScrollDataIndex(i);
    });
  });
}
function DL(e) {
  je(N0), e.registerComponentModel(TL), e.registerComponentView(CL), ML(e);
}
function AL(e) {
  je(N0), je(DL);
}
var B0 = {
  /**
   * @public
   */
  get: function(e, t, r) {
    var i = q((IL[e] || {})[t]);
    return r && z(i) ? i[i.length - 1] : i;
  }
}, IL = {
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
}, Rg = Bt.mapVisual, LL = Bt.eachVisual, PL = z, Og = C, $L = Ry, RL = dr, js = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.stateList = ["inRange", "outOfRange"], r.replacableOptionKeys = ["inRange", "outOfRange", "target", "controller", "color"], r.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, r.dataBound = [-1 / 0, 1 / 0], r.targetVisuals = {}, r.controllerVisuals = {}, r;
    }
    return t.prototype.init = function(r, i, n) {
      this.mergeDefaultAndTheme(r, n);
    }, t.prototype.optionUpdated = function(r, i) {
      var n = this.option;
      !i && yL(n, r, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();
    }, t.prototype.resetVisual = function(r) {
      var i = this.stateList;
      r = J(r, this), this.controllerVisuals = Ag(this.option.controller, i, r), this.targetVisuals = Ag(this.option.target, i, r);
    }, t.prototype.getItemSymbol = function() {
      return null;
    }, t.prototype.getTargetSeriesIndices = function() {
      var r = this.option.seriesIndex, i = [];
      return r == null || r === "all" ? this.ecModel.eachSeries(function(n, a) {
        i.push(a);
      }) : i = Rt(r), i;
    }, t.prototype.eachTargetSeries = function(r, i) {
      C(this.getTargetSeriesIndices(), function(n) {
        var a = this.ecModel.getSeriesByIndex(n);
        a && r.call(i, a);
      }, this);
    }, t.prototype.isTargetSeries = function(r) {
      var i = !1;
      return this.eachTargetSeries(function(n) {
        n === r && (i = !0);
      }), i;
    }, t.prototype.formatValueText = function(r, i, n) {
      var a = this.option, o = a.precision, s = this.dataBound, l = a.formatter, u;
      n = n || ["<", ">"], z(r) && (r = r.slice(), u = !0);
      var h = i ? r : u ? [c(r[0]), c(r[1])] : c(r);
      if (H(l))
        return l.replace("{value}", u ? h[0] : h).replace("{value2}", u ? h[1] : h);
      if (Z(l))
        return u ? l(r[0], r[1]) : l(r);
      if (u)
        return r[0] === s[0] ? n[0] + " " + h[1] : r[1] === s[1] ? n[1] + " " + h[0] : h[0] + " - " + h[1];
      return h;
      function c(v) {
        return v === s[0] ? "min" : v === s[1] ? "max" : (+v).toFixed(Math.min(o, 20));
      }
    }, t.prototype.resetExtent = function() {
      var r = this.option, i = $L([r.min, r.max]);
      this._dataExtent = i;
    }, t.prototype.getDataDimensionIndex = function(r) {
      var i = this.option.dimension;
      if (i != null)
        return r.getDimensionIndex(i);
      for (var n = r.dimensions, a = n.length - 1; a >= 0; a--) {
        var o = n[a], s = r.getDimensionInfo(o);
        if (!s.isCalculationCoord)
          return s.storeDimIndex;
      }
    }, t.prototype.getExtent = function() {
      return this._dataExtent.slice();
    }, t.prototype.completeVisualOption = function() {
      var r = this.ecModel, i = this.option, n = {
        inRange: i.inRange,
        outOfRange: i.outOfRange
      }, a = i.target || (i.target = {}), o = i.controller || (i.controller = {});
      nt(a, n), nt(o, n);
      var s = this.isCategory();
      l.call(this, a), l.call(this, o), u.call(this, a, "inRange", "outOfRange"), h.call(this, o);
      function l(c) {
        PL(i.color) && !c.inRange && (c.inRange = {
          color: i.color.slice().reverse()
        }), c.inRange = c.inRange || {
          color: r.get("gradientColor")
        };
      }
      function u(c, v, f) {
        var d = c[v], g = c[f];
        d && !g && (g = c[f] = {}, Og(d, function(p, y) {
          if (Bt.isValidType(y)) {
            var m = B0.get(y, "inactive", s);
            m != null && (g[y] = m, y === "color" && !g.hasOwnProperty("opacity") && !g.hasOwnProperty("colorAlpha") && (g.opacity = [0, 0]));
          }
        }));
      }
      function h(c) {
        var v = (c.inRange || {}).symbol || (c.outOfRange || {}).symbol, f = (c.inRange || {}).symbolSize || (c.outOfRange || {}).symbolSize, d = this.get("inactiveColor"), g = this.getItemSymbol(), p = g || "roundRect";
        Og(this.stateList, function(y) {
          var m = this.itemSize, _ = c[y];
          _ || (_ = c[y] = {
            color: s ? d : [d]
          }), _.symbol == null && (_.symbol = v && q(v) || (s ? p : [p])), _.symbolSize == null && (_.symbolSize = f && q(f) || (s ? m[0] : [m[0], m[0]])), _.symbol = Rg(_.symbol, function(w) {
            return w === "none" ? p : w;
          });
          var b = _.symbolSize;
          if (b != null) {
            var S = -1 / 0;
            LL(b, function(w) {
              w > S && (S = w);
            }), _.symbolSize = Rg(b, function(w) {
              return RL(w, [0, S], [0, m[0]], !0);
            });
          }
        }, this);
      }
    }, t.prototype.resetItemSize = function() {
      this.itemSize = [parseFloat(this.get("itemWidth")), parseFloat(this.get("itemHeight"))];
    }, t.prototype.isCategory = function() {
      return !!this.option.categories;
    }, t.prototype.setSelected = function(r) {
    }, t.prototype.getSelected = function() {
      return null;
    }, t.prototype.getValueState = function(r) {
      return null;
    }, t.prototype.getVisualMeta = function(r) {
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
), Eg = [20, 140], OL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.optionUpdated = function(r, i) {
      e.prototype.optionUpdated.apply(this, arguments), this.resetExtent(), this.resetVisual(function(n) {
        n.mappingMethod = "linear", n.dataExtent = this.getExtent();
      }), this._resetRange();
    }, t.prototype.resetItemSize = function() {
      e.prototype.resetItemSize.apply(this, arguments);
      var r = this.itemSize;
      (r[0] == null || isNaN(r[0])) && (r[0] = Eg[0]), (r[1] == null || isNaN(r[1])) && (r[1] = Eg[1]);
    }, t.prototype._resetRange = function() {
      var r = this.getExtent(), i = this.option.range;
      !i || i.auto ? (r.auto = 1, this.option.range = r) : z(i) && (i[0] > i[1] && i.reverse(), i[0] = Math.max(i[0], r[0]), i[1] = Math.min(i[1], r[1]));
    }, t.prototype.completeVisualOption = function() {
      e.prototype.completeVisualOption.apply(this, arguments), C(this.stateList, function(r) {
        var i = this.option.controller[r].symbolSize;
        i && i[0] !== i[1] && (i[0] = i[1] / 3);
      }, this);
    }, t.prototype.setSelected = function(r) {
      this.option.range = r.slice(), this._resetRange();
    }, t.prototype.getSelected = function() {
      var r = this.getExtent(), i = Ry((this.get("range") || []).slice());
      return i[0] > r[1] && (i[0] = r[1]), i[1] > r[1] && (i[1] = r[1]), i[0] < r[0] && (i[0] = r[0]), i[1] < r[0] && (i[1] = r[0]), i;
    }, t.prototype.getValueState = function(r) {
      var i = this.option.range, n = this.getExtent();
      return (i[0] <= n[0] || i[0] <= r) && (i[1] >= n[1] || r <= i[1]) ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(r) {
      var i = [];
      return this.eachTargetSeries(function(n) {
        var a = [], o = n.getData();
        o.each(this.getDataDimensionIndex(o), function(s, l) {
          r[0] <= s && s <= r[1] && a.push(l);
        }, this), i.push({
          seriesId: n.id,
          dataIndex: a
        });
      }, this), i;
    }, t.prototype.getVisualMeta = function(r) {
      var i = kg(this, "outOfRange", this.getExtent()), n = kg(this, "inRange", this.option.range.slice()), a = [];
      function o(f, d) {
        a.push({
          value: f,
          color: r(f, d)
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
    }, t.type = "visualMap.continuous", t.defaultOption = _l(js.defaultOption, {
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
  }(js)
);
function kg(e, t, r) {
  if (r[0] === r[1])
    return r.slice();
  for (var i = 200, n = (r[1] - r[0]) / i, a = r[0], o = [], s = 0; s <= i && a < r[1]; s++)
    o.push(a), a += n;
  return o.push(r[1]), o;
}
var z0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.autoPositionValues = {
        left: 1,
        right: 1,
        top: 1,
        bottom: 1
      }, r;
    }
    return t.prototype.init = function(r, i) {
      this.ecModel = r, this.api = i;
    }, t.prototype.render = function(r, i, n, a) {
      if (this.visualMapModel = r, r.get("show") === !1) {
        this.group.removeAll();
        return;
      }
      this.doRender(r, i, n, a);
    }, t.prototype.renderBackground = function(r) {
      var i = this.visualMapModel, n = fo(i.get("padding") || 0), a = r.getBoundingRect();
      r.add(new bt({
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
    }, t.prototype.getControllerVisual = function(r, i, n) {
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
      var c = o.controllerVisuals[a || o.getValueState(r)], v = Bt.prepareVisualTypes(c);
      return C(v, function(f) {
        var d = c[f];
        n.convertOpacityToAlpha && f === "opacity" && (f = "colorAlpha", d = c.__alphaForOpacity), Bt.dependsOn(f, i) && d && d.applyVisual(r, u, h);
      }), s[i];
    }, t.prototype.positionGroup = function(r) {
      var i = this.visualMapModel, n = this.api;
      HT(r, i.getBoxLayoutParams(), {
        width: n.getWidth(),
        height: n.getHeight()
      });
    }, t.prototype.doRender = function(r, i, n, a) {
    }, t.type = "visualMap", t;
  }(Oe)
), Ng = [["left", "right", "width"], ["top", "bottom", "height"]];
function F0(e, t, r) {
  var i = e.option, n = i.align;
  if (n != null && n !== "auto")
    return n;
  for (var a = {
    width: t.getWidth(),
    height: t.getHeight()
  }, o = i.orient === "horizontal" ? 1 : 0, s = Ng[o], l = [0, null, 10], u = {}, h = 0; h < 3; h++)
    u[Ng[1 - o][h]] = l[h], u[s[h]] = h === 2 ? r[0] : i[s[h]];
  var c = [["x", "width", 3], ["y", "height", 0]][o], v = In(u, a, i.padding);
  return s[(v.margin[c[2]] || 0) + v[c[0]] + v[c[1]] * 0.5 < a[c[1]] * 0.5 ? 0 : 1];
}
function _s(e, t) {
  return C(e || [], function(r) {
    r.dataIndex != null && (r.dataIndexInside = r.dataIndex, r.dataIndex = null), r.highlightKey = "visualMap" + (t ? t.componentIndex : "");
  }), e;
}
var Ve = dr, EL = C, Bg = Math.min, oh = Math.max, kL = 12, NL = 6, BL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r._shapes = {}, r._dataInterval = [], r._handleEnds = [], r._hoverLinkDataIndices = [], r;
    }
    return t.prototype.init = function(r, i) {
      e.prototype.init.call(this, r, i), this._hoverLinkFromSeriesMouseOver = J(this._hoverLinkFromSeriesMouseOver, this), this._hideIndicator = J(this._hideIndicator, this);
    }, t.prototype.doRender = function(r, i, n, a) {
      (!a || a.type !== "selectDataRange" || a.from !== this.uid) && this._buildView();
    }, t.prototype._buildView = function() {
      this.group.removeAll();
      var r = this.visualMapModel, i = this.group;
      this._orient = r.get("orient"), this._useHandle = r.get("calculable"), this._resetInterval(), this._renderBar(i);
      var n = r.get("text");
      this._renderEndsText(i, n, 0), this._renderEndsText(i, n, 1), this._updateView(!0), this.renderBackground(i), this._updateView(), this._enableHoverLinkToSeries(), this._enableHoverLinkFromSeries(), this.positionGroup(i);
    }, t.prototype._renderEndsText = function(r, i, n) {
      if (i) {
        var a = i[1 - n];
        a = a != null ? a + "" : "";
        var o = this.visualMapModel, s = o.get("textGap"), l = o.itemSize, u = this._shapes.mainGroup, h = this._applyTransform([l[0] / 2, n === 0 ? -s : l[1] + s], u), c = this._applyTransform(n === 0 ? "bottom" : "top", u), v = this._orient, f = this.visualMapModel.textStyleModel;
        this.group.add(new At({
          style: Xe(f, {
            x: h[0],
            y: h[1],
            verticalAlign: v === "horizontal" ? "middle" : c,
            align: v === "horizontal" ? c : "center",
            text: a
          })
        }));
      }
    }, t.prototype._renderBar = function(r) {
      var i = this.visualMapModel, n = this._shapes, a = i.itemSize, o = this._orient, s = this._useHandle, l = F0(i, this.api, a), u = n.mainGroup = this._createBarGroup(l), h = new Ct();
      u.add(h), h.add(n.outOfRange = zg()), h.add(n.inRange = zg(null, s ? Hg(this._orient) : null, J(this._dragHandle, this, "all", !1), J(this._dragHandle, this, "all", !0))), h.setClipPath(new bt({
        shape: {
          x: 0,
          y: 0,
          width: a[0],
          height: a[1],
          r: 3
        }
      }));
      var c = i.textStyleModel.getTextRect("国"), v = oh(c.width, c.height);
      s && (n.handleThumbs = [], n.handleLabels = [], n.handleLabelPoints = [], this._createHandle(i, u, 0, a, v, o), this._createHandle(i, u, 1, a, v, o)), this._createIndicator(i, u, a, v, o), r.add(u);
    }, t.prototype._createHandle = function(r, i, n, a, o, s) {
      var l = J(this._dragHandle, this, n, !1), u = J(this._dragHandle, this, n, !0), h = Ze(r.get("handleSize"), a[0]), c = yr(r.get("handleIcon"), -h / 2, -h / 2, h, h, null, !0), v = Hg(this._orient);
      c.attr({
        cursor: v,
        draggable: !0,
        drift: l,
        ondragend: u,
        onmousemove: function(y) {
          Fa(y.event);
        }
      }), c.x = a[0] / 2, c.useStyle(r.getModel("handleStyle").getItemStyle()), c.setStyle({
        strokeNoScale: !0,
        strokeFirst: !0
      }), c.style.lineWidth *= 2, c.ensureState("emphasis").style = r.getModel(["emphasis", "handleStyle"]).getItemStyle(), qc(c, !0), i.add(c);
      var f = this.visualMapModel.textStyleModel, d = new At({
        cursor: v,
        draggable: !0,
        drift: l,
        onmousemove: function(y) {
          Fa(y.event);
        },
        ondragend: u,
        style: Xe(f, {
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
    }, t.prototype._createIndicator = function(r, i, n, a, o) {
      var s = Ze(r.get("indicatorSize"), n[0]), l = yr(r.get("indicatorIcon"), -s / 2, -s / 2, s, s, null, !0);
      l.attr({
        cursor: "move",
        invisible: !0,
        silent: !0,
        x: n[0] / 2
      });
      var u = r.getModel("indicatorStyle").getItemStyle();
      if (l instanceof rr) {
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
        style: Xe(c, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      this.group.add(v);
      var f = [(o === "horizontal" ? a / 2 : NL) + n[0] / 2, 0], d = this._shapes;
      d.indicator = l, d.indicatorLabel = v, d.indicatorLabelPoint = f, this._firstShowIndicator = !0;
    }, t.prototype._dragHandle = function(r, i, n, a) {
      if (this._useHandle) {
        if (this._dragging = !i, !i) {
          var o = this._applyTransform([n, a], this._shapes.mainGroup, !0);
          this._updateInterval(r, o[1]), this._hideIndicator(), this._updateView();
        }
        i === !this.visualMapModel.get("realtime") && this.api.dispatchAction({
          type: "selectDataRange",
          from: this.uid,
          visualMapId: this.visualMapModel.id,
          selected: this._dataInterval.slice()
        }), i ? !this._hovering && this._clearHoverLinkToSeries() : Fg(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[r], !1);
      }
    }, t.prototype._resetInterval = function() {
      var r = this.visualMapModel, i = this._dataInterval = r.getSelected(), n = r.getExtent(), a = [0, r.itemSize[1]];
      this._handleEnds = [Ve(i[0], n, a, !0), Ve(i[1], n, a, !0)];
    }, t.prototype._updateInterval = function(r, i) {
      i = i || 0;
      var n = this.visualMapModel, a = this._handleEnds, o = [0, n.itemSize[1]];
      mI(
        i,
        a,
        o,
        r,
        // cross is forbidden
        0
      );
      var s = n.getExtent();
      this._dataInterval = [Ve(a[0], o, s, !0), Ve(a[1], o, s, !0)];
    }, t.prototype._updateView = function(r) {
      var i = this.visualMapModel, n = i.getExtent(), a = this._shapes, o = [0, i.itemSize[1]], s = r ? o : this._handleEnds, l = this._createBarVisual(this._dataInterval, n, s, "inRange"), u = this._createBarVisual(n, n, o, "outOfRange");
      a.inRange.setStyle({
        fill: l.barColor
        // opacity: visualInRange.opacity
      }).setShape("points", l.barPoints), a.outOfRange.setStyle({
        fill: u.barColor
        // opacity: visualOutOfRange.opacity
      }).setShape("points", u.barPoints), this._updateHandle(s, l);
    }, t.prototype._createBarVisual = function(r, i, n, a) {
      var o = {
        forceState: a,
        convertOpacityToAlpha: !0
      }, s = this._makeColorGradient(r, o), l = [this.getControllerVisual(r[0], "symbolSize", o), this.getControllerVisual(r[1], "symbolSize", o)], u = this._createBarPoints(n, l);
      return {
        barColor: new Jc(0, 0, 0, 1, s),
        barPoints: u,
        handlesColor: [s[0].color, s[s.length - 1].color]
      };
    }, t.prototype._makeColorGradient = function(r, i) {
      var n = 100, a = [], o = (r[1] - r[0]) / n;
      a.push({
        color: this.getControllerVisual(r[0], "color", i),
        offset: 0
      });
      for (var s = 1; s < n; s++) {
        var l = r[0] + o * s;
        if (l > r[1])
          break;
        a.push({
          color: this.getControllerVisual(l, "color", i),
          offset: s / n
        });
      }
      return a.push({
        color: this.getControllerVisual(r[1], "color", i),
        offset: 1
      }), a;
    }, t.prototype._createBarPoints = function(r, i) {
      var n = this.visualMapModel.itemSize;
      return [[n[0] - i[0], r[0]], [n[0], r[0]], [n[0], r[1]], [n[0] - i[1], r[1]]];
    }, t.prototype._createBarGroup = function(r) {
      var i = this._orient, n = this.visualMapModel.get("inverse");
      return new Ct(i === "horizontal" && !n ? {
        scaleX: r === "bottom" ? 1 : -1,
        rotation: Math.PI / 2
      } : i === "horizontal" && n ? {
        scaleX: r === "bottom" ? -1 : 1,
        rotation: -Math.PI / 2
      } : i === "vertical" && !n ? {
        scaleX: r === "left" ? 1 : -1,
        scaleY: -1
      } : {
        scaleX: r === "left" ? 1 : -1
      });
    }, t.prototype._updateHandle = function(r, i) {
      if (this._useHandle) {
        var n = this._shapes, a = this.visualMapModel, o = n.handleThumbs, s = n.handleLabels, l = a.itemSize, u = a.getExtent(), h = this._applyTransform("left", n.mainGroup);
        EL([0, 1], function(c) {
          var v = o[c];
          v.setStyle("fill", i.handlesColor[c]), v.y = r[c];
          var f = Ve(r[c], [0, l[1]], u, !0), d = this.getControllerVisual(f, "symbolSize");
          v.scaleX = v.scaleY = d / l[0], v.x = l[0] - d / 2;
          var g = _n(n.handleLabelPoints[c], vs(v, this.group));
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
    }, t.prototype._showIndicator = function(r, i, n, a) {
      var o = this.visualMapModel, s = o.getExtent(), l = o.itemSize, u = [0, l[1]], h = this._shapes, c = h.indicator;
      if (c) {
        c.attr("invisible", !1);
        var v = {
          convertOpacityToAlpha: !0
        }, f = this.getControllerVisual(r, "color", v), d = this.getControllerVisual(r, "symbolSize"), g = Ve(r, s, u, !0), p = l[0] - d / 2, y = {
          x: c.x,
          y: c.y
        };
        c.y = g, c.x = p;
        var m = _n(h.indicatorLabelPoint, vs(c, this.group)), _ = h.indicatorLabel;
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
      var r = this;
      this._shapes.mainGroup.on("mousemove", function(i) {
        if (r._hovering = !0, !r._dragging) {
          var n = r.visualMapModel.itemSize, a = r._applyTransform([i.offsetX, i.offsetY], r._shapes.mainGroup, !0, !0);
          a[1] = Bg(oh(0, a[1]), n[1]), r._doHoverLinkToSeries(a[1], 0 <= a[0] && a[0] <= n[0]);
        }
      }).on("mouseout", function() {
        r._hovering = !1, !r._dragging && r._clearHoverLinkToSeries();
      });
    }, t.prototype._enableHoverLinkFromSeries = function() {
      var r = this.api.getZr();
      this.visualMapModel.option.hoverLink ? (r.on("mouseover", this._hoverLinkFromSeriesMouseOver, this), r.on("mouseout", this._hideIndicator, this)) : this._clearHoverLinkFromSeries();
    }, t.prototype._doHoverLinkToSeries = function(r, i) {
      var n = this.visualMapModel, a = n.itemSize;
      if (n.option.hoverLink) {
        var o = [0, a[1]], s = n.getExtent();
        r = Bg(oh(o[0], r), o[1]);
        var l = zL(n, s, o), u = [r - l, r + l], h = Ve(r, o, s, !0), c = [Ve(u[0], o, s, !0), Ve(u[1], o, s, !0)];
        u[0] < o[0] && (c[0] = -1 / 0), u[1] > o[1] && (c[1] = 1 / 0), i && (c[0] === -1 / 0 ? this._showIndicator(h, c[1], "< ", l) : c[1] === 1 / 0 ? this._showIndicator(h, c[0], "> ", l) : this._showIndicator(h, h, "≈ ", l));
        var v = this._hoverLinkDataIndices, f = [];
        (i || Fg(n)) && (f = this._hoverLinkDataIndices = n.findTargetDataIndices(c));
        var d = rS(v, f);
        this._dispatchHighDown("downplay", _s(d[0], n)), this._dispatchHighDown("highlight", _s(d[1], n));
      }
    }, t.prototype._hoverLinkFromSeriesMouseOver = function(r) {
      var i;
      if (dn(r.target, function(l) {
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
      var r = this._shapes;
      r.indicator && r.indicator.attr("invisible", !0), r.indicatorLabel && r.indicatorLabel.attr("invisible", !0);
      var i = this._shapes.handleLabels;
      if (i)
        for (var n = 0; n < i.length; n++)
          this.api.leaveBlur(i[n]);
    }, t.prototype._clearHoverLinkToSeries = function() {
      this._hideIndicator();
      var r = this._hoverLinkDataIndices;
      this._dispatchHighDown("downplay", _s(r, this.visualMapModel)), r.length = 0;
    }, t.prototype._clearHoverLinkFromSeries = function() {
      this._hideIndicator();
      var r = this.api.getZr();
      r.off("mouseover", this._hoverLinkFromSeriesMouseOver), r.off("mouseout", this._hideIndicator);
    }, t.prototype._applyTransform = function(r, i, n, a) {
      var o = vs(i, a ? null : this.group);
      return z(r) ? _n(r, o, n) : gm(r, o, n);
    }, t.prototype._dispatchHighDown = function(r, i) {
      i && i.length && this.api.dispatchAction({
        type: r,
        batch: i
      });
    }, t.prototype.dispose = function() {
      this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();
    }, t.type = "visualMap.continuous", t;
  }(z0)
);
function zg(e, t, r, i) {
  return new vl({
    shape: {
      points: e
    },
    draggable: !!r,
    cursor: t,
    drift: r,
    onmousemove: function(n) {
      Fa(n.event);
    },
    ondragend: i
  });
}
function zL(e, t, r) {
  var i = kL / 2, n = e.get("hoverLinkDataSize");
  return n && (i = Ve(n, t, r, !0) / 2), i;
}
function Fg(e) {
  var t = e.get("hoverLinkOnHandle");
  return !!(t ?? e.get("realtime"));
}
function Hg(e) {
  return e === "vertical" ? "ns-resize" : "ew-resize";
}
var FL = {
  type: "selectDataRange",
  event: "dataRangeSelected",
  // FIXME use updateView appears wrong
  update: "update"
}, HL = function(e, t) {
  t.eachComponent({
    mainType: "visualMap",
    query: e
  }, function(r) {
    r.setSelected(e.selected);
  });
}, VL = [
  {
    createOnAllSeries: !0,
    reset: function(e, t) {
      var r = [];
      return t.eachComponent("visualMap", function(i) {
        var n = e.pipelineContext;
        !i.isTargetSeries(e) || n && n.large || r.push(mL(i.stateList, i.targetVisuals, J(i.getValueState, i), i.getDataDimensionIndex(e.getData())));
      }), r;
    }
  },
  // Only support color.
  {
    createOnAllSeries: !0,
    reset: function(e, t) {
      var r = e.getData(), i = [];
      t.eachComponent("visualMap", function(n) {
        if (n.isTargetSeries(e)) {
          var a = n.getVisualMeta(J(GL, null, e, n)) || {
            stops: [],
            outerColors: []
          }, o = n.getDataDimensionIndex(r);
          o >= 0 && (a.dimension = o, i.push(a));
        }
      }), e.getData().setVisual("visualMeta", i);
    }
  }
];
function GL(e, t, r, i) {
  for (var n = t.targetVisuals[i], a = Bt.prepareVisualTypes(n), o = {
    color: p_(e.getData(), "color")
    // default color.
  }, s = 0, l = a.length; s < l; s++) {
    var u = a[s], h = n[u === "opacity" ? "__alphaForOpacity" : u];
    h && h.applyVisual(r, c, v);
  }
  return o.color;
  function c(f) {
    return o[f];
  }
  function v(f, d) {
    o[f] = d;
  }
}
var Vg = C;
function WL(e) {
  var t = e && e.visualMap;
  z(t) || (t = t ? [t] : []), Vg(t, function(r) {
    if (r) {
      on(r, "splitList") && !on(r, "pieces") && (r.pieces = r.splitList, delete r.splitList);
      var i = r.pieces;
      i && z(i) && Vg(i, function(n) {
        V(n) && (on(n, "start") && !on(n, "min") && (n.min = n.start), on(n, "end") && !on(n, "max") && (n.max = n.end));
      });
    }
  });
}
function on(e, t) {
  return e && e.hasOwnProperty && e.hasOwnProperty(t);
}
var Gg = !1;
function H0(e) {
  Gg || (Gg = !0, e.registerSubTypeDefaulter("visualMap", function(t) {
    return !t.categories && (!(t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) || t.calculable) ? "continuous" : "piecewise";
  }), e.registerAction(FL, HL), C(VL, function(t) {
    e.registerVisual(e.PRIORITY.VISUAL.COMPONENT, t);
  }), e.registerPreprocessor(WL));
}
function UL(e) {
  e.registerComponentModel(OL), e.registerComponentView(BL), H0(e);
}
var YL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r._pieceList = [], r;
    }
    return t.prototype.optionUpdated = function(r, i) {
      e.prototype.optionUpdated.apply(this, arguments), this.resetExtent();
      var n = this._mode = this._determineMode();
      this._pieceList = [], XL[this._mode].call(this, this._pieceList), this._resetSelected(r, i);
      var a = this.option.categories;
      this.resetVisual(function(o, s) {
        n === "categories" ? (o.mappingMethod = "category", o.categories = q(a)) : (o.dataExtent = this.getExtent(), o.mappingMethod = "piecewise", o.pieceList = U(this._pieceList, function(l) {
          return l = q(l), s !== "inRange" && (l.visual = null), l;
        }));
      });
    }, t.prototype.completeVisualOption = function() {
      var r = this.option, i = {}, n = Bt.listVisualTypes(), a = this.isCategory();
      C(r.pieces, function(s) {
        C(n, function(l) {
          s.hasOwnProperty(l) && (i[l] = 1);
        });
      }), C(i, function(s, l) {
        var u = !1;
        C(this.stateList, function(h) {
          u = u || o(r, h, l) || o(r.target, h, l);
        }, this), !u && C(this.stateList, function(h) {
          (r[h] || (r[h] = {}))[l] = B0.get(l, h === "inRange" ? "active" : "inactive", a);
        });
      }, this);
      function o(s, l, u) {
        return s && s[l] && s[l].hasOwnProperty(u);
      }
      e.prototype.completeVisualOption.apply(this, arguments);
    }, t.prototype._resetSelected = function(r, i) {
      var n = this.option, a = this._pieceList, o = (i ? n : r).selected || {};
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
    }, t.prototype.getSelectedMapKey = function(r) {
      return this._mode === "categories" ? r.value + "" : r.index + "";
    }, t.prototype.getPieceList = function() {
      return this._pieceList;
    }, t.prototype._determineMode = function() {
      var r = this.option;
      return r.pieces && r.pieces.length > 0 ? "pieces" : this.option.categories ? "categories" : "splitNumber";
    }, t.prototype.setSelected = function(r) {
      this.option.selected = q(r);
    }, t.prototype.getValueState = function(r) {
      var i = Bt.findPieceIndex(r, this._pieceList);
      return i != null && this.option.selected[this.getSelectedMapKey(this._pieceList[i])] ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(r) {
      var i = [], n = this._pieceList;
      return this.eachTargetSeries(function(a) {
        var o = [], s = a.getData();
        s.each(this.getDataDimensionIndex(s), function(l, u) {
          var h = Bt.findPieceIndex(l, n);
          h === r && o.push(u);
        }, this), i.push({
          seriesId: a.id,
          dataIndex: o
        });
      }, this), i;
    }, t.prototype.getRepresentValue = function(r) {
      var i;
      if (this.isCategory())
        i = r.value;
      else if (r.value != null)
        i = r.value;
      else {
        var n = r.interval || [];
        i = n[0] === -1 / 0 && n[1] === 1 / 0 ? 0 : (n[0] + n[1]) / 2;
      }
      return i;
    }, t.prototype.getVisualMeta = function(r) {
      if (this.isCategory())
        return;
      var i = [], n = ["", ""], a = this;
      function o(h, c) {
        var v = a.getRepresentValue({
          interval: h
        });
        c || (c = a.getValueState(v));
        var f = r(v, c);
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
    }, t.type = "visualMap.piecewise", t.defaultOption = _l(js.defaultOption, {
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
  }(js)
), XL = {
  splitNumber: function(e) {
    var t = this.option, r = Math.min(t.precision, 20), i = this.getExtent(), n = t.splitNumber;
    n = Math.max(parseInt(n, 10), 1), t.splitNumber = n;
    for (var a = (i[1] - i[0]) / n; +a.toFixed(r) !== a && r < 5; )
      r++;
    t.precision = r, a = +a.toFixed(r), t.minOpen && e.push({
      interval: [-1 / 0, i[0]],
      close: [0, 0]
    });
    for (var o = 0, s = i[0]; o < n; s += a, o++) {
      var l = o === n - 1 ? i[1] : s + a;
      e.push({
        interval: [s, l],
        close: [1, 1]
      });
    }
    t.maxOpen && e.push({
      interval: [i[1], 1 / 0],
      close: [0, 0]
    }), Cv(e), C(e, function(u, h) {
      u.index = h, u.text = this.formatValueText(u.interval);
    }, this);
  },
  categories: function(e) {
    var t = this.option;
    C(t.categories, function(r) {
      e.push({
        text: this.formatValueText(r, !0),
        value: r
      });
    }, this), Wg(t, e);
  },
  pieces: function(e) {
    var t = this.option;
    C(t.pieces, function(r, i) {
      V(r) || (r = {
        value: r
      });
      var n = {
        text: "",
        index: i
      };
      if (r.label != null && (n.text = r.label), r.hasOwnProperty("value")) {
        var a = n.value = r.value;
        n.interval = [a, a], n.close = [1, 1];
      } else {
        for (var o = n.interval = [], s = n.close = [0, 0], l = [1, 0, 1], u = [-1 / 0, 1 / 0], h = [], c = 0; c < 2; c++) {
          for (var v = [["gte", "gt", "min"], ["lte", "lt", "max"]][c], f = 0; f < 3 && o[c] == null; f++)
            o[c] = r[v[f]], s[c] = l[f], h[c] = f === 2;
          o[c] == null && (o[c] = u[c]);
        }
        h[0] && o[1] === 1 / 0 && (s[0] = 0), h[1] && o[0] === -1 / 0 && (s[1] = 0), o[0] === o[1] && s[0] && s[1] && (n.value = o[0]);
      }
      n.visual = Bt.retrieveVisuals(r), e.push(n);
    }, this), Wg(t, e), Cv(e), C(e, function(r) {
      var i = r.close, n = [["<", "≤"][i[1]], [">", "≥"][i[0]]];
      r.text = r.text || this.formatValueText(r.value != null ? r.value : r.interval, !1, n);
    }, this);
  }
};
function Wg(e, t) {
  var r = e.inverse;
  (e.orient === "vertical" ? !r : r) && t.reverse();
}
var qL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.doRender = function() {
      var r = this.group;
      r.removeAll();
      var i = this.visualMapModel, n = i.get("textGap"), a = i.textStyleModel, o = a.getFont(), s = a.getTextColor(), l = this._getItemAlign(), u = i.itemSize, h = this._getViewData(), c = h.endsText, v = Dn(i.get("showLabel", !0), !c), f = !i.get("selectedMode");
      c && this._renderEndsText(r, c[0], u, v, l), C(h.viewPieceList, function(d) {
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
        r.add(p);
      }, this), c && this._renderEndsText(r, c[1], u, v, l), xn(i.get("orient"), r, i.get("itemGap")), this.renderBackground(r), this.positionGroup(r);
    }, t.prototype._enableHoverLink = function(r, i) {
      var n = this;
      r.on("mouseover", function() {
        return a("highlight");
      }).on("mouseout", function() {
        return a("downplay");
      });
      var a = function(o) {
        var s = n.visualMapModel;
        s.option.hoverLink && n.api.dispatchAction({
          type: o,
          batch: _s(s.findTargetDataIndices(i), s)
        });
      };
    }, t.prototype._getItemAlign = function() {
      var r = this.visualMapModel, i = r.option;
      if (i.orient === "vertical")
        return F0(r, this.api, r.itemSize);
      var n = i.align;
      return (!n || n === "auto") && (n = "left"), n;
    }, t.prototype._renderEndsText = function(r, i, n, a, o) {
      if (i) {
        var s = new Ct(), l = this.visualMapModel.textStyleModel;
        s.add(new At({
          style: Xe(l, {
            x: a ? o === "right" ? n[0] : 0 : n[0] / 2,
            y: n[1] / 2,
            verticalAlign: "middle",
            align: a ? o : "center",
            text: i
          })
        })), r.add(s);
      }
    }, t.prototype._getViewData = function() {
      var r = this.visualMapModel, i = U(r.getPieceList(), function(s, l) {
        return {
          piece: s,
          indexInModelPieceList: l
        };
      }), n = r.get("text"), a = r.get("orient"), o = r.get("inverse");
      return (a === "horizontal" ? o : !o) ? i.reverse() : n && (n = n.slice().reverse()), {
        viewPieceList: i,
        endsText: n
      };
    }, t.prototype._createItemSymbol = function(r, i, n, a) {
      var o = yr(
        // symbol will be string
        this.getControllerVisual(i, "symbol"),
        n[0],
        n[1],
        n[2],
        n[3],
        // color will be string
        this.getControllerVisual(i, "color")
      );
      o.silent = a, r.add(o);
    }, t.prototype._onItemClick = function(r) {
      var i = this.visualMapModel, n = i.option, a = n.selectedMode;
      if (a) {
        var o = q(n.selected), s = i.getSelectedMapKey(r);
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
  }(z0)
);
function ZL(e) {
  e.registerComponentModel(YL), e.registerComponentView(qL), H0(e);
}
function KL(e) {
  je(UL), je(ZL);
}
function Ug(e, t, r) {
  var i = Wr.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", e)), i.width = n * r, i.height = a * r, i;
}
var sh = function(e) {
  B(t, e);
  function t(r, i, n) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || $s, typeof r == "string" ? o = Ug(r, i, n) : V(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (dy(o), o.onselectstart = function() {
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
    var r = this.dpr;
    this.domBack = Ug("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, t.prototype.createRepaintRects = function(r, i, n, a) {
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
      var v = r[c];
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
  }, t.prototype.resize = function(r, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = r + "px", o.height = i + "px"), a.width = r * n, a.height = i * n, s && (s.width = r * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(r, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    i = i || this.clearColor;
    var u = this.motionBlur && !r, h = this.lastFrameAlpha, c = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / c, l / c));
    var f = this.domBack;
    function d(g, p, y, m) {
      if (o.clearRect(g, p, y, m), i && i !== "transparent") {
        var _ = void 0;
        if (il(i)) {
          var b = i.global || i.__width === y && i.__height === m;
          _ = b && i.__canvasGradient || Kh(o, i, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), i.__canvasGradient = _, i.__width = y, i.__height = m;
        } else p1(i) && (i.scaleX = i.scaleX || c, i.scaleY = i.scaleY || c, _ = jh(o, i, {
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
}(er), Yg = 1e5, yi = 314159, rs = 0.01, jL = 1e-3;
function QL(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function JL(e, t) {
  var r = document.createElement("div");
  return r.style.cssText = [
    "position:relative",
    "width:" + e + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", r;
}
var tP = function() {
  function e(t, r, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = N({}, i || {}), this.dpr = i.devicePixelRatio || $s, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (dy(t), t.innerHTML = ""), this.storage = r;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, c = h.width, v = h.height;
      i.width != null && (c = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, h.width = c * this.dpr, h.height = v * this.dpr, this._width = c, this._height = v;
      var f = new sh(h, this, this.dpr);
      f.__builtin__ = !0, f.initContext(), l[yi] = f, f.zlevel = yi, s.push(yi), this._domRoot = t;
    } else {
      this._width = Vo(t, 0, i), this._height = Vo(t, 1, i);
      var u = this._domRoot = JL(this._width, this._height);
      t.appendChild(u);
    }
  }
  return e.prototype.getType = function() {
    return "canvas";
  }, e.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, e.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, e.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, e.prototype.refresh = function(t) {
    var r = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(r, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = r.slice()), this;
  }, e.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, e.prototype._paintHoverList = function(t) {
    var r = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!r) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < r; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Yg)), a || (a = i.ctx, a.save()), Ti(a, s, n, o === r - 1));
      }
      a && a.restore();
    }
  }, e.prototype.getHoverLayer = function() {
    return this.getLayer(Yg);
  }, e.prototype.paintOne = function(t, r) {
    b_(t, r);
  }, e.prototype._paintList = function(t, r, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, r, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        Ms(function() {
          l._paintList(t, r, i, n);
        });
      }
    }
  }, e.prototype._compositeManually = function() {
    var t = this.getLayer(yi).ctx, r = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, r, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, r, i);
    });
  }, e.prototype._doPaintList = function(t, r, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var h = !0, c = !1, v = function(g) {
      var p = a[g], y = p.ctx, m = o && p.createRepaintRects(t, r, f._width, f._height), _ = i ? p.__startIndex : p.__drawIndex, b = !i && p.incremental && Date.now, S = b && Date.now(), w = p.zlevel === f._zlevelList[0] ? f._backgroundColor : null;
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
    return X.wxa && C(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: c
    };
  }, e.prototype._doPaintEl = function(t, r, i, n, a, o) {
    var s = r.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Ti(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Ti(s, t, a, o);
  }, e.prototype.getLayer = function(t, r) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = yi);
    var i = this._layers[t];
    return i || (i = new sh("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? nt(i, this._layerConfig[t], !0) : this._layerConfig[t - rs] && nt(i, this._layerConfig[t - rs], !0), r && (i.virtual = r), this.insertLayer(t, i), i.initContext()), i;
  }, e.prototype.insertLayer = function(t, r) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && QL(r)) {
      if (a > 0 && t > n[0]) {
        for (l = 0; l < a - 1 && !(n[l] < t && n[l + 1] > t); l++)
          ;
        s = i[n[l]];
      }
      if (n.splice(l + 1, 0, t), i[t] = r, !r.virtual)
        if (s) {
          var u = s.dom;
          u.nextSibling ? o.insertBefore(r.dom, u.nextSibling) : o.appendChild(r.dom);
        } else
          o.firstChild ? o.insertBefore(r.dom, o.firstChild) : o.appendChild(r.dom);
      r.painter || (r.painter = this);
    }
  }, e.prototype.eachLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(r, this._layers[a], a);
    }
  }, e.prototype.eachBuiltinLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(r, o, a);
    }
  }, e.prototype.eachOtherLayer = function(t, r) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(r, o, a);
    }
  }, e.prototype.getLayers = function() {
    return this._layers;
  }, e.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(c, v) {
      c.__dirty = c.__used = !1;
    });
    function r(c) {
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
      s !== u && (s = u, o = 0), n.incremental ? (h = this.getLayer(u + jL, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? rs : 0), this._needsManuallyCompositing), h.__builtin__ || Lc("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, r(l), a = h), n.__dirty & ae && !n.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    r(l), this.eachBuiltinLayer(function(c, v) {
      !c.__used && c.getElementCount() > 0 && (c.__dirty = !0, c.__startIndex = c.__endIndex = c.__drawIndex = 0), c.__dirty && c.__drawIndex < 0 && (c.__drawIndex = c.__startIndex);
    });
  }, e.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, e.prototype._clearLayer = function(t) {
    t.clear();
  }, e.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, C(this._layers, function(r) {
      r.setUnpainted();
    });
  }, e.prototype.configLayer = function(t, r) {
    if (r) {
      var i = this._layerConfig;
      i[t] ? nt(i[t], r, !0) : i[t] = r;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + rs) {
          var o = this._layers[a];
          nt(o, i[t], !0);
        }
      }
    }
  }, e.prototype.delLayer = function(t) {
    var r = this._layers, i = this._zlevelList, n = r[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete r[t], i.splice(vt(i, t), 1));
  }, e.prototype.resize = function(t, r) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), r != null && (n.height = r), t = Vo(a, 0, n), r = Vo(a, 1, n), i.style.display = "", this._width !== t || r !== this._height) {
        i.style.width = t + "px", i.style.height = r + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, r);
        this.refresh(!0);
      }
      this._width = t, this._height = r;
    } else {
      if (t == null || r == null)
        return;
      this._width = t, this._height = r, this.getLayer(yi).resize(t, r);
    }
    return this;
  }, e.prototype.clearLayer = function(t) {
    var r = this._layers[t];
    r && r.clear();
  }, e.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, e.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[yi].dom;
    var r = new sh("image", this, t.pixelRatio || this.dpr);
    r.initContext(), r.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = r.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = r.dom.width, a = r.dom.height;
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
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
}();
function eP(e) {
  e.registerPainter("canvas", tP);
}
const rP = [
  E2,
  CI,
  _2,
  KI,
  AL,
  gL,
  KL,
  eP
];
var iP = Object.defineProperty, nP = Object.getOwnPropertyDescriptor, $f = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? nP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && iP(t, r, n), n;
};
je(rP);
let ro = class extends Gt {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".canvas");
    this.chart = xD(e, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(e), this.applyOption();
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
ro.styles = we`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
$f([
  it({ attribute: !1 })
], ro.prototype, "option", 2);
$f([
  it({ type: String })
], ro.prototype, "height", 2);
ro = $f([
  ke("ia-chart")
], ro);
var aP = Object.defineProperty, oP = Object.getOwnPropertyDescriptor, Ni = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? oP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && aP(t, r, n), n;
};
const bs = ["pv_energy_total", "grid_import_total", "battery_discharge_total"], mc = ["load_energy_total", "grid_export_total", "battery_charge_total"], sP = [...bs, ...mc];
let mr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Je(this), this.requestId = 0;
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
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await yb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderTotals(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return L`<div class="kpi">
      ${sP.filter((i) => i in e.totals).map(
      (i) => L`<div class="cell">
          <span class="label">${Mn(t, i)}</span>
          <span class="value">${Xt(e.totals[i], r)}</span>
          <span class="hint">
            ${bs.includes(i) ? t.balance.intoSystem : t.balance.outOfIt}
          </span>
        </div>`
    )}
    </div>`;
  }
  renderBalance(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return e.unaccounted === null ? L`<p class="empty">
        ${t.balance.needsAllSix({
      missing: e.missing.map((i) => Mn(t, i)).join(", ")
    })}
      </p>` : L`
      <p class="balance">
        ${t.balance.inOut({
      in: Xt(e.sources_total, r),
      out: Xt(e.sinks_total, r)
    })}
        <strong>${Xt(Math.abs(e.unaccounted), r)}</strong>
        ${(e.unaccounted >= 0 ? t.balance.unaccountedFor : t.balance.moreOutThanIn)({
      share: Y(e.unaccounted_share, r)
    })}
      </p>
      <p class="note">${t.balance.unaccountedNote}</p>
    `;
  }
  renderRatios(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = e.totals, n = (a) => a in i;
    return e.self_sufficiency === null && e.self_consumption === null ? L`<p class="empty">${t.balance.ratiosNeedCounters}</p>` : L`<div class="kpi">
      ${e.self_sufficiency !== null ? L`<div class="cell">
            <span class="label">${t.common.selfSufficiency}</span>
            <span class="value">${Y(e.self_sufficiency, r)}</span>
            <span class="hint">
              ${n("load_energy_total") && n("grid_import_total") ? `(${Xt(i.load_energy_total, r)} − ${Xt(
      i.grid_import_total,
      r
    )}) ÷ ${Xt(i.load_energy_total, r)}` : ""}
            </span>
          </div>` : k}
      ${e.self_consumption !== null ? L`<div class="cell">
            <span class="label">${t.balance.selfConsumption}</span>
            <span class="value">${Y(e.self_consumption, r)}</span>
            <span class="hint">
              ${n("pv_energy_total") && n("grid_export_total") ? `(${Xt(i.pv_energy_total, r)} − ${Xt(
      i.grid_export_total,
      r
    )}) ÷ ${Xt(i.pv_energy_total, r)}` : ""}
            </span>
          </div>` : k}
    </div>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return L`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.balance.daysIn({ timezone: t.timezone })}</span>
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${!t.covers_whole_window && t.covered_end ? L`<span class="warn">
              ${e.balance.countedUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}
            </span>` : k}
        ${t.covered_end ? k : L`<span class="warn">${e.balance.noEnergyStatistics}</span>`}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      ${this.renderTotals(t)}

      <section>
        <h2>${e.balance.inAgainstOut}</h2>
        <ia-chart
          .option=${Kb(t.totals, bs, mc, e)}
          height="220px"
        ></ia-chart>
        ${this.renderBalance(t)}
      </section>

      <section>
        <h2>${e.balance.ratiosTitle}</h2>
        ${this.renderRatios(t)}
      </section>

      <section>
        <h2>${e.balance.dayByDay}</h2>
        ${t.days.length ? L`<ia-chart
              .option=${jb(t.days, bs, mc, e)}
            ></ia-chart>` : L`<p class="empty">${e.balance.noDays}</p>`}
        <p class="note">${e.balance.dayByDayNote}</p>
      </section>
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
], mr.prototype, "hass", 2);
Ni([
  it({ type: String })
], mr.prototype, "entryId", 2);
Ni([
  it({ type: String })
], mr.prototype, "range", 2);
Ni([
  _t()
], mr.prototype, "payload", 2);
Ni([
  _t()
], mr.prototype, "error", 2);
Ni([
  _t()
], mr.prototype, "loading", 2);
mr = Ni([
  ke("ia-balance-tab")
], mr);
const vo = we`
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
var lP = Object.defineProperty, uP = Object.getOwnPropertyDescriptor, El = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? uP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && lP(t, r, n), n;
};
let Rn = class extends Gt {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en", this.i18n = new Je(this);
  }
  render() {
    const t = this.i18n.m.sections.charge, r = this.flow;
    return L`
      <section>
        <h2>${t.title}</h2>

        ${r.sign_looks_inverted ? L`<p class="warn">${t.signInverted}</p>` : k}

        <div class="cards">
          <div class="card">
            <span class="name">${t.meanChargePower}</span>
            <span class="value">${pt(r.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span
              ><span>${Y(r.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.meanDischargePower}</span>
            <span class="value">${pt(r.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span>
              <span>${Y(r.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.resting}</span>
            <span class="value">${Y(r.share_idle, this.locale)}</span>
            <span class="row">
              <span>${t.below}</span><span>${pt(r.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.discharged}</span>
            <span class="value">${Xt(r.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>${t.charged}</span><span>${Xt(r.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${r.round_trip_efficiency !== null ? L`<div class="card">
                <span class="name">${t.roundTripEfficiency}</span>
                <span class="value">
                  ${Y(r.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>${t.outOfWhatWentIn}</span></span>
              </div>` : k}
          <div class="card">
            <span class="name">${t.fullCyclesPerDay}</span>
            <span class="value">
              ${r.cycles_per_day === null ? "—" : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      r.cycles_per_day
    )}
            </span>
            ${r.cycles_per_day === null ? L`<span class="row"><span>${t.needsCapacity}</span></span>` : k}
          </div>
        </div>

        ${r.cycles_per_day === null && !this.hasCapacity ? L`<p class="note">${t.setCapacity}</p>` : k}

        ${r.energy_metered ? k : L`<p class="note">${t.integrated}</p>`}
        ${r.energy_metered && r.round_trip_efficiency === null ? L`<p class="note">
              ${t.noEfficiency}
              ${r.soc_drift_pct !== null && Math.abs(r.soc_drift_pct) > r.efficiency_max_drift_pct ? (r.soc_drift_pct < 0 ? t.driftBelow : t.driftAbove)({
      n: Math.abs(Math.round(r.soc_drift_pct))
    }) : t.tooLittle}
            </p>` : k}
      </section>
    `;
  }
};
Rn.styles = [vo, we`:host { display: block; }`];
El([
  it({ attribute: !1 })
], Rn.prototype, "flow", 2);
El([
  it({ type: Boolean })
], Rn.prototype, "hasCapacity", 2);
El([
  it({ type: String })
], Rn.prototype, "locale", 2);
Rn = El([
  ke("ia-charge-section")
], Rn);
var hP = Object.defineProperty, cP = Object.getOwnPropertyDescriptor, Bi = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? cP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && hP(t, r, n), n;
};
let _r = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Je(this), this.requestId = 0;
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
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await pb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = e.dips_measurable, n = "—", a = [
      [
        t.battery.meanCharge,
        Y(mi(e.kpi.mean_soc), r),
        t.battery.overWholePeriod
      ],
      [
        t.battery.lowestCharge,
        i ? Y(mi(e.kpi.min_soc), r) : n,
        i ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.below({ level: Y(mi(e.low_pct), r) }),
        i ? qt(e.kpi.seconds_below_low, r) : n,
        i ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.dips,
        i ? String(e.kpi.dip_count) : n,
        i ? t.battery.lastingOverMinute : t.battery.needsExactData
      ],
      [
        t.battery.meanLowPoint,
        i ? Y(mi(e.kpi.mean_low_point), r) : n,
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
  renderEpisodes(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return e.dips_measurable ? e.episodes.length ? L`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          <th>${t.battery.lowest}</th>
          <th>${t.battery.recoveredTo}</th>
        </tr>
      </thead>
      <tbody>
        ${e.episodes.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(r)}</td>
            <td>${qt(i.seconds, r)}</td>
            <td>${Y(mi(i.lowest), r)}</td>
            <td>${Y(mi(i.recovered_to), r)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : L`<p class="empty">
        ${t.battery.noEpisodes({ level: Y(mi(e.low_pct), r) })}
      </p>` : L`<p class="empty">${t.battery.dipsNotMeasurable}</p>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, i = Na(t.coverage, r);
    return L`
      <div class="status">
        <span class="badge">${el(t.precision, t.boundary, r)}</span>
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${t.raw_from && t.dips_restricted && t.dips_measurable ? L`<span class="warn">
              ${e.battery.dipsCountedFrom({
      date: new Date(t.raw_from).toLocaleDateString(r)
    })}
            </span>` : k}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      ${this.renderKpi(t)}

      <section>
        <h2>${e.battery.timeAtSoc}</h2>
        <ia-chart .option=${Ub(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.battery.chargeBands}</h2>
        <ia-chart .option=${Yb(t.bands, e)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${e.battery.lowChargeEpisodes}</h2>
        ${this.renderEpisodes(t)}
      </section>

      ${t.power ? L`<ia-charge-section
            .flow=${t.power}
            .hasCapacity=${t.has_capacity}
            .locale=${r}
          ></ia-charge-section>` : L`<section>
            <h2>${e.sections.charge.title}</h2>
            <p class="empty">${e.battery.mapPowerSensor}</p>
          </section>`}
    `;
  }
};
_r.styles = we`
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
], _r.prototype, "hass", 2);
Bi([
  it({ type: String })
], _r.prototype, "entryId", 2);
Bi([
  it({ type: String })
], _r.prototype, "range", 2);
Bi([
  _t()
], _r.prototype, "payload", 2);
Bi([
  _t()
], _r.prototype, "error", 2);
Bi([
  _t()
], _r.prototype, "loading", 2);
_r = Bi([
  ke("ia-battery-tab")
], _r);
function mi(e) {
  return e === null ? null : e / 100;
}
function V0(e) {
  return e.reserve_reason ?? "no_soc";
}
function fP(e) {
  const t = e.hours_left;
  return t == null ? { kind: "reason", reason: V0(e) } : t === 0 && e.below_low ? { kind: "didNotLast" } : { kind: "hours", hours: t };
}
function vP(e) {
  const t = e.needed_pct;
  return t == null ? { kind: "reason", reason: V0(e) } : t > 100 ? { kind: "over" } : { kind: "pct", pct: t };
}
function dP(e) {
  const t = e.worst_needed_pct, r = e.worst_start;
  return t === null || r === null ? { kind: "none" } : t > 100 ? { kind: "over", start: r } : { kind: "pct", pct: t, start: r };
}
function pP(e) {
  return e.judged === 0 ? { kind: "none" } : { kind: "count", covered: e.covered, judged: e.judged };
}
var gP = Object.defineProperty, yP = Object.getOwnPropertyDescriptor, zi = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? yP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && gP(t, r, n), n;
};
const Ge = "—";
function fa(e, t) {
  return e === null ? Ge : qt(e * 3600, t);
}
const mP = 24 * 3600 * 1e3;
function _P(e, t) {
  const r = new Date(e), i = new Date(new Date(t).getTime() - 1), n = (a) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  return Math.round((n(i) - n(r)) / mP) + 1;
}
let br = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Je(this), this.requestId = 0;
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
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await mb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = e.kpi, n = e.measured_seconds > 0, a = [
      [t.grid.outages, n ? `${i.count}` : Ge, ""],
      [
        t.grid.withoutGrid,
        n ? qt(i.off_seconds, r) : Ge,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        i.bridged_seconds > 0 ? t.grid.unrecordedAssumedOff({
          duration: qt(i.bridged_seconds, r)
        }) : ""
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      [t.grid.shareOfTime, cr(i.off_share, r), t.grid.ofMeasuredTime],
      [
        t.grid.longest,
        i.longest_seconds === null ? Ge : qt(i.longest_seconds, r),
        i.longest_start ? t.grid.fromTime({ time: new Date(i.longest_start).toLocaleString(r) }) : ""
      ],
      [
        t.grid.meanDuration,
        i.mean_seconds === null ? Ge : qt(i.mean_seconds, r),
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
  renderDuration(e) {
    const t = e.started_before_window || e.ongoing, r = qt(e.seconds, this.i18n.locale);
    return t ? this.i18n.m.grid.atLeast({ duration: r }) : r;
  }
  renderEpisodes(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    if (!e.episodes.length)
      return L`<p class="empty">
        ${t.grid.noOutages({ duration: qt(e.measured_seconds, r) })}
      </p>`;
    const i = (n) => n == null ? Ge : Y(n / 100, r);
    return L`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          ${e.has_soc ? L`<th>${t.grid.chargeAtStart}</th>
                <th>${t.grid.lowest}</th>
                <th>${t.grid.atEnd}</th>
                <th>${t.grid.hoursLeft}</th>
                <th>${t.grid.neededAtStart}</th>` : k}
          ${e.has_load ? L`<th>${t.common.meanLoad}</th>` : k}
        </tr>
      </thead>
      <tbody>
        ${e.episodes.map(
      (n) => L`<tr>
            <td>${new Date(n.start).toLocaleString(r)}</td>
            <td>
              ${this.renderDuration(n)}
              ${n.bridged_seconds > 0 ? L`<span class="hint"
                    >${t.grid.unrecorded({
        duration: qt(n.bridged_seconds, r)
      })}</span
                  >` : k}
            </td>
            ${e.has_soc ? L`<td>${i(n.soc_start)}</td>
                  <td class=${n.below_low ? "low" : ""}>${i(n.soc_min)}</td>
                  <td>${i(n.soc_end)}</td>
                  <td>${this.renderHoursLeft(n)}</td>
                  <td>${this.renderNeeded(n)}</td>` : k}
            ${e.has_load ? L`<td>${pt(n.load_mean_w ?? null, r)}</td>` : k}
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  reserveReason(e) {
    const t = this.i18n.m.grid.reserveReasons;
    return L`<span class="hint">${t[e]}</span>`;
  }
  /** "> 100 %": the need is past what a full battery holds. */
  overFull() {
    return L`<span class="low">&gt; ${Y(1, this.i18n.locale)}</span>`;
  }
  renderHoursLeft(e) {
    const t = fP(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "didNotLast":
        return L`<span class="low">${this.i18n.m.grid.didNotLast}</span>`;
      case "hours":
        return fa(t.hours, this.i18n.locale);
    }
  }
  renderNeeded(e) {
    const t = vP(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "over":
        return L`${this.overFull()}
          <span class="hint">${this.i18n.m.grid.moreThanFull}</span>`;
      case "pct":
        return Y(t.pct / 100, this.i18n.locale);
    }
  }
  renderHardest(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = dP(e);
    if (i.kind === "none")
      return L`<span class="value">${Ge}</span>
        <span class="row"><span>${t.grid.noHardestOutage}</span></span>`;
    const n = t.grid.hardestOutageOn({
      date: new Date(i.start).toLocaleDateString(r)
    });
    return i.kind === "over" ? L`<span class="value">${this.overFull()}</span>
          <span class="row"><span>${n}</span><span>${t.grid.moreThanFull}</span></span>` : L`<span class="value">${Y(i.pct / 100, r)}</span>
          <span class="row"><span>${n}</span></span>`;
  }
  renderReserve(e, t) {
    const r = this.i18n.m, i = this.i18n.locale, n = pP(e);
    return L`
      <div class="cards">
        <div class="card">
          <span class="name">${r.grid.hardestOutageNeeds}</span>
          ${this.renderHardest(e)}
        </div>
        <div class="card">
          <span class="name">${r.grid.outagesCovered}</span>
          <span class="value"
            >${n.kind === "none" ? Ge : r.grid.coveredOf({ covered: n.covered, judged: n.judged })}</span
          >
          <span class="row"
            ><span>${r.grid.coveredHint({ level: Y(t / 100, i) })}</span></span
          >
        </div>
      </div>
      <p class="note">${r.grid.reserveNote}</p>
    `;
  }
  renderAutonomy(e, t) {
    const r = this.i18n.m, i = this.i18n.locale;
    if (e.reason !== null) {
      const a = {
        ...r.grid.autonomyReasons,
        too_little_evidence: r.grid.tooLittleEvidence({
          hours: fa(e.evidence_hours, i)
        })
      };
      return L`<p class="note">${r.grid.noAutonomy} ${a[e.reason]}</p>`;
    }
    const n = e.rate_pct_per_hour;
    return L`
      <div class="cards">
        <div class="card">
          <span class="name"
            >${r.grid.fromFullTo({ level: Y(t / 100, i) })}</span
          >
          <span class="value">${fa(e.hours_from_full, i)}</span>
        </div>
        <div class="card">
          <span class="name">${r.grid.fromNow}</span>
          <span class="value">${fa(e.hours_from_now, i)}</span>
          <span class="row">
            <span>${r.grid.chargeNow}</span>
            <span
              >${e.soc_now === null ? Ge : Y(e.soc_now / 100, i)}</span
            >
          </span>
        </div>
        <div class="card">
          <span class="name">${r.grid.dischargeRate}</span>
          <span class="value"
            >${n === null ? Ge : r.grid.pointsPerHour({ rate: $b(n, r.charts.locale) })}</span
          >
          <span class="row">
            <span>${r.common.meanLoad}</span>
            <span>${pt(e.load_mean_w, i)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        ${r.grid.evidenceNote({ hours: fa(e.evidence_hours, i) })}
      </p>
    `;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, i = Na(t.coverage, r), n = t.days.length === 0, a = _P(t.counted_from ?? t.window.start, t.window.end) - t.days.length, o = t.counted_from ? new Date(t.counted_from).toLocaleDateString(r) : null;
    return L`
      <div class="status">
        <span class="badge">${el(t.precision, t.boundary, r)}</span>
        ${o ? L`<span class="warn">
              ${t.source === "inferred" ? e.grid.countedFromInferred({ date: o }) : e.grid.countedFromNoHistory({ date: o })}
            </span>` : k}
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      ${t.source === "inferred" ? L`<p class="banner">${e.grid.inferredBanner}</p>` : k}

      ${this.renderKpi(t)}

      <section>
        <h2>${e.grid.hoursByDay}</h2>
        ${n ? L`<p class="empty">${e.grid.noDaysWithData}</p>` : L`<ia-chart
                .option=${Qb(t.days, e)}
                height="220px"
              ></ia-chart>
              ${a > 0 ? L`<p class="note">${e.grid.missingDays({ n: a })}</p>` : k}`}
      </section>

      <section>
        <h2>${e.grid.shareByHour}</h2>
        <ia-chart .option=${Jb(t.hours, e)} height="220px"></ia-chart>
        <p class="note">${e.grid.hoursNeverRecorded}</p>
      </section>

      <section>
        <h2>${e.grid.outages}</h2>
        ${this.renderEpisodes(t)}
      </section>

      <section>
        <h2>${e.grid.autonomy}</h2>
        ${this.renderAutonomy(t.autonomy, t.low_pct)}
        ${t.has_soc ? this.renderReserve(t.reserve, t.low_pct) : k}
      </section>
    `;
  }
};
br.styles = [
  vo,
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
      .low { color: var(--error-color, #d64545); font-weight: 500; }
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
], br.prototype, "hass", 2);
zi([
  it({ type: String })
], br.prototype, "entryId", 2);
zi([
  it({ type: String })
], br.prototype, "range", 2);
zi([
  _t()
], br.prototype, "payload", 2);
zi([
  _t()
], br.prototype, "error", 2);
zi([
  _t()
], br.prototype, "loading", 2);
br = zi([
  ke("ia-grid-tab")
], br);
var bP = Object.defineProperty, wP = Object.getOwnPropertyDescriptor, kl = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? wP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && bP(t, r, n), n;
};
let On = class extends Gt {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Je(this);
  }
  renderCards() {
    const e = this.i18n.m, t = e.sections.phases, { rating_per_phase: r } = this.phases;
    return L`<div class="cards">
      ${this.phases.per_phase.map((i) => {
      const n = this.series[i.key]?.coverage;
      return L`<div class="card">
          <span class="name">${Ts(e, i)}</span>
          <span class="value">${pt(i.mean, this.locale)}</span>
          <span class="row"
            ><span>${e.common.peak}</span
            ><span>${pt(i.peak, this.locale)}</span></span
          >
          <span class="row"
            ><span>P95</span><span>${pt(i.p95, this.locale)}</span></span
          >
          <span class="row"
            ><span>${t.shareOfLoad}</span
            ><span>${Y(i.share, this.locale)}</span></span
          >
          <span class="row">
            <span>${t.peakVs({ rating: pt(r, this.locale) })}</span>
            <span>${Y(i.headroom, this.locale)}</span>
          </span>
          ${n !== void 0 && n < 0.95 ? L`<span class="warn">
                ${e.common.coversOfPeriod({ share: cr(n, this.locale) })}
              </span>` : k}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const e = this.i18n.m, t = e.sections.phases, { imbalance: r } = this.phases;
    return r.mean === null ? L`<p class="empty">
        ${t.neverAboveFloor({ floor: pt(r.floor_w, this.locale) })}
      </p>` : L`
      <div class="cards">
        <div class="card">
          <span class="name">${t.meanImbalance}</span>
          <span class="value">${Y(r.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">${t.p95Imbalance}</span>
          <span class="value">${Y(r.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">
            ${t.above({ threshold: Y(r.threshold, this.locale) })}
          </span>
          <span class="value">${Y(r.fraction_above, this.locale)}</span>
          <span class="row"><span>${t.ofMeasuredTime}</span></span>
        </div>
      </div>
      <ia-chart .option=${Gb(r, e)}></ia-chart>
      <p class="note">
        ${t.measuredOver({
      duration: qt(r.analysed_seconds, this.locale),
      share: cr(r.coverage, this.locale)
    })}${r.below_floor_seconds > 0 ? L` ${t.belowFloorExcluded({
      duration: qt(r.below_floor_seconds, this.locale),
      floor: pt(r.floor_w, this.locale)
    })}` : k}
      </p>
    `;
  }
  renderEpisodes() {
    const e = this.i18n.m, { episodes: t, per_phase: r } = this.phases;
    return t.length ? L`<table>
      <thead>
        <tr>
          <th>${e.common.start}</th>
          <th>${e.common.duration}</th>
          <th>${e.sections.phases.worst}</th>
          ${r.map((i) => L`<th>${Ts(e, i)}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${t.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(this.locale)}</td>
            <td>${qt(i.seconds, this.locale)}</td>
            <td>${Y(i.peak_imbalance, this.locale)}</td>
            ${i.phases.map((n) => L`<td>${pt(n, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : L`<p class="empty">${e.sections.phases.noSustained}</p>`;
  }
  render() {
    const { imbalance: e, rating_per_phase: t, rating_per_phase_derived: r, rating_per_phase_divisor: i } = this.phases, n = this.i18n.m.sections.phases;
    return L`
      <section>
        <h2>${n.title}</h2>
        ${this.renderCards()}
        ${r ? L`<p class="note">
              ${n.derivedRating({
      n: i,
      rating: pt(t, this.locale)
    })}
            </p>` : k}
        ${e.aligned_coverage < 0.95 ? L`<p class="warn">
              ${n.alignedLow({ share: cr(e.aligned_coverage, this.locale) })}
            </p>` : k}

        <h3>${n.imbalance}</h3>
        ${this.renderImbalance()}

        <h3>${n.sustainedEpisodes}</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
On.styles = [vo, we`:host { display: block; }`];
kl([
  it({ attribute: !1 })
], On.prototype, "phases", 2);
kl([
  it({ attribute: !1 })
], On.prototype, "series", 2);
kl([
  it({ type: String })
], On.prototype, "locale", 2);
On = kl([
  ke("ia-phases-section")
], On);
var SP = Object.defineProperty, xP = Object.getOwnPropertyDescriptor, Nl = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? xP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && SP(t, r, n), n;
};
let En = class extends Gt {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Je(this);
  }
  render() {
    const e = this.i18n.m, t = e.sections.strings, { parts: r, aligned_coverage: i } = this.strings;
    return L`
      <section>
        <h2>${t.title}</h2>
        <div class="cards">
          ${r.map((n) => {
      const a = this.series[n.key]?.coverage;
      return L`<div class="card">
              <span class="name">${Ts(e, n)}</span>
              <span class="value">${pt(n.mean, this.locale)}</span>
              <span class="row"
                ><span>${e.common.peak}</span
                ><span>${pt(n.peak, this.locale)}</span></span
              >
              <span class="row"
                ><span>${t.shareOfPv}</span
                ><span>${Y(n.share, this.locale)}</span></span
              >
              ${a !== void 0 && a < 0.95 ? L`<span class="warn">
                    ${e.common.coversOfPeriod({ share: cr(a, this.locale) })}
                  </span>` : k}
            </div>`;
    })}
        </div>
        <ia-chart .option=${Wb(r, at.pv, e)}></ia-chart>
        ${i < 0.95 ? L`<p class="warn">
              ${t.alignedLow({ share: cr(i, this.locale) })}
            </p>` : k}
        <p class="note">${t.compare}</p>
      </section>
    `;
  }
};
En.styles = [vo, we`:host { display: block; }`];
Nl([
  it({ attribute: !1 })
], En.prototype, "strings", 2);
Nl([
  it({ attribute: !1 })
], En.prototype, "series", 2);
Nl([
  it({ type: String })
], En.prototype, "locale", 2);
En = Nl([
  ke("ia-strings-section")
], En);
var TP = Object.defineProperty, CP = Object.getOwnPropertyDescriptor, Yr = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? CP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && TP(t, r, n), n;
};
let Qe = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.i18n = new Je(this), this.requestId = 0;
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
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await db(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  /**
   * A total and its parts that cannot both be right.
   *
   * Phrased as a question rather than a verdict: a legitimate installation can
   * have a total that covers more than the parts, so this is evidence the user
   * should look at, not a fault we have proved.
   */
  renderConsistency(e, t) {
    if (!e?.beyond_margin) return k;
    const r = this.i18n.locale;
    return L`<span class="warn">
      ${t({
      total: pt(e.total_mean, r),
      partsTotal: pt(e.parts_mean, r)
    })}
    </span>`;
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = (a) => a === null ? "" : t.load.shareOfRated({ share: Y(a / e.rated_power, r) }), n = [
      [t.load.mean, pt(e.kpi.mean, r), i(e.kpi.mean)],
      [t.load.median, pt(e.kpi.median, r), ""],
      ["P95", pt(e.kpi.p95, r), ""],
      [t.common.peak, pt(e.kpi.max, r), i(e.kpi.max)],
      [t.load.sustained15m, pt(e.kpi.max_sustained_15m, r), ""],
      [
        t.load.above80OfRated,
        Y(e.kpi.fraction_above_80pct, r),
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
  renderOverloads(e) {
    const t = this.i18n.m;
    if (!e.overloads.length)
      return L`<p class="empty">${t.load.noOverloads}</p>`;
    const r = this.i18n.locale;
    return L`<table>
      <thead>
        <tr><th>${t.common.start}</th><th>${t.common.duration}</th><th>${t.common.peak}</th></tr>
      </thead>
      <tbody>
        ${e.overloads.map(
      (i) => L`<tr>
            <td>${new Date(i.start).toLocaleString(r)}</td>
            <td>${qt(i.seconds, r)}</td>
            <td>${pt(i.peak, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return L`
      <div class="status">
        <span class="badge">${el(t.precision, t.boundary, r)}</span>
        ${Na(t.coverage, r) ? L`<span class="warn">${Na(t.coverage, r)}</span>` : k}
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${t.histogram.clipped_low_seconds + t.histogram.clipped_high_seconds > 0 ? L`<span class="warn">${e.load.histogramClipped}</span>` : k}
        ${this.renderConsistency(t.consistency.load, e.load.loadConsistency)}
        ${this.renderConsistency(t.consistency.pv, e.load.pvConsistency)}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      ${this.renderKpi(t)}

      <section>
        <header>
          <h2>${e.load.timeAtPowerLevel}</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? e.load.asPercentOfRated : e.load.inWatts}</button>
        </header>
        <ia-chart .option=${Fb(t, this.mode, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.durationCurve}</h2>
        <ia-chart .option=${Hb(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.ratedBands}</h2>
        <ia-chart .option=${Vb(t, e)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${e.load.overloadEpisodes}</h2>
        ${this.renderOverloads(t)}
      </section>

      ${t.phases ? L`<ia-phases-section
            .phases=${t.phases}
            .series=${t.series}
            .locale=${r}
          ></ia-phases-section>` : k}

      ${t.strings ? L`<ia-strings-section
            .strings=${t.strings}
            .series=${t.series}
            .locale=${r}
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
var MP = Object.defineProperty, DP = Object.getOwnPropertyDescriptor, Fi = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? DP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && MP(t, r, n), n;
};
let wr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "year", this.loading = !1, this.i18n = new Je(this), this.requestId = 0;
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
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await gb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderMonthTable(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = e.months.map((n) => n.key);
    return L`<table>
      <thead>
        <tr>
          <th>${t.seasonality.month}</th>
          <th>${t.common.meanLoad}</th>
          <th>${t.seasonality.busiestHour}</th>
          ${e.has_pv ? L`<th>${t.seasonality.meanPv}</th>` : k}
          <th>${t.seasonality.ofTheMonth}</th>
        </tr>
      </thead>
      <tbody>
        ${e.months.map(
      (n, a) => L`<tr class=${n.complete ? "" : "partial"}>
            <td>${Mc(n.key, i[a - 1], t.charts.locale)}</td>
            <td>${pt(n.load_mean, r)}</td>
            <td>${pt(n.load_peak_hourly, r)}</td>
            ${e.has_pv ? L`<td>${pt(n.pv_mean, r)}</td>` : k}
            <td>${Y(n.coverage, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, i = Na(t.coverage, r), n = t.months.filter((o) => !o.complete && o.load_mean !== null), a = t.months.filter((o) => o.load_mean === null);
    return L`
      <div class="status">
        <span class="badge">${el(t.precision, t.boundary, r)}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${i ? L`<span class="warn">${i}</span>` : k}
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      <section>
        <h2>${e.seasonality.meanByMonth}</h2>
        <ia-chart .option=${Xb(t.months, t.has_pv, e)}></ia-chart>
        ${n.length ? L`<p class="note">
              ${e.seasonality.thinMonths({
      n: n.length,
      share: Y(t.incomplete_below, r)
    })}
              ${e.seasonality.partialNotLower}
            </p>` : k}
        ${a.length ? L`<p class="note">
              ${e.seasonality.absentMonths({ n: a.length })}
              ${e.seasonality.statisticsFromStart}
            </p>` : k}
      </section>

      <section>
        <h2>${e.seasonality.monthByMonth}</h2>
        ${this.renderMonthTable(t)}
        <p class="note">${e.seasonality.busiestHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.meanByHour}</h2>
        <ia-chart .option=${qb(t.hours, t.has_pv, e)}></ia-chart>
        <p class="note">${e.seasonality.byHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.hourByMonth}</h2>
        <ia-chart
          .option=${Zb(t.cells, t.months, e)}
          height="420px"
        ></ia-chart>
        <p class="note">${e.seasonality.heatmapNote}</p>
      </section>
    `;
  }
};
wr.styles = we`
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
], wr.prototype, "hass", 2);
Fi([
  it({ type: String })
], wr.prototype, "entryId", 2);
Fi([
  it({ type: String })
], wr.prototype, "range", 2);
Fi([
  _t()
], wr.prototype, "payload", 2);
Fi([
  _t()
], wr.prototype, "error", 2);
Fi([
  _t()
], wr.prototype, "loading", 2);
wr = Fi([
  ke("ia-seasonality-tab")
], wr);
function Xg(e, t) {
  switch (t) {
    case "enough":
      return e.verdict.enough;
    case "borderline":
      return e.verdict.borderline;
    case "short":
      return e.verdict.short;
    default:
      return e.verdict.none;
  }
}
function qg(e, t, r, i) {
  return t === "battery" && r === "never_full" ? i === "ceiling" ? e.verdict.neverReachedLimit : e.verdict.neverFull : t === "solar" && r === "no_fill" ? e.verdict.noFill : e.verdict.noData[t];
}
function AP(e, t, r, i) {
  return t === "battery" && r === "never_full" ? i === "ceiling" ? e.verdict.hintLimitNotReached : e.verdict.hintNeverFilled : t === "solar" && r === "no_fill" ? e.verdict.hintNoFill : e.verdict.hintNoData;
}
function IP(e) {
  const t = e.period.solar;
  if (t) return typeof t.evidence.fill_share == "number";
  const r = e.cards.battery;
  return !r.missing.length && !r.thresholds_inverted;
}
function LP(e) {
  return e.rules.export_limited === !0 ? e.rules.full_mode === "ceiling" ? "no_export" : "no_export_fixed" : IP(e) ? "with_fill" : "plain";
}
function PP(e, t, r) {
  if (t.cards.battery.missing.includes("battery_soc")) return null;
  const i = t.rules;
  if (i.full_mode === "ceiling") return e.sizing.fullModeCeiling;
  const n = i.ceiling_missing ?? [];
  if (n.length)
    return e.sizing.fullModeFixed({ full: r, roles: Ba(e, n, !0), n: n.length });
  const a = i.ceiling_no_rows ?? [];
  return a.length ? e.sizing.fullModeNoRows({ full: r, roles: Ba(e, a, !0), n: a.length }) : e.sizing.fullModePlain({ full: r });
}
var $P = Object.defineProperty, RP = Object.getOwnPropertyDescriptor, Hi = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? RP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && $P(t, r, n), n;
};
const OP = ["inverter", "battery", "solar"], Me = "—";
function EP(e, t) {
  const [r, i] = e.split("-").map(Number);
  return new Date(r, i - 1, 1).toLocaleDateString(t, {
    month: "short",
    year: "numeric"
  });
}
let Sr = class extends Gt {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Je(this), this.requestId = 0;
  }
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = kn(this.range, /* @__PURE__ */ new Date()), i = await _b(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  /** The one figure a rule turned on, for a month cell. */
  cellFigure(e, t, r) {
    const i = this.i18n.m, n = t.evidence;
    return e === "inverter" ? i.sizing.hoursAtRated({ hours: `${n.hours_at_rated ?? 0}` }) : e === "battery" ? i.sizing.daysOf({
      days: `${n.days_full_and_low ?? 0}`,
      total: n.days_with_data ?? 0
    }) : n.production_share === null || n.production_share === void 0 ? Me : i.sizing.ofLoad({ share: Y(n.production_share, r) });
  }
  renderEvidence(e, t, r, i) {
    const n = this.i18n.m, a = t.evidence, o = (l, u) => n.sizing.countOf({ count: `${l ?? Me}`, total: `${u ?? Me}` }), s = (l, u) => L`<span class="row"><span>${l}</span><span>${u}</span></span>`;
    return e === "inverter" ? L`
        ${s(n.sizing.hoursReachedRated, o(a.hours_at_rated, a.measured_hours))}
        ${s(
      n.sizing.hoursAboveOfRated({ share: Y(r.high_load_share, i) }),
      `${a.hours_above_high ?? Me}`
    )}
        ${s(n.sizing.highestPeak, pt(a.peak_w ?? null, i))}
      ` : e === "battery" ? L`
        ${s(n.sizing.daysFilledAndLow, o(a.days_full_and_low, a.days_with_data))}
        ${s(n.sizing.daysLowWithoutFilling, `${a.days_low_without_full ?? Me}`)}
        ${s(n.sizing.daysFilled, `${a.days_full ?? Me}`)}
        ${s(
      n.sizing.lowestCharge,
      a.lowest_pct === null || a.lowest_pct === void 0 ? Me : Y(a.lowest_pct / 100, i)
    )}
      ` : L`
      ${s(
      n.sizing.productionShare,
      a.production_share === null || a.production_share === void 0 ? Me : Y(a.production_share, i)
    )}
      ${s(
      n.sizing.producedConsumed,
      `${Xt(a.pv_kwh ?? null, i)} / ${Xt(a.load_kwh ?? null, i)}`
    )}
      ${s(
      n.common.selfSufficiency,
      a.self_sufficiency === null || a.self_sufficiency === void 0 ? Me : Y(a.self_sufficiency, i)
    )}
      ${s(
      n.sizing.daysBatteryFilled,
      a.fill_share === null || a.fill_share === void 0 ? Me : Y(a.fill_share, i)
    )}
    `;
  }
  /**
   * The rule the verdict was read by, in the reader's own numbers.
   *
   * Takes the whole payload and not just the rules because neither the
   * battery nor the solar rule is the same rule on every installation. The
   * battery rule names the charge limit when "full" was read from it. The
   * solar rule has three forms (see solarRuleKind): a system that kept its
   * production in is judged by days at the charge limit; otherwise the fill
   * clause is printed only when the span has a fill share, which is when the
   * verdict tested it. With no charge sensor, inverted thresholds, or a charge
   * sensor with no rows in the span, printing the clause would describe a
   * condition the verdict never tested.
   */
  ruleSentence(e, t, r) {
    const i = this.i18n.m, n = t.rules, a = (l) => Y(l, r);
    if (e === "inverter")
      return i.sizing.inverterRule({
        shortShare: a(n.inverter_short_share),
        highShare: a(n.high_load_share),
        borderlineShare: a(n.inverter_borderline_share)
      });
    if (e === "battery")
      return n.full_mode === "ceiling" ? i.sizing.batteryRuleCeiling({
        low: a(n.low_pct / 100),
        share: a(n.battery_short_share)
      }) : i.sizing.batteryRule({
        full: a(n.full_pct / 100),
        low: a(n.low_pct / 100),
        share: a(n.battery_short_share)
      });
    const o = a(n.solar_enough_share), s = a(n.solar_borderline_share);
    switch (LP(t)) {
      case "no_export":
        return i.sizing.solarRuleNoExport({
          fill: a(n.solar_fill_share),
          borderlineFill: a(n.solar_curtailed_borderline_share),
          borderline: s
        });
      case "no_export_fixed":
        return i.sizing.solarRuleNoExportFixed({
          full: a(n.full_pct / 100),
          fill: a(n.solar_fill_share),
          borderlineFill: a(n.solar_curtailed_borderline_share),
          borderline: s
        });
      case "with_fill":
        return i.sizing.solarRuleWithFill({
          enough: o,
          fill: a(n.solar_fill_share),
          borderline: s
        });
      case "plain":
        return i.sizing.solarRule({ enough: o, borderline: s });
    }
  }
  /**
   * What the card is short of before any verdict can be read, or null.
   *
   * The configuration answers come in one order: a role that is not mapped,
   * then marks that cannot be told apart, then a sensor that keeps no
   * statistics. Each of them is something the reader can go and change, and
   * each makes the verdict below it meaningless, so they outrank it.
   */
  renderSetupNote(e, t) {
    const r = this.i18n.m, i = this.i18n.locale, n = t.cards[e];
    if (n.missing.length) {
      const a = n.missing.length === 1 && n.missing[0] === "rated_power";
      return L`<p class="note">
        ${a ? r.sizing.needsNotSet({ roles: Ba(r, n.missing, !0) }) : r.sizing.needsNotMapped({
        roles: Ba(r, n.missing, !0),
        n: n.missing.length
      })}
      </p>`;
    }
    if (n.thresholds_inverted)
      return L`<p class="note">
        ${r.sizing.thresholdsInverted({
        full: Y(t.rules.full_pct / 100, i),
        low: Y(t.rules.low_pct / 100, i)
      })}
      </p>`;
    if (n.no_statistics.length) {
      const a = n.no_statistics.length;
      return L`<p class="note">
        ${r.sizing.noStatisticsBefore({ sensors: n.no_statistics.join(", "), n: a })}
        <code>state_class</code> ${r.sizing.noStatisticsAfter({ n: a })}
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
  renderCoverageNote(e, t) {
    if (e.coverage === 0 || e.coverage >= t.incomplete_below) return k;
    const r = this.i18n.locale;
    return L`<p class="note">
      ${this.i18n.m.sizing.readFrom({ share: cr(e.coverage, r) })}
    </p>`;
  }
  renderCard(e, t) {
    const r = this.i18n.m, i = this.i18n.locale, n = t.period[e], a = this.renderSetupNote(e, t);
    let o;
    return a !== null ? o = a : n === null ? o = L`<p class="note">
        ${qg(r, e, "no_data", t.rules.full_mode)}
      </p>` : n.verdict === null ? o = L`
        <p class="note">
          ${qg(r, e, n.reason ?? "no_data", t.rules.full_mode)}
        </p>
        ${this.renderCoverageNote(n, t)}
      ` : o = L`
        ${this.renderEvidence(e, n, t.rules, i)}
        ${this.renderCoverageNote(n, t)}
        ${n.note === "covers_but_battery_not_filling" ? L`<p class="note">
              ${r.sizing.batteryNotFilling({
      share: Y(n.evidence.fill_share ?? 0, i)
    })}
            </p>` : k}
        <p class="note">${this.ruleSentence(e, t, i)}</p>
      `, L`<div class="card">
      <span class="name">${r.sizing.cards[e]}</span>
      <span class="value ${n?.verdict ?? "none"}"
        >${Xg(r, n?.verdict ?? null)}</span
      >
      ${o}
    </div>`;
  }
  renderMonths(e) {
    const t = this.i18n.m, r = this.i18n.locale, i = (n, a) => {
      const o = a[n];
      if (o === null || e.cards[n].no_statistics.length)
        return L`<td class="none">${Me}</td>`;
      const s = a.complete && o.coverage < e.incomplete_below;
      return L`<td class=${o.verdict ?? "none"}>
        ${Xg(t, o.verdict)}
        ${o.verdict === null ? (
        // Why there is no verdict: a month the battery never filled is the
        // rule working, a month with no statistics is missing data, and
        // "No verdict" alone reads the same for both.
        L`<span class="hint"
              >${AP(t, n, o.reason ?? "no_data", e.rules.full_mode)}</span
            >`
      ) : L`<span class="hint">${this.cellFigure(n, o, r)}</span>`}
        ${s ? L`<span class="hint"
              >${t.sizing.cellCoverage({ share: cr(o.coverage, r) })}</span
            >` : k}
      </td>`;
    };
    return e.months.length ? L`<table>
      <thead>
        <tr>
          <th>${t.seasonality.month}</th>
          <th>${t.sizing.parts.inverter}</th>
          <th>${t.sizing.parts.battery}</th>
          <th>${t.sizing.parts.solar}</th>
        </tr>
      </thead>
      <tbody>
        ${e.months.map(
      (n) => L`<tr class=${n.complete ? "" : "partial"}>
            <td>
              ${EP(n.key, r)}
              ${n.coverage === 0 ? L`<span class="hint">${t.verdict.hintNoData}</span>` : n.complete ? k : L`<span class="hint"
                      >${t.sizing.ofTheMonth({
        share: cr(n.coverage, r)
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
    const e = this.i18n.m;
    if (this.error !== void 0)
      return L`<div class="notice">
        ${e.common.couldNotLoadData({ error: Ei(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return L`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, i = (a) => e.sizing.ruleLine({
      part: e.sizing.parts[a],
      rule: this.ruleSentence(a, t, r)
    }), n = PP(e, t, Y(t.rules.full_pct / 100, r));
    return L`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${t.clamped ? L`<span class="warn">${e.common.periodShortened}</span>` : k}
        ${!t.covers_whole_window && t.covered_end ? L`<span class="warn"
              >${e.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}</span
            >` : k}
        ${t.covered_end ? k : L`<span class="warn">${e.sizing.noStatistics}</span>`}
        ${this.loading ? L`<span class="warn">${e.common.refreshing}</span>` : k}
      </div>

      <section>
        <div class="cards">${OP.map((a) => this.renderCard(a, t))}</div>
      </section>

      <section>
        <h2>${e.seasonality.monthByMonth}</h2>
        ${this.renderMonths(t)}
        <p class="note">
          ${e.sizing.greyMonths({ share: Y(t.incomplete_below, r) })}
        </p>
      </section>

      <section>
        <h2>${e.sizing.howVerdictsRead}</h2>
        <p class="note">${i("inverter")}</p>
        <p class="note">${i("battery")}</p>
        <p class="note">${i("solar")}</p>
        ${n ? L`<p class="note">${n}</p>` : k}
        <p class="note">${e.sizing.hourlyNotMean}</p>
      </section>
    `;
  }
};
Sr.styles = [
  vo,
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
], Sr.prototype, "hass", 2);
Hi([
  it({ type: String })
], Sr.prototype, "entryId", 2);
Hi([
  it({ type: String })
], Sr.prototype, "range", 2);
Hi([
  _t()
], Sr.prototype, "payload", 2);
Hi([
  _t()
], Sr.prototype, "error", 2);
Hi([
  _t()
], Sr.prototype, "loading", 2);
Sr = Hi([
  ke("ia-sizing-tab")
], Sr);
var kP = Object.defineProperty, NP = Object.getOwnPropertyDescriptor, Cr = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? NP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && kP(t, r, n), n;
};
const BP = "/inverter-analytics", Zg = ["load", "battery", "seasonal", "balance", "grid", "sizing"];
let Ee = class extends Gt {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.i18n = new Je(this), this.readLocation = () => {
      const e = Eb(
        window.location.pathname,
        window.location.search,
        Zg,
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = e.tab, this.range = e.range, this.entryId = e.entryId;
    }, this.loadConfig = Rb(() => this.requestConfig());
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.hass && this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  willUpdate(e) {
    e.has("hass") && Ib(this.hass?.locale?.language), e.has("hass") && this.hass && !this.config && this.error === void 0 && this.loadConfig();
  }
  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  writeLocation(e = !1) {
    const t = kb(BP, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    e ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await vb(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
    } catch (e) {
      this.error = e === void 0 ? String(e) : e;
    }
  }
  get entry() {
    return this.config?.entries.find((e) => e.entry_id === this.entryId);
  }
  /**
   * What the backend says about one tab. A tab with no feature of its own is
   * treated as available: the panel must not hide a tab because a version of
   * the integration older than the tab had nothing to say about it.
   */
  feature(e) {
    return this.entry?.features?.find((t) => t.key === e);
  }
  selectTab(e) {
    this.tab = e, this.writeLocation(!0);
  }
  selectRange(e) {
    this.range = e, this.writeLocation();
  }
  selectEntry(e) {
    this.entryId = e, this.writeLocation();
  }
  render() {
    const e = this.i18n.m;
    return this.error !== void 0 ? L`<div class="notice">
        ${e.panel.couldNotLoad({ error: Ei(this.error, e) })}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          ${e.common.tryAgain}
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
        <div class="langs" role="group" aria-label=${e.panel.language}>
          ${xb.map(
      (t) => L`<button
              class=${t === this.i18n.lang ? "active" : ""}
              aria-pressed=${t === this.i18n.lang ? "true" : "false"}
              @click=${() => Ab(t)}
            >${t.toUpperCase()}</button>`
    )}
        </div>
        <div class="ranges">
          ${ay.map(
      (t) => L`<button
              class=${t === this.range ? "active" : ""}
              aria-pressed=${t === this.range ? "true" : "false"}
              @click=${() => this.selectRange(t)}
            >${Ob(e, t)}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${Zg.map((t) => {
      const r = this.feature(t)?.available === !1;
      return L`<button
            class="${t === this.tab ? "active" : ""} ${r ? "muted" : ""}"
            @click=${() => this.selectTab(t)}
          >${e.panel.tabs[t]}</button>`;
    })}
      </nav>

      <main>
        ${this.renderTab()}
      </main>
    ` : L`<div class="notice">
        ${e.panel.noInverter}
      </div>` : L`<div class="notice">${e.panel.loading}</div>`;
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
    const e = this.i18n.m, t = this.feature(this.tab);
    if (t && !t.available) {
      const r = {
        feature: e.features[t.key] ?? t.label,
        // Every role is set off by common.quoted; the dictionary never quotes.
        roles: Ba(e, t.missing, !0)
      };
      return L`<div class="notice">
        <p>
          ${t.missing.length === 1 ? e.panel.missingOne(r) : e.panel.missingMany(r)}
        </p>
        <p>
          ${e.panel.reconfigureBefore}<strong>${e.panel.reconfigure}</strong
          >${e.panel.reconfigureAfter}
        </p>
        <a href=${zb}>${e.panel.goToSettings}</a>
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
Cr([
  it({ attribute: !1 })
], Ee.prototype, "hass", 2);
Cr([
  it({ type: Boolean })
], Ee.prototype, "narrow", 2);
Cr([
  it({ attribute: !1 })
], Ee.prototype, "route", 2);
Cr([
  _t()
], Ee.prototype, "config", 2);
Cr([
  _t()
], Ee.prototype, "error", 2);
Cr([
  _t()
], Ee.prototype, "entryId", 2);
Cr([
  _t()
], Ee.prototype, "tab", 2);
Cr([
  _t()
], Ee.prototype, "range", 2);
Ee = Cr([
  ke("inverter-analytics-panel")
], Ee);
export {
  Ee as InverterAnalyticsPanel
};

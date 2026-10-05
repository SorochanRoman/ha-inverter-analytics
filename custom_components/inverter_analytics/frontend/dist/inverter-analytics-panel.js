/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ls = globalThis, Cc = ls.ShadowRoot && (ls.ShadyCSS === void 0 || ls.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mc = Symbol(), Ff = /* @__PURE__ */ new WeakMap();
let iy = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== Mc) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Cc && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Ff.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ff.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const nb = (e) => new iy(typeof e == "string" ? e : e + "", void 0, Mc), ue = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, a) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new iy(r, e, Mc);
}, ib = (e, t) => {
  if (Cc) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = ls.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Hf = Cc ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return nb(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ab, defineProperty: ob, getOwnPropertyDescriptor: sb, getOwnPropertyNames: lb, getOwnPropertySymbols: ub, getPrototypeOf: hb } = Object, il = globalThis, Vf = il.trustedTypes, cb = Vf ? Vf.emptyScript : "", fb = il.reactiveElementPolyfillSupport, Ma = (e, t) => e, Ds = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? cb : null;
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
} }, Dc = (e, t) => !ab(e, t), Gf = { attribute: !0, type: String, converter: Ds, reflect: !1, useDefault: !1, hasChanged: Dc };
Symbol.metadata ??= Symbol("metadata"), il.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let li = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Gf) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && ob(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: a } = sb(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: i, set(o) {
      const s = i?.call(this);
      a?.call(this, o), this.requestUpdate(t, s, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Gf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ma("elementProperties"))) return;
    const t = hb(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ma("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ma("properties"))) {
      const r = this.properties, n = [...lb(r), ...ub(r)];
      for (const i of n) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, i] of r) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const i = this._$Eu(r, n);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) r.unshift(Hf(i));
    } else t !== void 0 && r.push(Hf(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ib(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$ET(t, r) {
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const a = (n.converter?.toAttribute !== void 0 ? n.converter : Ds).toAttribute(r, n.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Ds;
      this._$Em = i;
      const s = o.fromAttribute(r, a.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[t]), n ??= o.getPropertyOptions(t), !((n.hasChanged ?? Dc)(a, r) || n.useDefault && n.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: i, wrapped: a }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, a] of n) {
        const { wrapped: o } = a, s = this[i];
        o !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, a, s);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
li.elementStyles = [], li.shadowRootOptions = { mode: "open" }, li[Ma("elementProperties")] = /* @__PURE__ */ new Map(), li[Ma("finalized")] = /* @__PURE__ */ new Map(), fb?.({ ReactiveElement: li }), (il.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ac = globalThis, Wf = (e) => e, As = Ac.trustedTypes, Uf = As ? As.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ay = "$lit$", kr = `lit$${Math.random().toFixed(9).slice(2)}$`, oy = "?" + kr, vb = `<${oy}>`, $n = document, za = () => $n.createComment(""), Fa = (e) => e === null || typeof e != "object" && typeof e != "function", Ic = Array.isArray, db = (e) => Ic(e) || typeof e?.[Symbol.iterator] == "function", Gl = `[ 	
\f\r]`, qi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yf = /-->/g, Xf = />/g, Kr = RegExp(`>|${Gl}(?:([^\\s"'>=/]+)(${Gl}*=${Gl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qf = /'/g, Zf = /"/g, sy = /^(?:script|style|textarea|title)$/i, pb = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), I = pb(1), Mi = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Kf = /* @__PURE__ */ new WeakMap(), xn = $n.createTreeWalker($n, 129);
function ly(e, t) {
  if (!Ic(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Uf !== void 0 ? Uf.createHTML(t) : t;
}
const gb = (e, t) => {
  const r = e.length - 1, n = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = qi;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, h, c = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, h = o.exec(l), h !== null); ) f = o.lastIndex, o === qi ? h[1] === "!--" ? o = Yf : h[1] !== void 0 ? o = Xf : h[2] !== void 0 ? (sy.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = Kr) : h[3] !== void 0 && (o = Kr) : o === Kr ? h[0] === ">" ? (o = i ?? qi, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Kr : h[3] === '"' ? Zf : qf) : o === Zf || o === qf ? o = Kr : o === Yf || o === Xf ? o = qi : (o = Kr, i = void 0);
    const v = o === Kr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === qi ? l + vb : c >= 0 ? (n.push(u), l.slice(0, c) + ay + l.slice(c) + kr + v) : l + kr + (c === -2 ? s : v);
  }
  return [ly(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ha {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = gb(t, r);
    if (this.el = Ha.createElement(u, n), xn.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = xn.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(ay)) {
          const f = h[o++], v = i.getAttribute(c).split(kr), d = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: a, name: d[2], strings: v, ctor: d[1] === "." ? mb : d[1] === "?" ? _b : d[1] === "@" ? bb : al }), i.removeAttribute(c);
        } else c.startsWith(kr) && (l.push({ type: 6, index: a }), i.removeAttribute(c));
        if (sy.test(i.tagName)) {
          const c = i.textContent.split(kr), f = c.length - 1;
          if (f > 0) {
            i.textContent = As ? As.emptyScript : "";
            for (let v = 0; v < f; v++) i.append(c[v], za()), xn.nextNode(), l.push({ type: 2, index: ++a });
            i.append(c[f], za());
          }
        }
      } else if (i.nodeType === 8) if (i.data === oy) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(kr, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += kr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const n = $n.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Di(e, t, r = e, n) {
  if (t === Mi) return t;
  let i = n !== void 0 ? r._$Co?.[n] : r._$Cl;
  const a = Fa(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ??= [])[n] = i : r._$Cl = i), i !== void 0 && (t = Di(e, i._$AS(e, t.values), i, n)), t;
}
class yb {
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
    const { el: { content: r }, parts: n } = this._$AD, i = (t?.creationScope ?? $n).importNode(r, !0);
    xn.currentNode = i;
    let a = xn.nextNode(), o = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new lo(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new wb(a, this, t)), this._$AV.push(u), l = n[++s];
      }
      o !== l?.index && (a = xn.nextNode(), o++);
    }
    return xn.currentNode = $n, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class lo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = Di(this, t, r), Fa(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== Mi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : db(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && Fa(this._$AH) ? this._$AA.nextSibling.data = t : this.T($n.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ha.createElement(ly(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const a = new yb(i, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = Kf.get(t.strings);
    return r === void 0 && Kf.set(t.strings, r = new Ha(t)), r;
  }
  k(t) {
    Ic(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const a of t) i === r.length ? r.push(n = new lo(this.O(za()), this.O(za()), this, this.options)) : n = r[i], n._$AI(a), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const n = Wf(t).nextSibling;
      Wf(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class al {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, a) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = E;
  }
  _$AI(t, r = this, n, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Di(this, t, r, 0), o = !Fa(t) || t !== this._$AH && t !== Mi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Di(this, s[n + l], r, l), u === Mi && (u = this._$AH[l]), o ||= !Fa(u) || u !== this._$AH[l], u === E ? t = E : t !== E && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class mb extends al {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
class _b extends al {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== E);
  }
}
class bb extends al {
  constructor(t, r, n, i, a) {
    super(t, r, n, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Di(this, t, r, 0) ?? E) === Mi) return;
    const n = this._$AH, i = t === E && n !== E || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== E && (n === E || i);
    i && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class wb {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Di(this, t);
  }
}
const Sb = Ac.litHtmlPolyfillSupport;
Sb?.(Ha, lo), (Ac.litHtmlVersions ??= []).push("3.3.3");
const xb = (e, t, r) => {
  const n = r?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const a = r?.renderBefore ?? null;
    n._$litPart$ = i = new lo(t.insertBefore(za(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lc = globalThis;
class Ht extends li {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xb(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Mi;
  }
}
Ht._$litElement$ = !0, Ht.finalized = !0, Lc.litElementHydrateSupport?.({ LitElement: Ht });
const Tb = Lc.litElementPolyfillSupport;
Tb?.({ LitElement: Ht });
(Lc.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cb = { attribute: !0, type: String, converter: Ds, reflect: !1, hasChanged: Dc }, Mb = (e = Cb, t, r) => {
  const { kind: n, metadata: i } = r;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(r.name, e), n === "accessor") {
    const { name: o } = r;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(o, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, e, s), s;
    } };
  }
  if (n === "setter") {
    const { name: o } = r;
    return function(s) {
      const l = this[o];
      t.call(this, s), this.requestUpdate(o, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function et(e) {
  return (t, r) => typeof r == "object" ? Mb(e, t, r) : ((n, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, n), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function yt(e) {
  return et({ ...e, state: !0, attribute: !1 });
}
function Db(e) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function Ab(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Ib(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Lb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/seasonality",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function $b(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/balance",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Pb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/grid",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Rb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/sizing",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Ob(e, t) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/health",
    entry_id: t
  });
}
const jf = /* @__PURE__ */ new Map();
function Eb(e) {
  let t = jf.get(e);
  return t || (t = new Intl.PluralRules(e), jf.set(e, t)), t;
}
function At(e, t, r) {
  const n = Eb(e).select(t);
  return n === "one" ? r.one : n === "few" ? r.few ?? r.other : n === "many" ? r.many ?? r.other : r.other;
}
const kb = {
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
    ofRated: "of rated",
    // Percentage points: the difference between two shares.
    pp: "pp"
  },
  panel: {
    language: "Language",
    // The accessible name of the period buttons' group.
    period: "Period",
    couldNotLoad: (e) => `Could not load configuration: ${e.error}`,
    loading: "Loading…",
    noInverter: "No inverter is configured yet. Add the Inverter Analytics integration in settings.",
    tabs: {
      load: "Load",
      battery: "Battery",
      seasonal: "Seasonality",
      balance: "Balance",
      grid: "Grid",
      sizing: "Sizing",
      health: "Health"
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
    sizing: "Sizing",
    health: "Health"
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
    outagesBegan: (e) => e.n === 0 ? "no outages began" : At("en", e.n, {
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
    thinMonths: (e) => At("en", e.n, {
      one: `One month is covered by less than ${e.share} of its days and is drawn in grey.`,
      other: `${e.n} months are covered by less than ${e.share} of their days and are drawn in grey.`
    }),
    partialNotLower: "A month the recorder only saw part of is not a lower month; the figures stand, the comparison does not.",
    absentMonths: (e) => At("en", e.n, {
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
    missingDays: (e) => At("en", e.n, {
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
  // health.ts and the Health tab. No verdicts anywhere: each figure is set
  // beside the same month a year earlier and the reader decides.
  health: {
    cards: {
      capacity: "Battery capacity",
      efficiency: "Round-trip efficiency",
      solar: "Solar production",
      inverter: "Inverter load"
    },
    // Chart and table headings: the solar card holds two signals.
    signals: {
      capacity: "Usable capacity",
      efficiency: "Round-trip efficiency",
      solar_energy: "Energy",
      best_hour: "Best hour",
      inverter: "Hours near rated power"
    },
    columns: {
      month: "Month",
      value: "Figure",
      previous: "A year earlier",
      difference: "Difference",
      share: "Change"
    },
    // The status badge, from the first month with a figure.
    wholeHistory: (e) => `Whole history, from ${e.month}`,
    wholeHistoryEmpty: "Whole history — no month has a figure yet",
    // The figure above each card and its caption.
    lastTwelve: "Last 12 months against the 12 before",
    meanOfMonthly: "mean of the monthly figures",
    twelveBefore: (e) => `the 12 before: ${e.value}`,
    notEnough: (e) => `Not enough months to compare: the last 12 have ${e.recent} with a figure and the 12 before have ${e.previous}; each side needs ${e.needed}.`,
    // The dimmed period buttons while the tab is open: their group's
    // accessible name, their title, and a note shown beside them.
    periodNotUsed: "Health reads the whole history; the period does not apply here.",
    // Under an inverter month's figure.
    inverterHint: (e) => `${e.atRated} h at rated, of ${e.measured} h measured`,
    // Why a month has no figure, keyed by the payload's reason.
    reasons: {
      too_few_clean_hours: (e) => `${At("en", e.n, {
        one: `Only ${e.n} clean discharge hour`,
        other: `Only ${e.n} clean discharge hours`
      })} this month; it needs ${e.minHours}, or one strange hour moves the figure.`,
      no_soc: "No state of charge this month, so there is no telling whether the battery ended where it began.",
      counters_partial: "The charge and discharge counters do not cover the same hours this month, so what went in and what came out are not from the same span.",
      soc_partial: "The state of charge covers only part of the hours the counters do, so the check that the battery ended where it began would not cover the same span.",
      drift: (e) => `The charge ended more than ${e.points} points from where it began, so part of what came out went in another month, or the reverse.`,
      too_little_throughput: (e) => `Less than ${e.min} went into the battery this month — too little to read an efficiency from.`,
      partial_month: "Only part of this month has statistics, and a part is not compared with a whole month.",
      curtailed: (e) => `${At("en", e.n, {
        one: `Only ${e.n} hour of sun`,
        other: `Only ${e.n} hours of sun`
      })} the system could take in full; the best hour needs ${e.minHours}.`
    },
    // bestHourCaption.
    bestHourCaption: {
      unconstrained: "Hours when the battery was at its charge limit are left out: the inverter may have cut the array back to what the house used, so their peak may be the load, not the array.",
      all: "Read from every hour. Without the state of charge, battery power and PV power, an hour the system could not take cannot be told apart, so a low month may be the house and not the array.",
      exporting: "Read from every hour. This system exports, so a full battery does not cut the array back — the surplus goes to the grid — and every hour's peak is the array's."
    },
    // energyCaption.
    energyCaption: {
      household: "This system does not export, so the energy is what the house used, not what the array could give: its difference from a year earlier measures the household. Read the best hour for the array.",
      array: "Energy carries the weather: a dull month is low for reasons of its own. The best hour carries much less of it."
    },
    // The reference line on the capacity chart, and why it is not a target.
    nameplate: (e) => `Nameplate ${e.value}`,
    nameplateNote: "The nameplate is what the maker printed; the line is what the battery delivered, read through the BMS's estimate of its charge. They are different quantities: watch the shape of the line over the years, not its distance from the nameplate.",
    // The block at the foot of the tab.
    howRead: "How these are read",
    definitions: {
      capacity: (e) => `Usable capacity comes from clean discharge hours: hours in which the charge counter moved by at most ${e.charge}, the discharge counter moved, and the state of charge fell by at least ${e.drop} points. The discharge over the fall is the energy per point; times a hundred, the capacity. A month needs ${e.minHours} such hours. A recalibration by the BMS inside one can only pull a month's figure down.`,
      efficiency: (e) => `Round-trip efficiency is what came out of the battery over what went in, from the counters' monthly sums. A month has no figure when its charge ended more than ${e.points} points from where it began, or when less than ${e.min} went in.`,
      solar: (e) => `Solar production is the PV counter's energy per month. The best hour is the month's highest hourly peak of PV power — close to a clear-sky figure. Hours the system could not take are left out, and a month needs ${e.minHours} other hours of sun at or above ${e.minPower}.`,
      inverter: (e) => `Inverter load counts the hours whose peak reached the current rated power, and those whose peak reached ${e.share} of it; every year is counted against today's rating. That is how the house is used, not the state of the hardware: without a temperature or fault sensor the data can say nothing more about the inverter itself.`
    },
    caveats: {
      bms: "The state of charge is the battery management system's estimate, not a measurement. It drifts and is recalibrated, so one month can move for reasons that are not the battery.",
      weather: "A month's energy follows its weather: a dull year reads like a weaker array. The best hour carries much less of it."
    }
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
      driftBelow: (e) => `The charge ended ${e.n} ${At("en", e.n, { one: "point", other: "points" })} below where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      driftAbove: (e) => `The charge ended ${e.n} ${At("en", e.n, { one: "point", other: "points" })} above where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
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
      derivedRating: (e) => `No per-phase rating is configured, so the total is split across ${e.n} ${At("en", e.n, { one: "phase", other: "phases" })} — ${e.rating} each. Set the real figure in the integration's options if the hardware differs.`,
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
}, Nb = {
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
    ofRated: "від номінальної",
    pp: "в.п."
  },
  panel: {
    language: "Мова",
    period: "Період",
    couldNotLoad: (e) => `Не вдалося завантажити конфігурацію: ${e.error}`,
    loading: "Завантаження…",
    noInverter: "Ще не налаштовано жодного інвертора. Додайте інтеграцію Inverter Analytics у налаштуваннях.",
    tabs: {
      load: "Навантаження",
      battery: "Батарея",
      seasonal: "Сезонність",
      balance: "Баланс",
      grid: "Мережа",
      sizing: "Достатність",
      health: "Стан"
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
    sizing: "Достатність",
    health: "Стан"
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
    outagesBegan: (e) => e.n === 0 ? "жодне відключення не почалося" : At("uk", e.n, {
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
    thinMonths: (e) => At("uk", e.n, {
      one: `${e.n === 1 ? "Один" : e.n} місяць має дані менш ніж за ${e.share} своїх днів і показаний сірим.`,
      few: `${e.n} місяці мають дані менш ніж за ${e.share} своїх днів і показані сірим.`,
      many: `${e.n} місяців мають дані менш ніж за ${e.share} своїх днів і показані сірим.`,
      other: `${e.n} місяця мають дані менш ніж за ${e.share} своїх днів і показані сірим.`
    }),
    partialNotLower: "Місяць, який реєстратор бачив лише частково, — не нижчий місяць: самі значення правильні, а порівняння — ні.",
    // Для одного місяця, для 21 місяця, для 3 місяців, для 5 місяців.
    absentMonths: (e) => At("uk", e.n, {
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
    missingDays: (e) => At("uk", e.n, {
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
    daysOf: (e) => `${e.days} з ${e.total} ` + At("uk", e.total, { one: "дня", few: "днів", many: "днів", other: "дня" }),
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
  health: {
    cards: {
      capacity: "Ємність батареї",
      efficiency: "ККД заряду-розряду",
      solar: "Сонячна генерація",
      inverter: "Навантаження інвертора"
    },
    signals: {
      capacity: "Корисна ємність",
      efficiency: "ККД заряду-розряду",
      solar_energy: "Енергія",
      best_hour: "Найкраща година",
      inverter: "Години біля номінальної потужності"
    },
    columns: {
      month: "Місяць",
      value: "Значення",
      previous: "Рік тому",
      difference: "Різниця",
      share: "Зміна"
    },
    wholeHistory: (e) => `Уся історія, з ${e.month}`,
    wholeHistoryEmpty: "Уся історія — ще жоден місяць не має значення",
    lastTwelve: "Останні 12 місяців проти 12 перед ними",
    meanOfMonthly: "середнє місячних значень",
    twelveBefore: (e) => `12 перед ними: ${e.value}`,
    notEnough: (e) => `Замало місяців для порівняння: за останні 12 значення мають ${e.recent}, за 12 перед ними — ${e.previous}; кожній стороні потрібно ${e.needed}.`,
    periodNotUsed: "«Стан» читає всю історію; період тут не застосовується.",
    inverterHint: (e) => `${e.atRated} год на номінальній, із ${e.measured} год виміряних`,
    reasons: {
      too_few_clean_hours: (e) => `${At("uk", e.n, {
        one: `Лише ${e.n} чиста година розряду`,
        few: `Лише ${e.n} чисті години розряду`,
        many: `Лише ${e.n} чистих годин розряду`,
        other: `Лише ${e.n} чистої години розряду`
      })} за місяць; потрібно ${e.minHours}, інакше одна дивна година зсуває значення.`,
      no_soc: "За цей місяць немає рівня заряду, тож не видно, чи батарея закінчила там, де почала.",
      counters_partial: "Лічильники заряду й розряду цього місяця покривають різні години, тож те, що надійшло, і те, що вийшло, взято не з того самого проміжку.",
      soc_partial: "Рівень заряду покриває лише частину годин, які покривають лічильники, тож перевірка, чи батарея закінчила там, де почала, охопила б інший проміжок.",
      drift: (e) => `Заряд закінчився більш ніж за ${e.points} в.п. від того, де почався, тож частина того, що вийшло, увійшла в іншому місяці, або навпаки.`,
      too_little_throughput: (e) => `За місяць у батарею надійшло менше ніж ${e.min} — замало, щоб читати з цього ККД.`,
      partial_month: "Статистика є лише за частину цього місяця, а частину не порівнюють із цілим місяцем.",
      curtailed: (e) => `${At("uk", e.n, {
        one: `Лише ${e.n} сонячна година`,
        few: `Лише ${e.n} сонячні години`,
        many: `Лише ${e.n} сонячних годин`,
        other: `Лише ${e.n} сонячної години`
      })}, коли система могла взяти все сонце; для найкращої години потрібно ${e.minHours}.`
    },
    bestHourCaption: {
      unconstrained: "Години, коли батарея була на ліміті заряду, не враховано: інвертор міг урізати СЕС до того, що споживав будинок, тож їхній пік може бути навантаженням, а не СЕС.",
      all: "Враховано всі години. Без рівня заряду, потужності батареї й потужності СЕС годину, коли система не могла взяти сонце, не відрізнити, тож низький місяць може бути будинком, а не СЕС.",
      exporting: "Враховано всі години. Ця система експортує, тож повна батарея не урізає СЕС — надлишок іде в мережу, — і пік кожної години належить СЕС."
    },
    energyCaption: {
      household: "Ця система без експорту, тож енергія — це те, що спожив будинок, а не те, що могла дати СЕС: її різниця з минулим роком міряє домогосподарство. Про СЕС каже найкраща година.",
      array: "Енергія несе погоду: похмурий місяць низький зі своїх причин. Найкраща година несе її значно менше."
    },
    nameplate: (e) => `Паспортна ємність ${e.value}`,
    nameplateNote: "Паспортна ємність — те, що надрукував виробник; лінія — те, що батарея віддала, прочитане через оцінку заряду від BMS. Це різні величини: дивіться на форму лінії з роками, а не на її відстань від паспортної.",
    howRead: "Як це читати",
    definitions: {
      capacity: (e) => `Корисна ємність береться з чистих годин розряду: годин, коли лічильник заряду змінився щонайбільше на ${e.charge}, лічильник розряду змінився, а рівень заряду упав щонайменше на ${e.drop} в.п. Розряд, поділений на падіння, — це енергія на в.п.; помножена на сто — ємність. Місяцю потрібно ${e.minHours} таких годин. Перекалібрування BMS усередині такої години може лише занизити значення місяця.`,
      efficiency: (e) => `ККД заряду-розряду — те, що вийшло з батареї, поділене на те, що в неї надійшло, з місячних сум лічильників. Місяць не має значення, якщо заряд закінчився більш ніж за ${e.points} в.п. від того, де почався, або якщо надійшло менше ніж ${e.min}.`,
      solar: (e) => `Сонячна генерація — енергія з лічильника СЕС за місяць. Найкраща година — найвищий погодинний пік потужності СЕС за місяць, близький до значення ясного неба. Години, коли система не могла взяти сонце, не враховано, і місяцю потрібно ${e.minHours} інших годин сонця від ${e.minPower}.`,
      inverter: (e) => `Навантаження інвертора — це години, коли пік досягав поточної номінальної потужності, і ті, коли він досягав ${e.share} від неї; за нею ж рахуються й минулі роки. Це про те, як живе будинок, а не про стан обладнання: без сенсора температури чи помилок дані більше нічого не скажуть про сам інвертор.`
    },
    caveats: {
      bms: "Рівень заряду — оцінка системи керування батареєю (BMS), а не вимірювання. Він дрейфує й перекалібровується, тож місяць може зсунутися з причин, що не стосуються батареї.",
      weather: "Енергія місяця йде за його погодою: похмурий рік виглядає як слабша СЕС. Найкраща година несе погоди значно менше."
    }
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
      driftBelow: (e) => `Наприкінці рівень заряду був на ${e.n} ` + At("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " нижчим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
      driftAbove: (e) => `Наприкінці рівень заряду був на ${e.n} ` + At("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " вищим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
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
      derivedRating: (e) => `Номінальну потужність на фазу не налаштовано, тому загальну поділено на ${e.n} ${At("uk", e.n, { one: "фазу", few: "фази", many: "фаз", other: "фази" })} — по ${e.rating} на кожну. Якщо обладнання інше, вкажіть справжнє значення в параметрах інтеграції.`,
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
}, Bb = ["en", "uk"], uy = "inverter-analytics.lang", zb = { en: kb, uk: Nb };
function hy(e) {
  return e === "en" || e === "uk";
}
function $c(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function Fb(e, t) {
  return hy(e) ? e : $c(t) ? "uk" : "en";
}
function Hb(e, t) {
  return e === "uk" ? "uk" : !t || $c(t) ? "en" : t;
}
function cy(e) {
  return zb[e];
}
function uo(e) {
  return cy($c(e) ? "uk" : "en");
}
let ma, Is;
const vh = /* @__PURE__ */ new Set();
function Vb() {
  if (ma === void 0)
    try {
      const e = globalThis.localStorage?.getItem(uy) ?? null;
      ma = hy(e) ? e : null;
    } catch {
      ma = null;
    }
  return ma;
}
function fy() {
  for (const e of vh) e();
}
function dh() {
  return Fb(Vb(), Is);
}
function ph() {
  return Hb(dh(), Is);
}
function Gb(e) {
  ma = e;
  try {
    globalThis.localStorage?.setItem(uy, e);
  } catch {
  }
  fy();
}
function Wb(e) {
  if (e === Is) return;
  const t = ph();
  Is = e, ph() !== t && fy();
}
function Ub(e) {
  return vh.add(e), () => vh.delete(e);
}
const it = "—";
function ft(e, t) {
  if (e === null || Number.isNaN(e)) return it;
  const r = uo(t);
  return Math.abs(e) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    e / 1e3
  )} ${r.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${r.units.w}`;
}
function Y(e, t) {
  return e === null || Number.isNaN(e) ? it : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e * 100)}%`;
}
function hr(e, t) {
  return e === null || Number.isNaN(e) ? it : e <= 0 ? "0%" : e < 1e-3 ? "<0.1%" : Y(e, t);
}
const Yb = 10 * 60;
function Pt(e, t) {
  if (e === null || Number.isNaN(e)) return it;
  const { units: r } = uo(t);
  return `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e)} ${r.kwh}`;
}
function Xb(e, t) {
  const r = e.toFixed(1), n = new Intl.NumberFormat(t).formatToParts(1.5).find((i) => i.type === "decimal")?.value ?? ".";
  return n === "." ? r : r.replace(".", n);
}
function Kt(e, t) {
  const { units: r } = uo(t);
  if (e < 60) return `${Math.round(e)} ${r.s}`;
  const n = Math.round(e);
  if (n < Yb) {
    const a = n % 60, o = (n - a) / 60;
    return a === 0 ? `${o} ${r.min}` : `${o} ${r.min} ${a} ${r.s}`;
  }
  const i = Math.round(n / 60);
  return i < 60 ? `${i} ${r.min}` : `${Math.floor(i / 60)} ${r.h} ${i % 60} ${r.min}`;
}
function Yr(e, t) {
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
function ol(e, t, r) {
  const { format: n } = uo(r);
  return e === "raw" ? n.exactData : e === "lts" ? n.hourlyAverages : t ? n.mixedSince({ date: new Date(t).toLocaleDateString(r) }) : n.mixed;
}
function Va(e, t) {
  if (e >= 0.95) return null;
  const { format: r } = uo(t);
  return e <= 0 ? r.noData : e < 0.01 ? r.coversUnderOnePercent : r.coversOnly({ share: Y(e, t) });
}
function qb(e) {
  let t;
  return () => (t ??= e().finally(() => {
    t = void 0;
  }), t);
}
const vy = ["24h", "7d", "30d", "month", "year"];
function Zb(e, t) {
  return e.ranges[t];
}
const Kb = ["health"];
function jb(e, t) {
  return Kb.includes(t) ? { unused: !0, label: e.health.periodNotUsed, note: e.health.periodNotUsed } : { unused: !1, label: e.panel.period, note: null };
}
const _o = 24 * 3600 * 1e3, Qf = 60 * 1e3;
function Bi(e, t) {
  const r = new Date(Math.floor(t.getTime() / Qf) * Qf);
  switch (e) {
    case "24h":
      return { start: new Date(r.getTime() - _o), end: r };
    case "7d":
      return { start: new Date(r.getTime() - 7 * _o), end: r };
    case "30d":
      return { start: new Date(r.getTime() - 30 * _o), end: r };
    case "month":
      return { start: new Date(r.getFullYear(), r.getMonth(), 1, 0, 0, 0, 0), end: r };
    case "year":
      return { start: new Date(r.getTime() - 365 * _o), end: r };
  }
}
function Qb(e, t, r, n) {
  const a = e.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && r.includes(a) ? a : n.tab,
    range: s && vy.includes(s) ? s : n.range,
    entryId: l || n.entryId
  };
}
function Jb(e, t) {
  const r = new URLSearchParams({ range: t.range });
  return t.entryId && r.set("entry", t.entryId), `${e}/${t.tab}?${r.toString()}`;
}
class Ne {
  constructor(t) {
    this.host = t, t.addController(this);
  }
  hostConnected() {
    this.unsubscribe = Ub(() => this.host.requestUpdate());
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
  get lang() {
    return dh();
  }
  get m() {
    return cy(dh());
  }
  get locale() {
    return ph();
  }
}
function t1(e, t) {
  return e.roles[t] ?? t;
}
function Pn(e, t, r = !1) {
  const n = t.map((i) => {
    const a = t1(e, i);
    return r ? e.common.quoted({ text: a }) : a;
  });
  return n.length <= 1 ? n.join("") : `${n.slice(0, -1).join(", ")} ${e.common.and} ${n[n.length - 1]}`;
}
const e1 = /^(load|grid|pv)_p(\d+)$/;
function Ls(e, t) {
  const r = e1.exec(t.key);
  if (!r) return t.label;
  const n = Number(r[2]);
  return r[1] === "pv" ? e.sections.strings.positional({ n }) : e.sections.phases.positional({ n });
}
const r1 = "/config/integrations/integration/inverter_analytics", at = {
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
}, Zi = {
  newest: at.load,
  older: ["#7d8590", "#a0a6ae", "#bcc1c8", "#d0d4d9", "#e0e3e7"],
  // A fixed reference beside the years, dashed: the battery's nameplate, in
  // the battery's colour rather than an alarm colour, since it is no target.
  reference: at.battery
};
function Xt() {
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
const bt = (e, t) => Number(e.toFixed(t)), dy = (e, t, r) => new Intl.NumberFormat(r.charts.locale, {
  maximumFractionDigits: t,
  useGrouping: !1
}).format(bt(e, t));
function n1(e, t, r) {
  const { base: n, axis: i } = Xt(), a = e.histogram.buckets, o = a.map(
    (s) => t === "watts" ? String(bt(s.start, 0)) : dy(s.start / e.rated_power * 100, 1, r)
  );
  return {
    ...n,
    xAxis: {
      ...i,
      type: "category",
      data: o,
      name: t === "watts" ? r.units.w : `% ${r.units.ofRated}`,
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: r.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: a.map((s) => bt(s.fraction * 100, 2)),
        itemStyle: { color: at.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function i1(e, t) {
  const { base: r, axis: n } = Xt();
  return {
    ...r,
    xAxis: { ...n, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...n, type: "value", name: t.units.w },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: at.load },
        itemStyle: { color: at.load },
        data: e.duration_curve.map((i) => [
          bt(i.fraction * 100, 2),
          bt(i.value, 1)
        ])
      }
    ]
  };
}
function a1(e, t) {
  const { base: r, axis: n } = Xt(), i = [...e.bands].reverse();
  return {
    ...r,
    xAxis: { ...n, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...n, type: "category", data: i.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: i.map((a) => bt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => i[a.dataIndex].key === "100+" ? at.overload : at.load
        }
      }
    ]
  };
}
function o1(e, t) {
  const { base: r, axis: n } = Xt(), i = e.histogram;
  return {
    ...r,
    xAxis: {
      ...n,
      type: "category",
      data: i.map((a) => String(bt(a.start * 100, 0))),
      name: t.charts.percentImbalance,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: i.map((a) => bt(a.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (a) => i[a.dataIndex].start >= e.threshold ? at.overload : at.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function s1(e, t, r) {
  const { base: n, axis: i } = Xt();
  return {
    ...n,
    // Two bar colours with nothing naming them is a guess. The shared grid
    // starts 24px from the top, which is exactly where the legend draws, so
    // the plot has to be pushed down to make room for it.
    legend: { data: [r.charts.mean, r.charts.peak], top: 0, textStyle: n.textStyle },
    grid: { ...n.grid, top: 48 },
    xAxis: { ...i, type: "category", data: e.map((a) => Ls(r, a)) },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: [
      {
        name: r.charts.mean,
        type: "bar",
        data: e.map((a) => a.mean === null ? null : bt(a.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: r.charts.peak,
        type: "bar",
        data: e.map((a) => a.peak === null ? null : bt(a.peak, 1)),
        itemStyle: { color: at.muted }
      }
    ]
  };
}
function l1(e, t) {
  const { base: r, axis: n } = Xt(), i = e.histogram.buckets;
  return {
    ...r,
    xAxis: {
      ...n,
      type: "category",
      data: i.map((a) => String(bt(a.start, 0))),
      name: t.charts.percentCharge,
      nameLocation: "end"
    },
    yAxis: { ...n, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: i.map((a) => bt(a.fraction * 100, 2)),
        // Everything under the configured low mark is the part worth looking
        // at, coloured as a warning rather than left for the reader to compare
        // against a number written elsewhere on the page.
        itemStyle: {
          color: (a) => i[a.dataIndex].end <= e.low_pct ? at.overload : at.battery
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function u1(e, t) {
  const { base: r, axis: n } = Xt(), i = [...e].reverse();
  return {
    ...r,
    xAxis: { ...n, type: "value", name: t.charts.percentOfTime, min: 0, max: 100 },
    yAxis: { ...n, type: "category", data: i.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: i.map((a) => bt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => i[a.dataIndex].key === "0-20" ? at.overload : at.battery
        }
      }
    ]
  };
}
function py(e, t) {
  return new Date(Date.UTC(2e3, e - 1, 1)).toLocaleDateString(t, { month: "short" });
}
function Ga(e, t, r) {
  const [n, i] = e.split("-").map(Number), a = py(i, r);
  return t && t.slice(0, 4) === String(n) ? a : `${a} ${n}`;
}
function h1(e, t, r) {
  const { base: n, axis: i } = Xt(), a = e.map(
    (s, l) => Ga(s.key, e[l - 1]?.key, r.charts.locale)
  ), o = [
    {
      name: r.charts.load,
      type: "bar",
      data: e.map((s) => s.load_mean === null ? null : bt(s.load_mean, 1)),
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
    data: e.map((s) => s.pv_mean === null ? null : bt(s.pv_mean, 1)),
    itemStyle: { color: at.pv }
  }), {
    ...n,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: n.textStyle } : void 0,
    grid: { ...n.grid, top: t ? 48 : 24 },
    xAxis: { ...i, type: "category", data: a },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: o
  };
}
function c1(e, t, r) {
  const { base: n, axis: i } = Xt(), a = [
    {
      name: r.charts.load,
      type: "line",
      showSymbol: !1,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: at.load },
      itemStyle: { color: at.load },
      data: e.map((o) => o.load_mean === null ? null : bt(o.load_mean, 1))
    }
  ];
  return t && a.push({
    name: r.charts.pv,
    type: "line",
    showSymbol: !1,
    lineStyle: { color: at.pv },
    itemStyle: { color: at.pv },
    data: e.map((o) => o.pv_mean === null ? null : bt(o.pv_mean, 1))
  }), {
    ...n,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: n.textStyle } : void 0,
    grid: { ...n.grid, top: t ? 48 : 24 },
    xAxis: {
      ...i,
      type: "category",
      data: e.map((o) => String(o.hour)),
      name: r.charts.hour,
      nameLocation: "end"
    },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: a
  };
}
function f1(e, t, r) {
  const { base: n, axis: i } = Xt(), a = t.map((h) => h.key), o = a.map((h, c) => Ga(h, a[c - 1], r.charts.locale)), s = new Map(a.map((h, c) => [h, c])), l = e.filter((h) => h.load_mean !== null && s.has(h.month)).map((h) => [s.get(h.month), h.hour, bt(h.load_mean, 1)]), u = l.map((h) => h[2]);
  return {
    ...n,
    tooltip: { trigger: "item" },
    grid: { ...n.grid, top: 48, bottom: 60 },
    xAxis: { ...i, type: "category", data: o, splitArea: { show: !0 } },
    yAxis: {
      ...i,
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
      textStyle: n.textStyle,
      inRange: { color: [at.battery, at.pv, at.overload] }
    },
    series: [{ type: "heatmap", data: l }]
  };
}
function Ai(e, t) {
  return e.charts.flows[t] ?? t;
}
const gy = {
  pv_energy_total: at.pv,
  grid_import_total: at.grid,
  battery_discharge_total: at.battery,
  load_energy_total: at.load,
  grid_export_total: at.gridExport,
  battery_charge_total: at.batteryCharge
};
function v1(e, t, r, n) {
  const { base: i, axis: a } = Xt(), o = [...t, ...r].filter((s) => s in e);
  return {
    ...i,
    legend: { data: o.map((s) => Ai(n, s)), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 56 },
    xAxis: { ...a, type: "value", name: n.units.kwh },
    yAxis: { ...a, type: "category", data: [n.charts.out, n.charts.in] },
    series: o.map((s) => ({
      name: Ai(n, s),
      type: "bar",
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: gy[s] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: t.includes(s) ? [null, bt(e[s], 3)] : [bt(e[s], 3), null]
    }))
  };
}
function d1(e, t, r, n) {
  const { base: i, axis: a } = Xt(), o = [...t, ...r].filter(
    (s) => e.some((l) => s in l.flows)
  );
  return {
    ...i,
    legend: { data: o.map((s) => Ai(n, s)), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 56 },
    xAxis: { ...a, type: "category", data: e.map((s) => s.day.slice(5)) },
    yAxis: { ...a, type: "value", name: n.units.kwh },
    series: o.map((s) => ({
      name: Ai(n, s),
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: gy[s] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: e.map((l) => s in l.flows ? bt(l.flows[s], 3) : null)
    }))
  };
}
function p1(e, t) {
  const { base: r, axis: n } = Xt();
  return {
    ...r,
    tooltip: {
      ...r.tooltip,
      // How many outages began on a day is the other thing the by-day view has
      // to answer, and a second axis for a count of two or three would cost
      // more than it says. The tooltip is where it fits.
      formatter: (i) => {
        const a = i[0], o = e[a.dataIndex].count, s = t.charts.hoursWithoutGrid({ hours: dy(a.value, 2, t) });
        return `${a.name}<br/>${s}<br/>${t.charts.outagesBegan({ n: o })}`;
      }
    },
    xAxis: { ...n, type: "category", data: e.map((i) => i.day.slice(5)) },
    yAxis: { ...n, type: "value", name: t.charts.hours },
    series: [
      {
        type: "bar",
        // Days the sensor had no data for are not in the list at all, so
        // every bar here stands on measured time.
        data: e.map((i) => bt(i.off_seconds / 3600, 2)),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function g1(e, t) {
  const { base: r, axis: n } = Xt();
  return {
    ...r,
    xAxis: { ...n, type: "category", data: e.map((i) => `${i.hour}`) },
    yAxis: { ...n, type: "value", name: t.charts.percentOfMeasuredTime, min: 0, max: 100 },
    series: [
      {
        type: "bar",
        // A share rather than raw hours: under uneven coverage raw hours
        // compare an hour the recorder saw ten times with one it saw twice.
        // An hour with no measured time stays a hole, not a zero.
        data: e.map(
          (i) => i.measured_seconds > 0 ? bt(i.off_seconds / i.measured_seconds * 100, 2) : null
        ),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function y1(e, t, r, n = null) {
  const { base: i, axis: a } = Xt(), o = e.map((l) => String(l.year)), s = e.map((l, u) => {
    const h = e.length - 1 - u, c = h === 0 ? Zi.newest : Zi.older[Math.min(h - 1, Zi.older.length - 1)];
    return {
      name: String(l.year),
      type: "line",
      connectNulls: !1,
      showSymbol: !0,
      symbolSize: h === 0 ? 6 : 4,
      // Drawn over the older years rather than under them.
      z: h === 0 ? 3 : 2,
      lineStyle: { color: c, width: h === 0 ? 2.5 : 1.5 },
      itemStyle: { color: c },
      data: l.values.map((f) => f === null ? null : bt(f, 2))
    };
  });
  return n !== null && (o.push(n.name), s.push({
    name: n.name,
    type: "line",
    connectNulls: !1,
    showSymbol: !1,
    symbolSize: 0,
    z: 1,
    lineStyle: { color: Zi.reference, width: 1.5, type: "dashed" },
    itemStyle: { color: Zi.reference },
    data: Array.from({ length: 12 }, () => bt(n.value, 2))
  })), {
    ...i,
    legend: { data: o, top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: 48 },
    xAxis: {
      ...a,
      type: "category",
      data: Array.from({ length: 12 }, (l, u) => py(u + 1, r.charts.locale))
    },
    // The shape over the years is the point, not the distance from zero.
    yAxis: { ...a, type: "value", name: t, scale: !0 },
    series: s
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
var gh = function(e, t) {
  return gh = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, gh(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  gh(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var m1 = /* @__PURE__ */ function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
}(), _1 = /* @__PURE__ */ function() {
  function e() {
    this.browser = new m1(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
}(), X = new _1();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (X.wxa = !0, X.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? X.worker = !0 : !X.hasGlobalWindow || "Deno" in window ? (X.node = !0, X.svgSupported = !0) : b1(navigator.userAgent, X);
function b1(e, t) {
  var r = t.browser, n = e.match(/Firefox\/([\d.]+)/), i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  n && (r.firefox = !0, r.version = n[1]), i && (r.ie = !0, r.version = i[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
}
var Pc = 12, w1 = "sans-serif", Rn = Pc + "px " + w1, S1 = 20, x1 = 100, T1 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function C1(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var n = String.fromCharCode(r + 32), i = (e.charCodeAt(r) - S1) / x1;
    t[n] = i;
  }
  return t;
}
var M1 = C1(T1), Gr = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var e, t;
    return function(r, n) {
      if (!e) {
        var i = Gr.createCanvas();
        e = i && i.getContext("2d");
      }
      if (e)
        return t !== n && (t = e.font = n || Rn), e.measureText(r);
      r = r || "", n = n || Rn;
      var a = /((?:\d+)?\.?\d*)px/.exec(n), o = a && +a[1] || Pc, s = 0;
      if (n.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = M1[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(e, t, r) {
    var n = new Image();
    return n.onload = t, n.onerror = r, n.src = e, n;
  }
}, yy = zi([
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
}, {}), my = zi([
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
}, {}), ho = Object.prototype.toString, sl = Array.prototype, D1 = sl.forEach, A1 = sl.filter, Rc = sl.slice, I1 = sl.map, Jf = function() {
}.constructor, bo = Jf ? Jf.prototype : null, Oc = "__proto__", L1 = 2311;
function _y() {
  return L1++;
}
function Ec() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function q(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = ho.call(e);
  if (r === "[object Array]") {
    if (!Da(e)) {
      t = [];
      for (var n = 0, i = e.length; n < i; n++)
        t[n] = q(e[n]);
    }
  } else if (my[r]) {
    if (!Da(e)) {
      var a = e.constructor;
      if (a.from)
        t = a.from(e);
      else {
        t = new a(e.length);
        for (var n = 0, i = e.length; n < i; n++)
          t[n] = e[n];
      }
    }
  } else if (!yy[r] && !Da(e) && !Wa(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== Oc && (t[o] = q(e[o]));
  }
  return t;
}
function ot(e, t, r) {
  if (!V(t) || !V(e))
    return r ? q(t) : e;
  for (var n in t)
    if (t.hasOwnProperty(n) && n !== Oc) {
      var i = e[n], a = t[n];
      V(a) && V(i) && !z(a) && !z(i) && !Wa(a) && !Wa(i) && !tv(a) && !tv(i) && !Da(a) && !Da(i) ? ot(i, a, r) : (r || !(n in e)) && (e[n] = q(t[n]));
    }
  return e;
}
function N(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== Oc && (e[r] = t[r]);
  return e;
}
function ht(e, t, r) {
  for (var n = mt(t), i = 0, a = n.length; i < a; i++) {
    var o = n[i];
    e[o] == null && (e[o] = t[o]);
  }
  return e;
}
function pt(e, t) {
  if (e) {
    if (e.indexOf)
      return e.indexOf(t);
    for (var r = 0, n = e.length; r < n; r++)
      if (e[r] === t)
        return r;
  }
  return -1;
}
function $1(e, t) {
  var r = e.prototype;
  function n() {
  }
  n.prototype = t.prototype, e.prototype = new n();
  for (var i in r)
    r.hasOwnProperty(i) && (e.prototype[i] = r[i]);
  e.prototype.constructor = e, e.superClass = t;
}
function Je(e, t, r) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var n = Object.getOwnPropertyNames(t), i = 0; i < n.length; i++) {
      var a = n[i];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else
    ht(e, t);
}
function ee(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function C(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === D1)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var n = 0, i = e.length; n < i; n++)
        t.call(r, e[n], n, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function U(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return kc(e);
  if (e.map && e.map === I1)
    return e.map(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    n.push(t.call(r, e[i], i, e));
  return n;
}
function zi(e, t, r, n) {
  if (e && t) {
    for (var i = 0, a = e.length; i < a; i++)
      r = t.call(n, r, e[i], i, e);
    return r;
  }
}
function Ot(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return kc(e);
  if (e.filter && e.filter === A1)
    return e.filter(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    t.call(r, e[i], i, e) && n.push(e[i]);
  return n;
}
function mt(e) {
  if (!e)
    return [];
  if (Object.keys)
    return Object.keys(e);
  var t = [];
  for (var r in e)
    e.hasOwnProperty(r) && t.push(r);
  return t;
}
function P1(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return function() {
    return e.apply(t, r.concat(Rc.call(arguments)));
  };
}
var J = bo && Z(bo.bind) ? bo.call.bind(bo.bind) : P1;
function It(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(Rc.call(arguments)));
  };
}
function z(e) {
  return Array.isArray ? Array.isArray(e) : ho.call(e) === "[object Array]";
}
function Z(e) {
  return typeof e == "function";
}
function H(e) {
  return typeof e == "string";
}
function yh(e) {
  return ho.call(e) === "[object String]";
}
function _t(e) {
  return typeof e == "number";
}
function V(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function tv(e) {
  return !!yy[ho.call(e)];
}
function re(e) {
  return !!my[ho.call(e)];
}
function Wa(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function ll(e) {
  return e.colorStops != null;
}
function R1(e) {
  return e.image != null;
}
function $s(e) {
  return e !== e;
}
function Ii() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] != null)
      return e[r];
}
function tt(e, t) {
  return e ?? t;
}
function us(e, t, r) {
  return e ?? t ?? r;
}
function kc(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return Rc.apply(e, t);
}
function by(e) {
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
var wy = "__ec_primitive__";
function mh(e) {
  e[wy] = !0;
}
function Da(e) {
  return e[wy];
}
var O1 = function() {
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
    return mt(this.data);
  }, e.prototype.forEach = function(t) {
    var r = this.data;
    for (var n in r)
      r.hasOwnProperty(n) && t(r[n], n);
  }, e;
}(), Sy = typeof Map == "function";
function E1() {
  return Sy ? /* @__PURE__ */ new Map() : new O1();
}
var k1 = function() {
  function e(t) {
    var r = z(t);
    this.data = E1();
    var n = this;
    t instanceof e ? t.each(i) : t && C(t, i);
    function i(a, o) {
      r ? n.set(a, o) : n.set(o, a);
    }
  }
  return e.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, e.prototype.get = function(t) {
    return this.data.get(t);
  }, e.prototype.set = function(t, r) {
    return this.data.set(t, r), r;
  }, e.prototype.each = function(t, r) {
    this.data.forEach(function(n, i) {
      t.call(r, n, i);
    });
  }, e.prototype.keys = function() {
    var t = this.data.keys();
    return Sy ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
}();
function Q(e) {
  return new k1(e);
}
function N1(e, t) {
  for (var r = new e.constructor(e.length + t.length), n = 0; n < e.length; n++)
    r[n] = e[n];
  for (var i = e.length, n = 0; n < t.length; n++)
    r[n + i] = t[n];
  return r;
}
function ul(e, t) {
  var r;
  if (Object.create)
    r = Object.create(e);
  else {
    var n = function() {
    };
    n.prototype = e, r = new n();
  }
  return t && N(r, t), r;
}
function xy(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function On(e, t) {
  return e.hasOwnProperty(t);
}
function Yt() {
}
var B1 = 180 / Math.PI;
function Fi(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function z1(e) {
  return [e[0], e[1]];
}
function ev(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function F1(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function H1(e) {
  return Math.sqrt(V1(e));
}
function V1(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function Wl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function G1(e, t) {
  var r = H1(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function _h(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var W1 = _h;
function U1(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var yi = U1;
function be(e, t, r) {
  var n = t[0], i = t[1];
  return e[0] = r[0] * n + r[2] * i + r[4], e[1] = r[1] * n + r[3] * i + r[5], e;
}
function fi(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function vi(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var Un = /* @__PURE__ */ function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
}(), Y1 = function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Un(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var n = t.offsetX, i = t.offsetY, a = n - this._x, o = i - this._y;
      this._x = n, this._y = i, r.drift(a, o, t), this.handler.dispatchToElement(new Un(r, t), "drag", t.event);
      var s = this.handler.findHover(n, i, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new Un(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Un(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new Un(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Un(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
}(), tr = function() {
  function e(t) {
    t && (this._$eventProcessor = t);
  }
  return e.prototype.on = function(t, r, n, i) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof r == "function" && (i = n, n = r, r = null), !n || !t)
      return this;
    var o = this._$eventProcessor;
    r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === n)
        return this;
    var l = {
      h: n,
      query: r,
      ctx: i || this,
      callAtLast: n.zrEventfulCallAtLast
    }, u = a[t].length - 1, h = a[t][u];
    return h && h.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, e.prototype.isSilent = function(t) {
    var r = this._$handlers;
    return !r || !r[t] || !r[t].length;
  }, e.prototype.off = function(t, r) {
    var n = this._$handlers;
    if (!n)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (r) {
      if (n[t]) {
        for (var i = [], a = 0, o = n[t].length; a < o; a++)
          n[t][a].h !== r && i.push(n[t][a]);
        n[t] = i;
      }
      n[t] && n[t].length === 0 && delete n[t];
    } else
      delete n[t];
    return this;
  }, e.prototype.trigger = function(t) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (!this._$handlers)
      return this;
    var i = this._$handlers[t], a = this._$eventProcessor;
    if (i)
      for (var o = r.length, s = i.length, l = 0; l < s; l++) {
        var u = i[l];
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
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (!this._$handlers)
      return this;
    var i = this._$handlers[t], a = this._$eventProcessor;
    if (i)
      for (var o = r.length, s = r[o - 1], l = i.length, u = 0; u < l; u++) {
        var h = i[u];
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
}(), X1 = Math.log(2);
function bh(e, t, r, n, i, a) {
  var o = n + "-" + i, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~i) / X1);
    return e[r][l];
  }
  for (var u = n | 1 << r, h = r + 1; n & 1 << h; )
    h++;
  for (var c = 0, f = 0, v = 0; f < s; f++) {
    var d = 1 << f;
    d & i || (c += (v % 2 ? -1 : 1) * e[r][f] * bh(e, t - 1, h, u, i | d, a), v++);
  }
  return a[o] = c, c;
}
function rv(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], n = {}, i = bh(r, 8, 0, 0, 0, n);
  if (i !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * bh(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, n) / i * t[o];
    return function(l, u, h) {
      var c = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / c, l[1] = (u * a[3] + h * a[4] + a[5]) / c;
    };
  }
}
var nv = "___zrEVENTSAVED", Ul = [];
function q1(e, t, r, n, i) {
  return wh(Ul, t, n, i, !0) && wh(e, r, Ul[0], Ul[1]);
}
function wh(e, t, r, n, i) {
  if (t.getBoundingClientRect && X.domSupported && !Ty(t)) {
    var a = t[nv] || (t[nv] = {}), o = Z1(t, a), s = K1(o, a, i);
    if (s)
      return s(e, r, n), !0;
  }
  return !1;
}
function Z1(e, t) {
  var r = t.markers;
  if (r)
    return r;
  r = t.markers = [];
  for (var n = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
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
      n[l] + ":0",
      i[u] + ":0",
      n[1 - l] + ":auto",
      i[1 - u] + ":auto",
      ""
    ].join("!important;"), e.appendChild(o), r.push(o);
  }
  return r;
}
function K1(e, t, r) {
  for (var n = r ? "invTrans" : "trans", i = t[n], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = e[u].getBoundingClientRect(), c = 2 * u, f = h.left, v = h.top;
    o.push(f, v), l = l && a && f === a[c] && v === a[c + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && i ? i : (t.srcCoords = o, t[n] = r ? rv(s, o) : rv(o, s));
}
function Ty(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var j1 = /([&<>"'])/g, Q1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function jt(e) {
  return e == null ? "" : (e + "").replace(j1, function(t, r) {
    return Q1[r];
  });
}
var J1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Yl = [], tw = X.browser.firefox && +X.browser.version.split(".")[0] < 39;
function Sh(e, t, r, n) {
  return r = r || {}, n ? iv(e, t, r) : tw && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : iv(e, t, r), r;
}
function iv(e, t, r) {
  if (X.domSupported && e.getBoundingClientRect) {
    var n = t.clientX, i = t.clientY;
    if (Ty(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = n - a.left, r.zrY = i - a.top;
      return;
    } else if (wh(Yl, e, n, i)) {
      r.zrX = Yl[0], r.zrY = Yl[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function Nc(e) {
  return e || window.event;
}
function ve(e, t, r) {
  if (t = Nc(t), t.zrX != null)
    return t;
  var n = t.type, i = n && n.indexOf("touch") >= 0;
  if (i) {
    var o = n !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Sh(e, o, t, r);
  } else {
    Sh(e, t, t, r);
    var a = ew(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && J1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function ew(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, n = e.deltaY;
  if (r == null || n == null)
    return t;
  var i = Math.abs(n !== 0 ? n : r), a = n > 0 ? -1 : n < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * i * a;
}
function rw(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function nw(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
var Ua = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, iw = function() {
  function e() {
    this._track = [];
  }
  return e.prototype.recognize = function(t, r, n) {
    return this._doTrack(t, r, n), this._recognize(t);
  }, e.prototype.clear = function() {
    return this._track.length = 0, this;
  }, e.prototype._doTrack = function(t, r, n) {
    var i = t.touches;
    if (i) {
      for (var a = {
        points: [],
        touches: [],
        target: r,
        event: t
      }, o = 0, s = i.length; o < s; o++) {
        var l = i[o], u = Sh(n, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Xl)
      if (Xl.hasOwnProperty(r)) {
        var n = Xl[r](this._track, t);
        if (n)
          return n;
      }
  }, e;
}();
function av(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function aw(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Xl = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var n = (e[r - 1] || {}).points, i = (e[r - 2] || {}).points || n;
      if (i && i.length > 1 && n && n.length > 1) {
        var a = av(n) / av(i);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = aw(n);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function mi() {
  return [1, 0, 0, 1, 0, 0];
}
function Bc(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function ow(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function _i(e, t, r) {
  var n = t[0] * r[0] + t[2] * r[1], i = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = n, e[1] = i, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function xh(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function zc(e, t, r, n) {
  n === void 0 && (n = [0, 0]);
  var i = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(r), c = Math.cos(r);
  return e[0] = i * c + s * h, e[1] = -i * h + s * c, e[2] = a * c + l * h, e[3] = -a * h + c * l, e[4] = c * (o - n[0]) + h * (u - n[1]) + n[0], e[5] = c * (u - n[1]) - h * (o - n[0]) + n[1], e;
}
function sw(e, t, r) {
  var n = r[0], i = r[1];
  return e[0] = t[0] * n, e[1] = t[1] * i, e[2] = t[2] * n, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * i, e;
}
function Fc(e, t) {
  var r = t[0], n = t[2], i = t[4], a = t[1], o = t[3], s = t[5], l = r * o - a * n;
  return l ? (l = 1 / l, e[0] = o * l, e[1] = -a * l, e[2] = -n * l, e[3] = r * l, e[4] = (n * s - o * i) * l, e[5] = (a * i - r * s) * l, e) : null;
}
var gt = function() {
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
    var r = this.x - t.x, n = this.y - t.y;
    return Math.sqrt(r * r + n * n);
  }, e.prototype.distanceSquare = function(t) {
    var r = this.x - t.x, n = this.y - t.y;
    return r * r + n * n;
  }, e.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, e.prototype.transform = function(t) {
    if (t) {
      var r = this.x, n = this.y;
      return this.x = t[0] * r + t[2] * n + t[4], this.y = t[1] * r + t[3] * n + t[5], this;
    }
  }, e.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, e.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, e.set = function(t, r, n) {
    t.x = r, t.y = n;
  }, e.copy = function(t, r) {
    t.x = r.x, t.y = r.y;
  }, e.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, e.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, e.dot = function(t, r) {
    return t.x * r.x + t.y * r.y;
  }, e.add = function(t, r, n) {
    t.x = r.x + n.x, t.y = r.y + n.y;
  }, e.sub = function(t, r, n) {
    t.x = r.x - n.x, t.y = r.y - n.y;
  }, e.scale = function(t, r, n) {
    t.x = r.x * n, t.y = r.y * n;
  }, e.scaleAndAdd = function(t, r, n, i) {
    t.x = r.x + n.x * i, t.y = r.y + n.y * i;
  }, e.lerp = function(t, r, n, i) {
    var a = 1 - i;
    t.x = a * r.x + i * n.x, t.y = a * r.y + i * n.y;
  }, e;
}(), wo = Math.min, So = Math.max, jr = new gt(), Qr = new gt(), Jr = new gt(), tn = new gt(), Ki = new gt(), ji = new gt(), ut = function() {
  function e(t, r, n, i) {
    n < 0 && (t = t + n, n = -n), i < 0 && (r = r + i, i = -i), this.x = t, this.y = r, this.width = n, this.height = i;
  }
  return e.prototype.union = function(t) {
    var r = wo(t.x, this.x), n = wo(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = So(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = So(t.y + t.height, this.y + this.height) - n : this.height = t.height, this.x = r, this.y = n;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    var r = this, n = t.width / r.width, i = t.height / r.height, a = mi();
    return xh(a, a, [-r.x, -r.y]), sw(a, a, [n, i]), xh(a, a, [t.x, t.y]), a;
  }, e.prototype.intersect = function(t, r) {
    if (!t)
      return !1;
    t instanceof e || (t = e.create(t));
    var n = this, i = n.x, a = n.x + n.width, o = n.y, s = n.y + n.height, l = t.x, u = t.x + t.width, h = t.y, c = t.y + t.height, f = !(a < l || u < i || s < h || c < o);
    if (r) {
      var v = 1 / 0, d = 0, g = Math.abs(a - l), p = Math.abs(u - i), y = Math.abs(s - h), m = Math.abs(c - o), _ = Math.min(g, p), b = Math.min(y, m);
      a < l || u < i ? _ > d && (d = _, g < p ? gt.set(ji, -g, 0) : gt.set(ji, p, 0)) : _ < v && (v = _, g < p ? gt.set(Ki, g, 0) : gt.set(Ki, -p, 0)), s < h || c < o ? b > d && (d = b, y < m ? gt.set(ji, 0, -y) : gt.set(ji, 0, m)) : _ < v && (v = _, y < m ? gt.set(Ki, 0, y) : gt.set(Ki, 0, -m));
    }
    return r && gt.copy(r, f ? Ki : ji), f;
  }, e.prototype.contain = function(t, r) {
    var n = this;
    return t >= n.x && t <= n.x + n.width && r >= n.y && r <= n.y + n.height;
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
  }, e.applyTransform = function(t, r, n) {
    if (!n) {
      t !== r && e.copy(t, r);
      return;
    }
    if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
      var i = n[0], a = n[3], o = n[4], s = n[5];
      t.x = r.x * i + o, t.y = r.y * a + s, t.width = r.width * i, t.height = r.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    jr.x = Jr.x = r.x, jr.y = tn.y = r.y, Qr.x = tn.x = r.x + r.width, Qr.y = Jr.y = r.y + r.height, jr.transform(n), tn.transform(n), Qr.transform(n), Jr.transform(n), t.x = wo(jr.x, Qr.x, Jr.x, tn.x), t.y = wo(jr.y, Qr.y, Jr.y, tn.y);
    var l = So(jr.x, Qr.x, Jr.x, tn.x), u = So(jr.y, Qr.y, Jr.y, tn.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e;
}(), Cy = "silent";
function lw(e, t, r) {
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
    stop: uw
  };
}
function uw() {
  Ua(this.event);
}
var hw = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(tr), Qi = /* @__PURE__ */ function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
}(), cw = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], ql = new ut(0, 0, 0, 0), My = function(e) {
  B(t, e);
  function t(r, n, i, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new Qi(0, 0), s.storage = r, s.painter = n, s.painterRoot = a, s._pointerSize = o, i = i || new hw(), s.proxy = null, s.setHandlerProxy(i), s._draggingMgr = new Y1(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (C(cw, function(n) {
      r.on && r.on(n, this[n], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var n = r.zrX, i = r.zrY, a = Dy(this, n, i), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new Qi(n, i) : this.findHover(n, i), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var n = r.zrEventControl;
    n !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), n !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new Qi(0, 0);
  }, t.prototype.dispatch = function(r, n) {
    var i = this[r];
    i && i.call(this, n);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(r) {
    var n = this.proxy;
    n.setCursor && n.setCursor(r);
  }, t.prototype.dispatchToElement = function(r, n, i) {
    r = r || {};
    var a = r.target;
    if (!(a && a.silent)) {
      for (var o = "on" + n, s = lw(n, r, i); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(n, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(n, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(n, s);
      }));
    }
  }, t.prototype.findHover = function(r, n, i) {
    var a = this.storage.getDisplayList(), o = new Qi(r, n);
    if (ov(a, o, r, n, i), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new ut(r - u, n - u, l, l), c = a.length - 1; c >= 0; c--) {
        var f = a[c];
        f !== i && !f.ignore && !f.ignoreCoarsePointer && (!f.parent || !f.parent.ignoreCoarsePointer) && (ql.copy(f.getBoundingRect()), f.transform && ql.applyTransform(f.transform), ql.intersect(h) && s.push(f));
      }
      if (s.length)
        for (var v = 4, d = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += v)
          for (var y = 0; y < g; y += d) {
            var m = r + p * Math.cos(y), _ = n + p * Math.sin(y);
            if (ov(s, o, m, _, i), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, n) {
    this._gestureMgr || (this._gestureMgr = new iw());
    var i = this._gestureMgr;
    n === "start" && i.clear();
    var a = i.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (n === "end" && i.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new Qi();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(tr);
C(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  My.prototype[e] = function(t) {
    var r = t.zrX, n = t.zrY, i = Dy(this, r, n), a, o;
    if ((e !== "mouseup" || !i) && (a = this.findHover(r, n), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || W1(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function fw(e, t, r) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, r)) {
    for (var n = e, i = void 0, a = !1; n; ) {
      if (n.ignoreClip && (a = !0), !a) {
        var o = n.getClipPath();
        if (o && !o.contain(t, r))
          return !1;
      }
      n.silent && (i = !0);
      var s = n.__hostTarget;
      n = s || n.parent;
    }
    return i ? Cy : !0;
  }
  return !1;
}
function ov(e, t, r, n, i) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== i && !o.ignore && (s = fw(o, r, n)) && (!t.topTarget && (t.topTarget = o), s !== Cy)) {
      t.target = o;
      break;
    }
  }
}
function Dy(e, t, r) {
  var n = e.painter;
  return t < 0 || t > n.getWidth() || r < 0 || r > n.getHeight();
}
var Ay = 32, Ji = 7;
function vw(e) {
  for (var t = 0; e >= Ay; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function sv(e, t, r, n) {
  var i = t + 1;
  if (i === r)
    return 1;
  if (n(e[i++], e[t]) < 0) {
    for (; i < r && n(e[i], e[i - 1]) < 0; )
      i++;
    dw(e, t, i);
  } else
    for (; i < r && n(e[i], e[i - 1]) >= 0; )
      i++;
  return i - t;
}
function dw(e, t, r) {
  for (r--; t < r; ) {
    var n = e[t];
    e[t++] = e[r], e[r--] = n;
  }
}
function lv(e, t, r, n, i) {
  for (n === t && n++; n < r; n++) {
    for (var a = e[n], o = t, s = n, l; o < s; )
      l = o + s >>> 1, i(a, e[l]) < 0 ? s = l : o = l + 1;
    var u = n - o;
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
function Zl(e, t, r, n, i, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + i]) > 0) {
    for (s = n - i; l < s && a(e, t[r + i + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i;
  } else {
    for (s = i + 1; l < s && a(e, t[r + i - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(e, t[r + h]) > 0 ? o = h + 1 : l = h;
  }
  return l;
}
function Kl(e, t, r, n, i, a) {
  var o = 0, s = 0, l = 1;
  if (a(e, t[r + i]) < 0) {
    for (s = i + 1; l < s && a(e, t[r + i - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = i - l, l = i - u;
  } else {
    for (s = n - i; l < s && a(e, t[r + i + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += i, l += i;
  }
  for (o++; o < l; ) {
    var h = o + (l - o >>> 1);
    a(e, t[r + h]) < 0 ? l = h : o = h + 1;
  }
  return l;
}
function pw(e, t) {
  var r = Ji, n, i, a = 0, o = [];
  n = [], i = [];
  function s(v, d) {
    n[a] = v, i[a] = d, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var v = a - 2;
      if (v >= 1 && i[v - 1] <= i[v] + i[v + 1] || v >= 2 && i[v - 2] <= i[v] + i[v - 1])
        i[v - 1] < i[v + 1] && v--;
      else if (i[v] > i[v + 1])
        break;
      h(v);
    }
  }
  function u() {
    for (; a > 1; ) {
      var v = a - 2;
      v > 0 && i[v - 1] < i[v + 1] && v--, h(v);
    }
  }
  function h(v) {
    var d = n[v], g = i[v], p = n[v + 1], y = i[v + 1];
    i[v] = g + y, v === a - 3 && (n[v + 1] = n[v + 2], i[v + 1] = i[v + 2]), a--;
    var m = Kl(e[p], e, d, g, 0, t);
    d += m, g -= m, g !== 0 && (y = Zl(e[d + g - 1], e, p, y, y - 1, t), y !== 0 && (g <= y ? c(d, g, p, y) : f(d, g, p, y)));
  }
  function c(v, d, g, p) {
    var y = 0;
    for (y = 0; y < d; y++)
      o[y] = e[v + y];
    var m = 0, _ = g, b = v;
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
        if (w = Kl(e[_], o, m, d, 0, t), w !== 0) {
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
        if (x = Zl(o[m], e, _, p, 0, t), x !== 0) {
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
      } while (w >= Ji || x >= Ji);
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
  function f(v, d, g, p) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = e[g + y];
    var m = v + d - 1, _ = p - 1, b = g + p - 1, S = 0, w = 0;
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
        if (M = d - Kl(o[_], e, v, d, d - 1, t), M !== 0) {
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
        if (D = p - Zl(e[m], o, 0, p, p - 1, t), D !== 0) {
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
      } while (M >= Ji || D >= Ji);
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
function hs(e, t, r, n) {
  r || (r = 0), n || (n = e.length);
  var i = n - r;
  if (!(i < 2)) {
    var a = 0;
    if (i < Ay) {
      a = sv(e, r, n, t), lv(e, r, n, r + a, t);
      return;
    }
    var o = pw(e, t), s = vw(i);
    do {
      if (a = sv(e, r, n, t), a < s) {
        var l = i;
        l > s && (l = s), lv(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), i -= a, r += a;
    } while (i !== 0);
    o.forceMergeRuns();
  }
}
var oe = 1, _a = 2, ui = 4, uv = !1;
function jl() {
  uv || (uv = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function hv(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var gw = function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = hv;
  }
  return e.prototype.traverse = function(t, r) {
    for (var n = 0; n < this._roots.length; n++)
      this._roots[n].traverse(t, r);
  }, e.prototype.getDisplayList = function(t, r) {
    r = r || !1;
    var n = this._displayList;
    return (t || !n.length) && this.updateDisplayList(r), n;
  }, e.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var r = this._roots, n = this._displayList, i = 0, a = r.length; i < a; i++)
      this._updateAndAddDisplayable(r[i], null, t);
    n.length = this._displayListLen, hs(n, hv);
  }, e.prototype._updateAndAddDisplayable = function(t, r, n) {
    if (!(t.ignore && !n)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var i = t.getClipPath();
      if (t.ignoreClip)
        r = null;
      else if (i) {
        r ? r = r.slice() : r = [];
        for (var a = i, o = t; a; )
          a.parent = o, a.updateTransform(), r.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= oe), this._updateAndAddDisplayable(u, r, n);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        r && r.length ? h.__clipPaths = r : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (jl(), h.z = 0), isNaN(h.z2) && (jl(), h.z2 = 0), isNaN(h.zlevel) && (jl(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
      }
      var c = t.getDecalElement && t.getDecalElement();
      c && this._updateAndAddDisplayable(c, r, n);
      var f = t.getTextGuideLine();
      f && this._updateAndAddDisplayable(f, r, n);
      var v = t.getTextContent();
      v && this._updateAndAddDisplayable(v, r, n);
    }
  }, e.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, e.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var r = 0, n = t.length; r < n; r++)
        this.delRoot(t[r]);
      return;
    }
    var i = pt(this._roots, t);
    i >= 0 && this._roots.splice(i, 1);
  }, e.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, e.prototype.getRoots = function() {
    return this._roots;
  }, e.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, e;
}(), Ps;
Ps = X.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var Aa = {
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
    var t, r = 0.1, n = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = n / 4) : t = n * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n)));
  },
  elasticOut: function(e) {
    var t, r = 0.1, n = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = n / 4) : t = n * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / n) + 1);
  },
  elasticInOut: function(e) {
    var t, r = 0.1, n = 0.4;
    return e === 0 ? 0 : e === 1 ? 1 : (!r || r < 1 ? (r = 1, t = n / 4) : t = n * Math.asin(1 / r) / (2 * Math.PI), (e *= 2) < 1 ? -0.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n)) : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / n) * 0.5 + 1);
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
    return 1 - Aa.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? Aa.bounceIn(e * 2) * 0.5 : Aa.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, xo = Math.pow, Fr = Math.sqrt, Rs = 1e-8, Iy = 1e-4, cv = Fr(3), To = 1 / 3, We = Fi(), ge = Fi(), bi = Fi();
function Nr(e) {
  return e > -Rs && e < Rs;
}
function Ly(e) {
  return e > Rs || e < -Rs;
}
function Et(e, t, r, n, i) {
  var a = 1 - i;
  return a * a * (a * e + 3 * i * t) + i * i * (i * n + 3 * a * r);
}
function fv(e, t, r, n, i) {
  var a = 1 - i;
  return 3 * (((t - e) * a + 2 * (r - t) * i) * a + (n - r) * i * i);
}
function Os(e, t, r, n, i, a) {
  var o = n + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - i, h = s * s - 3 * o * l, c = s * l - 9 * o * u, f = l * l - 3 * s * u, v = 0;
  if (Nr(h) && Nr(c))
    if (Nr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[v++] = d);
    }
  else {
    var g = c * c - 4 * h * f;
    if (Nr(g)) {
      var p = c / h, d = -s / o + p, y = -p / 2;
      d >= 0 && d <= 1 && (a[v++] = d), y >= 0 && y <= 1 && (a[v++] = y);
    } else if (g > 0) {
      var m = Fr(g), _ = h * s + 1.5 * o * (-c + m), b = h * s + 1.5 * o * (-c - m);
      _ < 0 ? _ = -xo(-_, To) : _ = xo(_, To), b < 0 ? b = -xo(-b, To) : b = xo(b, To);
      var d = (-s - (_ + b)) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d);
    } else {
      var S = (2 * h * s - 3 * o * c) / (2 * Fr(h * h * h)), w = Math.acos(S) / 3, x = Fr(h), M = Math.cos(w), d = (-s - 2 * x * M) / (3 * o), y = (-s + x * (M + cv * Math.sin(w))) / (3 * o), D = (-s + x * (M - cv * Math.sin(w))) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d), y >= 0 && y <= 1 && (a[v++] = y), D >= 0 && D <= 1 && (a[v++] = D);
    }
  }
  return v;
}
function $y(e, t, r, n, i) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * n - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (Nr(o)) {
    if (Ly(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var h = a * a - 4 * o * s;
    if (Nr(h))
      i[0] = -a / (2 * o);
    else if (h > 0) {
      var c = Fr(h), u = (-a + c) / (2 * o), f = (-a - c) / (2 * o);
      u >= 0 && u <= 1 && (i[l++] = u), f >= 0 && f <= 1 && (i[l++] = f);
    }
  }
  return l;
}
function Es(e, t, r, n, i, a) {
  var o = (t - e) * i + e, s = (r - t) * i + t, l = (n - r) * i + r, u = (s - o) * i + o, h = (l - s) * i + s, c = (h - u) * i + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = n;
}
function yw(e, t, r, n, i, a, o, s, l, u, h) {
  var c, f = 5e-3, v = 1 / 0, d, g, p, y;
  We[0] = l, We[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    ge[0] = Et(e, r, i, o, m), ge[1] = Et(t, n, a, s, m), p = yi(We, ge), p < v && (c = m, v = p);
  v = 1 / 0;
  for (var _ = 0; _ < 32 && !(f < Iy); _++)
    d = c - f, g = c + f, ge[0] = Et(e, r, i, o, d), ge[1] = Et(t, n, a, s, d), p = yi(ge, We), d >= 0 && p < v ? (c = d, v = p) : (bi[0] = Et(e, r, i, o, g), bi[1] = Et(t, n, a, s, g), y = yi(bi, We), g <= 1 && y < v ? (c = g, v = y) : f *= 0.5);
  return Fr(v);
}
function mw(e, t, r, n, i, a, o, s, l) {
  for (var u = e, h = t, c = 0, f = 1 / l, v = 1; v <= l; v++) {
    var d = v * f, g = Et(e, r, i, o, d), p = Et(t, n, a, s, d), y = g - u, m = p - h;
    c += Math.sqrt(y * y + m * m), u = g, h = p;
  }
  return c;
}
function Qt(e, t, r, n) {
  var i = 1 - n;
  return i * (i * e + 2 * n * t) + n * n * r;
}
function vv(e, t, r, n) {
  return 2 * ((1 - n) * (t - e) + n * (r - t));
}
function _w(e, t, r, n, i) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - n, l = 0;
  if (Nr(a)) {
    if (Ly(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var h = o * o - 4 * a * s;
    if (Nr(h)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u);
    } else if (h > 0) {
      var c = Fr(h), u = (-o + c) / (2 * a), f = (-o - c) / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u), f >= 0 && f <= 1 && (i[l++] = f);
    }
  }
  return l;
}
function Py(e, t, r) {
  var n = e + r - 2 * t;
  return n === 0 ? 0.5 : (e - t) / n;
}
function ks(e, t, r, n, i) {
  var a = (t - e) * n + e, o = (r - t) * n + t, s = (o - a) * n + a;
  i[0] = e, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = r;
}
function bw(e, t, r, n, i, a, o, s, l) {
  var u, h = 5e-3, c = 1 / 0;
  We[0] = o, We[1] = s;
  for (var f = 0; f < 1; f += 0.05) {
    ge[0] = Qt(e, r, i, f), ge[1] = Qt(t, n, a, f);
    var v = yi(We, ge);
    v < c && (u = f, c = v);
  }
  c = 1 / 0;
  for (var d = 0; d < 32 && !(h < Iy); d++) {
    var g = u - h, p = u + h;
    ge[0] = Qt(e, r, i, g), ge[1] = Qt(t, n, a, g);
    var v = yi(ge, We);
    if (g >= 0 && v < c)
      u = g, c = v;
    else {
      bi[0] = Qt(e, r, i, p), bi[1] = Qt(t, n, a, p);
      var y = yi(bi, We);
      p <= 1 && y < c ? (u = p, c = y) : h *= 0.5;
    }
  }
  return Fr(c);
}
function ww(e, t, r, n, i, a, o) {
  for (var s = e, l = t, u = 0, h = 1 / o, c = 1; c <= o; c++) {
    var f = c * h, v = Qt(e, r, i, f), d = Qt(t, n, a, f), g = v - s, p = d - l;
    u += Math.sqrt(g * g + p * p), s = v, l = d;
  }
  return u;
}
var Sw = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Ry(e) {
  var t = e && Sw.exec(e);
  if (t) {
    var r = t[1].split(","), n = +Ue(r[0]), i = +Ue(r[1]), a = +Ue(r[2]), o = +Ue(r[3]);
    if (isNaN(n + i + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Os(0, n, a, 1, l, s) && Et(0, i, o, 1, s[0]);
    };
  }
}
var xw = function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Yt, this.ondestroy = t.ondestroy || Yt, this.onrestart = t.onrestart || Yt, t.easing && this.setEasing(t.easing);
  }
  return e.prototype.step = function(t, r) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += r;
      return;
    }
    var n = this._life, i = t - this._startTime - this._pausedTime, a = i / n;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = i % n;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, e.prototype.pause = function() {
    this._paused = !0;
  }, e.prototype.resume = function() {
    this._paused = !1;
  }, e.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = Z(t) ? t : Aa[t] || Ry(t);
  }, e;
}(), Oy = /* @__PURE__ */ function() {
  function e(t) {
    this.value = t;
  }
  return e;
}(), Tw = function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new Oy(t);
    return this.insertEntry(r), r;
  }, e.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, e.prototype.remove = function(t) {
    var r = t.prev, n = t.next;
    r ? r.next = n : this.head = n, n ? n.prev = r : this.tail = r, t.next = t.prev = null, this._len--;
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, e;
}(), co = function() {
  function e(t) {
    this._list = new Tw(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var n = this._list, i = this._map, a = null;
    if (i[t] == null) {
      var o = n.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = n.head;
        n.remove(l), delete i[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new Oy(r), s.key = t, n.insertEntry(s), i[t] = s;
    }
    return a;
  }, e.prototype.get = function(t) {
    var r = this._map[t], n = this._list;
    if (r != null)
      return r !== n.tail && (n.remove(r), n.insertEntry(r)), r.value;
  }, e.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, e.prototype.len = function() {
    return this._list.len();
  }, e;
}(), dv = {
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
function Cw(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 360 ? 360 : e;
}
function Ya(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Ql(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Pe(parseFloat(t) / 100 * 255) : Pe(parseInt(t, 10));
}
function Dn(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Ya(parseFloat(t) / 100) : Ya(parseFloat(t));
}
function Jl(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function Br(e, t, r) {
  return e + (t - e) * r;
}
function fe(e, t, r, n, i) {
  return e[0] = t, e[1] = r, e[2] = n, e[3] = i, e;
}
function Th(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var Ey = new co(20), Co = null;
function Yn(e, t) {
  Co && Th(Co, t), Co = Ey.put(e, Co || t.slice());
}
function we(e, t) {
  if (e) {
    t = t || [];
    var r = Ey.get(e);
    if (r)
      return Th(t, r);
    e = e + "";
    var n = e.replace(/ /g, "").toLowerCase();
    if (n in dv)
      return Th(t, dv[n]), Yn(e, t), t;
    var i = n.length;
    if (n.charAt(0) === "#") {
      if (i === 4 || i === 5) {
        var a = parseInt(n.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          fe(t, 0, 0, 0, 1);
          return;
        }
        return fe(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(n.slice(4), 16) / 15 : 1), Yn(e, t), t;
      } else if (i === 7 || i === 9) {
        var a = parseInt(n.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          fe(t, 0, 0, 0, 1);
          return;
        }
        return fe(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(n.slice(7), 16) / 255 : 1), Yn(e, t), t;
      }
      return;
    }
    var o = n.indexOf("("), s = n.indexOf(")");
    if (o !== -1 && s + 1 === i) {
      var l = n.substr(0, o), u = n.substr(o + 1, s - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? fe(t, +u[0], +u[1], +u[2], 1) : fe(t, 0, 0, 0, 1);
          h = Dn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return fe(t, Ql(u[0]), Ql(u[1]), Ql(u[2]), u.length === 3 ? h : Dn(u[3])), Yn(e, t), t;
          fe(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            fe(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Dn(u[3]), Ch(u, t), Yn(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            fe(t, 0, 0, 0, 1);
            return;
          }
          return Ch(u, t), Yn(e, t), t;
        default:
          return;
      }
    }
    fe(t, 0, 0, 0, 1);
  }
}
function Ch(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, n = Dn(e[1]), i = Dn(e[2]), a = i <= 0.5 ? i * (n + 1) : i + n - i * n, o = i * 2 - a;
  return t = t || [], fe(t, Pe(Jl(o, a, r + 1 / 3) * 255), Pe(Jl(o, a, r) * 255), Pe(Jl(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function Mw(e) {
  if (e) {
    var t = e[0] / 255, r = e[1] / 255, n = e[2] / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = a - i, s = (a + i) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + i) : u = o / (2 - a - i);
      var h = ((a - t) / 6 + o / 2) / o, c = ((a - r) / 6 + o / 2) / o, f = ((a - n) / 6 + o / 2) / o;
      t === a ? l = f - c : r === a ? l = 1 / 3 + h - f : n === a && (l = 2 / 3 + c - h), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var v = [l * 360, u, s];
    return e[3] != null && v.push(e[3]), v;
  }
}
function pv(e, t) {
  var r = we(e);
  if (r) {
    for (var n = 0; n < 3; n++)
      r[n] = r[n] * (1 - t) | 0, r[n] > 255 ? r[n] = 255 : r[n] < 0 && (r[n] = 0);
    return cr(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function tu(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    r = r || [];
    var n = e * (t.length - 1), i = Math.floor(n), a = Math.ceil(n), o = t[i], s = t[a], l = n - i;
    return r[0] = Pe(Br(o[0], s[0], l)), r[1] = Pe(Br(o[1], s[1], l)), r[2] = Pe(Br(o[2], s[2], l)), r[3] = Ya(Br(o[3], s[3], l)), r;
  }
}
function Dw(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    var n = e * (t.length - 1), i = Math.floor(n), a = Math.ceil(n), o = we(t[i]), s = we(t[a]), l = n - i, u = cr([
      Pe(Br(o[0], s[0], l)),
      Pe(Br(o[1], s[1], l)),
      Pe(Br(o[2], s[2], l)),
      Ya(Br(o[3], s[3], l))
    ], "rgba");
    return r ? {
      color: u,
      leftIndex: i,
      rightIndex: a,
      value: n
    } : u;
  }
}
function eu(e, t, r, n) {
  var i = we(e);
  if (e)
    return i = Mw(i), t != null && (i[0] = Cw(t)), r != null && (i[1] = Dn(r)), n != null && (i[2] = Dn(n)), cr(Ch(i), "rgba");
}
function Aw(e, t) {
  var r = we(e);
  if (r && t != null)
    return r[3] = Ya(t), cr(r, "rgba");
}
function cr(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function Ns(e, t) {
  var r = we(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var gv = new co(100);
function yv(e) {
  if (H(e)) {
    var t = gv.get(e);
    return t || (t = pv(e, -0.1), gv.put(e, t)), t;
  } else if (ll(e)) {
    var r = N({}, e);
    return r.colorStops = U(e.colorStops, function(n) {
      return {
        offset: n.offset,
        color: pv(n.color, -0.1)
      };
    }), r;
  }
  return e;
}
function Iw(e) {
  return e.type === "linear";
}
function Lw(e) {
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
var Mh = Array.prototype.slice;
function or(e, t, r) {
  return (t - e) * r + e;
}
function ru(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++)
    e[a] = or(t[a], r[a], n);
  return e;
}
function $w(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = or(t[o][s], r[o][s], n);
  }
  return e;
}
function Mo(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++)
    e[a] = t[a] + r[a] * n;
  return e;
}
function mv(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * n;
  }
  return e;
}
function Pw(e, t) {
  for (var r = e.length, n = t.length, i = r > n ? t : e, a = Math.min(r, n), o = i[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, n); s++)
    i.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Rw(e, t, r) {
  var n = e, i = t;
  if (!(!n.push || !i.push)) {
    var a = n.length, o = i.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        n.length = o;
      else
        for (var l = a; l < o; l++)
          n.push(r === 1 ? i[l] : Mh.call(i[l]));
    }
    for (var u = n[0] && n[0].length, l = 0; l < n.length; l++)
      if (r === 1)
        isNaN(n[l]) && (n[l] = i[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(n[l][h]) && (n[l][h] = i[l][h]);
  }
}
function cs(e) {
  if (ee(e)) {
    var t = e.length;
    if (ee(e[0])) {
      for (var r = [], n = 0; n < t; n++)
        r.push(Mh.call(e[n]));
      return r;
    }
    return Mh.call(e);
  }
  return e;
}
function fs(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Ow(e) {
  return ee(e && e[0]) ? 2 : 1;
}
var Do = 0, vs = 1, ky = 2, ba = 3, Dh = 4, Ah = 5, _v = 6;
function bv(e) {
  return e === Dh || e === Ah;
}
function Ao(e) {
  return e === vs || e === ky;
}
var ta = [0, 0, 0, 0], Ew = function() {
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
  }, e.prototype.addKeyframe = function(t, r, n) {
    this._needsSort = !0;
    var i = this.keyframes, a = i.length, o = !1, s = _v, l = r;
    if (ee(r)) {
      var u = Ow(r);
      s = u, (u === 1 && !_t(r[0]) || u === 2 && !_t(r[0][0])) && (o = !0);
    } else if (_t(r) && !$s(r))
      s = Do;
    else if (H(r))
      if (!isNaN(+r))
        s = Do;
      else {
        var h = we(r);
        h && (l = h, s = ba);
      }
    else if (ll(r)) {
      var c = N({}, l);
      c.colorStops = U(r.colorStops, function(v) {
        return {
          offset: v.offset,
          color: we(v.color)
        };
      }), Iw(r) ? s = Dh : Lw(r) && (s = Ah), l = c;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === _v) && (o = !0), this.discrete = this.discrete || o;
    var f = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return n && (f.easing = n, f.easingFunc = Z(n) ? n : Aa[n] || Ry(n)), i.push(f), f;
  }, e.prototype.prepare = function(t, r) {
    var n = this.keyframes;
    this._needsSort && n.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var i = this.valType, a = n.length, o = n[a - 1], s = this.discrete, l = Ao(i), u = bv(i), h = 0; h < a; h++) {
      var c = n[h], f = c.value, v = o.value;
      c.percent = c.time / t, s || (l && h !== a - 1 ? Rw(f, v, i) : u && Pw(f.colorStops, v.colorStops));
    }
    if (!s && i !== Ah && r && this.needsAnimate() && r.needsAnimate() && i === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var d = n[0].value, h = 0; h < a; h++)
        i === Do ? n[h].additiveValue = n[h].value - d : i === ba ? n[h].additiveValue = Mo([], n[h].value, d, -1) : Ao(i) && (n[h].additiveValue = i === vs ? Mo([], n[h].value, d, -1) : mv([], n[h].value, d, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var n = this._additiveTrack != null, i = n ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === ba, h, c = this._lastFr, f = Math.min, v, d;
      if (s === 1)
        v = d = o[0];
      else {
        if (r < 0)
          h = 0;
        else if (r < this._lastFrP) {
          var g = f(c + 1, s - 1);
          for (h = g; h >= 0 && !(o[h].percent <= r); h--)
            ;
          h = f(h, s - 2);
        } else {
          for (h = c; h < s && !(o[h].percent > r); h++)
            ;
          h = f(h - 1, s - 2);
        }
        d = o[h + 1], v = o[h];
      }
      if (v && d) {
        this._lastFr = h, this._lastFrP = r;
        var p = d.percent - v.percent, y = p === 0 ? 1 : f((r - v.percent) / p, 1);
        d.easingFunc && (y = d.easingFunc(y));
        var m = n ? this._additiveValue : u ? ta : t[l];
        if ((Ao(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? v.rawValue : d.rawValue;
        else if (Ao(a))
          a === vs ? ru(m, v[i], d[i], y) : $w(m, v[i], d[i], y);
        else if (bv(a)) {
          var _ = v[i], b = d[i], S = a === Dh;
          t[l] = {
            type: S ? "linear" : "radial",
            x: or(_.x, b.x, y),
            y: or(_.y, b.y, y),
            colorStops: U(_.colorStops, function(x, M) {
              var D = b.colorStops[M];
              return {
                offset: or(x.offset, D.offset, y),
                color: fs(ru([], x.color, D.color, y))
              };
            }),
            global: b.global
          }, S ? (t[l].x2 = or(_.x2, b.x2, y), t[l].y2 = or(_.y2, b.y2, y)) : t[l].r = or(_.r, b.r, y);
        } else if (u)
          ru(m, v[i], d[i], y), n || (t[l] = fs(m));
        else {
          var w = or(v[i], d[i], y);
          n ? this._additiveValue = w : t[l] = w;
        }
        n && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, n = this.propName, i = this._additiveValue;
    r === Do ? t[n] = t[n] + i : r === ba ? (we(t[n], ta), Mo(ta, ta, i, 1), t[n] = fs(ta)) : r === vs ? Mo(t[n], t[n], i, 1) : r === ky && mv(t[n], t[n], i, 1);
  }, e;
}(), Hc = function() {
  function e(t, r, n, i) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && i) {
      Ec("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = i, this._allowDiscrete = n;
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
  }, e.prototype.when = function(t, r, n) {
    return this.whenWithKeys(t, r, mt(r), n);
  }, e.prototype.whenWithKeys = function(t, r, n, i) {
    for (var a = this._tracks, o = 0; o < n.length; o++) {
      var s = n[o], l = a[s];
      if (!l) {
        l = a[s] = new Ew(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var c = h.keyframes, f = c[c.length - 1];
          u = f && f.value, h.valType === ba && u && (u = fs(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, cs(u), i), this._trackKeys.push(s);
      }
      l.addKeyframe(t, cs(r[s]), i);
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
      for (var r = t.length, n = 0; n < r; n++)
        t[n].call(this);
  }, e.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, r = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, r)
      for (var n = 0; n < r.length; n++)
        r[n].call(this);
  }, e.prototype._setTracksFinished = function() {
    for (var t = this._tracks, r = this._trackKeys, n = 0; n < r.length; n++)
      t[r[n]].setFinished();
  }, e.prototype._getAdditiveTrack = function(t) {
    var r, n = this._additiveAnimators;
    if (n)
      for (var i = 0; i < n.length; i++) {
        var a = n[i].getTrack(t);
        a && (r = a);
      }
    return r;
  }, e.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var r = this, n = [], i = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, h = u.length;
        if (s.prepare(i, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var c = u[h - 1];
            c && (r._target[s.propName] = c.rawValue), s.setFinished();
          } else
            n.push(s);
      }
      if (n.length || this._force) {
        var f = new xw({
          life: i,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(v) {
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
            for (var p = 0; p < n.length; p++)
              n[p].step(r._target, v);
            var y = r._onframeCbs;
            if (y)
              for (var p = 0; p < y.length; p++)
                y[p](r._target, v);
          },
          ondestroy: function() {
            r._doneCallback();
          }
        });
        this._clip = f, this.animation && this.animation.addClip(f), t && f.setEasing(t);
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
    for (var n = this._tracks, i = this._trackKeys, a = 0; a < t.length; a++) {
      var o = n[t[a]];
      o && !o.isFinished() && (r ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < i.length; a++)
      if (!n[i[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, e.prototype.saveTo = function(t, r, n) {
    if (t) {
      r = r || this._trackKeys;
      for (var i = 0; i < r.length; i++) {
        var a = r[i], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[n ? 0 : s.length - 1];
          l && (t[a] = cs(l.rawValue));
        }
      }
    }
  }, e.prototype.__changeFinalValue = function(t, r) {
    r = r || mt(t);
    for (var n = 0; n < r.length; n++) {
      var i = r[n], a = this._tracks[i];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[i]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, e;
}();
function di() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var kw = function(e) {
  B(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, r = r || {}, n.stage = r.stage || {}, n;
  }
  return t.prototype.addClip = function(r) {
    r.animation && this.removeClip(r), this._head ? (this._tail.next = r, r.prev = this._tail, r.next = null, this._tail = r) : this._head = this._tail = r, r.animation = this;
  }, t.prototype.addAnimator = function(r) {
    r.animation = this;
    var n = r.getClip();
    n && this.addClip(n);
  }, t.prototype.removeClip = function(r) {
    if (r.animation) {
      var n = r.prev, i = r.next;
      n ? n.next = i : this._head = i, i ? i.prev = n : this._tail = n, r.next = r.prev = r.animation = null;
    }
  }, t.prototype.removeAnimator = function(r) {
    var n = r.getClip();
    n && this.removeClip(n), r.animation = null;
  }, t.prototype.update = function(r) {
    for (var n = di() - this._pausedTime, i = n - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(n, i);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = n, r || (this.trigger("frame", i), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function n() {
      r._running && (Ps(n), !r._paused && r.update());
    }
    Ps(n);
  }, t.prototype.start = function() {
    this._running || (this._time = di(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = di(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += di() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var r = this._head; r; ) {
      var n = r.next;
      r.prev = r.next = r.animation = null, r = n;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(r, n) {
    n = n || {}, this.start();
    var i = new Hc(r, n.loop);
    return this.addAnimator(i), i;
  }, t;
}(tr), Nw = 300, nu = X.domSupported, iu = function() {
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
  }, n = U(e, function(i) {
    var a = i.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : i;
  });
  return {
    mouse: e,
    touch: t,
    pointer: n
  };
}(), wv = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Sv = !1;
function Ih(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function Bw(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function au(e) {
  e && (e.zrByTouch = !0);
}
function zw(e, t) {
  return ve(e.dom, new Fw(e, t), !0);
}
function Ny(e, t) {
  for (var r = t, n = !1; r && r.nodeType !== 9 && !(n = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return n;
}
var Fw = /* @__PURE__ */ function() {
  function e(t, r) {
    this.stopPropagation = Yt, this.stopImmediatePropagation = Yt, this.preventDefault = Yt, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return e;
}(), Ie = {
  mousedown: function(e) {
    e = ve(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
  },
  mousemove: function(e) {
    e = ve(this.dom, e);
    var t = this.__mayPointerCapture;
    t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    e = ve(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
  },
  mouseout: function(e) {
    e = ve(this.dom, e);
    var t = e.toElement || e.relatedTarget;
    Ny(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    Sv = !0, e = ve(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    Sv || (e = ve(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = ve(this.dom, e), au(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), Ie.mousemove.call(this, e), Ie.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = ve(this.dom, e), au(e), this.handler.processGesture(e, "change"), Ie.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = ve(this.dom, e), au(e), this.handler.processGesture(e, "end"), Ie.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < Nw && Ie.click.call(this, e);
  },
  pointerdown: function(e) {
    Ie.mousedown.call(this, e);
  },
  pointermove: function(e) {
    Ih(e) || Ie.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Ie.mouseup.call(this, e);
  },
  pointerout: function(e) {
    Ih(e) || Ie.mouseout.call(this, e);
  }
};
C(["click", "dblclick", "contextmenu"], function(e) {
  Ie[e] = function(t) {
    t = ve(this.dom, t), this.trigger(e, t);
  };
});
var Lh = {
  pointermove: function(e) {
    Ih(e) || Lh.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Lh.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function Hw(e, t) {
  var r = t.domHandlers;
  X.pointerEventsSupported ? C(iu.pointer, function(n) {
    ds(t, n, function(i) {
      r[n].call(e, i);
    });
  }) : (X.touchEventsSupported && C(iu.touch, function(n) {
    ds(t, n, function(i) {
      r[n].call(e, i), Bw(t);
    });
  }), C(iu.mouse, function(n) {
    ds(t, n, function(i) {
      i = Nc(i), t.touching || r[n].call(e, i);
    });
  }));
}
function Vw(e, t) {
  X.pointerEventsSupported ? C(wv.pointer, r) : X.touchEventsSupported || C(wv.mouse, r);
  function r(n) {
    function i(a) {
      a = Nc(a), Ny(e, a.target) || (a = zw(e, a), t.domHandlers[n].call(e, a));
    }
    ds(t, n, i, { capture: !0 });
  }
}
function ds(e, t, r, n) {
  e.mounted[t] = r, e.listenerOpts[t] = n, rw(e.domTarget, t, r, n);
}
function ou(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && nw(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var xv = /* @__PURE__ */ function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
}(), Gw = function(e) {
  B(t, e);
  function t(r, n) {
    var i = e.call(this) || this;
    return i.__pointerCapturing = !1, i.dom = r, i.painterRoot = n, i._localHandlerScope = new xv(r, Ie), nu && (i._globalHandlerScope = new xv(document, Lh)), Hw(i, i._localHandlerScope), i;
  }
  return t.prototype.dispose = function() {
    ou(this._localHandlerScope), nu && ou(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, nu && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var n = this._globalHandlerScope;
      r ? Vw(this, n) : ou(n);
    }
  }, t;
}(tr), By = 1;
X.hasGlobalWindow && (By = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Bs = By, $h = 0.4, Ph = "#333", Rh = "#ccc", Ww = "#eee", Tv = Bc, Cv = 5e-5;
function en(e) {
  return e > Cv || e < -Cv;
}
var rn = [], Xn = [], su = mi(), lu = Math.abs, Vc = function() {
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
    return en(this.rotation) || en(this.x) || en(this.y) || en(this.scaleX - 1) || en(this.scaleY - 1) || en(this.skewX) || en(this.skewY);
  }, e.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, r = this.needLocalTransform(), n = this.transform;
    if (!(r || t)) {
      n && (Tv(n), this.invTransform = null);
      return;
    }
    n = n || mi(), r ? this.getLocalTransform(n) : Tv(n), t && (r ? _i(n, t, n) : ow(n, t)), this.transform = n, this._resolveGlobalScaleRatio(n);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(rn);
      var n = rn[0] < 0 ? -1 : 1, i = rn[1] < 0 ? -1 : 1, a = ((rn[0] - n) * r + n) / rn[0] || 0, o = ((rn[1] - i) * r + i) / rn[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || mi(), Fc(this.invTransform, t);
  }, e.prototype.getComputedTransform = function() {
    for (var t = this, r = []; t; )
      r.push(t), t = t.parent;
    for (; t = r.pop(); )
      t.updateTransform();
    return this.transform;
  }, e.prototype.setLocalTransform = function(t) {
    if (t) {
      var r = t[0] * t[0] + t[1] * t[1], n = t[2] * t[2] + t[3] * t[3], i = Math.atan2(t[1], t[0]), a = Math.PI / 2 + i - Math.atan2(t[3], t[2]);
      n = Math.sqrt(n) * Math.cos(a), r = Math.sqrt(r), this.skewX = a, this.skewY = 0, this.rotation = -i, this.x = +t[4], this.y = +t[5], this.scaleX = r, this.scaleY = n, this.originX = 0, this.originY = 0;
    }
  }, e.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, r = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || mi(), _i(Xn, t.invTransform, r), r = Xn);
      var n = this.originX, i = this.originY;
      (n || i) && (su[4] = n, su[5] = i, _i(Xn, r, su), Xn[4] -= n, Xn[5] -= i, r = Xn), this.setLocalTransform(r);
    }
  }, e.prototype.getGlobalScale = function(t) {
    var r = this.transform;
    return t = t || [], r ? (t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3]), r[0] < 0 && (t[0] = -t[0]), r[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, e.prototype.transformCoordToLocal = function(t, r) {
    var n = [t, r], i = this.invTransform;
    return i && be(n, n, i), n;
  }, e.prototype.transformCoordToGlobal = function(t, r) {
    var n = [t, r], i = this.transform;
    return i && be(n, n, i), n;
  }, e.prototype.getLineScale = function() {
    var t = this.transform;
    return t && lu(t[0] - 1) > 1e-10 && lu(t[3] - 1) > 1e-10 ? Math.sqrt(lu(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    Uw(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var n = t.originX || 0, i = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, c = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, v = t.skewY ? Math.tan(-t.skewY) : 0;
    if (n || i || s || l) {
      var d = n + s, g = i + l;
      r[4] = -d * a - f * g * o, r[5] = -g * o - v * d * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = v * a, r[2] = f * o, u && zc(r, r, u), r[4] += n + h, r[5] += i + c, r;
  }, e.initDefaultProps = function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), e;
}(), Xa = [
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
function Uw(e, t) {
  for (var r = 0; r < Xa.length; r++) {
    var n = Xa[r];
    e[n] = t[n];
  }
}
var Mv = {};
function se(e, t) {
  t = t || Rn;
  var r = Mv[t];
  r || (r = Mv[t] = new co(500));
  var n = r.get(e);
  return n == null && (n = Gr.measureText(e, t).width, r.put(e, n)), n;
}
function Dv(e, t, r, n) {
  var i = se(e, t), a = Wc(t), o = wa(0, i, r), s = hi(0, a, n), l = new ut(o, s, i, a);
  return l;
}
function Gc(e, t, r, n) {
  var i = ((e || "") + "").split(`
`), a = i.length;
  if (a === 1)
    return Dv(i[0], t, r, n);
  for (var o = new ut(0, 0, 0, 0), s = 0; s < i.length; s++) {
    var l = Dv(i[s], t, r, n);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function wa(e, t, r) {
  return r === "right" ? e -= t : r === "center" && (e -= t / 2), e;
}
function hi(e, t, r) {
  return r === "middle" ? e -= t / 2 : r === "bottom" && (e -= t), e;
}
function Wc(e) {
  return se("国", e);
}
function Ze(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function zs(e, t, r) {
  var n = t.position || "inside", i = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, h = "left", c = "top";
  if (n instanceof Array)
    l += Ze(n[0], r.width), u += Ze(n[1], r.height), h = null, c = null;
  else
    switch (n) {
      case "left":
        l -= i, u += s, h = "right", c = "middle";
        break;
      case "right":
        l += i + o, u += s, c = "middle";
        break;
      case "top":
        l += o / 2, u -= i, h = "center", c = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + i, h = "center";
        break;
      case "inside":
        l += o / 2, u += s, h = "center", c = "middle";
        break;
      case "insideLeft":
        l += i, u += s, c = "middle";
        break;
      case "insideRight":
        l += o - i, u += s, h = "right", c = "middle";
        break;
      case "insideTop":
        l += o / 2, u += i, h = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - i, h = "center", c = "bottom";
        break;
      case "insideTopLeft":
        l += i, u += i;
        break;
      case "insideTopRight":
        l += o - i, u += i, h = "right";
        break;
      case "insideBottomLeft":
        l += i, u += a - i, c = "bottom";
        break;
      case "insideBottomRight":
        l += o - i, u += a - i, h = "right", c = "bottom";
        break;
    }
  return e = e || {}, e.x = l, e.y = u, e.align = h, e.verticalAlign = c, e;
}
var uu = "__zr_normal__", hu = Xa.concat(["ignore"]), Yw = zi(Xa, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), qn = {}, Xw = new ut(0, 0, 0, 0), hl = function() {
  function e(t) {
    this.id = _y(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return e.prototype._init = function(t) {
    this.attr(t);
  }, e.prototype.drift = function(t, r, n) {
    switch (this.draggable) {
      case "horizontal":
        r = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var i = this.transform;
    i || (i = this.transform = [1, 0, 0, 1, 0, 0]), i[4] += t, i[5] += r, this.decomposeTransform(), this.markRedraw();
  }, e.prototype.beforeUpdate = function() {
  }, e.prototype.afterUpdate = function() {
  }, e.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, e.prototype.updateInnerText = function(t) {
    var r = this._textContent;
    if (r && (!r.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var n = this.textConfig, i = n.local, a = r.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = i ? this : null;
      var u = !1;
      if (a.copyTransform(r), n.position != null) {
        var h = Xw;
        n.layoutRect ? h.copy(n.layoutRect) : h.copy(this.getBoundingRect()), i || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(qn, n, h) : zs(qn, n, h), a.x = qn.x, a.y = qn.y, o = qn.align, s = qn.verticalAlign;
        var c = n.origin;
        if (c && n.rotation != null) {
          var f = void 0, v = void 0;
          c === "center" ? (f = h.width * 0.5, v = h.height * 0.5) : (f = Ze(c[0], h.width), v = Ze(c[1], h.height)), u = !0, a.originX = -a.x + f + (i ? 0 : h.x), a.originY = -a.y + v + (i ? 0 : h.y);
        }
      }
      n.rotation != null && (a.rotation = n.rotation);
      var d = n.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var g = n.inside == null ? typeof n.position == "string" && n.position.indexOf("inside") >= 0 : n.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      g && this.canBeInsideText() ? (y = n.insideFill, m = n.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = n.outsideFill, m = n.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== p.fill || m !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = y, p.stroke = m, p.autoStroke = _, p.align = o, p.verticalAlign = s, r.setDefaultTextStyle(p)), r.__dirty |= oe, l && r.dirtyStyle(!0);
    }
  }, e.prototype.canBeInsideText = function() {
    return !0;
  }, e.prototype.getInsideTextFill = function() {
    return "#fff";
  }, e.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, e.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Rh : Ph;
  }, e.prototype.getOutsideStroke = function(t) {
    var r = this.__zr && this.__zr.getBackgroundColor(), n = typeof r == "string" && we(r);
    n || (n = [255, 255, 255, 1]);
    for (var i = n[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      n[o] = n[o] * i + (a ? 0 : 255) * (1 - i);
    return n[3] = 1, cr(n, "rgba");
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
      for (var n = t, i = mt(n), a = 0; a < i.length; a++) {
        var o = i[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, n = 0; n < this.animators.length; n++) {
      var i = this.animators[n], a = i.__fromStateTransition;
      if (!(i.getLoop() || a && a !== uu)) {
        var o = i.targetName, s = o ? r[o] : r;
        i.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, hu);
  }, e.prototype._savePrimaryToNormal = function(t, r, n) {
    for (var i = 0; i < n.length; i++) {
      var a = n[i];
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
    this.useState(uu, !1, t);
  }, e.prototype.useState = function(t, r, n, i) {
    var a = t === uu, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(pt(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Ec("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || i);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, r, !n && !this.__inHover && l && l.duration > 0, l);
        var c = this._textContent, f = this._textGuide;
        return c && c.useState(t, r, n, h), f && f.useState(t, r, n, h), a ? (this.currentStates = [], this._normalState = {}) : r ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~oe), u;
      }
    }
  }, e.prototype.useStates = function(t, r, n) {
    if (!t.length)
      this.clearStates();
    else {
      var i = [], a = this.currentStates, o = t.length, s = o === a.length;
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
        this.stateProxy && (h = this.stateProxy(u, t)), h || (h = this.states[u]), h && i.push(h);
      }
      var c = i[o - 1], f = !!(c && c.hoverLayer || n);
      f && this._toggleHoverLayerFlag(!0);
      var v = this._mergeStates(i), d = this.stateTransition;
      this.saveCurrentToNormalState(v), this._applyStateObj(t.join(","), v, this._normalState, !1, !r && !this.__inHover && d && d.duration > 0, d);
      var g = this._textContent, p = this._textGuide;
      g && g.useStates(t, r, f), p && p.useStates(t, r, f), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~oe);
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
    var r = pt(this.currentStates, t);
    if (r >= 0) {
      var n = this.currentStates.slice();
      n.splice(r, 1), this.useStates(n);
    }
  }, e.prototype.replaceState = function(t, r, n) {
    var i = this.currentStates.slice(), a = pt(i, t), o = pt(i, r) >= 0;
    a >= 0 ? o ? i.splice(a, 1) : i[a] = r : n && !o && i.push(r), this.useStates(i);
  }, e.prototype.toggleState = function(t, r) {
    r ? this.useState(t, !0) : this.removeState(t);
  }, e.prototype._mergeStates = function(t) {
    for (var r = {}, n, i = 0; i < t.length; i++) {
      var a = t[i];
      N(r, a), a.textConfig && (n = n || {}, N(n, a.textConfig));
    }
    return n && (r.textConfig = n), r;
  }, e.prototype._applyStateObj = function(t, r, n, i, a, o) {
    var s = !(r && i);
    r && r.textConfig ? (this.textConfig = N({}, i ? this.textConfig : n.textConfig), N(this.textConfig, r.textConfig)) : s && n.textConfig && (this.textConfig = n.textConfig);
    for (var l = {}, u = !1, h = 0; h < hu.length; h++) {
      var c = hu[h], f = a && Yw[c];
      r && r[c] != null ? f ? (u = !0, l[c] = r[c]) : this[c] = r[c] : s && n[c] != null && (f ? (u = !0, l[c] = n[c]) : this[c] = n[c]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var v = this.animators[h], d = v.targetName;
        v.getLoop() || v.__changeFinalValue(d ? (r || n)[d] : r || n);
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
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new Vc(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= oe;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, e.prototype.dirty = function() {
    this.markRedraw();
  }, e.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var r = this._textContent, n = this._textGuide;
    r && (r.__inHover = t), n && (n.__inHover = t);
  }, e.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var r = this.animators;
      if (r)
        for (var n = 0; n < r.length; n++)
          t.animation.addAnimator(r[n]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, e.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var r = this.animators;
      if (r)
        for (var n = 0; n < r.length; n++)
          t.animation.removeAnimator(r[n]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, e.prototype.animate = function(t, r, n) {
    var i = t ? this[t] : this, a = new Hc(i, r, n);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, e.prototype.addAnimator = function(t, r) {
    var n = this.__zr, i = this;
    t.during(function() {
      i.updateDuringAnimation(r);
    }).done(function() {
      var a = i.animators, o = pt(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), n && n.animation.addAnimator(t), n && n.wakeUp();
  }, e.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, e.prototype.stopAnimation = function(t, r) {
    for (var n = this.animators, i = n.length, a = [], o = 0; o < i; o++) {
      var s = n[o];
      !t || t === s.scope ? s.stop(r) : a.push(s);
    }
    return this.animators = a, this;
  }, e.prototype.animateTo = function(t, r, n) {
    cu(this, t, r, n);
  }, e.prototype.animateFrom = function(t, r, n) {
    cu(this, t, r, n, !0);
  }, e.prototype._transitionState = function(t, r, n, i) {
    for (var a = cu(this, r, n, i), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, e.prototype.getBoundingRect = function() {
    return null;
  }, e.prototype.getPaintRect = function() {
    return null;
  }, e.initDefaultProps = function() {
    var t = e.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = oe;
    function r(n, i, a, o) {
      Object.defineProperty(t, n, {
        get: function() {
          if (!this[i]) {
            var l = this[i] = [];
            s(this, l);
          }
          return this[i];
        },
        set: function(l) {
          this[a] = l[0], this[o] = l[1], this[i] = l, s(this, l);
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
Je(hl, tr);
Je(hl, Vc);
function cu(e, t, r, n, i) {
  r = r || {};
  var a = [];
  zy(e, "", e, t, r, n, a, i);
  var o = a.length, s = !1, l = r.done, u = r.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, c = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(d, g) {
    r.during(g);
  });
  for (var f = 0; f < a.length; f++) {
    var v = a[f];
    h && v.done(h), c && v.aborted(c), r.force && v.duration(r.duration), v.start(r.easing);
  }
  return a;
}
function fu(e, t, r) {
  for (var n = 0; n < r; n++)
    e[n] = t[n];
}
function qw(e) {
  return ee(e[0]);
}
function Zw(e, t, r) {
  if (ee(t[r]))
    if (ee(e[r]) || (e[r] = []), re(t[r])) {
      var n = t[r].length;
      e[r].length !== n && (e[r] = new t[r].constructor(n), fu(e[r], t[r], n));
    } else {
      var i = t[r], a = e[r], o = i.length;
      if (qw(i))
        for (var s = i[0].length, l = 0; l < o; l++)
          a[l] ? fu(a[l], i[l], s) : a[l] = Array.prototype.slice.call(i[l]);
      else
        fu(a, i, o);
      a.length = i.length;
    }
  else
    e[r] = t[r];
}
function Kw(e, t) {
  return e === t || ee(e) && ee(t) && jw(e, t);
}
function jw(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var n = 0; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function zy(e, t, r, n, i, a, o, s) {
  for (var l = mt(n), u = i.duration, h = i.delay, c = i.additive, f = i.setToFinal, v = !V(a), d = e.animators, g = [], p = 0; p < l.length; p++) {
    var y = l[p], m = n[y];
    if (m != null && r[y] != null && (v || a[y]))
      if (V(m) && !ee(m) && !ll(m)) {
        if (t) {
          s || (r[y] = m, e.updateDuringAnimation(t));
          continue;
        }
        zy(e, y, r[y], m, i, a && a[y], o, s);
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
          var x = pt(d, S);
          d.splice(x, 1);
        }
      }
    }
  if (i.force || (g = Ot(g, function(T) {
    return !Kw(n[T], r[T]);
  }), _ = g.length), _ > 0 || i.force && !o.length) {
    var M = void 0, D = void 0, A = void 0;
    if (s) {
      D = {}, f && (M = {});
      for (var b = 0; b < _; b++) {
        var y = g[b];
        D[y] = r[y], f ? M[y] = n[y] : r[y] = n[y];
      }
    } else if (f) {
      A = {};
      for (var b = 0; b < _; b++) {
        var y = g[b];
        A[y] = cs(r[y]), Zw(r, n, y);
      }
    }
    var S = new Hc(r, !1, !1, c ? Ot(d, function(L) {
      return L.targetName === t;
    }) : null);
    S.targetName = t, i.scope && (S.scope = i.scope), f && M && S.whenWithKeys(0, M, g), A && S.whenWithKeys(0, A, g), S.whenWithKeys(u ?? 500, s ? D : n, g).delay(h || 0), e.addAnimator(S, t), o.push(S);
  }
}
var Mt = function(e) {
  B(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isGroup = !0, n._children = [], n.attr(r), n;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(r) {
    return this._children[r];
  }, t.prototype.childOfName = function(r) {
    for (var n = this._children, i = 0; i < n.length; i++)
      if (n[i].name === r)
        return n[i];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(r) {
    return r && r !== this && r.parent !== this && (this._children.push(r), this._doAdd(r)), this;
  }, t.prototype.addBefore = function(r, n) {
    if (r && r !== this && r.parent !== this && n && n.parent === this) {
      var i = this._children, a = i.indexOf(n);
      a >= 0 && (i.splice(a, 0, r), this._doAdd(r));
    }
    return this;
  }, t.prototype.replace = function(r, n) {
    var i = pt(this._children, r);
    return i >= 0 && this.replaceAt(n, i), this;
  }, t.prototype.replaceAt = function(r, n) {
    var i = this._children, a = i[n];
    if (r && r !== this && r.parent !== this && r !== a) {
      i[n] = r, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(r);
    }
    return this;
  }, t.prototype._doAdd = function(r) {
    r.parent && r.parent.remove(r), r.parent = this;
    var n = this.__zr;
    n && n !== r.__zr && r.addSelfToZr(n), n && n.refresh();
  }, t.prototype.remove = function(r) {
    var n = this.__zr, i = this._children, a = pt(i, r);
    return a < 0 ? this : (i.splice(a, 1), r.parent = null, n && r.removeSelfFromZr(n), n && n.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var r = this._children, n = this.__zr, i = 0; i < r.length; i++) {
      var a = r[i];
      n && a.removeSelfFromZr(n), a.parent = null;
    }
    return r.length = 0, this;
  }, t.prototype.eachChild = function(r, n) {
    for (var i = this._children, a = 0; a < i.length; a++) {
      var o = i[a];
      r.call(n, o, a);
    }
    return this;
  }, t.prototype.traverse = function(r, n) {
    for (var i = 0; i < this._children.length; i++) {
      var a = this._children[i], o = r.call(n, a);
      a.isGroup && !o && a.traverse(r, n);
    }
    return this;
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var n = 0; n < this._children.length; n++) {
      var i = this._children[n];
      i.addSelfToZr(r);
    }
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var n = 0; n < this._children.length; n++) {
      var i = this._children[n];
      i.removeSelfFromZr(r);
    }
  }, t.prototype.getBoundingRect = function(r) {
    for (var n = new ut(0, 0, 0, 0), i = r || this._children, a = [], o = null, s = 0; s < i.length; s++) {
      var l = i[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (ut.applyTransform(n, u, h), o = o || n.clone(), o.union(n)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || n;
  }, t;
}(hl);
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
var ps = {}, Fy = {};
function Qw(e) {
  delete Fy[e];
}
function Jw(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return Ns(e, 1) < $h;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, n = t.length, i = 0; i < n; i++)
      r += Ns(t[i].color, 1);
    return r /= n, r < $h;
  }
  return !1;
}
var tS = function() {
  function e(t, r, n) {
    var i = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, n = n || {}, this.dom = r, this.id = t;
    var a = new gw(), o = n.renderer || "canvas";
    ps[o] || (o = mt(ps)[0]), n.useDirtyRect = n.useDirtyRect == null ? !1 : n.useDirtyRect;
    var s = new ps[o](r, a, n, t), l = n.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !X.node && !X.worker && !l ? new Gw(s.getViewportRoot(), s.root) : null, h = n.useCoarsePointer, c = h == null || h === "auto" ? X.touchEventsSupported : !!h, f = 44, v;
    c && (v = tt(n.pointerSize, f)), this.handler = new My(a, s, u, s.root, v), this.animation = new kw({
      stage: {
        update: l ? null : function() {
          return i._flush(!0);
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = Jw(t));
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
    var r, n = di();
    this._needsRefresh && (r = !0, this.refreshImmediately(t)), this._needsRefreshHover && (r = !0, this.refreshHoverImmediately());
    var i = di();
    r ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: i - n
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
  }, e.prototype.on = function(t, r, n) {
    return this._disposed || this.handler.on(t, r, n), this;
  }, e.prototype.off = function(t, r) {
    this._disposed || this.handler.off(t, r);
  }, e.prototype.trigger = function(t, r) {
    this._disposed || this.handler.trigger(t, r);
  }, e.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), r = 0; r < t.length; r++)
        t[r] instanceof Mt && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Qw(this.id));
  }, e;
}();
function Av(e, t) {
  var r = new tS(_y(), e, t);
  return Fy[r.id] = r, r;
}
function eS(e, t) {
  ps[e] = t;
}
var Iv = 1e-4, Hy = 20;
function rS(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function vr(e, t, r, n) {
  var i = t[0], a = t[1], o = r[0], s = r[1], l = a - i, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (n)
    if (l > 0) {
      if (e <= i)
        return o;
      if (e >= a)
        return s;
    } else {
      if (e >= i)
        return o;
      if (e <= a)
        return s;
    }
  else {
    if (e === i)
      return o;
    if (e === a)
      return s;
  }
  return (e - i) / l * u + o;
}
function Ut(e, t) {
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
  return H(e) ? rS(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : e == null ? NaN : +e;
}
function Dt(e, t, r) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Hy), e = (+e).toFixed(t), r ? e : +e;
}
function Vy(e) {
  return e.sort(function(t, r) {
    return t - r;
  }), e;
}
function sr(e) {
  if (e = +e, isNaN(e))
    return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (Math.round(e * t) / t === e)
        return r;
  }
  return nS(e);
}
function nS(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), n = r > 0 ? +t.slice(r + 1) : 0, i = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : i - 1 - a;
  return Math.max(0, o - n);
}
function iS(e, t) {
  var r = Math.log, n = Math.LN10, i = Math.floor(r(e[1] - e[0]) / n), a = Math.round(r(Math.abs(t[1] - t[0])) / n), o = Math.min(Math.max(-i + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function aS(e, t) {
  var r = Math.max(sr(e), sr(t)), n = e + t;
  return r > Hy ? n : Dt(n, r);
}
function Gy(e) {
  var t = Math.PI * 2;
  return (e % t + t) % t;
}
function Fs(e) {
  return e > -Iv && e < Iv;
}
var oS = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function dr(e) {
  if (e instanceof Date)
    return e;
  if (H(e)) {
    var t = oS.exec(e);
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
function sS(e) {
  return Math.pow(10, Uc(e));
}
function Uc(e) {
  if (e === 0)
    return 0;
  var t = Math.floor(Math.log(e) / Math.LN10);
  return e / Math.pow(10, t) >= 10 && t++, t;
}
function Wy(e, t) {
  var r = Uc(e), n = Math.pow(10, r), i = e / n, a;
  return i < 1.5 ? a = 1 : i < 2.5 ? a = 2 : i < 4 ? a = 3 : i < 7 ? a = 5 : a = 10, e = a * n, r >= -20 ? +e.toFixed(r < 0 ? -r : 0) : e;
}
function Lv(e) {
  e.sort(function(l, u) {
    return s(l, u, 0) ? -1 : 1;
  });
  for (var t = -1 / 0, r = 1, n = 0; n < e.length; ) {
    for (var i = e[n].interval, a = e[n].close, o = 0; o < 2; o++)
      i[o] <= t && (i[o] = t, a[o] = o ? 1 : 1 - r), t = i[o], r = a[o];
    i[0] === i[1] && a[0] * a[1] !== 1 ? e.splice(n, 1) : n++;
  }
  return e;
  function s(l, u, h) {
    return l.interval[h] < u.interval[h] || l.interval[h] === u.interval[h] && (l.close[h] - u.close[h] === (h ? -1 : 1) || !h && s(l, u, 1));
  }
}
function Hs(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !H(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function lS(e) {
  return !isNaN(Hs(e));
}
function Uy() {
  return Math.round(Math.random() * 9);
}
function Yy(e, t) {
  return t === 0 ? e : Yy(t, e % t);
}
function $v(e, t) {
  return e == null ? t : t == null ? e : e * t / Yy(e, t);
}
function Jt(e) {
  throw new Error(e);
}
function Pv(e, t, r) {
  return (t - e) * r + e;
}
var Xy = "series\0", uS = "\0_ec_\0";
function kt(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function Rv(e, t, r) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var n = 0, i = r.length; n < i; n++) {
      var a = r[n];
      !e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var Ov = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function fo(e) {
  return V(e) && !z(e) && !(e instanceof Date) ? e.value : e;
}
function hS(e) {
  return V(e) && !(e instanceof Array);
}
function cS(e, t, r) {
  var n = r === "normalMerge", i = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = Q();
  C(t, function(l, u) {
    if (!V(l)) {
      t[u] = null;
      return;
    }
  });
  var s = fS(e, o, r);
  return (n || i) && vS(s, e, o, t), n && dS(s, t), n || i ? pS(s, t, i) : a && gS(s, t), yS(s), s;
}
function fS(e, t, r) {
  var n = [];
  if (r === "replaceAll")
    return n;
  for (var i = 0; i < e.length; i++) {
    var a = e[i];
    a && a.id != null && t.set(a.id, i), n.push({
      existing: r === "replaceMerge" || qa(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return n;
}
function vS(e, t, r, n) {
  C(n, function(i, a) {
    if (!(!i || i.id == null)) {
      var o = Ia(i.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        qe(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = i, l.existing = t[s], n[a] = null;
      }
    }
  });
}
function dS(e, t) {
  C(t, function(r, n) {
    if (!(!r || r.name == null))
      for (var i = 0; i < e.length; i++) {
        var a = e[i].existing;
        if (!e[i].newOption && a && (a.id == null || r.id == null) && !qa(r) && !qa(a) && qy("name", a, r)) {
          e[i].newOption = r, t[n] = null;
          return;
        }
      }
  });
}
function pS(e, t, r) {
  C(t, function(n) {
    if (n) {
      for (
        var i, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (i = e[a]) && (i.newOption || qa(i.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        i.existing && n.id != null && !qy("id", n, i.existing));
      )
        a++;
      i ? (i.newOption = n, i.brandNew = r) : e.push({
        newOption: n,
        brandNew: r,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function gS(e, t) {
  C(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function yS(e) {
  var t = Q();
  C(e, function(r) {
    var n = r.existing;
    n && t.set(n.id, r);
  }), C(e, function(r) {
    var n = r.newOption;
    qe(!n || n.id == null || !t.get(n.id) || t.get(n.id) === r, "id duplicates: " + (n && n.id)), n && n.id != null && t.set(n.id, r), !r.keyInfo && (r.keyInfo = {});
  }), C(e, function(r, n) {
    var i = r.existing, a = r.newOption, o = r.keyInfo;
    if (V(a)) {
      if (o.name = a.name != null ? Ia(a.name) : i ? i.name : Xy + n, i)
        o.id = Ia(i.id);
      else if (a.id != null)
        o.id = Ia(a.id);
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
function qy(e, t, r) {
  var n = Re(t[e], null), i = Re(r[e], null);
  return n != null && i != null && n === i;
}
function Ia(e) {
  return Re(e, "");
}
function Re(e, t) {
  return e == null ? t : H(e) ? e : _t(e) || yh(e) ? e + "" : t;
}
function Yc(e) {
  var t = e.name;
  return !!(t && t.indexOf(Xy));
}
function qa(e) {
  return e && e.id != null && Ia(e.id).indexOf(uS) === 0;
}
function mS(e, t, r) {
  C(e, function(n) {
    var i = n.newOption;
    V(i) && (n.keyInfo.mainType = t, n.keyInfo.subType = _S(t, i, n.existing, r));
  });
}
function _S(e, t, r, n) {
  var i = t.type ? t.type : r ? r.subType : n.determineSubType(e, t);
  return i;
}
function bS(e, t) {
  var r = {}, n = {};
  return i(e || [], r), i(t || [], n, r), [a(r), a(n)];
  function i(o, s, l) {
    for (var u = 0, h = o.length; u < h; u++) {
      var c = Re(o[u].seriesId, null);
      if (c == null)
        return;
      for (var f = kt(o[u].dataIndex), v = l && l[c], d = 0, g = f.length; d < g; d++) {
        var p = f[d];
        v && v[p] ? v[p] = null : (s[c] || (s[c] = {}))[p] = 1;
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
function En(e, t) {
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
function $t() {
  var e = "__ec_inner_" + wS++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var wS = Uy();
function vu(e, t, r) {
  var n = Xc(t, r), i = n.mainTypeSpecified, a = n.queryOptionMap, o = n.others, s = o, l = r ? r.defaultMainType : null;
  return !i && l && a.set(l, {}), a.each(function(u, h) {
    var c = vo(e, h, u, {
      useDefault: l === h,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[h + "Models"] = c.models, s[h + "Model"] = c.models[0];
  }), s;
}
function Xc(e, t) {
  var r;
  if (H(e)) {
    var n = {};
    n[e + "Index"] = 0, r = n;
  } else
    r = e;
  var i = Q(), a = {}, o = !1;
  return C(r, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], h = u[1], c = (u[2] || "").toLowerCase();
    if (!(!h || !c || t && t.includeMainTypes && pt(t.includeMainTypes, h) < 0)) {
      o = o || !!h;
      var f = i.get(h) || i.set(h, {});
      f[c] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: i,
    others: a
  };
}
var $e = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function vo(e, t, r, n) {
  n = n || $e;
  var i = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: i != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = n.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  return i === "none" || i === !1 ? (qe(n.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (i === "all" && (qe(n.enableAll, '`"all"` is not a valid value on index option.'), i = a = o = null), s.models = e.queryComponents({
    mainType: t,
    index: i,
    id: a,
    name: o
  }), s);
}
function Zy(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function SS(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function xS(e) {
  return e === "auto" ? X.domSupported ? "html" : "richText" : e || "html";
}
function TS(e, t, r, n, i) {
  var a = t == null || t === "auto";
  if (n == null)
    return n;
  if (_t(n)) {
    var o = Pv(r || 0, n, i);
    return Dt(o, a ? Math.max(sr(r || 0), sr(n)) : t);
  } else {
    if (H(n))
      return i < 1 ? r : n;
    for (var s = [], l = r, u = n, h = Math.max(l ? l.length : 0, u.length), c = 0; c < h; ++c) {
      var f = e.getDimensionInfo(c);
      if (f && f.type === "ordinal")
        s[c] = (i < 1 && l ? l : u)[c];
      else {
        var v = l && l[c] ? l[c] : 0, d = u[c], o = Pv(v, d, i);
        s[c] = Dt(o, a ? Math.max(sr(v), sr(d)) : t);
      }
    }
    return s;
  }
}
var CS = ".", nn = "___EC__COMPONENT__CONTAINER___", Ky = "___EC__EXTENDED_CLASS___";
function Ye(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(CS);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function MS(e) {
  qe(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function DS(e) {
  return !!(e && e[Ky]);
}
function qc(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var n = this, i;
    return AS(n) ? i = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(n) : (i = function() {
      (r.$constructor || n).apply(this, arguments);
    }, $1(i, this)), N(i.prototype, r), i[Ky] = !0, i.extend = this.extend, i.superCall = $S, i.superApply = PS, i.superClass = n, i;
  };
}
function AS(e) {
  return Z(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function jy(e, t) {
  e.extend = t.extend;
}
var IS = Math.round(Math.random() * 10);
function LS(e) {
  var t = ["__\0is_clz", IS++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function $S(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return this.superClass.prototype[t].apply(e, r);
}
function PS(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function cl(e) {
  var t = {};
  e.registerClass = function(n) {
    var i = n.type || n.prototype.type;
    if (i) {
      MS(i), n.prototype.type = i;
      var a = Ye(i);
      if (!a.sub)
        t[a.main] = n;
      else if (a.sub !== nn) {
        var o = r(a);
        o[a.sub] = n;
      }
    }
    return n;
  }, e.getClass = function(n, i, a) {
    var o = t[n];
    if (o && o[nn] && (o = i ? o[i] : null), a && !o)
      throw new Error(i ? "Component " + n + "." + (i || "") + " is used but not imported." : n + ".type should be specified.");
    return o;
  }, e.getClassesByMainType = function(n) {
    var i = Ye(n), a = [], o = t[i.main];
    return o && o[nn] ? C(o, function(s, l) {
      l !== nn && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(n) {
    var i = Ye(n);
    return !!t[i.main];
  }, e.getAllClassMainTypes = function() {
    var n = [];
    return C(t, function(i, a) {
      n.push(a);
    }), n;
  }, e.hasSubTypes = function(n) {
    var i = Ye(n), a = t[i.main];
    return a && a[nn];
  };
  function r(n) {
    var i = t[n.main];
    return (!i || !i[nn]) && (i = t[n.main] = {}, i[nn] = !0), i;
  }
}
function Za(e, t) {
  for (var r = 0; r < e.length; r++)
    e[r][1] || (e[r][1] = e[r][0]);
  return t = t || !1, function(n, i, a) {
    for (var o = {}, s = 0; s < e.length; s++) {
      var l = e[s][1];
      if (!(i && pt(i, l) >= 0 || a && pt(a, l) < 0)) {
        var u = n.getShallow(l, t);
        u != null && (o[e[s][0]] = u);
      }
    }
    return o;
  };
}
var RS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], OS = Za(RS), ES = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return OS(this, t, r);
    }, e;
  }()
), Oh = new co(50);
function kS(e) {
  if (typeof e == "string") {
    var t = Oh.get(e);
    return t && t.image;
  } else
    return e;
}
function Qy(e, t, r, n, i) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = Oh.get(e), o = { hostEl: r, cb: n, cbPayload: i };
      return a ? (t = a.image, !fl(t) && a.pending.push(o)) : (t = Gr.loadImage(e, Ev, Ev), t.__zrImageSrc = e, Oh.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function Ev() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], n = r.cb;
    n && n(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function fl(e) {
  return e && e.width && e.height;
}
var du = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function NS(e, t, r, n, i, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Jy(r, n, i, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    tm(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function Jy(e, t, r, n) {
  n = n || {};
  var i = N({}, n);
  i.font = t, r = tt(r, "..."), i.maxIterations = tt(n.maxIterations, 2);
  var a = i.minChar = tt(n.minChar, 0);
  i.cnCharWidth = se("国", t);
  var o = i.ascCharWidth = se("a", t);
  i.placeholder = tt(n.placeholder, "");
  for (var s = e = Math.max(0, e - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = se(r, t);
  return u > s && (r = "", u = 0), s = e - u, i.ellipsis = r, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = e, i;
}
function tm(e, t, r) {
  var n = r.containerWidth, i = r.font, a = r.contentWidth;
  if (!n) {
    e.textLine = "", e.isTruncated = !1;
    return;
  }
  var o = se(t, i);
  if (o <= n) {
    e.textLine = t, e.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= r.maxIterations) {
      t += r.ellipsis;
      break;
    }
    var l = s === 0 ? BS(t, a, r.ascCharWidth, r.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = se(t, i);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function BS(e, t, r, n) {
  for (var i = 0, a = 0, o = e.length; a < o && i < t; a++) {
    var s = e.charCodeAt(a);
    i += 0 <= s && s <= 127 ? r : n;
  }
  return a;
}
function zS(e, t) {
  e != null && (e += "");
  var r = t.overflow, n = t.padding, i = t.font, a = r === "truncate", o = Wc(i), s = tt(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, c = t.width, f;
  c != null && (r === "break" || r === "breakAll") ? f = e ? em(e, t.font, c, r === "breakAll", 0).lines : [] : f = e ? e.split(`
`) : [];
  var v = f.length * s, d = tt(t.height, v);
  if (v > d && u) {
    var g = Math.floor(d / s);
    h = h || f.length > g, f = f.slice(0, g);
  }
  if (e && a && c != null)
    for (var p = Jy(c, i, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < f.length; m++)
      tm(y, f[m], p), f[m] = y.textLine, h = h || y.isTruncated;
  for (var _ = d, b = 0, m = 0; m < f.length; m++)
    b = Math.max(se(f[m], i), b);
  c == null && (c = b);
  var S = b;
  return n && (_ += n[0] + n[2], S += n[1] + n[3], c += n[1] + n[3]), l && (S = c), {
    lines: f,
    height: d,
    outerWidth: S,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: b,
    contentHeight: v,
    width: c,
    isTruncated: h
  };
}
var FS = /* @__PURE__ */ function() {
  function e() {
  }
  return e;
}(), kv = /* @__PURE__ */ function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
}(), HS = /* @__PURE__ */ function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
}();
function VS(e, t) {
  var r = new HS();
  if (e != null && (e += ""), !e)
    return r;
  for (var n = t.width, i = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && n != null ? { width: n, accumWidth: 0, breakAll: a === "breakAll" } : null, s = du.lastIndex = 0, l; (l = du.exec(e)) != null; ) {
    var u = l.index;
    u > s && pu(r, e.substring(s, u), t, o), pu(r, l[2], t, o, l[1]), s = du.lastIndex;
  }
  s < e.length && pu(r, e.substring(s, e.length), t, o);
  var h = [], c = 0, f = 0, v = t.padding, d = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function y(W, j, rt) {
    W.width = j, W.lineHeight = rt, c += rt, f = Math.max(f, j);
  }
  t: for (var m = 0; m < r.lines.length; m++) {
    for (var _ = r.lines[m], b = 0, S = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], M = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = M.padding, A = D ? D[1] + D[3] : 0, T = x.font = M.font || t.font;
      x.contentHeight = Wc(T);
      var L = tt(M.height, x.contentHeight);
      if (x.innerHeight = L, D && (L += D[0] + D[2]), x.height = L, x.lineHeight = us(M.lineHeight, t.lineHeight, L), x.align = M && M.align || t.align, x.verticalAlign = M && M.verticalAlign || "middle", g && i != null && c + x.lineHeight > i) {
        var $ = r.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, S, b), r.lines = r.lines.slice(0, m + 1)) : r.lines = r.lines.slice(0, m), r.isTruncated = r.isTruncated || r.lines.length < $;
        break t;
      }
      var P = M.width, R = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, h.push(x), x.contentWidth = se(x.text, T);
      else {
        if (R) {
          var O = M.backgroundColor, G = O && O.image;
          G && (G = kS(G), fl(G) && (x.width = Math.max(x.width, G.width * L / G.height)));
        }
        var k = d && n != null ? n - S : null;
        k != null && k < x.width ? !R || k < A ? (x.text = "", x.width = x.contentWidth = 0) : (NS(p, x.text, k - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, r.isTruncated = r.isTruncated || p.isTruncated, x.width = x.contentWidth = se(x.text, T)) : x.contentWidth = se(x.text, T);
      }
      x.width += A, S += x.width, M && (b = Math.max(b, x.lineHeight));
    }
    y(_, S, b);
  }
  r.outerWidth = r.width = tt(n, f), r.outerHeight = r.height = tt(i, c), r.contentHeight = c, r.contentWidth = f, v && (r.outerWidth += v[1] + v[3], r.outerHeight += v[0] + v[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * r.width;
  }
  return r;
}
function pu(e, t, r, n, i) {
  var a = t === "", o = i && r.rich[i] || {}, s = e.lines, l = o.font || r.font, u = !1, h, c;
  if (n) {
    var f = o.padding, v = f ? f[1] + f[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = Ze(o.width, n.width) + v;
      s.length > 0 && d + n.accumWidth > n.width && (h = t.split(`
`), u = !0), n.accumWidth = d;
    } else {
      var g = em(t, l, n.width, n.breakAll, n.accumWidth);
      n.accumWidth = g.accumWidth + v, c = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var y = h[p], m = new FS();
    if (m.styleName = i, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = c ? c[p] : se(y, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new kv())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new kv([m]));
  }
}
function GS(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var WS = zi(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function US(e) {
  return GS(e) ? !!WS[e] : !0;
}
function em(e, t, r, n, i) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, c = 0; c < e.length; c++) {
    var f = e.charAt(c);
    if (f === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var v = se(f, t), d = n ? !1 : !US(f);
    if (a.length ? h + v > r : i + h + v > r) {
      h ? (s || l) && (d ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += f, u += v, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = f, h = v)) : d ? (a.push(l), o.push(u), l = f, u = v) : (a.push(f), o.push(v));
      continue;
    }
    h += v, d ? (l += f, u += v) : (l && (s += l, l = "", u = 0), s += f);
  }
  return !a.length && !s && (s = e, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += i), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var Eh = "__zr_style_" + Math.round(Math.random() * 10), An = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, vl = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
An[Eh] = !0;
var Nv = ["z", "z2", "invisible"], YS = ["invisible"], po = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype._init = function(r) {
    for (var n = mt(r), i = 0; i < n.length; i++) {
      var a = n[i];
      a === "style" ? this.useStyle(r[a]) : e.prototype.attrKV.call(this, a, r[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(r, n, i, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && XS(this, r, n) || o && !o[0] && !o[3])
      return !1;
    if (i && this.__clipPaths) {
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
  }, t.prototype.contain = function(r, n) {
    return this.rectContain(r, n);
  }, t.prototype.traverse = function(r, n) {
    r.call(n, this);
  }, t.prototype.rectContain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect();
    return a.contain(i[0], i[1]);
  }, t.prototype.getPaintRect = function() {
    var r = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var n = this.transform, i = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      r = this._paintRect || (this._paintRect = new ut(0, 0, 0, 0)), n ? ut.applyTransform(r, i, n) : r.copy(i), (o || s || l) && (r.width += o * 2 + Math.abs(s), r.height += o * 2 + Math.abs(l), r.x = Math.min(r.x, r.x + s - o), r.y = Math.min(r.y, r.y + l - o));
      var u = this.dirtyRectTolerance;
      r.isZero() || (r.x = Math.floor(r.x - u), r.y = Math.floor(r.y - u), r.width = Math.ceil(r.width + 1 + u * 2), r.height = Math.ceil(r.height + 1 + u * 2));
    }
    return r;
  }, t.prototype.setPrevPaintRect = function(r) {
    r ? (this._prevPaintRect = this._prevPaintRect || new ut(0, 0, 0, 0), this._prevPaintRect.copy(r)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(r) {
    return this.animate("style", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(r, n) {
    r !== "style" ? e.prototype.attrKV.call(this, r, n) : this.style ? this.setStyle(n) : this.useStyle(n);
  }, t.prototype.setStyle = function(r, n) {
    return typeof r == "string" ? this.style[r] = n : N(this.style, r), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(r) {
    r || this.markRedraw(), this.__dirty |= _a, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & _a);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~_a;
  }, t.prototype.createStyle = function(r) {
    return ul(An, r);
  }, t.prototype.useStyle = function(r) {
    r[Eh] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(r) {
    return r[Eh];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var n = this._normalState;
    r.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, n, Nv);
  }, t.prototype._applyStateObj = function(r, n, i, a, o, s) {
    e.prototype._applyStateObj.call(this, r, n, i, a, o, s);
    var l = !(n && a), u;
    if (n && n.style ? o ? a ? u = n.style : (u = this._mergeStyle(this.createStyle(), i.style), this._mergeStyle(u, n.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : i.style), this._mergeStyle(u, n.style)) : l && (u = i.style), u)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var c = mt(h), f = 0; f < c.length; f++) {
            var v = c[f];
            v in u && (u[v] = u[v], this.style[v] = h[v]);
          }
        for (var d = mt(u), f = 0; f < d.length; f++) {
          var v = d[f];
          this.style[v] = this.style[v];
        }
        this._transitionState(r, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? YS : Nv, f = 0; f < g.length; f++) {
      var v = g[f];
      n && n[v] != null ? this[v] = n[v] : l && i[v] != null && (this[v] = i[v]);
    }
  }, t.prototype._mergeStates = function(r) {
    for (var n = e.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
      var o = r[a];
      o.style && (i = i || {}, this._mergeStyle(i, o.style));
    }
    return i && (n.style = i), n;
  }, t.prototype._mergeStyle = function(r, n) {
    return N(r, n), r;
  }, t.prototype.getAnimationStyleProps = function() {
    return vl;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = oe | _a;
  }(), t;
}(hl), gu = new ut(0, 0, 0, 0), yu = new ut(0, 0, 0, 0);
function XS(e, t, r) {
  return gu.copy(e.getBoundingRect()), e.transform && gu.applyTransform(e.transform), yu.width = t, yu.height = r, !gu.intersect(yu);
}
var ye = Math.min, me = Math.max, mu = Math.sin, _u = Math.cos, an = Math.PI * 2, Io = Fi(), Lo = Fi(), $o = Fi();
function Bv(e, t, r, n, i, a) {
  i[0] = ye(e, r), i[1] = ye(t, n), a[0] = me(e, r), a[1] = me(t, n);
}
var zv = [], Fv = [];
function qS(e, t, r, n, i, a, o, s, l, u) {
  var h = $y, c = Et, f = h(e, r, i, o, zv);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var v = 0; v < f; v++) {
    var d = c(e, r, i, o, zv[v]);
    l[0] = ye(d, l[0]), u[0] = me(d, u[0]);
  }
  f = h(t, n, a, s, Fv);
  for (var v = 0; v < f; v++) {
    var g = c(t, n, a, s, Fv[v]);
    l[1] = ye(g, l[1]), u[1] = me(g, u[1]);
  }
  l[0] = ye(e, l[0]), u[0] = me(e, u[0]), l[0] = ye(o, l[0]), u[0] = me(o, u[0]), l[1] = ye(t, l[1]), u[1] = me(t, u[1]), l[1] = ye(s, l[1]), u[1] = me(s, u[1]);
}
function ZS(e, t, r, n, i, a, o, s) {
  var l = Py, u = Qt, h = me(ye(l(e, r, i), 1), 0), c = me(ye(l(t, n, a), 1), 0), f = u(e, r, i, h), v = u(t, n, a, c);
  o[0] = ye(e, i, f), o[1] = ye(t, a, v), s[0] = me(e, i, f), s[1] = me(t, a, v);
}
function KS(e, t, r, n, i, a, o, s, l) {
  var u = fi, h = vi, c = Math.abs(i - a);
  if (c % an < 1e-4 && c > 1e-4) {
    s[0] = e - r, s[1] = t - n, l[0] = e + r, l[1] = t + n;
    return;
  }
  if (Io[0] = _u(i) * r + e, Io[1] = mu(i) * n + t, Lo[0] = _u(a) * r + e, Lo[1] = mu(a) * n + t, u(s, Io, Lo), h(l, Io, Lo), i = i % an, i < 0 && (i = i + an), a = a % an, a < 0 && (a = a + an), i > a && !o ? a += an : i < a && o && (i += an), o) {
    var f = a;
    a = i, i = f;
  }
  for (var v = 0; v < a; v += Math.PI / 2)
    v > i && ($o[0] = _u(v) * r + e, $o[1] = mu(v) * n + t, u(s, $o, s), h(l, $o, l));
}
var lt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, on = [], sn = [], ze = [], Cr = [], Fe = [], He = [], bu = Math.min, wu = Math.max, ln = Math.cos, un = Math.sin, ir = Math.abs, kh = Math.PI, Or = kh * 2, Su = typeof Float32Array < "u", ea = [];
function xu(e) {
  var t = Math.round(e / kh * 1e8) / 1e8;
  return t % 2 * kh;
}
function jS(e, t) {
  var r = xu(e[0]);
  r < 0 && (r += Or);
  var n = r - e[0], i = e[1];
  i += n, !t && i - r >= Or ? i = r + Or : t && r - i >= Or ? i = r - Or : !t && r > i ? i = r + (Or - xu(r - i)) : t && r < i && (i = r - (Or - xu(i - r))), e[0] = r, e[1] = i;
}
var kn = function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, n) {
    n = n || 0, n > 0 && (this._ux = ir(n / Bs / t) || 0, this._uy = ir(n / Bs / r) || 0);
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
    return this._drawPendingPt(), this.addData(lt.M, t, r), this._ctx && this._ctx.moveTo(t, r), this._x0 = t, this._y0 = r, this._xi = t, this._yi = r, this;
  }, e.prototype.lineTo = function(t, r) {
    var n = ir(t - this._xi), i = ir(r - this._yi), a = n > this._ux || i > this._uy;
    if (this.addData(lt.L, t, r), this._ctx && a && this._ctx.lineTo(t, r), a)
      this._xi = t, this._yi = r, this._pendingPtDist = 0;
    else {
      var o = n * n + i * i;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = r, this._pendingPtDist = o);
    }
    return this;
  }, e.prototype.bezierCurveTo = function(t, r, n, i, a, o) {
    return this._drawPendingPt(), this.addData(lt.C, t, r, n, i, a, o), this._ctx && this._ctx.bezierCurveTo(t, r, n, i, a, o), this._xi = a, this._yi = o, this;
  }, e.prototype.quadraticCurveTo = function(t, r, n, i) {
    return this._drawPendingPt(), this.addData(lt.Q, t, r, n, i), this._ctx && this._ctx.quadraticCurveTo(t, r, n, i), this._xi = n, this._yi = i, this;
  }, e.prototype.arc = function(t, r, n, i, a, o) {
    this._drawPendingPt(), ea[0] = i, ea[1] = a, jS(ea, o), i = ea[0], a = ea[1];
    var s = a - i;
    return this.addData(lt.A, t, r, n, n, i, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, n, i, a, o), this._xi = ln(a) * n + t, this._yi = un(a) * n + r, this;
  }, e.prototype.arcTo = function(t, r, n, i, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, r, n, i, a), this;
  }, e.prototype.rect = function(t, r, n, i) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, r, n, i), this.addData(lt.R, t, r, n, i), this;
  }, e.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(lt.Z);
    var t = this._ctx, r = this._x0, n = this._y0;
    return t && t.closePath(), this._xi = r, this._yi = n, this;
  }, e.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, e.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, e.prototype.len = function() {
    return this._len;
  }, e.prototype.setData = function(t) {
    var r = t.length;
    !(this.data && this.data.length === r) && Su && (this.data = new Float32Array(r));
    for (var n = 0; n < r; n++)
      this.data[n] = t[n];
    this._len = r;
  }, e.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var r = t.length, n = 0, i = this._len, a = 0; a < r; a++)
      n += t[a].len();
    Su && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
    for (var a = 0; a < r; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[i++] = o[s];
    this._len = i;
  }, e.prototype.addData = function(t, r, n, i, a, o, s, l, u) {
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
      t instanceof Array && (t.length = this._len, Su && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, e.prototype.getBoundingRect = function() {
    ze[0] = ze[1] = Fe[0] = Fe[1] = Number.MAX_VALUE, Cr[0] = Cr[1] = He[0] = He[1] = -Number.MAX_VALUE;
    var t = this.data, r = 0, n = 0, i = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (r = t[o], n = t[o + 1], i = r, a = n), s) {
        case lt.M:
          r = i = t[o++], n = a = t[o++], Fe[0] = i, Fe[1] = a, He[0] = i, He[1] = a;
          break;
        case lt.L:
          Bv(r, n, t[o], t[o + 1], Fe, He), r = t[o++], n = t[o++];
          break;
        case lt.C:
          qS(r, n, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Fe, He), r = t[o++], n = t[o++];
          break;
        case lt.Q:
          ZS(r, n, t[o++], t[o++], t[o], t[o + 1], Fe, He), r = t[o++], n = t[o++];
          break;
        case lt.A:
          var u = t[o++], h = t[o++], c = t[o++], f = t[o++], v = t[o++], d = t[o++] + v;
          o += 1;
          var g = !t[o++];
          l && (i = ln(v) * c + u, a = un(v) * f + h), KS(u, h, c, f, v, d, g, Fe, He), r = ln(d) * c + u, n = un(d) * f + h;
          break;
        case lt.R:
          i = r = t[o++], a = n = t[o++];
          var p = t[o++], y = t[o++];
          Bv(i, a, i + p, a + y, Fe, He);
          break;
        case lt.Z:
          r = i, n = a;
          break;
      }
      fi(ze, ze, Fe), vi(Cr, Cr, He);
    }
    return o === 0 && (ze[0] = ze[1] = Cr[0] = Cr[1] = 0), new ut(ze[0], ze[1], Cr[0] - ze[0], Cr[1] - ze[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, n = this._ux, i = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, c = 0, f = 0; f < r; ) {
      var v = t[f++], d = f === 1;
      d && (a = t[f], o = t[f + 1], s = a, l = o);
      var g = -1;
      switch (v) {
        case lt.M:
          a = s = t[f++], o = l = t[f++];
          break;
        case lt.L: {
          var p = t[f++], y = t[f++], m = p - a, _ = y - o;
          (ir(m) > n || ir(_) > i || f === r - 1) && (g = Math.sqrt(m * m + _ * _), a = p, o = y);
          break;
        }
        case lt.C: {
          var b = t[f++], S = t[f++], p = t[f++], y = t[f++], w = t[f++], x = t[f++];
          g = mw(a, o, b, S, p, y, w, x, 10), a = w, o = x;
          break;
        }
        case lt.Q: {
          var b = t[f++], S = t[f++], p = t[f++], y = t[f++];
          g = ww(a, o, b, S, p, y, 10), a = p, o = y;
          break;
        }
        case lt.A:
          var M = t[f++], D = t[f++], A = t[f++], T = t[f++], L = t[f++], $ = t[f++], P = $ + L;
          f += 1, d && (s = ln(L) * A + M, l = un(L) * T + D), g = wu(A, T) * bu(Or, Math.abs($)), a = ln(P) * A + M, o = un(P) * T + D;
          break;
        case lt.R: {
          s = a = t[f++], l = o = t[f++];
          var R = t[f++], O = t[f++];
          g = R * 2 + O * 2;
          break;
        }
        case lt.Z: {
          var m = s - a, _ = l - o;
          g = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      g >= 0 && (u[c++] = g, h += g);
    }
    return this._pathLen = h, h;
  }, e.prototype.rebuildPath = function(t, r) {
    var n = this.data, i = this._ux, a = this._uy, o = this._len, s, l, u, h, c, f, v = r < 1, d, g, p = 0, y = 0, m, _ = 0, b, S;
    if (!(v && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, g = this._pathLen, m = r * g, !m)))
      t: for (var w = 0; w < o; ) {
        var x = n[w++], M = w === 1;
        switch (M && (u = n[w], h = n[w + 1], s = u, l = h), x !== lt.L && _ > 0 && (t.lineTo(b, S), _ = 0), x) {
          case lt.M:
            s = u = n[w++], l = h = n[w++], t.moveTo(u, h);
            break;
          case lt.L: {
            c = n[w++], f = n[w++];
            var D = ir(c - u), A = ir(f - h);
            if (D > i || A > a) {
              if (v) {
                var T = d[y++];
                if (p + T > m) {
                  var L = (m - p) / T;
                  t.lineTo(u * (1 - L) + c * L, h * (1 - L) + f * L);
                  break t;
                }
                p += T;
              }
              t.lineTo(c, f), u = c, h = f, _ = 0;
            } else {
              var $ = D * D + A * A;
              $ > _ && (b = c, S = f, _ = $);
            }
            break;
          }
          case lt.C: {
            var P = n[w++], R = n[w++], O = n[w++], G = n[w++], k = n[w++], F = n[w++];
            if (v) {
              var T = d[y++];
              if (p + T > m) {
                var L = (m - p) / T;
                Es(u, P, O, k, L, on), Es(h, R, G, F, L, sn), t.bezierCurveTo(on[1], sn[1], on[2], sn[2], on[3], sn[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo(P, R, O, G, k, F), u = k, h = F;
            break;
          }
          case lt.Q: {
            var P = n[w++], R = n[w++], O = n[w++], G = n[w++];
            if (v) {
              var T = d[y++];
              if (p + T > m) {
                var L = (m - p) / T;
                ks(u, P, O, L, on), ks(h, R, G, L, sn), t.quadraticCurveTo(on[1], sn[1], on[2], sn[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo(P, R, O, G), u = O, h = G;
            break;
          }
          case lt.A:
            var W = n[w++], j = n[w++], rt = n[w++], dt = n[w++], wt = n[w++], xt = n[w++], Ce = n[w++], qr = !n[w++], Wn = rt > dt ? rt : dt, ie = ir(rt - dt) > 1e-3, Rt = wt + xt, K = !1;
            if (v) {
              var T = d[y++];
              p + T > m && (Rt = wt + xt * (m - p) / T, K = !0), p += T;
            }
            if (ie && t.ellipse ? t.ellipse(W, j, rt, dt, Ce, wt, Rt, qr) : t.arc(W, j, Wn, wt, Rt, qr), K)
              break t;
            M && (s = ln(wt) * rt + W, l = un(wt) * dt + j), u = ln(Rt) * rt + W, h = un(Rt) * dt + j;
            break;
          case lt.R:
            s = u = n[w], l = h = n[w + 1], c = n[w++], f = n[w++];
            var nt = n[w++], Zr = n[w++];
            if (v) {
              var T = d[y++];
              if (p + T > m) {
                var Gt = m - p;
                t.moveTo(c, f), t.lineTo(c + bu(Gt, nt), f), Gt -= nt, Gt > 0 && t.lineTo(c + nt, f + bu(Gt, Zr)), Gt -= Zr, Gt > 0 && t.lineTo(c + wu(nt - Gt, 0), f + Zr), Gt -= nt, Gt > 0 && t.lineTo(c, f + wu(Zr - Gt, 0));
                break t;
              }
              p += T;
            }
            t.rect(c, f, nt, Zr);
            break;
          case lt.Z:
            if (v) {
              var T = d[y++];
              if (p + T > m) {
                var L = (m - p) / T;
                t.lineTo(u * (1 - L) + s * L, h * (1 - L) + l * L);
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
  }, e.CMD = lt, e.initDefaultProps = function() {
    var t = e.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), e;
}();
function Zn(e, t, r, n, i, a, o) {
  if (i === 0)
    return !1;
  var s = i, l = 0, u = e;
  if (o > t + s && o > n + s || o < t - s && o < n - s || a > e + s && a > r + s || a < e - s && a < r - s)
    return !1;
  if (e !== r)
    l = (t - n) / (e - r), u = (e * n - r * t) / (e - r);
  else
    return Math.abs(a - e) <= s / 2;
  var h = l * a - o + u, c = h * h / (l * l + 1);
  return c <= s / 2 * s / 2;
}
function QS(e, t, r, n, i, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var c = l;
  if (h > t + c && h > n + c && h > a + c && h > s + c || h < t - c && h < n - c && h < a - c && h < s - c || u > e + c && u > r + c && u > i + c && u > o + c || u < e - c && u < r - c && u < i - c && u < o - c)
    return !1;
  var f = yw(e, t, r, n, i, a, o, s, u, h);
  return f <= c / 2;
}
function JS(e, t, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > n + u && l > a + u || l < t - u && l < n - u && l < a - u || s > e + u && s > r + u && s > i + u || s < e - u && s < r - u && s < i - u)
    return !1;
  var h = bw(e, t, r, n, i, a, s, l);
  return h <= u / 2;
}
var Hv = Math.PI * 2;
function Po(e) {
  return e %= Hv, e < 0 && (e += Hv), e;
}
var ra = Math.PI * 2;
function tx(e, t, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= e, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > r || h + u < r)
    return !1;
  if (Math.abs(n - i) % ra < 1e-4)
    return !0;
  if (a) {
    var c = n;
    n = Po(i), i = Po(c);
  } else
    n = Po(n), i = Po(i);
  n > i && (i += ra);
  var f = Math.atan2(l, s);
  return f < 0 && (f += ra), f >= n && f <= i || f + ra >= n && f + ra <= i;
}
function hn(e, t, r, n, i, a) {
  if (a > t && a > n || a < t && a < n || n === t)
    return 0;
  var o = (a - t) / (n - t), s = n < t ? 1 : -1;
  (o === 1 || o === 0) && (s = n < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === i ? 1 / 0 : l > i ? s : 0;
}
var Mr = kn.CMD, cn = Math.PI * 2, ex = 1e-4;
function rx(e, t) {
  return Math.abs(e - t) < ex;
}
var Wt = [-1, -1, -1], pe = [-1, -1];
function nx() {
  var e = pe[0];
  pe[0] = pe[1], pe[1] = e;
}
function ix(e, t, r, n, i, a, o, s, l, u) {
  if (u > t && u > n && u > a && u > s || u < t && u < n && u < a && u < s)
    return 0;
  var h = Os(t, n, a, s, u, Wt);
  if (h === 0)
    return 0;
  for (var c = 0, f = -1, v = void 0, d = void 0, g = 0; g < h; g++) {
    var p = Wt[g], y = p === 0 || p === 1 ? 0.5 : 1, m = Et(e, r, i, o, p);
    m < l || (f < 0 && (f = $y(t, n, a, s, pe), pe[1] < pe[0] && f > 1 && nx(), v = Et(t, n, a, s, pe[0]), f > 1 && (d = Et(t, n, a, s, pe[1]))), f === 2 ? p < pe[0] ? c += v < t ? y : -y : p < pe[1] ? c += d < v ? y : -y : c += s < d ? y : -y : p < pe[0] ? c += v < t ? y : -y : c += s < v ? y : -y);
  }
  return c;
}
function ax(e, t, r, n, i, a, o, s) {
  if (s > t && s > n && s > a || s < t && s < n && s < a)
    return 0;
  var l = _w(t, n, a, s, Wt);
  if (l === 0)
    return 0;
  var u = Py(t, n, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, c = Qt(t, n, a, u), f = 0; f < l; f++) {
      var v = Wt[f] === 0 || Wt[f] === 1 ? 0.5 : 1, d = Qt(e, r, i, Wt[f]);
      d < o || (Wt[f] < u ? h += c < t ? v : -v : h += a < c ? v : -v);
    }
    return h;
  } else {
    var v = Wt[0] === 0 || Wt[0] === 1 ? 0.5 : 1, d = Qt(e, r, i, Wt[0]);
    return d < o ? 0 : a < t ? v : -v;
  }
}
function ox(e, t, r, n, i, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Wt[0] = -l, Wt[1] = l;
  var u = Math.abs(n - i);
  if (u < 1e-4)
    return 0;
  if (u >= cn - 1e-4) {
    n = 0, i = cn;
    var h = a ? 1 : -1;
    return o >= Wt[0] + e && o <= Wt[1] + e ? h : 0;
  }
  if (n > i) {
    var c = n;
    n = i, i = c;
  }
  n < 0 && (n += cn, i += cn);
  for (var f = 0, v = 0; v < 2; v++) {
    var d = Wt[v];
    if (d + e > o) {
      var g = Math.atan2(s, d), h = a ? 1 : -1;
      g < 0 && (g = cn + g), (g >= n && g <= i || g + cn >= n && g + cn <= i) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), f += h);
    }
  }
  return f;
}
function rm(e, t, r, n, i) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, h = 0, c = 0, f, v, d = 0; d < o; ) {
    var g = a[d++], p = d === 1;
    switch (g === Mr.M && d > 1 && (r || (s += hn(l, u, h, c, n, i))), p && (l = a[d], u = a[d + 1], h = l, c = u), g) {
      case Mr.M:
        h = a[d++], c = a[d++], l = h, u = c;
        break;
      case Mr.L:
        if (r) {
          if (Zn(l, u, a[d], a[d + 1], t, n, i))
            return !0;
        } else
          s += hn(l, u, a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.C:
        if (r) {
          if (QS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, n, i))
            return !0;
        } else
          s += ix(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.Q:
        if (r) {
          if (JS(l, u, a[d++], a[d++], a[d], a[d + 1], t, n, i))
            return !0;
        } else
          s += ax(l, u, a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        l = a[d++], u = a[d++];
        break;
      case Mr.A:
        var y = a[d++], m = a[d++], _ = a[d++], b = a[d++], S = a[d++], w = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        f = Math.cos(S) * _ + y, v = Math.sin(S) * b + m, p ? (h = f, c = v) : s += hn(l, u, f, v, n, i);
        var M = (n - y) * b / _ + y;
        if (r) {
          if (tx(y, m, b, S, S + w, x, t, M, i))
            return !0;
        } else
          s += ox(y, m, b, S, S + w, x, M, i);
        l = Math.cos(S + w) * _ + y, u = Math.sin(S + w) * b + m;
        break;
      case Mr.R:
        h = l = a[d++], c = u = a[d++];
        var D = a[d++], A = a[d++];
        if (f = h + D, v = c + A, r) {
          if (Zn(h, c, f, c, t, n, i) || Zn(f, c, f, v, t, n, i) || Zn(f, v, h, v, t, n, i) || Zn(h, v, h, c, t, n, i))
            return !0;
        } else
          s += hn(f, c, f, v, n, i), s += hn(h, v, h, c, n, i);
        break;
      case Mr.Z:
        if (r) {
          if (Zn(l, u, h, c, t, n, i))
            return !0;
        } else
          s += hn(l, u, h, c, n, i);
        l = h, u = c;
        break;
    }
  }
  return !r && !rx(u, c) && (s += hn(l, u, h, c, n, i) || 0), s !== 0;
}
function sx(e, t, r) {
  return rm(e, 0, !1, t, r);
}
function lx(e, t, r, n) {
  return rm(e, t, !0, r, n);
}
var nm = ht({
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
}, An), ux = {
  style: ht({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, vl.style)
}, Tu = Xa.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), vt = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.update = function() {
    var r = this;
    e.prototype.update.call(this);
    var n = this.style;
    if (n.decal) {
      var i = this._decalEl = this._decalEl || new t();
      i.buildPath === t.prototype.buildPath && (i.buildPath = function(l) {
        r.buildPath(l, r.shape);
      }), i.silent = !0;
      var a = i.style;
      for (var o in n)
        a[o] !== n[o] && (a[o] = n[o]);
      a.fill = n.fill ? n.decal : null, a.decal = null, a.shadowColor = null, n.strokeFirst && (a.stroke = null);
      for (var s = 0; s < Tu.length; ++s)
        i[Tu[s]] = this[Tu[s]];
      i.__dirty |= oe;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(r) {
    var n = mt(r);
    this.shape = this.getDefaultShape();
    var i = this.getDefaultStyle();
    i && this.useStyle(i);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = r[o];
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
        var n = Ns(r, 0);
        return n > 0.5 ? Ph : n > 0.2 ? Ww : Rh;
      } else if (r)
        return Rh;
    }
    return Ph;
  }, t.prototype.getInsideTextStroke = function(r) {
    var n = this.style.fill;
    if (H(n)) {
      var i = this.__zr, a = !!(i && i.isDarkMode()), o = Ns(r, 0) < $h;
      if (a === o)
        return n;
    }
  }, t.prototype.buildPath = function(r, n, i) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~ui;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new kn(!1);
  }, t.prototype.hasStroke = function() {
    var r = this.style, n = r.stroke;
    return !(n == null || n === "none" || !(r.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var r = this.style, n = r.fill;
    return n != null && n !== "none";
  }, t.prototype.getBoundingRect = function() {
    var r = this._rect, n = this.style, i = !r;
    if (i) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & ui) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
    }
    if (this._rect = r, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = r.clone());
      if (this.__dirty || i) {
        s.copy(r);
        var l = n.strokeNoScale ? this.getLineScale() : 1, u = n.lineWidth;
        if (!this.hasFill()) {
          var h = this.strokeContainThreshold;
          u = Math.max(u, h ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return r;
  }, t.prototype.contain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect(), o = this.style;
    if (r = i[0], n = i[1], a.contain(r, n)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), lx(s, l / u, r, n)))
          return !0;
      }
      if (this.hasFill())
        return sx(s, r, n);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= ui, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(r) {
    return this.animate("shape", r);
  }, t.prototype.updateDuringAnimation = function(r) {
    r === "style" ? this.dirtyStyle() : r === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(r, n) {
    r === "shape" ? this.setShape(n) : e.prototype.attrKV.call(this, r, n);
  }, t.prototype.setShape = function(r, n) {
    var i = this.shape;
    return i || (i = this.shape = {}), typeof r == "string" ? i[r] = n : N(i, r), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & ui);
  }, t.prototype.createStyle = function(r) {
    return ul(nm, r);
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var n = this._normalState;
    r.shape && !n.shape && (n.shape = N({}, this.shape));
  }, t.prototype._applyStateObj = function(r, n, i, a, o, s) {
    e.prototype._applyStateObj.call(this, r, n, i, a, o, s);
    var l = !(n && a), u;
    if (n && n.shape ? o ? a ? u = n.shape : (u = N({}, i.shape), N(u, n.shape)) : (u = N({}, a ? this.shape : i.shape), N(u, n.shape)) : l && (u = i.shape), u)
      if (o) {
        this.shape = N({}, this.shape);
        for (var h = {}, c = mt(u), f = 0; f < c.length; f++) {
          var v = c[f];
          typeof u[v] == "object" ? this.shape[v] = u[v] : h[v] = u[v];
        }
        this._transitionState(r, {
          shape: h
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(r) {
    for (var n = e.prototype._mergeStates.call(this, r), i, a = 0; a < r.length; a++) {
      var o = r[a];
      o.shape && (i = i || {}, this._mergeStyle(i, o.shape));
    }
    return i && (n.shape = i), n;
  }, t.prototype.getAnimationStyleProps = function() {
    return ux;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(r) {
    var n = function(a) {
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
    for (var i in r)
      typeof r[i] == "function" && (n.prototype[i] = r[i]);
    return n;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = oe | _a | ui;
  }(), t;
}(po), hx = ht({
  strokeFirst: !0,
  font: Rn,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, nm), Vs = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var r = this.style, n = r.stroke;
    return n != null && n !== "none" && r.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var r = this.style, n = r.fill;
    return n != null && n !== "none";
  }, t.prototype.createStyle = function(r) {
    return ul(hx, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    if (!this._rect) {
      var n = r.text;
      n != null ? n += "" : n = "";
      var i = Gc(n, r.font, r.textAlign, r.textBaseline);
      if (i.x += r.x || 0, i.y += r.y || 0, this.hasStroke()) {
        var a = r.lineWidth;
        i.x -= a / 2, i.y -= a / 2, i.width += a, i.height += a;
      }
      this._rect = i;
    }
    return this._rect;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.dirtyRectTolerance = 10;
  }(), t;
}(po);
Vs.prototype.type = "tspan";
var cx = ht({
  x: 0,
  y: 0
}, An), fx = {
  style: ht({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, vl.style)
};
function vx(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var er = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return ul(cx, r);
  }, t.prototype._getSize = function(r) {
    var n = this.style, i = n[r];
    if (i != null)
      return i;
    var a = vx(n.image) ? n.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = n[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return fx;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new ut(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(po);
er.prototype.type = "image";
function dx(e, t) {
  var r = t.x, n = t.y, i = t.width, a = t.height, o = t.r, s, l, u, h;
  i < 0 && (r = r + i, i = -i), a < 0 && (n = n + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var c;
  s + l > i && (c = s + l, s *= i / c, l *= i / c), u + h > i && (c = u + h, u *= i / c, h *= i / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + h > a && (c = s + h, s *= a / c, h *= a / c), e.moveTo(r + s, n), e.lineTo(r + i - l, n), l !== 0 && e.arc(r + i - l, n + l, l, -Math.PI / 2, 0), e.lineTo(r + i, n + a - u), u !== 0 && e.arc(r + i - u, n + a - u, u, 0, Math.PI / 2), e.lineTo(r + h, n + a), h !== 0 && e.arc(r + h, n + a - h, h, Math.PI / 2, Math.PI), e.lineTo(r, n + s), s !== 0 && e.arc(r + s, n + s, s, Math.PI, Math.PI * 1.5);
}
var pi = Math.round;
function im(e, t, r) {
  if (t) {
    var n = t.x1, i = t.x2, a = t.y1, o = t.y2;
    e.x1 = n, e.x2 = i, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (pi(n * 2) === pi(i * 2) && (e.x1 = e.x2 = Tn(n, s, !0)), pi(a * 2) === pi(o * 2) && (e.y1 = e.y2 = Tn(a, s, !0))), e;
  }
}
function am(e, t, r) {
  if (t) {
    var n = t.x, i = t.y, a = t.width, o = t.height;
    e.x = n, e.y = i, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = Tn(n, s, !0), e.y = Tn(i, s, !0), e.width = Math.max(Tn(n + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(Tn(i + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function Tn(e, t, r) {
  if (!t)
    return e;
  var n = pi(e * 2);
  return (n + pi(t)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
}
var px = /* @__PURE__ */ function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
}(), gx = {}, St = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new px();
  }, t.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = am(gx, n, this.style);
      i = l.x, a = l.y, o = l.width, s = l.height, l.r = n.r, n = l;
    } else
      i = n.x, a = n.y, o = n.width, s = n.height;
    n.r ? dx(r, n) : r.rect(i, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(vt);
St.prototype.type = "rect";
var Vv = {
  fill: "#000"
}, Gv = 2, yx = {
  style: ht({
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
  }, vl.style)
}, Lt = function(e) {
  B(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.type = "text", n._children = [], n._defaultStyle = Vv, n.attr(r), n;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var r = 0; r < this._children.length; r++) {
      var n = this._children[r];
      n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var r = this.innerTransformable;
    r ? (r.updateTransform(), r.transform && (this.transform = r.transform)) : e.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(r) {
    var n = this.innerTransformable;
    return n ? n.getLocalTransform(r) : e.prototype.getLocalTransform.call(this, r);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, xx(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(r) {
    e.prototype.addSelfToZr.call(this, r);
    for (var n = 0; n < this._children.length; n++)
      this._children[n].__zr = r;
  }, t.prototype.removeSelfFromZr = function(r) {
    e.prototype.removeSelfFromZr.call(this, r);
    for (var n = 0; n < this._children.length; n++)
      this._children[n].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var r = new ut(0, 0, 0, 0), n = this._children, i = [], a = null, o = 0; o < n.length; o++) {
        var s = n[o], l = s.getBoundingRect(), u = s.getLocalTransform(i);
        u ? (r.copy(l), r.applyTransform(u), a = a || r.clone(), a.union(r)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || r;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(r) {
    this._defaultStyle = r || Vv;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, n) {
    if (!n)
      return r;
    var i = n.rich, a = r.rich || i && {};
    return N(r, n), i && a ? (this._mergeRich(a, i), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, n) {
    for (var i = mt(n), a = 0; a < i.length; a++) {
      var o = i[a];
      r[o] = r[o] || {}, N(r[o], n[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return yx;
  }, t.prototype._getOrCreateChild = function(r) {
    var n = this._children[this._childCursor];
    return (!n || !(n instanceof r)) && (n = new r()), this._children[this._childCursor++] = n, n.__zr = this.__zr, n.parent = this, n;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, n = r.font || Rn, i = r.padding, a = Kv(r), o = zS(a, r), s = Cu(r), l = !!r.backgroundColor, u = o.outerHeight, h = o.outerWidth, c = o.contentWidth, f = o.lines, v = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = r.x || 0, p = r.y || 0, y = r.align || d.align || "left", m = r.verticalAlign || d.verticalAlign || "top", _ = g, b = hi(p, o.contentHeight, m);
    if (s || i) {
      var S = wa(g, h, y), w = hi(p, u, m);
      s && this._renderBackground(r, r, S, w, h, u);
    }
    b += v / 2, i && (_ = Zv(g, y, i), m === "top" ? b += i[0] : m === "bottom" && (b -= i[2]));
    for (var x = 0, M = !1, D = qv("fill" in r ? r.fill : (M = !0, d.fill)), A = Xv("stroke" in r ? r.stroke : !l && (!d.autoStroke || M) ? (x = Gv, d.stroke) : null), T = r.textShadowBlur > 0, L = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), $ = o.calculatedLineHeight, P = 0; P < f.length; P++) {
      var R = this._getOrCreateChild(Vs), O = R.createStyle();
      R.useStyle(O), O.text = f[P], O.x = _, O.y = b, O.textAlign = y, O.textBaseline = "middle", O.opacity = r.opacity, O.strokeFirst = !0, T && (O.shadowBlur = r.textShadowBlur || 0, O.shadowColor = r.textShadowColor || "transparent", O.shadowOffsetX = r.textShadowOffsetX || 0, O.shadowOffsetY = r.textShadowOffsetY || 0), O.stroke = A, O.fill = D, A && (O.lineWidth = r.lineWidth || x, O.lineDash = r.lineDash, O.lineDashOffset = r.lineDashOffset || 0), O.font = n, Uv(O, r), b += v, L && R.setBoundingRect(new ut(wa(O.x, c, O.textAlign), hi(O.y, $, O.textBaseline), c, $));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, n = Kv(r), i = VS(n, r), a = i.width, o = i.outerWidth, s = i.outerHeight, l = r.padding, u = r.x || 0, h = r.y || 0, c = this._defaultStyle, f = r.align || c.align, v = r.verticalAlign || c.verticalAlign;
    this.isTruncated = !!i.isTruncated;
    var d = wa(u, o, f), g = hi(h, s, v), p = d, y = g;
    l && (p += l[3], y += l[0]);
    var m = p + a;
    Cu(r) && this._renderBackground(r, r, d, g, o, s);
    for (var _ = !!r.backgroundColor, b = 0; b < i.lines.length; b++) {
      for (var S = i.lines[b], w = S.tokens, x = w.length, M = S.lineHeight, D = S.width, A = 0, T = p, L = m, $ = x - 1, P = void 0; A < x && (P = w[A], !P.align || P.align === "left"); )
        this._placeToken(P, r, M, y, T, "left", _), D -= P.width, T += P.width, A++;
      for (; $ >= 0 && (P = w[$], P.align === "right"); )
        this._placeToken(P, r, M, y, L, "right", _), D -= P.width, L -= P.width, $--;
      for (T += (a - (T - p) - (m - L) - D) / 2; A <= $; )
        P = w[A], this._placeToken(P, r, M, y, T + P.width / 2, "center", _), T += P.width, A++;
      y += M;
    }
  }, t.prototype._placeToken = function(r, n, i, a, o, s, l) {
    var u = n.rich[r.styleName] || {};
    u.text = r.text;
    var h = r.verticalAlign, c = a + i / 2;
    h === "top" ? c = a + r.height / 2 : h === "bottom" && (c = a + i - r.height / 2);
    var f = !r.isLineHolder && Cu(u);
    f && this._renderBackground(u, n, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, c - r.height / 2, r.width, r.height);
    var v = !!u.backgroundColor, d = r.textPadding;
    d && (o = Zv(o, s, d), c -= r.height / 2 - d[0] - r.innerHeight / 2);
    var g = this._getOrCreateChild(Vs), p = g.createStyle();
    g.useStyle(p);
    var y = this._defaultStyle, m = !1, _ = 0, b = qv("fill" in u ? u.fill : "fill" in n ? n.fill : (m = !0, y.fill)), S = Xv("stroke" in u ? u.stroke : "stroke" in n ? n.stroke : !v && !l && (!y.autoStroke || m) ? (_ = Gv, y.stroke) : null), w = u.textShadowBlur > 0 || n.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = c, w && (p.shadowBlur = u.textShadowBlur || n.textShadowBlur || 0, p.shadowColor = u.textShadowColor || n.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || n.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || n.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || Rn, p.opacity = us(u.opacity, n.opacity, 1), Uv(p, u), S && (p.lineWidth = us(u.lineWidth, n.lineWidth, _), p.lineDash = tt(u.lineDash, n.lineDash), p.lineDashOffset = n.lineDashOffset || 0, p.stroke = S), b && (p.fill = b);
    var x = r.contentWidth, M = r.contentHeight;
    g.setBoundingRect(new ut(wa(p.x, x, p.textAlign), hi(p.y, M, p.textBaseline), x, M));
  }, t.prototype._renderBackground = function(r, n, i, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, h = r.borderColor, c = l && l.image, f = l && !c, v = r.borderRadius, d = this, g, p;
    if (f || r.lineHeight || u && h) {
      g = this._getOrCreateChild(St), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = i, y.y = a, y.width = o, y.height = s, y.r = v, g.dirtyShape();
    }
    if (f) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = tt(r.fillOpacity, 1);
    } else if (c) {
      p = this._getOrCreateChild(er), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = i, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = tt(r.strokeOpacity, 1), m.lineDash = r.borderDash, m.lineDashOffset = r.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || p).style;
    b.shadowBlur = r.shadowBlur || 0, b.shadowColor = r.shadowColor || "transparent", b.shadowOffsetX = r.shadowOffsetX || 0, b.shadowOffsetY = r.shadowOffsetY || 0, b.opacity = us(r.opacity, n.opacity, 1);
  }, t.makeFont = function(r) {
    var n = "";
    return Sx(r) && (n = [
      r.fontStyle,
      r.fontWeight,
      bx(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), n && Ue(n) || r.textFont || r.font;
  }, t;
}(po), mx = { left: !0, right: 1, center: 1 }, _x = { top: 1, bottom: 1, middle: 1 }, Wv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function bx(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? Pc + "px" : e + "px";
}
function Uv(e, t) {
  for (var r = 0; r < Wv.length; r++) {
    var n = Wv[r], i = t[n];
    i != null && (e[n] = i);
  }
}
function Sx(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function xx(e) {
  return Yv(e), C(e.rich, Yv), e;
}
function Yv(e) {
  if (e) {
    e.font = Lt.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || mx[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || _x[r] ? r : "top";
    var n = e.padding;
    n && (e.padding = by(e.padding));
  }
}
function Xv(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function qv(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Zv(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function Kv(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function Cu(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var st = $t(), Tx = function(e, t, r, n) {
  if (n) {
    var i = st(n);
    i.dataIndex = r, i.dataType = t, i.seriesIndex = e, i.ssrType = "chart", n.type === "group" && n.traverse(function(a) {
      var o = st(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, jv = 1, Qv = {}, om = $t(), Zc = $t(), Kc = 0, dl = 1, pl = 2, Ke = ["emphasis", "blur", "select"], Jv = ["normal", "emphasis", "blur", "select"], Cx = 10, Mx = 9, In = "highlight", gs = "downplay", La = "select", ys = "unselect", $a = "toggleSelect";
function Kn(e) {
  return e != null && e !== "none";
}
function gl(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function sm(e) {
  gl(e, "emphasis", pl);
}
function lm(e) {
  e.hoverState === pl && gl(e, "normal", Kc);
}
function jc(e) {
  gl(e, "blur", dl);
}
function um(e) {
  e.hoverState === dl && gl(e, "normal", Kc);
}
function Dx(e) {
  e.selected = !0;
}
function Ax(e) {
  e.selected = !1;
}
function td(e, t, r) {
  t(e, r);
}
function Sr(e, t, r) {
  td(e, t, r), e.isGroup && e.traverse(function(n) {
    td(n, t, r);
  });
}
function ed(e, t) {
  switch (t) {
    case "emphasis":
      e.hoverState = pl;
      break;
    case "normal":
      e.hoverState = Kc;
      break;
    case "blur":
      e.hoverState = dl;
      break;
    case "select":
      e.selected = !0;
  }
}
function Ix(e, t, r, n) {
  for (var i = e.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = i[s];
    a[s] = l ?? (n && n[s]);
  }
  for (var o = 0; o < e.animators.length; o++) {
    var u = e.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(r) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function Lx(e, t, r, n) {
  var i = r && pt(r, "select") >= 0, a = !1;
  if (e instanceof vt) {
    var o = om(e), s = i && o.selectFill || o.normalFill, l = i && o.selectStroke || o.normalStroke;
    if (Kn(s) || Kn(l)) {
      n = n || {};
      var u = n.style || {};
      u.fill === "inherit" ? (a = !0, n = N({}, n), u = N({}, u), u.fill = s) : !Kn(u.fill) && Kn(s) ? (a = !0, n = N({}, n), u = N({}, u), u.fill = yv(s)) : !Kn(u.stroke) && Kn(l) && (a || (n = N({}, n), u = N({}, u)), u.stroke = yv(l)), n.style = u;
    }
  }
  if (n && n.z2 == null) {
    a || (n = N({}, n));
    var h = e.z2EmphasisLift;
    n.z2 = e.z2 + (h ?? Cx);
  }
  return n;
}
function $x(e, t, r) {
  if (r && r.z2 == null) {
    r = N({}, r);
    var n = e.z2SelectLift;
    r.z2 = e.z2 + (n ?? Mx);
  }
  return r;
}
function Px(e, t, r) {
  var n = pt(e.currentStates, t) >= 0, i = e.style.opacity, a = n ? null : Ix(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = N({}, r), o = N({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: n ? i : a.opacity * 0.1
  }, o), r.style = o), r;
}
function Mu(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return Lx(this, e, t, r);
    if (e === "blur")
      return Px(this, e, r);
    if (e === "select")
      return $x(this, e, r);
  }
  return r;
}
function Rx(e) {
  e.stateProxy = Mu;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = Mu), r && (r.stateProxy = Mu);
}
function rd(e, t) {
  !vm(e, t) && !e.__highByOuter && Sr(e, sm);
}
function nd(e, t) {
  !vm(e, t) && !e.__highByOuter && Sr(e, lm);
}
function Gs(e, t) {
  e.__highByOuter |= 1 << (t || 0), Sr(e, sm);
}
function Ws(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && Sr(e, lm);
}
function Ox(e) {
  Sr(e, jc);
}
function hm(e) {
  Sr(e, um);
}
function cm(e) {
  Sr(e, Dx);
}
function fm(e) {
  Sr(e, Ax);
}
function vm(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function dm(e) {
  var t = e.getModel(), r = [], n = [];
  t.eachComponent(function(i, a) {
    var o = Zc(a), s = i === "series", l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    !s && n.push(l), o.isBlured && (l.group.traverse(function(u) {
      um(u);
    }), s && r.push(a)), o.isBlured = !1;
  }), C(n, function(i) {
    i && i.toggleBlurSeries && i.toggleBlurSeries(r, !1, t);
  });
}
function Nh(e, t, r, n) {
  var i = n.getModel();
  r = r || "coordinateSystem";
  function a(u, h) {
    for (var c = 0; c < h.length; c++) {
      var f = u.getItemGraphicEl(h[c]);
      f && hm(f);
    }
  }
  if (e != null && !(!t || t === "none")) {
    var o = i.getSeriesByIndex(e), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    i.eachSeries(function(u) {
      var h = o === u, c = u.coordinateSystem;
      c && c.master && (c = c.master);
      var f = c && s ? c === s : h;
      if (!// Not blur other series if blurScope series
      (r === "series" && !h || r === "coordinateSystem" && !f || t === "series" && h)) {
        var v = n.getViewOfSeriesModel(u);
        if (v.group.traverse(function(p) {
          p.__highByOuter && h && t === "self" || jc(p);
        }), ee(t))
          a(u.getData(), t);
        else if (V(t))
          for (var d = mt(t), g = 0; g < d.length; g++)
            a(u.getData(d[g]), t[d[g]]);
        l.push(u), Zc(u).isBlured = !0;
      }
    }), i.eachComponent(function(u, h) {
      if (u !== "series") {
        var c = n.getViewOfComponentModel(h);
        c && c.toggleBlurSeries && c.toggleBlurSeries(l, !0, i);
      }
    });
  }
}
function Bh(e, t, r) {
  if (!(e == null || t == null)) {
    var n = r.getModel().getComponent(e, t);
    if (n) {
      Zc(n).isBlured = !0;
      var i = r.getViewOfComponentModel(n);
      !i || !i.focusBlurEnabled || i.group.traverse(function(a) {
        jc(a);
      });
    }
  }
}
function Ex(e, t, r) {
  var n = e.seriesIndex, i = e.getData(t.dataType);
  if (i) {
    var a = En(i, t);
    a = (z(a) ? a[0] : a) || 0;
    var o = i.getItemGraphicEl(a);
    if (!o)
      for (var s = i.count(), l = 0; !o && l < s; )
        o = i.getItemGraphicEl(l++);
    if (o) {
      var u = st(o);
      Nh(n, u.focus, u.blurScope, r);
    } else {
      var h = e.get(["emphasis", "focus"]), c = e.get(["emphasis", "blurScope"]);
      h != null && Nh(n, h, c, r);
    }
  }
}
function Qc(e, t, r, n) {
  var i = {
    focusSelf: !1,
    dispatchers: null
  };
  if (e == null || e === "series" || t == null || r == null)
    return i;
  var a = n.getModel().getComponent(e, t);
  if (!a)
    return i;
  var o = n.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return i;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (st(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function kx(e, t, r) {
  var n = st(e), i = Qc(n.componentMainType, n.componentIndex, n.componentHighDownName, r), a = i.dispatchers, o = i.focusSelf;
  a ? (o && Bh(n.componentMainType, n.componentIndex, r), C(a, function(s) {
    return rd(s, t);
  })) : (Nh(n.seriesIndex, n.focus, n.blurScope, r), n.focus === "self" && Bh(n.componentMainType, n.componentIndex, r), rd(e, t));
}
function Nx(e, t, r) {
  dm(r);
  var n = st(e), i = Qc(n.componentMainType, n.componentIndex, n.componentHighDownName, r).dispatchers;
  i ? C(i, function(a) {
    return nd(a, t);
  }) : nd(e, t);
}
function Bx(e, t, r) {
  if (Vh(t)) {
    var n = t.dataType, i = e.getData(n), a = En(i, t);
    z(a) || (a = [a]), e[t.type === $a ? "toggleSelect" : t.type === La ? "select" : "unselect"](a, n);
  }
}
function id(e) {
  var t = e.getAllData();
  C(t, function(r) {
    var n = r.data, i = r.type;
    n.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, i) ? cm(a) : fm(a);
    });
  });
}
function zx(e) {
  var t = [];
  return e.eachSeries(function(r) {
    var n = r.getAllData();
    C(n, function(i) {
      i.data;
      var a = i.type, o = r.getSelectedDataIndices();
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
function zh(e, t, r) {
  Jc(e, !0), Sr(e, Rx), Hx(e, t, r);
}
function Fx(e) {
  Jc(e, !1);
}
function Ka(e, t, r, n) {
  n ? Fx(e) : zh(e, t, r);
}
function Hx(e, t, r) {
  var n = st(e);
  t != null ? (n.focus = t, n.blurScope = r) : n.focus && (n.focus = null);
}
var ad = ["emphasis", "blur", "select"], Vx = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Fh(e, t, r, n) {
  r = r || "itemStyle";
  for (var i = 0; i < ad.length; i++) {
    var a = ad[i], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[Vx[r]]();
  }
}
function Jc(e, t) {
  var r = t === !1, n = e;
  e.highDownSilentOnTouch && (n.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || n.__highDownDispatcher) && (n.__highByOuter = n.__highByOuter || 0, n.__highDownDispatcher = !r);
}
function Hh(e) {
  return !!(e && e.__highDownDispatcher);
}
function Gx(e) {
  var t = Qv[e];
  return t == null && jv <= 32 && (t = Qv[e] = jv++), t;
}
function Vh(e) {
  var t = e.type;
  return t === La || t === ys || t === $a;
}
function od(e) {
  var t = e.type;
  return t === In || t === gs;
}
function Wx(e) {
  var t = om(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var jn = kn.CMD, Ux = [[], [], []], sd = Math.sqrt, Yx = Math.atan2;
function Xx(e, t) {
  if (t) {
    var r = e.data, n = e.len(), i, a, o, s, l, u, h = jn.M, c = jn.C, f = jn.L, v = jn.R, d = jn.A, g = jn.Q;
    for (o = 0, s = 0; o < n; ) {
      switch (i = r[o++], s = o, a = 0, i) {
        case h:
          a = 1;
          break;
        case f:
          a = 1;
          break;
        case c:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case d:
          var p = t[4], y = t[5], m = sd(t[0] * t[0] + t[1] * t[1]), _ = sd(t[2] * t[2] + t[3] * t[3]), b = Yx(-t[1] / _, t[0] / m);
          r[o] *= m, r[o++] += p, r[o] *= _, r[o++] += y, r[o++] *= m, r[o++] *= _, r[o++] += b, r[o++] += b, o += 2, s = o;
          break;
        case v:
          u[0] = r[o++], u[1] = r[o++], be(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], be(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = Ux[l];
        S[0] = r[o++], S[1] = r[o++], be(S, S, t), r[s++] = S[0], r[s++] = S[1];
      }
    }
    e.increaseVersion();
  }
}
var Du = Math.sqrt, Ro = Math.sin, Oo = Math.cos, na = Math.PI;
function ld(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Gh(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (ld(e) * ld(t));
}
function ud(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Gh(e, t));
}
function hd(e, t, r, n, i, a, o, s, l, u, h) {
  var c = l * (na / 180), f = Oo(c) * (e - r) / 2 + Ro(c) * (t - n) / 2, v = -1 * Ro(c) * (e - r) / 2 + Oo(c) * (t - n) / 2, d = f * f / (o * o) + v * v / (s * s);
  d > 1 && (o *= Du(d), s *= Du(d));
  var g = (i === a ? -1 : 1) * Du((o * o * (s * s) - o * o * (v * v) - s * s * (f * f)) / (o * o * (v * v) + s * s * (f * f))) || 0, p = g * o * v / s, y = g * -s * f / o, m = (e + r) / 2 + Oo(c) * p - Ro(c) * y, _ = (t + n) / 2 + Ro(c) * p + Oo(c) * y, b = ud([1, 0], [(f - p) / o, (v - y) / s]), S = [(f - p) / o, (v - y) / s], w = [(-1 * f - p) / o, (-1 * v - y) / s], x = ud(S, w);
  if (Gh(S, w) <= -1 && (x = na), Gh(S, w) >= 1 && (x = 0), x < 0) {
    var M = Math.round(x / na * 1e6) / 1e6;
    x = na * 2 + M % 2 * na;
  }
  h.addData(u, m, _, o, s, b, x, c, a);
}
var qx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Zx = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Kx(e) {
  var t = new kn();
  if (!e)
    return t;
  var r = 0, n = 0, i = r, a = n, o, s = kn.CMD, l = e.match(qx);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], c = h.charAt(0), f = void 0, v = h.match(Zx) || [], d = v.length, g = 0; g < d; g++)
      v[g] = parseFloat(v[g]);
    for (var p = 0; p < d; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = r, D = n, A = void 0, T = void 0;
      switch (c) {
        case "l":
          r += v[p++], n += v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "L":
          r = v[p++], n = v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "m":
          r += v[p++], n += v[p++], f = s.M, t.addData(f, r, n), i = r, a = n, c = "l";
          break;
        case "M":
          r = v[p++], n = v[p++], f = s.M, t.addData(f, r, n), i = r, a = n, c = "L";
          break;
        case "h":
          r += v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "H":
          r = v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "v":
          n += v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "V":
          n = v[p++], f = s.L, t.addData(f, r, n);
          break;
        case "C":
          f = s.C, t.addData(f, v[p++], v[p++], v[p++], v[p++], v[p++], v[p++]), r = v[p - 2], n = v[p - 1];
          break;
        case "c":
          f = s.C, t.addData(f, v[p++] + r, v[p++] + n, v[p++] + r, v[p++] + n, v[p++] + r, v[p++] + n), r += v[p - 2], n += v[p - 1];
          break;
        case "S":
          y = r, m = n, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += n - T[A - 3]), f = s.C, M = v[p++], D = v[p++], r = v[p++], n = v[p++], t.addData(f, y, m, M, D, r, n);
          break;
        case "s":
          y = r, m = n, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += n - T[A - 3]), f = s.C, M = r + v[p++], D = n + v[p++], r += v[p++], n += v[p++], t.addData(f, y, m, M, D, r, n);
          break;
        case "Q":
          M = v[p++], D = v[p++], r = v[p++], n = v[p++], f = s.Q, t.addData(f, M, D, r, n);
          break;
        case "q":
          M = v[p++] + r, D = v[p++] + n, r += v[p++], n += v[p++], f = s.Q, t.addData(f, M, D, r, n);
          break;
        case "T":
          y = r, m = n, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += n - T[A - 3]), r = v[p++], n = v[p++], f = s.Q, t.addData(f, y, m, r, n);
          break;
        case "t":
          y = r, m = n, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += n - T[A - 3]), r += v[p++], n += v[p++], f = s.Q, t.addData(f, y, m, r, n);
          break;
        case "A":
          _ = v[p++], b = v[p++], S = v[p++], w = v[p++], x = v[p++], M = r, D = n, r = v[p++], n = v[p++], f = s.A, hd(M, D, r, n, w, x, _, b, S, f, t);
          break;
        case "a":
          _ = v[p++], b = v[p++], S = v[p++], w = v[p++], x = v[p++], M = r, D = n, r += v[p++], n += v[p++], f = s.A, hd(M, D, r, n, w, x, _, b, S, f, t);
          break;
      }
    }
    (c === "z" || c === "Z") && (f = s.Z, t.addData(f), r = i, n = a), o = f;
  }
  return t.toStatic(), t;
}
var pm = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
}(vt);
function gm(e) {
  return e.setData != null;
}
function ym(e, t) {
  var r = Kx(e), n = N({}, t);
  return n.buildPath = function(i) {
    if (gm(i)) {
      i.setData(r.data);
      var a = i.getContext();
      a && i.rebuildPath(a, 1);
    } else {
      var a = i;
      r.rebuildPath(a, 1);
    }
  }, n.applyTransform = function(i) {
    Xx(r, i), this.dirtyShape();
  }, n;
}
function jx(e, t) {
  return new pm(ym(e, t));
}
function Qx(e, t) {
  var r = ym(e, t), n = function(i) {
    B(a, i);
    function a(o) {
      var s = i.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  }(pm);
  return n;
}
function Jx(e, t) {
  for (var r = [], n = e.length, i = 0; i < n; i++) {
    var a = e[i];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new vt(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (gm(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var tT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
}(), yl = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new tT();
  }, t.prototype.buildPath = function(r, n) {
    r.moveTo(n.cx + n.r, n.cy), r.arc(n.cx, n.cy, n.r, 0, Math.PI * 2);
  }, t;
}(vt);
yl.prototype.type = "circle";
var eT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
}(), tf = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new eT();
  }, t.prototype.buildPath = function(r, n) {
    var i = 0.5522848, a = n.cx, o = n.cy, s = n.rx, l = n.ry, u = s * i, h = l * i;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), r.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), r.closePath();
  }, t;
}(vt);
tf.prototype.type = "ellipse";
var mm = Math.PI, Au = mm * 2, fn = Math.sin, Qn = Math.cos, rT = Math.acos, Nt = Math.atan2, cd = Math.abs, Pa = Math.sqrt, Sa = Math.max, Ve = Math.min, Ae = 1e-4;
function nT(e, t, r, n, i, a, o, s) {
  var l = r - e, u = n - t, h = o - i, c = s - a, f = c * l - h * u;
  if (!(f * f < Ae))
    return f = (h * (t - a) - c * (e - i)) / f, [e + f * l, t + f * u];
}
function Eo(e, t, r, n, i, a, o) {
  var s = e - r, l = t - n, u = (o ? a : -a) / Pa(s * s + l * l), h = u * l, c = -u * s, f = e + h, v = t + c, d = r + h, g = n + c, p = (f + d) / 2, y = (v + g) / 2, m = d - f, _ = g - v, b = m * m + _ * _, S = i - a, w = f * g - d * v, x = (_ < 0 ? -1 : 1) * Pa(Sa(0, S * S * b - w * w)), M = (w * _ - m * x) / b, D = (-w * m - _ * x) / b, A = (w * _ + m * x) / b, T = (-w * m + _ * x) / b, L = M - p, $ = D - y, P = A - p, R = T - y;
  return L * L + $ * $ > P * P + R * R && (M = A, D = T), {
    cx: M,
    cy: D,
    x0: -h,
    y0: -c,
    x1: M * (i / S - 1),
    y1: D * (i / S - 1)
  };
}
function iT(e) {
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
function aT(e, t) {
  var r, n = Sa(t.r, 0), i = Sa(t.r0 || 0, 0), a = n > 0, o = i > 0;
  if (!(!a && !o)) {
    if (a || (n = i, i = 0), i > n) {
      var s = n;
      n = i, i = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, c = t.cy, f = !!t.clockwise, v = cd(u - l), d = v > Au && v % Au;
      if (d > Ae && (v = d), !(n > Ae))
        e.moveTo(h, c);
      else if (v > Au - Ae)
        e.moveTo(h + n * Qn(l), c + n * fn(l)), e.arc(h, c, n, l, u, !f), i > Ae && (e.moveTo(h + i * Qn(u), c + i * fn(u)), e.arc(h, c, i, u, l, f));
      else {
        var g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = void 0, D = void 0, A = void 0, T = void 0, L = void 0, $ = void 0, P = void 0, R = n * Qn(l), O = n * fn(l), G = i * Qn(u), k = i * fn(u), F = v > Ae;
        if (F) {
          var W = t.cornerRadius;
          W && (r = iT(W), g = r[0], p = r[1], y = r[2], m = r[3]);
          var j = cd(n - i) / 2;
          if (_ = Ve(j, y), b = Ve(j, m), S = Ve(j, g), w = Ve(j, p), D = x = Sa(_, b), A = M = Sa(S, w), (x > Ae || M > Ae) && (T = n * Qn(u), L = n * fn(u), $ = i * Qn(l), P = i * fn(l), v < mm)) {
            var rt = nT(R, O, $, P, T, L, G, k);
            if (rt) {
              var dt = R - rt[0], wt = O - rt[1], xt = T - rt[0], Ce = L - rt[1], qr = 1 / fn(rT((dt * xt + wt * Ce) / (Pa(dt * dt + wt * wt) * Pa(xt * xt + Ce * Ce))) / 2), Wn = Pa(rt[0] * rt[0] + rt[1] * rt[1]);
              D = Ve(x, (n - Wn) / (qr + 1)), A = Ve(M, (i - Wn) / (qr - 1));
            }
          }
        }
        if (!F)
          e.moveTo(h + R, c + O);
        else if (D > Ae) {
          var ie = Ve(y, D), Rt = Ve(m, D), K = Eo($, P, R, O, n, ie, f), nt = Eo(T, L, G, k, n, Rt, f);
          e.moveTo(h + K.cx + K.x0, c + K.cy + K.y0), D < x && ie === Rt ? e.arc(h + K.cx, c + K.cy, D, Nt(K.y0, K.x0), Nt(nt.y0, nt.x0), !f) : (ie > 0 && e.arc(h + K.cx, c + K.cy, ie, Nt(K.y0, K.x0), Nt(K.y1, K.x1), !f), e.arc(h, c, n, Nt(K.cy + K.y1, K.cx + K.x1), Nt(nt.cy + nt.y1, nt.cx + nt.x1), !f), Rt > 0 && e.arc(h + nt.cx, c + nt.cy, Rt, Nt(nt.y1, nt.x1), Nt(nt.y0, nt.x0), !f));
        } else
          e.moveTo(h + R, c + O), e.arc(h, c, n, l, u, !f);
        if (!(i > Ae) || !F)
          e.lineTo(h + G, c + k);
        else if (A > Ae) {
          var ie = Ve(g, A), Rt = Ve(p, A), K = Eo(G, k, T, L, i, -Rt, f), nt = Eo(R, O, $, P, i, -ie, f);
          e.lineTo(h + K.cx + K.x0, c + K.cy + K.y0), A < M && ie === Rt ? e.arc(h + K.cx, c + K.cy, A, Nt(K.y0, K.x0), Nt(nt.y0, nt.x0), !f) : (Rt > 0 && e.arc(h + K.cx, c + K.cy, Rt, Nt(K.y0, K.x0), Nt(K.y1, K.x1), !f), e.arc(h, c, i, Nt(K.cy + K.y1, K.cx + K.x1), Nt(nt.cy + nt.y1, nt.cx + nt.x1), f), ie > 0 && e.arc(h + nt.cx, c + nt.cy, ie, Nt(nt.y1, nt.x1), Nt(nt.y0, nt.x0), !f));
        } else
          e.lineTo(h + G, c + k), e.arc(h, c, i, u, l, f);
      }
      e.closePath();
    }
  }
}
var oT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
}(), Hi = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new oT();
  }, t.prototype.buildPath = function(r, n) {
    aT(r, n);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(vt);
Hi.prototype.type = "sector";
var sT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
}(), ef = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new sT();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.PI * 2;
    r.moveTo(i + n.r, a), r.arc(i, a, n.r, 0, o, !1), r.moveTo(i + n.r0, a), r.arc(i, a, n.r0, 0, o, !0);
  }, t;
}(vt);
ef.prototype.type = "ring";
function lT(e, t, r, n) {
  var i = [], a = [], o = [], s = [], l, u, h, c;
  if (n) {
    h = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var f = 0, v = e.length; f < v; f++)
      fi(h, h, e[f]), vi(c, c, e[f]);
    fi(h, h, n[0]), vi(c, c, n[1]);
  }
  for (var f = 0, v = e.length; f < v; f++) {
    var d = e[f];
    if (r)
      l = e[f ? f - 1 : v - 1], u = e[(f + 1) % v];
    else if (f === 0 || f === v - 1) {
      i.push(z1(e[f]));
      continue;
    } else
      l = e[f - 1], u = e[f + 1];
    F1(a, u, l), Wl(a, a, t);
    var g = _h(d, l), p = _h(d, u), y = g + p;
    y !== 0 && (g /= y, p /= y), Wl(o, a, -g), Wl(s, a, p);
    var m = ev([], d, o), _ = ev([], d, s);
    n && (vi(m, m, h), fi(m, m, c), vi(_, _, h), fi(_, _, c)), i.push(m), i.push(_);
  }
  return r && i.push(i.shift()), i;
}
function _m(e, t, r) {
  var n = t.smooth, i = t.points;
  if (i && i.length >= 2) {
    if (n) {
      var a = lT(i, n, r, t.smoothConstraint);
      e.moveTo(i[0][0], i[0][1]);
      for (var o = i.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], h = i[(s + 1) % o];
        e.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
      }
    } else {
      e.moveTo(i[0][0], i[0][1]);
      for (var s = 1, c = i.length; s < c; s++)
        e.lineTo(i[s][0], i[s][1]);
    }
    r && e.closePath();
  }
}
var uT = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), ml = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new uT();
  }, t.prototype.buildPath = function(r, n) {
    _m(r, n, !0);
  }, t;
}(vt);
ml.prototype.type = "polygon";
var hT = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), rf = function(e) {
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
    return new hT();
  }, t.prototype.buildPath = function(r, n) {
    _m(r, n, !1);
  }, t;
}(vt);
rf.prototype.type = "polyline";
var cT = {}, fT = /* @__PURE__ */ function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return e;
}(), Wr = function(e) {
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
    return new fT();
  }, t.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = im(cT, n, this.style);
      i = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      i = n.x1, a = n.y1, o = n.x2, s = n.y2;
    var u = n.percent;
    u !== 0 && (r.moveTo(i, a), u < 1 && (o = i * (1 - u) + o * u, s = a * (1 - u) + s * u), r.lineTo(o, s));
  }, t.prototype.pointAt = function(r) {
    var n = this.shape;
    return [
      n.x1 * (1 - r) + n.x2 * r,
      n.y1 * (1 - r) + n.y2 * r
    ];
  }, t;
}(vt);
Wr.prototype.type = "line";
var qt = [], vT = /* @__PURE__ */ function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
}();
function fd(e, t, r) {
  var n = e.cpx2, i = e.cpy2;
  return n != null || i != null ? [
    (r ? fv : Et)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? fv : Et)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? vv : Qt)(e.x1, e.cpx1, e.x2, t),
    (r ? vv : Qt)(e.y1, e.cpy1, e.y2, t)
  ];
}
var nf = function(e) {
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
    return new vT();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.x1, a = n.y1, o = n.x2, s = n.y2, l = n.cpx1, u = n.cpy1, h = n.cpx2, c = n.cpy2, f = n.percent;
    f !== 0 && (r.moveTo(i, a), h == null || c == null ? (f < 1 && (ks(i, l, o, f, qt), l = qt[1], o = qt[2], ks(a, u, s, f, qt), u = qt[1], s = qt[2]), r.quadraticCurveTo(l, u, o, s)) : (f < 1 && (Es(i, l, h, o, f, qt), l = qt[1], h = qt[2], o = qt[3], Es(a, u, c, s, f, qt), u = qt[1], c = qt[2], s = qt[3]), r.bezierCurveTo(l, u, h, c, o, s)));
  }, t.prototype.pointAt = function(r) {
    return fd(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var n = fd(this.shape, r, !0);
    return G1(n, n);
  }, t;
}(vt);
nf.prototype.type = "bezier-curve";
var dT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
}(), _l = function(e) {
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
    return new dT();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.max(n.r, 0), s = n.startAngle, l = n.endAngle, u = n.clockwise, h = Math.cos(s), c = Math.sin(s);
    r.moveTo(h * o + i, c * o + a), r.arc(i, a, o, s, l, !u);
  }, t;
}(vt);
_l.prototype.type = "arc";
var pT = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.type = "compound", r;
  }
  return t.prototype._updatePathDirty = function() {
    for (var r = this.shape.paths, n = this.shapeChanged(), i = 0; i < r.length; i++)
      n = n || r[i].shapeChanged();
    n && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var r = this.shape.paths || [], n = this.getGlobalScale(), i = 0; i < r.length; i++)
      r[i].path || r[i].createPathProxy(), r[i].path.setScale(n[0], n[1], r[i].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(r, n) {
    for (var i = n.paths || [], a = 0; a < i.length; a++)
      i[a].buildPath(r, i[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var r = this.shape.paths || [], n = 0; n < r.length; n++)
      r[n].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), vt.prototype.getBoundingRect.call(this);
  }, t;
}(vt), bm = function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
}(), af = function(e) {
  B(t, e);
  function t(r, n, i, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = n ?? 0, l.x2 = i ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(bm), gT = function(e) {
  B(t, e);
  function t(r, n, i, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = n ?? 0.5, s.r = i ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(bm), vn = [0, 0], dn = [0, 0], ko = new gt(), No = new gt(), Us = function() {
  function e(t, r) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var n = 0; n < 4; n++)
      this._corners[n] = new gt();
    for (var n = 0; n < 2; n++)
      this._axes[n] = new gt();
    t && this.fromBoundingRect(t, r);
  }
  return e.prototype.fromBoundingRect = function(t, r) {
    var n = this._corners, i = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (n[0].set(a, o), n[1].set(s, o), n[2].set(s, l), n[3].set(a, l), r)
      for (var u = 0; u < 4; u++)
        n[u].transform(r);
    gt.sub(i[0], n[1], n[0]), gt.sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = i[u].dot(n[0]);
  }, e.prototype.intersect = function(t, r) {
    var n = !0, i = !r;
    return ko.set(1 / 0, 1 / 0), No.set(0, 0), !this._intersectCheckOneSide(this, t, ko, No, i, 1) && (n = !1, i) || !this._intersectCheckOneSide(t, this, ko, No, i, -1) && (n = !1, i) || i || gt.copy(r, n ? ko : No), n;
  }, e.prototype._intersectCheckOneSide = function(t, r, n, i, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, vn), this._getProjMinMaxOnAxis(l, r._corners, dn), vn[1] < dn[0] || vn[0] > dn[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(dn[0] - vn[1]), c = Math.abs(vn[0] - dn[1]);
        Math.min(h, c) > i.len() && (h < c ? gt.scale(i, u, -h * o) : gt.scale(i, u, c * o));
      } else if (n) {
        var h = Math.abs(dn[0] - vn[1]), c = Math.abs(vn[0] - dn[1]);
        Math.min(h, c) < n.len() && (h < c ? gt.scale(n, u, h * o) : gt.scale(n, u, -c * o));
      }
    }
    return s;
  }, e.prototype._getProjMinMaxOnAxis = function(t, r, n) {
    for (var i = this._axes[t], a = this._origin, o = r[0].dot(i) + a[t], s = o, l = o, u = 1; u < r.length; u++) {
      var h = r[u].dot(i) + a[t];
      s = Math.min(h, s), l = Math.max(h, l);
    }
    n[0] = s, n[1] = l;
  }, e;
}(), yT = [], mT = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.notClear = !0, r.incremental = !0, r._displayables = [], r._temporaryDisplayables = [], r._cursor = 0, r;
  }
  return t.prototype.traverse = function(r, n) {
    r.call(n, this);
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
  }, t.prototype.addDisplayable = function(r, n) {
    n ? this._temporaryDisplayables.push(r) : this._displayables.push(r), this.markRedraw();
  }, t.prototype.addDisplayables = function(r, n) {
    n = n || !1;
    for (var i = 0; i < r.length; i++)
      this.addDisplayable(r[i], n);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(r) {
    for (var n = this._cursor; n < this._displayables.length; n++)
      r && r(this._displayables[n]);
    for (var n = 0; n < this._temporaryDisplayables.length; n++)
      r && r(this._temporaryDisplayables[n]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var r = this._cursor; r < this._displayables.length; r++) {
      var n = this._displayables[r];
      n.parent = this, n.update(), n.parent = null;
    }
    for (var r = 0; r < this._temporaryDisplayables.length; r++) {
      var n = this._temporaryDisplayables[r];
      n.parent = this, n.update(), n.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var r = new ut(1 / 0, 1 / 0, -1 / 0, -1 / 0), n = 0; n < this._displayables.length; n++) {
        var i = this._displayables[n], a = i.getBoundingRect().clone();
        i.needLocalTransform() && a.applyTransform(i.getLocalTransform(yT)), r.union(a);
      }
      this._rect = r;
    }
    return this._rect;
  }, t.prototype.contain = function(r, n) {
    var i = this.transformCoordToLocal(r, n), a = this.getBoundingRect();
    if (a.contain(i[0], i[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(r, n))
          return !0;
      }
    return !1;
  }, t;
}(po), _T = $t();
function bT(e, t, r, n, i) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = e === "update";
  if (s) {
    var u = void 0, h = void 0, c = void 0;
    n ? (u = tt(n.duration, 200), h = tt(n.easing, "cubicOut"), c = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), c = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (c = a.delay)), Z(c) && (c = c(r, i)), Z(u) && (u = u(r));
    var f = {
      duration: u || 0,
      delay: c,
      easing: h
    };
    return f;
  } else
    return null;
}
function of(e, t, r, n, i, a, o) {
  var s = !1, l;
  Z(i) ? (o = a, a = i, i = null) : V(i) && (a = i.cb, o = i.during, s = i.isFrom, l = i.removeOpt, i = i.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var h = bT(e, n, i, u ? l || {} : null, n && n.getAnimationDelayParams ? n.getAnimationDelayParams(t, i) : null);
  if (h && h.duration > 0) {
    var c = h.duration, f = h.delay, v = h.easing, d = {
      duration: c,
      delay: f || 0,
      easing: v,
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
function le(e, t, r, n, i, a) {
  of("update", e, t, r, n, i, a);
}
function pr(e, t, r, n, i, a) {
  of("enter", e, t, r, n, i, a);
}
function Ra(e) {
  if (!e.__zr)
    return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function Ys(e, t, r, n, i, a) {
  Ra(e) || of("leave", e, t, r, n, i, a);
}
function vd(e, t, r, n) {
  e.removeTextContent(), e.removeTextGuideLine(), Ys(e, {
    style: {
      opacity: 0
    }
  }, t, r, n);
}
function Wh(e, t, r) {
  function n() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(i) {
    i.isGroup || vd(i, t, r, n);
  }) : vd(e, t, r, n);
}
function wm(e) {
  _T(e).oldStyle = e.style;
}
var Xs = Math.max, qs = Math.min, Uh = {};
function wT(e) {
  return vt.extend(e);
}
var ST = Qx;
function xT(e, t) {
  return ST(e, t);
}
function Be(e, t) {
  Uh[e] = t;
}
function TT(e) {
  if (Uh.hasOwnProperty(e))
    return Uh[e];
}
function sf(e, t, r, n) {
  var i = jx(e, t);
  return r && (n === "center" && (r = xm(r, i.getBoundingRect())), Tm(i, r)), i;
}
function Sm(e, t, r) {
  var n = new er({
    style: {
      image: e,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(i) {
      if (r === "center") {
        var a = {
          width: i.width,
          height: i.height
        };
        n.setStyle(xm(t, a));
      }
    }
  });
  return n;
}
function xm(e, t) {
  var r = t.width / t.height, n = e.height * r, i;
  n <= e.width ? i = e.height : (n = e.width, i = n / r);
  var a = e.x + e.width / 2, o = e.y + e.height / 2;
  return {
    x: a - n / 2,
    y: o - i / 2,
    width: n,
    height: i
  };
}
var CT = Jx;
function Tm(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), n = r.calculateTransform(t);
    e.applyTransform(n);
  }
}
function ja(e, t) {
  return im(e, e, {
    lineWidth: t
  }), e;
}
function MT(e) {
  return am(e.shape, e.shape, e.style), e;
}
var DT = Tn;
function ms(e, t) {
  for (var r = Bc([]); e && e !== t; )
    _i(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function wi(e, t, r) {
  return t && !ee(t) && (t = Vc.getLocalTransform(t)), r && (t = Fc([], t)), be([], e, t);
}
function Cm(e, t, r) {
  var n = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), i = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [e === "left" ? -n : e === "right" ? n : 0, e === "top" ? -i : e === "bottom" ? i : 0];
  return a = wi(a, t, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function dd(e) {
  return !e.isGroup;
}
function AT(e) {
  return e.shape != null;
}
function Mm(e, t, r) {
  if (!e || !t)
    return;
  function n(o) {
    var s = {};
    return o.traverse(function(l) {
      dd(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function i(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return AT(o) && (s.shape = N({}, o.shape)), s;
  }
  var a = n(e);
  t.traverse(function(o) {
    if (dd(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = i(o);
        o.attr(i(s)), le(o, l, r, st(o).dataIndex);
      }
    }
  });
}
function IT(e, t) {
  return U(e, function(r) {
    var n = r[0];
    n = Xs(n, t.x), n = qs(n, t.x + t.width);
    var i = r[1];
    return i = Xs(i, t.y), i = qs(i, t.y + t.height), [n, i];
  });
}
function LT(e, t) {
  var r = Xs(e.x, t.x), n = qs(e.x + e.width, t.x + t.width), i = Xs(e.y, t.y), a = qs(e.y + e.height, t.y + t.height);
  if (n >= r && a >= i)
    return {
      x: r,
      y: i,
      width: n - r,
      height: a - i
    };
}
function lf(e, t, r) {
  var n = N({
    rectHover: !0
  }, t), i = n.style = {
    strokeNoScale: !0
  };
  if (r = r || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, e)
    return e.indexOf("image://") === 0 ? (i.image = e.slice(8), ht(i, r), new er(n)) : sf(e.replace("path://", ""), n, r, "center");
}
function $T(e, t, r, n, i) {
  for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
    var s = i[a];
    if (Dm(e, t, r, n, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Dm(e, t, r, n, i, a, o, s) {
  var l = r - e, u = n - t, h = o - i, c = s - a, f = Iu(h, c, l, u);
  if (PT(f))
    return !1;
  var v = e - i, d = t - a, g = Iu(v, d, l, u) / f;
  if (g < 0 || g > 1)
    return !1;
  var p = Iu(v, d, h, c) / f;
  return !(p < 0 || p > 1);
}
function Iu(e, t, r, n) {
  return e * n - r * t;
}
function PT(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function bl(e) {
  var t = e.itemTooltipOption, r = e.componentModel, n = e.itemName, i = H(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: n,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && C(mt(l), function(h) {
    On(s, h) || (s[h] = l[h], s.$vars.push(h));
  });
  var u = st(e.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: n,
    option: ht({
      content: n,
      encodeHTMLContent: !0,
      formatterParams: s
    }, i)
  };
}
function pd(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function go(e, t) {
  if (e)
    if (z(e))
      for (var r = 0; r < e.length; r++)
        pd(e[r], t);
    else
      pd(e, t);
}
Be("circle", yl);
Be("ellipse", tf);
Be("sector", Hi);
Be("ring", ef);
Be("polygon", ml);
Be("polyline", rf);
Be("rect", St);
Be("line", Wr);
Be("bezierCurve", nf);
Be("arc", _l);
const RT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: _l,
  BezierCurve: nf,
  BoundingRect: ut,
  Circle: yl,
  CompoundPath: pT,
  Ellipse: tf,
  Group: Mt,
  Image: er,
  IncrementalDisplayable: mT,
  Line: Wr,
  LinearGradient: af,
  OrientedBoundingRect: Us,
  Path: vt,
  Point: gt,
  Polygon: ml,
  Polyline: rf,
  RadialGradient: gT,
  Rect: St,
  Ring: ef,
  Sector: Hi,
  Text: Lt,
  applyTransform: wi,
  clipPointsByRect: IT,
  clipRectByRect: LT,
  createIcon: lf,
  extendPath: xT,
  extendShape: wT,
  getShapeClass: TT,
  getTransform: ms,
  groupTransition: Mm,
  initProps: pr,
  isElementRemoved: Ra,
  lineLineIntersect: Dm,
  linePolygonIntersect: $T,
  makeImage: Sm,
  makePath: sf,
  mergePath: CT,
  registerShape: Be,
  removeElement: Ys,
  removeElementWithFadeOut: Wh,
  resizePath: Tm,
  setTooltipConfig: bl,
  subPixelOptimize: DT,
  subPixelOptimizeLine: ja,
  subPixelOptimizeRect: MT,
  transformDirection: Cm,
  traverseElements: go,
  updateProps: le
}, Symbol.toStringTag, { value: "Module" }));
var wl = {};
function OT(e, t) {
  for (var r = 0; r < Ke.length; r++) {
    var n = Ke[r], i = t[n], a = e.ensureState(n);
    a.style = a.style || {}, a.style.text = i;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function gd(e, t, r) {
  var n = e.labelFetcher, i = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  n && (s = n.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = Z(e.defaultText) ? e.defaultText(i, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Ke.length; u++) {
    var h = Ke[u], c = t[h];
    l[h] = tt(n ? n.getFormattedLabel(i, h, null, a, c && c.get("formatter")) : null, s);
  }
  return l;
}
function yo(e, t, r, n) {
  r = r || wl;
  for (var i = e instanceof Lt, a = !1, o = 0; o < Jv.length; o++) {
    var s = t[Jv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = i ? e : e.getTextContent();
  if (a) {
    i || (l || (l = new Lt(), e.setTextContent(l)), e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = gd(r, t), h = t.normal, c = !!h.getShallow("show"), f = Xe(h, n && n.normal, r, !1, !i);
    f.text = u.normal, i || e.setTextConfig(yd(h, r, !1));
    for (var o = 0; o < Ke.length; o++) {
      var v = Ke[o], s = t[v];
      if (s) {
        var d = l.ensureState(v), g = !!tt(s.getShallow("show"), c);
        if (g !== c && (d.ignore = !g), d.style = Xe(s, n && n[v], r, !0, !i), d.style.text = u[v], !i) {
          var p = e.ensureState(v);
          p.textConfig = yd(s, r, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (f.x = l.style.x), l.style.y != null && (f.y = l.style.y), l.ignore = !c, l.useStyle(f), l.dirty(), r.enableTextSetter && (Sl(l).setLabelText = function(y) {
      var m = gd(r, t, y);
      OT(l, m);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function Li(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, n = 0; n < Ke.length; n++) {
    var i = Ke[n];
    r[i] = e.getModel([i, t]);
  }
  return r;
}
function Xe(e, t, r, n, i) {
  var a = {};
  return ET(a, e, r, n, i), t && N(a, t), a;
}
function yd(e, t, r) {
  t = t || {};
  var n = {}, i, a = e.getShallow("rotate"), o = tt(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return i = e.getShallow("position") || (r ? null : "inside"), i === "outside" && (i = t.defaultOutsidePosition || "top"), i != null && (n.position = i), s != null && (n.offset = s), a != null && (a *= Math.PI / 180, n.rotation = a), o != null && (n.distance = o), n.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", n;
}
function ET(e, t, r, n, i) {
  r = r || wl;
  var a = t.ecModel, o = a && a.option.textStyle, s = kT(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        wd(l[u] = {}, h, o, r, n, i, !1, !0);
      }
  }
  l && (e.rich = l);
  var c = t.get("overflow");
  c && (e.overflow = c);
  var f = t.get("minMargin");
  f != null && (e.margin = f), wd(e, t, o, r, n, i, !0, !1);
}
function kT(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || wl).rich;
    if (r) {
      t = t || {};
      for (var n = mt(r), i = 0; i < n.length; i++) {
        var a = n[i];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var md = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], _d = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], bd = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function wd(e, t, r, n, i, a, o, s) {
  r = !i && r || wl;
  var l = n && n.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), c = tt(t.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || r.color, h = h || r.textBorderColor), u != null && (e.fill = u), h != null && (e.stroke = h);
  var f = tt(t.getShallow("textBorderWidth"), r.textBorderWidth);
  f != null && (e.lineWidth = f);
  var v = tt(t.getShallow("textBorderType"), r.textBorderType);
  v != null && (e.lineDash = v);
  var d = tt(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  d != null && (e.lineDashOffset = d), !i && c == null && !s && (c = n && n.defaultOpacity), c != null && (e.opacity = c), !i && !a && e.fill == null && n.inheritColor && (e.fill = n.inheritColor);
  for (var g = 0; g < md.length; g++) {
    var p = md[g], y = tt(t.getShallow(p), r[p]);
    y != null && (e[p] = y);
  }
  for (var g = 0; g < _d.length; g++) {
    var p = _d[g], y = t.getShallow(p);
    y != null && (e[p] = y);
  }
  if (e.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (e.verticalAlign = m);
  }
  if (!o || !n.disableBox) {
    for (var g = 0; g < bd.length; g++) {
      var p = bd[g], y = t.getShallow(p);
      y != null && (e[p] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (e.borderDash = _), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && l && (e.backgroundColor = l), (e.borderColor === "auto" || e.borderColor === "inherit") && l && (e.borderColor = l);
  }
}
function NT(e, t) {
  var r = t && t.getModel("textStyle");
  return Ue([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var Sl = $t();
function BT(e, t, r, n) {
  if (e) {
    var i = Sl(e);
    i.prevValue = i.value, i.value = r;
    var a = t.normal;
    i.valueAnimation = a.get("valueAnimation"), i.valueAnimation && (i.precision = a.get("precision"), i.defaultInterpolatedText = n, i.statesModels = t);
  }
}
var zT = ["textStyle", "color"], Lu = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], $u = new Lt(), FT = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(zT) : null);
    }, e.prototype.getFont = function() {
      return NT({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, n = 0; n < Lu.length; n++)
        r[Lu[n]] = this.getShallow(Lu[n]);
      return $u.useStyle(r), $u.update(), $u.getBoundingRect();
    }, e;
  }()
), Am = [
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
], HT = Za(Am), VT = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return HT(this, t);
    }, e;
  }()
), Im = [
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
], GT = Za(Im), WT = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return GT(this, t, r);
    }, e;
  }()
), Tt = (
  /** @class */
  function() {
    function e(t, r, n) {
      this.parentModel = r, this.ecModel = n, this.option = t;
    }
    return e.prototype.init = function(t, r, n) {
    }, e.prototype.mergeOption = function(t, r) {
      ot(this.option, t, !0);
    }, e.prototype.get = function(t, r) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !r && this.parentModel);
    }, e.prototype.getShallow = function(t, r) {
      var n = this.option, i = n == null ? n : n[t];
      if (i == null && !r) {
        var a = this.parentModel;
        a && (i = a.getShallow(t));
      }
      return i;
    }, e.prototype.getModel = function(t, r) {
      var n = t != null, i = n ? this.parsePath(t) : null, a = n ? this._doGet(i) : this.option;
      return r = r || this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new e(a, r, this.ecModel);
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
      var n = this.option;
      if (!t)
        return n;
      for (var i = 0; i < t.length && !(t[i] && (n = n && typeof n == "object" ? n[t[i]] : null, n == null)); i++)
        ;
      return n == null && r && (n = r._doGet(this.resolveParentPath(t), r.parentModel)), n;
    }, e;
  }()
);
qc(Tt);
LS(Tt);
Je(Tt, VT);
Je(Tt, WT);
Je(Tt, ES);
Je(Tt, FT);
var UT = Math.round(Math.random() * 10);
function xl(e) {
  return [e || "", UT++].join("_");
}
function YT(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, n) {
    var i = Ye(r);
    t[i.main] = n;
  }, e.determineSubType = function(r, n) {
    var i = n.type;
    if (!i) {
      var a = Ye(r).main;
      e.hasSubTypes(r) && t[a] && (i = t[a](n));
    }
    return i;
  };
}
function XT(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), h = u.graph, c = u.noEntryList, f = {};
    for (C(a, function(m) {
      f[m] = !0;
    }); c.length; ) {
      var v = c.pop(), d = h[v], g = !!f[v];
      g && (s.call(l, v, d.originalDeps.slice()), delete f[v]), C(d.successor, g ? y : p);
    }
    C(f, function() {
      var m = "";
      throw new Error(m);
    });
    function p(m) {
      h[m].entryCount--, h[m].entryCount === 0 && c.push(m);
    }
    function y(m) {
      f[m] = !0, p(m);
    }
  };
  function r(a) {
    var o = {}, s = [];
    return C(a, function(l) {
      var u = n(o, l), h = u.originalDeps = t(l), c = i(h, a);
      u.entryCount = c.length, u.entryCount === 0 && s.push(l), C(c, function(f) {
        pt(u.predecessor, f) < 0 && u.predecessor.push(f);
        var v = n(o, f);
        pt(v.successor, f) < 0 && v.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function n(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function i(a, o) {
    var s = [];
    return C(a, function(l) {
      pt(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function Tl(e, t) {
  return ot(ot({}, e, !0), t, !0);
}
const qT = {
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
}, ZT = {
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
var Zs = "ZH", uf = "EN", Si = uf, _s = {}, hf = {}, Lm = X.domSupported ? function() {
  var e = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Si).toUpperCase()
  );
  return e.indexOf(Zs) > -1 ? Zs : Si;
}() : Si;
function $m(e, t) {
  e = e.toUpperCase(), hf[e] = new Tt(t), _s[e] = t;
}
function KT(e) {
  if (H(e)) {
    var t = _s[e.toUpperCase()] || {};
    return e === Zs || e === uf ? q(t) : ot(q(t), q(_s[Si]), !1);
  } else
    return ot(q(e), q(_s[Si]), !1);
}
function jT(e) {
  return hf[e];
}
function QT() {
  return hf[Si];
}
$m(uf, qT);
$m(Zs, ZT);
var cf = 1e3, ff = cf * 60, Oa = ff * 60, _e = Oa * 24, Sd = _e * 365, xa = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Bo = "{yyyy}-{MM}-{dd}", xd = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Bo,
  hour: Bo + " " + xa.hour,
  minute: Bo + " " + xa.minute,
  second: Bo + " " + xa.second,
  millisecond: xa.none
}, Pu = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Pm = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function Dr(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function xi(e) {
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
function JT(e) {
  return e === xi(e);
}
function tC(e) {
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
function Cl(e, t, r, n) {
  var i = dr(e), a = i[vf(r)](), o = i[Ti(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = i[Ml(r)](), u = i["get" + (r ? "UTC" : "") + "Day"](), h = i[Qa(r)](), c = (h - 1) % 12 + 1, f = i[Dl(r)](), v = i[Al(r)](), d = i[Il(r)](), g = h >= 12 ? "pm" : "am", p = g.toUpperCase(), y = n instanceof Tt ? n : jT(n || Lm) || QT(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), S = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Dr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, Dr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Dr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Dr(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Dr(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Dr(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, Dr(v, 2)).replace(/{s}/g, v + "").replace(/{SSS}/g, Dr(d, 3)).replace(/{S}/g, d + "");
}
function eC(e, t, r, n, i) {
  var a = null;
  if (H(r))
    a = r;
  else if (Z(r))
    a = r(e.value, t, {
      level: e.level
    });
  else {
    var o = N({}, xa);
    if (e.level > 0)
      for (var s = 0; s < Pu.length; ++s)
        o[Pu[s]] = "{primary|" + o[Pu[s]] + "}";
    var l = r ? r.inherit === !1 ? r : ht(r, o) : o, u = Rm(e.value, i);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = Pm.indexOf(u), s = h - 1; s >= 0; --s)
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
  return Cl(new Date(e.value), a, i, n);
}
function Rm(e, t) {
  var r = dr(e), n = r[Ti(t)]() + 1, i = r[Ml(t)](), a = r[Qa(t)](), o = r[Dl(t)](), s = r[Al(t)](), l = r[Il(t)](), u = l === 0, h = u && s === 0, c = h && o === 0, f = c && a === 0, v = f && i === 1, d = v && n === 1;
  return d ? "year" : v ? "month" : f ? "day" : c ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function Td(e, t, r) {
  var n = _t(e) ? dr(e) : e;
  switch (t = t || Rm(e, r), t) {
    case "year":
      return n[vf(r)]();
    case "half-year":
      return n[Ti(r)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((n[Ti(r)]() + 1) / 4);
    case "month":
      return n[Ti(r)]();
    case "day":
      return n[Ml(r)]();
    case "half-day":
      return n[Qa(r)]() / 24;
    case "hour":
      return n[Qa(r)]();
    case "minute":
      return n[Dl(r)]();
    case "second":
      return n[Al(r)]();
    case "millisecond":
      return n[Il(r)]();
  }
}
function vf(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function Ti(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function Ml(e) {
  return e ? "getUTCDate" : "getDate";
}
function Qa(e) {
  return e ? "getUTCHours" : "getHours";
}
function Dl(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function Al(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function Il(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function rC(e) {
  return e ? "setUTCFullYear" : "setFullYear";
}
function Om(e) {
  return e ? "setUTCMonth" : "setMonth";
}
function Em(e) {
  return e ? "setUTCDate" : "setDate";
}
function km(e) {
  return e ? "setUTCHours" : "setHours";
}
function Nm(e) {
  return e ? "setUTCMinutes" : "setMinutes";
}
function Bm(e) {
  return e ? "setUTCSeconds" : "setSeconds";
}
function zm(e) {
  return e ? "setUTCMilliseconds" : "setMilliseconds";
}
function Fm(e) {
  if (!lS(e))
    return H(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function Hm(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, n) {
    return n.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var mo = by;
function Yh(e, t, r) {
  var n = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function i(h) {
    return h && Ue(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = e instanceof Date;
  if (o || s) {
    var l = o ? dr(e) : e;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Cl(l, n, r);
  }
  if (t === "ordinal")
    return yh(e) ? i(e) : _t(e) && a(e) ? e + "" : "-";
  var u = Hs(e);
  return a(u) ? Fm(u) : yh(e) ? i(e) : typeof e == "boolean" ? e + "" : "-";
}
var Cd = ["a", "b", "c", "d", "e", "f", "g"], Ru = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Vm(e, t, r) {
  z(t) || (t = [t]);
  var n = t.length;
  if (!n)
    return "";
  for (var i = t[0].$vars || [], a = 0; a < i.length; a++) {
    var o = Cd[a];
    e = e.replace(Ru(o), Ru(o, 0));
  }
  for (var s = 0; s < n; s++)
    for (var l = 0; l < i.length; l++) {
      var u = t[s][i[l]];
      e = e.replace(Ru(Cd[l], s), r ? jt(u) : u);
    }
  return e;
}
function nC(e, t) {
  var r = H(e) ? {
    color: e,
    extraCssText: t
  } : e || {}, n = r.color, i = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!n)
    return "";
  if (a === "html")
    return i === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + jt(n) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + jt(n) + ";" + (t || "") + '"></span>';
  var o = r.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: i === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: n
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: n
    }
  };
}
function Nn(e, t) {
  return t = t || "transparent", H(e) ? e : V(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var bs = C, iC = ["left", "right", "top", "bottom", "width", "height"], zo = [["width", "left", "right"], ["height", "top", "bottom"]];
function df(e, t, r, n, i) {
  var a = 0, o = 0;
  n == null && (n = 1 / 0), i == null && (i = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), c = t.childAt(u + 1), f = c && c.getBoundingRect(), v, d;
    if (e === "horizontal") {
      var g = h.width + (f ? -f.x + h.x : 0);
      v = a + g, v > n || l.newline ? (a = 0, v = g, o += s + r, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (f ? -f.y + h.y : 0);
      d = o + p, d > i || l.newline ? (a += s + r, o = 0, d = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = v + r : o = d + r);
  });
}
var Ci = df;
It(df, "vertical");
It(df, "horizontal");
function $i(e, t, r) {
  r = mo(r || 0);
  var n = t.width, i = t.height, a = Ut(e.left, n), o = Ut(e.top, i), s = Ut(e.right, n), l = Ut(e.bottom, i), u = Ut(e.width, n), h = Ut(e.height, i), c = r[2] + r[0], f = r[1] + r[3], v = e.aspect;
  switch (isNaN(u) && (u = n - s - f - a), isNaN(h) && (h = i - l - c - o), v != null && (isNaN(u) && isNaN(h) && (v > n / i ? u = n * 0.8 : h = i * 0.8), isNaN(u) && (u = v * h), isNaN(h) && (h = u / v)), isNaN(a) && (a = n - s - u - f), isNaN(o) && (o = i - l - h - c), e.left || e.right) {
    case "center":
      a = n / 2 - u / 2 - r[3];
      break;
    case "right":
      a = n - u - f;
      break;
  }
  switch (e.top || e.bottom) {
    case "middle":
    case "center":
      o = i / 2 - h / 2 - r[0];
      break;
    case "bottom":
      o = i - h - c;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = n - f - a - (s || 0)), isNaN(h) && (h = i - c - o - (l || 0));
  var d = new ut(a + r[3], o + r[0], u, h);
  return d.margin = r, d;
}
function aC(e, t, r, n, i, a) {
  a = a || e, a.x = e.x, a.y = e.y;
  var o;
  if (o = e.getBoundingRect(), e.needLocalTransform()) {
    var s = e.getLocalTransform();
    o = o.clone(), o.applyTransform(s);
  }
  var l = $i(ht({
    width: o.width,
    height: o.height
  }, t), r, n), u = l.x - o.x, h = l.y - o.y;
  return a.x += u, a.y += h, a === e && e.markRedraw(), !0;
}
function Ja(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return V(t) ? t : t ? {
    type: t
  } : null;
}
function Pi(e, t, r) {
  var n = r && r.ignoreSize;
  !z(n) && (n = [n, n]);
  var i = o(zo[0], 0), a = o(zo[1], 1);
  u(zo[0], e, i), u(zo[1], e, a);
  function o(h, c) {
    var f = {}, v = 0, d = {}, g = 0, p = 2;
    if (bs(h, function(_) {
      d[_] = e[_];
    }), bs(h, function(_) {
      s(t, _) && (f[_] = d[_] = t[_]), l(f, _) && v++, l(d, _) && g++;
    }), n[c])
      return l(t, h[1]) ? d[h[2]] = null : l(t, h[2]) && (d[h[1]] = null), d;
    if (g === p || !v)
      return d;
    if (v >= p)
      return f;
    for (var y = 0; y < h.length; y++) {
      var m = h[y];
      if (!s(f, m) && s(e, m)) {
        f[m] = e[m];
        break;
      }
    }
    return f;
  }
  function s(h, c) {
    return h.hasOwnProperty(c);
  }
  function l(h, c) {
    return h[c] != null && h[c] !== "auto";
  }
  function u(h, c, f) {
    bs(h, function(v) {
      c[v] = f[v];
    });
  }
}
function Ll(e) {
  return oC({}, e);
}
function oC(e, t) {
  return t && e && bs(iC, function(r) {
    t.hasOwnProperty(r) && (e[r] = t[r]);
  }), e;
}
var sC = $t(), ct = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i) {
      var a = e.call(this, r, n, i) || this;
      return a.uid = xl("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i);
    }, t.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = Ja(this), a = i ? Ll(r) : {}, o = n.getTheme();
      ot(r, o.get(this.mainType)), ot(r, this.getDefaultOption()), i && Pi(r, a, i);
    }, t.prototype.mergeOption = function(r, n) {
      ot(this.option, r, !0);
      var i = Ja(this);
      i && Pi(this.option, r, i);
    }, t.prototype.optionUpdated = function(r, n) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!DS(r))
        return r.defaultOption;
      var n = sC(this);
      if (!n.defaultOption) {
        for (var i = [], a = r; a; ) {
          var o = a.prototype.defaultOption;
          o && i.push(o), a = a.superClass;
        }
        for (var s = {}, l = i.length - 1; l >= 0; l--)
          s = ot(s, i[l], !0);
        n.defaultOption = s;
      }
      return n.defaultOption;
    }, t.prototype.getReferringComponents = function(r, n) {
      var i = r + "Index", a = r + "Id";
      return vo(this.ecModel, r, {
        index: this.get(i, !0),
        id: this.get(a, !0)
      }, n);
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
  }(Tt)
);
jy(ct, Tt);
cl(ct);
YT(ct);
XT(ct, lC);
function lC(e) {
  var t = [];
  return C(ct.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = U(t, function(r) {
    return Ye(r).main;
  }), e !== "dataset" && pt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Gm = "";
typeof navigator < "u" && (Gm = navigator.platform || "");
var Jn = "rgba(0, 0, 0, 0.2)";
const uC = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: Jn,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: Jn,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: Jn,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: Jn,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: Jn,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: Jn,
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
    fontFamily: Gm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Wm = Q(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Te = "original", ne = "arrayRows", rr = "objectRows", xr = "keyedColumns", Hr = "typedArray", Um = "unknown", fr = "column", Vi = "row", ae = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, Ym = $t();
function hC(e) {
  Ym(e).datasetMap = Q();
}
function cC(e, t, r) {
  var n = {}, i = Xm(t);
  if (!i || !e)
    return n;
  var a = [], o = [], s = t.ecModel, l = Ym(s).datasetMap, u = i.uid + "_" + r.seriesLayoutBy, h, c;
  e = e.slice(), C(e, function(g, p) {
    var y = V(g) ? g : e[p] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = p, c = d(y)), n[y.name] = [];
  });
  var f = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  C(e, function(g, p) {
    var y = g.name, m = d(g);
    if (h == null) {
      var _ = f.valueWayDim;
      v(n[y], _, m), v(o, _, m), f.valueWayDim += m;
    } else if (h === p)
      v(n[y], 0, m), v(a, 0, m);
    else {
      var _ = f.categoryWayDim;
      v(n[y], _, m), v(o, _, m), f.categoryWayDim += m;
    }
  });
  function v(g, p, y) {
    for (var m = 0; m < y; m++)
      g.push(p + m);
  }
  function d(g) {
    var p = g.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (n.itemName = a), o.length && (n.seriesName = o), n;
}
function Xm(e) {
  var t = e.get("data", !0);
  if (!t)
    return vo(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, $e).models[0];
}
function fC(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : vo(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, $e).models;
}
function qm(e, t) {
  return vC(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function vC(e, t, r, n, i, a) {
  var o, s = 5;
  if (re(e))
    return ae.Not;
  var l, u;
  if (n) {
    var h = n[a];
    V(h) ? (l = h.name, u = h.type) : H(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? ae.Must : ae.Not;
  if (t === ne) {
    var c = e;
    if (r === Vi) {
      for (var f = c[a], v = 0; v < (f || []).length && v < s; v++)
        if ((o = b(f[i + v])) != null)
          return o;
    } else
      for (var v = 0; v < c.length && v < s; v++) {
        var d = c[i + v];
        if (d && (o = b(d[a])) != null)
          return o;
      }
  } else if (t === rr) {
    var g = e;
    if (!l)
      return ae.Not;
    for (var v = 0; v < g.length && v < s; v++) {
      var p = g[v];
      if (p && (o = b(p[l])) != null)
        return o;
    }
  } else if (t === xr) {
    var y = e;
    if (!l)
      return ae.Not;
    var f = y[l];
    if (!f || re(f))
      return ae.Not;
    for (var v = 0; v < f.length && v < s; v++)
      if ((o = b(f[v])) != null)
        return o;
  } else if (t === Te)
    for (var m = e, v = 0; v < m.length && v < s; v++) {
      var p = m[v], _ = fo(p);
      if (!z(_))
        return ae.Not;
      if ((o = b(_[a])) != null)
        return o;
    }
  function b(S) {
    var w = H(S);
    if (S != null && Number.isFinite(Number(S)) && S !== "")
      return w ? ae.Might : ae.Not;
    if (w && S !== "-")
      return ae.Must;
  }
  return ae.Not;
}
var dC = Q();
function pC(e, t, r) {
  var n = dC.get(t);
  if (!n)
    return r;
  var i = n(e);
  return i ? r.concat(i) : r;
}
var Md = $t();
$t();
var pf = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, n) {
      var i = kt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return yC(this, Md, i, a, t, r, n);
    }, e.prototype.clearColorPalette = function() {
      mC(this, Md);
    }, e;
  }()
);
function gC(e, t) {
  for (var r = e.length, n = 0; n < r; n++)
    if (e[n].length > t)
      return e[n];
  return e[r - 1];
}
function yC(e, t, r, n, i, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(i))
    return u[i];
  var h = o == null || !n ? r : gC(n, o);
  if (h = h || r, !(!h || !h.length)) {
    var c = h[l];
    return i && (u[i] = c), s.paletteIdx = (l + 1) % h.length, c;
  }
}
function mC(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var Fo, ia, Dd, Ad = "\0_ec_inner", _C = 1, gf = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, n, i, a, o, s) {
      a = a || {}, this.option = null, this._theme = new Tt(a), this._locale = new Tt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, n, i) {
      var a = $d(n);
      this._optionManager.setOption(r, i, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, n) {
      return this._resetOption(r, $d(n));
    }, t.prototype._resetOption = function(r, n) {
      var i = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? Dd(this, o) : (this.restoreData(), this._mergeOption(o, n)), i = !0;
      }
      if ((r === "timeline" || r === "media") && this.restoreData(), !r || r === "recreate" || r === "timeline") {
        var s = a.getTimelineOption(this);
        s && (i = !0, this._mergeOption(s, n));
      }
      if (!r || r === "recreate" || r === "media") {
        var l = a.getMediaOption(this);
        l.length && C(l, function(u) {
          i = !0, this._mergeOption(u, n);
        }, this);
      }
      return i;
    }, t.prototype.mergeOption = function(r) {
      this._mergeOption(r, null);
    }, t.prototype._mergeOption = function(r, n) {
      var i = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = Q(), u = n && n.replaceMergeMainTypeMap;
      hC(this), C(r, function(c, f) {
        c != null && (ct.hasClass(f) ? f && (s.push(f), l.set(f, !0)) : i[f] = i[f] == null ? q(c) : ot(i[f], c, !0));
      }), u && u.each(function(c, f) {
        ct.hasClass(f) && !l.get(f) && (s.push(f), l.set(f, !0));
      }), ct.topologicalTravel(s, ct.getAllClassMainTypes(), h, this);
      function h(c) {
        var f = pC(this, c, kt(r[c])), v = a.get(c), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          v ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = cS(v, f, d);
        mS(g, c, ct), i[c] = null, a.set(c, null), o.set(c, 0);
        var p = [], y = [], m = 0, _;
        C(g, function(b, S) {
          var w = b.existing, x = b.newOption;
          if (!x)
            w && (w.mergeOption({}, this), w.optionUpdated({}, !1));
          else {
            var M = c === "series", D = ct.getClass(
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
        }, this), i[c] = p, a.set(c, y), o.set(c, m), c === "series" && Fo(this);
      }
      this._seriesIndices || Fo(this);
    }, t.prototype.getOption = function() {
      var r = q(this.option);
      return C(r, function(n, i) {
        if (ct.hasClass(i)) {
          for (var a = kt(n), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !qa(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[i] = a;
        }
      }), delete r[Ad], r;
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(r) {
      this._payload = r;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(r, n) {
      var i = this._componentsMap.get(r);
      if (i) {
        var a = i[n || 0];
        if (a)
          return a;
        if (n == null) {
          for (var o = 0; o < i.length; o++)
            if (i[o])
              return i[o];
        }
      }
    }, t.prototype.queryComponents = function(r) {
      var n = r.mainType;
      if (!n)
        return [];
      var i = r.index, a = r.id, o = r.name, s = this._componentsMap.get(n);
      if (!s || !s.length)
        return [];
      var l;
      return i != null ? (l = [], C(kt(i), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Id("id", a, s) : o != null ? l = Id("name", o, s) : l = Ot(s, function(u) {
        return !!u;
      }), Ld(l, r);
    }, t.prototype.findComponents = function(r) {
      var n = r.query, i = r.mainType, a = s(n), o = a ? this.queryComponents(a) : Ot(this._componentsMap.get(i), function(u) {
        return !!u;
      });
      return l(Ld(o, r));
      function s(u) {
        var h = i + "Index", c = i + "Id", f = i + "Name";
        return u && (u[h] != null || u[c] != null || u[f] != null) ? {
          mainType: i,
          // subType will be filtered finally.
          index: u[h],
          id: u[c],
          name: u[f]
        } : null;
      }
      function l(u) {
        return r.filter ? Ot(u, r.filter) : u;
      }
    }, t.prototype.eachComponent = function(r, n, i) {
      var a = this._componentsMap;
      if (Z(r)) {
        var o = n, s = r;
        a.each(function(c, f) {
          for (var v = 0; c && v < c.length; v++) {
            var d = c[v];
            d && s.call(o, f, d, d.componentIndex);
          }
        });
      } else
        for (var l = H(r) ? a.get(r) : V(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && n.call(i, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var n = Re(r, null);
      return Ot(this._componentsMap.get("series"), function(i) {
        return !!i && n != null && i.name === n;
      });
    }, t.prototype.getSeriesByIndex = function(r) {
      return this._componentsMap.get("series")[r];
    }, t.prototype.getSeriesByType = function(r) {
      return Ot(this._componentsMap.get("series"), function(n) {
        return !!n && n.subType === r;
      });
    }, t.prototype.getSeries = function() {
      return Ot(this._componentsMap.get("series"), function(r) {
        return !!r;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(r, n) {
      ia(this), C(this._seriesIndices, function(i) {
        var a = this._componentsMap.get("series")[i];
        r.call(n, a, i);
      }, this);
    }, t.prototype.eachRawSeries = function(r, n) {
      C(this._componentsMap.get("series"), function(i) {
        i && r.call(n, i, i.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, n, i) {
      ia(this), C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && n.call(i, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, n, i) {
      return C(this.getSeriesByType(r), n, i);
    }, t.prototype.isSeriesFiltered = function(r) {
      return ia(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, n) {
      ia(this);
      var i = [];
      C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(n, o, a) && i.push(a);
      }, this), this._seriesIndices = i, this._seriesIndicesMap = Q(i);
    }, t.prototype.restoreData = function(r) {
      Fo(this);
      var n = this._componentsMap, i = [];
      n.each(function(a, o) {
        ct.hasClass(o) && i.push(o);
      }), ct.topologicalTravel(i, ct.getAllClassMainTypes(), function(a) {
        C(n.get(a), function(o) {
          o && (a !== "series" || !bC(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      Fo = function(r) {
        var n = r._seriesIndices = [];
        C(r._componentsMap.get("series"), function(i) {
          i && n.push(i.componentIndex);
        }), r._seriesIndicesMap = Q(n);
      }, ia = function(r) {
      }, Dd = function(r, n) {
        r.option = {}, r.option[Ad] = _C, r._componentsMap = Q({
          series: []
        }), r._componentsCount = Q();
        var i = n.aria;
        V(i) && i.enabled == null && (i.enabled = !0), wC(n, r._theme.option), ot(n, uC, !1), r._mergeOption(n, null);
      };
    }(), t;
  }(Tt)
);
function bC(e, t) {
  if (t) {
    var r = t.seriesIndex, n = t.seriesId, i = t.seriesName;
    return r != null && e.componentIndex !== r || n != null && e.id !== n || i != null && e.name !== i;
  }
}
function wC(e, t) {
  var r = e.color && !e.colorLayer;
  C(t, function(n, i) {
    i === "colorLayer" && r || ct.hasClass(i) || (typeof n == "object" ? e[i] = e[i] ? ot(e[i], n, !1) : q(n) : e[i] == null && (e[i] = n));
  });
}
function Id(e, t, r) {
  if (z(t)) {
    var n = Q();
    return C(t, function(a) {
      if (a != null) {
        var o = Re(a, null);
        o != null && n.set(a, !0);
      }
    }), Ot(r, function(a) {
      return a && n.get(a[e]);
    });
  } else {
    var i = Re(t, null);
    return Ot(r, function(a) {
      return a && i != null && a[e] === i;
    });
  }
}
function Ld(e, t) {
  return t.hasOwnProperty("subType") ? Ot(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function $d(e) {
  var t = Q();
  return e && C(kt(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Je(gf, pf);
var SC = [
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
], Zm = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      C(SC, function(r) {
        this[r] = J(t[r], t);
      }, this);
    }
    return e;
  }()
), Ou = {}, $l = (
  /** @class */
  function() {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function(t, r) {
      var n = [];
      C(Ou, function(i, a) {
        var o = i.create(t, r);
        n = n.concat(o || []);
      }), this._coordinateSystems = n;
    }, e.prototype.update = function(t, r) {
      C(this._coordinateSystems, function(n) {
        n.update && n.update(t, r);
      });
    }, e.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, e.register = function(t, r) {
      Ou[t] = r;
    }, e.get = function(t) {
      return Ou[t];
    }, e;
  }()
), xC = /^(min|max)?(.+)$/, TC = (
  /** @class */
  function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, n) {
      t && (C(kt(t.series), function(o) {
        o && o.data && re(o.data) && mh(o.data);
      }), C(kt(t.dataset), function(o) {
        o && o.source && re(o.source) && mh(o.source);
      })), t = q(t);
      var i = this._optionBackup, a = CC(t, r, !i);
      this._newBaseOption = a.baseOption, i ? (a.timelineOptions.length && (i.timelineOptions = a.timelineOptions), a.mediaList.length && (i.mediaList = a.mediaList), a.mediaDefault && (i.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, e.prototype.mountOption = function(t) {
      var r = this._optionBackup;
      return this._timelineOptions = r.timelineOptions, this._mediaList = r.mediaList, this._mediaDefault = r.mediaDefault, this._currentMediaIndices = [], q(t ? r.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function(t) {
      var r, n = this._timelineOptions;
      if (n.length) {
        var i = t.getComponent("timeline");
        i && (r = q(
          // FIXME:TS as TimelineModel or quivlant interface
          n[i.getCurrentIndex()]
        ));
      }
      return r;
    }, e.prototype.getMediaOption = function(t) {
      var r = this._api.getWidth(), n = this._api.getHeight(), i = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!i.length && !a)
        return s;
      for (var l = 0, u = i.length; l < u; l++)
        MC(i[l].query, r, n) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !AC(o, this._currentMediaIndices) && (s = U(o, function(h) {
        return q(h === -1 ? a.option : i[h].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  }()
);
function CC(e, t, r) {
  var n = [], i, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, h = !!e.media, c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || h) && (e.options = e.media = null), a = e), h && z(u) && C(u, function(v) {
    v && v.option && (v.query ? n.push(v) : i || (i = v));
  }), f(a), C(l, function(v) {
    return f(v);
  }), C(n, function(v) {
    return f(v.option);
  });
  function f(v) {
    C(t, function(d) {
      d(v, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: i,
    mediaList: n
  };
}
function MC(e, t, r) {
  var n = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, i = !0;
  return C(e, function(a, o) {
    var s = o.match(xC);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      DC(n[u], a, l) || (i = !1);
    }
  }), i;
}
function DC(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function AC(e, t) {
  return e.join(",") === t.join(",");
}
var Me = C, to = V, Pd = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Eu(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, n = Pd.length; r < n; r++) {
      var i = Pd[r], a = t.normal, o = t.emphasis;
      a && a[i] && (e[i] = e[i] || {}, e[i].normal ? ot(e[i].normal, a[i]) : e[i].normal = a[i], a[i] = null), o && o[i] && (e[i] = e[i] || {}, e[i].emphasis ? ot(e[i].emphasis, o[i]) : e[i].emphasis = o[i], o[i] = null);
    }
}
function Ft(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var n = e[t].normal, i = e[t].emphasis;
    n && (r ? (e[t].normal = e[t].emphasis = null, ht(e[t], n)) : e[t] = n), i && (e.emphasis = e.emphasis || {}, e.emphasis[t] = i, i.focus && (e.emphasis.focus = i.focus), i.blurScope && (e.emphasis.blurScope = i.blurScope));
  }
}
function Ta(e) {
  Ft(e, "itemStyle"), Ft(e, "lineStyle"), Ft(e, "areaStyle"), Ft(e, "label"), Ft(e, "labelLine"), Ft(e, "upperLabel"), Ft(e, "edgeLabel");
}
function Ct(e, t) {
  var r = to(e) && e[t], n = to(r) && r.textStyle;
  if (n)
    for (var i = 0, a = Ov.length; i < a; i++) {
      var o = Ov[i];
      n.hasOwnProperty(o) && (r[o] = n[o]);
    }
}
function de(e) {
  e && (Ta(e), Ct(e, "label"), e.emphasis && Ct(e.emphasis, "label"));
}
function IC(e) {
  if (to(e)) {
    Eu(e), Ta(e), Ct(e, "label"), Ct(e, "upperLabel"), Ct(e, "edgeLabel"), e.emphasis && (Ct(e.emphasis, "label"), Ct(e.emphasis, "upperLabel"), Ct(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (Eu(t), de(t));
    var r = e.markLine;
    r && (Eu(r), de(r));
    var n = e.markArea;
    n && de(n);
    var i = e.data;
    if (e.type === "graph") {
      i = i || e.nodes;
      var a = e.links || e.edges;
      if (a && !re(a))
        for (var o = 0; o < a.length; o++)
          de(a[o]);
      C(e.categories, function(u) {
        Ta(u);
      });
    }
    if (i && !re(i))
      for (var o = 0; o < i.length; o++)
        de(i[o]);
    if (t = e.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        de(s[o]);
    if (r = e.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        z(l[o]) ? (de(l[o][0]), de(l[o][1])) : de(l[o]);
    e.type === "gauge" ? (Ct(e, "axisLabel"), Ct(e, "title"), Ct(e, "detail")) : e.type === "treemap" ? (Ft(e.breadcrumb, "itemStyle"), C(e.levels, function(u) {
      Ta(u);
    })) : e.type === "tree" && Ta(e.leaves);
  }
}
function ar(e) {
  return z(e) ? e : e ? [e] : [];
}
function Rd(e) {
  return (z(e) ? e[0] : e) || {};
}
function LC(e, t) {
  Me(ar(e.series), function(n) {
    to(n) && IC(n);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Me(r, function(n) {
    Me(ar(e[n]), function(i) {
      i && (Ct(i, "axisLabel"), Ct(i.axisPointer, "label"));
    });
  }), Me(ar(e.parallel), function(n) {
    var i = n && n.parallelAxisDefault;
    Ct(i, "axisLabel"), Ct(i && i.axisPointer, "label");
  }), Me(ar(e.calendar), function(n) {
    Ft(n, "itemStyle"), Ct(n, "dayLabel"), Ct(n, "monthLabel"), Ct(n, "yearLabel");
  }), Me(ar(e.radar), function(n) {
    Ct(n, "name"), n.name && n.axisName == null && (n.axisName = n.name, delete n.name), n.nameGap != null && n.axisNameGap == null && (n.axisNameGap = n.nameGap, delete n.nameGap);
  }), Me(ar(e.geo), function(n) {
    to(n) && (de(n), Me(ar(n.regions), function(i) {
      de(i);
    }));
  }), Me(ar(e.timeline), function(n) {
    de(n), Ft(n, "label"), Ft(n, "itemStyle"), Ft(n, "controlStyle", !0);
    var i = n.data;
    z(i) && C(i, function(a) {
      V(a) && (Ft(a, "label"), Ft(a, "itemStyle"));
    });
  }), Me(ar(e.toolbox), function(n) {
    Ft(n, "iconStyle"), Me(n.feature, function(i) {
      Ft(i, "iconStyle");
    });
  }), Ct(Rd(e.axisPointer), "label"), Ct(Rd(e.tooltip).axisPointer, "label");
}
function $C(e, t) {
  for (var r = t.split(","), n = e, i = 0; i < r.length && (n = n && n[r[i]], n != null); i++)
    ;
  return n;
}
function PC(e, t, r, n) {
  for (var i = t.split(","), a = e, o, s = 0; s < i.length - 1; s++)
    o = i[s], a[o] == null && (a[o] = {}), a = a[o];
  a[i[s]] == null && (a[i[s]] = r);
}
function Od(e) {
  e && C(RC, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var RC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], OC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], ku = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function aa(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < ku.length; r++) {
      var n = ku[r][1], i = ku[r][0];
      t[n] != null && (t[i] = t[n]);
    }
}
function Ed(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function kd(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function EC(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function Km(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && Km(e[r].children, t);
}
function jm(e, t) {
  LC(e, t), e.series = kt(e.series), C(e.series, function(r) {
    if (V(r)) {
      var n = r.type;
      if (n === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (n === "pie" || n === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), Ed(r.label);
        var i = r.data;
        if (i && !re(i))
          for (var a = 0; a < i.length; a++)
            Ed(i[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (n === "gauge") {
        var o = $C(r, "pointer.color");
        o != null && PC(r, "itemStyle.color", o);
      } else if (n === "bar") {
        aa(r), aa(r.backgroundStyle), aa(r.emphasis);
        var i = r.data;
        if (i && !re(i))
          for (var a = 0; a < i.length; a++)
            typeof i[a] == "object" && (aa(i[a]), aa(i[a] && i[a].emphasis));
      } else if (n === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), kd(r), Km(r.data, kd);
      } else n === "graph" || n === "sankey" ? EC(r) : n === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && ht(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Od(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), C(OC, function(r) {
    var n = e[r];
    n && (z(n) || (n = [n]), C(n, function(i) {
      Od(i);
    }));
  });
}
function kC(e) {
  var t = Q();
  e.eachSeries(function(r) {
    var n = r.get("stack");
    if (n) {
      var i = t.get(n) || t.set(n, []), a = r.getData(), o = {
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
      i.length && a.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(o);
    }
  }), t.each(NC);
}
function NC(e) {
  C(e, function(t, r) {
    var n = [], i = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, c) {
      var f = o.get(t.stackedDimension, c);
      if (isNaN(f))
        return i;
      var v, d;
      s ? d = o.getRawIndex(c) : v = o.get(t.stackedByDimension, c);
      for (var g = NaN, p = r - 1; p >= 0; p--) {
        var y = e[p];
        if (s || (d = y.data.rawIndexOf(y.stackedByDimension, v)), d >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && f >= 0 && m > 0 || l === "samesign" && f <= 0 && m < 0) {
            f = aS(f, m), g = m;
            break;
          }
        }
      }
      return n[0] = f, n[1] = g, n;
    });
  });
}
var Pl = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === xr ? {} : []), this.sourceFormat = t.sourceFormat || Um, this.seriesLayoutBy = t.seriesLayoutBy || fr, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var n = 0; n < r.length; n++) {
          var i = r[n];
          i.type == null && qm(this, n) === ae.Must && (i.type = "ordinal");
        }
    }
    return e;
  }()
);
function yf(e) {
  return e instanceof Pl;
}
function Xh(e, t, r) {
  r = r || Jm(e);
  var n = t.seriesLayoutBy, i = zC(e, r, n, t.sourceHeader, t.dimensions), a = new Pl({
    data: e,
    sourceFormat: r,
    seriesLayoutBy: n,
    dimensionsDefine: i.dimensionsDefine,
    startIndex: i.startIndex,
    dimensionsDetectedCount: i.dimensionsDetectedCount,
    metaRawOption: q(t)
  });
  return a;
}
function Qm(e) {
  return new Pl({
    data: e,
    sourceFormat: re(e) ? Hr : Te
  });
}
function BC(e) {
  return new Pl({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: q(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function Jm(e) {
  var t = Um;
  if (re(e))
    t = Hr;
  else if (z(e)) {
    e.length === 0 && (t = ne);
    for (var r = 0, n = e.length; r < n; r++) {
      var i = e[r];
      if (i != null) {
        if (z(i) || re(i)) {
          t = ne;
          break;
        } else if (V(i)) {
          t = rr;
          break;
        }
      }
    }
  } else if (V(e)) {
    for (var a in e)
      if (On(e, a) && ee(e[a])) {
        t = xr;
        break;
      }
  }
  return t;
}
function zC(e, t, r, n, i) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: Nd(i),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === ne) {
    var s = e;
    n === "auto" || n == null ? Bd(function(u) {
      u != null && u !== "-" && (H(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = _t(n) ? n : n ? 1 : 0, !i && o === 1 && (i = [], Bd(function(u, h) {
      i[h] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = i ? i.length : r === Vi ? s.length : s[0] ? s[0].length : null;
  } else if (t === rr)
    i || (i = FC(e));
  else if (t === xr)
    i || (i = [], C(e, function(u, h) {
      i.push(h);
    }));
  else if (t === Te) {
    var l = fo(e[0]);
    a = z(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Nd(i),
    dimensionsDetectedCount: a
  };
}
function FC(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return mt(r);
}
function Nd(e) {
  if (e) {
    var t = Q();
    return U(e, function(r, n) {
      r = V(r) ? r : {
        name: r
      };
      var i = {
        name: r.name,
        displayName: r.displayName,
        type: r.type
      };
      if (i.name == null)
        return i;
      i.name += "", i.displayName == null && (i.displayName = i.name);
      var a = t.get(i.name);
      return a ? i.name += "-" + a.count++ : t.set(i.name, {
        count: 1
      }), i;
    });
  }
}
function Bd(e, t, r, n) {
  if (t === Vi)
    for (var i = 0; i < r.length && i < n; i++)
      e(r[i] ? r[i][0] : null, i);
  else
    for (var a = r[0] || [], i = 0; i < a.length && i < n; i++)
      e(a[i], i);
}
function t_(e) {
  var t = e.sourceFormat;
  return t === rr || t === xr;
}
var pn, gn, yn, zd, Fd, e_ = (
  /** @class */
  function() {
    function e(t, r) {
      var n = yf(t) ? t : Qm(t);
      this._source = n;
      var i = this._data = n.data;
      n.sourceFormat === Hr && (this._offset = 0, this._dimSize = r, this._data = i), Fd(this, i, n);
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
      Fd = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, c = l.startIndex, f = l.dimensionsDefine, v = zd[mf(u, h)];
        if (N(o, v), u === Hr)
          o.getItem = r, o.count = i, o.fillStorage = n;
        else {
          var d = r_(u, h);
          o.getItem = J(d, null, s, c, f);
          var g = n_(u, h);
          o.count = J(g, null, s, c, f);
        }
      };
      var r = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, h = u * o, c = 0; c < u; c++)
          s[c] = l[h + c];
        return s;
      }, n = function(o, s, l, u) {
        for (var h = this._data, c = this._dimSize, f = 0; f < c; f++) {
          for (var v = u[f], d = v[0] == null ? 1 / 0 : v[0], g = v[1] == null ? -1 / 0 : v[1], p = s - o, y = l[f], m = 0; m < p; m++) {
            var _ = h[m * c + f];
            y[o + m] = _, _ < d && (d = _), _ > g && (g = _);
          }
          v[0] = d, v[1] = g;
        }
      }, i = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      zd = (t = {}, t[ne + "_" + fr] = {
        pure: !0,
        appendData: a
      }, t[ne + "_" + Vi] = {
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
      }, t[Te] = {
        appendData: a
      }, t[Hr] = {
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
), Hd = function(e, t, r, n) {
  return e[n];
}, HC = (pn = {}, pn[ne + "_" + fr] = function(e, t, r, n) {
  return e[n + t];
}, pn[ne + "_" + Vi] = function(e, t, r, n, i) {
  n += t;
  for (var a = i || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[n] : null;
  }
  return a;
}, pn[rr] = Hd, pn[xr] = function(e, t, r, n, i) {
  for (var a = i || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = e[s];
    a[o] = l ? l[n] : null;
  }
  return a;
}, pn[Te] = Hd, pn);
function r_(e, t) {
  var r = HC[mf(e, t)];
  return r;
}
var Vd = function(e, t, r) {
  return e.length;
}, VC = (gn = {}, gn[ne + "_" + fr] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, gn[ne + "_" + Vi] = function(e, t, r) {
  var n = e[0];
  return n ? Math.max(0, n.length - t) : 0;
}, gn[rr] = Vd, gn[xr] = function(e, t, r) {
  var n = r[0].name, i = e[n];
  return i ? i.length : 0;
}, gn[Te] = Vd, gn);
function n_(e, t) {
  var r = VC[mf(e, t)];
  return r;
}
var Nu = function(e, t, r) {
  return e[t];
}, GC = (yn = {}, yn[ne] = Nu, yn[rr] = function(e, t, r) {
  return e[r];
}, yn[xr] = Nu, yn[Te] = function(e, t, r) {
  var n = fo(e);
  return n instanceof Array ? n[t] : n;
}, yn[Hr] = Nu, yn);
function i_(e) {
  var t = GC[e];
  return t;
}
function mf(e, t) {
  return e === ne ? e + "_" + t : e;
}
function Ri(e, t, r) {
  if (e) {
    var n = e.getRawDataItem(t);
    if (n != null) {
      var i = e.getStore(), a = i.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = i.getDimensionProperty(o);
        return i_(a)(n, o, s);
      } else {
        var l = n;
        return a === Te && (l = fo(n)), l;
      }
    }
  }
}
var WC = /\{@(.+?)\}/g, UC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getDataParams = function(t, r) {
      var n = this.getData(r), i = this.getRawValue(t, r), a = n.getRawIndex(t), o = n.getName(t), s = n.getRawDataItem(t), l = n.getItemVisual(t, "style"), u = l && l[n.getItemVisual(t, "drawType") || "fill"], h = l && l.stroke, c = this.mainType, f = c === "series", v = n.userOutput && n.userOutput.get();
      return {
        componentType: c,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: f ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: f ? this.id : null,
        seriesName: f ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: r,
        value: i,
        color: u,
        borderColor: h,
        dimensionNames: v ? v.fullDimensions : null,
        encode: v ? v.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, e.prototype.getFormattedLabel = function(t, r, n, i, a, o) {
      r = r || "normal";
      var s = this.getData(n), l = this.getDataParams(t, n);
      if (o && (l.value = o.interpolatedValue), i != null && z(l.value) && (l.value = l.value[i]), !a) {
        var u = s.getItemModel(t);
        a = u.get(r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"]);
      }
      if (Z(a))
        return l.status = r, l.dimensionIndex = i, a(l);
      if (H(a)) {
        var h = Vm(a, l);
        return h.replace(WC, function(c, f) {
          var v = f.length, d = f;
          d.charAt(0) === "[" && d.charAt(v - 1) === "]" && (d = +d.slice(1, v - 1));
          var g = Ri(s, t, d);
          if (o && z(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, e.prototype.getRawValue = function(t, r) {
      return Ri(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, n) {
    }, e;
  }()
);
function Gd(e) {
  var t, r;
  return V(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function Ea(e) {
  return new YC(e);
}
var YC = (
  /** @class */
  function() {
    function e(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return e.prototype.perform = function(t) {
      var r = this._upstream, n = t && t.skip;
      if (this._dirty && r) {
        var i = this.context;
        i.data = i.outputData = r.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !n && (a = this._plan(this.context));
      var o = h(this._modBy), s = this._modDataCount || 0, l = h(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function h(m) {
        return !(m >= 1) && (m = 1), m;
      }
      var c;
      (this._dirty || a === "reset") && (this._dirty = !1, c = this._doReset(n)), this._modBy = l, this._modDataCount = u;
      var f = t && t.step;
      if (r ? this._dueEnd = r._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var v = this._dueIndex, d = Math.min(f != null ? this._dueIndex + f : 1 / 0, this._dueEnd);
        if (!n && (c || v < d)) {
          var g = this._progress;
          if (z(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], v, d, l, u);
          else
            this._doProgress(g, v, d, l, u);
        }
        this._dueIndex = d;
        var y = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = y;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, n, i, a) {
      Wd.reset(r, n, i, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: n,
        count: n - r,
        next: Wd.next
      }, this.context);
    }, e.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var r, n;
      !t && this._reset && (r = this._reset(this.context), r && r.progress && (n = r.forceFirstProgress, r = r.progress), z(r) && !r.length && (r = null)), this._progress = r, this._modBy = this._modDataCount = null;
      var i = this._downstream;
      return i && i.dirty(), n;
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
), Wd = /* @__PURE__ */ function() {
  var e, t, r, n, i, a = {
    reset: function(l, u, h, c) {
      t = l, e = u, r = h, n = c, i = Math.ceil(n / r), a.next = r > 1 && n > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < e ? t++ : null;
  }
  function s() {
    var l = t % i * r + Math.ceil(t / i), u = t >= e ? null : l < n ? l : t;
    return t++, u;
  }
}();
function ws(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !_t(e) && e != null && e !== "-" && (e = +dr(e)), e == null || e === "" ? NaN : Number(e));
}
Q({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +dr(e);
  },
  trim: function(e) {
    return H(e) ? Ue(e) : e;
  }
});
var XC = (
  /** @class */
  function() {
    function e(t, r) {
      var n = t === "desc";
      this._resultLT = n ? 1 : -1, r == null && (r = n ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var n = _t(t) ? t : Hs(t), i = _t(r) ? r : Hs(r), a = isNaN(n), o = isNaN(i);
      if (a && (n = this._incomparable), o && (i = this._incomparable), a && o) {
        var s = H(t), l = H(r);
        s && (n = l ? t : 0), l && (i = s ? r : 0);
      }
      return n < i ? this._resultLT : n > i ? -this._resultLT : 0;
    }, e;
  }()
), qC = (
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
      return ws(t, r);
    }, e;
  }()
);
function ZC(e, t) {
  var r = new qC(), n = e.data, i = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
  e.seriesLayoutBy !== fr && Jt(o);
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
        On(l, y) && Jt(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < e.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var c = r_(i, fr);
  t.__isBuiltIn && (r.getRawDataItem = function(g) {
    return c(n, a, s, g);
  }, r.getRawData = J(KC, null, e)), r.cloneRawData = J(jC, null, e);
  var f = n_(i, fr);
  r.count = J(f, null, n, a, s);
  var v = i_(i);
  r.retrieveValue = function(g, p) {
    var y = c(n, a, s, g);
    return d(y, p);
  };
  var d = r.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var y = s[p];
      if (y)
        return v(g, p, y.name);
    }
  };
  return r.getDimensionInfo = J(QC, null, s, l), r.cloneAllDimensionInfo = J(JC, null, s), r;
}
function KC(e) {
  var t = e.sourceFormat;
  if (!_f(t)) {
    var r = "";
    Jt(r);
  }
  return e.data;
}
function jC(e) {
  var t = e.sourceFormat, r = e.data;
  if (!_f(t)) {
    var n = "";
    Jt(n);
  }
  if (t === ne) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(r[a].slice());
    return i;
  } else if (t === rr) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(N({}, r[a]));
    return i;
  }
}
function QC(e, t, r) {
  if (r != null) {
    if (_t(r) || !isNaN(r) && !On(t, r))
      return e[r];
    if (On(t, r))
      return t[r];
  }
}
function JC(e) {
  return q(e);
}
var a_ = Q();
function tM(e) {
  e = q(e);
  var t = e.type, r = "";
  t || Jt(r);
  var n = t.split(":");
  n.length !== 2 && Jt(r);
  var i = !1;
  n[0] === "echarts" && (t = n[1], i = !0), e.__isBuiltIn = i, a_.set(t, e);
}
function eM(e, t, r) {
  var n = kt(e), i = n.length, a = "";
  i || Jt(a);
  for (var o = 0, s = i; o < s; o++) {
    var l = n[o];
    t = rM(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function rM(e, t, r, n) {
  var i = "";
  t.length || Jt(i), V(e) || Jt(i);
  var a = e.type, o = a_.get(a);
  o || Jt(i);
  var s = U(t, function(u) {
    return ZC(u, o);
  }), l = kt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: q(e.config)
  }));
  return U(l, function(u, h) {
    var c = "";
    V(u) || Jt(c), u.data || Jt(c);
    var f = Jm(u.data);
    _f(f) || Jt(c);
    var v, d = t[0];
    if (d && h === 0 && !u.dimensions) {
      var g = d.startIndex;
      g && (u.data = d.data.slice(0, g).concat(u.data)), v = {
        seriesLayoutBy: fr,
        sourceHeader: g,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      v = {
        seriesLayoutBy: fr,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Xh(u.data, v, null);
  });
}
function _f(e) {
  return e === ne || e === rr;
}
var Rl = "undefined", nM = typeof Uint32Array === Rl ? Array : Uint32Array, iM = typeof Uint16Array === Rl ? Array : Uint16Array, o_ = typeof Int32Array === Rl ? Array : Int32Array, Ud = typeof Float64Array === Rl ? Array : Float64Array, s_ = {
  float: Ud,
  int: o_,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Ud
}, Bu;
function ti(e) {
  return e > 65535 ? nM : iM;
}
function ei() {
  return [1 / 0, -1 / 0];
}
function aM(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function Yd(e, t, r, n, i) {
  var a = s_[r || "float"];
  if (i) {
    var o = e[t], s = o && o.length;
    if (s !== n) {
      for (var l = new a(n), u = 0; u < s; u++)
        l[u] = o[u];
      e[t] = l;
    }
  } else
    e[t] = new a(n);
}
var qh = (
  /** @class */
  function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Q();
    }
    return e.prototype.initData = function(t, r, n) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var i = t.getSource(), a = this.defaultDimValueGetter = Bu[i.sourceFormat];
      this._dimValueGetter = n || a, this._rawExtent = [], t_(i), this._dimensions = U(r, function(o) {
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
      var n = this._calcDimNameToIdx, i = this._dimensions, a = n.get(t);
      if (a != null) {
        if (i[a].type === r)
          return a;
      } else
        a = i.length;
      return i[a] = {
        type: r
      }, n.set(t, a), this._chunks[a] = new s_[r || "float"](this._rawCount), this._rawExtent[a] = ei(), a;
    }, e.prototype.collectOrdinalMeta = function(t, r) {
      var n = this._chunks[t], i = this._dimensions[t], a = this._rawExtent, o = i.ordinalOffset || 0, s = n.length;
      o === 0 && (a[t] = ei());
      for (var l = a[t], u = o; u < s; u++) {
        var h = n[u] = r.parseAndCollect(n[u]);
        isNaN(h) || (l[0] = Math.min(h, l[0]), l[1] = Math.max(h, l[1]));
      }
      i.ordinalMeta = r, i.ordinalOffset = s, i.type = "ordinal";
    }, e.prototype.getOrdinalMeta = function(t) {
      var r = this._dimensions[t], n = r.ordinalMeta;
      return n;
    }, e.prototype.getDimensionProperty = function(t) {
      var r = this._dimensions[t];
      return r && r.property;
    }, e.prototype.appendData = function(t) {
      var r = this._provider, n = this.count();
      r.appendData(t);
      var i = r.count();
      return r.persistent || (i += n), n < i && this._initDataFromProvider(n, i, !0), [n, i];
    }, e.prototype.appendValues = function(t, r) {
      for (var n = this._chunks, i = this._dimensions, a = i.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, r || 0), u = 0; u < a; u++) {
        var h = i[u];
        Yd(n, u, h.type, l, !0);
      }
      for (var c = [], f = s; f < l; f++)
        for (var v = f - s, d = 0; d < a; d++) {
          var h = i[d], g = Bu.arrayRows.call(this, t[v] || c, h.property, v, d);
          n[d][f] = g;
          var p = o[d];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, n) {
      for (var i = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = U(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var c = o[h];
        l[h] || (l[h] = ei()), Yd(a, h, c.type, r, n);
      }
      if (i.fillStorage)
        i.fillStorage(t, r, a, l);
      else
        for (var f = [], v = t; v < r; v++) {
          f = i.getItem(v, f);
          for (var d = 0; d < s; d++) {
            var g = a[d], p = this._dimValueGetter(f, u[d], v, d);
            g[v] = p;
            var y = l[d];
            p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      !i.persistent && i.clean && i.clean(), this._rawCount = this._count = r, this._extent = [];
    }, e.prototype.count = function() {
      return this._count;
    }, e.prototype.get = function(t, r) {
      if (!(r >= 0 && r < this._count))
        return NaN;
      var n = this._chunks[t];
      return n ? n[this.getRawIndex(r)] : NaN;
    }, e.prototype.getValues = function(t, r) {
      var n = [], i = [];
      if (r == null) {
        r = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          i.push(a);
      } else
        i = t;
      for (var a = 0, o = i.length; a < o; a++)
        n.push(this.get(i[a], r));
      return n;
    }, e.prototype.getByRawIndex = function(t, r) {
      if (!(r >= 0 && r < this._rawCount))
        return NaN;
      var n = this._chunks[t];
      return n ? n[r] : NaN;
    }, e.prototype.getSum = function(t) {
      var r = this._chunks[t], n = 0;
      if (r)
        for (var i = 0, a = this.count(); i < a; i++) {
          var o = this.get(t, i);
          isNaN(o) || (n += o);
        }
      return n;
    }, e.prototype.getMedian = function(t) {
      var r = [];
      this.each([t], function(a) {
        isNaN(a) || r.push(a);
      });
      var n = r.sort(function(a, o) {
        return a - o;
      }), i = this.count();
      return i === 0 ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
    }, e.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var r = this._indices, n = r[t];
      if (n != null && n < this._count && n === t)
        return t;
      for (var i = 0, a = this._count - 1; i <= a; ) {
        var o = (i + a) / 2 | 0;
        if (r[o] < t)
          i = o + 1;
        else if (r[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, e.prototype.indicesOfNearest = function(t, r, n) {
      var i = this._chunks, a = i[t], o = [];
      if (!a)
        return o;
      n == null && (n = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, h = 0, c = this.count(); h < c; h++) {
        var f = this.getRawIndex(h), v = r - a[f], d = Math.abs(v);
        d <= n && ((d < s || d === s && v >= 0 && l < 0) && (s = d, l = v, u = 0), v === l && (o[u++] = h));
      }
      return o.length = u, o;
    }, e.prototype.getIndices = function() {
      var t, r = this._indices;
      if (r) {
        var n = r.constructor, i = this._count;
        if (n === Array) {
          t = new n(i);
          for (var a = 0; a < i; a++)
            t[a] = r[a];
        } else
          t = new n(r.buffer, 0, i);
      } else {
        var n = ti(this._rawCount);
        t = new n(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, e.prototype.filter = function(t, r) {
      if (!this._count)
        return this;
      for (var n = this.clone(), i = n.count(), a = ti(n._rawCount), o = new a(i), s = [], l = t.length, u = 0, h = t[0], c = n._chunks, f = 0; f < i; f++) {
        var v = void 0, d = n.getRawIndex(f);
        if (l === 0)
          v = r(f);
        else if (l === 1) {
          var g = c[h][d];
          v = r(g, f);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = c[t[p]][d];
          s[p] = f, v = r.apply(null, s);
        }
        v && (o[u++] = d);
      }
      return u < i && (n._indices = o), n._count = u, n._extent = [], n._updateGetRawIdx(), n;
    }, e.prototype.selectRange = function(t) {
      var r = this.clone(), n = r._count;
      if (!n)
        return this;
      var i = mt(t), a = i.length;
      if (!a)
        return this;
      var o = r.count(), s = ti(r._rawCount), l = new s(o), u = 0, h = i[0], c = t[h][0], f = t[h][1], v = r._chunks, d = !1;
      if (!r._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = v[i[0]], y = 0; y < n; y++) {
            var m = p[y];
            (m >= c && m <= f || isNaN(m)) && (l[u++] = g), g++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = v[i[0]], _ = v[i[1]], b = t[i[1]][0], S = t[i[1]][1], y = 0; y < n; y++) {
            var m = p[y], w = _[y];
            (m >= c && m <= f || isNaN(m)) && (w >= b && w <= S || isNaN(w)) && (l[u++] = g), g++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = r.getRawIndex(y), m = v[i[0]][x];
            (m >= c && m <= f || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var M = !0, x = r.getRawIndex(y), D = 0; D < a; D++) {
              var A = i[D], m = v[A][x];
              (m < t[A][0] || m > t[A][1]) && (M = !1);
            }
            M && (l[u++] = r.getRawIndex(y));
          }
      return u < o && (r._indices = l), r._count = u, r._extent = [], r._updateGetRawIdx(), r;
    }, e.prototype.map = function(t, r) {
      var n = this.clone(t);
      return this._updateDims(n, t, r), n;
    }, e.prototype.modify = function(t, r) {
      this._updateDims(this, t, r);
    }, e.prototype._updateDims = function(t, r, n) {
      for (var i = t._chunks, a = [], o = r.length, s = t.count(), l = [], u = t._rawExtent, h = 0; h < r.length; h++)
        u[r[h]] = ei();
      for (var c = 0; c < s; c++) {
        for (var f = t.getRawIndex(c), v = 0; v < o; v++)
          l[v] = i[r[v]][f];
        l[o] = c;
        var d = n && n.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var h = 0; h < d.length; h++) {
            var g = r[h], p = d[h], y = u[g], m = i[g];
            m && (m[f] = p), p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var n = this.clone([t], !0), i = n._chunks, a = i[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), h, c, f, v = new (ti(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      v[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var g = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), y = (p + g) / 2, m = 0, _ = g; _ < p; _++) {
          var b = this.getRawIndex(_), S = a[b];
          isNaN(S) || (m += S);
        }
        m /= p - g;
        var w = d, x = Math.min(d + l, o), M = d - 1, D = a[u];
        h = -1, f = w;
        for (var A = -1, T = 0, _ = w; _ < x; _++) {
          var b = this.getRawIndex(_), S = a[b];
          if (isNaN(S)) {
            T++, A < 0 && (A = b);
            continue;
          }
          c = Math.abs((M - y) * (S - D) - (M - _) * (m - D)), c > h && (h = c, f = b);
        }
        T > 0 && T < x - w && (v[s++] = Math.min(A, f), f = Math.max(A, f)), v[s++] = f, u = f;
      }
      return v[s++] = this.getRawIndex(o - 1), n._count = s, n._indices = v, n.getRawIndex = this._getRawIdx, n;
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var n = this.clone([t], !0), i = n._chunks, a = Math.floor(1 / r), o = i[t], s = this.count(), l = new (ti(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var c = h, f = o[this.getRawIndex(c)], v = h, d = o[this.getRawIndex(v)], g = a;
        h + a > s && (g = s - h);
        for (var p = 0; p < g; p++) {
          var y = this.getRawIndex(h + p), m = o[y];
          m < f && (f = m, c = h + p), m > d && (d = m, v = h + p);
        }
        var _ = this.getRawIndex(c), b = this.getRawIndex(v);
        c < v ? (l[u++] = _, l[u++] = b) : (l[u++] = b, l[u++] = _);
      }
      return n._count = u, n._indices = l, n._updateGetRawIdx(), n;
    }, e.prototype.downSample = function(t, r, n, i) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], h = this.count(), c = a._rawExtent[t] = ei(), f = new (ti(this._rawCount))(Math.ceil(h / l)), v = 0, d = 0; d < h; d += l) {
        l > h - d && (l = h - d, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(d + g);
          s[g] = u[p];
        }
        var y = n(s), m = this.getRawIndex(Math.min(d + i(s, y) || 0, h - 1));
        u[m] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), f[v++] = m;
      }
      return a._count = v, a._indices = f, a._updateGetRawIdx(), a;
    }, e.prototype.each = function(t, r) {
      if (this._count)
        for (var n = t.length, i = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (n) {
            case 0:
              r(a);
              break;
            case 1:
              r(i[t[0]][s], a);
              break;
            case 2:
              r(i[t[0]][s], i[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < n; l++)
                u[l] = i[t[l]][s];
              u[l] = a, r.apply(null, u);
          }
        }
    }, e.prototype.getDataExtent = function(t) {
      var r = this._chunks[t], n = ei();
      if (!r)
        return n;
      var i = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = n;
      for (var s = o[0], l = o[1], u = 0; u < i; u++) {
        var h = this.getRawIndex(u), c = r[h];
        c < s && (s = c), c > l && (l = c);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, e.prototype.getRawDataItem = function(t) {
      var r = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(r);
      for (var n = [], i = this._chunks, a = 0; a < i.length; a++)
        n.push(i[a][r]);
      return n;
    }, e.prototype.clone = function(t, r) {
      var n = new e(), i = this._chunks, a = t && zi(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < i.length; o++)
          n._chunks[o] = a[o] ? aM(i[o]) : i[o];
      else
        n._chunks = i;
      return this._copyCommonProps(n), r || (n._indices = this._cloneIndices()), n._updateGetRawIdx(), n;
    }, e.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = q(this._extent), t._rawExtent = q(this._rawExtent);
    }, e.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, r = void 0;
        if (t === Array) {
          var n = this._indices.length;
          r = new t(n);
          for (var i = 0; i < n; i++)
            r[i] = this._indices[i];
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
      function t(r, n, i, a) {
        return ws(r[a], this._dimensions[a]);
      }
      Bu = {
        arrayRows: t,
        objectRows: function(r, n, i, a) {
          return ws(r[n], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, n, i, a) {
          var o = r && (r.value == null ? r : r.value);
          return ws(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, n, i, a) {
          return r[a];
        }
      };
    }(), e;
  }()
), oM = (
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
      var t = this._sourceHost, r = this._getUpstreamSourceManagers(), n = !!r.length, i, a;
      if (Ho(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (n) {
          var h = r[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = re(s) ? Hr : Te, a = [];
        var c = this._getSourceMetaRawOption() || {}, f = u && u.metaRawOption || {}, v = tt(c.seriesLayoutBy, f.seriesLayoutBy) || null, d = tt(c.sourceHeader, f.sourceHeader), g = tt(c.dimensions, f.dimensions), p = v !== f.seriesLayoutBy || !!d != !!f.sourceHeader || g;
        i = p ? [Xh(s, {
          seriesLayoutBy: v,
          sourceHeader: d,
          dimensions: g
        }, l)] : [];
      } else {
        var y = t;
        if (n) {
          var m = this._applyTransform(r);
          i = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          i = [Xh(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(i, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, n = r.get("transform", !0), i = r.get("fromTransformResult", !0);
      if (i != null) {
        var a = "";
        t.length !== 1 && Xd(a);
      }
      var o, s = [], l = [];
      return C(t, function(u) {
        u.prepareSource();
        var h = u.getSource(i || 0), c = "";
        i != null && !h && Xd(c), s.push(h), l.push(u._getVersionSign());
      }), n ? o = eM(n, s, {
        datasetIndex: r.componentIndex
      }) : i != null && (o = [BC(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, e.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), r = 0; r < t.length; r++) {
        var n = t[r];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          n._isDirty() || this._upstreamSignList[r] !== n._getVersionSign()
        )
          return !0;
      }
    }, e.prototype.getSource = function(t) {
      t = t || 0;
      var r = this._sourceList[t];
      if (!r) {
        var n = this._getUpstreamSourceManagers();
        return n[0] && n[0].getSource(t);
      }
      return r;
    }, e.prototype.getSharedDataStore = function(t) {
      var r = t.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, t.source, r.hash);
    }, e.prototype._innerGetDataStore = function(t, r, n) {
      var i = 0, a = this._storeList, o = a[i];
      o || (o = a[i] = {});
      var s = o[n];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Ho(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, n) : (s = new qh(), s.initData(new e_(r, t.length), t)), o[n] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Ho(t)) {
        var r = Xm(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return U(fC(t), function(n) {
          return n.getSourceManager();
        });
    }, e.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, r, n, i;
      if (Ho(t))
        r = t.get("seriesLayoutBy", !0), n = t.get("sourceHeader", !0), i = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        r = a.get("seriesLayoutBy", !0), n = a.get("sourceHeader", !0), i = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: r,
        sourceHeader: n,
        dimensions: i
      };
    }, e;
  }()
);
function Ho(e) {
  return e.mainType === "series";
}
function Xd(e) {
  throw new Error(e);
}
var sM = "line-height:1";
function l_(e) {
  var t = e.lineHeight;
  return t == null ? sM : "line-height:" + jt(t + "") + "px";
}
function u_(e, t) {
  var r = e.color || "#6e7079", n = e.fontSize || 12, i = e.fontWeight || "400", a = e.color || "#464646", o = e.fontSize || 14, s = e.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + jt(n + "") + "px;color:" + jt(r) + ";font-weight:" + jt(i + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + jt(o + "") + "px;color:" + jt(a) + ";font-weight:" + jt(s + "")
  } : {
    nameStyle: {
      fontSize: n,
      fill: r,
      fontWeight: i
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var lM = [0, 10, 20, 30], uM = ["", `
`, `

`, `


`];
function eo(e, t) {
  return t.type = e, t;
}
function Zh(e) {
  return e.type === "section";
}
function h_(e) {
  return Zh(e) ? hM : cM;
}
function c_(e) {
  if (Zh(e)) {
    var t = 0, r = e.blocks.length, n = r > 1 || r > 0 && !e.noHeader;
    return C(e.blocks, function(i) {
      var a = c_(i);
      a >= t && (t = a + +(n && // 0 always can not be readable gap level.
      (!a || Zh(i) && !i.noHeader)));
    }), t;
  }
  return 0;
}
function hM(e, t, r, n) {
  var i = t.noHeader, a = fM(c_(t)), o = [], s = t.blocks || [];
  qe(!s || z(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (On(u, l)) {
      var h = new XC(u[l], null);
      s.sort(function(g, p) {
        return h.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  C(s, function(g, p) {
    var y = t.valueFormatter, m = h_(g)(
      // Inherit valueFormatter
      y ? N(N({}, e), {
        valueFormatter: y
      }) : e,
      g,
      p > 0 ? a.html : 0,
      n
    );
    m != null && o.push(m);
  });
  var c = e.renderMode === "richText" ? o.join(a.richText) : Kh(n, o.join(""), i ? r : a.html);
  if (i)
    return c;
  var f = Yh(t.header, "ordinal", e.useUTC), v = u_(n, e.renderMode).nameStyle, d = l_(n);
  return e.renderMode === "richText" ? f_(e, f, v) + a.richText + c : Kh(n, '<div style="' + v + ";" + d + ';">' + jt(f) + "</div>" + c, r);
}
function cM(e, t, r, n) {
  var i = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, h = t.valueFormatter || e.valueFormatter || function(b) {
    return b = z(b) ? b : [b], U(b, function(S, w) {
      return Yh(S, z(v) ? v[w] : v, u);
    });
  };
  if (!(a && o)) {
    var c = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", i), f = a ? "" : Yh(l, "ordinal", u), v = t.valueType, d = o ? [] : h(t.value, t.dataIndex), g = !s || !a, p = !s && a, y = u_(n, i), m = y.nameStyle, _ = y.valueStyle;
    return i === "richText" ? (s ? "" : c) + (a ? "" : f_(e, f, m)) + (o ? "" : pM(e, d, g, p, _)) : Kh(n, (s ? "" : c) + (a ? "" : vM(f, !s, m)) + (o ? "" : dM(d, g, p, _)), r);
  }
}
function qd(e, t, r, n, i, a) {
  if (e) {
    var o = h_(e), s = {
      useUTC: i,
      renderMode: r,
      orderMode: n,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function fM(e) {
  return {
    html: lM[e],
    richText: uM[e]
  };
}
function Kh(e, t, r) {
  var n = '<div style="clear:both"></div>', i = "margin: " + r + "px 0 0", a = l_(e);
  return '<div style="' + i + ";" + a + ';">' + t + n + "</div>";
}
function vM(e, t, r) {
  var n = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + n + '">' + jt(e) + "</span>";
}
function dM(e, t, r, n) {
  var i = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + i : "";
  return e = z(e) ? e : [e], '<span style="' + a + ";" + n + '">' + U(e, function(o) {
    return jt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function f_(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function pM(e, t, r, n, i) {
  var a = [i], o = n ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(z(t) ? t.join("  ") : t, a);
}
function gM(e, t) {
  var r = e.getData().getItemVisual(t, "style"), n = r[e.visualDrawType];
  return Nn(n);
}
function v_(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var zu = (
  /** @class */
  function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = Uy();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, n) {
      var i = n === "richText" ? this._generateStyleName() : null, a = nC({
        color: r,
        type: t,
        renderMode: n,
        markerId: i
      });
      return H(a) ? a : (this.richTextStyles[i] = a.style, a.content);
    }, e.prototype.wrapRichTextStyle = function(t, r) {
      var n = {};
      z(r) ? C(r, function(a) {
        return N(n, a);
      }) : N(n, r);
      var i = this._generateStyleName();
      return this.richTextStyles[i] = n, "{" + i + "|" + t + "}";
    }, e;
  }()
);
function yM(e) {
  var t = e.series, r = e.dataIndex, n = e.multipleSeries, i = t.getData(), a = i.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = z(s), u = gM(t, r), h, c, f, v;
  if (o > 1 || l && !o) {
    var d = mM(s, t, r, a, u);
    h = d.inlineValues, c = d.inlineValueTypes, f = d.blocks, v = d.inlineValues[0];
  } else if (o) {
    var g = i.getDimensionInfo(a[0]);
    v = h = Ri(i, r, a[0]), c = g.type;
  } else
    v = h = l ? s[0] : s;
  var p = Yc(t), y = p && t.name || "", m = i.getName(r), _ = n ? y : m;
  return eo("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: n || !p,
    sortParam: v,
    blocks: [eo("nameValue", {
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
    })].concat(f || [])
  });
}
function mM(e, t, r, n, i) {
  var a = t.getData(), o = zi(e, function(c, f, v) {
    var d = a.getDimensionInfo(v);
    return c = c || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  n.length ? C(n, function(c) {
    h(Ri(a, r, c), c);
  }) : C(e, h);
  function h(c, f) {
    var v = a.getDimensionInfo(f);
    !v || v.otherDims.tooltip === !1 || (o ? u.push(eo("nameValue", {
      markerType: "subItem",
      markerColor: i,
      name: v.displayName,
      value: c,
      valueType: v.type
    })) : (s.push(c), l.push(v.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Ar = $t();
function Vo(e, t) {
  return e.getName(t) || e.getId(t);
}
var _M = "__universalTransitionEnabled", Oe = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, n, i) {
      this.seriesIndex = this.componentIndex, this.dataTask = Ea({
        count: wM,
        reset: SM
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, i);
      var a = Ar(this).sourceManager = new oM(this);
      a.prepareSource();
      var o = this.getInitialData(r, i);
      Kd(o, this), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Zd(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = Ja(this), a = i ? Ll(r) : {}, o = this.subType;
      ct.hasClass(o) && (o += "Series"), ot(r, n.getTheme().get(this.subType)), ot(r, this.getDefaultOption()), Rv(r, "label", ["show"]), this.fillDataTextStyle(r.data), i && Pi(r, a, i);
    }, t.prototype.mergeOption = function(r, n) {
      r = ot(this.option, r, !0), this.fillDataTextStyle(r.data);
      var i = Ja(this);
      i && Pi(this.option, r, i);
      var a = Ar(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, n);
      Kd(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Zd(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !re(r))
        for (var n = ["show"], i = 0; i < r.length; i++)
          r[i] && r[i].label && Rv(r[i], "label", n);
    }, t.prototype.getInitialData = function(r, n) {
    }, t.prototype.appendData = function(r) {
      var n = this.getRawData();
      n.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var n = jh(this);
      if (n) {
        var i = n.context.data;
        return r == null || !i.getLinkedData ? i : i.getLinkedData(r);
      } else
        return Ar(this).data;
    }, t.prototype.getAllData = function() {
      var r = this.getData();
      return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{
        data: r
      }];
    }, t.prototype.setData = function(r) {
      var n = jh(this);
      if (n) {
        var i = n.context;
        i.outputData = r, n !== this.dataTask && (i.data = r);
      }
      Ar(this).data = r;
    }, t.prototype.getEncode = function() {
      var r = this.get("encode", !0);
      if (r)
        return Q(r);
    }, t.prototype.getSourceManager = function() {
      return Ar(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Ar(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var r = this.get("colorBy");
      return r || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var r = this.coordinateSystem;
      return r && r.getBaseAxis && r.getBaseAxis();
    }, t.prototype.formatTooltip = function(r, n, i) {
      return yM({
        series: this,
        dataIndex: r,
        multipleSeries: n
      });
    }, t.prototype.isAnimationEnabled = function() {
      var r = this.ecModel;
      if (X.node && !(r && r.ssr))
        return !1;
      var n = this.getShallow("animation");
      return n && this.getData().count() > this.getShallow("animationThreshold") && (n = !1), !!n;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(r, n, i) {
      var a = this.ecModel, o = pf.prototype.getColorFromPalette.call(this, r, n, i);
      return o || (o = a.getColorFromPalette(r, n, i)), o;
    }, t.prototype.coordDimToDataDim = function(r) {
      return this.getRawData().mapDimensionsAll(r);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(r, n) {
      this._innerSelect(this.getData(n), r);
    }, t.prototype.unselect = function(r, n) {
      var i = this.option.selectedMap;
      if (i) {
        var a = this.option.selectedMode, o = this.getData(n);
        if (a === "series" || i === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < r.length; s++) {
          var l = r[s], u = Vo(o, l);
          i[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(r, n) {
      for (var i = [], a = 0; a < r.length; a++)
        i[0] = r[a], this.isSelected(r[a], n) ? this.unselect(i, n) : this.select(i, n);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, n = mt(r), i = [], a = 0; a < n.length; a++) {
        var o = r[n[a]];
        o >= 0 && i.push(o);
      }
      return i;
    }, t.prototype.isSelected = function(r, n) {
      var i = this.option.selectedMap;
      if (!i)
        return !1;
      var a = this.getData(n);
      return (i === "all" || i[Vo(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[_M])
        return !0;
      var r = this.option.universalTransition;
      return r ? r === !0 ? !0 : r && r.enabled : !1;
    }, t.prototype._innerSelect = function(r, n) {
      var i, a, o = this.option, s = o.selectedMode, l = n.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          V(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, h = 0; h < l; h++) {
            var c = n[h], f = Vo(r, c);
            u[f] = !0, this._selectedDataIndicesMap[f] = r.getRawIndex(c);
          }
        } else if (s === "single" || s === !0) {
          var v = n[l - 1], f = Vo(r, v);
          o.selectedMap = (i = {}, i[f] = !0, i), this._selectedDataIndicesMap = (a = {}, a[f] = r.getRawIndex(v), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(r) {
      if (!this.option.selectedMap) {
        var n = [];
        r.hasItemOption && r.each(function(i) {
          var a = r.getRawDataItem(i);
          a && a.selected && n.push(i);
        }), n.length > 0 && this._innerSelect(r, n);
      }
    }, t.registerClass = function(r) {
      return ct.registerClass(r);
    }, t.protoInitialize = function() {
      var r = t.prototype;
      r.type = "series.__base__", r.seriesIndex = 0, r.ignoreStyleOnData = !1, r.hasSymbolVisual = !1, r.defaultSymbol = "circle", r.visualStyleAccessPath = "itemStyle", r.visualDrawType = "fill";
    }(), t;
  }(ct)
);
Je(Oe, UC);
Je(Oe, pf);
jy(Oe, ct);
function Zd(e) {
  var t = e.name;
  Yc(e) || (e.name = bM(e) || t);
}
function bM(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), n = [];
  return C(r, function(i) {
    var a = t.getDimensionInfo(i);
    a.displayName && n.push(a.displayName);
  }), n.join(" ");
}
function wM(e) {
  return e.model.getRawData().count();
}
function SM(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), xM;
}
function xM(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Kd(e, t) {
  C(N1(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, It(TM, t));
  });
}
function TM(e, t) {
  var r = jh(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function jh(e) {
  var t = (e.ecModel || {}).scheduler, r = t && t.getPipeline(e.uid);
  if (r) {
    var n = r.currentTask;
    if (n) {
      var i = n.agentStubMap;
      i && (n = i.get(e.uid));
    }
    return n;
  }
}
var Ee = (
  /** @class */
  function() {
    function e() {
      this.group = new Mt(), this.uid = xl("viewComponent");
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, n, i) {
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, n, i) {
    }, e.prototype.updateLayout = function(t, r, n, i) {
    }, e.prototype.updateVisual = function(t, r, n, i) {
    }, e.prototype.toggleBlurSeries = function(t, r, n) {
    }, e.prototype.eachRendered = function(t) {
      var r = this.group;
      r && r.traverse(t);
    }, e;
  }()
);
qc(Ee);
cl(Ee);
function bf() {
  var e = $t();
  return function(t) {
    var r = e(t), n = t.pipelineContext, i = !!r.large, a = !!r.progressiveRender, o = r.large = !!(n && n.large), s = r.progressiveRender = !!(n && n.progressiveRender);
    return (i !== o || a !== s) && "reset";
  };
}
var d_ = $t(), CM = bf(), Se = (
  /** @class */
  function() {
    function e() {
      this.group = new Mt(), this.uid = xl("viewChart"), this.renderTask = Ea({
        plan: MM,
        reset: DM
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, n, i) {
    }, e.prototype.highlight = function(t, r, n, i) {
      var a = t.getData(i && i.dataType);
      a && Qd(a, i, "emphasis");
    }, e.prototype.downplay = function(t, r, n, i) {
      var a = t.getData(i && i.dataType);
      a && Qd(a, i, "normal");
    }, e.prototype.remove = function(t, r) {
      this.group.removeAll();
    }, e.prototype.dispose = function(t, r) {
    }, e.prototype.updateView = function(t, r, n, i) {
      this.render(t, r, n, i);
    }, e.prototype.updateLayout = function(t, r, n, i) {
      this.render(t, r, n, i);
    }, e.prototype.updateVisual = function(t, r, n, i) {
      this.render(t, r, n, i);
    }, e.prototype.eachRendered = function(t) {
      go(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      d_(t).updateMethod = r;
    }, e.protoInitialize = function() {
      var t = e.prototype;
      t.type = "chart";
    }(), e;
  }()
);
function jd(e, t, r) {
  e && Hh(e) && (t === "emphasis" ? Gs : Ws)(e, r);
}
function Qd(e, t, r) {
  var n = En(e, t), i = t && t.highlightKey != null ? Gx(t.highlightKey) : null;
  n != null ? C(kt(n), function(a) {
    jd(e.getItemGraphicEl(a), r, i);
  }) : e.eachItemGraphicEl(function(a) {
    jd(a, r, i);
  });
}
qc(Se);
cl(Se);
function MM(e) {
  return CM(e.model);
}
function DM(e) {
  var t = e.model, r = e.ecModel, n = e.api, i = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = i && d_(i).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, n, i), AM[l];
}
var AM = {
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
}, Ks = "\0__throttleOriginMethod", Jd = "\0__throttleRate", tp = "\0__throttleType";
function wf(e, t, r) {
  var n, i = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function c() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var f = function() {
    for (var v = [], d = 0; d < arguments.length; d++)
      v[d] = arguments[d];
    n = (/* @__PURE__ */ new Date()).getTime(), l = this, u = v;
    var g = h || t, p = h || r;
    h = null, s = n - (p ? i : a) - g, clearTimeout(o), p ? o = setTimeout(c, g) : s >= 0 ? c() : o = setTimeout(c, -s), i = n;
  };
  return f.clear = function() {
    o && (clearTimeout(o), o = null);
  }, f.debounceNextCall = function(v) {
    h = v;
  }, f;
}
function p_(e, t, r, n) {
  var i = e[t];
  if (i) {
    var a = i[Ks] || i, o = i[tp], s = i[Jd];
    if (s !== r || o !== n) {
      if (r == null || !n)
        return e[t] = a;
      i = e[t] = wf(a, r, n === "debounce"), i[Ks] = a, i[tp] = n, i[Jd] = r;
    }
    return i;
  }
}
function Qh(e, t) {
  var r = e[t];
  r && r[Ks] && (r.clear && r.clear(), e[t] = r[Ks]);
}
var ep = $t(), rp = {
  itemStyle: Za(Im, !0),
  lineStyle: Za(Am, !0)
}, IM = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function g_(e, t) {
  var r = e.visualStyleMapper || rp[t];
  return r || (console.warn("Unknown style type '" + t + "'."), rp.itemStyle);
}
function y_(e, t) {
  var r = e.visualDrawType || IM[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var LM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), n = e.visualStyleAccessPath || "itemStyle", i = e.getModel(n), a = g_(e, n), o = a(i), s = i.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = y_(e, n), u = o[l], h = Z(u) ? u : null, c = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || h || c) {
      var f = e.getColorFromPalette(
        // TODO series count changed.
        e.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = f, r.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || Z(o.fill) ? f : o.fill, o.stroke = o.stroke === "auto" || Z(o.stroke) ? f : o.stroke;
    }
    if (r.setVisual("style", o), r.setVisual("drawType", l), !t.isSeriesFiltered(e) && h)
      return r.setVisual("colorFromPalette", !1), {
        dataEach: function(v, d) {
          var g = e.getDataParams(d), p = N({}, o);
          p[l] = h(g), v.setItemVisual(d, "style", p);
        }
      };
  }
}, oa = new Tt(), $M = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
      var r = e.getData(), n = e.visualStyleAccessPath || "itemStyle", i = g_(e, n), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[n]) {
            oa.option = l[n];
            var u = i(oa), h = o.ensureUniqueItemVisual(s, "style");
            N(h, u), oa.option.decal && (o.setItemVisual(s, "decal", oa.option.decal), oa.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, PM = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = Q();
    e.eachSeries(function(r) {
      var n = r.getColorBy();
      if (!r.isColorBySeries()) {
        var i = r.type + "-" + n, a = t.get(i);
        a || (a = {}, t.set(i, a)), ep(r).scope = a;
      }
    }), e.eachSeries(function(r) {
      if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
        var n = r.getRawData(), i = {}, a = r.getData(), o = ep(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = y_(r, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          i[h] = u;
        }), n.each(function(u) {
          var h = i[u], c = a.getItemVisual(h, "colorFromPalette");
          if (c) {
            var f = a.ensureUniqueItemVisual(h, "style"), v = n.getName(u) || u + "", d = n.count();
            f[l] = r.getColorFromPalette(v, o, d);
          }
        });
      }
    });
  }
}, Go = Math.PI;
function RM(e, t) {
  t = t || {}, ht(t, {
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
  var r = new Mt(), n = new St({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  r.add(n);
  var i = new Lt({
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
  }), a = new St({
    style: {
      fill: "none"
    },
    textContent: i,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: t.zlevel,
    z: 10001
  });
  r.add(a);
  var o;
  return t.showSpinner && (o = new _l({
    shape: {
      startAngle: -Go / 2,
      endAngle: -Go / 2 + 0.1,
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
    endAngle: Go * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Go * 3 / 2
  }).delay(300).start("circularInOut"), r.add(o)), r.resize = function() {
    var s = i.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (e.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), h = e.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: h
    }), a.setShape({
      x: u - l,
      y: h - l,
      width: l * 2,
      height: l * 2
    }), n.setShape({
      x: 0,
      y: 0,
      width: e.getWidth(),
      height: e.getHeight()
    });
  }, r.resize(), r;
}
var m_ = (
  /** @class */
  function() {
    function e(t, r, n, i) {
      this._stageTaskMap = Q(), this.ecInstance = t, this.api = r, n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice(), this._allHandlers = n.concat(i);
    }
    return e.prototype.restoreData = function(t, r) {
      t.restoreData(r), this._stageTaskMap.each(function(n) {
        var i = n.overallTask;
        i && i.dirty();
      });
    }, e.prototype.getPerformArgs = function(t, r) {
      if (t.__pipeline) {
        var n = this._pipelineMap.get(t.__pipeline.id), i = n.context, a = !r && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex, o = a ? n.step : null, s = i && i.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, e.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, e.prototype.updateStreamModes = function(t, r) {
      var n = this._pipelineMap.get(t.uid), i = t.getData(), a = i.count(), o = n.progressiveEnabled && r.incrementalPrepareRender && a >= n.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = n.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, e.prototype.restorePipelines = function(t) {
      var r = this, n = r._pipelineMap = Q();
      t.eachSeries(function(i) {
        var a = i.getProgressive(), o = i.uid;
        n.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: i.getProgressiveThreshold(),
          progressiveEnabled: a && !(i.preventIncremental && i.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0
        }), r._pipe(i, i.dataTask);
      });
    }, e.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, r = this.api.getModel(), n = this.api;
      C(this._allHandlers, function(i) {
        var a = t.get(i.uid) || t.set(i.uid, {}), o = "";
        qe(!(i.reset && i.overallReset), o), i.reset && this._createSeriesStageTask(i, a, r, n), i.overallReset && this._createOverallStageTask(i, a, r, n);
      }, this);
    }, e.prototype.prepareView = function(t, r, n, i) {
      var a = t.renderTask, o = a.context;
      o.model = r, o.ecModel = n, o.api = i, a.__block = !t.incrementalPrepareRender, this._pipe(r, a);
    }, e.prototype.performDataProcessorTasks = function(t, r) {
      this._performStageTasks(this._dataProcessorHandlers, t, r, {
        block: !0
      });
    }, e.prototype.performVisualTasks = function(t, r, n) {
      this._performStageTasks(this._visualHandlers, t, r, n);
    }, e.prototype._performStageTasks = function(t, r, n, i) {
      i = i || {};
      var a = !1, o = this;
      C(t, function(l, u) {
        if (!(i.visualType && i.visualType !== l.visualType)) {
          var h = o._stageTaskMap.get(l.uid), c = h.seriesTaskMap, f = h.overallTask;
          if (f) {
            var v, d = f.agentStubMap;
            d.each(function(p) {
              s(i, p) && (p.dirty(), v = !0);
            }), v && f.dirty(), o.updatePayload(f, n);
            var g = o.getPerformArgs(f, i.block);
            d.each(function(p) {
              p.perform(g);
            }), f.perform(g) && (a = !0);
          } else c && c.each(function(p, y) {
            s(i, p) && p.dirty();
            var m = o.getPerformArgs(p, i.block);
            m.skip = !l.performRawSeries && r.isSeriesFiltered(p.context.model), o.updatePayload(p, n), p.perform(m) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, e.prototype.performSeriesTasks = function(t) {
      var r;
      t.eachSeries(function(n) {
        r = n.dataTask.perform() || r;
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
    }, e.prototype._createSeriesStageTask = function(t, r, n, i) {
      var a = this, o = r.seriesTaskMap, s = r.seriesTaskMap = Q(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? n.eachRawSeries(h) : l ? n.eachRawSeriesByType(l, h) : u && u(n, i).each(h);
      function h(c) {
        var f = c.uid, v = s.set(f, o && o.get(f) || Ea({
          plan: BM,
          reset: zM,
          count: HM
        }));
        v.context = {
          model: c,
          ecModel: n,
          api: i,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(c, v);
      }
    }, e.prototype._createOverallStageTask = function(t, r, n, i) {
      var a = this, o = r.overallTask = r.overallTask || Ea({
        reset: OM
      });
      o.context = {
        ecModel: n,
        api: i,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Q(), u = t.seriesType, h = t.getTargetSeries, c = !0, f = !1, v = "";
      qe(!t.createOnAllSeries, v), u ? n.eachRawSeriesByType(u, d) : h ? h(n, i).each(d) : (c = !1, C(n.getSeries(), d));
      function d(g) {
        var p = g.uid, y = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (f = !0, Ea({
          reset: EM,
          onDirty: NM
        })));
        y.context = {
          model: g,
          overallProgress: c
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, y.agent = o, y.__block = c, a._pipe(g, y);
      }
      f && o.dirty();
    }, e.prototype._pipe = function(t, r) {
      var n = t.uid, i = this._pipelineMap.get(n);
      !i.head && (i.head = r), i.tail && i.tail.pipe(r), i.tail = r, r.__idxInPipeline = i.count++, r.__pipeline = i;
    }, e.wrapStageHandler = function(t, r) {
      return Z(t) && (t = {
        overallReset: t,
        seriesType: VM(t)
      }), t.uid = xl("stageHandler"), r && (t.visualType = r), t;
    }, e;
  }()
);
function OM(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function EM(e) {
  return e.overallProgress && kM;
}
function kM() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function NM() {
  this.agent && this.agent.dirty();
}
function BM(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function zM(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = kt(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? U(t, function(r, n) {
    return __(n);
  }) : FM;
}
var FM = __(0);
function __(e) {
  return function(t, r) {
    var n = r.data, i = r.resetDefines[e];
    if (i && i.dataEach)
      for (var a = t.start; a < t.end; a++)
        i.dataEach(n, a);
    else i && i.progress && i.progress(t, n);
  };
}
function HM(e) {
  return e.data.count();
}
function VM(e) {
  js = null;
  try {
    e(ro, b_);
  } catch {
  }
  return js;
}
var ro = {}, b_ = {}, js;
w_(ro, gf);
w_(b_, Zm);
ro.eachSeriesByType = ro.eachRawSeriesByType = function(e) {
  js = e;
};
ro.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (js = e.subType);
};
function w_(e, t) {
  for (var r in t.prototype)
    e[r] = Yt;
}
var np = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const GM = {
  color: np,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], np]
};
var zt = "#B9B8CE", ip = "#100C2A", Wo = function() {
  return {
    axisLine: {
      lineStyle: {
        color: zt
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
}, ap = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], S_ = {
  darkMode: !0,
  color: ap,
  backgroundColor: ip,
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
      color: zt
    },
    pageTextStyle: {
      color: zt
    }
  },
  textStyle: {
    color: zt
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
      borderColor: zt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: zt
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
      color: zt
    }
  },
  timeline: {
    lineStyle: {
      color: zt
    },
    label: {
      color: zt
    },
    controlStyle: {
      color: zt,
      borderColor: zt
    }
  },
  calendar: {
    itemStyle: {
      color: ip
    },
    dayLabel: {
      color: zt
    },
    monthLabel: {
      color: zt
    },
    yearLabel: {
      color: zt
    }
  },
  timeAxis: Wo(),
  logAxis: Wo(),
  valueAxis: Wo(),
  categoryAxis: Wo(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: ap
  },
  gauge: {
    title: {
      color: zt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: zt
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
S_.categoryAxis.splitLine.show = !1;
var WM = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, n = {}, i = {};
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
            var f = o[c], v = u.lastIndexOf(f);
            if (v > 0 && v === u.length - f.length) {
              var d = u.slice(0, v);
              d !== "data" && (r.mainType = d, r[f.toLowerCase()] = l, h = !0);
            }
          }
          s.hasOwnProperty(u) && (n[u] = l, h = !0), h || (i[u] = l);
        });
      }
      return {
        cptQuery: r,
        dataQuery: n,
        otherQuery: i
      };
    }, e.prototype.filter = function(t, r) {
      var n = this.eventInfo;
      if (!n)
        return !0;
      var i = n.targetEl, a = n.packedEvent, o = n.model, s = n.view;
      if (!o || !s)
        return !0;
      var l = r.cptQuery, u = r.dataQuery;
      return h(l, o, "mainType") && h(l, o, "subType") && h(l, o, "index", "componentIndex") && h(l, o, "name") && h(l, o, "id") && h(u, a, "name") && h(u, a, "dataIndex") && h(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, r.otherQuery, i, a));
      function h(c, f, v, d) {
        return c[v] == null || f[d || v] === c[v];
      }
    }, e.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, e;
  }()
), Jh = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], op = Jh.concat(["symbolKeepAspect"]), UM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var n = {}, i = {}, a = !1, o = 0; o < Jh.length; o++) {
      var s = Jh[o], l = e.get(s);
      Z(l) ? (a = !0, i[s] = l) : n[s] = l;
    }
    if (n.symbol = n.symbol || e.defaultSymbol, r.setVisual(N({
      legendIcon: e.legendIcon || n.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, n)), t.isSeriesFiltered(e))
      return;
    var u = mt(i);
    function h(c, f) {
      for (var v = e.getRawValue(f), d = e.getDataParams(f), g = 0; g < u.length; g++) {
        var p = u[g];
        c.setItemVisual(f, p, i[p](v, d));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, YM = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function n(i, a) {
      for (var o = i.getItemModel(a), s = 0; s < op.length; s++) {
        var l = op[s], u = o.getShallow(l, !0);
        u != null && i.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? n : null
    };
  }
};
function x_(e, t, r) {
  switch (r) {
    case "color":
      var n = e.getItemVisual(t, "style");
      return n[e.getVisual("drawType")];
    case "opacity":
      return e.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getItemVisual(t, r);
  }
}
function T_(e, t) {
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
function XM(e, t, r, n) {
  switch (r) {
    case "color":
      var i = e.ensureUniqueItemVisual(t, "style");
      i[e.getVisual("drawType")] = n, e.setItemVisual(t, "colorFromPalette", !1);
      break;
    case "opacity":
      e.ensureUniqueItemVisual(t, "style").opacity = n;
      break;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      e.setItemVisual(t, r, n);
      break;
  }
}
function ri(e, t, r, n, i) {
  var a = e + t;
  r.isSilent(a) || n.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = i.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var c = o.getData(), f = En(c, i.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: z(f) ? c.getName(f[0]) : c.getName(f),
          selected: H(l) ? l : N({}, l)
        });
      }
  });
}
function qM(e, t, r) {
  e.on("selectchanged", function(n) {
    var i = r.getModel();
    n.isFromClick ? (ri("map", "selectchanged", t, i, n), ri("pie", "selectchanged", t, i, n)) : n.fromAction === "select" ? (ri("map", "selected", t, i, n), ri("pie", "selected", t, i, n)) : n.fromAction === "unselect" && (ri("map", "unselected", t, i, n), ri("pie", "unselected", t, i, n));
  });
}
function gi(e, t, r) {
  for (var n; e && !(t(e) && (n = e, r)); )
    e = e.__hostTarget || e.parent;
  return n;
}
var ZM = Math.round(Math.random() * 9), KM = typeof Object.defineProperty == "function", jM = function() {
  function e() {
    this._id = "__ec_inner_" + ZM++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var n = this._guard(t);
    return KM ? Object.defineProperty(n, this._id, {
      value: r,
      enumerable: !1,
      configurable: !0
    }) : n[this._id] = r, this;
  }, e.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, e.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, e.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, e;
}(), QM = vt.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, n = t.cy, i = t.width / 2, a = t.height / 2;
    e.moveTo(r, n - a), e.lineTo(r + i, n + a), e.lineTo(r - i, n + a), e.closePath();
  }
}), JM = vt.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.cx, n = t.cy, i = t.width / 2, a = t.height / 2;
    e.moveTo(r, n - a), e.lineTo(r + i, n), e.lineTo(r, n + a), e.lineTo(r - i, n), e.closePath();
  }
}), tD = vt.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.x, n = t.y, i = t.width / 5 * 3, a = Math.max(i, t.height), o = i / 2, s = o * o / (a - o), l = n - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), f = Math.cos(u), v = o * 0.6, d = o * 0.7;
    e.moveTo(r - h, l + s), e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), e.bezierCurveTo(r + h - c * v, l + s + f * v, r, n - d, r, n), e.bezierCurveTo(r, n - d, r - h + c * v, l + s + f * v, r - h, l + s), e.closePath();
  }
}), eD = vt.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.height, n = t.width, i = t.x, a = t.y, o = n / 3 * 2;
    e.moveTo(i, a), e.lineTo(i + o, a + r), e.lineTo(i, a + r / 4 * 3), e.lineTo(i - o, a + r), e.lineTo(i, a), e.closePath();
  }
}), rD = {
  line: Wr,
  rect: St,
  roundRect: St,
  square: St,
  circle: yl,
  diamond: JM,
  pin: tD,
  arrow: eD,
  triangle: QM
}, nD = {
  line: function(e, t, r, n, i) {
    i.x1 = e, i.y1 = t + n / 2, i.x2 = e + r, i.y2 = t + n / 2;
  },
  rect: function(e, t, r, n, i) {
    i.x = e, i.y = t, i.width = r, i.height = n;
  },
  roundRect: function(e, t, r, n, i) {
    i.x = e, i.y = t, i.width = r, i.height = n, i.r = Math.min(r, n) / 4;
  },
  square: function(e, t, r, n, i) {
    var a = Math.min(r, n);
    i.x = e, i.y = t, i.width = a, i.height = a;
  },
  circle: function(e, t, r, n, i) {
    i.cx = e + r / 2, i.cy = t + n / 2, i.r = Math.min(r, n) / 2;
  },
  diamond: function(e, t, r, n, i) {
    i.cx = e + r / 2, i.cy = t + n / 2, i.width = r, i.height = n;
  },
  pin: function(e, t, r, n, i) {
    i.x = e + r / 2, i.y = t + n / 2, i.width = r, i.height = n;
  },
  arrow: function(e, t, r, n, i) {
    i.x = e + r / 2, i.y = t + n / 2, i.width = r, i.height = n;
  },
  triangle: function(e, t, r, n, i) {
    i.cx = e + r / 2, i.cy = t + n / 2, i.width = r, i.height = n;
  }
}, tc = {};
C(rD, function(e, t) {
  tc[t] = new e();
});
var iD = vt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var n = zs(e, t, r), i = this.shape;
    return i && i.symbolType === "pin" && t.position === "inside" && (n.y = r.y + r.height * 0.4), n;
  },
  buildPath: function(e, t, r) {
    var n = t.symbolType;
    if (n !== "none") {
      var i = tc[n];
      i || (n = "rect", i = tc[n]), nD[n](t.x, t.y, t.width, t.height, i.shape), i.buildPath(e, i.shape, r);
    }
  }
});
function aD(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function gr(e, t, r, n, i, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = Sm(e.slice(8), new ut(t, r, n, i), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = sf(e.slice(7), {}, new ut(t, r, n, i), o ? "center" : "cover") : l = new iD({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: n,
      height: i
    }
  }), l.__isEmptyBrush = s, l.setColor = aD, a && l.setColor(a), l;
}
function oD(e) {
  return z(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0];
}
function C_(e, t) {
  if (e != null)
    return z(e) || (e = [e, e]), [Ut(e[0], t[0]) || 0, Ut(tt(e[1], e[0]), t[1]) || 0];
}
function Cn(e) {
  return isFinite(e);
}
function sD(e, t, r) {
  var n = t.x == null ? 0 : t.x, i = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (n = n * r.width + r.x, i = i * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), n = Cn(n) ? n : 0, i = Cn(i) ? i : 1, a = Cn(a) ? a : 0, o = Cn(o) ? o : 0;
  var s = e.createLinearGradient(n, a, i, o);
  return s;
}
function lD(e, t, r) {
  var n = r.width, i = r.height, a = Math.min(n, i), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * n + r.x, s = s * i + r.y, l = l * a), o = Cn(o) ? o : 0.5, s = Cn(s) ? s : 0.5, l = l >= 0 && Cn(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function ec(e, t, r) {
  for (var n = t.type === "radial" ? lD(e, t, r) : sD(e, t, r), i = t.colorStops, a = 0; a < i.length; a++)
    n.addColorStop(i[a].offset, i[a].color);
  return n;
}
function uD(e, t) {
  if (e === t || !e && !t)
    return !1;
  if (!e || !t || e.length !== t.length)
    return !0;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !0;
  return !1;
}
function Uo(e) {
  return parseInt(e, 10);
}
function Yo(e, t, r) {
  var n = ["width", "height"][t], i = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (r[n] != null && r[n] !== "auto")
    return parseFloat(r[n]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[i] || Uo(s[n]) || Uo(e.style[n])) - (Uo(s[a]) || 0) - (Uo(s[o]) || 0) | 0;
}
function hD(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : _t(e) ? [e] : z(e) ? e : null;
}
function M_(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && hD(t.lineDash, t.lineWidth), n = t.lineDashOffset;
  if (r) {
    var i = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    i && i !== 1 && (r = U(r, function(a) {
      return a / i;
    }), n /= i);
  }
  return [r, n];
}
var cD = new kn(!0);
function Qs(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function sp(e) {
  return typeof e == "string" && e !== "none";
}
function Js(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function lp(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function up(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function rc(e, t, r) {
  var n = Qy(t.image, t.__image, r);
  if (fl(n)) {
    var i = e.createPattern(n, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && i && i.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * B1), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), i.setTransform(a);
    }
    return i;
  }
}
function fD(e, t, r, n) {
  var i, a = Qs(r), o = Js(r), s = r.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || cD, c = t.__dirty;
  if (!n) {
    var f = r.fill, v = r.stroke, d = o && !!f.colorStops, g = a && !!v.colorStops, p = o && !!f.image, y = a && !!v.image, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0;
    (d || g) && (w = t.getBoundingRect()), d && (m = c ? ec(e, f, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = c ? ec(e, v, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (b = c || !t.__canvasFillPattern ? rc(e, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = c || !t.__canvasStrokePattern ? rc(e, v, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), d ? e.fillStyle = m : p && (b ? e.fillStyle = b : o = !1), g ? e.strokeStyle = _ : y && (S ? e.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var M, D;
  e.setLineDash && r.lineDash && (i = M_(t), M = i[0], D = i[1]);
  var A = !0;
  (u || c & ui) && (h.setDPR(e.dpr), l ? h.setContext(null) : (h.setContext(e), A = !1), h.reset(), t.buildPath(h, t.shape, n), h.toStatic(), t.pathUpdated()), A && h.rebuildPath(e, l ? s : 1), M && (e.setLineDash(M), e.lineDashOffset = D), n || (r.strokeFirst ? (a && up(e, r), o && lp(e, r)) : (o && lp(e, r), a && up(e, r))), M && e.setLineDash([]);
}
function vD(e, t, r) {
  var n = t.__image = Qy(r.image, t.__image, t, t.onload);
  if (!(!n || !fl(n))) {
    var i = r.x || 0, a = r.y || 0, o = t.getWidth(), s = t.getHeight(), l = n.width / n.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = n.width, s = n.height), r.sWidth && r.sHeight) {
      var u = r.sx || 0, h = r.sy || 0;
      e.drawImage(n, u, h, r.sWidth, r.sHeight, i, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx, h = r.sy, c = o - u, f = s - h;
      e.drawImage(n, u, h, c, f, i, a, o, s);
    } else
      e.drawImage(n, i, a, o, s);
  }
}
function dD(e, t, r) {
  var n, i = r.text;
  if (i != null && (i += ""), i) {
    e.font = r.font || Rn, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (n = M_(t), a = n[0], o = n[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (Qs(r) && e.strokeText(i, r.x, r.y), Js(r) && e.fillText(i, r.x, r.y)) : (Js(r) && e.fillText(i, r.x, r.y), Qs(r) && e.strokeText(i, r.x, r.y)), a && e.setLineDash([]);
  }
}
var hp = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], cp = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function D_(e, t, r, n, i) {
  var a = !1;
  if (!n && (r = r || {}, t === r))
    return !1;
  if (n || t.opacity !== r.opacity) {
    te(e, i), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? An.opacity : o;
  }
  (n || t.blend !== r.blend) && (a || (te(e, i), a = !0), e.globalCompositeOperation = t.blend || An.blend);
  for (var s = 0; s < hp.length; s++) {
    var l = hp[s];
    (n || t[l] !== r[l]) && (a || (te(e, i), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (n || t.shadowColor !== r.shadowColor) && (a || (te(e, i), a = !0), e.shadowColor = t.shadowColor || An.shadowColor), a;
}
function fp(e, t, r, n, i) {
  var a = no(t, i.inHover), o = n ? null : r && no(r, i.inHover) || {};
  if (a === o)
    return !1;
  var s = D_(e, a, o, n, i);
  if ((n || a.fill !== o.fill) && (s || (te(e, i), s = !0), sp(a.fill) && (e.fillStyle = a.fill)), (n || a.stroke !== o.stroke) && (s || (te(e, i), s = !0), sp(a.stroke) && (e.strokeStyle = a.stroke)), (n || a.opacity !== o.opacity) && (s || (te(e, i), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (te(e, i), s = !0), e.lineWidth = u);
  }
  for (var h = 0; h < cp.length; h++) {
    var c = cp[h], f = c[0];
    (n || a[f] !== o[f]) && (s || (te(e, i), s = !0), e[f] = a[f] || c[1]);
  }
  return s;
}
function pD(e, t, r, n, i) {
  return D_(e, no(t, i.inHover), r && no(r, i.inHover), n, i);
}
function A_(e, t) {
  var r = t.transform, n = e.dpr || 1;
  r ? e.setTransform(n * r[0], n * r[1], n * r[2], n * r[3], n * r[4], n * r[5]) : e.setTransform(n, 0, 0, n, 0, 0);
}
function gD(e, t, r) {
  for (var n = !1, i = 0; i < e.length; i++) {
    var a = e[i];
    n = n || a.isZeroArea(), A_(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = n;
}
function yD(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var vp = 1, dp = 2, pp = 3, gp = 4;
function mD(e) {
  var t = Js(e), r = Qs(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function te(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function no(e, t) {
  return t && e.__hoverStyle || e.style;
}
function I_(e, t) {
  Mn(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Mn(e, t, r, n) {
  var i = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~oe, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = r.prevElClipPaths, s = !1, l = !1;
  if ((!o || uD(a, o)) && (o && o.length && (te(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (te(e, r), e.save(), gD(a, e, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var h = t instanceof vt && t.autoBatch && mD(t.style);
  s || yD(i, u.transform) ? (te(e, r), A_(e, t)) : h || te(e, r);
  var c = no(t, r.inHover);
  t instanceof vt ? (r.lastDrawType !== vp && (l = !0, r.lastDrawType = vp), fp(e, t, u, l, r), (!h || !r.batchFill && !r.batchStroke) && e.beginPath(), fD(e, t, c, h), h && (r.batchFill = c.fill || "", r.batchStroke = c.stroke || "")) : t instanceof Vs ? (r.lastDrawType !== pp && (l = !0, r.lastDrawType = pp), fp(e, t, u, l, r), dD(e, t, c)) : t instanceof er ? (r.lastDrawType !== dp && (l = !0, r.lastDrawType = dp), pD(e, t, u, l, r), vD(e, t, c)) : t.getTemporalDisplayables && (r.lastDrawType !== gp && (l = !0, r.lastDrawType = gp), _D(e, t, r)), h && n && te(e, r), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function _D(e, t, r) {
  var n = t.getDisplayables(), i = t.getTemporalDisplayables();
  e.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: r.viewWidth,
    viewHeight: r.viewHeight,
    inHover: r.inHover
  }, o, s;
  for (o = t.getCursor(), s = n.length; o < s; o++) {
    var l = n[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Mn(e, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = i.length; u < h; u++) {
    var l = i[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Mn(e, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Fu = new jM(), yp = new co(100), mp = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function nc(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), n = t.getZr(), i = n.painter.type === "svg";
  e.dirty && Fu.delete(e);
  var a = Fu.get(e);
  if (a)
    return a;
  var o = ht(e, {
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / r, Fu.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var h = [r], c = !0, f = 0; f < mp.length; ++f) {
      var v = o[mp[f]];
      if (v != null && !z(v) && !H(v) && !_t(v) && typeof v != "boolean") {
        c = !1;
        break;
      }
      h.push(v);
    }
    var d;
    if (c) {
      d = h.join(",") + (i ? "-svg" : "");
      var g = yp.get(d);
      g && (i ? u.svgElement = g : u.image = g);
    }
    var p = $_(o.dashArrayX), y = bD(o.dashArrayY), m = L_(o.symbol), _ = wD(p), b = P_(y), S = !i && Gr.createCanvas(), w = i && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), M;
    S && (S.width = x.width * r, S.height = x.height * r, M = S.getContext("2d")), A(), c && yp.put(d, S || w), u.image = S, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, L = 0, $ = _.length; L < $; ++L)
        T = $v(T, _[L]);
      for (var P = 1, L = 0, $ = m.length; L < $; ++L)
        P = $v(P, m[L].length);
      T *= P;
      var R = b * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(R, o.maxTileHeight))
      };
    }
    function A() {
      M && (M.clearRect(0, 0, S.width, S.height), o.backgroundColor && (M.fillStyle = o.backgroundColor, M.fillRect(0, 0, S.width, S.height)));
      for (var T = 0, L = 0; L < y.length; ++L)
        T += y[L];
      if (T <= 0)
        return;
      for (var $ = -b, P = 0, R = 0, O = 0; $ < x.height; ) {
        if (P % 2 === 0) {
          for (var G = R / 2 % m.length, k = 0, F = 0, W = 0; k < x.width * 2; ) {
            for (var j = 0, L = 0; L < p[O].length; ++L)
              j += p[O][L];
            if (j <= 0)
              break;
            if (F % 2 === 0) {
              var rt = (1 - o.symbolSize) * 0.5, dt = k + p[O][F] * rt, wt = $ + y[P] * rt, xt = p[O][F] * o.symbolSize, Ce = y[P] * o.symbolSize, qr = W / 2 % m[G].length;
              Wn(dt, wt, xt, Ce, m[G][qr]);
            }
            k += p[O][F], ++W, ++F, F === p[O].length && (F = 0);
          }
          ++O, O === p.length && (O = 0);
        }
        $ += y[P], ++R, ++P, P === y.length && (P = 0);
      }
      function Wn(ie, Rt, K, nt, Zr) {
        var Gt = i ? 1 : r, Bf = gr(Zr, ie * Gt, Rt * Gt, K * Gt, nt * Gt, o.color, o.symbolKeepAspect);
        if (i) {
          var zf = n.painter.renderOneToVNode(Bf);
          zf && w.children.push(zf);
        } else
          I_(M, Bf);
      }
    }
  }
}
function L_(e) {
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
    return L_([e]);
  for (var n = [], r = 0; r < e.length; ++r)
    H(e[r]) ? n.push([e[r]]) : n.push(e[r]);
  return n;
}
function $_(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (_t(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, n = 0; n < e.length; ++n)
    if (!_t(e[n])) {
      r = !1;
      break;
    }
  if (r)
    return $_([e]);
  for (var i = [], n = 0; n < e.length; ++n)
    if (_t(e[n])) {
      var t = Math.ceil(e[n]);
      i.push([t, t]);
    } else {
      var t = U(e[n], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? i.push(t.concat(t)) : i.push(t);
    }
  return i;
}
function bD(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (_t(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = U(e, function(n) {
    return Math.ceil(n);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function wD(e) {
  return U(e, function(t) {
    return P_(t);
  });
}
function P_(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function SD(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var n = r.getData();
      n.hasItemVisual() && n.each(function(o) {
        var s = n.getItemVisual(o, "decal");
        if (s) {
          var l = n.ensureUniqueItemVisual(o, "style");
          l.decal = nc(s, t);
        }
      });
      var i = n.getVisual("decal");
      if (i) {
        var a = n.getVisual("style");
        a.decal = nc(i, t);
      }
    }
  });
}
var Le = new tr(), R_ = {};
function xD(e, t) {
  R_[e] = t;
}
function TD(e) {
  return R_[e];
}
var CD = 1, MD = 800, DD = 900, AD = 1e3, ID = 2e3, LD = 5e3, O_ = 1e3, $D = 1100, Sf = 2e3, E_ = 3e3, PD = 4e3, Ol = 4500, RD = 4600, OD = 5e3, ED = 6e3, k_ = 7e3, kD = {
  PROCESSOR: {
    FILTER: AD,
    SERIES_FILTER: MD,
    STATISTIC: LD
  },
  VISUAL: {
    LAYOUT: O_,
    PROGRESSIVE_LAYOUT: $D,
    GLOBAL: Sf,
    CHART: E_,
    POST_CHART_LAYOUT: RD,
    COMPONENT: PD,
    BRUSH: OD,
    CHART_ITEM: Ol,
    ARIA: ED,
    DECAL: k_
  }
}, Bt = "__flagInMainProcess", Zt = "__pendingUpdate", Hu = "__needsUpdateStatus", _p = /^[a-zA-Z0-9_]+$/, Vu = "__connectUpdateStatus", bp = 0, ND = 1, BD = 2;
function N_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return z_(this, e, t);
  };
}
function B_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return z_(this, e, t);
  };
}
function z_(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), tr.prototype[t].apply(e, r);
}
var F_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(tr)
), H_ = F_.prototype;
H_.on = B_("on");
H_.off = B_("off");
var ni, Gu, Xo, Ir, Wu, Uu, Yu, sa, la, wp, Sp, Xu, xp, qo, Tp, V_, he, Cp, G_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i) {
      var a = e.call(this, new WM()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], i = i || {}, H(n) && (n = W_[n]), a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      i.ssr;
      var u = a._zr = Av(r, {
        renderer: i.renderer || o,
        devicePixelRatio: i.devicePixelRatio,
        width: i.width,
        height: i.height,
        ssr: i.ssr,
        useDirtyRect: tt(i.useDirtyRect, l),
        useCoarsePointer: tt(i.useCoarsePointer, s),
        pointerSize: i.pointerSize
      });
      a._ssr = i.ssr, a._throttledZrFlush = wf(J(u.flush, u), 17), n = q(n), n && jm(n, !0), a._theme = n, a._locale = KT(i.locale || Lm), a._coordSysMgr = new $l();
      var h = a._api = Tp(a);
      function c(f, v) {
        return f.__prio - v.__prio;
      }
      return hs(el, c), hs(ic, c), a._scheduler = new m_(a, h, ic, el), a._messageCenter = new F_(), a._initEvents(), a.resize = J(a.resize, a), u.animation.on("frame", a._onframe, a), wp(u, a), Sp(u, a), mh(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        Cp(this);
        var r = this._scheduler;
        if (this[Zt]) {
          var n = this[Zt].silent;
          this[Bt] = !0;
          try {
            ni(this), Ir.update.call(this, null, this[Zt].updateParams);
          } catch (l) {
            throw this[Bt] = !1, this[Zt] = null, l;
          }
          this._zr.flush(), this[Bt] = !1, this[Zt] = null, sa.call(this, n), la.call(this, n);
        } else if (r.unfinished) {
          var i = CD, a = this._model, o = this._api;
          r.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Uu(this, a), r.performVisualTasks(a), qo(this, this._model, o, "remain", {}), i -= +/* @__PURE__ */ new Date() - s;
          } while (i > 0 && r.unfinished);
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
    }, t.prototype.setOption = function(r, n, i) {
      if (!this[Bt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (V(n) && (i = n.lazyUpdate, a = n.silent, o = n.replaceMerge, s = n.transition, n = n.notMerge), this[Bt] = !0, !this._model || n) {
          var l = new TC(this._api), u = this._theme, h = this._model = new gf();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, ac);
        var c = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (i)
          this[Zt] = {
            silent: a,
            updateParams: c
          }, this[Bt] = !1, this.getZr().wakeUp();
        else {
          try {
            ni(this), Ir.update.call(this, null, c);
          } catch (f) {
            throw this[Zt] = null, this[Bt] = !1, f;
          }
          this._ssr || this._zr.flush(), this[Zt] = null, this[Bt] = !1, sa.call(this, a), la.call(this, a);
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
      var n = this._zr.painter;
      return n.getRenderedCanvas({
        backgroundColor: r.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: r.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(r) {
      r = r || {};
      var n = this._zr.painter;
      return n.renderToString({
        useViewBox: r.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (X.svgSupported) {
        var r = this._zr, n = r.storage.getDisplayList();
        return C(n, function(i) {
          i.stopAnimation(null, !0);
        }), r.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      r = r || {};
      var n = r.excludeComponents, i = this._model, a = [], o = this;
      C(n, function(l) {
        i.eachComponent({
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
      var n = r.type === "svg", i = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (Mp[i]) {
        var l = s, u = s, h = -s, c = -s, f = [], v = r && r.pixelRatio || this.getDevicePixelRatio();
        C(Na, function(_, b) {
          if (_.group === i) {
            var S = n ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(q(r)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), c = o(w.bottom, c), f.push({
              dom: S,
              left: w.left,
              top: w.top
            });
          }
        }), l *= v, u *= v, h *= v, c *= v;
        var d = h - l, g = c - u, p = Gr.createCanvas(), y = Av(p, {
          renderer: n ? "svg" : "canvas"
        });
        if (y.resize({
          width: d,
          height: g
        }), n) {
          var m = "";
          return C(f, function(_) {
            var b = _.left - l, S = _.top - u;
            m += '<g transform="translate(' + b + "," + S + ')">' + _.dom + "</g>";
          }), y.painter.getSvgRoot().innerHTML = m, r.connectedBackgroundColor && y.painter.setBackgroundColor(r.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return r.connectedBackgroundColor && y.add(new St({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: g
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), C(f, function(_) {
            var b = new er({
              style: {
                x: _.left * v - l,
                y: _.top * v - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), p.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, t.prototype.convertToPixel = function(r, n) {
      return Wu(this, "convertToPixel", r, n);
    }, t.prototype.convertFromPixel = function(r, n) {
      return Wu(this, "convertFromPixel", r, n);
    }, t.prototype.containPixel = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = this._model, a, o = vu(i, r);
      return C(o, function(s, l) {
        l.indexOf("Models") >= 0 && C(s, function(u) {
          var h = u.coordinateSystem;
          if (h && h.containPoint)
            a = a || !!h.containPoint(n);
          else if (l === "seriesModels") {
            var c = this._chartsMap[u.__viewId];
            c && c.containPoint && (a = a || c.containPoint(n, u));
          }
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(r, n) {
      var i = this._model, a = vu(i, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? x_(s, l, n) : T_(s, n);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      C(zD, function(n) {
        var i = function(a) {
          var o = r.getModel(), s = a.target, l, u = n === "globalout";
          if (u ? l = {} : s && gi(s, function(d) {
            var g = st(d);
            if (g && g.dataIndex != null) {
              var p = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = p && p.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = N({}, g.eventData), !0;
          }, !0), l) {
            var h = l.componentType, c = l.componentIndex;
            (h === "markLine" || h === "markPoint" || h === "markArea") && (h = "series", c = l.seriesIndex);
            var f = h && c != null && o.getComponent(h, c), v = f && r[f.mainType === "series" ? "_chartsMap" : "_componentsMap"][f.__viewId];
            l.event = a, l.type = n, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: f,
              view: v
            }, r.trigger(n, l);
          }
        };
        i.zrEventfulCallAtLast = !0, r._zr.on(n, i, r);
      }), C(ka, function(n, i) {
        r._messageCenter.on(i, function(a) {
          this.trigger(i, a);
        }, r);
      }), C(["selectchanged"], function(n) {
        r._messageCenter.on(n, function(i) {
          this.trigger(n, i);
        }, r);
      }), qM(this._messageCenter, this, this._api);
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
      r && Zy(this.getDom(), Tf, "");
      var n = this, i = n._api, a = n._model;
      C(n._componentsViews, function(o) {
        o.dispose(a, i);
      }), C(n._chartsViews, function(o) {
        o.dispose(a, i);
      }), n._zr.dispose(), n._dom = n._model = n._chartsMap = n._componentsMap = n._chartsViews = n._componentsViews = n._scheduler = n._api = n._zr = n._throttledZrFlush = n._theme = n._coordSysMgr = n._messageCenter = null, delete Na[n.id];
    }, t.prototype.resize = function(r) {
      if (!this[Bt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(r);
        var n = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!n) {
          var i = n.resetOption("media"), a = r && r.silent;
          this[Zt] && (a == null && (a = this[Zt].silent), i = !0, this[Zt] = null), this[Bt] = !0;
          try {
            i && ni(this), Ir.update.call(this, {
              type: "resize",
              animation: N({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[Bt] = !1, o;
          }
          this[Bt] = !1, sa.call(this, a), la.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(r) && (n = r, r = ""), r = r || "default", this.hideLoading(), !!oc[r]) {
        var i = oc[r](this._api, n), a = this._zr;
        this._loadingFX = i, a.add(i);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(r) {
      var n = N({}, r);
      return n.type = ka[r.type], n;
    }, t.prototype.dispatchAction = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(n) || (n = {
        silent: !!n
      }), !!tl[r.type] && this._model) {
        if (this[Bt]) {
          this._pendingActions.push(r);
          return;
        }
        var i = n.silent;
        Yu.call(this, r, i);
        var a = n.flush;
        a ? this._zr.flush() : a !== !1 && X.browser.weChat && this._throttledZrFlush(), sa.call(this, i), la.call(this, i);
      }
    }, t.prototype.updateLabelLayout = function() {
      Le.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(r) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = r.seriesIndex, i = this.getModel(), a = i.getSeriesByIndex(n);
      a.appendData(r), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = function() {
      ni = function(c) {
        var f = c._scheduler;
        f.restorePipelines(c._model), f.prepareStageTasks(), Gu(c, !0), Gu(c, !1), f.plan();
      }, Gu = function(c, f) {
        for (var v = c._model, d = c._scheduler, g = f ? c._componentsViews : c._chartsViews, p = f ? c._componentsMap : c._chartsMap, y = c._zr, m = c._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        f ? v.eachComponent(function(w, x) {
          w !== "series" && b(x);
        }) : v.eachSeries(b);
        function b(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var M = "_ec_" + w.id + "_" + w.type, D = !x && p[M];
          if (!D) {
            var A = Ye(w.type), T = f ? Ee.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Se.getClass(A.sub)
            );
            D = new T(), D.init(v, m), p[M] = D, g.push(D), y.add(D.group);
          }
          w.__viewId = D.__id = M, D.__alive = !0, D.__model = w, D.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !f && d.prepareView(D, w, v, m);
        }
        for (var _ = 0; _ < g.length; ) {
          var S = g[_];
          S.__alive ? _++ : (!f && S.renderTask.dispose(), y.remove(S.group), S.dispose(v, m), g.splice(_, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, Xo = function(c, f, v, d, g) {
        var p = c._model;
        if (p.setUpdatePayload(v), !d) {
          C([].concat(c._componentsViews).concat(c._chartsViews), S);
          return;
        }
        var y = {};
        y[d + "Id"] = v[d + "Id"], y[d + "Index"] = v[d + "Index"], y[d + "Name"] = v[d + "Name"];
        var m = {
          mainType: d,
          query: y
        };
        g && (m.subType = g);
        var _ = v.excludeSeriesId, b;
        _ != null && (b = Q(), C(kt(_), function(w) {
          var x = Re(w, null);
          x != null && b.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          if (!x)
            if (od(v))
              if (w instanceof Oe)
                v.type === In && !v.notBlur && !w.get(["emphasis", "disabled"]) && Ex(w, v, c._api);
              else {
                var M = Qc(w.mainType, w.componentIndex, v.name, c._api), D = M.focusSelf, A = M.dispatchers;
                v.type === In && D && !v.notBlur && Bh(w.mainType, w.componentIndex, c._api), A && C(A, function(T) {
                  v.type === In ? Gs(T) : Ws(T);
                });
              }
            else Vh(v) && w instanceof Oe && (Bx(w, v, c._api), id(w), he(c));
        }, c), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          x || S(c[d === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, c);
        function S(w) {
          w && w.__alive && w[f] && w[f](w.__model, p, c._api, v);
        }
      }, Ir = {
        prepareAndUpdate: function(c) {
          ni(this), Ir.update.call(this, c, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: c.newOption != null
          });
        },
        update: function(c, f) {
          var v = this._model, d = this._api, g = this._zr, p = this._coordSysMgr, y = this._scheduler;
          if (v) {
            v.setUpdatePayload(c), y.restoreData(v, c), y.performSeriesTasks(v), p.create(v, d), y.performDataProcessorTasks(v, c), Uu(this, v), p.update(v, d), r(v), y.performVisualTasks(v, c), Xu(this, v, d, c, f);
            var m = v.get("backgroundColor") || "transparent", _ = v.get("darkMode");
            g.setBackgroundColor(m), _ != null && _ !== "auto" && g.setDarkMode(_), Le.trigger("afterupdate", v, d);
          }
        },
        updateTransform: function(c) {
          var f = this, v = this._model, d = this._api;
          if (v) {
            v.setUpdatePayload(c);
            var g = [];
            v.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = f.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var b = _.updateTransform(m, v, d, c);
                    b && b.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = Q();
            v.eachSeries(function(y) {
              var m = f._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, v, d, c);
                _ && _.update && p.set(y.uid, 1);
              } else
                p.set(y.uid, 1);
            }), r(v), this._scheduler.performVisualTasks(v, c, {
              setDirty: !0,
              dirtyMap: p
            }), qo(this, v, d, c, {}, p), Le.trigger("afterupdate", v, d);
          }
        },
        updateView: function(c) {
          var f = this._model;
          f && (f.setUpdatePayload(c), Se.markUpdateMethod(c, "updateView"), r(f), this._scheduler.performVisualTasks(f, c, {
            setDirty: !0
          }), Xu(this, f, this._api, c, {}), Le.trigger("afterupdate", f, this._api));
        },
        updateVisual: function(c) {
          var f = this, v = this._model;
          v && (v.setUpdatePayload(c), v.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), Se.markUpdateMethod(c, "updateVisual"), r(v), this._scheduler.performVisualTasks(v, c, {
            visualType: "visual",
            setDirty: !0
          }), v.eachComponent(function(d, g) {
            if (d !== "series") {
              var p = f.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, v, f._api, c);
            }
          }), v.eachSeries(function(d) {
            var g = f._chartsMap[d.__viewId];
            g.updateVisual(d, v, f._api, c);
          }), Le.trigger("afterupdate", v, this._api));
        },
        updateLayout: function(c) {
          Ir.update.call(this, c);
        }
      }, Wu = function(c, f, v, d) {
        if (c._disposed) {
          c.id;
          return;
        }
        for (var g = c._model, p = c._coordSysMgr.getCoordinateSystems(), y, m = vu(g, v), _ = 0; _ < p.length; _++) {
          var b = p[_];
          if (b[f] && (y = b[f](g, m, d)) != null)
            return y;
        }
      }, Uu = function(c, f) {
        var v = c._chartsMap, d = c._scheduler;
        f.eachSeries(function(g) {
          d.updateStreamModes(g, v[g.__viewId]);
        });
      }, Yu = function(c, f) {
        var v = this, d = this.getModel(), g = c.type, p = c.escapeConnect, y = tl[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), S = _[0] != null && Ye(_[0]);
        this[Bt] = !0;
        var w = [c], x = !1;
        c.batch && (x = !0, w = U(c.batch, function(P) {
          return P = ht(N({}, P), c), P.batch = null, P;
        }));
        var M = [], D, A = Vh(c), T = od(c);
        if (T && dm(this._api), C(w, function(P) {
          if (D = y.action(P, v._model, v._api), D = D || N({}, P), D.type = m.event || D.type, M.push(D), T) {
            var R = Xc(c), O = R.queryOptionMap, G = R.mainTypeSpecified, k = G ? O.keys()[0] : "series";
            Xo(v, b, P, k), he(v);
          } else A ? (Xo(v, b, P, "series"), he(v)) : S && Xo(v, b, P, S.main, S.sub);
        }), b !== "none" && !T && !A && !S)
          try {
            this[Zt] ? (ni(this), Ir.update.call(this, c), this[Zt] = null) : Ir[b].call(this, c);
          } catch (P) {
            throw this[Bt] = !1, P;
          }
        if (x ? D = {
          type: m.event || g,
          escapeConnect: p,
          batch: M
        } : D = M[0], this[Bt] = !1, !f) {
          var L = this._messageCenter;
          if (L.trigger(D.type, D), A) {
            var $ = {
              type: "selectchanged",
              escapeConnect: p,
              selected: zx(d),
              isFromClick: c.isFromClick || !1,
              fromAction: c.type,
              fromActionPayload: c
            };
            L.trigger($.type, $);
          }
        }
      }, sa = function(c) {
        for (var f = this._pendingActions; f.length; ) {
          var v = f.shift();
          Yu.call(this, v, c);
        }
      }, la = function(c) {
        !c && this.trigger("updated");
      }, wp = function(c, f) {
        c.on("rendered", function(v) {
          f.trigger("rendered", v), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          c.animation.isFinished() && !f[Zt] && !f._scheduler.unfinished && !f._pendingActions.length && f.trigger("finished");
        });
      }, Sp = function(c, f) {
        c.on("mouseover", function(v) {
          var d = v.target, g = gi(d, Hh);
          g && (kx(g, v, f._api), he(f));
        }).on("mouseout", function(v) {
          var d = v.target, g = gi(d, Hh);
          g && (Nx(g, v, f._api), he(f));
        }).on("click", function(v) {
          var d = v.target, g = gi(d, function(m) {
            return st(m).dataIndex != null;
          }, !0);
          if (g) {
            var p = g.selected ? "unselect" : "select", y = st(g);
            f._api.dispatchAction({
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
        c.clearColorPalette(), c.eachSeries(function(f) {
          f.clearColorPalette();
        });
      }
      function n(c) {
        var f = [], v = [], d = !1;
        if (c.eachComponent(function(m, _) {
          var b = _.get("zlevel") || 0, S = _.get("z") || 0, w = _.getZLevelKey();
          d = d || !!w, (m === "series" ? v : f).push({
            zlevel: b,
            z: S,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), d) {
          var g = f.concat(v), p, y;
          hs(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), C(g, function(m) {
            var _ = c.getComponent(m.type, m.idx), b = m.zlevel, S = m.key;
            p != null && (b = Math.max(p, b)), S ? (b === p && S !== y && b++, y = S) : y && (b === p && b++, y = ""), p = b, _.setZLevel(b);
          });
        }
      }
      Xu = function(c, f, v, d, g) {
        n(f), xp(c, f, v, d, g), C(c._chartsViews, function(p) {
          p.__alive = !1;
        }), qo(c, f, v, d, g), C(c._chartsViews, function(p) {
          p.__alive || p.remove(f, v);
        });
      }, xp = function(c, f, v, d, g, p) {
        C(p || c._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, f, v, d), s(m, y), h(m, y);
        });
      }, qo = function(c, f, v, d, g, p) {
        var y = c._scheduler;
        g = N(g || {}, {
          updatedSeries: f.getSeries()
        }), Le.trigger("series:beforeupdate", f, v, g);
        var m = !1;
        f.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          b.__alive = !0;
          var S = b.renderTask;
          y.updatePayload(S, d), u(_, b), p && p.get(_.uid) && S.dirty(), S.perform(y.getPerformArgs(S)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), id(_);
        }), y.unfinished = m || y.unfinished, Le.trigger("series:layoutlabels", f, v, g), Le.trigger("series:transition", f, v, g), f.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(c, f), Le.trigger("series:afterupdate", f, v, g);
      }, he = function(c) {
        c[Hu] = !0, c.getZr().wakeUp();
      }, Cp = function(c) {
        c[Hu] && (c.getZr().storage.traverse(function(f) {
          Ra(f) || i(f);
        }), c[Hu] = !1);
      };
      function i(c) {
        for (var f = [], v = c.currentStates, d = 0; d < v.length; d++) {
          var g = v[d];
          g === "emphasis" || g === "blur" || g === "select" || f.push(g);
        }
        c.selected && c.states.select && f.push("select"), c.hoverState === pl && c.states.emphasis ? f.push("emphasis") : c.hoverState === dl && c.states.blur && f.push("blur"), c.useStates(f);
      }
      function a(c, f) {
        var v = c._zr, d = v.storage, g = 0;
        d.traverse(function(p) {
          p.isGroup || g++;
        }), g > f.get("hoverLayerThreshold") && !X.node && !X.worker && f.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var y = c._chartsMap[p.__viewId];
            y.__alive && y.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(c, f) {
        var v = c.get("blendMode") || null;
        f.eachRendered(function(d) {
          d.isGroup || (d.style.blend = v);
        });
      }
      function s(c, f) {
        if (!c.preventAutoZ) {
          var v = c.get("z") || 0, d = c.get("zlevel") || 0;
          f.eachRendered(function(g) {
            return l(g, v, d, -1 / 0), !0;
          });
        }
      }
      function l(c, f, v, d) {
        var g = c.getTextContent(), p = c.getTextGuideLine(), y = c.isGroup;
        if (y)
          for (var m = c.childrenRef(), _ = 0; _ < m.length; _++)
            d = Math.max(l(m[_], f, v, d), d);
        else
          c.z = f, c.zlevel = v, d = Math.max(c.z2, d);
        if (g && (g.z = f, g.zlevel = v, isFinite(d) && (g.z2 = d + 2)), p) {
          var b = c.textGuideLineConfig;
          p.z = f, p.zlevel = v, isFinite(d) && (p.z2 = d + (b && b.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(c, f) {
        f.eachRendered(function(v) {
          if (!Ra(v)) {
            var d = v.getTextContent(), g = v.getTextGuideLine();
            v.stateTransition && (v.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), v.hasState() ? (v.prevStates = v.currentStates, v.clearStates()) : v.prevStates && (v.prevStates = null);
          }
        });
      }
      function h(c, f) {
        var v = c.getModel("stateAnimation"), d = c.isAnimationEnabled(), g = v.get("duration"), p = g > 0 ? {
          duration: g,
          delay: v.get("delay"),
          easing: v.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        f.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (Ra(y))
              return;
            if (y instanceof vt && Wx(y), y.__dirty) {
              var m = y.prevStates;
              m && y.useStates(m);
            }
            if (d) {
              y.stateTransition = p;
              var _ = y.getTextContent(), b = y.getTextGuideLine();
              _ && (_.stateTransition = p), b && (b.stateTransition = p);
            }
            y.__dirty && i(y);
          }
        });
      }
      Tp = function(c) {
        return new /** @class */
        (function(f) {
          B(v, f);
          function v() {
            return f !== null && f.apply(this, arguments) || this;
          }
          return v.prototype.getCoordinateSystems = function() {
            return c._coordSysMgr.getCoordinateSystems();
          }, v.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var g = d.__ecComponentInfo;
              if (g != null)
                return c._model.getComponent(g.mainType, g.index);
              d = d.parent;
            }
          }, v.prototype.enterEmphasis = function(d, g) {
            Gs(d, g), he(c);
          }, v.prototype.leaveEmphasis = function(d, g) {
            Ws(d, g), he(c);
          }, v.prototype.enterBlur = function(d) {
            Ox(d), he(c);
          }, v.prototype.leaveBlur = function(d) {
            hm(d), he(c);
          }, v.prototype.enterSelect = function(d) {
            cm(d), he(c);
          }, v.prototype.leaveSelect = function(d) {
            fm(d), he(c);
          }, v.prototype.getModel = function() {
            return c.getModel();
          }, v.prototype.getViewOfComponentModel = function(d) {
            return c.getViewOfComponentModel(d);
          }, v.prototype.getViewOfSeriesModel = function(d) {
            return c.getViewOfSeriesModel(d);
          }, v;
        }(Zm))(c);
      }, V_ = function(c) {
        function f(v, d) {
          for (var g = 0; g < v.length; g++) {
            var p = v[g];
            p[Vu] = d;
          }
        }
        C(ka, function(v, d) {
          c._messageCenter.on(d, function(g) {
            if (Mp[c.group] && c[Vu] !== bp) {
              if (g && g.escapeConnect)
                return;
              var p = c.makeActionFromEvent(g), y = [];
              C(Na, function(m) {
                m !== c && m.group === c.group && y.push(m);
              }), f(y, bp), C(y, function(m) {
                m[Vu] !== ND && m.dispatchAction(p);
              }), f(y, BD);
            }
          });
        });
      };
    }(), t;
  }(tr)
), xf = G_.prototype;
xf.on = N_("on");
xf.off = N_("off");
xf.one = function(e, t, r) {
  var n = this;
  function i() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), n.off(e, i);
  }
  this.on.call(this, e, i, r);
};
var zD = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var tl = {}, ka = {}, ic = [], ac = [], el = [], W_ = {}, oc = {}, Na = {}, Mp = {}, FD = +/* @__PURE__ */ new Date() - 0, Tf = "_echarts_instance_";
function HD(e, t, r) {
  var n = !(r && r.ssr);
  if (n) {
    var i = VD(e);
    if (i)
      return i;
  }
  var a = new G_(e, t, r);
  return a.id = "ec_" + FD++, Na[a.id] = a, n && Zy(e, Tf, a.id), V_(a), Le.trigger("afterinit", a), a;
}
function VD(e) {
  return Na[SS(e, Tf)];
}
function U_(e, t) {
  W_[e] = t;
}
function Y_(e) {
  pt(ac, e) < 0 && ac.push(e);
}
function X_(e, t) {
  Mf(ic, e, t, ID);
}
function GD(e) {
  Cf("afterinit", e);
}
function WD(e) {
  Cf("afterupdate", e);
}
function Cf(e, t) {
  Le.on(e, t);
}
function Gi(e, t, r) {
  Z(t) && (r = t, t = "");
  var n = V(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || n).toLowerCase(), t = e.event, !ka[t] && (qe(_p.test(n) && _p.test(t)), tl[n] || (tl[n] = {
    action: r,
    actionInfo: e
  }), ka[t] = n);
}
function UD(e, t) {
  $l.register(e, t);
}
function YD(e, t) {
  Mf(el, e, t, O_, "layout");
}
function Bn(e, t) {
  Mf(el, e, t, E_, "visual");
}
var Dp = [];
function Mf(e, t, r, n, i) {
  if ((Z(t) || V(t)) && (r = t, t = n), !(pt(Dp, r) >= 0)) {
    Dp.push(r);
    var a = m_.wrapStageHandler(r, i);
    a.__prio = t, a.__raw = r, e.push(a);
  }
}
function q_(e, t) {
  oc[e] = t;
}
function XD(e, t, r) {
  var n = TD("registerMap");
  n && n(e, t, r);
}
var qD = tM;
Bn(Sf, LM);
Bn(Ol, $M);
Bn(Ol, PM);
Bn(Sf, UM);
Bn(Ol, YM);
Bn(k_, SD);
Y_(jm);
X_(DD, kC);
q_("default", RM);
Gi({
  type: In,
  event: In,
  update: In
}, Yt);
Gi({
  type: gs,
  event: gs,
  update: gs
}, Yt);
Gi({
  type: La,
  event: La,
  update: La
}, Yt);
Gi({
  type: ys,
  event: ys,
  update: ys
}, Yt);
Gi({
  type: $a,
  event: $a,
  update: $a
}, Yt);
U_("light", GM);
U_("dark", S_);
function ua(e) {
  return e == null ? 0 : e.length || 1;
}
function Ap(e) {
  return e;
}
var ZD = (
  /** @class */
  function() {
    function e(t, r, n, i, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = n || Ap, this._newKeyGetter = i || Ap, this.context = a, this._diffModeMultiple = o === "multiple";
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
      var t = this._old, r = this._new, n = {}, i = new Array(t.length), a = new Array(r.length);
      this._initIndexMap(t, null, i, "_oldKeyGetter"), this._initIndexMap(r, n, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = i[o], l = n[s], u = ua(l);
        if (u > 1) {
          var h = l.shift();
          l.length === 1 && (n[s] = l[0]), this._update && this._update(h, o);
        } else u === 1 ? (n[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, n);
    }, e.prototype._executeMultiple = function() {
      var t = this._old, r = this._new, n = {}, i = {}, a = [], o = [];
      this._initIndexMap(t, n, a, "_oldKeyGetter"), this._initIndexMap(r, i, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = n[l], h = i[l], c = ua(u), f = ua(h);
        if (c > 1 && f === 1)
          this._updateManyToOne && this._updateManyToOne(h, u), i[l] = null;
        else if (c === 1 && f > 1)
          this._updateOneToMany && this._updateOneToMany(h, u), i[l] = null;
        else if (c === 1 && f === 1)
          this._update && this._update(h, u), i[l] = null;
        else if (c > 1 && f > 1)
          this._updateManyToMany && this._updateManyToMany(h, u), i[l] = null;
        else if (c > 1)
          for (var v = 0; v < c; v++)
            this._remove && this._remove(u[v]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, i);
    }, e.prototype._performRestAdd = function(t, r) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n], a = r[i], o = ua(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        r[i] = null;
      }
    }, e.prototype._initIndexMap = function(t, r, n, i) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[i](t[o], o);
        if (a || (n[o] = s), !!r) {
          var l = r[s], u = ua(l);
          u === 0 ? (r[s] = o, a && n.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  }()
), KD = (
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
function jD(e, t) {
  var r = {}, n = r.encode = {}, i = Q(), a = [], o = [], s = {};
  C(e.dimensions, function(f) {
    var v = e.getDimensionInfo(f), d = v.coordDim;
    if (d) {
      var g = v.coordDimIndex;
      qu(n, d)[g] = f, v.isExtraCoord || (i.set(d, 1), JD(v.type) && (a[0] = f), qu(s, d)[g] = e.getDimensionIndex(v.name)), v.defaultTooltip && o.push(f);
    }
    Wm.each(function(p, y) {
      var m = qu(n, y), _ = v.otherDims[y];
      _ != null && _ !== !1 && (m[_] = v.name);
    });
  });
  var l = [], u = {};
  i.each(function(f, v) {
    var d = n[v];
    u[v] = d[0], l = l.concat(d);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = U(l, function(f) {
    return e.getDimensionInfo(f).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var h = n.label;
  h && h.length && (a = h.slice());
  var c = n.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), n.defaultedLabel = a, n.defaultedTooltip = o, r.userOutput = new KD(s, t), r;
}
function qu(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function QD(e) {
  return e === "category" ? "ordinal" : e === "time" ? "time" : "float";
}
function JD(e) {
  return !(e === "ordinal" || e === "time");
}
var Ss = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.otherDims = {}, t != null && N(this, t);
    }
    return e;
  }()
), tA = $t(), eA = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Z_ = (
  /** @class */
  function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = Q_(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return tt(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = t_(this.source), n = !J_(t), i = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, h = void 0, c = this.dimensions[s];
        if (c && c.storeDimIndex === o)
          l = r ? c.name : null, u = c.type, h = c.ordinalMeta, s++;
        else {
          var f = this.getSourceDimension(o);
          f && (l = r ? f.name : null, u = f.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: h
        }), r && l != null && (!c || !c.isCalculationCoord) && (i += n ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), i += "$", i += eA[u] || "f", h && (i += h.uid), i += "$";
      }
      var v = this.source, d = [v.seriesLayoutBy, v.startIndex, i].join("$$");
      return {
        dimensions: a,
        hash: d
      };
    }, e.prototype.makeOutputDimensionNames = function() {
      for (var t = [], r = 0, n = 0; r < this._fullDimCount; r++) {
        var i = void 0, a = this.dimensions[n];
        if (a && a.storeDimIndex === r)
          a.isCalculationCoord || (i = a.name), n++;
        else {
          var o = this.getSourceDimension(r);
          o && (i = o.name);
        }
        t.push(i);
      }
      return t;
    }, e.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, e;
  }()
);
function K_(e) {
  return e instanceof Z_;
}
function j_(e) {
  for (var t = Q(), r = 0; r < (e || []).length; r++) {
    var n = e[r], i = V(n) ? n.name : n;
    i != null && t.get(i) == null && t.set(i, r);
  }
  return t;
}
function Q_(e) {
  var t = tA(e);
  return t.dimNameMap || (t.dimNameMap = j_(e.dimensionsDefine));
}
function J_(e) {
  return e > 30;
}
var ha = V, Lr = U, rA = typeof Int32Array > "u" ? Array : Int32Array, nA = "e\0\0", Ip = -1, iA = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], aA = ["_approximateExtent"], Lp, Zo, ca, fa, Zu, va, Ku, oA = (
  /** @class */
  function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var n, i = !1;
      K_(t) ? (n = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (i = !0, n = t), n = n || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < n.length; h++) {
        var c = n[h], f = H(c) ? new Ss({
          name: c
        }) : c instanceof Ss ? c : new Ss(c), v = f.name;
        f.type = f.type || "float", f.coordDim || (f.coordDim = v, f.coordDimIndex = 0);
        var d = f.otherDims = f.otherDims || {};
        o.push(v), a[v] = f, u[v] != null && (l = !0), f.createInvertedIndices && (s[v] = []), d.itemName === 0 && (this._nameDimIdx = h), d.itemId === 0 && (this._idDimIdx = h), i && (f.storeDimIndex = h);
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
      var n = this._dimIdxToName.get(r);
      if (n != null)
        return n;
      var i = this._schema.getSourceDimension(r);
      if (i)
        return i.name;
    }, e.prototype.getDimensionIndex = function(t) {
      var r = this._recognizeDimIndex(t);
      if (r != null)
        return r;
      if (t == null)
        return -1;
      var n = this._getDimInfo(t);
      return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, e.prototype._recognizeDimIndex = function(t) {
      if (_t(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, e.prototype._getStoreDimIndex = function(t) {
      var r = this.getDimensionIndex(t);
      return r;
    }, e.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, e.prototype._initGetDimensionInfo = function(t) {
      var r = this._dimInfos;
      this._getDimInfo = t ? function(n) {
        return r.hasOwnProperty(n) ? r[n] : void 0;
      } : function(n) {
        return r[n];
      };
    }, e.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, e.prototype.mapDimension = function(t, r) {
      var n = this._dimSummary;
      if (r == null)
        return n.encodeFirstDimNotExtra[t];
      var i = n.encode[t];
      return i ? i[r] : null;
    }, e.prototype.mapDimensionsAll = function(t) {
      var r = this._dimSummary, n = r.encode[t];
      return (n || []).slice();
    }, e.prototype.getStore = function() {
      return this._store;
    }, e.prototype.initData = function(t, r, n) {
      var i = this, a;
      if (t instanceof qh && (a = t), !a) {
        var o = this.dimensions, s = yf(t) || ee(t) ? new e_(t, o.length) : t;
        a = new qh();
        var l = Lr(o, function(u) {
          return {
            type: i._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, n);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = jD(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var n = this._store.appendValues(t, r && r.length), i = n.start, a = n.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = i; s < a; s++) {
          var l = s - i;
          this._nameList[s] = r[l], o && Ku(this, s);
        }
    }, e.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, r = this.dimensions, n = 0; n < r.length; n++) {
        var i = this._dimInfos[r[n]];
        i.ordinalMeta && t.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta);
      }
    }, e.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== Hr && !t.fillStorage;
    }, e.prototype._doInit = function(t, r) {
      if (!(t >= r)) {
        var n = this._store, i = n.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = i.getSource().sourceFormat, l = s === Te;
        if (l && !i.pure)
          for (var u = [], h = t; h < r; h++) {
            var c = i.getItem(h, u);
            if (!this.hasItemOption && hS(c) && (this.hasItemOption = !0), c) {
              var f = c.name;
              a[h] == null && f != null && (a[h] = Re(f, null));
              var v = c.id;
              o[h] == null && v != null && (o[h] = Re(v, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < r; h++)
            Ku(this, h);
        Lp(this);
      }
    }, e.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      ha(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), n = this._nameList[r];
      return n == null && this._nameDimIdx != null && (n = ca(this, this._nameDimIdx, r)), n == null && (n = ""), n;
    }, e.prototype._getCategory = function(t, r) {
      var n = this._store.get(t, r), i = this._store.getOrdinalMeta(t);
      return i ? i.categories[n] : n;
    }, e.prototype.getId = function(t) {
      return Zo(this, this.getRawIndex(t));
    }, e.prototype.count = function() {
      return this._store.count();
    }, e.prototype.get = function(t, r) {
      var n = this._store, i = this._dimInfos[t];
      if (i)
        return n.get(i.storeDimIndex, r);
    }, e.prototype.getByRawIndex = function(t, r) {
      var n = this._store, i = this._dimInfos[t];
      if (i)
        return n.getByRawIndex(i.storeDimIndex, r);
    }, e.prototype.getIndices = function() {
      return this._store.getIndices();
    }, e.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, e.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, e.prototype.getValues = function(t, r) {
      var n = this, i = this._store;
      return z(t) ? i.getValues(Lr(t, function(a) {
        return n._getStoreDimIndex(a);
      }), r) : i.getValues(t);
    }, e.prototype.hasValue = function(t) {
      for (var r = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = r.length; n < i; n++)
        if (isNaN(this._store.get(r[n], t)))
          return !1;
      return !0;
    }, e.prototype.indexOfName = function(t) {
      for (var r = 0, n = this._store.count(); r < n; r++)
        if (this.getName(r) === t)
          return r;
      return -1;
    }, e.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, e.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, e.prototype.rawIndexOf = function(t, r) {
      var n = t && this._invertedIndicesMap[t], i = n && n[r];
      return i == null || isNaN(i) ? Ip : i;
    }, e.prototype.indicesOfNearest = function(t, r, n) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), r, n);
    }, e.prototype.each = function(t, r, n) {
      Z(t) && (n = r, r = t, t = []);
      var i = n || this, a = Lr(fa(t), this._getStoreDimIndex, this);
      this._store.each(a, i ? J(r, i) : r);
    }, e.prototype.filterSelf = function(t, r, n) {
      Z(t) && (n = r, r = t, t = []);
      var i = n || this, a = Lr(fa(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, i ? J(r, i) : r), this;
    }, e.prototype.selectRange = function(t) {
      var r = this, n = {}, i = mt(t);
      return C(i, function(a) {
        var o = r._getStoreDimIndex(a);
        n[o] = t[a];
      }), this._store = this._store.selectRange(n), this;
    }, e.prototype.mapArray = function(t, r, n) {
      Z(t) && (n = r, r = t, t = []), n = n || this;
      var i = [];
      return this.each(t, function() {
        i.push(r && r.apply(this, arguments));
      }, n), i;
    }, e.prototype.map = function(t, r, n, i) {
      var a = n || i || this, o = Lr(fa(t), this._getStoreDimIndex, this), s = va(this);
      return s._store = this._store.map(o, a ? J(r, a) : r), s;
    }, e.prototype.modify = function(t, r, n, i) {
      var a = n || i || this, o = Lr(fa(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? J(r, a) : r);
    }, e.prototype.downSample = function(t, r, n, i) {
      var a = va(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), r, n, i), a;
    }, e.prototype.minmaxDownSample = function(t, r) {
      var n = va(this);
      return n._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), r), n;
    }, e.prototype.lttbDownSample = function(t, r) {
      var n = va(this);
      return n._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r), n;
    }, e.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, e.prototype.getItemModel = function(t) {
      var r = this.hostModel, n = this.getRawDataItem(t);
      return new Tt(n, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new ZD(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(n) {
        return Zo(t, n);
      }, function(n) {
        return Zo(r, n);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, ha(t) ? N(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var n = this._itemVisuals[t], i = n && n[r];
      return i ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var n = this._itemVisuals, i = n[t];
      i || (i = n[t] = {});
      var a = i[r];
      return a == null && (a = this.getVisual(r), z(a) ? a = a.slice() : ha(a) && (a = N({}, a)), i[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, n) {
      var i = this._itemVisuals[t] || {};
      this._itemVisuals[t] = i, ha(r) ? N(i, r) : i[r] = n;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      ha(t) ? N(this._layout, t) : this._layout[t] = r;
    }, e.prototype.getLayout = function(t) {
      return this._layout[t];
    }, e.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, e.prototype.setItemLayout = function(t, r, n) {
      this._itemLayouts[t] = n ? N(this._itemLayouts[t] || {}, r) : r;
    }, e.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function(t, r) {
      var n = this.hostModel && this.hostModel.seriesIndex;
      Tx(n, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      C(this._graphicEls, function(n, i) {
        n && t && t.call(r, n, i);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : Lr(this.dimensions, this._getDimInfo, this), this.hostModel)), Zu(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var n = this[t];
      Z(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var i = n.apply(this, arguments);
        return r.apply(this, [i].concat(kc(arguments)));
      });
    }, e.internalField = function() {
      Lp = function(t) {
        var r = t._invertedIndicesMap;
        C(r, function(n, i) {
          var a = t._dimInfos[i], o = a.ordinalMeta, s = t._store;
          if (o) {
            n = r[i] = new rA(o.categories.length);
            for (var l = 0; l < n.length; l++)
              n[l] = Ip;
            for (var l = 0; l < s.count(); l++)
              n[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, ca = function(t, r, n) {
        return Re(t._getCategory(r, n), null);
      }, Zo = function(t, r) {
        var n = t._idList[r];
        return n == null && t._idDimIdx != null && (n = ca(t, t._idDimIdx, r)), n == null && (n = nA + r), n;
      }, fa = function(t) {
        return z(t) || (t = t != null ? [t] : []), t;
      }, va = function(t) {
        var r = new e(t._schema ? t._schema : Lr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Zu(r, t), r;
      }, Zu = function(t, r) {
        C(iA.concat(r.__wrappedMethods || []), function(n) {
          r.hasOwnProperty(n) && (t[n] = r[n]);
        }), t.__wrappedMethods = r.__wrappedMethods, C(aA, function(n) {
          t[n] = q(r[n]);
        }), t._calculationInfo = N({}, r._calculationInfo);
      }, Ku = function(t, r) {
        var n = t._nameList, i = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = n[r], l = i[r];
        if (s == null && a != null && (n[r] = s = ca(t, a, r)), l == null && o != null && (i[r] = l = ca(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), i[r] = l;
        }
      };
    }(), e;
  }()
);
function sA(e, t) {
  yf(e) || (e = Qm(e)), t = t || {};
  var r = t.coordDimensions || [], n = t.dimensionsDefine || e.dimensionsDefine || [], i = Q(), a = [], o = uA(e, r, n, t.dimensionsCount), s = t.canOmitUnusedDimensions && J_(o), l = n === e.dimensionsDefine, u = l ? Q_(e) : j_(n), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(e, o));
  for (var c = Q(h), f = new o_(o), v = 0; v < f.length; v++)
    f[v] = -1;
  function d(D) {
    var A = f[D];
    if (A < 0) {
      var T = n[D], L = V(T) ? T : {
        name: T
      }, $ = new Ss(), P = L.name;
      P != null && u.get(P) != null && ($.name = $.displayName = P), L.type != null && ($.type = L.type), L.displayName != null && ($.displayName = L.displayName);
      var R = a.length;
      return f[D] = R, $.storeDimIndex = D, a.push($), $;
    }
    return a[A];
  }
  if (!s)
    for (var v = 0; v < o; v++)
      d(v);
  c.each(function(D, A) {
    var T = kt(D).slice();
    if (T.length === 1 && !H(T[0]) && T[0] < 0) {
      c.set(A, !1);
      return;
    }
    var L = c.set(A, []);
    C(T, function($, P) {
      var R = H($) ? u.get($) : $;
      R != null && R < o && (L[P] = R, p(d(R), A, P));
    });
  });
  var g = 0;
  C(r, function(D) {
    var A, T, L, $;
    if (H(D))
      A = D, $ = {};
    else {
      $ = D, A = $.name;
      var P = $.ordinalMeta;
      $.ordinalMeta = null, $ = N({}, $), $.ordinalMeta = P, T = $.dimsDef, L = $.otherDims, $.name = $.coordDim = $.coordDimIndex = $.dimsDef = $.otherDims = null;
    }
    var R = c.get(A);
    if (R !== !1) {
      if (R = kt(R), !R.length)
        for (var O = 0; O < (T && T.length || 1); O++) {
          for (; g < o && d(g).coordDim != null; )
            g++;
          g < o && R.push(g++);
        }
      C(R, function(G, k) {
        var F = d(G);
        if (l && $.type != null && (F.type = $.type), p(ht(F, $), A, k), F.name == null && T) {
          var W = T[k];
          !V(W) && (W = {
            name: W
          }), F.name = F.displayName = W.name, F.defaultTooltip = W.defaultTooltip;
        }
        L && ht(F.otherDims, L);
      });
    }
  });
  function p(D, A, T) {
    Wm.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, i.set(A, !0));
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
      M == null && (x.coordDim = hA(b, i, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (qm(e, w) === ae.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return lA(a), new Z_({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function lA(e) {
  for (var t = Q(), r = 0; r < e.length; r++) {
    var n = e[r], i = n.name, a = t.get(i) || 0;
    a > 0 && (n.name = i + (a - 1)), a++, t.set(i, a);
  }
}
function uA(e, t, r, n) {
  var i = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, n || 0);
  return C(t, function(a) {
    var o;
    V(a) && (o = a.dimsDef) && (i = Math.max(i, o.length));
  }), i;
}
function hA(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var n = 0; t.hasKey(e + n); )
      n++;
    e += n;
  }
  return t.set(e, !0), e;
}
var cA = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.coordSysDims = [], this.axisMap = Q(), this.categoryAxisMap = Q(), this.coordSysName = t;
    }
    return e;
  }()
);
function fA(e) {
  var t = e.get("coordinateSystem"), r = new cA(t), n = vA[t];
  if (n)
    return n(e, r, r.axisMap, r.categoryAxisMap), r;
}
var vA = {
  cartesian2d: function(e, t, r, n) {
    var i = e.getReferringComponents("xAxis", $e).models[0], a = e.getReferringComponents("yAxis", $e).models[0];
    t.coordSysDims = ["x", "y"], r.set("x", i), r.set("y", a), ii(i) && (n.set("x", i), t.firstCategoryDimIndex = 0), ii(a) && (n.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(e, t, r, n) {
    var i = e.getReferringComponents("singleAxis", $e).models[0];
    t.coordSysDims = ["single"], r.set("single", i), ii(i) && (n.set("single", i), t.firstCategoryDimIndex = 0);
  },
  polar: function(e, t, r, n) {
    var i = e.getReferringComponents("polar", $e).models[0], a = i.findAxisModel("radiusAxis"), o = i.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], r.set("radius", a), r.set("angle", o), ii(a) && (n.set("radius", a), t.firstCategoryDimIndex = 0), ii(o) && (n.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(e, t, r, n) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(e, t, r, n) {
    var i = e.ecModel, a = i.getComponent("parallel", e.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    C(a.parallelAxisIndex, function(s, l) {
      var u = i.getComponent("parallelAxis", s), h = o[l];
      r.set(h, u), ii(u) && (n.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function ii(e) {
  return e.get("type") === "category";
}
function dA(e, t, r) {
  r = r || {};
  var n = r.byIndex, i = r.stackedCoordDimension, a, o, s;
  pA(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(e && e.get("stack")), u, h, c, f;
  if (C(a, function(m, _) {
    H(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!n && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!i || i === m.coordDim) && (h = m));
  }), h && !n && !u && (n = !0), h) {
    c = "__\0ecstackresult_" + e.id, f = "__\0ecstackedover_" + e.id, u && (u.createInvertedIndices = !0);
    var v = h.coordDim, d = h.type, g = 0;
    C(a, function(m) {
      m.coordDim === v && g++;
    });
    var p = {
      name: c,
      coordDim: v,
      coordDimIndex: g,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, y = {
      name: f,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: f,
      coordDimIndex: g + 1,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(f, d), y.storeDimIndex = s.ensureCalculationDimension(c, d)), o.appendCalculationDimension(p), o.appendCalculationDimension(y)) : (a.push(p), a.push(y));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: n,
    stackedOverDimension: f,
    stackResultDimension: c
  };
}
function pA(e) {
  return !K_(e.schema);
}
function Oi(e, t) {
  return !!t && t === e.getCalculationInfo("stackedDimension");
}
function gA(e, t) {
  return Oi(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
function yA(e, t) {
  var r = e.get("coordinateSystem"), n = $l.get(r), i;
  return t && t.coordSysDims && (i = U(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = QD(l);
    }
    return o;
  })), i || (i = n && (n.getDimensionsInfo ? n.getDimensionsInfo() : n.dimensions.slice()) || ["x", "y"]), i;
}
function mA(e, t, r) {
  var n, i;
  return r && C(e, function(a, o) {
    var s = a.coordDim, l = r.categoryAxisMap.get(s);
    l && (n == null && (n = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (i = !0);
  }), !i && n != null && (e[n].otherDims.itemName = 0), n;
}
function El(e, t, r) {
  r = r || {};
  var n = t.getSourceManager(), i, a = !1;
  i = n.getSource(), a = i.sourceFormat === Te;
  var o = fA(t), s = yA(t, o), l = r.useEncodeDefaulter, u = Z(l) ? l : l ? It(cC, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: r.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, c = sA(i, h), f = mA(c.dimensions, r.createInvertedIndices, o), v = a ? null : n.getSharedDataStore(c), d = dA(t, {
    schema: c,
    store: v
  }), g = new oA(c, t);
  g.setCalculationInfo(d);
  var p = f != null && _A(i) ? function(y, m, _, b) {
    return b === f ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? i : v,
    null,
    p
  ), g;
}
function _A(e) {
  if (e.sourceFormat === Te) {
    var t = bA(e.data || []);
    return !z(fo(t));
  }
}
function bA(e) {
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
      var n = this._extent;
      isNaN(t) || (n[0] = t), isNaN(r) || (n[1] = r);
    }, e.prototype.isInExtentRange = function(t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }, e.prototype.isBlank = function() {
      return this._isBlank;
    }, e.prototype.setBlank = function(t) {
      this._isBlank = t;
    }, e;
  }()
);
cl(nr);
var wA = 0, sc = (
  /** @class */
  function() {
    function e(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++wA;
    }
    return e.createByAxisModel = function(t) {
      var r = t.option, n = r.data, i = n && U(n, SA);
      return new e({
        categories: i,
        needCollect: !i,
        // deduplication is default in axis.
        deduplication: r.dedplication !== !1
      });
    }, e.prototype.getOrdinal = function(t) {
      return this._getOrCreateMap().get(t);
    }, e.prototype.parseAndCollect = function(t) {
      var r, n = this._needCollect;
      if (!H(t) && !n)
        return t;
      if (n && !this._deduplication)
        return r = this.categories.length, this.categories[r] = t, r;
      var i = this._getOrCreateMap();
      return r = i.get(t), r == null && (n ? (r = this.categories.length, this.categories[r] = t, i.set(t, r)) : r = NaN), r;
    }, e.prototype._getOrCreateMap = function() {
      return this._map || (this._map = Q(this.categories));
    }, e;
  }()
);
function SA(e) {
  return V(e) && e.value != null ? e.value : e + "";
}
function lc(e) {
  return e.type === "interval" || e.type === "log";
}
function xA(e, t, r, n) {
  var i = {}, a = e[1] - e[0], o = i.interval = Wy(a / t);
  r != null && o < r && (o = i.interval = r), n != null && o > n && (o = i.interval = n);
  var s = i.intervalPrecision = t0(o), l = i.niceTickExtent = [Dt(Math.ceil(e[0] / o) * o, s), Dt(Math.floor(e[1] / o) * o, s)];
  return TA(l, e), i;
}
function ju(e) {
  var t = Math.pow(10, Uc(e)), r = e / t;
  return r ? r === 2 ? r = 3 : r === 3 ? r = 5 : r *= 2 : r = 1, Dt(r * t);
}
function t0(e) {
  return sr(e) + 2;
}
function $p(e, t, r) {
  e[t] = Math.max(Math.min(e[t], r[1]), r[0]);
}
function TA(e, t) {
  !isFinite(e[0]) && (e[0] = t[0]), !isFinite(e[1]) && (e[1] = t[1]), $p(e, 0, t), $p(e, 1, t), e[0] > e[1] && (e[0] = e[1]);
}
function kl(e, t) {
  return e >= t[0] && e <= t[1];
}
function Nl(e, t) {
  return t[1] === t[0] ? 0.5 : (e - t[0]) / (t[1] - t[0]);
}
function Bl(e, t) {
  return e * (t[1] - t[0]) + t[0];
}
var Df = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      n.type = "ordinal";
      var i = n.getSetting("ordinalMeta");
      return i || (i = new sc({})), z(i) && (i = new sc({
        categories: U(i, function(a) {
          return V(a) ? a.value : a;
        })
      })), n._ordinalMeta = i, n._extent = n.getSetting("extent") || [0, i.categories.length - 1], n;
    }
    return t.prototype.parse = function(r) {
      return r == null ? NaN : H(r) ? this._ordinalMeta.getOrdinal(r) : Math.round(r);
    }, t.prototype.contain = function(r) {
      return r = this.parse(r), kl(r, this._extent) && this._ordinalMeta.categories[r] != null;
    }, t.prototype.normalize = function(r) {
      return r = this._getTickNumber(this.parse(r)), Nl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Math.round(Bl(r, this._extent)), this.getRawOrdinalNumber(r);
    }, t.prototype.getTicks = function() {
      for (var r = [], n = this._extent, i = n[0]; i <= n[1]; )
        r.push({
          value: i
        }), i++;
      return r;
    }, t.prototype.getMinorTicks = function(r) {
    }, t.prototype.setSortInfo = function(r) {
      if (r == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var n = r.ordinalNumbers, i = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, n.length); o < l; ++o) {
        var u = n[o];
        i[o] = u, a[u] = o;
      }
      for (var h = 0; o < s; ++o) {
        for (; a[h] != null; )
          h++;
        i.push(h), a[h] = o;
      }
    }, t.prototype._getTickNumber = function(r) {
      var n = this._ticksByOrdinalNumber;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }, t.prototype.getRawOrdinalNumber = function(r) {
      var n = this._ordinalNumbersByTick;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }, t.prototype.getLabel = function(r) {
      if (!this.isBlank()) {
        var n = this.getRawOrdinalNumber(r.value), i = this._ordinalMeta.categories[n];
        return i == null ? "" : i + "";
      }
    }, t.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function(r, n) {
      this.unionExtent(r.getApproximateExtent(n));
    }, t.prototype.isInExtentRange = function(r) {
      return r = this._getTickNumber(r), this._extent[0] <= r && this._extent[1] >= r;
    }, t.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function() {
    }, t.prototype.calcNiceExtent = function() {
    }, t.type = "ordinal", t;
  }(nr)
);
nr.registerClass(Df);
var mn = Dt, Wi = (
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
      return kl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return Nl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return Bl(r, this._extent);
    }, t.prototype.setExtent = function(r, n) {
      var i = this._extent;
      isNaN(r) || (i[0] = parseFloat(r)), isNaN(n) || (i[1] = parseFloat(n));
    }, t.prototype.unionExtent = function(r) {
      var n = this._extent;
      r[0] < n[0] && (n[0] = r[0]), r[1] > n[1] && (n[1] = r[1]), this.setExtent(n[0], n[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(r) {
      this._interval = r, this._niceExtent = this._extent.slice(), this._intervalPrecision = t0(r);
    }, t.prototype.getTicks = function(r) {
      var n = this._interval, i = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!n)
        return s;
      var l = 1e4;
      i[0] < a[0] && (r ? s.push({
        value: mn(a[0] - n, o)
      }) : s.push({
        value: i[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = mn(u + n, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var h = s.length ? s[s.length - 1].value : a[1];
      return i[1] > h && (r ? s.push({
        value: mn(h + n, o)
      }) : s.push({
        value: i[1]
      })), s;
    }, t.prototype.getMinorTicks = function(r) {
      for (var n = this.getTicks(!0), i = [], a = this.getExtent(), o = 1; o < n.length; o++) {
        for (var s = n[o], l = n[o - 1], u = 0, h = [], c = s.value - l.value, f = c / r; u < r - 1; ) {
          var v = mn(l.value + (u + 1) * f);
          v > a[0] && v < a[1] && h.push(v), u++;
        }
        i.push(h);
      }
      return i;
    }, t.prototype.getLabel = function(r, n) {
      if (r == null)
        return "";
      var i = n && n.precision;
      i == null ? i = sr(r.value) || 0 : i === "auto" && (i = this._intervalPrecision);
      var a = mn(r.value, i, !0);
      return Fm(a);
    }, t.prototype.calcNiceTicks = function(r, n, i) {
      r = r || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = xA(a, r, n, i);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function(r) {
      var n = this._extent;
      if (n[0] === n[1])
        if (n[0] !== 0) {
          var i = Math.abs(n[0]);
          r.fixMax || (n[1] += i / 2), n[0] -= i / 2;
        } else
          n[1] = 1;
      var a = n[1] - n[0];
      isFinite(a) || (n[0] = 0, n[1] = 1), this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval);
      var o = this._interval;
      r.fixMin || (n[0] = mn(Math.floor(n[0] / o) * o)), r.fixMax || (n[1] = mn(Math.ceil(n[1] / o) * o));
    }, t.prototype.setNiceExtent = function(r, n) {
      this._niceExtent = [r, n];
    }, t.type = "interval", t;
  }(nr)
);
nr.registerClass(Wi);
var e0 = typeof Float32Array < "u", CA = e0 ? Float32Array : Array;
function lr(e) {
  return z(e) ? e0 ? new Float32Array(e) : e : new CA(e);
}
var MA = "__ec_stack_";
function r0(e) {
  return e.get("stack") || MA + e.seriesIndex;
}
function Af(e) {
  return e.dim + e.index;
}
function n0(e, t) {
  var r = [];
  return t.eachSeriesByType(e, function(n) {
    a0(n) && r.push(n);
  }), r;
}
function DA(e) {
  var t = {};
  C(e, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var c = l.getData(), f = h.dim + "_" + h.index, v = c.getDimensionIndex(c.mapDimension(h.dim)), d = c.getStore(), g = 0, p = d.count(); g < p; ++g) {
        var y = d.get(v, g);
        t[f] ? t[f].push(y) : t[f] = [y];
      }
  });
  var r = {};
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var i = t[n];
      if (i) {
        i.sort(function(l, u) {
          return l - u;
        });
        for (var a = null, o = 1; o < i.length; ++o) {
          var s = i[o] - i[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s));
        }
        r[n] = a;
      }
    }
  return r;
}
function i0(e) {
  var t = DA(e), r = [];
  return C(e, function(n) {
    var i = n.coordinateSystem, a = i.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], h = Math.abs(o[1] - o[0]), c = a.scale.getExtent(), f = Math.abs(c[1] - c[0]);
      s = u ? h / f * u : h;
    } else {
      var v = n.getData();
      s = Math.abs(o[1] - o[0]) / v.count();
    }
    var d = Ut(n.get("barWidth"), s), g = Ut(n.get("barMaxWidth"), s), p = Ut(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      n.get("barMinWidth") || (o0(n) ? 0.5 : 1),
      s
    ), y = n.get("barGap"), m = n.get("barCategoryGap");
    r.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: g,
      barMinWidth: p,
      barGap: y,
      barCategoryGap: m,
      axisKey: Af(a),
      stackId: r0(n)
    });
  }), AA(r);
}
function AA(e) {
  var t = {};
  C(e, function(n, i) {
    var a = n.axisKey, o = n.bandWidth, s = t[a] || {
      bandWidth: o,
      remainedWidth: o,
      autoWidthCount: 0,
      categoryGap: null,
      gap: "20%",
      stacks: {}
    }, l = s.stacks;
    t[a] = s;
    var u = n.stackId;
    l[u] || s.autoWidthCount++, l[u] = l[u] || {
      width: 0,
      maxWidth: 0
    };
    var h = n.barWidth;
    h && !l[u].width && (l[u].width = h, h = Math.min(s.remainedWidth, h), s.remainedWidth -= h);
    var c = n.barMaxWidth;
    c && (l[u].maxWidth = c);
    var f = n.barMinWidth;
    f && (l[u].minWidth = f);
    var v = n.barGap;
    v != null && (s.gap = v);
    var d = n.barCategoryGap;
    d != null && (s.categoryGap = d);
  });
  var r = {};
  return C(t, function(n, i) {
    r[i] = {};
    var a = n.stacks, o = n.bandWidth, s = n.categoryGap;
    if (s == null) {
      var l = mt(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Ut(s, o), h = Ut(n.gap, 1), c = n.remainedWidth, f = n.autoWidthCount, v = (c - u) / (f + (f - 1) * h);
    v = Math.max(v, 0), C(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var b = y.width;
        m && (b = Math.min(b, m)), _ && (b = Math.max(b, _)), y.width = b, c -= b + h * b, f--;
      } else {
        var b = v;
        m && m < b && (b = Math.min(m, c)), _ && _ > b && (b = _), b !== v && (y.width = b, c -= b + h * b, f--);
      }
    }), v = (c - u) / (f + (f - 1) * h), v = Math.max(v, 0);
    var d = 0, g;
    C(a, function(y, m) {
      y.width || (y.width = v), g = y, d += y.width * (1 + h);
    }), g && (d -= g.width * h);
    var p = -d / 2;
    C(a, function(y, m) {
      r[i][m] = r[i][m] || {
        bandWidth: o,
        offset: p,
        width: y.width
      }, p += y.width * (1 + h);
    });
  }), r;
}
function IA(e, t, r) {
  if (e && t) {
    var n = e[Af(t)];
    return n;
  }
}
function LA(e, t) {
  var r = n0(e, t), n = i0(r);
  C(r, function(i) {
    var a = i.getData(), o = i.coordinateSystem, s = o.getBaseAxis(), l = r0(i), u = n[Af(s)][l], h = u.offset, c = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: c
    });
  });
}
function $A(e) {
  return {
    seriesType: e,
    plan: bf(),
    reset: function(t) {
      if (a0(t)) {
        var r = t.getData(), n = t.coordinateSystem, i = n.getBaseAxis(), a = n.getOtherAxis(i), o = r.getDimensionIndex(r.mapDimension(a.dim)), s = r.getDimensionIndex(r.mapDimension(i.dim)), l = t.get("showBackground", !0), u = r.mapDimension(a.dim), h = r.getCalculationInfo("stackResultDimension"), c = Oi(r, u) && !!r.getCalculationInfo("stackedOnSeries"), f = a.isHorizontal(), v = PA(i, a), d = o0(t), g = t.get("barMinHeight") || 0, p = h && r.getDimensionIndex(h), y = r.getLayout("size"), m = r.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var S = _.count, w = d && lr(S * 3), x = d && l && lr(S * 3), M = d && lr(S), D = n.master.getRect(), A = f ? D.width : D.height, T, L = b.getStore(), $ = 0; (T = _.next()) != null; ) {
              var P = L.get(c ? p : o, T), R = L.get(s, T), O = v, G = void 0;
              c && (G = +P - L.get(o, T));
              var k = void 0, F = void 0, W = void 0, j = void 0;
              if (f) {
                var rt = n.dataToPoint([P, R]);
                if (c) {
                  var dt = n.dataToPoint([G, R]);
                  O = dt[0];
                }
                k = O, F = rt[1] + m, W = rt[0] - O, j = y, Math.abs(W) < g && (W = (W < 0 ? -1 : 1) * g);
              } else {
                var rt = n.dataToPoint([R, P]);
                if (c) {
                  var dt = n.dataToPoint([R, G]);
                  O = dt[1];
                }
                k = rt[0] + m, F = O, W = y, j = rt[1] - O, Math.abs(j) < g && (j = (j <= 0 ? -1 : 1) * g);
              }
              d ? (w[$] = k, w[$ + 1] = F, w[$ + 2] = f ? W : j, x && (x[$] = f ? D.x : k, x[$ + 1] = f ? F : D.y, x[$ + 2] = A), M[T] = T) : b.setItemLayout(T, {
                x: k,
                y: F,
                width: W,
                height: j
              }), $ += 3;
            }
            d && b.setLayout({
              largePoints: w,
              largeDataIndices: M,
              largeBackgroundPoints: x,
              valueAxisHorizontal: f
            });
          }
        };
      }
    }
  };
}
function a0(e) {
  return e.coordinateSystem && e.coordinateSystem.type === "cartesian2d";
}
function o0(e) {
  return e.pipelineContext && e.pipelineContext.large;
}
function PA(e, t) {
  var r = t.model.get("startValue");
  return r || (r = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? r > 0 ? r : 1 : r));
}
var RA = function(e, t, r, n) {
  for (; r < n; ) {
    var i = r + n >>> 1;
    e[i][1] < t ? r = i + 1 : n = i;
  }
  return r;
}, s0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "time", n;
    }
    return t.prototype.getLabel = function(r) {
      var n = this.getSetting("useUTC");
      return Cl(r.value, xd[tC(xi(this._minLevelUnit))] || xd.second, n, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(r, n, i) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return eC(r, n, i, o, a);
    }, t.prototype.getTicks = function() {
      var r = this._interval, n = this._extent, i = [];
      if (!r)
        return i;
      i.push({
        value: n[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = FA(this._minLevelUnit, this._approxInterval, a, n);
      return i = i.concat(o), i.push({
        value: n[1],
        level: 0
      }), i;
    }, t.prototype.calcNiceExtent = function(r) {
      var n = this._extent;
      if (n[0] === n[1] && (n[0] -= _e, n[1] += _e), n[1] === -1 / 0 && n[0] === 1 / 0) {
        var i = /* @__PURE__ */ new Date();
        n[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), n[0] = n[1] - _e;
      }
      this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval);
    }, t.prototype.calcNiceTicks = function(r, n, i) {
      r = r || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / r, n != null && this._approxInterval < n && (this._approxInterval = n), i != null && this._approxInterval > i && (this._approxInterval = i);
      var s = Ko.length, l = Math.min(RA(Ko, this._approxInterval, 0, s), s - 1);
      this._interval = Ko[l][1], this._minLevelUnit = Ko[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(r) {
      return _t(r) ? r : +dr(r);
    }, t.prototype.contain = function(r) {
      return kl(this.parse(r), this._extent);
    }, t.prototype.normalize = function(r) {
      return Nl(this.parse(r), this._extent);
    }, t.prototype.scale = function(r) {
      return Bl(r, this._extent);
    }, t.type = "time", t;
  }(Wi)
), Ko = [
  // Format                           interval
  ["second", cf],
  ["minute", ff],
  ["hour", Oa],
  ["quarter-day", Oa * 6],
  ["half-day", Oa * 12],
  ["day", _e * 1.2],
  ["half-week", _e * 3.5],
  ["week", _e * 7],
  ["month", _e * 31],
  ["quarter", _e * 95],
  ["half-year", Sd / 2],
  ["year", Sd]
  // 1Y
];
function OA(e, t, r, n) {
  var i = dr(t), a = dr(r), o = function(d) {
    return Td(i, d, n) === Td(a, d, n);
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
  }, f = function() {
    return c() && o("second");
  }, v = function() {
    return f() && o("millisecond");
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
      return f();
    case "millisecond":
      return v();
  }
}
function EA(e, t) {
  return e /= _e, e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1;
}
function kA(e) {
  var t = 30 * _e;
  return e /= t, e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1;
}
function NA(e) {
  return e /= Oa, e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1;
}
function Pp(e, t) {
  return e /= t ? ff : cf, e > 30 ? 30 : e > 20 ? 20 : e > 15 ? 15 : e > 10 ? 10 : e > 5 ? 5 : e > 2 ? 2 : 1;
}
function BA(e) {
  return Wy(e);
}
function zA(e, t, r) {
  var n = new Date(e);
  switch (xi(t)) {
    case "year":
    case "month":
      n[Om(r)](0);
    case "day":
      n[Em(r)](1);
    case "hour":
      n[km(r)](0);
    case "minute":
      n[Nm(r)](0);
    case "second":
      n[Bm(r)](0), n[zm(r)](0);
  }
  return n.getTime();
}
function FA(e, t, r, n) {
  var i = 1e4, a = Pm, o = 0;
  function s(A, T, L, $, P, R, O) {
    for (var G = new Date(T), k = T, F = G[$](); k < L && k <= n[1]; )
      O.push({
        value: k
      }), F += A, G[P](F), k = G.getTime();
    O.push({
      value: k,
      notAdd: !0
    });
  }
  function l(A, T, L) {
    var $ = [], P = !T.length;
    if (!OA(xi(A), n[0], n[1], r)) {
      P && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: zA(new Date(n[0]), A, r)
      }, {
        value: n[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var O = T[R].value, G = T[R + 1].value;
        if (O !== G) {
          var k = void 0, F = void 0, W = void 0, j = !1;
          switch (A) {
            case "year":
              k = Math.max(1, Math.round(t / _e / 365)), F = vf(r), W = rC(r);
              break;
            case "half-year":
            case "quarter":
            case "month":
              k = kA(t), F = Ti(r), W = Om(r);
              break;
            case "week":
            case "half-week":
            case "day":
              k = EA(t), F = Ml(r), W = Em(r), j = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              k = NA(t), F = Qa(r), W = km(r);
              break;
            case "minute":
              k = Pp(t, !0), F = Dl(r), W = Nm(r);
              break;
            case "second":
              k = Pp(t, !1), F = Al(r), W = Bm(r);
              break;
            case "millisecond":
              k = BA(t), F = Il(r), W = zm(r);
              break;
          }
          s(k, O, G, F, W, j, $), A === "year" && L.length > 1 && R === 0 && L.unshift({
            value: L[0].value - k
          });
        }
      }
      for (var R = 0; R < $.length; R++)
        L.push($[R]);
      return $;
    }
  }
  for (var u = [], h = [], c = 0, f = 0, v = 0; v < a.length && o++ < i; ++v) {
    var d = xi(a[v]);
    if (JT(a[v])) {
      l(a[v], u[u.length - 1] || [], h);
      var g = a[v + 1] ? xi(a[v + 1]) : null;
      if (d !== g) {
        if (h.length) {
          f = c, h.sort(function(A, T) {
            return A.value - T.value;
          });
          for (var p = [], y = 0; y < h.length; ++y) {
            var m = h[y].value;
            (y === 0 || h[y - 1].value !== m) && (p.push(h[y]), m >= n[0] && m <= n[1] && c++);
          }
          var _ = (n[1] - n[0]) / t;
          if (c > _ * 1.5 && f > _ / 1.5 || (u.push(p), c > _ || e === a[v]))
            break;
        }
        h = [];
      }
    }
  }
  for (var b = Ot(U(u, function(A) {
    return Ot(A, function(T) {
      return T.value >= n[0] && T.value <= n[1] && !T.notAdd;
    });
  }), function(A) {
    return A.length > 0;
  }), S = [], w = b.length - 1, v = 0; v < b.length; ++v)
    for (var x = b[v], M = 0; M < x.length; ++M)
      S.push({
        value: x[M].value,
        level: w - v
      });
  S.sort(function(A, T) {
    return A.value - T.value;
  });
  for (var D = [], v = 0; v < S.length; ++v)
    (v === 0 || S[v].value !== S[v - 1].value) && D.push(S[v]);
  return D;
}
nr.registerClass(s0);
var Rp = nr.prototype, Ba = Wi.prototype, HA = Dt, VA = Math.floor, GA = Math.ceil, jo = Math.pow, De = Math.log, If = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "log", r.base = 10, r._originalScale = new Wi(), r._interval = 0, r;
    }
    return t.prototype.getTicks = function(r) {
      var n = this._originalScale, i = this._extent, a = n.getExtent(), o = Ba.getTicks.call(this, r);
      return U(o, function(s) {
        var l = s.value, u = Dt(jo(this.base, l));
        return u = l === i[0] && this._fixMin ? Qo(u, a[0]) : u, u = l === i[1] && this._fixMax ? Qo(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(r, n) {
      var i = De(this.base);
      r = De(Math.max(0, r)) / i, n = De(Math.max(0, n)) / i, Ba.setExtent.call(this, r, n);
    }, t.prototype.getExtent = function() {
      var r = this.base, n = Rp.getExtent.call(this);
      n[0] = jo(r, n[0]), n[1] = jo(r, n[1]);
      var i = this._originalScale, a = i.getExtent();
      return this._fixMin && (n[0] = Qo(n[0], a[0])), this._fixMax && (n[1] = Qo(n[1], a[1])), n;
    }, t.prototype.unionExtent = function(r) {
      this._originalScale.unionExtent(r);
      var n = this.base;
      r[0] = De(r[0]) / De(n), r[1] = De(r[1]) / De(n), Rp.unionExtent.call(this, r);
    }, t.prototype.unionExtentFromData = function(r, n) {
      this.unionExtent(r.getApproximateExtent(n));
    }, t.prototype.calcNiceTicks = function(r) {
      r = r || 10;
      var n = this._extent, i = n[1] - n[0];
      if (!(i === 1 / 0 || i <= 0)) {
        var a = sS(i), o = r / i * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [Dt(GA(n[0] / a) * a), Dt(VA(n[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(r) {
      Ba.calcNiceExtent.call(this, r), this._fixMin = r.fixMin, this._fixMax = r.fixMax;
    }, t.prototype.parse = function(r) {
      return r;
    }, t.prototype.contain = function(r) {
      return r = De(r) / De(this.base), kl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return r = De(r) / De(this.base), Nl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Bl(r, this._extent), jo(this.base, r);
    }, t.type = "log", t;
  }(nr)
), l0 = If.prototype;
l0.getMinorTicks = Ba.getMinorTicks;
l0.getLabel = Ba.getLabel;
function Qo(e, t) {
  return HA(e, sr(t));
}
nr.registerClass(If);
var WA = (
  /** @class */
  function() {
    function e(t, r, n) {
      this._prepareParams(t, r, n);
    }
    return e.prototype._prepareParams = function(t, r, n) {
      n[1] < n[0] && (n = [NaN, NaN]), this._dataMin = n[0], this._dataMax = n[1];
      var i = this._isOrdinal = t.type === "ordinal";
      this._needCrossZero = t.type === "interval" && r.getNeedCrossZero && r.getNeedCrossZero();
      var a = r.get("min", !0);
      a == null && (a = r.get("startValue", !0));
      var o = this._modelMinRaw = a;
      Z(o) ? this._modelMinNum = Jo(t, o({
        min: n[0],
        max: n[1]
      })) : o !== "dataMin" && (this._modelMinNum = Jo(t, o));
      var s = this._modelMaxRaw = r.get("max", !0);
      if (Z(s) ? this._modelMaxNum = Jo(t, s({
        min: n[0],
        max: n[1]
      })) : s !== "dataMax" && (this._modelMaxNum = Jo(t, s)), i)
        this._axisDataLen = r.getCategories().length;
      else {
        var l = r.get("boundaryGap"), u = z(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [Ze(u[0], 1), Ze(u[1], 1)];
      }
    }, e.prototype.calculate = function() {
      var t = this._isOrdinal, r = this._dataMin, n = this._dataMax, i = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : n - r || Math.abs(r), s = this._modelMinRaw === "dataMin" ? r : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? n : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? i ? 0 : NaN : r - a[0] * o), l == null && (l = t ? i ? i - 1 : NaN : n + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var c = $s(s) || $s(l) || t && !i;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !h && (l = 0));
      var f = this._determinedMin, v = this._determinedMax;
      return f != null && (s = f, u = !0), v != null && (l = v, h = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: h,
        isBlank: c
      };
    }, e.prototype.modifyDataMinMax = function(t, r) {
      this[YA[t]] = r;
    }, e.prototype.setDeterminedMinMax = function(t, r) {
      var n = UA[t];
      this[n] = r;
    }, e.prototype.freeze = function() {
      this.frozen = !0;
    }, e;
  }()
), UA = {
  min: "_determinedMin",
  max: "_determinedMax"
}, YA = {
  min: "_dataMin",
  max: "_dataMax"
};
function XA(e, t, r) {
  var n = e.rawExtentInfo;
  return n || (n = new WA(e, t, r), e.rawExtentInfo = n, n);
}
function Jo(e, t) {
  return t == null ? null : $s(t) ? NaN : e.parse(t);
}
function u0(e, t) {
  var r = e.type, n = XA(e, t, e.getExtent()).calculate();
  e.setBlank(n.isBlank);
  var i = n.min, a = n.max, o = t.ecModel;
  if (o && r === "time") {
    var s = n0("bar", o), l = !1;
    if (C(s, function(c) {
      l = l || c.getBaseAxis() === t.axis;
    }), l) {
      var u = i0(s), h = qA(i, a, t, u);
      i = h.min, a = h.max;
    }
  }
  return {
    extent: [i, a],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: n.minFixed,
    fixMax: n.maxFixed
  };
}
function qA(e, t, r, n) {
  var i = r.axis.getExtent(), a = Math.abs(i[1] - i[0]), o = IA(n, r.axis);
  if (o === void 0)
    return {
      min: e,
      max: t
    };
  var s = 1 / 0;
  C(o, function(v) {
    s = Math.min(v.offset, s);
  });
  var l = -1 / 0;
  C(o, function(v) {
    l = Math.max(v.offset + v.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - e, c = 1 - (s + l) / a, f = h / c - h;
  return t += f * (l / u), e -= f * (s / u), {
    min: e,
    max: t
  };
}
function Op(e, t) {
  var r = t, n = u0(e, r), i = n.extent, a = r.get("splitNumber");
  e instanceof If && (e.base = r.get("logBase"));
  var o = e.type, s = r.get("interval"), l = o === "interval" || o === "time";
  e.setExtent(i[0], i[1]), e.calcNiceExtent({
    splitNumber: a,
    fixMin: n.fixMin,
    fixMax: n.fixMax,
    minInterval: l ? r.get("minInterval") : null,
    maxInterval: l ? r.get("maxInterval") : null
  }), s != null && e.setInterval && e.setInterval(s);
}
function ZA(e, t) {
  if (t = t || e.get("type"), t)
    switch (t) {
      case "category":
        return new Df({
          ordinalMeta: e.getOrdinalMeta ? e.getOrdinalMeta() : e.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new s0({
          locale: e.ecModel.getLocaleModel(),
          useUTC: e.ecModel.get("useUTC")
        });
      default:
        return new (nr.getClass(t) || Wi)();
    }
}
function KA(e) {
  var t = e.scale.getExtent(), r = t[0], n = t[1];
  return !(r > 0 && n > 0 || r < 0 && n < 0);
}
function Ui(e) {
  var t = e.getLabelModel().get("formatter"), r = e.type === "category" ? e.scale.getExtent()[0] : null;
  return e.scale.type === "time" ? /* @__PURE__ */ function(n) {
    return function(i, a) {
      return e.scale.getFormattedLabel(i, a, n);
    };
  }(t) : H(t) ? /* @__PURE__ */ function(n) {
    return function(i) {
      var a = e.scale.getLabel(i), o = n.replace("{value}", a ?? "");
      return o;
    };
  }(t) : Z(t) ? /* @__PURE__ */ function(n) {
    return function(i, a) {
      return r != null && (a = i.value - r), n(Lf(e, i), a, i.level != null ? {
        level: i.level
      } : null);
    };
  }(t) : function(n) {
    return e.scale.getLabel(n);
  };
}
function Lf(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function jA(e) {
  var t = e.model, r = e.scale;
  if (!(!t.get(["axisLabel", "show"]) || r.isBlank())) {
    var n, i, a = r.getExtent();
    r instanceof Df ? i = r.count() : (n = r.getTicks(), i = n.length);
    var o = e.getLabelModel(), s = Ui(e), l, u = 1;
    i > 40 && (u = Math.ceil(i / 40));
    for (var h = 0; h < i; h += u) {
      var c = n ? n[h] : {
        value: a[0] + h
      }, f = s(c, h), v = o.getTextRect(f), d = QA(v, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function QA(e, t) {
  var r = t * Math.PI / 180, n = e.width, i = e.height, a = n * Math.abs(Math.cos(r)) + Math.abs(i * Math.sin(r)), o = n * Math.abs(Math.sin(r)) + Math.abs(i * Math.cos(r)), s = new ut(e.x, e.y, a, o);
  return s;
}
function $f(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function h0(e) {
  return e.type === "category" && $f(e.getLabelModel()) === 0;
}
function JA(e, t) {
  var r = {};
  return C(e.mapDimensionsAll(t), function(n) {
    r[gA(e, n)] = !0;
  }), mt(r);
}
var t2 = (
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
), Ep = [], e2 = {
  registerPreprocessor: Y_,
  registerProcessor: X_,
  registerPostInit: GD,
  registerPostUpdate: WD,
  registerUpdateLifecycle: Cf,
  registerAction: Gi,
  registerCoordinateSystem: UD,
  registerLayout: YD,
  registerVisual: Bn,
  registerTransform: qD,
  registerLoading: q_,
  registerMap: XD,
  registerImpl: xD,
  PRIORITY: kD,
  ComponentModel: ct,
  ComponentView: Ee,
  SeriesModel: Oe,
  ChartView: Se,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    ct.registerClass(e);
  },
  registerComponentView: function(e) {
    Ee.registerClass(e);
  },
  registerSeriesModel: function(e) {
    Oe.registerClass(e);
  },
  registerChartView: function(e) {
    Se.registerClass(e);
  },
  registerSubTypeDefaulter: function(e, t) {
    ct.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    eS(e, t);
  }
};
function je(e) {
  if (z(e)) {
    C(e, function(t) {
      je(t);
    });
    return;
  }
  pt(Ep, e) >= 0 || (Ep.push(e), Z(e) && (e = {
    install: e
  }), e.install(e2));
}
var io = $t();
function c0(e, t) {
  var r = U(t, function(n) {
    return e.scale.parse(n);
  });
  return e.type === "time" && r.length > 0 && (r.sort(), r.unshift(r[0]), r.push(r[r.length - 1])), r;
}
function r2(e) {
  var t = e.getLabelModel().get("customValues");
  if (t) {
    var r = Ui(e), n = e.scale.getExtent(), i = c0(e, t), a = Ot(i, function(o) {
      return o >= n[0] && o <= n[1];
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
  return e.type === "category" ? i2(e) : o2(e);
}
function n2(e, t) {
  var r = e.getTickModel().get("customValues");
  if (r) {
    var n = e.scale.getExtent(), i = c0(e, r);
    return {
      ticks: Ot(i, function(a) {
        return a >= n[0] && a <= n[1];
      })
    };
  }
  return e.type === "category" ? a2(e, t) : {
    ticks: U(e.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function i2(e) {
  var t = e.getLabelModel(), r = f0(e, t);
  return !t.get("show") || e.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: r.labelCategoryInterval
  } : r;
}
function f0(e, t) {
  var r = v0(e, "labels"), n = $f(t), i = d0(r, n);
  if (i)
    return i;
  var a, o;
  return Z(n) ? a = y0(e, n) : (o = n === "auto" ? s2(e) : n, a = g0(e, o)), p0(r, n, {
    labels: a,
    labelCategoryInterval: o
  });
}
function a2(e, t) {
  var r = v0(e, "ticks"), n = $f(t), i = d0(r, n);
  if (i)
    return i;
  var a, o;
  if ((!t.get("show") || e.scale.isBlank()) && (a = []), Z(n))
    a = y0(e, n, !0);
  else if (n === "auto") {
    var s = f0(e, e.getLabelModel());
    o = s.labelCategoryInterval, a = U(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = n, a = g0(e, o, !0);
  return p0(r, n, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function o2(e) {
  var t = e.scale.getTicks(), r = Ui(e);
  return {
    labels: U(t, function(n, i) {
      return {
        level: n.level,
        formattedLabel: r(n, i),
        rawLabel: e.scale.getLabel(n),
        tickValue: n.value
      };
    })
  };
}
function v0(e, t) {
  return io(e)[t] || (io(e)[t] = []);
}
function d0(e, t) {
  for (var r = 0; r < e.length; r++)
    if (e[r].key === t)
      return e[r].value;
}
function p0(e, t, r) {
  return e.push({
    key: t,
    value: r
  }), r;
}
function s2(e) {
  var t = io(e).autoInterval;
  return t ?? (io(e).autoInterval = e.calculateCategoryInterval());
}
function l2(e) {
  var t = u2(e), r = Ui(e), n = (t.axisRotate - t.labelRotate) / 180 * Math.PI, i = e.scale, a = i.getExtent(), o = i.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = e.dataToCoord(l + 1) - e.dataToCoord(l), h = Math.abs(u * Math.cos(n)), c = Math.abs(u * Math.sin(n)), f = 0, v = 0; l <= a[1]; l += s) {
    var d = 0, g = 0, p = Gc(r({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, g = p.height * 1.3, f = Math.max(f, d, 7), v = Math.max(v, g, 7);
  }
  var y = f / h, m = v / c;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = io(e.model), S = e.getExtent(), w = b.lastAutoInterval, x = b.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && b.axisExtent0 === S[0] && b.axisExtent1 === S[1] ? _ = w : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = S[0], b.axisExtent1 = S[1]), _;
}
function u2(e) {
  var t = e.getLabelModel();
  return {
    axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function g0(e, t, r) {
  var n = Ui(e), i = e.scale, a = i.getExtent(), o = e.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = i.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var c = h0(e), f = o.get("showMinLabel") || c, v = o.get("showMaxLabel") || c;
  f && u !== a[0] && g(a[0]);
  for (var d = u; d <= a[1]; d += l)
    g(d);
  v && d - l !== a[1] && g(a[1]);
  function g(p) {
    var y = {
      value: p
    };
    s.push(r ? p : {
      formattedLabel: n(y),
      rawLabel: i.getLabel(y),
      tickValue: p
    });
  }
  return s;
}
function y0(e, t, r) {
  var n = e.scale, i = Ui(e), a = [];
  return C(n.getTicks(), function(o) {
    var s = n.getLabel(o), l = o.value;
    t(o.value, s) && a.push(r ? l : {
      formattedLabel: i(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var kp = [0, 1], h2 = (
  /** @class */
  function() {
    function e(t, r, n) {
      this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = r, this._extent = n || [0, 0];
    }
    return e.prototype.contain = function(t) {
      var r = this._extent, n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]);
      return t >= n && t <= i;
    }, e.prototype.containData = function(t) {
      return this.scale.contain(t);
    }, e.prototype.getExtent = function() {
      return this._extent.slice();
    }, e.prototype.getPixelPrecision = function(t) {
      return iS(t || this.scale.getExtent(), this._extent);
    }, e.prototype.setExtent = function(t, r) {
      var n = this._extent;
      n[0] = t, n[1] = r;
    }, e.prototype.dataToCoord = function(t, r) {
      var n = this._extent, i = this.scale;
      return t = i.normalize(t), this.onBand && i.type === "ordinal" && (n = n.slice(), Np(n, i.count())), vr(t, kp, n, r);
    }, e.prototype.coordToData = function(t, r) {
      var n = this._extent, i = this.scale;
      this.onBand && i.type === "ordinal" && (n = n.slice(), Np(n, i.count()));
      var a = vr(t, n, kp, r);
      return this.scale.scale(a);
    }, e.prototype.pointToData = function(t, r) {
    }, e.prototype.getTicksCoords = function(t) {
      t = t || {};
      var r = t.tickModel || this.getTickModel(), n = n2(this, r), i = n.ticks, a = U(i, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = r.get("alignWithLabel");
      return c2(this, a, o, t.clamp), a;
    }, e.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), r = t.get("splitNumber");
      r > 0 && r < 100 || (r = 5);
      var n = this.scale.getMinorTicks(r), i = U(n, function(a) {
        return U(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return i;
    }, e.prototype.getViewLabels = function() {
      return r2(this).labels;
    }, e.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, e.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, e.prototype.getBandWidth = function() {
      var t = this._extent, r = this.scale.getExtent(), n = r[1] - r[0] + (this.onBand ? 1 : 0);
      n === 0 && (n = 1);
      var i = Math.abs(t[1] - t[0]);
      return Math.abs(i) / n;
    }, e.prototype.calculateCategoryInterval = function() {
      return l2(this);
    }, e;
  }()
);
function Np(e, t) {
  var r = e[1] - e[0], n = t, i = r / n / 2;
  e[0] += i, e[1] -= i;
}
function c2(e, t, r, n) {
  var i = t.length;
  if (!e.onBand || r || !i)
    return;
  var a = e.getExtent(), o, s;
  if (i === 1)
    t[0].coord = a[0], o = t[1] = {
      coord: a[1],
      tickValue: t[0].tickValue
    };
  else {
    var l = t[i - 1].tickValue - t[0].tickValue, u = (t[i - 1].coord - t[0].coord) / l;
    C(t, function(v) {
      v.coord -= u / 2;
    });
    var h = e.scale.getExtent();
    s = 1 + h[1] - t[i - 1].tickValue, o = {
      coord: t[i - 1].coord + u * s,
      tickValue: h[1] + 1
    }, t.push(o);
  }
  var c = a[0] > a[1];
  f(t[0].coord, a[0]) && (n ? t[0].coord = a[0] : t.shift()), n && f(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), f(a[1], o.coord) && (n ? o.coord = a[1] : t.pop()), n && f(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function f(v, d) {
    return v = Dt(v), d = Dt(d), c ? v > d : v < d;
  }
}
function f2(e) {
  for (var t = [], r = 0; r < e.length; r++) {
    var n = e[r];
    if (!n.defaultAttr.ignore) {
      var i = n.label, a = i.getComputedTransform(), o = i.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = i.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new Us(o, a) : null;
      t.push({
        label: i,
        labelLine: n.labelLine,
        rect: u,
        localRect: o,
        obb: h,
        priority: n.priority,
        defaultAttr: n.defaultAttr,
        layoutOption: n.computedLayoutOption,
        axisAligned: s,
        transform: a
      });
    }
  }
  return t;
}
function v2(e) {
  var t = [];
  e.sort(function(g, p) {
    return p.priority - g.priority;
  });
  var r = new ut(0, 0, 0, 0);
  function n(g) {
    if (!g.ignore) {
      var p = g.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    g.ignore = !0;
  }
  for (var i = 0; i < e.length; i++) {
    var a = e[i], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, h = a.labelLine;
    r.copy(a.rect), r.width -= 0.1, r.height -= 0.1, r.x += 0.05, r.y += 0.05;
    for (var c = a.obb, f = !1, v = 0; v < t.length; v++) {
      var d = t[v];
      if (r.intersect(d.rect)) {
        if (o && d.axisAligned) {
          f = !0;
          break;
        }
        if (d.obb || (d.obb = new Us(d.localRect, d.transform)), c || (c = new Us(s, l)), c.intersect(d.obb)) {
          f = !0;
          break;
        }
      }
    }
    f ? (n(u), h && n(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var d2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.hasSymbolVisual = !0, r;
    }
    return t.prototype.getInitialData = function(r) {
      return El(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(r) {
      var n = new Mt(), i = gr("line", 0, r.itemHeight / 2, r.itemWidth, 0, r.lineStyle.stroke, !1);
      n.add(i), i.setStyle(r.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = r.itemHeight * 0.8, u = gr(s, (r.itemWidth - l) / 2, (r.itemHeight - l) / 2, l, l, r.itemStyle.fill);
      n.add(u), u.setStyle(r.itemStyle);
      var h = r.iconRotate === "inherit" ? o : r.iconRotate || 0;
      return u.rotation = h * Math.PI / 180, u.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), n;
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
function Pf(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel"), n = r.length;
  if (n === 1) {
    var i = Ri(e, t, r[0]);
    return i != null ? i + "" : null;
  } else if (n) {
    for (var a = [], o = 0; o < r.length; o++)
      a.push(Ri(e, t, r[o]));
    return a.join(" ");
  }
}
function m0(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel");
  if (!z(t))
    return t + "";
  for (var n = [], i = 0; i < r.length; i++) {
    var a = e.getDimensionIndex(r[i]);
    a >= 0 && n.push(t[a]);
  }
  return n.join(" ");
}
var Rf = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, a) {
      var o = e.call(this) || this;
      return o.updateData(r, n, i, a), o;
    }
    return t.prototype._createSymbol = function(r, n, i, a, o) {
      this.removeAll();
      var s = gr(r, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = p2, this._symbolType = r, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(r) {
      this.childAt(0).stopAnimation(null, r);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Gs(this.childAt(0));
    }, t.prototype.downplay = function() {
      Ws(this.childAt(0));
    }, t.prototype.setZ = function(r, n) {
      var i = this.childAt(0);
      i.zlevel = r, i.z = n;
    }, t.prototype.setDraggable = function(r, n) {
      var i = this.childAt(0);
      i.draggable = r, i.cursor = !n && r ? "move" : i.cursor;
    }, t.prototype.updateData = function(r, n, i, a) {
      this.silent = !1;
      var o = r.getItemVisual(n, "symbol") || "circle", s = r.hostModel, l = t.getSymbolSize(r, n), u = o !== this._symbolType, h = a && a.disableAnimation;
      if (u) {
        var c = r.getItemVisual(n, "symbolKeepAspect");
        this._createSymbol(o, r, n, l, c);
      } else {
        var f = this.childAt(0);
        f.silent = !1;
        var v = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        h ? f.attr(v) : le(f, v, s, n), wm(f);
      }
      if (this._updateCommon(r, n, l, i, a), u) {
        var f = this.childAt(0);
        if (!h) {
          var v = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: f.style.opacity
            }
          };
          f.scaleX = f.scaleY = 0, f.style.opacity = 0, pr(f, v, s, n);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(r, n, i, a, o) {
      var s = this.childAt(0), l = r.hostModel, u, h, c, f, v, d, g, p, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, c = a.selectItemStyle, f = a.focus, v = a.blurScope, g = a.labelStatesModels, p = a.hoverScale, y = a.cursorStyle, d = a.emphasisDisabled), !a || r.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : r.getItemModel(n), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), c = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), f = _.get("focus"), v = _.get("blurScope"), d = _.get("disabled"), g = Li(m), p = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = r.getItemVisual(n, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var S = C_(r.getItemVisual(n, "symbolOffset"), i);
      S && (s.x = S[0], s.y = S[1]), y && s.attr("cursor", y);
      var w = r.getItemVisual(n, "style"), x = w.fill;
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
      var D = r.getItemVisual(n, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      yo(s, g, {
        labelFetcher: l,
        labelDataIndex: n,
        defaultText: L,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function L(R) {
        return T ? r.getName(R) : Pf(r, R);
      }
      this._sizeX = i[0] / 2, this._sizeY = i[1] / 2;
      var $ = s.ensureState("emphasis");
      $.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = h;
      var P = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      $.scaleX = this._sizeX * P, $.scaleY = this._sizeY * P, this.setSymbolScale(1), Ka(this, f, v, d);
    }, t.prototype.setSymbolScale = function(r) {
      this.scaleX = this.scaleY = r;
    }, t.prototype.fadeOut = function(r, n, i) {
      var a = this.childAt(0), o = st(this).dataIndex, s = i && i.animation;
      if (this.silent = a.silent = !0, i && i.fadeLabel) {
        var l = a.getTextContent();
        l && Ys(l, {
          style: {
            opacity: 0
          }
        }, n, {
          dataIndex: o,
          removeOpt: s,
          cb: function() {
            a.removeTextContent();
          }
        });
      } else
        a.removeTextContent();
      Ys(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, n, {
        dataIndex: o,
        cb: r,
        removeOpt: s
      });
    }, t.getSymbolSize = function(r, n) {
      return oD(r.getItemVisual(n, "symbolSize"));
    }, t;
  }(Mt)
);
function p2(e, t) {
  this.parent.drift(e, t);
}
function Qu(e, t, r, n) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(n.isIgnore && n.isIgnore(r)) && !(n.clipShape && !n.clipShape.contain(t[0], t[1])) && e.getItemVisual(r, "symbol") !== "none";
}
function Bp(e) {
  return e != null && !V(e) && (e = {
    isIgnore: e
  }), e || {};
}
function zp(e) {
  var t = e.hostModel, r = t.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: Li(t),
    cursorStyle: t.get("cursor")
  };
}
var g2 = (
  /** @class */
  function() {
    function e(t) {
      this.group = new Mt(), this._SymbolCtor = t || Rf;
    }
    return e.prototype.updateData = function(t, r) {
      this._progressiveEls = null, r = Bp(r);
      var n = this.group, i = t.hostModel, a = this._data, o = this._SymbolCtor, s = r.disableAnimation, l = zp(t), u = {
        disableAnimation: s
      }, h = r.getSymbolPoint || function(c) {
        return t.getItemLayout(c);
      };
      a || n.removeAll(), t.diff(a).add(function(c) {
        var f = h(c);
        if (Qu(t, f, c, r)) {
          var v = new o(t, c, l, u);
          v.setPosition(f), t.setItemGraphicEl(c, v), n.add(v);
        }
      }).update(function(c, f) {
        var v = a.getItemGraphicEl(f), d = h(c);
        if (!Qu(t, d, c, r)) {
          n.remove(v);
          return;
        }
        var g = t.getItemVisual(c, "symbol") || "circle", p = v && v.getSymbolType && v.getSymbolType();
        if (!v || p && p !== g)
          n.remove(v), v = new o(t, c, l, u), v.setPosition(d);
        else {
          v.updateData(t, c, l, u);
          var y = {
            x: d[0],
            y: d[1]
          };
          s ? v.attr(y) : le(v, y, i);
        }
        n.add(v), t.setItemGraphicEl(c, v);
      }).remove(function(c) {
        var f = a.getItemGraphicEl(c);
        f && f.fadeOut(function() {
          n.remove(f);
        }, i);
      }).execute(), this._getSymbolPoint = h, this._data = t;
    }, e.prototype.updateLayout = function() {
      var t = this, r = this._data;
      r && r.eachItemGraphicEl(function(n, i) {
        var a = t._getSymbolPoint(i);
        n.setPosition(a), n.markRedraw();
      });
    }, e.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = zp(t), this._data = null, this.group.removeAll();
    }, e.prototype.incrementalUpdate = function(t, r, n) {
      this._progressiveEls = [], n = Bp(n);
      function i(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = r.getItemLayout(a);
        if (Qu(r, o, a, n)) {
          var s = new this._SymbolCtor(r, a, this._seriesScope);
          s.traverse(i), s.setPosition(o), this.group.add(s), r.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, e.prototype.eachRendered = function(t) {
      go(this._progressiveEls || this.group, t);
    }, e.prototype.remove = function(t) {
      var r = this.group, n = this._data;
      n && t ? n.eachItemGraphicEl(function(i) {
        i.fadeOut(function() {
          r.remove(i);
        }, n.hostModel);
      }) : r.removeAll();
    }, e;
  }()
);
function _0(e, t, r) {
  var n = e.getBaseAxis(), i = e.getOtherAxis(n), a = y2(i, r), o = n.dim, s = i.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, c = U(e.dimensions, function(d) {
    return t.mapDimension(d);
  }), f = !1, v = t.getCalculationInfo("stackResultDimension");
  return Oi(
    t,
    c[0]
    /* , dims[1] */
  ) && (f = !0, c[0] = v), Oi(
    t,
    c[1]
    /* , dims[0] */
  ) && (f = !0, c[1] = v), {
    dataDimsForPoint: c,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!f,
    valueDim: l,
    baseDim: u,
    baseDataOffset: h,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function y2(e, t) {
  var r = 0, n = e.scale.getExtent();
  return t === "start" ? r = n[0] : t === "end" ? r = n[1] : _t(t) && !isNaN(t) ? r = t : n[0] > 0 ? r = n[0] : n[1] < 0 && (r = n[1]), r;
}
function b0(e, t, r, n) {
  var i = NaN;
  e.stacked && (i = r.get(r.getCalculationInfo("stackedOverDimension"), n)), isNaN(i) && (i = e.valueStart);
  var a = e.baseDataOffset, o = [];
  return o[a] = r.get(e.baseDim, n), o[1 - a] = i, t.dataToPoint(o);
}
function m2(e, t) {
  var r = [];
  return t.diff(e).add(function(n) {
    r.push({
      cmd: "+",
      idx: n
    });
  }).update(function(n, i) {
    r.push({
      cmd: "=",
      idx: i,
      idx1: n
    });
  }).remove(function(n) {
    r.push({
      cmd: "-",
      idx: n
    });
  }).execute(), r;
}
function _2(e, t, r, n, i, a, o, s) {
  for (var l = m2(e, t), u = [], h = [], c = [], f = [], v = [], d = [], g = [], p = _0(i, t, o), y = e.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], S = !0, w = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        w = b.idx * 2, x = b.idx1 * 2;
        var M = y[w], D = y[w + 1], A = m[x], T = m[x + 1];
        (isNaN(M) || isNaN(D)) && (M = A, D = T), u.push(M, D), h.push(A, T), c.push(r[w], r[w + 1]), f.push(n[x], n[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var L = b.idx, $ = p.dataDimsForPoint, P = i.dataToPoint([t.get($[0], L), t.get($[1], L)]);
        x = L * 2, u.push(P[0], P[1]), h.push(m[x], m[x + 1]);
        var R = b0(p, i, t, L);
        c.push(R[0], R[1]), f.push(n[x], n[x + 1]), g.push(t.getRawIndex(L));
        break;
      case "-":
        S = !1;
    }
    S && (v.push(b), d.push(d.length));
  }
  d.sort(function(xt, Ce) {
    return g[xt] - g[Ce];
  });
  for (var O = u.length, G = lr(O), k = lr(O), F = lr(O), W = lr(O), j = [], _ = 0; _ < d.length; _++) {
    var rt = d[_], dt = _ * 2, wt = rt * 2;
    G[dt] = u[wt], G[dt + 1] = u[wt + 1], k[dt] = h[wt], k[dt + 1] = h[wt + 1], F[dt] = c[wt], F[dt + 1] = c[wt + 1], W[dt] = f[wt], W[dt + 1] = f[wt + 1], j[_] = v[rt];
  }
  return {
    current: G,
    next: k,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: j
  };
}
var $r = Math.min, Pr = Math.max;
function Ln(e, t) {
  return isNaN(e) || isNaN(t);
}
function uc(e, t, r, n, i, a, o, s, l) {
  for (var u, h, c, f, v, d, g = r, p = 0; p < n; p++) {
    var y = t[g * 2], m = t[g * 2 + 1];
    if (g >= i || g < 0)
      break;
    if (Ln(y, m)) {
      if (l) {
        g += a;
        continue;
      }
      break;
    }
    if (g === r)
      e[a > 0 ? "moveTo" : "lineTo"](y, m), c = y, f = m;
    else {
      var _ = y - u, b = m - h;
      if (_ * _ + b * b < 0.5) {
        g += a;
        continue;
      }
      if (o > 0) {
        for (var S = g + a, w = t[S * 2], x = t[S * 2 + 1]; w === y && x === m && p < n; )
          p++, S += a, g += a, w = t[S * 2], x = t[S * 2 + 1], y = t[g * 2], m = t[g * 2 + 1], _ = y - u, b = m - h;
        var M = p + 1;
        if (l)
          for (; Ln(w, x) && M < n; )
            M++, S += a, w = t[S * 2], x = t[S * 2 + 1];
        var D = 0.5, A = 0, T = 0, L = void 0, $ = void 0;
        if (M >= n || Ln(w, x))
          v = y, d = m;
        else {
          A = w - u, T = x - h;
          var P = y - u, R = w - y, O = m - h, G = x - m, k = void 0, F = void 0;
          if (s === "x") {
            k = Math.abs(P), F = Math.abs(R);
            var W = A > 0 ? 1 : -1;
            v = y - W * k * o, d = m, L = y + W * F * o, $ = m;
          } else if (s === "y") {
            k = Math.abs(O), F = Math.abs(G);
            var j = T > 0 ? 1 : -1;
            v = y, d = m - j * k * o, L = y, $ = m + j * F * o;
          } else
            k = Math.sqrt(P * P + O * O), F = Math.sqrt(R * R + G * G), D = F / (F + k), v = y - A * o * (1 - D), d = m - T * o * (1 - D), L = y + A * o * D, $ = m + T * o * D, L = $r(L, Pr(w, y)), $ = $r($, Pr(x, m)), L = Pr(L, $r(w, y)), $ = Pr($, $r(x, m)), A = L - y, T = $ - m, v = y - A * k / F, d = m - T * k / F, v = $r(v, Pr(u, y)), d = $r(d, Pr(h, m)), v = Pr(v, $r(u, y)), d = Pr(d, $r(h, m)), A = y - v, T = m - d, L = y + A * F / k, $ = m + T * F / k;
        }
        e.bezierCurveTo(c, f, v, d, y, m), c = L, f = $;
      } else
        e.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return p;
}
var w0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return e;
  }()
), b2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "ec-polyline", n;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new w0();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.points, a = 0, o = i.length / 2;
      if (n.connectNulls) {
        for (; o > 0 && Ln(i[o * 2 - 2], i[o * 2 - 1]); o--)
          ;
        for (; a < o && Ln(i[a * 2], i[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += uc(r, i, a, o, o, 1, n.smooth, n.smoothMonotone, n.connectNulls) + 1;
    }, t.prototype.getPointOn = function(r, n) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var i = this.path, a = i.data, o = kn.CMD, s, l, u = n === "x", h = [], c = 0; c < a.length; ) {
        var f = a[c++], v = void 0, d = void 0, g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0;
        switch (f) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (v = a[c++], d = a[c++], _ = u ? (r - s) / (v - s) : (r - l) / (d - l), _ <= 1 && _ >= 0) {
              var b = u ? (d - l) * _ + l : (v - s) * _ + s;
              return u ? [r, b] : [b, r];
            }
            s = v, l = d;
            break;
          case o.C:
            v = a[c++], d = a[c++], g = a[c++], p = a[c++], y = a[c++], m = a[c++];
            var S = u ? Os(s, v, g, y, r, h) : Os(l, d, p, m, r, h);
            if (S > 0)
              for (var w = 0; w < S; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var b = u ? Et(l, d, p, m, x) : Et(s, v, g, y, x);
                  return u ? [r, b] : [b, r];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(vt)
), w2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(w0)
), S2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "ec-polygon", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new w2();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.points, a = n.stackedOnPoints, o = 0, s = i.length / 2, l = n.smoothMonotone;
      if (n.connectNulls) {
        for (; s > 0 && Ln(i[s * 2 - 2], i[s * 2 - 1]); s--)
          ;
        for (; o < s && Ln(i[o * 2], i[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = uc(r, i, o, s, s, 1, n.smooth, l, n.connectNulls);
        uc(r, a, o + u - 1, u, s, -1, n.stackedOnSmooth, l, n.connectNulls), o += u + 1, r.closePath();
      }
    }, t;
  }(vt)
);
function S0(e, t, r, n, i) {
  var a = e.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = r.get(["lineStyle", "width"]) || 0;
  o -= h / 2, s -= h / 2, l += h, u += h, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var c = new St({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var f = e.getBaseAxis(), v = f.isHorizontal(), d = f.inverse;
    v ? (d && (c.shape.x += l), c.shape.width = 0) : (d || (c.shape.y += u), c.shape.height = 0);
    var g = Z(i) ? function(p) {
      i(p, c);
    } : null;
    pr(c, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, r, null, n, g);
  }
  return c;
}
function x0(e, t, r) {
  var n = e.getArea(), i = Dt(n.r0, 1), a = Dt(n.r, 1), o = new Hi({
    shape: {
      cx: Dt(e.cx, 1),
      cy: Dt(e.cy, 1),
      r0: i,
      r: a,
      startAngle: n.startAngle,
      endAngle: n.endAngle,
      clockwise: n.clockwise
    }
  });
  if (t) {
    var s = e.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = n.startAngle : o.shape.r = i, pr(o, {
      shape: {
        endAngle: n.endAngle,
        r: a
      }
    }, r);
  }
  return o;
}
function x2(e, t, r, n, i) {
  if (e) {
    if (e.type === "polar")
      return x0(e, t, r);
    if (e.type === "cartesian2d")
      return S0(e, t, r, n, i);
  } else return null;
  return null;
}
function zl(e, t) {
  return e.type === t;
}
function Fp(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return;
    return !0;
  }
}
function Hp(e) {
  for (var t = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0; a < e.length; ) {
    var o = e[a++], s = e[a++];
    isNaN(o) || (t = Math.min(o, t), n = Math.max(o, n)), isNaN(s) || (r = Math.min(s, r), i = Math.max(s, i));
  }
  return [[t, r], [n, i]];
}
function Vp(e, t) {
  var r = Hp(e), n = r[0], i = r[1], a = Hp(t), o = a[0], s = a[1];
  return Math.max(Math.abs(n[0] - o[0]), Math.abs(n[1] - o[1]), Math.abs(i[0] - s[0]), Math.abs(i[1] - s[1]));
}
function Gp(e) {
  return _t(e) ? e : e ? 0.5 : 0;
}
function T2(e, t, r) {
  if (!r.valueDim)
    return [];
  for (var n = t.count(), i = lr(n * 2), a = 0; a < n; a++) {
    var o = b0(r, e, t, a);
    i[a * 2] = o[0], i[a * 2 + 1] = o[1];
  }
  return i;
}
function Rr(e, t, r, n, i) {
  var a = r.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], h = [], c = [], f = [];
  if (i) {
    for (l = 0; l < e.length; l += 2) {
      var v = t || e;
      !isNaN(v[l]) && !isNaN(v[l + 1]) && f.push(e[l], e[l + 1]);
    }
    e = f;
  }
  for (l = 0; l < e.length - 2; l += 2)
    switch (c[0] = e[l + 2], c[1] = e[l + 3], h[0] = e[l], h[1] = e[l + 1], s.push(h[0], h[1]), n) {
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
function C2(e, t) {
  var r = [], n = e.length, i, a;
  function o(h, c, f) {
    var v = h.coord, d = (f - v) / (c.coord - v), g = Dw(d, [h.color, c.color]);
    return {
      coord: f,
      color: g
    };
  }
  for (var s = 0; s < n; s++) {
    var l = e[s], u = l.coord;
    if (u < 0)
      i = l;
    else if (u > t) {
      a ? r.push(o(a, l, t)) : i && r.push(o(i, l, 0), o(i, l, t));
      break;
    } else
      i && (r.push(o(i, l, 0)), i = null), r.push(l), a = l;
  }
  return r;
}
function M2(e, t, r) {
  var n = e.getVisual("visualMeta");
  if (!(!n || !n.length || !e.count()) && t.type === "cartesian2d") {
    for (var i, a, o = n.length - 1; o >= 0; o--) {
      var s = e.getDimensionInfo(n[o].dimension);
      if (i = s && s.coordDim, i === "x" || i === "y") {
        a = n[o];
        break;
      }
    }
    if (a) {
      var l = t.getAxis(i), u = U(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), h = u.length, c = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), c.reverse());
      var f = C2(u, i === "x" ? r.getWidth() : r.getHeight()), v = f.length;
      if (!v && h)
        return u[0].coord < 0 ? c[1] ? c[1] : u[h - 1].color : c[0] ? c[0] : u[0].color;
      var d = 10, g = f[0].coord - d, p = f[v - 1].coord + d, y = p - g;
      if (y < 1e-3)
        return "transparent";
      C(f, function(_) {
        _.offset = (_.coord - g) / y;
      }), f.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: v ? f[v - 1].offset : 0.5,
        color: c[1] || "transparent"
      }), f.unshift({
        offset: v ? f[0].offset : 0.5,
        color: c[0] || "transparent"
      });
      var m = new af(0, 0, 0, 0, f, !0);
      return m[i] = g, m[i + "2"] = p, m;
    }
  }
}
function D2(e, t, r) {
  var n = e.get("showAllSymbol"), i = n === "auto";
  if (!(n && !i)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (a && !(i && A2(a, t))) {
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
function A2(e, t) {
  var r = e.getExtent(), n = Math.abs(r[1] - r[0]) / e.scale.count();
  isNaN(n) && (n = 0);
  for (var i = t.count(), a = Math.max(1, Math.round(i / 5)), o = 0; o < i; o += a)
    if (Rf.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[e.isHorizontal() ? 1 : 0] * 1.5 > n)
      return !1;
  return !0;
}
function I2(e, t) {
  return isNaN(e) || isNaN(t);
}
function L2(e) {
  for (var t = e.length / 2; t > 0 && I2(e[t * 2 - 2], e[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function Wp(e, t) {
  return [e[t * 2], e[t * 2 + 1]];
}
function $2(e, t, r) {
  for (var n = e.length / 2, i = r === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < n; u++)
    if (o = e[u * 2 + i], !(isNaN(o) || isNaN(e[u * 2 + 1 - i]))) {
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
function T0(e) {
  if (e.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Ke.length; t++)
    if (e.get([Ke[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function Ju(e, t, r, n) {
  if (zl(t, "cartesian2d")) {
    var i = n.getModel("endLabel"), a = i.get("valueAnimation"), o = n.getData(), s = {
      lastFrameIndex: 0
    }, l = T0(n) ? function(v, d) {
      e._endLabelOnDuring(v, d, o, s, a, i, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = S0(t, r, n, function() {
      var v = e._endLabel;
      v && r && s.originalX != null && v.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!n.get("clip", !0)) {
      var c = h.shape, f = Math.max(c.width, c.height);
      u ? (c.y -= f, c.height += f * 2) : (c.x -= f, c.width += f * 2);
    }
    return l && l(1, h), h;
  } else
    return x0(t, r, n);
}
function P2(e, t) {
  var r = t.getBaseAxis(), n = r.isHorizontal(), i = r.inverse, a = n ? i ? "right" : "left" : "center", o = n ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: e.get("align") || a,
      verticalAlign: e.get("verticalAlign") || o
    }
  };
}
var R2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var r = new Mt(), n = new g2();
      this.group.add(n.group), this._symbolDraw = n, this._lineGroup = r, this._changePolyState = J(this._changePolyState, this);
    }, t.prototype.render = function(r, n, i) {
      var a = r.coordinateSystem, o = this.group, s = r.getData(), l = r.getModel("lineStyle"), u = r.getModel("areaStyle"), h = s.getLayout("points") || [], c = a.type === "polar", f = this._coordSys, v = this._symbolDraw, d = this._polyline, g = this._polygon, p = this._lineGroup, y = !n.ssr && r.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = _0(a, s, _), S = m && T2(a, s, b), w = r.get("showSymbol"), x = r.get("connectNulls"), M = w && !c && D2(r, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(xt, Ce) {
        xt.__temp && (o.remove(xt), D.setItemGraphicEl(Ce, null));
      }), w || v.remove(), o.add(p);
      var A = c ? !1 : r.get("step"), T;
      a && a.getArea && r.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var L = M2(s, a, i) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && f.type === a.type && A === this._step))
        w && v.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(xt) {
            return [h[xt * 2], h[xt * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), d = this._newPolyline(h), m ? g = this._newPolygon(h, S) : g && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Nn(L)), p.setClipPath(Ju(this, a, !0, r));
      else {
        m && !g ? g = this._newPolygon(h, S) : g && !m && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Nn(L));
        var $ = p.getClipPath();
        if ($) {
          var P = Ju(this, a, !1, r);
          pr($, {
            shape: P.shape
          }, r);
        } else
          p.setClipPath(Ju(this, a, !0, r));
        w && v.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(xt) {
            return [h[xt * 2], h[xt * 2 + 1]];
          }
        }), (!Fp(this._stackedOnPoints, S) || !Fp(this._points, h)) && (y ? this._doUpdateAnimation(s, S, a, i, A, _, x) : (A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), d.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: S
        })));
      }
      var R = r.getModel("emphasis"), O = R.get("focus"), G = R.get("blurScope"), k = R.get("disabled");
      if (d.useStyle(ht(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: L,
          lineJoin: "bevel"
        }
      )), Fh(d, r, "lineStyle"), d.style.lineWidth > 0 && r.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = d.getState("emphasis").style;
        F.lineWidth = +d.style.lineWidth + 1;
      }
      st(d).seriesIndex = r.seriesIndex, Ka(d, O, G, k);
      var W = Gp(r.get("smooth")), j = r.get("smoothMonotone");
      if (d.setShape({
        smooth: W,
        smoothMonotone: j,
        connectNulls: x
      }), g) {
        var rt = s.getCalculationInfo("stackedOnSeries"), dt = 0;
        g.useStyle(ht(u.getAreaStyle(), {
          fill: L,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), rt && (dt = Gp(rt.get("smooth"))), g.setShape({
          smooth: W,
          stackedOnSmooth: dt,
          smoothMonotone: j,
          connectNulls: x
        }), Fh(g, r, "areaStyle"), st(g).seriesIndex = r.seriesIndex, Ka(g, O, G, k);
      }
      var wt = this._changePolyState;
      s.eachItemGraphicEl(function(xt) {
        xt && (xt.onHoverStateChange = wt);
      }), this._polyline.onHoverStateChange = wt, this._data = s, this._coordSys = a, this._stackedOnPoints = S, this._points = h, this._step = A, this._valueOrigin = _, r.get("triggerLineEvent") && (this.packEventData(r, d), g && this.packEventData(r, g));
    }, t.prototype.packEventData = function(r, n) {
      st(n).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: r.componentIndex,
        seriesIndex: r.seriesIndex,
        seriesName: r.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(r, n, i, a) {
      var o = r.getData(), s = En(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], c = l[s * 2 + 1];
          if (isNaN(h) || isNaN(c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, c))
            return;
          var f = r.get("zlevel") || 0, v = r.get("z") || 0;
          u = new Rf(o, s), u.x = h, u.y = c, u.setZ(f, v);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = f, d.z = v, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        Se.prototype.highlight.call(this, r, n, i, a);
    }, t.prototype.downplay = function(r, n, i, a) {
      var o = r.getData(), s = En(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        Se.prototype.downplay.call(this, r, n, i, a);
    }, t.prototype._changePolyState = function(r) {
      var n = this._polygon;
      ed(this._polyline, r), n && ed(n, r);
    }, t.prototype._newPolyline = function(r) {
      var n = this._polyline;
      return n && this._lineGroup.remove(n), n = new b2({
        shape: {
          points: r
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(n), this._polyline = n, n;
    }, t.prototype._newPolygon = function(r, n) {
      var i = this._polygon;
      return i && this._lineGroup.remove(i), i = new S2({
        shape: {
          points: r,
          stackedOnPoints: n
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(i), this._polygon = i, i;
    }, t.prototype._initSymbolLabelAnimation = function(r, n, i) {
      var a, o, s = n.getBaseAxis(), l = s.inverse;
      n.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : n.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = r.hostModel, h = u.get("animationDuration");
      Z(h) && (h = h(null));
      var c = u.get("animationDelay") || 0, f = Z(c) ? c(null) : c;
      r.eachItemGraphicEl(function(v, d) {
        var g = v;
        if (g) {
          var p = [v.x, v.y], y = void 0, m = void 0, _ = void 0;
          if (i)
            if (o) {
              var b = i, S = n.pointToCoord(p);
              a ? (y = b.startAngle, m = b.endAngle, _ = -S[1] / 180 * Math.PI) : (y = b.r0, m = b.r, _ = S[0]);
            } else {
              var w = i;
              a ? (y = w.x, m = w.x + w.width, _ = v.x) : (y = w.y + w.height, m = w.y, _ = v.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var M = Z(c) ? c(d) : h * x + f, D = g.getSymbolPath(), A = D.getTextContent();
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
    }, t.prototype._initOrUpdateEndLabel = function(r, n, i) {
      var a = r.getModel("endLabel");
      if (T0(r)) {
        var o = r.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new Lt({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = L2(l);
        h >= 0 && (yo(s, Li(r, "endLabel"), {
          inheritColor: i,
          labelFetcher: r,
          labelDataIndex: h,
          defaultText: function(c, f, v) {
            return v != null ? m0(o, v) : Pf(o, c);
          },
          enableTextSetter: !0
        }, P2(a, n)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(r, n, i, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        r < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = i.getLayout("points"), f = i.hostModel, v = f.get("connectNulls"), d = s.get("precision"), g = s.get("distance") || 0, p = l.getBaseAxis(), y = p.isHorizontal(), m = p.inverse, _ = n.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, S = (y ? g : 0) * (m ? -1 : 1), w = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", M = $2(c, b, x), D = M.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !v) {
            var L = Wp(c, D[0]);
            u.attr({
              x: L[0] + S,
              y: L[1] + w
            }), o && (T = f.getRawValue(D[0]));
          } else {
            var L = h.getPointOn(b, x);
            L && u.attr({
              x: L[0] + S,
              y: L[1] + w
            });
            var $ = f.getRawValue(D[0]), P = f.getRawValue(D[1]);
            o && (T = TS(i, d, $, P, M.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = r === 1 || a.lastFrameIndex > 0 ? D[0] : 0, L = Wp(c, R);
          o && (T = f.getRawValue(R)), u.attr({
            x: L[0] + S,
            y: L[1] + w
          });
        }
        if (o) {
          var O = Sl(u);
          typeof O.setLabelText == "function" && O.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(r, n, i, a, o, s, l) {
      var u = this._polyline, h = this._polygon, c = r.hostModel, f = _2(this._data, r, this._stackedOnPoints, n, this._coordSys, i, this._valueOrigin), v = f.current, d = f.stackedOnCurrent, g = f.next, p = f.stackedOnNext;
      if (o && (d = Rr(f.stackedOnCurrent, f.current, i, o, l), v = Rr(f.current, null, i, o, l), p = Rr(f.stackedOnNext, f.next, i, o, l), g = Rr(f.next, null, i, o, l)), Vp(v, g) > 3e3 || h && Vp(d, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: g
        }), h && (h.stopAnimation(), h.setShape({
          points: g,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = f.current, u.shape.points = v;
      var y = {
        shape: {
          points: g
        }
      };
      f.current !== v && (y.shape.__points = f.next), u.stopAnimation(), le(u, y, c), h && (h.setShape({
        // Reuse the points with polyline.
        points: v,
        stackedOnPoints: d
      }), h.stopAnimation(), le(h, {
        shape: {
          stackedOnPoints: p
        }
      }, c), u.shape.points !== h.shape.points && (h.shape.points = u.shape.points));
      for (var m = [], _ = f.status, b = 0; b < _.length; b++) {
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
      var n = this.group, i = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), i && i.eachItemGraphicEl(function(a, o) {
        a.__temp && (n.remove(a), i.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(Se)
);
function O2(e, t) {
  return {
    seriesType: e,
    plan: bf(),
    reset: function(r) {
      var n = r.getData(), i = r.coordinateSystem;
      if (r.pipelineContext, !!i) {
        var a = U(i.dimensions, function(c) {
          return n.mapDimension(c);
        }).slice(0, 2), o = a.length, s = n.getCalculationInfo("stackResultDimension");
        Oi(n, a[0]) && (a[0] = s), Oi(n, a[1]) && (a[1] = s);
        var l = n.getStore(), u = n.getDimensionIndex(a[0]), h = n.getDimensionIndex(a[1]);
        return o && {
          progress: function(c, f) {
            for (var v = c.end - c.start, d = lr(v * o), g = [], p = [], y = c.start, m = 0; y < c.end; y++) {
              var _ = void 0;
              if (o === 1) {
                var b = l.get(u, y);
                _ = i.dataToPoint(b, null, p);
              } else
                g[0] = l.get(u, y), g[1] = l.get(h, y), _ = i.dataToPoint(g, null, p);
              d[m++] = _[0], d[m++] = _[1];
            }
            f.setLayout("points", d);
          }
        };
      }
    }
  };
}
var E2 = {
  average: function(e) {
    for (var t = 0, r = 0, n = 0; n < e.length; n++)
      isNaN(e[n]) || (t += e[n], r++);
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
}, k2 = function(e) {
  return Math.round(e.length / 2);
};
function C0(e) {
  return {
    seriesType: e,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, r, n) {
      var i = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = i.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), h = l.getExtent(), c = n.getDevicePixelRatio(), f = Math.abs(h[1] - h[0]) * (c || 1), v = Math.round(s / f);
        if (isFinite(v) && v > 1) {
          a === "lttb" ? t.setData(i.lttbDownSample(i.mapDimension(u.dim), 1 / v)) : a === "minmax" && t.setData(i.minmaxDownSample(i.mapDimension(u.dim), 1 / v));
          var d = void 0;
          H(a) ? d = E2[a] : Z(a) && (d = a), d && t.setData(i.downSample(i.mapDimension(u.dim), 1 / v, d, k2));
        }
      }
    }
  };
}
function N2(e) {
  e.registerChartView(R2), e.registerSeriesModel(d2), e.registerLayout(O2("line")), e.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var r = t.getData(), n = t.getModel("lineStyle").getLineStyle();
      n && !n.stroke && (n.stroke = r.getVisual("style").fill), r.setVisual("legendLineStyle", n);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, C0("line"));
}
var hc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, n) {
      return El(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(r, n, i) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(r), s = a.dataToPoint(o);
        if (i)
          C(a.getAxes(), function(f, v) {
            if (f.type === "category" && n != null) {
              var d = f.getTicksCoords(), g = f.getTickModel().get("alignWithLabel"), p = o[v], y = n[v] === "x1" || n[v] === "y1";
              if (y && !g && (p += 1), d.length < 2)
                return;
              if (d.length === 2) {
                s[v] = f.toGlobalCoord(f.getExtent()[y ? 1 : 0]);
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
              _ == null && (m ? m && (_ = d[d.length - 1].coord) : _ = d[0].coord), s[v] = f.toGlobalCoord(_);
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
  }(Oe)
);
Oe.registerClass(hc);
var B2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function() {
      return El(null, this, {
        useEncodeDefaulter: !0,
        createInvertedIndices: !!this.get("realtimeSort", !0) || null
      });
    }, t.prototype.getProgressive = function() {
      return this.get("large") ? this.get("progressive") : !1;
    }, t.prototype.getProgressiveThreshold = function() {
      var r = this.get("progressiveThreshold"), n = this.get("largeThreshold");
      return n > r && (r = n), r;
    }, t.prototype.brushSelector = function(r, n, i) {
      return i.rect(n.getItemLayout(r));
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = Tl(hc.defaultOption, {
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
  }(hc)
), z2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return e;
  }()
), Up = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "sausage", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new z2();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.cx, a = n.cy, o = Math.max(n.r0 || 0, 0), s = Math.max(n.r, 0), l = (s - o) * 0.5, u = o + l, h = n.startAngle, c = n.endAngle, f = n.clockwise, v = Math.PI * 2, d = f ? c - h < v : h - c < v;
      d || (h = c - (f ? v : -v));
      var g = Math.cos(h), p = Math.sin(h), y = Math.cos(c), m = Math.sin(c);
      d ? (r.moveTo(g * o + i, p * o + a), r.arc(g * u + i, p * u + a, l, -Math.PI + h, h, !f)) : r.moveTo(g * s + i, p * s + a), r.arc(i, a, s, h, c, !f), r.arc(y * u + i, m * u + a, l, c - Math.PI * 2, c - Math.PI, !f), o !== 0 && r.arc(i, a, o, c, h, f);
    }, t;
  }(vt)
);
function F2(e, t) {
  t = t || {};
  var r = t.isRoundCap;
  return function(n, i, a) {
    var o = i.position;
    if (!o || o instanceof Array)
      return zs(n, i, a);
    var s = e(o), l = i.distance != null ? i.distance : 5, u = this.shape, h = u.cx, c = u.cy, f = u.r, v = u.r0, d = (f + v) / 2, g = u.startAngle, p = u.endAngle, y = (g + p) / 2, m = r ? Math.abs(f - v) / 2 : 0, _ = Math.cos, b = Math.sin, S = h + f * _(g), w = c + f * b(g), x = "left", M = "top";
    switch (s) {
      case "startArc":
        S = h + (v - l) * _(y), w = c + (v - l) * b(y), x = "center", M = "top";
        break;
      case "insideStartArc":
        S = h + (v + l) * _(y), w = c + (v + l) * b(y), x = "center", M = "bottom";
        break;
      case "startAngle":
        S = h + d * _(g) + ts(g, l + m, !1), w = c + d * b(g) + es(g, l + m, !1), x = "right", M = "middle";
        break;
      case "insideStartAngle":
        S = h + d * _(g) + ts(g, -l + m, !1), w = c + d * b(g) + es(g, -l + m, !1), x = "left", M = "middle";
        break;
      case "middle":
        S = h + d * _(y), w = c + d * b(y), x = "center", M = "middle";
        break;
      case "endArc":
        S = h + (f + l) * _(y), w = c + (f + l) * b(y), x = "center", M = "bottom";
        break;
      case "insideEndArc":
        S = h + (f - l) * _(y), w = c + (f - l) * b(y), x = "center", M = "top";
        break;
      case "endAngle":
        S = h + d * _(p) + ts(p, l + m, !0), w = c + d * b(p) + es(p, l + m, !0), x = "left", M = "middle";
        break;
      case "insideEndAngle":
        S = h + d * _(p) + ts(p, -l + m, !0), w = c + d * b(p) + es(p, -l + m, !0), x = "right", M = "middle";
        break;
      default:
        return zs(n, i, a);
    }
    return n = n || {}, n.x = S, n.y = w, n.align = x, n.verticalAlign = M, n;
  };
}
function H2(e, t, r, n) {
  if (_t(n)) {
    e.setTextConfig({
      rotation: n
    });
    return;
  } else if (z(t)) {
    e.setTextConfig({
      rotation: 0
    });
    return;
  }
  var i = e.shape, a = i.clockwise ? i.startAngle : i.endAngle, o = i.clockwise ? i.endAngle : i.startAngle, s = (a + o) / 2, l, u = r(t);
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
function ts(e, t, r) {
  return t * Math.sin(e) * (r ? -1 : 1);
}
function es(e, t, r) {
  return t * Math.cos(e) * (r ? 1 : -1);
}
function V2(e, t, r) {
  var n = e.get("borderRadius");
  if (n == null)
    return {
      cornerRadius: 0
    };
  z(n) || (n = [n, n, n, n]);
  var i = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: U(n, function(a) {
      return Ze(a, i);
    })
  };
}
var th = Math.max, eh = Math.min;
function G2(e, t) {
  var r = e.getArea && e.getArea();
  if (zl(e, "cartesian2d")) {
    var n = e.getBaseAxis();
    if (n.type !== "category" || !n.onBand) {
      var i = t.getLayout("bandWidth");
      n.isHorizontal() ? (r.x -= i, r.width += i * 2) : (r.y -= i, r.height += i * 2);
    }
  }
  return r;
}
var W2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e.call(this) || this;
      return r.type = t.type, r._isFirstFrame = !0, r;
    }
    return t.prototype.render = function(r, n, i, a) {
      this._model = r, this._removeOnRenderedListener(i), this._updateDrawMode(r);
      var o = r.get("coordinateSystem");
      (o === "cartesian2d" || o === "polar") && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(r, n, i) : this._renderNormal(r, n, i, a));
    }, t.prototype.incrementalPrepareRender = function(r) {
      this._clear(), this._updateDrawMode(r), this._updateLargeClip(r);
    }, t.prototype.incrementalRender = function(r, n) {
      this._progressiveEls = [], this._incrementalRenderLarge(r, n);
    }, t.prototype.eachRendered = function(r) {
      go(this._progressiveEls || this.group, r);
    }, t.prototype._updateDrawMode = function(r) {
      var n = r.pipelineContext.large;
      (this._isLargeDraw == null || n !== this._isLargeDraw) && (this._isLargeDraw = n, this._clear());
    }, t.prototype._renderNormal = function(r, n, i, a) {
      var o = this.group, s = r.getData(), l = this._data, u = r.coordinateSystem, h = u.getBaseAxis(), c;
      u.type === "cartesian2d" ? c = h.isHorizontal() : u.type === "polar" && (c = h.dim === "angle");
      var f = r.isAnimationEnabled() ? r : null, v = U2(r, u);
      v && this._enableRealtimeSort(v, s, i);
      var d = r.get("clip", !0) || v, g = G2(u, s);
      o.removeClipPath();
      var p = r.get("roundCap", !0), y = r.get("showBackground", !0), m = r.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], S = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function M(T) {
        var L = rs[u.type](s, T), $ = Q2(u, c, L);
        return $.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? $.setShape("r", _) : $.setShape("cornerRadius", _), b[T] = $, $;
      }
      s.diff(l).add(function(T) {
        var L = s.getItemModel(T), $ = rs[u.type](s, T, L);
        if (y && M(T), !(!s.hasValue(T) || !Kp[u.type]($))) {
          var P = !1;
          d && (P = Yp[u.type](g, $));
          var R = Xp[u.type](r, s, T, $, c, f, h.model, !1, p);
          v && (R.forceLabelAnimation = !0), jp(R, s, T, L, $, r, c, u.type === "polar"), w ? R.attr({
            shape: $
          }) : v ? qp(v, f, R, $, T, c, !1, !1) : pr(R, {
            shape: $
          }, r, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = P;
        }
      }).update(function(T, L) {
        var $ = s.getItemModel(T), P = rs[u.type](s, T, $);
        if (y) {
          var R = void 0;
          S.length === 0 ? R = M(L) : (R = S[L], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), b[T] = R);
          var O = rs[u.type](s, T), G = D0(c, O, u);
          le(R, {
            shape: G
          }, f, T);
        }
        var k = l.getItemGraphicEl(L);
        if (!s.hasValue(T) || !Kp[u.type](P)) {
          o.remove(k);
          return;
        }
        var F = !1;
        if (d && (F = Yp[u.type](g, P), F && o.remove(k)), k ? wm(k) : k = Xp[u.type](r, s, T, P, c, f, h.model, !!k, p), v && (k.forceLabelAnimation = !0), x) {
          var W = k.getTextContent();
          if (W) {
            var j = Sl(W);
            j.prevValue != null && (j.prevValue = j.value);
          }
        } else
          jp(k, s, T, $, P, r, c, u.type === "polar");
        w ? k.attr({
          shape: P
        }) : v ? qp(v, f, k, P, T, c, !0, x) : le(k, {
          shape: P
        }, r, T, null), s.setItemGraphicEl(T, k), k.ignore = F, o.add(k);
      }).remove(function(T) {
        var L = l.getItemGraphicEl(T);
        L && Wh(L, r, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new Mt());
      D.removeAll();
      for (var A = 0; A < b.length; ++A)
        D.add(b[A]);
      o.add(D), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(r, n, i) {
      this._clear(), Jp(r, this.group), this._updateLargeClip(r);
    }, t.prototype._incrementalRenderLarge = function(r, n) {
      this._removeBackground(), Jp(n, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(r) {
      var n = r.get("clip", !0) && x2(r.coordinateSystem, !1, r), i = this.group;
      n ? i.setClipPath(n) : i.removeClipPath();
    }, t.prototype._enableRealtimeSort = function(r, n, i) {
      var a = this;
      if (n.count()) {
        var o = r.baseAxis;
        if (this._isFirstFrame)
          this._dispatchInitSort(n, r, i), this._isFirstFrame = !1;
        else {
          var s = function(l) {
            var u = n.getItemGraphicEl(l), h = u && u.shape;
            return h && // The result should be consistent with the initial sort by data value.
            // Do not support the case that both positive and negative exist.
            Math.abs(o.isHorizontal() ? h.height : h.width) || 0;
          };
          this._onRendered = function() {
            a._updateSortWithinSameData(n, s, o, i);
          }, i.getZr().on("rendered", this._onRendered);
        }
      }
    }, t.prototype._dataSort = function(r, n, i) {
      var a = [];
      return r.each(r.mapDimension(n.dim), function(o, s) {
        var l = i(s);
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
    }, t.prototype._isOrderChangedWithinSameData = function(r, n, i) {
      for (var a = i.scale, o = r.mapDimension(i.dim), s = Number.MAX_VALUE, l = 0, u = a.getOrdinalMeta().categories.length; l < u; ++l) {
        var h = r.rawIndexOf(o, a.getRawOrdinalNumber(l)), c = h < 0 ? Number.MIN_VALUE : n(r.indexOfRawIndex(h));
        if (c > s)
          return !0;
        s = c;
      }
      return !1;
    }, t.prototype._isOrderDifferentInView = function(r, n) {
      for (var i = n.scale, a = i.getExtent(), o = Math.max(0, a[0]), s = Math.min(a[1], i.getOrdinalMeta().categories.length - 1); o <= s; ++o)
        if (r.ordinalNumbers[o] !== i.getRawOrdinalNumber(o))
          return !0;
    }, t.prototype._updateSortWithinSameData = function(r, n, i, a) {
      if (this._isOrderChangedWithinSameData(r, n, i)) {
        var o = this._dataSort(r, i, n);
        this._isOrderDifferentInView(o, i) && (this._removeOnRenderedListener(a), a.dispatchAction({
          type: "changeAxisOrder",
          componentType: i.dim + "Axis",
          axisId: i.index,
          sortInfo: o
        }));
      }
    }, t.prototype._dispatchInitSort = function(r, n, i) {
      var a = n.baseAxis, o = this._dataSort(r, a, function(s) {
        return r.get(r.mapDimension(n.otherAxis.dim), s);
      });
      i.dispatchAction({
        type: "changeAxisOrder",
        componentType: a.dim + "Axis",
        isInitSort: !0,
        axisId: a.index,
        sortInfo: o
      });
    }, t.prototype.remove = function(r, n) {
      this._clear(this._model), this._removeOnRenderedListener(n);
    }, t.prototype.dispose = function(r, n) {
      this._removeOnRenderedListener(n);
    }, t.prototype._removeOnRenderedListener = function(r) {
      this._onRendered && (r.getZr().off("rendered", this._onRendered), this._onRendered = null);
    }, t.prototype._clear = function(r) {
      var n = this.group, i = this._data;
      r && r.isAnimationEnabled() && i && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], i.eachItemGraphicEl(function(a) {
        Wh(a, r, st(a).dataIndex);
      })) : n.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(Se)
), Yp = {
  cartesian2d: function(e, t) {
    var r = t.width < 0 ? -1 : 1, n = t.height < 0 ? -1 : 1;
    r < 0 && (t.x += t.width, t.width = -t.width), n < 0 && (t.y += t.height, t.height = -t.height);
    var i = e.x + e.width, a = e.y + e.height, o = th(t.x, e.x), s = eh(t.x + t.width, i), l = th(t.y, e.y), u = eh(t.y + t.height, a), h = s < o, c = u < l;
    return t.x = h && o > i ? s : o, t.y = c && l > a ? u : l, t.width = h ? 0 : s - o, t.height = c ? 0 : u - l, r < 0 && (t.x += t.width, t.width = -t.width), n < 0 && (t.y += t.height, t.height = -t.height), h || c;
  },
  polar: function(e, t) {
    var r = t.r0 <= t.r ? 1 : -1;
    if (r < 0) {
      var n = t.r;
      t.r = t.r0, t.r0 = n;
    }
    var i = eh(t.r, e.r), a = th(t.r0, e.r0);
    t.r = i, t.r0 = a;
    var o = i - a < 0;
    if (r < 0) {
      var n = t.r;
      t.r = t.r0, t.r0 = n;
    }
    return o;
  }
}, Xp = {
  cartesian2d: function(e, t, r, n, i, a, o, s, l) {
    var u = new St({
      shape: N({}, n),
      z2: 1
    });
    if (u.__dataIndex = r, u.name = "item", a) {
      var h = u.shape, c = i ? "height" : "width";
      h[c] = 0;
    }
    return u;
  },
  polar: function(e, t, r, n, i, a, o, s, l) {
    var u = !i && l ? Up : Hi, h = new u({
      shape: n,
      z2: 1
    });
    h.name = "item";
    var c = M0(i);
    if (h.calculateTextPosition = F2(c, {
      isRoundCap: u === Up
    }), a) {
      var f = h.shape, v = i ? "r" : "endAngle", d = {};
      f[v] = i ? n.r0 : n.startAngle, d[v] = n[v], (s ? le : pr)(h, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function U2(e, t) {
  var r = e.get("realtimeSort", !0), n = t.getBaseAxis();
  if (r && n.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: n,
      otherAxis: t.getOtherAxis(n)
    };
}
function qp(e, t, r, n, i, a, o, s) {
  var l, u;
  a ? (u = {
    x: n.x,
    width: n.width
  }, l = {
    y: n.y,
    height: n.height
  }) : (u = {
    y: n.y,
    height: n.height
  }, l = {
    x: n.x,
    width: n.width
  }), s || (o ? le : pr)(r, {
    shape: l
  }, t, i, null);
  var h = t ? e.baseAxis.model : null;
  (o ? le : pr)(r, {
    shape: u
  }, h, i);
}
function Zp(e, t) {
  for (var r = 0; r < t.length; r++)
    if (!isFinite(e[t[r]]))
      return !0;
  return !1;
}
var Y2 = ["x", "y", "width", "height"], X2 = ["cx", "cy", "r", "startAngle", "endAngle"], Kp = {
  cartesian2d: function(e) {
    return !Zp(e, Y2);
  },
  polar: function(e) {
    return !Zp(e, X2);
  }
}, rs = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(e, t, r) {
    var n = e.getItemLayout(t), i = r ? Z2(r, n) : 0, a = n.width > 0 ? 1 : -1, o = n.height > 0 ? 1 : -1;
    return {
      x: n.x + a * i / 2,
      y: n.y + o * i / 2,
      width: n.width - a * i,
      height: n.height - o * i
    };
  },
  polar: function(e, t, r) {
    var n = e.getItemLayout(t);
    return {
      cx: n.cx,
      cy: n.cy,
      r0: n.r0,
      r: n.r,
      startAngle: n.startAngle,
      endAngle: n.endAngle,
      clockwise: n.clockwise
    };
  }
};
function q2(e) {
  return e.startAngle != null && e.endAngle != null && e.startAngle === e.endAngle;
}
function M0(e) {
  return /* @__PURE__ */ function(t) {
    var r = t ? "Arc" : "Angle";
    return function(n) {
      switch (n) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return n + r;
        default:
          return n;
      }
    };
  }(e);
}
function jp(e, t, r, n, i, a, o, s) {
  var l = t.getItemVisual(r, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = e.shape, c = V2(n.getModel("itemStyle"), h);
      N(h, c), e.setShape(h);
    }
  } else {
    var u = n.get(["itemStyle", "borderRadius"]) || 0;
    e.setShape("r", u);
  }
  e.useStyle(l);
  var f = n.getShallow("cursor");
  f && e.attr("cursor", f);
  var v = s ? o ? i.r >= i.r0 ? "endArc" : "startArc" : i.endAngle >= i.startAngle ? "endAngle" : "startAngle" : o ? i.height >= 0 ? "bottom" : "top" : i.width >= 0 ? "right" : "left", d = Li(n);
  yo(e, d, {
    labelFetcher: a,
    labelDataIndex: r,
    defaultText: Pf(a.getData(), r),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: v
  });
  var g = e.getTextContent();
  if (s && g) {
    var p = n.get(["label", "position"]);
    e.textConfig.inside = p === "middle" ? !0 : null, H2(e, p === "outside" ? v : p, M0(o), n.get(["label", "rotate"]));
  }
  BT(g, d, a.getRawValue(r), function(m) {
    return m0(t, m);
  });
  var y = n.getModel(["emphasis"]);
  Ka(e, y.get("focus"), y.get("blurScope"), y.get("disabled")), Fh(e, n), q2(i) && (e.style.fill = "none", e.style.stroke = "none", C(e.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function Z2(e, t) {
  var r = e.get(["itemStyle", "borderColor"]);
  if (!r || r === "none")
    return 0;
  var n = e.get(["itemStyle", "borderWidth"]) || 0, i = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(n, i, a);
}
var K2 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
    }
    return e;
  }()
), Qp = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "largeBar", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new K2();
    }, t.prototype.buildPath = function(r, n) {
      for (var i = n.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < i.length; h += 3)
        l[a] = u, l[o] = i[h + 2], s[a] = i[h + a], s[o] = i[h + o], r.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(vt)
);
function Jp(e, t, r, n) {
  var i = e.getData(), a = i.getLayout("valueAxisHorizontal") ? 1 : 0, o = i.getLayout("largeDataIndices"), s = i.getLayout("size"), l = e.getModel("backgroundStyle"), u = i.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new Qp({
      shape: {
        points: u
      },
      incremental: !!n,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), r && r.push(h);
  }
  var c = new Qp({
    shape: {
      points: i.getLayout("largePoints")
    },
    incremental: !!n,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  c.baseDimIdx = a, c.largeDataIndices = o, c.barWidth = s, t.add(c), c.useStyle(i.getVisual("style")), c.style.stroke = null, st(c).seriesIndex = e.seriesIndex, e.get("silent") || (c.on("mousedown", tg), c.on("mousemove", tg)), r && r.push(c);
}
var tg = wf(function(e) {
  var t = this, r = j2(t, e.offsetX, e.offsetY);
  st(t).dataIndex = r >= 0 ? r : null;
}, 30, !1);
function j2(e, t, r) {
  for (var n = e.baseDimIdx, i = 1 - n, a = e.shape.points, o = e.largeDataIndices, s = [], l = [], u = e.barWidth, h = 0, c = a.length / 3; h < c; h++) {
    var f = h * 3;
    if (l[n] = u, l[i] = a[f + 2], s[n] = a[f + n], s[i] = a[f + i], l[i] < 0 && (s[i] += l[i], l[i] = -l[i]), t >= s[0] && t <= s[0] + l[0] && r >= s[1] && r <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function D0(e, t, r) {
  if (zl(r, "cartesian2d")) {
    var n = t, i = r.getArea();
    return {
      x: e ? n.x : i.x,
      y: e ? i.y : n.y,
      width: e ? n.width : i.width,
      height: e ? i.height : n.height
    };
  } else {
    var i = r.getArea(), a = t;
    return {
      cx: i.cx,
      cy: i.cy,
      r0: e ? i.r0 : a.r0,
      r: e ? i.r : a.r,
      startAngle: e ? a.startAngle : 0,
      endAngle: e ? a.endAngle : Math.PI * 2
    };
  }
}
function Q2(e, t, r) {
  var n = e.type === "polar" ? Hi : St;
  return new n({
    shape: D0(t, r, e),
    silent: !0,
    z2: 0
  });
}
function J2(e) {
  e.registerChartView(W2), e.registerSeriesModel(B2), e.registerLayout(e.PRIORITY.VISUAL.LAYOUT, It(LA, "bar")), e.registerLayout(e.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, $A("bar")), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, C0("bar")), e.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function(t, r) {
    var n = t.componentType || "series";
    r.eachComponent({
      mainType: n,
      query: t
    }, function(i) {
      t.sortInfo && i.axis.setCategorySortInfo(t.sortInfo);
    });
  });
}
var tI = (
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
  }(ct)
), cc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", $e).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(ct)
);
Je(cc, t2);
var A0 = {
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
}, eI = ot({
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
}, A0), Of = ot({
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
}, A0), rI = ot({
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
}, Of), nI = ht({
  logBase: 10
}, Of);
const iI = {
  category: eI,
  value: Of,
  time: rI,
  log: nI
};
var aI = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function eg(e, t, r, n) {
  C(aI, function(i, a) {
    var o = ot(ot({}, iI[a], !0), n, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, c) {
          var f = Ja(this), v = f ? Ll(h) : {}, d = c.getTheme();
          ot(h, d.get(a + "Axis")), ot(h, this.getDefaultOption()), h.type = rg(h), f && Pi(h, v, f);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = sc.createByAxisModel(this));
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
  }), e.registerSubTypeDefaulter(t + "Axis", rg);
}
function rg(e) {
  return e.type || (e.data ? "category" : "value");
}
var oI = (
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
      return t = t.toLowerCase(), Ot(this.getAxes(), function(r) {
        return r.scale.type === t;
      });
    }, e.prototype.addAxis = function(t) {
      var r = t.dim;
      this._axes[r] = t, this._dimList.push(r);
    }, e;
  }()
), fc = ["x", "y"];
function ng(e) {
  return e.type === "interval" || e.type === "time";
}
var sI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "cartesian2d", r.dimensions = fc, r;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var r = this.getAxis("x").scale, n = this.getAxis("y").scale;
      if (!(!ng(r) || !ng(n))) {
        var i = r.getExtent(), a = n.getExtent(), o = this.dataToPoint([i[0], a[0]]), s = this.dataToPoint([i[1], a[1]]), l = i[1] - i[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, c = (s[1] - o[1]) / u, f = o[0] - i[0] * h, v = o[1] - a[0] * c, d = this._transform = [h, 0, 0, c, f, v];
          this._invTransform = Fc([], d);
        }
      }
    }, t.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function(r) {
      var n = this.getAxis("x"), i = this.getAxis("y");
      return n.contain(n.toLocalCoord(r[0])) && i.contain(i.toLocalCoord(r[1]));
    }, t.prototype.containData = function(r) {
      return this.getAxis("x").containData(r[0]) && this.getAxis("y").containData(r[1]);
    }, t.prototype.containZone = function(r, n) {
      var i = this.dataToPoint(r), a = this.dataToPoint(n), o = this.getArea(), s = new ut(i[0], i[1], a[0] - i[0], a[1] - i[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(r, n, i) {
      i = i || [];
      var a = r[0], o = r[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return be(i, r, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return i[0] = s.toGlobalCoord(s.dataToCoord(a, n)), i[1] = l.toGlobalCoord(l.dataToCoord(o, n)), i;
    }, t.prototype.clampData = function(r, n) {
      var i = this.getAxis("x").scale, a = this.getAxis("y").scale, o = i.getExtent(), s = a.getExtent(), l = i.parse(r[0]), u = a.parse(r[1]);
      return n = n || [], n[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), n[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), n;
    }, t.prototype.pointToData = function(r, n) {
      var i = [];
      if (this._invTransform)
        return be(i, r, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return i[0] = a.coordToData(a.toLocalCoord(r[0]), n), i[1] = o.coordToData(o.toLocalCoord(r[1]), n), i;
    }, t.prototype.getOtherAxis = function(r) {
      return this.getAxis(r.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(r) {
      r = r || 0;
      var n = this.getAxis("x").getGlobalExtent(), i = this.getAxis("y").getGlobalExtent(), a = Math.min(n[0], n[1]) - r, o = Math.min(i[0], i[1]) - r, s = Math.max(n[0], n[1]) - a + r, l = Math.max(i[0], i[1]) - o + r;
      return new ut(a, o, s, l);
    }, t;
  }(oI)
), lI = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, a, o) {
      var s = e.call(this, r, n, i) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return t.prototype.isHorizontal = function() {
      var r = this.position;
      return r === "top" || r === "bottom";
    }, t.prototype.getGlobalExtent = function(r) {
      var n = this.getExtent();
      return n[0] = this.toGlobalCoord(n[0]), n[1] = this.toGlobalCoord(n[1]), r && n[0] > n[1] && n.reverse(), n;
    }, t.prototype.pointToData = function(r, n) {
      return this.coordToData(this.toLocalCoord(r[this.dim === "x" ? 0 : 1]), n);
    }, t.prototype.setCategorySortInfo = function(r) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = r, this.scale.setSortInfo(r);
    }, t;
  }(h2)
);
function vc(e, t, r) {
  r = r || {};
  var n = e.coordinateSystem, i = t.axis, a = {}, o = i.getAxesOnZeroOf()[0], s = i.position, l = o ? "onZero" : s, u = i.dim, h = n.getRect(), c = [h.x, h.x + h.width, h.y, h.y + h.height], f = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, v = t.get("offset") || 0, d = u === "x" ? [c[2] - v, c[3] + v] : [c[0] - v, c[1] + v];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    d[f.onZero] = Math.max(Math.min(g, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[f[l]] : c[0], u === "x" ? d[f[l]] : c[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[f[s]] - d[f.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Ii(r.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function ig(e) {
  return e.get("coordinateSystem") === "cartesian2d";
}
function ag(e) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return C(t, function(r, n) {
    var i = n.replace(/Model$/, ""), a = e.getReferringComponents(i, $e).models[0];
    t[n] = a;
  }), t;
}
var rh = Math.log;
function uI(e, t, r) {
  var n = Wi.prototype, i = n.getTicks.call(r), a = n.getTicks.call(r, !0), o = i.length - 1, s = n.getInterval.call(r), l = u0(e, t), u = l.extent, h = l.fixMin, c = l.fixMax;
  if (e.type === "log") {
    var f = rh(e.base);
    u = [rh(u[0]) / f, rh(u[1]) / f];
  }
  e.setExtent(u[0], u[1]), e.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: c
  });
  var v = n.getExtent.call(e);
  h && (u[0] = v[0]), c && (u[1] = v[1]);
  var d = n.getInterval.call(e), g = u[0], p = u[1];
  if (h && c)
    d = (p - g) / o;
  else if (h)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = ju(d), p = u[0] + d * o;
  else if (c)
    for (g = u[1] - d * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      d = ju(d), g = u[1] - d * o;
  else {
    var y = e.getTicks().length - 1;
    y > o && (d = ju(d));
    var m = d * o;
    p = Math.ceil(u[1] / d) * d, g = Dt(p - m), g < 0 && u[0] >= 0 ? (g = 0, p = Dt(m)) : p > 0 && u[1] <= 0 && (p = 0, g = -Dt(m));
  }
  var _ = (i[0].value - a[0].value) / s, b = (i[o].value - a[o].value) / s;
  n.setExtent.call(e, g + d * _, p + d * b), n.setInterval.call(e, d), (_ || b) && n.setNiceExtent.call(e, g + d, p - d);
}
var hI = (
  /** @class */
  function() {
    function e(t, r, n) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = fc, this._initCartesian(t, r, n), this.model = t;
    }
    return e.prototype.getRect = function() {
      return this._rect;
    }, e.prototype.update = function(t, r) {
      var n = this._axesMap;
      this._updateScale(t, this.model);
      function i(o) {
        var s, l = mt(o), u = l.length;
        if (u) {
          for (var h = [], c = u - 1; c >= 0; c--) {
            var f = +l[c], v = o[f], d = v.model, g = v.scale;
            // Only value and log axis without interval support alignTicks.
            lc(g) && d.get("alignTicks") && d.get("interval") == null ? h.push(v) : (Op(g, d), lc(g) && (s = v));
          }
          h.length && (s || (s = h.pop(), Op(s.scale, s.model)), C(h, function(p) {
            uI(p.scale, p.model, s.scale);
          }));
        }
      }
      i(n.x), i(n.y);
      var a = {};
      C(n.x, function(o) {
        og(n, "y", o, a);
      }), C(n.y, function(o) {
        og(n, "x", o, a);
      }), this.resize(this.model, r);
    }, e.prototype.resize = function(t, r, n) {
      var i = t.getBoxLayoutParams(), a = !n && t.get("containLabel"), o = $i(i, {
        width: r.getWidth(),
        height: r.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (C(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = jA(u);
          if (h) {
            var c = u.isHorizontal() ? "height" : "width", f = u.model.get(["axisLabel", "margin"]);
            o[c] -= h[c] + f, u.position === "top" ? o.y += h.height + f : u.position === "left" && (o.x += h.width + f);
          }
        }
      }), l()), C(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        C(s, function(u) {
          var h = u.isHorizontal(), c = h ? [0, o.width] : [0, o.height], f = u.inverse ? 1 : 0;
          u.setExtent(c[f], c[1 - f]), cI(u, h ? o.x : o.y);
        });
      }
    }, e.prototype.getAxis = function(t, r) {
      var n = this._axesMap[t];
      if (n != null)
        return n[r || 0];
    }, e.prototype.getAxes = function() {
      return this._axesList.slice();
    }, e.prototype.getCartesian = function(t, r) {
      if (t != null && r != null) {
        var n = "x" + t + "y" + r;
        return this._coordsMap[n];
      }
      V(t) && (r = t.yAxisIndex, t = t.xAxisIndex);
      for (var i = 0, a = this._coordsList; i < a.length; i++)
        if (a[i].getAxis("x").index === t || a[i].getAxis("y").index === r)
          return a[i];
    }, e.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, e.prototype.convertToPixel = function(t, r, n) {
      var i = this._findConvertTarget(r);
      return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
    }, e.prototype.convertFromPixel = function(t, r, n) {
      var i = this._findConvertTarget(r);
      return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, e.prototype._findConvertTarget = function(t) {
      var r = t.seriesModel, n = t.xAxisModel || r && r.getReferringComponents("xAxis", $e).models[0], i = t.yAxisModel || r && r.getReferringComponents("yAxis", $e).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (r)
        s = r.coordinateSystem, pt(o, s) < 0 && (s = null);
      else if (n && i)
        s = this.getCartesian(n.componentIndex, i.componentIndex);
      else if (n)
        l = this.getAxis("x", n.componentIndex);
      else if (i)
        l = this.getAxis("y", i.componentIndex);
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
    }, e.prototype._initCartesian = function(t, r, n) {
      var i = this, a = this, o = {
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
        C(s.y, function(f, v) {
          var d = "x" + c + "y" + v, g = new sI(d);
          g.master = i, g.model = t, i._coordsMap[d] = g, i._coordsList.push(g), g.addAxis(h), g.addAxis(f);
        });
      });
      function u(h) {
        return function(c, f) {
          if (nh(c, t)) {
            var v = c.get("position");
            h === "x" ? v !== "top" && v !== "bottom" && (v = o.bottom ? "top" : "bottom") : v !== "left" && v !== "right" && (v = o.left ? "right" : "left"), o[v] = !0;
            var d = new lI(h, ZA(c), [0, 0], c.get("type"), v), g = d.type === "category";
            d.onBand = g && c.get("boundaryGap"), d.inverse = c.get("inverse"), c.axis = d, d.model = c, d.grid = a, d.index = f, a._axesList.push(d), s[h][f] = d, l[h]++;
          }
        };
      }
    }, e.prototype._updateScale = function(t, r) {
      C(this._axesList, function(i) {
        if (i.scale.setExtent(1 / 0, -1 / 0), i.type === "category") {
          var a = i.model.get("categorySortInfo");
          i.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(i) {
        if (ig(i)) {
          var a = ag(i), o = a.xAxisModel, s = a.yAxisModel;
          if (!nh(o, r) || !nh(s, r))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = i.getData(), h = l.getAxis("x"), c = l.getAxis("y");
          n(u, h), n(u, c);
        }
      }, this);
      function n(i, a) {
        C(JA(i, a.dim), function(o) {
          a.scale.unionExtentFromData(i, o);
        });
      }
    }, e.prototype.getTooltipAxes = function(t) {
      var r = [], n = [];
      return C(this.getCartesians(), function(i) {
        var a = t != null && t !== "auto" ? i.getAxis(t) : i.getBaseAxis(), o = i.getOtherAxis(a);
        pt(r, a) < 0 && r.push(a), pt(n, o) < 0 && n.push(o);
      }), {
        baseAxes: r,
        otherAxes: n
      };
    }, e.create = function(t, r) {
      var n = [];
      return t.eachComponent("grid", function(i, a) {
        var o = new e(i, t, r);
        o.name = "grid_" + a, o.resize(i, r, !0), i.coordinateSystem = o, n.push(o);
      }), t.eachSeries(function(i) {
        if (ig(i)) {
          var a = ag(i), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          i.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), n;
    }, e.dimensions = fc, e;
  }()
);
function nh(e, t) {
  return e.getCoordSysModel() === t;
}
function og(e, t, r, n) {
  r.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var i = e[t], a, o = r.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    sg(i[l]) && (a = i[l]);
  else
    for (var u in i)
      if (i.hasOwnProperty(u) && sg(i[u]) && !n[h(i[u])]) {
        a = i[u];
        break;
      }
  a && (n[h(a)] = !0);
  function h(c) {
    return c.dim + "_" + c.index;
  }
}
function sg(e) {
  return e && e.type !== "category" && e.type !== "time" && KA(e);
}
function cI(e, t) {
  var r = e.getExtent(), n = r[0] + r[1];
  e.toGlobalCoord = e.dim === "x" ? function(i) {
    return i + t;
  } : function(i) {
    return n - i + t;
  }, e.toLocalCoord = e.dim === "x" ? function(i) {
    return i - t;
  } : function(i) {
    return n - i + t;
  };
}
var zr = Math.PI, Vr = (
  /** @class */
  function() {
    function e(t, r) {
      this.group = new Mt(), this.opt = r, this.axisModel = t, ht(r, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var n = new Mt({
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      n.updateTransform(), this._transformGroup = n;
    }
    return e.prototype.hasBuilder = function(t) {
      return !!lg[t];
    }, e.prototype.add = function(t) {
      lg[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function() {
      return this.group;
    }, e.innerTextLayout = function(t, r, n) {
      var i = Gy(r - t), a, o;
      return Fs(i) ? (o = n > 0 ? "top" : "bottom", a = "center") : Fs(i - zr) ? (o = n > 0 ? "bottom" : "top", a = "center") : (o = "middle", i > 0 && i < zr ? a = n > 0 ? "right" : "left" : a = n > 0 ? "left" : "right"), {
        rotation: i,
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
), lg = {
  axisLine: function(e, t, r, n) {
    var i = t.get(["axisLine", "show"]);
    if (i === "auto" && e.handleAutoShown && (i = e.handleAutoShown("axisLine")), !!i) {
      var a = t.axis.getExtent(), o = n.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (be(s, s, o), be(l, l, o));
      var h = N({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), c = new Wr({
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
      ja(c.shape, c.style.lineWidth), c.anid = "line", r.add(c);
      var f = t.get(["axisLine", "symbol"]);
      if (f != null) {
        var v = t.get(["axisLine", "symbolSize"]);
        H(f) && (f = [f, f]), (H(v) || _t(v)) && (v = [v, v]);
        var d = C_(t.get(["axisLine", "symbolOffset"]) || 0, v), g = v[0], p = v[1];
        C([{
          rotate: e.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (f[m] !== "none" && f[m] != null) {
            var _ = gr(f[m], -g / 2, -p / 2, g, p, h.stroke, !0), b = y.r + y.offset, S = u ? l : s;
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
  axisTickLabel: function(e, t, r, n) {
    var i = dI(r, n, t, e), a = gI(r, n, t, e);
    if (vI(t, a, i), pI(r, n, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = f2(U(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      v2(o);
    }
  },
  axisName: function(e, t, r, n) {
    var i = Ii(e.axisName, t.get("name"));
    if (i) {
      var a = t.get("nameLocation"), o = e.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, c = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        hg(a) ? e.labelOffset + o * l : 0
      ], f, v = t.get("nameRotate");
      v != null && (v = v * zr / 180);
      var d;
      hg(a) ? f = Vr.innerTextLayout(
        e.rotation,
        v ?? e.rotation,
        // Adapt to axis.
        o
      ) : (f = fI(e.rotation, a, v || 0, u), d = e.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(f.rotation)), !isFinite(d) && (d = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, y = p.ellipsis, m = Ii(e.nameTruncateMaxWidth, p.maxWidth, d), _ = new Lt({
        x: c[0],
        y: c[1],
        rotation: f.rotation,
        silent: Vr.isLabelSilent(t),
        style: Xe(s, {
          text: i,
          font: g,
          overflow: "truncate",
          width: m,
          ellipsis: y,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || f.textAlign,
          verticalAlign: s.get("verticalAlign") || f.textVerticalAlign
        }),
        z2: 1
      });
      if (bl({
        el: _,
        componentModel: t,
        itemName: i
      }), _.__fullText = i, _.anid = "name", t.get("triggerEvent")) {
        var b = Vr.makeAxisEventDataBase(t);
        b.targetType = "axisName", b.name = i, st(_).eventData = b;
      }
      n.add(_), _.updateTransform(), r.add(_), _.decomposeTransform();
    }
  }
};
function fI(e, t, r, n) {
  var i = Gy(r - e), a, o, s = n[0] > n[1], l = t === "start" && !s || t !== "start" && s;
  return Fs(i - zr / 2) ? (o = l ? "bottom" : "top", a = "center") : Fs(i - zr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", i < zr * 1.5 && i > zr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: i,
    textAlign: a,
    textVerticalAlign: o
  };
}
function vI(e, t, r) {
  if (!h0(e.axis)) {
    var n = e.get(["axisLabel", "showMinLabel"]), i = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], r = r || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = r[0], h = r[1], c = r[r.length - 1], f = r[r.length - 2];
    n === !1 ? (ce(a), ce(u)) : ug(a, o) && (n ? (ce(o), ce(h)) : (ce(a), ce(u))), i === !1 ? (ce(s), ce(c)) : ug(l, s) && (i ? (ce(l), ce(f)) : (ce(s), ce(c)));
  }
}
function ce(e) {
  e && (e.ignore = !0);
}
function ug(e, t) {
  var r = e && e.getBoundingRect().clone(), n = t && t.getBoundingRect().clone();
  if (!(!r || !n)) {
    var i = Bc([]);
    return zc(i, i, -e.rotation), r.applyTransform(_i([], i, e.getLocalTransform())), n.applyTransform(_i([], i, t.getLocalTransform())), r.intersect(n);
  }
}
function hg(e) {
  return e === "middle" || e === "center";
}
function I0(e, t, r, n, i) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (be(o, o, t), be(s, s, t));
    var h = new Wr({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: n,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    ja(h.shape, h.style.lineWidth), h.anid = i + "_" + e[l].tickValue, a.push(h);
  }
  return a;
}
function dI(e, t, r, n) {
  var i = r.axis, a = r.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && n.handleAutoShown && (o = n.handleAutoShown("axisTick")), !(!o || i.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = n.tickDirection * a.get("length"), u = i.getTicksCoords(), h = I0(u, t.transform, l, ht(s.getLineStyle(), {
      stroke: r.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), c = 0; c < h.length; c++)
      e.add(h[c]);
    return h;
  }
}
function pI(e, t, r, n) {
  var i = r.axis, a = r.getModel("minorTick");
  if (!(!a.get("show") || i.scale.isBlank())) {
    var o = i.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = n * a.get("length"), u = ht(s.getLineStyle(), ht(r.getModel("axisTick").getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var c = I0(o[h], t.transform, l, u, "minorticks_" + h), f = 0; f < c.length; f++)
          e.add(c[f]);
  }
}
function gI(e, t, r, n) {
  var i = r.axis, a = Ii(n.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || i.scale.isBlank())) {
    var o = r.getModel("axisLabel"), s = o.get("margin"), l = i.getViewLabels(), u = (Ii(n.labelRotate, o.get("rotate")) || 0) * zr / 180, h = Vr.innerTextLayout(n.rotation, u, n.labelDirection), c = r.getCategories && r.getCategories(!0), f = [], v = Vr.isLabelSilent(r), d = r.get("triggerEvent");
    return C(l, function(g, p) {
      var y = i.scale.type === "ordinal" ? i.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (c && c[y]) {
        var S = c[y];
        V(S) && S.textStyle && (b = new Tt(S.textStyle, o, r.ecModel));
      }
      var w = b.getTextColor() || r.get(["axisLine", "lineStyle", "color"]), x = i.dataToCoord(y), M = b.getShallow("align", !0) || h.textAlign, D = tt(b.getShallow("alignMinLabel", !0), M), A = tt(b.getShallow("alignMaxLabel", !0), M), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, L = tt(b.getShallow("verticalAlignMinLabel", !0), T), $ = tt(b.getShallow("verticalAlignMaxLabel", !0), T), P = new Lt({
        x,
        y: n.labelOffset + n.labelDirection * s,
        rotation: h.rotation,
        silent: v,
        z2: 10 + (g.level || 0),
        style: Xe(b, {
          text: m,
          align: p === 0 ? D : p === l.length - 1 ? A : M,
          verticalAlign: p === 0 ? L : p === l.length - 1 ? $ : T,
          fill: Z(w) ? w(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            i.type === "category" ? _ : i.type === "value" ? y + "" : y,
            p
          ) : w
        })
      });
      if (P.anid = "label_" + y, bl({
        el: P,
        componentModel: r,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return P.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var R = Vr.makeAxisEventDataBase(r);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = p, i.type === "category" && (R.dataIndex = y), st(P).eventData = R;
      }
      t.add(P), P.updateTransform(), f.push(P), e.add(P), P.decomposeTransform();
    }), f;
  }
}
function yI(e, t) {
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
  return mI(r, e, t), r.seriesInvolved && bI(r, e), r;
}
function mI(e, t, r) {
  var n = t.getComponent("tooltip"), i = t.getComponent("axisPointer"), a = i.get("link", !0) || [], o = [];
  C(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = ao(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var h = s.model, c = h.getModel("tooltip", n);
    if (C(s.getAxes(), It(g, !1, null)), s.getTooltipAxes && n && c.get("show")) {
      var f = c.get("trigger") === "axis", v = c.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (f || v) && C(d.baseAxes, It(g, v ? "cross" : !0, f)), v && C(d.otherAxes, It(g, "cross", !1));
    }
    function g(p, y, m) {
      var _ = m.model.getModel("axisPointer", i), b = _.get("show");
      if (!(!b || b === "auto" && !p && !dc(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = p ? _I(m, c, i, t, p, y) : _;
        var S = _.get("snap"), w = _.get("triggerEmphasis"), x = ao(m.model), M = y || S || m.type === "category", D = e.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: M,
          snap: S,
          useHandle: dc(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, e.seriesInvolved = e.seriesInvolved || M;
        var A = wI(a, m);
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
function _I(e, t, r, n, i, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  C(s, function(f) {
    l[f] = q(o.get(f));
  }), l.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), i === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var c = l.lineStyle = o.get("crossStyle");
      c && ht(u, c.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new Tt(l, r, n));
}
function bI(e, t) {
  t.eachSeries(function(r) {
    var n = r.coordinateSystem, i = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !n || i === "none" || i === !1 || i === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || C(e.coordSysAxesInfo[ao(n.model)], function(o) {
      var s = o.axis;
      n.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function wI(e, t) {
  for (var r = t.model, n = t.dim, i = 0; i < e.length; i++) {
    var a = e[i] || {};
    if (ih(a[n + "AxisId"], r.id) || ih(a[n + "AxisIndex"], r.componentIndex) || ih(a[n + "AxisName"], r.name))
      return i;
  }
}
function ih(e, t) {
  return e === "all" || z(e) && pt(e, t) >= 0 || e === t;
}
function SI(e) {
  var t = Ef(e);
  if (t) {
    var r = t.axisPointerModel, n = t.axis.scale, i = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = n.parse(o));
    var s = dc(r);
    a == null && (i.status = s ? "show" : "hide");
    var l = n.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), i.value = o, s && (i.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Ef(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[ao(e)];
}
function xI(e) {
  var t = Ef(e);
  return t && t.axisPointerModel;
}
function dc(e) {
  return !!e.get(["handle", "show"]);
}
function ao(e) {
  return e.type + "||" + e.id;
}
var cg = {}, L0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, n, i, a) {
      this.axisPointerClass && SI(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, i, !0);
    }, t.prototype.updateAxisPointer = function(r, n, i, a) {
      this._doUpdateAxisPointerClass(r, i, !1);
    }, t.prototype.remove = function(r, n) {
      var i = this._axisPointer;
      i && i.remove(n);
    }, t.prototype.dispose = function(r, n) {
      this._disposeAxisPointer(n), e.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(r, n, i) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = xI(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, n, i) : this._disposeAxisPointer(n);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, n) {
      cg[r] = n;
    }, t.getAxisPointerClass = function(r) {
      return r && cg[r];
    }, t.type = "axis", t;
  }(Ee)
), pc = $t();
function TI(e, t, r, n) {
  var i = r.axis;
  if (!i.scale.isBlank()) {
    var a = r.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = n.coordinateSystem.getRect(), u = i.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, c = pc(e).splitAreaColors, f = Q(), v = 0;
      if (c)
        for (var d = 0; d < u.length; d++) {
          var g = c.get(u[d].tickValue);
          if (g != null) {
            v = (g + (h - 1) * d) % h;
            break;
          }
        }
      var p = i.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = z(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var m = i.toGlobalCoord(u[d].coord), _ = void 0, b = void 0, S = void 0, w = void 0;
        i.isHorizontal() ? (_ = p, b = l.y, S = m - _, w = l.height, p = _ + S) : (_ = l.x, b = p, S = l.width, w = m - b, p = b + w);
        var x = u[d - 1].tickValue;
        x != null && f.set(x, v), t.add(new St({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: b,
            width: S,
            height: w
          },
          style: ht({
            fill: s[v]
          }, y),
          autoBatch: !0,
          silent: !0
        })), v = (v + 1) % h;
      }
      pc(e).splitAreaColors = f;
    }
  }
}
function CI(e) {
  pc(e).splitAreaColors = null;
}
var MI = ["axisLine", "axisTickLabel", "axisName"], DI = ["splitArea", "splitLine", "minorSplitLine"], $0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.axisPointerClass = "CartesianAxisPointer", r;
    }
    return t.prototype.render = function(r, n, i, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new Mt(), this.group.add(this._axisGroup), !!r.get("show")) {
        var s = r.getCoordSysModel(), l = vc(s, r), u = new Vr(r, N({
          handleAutoShown: function(c) {
            for (var f = s.coordinateSystem.getCartesians(), v = 0; v < f.length; v++)
              if (lc(f[v].getOtherAxis(r.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        C(MI, u.add, u), this._axisGroup.add(u.getGroup()), C(DI, function(c) {
          r.get([c, "show"]) && AI[c](this, this._axisGroup, r, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || Mm(o, this._axisGroup, r), e.prototype.render.call(this, r, n, i, a);
      }
    }, t.prototype.remove = function() {
      CI(this);
    }, t.type = "cartesianAxis", t;
  }(L0)
), AI = {
  splitLine: function(e, t, r, n) {
    var i = r.axis;
    if (!i.scale.isBlank()) {
      var a = r.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = z(s) ? s : [s];
      for (var h = n.coordinateSystem.getRect(), c = i.isHorizontal(), f = 0, v = i.getTicksCoords({
        tickModel: a
      }), d = [], g = [], p = o.getLineStyle(), y = 0; y < v.length; y++) {
        var m = i.toGlobalCoord(v[y].coord);
        if (!(y === 0 && !l || y === v.length - 1 && !u)) {
          var _ = v[y].tickValue;
          c ? (d[0] = m, d[1] = h.y, g[0] = m, g[1] = h.y + h.height) : (d[0] = h.x, d[1] = m, g[0] = h.x + h.width, g[1] = m);
          var b = f++ % s.length, S = new Wr({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: g[0],
              y2: g[1]
            },
            style: ht({
              stroke: s[b]
            }, p),
            silent: !0
          });
          ja(S.shape, p.lineWidth), t.add(S);
        }
      }
    }
  },
  minorSplitLine: function(e, t, r, n) {
    var i = r.axis, a = r.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = n.coordinateSystem.getRect(), l = i.isHorizontal(), u = i.getMinorTicksCoords();
    if (u.length)
      for (var h = [], c = [], f = o.getLineStyle(), v = 0; v < u.length; v++)
        for (var d = 0; d < u[v].length; d++) {
          var g = i.toGlobalCoord(u[v][d].coord);
          l ? (h[0] = g, h[1] = s.y, c[0] = g, c[1] = s.y + s.height) : (h[0] = s.x, h[1] = g, c[0] = s.x + s.width, c[1] = g);
          var p = new Wr({
            anid: "minor_line_" + u[v][d].tickValue,
            autoBatch: !0,
            shape: {
              x1: h[0],
              y1: h[1],
              x2: c[0],
              y2: c[1]
            },
            style: f,
            silent: !0
          });
          ja(p.shape, f.lineWidth), t.add(p);
        }
  },
  splitArea: function(e, t, r, n) {
    TI(e, t, r, n);
  }
}, P0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.type = "xAxis", t;
  }($0)
), II = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = P0.type, r;
    }
    return t.type = "yAxis", t;
  }($0)
), LI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "grid", r;
    }
    return t.prototype.render = function(r, n) {
      this.group.removeAll(), r.get("show") && this.group.add(new St({
        shape: r.coordinateSystem.getRect(),
        style: ht({
          fill: r.get("backgroundColor")
        }, r.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(Ee)
), fg = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function $I(e) {
  e.registerComponentView(LI), e.registerComponentModel(tI), e.registerCoordinateSystem("cartesian2d", hI), eg(e, "x", cc, fg), eg(e, "y", cc, fg), e.registerComponentView(P0), e.registerComponentView(II), e.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var oo = C, PI = V, rl = -1, Vt = (
  /** @class */
  function() {
    function e(t) {
      var r = t.mappingMethod, n = t.type, i = this.option = q(t);
      this.type = n, this.mappingMethod = r, this._normalizeData = EI[r];
      var a = e.visualHandlers[n];
      this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._normalizedToVisual = a._normalizedToVisual[r], r === "piecewise" ? (ah(i), RI(i)) : r === "category" ? i.categories ? OI(i) : ah(i, !0) : (qe(r !== "linear" || i.dataExtent), ah(i));
    }
    return e.prototype.mapValueToVisual = function(t) {
      var r = this._normalizeData(t);
      return this._normalizedToVisual(r, t);
    }, e.prototype.getNormalizer = function() {
      return J(this._normalizeData, this);
    }, e.listVisualTypes = function() {
      return mt(e.visualHandlers);
    }, e.isValidType = function(t) {
      return e.visualHandlers.hasOwnProperty(t);
    }, e.eachVisual = function(t, r, n) {
      V(t) ? C(t, r, n) : r.call(n, t);
    }, e.mapVisual = function(t, r, n) {
      var i, a = z(t) ? [] : V(t) ? {} : (i = !0, null);
      return e.eachVisual(t, function(o, s) {
        var l = r.call(n, o, s);
        i ? a = l : a[s] = l;
      }), a;
    }, e.retrieveVisuals = function(t) {
      var r = {}, n;
      return t && oo(e.visualHandlers, function(i, a) {
        t.hasOwnProperty(a) && (r[a] = t[a], n = !0);
      }), n ? r : null;
    }, e.prepareVisualTypes = function(t) {
      if (z(t))
        t = t.slice();
      else if (PI(t)) {
        var r = [];
        oo(t, function(n, i) {
          r.push(i);
        }), t = r;
      } else
        return [];
      return t.sort(function(n, i) {
        return i === "color" && n !== "color" && n.indexOf("color") === 0 ? 1 : -1;
      }), t;
    }, e.dependsOn = function(t, r) {
      return r === "color" ? !!(t && t.indexOf(r) === 0) : t === r;
    }, e.findPieceIndex = function(t, r, n) {
      for (var i, a = 1 / 0, o = 0, s = r.length; o < s; o++) {
        var l = r[o].value;
        if (l != null) {
          if (l === t || H(l) && l === t + "")
            return o;
          n && f(l, o);
        }
      }
      for (var o = 0, s = r.length; o < s; o++) {
        var u = r[o], h = u.interval, c = u.close;
        if (h) {
          if (h[0] === -1 / 0) {
            if (is(c[1], t, h[1]))
              return o;
          } else if (h[1] === 1 / 0) {
            if (is(c[0], h[0], t))
              return o;
          } else if (is(c[0], h[0], t) && is(c[1], t, h[1]))
            return o;
          n && f(h[0], o), n && f(h[1], o);
        }
      }
      if (n)
        return t === 1 / 0 ? r.length - 1 : t === -1 / 0 ? 0 : i;
      function f(v, d) {
        var g = Math.abs(v - t);
        g < a && (a = g, i = d);
      }
    }, e.visualHandlers = {
      color: {
        applyVisual: da("color"),
        getColorMapper: function() {
          var t = this.option;
          return J(t.mappingMethod === "category" ? function(r, n) {
            return !n && (r = this._normalizeData(r)), Ca.call(this, r);
          } : function(r, n, i) {
            var a = !!i;
            return !n && (r = this._normalizeData(r)), i = tu(r, t.parsedVisual, i), a ? i : cr(i, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(t) {
            return cr(tu(t, this.option.parsedVisual), "rgba");
          },
          category: Ca,
          piecewise: function(t, r) {
            var n = yc.call(this, r);
            return n == null && (n = cr(tu(t, this.option.parsedVisual), "rgba")), n;
          },
          fixed: wn
        }
      },
      colorHue: ns(function(t, r) {
        return eu(t, r);
      }),
      colorSaturation: ns(function(t, r) {
        return eu(t, null, r);
      }),
      colorLightness: ns(function(t, r) {
        return eu(t, null, null, r);
      }),
      colorAlpha: ns(function(t, r) {
        return Aw(t, r);
      }),
      decal: {
        applyVisual: da("decal"),
        _normalizedToVisual: {
          linear: null,
          category: Ca,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: da("opacity"),
        _normalizedToVisual: gc([0, 1])
      },
      liftZ: {
        applyVisual: da("liftZ"),
        _normalizedToVisual: {
          linear: wn,
          category: wn,
          piecewise: wn,
          fixed: wn
        }
      },
      symbol: {
        applyVisual: function(t, r, n) {
          var i = this.mapValueToVisual(t);
          n("symbol", i);
        },
        _normalizedToVisual: {
          linear: vg,
          category: Ca,
          piecewise: function(t, r) {
            var n = yc.call(this, r);
            return n == null && (n = vg.call(this, t)), n;
          },
          fixed: wn
        }
      },
      symbolSize: {
        applyVisual: da("symbolSize"),
        _normalizedToVisual: gc([0, 1])
      }
    }, e;
  }()
);
function RI(e) {
  var t = e.pieceList;
  e.hasSpecialVisual = !1, C(t, function(r, n) {
    r.originIndex = n, r.visual != null && (e.hasSpecialVisual = !0);
  });
}
function OI(e) {
  var t = e.categories, r = e.categoryMap = {}, n = e.visual;
  if (oo(t, function(o, s) {
    r[o] = s;
  }), !z(n)) {
    var i = [];
    V(n) ? oo(n, function(o, s) {
      var l = r[s];
      i[l ?? rl] = o;
    }) : i[rl] = n, n = R0(e, i);
  }
  for (var a = t.length - 1; a >= 0; a--)
    n[a] == null && (delete r[t[a]], t.pop());
}
function ah(e, t) {
  var r = e.visual, n = [];
  V(r) ? oo(r, function(a) {
    n.push(a);
  }) : r != null && n.push(r);
  var i = {
    color: 1,
    symbol: 1
  };
  !t && n.length === 1 && !i.hasOwnProperty(e.type) && (n[1] = n[0]), R0(e, n);
}
function ns(e) {
  return {
    applyVisual: function(t, r, n) {
      var i = this.mapValueToVisual(t);
      n("color", e(r("color"), i));
    },
    _normalizedToVisual: gc([0, 1])
  };
}
function vg(e) {
  var t = this.option.visual;
  return t[Math.round(vr(e, [0, 1], [0, t.length - 1], !0))] || {};
}
function da(e) {
  return function(t, r, n) {
    n(e, this.mapValueToVisual(t));
  };
}
function Ca(e) {
  var t = this.option.visual;
  return t[this.option.loop && e !== rl ? e % t.length : e];
}
function wn() {
  return this.option.visual[0];
}
function gc(e) {
  return {
    linear: function(t) {
      return vr(t, e, this.option.visual, !0);
    },
    category: Ca,
    piecewise: function(t, r) {
      var n = yc.call(this, r);
      return n == null && (n = vr(t, e, this.option.visual, !0)), n;
    },
    fixed: wn
  };
}
function yc(e) {
  var t = this.option, r = t.pieceList;
  if (t.hasSpecialVisual) {
    var n = Vt.findPieceIndex(e, r), i = r[n];
    if (i && i.visual)
      return i.visual[this.type];
  }
}
function R0(e, t) {
  return e.visual = t, e.type === "color" && (e.parsedVisual = U(t, function(r) {
    var n = we(r);
    return n || [0, 0, 0, 1];
  })), t;
}
var EI = {
  linear: function(e) {
    return vr(e, this.option.dataExtent, [0, 1], !0);
  },
  piecewise: function(e) {
    var t = this.option.pieceList, r = Vt.findPieceIndex(e, t, !0);
    if (r != null)
      return vr(r, [0, t.length - 1], [0, 1], !0);
  },
  category: function(e) {
    var t = this.option.categories ? this.option.categoryMap[e] : e;
    return t ?? rl;
  },
  fixed: Yt
};
function is(e, t, r) {
  return e ? t <= r : t < r;
}
function kI(e, t, r, n, i, a) {
  e = e || 0;
  var o = r[1] - r[0];
  if (i != null && (i = ai(i, [0, o])), a != null && (a = Math.max(a, i ?? 0)), n === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = ai(s, [0, o]), i = a = ai(s, [i, a]), n = 0;
  }
  t[0] = ai(t[0], r), t[1] = ai(t[1], r);
  var l = oh(t, n);
  t[n] += e;
  var u = i || 0, h = r.slice();
  l.sign < 0 ? h[0] += u : h[1] -= u, t[n] = ai(t[n], h);
  var c;
  return c = oh(t, n), i != null && (c.sign !== l.sign || c.span < i) && (t[1 - n] = t[n] + l.sign * i), c = oh(t, n), a != null && c.span > a && (t[1 - n] = t[n] + c.sign * a), t;
}
function oh(e, t) {
  var r = e[t] - e[1 - t];
  return {
    span: Math.abs(r),
    sign: r > 0 ? -1 : r < 0 ? 1 : t ? -1 : 1
  };
}
function ai(e, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, e));
}
var NI = 256, BI = (
  /** @class */
  function() {
    function e() {
      this.blurSize = 30, this.pointSize = 20, this.maxOpacity = 1, this.minOpacity = 0, this._gradientPixels = {
        inRange: null,
        outOfRange: null
      };
      var t = Gr.createCanvas();
      this.canvas = t;
    }
    return e.prototype.update = function(t, r, n, i, a, o) {
      var s = this._getBrush(), l = this._getGradient(a, "inRange"), u = this._getGradient(a, "outOfRange"), h = this.pointSize + this.blurSize, c = this.canvas, f = c.getContext("2d"), v = t.length;
      c.width = r, c.height = n;
      for (var d = 0; d < v; ++d) {
        var g = t[d], p = g[0], y = g[1], m = g[2], _ = i(m);
        f.globalAlpha = _, f.drawImage(s, p - h, y - h);
      }
      if (!c.width || !c.height)
        return c;
      for (var b = f.getImageData(0, 0, c.width, c.height), S = b.data, w = 0, x = S.length, M = this.minOpacity, D = this.maxOpacity, A = D - M; w < x; ) {
        var _ = S[w + 3] / 256, T = Math.floor(_ * (NI - 1)) * 4;
        if (_ > 0) {
          var L = o(_) ? l : u;
          _ > 0 && (_ = _ * A + M), S[w++] = L[T], S[w++] = L[T + 1], S[w++] = L[T + 2], S[w++] = L[T + 3] * _ * 256;
        } else
          w += 4;
      }
      return f.putImageData(b, 0, 0), c;
    }, e.prototype._getBrush = function() {
      var t = this._brushCanvas || (this._brushCanvas = Gr.createCanvas()), r = this.pointSize + this.blurSize, n = r * 2;
      t.width = n, t.height = n;
      var i = t.getContext("2d");
      return i.clearRect(0, 0, n, n), i.shadowOffsetX = n, i.shadowBlur = this.blurSize, i.shadowColor = "#000", i.beginPath(), i.arc(-r, r, this.pointSize, 0, Math.PI * 2, !0), i.closePath(), i.fill(), t;
    }, e.prototype._getGradient = function(t, r) {
      for (var n = this._gradientPixels, i = n[r] || (n[r] = new Uint8ClampedArray(256 * 4)), a = [0, 0, 0, 0], o = 0, s = 0; s < 256; s++)
        t[r](s / 255, !0, a), i[o++] = a[0], i[o++] = a[1], i[o++] = a[2], i[o++] = a[3];
      return i;
    }, e;
  }()
);
function zI(e, t, r) {
  var n = e[1] - e[0];
  t = U(t, function(o) {
    return {
      interval: [(o.interval[0] - e[0]) / n, (o.interval[1] - e[0]) / n]
    };
  });
  var i = t.length, a = 0;
  return function(o) {
    var s;
    for (s = a; s < i; s++) {
      var l = t[s].interval;
      if (l[0] <= o && o <= l[1]) {
        a = s;
        break;
      }
    }
    if (s === i)
      for (s = a - 1; s >= 0; s--) {
        var l = t[s].interval;
        if (l[0] <= o && o <= l[1]) {
          a = s;
          break;
        }
      }
    return s >= 0 && s < i && r[s];
  };
}
function FI(e, t) {
  var r = e[1] - e[0];
  return t = [(t[0] - e[0]) / r, (t[1] - e[0]) / r], function(n) {
    return n >= t[0] && n <= t[1];
  };
}
function dg(e) {
  var t = e.dimensions;
  return t[0] === "lng" && t[1] === "lat";
}
var HI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, n, i) {
      var a;
      n.eachComponent("visualMap", function(s) {
        s.eachTargetSeries(function(l) {
          l === r && (a = s);
        });
      }), this._progressiveEls = null, this.group.removeAll();
      var o = r.coordinateSystem;
      o.type === "cartesian2d" || o.type === "calendar" ? this._renderOnCartesianAndCalendar(r, i, 0, r.getData().count()) : dg(o) && this._renderOnGeo(o, r, a, i);
    }, t.prototype.incrementalPrepareRender = function(r, n, i) {
      this.group.removeAll();
    }, t.prototype.incrementalRender = function(r, n, i, a) {
      var o = n.coordinateSystem;
      o && (dg(o) ? this.render(n, i, a) : (this._progressiveEls = [], this._renderOnCartesianAndCalendar(n, a, r.start, r.end, !0)));
    }, t.prototype.eachRendered = function(r) {
      go(this._progressiveEls || this.group, r);
    }, t.prototype._renderOnCartesianAndCalendar = function(r, n, i, a, o) {
      var s = r.coordinateSystem, l = zl(s, "cartesian2d"), u, h, c, f;
      if (l) {
        var v = s.getAxis("x"), d = s.getAxis("y");
        u = v.getBandWidth() + 0.5, h = d.getBandWidth() + 0.5, c = v.scale.getExtent(), f = d.scale.getExtent();
      }
      for (var g = this.group, p = r.getData(), y = r.getModel(["emphasis", "itemStyle"]).getItemStyle(), m = r.getModel(["blur", "itemStyle"]).getItemStyle(), _ = r.getModel(["select", "itemStyle"]).getItemStyle(), b = r.get(["itemStyle", "borderRadius"]), S = Li(r), w = r.getModel("emphasis"), x = w.get("focus"), M = w.get("blurScope"), D = w.get("disabled"), A = l ? [p.mapDimension("x"), p.mapDimension("y"), p.mapDimension("value")] : [p.mapDimension("time"), p.mapDimension("value")], T = i; T < a; T++) {
        var L = void 0, $ = p.getItemVisual(T, "style");
        if (l) {
          var P = p.get(A[0], T), R = p.get(A[1], T);
          if (isNaN(p.get(A[2], T)) || isNaN(P) || isNaN(R) || P < c[0] || P > c[1] || R < f[0] || R > f[1])
            continue;
          var O = s.dataToPoint([P, R]);
          L = new St({
            shape: {
              x: O[0] - u / 2,
              y: O[1] - h / 2,
              width: u,
              height: h
            },
            style: $
          });
        } else {
          if (isNaN(p.get(A[1], T)))
            continue;
          L = new St({
            z2: 1,
            shape: s.dataToRect([p.get(A[0], T)]).contentShape,
            style: $
          });
        }
        if (p.hasItemOption) {
          var G = p.getItemModel(T), k = G.getModel("emphasis");
          y = k.getModel("itemStyle").getItemStyle(), m = G.getModel(["blur", "itemStyle"]).getItemStyle(), _ = G.getModel(["select", "itemStyle"]).getItemStyle(), b = G.get(["itemStyle", "borderRadius"]), x = k.get("focus"), M = k.get("blurScope"), D = k.get("disabled"), S = Li(G);
        }
        L.shape.r = b;
        var F = r.getRawValue(T), W = "-";
        F && F[2] != null && (W = F[2] + ""), yo(L, S, {
          labelFetcher: r,
          labelDataIndex: T,
          defaultOpacity: $.opacity,
          defaultText: W
        }), L.ensureState("emphasis").style = y, L.ensureState("blur").style = m, L.ensureState("select").style = _, Ka(L, x, M, D), L.incremental = o, o && (L.states.emphasis.hoverLayer = !0), g.add(L), p.setItemGraphicEl(T, L), this._progressiveEls && this._progressiveEls.push(L);
      }
    }, t.prototype._renderOnGeo = function(r, n, i, a) {
      var o = i.targetVisuals.inRange, s = i.targetVisuals.outOfRange, l = n.getData(), u = this._hmLayer || this._hmLayer || new BI();
      u.blurSize = n.get("blurSize"), u.pointSize = n.get("pointSize"), u.minOpacity = n.get("minOpacity"), u.maxOpacity = n.get("maxOpacity");
      var h = r.getViewRect().clone(), c = r.getRoamTransform();
      h.applyTransform(c);
      var f = Math.max(h.x, 0), v = Math.max(h.y, 0), d = Math.min(h.width + h.x, a.getWidth()), g = Math.min(h.height + h.y, a.getHeight()), p = d - f, y = g - v, m = [l.mapDimension("lng"), l.mapDimension("lat"), l.mapDimension("value")], _ = l.mapArray(m, function(x, M, D) {
        var A = r.dataToPoint([x, M]);
        return A[0] -= f, A[1] -= v, A.push(D), A;
      }), b = i.getExtent(), S = i.type === "visualMap.continuous" ? FI(b, i.option.range) : zI(b, i.getPieceList(), i.option.selected);
      u.update(_, p, y, o.color.getNormalizer(), {
        inRange: o.color.getColorMapper(),
        outOfRange: s.color.getColorMapper()
      }, S);
      var w = new er({
        style: {
          width: p,
          height: y,
          x: f,
          y: v,
          image: u.canvas
        },
        silent: !0
      });
      this.group.add(w);
    }, t.type = "heatmap", t;
  }(Se)
), VI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, n) {
      return El(null, this, {
        generateCoord: "value"
      });
    }, t.prototype.preventIncremental = function() {
      var r = $l.get(this.get("coordinateSystem"));
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
  }(Oe)
);
function GI(e) {
  e.registerChartView(HI), e.registerSeriesModel(VI);
}
var Sn = $t(), pg = q, sh = J, WI = (
  /** @class */
  function() {
    function e() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return e.prototype.render = function(t, r, n, i) {
      var a = r.get("value"), o = r.get("status");
      if (this._axisModel = t, this._axisPointerModel = r, this._api = n, !(!i && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, r, n);
        var h = u.graphicKey;
        h !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = h;
        var c = this._moveAnimation = this.determineAnimation(t, r);
        if (!s)
          s = this._group = new Mt(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), n.getZr().add(s);
        else {
          var f = It(gg, r, c);
          this.updatePointerEl(s, u, f), this.updateLabelEl(s, u, f, r);
        }
        mg(s, r, !0), this._renderHandle(a);
      }
    }, e.prototype.remove = function(t) {
      this.clear(t);
    }, e.prototype.dispose = function(t) {
      this.clear(t);
    }, e.prototype.determineAnimation = function(t, r) {
      var n = r.get("animation"), i = t.axis, a = i.type === "category", o = r.get("snap");
      if (!o && !a)
        return !1;
      if (n === "auto" || n == null) {
        var s = this.animationThreshold;
        if (a && i.getBandWidth() > s)
          return !0;
        if (o) {
          var l = Ef(t).seriesDataCount, u = i.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return n === !0;
    }, e.prototype.makeElOption = function(t, r, n, i, a) {
    }, e.prototype.createPointerEl = function(t, r, n, i) {
      var a = r.pointer;
      if (a) {
        var o = Sn(t).pointerEl = new RT[a.type](pg(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, n, i) {
      if (r.label) {
        var a = Sn(t).labelEl = new Lt(pg(r.label));
        t.add(a), yg(a, i);
      }
    }, e.prototype.updatePointerEl = function(t, r, n) {
      var i = Sn(t).pointerEl;
      i && r.pointer && (i.setStyle(r.pointer.style), n(i, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, n, i) {
      var a = Sn(t).labelEl;
      a && (a.setStyle(r.label.style), n(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), yg(a, i));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, n = this._api.getZr(), i = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          i && n.remove(i), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, i = this._handle = lf(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Ua(u.event);
          },
          onmousedown: sh(this._onHandleDragMove, this, 0, 0),
          drift: sh(this._onHandleDragMove, this),
          ondragend: sh(this._onHandleDragEnd, this)
        }), n.add(i)), mg(i, r, !1), i.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        z(l) || (l = [l, l]), i.scaleX = l[0] / 2, i.scaleY = l[1] / 2, p_(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      gg(this._axisPointerModel, !r && this._moveAnimation, this._handle, lh(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var n = this._handle;
      if (n) {
        this._dragging = !0;
        var i = this.updateHandleTransform(lh(n), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = i, n.stopAnimation(), n.attr(lh(i)), Sn(n).lastProp = null, this._doDispatchAxisPointer();
      }
    }, e.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var r = this._payloadInfo, n = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: r.cursorPoint[0],
          y: r.cursorPoint[1],
          tooltipOption: r.tooltipOption,
          axesInfo: [{
            axisDim: n.axis.dim,
            axisIndex: n.componentIndex
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
      var r = t.getZr(), n = this._group, i = this._handle;
      r && n && (this._lastGraphicKey = null, n && r.remove(n), i && r.remove(i), this._group = null, this._handle = null, this._payloadInfo = null), Qh(this, "_doDispatchAxisPointer");
    }, e.prototype.doClear = function() {
    }, e.prototype.buildLabel = function(t, r, n) {
      return n = n || 0, {
        x: t[n],
        y: t[1 - n],
        width: r[n],
        height: r[1 - n]
      };
    }, e;
  }()
);
function gg(e, t, r, n) {
  O0(Sn(r).lastProp, n) || (Sn(r).lastProp = n, t ? le(r, n, e) : (r.stopAnimation(), r.attr(n)));
}
function O0(e, t) {
  if (V(e) && V(t)) {
    var r = !0;
    return C(t, function(n, i) {
      r = r && O0(e[i], n);
    }), !!r;
  } else
    return e === t;
}
function yg(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function lh(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function mg(e, t, r) {
  var n = t.get("z"), i = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (n != null && (a.z = n), i != null && (a.zlevel = i), a.silent = r);
  });
}
function UI(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), n;
  return t === "line" ? (n = r.getLineStyle(), n.fill = null) : t === "shadow" && (n = r.getAreaStyle(), n.stroke = null), n;
}
function YI(e, t, r, n, i) {
  var a = r.get("value"), o = E0(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = mo(s.get("padding") || 0), u = s.getFont(), h = Gc(o, u), c = i.position, f = h.width + l[1] + l[3], v = h.height + l[0] + l[2], d = i.align;
  d === "right" && (c[0] -= f), d === "center" && (c[0] -= f / 2);
  var g = i.verticalAlign;
  g === "bottom" && (c[1] -= v), g === "middle" && (c[1] -= v / 2), XI(c, f, v, n);
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
function XI(e, t, r, n) {
  var i = n.getWidth(), a = n.getHeight();
  e[0] = Math.min(e[0] + t, i) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function E0(e, t, r, n, i) {
  e = t.scale.parse(e);
  var a = t.scale.getLabel({
    value: e
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: i.precision
  }), o = i.formatter;
  if (o) {
    var s = {
      value: Lf(t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    C(n, function(l) {
      var u = r.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, c = u && u.getDataParams(h);
      c && s.seriesData.push(c);
    }), H(o) ? a = o.replace("{value}", a) : Z(o) && (a = o(s));
  }
  return a;
}
function k0(e, t, r) {
  var n = mi();
  return zc(n, n, r.rotation), xh(n, n, r.position), wi([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], n);
}
function qI(e, t, r, n, i, a) {
  var o = Vr.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = i.get(["label", "margin"]), YI(t, n, i, a, {
    position: k0(n.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function ZI(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function KI(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
var jI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, n, i, a, o) {
      var s = i.axis, l = s.grid, u = a.get("type"), h = _g(l, s).getOtherAxis(s).getGlobalExtent(), c = s.toGlobalCoord(s.dataToCoord(n, !0));
      if (u && u !== "none") {
        var f = UI(a), v = QI[u](s, c, h);
        v.style = f, r.graphicKey = v.type, r.pointer = v;
      }
      var d = vc(l.model, i);
      qI(
        // @ts-ignore
        n,
        r,
        d,
        i,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(r, n, i) {
      var a = vc(n.axis.grid.model, n, {
        labelInside: !1
      });
      a.labelMargin = i.get(["handle", "margin"]);
      var o = k0(n.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, n, i, a) {
      var o = i.axis, s = o.grid, l = o.getGlobalExtent(!0), u = _g(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, c = [r.x, r.y];
      c[h] += n[h], c[h] = Math.min(l[1], c[h]), c[h] = Math.max(l[0], c[h]);
      var f = (u[1] + u[0]) / 2, v = [f, f];
      v[h] = c[h];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: c[0],
        y: c[1],
        rotation: r.rotation,
        cursorPoint: v,
        tooltipOption: d[h]
      };
    }, t;
  }(WI)
);
function _g(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var QI = {
  line: function(e, t, r) {
    var n = ZI([t, r[0]], [t, r[1]], bg(e));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: n
    };
  },
  shadow: function(e, t, r) {
    var n = Math.max(1, e.getBandWidth()), i = r[1] - r[0];
    return {
      type: "Rect",
      shape: KI([t - n / 2, r[0]], [n, i], bg(e))
    };
  }
};
function bg(e) {
  return e.dim === "x" ? 0 : 1;
}
var JI = (
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
  }(ct)
), ur = $t(), tL = C;
function N0(e, t, r) {
  if (!X.node) {
    var n = t.getZr();
    ur(n).records || (ur(n).records = {}), eL(n, t);
    var i = ur(n).records[e] || (ur(n).records[e] = {});
    i.handler = r;
  }
}
function eL(e, t) {
  if (ur(e).initialized)
    return;
  ur(e).initialized = !0, r("click", It(wg, "click")), r("mousemove", It(wg, "mousemove")), r("globalout", nL);
  function r(n, i) {
    e.on(n, function(a) {
      var o = iL(t);
      tL(ur(e).records, function(s) {
        s && i(s, a, o.dispatchAction);
      }), rL(o.pendings, t);
    });
  }
}
function rL(e, t) {
  var r = e.showTip.length, n = e.hideTip.length, i;
  r ? i = e.showTip[r - 1] : n && (i = e.hideTip[n - 1]), i && (i.dispatchAction = null, t.dispatchAction(i));
}
function nL(e, t, r) {
  e.handler("leave", null, r);
}
function wg(e, t, r, n) {
  t.handler(e, r, n);
}
function iL(e) {
  var t = {
    showTip: [],
    hideTip: []
  }, r = function(n) {
    var i = t[n.type];
    i ? i.push(n) : (n.dispatchAction = r, e.dispatchAction(n));
  };
  return {
    dispatchAction: r,
    pendings: t
  };
}
function mc(e, t) {
  if (!X.node) {
    var r = t.getZr(), n = (ur(r).records || {})[e];
    n && (ur(r).records[e] = null);
  }
}
var aL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, n, i) {
      var a = n.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      N0("axisPointer", i, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, n) {
      mc("axisPointer", n);
    }, t.prototype.dispose = function(r, n) {
      mc("axisPointer", n);
    }, t.type = "axisPointer", t;
  }(Ee)
);
function B0(e, t) {
  var r = [], n = e.seriesIndex, i;
  if (n == null || !(i = t.getSeriesByIndex(n)))
    return {
      point: []
    };
  var a = i.getData(), o = En(a, e);
  if (o == null || o < 0 || z(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = i.coordinateSystem;
  if (i.getTooltipPosition)
    r = i.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), c = h.dim, f = u.dim, v = c === "x" || c === "radius" ? 1 : 0, d = a.mapDimension(f), g = [];
      g[v] = a.get(d, o), g[1 - v] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(g) || [];
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
var Sg = $t();
function oL(e, t, r) {
  var n = e.currTrigger, i = [e.x, e.y], a = e, o = e.dispatchAction || J(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    xs(i) && (i = B0({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = xs(i), u = a.axesInfo, h = s.axesInfo, c = n === "leave" || xs(i), f = {}, v = {}, d = {
      list: [],
      map: {}
    }, g = {
      showPointer: It(lL, v),
      showTooltip: It(uL, d)
    };
    C(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(i);
      C(s.coordSysAxesInfo[m], function(b, S) {
        var w = b.axis, x = vL(u, b);
        if (!c && _ && (!u || x)) {
          var M = x && x.value;
          M == null && !l && (M = w.pointToData(i)), M != null && xg(b, M, g, !1, f);
        }
      });
    });
    var p = {};
    return C(h, function(y, m) {
      var _ = y.linkGroup;
      _ && !v[m] && C(_.axesInfo, function(b, S) {
        var w = v[S];
        if (b !== y && w) {
          var x = w.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, Tg(b), Tg(y)))), p[y.key] = x;
        }
      });
    }), C(p, function(y, m) {
      xg(h[m], y, g, !0, f);
    }), hL(v, h, f), cL(d, i, e, o), fL(h, o, r), f;
  }
}
function xg(e, t, r, n, i) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = sL(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && i.seriesIndex == null && N(i, s[0]), !n && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function sL(e, t) {
  var r = t.axis, n = r.dim, i = e, a = [], o = Number.MAX_VALUE, s = -1;
  return C(t.seriesModels, function(l, u) {
    var h = l.getData().mapDimensionsAll(n), c, f;
    if (l.getAxisTooltipData) {
      var v = l.getAxisTooltipData(h, e, r);
      f = v.dataIndices, c = v.nestestValue;
    } else {
      if (f = l.getData().indicesOfNearest(
        h[0],
        e,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        r.type === "category" ? 0.5 : null
      ), !f.length)
        return;
      c = l.getData().get(h[0], f[0]);
    }
    if (!(c == null || !isFinite(c))) {
      var d = e - c, g = Math.abs(d);
      g <= o && ((g < o || d >= 0 && s < 0) && (o = g, s = d, i = c, a.length = 0), C(f, function(p) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: p,
          dataIndex: l.getData().getRawIndex(p)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: i
  };
}
function lL(e, t, r, n) {
  e[t.key] = {
    value: r,
    payloadBatch: n
  };
}
function uL(e, t, r, n) {
  var i = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !i.length)) {
    var l = t.coordSys.model, u = ao(l), h = e.map[u];
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
      value: n,
      // Caustion: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: i.slice()
    });
  }
}
function hL(e, t, r) {
  var n = r.axesInfo = [];
  C(t, function(i, a) {
    var o = i.axisPointerModel.option, s = e[a];
    s ? (!i.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !i.useHandle && (o.status = "hide"), o.status === "show" && n.push({
      axisDim: i.axis.dim,
      axisIndex: i.axis.model.componentIndex,
      value: o.value
    });
  });
}
function cL(e, t, r, n) {
  if (xs(t) || !e.list.length) {
    n({
      type: "hideTip"
    });
    return;
  }
  var i = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  n({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: i.dataIndexInside,
    dataIndex: i.dataIndex,
    seriesIndex: i.seriesIndex,
    dataByCoordSys: e.list
  });
}
function fL(e, t, r) {
  var n = r.getZr(), i = "axisPointerLastHighlights", a = Sg(n)[i] || {}, o = Sg(n)[i] = {};
  C(e, function(u, h) {
    var c = u.axisPointerModel.option;
    c.status === "show" && u.triggerEmphasis && C(c.seriesDataIndices, function(f) {
      var v = f.seriesIndex + " | " + f.dataIndex;
      o[v] = f;
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
function vL(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var n = e[r];
    if (t.axis.dim === n.axisDim && t.axis.model.componentIndex === n.axisIndex)
      return n;
  }
}
function Tg(e) {
  var t = e.axis.model, r = {}, n = r.axisDim = e.axis.dim;
  return r.axisIndex = r[n + "AxisIndex"] = t.componentIndex, r.axisName = r[n + "AxisName"] = t.name, r.axisId = r[n + "AxisId"] = t.id, r;
}
function xs(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function z0(e) {
  L0.registerAxisPointerClass("CartesianAxisPointer", jI), e.registerComponentModel(JI), e.registerComponentView(aL), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !z(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function(t, r) {
    t.getComponent("axisPointer").coordSysAxesInfo = yI(t, r);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, oL);
}
function dL(e) {
  je($I), je(z0);
}
function pL(e, t) {
  var r = mo(t.get("padding")), n = t.getItemStyle(["color", "opacity"]);
  return n.fill = t.get("backgroundColor"), e = new St({
    shape: {
      x: e.x - r[3],
      y: e.y - r[0],
      width: e.width + r[1] + r[3],
      height: e.height + r[0] + r[2],
      r: t.get("borderRadius")
    },
    style: n,
    silent: !0,
    z2: -1
  }), e;
}
var gL = (
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
  }(ct)
);
function F0(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function H0(e) {
  if (X.domSupported) {
    for (var t = document.documentElement.style, r = 0, n = e.length; r < n; r++)
      if (e[r] in t)
        return e[r];
  }
}
var V0 = H0(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), yL = H0(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function G0(e, t) {
  if (!e)
    return t;
  t = Hm(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function mL(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var _L = G0(yL, "transition"), kf = G0(V0, "transform"), bL = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (X.transform3dSupported ? "will-change:transform;" : "");
function wL(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function SL(e, t, r) {
  if (!H(r) || r === "inside")
    return "";
  var n = e.get("backgroundColor"), i = e.get("borderWidth");
  t = Nn(t);
  var a = wL(r), o = Math.max(Math.round(i) * 1.5, 6), s = "", l = kf + ":", u;
  pt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, c = o + i, f = c * Math.abs(Math.cos(h)) + c * Math.abs(Math.sin(h)), v = Math.round(((f - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (f - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + v + "px";
  var d = t + " solid " + i + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + n + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function xL(e, t) {
  var r = "cubic-bezier(0.23,1,0.32,1)", n = " " + e / 2 + "s " + r, i = "opacity" + n + ",visibility" + n;
  return t || (n = " " + e + "s " + r, i += X.transformSupported ? "," + kf + n : ",left" + n + ",top" + n), _L + ":" + i;
}
function Cg(e, t, r) {
  var n = e.toFixed(0) + "px", i = t.toFixed(0) + "px";
  if (!X.transformSupported)
    return r ? "top:" + i + ";left:" + n + ";" : [["top", i], ["left", n]];
  var a = X.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + n + "," + i + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + kf + ":" + o + ";" : [["top", 0], ["left", 0], [V0, o]];
}
function TL(e) {
  var t = [], r = e.get("fontSize"), n = e.getTextColor();
  n && t.push("color:" + n), t.push("font:" + e.getFont());
  var i = tt(e.get("lineHeight"), Math.round(r * 3 / 2));
  r && t.push("line-height:" + i + "px");
  var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, l = e.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), C(["decoration", "align"], function(u) {
    var h = e.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function CL(e, t, r) {
  var n = [], i = e.get("transitionDuration"), a = e.get("backgroundColor"), o = e.get("shadowBlur"), s = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), h = e.getModel("textStyle"), c = v_(e, "html"), f = l + "px " + u + "px " + o + "px " + s;
  return n.push("box-shadow:" + f), t && i && n.push(xL(i, r)), a && n.push("background-color:" + a), C(["width", "color", "radius"], function(v) {
    var d = "border-" + v, g = Hm(d), p = e.get(g);
    p != null && n.push(d + ":" + p + (v === "color" ? "" : "px"));
  }), n.push(TL(h)), c != null && n.push("padding:" + mo(c).join("px ") + "px"), n.join(";") + ";";
}
function Mg(e, t, r, n, i) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && q1(e, o, r, n, i);
  } else {
    e[0] = n, e[1] = i;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var ML = (
  /** @class */
  function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, X.wxa)
        return null;
      var n = document.createElement("div");
      n.domBelongToZr = !0, this.el = n;
      var i = this._zr = t.getZr(), a = r.appendTo, o = a && (H(a) ? document.querySelector(a) : Wa(a) ? a : Z(a) && a(t.getDom()));
      Mg(this._styleCoord, i, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(n), this._api = t, this._container = o;
      var s = this;
      n.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, n.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = i.handler, h = i.painter.getViewportRoot();
          ve(h, l, !0), u.dispatch("mousemove", l);
        }
      }, n.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return e.prototype.update = function(t) {
      if (!this._container) {
        var r = this._api.getDom(), n = mL(r, "position"), i = r.style;
        i.position !== "absolute" && n !== "absolute" && (i.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var n = this.el, i = n.style, a = this._styleCoord;
      n.innerHTML ? i.cssText = bL + CL(t, !this._firstShow, this._longHide) + Cg(a[0], a[1], !0) + ("border-color:" + Nn(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : i.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, n, i, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (H(a) && n.get("trigger") === "item" && !F0(n) && (s = SL(n, i, a)), H(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", z(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Wa(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        var n = this._styleCoord;
        if (Mg(n, this._zr, this._container, t, r), n[0] != null && n[1] != null) {
          var i = this.el.style, a = Cg(n[0], n[1]);
          C(a, function(o) {
            i[o[0]] = o[1];
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
), DL = (
  /** @class */
  function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), Ag(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return e.prototype.update = function(t) {
      var r = t.get("alwaysShowContent");
      r && this._moveIfResized(), this._alwaysShowContent = r;
    }, e.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function(t, r, n, i, a) {
      var o = this;
      V(t) && Jt(""), this.el && this._zr.remove(this.el);
      var s = n.getModel("textStyle");
      this.el = new Lt({
        style: {
          rich: r.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: i,
          textShadowColor: s.get("textShadowColor"),
          fill: n.get(["textStyle", "color"]),
          padding: v_(n, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: n.get("z")
      }), C(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = n.get(u);
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
      var t = this.el, r = this.el.getBoundingRect(), n = Dg(t.style);
      return [r.width + n.left + n.right, r.height + n.top + n.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var n = this.el;
      if (n) {
        var i = this._styleCoord;
        Ag(i, this._zr, t, r), t = i[0], r = i[1];
        var a = n.style, o = Er(a.borderWidth || 0), s = Dg(a);
        n.x = t + o + s.left, n.y = r + o + s.top, n.markRedraw();
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
function Er(e) {
  return Math.max(0, e);
}
function Dg(e) {
  var t = Er(e.shadowBlur || 0), r = Er(e.shadowOffsetX || 0), n = Er(e.shadowOffsetY || 0);
  return {
    left: Er(t - r),
    right: Er(t + r),
    top: Er(t - n),
    bottom: Er(t + n)
  };
}
function Ag(e, t, r, n) {
  e[0] = r, e[1] = n, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var AL = new St({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), IL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, n) {
      if (!(X.node || !n.getDom())) {
        var i = r.getComponent("tooltip"), a = this._renderMode = xS(i.get("renderMode"));
        this._tooltipContent = a === "richText" ? new DL(n) : new ML(n, {
          appendTo: i.get("appendToBody", !0) ? "body" : i.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, n, i) {
      if (!(X.node || !i.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = n, this._api = i;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? p_(this, "_updatePosition", 50, "fixRate") : Qh(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, n = r.get("triggerOn");
      N0("itemTooltip", this._api, J(function(i, a, o) {
        n !== "none" && (n.indexOf(i) >= 0 ? this._tryShow(a, o) : i === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var r = this._tooltipModel, n = this._ecModel, i = this._api, a = r.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !i.isDisposed() && o.manuallyShowTip(r, n, i, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(r, n, i, a) {
      if (!(a.from === this.uid || X.node || !i.getDom())) {
        var o = Ig(a, i);
        this._ticket = "";
        var s = a.dataByCoordSys, l = RL(a, n, i);
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
          var h = AL;
          h.x = a.x, h.y = a.y, h.update(), st(h).tooltipConfig = {
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
          if (this._manuallyAxisShowTip(r, n, i, a))
            return;
          var c = B0(a, n), f = c.point[0], v = c.point[1];
          f != null && v != null && this._tryShow({
            offsetX: f,
            offsetY: v,
            target: c.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (i.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: i.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, t.prototype.manuallyHideTip = function(r, n, i, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Ig(a, i));
    }, t.prototype._manuallyAxisShowTip = function(r, n, i, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = n.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = n.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), c = pa([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (c.get("trigger") === "axis")
            return i.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, t.prototype._tryShow = function(r, n) {
      var i = r.target, a = this._tooltipModel;
      if (a) {
        this._lastX = r.offsetX, this._lastY = r.offsetY;
        var o = r.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, r);
        else if (i) {
          var s = st(i);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          gi(i, function(h) {
            if (st(h).dataIndex != null)
              return l = h, !0;
            if (st(h).tooltipConfig != null)
              return u = h, !0;
          }, !0), l ? this._showSeriesItemTooltip(r, l, n) : u ? this._showComponentItemTooltip(r, u, n) : this._hide(n);
        } else
          this._lastDataByCoordSys = null, this._hide(n);
      }
    }, t.prototype._showOrMove = function(r, n) {
      var i = r.get("showDelay");
      n = J(n, this), clearTimeout(this._showTimout), i > 0 ? this._showTimout = setTimeout(n, i) : n();
    }, t.prototype._showAxisTooltip = function(r, n) {
      var i = this._ecModel, a = this._tooltipModel, o = [n.offsetX, n.offsetY], s = pa([n.tooltipOption], a), l = this._renderMode, u = [], h = eo("section", {
        blocks: [],
        noHeader: !0
      }), c = [], f = new zu();
      C(r, function(m) {
        C(m.dataByAxis, function(_) {
          var b = i.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!b || S == null)) {
            var w = E0(S, b.axis, i, _.seriesDataIndices, _.valueLabelOpt), x = eo("section", {
              header: w,
              noHeader: !Ue(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), C(_.seriesDataIndices, function(M) {
              var D = i.getSeriesByIndex(M.seriesIndex), A = M.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = Lf(b.axis, {
                  value: S
                }), T.axisValueLabel = w, T.marker = f.makeTooltipMarker("item", Nn(T.color), l);
                var L = Gd(D.formatTooltip(A, !0, null)), $ = L.frag;
                if ($) {
                  var P = pa([D], a).get("valueFormatter");
                  x.blocks.push(P ? N({
                    valueFormatter: P
                  }, $) : $);
                }
                L.text && c.push(L.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), c.reverse();
      var v = n.position, d = s.get("order"), g = qd(h, f, l, d, i.get("useUTC"), s.get("textStyle"));
      g && c.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", y = c.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, v, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], v, null, f);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, n, i) {
      var a = this._ecModel, o = st(n), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, c = o.dataType, f = u.getData(c), v = this._renderMode, d = r.positionDefault, g = pa([f.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var y = u.getDataParams(h, c), m = new zu();
        y.marker = m.makeTooltipMarker("item", Nn(y.color), v);
        var _ = Gd(u.formatTooltip(h, !1, c)), b = g.get("order"), S = g.get("valueFormatter"), w = _.frag, x = w ? qd(S ? N({
          valueFormatter: S
        }, w) : w, m, v, b, a.get("useUTC"), g.get("textStyle")) : _.text, M = "item_" + u.name + "_" + h;
        this._showOrMove(g, function() {
          this._showTooltipContent(g, x, y, M, r.offsetX, r.offsetY, r.position, r.target, m);
        }), i({
          type: "showTip",
          dataIndexInside: h,
          dataIndex: f.getRawIndex(h),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(r, n, i) {
      var a = this._renderMode === "html", o = st(n), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (H(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = q(l), l.content = jt(l.content));
      var c = [l], f = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      f && c.push(f), c.push({
        formatter: l.content
      });
      var v = r.positionDefault, d = pa(c, this._tooltipModel, v ? {
        position: v
      } : null), g = d.get("content"), p = Math.random() + "", y = new zu();
      this._showOrMove(d, function() {
        var m = q(d.get("formatterParams") || {});
        this._showTooltipContent(d, g, m, p, r.offsetX, r.offsetY, r.position, n, y);
      }), i({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(r, n, i, a, o, s, l, u, h) {
      if (this._ticket = "", !(!r.get("showContent") || !r.get("show"))) {
        var c = this._tooltipContent;
        c.setEnterable(r.get("enterable"));
        var f = r.get("formatter");
        l = l || r.get("position");
        var v = n, d = this._getNearestPoint([o, s], i, r.get("trigger"), r.get("borderColor")), g = d.color;
        if (f)
          if (H(f)) {
            var p = r.ecModel.get("useUTC"), y = z(i) ? i[0] : i, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            v = f, m && (v = Cl(y.axisValue, v, p)), v = Vm(v, i, !0);
          } else if (Z(f)) {
            var _ = J(function(b, S) {
              b === this._ticket && (c.setContent(S, h, r, g, l), this._updatePosition(r, l, o, s, c, i, u));
            }, this);
            this._ticket = a, v = f(i, a, _);
          } else
            v = f;
        c.setContent(v, h, r, g, l), c.show(r, g), this._updatePosition(r, l, o, s, c, i, u);
      }
    }, t.prototype._getNearestPoint = function(r, n, i, a) {
      if (i === "axis" || z(n))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!z(n))
        return {
          color: a || n.color || n.borderColor
        };
    }, t.prototype._updatePosition = function(r, n, i, a, o, s, l) {
      var u = this._api.getWidth(), h = this._api.getHeight();
      n = n || r.get("position");
      var c = o.getSize(), f = r.get("align"), v = r.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), Z(n) && (n = n([i, a], s, o.el, d, {
        viewSize: [u, h],
        contentSize: c.slice()
      })), z(n))
        i = Ut(n[0], u), a = Ut(n[1], h);
      else if (V(n)) {
        var g = n;
        g.width = c[0], g.height = c[1];
        var p = $i(g, {
          width: u,
          height: h
        });
        i = p.x, a = p.y, f = null, v = null;
      } else if (H(n) && l) {
        var y = PL(n, d, c, r.get("borderWidth"));
        i = y[0], a = y[1];
      } else {
        var y = LL(i, a, o, u, h, f ? null : 20, v ? null : 20);
        i = y[0], a = y[1];
      }
      if (f && (i -= Lg(f) ? c[0] / 2 : f === "right" ? c[0] : 0), v && (a -= Lg(v) ? c[1] / 2 : v === "bottom" ? c[1] : 0), F0(r)) {
        var y = $L(i, a, o, u, h);
        i = y[0], a = y[1];
      }
      o.moveTo(i, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, n) {
      var i = this._lastDataByCoordSys, a = this._cbParamsList, o = !!i && i.length === r.length;
      return o && C(i, function(s, l) {
        var u = s.dataByAxis || [], h = r[l] || {}, c = h.dataByAxis || [];
        o = o && u.length === c.length, o && C(u, function(f, v) {
          var d = c[v] || {}, g = f.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && f.value === d.value && f.axisType === d.axisType && f.axisId === d.axisId && g.length === p.length, o && C(g, function(y, m) {
            var _ = p[m];
            o = o && y.seriesIndex === _.seriesIndex && y.dataIndex === _.dataIndex;
          }), a && C(f.seriesDataIndices, function(y) {
            var m = y.seriesIndex, _ = n[m], b = a[m];
            _ && b && b.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = r, this._cbParamsList = n, !!o;
    }, t.prototype._hide = function(r) {
      this._lastDataByCoordSys = null, r({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(r, n) {
      X.node || !n.getDom() || (Qh(this, "_updatePosition"), this._tooltipContent.dispose(), mc("itemTooltip", n));
    }, t.type = "tooltip", t;
  }(Ee)
);
function pa(e, t, r) {
  var n = t.ecModel, i;
  r ? (i = new Tt(r, n, n), i = new Tt(t.option, i, n)) : i = t;
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o && (o instanceof Tt && (o = o.get("tooltip", !0)), H(o) && (o = {
      formatter: o
    }), o && (i = new Tt(o, i, n)));
  }
  return i;
}
function Ig(e, t) {
  return e.dispatchAction || J(t.dispatchAction, t);
}
function LL(e, t, r, n, i, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > n ? e -= l + a : e += a), o != null && (t + u + o > i ? t -= u + o : t += o), [e, t];
}
function $L(e, t, r, n, i) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, n) - o, t = Math.min(t + s, i) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function PL(e, t, r, n) {
  var i = r[0], a = r[1], o = Math.ceil(Math.SQRT2 * n) + 8, s = 0, l = 0, u = t.width, h = t.height;
  switch (e) {
    case "inside":
      s = t.x + u / 2 - i / 2, l = t.y + h / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - i / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - i / 2, l = t.y + h + o;
      break;
    case "left":
      s = t.x - i - o, l = t.y + h / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + h / 2 - a / 2;
  }
  return [s, l];
}
function Lg(e) {
  return e === "center" || e === "middle";
}
function RL(e, t, r) {
  var n = Xc(e).queryOptionMap, i = n.keys()[0];
  if (!(!i || i === "series")) {
    var a = vo(t, i, n.get(i), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var h = st(u).tooltipConfig;
        if (h && h.name === e.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: i,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function OL(e) {
  je(z0), e.registerComponentModel(gL), e.registerComponentView(IL), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Yt), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Yt);
}
var $g = C;
function Pg(e) {
  if (e) {
    for (var t in e)
      if (e.hasOwnProperty(t))
        return !0;
  }
}
function Rg(e, t, r) {
  var n = {};
  return $g(t, function(a) {
    var o = n[a] = i();
    $g(e[a], function(s, l) {
      if (Vt.isValidType(l)) {
        var u = {
          type: l,
          visual: s
        };
        r && r(u, a), o[l] = new Vt(u), l === "opacity" && (u = q(u), u.type = "colorAlpha", o.__hidden.__alphaForOpacity = new Vt(u));
      }
    });
  }), n;
  function i() {
    var a = function() {
    };
    a.prototype.__hidden = a.prototype;
    var o = new a();
    return o;
  }
}
function EL(e, t, r) {
  var n;
  C(r, function(i) {
    t.hasOwnProperty(i) && Pg(t[i]) && (n = !0);
  }), n && C(r, function(i) {
    t.hasOwnProperty(i) && Pg(t[i]) ? e[i] = q(t[i]) : delete e[i];
  });
}
function kL(e, t, r, n) {
  var i = {};
  return C(e, function(a) {
    var o = Vt.prepareVisualTypes(t[a]);
    i[a] = o;
  }), {
    progress: function(o, s) {
      var l;
      n != null && (l = s.getDimensionIndex(n));
      function u(S) {
        return x_(s, c, S);
      }
      function h(S, w) {
        XM(s, c, S, w);
      }
      for (var c, f = s.getStore(); (c = o.next()) != null; ) {
        var v = s.getRawDataItem(c);
        if (!(v && v.visualMap === !1))
          for (var d = n != null ? f.get(l, c) : c, g = r(d), p = t[g], y = i[g], m = 0, _ = y.length; m < _; m++) {
            var b = y[m];
            p[b] && p[b].applyVisual(d, u, h);
          }
      }
    }
  };
}
var NL = function(e, t) {
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
}, _c = (
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
    return t.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i), r.selected = r.selected || {}, this._updateSelector(r);
    }, t.prototype.mergeOption = function(r, n) {
      e.prototype.mergeOption.call(this, r, n), this._updateSelector(r);
    }, t.prototype._updateSelector = function(r) {
      var n = r.selector, i = this.ecModel;
      n === !0 && (n = r.selector = ["all", "inverse"]), z(n) && C(n, function(a, o) {
        H(a) && (a = {
          type: a
        }), n[o] = ot(a, NL(i, a.type));
      });
    }, t.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var r = this._data;
      if (r[0] && this.get("selectedMode") === "single") {
        for (var n = !1, i = 0; i < r.length; i++) {
          var a = r[i].get("name");
          if (this.isSelected(a)) {
            this.select(a), n = !0;
            break;
          }
        }
        !n && this.select(r[0].get("name"));
      }
    }, t.prototype._updateData = function(r) {
      var n = [], i = [];
      r.eachRawSeries(function(l) {
        var u = l.name;
        i.push(u);
        var h;
        if (l.legendVisualProvider) {
          var c = l.legendVisualProvider, f = c.getAllNames();
          r.isSeriesFiltered(l) || (i = i.concat(f)), f.length ? n = n.concat(f) : h = !0;
        } else
          h = !0;
        h && Yc(l) && n.push(l.name);
      }), this._availableNames = i;
      var a = this.get("data") || n, o = Q(), s = U(a, function(l) {
        return (H(l) || _t(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new Tt(l, this, this.ecModel));
      }, this);
      this._data = Ot(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(r) {
      var n = this.option.selected, i = this.get("selectedMode");
      if (i === "single") {
        var a = this._data;
        C(a, function(o) {
          n[o.get("name")] = !1;
        });
      }
      n[r] = !0;
    }, t.prototype.unSelect = function(r) {
      this.get("selectedMode") !== "single" && (this.option.selected[r] = !1);
    }, t.prototype.toggleSelected = function(r) {
      var n = this.option.selected;
      n.hasOwnProperty(r) || (n[r] = !0), this[n[r] ? "unSelect" : "select"](r);
    }, t.prototype.allSelect = function() {
      var r = this._data, n = this.option.selected;
      C(r, function(i) {
        n[i.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var r = this._data, n = this.option.selected;
      C(r, function(i) {
        var a = i.get("name", !0);
        n.hasOwnProperty(a) || (n[a] = !0), n[a] = !n[a];
      });
    }, t.prototype.isSelected = function(r) {
      var n = this.option.selected;
      return !(n.hasOwnProperty(r) && !n[r]) && pt(this._availableNames, r) >= 0;
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
  }(ct)
), oi = It, bc = C, as = Mt, W0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !1, r;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new as()), this.group.add(this._selectorGroup = new as()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, t.prototype.render = function(r, n, i) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!r.get("show", !0)) {
        var o = r.get("align"), s = r.get("orient");
        (!o || o === "auto") && (o = r.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = r.get("selector", !0), u = r.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, r, n, i, l, s, u);
        var h = r.getBoxLayoutParams(), c = {
          width: i.getWidth(),
          height: i.getHeight()
        }, f = r.get("padding"), v = $i(h, c, f), d = this.layoutInner(r, o, v, a, l, u), g = $i(ht({
          width: d.width,
          height: d.height
        }, h), c, f);
        this.group.x = g.x - d.x, this.group.y = g.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = pL(d, r));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this.getContentGroup(), h = Q(), c = n.get("selectedMode"), f = [];
      i.eachRawSeries(function(v) {
        !v.get("legendHoverLink") && f.push(v.id);
      }), bc(n.getData(), function(v, d) {
        var g = v.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var p = new as();
          p.newline = !0, u.add(p);
          return;
        }
        var y = i.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), S = m.getVisual("style"), w = this._createItem(y, g, d, v, n, r, _, S, b, c, a);
            w.on("click", oi(Og, g, null, a, f)).on("mouseover", oi(wc, y.name, null, a, f)).on("mouseout", oi(Sc, y.name, null, a, f)), i.ssr && w.eachChild(function(x) {
              var M = st(x);
              M.seriesIndex = y.seriesIndex, M.dataIndex = d, M.ssrType = "legend";
            }), h.set(g, !0);
          } else
            i.eachRawSeries(function(x) {
              if (!h.get(g) && x.legendVisualProvider) {
                var M = x.legendVisualProvider;
                if (!M.containName(g))
                  return;
                var D = M.indexOfName(g), A = M.getItemVisual(D, "style"), T = M.getItemVisual(D, "legendIcon"), L = we(A.fill);
                L && L[3] === 0 && (L[3] = 0.2, A = N(N({}, A), {
                  fill: cr(L, "rgba")
                }));
                var $ = this._createItem(x, g, d, v, n, r, {}, A, T, c, a);
                $.on("click", oi(Og, null, g, a, f)).on("mouseover", oi(wc, null, g, a, f)).on("mouseout", oi(Sc, null, g, a, f)), i.ssr && $.eachChild(function(P) {
                  var R = st(P);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = d, R.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, n, a, s, l);
    }, t.prototype._createSelector = function(r, n, i, a, o) {
      var s = this.getSelectorGroup();
      bc(r, function(u) {
        var h = u.type, c = new Lt({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            i.dispatchAction({
              type: h === "all" ? "legendAllSelect" : "legendInverseSelect",
              legendId: n.id
            });
          }
        });
        s.add(c);
        var f = n.getModel("selectorLabel"), v = n.getModel(["emphasis", "selectorLabel"]);
        yo(c, {
          normal: f,
          emphasis: v
        }, {
          defaultText: u.title
        }), zh(c);
      });
    }, t.prototype._createItem = function(r, n, i, a, o, s, l, u, h, c, f) {
      var v = r.visualDrawType, d = o.get("itemWidth"), g = o.get("itemHeight"), p = o.isSelected(n), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = BL(h, a, l, u, v, p, f), S = new as(), w = a.getModel("textStyle");
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
        S.add(zL({
          itemWidth: d,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var M = s === "left" ? d + 5 : -5, D = s, A = o.get("formatter"), T = n;
      H(A) && A ? T = A.replace("{name}", n ?? "") : Z(A) && (T = A(n));
      var L = p ? w.getTextColor() : a.get("inactiveColor");
      S.add(new Lt({
        style: Xe(w, {
          text: T,
          x: M,
          y: g / 2,
          fill: L,
          align: D,
          verticalAlign: "middle"
        }, {
          inheritColor: L
        })
      }));
      var $ = new St({
        shape: S.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), P = a.getModel("tooltip");
      return P.get("show") && bl({
        el: $,
        componentModel: o,
        itemName: n,
        itemTooltipOption: P.option
      }), S.add($), S.eachChild(function(R) {
        R.silent = !0;
      }), $.silent = !c, this.getContentGroup().add(S), zh(S), S.__legendDataIndex = i, S;
    }, t.prototype.layoutInner = function(r, n, i, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      Ci(r.get("orient"), l, r.get("itemGap"), i.width, i.height);
      var h = l.getBoundingRect(), c = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        Ci(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          r.get("selectorItemGap", !0)
        );
        var f = u.getBoundingRect(), v = [-f.x, -f.y], d = r.get("selectorButtonGap", !0), g = r.getOrient().index, p = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
        s === "end" ? v[g] += h[p] + d : c[g] += f[p] + d, v[1 - g] += h[y] / 2 - f[y] / 2, u.x = v[0], u.y = v[1], l.x = c[0], l.y = c[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[p] = h[p] + d + f[p], _[y] = Math.max(h[y], f[y]), _[m] = Math.min(0, f[m] + v[1 - g]), _;
      } else
        return l.x = c[0], l.y = c[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(Ee)
);
function BL(e, t, r, n, i, a, o) {
  function s(p, y) {
    p.lineWidth === "auto" && (p.lineWidth = y.lineWidth > 0 ? 2 : 0), bc(p, function(m, _) {
      p[_] === "inherit" && (p[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = e.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", c = l.getShallow("decal");
  u.decal = !c || c === "inherit" ? n.decal : nc(c, o), u.fill === "inherit" && (u.fill = n[i]), u.stroke === "inherit" && (u.stroke = n[h]), u.opacity === "inherit" && (u.opacity = (i === "fill" ? n : r).opacity), s(u, n);
  var f = t.getModel("lineStyle"), v = f.getLineStyle();
  if (s(v, r), u.fill === "auto" && (u.fill = n.fill), u.stroke === "auto" && (u.stroke = n.fill), v.stroke === "auto" && (v.stroke = n.fill), !a) {
    var d = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = d === "auto" ? n.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), v.stroke = f.get("inactiveColor"), v.lineWidth = f.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: v
  };
}
function zL(e) {
  var t = e.icon || "roundRect", r = gr(t, 0, 0, e.itemWidth, e.itemHeight, e.itemStyle.fill, e.symbolKeepAspect);
  return r.setStyle(e.itemStyle), r.rotation = (e.iconRotate || 0) * Math.PI / 180, r.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), t.indexOf("empty") > -1 && (r.style.stroke = r.style.fill, r.style.fill = "#fff", r.style.lineWidth = 2), r;
}
function Og(e, t, r, n) {
  Sc(e, t, r, n), r.dispatchAction({
    type: "legendToggleSelect",
    name: e ?? t
  }), wc(e, t, r, n);
}
function U0(e) {
  for (var t = e.getZr().storage.getDisplayList(), r, n = 0, i = t.length; n < i && !(r = t[n].states.emphasis); )
    n++;
  return r && r.hoverLayer;
}
function wc(e, t, r, n) {
  U0(r) || r.dispatchAction({
    type: "highlight",
    seriesName: e,
    name: t,
    excludeSeriesId: n
  });
}
function Sc(e, t, r, n) {
  U0(r) || r.dispatchAction({
    type: "downplay",
    seriesName: e,
    name: t,
    excludeSeriesId: n
  });
}
function FL(e) {
  var t = e.findComponents({
    mainType: "legend"
  });
  t && t.length && e.filterSeries(function(r) {
    for (var n = 0; n < t.length; n++)
      if (!t[n].isSelected(r.name))
        return !1;
    return !0;
  });
}
function ga(e, t, r) {
  var n = e === "allSelect" || e === "inverseSelect", i = {}, a = [];
  r.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    n ? s[e]() : s[e](t.name), Eg(s, i), a.push(s.componentIndex);
  });
  var o = {};
  return r.eachComponent("legend", function(s) {
    C(i, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), Eg(s, o);
  }), n ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function Eg(e, t) {
  var r = t || {};
  return C(e.getData(), function(n) {
    var i = n.get("name");
    if (!(i === `
` || i === "")) {
      var a = e.isSelected(i);
      On(r, i) ? r[i] = r[i] && a : r[i] = a;
    }
  }), r;
}
function HL(e) {
  e.registerAction("legendToggleSelect", "legendselectchanged", It(ga, "toggleSelected")), e.registerAction("legendAllSelect", "legendselectall", It(ga, "allSelect")), e.registerAction("legendInverseSelect", "legendinverseselect", It(ga, "inverseSelect")), e.registerAction("legendSelect", "legendselected", It(ga, "select")), e.registerAction("legendUnSelect", "legendunselected", It(ga, "unSelect"));
}
function Y0(e) {
  e.registerComponentModel(_c), e.registerComponentView(W0), e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, FL), e.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), HL(e);
}
var VL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.setScrollDataIndex = function(r) {
      this.option.scrollDataIndex = r;
    }, t.prototype.init = function(r, n, i) {
      var a = Ll(r);
      e.prototype.init.call(this, r, n, i), kg(this, r, a);
    }, t.prototype.mergeOption = function(r, n) {
      e.prototype.mergeOption.call(this, r, n), kg(this, this.option, r);
    }, t.type = "legend.scroll", t.defaultOption = Tl(_c.defaultOption, {
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
  }(_c)
);
function kg(e, t, r) {
  var n = e.getOrient(), i = [1, 1];
  i[n.index] = 0, Pi(t, r, {
    type: "box",
    ignoreSize: !!i
  });
}
var Ng = Mt, uh = ["width", "height"], hh = ["x", "y"], GL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !0, r._currentIndex = 0, r;
    }
    return t.prototype.init = function() {
      e.prototype.init.call(this), this.group.add(this._containerGroup = new Ng()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Ng());
    }, t.prototype.resetInner = function() {
      e.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this;
      e.prototype.renderInner.call(this, r, n, i, a, o, s, l);
      var h = this._controllerGroup, c = n.get("pageIconSize", !0), f = z(c) ? c : [c, c];
      d("pagePrev", 0);
      var v = n.getModel("pageTextStyle");
      h.add(new Lt({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: v.getTextColor(),
          font: v.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), d("pageNext", 1);
      function d(g, p) {
        var y = g + "DataIndex", m = lf(n.get("pageIcons", !0)[n.getOrient().name][p], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: J(u._pageGo, u, y, n, a)
        }, {
          x: -f[0] / 2,
          y: -f[1] / 2,
          width: f[0],
          height: f[1]
        });
        m.name = g, h.add(m);
      }
    }, t.prototype.layoutInner = function(r, n, i, a, o, s) {
      var l = this.getSelectorGroup(), u = r.getOrient().index, h = uh[u], c = hh[u], f = uh[1 - u], v = hh[1 - u];
      o && Ci(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        r.get("selectorItemGap", !0)
      );
      var d = r.get("selectorButtonGap", !0), g = l.getBoundingRect(), p = [-g.x, -g.y], y = q(i);
      o && (y[h] = i[h] - g[h] - d);
      var m = this._layoutContentAndController(r, a, y, u, h, f, v, c);
      if (o) {
        if (s === "end")
          p[u] += m[h] + d;
        else {
          var _ = g[h] + d;
          p[u] -= _, m[c] -= _;
        }
        m[h] += g[h] + d, p[1 - u] += m[v] + m[f] / 2 - g[f] / 2, m[f] = Math.max(m[f], g[f]), m[v] = Math.min(m[v], g[v] + p[1 - u]), l.x = p[0], l.y = p[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(r, n, i, a, o, s, l, u) {
      var h = this.getContentGroup(), c = this._containerGroup, f = this._controllerGroup;
      Ci(r.get("orient"), h, r.get("itemGap"), a ? i.width : null, a ? null : i.height), Ci(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        f,
        r.get("pageButtonItemGap", !0)
      );
      var v = h.getBoundingRect(), d = f.getBoundingRect(), g = this._showController = v[o] > i[o], p = [-v.x, -v.y];
      n || (p[a] = h[u]);
      var y = [0, 0], m = [-d.x, -d.y], _ = tt(r.get("pageButtonGap", !0), r.get("itemGap", !0));
      if (g) {
        var b = r.get("pageButtonPosition", !0);
        b === "end" ? m[a] += i[o] - d[o] : y[a] += d[o] + _;
      }
      m[1 - a] += v[s] / 2 - d[s] / 2, h.setPosition(p), c.setPosition(y), f.setPosition(m);
      var S = {
        x: 0,
        y: 0
      };
      if (S[o] = g ? i[o] : v[o], S[s] = Math.max(v[s], d[s]), S[l] = Math.min(0, d[l] + m[1 - a]), c.__rectSize = i[o], g) {
        var w = {
          x: 0,
          y: 0
        };
        w[o] = Math.max(i[o] - d[o] - _, 0), w[s] = S[s], c.setClipPath(new St({
          shape: w
        })), c.__rectSize = w[o];
      } else
        f.eachChild(function(M) {
          M.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(r);
      return x.pageIndex != null && le(
        h,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        g ? r : null
      ), this._updatePageInfoView(r, x), S;
    }, t.prototype._pageGo = function(r, n, i) {
      var a = this._getPageInfo(n)[r];
      a != null && i.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: n.id
      });
    }, t.prototype._updatePageInfoView = function(r, n) {
      var i = this._controllerGroup;
      C(["pagePrev", "pageNext"], function(h) {
        var c = h + "DataIndex", f = n[c] != null, v = i.childOfName(h);
        v && (v.setStyle("fill", f ? r.get("pageIconColor", !0) : r.get("pageIconInactiveColor", !0)), v.cursor = f ? "pointer" : "default");
      });
      var a = i.childOfName("pageText"), o = r.get("pageFormatter"), s = n.pageIndex, l = s != null ? s + 1 : 0, u = n.pageCount;
      a && o && a.setStyle("text", H(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(r) {
      var n = r.get("scrollDataIndex", !0), i = this.getContentGroup(), a = this._containerGroup.__rectSize, o = r.getOrient().index, s = uh[o], l = hh[o], u = this._findTargetItemIndex(n), h = i.children(), c = h[u], f = h.length, v = f ? 1 : 0, d = {
        contentPosition: [i.x, i.y],
        pageCount: v,
        pageIndex: v - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!c)
        return d;
      var g = b(c);
      d.contentPosition[o] = -g.s;
      for (var p = u + 1, y = g, m = g, _ = null; p <= f; ++p)
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
      var n, i = this.getContentGroup(), a;
      return i.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === r && (n = s);
      }), n ?? a;
    }, t.type = "legend.scroll", t;
  }(W0)
);
function WL(e) {
  e.registerAction("legendScroll", "legendscroll", function(t, r) {
    var n = t.scrollDataIndex;
    n != null && r.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function(i) {
      i.setScrollDataIndex(n);
    });
  });
}
function UL(e) {
  je(Y0), e.registerComponentModel(VL), e.registerComponentView(GL), WL(e);
}
function YL(e) {
  je(Y0), je(UL);
}
var X0 = {
  /**
   * @public
   */
  get: function(e, t, r) {
    var n = q((XL[e] || {})[t]);
    return r && z(n) ? n[n.length - 1] : n;
  }
}, XL = {
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
}, Bg = Vt.mapVisual, qL = Vt.eachVisual, ZL = z, zg = C, KL = Vy, jL = vr, nl = (
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
    return t.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i);
    }, t.prototype.optionUpdated = function(r, n) {
      var i = this.option;
      !n && EL(i, r, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();
    }, t.prototype.resetVisual = function(r) {
      var n = this.stateList;
      r = J(r, this), this.controllerVisuals = Rg(this.option.controller, n, r), this.targetVisuals = Rg(this.option.target, n, r);
    }, t.prototype.getItemSymbol = function() {
      return null;
    }, t.prototype.getTargetSeriesIndices = function() {
      var r = this.option.seriesIndex, n = [];
      return r == null || r === "all" ? this.ecModel.eachSeries(function(i, a) {
        n.push(a);
      }) : n = kt(r), n;
    }, t.prototype.eachTargetSeries = function(r, n) {
      C(this.getTargetSeriesIndices(), function(i) {
        var a = this.ecModel.getSeriesByIndex(i);
        a && r.call(n, a);
      }, this);
    }, t.prototype.isTargetSeries = function(r) {
      var n = !1;
      return this.eachTargetSeries(function(i) {
        i === r && (n = !0);
      }), n;
    }, t.prototype.formatValueText = function(r, n, i) {
      var a = this.option, o = a.precision, s = this.dataBound, l = a.formatter, u;
      i = i || ["<", ">"], z(r) && (r = r.slice(), u = !0);
      var h = n ? r : u ? [c(r[0]), c(r[1])] : c(r);
      if (H(l))
        return l.replace("{value}", u ? h[0] : h).replace("{value2}", u ? h[1] : h);
      if (Z(l))
        return u ? l(r[0], r[1]) : l(r);
      if (u)
        return r[0] === s[0] ? i[0] + " " + h[1] : r[1] === s[1] ? i[1] + " " + h[0] : h[0] + " - " + h[1];
      return h;
      function c(f) {
        return f === s[0] ? "min" : f === s[1] ? "max" : (+f).toFixed(Math.min(o, 20));
      }
    }, t.prototype.resetExtent = function() {
      var r = this.option, n = KL([r.min, r.max]);
      this._dataExtent = n;
    }, t.prototype.getDataDimensionIndex = function(r) {
      var n = this.option.dimension;
      if (n != null)
        return r.getDimensionIndex(n);
      for (var i = r.dimensions, a = i.length - 1; a >= 0; a--) {
        var o = i[a], s = r.getDimensionInfo(o);
        if (!s.isCalculationCoord)
          return s.storeDimIndex;
      }
    }, t.prototype.getExtent = function() {
      return this._dataExtent.slice();
    }, t.prototype.completeVisualOption = function() {
      var r = this.ecModel, n = this.option, i = {
        inRange: n.inRange,
        outOfRange: n.outOfRange
      }, a = n.target || (n.target = {}), o = n.controller || (n.controller = {});
      ot(a, i), ot(o, i);
      var s = this.isCategory();
      l.call(this, a), l.call(this, o), u.call(this, a, "inRange", "outOfRange"), h.call(this, o);
      function l(c) {
        ZL(n.color) && !c.inRange && (c.inRange = {
          color: n.color.slice().reverse()
        }), c.inRange = c.inRange || {
          color: r.get("gradientColor")
        };
      }
      function u(c, f, v) {
        var d = c[f], g = c[v];
        d && !g && (g = c[v] = {}, zg(d, function(p, y) {
          if (Vt.isValidType(y)) {
            var m = X0.get(y, "inactive", s);
            m != null && (g[y] = m, y === "color" && !g.hasOwnProperty("opacity") && !g.hasOwnProperty("colorAlpha") && (g.opacity = [0, 0]));
          }
        }));
      }
      function h(c) {
        var f = (c.inRange || {}).symbol || (c.outOfRange || {}).symbol, v = (c.inRange || {}).symbolSize || (c.outOfRange || {}).symbolSize, d = this.get("inactiveColor"), g = this.getItemSymbol(), p = g || "roundRect";
        zg(this.stateList, function(y) {
          var m = this.itemSize, _ = c[y];
          _ || (_ = c[y] = {
            color: s ? d : [d]
          }), _.symbol == null && (_.symbol = f && q(f) || (s ? p : [p])), _.symbolSize == null && (_.symbolSize = v && q(v) || (s ? m[0] : [m[0], m[0]])), _.symbol = Bg(_.symbol, function(w) {
            return w === "none" ? p : w;
          });
          var b = _.symbolSize;
          if (b != null) {
            var S = -1 / 0;
            qL(b, function(w) {
              w > S && (S = w);
            }), _.symbolSize = Bg(b, function(w) {
              return jL(w, [0, S], [0, m[0]], !0);
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
  }(ct)
), Fg = [20, 140], QL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.optionUpdated = function(r, n) {
      e.prototype.optionUpdated.apply(this, arguments), this.resetExtent(), this.resetVisual(function(i) {
        i.mappingMethod = "linear", i.dataExtent = this.getExtent();
      }), this._resetRange();
    }, t.prototype.resetItemSize = function() {
      e.prototype.resetItemSize.apply(this, arguments);
      var r = this.itemSize;
      (r[0] == null || isNaN(r[0])) && (r[0] = Fg[0]), (r[1] == null || isNaN(r[1])) && (r[1] = Fg[1]);
    }, t.prototype._resetRange = function() {
      var r = this.getExtent(), n = this.option.range;
      !n || n.auto ? (r.auto = 1, this.option.range = r) : z(n) && (n[0] > n[1] && n.reverse(), n[0] = Math.max(n[0], r[0]), n[1] = Math.min(n[1], r[1]));
    }, t.prototype.completeVisualOption = function() {
      e.prototype.completeVisualOption.apply(this, arguments), C(this.stateList, function(r) {
        var n = this.option.controller[r].symbolSize;
        n && n[0] !== n[1] && (n[0] = n[1] / 3);
      }, this);
    }, t.prototype.setSelected = function(r) {
      this.option.range = r.slice(), this._resetRange();
    }, t.prototype.getSelected = function() {
      var r = this.getExtent(), n = Vy((this.get("range") || []).slice());
      return n[0] > r[1] && (n[0] = r[1]), n[1] > r[1] && (n[1] = r[1]), n[0] < r[0] && (n[0] = r[0]), n[1] < r[0] && (n[1] = r[0]), n;
    }, t.prototype.getValueState = function(r) {
      var n = this.option.range, i = this.getExtent();
      return (n[0] <= i[0] || n[0] <= r) && (n[1] >= i[1] || r <= n[1]) ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(r) {
      var n = [];
      return this.eachTargetSeries(function(i) {
        var a = [], o = i.getData();
        o.each(this.getDataDimensionIndex(o), function(s, l) {
          r[0] <= s && s <= r[1] && a.push(l);
        }, this), n.push({
          seriesId: i.id,
          dataIndex: a
        });
      }, this), n;
    }, t.prototype.getVisualMeta = function(r) {
      var n = Hg(this, "outOfRange", this.getExtent()), i = Hg(this, "inRange", this.option.range.slice()), a = [];
      function o(v, d) {
        a.push({
          value: v,
          color: r(v, d)
        });
      }
      for (var s = 0, l = 0, u = i.length, h = n.length; l < h && (!i.length || n[l] <= i[0]); l++)
        n[l] < i[s] && o(n[l], "outOfRange");
      for (var c = 1; s < u; s++, c = 0)
        c && a.length && o(i[s], "outOfRange"), o(i[s], "inRange");
      for (var c = 1; l < h; l++)
        (!i.length || i[i.length - 1] < n[l]) && (c && (a.length && o(a[a.length - 1].value, "outOfRange"), c = 0), o(n[l], "outOfRange"));
      var f = a.length;
      return {
        stops: a,
        outerColors: [f ? a[0].color : "transparent", f ? a[f - 1].color : "transparent"]
      };
    }, t.type = "visualMap.continuous", t.defaultOption = Tl(nl.defaultOption, {
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
  }(nl)
);
function Hg(e, t, r) {
  if (r[0] === r[1])
    return r.slice();
  for (var n = 200, i = (r[1] - r[0]) / n, a = r[0], o = [], s = 0; s <= n && a < r[1]; s++)
    o.push(a), a += i;
  return o.push(r[1]), o;
}
var q0 = (
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
    return t.prototype.init = function(r, n) {
      this.ecModel = r, this.api = n;
    }, t.prototype.render = function(r, n, i, a) {
      if (this.visualMapModel = r, r.get("show") === !1) {
        this.group.removeAll();
        return;
      }
      this.doRender(r, n, i, a);
    }, t.prototype.renderBackground = function(r) {
      var n = this.visualMapModel, i = mo(n.get("padding") || 0), a = r.getBoundingRect();
      r.add(new St({
        z2: -1,
        silent: !0,
        shape: {
          x: a.x - i[3],
          y: a.y - i[0],
          width: a.width + i[3] + i[1],
          height: a.height + i[0] + i[2]
        },
        style: {
          fill: n.get("backgroundColor"),
          stroke: n.get("borderColor"),
          lineWidth: n.get("borderWidth")
        }
      }));
    }, t.prototype.getControllerVisual = function(r, n, i) {
      i = i || {};
      var a = i.forceState, o = this.visualMapModel, s = {};
      if (n === "color") {
        var l = o.get("contentColor");
        s.color = l;
      }
      function u(v) {
        return s[v];
      }
      function h(v, d) {
        s[v] = d;
      }
      var c = o.controllerVisuals[a || o.getValueState(r)], f = Vt.prepareVisualTypes(c);
      return C(f, function(v) {
        var d = c[v];
        i.convertOpacityToAlpha && v === "opacity" && (v = "colorAlpha", d = c.__alphaForOpacity), Vt.dependsOn(v, n) && d && d.applyVisual(r, u, h);
      }), s[n];
    }, t.prototype.positionGroup = function(r) {
      var n = this.visualMapModel, i = this.api;
      aC(r, n.getBoxLayoutParams(), {
        width: i.getWidth(),
        height: i.getHeight()
      });
    }, t.prototype.doRender = function(r, n, i, a) {
    }, t.type = "visualMap", t;
  }(Ee)
), Vg = [["left", "right", "width"], ["top", "bottom", "height"]];
function Z0(e, t, r) {
  var n = e.option, i = n.align;
  if (i != null && i !== "auto")
    return i;
  for (var a = {
    width: t.getWidth(),
    height: t.getHeight()
  }, o = n.orient === "horizontal" ? 1 : 0, s = Vg[o], l = [0, null, 10], u = {}, h = 0; h < 3; h++)
    u[Vg[1 - o][h]] = l[h], u[s[h]] = h === 2 ? r[0] : n[s[h]];
  var c = [["x", "width", 3], ["y", "height", 0]][o], f = $i(u, a, n.padding);
  return s[(f.margin[c[2]] || 0) + f[c[0]] + f[c[1]] * 0.5 < a[c[1]] * 0.5 ? 0 : 1];
}
function Ts(e, t) {
  return C(e || [], function(r) {
    r.dataIndex != null && (r.dataIndexInside = r.dataIndex, r.dataIndex = null), r.highlightKey = "visualMap" + (t ? t.componentIndex : "");
  }), e;
}
var Ge = vr, JL = C, Gg = Math.min, ch = Math.max, t$ = 12, e$ = 6, r$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r._shapes = {}, r._dataInterval = [], r._handleEnds = [], r._hoverLinkDataIndices = [], r;
    }
    return t.prototype.init = function(r, n) {
      e.prototype.init.call(this, r, n), this._hoverLinkFromSeriesMouseOver = J(this._hoverLinkFromSeriesMouseOver, this), this._hideIndicator = J(this._hideIndicator, this);
    }, t.prototype.doRender = function(r, n, i, a) {
      (!a || a.type !== "selectDataRange" || a.from !== this.uid) && this._buildView();
    }, t.prototype._buildView = function() {
      this.group.removeAll();
      var r = this.visualMapModel, n = this.group;
      this._orient = r.get("orient"), this._useHandle = r.get("calculable"), this._resetInterval(), this._renderBar(n);
      var i = r.get("text");
      this._renderEndsText(n, i, 0), this._renderEndsText(n, i, 1), this._updateView(!0), this.renderBackground(n), this._updateView(), this._enableHoverLinkToSeries(), this._enableHoverLinkFromSeries(), this.positionGroup(n);
    }, t.prototype._renderEndsText = function(r, n, i) {
      if (n) {
        var a = n[1 - i];
        a = a != null ? a + "" : "";
        var o = this.visualMapModel, s = o.get("textGap"), l = o.itemSize, u = this._shapes.mainGroup, h = this._applyTransform([l[0] / 2, i === 0 ? -s : l[1] + s], u), c = this._applyTransform(i === 0 ? "bottom" : "top", u), f = this._orient, v = this.visualMapModel.textStyleModel;
        this.group.add(new Lt({
          style: Xe(v, {
            x: h[0],
            y: h[1],
            verticalAlign: f === "horizontal" ? "middle" : c,
            align: f === "horizontal" ? c : "center",
            text: a
          })
        }));
      }
    }, t.prototype._renderBar = function(r) {
      var n = this.visualMapModel, i = this._shapes, a = n.itemSize, o = this._orient, s = this._useHandle, l = Z0(n, this.api, a), u = i.mainGroup = this._createBarGroup(l), h = new Mt();
      u.add(h), h.add(i.outOfRange = Wg()), h.add(i.inRange = Wg(null, s ? Yg(this._orient) : null, J(this._dragHandle, this, "all", !1), J(this._dragHandle, this, "all", !0))), h.setClipPath(new St({
        shape: {
          x: 0,
          y: 0,
          width: a[0],
          height: a[1],
          r: 3
        }
      }));
      var c = n.textStyleModel.getTextRect("国"), f = ch(c.width, c.height);
      s && (i.handleThumbs = [], i.handleLabels = [], i.handleLabelPoints = [], this._createHandle(n, u, 0, a, f, o), this._createHandle(n, u, 1, a, f, o)), this._createIndicator(n, u, a, f, o), r.add(u);
    }, t.prototype._createHandle = function(r, n, i, a, o, s) {
      var l = J(this._dragHandle, this, i, !1), u = J(this._dragHandle, this, i, !0), h = Ze(r.get("handleSize"), a[0]), c = gr(r.get("handleIcon"), -h / 2, -h / 2, h, h, null, !0), f = Yg(this._orient);
      c.attr({
        cursor: f,
        draggable: !0,
        drift: l,
        ondragend: u,
        onmousemove: function(y) {
          Ua(y.event);
        }
      }), c.x = a[0] / 2, c.useStyle(r.getModel("handleStyle").getItemStyle()), c.setStyle({
        strokeNoScale: !0,
        strokeFirst: !0
      }), c.style.lineWidth *= 2, c.ensureState("emphasis").style = r.getModel(["emphasis", "handleStyle"]).getItemStyle(), Jc(c, !0), n.add(c);
      var v = this.visualMapModel.textStyleModel, d = new Lt({
        cursor: f,
        draggable: !0,
        drift: l,
        onmousemove: function(y) {
          Ua(y.event);
        },
        ondragend: u,
        style: Xe(v, {
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
      p.handleThumbs[i] = c, p.handleLabelPoints[i] = g, p.handleLabels[i] = d;
    }, t.prototype._createIndicator = function(r, n, i, a, o) {
      var s = Ze(r.get("indicatorSize"), i[0]), l = gr(r.get("indicatorIcon"), -s / 2, -s / 2, s, s, null, !0);
      l.attr({
        cursor: "move",
        invisible: !0,
        silent: !0,
        x: i[0] / 2
      });
      var u = r.getModel("indicatorStyle").getItemStyle();
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
      n.add(l);
      var c = this.visualMapModel.textStyleModel, f = new Lt({
        silent: !0,
        invisible: !0,
        style: Xe(c, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      this.group.add(f);
      var v = [(o === "horizontal" ? a / 2 : e$) + i[0] / 2, 0], d = this._shapes;
      d.indicator = l, d.indicatorLabel = f, d.indicatorLabelPoint = v, this._firstShowIndicator = !0;
    }, t.prototype._dragHandle = function(r, n, i, a) {
      if (this._useHandle) {
        if (this._dragging = !n, !n) {
          var o = this._applyTransform([i, a], this._shapes.mainGroup, !0);
          this._updateInterval(r, o[1]), this._hideIndicator(), this._updateView();
        }
        n === !this.visualMapModel.get("realtime") && this.api.dispatchAction({
          type: "selectDataRange",
          from: this.uid,
          visualMapId: this.visualMapModel.id,
          selected: this._dataInterval.slice()
        }), n ? !this._hovering && this._clearHoverLinkToSeries() : Ug(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[r], !1);
      }
    }, t.prototype._resetInterval = function() {
      var r = this.visualMapModel, n = this._dataInterval = r.getSelected(), i = r.getExtent(), a = [0, r.itemSize[1]];
      this._handleEnds = [Ge(n[0], i, a, !0), Ge(n[1], i, a, !0)];
    }, t.prototype._updateInterval = function(r, n) {
      n = n || 0;
      var i = this.visualMapModel, a = this._handleEnds, o = [0, i.itemSize[1]];
      kI(
        n,
        a,
        o,
        r,
        // cross is forbidden
        0
      );
      var s = i.getExtent();
      this._dataInterval = [Ge(a[0], o, s, !0), Ge(a[1], o, s, !0)];
    }, t.prototype._updateView = function(r) {
      var n = this.visualMapModel, i = n.getExtent(), a = this._shapes, o = [0, n.itemSize[1]], s = r ? o : this._handleEnds, l = this._createBarVisual(this._dataInterval, i, s, "inRange"), u = this._createBarVisual(i, i, o, "outOfRange");
      a.inRange.setStyle({
        fill: l.barColor
        // opacity: visualInRange.opacity
      }).setShape("points", l.barPoints), a.outOfRange.setStyle({
        fill: u.barColor
        // opacity: visualOutOfRange.opacity
      }).setShape("points", u.barPoints), this._updateHandle(s, l);
    }, t.prototype._createBarVisual = function(r, n, i, a) {
      var o = {
        forceState: a,
        convertOpacityToAlpha: !0
      }, s = this._makeColorGradient(r, o), l = [this.getControllerVisual(r[0], "symbolSize", o), this.getControllerVisual(r[1], "symbolSize", o)], u = this._createBarPoints(i, l);
      return {
        barColor: new af(0, 0, 0, 1, s),
        barPoints: u,
        handlesColor: [s[0].color, s[s.length - 1].color]
      };
    }, t.prototype._makeColorGradient = function(r, n) {
      var i = 100, a = [], o = (r[1] - r[0]) / i;
      a.push({
        color: this.getControllerVisual(r[0], "color", n),
        offset: 0
      });
      for (var s = 1; s < i; s++) {
        var l = r[0] + o * s;
        if (l > r[1])
          break;
        a.push({
          color: this.getControllerVisual(l, "color", n),
          offset: s / i
        });
      }
      return a.push({
        color: this.getControllerVisual(r[1], "color", n),
        offset: 1
      }), a;
    }, t.prototype._createBarPoints = function(r, n) {
      var i = this.visualMapModel.itemSize;
      return [[i[0] - n[0], r[0]], [i[0], r[0]], [i[0], r[1]], [i[0] - n[1], r[1]]];
    }, t.prototype._createBarGroup = function(r) {
      var n = this._orient, i = this.visualMapModel.get("inverse");
      return new Mt(n === "horizontal" && !i ? {
        scaleX: r === "bottom" ? 1 : -1,
        rotation: Math.PI / 2
      } : n === "horizontal" && i ? {
        scaleX: r === "bottom" ? -1 : 1,
        rotation: -Math.PI / 2
      } : n === "vertical" && !i ? {
        scaleX: r === "left" ? 1 : -1,
        scaleY: -1
      } : {
        scaleX: r === "left" ? 1 : -1
      });
    }, t.prototype._updateHandle = function(r, n) {
      if (this._useHandle) {
        var i = this._shapes, a = this.visualMapModel, o = i.handleThumbs, s = i.handleLabels, l = a.itemSize, u = a.getExtent(), h = this._applyTransform("left", i.mainGroup);
        JL([0, 1], function(c) {
          var f = o[c];
          f.setStyle("fill", n.handlesColor[c]), f.y = r[c];
          var v = Ge(r[c], [0, l[1]], u, !0), d = this.getControllerVisual(v, "symbolSize");
          f.scaleX = f.scaleY = d / l[0], f.x = l[0] - d / 2;
          var g = wi(i.handleLabelPoints[c], ms(f, this.group));
          if (this._orient === "horizontal") {
            var p = h === "left" || h === "top" ? (l[0] - d) / 2 : (l[0] - d) / -2;
            g[1] += p;
          }
          s[c].setStyle({
            x: g[0],
            y: g[1],
            text: a.formatValueText(this._dataInterval[c]),
            verticalAlign: "middle",
            align: this._orient === "vertical" ? this._applyTransform("left", i.mainGroup) : "center"
          });
        }, this);
      }
    }, t.prototype._showIndicator = function(r, n, i, a) {
      var o = this.visualMapModel, s = o.getExtent(), l = o.itemSize, u = [0, l[1]], h = this._shapes, c = h.indicator;
      if (c) {
        c.attr("invisible", !1);
        var f = {
          convertOpacityToAlpha: !0
        }, v = this.getControllerVisual(r, "color", f), d = this.getControllerVisual(r, "symbolSize"), g = Ge(r, s, u, !0), p = l[0] - d / 2, y = {
          x: c.x,
          y: c.y
        };
        c.y = g, c.x = p;
        var m = wi(h.indicatorLabelPoint, ms(c, this.group)), _ = h.indicatorLabel;
        _.attr("invisible", !1);
        var b = this._applyTransform("left", h.mainGroup), S = this._orient, w = S === "horizontal";
        _.setStyle({
          text: (i || "") + o.formatValueText(n),
          verticalAlign: w ? b : "middle",
          align: w ? "center" : b
        });
        var x = {
          x: p,
          y: g,
          style: {
            fill: v
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
      this._shapes.mainGroup.on("mousemove", function(n) {
        if (r._hovering = !0, !r._dragging) {
          var i = r.visualMapModel.itemSize, a = r._applyTransform([n.offsetX, n.offsetY], r._shapes.mainGroup, !0, !0);
          a[1] = Gg(ch(0, a[1]), i[1]), r._doHoverLinkToSeries(a[1], 0 <= a[0] && a[0] <= i[0]);
        }
      }).on("mouseout", function() {
        r._hovering = !1, !r._dragging && r._clearHoverLinkToSeries();
      });
    }, t.prototype._enableHoverLinkFromSeries = function() {
      var r = this.api.getZr();
      this.visualMapModel.option.hoverLink ? (r.on("mouseover", this._hoverLinkFromSeriesMouseOver, this), r.on("mouseout", this._hideIndicator, this)) : this._clearHoverLinkFromSeries();
    }, t.prototype._doHoverLinkToSeries = function(r, n) {
      var i = this.visualMapModel, a = i.itemSize;
      if (i.option.hoverLink) {
        var o = [0, a[1]], s = i.getExtent();
        r = Gg(ch(o[0], r), o[1]);
        var l = n$(i, s, o), u = [r - l, r + l], h = Ge(r, o, s, !0), c = [Ge(u[0], o, s, !0), Ge(u[1], o, s, !0)];
        u[0] < o[0] && (c[0] = -1 / 0), u[1] > o[1] && (c[1] = 1 / 0), n && (c[0] === -1 / 0 ? this._showIndicator(h, c[1], "< ", l) : c[1] === 1 / 0 ? this._showIndicator(h, c[0], "> ", l) : this._showIndicator(h, h, "≈ ", l));
        var f = this._hoverLinkDataIndices, v = [];
        (n || Ug(i)) && (v = this._hoverLinkDataIndices = i.findTargetDataIndices(c));
        var d = bS(f, v);
        this._dispatchHighDown("downplay", Ts(d[0], i)), this._dispatchHighDown("highlight", Ts(d[1], i));
      }
    }, t.prototype._hoverLinkFromSeriesMouseOver = function(r) {
      var n;
      if (gi(r.target, function(l) {
        var u = st(l);
        if (u.dataIndex != null)
          return n = u, !0;
      }, !0), !!n) {
        var i = this.ecModel.getSeriesByIndex(n.seriesIndex), a = this.visualMapModel;
        if (a.isTargetSeries(i)) {
          var o = i.getData(n.dataType), s = o.getStore().get(a.getDataDimensionIndex(o), n.dataIndex);
          isNaN(s) || this._showIndicator(s, s);
        }
      }
    }, t.prototype._hideIndicator = function() {
      var r = this._shapes;
      r.indicator && r.indicator.attr("invisible", !0), r.indicatorLabel && r.indicatorLabel.attr("invisible", !0);
      var n = this._shapes.handleLabels;
      if (n)
        for (var i = 0; i < n.length; i++)
          this.api.leaveBlur(n[i]);
    }, t.prototype._clearHoverLinkToSeries = function() {
      this._hideIndicator();
      var r = this._hoverLinkDataIndices;
      this._dispatchHighDown("downplay", Ts(r, this.visualMapModel)), r.length = 0;
    }, t.prototype._clearHoverLinkFromSeries = function() {
      this._hideIndicator();
      var r = this.api.getZr();
      r.off("mouseover", this._hoverLinkFromSeriesMouseOver), r.off("mouseout", this._hideIndicator);
    }, t.prototype._applyTransform = function(r, n, i, a) {
      var o = ms(n, a ? null : this.group);
      return z(r) ? wi(r, o, i) : Cm(r, o, i);
    }, t.prototype._dispatchHighDown = function(r, n) {
      n && n.length && this.api.dispatchAction({
        type: r,
        batch: n
      });
    }, t.prototype.dispose = function() {
      this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();
    }, t.type = "visualMap.continuous", t;
  }(q0)
);
function Wg(e, t, r, n) {
  return new ml({
    shape: {
      points: e
    },
    draggable: !!r,
    cursor: t,
    drift: r,
    onmousemove: function(i) {
      Ua(i.event);
    },
    ondragend: n
  });
}
function n$(e, t, r) {
  var n = t$ / 2, i = e.get("hoverLinkDataSize");
  return i && (n = Ge(i, t, r, !0) / 2), n;
}
function Ug(e) {
  var t = e.get("hoverLinkOnHandle");
  return !!(t ?? e.get("realtime"));
}
function Yg(e) {
  return e === "vertical" ? "ns-resize" : "ew-resize";
}
var i$ = {
  type: "selectDataRange",
  event: "dataRangeSelected",
  // FIXME use updateView appears wrong
  update: "update"
}, a$ = function(e, t) {
  t.eachComponent({
    mainType: "visualMap",
    query: e
  }, function(r) {
    r.setSelected(e.selected);
  });
}, o$ = [
  {
    createOnAllSeries: !0,
    reset: function(e, t) {
      var r = [];
      return t.eachComponent("visualMap", function(n) {
        var i = e.pipelineContext;
        !n.isTargetSeries(e) || i && i.large || r.push(kL(n.stateList, n.targetVisuals, J(n.getValueState, n), n.getDataDimensionIndex(e.getData())));
      }), r;
    }
  },
  // Only support color.
  {
    createOnAllSeries: !0,
    reset: function(e, t) {
      var r = e.getData(), n = [];
      t.eachComponent("visualMap", function(i) {
        if (i.isTargetSeries(e)) {
          var a = i.getVisualMeta(J(s$, null, e, i)) || {
            stops: [],
            outerColors: []
          }, o = i.getDataDimensionIndex(r);
          o >= 0 && (a.dimension = o, n.push(a));
        }
      }), e.getData().setVisual("visualMeta", n);
    }
  }
];
function s$(e, t, r, n) {
  for (var i = t.targetVisuals[n], a = Vt.prepareVisualTypes(i), o = {
    color: T_(e.getData(), "color")
    // default color.
  }, s = 0, l = a.length; s < l; s++) {
    var u = a[s], h = i[u === "opacity" ? "__alphaForOpacity" : u];
    h && h.applyVisual(r, c, f);
  }
  return o.color;
  function c(v) {
    return o[v];
  }
  function f(v, d) {
    o[v] = d;
  }
}
var Xg = C;
function l$(e) {
  var t = e && e.visualMap;
  z(t) || (t = t ? [t] : []), Xg(t, function(r) {
    if (r) {
      si(r, "splitList") && !si(r, "pieces") && (r.pieces = r.splitList, delete r.splitList);
      var n = r.pieces;
      n && z(n) && Xg(n, function(i) {
        V(i) && (si(i, "start") && !si(i, "min") && (i.min = i.start), si(i, "end") && !si(i, "max") && (i.max = i.end));
      });
    }
  });
}
function si(e, t) {
  return e && e.hasOwnProperty && e.hasOwnProperty(t);
}
var qg = !1;
function K0(e) {
  qg || (qg = !0, e.registerSubTypeDefaulter("visualMap", function(t) {
    return !t.categories && (!(t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) || t.calculable) ? "continuous" : "piecewise";
  }), e.registerAction(i$, a$), C(o$, function(t) {
    e.registerVisual(e.PRIORITY.VISUAL.COMPONENT, t);
  }), e.registerPreprocessor(l$));
}
function u$(e) {
  e.registerComponentModel(QL), e.registerComponentView(r$), K0(e);
}
var h$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r._pieceList = [], r;
    }
    return t.prototype.optionUpdated = function(r, n) {
      e.prototype.optionUpdated.apply(this, arguments), this.resetExtent();
      var i = this._mode = this._determineMode();
      this._pieceList = [], c$[this._mode].call(this, this._pieceList), this._resetSelected(r, n);
      var a = this.option.categories;
      this.resetVisual(function(o, s) {
        i === "categories" ? (o.mappingMethod = "category", o.categories = q(a)) : (o.dataExtent = this.getExtent(), o.mappingMethod = "piecewise", o.pieceList = U(this._pieceList, function(l) {
          return l = q(l), s !== "inRange" && (l.visual = null), l;
        }));
      });
    }, t.prototype.completeVisualOption = function() {
      var r = this.option, n = {}, i = Vt.listVisualTypes(), a = this.isCategory();
      C(r.pieces, function(s) {
        C(i, function(l) {
          s.hasOwnProperty(l) && (n[l] = 1);
        });
      }), C(n, function(s, l) {
        var u = !1;
        C(this.stateList, function(h) {
          u = u || o(r, h, l) || o(r.target, h, l);
        }, this), !u && C(this.stateList, function(h) {
          (r[h] || (r[h] = {}))[l] = X0.get(l, h === "inRange" ? "active" : "inactive", a);
        });
      }, this);
      function o(s, l, u) {
        return s && s[l] && s[l].hasOwnProperty(u);
      }
      e.prototype.completeVisualOption.apply(this, arguments);
    }, t.prototype._resetSelected = function(r, n) {
      var i = this.option, a = this._pieceList, o = (n ? i : r).selected || {};
      if (i.selected = o, C(a, function(l, u) {
        var h = this.getSelectedMapKey(l);
        o.hasOwnProperty(h) || (o[h] = !0);
      }, this), i.selectedMode === "single") {
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
      var n = Vt.findPieceIndex(r, this._pieceList);
      return n != null && this.option.selected[this.getSelectedMapKey(this._pieceList[n])] ? "inRange" : "outOfRange";
    }, t.prototype.findTargetDataIndices = function(r) {
      var n = [], i = this._pieceList;
      return this.eachTargetSeries(function(a) {
        var o = [], s = a.getData();
        s.each(this.getDataDimensionIndex(s), function(l, u) {
          var h = Vt.findPieceIndex(l, i);
          h === r && o.push(u);
        }, this), n.push({
          seriesId: a.id,
          dataIndex: o
        });
      }, this), n;
    }, t.prototype.getRepresentValue = function(r) {
      var n;
      if (this.isCategory())
        n = r.value;
      else if (r.value != null)
        n = r.value;
      else {
        var i = r.interval || [];
        n = i[0] === -1 / 0 && i[1] === 1 / 0 ? 0 : (i[0] + i[1]) / 2;
      }
      return n;
    }, t.prototype.getVisualMeta = function(r) {
      if (this.isCategory())
        return;
      var n = [], i = ["", ""], a = this;
      function o(h, c) {
        var f = a.getRepresentValue({
          interval: h
        });
        c || (c = a.getValueState(f));
        var v = r(f, c);
        h[0] === -1 / 0 ? i[0] = v : h[1] === 1 / 0 ? i[1] = v : n.push({
          value: h[0],
          color: v
        }, {
          value: h[1],
          color: v
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
        stops: n,
        outerColors: i
      };
    }, t.type = "visualMap.piecewise", t.defaultOption = Tl(nl.defaultOption, {
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
  }(nl)
), c$ = {
  splitNumber: function(e) {
    var t = this.option, r = Math.min(t.precision, 20), n = this.getExtent(), i = t.splitNumber;
    i = Math.max(parseInt(i, 10), 1), t.splitNumber = i;
    for (var a = (n[1] - n[0]) / i; +a.toFixed(r) !== a && r < 5; )
      r++;
    t.precision = r, a = +a.toFixed(r), t.minOpen && e.push({
      interval: [-1 / 0, n[0]],
      close: [0, 0]
    });
    for (var o = 0, s = n[0]; o < i; s += a, o++) {
      var l = o === i - 1 ? n[1] : s + a;
      e.push({
        interval: [s, l],
        close: [1, 1]
      });
    }
    t.maxOpen && e.push({
      interval: [n[1], 1 / 0],
      close: [0, 0]
    }), Lv(e), C(e, function(u, h) {
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
    }, this), Zg(t, e);
  },
  pieces: function(e) {
    var t = this.option;
    C(t.pieces, function(r, n) {
      V(r) || (r = {
        value: r
      });
      var i = {
        text: "",
        index: n
      };
      if (r.label != null && (i.text = r.label), r.hasOwnProperty("value")) {
        var a = i.value = r.value;
        i.interval = [a, a], i.close = [1, 1];
      } else {
        for (var o = i.interval = [], s = i.close = [0, 0], l = [1, 0, 1], u = [-1 / 0, 1 / 0], h = [], c = 0; c < 2; c++) {
          for (var f = [["gte", "gt", "min"], ["lte", "lt", "max"]][c], v = 0; v < 3 && o[c] == null; v++)
            o[c] = r[f[v]], s[c] = l[v], h[c] = v === 2;
          o[c] == null && (o[c] = u[c]);
        }
        h[0] && o[1] === 1 / 0 && (s[0] = 0), h[1] && o[0] === -1 / 0 && (s[1] = 0), o[0] === o[1] && s[0] && s[1] && (i.value = o[0]);
      }
      i.visual = Vt.retrieveVisuals(r), e.push(i);
    }, this), Zg(t, e), Lv(e), C(e, function(r) {
      var n = r.close, i = [["<", "≤"][n[1]], [">", "≥"][n[0]]];
      r.text = r.text || this.formatValueText(r.value != null ? r.value : r.interval, !1, i);
    }, this);
  }
};
function Zg(e, t) {
  var r = e.inverse;
  (e.orient === "vertical" ? !r : r) && t.reverse();
}
var f$ = (
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
      var n = this.visualMapModel, i = n.get("textGap"), a = n.textStyleModel, o = a.getFont(), s = a.getTextColor(), l = this._getItemAlign(), u = n.itemSize, h = this._getViewData(), c = h.endsText, f = Ii(n.get("showLabel", !0), !c), v = !n.get("selectedMode");
      c && this._renderEndsText(r, c[0], u, f, l), C(h.viewPieceList, function(d) {
        var g = d.piece, p = new Mt();
        p.onclick = J(this._onItemClick, this, g), this._enableHoverLink(p, d.indexInModelPieceList);
        var y = n.getRepresentValue(g);
        if (this._createItemSymbol(p, y, [0, 0, u[0], u[1]], v), f) {
          var m = this.visualMapModel.getValueState(y);
          p.add(new Lt({
            style: {
              x: l === "right" ? -i : u[0] + i,
              y: u[1] / 2,
              text: g.text,
              verticalAlign: "middle",
              align: l,
              font: o,
              fill: s,
              opacity: m === "outOfRange" ? 0.5 : 1
            },
            silent: v
          }));
        }
        r.add(p);
      }, this), c && this._renderEndsText(r, c[1], u, f, l), Ci(n.get("orient"), r, n.get("itemGap")), this.renderBackground(r), this.positionGroup(r);
    }, t.prototype._enableHoverLink = function(r, n) {
      var i = this;
      r.on("mouseover", function() {
        return a("highlight");
      }).on("mouseout", function() {
        return a("downplay");
      });
      var a = function(o) {
        var s = i.visualMapModel;
        s.option.hoverLink && i.api.dispatchAction({
          type: o,
          batch: Ts(s.findTargetDataIndices(n), s)
        });
      };
    }, t.prototype._getItemAlign = function() {
      var r = this.visualMapModel, n = r.option;
      if (n.orient === "vertical")
        return Z0(r, this.api, r.itemSize);
      var i = n.align;
      return (!i || i === "auto") && (i = "left"), i;
    }, t.prototype._renderEndsText = function(r, n, i, a, o) {
      if (n) {
        var s = new Mt(), l = this.visualMapModel.textStyleModel;
        s.add(new Lt({
          style: Xe(l, {
            x: a ? o === "right" ? i[0] : 0 : i[0] / 2,
            y: i[1] / 2,
            verticalAlign: "middle",
            align: a ? o : "center",
            text: n
          })
        })), r.add(s);
      }
    }, t.prototype._getViewData = function() {
      var r = this.visualMapModel, n = U(r.getPieceList(), function(s, l) {
        return {
          piece: s,
          indexInModelPieceList: l
        };
      }), i = r.get("text"), a = r.get("orient"), o = r.get("inverse");
      return (a === "horizontal" ? o : !o) ? n.reverse() : i && (i = i.slice().reverse()), {
        viewPieceList: n,
        endsText: i
      };
    }, t.prototype._createItemSymbol = function(r, n, i, a) {
      var o = gr(
        // symbol will be string
        this.getControllerVisual(n, "symbol"),
        i[0],
        i[1],
        i[2],
        i[3],
        // color will be string
        this.getControllerVisual(n, "color")
      );
      o.silent = a, r.add(o);
    }, t.prototype._onItemClick = function(r) {
      var n = this.visualMapModel, i = n.option, a = i.selectedMode;
      if (a) {
        var o = q(i.selected), s = n.getSelectedMapKey(r);
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
  }(q0)
);
function v$(e) {
  e.registerComponentModel(h$), e.registerComponentView(f$), K0(e);
}
function d$(e) {
  je(u$), je(v$);
}
function Kg(e, t, r) {
  var n = Gr.createCanvas(), i = t.getWidth(), a = t.getHeight(), o = n.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", e)), n.width = i * r, n.height = a * r, n;
}
var fh = function(e) {
  B(t, e);
  function t(r, n, i) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    i = i || Bs, typeof r == "string" ? o = Kg(r, n, i) : V(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (xy(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = n, a.dpr = i, a;
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
    this.domBack = Kg("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
  }, t.prototype.createRepaintRects = function(r, n, i, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new ut(0, 0, 0, 0);
    function h(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new ut(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var b = !1, S = 1 / 0, w = 0, x = 0; x < o.length; ++x) {
            var M = o[x];
            if (M.intersect(m)) {
              var D = new ut(0, 0, 0, 0);
              D.copy(M), D.union(m), o[x] = D, b = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(M);
              var A = m.width * m.height, T = M.width * M.height, L = u.width * u.height, $ = L - A - T;
              $ < S && (S = $, w = x);
            }
          }
          if (l && (o[w].union(m), b = !0), !b) {
            var _ = new ut(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var c = this.__startIndex; c < this.__endIndex; ++c) {
      var f = r[c];
      if (f) {
        var v = f.shouldBePainted(i, a, !0, !0), d = f.__isRendered && (f.__dirty & oe || !v) ? f.getPrevPaintRect() : null;
        d && h(d);
        var g = v && (f.__dirty & oe || !f.__isRendered) ? f.getPaintRect() : null;
        g && h(g);
      }
    }
    for (var c = this.__prevStartIndex; c < this.__prevEndIndex; ++c) {
      var f = n[c], v = f && f.shouldBePainted(i, a, !0, !0);
      if (f && (!v || !f.__zr) && f.__isRendered) {
        var d = f.getPrevPaintRect();
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
  }, t.prototype.resize = function(r, n) {
    var i = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = r + "px", o.height = n + "px"), a.width = r * i, a.height = n * i, s && (s.width = r * i, s.height = n * i, i !== 1 && this.ctxBack.scale(i, i));
  }, t.prototype.clear = function(r, n, i) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    n = n || this.clearColor;
    var u = this.motionBlur && !r, h = this.lastFrameAlpha, c = this.dpr, f = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / c, l / c));
    var v = this.domBack;
    function d(g, p, y, m) {
      if (o.clearRect(g, p, y, m), n && n !== "transparent") {
        var _ = void 0;
        if (ll(n)) {
          var b = n.global || n.__width === y && n.__height === m;
          _ = b && n.__canvasGradient || ec(o, n, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), n.__canvasGradient = _, n.__width = y, n.__height = m;
        } else R1(n) && (n.scaleX = n.scaleX || c, n.scaleY = n.scaleY || c, _ = rc(o, n, {
          dirty: function() {
            f.setUnpainted(), f.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || n, o.fillRect(g, p, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(v, g, p, y, m), o.restore());
    }
    !i || u ? d(0, 0, s, l) : i.length && C(i, function(g) {
      d(g.x * c, g.y * c, g.width * c, g.height * c);
    });
  }, t;
}(tr), jg = 1e5, _n = 314159, os = 0.01, p$ = 1e-3;
function g$(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function y$(e, t) {
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
var m$ = function() {
  function e(t, r, n, i) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = n = N({}, n || {}), this.dpr = n.devicePixelRatio || Bs, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (xy(t), t.innerHTML = ""), this.storage = r;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, c = h.width, f = h.height;
      n.width != null && (c = n.width), n.height != null && (f = n.height), this.dpr = n.devicePixelRatio || 1, h.width = c * this.dpr, h.height = f * this.dpr, this._width = c, this._height = f;
      var v = new fh(h, this, this.dpr);
      v.__builtin__ = !0, v.initContext(), l[_n] = v, v.zlevel = _n, s.push(_n), this._domRoot = t;
    } else {
      this._width = Yo(t, 0, n), this._height = Yo(t, 1, n);
      var u = this._domRoot = y$(this._width, this._height);
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
    var r = this.storage.getDisplayList(!0), n = this._prevDisplayList, i = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(r, n, t, this._redrawId);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = r.slice()), this;
  }, e.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, e.prototype._paintHoverList = function(t) {
    var r = t.length, n = this._hoverlayer;
    if (n && n.clear(), !!r) {
      for (var i = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < r; o++) {
        var s = t[o];
        s.__inHover && (n || (n = this._hoverlayer = this.getLayer(jg)), a || (a = n.ctx, a.save()), Mn(a, s, i, o === r - 1));
      }
      a && a.restore();
    }
  }, e.prototype.getHoverLayer = function() {
    return this.getLayer(jg);
  }, e.prototype.paintOne = function(t, r) {
    I_(t, r);
  }, e.prototype._paintList = function(t, r, n, i) {
    if (this._redrawId === i) {
      n = n || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, r, n), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        Ps(function() {
          l._paintList(t, r, n, i);
        });
      }
    }
  }, e.prototype._compositeManually = function() {
    var t = this.getLayer(_n).ctx, r = this._domRoot.width, n = this._domRoot.height;
    t.clearRect(0, 0, r, n), this.eachBuiltinLayer(function(i) {
      i.virtual && t.drawImage(i.dom, 0, 0, r, n);
    });
  }, e.prototype._doPaintList = function(t, r, n) {
    for (var i = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || n) && a.push(u);
    }
    for (var h = !0, c = !1, f = function(g) {
      var p = a[g], y = p.ctx, m = o && p.createRepaintRects(t, r, v._width, v._height), _ = n ? p.__startIndex : p.__drawIndex, b = !n && p.incremental && Date.now, S = b && Date.now(), w = p.zlevel === v._zlevelList[0] ? v._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, w, m);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || n) && p.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var M, D = function($) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: i._width,
          viewHeight: i._height
        };
        for (M = _; M < p.__endIndex; M++) {
          var R = t[M];
          if (R.__inHover && (c = !0), i._doPaintEl(R, p, o, $, P, M === p.__endIndex - 1), b) {
            var O = Date.now() - S;
            if (O > 15)
              break;
          }
        }
        P.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          M = p.__endIndex;
        else
          for (var A = v.dpr, T = 0; T < m.length; ++T) {
            var L = m[T];
            y.save(), y.beginPath(), y.rect(L.x * A, L.y * A, L.width * A, L.height * A), y.clip(), D(L), y.restore();
          }
      else
        y.save(), D(), y.restore();
      p.__drawIndex = M, p.__drawIndex < p.__endIndex && (h = !1);
    }, v = this, d = 0; d < a.length; d++)
      f(d);
    return X.wxa && C(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: c
    };
  }, e.prototype._doPaintEl = function(t, r, n, i, a, o) {
    var s = r.ctx;
    if (n) {
      var l = t.getPaintRect();
      (!i || l && l.intersect(i)) && (Mn(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Mn(s, t, a, o);
  }, e.prototype.getLayer = function(t, r) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = _n);
    var n = this._layers[t];
    return n || (n = new fh("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] ? ot(n, this._layerConfig[t], !0) : this._layerConfig[t - os] && ot(n, this._layerConfig[t - os], !0), r && (n.virtual = r), this.insertLayer(t, n), n.initContext()), n;
  }, e.prototype.insertLayer = function(t, r) {
    var n = this._layers, i = this._zlevelList, a = i.length, o = this._domRoot, s = null, l = -1;
    if (!n[t] && g$(r)) {
      if (a > 0 && t > i[0]) {
        for (l = 0; l < a - 1 && !(i[l] < t && i[l + 1] > t); l++)
          ;
        s = n[i[l]];
      }
      if (i.splice(l + 1, 0, t), n[t] = r, !r.virtual)
        if (s) {
          var u = s.dom;
          u.nextSibling ? o.insertBefore(r.dom, u.nextSibling) : o.appendChild(r.dom);
        } else
          o.firstChild ? o.insertBefore(r.dom, o.firstChild) : o.appendChild(r.dom);
      r.painter || (r.painter = this);
    }
  }, e.prototype.eachLayer = function(t, r) {
    for (var n = this._zlevelList, i = 0; i < n.length; i++) {
      var a = n[i];
      t.call(r, this._layers[a], a);
    }
  }, e.prototype.eachBuiltinLayer = function(t, r) {
    for (var n = this._zlevelList, i = 0; i < n.length; i++) {
      var a = n[i], o = this._layers[a];
      o.__builtin__ && t.call(r, o, a);
    }
  }, e.prototype.eachOtherLayer = function(t, r) {
    for (var n = this._zlevelList, i = 0; i < n.length; i++) {
      var a = n[i], o = this._layers[a];
      o.__builtin__ || t.call(r, o, a);
    }
  }, e.prototype.getLayers = function() {
    return this._layers;
  }, e.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(c, f) {
      c.__dirty = c.__used = !1;
    });
    function r(c) {
      a && (a.__endIndex !== c && (a.__dirty = !0), a.__endIndex = c);
    }
    if (this._singleCanvas)
      for (var n = 1; n < t.length; n++) {
        var i = t[n];
        if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, l;
    for (l = 0; l < t.length; l++) {
      var i = t[l], u = i.zlevel, h = void 0;
      s !== u && (s = u, o = 0), i.incremental ? (h = this.getLayer(u + p$, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? os : 0), this._needsManuallyCompositing), h.__builtin__ || Ec("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, r(l), a = h), i.__dirty & oe && !i.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    r(l), this.eachBuiltinLayer(function(c, f) {
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
      var n = this._layerConfig;
      n[t] ? ot(n[t], r, !0) : n[t] = r;
      for (var i = 0; i < this._zlevelList.length; i++) {
        var a = this._zlevelList[i];
        if (a === t || a === t + os) {
          var o = this._layers[a];
          ot(o, n[t], !0);
        }
      }
    }
  }, e.prototype.delLayer = function(t) {
    var r = this._layers, n = this._zlevelList, i = r[t];
    i && (i.dom.parentNode.removeChild(i.dom), delete r[t], n.splice(pt(n, t), 1));
  }, e.prototype.resize = function(t, r) {
    if (this._domRoot.style) {
      var n = this._domRoot;
      n.style.display = "none";
      var i = this._opts, a = this.root;
      if (t != null && (i.width = t), r != null && (i.height = r), t = Yo(a, 0, i), r = Yo(a, 1, i), n.style.display = "", this._width !== t || r !== this._height) {
        n.style.width = t + "px", n.style.height = r + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, r);
        this.refresh(!0);
      }
      this._width = t, this._height = r;
    } else {
      if (t == null || r == null)
        return;
      this._width = t, this._height = r, this.getLayer(_n).resize(t, r);
    }
    return this;
  }, e.prototype.clearLayer = function(t) {
    var r = this._layers[t];
    r && r.clear();
  }, e.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, e.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[_n].dom;
    var r = new fh("image", this, t.pixelRatio || this.dpr);
    r.initContext(), r.clear(!1, t.backgroundColor || this._backgroundColor);
    var n = r.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var i = r.dom.width, a = r.dom.height;
      this.eachLayer(function(c) {
        c.__builtin__ ? n.drawImage(c.dom, 0, 0, i, a) : c.renderToCanvas && (n.save(), c.renderToCanvas(n), n.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var h = s[l];
        Mn(n, h, o, l === u - 1);
      }
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
}();
function _$(e) {
  e.registerPainter("canvas", m$);
}
const b$ = [
  J2,
  GI,
  N2,
  dL,
  YL,
  OL,
  d$,
  _$
];
var w$ = Object.defineProperty, S$ = Object.getOwnPropertyDescriptor, Nf = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? S$(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && w$(t, r, i), i;
};
je(b$);
let so = class extends Ht {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".canvas");
    this.chart = HD(e, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(e), this.applyOption();
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
    return I`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
so.styles = ue`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
Nf([
  et({ attribute: !1 })
], so.prototype, "option", 2);
Nf([
  et({ type: String })
], so.prototype, "height", 2);
so = Nf([
  xe("ia-chart")
], so);
var x$ = Object.defineProperty, T$ = Object.getOwnPropertyDescriptor, zn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? T$(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && x$(t, r, i), i;
};
const Cs = ["pv_energy_total", "grid_import_total", "battery_discharge_total"], xc = ["load_energy_total", "grid_export_total", "battery_charge_total"], C$ = [...Cs, ...xc];
let yr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
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
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await $b(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderTotals(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return I`<div class="kpi">
      ${C$.filter((n) => n in e.totals).map(
      (n) => I`<div class="cell">
          <span class="label">${Ai(t, n)}</span>
          <span class="value">${Pt(e.totals[n], r)}</span>
          <span class="hint">
            ${Cs.includes(n) ? t.balance.intoSystem : t.balance.outOfIt}
          </span>
        </div>`
    )}
    </div>`;
  }
  renderBalance(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return e.unaccounted === null ? I`<p class="empty">
        ${t.balance.needsAllSix({
      missing: e.missing.map((n) => Ai(t, n)).join(", ")
    })}
      </p>` : I`
      <p class="balance">
        ${t.balance.inOut({
      in: Pt(e.sources_total, r),
      out: Pt(e.sinks_total, r)
    })}
        <strong>${Pt(Math.abs(e.unaccounted), r)}</strong>
        ${(e.unaccounted >= 0 ? t.balance.unaccountedFor : t.balance.moreOutThanIn)({
      share: Y(e.unaccounted_share, r)
    })}
      </p>
      <p class="note">${t.balance.unaccountedNote}</p>
    `;
  }
  renderRatios(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = e.totals, i = (a) => a in n;
    return e.self_sufficiency === null && e.self_consumption === null ? I`<p class="empty">${t.balance.ratiosNeedCounters}</p>` : I`<div class="kpi">
      ${e.self_sufficiency !== null ? I`<div class="cell">
            <span class="label">${t.common.selfSufficiency}</span>
            <span class="value">${Y(e.self_sufficiency, r)}</span>
            <span class="hint">
              ${i("load_energy_total") && i("grid_import_total") ? `(${Pt(n.load_energy_total, r)} − ${Pt(
      n.grid_import_total,
      r
    )}) ÷ ${Pt(n.load_energy_total, r)}` : ""}
            </span>
          </div>` : E}
      ${e.self_consumption !== null ? I`<div class="cell">
            <span class="label">${t.balance.selfConsumption}</span>
            <span class="value">${Y(e.self_consumption, r)}</span>
            <span class="hint">
              ${i("pv_energy_total") && i("grid_export_total") ? `(${Pt(n.pv_energy_total, r)} − ${Pt(
      n.grid_export_total,
      r
    )}) ÷ ${Pt(n.pv_energy_total, r)}` : ""}
            </span>
          </div>` : E}
    </div>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return I`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.balance.daysIn({ timezone: t.timezone })}</span>
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${!t.covers_whole_window && t.covered_end ? I`<span class="warn">
              ${e.balance.countedUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}
            </span>` : E}
        ${t.covered_end ? E : I`<span class="warn">${e.balance.noEnergyStatistics}</span>`}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      ${this.renderTotals(t)}

      <section>
        <h2>${e.balance.inAgainstOut}</h2>
        <ia-chart
          .option=${v1(t.totals, Cs, xc, e)}
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
        ${t.days.length ? I`<ia-chart
              .option=${d1(t.days, Cs, xc, e)}
            ></ia-chart>` : I`<p class="empty">${e.balance.noDays}</p>`}
        <p class="note">${e.balance.dayByDayNote}</p>
      </section>
    `;
  }
};
yr.styles = ue`
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
zn([
  et({ attribute: !1 })
], yr.prototype, "hass", 2);
zn([
  et({ type: String })
], yr.prototype, "entryId", 2);
zn([
  et({ type: String })
], yr.prototype, "range", 2);
zn([
  yt()
], yr.prototype, "payload", 2);
zn([
  yt()
], yr.prototype, "error", 2);
zn([
  yt()
], yr.prototype, "loading", 2);
yr = zn([
  xe("ia-balance-tab")
], yr);
const Yi = ue`
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
var M$ = Object.defineProperty, D$ = Object.getOwnPropertyDescriptor, Fl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? D$(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && M$(t, r, i), i;
};
let Ei = class extends Ht {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en", this.i18n = new Ne(this);
  }
  render() {
    const t = this.i18n.m.sections.charge, r = this.flow;
    return I`
      <section>
        <h2>${t.title}</h2>

        ${r.sign_looks_inverted ? I`<p class="warn">${t.signInverted}</p>` : E}

        <div class="cards">
          <div class="card">
            <span class="name">${t.meanChargePower}</span>
            <span class="value">${ft(r.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span
              ><span>${Y(r.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.meanDischargePower}</span>
            <span class="value">${ft(r.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span>
              <span>${Y(r.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.resting}</span>
            <span class="value">${Y(r.share_idle, this.locale)}</span>
            <span class="row">
              <span>${t.below}</span><span>${ft(r.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.discharged}</span>
            <span class="value">${Pt(r.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>${t.charged}</span><span>${Pt(r.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${r.round_trip_efficiency !== null ? I`<div class="card">
                <span class="name">${t.roundTripEfficiency}</span>
                <span class="value">
                  ${Y(r.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>${t.outOfWhatWentIn}</span></span>
              </div>` : E}
          <div class="card">
            <span class="name">${t.fullCyclesPerDay}</span>
            <span class="value">
              ${r.cycles_per_day === null ? it : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      r.cycles_per_day
    )}
            </span>
            ${r.cycles_per_day === null ? I`<span class="row"><span>${t.needsCapacity}</span></span>` : E}
          </div>
        </div>

        ${r.cycles_per_day === null && !this.hasCapacity ? I`<p class="note">${t.setCapacity}</p>` : E}

        ${r.energy_metered ? E : I`<p class="note">${t.integrated}</p>`}
        ${r.energy_metered && r.round_trip_efficiency === null ? I`<p class="note">
              ${t.noEfficiency}
              ${r.soc_drift_pct !== null && Math.abs(r.soc_drift_pct) > r.efficiency_max_drift_pct ? (r.soc_drift_pct < 0 ? t.driftBelow : t.driftAbove)({
      n: Math.abs(Math.round(r.soc_drift_pct))
    }) : t.tooLittle}
            </p>` : E}
      </section>
    `;
  }
};
Ei.styles = [Yi, ue`:host { display: block; }`];
Fl([
  et({ attribute: !1 })
], Ei.prototype, "flow", 2);
Fl([
  et({ type: Boolean })
], Ei.prototype, "hasCapacity", 2);
Fl([
  et({ type: String })
], Ei.prototype, "locale", 2);
Ei = Fl([
  xe("ia-charge-section")
], Ei);
var A$ = Object.defineProperty, I$ = Object.getOwnPropertyDescriptor, Fn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? I$(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && A$(t, r, i), i;
};
let mr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
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
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await Ib(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = e.dips_measurable, i = [
      [
        t.battery.meanCharge,
        Y(bn(e.kpi.mean_soc), r),
        t.battery.overWholePeriod
      ],
      [
        t.battery.lowestCharge,
        n ? Y(bn(e.kpi.min_soc), r) : it,
        n ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.below({ level: Y(bn(e.low_pct), r) }),
        n ? Kt(e.kpi.seconds_below_low, r) : it,
        n ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.dips,
        n ? String(e.kpi.dip_count) : it,
        n ? t.battery.lastingOverMinute : t.battery.needsExactData
      ],
      [
        t.battery.meanLowPoint,
        n ? Y(bn(e.kpi.mean_low_point), r) : it,
        n ? t.battery.acrossThoseDips : t.battery.needsExactData
      ]
    ];
    return I`<div class="kpi">
      ${i.map(
      ([a, o, s]) => I`<div class="cell">
          <span class="label">${a}</span>
          <span class="value">${o}</span>
          <span class="hint">${s}</span>
        </div>`
    )}
    </div>`;
  }
  renderEpisodes(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return e.dips_measurable ? e.episodes.length ? I`<table>
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
      (n) => I`<tr>
            <td>${new Date(n.start).toLocaleString(r)}</td>
            <td>${Kt(n.seconds, r)}</td>
            <td>${Y(bn(n.lowest), r)}</td>
            <td>${Y(bn(n.recovered_to), r)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : I`<p class="empty">
        ${t.battery.noEpisodes({ level: Y(bn(e.low_pct), r) })}
      </p>` : I`<p class="empty">${t.battery.dipsNotMeasurable}</p>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Va(t.coverage, r);
    return I`
      <div class="status">
        <span class="badge">${ol(t.precision, t.boundary, r)}</span>
        ${n ? I`<span class="warn">${n}</span>` : E}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${t.raw_from && t.dips_restricted && t.dips_measurable ? I`<span class="warn">
              ${e.battery.dipsCountedFrom({
      date: new Date(t.raw_from).toLocaleDateString(r)
    })}
            </span>` : E}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      ${this.renderKpi(t)}

      <section>
        <h2>${e.battery.timeAtSoc}</h2>
        <ia-chart .option=${l1(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.battery.chargeBands}</h2>
        <ia-chart .option=${u1(t.bands, e)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${e.battery.lowChargeEpisodes}</h2>
        ${this.renderEpisodes(t)}
      </section>

      ${t.power ? I`<ia-charge-section
            .flow=${t.power}
            .hasCapacity=${t.has_capacity}
            .locale=${r}
          ></ia-charge-section>` : I`<section>
            <h2>${e.sections.charge.title}</h2>
            <p class="empty">${e.battery.mapPowerSensor}</p>
          </section>`}
    `;
  }
};
mr.styles = ue`
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
Fn([
  et({ attribute: !1 })
], mr.prototype, "hass", 2);
Fn([
  et({ type: String })
], mr.prototype, "entryId", 2);
Fn([
  et({ type: String })
], mr.prototype, "range", 2);
Fn([
  yt()
], mr.prototype, "payload", 2);
Fn([
  yt()
], mr.prototype, "error", 2);
Fn([
  yt()
], mr.prototype, "loading", 2);
mr = Fn([
  xe("ia-battery-tab")
], mr);
function bn(e) {
  return e === null ? null : e / 100;
}
function j0(e) {
  return e.reserve_reason ?? "no_soc";
}
function L$(e) {
  const t = e.hours_left;
  return t == null ? { kind: "reason", reason: j0(e) } : t === 0 && e.below_low ? { kind: "didNotLast" } : { kind: "hours", hours: t };
}
function $$(e) {
  const t = e.needed_pct;
  return t == null ? { kind: "reason", reason: j0(e) } : t > 100 ? { kind: "over" } : { kind: "pct", pct: t };
}
function P$(e) {
  const t = e.worst_needed_pct, r = e.worst_start;
  return t === null || r === null ? { kind: "none" } : t > 100 ? { kind: "over", start: r } : { kind: "pct", pct: t, start: r };
}
function R$(e) {
  return e.judged === 0 ? { kind: "none" } : { kind: "count", covered: e.covered, judged: e.judged };
}
var O$ = Object.defineProperty, E$ = Object.getOwnPropertyDescriptor, Hn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? E$(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && O$(t, r, i), i;
};
function ya(e, t) {
  return e === null ? it : Kt(e * 3600, t);
}
const k$ = 24 * 3600 * 1e3;
function N$(e, t) {
  const r = new Date(e), n = new Date(new Date(t).getTime() - 1), i = (a) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  return Math.round((i(n) - i(r)) / k$) + 1;
}
let _r = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
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
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await Pb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = e.kpi, i = e.measured_seconds > 0, a = [
      [t.grid.outages, i ? `${n.count}` : it, ""],
      [
        t.grid.withoutGrid,
        i ? Kt(n.off_seconds, r) : it,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        n.bridged_seconds > 0 ? t.grid.unrecordedAssumedOff({
          duration: Kt(n.bridged_seconds, r)
        }) : ""
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      [t.grid.shareOfTime, hr(n.off_share, r), t.grid.ofMeasuredTime],
      [
        t.grid.longest,
        n.longest_seconds === null ? it : Kt(n.longest_seconds, r),
        n.longest_start ? t.grid.fromTime({ time: new Date(n.longest_start).toLocaleString(r) }) : ""
      ],
      [
        t.grid.meanDuration,
        n.mean_seconds === null ? it : Kt(n.mean_seconds, r),
        ""
      ]
    ];
    return n.brief_interruptions !== null && a.push([t.grid.briefInterruptions, `${n.brief_interruptions}`, t.grid.underAMinute]), I`<div class="kpi">
      ${a.map(
      ([o, s, l]) => I`<div class="cell">
          <span class="label">${o}</span>
          <span class="value">${s}</span>
          <span class="hint">${l}</span>
        </div>`
    )}
    </div>`;
  }
  renderDuration(e) {
    const t = e.started_before_window || e.ongoing, r = Kt(e.seconds, this.i18n.locale);
    return t ? this.i18n.m.grid.atLeast({ duration: r }) : r;
  }
  renderEpisodes(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    if (!e.episodes.length)
      return I`<p class="empty">
        ${t.grid.noOutages({ duration: Kt(e.measured_seconds, r) })}
      </p>`;
    const n = (i) => i == null ? it : Y(i / 100, r);
    return I`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          ${e.has_soc ? I`<th>${t.grid.chargeAtStart}</th>
                <th>${t.grid.lowest}</th>
                <th>${t.grid.atEnd}</th>
                <th>${t.grid.hoursLeft}</th>
                <th>${t.grid.neededAtStart}</th>` : E}
          ${e.has_load ? I`<th>${t.common.meanLoad}</th>` : E}
        </tr>
      </thead>
      <tbody>
        ${e.episodes.map(
      (i) => I`<tr>
            <td>${new Date(i.start).toLocaleString(r)}</td>
            <td>
              ${this.renderDuration(i)}
              ${i.bridged_seconds > 0 ? I`<span class="hint"
                    >${t.grid.unrecorded({
        duration: Kt(i.bridged_seconds, r)
      })}</span
                  >` : E}
            </td>
            ${e.has_soc ? I`<td>${n(i.soc_start)}</td>
                  <td class=${i.below_low ? "low" : ""}>${n(i.soc_min)}</td>
                  <td>${n(i.soc_end)}</td>
                  <td>${this.renderHoursLeft(i)}</td>
                  <td>${this.renderNeeded(i)}</td>` : E}
            ${e.has_load ? I`<td>${ft(i.load_mean_w ?? null, r)}</td>` : E}
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  reserveReason(e) {
    const t = this.i18n.m.grid.reserveReasons;
    return I`<span class="hint">${t[e]}</span>`;
  }
  /** "> 100 %": the need is past what a full battery holds. */
  overFull() {
    return I`<span class="low">&gt; ${Y(1, this.i18n.locale)}</span>`;
  }
  renderHoursLeft(e) {
    const t = L$(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "didNotLast":
        return I`<span class="low">${this.i18n.m.grid.didNotLast}</span>`;
      case "hours":
        return ya(t.hours, this.i18n.locale);
    }
  }
  renderNeeded(e) {
    const t = $$(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "over":
        return I`${this.overFull()}
          <span class="hint">${this.i18n.m.grid.moreThanFull}</span>`;
      case "pct":
        return Y(t.pct / 100, this.i18n.locale);
    }
  }
  renderHardest(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = P$(e);
    if (n.kind === "none")
      return I`<span class="value">${it}</span>
        <span class="row"><span>${t.grid.noHardestOutage}</span></span>`;
    const i = t.grid.hardestOutageOn({
      date: new Date(n.start).toLocaleDateString(r)
    });
    return n.kind === "over" ? I`<span class="value">${this.overFull()}</span>
          <span class="row"><span>${i}</span><span>${t.grid.moreThanFull}</span></span>` : I`<span class="value">${Y(n.pct / 100, r)}</span>
          <span class="row"><span>${i}</span></span>`;
  }
  renderReserve(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = R$(e);
    return I`
      <div class="cards">
        <div class="card">
          <span class="name">${r.grid.hardestOutageNeeds}</span>
          ${this.renderHardest(e)}
        </div>
        <div class="card">
          <span class="name">${r.grid.outagesCovered}</span>
          <span class="value"
            >${i.kind === "none" ? it : r.grid.coveredOf({ covered: i.covered, judged: i.judged })}</span
          >
          <span class="row"
            ><span>${r.grid.coveredHint({ level: Y(t / 100, n) })}</span></span
          >
        </div>
      </div>
      <p class="note">${r.grid.reserveNote}</p>
    `;
  }
  renderAutonomy(e, t) {
    const r = this.i18n.m, n = this.i18n.locale;
    if (e.reason !== null) {
      const a = {
        ...r.grid.autonomyReasons,
        too_little_evidence: r.grid.tooLittleEvidence({
          hours: ya(e.evidence_hours, n)
        })
      };
      return I`<p class="note">${r.grid.noAutonomy} ${a[e.reason]}</p>`;
    }
    const i = e.rate_pct_per_hour;
    return I`
      <div class="cards">
        <div class="card">
          <span class="name"
            >${r.grid.fromFullTo({ level: Y(t / 100, n) })}</span
          >
          <span class="value">${ya(e.hours_from_full, n)}</span>
        </div>
        <div class="card">
          <span class="name">${r.grid.fromNow}</span>
          <span class="value">${ya(e.hours_from_now, n)}</span>
          <span class="row">
            <span>${r.grid.chargeNow}</span>
            <span
              >${e.soc_now === null ? it : Y(e.soc_now / 100, n)}</span
            >
          </span>
        </div>
        <div class="card">
          <span class="name">${r.grid.dischargeRate}</span>
          <span class="value"
            >${i === null ? it : r.grid.pointsPerHour({ rate: Xb(i, r.charts.locale) })}</span
          >
          <span class="row">
            <span>${r.common.meanLoad}</span>
            <span>${ft(e.load_mean_w, n)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        ${r.grid.evidenceNote({ hours: ya(e.evidence_hours, n) })}
      </p>
    `;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Va(t.coverage, r), i = t.days.length === 0, a = N$(t.counted_from ?? t.window.start, t.window.end) - t.days.length, o = t.counted_from ? new Date(t.counted_from).toLocaleDateString(r) : null;
    return I`
      <div class="status">
        <span class="badge">${ol(t.precision, t.boundary, r)}</span>
        ${o ? I`<span class="warn">
              ${t.source === "inferred" ? e.grid.countedFromInferred({ date: o }) : e.grid.countedFromNoHistory({ date: o })}
            </span>` : E}
        ${n ? I`<span class="warn">${n}</span>` : E}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      ${t.source === "inferred" ? I`<p class="banner">${e.grid.inferredBanner}</p>` : E}

      ${this.renderKpi(t)}

      <section>
        <h2>${e.grid.hoursByDay}</h2>
        ${i ? I`<p class="empty">${e.grid.noDaysWithData}</p>` : I`<ia-chart
                .option=${p1(t.days, e)}
                height="220px"
              ></ia-chart>
              ${a > 0 ? I`<p class="note">${e.grid.missingDays({ n: a })}</p>` : E}`}
      </section>

      <section>
        <h2>${e.grid.shareByHour}</h2>
        <ia-chart .option=${g1(t.hours, e)} height="220px"></ia-chart>
        <p class="note">${e.grid.hoursNeverRecorded}</p>
      </section>

      <section>
        <h2>${e.grid.outages}</h2>
        ${this.renderEpisodes(t)}
      </section>

      <section>
        <h2>${e.grid.autonomy}</h2>
        ${this.renderAutonomy(t.autonomy, t.low_pct)}
        ${t.has_soc ? this.renderReserve(t.reserve, t.low_pct) : E}
      </section>
    `;
  }
};
_r.styles = [
  Yi,
  ue`
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
Hn([
  et({ attribute: !1 })
], _r.prototype, "hass", 2);
Hn([
  et({ type: String })
], _r.prototype, "entryId", 2);
Hn([
  et({ type: String })
], _r.prototype, "range", 2);
Hn([
  yt()
], _r.prototype, "payload", 2);
Hn([
  yt()
], _r.prototype, "error", 2);
Hn([
  yt()
], _r.prototype, "loading", 2);
_r = Hn([
  xe("ia-grid-tab")
], _r);
const B$ = 0.02, z$ = 3, Q0 = 20, F$ = 6, J0 = 10, tb = 5, eb = 1, H$ = 100, V$ = 0.8, Qg = [
  { key: "capacity", signals: ["capacity"] },
  { key: "efficiency", signals: ["efficiency"] },
  { key: "solar", signals: ["solar_energy", "best_hour"] },
  { key: "inverter", signals: ["inverter"] }
], rb = 12;
function Tc(e, t) {
  return e.months[t]?.value ?? null;
}
function G$(e) {
  const [t, r] = e.split("-");
  return `${Number(t) - 1}-${r}`;
}
function W$(e, t) {
  const r = e.signals[t];
  return [...new Set(e.months.map((i) => Number(i.slice(0, 4))))].sort(
    (i, a) => i - a
  ).map((i) => ({
    year: i,
    values: Array.from(
      { length: rb },
      (a, o) => Tc(r, `${i}-${String(o + 1).padStart(2, "0")}`)
    )
  }));
}
function U$(e, t) {
  const r = e.signals[t];
  return e.months.slice(-rb).map((n) => {
    const i = Tc(r, n), a = Tc(r, G$(n));
    let o = null, s = null;
    return i !== null && a !== null && (o = i - a, a !== 0 && (s = o / a)), {
      key: n,
      value: i,
      reason: r.months[n]?.reason ?? null,
      previousValue: a,
      difference: o,
      share: s
    };
  });
}
function Y$(e) {
  const { recent_mean: t, previous_mean: r, change: n, recent_months: i, previous_months: a } = e.comparison;
  return t === null || r === null || n === null ? {
    kind: "notEnough",
    recent: i,
    previous: a,
    needed: F$
  } : {
    kind: "figure",
    recent: t,
    previous: r,
    change: n,
    share: r === 0 ? null : n / r
  };
}
function X$(e) {
  return e.best_hour_mode === "all" && e.export_limited === !1 ? "exporting" : e.best_hour_mode;
}
function q$(e) {
  return e.export_limited === !0 ? "household" : "array";
}
function ci(e, t, r) {
  return new Intl.NumberFormat(r, {
    maximumFractionDigits: t,
    signDisplay: "exceptZero"
  }).format(e);
}
function ss(e, t, r, n) {
  if (t === null) return it;
  switch (e) {
    case "capacity":
    case "solar_energy":
      return Pt(t, n);
    case "efficiency":
      return Y(t, n);
    case "best_hour":
      return ft(t, n);
    case "inverter":
      return `${new Intl.NumberFormat(n, { maximumFractionDigits: 1 }).format(t)} ${r.units.h}`;
  }
}
function Jg(e, t, r, n) {
  if (t === null) return it;
  switch (e) {
    case "capacity":
    case "solar_energy":
      return `${ci(t, 1, n)} ${r.units.kwh}`;
    case "efficiency":
      return `${ci(t * 100, 1, n)} ${r.units.pp}`;
    case "best_hour":
      return Math.abs(t) >= 1e3 ? `${ci(t / 1e3, 1, n)} ${r.units.kw}` : `${ci(t, 0, n)} ${r.units.w}`;
    case "inverter":
      return `${ci(t, 1, n)} ${r.units.h}`;
  }
}
function ty(e, t) {
  return e === null ? it : `${ci(e * 100, 1, t)}%`;
}
function Z$(e, t, r) {
  const n = W$(e, t), i = (a) => n.map((o) => ({
    year: o.year,
    values: o.values.map((s) => s === null ? null : s * a)
  }));
  switch (t) {
    case "capacity":
    case "solar_energy":
      return { lines: n, unit: r.units.kwh };
    case "efficiency":
      return { lines: i(100), unit: "%" };
    case "best_hour":
      return { lines: i(1 / 1e3), unit: r.units.kw };
    case "inverter":
      return { lines: n, unit: r.units.h };
  }
}
function K$(e, t, r, n) {
  return t !== "capacity" || e.nameplate_kwh === null ? null : {
    value: e.nameplate_kwh,
    name: r.health.nameplate({ value: Pt(e.nameplate_kwh, n) })
  };
}
function Ms(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 2 }).format(e);
}
function j$(e, t, r, n) {
  const i = e.health.reasons;
  switch (t) {
    case "too_few_clean_hours":
      return i.too_few_clean_hours({
        n: r?.clean_hours ?? 0,
        minHours: Q0
      });
    case "no_soc":
      return i.no_soc;
    case "counters_partial":
      return i.counters_partial;
    case "soc_partial":
      return i.soc_partial;
    case "drift":
      return i.drift({ points: Ms(tb, n) });
    case "too_little_throughput":
      return i.too_little_throughput({ min: Pt(eb, n) });
    case "partial_month":
      return i.partial_month;
    case "curtailed":
      return i.curtailed({
        n: r?.unconstrained_hours ?? 0,
        minHours: J0
      });
  }
}
function Q$(e, t) {
  const r = e.health.definitions;
  return {
    capacity: r.capacity({
      charge: `${Ms(B$, t)} ${e.units.kwh}`,
      drop: Ms(z$, t),
      minHours: Q0
    }),
    efficiency: r.efficiency({
      points: Ms(tb, t),
      min: Pt(eb, t)
    }),
    solar: r.solar({
      minHours: J0,
      minPower: ft(H$, t)
    }),
    inverter: r.inverter({ share: Y(V$, t) })
  };
}
var J$ = Object.defineProperty, tP = Object.getOwnPropertyDescriptor, Xi = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? tP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && J$(t, r, i), i;
};
let Ur = class extends Ht {
  constructor() {
    super(...arguments), this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
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
    e.has("entryId") && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const t = await Ob(this.hass, this.entryId);
      if (e !== this.requestId) return;
      this.payload = t;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  /** The roles a signal is short of, in the Sizing cards' words. */
  renderMissing(e) {
    const t = this.i18n.m, r = e.length === 1 && e[0] === "rated_power";
    return I`<p class="note">
      ${r ? t.sizing.needsNotSet({ roles: Pn(t, e, !0) }) : t.sizing.needsNotMapped({ roles: Pn(t, e, !0), n: e.length })}
    </p>`;
  }
  renderComparison(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = Y$(e.signals[t]);
    return i.kind === "notEnough" ? I`<div class="figure">
        <span class="label">${r.health.lastTwelve}</span>
        <p class="note">
          ${r.health.notEnough({
      recent: i.recent,
      previous: i.previous,
      needed: i.needed
    })}
        </p>
      </div>` : I`<div class="figure">
      <span class="label">${r.health.lastTwelve}</span>
      <span class="value">${ss(t, i.recent, r, n)}</span>
      <span class="row">
        <span
          >${r.health.twelveBefore({
      value: ss(t, i.previous, r, n)
    })}</span
        >
        <span
          >${Jg(t, i.change, r, n)}
          (${ty(i.share, n)})</span
        >
      </span>
      <span class="hint">${r.health.meanOfMonthly}</span>
    </div>`;
  }
  renderTable(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = U$(e, t), a = e.signals[t].months;
    return I`<div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${r.health.columns.month}</th>
            <th>${r.health.columns.value}</th>
            <th>${r.health.columns.previous}</th>
            <th>${r.health.columns.difference}</th>
            <th>${r.health.columns.share}</th>
          </tr>
        </thead>
        <tbody>
          ${i.map((o) => {
      const s = a[o.key];
      return I`<tr>
              <td>${Ga(o.key, void 0, n)}</td>
              <td>
                ${ss(t, o.value, r, n)}
                ${o.reason !== null ? I`<span class="hint">${j$(r, o.reason, s, n)}</span>` : E}
                ${t === "inverter" && s?.measured_hours !== void 0 ? I`<span class="hint"
                      >${r.health.inverterHint({
        atRated: `${s.hours_at_rated ?? 0}`,
        measured: `${s.measured_hours}`
      })}</span
                    >` : E}
              </td>
              <td>${ss(t, o.previousValue, r, n)}</td>
              <td>${Jg(t, o.difference, r, n)}</td>
              <td>${ty(o.share, n)}</td>
            </tr>`;
    })}
        </tbody>
      </table>
    </div>`;
  }
  /** The captions a signal's chart carries beneath it. */
  renderCaptions(e, t) {
    const r = this.i18n.m;
    return t === "capacity" && e.nameplate_kwh !== null ? I`<p class="note">${r.health.nameplateNote}</p>` : t === "solar_energy" ? I`<p class="note">${r.health.energyCaption[q$(e)]}</p>` : t === "best_hour" ? I`<p class="note">${r.health.bestHourCaption[X$(e)]}</p>` : E;
  }
  renderSignal(e, t, r) {
    const n = this.i18n.m, i = this.i18n.locale, a = e.signals[t], o = r ? I`<h3>${n.health.signals[t]}</h3>` : E;
    if (a.missing.length)
      return I`${o}${this.renderMissing(a.missing)}`;
    const { lines: s, unit: l } = Z$(e, t, n);
    return I`
      ${o} ${this.renderComparison(e, t)}
      <ia-chart
        .option=${y1(s, l, n, K$(e, t, n, i))}
        height="240px"
      ></ia-chart>
      ${this.renderCaptions(e, t)} ${this.renderTable(e, t)}
    `;
  }
  renderCard(e, t, r) {
    const n = this.i18n.m;
    return I`<section>
      <h2>${n.health.cards[t]}</h2>
      ${r.map((i) => this.renderSignal(e, i, r.length > 1))}
    </section>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Q$(e, r);
    return I`
      <div class="status">
        <span class="badge"
          >${t.first_month ? e.health.wholeHistory({ month: Ga(t.first_month, void 0, r) }) : e.health.wholeHistoryEmpty}</span
        >
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${!t.covers_now && t.covered_end ? I`<span class="warn"
              >${e.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}</span
            >` : E}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      ${Qg.map(({ key: i, signals: a }) => this.renderCard(t, i, a))}

      <section>
        <h2>${e.health.howRead}</h2>
        ${Qg.map(({ key: i }) => I`<p class="note">${n[i]}</p>`)}
        <p class="note">${e.health.caveats.bms}</p>
        <p class="note">${e.health.caveats.weather}</p>
      </section>
    `;
  }
};
Ur.styles = [
  Yi,
  ue`
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
      .figure {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 12px;
      }
      .figure .label,
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .figure .value {
        font-size: 20px;
        font-weight: 500;
      }
      .figure .row {
        justify-content: flex-start;
        gap: 16px;
      }
      .figure .note {
        margin: 0;
      }
      td .hint {
        display: block;
        font-weight: 400;
      }
      .table-wrap {
        overflow-x: auto;
      }
      .notice {
        padding: 24px;
        color: var(--secondary-text-color);
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
Xi([
  et({ attribute: !1 })
], Ur.prototype, "hass", 2);
Xi([
  et({ type: String })
], Ur.prototype, "entryId", 2);
Xi([
  yt()
], Ur.prototype, "payload", 2);
Xi([
  yt()
], Ur.prototype, "error", 2);
Xi([
  yt()
], Ur.prototype, "loading", 2);
Ur = Xi([
  xe("ia-health-tab")
], Ur);
var eP = Object.defineProperty, rP = Object.getOwnPropertyDescriptor, Hl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? rP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && eP(t, r, i), i;
};
let ki = class extends Ht {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Ne(this);
  }
  renderCards() {
    const e = this.i18n.m, t = e.sections.phases, { rating_per_phase: r } = this.phases;
    return I`<div class="cards">
      ${this.phases.per_phase.map((n) => {
      const i = this.series[n.key]?.coverage;
      return I`<div class="card">
          <span class="name">${Ls(e, n)}</span>
          <span class="value">${ft(n.mean, this.locale)}</span>
          <span class="row"
            ><span>${e.common.peak}</span
            ><span>${ft(n.peak, this.locale)}</span></span
          >
          <span class="row"
            ><span>P95</span><span>${ft(n.p95, this.locale)}</span></span
          >
          <span class="row"
            ><span>${t.shareOfLoad}</span
            ><span>${Y(n.share, this.locale)}</span></span
          >
          <span class="row">
            <span>${t.peakVs({ rating: ft(r, this.locale) })}</span>
            <span>${Y(n.headroom, this.locale)}</span>
          </span>
          ${i !== void 0 && i < 0.95 ? I`<span class="warn">
                ${e.common.coversOfPeriod({ share: hr(i, this.locale) })}
              </span>` : E}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const e = this.i18n.m, t = e.sections.phases, { imbalance: r } = this.phases;
    return r.mean === null ? I`<p class="empty">
        ${t.neverAboveFloor({ floor: ft(r.floor_w, this.locale) })}
      </p>` : I`
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
      <ia-chart .option=${o1(r, e)}></ia-chart>
      <p class="note">
        ${t.measuredOver({
      duration: Kt(r.analysed_seconds, this.locale),
      share: hr(r.coverage, this.locale)
    })}${r.below_floor_seconds > 0 ? I` ${t.belowFloorExcluded({
      duration: Kt(r.below_floor_seconds, this.locale),
      floor: ft(r.floor_w, this.locale)
    })}` : E}
      </p>
    `;
  }
  renderEpisodes() {
    const e = this.i18n.m, { episodes: t, per_phase: r } = this.phases;
    return t.length ? I`<table>
      <thead>
        <tr>
          <th>${e.common.start}</th>
          <th>${e.common.duration}</th>
          <th>${e.sections.phases.worst}</th>
          ${r.map((n) => I`<th>${Ls(e, n)}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${t.map(
      (n) => I`<tr>
            <td>${new Date(n.start).toLocaleString(this.locale)}</td>
            <td>${Kt(n.seconds, this.locale)}</td>
            <td>${Y(n.peak_imbalance, this.locale)}</td>
            ${n.phases.map((i) => I`<td>${ft(i, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : I`<p class="empty">${e.sections.phases.noSustained}</p>`;
  }
  render() {
    const { imbalance: e, rating_per_phase: t, rating_per_phase_derived: r, rating_per_phase_divisor: n } = this.phases, i = this.i18n.m.sections.phases;
    return I`
      <section>
        <h2>${i.title}</h2>
        ${this.renderCards()}
        ${r ? I`<p class="note">
              ${i.derivedRating({
      n,
      rating: ft(t, this.locale)
    })}
            </p>` : E}
        ${e.aligned_coverage < 0.95 ? I`<p class="warn">
              ${i.alignedLow({ share: hr(e.aligned_coverage, this.locale) })}
            </p>` : E}

        <h3>${i.imbalance}</h3>
        ${this.renderImbalance()}

        <h3>${i.sustainedEpisodes}</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
ki.styles = [Yi, ue`:host { display: block; }`];
Hl([
  et({ attribute: !1 })
], ki.prototype, "phases", 2);
Hl([
  et({ attribute: !1 })
], ki.prototype, "series", 2);
Hl([
  et({ type: String })
], ki.prototype, "locale", 2);
ki = Hl([
  xe("ia-phases-section")
], ki);
var nP = Object.defineProperty, iP = Object.getOwnPropertyDescriptor, Vl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? iP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && nP(t, r, i), i;
};
let Ni = class extends Ht {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Ne(this);
  }
  render() {
    const e = this.i18n.m, t = e.sections.strings, { parts: r, aligned_coverage: n } = this.strings;
    return I`
      <section>
        <h2>${t.title}</h2>
        <div class="cards">
          ${r.map((i) => {
      const a = this.series[i.key]?.coverage;
      return I`<div class="card">
              <span class="name">${Ls(e, i)}</span>
              <span class="value">${ft(i.mean, this.locale)}</span>
              <span class="row"
                ><span>${e.common.peak}</span
                ><span>${ft(i.peak, this.locale)}</span></span
              >
              <span class="row"
                ><span>${t.shareOfPv}</span
                ><span>${Y(i.share, this.locale)}</span></span
              >
              ${a !== void 0 && a < 0.95 ? I`<span class="warn">
                    ${e.common.coversOfPeriod({ share: hr(a, this.locale) })}
                  </span>` : E}
            </div>`;
    })}
        </div>
        <ia-chart .option=${s1(r, at.pv, e)}></ia-chart>
        ${n < 0.95 ? I`<p class="warn">
              ${t.alignedLow({ share: hr(n, this.locale) })}
            </p>` : E}
        <p class="note">${t.compare}</p>
      </section>
    `;
  }
};
Ni.styles = [Yi, ue`:host { display: block; }`];
Vl([
  et({ attribute: !1 })
], Ni.prototype, "strings", 2);
Vl([
  et({ attribute: !1 })
], Ni.prototype, "series", 2);
Vl([
  et({ type: String })
], Ni.prototype, "locale", 2);
Ni = Vl([
  xe("ia-strings-section")
], Ni);
var aP = Object.defineProperty, oP = Object.getOwnPropertyDescriptor, Xr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? oP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && aP(t, r, i), i;
};
let Qe = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.i18n = new Ne(this), this.requestId = 0;
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
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await Ab(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
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
    if (!e?.beyond_margin) return E;
    const r = this.i18n.locale;
    return I`<span class="warn">
      ${t({
      total: ft(e.total_mean, r),
      partsTotal: ft(e.parts_mean, r)
    })}
    </span>`;
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = (a) => a === null ? "" : t.load.shareOfRated({ share: Y(a / e.rated_power, r) }), i = [
      [t.load.mean, ft(e.kpi.mean, r), n(e.kpi.mean)],
      [t.load.median, ft(e.kpi.median, r), ""],
      ["P95", ft(e.kpi.p95, r), ""],
      [t.common.peak, ft(e.kpi.max, r), n(e.kpi.max)],
      [t.load.sustained15m, ft(e.kpi.max_sustained_15m, r), ""],
      [
        t.load.above80OfRated,
        Y(e.kpi.fraction_above_80pct, r),
        t.load.ofTime
      ]
    ];
    return I`<div class="kpi">
      ${i.map(
      ([a, o, s]) => I`<div class="cell">
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
      return I`<p class="empty">${t.load.noOverloads}</p>`;
    const r = this.i18n.locale;
    return I`<table>
      <thead>
        <tr><th>${t.common.start}</th><th>${t.common.duration}</th><th>${t.common.peak}</th></tr>
      </thead>
      <tbody>
        ${e.overloads.map(
      (n) => I`<tr>
            <td>${new Date(n.start).toLocaleString(r)}</td>
            <td>${Kt(n.seconds, r)}</td>
            <td>${ft(n.peak, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return I`
      <div class="status">
        <span class="badge">${ol(t.precision, t.boundary, r)}</span>
        ${Va(t.coverage, r) ? I`<span class="warn">${Va(t.coverage, r)}</span>` : E}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${t.histogram.clipped_low_seconds + t.histogram.clipped_high_seconds > 0 ? I`<span class="warn">${e.load.histogramClipped}</span>` : E}
        ${this.renderConsistency(t.consistency.load, e.load.loadConsistency)}
        ${this.renderConsistency(t.consistency.pv, e.load.pvConsistency)}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      ${this.renderKpi(t)}

      <section>
        <header>
          <h2>${e.load.timeAtPowerLevel}</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? e.load.asPercentOfRated : e.load.inWatts}</button>
        </header>
        <ia-chart .option=${n1(t, this.mode, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.durationCurve}</h2>
        <ia-chart .option=${i1(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.ratedBands}</h2>
        <ia-chart .option=${a1(t, e)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${e.load.overloadEpisodes}</h2>
        ${this.renderOverloads(t)}
      </section>

      ${t.phases ? I`<ia-phases-section
            .phases=${t.phases}
            .series=${t.series}
            .locale=${r}
          ></ia-phases-section>` : E}

      ${t.strings ? I`<ia-strings-section
            .strings=${t.strings}
            .series=${t.series}
            .locale=${r}
          ></ia-strings-section>` : E}
    `;
  }
};
Qe.styles = ue`
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
Xr([
  et({ attribute: !1 })
], Qe.prototype, "hass", 2);
Xr([
  et({ type: String })
], Qe.prototype, "entryId", 2);
Xr([
  et({ type: String })
], Qe.prototype, "range", 2);
Xr([
  yt()
], Qe.prototype, "payload", 2);
Xr([
  yt()
], Qe.prototype, "error", 2);
Xr([
  yt()
], Qe.prototype, "loading", 2);
Xr([
  yt()
], Qe.prototype, "mode", 2);
Qe = Xr([
  xe("ia-load-tab")
], Qe);
var sP = Object.defineProperty, lP = Object.getOwnPropertyDescriptor, Vn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? lP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && sP(t, r, i), i;
};
let br = class extends Ht {
  constructor() {
    super(...arguments), this.range = "year", this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
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
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await Lb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  renderMonthTable(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = e.months.map((i) => i.key);
    return I`<table>
      <thead>
        <tr>
          <th>${t.seasonality.month}</th>
          <th>${t.common.meanLoad}</th>
          <th>${t.seasonality.busiestHour}</th>
          ${e.has_pv ? I`<th>${t.seasonality.meanPv}</th>` : E}
          <th>${t.seasonality.ofTheMonth}</th>
        </tr>
      </thead>
      <tbody>
        ${e.months.map(
      (i, a) => I`<tr class=${i.complete ? "" : "partial"}>
            <td>${Ga(i.key, n[a - 1], t.charts.locale)}</td>
            <td>${ft(i.load_mean, r)}</td>
            <td>${ft(i.load_peak_hourly, r)}</td>
            ${e.has_pv ? I`<td>${ft(i.pv_mean, r)}</td>` : E}
            <td>${Y(i.coverage, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Va(t.coverage, r), i = t.months.filter((o) => !o.complete && o.load_mean !== null), a = t.months.filter((o) => o.load_mean === null);
    return I`
      <div class="status">
        <span class="badge">${ol(t.precision, t.boundary, r)}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${n ? I`<span class="warn">${n}</span>` : E}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      <section>
        <h2>${e.seasonality.meanByMonth}</h2>
        <ia-chart .option=${h1(t.months, t.has_pv, e)}></ia-chart>
        ${i.length ? I`<p class="note">
              ${e.seasonality.thinMonths({
      n: i.length,
      share: Y(t.incomplete_below, r)
    })}
              ${e.seasonality.partialNotLower}
            </p>` : E}
        ${a.length ? I`<p class="note">
              ${e.seasonality.absentMonths({ n: a.length })}
              ${e.seasonality.statisticsFromStart}
            </p>` : E}
      </section>

      <section>
        <h2>${e.seasonality.monthByMonth}</h2>
        ${this.renderMonthTable(t)}
        <p class="note">${e.seasonality.busiestHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.meanByHour}</h2>
        <ia-chart .option=${c1(t.hours, t.has_pv, e)}></ia-chart>
        <p class="note">${e.seasonality.byHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.hourByMonth}</h2>
        <ia-chart
          .option=${f1(t.cells, t.months, e)}
          height="420px"
        ></ia-chart>
        <p class="note">${e.seasonality.heatmapNote}</p>
      </section>
    `;
  }
};
br.styles = ue`
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
Vn([
  et({ attribute: !1 })
], br.prototype, "hass", 2);
Vn([
  et({ type: String })
], br.prototype, "entryId", 2);
Vn([
  et({ type: String })
], br.prototype, "range", 2);
Vn([
  yt()
], br.prototype, "payload", 2);
Vn([
  yt()
], br.prototype, "error", 2);
Vn([
  yt()
], br.prototype, "loading", 2);
br = Vn([
  xe("ia-seasonality-tab")
], br);
function ey(e, t) {
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
function ry(e, t, r, n) {
  return t === "battery" && r === "never_full" ? n === "ceiling" ? e.verdict.neverReachedLimit : e.verdict.neverFull : t === "solar" && r === "no_fill" ? e.verdict.noFill : e.verdict.noData[t];
}
function uP(e, t, r, n) {
  return t === "battery" && r === "never_full" ? n === "ceiling" ? e.verdict.hintLimitNotReached : e.verdict.hintNeverFilled : t === "solar" && r === "no_fill" ? e.verdict.hintNoFill : e.verdict.hintNoData;
}
function hP(e) {
  const t = e.period.solar;
  if (t) return typeof t.evidence.fill_share == "number";
  const r = e.cards.battery;
  return !r.missing.length && !r.thresholds_inverted;
}
function cP(e) {
  return e.rules.export_limited === !0 ? e.rules.full_mode === "ceiling" ? "no_export" : "no_export_fixed" : hP(e) ? "with_fill" : "plain";
}
function fP(e, t, r) {
  if (t.cards.battery.missing.includes("battery_soc")) return null;
  const n = t.rules;
  if (n.full_mode === "ceiling") return e.sizing.fullModeCeiling;
  const i = n.ceiling_missing ?? [];
  if (i.length)
    return e.sizing.fullModeFixed({ full: r, roles: Pn(e, i, !0), n: i.length });
  const a = n.ceiling_no_rows ?? [];
  return a.length ? e.sizing.fullModeNoRows({ full: r, roles: Pn(e, a, !0), n: a.length }) : e.sizing.fullModePlain({ full: r });
}
var vP = Object.defineProperty, dP = Object.getOwnPropertyDescriptor, Gn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? dP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && vP(t, r, i), i;
};
const pP = ["inverter", "battery", "solar"];
function gP(e, t) {
  const [r, n] = e.split("-").map(Number);
  return new Date(r, n - 1, 1).toLocaleDateString(t, {
    month: "short",
    year: "numeric"
  });
}
let wr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Ne(this), this.requestId = 0;
  }
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = Bi(this.range, /* @__PURE__ */ new Date()), n = await Rb(this.hass, this.entryId, t, r);
      if (e !== this.requestId) return;
      this.payload = n;
    } catch (t) {
      if (e !== this.requestId) return;
      this.error = t;
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  /** The one figure a rule turned on, for a month cell. */
  cellFigure(e, t, r) {
    const n = this.i18n.m, i = t.evidence;
    return e === "inverter" ? n.sizing.hoursAtRated({ hours: `${i.hours_at_rated ?? 0}` }) : e === "battery" ? n.sizing.daysOf({
      days: `${i.days_full_and_low ?? 0}`,
      total: i.days_with_data ?? 0
    }) : i.production_share === null || i.production_share === void 0 ? it : n.sizing.ofLoad({ share: Y(i.production_share, r) });
  }
  renderEvidence(e, t, r, n) {
    const i = this.i18n.m, a = t.evidence, o = (l, u) => i.sizing.countOf({ count: `${l ?? it}`, total: `${u ?? it}` }), s = (l, u) => I`<span class="row"><span>${l}</span><span>${u}</span></span>`;
    return e === "inverter" ? I`
        ${s(i.sizing.hoursReachedRated, o(a.hours_at_rated, a.measured_hours))}
        ${s(
      i.sizing.hoursAboveOfRated({ share: Y(r.high_load_share, n) }),
      `${a.hours_above_high ?? it}`
    )}
        ${s(i.sizing.highestPeak, ft(a.peak_w ?? null, n))}
      ` : e === "battery" ? I`
        ${s(i.sizing.daysFilledAndLow, o(a.days_full_and_low, a.days_with_data))}
        ${s(i.sizing.daysLowWithoutFilling, `${a.days_low_without_full ?? it}`)}
        ${s(i.sizing.daysFilled, `${a.days_full ?? it}`)}
        ${s(
      i.sizing.lowestCharge,
      a.lowest_pct === null || a.lowest_pct === void 0 ? it : Y(a.lowest_pct / 100, n)
    )}
      ` : I`
      ${s(
      i.sizing.productionShare,
      a.production_share === null || a.production_share === void 0 ? it : Y(a.production_share, n)
    )}
      ${s(
      i.sizing.producedConsumed,
      `${Pt(a.pv_kwh ?? null, n)} / ${Pt(a.load_kwh ?? null, n)}`
    )}
      ${s(
      i.common.selfSufficiency,
      a.self_sufficiency === null || a.self_sufficiency === void 0 ? it : Y(a.self_sufficiency, n)
    )}
      ${s(
      i.sizing.daysBatteryFilled,
      a.fill_share === null || a.fill_share === void 0 ? it : Y(a.fill_share, n)
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
    const n = this.i18n.m, i = t.rules, a = (l) => Y(l, r);
    if (e === "inverter")
      return n.sizing.inverterRule({
        shortShare: a(i.inverter_short_share),
        highShare: a(i.high_load_share),
        borderlineShare: a(i.inverter_borderline_share)
      });
    if (e === "battery")
      return i.full_mode === "ceiling" ? n.sizing.batteryRuleCeiling({
        low: a(i.low_pct / 100),
        share: a(i.battery_short_share)
      }) : n.sizing.batteryRule({
        full: a(i.full_pct / 100),
        low: a(i.low_pct / 100),
        share: a(i.battery_short_share)
      });
    const o = a(i.solar_enough_share), s = a(i.solar_borderline_share);
    switch (cP(t)) {
      case "no_export":
        return n.sizing.solarRuleNoExport({
          fill: a(i.solar_fill_share),
          borderlineFill: a(i.solar_curtailed_borderline_share),
          borderline: s
        });
      case "no_export_fixed":
        return n.sizing.solarRuleNoExportFixed({
          full: a(i.full_pct / 100),
          fill: a(i.solar_fill_share),
          borderlineFill: a(i.solar_curtailed_borderline_share),
          borderline: s
        });
      case "with_fill":
        return n.sizing.solarRuleWithFill({
          enough: o,
          fill: a(i.solar_fill_share),
          borderline: s
        });
      case "plain":
        return n.sizing.solarRule({ enough: o, borderline: s });
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
    const r = this.i18n.m, n = this.i18n.locale, i = t.cards[e];
    if (i.missing.length) {
      const a = i.missing.length === 1 && i.missing[0] === "rated_power";
      return I`<p class="note">
        ${a ? r.sizing.needsNotSet({ roles: Pn(r, i.missing, !0) }) : r.sizing.needsNotMapped({
        roles: Pn(r, i.missing, !0),
        n: i.missing.length
      })}
      </p>`;
    }
    if (i.thresholds_inverted)
      return I`<p class="note">
        ${r.sizing.thresholdsInverted({
        full: Y(t.rules.full_pct / 100, n),
        low: Y(t.rules.low_pct / 100, n)
      })}
      </p>`;
    if (i.no_statistics.length) {
      const a = i.no_statistics.length;
      return I`<p class="note">
        ${r.sizing.noStatisticsBefore({ sensors: i.no_statistics.join(", "), n: a })}
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
    if (e.coverage === 0 || e.coverage >= t.incomplete_below) return E;
    const r = this.i18n.locale;
    return I`<p class="note">
      ${this.i18n.m.sizing.readFrom({ share: hr(e.coverage, r) })}
    </p>`;
  }
  renderCard(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = t.period[e], a = this.renderSetupNote(e, t);
    let o;
    return a !== null ? o = a : i === null ? o = I`<p class="note">
        ${ry(r, e, "no_data", t.rules.full_mode)}
      </p>` : i.verdict === null ? o = I`
        <p class="note">
          ${ry(r, e, i.reason ?? "no_data", t.rules.full_mode)}
        </p>
        ${this.renderCoverageNote(i, t)}
      ` : o = I`
        ${this.renderEvidence(e, i, t.rules, n)}
        ${this.renderCoverageNote(i, t)}
        ${i.note === "covers_but_battery_not_filling" ? I`<p class="note">
              ${r.sizing.batteryNotFilling({
      share: Y(i.evidence.fill_share ?? 0, n)
    })}
            </p>` : E}
        <p class="note">${this.ruleSentence(e, t, n)}</p>
      `, I`<div class="card">
      <span class="name">${r.sizing.cards[e]}</span>
      <span class="value ${i?.verdict ?? "none"}"
        >${ey(r, i?.verdict ?? null)}</span
      >
      ${o}
    </div>`;
  }
  renderMonths(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = (i, a) => {
      const o = a[i];
      if (o === null || e.cards[i].no_statistics.length)
        return I`<td class="none">${it}</td>`;
      const s = a.complete && o.coverage < e.incomplete_below;
      return I`<td class=${o.verdict ?? "none"}>
        ${ey(t, o.verdict)}
        ${o.verdict === null ? (
        // Why there is no verdict: a month the battery never filled is the
        // rule working, a month with no statistics is missing data, and
        // "No verdict" alone reads the same for both.
        I`<span class="hint"
              >${uP(t, i, o.reason ?? "no_data", e.rules.full_mode)}</span
            >`
      ) : I`<span class="hint">${this.cellFigure(i, o, r)}</span>`}
        ${s ? I`<span class="hint"
              >${t.sizing.cellCoverage({ share: hr(o.coverage, r) })}</span
            >` : E}
      </td>`;
    };
    return e.months.length ? I`<table>
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
      (i) => I`<tr class=${i.complete ? "" : "partial"}>
            <td>
              ${gP(i.key, r)}
              ${i.coverage === 0 ? I`<span class="hint">${t.verdict.hintNoData}</span>` : i.complete ? E : I`<span class="hint"
                      >${t.sizing.ofTheMonth({
        share: hr(i.coverage, r)
      })}</span
                    >`}
            </td>
            ${n("inverter", i)} ${n("battery", i)} ${n("solar", i)}
          </tr>`
    )}
      </tbody>
    </table>` : I`<p class="empty">${t.sizing.noMonths}</p>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Yr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = (a) => e.sizing.ruleLine({
      part: e.sizing.parts[a],
      rule: this.ruleSentence(a, t, r)
    }), i = fP(e, t, Y(t.rules.full_pct / 100, r));
    return I`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : E}
        ${!t.covers_whole_window && t.covered_end ? I`<span class="warn"
              >${e.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}</span
            >` : E}
        ${t.covered_end ? E : I`<span class="warn">${e.sizing.noStatistics}</span>`}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : E}
      </div>

      <section>
        <div class="cards">${pP.map((a) => this.renderCard(a, t))}</div>
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
        <p class="note">${n("inverter")}</p>
        <p class="note">${n("battery")}</p>
        <p class="note">${n("solar")}</p>
        ${i ? I`<p class="note">${i}</p>` : E}
        <p class="note">${e.sizing.hourlyNotMean}</p>
      </section>
    `;
  }
};
wr.styles = [
  Yi,
  ue`
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
Gn([
  et({ attribute: !1 })
], wr.prototype, "hass", 2);
Gn([
  et({ type: String })
], wr.prototype, "entryId", 2);
Gn([
  et({ type: String })
], wr.prototype, "range", 2);
Gn([
  yt()
], wr.prototype, "payload", 2);
Gn([
  yt()
], wr.prototype, "error", 2);
Gn([
  yt()
], wr.prototype, "loading", 2);
wr = Gn([
  xe("ia-sizing-tab")
], wr);
var yP = Object.defineProperty, mP = Object.getOwnPropertyDescriptor, Tr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? mP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && yP(t, r, i), i;
};
const _P = "/inverter-analytics", ny = ["load", "battery", "seasonal", "balance", "grid", "sizing", "health"];
let ke = class extends Ht {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.i18n = new Ne(this), this.readLocation = () => {
      const e = Qb(
        window.location.pathname,
        window.location.search,
        ny,
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = e.tab, this.range = e.range, this.entryId = e.entryId;
    }, this.loadConfig = qb(() => this.requestConfig());
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.hass && this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  willUpdate(e) {
    e.has("hass") && Wb(this.hass?.locale?.language), e.has("hass") && this.hass && !this.config && this.error === void 0 && this.loadConfig();
  }
  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  writeLocation(e = !1) {
    const t = Jb(_P, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    e ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await Db(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
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
    return this.error !== void 0 ? I`<div class="notice">
        ${e.panel.couldNotLoad({ error: Yr(this.error, e) })}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          ${e.common.tryAgain}
        </button>
      </div>` : this.config ? this.config.entries.length ? I`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1 ? I`<select
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
      (t) => I`<option
                  value=${t.entry_id}
                  ?selected=${t.entry_id === this.entryId}
                >
                  ${t.title}
                </option>`
    )}
            </select>` : E}
        <div class="langs" role="group" aria-label=${e.panel.language}>
          ${Bb.map(
      (t) => I`<button
              class=${t === this.i18n.lang ? "active" : ""}
              aria-pressed=${t === this.i18n.lang ? "true" : "false"}
              @click=${() => Gb(t)}
            >${t.toUpperCase()}</button>`
    )}
        </div>
        ${this.renderRanges(e)}
      </div>

      <nav class="tabs">
        ${ny.map((t) => {
      const r = this.feature(t)?.available === !1;
      return I`<button
            class="${t === this.tab ? "active" : ""} ${r ? "muted" : ""}"
            @click=${() => this.selectTab(t)}
          >${e.panel.tabs[t]}</button>`;
    })}
      </nav>

      <main>
        ${this.renderTab()}
      </main>
    ` : I`<div class="notice">
        ${e.panel.noInverter}
      </div>` : I`<div class="notice">${e.panel.loading}</div>`;
  }
  /**
   * The period buttons. On a tab that reads the whole history they stay in
   * place, dimmed and disabled, rather than vanishing: the header would jump
   * on every visit, and a picker that silently does nothing would be worse.
   * The range itself is kept, so the next windowed tab opens on it.
   */
  renderRanges(e) {
    const { unused: t, label: r, note: n } = jb(e, this.tab);
    return I`
      <div
        class="ranges ${t ? "unused" : ""}"
        role="group"
        aria-label=${r}
        title=${t ? r : E}
      >
        ${vy.map(
      (i) => I`<button
            class=${i === this.range ? "active" : ""}
            aria-pressed=${i === this.range ? "true" : "false"}
            aria-disabled=${t ? "true" : E}
            ?disabled=${t}
            @click=${() => this.selectRange(i)}
          >${Zb(e, i)}</button>`
    )}
      </div>
      ${n !== null ? I`<span class="ranges-note" aria-hidden="true">${n}</span>` : E}
    `;
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
        roles: Pn(e, t.missing, !0)
      };
      return I`<div class="notice">
        <p>
          ${t.missing.length === 1 ? e.panel.missingOne(r) : e.panel.missingMany(r)}
        </p>
        <p>
          ${e.panel.reconfigureBefore}<strong>${e.panel.reconfigure}</strong
          >${e.panel.reconfigureAfter}
        </p>
        <a href=${r1}>${e.panel.goToSettings}</a>
      </div>`;
    }
    return I`
        ${this.tab === "load" ? I`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : E}
        ${this.tab === "battery" ? I`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>` : E}
        ${this.tab === "seasonal" ? I`<ia-seasonality-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-seasonality-tab>` : E}
        ${this.tab === "balance" ? I`<ia-balance-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-balance-tab>` : E}
        ${this.tab === "grid" ? I`<ia-grid-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-grid-tab>` : E}
        ${this.tab === "sizing" ? I`<ia-sizing-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-sizing-tab>` : E}
        ${this.tab === "health" ? I`<ia-health-tab .hass=${this.hass} .entryId=${this.entryId}></ia-health-tab>` : E}
    `;
  }
};
ke.styles = ue`
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
    .ranges.unused { opacity: 0.45; }
    .ranges.unused button { cursor: not-allowed; }
    .ranges-note { font-size: 12px; color: var(--secondary-text-color); }
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
  et({ attribute: !1 })
], ke.prototype, "hass", 2);
Tr([
  et({ type: Boolean })
], ke.prototype, "narrow", 2);
Tr([
  et({ attribute: !1 })
], ke.prototype, "route", 2);
Tr([
  yt()
], ke.prototype, "config", 2);
Tr([
  yt()
], ke.prototype, "error", 2);
Tr([
  yt()
], ke.prototype, "entryId", 2);
Tr([
  yt()
], ke.prototype, "tab", 2);
Tr([
  yt()
], ke.prototype, "range", 2);
ke = Tr([
  xe("inverter-analytics-panel")
], ke);
export {
  ke as InverterAnalyticsPanel
};

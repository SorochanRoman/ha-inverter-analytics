/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, Y = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let vt = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Y && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = rt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && rt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (e) => new vt(typeof e == "string" ? e : e + "", void 0, Z), bt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new vt(i, e, Z);
}, Dt = (e, t) => {
  if (Y) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = R.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, ot = Y ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Rt(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: Lt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: jt, getOwnPropertySymbols: zt, getPrototypeOf: Bt } = Object, W = globalThis, at = W.trustedTypes, Wt = at ? at.emptyScript : "", qt = W.reactiveElementPolyfillSupport, T = (e, t) => e, L = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Wt : null;
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
} }, J = (e, t) => !It(e, t), ct = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ??= Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ct) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Lt(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: r } = Ft(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const c = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const i = this.properties, s = [...jt(i), ...zt(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) i.unshift(ot(n));
    } else t !== void 0 && i.push(ot(t));
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
    return Dt(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(i, s.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : L;
      this._$Em = n;
      const c = o.fromAttribute(i, r.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? J)(r, i) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: o } = r, c = this[n];
        o !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[T("elementProperties")] = /* @__PURE__ */ new Map(), v[T("finalized")] = /* @__PURE__ */ new Map(), qt?.({ ReactiveElement: v }), (W.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, ht = (e) => e, F = Q.trustedTypes, lt = F ? F.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, wt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + g, Vt = `<${At}>`, m = document, P = () => m.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", X = Array.isArray, Kt = (e) => X(e) || typeof e?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, dt = />/g, _ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ft = /"/g, Et = /^(?:script|style|textarea|title)$/i, St = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), D = St(1), Gt = St(2), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), $ = m.createTreeWalker(m, 129);
function Ct(e, t) {
  if (!X(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Yt = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = x;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let l, u, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === x ? u[1] === "!--" ? o = ut : u[1] !== void 0 ? o = dt : u[2] !== void 0 ? (Et.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = _) : u[3] !== void 0 && (o = _) : o === _ ? u[0] === ">" ? (o = n ?? x, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, l = u[1], o = u[3] === void 0 ? _ : u[3] === '"' ? ft : pt) : o === ft || o === pt ? o = _ : o === ut || o === dt ? o = x : (o = _, n = void 0);
    const f = o === _ && e[c + 1].startsWith("/>") ? " " : "";
    r += o === x ? a + Vt : h >= 0 ? (s.push(l), a.slice(0, h) + wt + a.slice(h) + g + f) : a + g + (h === -2 ? c : f);
  }
  return [Ct(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, u] = Yt(t, i);
    if (this.el = M.createElement(l, s), $.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = $.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(wt)) {
          const p = u[o++], f = n.getAttribute(h).split(g), y = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: y[2], strings: f, ctor: y[1] === "." ? Jt : y[1] === "?" ? Qt : y[1] === "@" ? Xt : q }), n.removeAttribute(h);
        } else h.startsWith(g) && (a.push({ type: 6, index: r }), n.removeAttribute(h));
        if (Et.test(n.tagName)) {
          const h = n.textContent.split(g), p = h.length - 1;
          if (p > 0) {
            n.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < p; f++) n.append(h[f], P()), $.nextNode(), a.push({ type: 2, index: ++r });
            n.append(h[p], P());
          }
        }
      } else if (n.nodeType === 8) if (n.data === At) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(g, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += g.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(e, t, i = e, s) {
  if (t === E) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = k(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (t = S(e, n._$AS(e, t.values), n, s)), t;
}
class Zt {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? m).importNode(i, !0);
    $.currentNode = n;
    let r = $.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new U(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new te(r, this, t)), this._$AV.push(l), a = s[++c];
      }
      o !== a?.index && (r = $.nextNode(), o++);
    }
    return $.currentNode = m, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = S(this, t, i), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(Ct(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new Zt(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = gt.get(t.strings);
    return i === void 0 && gt.set(t.strings, i = new M(t)), i;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new U(this.O(P()), this.O(P()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = ht(t).nextSibling;
      ht(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, i, 0), o = !k(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = S(this, c[s + a], i, a), l === E && (l = this._$AH[a]), o ||= !k(l) || l !== this._$AH[a], l === d ? t = d : t !== d && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Jt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Qt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Xt extends q {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = S(this, t, i, 0) ?? d) === E) return;
    const s = this._$AH, n = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class te {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const ee = Q.litHtmlPolyfillSupport;
ee?.(M, U), (Q.litHtmlVersions ??= []).push("3.3.3");
const ie = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new U(t.insertBefore(P(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis;
class A extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ie(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
A._$litElement$ = !0, A.finalized = !0, tt.litElementHydrateSupport?.({ LitElement: A });
const se = tt.litElementPolyfillSupport;
se?.({ LitElement: A });
(tt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: J }, re = (e = ne, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
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
function oe(e) {
  return (t, i) => typeof i == "object" ? re(e, t, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(e) {
  return oe({ ...e, state: !0, attribute: !1 });
}
const b = "—", xt = 12e4;
function ae(e, t, i = xt) {
  if (e.length === 0) return null;
  const s = t - i;
  let n = 0, r = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, s), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (n += e[o].w * (a - c), r += a - c);
  }
  return r === 0 ? e[e.length - 1].w : n / r;
}
function ce(e, t, i = xt) {
  const s = t - i;
  let n = 0;
  for (; n + 1 < e.length && e[n + 1].t <= s; ) n++;
  return e.slice(n);
}
function _t(e, t, i) {
  if (e === void 0 || e === "") return { value: i, unavailable: null };
  if (typeof e == "number") return { value: e, unavailable: null };
  const s = Number(e);
  if (e.trim() !== "" && Number.isFinite(s)) return { value: s, unavailable: null };
  const n = I(t[e]?.state);
  return n === null ? { value: null, unavailable: e } : { value: n, unavailable: null };
}
function I(e) {
  if (e === void 0 || e === "unavailable" || e === "unknown" || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function he(e) {
  const { soc: t, powerW: i, chargeTo: s, dischargeTo: n, basis: r } = e;
  if (!e.mapped) return { kind: "unmapped" };
  if (e.unavailable !== null) return { kind: "unavailable", entity: e.unavailable };
  if (t === null || i === null || s === null || n === null)
    return { kind: "unavailable", entity: "" };
  const o = r.idle_w;
  if (t >= s && i > -o) return { kind: "at_limit", target: s };
  if (t <= n && i < o) return { kind: "at_floor", target: n };
  if (Math.abs(i) < o) return { kind: "idle" };
  if (e.capacityKwh === null)
    return {
      kind: "no_capacity",
      reason: r.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: r.clean_hours,
      clean_hours_min: r.clean_hours_min,
      missing_roles: r.missing_roles
    };
  const c = i > 0, a = c ? s : n, l = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(i) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: l * 60 };
}
function le(e, t, i, s) {
  const n = new Intl.NumberFormat(i, { maximumFractionDigits: 0 }), r = Math.max(1, Math.round(e));
  if (r < 60) return s.minutes({ m: n.format(r) });
  const o = Math.round(e / 5) * 5;
  if (o >= 48 * 60) return s.over2Days;
  const c = Math.floor(o / 60), a = o % 60, l = a === 0 ? s.hours({ h: n.format(c) }) : s.hoursMinutes({ h: n.format(c), m: n.format(a) }), u = new Date(t.getTime() + o * 6e4), h = new Intl.DateTimeFormat(i, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(u);
  return `${l} ${s.arrival({ time: h })}`;
}
function ue(e, t, i) {
  return e === null || Number.isNaN(e) ? b : Math.abs(Math.round(e)) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${i.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${i.units.w}`;
}
function de(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const i = Number(t);
  return Number.isFinite(i) ? i : t;
}
function pe(e, t) {
  const i = { ...e };
  for (const s of ["entry_id", "charge_to", "discharge_to"]) {
    const n = de(t[s]);
    n === void 0 ? delete i[s] : s === "entry_id" ? i.entry_id = String(n) : i[s] = n;
  }
  return i;
}
function $t(e) {
  return typeof e == "string" && e.trim() !== "" && !Number.isFinite(Number(e));
}
function fe(e, t) {
  const i = [];
  return e?.soc_entity && i.push(e.soc_entity), e?.battery_power_entity && i.push(e.battery_power_entity), $t(t.charge_to) && i.push(t.charge_to), $t(t.discharge_to) && i.push(t.discharge_to), i;
}
function ge(e, t) {
  return !e || e.length !== t.length ? !0 : t.some((i, s) => i !== e[s]);
}
const Tt = 36e5;
function _e(e, t) {
  return e === void 0 || t - e > Tt;
}
const $e = {
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
  editor: {
    entryId: "Inverter",
    entryIdHint: "The inverter's entry id; leave empty if there is only one",
    chargeTo: "Charge to",
    chargeToHint: "A number (%) or an entity; 100 if empty",
    dischargeTo: "Discharge to",
    dischargeToHint: "A number (%) or an entity; the low battery charge if empty"
  }
}, mt = /* @__PURE__ */ new Map();
function me(e) {
  let t = mt.get(e);
  return t || (t = new Intl.PluralRules(e), mt.set(e, t)), t;
}
function ye(e, t, i) {
  const s = me(e).select(t);
  return s === "one" ? i.one : s === "few" ? i.few ?? i.other : s === "many" ? i.many ?? i.other : i.other;
}
const ve = {
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
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + ye("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
  capacityNeedsRoles: (e) => `Для ємності вкажіть ${e.roles}`,
  and: "і",
  roles: {
    battery_soc: "рівень заряду батареї",
    battery_charge_total: "лічильник заряду батареї",
    battery_discharge_total: "лічильник розряду батареї"
  },
  units: { w: "Вт", kw: "кВт" },
  editor: {
    entryId: "Інвертор",
    entryIdHint: "Ідентифікатор запису інвертора; залиште порожнім, якщо інвертор один",
    chargeTo: "Заряджати до",
    chargeToHint: "Число (%) або сутність; 100, якщо порожньо",
    dischargeTo: "Розряджати до",
    dischargeToHint: "Число (%) або сутність; низький заряд батареї, якщо порожньо"
  }
}, Pt = "inverter-analytics.lang";
function et(e) {
  return e === "en" || e === "uk";
}
function kt(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function be(e, t) {
  return et(e) ? e : kt(t) ? "uk" : "en";
}
function we(e, t) {
  return e === "uk" ? "uk" : !t || kt(t) ? "en" : t;
}
let w, j;
const K = /* @__PURE__ */ new Set();
function Ae() {
  if (w === void 0)
    try {
      const e = globalThis.localStorage?.getItem(Pt) ?? null;
      w = et(e) ? e : null;
    } catch {
      w = null;
    }
  return w;
}
function Mt() {
  for (const e of K) e();
}
function Nt() {
  return be(Ae(), j);
}
function z() {
  return we(Nt(), j);
}
const Ee = "inverter-analytics-lang";
function Ut(e) {
  !et(e) || e === w || (w = e, Mt());
}
globalThis.window?.addEventListener(Ee, (e) => {
  Ut(e.detail);
});
globalThis.window?.addEventListener("storage", (e) => {
  const { key: t, newValue: i } = e;
  t === Pt && Ut(i);
});
function Se(e) {
  if (e === j) return;
  const t = z();
  j = e, z() !== t && Mt();
}
function Ce(e) {
  return K.add(e), () => K.delete(e);
}
var xe = Object.defineProperty, O = (e, t, i, s) => {
  for (var n = void 0, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = o(t, i, n) || n);
  return n && xe(t, i, n), n;
};
const B = "inverter-analytics-battery-time", G = "inverter-analytics-battery-time-editor", Te = 2e4, Pe = 100;
function it() {
  return Nt() === "uk" ? ve : $e;
}
function ke(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
function Me(e, t) {
  const i = e.map((s) => t.roles[s] ?? s);
  return i.length <= 1 ? i.join("") : `${i.slice(0, -1).join(", ")} ${t.and} ${i[i.length - 1]}`;
}
const st = class st extends A {
  constructor() {
    super(...arguments), this.config = {}, this.samples = [];
  }
  static getConfigElement() {
    return document.createElement(G);
  }
  static getStubConfig() {
    return { charge_to: 100 };
  }
  setConfig(t) {
    const i = {
      entry_id: t.entry_id || void 0,
      charge_to: t.charge_to,
      discharge_to: t.discharge_to
    }, s = i.entry_id !== this.config.entry_id;
    this.config = i, this.watched = void 0, s && this._hass && this.fetchedFor !== void 0 && (this.samples = [], this.lastPower = void 0, this.basis = void 0, this.fetchBasis());
  }
  getCardSize() {
    return 3;
  }
  set hass(t) {
    this._hass = t, Se(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.isConnected && this.startTimers();
    const i = fe(this.basis, this.config).map((s) => t.states[s]);
    ge(this.watched, i) && (this.watched = i, this.requestUpdate());
  }
  get hass() {
    return this._hass;
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribeLang = Ce(() => this.requestUpdate()), this._hass && (this.startTimers(), this.fetchedFor !== void 0 && _e(this.fetchedAt, Date.now()) && this.fetchBasis());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribeLang?.(), this.timer !== void 0 && clearInterval(this.timer), this.tick !== void 0 && clearInterval(this.tick), this.timer = void 0, this.tick = void 0;
  }
  startTimers() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), Tt)), this.tick === void 0 && (this.tick = setInterval(() => this.requestUpdate(), Te));
  }
  async fetchBasis() {
    const t = this._hass;
    if (!t) return;
    const i = this.config.entry_id;
    this.fetchedFor = i ?? "";
    const s = { type: "inverter_analytics/battery_eta" };
    i && (s.entry_id = i);
    let n, r;
    try {
      n = await t.callWS(s);
    } catch (o) {
      r = ke(o);
    }
    this.config.entry_id === i && (this.basis = n, this.basisError = r, this.fetchedAt = Date.now(), this.watched = void 0);
  }
  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  notePower(t) {
    const i = this.basis?.battery_power_entity;
    if (!i) return;
    const s = t.states[i];
    if (s === this.lastPower) return;
    this.lastPower = s;
    const n = Date.now(), r = I(s?.state);
    if (r === null) {
      this.samples = [];
      return;
    }
    const o = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = ce([...this.samples, { t: n, w: r * o }], n);
  }
  willUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  render() {
    const t = it(), i = z(), s = this._hass, n = this.basis;
    if (!s || !n)
      return this.frame(null, b, this.basisError ?? null, null);
    const r = n.soc_entity, o = n.battery_power_entity, c = !!(r && o), a = r ? I(s.states[r]?.state) : null, u = (o ? I(s.states[o]?.state) : null) === null ? null : ae(this.samples, Date.now()), h = _t(this.config.charge_to, s.states, Pe), p = _t(this.config.discharge_to, s.states, n.low_pct);
    let f = null;
    c && (a === null ? f = r : u === null ? f = o : f = h.unavailable ?? p.unavailable);
    const y = he({
      soc: a,
      powerW: u,
      chargeTo: h.value,
      dischargeTo: p.value,
      unavailable: f,
      mapped: c,
      capacityKwh: n.capacity_kwh,
      basis: n
    }), [Ht, Ot] = this.describe(y, u, h.value, p.value, t, i);
    return this.frame(a, Ht, Ot, ue(u, i, t));
  }
  describe(t, i, s, n, r, o) {
    const c = (a) => new Intl.NumberFormat(o, { maximumFractionDigits: 1 }).format(a);
    switch (t.kind) {
      case "unmapped":
        return [b, r.unmapped];
      case "unavailable":
        return [b, t.entity ? r.unavailable({ entity: t.entity }) : null];
      case "at_limit":
        return [r.atLimit({ t: c(t.target) }), null];
      case "at_floor":
        return [r.atFloor({ t: c(t.target) }), null];
      case "idle":
        return [r.idle, null];
      case "no_capacity": {
        const a = (i ?? 0) > 0, l = a ? s : n, u = a ? r.chargingTo : r.dischargingTo, h = t.reason === "missing_roles" ? r.capacityNeedsRoles({ roles: Me(t.missing_roles, r) }) : r.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
        return [r.withEta({ status: u({ t: c(l ?? 0) }), eta: b }), h];
      }
      case "charging":
      case "discharging": {
        const a = t.kind === "charging" ? r.chargingTo : r.dischargingTo, l = le(t.minutes, /* @__PURE__ */ new Date(), o, r);
        return [r.withEta({ status: a({ t: c(t.target) }), eta: l }), null];
      }
    }
  }
  frame(t, i, s, n) {
    const o = 2 * Math.PI * 42, c = t === null ? 0 : Math.min(100, Math.max(0, t)) / 100, a = t === null ? b : `${new Intl.NumberFormat(z(), { maximumFractionDigits: 0 }).format(t)}%`;
    return D`<ha-card>
      <div class="body">
        <svg class="ring" viewBox="0 0 100 100" width="100" height="100" role="img">
          ${Gt`<circle class="track" cx="50" cy="50" r=${42}></circle>
            <circle
              class="fill"
              cx="50"
              cy="50"
              r=${42}
              stroke-dasharray=${`${o * c} ${o}`}
              transform="rotate(-90 50 50)"
            ></circle>
            <text class="soc" x="50" y="50" text-anchor="middle" dominant-baseline="central">
              ${a}
            </text>`}
        </svg>
        <div class="status">${i}</div>
        ${s ? D`<div class="note">${s}</div>` : d}
        ${n ? D`<div class="power">${n}</div>` : d}
      </div>
    </ha-card>`;
  }
};
st.styles = bt`
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 16px;
      text-align: center;
    }
    .ring {
      margin-bottom: 8px;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: 8;
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke: var(--primary-color);
      stroke-linecap: round;
    }
    .soc {
      fill: var(--primary-text-color);
      font-size: 22px;
      font-weight: 500;
    }
    .status {
      color: var(--primary-text-color);
      font-size: 16px;
    }
    .note,
    .power {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `;
let C = st;
O([
  H()
], C.prototype, "config");
O([
  H()
], C.prototype, "basis");
O([
  H()
], C.prototype, "basisError");
const Ne = [
  { name: "entry_id", selector: { text: {} } },
  { name: "charge_to", selector: { text: {} } },
  { name: "discharge_to", selector: { text: {} } }
], nt = class nt extends A {
  constructor() {
    super(...arguments), this.config = {};
  }
  setConfig(t) {
    this.config = t;
  }
  render() {
    const t = it(), i = {
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, s = {
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return D`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${Ne}
        .computeLabel=${(n) => i[n.name][0]}
        .computeHelper=${(n) => i[n.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const i = pe(this.config, t.detail.value);
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 })
    );
  }
};
nt.styles = bt`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
let N = nt;
O([
  H()
], N.prototype, "config");
O([
  H()
], N.prototype, "hass");
customElements.get(B) || customElements.define(B, C);
customElements.get(G) || customElements.define(G, N);
const yt = window.customCards ??= [];
if (!yt.some((e) => e.type === B)) {
  const e = it();
  yt.push({ type: B, name: e.name, description: e.description, preview: !0 });
}

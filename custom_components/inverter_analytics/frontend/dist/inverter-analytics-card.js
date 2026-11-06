/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, Z = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Z && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = ot.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (e) => new wt(typeof e == "string" ? e : e + "", void 0, J), At = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new wt(i, e, J);
}, jt = (e, t) => {
  if (Z) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), r = D.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, at = Z ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Bt(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: Wt, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: qt, getOwnPropertySymbols: Kt, getPrototypeOf: Gt } = Object, V = globalThis, ct = V.trustedTypes, Yt = ct ? ct.emptyScript : "", Zt = V.reactiveElementPolyfillSupport, x = (e, t) => e, F = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Yt : null;
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
} }, Q = (e, t) => !zt(e, t), ht = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ht) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, i);
      r !== void 0 && Wt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: r, set: n } = Vt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const i = this.properties, s = [...qt(i), ...Kt(i)];
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
      for (const r of s) i.unshift(at(r));
    } else t !== void 0 && i.push(at(t));
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
    return jt(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : F).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : F;
      this._$Em = r;
      const c = o.fromAttribute(i, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Q)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[x("elementProperties")] = /* @__PURE__ */ new Map(), b[x("finalized")] = /* @__PURE__ */ new Map(), Zt?.({ ReactiveElement: b }), (V.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, lt = (e) => e, B = X.trustedTypes, ut = B ? B.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Et = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + $, Jt = `<${St}>`, v = document, P = () => v.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", tt = Array.isArray, Qt = (e) => tt(e) || typeof e?.[Symbol.iterator] == "function", K = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, _ = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, ft = /"/g, Tt = /^(?:script|style|textarea|title)$/i, Ct = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), I = Ct(1), Xt = Ct(2), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function xt(e, t) {
  if (!tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const te = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let l, u, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === C ? u[1] === "!--" ? o = dt : u[1] !== void 0 ? o = pt : u[2] !== void 0 ? (Tt.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = _) : u[3] !== void 0 && (o = _) : o === _ ? u[0] === ">" ? (o = r ?? C, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, l = u[1], o = u[3] === void 0 ? _ : u[3] === '"' ? ft : gt) : o === ft || o === gt ? o = _ : o === dt || o === pt ? o = C : (o = _, r = void 0);
    const g = o === _ && e[c + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + Jt : h >= 0 ? (s.push(l), a.slice(0, h) + Et + a.slice(h) + $ + g) : a + $ + (h === -2 ? c : g);
  }
  return [xt(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, u] = te(t, i);
    if (this.el = M.createElement(l, s), y.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Et)) {
          const p = u[o++], g = r.getAttribute(h).split($), m = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: m[2], strings: g, ctor: m[1] === "." ? ie : m[1] === "?" ? se : m[1] === "@" ? re : q }), r.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: n }), r.removeAttribute(h));
        if (Tt.test(r.tagName)) {
          const h = r.textContent.split($), p = h.length - 1;
          if (p > 0) {
            r.textContent = B ? B.emptyScript : "";
            for (let g = 0; g < p; g++) r.append(h[g], P()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(h[p], P());
          }
        }
      } else if (r.nodeType === 8) if (r.data === St) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(e, t, i = e, s) {
  if (t === E) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = k(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (t = S(e, r._$AS(e, t.values), r, s)), t;
}
class ee {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? v).importNode(i, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new U(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new ne(n, this, t)), this._$AV.push(l), a = s[++c];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = v, r;
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
    t = S(this, t, i), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(xt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new ee(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = mt.get(t.strings);
    return i === void 0 && mt.set(t.strings, i = new M(t)), i;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new U(this.O(P()), this.O(P()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = lt(t).nextSibling;
      lt(t).remove(), t = s;
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
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = S(this, t, i, 0), o = !k(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = S(this, c[s + a], i, a), l === E && (l = this._$AH[a]), o ||= !k(l) || l !== this._$AH[a], l === d ? t = d : t !== d && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ie extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class se extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class re extends q {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = S(this, t, i, 0) ?? d) === E) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
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
const oe = X.litHtmlPolyfillSupport;
oe?.(M, U), (X.litHtmlVersions ??= []).push("3.3.3");
const ae = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new U(t.insertBefore(P(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis;
class A extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ae(i, this.renderRoot, this.renderOptions);
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
A._$litElement$ = !0, A.finalized = !0, et.litElementHydrateSupport?.({ LitElement: A });
const ce = et.litElementPolyfillSupport;
ce?.({ LitElement: A });
(et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: Q }, le = (e = he, t, i) => {
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
function ue(e) {
  return (t, i) => typeof i == "object" ? le(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(e) {
  return ue({ ...e, state: !0, attribute: !1 });
}
const f = "—";
function de(e, t, i, s) {
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
function pe(e, t) {
  return new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(e);
}
function ge(e, t, i) {
  return e.arrival === null ? e.duration : `${e.duration} ${i.arrival({ time: pe(e.arrival, t) })}`;
}
function R(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e);
}
function fe(e, t) {
  const i = e.map((s) => t.roles[s] ?? s);
  return i.length <= 1 ? i.join("") : `${i.slice(0, -1).join(", ")} ${t.and} ${i[i.length - 1]}`;
}
function $t(e) {
  const { state: t, m: i, locale: s } = e;
  switch (t.kind) {
    case "loading":
      return { word: f, status: f, note: e.basisError };
    case "unmapped":
      return { word: f, status: f, note: i.unmapped };
    case "unavailable":
      return {
        word: f,
        status: f,
        note: t.entity ? i.unavailable({ entity: t.entity }) : null
      };
    case "at_limit":
      return {
        word: i.words.atLimit,
        status: i.atLimit({ t: R(t.target, s) }),
        note: null
      };
    case "at_floor":
      return {
        word: i.words.atFloor,
        status: i.atFloor({ t: R(t.target, s) }),
        note: null
      };
    case "idle":
      return { word: i.words.idle, status: i.idle, note: null };
    case "no_capacity": {
      const r = (e.powerW ?? 0) > 0, n = r ? i.chargingTo : i.dischargingTo, o = t.reason === "missing_roles" ? i.capacityNeedsRoles({ roles: fe(t.missing_roles, i) }) : i.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
      return {
        word: r ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: R(e.target ?? 0, s) }), eta: f }),
        note: o
      };
    }
    case "charging":
    case "discharging": {
      const r = t.kind === "charging", n = r ? i.chargingTo : i.dischargingTo, o = e.eta ? ge(e.eta, s, i) : f;
      return {
        word: r ? i.words.charging : i.words.discharging,
        status: i.withEta({ status: n({ t: R(t.target, s) }), eta: o }),
        note: null
      };
    }
  }
}
const Pt = 12e4;
function me(e, t, i = Pt) {
  if (e.length === 0) return null;
  const s = t - i;
  let r = 0, n = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, s), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (r += e[o].w * (a - c), n += a - c);
  }
  return n === 0 ? e[e.length - 1].w : r / n;
}
function $e(e, t, i = Pt) {
  const s = t - i;
  let r = 0;
  for (; r + 1 < e.length && e[r + 1].t <= s; ) r++;
  return e.slice(r);
}
function _t(e, t, i) {
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
function _e(e) {
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
  const c = i > 0, a = c ? s : r, l = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(i) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: l * 60 };
}
function ye(e, t, i) {
  return e === null || Number.isNaN(e) ? f : Math.abs(Math.round(e)) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${i.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${i.units.w}`;
}
function ve(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const i = Number(t);
  return Number.isFinite(i) ? i : t;
}
function be(e, t) {
  const i = { ...e };
  for (const s of ["entry_id", "charge_to", "discharge_to", "layout", "style"]) {
    const r = ve(t[s]);
    r === void 0 ? delete i[s] : s === "charge_to" || s === "discharge_to" ? i[s] = r : i[s] = String(r);
  }
  return i;
}
function yt(e) {
  return typeof e == "string" && e.trim() !== "" && !Number.isFinite(Number(e));
}
function we(e, t) {
  const i = [];
  return e?.soc_entity && i.push(e.soc_entity), e?.battery_power_entity && i.push(e.battery_power_entity), yt(t.charge_to) && i.push(t.charge_to), yt(t.discharge_to) && i.push(t.discharge_to), i;
}
function Ae(e, t) {
  return !e || e.length !== t.length ? !0 : t.some((i, s) => i !== e[s]);
}
const kt = 36e5;
function Ee(e, t) {
  return e === void 0 || t - e > kt;
}
const Se = {
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
}, vt = /* @__PURE__ */ new Map();
function Te(e) {
  let t = vt.get(e);
  return t || (t = new Intl.PluralRules(e), vt.set(e, t)), t;
}
function Ce(e, t, i) {
  const s = Te(e).select(t);
  return s === "one" ? i.one : s === "few" ? i.few ?? i.other : s === "many" ? i.many ?? i.other : i.other;
}
const xe = {
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
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + Ce("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
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
}, Mt = "inverter-analytics.lang";
function it(e) {
  return e === "en" || e === "uk";
}
function Nt(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function Pe(e, t) {
  return it(e) ? e : Nt(t) ? "uk" : "en";
}
function ke(e, t) {
  return e === "uk" ? "uk" : !t || Nt(t) ? "en" : t;
}
let w, j;
const G = /* @__PURE__ */ new Set();
function Me() {
  if (w === void 0)
    try {
      const e = globalThis.localStorage?.getItem(Mt) ?? null;
      w = it(e) ? e : null;
    } catch {
      w = null;
    }
  return w;
}
function Ut() {
  for (const e of G) e();
}
function Ht() {
  return Pe(Me(), j);
}
function z() {
  return ke(Ht(), j);
}
const Ne = "inverter-analytics-lang";
function Ot(e) {
  !it(e) || e === w || (w = e, Ut());
}
globalThis.window?.addEventListener(Ne, (e) => {
  Ot(e.detail);
});
globalThis.window?.addEventListener("storage", (e) => {
  const { key: t, newValue: i } = e;
  t === Mt && Ot(i);
});
function Ue(e) {
  if (e === j) return;
  const t = z();
  j = e, z() !== t && Ut();
}
function He(e) {
  return G.add(e), () => G.delete(e);
}
var Oe = Object.defineProperty, O = (e, t, i, s) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, i, r) || r);
  return r && Oe(t, i, r), r;
};
const W = "inverter-analytics-battery-time", Y = "inverter-analytics-battery-time-editor", Re = 2e4, De = 100;
function st() {
  return Ht() === "uk" ? xe : Se;
}
function Ie(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
const rt = class rt extends A {
  constructor() {
    super(...arguments), this.config = {}, this.samples = [];
  }
  static getConfigElement() {
    return document.createElement(Y);
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
    this._hass = t, Ue(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.isConnected && this.startTimers();
    const i = we(this.basis, this.config).map((s) => t.states[s]);
    Ae(this.watched, i) && (this.watched = i, this.requestUpdate());
  }
  get hass() {
    return this._hass;
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribeLang = He(() => this.requestUpdate()), this._hass && (this.startTimers(), this.fetchedFor !== void 0 && Ee(this.fetchedAt, Date.now()) && this.fetchBasis());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribeLang?.(), this.timer !== void 0 && clearInterval(this.timer), this.tick !== void 0 && clearInterval(this.tick), this.timer = void 0, this.tick = void 0;
  }
  startTimers() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), kt)), this.tick === void 0 && (this.tick = setInterval(() => this.requestUpdate(), Re));
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
      n = Ie(o);
    }
    this.config.entry_id === i && (this.basis = r, this.basisError = n, this.fetchedAt = Date.now(), this.watched = void 0);
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
    this.samples = $e([...this.samples, { t: r, w: n * o }], r);
  }
  willUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  render() {
    const t = st(), i = z(), s = this._hass, r = this.basis;
    if (!s || !r) {
      const { status: Lt, note: Ft } = $t({
        state: { kind: "loading" },
        powerW: null,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m: t,
        locale: i
      });
      return this.frame(null, Lt, Ft, null);
    }
    const n = r.soc_entity, o = r.battery_power_entity, c = !!(n && o), a = n ? L(s.states[n]?.state) : null, u = (o ? L(s.states[o]?.state) : null) === null ? null : me(this.samples, Date.now()), h = _t(this.config.charge_to, s.states, De), p = _t(this.config.discharge_to, s.states, r.low_pct);
    let g = null;
    c && (a === null ? g = n : u === null ? g = o : g = h.unavailable ?? p.unavailable);
    const m = _e({
      soc: a,
      powerW: u,
      chargeTo: h.value,
      dischargeTo: p.value,
      unavailable: g,
      mapped: c,
      capacityKwh: r.capacity_kwh,
      basis: r
    }), Rt = (u ?? 0) > 0, { status: Dt, note: It } = $t({
      state: m,
      powerW: u,
      target: Rt ? h.value : p.value,
      eta: m.kind === "charging" || m.kind === "discharging" ? de(m.minutes, /* @__PURE__ */ new Date(), i, t) : null,
      basisError: this.basisError ?? null,
      m: t,
      locale: i
    });
    return this.frame(a, Dt, It, ye(u, i, t));
  }
  frame(t, i, s, r) {
    const o = 2 * Math.PI * 42, c = t === null ? 0 : Math.min(100, Math.max(0, t)) / 100, a = t === null ? f : `${new Intl.NumberFormat(z(), { maximumFractionDigits: 0 }).format(t)}%`;
    return I`<ha-card>
      <div class="body">
        <svg class="ring" viewBox="0 0 100 100" width="100" height="100" role="img">
          ${Xt`<circle class="track" cx="50" cy="50" r=${42}></circle>
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
        ${s ? I`<div class="note">${s}</div>` : d}
        ${r ? I`<div class="power">${r}</div>` : d}
      </div>
    </ha-card>`;
  }
};
rt.styles = At`
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
let T = rt;
O([
  H()
], T.prototype, "config");
O([
  H()
], T.prototype, "basis");
O([
  H()
], T.prototype, "basisError");
const Le = [
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
    const t = st(), i = {
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, s = {
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return I`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${Le}
        .computeLabel=${(r) => i[r.name][0]}
        .computeHelper=${(r) => i[r.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const i = be(this.config, t.detail.value);
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 })
    );
  }
};
nt.styles = At`
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
customElements.get(W) || customElements.define(W, T);
customElements.get(Y) || customElements.define(Y, N);
const bt = window.customCards ??= [];
if (!bt.some((e) => e.type === W)) {
  const e = st();
  bt.push({ type: W, name: e.name, description: e.description, preview: !0 });
}

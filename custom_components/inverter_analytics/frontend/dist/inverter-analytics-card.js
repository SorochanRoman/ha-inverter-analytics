/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, Z = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Z && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = nt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (e) => new yt(typeof e == "string" ? e : e + "", void 0, J), vt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new yt(s, e, J);
}, Ht = (e, t) => {
  if (Z) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = D.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, ot = Z ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Nt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ut, defineProperty: Ot, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: Dt, getOwnPropertySymbols: It, getPrototypeOf: Lt } = Object, W = globalThis, at = W.trustedTypes, Ft = at ? at.emptyScript : "", jt = W.reactiveElementPolyfillSupport, x = (e, t) => e, F = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ft : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Q = (e, t) => !Ut(e, t), ct = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = ct) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Ot(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = Rt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const s = this.properties, i = [...Dt(s), ...It(s)];
      for (const r of i) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, r] of s) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const r = this._$Eu(s, i);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) s.unshift(ot(r));
    } else t !== void 0 && s.push(ot(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
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
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : F).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : F;
      this._$Em = r;
      const c = o.fromAttribute(s, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Q)(n, s) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[x("elementProperties")] = /* @__PURE__ */ new Map(), v[x("finalized")] = /* @__PURE__ */ new Map(), jt?.({ ReactiveElement: v }), (W.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ht = (e) => e, j = X.trustedTypes, lt = j ? j.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, bt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + g, zt = `<${At}>`, m = document, T = () => m.createComment(""), P = (e) => e === null || typeof e != "object" && typeof e != "function", tt = Array.isArray, Bt = (e) => tt(e) || typeof e?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, dt = />/g, $ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ft = /"/g, wt = /^(?:script|style|textarea|title)$/i, Et = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), I = Et(1), Wt = Et(2), w = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), _ = m.createTreeWalker(m, 129);
function St(e, t) {
  if (!tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const qt = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let c = 0; c < s; c++) {
    const a = e[c];
    let l, u, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === C ? u[1] === "!--" ? o = ut : u[1] !== void 0 ? o = dt : u[2] !== void 0 ? (wt.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = $) : u[3] !== void 0 && (o = $) : o === $ ? u[0] === ">" ? (o = r ?? C, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, l = u[1], o = u[3] === void 0 ? $ : u[3] === '"' ? ft : pt) : o === ft || o === pt ? o = $ : o === ut || o === dt ? o = C : (o = $, r = void 0);
    const f = o === $ && e[c + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + zt : h >= 0 ? (i.push(l), a.slice(0, h) + bt + a.slice(h) + g + f) : a + g + (h === -2 ? c : f);
  }
  return [St(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, u] = qt(t, s);
    if (this.el = M.createElement(l, i), _.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = _.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(bt)) {
          const p = u[o++], f = r.getAttribute(h).split(g), y = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: y[2], strings: f, ctor: y[1] === "." ? Kt : y[1] === "?" ? Gt : y[1] === "@" ? Yt : q }), r.removeAttribute(h);
        } else h.startsWith(g) && (a.push({ type: 6, index: n }), r.removeAttribute(h));
        if (wt.test(r.tagName)) {
          const h = r.textContent.split(g), p = h.length - 1;
          if (p > 0) {
            r.textContent = j ? j.emptyScript : "";
            for (let f = 0; f < p; f++) r.append(h[f], T()), _.nextNode(), a.push({ type: 2, index: ++n });
            r.append(h[p], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === At) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(g, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = m.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(e, t, s = e, i) {
  if (t === w) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = E(e, r._$AS(e, t.values), r, i)), t;
}
class Vt {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? m).importNode(s, !0);
    _.currentNode = r;
    let n = _.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new H(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new Zt(n, this, t)), this._$AV.push(l), a = i[++c];
      }
      o !== a?.index && (n = _.nextNode(), o++);
    }
    return _.currentNode = m, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = E(this, t, s), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(St(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new Vt(r, this), o = n.u(this.options);
      n.p(s), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = gt.get(t.strings);
    return s === void 0 && gt.set(t.strings, s = new M(t)), s;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new H(this.O(T()), this.O(T()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = ht(t).nextSibling;
      ht(t).remove(), t = i;
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
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, s, 0), o = !P(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = E(this, c[i + a], s, a), l === w && (l = this._$AH[a]), o ||= !P(l) || l !== this._$AH[a], l === d ? t = d : t !== d && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Kt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Gt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Yt extends q {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = E(this, t, s, 0) ?? d) === w) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Jt = X.litHtmlPolyfillSupport;
Jt?.(M, H), (X.litHtmlVersions ??= []).push("3.3.3");
const Qt = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = r = new H(t.insertBefore(T(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis;
class A extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
A._$litElement$ = !0, A.finalized = !0, et.litElementHydrateSupport?.({ LitElement: A });
const Xt = et.litElementPolyfillSupport;
Xt?.({ LitElement: A });
(et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: Q }, ee = (e = te, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function se(e) {
  return (t, s) => typeof s == "object" ? ee(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return se({ ...e, state: !0, attribute: !1 });
}
const b = "—", Ct = 12e4;
function ie(e, t, s = Ct) {
  if (e.length === 0) return null;
  const i = t - s;
  let r = 0, n = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, i), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (r += e[o].w * (a - c), n += a - c);
  }
  return n === 0 ? e[e.length - 1].w : r / n;
}
function re(e, t, s = Ct) {
  const i = t - s;
  let r = 0;
  for (; r + 1 < e.length && e[r + 1].t <= i; ) r++;
  return e.slice(r);
}
function $t(e, t, s) {
  if (e === void 0 || e === "") return { value: s, unavailable: null };
  if (typeof e == "number") return { value: e, unavailable: null };
  const i = Number(e);
  if (e.trim() !== "" && Number.isFinite(i)) return { value: i, unavailable: null };
  const r = L(t[e]?.state);
  return r === null ? { value: null, unavailable: e } : { value: r, unavailable: null };
}
function L(e) {
  if (e === void 0 || e === "unavailable" || e === "unknown" || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function ne(e) {
  const { soc: t, powerW: s, chargeTo: i, dischargeTo: r, basis: n } = e;
  if (!e.mapped) return { kind: "unmapped" };
  if (e.unavailable !== null) return { kind: "unavailable", entity: e.unavailable };
  if (t === null || s === null || i === null || r === null)
    return { kind: "unavailable", entity: "" };
  const o = n.idle_w;
  if (t >= i && s > -o) return { kind: "at_limit", target: i };
  if (t <= r && s < o) return { kind: "at_floor", target: r };
  if (Math.abs(s) < o) return { kind: "idle" };
  if (e.capacityKwh === null)
    return {
      kind: "no_capacity",
      reason: n.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: n.clean_hours,
      clean_hours_min: n.clean_hours_min,
      missing_roles: n.missing_roles
    };
  const c = s > 0, a = c ? i : r, l = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(s) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: l * 60 };
}
function oe(e, t, s, i) {
  const r = new Intl.NumberFormat(s, { maximumFractionDigits: 0 });
  if (e < 60) return i.minutes({ m: r.format(Math.max(1, Math.round(e))) });
  if (e >= 48 * 60) return i.over2Days;
  const n = Math.round(e / 5) * 5, o = Math.floor(n / 60), c = n % 60, a = c === 0 ? i.hours({ h: r.format(o) }) : i.hoursMinutes({ h: r.format(o), m: r.format(c) }), l = new Date(t.getTime() + n * 6e4), u = new Intl.DateTimeFormat(s, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(l);
  return `${a} ${i.arrival({ time: u })}`;
}
function ae(e, t, s) {
  return e === null || Number.isNaN(e) ? b : Math.abs(e) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${s.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${s.units.w}`;
}
const ce = {
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
  capacityNotMeasured: (e) => `Capacity not measured yet (${e.n} of ${e.min} clean hours)`,
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
}, _t = /* @__PURE__ */ new Map();
function he(e) {
  let t = _t.get(e);
  return t || (t = new Intl.PluralRules(e), _t.set(e, t)), t;
}
function le(e, t, s) {
  const i = he(e).select(t);
  return i === "one" ? s.one : i === "few" ? s.few ?? s.other : i === "many" ? s.many ?? s.other : s.other;
}
const ue = {
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
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + le("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
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
}, de = "inverter-analytics.lang";
function xt(e) {
  return e === "en" || e === "uk";
}
function Tt(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function pe(e, t) {
  return xt(e) ? e : Tt(t) ? "uk" : "en";
}
function fe(e, t) {
  return e === "uk" ? "uk" : !t || Tt(t) ? "en" : t;
}
let R, z;
const G = /* @__PURE__ */ new Set();
function ge() {
  if (R === void 0)
    try {
      const e = globalThis.localStorage?.getItem(de) ?? null;
      R = xt(e) ? e : null;
    } catch {
      R = null;
    }
  return R;
}
function $e() {
  for (const e of G) e();
}
function Pt() {
  return pe(ge(), z);
}
function B() {
  return fe(Pt(), z);
}
function _e(e) {
  if (e === z) return;
  const t = B();
  z = e, B() !== t && $e();
}
function me(e) {
  return G.add(e), () => G.delete(e);
}
var ye = Object.defineProperty, O = (e, t, s, i) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, s, r) || r);
  return r && ye(t, s, r), r;
};
const k = "inverter-analytics-battery-time", Y = "inverter-analytics-battery-time-editor", ve = 36e5, be = 100;
function st() {
  return Pt() === "uk" ? ue : ce;
}
function Ae(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
function we(e, t) {
  const s = e.map((i) => t.roles[i] ?? i);
  return s.length <= 1 ? s.join("") : `${s.slice(0, -1).join(", ")} ${t.and} ${s[s.length - 1]}`;
}
const it = class it extends A {
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
    const s = {
      entry_id: t.entry_id || void 0,
      charge_to: t.charge_to,
      discharge_to: t.discharge_to
    }, i = s.entry_id !== this.config.entry_id;
    this.config = s, i && this._hass && this.fetchedFor !== void 0 && (this.samples = [], this.lastPower = void 0, this.basis = void 0, this.fetchBasis());
  }
  getCardSize() {
    return 3;
  }
  set hass(t) {
    this._hass = t, _e(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.isConnected && this.startTimer(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  connectedCallback() {
    super.connectedCallback(), this.unsubscribeLang = me(() => this.requestUpdate()), this._hass && this.startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribeLang?.(), this.timer !== void 0 && clearInterval(this.timer), this.timer = void 0;
  }
  startTimer() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), ve));
  }
  async fetchBasis() {
    const t = this._hass;
    if (!t) return;
    const s = this.config.entry_id;
    this.fetchedFor = s ?? "";
    const i = { type: "inverter_analytics/battery_eta" };
    s && (i.entry_id = s);
    try {
      this.basis = await t.callWS(i), this.basisError = void 0;
    } catch (r) {
      this.basis = void 0, this.basisError = Ae(r);
    }
  }
  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  notePower(t) {
    const s = this.basis?.battery_power_entity;
    if (!s) return;
    const i = t.states[s];
    if (i === this.lastPower) return;
    this.lastPower = i;
    const r = Date.now(), n = L(i?.state);
    if (n === null) {
      this.samples = [];
      return;
    }
    const o = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = re([...this.samples, { t: r, w: n * o }], r);
  }
  willUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  render() {
    const t = st(), s = B(), i = this._hass, r = this.basis;
    if (!i || !r)
      return this.frame(null, b, this.basisError ?? null, null);
    const n = r.soc_entity, o = r.battery_power_entity, c = !!(n && o), a = n ? L(i.states[n]?.state) : null, u = (o ? L(i.states[o]?.state) : null) === null ? null : ie(this.samples, Date.now()), h = $t(this.config.charge_to, i.states, be), p = $t(this.config.discharge_to, i.states, r.low_pct);
    let f = null;
    c && (a === null ? f = n : u === null ? f = o : f = h.unavailable ?? p.unavailable);
    const y = ne({
      soc: a,
      powerW: u,
      chargeTo: h.value,
      dischargeTo: p.value,
      unavailable: f,
      mapped: c,
      capacityKwh: r.capacity_kwh,
      basis: r
    }), [Mt, kt] = this.describe(y, u, h.value, p.value, t, s);
    return this.frame(a, Mt, kt, ae(u, s, t));
  }
  describe(t, s, i, r, n, o) {
    const c = (a) => new Intl.NumberFormat(o, { maximumFractionDigits: 1 }).format(a);
    switch (t.kind) {
      case "unmapped":
        return [b, n.unmapped];
      case "unavailable":
        return [b, t.entity ? n.unavailable({ entity: t.entity }) : null];
      case "at_limit":
        return [n.atLimit({ t: c(t.target) }), null];
      case "at_floor":
        return [n.atFloor({ t: c(t.target) }), null];
      case "idle":
        return [n.idle, null];
      case "no_capacity": {
        const a = (s ?? 0) > 0, l = a ? i : r, u = a ? n.chargingTo : n.dischargingTo, h = t.reason === "missing_roles" ? n.capacityNeedsRoles({ roles: we(t.missing_roles, n) }) : n.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
        return [n.withEta({ status: u({ t: c(l ?? 0) }), eta: b }), h];
      }
      case "charging":
      case "discharging": {
        const a = t.kind === "charging" ? n.chargingTo : n.dischargingTo, l = oe(t.minutes, /* @__PURE__ */ new Date(), o, n);
        return [n.withEta({ status: a({ t: c(t.target) }), eta: l }), null];
      }
    }
  }
  frame(t, s, i, r) {
    const o = 2 * Math.PI * 42, c = t === null ? 0 : Math.min(100, Math.max(0, t)) / 100, a = t === null ? b : `${new Intl.NumberFormat(B(), { maximumFractionDigits: 0 }).format(t)}%`;
    return I`<ha-card>
      <div class="body">
        <svg class="ring" viewBox="0 0 100 100" width="100" height="100" role="img">
          ${Wt`<circle class="track" cx="50" cy="50" r=${42}></circle>
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
        <div class="status">${s}</div>
        ${i ? I`<div class="note">${i}</div>` : d}
        ${r ? I`<div class="power">${r}</div>` : d}
      </div>
    </ha-card>`;
  }
};
it.styles = vt`
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
let S = it;
O([
  U()
], S.prototype, "config");
O([
  U()
], S.prototype, "basis");
O([
  U()
], S.prototype, "basisError");
const Ee = [
  { name: "entry_id", selector: { text: {} } },
  { name: "charge_to", selector: { text: {} } },
  { name: "discharge_to", selector: { text: {} } }
];
function K(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const s = Number(t);
  return Number.isFinite(s) ? s : t;
}
const rt = class rt extends A {
  constructor() {
    super(...arguments), this.config = {};
  }
  setConfig(t) {
    this.config = t;
  }
  render() {
    const t = st(), s = {
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, i = {
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return I`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${Ee}
        .computeLabel=${(r) => s[r.name][0]}
        .computeHelper=${(r) => s[r.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const s = t.detail.value, i = { type: this.config.type ?? `custom:${k}` }, r = K(s.entry_id);
    r !== void 0 && (i.entry_id = String(r));
    const n = K(s.charge_to);
    n !== void 0 && (i.charge_to = n);
    const o = K(s.discharge_to);
    o !== void 0 && (i.discharge_to = o), this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 })
    );
  }
};
rt.styles = vt`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
let N = rt;
O([
  U()
], N.prototype, "config");
O([
  U()
], N.prototype, "hass");
customElements.get(k) || customElements.define(k, S);
customElements.get(Y) || customElements.define(Y, N);
const mt = window.customCards ??= [];
if (!mt.some((e) => e.type === k)) {
  const e = st();
  mt.push({ type: k, name: e.name, description: e.description, preview: !0 });
}

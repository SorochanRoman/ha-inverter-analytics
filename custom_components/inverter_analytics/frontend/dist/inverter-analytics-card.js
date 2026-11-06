/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, Z = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), at = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Z && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = at.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (e) => new Et(typeof e == "string" ? e : e + "", void 0, J), St = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Et(s, e, J);
}, Kt = (e, t) => {
  if (Z) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = O.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, ct = Z ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Vt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gt, defineProperty: Yt, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Jt, getOwnPropertySymbols: Qt, getPrototypeOf: Xt } = Object, z = globalThis, ht = z.trustedTypes, te = ht ? ht.emptyScript : "", ee = z.reactiveElementPolyfillSupport, C = (e, t) => e, I = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? te : null;
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
} }, Q = (e, t) => !Gt(e, t), lt = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = lt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Yt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = Zt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const s = this.properties, i = [...Jt(s), ...Qt(s)];
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
      for (const r of i) s.unshift(ct(r));
    } else t !== void 0 && s.push(ct(t));
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
    return Kt(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : I).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : I;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[C("elementProperties")] = /* @__PURE__ */ new Map(), b[C("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: b }), (z.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ut = (e) => e, L = X.trustedTypes, dt = L ? L.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Tt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ct = "?" + $, se = `<${Ct}>`, v = document, x = () => v.createComment(""), P = (e) => e === null || typeof e != "object" && typeof e != "function", tt = Array.isArray, ie = (e) => tt(e) || typeof e?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, ft = />/g, _ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, mt = /"/g, xt = /^(?:script|style|textarea|title)$/i, Pt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), D = Pt(1), re = Pt(2), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function kt(e, t) {
  if (!tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const ne = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
  for (let c = 0; c < s; c++) {
    const a = e[c];
    let u, l, h = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, l = o.exec(a), l !== null); ) f = o.lastIndex, o === T ? l[1] === "!--" ? o = gt : l[1] !== void 0 ? o = ft : l[2] !== void 0 ? (xt.test(l[2]) && (r = RegExp("</" + l[2], "g")), o = _) : l[3] !== void 0 && (o = _) : o === _ ? l[0] === ">" ? (o = r ?? T, h = -1) : l[1] === void 0 ? h = -2 : (h = o.lastIndex - l[2].length, u = l[1], o = l[3] === void 0 ? _ : l[3] === '"' ? mt : pt) : o === mt || o === pt ? o = _ : o === gt || o === ft ? o = T : (o = _, r = void 0);
    const p = o === _ && e[c + 1].startsWith("/>") ? " " : "";
    n += o === T ? a + se : h >= 0 ? (i.push(u), a.slice(0, h) + Tt + a.slice(h) + $ + p) : a + $ + (h === -2 ? c : p);
  }
  return [kt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [u, l] = ne(t, s);
    if (this.el = k.createElement(u, i), y.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Tt)) {
          const f = l[o++], p = r.getAttribute(h).split($), g = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: g[2], strings: p, ctor: g[1] === "." ? ae : g[1] === "?" ? ce : g[1] === "@" ? he : W }), r.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: n }), r.removeAttribute(h));
        if (xt.test(r.tagName)) {
          const h = r.textContent.split($), f = h.length - 1;
          if (f > 0) {
            r.textContent = L ? L.emptyScript : "";
            for (let p = 0; p < f; p++) r.append(h[p], x()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(h[f], x());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ct) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = v.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(e, t, s = e, i) {
  if (t === E) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = S(e, r._$AS(e, t.values), r, i)), t;
}
class oe {
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
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? v).importNode(s, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new N(n, n.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (u = new le(n, this, t)), this._$AV.push(u), a = i[++c];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = v, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class N {
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
    t = S(this, t, s), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = k.createElement(kt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new oe(r, this), o = n.u(this.options);
      n.p(s), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = $t.get(t.strings);
    return s === void 0 && $t.set(t.strings, s = new k(t)), s;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new N(this.O(x()), this.O(x()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = ut(t).nextSibling;
      ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class W {
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
    if (n === void 0) t = S(this, t, s, 0), o = !P(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const c = t;
      let a, u;
      for (t = n[0], a = 0; a < n.length - 1; a++) u = S(this, c[i + a], s, a), u === E && (u = this._$AH[a]), o ||= !P(u) || u !== this._$AH[a], u === d ? t = d : t !== d && (t += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ae extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class ce extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class he extends W {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = S(this, t, s, 0) ?? d) === E) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const ue = X.litHtmlPolyfillSupport;
ue?.(k, N), (X.litHtmlVersions ??= []).push("3.3.3");
const de = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = r = new N(t.insertBefore(x(), n), n, void 0, s ?? {});
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
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(s, this.renderRoot, this.renderOptions);
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
const ge = et.litElementPolyfillSupport;
ge?.({ LitElement: A });
(et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: Q }, pe = (e = fe, t, s) => {
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
function me(e) {
  return (t, s) => typeof s == "object" ? pe(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Mt(e) {
  return me({ ...e, state: !0, attribute: !1 });
}
const m = "—";
function $e(e, t, s, i) {
  const r = new Intl.NumberFormat(s, { maximumFractionDigits: 0 }), n = Math.max(1, Math.round(e));
  if (n < 60)
    return {
      duration: i.minutes({ m: r.format(n) }),
      arrival: new Date(t.getTime() + n * 6e4),
      over2Days: !1
    };
  const o = Math.round(e / 5) * 5;
  if (o >= 48 * 60) return { duration: i.over2Days, arrival: null, over2Days: !0 };
  const c = Math.floor(o / 60), a = o % 60;
  return { duration: a === 0 ? i.hours({ h: r.format(c) }) : i.hoursMinutes({ h: r.format(c), m: r.format(a) }), arrival: new Date(t.getTime() + o * 6e4), over2Days: !1 };
}
function _e(e, t) {
  return new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(e);
}
function ye(e, t, s) {
  return e.arrival === null ? e.duration : `${e.duration} ${s.arrival({ time: _e(e.arrival, t) })}`;
}
function H(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e);
}
function ve(e, t) {
  const s = e.map((i) => t.roles[i] ?? i);
  return s.length <= 1 ? s.join("") : `${s.slice(0, -1).join(", ")} ${t.and} ${s[s.length - 1]}`;
}
function _t(e) {
  const { state: t, m: s, locale: i } = e;
  switch (t.kind) {
    case "loading":
      return { word: m, status: m, note: e.basisError };
    case "unmapped":
      return { word: m, status: m, note: s.unmapped };
    case "unavailable":
      return {
        word: m,
        status: m,
        note: t.entity ? s.unavailable({ entity: t.entity }) : null
      };
    case "at_limit":
      return {
        word: s.words.atLimit,
        status: s.atLimit({ t: H(t.target, i) }),
        note: null
      };
    case "at_floor":
      return {
        word: s.words.atFloor,
        status: s.atFloor({ t: H(t.target, i) }),
        note: null
      };
    case "idle":
      return { word: s.words.idle, status: s.idle, note: null };
    case "no_capacity": {
      const r = (e.powerW ?? 0) > 0, n = r ? s.chargingTo : s.dischargingTo, o = t.reason === "missing_roles" ? s.capacityNeedsRoles({ roles: ve(t.missing_roles, s) }) : s.capacityNotMeasured({ n: t.clean_hours, min: t.clean_hours_min });
      return {
        word: r ? s.words.charging : s.words.discharging,
        status: s.withEta({ status: n({ t: H(e.target ?? 0, i) }), eta: m }),
        note: o
      };
    }
    case "charging":
    case "discharging": {
      const r = t.kind === "charging", n = r ? s.chargingTo : s.dischargingTo, o = e.eta ? ye(e.eta, i, s) : m;
      return {
        word: r ? s.words.charging : s.words.discharging,
        status: s.withEta({ status: n({ t: H(t.target, i) }), eta: o }),
        note: null
      };
    }
  }
}
function yt(e, t, s) {
  switch (e.kind) {
    case "charging":
      return "charge";
    case "discharging":
      return "discharge";
    case "at_floor":
      return "low";
    case "no_capacity":
      return t === null ? "rest" : t >= s ? "charge" : t <= -s ? "discharge" : "rest";
    default:
      return "rest";
  }
}
const Nt = 12e4;
function be(e, t, s = Nt) {
  if (e.length === 0) return null;
  const i = t - s;
  let r = 0, n = 0;
  for (let o = 0; o < e.length; o++) {
    const c = Math.max(e[o].t, i), a = Math.min(o + 1 < e.length ? e[o + 1].t : t, t);
    a <= c || (r += e[o].w * (a - c), n += a - c);
  }
  return n === 0 ? e[e.length - 1].w : r / n;
}
function we(e, t, s = Nt) {
  const i = t - s;
  let r = 0;
  for (; r + 1 < e.length && e[r + 1].t <= i; ) r++;
  return e.slice(r);
}
function vt(e, t, s) {
  if (e === void 0 || e === "") return { value: s, unavailable: null };
  if (typeof e == "number") return { value: e, unavailable: null };
  const i = Number(e);
  if (e.trim() !== "" && Number.isFinite(i)) return { value: i, unavailable: null };
  const r = R(t[e]?.state);
  return r === null ? { value: null, unavailable: e } : { value: r, unavailable: null };
}
function R(e) {
  if (e === void 0 || e === "unavailable" || e === "unknown" || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ae(e) {
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
  const c = s > 0, a = c ? i : r, u = e.capacityKwh * Math.abs(a - t) / 100 / (Math.abs(s) / 1e3);
  return { kind: c ? "charging" : "discharging", target: a, minutes: u * 60 };
}
function Ee(e, t, s) {
  return e === null || Number.isNaN(e) ? m : Math.abs(Math.round(e)) >= 1e3 ? `${new Intl.NumberFormat(t, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(e / 1e3)} ${s.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${s.units.w}`;
}
function Se(e) {
  if (e == null) return;
  const t = String(e).trim();
  if (t === "") return;
  const s = Number(t);
  return Number.isFinite(s) ? s : t;
}
function Te(e, t) {
  const s = { ...e };
  for (const i of ["entry_id", "charge_to", "discharge_to", "layout", "style"]) {
    const r = Se(t[i]);
    r === void 0 ? delete s[i] : i === "charge_to" || i === "discharge_to" ? s[i] = r : s[i] = String(r);
  }
  return s;
}
function bt(e) {
  return typeof e == "string" && e.trim() !== "" && !Number.isFinite(Number(e));
}
function Ce(e, t) {
  const s = [];
  return e?.soc_entity && s.push(e.soc_entity), e?.battery_power_entity && s.push(e.battery_power_entity), bt(t.charge_to) && s.push(t.charge_to), bt(t.discharge_to) && s.push(t.discharge_to), s;
}
function xe(e, t) {
  return !e || e.length !== t.length ? !0 : t.some((s, i) => s !== e[i]);
}
const Ut = 36e5;
function Pe(e, t) {
  return e === void 0 || t - e > Ut;
}
const ke = {
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
}, wt = /* @__PURE__ */ new Map();
function Me(e) {
  let t = wt.get(e);
  return t || (t = new Intl.PluralRules(e), wt.set(e, t)), t;
}
function Ne(e, t, s) {
  const i = Me(e).select(t);
  return i === "one" ? s.one : i === "few" ? s.few ?? s.other : i === "many" ? s.many ?? s.other : s.other;
}
const Ue = {
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
  capacityNotMeasured: (e) => `Ємність ще не виміряна (${e.n} з ${e.min} ` + Ne("uk", e.min, { one: "чистої години", other: "чистих годин" }) + " розряду)",
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
}, Ht = "inverter-analytics.lang";
function st(e) {
  return e === "en" || e === "uk";
}
function Ot(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function He(e, t) {
  return st(e) ? e : Ot(t) ? "uk" : "en";
}
function Oe(e, t) {
  return e === "uk" ? "uk" : !t || Ot(t) ? "en" : t;
}
let w, F;
const K = /* @__PURE__ */ new Set();
function De() {
  if (w === void 0)
    try {
      const e = globalThis.localStorage?.getItem(Ht) ?? null;
      w = st(e) ? e : null;
    } catch {
      w = null;
    }
  return w;
}
function Dt() {
  for (const e of K) e();
}
function Rt() {
  return He(De(), F);
}
function B() {
  return Oe(Rt(), F);
}
const Re = "inverter-analytics-lang";
function It(e) {
  !st(e) || e === w || (w = e, Dt());
}
globalThis.window?.addEventListener(Re, (e) => {
  It(e.detail);
});
globalThis.window?.addEventListener("storage", (e) => {
  const { key: t, newValue: s } = e;
  t === Ht && It(s);
});
function Ie(e) {
  if (e === F) return;
  const t = B();
  F = e, B() !== t && Dt();
}
function Le(e) {
  return K.add(e), () => K.delete(e);
}
const Fe = 2e4, Be = 100;
function it() {
  return Rt() === "uk" ? Ue : ke;
}
function je(e) {
  return e && typeof e == "object" && "message" in e ? String(e.message) : String(e);
}
class ze {
  constructor(t) {
    this.config = {}, this.samples = [], this.host = t, t.addController(this);
  }
  get hass() {
    return this._hass;
  }
  setConfig(t) {
    const s = {
      entry_id: t.entry_id || void 0,
      charge_to: t.charge_to,
      discharge_to: t.discharge_to
    }, i = s.entry_id !== this.config.entry_id;
    this.config = s, this.watched = void 0, i && this._hass && this.fetchedFor !== void 0 && (this.samples = [], this.lastPower = void 0, this.basis = void 0, this.fetchBasis()), this.host.requestUpdate();
  }
  setHass(t) {
    this._hass = t, Ie(t.locale?.language), this.notePower(t), this.fetchedFor === void 0 && this.fetchBasis(), this.host.isConnected && this.startTimers();
    const s = Ce(this.basis, this.config).map((i) => t.states[i]);
    xe(this.watched, s) && (this.watched = s, this.host.requestUpdate());
  }
  hostConnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = Le(() => this.host.requestUpdate()), this._hass && (this.startTimers(), this.fetchedFor !== void 0 && Pe(this.fetchedAt, Date.now()) && this.fetchBasis());
  }
  hostDisconnected() {
    this.unsubscribeLang?.(), this.unsubscribeLang = void 0, this.timer !== void 0 && clearInterval(this.timer), this.tick !== void 0 && clearInterval(this.tick), this.timer = void 0, this.tick = void 0;
  }
  hostUpdate() {
    this._hass && this.basis && this.lastPower === void 0 && this.notePower(this._hass);
  }
  startTimers() {
    this.timer === void 0 && (this.timer = setInterval(() => void this.fetchBasis(), Ut)), this.tick === void 0 && (this.tick = setInterval(() => this.host.requestUpdate(), Fe));
  }
  async fetchBasis() {
    const t = this._hass;
    if (!t) return;
    const s = this.config.entry_id;
    this.fetchedFor = s ?? "";
    const i = { type: "inverter_analytics/battery_eta" };
    s && (i.entry_id = s);
    let r, n;
    try {
      r = await t.callWS(i);
    } catch (o) {
      n = je(o);
    }
    this.config.entry_id === s && (this.basis = r, this.basisError = n, this.fetchedAt = Date.now(), this.watched = void 0, this.host.requestUpdate());
  }
  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  notePower(t) {
    const s = this.basis?.battery_power_entity;
    if (!s) return;
    const i = t.states[s];
    if (i === this.lastPower) return;
    this.lastPower = i;
    const r = Date.now(), n = R(i?.state);
    if (n === null) {
      this.samples = [];
      return;
    }
    const o = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = we([...this.samples, { t: r, w: n * o }], r);
  }
  /** Everything a face shows, resolved and worded; loading until hass and basis. */
  view() {
    const t = it(), s = B(), i = this._hass, r = this.basis;
    if (!i || !r) {
      const q = { kind: "loading" }, { word: zt, status: Wt, note: qt } = _t({
        state: q,
        powerW: null,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m: t,
        locale: s
      });
      return {
        state: q,
        soc: null,
        powerW: null,
        chargeTo: null,
        dischargeTo: null,
        target: null,
        eta: null,
        tone: yt(q, null, 0),
        word: zt,
        status: Wt,
        note: qt,
        m: t,
        locale: s
      };
    }
    const n = r.soc_entity, o = r.battery_power_entity, c = !!(n && o), a = n ? R(i.states[n]?.state) : null, l = (o ? R(i.states[o]?.state) : null) === null ? null : be(this.samples, Date.now()), h = vt(this.config.charge_to, i.states, Be), f = vt(this.config.discharge_to, i.states, r.low_pct);
    let p = null;
    c && (a === null ? p = n : l === null ? p = o : p = h.unavailable ?? f.unavailable);
    const g = Ae({
      soc: a,
      powerW: l,
      chargeTo: h.value,
      dischargeTo: f.value,
      unavailable: p,
      mapped: c,
      capacityKwh: r.capacity_kwh,
      basis: r
    });
    let U = null;
    g.kind === "charging" || g.kind === "discharging" ? U = g.target : g.kind === "no_capacity" && (U = (l ?? 0) > 0 ? h.value : f.value);
    const ot = g.kind === "charging" || g.kind === "discharging" ? $e(g.minutes, /* @__PURE__ */ new Date(), s, t) : null, { word: Ft, status: Bt, note: jt } = _t({
      state: g,
      powerW: l,
      target: U,
      eta: ot,
      basisError: this.basisError ?? null,
      m: t,
      locale: s
    });
    return {
      state: g,
      soc: a,
      powerW: l,
      chargeTo: h.value,
      dischargeTo: f.value,
      target: U,
      eta: ot,
      tone: yt(g, l, r.idle_w),
      word: Ft,
      status: Bt,
      note: jt,
      m: t,
      locale: s
    };
  }
}
var We = Object.defineProperty, Lt = (e, t, s, i) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, s, r) || r);
  return r && We(t, s, r), r;
};
const j = "inverter-analytics-battery-time", G = "inverter-analytics-battery-time-editor", rt = class rt extends A {
  constructor() {
    super(...arguments), this.battery = new ze(this);
  }
  static getConfigElement() {
    return document.createElement(G);
  }
  static getStubConfig() {
    return { charge_to: 100 };
  }
  setConfig(t) {
    this.battery.setConfig(t);
  }
  getCardSize() {
    return 3;
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
    const t = this.battery.view(), s = t.state.kind === "loading" ? null : Ee(t.powerW, t.locale, t.m);
    return this.frame(t.soc, t.status, t.note, s);
  }
  frame(t, s, i, r) {
    const o = 2 * Math.PI * 42, c = t === null ? 0 : Math.min(100, Math.max(0, t)) / 100, a = t === null ? m : `${new Intl.NumberFormat(B(), { maximumFractionDigits: 0 }).format(t)}%`;
    return D`<ha-card>
      <div class="body">
        <svg class="ring" viewBox="0 0 100 100" width="100" height="100" role="img">
          ${re`<circle class="track" cx="50" cy="50" r=${42}></circle>
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
        ${i ? D`<div class="note">${i}</div>` : d}
        ${r ? D`<div class="power">${r}</div>` : d}
      </div>
    </ha-card>`;
  }
};
rt.styles = St`
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
let Y = rt;
const qe = [
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
    const t = it(), s = {
      entry_id: [t.editor.entryId, t.editor.entryIdHint],
      charge_to: [t.editor.chargeTo, t.editor.chargeToHint],
      discharge_to: [t.editor.dischargeTo, t.editor.dischargeToHint]
    }, i = {
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === void 0 ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === void 0 ? "" : String(this.config.discharge_to)
    };
    return D`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${qe}
        .computeLabel=${(r) => s[r.name][0]}
        .computeHelper=${(r) => s[r.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }
  changed(t) {
    t.stopPropagation();
    const s = Te(this.config, t.detail.value);
    this.config = s, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 })
    );
  }
};
nt.styles = St`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
let M = nt;
Lt([
  Mt()
], M.prototype, "config");
Lt([
  Mt()
], M.prototype, "hass");
customElements.get(j) || customElements.define(j, Y);
customElements.get(G) || customElements.define(G, M);
const At = window.customCards ??= [];
if (!At.some((e) => e.type === j)) {
  const e = it();
  At.push({ type: j, name: e.name, description: e.description, preview: !0 });
}

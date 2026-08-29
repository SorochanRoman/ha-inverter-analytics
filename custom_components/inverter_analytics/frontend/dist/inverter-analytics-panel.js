/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const io = globalThis, Vu = io.ShadowRoot && (io.ShadyCSS === void 0 || io.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gu = Symbol(), sf = /* @__PURE__ */ new WeakMap();
let ep = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Gu) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Vu && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = sf.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && sf.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $m = (r) => new ep(typeof r == "string" ? r : r + "", void 0, Gu), Wi = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new ep(e, r, Gu);
}, zm = (r, t) => {
  if (Vu) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = io.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, lf = Vu ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return $m(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Hm, defineProperty: Vm, getOwnPropertyDescriptor: Gm, getOwnPropertyNames: Wm, getOwnPropertySymbols: Um, getPrototypeOf: Ym } = Object, Zo = globalThis, uf = Zo.trustedTypes, Xm = uf ? uf.emptyScript : "", Zm = Zo.reactiveElementPolyfillSupport, An = (r, t) => r, So = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Xm : null;
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
} }, Wu = (r, t) => !Hm(r, t), hf = { attribute: !0, type: String, converter: So, reflect: !1, useDefault: !1, hasChanged: Wu };
Symbol.metadata ??= Symbol("metadata"), Zo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let xi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = hf) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Vm(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = Gm(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? hf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(An("elementProperties"))) return;
    const t = Ym(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(An("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(An("properties"))) {
      const e = this.properties, i = [...Wm(e), ...Um(e)];
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
      for (const n of i) e.unshift(lf(n));
    } else t !== void 0 && e.push(lf(t));
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
    return zm(t, this.constructor.elementStyles), t;
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
      if (n === !1 && (a = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Wu)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
xi.elementStyles = [], xi.shadowRootOptions = { mode: "open" }, xi[An("elementProperties")] = /* @__PURE__ */ new Map(), xi[An("finalized")] = /* @__PURE__ */ new Map(), Zm?.({ ReactiveElement: xi }), (Zo.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Uu = globalThis, ff = (r) => r, wo = Uu.trustedTypes, cf = wo ? wo.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, rp = "$lit$", fr = `lit$${Math.random().toFixed(9).slice(2)}$`, ip = "?" + fr, qm = `<${ip}>`, ri = document, Hn = () => ri.createComment(""), Vn = (r) => r === null || typeof r != "object" && typeof r != "function", Yu = Array.isArray, Km = (r) => Yu(r) || typeof r?.[Symbol.iterator] == "function", Ms = `[ 	
\f\r]`, Ji = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vf = /-->/g, df = />/g, Cr = RegExp(`>|${Ms}(?:([^\\s"'>=/]+)(${Ms}*=${Ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pf = /'/g, gf = /"/g, np = /^(?:script|style|textarea|title)$/i, Qm = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Y = Qm(1), Bi = Symbol.for("lit-noChange"), et = Symbol.for("lit-nothing"), yf = /* @__PURE__ */ new WeakMap(), qr = ri.createTreeWalker(ri, 129);
function ap(r, t) {
  if (!Yu(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return cf !== void 0 ? cf.createHTML(t) : t;
}
const jm = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ji;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, h, f = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, h = o.exec(l), h !== null); ) v = o.lastIndex, o === Ji ? h[1] === "!--" ? o = vf : h[1] !== void 0 ? o = df : h[2] !== void 0 ? (np.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Cr) : h[3] !== void 0 && (o = Cr) : o === Cr ? h[0] === ">" ? (o = n ?? Ji, f = -1) : h[1] === void 0 ? f = -2 : (f = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Cr : h[3] === '"' ? gf : pf) : o === gf || o === pf ? o = Cr : o === vf || o === df ? o = Ji : (o = Cr, n = void 0);
    const c = o === Cr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === Ji ? l + qm : f >= 0 ? (i.push(u), l.slice(0, f) + rp + l.slice(f) + fr + c) : l + fr + (f === -2 ? s : c);
  }
  return [ap(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Gn {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = jm(t, e);
    if (this.el = Gn.createElement(u, i), qr.currentNode = this.el.content, e === 2 || e === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (n = qr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const f of n.getAttributeNames()) if (f.endsWith(rp)) {
          const v = h[o++], c = n.getAttribute(f).split(fr), d = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: d[2], strings: c, ctor: d[1] === "." ? t0 : d[1] === "?" ? e0 : d[1] === "@" ? r0 : qo }), n.removeAttribute(f);
        } else f.startsWith(fr) && (l.push({ type: 6, index: a }), n.removeAttribute(f));
        if (np.test(n.tagName)) {
          const f = n.textContent.split(fr), v = f.length - 1;
          if (v > 0) {
            n.textContent = wo ? wo.emptyScript : "";
            for (let c = 0; c < v; c++) n.append(f[c], Hn()), qr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(f[v], Hn());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ip) l.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = n.data.indexOf(fr, f + 1)) !== -1; ) l.push({ type: 7, index: a }), f += fr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = ri.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Fi(r, t, e = r, i) {
  if (t === Bi) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = Vn(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = Fi(r, n._$AS(r, t.values), n, i)), t;
}
class Jm {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? ri).importNode(e, !0);
    qr.currentNode = n;
    let a = qr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ua(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new i0(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== l?.index && (a = qr.nextNode(), o++);
    }
    return qr.currentNode = ri, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ua {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = et, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Fi(this, t, e), Vn(t) ? t === et || t == null || t === "" ? (this._$AH !== et && this._$AR(), this._$AH = et) : t !== this._$AH && t !== Bi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Km(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== et && Vn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ri.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Gn.createElement(ap(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const a = new Jm(n, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = yf.get(t.strings);
    return e === void 0 && yf.set(t.strings, e = new Gn(t)), e;
  }
  k(t) {
    Yu(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new ua(this.O(Hn()), this.O(Hn()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ff(t).nextSibling;
      ff(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class qo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = et, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = et;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Fi(this, t, e, 0), o = !Vn(t) || t !== this._$AH && t !== Bi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Fi(this, s[i + l], e, l), u === Bi && (u = this._$AH[l]), o ||= !Vn(u) || u !== this._$AH[l], u === et ? t = et : t !== et && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === et ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class t0 extends qo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === et ? void 0 : t;
  }
}
class e0 extends qo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== et);
  }
}
class r0 extends qo {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Fi(this, t, e, 0) ?? et) === Bi) return;
    const i = this._$AH, n = t === et && i !== et || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== et && (i === et || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class i0 {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Fi(this, t);
  }
}
const n0 = Uu.litHtmlPolyfillSupport;
n0?.(Gn, ua), (Uu.litHtmlVersions ??= []).push("3.3.3");
const a0 = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = n = new ua(t.insertBefore(Hn(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xu = globalThis;
class Ge extends xi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = a0(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Bi;
  }
}
Ge._$litElement$ = !0, Ge.finalized = !0, Xu.litElementHydrateSupport?.({ LitElement: Ge });
const o0 = Xu.litElementPolyfillSupport;
o0?.({ LitElement: Ge });
(Xu.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ha = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s0 = { attribute: !0, type: String, converter: So, reflect: !1, hasChanged: Wu }, l0 = (r = s0, t, e) => {
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
function Ot(r) {
  return (t, e) => typeof e == "object" ? l0(r, t, e) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ke(r) {
  return Ot({ ...r, state: !0, attribute: !1 });
}
function u0(r) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function h0(r, t, e, i) {
  return r.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: e.toISOString(),
    end: i.toISOString()
  });
}
const op = "—";
function Mt(r, t) {
  return r === null || Number.isNaN(r) ? op : Math.abs(r) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    r / 1e3
  )} kW` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(r)} W`;
}
function Ct(r, t) {
  return r === null || Number.isNaN(r) ? op : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(r * 100)}%`;
}
function no(r) {
  if (r < 60) return `${Math.round(r)} s`;
  const t = Math.round(r / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
function sp(r) {
  if (typeof r == "object" && r !== null && "message" in r) {
    const t = r.message;
    if (typeof t == "string" && t) return t;
  }
  return String(r);
}
function f0(r, t, e) {
  return r === "raw" ? "Exact data" : r === "lts" ? "Hourly averages" : t ? `Mixed since ${new Date(t).toLocaleDateString(e)}` : "Mixed";
}
function mf(r, t) {
  return r >= 0.95 ? null : r <= 0 ? "No data for this period" : r < 0.01 ? "Data covers less than 1% of the period" : `Data covers only ${Ct(r, t)} of the period`;
}
function c0(r) {
  let t;
  return () => (t ??= r().finally(() => {
    t = void 0;
  }), t);
}
const lp = ["24h", "7d", "30d", "month", "year"], v0 = {
  "24h": "24 h",
  "7d": "7 days",
  "30d": "30 days",
  month: "This month",
  year: "Year"
}, ya = 24 * 3600 * 1e3, _f = 60 * 1e3;
function d0(r, t) {
  const e = new Date(Math.floor(t.getTime() / _f) * _f);
  switch (r) {
    case "24h":
      return { start: new Date(e.getTime() - ya), end: e };
    case "7d":
      return { start: new Date(e.getTime() - 7 * ya), end: e };
    case "30d":
      return { start: new Date(e.getTime() - 30 * ya), end: e };
    case "month":
      return { start: new Date(e.getFullYear(), e.getMonth(), 1, 0, 0, 0, 0), end: e };
    case "year":
      return { start: new Date(e.getTime() - 365 * ya), end: e };
  }
}
function p0(r, t, e, i) {
  const a = r.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && e.includes(a) ? a : i.tab,
    range: s && lp.includes(s) ? s : i.range,
    entryId: l || i.entryId
  };
}
function g0(r, t) {
  const e = new URLSearchParams({ range: t.range });
  return t.entryId && e.set("entry", t.entryId), `${r}/${t.tab}?${e.toString()}`;
}
const Ue = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  overload: "#d64545",
  muted: "#b0b6bf"
};
function fa() {
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
const De = (r, t) => Number(r.toFixed(t));
function y0(r, t) {
  const { base: e, axis: i } = fa(), n = r.histogram.buckets, a = n.map(
    (o) => String(t === "watts" ? De(o.start, 0) : De(o.start / r.rated_power * 100, 1))
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
        data: n.map((o) => De(o.fraction * 100, 2)),
        itemStyle: { color: Ue.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function m0(r) {
  const { base: t, axis: e } = fa();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "value", name: "W" },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: Ue.load },
        itemStyle: { color: Ue.load },
        data: r.duration_curve.map((i) => [
          De(i.fraction * 100, 2),
          De(i.value, 1)
        ])
      }
    ]
  };
}
function _0(r) {
  const { base: t, axis: e } = fa(), i = [...r.bands].reverse();
  return {
    ...t,
    xAxis: { ...e, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...e, type: "category", data: i.map((n) => n.key) },
    series: [
      {
        type: "bar",
        data: i.map((n) => De(n.fraction * 100, 2)),
        itemStyle: {
          color: (n) => i[n.dataIndex].key === "100+" ? Ue.overload : Ue.load
        }
      }
    ]
  };
}
function S0(r) {
  const { base: t, axis: e } = fa(), i = r.histogram;
  return {
    ...t,
    xAxis: {
      ...e,
      type: "category",
      data: i.map((n) => String(De(n.start * 100, 0))),
      name: "% imbalance",
      nameLocation: "end"
    },
    yAxis: { ...e, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: i.map((n) => De(n.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (n) => i[n.dataIndex].start >= r.threshold ? Ue.overload : Ue.load
        },
        barCategoryGap: "10%"
      }
    ]
  };
}
function w0(r, t) {
  const { base: e, axis: i } = fa();
  return {
    ...e,
    legend: { data: ["Mean", "Peak"], textStyle: e.textStyle },
    xAxis: { ...i, type: "category", data: r.map((n) => n.label) },
    yAxis: { ...i, type: "value", name: "W" },
    series: [
      {
        name: "Mean",
        type: "bar",
        data: r.map((n) => n.mean === null ? null : De(n.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: "Peak",
        type: "bar",
        data: r.map((n) => n.peak === null ? null : De(n.peak, 1)),
        itemStyle: { color: Ue.muted }
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
var Gl = function(r, t) {
  return Gl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, Gl(r, t);
};
function B(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Gl(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Zu = 12, b0 = "sans-serif", ii = Zu + "px " + b0, x0 = 20, T0 = 100, C0 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function M0(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - x0) / T0;
    t[i] = n;
  }
  return t;
}
var A0 = M0(C0), Ui = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Ui.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || ii), r.measureText(e);
      e = e || "", i = i || ii;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Zu, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = A0[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, up = Yi([
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
}, {}), hp = Yi([
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
}, {}), ca = Object.prototype.toString, Ko = Array.prototype, D0 = Ko.forEach, P0 = Ko.filter, qu = Ko.slice, L0 = Ko.map, Sf = function() {
}.constructor, ma = Sf ? Sf.prototype : null, Ku = "__proto__", I0 = 2311;
function fp() {
  return I0++;
}
function Qu() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function J(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = ca.call(r);
  if (e === "[object Array]") {
    if (!Dn(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = J(r[i]);
    }
  } else if (hp[e]) {
    if (!Dn(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!up[e] && !Dn(r) && !Wn(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== Ku && (t[o] = J(r[o]));
  }
  return t;
}
function it(r, t, e) {
  if (!H(t) || !H(r))
    return e ? J(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Ku) {
      var n = r[i], a = t[i];
      H(a) && H(n) && !F(a) && !F(n) && !Wn(a) && !Wn(n) && !wf(a) && !wf(n) && !Dn(a) && !Dn(n) ? it(n, a, e) : (e || !(i in r)) && (r[i] = J(t[i]));
    }
  return r;
}
function O(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== Ku && (r[e] = t[e]);
  return r;
}
function st(r, t, e) {
  for (var i = ct(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function ht(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function E0(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function Re(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    st(r, t);
}
function Gt(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function M(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === D0)
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
    return ju(r);
  if (r.map && r.map === L0)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function Yi(r, t, e, i) {
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
    return ju(r);
  if (r.filter && r.filter === P0)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function ct(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function R0(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(qu.call(arguments)));
  };
}
var dt = ma && X(ma.bind) ? ma.call.bind(ma.bind) : R0;
function qt(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(qu.call(arguments)));
  };
}
function F(r) {
  return Array.isArray ? Array.isArray(r) : ca.call(r) === "[object Array]";
}
function X(r) {
  return typeof r == "function";
}
function $(r) {
  return typeof r == "string";
}
function Wl(r) {
  return ca.call(r) === "[object String]";
}
function vt(r) {
  return typeof r == "number";
}
function H(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function wf(r) {
  return !!up[ca.call(r)];
}
function Wt(r) {
  return !!hp[ca.call(r)];
}
function Wn(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function Qo(r) {
  return r.colorStops != null;
}
function k0(r) {
  return r.image != null;
}
function bo(r) {
  return r !== r;
}
function Un() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function K(r, t) {
  return r ?? t;
}
function ao(r, t, e) {
  return r ?? t ?? e;
}
function ju(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return qu.apply(r, t);
}
function cp(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function Ye(r, t) {
  if (!r)
    throw new Error(t);
}
function Me(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var vp = "__ec_primitive__";
function Ul(r) {
  r[vp] = !0;
}
function Dn(r) {
  return r[vp];
}
var O0 = function() {
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
    return ct(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
}(), dp = typeof Map == "function";
function N0() {
  return dp ? /* @__PURE__ */ new Map() : new O0();
}
var B0 = function() {
  function r(t) {
    var e = F(t);
    this.data = N0();
    var i = this;
    t instanceof r ? t.each(n) : t && M(t, n);
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
    return dp ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function q(r) {
  return new B0(r);
}
function F0(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function jo(r, t) {
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
function pp(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function $i(r, t) {
  return r.hasOwnProperty(t);
}
function Vt() {
}
var $0 = 180 / Math.PI, z0 = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), H0 = /* @__PURE__ */ function() {
  function r() {
    this.browser = new z0(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), W = new H0();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (W.wxa = !0, W.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? W.worker = !0 : !W.hasGlobalWindow || "Deno" in window ? (W.node = !0, W.svgSupported = !0) : V0(navigator.userAgent, W);
function V0(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var G0 = ".", Mr = "___EC__COMPONENT__CONTAINER___", gp = "___EC__EXTENDED_CLASS___";
function Ae(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(G0);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function W0(r) {
  Ye(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function U0(r) {
  return !!(r && r[gp]);
}
function Ju(r, t) {
  r.$constructor = r, r.extend = function(e) {
    var i = this, n;
    return Y0(i) ? n = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, E0(n, this)), O(n.prototype, e), n[gp] = !0, n.extend = this.extend, n.superCall = q0, n.superApply = K0, n.superClass = i, n;
  };
}
function Y0(r) {
  return X(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function yp(r, t) {
  r.extend = t.extend;
}
var X0 = Math.round(Math.random() * 10);
function Z0(r) {
  var t = ["__\0is_clz", X0++].join("_");
  r.prototype[t] = !0, r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function q0(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function K0(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function Jo(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      W0(n), i.prototype.type = n;
      var a = Ae(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== Mr) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[Mr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Ae(i), a = [], o = t[n.main];
    return o && o[Mr] ? M(o, function(s, l) {
      l !== Mr && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Ae(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return M(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Ae(i), a = t[n.main];
    return a && a[Mr];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[Mr]) && (n = t[i.main] = {}, n[Mr] = !0), n;
  }
}
function Yn(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && ht(n, l) >= 0 || a && ht(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var Q0 = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], j0 = Yn(Q0), J0 = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return j0(this, t, e);
    }, r;
  }()
), mp = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), t_ = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new mp(t);
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
}(), va = function() {
  function r(t) {
    this._list = new t_(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new mp(e), s.key = t, i.insertEntry(s), n[t] = s;
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
}(), Yl = new va(50);
function e_(r) {
  if (typeof r == "string") {
    var t = Yl.get(r);
    return t && t.image;
  } else
    return r;
}
function _p(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = Yl.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !ts(t) && a.pending.push(o)) : (t = Ui.loadImage(r, bf, bf), t.__zrImageSrc = r, Yl.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function bf() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function ts(r) {
  return r && r.width && r.height;
}
function Li() {
  return [1, 0, 0, 1, 0, 0];
}
function th(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function r_(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function Ii(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function Xl(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function eh(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(e), f = Math.cos(e);
  return r[0] = n * f + s * h, r[1] = -n * h + s * f, r[2] = a * f + l * h, r[3] = -a * h + f * l, r[4] = f * (o - i[0]) + h * (u - i[1]) + i[0], r[5] = f * (u - i[1]) - h * (o - i[0]) + i[1], r;
}
function i_(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function rh(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var ut = function() {
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
}(), _a = Math.min, Sa = Math.max, Ar = new ut(), Dr = new ut(), Pr = new ut(), Lr = new ut(), tn = new ut(), en = new ut(), rt = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = _a(t.x, this.x), i = _a(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Sa(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Sa(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = Li();
    return Xl(a, a, [-e.x, -e.y]), i_(a, a, [i, n]), Xl(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, h = t.y, f = t.y + t.height, v = !(a < l || u < n || s < h || f < o);
    if (e) {
      var c = 1 / 0, d = 0, y = Math.abs(a - l), p = Math.abs(u - n), g = Math.abs(s - h), m = Math.abs(f - o), _ = Math.min(y, p), S = Math.min(g, m);
      a < l || u < n ? _ > d && (d = _, y < p ? ut.set(en, -y, 0) : ut.set(en, p, 0)) : _ < c && (c = _, y < p ? ut.set(tn, y, 0) : ut.set(tn, -p, 0)), s < h || f < o ? S > d && (d = S, g < m ? ut.set(en, 0, -g) : ut.set(en, 0, m)) : _ < c && (c = _, g < m ? ut.set(tn, 0, g) : ut.set(tn, 0, -m));
    }
    return e && ut.copy(e, v ? tn : en), v;
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
    Ar.x = Pr.x = e.x, Ar.y = Lr.y = e.y, Dr.x = Lr.x = e.x + e.width, Dr.y = Pr.y = e.y + e.height, Ar.transform(i), Lr.transform(i), Dr.transform(i), Pr.transform(i), t.x = _a(Ar.x, Dr.x, Pr.x, Lr.x), t.y = _a(Ar.y, Dr.y, Pr.y, Lr.y);
    var l = Sa(Ar.x, Dr.x, Pr.x, Lr.x), u = Sa(Ar.y, Dr.y, Pr.y, Lr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
}(), xf = {};
function Kt(r, t) {
  t = t || ii;
  var e = xf[t];
  e || (e = xf[t] = new va(500));
  var i = e.get(r);
  return i == null && (i = Ui.measureText(r, t).width, e.put(r, i)), i;
}
function Tf(r, t, e, i) {
  var n = Kt(r, t), a = nh(t), o = Sn(0, n, e), s = Ti(0, a, i), l = new rt(o, s, n, a);
  return l;
}
function ih(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return Tf(n[0], t, e, i);
  for (var o = new rt(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = Tf(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function Sn(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function Ti(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function nh(r) {
  return Kt("国", r);
}
function _r(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function xo(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, h = "left", f = "top";
  if (i instanceof Array)
    l += _r(i[0], e.width), u += _r(i[1], e.height), h = null, f = null;
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
var As = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function n_(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Sp(e, i, n, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    wp(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function Sp(r, t, e, i) {
  i = i || {};
  var n = O({}, i);
  n.font = t, e = K(e, "..."), n.maxIterations = K(i.maxIterations, 2);
  var a = n.minChar = K(i.minChar, 0);
  n.cnCharWidth = Kt("国", t);
  var o = n.ascCharWidth = Kt("a", t);
  n.placeholder = K(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = Kt(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function wp(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = Kt(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? a_(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = Kt(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function a_(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function o_(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = nh(n), s = K(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, f = t.width, v;
  f != null && (e === "break" || e === "breakAll") ? v = r ? bp(r, t.font, f, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var c = v.length * s, d = K(t.height, c);
  if (c > d && u) {
    var y = Math.floor(d / s);
    h = h || v.length > y, v = v.slice(0, y);
  }
  if (r && a && f != null)
    for (var p = Sp(f, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), g = {}, m = 0; m < v.length; m++)
      wp(g, v[m], p), v[m] = g.textLine, h = h || g.isTruncated;
  for (var _ = d, S = 0, m = 0; m < v.length; m++)
    S = Math.max(Kt(v[m], n), S);
  f == null && (f = S);
  var b = S;
  return i && (_ += i[0] + i[2], b += i[1] + i[3], f += i[1] + i[3]), l && (b = f), {
    lines: v,
    height: d,
    outerWidth: b,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: S,
    contentHeight: c,
    width: f,
    isTruncated: h
  };
}
var s_ = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), Cf = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), l_ = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
}();
function u_(r, t) {
  var e = new l_();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = As.lastIndex = 0, l; (l = As.exec(r)) != null; ) {
    var u = l.index;
    u > s && Ds(e, r.substring(s, u), t, o), Ds(e, l[2], t, o, l[1]), s = As.lastIndex;
  }
  s < r.length && Ds(e, r.substring(s, r.length), t, o);
  var h = [], f = 0, v = 0, c = t.padding, d = a === "truncate", y = t.lineOverflow === "truncate", p = {};
  function g(V, Z, Q) {
    V.width = Z, V.lineHeight = Q, f += Q, v = Math.max(v, Z);
  }
  t: for (var m = 0; m < e.lines.length; m++) {
    for (var _ = e.lines[m], S = 0, b = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], C = x.styleName && t.rich[x.styleName] || {}, A = x.textPadding = C.padding, D = A ? A[1] + A[3] : 0, T = x.font = C.font || t.font;
      x.contentHeight = nh(T);
      var P = K(C.height, x.contentHeight);
      if (x.innerHeight = P, A && (P += A[0] + A[2]), x.height = P, x.lineHeight = ao(C.lineHeight, t.lineHeight, P), x.align = C && C.align || t.align, x.verticalAlign = C && C.verticalAlign || "middle", y && n != null && f + x.lineHeight > n) {
        var L = e.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), g(_, b, S), e.lines = e.lines.slice(0, m + 1)) : e.lines = e.lines.slice(0, m), e.isTruncated = e.isTruncated || e.lines.length < L;
        break t;
      }
      var I = C.width, E = I == null || I === "auto";
      if (typeof I == "string" && I.charAt(I.length - 1) === "%")
        x.percentWidth = I, h.push(x), x.contentWidth = Kt(x.text, T);
      else {
        if (E) {
          var R = C.backgroundColor, z = R && R.image;
          z && (z = e_(z), ts(z) && (x.width = Math.max(x.width, z.width * P / z.height)));
        }
        var k = d && i != null ? i - b : null;
        k != null && k < x.width ? !E || k < D ? (x.text = "", x.width = x.contentWidth = 0) : (n_(p, x.text, k - D, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, e.isTruncated = e.isTruncated || p.isTruncated, x.width = x.contentWidth = Kt(x.text, T)) : x.contentWidth = Kt(x.text, T);
      }
      x.width += D, b += x.width, C && (S = Math.max(S, x.lineHeight));
    }
    g(_, b, S);
  }
  e.outerWidth = e.width = K(i, v), e.outerHeight = e.height = K(n, f), e.contentHeight = f, e.contentWidth = v, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], N = x.percentWidth;
    x.width = parseInt(N, 10) / 100 * e.width;
  }
  return e;
}
function Ds(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, h, f;
  if (i) {
    var v = o.padding, c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = _r(o.width, i.width) + c;
      s.length > 0 && d + i.accumWidth > i.width && (h = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var y = bp(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = y.accumWidth + c, f = y.linesWidths, h = y.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var g = h[p], m = new s_();
    if (m.styleName = n, m.text = g, m.isLineHolder = !g && !a, typeof o.width == "number" ? m.width = o.width : m.width = f ? f[p] : Kt(g, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Cf())).tokens, S = _.length;
      S === 1 && _[0].isLineHolder ? _[0] = m : (g || !S || a) && _.push(m);
    } else
      s.push(new Cf([m]));
  }
}
function h_(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var f_ = Yi(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function c_(r) {
  return h_(r) ? !!f_[r] : !0;
}
function bp(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, f = 0; f < r.length; f++) {
    var v = r.charAt(f);
    if (v === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var c = Kt(v, t), d = i ? !1 : !c_(v);
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
function Xi(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function v_(r) {
  return [r[0], r[1]];
}
function Mf(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function d_(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function p_(r) {
  return Math.sqrt(g_(r));
}
function g_(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Ps(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function y_(r, t) {
  var e = p_(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function Zl(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var m_ = Zl;
function __(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var Ei = __;
function se(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Mi(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Ai(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var Af = th, Df = 5e-5;
function Ir(r) {
  return r > Df || r < -Df;
}
var Er = [], ui = [], Ls = Li(), Is = Math.abs, ah = function() {
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
    return Ir(this.rotation) || Ir(this.x) || Ir(this.y) || Ir(this.scaleX - 1) || Ir(this.scaleY - 1) || Ir(this.skewX) || Ir(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (Af(i), this.invTransform = null);
      return;
    }
    i = i || Li(), e ? this.getLocalTransform(i) : Af(i), t && (e ? Ii(i, t, i) : r_(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(Er);
      var i = Er[0] < 0 ? -1 : 1, n = Er[1] < 0 ? -1 : 1, a = ((Er[0] - i) * e + i) / Er[0] || 0, o = ((Er[1] - n) * e + n) / Er[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Li(), rh(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || Li(), Ii(ui, t.invTransform, e), e = ui);
      var i = this.originX, n = this.originY;
      (i || n) && (Ls[4] = i, Ls[5] = n, Ii(ui, e, Ls), ui[4] -= i, ui[5] -= n, e = ui), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && se(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && se(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && Is(t[0] - 1) > 1e-10 && Is(t[3] - 1) > 1e-10 ? Math.sqrt(Is(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    S_(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, f = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, y = n + l;
      e[4] = -d * a - v * y * o, e[5] = -y * o - c * d * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = v * o, u && eh(e, e, u), e[4] += i + h, e[5] += n + f, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), Xn = [
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
function S_(r, t) {
  for (var e = 0; e < Xn.length; e++) {
    var i = Xn[e];
    r[i] = t[i];
  }
}
var Pn = {
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
    return 1 - Pn.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? Pn.bounceIn(r * 2) * 0.5 : Pn.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, wa = Math.pow, dr = Math.sqrt, To = 1e-8, xp = 1e-4, Pf = dr(3), ba = 1 / 3, Ce = Xi(), ie = Xi(), Ri = Xi();
function cr(r) {
  return r > -To && r < To;
}
function Tp(r) {
  return r > To || r < -To;
}
function wt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function Lf(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function Co(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, h = s * s - 3 * o * l, f = s * l - 9 * o * u, v = l * l - 3 * s * u, c = 0;
  if (cr(h) && cr(f))
    if (cr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[c++] = d);
    }
  else {
    var y = f * f - 4 * h * v;
    if (cr(y)) {
      var p = f / h, d = -s / o + p, g = -p / 2;
      d >= 0 && d <= 1 && (a[c++] = d), g >= 0 && g <= 1 && (a[c++] = g);
    } else if (y > 0) {
      var m = dr(y), _ = h * s + 1.5 * o * (-f + m), S = h * s + 1.5 * o * (-f - m);
      _ < 0 ? _ = -wa(-_, ba) : _ = wa(_, ba), S < 0 ? S = -wa(-S, ba) : S = wa(S, ba);
      var d = (-s - (_ + S)) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d);
    } else {
      var b = (2 * h * s - 3 * o * f) / (2 * dr(h * h * h)), w = Math.acos(b) / 3, x = dr(h), C = Math.cos(w), d = (-s - 2 * x * C) / (3 * o), g = (-s + x * (C + Pf * Math.sin(w))) / (3 * o), A = (-s + x * (C - Pf * Math.sin(w))) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d), g >= 0 && g <= 1 && (a[c++] = g), A >= 0 && A <= 1 && (a[c++] = A);
    }
  }
  return c;
}
function Cp(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (cr(o)) {
    if (Tp(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = a * a - 4 * o * s;
    if (cr(h))
      n[0] = -a / (2 * o);
    else if (h > 0) {
      var f = dr(h), u = (-a + f) / (2 * o), v = (-a - f) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Mo(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, h = (l - s) * n + s, f = (h - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = f, a[4] = f, a[5] = h, a[6] = l, a[7] = i;
}
function w_(r, t, e, i, n, a, o, s, l, u, h) {
  var f, v = 5e-3, c = 1 / 0, d, y, p, g;
  Ce[0] = l, Ce[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    ie[0] = wt(r, e, n, o, m), ie[1] = wt(t, i, a, s, m), p = Ei(Ce, ie), p < c && (f = m, c = p);
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < xp); _++)
    d = f - v, y = f + v, ie[0] = wt(r, e, n, o, d), ie[1] = wt(t, i, a, s, d), p = Ei(ie, Ce), d >= 0 && p < c ? (f = d, c = p) : (Ri[0] = wt(r, e, n, o, y), Ri[1] = wt(t, i, a, s, y), g = Ei(Ri, Ce), y <= 1 && g < c ? (f = y, c = g) : v *= 0.5);
  return dr(c);
}
function b_(r, t, e, i, n, a, o, s, l) {
  for (var u = r, h = t, f = 0, v = 1 / l, c = 1; c <= l; c++) {
    var d = c * v, y = wt(r, e, n, o, d), p = wt(t, i, a, s, d), g = y - u, m = p - h;
    f += Math.sqrt(g * g + m * m), u = y, h = p;
  }
  return f;
}
function Ft(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function If(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function x_(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (cr(a)) {
    if (Tp(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var h = o * o - 4 * a * s;
    if (cr(h)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (h > 0) {
      var f = dr(h), u = (-o + f) / (2 * a), v = (-o - f) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Mp(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function Ao(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function T_(r, t, e, i, n, a, o, s, l) {
  var u, h = 5e-3, f = 1 / 0;
  Ce[0] = o, Ce[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    ie[0] = Ft(r, e, n, v), ie[1] = Ft(t, i, a, v);
    var c = Ei(Ce, ie);
    c < f && (u = v, f = c);
  }
  f = 1 / 0;
  for (var d = 0; d < 32 && !(h < xp); d++) {
    var y = u - h, p = u + h;
    ie[0] = Ft(r, e, n, y), ie[1] = Ft(t, i, a, y);
    var c = Ei(ie, Ce);
    if (y >= 0 && c < f)
      u = y, f = c;
    else {
      Ri[0] = Ft(r, e, n, p), Ri[1] = Ft(t, i, a, p);
      var g = Ei(Ri, Ce);
      p <= 1 && g < f ? (u = p, f = g) : h *= 0.5;
    }
  }
  return dr(f);
}
function C_(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, h = 1 / o, f = 1; f <= o; f++) {
    var v = f * h, c = Ft(r, e, n, v), d = Ft(t, i, a, v), y = c - s, p = d - l;
    u += Math.sqrt(y * y + p * p), s = c, l = d;
  }
  return u;
}
var M_ = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Ap(r) {
  var t = r && M_.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Me(e[0]), n = +Me(e[1]), a = +Me(e[2]), o = +Me(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Co(0, i, a, 1, l, s) && wt(0, n, o, 1, s[0]);
    };
  }
}
var A_ = function() {
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
    this.easing = t, this.easingFunc = X(t) ? t : Pn[t] || Ap(t);
  }, r;
}(), Ef = {
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
function pr(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function ql(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Es(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? pr(parseFloat(t) / 100 * 255) : pr(parseInt(t, 10));
}
function Ln(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? ql(parseFloat(t) / 100) : ql(parseFloat(t));
}
function Rs(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function xa(r, t, e) {
  return r + (t - r) * e;
}
function Jt(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function Kl(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var Dp = new va(20), Ta = null;
function hi(r, t) {
  Ta && Kl(Ta, t), Ta = Dp.put(r, Ta || t.slice());
}
function gr(r, t) {
  if (r) {
    t = t || [];
    var e = Dp.get(r);
    if (e)
      return Kl(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in Ef)
      return Kl(t, Ef[i]), hi(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          Jt(t, 0, 0, 0, 1);
          return;
        }
        return Jt(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), hi(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          Jt(t, 0, 0, 0, 1);
          return;
        }
        return Jt(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), hi(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? Jt(t, +u[0], +u[1], +u[2], 1) : Jt(t, 0, 0, 0, 1);
          h = Ln(u.pop());
        case "rgb":
          if (u.length >= 3)
            return Jt(t, Es(u[0]), Es(u[1]), Es(u[2]), u.length === 3 ? h : Ln(u[3])), hi(r, t), t;
          Jt(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            Jt(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Ln(u[3]), Rf(u, t), hi(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            Jt(t, 0, 0, 0, 1);
            return;
          }
          return Rf(u, t), hi(r, t), t;
        default:
          return;
      }
    }
    Jt(t, 0, 0, 0, 1);
  }
}
function Rf(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Ln(r[1]), n = Ln(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], Jt(t, pr(Rs(o, a, e + 1 / 3) * 255), pr(Rs(o, a, e) * 255), pr(Rs(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function kf(r, t) {
  var e = gr(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return oh(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function D_(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = gr(t[n]), s = gr(t[a]), l = i - n, u = oh([
      pr(xa(o[0], s[0], l)),
      pr(xa(o[1], s[1], l)),
      pr(xa(o[2], s[2], l)),
      ql(xa(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function oh(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function Do(r, t) {
  var e = gr(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Of = new va(100);
function Nf(r) {
  if ($(r)) {
    var t = Of.get(r);
    return t || (t = kf(r, -0.1), Of.put(r, t)), t;
  } else if (Qo(r)) {
    var e = O({}, r);
    return e.colorStops = G(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: kf(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function P_(r) {
  return r.type === "linear";
}
function L_(r) {
  return r.type === "radial";
}
(function() {
  return W.hasGlobalWindow && X(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return null;
  };
})();
var Ql = Array.prototype.slice;
function $e(r, t, e) {
  return (t - r) * e + r;
}
function ks(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = $e(t[a], e[a], i);
  return r;
}
function I_(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = $e(t[o][s], e[o][s], i);
  }
  return r;
}
function Ca(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function Bf(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function E_(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function R_(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : Ql.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(i[l][h]) && (i[l][h] = n[l][h]);
  }
}
function oo(r) {
  if (Gt(r)) {
    var t = r.length;
    if (Gt(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(Ql.call(r[i]));
      return e;
    }
    return Ql.call(r);
  }
  return r;
}
function so(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function k_(r) {
  return Gt(r && r[0]) ? 2 : 1;
}
var Ma = 0, lo = 1, Pp = 2, wn = 3, jl = 4, Jl = 5, Ff = 6;
function $f(r) {
  return r === jl || r === Jl;
}
function Aa(r) {
  return r === lo || r === Pp;
}
var rn = [0, 0, 0, 0], O_ = function() {
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
    var n = this.keyframes, a = n.length, o = !1, s = Ff, l = e;
    if (Gt(e)) {
      var u = k_(e);
      s = u, (u === 1 && !vt(e[0]) || u === 2 && !vt(e[0][0])) && (o = !0);
    } else if (vt(e) && !bo(e))
      s = Ma;
    else if ($(e))
      if (!isNaN(+e))
        s = Ma;
      else {
        var h = gr(e);
        h && (l = h, s = wn);
      }
    else if (Qo(e)) {
      var f = O({}, l);
      f.colorStops = G(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: gr(c.color)
        };
      }), P_(e) ? s = jl : L_(e) && (s = Jl), l = f;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Ff) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = X(i) ? i : Pn[i] || Ap(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(y, p) {
      return y.time - p.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Aa(n), u = $f(n), h = 0; h < a; h++) {
      var f = i[h], v = f.value, c = o.value;
      f.percent = f.time / t, s || (l && h !== a - 1 ? R_(v, c, n) : u && E_(v.colorStops, c.colorStops));
    }
    if (!s && n !== Jl && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var d = i[0].value, h = 0; h < a; h++)
        n === Ma ? i[h].additiveValue = i[h].value - d : n === wn ? i[h].additiveValue = Ca([], i[h].value, d, -1) : Aa(n) && (i[h].additiveValue = n === lo ? Ca([], i[h].value, d, -1) : Bf([], i[h].value, d, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === wn, h, f = this._lastFr, v = Math.min, c, d;
      if (s === 1)
        c = d = o[0];
      else {
        if (e < 0)
          h = 0;
        else if (e < this._lastFrP) {
          var y = v(f + 1, s - 1);
          for (h = y; h >= 0 && !(o[h].percent <= e); h--)
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
        var p = d.percent - c.percent, g = p === 0 ? 1 : v((e - c.percent) / p, 1);
        d.easingFunc && (g = d.easingFunc(g));
        var m = i ? this._additiveValue : u ? rn : t[l];
        if ((Aa(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = g < 1 ? c.rawValue : d.rawValue;
        else if (Aa(a))
          a === lo ? ks(m, c[n], d[n], g) : I_(m, c[n], d[n], g);
        else if ($f(a)) {
          var _ = c[n], S = d[n], b = a === jl;
          t[l] = {
            type: b ? "linear" : "radial",
            x: $e(_.x, S.x, g),
            y: $e(_.y, S.y, g),
            colorStops: G(_.colorStops, function(x, C) {
              var A = S.colorStops[C];
              return {
                offset: $e(x.offset, A.offset, g),
                color: so(ks([], x.color, A.color, g))
              };
            }),
            global: S.global
          }, b ? (t[l].x2 = $e(_.x2, S.x2, g), t[l].y2 = $e(_.y2, S.y2, g)) : t[l].r = $e(_.r, S.r, g);
        } else if (u)
          ks(m, c[n], d[n], g), i || (t[l] = so(m));
        else {
          var w = $e(c[n], d[n], g);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === Ma ? t[i] = t[i] + n : e === wn ? (gr(t[i], rn), Ca(rn, rn, n, 1), t[i] = so(rn)) : e === lo ? Ca(t[i], t[i], n, 1) : e === Pp && Bf(t[i], t[i], n, 1);
  }, r;
}(), sh = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      Qu("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, e, ct(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new O_(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var f = h.keyframes, v = f[f.length - 1];
          u = v && v.value, h.valType === wn && u && (u = so(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, oo(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, oo(e[s]), n);
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
        var v = new A_({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var d = e._additiveAnimators;
            if (d) {
              for (var y = !1, p = 0; p < d.length; p++)
                if (d[p]._clip) {
                  y = !0;
                  break;
                }
              y || (e._additiveAnimators = null);
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
          l && (t[a] = oo(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || ct(t);
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
}(), Lp = 1;
W.hasGlobalWindow && (Lp = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Po = Lp, tu = 0.4, eu = "#333", ru = "#ccc", N_ = "#eee", Zt = 1, bn = 2, Ci = 4, Os = "__zr_normal__", Ns = Xn.concat(["ignore"]), B_ = Yi(Xn, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), fi = {}, F_ = new rt(0, 0, 0, 0), es = function() {
  function r(t) {
    this.id = fp(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = F_;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), n || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(fi, i, h) : xo(fi, i, h), a.x = fi.x, a.y = fi.y, o = fi.align, s = fi.verticalAlign;
        var f = i.origin;
        if (f && i.rotation != null) {
          var v = void 0, c = void 0;
          f === "center" ? (v = h.width * 0.5, c = h.height * 0.5) : (v = _r(f[0], h.width), c = _r(f[1], h.height)), u = !0, a.originX = -a.x + v + (n ? 0 : h.x), a.originY = -a.y + c + (n ? 0 : h.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var y = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, p = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), g = void 0, m = void 0, _ = void 0;
      y && this.canBeInsideText() ? (g = i.insideFill, m = i.insideStroke, (g == null || g === "auto") && (g = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(g), _ = !0)) : (g = i.outsideFill, m = i.outsideStroke, (g == null || g === "auto") && (g = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(g), _ = !0)), g = g || "#000", (g !== p.fill || m !== p.stroke || _ !== p.autoStroke || o !== p.align || s !== p.verticalAlign) && (l = !0, p.fill = g, p.stroke = m, p.autoStroke = _, p.align = o, p.verticalAlign = s, e.setDefaultTextStyle(p)), e.__dirty |= Zt, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? ru : eu;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && gr(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, oh(i, "rgba");
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
    else if (H(t))
      for (var i = t, n = ct(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== Os)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, Ns);
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
    this.useState(Os, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === Os, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(ht(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Qu("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var h = !!(u && u.hoverLayer || n);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var f = this._textContent, v = this._textGuide;
        return f && f.useState(t, e, i, h), v && v.useState(t, e, i, h), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt), u;
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
      var y = this._textContent, p = this._textGuide;
      y && y.useStates(t, e, v), p && p.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt);
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
    var e = ht(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = ht(n, t), o = ht(n, e) >= 0;
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
    for (var l = {}, u = !1, h = 0; h < Ns.length; h++) {
      var f = Ns[h], v = a && B_[f];
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new ah(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= Zt;
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
    var n = t ? this[t] : this, a = new sh(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = ht(a, t);
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
    Bs(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    Bs(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = Bs(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Zt;
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
Re(es, ke);
Re(es, ah);
function Bs(r, t, e, i, n) {
  e = e || {};
  var a = [];
  Ip(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, f = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(d, y) {
    e.during(y);
  });
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    h && c.done(h), f && c.aborted(f), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function Fs(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function $_(r) {
  return Gt(r[0]);
}
function z_(r, t, e) {
  if (Gt(t[e]))
    if (Gt(r[e]) || (r[e] = []), Wt(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), Fs(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if ($_(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? Fs(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        Fs(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function H_(r, t) {
  return r === t || Gt(r) && Gt(t) && V_(r, t);
}
function V_(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function Ip(r, t, e, i, n, a, o, s) {
  for (var l = ct(i), u = n.duration, h = n.delay, f = n.additive, v = n.setToFinal, c = !H(a), d = r.animators, y = [], p = 0; p < l.length; p++) {
    var g = l[p], m = i[g];
    if (m != null && e[g] != null && (c || a[g]))
      if (H(m) && !Gt(m) && !Qo(m)) {
        if (t) {
          s || (e[g] = m, r.updateDuringAnimation(t));
          continue;
        }
        Ip(r, g, e[g], m, n, a && a[g], o, s);
      } else
        y.push(g);
    else s || (e[g] = m, r.updateDuringAnimation(t), y.push(g));
  }
  var _ = y.length;
  if (!f && _)
    for (var S = 0; S < d.length; S++) {
      var b = d[S];
      if (b.targetName === t) {
        var w = b.stopTracks(y);
        if (w) {
          var x = ht(d, b);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (y = Dt(y, function(T) {
    return !H_(i[T], e[T]);
  }), _ = y.length), _ > 0 || n.force && !o.length) {
    var C = void 0, A = void 0, D = void 0;
    if (s) {
      A = {}, v && (C = {});
      for (var S = 0; S < _; S++) {
        var g = y[S];
        A[g] = e[g], v ? C[g] = i[g] : e[g] = i[g];
      }
    } else if (v) {
      D = {};
      for (var S = 0; S < _; S++) {
        var g = y[S];
        D[g] = oo(e[g]), z_(e, i, g);
      }
    }
    var b = new sh(e, !1, !1, f ? Dt(d, function(P) {
      return P.targetName === t;
    }) : null);
    b.targetName = t, n.scope && (b.scope = n.scope), v && C && b.whenWithKeys(0, C, y), D && b.whenWithKeys(0, D, y), b.whenWithKeys(u ?? 500, s ? A : i, y).delay(h || 0), r.addAnimator(b, t), o.push(b);
  }
}
var iu = "__zr_style_" + Math.round(Math.random() * 10), Jr = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, rs = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Jr[iu] = !0;
var zf = ["z", "z2", "invisible"], G_ = ["invisible"], da = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = ct(e), n = 0; n < i.length; n++) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && W_(this, e, i) || o && !o[0] && !o[3])
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
      e = this._paintRect || (this._paintRect = new rt(0, 0, 0, 0)), i ? rt.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new rt(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
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
    e || this.markRedraw(), this.__dirty |= bn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & bn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~bn;
  }, t.prototype.createStyle = function(e) {
    return jo(Jr, e);
  }, t.prototype.useStyle = function(e) {
    e[iu] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[iu];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, zf);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var f = ct(h), v = 0; v < f.length; v++) {
            var c = f[v];
            c in u && (u[c] = u[c], this.style[c] = h[c]);
          }
        for (var d = ct(u), v = 0; v < d.length; v++) {
          var c = d[v];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var y = this.__inHover ? G_ : zf, v = 0; v < y.length; v++) {
      var c = y[v];
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
    return rs;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Zt | bn;
  }(), t;
}(es), $s = new rt(0, 0, 0, 0), zs = new rt(0, 0, 0, 0);
function W_(r, t, e) {
  return $s.copy(r.getBoundingRect()), r.transform && $s.applyTransform(r.transform), zs.width = t, zs.height = e, !$s.intersect(zs);
}
var ne = Math.min, ae = Math.max, Hs = Math.sin, Vs = Math.cos, Rr = Math.PI * 2, Da = Xi(), Pa = Xi(), La = Xi();
function Hf(r, t, e, i, n, a) {
  n[0] = ne(r, e), n[1] = ne(t, i), a[0] = ae(r, e), a[1] = ae(t, i);
}
var Vf = [], Gf = [];
function U_(r, t, e, i, n, a, o, s, l, u) {
  var h = Cp, f = wt, v = h(r, e, n, o, Vf);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var c = 0; c < v; c++) {
    var d = f(r, e, n, o, Vf[c]);
    l[0] = ne(d, l[0]), u[0] = ae(d, u[0]);
  }
  v = h(t, i, a, s, Gf);
  for (var c = 0; c < v; c++) {
    var y = f(t, i, a, s, Gf[c]);
    l[1] = ne(y, l[1]), u[1] = ae(y, u[1]);
  }
  l[0] = ne(r, l[0]), u[0] = ae(r, u[0]), l[0] = ne(o, l[0]), u[0] = ae(o, u[0]), l[1] = ne(t, l[1]), u[1] = ae(t, u[1]), l[1] = ne(s, l[1]), u[1] = ae(s, u[1]);
}
function Y_(r, t, e, i, n, a, o, s) {
  var l = Mp, u = Ft, h = ae(ne(l(r, e, n), 1), 0), f = ae(ne(l(t, i, a), 1), 0), v = u(r, e, n, h), c = u(t, i, a, f);
  o[0] = ne(r, n, v), o[1] = ne(t, a, c), s[0] = ae(r, n, v), s[1] = ae(t, a, c);
}
function X_(r, t, e, i, n, a, o, s, l) {
  var u = Mi, h = Ai, f = Math.abs(n - a);
  if (f % Rr < 1e-4 && f > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (Da[0] = Vs(n) * e + r, Da[1] = Hs(n) * i + t, Pa[0] = Vs(a) * e + r, Pa[1] = Hs(a) * i + t, u(s, Da, Pa), h(l, Da, Pa), n = n % Rr, n < 0 && (n = n + Rr), a = a % Rr, a < 0 && (a = a + Rr), n > a && !o ? a += Rr : n < a && o && (n += Rr), o) {
    var v = a;
    a = n, n = v;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && (La[0] = Vs(c) * e + r, La[1] = Hs(c) * i + t, u(s, La, s), h(l, La, l));
}
var tt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, kr = [], Or = [], we = [], tr = [], be = [], xe = [], Gs = Math.min, Ws = Math.max, Nr = Math.cos, Br = Math.sin, Be = Math.abs, nu = Math.PI, ur = nu * 2, Us = typeof Float32Array < "u", nn = [];
function Ys(r) {
  var t = Math.round(r / nu * 1e8) / 1e8;
  return t % 2 * nu;
}
function Z_(r, t) {
  var e = Ys(r[0]);
  e < 0 && (e += ur);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= ur ? n = e + ur : t && e - n >= ur ? n = e - ur : !t && e > n ? n = e + (ur - Ys(e - n)) : t && e < n && (n = e - (ur - Ys(n - e))), r[0] = e, r[1] = n;
}
var ni = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Be(i / Po / t) || 0, this._uy = Be(i / Po / e) || 0);
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
    var i = Be(t - this._xi), n = Be(e - this._yi), a = i > this._ux || n > this._uy;
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
    this._drawPendingPt(), nn[0] = n, nn[1] = a, Z_(nn, o), n = nn[0], a = nn[1];
    var s = a - n;
    return this.addData(tt.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = Nr(a) * i + t, this._yi = Br(a) * i + e, this;
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
    !(this.data && this.data.length === e) && Us && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    Us && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
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
      t instanceof Array && (t.length = this._len, Us && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    we[0] = we[1] = be[0] = be[1] = Number.MAX_VALUE, tr[0] = tr[1] = xe[0] = xe[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case tt.M:
          e = n = t[o++], i = a = t[o++], be[0] = n, be[1] = a, xe[0] = n, xe[1] = a;
          break;
        case tt.L:
          Hf(e, i, t[o], t[o + 1], be, xe), e = t[o++], i = t[o++];
          break;
        case tt.C:
          U_(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], be, xe), e = t[o++], i = t[o++];
          break;
        case tt.Q:
          Y_(e, i, t[o++], t[o++], t[o], t[o + 1], be, xe), e = t[o++], i = t[o++];
          break;
        case tt.A:
          var u = t[o++], h = t[o++], f = t[o++], v = t[o++], c = t[o++], d = t[o++] + c;
          o += 1;
          var y = !t[o++];
          l && (n = Nr(c) * f + u, a = Br(c) * v + h), X_(u, h, f, v, c, d, y, be, xe), e = Nr(d) * f + u, i = Br(d) * v + h;
          break;
        case tt.R:
          n = e = t[o++], a = i = t[o++];
          var p = t[o++], g = t[o++];
          Hf(n, a, n + p, a + g, be, xe);
          break;
        case tt.Z:
          e = n, i = a;
          break;
      }
      Mi(we, we, be), Ai(tr, tr, xe);
    }
    return o === 0 && (we[0] = we[1] = tr[0] = tr[1] = 0), new rt(we[0], we[1], tr[0] - we[0], tr[1] - we[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, f = 0, v = 0; v < e; ) {
      var c = t[v++], d = v === 1;
      d && (a = t[v], o = t[v + 1], s = a, l = o);
      var y = -1;
      switch (c) {
        case tt.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case tt.L: {
          var p = t[v++], g = t[v++], m = p - a, _ = g - o;
          (Be(m) > i || Be(_) > n || v === e - 1) && (y = Math.sqrt(m * m + _ * _), a = p, o = g);
          break;
        }
        case tt.C: {
          var S = t[v++], b = t[v++], p = t[v++], g = t[v++], w = t[v++], x = t[v++];
          y = b_(a, o, S, b, p, g, w, x, 10), a = w, o = x;
          break;
        }
        case tt.Q: {
          var S = t[v++], b = t[v++], p = t[v++], g = t[v++];
          y = C_(a, o, S, b, p, g, 10), a = p, o = g;
          break;
        }
        case tt.A:
          var C = t[v++], A = t[v++], D = t[v++], T = t[v++], P = t[v++], L = t[v++], I = L + P;
          v += 1, d && (s = Nr(P) * D + C, l = Br(P) * T + A), y = Ws(D, T) * Gs(ur, Math.abs(L)), a = Nr(I) * D + C, o = Br(I) * T + A;
          break;
        case tt.R: {
          s = a = t[v++], l = o = t[v++];
          var E = t[v++], R = t[v++];
          y = E * 2 + R * 2;
          break;
        }
        case tt.Z: {
          var m = s - a, _ = l - o;
          y = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      y >= 0 && (u[f++] = y, h += y);
    }
    return this._pathLen = h, h;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, h, f, v, c = e < 1, d, y, p = 0, g = 0, m, _ = 0, S, b;
    if (!(c && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, y = this._pathLen, m = e * y, !m)))
      t: for (var w = 0; w < o; ) {
        var x = i[w++], C = w === 1;
        switch (C && (u = i[w], h = i[w + 1], s = u, l = h), x !== tt.L && _ > 0 && (t.lineTo(S, b), _ = 0), x) {
          case tt.M:
            s = u = i[w++], l = h = i[w++], t.moveTo(u, h);
            break;
          case tt.L: {
            f = i[w++], v = i[w++];
            var A = Be(f - u), D = Be(v - h);
            if (A > n || D > a) {
              if (c) {
                var T = d[g++];
                if (p + T > m) {
                  var P = (m - p) / T;
                  t.lineTo(u * (1 - P) + f * P, h * (1 - P) + v * P);
                  break t;
                }
                p += T;
              }
              t.lineTo(f, v), u = f, h = v, _ = 0;
            } else {
              var L = A * A + D * D;
              L > _ && (S = f, b = v, _ = L);
            }
            break;
          }
          case tt.C: {
            var I = i[w++], E = i[w++], R = i[w++], z = i[w++], k = i[w++], N = i[w++];
            if (c) {
              var T = d[g++];
              if (p + T > m) {
                var P = (m - p) / T;
                Mo(u, I, R, k, P, kr), Mo(h, E, z, N, P, Or), t.bezierCurveTo(kr[1], Or[1], kr[2], Or[2], kr[3], Or[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo(I, E, R, z, k, N), u = k, h = N;
            break;
          }
          case tt.Q: {
            var I = i[w++], E = i[w++], R = i[w++], z = i[w++];
            if (c) {
              var T = d[g++];
              if (p + T > m) {
                var P = (m - p) / T;
                Ao(u, I, R, P, kr), Ao(h, E, z, P, Or), t.quadraticCurveTo(kr[1], Or[1], kr[2], Or[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo(I, E, R, z), u = R, h = z;
            break;
          }
          case tt.A:
            var V = i[w++], Z = i[w++], Q = i[w++], at = i[w++], ft = i[w++], pt = i[w++], he = i[w++], xr = !i[w++], li = Q > at ? Q : at, Yt = Be(Q - at) > 1e-3, St = ft + pt, U = !1;
            if (c) {
              var T = d[g++];
              p + T > m && (St = ft + pt * (m - p) / T, U = !0), p += T;
            }
            if (Yt && t.ellipse ? t.ellipse(V, Z, Q, at, he, ft, St, xr) : t.arc(V, Z, li, ft, St, xr), U)
              break t;
            C && (s = Nr(ft) * Q + V, l = Br(ft) * at + Z), u = Nr(St) * Q + V, h = Br(St) * at + Z;
            break;
          case tt.R:
            s = u = i[w], l = h = i[w + 1], f = i[w++], v = i[w++];
            var j = i[w++], Tr = i[w++];
            if (c) {
              var T = d[g++];
              if (p + T > m) {
                var Lt = m - p;
                t.moveTo(f, v), t.lineTo(f + Gs(Lt, j), v), Lt -= j, Lt > 0 && t.lineTo(f + j, v + Gs(Lt, Tr)), Lt -= Tr, Lt > 0 && t.lineTo(f + Ws(j - Lt, 0), v + Tr), Lt -= j, Lt > 0 && t.lineTo(f, v + Ws(Tr - Lt, 0));
                break t;
              }
              p += T;
            }
            t.rect(f, v, j, Tr);
            break;
          case tt.Z:
            if (c) {
              var T = d[g++];
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
  }, r.CMD = tt, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function ci(r, t, e, i, n, a, o) {
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
function q_(r, t, e, i, n, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var f = l;
  if (h > t + f && h > i + f && h > a + f && h > s + f || h < t - f && h < i - f && h < a - f && h < s - f || u > r + f && u > e + f && u > n + f && u > o + f || u < r - f && u < e - f && u < n - f && u < o - f)
    return !1;
  var v = w_(r, t, e, i, n, a, o, s, u, h);
  return v <= f / 2;
}
function K_(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var h = T_(r, t, e, i, n, a, s, l);
  return h <= u / 2;
}
var Wf = Math.PI * 2;
function Ia(r) {
  return r %= Wf, r < 0 && (r += Wf), r;
}
var an = Math.PI * 2;
function Q_(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > e || h + u < e)
    return !1;
  if (Math.abs(i - n) % an < 1e-4)
    return !0;
  if (a) {
    var f = i;
    i = Ia(n), n = Ia(f);
  } else
    i = Ia(i), n = Ia(n);
  i > n && (n += an);
  var v = Math.atan2(l, s);
  return v < 0 && (v += an), v >= i && v <= n || v + an >= i && v + an <= n;
}
function Fr(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var er = ni.CMD, $r = Math.PI * 2, j_ = 1e-4;
function J_(r, t) {
  return Math.abs(r - t) < j_;
}
var It = [-1, -1, -1], re = [-1, -1];
function t1() {
  var r = re[0];
  re[0] = re[1], re[1] = r;
}
function e1(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var h = Co(t, i, a, s, u, It);
  if (h === 0)
    return 0;
  for (var f = 0, v = -1, c = void 0, d = void 0, y = 0; y < h; y++) {
    var p = It[y], g = p === 0 || p === 1 ? 0.5 : 1, m = wt(r, e, n, o, p);
    m < l || (v < 0 && (v = Cp(t, i, a, s, re), re[1] < re[0] && v > 1 && t1(), c = wt(t, i, a, s, re[0]), v > 1 && (d = wt(t, i, a, s, re[1]))), v === 2 ? p < re[0] ? f += c < t ? g : -g : p < re[1] ? f += d < c ? g : -g : f += s < d ? g : -g : p < re[0] ? f += c < t ? g : -g : f += s < c ? g : -g);
  }
  return f;
}
function r1(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = x_(t, i, a, s, It);
  if (l === 0)
    return 0;
  var u = Mp(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, f = Ft(t, i, a, u), v = 0; v < l; v++) {
      var c = It[v] === 0 || It[v] === 1 ? 0.5 : 1, d = Ft(r, e, n, It[v]);
      d < o || (It[v] < u ? h += f < t ? c : -c : h += a < f ? c : -c);
    }
    return h;
  } else {
    var c = It[0] === 0 || It[0] === 1 ? 0.5 : 1, d = Ft(r, e, n, It[0]);
    return d < o ? 0 : a < t ? c : -c;
  }
}
function i1(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  It[0] = -l, It[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= $r - 1e-4) {
    i = 0, n = $r;
    var h = a ? 1 : -1;
    return o >= It[0] + r && o <= It[1] + r ? h : 0;
  }
  if (i > n) {
    var f = i;
    i = n, n = f;
  }
  i < 0 && (i += $r, n += $r);
  for (var v = 0, c = 0; c < 2; c++) {
    var d = It[c];
    if (d + r > o) {
      var y = Math.atan2(s, d), h = a ? 1 : -1;
      y < 0 && (y = $r + y), (y >= i && y <= n || y + $r >= i && y + $r <= n) && (y > Math.PI / 2 && y < Math.PI * 1.5 && (h = -h), v += h);
    }
  }
  return v;
}
function Ep(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, h = 0, f = 0, v, c, d = 0; d < o; ) {
    var y = a[d++], p = d === 1;
    switch (y === er.M && d > 1 && (e || (s += Fr(l, u, h, f, i, n))), p && (l = a[d], u = a[d + 1], h = l, f = u), y) {
      case er.M:
        h = a[d++], f = a[d++], l = h, u = f;
        break;
      case er.L:
        if (e) {
          if (ci(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Fr(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case er.C:
        if (e) {
          if (q_(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += e1(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case er.Q:
        if (e) {
          if (K_(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += r1(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case er.A:
        var g = a[d++], m = a[d++], _ = a[d++], S = a[d++], b = a[d++], w = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        v = Math.cos(b) * _ + g, c = Math.sin(b) * S + m, p ? (h = v, f = c) : s += Fr(l, u, v, c, i, n);
        var C = (i - g) * S / _ + g;
        if (e) {
          if (Q_(g, m, S, b, b + w, x, t, C, n))
            return !0;
        } else
          s += i1(g, m, S, b, b + w, x, C, n);
        l = Math.cos(b + w) * _ + g, u = Math.sin(b + w) * S + m;
        break;
      case er.R:
        h = l = a[d++], f = u = a[d++];
        var A = a[d++], D = a[d++];
        if (v = h + A, c = f + D, e) {
          if (ci(h, f, v, f, t, i, n) || ci(v, f, v, c, t, i, n) || ci(v, c, h, c, t, i, n) || ci(h, c, h, f, t, i, n))
            return !0;
        } else
          s += Fr(v, f, v, c, i, n), s += Fr(h, c, h, f, i, n);
        break;
      case er.Z:
        if (e) {
          if (ci(l, u, h, f, t, i, n))
            return !0;
        } else
          s += Fr(l, u, h, f, i, n);
        l = h, u = f;
        break;
    }
  }
  return !e && !J_(u, f) && (s += Fr(l, u, h, f, i, n) || 0), s !== 0;
}
function n1(r, t, e) {
  return Ep(r, 0, !1, t, e);
}
function a1(r, t, e, i) {
  return Ep(r, t, !0, e, i);
}
var Rp = st({
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
}, Jr), o1 = {
  style: st({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, rs.style)
}, Xs = Xn.concat([
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
      for (var s = 0; s < Xs.length; ++s)
        n[Xs[s]] = this[Xs[s]];
      n.__dirty |= Zt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = ct(e);
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
      if ($(e)) {
        var i = Do(e, 0);
        return i > 0.5 ? eu : i > 0.2 ? N_ : ru;
      } else if (e)
        return ru;
    }
    return eu;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if ($(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Do(e, 0) < tu;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Ci;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new ni(!1);
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
      (a || this.__dirty & Ci) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), a1(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return n1(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Ci, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & Ci);
  }, t.prototype.createStyle = function(e) {
    return jo(Rp, e);
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
        for (var h = {}, f = ct(u), v = 0; v < f.length; v++) {
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
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Zt | bn | Ci;
  }(), t;
}(da), s1 = st({
  strokeFirst: !0,
  font: ii,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Rp), Lo = function(r) {
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
    return jo(s1, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = ih(i, e.font, e.textAlign, e.textBaseline);
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
}(da);
Lo.prototype.type = "tspan";
var l1 = st({
  x: 0,
  y: 0
}, Jr), u1 = {
  style: st({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, rs.style)
};
function h1(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var wr = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return jo(l1, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = h1(i.image) ? i.image : this.__image;
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
    return this._rect || (this._rect = new rt(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(da);
wr.prototype.type = "image";
function f1(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, h;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var f;
  s + l > n && (f = s + l, s *= n / f, l *= n / f), u + h > n && (f = u + h, u *= n / f, h *= n / f), l + u > a && (f = l + u, l *= a / f, u *= a / f), s + h > a && (f = s + h, s *= a / f, h *= a / f), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + h, i + a), h !== 0 && r.arc(e + h, i + a - h, h, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var Di = Math.round;
function kp(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (Di(i * 2) === Di(n * 2) && (r.x1 = r.x2 = Kr(i, s, !0)), Di(a * 2) === Di(o * 2) && (r.y1 = r.y2 = Kr(a, s, !0))), r;
  }
}
function Op(r, t, e) {
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
  var i = Di(r * 2);
  return (i + Di(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
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
      var l = Op(v1, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? f1(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(nt);
Pt.prototype.type = "rect";
var Uf = {
  fill: "#000"
}, Yf = 2, d1 = {
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
  }, rs.style)
}, me = function(r) {
  B(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = Uf, i.attr(e), i;
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
      for (var e = new rt(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || Uf;
  }, t.prototype.setTextContent = function(e) {
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return O(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = ct(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, O(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return d1;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || ii, n = e.padding, a = Jf(e), o = o_(a, e), s = Zs(e), l = !!e.backgroundColor, u = o.outerHeight, h = o.outerWidth, f = o.contentWidth, v = o.lines, c = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var y = e.x || 0, p = e.y || 0, g = e.align || d.align || "left", m = e.verticalAlign || d.verticalAlign || "top", _ = y, S = Ti(p, o.contentHeight, m);
    if (s || n) {
      var b = Sn(y, h, g), w = Ti(p, u, m);
      s && this._renderBackground(e, e, b, w, h, u);
    }
    S += c / 2, n && (_ = jf(y, g, n), m === "top" ? S += n[0] : m === "bottom" && (S -= n[2]));
    for (var x = 0, C = !1, A = Qf("fill" in e ? e.fill : (C = !0, d.fill)), D = Kf("stroke" in e ? e.stroke : !l && (!d.autoStroke || C) ? (x = Yf, d.stroke) : null), T = e.textShadowBlur > 0, P = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), L = o.calculatedLineHeight, I = 0; I < v.length; I++) {
      var E = this._getOrCreateChild(Lo), R = E.createStyle();
      E.useStyle(R), R.text = v[I], R.x = _, R.y = S, R.textAlign = g, R.textBaseline = "middle", R.opacity = e.opacity, R.strokeFirst = !0, T && (R.shadowBlur = e.textShadowBlur || 0, R.shadowColor = e.textShadowColor || "transparent", R.shadowOffsetX = e.textShadowOffsetX || 0, R.shadowOffsetY = e.textShadowOffsetY || 0), R.stroke = D, R.fill = A, D && (R.lineWidth = e.lineWidth || x, R.lineDash = e.lineDash, R.lineDashOffset = e.lineDashOffset || 0), R.font = i, Zf(R, e), S += c, P && E.setBoundingRect(new rt(Sn(R.x, f, R.textAlign), Ti(R.y, L, R.textBaseline), f, L));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = Jf(e), n = u_(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, h = e.y || 0, f = this._defaultStyle, v = e.align || f.align, c = e.verticalAlign || f.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = Sn(u, o, v), y = Ti(h, s, c), p = d, g = y;
    l && (p += l[3], g += l[0]);
    var m = p + a;
    Zs(e) && this._renderBackground(e, e, d, y, o, s);
    for (var _ = !!e.backgroundColor, S = 0; S < n.lines.length; S++) {
      for (var b = n.lines[S], w = b.tokens, x = w.length, C = b.lineHeight, A = b.width, D = 0, T = p, P = m, L = x - 1, I = void 0; D < x && (I = w[D], !I.align || I.align === "left"); )
        this._placeToken(I, e, C, g, T, "left", _), A -= I.width, T += I.width, D++;
      for (; L >= 0 && (I = w[L], I.align === "right"); )
        this._placeToken(I, e, C, g, P, "right", _), A -= I.width, P -= I.width, L--;
      for (T += (a - (T - p) - (m - P) - A) / 2; D <= L; )
        I = w[D], this._placeToken(I, e, C, g, T + I.width / 2, "center", _), T += I.width, D++;
      g += C;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var h = e.verticalAlign, f = a + n / 2;
    h === "top" ? f = a + e.height / 2 : h === "bottom" && (f = a + n - e.height / 2);
    var v = !e.isLineHolder && Zs(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, f - e.height / 2, e.width, e.height);
    var c = !!u.backgroundColor, d = e.textPadding;
    d && (o = jf(o, s, d), f -= e.height / 2 - d[0] - e.innerHeight / 2);
    var y = this._getOrCreateChild(Lo), p = y.createStyle();
    y.useStyle(p);
    var g = this._defaultStyle, m = !1, _ = 0, S = Qf("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, g.fill)), b = Kf("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !c && !l && (!g.autoStroke || m) ? (_ = Yf, g.stroke) : null), w = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    p.text = e.text, p.x = o, p.y = f, w && (p.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, p.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = e.font || ii, p.opacity = ao(u.opacity, i.opacity, 1), Zf(p, u), b && (p.lineWidth = ao(u.lineWidth, i.lineWidth, _), p.lineDash = K(u.lineDash, i.lineDash), p.lineDashOffset = i.lineDashOffset || 0, p.stroke = b), S && (p.fill = S);
    var x = e.contentWidth, C = e.contentHeight;
    y.setBoundingRect(new rt(Sn(p.x, x, p.textAlign), Ti(p.y, C, p.textBaseline), x, C));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, h = e.borderColor, f = l && l.image, v = l && !f, c = e.borderRadius, d = this, y, p;
    if (v || e.lineHeight || u && h) {
      y = this._getOrCreateChild(Pt), y.useStyle(y.createStyle()), y.style.fill = null;
      var g = y.shape;
      g.x = n, g.y = a, g.width = o, g.height = s, g.r = c, y.dirtyShape();
    }
    if (v) {
      var m = y.style;
      m.fill = l || null, m.fillOpacity = K(e.fillOpacity, 1);
    } else if (f) {
      p = this._getOrCreateChild(wr), p.onload = function() {
        d.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = y.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = K(e.strokeOpacity, 1), m.lineDash = e.borderDash, m.lineDashOffset = e.borderDashOffset || 0, y.strokeContainThreshold = 0, y.hasFill() && y.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var S = (y || p).style;
    S.shadowBlur = e.shadowBlur || 0, S.shadowColor = e.shadowColor || "transparent", S.shadowOffsetX = e.shadowOffsetX || 0, S.shadowOffsetY = e.shadowOffsetY || 0, S.opacity = ao(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return m1(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      y1(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Me(i) || e.textFont || e.font;
  }, t;
}(da), p1 = { left: !0, right: 1, center: 1 }, g1 = { top: 1, bottom: 1, middle: 1 }, Xf = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function y1(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? Zu + "px" : r + "px";
}
function Zf(r, t) {
  for (var e = 0; e < Xf.length; e++) {
    var i = Xf[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function m1(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function _1(r) {
  return qf(r), M(r.rich, qf), r;
}
function qf(r) {
  if (r) {
    r.font = me.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || p1[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || g1[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = cp(r.padding));
  }
}
function Kf(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Qf(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function jf(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function Jf(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function Zs(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var tc = 1e-4, Np = 20;
function S1(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function ec(r, t, e, i) {
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
function Et(r, t) {
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
  return $(r) ? S1(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function mt(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Np), r = (+r).toFixed(t), e ? r : +r;
}
function ze(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return w1(r);
}
function w1(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function b1(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function x1(r, t) {
  var e = Math.max(ze(r), ze(t)), i = r + t;
  return e > Np ? i : mt(i, e);
}
function Bp(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function Io(r) {
  return r > -tc && r < tc;
}
var T1 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Xe(r) {
  if (r instanceof Date)
    return r;
  if ($(r)) {
    var t = T1.exec(r);
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
function C1(r) {
  return Math.pow(10, lh(r));
}
function lh(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function Fp(r, t) {
  var e = lh(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function Eo(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !$(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function M1(r) {
  return !isNaN(Eo(r));
}
function $p() {
  return Math.round(Math.random() * 9);
}
function zp(r, t) {
  return t === 0 ? r : zp(t, r % t);
}
function rc(r, t) {
  return r == null ? t : t == null ? r : r * t / zp(r, t);
}
function $t(r) {
  throw new Error(r);
}
function ic(r, t, e) {
  return (t - r) * e + r;
}
var Hp = "series\0", A1 = "\0_ec_\0";
function Rt(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function nc(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var ac = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function pa(r) {
  return H(r) && !F(r) && !(r instanceof Date) ? r.value : r;
}
function D1(r) {
  return H(r) && !(r instanceof Array);
}
function P1(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = q();
  M(t, function(l, u) {
    if (!H(l)) {
      t[u] = null;
      return;
    }
  });
  var s = L1(r, o, e);
  return (i || n) && I1(s, r, o, t), i && E1(s, t), i || n ? R1(s, t, n) : a && k1(s, t), O1(s), s;
}
function L1(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Zn(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function I1(r, t, e, i) {
  M(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = In(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        Ye(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function E1(r, t) {
  M(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Zn(e) && !Zn(a) && Vp("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function R1(r, t, e) {
  M(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Zn(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !Vp("id", i, n.existing));
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
function k1(r, t) {
  M(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function O1(r) {
  var t = q();
  M(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), M(r, function(e) {
    var i = e.newOption;
    Ye(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), M(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (H(a)) {
      if (o.name = a.name != null ? In(a.name) : n ? n.name : Hp + i, n)
        o.id = In(n.id);
      else if (a.id != null)
        o.id = In(a.id);
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
function Vp(r, t, e) {
  var i = Pe(t[r], null), n = Pe(e[r], null);
  return i != null && n != null && i === n;
}
function In(r) {
  return Pe(r, "");
}
function Pe(r, t) {
  return r == null ? t : $(r) ? r : vt(r) || Wl(r) ? r + "" : t;
}
function Gp(r) {
  var t = r.name;
  return !!(t && t.indexOf(Hp));
}
function Zn(r) {
  return r && r.id != null && In(r.id).indexOf(A1) === 0;
}
function N1(r, t, e) {
  M(r, function(i) {
    var n = i.newOption;
    H(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = B1(t, n, i.existing, e));
  });
}
function B1(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function ai(r, t) {
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
function _t() {
  var r = "__ec_inner_" + F1++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var F1 = $p();
function qs(r, t, e) {
  var i = uh(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, h) {
    var f = ga(r, h, u, {
      useDefault: l === h,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[h + "Models"] = f.models, s[h + "Model"] = f.models[0];
  }), s;
}
function uh(r, t) {
  var e;
  if ($(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = q(), a = {}, o = !1;
  return M(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], h = u[1], f = (u[2] || "").toLowerCase();
    if (!(!h || !f || t && t.includeMainTypes && ht(t.includeMainTypes, h) < 0)) {
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
var ge = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function ga(r, t, e, i) {
  i = i || ge;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (Ye(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (Ye(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function Wp(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function $1(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function z1(r) {
  return r === "auto" ? W.domSupported ? "html" : "richText" : r || "html";
}
function H1(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (vt(i)) {
    var o = ic(e || 0, i, n);
    return mt(o, a ? Math.max(ze(e || 0), ze(i)) : t);
  } else {
    if ($(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, h = Math.max(l ? l.length : 0, u.length), f = 0; f < h; ++f) {
      var v = r.getDimensionInfo(f);
      if (v && v.type === "ordinal")
        s[f] = (n < 1 && l ? l : u)[f];
      else {
        var c = l && l[f] ? l[f] : 0, d = u[f], o = ic(c, d, n);
        s[f] = mt(o, a ? Math.max(ze(c), ze(d)) : t);
      }
    }
    return s;
  }
}
var ot = _t(), V1 = function(r, t, e, i) {
  if (i) {
    var n = ot(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = ot(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, oc = 1, sc = {}, Up = _t(), hh = _t(), fh = 0, is = 1, ns = 2, Le = ["emphasis", "blur", "select"], lc = ["normal", "emphasis", "blur", "select"], G1 = 10, W1 = 9, ti = "highlight", uo = "downplay", En = "select", ho = "unselect", Rn = "toggleSelect";
function vi(r) {
  return r != null && r !== "none";
}
function as(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function Yp(r) {
  as(r, "emphasis", ns);
}
function Xp(r) {
  r.hoverState === ns && as(r, "normal", fh);
}
function ch(r) {
  as(r, "blur", is);
}
function Zp(r) {
  r.hoverState === is && as(r, "normal", fh);
}
function U1(r) {
  r.selected = !0;
}
function Y1(r) {
  r.selected = !1;
}
function uc(r, t, e) {
  t(r, e);
}
function Qe(r, t, e) {
  uc(r, t, e), r.isGroup && r.traverse(function(i) {
    uc(i, t, e);
  });
}
function hc(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = ns;
      break;
    case "normal":
      r.hoverState = fh;
      break;
    case "blur":
      r.hoverState = is;
      break;
    case "select":
      r.selected = !0;
  }
}
function X1(r, t, e, i) {
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
function Z1(r, t, e, i) {
  var n = e && ht(e, "select") >= 0, a = !1;
  if (r instanceof nt) {
    var o = Up(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (vi(s) || vi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = O({}, i), u = O({}, u), u.fill = s) : !vi(u.fill) && vi(s) ? (a = !0, i = O({}, i), u = O({}, u), u.fill = Nf(s)) : !vi(u.stroke) && vi(l) && (a || (i = O({}, i), u = O({}, u)), u.stroke = Nf(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = O({}, i));
    var h = r.z2EmphasisLift;
    i.z2 = r.z2 + (h ?? G1);
  }
  return i;
}
function q1(r, t, e) {
  if (e && e.z2 == null) {
    e = O({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? W1);
  }
  return e;
}
function K1(r, t, e) {
  var i = ht(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : X1(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = O({}, e), o = O({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function Ks(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return Z1(this, r, t, e);
    if (r === "blur")
      return K1(this, r, e);
    if (r === "select")
      return q1(this, r, e);
  }
  return e;
}
function Q1(r) {
  r.stateProxy = Ks;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = Ks), e && (e.stateProxy = Ks);
}
function fc(r, t) {
  !jp(r, t) && !r.__highByOuter && Qe(r, Yp);
}
function cc(r, t) {
  !jp(r, t) && !r.__highByOuter && Qe(r, Xp);
}
function Ro(r, t) {
  r.__highByOuter |= 1 << (t || 0), Qe(r, Yp);
}
function ko(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && Qe(r, Xp);
}
function j1(r) {
  Qe(r, ch);
}
function qp(r) {
  Qe(r, Zp);
}
function Kp(r) {
  Qe(r, U1);
}
function Qp(r) {
  Qe(r, Y1);
}
function jp(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function Jp(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = hh(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      Zp(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), M(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function au(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, h) {
    for (var f = 0; f < h.length; f++) {
      var v = u.getItemGraphicEl(h[f]);
      v && qp(v);
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
          p.__highByOuter && h && t === "self" || ch(p);
        }), Gt(t))
          a(u.getData(), t);
        else if (H(t))
          for (var d = ct(t), y = 0; y < d.length; y++)
            a(u.getData(d[y]), t[d[y]]);
        l.push(u), hh(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, h) {
      if (u !== "series") {
        var f = i.getViewOfComponentModel(h);
        f && f.toggleBlurSeries && f.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function ou(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      hh(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        ch(a);
      });
    }
  }
}
function J1(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (n) {
    var a = ai(n, t);
    a = (F(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = ot(o);
      au(i, u.focus, u.blurScope, e);
    } else {
      var h = r.get(["emphasis", "focus"]), f = r.get(["emphasis", "blurScope"]);
      h != null && au(i, h, f, e);
    }
  }
}
function vh(r, t, e, i) {
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
function tS(r, t, e) {
  var i = ot(r), n = vh(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && ou(i.componentMainType, i.componentIndex, e), M(a, function(s) {
    return fc(s, t);
  })) : (au(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && ou(i.componentMainType, i.componentIndex, e), fc(r, t));
}
function eS(r, t, e) {
  Jp(e);
  var i = ot(r), n = vh(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? M(n, function(a) {
    return cc(a, t);
  }) : cc(r, t);
}
function rS(r, t, e) {
  if (uu(t)) {
    var i = t.dataType, n = r.getData(i), a = ai(n, t);
    F(a) || (a = [a]), r[t.type === Rn ? "toggleSelect" : t.type === En ? "select" : "unselect"](a, i);
  }
}
function vc(r) {
  var t = r.getAllData();
  M(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? Kp(a) : Qp(a);
    });
  });
}
function iS(r) {
  var t = [];
  return r.eachSeries(function(e) {
    var i = e.getAllData();
    M(i, function(n) {
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
function nS(r, t, e) {
  tg(r, !0), Qe(r, Q1), oS(r, t, e);
}
function aS(r) {
  tg(r, !1);
}
function Oo(r, t, e, i) {
  i ? aS(r) : nS(r, t, e);
}
function oS(r, t, e) {
  var i = ot(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var dc = ["emphasis", "blur", "select"], sS = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function su(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < dc.length; n++) {
    var a = dc[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[sS[e]]();
  }
}
function tg(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function lu(r) {
  return !!(r && r.__highDownDispatcher);
}
function lS(r) {
  var t = sc[r];
  return t == null && oc <= 32 && (t = sc[r] = oc++), t;
}
function uu(r) {
  var t = r.type;
  return t === En || t === ho || t === Rn;
}
function pc(r) {
  var t = r.type;
  return t === ti || t === uo;
}
function uS(r) {
  var t = Up(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var di = ni.CMD, hS = [[], [], []], gc = Math.sqrt, fS = Math.atan2;
function cS(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, h = di.M, f = di.C, v = di.L, c = di.R, d = di.A, y = di.Q;
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
        case y:
          a = 2;
          break;
        case d:
          var p = t[4], g = t[5], m = gc(t[0] * t[0] + t[1] * t[1]), _ = gc(t[2] * t[2] + t[3] * t[3]), S = fS(-t[1] / _, t[0] / m);
          e[o] *= m, e[o++] += p, e[o] *= _, e[o++] += g, e[o++] *= m, e[o++] *= _, e[o++] += S, e[o++] += S, o += 2, s = o;
          break;
        case c:
          u[0] = e[o++], u[1] = e[o++], se(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], se(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var b = hS[l];
        b[0] = e[o++], b[1] = e[o++], se(b, b, t), e[s++] = b[0], e[s++] = b[1];
      }
    }
    r.increaseVersion();
  }
}
var Qs = Math.sqrt, Ea = Math.sin, Ra = Math.cos, on = Math.PI;
function yc(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function hu(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (yc(r) * yc(t));
}
function mc(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(hu(r, t));
}
function _c(r, t, e, i, n, a, o, s, l, u, h) {
  var f = l * (on / 180), v = Ra(f) * (r - e) / 2 + Ea(f) * (t - i) / 2, c = -1 * Ea(f) * (r - e) / 2 + Ra(f) * (t - i) / 2, d = v * v / (o * o) + c * c / (s * s);
  d > 1 && (o *= Qs(d), s *= Qs(d));
  var y = (n === a ? -1 : 1) * Qs((o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) / (o * o * (c * c) + s * s * (v * v))) || 0, p = y * o * c / s, g = y * -s * v / o, m = (r + e) / 2 + Ra(f) * p - Ea(f) * g, _ = (t + i) / 2 + Ea(f) * p + Ra(f) * g, S = mc([1, 0], [(v - p) / o, (c - g) / s]), b = [(v - p) / o, (c - g) / s], w = [(-1 * v - p) / o, (-1 * c - g) / s], x = mc(b, w);
  if (hu(b, w) <= -1 && (x = on), hu(b, w) >= 1 && (x = 0), x < 0) {
    var C = Math.round(x / on * 1e6) / 1e6;
    x = on * 2 + C % 2 * on;
  }
  h.addData(u, m, _, o, s, S, x, f, a);
}
var vS = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, dS = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function pS(r) {
  var t = new ni();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = ni.CMD, l = r.match(vS);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], f = h.charAt(0), v = void 0, c = h.match(dS) || [], d = c.length, y = 0; y < d; y++)
      c[y] = parseFloat(c[y]);
    for (var p = 0; p < d; ) {
      var g = void 0, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0, x = void 0, C = e, A = i, D = void 0, T = void 0;
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
          g = e, m = i, D = t.len(), T = t.data, o === s.C && (g += e - T[D - 4], m += i - T[D - 3]), v = s.C, C = c[p++], A = c[p++], e = c[p++], i = c[p++], t.addData(v, g, m, C, A, e, i);
          break;
        case "s":
          g = e, m = i, D = t.len(), T = t.data, o === s.C && (g += e - T[D - 4], m += i - T[D - 3]), v = s.C, C = e + c[p++], A = i + c[p++], e += c[p++], i += c[p++], t.addData(v, g, m, C, A, e, i);
          break;
        case "Q":
          C = c[p++], A = c[p++], e = c[p++], i = c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "q":
          C = c[p++] + e, A = c[p++] + i, e += c[p++], i += c[p++], v = s.Q, t.addData(v, C, A, e, i);
          break;
        case "T":
          g = e, m = i, D = t.len(), T = t.data, o === s.Q && (g += e - T[D - 4], m += i - T[D - 3]), e = c[p++], i = c[p++], v = s.Q, t.addData(v, g, m, e, i);
          break;
        case "t":
          g = e, m = i, D = t.len(), T = t.data, o === s.Q && (g += e - T[D - 4], m += i - T[D - 3]), e += c[p++], i += c[p++], v = s.Q, t.addData(v, g, m, e, i);
          break;
        case "A":
          _ = c[p++], S = c[p++], b = c[p++], w = c[p++], x = c[p++], C = e, A = i, e = c[p++], i = c[p++], v = s.A, _c(C, A, e, i, w, x, _, S, b, v, t);
          break;
        case "a":
          _ = c[p++], S = c[p++], b = c[p++], w = c[p++], x = c[p++], C = e, A = i, e += c[p++], i += c[p++], v = s.A, _c(C, A, e, i, w, x, _, S, b, v, t);
          break;
      }
    }
    (f === "z" || f === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var eg = function(r) {
  B(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(nt);
function rg(r) {
  return r.setData != null;
}
function ig(r, t) {
  var e = pS(r), i = O({}, t);
  return i.buildPath = function(n) {
    if (rg(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    cS(e, n), this.dirtyShape();
  }, i;
}
function gS(r, t) {
  return new eg(ig(r, t));
}
function yS(r, t) {
  var e = ig(r, t), i = function(n) {
    B(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(eg);
  return i;
}
function mS(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new nt(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (rg(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var kt = function(r) {
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
    var n = ht(this._children, e);
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
    var i = this.__zr, n = this._children, a = ht(n, e);
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
    for (var i = new rt(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), h = l.getLocalTransform(a);
        h ? (rt.applyTransform(i, u, h), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
}(es);
kt.prototype.type = "group";
var _S = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), os = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new _S();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(nt);
os.prototype.type = "circle";
var SS = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), dh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new SS();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, h = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), e.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), e.closePath();
  }, t;
}(nt);
dh.prototype.type = "ellipse";
var ng = Math.PI, js = ng * 2, zr = Math.sin, pi = Math.cos, wS = Math.acos, bt = Math.atan2, Sc = Math.abs, kn = Math.sqrt, xn = Math.max, Te = Math.min, ve = 1e-4;
function bS(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = f * l - h * u;
  if (!(v * v < ve))
    return v = (h * (t - a) - f * (r - n)) / v, [r + v * l, t + v * u];
}
function ka(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / kn(s * s + l * l), h = u * l, f = -u * s, v = r + h, c = t + f, d = e + h, y = i + f, p = (v + d) / 2, g = (c + y) / 2, m = d - v, _ = y - c, S = m * m + _ * _, b = n - a, w = v * y - d * c, x = (_ < 0 ? -1 : 1) * kn(xn(0, b * b * S - w * w)), C = (w * _ - m * x) / S, A = (-w * m - _ * x) / S, D = (w * _ + m * x) / S, T = (-w * m + _ * x) / S, P = C - p, L = A - g, I = D - p, E = T - g;
  return P * P + L * L > I * I + E * E && (C = D, A = T), {
    cx: C,
    cy: A,
    x0: -h,
    y0: -f,
    x1: C * (n / b - 1),
    y1: A * (n / b - 1)
  };
}
function xS(r) {
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
function TS(r, t) {
  var e, i = xn(t.r, 0), n = xn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, f = t.cy, v = !!t.clockwise, c = Sc(u - l), d = c > js && c % js;
      if (d > ve && (c = d), !(i > ve))
        r.moveTo(h, f);
      else if (c > js - ve)
        r.moveTo(h + i * pi(l), f + i * zr(l)), r.arc(h, f, i, l, u, !v), n > ve && (r.moveTo(h + n * pi(u), f + n * zr(u)), r.arc(h, f, n, u, l, v));
      else {
        var y = void 0, p = void 0, g = void 0, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0, x = void 0, C = void 0, A = void 0, D = void 0, T = void 0, P = void 0, L = void 0, I = void 0, E = i * pi(l), R = i * zr(l), z = n * pi(u), k = n * zr(u), N = c > ve;
        if (N) {
          var V = t.cornerRadius;
          V && (e = xS(V), y = e[0], p = e[1], g = e[2], m = e[3]);
          var Z = Sc(i - n) / 2;
          if (_ = Te(Z, g), S = Te(Z, m), b = Te(Z, y), w = Te(Z, p), A = x = xn(_, S), D = C = xn(b, w), (x > ve || C > ve) && (T = i * pi(u), P = i * zr(u), L = n * pi(l), I = n * zr(l), c < ng)) {
            var Q = bS(E, R, L, I, T, P, z, k);
            if (Q) {
              var at = E - Q[0], ft = R - Q[1], pt = T - Q[0], he = P - Q[1], xr = 1 / zr(wS((at * pt + ft * he) / (kn(at * at + ft * ft) * kn(pt * pt + he * he))) / 2), li = kn(Q[0] * Q[0] + Q[1] * Q[1]);
              A = Te(x, (i - li) / (xr + 1)), D = Te(C, (n - li) / (xr - 1));
            }
          }
        }
        if (!N)
          r.moveTo(h + E, f + R);
        else if (A > ve) {
          var Yt = Te(g, A), St = Te(m, A), U = ka(L, I, E, R, i, Yt, v), j = ka(T, P, z, k, i, St, v);
          r.moveTo(h + U.cx + U.x0, f + U.cy + U.y0), A < x && Yt === St ? r.arc(h + U.cx, f + U.cy, A, bt(U.y0, U.x0), bt(j.y0, j.x0), !v) : (Yt > 0 && r.arc(h + U.cx, f + U.cy, Yt, bt(U.y0, U.x0), bt(U.y1, U.x1), !v), r.arc(h, f, i, bt(U.cy + U.y1, U.cx + U.x1), bt(j.cy + j.y1, j.cx + j.x1), !v), St > 0 && r.arc(h + j.cx, f + j.cy, St, bt(j.y1, j.x1), bt(j.y0, j.x0), !v));
        } else
          r.moveTo(h + E, f + R), r.arc(h, f, i, l, u, !v);
        if (!(n > ve) || !N)
          r.lineTo(h + z, f + k);
        else if (D > ve) {
          var Yt = Te(y, D), St = Te(p, D), U = ka(z, k, T, P, n, -St, v), j = ka(E, R, L, I, n, -Yt, v);
          r.lineTo(h + U.cx + U.x0, f + U.cy + U.y0), D < C && Yt === St ? r.arc(h + U.cx, f + U.cy, D, bt(U.y0, U.x0), bt(j.y0, j.x0), !v) : (St > 0 && r.arc(h + U.cx, f + U.cy, St, bt(U.y0, U.x0), bt(U.y1, U.x1), !v), r.arc(h, f, n, bt(U.cy + U.y1, U.cx + U.x1), bt(j.cy + j.y1, j.cx + j.x1), v), Yt > 0 && r.arc(h + j.cx, f + j.cy, Yt, bt(j.y1, j.x1), bt(j.y0, j.x0), !v));
        } else
          r.lineTo(h + z, f + k), r.arc(h, f, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var CS = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), Zi = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new CS();
  }, t.prototype.buildPath = function(e, i) {
    TS(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(nt);
Zi.prototype.type = "sector";
var MS = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), ph = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new MS();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(nt);
ph.prototype.type = "ring";
function AS(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, h, f;
  if (i) {
    h = [1 / 0, 1 / 0], f = [-1 / 0, -1 / 0];
    for (var v = 0, c = r.length; v < c; v++)
      Mi(h, h, r[v]), Ai(f, f, r[v]);
    Mi(h, h, i[0]), Ai(f, f, i[1]);
  }
  for (var v = 0, c = r.length; v < c; v++) {
    var d = r[v];
    if (e)
      l = r[v ? v - 1 : c - 1], u = r[(v + 1) % c];
    else if (v === 0 || v === c - 1) {
      n.push(v_(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    d_(a, u, l), Ps(a, a, t);
    var y = Zl(d, l), p = Zl(d, u), g = y + p;
    g !== 0 && (y /= g, p /= g), Ps(o, a, -y), Ps(s, a, p);
    var m = Mf([], d, o), _ = Mf([], d, s);
    i && (Ai(m, m, h), Mi(m, m, f), Ai(_, _, h), Mi(_, _, f)), n.push(m), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function ag(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = AS(n, i, e, t.smoothConstraint);
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
var DS = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), gh = function(r) {
  B(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new DS();
  }, t.prototype.buildPath = function(e, i) {
    ag(e, i, !0);
  }, t;
}(nt);
gh.prototype.type = "polygon";
var PS = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), yh = function(r) {
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
    return new PS();
  }, t.prototype.buildPath = function(e, i) {
    ag(e, i, !1);
  }, t;
}(nt);
yh.prototype.type = "polyline";
var LS = {}, IS = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
}(), Sr = function(r) {
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
    return new IS();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = kp(LS, i, this.style);
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
Sr.prototype.type = "line";
var Nt = [], ES = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function wc(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? Lf : wt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? Lf : wt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? If : Ft)(r.x1, r.cpx1, r.x2, t),
    (e ? If : Ft)(r.y1, r.cpy1, r.y2, t)
  ];
}
var mh = function(r) {
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
    return new ES();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, h = i.cpx2, f = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), h == null || f == null ? (v < 1 && (Ao(n, l, o, v, Nt), l = Nt[1], o = Nt[2], Ao(a, u, s, v, Nt), u = Nt[1], s = Nt[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (Mo(n, l, h, o, v, Nt), l = Nt[1], h = Nt[2], o = Nt[3], Mo(a, u, f, s, v, Nt), u = Nt[1], f = Nt[2], s = Nt[3]), e.bezierCurveTo(l, u, h, f, o, s)));
  }, t.prototype.pointAt = function(e) {
    return wc(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = wc(this.shape, e, !0);
    return y_(i, i);
  }, t;
}(nt);
mh.prototype.type = "bezier-curve";
var RS = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), ss = function(r) {
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
    return new RS();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, h = Math.cos(s), f = Math.sin(s);
    e.moveTo(h * o + n, f * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
}(nt);
ss.prototype.type = "arc";
var kS = function(r) {
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
}(nt), og = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), sg = function(r) {
  B(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(og), OS = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(og), Hr = [0, 0], Vr = [0, 0], Oa = new ut(), Na = new ut(), No = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new ut();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new ut();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    ut.sub(n[0], i[1], i[0]), ut.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return Oa.set(1 / 0, 1 / 0), Na.set(0, 0), !this._intersectCheckOneSide(this, t, Oa, Na, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, Oa, Na, n, -1) && (i = !1, n) || n || ut.copy(e, i ? Oa : Na), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, Hr), this._getProjMinMaxOnAxis(l, e._corners, Vr), Hr[1] < Vr[0] || Hr[0] > Vr[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(Vr[0] - Hr[1]), f = Math.abs(Hr[0] - Vr[1]);
        Math.min(h, f) > n.len() && (h < f ? ut.scale(n, u, -h * o) : ut.scale(n, u, f * o));
      } else if (i) {
        var h = Math.abs(Vr[0] - Hr[1]), f = Math.abs(Hr[0] - Vr[1]);
        Math.min(h, f) < i.len() && (h < f ? ut.scale(i, u, h * o) : ut.scale(i, u, -f * o));
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
}(), NS = [], BS = function(r) {
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
      for (var e = new rt(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(NS)), e.union(a);
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
}(da), FS = _t();
function $S(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, h = void 0, f = void 0;
    i ? (u = K(i.duration, 200), h = K(i.easing, "cubicOut"), f = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), h = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), f = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (h = a.easing), a.delay != null && (f = a.delay)), X(f) && (f = f(e, n)), X(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: f,
      easing: h
    };
    return v;
  } else
    return null;
}
function _h(r, t, e, i, n, a, o) {
  var s = !1, l;
  X(n) ? (o = a, a = n, n = null) : H(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var h = $S(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
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
function le(r, t, e, i, n, a) {
  _h("update", r, t, e, i, n, a);
}
function Ze(r, t, e, i, n, a) {
  _h("enter", r, t, e, i, n, a);
}
function On(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Bo(r, t, e, i, n, a) {
  On(r) || _h("leave", r, t, e, i, n, a);
}
function bc(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Bo(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function fu(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || bc(n, t, e, i);
  }) : bc(r, t, e, i);
}
function lg(r) {
  FS(r).oldStyle = r.style;
}
var Fo = Math.max, $o = Math.min, cu = {};
function zS(r) {
  return nt.extend(r);
}
var HS = yS;
function VS(r, t) {
  return HS(r, t);
}
function Se(r, t) {
  cu[r] = t;
}
function GS(r) {
  if (cu.hasOwnProperty(r))
    return cu[r];
}
function Sh(r, t, e, i) {
  var n = gS(r, t);
  return e && (i === "center" && (e = hg(e, n.getBoundingRect())), fg(n, e)), n;
}
function ug(r, t, e) {
  var i = new wr({
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
        i.setStyle(hg(t, a));
      }
    }
  });
  return i;
}
function hg(r, t) {
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
var WS = mS;
function fg(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function qn(r, t) {
  return kp(r, r, {
    lineWidth: t
  }), r;
}
function US(r) {
  return Op(r.shape, r.shape, r.style), r;
}
var YS = Kr;
function XS(r, t) {
  for (var e = th([]); r && r !== t; )
    Ii(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function wh(r, t, e) {
  return t && !Gt(t) && (t = ah.getLocalTransform(t)), e && (t = rh([], t)), se([], r, t);
}
function ZS(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = wh(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function xc(r) {
  return !r.isGroup;
}
function qS(r) {
  return r.shape != null;
}
function cg(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      xc(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return qS(o) && (s.shape = O({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (xc(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), le(o, l, e, ot(o).dataIndex);
      }
    }
  });
}
function KS(r, t) {
  return G(r, function(e) {
    var i = e[0];
    i = Fo(i, t.x), i = $o(i, t.x + t.width);
    var n = e[1];
    return n = Fo(n, t.y), n = $o(n, t.y + t.height), [i, n];
  });
}
function QS(r, t) {
  var e = Fo(r.x, t.x), i = $o(r.x + r.width, t.x + t.width), n = Fo(r.y, t.y), a = $o(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function vg(r, t, e) {
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
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), st(n, e), new wr(i)) : Sh(r.replace("path://", ""), i, e, "center");
}
function jS(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (dg(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function dg(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, h = o - n, f = s - a, v = Js(h, f, l, u);
  if (JS(v))
    return !1;
  var c = r - n, d = t - a, y = Js(c, d, l, u) / v;
  if (y < 0 || y > 1)
    return !1;
  var p = Js(c, d, h, f) / v;
  return !(p < 0 || p > 1);
}
function Js(r, t, e, i) {
  return r * i - e * t;
}
function JS(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function bh(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = $(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && M(ct(l), function(h) {
    $i(s, h) || (s[h] = l[h], s.$vars.push(h));
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
function Tc(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function ls(r, t) {
  if (r)
    if (F(r))
      for (var e = 0; e < r.length; e++)
        Tc(r[e], t);
    else
      Tc(r, t);
}
Se("circle", os);
Se("ellipse", dh);
Se("sector", Zi);
Se("ring", ph);
Se("polygon", gh);
Se("polyline", yh);
Se("rect", Pt);
Se("line", Sr);
Se("bezierCurve", mh);
Se("arc", ss);
const tw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: ss,
  BezierCurve: mh,
  BoundingRect: rt,
  Circle: os,
  CompoundPath: kS,
  Ellipse: dh,
  Group: kt,
  Image: wr,
  IncrementalDisplayable: BS,
  Line: Sr,
  LinearGradient: sg,
  OrientedBoundingRect: No,
  Path: nt,
  Point: ut,
  Polygon: gh,
  Polyline: yh,
  RadialGradient: OS,
  Rect: Pt,
  Ring: ph,
  Sector: Zi,
  Text: me,
  applyTransform: wh,
  clipPointsByRect: KS,
  clipRectByRect: QS,
  createIcon: vg,
  extendPath: VS,
  extendShape: zS,
  getShapeClass: GS,
  getTransform: XS,
  groupTransition: cg,
  initProps: Ze,
  isElementRemoved: On,
  lineLineIntersect: dg,
  linePolygonIntersect: jS,
  makeImage: ug,
  makePath: Sh,
  mergePath: WS,
  registerShape: Se,
  removeElement: Bo,
  removeElementWithFadeOut: fu,
  resizePath: fg,
  setTooltipConfig: bh,
  subPixelOptimize: YS,
  subPixelOptimizeLine: qn,
  subPixelOptimizeRect: US,
  transformDirection: ZS,
  traverseElements: ls,
  updateProps: le
}, Symbol.toStringTag, { value: "Module" }));
var us = {};
function ew(r, t) {
  for (var e = 0; e < Le.length; e++) {
    var i = Le[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function Cc(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = X(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < Le.length; u++) {
    var h = Le[u], f = t[h];
    l[h] = K(i ? i.getFormattedLabel(n, h, null, a, f && f.get("formatter")) : null, s);
  }
  return l;
}
function xh(r, t, e, i) {
  e = e || us;
  for (var n = r instanceof me, a = !1, o = 0; o < lc.length; o++) {
    var s = t[lc[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new me(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = Cc(e, t), h = t.normal, f = !!h.getShallow("show"), v = Kn(h, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(Mc(h, e, !1));
    for (var o = 0; o < Le.length; o++) {
      var c = Le[o], s = t[c];
      if (s) {
        var d = l.ensureState(c), y = !!K(s.getShallow("show"), f);
        if (y !== f && (d.ignore = !y), d.style = Kn(s, i && i[c], e, !0, !n), d.style.text = u[c], !n) {
          var p = r.ensureState(c);
          p.textConfig = Mc(s, e, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !f, l.useStyle(v), l.dirty(), e.enableTextSetter && (fs(l).setLabelText = function(g) {
      var m = Cc(e, t, g);
      ew(l, m);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function hs(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < Le.length; i++) {
    var n = Le[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function Kn(r, t, e, i, n) {
  var a = {};
  return rw(a, r, e, i, n), t && O(a, t), a;
}
function Mc(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = K(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function rw(r, t, e, i, n) {
  e = e || us;
  var a = t.ecModel, o = a && a.option.textStyle, s = iw(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        Lc(l[u] = {}, h, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var f = t.get("overflow");
  f && (r.overflow = f);
  var v = t.get("minMargin");
  v != null && (r.margin = v), Lc(r, t, o, e, i, n, !0, !1);
}
function iw(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || us).rich;
    if (e) {
      t = t || {};
      for (var i = ct(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var Ac = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], Dc = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Pc = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function Lc(r, t, e, i, n, a, o, s) {
  e = !n && e || us;
  var l = i && i.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), f = K(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || e.color, h = h || e.textBorderColor), u != null && (r.fill = u), h != null && (r.stroke = h);
  var v = K(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var c = K(t.getShallow("textBorderType"), e.textBorderType);
  c != null && (r.lineDash = c);
  var d = K(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  d != null && (r.lineDashOffset = d), !n && f == null && !s && (f = i && i.defaultOpacity), f != null && (r.opacity = f), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var y = 0; y < Ac.length; y++) {
    var p = Ac[y], g = K(t.getShallow(p), e[p]);
    g != null && (r[p] = g);
  }
  for (var y = 0; y < Dc.length; y++) {
    var p = Dc[y], g = t.getShallow(p);
    g != null && (r[p] = g);
  }
  if (r.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (r.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var y = 0; y < Pc.length; y++) {
      var p = Pc[y], g = t.getShallow(p);
      g != null && (r[p] = g);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (r.borderColor = l);
  }
}
function nw(r, t) {
  var e = t && t.getModel("textStyle");
  return Me([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var fs = _t();
function aw(r, t, e, i) {
  if (r) {
    var n = fs(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var ow = ["textStyle", "color"], tl = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], el = new me(), sw = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(ow) : null);
    }, r.prototype.getFont = function() {
      return nw({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < tl.length; i++)
        e[tl[i]] = this.getShallow(tl[i]);
      return el.useStyle(e), el.update(), el.getBoundingRect();
    }, r;
  }()
), pg = [
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
], lw = Yn(pg), uw = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return lw(this, t);
    }, r;
  }()
), gg = [
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
], hw = Yn(gg), fw = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return hw(this, t, e);
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
Ju(yt);
Z0(yt);
Re(yt, uw);
Re(yt, fw);
Re(yt, J0);
Re(yt, sw);
function sn(r) {
  return r == null ? 0 : r.length || 1;
}
function Ic(r) {
  return r;
}
var cw = (
  /** @class */
  function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || Ic, this._newKeyGetter = n || Ic, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = n[o], l = i[s], u = sn(l);
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
        var l = a[s], u = i[l], h = n[l], f = sn(u), v = sn(h);
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
        var n = t[i], a = e[n], o = sn(a);
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
          var l = e[s], u = sn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  }()
), yg = q(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), ue = "original", Ut = "arrayRows", Oe = "objectRows", je = "keyedColumns", yr = "typedArray", mg = "unknown", We = "column", qi = "row", Xt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, _g = _t();
function vw(r) {
  _g(r).datasetMap = q();
}
function dw(r, t, e) {
  var i = {}, n = Sg(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = _g(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, h, f;
  r = r.slice(), M(r, function(y, p) {
    var g = H(y) ? y : r[p] = {
      name: y
    };
    g.type === "ordinal" && h == null && (h = p, f = d(g)), i[g.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: f,
    valueWayDim: 0
  });
  M(r, function(y, p) {
    var g = y.name, m = d(y);
    if (h == null) {
      var _ = v.valueWayDim;
      c(i[g], _, m), c(o, _, m), v.valueWayDim += m;
    } else if (h === p)
      c(i[g], 0, m), c(a, 0, m);
    else {
      var _ = v.categoryWayDim;
      c(i[g], _, m), c(o, _, m), v.categoryWayDim += m;
    }
  });
  function c(y, p, g) {
    for (var m = 0; m < g; m++)
      y.push(p + m);
  }
  function d(y) {
    var p = y.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function Sg(r) {
  var t = r.get("data", !0);
  if (!t)
    return ga(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, ge).models[0];
}
function pw(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : ga(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, ge).models;
}
function wg(r, t) {
  return gw(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function gw(r, t, e, i, n, a) {
  var o, s = 5;
  if (Wt(r))
    return Xt.Not;
  var l, u;
  if (i) {
    var h = i[a];
    H(h) ? (l = h.name, u = h.type) : $(h) && (l = h);
  }
  if (u != null)
    return u === "ordinal" ? Xt.Must : Xt.Not;
  if (t === Ut) {
    var f = r;
    if (e === qi) {
      for (var v = f[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = S(v[n + c])) != null)
          return o;
    } else
      for (var c = 0; c < f.length && c < s; c++) {
        var d = f[n + c];
        if (d && (o = S(d[a])) != null)
          return o;
      }
  } else if (t === Oe) {
    var y = r;
    if (!l)
      return Xt.Not;
    for (var c = 0; c < y.length && c < s; c++) {
      var p = y[c];
      if (p && (o = S(p[l])) != null)
        return o;
    }
  } else if (t === je) {
    var g = r;
    if (!l)
      return Xt.Not;
    var v = g[l];
    if (!v || Wt(v))
      return Xt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = S(v[c])) != null)
        return o;
  } else if (t === ue)
    for (var m = r, c = 0; c < m.length && c < s; c++) {
      var p = m[c], _ = pa(p);
      if (!F(_))
        return Xt.Not;
      if ((o = S(_[a])) != null)
        return o;
    }
  function S(b) {
    var w = $(b);
    if (b != null && Number.isFinite(Number(b)) && b !== "")
      return w ? Xt.Might : Xt.Not;
    if (w && b !== "-")
      return Xt.Must;
  }
  return Xt.Not;
}
var cs = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === je ? {} : []), this.sourceFormat = t.sourceFormat || mg, this.seriesLayoutBy = t.seriesLayoutBy || We, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && wg(this, i) === Xt.Must && (n.type = "ordinal");
        }
    }
    return r;
  }()
);
function Th(r) {
  return r instanceof cs;
}
function vu(r, t, e) {
  e = e || xg(r);
  var i = t.seriesLayoutBy, n = mw(r, e, i, t.sourceHeader, t.dimensions), a = new cs({
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
function bg(r) {
  return new cs({
    data: r,
    sourceFormat: Wt(r) ? yr : ue
  });
}
function yw(r) {
  return new cs({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: J(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function xg(r) {
  var t = mg;
  if (Wt(r))
    t = yr;
  else if (F(r)) {
    r.length === 0 && (t = Ut);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if (F(n) || Wt(n)) {
          t = Ut;
          break;
        } else if (H(n)) {
          t = Oe;
          break;
        }
      }
    }
  } else if (H(r)) {
    for (var a in r)
      if ($i(r, a) && Gt(r[a])) {
        t = je;
        break;
      }
  }
  return t;
}
function mw(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: Ec(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Ut) {
    var s = r;
    i === "auto" || i == null ? Rc(function(u) {
      u != null && u !== "-" && ($(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = vt(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], Rc(function(u, h) {
      n[h] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === qi ? s.length : s[0] ? s[0].length : null;
  } else if (t === Oe)
    n || (n = _w(r));
  else if (t === je)
    n || (n = [], M(r, function(u, h) {
      n.push(h);
    }));
  else if (t === ue) {
    var l = pa(r[0]);
    a = F(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Ec(n),
    dimensionsDetectedCount: a
  };
}
function _w(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return ct(e);
}
function Ec(r) {
  if (r) {
    var t = q();
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
function Rc(r, t, e, i) {
  if (t === qi)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function Tg(r) {
  var t = r.sourceFormat;
  return t === Oe || t === je;
}
var Gr, Wr, Ur, kc, Oc, Cg = (
  /** @class */
  function() {
    function r(t, e) {
      var i = Th(t) ? t : bg(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === yr && (this._offset = 0, this._dimSize = e, this._data = n), Oc(this, n, i);
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
      Oc = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, f = l.startIndex, v = l.dimensionsDefine, c = kc[Ch(u, h)];
        if (O(o, c), u === yr)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var d = Mg(u, h);
          o.getItem = dt(d, null, s, f, v);
          var y = Ag(u, h);
          o.count = dt(y, null, s, f, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, h = u * o, f = 0; f < u; f++)
          s[f] = l[h + f];
        return s;
      }, i = function(o, s, l, u) {
        for (var h = this._data, f = this._dimSize, v = 0; v < f; v++) {
          for (var c = u[v], d = c[0] == null ? 1 / 0 : c[0], y = c[1] == null ? -1 / 0 : c[1], p = s - o, g = l[v], m = 0; m < p; m++) {
            var _ = h[m * f + v];
            g[o + m] = _, _ < d && (d = _), _ > y && (y = _);
          }
          c[0] = d, c[1] = y;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      kc = (t = {}, t[Ut + "_" + We] = {
        pure: !0,
        appendData: a
      }, t[Ut + "_" + qi] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[Oe] = {
        pure: !0,
        appendData: a
      }, t[je] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          M(o, function(l, u) {
            for (var h = s[u] || (s[u] = []), f = 0; f < (l || []).length; f++)
              h.push(l[f]);
          });
        }
      }, t[ue] = {
        appendData: a
      }, t[yr] = {
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
), Nc = function(r, t, e, i) {
  return r[i];
}, Sw = (Gr = {}, Gr[Ut + "_" + We] = function(r, t, e, i) {
  return r[i + t];
}, Gr[Ut + "_" + qi] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Gr[Oe] = Nc, Gr[je] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name, l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Gr[ue] = Nc, Gr);
function Mg(r, t) {
  var e = Sw[Ch(r, t)];
  return e;
}
var Bc = function(r, t, e) {
  return r.length;
}, ww = (Wr = {}, Wr[Ut + "_" + We] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, Wr[Ut + "_" + qi] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, Wr[Oe] = Bc, Wr[je] = function(r, t, e) {
  var i = e[0].name, n = r[i];
  return n ? n.length : 0;
}, Wr[ue] = Bc, Wr);
function Ag(r, t) {
  var e = ww[Ch(r, t)];
  return e;
}
var rl = function(r, t, e) {
  return r[t];
}, bw = (Ur = {}, Ur[Ut] = rl, Ur[Oe] = function(r, t, e) {
  return r[e];
}, Ur[je] = rl, Ur[ue] = function(r, t, e) {
  var i = pa(r);
  return i instanceof Array ? i[t] : i;
}, Ur[yr] = rl, Ur);
function Dg(r) {
  var t = bw[r];
  return t;
}
function Ch(r, t) {
  return r === Ut ? r + "_" + t : r;
}
function zi(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return Dg(a)(i, o, s);
      } else {
        var l = i;
        return a === ue && (l = pa(i)), l;
      }
    }
  }
}
var xw = (
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
function Tw(r, t) {
  var e = {}, i = e.encode = {}, n = q(), a = [], o = [], s = {};
  M(r.dimensions, function(v) {
    var c = r.getDimensionInfo(v), d = c.coordDim;
    if (d) {
      var y = c.coordDimIndex;
      il(i, d)[y] = v, c.isExtraCoord || (n.set(d, 1), Mw(c.type) && (a[0] = v), il(s, d)[y] = r.getDimensionIndex(c.name)), c.defaultTooltip && o.push(v);
    }
    yg.each(function(p, g) {
      var m = il(i, g), _ = c.otherDims[g];
      _ != null && _ !== !1 && (m[_] = c.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, c) {
    var d = i[c];
    u[c] = d[0], l = l.concat(d);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = G(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var h = i.label;
  h && h.length && (a = h.slice());
  var f = i.tooltip;
  return f && f.length ? o = f.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new xw(s, t), e;
}
function il(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function Cw(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function Mw(r) {
  return !(r === "ordinal" || r === "time");
}
var fo = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.otherDims = {}, t != null && O(this, t);
    }
    return r;
  }()
);
function co(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !vt(r) && r != null && r !== "-" && (r = +Xe(r)), r == null || r === "" ? NaN : Number(r));
}
q({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +Xe(r);
  },
  trim: function(r) {
    return $(r) ? Me(r) : r;
  }
});
var Aw = (
  /** @class */
  function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = vt(t) ? t : Eo(t), n = vt(e) ? e : Eo(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = $(t), l = $(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  }()
), vs = "undefined", Dw = typeof Uint32Array === vs ? Array : Uint32Array, Pw = typeof Uint16Array === vs ? Array : Uint16Array, Pg = typeof Int32Array === vs ? Array : Int32Array, Fc = typeof Float64Array === vs ? Array : Float64Array, Lg = {
  float: Fc,
  int: Pg,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Fc
}, nl;
function gi(r) {
  return r > 65535 ? Dw : Pw;
}
function yi() {
  return [1 / 0, -1 / 0];
}
function Lw(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function $c(r, t, e, i, n) {
  var a = Lg[e || "float"];
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
var du = (
  /** @class */
  function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = q();
    }
    return r.prototype.initData = function(t, e, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = nl[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], Tg(n), this._dimensions = G(e, function(o) {
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
      }, i.set(t, a), this._chunks[a] = new Lg[e || "float"](this._rawCount), this._rawExtent[a] = yi(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = yi());
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
        $c(i, u, h.type, l, !0);
      }
      for (var f = [], v = s; v < l; v++)
        for (var c = v - s, d = 0; d < a; d++) {
          var h = n[d], y = nl.arrayRows.call(this, t[c] || f, h.property, c, d);
          i[d][v] = y;
          var p = o[d];
          y < p[0] && (p[0] = y), y > p[1] && (p[1] = y);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = G(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var f = o[h];
        l[h] || (l[h] = yi()), $c(a, h, f.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], c = t; c < e; c++) {
          v = n.getItem(c, v);
          for (var d = 0; d < s; d++) {
            var y = a[d], p = this._dimValueGetter(v, u[d], c, d);
            y[c] = p;
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
        var i = gi(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = gi(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, h = t[0], f = i._chunks, v = 0; v < n; v++) {
        var c = void 0, d = i.getRawIndex(v);
        if (l === 0)
          c = e(v);
        else if (l === 1) {
          var y = f[h][d];
          c = e(y, v);
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
      var n = ct(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = gi(e._rawCount), l = new s(o), u = 0, h = n[0], f = t[h][0], v = t[h][1], c = e._chunks, d = !1;
      if (!e._indices) {
        var y = 0;
        if (a === 1) {
          for (var p = c[n[0]], g = 0; g < i; g++) {
            var m = p[g];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = y), y++;
          }
          d = !0;
        } else if (a === 2) {
          for (var p = c[n[0]], _ = c[n[1]], S = t[n[1]][0], b = t[n[1]][1], g = 0; g < i; g++) {
            var m = p[g], w = _[g];
            (m >= f && m <= v || isNaN(m)) && (w >= S && w <= b || isNaN(w)) && (l[u++] = y), y++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var g = 0; g < o; g++) {
            var x = e.getRawIndex(g), m = c[n[0]][x];
            (m >= f && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var g = 0; g < o; g++) {
            for (var C = !0, x = e.getRawIndex(g), A = 0; A < a; A++) {
              var D = n[A], m = c[D][x];
              (m < t[D][0] || m > t[D][1]) && (C = !1);
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
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, h = 0; h < e.length; h++)
        u[e[h]] = yi();
      for (var f = 0; f < s; f++) {
        for (var v = t.getRawIndex(f), c = 0; c < o; c++)
          l[c] = n[e[c]][v];
        l[o] = f;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var h = 0; h < d.length; h++) {
            var y = e[h], p = d[h], g = u[y], m = n[y];
            m && (m[v] = p), p < g[0] && (g[0] = p), p > g[1] && (g[1] = p);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), h, f, v, c = new (gi(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      c[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var y = Math.min(d + l, o - 1), p = Math.min(d + l * 2, o), g = (p + y) / 2, m = 0, _ = y; _ < p; _++) {
          var S = this.getRawIndex(_), b = a[S];
          isNaN(b) || (m += b);
        }
        m /= p - y;
        var w = d, x = Math.min(d + l, o), C = d - 1, A = a[u];
        h = -1, v = w;
        for (var D = -1, T = 0, _ = w; _ < x; _++) {
          var S = this.getRawIndex(_), b = a[S];
          if (isNaN(b)) {
            T++, D < 0 && (D = S);
            continue;
          }
          f = Math.abs((C - g) * (b - A) - (C - _) * (m - A)), f > h && (h = f, v = S);
        }
        T > 0 && T < x - w && (c[s++] = Math.min(D, v), v = Math.max(D, v)), c[s++] = v, u = v;
      }
      return c[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = c, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (gi(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var f = h, v = o[this.getRawIndex(f)], c = h, d = o[this.getRawIndex(c)], y = a;
        h + a > s && (y = s - h);
        for (var p = 0; p < y; p++) {
          var g = this.getRawIndex(h + p), m = o[g];
          m < v && (v = m, f = h + p), m > d && (d = m, c = h + p);
        }
        var _ = this.getRawIndex(f), S = this.getRawIndex(c);
        f < c ? (l[u++] = _, l[u++] = S) : (l[u++] = S, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], h = this.count(), f = a._rawExtent[t] = yi(), v = new (gi(this._rawCount))(Math.ceil(h / l)), c = 0, d = 0; d < h; d += l) {
        l > h - d && (l = h - d, s.length = l);
        for (var y = 0; y < l; y++) {
          var p = this.getRawIndex(d + y);
          s[y] = u[p];
        }
        var g = i(s), m = this.getRawIndex(Math.min(d + n(s, g) || 0, h - 1));
        u[m] = g, g < f[0] && (f[0] = g), g > f[1] && (f[1] = g), v[c++] = m;
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
      var e = this._chunks[t], i = yi();
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
      var i = new r(), n = this._chunks, a = t && Yi(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? Lw(n[o]) : n[o];
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
        return co(e[a], this._dimensions[a]);
      }
      nl = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return co(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return co(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    }(), r;
  }()
), Iw = _t(), Ew = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, Ig = (
  /** @class */
  function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = kg(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return K(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = Tg(this.source), i = !Og(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
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
        }), e && l != null && (!f || !f.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += Ew[u] || "f", h && (n += h.uid), n += "$";
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
function Eg(r) {
  return r instanceof Ig;
}
function Rg(r) {
  for (var t = q(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = H(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function kg(r) {
  var t = Iw(r);
  return t.dimNameMap || (t.dimNameMap = Rg(r.dimensionsDefine));
}
function Og(r) {
  return r > 30;
}
var ln = H, rr = G, Rw = typeof Int32Array > "u" ? Array : Int32Array, kw = "e\0\0", zc = -1, Ow = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], Nw = ["_approximateExtent"], Hc, Ba, un, hn, al, fn, ol, Bw = (
  /** @class */
  function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      Eg(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < i.length; h++) {
        var f = i[h], v = $(f) ? new fo({
          name: f
        }) : f instanceof fo ? f : new fo(f), c = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = c, v.coordDimIndex = 0);
        var d = v.otherDims = v.otherDims || {};
        o.push(c), a[c] = v, u[c] != null && (l = !0), v.createInvertedIndices && (s[c] = []), d.itemName === 0 && (this._nameDimIdx = h), d.itemId === 0 && (this._idDimIdx = h), n && (v.storeDimIndex = h);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var y = this._dimIdxToName = q();
        M(o, function(p) {
          y.set(a[p].storeDimIndex, p);
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
      if (vt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof du && (a = t), !a) {
        var o = this.dimensions, s = Th(t) || Gt(t) ? new Cg(t, o.length) : t;
        a = new du();
        var l = rr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = Tw(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && ol(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== yr && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === ue;
        if (l && !n.pure)
          for (var u = [], h = t; h < e; h++) {
            var f = n.getItem(h, u);
            if (!this.hasItemOption && D1(f) && (this.hasItemOption = !0), f) {
              var v = f.name;
              a[h] == null && v != null && (a[h] = Pe(v, null));
              var c = f.id;
              o[h] == null && c != null && (o[h] = Pe(c, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < e; h++)
            ol(this, h);
        Hc(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      ln(t) ? O(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = un(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return Ba(this, this.getRawIndex(t));
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
      return F(t) ? n.getValues(rr(t, function(a) {
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
      return n == null || isNaN(n) ? zc : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      X(t) && (i = e, e = t, t = []);
      var n = i || this, a = rr(hn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? dt(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      X(t) && (i = e, e = t, t = []);
      var n = i || this, a = rr(hn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? dt(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = ct(t);
      return M(n, function(a) {
        var o = e._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, r.prototype.mapArray = function(t, e, i) {
      X(t) && (i = e, e = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(e && e.apply(this, arguments));
      }, i), n;
    }, r.prototype.map = function(t, e, i, n) {
      var a = i || n || this, o = rr(hn(t), this._getStoreDimIndex, this), s = fn(this);
      return s._store = this._store.map(o, a ? dt(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = i || n || this, o = rr(hn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? dt(e, a) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = fn(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = fn(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = fn(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new yt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new cw(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Ba(t, i);
      }, function(i) {
        return Ba(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, ln(t) ? O(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), F(a) ? a = a.slice() : ln(a) && (a = O({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, ln(e) ? O(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      ln(t) ? O(this._layout, t) : this._layout[t] = e;
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
      V1(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      M(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : rr(this.dimensions, this._getDimInfo, this), this.hostModel)), al(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      X(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(ju(arguments)));
      });
    }, r.internalField = function() {
      Hc = function(t) {
        var e = t._invertedIndicesMap;
        M(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new Rw(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = zc;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, un = function(t, e, i) {
        return Pe(t._getCategory(e, i), null);
      }, Ba = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = un(t, t._idDimIdx, e)), i == null && (i = kw + e), i;
      }, hn = function(t) {
        return F(t) || (t = t != null ? [t] : []), t;
      }, fn = function(t) {
        var e = new r(t._schema ? t._schema : rr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return al(e, t), e;
      }, al = function(t, e) {
        M(Ow.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, M(Nw, function(i) {
          t[i] = J(e[i]);
        }), t._calculationInfo = O({}, e._calculationInfo);
      }, ol = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = un(t, a, e)), l == null && o != null && (n[e] = l = un(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), n[e] = l;
        }
      };
    }(), r;
  }()
);
function Fw(r, t) {
  Th(r) || (r = bg(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = q(), a = [], o = zw(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && Og(o), l = i === r.dimensionsDefine, u = l ? kg(r) : Rg(i), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(r, o));
  for (var f = q(h), v = new Pg(o), c = 0; c < v.length; c++)
    v[c] = -1;
  function d(A) {
    var D = v[A];
    if (D < 0) {
      var T = i[A], P = H(T) ? T : {
        name: T
      }, L = new fo(), I = P.name;
      I != null && u.get(I) != null && (L.name = L.displayName = I), P.type != null && (L.type = P.type), P.displayName != null && (L.displayName = P.displayName);
      var E = a.length;
      return v[A] = E, L.storeDimIndex = A, a.push(L), L;
    }
    return a[D];
  }
  if (!s)
    for (var c = 0; c < o; c++)
      d(c);
  f.each(function(A, D) {
    var T = Rt(A).slice();
    if (T.length === 1 && !$(T[0]) && T[0] < 0) {
      f.set(D, !1);
      return;
    }
    var P = f.set(D, []);
    M(T, function(L, I) {
      var E = $(L) ? u.get(L) : L;
      E != null && E < o && (P[I] = E, p(d(E), D, I));
    });
  });
  var y = 0;
  M(e, function(A) {
    var D, T, P, L;
    if ($(A))
      D = A, L = {};
    else {
      L = A, D = L.name;
      var I = L.ordinalMeta;
      L.ordinalMeta = null, L = O({}, L), L.ordinalMeta = I, T = L.dimsDef, P = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null;
    }
    var E = f.get(D);
    if (E !== !1) {
      if (E = Rt(E), !E.length)
        for (var R = 0; R < (T && T.length || 1); R++) {
          for (; y < o && d(y).coordDim != null; )
            y++;
          y < o && E.push(y++);
        }
      M(E, function(z, k) {
        var N = d(z);
        if (l && L.type != null && (N.type = L.type), p(st(N, L), D, k), N.name == null && T) {
          var V = T[k];
          !H(V) && (V = {
            name: V
          }), N.name = N.displayName = V.name, N.defaultTooltip = V.defaultTooltip;
        }
        P && st(N.otherDims, P);
      });
    }
  });
  function p(A, D, T) {
    yg.get(D) != null ? A.otherDims[D] = T : (A.coordDim = D, A.coordDimIndex = T, n.set(D, !0));
  }
  var g = t.generateCoord, m = t.generateCoordCount, _ = m != null;
  m = g ? m || 1 : 0;
  var S = g || "value";
  function b(A) {
    A.name == null && (A.name = A.coordDim);
  }
  if (s)
    M(a, function(A) {
      b(A);
    }), a.sort(function(A, D) {
      return A.storeDimIndex - D.storeDimIndex;
    });
  else
    for (var w = 0; w < o; w++) {
      var x = d(w), C = x.coordDim;
      C == null && (x.coordDim = Hw(S, n, _), x.coordDimIndex = 0, (!g || m <= 0) && (x.isExtraCoord = !0), m--), b(x), x.type == null && (wg(r, w) === Xt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return $w(a), new Ig({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function $w(r) {
  for (var t = q(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function zw(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return M(t, function(a) {
    var o;
    H(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function Hw(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var sl = {}, Mh = (
  /** @class */
  function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      M(sl, function(n, a) {
        var o = n.create(t, e);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, r.prototype.update = function(t, e) {
      M(this._coordinateSystems, function(i) {
        i.update && i.update(t, e);
      });
    }, r.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, r.register = function(t, e) {
      sl[t] = e;
    }, r.get = function(t) {
      return sl[t];
    }, r;
  }()
), Vw = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = q(), this.categoryAxisMap = q(), this.coordSysName = t;
    }
    return r;
  }()
);
function Gw(r) {
  var t = r.get("coordinateSystem"), e = new Vw(t), i = Ww[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var Ww = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", ge).models[0], a = r.getReferringComponents("yAxis", ge).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), mi(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), mi(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", ge).models[0];
    t.coordSysDims = ["single"], e.set("single", n), mi(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", ge).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), mi(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), mi(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    M(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), h = o[l];
      e.set(h, u), mi(u) && (i.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function mi(r) {
  return r.get("type") === "category";
}
function Uw(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  Yw(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, h, f, v;
  if (M(a, function(m, _) {
    $(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (h = m));
  }), h && !i && !u && (i = !0), h) {
    f = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var c = h.coordDim, d = h.type, y = 0;
    M(a, function(m) {
      m.coordDim === c && y++;
    });
    var p = {
      name: f,
      coordDim: c,
      coordDimIndex: y,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, g = {
      name: v,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: v,
      coordDimIndex: y + 1,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(v, d), g.storeDimIndex = s.ensureCalculationDimension(f, d)), o.appendCalculationDimension(p), o.appendCalculationDimension(g)) : (a.push(p), a.push(g));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: f
  };
}
function Yw(r) {
  return !Eg(r.schema);
}
function Hi(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function Xw(r, t) {
  return Hi(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function Zw(r, t) {
  var e = r.get("coordinateSystem"), i = Mh.get(e), n;
  return t && t.coordSysDims && (n = G(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = Cw(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function qw(r, t, e) {
  var i, n;
  return e && M(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function Ah(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === ue;
  var o = Gw(t), s = Zw(t, o), l = e.useEncodeDefaulter, u = X(l) ? l : l ? qt(dw, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, f = Fw(n, h), v = qw(f.dimensions, e.createInvertedIndices, o), c = a ? null : i.getSharedDataStore(f), d = Uw(t, {
    schema: f,
    store: c
  }), y = new Bw(f, t);
  y.setCalculationInfo(d);
  var p = v != null && Kw(n) ? function(g, m, _, S) {
    return S === v ? _ : this.defaultDimValueGetter(g, m, _, S);
  } : null;
  return y.hasItemOption = !1, y.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : c,
    null,
    p
  ), y;
}
function Kw(r) {
  if (r.sourceFormat === ue) {
    var t = Qw(r.data || []);
    return !F(pa(t));
  }
}
function Qw(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var jw = Math.round(Math.random() * 10);
function ds(r) {
  return [r || "", jw++].join("_");
}
function Jw(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Ae(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Ae(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function tb(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), h = u.graph, f = u.noEntryList, v = {};
    for (M(a, function(m) {
      v[m] = !0;
    }); f.length; ) {
      var c = f.pop(), d = h[c], y = !!v[c];
      y && (s.call(l, c, d.originalDeps.slice()), delete v[c]), M(d.successor, y ? g : p);
    }
    M(v, function() {
      var m = "";
      throw new Error(m);
    });
    function p(m) {
      h[m].entryCount--, h[m].entryCount === 0 && f.push(m);
    }
    function g(m) {
      v[m] = !0, p(m);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return M(a, function(l) {
      var u = i(o, l), h = u.originalDeps = t(l), f = n(h, a);
      u.entryCount = f.length, u.entryCount === 0 && s.push(l), M(f, function(v) {
        ht(u.predecessor, v) < 0 && u.predecessor.push(v);
        var c = i(o, v);
        ht(c.successor, v) < 0 && c.successor.push(l);
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
    return M(a, function(l) {
      ht(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function eb(r, t) {
  return it(it({}, r, !0), t, !0);
}
var rb = Math.log(2);
function pu(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / rb);
    return r[e][l];
  }
  for (var u = i | 1 << e, h = e + 1; i & 1 << h; )
    h++;
  for (var f = 0, v = 0, c = 0; v < s; v++) {
    var d = 1 << v;
    d & n || (f += (c % 2 ? -1 : 1) * r[e][v] * pu(r, t - 1, h, u, n | d, a), c++);
  }
  return a[o] = f, f;
}
function Vc(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = pu(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * pu(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, h) {
      var f = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / f, l[1] = (u * a[3] + h * a[4] + a[5]) / f;
    };
  }
}
var Gc = "___zrEVENTSAVED", ll = [];
function ib(r, t, e, i, n) {
  return gu(ll, t, i, n, !0) && gu(r, e, ll[0], ll[1]);
}
function gu(r, t, e, i, n) {
  if (t.getBoundingClientRect && W.domSupported && !Ng(t)) {
    var a = t[Gc] || (t[Gc] = {}), o = nb(t, a), s = ab(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function nb(r, t) {
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
function ab(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = r[u].getBoundingClientRect(), f = 2 * u, v = h.left, c = h.top;
    o.push(v, c), l = l && a && v === a[f] && c === a[f + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Vc(s, o) : Vc(o, s));
}
function Ng(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var ob = /([&<>"'])/g, sb = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function zt(r) {
  return r == null ? "" : (r + "").replace(ob, function(t, e) {
    return sb[e];
  });
}
const lb = {
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
}, ub = {
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
var zo = "ZH", Dh = "EN", ki = Dh, vo = {}, Ph = {}, Bg = W.domSupported ? function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || ki).toUpperCase()
  );
  return r.indexOf(zo) > -1 ? zo : ki;
}() : ki;
function Fg(r, t) {
  r = r.toUpperCase(), Ph[r] = new yt(t), vo[r] = t;
}
function hb(r) {
  if ($(r)) {
    var t = vo[r.toUpperCase()] || {};
    return r === zo || r === Dh ? J(t) : it(J(t), J(vo[ki]), !1);
  } else
    return it(J(r), J(vo[ki]), !1);
}
function fb(r) {
  return Ph[r];
}
function cb() {
  return Ph[ki];
}
Fg(Dh, lb);
Fg(zo, ub);
var Lh = 1e3, Ih = Lh * 60, Nn = Ih * 60, oe = Nn * 24, Wc = oe * 365, Tn = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Fa = "{yyyy}-{MM}-{dd}", Uc = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Fa,
  hour: Fa + " " + Tn.hour,
  minute: Fa + " " + Tn.minute,
  second: Fa + " " + Tn.second,
  millisecond: Tn.none
}, ul = ["year", "month", "day", "hour", "minute", "second", "millisecond"], $g = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function ir(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function Oi(r) {
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
function vb(r) {
  return r === Oi(r);
}
function db(r) {
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
function ps(r, t, e, i) {
  var n = Xe(r), a = n[Eh(e)](), o = n[Ni(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[gs(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), h = n[Qn(e)](), f = (h - 1) % 12 + 1, v = n[ys(e)](), c = n[ms(e)](), d = n[_s(e)](), y = h >= 12 ? "pm" : "am", p = y.toUpperCase(), g = i instanceof yt ? i : fb(i || Bg) || cb(), m = g.getModel("time"), _ = m.get("month"), S = m.get("monthAbbr"), b = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, y + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, ir(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, S[o - 1]).replace(/{MM}/g, ir(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, ir(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, b[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, ir(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, ir(f + "", 2)).replace(/{h}/g, f + "").replace(/{mm}/g, ir(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, ir(c, 2)).replace(/{s}/g, c + "").replace(/{SSS}/g, ir(d, 3)).replace(/{S}/g, d + "");
}
function pb(r, t, e, i, n) {
  var a = null;
  if ($(e))
    a = e;
  else if (X(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = O({}, Tn);
    if (r.level > 0)
      for (var s = 0; s < ul.length; ++s)
        o[ul[s]] = "{primary|" + o[ul[s]] + "}";
    var l = e ? e.inherit === !1 ? e : st(e, o) : o, u = zg(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = $g.indexOf(u), s = h - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (F(a)) {
      var f = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      f = Math.min(f, a.length - 1), a = a[f];
    }
  }
  return ps(new Date(r.value), a, n, i);
}
function zg(r, t) {
  var e = Xe(r), i = e[Ni(t)]() + 1, n = e[gs(t)](), a = e[Qn(t)](), o = e[ys(t)](), s = e[ms(t)](), l = e[_s(t)](), u = l === 0, h = u && s === 0, f = h && o === 0, v = f && a === 0, c = v && n === 1, d = c && i === 1;
  return d ? "year" : c ? "month" : v ? "day" : f ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function Yc(r, t, e) {
  var i = vt(r) ? Xe(r) : r;
  switch (t = t || zg(r, e), t) {
    case "year":
      return i[Eh(e)]();
    case "half-year":
      return i[Ni(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Ni(e)]() + 1) / 4);
    case "month":
      return i[Ni(e)]();
    case "day":
      return i[gs(e)]();
    case "half-day":
      return i[Qn(e)]() / 24;
    case "hour":
      return i[Qn(e)]();
    case "minute":
      return i[ys(e)]();
    case "second":
      return i[ms(e)]();
    case "millisecond":
      return i[_s(e)]();
  }
}
function Eh(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Ni(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function gs(r) {
  return r ? "getUTCDate" : "getDate";
}
function Qn(r) {
  return r ? "getUTCHours" : "getHours";
}
function ys(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function ms(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function _s(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function gb(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function Hg(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function Vg(r) {
  return r ? "setUTCDate" : "setDate";
}
function Gg(r) {
  return r ? "setUTCHours" : "setHours";
}
function Wg(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function Ug(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function Yg(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function Xg(r) {
  if (!M1(r))
    return $(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function Zg(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var Rh = cp;
function yu(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(h) {
    return h && Me(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? Xe(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return ps(l, i, e);
  }
  if (t === "ordinal")
    return Wl(r) ? n(r) : vt(r) && a(r) ? r + "" : "-";
  var u = Eo(r);
  return a(u) ? Xg(u) : Wl(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var Xc = ["a", "b", "c", "d", "e", "f", "g"], hl = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function qg(r, t, e) {
  F(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = Xc[a];
    r = r.replace(hl(o), hl(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(hl(Xc[l], s), e ? zt(u) : u);
    }
  return r;
}
function yb(r, t) {
  var e = $(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + zt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + zt(i) + ";" + (t || "") + '"></span>';
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
function oi(r, t) {
  return t = t || "transparent", $(r) ? r : H(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var po = M, mb = ["left", "right", "top", "bottom", "width", "height"], $a = [["width", "left", "right"], ["height", "top", "bottom"]];
function Kg(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), f = t.childAt(u + 1), v = f && f.getBoundingRect(), c, d;
    if (r === "horizontal") {
      var y = h.width + (v ? -v.x + h.x : 0);
      c = a + y, c > i || l.newline ? (a = 0, c = y, o += s + e, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (v ? -v.y + h.y : 0);
      d = o + p, d > n || l.newline ? (a += s + e, o = 0, d = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = c + e : o = d + e);
  });
}
qt(Kg, "vertical");
qt(Kg, "horizontal");
function Qg(r, t, e) {
  e = Rh(e || 0);
  var i = t.width, n = t.height, a = Et(r.left, i), o = Et(r.top, n), s = Et(r.right, i), l = Et(r.bottom, n), u = Et(r.width, i), h = Et(r.height, n), f = e[2] + e[0], v = e[1] + e[3], c = r.aspect;
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
  var d = new rt(a + e[3], o + e[0], u, h);
  return d.margin = e, d;
}
function jn(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return H(t) ? t : t ? {
    type: t
  } : null;
}
function Jn(r, t, e) {
  var i = e && e.ignoreSize;
  !F(i) && (i = [i, i]);
  var n = o($a[0], 0), a = o($a[1], 1);
  u($a[0], r, n), u($a[1], r, a);
  function o(h, f) {
    var v = {}, c = 0, d = {}, y = 0, p = 2;
    if (po(h, function(_) {
      d[_] = r[_];
    }), po(h, function(_) {
      s(t, _) && (v[_] = d[_] = t[_]), l(v, _) && c++, l(d, _) && y++;
    }), i[f])
      return l(t, h[1]) ? d[h[2]] = null : l(t, h[2]) && (d[h[1]] = null), d;
    if (y === p || !c)
      return d;
    if (c >= p)
      return v;
    for (var g = 0; g < h.length; g++) {
      var m = h[g];
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
    po(h, function(c) {
      f[c] = v[c];
    });
  }
}
function kh(r) {
  return _b({}, r);
}
function _b(r, t) {
  return t && r && po(mb, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var Sb = _t(), lt = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = ds("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = jn(this), a = n ? kh(e) : {}, o = i.getTheme();
      it(e, o.get(this.mainType)), it(e, this.getDefaultOption()), n && Jn(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      it(this.option, e, !0);
      var n = jn(this);
      n && Jn(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!U0(e))
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
      return ga(this.ecModel, e, {
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
yp(lt, yt);
Jo(lt);
Jw(lt);
tb(lt, wb);
function wb(r) {
  var t = [];
  return M(lt.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = G(t, function(e) {
    return Ae(e).main;
  }), r !== "dataset" && ht(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var Zc = _t();
_t();
var Oh = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Rt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return xb(this, Zc, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      Tb(this, Zc);
    }, r;
  }()
);
function bb(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function xb(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var h = o == null || !i ? e : bb(i, o);
  if (h = h || e, !(!h || !h.length)) {
    var f = h[l];
    return n && (u[n] = f), s.paletteIdx = (l + 1) % h.length, f;
  }
}
function Tb(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var Cb = /\{@(.+?)\}/g, Mb = (
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
      if (o && (l.value = o.interpolatedValue), n != null && F(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (X(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if ($(a)) {
        var h = qg(a, l);
        return h.replace(Cb, function(f, v) {
          var c = v.length, d = v;
          d.charAt(0) === "[" && d.charAt(c - 1) === "]" && (d = +d.slice(1, c - 1));
          var y = zi(s, t, d);
          if (o && F(o.interpolatedValue)) {
            var p = s.getDimensionIndex(d);
            p >= 0 && (y = o.interpolatedValue[p]);
          }
          return y != null ? y + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return zi(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  }()
);
function qc(r) {
  var t, e;
  return H(r) ? r.type && (e = r) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function Bn(r) {
  return new Ab(r);
}
var Ab = (
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
          var y = this._progress;
          if (F(y))
            for (var p = 0; p < y.length; p++)
              this._doProgress(y[p], c, d, l, u);
          else
            this._doProgress(y, c, d, l, u);
        }
        this._dueIndex = d;
        var g = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        this._outputDueEnd = g;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      Kc.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: Kc.next
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
), Kc = /* @__PURE__ */ function() {
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
}(), Db = (
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
      return co(t, e);
    }, r;
  }()
);
function Pb(r, t) {
  var e = new Db(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== We && $t(o);
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    M(u, function(y, p) {
      var g = y.name, m = {
        index: p,
        name: g,
        displayName: y.displayName
      };
      if (s.push(m), g != null) {
        var _ = "";
        $i(l, g) && $t(_), l[g] = m;
      }
    });
  else
    for (var h = 0; h < r.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var f = Mg(n, We);
  t.__isBuiltIn && (e.getRawDataItem = function(y) {
    return f(i, a, s, y);
  }, e.getRawData = dt(Lb, null, r)), e.cloneRawData = dt(Ib, null, r);
  var v = Ag(n, We);
  e.count = dt(v, null, i, a, s);
  var c = Dg(n);
  e.retrieveValue = function(y, p) {
    var g = f(i, a, s, y);
    return d(g, p);
  };
  var d = e.retrieveValueFromItem = function(y, p) {
    if (y != null) {
      var g = s[p];
      if (g)
        return c(y, p, g.name);
    }
  };
  return e.getDimensionInfo = dt(Eb, null, s, l), e.cloneAllDimensionInfo = dt(Rb, null, s), e;
}
function Lb(r) {
  var t = r.sourceFormat;
  if (!Nh(t)) {
    var e = "";
    $t(e);
  }
  return r.data;
}
function Ib(r) {
  var t = r.sourceFormat, e = r.data;
  if (!Nh(t)) {
    var i = "";
    $t(i);
  }
  if (t === Ut) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === Oe) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(O({}, e[a]));
    return n;
  }
}
function Eb(r, t, e) {
  if (e != null) {
    if (vt(e) || !isNaN(e) && !$i(t, e))
      return r[e];
    if ($i(t, e))
      return t[e];
  }
}
function Rb(r) {
  return J(r);
}
var jg = q();
function kb(r) {
  r = J(r);
  var t = r.type, e = "";
  t || $t(e);
  var i = t.split(":");
  i.length !== 2 && $t(e);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, jg.set(t, r);
}
function Ob(r, t, e) {
  var i = Rt(r), n = i.length, a = "";
  n || $t(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = Nb(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Nb(r, t, e, i) {
  var n = "";
  t.length || $t(n), H(r) || $t(n);
  var a = r.type, o = jg.get(a);
  o || $t(n);
  var s = G(t, function(u) {
    return Pb(u, o);
  }), l = Rt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: J(r.config)
  }));
  return G(l, function(u, h) {
    var f = "";
    H(u) || $t(f), u.data || $t(f);
    var v = xg(u.data);
    Nh(v) || $t(f);
    var c, d = t[0];
    if (d && h === 0 && !u.dimensions) {
      var y = d.startIndex;
      y && (u.data = d.data.slice(0, y).concat(u.data)), c = {
        seriesLayoutBy: We,
        sourceHeader: y,
        dimensions: d.metaRawOption.dimensions
      };
    } else
      c = {
        seriesLayoutBy: We,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return vu(u.data, c, null);
  });
}
function Nh(r) {
  return r === Ut || r === Oe;
}
var Bb = (
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
      if (za(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var h = e[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = Wt(s) ? yr : ue, a = [];
        var f = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, c = K(f.seriesLayoutBy, v.seriesLayoutBy) || null, d = K(f.sourceHeader, v.sourceHeader), y = K(f.dimensions, v.dimensions), p = c !== v.seriesLayoutBy || !!d != !!v.sourceHeader || y;
        n = p ? [vu(s, {
          seriesLayoutBy: c,
          sourceHeader: d,
          dimensions: y
        }, l)] : [];
      } else {
        var g = t;
        if (i) {
          var m = this._applyTransform(e);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = g.get("source", !0);
          n = [vu(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Qc(a);
      }
      var o, s = [], l = [];
      return M(t, function(u) {
        u.prepareSource();
        var h = u.getSource(n || 0), f = "";
        n != null && !h && Qc(f), s.push(h), l.push(u._getVersionSign());
      }), i ? o = Ob(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [yw(s[0])]), {
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
        za(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new du(), s.initData(new Cg(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (za(t)) {
        var e = Sg(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return G(pw(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (za(t))
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
function za(r) {
  return r.mainType === "series";
}
function Qc(r) {
  throw new Error(r);
}
var Fb = "line-height:1";
function Jg(r) {
  var t = r.lineHeight;
  return t == null ? Fb : "line-height:" + zt(t + "") + "px";
}
function ty(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + zt(i + "") + "px;color:" + zt(e) + ";font-weight:" + zt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + zt(o + "") + "px;color:" + zt(a) + ";font-weight:" + zt(s + "")
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
var $b = [0, 10, 20, 30], zb = ["", `
`, `

`, `


`];
function ta(r, t) {
  return t.type = r, t;
}
function mu(r) {
  return r.type === "section";
}
function ey(r) {
  return mu(r) ? Hb : Vb;
}
function ry(r) {
  if (mu(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return M(r.blocks, function(n) {
      var a = ry(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || mu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function Hb(r, t, e, i) {
  var n = t.noHeader, a = Gb(ry(t)), o = [], s = t.blocks || [];
  Ye(!s || F(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if ($i(u, l)) {
      var h = new Aw(u[l], null);
      s.sort(function(y, p) {
        return h.evaluate(y.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  M(s, function(y, p) {
    var g = t.valueFormatter, m = ey(y)(
      // Inherit valueFormatter
      g ? O(O({}, r), {
        valueFormatter: g
      }) : r,
      y,
      p > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var f = r.renderMode === "richText" ? o.join(a.richText) : _u(i, o.join(""), n ? e : a.html);
  if (n)
    return f;
  var v = yu(t.header, "ordinal", r.useUTC), c = ty(i, r.renderMode).nameStyle, d = Jg(i);
  return r.renderMode === "richText" ? iy(r, v, c) + a.richText + f : _u(i, '<div style="' + c + ";" + d + ';">' + zt(v) + "</div>" + f, e);
}
function Vb(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, h = t.valueFormatter || r.valueFormatter || function(S) {
    return S = F(S) ? S : [S], G(S, function(b, w) {
      return yu(b, F(c) ? c[w] : c, u);
    });
  };
  if (!(a && o)) {
    var f = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : yu(l, "ordinal", u), c = t.valueType, d = o ? [] : h(t.value, t.dataIndex), y = !s || !a, p = !s && a, g = ty(i, n), m = g.nameStyle, _ = g.valueStyle;
    return n === "richText" ? (s ? "" : f) + (a ? "" : iy(r, v, m)) + (o ? "" : Yb(r, d, y, p, _)) : _u(i, (s ? "" : f) + (a ? "" : Wb(v, !s, m)) + (o ? "" : Ub(d, y, p, _)), e);
  }
}
function jc(r, t, e, i, n, a) {
  if (r) {
    var o = ey(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function Gb(r) {
  return {
    html: $b[r],
    richText: zb[r]
  };
}
function _u(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = Jg(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function Wb(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + zt(r) + "</span>";
}
function Ub(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = F(r) ? r : [r], '<span style="' + a + ";" + i + '">' + G(r, function(o) {
    return zt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function iy(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function Yb(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle(F(t) ? t.join("  ") : t, a);
}
function Xb(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return oi(i);
}
function ny(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var fl = (
  /** @class */
  function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = $p();
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
      return $(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      F(e) ? M(e, function(a) {
        return O(i, a);
      }) : O(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  }()
);
function Zb(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = F(s), u = Xb(t, e), h, f, v, c;
  if (o > 1 || l && !o) {
    var d = qb(s, t, e, a, u);
    h = d.inlineValues, f = d.inlineValueTypes, v = d.blocks, c = d.inlineValues[0];
  } else if (o) {
    var y = n.getDimensionInfo(a[0]);
    c = h = zi(n, e, a[0]), f = y.type;
  } else
    c = h = l ? s[0] : s;
  var p = Gp(t), g = p && t.name || "", m = n.getName(e), _ = i ? g : m;
  return ta("section", {
    header: g,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !p,
    sortParam: c,
    blocks: [ta("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Me(_),
      value: h,
      valueType: f,
      dataIndex: e
    })].concat(v || [])
  });
}
function qb(r, t, e, i, n) {
  var a = t.getData(), o = Yi(r, function(f, v, c) {
    var d = a.getDimensionInfo(c);
    return f = f || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? M(i, function(f) {
    h(zi(a, e, f), f);
  }) : M(r, h);
  function h(f, v) {
    var c = a.getDimensionInfo(v);
    !c || c.otherDims.tooltip === !1 || (o ? u.push(ta("nameValue", {
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
var nr = _t();
function Ha(r, t) {
  return r.getName(t) || r.getId(t);
}
var Kb = "__universalTransitionEnabled", Ie = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Bn({
        count: jb,
        reset: Jb
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = nr(this).sourceManager = new Bb(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      tv(o, this), this.dataTask.context.data = o, nr(this).dataBeforeProcessed = o, Jc(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = jn(this), a = n ? kh(e) : {}, o = this.subType;
      lt.hasClass(o) && (o += "Series"), it(e, i.getTheme().get(this.subType)), it(e, this.getDefaultOption()), nc(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Jn(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = it(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = jn(this);
      n && Jn(this.option, e, n);
      var a = nr(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      tv(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, nr(this).dataBeforeProcessed = o, Jc(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !Wt(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && nc(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Su(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return nr(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = Su(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      nr(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return q(e);
    }, t.prototype.getSourceManager = function() {
      return nr(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return nr(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return Zb({
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
      var a = this.ecModel, o = Oh.prototype.getColorFromPalette.call(this, e, i, n);
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
          var l = e[s], u = Ha(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = ct(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[Ha(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[Kb])
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
            var f = i[h], v = Ha(e, f);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(f);
          }
        } else if (s === "single" || s === !0) {
          var c = i[l - 1], v = Ha(e, c);
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
Re(Ie, Mb);
Re(Ie, Oh);
yp(Ie, lt);
function Jc(r) {
  var t = r.name;
  Gp(r) || (r.name = Qb(r) || t);
}
function Qb(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return M(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function jb(r) {
  return r.model.getRawData().count();
}
function Jb(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), tx;
}
function tx(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function tv(r, t) {
  M(F0(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, qt(ex, t));
  });
}
function ex(r, t) {
  var e = Su(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Su(r) {
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
var rx = nt.extend({
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
}), ix = nt.extend({
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
}), nx = nt.extend({
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
}), ax = nt.extend({
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
}), ox = {
  line: Sr,
  rect: Pt,
  roundRect: Pt,
  square: Pt,
  circle: os,
  diamond: ix,
  pin: nx,
  arrow: ax,
  triangle: rx
}, sx = {
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
}, wu = {};
M(ox, function(r, t) {
  wu[t] = new r();
});
var lx = nt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = xo(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = wu[i];
      n || (i = "rect", n = wu[i]), sx[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function ux(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function ea(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = ug(r.slice(8), new rt(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = Sh(r.slice(7), {}, new rt(t, e, i, n), o ? "center" : "cover") : l = new lx({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = ux, a && l.setColor(a), l;
}
function hx(r) {
  return F(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function ay(r, t) {
  if (r != null)
    return F(r) || (r = [r, r]), [Et(r[0], t[0]) || 0, Et(K(r[1], r[0]), t[1]) || 0];
}
var fx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      return Ah(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new kt(), n = ea("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = ea(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
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
function Bh(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = zi(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(zi(r, t, e[o]));
    return a.join(" ");
  }
}
function oy(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!F(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Fh = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = ea(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = cx, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Ro(this.childAt(0));
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
        h ? v.attr(c) : le(v, c, s, i), lg(v);
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
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, Ze(v, c, s, i);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, h, f, v, c, d, y, p, g;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, f = a.selectItemStyle, v = a.focus, c = a.blurScope, y = a.labelStatesModels, p = a.hoverScale, g = a.cursorStyle, d = a.emphasisDisabled), !a || e.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), f = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), c = _.get("blurScope"), d = _.get("disabled"), y = hs(m), p = _.getShallow("scale"), g = m.getShallow("cursor");
      }
      var S = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (S || 0) * Math.PI / 180 || 0);
      var b = ay(e.getItemVisual(i, "symbolOffset"), n);
      b && (s.x = b[0], s.y = b[1]), g && s.attr("cursor", g);
      var w = e.getItemVisual(i, "style"), x = w.fill;
      if (s instanceof wr) {
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
      var A = e.getItemVisual(i, "liftZ"), D = this._z2;
      A != null ? D == null && (this._z2 = s.z2, s.z2 += A) : D != null && (s.z2 = D, this._z2 = null);
      var T = o && o.useNameLabel;
      xh(s, y, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: P,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function P(E) {
        return T ? e.getName(E) : Bh(e, E);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var L = s.ensureState("emphasis");
      L.style = u, s.ensureState("select").style = f, s.ensureState("blur").style = h;
      var I = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      L.scaleX = this._sizeX * I, L.scaleY = this._sizeY * I, this.setSymbolScale(1), Oo(this, v, c, d);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = ot(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Bo(l, {
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
      Bo(a, {
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
  }(kt)
);
function cx(r, t) {
  this.parent.drift(r, t);
}
function cl(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function ev(r) {
  return r != null && !H(r) && (r = {
    isIgnore: r
  }), r || {};
}
function rv(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: hs(t),
    cursorStyle: t.get("cursor")
  };
}
var vx = (
  /** @class */
  function() {
    function r(t) {
      this.group = new kt(), this._SymbolCtor = t || Fh;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = ev(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = rv(t), u = {
        disableAnimation: s
      }, h = e.getSymbolPoint || function(f) {
        return t.getItemLayout(f);
      };
      a || i.removeAll(), t.diff(a).add(function(f) {
        var v = h(f);
        if (cl(t, v, f, e)) {
          var c = new o(t, f, l, u);
          c.setPosition(v), t.setItemGraphicEl(f, c), i.add(c);
        }
      }).update(function(f, v) {
        var c = a.getItemGraphicEl(v), d = h(f);
        if (!cl(t, d, f, e)) {
          i.remove(c);
          return;
        }
        var y = t.getItemVisual(f, "symbol") || "circle", p = c && c.getSymbolType && c.getSymbolType();
        if (!c || p && p !== y)
          i.remove(c), c = new o(t, f, l, u), c.setPosition(d);
        else {
          c.updateData(t, f, l, u);
          var g = {
            x: d[0],
            y: d[1]
          };
          s ? c.attr(g) : le(c, g, n);
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
      this._seriesScope = rv(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = ev(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (cl(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      ls(this._progressiveEls || this.group, t);
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
function sy(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = dx(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, f = G(r.dimensions, function(d) {
    return t.mapDimension(d);
  }), v = !1, c = t.getCalculationInfo("stackResultDimension");
  return Hi(
    t,
    f[0]
    /* , dims[1] */
  ) && (v = !0, f[0] = c), Hi(
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
function dx(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : vt(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function ly(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
var uy = typeof Float32Array < "u", px = uy ? Float32Array : Array;
function He(r) {
  return F(r) ? uy ? new Float32Array(r) : r : new px(r);
}
function gx(r, t) {
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
  for (var l = gx(r, t), u = [], h = [], f = [], v = [], c = [], d = [], y = [], p = sy(n, t, o), g = r.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var S = l[_], b = !0, w = void 0, x = void 0;
    switch (S.cmd) {
      case "=":
        w = S.idx * 2, x = S.idx1 * 2;
        var C = g[w], A = g[w + 1], D = m[x], T = m[x + 1];
        (isNaN(C) || isNaN(A)) && (C = D, A = T), u.push(C, A), h.push(D, T), f.push(e[w], e[w + 1]), v.push(i[x], i[x + 1]), y.push(t.getRawIndex(S.idx1));
        break;
      case "+":
        var P = S.idx, L = p.dataDimsForPoint, I = n.dataToPoint([t.get(L[0], P), t.get(L[1], P)]);
        x = P * 2, u.push(I[0], I[1]), h.push(m[x], m[x + 1]);
        var E = ly(p, n, t, P);
        f.push(E[0], E[1]), v.push(i[x], i[x + 1]), y.push(t.getRawIndex(P));
        break;
      case "-":
        b = !1;
    }
    b && (c.push(S), d.push(d.length));
  }
  d.sort(function(pt, he) {
    return y[pt] - y[he];
  });
  for (var R = u.length, z = He(R), k = He(R), N = He(R), V = He(R), Z = [], _ = 0; _ < d.length; _++) {
    var Q = d[_], at = _ * 2, ft = Q * 2;
    z[at] = u[ft], z[at + 1] = u[ft + 1], k[at] = h[ft], k[at + 1] = h[ft + 1], N[at] = f[ft], N[at + 1] = f[ft + 1], V[at] = v[ft], V[at + 1] = v[ft + 1], Z[_] = c[Q];
  }
  return {
    current: z,
    next: k,
    stackedOnCurrent: N,
    stackedOnNext: V,
    status: Z
  };
}
var ar = Math.min, or = Math.max;
function ei(r, t) {
  return isNaN(r) || isNaN(t);
}
function bu(r, t, e, i, n, a, o, s, l) {
  for (var u, h, f, v, c, d, y = e, p = 0; p < i; p++) {
    var g = t[y * 2], m = t[y * 2 + 1];
    if (y >= n || y < 0)
      break;
    if (ei(g, m)) {
      if (l) {
        y += a;
        continue;
      }
      break;
    }
    if (y === e)
      r[a > 0 ? "moveTo" : "lineTo"](g, m), f = g, v = m;
    else {
      var _ = g - u, S = m - h;
      if (_ * _ + S * S < 0.5) {
        y += a;
        continue;
      }
      if (o > 0) {
        for (var b = y + a, w = t[b * 2], x = t[b * 2 + 1]; w === g && x === m && p < i; )
          p++, b += a, y += a, w = t[b * 2], x = t[b * 2 + 1], g = t[y * 2], m = t[y * 2 + 1], _ = g - u, S = m - h;
        var C = p + 1;
        if (l)
          for (; ei(w, x) && C < i; )
            C++, b += a, w = t[b * 2], x = t[b * 2 + 1];
        var A = 0.5, D = 0, T = 0, P = void 0, L = void 0;
        if (C >= i || ei(w, x))
          c = g, d = m;
        else {
          D = w - u, T = x - h;
          var I = g - u, E = w - g, R = m - h, z = x - m, k = void 0, N = void 0;
          if (s === "x") {
            k = Math.abs(I), N = Math.abs(E);
            var V = D > 0 ? 1 : -1;
            c = g - V * k * o, d = m, P = g + V * N * o, L = m;
          } else if (s === "y") {
            k = Math.abs(R), N = Math.abs(z);
            var Z = T > 0 ? 1 : -1;
            c = g, d = m - Z * k * o, P = g, L = m + Z * N * o;
          } else
            k = Math.sqrt(I * I + R * R), N = Math.sqrt(E * E + z * z), A = N / (N + k), c = g - D * o * (1 - A), d = m - T * o * (1 - A), P = g + D * o * A, L = m + T * o * A, P = ar(P, or(w, g)), L = ar(L, or(x, m)), P = or(P, ar(w, g)), L = or(L, ar(x, m)), D = P - g, T = L - m, c = g - D * k / N, d = m - T * k / N, c = ar(c, or(u, g)), d = ar(d, or(h, m)), c = or(c, ar(u, g)), d = or(d, ar(h, m)), D = g - c, T = m - d, P = g + D * N / k, L = m + T * N / k;
        }
        r.bezierCurveTo(f, v, c, d, g, m), f = P, v = L;
      } else
        r.lineTo(g, m);
    }
    u = g, h = m, y += a;
  }
  return p;
}
var hy = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  }()
), mx = (
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
      return new hy();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && ei(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && ei(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += bu(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = ni.CMD, s, l, u = i === "x", h = [], f = 0; f < a.length; ) {
        var v = a[f++], c = void 0, d = void 0, y = void 0, p = void 0, g = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[f++], l = a[f++];
            break;
          case o.L:
            if (c = a[f++], d = a[f++], _ = u ? (e - s) / (c - s) : (e - l) / (d - l), _ <= 1 && _ >= 0) {
              var S = u ? (d - l) * _ + l : (c - s) * _ + s;
              return u ? [e, S] : [S, e];
            }
            s = c, l = d;
            break;
          case o.C:
            c = a[f++], d = a[f++], y = a[f++], p = a[f++], g = a[f++], m = a[f++];
            var b = u ? Co(s, c, y, g, e, h) : Co(l, d, p, m, e, h);
            if (b > 0)
              for (var w = 0; w < b; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var S = u ? wt(l, d, p, m, x) : wt(s, c, y, g, x);
                  return u ? [e, S] : [S, e];
                }
              }
            s = g, l = m;
            break;
        }
      }
    }, t;
  }(nt)
), _x = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(hy)
), Sx = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new _x();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && ei(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && ei(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = bu(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        bu(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  }(nt)
);
function $h() {
  var r = _t();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var fy = _t(), bx = $h(), ye = (
  /** @class */
  function() {
    function r() {
      this.group = new kt(), this.uid = ds("viewChart"), this.renderTask = Bn({
        plan: xx,
        reset: Tx
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && nv(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && nv(a, n, "normal");
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
      ls(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      fy(t).updateMethod = e;
    }, r.protoInitialize = function() {
      var t = r.prototype;
      t.type = "chart";
    }(), r;
  }()
);
function iv(r, t, e) {
  r && lu(r) && (t === "emphasis" ? Ro : ko)(r, e);
}
function nv(r, t, e) {
  var i = ai(r, t), n = t && t.highlightKey != null ? lS(t.highlightKey) : null;
  i != null ? M(Rt(i), function(a) {
    iv(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    iv(a, e, n);
  });
}
Ju(ye);
Jo(ye);
function xx(r) {
  return bx(r.model);
}
function Tx(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && fy(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), Cx[l];
}
var Cx = {
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
function cy(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, h = e.get(["lineStyle", "width"]) || 0;
  o -= h / 2, s -= h / 2, l += h, u += h, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var f = new Pt({
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
    var y = X(n) ? function(p) {
      n(p, f);
    } : null;
    Ze(f, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, y);
  }
  return f;
}
function vy(r, t, e) {
  var i = r.getArea(), n = mt(i.r0, 1), a = mt(i.r, 1), o = new Zi({
    shape: {
      cx: mt(r.cx, 1),
      cy: mt(r.cy, 1),
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
function Mx(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return vy(r, t, e);
    if (r.type === "cartesian2d")
      return cy(r, t, e, i, n);
  } else return null;
  return null;
}
function zh(r, t) {
  return r.type === t;
}
function av(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function ov(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function sv(r, t) {
  var e = ov(r), i = e[0], n = e[1], a = ov(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function lv(r) {
  return vt(r) ? r : r ? 0.5 : 0;
}
function Ax(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = He(i * 2), a = 0; a < i; a++) {
    var o = ly(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function sr(r, t, e, i, n) {
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
        var d = (h[o] + f[o]) / 2, y = [];
        u[o] = y[o] = d, u[1 - o] = h[1 - o], y[1 - o] = f[1 - o], s.push(u[0], u[1]), s.push(y[0], y[1]);
        break;
      default:
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function Dx(r, t) {
  var e = [], i = r.length, n, a;
  function o(h, f, v) {
    var c = h.coord, d = (v - c) / (f.coord - c), y = D_(d, [h.color, f.color]);
    return {
      coord: v,
      color: y
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
  if (!(!i || !i.length || !r.count()) && t.type === "cartesian2d") {
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = r.getDimensionInfo(i[o].dimension);
      if (n = s && s.coordDim, n === "x" || n === "y") {
        a = i[o];
        break;
      }
    }
    if (a) {
      var l = t.getAxis(n), u = G(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), h = u.length, f = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), f.reverse());
      var v = Dx(u, n === "x" ? e.getWidth() : e.getHeight()), c = v.length;
      if (!c && h)
        return u[0].coord < 0 ? f[1] ? f[1] : u[h - 1].color : f[0] ? f[0] : u[0].color;
      var d = 10, y = v[0].coord - d, p = v[c - 1].coord + d, g = p - y;
      if (g < 1e-3)
        return "transparent";
      M(v, function(_) {
        _.offset = (_.coord - y) / g;
      }), v.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: c ? v[c - 1].offset : 0.5,
        color: f[1] || "transparent"
      }), v.unshift({
        offset: c ? v[0].offset : 0.5,
        color: f[0] || "transparent"
      });
      var m = new sg(0, 0, 0, 0, v, !0);
      return m[n] = y, m[n + "2"] = p, m;
    }
  }
}
function Lx(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && Ix(a, t))) {
      var o = t.mapDimension(a.dim), s = {};
      return M(a.getViewLabels(), function(l) {
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
    if (Fh.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function Ex(r, t) {
  return isNaN(r) || isNaN(t);
}
function Rx(r) {
  for (var t = r.length / 2; t > 0 && Ex(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function uv(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function kx(r, t, e) {
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
function dy(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < Le.length; t++)
    if (r.get([Le[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function vl(r, t, e, i) {
  if (zh(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = dy(i) ? function(c, d) {
      r._endLabelOnDuring(c, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = cy(t, e, i, function() {
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
    return vy(t, e, i);
}
function Ox(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var Nx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new kt(), i = new vx();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = dt(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), h = s.getLayout("points") || [], f = a.type === "polar", v = this._coordSys, c = this._symbolDraw, d = this._polyline, y = this._polygon, p = this._lineGroup, g = !i.ssr && e.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), S = sy(a, s, _), b = m && Ax(a, s, S), w = e.get("showSymbol"), x = e.get("connectNulls"), C = w && !f && Lx(e, s, a), A = this._data;
      A && A.eachItemGraphicEl(function(pt, he) {
        pt.__temp && (o.remove(pt), A.setItemGraphicEl(he, null));
      }), w || c.remove(), o.add(p);
      var D = f ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var P = Px(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && D === this._step))
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [h[pt * 2], h[pt * 2 + 1]];
          }
        }), g && this._initSymbolLabelAnimation(s, a, T), D && (b && (b = sr(b, h, a, D, x)), h = sr(h, null, a, D, x)), d = this._newPolyline(h), m ? y = this._newPolygon(h, b) : y && (p.remove(y), y = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, oi(P)), p.setClipPath(vl(this, a, !0, e));
      else {
        m && !y ? y = this._newPolygon(h, b) : y && !m && (p.remove(y), y = this._polygon = null), f || this._initOrUpdateEndLabel(e, a, oi(P));
        var L = p.getClipPath();
        if (L) {
          var I = vl(this, a, !1, e);
          Ze(L, {
            shape: I.shape
          }, e);
        } else
          p.setClipPath(vl(this, a, !0, e));
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [h[pt * 2], h[pt * 2 + 1]];
          }
        }), (!av(this._stackedOnPoints, b) || !av(this._points, h)) && (g ? this._doUpdateAnimation(s, b, a, n, D, _, x) : (D && (b && (b = sr(b, h, a, D, x)), h = sr(h, null, a, D, x)), d.setShape({
          points: h
        }), y && y.setShape({
          points: h,
          stackedOnPoints: b
        })));
      }
      var E = e.getModel("emphasis"), R = E.get("focus"), z = E.get("blurScope"), k = E.get("disabled");
      if (d.useStyle(st(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: P,
          lineJoin: "bevel"
        }
      )), su(d, e, "lineStyle"), d.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var N = d.getState("emphasis").style;
        N.lineWidth = +d.style.lineWidth + 1;
      }
      ot(d).seriesIndex = e.seriesIndex, Oo(d, R, z, k);
      var V = lv(e.get("smooth")), Z = e.get("smoothMonotone");
      if (d.setShape({
        smooth: V,
        smoothMonotone: Z,
        connectNulls: x
      }), y) {
        var Q = s.getCalculationInfo("stackedOnSeries"), at = 0;
        y.useStyle(st(u.getAreaStyle(), {
          fill: P,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), Q && (at = lv(Q.get("smooth"))), y.setShape({
          smooth: V,
          stackedOnSmooth: at,
          smoothMonotone: Z,
          connectNulls: x
        }), su(y, e, "areaStyle"), ot(y).seriesIndex = e.seriesIndex, Oo(y, R, z, k);
      }
      var ft = this._changePolyState;
      s.eachItemGraphicEl(function(pt) {
        pt && (pt.onHoverStateChange = ft);
      }), this._polyline.onHoverStateChange = ft, this._data = s, this._coordSys = a, this._stackedOnPoints = b, this._points = h, this._step = D, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, d), y && this.packEventData(e, y));
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
      var o = e.getData(), s = ai(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], f = l[s * 2 + 1];
          if (isNaN(h) || isNaN(f) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, f))
            return;
          var v = e.get("zlevel") || 0, c = e.get("z") || 0;
          u = new Fh(o, s), u.x = h, u.y = f, u.setZ(v, c);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = v, d.z = c, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        ye.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = ai(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        ye.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      hc(this._polyline, e), i && hc(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new mx({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new Sx({
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
      X(h) && (h = h(null));
      var f = u.get("animationDelay") || 0, v = X(f) ? f(null) : f;
      e.eachItemGraphicEl(function(c, d) {
        var y = c;
        if (y) {
          var p = [c.x, c.y], g = void 0, m = void 0, _ = void 0;
          if (n)
            if (o) {
              var S = n, b = i.pointToCoord(p);
              a ? (g = S.startAngle, m = S.endAngle, _ = -b[1] / 180 * Math.PI) : (g = S.r0, m = S.r, _ = b[0]);
            } else {
              var w = n;
              a ? (g = w.x, m = w.x + w.width, _ = c.x) : (g = w.y + w.height, m = w.y, _ = c.y);
            }
          var x = m === g ? 0 : (_ - g) / (m - g);
          l && (x = 1 - x);
          var C = X(f) ? f(d) : h * x + v, A = y.getSymbolPath(), D = A.getTextContent();
          y.attr({
            scaleX: 0,
            scaleY: 0
          }), y.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: C
          }), D && D.animateFrom({
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
      if (dy(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new me({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = Rx(l);
        h >= 0 && (xh(s, hs(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: h,
          defaultText: function(f, v, c) {
            return c != null ? oy(o, c) : Bh(o, f);
          },
          enableTextSetter: !0
        }, Ox(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var f = n.getLayout("points"), v = n.hostModel, c = v.get("connectNulls"), d = s.get("precision"), y = s.get("distance") || 0, p = l.getBaseAxis(), g = p.isHorizontal(), m = p.inverse, _ = i.shape, S = m ? g ? _.x : _.y + _.height : g ? _.x + _.width : _.y, b = (g ? y : 0) * (m ? -1 : 1), w = (g ? 0 : -y) * (m ? -1 : 1), x = g ? "x" : "y", C = kx(f, S, x), A = C.range, D = A[1] - A[0], T = void 0;
        if (D >= 1) {
          if (D > 1 && !c) {
            var P = uv(f, A[0]);
            u.attr({
              x: P[0] + b,
              y: P[1] + w
            }), o && (T = v.getRawValue(A[0]));
          } else {
            var P = h.getPointOn(S, x);
            P && u.attr({
              x: P[0] + b,
              y: P[1] + w
            });
            var L = v.getRawValue(A[0]), I = v.getRawValue(A[1]);
            o && (T = H1(n, d, L, I, C.t));
          }
          a.lastFrameIndex = A[0];
        } else {
          var E = e === 1 || a.lastFrameIndex > 0 ? A[0] : 0, P = uv(f, E);
          o && (T = v.getRawValue(E)), u.attr({
            x: P[0] + b,
            y: P[1] + w
          });
        }
        if (o) {
          var R = fs(u);
          typeof R.setLabelText == "function" && R.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, h = this._polygon, f = e.hostModel, v = yx(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), c = v.current, d = v.stackedOnCurrent, y = v.next, p = v.stackedOnNext;
      if (o && (d = sr(v.stackedOnCurrent, v.current, n, o, l), c = sr(v.current, null, n, o, l), p = sr(v.stackedOnNext, v.next, n, o, l), y = sr(v.next, null, n, o, l)), sv(c, y) > 3e3 || h && sv(d, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: y
        }), h && (h.stopAnimation(), h.setShape({
          points: y,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = c;
      var g = {
        shape: {
          points: y
        }
      };
      v.current !== c && (g.shape.__points = v.next), u.stopAnimation(), le(u, g, f), h && (h.setShape({
        // Reuse the points with polyline.
        points: c,
        stackedOnPoints: d
      }), h.stopAnimation(), le(h, {
        shape: {
          stackedOnPoints: p
        }
      }, f), u.shape.points !== h.shape.points && (h.shape.points = u.shape.points));
      for (var m = [], _ = v.status, S = 0; S < _.length; S++) {
        var b = _[S].cmd;
        if (b === "=") {
          var w = e.getItemGraphicEl(_[S].idx1);
          w && m.push({
            el: w,
            ptIdx: S
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        h && h.dirtyShape();
        for (var x = u.shape.__points, C = 0; C < m.length; C++) {
          var A = m[C].el, D = m[C].ptIdx * 2;
          A.x = x[D], A.y = x[D + 1], A.markRedraw();
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
function Bx(r, t) {
  return {
    seriesType: r,
    plan: $h(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = G(n.dimensions, function(f) {
          return i.mapDimension(f);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        Hi(i, a[0]) && (a[0] = s), Hi(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), h = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(f, v) {
            for (var c = f.end - f.start, d = He(c * o), y = [], p = [], g = f.start, m = 0; g < f.end; g++) {
              var _ = void 0;
              if (o === 1) {
                var S = l.get(u, g);
                _ = n.dataToPoint(S, null, p);
              } else
                y[0] = l.get(u, g), y[1] = l.get(h, g), _ = n.dataToPoint(y, null, p);
              d[m++] = _[0], d[m++] = _[1];
            }
            v.setLayout("points", d);
          }
        };
      }
    }
  };
}
var Fx = {
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
}, $x = function(r) {
  return Math.round(r.length / 2);
};
function py(r) {
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
          $(a) ? d = Fx[a] : X(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / c, d, $x));
        }
      }
    }
  };
}
function zx(r) {
  r.registerChartView(Nx), r.registerSeriesModel(fx), r.registerLayout(Bx("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, py("line"));
}
var Hx = "__ec_stack_";
function gy(r) {
  return r.get("stack") || Hx + r.seriesIndex;
}
function Hh(r) {
  return r.dim + r.index;
}
function yy(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    _y(i) && e.push(i);
  }), e;
}
function Vx(r) {
  var t = {};
  M(r, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var f = l.getData(), v = h.dim + "_" + h.index, c = f.getDimensionIndex(f.mapDimension(h.dim)), d = f.getStore(), y = 0, p = d.count(); y < p; ++y) {
        var g = d.get(c, y);
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
function my(r) {
  var t = Vx(r), e = [];
  return M(r, function(i) {
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
    var d = Et(i.get("barWidth"), s), y = Et(i.get("barMaxWidth"), s), p = Et(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (Sy(i) ? 0.5 : 1),
      s
    ), g = i.get("barGap"), m = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: y,
      barMinWidth: p,
      barGap: g,
      barCategoryGap: m,
      axisKey: Hh(a),
      stackId: gy(i)
    });
  }), Gx(e);
}
function Gx(r) {
  var t = {};
  M(r, function(i, n) {
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
  return M(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = ct(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Et(s, o), h = Et(i.gap, 1), f = i.remainedWidth, v = i.autoWidthCount, c = (f - u) / (v + (v - 1) * h);
    c = Math.max(c, 0), M(a, function(g) {
      var m = g.maxWidth, _ = g.minWidth;
      if (g.width) {
        var S = g.width;
        m && (S = Math.min(S, m)), _ && (S = Math.max(S, _)), g.width = S, f -= S + h * S, v--;
      } else {
        var S = c;
        m && m < S && (S = Math.min(m, f)), _ && _ > S && (S = _), S !== c && (g.width = S, f -= S + h * S, v--);
      }
    }), c = (f - u) / (v + (v - 1) * h), c = Math.max(c, 0);
    var d = 0, y;
    M(a, function(g, m) {
      g.width || (g.width = c), y = g, d += g.width * (1 + h);
    }), y && (d -= y.width * h);
    var p = -d / 2;
    M(a, function(g, m) {
      e[n][m] = e[n][m] || {
        bandWidth: o,
        offset: p,
        width: g.width
      }, p += g.width * (1 + h);
    });
  }), e;
}
function Wx(r, t, e) {
  if (r && t) {
    var i = r[Hh(t)];
    return i;
  }
}
function Ux(r, t) {
  var e = yy(r, t), i = my(e);
  M(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = gy(n), u = i[Hh(s)][l], h = u.offset, f = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: f
    });
  });
}
function Yx(r) {
  return {
    seriesType: r,
    plan: $h(),
    reset: function(t) {
      if (_y(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), h = e.getCalculationInfo("stackResultDimension"), f = Hi(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), c = Xx(n, a), d = Sy(t), y = t.get("barMinHeight") || 0, p = h && e.getDimensionIndex(h), g = e.getLayout("size"), m = e.getLayout("offset");
        return {
          progress: function(_, S) {
            for (var b = _.count, w = d && He(b * 3), x = d && l && He(b * 3), C = d && He(b), A = i.master.getRect(), D = v ? A.width : A.height, T, P = S.getStore(), L = 0; (T = _.next()) != null; ) {
              var I = P.get(f ? p : o, T), E = P.get(s, T), R = c, z = void 0;
              f && (z = +I - P.get(o, T));
              var k = void 0, N = void 0, V = void 0, Z = void 0;
              if (v) {
                var Q = i.dataToPoint([I, E]);
                if (f) {
                  var at = i.dataToPoint([z, E]);
                  R = at[0];
                }
                k = R, N = Q[1] + m, V = Q[0] - R, Z = g, Math.abs(V) < y && (V = (V < 0 ? -1 : 1) * y);
              } else {
                var Q = i.dataToPoint([E, I]);
                if (f) {
                  var at = i.dataToPoint([E, z]);
                  R = at[1];
                }
                k = Q[0] + m, N = R, V = g, Z = Q[1] - R, Math.abs(Z) < y && (Z = (Z <= 0 ? -1 : 1) * y);
              }
              d ? (w[L] = k, w[L + 1] = N, w[L + 2] = v ? V : Z, x && (x[L] = v ? A.x : k, x[L + 1] = v ? N : A.y, x[L + 2] = D), C[T] = T) : S.setItemLayout(T, {
                x: k,
                y: N,
                width: V,
                height: Z
              }), L += 3;
            }
            d && S.setLayout({
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
function _y(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function Sy(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function Xx(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var xu = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return Ah(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          M(a.getAxes(), function(v, c) {
            if (v.type === "category" && i != null) {
              var d = v.getTicksCoords(), y = v.getTickModel().get("alignWithLabel"), p = o[c], g = i[c] === "x1" || i[c] === "y1";
              if (g && !y && (p += 1), d.length < 2)
                return;
              if (d.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[g ? 1 : 0]);
                return;
              }
              for (var m = void 0, _ = void 0, S = 1, b = 0; b < d.length; b++) {
                var w = d[b].coord, x = b === d.length - 1 ? d[b - 1].tickValue + S : d[b].tickValue;
                if (x === p) {
                  _ = w;
                  break;
                } else if (x < p)
                  m = w;
                else if (m != null && x > p) {
                  _ = (w + m) / 2;
                  break;
                }
                b === 1 && (S = x - d[0].tickValue);
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
  }(Ie)
);
Ie.registerClass(xu);
var Zx = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return Ah(null, this, {
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
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = eb(xu.defaultOption, {
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
  }(xu)
), Ho = "\0__throttleOriginMethod", hv = "\0__throttleRate", fv = "\0__throttleType";
function Vh(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function f() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var c = [], d = 0; d < arguments.length; d++)
      c[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = c;
    var y = h || t, p = h || e;
    h = null, s = i - (p ? n : a) - y, clearTimeout(o), p ? o = setTimeout(f, y) : s >= 0 ? f() : o = setTimeout(f, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(c) {
    h = c;
  }, v;
}
function wy(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[Ho] || n, o = n[fv], s = n[hv];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = Vh(a, e, i === "debounce"), n[Ho] = a, n[fv] = i, n[hv] = e;
    }
    return n;
  }
}
function Tu(r, t) {
  var e = r[t];
  e && e[Ho] && (e.clear && e.clear(), r[t] = e[Ho]);
}
var qx = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  }()
), cv = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new qx();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, h = i.startAngle, f = i.endAngle, v = i.clockwise, c = Math.PI * 2, d = v ? f - h < c : h - f < c;
      d || (h = f - (v ? c : -c));
      var y = Math.cos(h), p = Math.sin(h), g = Math.cos(f), m = Math.sin(f);
      d ? (e.moveTo(y * o + n, p * o + a), e.arc(y * u + n, p * u + a, l, -Math.PI + h, h, !v)) : e.moveTo(y * s + n, p * s + a), e.arc(n, a, s, h, f, !v), e.arc(g * u + n, m * u + a, l, f - Math.PI * 2, f - Math.PI, !v), o !== 0 && e.arc(n, a, o, f, h, v);
    }, t;
  }(nt)
);
function Kx(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return xo(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, h = u.cx, f = u.cy, v = u.r, c = u.r0, d = (v + c) / 2, y = u.startAngle, p = u.endAngle, g = (y + p) / 2, m = e ? Math.abs(v - c) / 2 : 0, _ = Math.cos, S = Math.sin, b = h + v * _(y), w = f + v * S(y), x = "left", C = "top";
    switch (s) {
      case "startArc":
        b = h + (c - l) * _(g), w = f + (c - l) * S(g), x = "center", C = "top";
        break;
      case "insideStartArc":
        b = h + (c + l) * _(g), w = f + (c + l) * S(g), x = "center", C = "bottom";
        break;
      case "startAngle":
        b = h + d * _(y) + Va(y, l + m, !1), w = f + d * S(y) + Ga(y, l + m, !1), x = "right", C = "middle";
        break;
      case "insideStartAngle":
        b = h + d * _(y) + Va(y, -l + m, !1), w = f + d * S(y) + Ga(y, -l + m, !1), x = "left", C = "middle";
        break;
      case "middle":
        b = h + d * _(g), w = f + d * S(g), x = "center", C = "middle";
        break;
      case "endArc":
        b = h + (v + l) * _(g), w = f + (v + l) * S(g), x = "center", C = "bottom";
        break;
      case "insideEndArc":
        b = h + (v - l) * _(g), w = f + (v - l) * S(g), x = "center", C = "top";
        break;
      case "endAngle":
        b = h + d * _(p) + Va(p, l + m, !0), w = f + d * S(p) + Ga(p, l + m, !0), x = "left", C = "middle";
        break;
      case "insideEndAngle":
        b = h + d * _(p) + Va(p, -l + m, !0), w = f + d * S(p) + Ga(p, -l + m, !0), x = "right", C = "middle";
        break;
      default:
        return xo(i, n, a);
    }
    return i = i || {}, i.x = b, i.y = w, i.align = x, i.verticalAlign = C, i;
  };
}
function Qx(r, t, e, i) {
  if (vt(i)) {
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
  var h = Math.PI * 1.5 - l;
  u === "middle" && h > Math.PI / 2 && h < Math.PI * 1.5 && (h -= Math.PI), r.setTextConfig({
    rotation: h
  });
}
function Va(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function Ga(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function jx(r, t, e) {
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
var dl = Math.max, pl = Math.min;
function Jx(r, t) {
  var e = r.getArea && r.getArea();
  if (zh(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var tT = (
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
      ls(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, h = u.getBaseAxis(), f;
      u.type === "cartesian2d" ? f = h.isHorizontal() : u.type === "polar" && (f = h.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, c = eT(e, u);
      c && this._enableRealtimeSort(c, s, n);
      var d = e.get("clip", !0) || c, y = Jx(u, s);
      o.removeClipPath();
      var p = e.get("roundCap", !0), g = e.get("showBackground", !0), m = e.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, S = [], b = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function C(T) {
        var P = Wa[u.type](s, T), L = lT(u, f, P);
        return L.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? L.setShape("r", _) : L.setShape("cornerRadius", _), S[T] = L, L;
      }
      s.diff(l).add(function(T) {
        var P = s.getItemModel(T), L = Wa[u.type](s, T, P);
        if (g && C(T), !(!s.hasValue(T) || !yv[u.type](L))) {
          var I = !1;
          d && (I = vv[u.type](y, L));
          var E = dv[u.type](e, s, T, L, f, v, h.model, !1, p);
          c && (E.forceLabelAnimation = !0), mv(E, s, T, P, L, e, f, u.type === "polar"), w ? E.attr({
            shape: L
          }) : c ? pv(c, v, E, L, T, f, !1, !1) : Ze(E, {
            shape: L
          }, e, T), s.setItemGraphicEl(T, E), o.add(E), E.ignore = I;
        }
      }).update(function(T, P) {
        var L = s.getItemModel(T), I = Wa[u.type](s, T, L);
        if (g) {
          var E = void 0;
          b.length === 0 ? E = C(P) : (E = b[P], E.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? E.setShape("r", _) : E.setShape("cornerRadius", _), S[T] = E);
          var R = Wa[u.type](s, T), z = xy(f, R, u);
          le(E, {
            shape: z
          }, v, T);
        }
        var k = l.getItemGraphicEl(P);
        if (!s.hasValue(T) || !yv[u.type](I)) {
          o.remove(k);
          return;
        }
        var N = !1;
        if (d && (N = vv[u.type](y, I), N && o.remove(k)), k ? lg(k) : k = dv[u.type](e, s, T, I, f, v, h.model, !!k, p), c && (k.forceLabelAnimation = !0), x) {
          var V = k.getTextContent();
          if (V) {
            var Z = fs(V);
            Z.prevValue != null && (Z.prevValue = Z.value);
          }
        } else
          mv(k, s, T, L, I, e, f, u.type === "polar");
        w ? k.attr({
          shape: I
        }) : c ? pv(c, v, k, I, T, f, !0, x) : le(k, {
          shape: I
        }, e, T, null), s.setItemGraphicEl(T, k), k.ignore = N, o.add(k);
      }).remove(function(T) {
        var P = l.getItemGraphicEl(T);
        P && fu(P, e, T);
      }).execute();
      var A = this._backgroundGroup || (this._backgroundGroup = new kt());
      A.removeAll();
      for (var D = 0; D < S.length; ++D)
        A.add(S[D]);
      o.add(A), this._backgroundEls = S, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Sv(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Sv(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && Mx(e.coordinateSystem, !1, e), n = this.group;
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
        ordinalNumbers: G(a, function(o) {
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
        fu(a, e, ot(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(ye)
), vv = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = dl(t.x, r.x), s = pl(t.x + t.width, n), l = dl(t.y, r.y), u = pl(t.y + t.height, a), h = s < o, f = u < l;
    return t.x = h && o > n ? s : o, t.y = f && l > a ? u : l, t.width = h ? 0 : s - o, t.height = f ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), h || f;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = pl(t.r, r.r), a = dl(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, dv = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new Pt({
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
    var u = !n && l ? cv : Zi, h = new u({
      shape: i,
      z2: 1
    });
    h.name = "item";
    var f = by(n);
    if (h.calculateTextPosition = Kx(f, {
      isRoundCap: u === cv
    }), a) {
      var v = h.shape, c = n ? "r" : "endAngle", d = {};
      v[c] = n ? i.r0 : i.startAngle, d[c] = i[c], (s ? le : Ze)(h, {
        shape: d
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function eT(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function pv(r, t, e, i, n, a, o, s) {
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
  }), s || (o ? le : Ze)(e, {
    shape: l
  }, t, n, null);
  var h = t ? r.baseAxis.model : null;
  (o ? le : Ze)(e, {
    shape: u
  }, h, n);
}
function gv(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var rT = ["x", "y", "width", "height"], iT = ["cx", "cy", "r", "startAngle", "endAngle"], yv = {
  cartesian2d: function(r) {
    return !gv(r, rT);
  },
  polar: function(r) {
    return !gv(r, iT);
  }
}, Wa = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? aT(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
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
function nT(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function by(r) {
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
function mv(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = r.shape, f = jx(i.getModel("itemStyle"), h);
      O(h, f), r.setShape(h);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var c = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", d = hs(i);
  xh(r, d, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: Bh(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c
  });
  var y = r.getTextContent();
  if (s && y) {
    var p = i.get(["label", "position"]);
    r.textConfig.inside = p === "middle" ? !0 : null, Qx(r, p === "outside" ? c : p, by(o), i.get(["label", "rotate"]));
  }
  aw(y, d, a.getRawValue(e), function(m) {
    return oy(t, m);
  });
  var g = i.getModel(["emphasis"]);
  Oo(r, g.get("focus"), g.get("blurScope"), g.get("disabled")), su(r, i), nT(n) && (r.style.fill = "none", r.style.stroke = "none", M(r.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function aT(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var oT = (
  /** @class */
  /* @__PURE__ */ function() {
    function r() {
    }
    return r;
  }()
), _v = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new oT();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < n.length; h += 3)
        l[a] = u, l[o] = n[h + 2], s[a] = n[h + a], s[o] = n[h + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(nt)
);
function Sv(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new _v({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), e && e.push(h);
  }
  var f = new _v({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  f.baseDimIdx = a, f.largeDataIndices = o, f.barWidth = s, t.add(f), f.useStyle(n.getVisual("style")), f.style.stroke = null, ot(f).seriesIndex = r.seriesIndex, r.get("silent") || (f.on("mousedown", wv), f.on("mousemove", wv)), e && e.push(f);
}
var wv = Vh(function(r) {
  var t = this, e = sT(t, r.offsetX, r.offsetY);
  ot(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function sT(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, h = 0, f = a.length / 3; h < f; h++) {
    var v = h * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function xy(r, t, e) {
  if (zh(e, "cartesian2d")) {
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
function lT(r, t, e) {
  var i = r.type === "polar" ? Zi : Pt;
  return new i({
    shape: xy(t, e, r),
    silent: !0,
    z2: 0
  });
}
function uT(r) {
  r.registerChartView(tT), r.registerSeriesModel(Zx), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, qt(Ux, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, Yx("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, py("bar")), r.registerAction({
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
function _i(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var f = o.getData(), v = ai(f, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: F(v) ? f.getName(v[0]) : f.getName(v),
          selected: $(l) ? l : O({}, l)
        });
      }
  });
}
function hT(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (_i("map", "selectchanged", t, n, i), _i("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (_i("map", "selected", t, n, i), _i("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (_i("map", "unselected", t, n, i), _i("pie", "unselected", t, n, i));
  });
}
function fT(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new No(o, a) : null;
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
function cT(r) {
  var t = [];
  r.sort(function(y, p) {
    return p.priority - y.priority;
  });
  var e = new rt(0, 0, 0, 0);
  function i(y) {
    if (!y.ignore) {
      var p = y.ensureState("emphasis");
      p.ignore == null && (p.ignore = !1);
    }
    y.ignore = !0;
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
        if (d.obb || (d.obb = new No(d.localRect, d.transform)), f || (f = new No(s, l)), f.intersect(d.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), h && i(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var Si = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), vT = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Si(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new Si(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new Si(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Si(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new Si(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Si(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), dT = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, gl = [], pT = W.browser.firefox && +W.browser.version.split(".")[0] < 39;
function Cu(r, t, e, i) {
  return e = e || {}, i ? bv(r, t, e) : pT && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : bv(r, t, e), e;
}
function bv(r, t, e) {
  if (W.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Ng(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (gu(gl, r, i, n)) {
      e.zrX = gl[0], e.zrY = gl[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function Gh(r) {
  return r || window.event;
}
function te(r, t, e) {
  if (t = Gh(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Cu(r, o, t, e);
  } else {
    Cu(r, t, t, e);
    var a = gT(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && dT.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function gT(r) {
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
function mT(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Ty = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, _T = function() {
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
        var l = n[o], u = Cu(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in yl)
      if (yl.hasOwnProperty(e)) {
        var i = yl[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function xv(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function ST(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var yl = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = xv(i) / xv(n);
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
}, Cy = "silent";
function wT(r, t, e) {
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
    stop: bT
  };
}
function bT() {
  Ty(this.event);
}
var xT = function(r) {
  B(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(ke), cn = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), TT = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], ml = new rt(0, 0, 0, 0), My = function(r) {
  B(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new cn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new xT(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new vT(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (M(TT, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = Ay(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new cn(i, n) : this.findHover(i, n), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new cn(0, 0);
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
      for (var o = "on" + i, s = wT(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new cn(e, i);
    if (Tv(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new rt(e - u, i - u, l, l), f = a.length - 1; f >= 0; f--) {
        var v = a[f];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (ml.copy(v.getBoundingRect()), v.transform && ml.applyTransform(v.transform), ml.intersect(h) && s.push(v));
      }
      if (s.length)
        for (var c = 4, d = Math.PI / 12, y = Math.PI * 2, p = 0; p < u; p += c)
          for (var g = 0; g < y; g += d) {
            var m = e + p * Math.cos(g), _ = i + p * Math.sin(g);
            if (Tv(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new _T());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new cn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(ke);
M(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  My.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = Ay(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || m_(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function CT(r, t, e) {
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
    return n ? Cy : !0;
  }
  return !1;
}
function Tv(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = CT(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Cy)) {
      t.target = o;
      break;
    }
  }
}
function Ay(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Dy = 32, vn = 7;
function MT(r) {
  for (var t = 0; r >= Dy; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function Cv(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    AT(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function AT(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function Mv(r, t, e, i, n) {
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
function _l(r, t, e, i, n, a) {
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
function Sl(r, t, e, i, n, a) {
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
function DT(r, t) {
  var e = vn, i, n, a = 0, o = [];
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
    var d = i[c], y = n[c], p = i[c + 1], g = n[c + 1];
    n[c] = y + g, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var m = Sl(r[p], r, d, y, 0, t);
    d += m, y -= m, y !== 0 && (g = _l(r[d + y - 1], r, p, g, g - 1, t), g !== 0 && (y <= g ? f(d, y, p, g) : v(d, y, p, g)));
  }
  function f(c, d, y, p) {
    var g = 0;
    for (g = 0; g < d; g++)
      o[g] = r[c + g];
    var m = 0, _ = y, S = c;
    if (r[S++] = r[_++], --p === 0) {
      for (g = 0; g < d; g++)
        r[S + g] = o[m + g];
      return;
    }
    if (d === 1) {
      for (g = 0; g < p; g++)
        r[S + g] = r[_ + g];
      r[S + p] = o[m];
      return;
    }
    for (var b = e, w, x, C; ; ) {
      w = 0, x = 0, C = !1;
      do
        if (t(r[_], o[m]) < 0) {
          if (r[S++] = r[_++], x++, w = 0, --p === 0) {
            C = !0;
            break;
          }
        } else if (r[S++] = o[m++], w++, x = 0, --d === 1) {
          C = !0;
          break;
        }
      while ((w | x) < b);
      if (C)
        break;
      do {
        if (w = Sl(r[_], o, m, d, 0, t), w !== 0) {
          for (g = 0; g < w; g++)
            r[S + g] = o[m + g];
          if (S += w, m += w, d -= w, d <= 1) {
            C = !0;
            break;
          }
        }
        if (r[S++] = r[_++], --p === 0) {
          C = !0;
          break;
        }
        if (x = _l(o[m], r, _, p, 0, t), x !== 0) {
          for (g = 0; g < x; g++)
            r[S + g] = r[_ + g];
          if (S += x, _ += x, p -= x, p === 0) {
            C = !0;
            break;
          }
        }
        if (r[S++] = o[m++], --d === 1) {
          C = !0;
          break;
        }
        b--;
      } while (w >= vn || x >= vn);
      if (C)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (e = b, e < 1 && (e = 1), d === 1) {
      for (g = 0; g < p; g++)
        r[S + g] = r[_ + g];
      r[S + p] = o[m];
    } else {
      if (d === 0)
        throw new Error();
      for (g = 0; g < d; g++)
        r[S + g] = o[m + g];
    }
  }
  function v(c, d, y, p) {
    var g = 0;
    for (g = 0; g < p; g++)
      o[g] = r[y + g];
    var m = c + d - 1, _ = p - 1, S = y + p - 1, b = 0, w = 0;
    if (r[S--] = r[m--], --d === 0) {
      for (b = S - (p - 1), g = 0; g < p; g++)
        r[b + g] = o[g];
      return;
    }
    if (p === 1) {
      for (S -= d, m -= d, w = S + 1, b = m + 1, g = d - 1; g >= 0; g--)
        r[w + g] = r[b + g];
      r[S] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var C = 0, A = 0, D = !1;
      do
        if (t(o[_], r[m]) < 0) {
          if (r[S--] = r[m--], C++, A = 0, --d === 0) {
            D = !0;
            break;
          }
        } else if (r[S--] = o[_--], A++, C = 0, --p === 1) {
          D = !0;
          break;
        }
      while ((C | A) < x);
      if (D)
        break;
      do {
        if (C = d - Sl(o[_], r, c, d, d - 1, t), C !== 0) {
          for (S -= C, m -= C, d -= C, w = S + 1, b = m + 1, g = C - 1; g >= 0; g--)
            r[w + g] = r[b + g];
          if (d === 0) {
            D = !0;
            break;
          }
        }
        if (r[S--] = o[_--], --p === 1) {
          D = !0;
          break;
        }
        if (A = p - _l(r[m], o, 0, p, p - 1, t), A !== 0) {
          for (S -= A, _ -= A, p -= A, w = S + 1, b = _ + 1, g = 0; g < A; g++)
            r[w + g] = o[b + g];
          if (p <= 1) {
            D = !0;
            break;
          }
        }
        if (r[S--] = r[m--], --d === 0) {
          D = !0;
          break;
        }
        x--;
      } while (C >= vn || A >= vn);
      if (D)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), p === 1) {
      for (S -= d, m -= d, w = S + 1, b = m + 1, g = d - 1; g >= 0; g--)
        r[w + g] = r[b + g];
      r[S] = o[_];
    } else {
      if (p === 0)
        throw new Error();
      for (b = S - (p - 1), g = 0; g < p; g++)
        r[b + g] = o[g];
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
    if (n < Dy) {
      a = Cv(r, e, i, t), Mv(r, e, i, e + a, t);
      return;
    }
    var o = DT(r, t), s = MT(n);
    do {
      if (a = Cv(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), Mv(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Av = !1;
function wl() {
  Av || (Av = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Dv(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var PT = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Dv;
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
    i.length = this._displayListLen, go(i, Dv);
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
          t.__dirty && (u.__dirty |= Zt), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var h = t;
        e && e.length ? h.__clipPaths = e : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (wl(), h.z = 0), isNaN(h.z2) && (wl(), h.z2 = 0), isNaN(h.zlevel) && (wl(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
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
    var n = ht(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
}(), Vo;
Vo = W.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
function Pi() {
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
    for (var i = Pi() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (Vo(i), !e._paused && e.update());
    }
    Vo(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Pi(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Pi(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Pi() - this._pauseStart, this._paused = !1);
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
    var n = new sh(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(ke), IT = 300, bl = W.domSupported, xl = function() {
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
}(), Pv = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Lv = !1;
function Mu(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function ET(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function Tl(r) {
  r && (r.zrByTouch = !0);
}
function RT(r, t) {
  return te(r.dom, new kT(r, t), !0);
}
function Py(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var kT = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Vt, this.stopImmediatePropagation = Vt, this.preventDefault = Vt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), de = {
  mousedown: function(r) {
    r = te(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = te(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = te(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = te(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    Py(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    Lv = !0, r = te(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    Lv || (r = te(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = te(this.dom, r), Tl(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), de.mousemove.call(this, r), de.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = te(this.dom, r), Tl(r), this.handler.processGesture(r, "change"), de.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = te(this.dom, r), Tl(r), this.handler.processGesture(r, "end"), de.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < IT && de.click.call(this, r);
  },
  pointerdown: function(r) {
    de.mousedown.call(this, r);
  },
  pointermove: function(r) {
    Mu(r) || de.mousemove.call(this, r);
  },
  pointerup: function(r) {
    de.mouseup.call(this, r);
  },
  pointerout: function(r) {
    Mu(r) || de.mouseout.call(this, r);
  }
};
M(["click", "dblclick", "contextmenu"], function(r) {
  de[r] = function(t) {
    t = te(this.dom, t), this.trigger(r, t);
  };
});
var Au = {
  pointermove: function(r) {
    Mu(r) || Au.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Au.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function OT(r, t) {
  var e = t.domHandlers;
  W.pointerEventsSupported ? M(xl.pointer, function(i) {
    yo(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (W.touchEventsSupported && M(xl.touch, function(i) {
    yo(t, i, function(n) {
      e[i].call(r, n), ET(t);
    });
  }), M(xl.mouse, function(i) {
    yo(t, i, function(n) {
      n = Gh(n), t.touching || e[i].call(r, n);
    });
  }));
}
function NT(r, t) {
  W.pointerEventsSupported ? M(Pv.pointer, e) : W.touchEventsSupported || M(Pv.mouse, e);
  function e(i) {
    function n(a) {
      a = Gh(a), Py(r, a.target) || (a = RT(r, a), t.domHandlers[i].call(r, a));
    }
    yo(t, i, n, { capture: !0 });
  }
}
function yo(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, yT(r.domTarget, t, e, i);
}
function Cl(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && mT(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var Iv = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), BT = function(r) {
  B(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new Iv(e, de), bl && (n._globalHandlerScope = new Iv(document, Au)), OT(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    Cl(this._localHandlerScope), bl && Cl(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, bl && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? NT(this, i) : Cl(i);
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
var mo = {}, Ly = {};
function FT(r) {
  delete Ly[r];
}
function $T(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return Do(r, 1) < tu;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += Do(t[n].color, 1);
    return e /= i, e < tu;
  }
  return !1;
}
var zT = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new PT(), o = i.renderer || "canvas";
    mo[o] || (o = ct(mo)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new mo[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !W.node && !W.worker && !l ? new BT(s.getViewportRoot(), s.root) : null, h = i.useCoarsePointer, f = h == null || h === "auto" ? W.touchEventsSupported : !!h, v = 44, c;
    f && (c = K(i.pointerSize, v)), this.handler = new My(a, s, u, s.root, c), this.animation = new LT({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = $T(t));
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
    var e, i = Pi();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Pi();
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
        t[e] instanceof kt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, FT(this.id));
  }, r;
}();
function Ev(r, t) {
  var e = new zT(fp(), r, t);
  return Ly[e.id] = e, e;
}
function HT(r, t) {
  mo[r] = t;
}
var Iy = "";
typeof navigator < "u" && (Iy = navigator.platform || "");
var wi = "rgba(0, 0, 0, 0.2)";
const VT = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: wi,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: wi,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: wi,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: wi,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: wi,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: wi,
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
    fontFamily: Iy.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var GT = q();
function WT(r, t, e) {
  var i = GT.get(t);
  if (!i)
    return e;
  var n = i(r);
  return n ? e.concat(n) : e;
}
var Ua, dn, Rv, kv = "\0_ec_inner", UT = 1, Wh = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new yt(a), this._locale = new yt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      var a = Bv(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, Bv(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        !this.option || e === "recreate" ? Rv(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!e || e === "recreate" || e === "media") {
        var l = a.getMediaOption(this);
        l.length && M(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(e) {
      this._mergeOption(e, null);
    }, t.prototype._mergeOption = function(e, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = q(), u = i && i.replaceMergeMainTypeMap;
      vw(this), M(e, function(f, v) {
        f != null && (lt.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? J(f) : it(n[v], f, !0));
      }), u && u.each(function(f, v) {
        lt.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), lt.topologicalTravel(s, lt.getAllClassMainTypes(), h, this);
      function h(f) {
        var v = WT(this, f, Rt(e[f])), c = a.get(f), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          c ? u && u.get(f) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), y = P1(c, v, d);
        N1(y, f, lt), n[f] = null, a.set(f, null), o.set(f, 0);
        var p = [], g = [], m = 0, _;
        M(y, function(S, b) {
          var w = S.existing, x = S.newOption;
          if (!x)
            w && (w.mergeOption({}, this), w.optionUpdated({}, !1));
          else {
            var C = f === "series", A = lt.getClass(
              f,
              S.keyInfo.subType,
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
              w.name = S.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              var D = O({
                componentIndex: b
              }, S.keyInfo);
              w = new A(x, this, this, D), O(w, D), S.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (p.push(w.option), g.push(w), m++) : (p.push(void 0), g.push(void 0));
        }, this), n[f] = p, a.set(f, g), o.set(f, m), f === "series" && Ua(this);
      }
      this._seriesIndices || Ua(this);
    }, t.prototype.getOption = function() {
      var e = J(this.option);
      return M(e, function(i, n) {
        if (lt.hasClass(n)) {
          for (var a = Rt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Zn(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[kv], e;
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
      return n != null ? (l = [], M(Rt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Ov("id", a, s) : o != null ? l = Ov("name", o, s) : l = Dt(s, function(u) {
        return !!u;
      }), Nv(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : Dt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Nv(o, e));
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
      if (X(e)) {
        var o = i, s = e;
        a.each(function(f, v) {
          for (var c = 0; f && c < f.length; c++) {
            var d = f[c];
            d && s.call(o, v, d, d.componentIndex);
          }
        });
      } else
        for (var l = $(e) ? a.get(e) : H(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && i.call(n, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Pe(e, null);
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
      dn(this), M(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      M(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      dn(this), M(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return M(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return dn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      dn(this);
      var n = [];
      M(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = q(n);
    }, t.prototype.restoreData = function(e) {
      Ua(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        lt.hasClass(o) && n.push(o);
      }), lt.topologicalTravel(n, lt.getAllClassMainTypes(), function(a) {
        M(i.get(a), function(o) {
          o && (a !== "series" || !YT(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      Ua = function(e) {
        var i = e._seriesIndices = [];
        M(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = q(i);
      }, dn = function(e) {
      }, Rv = function(e, i) {
        e.option = {}, e.option[kv] = UT, e._componentsMap = q({
          series: []
        }), e._componentsCount = q();
        var n = i.aria;
        H(n) && n.enabled == null && (n.enabled = !0), XT(i, e._theme.option), it(i, VT, !1), e._mergeOption(i, null);
      };
    }(), t;
  }(yt)
);
function YT(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function XT(r, t) {
  var e = r.color && !r.colorLayer;
  M(t, function(i, n) {
    n === "colorLayer" && e || lt.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? it(r[n], i, !1) : J(i) : r[n] == null && (r[n] = i));
  });
}
function Ov(r, t, e) {
  if (F(t)) {
    var i = q();
    return M(t, function(a) {
      if (a != null) {
        var o = Pe(a, null);
        o != null && i.set(a, !0);
      }
    }), Dt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Pe(t, null);
    return Dt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function Nv(r, t) {
  return t.hasOwnProperty("subType") ? Dt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function Bv(r) {
  var t = q();
  return r && M(Rt(r.replaceMerge), function(e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Re(Wh, Oh);
var ZT = [
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
], Ey = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(t) {
      M(ZT, function(e) {
        this[e] = dt(t[e], t);
      }, this);
    }
    return r;
  }()
), qT = /^(min|max)?(.+)$/, KT = (
  /** @class */
  function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (M(Rt(t.series), function(o) {
        o && o.data && Wt(o.data) && Ul(o.data);
      }), M(Rt(t.dataset), function(o) {
        o && o.source && Wt(o.source) && Ul(o.source);
      })), t = J(t);
      var n = this._optionBackup, a = QT(t, e, !n);
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
        jT(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !tC(o, this._currentMediaIndices) && (s = G(o, function(h) {
        return J(h === -1 ? a.option : n[h].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  }()
);
function QT(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, h = !!r.media, f = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((f || h) && (r.options = r.media = null), a = r), h && F(u) && M(u, function(c) {
    c && c.option && (c.query ? i.push(c) : n || (n = c));
  }), v(a), M(l, function(c) {
    return v(c);
  }), M(i, function(c) {
    return v(c.option);
  });
  function v(c) {
    M(t, function(d) {
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
function jT(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return M(r, function(a, o) {
    var s = o.match(qT);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      JT(i[u], a, l) || (n = !1);
    }
  }), n;
}
function JT(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function tC(r, t) {
  return r.join(",") === t.join(",");
}
var fe = M, ra = H, Fv = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Ml(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = Fv.length; e < i; e++) {
      var n = Fv[e], a = t.normal, o = t.emphasis;
      a && a[n] && (r[n] = r[n] || {}, r[n].normal ? it(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (r[n] = r[n] || {}, r[n].emphasis ? it(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function At(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (e ? (r[t].normal = r[t].emphasis = null, st(r[t], i)) : r[t] = i), n && (r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function Cn(r) {
  At(r, "itemStyle"), At(r, "lineStyle"), At(r, "areaStyle"), At(r, "label"), At(r, "labelLine"), At(r, "upperLabel"), At(r, "edgeLabel");
}
function gt(r, t) {
  var e = ra(r) && r[t], i = ra(e) && e.textStyle;
  if (i)
    for (var n = 0, a = ac.length; n < a; n++) {
      var o = ac[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
}
function ee(r) {
  r && (Cn(r), gt(r, "label"), r.emphasis && gt(r.emphasis, "label"));
}
function eC(r) {
  if (ra(r)) {
    Ml(r), Cn(r), gt(r, "label"), gt(r, "upperLabel"), gt(r, "edgeLabel"), r.emphasis && (gt(r.emphasis, "label"), gt(r.emphasis, "upperLabel"), gt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (Ml(t), ee(t));
    var e = r.markLine;
    e && (Ml(e), ee(e));
    var i = r.markArea;
    i && ee(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !Wt(a))
        for (var o = 0; o < a.length; o++)
          ee(a[o]);
      M(r.categories, function(u) {
        Cn(u);
      });
    }
    if (n && !Wt(n))
      for (var o = 0; o < n.length; o++)
        ee(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ee(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        F(l[o]) ? (ee(l[o][0]), ee(l[o][1])) : ee(l[o]);
    r.type === "gauge" ? (gt(r, "axisLabel"), gt(r, "title"), gt(r, "detail")) : r.type === "treemap" ? (At(r.breadcrumb, "itemStyle"), M(r.levels, function(u) {
      Cn(u);
    })) : r.type === "tree" && Cn(r.leaves);
  }
}
function Fe(r) {
  return F(r) ? r : r ? [r] : [];
}
function $v(r) {
  return (F(r) ? r[0] : r) || {};
}
function rC(r, t) {
  fe(Fe(r.series), function(i) {
    ra(i) && eC(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), fe(e, function(i) {
    fe(Fe(r[i]), function(n) {
      n && (gt(n, "axisLabel"), gt(n.axisPointer, "label"));
    });
  }), fe(Fe(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    gt(n, "axisLabel"), gt(n && n.axisPointer, "label");
  }), fe(Fe(r.calendar), function(i) {
    At(i, "itemStyle"), gt(i, "dayLabel"), gt(i, "monthLabel"), gt(i, "yearLabel");
  }), fe(Fe(r.radar), function(i) {
    gt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), fe(Fe(r.geo), function(i) {
    ra(i) && (ee(i), fe(Fe(i.regions), function(n) {
      ee(n);
    }));
  }), fe(Fe(r.timeline), function(i) {
    ee(i), At(i, "label"), At(i, "itemStyle"), At(i, "controlStyle", !0);
    var n = i.data;
    F(n) && M(n, function(a) {
      H(a) && (At(a, "label"), At(a, "itemStyle"));
    });
  }), fe(Fe(r.toolbox), function(i) {
    At(i, "iconStyle"), fe(i.feature, function(n) {
      At(n, "iconStyle");
    });
  }), gt($v(r.axisPointer), "label"), gt($v(r.tooltip).axisPointer, "label");
}
function iC(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function nC(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function zv(r) {
  r && M(aC, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var aC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], oC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Al = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function pn(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < Al.length; e++) {
      var i = Al[e][1], n = Al[e][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function Hv(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (r.edgeDistance = r.margin);
}
function Vv(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay);
}
function sC(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (r.emphasis.focus = "adjacency"));
}
function Ry(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && Ry(r[e].children, t);
}
function ky(r, t) {
  rC(r, t), r.series = Rt(r.series), M(r.series, function(e) {
    if (H(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise), Hv(e.label);
        var n = e.data;
        if (n && !Wt(n))
          for (var a = 0; a < n.length; a++)
            Hv(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = iC(e, "pointer.color");
        o != null && nC(e, "itemStyle.color", o);
      } else if (i === "bar") {
        pn(e), pn(e.backgroundStyle), pn(e.emphasis);
        var n = e.data;
        if (n && !Wt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (pn(n[a]), pn(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s)), Vv(e), Ry(e.data, Vv);
      } else i === "graph" || i === "sankey" ? sC(e) : i === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && st(e, e.mapLocation));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), zv(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), M(oC, function(e) {
    var i = r[e];
    i && (F(i) || (i = [i]), M(i, function(n) {
      zv(n);
    }));
  });
}
function lC(r) {
  var t = q();
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
  }), t.each(uC);
}
function uC(r) {
  M(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, f) {
      var v = o.get(t.stackedDimension, f);
      if (isNaN(v))
        return n;
      var c, d;
      s ? d = o.getRawIndex(f) : c = o.get(t.stackedByDimension, f);
      for (var y = NaN, p = e - 1; p >= 0; p--) {
        var g = r[p];
        if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {
          var m = g.data.getByRawIndex(g.stackResultDimension, d);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = x1(v, m), y = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = y, i;
    });
  });
}
var qe = (
  /** @class */
  function() {
    function r() {
      this.group = new kt(), this.uid = ds("viewComponent");
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
Ju(qe);
Jo(qe);
var Gv = _t(), Wv = {
  itemStyle: Yn(gg, !0),
  lineStyle: Yn(pg, !0)
}, hC = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function Oy(r, t) {
  var e = r.visualStyleMapper || Wv[t];
  return e || (console.warn("Unknown style type '" + t + "'."), Wv.itemStyle);
}
function Ny(r, t) {
  var e = r.visualDrawType || hC[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var fC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = Oy(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = Ny(r, i), u = o[l], h = X(u) ? u : null, f = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || h || f) {
      var v = r.getColorFromPalette(
        // TODO series count changed.
        r.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, e.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || X(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || X(o.stroke) ? v : o.stroke;
    }
    if (e.setVisual("style", o), e.setVisual("drawType", l), !t.isSeriesFiltered(r) && h)
      return e.setVisual("colorFromPalette", !1), {
        dataEach: function(c, d) {
          var y = r.getDataParams(d), p = O({}, o);
          p[l] = h(y), c.setItemVisual(d, "style", p);
        }
      };
  }
}, gn = new yt(), cC = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = Oy(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            gn.option = l[i];
            var u = n(gn), h = o.ensureUniqueItemVisual(s, "style");
            O(h, u), gn.option.decal && (o.setItemVisual(s, "decal", gn.option.decal), gn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, vC = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = q();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Gv(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Gv(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = Ny(e, s);
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
}, Ya = Math.PI;
function dC(r, t) {
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
  var e = new kt(), i = new Pt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new me({
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
  return t.showSpinner && (o = new ss({
    shape: {
      startAngle: -Ya / 2,
      endAngle: -Ya / 2 + 0.1,
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
    endAngle: Ya * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Ya * 3 / 2
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
var By = (
  /** @class */
  function() {
    function r(t, e, i, n) {
      this._stageTaskMap = q(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
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
      var e = this, i = e._pipelineMap = q();
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
      M(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        Ye(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
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
      M(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var h = o._stageTaskMap.get(l.uid), f = h.seriesTaskMap, v = h.overallTask;
          if (v) {
            var c, d = v.agentStubMap;
            d.each(function(p) {
              s(n, p) && (p.dirty(), c = !0);
            }), c && v.dirty(), o.updatePayload(v, i);
            var y = o.getPerformArgs(v, n.block);
            d.each(function(p) {
              p.perform(y);
            }), v.perform(y) && (a = !0);
          } else f && f.each(function(p, g) {
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
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = q(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : u && u(i, n).each(h);
      function h(f) {
        var v = f.uid, c = s.set(v, o && o.get(v) || Bn({
          plan: _C,
          reset: SC,
          count: bC
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
      var a = this, o = e.overallTask = e.overallTask || Bn({
        reset: pC
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = q(), u = t.seriesType, h = t.getTargetSeries, f = !0, v = !1, c = "";
      Ye(!t.createOnAllSeries, c), u ? i.eachRawSeriesByType(u, d) : h ? h(i, n).each(d) : (f = !1, M(i.getSeries(), d));
      function d(y) {
        var p = y.uid, g = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, Bn({
          reset: gC,
          onDirty: mC
        })));
        g.context = {
          model: y,
          overallProgress: f
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, g.agent = o, g.__block = f, a._pipe(y, g);
      }
      v && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return X(t) && (t = {
        overallReset: t,
        seriesType: xC(t)
      }), t.uid = ds("stageHandler"), e && (t.visualType = e), t;
    }, r;
  }()
);
function pC(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function gC(r) {
  return r.overallProgress && yC;
}
function yC() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function mC() {
  this.agent && this.agent.dirty();
}
function _C(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function SC(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Rt(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? G(t, function(e, i) {
    return Fy(i);
  }) : wC;
}
var wC = Fy(0);
function Fy(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function bC(r) {
  return r.data.count();
}
function xC(r) {
  Go = null;
  try {
    r(ia, $y);
  } catch {
  }
  return Go;
}
var ia = {}, $y = {}, Go;
zy(ia, Wh);
zy($y, Ey);
ia.eachSeriesByType = ia.eachRawSeriesByType = function(r) {
  Go = r;
};
ia.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Go = r.subType);
};
function zy(r, t) {
  for (var e in t.prototype)
    r[e] = Vt;
}
var Uv = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const TC = {
  color: Uv,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Uv]
};
var Tt = "#B9B8CE", Yv = "#100C2A", Xa = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Tt
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
}, Xv = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], Hy = {
  darkMode: !0,
  color: Xv,
  backgroundColor: Yv,
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
      color: Tt
    },
    pageTextStyle: {
      color: Tt
    }
  },
  textStyle: {
    color: Tt
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
      borderColor: Tt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Tt
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
      color: Tt
    }
  },
  timeline: {
    lineStyle: {
      color: Tt
    },
    label: {
      color: Tt
    },
    controlStyle: {
      color: Tt,
      borderColor: Tt
    }
  },
  calendar: {
    itemStyle: {
      color: Yv
    },
    dayLabel: {
      color: Tt
    },
    monthLabel: {
      color: Tt
    },
    yearLabel: {
      color: Tt
    }
  },
  timeAxis: Xa(),
  logAxis: Xa(),
  valueAxis: Xa(),
  categoryAxis: Xa(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: Xv
  },
  gauge: {
    title: {
      color: Tt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Tt
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
Hy.categoryAxis.splitLine.show = !1;
var CC = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if ($(t)) {
        var a = Ae(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        M(t, function(l, u) {
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
), Du = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Zv = Du.concat(["symbolKeepAspect"]), MC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Du.length; o++) {
      var s = Du[o], l = r.get(s);
      X(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(O({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = ct(n);
    function h(f, v) {
      for (var c = r.getRawValue(v), d = r.getDataParams(v), y = 0; y < u.length; y++) {
        var p = u[y];
        f.setItemVisual(v, p, n[p](c, d));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, AC = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < Zv.length; s++) {
        var l = Zv[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function DC(r, t, e) {
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
function PC(r, t) {
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
function Mn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var LC = Math.round(Math.random() * 9), IC = typeof Object.defineProperty == "function", EC = function() {
  function r() {
    this._id = "__ec_inner_" + LC++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return IC ? Object.defineProperty(i, this._id, {
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
function RC(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = Qr(i) ? i : 0, n = Qr(n) ? n : 1, a = Qr(a) ? a : 0, o = Qr(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function kC(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = Qr(o) ? o : 0.5, s = Qr(s) ? s : 0.5, l = l >= 0 && Qr(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Pu(r, t, e) {
  for (var i = t.type === "radial" ? kC(r, t, e) : RC(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function OC(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function Za(r) {
  return parseInt(r, 10);
}
function qa(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || Za(s[i]) || Za(r.style[i])) - (Za(s[a]) || 0) - (Za(s[o]) || 0) | 0;
}
function NC(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : vt(r) ? [r] : F(r) ? r : null;
}
function Vy(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && NC(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = G(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var BC = new ni(!0);
function Wo(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function qv(r) {
  return typeof r == "string" && r !== "none";
}
function Uo(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function Kv(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function Qv(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Lu(r, t, e) {
  var i = _p(t.image, t.__image, e);
  if (ts(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * $0), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function FC(r, t, e, i) {
  var n, a = Wo(e), o = Uo(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || BC, f = t.__dirty;
  if (!i) {
    var v = e.fill, c = e.stroke, d = o && !!v.colorStops, y = a && !!c.colorStops, p = o && !!v.image, g = a && !!c.image, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0;
    (d || y) && (w = t.getBoundingRect()), d && (m = f ? Pu(r, v, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), y && (_ = f ? Pu(r, c, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (S = f || !t.__canvasFillPattern ? Lu(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), g && (b = f || !t.__canvasStrokePattern ? Lu(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), d ? r.fillStyle = m : p && (S ? r.fillStyle = S : o = !1), y ? r.strokeStyle = _ : g && (b ? r.strokeStyle = b : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var C, A;
  r.setLineDash && e.lineDash && (n = Vy(t), C = n[0], A = n[1]);
  var D = !0;
  (u || f & Ci) && (h.setDPR(r.dpr), l ? h.setContext(null) : (h.setContext(r), D = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), D && h.rebuildPath(r, l ? s : 1), C && (r.setLineDash(C), r.lineDashOffset = A), i || (e.strokeFirst ? (a && Qv(r, e), o && Kv(r, e)) : (o && Kv(r, e), a && Qv(r, e))), C && r.setLineDash([]);
}
function $C(r, t, e) {
  var i = t.__image = _p(e.image, t.__image, t, t.onload);
  if (!(!i || !ts(i))) {
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
function zC(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || ii, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = Vy(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (Wo(e) && r.strokeText(n, e.x, e.y), Uo(e) && r.fillText(n, e.x, e.y)) : (Uo(e) && r.fillText(n, e.x, e.y), Wo(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var jv = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Jv = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Gy(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    Ht(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? Jr.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (Ht(r, n), a = !0), r.globalCompositeOperation = t.blend || Jr.blend);
  for (var s = 0; s < jv.length; s++) {
    var l = jv[s];
    (i || t[l] !== e[l]) && (a || (Ht(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (Ht(r, n), a = !0), r.shadowColor = t.shadowColor || Jr.shadowColor), a;
}
function td(r, t, e, i, n) {
  var a = na(t, n.inHover), o = i ? null : e && na(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = Gy(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Ht(r, n), s = !0), qv(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Ht(r, n), s = !0), qv(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Ht(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (Ht(r, n), s = !0), r.lineWidth = u);
  }
  for (var h = 0; h < Jv.length; h++) {
    var f = Jv[h], v = f[0];
    (i || a[v] !== o[v]) && (s || (Ht(r, n), s = !0), r[v] = a[v] || f[1]);
  }
  return s;
}
function HC(r, t, e, i, n) {
  return Gy(r, na(t, n.inHover), e && na(e, n.inHover), i, n);
}
function Wy(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function VC(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), Wy(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function GC(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var ed = 1, rd = 2, id = 3, nd = 4;
function WC(r) {
  var t = Uo(r), e = Wo(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function Ht(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function na(r, t) {
  return t && r.__hoverStyle || r.style;
}
function Uy(r, t) {
  jr(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function jr(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Zt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || OC(a, o)) && (o && o.length && (Ht(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (Ht(r, e), r.save(), VC(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var h = t instanceof nt && t.autoBatch && WC(t.style);
  s || GC(n, u.transform) ? (Ht(r, e), Wy(r, t)) : h || Ht(r, e);
  var f = na(t, e.inHover);
  t instanceof nt ? (e.lastDrawType !== ed && (l = !0, e.lastDrawType = ed), td(r, t, u, l, e), (!h || !e.batchFill && !e.batchStroke) && r.beginPath(), FC(r, t, f, h), h && (e.batchFill = f.fill || "", e.batchStroke = f.stroke || "")) : t instanceof Lo ? (e.lastDrawType !== id && (l = !0, e.lastDrawType = id), td(r, t, u, l, e), zC(r, t, f)) : t instanceof wr ? (e.lastDrawType !== rd && (l = !0, e.lastDrawType = rd), HC(r, t, u, l, e), $C(r, t, f)) : t.getTemporalDisplayables && (e.lastDrawType !== nd && (l = !0, e.lastDrawType = nd), UC(r, t, e)), h && i && Ht(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function UC(r, t, e) {
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
  for (var u = 0, h = n.length; u < h; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), jr(r, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Dl = new EC(), ad = new va(100), od = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function sd(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Dl.delete(r);
  var a = Dl.get(r);
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Dl.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var h = [e], f = !0, v = 0; v < od.length; ++v) {
      var c = o[od[v]];
      if (c != null && !F(c) && !$(c) && !vt(c) && typeof c != "boolean") {
        f = !1;
        break;
      }
      h.push(c);
    }
    var d;
    if (f) {
      d = h.join(",") + (n ? "-svg" : "");
      var y = ad.get(d);
      y && (n ? u.svgElement = y : u.image = y);
    }
    var p = Xy(o.dashArrayX), g = YC(o.dashArrayY), m = Yy(o.symbol), _ = XC(p), S = Zy(g), b = !n && Ui.createCanvas(), w = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = A(), C;
    b && (b.width = x.width * e, b.height = x.height * e, C = b.getContext("2d")), D(), f && ad.put(d, b || w), u.image = b, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function A() {
      for (var T = 1, P = 0, L = _.length; P < L; ++P)
        T = rc(T, _[P]);
      for (var I = 1, P = 0, L = m.length; P < L; ++P)
        I = rc(I, m[P].length);
      T *= I;
      var E = S * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(E, o.maxTileHeight))
      };
    }
    function D() {
      C && (C.clearRect(0, 0, b.width, b.height), o.backgroundColor && (C.fillStyle = o.backgroundColor, C.fillRect(0, 0, b.width, b.height)));
      for (var T = 0, P = 0; P < g.length; ++P)
        T += g[P];
      if (T <= 0)
        return;
      for (var L = -S, I = 0, E = 0, R = 0; L < x.height; ) {
        if (I % 2 === 0) {
          for (var z = E / 2 % m.length, k = 0, N = 0, V = 0; k < x.width * 2; ) {
            for (var Z = 0, P = 0; P < p[R].length; ++P)
              Z += p[R][P];
            if (Z <= 0)
              break;
            if (N % 2 === 0) {
              var Q = (1 - o.symbolSize) * 0.5, at = k + p[R][N] * Q, ft = L + g[I] * Q, pt = p[R][N] * o.symbolSize, he = g[I] * o.symbolSize, xr = V / 2 % m[z].length;
              li(at, ft, pt, he, m[z][xr]);
            }
            k += p[R][N], ++V, ++N, N === p[R].length && (N = 0);
          }
          ++R, R === p.length && (R = 0);
        }
        L += g[I], ++E, ++I, I === g.length && (I = 0);
      }
      function li(Yt, St, U, j, Tr) {
        var Lt = n ? 1 : e, af = ea(Tr, Yt * Lt, St * Lt, U * Lt, j * Lt, o.color, o.symbolKeepAspect);
        if (n) {
          var of = i.painter.renderOneToVNode(af);
          of && w.children.push(of);
        } else
          Uy(C, af);
      }
    }
  }
}
function Yy(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if ($(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!$(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return Yy([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    $(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function Xy(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (vt(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!vt(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return Xy([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (vt(r[i])) {
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
function YC(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (vt(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = G(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function XC(r) {
  return G(r, function(t) {
    return Zy(t);
  });
}
function Zy(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function ZC(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = sd(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = sd(n, t);
      }
    }
  });
}
var pe = new ke(), qy = {};
function qC(r, t) {
  qy[r] = t;
}
function KC(r) {
  return qy[r];
}
var QC = 1, jC = 800, JC = 900, tM = 1e3, eM = 2e3, rM = 5e3, Ky = 1e3, iM = 1100, Uh = 2e3, Qy = 3e3, nM = 4e3, Ss = 4500, aM = 4600, oM = 5e3, sM = 6e3, jy = 7e3, lM = {
  PROCESSOR: {
    FILTER: tM,
    SERIES_FILTER: jC,
    STATISTIC: rM
  },
  VISUAL: {
    LAYOUT: Ky,
    PROGRESSIVE_LAYOUT: iM,
    GLOBAL: Uh,
    CHART: Qy,
    POST_CHART_LAYOUT: aM,
    COMPONENT: nM,
    BRUSH: oM,
    CHART_ITEM: Ss,
    ARIA: sM,
    DECAL: jy
  }
}, xt = "__flagInMainProcess", Bt = "__pendingUpdate", Pl = "__needsUpdateStatus", ld = /^[a-zA-Z0-9_]+$/, Ll = "__connectUpdateStatus", ud = 0, uM = 1, hM = 2;
function Jy(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return em(this, r, t);
  };
}
function tm(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return em(this, r, t);
  };
}
function em(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), ke.prototype[t].apply(r, e);
}
var rm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  }(ke)
), im = rm.prototype;
im.on = tm("on");
im.off = tm("off");
var bi, Il, Ka, lr, El, Rl, kl, yn, mn, hd, fd, Ol, cd, Qa, vd, nm, Qt, dd, am = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e, i, n) {
      var a = r.call(this, new CC()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, $(i) && (i = om[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = Ev(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: K(n.useDirtyRect, l),
        useCoarsePointer: K(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = Vh(dt(u.flush, u), 17), i = J(i), i && ky(i, !0), a._theme = i, a._locale = hb(n.locale || Bg), a._coordSysMgr = new Mh();
      var h = a._api = vd(a);
      function f(v, c) {
        return v.__prio - c.__prio;
      }
      return go(Xo, f), go(Iu, f), a._scheduler = new By(a, h, Iu, Xo), a._messageCenter = new rm(), a._initEvents(), a.resize = dt(a.resize, a), u.animation.on("frame", a._onframe, a), hd(u, a), fd(u, a), Ul(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        dd(this);
        var e = this._scheduler;
        if (this[Bt]) {
          var i = this[Bt].silent;
          this[xt] = !0;
          try {
            bi(this), lr.update.call(this, null, this[Bt].updateParams);
          } catch (l) {
            throw this[xt] = !1, this[Bt] = null, l;
          }
          this._zr.flush(), this[xt] = !1, this[Bt] = null, yn.call(this, i), mn.call(this, i);
        } else if (e.unfinished) {
          var n = QC, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Rl(this, a), e.performVisualTasks(a), Qa(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
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
      if (!this[xt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (H(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[xt] = !0, !this._model || i) {
          var l = new KT(this._api), u = this._theme, h = this._model = new Wh();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(e, {
          replaceMerge: o
        }, Eu);
        var f = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Bt] = {
            silent: a,
            updateParams: f
          }, this[xt] = !1, this.getZr().wakeUp();
        else {
          try {
            bi(this), lr.update.call(this, null, f);
          } catch (v) {
            throw this[Bt] = null, this[xt] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Bt] = null, this[xt] = !1, yn.call(this, a), mn.call(this, a);
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
      return this._zr.painter.dpr || W.hasGlobalWindow && window.devicePixelRatio || 1;
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
      if (W.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return M(i, function(n) {
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
      M(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var h = o._componentsMap[u.__viewId];
          h.group.ignore || (a.push(h), h.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return M(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (pd[n]) {
        var l = s, u = s, h = -s, f = -s, v = [], c = e && e.pixelRatio || this.getDevicePixelRatio();
        M($n, function(_, S) {
          if (_.group === n) {
            var b = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(J(e)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), f = o(w.bottom, f), v.push({
              dom: b,
              left: w.left,
              top: w.top
            });
          }
        }), l *= c, u *= c, h *= c, f *= c;
        var d = h - l, y = f - u, p = Ui.createCanvas(), g = Ev(p, {
          renderer: i ? "svg" : "canvas"
        });
        if (g.resize({
          width: d,
          height: y
        }), i) {
          var m = "";
          return M(v, function(_) {
            var S = _.left - l, b = _.top - u;
            m += '<g transform="translate(' + S + "," + b + ')">' + _.dom + "</g>";
          }), g.painter.getSvgRoot().innerHTML = m, e.connectedBackgroundColor && g.painter.setBackgroundColor(e.connectedBackgroundColor), g.refreshImmediately(), g.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && g.add(new Pt({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: y
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), M(v, function(_) {
            var S = new wr({
              style: {
                x: _.left * c - l,
                y: _.top * c - u,
                image: _.dom
              }
            });
            g.add(S);
          }), g.refreshImmediately(), p.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return El(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return El(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = qs(n, e);
      return M(o, function(s, l) {
        l.indexOf("Models") >= 0 && M(s, function(u) {
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
      var n = this._model, a = qs(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? DC(s, l, i) : PC(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      M(fM, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && Mn(s, function(d) {
            var y = ot(d);
            if (y && y.dataIndex != null) {
              var p = y.dataModel || o.getSeriesByIndex(y.seriesIndex);
              return l = p && p.getDataParams(y.dataIndex, y.dataType, s) || {}, !0;
            } else if (y.eventData)
              return l = O({}, y.eventData), !0;
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
      }), M(Fn, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), M(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), hT(this._messageCenter, this, this._api);
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
      e && Wp(this.getDom(), Xh, "");
      var i = this, n = i._api, a = i._model;
      M(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), M(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete $n[i.id];
    }, t.prototype.resize = function(e) {
      if (!this[xt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(e);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = e && e.silent;
          this[Bt] && (a == null && (a = this[Bt].silent), n = !0, this[Bt] = null), this[xt] = !0;
          try {
            n && bi(this), lr.update.call(this, {
              type: "resize",
              animation: O({
                // Disable animation
                duration: 0
              }, e && e.animation)
            });
          } catch (o) {
            throw this[xt] = !1, o;
          }
          this[xt] = !1, yn.call(this, a), mn.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !!Ru[e]) {
        var n = Ru[e](this._api, i), a = this._zr;
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
      return i.type = Fn[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (H(i) || (i = {
        silent: !!i
      }), !!Yo[e.type] && this._model) {
        if (this[xt]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        kl.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && W.browser.weChat && this._throttledZrFlush(), yn.call(this, n), mn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      pe.trigger("series:layoutlabels", this._model, this._api, {
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
      bi = function(f) {
        var v = f._scheduler;
        v.restorePipelines(f._model), v.prepareStageTasks(), Il(f, !0), Il(f, !1), v.plan();
      }, Il = function(f, v) {
        for (var c = f._model, d = f._scheduler, y = v ? f._componentsViews : f._chartsViews, p = v ? f._componentsMap : f._chartsMap, g = f._zr, m = f._api, _ = 0; _ < y.length; _++)
          y[_].__alive = !1;
        v ? c.eachComponent(function(w, x) {
          w !== "series" && S(x);
        }) : c.eachSeries(S);
        function S(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var C = "_ec_" + w.id + "_" + w.type, A = !x && p[C];
          if (!A) {
            var D = Ae(w.type), T = v ? qe.getClass(D.main, D.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              ye.getClass(D.sub)
            );
            A = new T(), A.init(c, m), p[C] = A, y.push(A), g.add(A.group);
          }
          w.__viewId = A.__id = C, A.__alive = !0, A.__model = w, A.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !v && d.prepareView(A, w, c, m);
        }
        for (var _ = 0; _ < y.length; ) {
          var b = y[_];
          b.__alive ? _++ : (!v && b.renderTask.dispose(), g.remove(b.group), b.dispose(c, m), y.splice(_, 1), p[b.__id] === b && delete p[b.__id], b.__id = b.group.__ecComponentInfo = null);
        }
      }, Ka = function(f, v, c, d, y) {
        var p = f._model;
        if (p.setUpdatePayload(c), !d) {
          M([].concat(f._componentsViews).concat(f._chartsViews), b);
          return;
        }
        var g = {};
        g[d + "Id"] = c[d + "Id"], g[d + "Index"] = c[d + "Index"], g[d + "Name"] = c[d + "Name"];
        var m = {
          mainType: d,
          query: g
        };
        y && (m.subType = y);
        var _ = c.excludeSeriesId, S;
        _ != null && (S = q(), M(Rt(_), function(w) {
          var x = Pe(w, null);
          x != null && S.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = S && S.get(w.id) != null;
          if (!x)
            if (pc(c))
              if (w instanceof Ie)
                c.type === ti && !c.notBlur && !w.get(["emphasis", "disabled"]) && J1(w, c, f._api);
              else {
                var C = vh(w.mainType, w.componentIndex, c.name, f._api), A = C.focusSelf, D = C.dispatchers;
                c.type === ti && A && !c.notBlur && ou(w.mainType, w.componentIndex, f._api), D && M(D, function(T) {
                  c.type === ti ? Ro(T) : ko(T);
                });
              }
            else uu(c) && w instanceof Ie && (rS(w, c, f._api), vc(w), Qt(f));
        }, f), p && p.eachComponent(m, function(w) {
          var x = S && S.get(w.id) != null;
          x || b(f[d === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, f);
        function b(w) {
          w && w.__alive && w[v] && w[v](w.__model, p, f._api, c);
        }
      }, lr = {
        prepareAndUpdate: function(f) {
          bi(this), lr.update.call(this, f, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: f.newOption != null
          });
        },
        update: function(f, v) {
          var c = this._model, d = this._api, y = this._zr, p = this._coordSysMgr, g = this._scheduler;
          if (c) {
            c.setUpdatePayload(f), g.restoreData(c, f), g.performSeriesTasks(c), p.create(c, d), g.performDataProcessorTasks(c, f), Rl(this, c), p.update(c, d), e(c), g.performVisualTasks(c, f), Ol(this, c, d, f, v);
            var m = c.get("backgroundColor") || "transparent", _ = c.get("darkMode");
            y.setBackgroundColor(m), _ != null && _ !== "auto" && y.setDarkMode(_), pe.trigger("afterupdate", c, d);
          }
        },
        updateTransform: function(f) {
          var v = this, c = this._model, d = this._api;
          if (c) {
            c.setUpdatePayload(f);
            var y = [];
            c.eachComponent(function(g, m) {
              if (g !== "series") {
                var _ = v.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var S = _.updateTransform(m, c, d, f);
                    S && S.update && y.push(_);
                  } else
                    y.push(_);
              }
            });
            var p = q();
            c.eachSeries(function(g) {
              var m = v._chartsMap[g.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(g, c, d, f);
                _ && _.update && p.set(g.uid, 1);
              } else
                p.set(g.uid, 1);
            }), e(c), this._scheduler.performVisualTasks(c, f, {
              setDirty: !0,
              dirtyMap: p
            }), Qa(this, c, d, f, {}, p), pe.trigger("afterupdate", c, d);
          }
        },
        updateView: function(f) {
          var v = this._model;
          v && (v.setUpdatePayload(f), ye.markUpdateMethod(f, "updateView"), e(v), this._scheduler.performVisualTasks(v, f, {
            setDirty: !0
          }), Ol(this, v, this._api, f, {}), pe.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(f) {
          var v = this, c = this._model;
          c && (c.setUpdatePayload(f), c.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), ye.markUpdateMethod(f, "updateVisual"), e(c), this._scheduler.performVisualTasks(c, f, {
            visualType: "visual",
            setDirty: !0
          }), c.eachComponent(function(d, y) {
            if (d !== "series") {
              var p = v.getViewOfComponentModel(y);
              p && p.__alive && p.updateVisual(y, c, v._api, f);
            }
          }), c.eachSeries(function(d) {
            var y = v._chartsMap[d.__viewId];
            y.updateVisual(d, c, v._api, f);
          }), pe.trigger("afterupdate", c, this._api));
        },
        updateLayout: function(f) {
          lr.update.call(this, f);
        }
      }, El = function(f, v, c, d) {
        if (f._disposed) {
          f.id;
          return;
        }
        for (var y = f._model, p = f._coordSysMgr.getCoordinateSystems(), g, m = qs(y, c), _ = 0; _ < p.length; _++) {
          var S = p[_];
          if (S[v] && (g = S[v](y, m, d)) != null)
            return g;
        }
      }, Rl = function(f, v) {
        var c = f._chartsMap, d = f._scheduler;
        v.eachSeries(function(y) {
          d.updateStreamModes(y, c[y.__viewId]);
        });
      }, kl = function(f, v) {
        var c = this, d = this.getModel(), y = f.type, p = f.escapeConnect, g = Yo[y], m = g.actionInfo, _ = (m.update || "update").split(":"), S = _.pop(), b = _[0] != null && Ae(_[0]);
        this[xt] = !0;
        var w = [f], x = !1;
        f.batch && (x = !0, w = G(f.batch, function(I) {
          return I = st(O({}, I), f), I.batch = null, I;
        }));
        var C = [], A, D = uu(f), T = pc(f);
        if (T && Jp(this._api), M(w, function(I) {
          if (A = g.action(I, c._model, c._api), A = A || O({}, I), A.type = m.event || A.type, C.push(A), T) {
            var E = uh(f), R = E.queryOptionMap, z = E.mainTypeSpecified, k = z ? R.keys()[0] : "series";
            Ka(c, S, I, k), Qt(c);
          } else D ? (Ka(c, S, I, "series"), Qt(c)) : b && Ka(c, S, I, b.main, b.sub);
        }), S !== "none" && !T && !D && !b)
          try {
            this[Bt] ? (bi(this), lr.update.call(this, f), this[Bt] = null) : lr[S].call(this, f);
          } catch (I) {
            throw this[xt] = !1, I;
          }
        if (x ? A = {
          type: m.event || y,
          escapeConnect: p,
          batch: C
        } : A = C[0], this[xt] = !1, !v) {
          var P = this._messageCenter;
          if (P.trigger(A.type, A), D) {
            var L = {
              type: "selectchanged",
              escapeConnect: p,
              selected: iS(d),
              isFromClick: f.isFromClick || !1,
              fromAction: f.type,
              fromActionPayload: f
            };
            P.trigger(L.type, L);
          }
        }
      }, yn = function(f) {
        for (var v = this._pendingActions; v.length; ) {
          var c = v.shift();
          kl.call(this, c, f);
        }
      }, mn = function(f) {
        !f && this.trigger("updated");
      }, hd = function(f, v) {
        f.on("rendered", function(c) {
          v.trigger("rendered", c), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          f.animation.isFinished() && !v[Bt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, fd = function(f, v) {
        f.on("mouseover", function(c) {
          var d = c.target, y = Mn(d, lu);
          y && (tS(y, c, v._api), Qt(v));
        }).on("mouseout", function(c) {
          var d = c.target, y = Mn(d, lu);
          y && (eS(y, c, v._api), Qt(v));
        }).on("click", function(c) {
          var d = c.target, y = Mn(d, function(m) {
            return ot(m).dataIndex != null;
          }, !0);
          if (y) {
            var p = y.selected ? "unselect" : "select", g = ot(y);
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
      function e(f) {
        f.clearColorPalette(), f.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(f) {
        var v = [], c = [], d = !1;
        if (f.eachComponent(function(m, _) {
          var S = _.get("zlevel") || 0, b = _.get("z") || 0, w = _.getZLevelKey();
          d = d || !!w, (m === "series" ? c : v).push({
            zlevel: S,
            z: b,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), d) {
          var y = v.concat(c), p, g;
          go(y, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), M(y, function(m) {
            var _ = f.getComponent(m.type, m.idx), S = m.zlevel, b = m.key;
            p != null && (S = Math.max(p, S)), b ? (S === p && b !== g && S++, g = b) : g && (S === p && S++, g = ""), p = S, _.setZLevel(S);
          });
        }
      }
      Ol = function(f, v, c, d, y) {
        i(v), cd(f, v, c, d, y), M(f._chartsViews, function(p) {
          p.__alive = !1;
        }), Qa(f, v, c, d, y), M(f._chartsViews, function(p) {
          p.__alive || p.remove(v, c);
        });
      }, cd = function(f, v, c, d, y, p) {
        M(p || f._componentsViews, function(g) {
          var m = g.__model;
          u(m, g), g.render(m, v, c, d), s(m, g), h(m, g);
        });
      }, Qa = function(f, v, c, d, y, p) {
        var g = f._scheduler;
        y = O(y || {}, {
          updatedSeries: v.getSeries()
        }), pe.trigger("series:beforeupdate", v, c, y);
        var m = !1;
        v.eachSeries(function(_) {
          var S = f._chartsMap[_.__viewId];
          S.__alive = !0;
          var b = S.renderTask;
          g.updatePayload(b, d), u(_, S), p && p.get(_.uid) && b.dirty(), b.perform(g.getPerformArgs(b)) && (m = !0), S.group.silent = !!_.get("silent"), o(_, S), vc(_);
        }), g.unfinished = m || g.unfinished, pe.trigger("series:layoutlabels", v, c, y), pe.trigger("series:transition", v, c, y), v.eachSeries(function(_) {
          var S = f._chartsMap[_.__viewId];
          s(_, S), h(_, S);
        }), a(f, v), pe.trigger("series:afterupdate", v, c, y);
      }, Qt = function(f) {
        f[Pl] = !0, f.getZr().wakeUp();
      }, dd = function(f) {
        f[Pl] && (f.getZr().storage.traverse(function(v) {
          On(v) || n(v);
        }), f[Pl] = !1);
      };
      function n(f) {
        for (var v = [], c = f.currentStates, d = 0; d < c.length; d++) {
          var y = c[d];
          y === "emphasis" || y === "blur" || y === "select" || v.push(y);
        }
        f.selected && f.states.select && v.push("select"), f.hoverState === ns && f.states.emphasis ? v.push("emphasis") : f.hoverState === is && f.states.blur && v.push("blur"), f.useStates(v);
      }
      function a(f, v) {
        var c = f._zr, d = c.storage, y = 0;
        d.traverse(function(p) {
          p.isGroup || y++;
        }), y > v.get("hoverLayerThreshold") && !W.node && !W.worker && v.eachSeries(function(p) {
          if (!p.preventUsingHoverLayer) {
            var g = f._chartsMap[p.__viewId];
            g.__alive && g.eachRendered(function(m) {
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
          v.eachRendered(function(y) {
            return l(y, c, d, -1 / 0), !0;
          });
        }
      }
      function l(f, v, c, d) {
        var y = f.getTextContent(), p = f.getTextGuideLine(), g = f.isGroup;
        if (g)
          for (var m = f.childrenRef(), _ = 0; _ < m.length; _++)
            d = Math.max(l(m[_], v, c, d), d);
        else
          f.z = v, f.zlevel = c, d = Math.max(f.z2, d);
        if (y && (y.z = v, y.zlevel = c, isFinite(d) && (y.z2 = d + 2)), p) {
          var S = f.textGuideLineConfig;
          p.z = v, p.zlevel = c, isFinite(d) && (p.z2 = d + (S && S.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(f, v) {
        v.eachRendered(function(c) {
          if (!On(c)) {
            var d = c.getTextContent(), y = c.getTextGuideLine();
            c.stateTransition && (c.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), y && y.stateTransition && (y.stateTransition = null), c.hasState() ? (c.prevStates = c.currentStates, c.clearStates()) : c.prevStates && (c.prevStates = null);
          }
        });
      }
      function h(f, v) {
        var c = f.getModel("stateAnimation"), d = f.isAnimationEnabled(), y = c.get("duration"), p = y > 0 ? {
          duration: y,
          delay: c.get("delay"),
          easing: c.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(g) {
          if (g.states && g.states.emphasis) {
            if (On(g))
              return;
            if (g instanceof nt && uS(g), g.__dirty) {
              var m = g.prevStates;
              m && g.useStates(m);
            }
            if (d) {
              g.stateTransition = p;
              var _ = g.getTextContent(), S = g.getTextGuideLine();
              _ && (_.stateTransition = p), S && (S.stateTransition = p);
            }
            g.__dirty && n(g);
          }
        });
      }
      vd = function(f) {
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
              var y = d.__ecComponentInfo;
              if (y != null)
                return f._model.getComponent(y.mainType, y.index);
              d = d.parent;
            }
          }, c.prototype.enterEmphasis = function(d, y) {
            Ro(d, y), Qt(f);
          }, c.prototype.leaveEmphasis = function(d, y) {
            ko(d, y), Qt(f);
          }, c.prototype.enterBlur = function(d) {
            j1(d), Qt(f);
          }, c.prototype.leaveBlur = function(d) {
            qp(d), Qt(f);
          }, c.prototype.enterSelect = function(d) {
            Kp(d), Qt(f);
          }, c.prototype.leaveSelect = function(d) {
            Qp(d), Qt(f);
          }, c.prototype.getModel = function() {
            return f.getModel();
          }, c.prototype.getViewOfComponentModel = function(d) {
            return f.getViewOfComponentModel(d);
          }, c.prototype.getViewOfSeriesModel = function(d) {
            return f.getViewOfSeriesModel(d);
          }, c;
        }(Ey))(f);
      }, nm = function(f) {
        function v(c, d) {
          for (var y = 0; y < c.length; y++) {
            var p = c[y];
            p[Ll] = d;
          }
        }
        M(Fn, function(c, d) {
          f._messageCenter.on(d, function(y) {
            if (pd[f.group] && f[Ll] !== ud) {
              if (y && y.escapeConnect)
                return;
              var p = f.makeActionFromEvent(y), g = [];
              M($n, function(m) {
                m !== f && m.group === f.group && g.push(m);
              }), v(g, ud), M(g, function(m) {
                m[Ll] !== uM && m.dispatchAction(p);
              }), v(g, hM);
            }
          });
        });
      };
    }(), t;
  }(ke)
), Yh = am.prototype;
Yh.on = Jy("on");
Yh.off = Jy("off");
Yh.one = function(r, t, e) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var fM = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Yo = {}, Fn = {}, Iu = [], Eu = [], Xo = [], om = {}, Ru = {}, $n = {}, pd = {}, cM = +/* @__PURE__ */ new Date() - 0, Xh = "_echarts_instance_";
function vM(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    var n = dM(r);
    if (n)
      return n;
  }
  var a = new am(r, t, e);
  return a.id = "ec_" + cM++, $n[a.id] = a, i && Wp(r, Xh, a.id), nm(a), pe.trigger("afterinit", a), a;
}
function dM(r) {
  return $n[$1(r, Xh)];
}
function sm(r, t) {
  om[r] = t;
}
function lm(r) {
  ht(Eu, r) < 0 && Eu.push(r);
}
function um(r, t) {
  qh(Iu, r, t, eM);
}
function pM(r) {
  Zh("afterinit", r);
}
function gM(r) {
  Zh("afterupdate", r);
}
function Zh(r, t) {
  pe.on(r, t);
}
function Ki(r, t, e) {
  X(t) && (e = t, t = "");
  var i = H(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !Fn[t] && (Ye(ld.test(i) && ld.test(t)), Yo[i] || (Yo[i] = {
    action: e,
    actionInfo: r
  }), Fn[t] = i);
}
function yM(r, t) {
  Mh.register(r, t);
}
function mM(r, t) {
  qh(Xo, r, t, Ky, "layout");
}
function si(r, t) {
  qh(Xo, r, t, Qy, "visual");
}
var gd = [];
function qh(r, t, e, i, n) {
  if ((X(t) || H(t)) && (e = t, t = i), !(ht(gd, e) >= 0)) {
    gd.push(e);
    var a = By.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function hm(r, t) {
  Ru[r] = t;
}
function _M(r, t, e) {
  var i = KC("registerMap");
  i && i(r, t, e);
}
var SM = kb;
si(Uh, fC);
si(Ss, cC);
si(Ss, vC);
si(Uh, MC);
si(Ss, AC);
si(jy, ZC);
lm(ky);
um(JC, lC);
hm("default", dC);
Ki({
  type: ti,
  event: ti,
  update: ti
}, Vt);
Ki({
  type: uo,
  event: uo,
  update: uo
}, Vt);
Ki({
  type: En,
  event: En,
  update: En
}, Vt);
Ki({
  type: ho,
  event: ho,
  update: ho
}, Vt);
Ki({
  type: Rn,
  event: Rn,
  update: Rn
}, Vt);
sm("light", TC);
sm("dark", Hy);
var yd = [], wM = {
  registerPreprocessor: lm,
  registerProcessor: um,
  registerPostInit: pM,
  registerPostUpdate: gM,
  registerUpdateLifecycle: Zh,
  registerAction: Ki,
  registerCoordinateSystem: yM,
  registerLayout: mM,
  registerVisual: si,
  registerTransform: SM,
  registerLoading: hm,
  registerMap: _M,
  registerImpl: qC,
  PRIORITY: lM,
  ComponentModel: lt,
  ComponentView: qe,
  SeriesModel: Ie,
  ChartView: ye,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    lt.registerClass(r);
  },
  registerComponentView: function(r) {
    qe.registerClass(r);
  },
  registerSeriesModel: function(r) {
    Ie.registerClass(r);
  },
  registerChartView: function(r) {
    ye.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    lt.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    HT(r, t);
  }
};
function aa(r) {
  if (F(r)) {
    M(r, function(t) {
      aa(t);
    });
    return;
  }
  ht(yd, r) >= 0 || (yd.push(r), X(r) && (r = {
    install: r
  }), r.install(wM));
}
var bM = (
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
), xM = (
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
), ku = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", ge).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(lt)
);
Re(ku, xM);
var fm = {
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
}, TM = it({
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
}, fm), Kh = it({
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
}, fm), CM = it({
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
}, Kh), MM = st({
  logBase: 10
}, Kh);
const AM = {
  category: TM,
  value: Kh,
  time: CM,
  log: MM
};
var DM = 0, Ou = (
  /** @class */
  function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++DM;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && G(i, PM);
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
      if (!$(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = q(this.categories));
    }, r;
  }()
);
function PM(r) {
  return H(r) && r.value != null ? r.value : r + "";
}
var LM = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function md(r, t, e, i) {
  M(LM, function(n, a) {
    var o = it(it({}, AM[a], !0), i, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, f) {
          var v = jn(this), c = v ? kh(h) : {}, d = f.getTheme();
          it(h, d.get(a + "Axis")), it(h, this.getDefaultOption()), h.type = _d(h), v && Jn(h, c, v);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = Ou.createByAxisModel(this));
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
  }), r.registerSubTypeDefaulter(t + "Axis", _d);
}
function _d(r) {
  return r.type || (r.data ? "category" : "value");
}
var Ne = (
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
Jo(Ne);
function Nu(r) {
  return r.type === "interval" || r.type === "log";
}
function IM(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = Fp(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = cm(o), l = n.niceTickExtent = [mt(Math.ceil(r[0] / o) * o, s), mt(Math.floor(r[1] / o) * o, s)];
  return EM(l, r), n;
}
function Nl(r) {
  var t = Math.pow(10, lh(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, mt(e * t);
}
function cm(r) {
  return ze(r) + 2;
}
function Sd(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function EM(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), Sd(r, 0, t), Sd(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function ws(r, t) {
  return r >= t[0] && r <= t[1];
}
function bs(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function xs(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var Qh = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new Ou({})), F(n) && (n = new Ou({
        categories: G(n, function(a) {
          return H(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : $(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), ws(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round(xs(e, this._extent)), this.getRawOrdinalNumber(e);
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
  }(Ne)
);
Ne.registerClass(Qh);
var Yr = mt, Qi = (
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
      return ws(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return xs(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = cm(e);
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
      var h = s.length ? s[s.length - 1].value : a[1];
      return n[1] > h && (e ? s.push({
        value: Yr(h + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, h = [], f = s.value - l.value, v = f / e; u < e - 1; ) {
          var c = Yr(l.value + (u + 1) * v);
          c > a[0] && c < a[1] && h.push(c), u++;
        }
        n.push(h);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = ze(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = Yr(e.value, n, !0);
      return Xg(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = IM(a, e, i, n);
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
  }(Ne)
);
Ne.registerClass(Qi);
var RM = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, vm = (
  /** @class */
  function(r) {
    B(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return ps(e.value, Uc[db(Oi(this._minLevelUnit))] || Uc.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return pb(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = zM(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= oe, i[1] += oe), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - oe;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = ja.length, l = Math.min(RM(ja, this._approxInterval, 0, s), s - 1);
      this._interval = ja[l][1], this._minLevelUnit = ja[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return vt(e) ? e : +Xe(e);
    }, t.prototype.contain = function(e) {
      return ws(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return bs(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return xs(e, this._extent);
    }, t.type = "time", t;
  }(Qi)
), ja = [
  // Format                           interval
  ["second", Lh],
  ["minute", Ih],
  ["hour", Nn],
  ["quarter-day", Nn * 6],
  ["half-day", Nn * 12],
  ["day", oe * 1.2],
  ["half-week", oe * 3.5],
  ["week", oe * 7],
  ["month", oe * 31],
  ["quarter", oe * 95],
  ["half-year", Wc / 2],
  ["year", Wc]
  // 1Y
];
function kM(r, t, e, i) {
  var n = Xe(t), a = Xe(e), o = function(d) {
    return Yc(n, d, i) === Yc(a, d, i);
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
function OM(r, t) {
  return r /= oe, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function NM(r) {
  var t = 30 * oe;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function BM(r) {
  return r /= Nn, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function wd(r, t) {
  return r /= t ? Ih : Lh, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function FM(r) {
  return Fp(r);
}
function $M(r, t, e) {
  var i = new Date(r);
  switch (Oi(t)) {
    case "year":
    case "month":
      i[Hg(e)](0);
    case "day":
      i[Vg(e)](1);
    case "hour":
      i[Gg(e)](0);
    case "minute":
      i[Wg(e)](0);
    case "second":
      i[Ug(e)](0), i[Yg(e)](0);
  }
  return i.getTime();
}
function zM(r, t, e, i) {
  var n = 1e4, a = $g, o = 0;
  function s(D, T, P, L, I, E, R) {
    for (var z = new Date(T), k = T, N = z[L](); k < P && k <= i[1]; )
      R.push({
        value: k
      }), N += D, z[I](N), k = z.getTime();
    R.push({
      value: k,
      notAdd: !0
    });
  }
  function l(D, T, P) {
    var L = [], I = !T.length;
    if (!kM(Oi(D), i[0], i[1], e)) {
      I && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: $M(new Date(i[0]), D, e)
      }, {
        value: i[1]
      }]);
      for (var E = 0; E < T.length - 1; E++) {
        var R = T[E].value, z = T[E + 1].value;
        if (R !== z) {
          var k = void 0, N = void 0, V = void 0, Z = !1;
          switch (D) {
            case "year":
              k = Math.max(1, Math.round(t / oe / 365)), N = Eh(e), V = gb(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              k = NM(t), N = Ni(e), V = Hg(e);
              break;
            case "week":
            case "half-week":
            case "day":
              k = OM(t), N = gs(e), V = Vg(e), Z = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              k = BM(t), N = Qn(e), V = Gg(e);
              break;
            case "minute":
              k = wd(t, !0), N = ys(e), V = Wg(e);
              break;
            case "second":
              k = wd(t, !1), N = ms(e), V = Ug(e);
              break;
            case "millisecond":
              k = FM(t), N = _s(e), V = Yg(e);
              break;
          }
          s(k, R, z, N, V, Z, L), D === "year" && P.length > 1 && E === 0 && P.unshift({
            value: P[0].value - k
          });
        }
      }
      for (var E = 0; E < L.length; E++)
        P.push(L[E]);
      return L;
    }
  }
  for (var u = [], h = [], f = 0, v = 0, c = 0; c < a.length && o++ < n; ++c) {
    var d = Oi(a[c]);
    if (vb(a[c])) {
      l(a[c], u[u.length - 1] || [], h);
      var y = a[c + 1] ? Oi(a[c + 1]) : null;
      if (d !== y) {
        if (h.length) {
          v = f, h.sort(function(D, T) {
            return D.value - T.value;
          });
          for (var p = [], g = 0; g < h.length; ++g) {
            var m = h[g].value;
            (g === 0 || h[g - 1].value !== m) && (p.push(h[g]), m >= i[0] && m <= i[1] && f++);
          }
          var _ = (i[1] - i[0]) / t;
          if (f > _ * 1.5 && v > _ / 1.5 || (u.push(p), f > _ || r === a[c]))
            break;
        }
        h = [];
      }
    }
  }
  for (var S = Dt(G(u, function(D) {
    return Dt(D, function(T) {
      return T.value >= i[0] && T.value <= i[1] && !T.notAdd;
    });
  }), function(D) {
    return D.length > 0;
  }), b = [], w = S.length - 1, c = 0; c < S.length; ++c)
    for (var x = S[c], C = 0; C < x.length; ++C)
      b.push({
        value: x[C].value,
        level: w - c
      });
  b.sort(function(D, T) {
    return D.value - T.value;
  });
  for (var A = [], c = 0; c < b.length; ++c)
    (c === 0 || b[c].value !== b[c - 1].value) && A.push(b[c]);
  return A;
}
Ne.registerClass(vm);
var bd = Ne.prototype, zn = Qi.prototype, HM = mt, VM = Math.floor, GM = Math.ceil, Ja = Math.pow, ce = Math.log, jh = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new Qi(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = zn.getTicks.call(this, e);
      return G(o, function(s) {
        var l = s.value, u = mt(Ja(this.base, l));
        return u = l === n[0] && this._fixMin ? to(u, a[0]) : u, u = l === n[1] && this._fixMax ? to(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = ce(this.base);
      e = ce(Math.max(0, e)) / n, i = ce(Math.max(0, i)) / n, zn.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = bd.getExtent.call(this);
      i[0] = Ja(e, i[0]), i[1] = Ja(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = to(i[0], a[0])), this._fixMax && (i[1] = to(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = ce(e[0]) / ce(i), e[1] = ce(e[1]) / ce(i), bd.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = C1(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [mt(GM(i[0] / a) * a), mt(VM(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      zn.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = ce(e) / ce(this.base), ws(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = ce(e) / ce(this.base), bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = xs(e, this._extent), Ja(this.base, e);
    }, t.type = "log", t;
  }(Ne)
), dm = jh.prototype;
dm.getMinorTicks = zn.getMinorTicks;
dm.getLabel = zn.getLabel;
function to(r, t) {
  return HM(r, ze(t));
}
Ne.registerClass(jh);
var WM = (
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
      X(o) ? this._modelMinNum = eo(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = eo(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (X(s) ? this._modelMaxNum = eo(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = eo(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = F(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [_r(u[0], 1), _r(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var f = bo(s) || bo(l) || t && !n;
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
      this[YM[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = UM[t];
      this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  }()
), UM = {
  min: "_determinedMin",
  max: "_determinedMax"
}, YM = {
  min: "_dataMin",
  max: "_dataMax"
};
function XM(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new WM(r, t, e), r.rawExtentInfo = i, i);
}
function eo(r, t) {
  return t == null ? null : bo(t) ? NaN : r.parse(t);
}
function pm(r, t) {
  var e = r.type, i = XM(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = yy("bar", o), l = !1;
    if (M(s, function(f) {
      l = l || f.getBaseAxis() === t.axis;
    }), l) {
      var u = my(s), h = ZM(n, a, t, u);
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
function ZM(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = Wx(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  M(o, function(c) {
    s = Math.min(c.offset, s);
  });
  var l = -1 / 0;
  M(o, function(c) {
    l = Math.max(c.offset + c.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - r, f = 1 - (s + l) / a, v = h / f - h;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function xd(r, t) {
  var e = t, i = pm(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof jh && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function qM(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      case "category":
        return new Qh({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new vm({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (Ne.getClass(t) || Qi)();
    }
}
function KM(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function ji(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  }(t) : $(t) ? /* @__PURE__ */ function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  }(t) : X(t) ? /* @__PURE__ */ function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(Jh(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  }(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function Jh(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function QM(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof Qh ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = ji(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var h = 0; h < n; h += u) {
      var f = i ? i[h] : {
        value: a[0] + h
      }, v = s(f, h), c = o.getTextRect(v), d = jM(c, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function jM(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new rt(r.x, r.y, a, o);
  return s;
}
function tf(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function gm(r) {
  return r.type === "category" && tf(r.getLabelModel()) === 0;
}
function JM(r, t) {
  var e = {};
  return M(r.mapDimensionsAll(t), function(i) {
    e[Xw(r, i)] = !0;
  }), ct(e);
}
var tA = (
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
      return t = t.toLowerCase(), Dt(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  }()
), Bu = ["x", "y"];
function Td(r) {
  return r.type === "interval" || r.type === "time";
}
var eA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = Bu, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Td(e) || !Td(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, f = (s[1] - o[1]) / u, v = o[0] - n[0] * h, c = o[1] - a[0] * f, d = this._transform = [h, 0, 0, f, v, c];
          this._invTransform = rh([], d);
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
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new rt(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return se(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return se(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new rt(a, o, s, l);
    }, t;
  }(tA)
), oa = _t();
function ym(r, t) {
  var e = G(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function rA(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = ji(r), i = r.scale.getExtent(), n = ym(r, t), a = Dt(n, function(o) {
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
  return r.type === "category" ? nA(r) : oA(r);
}
function iA(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = ym(r, e);
    return {
      ticks: Dt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? aA(r, t) : {
    ticks: G(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function nA(r) {
  var t = r.getLabelModel(), e = mm(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function mm(r, t) {
  var e = _m(r, "labels"), i = tf(t), n = Sm(e, i);
  if (n)
    return n;
  var a, o;
  return X(i) ? a = xm(r, i) : (o = i === "auto" ? sA(r) : i, a = bm(r, o)), wm(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function aA(r, t) {
  var e = _m(r, "ticks"), i = tf(t), n = Sm(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), X(i))
    a = xm(r, i, !0);
  else if (i === "auto") {
    var s = mm(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = G(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = bm(r, o, !0);
  return wm(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function oA(r) {
  var t = r.scale.getTicks(), e = ji(r);
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
function _m(r, t) {
  return oa(r)[t] || (oa(r)[t] = []);
}
function Sm(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function wm(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function sA(r) {
  var t = oa(r).autoInterval;
  return t ?? (oa(r).autoInterval = r.calculateCategoryInterval());
}
function lA(r) {
  var t = uA(r), e = ji(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), h = Math.abs(u * Math.cos(i)), f = Math.abs(u * Math.sin(i)), v = 0, c = 0; l <= a[1]; l += s) {
    var d = 0, y = 0, p = ih(e({
      value: l
    }), t.font, "center", "top");
    d = p.width * 1.3, y = p.height * 1.3, v = Math.max(v, d, 7), c = Math.max(c, y, 7);
  }
  var g = v / h, m = c / f;
  isNaN(g) && (g = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(g, m))), S = oa(r.model), b = r.getExtent(), w = S.lastAutoInterval, x = S.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && S.axisExtent0 === b[0] && S.axisExtent1 === b[1] ? _ = w : (S.lastTickCount = o, S.lastAutoInterval = _, S.axisExtent0 = b[0], S.axisExtent1 = b[1]), _;
}
function uA(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function bm(r, t, e) {
  var i = ji(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = n.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var f = gm(r), v = o.get("showMinLabel") || f, c = o.get("showMaxLabel") || f;
  v && u !== a[0] && y(a[0]);
  for (var d = u; d <= a[1]; d += l)
    y(d);
  c && d - l !== a[1] && y(a[1]);
  function y(p) {
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
function xm(r, t, e) {
  var i = r.scale, n = ji(r), a = [];
  return M(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Cd = [0, 1], hA = (
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
      return b1(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), Md(i, n.count())), ec(t, Cd, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), Md(i, n.count()));
      var a = ec(t, i, Cd, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = iA(this, e), n = i.ticks, a = G(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return fA(this, a, o, t.clamp), a;
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
      return rA(this).labels;
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
      return lA(this);
    }, r;
  }()
);
function Md(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function fA(r, t, e, i) {
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
    M(t, function(c) {
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
    return c = mt(c), d = mt(d), f ? c > d : c < d;
  }
}
var cA = (
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
  }(hA)
);
function Fu(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, h = i.getRect(), f = [h.x, h.x + h.width, h.y, h.y + h.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = t.get("offset") || 0, d = u === "x" ? [f[2] - c, f[3] + c] : [f[0] - c, f[1] + c];
  if (o) {
    var y = o.toGlobalCoord(o.dataToCoord(0));
    d[v.onZero] = Math.max(Math.min(y, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[v[l]] : f[0], u === "x" ? d[v[l]] : f[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? d[v[s]] - d[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Un(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var g = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -g : g, a.z2 = 1, a;
}
function Ad(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function Dd(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return M(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, ge).models[0];
    t[i] = a;
  }), t;
}
var Bl = Math.log;
function vA(r, t, e) {
  var i = Qi.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = pm(r, t), u = l.extent, h = l.fixMin, f = l.fixMax;
  if (r.type === "log") {
    var v = Bl(r.base);
    u = [Bl(u[0]) / v, Bl(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: f
  });
  var c = i.getExtent.call(r);
  h && (u[0] = c[0]), f && (u[1] = c[1]);
  var d = i.getInterval.call(r), y = u[0], p = u[1];
  if (h && f)
    d = (p - y) / o;
  else if (h)
    for (p = u[0] + d * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      d = Nl(d), p = u[0] + d * o;
  else if (f)
    for (y = u[1] - d * o; y > u[0] && isFinite(y) && isFinite(u[0]); )
      d = Nl(d), y = u[1] - d * o;
  else {
    var g = r.getTicks().length - 1;
    g > o && (d = Nl(d));
    var m = d * o;
    p = Math.ceil(u[1] / d) * d, y = mt(p - m), y < 0 && u[0] >= 0 ? (y = 0, p = mt(m)) : p > 0 && u[1] <= 0 && (p = 0, y = -mt(m));
  }
  var _ = (n[0].value - a[0].value) / s, S = (n[o].value - a[o].value) / s;
  i.setExtent.call(r, y + d * _, p + d * S), i.setInterval.call(r, d), (_ || S) && i.setNiceExtent.call(r, y + d, p - d);
}
var dA = (
  /** @class */
  function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = Bu, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = ct(o), u = l.length;
        if (u) {
          for (var h = [], f = u - 1; f >= 0; f--) {
            var v = +l[f], c = o[v], d = c.model, y = c.scale;
            // Only value and log axis without interval support alignTicks.
            Nu(y) && d.get("alignTicks") && d.get("interval") == null ? h.push(c) : (xd(y, d), Nu(y) && (s = c));
          }
          h.length && (s || (s = h.pop(), xd(s.scale, s.model)), M(h, function(p) {
            vA(p.scale, p.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      M(i.x, function(o) {
        Pd(i, "y", o, a);
      }), M(i.y, function(o) {
        Pd(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = Qg(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (M(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = QM(u);
          if (h) {
            var f = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[f] -= h[f] + v, u.position === "top" ? o.y += h.height + v : u.position === "left" && (o.x += h.width + v);
          }
        }
      }), l()), M(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        M(s, function(u) {
          var h = u.isHorizontal(), f = h ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(f[v], f[1 - v]), pA(u, h ? o.x : o.y);
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
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", ge).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", ge).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, ht(o, s) < 0 && (s = null);
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
      this._axesMap = s, M(s.x, function(h, f) {
        M(s.y, function(v, c) {
          var d = "x" + f + "y" + c, y = new eA(d);
          y.master = n, y.model = t, n._coordsMap[d] = y, n._coordsList.push(y), y.addAxis(h), y.addAxis(v);
        });
      });
      function u(h) {
        return function(f, v) {
          if (Fl(f, t)) {
            var c = f.get("position");
            h === "x" ? c !== "top" && c !== "bottom" && (c = o.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = o.left ? "right" : "left"), o[c] = !0;
            var d = new cA(h, qM(f), [0, 0], f.get("type"), c), y = d.type === "category";
            d.onBand = y && f.get("boundaryGap"), d.inverse = f.get("inverse"), f.axis = d, d.model = f, d.grid = a, d.index = v, a._axesList.push(d), s[h][v] = d, l[h]++;
          }
        };
      }
    }, r.prototype._updateScale = function(t, e) {
      M(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (Ad(n)) {
          var a = Dd(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Fl(o, e) || !Fl(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), h = l.getAxis("x"), f = l.getAxis("y");
          i(u, h), i(u, f);
        }
      }, this);
      function i(n, a) {
        M(JM(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return M(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        ht(e, a) < 0 && e.push(a), ht(i, o) < 0 && i.push(o);
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
        if (Ad(n)) {
          var a = Dd(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = Bu, r;
  }()
);
function Fl(r, t) {
  return r.getCoordSysModel() === t;
}
function Pd(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    Ld(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && Ld(n[u]) && !i[h(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[h(a)] = !0);
  function h(f) {
    return f.dim + "_" + f.index;
  }
}
function Ld(r) {
  return r && r.type !== "category" && r.type !== "time" && KM(r);
}
function pA(r, t) {
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
var vr = Math.PI, mr = (
  /** @class */
  function() {
    function r(t, e) {
      this.group = new kt(), this.opt = e, this.axisModel = t, st(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new kt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!Id[t];
    }, r.prototype.add = function(t) {
      Id[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = Bp(e - t), a, o;
      return Io(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Io(n - vr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < vr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
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
), Id = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (se(s, s, o), se(l, l, o));
      var h = O({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), f = new Sr({
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
      qn(f.shape, f.style.lineWidth), f.anid = "line", e.add(f);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var c = t.get(["axisLine", "symbolSize"]);
        $(v) && (v = [v, v]), ($(c) || vt(c)) && (c = [c, c]);
        var d = ay(t.get(["axisLine", "symbolOffset"]) || 0, c), y = c[0], p = c[1];
        M([{
          rotate: r.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(g, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = ea(v[m], -y / 2, -p / 2, y, p, h.stroke, !0), S = g.r + g.offset, b = u ? l : s;
            _.attr({
              rotation: g.rotate,
              x: b[0] + S * Math.cos(r.rotation),
              y: b[1] - S * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = mA(e, i, t, r), a = SA(e, i, t, r);
    if (yA(t, a, n), _A(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = fT(G(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      cT(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = Un(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, f = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Rd(a) ? r.labelOffset + o * l : 0
      ], v, c = t.get("nameRotate");
      c != null && (c = c * vr / 180);
      var d;
      Rd(a) ? v = mr.innerTextLayout(
        r.rotation,
        c ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = gA(r.rotation, a, c || 0, u), d = r.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(v.rotation)), !isFinite(d) && (d = null)));
      var y = s.getFont(), p = t.get("nameTruncate", !0) || {}, g = p.ellipsis, m = Un(r.nameTruncateMaxWidth, p.maxWidth, d), _ = new me({
        x: f[0],
        y: f[1],
        rotation: v.rotation,
        silent: mr.isLabelSilent(t),
        style: Kn(s, {
          text: n,
          font: y,
          overflow: "truncate",
          width: m,
          ellipsis: g,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || v.textAlign,
          verticalAlign: s.get("verticalAlign") || v.textVerticalAlign
        }),
        z2: 1
      });
      if (bh({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var S = mr.makeAxisEventDataBase(t);
        S.targetType = "axisName", S.name = n, ot(_).eventData = S;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function gA(r, t, e, i) {
  var n = Bp(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Io(n - vr / 2) ? (o = l ? "bottom" : "top", a = "center") : Io(n - vr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < vr * 1.5 && n > vr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function yA(r, t, e) {
  if (!gm(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], h = e[1], f = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (jt(a), jt(u)) : Ed(a, o) && (i ? (jt(o), jt(h)) : (jt(a), jt(u))), n === !1 ? (jt(s), jt(f)) : Ed(l, s) && (n ? (jt(l), jt(v)) : (jt(s), jt(f)));
  }
}
function jt(r) {
  r && (r.ignore = !0);
}
function Ed(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = th([]);
    return eh(n, n, -r.rotation), e.applyTransform(Ii([], n, r.getLocalTransform())), i.applyTransform(Ii([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function Rd(r) {
  return r === "middle" || r === "center";
}
function Tm(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (se(o, o, t), se(s, s, t));
    var h = new Sr({
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
    qn(h.shape, h.style.lineWidth), h.anid = n + "_" + r[l].tickValue, a.push(h);
  }
  return a;
}
function mA(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), h = Tm(u, t.transform, l, st(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), f = 0; f < h.length; f++)
      r.add(h[f]);
    return h;
  }
}
function _A(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = st(s.getLineStyle(), st(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var f = Tm(o[h], t.transform, l, u, "minorticks_" + h), v = 0; v < f.length; v++)
          r.add(f[v]);
  }
}
function SA(r, t, e, i) {
  var n = e.axis, a = Un(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (Un(i.labelRotate, o.get("rotate")) || 0) * vr / 180, h = mr.innerTextLayout(i.rotation, u, i.labelDirection), f = e.getCategories && e.getCategories(!0), v = [], c = mr.isLabelSilent(e), d = e.get("triggerEvent");
    return M(l, function(y, p) {
      var g = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(y.tickValue) : y.tickValue, m = y.formattedLabel, _ = y.rawLabel, S = o;
      if (f && f[g]) {
        var b = f[g];
        H(b) && b.textStyle && (S = new yt(b.textStyle, o, e.ecModel));
      }
      var w = S.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(g), C = S.getShallow("align", !0) || h.textAlign, A = K(S.getShallow("alignMinLabel", !0), C), D = K(S.getShallow("alignMaxLabel", !0), C), T = S.getShallow("verticalAlign", !0) || S.getShallow("baseline", !0) || h.textVerticalAlign, P = K(S.getShallow("verticalAlignMinLabel", !0), T), L = K(S.getShallow("verticalAlignMaxLabel", !0), T), I = new me({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: h.rotation,
        silent: c,
        z2: 10 + (y.level || 0),
        style: Kn(S, {
          text: m,
          align: p === 0 ? A : p === l.length - 1 ? D : C,
          verticalAlign: p === 0 ? P : p === l.length - 1 ? L : T,
          fill: X(w) ? w(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? g + "" : g,
            p
          ) : w
        })
      });
      if (I.anid = "label_" + g, bh({
        el: I,
        componentModel: e,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return I.isTruncated;
          },
          value: _,
          tickIndex: p
        }
      }), d) {
        var E = mr.makeAxisEventDataBase(e);
        E.targetType = "axisLabel", E.value = _, E.tickIndex = p, n.type === "category" && (E.dataIndex = g), ot(I).eventData = E;
      }
      t.add(I), I.updateTransform(), v.push(I), r.add(I), I.decomposeTransform();
    }), v;
  }
}
function wA(r, t) {
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
  return bA(e, r, t), e.seriesInvolved && TA(e, r), e;
}
function bA(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  M(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = sa(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var h = s.model, f = h.getModel("tooltip", i);
    if (M(s.getAxes(), qt(y, !1, null)), s.getTooltipAxes && i && f.get("show")) {
      var v = f.get("trigger") === "axis", c = f.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(f.get(["axisPointer", "axis"]));
      (v || c) && M(d.baseAxes, qt(y, c ? "cross" : !0, v)), c && M(d.otherAxes, qt(y, "cross", !1));
    }
    function y(p, g, m) {
      var _ = m.model.getModel("axisPointer", n), S = _.get("show");
      if (!(!S || S === "auto" && !p && !$u(_))) {
        g == null && (g = _.get("triggerTooltip")), _ = p ? xA(m, f, n, t, p, g) : _;
        var b = _.get("snap"), w = _.get("triggerEmphasis"), x = sa(m.model), C = g || b || m.type === "category", A = r.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: g,
          triggerEmphasis: w,
          involveSeries: C,
          snap: b,
          useHandle: $u(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = A, r.seriesInvolved = r.seriesInvolved || C;
        var D = CA(a, m);
        if (D != null) {
          var T = o[D] || (o[D] = {
            axesInfo: {}
          });
          T.axesInfo[x] = A, T.mapper = a[D].mapper, A.linkGroup = T;
        }
      }
    }
  });
}
function xA(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  M(s, function(v) {
    l[v] = J(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var h = o.get(["label", "show"]);
    if (u.show = h ?? !0, !a) {
      var f = l.lineStyle = o.get("crossStyle");
      f && st(u, f.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new yt(l, e, i));
}
function TA(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || M(r.coordSysAxesInfo[sa(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function CA(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if ($l(a[i + "AxisId"], e.id) || $l(a[i + "AxisIndex"], e.componentIndex) || $l(a[i + "AxisName"], e.name))
      return n;
  }
}
function $l(r, t) {
  return r === "all" || F(r) && ht(r, t) >= 0 || r === t;
}
function MA(r) {
  var t = ef(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = $u(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function ef(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[sa(r)];
}
function AA(r) {
  var t = ef(r);
  return t && t.axisPointerModel;
}
function $u(r) {
  return !!r.get(["handle", "show"]);
}
function sa(r) {
  return r.type + "||" + r.id;
}
var kd = {}, Cm = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && MA(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
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
        var o = AA(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      kd[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && kd[e];
    }, t.type = "axis", t;
  }(qe)
), zu = _t();
function DA(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, f = zu(r).splitAreaColors, v = q(), c = 0;
      if (f)
        for (var d = 0; d < u.length; d++) {
          var y = f.get(u[d].tickValue);
          if (y != null) {
            c = (y + (h - 1) * d) % h;
            break;
          }
        }
      var p = n.toGlobalCoord(u[0].coord), g = o.getAreaStyle();
      s = F(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var m = n.toGlobalCoord(u[d].coord), _ = void 0, S = void 0, b = void 0, w = void 0;
        n.isHorizontal() ? (_ = p, S = l.y, b = m - _, w = l.height, p = _ + b) : (_ = l.x, S = p, b = l.width, w = m - S, p = S + w);
        var x = u[d - 1].tickValue;
        x != null && v.set(x, c), t.add(new Pt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: S,
            width: b,
            height: w
          },
          style: st({
            fill: s[c]
          }, g),
          autoBatch: !0,
          silent: !0
        })), c = (c + 1) % h;
      }
      zu(r).splitAreaColors = v;
    }
  }
}
function PA(r) {
  zu(r).splitAreaColors = null;
}
var LA = ["axisLine", "axisTickLabel", "axisName"], IA = ["splitArea", "splitLine", "minorSplitLine"], Mm = (
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
      if (this._axisGroup = new kt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = Fu(s, e), u = new mr(e, O({
          handleAutoShown: function(f) {
            for (var v = s.coordinateSystem.getCartesians(), c = 0; c < v.length; c++)
              if (Nu(v[c].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        M(LA, u.add, u), this._axisGroup.add(u.getGroup()), M(IA, function(f) {
          e.get([f, "show"]) && EA[f](this, this._axisGroup, e, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || cg(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      PA(this);
    }, t.type = "cartesianAxis", t;
  }(Cm)
), EA = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = F(s) ? s : [s];
      for (var h = i.coordinateSystem.getRect(), f = n.isHorizontal(), v = 0, c = n.getTicksCoords({
        tickModel: a
      }), d = [], y = [], p = o.getLineStyle(), g = 0; g < c.length; g++) {
        var m = n.toGlobalCoord(c[g].coord);
        if (!(g === 0 && !l || g === c.length - 1 && !u)) {
          var _ = c[g].tickValue;
          f ? (d[0] = m, d[1] = h.y, y[0] = m, y[1] = h.y + h.height) : (d[0] = h.x, d[1] = m, y[0] = h.x + h.width, y[1] = m);
          var S = v++ % s.length, b = new Sr({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: y[0],
              y2: y[1]
            },
            style: st({
              stroke: s[S]
            }, p),
            silent: !0
          });
          qn(b.shape, p.lineWidth), t.add(b);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var h = [], f = [], v = o.getLineStyle(), c = 0; c < u.length; c++)
        for (var d = 0; d < u[c].length; d++) {
          var y = n.toGlobalCoord(u[c][d].coord);
          l ? (h[0] = y, h[1] = s.y, f[0] = y, f[1] = s.y + s.height) : (h[0] = s.x, h[1] = y, f[0] = s.x + s.width, f[1] = y);
          var p = new Sr({
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
          qn(p.shape, v.lineWidth), t.add(p);
        }
  },
  splitArea: function(r, t, e, i) {
    DA(r, t, e, i);
  }
}, Am = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  }(Mm)
), RA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = Am.type, e;
    }
    return t.type = "yAxis", t;
  }(Mm)
), kA = (
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
), Od = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function OA(r) {
  r.registerComponentView(kA), r.registerComponentModel(bM), r.registerCoordinateSystem("cartesian2d", dA), md(r, "x", ku, Od), md(r, "y", ku, Od), r.registerComponentView(Am), r.registerComponentView(RA), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var Zr = _t(), Nd = J, zl = dt, NA = (
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
          s = this._group = new kt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = qt(Bd, e, f);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        $d(s, e, !0), this._renderHandle(a);
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
          var l = ef(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = Zr(t).pointerEl = new tw[a.type](Nd(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = Zr(t).labelEl = new me(Nd(e.label));
        t.add(a), Fd(a, n);
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
      }), Fd(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = vg(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Ty(u.event);
          },
          onmousedown: zl(this._onHandleDragMove, this, 0, 0),
          drift: zl(this._onHandleDragMove, this),
          ondragend: zl(this._onHandleDragEnd, this)
        }), i.add(n)), $d(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        F(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, wy(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      Bd(this._axisPointerModel, !e && this._moveAnimation, this._handle, Hl(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Hl(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Hl(n)), Zr(i).lastProp = null, this._doDispatchAxisPointer();
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
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Tu(this, "_doDispatchAxisPointer");
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
function Bd(r, t, e, i) {
  Dm(Zr(e).lastProp, i) || (Zr(e).lastProp = i, t ? le(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function Dm(r, t) {
  if (H(r) && H(t)) {
    var e = !0;
    return M(t, function(i, n) {
      e = e && Dm(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function Fd(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Hl(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function $d(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function BA(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function FA(r, t, e, i, n) {
  var a = e.get("value"), o = Pm(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = Rh(s.get("padding") || 0), u = s.getFont(), h = ih(o, u), f = n.position, v = h.width + l[1] + l[3], c = h.height + l[0] + l[2], d = n.align;
  d === "right" && (f[0] -= v), d === "center" && (f[0] -= v / 2);
  var y = n.verticalAlign;
  y === "bottom" && (f[1] -= c), y === "middle" && (f[1] -= c / 2), $A(f, v, c, i);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: f[0],
    y: f[1],
    style: Kn(s, {
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
function $A(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function Pm(r, t, e, i, n) {
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
      value: Jh(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    M(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), h = l.dataIndexInside, f = u && u.getDataParams(h);
      f && s.seriesData.push(f);
    }), $(o) ? a = o.replace("{value}", a) : X(o) && (a = o(s));
  }
  return a;
}
function Lm(r, t, e) {
  var i = Li();
  return eh(i, i, e.rotation), Xl(i, i, e.position), wh([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function zA(r, t, e, i, n, a) {
  var o = mr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), FA(t, i, n, a, {
    position: Lm(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function HA(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function VA(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var GA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), h = zd(l, s).getOtherAxis(s).getGlobalExtent(), f = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = BA(a), c = WA[u](s, f, h);
        c.style = v, e.graphicKey = c.type, e.pointer = c;
      }
      var d = Fu(l.model, n);
      zA(
        // @ts-ignore
        i,
        e,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = Fu(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = Lm(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = zd(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, f = [e.x, e.y];
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
  }(NA)
);
function zd(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var WA = {
  line: function(r, t, e) {
    var i = HA([t, e[0]], [t, e[1]], Hd(r));
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
      shape: VA([t - i / 2, e[0]], [i, n], Hd(r))
    };
  }
};
function Hd(r) {
  return r.dim === "x" ? 0 : 1;
}
var UA = (
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
), Ve = _t(), YA = M;
function Im(r, t, e) {
  if (!W.node) {
    var i = t.getZr();
    Ve(i).records || (Ve(i).records = {}), XA(i, t);
    var n = Ve(i).records[r] || (Ve(i).records[r] = {});
    n.handler = e;
  }
}
function XA(r, t) {
  if (Ve(r).initialized)
    return;
  Ve(r).initialized = !0, e("click", qt(Vd, "click")), e("mousemove", qt(Vd, "mousemove")), e("globalout", qA);
  function e(i, n) {
    r.on(i, function(a) {
      var o = KA(t);
      YA(Ve(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), ZA(o.pendings, t);
    });
  }
}
function ZA(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function qA(r, t, e) {
  r.handler("leave", null, e);
}
function Vd(r, t, e, i) {
  t.handler(r, e, i);
}
function KA(r) {
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
function Hu(r, t) {
  if (!W.node) {
    var e = t.getZr(), i = (Ve(e).records || {})[r];
    i && (Ve(e).records[r] = null);
  }
}
var QA = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      Im("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      Hu("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      Hu("axisPointer", i);
    }, t.type = "axisPointer", t;
  }(qe)
);
function Em(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = ai(a, r);
  if (o == null || o < 0 || F(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), f = h.dim, v = u.dim, c = f === "x" || f === "radius" ? 1 : 0, d = a.mapDimension(v), y = [];
      y[c] = a.get(d, o), y[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(y) || [];
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
var Gd = _t();
function jA(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || dt(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    _o(n) && (n = Em({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = _o(n), u = a.axesInfo, h = s.axesInfo, f = i === "leave" || _o(n), v = {}, c = {}, d = {
      list: [],
      map: {}
    }, y = {
      showPointer: qt(tD, c),
      showTooltip: qt(eD, d)
    };
    M(s.coordSysMap, function(g, m) {
      var _ = l || g.containPoint(n);
      M(s.coordSysAxesInfo[m], function(S, b) {
        var w = S.axis, x = aD(u, S);
        if (!f && _ && (!u || x)) {
          var C = x && x.value;
          C == null && !l && (C = w.pointToData(n)), C != null && Wd(S, C, y, !1, v);
        }
      });
    });
    var p = {};
    return M(h, function(g, m) {
      var _ = g.linkGroup;
      _ && !c[m] && M(_.axesInfo, function(S, b) {
        var w = c[b];
        if (S !== g && w) {
          var x = w.value;
          _.mapper && (x = g.axis.scale.parse(_.mapper(x, Ud(S), Ud(g)))), p[g.key] = x;
        }
      });
    }), M(p, function(g, m) {
      Wd(h[m], g, y, !0, v);
    }), rD(c, h, v), iD(d, n, r, o), nD(h, o, e), v;
  }
}
function Wd(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = JA(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && O(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function JA(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return M(t.seriesModels, function(l, u) {
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
      var d = r - f, y = Math.abs(d);
      y <= o && ((y < o || d >= 0 && s < 0) && (o = y, s = d, n = f, a.length = 0), M(v, function(p) {
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
function tD(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function eD(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = sa(l), h = r.map[u];
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
function rD(r, t, e) {
  var i = e.axesInfo = [];
  M(t, function(n, a) {
    var o = n.axisPointerModel.option, s = r[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function iD(r, t, e, i) {
  if (_o(t) || !r.list.length) {
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
function nD(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = Gd(i)[n] || {}, o = Gd(i)[n] = {};
  M(r, function(u, h) {
    var f = u.axisPointerModel.option;
    f.status === "show" && u.triggerEmphasis && M(f.seriesDataIndices, function(v) {
      var c = v.seriesIndex + " | " + v.dataIndex;
      o[c] = v;
    });
  });
  var s = [], l = [];
  M(a, function(u, h) {
    !o[h] && l.push(u);
  }), M(o, function(u, h) {
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
function aD(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function Ud(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function _o(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function Rm(r) {
  Cm.registerAxisPointerClass("CartesianAxisPointer", GA), r.registerComponentModel(UA), r.registerComponentView(QA), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !F(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = wA(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, jA);
}
function oD(r) {
  aa(OA), aa(Rm);
}
var sD = (
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
function km(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function Om(r) {
  if (W.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var Nm = Om(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), lD = Om(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function Bm(r, t) {
  if (!r)
    return t;
  t = Zg(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function uD(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var hD = Bm(lD, "transition"), rf = Bm(Nm, "transform"), fD = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (W.transform3dSupported ? "will-change:transform;" : "");
function cD(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function vD(r, t, e) {
  if (!$(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = oi(t);
  var a = cD(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = rf + ":", u;
  ht(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, f = o + n, v = f * Math.abs(Math.cos(h)) + f * Math.abs(Math.sin(h)), c = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - f) / 2) * 100) / 100;
  s += ";" + a + ":-" + c + "px";
  var d = t + " solid " + n + "px;", y = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + y.join("") + '"></div>';
}
function dD(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += W.transformSupported ? "," + rf + i : ",left" + i + ",top" + i), hD + ":" + n;
}
function Yd(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!W.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = W.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + rf + ":" + o + ";" : [["top", 0], ["left", 0], [Nm, o]];
}
function pD(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = K(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), M(["decoration", "align"], function(u) {
    var h = r.get(u);
    h && t.push("text-" + u + ":" + h);
  }), t.join(";");
}
function gD(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), h = r.getModel("textStyle"), f = ny(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(dD(n, e)), a && i.push("background-color:" + a), M(["width", "color", "radius"], function(c) {
    var d = "border-" + c, y = Zg(d), p = r.get(y);
    p != null && i.push(d + ":" + p + (c === "color" ? "" : "px"));
  }), i.push(pD(h)), f != null && i.push("padding:" + Rh(f).join("px ") + "px"), i.join(";") + ";";
}
function Xd(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && ib(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var yD = (
  /** @class */
  function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, W.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && ($(a) ? document.querySelector(a) : Wn(a) ? a : X(a) && a(t.getDom()));
      Xd(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, h = n.painter.getViewportRoot();
          te(h, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = uD(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = fD + gD(t, !this._firstShow, this._longHide) + Yd(a[0], a[1], !0) + ("border-color:" + oi(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if ($(a) && i.get("trigger") === "item" && !km(i) && (s = vD(i, n, a)), $(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", F(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Wn(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if (Xd(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = Yd(i[0], i[1]);
          M(a, function(o) {
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
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(dt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  }()
), mD = (
  /** @class */
  function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), qd(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      H(t) && $t(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new me({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: ny(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), M(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), M(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
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
      var t = this.el, e = this.el.getBoundingRect(), i = Zd(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        qd(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = hr(a.borderWidth || 0), s = Zd(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(dt(this.hide, this), t)) : this.hide());
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
function Zd(r) {
  var t = hr(r.shadowBlur || 0), e = hr(r.shadowOffsetX || 0), i = hr(r.shadowOffsetY || 0);
  return {
    left: hr(t - e),
    right: hr(t + e),
    top: hr(t - i),
    bottom: hr(t + i)
  };
}
function qd(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var _D = new Pt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), SD = (
  /** @class */
  function(r) {
    B(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(W.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = z1(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new mD(i) : new yD(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(W.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? wy(this, "_updatePosition", 50, "fixRate") : Tu(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      Im("itemTooltip", this._api, dt(function(n, a, o) {
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
        var o = Kd(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = TD(a, i, n);
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
          var h = _D;
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
          var f = Em(a, i), v = f.point[0], c = f.point[1];
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Kd(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), f = _n([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
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
          var s = ot(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          Mn(n, function(h) {
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
      i = dt(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = _n([i.tooltipOption], a), l = this._renderMode, u = [], h = ta("section", {
        blocks: [],
        noHeader: !0
      }), f = [], v = new fl();
      M(e, function(m) {
        M(m.dataByAxis, function(_) {
          var S = n.getComponent(_.axisDim + "Axis", _.axisIndex), b = _.value;
          if (!(!S || b == null)) {
            var w = Pm(b, S.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = ta("section", {
              header: w,
              noHeader: !Me(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), M(_.seriesDataIndices, function(C) {
              var A = n.getSeriesByIndex(C.seriesIndex), D = C.dataIndexInside, T = A.getDataParams(D);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = Jh(S.axis, {
                  value: b
                }), T.axisValueLabel = w, T.marker = v.makeTooltipMarker("item", oi(T.color), l);
                var P = qc(A.formatTooltip(D, !0, null)), L = P.frag;
                if (L) {
                  var I = _n([A], a).get("valueFormatter");
                  x.blocks.push(I ? O({
                    valueFormatter: I
                  }, L) : L);
                }
                P.text && f.push(P.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), f.reverse();
      var c = i.position, d = s.get("order"), y = jc(h, v, l, d, n.get("useUTC"), s.get("textStyle"));
      y && f.unshift(y);
      var p = l === "richText" ? `

` : "<br/>", g = f.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, g, u, Math.random() + "", o[0], o[1], c, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = ot(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, f = o.dataType, v = u.getData(f), c = this._renderMode, d = e.positionDefault, y = _n([v.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), p = y.get("trigger");
      if (!(p != null && p !== "item")) {
        var g = u.getDataParams(h, f), m = new fl();
        g.marker = m.makeTooltipMarker("item", oi(g.color), c);
        var _ = qc(u.formatTooltip(h, !1, f)), S = y.get("order"), b = y.get("valueFormatter"), w = _.frag, x = w ? jc(b ? O({
          valueFormatter: b
        }, w) : w, m, c, S, a.get("useUTC"), y.get("textStyle")) : _.text, C = "item_" + u.name + "_" + h;
        this._showOrMove(y, function() {
          this._showTooltipContent(y, x, g, C, e.offsetX, e.offsetY, e.position, e.target, m);
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
      if ($(l)) {
        var h = l;
        l = {
          content: h,
          // Fixed formatter
          formatter: h
        }, u = !0;
      }
      u && a && l.content && (l = J(l), l.content = zt(l.content));
      var f = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && f.push(v), f.push({
        formatter: l.content
      });
      var c = e.positionDefault, d = _n(f, this._tooltipModel, c ? {
        position: c
      } : null), y = d.get("content"), p = Math.random() + "", g = new fl();
      this._showOrMove(d, function() {
        var m = J(d.get("formatterParams") || {});
        this._showTooltipContent(d, y, m, p, e.offsetX, e.offsetY, e.position, i, g);
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
        var c = i, d = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), y = d.color;
        if (v)
          if ($(v)) {
            var p = e.ecModel.get("useUTC"), g = F(n) ? n[0] : n, m = g && g.axisType && g.axisType.indexOf("time") >= 0;
            c = v, m && (c = ps(g.axisValue, c, p)), c = qg(c, n, !0);
          } else if (X(v)) {
            var _ = dt(function(S, b) {
              S === this._ticket && (f.setContent(b, h, e, y, l), this._updatePosition(e, l, o, s, f, n, u));
            }, this);
            this._ticket = a, c = v(n, a, _);
          } else
            c = v;
        f.setContent(c, h, e, y, l), f.show(e, y), this._updatePosition(e, l, o, s, f, n, u);
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
      var u = this._api.getWidth(), h = this._api.getHeight();
      i = i || e.get("position");
      var f = o.getSize(), v = e.get("align"), c = e.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), X(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, h],
        contentSize: f.slice()
      })), F(i))
        n = Et(i[0], u), a = Et(i[1], h);
      else if (H(i)) {
        var y = i;
        y.width = f[0], y.height = f[1];
        var p = Qg(y, {
          width: u,
          height: h
        });
        n = p.x, a = p.y, v = null, c = null;
      } else if ($(i) && l) {
        var g = xD(i, d, f, e.get("borderWidth"));
        n = g[0], a = g[1];
      } else {
        var g = wD(n, a, o, u, h, v ? null : 20, c ? null : 20);
        n = g[0], a = g[1];
      }
      if (v && (n -= Qd(v) ? f[0] / 2 : v === "right" ? f[0] : 0), c && (a -= Qd(c) ? f[1] / 2 : c === "bottom" ? f[1] : 0), km(e)) {
        var g = bD(n, a, o, u, h);
        n = g[0], a = g[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && M(n, function(s, l) {
        var u = s.dataByAxis || [], h = e[l] || {}, f = h.dataByAxis || [];
        o = o && u.length === f.length, o && M(u, function(v, c) {
          var d = f[c] || {}, y = v.seriesDataIndices || [], p = d.seriesDataIndices || [];
          o = o && v.value === d.value && v.axisType === d.axisType && v.axisId === d.axisId && y.length === p.length, o && M(y, function(g, m) {
            var _ = p[m];
            o = o && g.seriesIndex === _.seriesIndex && g.dataIndex === _.dataIndex;
          }), a && M(v.seriesDataIndices, function(g) {
            var m = g.seriesIndex, _ = i[m], S = a[m];
            _ && S && S.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(e, i) {
      W.node || !i.getDom() || (Tu(this, "_updatePosition"), this._tooltipContent.dispose(), Hu("itemTooltip", i));
    }, t.type = "tooltip", t;
  }(qe)
);
function _n(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new yt(e, i, i), n = new yt(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof yt && (o = o.get("tooltip", !0)), $(o) && (o = {
      formatter: o
    }), o && (n = new yt(o, n, i)));
  }
  return n;
}
function Kd(r, t) {
  return r.dispatchAction || dt(t.dispatchAction, t);
}
function wD(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function bD(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function xD(r, t, e, i) {
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
function Qd(r) {
  return r === "center" || r === "middle";
}
function TD(r, t, e) {
  var i = uh(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = ga(t, n, i.get(n), {
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
function CD(r) {
  aa(Rm), r.registerComponentModel(sD), r.registerComponentView(SD), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Vt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Vt);
}
function jd(r, t, e) {
  var i = Ui.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var Vl = function(r) {
  B(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Po, typeof e == "string" ? o = jd(e, i, n) : H(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (pp(o), o.onselectstart = function() {
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
    this.domBack = jd("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new rt(0, 0, 0, 0);
    function h(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new rt(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var S = !1, b = 1 / 0, w = 0, x = 0; x < o.length; ++x) {
            var C = o[x];
            if (C.intersect(m)) {
              var A = new rt(0, 0, 0, 0);
              A.copy(C), A.union(m), o[x] = A, S = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(C);
              var D = m.width * m.height, T = C.width * C.height, P = u.width * u.height, L = P - D - T;
              L < b && (b = L, w = x);
            }
          }
          if (l && (o[w].union(m), S = !0), !S) {
            var _ = new rt(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var f = this.__startIndex; f < this.__endIndex; ++f) {
      var v = e[f];
      if (v) {
        var c = v.shouldBePainted(n, a, !0, !0), d = v.__isRendered && (v.__dirty & Zt || !c) ? v.getPrevPaintRect() : null;
        d && h(d);
        var y = c && (v.__dirty & Zt || !v.__isRendered) ? v.getPaintRect() : null;
        y && h(y);
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
        for (var g = f + 1; g < o.length; )
          o[f].intersect(o[g]) ? (p = !0, o[f].union(o[g]), o.splice(g, 1)) : g++;
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
    function d(y, p, g, m) {
      if (o.clearRect(y, p, g, m), i && i !== "transparent") {
        var _ = void 0;
        if (Qo(i)) {
          var S = i.global || i.__width === g && i.__height === m;
          _ = S && i.__canvasGradient || Pu(o, i, {
            x: 0,
            y: 0,
            width: g,
            height: m
          }), i.__canvasGradient = _, i.__width = g, i.__height = m;
        } else k0(i) && (i.scaleX = i.scaleX || f, i.scaleY = i.scaleY || f, _ = Lu(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(y, p, g, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(c, y, p, g, m), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && M(n, function(y) {
      d(y.x * f, y.y * f, y.width * f, y.height * f);
    });
  }, t;
}(ke), Jd = 1e5, Xr = 314159, ro = 0.01, MD = 1e-3;
function AD(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function DD(r, t) {
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
var PD = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = O({}, i || {}), this.dpr = i.devicePixelRatio || Po, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (pp(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, f = h.width, v = h.height;
      i.width != null && (f = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, h.width = f * this.dpr, h.height = v * this.dpr, this._width = f, this._height = v;
      var c = new Vl(h, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), l[Xr] = c, c.zlevel = Xr, s.push(Xr), this._domRoot = t;
    } else {
      this._width = qa(t, 0, i), this._height = qa(t, 1, i);
      var u = this._domRoot = DD(this._width, this._height);
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
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Jd)), a || (a = i.ctx, a.save()), jr(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Jd);
  }, r.prototype.paintOne = function(t, e) {
    Uy(t, e);
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
        Vo(function() {
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
    for (var h = !0, f = !1, v = function(y) {
      var p = a[y], g = p.ctx, m = o && p.createRepaintRects(t, e, c._width, c._height), _ = i ? p.__startIndex : p.__drawIndex, S = !i && p.incremental && Date.now, b = S && Date.now(), w = p.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, w, m);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && p.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var C, A = function(L) {
        var I = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (C = _; C < p.__endIndex; C++) {
          var E = t[C];
          if (E.__inHover && (f = !0), n._doPaintEl(E, p, o, L, I, C === p.__endIndex - 1), S) {
            var R = Date.now() - b;
            if (R > 15)
              break;
          }
        }
        I.prevElClipPaths && g.restore();
      };
      if (m)
        if (m.length === 0)
          C = p.__endIndex;
        else
          for (var D = c.dpr, T = 0; T < m.length; ++T) {
            var P = m[T];
            g.save(), g.beginPath(), g.rect(P.x * D, P.y * D, P.width * D, P.height * D), g.clip(), A(P), g.restore();
          }
      else
        g.save(), A(), g.restore();
      p.__drawIndex = C, p.__drawIndex < p.__endIndex && (h = !1);
    }, c = this, d = 0; d < a.length; d++)
      v(d);
    return W.wxa && M(this._layers, function(y) {
      y && y.ctx && y.ctx.draw && y.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: f
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
    return i || (i = new Vl("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? it(i, this._layerConfig[t], !0) : this._layerConfig[t - ro] && it(i, this._layerConfig[t - ro], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && AD(e)) {
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
      s !== u && (s = u, o = 0), n.incremental ? (h = this.getLayer(u + MD, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? ro : 0), this._needsManuallyCompositing), h.__builtin__ || Qu("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), a = h), n.__dirty & Zt && !n.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(f, v) {
      !f.__used && f.getElementCount() > 0 && (f.__dirty = !0, f.__startIndex = f.__endIndex = f.__drawIndex = 0), f.__dirty && f.__drawIndex < 0 && (f.__drawIndex = f.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, M(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? it(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + ro) {
          var o = this._layers[a];
          it(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(ht(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = qa(a, 0, n), e = qa(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
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
    var e = new Vl("image", this, t.pixelRatio || this.dpr);
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
        jr(i, h, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function LD(r) {
  r.registerPainter("canvas", PD);
}
var ID = Object.defineProperty, ED = Object.getOwnPropertyDescriptor, nf = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? ED(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && ID(t, e, n), n;
};
aa([uT, zx, oD, CD, LD]);
let la = class extends Ge {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".canvas");
    this.chart = vM(r, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(r), this.applyOption();
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
    return Y`<div class="canvas" style="height:${this.height}"></div>`;
  }
};
la.styles = Wi`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
nf([
  Ot({ attribute: !1 })
], la.prototype, "option", 2);
nf([
  Ot({ type: String })
], la.prototype, "height", 2);
la = nf([
  ha("ia-chart")
], la);
const Fm = Wi`
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
var RD = Object.defineProperty, kD = Object.getOwnPropertyDescriptor, Ts = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? kD(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && RD(t, e, n), n;
};
let Vi = class extends Ge {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  renderCards() {
    const { rating_per_phase: r } = this.phases;
    return Y`<div class="cards">
      ${this.phases.per_phase.map((t) => {
      const e = this.series[t.key]?.coverage;
      return Y`<div class="card">
          <span class="name">${t.label}</span>
          <span class="value">${Mt(t.mean, this.locale)}</span>
          <span class="row"><span>Peak</span><span>${Mt(t.peak, this.locale)}</span></span>
          <span class="row"><span>P95</span><span>${Mt(t.p95, this.locale)}</span></span>
          <span class="row"><span>Share of load</span><span>${Ct(t.share, this.locale)}</span></span>
          <span class="row">
            <span>Peak vs ${Mt(r, this.locale)}</span>
            <span>${Ct(t.headroom, this.locale)}</span>
          </span>
          ${e !== void 0 && e < 0.95 ? Y`<span class="warn">Covers ${Ct(e, this.locale)} of the period</span>` : et}
        </div>`;
    })}
    </div>`;
  }
  renderImbalance() {
    const { imbalance: r } = this.phases;
    return r.mean === null ? Y`<p class="empty">
        Total load never rose above ${Mt(r.floor_w, this.locale)}, so there was
        nothing to measure the spread against in this period.
      </p>` : Y`
      <div class="cards">
        <div class="card">
          <span class="name">Mean imbalance</span>
          <span class="value">${Ct(r.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">P95 imbalance</span>
          <span class="value">${Ct(r.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">Above ${Ct(r.threshold, this.locale)}</span>
          <span class="value">${Ct(r.fraction_above, this.locale)}</span>
          <span class="row"><span>of the measured time</span></span>
        </div>
      </div>
      <ia-chart .option=${S0(r)}></ia-chart>
      <p class="note">
        Measured over ${no(r.analysed_seconds)}
        (${Ct(r.coverage, this.locale)} of the period). A further
        ${no(r.below_floor_seconds)} sat below
        ${Mt(r.floor_w, this.locale)} of total load and is excluded: at standby
        power a few watts of difference is a large percentage and means nothing.
      </p>
    `;
  }
  renderEpisodes() {
    const { episodes: r, per_phase: t } = this.phases;
    return r.length ? Y`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          <th>Worst</th>
          ${t.map((e) => Y`<th>${e.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${r.map(
      (e) => Y`<tr>
            <td>${new Date(e.start).toLocaleString(this.locale)}</td>
            <td>${no(e.seconds)}</td>
            <td>${Ct(e.peak_imbalance, this.locale)}</td>
            ${e.phases.map((i) => Y`<td>${Mt(i, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>` : Y`<p class="empty">No sustained imbalance in this period.</p>`;
  }
  render() {
    const { imbalance: r, rating_per_phase: t, rating_per_phase_derived: e, rating_per_phase_divisor: i } = this.phases;
    return Y`
      <section>
        <h2>Phases</h2>
        ${this.renderCards()}
        ${e ? Y`<p class="note">
              No per-phase rating is configured, so the total is split across
              ${i} phases — ${Mt(t, this.locale)}
              each. Set the real figure in the integration's options if the hardware differs.
            </p>` : et}
        ${r.aligned_coverage < 0.95 ? Y`<p class="warn">
              All phases had data at the same moment for only
              ${Ct(r.aligned_coverage, this.locale)} of the period. The spread
              cannot be measured while any one phase is unknown.
            </p>` : et}

        <h3>Imbalance</h3>
        ${this.renderImbalance()}

        <h3>Sustained imbalance episodes</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
Vi.styles = [Fm, Wi`:host { display: block; }`];
Ts([
  Ot({ attribute: !1 })
], Vi.prototype, "phases", 2);
Ts([
  Ot({ attribute: !1 })
], Vi.prototype, "series", 2);
Ts([
  Ot({ type: String })
], Vi.prototype, "locale", 2);
Vi = Ts([
  ha("ia-phases-section")
], Vi);
var OD = Object.defineProperty, ND = Object.getOwnPropertyDescriptor, Cs = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? ND(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && OD(t, e, n), n;
};
let Gi = class extends Ge {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en";
  }
  render() {
    const { parts: r, aligned_coverage: t } = this.strings;
    return Y`
      <section>
        <h2>PV strings</h2>
        <div class="cards">
          ${r.map((e) => {
      const i = this.series[e.key]?.coverage;
      return Y`<div class="card">
              <span class="name">${e.label}</span>
              <span class="value">${Mt(e.mean, this.locale)}</span>
              <span class="row"><span>Peak</span><span>${Mt(e.peak, this.locale)}</span></span>
              <span class="row"><span>Share of PV</span><span>${Ct(e.share, this.locale)}</span></span>
              ${i !== void 0 && i < 0.95 ? Y`<span class="warn">Covers ${Ct(i, this.locale)} of the period</span>` : et}
            </div>`;
    })}
        </div>
        <ia-chart .option=${w0(r, Ue.pv)}></ia-chart>
        ${t < 0.95 ? Y`<p class="warn">
              All strings had data at the same moment for only
              ${Ct(t, this.locale)} of the period, so the shares are of
              that time rather than the whole window.
            </p>` : et}
        <p class="note">
          A string consistently below its neighbour points at shading, a different orientation or
          a fault. Compare mean rather than peak: peaks coincide, averages do not.
        </p>
      </section>
    `;
  }
};
Gi.styles = [Fm, Wi`:host { display: block; }`];
Cs([
  Ot({ attribute: !1 })
], Gi.prototype, "strings", 2);
Cs([
  Ot({ attribute: !1 })
], Gi.prototype, "series", 2);
Cs([
  Ot({ type: String })
], Gi.prototype, "locale", 2);
Gi = Cs([
  ha("ia-strings-section")
], Gi);
var BD = Object.defineProperty, FD = Object.getOwnPropertyDescriptor, br = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? FD(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && BD(t, e, n), n;
};
let Ee = class extends Ge {
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
      const { start: t, end: e } = d0(this.range, /* @__PURE__ */ new Date()), i = await h0(this.hass, this.entryId, t, e);
      if (r !== this.requestId) return;
      this.payload = i;
    } catch (t) {
      if (r !== this.requestId) return;
      this.error = sp(t);
    } finally {
      r === this.requestId && (this.loading = !1);
    }
  }
  renderKpi(r) {
    const t = this.hass.locale.language, e = (n) => n === null ? "" : Ct(n / r.rated_power, t) + " of rated", i = [
      ["Mean", Mt(r.kpi.mean, t), e(r.kpi.mean)],
      ["Median", Mt(r.kpi.median, t), ""],
      ["P95", Mt(r.kpi.p95, t), ""],
      ["Peak", Mt(r.kpi.max, t), e(r.kpi.max)],
      ["Sustained 15 min", Mt(r.kpi.max_sustained_15m, t), ""],
      [">80% of rated", Ct(r.kpi.fraction_above_80pct, t), "of time"]
    ];
    return Y`<div class="kpi">
      ${i.map(
      ([n, a, o]) => Y`<div class="cell">
          <span class="label">${n}</span>
          <span class="value">${a}</span>
          <span class="hint">${o}</span>
        </div>`
    )}
    </div>`;
  }
  renderOverloads(r) {
    if (!r.overloads.length)
      return Y`<p class="empty">No overloads in this period.</p>`;
    const t = this.hass.locale.language;
    return Y`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Peak</th></tr>
      </thead>
      <tbody>
        ${r.overloads.map(
      (e) => Y`<tr>
            <td>${new Date(e.start).toLocaleString(t)}</td>
            <td>${no(e.seconds)}</td>
            <td>${Mt(e.peak, t)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    if (this.error)
      return Y`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    if (!this.payload)
      return Y`<div class="notice">Computing…</div>`;
    const r = this.payload, t = this.hass.locale.language;
    return Y`
      <div class="status">
        <span class="badge">${f0(r.precision, r.boundary, t)}</span>
        ${mf(r.coverage, t) ? Y`<span class="warn">${mf(r.coverage, t)}</span>` : et}
        ${r.clamped ? Y`<span class="warn">Period shortened to the maximum allowed</span>` : et}
        ${r.histogram.clipped_low_seconds + r.histogram.clipped_high_seconds > 0 ? Y`<span class="warn">
              Some values fell outside the histogram range and are shown in its edge buckets
            </span>` : et}
        ${this.loading ? Y`<span class="warn">Refreshing…</span>` : et}
      </div>

      ${this.renderKpi(r)}

      <section>
        <header>
          <h2>Time spent at each power level</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? "as % of rated" : "in watts"}</button>
        </header>
        <ia-chart .option=${y0(r, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Load duration curve</h2>
        <ia-chart .option=${m0(r)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across rated-power bands</h2>
        <ia-chart .option=${_0(r)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Overload episodes</h2>
        ${this.renderOverloads(r)}
      </section>

      ${r.phases ? Y`<ia-phases-section
            .phases=${r.phases}
            .series=${r.series}
            .locale=${t}
          ></ia-phases-section>` : et}

      ${r.strings ? Y`<ia-strings-section
            .strings=${r.strings}
            .series=${r.series}
            .locale=${t}
          ></ia-strings-section>` : et}
    `;
  }
};
Ee.styles = Wi`
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
  Ot({ attribute: !1 })
], Ee.prototype, "hass", 2);
br([
  Ot({ type: String })
], Ee.prototype, "entryId", 2);
br([
  Ot({ type: String })
], Ee.prototype, "range", 2);
br([
  Ke()
], Ee.prototype, "payload", 2);
br([
  Ke()
], Ee.prototype, "error", 2);
br([
  Ke()
], Ee.prototype, "loading", 2);
br([
  Ke()
], Ee.prototype, "mode", 2);
Ee = br([
  ha("ia-load-tab")
], Ee);
var $D = Object.defineProperty, zD = Object.getOwnPropertyDescriptor, Je = (r, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? zD(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && $D(t, e, n), n;
};
const HD = "/inverter-analytics", tp = [
  { id: "load", label: "Load" },
  { id: "battery", label: "Battery" },
  { id: "seasonal", label: "Seasonality" },
  { id: "balance", label: "Balance" }
];
let _e = class extends Ge {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.readLocation = () => {
      const r = p0(
        window.location.pathname,
        window.location.search,
        tp.map((t) => t.id),
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = r.tab, this.range = r.range, this.entryId = r.entryId;
    }, this.loadConfig = c0(() => this.requestConfig());
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
    const t = g0(HD, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    r ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await u0(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
    } catch (r) {
      this.error = sp(r);
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
    return this.error ? Y`<div class="notice">
        Could not load configuration: ${this.error}
        <button @click=${() => {
      this.error = void 0, this.loadConfig();
    }}>
          Try again
        </button>
      </div>` : this.config ? this.config.entries.length ? Y`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1 ? Y`<select
              .value=${this.entryId ?? ""}
              @change=${(r) => {
      this.selectEntry(r.target.value);
    }}
            >
              ${this.config.entries.map(
      (r) => Y`<option value=${r.entry_id}>${r.title}</option>`
    )}
            </select>` : et}
        <div class="ranges">
          ${lp.map(
      (r) => Y`<button
              class=${r === this.range ? "active" : ""}
              @click=${() => this.selectRange(r)}
            >${v0[r]}</button>`
    )}
        </div>
      </div>

      <nav class="tabs">
        ${tp.map(
      (r) => Y`<button
            class=${r.id === this.tab ? "active" : ""}
            @click=${() => this.selectTab(r.id)}
          >${r.label}</button>`
    )}
      </nav>

      <main>
        ${this.tab === "load" ? Y`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : Y`<div class="notice">This tab is not built yet.</div>`}
      </main>
    ` : Y`<div class="notice">
        No inverter is configured yet. Add the Inverter Analytics integration in settings.
      </div>` : Y`<div class="notice">Loading…</div>`;
  }
};
_e.styles = Wi`
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
Je([
  Ot({ attribute: !1 })
], _e.prototype, "hass", 2);
Je([
  Ot({ type: Boolean })
], _e.prototype, "narrow", 2);
Je([
  Ot({ attribute: !1 })
], _e.prototype, "route", 2);
Je([
  Ke()
], _e.prototype, "config", 2);
Je([
  Ke()
], _e.prototype, "error", 2);
Je([
  Ke()
], _e.prototype, "entryId", 2);
Je([
  Ke()
], _e.prototype, "tab", 2);
Je([
  Ke()
], _e.prototype, "range", 2);
_e = Je([
  ha("inverter-analytics-panel")
], _e);
export {
  _e as InverterAnalyticsPanel
};

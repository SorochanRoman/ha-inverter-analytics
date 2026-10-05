/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hs = globalThis, Dc = hs.ShadowRoot && (hs.ShadyCSS === void 0 || hs.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ac = Symbol(), Vf = /* @__PURE__ */ new WeakMap();
let uy = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== Ac) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Dc && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Vf.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Vf.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ub = (e) => new uy(typeof e == "string" ? e : e + "", void 0, Ac), ue = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, a) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new uy(r, e, Ac);
}, hb = (e, t) => {
  if (Dc) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = hs.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Gf = Dc ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return ub(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: cb, defineProperty: fb, getOwnPropertyDescriptor: db, getOwnPropertyNames: vb, getOwnPropertySymbols: pb, getPrototypeOf: gb } = Object, ol = globalThis, Wf = ol.trustedTypes, yb = Wf ? Wf.emptyScript : "", mb = ol.reactiveElementPolyfillSupport, Aa = (e, t) => e, Is = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yb : null;
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
} }, Ic = (e, t) => !cb(e, t), Uf = { attribute: !0, type: String, converter: Is, reflect: !1, useDefault: !1, hasChanged: Ic };
Symbol.metadata ??= Symbol("metadata"), ol.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let hi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Uf) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && fb(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: a } = db(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Uf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Aa("elementProperties"))) return;
    const t = gb(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Aa("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Aa("properties"))) {
      const r = this.properties, n = [...vb(r), ...pb(r)];
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
      for (const i of n) r.unshift(Gf(i));
    } else t !== void 0 && r.push(Gf(t));
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
    return hb(t, this.constructor.elementStyles), t;
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
      const a = (n.converter?.toAttribute !== void 0 ? n.converter : Is).toAttribute(r, n.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Is;
      this._$Em = i;
      const s = o.fromAttribute(r, a.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, a) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[t]), n ??= o.getPropertyOptions(t), !((n.hasChanged ?? Ic)(a, r) || n.useDefault && n.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, n)))) return;
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
hi.elementStyles = [], hi.shadowRootOptions = { mode: "open" }, hi[Aa("elementProperties")] = /* @__PURE__ */ new Map(), hi[Aa("finalized")] = /* @__PURE__ */ new Map(), mb?.({ ReactiveElement: hi }), (ol.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $c = globalThis, Yf = (e) => e, $s = $c.trustedTypes, Xf = $s ? $s.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, hy = "$lit$", kr = `lit$${Math.random().toFixed(9).slice(2)}$`, cy = "?" + kr, _b = `<${cy}>`, Rn = document, Ha = () => Rn.createComment(""), Va = (e) => e === null || typeof e != "object" && typeof e != "function", Lc = Array.isArray, bb = (e) => Lc(e) || typeof e?.[Symbol.iterator] == "function", Ul = `[ 	
\f\r]`, Ki = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qf = /-->/g, Zf = />/g, Qr = RegExp(`>|${Ul}(?:([^\\s"'>=/]+)(${Ul}*=${Ul}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kf = /'/g, jf = /"/g, fy = /^(?:script|style|textarea|title)$/i, wb = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), I = wb(1), Ai = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), Qf = /* @__PURE__ */ new WeakMap(), Cn = Rn.createTreeWalker(Rn, 129);
function dy(e, t) {
  if (!Lc(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Xf !== void 0 ? Xf.createHTML(t) : t;
}
const Sb = (e, t) => {
  const r = e.length - 1, n = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ki;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let u, h, c = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, h = o.exec(l), h !== null); ) f = o.lastIndex, o === Ki ? h[1] === "!--" ? o = qf : h[1] !== void 0 ? o = Zf : h[2] !== void 0 ? (fy.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = Qr) : h[3] !== void 0 && (o = Qr) : o === Qr ? h[0] === ">" ? (o = i ?? Ki, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? Qr : h[3] === '"' ? jf : Kf) : o === jf || o === Kf ? o = Qr : o === qf || o === Zf ? o = Ki : (o = Qr, i = void 0);
    const d = o === Qr && e[s + 1].startsWith("/>") ? " " : "";
    a += o === Ki ? l + _b : c >= 0 ? (n.push(u), l.slice(0, c) + hy + l.slice(c) + kr + d) : l + kr + (c === -2 ? s : d);
  }
  return [dy(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ga {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, h] = Sb(t, r);
    if (this.el = Ga.createElement(u, n), Cn.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = Cn.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(hy)) {
          const f = h[o++], d = i.getAttribute(c).split(kr), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: a, name: v[2], strings: d, ctor: v[1] === "." ? Tb : v[1] === "?" ? Cb : v[1] === "@" ? Mb : sl }), i.removeAttribute(c);
        } else c.startsWith(kr) && (l.push({ type: 6, index: a }), i.removeAttribute(c));
        if (fy.test(i.tagName)) {
          const c = i.textContent.split(kr), f = c.length - 1;
          if (f > 0) {
            i.textContent = $s ? $s.emptyScript : "";
            for (let d = 0; d < f; d++) i.append(c[d], Ha()), Cn.nextNode(), l.push({ type: 2, index: ++a });
            i.append(c[f], Ha());
          }
        }
      } else if (i.nodeType === 8) if (i.data === cy) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(kr, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += kr.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const n = Rn.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ii(e, t, r = e, n) {
  if (t === Ai) return t;
  let i = n !== void 0 ? r._$Co?.[n] : r._$Cl;
  const a = Va(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ??= [])[n] = i : r._$Cl = i), i !== void 0 && (t = Ii(e, i._$AS(e, t.values), i, n)), t;
}
class xb {
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
    const { el: { content: r }, parts: n } = this._$AD, i = (t?.creationScope ?? Rn).importNode(r, !0);
    Cn.currentNode = i;
    let a = Cn.nextNode(), o = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ho(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new Db(a, this, t)), this._$AV.push(u), l = n[++s];
      }
      o !== l?.index && (a = Cn.nextNode(), o++);
    }
    return Cn.currentNode = Rn, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class ho {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = Ii(this, t, r), Va(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== Ai && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bb(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== O && Va(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Rn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ga.createElement(dy(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const a = new xb(i, this), o = a.u(this.options);
      a.p(r), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = Qf.get(t.strings);
    return r === void 0 && Qf.set(t.strings, r = new Ga(t)), r;
  }
  k(t) {
    Lc(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const a of t) i === r.length ? r.push(n = new ho(this.O(Ha()), this.O(Ha()), this, this.options)) : n = r[i], n._$AI(a), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const n = Yf(t).nextSibling;
      Yf(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class sl {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, a) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = O;
  }
  _$AI(t, r = this, n, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Ii(this, t, r, 0), o = !Va(t) || t !== this._$AH && t !== Ai, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Ii(this, s[n + l], r, l), u === Ai && (u = this._$AH[l]), o ||= !Va(u) || u !== this._$AH[l], u === O ? t = O : t !== O && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tb extends sl {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class Cb extends sl {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class Mb extends sl {
  constructor(t, r, n, i, a) {
    super(t, r, n, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ii(this, t, r, 0) ?? O) === Ai) return;
    const n = this._$AH, i = t === O && n !== O || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== O && (n === O || i);
    i && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Db {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ii(this, t);
  }
}
const Ab = $c.litHtmlPolyfillSupport;
Ab?.(Ga, ho), ($c.litHtmlVersions ??= []).push("3.3.3");
const Ib = (e, t, r) => {
  const n = r?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const a = r?.renderBefore ?? null;
    n._$litPart$ = i = new ho(t.insertBefore(Ha(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pc = globalThis;
class Ht extends hi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ib(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ai;
  }
}
Ht._$litElement$ = !0, Ht.finalized = !0, Pc.litElementHydrateSupport?.({ LitElement: Ht });
const $b = Pc.litElementPolyfillSupport;
$b?.({ LitElement: Ht });
(Pc.litElementVersions ??= []).push("4.2.2");
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
const Lb = { attribute: !0, type: String, converter: Is, reflect: !1, hasChanged: Ic }, Pb = (e = Lb, t, r) => {
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
function rt(e) {
  return (t, r) => typeof r == "object" ? Pb(e, t, r) : ((n, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, n), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function mt(e) {
  return rt({ ...e, state: !0, attribute: !1 });
}
function Rb(e) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/config"
  });
}
function Ob(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/load",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Eb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/battery",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function kb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/seasonality",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Nb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/balance",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Bb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/grid",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function zb(e, t, r, n) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/sizing",
    entry_id: t,
    start: r.toISOString(),
    end: n.toISOString()
  });
}
function Fb(e, t) {
  return e.connection.sendMessagePromise({
    type: "inverter_analytics/health",
    entry_id: t
  });
}
const Jf = /* @__PURE__ */ new Map();
function Hb(e) {
  let t = Jf.get(e);
  return t || (t = new Intl.PluralRules(e), Jf.set(e, t)), t;
}
function Ct(e, t, r) {
  const n = Hb(e).select(t);
  return n === "one" ? r.one : n === "few" ? r.few ?? r.other : n === "many" ? r.many ?? r.other : r.other;
}
const Vb = {
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
    // Under an episode table the backend capped at its longest entries.
    longestShown: (e) => Ct("en", e.shown, {
      one: `The longest of ${e.total} is shown.`,
      other: `The ${e.shown} longest of ${e.total} are shown, in time order.`
    }),
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
    outagesBegan: (e) => e.n === 0 ? "no outages began" : Ct("en", e.n, {
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
    // one sentence never says nine months are faded when one of them is.
    thinMonths: (e) => Ct("en", e.n, {
      one: `One month is covered by less than ${e.share} of its days and is drawn faded.`,
      other: `${e.n} months are covered by less than ${e.share} of their days and are drawn faded.`
    }),
    partialNotLower: "A month the recorder only saw part of is not a lower month; the figures stand, the comparison does not.",
    absentMonths: (e) => Ct("en", e.n, {
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
    dayByDayNote: "Two bars a day: what came in, and what went out. Adding the two together would count the same energy twice. Energy is read from Home Assistant's hourly statistics, which is where counter resets are already accounted for. The current hour is compiled only once it ends, so a period running up to now stops at the last completed hour.",
    savingsTitle: "Savings",
    // per_day is the mean per 24 hours of the hours counted, not per calendar day.
    savingsPerDay: (e) => `${e.amount} per 24 hours on average, over the hours counted`,
    savingsSeries: "Saved",
    savingsRunning: "Running total",
    savingsCoverage: (e) => `Both counters cover only ${e.share} of this period; the rest is not counted, so the figure reads low.`,
    savingsNote: (e) => "What the house used and did not buy from the grid, at " + (e.twoZone ? "the day and night prices" : "the price") + " set in the integration's options: the whole system's saving — the sun and the battery, a battery charged from the grid at night included. Today's prices are applied to the whole period, and money for energy sold to the grid is not counted.",
    // Keyed by SavingsReason.
    savingsReasons: {
      no_price: "No price is set. Add the price of a kWh in the integration's options (Settings → Devices & services → Inverter Analytics → Configure).",
      no_counters: (e) => `Savings need the ${e.roles} ${e.n === 1 ? "counter" : "counters"} mapped.`,
      no_hours: "The consumption and grid-import counters have no hour in common in this period."
    }
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
      no_net_discharge: "the charge held",
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
    missingDays: (e) => Ct("en", e.n, {
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
    // A Sun month cell on a no-export system, whose verdict the fill decided.
    filledOnDays: (e) => `filled on ${e.share} of days`,
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
    // Under an efficiency month whose figure the month's capacity corrected for
    // the charge it ended with: the drift can run either way, so it names the change.
    driftCorrected: "corrected for the change in the battery's charge",
    // Why a month has no figure, keyed by the payload's reason.
    reasons: {
      too_few_clean_hours: (e) => `${Ct("en", e.n, {
        one: `Only ${e.n} clean discharge hour`,
        other: `Only ${e.n} clean discharge hours`
      })} this month; it needs ${e.minHours}, or one strange hour moves the figure.`,
      no_soc: "No state of charge this month, so there is no telling whether the battery ended where it began.",
      counters_partial: "The charge and discharge counters do not cover the same hours this month, so what went in and what came out are not from the same span.",
      soc_partial: "The state of charge covers only part of the hours the counters do, so the check that the battery ended where it began would not cover the same span.",
      drift: (e) => `The charge ended more than ${e.points} points from where it began, so part of what came out went in another month, or the reverse — and there is no capacity figure for this month to correct it with.`,
      drift_uncorrectable: "The charge moved too far against what went through the battery for the correction to be trusted.",
      too_little_throughput: (e) => `Less than ${e.min} went into the battery this month — too little to read an efficiency from.`,
      partial_month: "Only part of this month has statistics, and a part is not compared with a whole month.",
      // partial_month when the payload says how much of the month was covered.
      partialCoverage: (e) => `${e.share} of the month has statistics; a month needs ${e.needed}, and a part is not compared with a whole month.`,
      curtailed: (e) => `${Ct("en", e.n, {
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
      efficiency: (e) => `Round-trip efficiency is what came out of the battery over what went in, from the counters' monthly sums. When a month's charge ended more than ${e.points} points from where it began, the difference is corrected with that month's measured capacity; without one, or when the correction would be more than ${e.share} of what went in, the month has no figure. Nor has a month into which less than ${e.min} went.`,
      solar: (e) => `Solar production is the PV counter's energy per month. The best hour is the month's highest hourly peak of PV power — close to a clear-sky figure. Hours the system could not take are left out, and a month needs ${e.minHours} other hours of sun at or above ${e.minPower}.`,
      // Appended to solar when no total PV power is mapped.
      solarDerived: "This system has no total PV power sensor, so PV power is the sum of its strings. An hour counts only when every string has statistics for it, and its peak is summed from the strings' own peaks: they need not peak at the same moment, so the best hour can read a little above the array's true peak.",
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
      driftBelow: (e) => `The charge ended ${e.n} ${Ct("en", e.n, { one: "point", other: "points" })} below where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
      driftAbove: (e) => `The charge ended ${e.n} ${Ct("en", e.n, { one: "point", other: "points" })} above where it started, so the gap between charged and discharged is mostly energy still in the battery rather than energy lost on the way through. A longer period, or one that begins and ends at a similar charge, will give a figure.`,
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
      derivedRating: (e) => `No per-phase rating is configured, so the total is split across ${e.n} ${Ct("en", e.n, { one: "phase", other: "phases" })} — ${e.rating} each. Set the real figure in the integration's options if the hardware differs.`,
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
}, Gb = {
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
    longestShown: (e) => `Показано ${e.shown} ` + Ct("uk", e.shown, {
      one: "найдовший епізод",
      few: "найдовші епізоди",
      many: "найдовших епізодів",
      other: "найдовшого епізоду"
    }) + ` із ${e.total}, за порядком у часі.`,
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
    outagesBegan: (e) => e.n === 0 ? "жодне відключення не почалося" : Ct("uk", e.n, {
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
    thinMonths: (e) => Ct("uk", e.n, {
      one: `${e.n === 1 ? "Один" : e.n} місяць має дані менш ніж за ${e.share} своїх днів і показаний блідим.`,
      few: `${e.n} місяці мають дані менш ніж за ${e.share} своїх днів і показані блідими.`,
      many: `${e.n} місяців мають дані менш ніж за ${e.share} своїх днів і показані блідими.`,
      other: `${e.n} місяця мають дані менш ніж за ${e.share} своїх днів і показані блідими.`
    }),
    partialNotLower: "Місяць, який реєстратор бачив лише частково, — не нижчий місяць: самі значення правильні, а порівняння — ні.",
    // Для одного місяця, для 21 місяця, для 3 місяців, для 5 місяців.
    absentMonths: (e) => Ct("uk", e.n, {
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
    dayByDayNote: "Два стовпчики на день: що надійшло і що вийшло. Якщо їх скласти, та сама енергія порахувалася б двічі. Енергію читають із погодинної статистики Home Assistant, де скидання лічильників уже враховано. Поточна година зводиться лише після її завершення, тож період до теперішнього моменту закінчується останньою повною годиною.",
    savingsTitle: "Економія",
    savingsPerDay: (e) => `у середньому ${e.amount} за добу, за враховані години`,
    savingsSeries: "Зекономлено",
    savingsRunning: "Наростаючим підсумком",
    savingsCoverage: (e) => `Дані обох лічильників покривають лише ${e.share} цього періоду; решту не враховано, тож сума занижена.`,
    savingsNote: (e) => "Те, що будинок спожив і не купив із мережі, за " + (e.twoZone ? "денною та нічною цінами, заданими" : "ціною, заданою") + " в параметрах інтеграції: економія всієї системи — сонця й батареї, разом із нічним зарядом батареї з мережі. Сьогоднішні ціни застосовано до всього періоду, а гроші за продану в мережу енергію не враховано.",
    savingsReasons: {
      no_price: "Ціну не задано. Додайте ціну кВт·год у параметрах інтеграції (Налаштування → Пристрої та служби → Inverter Analytics → Налаштувати).",
      no_counters: (e) => `Для економії потрібно вказати ${e.n === 1 ? "лічильник" : "лічильники"} ${e.roles}.`,
      no_hours: "Лічильники споживання й імпорту з мережі не мають у цьому періоді спільних годин."
    }
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
      no_net_discharge: "заряд не впав",
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
    missingDays: (e) => Ct("uk", e.n, {
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
    daysOf: (e) => `${e.days} з ${e.total} ` + Ct("uk", e.total, { one: "дня", few: "днів", many: "днів", other: "дня" }),
    ofLoad: (e) => `${e.share} від споживання`,
    filledOnDays: (e) => `повний заряд у ${e.share} днів`,
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
    driftCorrected: "з поправкою на зміну заряду батареї",
    reasons: {
      too_few_clean_hours: (e) => `${Ct("uk", e.n, {
        one: `Лише ${e.n} чиста година розряду`,
        few: `Лише ${e.n} чисті години розряду`,
        many: `Лише ${e.n} чистих годин розряду`,
        other: `Лише ${e.n} чистої години розряду`
      })} за місяць; потрібно ${e.minHours}, інакше одна дивна година зсуває значення.`,
      no_soc: "За цей місяць немає рівня заряду, тож не видно, чи батарея закінчила там, де почала.",
      counters_partial: "Лічильники заряду й розряду цього місяця покривають різні години, тож те, що надійшло, і те, що вийшло, взято не з того самого проміжку.",
      soc_partial: "Рівень заряду покриває лише частину годин, які покривають лічильники, тож перевірка, чи батарея закінчила там, де почала, охопила б інший проміжок.",
      drift: (e) => `Заряд закінчився більш ніж за ${e.points} в.п. від того, де почався, тож частина того, що вийшло, увійшла в іншому місяці, або навпаки, — а виміряної ємності за цей місяць, щоб це виправити, немає.`,
      drift_uncorrectable: "Заряд змінився надто сильно порівняно з тим, що пройшло через батарею, щоб поправці можна було довіряти.",
      too_little_throughput: (e) => `За місяць у батарею надійшло менше ніж ${e.min} — замало, щоб читати з цього ККД.`,
      partial_month: "Статистика є лише за частину цього місяця, а частину не порівнюють із цілим місяцем.",
      partialCoverage: (e) => `Статистика є за ${e.share} місяця; місяцю потрібно ${e.needed}, а частину не порівнюють із цілим місяцем.`,
      curtailed: (e) => `${Ct("uk", e.n, {
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
      efficiency: (e) => `ККД заряду-розряду — те, що вийшло з батареї, поділене на те, що в неї надійшло, з місячних сум лічильників. Якщо заряд закінчився більш ніж за ${e.points} в.п. від того, де почався, різницю виправлено виміряною ємністю за той самий місяць; без неї, або якщо поправка становила б більше ніж ${e.share} того, що надійшло, місяць не має значення. Як і місяць, у який надійшло менше ніж ${e.min}.`,
      solar: (e) => `Сонячна генерація — енергія з лічильника СЕС за місяць. Найкраща година — найвищий погодинний пік потужності СЕС за місяць, близький до значення ясного неба. Години, коли система не могла взяти сонце, не враховано, і місяцю потрібно ${e.minHours} інших годин сонця від ${e.minPower}.`,
      solarDerived: "Ця система не має датчика загальної потужності СЕС, тож потужність СЕС — це сума її стрінгів. Година враховується, лише коли статистика є для кожного стрінга, а її пік складено з піків стрінгів: вони не обов'язково досягають піку одночасно, тож найкраща година може бути трохи вищою за справжній пік масиву.",
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
      driftBelow: (e) => `Наприкінці рівень заряду був на ${e.n} ` + Ct("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " нижчим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
      driftAbove: (e) => `Наприкінці рівень заряду був на ${e.n} ` + Ct("uk", e.n, { one: "пункт", few: "пункти", many: "пунктів", other: "пункту" }) + " вищим, ніж на початку, тож різниця між зарядженим і розрядженим — це здебільшого енергія, що досі в батареї, а не втрачена дорогою. Довший період або такий, що починається й закінчується з подібним зарядом, дасть значення.",
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
      derivedRating: (e) => `Номінальну потужність на фазу не налаштовано, тому загальну поділено на ${e.n} ${Ct("uk", e.n, { one: "фазу", few: "фази", many: "фаз", other: "фази" })} — по ${e.rating} на кожну. Якщо обладнання інше, вкажіть справжнє значення в параметрах інтеграції.`,
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
}, Wb = ["en", "uk"], vy = "inverter-analytics.lang", Ub = { en: Vb, uk: Gb };
function py(e) {
  return e === "en" || e === "uk";
}
function Rc(e) {
  return (e ?? "").toLowerCase().startsWith("uk");
}
function Yb(e, t) {
  return py(e) ? e : Rc(t) ? "uk" : "en";
}
function Xb(e, t) {
  return e === "uk" ? "uk" : !t || Rc(t) ? "en" : t;
}
function gy(e) {
  return Ub[e];
}
function co(e) {
  return gy(Rc(e) ? "uk" : "en");
}
let ba, Ls;
const ph = /* @__PURE__ */ new Set();
function qb() {
  if (ba === void 0)
    try {
      const e = globalThis.localStorage?.getItem(vy) ?? null;
      ba = py(e) ? e : null;
    } catch {
      ba = null;
    }
  return ba;
}
function yy() {
  for (const e of ph) e();
}
function gh() {
  return Yb(qb(), Ls);
}
function yh() {
  return Xb(gh(), Ls);
}
function Zb(e) {
  ba = e;
  try {
    globalThis.localStorage?.setItem(vy, e);
  } catch {
  }
  yy();
}
function Kb(e) {
  if (e === Ls) return;
  const t = yh();
  Ls = e, yh() !== t && yy();
}
function jb(e) {
  return ph.add(e), () => ph.delete(e);
}
const et = "—";
function ft(e, t) {
  if (e === null || Number.isNaN(e)) return et;
  const r = co(t);
  return Math.abs(e) >= 1e3 ? `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(
    e / 1e3
  )} ${r.units.kw}` : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(e)} ${r.units.w}`;
}
function U(e, t) {
  return e === null || Number.isNaN(e) ? et : `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e * 100)}%`;
}
function Pe(e, t) {
  return e === null || Number.isNaN(e) ? et : e <= 0 ? "0%" : e < 1e-3 ? "<0.1%" : U(e, t);
}
const Qb = 10 * 60;
function Pt(e, t) {
  if (e === null || Number.isNaN(e)) return et;
  const { units: r } = co(t);
  return `${new Intl.NumberFormat(t, { maximumFractionDigits: 1 }).format(e)} ${r.kwh}`;
}
function Jb(e, t) {
  const r = e.toFixed(1), n = new Intl.NumberFormat(t).formatToParts(1.5).find((i) => i.type === "decimal")?.value ?? ".";
  return n === "." ? r : r.replace(".", n);
}
function Kt(e, t) {
  const { units: r } = co(t);
  if (e < 60) return `${Math.round(e)} ${r.s}`;
  const n = Math.round(e);
  if (n < Qb) {
    const a = n % 60, o = (n - a) / 60;
    return a === 0 ? `${o} ${r.min}` : `${o} ${r.min} ${a} ${r.s}`;
  }
  const i = Math.round(n / 60);
  return i < 60 ? `${i} ${r.min}` : `${Math.floor(i / 60)} ${r.h} ${i % 60} ${r.min}`;
}
function Xr(e, t) {
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
function ll(e, t, r) {
  const { format: n } = co(r);
  return e === "raw" ? n.exactData : e === "lts" ? n.hourlyAverages : t ? n.mixedSince({ date: new Date(t).toLocaleDateString(r) }) : n.mixed;
}
function Wa(e, t) {
  if (e >= 0.95) return null;
  const { format: r } = co(t);
  return e <= 0 ? r.noData : e < 0.01 ? r.coversUnderOnePercent : r.coversOnly({ share: U(e, t) });
}
function tw(e) {
  let t;
  return () => (t ??= e().finally(() => {
    t = void 0;
  }), t);
}
const my = ["24h", "7d", "30d", "month", "year"];
function ew(e, t) {
  return e.ranges[t];
}
const rw = ["health"];
function nw(e, t) {
  return rw.includes(t) ? { unused: !0, label: e.health.periodNotUsed, note: e.health.periodNotUsed } : { unused: !1, label: e.panel.period, note: null };
}
const wo = 24 * 3600 * 1e3, td = 60 * 1e3;
function Fi(e, t) {
  const r = new Date(Math.floor(t.getTime() / td) * td);
  switch (e) {
    case "24h":
      return { start: new Date(r.getTime() - wo), end: r };
    case "7d":
      return { start: new Date(r.getTime() - 7 * wo), end: r };
    case "30d":
      return { start: new Date(r.getTime() - 30 * wo), end: r };
    case "month":
      return { start: new Date(r.getFullYear(), r.getMonth(), 1, 0, 0, 0, 0), end: r };
    case "year":
      return { start: new Date(r.getTime() - 365 * wo), end: r };
  }
}
function iw(e, t, r, n) {
  const a = e.split("/").filter(Boolean)[1], o = new URLSearchParams(t), s = o.get("range"), l = o.get("entry");
  return {
    tab: a && r.includes(a) ? a : n.tab,
    range: s && my.includes(s) ? s : n.range,
    entryId: l || n.entryId
  };
}
function aw(e, t) {
  const r = new URLSearchParams({ range: t.range });
  return t.entryId && r.set("entry", t.entryId), `${e}/${t.tab}?${r.toString()}`;
}
class Be {
  constructor(t) {
    this.host = t, t.addController(this);
  }
  hostConnected() {
    this.unsubscribe = jb(() => this.host.requestUpdate());
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
  get lang() {
    return gh();
  }
  get m() {
    return gy(gh());
  }
  get locale() {
    return yh();
  }
}
function ow(e, t) {
  return e.roles[t] ?? t;
}
function Gr(e, t, r = !1) {
  const n = t.map((i) => {
    const a = ow(e, i);
    return r ? e.common.quoted({ text: a }) : a;
  });
  return n.length <= 1 ? n.join("") : `${n.slice(0, -1).join(", ")} ${e.common.and} ${n[n.length - 1]}`;
}
const sw = /^(load|grid|pv)_p(\d+)$/;
function Ps(e, t) {
  const r = sw.exec(t.key);
  if (!r) return t.label;
  const n = Number(r[2]);
  return r[1] === "pv" ? e.sections.strings.positional({ n }) : e.sections.phases.positional({ n });
}
const lw = "/config/integrations/integration/inverter_analytics";
function uw(e) {
  return e ? e.reason ? { kind: "withheld", reason: e.reason } : { kind: "figure" } : null;
}
const ed = ["load_energy_total", "grid_import_total"];
function hw(e) {
  const t = ed.filter((r) => !e.includes(r));
  return t.length ? t : [...ed];
}
function cw(e, t) {
  if (!t) return e.map((n) => ({ label: n.day, value: n.value }));
  const r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const i = n.day.slice(0, 7);
    r.set(i, (r.get(i) ?? 0) + n.value);
  }
  return [...r].map(([n, i]) => ({ label: n, value: i }));
}
function fw(e) {
  let t = 0;
  return e.map((r) => t += r);
}
function dw(e) {
  if (e.window_hours <= 0) return null;
  const t = e.hours / e.window_hours;
  return t < 1 ? t : null;
}
function vw(e, t, r) {
  try {
    return new Intl.NumberFormat(r, {
      style: "currency",
      currency: t,
      // Both bounds: an engine that keeps the currency's own minimum (2 for
      // most) rejects a maximum below it.
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(e);
  } catch {
    return `${Math.round(e)} ${t}`;
  }
}
const at = {
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
}, ji = {
  newest: at.load,
  older: ["#7d8590", "#a0a6ae", "#bcc1c8", "#d0d4d9", "#e0e3e7"],
  // A fixed reference beside the years, dashed: the battery's nameplate, in
  // the battery's colour rather than an alarm colour, since it is no target.
  reference: at.battery
}, pw = 40, zn = 64, qr = { nameLocation: "middle", nameGap: 28 };
function Gt() {
  const e = typeof document > "u" ? null : getComputedStyle(document.documentElement), t = e?.getPropertyValue("--primary-text-color").trim() || "#212121", r = e?.getPropertyValue("--divider-color").trim() || "#e0e0e0";
  return {
    base: {
      backgroundColor: "transparent",
      textStyle: { color: t, fontFamily: "inherit" },
      grid: { left: 56, right: 24, top: pw, bottom: 40, containLabel: !0 },
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
const yt = (e, t) => Number(e.toFixed(t)), _y = (e, t, r) => new Intl.NumberFormat(r.charts.locale, {
  maximumFractionDigits: t,
  useGrouping: !1
}).format(yt(e, t));
function gw(e, t, r) {
  const { base: n, axis: i } = Gt(), a = e.histogram.buckets, o = a.map(
    (s) => t === "watts" ? String(yt(s.start, 0)) : _y(s.start / e.rated_power * 100, 1, r)
  );
  return {
    ...n,
    xAxis: {
      ...i,
      type: "category",
      data: o,
      name: t === "watts" ? r.units.w : `% ${r.units.ofRated}`,
      ...qr
    },
    yAxis: { ...i, type: "value", name: r.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: a.map((s) => yt(s.fraction * 100, 2)),
        itemStyle: { color: at.load },
        barCategoryGap: "10%"
      }
    ]
  };
}
function yw(e, t) {
  const { base: r, axis: n } = Gt();
  return {
    ...r,
    xAxis: {
      ...n,
      ...qr,
      type: "value",
      name: t.charts.percentOfTime,
      min: 0,
      max: 100
    },
    yAxis: { ...n, type: "value", name: t.units.w },
    series: [
      {
        type: "line",
        showSymbol: !1,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: at.load },
        itemStyle: { color: at.load },
        data: e.duration_curve.map((i) => [
          yt(i.fraction * 100, 2),
          yt(i.value, 1)
        ])
      }
    ]
  };
}
function mw(e, t) {
  const { base: r, axis: n } = Gt(), i = [...e.bands].reverse();
  return {
    ...r,
    xAxis: {
      ...n,
      ...qr,
      type: "value",
      name: t.charts.percentOfTime,
      min: 0,
      max: 100
    },
    yAxis: { ...n, type: "category", data: i.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: i.map((a) => yt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => i[a.dataIndex].key === "100+" ? at.overload : at.load
        }
      }
    ]
  };
}
function _w(e, t) {
  const { base: r, axis: n } = Gt(), i = e.histogram;
  return {
    ...r,
    xAxis: {
      ...n,
      type: "category",
      data: i.map((a) => String(yt(a.start * 100, 0))),
      name: t.charts.percentImbalance,
      ...qr
    },
    yAxis: { ...n, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: i.map((a) => yt(a.fraction * 100, 2)),
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
function bw(e, t, r) {
  const { base: n, axis: i } = Gt();
  return {
    ...n,
    // Two bar colours with nothing naming them is a guess. The legend draws
    // where the shared grid starts, so the plot is pushed down below it.
    legend: { data: [r.charts.mean, r.charts.peak], top: 0, textStyle: n.textStyle },
    grid: { ...n.grid, top: zn },
    xAxis: { ...i, type: "category", data: e.map((a) => Ps(r, a)) },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: [
      {
        name: r.charts.mean,
        type: "bar",
        data: e.map((a) => a.mean === null ? null : yt(a.mean, 1)),
        itemStyle: { color: t }
      },
      {
        name: r.charts.peak,
        type: "bar",
        data: e.map((a) => a.peak === null ? null : yt(a.peak, 1)),
        itemStyle: { color: at.muted }
      }
    ]
  };
}
function ww(e, t) {
  const { base: r, axis: n } = Gt(), i = e.histogram.buckets;
  return {
    ...r,
    xAxis: {
      ...n,
      type: "category",
      data: i.map((a) => String(yt(a.start, 0))),
      name: t.charts.percentCharge,
      ...qr
    },
    yAxis: { ...n, type: "value", name: t.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: i.map((a) => yt(a.fraction * 100, 2)),
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
function Sw(e, t) {
  const { base: r, axis: n } = Gt(), i = [...e].reverse();
  return {
    ...r,
    xAxis: {
      ...n,
      ...qr,
      type: "value",
      name: t.charts.percentOfTime,
      min: 0,
      max: 100
    },
    yAxis: { ...n, type: "category", data: i.map((a) => a.key) },
    series: [
      {
        type: "bar",
        data: i.map((a) => yt(a.fraction * 100, 2)),
        itemStyle: {
          color: (a) => i[a.dataIndex].key === "0-20" ? at.overload : at.battery
        }
      }
    ]
  };
}
function by(e, t) {
  return new Date(Date.UTC(2e3, e - 1, 1)).toLocaleDateString(t, { month: "short" });
}
function Ua(e, t, r) {
  const [n, i] = e.split("-").map(Number), a = by(i, r);
  return t && t.slice(0, 4) === String(n) ? a : `${a} ${n}`;
}
const xw = 0.35;
function rd(e, t) {
  return e.map((r) => {
    const n = t(r);
    return n === null ? null : r.complete ? { value: yt(n, 1) } : { value: yt(n, 1), itemStyle: { opacity: xw } };
  });
}
function Tw(e, t, r) {
  const { base: n, axis: i } = Gt(), a = e.map(
    (s, l) => Ua(s.key, e[l - 1]?.key, r.charts.locale)
  ), o = [
    {
      name: r.charts.load,
      type: "bar",
      data: rd(e, (s) => s.load_mean),
      itemStyle: { color: at.load }
    }
  ];
  return t && o.push({
    name: r.charts.pv,
    type: "bar",
    data: rd(e, (s) => s.pv_mean),
    itemStyle: { color: at.pv }
  }), {
    ...n,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: n.textStyle } : void 0,
    grid: t ? { ...n.grid, top: zn } : n.grid,
    xAxis: { ...i, type: "category", data: a },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: o
  };
}
function Cw(e, t, r) {
  const { base: n, axis: i } = Gt(), a = [
    {
      name: r.charts.load,
      type: "line",
      showSymbol: !1,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: at.load },
      itemStyle: { color: at.load },
      data: e.map((o) => o.load_mean === null ? null : yt(o.load_mean, 1))
    }
  ];
  return t && a.push({
    name: r.charts.pv,
    type: "line",
    showSymbol: !1,
    lineStyle: { color: at.pv },
    itemStyle: { color: at.pv },
    data: e.map((o) => o.pv_mean === null ? null : yt(o.pv_mean, 1))
  }), {
    ...n,
    legend: t ? { data: [r.charts.load, r.charts.pv], top: 0, textStyle: n.textStyle } : void 0,
    grid: t ? { ...n.grid, top: zn } : n.grid,
    xAxis: {
      ...i,
      type: "category",
      data: e.map((o) => String(o.hour)),
      name: r.charts.hour,
      ...qr
    },
    yAxis: { ...i, type: "value", name: r.units.w },
    series: a
  };
}
function Mw(e, t, r) {
  const { base: n, axis: i } = Gt(), a = t.map((h) => h.key), o = a.map((h, c) => Ua(h, a[c - 1], r.charts.locale)), s = new Map(a.map((h, c) => [h, c])), l = e.filter((h) => h.load_mean !== null && s.has(h.month)).map((h) => [s.get(h.month), h.hour, yt(h.load_mean, 1)]), u = l.map((h) => h[2]);
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
function $i(e, t) {
  return e.charts.flows[t] ?? t;
}
const wy = {
  pv_energy_total: at.pv,
  grid_import_total: at.grid,
  battery_discharge_total: at.battery,
  load_energy_total: at.load,
  grid_export_total: at.gridExport,
  battery_charge_total: at.batteryCharge
};
function Dw(e, t, r, n) {
  const { base: i, axis: a } = Gt(), o = [...t, ...r].filter((s) => s in e);
  return {
    ...i,
    legend: { data: o.map((s) => $i(n, s)), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: zn },
    xAxis: { ...a, ...qr, type: "value", name: n.units.kwh },
    yAxis: { ...a, type: "category", data: [n.charts.out, n.charts.in] },
    series: o.map((s) => ({
      name: $i(n, s),
      type: "bar",
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: wy[s] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: t.includes(s) ? [null, yt(e[s], 3)] : [yt(e[s], 3), null]
    }))
  };
}
function Aw(e, t, r, n) {
  const { base: i, axis: a } = Gt(), o = [...t, ...r].filter(
    (s) => e.some((l) => s in l.flows)
  );
  return {
    ...i,
    legend: { data: o.map((s) => $i(n, s)), top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: zn },
    xAxis: { ...a, type: "category", data: e.map((s) => s.day.slice(5)) },
    yAxis: { ...a, type: "value", name: n.units.kwh },
    series: o.map((s) => ({
      name: $i(n, s),
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: t.includes(s) ? "in" : "out",
      itemStyle: { color: wy[s] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: e.map((l) => s in l.flows ? yt(l.flows[s], 3) : null)
    }))
  };
}
function Iw(e, t, r) {
  const { base: n, axis: i } = Gt();
  return {
    ...n,
    legend: {
      data: [r.balance.savingsSeries, r.balance.savingsRunning],
      top: 0,
      textStyle: n.textStyle
    },
    grid: { ...n.grid, top: zn },
    // A day label drops its year, as on the day-by-day chart; a month keeps it.
    xAxis: {
      ...i,
      type: "category",
      data: e.map((a) => a.label.length === 10 ? a.label.slice(5) : a.label)
    },
    yAxis: [
      { ...i, type: "value", name: t },
      { ...i, type: "value", name: t, splitLine: { show: !1 } }
    ],
    series: [
      {
        name: r.balance.savingsSeries,
        type: "bar",
        itemStyle: { color: at.pv },
        data: e.map((a) => yt(a.value, 0))
      },
      {
        name: r.balance.savingsRunning,
        type: "line",
        yAxisIndex: 1,
        showSymbol: !1,
        itemStyle: { color: at.load },
        data: fw(e.map((a) => a.value)).map((a) => yt(a, 0))
      }
    ]
  };
}
function $w(e, t) {
  const { base: r, axis: n } = Gt();
  return {
    ...r,
    tooltip: {
      ...r.tooltip,
      // How many outages began on a day is the other thing the by-day view has
      // to answer, and a second axis for a count of two or three would cost
      // more than it says. The tooltip is where it fits.
      formatter: (i) => {
        const a = i[0], o = e[a.dataIndex].count, s = t.charts.hoursWithoutGrid({ hours: _y(a.value, 2, t) });
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
        data: e.map((i) => yt(i.off_seconds / 3600, 2)),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function Lw(e, t) {
  const { base: r, axis: n } = Gt();
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
          (i) => i.measured_seconds > 0 ? yt(i.off_seconds / i.measured_seconds * 100, 2) : null
        ),
        itemStyle: { color: at.overload }
      }
    ]
  };
}
function Pw(e, t, r, n = null) {
  const { base: i, axis: a } = Gt(), o = e.map((l) => String(l.year)), s = e.map((l, u) => {
    const h = e.length - 1 - u, c = h === 0 ? ji.newest : ji.older[Math.min(h - 1, ji.older.length - 1)];
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
      data: l.values.map((f) => f === null ? null : yt(f, 2))
    };
  });
  return n !== null && (o.push(n.name), s.push({
    name: n.name,
    type: "line",
    connectNulls: !1,
    showSymbol: !1,
    symbolSize: 0,
    z: 1,
    lineStyle: { color: ji.reference, width: 1.5, type: "dashed" },
    itemStyle: { color: ji.reference },
    data: Array.from({ length: 12 }, () => yt(n.value, 2))
  })), {
    ...i,
    legend: { data: o, top: 0, textStyle: i.textStyle },
    grid: { ...i.grid, top: zn },
    xAxis: {
      ...a,
      type: "category",
      data: Array.from({ length: 12 }, (l, u) => by(u + 1, r.charts.locale))
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
var mh = function(e, t) {
  return mh = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, mh(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  mh(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Rw = /* @__PURE__ */ function() {
  function e() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return e;
}(), Ow = /* @__PURE__ */ function() {
  function e() {
    this.browser = new Rw(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return e;
}(), X = new Ow();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (X.wxa = !0, X.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? X.worker = !0 : !X.hasGlobalWindow || "Deno" in window ? (X.node = !0, X.svgSupported = !0) : Ew(navigator.userAgent, X);
function Ew(e, t) {
  var r = t.browser, n = e.match(/Firefox\/([\d.]+)/), i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
  n && (r.firefox = !0, r.version = n[1]), i && (r.ie = !0, r.version = i[1]), a && (r.edge = !0, r.version = a[1], r.newEdge = +a[1].split(".")[0] > 18), o && (r.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge, t.pointerEventsSupported = "onpointerdown" in window && (r.edge || r.ie && +r.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (r.ie && "transition" in s || r.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || r.ie && +r.version >= 9;
}
var Oc = 12, kw = "sans-serif", On = Oc + "px " + kw, Nw = 20, Bw = 100, zw = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function Fw(e) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var r = 0; r < e.length; r++) {
    var n = String.fromCharCode(r + 32), i = (e.charCodeAt(r) - Nw) / Bw;
    t[n] = i;
  }
  return t;
}
var Hw = Fw(zw), Wr = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var e, t;
    return function(r, n) {
      if (!e) {
        var i = Wr.createCanvas();
        e = i && i.getContext("2d");
      }
      if (e)
        return t !== n && (t = e.font = n || On), e.measureText(r);
      r = r || "", n = n || On;
      var a = /((?:\d+)?\.?\d*)px/.exec(n), o = a && +a[1] || Oc, s = 0;
      if (n.indexOf("mono") >= 0)
        s = o * r.length;
      else
        for (var l = 0; l < r.length; l++) {
          var u = Hw[r[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(e, t, r) {
    var n = new Image();
    return n.onload = t, n.onerror = r, n.src = e, n;
  }
}, Sy = Hi([
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
}, {}), xy = Hi([
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
}, {}), fo = Object.prototype.toString, ul = Array.prototype, Vw = ul.forEach, Gw = ul.filter, Ec = ul.slice, Ww = ul.map, nd = function() {
}.constructor, So = nd ? nd.prototype : null, kc = "__proto__", Uw = 2311;
function Ty() {
  return Uw++;
}
function Nc() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function q(e) {
  if (e == null || typeof e != "object")
    return e;
  var t = e, r = fo.call(e);
  if (r === "[object Array]") {
    if (!Ia(e)) {
      t = [];
      for (var n = 0, i = e.length; n < i; n++)
        t[n] = q(e[n]);
    }
  } else if (xy[r]) {
    if (!Ia(e)) {
      var a = e.constructor;
      if (a.from)
        t = a.from(e);
      else {
        t = new a(e.length);
        for (var n = 0, i = e.length; n < i; n++)
          t[n] = e[n];
      }
    }
  } else if (!Sy[r] && !Ia(e) && !Ya(e)) {
    t = {};
    for (var o in e)
      e.hasOwnProperty(o) && o !== kc && (t[o] = q(e[o]));
  }
  return t;
}
function ot(e, t, r) {
  if (!V(t) || !V(e))
    return r ? q(t) : e;
  for (var n in t)
    if (t.hasOwnProperty(n) && n !== kc) {
      var i = e[n], a = t[n];
      V(a) && V(i) && !z(a) && !z(i) && !Ya(a) && !Ya(i) && !id(a) && !id(i) && !Ia(a) && !Ia(i) ? ot(i, a, r) : (r || !(n in e)) && (e[n] = q(t[n]));
    }
  return e;
}
function N(e, t) {
  if (Object.assign)
    Object.assign(e, t);
  else
    for (var r in t)
      t.hasOwnProperty(r) && r !== kc && (e[r] = t[r]);
  return e;
}
function ht(e, t, r) {
  for (var n = _t(t), i = 0, a = n.length; i < a; i++) {
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
function Yw(e, t) {
  var r = e.prototype;
  function n() {
  }
  n.prototype = t.prototype, e.prototype = new n();
  for (var i in r)
    r.hasOwnProperty(i) && (e.prototype[i] = r[i]);
  e.prototype.constructor = e, e.superClass = t;
}
function tr(e, t, r) {
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
    if (e.forEach && e.forEach === Vw)
      e.forEach(t, r);
    else if (e.length === +e.length)
      for (var n = 0, i = e.length; n < i; n++)
        t.call(r, e[n], n, e);
    else
      for (var a in e)
        e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function Y(e, t, r) {
  if (!e)
    return [];
  if (!t)
    return Bc(e);
  if (e.map && e.map === Ww)
    return e.map(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    n.push(t.call(r, e[i], i, e));
  return n;
}
function Hi(e, t, r, n) {
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
    return Bc(e);
  if (e.filter && e.filter === Gw)
    return e.filter(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    t.call(r, e[i], i, e) && n.push(e[i]);
  return n;
}
function _t(e) {
  if (!e)
    return [];
  if (Object.keys)
    return Object.keys(e);
  var t = [];
  for (var r in e)
    e.hasOwnProperty(r) && t.push(r);
  return t;
}
function Xw(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return function() {
    return e.apply(t, r.concat(Ec.call(arguments)));
  };
}
var J = So && Z(So.bind) ? So.call.bind(So.bind) : Xw;
function It(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return function() {
    return e.apply(this, t.concat(Ec.call(arguments)));
  };
}
function z(e) {
  return Array.isArray ? Array.isArray(e) : fo.call(e) === "[object Array]";
}
function Z(e) {
  return typeof e == "function";
}
function H(e) {
  return typeof e == "string";
}
function _h(e) {
  return fo.call(e) === "[object String]";
}
function bt(e) {
  return typeof e == "number";
}
function V(e) {
  var t = typeof e;
  return t === "function" || !!e && t === "object";
}
function id(e) {
  return !!Sy[fo.call(e)];
}
function re(e) {
  return !!xy[fo.call(e)];
}
function Ya(e) {
  return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function hl(e) {
  return e.colorStops != null;
}
function qw(e) {
  return e.image != null;
}
function Rs(e) {
  return e !== e;
}
function Li() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] != null)
      return e[r];
}
function tt(e, t) {
  return e ?? t;
}
function cs(e, t, r) {
  return e ?? t ?? r;
}
function Bc(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return Ec.apply(e, t);
}
function Cy(e) {
  if (typeof e == "number")
    return [e, e, e, e];
  var t = e.length;
  return t === 2 ? [e[0], e[1], e[0], e[1]] : t === 3 ? [e[0], e[1], e[2], e[1]] : e;
}
function Ze(e, t) {
  if (!e)
    throw new Error(t);
}
function Ye(e) {
  return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var My = "__ec_primitive__";
function bh(e) {
  e[My] = !0;
}
function Ia(e) {
  return e[My];
}
var Zw = function() {
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
    return _t(this.data);
  }, e.prototype.forEach = function(t) {
    var r = this.data;
    for (var n in r)
      r.hasOwnProperty(n) && t(r[n], n);
  }, e;
}(), Dy = typeof Map == "function";
function Kw() {
  return Dy ? /* @__PURE__ */ new Map() : new Zw();
}
var jw = function() {
  function e(t) {
    var r = z(t);
    this.data = Kw();
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
    return Dy ? Array.from(t) : t;
  }, e.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, e;
}();
function Q(e) {
  return new jw(e);
}
function Qw(e, t) {
  for (var r = new e.constructor(e.length + t.length), n = 0; n < e.length; n++)
    r[n] = e[n];
  for (var i = e.length, n = 0; n < t.length; n++)
    r[n + i] = t[n];
  return r;
}
function cl(e, t) {
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
function Ay(e) {
  var t = e.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function En(e, t) {
  return e.hasOwnProperty(t);
}
function Xt() {
}
var Jw = 180 / Math.PI;
function Vi(e, t) {
  return e == null && (e = 0), t == null && (t = 0), [e, t];
}
function t1(e) {
  return [e[0], e[1]];
}
function ad(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function e1(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function r1(e) {
  return Math.sqrt(n1(e));
}
function n1(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function Yl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function i1(e, t) {
  var r = r1(t);
  return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / r, e[1] = t[1] / r), e;
}
function wh(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var a1 = wh;
function o1(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var _i = o1;
function be(e, t, r) {
  var n = t[0], i = t[1];
  return e[0] = r[0] * n + r[2] * i + r[4], e[1] = r[1] * n + r[3] * i + r[5], e;
}
function vi(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function pi(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
var Xn = /* @__PURE__ */ function() {
  function e(t, r) {
    this.target = t, this.topTarget = r && r.topTarget;
  }
  return e;
}(), s1 = function() {
  function e(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return e.prototype._dragStart = function(t) {
    for (var r = t.target; r && !r.draggable; )
      r = r.parent || r.__hostTarget;
    r && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new Xn(r, t), "dragstart", t.event));
  }, e.prototype._drag = function(t) {
    var r = this._draggingTarget;
    if (r) {
      var n = t.offsetX, i = t.offsetY, a = n - this._x, o = i - this._y;
      this._x = n, this._y = i, r.drift(a, o, t), this.handler.dispatchToElement(new Xn(r, t), "drag", t.event);
      var s = this.handler.findHover(n, i, r).target, l = this._dropTarget;
      this._dropTarget = s, r !== s && (l && s !== l && this.handler.dispatchToElement(new Xn(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new Xn(s, t), "dragenter", t.event));
    }
  }, e.prototype._dragEnd = function(t) {
    var r = this._draggingTarget;
    r && (r.dragging = !1), this.handler.dispatchToElement(new Xn(r, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new Xn(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, e;
}(), er = function() {
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
}(), l1 = Math.log(2);
function Sh(e, t, r, n, i, a) {
  var o = n + "-" + i, s = e.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~i) / l1);
    return e[r][l];
  }
  for (var u = n | 1 << r, h = r + 1; n & 1 << h; )
    h++;
  for (var c = 0, f = 0, d = 0; f < s; f++) {
    var v = 1 << f;
    v & i || (c += (d % 2 ? -1 : 1) * e[r][f] * Sh(e, t - 1, h, u, i | v, a), d++);
  }
  return a[o] = c, c;
}
function od(e, t) {
  var r = [
    [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
    [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
    [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
    [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
    [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
    [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
    [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
    [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]
  ], n = {}, i = Sh(r, 8, 0, 0, 0, n);
  if (i !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Sh(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, n) / i * t[o];
    return function(l, u, h) {
      var c = u * a[6] + h * a[7] + 1;
      l[0] = (u * a[0] + h * a[1] + a[2]) / c, l[1] = (u * a[3] + h * a[4] + a[5]) / c;
    };
  }
}
var sd = "___zrEVENTSAVED", Xl = [];
function u1(e, t, r, n, i) {
  return xh(Xl, t, n, i, !0) && xh(e, r, Xl[0], Xl[1]);
}
function xh(e, t, r, n, i) {
  if (t.getBoundingClientRect && X.domSupported && !Iy(t)) {
    var a = t[sd] || (t[sd] = {}), o = h1(t, a), s = c1(o, a, i);
    if (s)
      return s(e, r, n), !0;
  }
  return !1;
}
function h1(e, t) {
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
function c1(e, t, r) {
  for (var n = r ? "invTrans" : "trans", i = t[n], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var h = e[u].getBoundingClientRect(), c = 2 * u, f = h.left, d = h.top;
    o.push(f, d), l = l && a && f === a[c] && d === a[c + 1], s.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return l && i ? i : (t.srcCoords = o, t[n] = r ? od(s, o) : od(o, s));
}
function Iy(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var f1 = /([&<>"'])/g, d1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function jt(e) {
  return e == null ? "" : (e + "").replace(f1, function(t, r) {
    return d1[r];
  });
}
var v1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, ql = [], p1 = X.browser.firefox && +X.browser.version.split(".")[0] < 39;
function Th(e, t, r, n) {
  return r = r || {}, n ? ld(e, t, r) : p1 && t.layerX != null && t.layerX !== t.offsetX ? (r.zrX = t.layerX, r.zrY = t.layerY) : t.offsetX != null ? (r.zrX = t.offsetX, r.zrY = t.offsetY) : ld(e, t, r), r;
}
function ld(e, t, r) {
  if (X.domSupported && e.getBoundingClientRect) {
    var n = t.clientX, i = t.clientY;
    if (Iy(e)) {
      var a = e.getBoundingClientRect();
      r.zrX = n - a.left, r.zrY = i - a.top;
      return;
    } else if (xh(ql, e, n, i)) {
      r.zrX = ql[0], r.zrY = ql[1];
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function zc(e) {
  return e || window.event;
}
function de(e, t, r) {
  if (t = zc(t), t.zrX != null)
    return t;
  var n = t.type, i = n && n.indexOf("touch") >= 0;
  if (i) {
    var o = n !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Th(e, o, t, r);
  } else {
    Th(e, t, t, r);
    var a = g1(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && v1.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function g1(e) {
  var t = e.wheelDelta;
  if (t)
    return t;
  var r = e.deltaX, n = e.deltaY;
  if (r == null || n == null)
    return t;
  var i = Math.abs(n !== 0 ? n : r), a = n > 0 ? -1 : n < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * i * a;
}
function y1(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function m1(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
var Xa = function(e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, _1 = function() {
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
        var l = i[o], u = Th(n, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, e.prototype._recognize = function(t) {
    for (var r in Zl)
      if (Zl.hasOwnProperty(r)) {
        var n = Zl[r](this._track, t);
        if (n)
          return n;
      }
  }, e;
}();
function ud(e) {
  var t = e[1][0] - e[0][0], r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function b1(e) {
  return [
    (e[0][0] + e[1][0]) / 2,
    (e[0][1] + e[1][1]) / 2
  ];
}
var Zl = {
  pinch: function(e, t) {
    var r = e.length;
    if (r) {
      var n = (e[r - 1] || {}).points, i = (e[r - 2] || {}).points || n;
      if (i && i.length > 1 && n && n.length > 1) {
        var a = ud(n) / ud(i);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = b1(n);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: e[0].target,
          event: t
        };
      }
    }
  }
};
function bi() {
  return [1, 0, 0, 1, 0, 0];
}
function Fc(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function w1(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function wi(e, t, r) {
  var n = t[0] * r[0] + t[2] * r[1], i = t[1] * r[0] + t[3] * r[1], a = t[0] * r[2] + t[2] * r[3], o = t[1] * r[2] + t[3] * r[3], s = t[0] * r[4] + t[2] * r[5] + t[4], l = t[1] * r[4] + t[3] * r[5] + t[5];
  return e[0] = n, e[1] = i, e[2] = a, e[3] = o, e[4] = s, e[5] = l, e;
}
function Ch(e, t, r) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + r[0], e[5] = t[5] + r[1], e;
}
function Hc(e, t, r, n) {
  n === void 0 && (n = [0, 0]);
  var i = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], h = Math.sin(r), c = Math.cos(r);
  return e[0] = i * c + s * h, e[1] = -i * h + s * c, e[2] = a * c + l * h, e[3] = -a * h + c * l, e[4] = c * (o - n[0]) + h * (u - n[1]) + n[0], e[5] = c * (u - n[1]) - h * (o - n[0]) + n[1], e;
}
function S1(e, t, r) {
  var n = r[0], i = r[1];
  return e[0] = t[0] * n, e[1] = t[1] * i, e[2] = t[2] * n, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * i, e;
}
function Vc(e, t) {
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
}(), xo = Math.min, To = Math.max, Jr = new gt(), tn = new gt(), en = new gt(), rn = new gt(), Qi = new gt(), Ji = new gt(), ut = function() {
  function e(t, r, n, i) {
    n < 0 && (t = t + n, n = -n), i < 0 && (r = r + i, i = -i), this.x = t, this.y = r, this.width = n, this.height = i;
  }
  return e.prototype.union = function(t) {
    var r = xo(t.x, this.x), n = xo(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = To(t.x + t.width, this.x + this.width) - r : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = To(t.y + t.height, this.y + this.height) - n : this.height = t.height, this.x = r, this.y = n;
  }, e.prototype.applyTransform = function(t) {
    e.applyTransform(this, this, t);
  }, e.prototype.calculateTransform = function(t) {
    var r = this, n = t.width / r.width, i = t.height / r.height, a = bi();
    return Ch(a, a, [-r.x, -r.y]), S1(a, a, [n, i]), Ch(a, a, [t.x, t.y]), a;
  }, e.prototype.intersect = function(t, r) {
    if (!t)
      return !1;
    t instanceof e || (t = e.create(t));
    var n = this, i = n.x, a = n.x + n.width, o = n.y, s = n.y + n.height, l = t.x, u = t.x + t.width, h = t.y, c = t.y + t.height, f = !(a < l || u < i || s < h || c < o);
    if (r) {
      var d = 1 / 0, v = 0, g = Math.abs(a - l), p = Math.abs(u - i), y = Math.abs(s - h), m = Math.abs(c - o), _ = Math.min(g, p), b = Math.min(y, m);
      a < l || u < i ? _ > v && (v = _, g < p ? gt.set(Ji, -g, 0) : gt.set(Ji, p, 0)) : _ < d && (d = _, g < p ? gt.set(Qi, g, 0) : gt.set(Qi, -p, 0)), s < h || c < o ? b > v && (v = b, y < m ? gt.set(Ji, 0, -y) : gt.set(Ji, 0, m)) : _ < d && (d = _, y < m ? gt.set(Qi, 0, y) : gt.set(Qi, 0, -m));
    }
    return r && gt.copy(r, f ? Qi : Ji), f;
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
    Jr.x = en.x = r.x, Jr.y = rn.y = r.y, tn.x = rn.x = r.x + r.width, tn.y = en.y = r.y + r.height, Jr.transform(n), rn.transform(n), tn.transform(n), en.transform(n), t.x = xo(Jr.x, tn.x, en.x, rn.x), t.y = xo(Jr.y, tn.y, en.y, rn.y);
    var l = To(Jr.x, tn.x, en.x, rn.x), u = To(Jr.y, tn.y, en.y, rn.y);
    t.width = l - t.x, t.height = u - t.y;
  }, e;
}(), $y = "silent";
function x1(e, t, r) {
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
    stop: T1
  };
}
function T1() {
  Xa(this.event);
}
var C1 = function(e) {
  B(t, e);
  function t() {
    var r = e !== null && e.apply(this, arguments) || this;
    return r.handler = null, r;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(er), ta = /* @__PURE__ */ function() {
  function e(t, r) {
    this.x = t, this.y = r;
  }
  return e;
}(), M1 = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Kl = new ut(0, 0, 0, 0), Ly = function(e) {
  B(t, e);
  function t(r, n, i, a, o) {
    var s = e.call(this) || this;
    return s._hovered = new ta(0, 0), s.storage = r, s.painter = n, s.painterRoot = a, s._pointerSize = o, i = i || new C1(), s.proxy = null, s.setHandlerProxy(i), s._draggingMgr = new s1(s), s;
  }
  return t.prototype.setHandlerProxy = function(r) {
    this.proxy && this.proxy.dispose(), r && (C(M1, function(n) {
      r.on && r.on(n, this[n], this);
    }, this), r.handler = this), this.proxy = r;
  }, t.prototype.mousemove = function(r) {
    var n = r.zrX, i = r.zrY, a = Py(this, n, i), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new ta(n, i) : this.findHover(n, i), u = l.target, h = this.proxy;
    h.setCursor && h.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", r), this.dispatchToElement(l, "mousemove", r), u && u !== s && this.dispatchToElement(l, "mouseover", r);
  }, t.prototype.mouseout = function(r) {
    var n = r.zrEventControl;
    n !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", r), n !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: r });
  }, t.prototype.resize = function() {
    this._hovered = new ta(0, 0);
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
      for (var o = "on" + n, s = x1(n, r, i); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(n, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(n, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(n, s);
      }));
    }
  }, t.prototype.findHover = function(r, n, i) {
    var a = this.storage.getDisplayList(), o = new ta(r, n);
    if (hd(a, o, r, n, i), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, h = new ut(r - u, n - u, l, l), c = a.length - 1; c >= 0; c--) {
        var f = a[c];
        f !== i && !f.ignore && !f.ignoreCoarsePointer && (!f.parent || !f.parent.ignoreCoarsePointer) && (Kl.copy(f.getBoundingRect()), f.transform && Kl.applyTransform(f.transform), Kl.intersect(h) && s.push(f));
      }
      if (s.length)
        for (var d = 4, v = Math.PI / 12, g = Math.PI * 2, p = 0; p < u; p += d)
          for (var y = 0; y < g; y += v) {
            var m = r + p * Math.cos(y), _ = n + p * Math.sin(y);
            if (hd(s, o, m, _, i), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(r, n) {
    this._gestureMgr || (this._gestureMgr = new _1());
    var i = this._gestureMgr;
    n === "start" && i.clear();
    var a = i.recognize(r, this.findHover(r.zrX, r.zrY, null).target, this.proxy.dom);
    if (n === "end" && i.clear(), a) {
      var o = a.type;
      r.gestureEvent = o;
      var s = new ta();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(er);
C(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
  Ly.prototype[e] = function(t) {
    var r = t.zrX, n = t.zrY, i = Py(this, r, n), a, o;
    if ((e !== "mouseup" || !i) && (a = this.findHover(r, n), o = a.target), e === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (e === "mouseup")
      this._upEl = o;
    else if (e === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || a1(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, e, t);
  };
});
function D1(e, t, r) {
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
    return i ? $y : !0;
  }
  return !1;
}
function hd(e, t, r, n, i) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a], s = void 0;
    if (o !== i && !o.ignore && (s = D1(o, r, n)) && (!t.topTarget && (t.topTarget = o), s !== $y)) {
      t.target = o;
      break;
    }
  }
}
function Py(e, t, r) {
  var n = e.painter;
  return t < 0 || t > n.getWidth() || r < 0 || r > n.getHeight();
}
var Ry = 32, ea = 7;
function A1(e) {
  for (var t = 0; e >= Ry; )
    t |= e & 1, e >>= 1;
  return e + t;
}
function cd(e, t, r, n) {
  var i = t + 1;
  if (i === r)
    return 1;
  if (n(e[i++], e[t]) < 0) {
    for (; i < r && n(e[i], e[i - 1]) < 0; )
      i++;
    I1(e, t, i);
  } else
    for (; i < r && n(e[i], e[i - 1]) >= 0; )
      i++;
  return i - t;
}
function I1(e, t, r) {
  for (r--; t < r; ) {
    var n = e[t];
    e[t++] = e[r], e[r--] = n;
  }
}
function fd(e, t, r, n, i) {
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
function jl(e, t, r, n, i, a) {
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
function Ql(e, t, r, n, i, a) {
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
function $1(e, t) {
  var r = ea, n, i, a = 0, o = [];
  n = [], i = [];
  function s(d, v) {
    n[a] = d, i[a] = v, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var d = a - 2;
      if (d >= 1 && i[d - 1] <= i[d] + i[d + 1] || d >= 2 && i[d - 2] <= i[d] + i[d - 1])
        i[d - 1] < i[d + 1] && d--;
      else if (i[d] > i[d + 1])
        break;
      h(d);
    }
  }
  function u() {
    for (; a > 1; ) {
      var d = a - 2;
      d > 0 && i[d - 1] < i[d + 1] && d--, h(d);
    }
  }
  function h(d) {
    var v = n[d], g = i[d], p = n[d + 1], y = i[d + 1];
    i[d] = g + y, d === a - 3 && (n[d + 1] = n[d + 2], i[d + 1] = i[d + 2]), a--;
    var m = Ql(e[p], e, v, g, 0, t);
    v += m, g -= m, g !== 0 && (y = jl(e[v + g - 1], e, p, y, y - 1, t), y !== 0 && (g <= y ? c(v, g, p, y) : f(v, g, p, y)));
  }
  function c(d, v, g, p) {
    var y = 0;
    for (y = 0; y < v; y++)
      o[y] = e[d + y];
    var m = 0, _ = g, b = d;
    if (e[b++] = e[_++], --p === 0) {
      for (y = 0; y < v; y++)
        e[b + y] = o[m + y];
      return;
    }
    if (v === 1) {
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
        } else if (e[b++] = o[m++], w++, x = 0, --v === 1) {
          M = !0;
          break;
        }
      while ((w | x) < S);
      if (M)
        break;
      do {
        if (w = Ql(e[_], o, m, v, 0, t), w !== 0) {
          for (y = 0; y < w; y++)
            e[b + y] = o[m + y];
          if (b += w, m += w, v -= w, v <= 1) {
            M = !0;
            break;
          }
        }
        if (e[b++] = e[_++], --p === 0) {
          M = !0;
          break;
        }
        if (x = jl(o[m], e, _, p, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            e[b + y] = e[_ + y];
          if (b += x, _ += x, p -= x, p === 0) {
            M = !0;
            break;
          }
        }
        if (e[b++] = o[m++], --v === 1) {
          M = !0;
          break;
        }
        S--;
      } while (w >= ea || x >= ea);
      if (M)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (r = S, r < 1 && (r = 1), v === 1) {
      for (y = 0; y < p; y++)
        e[b + y] = e[_ + y];
      e[b + p] = o[m];
    } else {
      if (v === 0)
        throw new Error();
      for (y = 0; y < v; y++)
        e[b + y] = o[m + y];
    }
  }
  function f(d, v, g, p) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = e[g + y];
    var m = d + v - 1, _ = p - 1, b = g + p - 1, S = 0, w = 0;
    if (e[b--] = e[m--], --v === 0) {
      for (S = b - (p - 1), y = 0; y < p; y++)
        e[S + y] = o[y];
      return;
    }
    if (p === 1) {
      for (b -= v, m -= v, w = b + 1, S = m + 1, y = v - 1; y >= 0; y--)
        e[w + y] = e[S + y];
      e[b] = o[_];
      return;
    }
    for (var x = r; ; ) {
      var M = 0, D = 0, A = !1;
      do
        if (t(o[_], e[m]) < 0) {
          if (e[b--] = e[m--], M++, D = 0, --v === 0) {
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
        if (M = v - Ql(o[_], e, d, v, v - 1, t), M !== 0) {
          for (b -= M, m -= M, v -= M, w = b + 1, S = m + 1, y = M - 1; y >= 0; y--)
            e[w + y] = e[S + y];
          if (v === 0) {
            A = !0;
            break;
          }
        }
        if (e[b--] = o[_--], --p === 1) {
          A = !0;
          break;
        }
        if (D = p - jl(e[m], o, 0, p, p - 1, t), D !== 0) {
          for (b -= D, _ -= D, p -= D, w = b + 1, S = _ + 1, y = 0; y < D; y++)
            e[w + y] = o[S + y];
          if (p <= 1) {
            A = !0;
            break;
          }
        }
        if (e[b--] = e[m--], --v === 0) {
          A = !0;
          break;
        }
        x--;
      } while (M >= ea || D >= ea);
      if (A)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (r = x, r < 1 && (r = 1), p === 1) {
      for (b -= v, m -= v, w = b + 1, S = m + 1, y = v - 1; y >= 0; y--)
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
function fs(e, t, r, n) {
  r || (r = 0), n || (n = e.length);
  var i = n - r;
  if (!(i < 2)) {
    var a = 0;
    if (i < Ry) {
      a = cd(e, r, n, t), fd(e, r, n, r + a, t);
      return;
    }
    var o = $1(e, t), s = A1(i);
    do {
      if (a = cd(e, r, n, t), a < s) {
        var l = i;
        l > s && (l = s), fd(e, r, r + l, r + a, t), a = l;
      }
      o.pushRun(r, a), o.mergeRuns(), i -= a, r += a;
    } while (i !== 0);
    o.forceMergeRuns();
  }
}
var oe = 1, wa = 2, ci = 4, dd = !1;
function Jl() {
  dd || (dd = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function vd(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var L1 = function() {
  function e() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = vd;
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
    n.length = this._displayListLen, fs(n, vd);
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
        r && r.length ? h.__clipPaths = r : h.__clipPaths && h.__clipPaths.length > 0 && (h.__clipPaths = []), isNaN(h.z) && (Jl(), h.z = 0), isNaN(h.z2) && (Jl(), h.z2 = 0), isNaN(h.zlevel) && (Jl(), h.zlevel = 0), this._displayList[this._displayListLen++] = h;
      }
      var c = t.getDecalElement && t.getDecalElement();
      c && this._updateAndAddDisplayable(c, r, n);
      var f = t.getTextGuideLine();
      f && this._updateAndAddDisplayable(f, r, n);
      var d = t.getTextContent();
      d && this._updateAndAddDisplayable(d, r, n);
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
}(), Os;
Os = X.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
  return setTimeout(e, 16);
};
var $a = {
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
    return 1 - $a.bounceOut(1 - e);
  },
  bounceOut: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  bounceInOut: function(e) {
    return e < 0.5 ? $a.bounceIn(e * 2) * 0.5 : $a.bounceOut(e * 2 - 1) * 0.5 + 0.5;
  }
}, Co = Math.pow, Fr = Math.sqrt, Es = 1e-8, Oy = 1e-4, pd = Fr(3), Mo = 1 / 3, Ue = Vi(), ge = Vi(), Si = Vi();
function Nr(e) {
  return e > -Es && e < Es;
}
function Ey(e) {
  return e > Es || e < -Es;
}
function Et(e, t, r, n, i) {
  var a = 1 - i;
  return a * a * (a * e + 3 * i * t) + i * i * (i * n + 3 * a * r);
}
function gd(e, t, r, n, i) {
  var a = 1 - i;
  return 3 * (((t - e) * a + 2 * (r - t) * i) * a + (n - r) * i * i);
}
function ks(e, t, r, n, i, a) {
  var o = n + 3 * (t - r) - e, s = 3 * (r - t * 2 + e), l = 3 * (t - e), u = e - i, h = s * s - 3 * o * l, c = s * l - 9 * o * u, f = l * l - 3 * s * u, d = 0;
  if (Nr(h) && Nr(c))
    if (Nr(s))
      a[0] = 0;
    else {
      var v = -l / s;
      v >= 0 && v <= 1 && (a[d++] = v);
    }
  else {
    var g = c * c - 4 * h * f;
    if (Nr(g)) {
      var p = c / h, v = -s / o + p, y = -p / 2;
      v >= 0 && v <= 1 && (a[d++] = v), y >= 0 && y <= 1 && (a[d++] = y);
    } else if (g > 0) {
      var m = Fr(g), _ = h * s + 1.5 * o * (-c + m), b = h * s + 1.5 * o * (-c - m);
      _ < 0 ? _ = -Co(-_, Mo) : _ = Co(_, Mo), b < 0 ? b = -Co(-b, Mo) : b = Co(b, Mo);
      var v = (-s - (_ + b)) / (3 * o);
      v >= 0 && v <= 1 && (a[d++] = v);
    } else {
      var S = (2 * h * s - 3 * o * c) / (2 * Fr(h * h * h)), w = Math.acos(S) / 3, x = Fr(h), M = Math.cos(w), v = (-s - 2 * x * M) / (3 * o), y = (-s + x * (M + pd * Math.sin(w))) / (3 * o), D = (-s + x * (M - pd * Math.sin(w))) / (3 * o);
      v >= 0 && v <= 1 && (a[d++] = v), y >= 0 && y <= 1 && (a[d++] = y), D >= 0 && D <= 1 && (a[d++] = D);
    }
  }
  return d;
}
function ky(e, t, r, n, i) {
  var a = 6 * r - 12 * t + 6 * e, o = 9 * t + 3 * n - 3 * e - 9 * r, s = 3 * t - 3 * e, l = 0;
  if (Nr(o)) {
    if (Ey(a)) {
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
function Ns(e, t, r, n, i, a) {
  var o = (t - e) * i + e, s = (r - t) * i + t, l = (n - r) * i + r, u = (s - o) * i + o, h = (l - s) * i + s, c = (h - u) * i + u;
  a[0] = e, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = n;
}
function P1(e, t, r, n, i, a, o, s, l, u, h) {
  var c, f = 5e-3, d = 1 / 0, v, g, p, y;
  Ue[0] = l, Ue[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    ge[0] = Et(e, r, i, o, m), ge[1] = Et(t, n, a, s, m), p = _i(Ue, ge), p < d && (c = m, d = p);
  d = 1 / 0;
  for (var _ = 0; _ < 32 && !(f < Oy); _++)
    v = c - f, g = c + f, ge[0] = Et(e, r, i, o, v), ge[1] = Et(t, n, a, s, v), p = _i(ge, Ue), v >= 0 && p < d ? (c = v, d = p) : (Si[0] = Et(e, r, i, o, g), Si[1] = Et(t, n, a, s, g), y = _i(Si, Ue), g <= 1 && y < d ? (c = g, d = y) : f *= 0.5);
  return Fr(d);
}
function R1(e, t, r, n, i, a, o, s, l) {
  for (var u = e, h = t, c = 0, f = 1 / l, d = 1; d <= l; d++) {
    var v = d * f, g = Et(e, r, i, o, v), p = Et(t, n, a, s, v), y = g - u, m = p - h;
    c += Math.sqrt(y * y + m * m), u = g, h = p;
  }
  return c;
}
function Qt(e, t, r, n) {
  var i = 1 - n;
  return i * (i * e + 2 * n * t) + n * n * r;
}
function yd(e, t, r, n) {
  return 2 * ((1 - n) * (t - e) + n * (r - t));
}
function O1(e, t, r, n, i) {
  var a = e - 2 * t + r, o = 2 * (t - e), s = e - n, l = 0;
  if (Nr(a)) {
    if (Ey(o)) {
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
function Ny(e, t, r) {
  var n = e + r - 2 * t;
  return n === 0 ? 0.5 : (e - t) / n;
}
function Bs(e, t, r, n, i) {
  var a = (t - e) * n + e, o = (r - t) * n + t, s = (o - a) * n + a;
  i[0] = e, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = r;
}
function E1(e, t, r, n, i, a, o, s, l) {
  var u, h = 5e-3, c = 1 / 0;
  Ue[0] = o, Ue[1] = s;
  for (var f = 0; f < 1; f += 0.05) {
    ge[0] = Qt(e, r, i, f), ge[1] = Qt(t, n, a, f);
    var d = _i(Ue, ge);
    d < c && (u = f, c = d);
  }
  c = 1 / 0;
  for (var v = 0; v < 32 && !(h < Oy); v++) {
    var g = u - h, p = u + h;
    ge[0] = Qt(e, r, i, g), ge[1] = Qt(t, n, a, g);
    var d = _i(ge, Ue);
    if (g >= 0 && d < c)
      u = g, c = d;
    else {
      Si[0] = Qt(e, r, i, p), Si[1] = Qt(t, n, a, p);
      var y = _i(Si, Ue);
      p <= 1 && y < c ? (u = p, c = y) : h *= 0.5;
    }
  }
  return Fr(c);
}
function k1(e, t, r, n, i, a, o) {
  for (var s = e, l = t, u = 0, h = 1 / o, c = 1; c <= o; c++) {
    var f = c * h, d = Qt(e, r, i, f), v = Qt(t, n, a, f), g = d - s, p = v - l;
    u += Math.sqrt(g * g + p * p), s = d, l = v;
  }
  return u;
}
var N1 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function By(e) {
  var t = e && N1.exec(e);
  if (t) {
    var r = t[1].split(","), n = +Ye(r[0]), i = +Ye(r[1]), a = +Ye(r[2]), o = +Ye(r[3]);
    if (isNaN(n + i + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : ks(0, n, a, 1, l, s) && Et(0, i, o, 1, s[0]);
    };
  }
}
var B1 = function() {
  function e(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Xt, this.ondestroy = t.ondestroy || Xt, this.onrestart = t.onrestart || Xt, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = Z(t) ? t : $a[t] || By(t);
  }, e;
}(), zy = /* @__PURE__ */ function() {
  function e(t) {
    this.value = t;
  }
  return e;
}(), z1 = function() {
  function e() {
    this._len = 0;
  }
  return e.prototype.insert = function(t) {
    var r = new zy(t);
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
}(), vo = function() {
  function e(t) {
    this._list = new z1(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return e.prototype.put = function(t, r) {
    var n = this._list, i = this._map, a = null;
    if (i[t] == null) {
      var o = n.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = n.head;
        n.remove(l), delete i[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = r : s = new zy(r), s.key = t, n.insertEntry(s), i[t] = s;
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
}(), md = {
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
function Re(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function F1(e) {
  return e = Math.round(e), e < 0 ? 0 : e > 360 ? 360 : e;
}
function qa(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function tu(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? Re(parseFloat(t) / 100 * 255) : Re(parseInt(t, 10));
}
function In(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%" ? qa(parseFloat(t) / 100) : qa(parseFloat(t));
}
function eu(e, t, r) {
  return r < 0 ? r += 1 : r > 1 && (r -= 1), r * 6 < 1 ? e + (t - e) * r * 6 : r * 2 < 1 ? t : r * 3 < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function Br(e, t, r) {
  return e + (t - e) * r;
}
function fe(e, t, r, n, i) {
  return e[0] = t, e[1] = r, e[2] = n, e[3] = i, e;
}
function Mh(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var Fy = new vo(20), Do = null;
function qn(e, t) {
  Do && Mh(Do, t), Do = Fy.put(e, Do || t.slice());
}
function we(e, t) {
  if (e) {
    t = t || [];
    var r = Fy.get(e);
    if (r)
      return Mh(t, r);
    e = e + "";
    var n = e.replace(/ /g, "").toLowerCase();
    if (n in md)
      return Mh(t, md[n]), qn(e, t), t;
    var i = n.length;
    if (n.charAt(0) === "#") {
      if (i === 4 || i === 5) {
        var a = parseInt(n.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          fe(t, 0, 0, 0, 1);
          return;
        }
        return fe(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(n.slice(4), 16) / 15 : 1), qn(e, t), t;
      } else if (i === 7 || i === 9) {
        var a = parseInt(n.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          fe(t, 0, 0, 0, 1);
          return;
        }
        return fe(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(n.slice(7), 16) / 255 : 1), qn(e, t), t;
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
          h = In(u.pop());
        case "rgb":
          if (u.length >= 3)
            return fe(t, tu(u[0]), tu(u[1]), tu(u[2]), u.length === 3 ? h : In(u[3])), qn(e, t), t;
          fe(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            fe(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = In(u[3]), Dh(u, t), qn(e, t), t;
        case "hsl":
          if (u.length !== 3) {
            fe(t, 0, 0, 0, 1);
            return;
          }
          return Dh(u, t), qn(e, t), t;
        default:
          return;
      }
    }
    fe(t, 0, 0, 0, 1);
  }
}
function Dh(e, t) {
  var r = (parseFloat(e[0]) % 360 + 360) % 360 / 360, n = In(e[1]), i = In(e[2]), a = i <= 0.5 ? i * (n + 1) : i + n - i * n, o = i * 2 - a;
  return t = t || [], fe(t, Re(eu(o, a, r + 1 / 3) * 255), Re(eu(o, a, r) * 255), Re(eu(o, a, r - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function H1(e) {
  if (e) {
    var t = e[0] / 255, r = e[1] / 255, n = e[2] / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = a - i, s = (a + i) / 2, l, u;
    if (o === 0)
      l = 0, u = 0;
    else {
      s < 0.5 ? u = o / (a + i) : u = o / (2 - a - i);
      var h = ((a - t) / 6 + o / 2) / o, c = ((a - r) / 6 + o / 2) / o, f = ((a - n) / 6 + o / 2) / o;
      t === a ? l = f - c : r === a ? l = 1 / 3 + h - f : n === a && (l = 2 / 3 + c - h), l < 0 && (l += 1), l > 1 && (l -= 1);
    }
    var d = [l * 360, u, s];
    return e[3] != null && d.push(e[3]), d;
  }
}
function _d(e, t) {
  var r = we(e);
  if (r) {
    for (var n = 0; n < 3; n++)
      r[n] = r[n] * (1 - t) | 0, r[n] > 255 ? r[n] = 255 : r[n] < 0 && (r[n] = 0);
    return cr(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function ru(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    r = r || [];
    var n = e * (t.length - 1), i = Math.floor(n), a = Math.ceil(n), o = t[i], s = t[a], l = n - i;
    return r[0] = Re(Br(o[0], s[0], l)), r[1] = Re(Br(o[1], s[1], l)), r[2] = Re(Br(o[2], s[2], l)), r[3] = qa(Br(o[3], s[3], l)), r;
  }
}
function V1(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    var n = e * (t.length - 1), i = Math.floor(n), a = Math.ceil(n), o = we(t[i]), s = we(t[a]), l = n - i, u = cr([
      Re(Br(o[0], s[0], l)),
      Re(Br(o[1], s[1], l)),
      Re(Br(o[2], s[2], l)),
      qa(Br(o[3], s[3], l))
    ], "rgba");
    return r ? {
      color: u,
      leftIndex: i,
      rightIndex: a,
      value: n
    } : u;
  }
}
function nu(e, t, r, n) {
  var i = we(e);
  if (e)
    return i = H1(i), t != null && (i[0] = F1(t)), r != null && (i[1] = In(r)), n != null && (i[2] = In(n)), cr(Dh(i), "rgba");
}
function G1(e, t) {
  var r = we(e);
  if (r && t != null)
    return r[3] = qa(t), cr(r, "rgba");
}
function cr(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]), t + "(" + r + ")";
  }
}
function zs(e, t) {
  var r = we(e);
  return r ? (0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3] / 255 + (1 - r[3]) * t : 0;
}
var bd = new vo(100);
function wd(e) {
  if (H(e)) {
    var t = bd.get(e);
    return t || (t = _d(e, -0.1), bd.put(e, t)), t;
  } else if (hl(e)) {
    var r = N({}, e);
    return r.colorStops = Y(e.colorStops, function(n) {
      return {
        offset: n.offset,
        color: _d(n.color, -0.1)
      };
    }), r;
  }
  return e;
}
function W1(e) {
  return e.type === "linear";
}
function U1(e) {
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
var Ah = Array.prototype.slice;
function sr(e, t, r) {
  return (t - e) * r + e;
}
function iu(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++)
    e[a] = sr(t[a], r[a], n);
  return e;
}
function Y1(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = sr(t[o][s], r[o][s], n);
  }
  return e;
}
function Ao(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++)
    e[a] = t[a] + r[a] * n;
  return e;
}
function Sd(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++)
      e[o][s] = t[o][s] + r[o][s] * n;
  }
  return e;
}
function X1(e, t) {
  for (var r = e.length, n = t.length, i = r > n ? t : e, a = Math.min(r, n), o = i[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(r, n); s++)
    i.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function q1(e, t, r) {
  var n = e, i = t;
  if (!(!n.push || !i.push)) {
    var a = n.length, o = i.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        n.length = o;
      else
        for (var l = a; l < o; l++)
          n.push(r === 1 ? i[l] : Ah.call(i[l]));
    }
    for (var u = n[0] && n[0].length, l = 0; l < n.length; l++)
      if (r === 1)
        isNaN(n[l]) && (n[l] = i[l]);
      else
        for (var h = 0; h < u; h++)
          isNaN(n[l][h]) && (n[l][h] = i[l][h]);
  }
}
function ds(e) {
  if (ee(e)) {
    var t = e.length;
    if (ee(e[0])) {
      for (var r = [], n = 0; n < t; n++)
        r.push(Ah.call(e[n]));
      return r;
    }
    return Ah.call(e);
  }
  return e;
}
function vs(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Z1(e) {
  return ee(e && e[0]) ? 2 : 1;
}
var Io = 0, ps = 1, Hy = 2, Sa = 3, Ih = 4, $h = 5, xd = 6;
function Td(e) {
  return e === Ih || e === $h;
}
function $o(e) {
  return e === ps || e === Hy;
}
var ra = [0, 0, 0, 0], K1 = function() {
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
    var i = this.keyframes, a = i.length, o = !1, s = xd, l = r;
    if (ee(r)) {
      var u = Z1(r);
      s = u, (u === 1 && !bt(r[0]) || u === 2 && !bt(r[0][0])) && (o = !0);
    } else if (bt(r) && !Rs(r))
      s = Io;
    else if (H(r))
      if (!isNaN(+r))
        s = Io;
      else {
        var h = we(r);
        h && (l = h, s = Sa);
      }
    else if (hl(r)) {
      var c = N({}, l);
      c.colorStops = Y(r.colorStops, function(d) {
        return {
          offset: d.offset,
          color: we(d.color)
        };
      }), W1(r) ? s = Ih : U1(r) && (s = $h), l = c;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === xd) && (o = !0), this.discrete = this.discrete || o;
    var f = {
      time: t,
      value: l,
      rawValue: r,
      percent: 0
    };
    return n && (f.easing = n, f.easingFunc = Z(n) ? n : $a[n] || By(n)), i.push(f), f;
  }, e.prototype.prepare = function(t, r) {
    var n = this.keyframes;
    this._needsSort && n.sort(function(g, p) {
      return g.time - p.time;
    });
    for (var i = this.valType, a = n.length, o = n[a - 1], s = this.discrete, l = $o(i), u = Td(i), h = 0; h < a; h++) {
      var c = n[h], f = c.value, d = o.value;
      c.percent = c.time / t, s || (l && h !== a - 1 ? q1(f, d, i) : u && X1(f.colorStops, d.colorStops));
    }
    if (!s && i !== $h && r && this.needsAnimate() && r.needsAnimate() && i === r.valType && !r._finished) {
      this._additiveTrack = r;
      for (var v = n[0].value, h = 0; h < a; h++)
        i === Io ? n[h].additiveValue = n[h].value - v : i === Sa ? n[h].additiveValue = Ao([], n[h].value, v, -1) : $o(i) && (n[h].additiveValue = i === ps ? Ao([], n[h].value, v, -1) : Sd([], n[h].value, v, -1));
    }
  }, e.prototype.step = function(t, r) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var n = this._additiveTrack != null, i = n ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === Sa, h, c = this._lastFr, f = Math.min, d, v;
      if (s === 1)
        d = v = o[0];
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
        v = o[h + 1], d = o[h];
      }
      if (d && v) {
        this._lastFr = h, this._lastFrP = r;
        var p = v.percent - d.percent, y = p === 0 ? 1 : f((r - d.percent) / p, 1);
        v.easingFunc && (y = v.easingFunc(y));
        var m = n ? this._additiveValue : u ? ra : t[l];
        if (($o(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? d.rawValue : v.rawValue;
        else if ($o(a))
          a === ps ? iu(m, d[i], v[i], y) : Y1(m, d[i], v[i], y);
        else if (Td(a)) {
          var _ = d[i], b = v[i], S = a === Ih;
          t[l] = {
            type: S ? "linear" : "radial",
            x: sr(_.x, b.x, y),
            y: sr(_.y, b.y, y),
            colorStops: Y(_.colorStops, function(x, M) {
              var D = b.colorStops[M];
              return {
                offset: sr(x.offset, D.offset, y),
                color: vs(iu([], x.color, D.color, y))
              };
            }),
            global: b.global
          }, S ? (t[l].x2 = sr(_.x2, b.x2, y), t[l].y2 = sr(_.y2, b.y2, y)) : t[l].r = sr(_.r, b.r, y);
        } else if (u)
          iu(m, d[i], v[i], y), n || (t[l] = vs(m));
        else {
          var w = sr(d[i], v[i], y);
          n ? this._additiveValue = w : t[l] = w;
        }
        n && this._addToTarget(t);
      }
    }
  }, e.prototype._addToTarget = function(t) {
    var r = this.valType, n = this.propName, i = this._additiveValue;
    r === Io ? t[n] = t[n] + i : r === Sa ? (we(t[n], ra), Ao(ra, ra, i, 1), t[n] = vs(ra)) : r === ps ? Ao(t[n], t[n], i, 1) : r === Hy && Sd(t[n], t[n], i, 1);
  }, e;
}(), Gc = function() {
  function e(t, r, n, i) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = r, r && i) {
      Nc("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, r, _t(r), n);
  }, e.prototype.whenWithKeys = function(t, r, n, i) {
    for (var a = this._tracks, o = 0; o < n.length; o++) {
      var s = n[o], l = a[s];
      if (!l) {
        l = a[s] = new K1(s);
        var u = void 0, h = this._getAdditiveTrack(s);
        if (h) {
          var c = h.keyframes, f = c[c.length - 1];
          u = f && f.value, h.valType === Sa && u && (u = vs(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, ds(u), i), this._trackKeys.push(s);
      }
      l.addKeyframe(t, ds(r[s]), i);
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
        var f = new B1({
          life: i,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(d) {
            r._started = 2;
            var v = r._additiveAnimators;
            if (v) {
              for (var g = !1, p = 0; p < v.length; p++)
                if (v[p]._clip) {
                  g = !0;
                  break;
                }
              g || (r._additiveAnimators = null);
            }
            for (var p = 0; p < n.length; p++)
              n[p].step(r._target, d);
            var y = r._onframeCbs;
            if (y)
              for (var p = 0; p < y.length; p++)
                y[p](r._target, d);
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
    return Y(this._trackKeys, function(r) {
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
          l && (t[a] = ds(l.rawValue));
        }
      }
    }
  }, e.prototype.__changeFinalValue = function(t, r) {
    r = r || _t(t);
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
function gi() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var j1 = function(e) {
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
    for (var n = gi() - this._pausedTime, i = n - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(n, i);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = n, r || (this.trigger("frame", i), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var r = this;
    this._running = !0;
    function n() {
      r._running && (Os(n), !r._paused && r.update());
    }
    Os(n);
  }, t.prototype.start = function() {
    this._running || (this._time = gi(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = gi(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += gi() - this._pauseStart, this._paused = !1);
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
    var i = new Gc(r, n.loop);
    return this.addAnimator(i), i;
  }, t;
}(er), Q1 = 300, au = X.domSupported, ou = function() {
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
  }, n = Y(e, function(i) {
    var a = i.replace("mouse", "pointer");
    return r.hasOwnProperty(a) ? a : i;
  });
  return {
    mouse: e,
    touch: t,
    pointer: n
  };
}(), Cd = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Md = !1;
function Lh(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function J1(e) {
  e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function su(e) {
  e && (e.zrByTouch = !0);
}
function tS(e, t) {
  return de(e.dom, new eS(e, t), !0);
}
function Vy(e, t) {
  for (var r = t, n = !1; r && r.nodeType !== 9 && !(n = r.domBelongToZr || r !== t && r === e.painterRoot); )
    r = r.parentNode;
  return n;
}
var eS = /* @__PURE__ */ function() {
  function e(t, r) {
    this.stopPropagation = Xt, this.stopImmediatePropagation = Xt, this.preventDefault = Xt, this.type = r.type, this.target = this.currentTarget = t.dom, this.pointerType = r.pointerType, this.clientX = r.clientX, this.clientY = r.clientY;
  }
  return e;
}(), Ie = {
  mousedown: function(e) {
    e = de(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
  },
  mousemove: function(e) {
    e = de(this.dom, e);
    var t = this.__mayPointerCapture;
    t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    e = de(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
  },
  mouseout: function(e) {
    e = de(this.dom, e);
    var t = e.toElement || e.relatedTarget;
    Vy(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
  },
  wheel: function(e) {
    Md = !0, e = de(this.dom, e), this.trigger("mousewheel", e);
  },
  mousewheel: function(e) {
    Md || (e = de(this.dom, e), this.trigger("mousewheel", e));
  },
  touchstart: function(e) {
    e = de(this.dom, e), su(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), Ie.mousemove.call(this, e), Ie.mousedown.call(this, e);
  },
  touchmove: function(e) {
    e = de(this.dom, e), su(e), this.handler.processGesture(e, "change"), Ie.mousemove.call(this, e);
  },
  touchend: function(e) {
    e = de(this.dom, e), su(e), this.handler.processGesture(e, "end"), Ie.mouseup.call(this, e), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < Q1 && Ie.click.call(this, e);
  },
  pointerdown: function(e) {
    Ie.mousedown.call(this, e);
  },
  pointermove: function(e) {
    Lh(e) || Ie.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Ie.mouseup.call(this, e);
  },
  pointerout: function(e) {
    Lh(e) || Ie.mouseout.call(this, e);
  }
};
C(["click", "dblclick", "contextmenu"], function(e) {
  Ie[e] = function(t) {
    t = de(this.dom, t), this.trigger(e, t);
  };
});
var Ph = {
  pointermove: function(e) {
    Lh(e) || Ph.mousemove.call(this, e);
  },
  pointerup: function(e) {
    Ph.mouseup.call(this, e);
  },
  mousemove: function(e) {
    this.trigger("mousemove", e);
  },
  mouseup: function(e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function rS(e, t) {
  var r = t.domHandlers;
  X.pointerEventsSupported ? C(ou.pointer, function(n) {
    gs(t, n, function(i) {
      r[n].call(e, i);
    });
  }) : (X.touchEventsSupported && C(ou.touch, function(n) {
    gs(t, n, function(i) {
      r[n].call(e, i), J1(t);
    });
  }), C(ou.mouse, function(n) {
    gs(t, n, function(i) {
      i = zc(i), t.touching || r[n].call(e, i);
    });
  }));
}
function nS(e, t) {
  X.pointerEventsSupported ? C(Cd.pointer, r) : X.touchEventsSupported || C(Cd.mouse, r);
  function r(n) {
    function i(a) {
      a = zc(a), Vy(e, a.target) || (a = tS(e, a), t.domHandlers[n].call(e, a));
    }
    gs(t, n, i, { capture: !0 });
  }
}
function gs(e, t, r, n) {
  e.mounted[t] = r, e.listenerOpts[t] = n, y1(e.domTarget, t, r, n);
}
function lu(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && m1(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var Dd = /* @__PURE__ */ function() {
  function e(t, r) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = r;
  }
  return e;
}(), iS = function(e) {
  B(t, e);
  function t(r, n) {
    var i = e.call(this) || this;
    return i.__pointerCapturing = !1, i.dom = r, i.painterRoot = n, i._localHandlerScope = new Dd(r, Ie), au && (i._globalHandlerScope = new Dd(document, Ph)), rS(i, i._localHandlerScope), i;
  }
  return t.prototype.dispose = function() {
    lu(this._localHandlerScope), au && lu(this._globalHandlerScope);
  }, t.prototype.setCursor = function(r) {
    this.dom.style && (this.dom.style.cursor = r || "default");
  }, t.prototype.__togglePointerCapture = function(r) {
    if (this.__mayPointerCapture = null, au && +this.__pointerCapturing ^ +r) {
      this.__pointerCapturing = r;
      var n = this._globalHandlerScope;
      r ? nS(this, n) : lu(n);
    }
  }, t;
}(er), Gy = 1;
X.hasGlobalWindow && (Gy = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Fs = Gy, Rh = 0.4, Oh = "#333", Eh = "#ccc", aS = "#eee", Ad = Fc, Id = 5e-5;
function nn(e) {
  return e > Id || e < -Id;
}
var an = [], Zn = [], uu = bi(), hu = Math.abs, Wc = function() {
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
    return nn(this.rotation) || nn(this.x) || nn(this.y) || nn(this.scaleX - 1) || nn(this.scaleY - 1) || nn(this.skewX) || nn(this.skewY);
  }, e.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, r = this.needLocalTransform(), n = this.transform;
    if (!(r || t)) {
      n && (Ad(n), this.invTransform = null);
      return;
    }
    n = n || bi(), r ? this.getLocalTransform(n) : Ad(n), t && (r ? wi(n, t, n) : w1(n, t)), this.transform = n, this._resolveGlobalScaleRatio(n);
  }, e.prototype._resolveGlobalScaleRatio = function(t) {
    var r = this.globalScaleRatio;
    if (r != null && r !== 1) {
      this.getGlobalScale(an);
      var n = an[0] < 0 ? -1 : 1, i = an[1] < 0 ? -1 : 1, a = ((an[0] - n) * r + n) / an[0] || 0, o = ((an[1] - i) * r + i) / an[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || bi(), Vc(this.invTransform, t);
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
      t && t.transform && (t.invTransform = t.invTransform || bi(), wi(Zn, t.invTransform, r), r = Zn);
      var n = this.originX, i = this.originY;
      (n || i) && (uu[4] = n, uu[5] = i, wi(Zn, r, uu), Zn[4] -= n, Zn[5] -= i, r = Zn), this.setLocalTransform(r);
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
    return t && hu(t[0] - 1) > 1e-10 && hu(t[3] - 1) > 1e-10 ? Math.sqrt(hu(t[0] * t[3] - t[2] * t[1])) : 1;
  }, e.prototype.copyTransform = function(t) {
    oS(this, t);
  }, e.getLocalTransform = function(t, r) {
    r = r || [];
    var n = t.originX || 0, i = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, h = t.x, c = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (n || i || s || l) {
      var v = n + s, g = i + l;
      r[4] = -v * a - f * g * o, r[5] = -g * o - d * v * a;
    } else
      r[4] = r[5] = 0;
    return r[0] = a, r[3] = o, r[1] = d * a, r[2] = f * o, u && Hc(r, r, u), r[4] += n + h, r[5] += i + c, r;
  }, e.initDefaultProps = function() {
    var t = e.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), e;
}(), Za = [
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
function oS(e, t) {
  for (var r = 0; r < Za.length; r++) {
    var n = Za[r];
    e[n] = t[n];
  }
}
var $d = {};
function se(e, t) {
  t = t || On;
  var r = $d[t];
  r || (r = $d[t] = new vo(500));
  var n = r.get(e);
  return n == null && (n = Wr.measureText(e, t).width, r.put(e, n)), n;
}
function Ld(e, t, r, n) {
  var i = se(e, t), a = Yc(t), o = xa(0, i, r), s = fi(0, a, n), l = new ut(o, s, i, a);
  return l;
}
function Uc(e, t, r, n) {
  var i = ((e || "") + "").split(`
`), a = i.length;
  if (a === 1)
    return Ld(i[0], t, r, n);
  for (var o = new ut(0, 0, 0, 0), s = 0; s < i.length; s++) {
    var l = Ld(i[s], t, r, n);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function xa(e, t, r) {
  return r === "right" ? e -= t : r === "center" && (e -= t / 2), e;
}
function fi(e, t, r) {
  return r === "middle" ? e -= t / 2 : r === "bottom" && (e -= t), e;
}
function Yc(e) {
  return se("国", e);
}
function Ke(e, t) {
  return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function Hs(e, t, r) {
  var n = t.position || "inside", i = t.distance != null ? t.distance : 5, a = r.height, o = r.width, s = a / 2, l = r.x, u = r.y, h = "left", c = "top";
  if (n instanceof Array)
    l += Ke(n[0], r.width), u += Ke(n[1], r.height), h = null, c = null;
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
var cu = "__zr_normal__", fu = Za.concat(["ignore"]), sS = Hi(Za, function(e, t) {
  return e[t] = !0, e;
}, { ignore: !1 }), Kn = {}, lS = new ut(0, 0, 0, 0), fl = function() {
  function e(t) {
    this.id = Ty(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = lS;
        n.layoutRect ? h.copy(n.layoutRect) : h.copy(this.getBoundingRect()), i || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(Kn, n, h) : Hs(Kn, n, h), a.x = Kn.x, a.y = Kn.y, o = Kn.align, s = Kn.verticalAlign;
        var c = n.origin;
        if (c && n.rotation != null) {
          var f = void 0, d = void 0;
          c === "center" ? (f = h.width * 0.5, d = h.height * 0.5) : (f = Ke(c[0], h.width), d = Ke(c[1], h.height)), u = !0, a.originX = -a.x + f + (i ? 0 : h.x), a.originY = -a.y + d + (i ? 0 : h.y);
        }
      }
      n.rotation != null && (a.rotation = n.rotation);
      var v = n.offset;
      v && (a.x += v[0], a.y += v[1], u || (a.originX = -v[0], a.originY = -v[1]));
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
    return this.__zr && this.__zr.isDarkMode() ? Eh : Oh;
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
      for (var n = t, i = _t(n), a = 0; a < i.length; a++) {
        var o = i[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, e.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var r = this._normalState, n = 0; n < this.animators.length; n++) {
      var i = this.animators[n], a = i.__fromStateTransition;
      if (!(i.getLoop() || a && a !== cu)) {
        var o = i.targetName, s = o ? r[o] : r;
        i.saveTo(s);
      }
    }
  }, e.prototype._innerSaveToNormal = function(t) {
    var r = this._normalState;
    r || (r = this._normalState = {}), t.textConfig && !r.textConfig && (r.textConfig = this.textConfig), this._savePrimaryToNormal(t, r, fu);
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
    this.useState(cu, !1, t);
  }, e.prototype.useState = function(t, r, n, i) {
    var a = t === cu, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(pt(s, t) >= 0 && (r || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          Nc("State " + t + " not exists.");
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
      var d = this._mergeStates(i), v = this.stateTransition;
      this.saveCurrentToNormalState(d), this._applyStateObj(t.join(","), d, this._normalState, !1, !r && !this.__inHover && v && v.duration > 0, v);
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
    for (var l = {}, u = !1, h = 0; h < fu.length; h++) {
      var c = fu[h], f = a && sS[c];
      r && r[c] != null ? f ? (u = !0, l[c] = r[c]) : this[c] = r[c] : s && n[c] != null && (f ? (u = !0, l[c] = n[c]) : this[c] = n[c]);
    }
    if (!a)
      for (var h = 0; h < this.animators.length; h++) {
        var d = this.animators[h], v = d.targetName;
        d.getLoop() || d.__changeFinalValue(v ? (r || n)[v] : r || n);
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
    r !== t && (r && r !== t && this.removeTextContent(), t.innerTransformable = new Wc(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    var i = t ? this[t] : this, a = new Gc(i, r, n);
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
    du(this, t, r, n);
  }, e.prototype.animateFrom = function(t, r, n) {
    du(this, t, r, n, !0);
  }, e.prototype._transitionState = function(t, r, n, i) {
    for (var a = du(this, r, n, i), o = 0; o < a.length; o++)
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
tr(fl, er);
tr(fl, Wc);
function du(e, t, r, n, i) {
  r = r || {};
  var a = [];
  Wy(e, "", e, t, r, n, a, i);
  var o = a.length, s = !1, l = r.done, u = r.aborted, h = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, c = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && r.during && a[0].during(function(v, g) {
    r.during(g);
  });
  for (var f = 0; f < a.length; f++) {
    var d = a[f];
    h && d.done(h), c && d.aborted(c), r.force && d.duration(r.duration), d.start(r.easing);
  }
  return a;
}
function vu(e, t, r) {
  for (var n = 0; n < r; n++)
    e[n] = t[n];
}
function uS(e) {
  return ee(e[0]);
}
function hS(e, t, r) {
  if (ee(t[r]))
    if (ee(e[r]) || (e[r] = []), re(t[r])) {
      var n = t[r].length;
      e[r].length !== n && (e[r] = new t[r].constructor(n), vu(e[r], t[r], n));
    } else {
      var i = t[r], a = e[r], o = i.length;
      if (uS(i))
        for (var s = i[0].length, l = 0; l < o; l++)
          a[l] ? vu(a[l], i[l], s) : a[l] = Array.prototype.slice.call(i[l]);
      else
        vu(a, i, o);
      a.length = i.length;
    }
  else
    e[r] = t[r];
}
function cS(e, t) {
  return e === t || ee(e) && ee(t) && fS(e, t);
}
function fS(e, t) {
  var r = e.length;
  if (r !== t.length)
    return !1;
  for (var n = 0; n < r; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Wy(e, t, r, n, i, a, o, s) {
  for (var l = _t(n), u = i.duration, h = i.delay, c = i.additive, f = i.setToFinal, d = !V(a), v = e.animators, g = [], p = 0; p < l.length; p++) {
    var y = l[p], m = n[y];
    if (m != null && r[y] != null && (d || a[y]))
      if (V(m) && !ee(m) && !hl(m)) {
        if (t) {
          s || (r[y] = m, e.updateDuringAnimation(t));
          continue;
        }
        Wy(e, y, r[y], m, i, a && a[y], o, s);
      } else
        g.push(y);
    else s || (r[y] = m, e.updateDuringAnimation(t), g.push(y));
  }
  var _ = g.length;
  if (!c && _)
    for (var b = 0; b < v.length; b++) {
      var S = v[b];
      if (S.targetName === t) {
        var w = S.stopTracks(g);
        if (w) {
          var x = pt(v, S);
          v.splice(x, 1);
        }
      }
    }
  if (i.force || (g = Ot(g, function(T) {
    return !cS(n[T], r[T]);
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
        A[y] = ds(r[y]), hS(r, n, y);
      }
    }
    var S = new Gc(r, !1, !1, c ? Ot(v, function($) {
      return $.targetName === t;
    }) : null);
    S.targetName = t, i.scope && (S.scope = i.scope), f && M && S.whenWithKeys(0, M, g), A && S.whenWithKeys(0, A, g), S.whenWithKeys(u ?? 500, s ? D : n, g).delay(h || 0), e.addAnimator(S, t), o.push(S);
  }
}
var Dt = function(e) {
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
}(fl);
Dt.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var ys = {}, Uy = {};
function dS(e) {
  delete Uy[e];
}
function vS(e) {
  if (!e)
    return !1;
  if (typeof e == "string")
    return zs(e, 1) < Rh;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, n = t.length, i = 0; i < n; i++)
      r += zs(t[i].color, 1);
    return r /= n, r < Rh;
  }
  return !1;
}
var pS = function() {
  function e(t, r, n) {
    var i = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, n = n || {}, this.dom = r, this.id = t;
    var a = new L1(), o = n.renderer || "canvas";
    ys[o] || (o = _t(ys)[0]), n.useDirtyRect = n.useDirtyRect == null ? !1 : n.useDirtyRect;
    var s = new ys[o](r, a, n, t), l = n.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !X.node && !X.worker && !l ? new iS(s.getViewportRoot(), s.root) : null, h = n.useCoarsePointer, c = h == null || h === "auto" ? X.touchEventsSupported : !!h, f = 44, d;
    c && (d = tt(n.pointerSize, f)), this.handler = new Ly(a, s, u, s.root, d), this.animation = new j1({
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
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = vS(t));
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
    var r, n = gi();
    this._needsRefresh && (r = !0, this.refreshImmediately(t)), this._needsRefreshHover && (r = !0, this.refreshHoverImmediately());
    var i = gi();
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
        t[r] instanceof Dt && t[r].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, e.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, dS(this.id));
  }, e;
}();
function Pd(e, t) {
  var r = new pS(Ty(), e, t);
  return Uy[r.id] = r, r;
}
function gS(e, t) {
  ys[e] = t;
}
var Rd = 1e-4, Yy = 20;
function yS(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function dr(e, t, r, n) {
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
function Yt(e, t) {
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
  return H(e) ? yS(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : e == null ? NaN : +e;
}
function At(e, t, r) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), Yy), e = (+e).toFixed(t), r ? e : +e;
}
function Xy(e) {
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
  return mS(e);
}
function mS(e) {
  var t = e.toString().toLowerCase(), r = t.indexOf("e"), n = r > 0 ? +t.slice(r + 1) : 0, i = r > 0 ? r : t.length, a = t.indexOf("."), o = a < 0 ? 0 : i - 1 - a;
  return Math.max(0, o - n);
}
function _S(e, t) {
  var r = Math.log, n = Math.LN10, i = Math.floor(r(e[1] - e[0]) / n), a = Math.round(r(Math.abs(t[1] - t[0])) / n), o = Math.min(Math.max(-i + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function bS(e, t) {
  var r = Math.max(lr(e), lr(t)), n = e + t;
  return r > Yy ? n : At(n, r);
}
function qy(e) {
  var t = Math.PI * 2;
  return (e % t + t) % t;
}
function Vs(e) {
  return e > -Rd && e < Rd;
}
var wS = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function vr(e) {
  if (e instanceof Date)
    return e;
  if (H(e)) {
    var t = wS.exec(e);
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
function SS(e) {
  return Math.pow(10, Xc(e));
}
function Xc(e) {
  if (e === 0)
    return 0;
  var t = Math.floor(Math.log(e) / Math.LN10);
  return e / Math.pow(10, t) >= 10 && t++, t;
}
function Zy(e, t) {
  var r = Xc(e), n = Math.pow(10, r), i = e / n, a;
  return i < 1.5 ? a = 1 : i < 2.5 ? a = 2 : i < 4 ? a = 3 : i < 7 ? a = 5 : a = 10, e = a * n, r >= -20 ? +e.toFixed(r < 0 ? -r : 0) : e;
}
function Od(e) {
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
function Gs(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !H(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function xS(e) {
  return !isNaN(Gs(e));
}
function Ky() {
  return Math.round(Math.random() * 9);
}
function jy(e, t) {
  return t === 0 ? e : jy(t, e % t);
}
function Ed(e, t) {
  return e == null ? t : t == null ? e : e * t / jy(e, t);
}
function Jt(e) {
  throw new Error(e);
}
function kd(e, t, r) {
  return (t - e) * r + e;
}
var Qy = "series\0", TS = "\0_ec_\0";
function kt(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function Nd(e, t, r) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var n = 0, i = r.length; n < i; n++) {
      var a = r[n];
      !e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var Bd = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function po(e) {
  return V(e) && !z(e) && !(e instanceof Date) ? e.value : e;
}
function CS(e) {
  return V(e) && !(e instanceof Array);
}
function MS(e, t, r) {
  var n = r === "normalMerge", i = r === "replaceMerge", a = r === "replaceAll";
  e = e || [], t = (t || []).slice();
  var o = Q();
  C(t, function(l, u) {
    if (!V(l)) {
      t[u] = null;
      return;
    }
  });
  var s = DS(e, o, r);
  return (n || i) && AS(s, e, o, t), n && IS(s, t), n || i ? $S(s, t, i) : a && LS(s, t), PS(s), s;
}
function DS(e, t, r) {
  var n = [];
  if (r === "replaceAll")
    return n;
  for (var i = 0; i < e.length; i++) {
    var a = e[i];
    a && a.id != null && t.set(a.id, i), n.push({
      existing: r === "replaceMerge" || Ka(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return n;
}
function AS(e, t, r, n) {
  C(n, function(i, a) {
    if (!(!i || i.id == null)) {
      var o = La(i.id), s = r.get(o);
      if (s != null) {
        var l = e[s];
        Ze(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = i, l.existing = t[s], n[a] = null;
      }
    }
  });
}
function IS(e, t) {
  C(t, function(r, n) {
    if (!(!r || r.name == null))
      for (var i = 0; i < e.length; i++) {
        var a = e[i].existing;
        if (!e[i].newOption && a && (a.id == null || r.id == null) && !Ka(r) && !Ka(a) && Jy("name", a, r)) {
          e[i].newOption = r, t[n] = null;
          return;
        }
      }
  });
}
function $S(e, t, r) {
  C(t, function(n) {
    if (n) {
      for (
        var i, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (i = e[a]) && (i.newOption || Ka(i.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        i.existing && n.id != null && !Jy("id", n, i.existing));
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
function LS(e, t) {
  C(t, function(r) {
    e.push({
      newOption: r,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function PS(e) {
  var t = Q();
  C(e, function(r) {
    var n = r.existing;
    n && t.set(n.id, r);
  }), C(e, function(r) {
    var n = r.newOption;
    Ze(!n || n.id == null || !t.get(n.id) || t.get(n.id) === r, "id duplicates: " + (n && n.id)), n && n.id != null && t.set(n.id, r), !r.keyInfo && (r.keyInfo = {});
  }), C(e, function(r, n) {
    var i = r.existing, a = r.newOption, o = r.keyInfo;
    if (V(a)) {
      if (o.name = a.name != null ? La(a.name) : i ? i.name : Qy + n, i)
        o.id = La(i.id);
      else if (a.id != null)
        o.id = La(a.id);
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
function Jy(e, t, r) {
  var n = Oe(t[e], null), i = Oe(r[e], null);
  return n != null && i != null && n === i;
}
function La(e) {
  return Oe(e, "");
}
function Oe(e, t) {
  return e == null ? t : H(e) ? e : bt(e) || _h(e) ? e + "" : t;
}
function qc(e) {
  var t = e.name;
  return !!(t && t.indexOf(Qy));
}
function Ka(e) {
  return e && e.id != null && La(e.id).indexOf(TS) === 0;
}
function RS(e, t, r) {
  C(e, function(n) {
    var i = n.newOption;
    V(i) && (n.keyInfo.mainType = t, n.keyInfo.subType = OS(t, i, n.existing, r));
  });
}
function OS(e, t, r, n) {
  var i = t.type ? t.type : r ? r.subType : n.determineSubType(e, t);
  return i;
}
function ES(e, t) {
  var r = {}, n = {};
  return i(e || [], r), i(t || [], n, r), [a(r), a(n)];
  function i(o, s, l) {
    for (var u = 0, h = o.length; u < h; u++) {
      var c = Oe(o[u].seriesId, null);
      if (c == null)
        return;
      for (var f = kt(o[u].dataIndex), d = l && l[c], v = 0, g = f.length; v < g; v++) {
        var p = f[v];
        d && d[p] ? d[p] = null : (s[c] || (s[c] = {}))[p] = 1;
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
function kn(e, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return z(t.dataIndex) ? Y(t.dataIndex, function(r) {
      return e.indexOfRawIndex(r);
    }) : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return z(t.name) ? Y(t.name, function(r) {
      return e.indexOfName(r);
    }) : e.indexOfName(t.name);
}
function Lt() {
  var e = "__ec_inner_" + kS++;
  return function(t) {
    return t[e] || (t[e] = {});
  };
}
var kS = Ky();
function pu(e, t, r) {
  var n = Zc(t, r), i = n.mainTypeSpecified, a = n.queryOptionMap, o = n.others, s = o, l = r ? r.defaultMainType : null;
  return !i && l && a.set(l, {}), a.each(function(u, h) {
    var c = go(e, h, u, {
      useDefault: l === h,
      enableAll: r && r.enableAll != null ? r.enableAll : !0,
      enableNone: r && r.enableNone != null ? r.enableNone : !0
    });
    s[h + "Models"] = c.models, s[h + "Model"] = c.models[0];
  }), s;
}
function Zc(e, t) {
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
var Le = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function go(e, t, r, n) {
  n = n || Le;
  var i = r.index, a = r.id, o = r.name, s = {
    models: null,
    specified: i != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = n.useDefault && (l = e.getComponent(t)) ? [l] : [], s;
  }
  return i === "none" || i === !1 ? (Ze(n.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (i === "all" && (Ze(n.enableAll, '`"all"` is not a valid value on index option.'), i = a = o = null), s.models = e.queryComponents({
    mainType: t,
    index: i,
    id: a,
    name: o
  }), s);
}
function tm(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : e[t] = r;
}
function NS(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function BS(e) {
  return e === "auto" ? X.domSupported ? "html" : "richText" : e || "html";
}
function zS(e, t, r, n, i) {
  var a = t == null || t === "auto";
  if (n == null)
    return n;
  if (bt(n)) {
    var o = kd(r || 0, n, i);
    return At(o, a ? Math.max(lr(r || 0), lr(n)) : t);
  } else {
    if (H(n))
      return i < 1 ? r : n;
    for (var s = [], l = r, u = n, h = Math.max(l ? l.length : 0, u.length), c = 0; c < h; ++c) {
      var f = e.getDimensionInfo(c);
      if (f && f.type === "ordinal")
        s[c] = (i < 1 && l ? l : u)[c];
      else {
        var d = l && l[c] ? l[c] : 0, v = u[c], o = kd(d, v, i);
        s[c] = At(o, a ? Math.max(lr(d), lr(v)) : t);
      }
    }
    return s;
  }
}
var FS = ".", on = "___EC__COMPONENT__CONTAINER___", em = "___EC__EXTENDED_CLASS___";
function Xe(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var r = e.split(FS);
    t.main = r[0] || "", t.sub = r[1] || "";
  }
  return t;
}
function HS(e) {
  Ze(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function VS(e) {
  return !!(e && e[em]);
}
function Kc(e, t) {
  e.$constructor = e, e.extend = function(r) {
    var n = this, i;
    return GS(n) ? i = /** @class */
    function(a) {
      B(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    }(n) : (i = function() {
      (r.$constructor || n).apply(this, arguments);
    }, Yw(i, this)), N(i.prototype, r), i[em] = !0, i.extend = this.extend, i.superCall = YS, i.superApply = XS, i.superClass = n, i;
  };
}
function GS(e) {
  return Z(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function rm(e, t) {
  e.extend = t.extend;
}
var WS = Math.round(Math.random() * 10);
function US(e) {
  var t = ["__\0is_clz", WS++].join("_");
  e.prototype[t] = !0, e.isInstance = function(r) {
    return !!(r && r[t]);
  };
}
function YS(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  return this.superClass.prototype[t].apply(e, r);
}
function XS(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function dl(e) {
  var t = {};
  e.registerClass = function(n) {
    var i = n.type || n.prototype.type;
    if (i) {
      HS(i), n.prototype.type = i;
      var a = Xe(i);
      if (!a.sub)
        t[a.main] = n;
      else if (a.sub !== on) {
        var o = r(a);
        o[a.sub] = n;
      }
    }
    return n;
  }, e.getClass = function(n, i, a) {
    var o = t[n];
    if (o && o[on] && (o = i ? o[i] : null), a && !o)
      throw new Error(i ? "Component " + n + "." + (i || "") + " is used but not imported." : n + ".type should be specified.");
    return o;
  }, e.getClassesByMainType = function(n) {
    var i = Xe(n), a = [], o = t[i.main];
    return o && o[on] ? C(o, function(s, l) {
      l !== on && a.push(s);
    }) : a.push(o), a;
  }, e.hasClass = function(n) {
    var i = Xe(n);
    return !!t[i.main];
  }, e.getAllClassMainTypes = function() {
    var n = [];
    return C(t, function(i, a) {
      n.push(a);
    }), n;
  }, e.hasSubTypes = function(n) {
    var i = Xe(n), a = t[i.main];
    return a && a[on];
  };
  function r(n) {
    var i = t[n.main];
    return (!i || !i[on]) && (i = t[n.main] = {}, i[on] = !0), i;
  }
}
function ja(e, t) {
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
var qS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], ZS = ja(qS), KS = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getAreaStyle = function(t, r) {
      return ZS(this, t, r);
    }, e;
  }()
), kh = new vo(50);
function jS(e) {
  if (typeof e == "string") {
    var t = kh.get(e);
    return t && t.image;
  } else
    return e;
}
function nm(e, t, r, n, i) {
  if (e)
    if (typeof e == "string") {
      if (t && t.__zrImageSrc === e || !r)
        return t;
      var a = kh.get(e), o = { hostEl: r, cb: n, cbPayload: i };
      return a ? (t = a.image, !vl(t) && a.pending.push(o)) : (t = Wr.loadImage(e, zd, zd), t.__zrImageSrc = e, kh.put(e, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return e;
  else return t;
}
function zd() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t], n = r.cb;
    n && n(this, r.cbPayload), r.hostEl.dirty();
  }
  e.pending.length = 0;
}
function vl(e) {
  return e && e.width && e.height;
}
var gu = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function QS(e, t, r, n, i, a) {
  if (!r) {
    e.text = "", e.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = im(r, n, i, a);
  for (var s = !1, l = {}, u = 0, h = o.length; u < h; u++)
    am(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  e.text = o.join(`
`), e.isTruncated = s;
}
function im(e, t, r, n) {
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
function am(e, t, r) {
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
    var l = s === 0 ? JS(t, a, r.ascCharWidth, r.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = se(t, i);
  }
  t === "" && (t = r.placeholder), e.textLine = t, e.isTruncated = !0;
}
function JS(e, t, r, n) {
  for (var i = 0, a = 0, o = e.length; a < o && i < t; a++) {
    var s = e.charCodeAt(a);
    i += 0 <= s && s <= 127 ? r : n;
  }
  return a;
}
function tx(e, t) {
  e != null && (e += "");
  var r = t.overflow, n = t.padding, i = t.font, a = r === "truncate", o = Yc(i), s = tt(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", h = !1, c = t.width, f;
  c != null && (r === "break" || r === "breakAll") ? f = e ? om(e, t.font, c, r === "breakAll", 0).lines : [] : f = e ? e.split(`
`) : [];
  var d = f.length * s, v = tt(t.height, d);
  if (d > v && u) {
    var g = Math.floor(v / s);
    h = h || f.length > g, f = f.slice(0, g);
  }
  if (e && a && c != null)
    for (var p = im(c, i, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < f.length; m++)
      am(y, f[m], p), f[m] = y.textLine, h = h || y.isTruncated;
  for (var _ = v, b = 0, m = 0; m < f.length; m++)
    b = Math.max(se(f[m], i), b);
  c == null && (c = b);
  var S = b;
  return n && (_ += n[0] + n[2], S += n[1] + n[3], c += n[1] + n[3]), l && (S = c), {
    lines: f,
    height: v,
    outerWidth: S,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: b,
    contentHeight: d,
    width: c,
    isTruncated: h
  };
}
var ex = /* @__PURE__ */ function() {
  function e() {
  }
  return e;
}(), Fd = /* @__PURE__ */ function() {
  function e(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return e;
}(), rx = /* @__PURE__ */ function() {
  function e() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return e;
}();
function nx(e, t) {
  var r = new rx();
  if (e != null && (e += ""), !e)
    return r;
  for (var n = t.width, i = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && n != null ? { width: n, accumWidth: 0, breakAll: a === "breakAll" } : null, s = gu.lastIndex = 0, l; (l = gu.exec(e)) != null; ) {
    var u = l.index;
    u > s && yu(r, e.substring(s, u), t, o), yu(r, l[2], t, o, l[1]), s = gu.lastIndex;
  }
  s < e.length && yu(r, e.substring(s, e.length), t, o);
  var h = [], c = 0, f = 0, d = t.padding, v = a === "truncate", g = t.lineOverflow === "truncate", p = {};
  function y(W, j, nt) {
    W.width = j, W.lineHeight = nt, c += nt, f = Math.max(f, j);
  }
  t: for (var m = 0; m < r.lines.length; m++) {
    for (var _ = r.lines[m], b = 0, S = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], M = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = M.padding, A = D ? D[1] + D[3] : 0, T = x.font = M.font || t.font;
      x.contentHeight = Yc(T);
      var $ = tt(M.height, x.contentHeight);
      if (x.innerHeight = $, D && ($ += D[0] + D[2]), x.height = $, x.lineHeight = cs(M.lineHeight, t.lineHeight, $), x.align = M && M.align || t.align, x.verticalAlign = M && M.verticalAlign || "middle", g && i != null && c + x.lineHeight > i) {
        var L = r.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, S, b), r.lines = r.lines.slice(0, m + 1)) : r.lines = r.lines.slice(0, m), r.isTruncated = r.isTruncated || r.lines.length < L;
        break t;
      }
      var P = M.width, R = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, h.push(x), x.contentWidth = se(x.text, T);
      else {
        if (R) {
          var E = M.backgroundColor, G = E && E.image;
          G && (G = jS(G), vl(G) && (x.width = Math.max(x.width, G.width * $ / G.height)));
        }
        var k = v && n != null ? n - S : null;
        k != null && k < x.width ? !R || k < A ? (x.text = "", x.width = x.contentWidth = 0) : (QS(p, x.text, k - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = p.text, r.isTruncated = r.isTruncated || p.isTruncated, x.width = x.contentWidth = se(x.text, T)) : x.contentWidth = se(x.text, T);
      }
      x.width += A, S += x.width, M && (b = Math.max(b, x.lineHeight));
    }
    y(_, S, b);
  }
  r.outerWidth = r.width = tt(n, f), r.outerHeight = r.height = tt(i, c), r.contentHeight = c, r.contentWidth = f, d && (r.outerWidth += d[1] + d[3], r.outerHeight += d[0] + d[2]);
  for (var m = 0; m < h.length; m++) {
    var x = h[m], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * r.width;
  }
  return r;
}
function yu(e, t, r, n, i) {
  var a = t === "", o = i && r.rich[i] || {}, s = e.lines, l = o.font || r.font, u = !1, h, c;
  if (n) {
    var f = o.padding, d = f ? f[1] + f[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var v = Ke(o.width, n.width) + d;
      s.length > 0 && v + n.accumWidth > n.width && (h = t.split(`
`), u = !0), n.accumWidth = v;
    } else {
      var g = om(t, l, n.width, n.breakAll, n.accumWidth);
      n.accumWidth = g.accumWidth + d, c = g.linesWidths, h = g.lines;
    }
  } else
    h = t.split(`
`);
  for (var p = 0; p < h.length; p++) {
    var y = h[p], m = new ex();
    if (m.styleName = i, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = c ? c[p] : se(y, l), !p && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Fd())).tokens, b = _.length;
      b === 1 && _[0].isLineHolder ? _[0] = m : (y || !b || a) && _.push(m);
    } else
      s.push(new Fd([m]));
  }
}
function ix(e) {
  var t = e.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var ax = Hi(",&?/;] ".split(""), function(e, t) {
  return e[t] = !0, e;
}, {});
function ox(e) {
  return ix(e) ? !!ax[e] : !0;
}
function om(e, t, r, n, i) {
  for (var a = [], o = [], s = "", l = "", u = 0, h = 0, c = 0; c < e.length; c++) {
    var f = e.charAt(c);
    if (f === `
`) {
      l && (s += l, h += u), a.push(s), o.push(h), s = "", l = "", u = 0, h = 0;
      continue;
    }
    var d = se(f, t), v = n ? !1 : !ox(f);
    if (a.length ? h + d > r : i + h + d > r) {
      h ? (s || l) && (v ? (s || (s = l, l = "", u = 0, h = u), a.push(s), o.push(h - u), l += f, u += d, s = "", h = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(h), s = f, h = d)) : v ? (a.push(l), o.push(u), l = f, u = d) : (a.push(f), o.push(d));
      continue;
    }
    h += d, v ? (l += f, u += d) : (l && (s += l, l = "", u = 0), s += f);
  }
  return !a.length && !s && (s = e, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(h)), a.length === 1 && (h += i), {
    accumWidth: h,
    lines: a,
    linesWidths: o
  };
}
var Nh = "__zr_style_" + Math.round(Math.random() * 10), $n = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, pl = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
$n[Nh] = !0;
var Hd = ["z", "z2", "invisible"], sx = ["invisible"], yo = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype._init = function(r) {
    for (var n = _t(r), i = 0; i < n.length; i++) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && lx(this, r, n) || o && !o[0] && !o[3])
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
    r || this.markRedraw(), this.__dirty |= wa, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & wa);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~wa;
  }, t.prototype.createStyle = function(r) {
    return cl($n, r);
  }, t.prototype.useStyle = function(r) {
    r[Nh] || (r = this.createStyle(r)), this.__inHover ? this.__hoverStyle = r : this.style = r, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(r) {
    return r[Nh];
  }, t.prototype._innerSaveToNormal = function(r) {
    e.prototype._innerSaveToNormal.call(this, r);
    var n = this._normalState;
    r.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(r, n, Hd);
  }, t.prototype._applyStateObj = function(r, n, i, a, o, s) {
    e.prototype._applyStateObj.call(this, r, n, i, a, o, s);
    var l = !(n && a), u;
    if (n && n.style ? o ? a ? u = n.style : (u = this._mergeStyle(this.createStyle(), i.style), this._mergeStyle(u, n.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : i.style), this._mergeStyle(u, n.style)) : l && (u = i.style), u)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var c = _t(h), f = 0; f < c.length; f++) {
            var d = c[f];
            d in u && (u[d] = u[d], this.style[d] = h[d]);
          }
        for (var v = _t(u), f = 0; f < v.length; f++) {
          var d = v[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(r, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var g = this.__inHover ? sx : Hd, f = 0; f < g.length; f++) {
      var d = g[f];
      n && n[d] != null ? this[d] = n[d] : l && i[d] != null && (this[d] = i[d]);
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
    return pl;
  }, t.initDefaultProps = function() {
    var r = t.prototype;
    r.type = "displayable", r.invisible = !1, r.z = 0, r.z2 = 0, r.zlevel = 0, r.culling = !1, r.cursor = "pointer", r.rectHover = !1, r.incremental = !1, r._rect = null, r.dirtyRectTolerance = 0, r.__dirty = oe | wa;
  }(), t;
}(fl), mu = new ut(0, 0, 0, 0), _u = new ut(0, 0, 0, 0);
function lx(e, t, r) {
  return mu.copy(e.getBoundingRect()), e.transform && mu.applyTransform(e.transform), _u.width = t, _u.height = r, !mu.intersect(_u);
}
var ye = Math.min, me = Math.max, bu = Math.sin, wu = Math.cos, sn = Math.PI * 2, Lo = Vi(), Po = Vi(), Ro = Vi();
function Vd(e, t, r, n, i, a) {
  i[0] = ye(e, r), i[1] = ye(t, n), a[0] = me(e, r), a[1] = me(t, n);
}
var Gd = [], Wd = [];
function ux(e, t, r, n, i, a, o, s, l, u) {
  var h = ky, c = Et, f = h(e, r, i, o, Gd);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var d = 0; d < f; d++) {
    var v = c(e, r, i, o, Gd[d]);
    l[0] = ye(v, l[0]), u[0] = me(v, u[0]);
  }
  f = h(t, n, a, s, Wd);
  for (var d = 0; d < f; d++) {
    var g = c(t, n, a, s, Wd[d]);
    l[1] = ye(g, l[1]), u[1] = me(g, u[1]);
  }
  l[0] = ye(e, l[0]), u[0] = me(e, u[0]), l[0] = ye(o, l[0]), u[0] = me(o, u[0]), l[1] = ye(t, l[1]), u[1] = me(t, u[1]), l[1] = ye(s, l[1]), u[1] = me(s, u[1]);
}
function hx(e, t, r, n, i, a, o, s) {
  var l = Ny, u = Qt, h = me(ye(l(e, r, i), 1), 0), c = me(ye(l(t, n, a), 1), 0), f = u(e, r, i, h), d = u(t, n, a, c);
  o[0] = ye(e, i, f), o[1] = ye(t, a, d), s[0] = me(e, i, f), s[1] = me(t, a, d);
}
function cx(e, t, r, n, i, a, o, s, l) {
  var u = vi, h = pi, c = Math.abs(i - a);
  if (c % sn < 1e-4 && c > 1e-4) {
    s[0] = e - r, s[1] = t - n, l[0] = e + r, l[1] = t + n;
    return;
  }
  if (Lo[0] = wu(i) * r + e, Lo[1] = bu(i) * n + t, Po[0] = wu(a) * r + e, Po[1] = bu(a) * n + t, u(s, Lo, Po), h(l, Lo, Po), i = i % sn, i < 0 && (i = i + sn), a = a % sn, a < 0 && (a = a + sn), i > a && !o ? a += sn : i < a && o && (i += sn), o) {
    var f = a;
    a = i, i = f;
  }
  for (var d = 0; d < a; d += Math.PI / 2)
    d > i && (Ro[0] = wu(d) * r + e, Ro[1] = bu(d) * n + t, u(s, Ro, s), h(l, Ro, l));
}
var lt = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, ln = [], un = [], Fe = [], Cr = [], He = [], Ve = [], Su = Math.min, xu = Math.max, hn = Math.cos, cn = Math.sin, ar = Math.abs, Bh = Math.PI, Or = Bh * 2, Tu = typeof Float32Array < "u", na = [];
function Cu(e) {
  var t = Math.round(e / Bh * 1e8) / 1e8;
  return t % 2 * Bh;
}
function fx(e, t) {
  var r = Cu(e[0]);
  r < 0 && (r += Or);
  var n = r - e[0], i = e[1];
  i += n, !t && i - r >= Or ? i = r + Or : t && r - i >= Or ? i = r - Or : !t && r > i ? i = r + (Or - Cu(r - i)) : t && r < i && (i = r - (Or - Cu(i - r))), e[0] = r, e[1] = i;
}
var Nn = function() {
  function e(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function() {
    this._version++;
  }, e.prototype.getVersion = function() {
    return this._version;
  }, e.prototype.setScale = function(t, r, n) {
    n = n || 0, n > 0 && (this._ux = ar(n / Fs / t) || 0, this._uy = ar(n / Fs / r) || 0);
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
    var n = ar(t - this._xi), i = ar(r - this._yi), a = n > this._ux || i > this._uy;
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
    this._drawPendingPt(), na[0] = i, na[1] = a, fx(na, o), i = na[0], a = na[1];
    var s = a - i;
    return this.addData(lt.A, t, r, n, n, i, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, r, n, i, a, o), this._xi = hn(a) * n + t, this._yi = cn(a) * n + r, this;
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
    !(this.data && this.data.length === r) && Tu && (this.data = new Float32Array(r));
    for (var n = 0; n < r; n++)
      this.data[n] = t[n];
    this._len = r;
  }, e.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var r = t.length, n = 0, i = this._len, a = 0; a < r; a++)
      n += t[a].len();
    Tu && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
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
      t instanceof Array && (t.length = this._len, Tu && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, e.prototype.getBoundingRect = function() {
    Fe[0] = Fe[1] = He[0] = He[1] = Number.MAX_VALUE, Cr[0] = Cr[1] = Ve[0] = Ve[1] = -Number.MAX_VALUE;
    var t = this.data, r = 0, n = 0, i = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (r = t[o], n = t[o + 1], i = r, a = n), s) {
        case lt.M:
          r = i = t[o++], n = a = t[o++], He[0] = i, He[1] = a, Ve[0] = i, Ve[1] = a;
          break;
        case lt.L:
          Vd(r, n, t[o], t[o + 1], He, Ve), r = t[o++], n = t[o++];
          break;
        case lt.C:
          ux(r, n, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], He, Ve), r = t[o++], n = t[o++];
          break;
        case lt.Q:
          hx(r, n, t[o++], t[o++], t[o], t[o + 1], He, Ve), r = t[o++], n = t[o++];
          break;
        case lt.A:
          var u = t[o++], h = t[o++], c = t[o++], f = t[o++], d = t[o++], v = t[o++] + d;
          o += 1;
          var g = !t[o++];
          l && (i = hn(d) * c + u, a = cn(d) * f + h), cx(u, h, c, f, d, v, g, He, Ve), r = hn(v) * c + u, n = cn(v) * f + h;
          break;
        case lt.R:
          i = r = t[o++], a = n = t[o++];
          var p = t[o++], y = t[o++];
          Vd(i, a, i + p, a + y, He, Ve);
          break;
        case lt.Z:
          r = i, n = a;
          break;
      }
      vi(Fe, Fe, He), pi(Cr, Cr, Ve);
    }
    return o === 0 && (Fe[0] = Fe[1] = Cr[0] = Cr[1] = 0), new ut(Fe[0], Fe[1], Cr[0] - Fe[0], Cr[1] - Fe[1]);
  }, e.prototype._calculateLength = function() {
    var t = this.data, r = this._len, n = this._ux, i = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, c = 0, f = 0; f < r; ) {
      var d = t[f++], v = f === 1;
      v && (a = t[f], o = t[f + 1], s = a, l = o);
      var g = -1;
      switch (d) {
        case lt.M:
          a = s = t[f++], o = l = t[f++];
          break;
        case lt.L: {
          var p = t[f++], y = t[f++], m = p - a, _ = y - o;
          (ar(m) > n || ar(_) > i || f === r - 1) && (g = Math.sqrt(m * m + _ * _), a = p, o = y);
          break;
        }
        case lt.C: {
          var b = t[f++], S = t[f++], p = t[f++], y = t[f++], w = t[f++], x = t[f++];
          g = R1(a, o, b, S, p, y, w, x, 10), a = w, o = x;
          break;
        }
        case lt.Q: {
          var b = t[f++], S = t[f++], p = t[f++], y = t[f++];
          g = k1(a, o, b, S, p, y, 10), a = p, o = y;
          break;
        }
        case lt.A:
          var M = t[f++], D = t[f++], A = t[f++], T = t[f++], $ = t[f++], L = t[f++], P = L + $;
          f += 1, v && (s = hn($) * A + M, l = cn($) * T + D), g = xu(A, T) * Su(Or, Math.abs(L)), a = hn(P) * A + M, o = cn(P) * T + D;
          break;
        case lt.R: {
          s = a = t[f++], l = o = t[f++];
          var R = t[f++], E = t[f++];
          g = R * 2 + E * 2;
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
    var n = this.data, i = this._ux, a = this._uy, o = this._len, s, l, u, h, c, f, d = r < 1, v, g, p = 0, y = 0, m, _ = 0, b, S;
    if (!(d && (this._pathSegLen || this._calculateLength(), v = this._pathSegLen, g = this._pathLen, m = r * g, !m)))
      t: for (var w = 0; w < o; ) {
        var x = n[w++], M = w === 1;
        switch (M && (u = n[w], h = n[w + 1], s = u, l = h), x !== lt.L && _ > 0 && (t.lineTo(b, S), _ = 0), x) {
          case lt.M:
            s = u = n[w++], l = h = n[w++], t.moveTo(u, h);
            break;
          case lt.L: {
            c = n[w++], f = n[w++];
            var D = ar(c - u), A = ar(f - h);
            if (D > i || A > a) {
              if (d) {
                var T = v[y++];
                if (p + T > m) {
                  var $ = (m - p) / T;
                  t.lineTo(u * (1 - $) + c * $, h * (1 - $) + f * $);
                  break t;
                }
                p += T;
              }
              t.lineTo(c, f), u = c, h = f, _ = 0;
            } else {
              var L = D * D + A * A;
              L > _ && (b = c, S = f, _ = L);
            }
            break;
          }
          case lt.C: {
            var P = n[w++], R = n[w++], E = n[w++], G = n[w++], k = n[w++], F = n[w++];
            if (d) {
              var T = v[y++];
              if (p + T > m) {
                var $ = (m - p) / T;
                Ns(u, P, E, k, $, ln), Ns(h, R, G, F, $, un), t.bezierCurveTo(ln[1], un[1], ln[2], un[2], ln[3], un[3]);
                break t;
              }
              p += T;
            }
            t.bezierCurveTo(P, R, E, G, k, F), u = k, h = F;
            break;
          }
          case lt.Q: {
            var P = n[w++], R = n[w++], E = n[w++], G = n[w++];
            if (d) {
              var T = v[y++];
              if (p + T > m) {
                var $ = (m - p) / T;
                Bs(u, P, E, $, ln), Bs(h, R, G, $, un), t.quadraticCurveTo(ln[1], un[1], ln[2], un[2]);
                break t;
              }
              p += T;
            }
            t.quadraticCurveTo(P, R, E, G), u = E, h = G;
            break;
          }
          case lt.A:
            var W = n[w++], j = n[w++], nt = n[w++], vt = n[w++], wt = n[w++], xt = n[w++], Ce = n[w++], Kr = !n[w++], Yn = nt > vt ? nt : vt, ie = ar(nt - vt) > 1e-3, Rt = wt + xt, K = !1;
            if (d) {
              var T = v[y++];
              p + T > m && (Rt = wt + xt * (m - p) / T, K = !0), p += T;
            }
            if (ie && t.ellipse ? t.ellipse(W, j, nt, vt, Ce, wt, Rt, Kr) : t.arc(W, j, Yn, wt, Rt, Kr), K)
              break t;
            M && (s = hn(wt) * nt + W, l = cn(wt) * vt + j), u = hn(Rt) * nt + W, h = cn(Rt) * vt + j;
            break;
          case lt.R:
            s = u = n[w], l = h = n[w + 1], c = n[w++], f = n[w++];
            var it = n[w++], jr = n[w++];
            if (d) {
              var T = v[y++];
              if (p + T > m) {
                var Wt = m - p;
                t.moveTo(c, f), t.lineTo(c + Su(Wt, it), f), Wt -= it, Wt > 0 && t.lineTo(c + it, f + Su(Wt, jr)), Wt -= jr, Wt > 0 && t.lineTo(c + xu(it - Wt, 0), f + jr), Wt -= it, Wt > 0 && t.lineTo(c, f + xu(jr - Wt, 0));
                break t;
              }
              p += T;
            }
            t.rect(c, f, it, jr);
            break;
          case lt.Z:
            if (d) {
              var T = v[y++];
              if (p + T > m) {
                var $ = (m - p) / T;
                t.lineTo(u * (1 - $) + s * $, h * (1 - $) + l * $);
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
function jn(e, t, r, n, i, a, o) {
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
function dx(e, t, r, n, i, a, o, s, l, u, h) {
  if (l === 0)
    return !1;
  var c = l;
  if (h > t + c && h > n + c && h > a + c && h > s + c || h < t - c && h < n - c && h < a - c && h < s - c || u > e + c && u > r + c && u > i + c && u > o + c || u < e - c && u < r - c && u < i - c && u < o - c)
    return !1;
  var f = P1(e, t, r, n, i, a, o, s, u, h);
  return f <= c / 2;
}
function vx(e, t, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > n + u && l > a + u || l < t - u && l < n - u && l < a - u || s > e + u && s > r + u && s > i + u || s < e - u && s < r - u && s < i - u)
    return !1;
  var h = E1(e, t, r, n, i, a, s, l);
  return h <= u / 2;
}
var Ud = Math.PI * 2;
function Oo(e) {
  return e %= Ud, e < 0 && (e += Ud), e;
}
var ia = Math.PI * 2;
function px(e, t, r, n, i, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= e, l -= t;
  var h = Math.sqrt(s * s + l * l);
  if (h - u > r || h + u < r)
    return !1;
  if (Math.abs(n - i) % ia < 1e-4)
    return !0;
  if (a) {
    var c = n;
    n = Oo(i), i = Oo(c);
  } else
    n = Oo(n), i = Oo(i);
  n > i && (i += ia);
  var f = Math.atan2(l, s);
  return f < 0 && (f += ia), f >= n && f <= i || f + ia >= n && f + ia <= i;
}
function fn(e, t, r, n, i, a) {
  if (a > t && a > n || a < t && a < n || n === t)
    return 0;
  var o = (a - t) / (n - t), s = n < t ? 1 : -1;
  (o === 1 || o === 0) && (s = n < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === i ? 1 / 0 : l > i ? s : 0;
}
var Mr = Nn.CMD, dn = Math.PI * 2, gx = 1e-4;
function yx(e, t) {
  return Math.abs(e - t) < gx;
}
var Ut = [-1, -1, -1], pe = [-1, -1];
function mx() {
  var e = pe[0];
  pe[0] = pe[1], pe[1] = e;
}
function _x(e, t, r, n, i, a, o, s, l, u) {
  if (u > t && u > n && u > a && u > s || u < t && u < n && u < a && u < s)
    return 0;
  var h = ks(t, n, a, s, u, Ut);
  if (h === 0)
    return 0;
  for (var c = 0, f = -1, d = void 0, v = void 0, g = 0; g < h; g++) {
    var p = Ut[g], y = p === 0 || p === 1 ? 0.5 : 1, m = Et(e, r, i, o, p);
    m < l || (f < 0 && (f = ky(t, n, a, s, pe), pe[1] < pe[0] && f > 1 && mx(), d = Et(t, n, a, s, pe[0]), f > 1 && (v = Et(t, n, a, s, pe[1]))), f === 2 ? p < pe[0] ? c += d < t ? y : -y : p < pe[1] ? c += v < d ? y : -y : c += s < v ? y : -y : p < pe[0] ? c += d < t ? y : -y : c += s < d ? y : -y);
  }
  return c;
}
function bx(e, t, r, n, i, a, o, s) {
  if (s > t && s > n && s > a || s < t && s < n && s < a)
    return 0;
  var l = O1(t, n, a, s, Ut);
  if (l === 0)
    return 0;
  var u = Ny(t, n, a);
  if (u >= 0 && u <= 1) {
    for (var h = 0, c = Qt(t, n, a, u), f = 0; f < l; f++) {
      var d = Ut[f] === 0 || Ut[f] === 1 ? 0.5 : 1, v = Qt(e, r, i, Ut[f]);
      v < o || (Ut[f] < u ? h += c < t ? d : -d : h += a < c ? d : -d);
    }
    return h;
  } else {
    var d = Ut[0] === 0 || Ut[0] === 1 ? 0.5 : 1, v = Qt(e, r, i, Ut[0]);
    return v < o ? 0 : a < t ? d : -d;
  }
}
function Sx(e, t, r, n, i, a, o, s) {
  if (s -= t, s > r || s < -r)
    return 0;
  var l = Math.sqrt(r * r - s * s);
  Ut[0] = -l, Ut[1] = l;
  var u = Math.abs(n - i);
  if (u < 1e-4)
    return 0;
  if (u >= dn - 1e-4) {
    n = 0, i = dn;
    var h = a ? 1 : -1;
    return o >= Ut[0] + e && o <= Ut[1] + e ? h : 0;
  }
  if (n > i) {
    var c = n;
    n = i, i = c;
  }
  n < 0 && (n += dn, i += dn);
  for (var f = 0, d = 0; d < 2; d++) {
    var v = Ut[d];
    if (v + e > o) {
      var g = Math.atan2(s, v), h = a ? 1 : -1;
      g < 0 && (g = dn + g), (g >= n && g <= i || g + dn >= n && g + dn <= i) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (h = -h), f += h);
    }
  }
  return f;
}
function sm(e, t, r, n, i) {
  for (var a = e.data, o = e.len(), s = 0, l = 0, u = 0, h = 0, c = 0, f, d, v = 0; v < o; ) {
    var g = a[v++], p = v === 1;
    switch (g === Mr.M && v > 1 && (r || (s += fn(l, u, h, c, n, i))), p && (l = a[v], u = a[v + 1], h = l, c = u), g) {
      case Mr.M:
        h = a[v++], c = a[v++], l = h, u = c;
        break;
      case Mr.L:
        if (r) {
          if (jn(l, u, a[v], a[v + 1], t, n, i))
            return !0;
        } else
          s += fn(l, u, a[v], a[v + 1], n, i) || 0;
        l = a[v++], u = a[v++];
        break;
      case Mr.C:
        if (r) {
          if (dx(l, u, a[v++], a[v++], a[v++], a[v++], a[v], a[v + 1], t, n, i))
            return !0;
        } else
          s += _x(l, u, a[v++], a[v++], a[v++], a[v++], a[v], a[v + 1], n, i) || 0;
        l = a[v++], u = a[v++];
        break;
      case Mr.Q:
        if (r) {
          if (vx(l, u, a[v++], a[v++], a[v], a[v + 1], t, n, i))
            return !0;
        } else
          s += bx(l, u, a[v++], a[v++], a[v], a[v + 1], n, i) || 0;
        l = a[v++], u = a[v++];
        break;
      case Mr.A:
        var y = a[v++], m = a[v++], _ = a[v++], b = a[v++], S = a[v++], w = a[v++];
        v += 1;
        var x = !!(1 - a[v++]);
        f = Math.cos(S) * _ + y, d = Math.sin(S) * b + m, p ? (h = f, c = d) : s += fn(l, u, f, d, n, i);
        var M = (n - y) * b / _ + y;
        if (r) {
          if (px(y, m, b, S, S + w, x, t, M, i))
            return !0;
        } else
          s += Sx(y, m, b, S, S + w, x, M, i);
        l = Math.cos(S + w) * _ + y, u = Math.sin(S + w) * b + m;
        break;
      case Mr.R:
        h = l = a[v++], c = u = a[v++];
        var D = a[v++], A = a[v++];
        if (f = h + D, d = c + A, r) {
          if (jn(h, c, f, c, t, n, i) || jn(f, c, f, d, t, n, i) || jn(f, d, h, d, t, n, i) || jn(h, d, h, c, t, n, i))
            return !0;
        } else
          s += fn(f, c, f, d, n, i), s += fn(h, d, h, c, n, i);
        break;
      case Mr.Z:
        if (r) {
          if (jn(l, u, h, c, t, n, i))
            return !0;
        } else
          s += fn(l, u, h, c, n, i);
        l = h, u = c;
        break;
    }
  }
  return !r && !yx(u, c) && (s += fn(l, u, h, c, n, i) || 0), s !== 0;
}
function xx(e, t, r) {
  return sm(e, 0, !1, t, r);
}
function Tx(e, t, r, n) {
  return sm(e, t, !0, r, n);
}
var lm = ht({
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
}, $n), Cx = {
  style: ht({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, pl.style)
}, Mu = Za.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), dt = function(e) {
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
      for (var s = 0; s < Mu.length; ++s)
        i[Mu[s]] = this[Mu[s]];
      i.__dirty |= oe;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(r) {
    var n = _t(r);
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
        var n = zs(r, 0);
        return n > 0.5 ? Oh : n > 0.2 ? aS : Eh;
      } else if (r)
        return Eh;
    }
    return Oh;
  }, t.prototype.getInsideTextStroke = function(r) {
    var n = this.style.fill;
    if (H(n)) {
      var i = this.__zr, a = !!(i && i.isDarkMode()), o = zs(r, 0) < Rh;
      if (a === o)
        return n;
    }
  }, t.prototype.buildPath = function(r, n, i) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~ci;
  }, t.prototype.getUpdatedPathProxy = function(r) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, r), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Nn(!1);
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
      (a || this.__dirty & ci) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), r = o.getBoundingRect();
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
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), Tx(s, l / u, r, n)))
          return !0;
      }
      if (this.hasFill())
        return xx(s, r, n);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= ci, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & ci);
  }, t.prototype.createStyle = function(r) {
    return cl(lm, r);
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
        for (var h = {}, c = _t(u), f = 0; f < c.length; f++) {
          var d = c[f];
          typeof u[d] == "object" ? this.shape[d] = u[d] : h[d] = u[d];
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
    return Cx;
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
    r.type = "path", r.strokeContainThreshold = 5, r.segmentIgnoreThreshold = 0, r.subPixelOptimize = !1, r.autoBatch = !1, r.__dirty = oe | wa | ci;
  }(), t;
}(yo), Mx = ht({
  strokeFirst: !0,
  font: On,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, lm), Ws = function(e) {
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
    return cl(Mx, r);
  }, t.prototype.setBoundingRect = function(r) {
    this._rect = r;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    if (!this._rect) {
      var n = r.text;
      n != null ? n += "" : n = "";
      var i = Uc(n, r.font, r.textAlign, r.textBaseline);
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
}(yo);
Ws.prototype.type = "tspan";
var Dx = ht({
  x: 0,
  y: 0
}, $n), Ax = {
  style: ht({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, pl.style)
};
function Ix(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var rr = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(r) {
    return cl(Dx, r);
  }, t.prototype._getSize = function(r) {
    var n = this.style, i = n[r];
    if (i != null)
      return i;
    var a = Ix(n.image) ? n.image : this.__image;
    if (!a)
      return 0;
    var o = r === "width" ? "height" : "width", s = n[o];
    return s == null ? a[r] : a[r] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return Ax;
  }, t.prototype.getBoundingRect = function() {
    var r = this.style;
    return this._rect || (this._rect = new ut(r.x || 0, r.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(yo);
rr.prototype.type = "image";
function $x(e, t) {
  var r = t.x, n = t.y, i = t.width, a = t.height, o = t.r, s, l, u, h;
  i < 0 && (r = r + i, i = -i), a < 0 && (n = n + a, a = -a), typeof o == "number" ? s = l = u = h = o : o instanceof Array ? o.length === 1 ? s = l = u = h = o[0] : o.length === 2 ? (s = u = o[0], l = h = o[1]) : o.length === 3 ? (s = o[0], l = h = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], h = o[3]) : s = l = u = h = 0;
  var c;
  s + l > i && (c = s + l, s *= i / c, l *= i / c), u + h > i && (c = u + h, u *= i / c, h *= i / c), l + u > a && (c = l + u, l *= a / c, u *= a / c), s + h > a && (c = s + h, s *= a / c, h *= a / c), e.moveTo(r + s, n), e.lineTo(r + i - l, n), l !== 0 && e.arc(r + i - l, n + l, l, -Math.PI / 2, 0), e.lineTo(r + i, n + a - u), u !== 0 && e.arc(r + i - u, n + a - u, u, 0, Math.PI / 2), e.lineTo(r + h, n + a), h !== 0 && e.arc(r + h, n + a - h, h, Math.PI / 2, Math.PI), e.lineTo(r, n + s), s !== 0 && e.arc(r + s, n + s, s, Math.PI, Math.PI * 1.5);
}
var yi = Math.round;
function um(e, t, r) {
  if (t) {
    var n = t.x1, i = t.x2, a = t.y1, o = t.y2;
    e.x1 = n, e.x2 = i, e.y1 = a, e.y2 = o;
    var s = r && r.lineWidth;
    return s && (yi(n * 2) === yi(i * 2) && (e.x1 = e.x2 = Mn(n, s, !0)), yi(a * 2) === yi(o * 2) && (e.y1 = e.y2 = Mn(a, s, !0))), e;
  }
}
function hm(e, t, r) {
  if (t) {
    var n = t.x, i = t.y, a = t.width, o = t.height;
    e.x = n, e.y = i, e.width = a, e.height = o;
    var s = r && r.lineWidth;
    return s && (e.x = Mn(n, s, !0), e.y = Mn(i, s, !0), e.width = Math.max(Mn(n + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(Mn(i + o, s, !1) - e.y, o === 0 ? 0 : 1)), e;
  }
}
function Mn(e, t, r) {
  if (!t)
    return e;
  var n = yi(e * 2);
  return (n + yi(t)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
}
var Lx = /* @__PURE__ */ function() {
  function e() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return e;
}(), Px = {}, St = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Lx();
  }, t.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = hm(Px, n, this.style);
      i = l.x, a = l.y, o = l.width, s = l.height, l.r = n.r, n = l;
    } else
      i = n.x, a = n.y, o = n.width, s = n.height;
    n.r ? $x(r, n) : r.rect(i, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(dt);
St.prototype.type = "rect";
var Yd = {
  fill: "#000"
}, Xd = 2, Rx = {
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
  }, pl.style)
}, $t = function(e) {
  B(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.type = "text", n._children = [], n._defaultStyle = Yd, n.attr(r), n;
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
    this._childCursor = 0, Bx(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
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
    this._defaultStyle = r || Yd;
  }, t.prototype.setTextContent = function(r) {
  }, t.prototype._mergeStyle = function(r, n) {
    if (!n)
      return r;
    var i = n.rich, a = r.rich || i && {};
    return N(r, n), i && a ? (this._mergeRich(a, i), r.rich = a) : a && (r.rich = a), r;
  }, t.prototype._mergeRich = function(r, n) {
    for (var i = _t(n), a = 0; a < i.length; a++) {
      var o = i[a];
      r[o] = r[o] || {}, N(r[o], n[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return Rx;
  }, t.prototype._getOrCreateChild = function(r) {
    var n = this._children[this._childCursor];
    return (!n || !(n instanceof r)) && (n = new r()), this._children[this._childCursor++] = n, n.__zr = this.__zr, n.parent = this, n;
  }, t.prototype._updatePlainTexts = function() {
    var r = this.style, n = r.font || On, i = r.padding, a = tv(r), o = tx(a, r), s = Du(r), l = !!r.backgroundColor, u = o.outerHeight, h = o.outerWidth, c = o.contentWidth, f = o.lines, d = o.lineHeight, v = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var g = r.x || 0, p = r.y || 0, y = r.align || v.align || "left", m = r.verticalAlign || v.verticalAlign || "top", _ = g, b = fi(p, o.contentHeight, m);
    if (s || i) {
      var S = xa(g, h, y), w = fi(p, u, m);
      s && this._renderBackground(r, r, S, w, h, u);
    }
    b += d / 2, i && (_ = Jd(g, y, i), m === "top" ? b += i[0] : m === "bottom" && (b -= i[2]));
    for (var x = 0, M = !1, D = Qd("fill" in r ? r.fill : (M = !0, v.fill)), A = jd("stroke" in r ? r.stroke : !l && (!v.autoStroke || M) ? (x = Xd, v.stroke) : null), T = r.textShadowBlur > 0, $ = r.width != null && (r.overflow === "truncate" || r.overflow === "break" || r.overflow === "breakAll"), L = o.calculatedLineHeight, P = 0; P < f.length; P++) {
      var R = this._getOrCreateChild(Ws), E = R.createStyle();
      R.useStyle(E), E.text = f[P], E.x = _, E.y = b, E.textAlign = y, E.textBaseline = "middle", E.opacity = r.opacity, E.strokeFirst = !0, T && (E.shadowBlur = r.textShadowBlur || 0, E.shadowColor = r.textShadowColor || "transparent", E.shadowOffsetX = r.textShadowOffsetX || 0, E.shadowOffsetY = r.textShadowOffsetY || 0), E.stroke = A, E.fill = D, A && (E.lineWidth = r.lineWidth || x, E.lineDash = r.lineDash, E.lineDashOffset = r.lineDashOffset || 0), E.font = n, Zd(E, r), b += d, $ && R.setBoundingRect(new ut(xa(E.x, c, E.textAlign), fi(E.y, L, E.textBaseline), c, L));
    }
  }, t.prototype._updateRichTexts = function() {
    var r = this.style, n = tv(r), i = nx(n, r), a = i.width, o = i.outerWidth, s = i.outerHeight, l = r.padding, u = r.x || 0, h = r.y || 0, c = this._defaultStyle, f = r.align || c.align, d = r.verticalAlign || c.verticalAlign;
    this.isTruncated = !!i.isTruncated;
    var v = xa(u, o, f), g = fi(h, s, d), p = v, y = g;
    l && (p += l[3], y += l[0]);
    var m = p + a;
    Du(r) && this._renderBackground(r, r, v, g, o, s);
    for (var _ = !!r.backgroundColor, b = 0; b < i.lines.length; b++) {
      for (var S = i.lines[b], w = S.tokens, x = w.length, M = S.lineHeight, D = S.width, A = 0, T = p, $ = m, L = x - 1, P = void 0; A < x && (P = w[A], !P.align || P.align === "left"); )
        this._placeToken(P, r, M, y, T, "left", _), D -= P.width, T += P.width, A++;
      for (; L >= 0 && (P = w[L], P.align === "right"); )
        this._placeToken(P, r, M, y, $, "right", _), D -= P.width, $ -= P.width, L--;
      for (T += (a - (T - p) - (m - $) - D) / 2; A <= L; )
        P = w[A], this._placeToken(P, r, M, y, T + P.width / 2, "center", _), T += P.width, A++;
      y += M;
    }
  }, t.prototype._placeToken = function(r, n, i, a, o, s, l) {
    var u = n.rich[r.styleName] || {};
    u.text = r.text;
    var h = r.verticalAlign, c = a + i / 2;
    h === "top" ? c = a + r.height / 2 : h === "bottom" && (c = a + i - r.height / 2);
    var f = !r.isLineHolder && Du(u);
    f && this._renderBackground(u, n, s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o, c - r.height / 2, r.width, r.height);
    var d = !!u.backgroundColor, v = r.textPadding;
    v && (o = Jd(o, s, v), c -= r.height / 2 - v[0] - r.innerHeight / 2);
    var g = this._getOrCreateChild(Ws), p = g.createStyle();
    g.useStyle(p);
    var y = this._defaultStyle, m = !1, _ = 0, b = Qd("fill" in u ? u.fill : "fill" in n ? n.fill : (m = !0, y.fill)), S = jd("stroke" in u ? u.stroke : "stroke" in n ? n.stroke : !d && !l && (!y.autoStroke || m) ? (_ = Xd, y.stroke) : null), w = u.textShadowBlur > 0 || n.textShadowBlur > 0;
    p.text = r.text, p.x = o, p.y = c, w && (p.shadowBlur = u.textShadowBlur || n.textShadowBlur || 0, p.shadowColor = u.textShadowColor || n.textShadowColor || "transparent", p.shadowOffsetX = u.textShadowOffsetX || n.textShadowOffsetX || 0, p.shadowOffsetY = u.textShadowOffsetY || n.textShadowOffsetY || 0), p.textAlign = s, p.textBaseline = "middle", p.font = r.font || On, p.opacity = cs(u.opacity, n.opacity, 1), Zd(p, u), S && (p.lineWidth = cs(u.lineWidth, n.lineWidth, _), p.lineDash = tt(u.lineDash, n.lineDash), p.lineDashOffset = n.lineDashOffset || 0, p.stroke = S), b && (p.fill = b);
    var x = r.contentWidth, M = r.contentHeight;
    g.setBoundingRect(new ut(xa(p.x, x, p.textAlign), fi(p.y, M, p.textBaseline), x, M));
  }, t.prototype._renderBackground = function(r, n, i, a, o, s) {
    var l = r.backgroundColor, u = r.borderWidth, h = r.borderColor, c = l && l.image, f = l && !c, d = r.borderRadius, v = this, g, p;
    if (f || r.lineHeight || u && h) {
      g = this._getOrCreateChild(St), g.useStyle(g.createStyle()), g.style.fill = null;
      var y = g.shape;
      y.x = i, y.y = a, y.width = o, y.height = s, y.r = d, g.dirtyShape();
    }
    if (f) {
      var m = g.style;
      m.fill = l || null, m.fillOpacity = tt(r.fillOpacity, 1);
    } else if (c) {
      p = this._getOrCreateChild(rr), p.onload = function() {
        v.dirtyStyle();
      };
      var _ = p.style;
      _.image = l.image, _.x = i, _.y = a, _.width = o, _.height = s;
    }
    if (u && h) {
      var m = g.style;
      m.lineWidth = u, m.stroke = h, m.strokeOpacity = tt(r.strokeOpacity, 1), m.lineDash = r.borderDash, m.lineDashOffset = r.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var b = (g || p).style;
    b.shadowBlur = r.shadowBlur || 0, b.shadowColor = r.shadowColor || "transparent", b.shadowOffsetX = r.shadowOffsetX || 0, b.shadowOffsetY = r.shadowOffsetY || 0, b.opacity = cs(r.opacity, n.opacity, 1);
  }, t.makeFont = function(r) {
    var n = "";
    return Nx(r) && (n = [
      r.fontStyle,
      r.fontWeight,
      kx(r.fontSize),
      r.fontFamily || "sans-serif"
    ].join(" ")), n && Ye(n) || r.textFont || r.font;
  }, t;
}(yo), Ox = { left: !0, right: 1, center: 1 }, Ex = { top: 1, bottom: 1, middle: 1 }, qd = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function kx(e) {
  return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? Oc + "px" : e + "px";
}
function Zd(e, t) {
  for (var r = 0; r < qd.length; r++) {
    var n = qd[r], i = t[n];
    i != null && (e[n] = i);
  }
}
function Nx(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function Bx(e) {
  return Kd(e), C(e.rich, Kd), e;
}
function Kd(e) {
  if (e) {
    e.font = $t.makeFont(e);
    var t = e.align;
    t === "middle" && (t = "center"), e.align = t == null || Ox[t] ? t : "left";
    var r = e.verticalAlign;
    r === "center" && (r = "middle"), e.verticalAlign = r == null || Ex[r] ? r : "top";
    var n = e.padding;
    n && (e.padding = Cy(e.padding));
  }
}
function jd(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Qd(e) {
  return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Jd(e, t, r) {
  return t === "right" ? e - r[1] : t === "center" ? e + r[3] / 2 - r[1] / 2 : e + r[3];
}
function tv(e) {
  var t = e.text;
  return t != null && (t += ""), t;
}
function Du(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
var st = Lt(), zx = function(e, t, r, n) {
  if (n) {
    var i = st(n);
    i.dataIndex = r, i.dataType = t, i.seriesIndex = e, i.ssrType = "chart", n.type === "group" && n.traverse(function(a) {
      var o = st(a);
      o.seriesIndex = e, o.dataIndex = r, o.dataType = t, o.ssrType = "chart";
    });
  }
}, ev = 1, rv = {}, cm = Lt(), jc = Lt(), Qc = 0, gl = 1, yl = 2, je = ["emphasis", "blur", "select"], nv = ["normal", "emphasis", "blur", "select"], Fx = 10, Hx = 9, Ln = "highlight", ms = "downplay", Pa = "select", _s = "unselect", Ra = "toggleSelect";
function Qn(e) {
  return e != null && e !== "none";
}
function ml(e, t, r) {
  e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t), e.hoverState = r;
}
function fm(e) {
  ml(e, "emphasis", yl);
}
function dm(e) {
  e.hoverState === yl && ml(e, "normal", Qc);
}
function Jc(e) {
  ml(e, "blur", gl);
}
function vm(e) {
  e.hoverState === gl && ml(e, "normal", Qc);
}
function Vx(e) {
  e.selected = !0;
}
function Gx(e) {
  e.selected = !1;
}
function iv(e, t, r) {
  t(e, r);
}
function Sr(e, t, r) {
  iv(e, t, r), e.isGroup && e.traverse(function(n) {
    iv(n, t, r);
  });
}
function av(e, t) {
  switch (t) {
    case "emphasis":
      e.hoverState = yl;
      break;
    case "normal":
      e.hoverState = Qc;
      break;
    case "blur":
      e.hoverState = gl;
      break;
    case "select":
      e.selected = !0;
  }
}
function Wx(e, t, r, n) {
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
function Ux(e, t, r, n) {
  var i = r && pt(r, "select") >= 0, a = !1;
  if (e instanceof dt) {
    var o = cm(e), s = i && o.selectFill || o.normalFill, l = i && o.selectStroke || o.normalStroke;
    if (Qn(s) || Qn(l)) {
      n = n || {};
      var u = n.style || {};
      u.fill === "inherit" ? (a = !0, n = N({}, n), u = N({}, u), u.fill = s) : !Qn(u.fill) && Qn(s) ? (a = !0, n = N({}, n), u = N({}, u), u.fill = wd(s)) : !Qn(u.stroke) && Qn(l) && (a || (n = N({}, n), u = N({}, u)), u.stroke = wd(l)), n.style = u;
    }
  }
  if (n && n.z2 == null) {
    a || (n = N({}, n));
    var h = e.z2EmphasisLift;
    n.z2 = e.z2 + (h ?? Fx);
  }
  return n;
}
function Yx(e, t, r) {
  if (r && r.z2 == null) {
    r = N({}, r);
    var n = e.z2SelectLift;
    r.z2 = e.z2 + (n ?? Hx);
  }
  return r;
}
function Xx(e, t, r) {
  var n = pt(e.currentStates, t) >= 0, i = e.style.opacity, a = n ? null : Wx(e, ["opacity"], t, {
    opacity: 1
  });
  r = r || {};
  var o = r.style || {};
  return o.opacity == null && (r = N({}, r), o = N({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: n ? i : a.opacity * 0.1
  }, o), r.style = o), r;
}
function Au(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis")
      return Ux(this, e, t, r);
    if (e === "blur")
      return Xx(this, e, r);
    if (e === "select")
      return Yx(this, e, r);
  }
  return r;
}
function qx(e) {
  e.stateProxy = Au;
  var t = e.getTextContent(), r = e.getTextGuideLine();
  t && (t.stateProxy = Au), r && (r.stateProxy = Au);
}
function ov(e, t) {
  !mm(e, t) && !e.__highByOuter && Sr(e, fm);
}
function sv(e, t) {
  !mm(e, t) && !e.__highByOuter && Sr(e, dm);
}
function Us(e, t) {
  e.__highByOuter |= 1 << (t || 0), Sr(e, fm);
}
function Ys(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && Sr(e, dm);
}
function Zx(e) {
  Sr(e, Jc);
}
function pm(e) {
  Sr(e, vm);
}
function gm(e) {
  Sr(e, Vx);
}
function ym(e) {
  Sr(e, Gx);
}
function mm(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function _m(e) {
  var t = e.getModel(), r = [], n = [];
  t.eachComponent(function(i, a) {
    var o = jc(a), s = i === "series", l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    !s && n.push(l), o.isBlured && (l.group.traverse(function(u) {
      vm(u);
    }), s && r.push(a)), o.isBlured = !1;
  }), C(n, function(i) {
    i && i.toggleBlurSeries && i.toggleBlurSeries(r, !1, t);
  });
}
function zh(e, t, r, n) {
  var i = n.getModel();
  r = r || "coordinateSystem";
  function a(u, h) {
    for (var c = 0; c < h.length; c++) {
      var f = u.getItemGraphicEl(h[c]);
      f && pm(f);
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
        var d = n.getViewOfSeriesModel(u);
        if (d.group.traverse(function(p) {
          p.__highByOuter && h && t === "self" || Jc(p);
        }), ee(t))
          a(u.getData(), t);
        else if (V(t))
          for (var v = _t(t), g = 0; g < v.length; g++)
            a(u.getData(v[g]), t[v[g]]);
        l.push(u), jc(u).isBlured = !0;
      }
    }), i.eachComponent(function(u, h) {
      if (u !== "series") {
        var c = n.getViewOfComponentModel(h);
        c && c.toggleBlurSeries && c.toggleBlurSeries(l, !0, i);
      }
    });
  }
}
function Fh(e, t, r) {
  if (!(e == null || t == null)) {
    var n = r.getModel().getComponent(e, t);
    if (n) {
      jc(n).isBlured = !0;
      var i = r.getViewOfComponentModel(n);
      !i || !i.focusBlurEnabled || i.group.traverse(function(a) {
        Jc(a);
      });
    }
  }
}
function Kx(e, t, r) {
  var n = e.seriesIndex, i = e.getData(t.dataType);
  if (i) {
    var a = kn(i, t);
    a = (z(a) ? a[0] : a) || 0;
    var o = i.getItemGraphicEl(a);
    if (!o)
      for (var s = i.count(), l = 0; !o && l < s; )
        o = i.getItemGraphicEl(l++);
    if (o) {
      var u = st(o);
      zh(n, u.focus, u.blurScope, r);
    } else {
      var h = e.get(["emphasis", "focus"]), c = e.get(["emphasis", "blurScope"]);
      h != null && zh(n, h, c, r);
    }
  }
}
function tf(e, t, r, n) {
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
function jx(e, t, r) {
  var n = st(e), i = tf(n.componentMainType, n.componentIndex, n.componentHighDownName, r), a = i.dispatchers, o = i.focusSelf;
  a ? (o && Fh(n.componentMainType, n.componentIndex, r), C(a, function(s) {
    return ov(s, t);
  })) : (zh(n.seriesIndex, n.focus, n.blurScope, r), n.focus === "self" && Fh(n.componentMainType, n.componentIndex, r), ov(e, t));
}
function Qx(e, t, r) {
  _m(r);
  var n = st(e), i = tf(n.componentMainType, n.componentIndex, n.componentHighDownName, r).dispatchers;
  i ? C(i, function(a) {
    return sv(a, t);
  }) : sv(e, t);
}
function Jx(e, t, r) {
  if (Wh(t)) {
    var n = t.dataType, i = e.getData(n), a = kn(i, t);
    z(a) || (a = [a]), e[t.type === Ra ? "toggleSelect" : t.type === Pa ? "select" : "unselect"](a, n);
  }
}
function lv(e) {
  var t = e.getAllData();
  C(t, function(r) {
    var n = r.data, i = r.type;
    n.eachItemGraphicEl(function(a, o) {
      e.isSelected(o, i) ? gm(a) : ym(a);
    });
  });
}
function tT(e) {
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
function Hh(e, t, r) {
  ef(e, !0), Sr(e, qx), rT(e, t, r);
}
function eT(e) {
  ef(e, !1);
}
function Qa(e, t, r, n) {
  n ? eT(e) : Hh(e, t, r);
}
function rT(e, t, r) {
  var n = st(e);
  t != null ? (n.focus = t, n.blurScope = r) : n.focus && (n.focus = null);
}
var uv = ["emphasis", "blur", "select"], nT = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Vh(e, t, r, n) {
  r = r || "itemStyle";
  for (var i = 0; i < uv.length; i++) {
    var a = uv[i], o = t.getModel([a, r]), s = e.ensureState(a);
    s.style = o[nT[r]]();
  }
}
function ef(e, t) {
  var r = t === !1, n = e;
  e.highDownSilentOnTouch && (n.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!r || n.__highDownDispatcher) && (n.__highByOuter = n.__highByOuter || 0, n.__highDownDispatcher = !r);
}
function Gh(e) {
  return !!(e && e.__highDownDispatcher);
}
function iT(e) {
  var t = rv[e];
  return t == null && ev <= 32 && (t = rv[e] = ev++), t;
}
function Wh(e) {
  var t = e.type;
  return t === Pa || t === _s || t === Ra;
}
function hv(e) {
  var t = e.type;
  return t === Ln || t === ms;
}
function aT(e) {
  var t = cm(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var r = e.states.select || {};
  t.selectFill = r.style && r.style.fill || null, t.selectStroke = r.style && r.style.stroke || null;
}
var Jn = Nn.CMD, oT = [[], [], []], cv = Math.sqrt, sT = Math.atan2;
function lT(e, t) {
  if (t) {
    var r = e.data, n = e.len(), i, a, o, s, l, u, h = Jn.M, c = Jn.C, f = Jn.L, d = Jn.R, v = Jn.A, g = Jn.Q;
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
        case v:
          var p = t[4], y = t[5], m = cv(t[0] * t[0] + t[1] * t[1]), _ = cv(t[2] * t[2] + t[3] * t[3]), b = sT(-t[1] / _, t[0] / m);
          r[o] *= m, r[o++] += p, r[o] *= _, r[o++] += y, r[o++] *= m, r[o++] *= _, r[o++] += b, r[o++] += b, o += 2, s = o;
          break;
        case d:
          u[0] = r[o++], u[1] = r[o++], be(u, u, t), r[s++] = u[0], r[s++] = u[1], u[0] += r[o++], u[1] += r[o++], be(u, u, t), r[s++] = u[0], r[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var S = oT[l];
        S[0] = r[o++], S[1] = r[o++], be(S, S, t), r[s++] = S[0], r[s++] = S[1];
      }
    }
    e.increaseVersion();
  }
}
var Iu = Math.sqrt, Eo = Math.sin, ko = Math.cos, aa = Math.PI;
function fv(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Uh(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (fv(e) * fv(t));
}
function dv(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Uh(e, t));
}
function vv(e, t, r, n, i, a, o, s, l, u, h) {
  var c = l * (aa / 180), f = ko(c) * (e - r) / 2 + Eo(c) * (t - n) / 2, d = -1 * Eo(c) * (e - r) / 2 + ko(c) * (t - n) / 2, v = f * f / (o * o) + d * d / (s * s);
  v > 1 && (o *= Iu(v), s *= Iu(v));
  var g = (i === a ? -1 : 1) * Iu((o * o * (s * s) - o * o * (d * d) - s * s * (f * f)) / (o * o * (d * d) + s * s * (f * f))) || 0, p = g * o * d / s, y = g * -s * f / o, m = (e + r) / 2 + ko(c) * p - Eo(c) * y, _ = (t + n) / 2 + Eo(c) * p + ko(c) * y, b = dv([1, 0], [(f - p) / o, (d - y) / s]), S = [(f - p) / o, (d - y) / s], w = [(-1 * f - p) / o, (-1 * d - y) / s], x = dv(S, w);
  if (Uh(S, w) <= -1 && (x = aa), Uh(S, w) >= 1 && (x = 0), x < 0) {
    var M = Math.round(x / aa * 1e6) / 1e6;
    x = aa * 2 + M % 2 * aa;
  }
  h.addData(u, m, _, o, s, b, x, c, a);
}
var uT = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, hT = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function cT(e) {
  var t = new Nn();
  if (!e)
    return t;
  var r = 0, n = 0, i = r, a = n, o, s = Nn.CMD, l = e.match(uT);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var h = l[u], c = h.charAt(0), f = void 0, d = h.match(hT) || [], v = d.length, g = 0; g < v; g++)
      d[g] = parseFloat(d[g]);
    for (var p = 0; p < v; ) {
      var y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = r, D = n, A = void 0, T = void 0;
      switch (c) {
        case "l":
          r += d[p++], n += d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "L":
          r = d[p++], n = d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "m":
          r += d[p++], n += d[p++], f = s.M, t.addData(f, r, n), i = r, a = n, c = "l";
          break;
        case "M":
          r = d[p++], n = d[p++], f = s.M, t.addData(f, r, n), i = r, a = n, c = "L";
          break;
        case "h":
          r += d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "H":
          r = d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "v":
          n += d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "V":
          n = d[p++], f = s.L, t.addData(f, r, n);
          break;
        case "C":
          f = s.C, t.addData(f, d[p++], d[p++], d[p++], d[p++], d[p++], d[p++]), r = d[p - 2], n = d[p - 1];
          break;
        case "c":
          f = s.C, t.addData(f, d[p++] + r, d[p++] + n, d[p++] + r, d[p++] + n, d[p++] + r, d[p++] + n), r += d[p - 2], n += d[p - 1];
          break;
        case "S":
          y = r, m = n, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += n - T[A - 3]), f = s.C, M = d[p++], D = d[p++], r = d[p++], n = d[p++], t.addData(f, y, m, M, D, r, n);
          break;
        case "s":
          y = r, m = n, A = t.len(), T = t.data, o === s.C && (y += r - T[A - 4], m += n - T[A - 3]), f = s.C, M = r + d[p++], D = n + d[p++], r += d[p++], n += d[p++], t.addData(f, y, m, M, D, r, n);
          break;
        case "Q":
          M = d[p++], D = d[p++], r = d[p++], n = d[p++], f = s.Q, t.addData(f, M, D, r, n);
          break;
        case "q":
          M = d[p++] + r, D = d[p++] + n, r += d[p++], n += d[p++], f = s.Q, t.addData(f, M, D, r, n);
          break;
        case "T":
          y = r, m = n, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += n - T[A - 3]), r = d[p++], n = d[p++], f = s.Q, t.addData(f, y, m, r, n);
          break;
        case "t":
          y = r, m = n, A = t.len(), T = t.data, o === s.Q && (y += r - T[A - 4], m += n - T[A - 3]), r += d[p++], n += d[p++], f = s.Q, t.addData(f, y, m, r, n);
          break;
        case "A":
          _ = d[p++], b = d[p++], S = d[p++], w = d[p++], x = d[p++], M = r, D = n, r = d[p++], n = d[p++], f = s.A, vv(M, D, r, n, w, x, _, b, S, f, t);
          break;
        case "a":
          _ = d[p++], b = d[p++], S = d[p++], w = d[p++], x = d[p++], M = r, D = n, r += d[p++], n += d[p++], f = s.A, vv(M, D, r, n, w, x, _, b, S, f, t);
          break;
      }
    }
    (c === "z" || c === "Z") && (f = s.Z, t.addData(f), r = i, n = a), o = f;
  }
  return t.toStatic(), t;
}
var bm = function(e) {
  B(t, e);
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(r) {
  }, t;
}(dt);
function wm(e) {
  return e.setData != null;
}
function Sm(e, t) {
  var r = cT(e), n = N({}, t);
  return n.buildPath = function(i) {
    if (wm(i)) {
      i.setData(r.data);
      var a = i.getContext();
      a && i.rebuildPath(a, 1);
    } else {
      var a = i;
      r.rebuildPath(a, 1);
    }
  }, n.applyTransform = function(i) {
    lT(r, i), this.dirtyShape();
  }, n;
}
function fT(e, t) {
  return new bm(Sm(e, t));
}
function dT(e, t) {
  var r = Sm(e, t), n = function(i) {
    B(a, i);
    function a(o) {
      var s = i.call(this, o) || this;
      return s.applyTransform = r.applyTransform, s.buildPath = r.buildPath, s;
    }
    return a;
  }(bm);
  return n;
}
function vT(e, t) {
  for (var r = [], n = e.length, i = 0; i < n; i++) {
    var a = e[i];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new dt(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (wm(s)) {
      s.appendPath(r);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var pT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return e;
}(), _l = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new pT();
  }, t.prototype.buildPath = function(r, n) {
    r.moveTo(n.cx + n.r, n.cy), r.arc(n.cx, n.cy, n.r, 0, Math.PI * 2);
  }, t;
}(dt);
_l.prototype.type = "circle";
var gT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return e;
}(), rf = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new gT();
  }, t.prototype.buildPath = function(r, n) {
    var i = 0.5522848, a = n.cx, o = n.cy, s = n.rx, l = n.ry, u = s * i, h = l * i;
    r.moveTo(a - s, o), r.bezierCurveTo(a - s, o - h, a - u, o - l, a, o - l), r.bezierCurveTo(a + u, o - l, a + s, o - h, a + s, o), r.bezierCurveTo(a + s, o + h, a + u, o + l, a, o + l), r.bezierCurveTo(a - u, o + l, a - s, o + h, a - s, o), r.closePath();
  }, t;
}(dt);
rf.prototype.type = "ellipse";
var xm = Math.PI, $u = xm * 2, vn = Math.sin, ti = Math.cos, yT = Math.acos, Nt = Math.atan2, pv = Math.abs, Oa = Math.sqrt, Ta = Math.max, Ge = Math.min, Ae = 1e-4;
function mT(e, t, r, n, i, a, o, s) {
  var l = r - e, u = n - t, h = o - i, c = s - a, f = c * l - h * u;
  if (!(f * f < Ae))
    return f = (h * (t - a) - c * (e - i)) / f, [e + f * l, t + f * u];
}
function No(e, t, r, n, i, a, o) {
  var s = e - r, l = t - n, u = (o ? a : -a) / Oa(s * s + l * l), h = u * l, c = -u * s, f = e + h, d = t + c, v = r + h, g = n + c, p = (f + v) / 2, y = (d + g) / 2, m = v - f, _ = g - d, b = m * m + _ * _, S = i - a, w = f * g - v * d, x = (_ < 0 ? -1 : 1) * Oa(Ta(0, S * S * b - w * w)), M = (w * _ - m * x) / b, D = (-w * m - _ * x) / b, A = (w * _ + m * x) / b, T = (-w * m + _ * x) / b, $ = M - p, L = D - y, P = A - p, R = T - y;
  return $ * $ + L * L > P * P + R * R && (M = A, D = T), {
    cx: M,
    cy: D,
    x0: -h,
    y0: -c,
    x1: M * (i / S - 1),
    y1: D * (i / S - 1)
  };
}
function _T(e) {
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
function bT(e, t) {
  var r, n = Ta(t.r, 0), i = Ta(t.r0 || 0, 0), a = n > 0, o = i > 0;
  if (!(!a && !o)) {
    if (a || (n = i, i = 0), i > n) {
      var s = n;
      n = i, i = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var h = t.cx, c = t.cy, f = !!t.clockwise, d = pv(u - l), v = d > $u && d % $u;
      if (v > Ae && (d = v), !(n > Ae))
        e.moveTo(h, c);
      else if (d > $u - Ae)
        e.moveTo(h + n * ti(l), c + n * vn(l)), e.arc(h, c, n, l, u, !f), i > Ae && (e.moveTo(h + i * ti(u), c + i * vn(u)), e.arc(h, c, i, u, l, f));
      else {
        var g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0, x = void 0, M = void 0, D = void 0, A = void 0, T = void 0, $ = void 0, L = void 0, P = void 0, R = n * ti(l), E = n * vn(l), G = i * ti(u), k = i * vn(u), F = d > Ae;
        if (F) {
          var W = t.cornerRadius;
          W && (r = _T(W), g = r[0], p = r[1], y = r[2], m = r[3]);
          var j = pv(n - i) / 2;
          if (_ = Ge(j, y), b = Ge(j, m), S = Ge(j, g), w = Ge(j, p), D = x = Ta(_, b), A = M = Ta(S, w), (x > Ae || M > Ae) && (T = n * ti(u), $ = n * vn(u), L = i * ti(l), P = i * vn(l), d < xm)) {
            var nt = mT(R, E, L, P, T, $, G, k);
            if (nt) {
              var vt = R - nt[0], wt = E - nt[1], xt = T - nt[0], Ce = $ - nt[1], Kr = 1 / vn(yT((vt * xt + wt * Ce) / (Oa(vt * vt + wt * wt) * Oa(xt * xt + Ce * Ce))) / 2), Yn = Oa(nt[0] * nt[0] + nt[1] * nt[1]);
              D = Ge(x, (n - Yn) / (Kr + 1)), A = Ge(M, (i - Yn) / (Kr - 1));
            }
          }
        }
        if (!F)
          e.moveTo(h + R, c + E);
        else if (D > Ae) {
          var ie = Ge(y, D), Rt = Ge(m, D), K = No(L, P, R, E, n, ie, f), it = No(T, $, G, k, n, Rt, f);
          e.moveTo(h + K.cx + K.x0, c + K.cy + K.y0), D < x && ie === Rt ? e.arc(h + K.cx, c + K.cy, D, Nt(K.y0, K.x0), Nt(it.y0, it.x0), !f) : (ie > 0 && e.arc(h + K.cx, c + K.cy, ie, Nt(K.y0, K.x0), Nt(K.y1, K.x1), !f), e.arc(h, c, n, Nt(K.cy + K.y1, K.cx + K.x1), Nt(it.cy + it.y1, it.cx + it.x1), !f), Rt > 0 && e.arc(h + it.cx, c + it.cy, Rt, Nt(it.y1, it.x1), Nt(it.y0, it.x0), !f));
        } else
          e.moveTo(h + R, c + E), e.arc(h, c, n, l, u, !f);
        if (!(i > Ae) || !F)
          e.lineTo(h + G, c + k);
        else if (A > Ae) {
          var ie = Ge(g, A), Rt = Ge(p, A), K = No(G, k, T, $, i, -Rt, f), it = No(R, E, L, P, i, -ie, f);
          e.lineTo(h + K.cx + K.x0, c + K.cy + K.y0), A < M && ie === Rt ? e.arc(h + K.cx, c + K.cy, A, Nt(K.y0, K.x0), Nt(it.y0, it.x0), !f) : (Rt > 0 && e.arc(h + K.cx, c + K.cy, Rt, Nt(K.y0, K.x0), Nt(K.y1, K.x1), !f), e.arc(h, c, i, Nt(K.cy + K.y1, K.cx + K.x1), Nt(it.cy + it.y1, it.cx + it.x1), f), ie > 0 && e.arc(h + it.cx, c + it.cy, ie, Nt(it.y1, it.x1), Nt(it.y0, it.x0), !f));
        } else
          e.lineTo(h + G, c + k), e.arc(h, c, i, u, l, f);
      }
      e.closePath();
    }
  }
}
var wT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return e;
}(), Gi = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new wT();
  }, t.prototype.buildPath = function(r, n) {
    bT(r, n);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(dt);
Gi.prototype.type = "sector";
var ST = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return e;
}(), nf = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new ST();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.PI * 2;
    r.moveTo(i + n.r, a), r.arc(i, a, n.r, 0, o, !1), r.moveTo(i + n.r0, a), r.arc(i, a, n.r0, 0, o, !0);
  }, t;
}(dt);
nf.prototype.type = "ring";
function xT(e, t, r, n) {
  var i = [], a = [], o = [], s = [], l, u, h, c;
  if (n) {
    h = [1 / 0, 1 / 0], c = [-1 / 0, -1 / 0];
    for (var f = 0, d = e.length; f < d; f++)
      vi(h, h, e[f]), pi(c, c, e[f]);
    vi(h, h, n[0]), pi(c, c, n[1]);
  }
  for (var f = 0, d = e.length; f < d; f++) {
    var v = e[f];
    if (r)
      l = e[f ? f - 1 : d - 1], u = e[(f + 1) % d];
    else if (f === 0 || f === d - 1) {
      i.push(t1(e[f]));
      continue;
    } else
      l = e[f - 1], u = e[f + 1];
    e1(a, u, l), Yl(a, a, t);
    var g = wh(v, l), p = wh(v, u), y = g + p;
    y !== 0 && (g /= y, p /= y), Yl(o, a, -g), Yl(s, a, p);
    var m = ad([], v, o), _ = ad([], v, s);
    n && (pi(m, m, h), vi(m, m, c), pi(_, _, h), vi(_, _, c)), i.push(m), i.push(_);
  }
  return r && i.push(i.shift()), i;
}
function Tm(e, t, r) {
  var n = t.smooth, i = t.points;
  if (i && i.length >= 2) {
    if (n) {
      var a = xT(i, n, r, t.smoothConstraint);
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
var TT = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), bl = function(e) {
  B(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new TT();
  }, t.prototype.buildPath = function(r, n) {
    Tm(r, n, !0);
  }, t;
}(dt);
bl.prototype.type = "polygon";
var CT = /* @__PURE__ */ function() {
  function e() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return e;
}(), af = function(e) {
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
    return new CT();
  }, t.prototype.buildPath = function(r, n) {
    Tm(r, n, !1);
  }, t;
}(dt);
af.prototype.type = "polyline";
var MT = {}, DT = /* @__PURE__ */ function() {
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
    return new DT();
  }, t.prototype.buildPath = function(r, n) {
    var i, a, o, s;
    if (this.subPixelOptimize) {
      var l = um(MT, n, this.style);
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
}(dt);
Ur.prototype.type = "line";
var qt = [], AT = /* @__PURE__ */ function() {
  function e() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return e;
}();
function gv(e, t, r) {
  var n = e.cpx2, i = e.cpy2;
  return n != null || i != null ? [
    (r ? gd : Et)(e.x1, e.cpx1, e.cpx2, e.x2, t),
    (r ? gd : Et)(e.y1, e.cpy1, e.cpy2, e.y2, t)
  ] : [
    (r ? yd : Qt)(e.x1, e.cpx1, e.x2, t),
    (r ? yd : Qt)(e.y1, e.cpy1, e.y2, t)
  ];
}
var of = function(e) {
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
    return new AT();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.x1, a = n.y1, o = n.x2, s = n.y2, l = n.cpx1, u = n.cpy1, h = n.cpx2, c = n.cpy2, f = n.percent;
    f !== 0 && (r.moveTo(i, a), h == null || c == null ? (f < 1 && (Bs(i, l, o, f, qt), l = qt[1], o = qt[2], Bs(a, u, s, f, qt), u = qt[1], s = qt[2]), r.quadraticCurveTo(l, u, o, s)) : (f < 1 && (Ns(i, l, h, o, f, qt), l = qt[1], h = qt[2], o = qt[3], Ns(a, u, c, s, f, qt), u = qt[1], c = qt[2], s = qt[3]), r.bezierCurveTo(l, u, h, c, o, s)));
  }, t.prototype.pointAt = function(r) {
    return gv(this.shape, r, !1);
  }, t.prototype.tangentAt = function(r) {
    var n = gv(this.shape, r, !0);
    return i1(n, n);
  }, t;
}(dt);
of.prototype.type = "bezier-curve";
var IT = /* @__PURE__ */ function() {
  function e() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return e;
}(), wl = function(e) {
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
    return new IT();
  }, t.prototype.buildPath = function(r, n) {
    var i = n.cx, a = n.cy, o = Math.max(n.r, 0), s = n.startAngle, l = n.endAngle, u = n.clockwise, h = Math.cos(s), c = Math.sin(s);
    r.moveTo(h * o + i, c * o + a), r.arc(i, a, o, s, l, !u);
  }, t;
}(dt);
wl.prototype.type = "arc";
var $T = function(e) {
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
    return this._updatePathDirty.call(this), dt.prototype.getBoundingRect.call(this);
  }, t;
}(dt), Cm = function() {
  function e(t) {
    this.colorStops = t || [];
  }
  return e.prototype.addColorStop = function(t, r) {
    this.colorStops.push({
      offset: t,
      color: r
    });
  }, e;
}(), sf = function(e) {
  B(t, e);
  function t(r, n, i, a, o, s) {
    var l = e.call(this, o) || this;
    return l.x = r ?? 0, l.y = n ?? 0, l.x2 = i ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
}(Cm), LT = function(e) {
  B(t, e);
  function t(r, n, i, a, o) {
    var s = e.call(this, a) || this;
    return s.x = r ?? 0.5, s.y = n ?? 0.5, s.r = i ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(Cm), pn = [0, 0], gn = [0, 0], Bo = new gt(), zo = new gt(), Xs = function() {
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
    return Bo.set(1 / 0, 1 / 0), zo.set(0, 0), !this._intersectCheckOneSide(this, t, Bo, zo, i, 1) && (n = !1, i) || !this._intersectCheckOneSide(t, this, Bo, zo, i, -1) && (n = !1, i) || i || gt.copy(r, n ? Bo : zo), n;
  }, e.prototype._intersectCheckOneSide = function(t, r, n, i, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, pn), this._getProjMinMaxOnAxis(l, r._corners, gn), pn[1] < gn[0] || pn[0] > gn[1]) {
        if (s = !1, a)
          return s;
        var h = Math.abs(gn[0] - pn[1]), c = Math.abs(pn[0] - gn[1]);
        Math.min(h, c) > i.len() && (h < c ? gt.scale(i, u, -h * o) : gt.scale(i, u, c * o));
      } else if (n) {
        var h = Math.abs(gn[0] - pn[1]), c = Math.abs(pn[0] - gn[1]);
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
}(), PT = [], RT = function(e) {
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
        i.needLocalTransform() && a.applyTransform(i.getLocalTransform(PT)), r.union(a);
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
}(yo), OT = Lt();
function ET(e, t, r, n, i) {
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
function lf(e, t, r, n, i, a, o) {
  var s = !1, l;
  Z(i) ? (o = a, a = i, i = null) : V(i) && (a = i.cb, o = i.during, s = i.isFrom, l = i.removeOpt, i = i.dataIndex);
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var h = ET(e, n, i, u ? l || {} : null, n && n.getAnimationDelayParams ? n.getAnimationDelayParams(t, i) : null);
  if (h && h.duration > 0) {
    var c = h.duration, f = h.delay, d = h.easing, v = {
      duration: c,
      delay: f || 0,
      easing: d,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: e,
      during: o
    };
    s ? t.animateFrom(r, v) : t.animateTo(r, v);
  } else
    t.stopAnimation(), !s && t.attr(r), o && o(1), a && a();
}
function le(e, t, r, n, i, a) {
  lf("update", e, t, r, n, i, a);
}
function pr(e, t, r, n, i, a) {
  lf("enter", e, t, r, n, i, a);
}
function Ea(e) {
  if (!e.__zr)
    return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave")
      return !0;
  }
  return !1;
}
function qs(e, t, r, n, i, a) {
  Ea(e) || lf("leave", e, t, r, n, i, a);
}
function yv(e, t, r, n) {
  e.removeTextContent(), e.removeTextGuideLine(), qs(e, {
    style: {
      opacity: 0
    }
  }, t, r, n);
}
function Yh(e, t, r) {
  function n() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function(i) {
    i.isGroup || yv(i, t, r, n);
  }) : yv(e, t, r, n);
}
function Mm(e) {
  OT(e).oldStyle = e.style;
}
var Zs = Math.max, Ks = Math.min, Xh = {};
function kT(e) {
  return dt.extend(e);
}
var NT = dT;
function BT(e, t) {
  return NT(e, t);
}
function ze(e, t) {
  Xh[e] = t;
}
function zT(e) {
  if (Xh.hasOwnProperty(e))
    return Xh[e];
}
function uf(e, t, r, n) {
  var i = fT(e, t);
  return r && (n === "center" && (r = Am(r, i.getBoundingRect())), Im(i, r)), i;
}
function Dm(e, t, r) {
  var n = new rr({
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
        n.setStyle(Am(t, a));
      }
    }
  });
  return n;
}
function Am(e, t) {
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
var FT = vT;
function Im(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(), n = r.calculateTransform(t);
    e.applyTransform(n);
  }
}
function Ja(e, t) {
  return um(e, e, {
    lineWidth: t
  }), e;
}
function HT(e) {
  return hm(e.shape, e.shape, e.style), e;
}
var VT = Mn;
function bs(e, t) {
  for (var r = Fc([]); e && e !== t; )
    wi(r, e.getLocalTransform(), r), e = e.parent;
  return r;
}
function xi(e, t, r) {
  return t && !ee(t) && (t = Wc.getLocalTransform(t)), r && (t = Vc([], t)), be([], e, t);
}
function $m(e, t, r) {
  var n = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), i = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [e === "left" ? -n : e === "right" ? n : 0, e === "top" ? -i : e === "bottom" ? i : 0];
  return a = xi(a, t, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function mv(e) {
  return !e.isGroup;
}
function GT(e) {
  return e.shape != null;
}
function Lm(e, t, r) {
  if (!e || !t)
    return;
  function n(o) {
    var s = {};
    return o.traverse(function(l) {
      mv(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function i(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return GT(o) && (s.shape = N({}, o.shape)), s;
  }
  var a = n(e);
  t.traverse(function(o) {
    if (mv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = i(o);
        o.attr(i(s)), le(o, l, r, st(o).dataIndex);
      }
    }
  });
}
function WT(e, t) {
  return Y(e, function(r) {
    var n = r[0];
    n = Zs(n, t.x), n = Ks(n, t.x + t.width);
    var i = r[1];
    return i = Zs(i, t.y), i = Ks(i, t.y + t.height), [n, i];
  });
}
function UT(e, t) {
  var r = Zs(e.x, t.x), n = Ks(e.x + e.width, t.x + t.width), i = Zs(e.y, t.y), a = Ks(e.y + e.height, t.y + t.height);
  if (n >= r && a >= i)
    return {
      x: r,
      y: i,
      width: n - r,
      height: a - i
    };
}
function hf(e, t, r) {
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
    return e.indexOf("image://") === 0 ? (i.image = e.slice(8), ht(i, r), new rr(n)) : uf(e.replace("path://", ""), n, r, "center");
}
function YT(e, t, r, n, i) {
  for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
    var s = i[a];
    if (Pm(e, t, r, n, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Pm(e, t, r, n, i, a, o, s) {
  var l = r - e, u = n - t, h = o - i, c = s - a, f = Lu(h, c, l, u);
  if (XT(f))
    return !1;
  var d = e - i, v = t - a, g = Lu(d, v, l, u) / f;
  if (g < 0 || g > 1)
    return !1;
  var p = Lu(d, v, h, c) / f;
  return !(p < 0 || p > 1);
}
function Lu(e, t, r, n) {
  return e * n - r * t;
}
function XT(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function Sl(e) {
  var t = e.itemTooltipOption, r = e.componentModel, n = e.itemName, i = H(t) ? {
    formatter: t
  } : t, a = r.mainType, o = r.componentIndex, s = {
    componentType: a,
    name: n,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l && C(_t(l), function(h) {
    En(s, h) || (s[h] = l[h], s.$vars.push(h));
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
function _v(e, t) {
  var r;
  e.isGroup && (r = t(e)), r || e.traverse(t);
}
function mo(e, t) {
  if (e)
    if (z(e))
      for (var r = 0; r < e.length; r++)
        _v(e[r], t);
    else
      _v(e, t);
}
ze("circle", _l);
ze("ellipse", rf);
ze("sector", Gi);
ze("ring", nf);
ze("polygon", bl);
ze("polyline", af);
ze("rect", St);
ze("line", Ur);
ze("bezierCurve", of);
ze("arc", wl);
const qT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: wl,
  BezierCurve: of,
  BoundingRect: ut,
  Circle: _l,
  CompoundPath: $T,
  Ellipse: rf,
  Group: Dt,
  Image: rr,
  IncrementalDisplayable: RT,
  Line: Ur,
  LinearGradient: sf,
  OrientedBoundingRect: Xs,
  Path: dt,
  Point: gt,
  Polygon: bl,
  Polyline: af,
  RadialGradient: LT,
  Rect: St,
  Ring: nf,
  Sector: Gi,
  Text: $t,
  applyTransform: xi,
  clipPointsByRect: WT,
  clipRectByRect: UT,
  createIcon: hf,
  extendPath: BT,
  extendShape: kT,
  getShapeClass: zT,
  getTransform: bs,
  groupTransition: Lm,
  initProps: pr,
  isElementRemoved: Ea,
  lineLineIntersect: Pm,
  linePolygonIntersect: YT,
  makeImage: Dm,
  makePath: uf,
  mergePath: FT,
  registerShape: ze,
  removeElement: qs,
  removeElementWithFadeOut: Yh,
  resizePath: Im,
  setTooltipConfig: Sl,
  subPixelOptimize: VT,
  subPixelOptimizeLine: Ja,
  subPixelOptimizeRect: HT,
  transformDirection: $m,
  traverseElements: mo,
  updateProps: le
}, Symbol.toStringTag, { value: "Module" }));
var xl = {};
function ZT(e, t) {
  for (var r = 0; r < je.length; r++) {
    var n = je[r], i = t[n], a = e.ensureState(n);
    a.style = a.style || {}, a.style.text = i;
  }
  var o = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(o, !0);
}
function bv(e, t, r) {
  var n = e.labelFetcher, i = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
  n && (s = n.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), r != null ? {
    interpolatedValue: r
  } : null)), s == null && (s = Z(e.defaultText) ? e.defaultText(i, e, r) : e.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < je.length; u++) {
    var h = je[u], c = t[h];
    l[h] = tt(n ? n.getFormattedLabel(i, h, null, a, c && c.get("formatter")) : null, s);
  }
  return l;
}
function _o(e, t, r, n) {
  r = r || xl;
  for (var i = e instanceof $t, a = !1, o = 0; o < nv.length; o++) {
    var s = t[nv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = i ? e : e.getTextContent();
  if (a) {
    i || (l || (l = new $t(), e.setTextContent(l)), e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = bv(r, t), h = t.normal, c = !!h.getShallow("show"), f = qe(h, n && n.normal, r, !1, !i);
    f.text = u.normal, i || e.setTextConfig(wv(h, r, !1));
    for (var o = 0; o < je.length; o++) {
      var d = je[o], s = t[d];
      if (s) {
        var v = l.ensureState(d), g = !!tt(s.getShallow("show"), c);
        if (g !== c && (v.ignore = !g), v.style = qe(s, n && n[d], r, !0, !i), v.style.text = u[d], !i) {
          var p = e.ensureState(d);
          p.textConfig = wv(s, r, !0);
        }
      }
    }
    l.silent = !!h.getShallow("silent"), l.style.x != null && (f.x = l.style.x), l.style.y != null && (f.y = l.style.y), l.ignore = !c, l.useStyle(f), l.dirty(), r.enableTextSetter && (Tl(l).setLabelText = function(y) {
      var m = bv(r, t, y);
      ZT(l, m);
    });
  } else l && (l.ignore = !0);
  e.dirty();
}
function Pi(e, t) {
  t = t || "label";
  for (var r = {
    normal: e.getModel(t)
  }, n = 0; n < je.length; n++) {
    var i = je[n];
    r[i] = e.getModel([i, t]);
  }
  return r;
}
function qe(e, t, r, n, i) {
  var a = {};
  return KT(a, e, r, n, i), t && N(a, t), a;
}
function wv(e, t, r) {
  t = t || {};
  var n = {}, i, a = e.getShallow("rotate"), o = tt(e.getShallow("distance"), r ? null : 5), s = e.getShallow("offset");
  return i = e.getShallow("position") || (r ? null : "inside"), i === "outside" && (i = t.defaultOutsidePosition || "top"), i != null && (n.position = i), s != null && (n.offset = s), a != null && (a *= Math.PI / 180, n.rotation = a), o != null && (n.distance = o), n.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", n;
}
function KT(e, t, r, n, i) {
  r = r || xl;
  var a = t.ecModel, o = a && a.option.textStyle, s = jT(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var h = t.getModel(["rich", u]);
        Cv(l[u] = {}, h, o, r, n, i, !1, !0);
      }
  }
  l && (e.rich = l);
  var c = t.get("overflow");
  c && (e.overflow = c);
  var f = t.get("minMargin");
  f != null && (e.margin = f), Cv(e, t, o, r, n, i, !0, !1);
}
function jT(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || xl).rich;
    if (r) {
      t = t || {};
      for (var n = _t(r), i = 0; i < n.length; i++) {
        var a = n[i];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var Sv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], xv = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Tv = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function Cv(e, t, r, n, i, a, o, s) {
  r = !i && r || xl;
  var l = n && n.inheritColor, u = t.getShallow("color"), h = t.getShallow("textBorderColor"), c = tt(t.getShallow("opacity"), r.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), a || (u = u || r.color, h = h || r.textBorderColor), u != null && (e.fill = u), h != null && (e.stroke = h);
  var f = tt(t.getShallow("textBorderWidth"), r.textBorderWidth);
  f != null && (e.lineWidth = f);
  var d = tt(t.getShallow("textBorderType"), r.textBorderType);
  d != null && (e.lineDash = d);
  var v = tt(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  v != null && (e.lineDashOffset = v), !i && c == null && !s && (c = n && n.defaultOpacity), c != null && (e.opacity = c), !i && !a && e.fill == null && n.inheritColor && (e.fill = n.inheritColor);
  for (var g = 0; g < Sv.length; g++) {
    var p = Sv[g], y = tt(t.getShallow(p), r[p]);
    y != null && (e[p] = y);
  }
  for (var g = 0; g < xv.length; g++) {
    var p = xv[g], y = t.getShallow(p);
    y != null && (e[p] = y);
  }
  if (e.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (e.verticalAlign = m);
  }
  if (!o || !n.disableBox) {
    for (var g = 0; g < Tv.length; g++) {
      var p = Tv[g], y = t.getShallow(p);
      y != null && (e[p] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (e.borderDash = _), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && l && (e.backgroundColor = l), (e.borderColor === "auto" || e.borderColor === "inherit") && l && (e.borderColor = l);
  }
}
function QT(e, t) {
  var r = t && t.getModel("textStyle");
  return Ye([
    // FIXME in node-canvas fontWeight is before fontStyle
    e.fontStyle || r && r.getShallow("fontStyle") || "",
    e.fontWeight || r && r.getShallow("fontWeight") || "",
    (e.fontSize || r && r.getShallow("fontSize") || 12) + "px",
    e.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var Tl = Lt();
function JT(e, t, r, n) {
  if (e) {
    var i = Tl(e);
    i.prevValue = i.value, i.value = r;
    var a = t.normal;
    i.valueAnimation = a.get("valueAnimation"), i.valueAnimation && (i.precision = a.get("precision"), i.defaultInterpolatedText = n, i.statesModels = t);
  }
}
var tC = ["textStyle", "color"], Pu = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Ru = new $t(), eC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTextColor = function(t) {
      var r = this.ecModel;
      return this.getShallow("color") || (!t && r ? r.get(tC) : null);
    }, e.prototype.getFont = function() {
      return QT({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function(t) {
      for (var r = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, n = 0; n < Pu.length; n++)
        r[Pu[n]] = this.getShallow(Pu[n]);
      return Ru.useStyle(r), Ru.update(), Ru.getBoundingRect();
    }, e;
  }()
), Rm = [
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
], rC = ja(Rm), nC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getLineStyle = function(t) {
      return rC(this, t);
    }, e;
  }()
), Om = [
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
], iC = ja(Om), aC = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getItemStyle = function(t, r) {
      return iC(this, t, r);
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
Kc(Tt);
US(Tt);
tr(Tt, nC);
tr(Tt, aC);
tr(Tt, KS);
tr(Tt, eC);
var oC = Math.round(Math.random() * 10);
function Cl(e) {
  return [e || "", oC++].join("_");
}
function sC(e) {
  var t = {};
  e.registerSubTypeDefaulter = function(r, n) {
    var i = Xe(r);
    t[i.main] = n;
  }, e.determineSubType = function(r, n) {
    var i = n.type;
    if (!i) {
      var a = Xe(r).main;
      e.hasSubTypes(r) && t[a] && (i = t[a](n));
    }
    return i;
  };
}
function lC(e, t) {
  e.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = r(o), h = u.graph, c = u.noEntryList, f = {};
    for (C(a, function(m) {
      f[m] = !0;
    }); c.length; ) {
      var d = c.pop(), v = h[d], g = !!f[d];
      g && (s.call(l, d, v.originalDeps.slice()), delete f[d]), C(v.successor, g ? y : p);
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
        var d = n(o, f);
        pt(d.successor, f) < 0 && d.successor.push(l);
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
function Ml(e, t) {
  return ot(ot({}, e, !0), t, !0);
}
const uC = {
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
}, hC = {
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
var js = "ZH", cf = "EN", Ti = cf, ws = {}, ff = {}, Em = X.domSupported ? function() {
  var e = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Ti).toUpperCase()
  );
  return e.indexOf(js) > -1 ? js : Ti;
}() : Ti;
function km(e, t) {
  e = e.toUpperCase(), ff[e] = new Tt(t), ws[e] = t;
}
function cC(e) {
  if (H(e)) {
    var t = ws[e.toUpperCase()] || {};
    return e === js || e === cf ? q(t) : ot(q(t), q(ws[Ti]), !1);
  } else
    return ot(q(e), q(ws[Ti]), !1);
}
function fC(e) {
  return ff[e];
}
function dC() {
  return ff[Ti];
}
km(cf, uC);
km(js, hC);
var df = 1e3, vf = df * 60, ka = vf * 60, _e = ka * 24, Mv = _e * 365, Ca = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Fo = "{yyyy}-{MM}-{dd}", Dv = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Fo,
  hour: Fo + " " + Ca.hour,
  minute: Fo + " " + Ca.minute,
  second: Fo + " " + Ca.second,
  millisecond: Ca.none
}, Ou = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Nm = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function Dr(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function Ci(e) {
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
function vC(e) {
  return e === Ci(e);
}
function pC(e) {
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
function Dl(e, t, r, n) {
  var i = vr(e), a = i[pf(r)](), o = i[Mi(r)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = i[Al(r)](), u = i["get" + (r ? "UTC" : "") + "Day"](), h = i[to(r)](), c = (h - 1) % 12 + 1, f = i[Il(r)](), d = i[$l(r)](), v = i[Ll(r)](), g = h >= 12 ? "pm" : "am", p = g.toUpperCase(), y = n instanceof Tt ? n : fC(n || Em) || dC(), m = y.getModel("time"), _ = m.get("month"), b = m.get("monthAbbr"), S = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, g + "").replace(/{A}/g, p + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Dr(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, b[o - 1]).replace(/{MM}/g, Dr(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Dr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, S[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Dr(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Dr(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Dr(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, Dr(d, 2)).replace(/{s}/g, d + "").replace(/{SSS}/g, Dr(v, 3)).replace(/{S}/g, v + "");
}
function gC(e, t, r, n, i) {
  var a = null;
  if (H(r))
    a = r;
  else if (Z(r))
    a = r(e.value, t, {
      level: e.level
    });
  else {
    var o = N({}, Ca);
    if (e.level > 0)
      for (var s = 0; s < Ou.length; ++s)
        o[Ou[s]] = "{primary|" + o[Ou[s]] + "}";
    var l = r ? r.inherit === !1 ? r : ht(r, o) : o, u = Bm(e.value, i);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var h = Nm.indexOf(u), s = h - 1; s >= 0; --s)
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
  return Dl(new Date(e.value), a, i, n);
}
function Bm(e, t) {
  var r = vr(e), n = r[Mi(t)]() + 1, i = r[Al(t)](), a = r[to(t)](), o = r[Il(t)](), s = r[$l(t)](), l = r[Ll(t)](), u = l === 0, h = u && s === 0, c = h && o === 0, f = c && a === 0, d = f && i === 1, v = d && n === 1;
  return v ? "year" : d ? "month" : f ? "day" : c ? "hour" : h ? "minute" : u ? "second" : "millisecond";
}
function Av(e, t, r) {
  var n = bt(e) ? vr(e) : e;
  switch (t = t || Bm(e, r), t) {
    case "year":
      return n[pf(r)]();
    case "half-year":
      return n[Mi(r)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((n[Mi(r)]() + 1) / 4);
    case "month":
      return n[Mi(r)]();
    case "day":
      return n[Al(r)]();
    case "half-day":
      return n[to(r)]() / 24;
    case "hour":
      return n[to(r)]();
    case "minute":
      return n[Il(r)]();
    case "second":
      return n[$l(r)]();
    case "millisecond":
      return n[Ll(r)]();
  }
}
function pf(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function Mi(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function Al(e) {
  return e ? "getUTCDate" : "getDate";
}
function to(e) {
  return e ? "getUTCHours" : "getHours";
}
function Il(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function $l(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function Ll(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function yC(e) {
  return e ? "setUTCFullYear" : "setFullYear";
}
function zm(e) {
  return e ? "setUTCMonth" : "setMonth";
}
function Fm(e) {
  return e ? "setUTCDate" : "setDate";
}
function Hm(e) {
  return e ? "setUTCHours" : "setHours";
}
function Vm(e) {
  return e ? "setUTCMinutes" : "setMinutes";
}
function Gm(e) {
  return e ? "setUTCSeconds" : "setSeconds";
}
function Wm(e) {
  return e ? "setUTCMilliseconds" : "setMilliseconds";
}
function Um(e) {
  if (!xS(e))
    return H(e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function Ym(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function(r, n) {
    return n.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var bo = Cy;
function qh(e, t, r) {
  var n = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function i(h) {
    return h && Ye(h) ? h : "-";
  }
  function a(h) {
    return !!(h != null && !isNaN(h) && isFinite(h));
  }
  var o = t === "time", s = e instanceof Date;
  if (o || s) {
    var l = o ? vr(e) : e;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Dl(l, n, r);
  }
  if (t === "ordinal")
    return _h(e) ? i(e) : bt(e) && a(e) ? e + "" : "-";
  var u = Gs(e);
  return a(u) ? Um(u) : _h(e) ? i(e) : typeof e == "boolean" ? e + "" : "-";
}
var Iv = ["a", "b", "c", "d", "e", "f", "g"], Eu = function(e, t) {
  return "{" + e + (t ?? "") + "}";
};
function Xm(e, t, r) {
  z(t) || (t = [t]);
  var n = t.length;
  if (!n)
    return "";
  for (var i = t[0].$vars || [], a = 0; a < i.length; a++) {
    var o = Iv[a];
    e = e.replace(Eu(o), Eu(o, 0));
  }
  for (var s = 0; s < n; s++)
    for (var l = 0; l < i.length; l++) {
      var u = t[s][i[l]];
      e = e.replace(Eu(Iv[l], s), r ? jt(u) : u);
    }
  return e;
}
function mC(e, t) {
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
function Bn(e, t) {
  return t = t || "transparent", H(e) ? e : V(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
var Ss = C, _C = ["left", "right", "top", "bottom", "width", "height"], Ho = [["width", "left", "right"], ["height", "top", "bottom"]];
function gf(e, t, r, n, i) {
  var a = 0, o = 0;
  n == null && (n = 1 / 0), i == null && (i = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var h = l.getBoundingRect(), c = t.childAt(u + 1), f = c && c.getBoundingRect(), d, v;
    if (e === "horizontal") {
      var g = h.width + (f ? -f.x + h.x : 0);
      d = a + g, d > n || l.newline ? (a = 0, d = g, o += s + r, s = h.height) : s = Math.max(s, h.height);
    } else {
      var p = h.height + (f ? -f.y + h.y : 0);
      v = o + p, v > i || l.newline ? (a += s + r, o = 0, v = p, s = h.width) : s = Math.max(s, h.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), e === "horizontal" ? a = d + r : o = v + r);
  });
}
var Di = gf;
It(gf, "vertical");
It(gf, "horizontal");
function Ri(e, t, r) {
  r = bo(r || 0);
  var n = t.width, i = t.height, a = Yt(e.left, n), o = Yt(e.top, i), s = Yt(e.right, n), l = Yt(e.bottom, i), u = Yt(e.width, n), h = Yt(e.height, i), c = r[2] + r[0], f = r[1] + r[3], d = e.aspect;
  switch (isNaN(u) && (u = n - s - f - a), isNaN(h) && (h = i - l - c - o), d != null && (isNaN(u) && isNaN(h) && (d > n / i ? u = n * 0.8 : h = i * 0.8), isNaN(u) && (u = d * h), isNaN(h) && (h = u / d)), isNaN(a) && (a = n - s - u - f), isNaN(o) && (o = i - l - h - c), e.left || e.right) {
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
  var v = new ut(a + r[3], o + r[0], u, h);
  return v.margin = r, v;
}
function bC(e, t, r, n, i, a) {
  a = a || e, a.x = e.x, a.y = e.y;
  var o;
  if (o = e.getBoundingRect(), e.needLocalTransform()) {
    var s = e.getLocalTransform();
    o = o.clone(), o.applyTransform(s);
  }
  var l = Ri(ht({
    width: o.width,
    height: o.height
  }, t), r, n), u = l.x - o.x, h = l.y - o.y;
  return a.x += u, a.y += h, a === e && e.markRedraw(), !0;
}
function eo(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return V(t) ? t : t ? {
    type: t
  } : null;
}
function Oi(e, t, r) {
  var n = r && r.ignoreSize;
  !z(n) && (n = [n, n]);
  var i = o(Ho[0], 0), a = o(Ho[1], 1);
  u(Ho[0], e, i), u(Ho[1], e, a);
  function o(h, c) {
    var f = {}, d = 0, v = {}, g = 0, p = 2;
    if (Ss(h, function(_) {
      v[_] = e[_];
    }), Ss(h, function(_) {
      s(t, _) && (f[_] = v[_] = t[_]), l(f, _) && d++, l(v, _) && g++;
    }), n[c])
      return l(t, h[1]) ? v[h[2]] = null : l(t, h[2]) && (v[h[1]] = null), v;
    if (g === p || !d)
      return v;
    if (d >= p)
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
    Ss(h, function(d) {
      c[d] = f[d];
    });
  }
}
function Pl(e) {
  return wC({}, e);
}
function wC(e, t) {
  return t && e && Ss(_C, function(r) {
    t.hasOwnProperty(r) && (e[r] = t[r]);
  }), e;
}
var SC = Lt(), ct = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i) {
      var a = e.call(this, r, n, i) || this;
      return a.uid = Cl("ec_cpt_model"), a;
    }
    return t.prototype.init = function(r, n, i) {
      this.mergeDefaultAndTheme(r, i);
    }, t.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = eo(this), a = i ? Pl(r) : {}, o = n.getTheme();
      ot(r, o.get(this.mainType)), ot(r, this.getDefaultOption()), i && Oi(r, a, i);
    }, t.prototype.mergeOption = function(r, n) {
      ot(this.option, r, !0);
      var i = eo(this);
      i && Oi(this.option, r, i);
    }, t.prototype.optionUpdated = function(r, n) {
    }, t.prototype.getDefaultOption = function() {
      var r = this.constructor;
      if (!VS(r))
        return r.defaultOption;
      var n = SC(this);
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
      return go(this.ecModel, r, {
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
rm(ct, Tt);
dl(ct);
sC(ct);
lC(ct, xC);
function xC(e) {
  var t = [];
  return C(ct.getClassesByMainType(e), function(r) {
    t = t.concat(r.dependencies || r.prototype.dependencies || []);
  }), t = Y(t, function(r) {
    return Xe(r).main;
  }), e !== "dataset" && pt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var qm = "";
typeof navigator < "u" && (qm = navigator.platform || "");
var ei = "rgba(0, 0, 0, 0.2)";
const TC = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: ei,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: ei,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: ei,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: ei,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: ei,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: ei,
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
    fontFamily: qm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
var Zm = Q(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Te = "original", ne = "arrayRows", nr = "objectRows", xr = "keyedColumns", Hr = "typedArray", Km = "unknown", fr = "column", Wi = "row", ae = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, jm = Lt();
function CC(e) {
  jm(e).datasetMap = Q();
}
function MC(e, t, r) {
  var n = {}, i = Qm(t);
  if (!i || !e)
    return n;
  var a = [], o = [], s = t.ecModel, l = jm(s).datasetMap, u = i.uid + "_" + r.seriesLayoutBy, h, c;
  e = e.slice(), C(e, function(g, p) {
    var y = V(g) ? g : e[p] = {
      name: g
    };
    y.type === "ordinal" && h == null && (h = p, c = v(y)), n[y.name] = [];
  });
  var f = l.get(u) || l.set(u, {
    categoryWayDim: c,
    valueWayDim: 0
  });
  C(e, function(g, p) {
    var y = g.name, m = v(g);
    if (h == null) {
      var _ = f.valueWayDim;
      d(n[y], _, m), d(o, _, m), f.valueWayDim += m;
    } else if (h === p)
      d(n[y], 0, m), d(a, 0, m);
    else {
      var _ = f.categoryWayDim;
      d(n[y], _, m), d(o, _, m), f.categoryWayDim += m;
    }
  });
  function d(g, p, y) {
    for (var m = 0; m < y; m++)
      g.push(p + m);
  }
  function v(g) {
    var p = g.dimsDef;
    return p ? p.length : 1;
  }
  return a.length && (n.itemName = a), o.length && (n.seriesName = o), n;
}
function Qm(e) {
  var t = e.get("data", !0);
  if (!t)
    return go(e.ecModel, "dataset", {
      index: e.get("datasetIndex", !0),
      id: e.get("datasetId", !0)
    }, Le).models[0];
}
function DC(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : go(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, Le).models;
}
function Jm(e, t) {
  return AC(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function AC(e, t, r, n, i, a) {
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
    if (r === Wi) {
      for (var f = c[a], d = 0; d < (f || []).length && d < s; d++)
        if ((o = b(f[i + d])) != null)
          return o;
    } else
      for (var d = 0; d < c.length && d < s; d++) {
        var v = c[i + d];
        if (v && (o = b(v[a])) != null)
          return o;
      }
  } else if (t === nr) {
    var g = e;
    if (!l)
      return ae.Not;
    for (var d = 0; d < g.length && d < s; d++) {
      var p = g[d];
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
    for (var d = 0; d < f.length && d < s; d++)
      if ((o = b(f[d])) != null)
        return o;
  } else if (t === Te)
    for (var m = e, d = 0; d < m.length && d < s; d++) {
      var p = m[d], _ = po(p);
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
var IC = Q();
function $C(e, t, r) {
  var n = IC.get(t);
  if (!n)
    return r;
  var i = n(e);
  return i ? r.concat(i) : r;
}
var $v = Lt();
Lt();
var yf = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getColorFromPalette = function(t, r, n) {
      var i = kt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return PC(this, $v, i, a, t, r, n);
    }, e.prototype.clearColorPalette = function() {
      RC(this, $v);
    }, e;
  }()
);
function LC(e, t) {
  for (var r = e.length, n = 0; n < r; n++)
    if (e[n].length > t)
      return e[n];
  return e[r - 1];
}
function PC(e, t, r, n, i, a, o) {
  a = a || e;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(i))
    return u[i];
  var h = o == null || !n ? r : LC(n, o);
  if (h = h || r, !(!h || !h.length)) {
    var c = h[l];
    return i && (u[i] = c), s.paletteIdx = (l + 1) % h.length, c;
  }
}
function RC(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
var Vo, oa, Lv, Pv = "\0_ec_inner", OC = 1, mf = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function(r, n, i, a, o, s) {
      a = a || {}, this.option = null, this._theme = new Tt(a), this._locale = new Tt(o), this._optionManager = s;
    }, t.prototype.setOption = function(r, n, i) {
      var a = Ev(n);
      this._optionManager.setOption(r, i, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(r, n) {
      return this._resetOption(r, Ev(n));
    }, t.prototype._resetOption = function(r, n) {
      var i = !1, a = this._optionManager;
      if (!r || r === "recreate") {
        var o = a.mountOption(r === "recreate");
        !this.option || r === "recreate" ? Lv(this, o) : (this.restoreData(), this._mergeOption(o, n)), i = !0;
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
      CC(this), C(r, function(c, f) {
        c != null && (ct.hasClass(f) ? f && (s.push(f), l.set(f, !0)) : i[f] = i[f] == null ? q(c) : ot(i[f], c, !0));
      }), u && u.each(function(c, f) {
        ct.hasClass(f) && !l.get(f) && (s.push(f), l.set(f, !0));
      }), ct.topologicalTravel(s, ct.getAllClassMainTypes(), h, this);
      function h(c) {
        var f = $C(this, c, kt(r[c])), d = a.get(c), v = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          d ? u && u.get(c) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), g = MS(d, f, v);
        RS(g, c, ct), i[c] = null, a.set(c, null), o.set(c, 0);
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
        }, this), i[c] = p, a.set(c, y), o.set(c, m), c === "series" && Vo(this);
      }
      this._seriesIndices || Vo(this);
    }, t.prototype.getOption = function() {
      var r = q(this.option);
      return C(r, function(n, i) {
        if (ct.hasClass(i)) {
          for (var a = kt(n), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Ka(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, r[i] = a;
        }
      }), delete r[Pv], r;
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
      })) : a != null ? l = Rv("id", a, s) : o != null ? l = Rv("name", o, s) : l = Ot(s, function(u) {
        return !!u;
      }), Ov(l, r);
    }, t.prototype.findComponents = function(r) {
      var n = r.query, i = r.mainType, a = s(n), o = a ? this.queryComponents(a) : Ot(this._componentsMap.get(i), function(u) {
        return !!u;
      });
      return l(Ov(o, r));
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
          for (var d = 0; c && d < c.length; d++) {
            var v = c[d];
            v && s.call(o, f, v, v.componentIndex);
          }
        });
      } else
        for (var l = H(r) ? a.get(r) : V(r) ? this.findComponents(r) : null, u = 0; l && u < l.length; u++) {
          var h = l[u];
          h && n.call(i, h, h.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(r) {
      var n = Oe(r, null);
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
      oa(this), C(this._seriesIndices, function(i) {
        var a = this._componentsMap.get("series")[i];
        r.call(n, a, i);
      }, this);
    }, t.prototype.eachRawSeries = function(r, n) {
      C(this._componentsMap.get("series"), function(i) {
        i && r.call(n, i, i.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(r, n, i) {
      oa(this), C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === r && n.call(i, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(r, n, i) {
      return C(this.getSeriesByType(r), n, i);
    }, t.prototype.isSeriesFiltered = function(r) {
      return oa(this), this._seriesIndicesMap.get(r.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(r, n) {
      oa(this);
      var i = [];
      C(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        r.call(n, o, a) && i.push(a);
      }, this), this._seriesIndices = i, this._seriesIndicesMap = Q(i);
    }, t.prototype.restoreData = function(r) {
      Vo(this);
      var n = this._componentsMap, i = [];
      n.each(function(a, o) {
        ct.hasClass(o) && i.push(o);
      }), ct.topologicalTravel(i, ct.getAllClassMainTypes(), function(a) {
        C(n.get(a), function(o) {
          o && (a !== "series" || !EC(o, r)) && o.restoreData();
        });
      });
    }, t.internalField = function() {
      Vo = function(r) {
        var n = r._seriesIndices = [];
        C(r._componentsMap.get("series"), function(i) {
          i && n.push(i.componentIndex);
        }), r._seriesIndicesMap = Q(n);
      }, oa = function(r) {
      }, Lv = function(r, n) {
        r.option = {}, r.option[Pv] = OC, r._componentsMap = Q({
          series: []
        }), r._componentsCount = Q();
        var i = n.aria;
        V(i) && i.enabled == null && (i.enabled = !0), kC(n, r._theme.option), ot(n, TC, !1), r._mergeOption(n, null);
      };
    }(), t;
  }(Tt)
);
function EC(e, t) {
  if (t) {
    var r = t.seriesIndex, n = t.seriesId, i = t.seriesName;
    return r != null && e.componentIndex !== r || n != null && e.id !== n || i != null && e.name !== i;
  }
}
function kC(e, t) {
  var r = e.color && !e.colorLayer;
  C(t, function(n, i) {
    i === "colorLayer" && r || ct.hasClass(i) || (typeof n == "object" ? e[i] = e[i] ? ot(e[i], n, !1) : q(n) : e[i] == null && (e[i] = n));
  });
}
function Rv(e, t, r) {
  if (z(t)) {
    var n = Q();
    return C(t, function(a) {
      if (a != null) {
        var o = Oe(a, null);
        o != null && n.set(a, !0);
      }
    }), Ot(r, function(a) {
      return a && n.get(a[e]);
    });
  } else {
    var i = Oe(t, null);
    return Ot(r, function(a) {
      return a && i != null && a[e] === i;
    });
  }
}
function Ov(e, t) {
  return t.hasOwnProperty("subType") ? Ot(e, function(r) {
    return r && r.subType === t.subType;
  }) : e;
}
function Ev(e) {
  var t = Q();
  return e && C(kt(e.replaceMerge), function(r) {
    t.set(r, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
tr(mf, yf);
var NC = [
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
], t_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      C(NC, function(r) {
        this[r] = J(t[r], t);
      }, this);
    }
    return e;
  }()
), ku = {}, Rl = (
  /** @class */
  function() {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function(t, r) {
      var n = [];
      C(ku, function(i, a) {
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
      ku[t] = r;
    }, e.get = function(t) {
      return ku[t];
    }, e;
  }()
), BC = /^(min|max)?(.+)$/, zC = (
  /** @class */
  function() {
    function e(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return e.prototype.setOption = function(t, r, n) {
      t && (C(kt(t.series), function(o) {
        o && o.data && re(o.data) && bh(o.data);
      }), C(kt(t.dataset), function(o) {
        o && o.source && re(o.source) && bh(o.source);
      })), t = q(t);
      var i = this._optionBackup, a = FC(t, r, !i);
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
        HC(i[l].query, r, n) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !GC(o, this._currentMediaIndices) && (s = Y(o, function(h) {
        return q(h === -1 ? a.option : i[h].option);
      })), this._currentMediaIndices = o, s;
    }, e;
  }()
);
function FC(e, t, r) {
  var n = [], i, a, o = e.baseOption, s = e.timeline, l = e.options, u = e.media, h = !!e.media, c = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((c || h) && (e.options = e.media = null), a = e), h && z(u) && C(u, function(d) {
    d && d.option && (d.query ? n.push(d) : i || (i = d));
  }), f(a), C(l, function(d) {
    return f(d);
  }), C(n, function(d) {
    return f(d.option);
  });
  function f(d) {
    C(t, function(v) {
      v(d, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: i,
    mediaList: n
  };
}
function HC(e, t, r) {
  var n = {
    width: t,
    height: r,
    aspectratio: t / r
    // lower case for convenience.
  }, i = !0;
  return C(e, function(a, o) {
    var s = o.match(BC);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      VC(n[u], a, l) || (i = !1);
    }
  }), i;
}
function VC(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function GC(e, t) {
  return e.join(",") === t.join(",");
}
var Me = C, ro = V, kv = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Nu(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, n = kv.length; r < n; r++) {
      var i = kv[r], a = t.normal, o = t.emphasis;
      a && a[i] && (e[i] = e[i] || {}, e[i].normal ? ot(e[i].normal, a[i]) : e[i].normal = a[i], a[i] = null), o && o[i] && (e[i] = e[i] || {}, e[i].emphasis ? ot(e[i].emphasis, o[i]) : e[i].emphasis = o[i], o[i] = null);
    }
}
function Ft(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var n = e[t].normal, i = e[t].emphasis;
    n && (r ? (e[t].normal = e[t].emphasis = null, ht(e[t], n)) : e[t] = n), i && (e.emphasis = e.emphasis || {}, e.emphasis[t] = i, i.focus && (e.emphasis.focus = i.focus), i.blurScope && (e.emphasis.blurScope = i.blurScope));
  }
}
function Ma(e) {
  Ft(e, "itemStyle"), Ft(e, "lineStyle"), Ft(e, "areaStyle"), Ft(e, "label"), Ft(e, "labelLine"), Ft(e, "upperLabel"), Ft(e, "edgeLabel");
}
function Mt(e, t) {
  var r = ro(e) && e[t], n = ro(r) && r.textStyle;
  if (n)
    for (var i = 0, a = Bd.length; i < a; i++) {
      var o = Bd[i];
      n.hasOwnProperty(o) && (r[o] = n[o]);
    }
}
function ve(e) {
  e && (Ma(e), Mt(e, "label"), e.emphasis && Mt(e.emphasis, "label"));
}
function WC(e) {
  if (ro(e)) {
    Nu(e), Ma(e), Mt(e, "label"), Mt(e, "upperLabel"), Mt(e, "edgeLabel"), e.emphasis && (Mt(e.emphasis, "label"), Mt(e.emphasis, "upperLabel"), Mt(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (Nu(t), ve(t));
    var r = e.markLine;
    r && (Nu(r), ve(r));
    var n = e.markArea;
    n && ve(n);
    var i = e.data;
    if (e.type === "graph") {
      i = i || e.nodes;
      var a = e.links || e.edges;
      if (a && !re(a))
        for (var o = 0; o < a.length; o++)
          ve(a[o]);
      C(e.categories, function(u) {
        Ma(u);
      });
    }
    if (i && !re(i))
      for (var o = 0; o < i.length; o++)
        ve(i[o]);
    if (t = e.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ve(s[o]);
    if (r = e.markLine, r && r.data)
      for (var l = r.data, o = 0; o < l.length; o++)
        z(l[o]) ? (ve(l[o][0]), ve(l[o][1])) : ve(l[o]);
    e.type === "gauge" ? (Mt(e, "axisLabel"), Mt(e, "title"), Mt(e, "detail")) : e.type === "treemap" ? (Ft(e.breadcrumb, "itemStyle"), C(e.levels, function(u) {
      Ma(u);
    })) : e.type === "tree" && Ma(e.leaves);
  }
}
function or(e) {
  return z(e) ? e : e ? [e] : [];
}
function Nv(e) {
  return (z(e) ? e[0] : e) || {};
}
function UC(e, t) {
  Me(or(e.series), function(n) {
    ro(n) && WC(n);
  });
  var r = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Me(r, function(n) {
    Me(or(e[n]), function(i) {
      i && (Mt(i, "axisLabel"), Mt(i.axisPointer, "label"));
    });
  }), Me(or(e.parallel), function(n) {
    var i = n && n.parallelAxisDefault;
    Mt(i, "axisLabel"), Mt(i && i.axisPointer, "label");
  }), Me(or(e.calendar), function(n) {
    Ft(n, "itemStyle"), Mt(n, "dayLabel"), Mt(n, "monthLabel"), Mt(n, "yearLabel");
  }), Me(or(e.radar), function(n) {
    Mt(n, "name"), n.name && n.axisName == null && (n.axisName = n.name, delete n.name), n.nameGap != null && n.axisNameGap == null && (n.axisNameGap = n.nameGap, delete n.nameGap);
  }), Me(or(e.geo), function(n) {
    ro(n) && (ve(n), Me(or(n.regions), function(i) {
      ve(i);
    }));
  }), Me(or(e.timeline), function(n) {
    ve(n), Ft(n, "label"), Ft(n, "itemStyle"), Ft(n, "controlStyle", !0);
    var i = n.data;
    z(i) && C(i, function(a) {
      V(a) && (Ft(a, "label"), Ft(a, "itemStyle"));
    });
  }), Me(or(e.toolbox), function(n) {
    Ft(n, "iconStyle"), Me(n.feature, function(i) {
      Ft(i, "iconStyle");
    });
  }), Mt(Nv(e.axisPointer), "label"), Mt(Nv(e.tooltip).axisPointer, "label");
}
function YC(e, t) {
  for (var r = t.split(","), n = e, i = 0; i < r.length && (n = n && n[r[i]], n != null); i++)
    ;
  return n;
}
function XC(e, t, r, n) {
  for (var i = t.split(","), a = e, o, s = 0; s < i.length - 1; s++)
    o = i[s], a[o] == null && (a[o] = {}), a = a[o];
  a[i[s]] == null && (a[i[s]] = r);
}
function Bv(e) {
  e && C(qC, function(t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var qC = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], ZC = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Bu = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function sa(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < Bu.length; r++) {
      var n = Bu[r][1], i = Bu[r][0];
      t[n] != null && (t[i] = t[n]);
    }
}
function zv(e) {
  e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function Fv(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function KC(e) {
  e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function e_(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++)
      t(e[r]), e[r] && e_(e[r].children, t);
}
function r_(e, t) {
  UC(e, t), e.series = kt(e.series), C(e.series, function(r) {
    if (V(r)) {
      var n = r.type;
      if (n === "line")
        r.clipOverflow != null && (r.clip = r.clipOverflow);
      else if (n === "pie" || n === "gauge") {
        r.clockWise != null && (r.clockwise = r.clockWise), zv(r.label);
        var i = r.data;
        if (i && !re(i))
          for (var a = 0; a < i.length; a++)
            zv(i[a]);
        r.hoverOffset != null && (r.emphasis = r.emphasis || {}, (r.emphasis.scaleSize = null) && (r.emphasis.scaleSize = r.hoverOffset));
      } else if (n === "gauge") {
        var o = YC(r, "pointer.color");
        o != null && XC(r, "itemStyle.color", o);
      } else if (n === "bar") {
        sa(r), sa(r.backgroundStyle), sa(r.emphasis);
        var i = r.data;
        if (i && !re(i))
          for (var a = 0; a < i.length; a++)
            typeof i[a] == "object" && (sa(i[a]), sa(i[a] && i[a].emphasis));
      } else if (n === "sunburst") {
        var s = r.highlightPolicy;
        s && (r.emphasis = r.emphasis || {}, r.emphasis.focus || (r.emphasis.focus = s)), Fv(r), e_(r.data, Fv);
      } else n === "graph" || n === "sankey" ? KC(r) : n === "map" && (r.mapType && !r.map && (r.map = r.mapType), r.mapLocation && ht(r, r.mapLocation));
      r.hoverAnimation != null && (r.emphasis = r.emphasis || {}, r.emphasis && r.emphasis.scale == null && (r.emphasis.scale = r.hoverAnimation)), Bv(r);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), C(ZC, function(r) {
    var n = e[r];
    n && (z(n) || (n = [n]), C(n, function(i) {
      Bv(i);
    }));
  });
}
function jC(e) {
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
  }), t.each(QC);
}
function QC(e) {
  C(e, function(t, r) {
    var n = [], i = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, h, c) {
      var f = o.get(t.stackedDimension, c);
      if (isNaN(f))
        return i;
      var d, v;
      s ? v = o.getRawIndex(c) : d = o.get(t.stackedByDimension, c);
      for (var g = NaN, p = r - 1; p >= 0; p--) {
        var y = e[p];
        if (s || (v = y.data.rawIndexOf(y.stackedByDimension, d)), v >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, v);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && f >= 0 && m > 0 || l === "samesign" && f <= 0 && m < 0) {
            f = bS(f, m), g = m;
            break;
          }
        }
      }
      return n[0] = f, n[1] = g, n;
    });
  });
}
var Ol = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.data = t.data || (t.sourceFormat === xr ? {} : []), this.sourceFormat = t.sourceFormat || Km, this.seriesLayoutBy = t.seriesLayoutBy || fr, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var r = this.dimensionsDefine = t.dimensionsDefine;
      if (r)
        for (var n = 0; n < r.length; n++) {
          var i = r[n];
          i.type == null && Jm(this, n) === ae.Must && (i.type = "ordinal");
        }
    }
    return e;
  }()
);
function _f(e) {
  return e instanceof Ol;
}
function Zh(e, t, r) {
  r = r || i_(e);
  var n = t.seriesLayoutBy, i = tM(e, r, n, t.sourceHeader, t.dimensions), a = new Ol({
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
function n_(e) {
  return new Ol({
    data: e,
    sourceFormat: re(e) ? Hr : Te
  });
}
function JC(e) {
  return new Ol({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: q(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function i_(e) {
  var t = Km;
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
          t = nr;
          break;
        }
      }
    }
  } else if (V(e)) {
    for (var a in e)
      if (En(e, a) && ee(e[a])) {
        t = xr;
        break;
      }
  }
  return t;
}
function tM(e, t, r, n, i) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: Hv(i),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === ne) {
    var s = e;
    n === "auto" || n == null ? Vv(function(u) {
      u != null && u !== "-" && (H(u) ? o == null && (o = 1) : o = 0);
    }, r, s, 10) : o = bt(n) ? n : n ? 1 : 0, !i && o === 1 && (i = [], Vv(function(u, h) {
      i[h] = u != null ? u + "" : "";
    }, r, s, 1 / 0)), a = i ? i.length : r === Wi ? s.length : s[0] ? s[0].length : null;
  } else if (t === nr)
    i || (i = eM(e));
  else if (t === xr)
    i || (i = [], C(e, function(u, h) {
      i.push(h);
    }));
  else if (t === Te) {
    var l = po(e[0]);
    a = z(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: Hv(i),
    dimensionsDetectedCount: a
  };
}
function eM(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); )
    ;
  if (r)
    return _t(r);
}
function Hv(e) {
  if (e) {
    var t = Q();
    return Y(e, function(r, n) {
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
function Vv(e, t, r, n) {
  if (t === Wi)
    for (var i = 0; i < r.length && i < n; i++)
      e(r[i] ? r[i][0] : null, i);
  else
    for (var a = r[0] || [], i = 0; i < a.length && i < n; i++)
      e(a[i], i);
}
function a_(e) {
  var t = e.sourceFormat;
  return t === nr || t === xr;
}
var yn, mn, _n, Gv, Wv, o_ = (
  /** @class */
  function() {
    function e(t, r) {
      var n = _f(t) ? t : n_(t);
      this._source = n;
      var i = this._data = n.data;
      n.sourceFormat === Hr && (this._offset = 0, this._dimSize = r, this._data = i), Wv(this, i, n);
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
      Wv = function(o, s, l) {
        var u = l.sourceFormat, h = l.seriesLayoutBy, c = l.startIndex, f = l.dimensionsDefine, d = Gv[bf(u, h)];
        if (N(o, d), u === Hr)
          o.getItem = r, o.count = i, o.fillStorage = n;
        else {
          var v = s_(u, h);
          o.getItem = J(v, null, s, c, f);
          var g = l_(u, h);
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
          for (var d = u[f], v = d[0] == null ? 1 / 0 : d[0], g = d[1] == null ? -1 / 0 : d[1], p = s - o, y = l[f], m = 0; m < p; m++) {
            var _ = h[m * c + f];
            y[o + m] = _, _ < v && (v = _), _ > g && (g = _);
          }
          d[0] = v, d[1] = g;
        }
      }, i = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Gv = (t = {}, t[ne + "_" + fr] = {
        pure: !0,
        appendData: a
      }, t[ne + "_" + Wi] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[nr] = {
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
), Uv = function(e, t, r, n) {
  return e[n];
}, rM = (yn = {}, yn[ne + "_" + fr] = function(e, t, r, n) {
  return e[n + t];
}, yn[ne + "_" + Wi] = function(e, t, r, n, i) {
  n += t;
  for (var a = i || [], o = e, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[n] : null;
  }
  return a;
}, yn[nr] = Uv, yn[xr] = function(e, t, r, n, i) {
  for (var a = i || [], o = 0; o < r.length; o++) {
    var s = r[o].name, l = e[s];
    a[o] = l ? l[n] : null;
  }
  return a;
}, yn[Te] = Uv, yn);
function s_(e, t) {
  var r = rM[bf(e, t)];
  return r;
}
var Yv = function(e, t, r) {
  return e.length;
}, nM = (mn = {}, mn[ne + "_" + fr] = function(e, t, r) {
  return Math.max(0, e.length - t);
}, mn[ne + "_" + Wi] = function(e, t, r) {
  var n = e[0];
  return n ? Math.max(0, n.length - t) : 0;
}, mn[nr] = Yv, mn[xr] = function(e, t, r) {
  var n = r[0].name, i = e[n];
  return i ? i.length : 0;
}, mn[Te] = Yv, mn);
function l_(e, t) {
  var r = nM[bf(e, t)];
  return r;
}
var zu = function(e, t, r) {
  return e[t];
}, iM = (_n = {}, _n[ne] = zu, _n[nr] = function(e, t, r) {
  return e[r];
}, _n[xr] = zu, _n[Te] = function(e, t, r) {
  var n = po(e);
  return n instanceof Array ? n[t] : n;
}, _n[Hr] = zu, _n);
function u_(e) {
  var t = iM[e];
  return t;
}
function bf(e, t) {
  return e === ne ? e + "_" + t : e;
}
function Ei(e, t, r) {
  if (e) {
    var n = e.getRawDataItem(t);
    if (n != null) {
      var i = e.getStore(), a = i.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r), s = i.getDimensionProperty(o);
        return u_(a)(n, o, s);
      } else {
        var l = n;
        return a === Te && (l = po(n)), l;
      }
    }
  }
}
var aM = /\{@(.+?)\}/g, oM = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getDataParams = function(t, r) {
      var n = this.getData(r), i = this.getRawValue(t, r), a = n.getRawIndex(t), o = n.getName(t), s = n.getRawDataItem(t), l = n.getItemVisual(t, "style"), u = l && l[n.getItemVisual(t, "drawType") || "fill"], h = l && l.stroke, c = this.mainType, f = c === "series", d = n.userOutput && n.userOutput.get();
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
        dimensionNames: d ? d.fullDimensions : null,
        encode: d ? d.encode : null,
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
        var h = Xm(a, l);
        return h.replace(aM, function(c, f) {
          var d = f.length, v = f;
          v.charAt(0) === "[" && v.charAt(d - 1) === "]" && (v = +v.slice(1, d - 1));
          var g = Ei(s, t, v);
          if (o && z(o.interpolatedValue)) {
            var p = s.getDimensionIndex(v);
            p >= 0 && (g = o.interpolatedValue[p]);
          }
          return g != null ? g + "" : "";
        });
      }
    }, e.prototype.getRawValue = function(t, r) {
      return Ei(this.getData(r), t);
    }, e.prototype.formatTooltip = function(t, r, n) {
    }, e;
  }()
);
function Xv(e) {
  var t, r;
  return V(e) ? e.type && (r = e) : t = e, {
    text: t,
    // markers: markers || markersExisting,
    frag: r
  };
}
function Na(e) {
  return new sM(e);
}
var sM = (
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
        var d = this._dueIndex, v = Math.min(f != null ? this._dueIndex + f : 1 / 0, this._dueEnd);
        if (!n && (c || d < v)) {
          var g = this._progress;
          if (z(g))
            for (var p = 0; p < g.length; p++)
              this._doProgress(g[p], d, v, l, u);
          else
            this._doProgress(g, d, v, l, u);
        }
        this._dueIndex = v;
        var y = this._settedOutputEnd != null ? this._settedOutputEnd : v;
        this._outputDueEnd = y;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function(t, r, n, i, a) {
      qv.reset(r, n, i, a), this._callingProgress = t, this._callingProgress({
        start: r,
        end: n,
        count: n - r,
        next: qv.next
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
), qv = /* @__PURE__ */ function() {
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
function xs(e, t) {
  var r = t && t.type;
  return r === "ordinal" ? e : (r === "time" && !bt(e) && e != null && e !== "-" && (e = +vr(e)), e == null || e === "" ? NaN : Number(e));
}
Q({
  number: function(e) {
    return parseFloat(e);
  },
  time: function(e) {
    return +vr(e);
  },
  trim: function(e) {
    return H(e) ? Ye(e) : e;
  }
});
var lM = (
  /** @class */
  function() {
    function e(t, r) {
      var n = t === "desc";
      this._resultLT = n ? 1 : -1, r == null && (r = n ? "min" : "max"), this._incomparable = r === "min" ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function(t, r) {
      var n = bt(t) ? t : Gs(t), i = bt(r) ? r : Gs(r), a = isNaN(n), o = isNaN(i);
      if (a && (n = this._incomparable), o && (i = this._incomparable), a && o) {
        var s = H(t), l = H(r);
        s && (n = l ? t : 0), l && (i = s ? r : 0);
      }
      return n < i ? this._resultLT : n > i ? -this._resultLT : 0;
    }, e;
  }()
), uM = (
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
      return xs(t, r);
    }, e;
  }()
);
function hM(e, t) {
  var r = new uM(), n = e.data, i = r.sourceFormat = e.sourceFormat, a = e.startIndex, o = "";
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
        En(l, y) && Jt(_), l[y] = m;
      }
    });
  else
    for (var h = 0; h < e.dimensionsDetectedCount; h++)
      s.push({
        index: h
      });
  var c = s_(i, fr);
  t.__isBuiltIn && (r.getRawDataItem = function(g) {
    return c(n, a, s, g);
  }, r.getRawData = J(cM, null, e)), r.cloneRawData = J(fM, null, e);
  var f = l_(i, fr);
  r.count = J(f, null, n, a, s);
  var d = u_(i);
  r.retrieveValue = function(g, p) {
    var y = c(n, a, s, g);
    return v(y, p);
  };
  var v = r.retrieveValueFromItem = function(g, p) {
    if (g != null) {
      var y = s[p];
      if (y)
        return d(g, p, y.name);
    }
  };
  return r.getDimensionInfo = J(dM, null, s, l), r.cloneAllDimensionInfo = J(vM, null, s), r;
}
function cM(e) {
  var t = e.sourceFormat;
  if (!wf(t)) {
    var r = "";
    Jt(r);
  }
  return e.data;
}
function fM(e) {
  var t = e.sourceFormat, r = e.data;
  if (!wf(t)) {
    var n = "";
    Jt(n);
  }
  if (t === ne) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(r[a].slice());
    return i;
  } else if (t === nr) {
    for (var i = [], a = 0, o = r.length; a < o; a++)
      i.push(N({}, r[a]));
    return i;
  }
}
function dM(e, t, r) {
  if (r != null) {
    if (bt(r) || !isNaN(r) && !En(t, r))
      return e[r];
    if (En(t, r))
      return t[r];
  }
}
function vM(e) {
  return q(e);
}
var h_ = Q();
function pM(e) {
  e = q(e);
  var t = e.type, r = "";
  t || Jt(r);
  var n = t.split(":");
  n.length !== 2 && Jt(r);
  var i = !1;
  n[0] === "echarts" && (t = n[1], i = !0), e.__isBuiltIn = i, h_.set(t, e);
}
function gM(e, t, r) {
  var n = kt(e), i = n.length, a = "";
  i || Jt(a);
  for (var o = 0, s = i; o < s; o++) {
    var l = n[o];
    t = yM(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function yM(e, t, r, n) {
  var i = "";
  t.length || Jt(i), V(e) || Jt(i);
  var a = e.type, o = h_.get(a);
  o || Jt(i);
  var s = Y(t, function(u) {
    return hM(u, o);
  }), l = kt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: q(e.config)
  }));
  return Y(l, function(u, h) {
    var c = "";
    V(u) || Jt(c), u.data || Jt(c);
    var f = i_(u.data);
    wf(f) || Jt(c);
    var d, v = t[0];
    if (v && h === 0 && !u.dimensions) {
      var g = v.startIndex;
      g && (u.data = v.data.slice(0, g).concat(u.data)), d = {
        seriesLayoutBy: fr,
        sourceHeader: g,
        dimensions: v.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: fr,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Zh(u.data, d, null);
  });
}
function wf(e) {
  return e === ne || e === nr;
}
var El = "undefined", mM = typeof Uint32Array === El ? Array : Uint32Array, _M = typeof Uint16Array === El ? Array : Uint16Array, c_ = typeof Int32Array === El ? Array : Int32Array, Zv = typeof Float64Array === El ? Array : Float64Array, f_ = {
  float: Zv,
  int: c_,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Zv
}, Fu;
function ri(e) {
  return e > 65535 ? mM : _M;
}
function ni() {
  return [1 / 0, -1 / 0];
}
function bM(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function Kv(e, t, r, n, i) {
  var a = f_[r || "float"];
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
var Kh = (
  /** @class */
  function() {
    function e() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Q();
    }
    return e.prototype.initData = function(t, r, n) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var i = t.getSource(), a = this.defaultDimValueGetter = Fu[i.sourceFormat];
      this._dimValueGetter = n || a, this._rawExtent = [], a_(i), this._dimensions = Y(r, function(o) {
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
      }, n.set(t, a), this._chunks[a] = new f_[r || "float"](this._rawCount), this._rawExtent[a] = ni(), a;
    }, e.prototype.collectOrdinalMeta = function(t, r) {
      var n = this._chunks[t], i = this._dimensions[t], a = this._rawExtent, o = i.ordinalOffset || 0, s = n.length;
      o === 0 && (a[t] = ni());
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
        Kv(n, u, h.type, l, !0);
      }
      for (var c = [], f = s; f < l; f++)
        for (var d = f - s, v = 0; v < a; v++) {
          var h = i[v], g = Fu.arrayRows.call(this, t[d] || c, h.property, d, v);
          n[v][f] = g;
          var p = o[v];
          g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, e.prototype._initDataFromProvider = function(t, r, n) {
      for (var i = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = Y(o, function(m) {
        return m.property;
      }), h = 0; h < s; h++) {
        var c = o[h];
        l[h] || (l[h] = ni()), Kv(a, h, c.type, r, n);
      }
      if (i.fillStorage)
        i.fillStorage(t, r, a, l);
      else
        for (var f = [], d = t; d < r; d++) {
          f = i.getItem(d, f);
          for (var v = 0; v < s; v++) {
            var g = a[v], p = this._dimValueGetter(f, u[v], d, v);
            g[d] = p;
            var y = l[v];
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
        var f = this.getRawIndex(h), d = r - a[f], v = Math.abs(d);
        v <= n && ((v < s || v === s && d >= 0 && l < 0) && (s = v, l = d, u = 0), d === l && (o[u++] = h));
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
        var n = ri(this._rawCount);
        t = new n(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, e.prototype.filter = function(t, r) {
      if (!this._count)
        return this;
      for (var n = this.clone(), i = n.count(), a = ri(n._rawCount), o = new a(i), s = [], l = t.length, u = 0, h = t[0], c = n._chunks, f = 0; f < i; f++) {
        var d = void 0, v = n.getRawIndex(f);
        if (l === 0)
          d = r(f);
        else if (l === 1) {
          var g = c[h][v];
          d = r(g, f);
        } else {
          for (var p = 0; p < l; p++)
            s[p] = c[t[p]][v];
          s[p] = f, d = r.apply(null, s);
        }
        d && (o[u++] = v);
      }
      return u < i && (n._indices = o), n._count = u, n._extent = [], n._updateGetRawIdx(), n;
    }, e.prototype.selectRange = function(t) {
      var r = this.clone(), n = r._count;
      if (!n)
        return this;
      var i = _t(t), a = i.length;
      if (!a)
        return this;
      var o = r.count(), s = ri(r._rawCount), l = new s(o), u = 0, h = i[0], c = t[h][0], f = t[h][1], d = r._chunks, v = !1;
      if (!r._indices) {
        var g = 0;
        if (a === 1) {
          for (var p = d[i[0]], y = 0; y < n; y++) {
            var m = p[y];
            (m >= c && m <= f || isNaN(m)) && (l[u++] = g), g++;
          }
          v = !0;
        } else if (a === 2) {
          for (var p = d[i[0]], _ = d[i[1]], b = t[i[1]][0], S = t[i[1]][1], y = 0; y < n; y++) {
            var m = p[y], w = _[y];
            (m >= c && m <= f || isNaN(m)) && (w >= b && w <= S || isNaN(w)) && (l[u++] = g), g++;
          }
          v = !0;
        }
      }
      if (!v)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = r.getRawIndex(y), m = d[i[0]][x];
            (m >= c && m <= f || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var M = !0, x = r.getRawIndex(y), D = 0; D < a; D++) {
              var A = i[D], m = d[A][x];
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
        u[r[h]] = ni();
      for (var c = 0; c < s; c++) {
        for (var f = t.getRawIndex(c), d = 0; d < o; d++)
          l[d] = i[r[d]][f];
        l[o] = c;
        var v = n && n.apply(null, l);
        if (v != null) {
          typeof v != "object" && (a[0] = v, v = a);
          for (var h = 0; h < v.length; h++) {
            var g = r[h], p = v[h], y = u[g], m = i[g];
            m && (m[f] = p), p < y[0] && (y[0] = p), p > y[1] && (y[1] = p);
          }
        }
      }
    }, e.prototype.lttbDownSample = function(t, r) {
      var n = this.clone([t], !0), i = n._chunks, a = i[t], o = this.count(), s = 0, l = Math.floor(1 / r), u = this.getRawIndex(0), h, c, f, d = new (ri(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      d[s++] = u;
      for (var v = 1; v < o - 1; v += l) {
        for (var g = Math.min(v + l, o - 1), p = Math.min(v + l * 2, o), y = (p + g) / 2, m = 0, _ = g; _ < p; _++) {
          var b = this.getRawIndex(_), S = a[b];
          isNaN(S) || (m += S);
        }
        m /= p - g;
        var w = v, x = Math.min(v + l, o), M = v - 1, D = a[u];
        h = -1, f = w;
        for (var A = -1, T = 0, _ = w; _ < x; _++) {
          var b = this.getRawIndex(_), S = a[b];
          if (isNaN(S)) {
            T++, A < 0 && (A = b);
            continue;
          }
          c = Math.abs((M - y) * (S - D) - (M - _) * (m - D)), c > h && (h = c, f = b);
        }
        T > 0 && T < x - w && (d[s++] = Math.min(A, f), f = Math.max(A, f)), d[s++] = f, u = f;
      }
      return d[s++] = this.getRawIndex(o - 1), n._count = s, n._indices = d, n.getRawIndex = this._getRawIdx, n;
    }, e.prototype.minmaxDownSample = function(t, r) {
      for (var n = this.clone([t], !0), i = n._chunks, a = Math.floor(1 / r), o = i[t], s = this.count(), l = new (ri(this._rawCount))(Math.ceil(s / a) * 2), u = 0, h = 0; h < s; h += a) {
        var c = h, f = o[this.getRawIndex(c)], d = h, v = o[this.getRawIndex(d)], g = a;
        h + a > s && (g = s - h);
        for (var p = 0; p < g; p++) {
          var y = this.getRawIndex(h + p), m = o[y];
          m < f && (f = m, c = h + p), m > v && (v = m, d = h + p);
        }
        var _ = this.getRawIndex(c), b = this.getRawIndex(d);
        c < d ? (l[u++] = _, l[u++] = b) : (l[u++] = b, l[u++] = _);
      }
      return n._count = u, n._indices = l, n._updateGetRawIdx(), n;
    }, e.prototype.downSample = function(t, r, n, i) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / r), u = o[t], h = this.count(), c = a._rawExtent[t] = ni(), f = new (ri(this._rawCount))(Math.ceil(h / l)), d = 0, v = 0; v < h; v += l) {
        l > h - v && (l = h - v, s.length = l);
        for (var g = 0; g < l; g++) {
          var p = this.getRawIndex(v + g);
          s[g] = u[p];
        }
        var y = n(s), m = this.getRawIndex(Math.min(v + i(s, y) || 0, h - 1));
        u[m] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), f[d++] = m;
      }
      return a._count = d, a._indices = f, a._updateGetRawIdx(), a;
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
      var r = this._chunks[t], n = ni();
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
      var n = new e(), i = this._chunks, a = t && Hi(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < i.length; o++)
          n._chunks[o] = a[o] ? bM(i[o]) : i[o];
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
        return xs(r[a], this._dimensions[a]);
      }
      Fu = {
        arrayRows: t,
        objectRows: function(r, n, i, a) {
          return xs(r[n], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(r, n, i, a) {
          var o = r && (r.value == null ? r : r.value);
          return xs(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(r, n, i, a) {
          return r[a];
        }
      };
    }(), e;
  }()
), wM = (
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
      if (Go(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (n) {
          var h = r[0];
          h.prepareSource(), u = h.getSource(), s = u.data, l = u.sourceFormat, a = [h._getVersionSign()];
        } else
          s = o.get("data", !0), l = re(s) ? Hr : Te, a = [];
        var c = this._getSourceMetaRawOption() || {}, f = u && u.metaRawOption || {}, d = tt(c.seriesLayoutBy, f.seriesLayoutBy) || null, v = tt(c.sourceHeader, f.sourceHeader), g = tt(c.dimensions, f.dimensions), p = d !== f.seriesLayoutBy || !!v != !!f.sourceHeader || g;
        i = p ? [Zh(s, {
          seriesLayoutBy: d,
          sourceHeader: v,
          dimensions: g
        }, l)] : [];
      } else {
        var y = t;
        if (n) {
          var m = this._applyTransform(r);
          i = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          i = [Zh(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(i, a);
    }, e.prototype._applyTransform = function(t) {
      var r = this._sourceHost, n = r.get("transform", !0), i = r.get("fromTransformResult", !0);
      if (i != null) {
        var a = "";
        t.length !== 1 && jv(a);
      }
      var o, s = [], l = [];
      return C(t, function(u) {
        u.prepareSource();
        var h = u.getSource(i || 0), c = "";
        i != null && !h && jv(c), s.push(h), l.push(u._getVersionSign());
      }), n ? o = gM(n, s, {
        datasetIndex: r.componentIndex
      }) : i != null && (o = [JC(s[0])]), {
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
        Go(this._sourceHost) && l ? s = l._innerGetDataStore(t, r, n) : (s = new Kh(), s.initData(new o_(r, t.length), t)), o[n] = s;
      }
      return s;
    }, e.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Go(t)) {
        var r = Qm(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return Y(DC(t), function(n) {
          return n.getSourceManager();
        });
    }, e.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, r, n, i;
      if (Go(t))
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
function Go(e) {
  return e.mainType === "series";
}
function jv(e) {
  throw new Error(e);
}
var SM = "line-height:1";
function d_(e) {
  var t = e.lineHeight;
  return t == null ? SM : "line-height:" + jt(t + "") + "px";
}
function v_(e, t) {
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
var xM = [0, 10, 20, 30], TM = ["", `
`, `

`, `


`];
function no(e, t) {
  return t.type = e, t;
}
function jh(e) {
  return e.type === "section";
}
function p_(e) {
  return jh(e) ? CM : MM;
}
function g_(e) {
  if (jh(e)) {
    var t = 0, r = e.blocks.length, n = r > 1 || r > 0 && !e.noHeader;
    return C(e.blocks, function(i) {
      var a = g_(i);
      a >= t && (t = a + +(n && // 0 always can not be readable gap level.
      (!a || jh(i) && !i.noHeader)));
    }), t;
  }
  return 0;
}
function CM(e, t, r, n) {
  var i = t.noHeader, a = DM(g_(t)), o = [], s = t.blocks || [];
  Ze(!s || z(s)), s = s || [];
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (En(u, l)) {
      var h = new lM(u[l], null);
      s.sort(function(g, p) {
        return h.evaluate(g.sortParam, p.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  C(s, function(g, p) {
    var y = t.valueFormatter, m = p_(g)(
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
  var c = e.renderMode === "richText" ? o.join(a.richText) : Qh(n, o.join(""), i ? r : a.html);
  if (i)
    return c;
  var f = qh(t.header, "ordinal", e.useUTC), d = v_(n, e.renderMode).nameStyle, v = d_(n);
  return e.renderMode === "richText" ? y_(e, f, d) + a.richText + c : Qh(n, '<div style="' + d + ";" + v + ';">' + jt(f) + "</div>" + c, r);
}
function MM(e, t, r, n) {
  var i = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = e.useUTC, h = t.valueFormatter || e.valueFormatter || function(b) {
    return b = z(b) ? b : [b], Y(b, function(S, w) {
      return qh(S, z(d) ? d[w] : d, u);
    });
  };
  if (!(a && o)) {
    var c = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", i), f = a ? "" : qh(l, "ordinal", u), d = t.valueType, v = o ? [] : h(t.value, t.dataIndex), g = !s || !a, p = !s && a, y = v_(n, i), m = y.nameStyle, _ = y.valueStyle;
    return i === "richText" ? (s ? "" : c) + (a ? "" : y_(e, f, m)) + (o ? "" : $M(e, v, g, p, _)) : Qh(n, (s ? "" : c) + (a ? "" : AM(f, !s, m)) + (o ? "" : IM(v, g, p, _)), r);
  }
}
function Qv(e, t, r, n, i, a) {
  if (e) {
    var o = p_(e), s = {
      useUTC: i,
      renderMode: r,
      orderMode: n,
      markupStyleCreator: t,
      valueFormatter: e.valueFormatter
    };
    return o(s, e, 0, a);
  }
}
function DM(e) {
  return {
    html: xM[e],
    richText: TM[e]
  };
}
function Qh(e, t, r) {
  var n = '<div style="clear:both"></div>', i = "margin: " + r + "px 0 0", a = d_(e);
  return '<div style="' + i + ";" + a + ';">' + t + n + "</div>";
}
function AM(e, t, r) {
  var n = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + n + '">' + jt(e) + "</span>";
}
function IM(e, t, r, n) {
  var i = r ? "10px" : "20px", a = t ? "float:right;margin-left:" + i : "";
  return e = z(e) ? e : [e], '<span style="' + a + ";" + n + '">' + Y(e, function(o) {
    return jt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function y_(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function $M(e, t, r, n, i) {
  var a = [i], o = n ? 10 : 20;
  return r && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(z(t) ? t.join("  ") : t, a);
}
function LM(e, t) {
  var r = e.getData().getItemVisual(t, "style"), n = r[e.visualDrawType];
  return Bn(n);
}
function m_(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var Hu = (
  /** @class */
  function() {
    function e() {
      this.richTextStyles = {}, this._nextStyleNameId = Ky();
    }
    return e.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, e.prototype.makeTooltipMarker = function(t, r, n) {
      var i = n === "richText" ? this._generateStyleName() : null, a = mC({
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
function PM(e) {
  var t = e.series, r = e.dataIndex, n = e.multipleSeries, i = t.getData(), a = i.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(r), l = z(s), u = LM(t, r), h, c, f, d;
  if (o > 1 || l && !o) {
    var v = RM(s, t, r, a, u);
    h = v.inlineValues, c = v.inlineValueTypes, f = v.blocks, d = v.inlineValues[0];
  } else if (o) {
    var g = i.getDimensionInfo(a[0]);
    d = h = Ei(i, r, a[0]), c = g.type;
  } else
    d = h = l ? s[0] : s;
  var p = qc(t), y = p && t.name || "", m = i.getName(r), _ = n ? y : m;
  return no("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: n || !p,
    sortParam: d,
    blocks: [no("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Ye(_),
      value: h,
      valueType: c,
      dataIndex: r
    })].concat(f || [])
  });
}
function RM(e, t, r, n, i) {
  var a = t.getData(), o = Hi(e, function(c, f, d) {
    var v = a.getDimensionInfo(d);
    return c = c || v && v.tooltip !== !1 && v.displayName != null;
  }, !1), s = [], l = [], u = [];
  n.length ? C(n, function(c) {
    h(Ei(a, r, c), c);
  }) : C(e, h);
  function h(c, f) {
    var d = a.getDimensionInfo(f);
    !d || d.otherDims.tooltip === !1 || (o ? u.push(no("nameValue", {
      markerType: "subItem",
      markerColor: i,
      name: d.displayName,
      value: c,
      valueType: d.type
    })) : (s.push(c), l.push(d.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Ar = Lt();
function Wo(e, t) {
  return e.getName(t) || e.getId(t);
}
var OM = "__universalTransitionEnabled", Ee = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r._selectedDataIndicesMap = {}, r;
    }
    return t.prototype.init = function(r, n, i) {
      this.seriesIndex = this.componentIndex, this.dataTask = Na({
        count: kM,
        reset: NM
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(r, i);
      var a = Ar(this).sourceManager = new wM(this);
      a.prepareSource();
      var o = this.getInitialData(r, i);
      tp(o, this), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Jv(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(r, n) {
      var i = eo(this), a = i ? Pl(r) : {}, o = this.subType;
      ct.hasClass(o) && (o += "Series"), ot(r, n.getTheme().get(this.subType)), ot(r, this.getDefaultOption()), Nd(r, "label", ["show"]), this.fillDataTextStyle(r.data), i && Oi(r, a, i);
    }, t.prototype.mergeOption = function(r, n) {
      r = ot(this.option, r, !0), this.fillDataTextStyle(r.data);
      var i = eo(this);
      i && Oi(this.option, r, i);
      var a = Ar(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(r, n);
      tp(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Ar(this).dataBeforeProcessed = o, Jv(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(r) {
      if (r && !re(r))
        for (var n = ["show"], i = 0; i < r.length; i++)
          r[i] && r[i].label && Nd(r[i], "label", n);
    }, t.prototype.getInitialData = function(r, n) {
    }, t.prototype.appendData = function(r) {
      var n = this.getRawData();
      n.appendData(r.data);
    }, t.prototype.getData = function(r) {
      var n = Jh(this);
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
      var n = Jh(this);
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
      return PM({
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
      var a = this.ecModel, o = yf.prototype.getColorFromPalette.call(this, r, n, i);
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
          var l = r[s], u = Wo(o, l);
          i[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(r, n) {
      for (var i = [], a = 0; a < r.length; a++)
        i[0] = r[a], this.isSelected(r[a], n) ? this.unselect(i, n) : this.select(i, n);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var r = this._selectedDataIndicesMap, n = _t(r), i = [], a = 0; a < n.length; a++) {
        var o = r[n[a]];
        o >= 0 && i.push(o);
      }
      return i;
    }, t.prototype.isSelected = function(r, n) {
      var i = this.option.selectedMap;
      if (!i)
        return !1;
      var a = this.getData(n);
      return (i === "all" || i[Wo(a, r)]) && !a.getItemModel(r).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[OM])
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
            var c = n[h], f = Wo(r, c);
            u[f] = !0, this._selectedDataIndicesMap[f] = r.getRawIndex(c);
          }
        } else if (s === "single" || s === !0) {
          var d = n[l - 1], f = Wo(r, d);
          o.selectedMap = (i = {}, i[f] = !0, i), this._selectedDataIndicesMap = (a = {}, a[f] = r.getRawIndex(d), a);
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
tr(Ee, oM);
tr(Ee, yf);
rm(Ee, ct);
function Jv(e) {
  var t = e.name;
  qc(e) || (e.name = EM(e) || t);
}
function EM(e) {
  var t = e.getRawData(), r = t.mapDimensionsAll("seriesName"), n = [];
  return C(r, function(i) {
    var a = t.getDimensionInfo(i);
    a.displayName && n.push(a.displayName);
  }), n.join(" ");
}
function kM(e) {
  return e.model.getRawData().count();
}
function NM(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), BM;
}
function BM(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function tp(e, t) {
  C(Qw(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(r) {
    e.wrapMethod(r, It(zM, t));
  });
}
function zM(e, t) {
  var r = Jh(e);
  return r && r.setOutputEnd((t || this).count()), t;
}
function Jh(e) {
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
var ke = (
  /** @class */
  function() {
    function e() {
      this.group = new Dt(), this.uid = Cl("viewComponent");
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
Kc(ke);
dl(ke);
function Sf() {
  var e = Lt();
  return function(t) {
    var r = e(t), n = t.pipelineContext, i = !!r.large, a = !!r.progressiveRender, o = r.large = !!(n && n.large), s = r.progressiveRender = !!(n && n.progressiveRender);
    return (i !== o || a !== s) && "reset";
  };
}
var __ = Lt(), FM = Sf(), Se = (
  /** @class */
  function() {
    function e() {
      this.group = new Dt(), this.uid = Cl("viewChart"), this.renderTask = Na({
        plan: HM,
        reset: VM
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function(t, r) {
    }, e.prototype.render = function(t, r, n, i) {
    }, e.prototype.highlight = function(t, r, n, i) {
      var a = t.getData(i && i.dataType);
      a && rp(a, i, "emphasis");
    }, e.prototype.downplay = function(t, r, n, i) {
      var a = t.getData(i && i.dataType);
      a && rp(a, i, "normal");
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
      mo(this.group, t);
    }, e.markUpdateMethod = function(t, r) {
      __(t).updateMethod = r;
    }, e.protoInitialize = function() {
      var t = e.prototype;
      t.type = "chart";
    }(), e;
  }()
);
function ep(e, t, r) {
  e && Gh(e) && (t === "emphasis" ? Us : Ys)(e, r);
}
function rp(e, t, r) {
  var n = kn(e, t), i = t && t.highlightKey != null ? iT(t.highlightKey) : null;
  n != null ? C(kt(n), function(a) {
    ep(e.getItemGraphicEl(a), r, i);
  }) : e.eachItemGraphicEl(function(a) {
    ep(a, r, i);
  });
}
Kc(Se);
dl(Se);
function HM(e) {
  return FM(e.model);
}
function VM(e) {
  var t = e.model, r = e.ecModel, n = e.api, i = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = i && __(i).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, r, n, i), GM[l];
}
var GM = {
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
}, Qs = "\0__throttleOriginMethod", np = "\0__throttleRate", ip = "\0__throttleType";
function xf(e, t, r) {
  var n, i = 0, a = 0, o = null, s, l, u, h;
  t = t || 0;
  function c() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(l, u || []);
  }
  var f = function() {
    for (var d = [], v = 0; v < arguments.length; v++)
      d[v] = arguments[v];
    n = (/* @__PURE__ */ new Date()).getTime(), l = this, u = d;
    var g = h || t, p = h || r;
    h = null, s = n - (p ? i : a) - g, clearTimeout(o), p ? o = setTimeout(c, g) : s >= 0 ? c() : o = setTimeout(c, -s), i = n;
  };
  return f.clear = function() {
    o && (clearTimeout(o), o = null);
  }, f.debounceNextCall = function(d) {
    h = d;
  }, f;
}
function b_(e, t, r, n) {
  var i = e[t];
  if (i) {
    var a = i[Qs] || i, o = i[ip], s = i[np];
    if (s !== r || o !== n) {
      if (r == null || !n)
        return e[t] = a;
      i = e[t] = xf(a, r, n === "debounce"), i[Qs] = a, i[ip] = n, i[np] = r;
    }
    return i;
  }
}
function tc(e, t) {
  var r = e[t];
  r && r[Qs] && (r.clear && r.clear(), e[t] = r[Qs]);
}
var ap = Lt(), op = {
  itemStyle: ja(Om, !0),
  lineStyle: ja(Rm, !0)
}, WM = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function w_(e, t) {
  var r = e.visualStyleMapper || op[t];
  return r || (console.warn("Unknown style type '" + t + "'."), op.itemStyle);
}
function S_(e, t) {
  var r = e.visualDrawType || WM[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var UM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData(), n = e.visualStyleAccessPath || "itemStyle", i = e.getModel(n), a = w_(e, n), o = a(i), s = i.getShallow("decal");
    s && (r.setVisual("decal", s), s.dirty = !0);
    var l = S_(e, n), u = o[l], h = Z(u) ? u : null, c = o.fill === "auto" || o.stroke === "auto";
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
        dataEach: function(d, v) {
          var g = e.getDataParams(v), p = N({}, o);
          p[l] = h(g), d.setItemVisual(v, "style", p);
        }
      };
  }
}, la = new Tt(), YM = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(e, t) {
    if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
      var r = e.getData(), n = e.visualStyleAccessPath || "itemStyle", i = w_(e, n), a = r.getVisual("drawType");
      return {
        dataEach: r.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[n]) {
            la.option = l[n];
            var u = i(la), h = o.ensureUniqueItemVisual(s, "style");
            N(h, u), la.option.decal && (o.setItemVisual(s, "decal", la.option.decal), la.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, XM = {
  performRawSeries: !0,
  overallReset: function(e) {
    var t = Q();
    e.eachSeries(function(r) {
      var n = r.getColorBy();
      if (!r.isColorBySeries()) {
        var i = r.type + "-" + n, a = t.get(i);
        a || (a = {}, t.set(i, a)), ap(r).scope = a;
      }
    }), e.eachSeries(function(r) {
      if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
        var n = r.getRawData(), i = {}, a = r.getData(), o = ap(r).scope, s = r.visualStyleAccessPath || "itemStyle", l = S_(r, s);
        a.each(function(u) {
          var h = a.getRawIndex(u);
          i[h] = u;
        }), n.each(function(u) {
          var h = i[u], c = a.getItemVisual(h, "colorFromPalette");
          if (c) {
            var f = a.ensureUniqueItemVisual(h, "style"), d = n.getName(u) || u + "", v = n.count();
            f[l] = r.getColorFromPalette(d, o, v);
          }
        });
      }
    });
  }
}, Uo = Math.PI;
function qM(e, t) {
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
  var r = new Dt(), n = new St({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  r.add(n);
  var i = new $t({
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
  return t.showSpinner && (o = new wl({
    shape: {
      startAngle: -Uo / 2,
      endAngle: -Uo / 2 + 0.1,
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
    endAngle: Uo * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Uo * 3 / 2
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
var x_ = (
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
        Ze(!(i.reset && i.overallReset), o), i.reset && this._createSeriesStageTask(i, a, r, n), i.overallReset && this._createOverallStageTask(i, a, r, n);
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
            var d, v = f.agentStubMap;
            v.each(function(p) {
              s(i, p) && (p.dirty(), d = !0);
            }), d && f.dirty(), o.updatePayload(f, n);
            var g = o.getPerformArgs(f, i.block);
            v.each(function(p) {
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
        var f = c.uid, d = s.set(f, o && o.get(f) || Na({
          plan: JM,
          reset: tD,
          count: rD
        }));
        d.context = {
          model: c,
          ecModel: n,
          api: i,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(c, d);
      }
    }, e.prototype._createOverallStageTask = function(t, r, n, i) {
      var a = this, o = r.overallTask = r.overallTask || Na({
        reset: ZM
      });
      o.context = {
        ecModel: n,
        api: i,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Q(), u = t.seriesType, h = t.getTargetSeries, c = !0, f = !1, d = "";
      Ze(!t.createOnAllSeries, d), u ? n.eachRawSeriesByType(u, v) : h ? h(n, i).each(v) : (c = !1, C(n.getSeries(), v));
      function v(g) {
        var p = g.uid, y = l.set(p, s && s.get(p) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (f = !0, Na({
          reset: KM,
          onDirty: QM
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
        seriesType: nD(t)
      }), t.uid = Cl("stageHandler"), r && (t.visualType = r), t;
    }, e;
  }()
);
function ZM(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function KM(e) {
  return e.overallProgress && jM;
}
function jM() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function QM() {
  this.agent && this.agent.dirty();
}
function JM(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function tD(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = kt(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? Y(t, function(r, n) {
    return T_(n);
  }) : eD;
}
var eD = T_(0);
function T_(e) {
  return function(t, r) {
    var n = r.data, i = r.resetDefines[e];
    if (i && i.dataEach)
      for (var a = t.start; a < t.end; a++)
        i.dataEach(n, a);
    else i && i.progress && i.progress(t, n);
  };
}
function rD(e) {
  return e.data.count();
}
function nD(e) {
  Js = null;
  try {
    e(io, C_);
  } catch {
  }
  return Js;
}
var io = {}, C_ = {}, Js;
M_(io, mf);
M_(C_, t_);
io.eachSeriesByType = io.eachRawSeriesByType = function(e) {
  Js = e;
};
io.eachComponent = function(e) {
  e.mainType === "series" && e.subType && (Js = e.subType);
};
function M_(e, t) {
  for (var r in t.prototype)
    e[r] = Xt;
}
var sp = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const iD = {
  color: sp,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], sp]
};
var zt = "#B9B8CE", lp = "#100C2A", Yo = function() {
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
}, up = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], D_ = {
  darkMode: !0,
  color: up,
  backgroundColor: lp,
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
      color: lp
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
  timeAxis: Yo(),
  logAxis: Yo(),
  valueAxis: Yo(),
  categoryAxis: Yo(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: up
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
D_.categoryAxis.splitLine.show = !1;
var aD = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.normalizeQuery = function(t) {
      var r = {}, n = {}, i = {};
      if (H(t)) {
        var a = Xe(t);
        r.mainType = a.main || null, r.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        C(t, function(l, u) {
          for (var h = !1, c = 0; c < o.length; c++) {
            var f = o[c], d = u.lastIndexOf(f);
            if (d > 0 && d === u.length - f.length) {
              var v = u.slice(0, d);
              v !== "data" && (r.mainType = v, r[f.toLowerCase()] = l, h = !0);
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
      function h(c, f, d, v) {
        return c[d] == null || f[v || d] === c[d];
      }
    }, e.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, e;
  }()
), ec = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], hp = ec.concat(["symbolKeepAspect"]), oD = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    var r = e.getData();
    if (e.legendIcon && r.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual)
      return;
    for (var n = {}, i = {}, a = !1, o = 0; o < ec.length; o++) {
      var s = ec[o], l = e.get(s);
      Z(l) ? (a = !0, i[s] = l) : n[s] = l;
    }
    if (n.symbol = n.symbol || e.defaultSymbol, r.setVisual(N({
      legendIcon: e.legendIcon || n.symbol,
      symbolKeepAspect: e.get("symbolKeepAspect")
    }, n)), t.isSeriesFiltered(e))
      return;
    var u = _t(i);
    function h(c, f) {
      for (var d = e.getRawValue(f), v = e.getDataParams(f), g = 0; g < u.length; g++) {
        var p = u[g];
        c.setItemVisual(f, p, i[p](d, v));
      }
    }
    return {
      dataEach: a ? h : null
    };
  }
}, sD = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(e, t) {
    if (!e.hasSymbolVisual || t.isSeriesFiltered(e))
      return;
    var r = e.getData();
    function n(i, a) {
      for (var o = i.getItemModel(a), s = 0; s < hp.length; s++) {
        var l = hp[s], u = o.getShallow(l, !0);
        u != null && i.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: r.hasItemOption ? n : null
    };
  }
};
function A_(e, t, r) {
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
function I_(e, t) {
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
function lD(e, t, r, n) {
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
function ii(e, t, r, n, i) {
  var a = e + t;
  r.isSilent(a) || n.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = i.selected, h = 0; h < u.length; h++)
      if (u[h].seriesIndex === s) {
        var c = o.getData(), f = kn(c, i.fromActionPayload);
        r.trigger(a, {
          type: a,
          seriesId: o.id,
          name: z(f) ? c.getName(f[0]) : c.getName(f),
          selected: H(l) ? l : N({}, l)
        });
      }
  });
}
function uD(e, t, r) {
  e.on("selectchanged", function(n) {
    var i = r.getModel();
    n.isFromClick ? (ii("map", "selectchanged", t, i, n), ii("pie", "selectchanged", t, i, n)) : n.fromAction === "select" ? (ii("map", "selected", t, i, n), ii("pie", "selected", t, i, n)) : n.fromAction === "unselect" && (ii("map", "unselected", t, i, n), ii("pie", "unselected", t, i, n));
  });
}
function mi(e, t, r) {
  for (var n; e && !(t(e) && (n = e, r)); )
    e = e.__hostTarget || e.parent;
  return n;
}
var hD = Math.round(Math.random() * 9), cD = typeof Object.defineProperty == "function", fD = function() {
  function e() {
    this._id = "__ec_inner_" + hD++;
  }
  return e.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, e.prototype.set = function(t, r) {
    var n = this._guard(t);
    return cD ? Object.defineProperty(n, this._id, {
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
}(), dD = dt.extend({
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
}), vD = dt.extend({
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
}), pD = dt.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(e, t) {
    var r = t.x, n = t.y, i = t.width / 5 * 3, a = Math.max(i, t.height), o = i / 2, s = o * o / (a - o), l = n - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), f = Math.cos(u), d = o * 0.6, v = o * 0.7;
    e.moveTo(r - h, l + s), e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u), e.bezierCurveTo(r + h - c * d, l + s + f * d, r, n - v, r, n), e.bezierCurveTo(r, n - v, r - h + c * d, l + s + f * d, r - h, l + s), e.closePath();
  }
}), gD = dt.extend({
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
}), yD = {
  line: Ur,
  rect: St,
  roundRect: St,
  square: St,
  circle: _l,
  diamond: vD,
  pin: pD,
  arrow: gD,
  triangle: dD
}, mD = {
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
}, rc = {};
C(yD, function(e, t) {
  rc[t] = new e();
});
var _D = dt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(e, t, r) {
    var n = Hs(e, t, r), i = this.shape;
    return i && i.symbolType === "pin" && t.position === "inside" && (n.y = r.y + r.height * 0.4), n;
  },
  buildPath: function(e, t, r) {
    var n = t.symbolType;
    if (n !== "none") {
      var i = rc[n];
      i || (n = "rect", i = rc[n]), mD[n](t.x, t.y, t.width, t.height, i.shape), i.buildPath(e, i.shape, r);
    }
  }
});
function bD(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    this.__isEmptyBrush ? (r.stroke = e, r.fill = t || "#fff", r.lineWidth = 2) : this.shape.symbolType === "line" ? r.stroke = e : r.fill = e, this.markRedraw();
  }
}
function gr(e, t, r, n, i, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return e.indexOf("image://") === 0 ? l = Dm(e.slice(8), new ut(t, r, n, i), o ? "center" : "cover") : e.indexOf("path://") === 0 ? l = uf(e.slice(7), {}, new ut(t, r, n, i), o ? "center" : "cover") : l = new _D({
    shape: {
      symbolType: e,
      x: t,
      y: r,
      width: n,
      height: i
    }
  }), l.__isEmptyBrush = s, l.setColor = bD, a && l.setColor(a), l;
}
function wD(e) {
  return z(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0];
}
function $_(e, t) {
  if (e != null)
    return z(e) || (e = [e, e]), [Yt(e[0], t[0]) || 0, Yt(tt(e[1], e[0]), t[1]) || 0];
}
function Dn(e) {
  return isFinite(e);
}
function SD(e, t, r) {
  var n = t.x == null ? 0 : t.x, i = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (n = n * r.width + r.x, i = i * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y), n = Dn(n) ? n : 0, i = Dn(i) ? i : 1, a = Dn(a) ? a : 0, o = Dn(o) ? o : 0;
  var s = e.createLinearGradient(n, a, i, o);
  return s;
}
function xD(e, t, r) {
  var n = r.width, i = r.height, a = Math.min(n, i), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * n + r.x, s = s * i + r.y, l = l * a), o = Dn(o) ? o : 0.5, s = Dn(s) ? s : 0.5, l = l >= 0 && Dn(l) ? l : 0.5;
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function nc(e, t, r) {
  for (var n = t.type === "radial" ? xD(e, t, r) : SD(e, t, r), i = t.colorStops, a = 0; a < i.length; a++)
    n.addColorStop(i[a].offset, i[a].color);
  return n;
}
function TD(e, t) {
  if (e === t || !e && !t)
    return !1;
  if (!e || !t || e.length !== t.length)
    return !0;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !0;
  return !1;
}
function Xo(e) {
  return parseInt(e, 10);
}
function qo(e, t, r) {
  var n = ["width", "height"][t], i = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (r[n] != null && r[n] !== "auto")
    return parseFloat(r[n]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[i] || Xo(s[n]) || Xo(e.style[n])) - (Xo(s[a]) || 0) - (Xo(s[o]) || 0) | 0;
}
function CD(e, t) {
  return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : bt(e) ? [e] : z(e) ? e : null;
}
function L_(e) {
  var t = e.style, r = t.lineDash && t.lineWidth > 0 && CD(t.lineDash, t.lineWidth), n = t.lineDashOffset;
  if (r) {
    var i = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    i && i !== 1 && (r = Y(r, function(a) {
      return a / i;
    }), n /= i);
  }
  return [r, n];
}
var MD = new Nn(!0);
function tl(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function cp(e) {
  return typeof e == "string" && e !== "none";
}
function el(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function fp(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = r;
  } else
    e.fill();
}
function dp(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = r;
  } else
    e.stroke();
}
function ic(e, t, r) {
  var n = nm(t.image, t.__image, r);
  if (vl(n)) {
    var i = e.createPattern(n, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && i && i.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * Jw), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), i.setTransform(a);
    }
    return i;
  }
}
function DD(e, t, r, n) {
  var i, a = tl(r), o = el(r), s = r.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var h = t.path || MD, c = t.__dirty;
  if (!n) {
    var f = r.fill, d = r.stroke, v = o && !!f.colorStops, g = a && !!d.colorStops, p = o && !!f.image, y = a && !!d.image, m = void 0, _ = void 0, b = void 0, S = void 0, w = void 0;
    (v || g) && (w = t.getBoundingRect()), v && (m = c ? nc(e, f, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), g && (_ = c ? nc(e, d, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), p && (b = c || !t.__canvasFillPattern ? ic(e, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = b), y && (S = c || !t.__canvasStrokePattern ? ic(e, d, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = b), v ? e.fillStyle = m : p && (b ? e.fillStyle = b : o = !1), g ? e.strokeStyle = _ : y && (S ? e.strokeStyle = S : a = !1);
  }
  var x = t.getGlobalScale();
  h.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var M, D;
  e.setLineDash && r.lineDash && (i = L_(t), M = i[0], D = i[1]);
  var A = !0;
  (u || c & ci) && (h.setDPR(e.dpr), l ? h.setContext(null) : (h.setContext(e), A = !1), h.reset(), t.buildPath(h, t.shape, n), h.toStatic(), t.pathUpdated()), A && h.rebuildPath(e, l ? s : 1), M && (e.setLineDash(M), e.lineDashOffset = D), n || (r.strokeFirst ? (a && dp(e, r), o && fp(e, r)) : (o && fp(e, r), a && dp(e, r))), M && e.setLineDash([]);
}
function AD(e, t, r) {
  var n = t.__image = nm(r.image, t.__image, t, t.onload);
  if (!(!n || !vl(n))) {
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
function ID(e, t, r) {
  var n, i = r.text;
  if (i != null && (i += ""), i) {
    e.font = r.font || On, e.textAlign = r.textAlign, e.textBaseline = r.textBaseline;
    var a = void 0, o = void 0;
    e.setLineDash && r.lineDash && (n = L_(t), a = n[0], o = n[1]), a && (e.setLineDash(a), e.lineDashOffset = o), r.strokeFirst ? (tl(r) && e.strokeText(i, r.x, r.y), el(r) && e.fillText(i, r.x, r.y)) : (el(r) && e.fillText(i, r.x, r.y), tl(r) && e.strokeText(i, r.x, r.y)), a && e.setLineDash([]);
  }
}
var vp = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], pp = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function P_(e, t, r, n, i) {
  var a = !1;
  if (!n && (r = r || {}, t === r))
    return !1;
  if (n || t.opacity !== r.opacity) {
    te(e, i), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? $n.opacity : o;
  }
  (n || t.blend !== r.blend) && (a || (te(e, i), a = !0), e.globalCompositeOperation = t.blend || $n.blend);
  for (var s = 0; s < vp.length; s++) {
    var l = vp[s];
    (n || t[l] !== r[l]) && (a || (te(e, i), a = !0), e[l] = e.dpr * (t[l] || 0));
  }
  return (n || t.shadowColor !== r.shadowColor) && (a || (te(e, i), a = !0), e.shadowColor = t.shadowColor || $n.shadowColor), a;
}
function gp(e, t, r, n, i) {
  var a = ao(t, i.inHover), o = n ? null : r && ao(r, i.inHover) || {};
  if (a === o)
    return !1;
  var s = P_(e, a, o, n, i);
  if ((n || a.fill !== o.fill) && (s || (te(e, i), s = !0), cp(a.fill) && (e.fillStyle = a.fill)), (n || a.stroke !== o.stroke) && (s || (te(e, i), s = !0), cp(a.stroke) && (e.strokeStyle = a.stroke)), (n || a.opacity !== o.opacity) && (s || (te(e, i), s = !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (te(e, i), s = !0), e.lineWidth = u);
  }
  for (var h = 0; h < pp.length; h++) {
    var c = pp[h], f = c[0];
    (n || a[f] !== o[f]) && (s || (te(e, i), s = !0), e[f] = a[f] || c[1]);
  }
  return s;
}
function $D(e, t, r, n, i) {
  return P_(e, ao(t, i.inHover), r && ao(r, i.inHover), n, i);
}
function R_(e, t) {
  var r = t.transform, n = e.dpr || 1;
  r ? e.setTransform(n * r[0], n * r[1], n * r[2], n * r[3], n * r[4], n * r[5]) : e.setTransform(n, 0, 0, n, 0, 0);
}
function LD(e, t, r) {
  for (var n = !1, i = 0; i < e.length; i++) {
    var a = e[i];
    n = n || a.isZeroArea(), R_(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  r.allClipped = n;
}
function PD(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var yp = 1, mp = 2, _p = 3, bp = 4;
function RD(e) {
  var t = el(e), r = tl(e);
  return !(e.lineDash || !(+t ^ +r) || t && typeof e.fill != "string" || r && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function te(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function ao(e, t) {
  return t && e.__hoverStyle || e.style;
}
function O_(e, t) {
  An(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function An(e, t, r, n) {
  var i = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    t.__dirty &= ~oe, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = r.prevElClipPaths, s = !1, l = !1;
  if ((!o || TD(a, o)) && (o && o.length && (te(e, r), e.restore(), l = s = !0, r.prevElClipPaths = null, r.allClipped = !1, r.prevEl = null), a && a.length && (te(e, r), e.save(), LD(a, e, r), s = !0), r.prevElClipPaths = a), r.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = r.prevEl;
  u || (l = s = !0);
  var h = t instanceof dt && t.autoBatch && RD(t.style);
  s || PD(i, u.transform) ? (te(e, r), R_(e, t)) : h || te(e, r);
  var c = ao(t, r.inHover);
  t instanceof dt ? (r.lastDrawType !== yp && (l = !0, r.lastDrawType = yp), gp(e, t, u, l, r), (!h || !r.batchFill && !r.batchStroke) && e.beginPath(), DD(e, t, c, h), h && (r.batchFill = c.fill || "", r.batchStroke = c.stroke || "")) : t instanceof Ws ? (r.lastDrawType !== _p && (l = !0, r.lastDrawType = _p), gp(e, t, u, l, r), ID(e, t, c)) : t instanceof rr ? (r.lastDrawType !== mp && (l = !0, r.lastDrawType = mp), $D(e, t, u, l, r), AD(e, t, c)) : t.getTemporalDisplayables && (r.lastDrawType !== bp && (l = !0, r.lastDrawType = bp), OD(e, t, r)), h && n && te(e, r), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), r.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function OD(e, t, r) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), An(e, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, h = i.length; u < h; u++) {
    var l = i[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), An(e, l, a, u === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
var Vu = new fD(), wp = new vo(100), Sp = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function ac(e, t) {
  if (e === "none")
    return null;
  var r = t.getDevicePixelRatio(), n = t.getZr(), i = n.painter.type === "svg";
  e.dirty && Vu.delete(e);
  var a = Vu.get(e);
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
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / r, Vu.set(e, s), e.dirty = !1, s;
  function l(u) {
    for (var h = [r], c = !0, f = 0; f < Sp.length; ++f) {
      var d = o[Sp[f]];
      if (d != null && !z(d) && !H(d) && !bt(d) && typeof d != "boolean") {
        c = !1;
        break;
      }
      h.push(d);
    }
    var v;
    if (c) {
      v = h.join(",") + (i ? "-svg" : "");
      var g = wp.get(v);
      g && (i ? u.svgElement = g : u.image = g);
    }
    var p = k_(o.dashArrayX), y = ED(o.dashArrayY), m = E_(o.symbol), _ = kD(p), b = N_(y), S = !i && Wr.createCanvas(), w = i && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), M;
    S && (S.width = x.width * r, S.height = x.height * r, M = S.getContext("2d")), A(), c && wp.put(v, S || w), u.image = S, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, $ = 0, L = _.length; $ < L; ++$)
        T = Ed(T, _[$]);
      for (var P = 1, $ = 0, L = m.length; $ < L; ++$)
        P = Ed(P, m[$].length);
      T *= P;
      var R = b * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(R, o.maxTileHeight))
      };
    }
    function A() {
      M && (M.clearRect(0, 0, S.width, S.height), o.backgroundColor && (M.fillStyle = o.backgroundColor, M.fillRect(0, 0, S.width, S.height)));
      for (var T = 0, $ = 0; $ < y.length; ++$)
        T += y[$];
      if (T <= 0)
        return;
      for (var L = -b, P = 0, R = 0, E = 0; L < x.height; ) {
        if (P % 2 === 0) {
          for (var G = R / 2 % m.length, k = 0, F = 0, W = 0; k < x.width * 2; ) {
            for (var j = 0, $ = 0; $ < p[E].length; ++$)
              j += p[E][$];
            if (j <= 0)
              break;
            if (F % 2 === 0) {
              var nt = (1 - o.symbolSize) * 0.5, vt = k + p[E][F] * nt, wt = L + y[P] * nt, xt = p[E][F] * o.symbolSize, Ce = y[P] * o.symbolSize, Kr = W / 2 % m[G].length;
              Yn(vt, wt, xt, Ce, m[G][Kr]);
            }
            k += p[E][F], ++W, ++F, F === p[E].length && (F = 0);
          }
          ++E, E === p.length && (E = 0);
        }
        L += y[P], ++R, ++P, P === y.length && (P = 0);
      }
      function Yn(ie, Rt, K, it, jr) {
        var Wt = i ? 1 : r, Ff = gr(jr, ie * Wt, Rt * Wt, K * Wt, it * Wt, o.color, o.symbolKeepAspect);
        if (i) {
          var Hf = n.painter.renderOneToVNode(Ff);
          Hf && w.children.push(Hf);
        } else
          O_(M, Ff);
      }
    }
  }
}
function E_(e) {
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
    return E_([e]);
  for (var n = [], r = 0; r < e.length; ++r)
    H(e[r]) ? n.push([e[r]]) : n.push(e[r]);
  return n;
}
function k_(e) {
  if (!e || e.length === 0)
    return [[0, 0]];
  if (bt(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, n = 0; n < e.length; ++n)
    if (!bt(e[n])) {
      r = !1;
      break;
    }
  if (r)
    return k_([e]);
  for (var i = [], n = 0; n < e.length; ++n)
    if (bt(e[n])) {
      var t = Math.ceil(e[n]);
      i.push([t, t]);
    } else {
      var t = Y(e[n], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? i.push(t.concat(t)) : i.push(t);
    }
  return i;
}
function ED(e) {
  if (!e || typeof e == "object" && e.length === 0)
    return [0, 0];
  if (bt(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = Y(e, function(n) {
    return Math.ceil(n);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function kD(e) {
  return Y(e, function(t) {
    return N_(t);
  });
}
function N_(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function ND(e, t) {
  e.eachRawSeries(function(r) {
    if (!e.isSeriesFiltered(r)) {
      var n = r.getData();
      n.hasItemVisual() && n.each(function(o) {
        var s = n.getItemVisual(o, "decal");
        if (s) {
          var l = n.ensureUniqueItemVisual(o, "style");
          l.decal = ac(s, t);
        }
      });
      var i = n.getVisual("decal");
      if (i) {
        var a = n.getVisual("style");
        a.decal = ac(i, t);
      }
    }
  });
}
var $e = new er(), B_ = {};
function BD(e, t) {
  B_[e] = t;
}
function zD(e) {
  return B_[e];
}
var FD = 1, HD = 800, VD = 900, GD = 1e3, WD = 2e3, UD = 5e3, z_ = 1e3, YD = 1100, Tf = 2e3, F_ = 3e3, XD = 4e3, kl = 4500, qD = 4600, ZD = 5e3, KD = 6e3, H_ = 7e3, jD = {
  PROCESSOR: {
    FILTER: GD,
    SERIES_FILTER: HD,
    STATISTIC: UD
  },
  VISUAL: {
    LAYOUT: z_,
    PROGRESSIVE_LAYOUT: YD,
    GLOBAL: Tf,
    CHART: F_,
    POST_CHART_LAYOUT: qD,
    COMPONENT: XD,
    BRUSH: ZD,
    CHART_ITEM: kl,
    ARIA: KD,
    DECAL: H_
  }
}, Bt = "__flagInMainProcess", Zt = "__pendingUpdate", Gu = "__needsUpdateStatus", xp = /^[a-zA-Z0-9_]+$/, Wu = "__connectUpdateStatus", Tp = 0, QD = 1, JD = 2;
function V_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return W_(this, e, t);
  };
}
function G_(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return W_(this, e, t);
  };
}
function W_(e, t, r) {
  return r[0] = r[0] && r[0].toLowerCase(), er.prototype[t].apply(e, r);
}
var U_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(er)
), Y_ = U_.prototype;
Y_.on = G_("on");
Y_.off = G_("off");
var ai, Uu, Zo, Ir, Yu, Xu, qu, ua, ha, Cp, Mp, Zu, Dp, Ko, Ap, X_, he, Ip, q_ = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i) {
      var a = e.call(this, new aD()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], i = i || {}, H(n) && (n = Z_[n]), a._dom = r;
      var o = "canvas", s = "auto", l = !1;
      i.ssr;
      var u = a._zr = Pd(r, {
        renderer: i.renderer || o,
        devicePixelRatio: i.devicePixelRatio,
        width: i.width,
        height: i.height,
        ssr: i.ssr,
        useDirtyRect: tt(i.useDirtyRect, l),
        useCoarsePointer: tt(i.useCoarsePointer, s),
        pointerSize: i.pointerSize
      });
      a._ssr = i.ssr, a._throttledZrFlush = xf(J(u.flush, u), 17), n = q(n), n && r_(n, !0), a._theme = n, a._locale = cC(i.locale || Em), a._coordSysMgr = new Rl();
      var h = a._api = Ap(a);
      function c(f, d) {
        return f.__prio - d.__prio;
      }
      return fs(nl, c), fs(oc, c), a._scheduler = new x_(a, h, oc, nl), a._messageCenter = new U_(), a._initEvents(), a.resize = J(a.resize, a), u.animation.on("frame", a._onframe, a), Cp(u, a), Mp(u, a), bh(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        Ip(this);
        var r = this._scheduler;
        if (this[Zt]) {
          var n = this[Zt].silent;
          this[Bt] = !0;
          try {
            ai(this), Ir.update.call(this, null, this[Zt].updateParams);
          } catch (l) {
            throw this[Bt] = !1, this[Zt] = null, l;
          }
          this._zr.flush(), this[Bt] = !1, this[Zt] = null, ua.call(this, n), ha.call(this, n);
        } else if (r.unfinished) {
          var i = FD, a = this._model, o = this._api;
          r.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            r.performSeriesTasks(a), r.performDataProcessorTasks(a), Xu(this, a), r.performVisualTasks(a), Ko(this, this._model, o, "remain", {}), i -= +/* @__PURE__ */ new Date() - s;
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
          var l = new zC(this._api), u = this._theme, h = this._model = new mf();
          h.scheduler = this._scheduler, h.ssr = this._ssr, h.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(r, {
          replaceMerge: o
        }, sc);
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
            ai(this), Ir.update.call(this, null, c);
          } catch (f) {
            throw this[Zt] = null, this[Bt] = !1, f;
          }
          this._ssr || this._zr.flush(), this[Zt] = null, this[Bt] = !1, ua.call(this, a), ha.call(this, a);
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
      if ($p[i]) {
        var l = s, u = s, h = -s, c = -s, f = [], d = r && r.pixelRatio || this.getDevicePixelRatio();
        C(za, function(_, b) {
          if (_.group === i) {
            var S = n ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(q(r)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), h = o(w.right, h), c = o(w.bottom, c), f.push({
              dom: S,
              left: w.left,
              top: w.top
            });
          }
        }), l *= d, u *= d, h *= d, c *= d;
        var v = h - l, g = c - u, p = Wr.createCanvas(), y = Pd(p, {
          renderer: n ? "svg" : "canvas"
        });
        if (y.resize({
          width: v,
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
              width: v,
              height: g
            },
            style: {
              fill: r.connectedBackgroundColor
            }
          })), C(f, function(_) {
            var b = new rr({
              style: {
                x: _.left * d - l,
                y: _.top * d - u,
                image: _.dom
              }
            });
            y.add(b);
          }), y.refreshImmediately(), p.toDataURL("image/" + (r && r.type || "png"));
      } else
        return this.getDataURL(r);
    }, t.prototype.convertToPixel = function(r, n) {
      return Yu(this, "convertToPixel", r, n);
    }, t.prototype.convertFromPixel = function(r, n) {
      return Yu(this, "convertFromPixel", r, n);
    }, t.prototype.containPixel = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = this._model, a, o = pu(i, r);
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
      var i = this._model, a = pu(i, r, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? A_(s, l, n) : I_(s, n);
    }, t.prototype.getViewOfComponentModel = function(r) {
      return this._componentsMap[r.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(r) {
      return this._chartsMap[r.__viewId];
    }, t.prototype._initEvents = function() {
      var r = this;
      C(tA, function(n) {
        var i = function(a) {
          var o = r.getModel(), s = a.target, l, u = n === "globalout";
          if (u ? l = {} : s && mi(s, function(v) {
            var g = st(v);
            if (g && g.dataIndex != null) {
              var p = g.dataModel || o.getSeriesByIndex(g.seriesIndex);
              return l = p && p.getDataParams(g.dataIndex, g.dataType, s) || {}, !0;
            } else if (g.eventData)
              return l = N({}, g.eventData), !0;
          }, !0), l) {
            var h = l.componentType, c = l.componentIndex;
            (h === "markLine" || h === "markPoint" || h === "markArea") && (h = "series", c = l.seriesIndex);
            var f = h && c != null && o.getComponent(h, c), d = f && r[f.mainType === "series" ? "_chartsMap" : "_componentsMap"][f.__viewId];
            l.event = a, l.type = n, r._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: f,
              view: d
            }, r.trigger(n, l);
          }
        };
        i.zrEventfulCallAtLast = !0, r._zr.on(n, i, r);
      }), C(Ba, function(n, i) {
        r._messageCenter.on(i, function(a) {
          this.trigger(i, a);
        }, r);
      }), C(["selectchanged"], function(n) {
        r._messageCenter.on(n, function(i) {
          this.trigger(n, i);
        }, r);
      }), uD(this._messageCenter, this, this._api);
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
      r && tm(this.getDom(), Mf, "");
      var n = this, i = n._api, a = n._model;
      C(n._componentsViews, function(o) {
        o.dispose(a, i);
      }), C(n._chartsViews, function(o) {
        o.dispose(a, i);
      }), n._zr.dispose(), n._dom = n._model = n._chartsMap = n._componentsMap = n._chartsViews = n._componentsViews = n._scheduler = n._api = n._zr = n._throttledZrFlush = n._theme = n._coordSysMgr = n._messageCenter = null, delete za[n.id];
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
            i && ai(this), Ir.update.call(this, {
              type: "resize",
              animation: N({
                // Disable animation
                duration: 0
              }, r && r.animation)
            });
          } catch (o) {
            throw this[Bt] = !1, o;
          }
          this[Bt] = !1, ua.call(this, a), ha.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(r) && (n = r, r = ""), r = r || "default", this.hideLoading(), !!lc[r]) {
        var i = lc[r](this._api, n), a = this._zr;
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
      return n.type = Ba[r.type], n;
    }, t.prototype.dispatchAction = function(r, n) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (V(n) || (n = {
        silent: !!n
      }), !!rl[r.type] && this._model) {
        if (this[Bt]) {
          this._pendingActions.push(r);
          return;
        }
        var i = n.silent;
        qu.call(this, r, i);
        var a = n.flush;
        a ? this._zr.flush() : a !== !1 && X.browser.weChat && this._throttledZrFlush(), ua.call(this, i), ha.call(this, i);
      }
    }, t.prototype.updateLabelLayout = function() {
      $e.trigger("series:layoutlabels", this._model, this._api, {
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
      ai = function(c) {
        var f = c._scheduler;
        f.restorePipelines(c._model), f.prepareStageTasks(), Uu(c, !0), Uu(c, !1), f.plan();
      }, Uu = function(c, f) {
        for (var d = c._model, v = c._scheduler, g = f ? c._componentsViews : c._chartsViews, p = f ? c._componentsMap : c._chartsMap, y = c._zr, m = c._api, _ = 0; _ < g.length; _++)
          g[_].__alive = !1;
        f ? d.eachComponent(function(w, x) {
          w !== "series" && b(x);
        }) : d.eachSeries(b);
        function b(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var M = "_ec_" + w.id + "_" + w.type, D = !x && p[M];
          if (!D) {
            var A = Xe(w.type), T = f ? ke.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Se.getClass(A.sub)
            );
            D = new T(), D.init(d, m), p[M] = D, g.push(D), y.add(D.group);
          }
          w.__viewId = D.__id = M, D.__alive = !0, D.__model = w, D.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !f && v.prepareView(D, w, d, m);
        }
        for (var _ = 0; _ < g.length; ) {
          var S = g[_];
          S.__alive ? _++ : (!f && S.renderTask.dispose(), y.remove(S.group), S.dispose(d, m), g.splice(_, 1), p[S.__id] === S && delete p[S.__id], S.__id = S.group.__ecComponentInfo = null);
        }
      }, Zo = function(c, f, d, v, g) {
        var p = c._model;
        if (p.setUpdatePayload(d), !v) {
          C([].concat(c._componentsViews).concat(c._chartsViews), S);
          return;
        }
        var y = {};
        y[v + "Id"] = d[v + "Id"], y[v + "Index"] = d[v + "Index"], y[v + "Name"] = d[v + "Name"];
        var m = {
          mainType: v,
          query: y
        };
        g && (m.subType = g);
        var _ = d.excludeSeriesId, b;
        _ != null && (b = Q(), C(kt(_), function(w) {
          var x = Oe(w, null);
          x != null && b.set(x, !0);
        })), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          if (!x)
            if (hv(d))
              if (w instanceof Ee)
                d.type === Ln && !d.notBlur && !w.get(["emphasis", "disabled"]) && Kx(w, d, c._api);
              else {
                var M = tf(w.mainType, w.componentIndex, d.name, c._api), D = M.focusSelf, A = M.dispatchers;
                d.type === Ln && D && !d.notBlur && Fh(w.mainType, w.componentIndex, c._api), A && C(A, function(T) {
                  d.type === Ln ? Us(T) : Ys(T);
                });
              }
            else Wh(d) && w instanceof Ee && (Jx(w, d, c._api), lv(w), he(c));
        }, c), p && p.eachComponent(m, function(w) {
          var x = b && b.get(w.id) != null;
          x || S(c[v === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, c);
        function S(w) {
          w && w.__alive && w[f] && w[f](w.__model, p, c._api, d);
        }
      }, Ir = {
        prepareAndUpdate: function(c) {
          ai(this), Ir.update.call(this, c, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: c.newOption != null
          });
        },
        update: function(c, f) {
          var d = this._model, v = this._api, g = this._zr, p = this._coordSysMgr, y = this._scheduler;
          if (d) {
            d.setUpdatePayload(c), y.restoreData(d, c), y.performSeriesTasks(d), p.create(d, v), y.performDataProcessorTasks(d, c), Xu(this, d), p.update(d, v), r(d), y.performVisualTasks(d, c), Zu(this, d, v, c, f);
            var m = d.get("backgroundColor") || "transparent", _ = d.get("darkMode");
            g.setBackgroundColor(m), _ != null && _ !== "auto" && g.setDarkMode(_), $e.trigger("afterupdate", d, v);
          }
        },
        updateTransform: function(c) {
          var f = this, d = this._model, v = this._api;
          if (d) {
            d.setUpdatePayload(c);
            var g = [];
            d.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = f.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var b = _.updateTransform(m, d, v, c);
                    b && b.update && g.push(_);
                  } else
                    g.push(_);
              }
            });
            var p = Q();
            d.eachSeries(function(y) {
              var m = f._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, d, v, c);
                _ && _.update && p.set(y.uid, 1);
              } else
                p.set(y.uid, 1);
            }), r(d), this._scheduler.performVisualTasks(d, c, {
              setDirty: !0,
              dirtyMap: p
            }), Ko(this, d, v, c, {}, p), $e.trigger("afterupdate", d, v);
          }
        },
        updateView: function(c) {
          var f = this._model;
          f && (f.setUpdatePayload(c), Se.markUpdateMethod(c, "updateView"), r(f), this._scheduler.performVisualTasks(f, c, {
            setDirty: !0
          }), Zu(this, f, this._api, c, {}), $e.trigger("afterupdate", f, this._api));
        },
        updateVisual: function(c) {
          var f = this, d = this._model;
          d && (d.setUpdatePayload(c), d.eachSeries(function(v) {
            v.getData().clearAllVisual();
          }), Se.markUpdateMethod(c, "updateVisual"), r(d), this._scheduler.performVisualTasks(d, c, {
            visualType: "visual",
            setDirty: !0
          }), d.eachComponent(function(v, g) {
            if (v !== "series") {
              var p = f.getViewOfComponentModel(g);
              p && p.__alive && p.updateVisual(g, d, f._api, c);
            }
          }), d.eachSeries(function(v) {
            var g = f._chartsMap[v.__viewId];
            g.updateVisual(v, d, f._api, c);
          }), $e.trigger("afterupdate", d, this._api));
        },
        updateLayout: function(c) {
          Ir.update.call(this, c);
        }
      }, Yu = function(c, f, d, v) {
        if (c._disposed) {
          c.id;
          return;
        }
        for (var g = c._model, p = c._coordSysMgr.getCoordinateSystems(), y, m = pu(g, d), _ = 0; _ < p.length; _++) {
          var b = p[_];
          if (b[f] && (y = b[f](g, m, v)) != null)
            return y;
        }
      }, Xu = function(c, f) {
        var d = c._chartsMap, v = c._scheduler;
        f.eachSeries(function(g) {
          v.updateStreamModes(g, d[g.__viewId]);
        });
      }, qu = function(c, f) {
        var d = this, v = this.getModel(), g = c.type, p = c.escapeConnect, y = rl[g], m = y.actionInfo, _ = (m.update || "update").split(":"), b = _.pop(), S = _[0] != null && Xe(_[0]);
        this[Bt] = !0;
        var w = [c], x = !1;
        c.batch && (x = !0, w = Y(c.batch, function(P) {
          return P = ht(N({}, P), c), P.batch = null, P;
        }));
        var M = [], D, A = Wh(c), T = hv(c);
        if (T && _m(this._api), C(w, function(P) {
          if (D = y.action(P, d._model, d._api), D = D || N({}, P), D.type = m.event || D.type, M.push(D), T) {
            var R = Zc(c), E = R.queryOptionMap, G = R.mainTypeSpecified, k = G ? E.keys()[0] : "series";
            Zo(d, b, P, k), he(d);
          } else A ? (Zo(d, b, P, "series"), he(d)) : S && Zo(d, b, P, S.main, S.sub);
        }), b !== "none" && !T && !A && !S)
          try {
            this[Zt] ? (ai(this), Ir.update.call(this, c), this[Zt] = null) : Ir[b].call(this, c);
          } catch (P) {
            throw this[Bt] = !1, P;
          }
        if (x ? D = {
          type: m.event || g,
          escapeConnect: p,
          batch: M
        } : D = M[0], this[Bt] = !1, !f) {
          var $ = this._messageCenter;
          if ($.trigger(D.type, D), A) {
            var L = {
              type: "selectchanged",
              escapeConnect: p,
              selected: tT(v),
              isFromClick: c.isFromClick || !1,
              fromAction: c.type,
              fromActionPayload: c
            };
            $.trigger(L.type, L);
          }
        }
      }, ua = function(c) {
        for (var f = this._pendingActions; f.length; ) {
          var d = f.shift();
          qu.call(this, d, c);
        }
      }, ha = function(c) {
        !c && this.trigger("updated");
      }, Cp = function(c, f) {
        c.on("rendered", function(d) {
          f.trigger("rendered", d), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          c.animation.isFinished() && !f[Zt] && !f._scheduler.unfinished && !f._pendingActions.length && f.trigger("finished");
        });
      }, Mp = function(c, f) {
        c.on("mouseover", function(d) {
          var v = d.target, g = mi(v, Gh);
          g && (jx(g, d, f._api), he(f));
        }).on("mouseout", function(d) {
          var v = d.target, g = mi(v, Gh);
          g && (Qx(g, d, f._api), he(f));
        }).on("click", function(d) {
          var v = d.target, g = mi(v, function(m) {
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
        var f = [], d = [], v = !1;
        if (c.eachComponent(function(m, _) {
          var b = _.get("zlevel") || 0, S = _.get("z") || 0, w = _.getZLevelKey();
          v = v || !!w, (m === "series" ? d : f).push({
            zlevel: b,
            z: S,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), v) {
          var g = f.concat(d), p, y;
          fs(g, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), C(g, function(m) {
            var _ = c.getComponent(m.type, m.idx), b = m.zlevel, S = m.key;
            p != null && (b = Math.max(p, b)), S ? (b === p && S !== y && b++, y = S) : y && (b === p && b++, y = ""), p = b, _.setZLevel(b);
          });
        }
      }
      Zu = function(c, f, d, v, g) {
        n(f), Dp(c, f, d, v, g), C(c._chartsViews, function(p) {
          p.__alive = !1;
        }), Ko(c, f, d, v, g), C(c._chartsViews, function(p) {
          p.__alive || p.remove(f, d);
        });
      }, Dp = function(c, f, d, v, g, p) {
        C(p || c._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, f, d, v), s(m, y), h(m, y);
        });
      }, Ko = function(c, f, d, v, g, p) {
        var y = c._scheduler;
        g = N(g || {}, {
          updatedSeries: f.getSeries()
        }), $e.trigger("series:beforeupdate", f, d, g);
        var m = !1;
        f.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          b.__alive = !0;
          var S = b.renderTask;
          y.updatePayload(S, v), u(_, b), p && p.get(_.uid) && S.dirty(), S.perform(y.getPerformArgs(S)) && (m = !0), b.group.silent = !!_.get("silent"), o(_, b), lv(_);
        }), y.unfinished = m || y.unfinished, $e.trigger("series:layoutlabels", f, d, g), $e.trigger("series:transition", f, d, g), f.eachSeries(function(_) {
          var b = c._chartsMap[_.__viewId];
          s(_, b), h(_, b);
        }), a(c, f), $e.trigger("series:afterupdate", f, d, g);
      }, he = function(c) {
        c[Gu] = !0, c.getZr().wakeUp();
      }, Ip = function(c) {
        c[Gu] && (c.getZr().storage.traverse(function(f) {
          Ea(f) || i(f);
        }), c[Gu] = !1);
      };
      function i(c) {
        for (var f = [], d = c.currentStates, v = 0; v < d.length; v++) {
          var g = d[v];
          g === "emphasis" || g === "blur" || g === "select" || f.push(g);
        }
        c.selected && c.states.select && f.push("select"), c.hoverState === yl && c.states.emphasis ? f.push("emphasis") : c.hoverState === gl && c.states.blur && f.push("blur"), c.useStates(f);
      }
      function a(c, f) {
        var d = c._zr, v = d.storage, g = 0;
        v.traverse(function(p) {
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
        var d = c.get("blendMode") || null;
        f.eachRendered(function(v) {
          v.isGroup || (v.style.blend = d);
        });
      }
      function s(c, f) {
        if (!c.preventAutoZ) {
          var d = c.get("z") || 0, v = c.get("zlevel") || 0;
          f.eachRendered(function(g) {
            return l(g, d, v, -1 / 0), !0;
          });
        }
      }
      function l(c, f, d, v) {
        var g = c.getTextContent(), p = c.getTextGuideLine(), y = c.isGroup;
        if (y)
          for (var m = c.childrenRef(), _ = 0; _ < m.length; _++)
            v = Math.max(l(m[_], f, d, v), v);
        else
          c.z = f, c.zlevel = d, v = Math.max(c.z2, v);
        if (g && (g.z = f, g.zlevel = d, isFinite(v) && (g.z2 = v + 2)), p) {
          var b = c.textGuideLineConfig;
          p.z = f, p.zlevel = d, isFinite(v) && (p.z2 = v + (b && b.showAbove ? 1 : -1));
        }
        return v;
      }
      function u(c, f) {
        f.eachRendered(function(d) {
          if (!Ea(d)) {
            var v = d.getTextContent(), g = d.getTextGuideLine();
            d.stateTransition && (d.stateTransition = null), v && v.stateTransition && (v.stateTransition = null), g && g.stateTransition && (g.stateTransition = null), d.hasState() ? (d.prevStates = d.currentStates, d.clearStates()) : d.prevStates && (d.prevStates = null);
          }
        });
      }
      function h(c, f) {
        var d = c.getModel("stateAnimation"), v = c.isAnimationEnabled(), g = d.get("duration"), p = g > 0 ? {
          duration: g,
          delay: d.get("delay"),
          easing: d.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        f.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (Ea(y))
              return;
            if (y instanceof dt && aT(y), y.__dirty) {
              var m = y.prevStates;
              m && y.useStates(m);
            }
            if (v) {
              y.stateTransition = p;
              var _ = y.getTextContent(), b = y.getTextGuideLine();
              _ && (_.stateTransition = p), b && (b.stateTransition = p);
            }
            y.__dirty && i(y);
          }
        });
      }
      Ap = function(c) {
        return new /** @class */
        (function(f) {
          B(d, f);
          function d() {
            return f !== null && f.apply(this, arguments) || this;
          }
          return d.prototype.getCoordinateSystems = function() {
            return c._coordSysMgr.getCoordinateSystems();
          }, d.prototype.getComponentByElement = function(v) {
            for (; v; ) {
              var g = v.__ecComponentInfo;
              if (g != null)
                return c._model.getComponent(g.mainType, g.index);
              v = v.parent;
            }
          }, d.prototype.enterEmphasis = function(v, g) {
            Us(v, g), he(c);
          }, d.prototype.leaveEmphasis = function(v, g) {
            Ys(v, g), he(c);
          }, d.prototype.enterBlur = function(v) {
            Zx(v), he(c);
          }, d.prototype.leaveBlur = function(v) {
            pm(v), he(c);
          }, d.prototype.enterSelect = function(v) {
            gm(v), he(c);
          }, d.prototype.leaveSelect = function(v) {
            ym(v), he(c);
          }, d.prototype.getModel = function() {
            return c.getModel();
          }, d.prototype.getViewOfComponentModel = function(v) {
            return c.getViewOfComponentModel(v);
          }, d.prototype.getViewOfSeriesModel = function(v) {
            return c.getViewOfSeriesModel(v);
          }, d;
        }(t_))(c);
      }, X_ = function(c) {
        function f(d, v) {
          for (var g = 0; g < d.length; g++) {
            var p = d[g];
            p[Wu] = v;
          }
        }
        C(Ba, function(d, v) {
          c._messageCenter.on(v, function(g) {
            if ($p[c.group] && c[Wu] !== Tp) {
              if (g && g.escapeConnect)
                return;
              var p = c.makeActionFromEvent(g), y = [];
              C(za, function(m) {
                m !== c && m.group === c.group && y.push(m);
              }), f(y, Tp), C(y, function(m) {
                m[Wu] !== QD && m.dispatchAction(p);
              }), f(y, JD);
            }
          });
        });
      };
    }(), t;
  }(er)
), Cf = q_.prototype;
Cf.on = V_("on");
Cf.off = V_("off");
Cf.one = function(e, t, r) {
  var n = this;
  function i() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), n.off(e, i);
  }
  this.on.call(this, e, i, r);
};
var tA = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var rl = {}, Ba = {}, oc = [], sc = [], nl = [], Z_ = {}, lc = {}, za = {}, $p = {}, eA = +/* @__PURE__ */ new Date() - 0, Mf = "_echarts_instance_";
function rA(e, t, r) {
  var n = !(r && r.ssr);
  if (n) {
    var i = nA(e);
    if (i)
      return i;
  }
  var a = new q_(e, t, r);
  return a.id = "ec_" + eA++, za[a.id] = a, n && tm(e, Mf, a.id), X_(a), $e.trigger("afterinit", a), a;
}
function nA(e) {
  return za[NS(e, Mf)];
}
function K_(e, t) {
  Z_[e] = t;
}
function j_(e) {
  pt(sc, e) < 0 && sc.push(e);
}
function Q_(e, t) {
  Af(oc, e, t, WD);
}
function iA(e) {
  Df("afterinit", e);
}
function aA(e) {
  Df("afterupdate", e);
}
function Df(e, t) {
  $e.on(e, t);
}
function Ui(e, t, r) {
  Z(t) && (r = t, t = "");
  var n = V(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || n).toLowerCase(), t = e.event, !Ba[t] && (Ze(xp.test(n) && xp.test(t)), rl[n] || (rl[n] = {
    action: r,
    actionInfo: e
  }), Ba[t] = n);
}
function oA(e, t) {
  Rl.register(e, t);
}
function sA(e, t) {
  Af(nl, e, t, z_, "layout");
}
function Fn(e, t) {
  Af(nl, e, t, F_, "visual");
}
var Lp = [];
function Af(e, t, r, n, i) {
  if ((Z(t) || V(t)) && (r = t, t = n), !(pt(Lp, r) >= 0)) {
    Lp.push(r);
    var a = x_.wrapStageHandler(r, i);
    a.__prio = t, a.__raw = r, e.push(a);
  }
}
function J_(e, t) {
  lc[e] = t;
}
function lA(e, t, r) {
  var n = zD("registerMap");
  n && n(e, t, r);
}
var uA = pM;
Fn(Tf, UM);
Fn(kl, YM);
Fn(kl, XM);
Fn(Tf, oD);
Fn(kl, sD);
Fn(H_, ND);
j_(r_);
Q_(VD, jC);
J_("default", qM);
Ui({
  type: Ln,
  event: Ln,
  update: Ln
}, Xt);
Ui({
  type: ms,
  event: ms,
  update: ms
}, Xt);
Ui({
  type: Pa,
  event: Pa,
  update: Pa
}, Xt);
Ui({
  type: _s,
  event: _s,
  update: _s
}, Xt);
Ui({
  type: Ra,
  event: Ra,
  update: Ra
}, Xt);
K_("light", iD);
K_("dark", D_);
function ca(e) {
  return e == null ? 0 : e.length || 1;
}
function Pp(e) {
  return e;
}
var hA = (
  /** @class */
  function() {
    function e(t, r, n, i, a, o) {
      this._old = t, this._new = r, this._oldKeyGetter = n || Pp, this._newKeyGetter = i || Pp, this.context = a, this._diffModeMultiple = o === "multiple";
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
        var s = i[o], l = n[s], u = ca(l);
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
        var l = a[s], u = n[l], h = i[l], c = ca(u), f = ca(h);
        if (c > 1 && f === 1)
          this._updateManyToOne && this._updateManyToOne(h, u), i[l] = null;
        else if (c === 1 && f > 1)
          this._updateOneToMany && this._updateOneToMany(h, u), i[l] = null;
        else if (c === 1 && f === 1)
          this._update && this._update(h, u), i[l] = null;
        else if (c > 1 && f > 1)
          this._updateManyToMany && this._updateManyToMany(h, u), i[l] = null;
        else if (c > 1)
          for (var d = 0; d < c; d++)
            this._remove && this._remove(u[d]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, i);
    }, e.prototype._performRestAdd = function(t, r) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n], a = r[i], o = ca(a);
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
          var l = r[s], u = ca(l);
          u === 0 ? (r[s] = o, a && n.push(s)) : u === 1 ? r[s] = [l, o] : l.push(o);
        }
      }
    }, e;
  }()
), cA = (
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
function fA(e, t) {
  var r = {}, n = r.encode = {}, i = Q(), a = [], o = [], s = {};
  C(e.dimensions, function(f) {
    var d = e.getDimensionInfo(f), v = d.coordDim;
    if (v) {
      var g = d.coordDimIndex;
      Ku(n, v)[g] = f, d.isExtraCoord || (i.set(v, 1), vA(d.type) && (a[0] = f), Ku(s, v)[g] = e.getDimensionIndex(d.name)), d.defaultTooltip && o.push(f);
    }
    Zm.each(function(p, y) {
      var m = Ku(n, y), _ = d.otherDims[y];
      _ != null && _ !== !1 && (m[_] = d.name);
    });
  });
  var l = [], u = {};
  i.each(function(f, d) {
    var v = n[d];
    u[d] = v[0], l = l.concat(v);
  }), r.dataDimsOnCoord = l, r.dataDimIndicesOnCoord = Y(l, function(f) {
    return e.getDimensionInfo(f).storeDimIndex;
  }), r.encodeFirstDimNotExtra = u;
  var h = n.label;
  h && h.length && (a = h.slice());
  var c = n.tooltip;
  return c && c.length ? o = c.slice() : o.length || (o = a.slice()), n.defaultedLabel = a, n.defaultedTooltip = o, r.userOutput = new cA(s, t), r;
}
function Ku(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function dA(e) {
  return e === "category" ? "ordinal" : e === "time" ? "time" : "float";
}
function vA(e) {
  return !(e === "ordinal" || e === "time");
}
var Ts = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.otherDims = {}, t != null && N(this, t);
    }
    return e;
  }()
), pA = Lt(), gA = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, t0 = (
  /** @class */
  function() {
    function e(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = n0(this.source)));
    }, e.prototype.getSourceDimensionIndex = function(t) {
      return tt(this._dimNameMap.get(t), -1);
    }, e.prototype.getSourceDimension = function(t) {
      var r = this.source.dimensionsDefine;
      if (r)
        return r[t];
    }, e.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, r = a_(this.source), n = !i0(t), i = "", a = [], o = 0, s = 0; o < t; o++) {
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
        }), r && l != null && (!c || !c.isCalculationCoord) && (i += n ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), i += "$", i += gA[u] || "f", h && (i += h.uid), i += "$";
      }
      var d = this.source, v = [d.seriesLayoutBy, d.startIndex, i].join("$$");
      return {
        dimensions: a,
        hash: v
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
function e0(e) {
  return e instanceof t0;
}
function r0(e) {
  for (var t = Q(), r = 0; r < (e || []).length; r++) {
    var n = e[r], i = V(n) ? n.name : n;
    i != null && t.get(i) == null && t.set(i, r);
  }
  return t;
}
function n0(e) {
  var t = pA(e);
  return t.dimNameMap || (t.dimNameMap = r0(e.dimensionsDefine));
}
function i0(e) {
  return e > 30;
}
var fa = V, $r = Y, yA = typeof Int32Array > "u" ? Array : Int32Array, mA = "e\0\0", Rp = -1, _A = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], bA = ["_approximateExtent"], Op, jo, da, va, ju, pa, Qu, wA = (
  /** @class */
  function() {
    function e(t, r) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var n, i = !1;
      e0(t) ? (n = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (i = !0, n = t), n = n || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, h = 0; h < n.length; h++) {
        var c = n[h], f = H(c) ? new Ts({
          name: c
        }) : c instanceof Ts ? c : new Ts(c), d = f.name;
        f.type = f.type || "float", f.coordDim || (f.coordDim = d, f.coordDimIndex = 0);
        var v = f.otherDims = f.otherDims || {};
        o.push(d), a[d] = f, u[d] != null && (l = !0), f.createInvertedIndices && (s[d] = []), v.itemName === 0 && (this._nameDimIdx = h), v.itemId === 0 && (this._idDimIdx = h), i && (f.storeDimIndex = h);
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
      if (bt(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
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
      if (t instanceof Kh && (a = t), !a) {
        var o = this.dimensions, s = _f(t) || ee(t) ? new o_(t, o.length) : t;
        a = new Kh();
        var l = $r(o, function(u) {
          return {
            type: i._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, n);
      }
      this._store = a, this._nameList = (r || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = fA(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function(t) {
      var r = this._store.appendData(t);
      this._doInit(r[0], r[1]);
    }, e.prototype.appendValues = function(t, r) {
      var n = this._store.appendValues(t, r && r.length), i = n.start, a = n.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), r)
        for (var s = i; s < a; s++) {
          var l = s - i;
          this._nameList[s] = r[l], o && Qu(this, s);
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
            if (!this.hasItemOption && CS(c) && (this.hasItemOption = !0), c) {
              var f = c.name;
              a[h] == null && f != null && (a[h] = Oe(f, null));
              var d = c.id;
              o[h] == null && d != null && (o[h] = Oe(d, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var h = t; h < r; h++)
            Qu(this, h);
        Op(this);
      }
    }, e.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, e.prototype.setApproximateExtent = function(t, r) {
      r = this.getDimension(r), this._approximateExtent[r] = t.slice();
    }, e.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, e.prototype.setCalculationInfo = function(t, r) {
      fa(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = r;
    }, e.prototype.getName = function(t) {
      var r = this.getRawIndex(t), n = this._nameList[r];
      return n == null && this._nameDimIdx != null && (n = da(this, this._nameDimIdx, r)), n == null && (n = ""), n;
    }, e.prototype._getCategory = function(t, r) {
      var n = this._store.get(t, r), i = this._store.getOrdinalMeta(t);
      return i ? i.categories[n] : n;
    }, e.prototype.getId = function(t) {
      return jo(this, this.getRawIndex(t));
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
      return z(t) ? i.getValues($r(t, function(a) {
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
      return i == null || isNaN(i) ? Rp : i;
    }, e.prototype.indicesOfNearest = function(t, r, n) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), r, n);
    }, e.prototype.each = function(t, r, n) {
      Z(t) && (n = r, r = t, t = []);
      var i = n || this, a = $r(va(t), this._getStoreDimIndex, this);
      this._store.each(a, i ? J(r, i) : r);
    }, e.prototype.filterSelf = function(t, r, n) {
      Z(t) && (n = r, r = t, t = []);
      var i = n || this, a = $r(va(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, i ? J(r, i) : r), this;
    }, e.prototype.selectRange = function(t) {
      var r = this, n = {}, i = _t(t);
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
      var a = n || i || this, o = $r(va(t), this._getStoreDimIndex, this), s = pa(this);
      return s._store = this._store.map(o, a ? J(r, a) : r), s;
    }, e.prototype.modify = function(t, r, n, i) {
      var a = n || i || this, o = $r(va(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? J(r, a) : r);
    }, e.prototype.downSample = function(t, r, n, i) {
      var a = pa(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), r, n, i), a;
    }, e.prototype.minmaxDownSample = function(t, r) {
      var n = pa(this);
      return n._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), r), n;
    }, e.prototype.lttbDownSample = function(t, r) {
      var n = pa(this);
      return n._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r), n;
    }, e.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, e.prototype.getItemModel = function(t) {
      var r = this.hostModel, n = this.getRawDataItem(t);
      return new Tt(n, r, r && r.ecModel);
    }, e.prototype.diff = function(t) {
      var r = this;
      return new hA(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(n) {
        return jo(t, n);
      }, function(n) {
        return jo(r, n);
      });
    }, e.prototype.getVisual = function(t) {
      var r = this._visual;
      return r && r[t];
    }, e.prototype.setVisual = function(t, r) {
      this._visual = this._visual || {}, fa(t) ? N(this._visual, t) : this._visual[t] = r;
    }, e.prototype.getItemVisual = function(t, r) {
      var n = this._itemVisuals[t], i = n && n[r];
      return i ?? this.getVisual(r);
    }, e.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function(t, r) {
      var n = this._itemVisuals, i = n[t];
      i || (i = n[t] = {});
      var a = i[r];
      return a == null && (a = this.getVisual(r), z(a) ? a = a.slice() : fa(a) && (a = N({}, a)), i[r] = a), a;
    }, e.prototype.setItemVisual = function(t, r, n) {
      var i = this._itemVisuals[t] || {};
      this._itemVisuals[t] = i, fa(r) ? N(i, r) : i[r] = n;
    }, e.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function(t, r) {
      fa(t) ? N(this._layout, t) : this._layout[t] = r;
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
      zx(n, this.dataType, t, r), this._graphicEls[t] = r;
    }, e.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, e.prototype.eachItemGraphicEl = function(t, r) {
      C(this._graphicEls, function(n, i) {
        n && t && t.call(r, n, i);
      });
    }, e.prototype.cloneShallow = function(t) {
      return t || (t = new e(this._schema ? this._schema : $r(this.dimensions, this._getDimInfo, this), this.hostModel)), ju(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function(t, r) {
      var n = this[t];
      Z(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var i = n.apply(this, arguments);
        return r.apply(this, [i].concat(Bc(arguments)));
      });
    }, e.internalField = function() {
      Op = function(t) {
        var r = t._invertedIndicesMap;
        C(r, function(n, i) {
          var a = t._dimInfos[i], o = a.ordinalMeta, s = t._store;
          if (o) {
            n = r[i] = new yA(o.categories.length);
            for (var l = 0; l < n.length; l++)
              n[l] = Rp;
            for (var l = 0; l < s.count(); l++)
              n[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, da = function(t, r, n) {
        return Oe(t._getCategory(r, n), null);
      }, jo = function(t, r) {
        var n = t._idList[r];
        return n == null && t._idDimIdx != null && (n = da(t, t._idDimIdx, r)), n == null && (n = mA + r), n;
      }, va = function(t) {
        return z(t) || (t = t != null ? [t] : []), t;
      }, pa = function(t) {
        var r = new e(t._schema ? t._schema : $r(t.dimensions, t._getDimInfo, t), t.hostModel);
        return ju(r, t), r;
      }, ju = function(t, r) {
        C(_A.concat(r.__wrappedMethods || []), function(n) {
          r.hasOwnProperty(n) && (t[n] = r[n]);
        }), t.__wrappedMethods = r.__wrappedMethods, C(bA, function(n) {
          t[n] = q(r[n]);
        }), t._calculationInfo = N({}, r._calculationInfo);
      }, Qu = function(t, r) {
        var n = t._nameList, i = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = n[r], l = i[r];
        if (s == null && a != null && (n[r] = s = da(t, a, r)), l == null && o != null && (i[r] = l = da(t, o, r)), l == null && s != null) {
          var u = t._nameRepeatCount, h = u[s] = (u[s] || 0) + 1;
          l = s, h > 1 && (l += "__ec__" + h), i[r] = l;
        }
      };
    }(), e;
  }()
);
function SA(e, t) {
  _f(e) || (e = n_(e)), t = t || {};
  var r = t.coordDimensions || [], n = t.dimensionsDefine || e.dimensionsDefine || [], i = Q(), a = [], o = TA(e, r, n, t.dimensionsCount), s = t.canOmitUnusedDimensions && i0(o), l = n === e.dimensionsDefine, u = l ? n0(e) : r0(n), h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(e, o));
  for (var c = Q(h), f = new c_(o), d = 0; d < f.length; d++)
    f[d] = -1;
  function v(D) {
    var A = f[D];
    if (A < 0) {
      var T = n[D], $ = V(T) ? T : {
        name: T
      }, L = new Ts(), P = $.name;
      P != null && u.get(P) != null && (L.name = L.displayName = P), $.type != null && (L.type = $.type), $.displayName != null && (L.displayName = $.displayName);
      var R = a.length;
      return f[D] = R, L.storeDimIndex = D, a.push(L), L;
    }
    return a[A];
  }
  if (!s)
    for (var d = 0; d < o; d++)
      v(d);
  c.each(function(D, A) {
    var T = kt(D).slice();
    if (T.length === 1 && !H(T[0]) && T[0] < 0) {
      c.set(A, !1);
      return;
    }
    var $ = c.set(A, []);
    C(T, function(L, P) {
      var R = H(L) ? u.get(L) : L;
      R != null && R < o && ($[P] = R, p(v(R), A, P));
    });
  });
  var g = 0;
  C(r, function(D) {
    var A, T, $, L;
    if (H(D))
      A = D, L = {};
    else {
      L = D, A = L.name;
      var P = L.ordinalMeta;
      L.ordinalMeta = null, L = N({}, L), L.ordinalMeta = P, T = L.dimsDef, $ = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null;
    }
    var R = c.get(A);
    if (R !== !1) {
      if (R = kt(R), !R.length)
        for (var E = 0; E < (T && T.length || 1); E++) {
          for (; g < o && v(g).coordDim != null; )
            g++;
          g < o && R.push(g++);
        }
      C(R, function(G, k) {
        var F = v(G);
        if (l && L.type != null && (F.type = L.type), p(ht(F, L), A, k), F.name == null && T) {
          var W = T[k];
          !V(W) && (W = {
            name: W
          }), F.name = F.displayName = W.name, F.defaultTooltip = W.defaultTooltip;
        }
        $ && ht(F.otherDims, $);
      });
    }
  });
  function p(D, A, T) {
    Zm.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, i.set(A, !0));
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
      var x = v(w), M = x.coordDim;
      M == null && (x.coordDim = CA(b, i, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (Jm(e, w) === ae.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return xA(a), new t0({
    source: e,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function xA(e) {
  for (var t = Q(), r = 0; r < e.length; r++) {
    var n = e[r], i = n.name, a = t.get(i) || 0;
    a > 0 && (n.name = i + (a - 1)), a++, t.set(i, a);
  }
}
function TA(e, t, r, n) {
  var i = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, n || 0);
  return C(t, function(a) {
    var o;
    V(a) && (o = a.dimsDef) && (i = Math.max(i, o.length));
  }), i;
}
function CA(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var n = 0; t.hasKey(e + n); )
      n++;
    e += n;
  }
  return t.set(e, !0), e;
}
var MA = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.coordSysDims = [], this.axisMap = Q(), this.categoryAxisMap = Q(), this.coordSysName = t;
    }
    return e;
  }()
);
function DA(e) {
  var t = e.get("coordinateSystem"), r = new MA(t), n = AA[t];
  if (n)
    return n(e, r, r.axisMap, r.categoryAxisMap), r;
}
var AA = {
  cartesian2d: function(e, t, r, n) {
    var i = e.getReferringComponents("xAxis", Le).models[0], a = e.getReferringComponents("yAxis", Le).models[0];
    t.coordSysDims = ["x", "y"], r.set("x", i), r.set("y", a), oi(i) && (n.set("x", i), t.firstCategoryDimIndex = 0), oi(a) && (n.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(e, t, r, n) {
    var i = e.getReferringComponents("singleAxis", Le).models[0];
    t.coordSysDims = ["single"], r.set("single", i), oi(i) && (n.set("single", i), t.firstCategoryDimIndex = 0);
  },
  polar: function(e, t, r, n) {
    var i = e.getReferringComponents("polar", Le).models[0], a = i.findAxisModel("radiusAxis"), o = i.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], r.set("radius", a), r.set("angle", o), oi(a) && (n.set("radius", a), t.firstCategoryDimIndex = 0), oi(o) && (n.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(e, t, r, n) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(e, t, r, n) {
    var i = e.ecModel, a = i.getComponent("parallel", e.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    C(a.parallelAxisIndex, function(s, l) {
      var u = i.getComponent("parallelAxis", s), h = o[l];
      r.set(h, u), oi(u) && (n.set(h, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function oi(e) {
  return e.get("type") === "category";
}
function IA(e, t, r) {
  r = r || {};
  var n = r.byIndex, i = r.stackedCoordDimension, a, o, s;
  $A(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(e && e.get("stack")), u, h, c, f;
  if (C(a, function(m, _) {
    H(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!n && !u && m.ordinalMeta && (u = m), !h && m.type !== "ordinal" && m.type !== "time" && (!i || i === m.coordDim) && (h = m));
  }), h && !n && !u && (n = !0), h) {
    c = "__\0ecstackresult_" + e.id, f = "__\0ecstackedover_" + e.id, u && (u.createInvertedIndices = !0);
    var d = h.coordDim, v = h.type, g = 0;
    C(a, function(m) {
      m.coordDim === d && g++;
    });
    var p = {
      name: c,
      coordDim: d,
      coordDimIndex: g,
      type: v,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, y = {
      name: f,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: f,
      coordDimIndex: g + 1,
      type: v,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (p.storeDimIndex = s.ensureCalculationDimension(f, v), y.storeDimIndex = s.ensureCalculationDimension(c, v)), o.appendCalculationDimension(p), o.appendCalculationDimension(y)) : (a.push(p), a.push(y));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: n,
    stackedOverDimension: f,
    stackResultDimension: c
  };
}
function $A(e) {
  return !e0(e.schema);
}
function ki(e, t) {
  return !!t && t === e.getCalculationInfo("stackedDimension");
}
function LA(e, t) {
  return ki(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
function PA(e, t) {
  var r = e.get("coordinateSystem"), n = Rl.get(r), i;
  return t && t.coordSysDims && (i = Y(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = dA(l);
    }
    return o;
  })), i || (i = n && (n.getDimensionsInfo ? n.getDimensionsInfo() : n.dimensions.slice()) || ["x", "y"]), i;
}
function RA(e, t, r) {
  var n, i;
  return r && C(e, function(a, o) {
    var s = a.coordDim, l = r.categoryAxisMap.get(s);
    l && (n == null && (n = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (i = !0);
  }), !i && n != null && (e[n].otherDims.itemName = 0), n;
}
function Nl(e, t, r) {
  r = r || {};
  var n = t.getSourceManager(), i, a = !1;
  i = n.getSource(), a = i.sourceFormat === Te;
  var o = DA(t), s = PA(t, o), l = r.useEncodeDefaulter, u = Z(l) ? l : l ? It(MC, s, t) : null, h = {
    coordDimensions: s,
    generateCoord: r.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, c = SA(i, h), f = RA(c.dimensions, r.createInvertedIndices, o), d = a ? null : n.getSharedDataStore(c), v = IA(t, {
    schema: c,
    store: d
  }), g = new wA(c, t);
  g.setCalculationInfo(v);
  var p = f != null && OA(i) ? function(y, m, _, b) {
    return b === f ? _ : this.defaultDimValueGetter(y, m, _, b);
  } : null;
  return g.hasItemOption = !1, g.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? i : d,
    null,
    p
  ), g;
}
function OA(e) {
  if (e.sourceFormat === Te) {
    var t = EA(e.data || []);
    return !z(po(t));
  }
}
function EA(e) {
  for (var t = 0; t < e.length && e[t] == null; )
    t++;
  return e[t];
}
var ir = (
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
dl(ir);
var kA = 0, uc = (
  /** @class */
  function() {
    function e(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++kA;
    }
    return e.createByAxisModel = function(t) {
      var r = t.option, n = r.data, i = n && Y(n, NA);
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
function NA(e) {
  return V(e) && e.value != null ? e.value : e + "";
}
function hc(e) {
  return e.type === "interval" || e.type === "log";
}
function BA(e, t, r, n) {
  var i = {}, a = e[1] - e[0], o = i.interval = Zy(a / t);
  r != null && o < r && (o = i.interval = r), n != null && o > n && (o = i.interval = n);
  var s = i.intervalPrecision = a0(o), l = i.niceTickExtent = [At(Math.ceil(e[0] / o) * o, s), At(Math.floor(e[1] / o) * o, s)];
  return zA(l, e), i;
}
function Ju(e) {
  var t = Math.pow(10, Xc(e)), r = e / t;
  return r ? r === 2 ? r = 3 : r === 3 ? r = 5 : r *= 2 : r = 1, At(r * t);
}
function a0(e) {
  return lr(e) + 2;
}
function Ep(e, t, r) {
  e[t] = Math.max(Math.min(e[t], r[1]), r[0]);
}
function zA(e, t) {
  !isFinite(e[0]) && (e[0] = t[0]), !isFinite(e[1]) && (e[1] = t[1]), Ep(e, 0, t), Ep(e, 1, t), e[0] > e[1] && (e[0] = e[1]);
}
function Bl(e, t) {
  return e >= t[0] && e <= t[1];
}
function zl(e, t) {
  return t[1] === t[0] ? 0.5 : (e - t[0]) / (t[1] - t[0]);
}
function Fl(e, t) {
  return e * (t[1] - t[0]) + t[0];
}
var If = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      n.type = "ordinal";
      var i = n.getSetting("ordinalMeta");
      return i || (i = new uc({})), z(i) && (i = new uc({
        categories: Y(i, function(a) {
          return V(a) ? a.value : a;
        })
      })), n._ordinalMeta = i, n._extent = n.getSetting("extent") || [0, i.categories.length - 1], n;
    }
    return t.prototype.parse = function(r) {
      return r == null ? NaN : H(r) ? this._ordinalMeta.getOrdinal(r) : Math.round(r);
    }, t.prototype.contain = function(r) {
      return r = this.parse(r), Bl(r, this._extent) && this._ordinalMeta.categories[r] != null;
    }, t.prototype.normalize = function(r) {
      return r = this._getTickNumber(this.parse(r)), zl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Math.round(Fl(r, this._extent)), this.getRawOrdinalNumber(r);
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
  }(ir)
);
ir.registerClass(If);
var bn = At, Yi = (
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
      return Bl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return zl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return Fl(r, this._extent);
    }, t.prototype.setExtent = function(r, n) {
      var i = this._extent;
      isNaN(r) || (i[0] = parseFloat(r)), isNaN(n) || (i[1] = parseFloat(n));
    }, t.prototype.unionExtent = function(r) {
      var n = this._extent;
      r[0] < n[0] && (n[0] = r[0]), r[1] > n[1] && (n[1] = r[1]), this.setExtent(n[0], n[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(r) {
      this._interval = r, this._niceExtent = this._extent.slice(), this._intervalPrecision = a0(r);
    }, t.prototype.getTicks = function(r) {
      var n = this._interval, i = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!n)
        return s;
      var l = 1e4;
      i[0] < a[0] && (r ? s.push({
        value: bn(a[0] - n, o)
      }) : s.push({
        value: i[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = bn(u + n, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var h = s.length ? s[s.length - 1].value : a[1];
      return i[1] > h && (r ? s.push({
        value: bn(h + n, o)
      }) : s.push({
        value: i[1]
      })), s;
    }, t.prototype.getMinorTicks = function(r) {
      for (var n = this.getTicks(!0), i = [], a = this.getExtent(), o = 1; o < n.length; o++) {
        for (var s = n[o], l = n[o - 1], u = 0, h = [], c = s.value - l.value, f = c / r; u < r - 1; ) {
          var d = bn(l.value + (u + 1) * f);
          d > a[0] && d < a[1] && h.push(d), u++;
        }
        i.push(h);
      }
      return i;
    }, t.prototype.getLabel = function(r, n) {
      if (r == null)
        return "";
      var i = n && n.precision;
      i == null ? i = lr(r.value) || 0 : i === "auto" && (i = this._intervalPrecision);
      var a = bn(r.value, i, !0);
      return Um(a);
    }, t.prototype.calcNiceTicks = function(r, n, i) {
      r = r || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = BA(a, r, n, i);
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
      r.fixMin || (n[0] = bn(Math.floor(n[0] / o) * o)), r.fixMax || (n[1] = bn(Math.ceil(n[1] / o) * o));
    }, t.prototype.setNiceExtent = function(r, n) {
      this._niceExtent = [r, n];
    }, t.type = "interval", t;
  }(ir)
);
ir.registerClass(Yi);
var o0 = typeof Float32Array < "u", FA = o0 ? Float32Array : Array;
function ur(e) {
  return z(e) ? o0 ? new Float32Array(e) : e : new FA(e);
}
var HA = "__ec_stack_";
function s0(e) {
  return e.get("stack") || HA + e.seriesIndex;
}
function $f(e) {
  return e.dim + e.index;
}
function l0(e, t) {
  var r = [];
  return t.eachSeriesByType(e, function(n) {
    h0(n) && r.push(n);
  }), r;
}
function VA(e) {
  var t = {};
  C(e, function(l) {
    var u = l.coordinateSystem, h = u.getBaseAxis();
    if (!(h.type !== "time" && h.type !== "value"))
      for (var c = l.getData(), f = h.dim + "_" + h.index, d = c.getDimensionIndex(c.mapDimension(h.dim)), v = c.getStore(), g = 0, p = v.count(); g < p; ++g) {
        var y = v.get(d, g);
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
function u0(e) {
  var t = VA(e), r = [];
  return C(e, function(n) {
    var i = n.coordinateSystem, a = i.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], h = Math.abs(o[1] - o[0]), c = a.scale.getExtent(), f = Math.abs(c[1] - c[0]);
      s = u ? h / f * u : h;
    } else {
      var d = n.getData();
      s = Math.abs(o[1] - o[0]) / d.count();
    }
    var v = Yt(n.get("barWidth"), s), g = Yt(n.get("barMaxWidth"), s), p = Yt(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      n.get("barMinWidth") || (c0(n) ? 0.5 : 1),
      s
    ), y = n.get("barGap"), m = n.get("barCategoryGap");
    r.push({
      bandWidth: s,
      barWidth: v,
      barMaxWidth: g,
      barMinWidth: p,
      barGap: y,
      barCategoryGap: m,
      axisKey: $f(a),
      stackId: s0(n)
    });
  }), GA(r);
}
function GA(e) {
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
    var d = n.barGap;
    d != null && (s.gap = d);
    var v = n.barCategoryGap;
    v != null && (s.categoryGap = v);
  });
  var r = {};
  return C(t, function(n, i) {
    r[i] = {};
    var a = n.stacks, o = n.bandWidth, s = n.categoryGap;
    if (s == null) {
      var l = _t(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = Yt(s, o), h = Yt(n.gap, 1), c = n.remainedWidth, f = n.autoWidthCount, d = (c - u) / (f + (f - 1) * h);
    d = Math.max(d, 0), C(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var b = y.width;
        m && (b = Math.min(b, m)), _ && (b = Math.max(b, _)), y.width = b, c -= b + h * b, f--;
      } else {
        var b = d;
        m && m < b && (b = Math.min(m, c)), _ && _ > b && (b = _), b !== d && (y.width = b, c -= b + h * b, f--);
      }
    }), d = (c - u) / (f + (f - 1) * h), d = Math.max(d, 0);
    var v = 0, g;
    C(a, function(y, m) {
      y.width || (y.width = d), g = y, v += y.width * (1 + h);
    }), g && (v -= g.width * h);
    var p = -v / 2;
    C(a, function(y, m) {
      r[i][m] = r[i][m] || {
        bandWidth: o,
        offset: p,
        width: y.width
      }, p += y.width * (1 + h);
    });
  }), r;
}
function WA(e, t, r) {
  if (e && t) {
    var n = e[$f(t)];
    return n;
  }
}
function UA(e, t) {
  var r = l0(e, t), n = u0(r);
  C(r, function(i) {
    var a = i.getData(), o = i.coordinateSystem, s = o.getBaseAxis(), l = s0(i), u = n[$f(s)][l], h = u.offset, c = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: h,
      size: c
    });
  });
}
function YA(e) {
  return {
    seriesType: e,
    plan: Sf(),
    reset: function(t) {
      if (h0(t)) {
        var r = t.getData(), n = t.coordinateSystem, i = n.getBaseAxis(), a = n.getOtherAxis(i), o = r.getDimensionIndex(r.mapDimension(a.dim)), s = r.getDimensionIndex(r.mapDimension(i.dim)), l = t.get("showBackground", !0), u = r.mapDimension(a.dim), h = r.getCalculationInfo("stackResultDimension"), c = ki(r, u) && !!r.getCalculationInfo("stackedOnSeries"), f = a.isHorizontal(), d = XA(i, a), v = c0(t), g = t.get("barMinHeight") || 0, p = h && r.getDimensionIndex(h), y = r.getLayout("size"), m = r.getLayout("offset");
        return {
          progress: function(_, b) {
            for (var S = _.count, w = v && ur(S * 3), x = v && l && ur(S * 3), M = v && ur(S), D = n.master.getRect(), A = f ? D.width : D.height, T, $ = b.getStore(), L = 0; (T = _.next()) != null; ) {
              var P = $.get(c ? p : o, T), R = $.get(s, T), E = d, G = void 0;
              c && (G = +P - $.get(o, T));
              var k = void 0, F = void 0, W = void 0, j = void 0;
              if (f) {
                var nt = n.dataToPoint([P, R]);
                if (c) {
                  var vt = n.dataToPoint([G, R]);
                  E = vt[0];
                }
                k = E, F = nt[1] + m, W = nt[0] - E, j = y, Math.abs(W) < g && (W = (W < 0 ? -1 : 1) * g);
              } else {
                var nt = n.dataToPoint([R, P]);
                if (c) {
                  var vt = n.dataToPoint([R, G]);
                  E = vt[1];
                }
                k = nt[0] + m, F = E, W = y, j = nt[1] - E, Math.abs(j) < g && (j = (j <= 0 ? -1 : 1) * g);
              }
              v ? (w[L] = k, w[L + 1] = F, w[L + 2] = f ? W : j, x && (x[L] = f ? D.x : k, x[L + 1] = f ? F : D.y, x[L + 2] = A), M[T] = T) : b.setItemLayout(T, {
                x: k,
                y: F,
                width: W,
                height: j
              }), L += 3;
            }
            v && b.setLayout({
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
function h0(e) {
  return e.coordinateSystem && e.coordinateSystem.type === "cartesian2d";
}
function c0(e) {
  return e.pipelineContext && e.pipelineContext.large;
}
function XA(e, t) {
  var r = t.model.get("startValue");
  return r || (r = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? r > 0 ? r : 1 : r));
}
var qA = function(e, t, r, n) {
  for (; r < n; ) {
    var i = r + n >>> 1;
    e[i][1] < t ? r = i + 1 : n = i;
  }
  return r;
}, f0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "time", n;
    }
    return t.prototype.getLabel = function(r) {
      var n = this.getSetting("useUTC");
      return Dl(r.value, Dv[pC(Ci(this._minLevelUnit))] || Dv.second, n, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(r, n, i) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return gC(r, n, i, o, a);
    }, t.prototype.getTicks = function() {
      var r = this._interval, n = this._extent, i = [];
      if (!r)
        return i;
      i.push({
        value: n[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = e2(this._minLevelUnit, this._approxInterval, a, n);
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
      var s = Qo.length, l = Math.min(qA(Qo, this._approxInterval, 0, s), s - 1);
      this._interval = Qo[l][1], this._minLevelUnit = Qo[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(r) {
      return bt(r) ? r : +vr(r);
    }, t.prototype.contain = function(r) {
      return Bl(this.parse(r), this._extent);
    }, t.prototype.normalize = function(r) {
      return zl(this.parse(r), this._extent);
    }, t.prototype.scale = function(r) {
      return Fl(r, this._extent);
    }, t.type = "time", t;
  }(Yi)
), Qo = [
  // Format                           interval
  ["second", df],
  ["minute", vf],
  ["hour", ka],
  ["quarter-day", ka * 6],
  ["half-day", ka * 12],
  ["day", _e * 1.2],
  ["half-week", _e * 3.5],
  ["week", _e * 7],
  ["month", _e * 31],
  ["quarter", _e * 95],
  ["half-year", Mv / 2],
  ["year", Mv]
  // 1Y
];
function ZA(e, t, r, n) {
  var i = vr(t), a = vr(r), o = function(v) {
    return Av(i, v, n) === Av(a, v, n);
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
  }, d = function() {
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
      return d();
  }
}
function KA(e, t) {
  return e /= _e, e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1;
}
function jA(e) {
  var t = 30 * _e;
  return e /= t, e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1;
}
function QA(e) {
  return e /= ka, e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1;
}
function kp(e, t) {
  return e /= t ? vf : df, e > 30 ? 30 : e > 20 ? 20 : e > 15 ? 15 : e > 10 ? 10 : e > 5 ? 5 : e > 2 ? 2 : 1;
}
function JA(e) {
  return Zy(e);
}
function t2(e, t, r) {
  var n = new Date(e);
  switch (Ci(t)) {
    case "year":
    case "month":
      n[zm(r)](0);
    case "day":
      n[Fm(r)](1);
    case "hour":
      n[Hm(r)](0);
    case "minute":
      n[Vm(r)](0);
    case "second":
      n[Gm(r)](0), n[Wm(r)](0);
  }
  return n.getTime();
}
function e2(e, t, r, n) {
  var i = 1e4, a = Nm, o = 0;
  function s(A, T, $, L, P, R, E) {
    for (var G = new Date(T), k = T, F = G[L](); k < $ && k <= n[1]; )
      E.push({
        value: k
      }), F += A, G[P](F), k = G.getTime();
    E.push({
      value: k,
      notAdd: !0
    });
  }
  function l(A, T, $) {
    var L = [], P = !T.length;
    if (!ZA(Ci(A), n[0], n[1], r)) {
      P && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: t2(new Date(n[0]), A, r)
      }, {
        value: n[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var E = T[R].value, G = T[R + 1].value;
        if (E !== G) {
          var k = void 0, F = void 0, W = void 0, j = !1;
          switch (A) {
            case "year":
              k = Math.max(1, Math.round(t / _e / 365)), F = pf(r), W = yC(r);
              break;
            case "half-year":
            case "quarter":
            case "month":
              k = jA(t), F = Mi(r), W = zm(r);
              break;
            case "week":
            case "half-week":
            case "day":
              k = KA(t), F = Al(r), W = Fm(r), j = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              k = QA(t), F = to(r), W = Hm(r);
              break;
            case "minute":
              k = kp(t, !0), F = Il(r), W = Vm(r);
              break;
            case "second":
              k = kp(t, !1), F = $l(r), W = Gm(r);
              break;
            case "millisecond":
              k = JA(t), F = Ll(r), W = Wm(r);
              break;
          }
          s(k, E, G, F, W, j, L), A === "year" && $.length > 1 && R === 0 && $.unshift({
            value: $[0].value - k
          });
        }
      }
      for (var R = 0; R < L.length; R++)
        $.push(L[R]);
      return L;
    }
  }
  for (var u = [], h = [], c = 0, f = 0, d = 0; d < a.length && o++ < i; ++d) {
    var v = Ci(a[d]);
    if (vC(a[d])) {
      l(a[d], u[u.length - 1] || [], h);
      var g = a[d + 1] ? Ci(a[d + 1]) : null;
      if (v !== g) {
        if (h.length) {
          f = c, h.sort(function(A, T) {
            return A.value - T.value;
          });
          for (var p = [], y = 0; y < h.length; ++y) {
            var m = h[y].value;
            (y === 0 || h[y - 1].value !== m) && (p.push(h[y]), m >= n[0] && m <= n[1] && c++);
          }
          var _ = (n[1] - n[0]) / t;
          if (c > _ * 1.5 && f > _ / 1.5 || (u.push(p), c > _ || e === a[d]))
            break;
        }
        h = [];
      }
    }
  }
  for (var b = Ot(Y(u, function(A) {
    return Ot(A, function(T) {
      return T.value >= n[0] && T.value <= n[1] && !T.notAdd;
    });
  }), function(A) {
    return A.length > 0;
  }), S = [], w = b.length - 1, d = 0; d < b.length; ++d)
    for (var x = b[d], M = 0; M < x.length; ++M)
      S.push({
        value: x[M].value,
        level: w - d
      });
  S.sort(function(A, T) {
    return A.value - T.value;
  });
  for (var D = [], d = 0; d < S.length; ++d)
    (d === 0 || S[d].value !== S[d - 1].value) && D.push(S[d]);
  return D;
}
ir.registerClass(f0);
var Np = ir.prototype, Fa = Yi.prototype, r2 = At, n2 = Math.floor, i2 = Math.ceil, Jo = Math.pow, De = Math.log, Lf = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "log", r.base = 10, r._originalScale = new Yi(), r._interval = 0, r;
    }
    return t.prototype.getTicks = function(r) {
      var n = this._originalScale, i = this._extent, a = n.getExtent(), o = Fa.getTicks.call(this, r);
      return Y(o, function(s) {
        var l = s.value, u = At(Jo(this.base, l));
        return u = l === i[0] && this._fixMin ? ts(u, a[0]) : u, u = l === i[1] && this._fixMax ? ts(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(r, n) {
      var i = De(this.base);
      r = De(Math.max(0, r)) / i, n = De(Math.max(0, n)) / i, Fa.setExtent.call(this, r, n);
    }, t.prototype.getExtent = function() {
      var r = this.base, n = Np.getExtent.call(this);
      n[0] = Jo(r, n[0]), n[1] = Jo(r, n[1]);
      var i = this._originalScale, a = i.getExtent();
      return this._fixMin && (n[0] = ts(n[0], a[0])), this._fixMax && (n[1] = ts(n[1], a[1])), n;
    }, t.prototype.unionExtent = function(r) {
      this._originalScale.unionExtent(r);
      var n = this.base;
      r[0] = De(r[0]) / De(n), r[1] = De(r[1]) / De(n), Np.unionExtent.call(this, r);
    }, t.prototype.unionExtentFromData = function(r, n) {
      this.unionExtent(r.getApproximateExtent(n));
    }, t.prototype.calcNiceTicks = function(r) {
      r = r || 10;
      var n = this._extent, i = n[1] - n[0];
      if (!(i === 1 / 0 || i <= 0)) {
        var a = SS(i), o = r / i * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [At(i2(n[0] / a) * a), At(n2(n[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(r) {
      Fa.calcNiceExtent.call(this, r), this._fixMin = r.fixMin, this._fixMax = r.fixMax;
    }, t.prototype.parse = function(r) {
      return r;
    }, t.prototype.contain = function(r) {
      return r = De(r) / De(this.base), Bl(r, this._extent);
    }, t.prototype.normalize = function(r) {
      return r = De(r) / De(this.base), zl(r, this._extent);
    }, t.prototype.scale = function(r) {
      return r = Fl(r, this._extent), Jo(this.base, r);
    }, t.type = "log", t;
  }(ir)
), d0 = Lf.prototype;
d0.getMinorTicks = Fa.getMinorTicks;
d0.getLabel = Fa.getLabel;
function ts(e, t) {
  return r2(e, lr(t));
}
ir.registerClass(Lf);
var a2 = (
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
      Z(o) ? this._modelMinNum = es(t, o({
        min: n[0],
        max: n[1]
      })) : o !== "dataMin" && (this._modelMinNum = es(t, o));
      var s = this._modelMaxRaw = r.get("max", !0);
      if (Z(s) ? this._modelMaxNum = es(t, s({
        min: n[0],
        max: n[1]
      })) : s !== "dataMax" && (this._modelMaxNum = es(t, s)), i)
        this._axisDataLen = r.getCategories().length;
      else {
        var l = r.get("boundaryGap"), u = z(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [Ke(u[0], 1), Ke(u[1], 1)];
      }
    }, e.prototype.calculate = function() {
      var t = this._isOrdinal, r = this._dataMin, n = this._dataMax, i = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : n - r || Math.abs(r), s = this._modelMinRaw === "dataMin" ? r : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? n : this._modelMaxNum, u = s != null, h = l != null;
      s == null && (s = t ? i ? 0 : NaN : r - a[0] * o), l == null && (l = t ? i ? i - 1 : NaN : n + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var c = Rs(s) || Rs(l) || t && !i;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !h && (l = 0));
      var f = this._determinedMin, d = this._determinedMax;
      return f != null && (s = f, u = !0), d != null && (l = d, h = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: h,
        isBlank: c
      };
    }, e.prototype.modifyDataMinMax = function(t, r) {
      this[s2[t]] = r;
    }, e.prototype.setDeterminedMinMax = function(t, r) {
      var n = o2[t];
      this[n] = r;
    }, e.prototype.freeze = function() {
      this.frozen = !0;
    }, e;
  }()
), o2 = {
  min: "_determinedMin",
  max: "_determinedMax"
}, s2 = {
  min: "_dataMin",
  max: "_dataMax"
};
function l2(e, t, r) {
  var n = e.rawExtentInfo;
  return n || (n = new a2(e, t, r), e.rawExtentInfo = n, n);
}
function es(e, t) {
  return t == null ? null : Rs(t) ? NaN : e.parse(t);
}
function v0(e, t) {
  var r = e.type, n = l2(e, t, e.getExtent()).calculate();
  e.setBlank(n.isBlank);
  var i = n.min, a = n.max, o = t.ecModel;
  if (o && r === "time") {
    var s = l0("bar", o), l = !1;
    if (C(s, function(c) {
      l = l || c.getBaseAxis() === t.axis;
    }), l) {
      var u = u0(s), h = u2(i, a, t, u);
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
function u2(e, t, r, n) {
  var i = r.axis.getExtent(), a = Math.abs(i[1] - i[0]), o = WA(n, r.axis);
  if (o === void 0)
    return {
      min: e,
      max: t
    };
  var s = 1 / 0;
  C(o, function(d) {
    s = Math.min(d.offset, s);
  });
  var l = -1 / 0;
  C(o, function(d) {
    l = Math.max(d.offset + d.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, h = t - e, c = 1 - (s + l) / a, f = h / c - h;
  return t += f * (l / u), e -= f * (s / u), {
    min: e,
    max: t
  };
}
function Bp(e, t) {
  var r = t, n = v0(e, r), i = n.extent, a = r.get("splitNumber");
  e instanceof Lf && (e.base = r.get("logBase"));
  var o = e.type, s = r.get("interval"), l = o === "interval" || o === "time";
  e.setExtent(i[0], i[1]), e.calcNiceExtent({
    splitNumber: a,
    fixMin: n.fixMin,
    fixMax: n.fixMax,
    minInterval: l ? r.get("minInterval") : null,
    maxInterval: l ? r.get("maxInterval") : null
  }), s != null && e.setInterval && e.setInterval(s);
}
function h2(e, t) {
  if (t = t || e.get("type"), t)
    switch (t) {
      case "category":
        return new If({
          ordinalMeta: e.getOrdinalMeta ? e.getOrdinalMeta() : e.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new f0({
          locale: e.ecModel.getLocaleModel(),
          useUTC: e.ecModel.get("useUTC")
        });
      default:
        return new (ir.getClass(t) || Yi)();
    }
}
function c2(e) {
  var t = e.scale.getExtent(), r = t[0], n = t[1];
  return !(r > 0 && n > 0 || r < 0 && n < 0);
}
function Xi(e) {
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
      return r != null && (a = i.value - r), n(Pf(e, i), a, i.level != null ? {
        level: i.level
      } : null);
    };
  }(t) : function(n) {
    return e.scale.getLabel(n);
  };
}
function Pf(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function f2(e) {
  var t = e.model, r = e.scale;
  if (!(!t.get(["axisLabel", "show"]) || r.isBlank())) {
    var n, i, a = r.getExtent();
    r instanceof If ? i = r.count() : (n = r.getTicks(), i = n.length);
    var o = e.getLabelModel(), s = Xi(e), l, u = 1;
    i > 40 && (u = Math.ceil(i / 40));
    for (var h = 0; h < i; h += u) {
      var c = n ? n[h] : {
        value: a[0] + h
      }, f = s(c, h), d = o.getTextRect(f), v = d2(d, o.get("rotate") || 0);
      l ? l.union(v) : l = v;
    }
    return l;
  }
}
function d2(e, t) {
  var r = t * Math.PI / 180, n = e.width, i = e.height, a = n * Math.abs(Math.cos(r)) + Math.abs(i * Math.sin(r)), o = n * Math.abs(Math.sin(r)) + Math.abs(i * Math.cos(r)), s = new ut(e.x, e.y, a, o);
  return s;
}
function Rf(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function p0(e) {
  return e.type === "category" && Rf(e.getLabelModel()) === 0;
}
function v2(e, t) {
  var r = {};
  return C(e.mapDimensionsAll(t), function(n) {
    r[LA(e, n)] = !0;
  }), _t(r);
}
var p2 = (
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
), zp = [], g2 = {
  registerPreprocessor: j_,
  registerProcessor: Q_,
  registerPostInit: iA,
  registerPostUpdate: aA,
  registerUpdateLifecycle: Df,
  registerAction: Ui,
  registerCoordinateSystem: oA,
  registerLayout: sA,
  registerVisual: Fn,
  registerTransform: uA,
  registerLoading: J_,
  registerMap: lA,
  registerImpl: BD,
  PRIORITY: jD,
  ComponentModel: ct,
  ComponentView: ke,
  SeriesModel: Ee,
  ChartView: Se,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(e) {
    ct.registerClass(e);
  },
  registerComponentView: function(e) {
    ke.registerClass(e);
  },
  registerSeriesModel: function(e) {
    Ee.registerClass(e);
  },
  registerChartView: function(e) {
    Se.registerClass(e);
  },
  registerSubTypeDefaulter: function(e, t) {
    ct.registerSubTypeDefaulter(e, t);
  },
  registerPainter: function(e, t) {
    gS(e, t);
  }
};
function Qe(e) {
  if (z(e)) {
    C(e, function(t) {
      Qe(t);
    });
    return;
  }
  pt(zp, e) >= 0 || (zp.push(e), Z(e) && (e = {
    install: e
  }), e.install(g2));
}
var oo = Lt();
function g0(e, t) {
  var r = Y(t, function(n) {
    return e.scale.parse(n);
  });
  return e.type === "time" && r.length > 0 && (r.sort(), r.unshift(r[0]), r.push(r[r.length - 1])), r;
}
function y2(e) {
  var t = e.getLabelModel().get("customValues");
  if (t) {
    var r = Xi(e), n = e.scale.getExtent(), i = g0(e, t), a = Ot(i, function(o) {
      return o >= n[0] && o <= n[1];
    });
    return {
      labels: Y(a, function(o) {
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
  return e.type === "category" ? _2(e) : w2(e);
}
function m2(e, t) {
  var r = e.getTickModel().get("customValues");
  if (r) {
    var n = e.scale.getExtent(), i = g0(e, r);
    return {
      ticks: Ot(i, function(a) {
        return a >= n[0] && a <= n[1];
      })
    };
  }
  return e.type === "category" ? b2(e, t) : {
    ticks: Y(e.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function _2(e) {
  var t = e.getLabelModel(), r = y0(e, t);
  return !t.get("show") || e.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: r.labelCategoryInterval
  } : r;
}
function y0(e, t) {
  var r = m0(e, "labels"), n = Rf(t), i = _0(r, n);
  if (i)
    return i;
  var a, o;
  return Z(n) ? a = S0(e, n) : (o = n === "auto" ? S2(e) : n, a = w0(e, o)), b0(r, n, {
    labels: a,
    labelCategoryInterval: o
  });
}
function b2(e, t) {
  var r = m0(e, "ticks"), n = Rf(t), i = _0(r, n);
  if (i)
    return i;
  var a, o;
  if ((!t.get("show") || e.scale.isBlank()) && (a = []), Z(n))
    a = S0(e, n, !0);
  else if (n === "auto") {
    var s = y0(e, e.getLabelModel());
    o = s.labelCategoryInterval, a = Y(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = n, a = w0(e, o, !0);
  return b0(r, n, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function w2(e) {
  var t = e.scale.getTicks(), r = Xi(e);
  return {
    labels: Y(t, function(n, i) {
      return {
        level: n.level,
        formattedLabel: r(n, i),
        rawLabel: e.scale.getLabel(n),
        tickValue: n.value
      };
    })
  };
}
function m0(e, t) {
  return oo(e)[t] || (oo(e)[t] = []);
}
function _0(e, t) {
  for (var r = 0; r < e.length; r++)
    if (e[r].key === t)
      return e[r].value;
}
function b0(e, t, r) {
  return e.push({
    key: t,
    value: r
  }), r;
}
function S2(e) {
  var t = oo(e).autoInterval;
  return t ?? (oo(e).autoInterval = e.calculateCategoryInterval());
}
function x2(e) {
  var t = T2(e), r = Xi(e), n = (t.axisRotate - t.labelRotate) / 180 * Math.PI, i = e.scale, a = i.getExtent(), o = i.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = e.dataToCoord(l + 1) - e.dataToCoord(l), h = Math.abs(u * Math.cos(n)), c = Math.abs(u * Math.sin(n)), f = 0, d = 0; l <= a[1]; l += s) {
    var v = 0, g = 0, p = Uc(r({
      value: l
    }), t.font, "center", "top");
    v = p.width * 1.3, g = p.height * 1.3, f = Math.max(f, v, 7), d = Math.max(d, g, 7);
  }
  var y = f / h, m = d / c;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), b = oo(e.model), S = e.getExtent(), w = b.lastAutoInterval, x = b.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && b.axisExtent0 === S[0] && b.axisExtent1 === S[1] ? _ = w : (b.lastTickCount = o, b.lastAutoInterval = _, b.axisExtent0 = S[0], b.axisExtent1 = S[1]), _;
}
function T2(e) {
  var t = e.getLabelModel();
  return {
    axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function w0(e, t, r) {
  var n = Xi(e), i = e.scale, a = i.getExtent(), o = e.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], h = i.count();
  u !== 0 && l > 1 && h / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var c = p0(e), f = o.get("showMinLabel") || c, d = o.get("showMaxLabel") || c;
  f && u !== a[0] && g(a[0]);
  for (var v = u; v <= a[1]; v += l)
    g(v);
  d && v - l !== a[1] && g(a[1]);
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
function S0(e, t, r) {
  var n = e.scale, i = Xi(e), a = [];
  return C(n.getTicks(), function(o) {
    var s = n.getLabel(o), l = o.value;
    t(o.value, s) && a.push(r ? l : {
      formattedLabel: i(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Fp = [0, 1], C2 = (
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
      return _S(t || this.scale.getExtent(), this._extent);
    }, e.prototype.setExtent = function(t, r) {
      var n = this._extent;
      n[0] = t, n[1] = r;
    }, e.prototype.dataToCoord = function(t, r) {
      var n = this._extent, i = this.scale;
      return t = i.normalize(t), this.onBand && i.type === "ordinal" && (n = n.slice(), Hp(n, i.count())), dr(t, Fp, n, r);
    }, e.prototype.coordToData = function(t, r) {
      var n = this._extent, i = this.scale;
      this.onBand && i.type === "ordinal" && (n = n.slice(), Hp(n, i.count()));
      var a = dr(t, n, Fp, r);
      return this.scale.scale(a);
    }, e.prototype.pointToData = function(t, r) {
    }, e.prototype.getTicksCoords = function(t) {
      t = t || {};
      var r = t.tickModel || this.getTickModel(), n = m2(this, r), i = n.ticks, a = Y(i, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = r.get("alignWithLabel");
      return M2(this, a, o, t.clamp), a;
    }, e.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), r = t.get("splitNumber");
      r > 0 && r < 100 || (r = 5);
      var n = this.scale.getMinorTicks(r), i = Y(n, function(a) {
        return Y(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return i;
    }, e.prototype.getViewLabels = function() {
      return y2(this).labels;
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
      return x2(this);
    }, e;
  }()
);
function Hp(e, t) {
  var r = e[1] - e[0], n = t, i = r / n / 2;
  e[0] += i, e[1] -= i;
}
function M2(e, t, r, n) {
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
    C(t, function(d) {
      d.coord -= u / 2;
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
  function f(d, v) {
    return d = At(d), v = At(v), c ? d > v : d < v;
  }
}
function D2(e) {
  for (var t = [], r = 0; r < e.length; r++) {
    var n = e[r];
    if (!n.defaultAttr.ignore) {
      var i = n.label, a = i.getComputedTransform(), o = i.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = i.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var h = s ? new Xs(o, a) : null;
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
function A2(e) {
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
    for (var c = a.obb, f = !1, d = 0; d < t.length; d++) {
      var v = t[d];
      if (r.intersect(v.rect)) {
        if (o && v.axisAligned) {
          f = !0;
          break;
        }
        if (v.obb || (v.obb = new Xs(v.localRect, v.transform)), c || (c = new Xs(s, l)), c.intersect(v.obb)) {
          f = !0;
          break;
        }
      }
    }
    f ? (n(u), h && n(h)) : (u.attr("ignore", a.defaultAttr.ignore), h && h.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var I2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.hasSymbolVisual = !0, r;
    }
    return t.prototype.getInitialData = function(r) {
      return Nl(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(r) {
      var n = new Dt(), i = gr("line", 0, r.itemHeight / 2, r.itemWidth, 0, r.lineStyle.stroke, !1);
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
  }(Ee)
);
function Of(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel"), n = r.length;
  if (n === 1) {
    var i = Ei(e, t, r[0]);
    return i != null ? i + "" : null;
  } else if (n) {
    for (var a = [], o = 0; o < r.length; o++)
      a.push(Ei(e, t, r[o]));
    return a.join(" ");
  }
}
function x0(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel");
  if (!z(t))
    return t + "";
  for (var n = [], i = 0; i < r.length; i++) {
    var a = e.getDimensionIndex(r[i]);
    a >= 0 && n.push(t[a]);
  }
  return n.join(" ");
}
var Ef = (
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
      }), s.drift = $2, this._symbolType = r, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(r) {
      this.childAt(0).stopAnimation(null, r);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Us(this.childAt(0));
    }, t.prototype.downplay = function() {
      Ys(this.childAt(0));
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
        var d = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        h ? f.attr(d) : le(f, d, s, n), Mm(f);
      }
      if (this._updateCommon(r, n, l, i, a), u) {
        var f = this.childAt(0);
        if (!h) {
          var d = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: f.style.opacity
            }
          };
          f.scaleX = f.scaleY = 0, f.style.opacity = 0, pr(f, d, s, n);
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(r, n, i, a, o) {
      var s = this.childAt(0), l = r.hostModel, u, h, c, f, d, v, g, p, y;
      if (a && (u = a.emphasisItemStyle, h = a.blurItemStyle, c = a.selectItemStyle, f = a.focus, d = a.blurScope, g = a.labelStatesModels, p = a.hoverScale, y = a.cursorStyle, v = a.emphasisDisabled), !a || r.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : r.getItemModel(n), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), c = m.getModel(["select", "itemStyle"]).getItemStyle(), h = m.getModel(["blur", "itemStyle"]).getItemStyle(), f = _.get("focus"), d = _.get("blurScope"), v = _.get("disabled"), g = Pi(m), p = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var b = r.getItemVisual(n, "symbolRotate");
      s.attr("rotation", (b || 0) * Math.PI / 180 || 0);
      var S = $_(r.getItemVisual(n, "symbolOffset"), i);
      S && (s.x = S[0], s.y = S[1]), y && s.attr("cursor", y);
      var w = r.getItemVisual(n, "style"), x = w.fill;
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
      var D = r.getItemVisual(n, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      _o(s, g, {
        labelFetcher: l,
        labelDataIndex: n,
        defaultText: $,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function $(R) {
        return T ? r.getName(R) : Of(r, R);
      }
      this._sizeX = i[0] / 2, this._sizeY = i[1] / 2;
      var L = s.ensureState("emphasis");
      L.style = u, s.ensureState("select").style = c, s.ensureState("blur").style = h;
      var P = p == null || p === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p) && p > 0 ? +p : 1;
      L.scaleX = this._sizeX * P, L.scaleY = this._sizeY * P, this.setSymbolScale(1), Qa(this, f, d, v);
    }, t.prototype.setSymbolScale = function(r) {
      this.scaleX = this.scaleY = r;
    }, t.prototype.fadeOut = function(r, n, i) {
      var a = this.childAt(0), o = st(this).dataIndex, s = i && i.animation;
      if (this.silent = a.silent = !0, i && i.fadeLabel) {
        var l = a.getTextContent();
        l && qs(l, {
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
      qs(a, {
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
      return wD(r.getItemVisual(n, "symbolSize"));
    }, t;
  }(Dt)
);
function $2(e, t) {
  this.parent.drift(e, t);
}
function th(e, t, r, n) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(n.isIgnore && n.isIgnore(r)) && !(n.clipShape && !n.clipShape.contain(t[0], t[1])) && e.getItemVisual(r, "symbol") !== "none";
}
function Vp(e) {
  return e != null && !V(e) && (e = {
    isIgnore: e
  }), e || {};
}
function Gp(e) {
  var t = e.hostModel, r = t.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: Pi(t),
    cursorStyle: t.get("cursor")
  };
}
var L2 = (
  /** @class */
  function() {
    function e(t) {
      this.group = new Dt(), this._SymbolCtor = t || Ef;
    }
    return e.prototype.updateData = function(t, r) {
      this._progressiveEls = null, r = Vp(r);
      var n = this.group, i = t.hostModel, a = this._data, o = this._SymbolCtor, s = r.disableAnimation, l = Gp(t), u = {
        disableAnimation: s
      }, h = r.getSymbolPoint || function(c) {
        return t.getItemLayout(c);
      };
      a || n.removeAll(), t.diff(a).add(function(c) {
        var f = h(c);
        if (th(t, f, c, r)) {
          var d = new o(t, c, l, u);
          d.setPosition(f), t.setItemGraphicEl(c, d), n.add(d);
        }
      }).update(function(c, f) {
        var d = a.getItemGraphicEl(f), v = h(c);
        if (!th(t, v, c, r)) {
          n.remove(d);
          return;
        }
        var g = t.getItemVisual(c, "symbol") || "circle", p = d && d.getSymbolType && d.getSymbolType();
        if (!d || p && p !== g)
          n.remove(d), d = new o(t, c, l, u), d.setPosition(v);
        else {
          d.updateData(t, c, l, u);
          var y = {
            x: v[0],
            y: v[1]
          };
          s ? d.attr(y) : le(d, y, i);
        }
        n.add(d), t.setItemGraphicEl(c, d);
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
      this._seriesScope = Gp(t), this._data = null, this.group.removeAll();
    }, e.prototype.incrementalUpdate = function(t, r, n) {
      this._progressiveEls = [], n = Vp(n);
      function i(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = r.getItemLayout(a);
        if (th(r, o, a, n)) {
          var s = new this._SymbolCtor(r, a, this._seriesScope);
          s.traverse(i), s.setPosition(o), this.group.add(s), r.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, e.prototype.eachRendered = function(t) {
      mo(this._progressiveEls || this.group, t);
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
function T0(e, t, r) {
  var n = e.getBaseAxis(), i = e.getOtherAxis(n), a = P2(i, r), o = n.dim, s = i.dim, l = t.mapDimension(s), u = t.mapDimension(o), h = s === "x" || s === "radius" ? 1 : 0, c = Y(e.dimensions, function(v) {
    return t.mapDimension(v);
  }), f = !1, d = t.getCalculationInfo("stackResultDimension");
  return ki(
    t,
    c[0]
    /* , dims[1] */
  ) && (f = !0, c[0] = d), ki(
    t,
    c[1]
    /* , dims[0] */
  ) && (f = !0, c[1] = d), {
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
function P2(e, t) {
  var r = 0, n = e.scale.getExtent();
  return t === "start" ? r = n[0] : t === "end" ? r = n[1] : bt(t) && !isNaN(t) ? r = t : n[0] > 0 ? r = n[0] : n[1] < 0 && (r = n[1]), r;
}
function C0(e, t, r, n) {
  var i = NaN;
  e.stacked && (i = r.get(r.getCalculationInfo("stackedOverDimension"), n)), isNaN(i) && (i = e.valueStart);
  var a = e.baseDataOffset, o = [];
  return o[a] = r.get(e.baseDim, n), o[1 - a] = i, t.dataToPoint(o);
}
function R2(e, t) {
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
function O2(e, t, r, n, i, a, o, s) {
  for (var l = R2(e, t), u = [], h = [], c = [], f = [], d = [], v = [], g = [], p = T0(i, t, o), y = e.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var b = l[_], S = !0, w = void 0, x = void 0;
    switch (b.cmd) {
      case "=":
        w = b.idx * 2, x = b.idx1 * 2;
        var M = y[w], D = y[w + 1], A = m[x], T = m[x + 1];
        (isNaN(M) || isNaN(D)) && (M = A, D = T), u.push(M, D), h.push(A, T), c.push(r[w], r[w + 1]), f.push(n[x], n[x + 1]), g.push(t.getRawIndex(b.idx1));
        break;
      case "+":
        var $ = b.idx, L = p.dataDimsForPoint, P = i.dataToPoint([t.get(L[0], $), t.get(L[1], $)]);
        x = $ * 2, u.push(P[0], P[1]), h.push(m[x], m[x + 1]);
        var R = C0(p, i, t, $);
        c.push(R[0], R[1]), f.push(n[x], n[x + 1]), g.push(t.getRawIndex($));
        break;
      case "-":
        S = !1;
    }
    S && (d.push(b), v.push(v.length));
  }
  v.sort(function(xt, Ce) {
    return g[xt] - g[Ce];
  });
  for (var E = u.length, G = ur(E), k = ur(E), F = ur(E), W = ur(E), j = [], _ = 0; _ < v.length; _++) {
    var nt = v[_], vt = _ * 2, wt = nt * 2;
    G[vt] = u[wt], G[vt + 1] = u[wt + 1], k[vt] = h[wt], k[vt + 1] = h[wt + 1], F[vt] = c[wt], F[vt + 1] = c[wt + 1], W[vt] = f[wt], W[vt + 1] = f[wt + 1], j[_] = d[nt];
  }
  return {
    current: G,
    next: k,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: j
  };
}
var Lr = Math.min, Pr = Math.max;
function Pn(e, t) {
  return isNaN(e) || isNaN(t);
}
function cc(e, t, r, n, i, a, o, s, l) {
  for (var u, h, c, f, d, v, g = r, p = 0; p < n; p++) {
    var y = t[g * 2], m = t[g * 2 + 1];
    if (g >= i || g < 0)
      break;
    if (Pn(y, m)) {
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
          for (; Pn(w, x) && M < n; )
            M++, S += a, w = t[S * 2], x = t[S * 2 + 1];
        var D = 0.5, A = 0, T = 0, $ = void 0, L = void 0;
        if (M >= n || Pn(w, x))
          d = y, v = m;
        else {
          A = w - u, T = x - h;
          var P = y - u, R = w - y, E = m - h, G = x - m, k = void 0, F = void 0;
          if (s === "x") {
            k = Math.abs(P), F = Math.abs(R);
            var W = A > 0 ? 1 : -1;
            d = y - W * k * o, v = m, $ = y + W * F * o, L = m;
          } else if (s === "y") {
            k = Math.abs(E), F = Math.abs(G);
            var j = T > 0 ? 1 : -1;
            d = y, v = m - j * k * o, $ = y, L = m + j * F * o;
          } else
            k = Math.sqrt(P * P + E * E), F = Math.sqrt(R * R + G * G), D = F / (F + k), d = y - A * o * (1 - D), v = m - T * o * (1 - D), $ = y + A * o * D, L = m + T * o * D, $ = Lr($, Pr(w, y)), L = Lr(L, Pr(x, m)), $ = Pr($, Lr(w, y)), L = Pr(L, Lr(x, m)), A = $ - y, T = L - m, d = y - A * k / F, v = m - T * k / F, d = Lr(d, Pr(u, y)), v = Lr(v, Pr(h, m)), d = Pr(d, Lr(u, y)), v = Pr(v, Lr(h, m)), A = y - d, T = m - v, $ = y + A * F / k, L = m + T * F / k;
        }
        e.bezierCurveTo(c, f, d, v, y, m), c = $, f = L;
      } else
        e.lineTo(y, m);
    }
    u = y, h = m, g += a;
  }
  return p;
}
var M0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return e;
  }()
), E2 = (
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
      return new M0();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.points, a = 0, o = i.length / 2;
      if (n.connectNulls) {
        for (; o > 0 && Pn(i[o * 2 - 2], i[o * 2 - 1]); o--)
          ;
        for (; a < o && Pn(i[a * 2], i[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += cc(r, i, a, o, o, 1, n.smooth, n.smoothMonotone, n.connectNulls) + 1;
    }, t.prototype.getPointOn = function(r, n) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var i = this.path, a = i.data, o = Nn.CMD, s, l, u = n === "x", h = [], c = 0; c < a.length; ) {
        var f = a[c++], d = void 0, v = void 0, g = void 0, p = void 0, y = void 0, m = void 0, _ = void 0;
        switch (f) {
          case o.M:
            s = a[c++], l = a[c++];
            break;
          case o.L:
            if (d = a[c++], v = a[c++], _ = u ? (r - s) / (d - s) : (r - l) / (v - l), _ <= 1 && _ >= 0) {
              var b = u ? (v - l) * _ + l : (d - s) * _ + s;
              return u ? [r, b] : [b, r];
            }
            s = d, l = v;
            break;
          case o.C:
            d = a[c++], v = a[c++], g = a[c++], p = a[c++], y = a[c++], m = a[c++];
            var S = u ? ks(s, d, g, y, r, h) : ks(l, v, p, m, r, h);
            if (S > 0)
              for (var w = 0; w < S; w++) {
                var x = h[w];
                if (x <= 1 && x >= 0) {
                  var b = u ? Et(l, v, p, m, x) : Et(s, d, g, y, x);
                  return u ? [r, b] : [b, r];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  }(dt)
), k2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t;
  }(M0)
), N2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "ec-polygon", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new k2();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.points, a = n.stackedOnPoints, o = 0, s = i.length / 2, l = n.smoothMonotone;
      if (n.connectNulls) {
        for (; s > 0 && Pn(i[s * 2 - 2], i[s * 2 - 1]); s--)
          ;
        for (; o < s && Pn(i[o * 2], i[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = cc(r, i, o, s, s, 1, n.smooth, l, n.connectNulls);
        cc(r, a, o + u - 1, u, s, -1, n.stackedOnSmooth, l, n.connectNulls), o += u + 1, r.closePath();
      }
    }, t;
  }(dt)
);
function D0(e, t, r, n, i) {
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
    var f = e.getBaseAxis(), d = f.isHorizontal(), v = f.inverse;
    d ? (v && (c.shape.x += l), c.shape.width = 0) : (v || (c.shape.y += u), c.shape.height = 0);
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
function A0(e, t, r) {
  var n = e.getArea(), i = At(n.r0, 1), a = At(n.r, 1), o = new Gi({
    shape: {
      cx: At(e.cx, 1),
      cy: At(e.cy, 1),
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
function B2(e, t, r, n, i) {
  if (e) {
    if (e.type === "polar")
      return A0(e, t, r);
    if (e.type === "cartesian2d")
      return D0(e, t, r, n, i);
  } else return null;
  return null;
}
function Hl(e, t) {
  return e.type === t;
}
function Wp(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return;
    return !0;
  }
}
function Up(e) {
  for (var t = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0; a < e.length; ) {
    var o = e[a++], s = e[a++];
    isNaN(o) || (t = Math.min(o, t), n = Math.max(o, n)), isNaN(s) || (r = Math.min(s, r), i = Math.max(s, i));
  }
  return [[t, r], [n, i]];
}
function Yp(e, t) {
  var r = Up(e), n = r[0], i = r[1], a = Up(t), o = a[0], s = a[1];
  return Math.max(Math.abs(n[0] - o[0]), Math.abs(n[1] - o[1]), Math.abs(i[0] - s[0]), Math.abs(i[1] - s[1]));
}
function Xp(e) {
  return bt(e) ? e : e ? 0.5 : 0;
}
function z2(e, t, r) {
  if (!r.valueDim)
    return [];
  for (var n = t.count(), i = ur(n * 2), a = 0; a < n; a++) {
    var o = C0(r, e, t, a);
    i[a * 2] = o[0], i[a * 2 + 1] = o[1];
  }
  return i;
}
function Rr(e, t, r, n, i) {
  var a = r.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], h = [], c = [], f = [];
  if (i) {
    for (l = 0; l < e.length; l += 2) {
      var d = t || e;
      !isNaN(d[l]) && !isNaN(d[l + 1]) && f.push(e[l], e[l + 1]);
    }
    e = f;
  }
  for (l = 0; l < e.length - 2; l += 2)
    switch (c[0] = e[l + 2], c[1] = e[l + 3], h[0] = e[l], h[1] = e[l + 1], s.push(h[0], h[1]), n) {
      case "end":
        u[o] = c[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var v = (h[o] + c[o]) / 2, g = [];
        u[o] = g[o] = v, u[1 - o] = h[1 - o], g[1 - o] = c[1 - o], s.push(u[0], u[1]), s.push(g[0], g[1]);
        break;
      default:
        u[o] = h[o], u[1 - o] = c[1 - o], s.push(u[0], u[1]);
    }
  return s.push(e[l++], e[l++]), s;
}
function F2(e, t) {
  var r = [], n = e.length, i, a;
  function o(h, c, f) {
    var d = h.coord, v = (f - d) / (c.coord - d), g = V1(v, [h.color, c.color]);
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
function H2(e, t, r) {
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
      var l = t.getAxis(i), u = Y(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), h = u.length, c = a.outerColors.slice();
      h && u[0].coord > u[h - 1].coord && (u.reverse(), c.reverse());
      var f = F2(u, i === "x" ? r.getWidth() : r.getHeight()), d = f.length;
      if (!d && h)
        return u[0].coord < 0 ? c[1] ? c[1] : u[h - 1].color : c[0] ? c[0] : u[0].color;
      var v = 10, g = f[0].coord - v, p = f[d - 1].coord + v, y = p - g;
      if (y < 1e-3)
        return "transparent";
      C(f, function(_) {
        _.offset = (_.coord - g) / y;
      }), f.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: d ? f[d - 1].offset : 0.5,
        color: c[1] || "transparent"
      }), f.unshift({
        offset: d ? f[0].offset : 0.5,
        color: c[0] || "transparent"
      });
      var m = new sf(0, 0, 0, 0, f, !0);
      return m[i] = g, m[i + "2"] = p, m;
    }
  }
}
function V2(e, t, r) {
  var n = e.get("showAllSymbol"), i = n === "auto";
  if (!(n && !i)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (a && !(i && G2(a, t))) {
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
function G2(e, t) {
  var r = e.getExtent(), n = Math.abs(r[1] - r[0]) / e.scale.count();
  isNaN(n) && (n = 0);
  for (var i = t.count(), a = Math.max(1, Math.round(i / 5)), o = 0; o < i; o += a)
    if (Ef.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[e.isHorizontal() ? 1 : 0] * 1.5 > n)
      return !1;
  return !0;
}
function W2(e, t) {
  return isNaN(e) || isNaN(t);
}
function U2(e) {
  for (var t = e.length / 2; t > 0 && W2(e[t * 2 - 2], e[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function qp(e, t) {
  return [e[t * 2], e[t * 2 + 1]];
}
function Y2(e, t, r) {
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
function I0(e) {
  if (e.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < je.length; t++)
    if (e.get([je[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function eh(e, t, r, n) {
  if (Hl(t, "cartesian2d")) {
    var i = n.getModel("endLabel"), a = i.get("valueAnimation"), o = n.getData(), s = {
      lastFrameIndex: 0
    }, l = I0(n) ? function(d, v) {
      e._endLabelOnDuring(d, v, o, s, a, i, t);
    } : null, u = t.getBaseAxis().isHorizontal(), h = D0(t, r, n, function() {
      var d = e._endLabel;
      d && r && s.originalX != null && d.attr({
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
    return A0(t, r, n);
}
function X2(e, t) {
  var r = t.getBaseAxis(), n = r.isHorizontal(), i = r.inverse, a = n ? i ? "right" : "left" : "center", o = n ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: e.get("align") || a,
      verticalAlign: e.get("verticalAlign") || o
    }
  };
}
var q2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var r = new Dt(), n = new L2();
      this.group.add(n.group), this._symbolDraw = n, this._lineGroup = r, this._changePolyState = J(this._changePolyState, this);
    }, t.prototype.render = function(r, n, i) {
      var a = r.coordinateSystem, o = this.group, s = r.getData(), l = r.getModel("lineStyle"), u = r.getModel("areaStyle"), h = s.getLayout("points") || [], c = a.type === "polar", f = this._coordSys, d = this._symbolDraw, v = this._polyline, g = this._polygon, p = this._lineGroup, y = !n.ssr && r.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), b = T0(a, s, _), S = m && z2(a, s, b), w = r.get("showSymbol"), x = r.get("connectNulls"), M = w && !c && V2(r, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(xt, Ce) {
        xt.__temp && (o.remove(xt), D.setItemGraphicEl(Ce, null));
      }), w || d.remove(), o.add(p);
      var A = c ? !1 : r.get("step"), T;
      a && a.getArea && r.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var $ = H2(s, a, i) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(v && f.type === a.type && A === this._step))
        w && d.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(xt) {
            return [h[xt * 2], h[xt * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), v = this._newPolyline(h), m ? g = this._newPolygon(h, S) : g && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Bn($)), p.setClipPath(eh(this, a, !0, r));
      else {
        m && !g ? g = this._newPolygon(h, S) : g && !m && (p.remove(g), g = this._polygon = null), c || this._initOrUpdateEndLabel(r, a, Bn($));
        var L = p.getClipPath();
        if (L) {
          var P = eh(this, a, !1, r);
          pr(L, {
            shape: P.shape
          }, r);
        } else
          p.setClipPath(eh(this, a, !0, r));
        w && d.updateData(s, {
          isIgnore: M,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(xt) {
            return [h[xt * 2], h[xt * 2 + 1]];
          }
        }), (!Wp(this._stackedOnPoints, S) || !Wp(this._points, h)) && (y ? this._doUpdateAnimation(s, S, a, i, A, _, x) : (A && (S && (S = Rr(S, h, a, A, x)), h = Rr(h, null, a, A, x)), v.setShape({
          points: h
        }), g && g.setShape({
          points: h,
          stackedOnPoints: S
        })));
      }
      var R = r.getModel("emphasis"), E = R.get("focus"), G = R.get("blurScope"), k = R.get("disabled");
      if (v.useStyle(ht(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: $,
          lineJoin: "bevel"
        }
      )), Vh(v, r, "lineStyle"), v.style.lineWidth > 0 && r.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = v.getState("emphasis").style;
        F.lineWidth = +v.style.lineWidth + 1;
      }
      st(v).seriesIndex = r.seriesIndex, Qa(v, E, G, k);
      var W = Xp(r.get("smooth")), j = r.get("smoothMonotone");
      if (v.setShape({
        smooth: W,
        smoothMonotone: j,
        connectNulls: x
      }), g) {
        var nt = s.getCalculationInfo("stackedOnSeries"), vt = 0;
        g.useStyle(ht(u.getAreaStyle(), {
          fill: $,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), nt && (vt = Xp(nt.get("smooth"))), g.setShape({
          smooth: W,
          stackedOnSmooth: vt,
          smoothMonotone: j,
          connectNulls: x
        }), Vh(g, r, "areaStyle"), st(g).seriesIndex = r.seriesIndex, Qa(g, E, G, k);
      }
      var wt = this._changePolyState;
      s.eachItemGraphicEl(function(xt) {
        xt && (xt.onHoverStateChange = wt);
      }), this._polyline.onHoverStateChange = wt, this._data = s, this._coordSys = a, this._stackedOnPoints = S, this._points = h, this._step = A, this._valueOrigin = _, r.get("triggerLineEvent") && (this.packEventData(r, v), g && this.packEventData(r, g));
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
      var o = r.getData(), s = kn(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var h = l[s * 2], c = l[s * 2 + 1];
          if (isNaN(h) || isNaN(c) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(h, c))
            return;
          var f = r.get("zlevel") || 0, d = r.get("z") || 0;
          u = new Ef(o, s), u.x = h, u.y = c, u.setZ(f, d);
          var v = u.getSymbolPath().getTextContent();
          v && (v.zlevel = f, v.z = d, v.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        Se.prototype.highlight.call(this, r, n, i, a);
    }, t.prototype.downplay = function(r, n, i, a) {
      var o = r.getData(), s = kn(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        Se.prototype.downplay.call(this, r, n, i, a);
    }, t.prototype._changePolyState = function(r) {
      var n = this._polygon;
      av(this._polyline, r), n && av(n, r);
    }, t.prototype._newPolyline = function(r) {
      var n = this._polyline;
      return n && this._lineGroup.remove(n), n = new E2({
        shape: {
          points: r
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(n), this._polyline = n, n;
    }, t.prototype._newPolygon = function(r, n) {
      var i = this._polygon;
      return i && this._lineGroup.remove(i), i = new N2({
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
      r.eachItemGraphicEl(function(d, v) {
        var g = d;
        if (g) {
          var p = [d.x, d.y], y = void 0, m = void 0, _ = void 0;
          if (i)
            if (o) {
              var b = i, S = n.pointToCoord(p);
              a ? (y = b.startAngle, m = b.endAngle, _ = -S[1] / 180 * Math.PI) : (y = b.r0, m = b.r, _ = S[0]);
            } else {
              var w = i;
              a ? (y = w.x, m = w.x + w.width, _ = d.x) : (y = w.y + w.height, m = w.y, _ = d.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var M = Z(c) ? c(v) : h * x + f, D = g.getSymbolPath(), A = D.getTextContent();
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
      if (I0(r)) {
        var o = r.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new $t({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var h = U2(l);
        h >= 0 && (_o(s, Pi(r, "endLabel"), {
          inheritColor: i,
          labelFetcher: r,
          labelDataIndex: h,
          defaultText: function(c, f, d) {
            return d != null ? x0(o, d) : Of(o, c);
          },
          enableTextSetter: !0
        }, X2(a, n)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(r, n, i, a, o, s, l) {
      var u = this._endLabel, h = this._polyline;
      if (u) {
        r < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var c = i.getLayout("points"), f = i.hostModel, d = f.get("connectNulls"), v = s.get("precision"), g = s.get("distance") || 0, p = l.getBaseAxis(), y = p.isHorizontal(), m = p.inverse, _ = n.shape, b = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, S = (y ? g : 0) * (m ? -1 : 1), w = (y ? 0 : -g) * (m ? -1 : 1), x = y ? "x" : "y", M = Y2(c, b, x), D = M.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !d) {
            var $ = qp(c, D[0]);
            u.attr({
              x: $[0] + S,
              y: $[1] + w
            }), o && (T = f.getRawValue(D[0]));
          } else {
            var $ = h.getPointOn(b, x);
            $ && u.attr({
              x: $[0] + S,
              y: $[1] + w
            });
            var L = f.getRawValue(D[0]), P = f.getRawValue(D[1]);
            o && (T = zS(i, v, L, P, M.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = r === 1 || a.lastFrameIndex > 0 ? D[0] : 0, $ = qp(c, R);
          o && (T = f.getRawValue(R)), u.attr({
            x: $[0] + S,
            y: $[1] + w
          });
        }
        if (o) {
          var E = Tl(u);
          typeof E.setLabelText == "function" && E.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(r, n, i, a, o, s, l) {
      var u = this._polyline, h = this._polygon, c = r.hostModel, f = O2(this._data, r, this._stackedOnPoints, n, this._coordSys, i, this._valueOrigin), d = f.current, v = f.stackedOnCurrent, g = f.next, p = f.stackedOnNext;
      if (o && (v = Rr(f.stackedOnCurrent, f.current, i, o, l), d = Rr(f.current, null, i, o, l), p = Rr(f.stackedOnNext, f.next, i, o, l), g = Rr(f.next, null, i, o, l)), Yp(d, g) > 3e3 || h && Yp(v, p) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: g
        }), h && (h.stopAnimation(), h.setShape({
          points: g,
          stackedOnPoints: p
        }));
        return;
      }
      u.shape.__points = f.current, u.shape.points = d;
      var y = {
        shape: {
          points: g
        }
      };
      f.current !== d && (y.shape.__points = f.next), u.stopAnimation(), le(u, y, c), h && (h.setShape({
        // Reuse the points with polyline.
        points: d,
        stackedOnPoints: v
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
function Z2(e, t) {
  return {
    seriesType: e,
    plan: Sf(),
    reset: function(r) {
      var n = r.getData(), i = r.coordinateSystem;
      if (r.pipelineContext, !!i) {
        var a = Y(i.dimensions, function(c) {
          return n.mapDimension(c);
        }).slice(0, 2), o = a.length, s = n.getCalculationInfo("stackResultDimension");
        ki(n, a[0]) && (a[0] = s), ki(n, a[1]) && (a[1] = s);
        var l = n.getStore(), u = n.getDimensionIndex(a[0]), h = n.getDimensionIndex(a[1]);
        return o && {
          progress: function(c, f) {
            for (var d = c.end - c.start, v = ur(d * o), g = [], p = [], y = c.start, m = 0; y < c.end; y++) {
              var _ = void 0;
              if (o === 1) {
                var b = l.get(u, y);
                _ = i.dataToPoint(b, null, p);
              } else
                g[0] = l.get(u, y), g[1] = l.get(h, y), _ = i.dataToPoint(g, null, p);
              v[m++] = _[0], v[m++] = _[1];
            }
            f.setLayout("points", v);
          }
        };
      }
    }
  };
}
var K2 = {
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
}, j2 = function(e) {
  return Math.round(e.length / 2);
};
function $0(e) {
  return {
    seriesType: e,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, r, n) {
      var i = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = i.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), h = l.getExtent(), c = n.getDevicePixelRatio(), f = Math.abs(h[1] - h[0]) * (c || 1), d = Math.round(s / f);
        if (isFinite(d) && d > 1) {
          a === "lttb" ? t.setData(i.lttbDownSample(i.mapDimension(u.dim), 1 / d)) : a === "minmax" && t.setData(i.minmaxDownSample(i.mapDimension(u.dim), 1 / d));
          var v = void 0;
          H(a) ? v = K2[a] : Z(a) && (v = a), v && t.setData(i.downSample(i.mapDimension(u.dim), 1 / d, v, j2));
        }
      }
    }
  };
}
function Q2(e) {
  e.registerChartView(q2), e.registerSeriesModel(I2), e.registerLayout(Z2("line")), e.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var r = t.getData(), n = t.getModel("lineStyle").getLineStyle();
      n && !n.stroke && (n.stroke = r.getVisual("style").fill), r.setVisual("legendLineStyle", n);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, $0("line"));
}
var fc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, n) {
      return Nl(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(r, n, i) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(r), s = a.dataToPoint(o);
        if (i)
          C(a.getAxes(), function(f, d) {
            if (f.type === "category" && n != null) {
              var v = f.getTicksCoords(), g = f.getTickModel().get("alignWithLabel"), p = o[d], y = n[d] === "x1" || n[d] === "y1";
              if (y && !g && (p += 1), v.length < 2)
                return;
              if (v.length === 2) {
                s[d] = f.toGlobalCoord(f.getExtent()[y ? 1 : 0]);
                return;
              }
              for (var m = void 0, _ = void 0, b = 1, S = 0; S < v.length; S++) {
                var w = v[S].coord, x = S === v.length - 1 ? v[S - 1].tickValue + b : v[S].tickValue;
                if (x === p) {
                  _ = w;
                  break;
                } else if (x < p)
                  m = w;
                else if (m != null && x > p) {
                  _ = (w + m) / 2;
                  break;
                }
                S === 1 && (b = x - v[0].tickValue);
              }
              _ == null && (m ? m && (_ = v[v.length - 1].coord) : _ = v[0].coord), s[d] = f.toGlobalCoord(_);
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
  }(Ee)
);
Ee.registerClass(fc);
var J2 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function() {
      return Nl(null, this, {
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
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = Ml(fc.defaultOption, {
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
  }(fc)
), tI = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return e;
  }()
), Zp = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "sausage", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new tI();
    }, t.prototype.buildPath = function(r, n) {
      var i = n.cx, a = n.cy, o = Math.max(n.r0 || 0, 0), s = Math.max(n.r, 0), l = (s - o) * 0.5, u = o + l, h = n.startAngle, c = n.endAngle, f = n.clockwise, d = Math.PI * 2, v = f ? c - h < d : h - c < d;
      v || (h = c - (f ? d : -d));
      var g = Math.cos(h), p = Math.sin(h), y = Math.cos(c), m = Math.sin(c);
      v ? (r.moveTo(g * o + i, p * o + a), r.arc(g * u + i, p * u + a, l, -Math.PI + h, h, !f)) : r.moveTo(g * s + i, p * s + a), r.arc(i, a, s, h, c, !f), r.arc(y * u + i, m * u + a, l, c - Math.PI * 2, c - Math.PI, !f), o !== 0 && r.arc(i, a, o, c, h, f);
    }, t;
  }(dt)
);
function eI(e, t) {
  t = t || {};
  var r = t.isRoundCap;
  return function(n, i, a) {
    var o = i.position;
    if (!o || o instanceof Array)
      return Hs(n, i, a);
    var s = e(o), l = i.distance != null ? i.distance : 5, u = this.shape, h = u.cx, c = u.cy, f = u.r, d = u.r0, v = (f + d) / 2, g = u.startAngle, p = u.endAngle, y = (g + p) / 2, m = r ? Math.abs(f - d) / 2 : 0, _ = Math.cos, b = Math.sin, S = h + f * _(g), w = c + f * b(g), x = "left", M = "top";
    switch (s) {
      case "startArc":
        S = h + (d - l) * _(y), w = c + (d - l) * b(y), x = "center", M = "top";
        break;
      case "insideStartArc":
        S = h + (d + l) * _(y), w = c + (d + l) * b(y), x = "center", M = "bottom";
        break;
      case "startAngle":
        S = h + v * _(g) + rs(g, l + m, !1), w = c + v * b(g) + ns(g, l + m, !1), x = "right", M = "middle";
        break;
      case "insideStartAngle":
        S = h + v * _(g) + rs(g, -l + m, !1), w = c + v * b(g) + ns(g, -l + m, !1), x = "left", M = "middle";
        break;
      case "middle":
        S = h + v * _(y), w = c + v * b(y), x = "center", M = "middle";
        break;
      case "endArc":
        S = h + (f + l) * _(y), w = c + (f + l) * b(y), x = "center", M = "bottom";
        break;
      case "insideEndArc":
        S = h + (f - l) * _(y), w = c + (f - l) * b(y), x = "center", M = "top";
        break;
      case "endAngle":
        S = h + v * _(p) + rs(p, l + m, !0), w = c + v * b(p) + ns(p, l + m, !0), x = "left", M = "middle";
        break;
      case "insideEndAngle":
        S = h + v * _(p) + rs(p, -l + m, !0), w = c + v * b(p) + ns(p, -l + m, !0), x = "right", M = "middle";
        break;
      default:
        return Hs(n, i, a);
    }
    return n = n || {}, n.x = S, n.y = w, n.align = x, n.verticalAlign = M, n;
  };
}
function rI(e, t, r, n) {
  if (bt(n)) {
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
function rs(e, t, r) {
  return t * Math.sin(e) * (r ? -1 : 1);
}
function ns(e, t, r) {
  return t * Math.cos(e) * (r ? 1 : -1);
}
function nI(e, t, r) {
  var n = e.get("borderRadius");
  if (n == null)
    return {
      cornerRadius: 0
    };
  z(n) || (n = [n, n, n, n]);
  var i = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: Y(n, function(a) {
      return Ke(a, i);
    })
  };
}
var rh = Math.max, nh = Math.min;
function iI(e, t) {
  var r = e.getArea && e.getArea();
  if (Hl(e, "cartesian2d")) {
    var n = e.getBaseAxis();
    if (n.type !== "category" || !n.onBand) {
      var i = t.getLayout("bandWidth");
      n.isHorizontal() ? (r.x -= i, r.width += i * 2) : (r.y -= i, r.height += i * 2);
    }
  }
  return r;
}
var aI = (
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
      mo(this._progressiveEls || this.group, r);
    }, t.prototype._updateDrawMode = function(r) {
      var n = r.pipelineContext.large;
      (this._isLargeDraw == null || n !== this._isLargeDraw) && (this._isLargeDraw = n, this._clear());
    }, t.prototype._renderNormal = function(r, n, i, a) {
      var o = this.group, s = r.getData(), l = this._data, u = r.coordinateSystem, h = u.getBaseAxis(), c;
      u.type === "cartesian2d" ? c = h.isHorizontal() : u.type === "polar" && (c = h.dim === "angle");
      var f = r.isAnimationEnabled() ? r : null, d = oI(r, u);
      d && this._enableRealtimeSort(d, s, i);
      var v = r.get("clip", !0) || d, g = iI(u, s);
      o.removeClipPath();
      var p = r.get("roundCap", !0), y = r.get("showBackground", !0), m = r.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, b = [], S = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function M(T) {
        var $ = is[u.type](s, T), L = dI(u, c, $);
        return L.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? L.setShape("r", _) : L.setShape("cornerRadius", _), b[T] = L, L;
      }
      s.diff(l).add(function(T) {
        var $ = s.getItemModel(T), L = is[u.type](s, T, $);
        if (y && M(T), !(!s.hasValue(T) || !tg[u.type](L))) {
          var P = !1;
          v && (P = Kp[u.type](g, L));
          var R = jp[u.type](r, s, T, L, c, f, h.model, !1, p);
          d && (R.forceLabelAnimation = !0), eg(R, s, T, $, L, r, c, u.type === "polar"), w ? R.attr({
            shape: L
          }) : d ? Qp(d, f, R, L, T, c, !1, !1) : pr(R, {
            shape: L
          }, r, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = P;
        }
      }).update(function(T, $) {
        var L = s.getItemModel(T), P = is[u.type](s, T, L);
        if (y) {
          var R = void 0;
          S.length === 0 ? R = M($) : (R = S[$], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), b[T] = R);
          var E = is[u.type](s, T), G = P0(c, E, u);
          le(R, {
            shape: G
          }, f, T);
        }
        var k = l.getItemGraphicEl($);
        if (!s.hasValue(T) || !tg[u.type](P)) {
          o.remove(k);
          return;
        }
        var F = !1;
        if (v && (F = Kp[u.type](g, P), F && o.remove(k)), k ? Mm(k) : k = jp[u.type](r, s, T, P, c, f, h.model, !!k, p), d && (k.forceLabelAnimation = !0), x) {
          var W = k.getTextContent();
          if (W) {
            var j = Tl(W);
            j.prevValue != null && (j.prevValue = j.value);
          }
        } else
          eg(k, s, T, L, P, r, c, u.type === "polar");
        w ? k.attr({
          shape: P
        }) : d ? Qp(d, f, k, P, T, c, !0, x) : le(k, {
          shape: P
        }, r, T, null), s.setItemGraphicEl(T, k), k.ignore = F, o.add(k);
      }).remove(function(T) {
        var $ = l.getItemGraphicEl(T);
        $ && Yh($, r, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new Dt());
      D.removeAll();
      for (var A = 0; A < b.length; ++A)
        D.add(b[A]);
      o.add(D), this._backgroundEls = b, this._data = s;
    }, t.prototype._renderLarge = function(r, n, i) {
      this._clear(), ng(r, this.group), this._updateLargeClip(r);
    }, t.prototype._incrementalRenderLarge = function(r, n) {
      this._removeBackground(), ng(n, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(r) {
      var n = r.get("clip", !0) && B2(r.coordinateSystem, !1, r), i = this.group;
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
        ordinalNumbers: Y(a, function(o) {
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
        Yh(a, r, st(a).dataIndex);
      })) : n.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(Se)
), Kp = {
  cartesian2d: function(e, t) {
    var r = t.width < 0 ? -1 : 1, n = t.height < 0 ? -1 : 1;
    r < 0 && (t.x += t.width, t.width = -t.width), n < 0 && (t.y += t.height, t.height = -t.height);
    var i = e.x + e.width, a = e.y + e.height, o = rh(t.x, e.x), s = nh(t.x + t.width, i), l = rh(t.y, e.y), u = nh(t.y + t.height, a), h = s < o, c = u < l;
    return t.x = h && o > i ? s : o, t.y = c && l > a ? u : l, t.width = h ? 0 : s - o, t.height = c ? 0 : u - l, r < 0 && (t.x += t.width, t.width = -t.width), n < 0 && (t.y += t.height, t.height = -t.height), h || c;
  },
  polar: function(e, t) {
    var r = t.r0 <= t.r ? 1 : -1;
    if (r < 0) {
      var n = t.r;
      t.r = t.r0, t.r0 = n;
    }
    var i = nh(t.r, e.r), a = rh(t.r0, e.r0);
    t.r = i, t.r0 = a;
    var o = i - a < 0;
    if (r < 0) {
      var n = t.r;
      t.r = t.r0, t.r0 = n;
    }
    return o;
  }
}, jp = {
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
    var u = !i && l ? Zp : Gi, h = new u({
      shape: n,
      z2: 1
    });
    h.name = "item";
    var c = L0(i);
    if (h.calculateTextPosition = eI(c, {
      isRoundCap: u === Zp
    }), a) {
      var f = h.shape, d = i ? "r" : "endAngle", v = {};
      f[d] = i ? n.r0 : n.startAngle, v[d] = n[d], (s ? le : pr)(h, {
        shape: v
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return h;
  }
};
function oI(e, t) {
  var r = e.get("realtimeSort", !0), n = t.getBaseAxis();
  if (r && n.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: n,
      otherAxis: t.getOtherAxis(n)
    };
}
function Qp(e, t, r, n, i, a, o, s) {
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
function Jp(e, t) {
  for (var r = 0; r < t.length; r++)
    if (!isFinite(e[t[r]]))
      return !0;
  return !1;
}
var sI = ["x", "y", "width", "height"], lI = ["cx", "cy", "r", "startAngle", "endAngle"], tg = {
  cartesian2d: function(e) {
    return !Jp(e, sI);
  },
  polar: function(e) {
    return !Jp(e, lI);
  }
}, is = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(e, t, r) {
    var n = e.getItemLayout(t), i = r ? hI(r, n) : 0, a = n.width > 0 ? 1 : -1, o = n.height > 0 ? 1 : -1;
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
function uI(e) {
  return e.startAngle != null && e.endAngle != null && e.startAngle === e.endAngle;
}
function L0(e) {
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
function eg(e, t, r, n, i, a, o, s) {
  var l = t.getItemVisual(r, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var h = e.shape, c = nI(n.getModel("itemStyle"), h);
      N(h, c), e.setShape(h);
    }
  } else {
    var u = n.get(["itemStyle", "borderRadius"]) || 0;
    e.setShape("r", u);
  }
  e.useStyle(l);
  var f = n.getShallow("cursor");
  f && e.attr("cursor", f);
  var d = s ? o ? i.r >= i.r0 ? "endArc" : "startArc" : i.endAngle >= i.startAngle ? "endAngle" : "startAngle" : o ? i.height >= 0 ? "bottom" : "top" : i.width >= 0 ? "right" : "left", v = Pi(n);
  _o(e, v, {
    labelFetcher: a,
    labelDataIndex: r,
    defaultText: Of(a.getData(), r),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: d
  });
  var g = e.getTextContent();
  if (s && g) {
    var p = n.get(["label", "position"]);
    e.textConfig.inside = p === "middle" ? !0 : null, rI(e, p === "outside" ? d : p, L0(o), n.get(["label", "rotate"]));
  }
  JT(g, v, a.getRawValue(r), function(m) {
    return x0(t, m);
  });
  var y = n.getModel(["emphasis"]);
  Qa(e, y.get("focus"), y.get("blurScope"), y.get("disabled")), Vh(e, n), uI(i) && (e.style.fill = "none", e.style.stroke = "none", C(e.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function hI(e, t) {
  var r = e.get(["itemStyle", "borderColor"]);
  if (!r || r === "none")
    return 0;
  var n = e.get(["itemStyle", "borderWidth"]) || 0, i = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(n, i, a);
}
var cI = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
    }
    return e;
  }()
), rg = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.type = "largeBar", n;
    }
    return t.prototype.getDefaultShape = function() {
      return new cI();
    }, t.prototype.buildPath = function(r, n) {
      for (var i = n.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, h = 0; h < i.length; h += 3)
        l[a] = u, l[o] = i[h + 2], s[a] = i[h + a], s[o] = i[h + o], r.rect(s[0], s[1], l[0], l[1]);
    }, t;
  }(dt)
);
function ng(e, t, r, n) {
  var i = e.getData(), a = i.getLayout("valueAxisHorizontal") ? 1 : 0, o = i.getLayout("largeDataIndices"), s = i.getLayout("size"), l = e.getModel("backgroundStyle"), u = i.getLayout("largeBackgroundPoints");
  if (u) {
    var h = new rg({
      shape: {
        points: u
      },
      incremental: !!n,
      silent: !0,
      z2: 0
    });
    h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, h.useStyle(l.getItemStyle()), t.add(h), r && r.push(h);
  }
  var c = new rg({
    shape: {
      points: i.getLayout("largePoints")
    },
    incremental: !!n,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  c.baseDimIdx = a, c.largeDataIndices = o, c.barWidth = s, t.add(c), c.useStyle(i.getVisual("style")), c.style.stroke = null, st(c).seriesIndex = e.seriesIndex, e.get("silent") || (c.on("mousedown", ig), c.on("mousemove", ig)), r && r.push(c);
}
var ig = xf(function(e) {
  var t = this, r = fI(t, e.offsetX, e.offsetY);
  st(t).dataIndex = r >= 0 ? r : null;
}, 30, !1);
function fI(e, t, r) {
  for (var n = e.baseDimIdx, i = 1 - n, a = e.shape.points, o = e.largeDataIndices, s = [], l = [], u = e.barWidth, h = 0, c = a.length / 3; h < c; h++) {
    var f = h * 3;
    if (l[n] = u, l[i] = a[f + 2], s[n] = a[f + n], s[i] = a[f + i], l[i] < 0 && (s[i] += l[i], l[i] = -l[i]), t >= s[0] && t <= s[0] + l[0] && r >= s[1] && r <= s[1] + l[1])
      return o[h];
  }
  return -1;
}
function P0(e, t, r) {
  if (Hl(r, "cartesian2d")) {
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
function dI(e, t, r) {
  var n = e.type === "polar" ? Gi : St;
  return new n({
    shape: P0(t, r, e),
    silent: !0,
    z2: 0
  });
}
function vI(e) {
  e.registerChartView(aI), e.registerSeriesModel(J2), e.registerLayout(e.PRIORITY.VISUAL.LAYOUT, It(UA, "bar")), e.registerLayout(e.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, YA("bar")), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, $0("bar")), e.registerAction({
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
var pI = (
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
), dc = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", Le).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(ct)
);
tr(dc, p2);
var R0 = {
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
}, gI = ot({
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
}, R0), kf = ot({
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
}, R0), yI = ot({
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
}, kf), mI = ht({
  logBase: 10
}, kf);
const _I = {
  category: gI,
  value: kf,
  time: yI,
  log: mI
};
var bI = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function ag(e, t, r, n) {
  C(bI, function(i, a) {
    var o = ot(ot({}, _I[a], !0), n, !0), s = (
      /** @class */
      function(l) {
        B(u, l);
        function u() {
          var h = l !== null && l.apply(this, arguments) || this;
          return h.type = t + "Axis." + a, h;
        }
        return u.prototype.mergeDefaultAndTheme = function(h, c) {
          var f = eo(this), d = f ? Pl(h) : {}, v = c.getTheme();
          ot(h, v.get(a + "Axis")), ot(h, this.getDefaultOption()), h.type = og(h), f && Oi(h, d, f);
        }, u.prototype.optionUpdated = function() {
          var h = this.option;
          h.type === "category" && (this.__ordinalMeta = uc.createByAxisModel(this));
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
  }), e.registerSubTypeDefaulter(t + "Axis", og);
}
function og(e) {
  return e.type || (e.data ? "category" : "value");
}
var wI = (
  /** @class */
  function() {
    function e(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return e.prototype.getAxis = function(t) {
      return this._axes[t];
    }, e.prototype.getAxes = function() {
      return Y(this._dimList, function(t) {
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
), vc = ["x", "y"];
function sg(e) {
  return e.type === "interval" || e.type === "time";
}
var SI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = "cartesian2d", r.dimensions = vc, r;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var r = this.getAxis("x").scale, n = this.getAxis("y").scale;
      if (!(!sg(r) || !sg(n))) {
        var i = r.getExtent(), a = n.getExtent(), o = this.dataToPoint([i[0], a[0]]), s = this.dataToPoint([i[1], a[1]]), l = i[1] - i[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var h = (s[0] - o[0]) / l, c = (s[1] - o[1]) / u, f = o[0] - i[0] * h, d = o[1] - a[0] * c, v = this._transform = [h, 0, 0, c, f, d];
          this._invTransform = Vc([], v);
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
  }(wI)
), xI = (
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
  }(C2)
);
function pc(e, t, r) {
  r = r || {};
  var n = e.coordinateSystem, i = t.axis, a = {}, o = i.getAxesOnZeroOf()[0], s = i.position, l = o ? "onZero" : s, u = i.dim, h = n.getRect(), c = [h.x, h.x + h.width, h.y, h.y + h.height], f = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, d = t.get("offset") || 0, v = u === "x" ? [c[2] - d, c[3] + d] : [c[0] - d, c[1] + d];
  if (o) {
    var g = o.toGlobalCoord(o.dataToCoord(0));
    v[f.onZero] = Math.max(Math.min(g, v[1]), v[0]);
  }
  a.position = [u === "y" ? v[f[l]] : c[0], u === "x" ? v[f[l]] : c[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var p = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = p[s], a.labelOffset = o ? v[f[s]] - v[f.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), Li(r.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function lg(e) {
  return e.get("coordinateSystem") === "cartesian2d";
}
function ug(e) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return C(t, function(r, n) {
    var i = n.replace(/Model$/, ""), a = e.getReferringComponents(i, Le).models[0];
    t[n] = a;
  }), t;
}
var ih = Math.log;
function TI(e, t, r) {
  var n = Yi.prototype, i = n.getTicks.call(r), a = n.getTicks.call(r, !0), o = i.length - 1, s = n.getInterval.call(r), l = v0(e, t), u = l.extent, h = l.fixMin, c = l.fixMax;
  if (e.type === "log") {
    var f = ih(e.base);
    u = [ih(u[0]) / f, ih(u[1]) / f];
  }
  e.setExtent(u[0], u[1]), e.calcNiceExtent({
    splitNumber: o,
    fixMin: h,
    fixMax: c
  });
  var d = n.getExtent.call(e);
  h && (u[0] = d[0]), c && (u[1] = d[1]);
  var v = n.getInterval.call(e), g = u[0], p = u[1];
  if (h && c)
    v = (p - g) / o;
  else if (h)
    for (p = u[0] + v * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      v = Ju(v), p = u[0] + v * o;
  else if (c)
    for (g = u[1] - v * o; g > u[0] && isFinite(g) && isFinite(u[0]); )
      v = Ju(v), g = u[1] - v * o;
  else {
    var y = e.getTicks().length - 1;
    y > o && (v = Ju(v));
    var m = v * o;
    p = Math.ceil(u[1] / v) * v, g = At(p - m), g < 0 && u[0] >= 0 ? (g = 0, p = At(m)) : p > 0 && u[1] <= 0 && (p = 0, g = -At(m));
  }
  var _ = (i[0].value - a[0].value) / s, b = (i[o].value - a[o].value) / s;
  n.setExtent.call(e, g + v * _, p + v * b), n.setInterval.call(e, v), (_ || b) && n.setNiceExtent.call(e, g + v, p - v);
}
var CI = (
  /** @class */
  function() {
    function e(t, r, n) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = vc, this._initCartesian(t, r, n), this.model = t;
    }
    return e.prototype.getRect = function() {
      return this._rect;
    }, e.prototype.update = function(t, r) {
      var n = this._axesMap;
      this._updateScale(t, this.model);
      function i(o) {
        var s, l = _t(o), u = l.length;
        if (u) {
          for (var h = [], c = u - 1; c >= 0; c--) {
            var f = +l[c], d = o[f], v = d.model, g = d.scale;
            // Only value and log axis without interval support alignTicks.
            hc(g) && v.get("alignTicks") && v.get("interval") == null ? h.push(d) : (Bp(g, v), hc(g) && (s = d));
          }
          h.length && (s || (s = h.pop(), Bp(s.scale, s.model)), C(h, function(p) {
            TI(p.scale, p.model, s.scale);
          }));
        }
      }
      i(n.x), i(n.y);
      var a = {};
      C(n.x, function(o) {
        hg(n, "y", o, a);
      }), C(n.y, function(o) {
        hg(n, "x", o, a);
      }), this.resize(this.model, r);
    }, e.prototype.resize = function(t, r, n) {
      var i = t.getBoxLayoutParams(), a = !n && t.get("containLabel"), o = Ri(i, {
        width: r.getWidth(),
        height: r.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (C(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var h = f2(u);
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
          u.setExtent(c[f], c[1 - f]), MI(u, h ? o.x : o.y);
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
      var r = t.seriesModel, n = t.xAxisModel || r && r.getReferringComponents("xAxis", Le).models[0], i = t.yAxisModel || r && r.getReferringComponents("yAxis", Le).models[0], a = t.gridModel, o = this._coordsList, s, l;
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
        C(s.y, function(f, d) {
          var v = "x" + c + "y" + d, g = new SI(v);
          g.master = i, g.model = t, i._coordsMap[v] = g, i._coordsList.push(g), g.addAxis(h), g.addAxis(f);
        });
      });
      function u(h) {
        return function(c, f) {
          if (ah(c, t)) {
            var d = c.get("position");
            h === "x" ? d !== "top" && d !== "bottom" && (d = o.bottom ? "top" : "bottom") : d !== "left" && d !== "right" && (d = o.left ? "right" : "left"), o[d] = !0;
            var v = new xI(h, h2(c), [0, 0], c.get("type"), d), g = v.type === "category";
            v.onBand = g && c.get("boundaryGap"), v.inverse = c.get("inverse"), c.axis = v, v.model = c, v.grid = a, v.index = f, a._axesList.push(v), s[h][f] = v, l[h]++;
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
        if (lg(i)) {
          var a = ug(i), o = a.xAxisModel, s = a.yAxisModel;
          if (!ah(o, r) || !ah(s, r))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = i.getData(), h = l.getAxis("x"), c = l.getAxis("y");
          n(u, h), n(u, c);
        }
      }, this);
      function n(i, a) {
        C(v2(i, a.dim), function(o) {
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
        if (lg(i)) {
          var a = ug(i), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          i.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), n;
    }, e.dimensions = vc, e;
  }()
);
function ah(e, t) {
  return e.getCoordSysModel() === t;
}
function hg(e, t, r, n) {
  r.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var i = e[t], a, o = r.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    cg(i[l]) && (a = i[l]);
  else
    for (var u in i)
      if (i.hasOwnProperty(u) && cg(i[u]) && !n[h(i[u])]) {
        a = i[u];
        break;
      }
  a && (n[h(a)] = !0);
  function h(c) {
    return c.dim + "_" + c.index;
  }
}
function cg(e) {
  return e && e.type !== "category" && e.type !== "time" && c2(e);
}
function MI(e, t) {
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
      this.group = new Dt(), this.opt = r, this.axisModel = t, ht(r, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var n = new Dt({
        x: r.position[0],
        y: r.position[1],
        rotation: r.rotation
      });
      n.updateTransform(), this._transformGroup = n;
    }
    return e.prototype.hasBuilder = function(t) {
      return !!fg[t];
    }, e.prototype.add = function(t) {
      fg[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function() {
      return this.group;
    }, e.innerTextLayout = function(t, r, n) {
      var i = qy(r - t), a, o;
      return Vs(i) ? (o = n > 0 ? "top" : "bottom", a = "center") : Vs(i - zr) ? (o = n > 0 ? "bottom" : "top", a = "center") : (o = "middle", i > 0 && i < zr ? a = n > 0 ? "right" : "left" : a = n > 0 ? "left" : "right"), {
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
), fg = {
  axisLine: function(e, t, r, n) {
    var i = t.get(["axisLine", "show"]);
    if (i === "auto" && e.handleAutoShown && (i = e.handleAutoShown("axisLine")), !!i) {
      var a = t.axis.getExtent(), o = n.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (be(s, s, o), be(l, l, o));
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
      Ja(c.shape, c.style.lineWidth), c.anid = "line", r.add(c);
      var f = t.get(["axisLine", "symbol"]);
      if (f != null) {
        var d = t.get(["axisLine", "symbolSize"]);
        H(f) && (f = [f, f]), (H(d) || bt(d)) && (d = [d, d]);
        var v = $_(t.get(["axisLine", "symbolOffset"]) || 0, d), g = d[0], p = d[1];
        C([{
          rotate: e.rotation + Math.PI / 2,
          offset: v[0],
          r: 0
        }, {
          rotate: e.rotation - Math.PI / 2,
          offset: v[1],
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
    var i = II(r, n, t, e), a = LI(r, n, t, e);
    if (AI(t, a, i), $I(r, n, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = D2(Y(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      A2(o);
    }
  },
  axisName: function(e, t, r, n) {
    var i = Li(e.axisName, t.get("name"));
    if (i) {
      var a = t.get("nameLocation"), o = e.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, c = [
        a === "start" ? u[0] - h * l : a === "end" ? u[1] + h * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        vg(a) ? e.labelOffset + o * l : 0
      ], f, d = t.get("nameRotate");
      d != null && (d = d * zr / 180);
      var v;
      vg(a) ? f = Vr.innerTextLayout(
        e.rotation,
        d ?? e.rotation,
        // Adapt to axis.
        o
      ) : (f = DI(e.rotation, a, d || 0, u), v = e.axisNameAvailableWidth, v != null && (v = Math.abs(v / Math.sin(f.rotation)), !isFinite(v) && (v = null)));
      var g = s.getFont(), p = t.get("nameTruncate", !0) || {}, y = p.ellipsis, m = Li(e.nameTruncateMaxWidth, p.maxWidth, v), _ = new $t({
        x: c[0],
        y: c[1],
        rotation: f.rotation,
        silent: Vr.isLabelSilent(t),
        style: qe(s, {
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
      if (Sl({
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
function DI(e, t, r, n) {
  var i = qy(r - e), a, o, s = n[0] > n[1], l = t === "start" && !s || t !== "start" && s;
  return Vs(i - zr / 2) ? (o = l ? "bottom" : "top", a = "center") : Vs(i - zr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", i < zr * 1.5 && i > zr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: i,
    textAlign: a,
    textVerticalAlign: o
  };
}
function AI(e, t, r) {
  if (!p0(e.axis)) {
    var n = e.get(["axisLabel", "showMinLabel"]), i = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], r = r || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = r[0], h = r[1], c = r[r.length - 1], f = r[r.length - 2];
    n === !1 ? (ce(a), ce(u)) : dg(a, o) && (n ? (ce(o), ce(h)) : (ce(a), ce(u))), i === !1 ? (ce(s), ce(c)) : dg(l, s) && (i ? (ce(l), ce(f)) : (ce(s), ce(c)));
  }
}
function ce(e) {
  e && (e.ignore = !0);
}
function dg(e, t) {
  var r = e && e.getBoundingRect().clone(), n = t && t.getBoundingRect().clone();
  if (!(!r || !n)) {
    var i = Fc([]);
    return Hc(i, i, -e.rotation), r.applyTransform(wi([], i, e.getLocalTransform())), n.applyTransform(wi([], i, t.getLocalTransform())), r.intersect(n);
  }
}
function vg(e) {
  return e === "middle" || e === "center";
}
function O0(e, t, r, n, i) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = r, t && (be(o, o, t), be(s, s, t));
    var h = new Ur({
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
    Ja(h.shape, h.style.lineWidth), h.anid = i + "_" + e[l].tickValue, a.push(h);
  }
  return a;
}
function II(e, t, r, n) {
  var i = r.axis, a = r.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && n.handleAutoShown && (o = n.handleAutoShown("axisTick")), !(!o || i.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = n.tickDirection * a.get("length"), u = i.getTicksCoords(), h = O0(u, t.transform, l, ht(s.getLineStyle(), {
      stroke: r.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), c = 0; c < h.length; c++)
      e.add(h[c]);
    return h;
  }
}
function $I(e, t, r, n) {
  var i = r.axis, a = r.getModel("minorTick");
  if (!(!a.get("show") || i.scale.isBlank())) {
    var o = i.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = n * a.get("length"), u = ht(s.getLineStyle(), ht(r.getModel("axisTick").getLineStyle(), {
        stroke: r.get(["axisLine", "lineStyle", "color"])
      })), h = 0; h < o.length; h++)
        for (var c = O0(o[h], t.transform, l, u, "minorticks_" + h), f = 0; f < c.length; f++)
          e.add(c[f]);
  }
}
function LI(e, t, r, n) {
  var i = r.axis, a = Li(n.axisLabelShow, r.get(["axisLabel", "show"]));
  if (!(!a || i.scale.isBlank())) {
    var o = r.getModel("axisLabel"), s = o.get("margin"), l = i.getViewLabels(), u = (Li(n.labelRotate, o.get("rotate")) || 0) * zr / 180, h = Vr.innerTextLayout(n.rotation, u, n.labelDirection), c = r.getCategories && r.getCategories(!0), f = [], d = Vr.isLabelSilent(r), v = r.get("triggerEvent");
    return C(l, function(g, p) {
      var y = i.scale.type === "ordinal" ? i.scale.getRawOrdinalNumber(g.tickValue) : g.tickValue, m = g.formattedLabel, _ = g.rawLabel, b = o;
      if (c && c[y]) {
        var S = c[y];
        V(S) && S.textStyle && (b = new Tt(S.textStyle, o, r.ecModel));
      }
      var w = b.getTextColor() || r.get(["axisLine", "lineStyle", "color"]), x = i.dataToCoord(y), M = b.getShallow("align", !0) || h.textAlign, D = tt(b.getShallow("alignMinLabel", !0), M), A = tt(b.getShallow("alignMaxLabel", !0), M), T = b.getShallow("verticalAlign", !0) || b.getShallow("baseline", !0) || h.textVerticalAlign, $ = tt(b.getShallow("verticalAlignMinLabel", !0), T), L = tt(b.getShallow("verticalAlignMaxLabel", !0), T), P = new $t({
        x,
        y: n.labelOffset + n.labelDirection * s,
        rotation: h.rotation,
        silent: d,
        z2: 10 + (g.level || 0),
        style: qe(b, {
          text: m,
          align: p === 0 ? D : p === l.length - 1 ? A : M,
          verticalAlign: p === 0 ? $ : p === l.length - 1 ? L : T,
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
      if (P.anid = "label_" + y, Sl({
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
      }), v) {
        var R = Vr.makeAxisEventDataBase(r);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = p, i.type === "category" && (R.dataIndex = y), st(P).eventData = R;
      }
      t.add(P), P.updateTransform(), f.push(P), e.add(P), P.decomposeTransform();
    }), f;
  }
}
function PI(e, t) {
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
  return RI(r, e, t), r.seriesInvolved && EI(r, e), r;
}
function RI(e, t, r) {
  var n = t.getComponent("tooltip"), i = t.getComponent("axisPointer"), a = i.get("link", !0) || [], o = [];
  C(r.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = so(s.model), u = e.coordSysAxesInfo[l] = {};
    e.coordSysMap[l] = s;
    var h = s.model, c = h.getModel("tooltip", n);
    if (C(s.getAxes(), It(g, !1, null)), s.getTooltipAxes && n && c.get("show")) {
      var f = c.get("trigger") === "axis", d = c.get(["axisPointer", "type"]) === "cross", v = s.getTooltipAxes(c.get(["axisPointer", "axis"]));
      (f || d) && C(v.baseAxes, It(g, d ? "cross" : !0, f)), d && C(v.otherAxes, It(g, "cross", !1));
    }
    function g(p, y, m) {
      var _ = m.model.getModel("axisPointer", i), b = _.get("show");
      if (!(!b || b === "auto" && !p && !gc(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = p ? OI(m, c, i, t, p, y) : _;
        var S = _.get("snap"), w = _.get("triggerEmphasis"), x = so(m.model), M = y || S || m.type === "category", D = e.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: M,
          snap: S,
          useHandle: gc(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, e.seriesInvolved = e.seriesInvolved || M;
        var A = kI(a, m);
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
function OI(e, t, r, n, i, a) {
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
function EI(e, t) {
  t.eachSeries(function(r) {
    var n = r.coordinateSystem, i = r.get(["tooltip", "trigger"], !0), a = r.get(["tooltip", "show"], !0);
    !n || i === "none" || i === !1 || i === "item" || a === !1 || r.get(["axisPointer", "show"], !0) === !1 || C(e.coordSysAxesInfo[so(n.model)], function(o) {
      var s = o.axis;
      n.getAxis(s.dim) === s && (o.seriesModels.push(r), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += r.getData().count());
    });
  });
}
function kI(e, t) {
  for (var r = t.model, n = t.dim, i = 0; i < e.length; i++) {
    var a = e[i] || {};
    if (oh(a[n + "AxisId"], r.id) || oh(a[n + "AxisIndex"], r.componentIndex) || oh(a[n + "AxisName"], r.name))
      return i;
  }
}
function oh(e, t) {
  return e === "all" || z(e) && pt(e, t) >= 0 || e === t;
}
function NI(e) {
  var t = Nf(e);
  if (t) {
    var r = t.axisPointerModel, n = t.axis.scale, i = r.option, a = r.get("status"), o = r.get("value");
    o != null && (o = n.parse(o));
    var s = gc(r);
    a == null && (i.status = s ? "show" : "hide");
    var l = n.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), i.value = o, s && (i.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Nf(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[so(e)];
}
function BI(e) {
  var t = Nf(e);
  return t && t.axisPointerModel;
}
function gc(e) {
  return !!e.get(["handle", "show"]);
}
function so(e) {
  return e.type + "||" + e.id;
}
var pg = {}, E0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, n, i, a) {
      this.axisPointerClass && NI(r), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(r, i, !0);
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
        var o = BI(r);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(r, o, n, i) : this._disposeAxisPointer(n);
      }
    }, t.prototype._disposeAxisPointer = function(r) {
      this._axisPointer && this._axisPointer.dispose(r), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(r, n) {
      pg[r] = n;
    }, t.getAxisPointerClass = function(r) {
      return r && pg[r];
    }, t.type = "axis", t;
  }(ke)
), yc = Lt();
function zI(e, t, r, n) {
  var i = r.axis;
  if (!i.scale.isBlank()) {
    var a = r.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = n.coordinateSystem.getRect(), u = i.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var h = s.length, c = yc(e).splitAreaColors, f = Q(), d = 0;
      if (c)
        for (var v = 0; v < u.length; v++) {
          var g = c.get(u[v].tickValue);
          if (g != null) {
            d = (g + (h - 1) * v) % h;
            break;
          }
        }
      var p = i.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = z(s) ? s : [s];
      for (var v = 1; v < u.length; v++) {
        var m = i.toGlobalCoord(u[v].coord), _ = void 0, b = void 0, S = void 0, w = void 0;
        i.isHorizontal() ? (_ = p, b = l.y, S = m - _, w = l.height, p = _ + S) : (_ = l.x, b = p, S = l.width, w = m - b, p = b + w);
        var x = u[v - 1].tickValue;
        x != null && f.set(x, d), t.add(new St({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: b,
            width: S,
            height: w
          },
          style: ht({
            fill: s[d]
          }, y),
          autoBatch: !0,
          silent: !0
        })), d = (d + 1) % h;
      }
      yc(e).splitAreaColors = f;
    }
  }
}
function FI(e) {
  yc(e).splitAreaColors = null;
}
var HI = ["axisLine", "axisTickLabel", "axisName"], VI = ["splitArea", "splitLine", "minorSplitLine"], k0 = (
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
      if (this._axisGroup = new Dt(), this.group.add(this._axisGroup), !!r.get("show")) {
        var s = r.getCoordSysModel(), l = pc(s, r), u = new Vr(r, N({
          handleAutoShown: function(c) {
            for (var f = s.coordinateSystem.getCartesians(), d = 0; d < f.length; d++)
              if (hc(f[d].getOtherAxis(r.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        C(HI, u.add, u), this._axisGroup.add(u.getGroup()), C(VI, function(c) {
          r.get([c, "show"]) && GI[c](this, this._axisGroup, r, s);
        }, this);
        var h = a && a.type === "changeAxisOrder" && a.isInitSort;
        h || Lm(o, this._axisGroup, r), e.prototype.render.call(this, r, n, i, a);
      }
    }, t.prototype.remove = function() {
      FI(this);
    }, t.type = "cartesianAxis", t;
  }(E0)
), GI = {
  splitLine: function(e, t, r, n) {
    var i = r.axis;
    if (!i.scale.isBlank()) {
      var a = r.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = z(s) ? s : [s];
      for (var h = n.coordinateSystem.getRect(), c = i.isHorizontal(), f = 0, d = i.getTicksCoords({
        tickModel: a
      }), v = [], g = [], p = o.getLineStyle(), y = 0; y < d.length; y++) {
        var m = i.toGlobalCoord(d[y].coord);
        if (!(y === 0 && !l || y === d.length - 1 && !u)) {
          var _ = d[y].tickValue;
          c ? (v[0] = m, v[1] = h.y, g[0] = m, g[1] = h.y + h.height) : (v[0] = h.x, v[1] = m, g[0] = h.x + h.width, g[1] = m);
          var b = f++ % s.length, S = new Ur({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: v[0],
              y1: v[1],
              x2: g[0],
              y2: g[1]
            },
            style: ht({
              stroke: s[b]
            }, p),
            silent: !0
          });
          Ja(S.shape, p.lineWidth), t.add(S);
        }
      }
    }
  },
  minorSplitLine: function(e, t, r, n) {
    var i = r.axis, a = r.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = n.coordinateSystem.getRect(), l = i.isHorizontal(), u = i.getMinorTicksCoords();
    if (u.length)
      for (var h = [], c = [], f = o.getLineStyle(), d = 0; d < u.length; d++)
        for (var v = 0; v < u[d].length; v++) {
          var g = i.toGlobalCoord(u[d][v].coord);
          l ? (h[0] = g, h[1] = s.y, c[0] = g, c[1] = s.y + s.height) : (h[0] = s.x, h[1] = g, c[0] = s.x + s.width, c[1] = g);
          var p = new Ur({
            anid: "minor_line_" + u[d][v].tickValue,
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
          Ja(p.shape, f.lineWidth), t.add(p);
        }
  },
  splitArea: function(e, t, r, n) {
    zI(e, t, r, n);
  }
}, N0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.type = "xAxis", t;
  }(k0)
), WI = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = N0.type, r;
    }
    return t.type = "yAxis", t;
  }(k0)
), UI = (
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
  }(ke)
), gg = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function YI(e) {
  e.registerComponentView(UI), e.registerComponentModel(pI), e.registerCoordinateSystem("cartesian2d", CI), ag(e, "x", dc, gg), ag(e, "y", dc, gg), e.registerComponentView(N0), e.registerComponentView(WI), e.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var lo = C, XI = V, il = -1, Vt = (
  /** @class */
  function() {
    function e(t) {
      var r = t.mappingMethod, n = t.type, i = this.option = q(t);
      this.type = n, this.mappingMethod = r, this._normalizeData = KI[r];
      var a = e.visualHandlers[n];
      this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._normalizedToVisual = a._normalizedToVisual[r], r === "piecewise" ? (sh(i), qI(i)) : r === "category" ? i.categories ? ZI(i) : sh(i, !0) : (Ze(r !== "linear" || i.dataExtent), sh(i));
    }
    return e.prototype.mapValueToVisual = function(t) {
      var r = this._normalizeData(t);
      return this._normalizedToVisual(r, t);
    }, e.prototype.getNormalizer = function() {
      return J(this._normalizeData, this);
    }, e.listVisualTypes = function() {
      return _t(e.visualHandlers);
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
      return t && lo(e.visualHandlers, function(i, a) {
        t.hasOwnProperty(a) && (r[a] = t[a], n = !0);
      }), n ? r : null;
    }, e.prepareVisualTypes = function(t) {
      if (z(t))
        t = t.slice();
      else if (XI(t)) {
        var r = [];
        lo(t, function(n, i) {
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
            if (os(c[1], t, h[1]))
              return o;
          } else if (h[1] === 1 / 0) {
            if (os(c[0], h[0], t))
              return o;
          } else if (os(c[0], h[0], t) && os(c[1], t, h[1]))
            return o;
          n && f(h[0], o), n && f(h[1], o);
        }
      }
      if (n)
        return t === 1 / 0 ? r.length - 1 : t === -1 / 0 ? 0 : i;
      function f(d, v) {
        var g = Math.abs(d - t);
        g < a && (a = g, i = v);
      }
    }, e.visualHandlers = {
      color: {
        applyVisual: ga("color"),
        getColorMapper: function() {
          var t = this.option;
          return J(t.mappingMethod === "category" ? function(r, n) {
            return !n && (r = this._normalizeData(r)), Da.call(this, r);
          } : function(r, n, i) {
            var a = !!i;
            return !n && (r = this._normalizeData(r)), i = ru(r, t.parsedVisual, i), a ? i : cr(i, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(t) {
            return cr(ru(t, this.option.parsedVisual), "rgba");
          },
          category: Da,
          piecewise: function(t, r) {
            var n = _c.call(this, r);
            return n == null && (n = cr(ru(t, this.option.parsedVisual), "rgba")), n;
          },
          fixed: xn
        }
      },
      colorHue: as(function(t, r) {
        return nu(t, r);
      }),
      colorSaturation: as(function(t, r) {
        return nu(t, null, r);
      }),
      colorLightness: as(function(t, r) {
        return nu(t, null, null, r);
      }),
      colorAlpha: as(function(t, r) {
        return G1(t, r);
      }),
      decal: {
        applyVisual: ga("decal"),
        _normalizedToVisual: {
          linear: null,
          category: Da,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: ga("opacity"),
        _normalizedToVisual: mc([0, 1])
      },
      liftZ: {
        applyVisual: ga("liftZ"),
        _normalizedToVisual: {
          linear: xn,
          category: xn,
          piecewise: xn,
          fixed: xn
        }
      },
      symbol: {
        applyVisual: function(t, r, n) {
          var i = this.mapValueToVisual(t);
          n("symbol", i);
        },
        _normalizedToVisual: {
          linear: yg,
          category: Da,
          piecewise: function(t, r) {
            var n = _c.call(this, r);
            return n == null && (n = yg.call(this, t)), n;
          },
          fixed: xn
        }
      },
      symbolSize: {
        applyVisual: ga("symbolSize"),
        _normalizedToVisual: mc([0, 1])
      }
    }, e;
  }()
);
function qI(e) {
  var t = e.pieceList;
  e.hasSpecialVisual = !1, C(t, function(r, n) {
    r.originIndex = n, r.visual != null && (e.hasSpecialVisual = !0);
  });
}
function ZI(e) {
  var t = e.categories, r = e.categoryMap = {}, n = e.visual;
  if (lo(t, function(o, s) {
    r[o] = s;
  }), !z(n)) {
    var i = [];
    V(n) ? lo(n, function(o, s) {
      var l = r[s];
      i[l ?? il] = o;
    }) : i[il] = n, n = B0(e, i);
  }
  for (var a = t.length - 1; a >= 0; a--)
    n[a] == null && (delete r[t[a]], t.pop());
}
function sh(e, t) {
  var r = e.visual, n = [];
  V(r) ? lo(r, function(a) {
    n.push(a);
  }) : r != null && n.push(r);
  var i = {
    color: 1,
    symbol: 1
  };
  !t && n.length === 1 && !i.hasOwnProperty(e.type) && (n[1] = n[0]), B0(e, n);
}
function as(e) {
  return {
    applyVisual: function(t, r, n) {
      var i = this.mapValueToVisual(t);
      n("color", e(r("color"), i));
    },
    _normalizedToVisual: mc([0, 1])
  };
}
function yg(e) {
  var t = this.option.visual;
  return t[Math.round(dr(e, [0, 1], [0, t.length - 1], !0))] || {};
}
function ga(e) {
  return function(t, r, n) {
    n(e, this.mapValueToVisual(t));
  };
}
function Da(e) {
  var t = this.option.visual;
  return t[this.option.loop && e !== il ? e % t.length : e];
}
function xn() {
  return this.option.visual[0];
}
function mc(e) {
  return {
    linear: function(t) {
      return dr(t, e, this.option.visual, !0);
    },
    category: Da,
    piecewise: function(t, r) {
      var n = _c.call(this, r);
      return n == null && (n = dr(t, e, this.option.visual, !0)), n;
    },
    fixed: xn
  };
}
function _c(e) {
  var t = this.option, r = t.pieceList;
  if (t.hasSpecialVisual) {
    var n = Vt.findPieceIndex(e, r), i = r[n];
    if (i && i.visual)
      return i.visual[this.type];
  }
}
function B0(e, t) {
  return e.visual = t, e.type === "color" && (e.parsedVisual = Y(t, function(r) {
    var n = we(r);
    return n || [0, 0, 0, 1];
  })), t;
}
var KI = {
  linear: function(e) {
    return dr(e, this.option.dataExtent, [0, 1], !0);
  },
  piecewise: function(e) {
    var t = this.option.pieceList, r = Vt.findPieceIndex(e, t, !0);
    if (r != null)
      return dr(r, [0, t.length - 1], [0, 1], !0);
  },
  category: function(e) {
    var t = this.option.categories ? this.option.categoryMap[e] : e;
    return t ?? il;
  },
  fixed: Xt
};
function os(e, t, r) {
  return e ? t <= r : t < r;
}
function jI(e, t, r, n, i, a) {
  e = e || 0;
  var o = r[1] - r[0];
  if (i != null && (i = si(i, [0, o])), a != null && (a = Math.max(a, i ?? 0)), n === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = si(s, [0, o]), i = a = si(s, [i, a]), n = 0;
  }
  t[0] = si(t[0], r), t[1] = si(t[1], r);
  var l = lh(t, n);
  t[n] += e;
  var u = i || 0, h = r.slice();
  l.sign < 0 ? h[0] += u : h[1] -= u, t[n] = si(t[n], h);
  var c;
  return c = lh(t, n), i != null && (c.sign !== l.sign || c.span < i) && (t[1 - n] = t[n] + l.sign * i), c = lh(t, n), a != null && c.span > a && (t[1 - n] = t[n] + c.sign * a), t;
}
function lh(e, t) {
  var r = e[t] - e[1 - t];
  return {
    span: Math.abs(r),
    sign: r > 0 ? -1 : r < 0 ? 1 : t ? -1 : 1
  };
}
function si(e, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, e));
}
var QI = 256, JI = (
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
    return e.prototype.update = function(t, r, n, i, a, o) {
      var s = this._getBrush(), l = this._getGradient(a, "inRange"), u = this._getGradient(a, "outOfRange"), h = this.pointSize + this.blurSize, c = this.canvas, f = c.getContext("2d"), d = t.length;
      c.width = r, c.height = n;
      for (var v = 0; v < d; ++v) {
        var g = t[v], p = g[0], y = g[1], m = g[2], _ = i(m);
        f.globalAlpha = _, f.drawImage(s, p - h, y - h);
      }
      if (!c.width || !c.height)
        return c;
      for (var b = f.getImageData(0, 0, c.width, c.height), S = b.data, w = 0, x = S.length, M = this.minOpacity, D = this.maxOpacity, A = D - M; w < x; ) {
        var _ = S[w + 3] / 256, T = Math.floor(_ * (QI - 1)) * 4;
        if (_ > 0) {
          var $ = o(_) ? l : u;
          _ > 0 && (_ = _ * A + M), S[w++] = $[T], S[w++] = $[T + 1], S[w++] = $[T + 2], S[w++] = $[T + 3] * _ * 256;
        } else
          w += 4;
      }
      return f.putImageData(b, 0, 0), c;
    }, e.prototype._getBrush = function() {
      var t = this._brushCanvas || (this._brushCanvas = Wr.createCanvas()), r = this.pointSize + this.blurSize, n = r * 2;
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
function t$(e, t, r) {
  var n = e[1] - e[0];
  t = Y(t, function(o) {
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
function e$(e, t) {
  var r = e[1] - e[0];
  return t = [(t[0] - e[0]) / r, (t[1] - e[0]) / r], function(n) {
    return n >= t[0] && n <= t[1];
  };
}
function mg(e) {
  var t = e.dimensions;
  return t[0] === "lng" && t[1] === "lat";
}
var r$ = (
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
      o.type === "cartesian2d" || o.type === "calendar" ? this._renderOnCartesianAndCalendar(r, i, 0, r.getData().count()) : mg(o) && this._renderOnGeo(o, r, a, i);
    }, t.prototype.incrementalPrepareRender = function(r, n, i) {
      this.group.removeAll();
    }, t.prototype.incrementalRender = function(r, n, i, a) {
      var o = n.coordinateSystem;
      o && (mg(o) ? this.render(n, i, a) : (this._progressiveEls = [], this._renderOnCartesianAndCalendar(n, a, r.start, r.end, !0)));
    }, t.prototype.eachRendered = function(r) {
      mo(this._progressiveEls || this.group, r);
    }, t.prototype._renderOnCartesianAndCalendar = function(r, n, i, a, o) {
      var s = r.coordinateSystem, l = Hl(s, "cartesian2d"), u, h, c, f;
      if (l) {
        var d = s.getAxis("x"), v = s.getAxis("y");
        u = d.getBandWidth() + 0.5, h = v.getBandWidth() + 0.5, c = d.scale.getExtent(), f = v.scale.getExtent();
      }
      for (var g = this.group, p = r.getData(), y = r.getModel(["emphasis", "itemStyle"]).getItemStyle(), m = r.getModel(["blur", "itemStyle"]).getItemStyle(), _ = r.getModel(["select", "itemStyle"]).getItemStyle(), b = r.get(["itemStyle", "borderRadius"]), S = Pi(r), w = r.getModel("emphasis"), x = w.get("focus"), M = w.get("blurScope"), D = w.get("disabled"), A = l ? [p.mapDimension("x"), p.mapDimension("y"), p.mapDimension("value")] : [p.mapDimension("time"), p.mapDimension("value")], T = i; T < a; T++) {
        var $ = void 0, L = p.getItemVisual(T, "style");
        if (l) {
          var P = p.get(A[0], T), R = p.get(A[1], T);
          if (isNaN(p.get(A[2], T)) || isNaN(P) || isNaN(R) || P < c[0] || P > c[1] || R < f[0] || R > f[1])
            continue;
          var E = s.dataToPoint([P, R]);
          $ = new St({
            shape: {
              x: E[0] - u / 2,
              y: E[1] - h / 2,
              width: u,
              height: h
            },
            style: L
          });
        } else {
          if (isNaN(p.get(A[1], T)))
            continue;
          $ = new St({
            z2: 1,
            shape: s.dataToRect([p.get(A[0], T)]).contentShape,
            style: L
          });
        }
        if (p.hasItemOption) {
          var G = p.getItemModel(T), k = G.getModel("emphasis");
          y = k.getModel("itemStyle").getItemStyle(), m = G.getModel(["blur", "itemStyle"]).getItemStyle(), _ = G.getModel(["select", "itemStyle"]).getItemStyle(), b = G.get(["itemStyle", "borderRadius"]), x = k.get("focus"), M = k.get("blurScope"), D = k.get("disabled"), S = Pi(G);
        }
        $.shape.r = b;
        var F = r.getRawValue(T), W = "-";
        F && F[2] != null && (W = F[2] + ""), _o($, S, {
          labelFetcher: r,
          labelDataIndex: T,
          defaultOpacity: L.opacity,
          defaultText: W
        }), $.ensureState("emphasis").style = y, $.ensureState("blur").style = m, $.ensureState("select").style = _, Qa($, x, M, D), $.incremental = o, o && ($.states.emphasis.hoverLayer = !0), g.add($), p.setItemGraphicEl(T, $), this._progressiveEls && this._progressiveEls.push($);
      }
    }, t.prototype._renderOnGeo = function(r, n, i, a) {
      var o = i.targetVisuals.inRange, s = i.targetVisuals.outOfRange, l = n.getData(), u = this._hmLayer || this._hmLayer || new JI();
      u.blurSize = n.get("blurSize"), u.pointSize = n.get("pointSize"), u.minOpacity = n.get("minOpacity"), u.maxOpacity = n.get("maxOpacity");
      var h = r.getViewRect().clone(), c = r.getRoamTransform();
      h.applyTransform(c);
      var f = Math.max(h.x, 0), d = Math.max(h.y, 0), v = Math.min(h.width + h.x, a.getWidth()), g = Math.min(h.height + h.y, a.getHeight()), p = v - f, y = g - d, m = [l.mapDimension("lng"), l.mapDimension("lat"), l.mapDimension("value")], _ = l.mapArray(m, function(x, M, D) {
        var A = r.dataToPoint([x, M]);
        return A[0] -= f, A[1] -= d, A.push(D), A;
      }), b = i.getExtent(), S = i.type === "visualMap.continuous" ? e$(b, i.option.range) : t$(b, i.getPieceList(), i.option.selected);
      u.update(_, p, y, o.color.getNormalizer(), {
        inRange: o.color.getColorMapper(),
        outOfRange: s.color.getColorMapper()
      }, S);
      var w = new rr({
        style: {
          width: p,
          height: y,
          x: f,
          y: d,
          image: u.canvas
        },
        silent: !0
      });
      this.group.add(w);
    }, t.type = "heatmap", t;
  }(Se)
), n$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.getInitialData = function(r, n) {
      return Nl(null, this, {
        generateCoord: "value"
      });
    }, t.prototype.preventIncremental = function() {
      var r = Rl.get(this.get("coordinateSystem"));
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
  }(Ee)
);
function i$(e) {
  e.registerChartView(r$), e.registerSeriesModel(n$);
}
var Tn = Lt(), _g = q, uh = J, a$ = (
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
          s = this._group = new Dt(), this.createPointerEl(s, u, t, r), this.createLabelEl(s, u, t, r), n.getZr().add(s);
        else {
          var f = It(bg, r, c);
          this.updatePointerEl(s, u, f), this.updateLabelEl(s, u, f, r);
        }
        Sg(s, r, !0), this._renderHandle(a);
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
          var l = Nf(t).seriesDataCount, u = i.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return n === !0;
    }, e.prototype.makeElOption = function(t, r, n, i, a) {
    }, e.prototype.createPointerEl = function(t, r, n, i) {
      var a = r.pointer;
      if (a) {
        var o = Tn(t).pointerEl = new qT[a.type](_g(r.pointer));
        t.add(o);
      }
    }, e.prototype.createLabelEl = function(t, r, n, i) {
      if (r.label) {
        var a = Tn(t).labelEl = new $t(_g(r.label));
        t.add(a), wg(a, i);
      }
    }, e.prototype.updatePointerEl = function(t, r, n) {
      var i = Tn(t).pointerEl;
      i && r.pointer && (i.setStyle(r.pointer.style), n(i, {
        shape: r.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function(t, r, n, i) {
      var a = Tn(t).labelEl;
      a && (a.setStyle(r.label.style), n(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: r.label.x,
        y: r.label.y
      }), wg(a, i));
    }, e.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var r = this._axisPointerModel, n = this._api.getZr(), i = this._handle, a = r.getModel("handle"), o = r.get("status");
        if (!a.get("show") || !o || o === "hide") {
          i && n.remove(i), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, i = this._handle = hf(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Xa(u.event);
          },
          onmousedown: uh(this._onHandleDragMove, this, 0, 0),
          drift: uh(this._onHandleDragMove, this),
          ondragend: uh(this._onHandleDragEnd, this)
        }), n.add(i)), Sg(i, r, !1), i.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        z(l) || (l = [l, l]), i.scaleX = l[0] / 2, i.scaleY = l[1] / 2, b_(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, e.prototype._moveHandleToValue = function(t, r) {
      bg(this._axisPointerModel, !r && this._moveAnimation, this._handle, hh(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function(t, r) {
      var n = this._handle;
      if (n) {
        this._dragging = !0;
        var i = this.updateHandleTransform(hh(n), [t, r], this._axisModel, this._axisPointerModel);
        this._payloadInfo = i, n.stopAnimation(), n.attr(hh(i)), Tn(n).lastProp = null, this._doDispatchAxisPointer();
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
      r && n && (this._lastGraphicKey = null, n && r.remove(n), i && r.remove(i), this._group = null, this._handle = null, this._payloadInfo = null), tc(this, "_doDispatchAxisPointer");
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
function bg(e, t, r, n) {
  z0(Tn(r).lastProp, n) || (Tn(r).lastProp = n, t ? le(r, n, e) : (r.stopAnimation(), r.attr(n)));
}
function z0(e, t) {
  if (V(e) && V(t)) {
    var r = !0;
    return C(t, function(n, i) {
      r = r && z0(e[i], n);
    }), !!r;
  } else
    return e === t;
}
function wg(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function hh(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function Sg(e, t, r) {
  var n = t.get("z"), i = t.get("zlevel");
  e && e.traverse(function(a) {
    a.type !== "group" && (n != null && (a.z = n), i != null && (a.zlevel = i), a.silent = r);
  });
}
function o$(e) {
  var t = e.get("type"), r = e.getModel(t + "Style"), n;
  return t === "line" ? (n = r.getLineStyle(), n.fill = null) : t === "shadow" && (n = r.getAreaStyle(), n.stroke = null), n;
}
function s$(e, t, r, n, i) {
  var a = r.get("value"), o = F0(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
    precision: r.get(["label", "precision"]),
    formatter: r.get(["label", "formatter"])
  }), s = r.getModel("label"), l = bo(s.get("padding") || 0), u = s.getFont(), h = Uc(o, u), c = i.position, f = h.width + l[1] + l[3], d = h.height + l[0] + l[2], v = i.align;
  v === "right" && (c[0] -= f), v === "center" && (c[0] -= f / 2);
  var g = i.verticalAlign;
  g === "bottom" && (c[1] -= d), g === "middle" && (c[1] -= d / 2), l$(c, f, d, n);
  var p = s.get("backgroundColor");
  (!p || p === "auto") && (p = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: c[0],
    y: c[1],
    style: qe(s, {
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
function l$(e, t, r, n) {
  var i = n.getWidth(), a = n.getHeight();
  e[0] = Math.min(e[0] + t, i) - t, e[1] = Math.min(e[1] + r, a) - r, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function F0(e, t, r, n, i) {
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
      value: Pf(t, {
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
function H0(e, t, r) {
  var n = bi();
  return Hc(n, n, r.rotation), Ch(n, n, r.position), xi([e.dataToCoord(t), (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0)], n);
}
function u$(e, t, r, n, i, a) {
  var o = Vr.innerTextLayout(r.rotation, 0, r.labelDirection);
  r.labelMargin = i.get(["label", "margin"]), s$(t, n, i, a, {
    position: H0(n.axis, e, r),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function h$(e, t, r) {
  return r = r || 0, {
    x1: e[r],
    y1: e[1 - r],
    x2: t[r],
    y2: t[1 - r]
  };
}
function c$(e, t, r) {
  return r = r || 0, {
    x: e[r],
    y: e[1 - r],
    width: t[r],
    height: t[1 - r]
  };
}
var f$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(r, n, i, a, o) {
      var s = i.axis, l = s.grid, u = a.get("type"), h = xg(l, s).getOtherAxis(s).getGlobalExtent(), c = s.toGlobalCoord(s.dataToCoord(n, !0));
      if (u && u !== "none") {
        var f = o$(a), d = d$[u](s, c, h);
        d.style = f, r.graphicKey = d.type, r.pointer = d;
      }
      var v = pc(l.model, i);
      u$(
        // @ts-ignore
        n,
        r,
        v,
        i,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(r, n, i) {
      var a = pc(n.axis.grid.model, n, {
        labelInside: !1
      });
      a.labelMargin = i.get(["handle", "margin"]);
      var o = H0(n.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(r, n, i, a) {
      var o = i.axis, s = o.grid, l = o.getGlobalExtent(!0), u = xg(s, o).getOtherAxis(o).getGlobalExtent(), h = o.dim === "x" ? 0 : 1, c = [r.x, r.y];
      c[h] += n[h], c[h] = Math.min(l[1], c[h]), c[h] = Math.max(l[0], c[h]);
      var f = (u[1] + u[0]) / 2, d = [f, f];
      d[h] = c[h];
      var v = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: c[0],
        y: c[1],
        rotation: r.rotation,
        cursorPoint: d,
        tooltipOption: v[h]
      };
    }, t;
  }(a$)
);
function xg(e, t) {
  var r = {};
  return r[t.dim + "AxisIndex"] = t.index, e.getCartesian(r);
}
var d$ = {
  line: function(e, t, r) {
    var n = h$([t, r[0]], [t, r[1]], Tg(e));
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
      shape: c$([t - n / 2, r[0]], [n, i], Tg(e))
    };
  }
};
function Tg(e) {
  return e.dim === "x" ? 0 : 1;
}
var v$ = (
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
), hr = Lt(), p$ = C;
function V0(e, t, r) {
  if (!X.node) {
    var n = t.getZr();
    hr(n).records || (hr(n).records = {}), g$(n, t);
    var i = hr(n).records[e] || (hr(n).records[e] = {});
    i.handler = r;
  }
}
function g$(e, t) {
  if (hr(e).initialized)
    return;
  hr(e).initialized = !0, r("click", It(Cg, "click")), r("mousemove", It(Cg, "mousemove")), r("globalout", m$);
  function r(n, i) {
    e.on(n, function(a) {
      var o = _$(t);
      p$(hr(e).records, function(s) {
        s && i(s, a, o.dispatchAction);
      }), y$(o.pendings, t);
    });
  }
}
function y$(e, t) {
  var r = e.showTip.length, n = e.hideTip.length, i;
  r ? i = e.showTip[r - 1] : n && (i = e.hideTip[n - 1]), i && (i.dispatchAction = null, t.dispatchAction(i));
}
function m$(e, t, r) {
  e.handler("leave", null, r);
}
function Cg(e, t, r, n) {
  t.handler(e, r, n);
}
function _$(e) {
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
function bc(e, t) {
  if (!X.node) {
    var r = t.getZr(), n = (hr(r).records || {})[e];
    n && (hr(r).records[e] = null);
  }
}
var b$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.render = function(r, n, i) {
      var a = n.getComponent("tooltip"), o = r.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      V0("axisPointer", i, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(r, n) {
      bc("axisPointer", n);
    }, t.prototype.dispose = function(r, n) {
      bc("axisPointer", n);
    }, t.type = "axisPointer", t;
  }(ke)
);
function G0(e, t) {
  var r = [], n = e.seriesIndex, i;
  if (n == null || !(i = t.getSeriesByIndex(n)))
    return {
      point: []
    };
  var a = i.getData(), o = kn(a, e);
  if (o == null || o < 0 || z(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = i.coordinateSystem;
  if (i.getTooltipPosition)
    r = i.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(), h = l.getOtherAxis(u), c = h.dim, f = u.dim, d = c === "x" || c === "radius" ? 1 : 0, v = a.mapDimension(f), g = [];
      g[d] = a.get(v, o), g[1 - d] = a.get(a.getCalculationInfo("stackResultDimension"), o), r = l.dataToPoint(g) || [];
    } else
      r = l.dataToPoint(a.getValues(Y(l.dimensions, function(y) {
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
var Mg = Lt();
function w$(e, t, r) {
  var n = e.currTrigger, i = [e.x, e.y], a = e, o = e.dispatchAction || J(r.dispatchAction, r), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Cs(i) && (i = G0({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = Cs(i), u = a.axesInfo, h = s.axesInfo, c = n === "leave" || Cs(i), f = {}, d = {}, v = {
      list: [],
      map: {}
    }, g = {
      showPointer: It(x$, d),
      showTooltip: It(T$, v)
    };
    C(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(i);
      C(s.coordSysAxesInfo[m], function(b, S) {
        var w = b.axis, x = A$(u, b);
        if (!c && _ && (!u || x)) {
          var M = x && x.value;
          M == null && !l && (M = w.pointToData(i)), M != null && Dg(b, M, g, !1, f);
        }
      });
    });
    var p = {};
    return C(h, function(y, m) {
      var _ = y.linkGroup;
      _ && !d[m] && C(_.axesInfo, function(b, S) {
        var w = d[S];
        if (b !== y && w) {
          var x = w.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, Ag(b), Ag(y)))), p[y.key] = x;
        }
      });
    }), C(p, function(y, m) {
      Dg(h[m], y, g, !0, f);
    }), C$(d, h, f), M$(v, i, e, o), D$(h, o, r), f;
  }
}
function Dg(e, t, r, n, i) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = S$(t, e), s = o.payloadBatch, l = o.snapToValue;
    s[0] && i.seriesIndex == null && N(i, s[0]), !n && e.snap && a.containData(l) && l != null && (t = l), r.showPointer(e, t, s), r.showTooltip(e, o, l);
  }
}
function S$(e, t) {
  var r = t.axis, n = r.dim, i = e, a = [], o = Number.MAX_VALUE, s = -1;
  return C(t.seriesModels, function(l, u) {
    var h = l.getData().mapDimensionsAll(n), c, f;
    if (l.getAxisTooltipData) {
      var d = l.getAxisTooltipData(h, e, r);
      f = d.dataIndices, c = d.nestestValue;
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
      var v = e - c, g = Math.abs(v);
      g <= o && ((g < o || v >= 0 && s < 0) && (o = g, s = v, i = c, a.length = 0), C(f, function(p) {
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
function x$(e, t, r, n) {
  e[t.key] = {
    value: r,
    payloadBatch: n
  };
}
function T$(e, t, r, n) {
  var i = r.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !i.length)) {
    var l = t.coordSys.model, u = so(l), h = e.map[u];
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
function C$(e, t, r) {
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
function M$(e, t, r, n) {
  if (Cs(t) || !e.list.length) {
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
function D$(e, t, r) {
  var n = r.getZr(), i = "axisPointerLastHighlights", a = Mg(n)[i] || {}, o = Mg(n)[i] = {};
  C(e, function(u, h) {
    var c = u.axisPointerModel.option;
    c.status === "show" && u.triggerEmphasis && C(c.seriesDataIndices, function(f) {
      var d = f.seriesIndex + " | " + f.dataIndex;
      o[d] = f;
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
function A$(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var n = e[r];
    if (t.axis.dim === n.axisDim && t.axis.model.componentIndex === n.axisIndex)
      return n;
  }
}
function Ag(e) {
  var t = e.axis.model, r = {}, n = r.axisDim = e.axis.dim;
  return r.axisIndex = r[n + "AxisIndex"] = t.componentIndex, r.axisName = r[n + "AxisName"] = t.name, r.axisId = r[n + "AxisId"] = t.id, r;
}
function Cs(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function W0(e) {
  E0.registerAxisPointerClass("CartesianAxisPointer", f$), e.registerComponentModel(v$), e.registerComponentView(b$), e.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var r = t.axisPointer.link;
      r && !z(r) && (t.axisPointer.link = [r]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function(t, r) {
    t.getComponent("axisPointer").coordSysAxesInfo = PI(t, r);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, w$);
}
function I$(e) {
  Qe(YI), Qe(W0);
}
function $$(e, t) {
  var r = bo(t.get("padding")), n = t.getItemStyle(["color", "opacity"]);
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
var L$ = (
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
function U0(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function Y0(e) {
  if (X.domSupported) {
    for (var t = document.documentElement.style, r = 0, n = e.length; r < n; r++)
      if (e[r] in t)
        return e[r];
  }
}
var X0 = Y0(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), P$ = Y0(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function q0(e, t) {
  if (!e)
    return t;
  t = Ym(t, !0);
  var r = e.indexOf(t);
  return e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t, e.toLowerCase();
}
function R$(e, t) {
  var r = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return r ? r[t] : null;
}
var O$ = q0(P$, "transition"), Bf = q0(X0, "transform"), E$ = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (X.transform3dSupported ? "will-change:transform;" : "");
function k$(e) {
  return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function N$(e, t, r) {
  if (!H(r) || r === "inside")
    return "";
  var n = e.get("backgroundColor"), i = e.get("borderWidth");
  t = Bn(t);
  var a = k$(r), o = Math.max(Math.round(i) * 1.5, 6), s = "", l = Bf + ":", u;
  pt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var h = u * Math.PI / 180, c = o + i, f = c * Math.abs(Math.cos(h)) + c * Math.abs(Math.sin(h)), d = Math.round(((f - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (f - c) / 2) * 100) / 100;
  s += ";" + a + ":-" + d + "px";
  var v = t + " solid " + i + "px;", g = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + v, "border-right:" + v, "background-color:" + n + ";"];
  return '<div style="' + g.join("") + '"></div>';
}
function B$(e, t) {
  var r = "cubic-bezier(0.23,1,0.32,1)", n = " " + e / 2 + "s " + r, i = "opacity" + n + ",visibility" + n;
  return t || (n = " " + e + "s " + r, i += X.transformSupported ? "," + Bf + n : ",left" + n + ",top" + n), O$ + ":" + i;
}
function Ig(e, t, r) {
  var n = e.toFixed(0) + "px", i = t.toFixed(0) + "px";
  if (!X.transformSupported)
    return r ? "top:" + i + ";left:" + n + ";" : [["top", i], ["left", n]];
  var a = X.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + n + "," + i + (a ? ",0" : "") + ")";
  return r ? "top:0;left:0;" + Bf + ":" + o + ";" : [["top", 0], ["left", 0], [X0, o]];
}
function z$(e) {
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
function F$(e, t, r) {
  var n = [], i = e.get("transitionDuration"), a = e.get("backgroundColor"), o = e.get("shadowBlur"), s = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), h = e.getModel("textStyle"), c = m_(e, "html"), f = l + "px " + u + "px " + o + "px " + s;
  return n.push("box-shadow:" + f), t && i && n.push(B$(i, r)), a && n.push("background-color:" + a), C(["width", "color", "radius"], function(d) {
    var v = "border-" + d, g = Ym(v), p = e.get(g);
    p != null && n.push(v + ":" + p + (d === "color" ? "" : "px"));
  }), n.push(z$(h)), c != null && n.push("padding:" + bo(c).join("px ") + "px"), n.join(";") + ";";
}
function $g(e, t, r, n, i) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && u1(e, o, r, n, i);
  } else {
    e[0] = n, e[1] = i;
    var s = a && a.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var H$ = (
  /** @class */
  function() {
    function e(t, r) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, X.wxa)
        return null;
      var n = document.createElement("div");
      n.domBelongToZr = !0, this.el = n;
      var i = this._zr = t.getZr(), a = r.appendTo, o = a && (H(a) ? document.querySelector(a) : Ya(a) ? a : Z(a) && a(t.getDom()));
      $g(this._styleCoord, i, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(n), this._api = t, this._container = o;
      var s = this;
      n.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, n.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = i.handler, h = i.painter.getViewportRoot();
          de(h, l, !0), u.dispatch("mousemove", l);
        }
      }, n.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return e.prototype.update = function(t) {
      if (!this._container) {
        var r = this._api.getDom(), n = R$(r, "position"), i = r.style;
        i.position !== "absolute" && n !== "absolute" && (i.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, e.prototype.show = function(t, r) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var n = this.el, i = n.style, a = this._styleCoord;
      n.innerHTML ? i.cssText = E$ + F$(t, !this._firstShow, this._longHide) + Ig(a[0], a[1], !0) + ("border-color:" + Bn(r) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : i.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function(t, r, n, i, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (H(a) && n.get("trigger") === "item" && !U0(n) && (s = N$(n, i, a)), H(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", z(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Ya(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
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
        if ($g(n, this._zr, this._container, t, r), n[0] != null && n[1] != null) {
          var i = this.el.style, a = Ig(n[0], n[1]);
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
), V$ = (
  /** @class */
  function() {
    function e(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), Pg(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
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
      this.el = new $t({
        style: {
          rich: r.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: i,
          textShadowColor: s.get("textShadowColor"),
          fill: n.get(["textStyle", "color"]),
          padding: m_(n, "richText"),
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
      var t = this.el, r = this.el.getBoundingRect(), n = Lg(t.style);
      return [r.width + n.left + n.right, r.height + n.top + n.bottom];
    }, e.prototype.moveTo = function(t, r) {
      var n = this.el;
      if (n) {
        var i = this._styleCoord;
        Pg(i, this._zr, t, r), t = i[0], r = i[1];
        var a = n.style, o = Er(a.borderWidth || 0), s = Lg(a);
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
function Lg(e) {
  var t = Er(e.shadowBlur || 0), r = Er(e.shadowOffsetX || 0), n = Er(e.shadowOffsetY || 0);
  return {
    left: Er(t - r),
    right: Er(t + r),
    top: Er(t - n),
    bottom: Er(t + n)
  };
}
function Pg(e, t, r, n) {
  e[0] = r, e[1] = n, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var G$ = new St({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), W$ = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r;
    }
    return t.prototype.init = function(r, n) {
      if (!(X.node || !n.getDom())) {
        var i = r.getComponent("tooltip"), a = this._renderMode = BS(i.get("renderMode"));
        this._tooltipContent = a === "richText" ? new V$(n) : new H$(n, {
          appendTo: i.get("appendToBody", !0) ? "body" : i.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(r, n, i) {
      if (!(X.node || !i.getDom())) {
        this.group.removeAll(), this._tooltipModel = r, this._ecModel = n, this._api = i;
        var a = this._tooltipContent;
        a.update(r), a.setEnterable(r.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && r.get("transitionDuration") ? b_(this, "_updatePosition", 50, "fixRate") : tc(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var r = this._tooltipModel, n = r.get("triggerOn");
      V0("itemTooltip", this._api, J(function(i, a, o) {
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
        var o = Rg(a, i);
        this._ticket = "";
        var s = a.dataByCoordSys, l = q$(a, n, i);
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
          var h = G$;
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
          var c = G0(a, n), f = c.point[0], d = c.point[1];
          f != null && d != null && this._tryShow({
            offsetX: f,
            offsetY: d,
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
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Rg(a, i));
    }, t.prototype._manuallyAxisShowTip = function(r, n, i, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = n.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = n.getSeriesByIndex(o);
        if (u) {
          var h = u.getData(), c = ya([h.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
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
          mi(i, function(h) {
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
      var i = this._ecModel, a = this._tooltipModel, o = [n.offsetX, n.offsetY], s = ya([n.tooltipOption], a), l = this._renderMode, u = [], h = no("section", {
        blocks: [],
        noHeader: !0
      }), c = [], f = new Hu();
      C(r, function(m) {
        C(m.dataByAxis, function(_) {
          var b = i.getComponent(_.axisDim + "Axis", _.axisIndex), S = _.value;
          if (!(!b || S == null)) {
            var w = F0(S, b.axis, i, _.seriesDataIndices, _.valueLabelOpt), x = no("section", {
              header: w,
              noHeader: !Ye(w),
              sortBlocks: !0,
              blocks: []
            });
            h.blocks.push(x), C(_.seriesDataIndices, function(M) {
              var D = i.getSeriesByIndex(M.seriesIndex), A = M.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = Pf(b.axis, {
                  value: S
                }), T.axisValueLabel = w, T.marker = f.makeTooltipMarker("item", Bn(T.color), l);
                var $ = Xv(D.formatTooltip(A, !0, null)), L = $.frag;
                if (L) {
                  var P = ya([D], a).get("valueFormatter");
                  x.blocks.push(P ? N({
                    valueFormatter: P
                  }, L) : L);
                }
                $.text && c.push($.text), u.push(T);
              }
            });
          }
        });
      }), h.blocks.reverse(), c.reverse();
      var d = n.position, v = s.get("order"), g = Qv(h, f, l, v, i.get("useUTC"), s.get("textStyle"));
      g && c.unshift(g);
      var p = l === "richText" ? `

` : "<br/>", y = c.join(p);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(r, u) ? this._updatePosition(s, d, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], d, null, f);
      });
    }, t.prototype._showSeriesItemTooltip = function(r, n, i) {
      var a = this._ecModel, o = st(n), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, h = o.dataIndex, c = o.dataType, f = u.getData(c), d = this._renderMode, v = r.positionDefault, g = ya([f.getItemModel(h), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, v ? {
        position: v
      } : null), p = g.get("trigger");
      if (!(p != null && p !== "item")) {
        var y = u.getDataParams(h, c), m = new Hu();
        y.marker = m.makeTooltipMarker("item", Bn(y.color), d);
        var _ = Xv(u.formatTooltip(h, !1, c)), b = g.get("order"), S = g.get("valueFormatter"), w = _.frag, x = w ? Qv(S ? N({
          valueFormatter: S
        }, w) : w, m, d, b, a.get("useUTC"), g.get("textStyle")) : _.text, M = "item_" + u.name + "_" + h;
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
      var d = r.positionDefault, v = ya(c, this._tooltipModel, d ? {
        position: d
      } : null), g = v.get("content"), p = Math.random() + "", y = new Hu();
      this._showOrMove(v, function() {
        var m = q(v.get("formatterParams") || {});
        this._showTooltipContent(v, g, m, p, r.offsetX, r.offsetY, r.position, n, y);
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
        var d = n, v = this._getNearestPoint([o, s], i, r.get("trigger"), r.get("borderColor")), g = v.color;
        if (f)
          if (H(f)) {
            var p = r.ecModel.get("useUTC"), y = z(i) ? i[0] : i, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            d = f, m && (d = Dl(y.axisValue, d, p)), d = Xm(d, i, !0);
          } else if (Z(f)) {
            var _ = J(function(b, S) {
              b === this._ticket && (c.setContent(S, h, r, g, l), this._updatePosition(r, l, o, s, c, i, u));
            }, this);
            this._ticket = a, d = f(i, a, _);
          } else
            d = f;
        c.setContent(d, h, r, g, l), c.show(r, g), this._updatePosition(r, l, o, s, c, i, u);
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
      var c = o.getSize(), f = r.get("align"), d = r.get("verticalAlign"), v = l && l.getBoundingRect().clone();
      if (l && v.applyTransform(l.transform), Z(n) && (n = n([i, a], s, o.el, v, {
        viewSize: [u, h],
        contentSize: c.slice()
      })), z(n))
        i = Yt(n[0], u), a = Yt(n[1], h);
      else if (V(n)) {
        var g = n;
        g.width = c[0], g.height = c[1];
        var p = Ri(g, {
          width: u,
          height: h
        });
        i = p.x, a = p.y, f = null, d = null;
      } else if (H(n) && l) {
        var y = X$(n, v, c, r.get("borderWidth"));
        i = y[0], a = y[1];
      } else {
        var y = U$(i, a, o, u, h, f ? null : 20, d ? null : 20);
        i = y[0], a = y[1];
      }
      if (f && (i -= Og(f) ? c[0] / 2 : f === "right" ? c[0] : 0), d && (a -= Og(d) ? c[1] / 2 : d === "bottom" ? c[1] : 0), U0(r)) {
        var y = Y$(i, a, o, u, h);
        i = y[0], a = y[1];
      }
      o.moveTo(i, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(r, n) {
      var i = this._lastDataByCoordSys, a = this._cbParamsList, o = !!i && i.length === r.length;
      return o && C(i, function(s, l) {
        var u = s.dataByAxis || [], h = r[l] || {}, c = h.dataByAxis || [];
        o = o && u.length === c.length, o && C(u, function(f, d) {
          var v = c[d] || {}, g = f.seriesDataIndices || [], p = v.seriesDataIndices || [];
          o = o && f.value === v.value && f.axisType === v.axisType && f.axisId === v.axisId && g.length === p.length, o && C(g, function(y, m) {
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
      X.node || !n.getDom() || (tc(this, "_updatePosition"), this._tooltipContent.dispose(), bc("itemTooltip", n));
    }, t.type = "tooltip", t;
  }(ke)
);
function ya(e, t, r) {
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
function Rg(e, t) {
  return e.dispatchAction || J(t.dispatchAction, t);
}
function U$(e, t, r, n, i, a, o) {
  var s = r.getSize(), l = s[0], u = s[1];
  return a != null && (e + l + a + 2 > n ? e -= l + a : e += a), o != null && (t + u + o > i ? t -= u + o : t += o), [e, t];
}
function Y$(e, t, r, n, i) {
  var a = r.getSize(), o = a[0], s = a[1];
  return e = Math.min(e + o, n) - o, t = Math.min(t + s, i) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function X$(e, t, r, n) {
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
function Og(e) {
  return e === "center" || e === "middle";
}
function q$(e, t, r) {
  var n = Zc(e).queryOptionMap, i = n.keys()[0];
  if (!(!i || i === "series")) {
    var a = go(t, i, n.get(i), {
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
function Z$(e) {
  Qe(W0), e.registerComponentModel(L$), e.registerComponentView(W$), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Xt), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Xt);
}
var Eg = C;
function kg(e) {
  if (e) {
    for (var t in e)
      if (e.hasOwnProperty(t))
        return !0;
  }
}
function Ng(e, t, r) {
  var n = {};
  return Eg(t, function(a) {
    var o = n[a] = i();
    Eg(e[a], function(s, l) {
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
function K$(e, t, r) {
  var n;
  C(r, function(i) {
    t.hasOwnProperty(i) && kg(t[i]) && (n = !0);
  }), n && C(r, function(i) {
    t.hasOwnProperty(i) && kg(t[i]) ? e[i] = q(t[i]) : delete e[i];
  });
}
function j$(e, t, r, n) {
  var i = {};
  return C(e, function(a) {
    var o = Vt.prepareVisualTypes(t[a]);
    i[a] = o;
  }), {
    progress: function(o, s) {
      var l;
      n != null && (l = s.getDimensionIndex(n));
      function u(S) {
        return A_(s, c, S);
      }
      function h(S, w) {
        lD(s, c, S, w);
      }
      for (var c, f = s.getStore(); (c = o.next()) != null; ) {
        var d = s.getRawDataItem(c);
        if (!(d && d.visualMap === !1))
          for (var v = n != null ? f.get(l, c) : c, g = r(v), p = t[g], y = i[g], m = 0, _ = y.length; m < _; m++) {
            var b = y[m];
            p[b] && p[b].applyVisual(v, u, h);
          }
      }
    }
  };
}
var Q$ = function(e, t) {
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
}, wc = (
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
        }), n[o] = ot(a, Q$(i, a.type));
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
        h && qc(l) && n.push(l.name);
      }), this._availableNames = i;
      var a = this.get("data") || n, o = Q(), s = Y(a, function(l) {
        return (H(l) || bt(l)) && (l = {
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
), li = It, Sc = C, ss = Dt, Z0 = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !1, r;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new ss()), this.group.add(this._selectorGroup = new ss()), this._isFirstRender = !0;
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
        }, f = r.get("padding"), d = Ri(h, c, f), v = this.layoutInner(r, o, d, a, l, u), g = Ri(ht({
          width: v.width,
          height: v.height
        }, h), c, f);
        this.group.x = g.x - v.x, this.group.y = g.y - v.y, this.group.markRedraw(), this.group.add(this._backgroundEl = $$(v, r));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this.getContentGroup(), h = Q(), c = n.get("selectedMode"), f = [];
      i.eachRawSeries(function(d) {
        !d.get("legendHoverLink") && f.push(d.id);
      }), Sc(n.getData(), function(d, v) {
        var g = d.get("name");
        if (!this.newlineDisabled && (g === "" || g === `
`)) {
          var p = new ss();
          p.newline = !0, u.add(p);
          return;
        }
        var y = i.getSeriesByName(g)[0];
        if (!h.get(g))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, b = m.getVisual("legendIcon"), S = m.getVisual("style"), w = this._createItem(y, g, v, d, n, r, _, S, b, c, a);
            w.on("click", li(Bg, g, null, a, f)).on("mouseover", li(xc, y.name, null, a, f)).on("mouseout", li(Tc, y.name, null, a, f)), i.ssr && w.eachChild(function(x) {
              var M = st(x);
              M.seriesIndex = y.seriesIndex, M.dataIndex = v, M.ssrType = "legend";
            }), h.set(g, !0);
          } else
            i.eachRawSeries(function(x) {
              if (!h.get(g) && x.legendVisualProvider) {
                var M = x.legendVisualProvider;
                if (!M.containName(g))
                  return;
                var D = M.indexOfName(g), A = M.getItemVisual(D, "style"), T = M.getItemVisual(D, "legendIcon"), $ = we(A.fill);
                $ && $[3] === 0 && ($[3] = 0.2, A = N(N({}, A), {
                  fill: cr($, "rgba")
                }));
                var L = this._createItem(x, g, v, d, n, r, {}, A, T, c, a);
                L.on("click", li(Bg, null, g, a, f)).on("mouseover", li(xc, null, g, a, f)).on("mouseout", li(Tc, null, g, a, f)), i.ssr && L.eachChild(function(P) {
                  var R = st(P);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = v, R.ssrType = "legend";
                }), h.set(g, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, n, a, s, l);
    }, t.prototype._createSelector = function(r, n, i, a, o) {
      var s = this.getSelectorGroup();
      Sc(r, function(u) {
        var h = u.type, c = new $t({
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
        var f = n.getModel("selectorLabel"), d = n.getModel(["emphasis", "selectorLabel"]);
        _o(c, {
          normal: f,
          emphasis: d
        }, {
          defaultText: u.title
        }), Hh(c);
      });
    }, t.prototype._createItem = function(r, n, i, a, o, s, l, u, h, c, f) {
      var d = r.visualDrawType, v = o.get("itemWidth"), g = o.get("itemHeight"), p = o.isSelected(n), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      h = _ || h || "roundRect";
      var b = J$(h, a, l, u, d, p, f), S = new ss(), w = a.getModel("textStyle");
      if (Z(r.getLegendIcon) && (!_ || _ === "inherit"))
        S.add(r.getLegendIcon({
          itemWidth: v,
          itemHeight: g,
          icon: h,
          iconRotate: y,
          itemStyle: b.itemStyle,
          lineStyle: b.lineStyle,
          symbolKeepAspect: m
        }));
      else {
        var x = _ === "inherit" && r.getData().getVisual("symbol") ? y === "inherit" ? r.getData().getVisual("symbolRotate") : y : 0;
        S.add(tL({
          itemWidth: v,
          itemHeight: g,
          icon: h,
          iconRotate: x,
          itemStyle: b.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var M = s === "left" ? v + 5 : -5, D = s, A = o.get("formatter"), T = n;
      H(A) && A ? T = A.replace("{name}", n ?? "") : Z(A) && (T = A(n));
      var $ = p ? w.getTextColor() : a.get("inactiveColor");
      S.add(new $t({
        style: qe(w, {
          text: T,
          x: M,
          y: g / 2,
          fill: $,
          align: D,
          verticalAlign: "middle"
        }, {
          inheritColor: $
        })
      }));
      var L = new St({
        shape: S.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), P = a.getModel("tooltip");
      return P.get("show") && Sl({
        el: L,
        componentModel: o,
        itemName: n,
        itemTooltipOption: P.option
      }), S.add(L), S.eachChild(function(R) {
        R.silent = !0;
      }), L.silent = !c, this.getContentGroup().add(S), Hh(S), S.__legendDataIndex = i, S;
    }, t.prototype.layoutInner = function(r, n, i, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      Di(r.get("orient"), l, r.get("itemGap"), i.width, i.height);
      var h = l.getBoundingRect(), c = [-h.x, -h.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        Di(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          r.get("selectorItemGap", !0)
        );
        var f = u.getBoundingRect(), d = [-f.x, -f.y], v = r.get("selectorButtonGap", !0), g = r.getOrient().index, p = g === 0 ? "width" : "height", y = g === 0 ? "height" : "width", m = g === 0 ? "y" : "x";
        s === "end" ? d[g] += h[p] + v : c[g] += f[p] + v, d[1 - g] += h[y] / 2 - f[y] / 2, u.x = d[0], u.y = d[1], l.x = c[0], l.y = c[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[p] = h[p] + v + f[p], _[y] = Math.max(h[y], f[y]), _[m] = Math.min(0, f[m] + d[1 - g]), _;
      } else
        return l.x = c[0], l.y = c[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(ke)
);
function J$(e, t, r, n, i, a, o) {
  function s(p, y) {
    p.lineWidth === "auto" && (p.lineWidth = y.lineWidth > 0 ? 2 : 0), Sc(p, function(m, _) {
      p[_] === "inherit" && (p[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), h = e.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", c = l.getShallow("decal");
  u.decal = !c || c === "inherit" ? n.decal : ac(c, o), u.fill === "inherit" && (u.fill = n[i]), u.stroke === "inherit" && (u.stroke = n[h]), u.opacity === "inherit" && (u.opacity = (i === "fill" ? n : r).opacity), s(u, n);
  var f = t.getModel("lineStyle"), d = f.getLineStyle();
  if (s(d, r), u.fill === "auto" && (u.fill = n.fill), u.stroke === "auto" && (u.stroke = n.fill), d.stroke === "auto" && (d.stroke = n.fill), !a) {
    var v = t.get("inactiveBorderWidth"), g = u[h];
    u.lineWidth = v === "auto" ? n.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), d.stroke = f.get("inactiveColor"), d.lineWidth = f.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: d
  };
}
function tL(e) {
  var t = e.icon || "roundRect", r = gr(t, 0, 0, e.itemWidth, e.itemHeight, e.itemStyle.fill, e.symbolKeepAspect);
  return r.setStyle(e.itemStyle), r.rotation = (e.iconRotate || 0) * Math.PI / 180, r.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), t.indexOf("empty") > -1 && (r.style.stroke = r.style.fill, r.style.fill = "#fff", r.style.lineWidth = 2), r;
}
function Bg(e, t, r, n) {
  Tc(e, t, r, n), r.dispatchAction({
    type: "legendToggleSelect",
    name: e ?? t
  }), xc(e, t, r, n);
}
function K0(e) {
  for (var t = e.getZr().storage.getDisplayList(), r, n = 0, i = t.length; n < i && !(r = t[n].states.emphasis); )
    n++;
  return r && r.hoverLayer;
}
function xc(e, t, r, n) {
  K0(r) || r.dispatchAction({
    type: "highlight",
    seriesName: e,
    name: t,
    excludeSeriesId: n
  });
}
function Tc(e, t, r, n) {
  K0(r) || r.dispatchAction({
    type: "downplay",
    seriesName: e,
    name: t,
    excludeSeriesId: n
  });
}
function eL(e) {
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
function ma(e, t, r) {
  var n = e === "allSelect" || e === "inverseSelect", i = {}, a = [];
  r.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    n ? s[e]() : s[e](t.name), zg(s, i), a.push(s.componentIndex);
  });
  var o = {};
  return r.eachComponent("legend", function(s) {
    C(i, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), zg(s, o);
  }), n ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function zg(e, t) {
  var r = t || {};
  return C(e.getData(), function(n) {
    var i = n.get("name");
    if (!(i === `
` || i === "")) {
      var a = e.isSelected(i);
      En(r, i) ? r[i] = r[i] && a : r[i] = a;
    }
  }), r;
}
function rL(e) {
  e.registerAction("legendToggleSelect", "legendselectchanged", It(ma, "toggleSelected")), e.registerAction("legendAllSelect", "legendselectall", It(ma, "allSelect")), e.registerAction("legendInverseSelect", "legendinverseselect", It(ma, "inverseSelect")), e.registerAction("legendSelect", "legendselected", It(ma, "select")), e.registerAction("legendUnSelect", "legendunselected", It(ma, "unSelect"));
}
function j0(e) {
  e.registerComponentModel(wc), e.registerComponentView(Z0), e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, eL), e.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), rL(e);
}
var nL = (
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
      var a = Pl(r);
      e.prototype.init.call(this, r, n, i), Fg(this, r, a);
    }, t.prototype.mergeOption = function(r, n) {
      e.prototype.mergeOption.call(this, r, n), Fg(this, this.option, r);
    }, t.type = "legend.scroll", t.defaultOption = Ml(wc.defaultOption, {
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
  }(wc)
);
function Fg(e, t, r) {
  var n = e.getOrient(), i = [1, 1];
  i[n.index] = 0, Oi(t, r, {
    type: "box",
    ignoreSize: !!i
  });
}
var Hg = Dt, ch = ["width", "height"], fh = ["x", "y"], iL = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = t.type, r.newlineDisabled = !0, r._currentIndex = 0, r;
    }
    return t.prototype.init = function() {
      e.prototype.init.call(this), this.group.add(this._containerGroup = new Hg()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Hg());
    }, t.prototype.resetInner = function() {
      e.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(r, n, i, a, o, s, l) {
      var u = this;
      e.prototype.renderInner.call(this, r, n, i, a, o, s, l);
      var h = this._controllerGroup, c = n.get("pageIconSize", !0), f = z(c) ? c : [c, c];
      v("pagePrev", 0);
      var d = n.getModel("pageTextStyle");
      h.add(new $t({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: d.getTextColor(),
          font: d.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), v("pageNext", 1);
      function v(g, p) {
        var y = g + "DataIndex", m = hf(n.get("pageIcons", !0)[n.getOrient().name][p], {
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
      var l = this.getSelectorGroup(), u = r.getOrient().index, h = ch[u], c = fh[u], f = ch[1 - u], d = fh[1 - u];
      o && Di(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        r.get("selectorItemGap", !0)
      );
      var v = r.get("selectorButtonGap", !0), g = l.getBoundingRect(), p = [-g.x, -g.y], y = q(i);
      o && (y[h] = i[h] - g[h] - v);
      var m = this._layoutContentAndController(r, a, y, u, h, f, d, c);
      if (o) {
        if (s === "end")
          p[u] += m[h] + v;
        else {
          var _ = g[h] + v;
          p[u] -= _, m[c] -= _;
        }
        m[h] += g[h] + v, p[1 - u] += m[d] + m[f] / 2 - g[f] / 2, m[f] = Math.max(m[f], g[f]), m[d] = Math.min(m[d], g[d] + p[1 - u]), l.x = p[0], l.y = p[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(r, n, i, a, o, s, l, u) {
      var h = this.getContentGroup(), c = this._containerGroup, f = this._controllerGroup;
      Di(r.get("orient"), h, r.get("itemGap"), a ? i.width : null, a ? null : i.height), Di(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        f,
        r.get("pageButtonItemGap", !0)
      );
      var d = h.getBoundingRect(), v = f.getBoundingRect(), g = this._showController = d[o] > i[o], p = [-d.x, -d.y];
      n || (p[a] = h[u]);
      var y = [0, 0], m = [-v.x, -v.y], _ = tt(r.get("pageButtonGap", !0), r.get("itemGap", !0));
      if (g) {
        var b = r.get("pageButtonPosition", !0);
        b === "end" ? m[a] += i[o] - v[o] : y[a] += v[o] + _;
      }
      m[1 - a] += d[s] / 2 - v[s] / 2, h.setPosition(p), c.setPosition(y), f.setPosition(m);
      var S = {
        x: 0,
        y: 0
      };
      if (S[o] = g ? i[o] : d[o], S[s] = Math.max(d[s], v[s]), S[l] = Math.min(0, v[l] + m[1 - a]), c.__rectSize = i[o], g) {
        var w = {
          x: 0,
          y: 0
        };
        w[o] = Math.max(i[o] - v[o] - _, 0), w[s] = S[s], c.setClipPath(new St({
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
        var c = h + "DataIndex", f = n[c] != null, d = i.childOfName(h);
        d && (d.setStyle("fill", f ? r.get("pageIconColor", !0) : r.get("pageIconInactiveColor", !0)), d.cursor = f ? "pointer" : "default");
      });
      var a = i.childOfName("pageText"), o = r.get("pageFormatter"), s = n.pageIndex, l = s != null ? s + 1 : 0, u = n.pageCount;
      a && o && a.setStyle("text", H(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(r) {
      var n = r.get("scrollDataIndex", !0), i = this.getContentGroup(), a = this._containerGroup.__rectSize, o = r.getOrient().index, s = ch[o], l = fh[o], u = this._findTargetItemIndex(n), h = i.children(), c = h[u], f = h.length, d = f ? 1 : 0, v = {
        contentPosition: [i.x, i.y],
        pageCount: d,
        pageIndex: d - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!c)
        return v;
      var g = b(c);
      v.contentPosition[o] = -g.s;
      for (var p = u + 1, y = g, m = g, _ = null; p <= f; ++p)
        _ = b(h[p]), // Half of the last item is out of the window.
        (!_ && m.e > y.s + a || _ && !S(_, y.s)) && (m.i > y.i ? y = m : y = _, y && (v.pageNextDataIndex == null && (v.pageNextDataIndex = y.i), ++v.pageCount)), m = _;
      for (var p = u - 1, y = g, m = g, _ = null; p >= -1; --p)
        _ = b(h[p]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !S(m, _.s)) && y.i < m.i && (m = y, v.pagePrevDataIndex == null && (v.pagePrevDataIndex = y.i), ++v.pageCount, ++v.pageIndex), y = _;
      return v;
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
  }(Z0)
);
function aL(e) {
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
function oL(e) {
  Qe(j0), e.registerComponentModel(nL), e.registerComponentView(iL), aL(e);
}
function sL(e) {
  Qe(j0), Qe(oL);
}
var Q0 = {
  /**
   * @public
   */
  get: function(e, t, r) {
    var n = q((lL[e] || {})[t]);
    return r && z(n) ? n[n.length - 1] : n;
  }
}, lL = {
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
}, Vg = Vt.mapVisual, uL = Vt.eachVisual, hL = z, Gg = C, cL = Xy, fL = dr, al = (
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
      !n && K$(i, r, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption();
    }, t.prototype.resetVisual = function(r) {
      var n = this.stateList;
      r = J(r, this), this.controllerVisuals = Ng(this.option.controller, n, r), this.targetVisuals = Ng(this.option.target, n, r);
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
      var r = this.option, n = cL([r.min, r.max]);
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
        hL(n.color) && !c.inRange && (c.inRange = {
          color: n.color.slice().reverse()
        }), c.inRange = c.inRange || {
          color: r.get("gradientColor")
        };
      }
      function u(c, f, d) {
        var v = c[f], g = c[d];
        v && !g && (g = c[d] = {}, Gg(v, function(p, y) {
          if (Vt.isValidType(y)) {
            var m = Q0.get(y, "inactive", s);
            m != null && (g[y] = m, y === "color" && !g.hasOwnProperty("opacity") && !g.hasOwnProperty("colorAlpha") && (g.opacity = [0, 0]));
          }
        }));
      }
      function h(c) {
        var f = (c.inRange || {}).symbol || (c.outOfRange || {}).symbol, d = (c.inRange || {}).symbolSize || (c.outOfRange || {}).symbolSize, v = this.get("inactiveColor"), g = this.getItemSymbol(), p = g || "roundRect";
        Gg(this.stateList, function(y) {
          var m = this.itemSize, _ = c[y];
          _ || (_ = c[y] = {
            color: s ? v : [v]
          }), _.symbol == null && (_.symbol = f && q(f) || (s ? p : [p])), _.symbolSize == null && (_.symbolSize = d && q(d) || (s ? m[0] : [m[0], m[0]])), _.symbol = Vg(_.symbol, function(w) {
            return w === "none" ? p : w;
          });
          var b = _.symbolSize;
          if (b != null) {
            var S = -1 / 0;
            uL(b, function(w) {
              w > S && (S = w);
            }), _.symbolSize = Vg(b, function(w) {
              return fL(w, [0, S], [0, m[0]], !0);
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
), Wg = [20, 140], dL = (
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
      (r[0] == null || isNaN(r[0])) && (r[0] = Wg[0]), (r[1] == null || isNaN(r[1])) && (r[1] = Wg[1]);
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
      var r = this.getExtent(), n = Xy((this.get("range") || []).slice());
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
      var n = Ug(this, "outOfRange", this.getExtent()), i = Ug(this, "inRange", this.option.range.slice()), a = [];
      function o(d, v) {
        a.push({
          value: d,
          color: r(d, v)
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
    }, t.type = "visualMap.continuous", t.defaultOption = Ml(al.defaultOption, {
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
  }(al)
);
function Ug(e, t, r) {
  if (r[0] === r[1])
    return r.slice();
  for (var n = 200, i = (r[1] - r[0]) / n, a = r[0], o = [], s = 0; s <= n && a < r[1]; s++)
    o.push(a), a += i;
  return o.push(r[1]), o;
}
var J0 = (
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
      var n = this.visualMapModel, i = bo(n.get("padding") || 0), a = r.getBoundingRect();
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
      function u(d) {
        return s[d];
      }
      function h(d, v) {
        s[d] = v;
      }
      var c = o.controllerVisuals[a || o.getValueState(r)], f = Vt.prepareVisualTypes(c);
      return C(f, function(d) {
        var v = c[d];
        i.convertOpacityToAlpha && d === "opacity" && (d = "colorAlpha", v = c.__alphaForOpacity), Vt.dependsOn(d, n) && v && v.applyVisual(r, u, h);
      }), s[n];
    }, t.prototype.positionGroup = function(r) {
      var n = this.visualMapModel, i = this.api;
      bC(r, n.getBoxLayoutParams(), {
        width: i.getWidth(),
        height: i.getHeight()
      });
    }, t.prototype.doRender = function(r, n, i, a) {
    }, t.type = "visualMap", t;
  }(ke)
), Yg = [["left", "right", "width"], ["top", "bottom", "height"]];
function tb(e, t, r) {
  var n = e.option, i = n.align;
  if (i != null && i !== "auto")
    return i;
  for (var a = {
    width: t.getWidth(),
    height: t.getHeight()
  }, o = n.orient === "horizontal" ? 1 : 0, s = Yg[o], l = [0, null, 10], u = {}, h = 0; h < 3; h++)
    u[Yg[1 - o][h]] = l[h], u[s[h]] = h === 2 ? r[0] : n[s[h]];
  var c = [["x", "width", 3], ["y", "height", 0]][o], f = Ri(u, a, n.padding);
  return s[(f.margin[c[2]] || 0) + f[c[0]] + f[c[1]] * 0.5 < a[c[1]] * 0.5 ? 0 : 1];
}
function Ms(e, t) {
  return C(e || [], function(r) {
    r.dataIndex != null && (r.dataIndexInside = r.dataIndex, r.dataIndex = null), r.highlightKey = "visualMap" + (t ? t.componentIndex : "");
  }), e;
}
var We = dr, vL = C, Xg = Math.min, dh = Math.max, pL = 12, gL = 6, yL = (
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
        var o = this.visualMapModel, s = o.get("textGap"), l = o.itemSize, u = this._shapes.mainGroup, h = this._applyTransform([l[0] / 2, i === 0 ? -s : l[1] + s], u), c = this._applyTransform(i === 0 ? "bottom" : "top", u), f = this._orient, d = this.visualMapModel.textStyleModel;
        this.group.add(new $t({
          style: qe(d, {
            x: h[0],
            y: h[1],
            verticalAlign: f === "horizontal" ? "middle" : c,
            align: f === "horizontal" ? c : "center",
            text: a
          })
        }));
      }
    }, t.prototype._renderBar = function(r) {
      var n = this.visualMapModel, i = this._shapes, a = n.itemSize, o = this._orient, s = this._useHandle, l = tb(n, this.api, a), u = i.mainGroup = this._createBarGroup(l), h = new Dt();
      u.add(h), h.add(i.outOfRange = qg()), h.add(i.inRange = qg(null, s ? Kg(this._orient) : null, J(this._dragHandle, this, "all", !1), J(this._dragHandle, this, "all", !0))), h.setClipPath(new St({
        shape: {
          x: 0,
          y: 0,
          width: a[0],
          height: a[1],
          r: 3
        }
      }));
      var c = n.textStyleModel.getTextRect("国"), f = dh(c.width, c.height);
      s && (i.handleThumbs = [], i.handleLabels = [], i.handleLabelPoints = [], this._createHandle(n, u, 0, a, f, o), this._createHandle(n, u, 1, a, f, o)), this._createIndicator(n, u, a, f, o), r.add(u);
    }, t.prototype._createHandle = function(r, n, i, a, o, s) {
      var l = J(this._dragHandle, this, i, !1), u = J(this._dragHandle, this, i, !0), h = Ke(r.get("handleSize"), a[0]), c = gr(r.get("handleIcon"), -h / 2, -h / 2, h, h, null, !0), f = Kg(this._orient);
      c.attr({
        cursor: f,
        draggable: !0,
        drift: l,
        ondragend: u,
        onmousemove: function(y) {
          Xa(y.event);
        }
      }), c.x = a[0] / 2, c.useStyle(r.getModel("handleStyle").getItemStyle()), c.setStyle({
        strokeNoScale: !0,
        strokeFirst: !0
      }), c.style.lineWidth *= 2, c.ensureState("emphasis").style = r.getModel(["emphasis", "handleStyle"]).getItemStyle(), ef(c, !0), n.add(c);
      var d = this.visualMapModel.textStyleModel, v = new $t({
        cursor: f,
        draggable: !0,
        drift: l,
        onmousemove: function(y) {
          Xa(y.event);
        },
        ondragend: u,
        style: qe(d, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      v.ensureState("blur").style = {
        opacity: 0.1
      }, v.stateTransition = {
        duration: 200
      }, this.group.add(v);
      var g = [h, 0], p = this._shapes;
      p.handleThumbs[i] = c, p.handleLabelPoints[i] = g, p.handleLabels[i] = v;
    }, t.prototype._createIndicator = function(r, n, i, a, o) {
      var s = Ke(r.get("indicatorSize"), i[0]), l = gr(r.get("indicatorIcon"), -s / 2, -s / 2, s, s, null, !0);
      l.attr({
        cursor: "move",
        invisible: !0,
        silent: !0,
        x: i[0] / 2
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
      n.add(l);
      var c = this.visualMapModel.textStyleModel, f = new $t({
        silent: !0,
        invisible: !0,
        style: qe(c, {
          x: 0,
          y: 0,
          text: ""
        })
      });
      this.group.add(f);
      var d = [(o === "horizontal" ? a / 2 : gL) + i[0] / 2, 0], v = this._shapes;
      v.indicator = l, v.indicatorLabel = f, v.indicatorLabelPoint = d, this._firstShowIndicator = !0;
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
        }), n ? !this._hovering && this._clearHoverLinkToSeries() : Zg(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[r], !1);
      }
    }, t.prototype._resetInterval = function() {
      var r = this.visualMapModel, n = this._dataInterval = r.getSelected(), i = r.getExtent(), a = [0, r.itemSize[1]];
      this._handleEnds = [We(n[0], i, a, !0), We(n[1], i, a, !0)];
    }, t.prototype._updateInterval = function(r, n) {
      n = n || 0;
      var i = this.visualMapModel, a = this._handleEnds, o = [0, i.itemSize[1]];
      jI(
        n,
        a,
        o,
        r,
        // cross is forbidden
        0
      );
      var s = i.getExtent();
      this._dataInterval = [We(a[0], o, s, !0), We(a[1], o, s, !0)];
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
        barColor: new sf(0, 0, 0, 1, s),
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
      return new Dt(n === "horizontal" && !i ? {
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
        vL([0, 1], function(c) {
          var f = o[c];
          f.setStyle("fill", n.handlesColor[c]), f.y = r[c];
          var d = We(r[c], [0, l[1]], u, !0), v = this.getControllerVisual(d, "symbolSize");
          f.scaleX = f.scaleY = v / l[0], f.x = l[0] - v / 2;
          var g = xi(i.handleLabelPoints[c], bs(f, this.group));
          if (this._orient === "horizontal") {
            var p = h === "left" || h === "top" ? (l[0] - v) / 2 : (l[0] - v) / -2;
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
        }, d = this.getControllerVisual(r, "color", f), v = this.getControllerVisual(r, "symbolSize"), g = We(r, s, u, !0), p = l[0] - v / 2, y = {
          x: c.x,
          y: c.y
        };
        c.y = g, c.x = p;
        var m = xi(h.indicatorLabelPoint, bs(c, this.group)), _ = h.indicatorLabel;
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
            fill: d
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
          a[1] = Xg(dh(0, a[1]), i[1]), r._doHoverLinkToSeries(a[1], 0 <= a[0] && a[0] <= i[0]);
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
        r = Xg(dh(o[0], r), o[1]);
        var l = mL(i, s, o), u = [r - l, r + l], h = We(r, o, s, !0), c = [We(u[0], o, s, !0), We(u[1], o, s, !0)];
        u[0] < o[0] && (c[0] = -1 / 0), u[1] > o[1] && (c[1] = 1 / 0), n && (c[0] === -1 / 0 ? this._showIndicator(h, c[1], "< ", l) : c[1] === 1 / 0 ? this._showIndicator(h, c[0], "> ", l) : this._showIndicator(h, h, "≈ ", l));
        var f = this._hoverLinkDataIndices, d = [];
        (n || Zg(i)) && (d = this._hoverLinkDataIndices = i.findTargetDataIndices(c));
        var v = ES(f, d);
        this._dispatchHighDown("downplay", Ms(v[0], i)), this._dispatchHighDown("highlight", Ms(v[1], i));
      }
    }, t.prototype._hoverLinkFromSeriesMouseOver = function(r) {
      var n;
      if (mi(r.target, function(l) {
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
      this._dispatchHighDown("downplay", Ms(r, this.visualMapModel)), r.length = 0;
    }, t.prototype._clearHoverLinkFromSeries = function() {
      this._hideIndicator();
      var r = this.api.getZr();
      r.off("mouseover", this._hoverLinkFromSeriesMouseOver), r.off("mouseout", this._hideIndicator);
    }, t.prototype._applyTransform = function(r, n, i, a) {
      var o = bs(n, a ? null : this.group);
      return z(r) ? xi(r, o, i) : $m(r, o, i);
    }, t.prototype._dispatchHighDown = function(r, n) {
      n && n.length && this.api.dispatchAction({
        type: r,
        batch: n
      });
    }, t.prototype.dispose = function() {
      this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries();
    }, t.type = "visualMap.continuous", t;
  }(J0)
);
function qg(e, t, r, n) {
  return new bl({
    shape: {
      points: e
    },
    draggable: !!r,
    cursor: t,
    drift: r,
    onmousemove: function(i) {
      Xa(i.event);
    },
    ondragend: n
  });
}
function mL(e, t, r) {
  var n = pL / 2, i = e.get("hoverLinkDataSize");
  return i && (n = We(i, t, r, !0) / 2), n;
}
function Zg(e) {
  var t = e.get("hoverLinkOnHandle");
  return !!(t ?? e.get("realtime"));
}
function Kg(e) {
  return e === "vertical" ? "ns-resize" : "ew-resize";
}
var _L = {
  type: "selectDataRange",
  event: "dataRangeSelected",
  // FIXME use updateView appears wrong
  update: "update"
}, bL = function(e, t) {
  t.eachComponent({
    mainType: "visualMap",
    query: e
  }, function(r) {
    r.setSelected(e.selected);
  });
}, wL = [
  {
    createOnAllSeries: !0,
    reset: function(e, t) {
      var r = [];
      return t.eachComponent("visualMap", function(n) {
        var i = e.pipelineContext;
        !n.isTargetSeries(e) || i && i.large || r.push(j$(n.stateList, n.targetVisuals, J(n.getValueState, n), n.getDataDimensionIndex(e.getData())));
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
          var a = i.getVisualMeta(J(SL, null, e, i)) || {
            stops: [],
            outerColors: []
          }, o = i.getDataDimensionIndex(r);
          o >= 0 && (a.dimension = o, n.push(a));
        }
      }), e.getData().setVisual("visualMeta", n);
    }
  }
];
function SL(e, t, r, n) {
  for (var i = t.targetVisuals[n], a = Vt.prepareVisualTypes(i), o = {
    color: I_(e.getData(), "color")
    // default color.
  }, s = 0, l = a.length; s < l; s++) {
    var u = a[s], h = i[u === "opacity" ? "__alphaForOpacity" : u];
    h && h.applyVisual(r, c, f);
  }
  return o.color;
  function c(d) {
    return o[d];
  }
  function f(d, v) {
    o[d] = v;
  }
}
var jg = C;
function xL(e) {
  var t = e && e.visualMap;
  z(t) || (t = t ? [t] : []), jg(t, function(r) {
    if (r) {
      ui(r, "splitList") && !ui(r, "pieces") && (r.pieces = r.splitList, delete r.splitList);
      var n = r.pieces;
      n && z(n) && jg(n, function(i) {
        V(i) && (ui(i, "start") && !ui(i, "min") && (i.min = i.start), ui(i, "end") && !ui(i, "max") && (i.max = i.end));
      });
    }
  });
}
function ui(e, t) {
  return e && e.hasOwnProperty && e.hasOwnProperty(t);
}
var Qg = !1;
function eb(e) {
  Qg || (Qg = !0, e.registerSubTypeDefaulter("visualMap", function(t) {
    return !t.categories && (!(t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) || t.calculable) ? "continuous" : "piecewise";
  }), e.registerAction(_L, bL), C(wL, function(t) {
    e.registerVisual(e.PRIORITY.VISUAL.COMPONENT, t);
  }), e.registerPreprocessor(xL));
}
function TL(e) {
  e.registerComponentModel(dL), e.registerComponentView(yL), eb(e);
}
var CL = (
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
      this._pieceList = [], ML[this._mode].call(this, this._pieceList), this._resetSelected(r, n);
      var a = this.option.categories;
      this.resetVisual(function(o, s) {
        i === "categories" ? (o.mappingMethod = "category", o.categories = q(a)) : (o.dataExtent = this.getExtent(), o.mappingMethod = "piecewise", o.pieceList = Y(this._pieceList, function(l) {
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
          (r[h] || (r[h] = {}))[l] = Q0.get(l, h === "inRange" ? "active" : "inactive", a);
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
        var d = r(f, c);
        h[0] === -1 / 0 ? i[0] = d : h[1] === 1 / 0 ? i[1] = d : n.push({
          value: h[0],
          color: d
        }, {
          value: h[1],
          color: d
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
    }, t.type = "visualMap.piecewise", t.defaultOption = Ml(al.defaultOption, {
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
  }(al)
), ML = {
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
    }), Od(e), C(e, function(u, h) {
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
    }, this), Jg(t, e);
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
          for (var f = [["gte", "gt", "min"], ["lte", "lt", "max"]][c], d = 0; d < 3 && o[c] == null; d++)
            o[c] = r[f[d]], s[c] = l[d], h[c] = d === 2;
          o[c] == null && (o[c] = u[c]);
        }
        h[0] && o[1] === 1 / 0 && (s[0] = 0), h[1] && o[0] === -1 / 0 && (s[1] = 0), o[0] === o[1] && s[0] && s[1] && (i.value = o[0]);
      }
      i.visual = Vt.retrieveVisuals(r), e.push(i);
    }, this), Jg(t, e), Od(e), C(e, function(r) {
      var n = r.close, i = [["<", "≤"][n[1]], [">", "≥"][n[0]]];
      r.text = r.text || this.formatValueText(r.value != null ? r.value : r.interval, !1, i);
    }, this);
  }
};
function Jg(e, t) {
  var r = e.inverse;
  (e.orient === "vertical" ? !r : r) && t.reverse();
}
var DL = (
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
      var n = this.visualMapModel, i = n.get("textGap"), a = n.textStyleModel, o = a.getFont(), s = a.getTextColor(), l = this._getItemAlign(), u = n.itemSize, h = this._getViewData(), c = h.endsText, f = Li(n.get("showLabel", !0), !c), d = !n.get("selectedMode");
      c && this._renderEndsText(r, c[0], u, f, l), C(h.viewPieceList, function(v) {
        var g = v.piece, p = new Dt();
        p.onclick = J(this._onItemClick, this, g), this._enableHoverLink(p, v.indexInModelPieceList);
        var y = n.getRepresentValue(g);
        if (this._createItemSymbol(p, y, [0, 0, u[0], u[1]], d), f) {
          var m = this.visualMapModel.getValueState(y);
          p.add(new $t({
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
            silent: d
          }));
        }
        r.add(p);
      }, this), c && this._renderEndsText(r, c[1], u, f, l), Di(n.get("orient"), r, n.get("itemGap")), this.renderBackground(r), this.positionGroup(r);
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
          batch: Ms(s.findTargetDataIndices(n), s)
        });
      };
    }, t.prototype._getItemAlign = function() {
      var r = this.visualMapModel, n = r.option;
      if (n.orient === "vertical")
        return tb(r, this.api, r.itemSize);
      var i = n.align;
      return (!i || i === "auto") && (i = "left"), i;
    }, t.prototype._renderEndsText = function(r, n, i, a, o) {
      if (n) {
        var s = new Dt(), l = this.visualMapModel.textStyleModel;
        s.add(new $t({
          style: qe(l, {
            x: a ? o === "right" ? i[0] : 0 : i[0] / 2,
            y: i[1] / 2,
            verticalAlign: "middle",
            align: a ? o : "center",
            text: n
          })
        })), r.add(s);
      }
    }, t.prototype._getViewData = function() {
      var r = this.visualMapModel, n = Y(r.getPieceList(), function(s, l) {
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
  }(J0)
);
function AL(e) {
  e.registerComponentModel(CL), e.registerComponentView(DL), eb(e);
}
function IL(e) {
  Qe(TL), Qe(AL);
}
function ty(e, t, r) {
  var n = Wr.createCanvas(), i = t.getWidth(), a = t.getHeight(), o = n.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", e)), n.width = i * r, n.height = a * r, n;
}
var vh = function(e) {
  B(t, e);
  function t(r, n, i) {
    var a = e.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    i = i || Fs, typeof r == "string" ? o = ty(r, n, i) : V(r) && (o = r, r = o.id), a.id = r, a.dom = o;
    var s = o.style;
    return s && (Ay(o), o.onselectstart = function() {
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
    this.domBack = ty("back-" + this.id, this.painter, r), this.ctxBack = this.domBack.getContext("2d"), r !== 1 && this.ctxBack.scale(r, r);
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
              var A = m.width * m.height, T = M.width * M.height, $ = u.width * u.height, L = $ - A - T;
              L < S && (S = L, w = x);
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
        var d = f.shouldBePainted(i, a, !0, !0), v = f.__isRendered && (f.__dirty & oe || !d) ? f.getPrevPaintRect() : null;
        v && h(v);
        var g = d && (f.__dirty & oe || !f.__isRendered) ? f.getPaintRect() : null;
        g && h(g);
      }
    }
    for (var c = this.__prevStartIndex; c < this.__prevEndIndex; ++c) {
      var f = n[c], d = f && f.shouldBePainted(i, a, !0, !0);
      if (f && (!d || !f.__zr) && f.__isRendered) {
        var v = f.getPrevPaintRect();
        v && h(v);
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
    var d = this.domBack;
    function v(g, p, y, m) {
      if (o.clearRect(g, p, y, m), n && n !== "transparent") {
        var _ = void 0;
        if (hl(n)) {
          var b = n.global || n.__width === y && n.__height === m;
          _ = b && n.__canvasGradient || nc(o, n, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), n.__canvasGradient = _, n.__width = y, n.__height = m;
        } else qw(n) && (n.scaleX = n.scaleX || c, n.scaleY = n.scaleY || c, _ = ic(o, n, {
          dirty: function() {
            f.setUnpainted(), f.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || n, o.fillRect(g, p, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = h, o.drawImage(d, g, p, y, m), o.restore());
    }
    !i || u ? v(0, 0, s, l) : i.length && C(i, function(g) {
      v(g.x * c, g.y * c, g.width * c, g.height * c);
    });
  }, t;
}(er), ey = 1e5, wn = 314159, ls = 0.01, $L = 1e-3;
function LL(e) {
  return e ? e.__builtin__ ? !0 : !(typeof e.resize != "function" || typeof e.refresh != "function") : !1;
}
function PL(e, t) {
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
var RL = function() {
  function e(t, r, n, i) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = n = N({}, n || {}), this.dpr = n.devicePixelRatio || Fs, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Ay(t), t.innerHTML = ""), this.storage = r;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var h = t, c = h.width, f = h.height;
      n.width != null && (c = n.width), n.height != null && (f = n.height), this.dpr = n.devicePixelRatio || 1, h.width = c * this.dpr, h.height = f * this.dpr, this._width = c, this._height = f;
      var d = new vh(h, this, this.dpr);
      d.__builtin__ = !0, d.initContext(), l[wn] = d, d.zlevel = wn, s.push(wn), this._domRoot = t;
    } else {
      this._width = qo(t, 0, n), this._height = qo(t, 1, n);
      var u = this._domRoot = PL(this._width, this._height);
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
        s.__inHover && (n || (n = this._hoverlayer = this.getLayer(ey)), a || (a = n.ctx, a.save()), An(a, s, i, o === r - 1));
      }
      a && a.restore();
    }
  }, e.prototype.getHoverLayer = function() {
    return this.getLayer(ey);
  }, e.prototype.paintOne = function(t, r) {
    O_(t, r);
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
        Os(function() {
          l._paintList(t, r, n, i);
        });
      }
    }
  }, e.prototype._compositeManually = function() {
    var t = this.getLayer(wn).ctx, r = this._domRoot.width, n = this._domRoot.height;
    t.clearRect(0, 0, r, n), this.eachBuiltinLayer(function(i) {
      i.virtual && t.drawImage(i.dom, 0, 0, r, n);
    });
  }, e.prototype._doPaintList = function(t, r, n) {
    for (var i = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || n) && a.push(u);
    }
    for (var h = !0, c = !1, f = function(g) {
      var p = a[g], y = p.ctx, m = o && p.createRepaintRects(t, r, d._width, d._height), _ = n ? p.__startIndex : p.__drawIndex, b = !n && p.incremental && Date.now, S = b && Date.now(), w = p.zlevel === d._zlevelList[0] ? d._backgroundColor : null;
      if (p.__startIndex === p.__endIndex)
        p.clear(!1, w, m);
      else if (_ === p.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || n) && p.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = p.__startIndex);
      var M, D = function(L) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: i._width,
          viewHeight: i._height
        };
        for (M = _; M < p.__endIndex; M++) {
          var R = t[M];
          if (R.__inHover && (c = !0), i._doPaintEl(R, p, o, L, P, M === p.__endIndex - 1), b) {
            var E = Date.now() - S;
            if (E > 15)
              break;
          }
        }
        P.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          M = p.__endIndex;
        else
          for (var A = d.dpr, T = 0; T < m.length; ++T) {
            var $ = m[T];
            y.save(), y.beginPath(), y.rect($.x * A, $.y * A, $.width * A, $.height * A), y.clip(), D($), y.restore();
          }
      else
        y.save(), D(), y.restore();
      p.__drawIndex = M, p.__drawIndex < p.__endIndex && (h = !1);
    }, d = this, v = 0; v < a.length; v++)
      f(v);
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
      (!i || l && l.intersect(i)) && (An(s, t, a, o), t.setPrevPaintRect(l));
    } else
      An(s, t, a, o);
  }, e.prototype.getLayer = function(t, r) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = wn);
    var n = this._layers[t];
    return n || (n = new vh("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] ? ot(n, this._layerConfig[t], !0) : this._layerConfig[t - ls] && ot(n, this._layerConfig[t - ls], !0), r && (n.virtual = r), this.insertLayer(t, n), n.initContext()), n;
  }, e.prototype.insertLayer = function(t, r) {
    var n = this._layers, i = this._zlevelList, a = i.length, o = this._domRoot, s = null, l = -1;
    if (!n[t] && LL(r)) {
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
      s !== u && (s = u, o = 0), i.incremental ? (h = this.getLayer(u + $L, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(u + (o > 0 ? ls : 0), this._needsManuallyCompositing), h.__builtin__ || Nc("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, r(l), a = h), i.__dirty & oe && !i.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
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
        if (a === t || a === t + ls) {
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
      if (t != null && (i.width = t), r != null && (i.height = r), t = qo(a, 0, i), r = qo(a, 1, i), n.style.display = "", this._width !== t || r !== this._height) {
        n.style.width = t + "px", n.style.height = r + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, r);
        this.refresh(!0);
      }
      this._width = t, this._height = r;
    } else {
      if (t == null || r == null)
        return;
      this._width = t, this._height = r, this.getLayer(wn).resize(t, r);
    }
    return this;
  }, e.prototype.clearLayer = function(t) {
    var r = this._layers[t];
    r && r.clear();
  }, e.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, e.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[wn].dom;
    var r = new vh("image", this, t.pixelRatio || this.dpr);
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
        An(n, h, o, l === u - 1);
      }
    return r.dom;
  }, e.prototype.getWidth = function() {
    return this._width;
  }, e.prototype.getHeight = function() {
    return this._height;
  }, e;
}();
function OL(e) {
  e.registerPainter("canvas", RL);
}
const EL = [
  vI,
  i$,
  Q2,
  I$,
  sL,
  Z$,
  IL,
  OL
];
var kL = Object.defineProperty, NL = Object.getOwnPropertyDescriptor, zf = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? NL(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && kL(t, r, i), i;
};
Qe(EL);
let uo = class extends Ht {
  constructor() {
    super(...arguments), this.height = "280px";
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".canvas");
    this.chart = rA(e, void 0, { renderer: "canvas" }), this.observer = new ResizeObserver(() => this.chart?.resize()), this.observer.observe(e), this.applyOption();
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
uo.styles = ue`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
zf([
  rt({ attribute: !1 })
], uo.prototype, "option", 2);
zf([
  rt({ type: String })
], uo.prototype, "height", 2);
uo = zf([
  xe("ia-chart")
], uo);
var BL = Object.defineProperty, zL = Object.getOwnPropertyDescriptor, Hn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? zL(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && BL(t, r, i), i;
};
const Ds = ["pv_energy_total", "grid_import_total", "battery_discharge_total"], Cc = ["load_energy_total", "grid_export_total", "battery_charge_total"], FL = [...Ds, ...Cc];
let yr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
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
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await Nb(this.hass, this.entryId, t, r);
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
      ${FL.filter((n) => n in e.totals).map(
      (n) => I`<div class="cell">
          <span class="label">${$i(t, n)}</span>
          <span class="value">${Pt(e.totals[n], r)}</span>
          <span class="hint">
            ${Ds.includes(n) ? t.balance.intoSystem : t.balance.outOfIt}
          </span>
        </div>`
    )}
    </div>`;
  }
  renderBalance(e) {
    const t = this.i18n.m, r = this.i18n.locale;
    return e.unaccounted === null ? I`<p class="empty">
        ${t.balance.needsAllSix({
      missing: e.missing.map((n) => $i(t, n)).join(", ")
    })}
      </p>` : I`
      <p class="balance">
        ${t.balance.inOut({
      in: Pt(e.sources_total, r),
      out: Pt(e.sinks_total, r)
    })}
        <strong>${Pt(Math.abs(e.unaccounted), r)}</strong>
        ${(e.unaccounted >= 0 ? t.balance.unaccountedFor : t.balance.moreOutThanIn)({
      share: U(e.unaccounted_share, r)
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
            <span class="value">${U(e.self_sufficiency, r)}</span>
            <span class="hint">
              ${i("load_energy_total") && i("grid_import_total") ? `(${Pt(n.load_energy_total, r)} − ${Pt(
      n.grid_import_total,
      r
    )}) ÷ ${Pt(n.load_energy_total, r)}` : ""}
            </span>
          </div>` : O}
      ${e.self_consumption !== null ? I`<div class="cell">
            <span class="label">${t.balance.selfConsumption}</span>
            <span class="value">${U(e.self_consumption, r)}</span>
            <span class="hint">
              ${i("pv_energy_total") && i("grid_export_total") ? `(${Pt(n.pv_energy_total, r)} − ${Pt(
      n.grid_export_total,
      r
    )}) ÷ ${Pt(n.pv_energy_total, r)}` : ""}
            </span>
          </div>` : O}
    </div>`;
  }
  renderSavings(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = e.savings, i = uw(n);
    if (!n || !i) return O;
    if (i.kind === "withheld") {
      let l;
      if (i.reason === "no_counters") {
        const u = hw(e.mapped);
        l = t.balance.savingsReasons.no_counters({
          roles: Gr(t, u, !0),
          n: u.length
        });
      } else
        l = t.balance.savingsReasons[i.reason];
      return I`<section>
        <h2>${t.balance.savingsTitle}</h2>
        <p class="empty">${l}</p>
      </section>`;
    }
    const a = dw(n), o = (l) => l === null ? et : vw(l, n.currency, r), s = cw(n.days, this.range === "year");
    return I`<section>
      <h2>${t.balance.savingsTitle}</h2>
      <div class="kpi">
        <div class="cell">
          <span class="label">${t.balance.savingsSeries}</span>
          <span class="value">${o(n.total)}</span>
          <span class="hint">
            ${t.balance.savingsPerDay({
      amount: o(n.per_day)
    })}
          </span>
        </div>
      </div>
      <ia-chart .option=${Iw(s, n.currency, t)}></ia-chart>
      ${a !== null ? I`<p class="warn">
            ${t.balance.savingsCoverage({ share: Pe(a, r) })}
          </p>` : O}
      <p class="note">${t.balance.savingsNote({ twoZone: n.two_zone })}</p>
    </section>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return I`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.balance.daysIn({ timezone: t.timezone })}</span>
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${!t.covers_whole_window && t.covered_end ? I`<span class="warn">
              ${e.balance.countedUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}
            </span>` : O}
        ${t.covered_end ? O : I`<span class="warn">${e.balance.noEnergyStatistics}</span>`}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      ${this.renderTotals(t)}

      <section>
        <h2>${e.balance.inAgainstOut}</h2>
        <ia-chart
          .option=${Dw(t.totals, Ds, Cc, e)}
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
              .option=${Aw(t.days, Ds, Cc, e)}
            ></ia-chart>` : I`<p class="empty">${e.balance.noDays}</p>`}
        <p class="note">${e.balance.dayByDayNote}</p>
      </section>

      ${this.renderSavings(t)}
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
Hn([
  rt({ attribute: !1 })
], yr.prototype, "hass", 2);
Hn([
  rt({ type: String })
], yr.prototype, "entryId", 2);
Hn([
  rt({ type: String })
], yr.prototype, "range", 2);
Hn([
  mt()
], yr.prototype, "payload", 2);
Hn([
  mt()
], yr.prototype, "error", 2);
Hn([
  mt()
], yr.prototype, "loading", 2);
yr = Hn([
  xe("ia-balance-tab")
], yr);
const qi = ue`
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
var HL = Object.defineProperty, VL = Object.getOwnPropertyDescriptor, Vl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? VL(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && HL(t, r, i), i;
};
let Ni = class extends Ht {
  constructor() {
    super(...arguments), this.hasCapacity = !1, this.locale = "en", this.i18n = new Be(this);
  }
  render() {
    const t = this.i18n.m.sections.charge, r = this.flow;
    return I`
      <section>
        <h2>${t.title}</h2>

        ${r.sign_looks_inverted ? I`<p class="warn">${t.signInverted}</p>` : O}

        <div class="cards">
          <div class="card">
            <span class="name">${t.meanChargePower}</span>
            <span class="value">${ft(r.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span
              ><span>${U(r.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.meanDischargePower}</span>
            <span class="value">${ft(r.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span>
              <span>${U(r.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.resting}</span>
            <span class="value">${U(r.share_idle, this.locale)}</span>
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
                  ${U(r.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>${t.outOfWhatWentIn}</span></span>
              </div>` : O}
          <div class="card">
            <span class="name">${t.fullCyclesPerDay}</span>
            <span class="value">
              ${r.cycles_per_day === null ? et : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
      r.cycles_per_day
    )}
            </span>
            ${r.cycles_per_day === null ? I`<span class="row"><span>${t.needsCapacity}</span></span>` : O}
          </div>
        </div>

        ${r.cycles_per_day === null && !this.hasCapacity ? I`<p class="note">${t.setCapacity}</p>` : O}

        ${r.energy_metered ? O : I`<p class="note">${t.integrated}</p>`}
        ${r.energy_metered && r.round_trip_efficiency === null ? I`<p class="note">
              ${t.noEfficiency}
              ${r.soc_drift_pct !== null && Math.abs(r.soc_drift_pct) > r.efficiency_max_drift_pct ? (r.soc_drift_pct < 0 ? t.driftBelow : t.driftAbove)({
      n: Math.abs(Math.round(r.soc_drift_pct))
    }) : t.tooLittle}
            </p>` : O}
      </section>
    `;
  }
};
Ni.styles = [qi, ue`:host { display: block; }`];
Vl([
  rt({ attribute: !1 })
], Ni.prototype, "flow", 2);
Vl([
  rt({ type: Boolean })
], Ni.prototype, "hasCapacity", 2);
Vl([
  rt({ type: String })
], Ni.prototype, "locale", 2);
Ni = Vl([
  xe("ia-charge-section")
], Ni);
var GL = Object.defineProperty, WL = Object.getOwnPropertyDescriptor, Vn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? WL(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && GL(t, r, i), i;
};
let mr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
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
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await Eb(this.hass, this.entryId, t, r);
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
        U(Sn(e.kpi.mean_soc), r),
        t.battery.overWholePeriod
      ],
      [
        t.battery.lowestCharge,
        n ? U(Sn(e.kpi.min_soc), r) : et,
        n ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.below({ level: U(Sn(e.low_pct), r) }),
        n ? Kt(e.kpi.seconds_below_low, r) : et,
        n ? t.battery.exactDataOnly : t.battery.needsExactData
      ],
      [
        t.battery.dips,
        n ? String(e.kpi.dip_count) : et,
        n ? t.battery.lastingOverMinute : t.battery.needsExactData
      ],
      [
        t.battery.meanLowPoint,
        n ? U(Sn(e.kpi.mean_low_point), r) : et,
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
            <td>${U(Sn(n.lowest), r)}</td>
            <td>${U(Sn(n.recovered_to), r)}</td>
          </tr>`
    )}
      </tbody>
    </table>` : I`<p class="empty">
        ${t.battery.noEpisodes({ level: U(Sn(e.low_pct), r) })}
      </p>` : I`<p class="empty">${t.battery.dipsNotMeasurable}</p>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Wa(t.coverage, r);
    return I`
      <div class="status">
        <span class="badge">${ll(t.precision, t.boundary, r)}</span>
        ${n ? I`<span class="warn">${n}</span>` : O}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${t.raw_from && t.dips_restricted && t.dips_measurable ? I`<span class="warn">
              ${e.battery.dipsCountedFrom({
      date: new Date(t.raw_from).toLocaleDateString(r)
    })}
            </span>` : O}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      ${this.renderKpi(t)}

      <section>
        <h2>${e.battery.timeAtSoc}</h2>
        <ia-chart .option=${ww(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.battery.chargeBands}</h2>
        <ia-chart .option=${Sw(t.bands, e)} height="220px"></ia-chart>
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
Vn([
  rt({ attribute: !1 })
], mr.prototype, "hass", 2);
Vn([
  rt({ type: String })
], mr.prototype, "entryId", 2);
Vn([
  rt({ type: String })
], mr.prototype, "range", 2);
Vn([
  mt()
], mr.prototype, "payload", 2);
Vn([
  mt()
], mr.prototype, "error", 2);
Vn([
  mt()
], mr.prototype, "loading", 2);
mr = Vn([
  xe("ia-battery-tab")
], mr);
function Sn(e) {
  return e === null ? null : e / 100;
}
function rb(e) {
  return e.reserve_reason ?? "no_soc";
}
function UL(e) {
  const t = e.hours_left;
  return t == null ? { kind: "reason", reason: rb(e) } : t === 0 && e.below_low ? { kind: "didNotLast" } : { kind: "hours", hours: t };
}
function YL(e) {
  const t = e.needed_pct;
  return t == null ? { kind: "reason", reason: rb(e) } : t > 100 ? { kind: "over" } : { kind: "pct", pct: t };
}
function XL(e) {
  const t = e.worst_needed_pct, r = e.worst_start;
  return t === null || r === null ? { kind: "none" } : t > 100 ? { kind: "over", start: r } : { kind: "pct", pct: t, start: r };
}
function qL(e) {
  return e.judged === 0 ? { kind: "none" } : { kind: "count", covered: e.covered, judged: e.judged };
}
function ZL(e) {
  return e.has_soc && e.kpi.count > 0 && e.episodes.length > 0;
}
var KL = Object.defineProperty, jL = Object.getOwnPropertyDescriptor, Gn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? jL(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && KL(t, r, i), i;
};
function _a(e, t) {
  return e === null ? et : Kt(e * 3600, t);
}
const QL = 24 * 3600 * 1e3;
function JL(e, t) {
  const r = new Date(e), n = new Date(new Date(t).getTime() - 1), i = (a) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  return Math.round((i(n) - i(r)) / QL) + 1;
}
let _r = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
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
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await Bb(this.hass, this.entryId, t, r);
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
      [t.grid.outages, i ? `${n.count}` : et, ""],
      [
        t.grid.withoutGrid,
        i ? Kt(n.off_seconds, r) : et,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        n.bridged_seconds > 0 ? t.grid.unrecordedAssumedOff({
          duration: Kt(n.bridged_seconds, r)
        }) : ""
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      [t.grid.shareOfTime, Pe(n.off_share, r), t.grid.ofMeasuredTime],
      [
        t.grid.longest,
        n.longest_seconds === null ? et : Kt(n.longest_seconds, r),
        n.longest_start ? t.grid.fromTime({ time: new Date(n.longest_start).toLocaleString(r) }) : ""
      ],
      [
        t.grid.meanDuration,
        n.mean_seconds === null ? et : Kt(n.mean_seconds, r),
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
    const n = (i) => i == null ? et : U(i / 100, r);
    return I`<table>
      <thead>
        <tr>
          <th>${t.common.start}</th>
          <th>${t.common.duration}</th>
          ${e.has_soc ? I`<th>${t.grid.chargeAtStart}</th>
                <th>${t.grid.lowest}</th>
                <th>${t.grid.atEnd}</th>
                <th>${t.grid.hoursLeft}</th>
                <th>${t.grid.neededAtStart}</th>` : O}
          ${e.has_load ? I`<th>${t.common.meanLoad}</th>` : O}
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
                  >` : O}
            </td>
            ${e.has_soc ? I`<td>${n(i.soc_start)}</td>
                  <td class=${i.below_low ? "low" : ""}>${n(i.soc_min)}</td>
                  <td>${n(i.soc_end)}</td>
                  <td>${this.renderHoursLeft(i)}</td>
                  <td>${this.renderNeeded(i)}</td>` : O}
            ${e.has_load ? I`<td>${ft(i.load_mean_w ?? null, r)}</td>` : O}
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
    return I`<span class="low">&gt; ${U(1, this.i18n.locale)}</span>`;
  }
  renderHoursLeft(e) {
    const t = UL(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "didNotLast":
        return I`<span class="low">${this.i18n.m.grid.didNotLast}</span>`;
      case "hours":
        return _a(t.hours, this.i18n.locale);
    }
  }
  renderNeeded(e) {
    const t = YL(e);
    switch (t.kind) {
      case "reason":
        return this.reserveReason(t.reason);
      case "over":
        return I`${this.overFull()}
          <span class="hint">${this.i18n.m.grid.moreThanFull}</span>`;
      case "pct":
        return U(t.pct / 100, this.i18n.locale);
    }
  }
  renderHardest(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = XL(e);
    if (n.kind === "none")
      return I`<span class="value">${et}</span>
        <span class="row"><span>${t.grid.noHardestOutage}</span></span>`;
    const i = t.grid.hardestOutageOn({
      date: new Date(n.start).toLocaleDateString(r)
    });
    return n.kind === "over" ? I`<span class="value">${this.overFull()}</span>
          <span class="row"><span>${i}</span><span>${t.grid.moreThanFull}</span></span>` : I`<span class="value">${U(n.pct / 100, r)}</span>
          <span class="row"><span>${i}</span></span>`;
  }
  renderReserve(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = qL(e);
    return I`
      <div class="cards">
        <div class="card">
          <span class="name">${r.grid.hardestOutageNeeds}</span>
          ${this.renderHardest(e)}
        </div>
        <div class="card">
          <span class="name">${r.grid.outagesCovered}</span>
          <span class="value"
            >${i.kind === "none" ? et : r.grid.coveredOf({ covered: i.covered, judged: i.judged })}</span
          >
          <span class="row"
            ><span>${r.grid.coveredHint({ level: U(t / 100, n) })}</span></span
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
          hours: _a(e.evidence_hours, n)
        })
      };
      return I`<p class="note">${r.grid.noAutonomy} ${a[e.reason]}</p>`;
    }
    const i = e.rate_pct_per_hour;
    return I`
      <div class="cards">
        <div class="card">
          <span class="name"
            >${r.grid.fromFullTo({ level: U(t / 100, n) })}</span
          >
          <span class="value">${_a(e.hours_from_full, n)}</span>
        </div>
        <div class="card">
          <span class="name">${r.grid.fromNow}</span>
          <span class="value">${_a(e.hours_from_now, n)}</span>
          <span class="row">
            <span>${r.grid.chargeNow}</span>
            <span
              >${e.soc_now === null ? et : U(e.soc_now / 100, n)}</span
            >
          </span>
        </div>
        <div class="card">
          <span class="name">${r.grid.dischargeRate}</span>
          <span class="value"
            >${i === null ? et : r.grid.pointsPerHour({ rate: Jb(i, r.charts.locale) })}</span
          >
          <span class="row">
            <span>${r.common.meanLoad}</span>
            <span>${ft(e.load_mean_w, n)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        ${r.grid.evidenceNote({ hours: _a(e.evidence_hours, n) })}
      </p>
    `;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Wa(t.coverage, r), i = t.days.length === 0, a = JL(t.counted_from ?? t.window.start, t.window.end) - t.days.length, o = t.counted_from ? new Date(t.counted_from).toLocaleDateString(r) : null;
    return I`
      <div class="status">
        <span class="badge">${ll(t.precision, t.boundary, r)}</span>
        ${o ? I`<span class="warn">
              ${t.source === "inferred" ? e.grid.countedFromInferred({ date: o }) : e.grid.countedFromNoHistory({ date: o })}
            </span>` : O}
        ${n ? I`<span class="warn">${n}</span>` : O}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      ${t.source === "inferred" ? I`<p class="banner">${e.grid.inferredBanner}</p>` : O}

      ${this.renderKpi(t)}

      <section>
        <h2>${e.grid.hoursByDay}</h2>
        ${i ? I`<p class="empty">${e.grid.noDaysWithData}</p>` : I`<ia-chart
                .option=${$w(t.days, e)}
                height="220px"
              ></ia-chart>
              ${a > 0 ? I`<p class="note">${e.grid.missingDays({ n: a })}</p>` : O}`}
      </section>

      <section>
        <h2>${e.grid.shareByHour}</h2>
        <ia-chart .option=${Lw(t.hours, e)} height="220px"></ia-chart>
        <p class="note">${e.grid.hoursNeverRecorded}</p>
      </section>

      <section>
        <h2>${e.grid.outages}</h2>
        ${this.renderEpisodes(t)}
      </section>

      <section>
        <h2>${e.grid.autonomy}</h2>
        ${this.renderAutonomy(t.autonomy, t.low_pct)}
        ${ZL(t) ? this.renderReserve(t.reserve, t.low_pct) : O}
      </section>
    `;
  }
};
_r.styles = [
  qi,
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
Gn([
  rt({ attribute: !1 })
], _r.prototype, "hass", 2);
Gn([
  rt({ type: String })
], _r.prototype, "entryId", 2);
Gn([
  rt({ type: String })
], _r.prototype, "range", 2);
Gn([
  mt()
], _r.prototype, "payload", 2);
Gn([
  mt()
], _r.prototype, "error", 2);
Gn([
  mt()
], _r.prototype, "loading", 2);
_r = Gn([
  xe("ia-grid-tab")
], _r);
const tP = 0.02, eP = 3, nb = 20, rP = 6, ib = 10, ab = 5, ob = 1, nP = 100, iP = 0.8, aP = 0.95, oP = 0.1, ry = [
  { key: "capacity", signals: ["capacity"] },
  { key: "efficiency", signals: ["efficiency"] },
  { key: "solar", signals: ["solar_energy", "best_hour"] },
  { key: "inverter", signals: ["inverter"] }
], sb = 12;
function Mc(e, t) {
  return e.months[t]?.value ?? null;
}
function sP(e) {
  const [t, r] = e.split("-");
  return `${Number(t) - 1}-${r}`;
}
function lP(e, t) {
  const r = e.signals[t];
  return [...new Set(e.months.map((i) => Number(i.slice(0, 4))))].sort(
    (i, a) => i - a
  ).map((i) => ({
    year: i,
    values: Array.from(
      { length: sb },
      (a, o) => Mc(r, `${i}-${String(o + 1).padStart(2, "0")}`)
    )
  })).filter((i) => i.values.some((a) => a !== null));
}
function uP(e, t) {
  const r = e.signals[t];
  return e.months.slice(-sb).map((n) => {
    const i = Mc(r, n), a = Mc(r, sP(n));
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
function hP(e) {
  const { recent_mean: t, previous_mean: r, change: n, recent_months: i, previous_months: a } = e.comparison;
  return t === null || r === null || n === null ? {
    kind: "notEnough",
    recent: i,
    previous: a,
    needed: rP
  } : {
    kind: "figure",
    recent: t,
    previous: r,
    change: n,
    share: r === 0 ? null : n / r
  };
}
function cP(e) {
  return e.best_hour_mode === "all" && e.export_limited === !1 ? "exporting" : e.best_hour_mode;
}
function fP(e) {
  return e.export_limited === !0 ? "household" : "array";
}
function di(e, t, r) {
  return new Intl.NumberFormat(r, {
    maximumFractionDigits: t,
    signDisplay: "exceptZero"
  }).format(e);
}
function us(e, t, r, n) {
  if (t === null) return et;
  switch (e) {
    case "capacity":
    case "solar_energy":
      return Pt(t, n);
    case "efficiency":
      return U(t, n);
    case "best_hour":
      return ft(t, n);
    case "inverter":
      return `${new Intl.NumberFormat(n, { maximumFractionDigits: 1 }).format(t)} ${r.units.h}`;
  }
}
function ny(e, t, r, n) {
  if (t === null) return et;
  switch (e) {
    case "capacity":
    case "solar_energy":
      return `${di(t, 1, n)} ${r.units.kwh}`;
    case "efficiency":
      return `${di(t * 100, 1, n)} ${r.units.pp}`;
    case "best_hour":
      return Math.abs(t) >= 1e3 ? `${di(t / 1e3, 1, n)} ${r.units.kw}` : `${di(t, 0, n)} ${r.units.w}`;
    case "inverter":
      return `${di(t, 1, n)} ${r.units.h}`;
  }
}
function iy(e, t) {
  return e === null ? et : `${di(e * 100, 1, t)}%`;
}
function dP(e, t, r) {
  const n = lP(e, t), i = (a) => n.map((o) => ({
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
function vP(e, t, r, n) {
  return t !== "capacity" || e.nameplate_kwh === null ? null : {
    value: e.nameplate_kwh,
    name: r.health.nameplate({ value: Pt(e.nameplate_kwh, n) })
  };
}
function As(e, t) {
  return new Intl.NumberFormat(t, { maximumFractionDigits: 2 }).format(e);
}
function pP(e) {
  return Math.floor(e * 1e3) / 1e3;
}
function ay(e, t, r) {
  return t !== "efficiency" || r?.drift_corrected !== !0 ? null : e.health.driftCorrected;
}
function gP(e, t, r, n) {
  const i = e.health.reasons;
  switch (t) {
    case "too_few_clean_hours":
      return i.too_few_clean_hours({
        n: r?.clean_hours ?? 0,
        minHours: nb
      });
    case "no_soc":
      return i.no_soc;
    case "counters_partial":
      return i.counters_partial;
    case "soc_partial":
      return i.soc_partial;
    case "drift":
      return i.drift({ points: As(ab, n) });
    case "too_little_throughput":
      return i.too_little_throughput({ min: Pt(ob, n) });
    case "drift_uncorrectable":
      return i.drift_uncorrectable;
    case "partial_month":
      return r?.coverage === void 0 ? i.partial_month : i.partialCoverage({
        share: Pe(pP(r.coverage), n),
        needed: U(aP, n)
      });
    case "curtailed":
      return i.curtailed({
        n: r?.unconstrained_hours ?? 0,
        minHours: ib
      });
  }
}
function yP(e, t, r = !1) {
  const n = e.health.definitions;
  return {
    capacity: n.capacity({
      charge: `${As(tP, t)} ${e.units.kwh}`,
      drop: As(eP, t),
      minHours: nb
    }),
    efficiency: n.efficiency({
      points: As(ab, t),
      min: Pt(ob, t),
      share: U(oP, t)
    }),
    solar: n.solar({
      minHours: ib,
      minPower: ft(nP, t)
    }) + (r ? ` ${n.solarDerived}` : ""),
    inverter: n.inverter({ share: U(iP, t) })
  };
}
var mP = Object.defineProperty, _P = Object.getOwnPropertyDescriptor, Zi = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? _P(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && mP(t, r, i), i;
};
let Yr = class extends Ht {
  constructor() {
    super(...arguments), this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
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
      const t = await Fb(this.hass, this.entryId);
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
      ${r ? t.sizing.needsNotSet({ roles: Gr(t, e, !0) }) : t.sizing.needsNotMapped({ roles: Gr(t, e, !0), n: e.length })}
    </p>`;
  }
  renderComparison(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = hP(e.signals[t]);
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
      <span class="value">${us(t, i.recent, r, n)}</span>
      <span class="row">
        <span
          >${r.health.twelveBefore({
      value: us(t, i.previous, r, n)
    })}</span
        >
        <span
          >${ny(t, i.change, r, n)}
          (${iy(i.share, n)})</span
        >
      </span>
      <span class="hint">${r.health.meanOfMonthly}</span>
    </div>`;
  }
  renderTable(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = uP(e, t), a = e.signals[t].months;
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
              <td>${Ua(o.key, void 0, n)}</td>
              <td>
                ${us(t, o.value, r, n)}
                ${o.reason !== null ? I`<span class="hint">${gP(r, o.reason, s, n)}</span>` : O}
                ${ay(r, t, s) !== null ? I`<span class="hint">${ay(r, t, s)}</span>` : O}
                ${t === "inverter" && s?.measured_hours !== void 0 ? I`<span class="hint"
                      >${r.health.inverterHint({
        atRated: `${s.hours_at_rated ?? 0}`,
        measured: `${s.measured_hours}`
      })}</span
                    >` : O}
              </td>
              <td>${us(t, o.previousValue, r, n)}</td>
              <td>${ny(t, o.difference, r, n)}</td>
              <td>${iy(o.share, n)}</td>
            </tr>`;
    })}
        </tbody>
      </table>
    </div>`;
  }
  /** The captions a signal's chart carries beneath it. */
  renderCaptions(e, t) {
    const r = this.i18n.m;
    return t === "capacity" && e.nameplate_kwh !== null ? I`<p class="note">${r.health.nameplateNote}</p>` : t === "solar_energy" ? I`<p class="note">${r.health.energyCaption[fP(e)]}</p>` : t === "best_hour" ? I`<p class="note">${r.health.bestHourCaption[cP(e)]}</p>` : O;
  }
  renderSignal(e, t, r) {
    const n = this.i18n.m, i = this.i18n.locale, a = e.signals[t], o = r ? I`<h3>${n.health.signals[t]}</h3>` : O;
    if (a.missing.length)
      return I`${o}${this.renderMissing(a.missing)}`;
    const { lines: s, unit: l } = dP(e, t, n);
    return I`
      ${o} ${this.renderComparison(e, t)}
      <ia-chart
        .option=${Pw(s, l, n, vP(e, t, n, i))}
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
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = yP(e, r, t.pv_power_derived);
    return I`
      <div class="status">
        <span class="badge"
          >${t.first_month ? e.health.wholeHistory({ month: Ua(t.first_month, void 0, r) }) : e.health.wholeHistoryEmpty}</span
        >
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${!t.covers_now && t.covered_end ? I`<span class="warn"
              >${e.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}</span
            >` : O}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      ${ry.map(({ key: i, signals: a }) => this.renderCard(t, i, a))}

      <section>
        <h2>${e.health.howRead}</h2>
        ${ry.map(({ key: i }) => I`<p class="note">${n[i]}</p>`)}
        <p class="note">${e.health.caveats.bms}</p>
        <p class="note">${e.health.caveats.weather}</p>
      </section>
    `;
  }
};
Yr.styles = [
  qi,
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
Zi([
  rt({ attribute: !1 })
], Yr.prototype, "hass", 2);
Zi([
  rt({ type: String })
], Yr.prototype, "entryId", 2);
Zi([
  mt()
], Yr.prototype, "payload", 2);
Zi([
  mt()
], Yr.prototype, "error", 2);
Zi([
  mt()
], Yr.prototype, "loading", 2);
Yr = Zi([
  xe("ia-health-tab")
], Yr);
function lb(e, t) {
  return t === void 0 || t <= e ? null : { shown: e, total: t };
}
var bP = Object.defineProperty, wP = Object.getOwnPropertyDescriptor, Gl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? wP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && bP(t, r, i), i;
};
let Bi = class extends Ht {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Be(this);
  }
  renderCards() {
    const e = this.i18n.m, t = e.sections.phases, { rating_per_phase: r } = this.phases;
    return I`<div class="cards">
      ${this.phases.per_phase.map((n) => {
      const i = this.series[n.key]?.coverage;
      return I`<div class="card">
          <span class="name">${Ps(e, n)}</span>
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
            ><span>${U(n.share, this.locale)}</span></span
          >
          <span class="row">
            <span>${t.peakVs({ rating: ft(r, this.locale) })}</span>
            <span>${U(n.headroom, this.locale)}</span>
          </span>
          ${i !== void 0 && i < 0.95 ? I`<span class="warn">
                ${e.common.coversOfPeriod({ share: Pe(i, this.locale) })}
              </span>` : O}
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
          <span class="value">${U(r.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">${t.p95Imbalance}</span>
          <span class="value">${U(r.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">
            ${t.above({ threshold: U(r.threshold, this.locale) })}
          </span>
          <span class="value">${U(r.fraction_above, this.locale)}</span>
          <span class="row"><span>${t.ofMeasuredTime}</span></span>
        </div>
      </div>
      <ia-chart .option=${_w(r, e)}></ia-chart>
      <p class="note">
        ${t.measuredOver({
      duration: Kt(r.analysed_seconds, this.locale),
      share: Pe(r.coverage, this.locale)
    })}${r.below_floor_seconds > 0 ? I` ${t.belowFloorExcluded({
      duration: Kt(r.below_floor_seconds, this.locale),
      floor: ft(r.floor_w, this.locale)
    })}` : O}
      </p>
    `;
  }
  renderEpisodes() {
    const e = this.i18n.m, { episodes: t, episodes_total: r, per_phase: n } = this.phases;
    if (!t.length)
      return I`<p class="empty">${e.sections.phases.noSustained}</p>`;
    const i = lb(t.length, r);
    return I`<table>
      <thead>
        <tr>
          <th>${e.common.start}</th>
          <th>${e.common.duration}</th>
          <th>${e.sections.phases.worst}</th>
          ${n.map((a) => I`<th>${Ps(e, a)}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${t.map(
      (a) => I`<tr>
            <td>${new Date(a.start).toLocaleString(this.locale)}</td>
            <td>${Kt(a.seconds, this.locale)}</td>
            <td>${U(a.peak_imbalance, this.locale)}</td>
            ${a.phases.map((o) => I`<td>${ft(o, this.locale)}</td>`)}
          </tr>`
    )}
      </tbody>
    </table>
    ${i ? I`<p class="note">${e.common.longestShown(i)}</p>` : O}`;
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
            </p>` : O}
        ${e.aligned_coverage < 0.95 ? I`<p class="warn">
              ${i.alignedLow({ share: Pe(e.aligned_coverage, this.locale) })}
            </p>` : O}

        <h3>${i.imbalance}</h3>
        ${this.renderImbalance()}

        <h3>${i.sustainedEpisodes}</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }
};
Bi.styles = [qi, ue`:host { display: block; }`];
Gl([
  rt({ attribute: !1 })
], Bi.prototype, "phases", 2);
Gl([
  rt({ attribute: !1 })
], Bi.prototype, "series", 2);
Gl([
  rt({ type: String })
], Bi.prototype, "locale", 2);
Bi = Gl([
  xe("ia-phases-section")
], Bi);
var SP = Object.defineProperty, xP = Object.getOwnPropertyDescriptor, Wl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? xP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && SP(t, r, i), i;
};
let zi = class extends Ht {
  constructor() {
    super(...arguments), this.series = {}, this.locale = "en", this.i18n = new Be(this);
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
              <span class="name">${Ps(e, i)}</span>
              <span class="value">${ft(i.mean, this.locale)}</span>
              <span class="row"
                ><span>${e.common.peak}</span
                ><span>${ft(i.peak, this.locale)}</span></span
              >
              <span class="row"
                ><span>${t.shareOfPv}</span
                ><span>${U(i.share, this.locale)}</span></span
              >
              ${a !== void 0 && a < 0.95 ? I`<span class="warn">
                    ${e.common.coversOfPeriod({ share: Pe(a, this.locale) })}
                  </span>` : O}
            </div>`;
    })}
        </div>
        <ia-chart .option=${bw(r, at.pv, e)}></ia-chart>
        ${n < 0.95 ? I`<p class="warn">
              ${t.alignedLow({ share: Pe(n, this.locale) })}
            </p>` : O}
        <p class="note">${t.compare}</p>
      </section>
    `;
  }
};
zi.styles = [qi, ue`:host { display: block; }`];
Wl([
  rt({ attribute: !1 })
], zi.prototype, "strings", 2);
Wl([
  rt({ attribute: !1 })
], zi.prototype, "series", 2);
Wl([
  rt({ type: String })
], zi.prototype, "locale", 2);
zi = Wl([
  xe("ia-strings-section")
], zi);
var TP = Object.defineProperty, CP = Object.getOwnPropertyDescriptor, Zr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? CP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && TP(t, r, i), i;
};
let Je = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.mode = "watts", this.i18n = new Be(this), this.requestId = 0;
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
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await Ob(this.hass, this.entryId, t, r);
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
    if (!e?.beyond_margin) return O;
    const r = this.i18n.locale;
    return I`<span class="warn">
      ${t({
      total: ft(e.total_mean, r),
      partsTotal: ft(e.parts_mean, r)
    })}
    </span>`;
  }
  renderKpi(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = (a) => a === null ? "" : t.load.shareOfRated({ share: U(a / e.rated_power, r) }), i = [
      [t.load.mean, ft(e.kpi.mean, r), n(e.kpi.mean)],
      [t.load.median, ft(e.kpi.median, r), ""],
      ["P95", ft(e.kpi.p95, r), ""],
      [t.common.peak, ft(e.kpi.max, r), n(e.kpi.max)],
      [t.load.sustained15m, ft(e.kpi.max_sustained_15m, r), ""],
      [
        t.load.above80OfRated,
        U(e.kpi.fraction_above_80pct, r),
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
    const r = this.i18n.locale, n = lb(e.overloads.length, e.overloads_total);
    return I`<table>
      <thead>
        <tr><th>${t.common.start}</th><th>${t.common.duration}</th><th>${t.common.peak}</th></tr>
      </thead>
      <tbody>
        ${e.overloads.map(
      (i) => I`<tr>
            <td>${new Date(i.start).toLocaleString(r)}</td>
            <td>${Kt(i.seconds, r)}</td>
            <td>${ft(i.peak, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>
    ${n ? I`<p class="note">${t.common.longestShown(n)}</p>` : O}`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale;
    return I`
      <div class="status">
        <span class="badge">${ll(t.precision, t.boundary, r)}</span>
        ${Wa(t.coverage, r) ? I`<span class="warn">${Wa(t.coverage, r)}</span>` : O}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${t.histogram.clipped_low_seconds + t.histogram.clipped_high_seconds > 0 ? I`<span class="warn">${e.load.histogramClipped}</span>` : O}
        ${this.renderConsistency(t.consistency.load, e.load.loadConsistency)}
        ${this.renderConsistency(t.consistency.pv, e.load.pvConsistency)}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      ${this.renderKpi(t)}

      <section>
        <header>
          <h2>${e.load.timeAtPowerLevel}</h2>
          <button @click=${() => {
      this.mode = this.mode === "watts" ? "percent" : "watts";
    }}>${this.mode === "watts" ? e.load.asPercentOfRated : e.load.inWatts}</button>
        </header>
        <ia-chart .option=${gw(t, this.mode, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.durationCurve}</h2>
        <ia-chart .option=${yw(t, e)}></ia-chart>
      </section>

      <section>
        <h2>${e.load.ratedBands}</h2>
        <ia-chart .option=${mw(t, e)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${e.load.overloadEpisodes}</h2>
        ${this.renderOverloads(t)}
      </section>

      ${t.phases ? I`<ia-phases-section
            .phases=${t.phases}
            .series=${t.series}
            .locale=${r}
          ></ia-phases-section>` : O}

      ${t.strings ? I`<ia-strings-section
            .strings=${t.strings}
            .series=${t.series}
            .locale=${r}
          ></ia-strings-section>` : O}
    `;
  }
};
Je.styles = ue`
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
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 8px 0 0; }
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
Zr([
  rt({ attribute: !1 })
], Je.prototype, "hass", 2);
Zr([
  rt({ type: String })
], Je.prototype, "entryId", 2);
Zr([
  rt({ type: String })
], Je.prototype, "range", 2);
Zr([
  mt()
], Je.prototype, "payload", 2);
Zr([
  mt()
], Je.prototype, "error", 2);
Zr([
  mt()
], Je.prototype, "loading", 2);
Zr([
  mt()
], Je.prototype, "mode", 2);
Je = Zr([
  xe("ia-load-tab")
], Je);
var MP = Object.defineProperty, DP = Object.getOwnPropertyDescriptor, Wn = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? DP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && MP(t, r, i), i;
};
let br = class extends Ht {
  constructor() {
    super(...arguments), this.range = "year", this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
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
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await kb(this.hass, this.entryId, t, r);
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
          ${e.has_pv ? I`<th>${t.seasonality.meanPv}</th>` : O}
          <th>${t.seasonality.ofTheMonth}</th>
        </tr>
      </thead>
      <tbody>
        ${e.months.map(
      (i, a) => I`<tr class=${i.complete ? "" : "partial"}>
            <td>${Ua(i.key, n[a - 1], t.charts.locale)}</td>
            <td>${ft(i.load_mean, r)}</td>
            <td>${ft(i.load_peak_hourly, r)}</td>
            ${e.has_pv ? I`<td>${ft(i.pv_mean, r)}</td>` : O}
            <td>${U(i.coverage, r)}</td>
          </tr>`
    )}
      </tbody>
    </table>`;
  }
  render() {
    const e = this.i18n.m;
    if (this.error !== void 0)
      return I`<div class="notice">
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = Wa(t.coverage, r), i = t.months.filter((o) => !o.complete && o.load_mean !== null), a = t.months.filter((o) => o.load_mean === null);
    return I`
      <div class="status">
        <span class="badge">${ll(t.precision, t.boundary, r)}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${n ? I`<span class="warn">${n}</span>` : O}
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      <section>
        <h2>${e.seasonality.meanByMonth}</h2>
        <ia-chart .option=${Tw(t.months, t.has_pv, e)}></ia-chart>
        ${i.length ? I`<p class="note">
              ${e.seasonality.thinMonths({
      n: i.length,
      share: U(t.incomplete_below, r)
    })}
              ${e.seasonality.partialNotLower}
            </p>` : O}
        ${a.length ? I`<p class="note">
              ${e.seasonality.absentMonths({ n: a.length })}
              ${e.seasonality.statisticsFromStart}
            </p>` : O}
      </section>

      <section>
        <h2>${e.seasonality.monthByMonth}</h2>
        ${this.renderMonthTable(t)}
        <p class="note">${e.seasonality.busiestHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.meanByHour}</h2>
        <ia-chart .option=${Cw(t.hours, t.has_pv, e)}></ia-chart>
        <p class="note">${e.seasonality.byHourNote}</p>
      </section>

      <section>
        <h2>${e.seasonality.hourByMonth}</h2>
        <ia-chart
          .option=${Mw(t.cells, t.months, e)}
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
Wn([
  rt({ attribute: !1 })
], br.prototype, "hass", 2);
Wn([
  rt({ type: String })
], br.prototype, "entryId", 2);
Wn([
  rt({ type: String })
], br.prototype, "range", 2);
Wn([
  mt()
], br.prototype, "payload", 2);
Wn([
  mt()
], br.prototype, "error", 2);
Wn([
  mt()
], br.prototype, "loading", 2);
br = Wn([
  xe("ia-seasonality-tab")
], br);
function oy(e, t) {
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
function sy(e, t, r, n) {
  return t === "battery" && r === "never_full" ? n === "ceiling" ? e.verdict.neverReachedLimit : e.verdict.neverFull : t === "solar" && r === "no_fill" ? e.verdict.noFill : e.verdict.noData[t];
}
function AP(e, t, r, n) {
  return t === "battery" && r === "never_full" ? n === "ceiling" ? e.verdict.hintLimitNotReached : e.verdict.hintNeverFilled : t === "solar" && r === "no_fill" ? e.verdict.hintNoFill : e.verdict.hintNoData;
}
function IP(e) {
  const t = e.period.solar;
  if (t) return typeof t.evidence.fill_share == "number";
  const r = e.cards.battery;
  return !r.missing.length && !r.thresholds_inverted;
}
function $P(e) {
  return e.rules.export_limited === !0 ? e.rules.full_mode === "ceiling" ? "no_export" : "no_export_fixed" : IP(e) ? "with_fill" : "plain";
}
function LP(e, t, r, n) {
  if (t === !0) {
    const a = r.fill_share;
    return a == null ? et : e.sizing.filledOnDays({ share: U(a, n) });
  }
  const i = r.production_share;
  return i == null ? et : e.sizing.ofLoad({ share: U(i, n) });
}
function PP(e, t, r) {
  if (t.cards.battery.missing.includes("battery_soc")) return null;
  const n = t.rules;
  if (n.full_mode === "ceiling") return e.sizing.fullModeCeiling;
  const i = n.ceiling_missing ?? [];
  if (i.length)
    return e.sizing.fullModeFixed({ full: r, roles: Gr(e, i, !0), n: i.length });
  const a = n.ceiling_no_rows ?? [];
  return a.length ? e.sizing.fullModeNoRows({ full: r, roles: Gr(e, a, !0), n: a.length }) : e.sizing.fullModePlain({ full: r });
}
var RP = Object.defineProperty, OP = Object.getOwnPropertyDescriptor, Un = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? OP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && RP(t, r, i), i;
};
const EP = ["inverter", "battery", "solar"];
function kP(e, t) {
  const [r, n] = e.split("-").map(Number);
  return new Date(r, n - 1, 1).toLocaleDateString(t, {
    month: "short",
    year: "numeric"
  });
}
let wr = class extends Ht {
  constructor() {
    super(...arguments), this.range = "30d", this.loading = !1, this.i18n = new Be(this), this.requestId = 0;
  }
  willUpdate(e) {
    (e.has("entryId") || e.has("range")) && this.load();
  }
  async load() {
    if (!this.entryId) return;
    const e = ++this.requestId;
    this.loading = !0, this.error = void 0;
    try {
      const { start: t, end: r } = Fi(this.range, /* @__PURE__ */ new Date()), n = await zb(this.hass, this.entryId, t, r);
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
  cellFigure(e, t, r, n) {
    const i = this.i18n.m, a = t.evidence;
    return e === "inverter" ? i.sizing.hoursAtRated({ hours: `${a.hours_at_rated ?? 0}` }) : e === "battery" ? i.sizing.daysOf({
      days: `${a.days_full_and_low ?? 0}`,
      total: a.days_with_data ?? 0
    }) : LP(i, r.rules.export_limited, a, n);
  }
  renderEvidence(e, t, r, n) {
    const i = this.i18n.m, a = t.evidence, o = (l, u) => i.sizing.countOf({ count: `${l ?? et}`, total: `${u ?? et}` }), s = (l, u) => I`<span class="row"><span>${l}</span><span>${u}</span></span>`;
    return e === "inverter" ? I`
        ${s(i.sizing.hoursReachedRated, o(a.hours_at_rated, a.measured_hours))}
        ${s(
      i.sizing.hoursAboveOfRated({ share: U(r.high_load_share, n) }),
      `${a.hours_above_high ?? et}`
    )}
        ${s(i.sizing.highestPeak, ft(a.peak_w ?? null, n))}
      ` : e === "battery" ? I`
        ${s(i.sizing.daysFilledAndLow, o(a.days_full_and_low, a.days_with_data))}
        ${s(i.sizing.daysLowWithoutFilling, `${a.days_low_without_full ?? et}`)}
        ${s(i.sizing.daysFilled, `${a.days_full ?? et}`)}
        ${s(
      i.sizing.lowestCharge,
      a.lowest_pct === null || a.lowest_pct === void 0 ? et : U(a.lowest_pct / 100, n)
    )}
      ` : I`
      ${s(
      i.sizing.productionShare,
      a.production_share === null || a.production_share === void 0 ? et : U(a.production_share, n)
    )}
      ${s(
      i.sizing.producedConsumed,
      `${Pt(a.pv_kwh ?? null, n)} / ${Pt(a.load_kwh ?? null, n)}`
    )}
      ${s(
      i.common.selfSufficiency,
      a.self_sufficiency === null || a.self_sufficiency === void 0 ? et : U(a.self_sufficiency, n)
    )}
      ${s(
      i.sizing.daysBatteryFilled,
      a.fill_share === null || a.fill_share === void 0 ? et : U(a.fill_share, n)
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
    const n = this.i18n.m, i = t.rules, a = (l) => U(l, r);
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
    switch ($P(t)) {
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
        ${a ? r.sizing.needsNotSet({ roles: Gr(r, i.missing, !0) }) : r.sizing.needsNotMapped({
        roles: Gr(r, i.missing, !0),
        n: i.missing.length
      })}
      </p>`;
    }
    if (i.thresholds_inverted)
      return I`<p class="note">
        ${r.sizing.thresholdsInverted({
        full: U(t.rules.full_pct / 100, n),
        low: U(t.rules.low_pct / 100, n)
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
    if (e.coverage === 0 || e.coverage >= t.incomplete_below) return O;
    const r = this.i18n.locale;
    return I`<p class="note">
      ${this.i18n.m.sizing.readFrom({ share: Pe(e.coverage, r) })}
    </p>`;
  }
  renderCard(e, t) {
    const r = this.i18n.m, n = this.i18n.locale, i = t.period[e], a = this.renderSetupNote(e, t);
    let o;
    return a !== null ? o = a : i === null ? o = I`<p class="note">
        ${sy(r, e, "no_data", t.rules.full_mode)}
      </p>` : i.verdict === null ? o = I`
        <p class="note">
          ${sy(r, e, i.reason ?? "no_data", t.rules.full_mode)}
        </p>
        ${this.renderCoverageNote(i, t)}
      ` : o = I`
        ${this.renderEvidence(e, i, t.rules, n)}
        ${this.renderCoverageNote(i, t)}
        ${i.note === "covers_but_battery_not_filling" ? I`<p class="note">
              ${r.sizing.batteryNotFilling({
      share: U(i.evidence.fill_share ?? 0, n)
    })}
            </p>` : O}
        <p class="note">${this.ruleSentence(e, t, n)}</p>
      `, I`<div class="card">
      <span class="name">${r.sizing.cards[e]}</span>
      <span class="value ${i?.verdict ?? "none"}"
        >${oy(r, i?.verdict ?? null)}</span
      >
      ${o}
    </div>`;
  }
  renderMonths(e) {
    const t = this.i18n.m, r = this.i18n.locale, n = (i, a) => {
      const o = a[i];
      if (o === null || e.cards[i].no_statistics.length)
        return I`<td class="none">${et}</td>`;
      const s = a.complete && o.coverage < e.incomplete_below;
      return I`<td class=${o.verdict ?? "none"}>
        ${oy(t, o.verdict)}
        ${o.verdict === null ? (
        // Why there is no verdict: a month the battery never filled is the
        // rule working, a month with no statistics is missing data, and
        // "No verdict" alone reads the same for both.
        I`<span class="hint"
              >${AP(t, i, o.reason ?? "no_data", e.rules.full_mode)}</span
            >`
      ) : I`<span class="hint">${this.cellFigure(i, o, e, r)}</span>`}
        ${s ? I`<span class="hint"
              >${t.sizing.cellCoverage({ share: Pe(o.coverage, r) })}</span
            >` : O}
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
              ${kP(i.key, r)}
              ${i.coverage === 0 ? I`<span class="hint">${t.verdict.hintNoData}</span>` : i.complete ? O : I`<span class="hint"
                      >${t.sizing.ofTheMonth({
        share: Pe(i.coverage, r)
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
        ${e.common.couldNotLoadData({ error: Xr(this.error, e) })}
        <button @click=${() => this.load()}>${e.common.tryAgain}</button>
      </div>`;
    if (!this.payload)
      return I`<div class="notice">${e.common.computing}</div>`;
    const t = this.payload, r = this.i18n.locale, n = (a) => e.sizing.ruleLine({
      part: e.sizing.parts[a],
      rule: this.ruleSentence(a, t, r)
    }), i = PP(e, t, U(t.rules.full_pct / 100, r));
    return I`
      <div class="status">
        <span class="badge">${e.balance.hourlyStatistics}</span>
        <span class="badge">${e.seasonality.monthsIn({ timezone: t.timezone })}</span>
        ${t.clamped ? I`<span class="warn">${e.common.periodShortened}</span>` : O}
        ${!t.covers_whole_window && t.covered_end ? I`<span class="warn"
              >${e.sizing.statisticsCoverUpTo({
      time: new Date(t.covered_end).toLocaleString(r)
    })}</span
            >` : O}
        ${t.covered_end ? O : I`<span class="warn">${e.sizing.noStatistics}</span>`}
        ${this.loading ? I`<span class="warn">${e.common.refreshing}</span>` : O}
      </div>

      <section>
        <div class="cards">${EP.map((a) => this.renderCard(a, t))}</div>
      </section>

      <section>
        <h2>${e.seasonality.monthByMonth}</h2>
        ${this.renderMonths(t)}
        <p class="note">
          ${e.sizing.greyMonths({ share: U(t.incomplete_below, r) })}
        </p>
      </section>

      <section>
        <h2>${e.sizing.howVerdictsRead}</h2>
        <p class="note">${n("inverter")}</p>
        <p class="note">${n("battery")}</p>
        <p class="note">${n("solar")}</p>
        ${i ? I`<p class="note">${i}</p>` : O}
        <p class="note">${e.sizing.hourlyNotMean}</p>
      </section>
    `;
  }
};
wr.styles = [
  qi,
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
Un([
  rt({ attribute: !1 })
], wr.prototype, "hass", 2);
Un([
  rt({ type: String })
], wr.prototype, "entryId", 2);
Un([
  rt({ type: String })
], wr.prototype, "range", 2);
Un([
  mt()
], wr.prototype, "payload", 2);
Un([
  mt()
], wr.prototype, "error", 2);
Un([
  mt()
], wr.prototype, "loading", 2);
wr = Un([
  xe("ia-sizing-tab")
], wr);
var NP = Object.defineProperty, BP = Object.getOwnPropertyDescriptor, Tr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? BP(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && NP(t, r, i), i;
};
const zP = "/inverter-analytics", ly = ["load", "battery", "seasonal", "balance", "grid", "sizing", "health"];
let Ne = class extends Ht {
  constructor() {
    super(...arguments), this.narrow = !1, this.tab = "load", this.range = "30d", this.i18n = new Be(this), this.readLocation = () => {
      const e = iw(
        window.location.pathname,
        window.location.search,
        ly,
        { tab: this.tab, range: this.range, entryId: this.entryId }
      );
      this.tab = e.tab, this.range = e.range, this.entryId = e.entryId;
    }, this.loadConfig = tw(() => this.requestConfig());
  }
  connectedCallback() {
    super.connectedCallback(), this.readLocation(), window.addEventListener("popstate", this.readLocation), this.hass && this.loadConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this.readLocation), super.disconnectedCallback();
  }
  willUpdate(e) {
    e.has("hass") && Kb(this.hass?.locale?.language), e.has("hass") && this.hass && !this.config && this.error === void 0 && this.loadConfig();
  }
  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  writeLocation(e = !1) {
    const t = aw(zP, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId
    });
    e ? window.history.pushState(null, "", t) : window.history.replaceState(null, "", t);
  }
  async requestConfig() {
    try {
      this.config = await Rb(this.hass), this.config.entries.some((t) => t.entry_id === this.entryId) || (this.entryId = this.config.entries[0]?.entry_id), this.writeLocation();
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
        ${e.panel.couldNotLoad({ error: Xr(this.error, e) })}
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
            </select>` : O}
        <div class="langs" role="group" aria-label=${e.panel.language}>
          ${Wb.map(
      (t) => I`<button
              class=${t === this.i18n.lang ? "active" : ""}
              aria-pressed=${t === this.i18n.lang ? "true" : "false"}
              @click=${() => Zb(t)}
            >${t.toUpperCase()}</button>`
    )}
        </div>
        ${this.renderRanges(e)}
      </div>

      <nav class="tabs">
        ${ly.map((t) => {
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
    const { unused: t, label: r, note: n } = nw(e, this.tab);
    return I`
      <div
        class="ranges ${t ? "unused" : ""}"
        role="group"
        aria-label=${r}
        title=${t ? r : O}
      >
        ${my.map(
      (i) => I`<button
            class=${i === this.range ? "active" : ""}
            aria-pressed=${i === this.range ? "true" : "false"}
            aria-disabled=${t ? "true" : O}
            ?disabled=${t}
            @click=${() => this.selectRange(i)}
          >${ew(e, i)}</button>`
    )}
      </div>
      ${n !== null ? I`<span class="ranges-note" aria-hidden="true">${n}</span>` : O}
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
        roles: Gr(e, t.missing, !0)
      };
      return I`<div class="notice">
        <p>
          ${t.missing.length === 1 ? e.panel.missingOne(r) : e.panel.missingMany(r)}
        </p>
        <p>
          ${e.panel.reconfigureBefore}<strong>${e.panel.reconfigure}</strong
          >${e.panel.reconfigureAfter}
        </p>
        <a href=${lw}>${e.panel.goToSettings}</a>
      </div>`;
    }
    return I`
        ${this.tab === "load" ? I`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>` : O}
        ${this.tab === "battery" ? I`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>` : O}
        ${this.tab === "seasonal" ? I`<ia-seasonality-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-seasonality-tab>` : O}
        ${this.tab === "balance" ? I`<ia-balance-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-balance-tab>` : O}
        ${this.tab === "grid" ? I`<ia-grid-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-grid-tab>` : O}
        ${this.tab === "sizing" ? I`<ia-sizing-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-sizing-tab>` : O}
        ${this.tab === "health" ? I`<ia-health-tab .hass=${this.hass} .entryId=${this.entryId}></ia-health-tab>` : O}
    `;
  }
};
Ne.styles = ue`
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
  rt({ attribute: !1 })
], Ne.prototype, "hass", 2);
Tr([
  rt({ type: Boolean })
], Ne.prototype, "narrow", 2);
Tr([
  rt({ attribute: !1 })
], Ne.prototype, "route", 2);
Tr([
  mt()
], Ne.prototype, "config", 2);
Tr([
  mt()
], Ne.prototype, "error", 2);
Tr([
  mt()
], Ne.prototype, "entryId", 2);
Tr([
  mt()
], Ne.prototype, "tab", 2);
Tr([
  mt()
], Ne.prototype, "range", 2);
Ne = Tr([
  xe("inverter-analytics-panel")
], Ne);
export {
  Ne as InverterAnalyticsPanel
};

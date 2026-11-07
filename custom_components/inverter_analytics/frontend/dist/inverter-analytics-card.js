/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,ut=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),kt=new WeakMap;let Gt=class{constructor(t,i,r){if(this._$cssResult$=true,r!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(ut&&t===void 0){const r=i!==void 0&&i.length===1;r&&(t=kt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&kt.set(i,t))}return t}toString(){return this.cssText}};const Se=e=>new Gt(typeof e=="string"?e:e+"",void 0,pt),X=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===true)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[n+1],e[0]);return new Gt(i,e,pt)},Te=(e,t)=>{if(ut)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const r=document.createElement("style"),s=j.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}},St=ut?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const r of t.cssRules)i+=r.cssText;return Se(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ce,defineProperty:Pe,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Ne,getOwnPropertySymbols:De,getPrototypeOf:Ie}=Object,J=globalThis,Tt=J.trustedTypes,He=Tt?Tt.emptyScript:"",Oe=J.reactiveElementPolyfillSupport,N=(e,t)=>e,G={toAttribute(e,t){switch(t){case Boolean:e=e?He:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},gt=(e,t)=>!Ce(e,t),Ct={attribute:true,type:String,converter:G,reflect:false,useDefault:false,hasChanged:gt};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ct){if(i.state&&(i.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=true),this.elementProperties.set(t,i),!i.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,i);s!==void 0&&Pe(this.prototype,t,s)}}static getPropertyDescriptor(t,i,r){const{get:s,set:n}=Me(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const c=s?.call(this);n?.call(this,o),this.requestUpdate(t,c,r)},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ct}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;const t=Ie(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(N("properties"))){const i=this.properties,r=[...Ne(i),...De(i)];for(const s of r)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[r,s]of i)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[i,r]of this.elementProperties){const s=this._$Eu(i,r);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)i.unshift(St(s))}else t!==void 0&&i.push(St(t));return i}static _$Eu(t,i){const r=i.attribute;return r===false?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const r of i.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,r){this._$AK(t,r)}_$ET(t,i){const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===true){const n=(r.converter?.toAttribute!==void 0?r.converter:G).toAttribute(i,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,i){const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=r.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:G;this._$Em=s;const c=o.fromAttribute(i,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,i,r,s=false,n){if(t!==void 0){const o=this.constructor;if(s===false&&(n=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??gt)(n,i)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,i,r)}this.isUpdatePending===false&&(this._$ES=this._$EP())}C(t,i,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),n!==true||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(i=void 0),this._$AL.set(t,i)),s===true&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=true;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,n]of r){const{wrapped:o}=n,c=this[s];o!==true||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let t=false;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(i)):this._$EM()}catch(r){throw t=false,this._$EM(),r}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=false}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return true}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[N("elementProperties")]=new Map,A[N("finalized")]=new Map,Oe?.({ReactiveElement:A}),(J.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=globalThis,Pt=e=>e,q=ft.trustedTypes,Mt=q?q.createPolicy("lit-html",{createHTML:e=>e}):void 0,qt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Vt="?"+b,Re=`<${Vt}>`,E=document,I=()=>E.createComment(""),H=e=>e===null||typeof e!="object"&&typeof e!="function",mt=Array.isArray,Ue=e=>mt(e)||typeof e?.[Symbol.iterator]=="function",it=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nt=/-->/g,Dt=/>/g,v=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),It=/'/g,Ht=/"/g,Kt=/^(?:script|style|textarea|title)$/i,Yt=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),p=Yt(1),D=Yt(2),T=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ot=new WeakMap,x=E.createTreeWalker(E,129);function Zt(e,t){if(!mt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(t):t}const ze=(e,t)=>{const i=e.length-1,r=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let c=0;c<i;c++){const a=e[c];let u,d,l=-1,g=0;for(;g<a.length&&(o.lastIndex=g,d=o.exec(a),d!==null);)g=o.lastIndex,o===P?d[1]==="!--"?o=Nt:d[1]!==void 0?o=Dt:d[2]!==void 0?(Kt.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=v):d[3]!==void 0&&(o=v):o===v?d[0]===">"?(o=s??P,l=-1):d[1]===void 0?l=-2:(l=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?v:d[3]==='"'?Ht:It):o===Ht||o===It?o=v:o===Nt||o===Dt?o=P:(o=v,s=void 0);const m=o===v&&e[c+1].startsWith("/>")?" ":"";n+=o===P?a+Re:l>=0?(r.push(u),a.slice(0,l)+qt+a.slice(l)+b+m):a+b+(l===-2?c:m)}return[Zt(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class O{constructor({strings:t,_$litType$:i},r){let s;this.parts=[];let n=0,o=0;const c=t.length-1,a=this.parts,[u,d]=ze(t,i);if(this.el=O.createElement(u,r),x.currentNode=this.el.content,i===2||i===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=x.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(qt)){const g=d[o++],m=s.getAttribute(l).split(b),f=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:f[2],strings:m,ctor:f[1]==="."?Fe:f[1]==="?"?je:f[1]==="@"?Be:Q}),s.removeAttribute(l)}else l.startsWith(b)&&(a.push({type:6,index:n}),s.removeAttribute(l));if(Kt.test(s.tagName)){const l=s.textContent.split(b),g=l.length-1;if(g>0){s.textContent=q?q.emptyScript:"";for(let m=0;m<g;m++)s.append(l[m],I()),x.nextNode(),a.push({type:2,index:++n});s.append(l[g],I())}}}else if(s.nodeType===8)if(s.data===Vt)a.push({type:2,index:n});else{let l=-1;for(;(l=s.data.indexOf(b,l+1))!==-1;)a.push({type:7,index:n}),l+=b.length-1}n++}}static createElement(t,i){const r=E.createElement("template");return r.innerHTML=t,r}}function C(e,t,i=e,r){if(t===T)return t;let s=r!==void 0?i._$Co?.[r]:i._$Cl;const n=H(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(false),n===void 0?s=void 0:(s=new n(e),s._$AT(e,i,r)),r!==void 0?(i._$Co??=[])[r]=s:i._$Cl=s),s!==void 0&&(t=C(e,s._$AS(e,t.values),s,r)),t}class Le{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:r}=this._$AD,s=(t?.creationScope??E).importNode(i,true);x.currentNode=s;let n=x.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new z(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new We(n,this,t)),this._$AV.push(u),a=r[++c]}o!==a?.index&&(n=x.nextNode(),o++)}return x.currentNode=E,s}p(t){let i=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,i),i+=r.strings.length-2):r._$AI(t[i])),i++}}class z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??true}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=C(this,t,i),H(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ue(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=O.createElement(Zt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(i);else{const n=new Le(s,this),o=n.u(this.options);n.p(i),this.T(o),this._$AH=n}}_$AC(t){let i=Ot.get(t.strings);return i===void 0&&Ot.set(t.strings,i=new O(t)),i}k(t){mt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,s=0;for(const n of t)s===i.length?i.push(r=new z(this.O(I()),this.O(I()),this,this.options)):r=i[s],r._$AI(n),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t!==this._$AB;){const r=Pt(t).nextSibling;Pt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,r,s,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,i=this,r,s){const n=this.strings;let o=false;if(n===void 0)t=C(this,t,i,0),o=!H(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else{const c=t;let a,u;for(t=n[0],a=0;a<n.length-1;a++)u=C(this,c[r+a],i,a),u===T&&(u=this._$AH[a]),o||=!H(u)||u!==this._$AH[a],u===h?t=h:t!==h&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Fe extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class je extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Be extends Q{constructor(t,i,r,s,n){super(t,i,r,s,n),this.type=5}_$AI(t,i=this){if((t=C(this,t,i,0)??h)===T)return;const r=this._$AH,s=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class We{constructor(t,i,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const Ge=ft.litHtmlPolyfillSupport;Ge?.(O,z),(ft.litHtmlVersions??=[]).push("3.3.3");const qe=(e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(s===void 0){const n=i?.renderBefore??null;r._$litPart$=s=new z(t.insertBefore(I(),n),n,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis;class _ extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=qe(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false)}render(){return T}}_._$litElement$=true,_.finalized=true,$t.litElementHydrateSupport?.({LitElement:_});const Ve=$t.litElementPolyfillSupport;Ve?.({LitElement:_});($t.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke={attribute:true,type:String,converter:G,reflect:false,hasChanged:gt},Ye=(e=Ke,t,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((e=Object.create(e)).wrapped=true),n.set(i.name,e),r==="accessor"){const{name:o}=i;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,e,true,c)},init(c){return c!==void 0&&this.C(o,void 0,e,c),c}}}if(r==="setter"){const{name:o}=i;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,e,true,c)}}throw Error("Unsupported decorator location: "+r)};function Ze(e){return(t,i)=>typeof i=="object"?Ye(e,t,i):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tt(e){return Ze({...e,state:true,attribute:false})}const $="\u2014",Xt=["ring","bar","tile"],Jt=["full","ring","time"];function Qt(e){return Xt.includes(e)?e:"ring"}function te(e){return Jt.includes(e)?e:"full"}function Xe(e,t,i,r){const s=new Intl.NumberFormat(i,{maximumFractionDigits:0}),n=Math.max(1,Math.round(e));if(n<60)return{duration:r.minutes({m:s.format(n)}),arrival:new Date(t.getTime()+n*6e4),over2Days:false};const o=Math.round(e/5)*5;if(o>=48*60)return{duration:r.over2Days,arrival:null,over2Days:true};const c=Math.floor(o/60),a=o%60;return{duration:a===0?r.hours({h:s.format(c)}):r.hoursMinutes({h:s.format(c),m:s.format(a)}),arrival:new Date(t.getTime()+o*6e4),over2Days:false}}function et(e,t){return new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(e)}function Je(e,t,i){return e.arrival===null?e.duration:`${e.duration} ${i.arrival({time:et(e.arrival,t)})}`}function w(e,t){return new Intl.NumberFormat(t,{maximumFractionDigits:1}).format(e)}function Qe(e,t){const i=e.map(r=>t.roles[r]??r);return i.length<=1?i.join(""):`${i.slice(0,-1).join(", ")} ${t.and} ${i[i.length-1]}`}function Rt(e){const{state:t,m:i,locale:r}=e;switch(t.kind){case"loading":return{word:$,status:$,note:e.basisError};case"unmapped":return{word:$,status:$,note:i.unmapped};case"unavailable":return{word:$,status:$,note:t.entity?i.unavailable({entity:t.entity}):null};case"at_limit":return{word:i.words.atLimit,status:i.atLimit({t:w(t.target,r)}),note:null};case"at_floor":return{word:i.words.atFloor,status:i.atFloor({t:w(t.target,r)}),note:null};case"idle":return{word:i.words.idle,status:i.idle,note:null};case"no_capacity":{const s=t.direction==="charging",n=s?i.chargingTo:i.dischargingTo,o=t.reason==="missing_roles"?i.capacityNeedsRoles({roles:Qe(t.missing_roles,i)}):i.capacityNotMeasured({n:t.clean_hours,min:t.clean_hours_min});return{word:s?i.words.charging:i.words.discharging,status:i.withEta({status:n({t:w(e.target??0,r)}),eta:$}),note:o}}case"charging":case"discharging":{const s=t.kind==="charging",n=s?i.chargingTo:i.dischargingTo,o=e.eta?Je(e.eta,r,i):$;return{word:s?i.words.charging:i.words.discharging,status:i.withEta({status:n({t:w(t.target,r)}),eta:o}),note:null}}}}function yt(e){return e.kind==="charging"||e.kind==="discharging"?e.kind:e.kind==="no_capacity"?e.direction:null}function ti(e){if(e.kind==="at_floor")return"low";const t=yt(e);return t==="charging"?"charge":t==="discharging"?"discharge":"rest"}function ee(e,t){if(e===null)return"mdi:battery-unknown";const i=t?"mdi:battery-charging":"mdi:battery";return e<5?`${i}-outline`:e>=95?t?`${i}-100`:i:`${i}-${Math.round(e/10)*10}`}function ie(e,t,i){return e===null||Number.isNaN(e)?$:Math.abs(Math.round(e))>=1e3?`${new Intl.NumberFormat(t,{minimumFractionDigits:1,maximumFractionDigits:1}).format(e/1e3)} ${i.units.kw}`:`${new Intl.NumberFormat(t,{maximumFractionDigits:0}).format(e)} ${i.units.w}`}function V(e,t){return e===null?$:`${new Intl.NumberFormat(t,{maximumFractionDigits:0}).format(e)}%`}function re(e,t){const{m:i,locale:r,eta:s}=e,n=V(e.soc,r),o=s?s.duration:e.word;switch(t){case"full":return{primary:`${n} \xB7 ${o}`};case"ring":return{primary:e.target===null?n:`${n} \xB7 ${i.toTarget({t:w(e.target,r)})}`,secondary:o};case"time":return s?.arrival?{primary:i.approx({time:et(s.arrival,r)})}:s?.over2Days?{primary:i.over2Days}:{primary:e.word}}}function ei(e,t){if(t==="ring")return null;const i=yt(e.state);if(t==="time"){if(i==="charging")return"mdi:lightning-bolt";if(i==="discharging")return"mdi:arrow-down"}return ee(e.soc,i==="charging")}const se={ring:{rows:5,columns:6,min_rows:5,size:6},bar:{rows:3,columns:6,min_rows:3,size:3},tile:{rows:2,columns:6,min_rows:2,size:2}};function ii(e){const{rows:t,columns:i,min_rows:r}=se[e];return{rows:t,columns:i,min_rows:r}}function ri(e){return se[e].size}function st(e){return Math.min(100,Math.max(0,e))}function ne(e,t,i,r){const s=2*Math.PI*r,n=[],o=a=>st(a)*360/100;t!==null&&n.push({at:o(t),kind:"charge"}),i!==null&&n.push({at:o(i),kind:"discharge"});const c=e===null?0:s*st(e)/100;return{circumference:s,fillDash:c,ticks:n}}function si(e,t){return`${w(e,t)}%`}function oe(e){const{m:t,locale:i}=e;if(e.target===null)return null;const r=t.toTarget({t:w(e.target,i)}),s=e.eta?.arrival;return s?`${r} \xB7 ${t.approx({time:et(s,i)})}`:r}function ni(e){return(e.eta?oe(e):null)??e.status}function ae(e){const{powerW:t}=e;if(e.state.kind==="loading"||t===null||Number.isNaN(t))return null;const i=yt(e.state);return{icon:i==="charging"?"mdi:arrow-up":i==="discharging"?"mdi:arrow-down":null,text:ie(Math.abs(t),e.locale,e.m)}}function Ut(e){const t=[],i=(r,s)=>{if(r===null)return;const n=st(r),o=n<=10?"start":n>=90?"end":"middle";t.push({at:n,kind:s,label:si(r,e.locale),anchor:o})};return i(e.dischargeTo,"discharge"),i(e.chargeTo,"charge"),t}function oi(e){const t=e.eta?.arrival,i=ae(e);return{text:t?e.m.approx({time:et(t,e.locale)}):null,icon:i?.icon??null,power:i?.text??null}}function ai(e){const t=e.state.kind;return t==="unmapped"||t==="unavailable"||t==="loading"?`${$} \xB7 ${$}`:re(e,"full").primary}function nt(e){const{m:t,locale:i}=e;return t.sentence({soc:V(e.soc,i),status:e.status,power:ie(e.powerW,i,t)})}function ci(e){return[{name:"layout",selector:{select:{mode:"dropdown",options:Xt.map(t=>({value:t,label:e.layouts[t]}))}}},{name:"entry_id",selector:{text:{}}},{name:"charge_to",selector:{text:{}}},{name:"discharge_to",selector:{text:{}}}]}function li(e){return[{name:"style",selector:{select:{mode:"dropdown",options:Jt.map(t=>({value:t,label:e.styles[t]}))}}},{name:"entry_id",selector:{text:{}}},{name:"charge_to",selector:{text:{}}},{name:"discharge_to",selector:{text:{}}}]}const ce=12e4;function hi(e,t,i=ce){if(e.length===0)return null;const r=t-i;let s=0,n=0;for(let o=0;o<e.length;o++){const c=Math.max(e[o].t,r),a=Math.min(o+1<e.length?e[o+1].t:t,t);a<=c||(s+=e[o].w*(a-c),n+=a-c)}return n===0?e[e.length-1].w:s/n}function di(e,t,i=ce){const r=t-i;let s=0;for(;s+1<e.length&&e[s+1].t<=r;)s++;return e.slice(s)}function zt(e,t,i){if(e===void 0||e==="")return{value:i,unavailable:null};if(typeof e=="number")return{value:e,unavailable:null};const r=Number(e);if(e.trim()!==""&&Number.isFinite(r))return{value:r,unavailable:null};const s=B(t[e]?.state);return s===null?{value:null,unavailable:e}:{value:s,unavailable:null}}function B(e){if(e===void 0||e==="unavailable"||e==="unknown"||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function ui(e){const{soc:t,powerW:i,chargeTo:r,dischargeTo:s,basis:n}=e;if(!e.mapped)return{kind:"unmapped"};if(e.unavailable!==null)return{kind:"unavailable",entity:e.unavailable};if(t===null||i===null||r===null||s===null)return{kind:"unavailable",entity:""};const o=n.idle_w;if(t>=r&&i>-o)return{kind:"at_limit",target:r};if(t<=s&&i<o)return{kind:"at_floor",target:s};if(Math.abs(i)<o)return{kind:"idle"};const c=i>0;if(e.capacityKwh===null)return{kind:"no_capacity",direction:c?"charging":"discharging",reason:n.capacity_reason==="missing_roles"?"missing_roles":"too_few_clean_hours",clean_hours:n.clean_hours,clean_hours_min:n.clean_hours_min,missing_roles:n.missing_roles};const a=c?r:s,u=e.capacityKwh*Math.abs(a-t)/100/(Math.abs(i)/1e3);return{kind:c?"charging":"discharging",target:a,minutes:u*60}}function pi(e){if(e==null)return;const t=String(e).trim();if(t==="")return;const i=Number(t);return Number.isFinite(i)?i:t}const le=["entry_id","charge_to","discharge_to","layout"],gi=["entry_id","charge_to","discharge_to","style"];function he(e,t,i=[...le,"style"]){const r={...e};for(const s of i){const n=pi(t[s]);n===void 0?delete r[s]:s==="charge_to"||s==="discharge_to"?r[s]=n:r[s]=String(n)}return r}function Lt(e){return typeof e=="string"&&e.trim()!==""&&!Number.isFinite(Number(e))}function fi(e,t){const i=[];return e?.soc_entity&&i.push(e.soc_entity),e?.battery_power_entity&&i.push(e.battery_power_entity),Lt(t.charge_to)&&i.push(t.charge_to),Lt(t.discharge_to)&&i.push(t.discharge_to),i}function mi(e,t){return!e||e.length!==t.length?true:t.some((i,r)=>i!==e[r])}const de=36e5;function $i(e,t){return e===void 0||t-e>de}const yi={name:"Battery time",description:"Time at the current power, from the battery's measured capacity",chargingTo:e=>`Charging to ${e.t}%`,dischargingTo:e=>`Discharging to ${e.t}%`,atLimit:e=>`At limit ${e.t}%`,atFloor:e=>`At floor ${e.t}%`,idle:"Idle",withEta:e=>`${e.status} \xB7 ${e.eta}`,minutes:e=>`${e.m} min`,hoursMinutes:e=>`${e.h} h ${e.m} min`,hours:e=>`${e.h} h`,over2Days:"over 2 days",arrival:e=>`(\u2248${e.time})`,unmapped:"Map battery SoC and battery power in Inverter Analytics",unavailable:e=>`${e.entity} is unavailable`,capacityNotMeasured:e=>`Capacity not measured yet (${e.n} of ${e.min} clean discharge hours)`,capacityNeedsRoles:e=>`Capacity needs ${e.roles} mapped`,and:"and",roles:{battery_soc:"battery SoC",battery_charge_total:"battery charge total",battery_discharge_total:"battery discharge total"},units:{w:"W",kw:"kW"},words:{charging:"charging",discharging:"discharging",idle:"idle",atLimit:"at limit",atFloor:"floor"},toTarget:e=>`to ${e.t}%`,approx:e=>`\u2248${e.time}`,sentence:e=>`Battery at ${e.soc}. ${e.status}. Battery power ${e.power}.`,layouts:{ring:"Ring",bar:"Bar",tile:"Tile"},styles:{full:"Full",ring:"Ring",time:"Time"},badge:{name:"Battery time",description:"Battery charge and the time to its target, at the current power."},editor:{layout:"Layout",style:"Style",entryId:"Inverter",entryIdHint:"The inverter's entry id; leave empty if there is only one",chargeTo:"Charge to",chargeToHint:"A number (%) or an entity; 100 if empty",dischargeTo:"Discharge to",dischargeToHint:"A number (%) or an entity; the low battery charge if empty"}},Ft=new Map;function bi(e){let t=Ft.get(e);return t||(t=new Intl.PluralRules(e),Ft.set(e,t)),t}function _i(e,t,i){const r=bi(e).select(t);return r==="one"?i.one:r==="few"?i.few??i.other:r==="many"?i.many??i.other:i.other}const vi={name:"\u0427\u0430\u0441 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",description:"\u0427\u0430\u0441 \u0437\u0430 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0457 \u043F\u043E\u0442\u0443\u0436\u043D\u043E\u0441\u0442\u0456, \u0437 \u0432\u0438\u043C\u0456\u0440\u044F\u043D\u043E\u0457 \u0454\u043C\u043D\u043E\u0441\u0442\u0456 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",chargingTo:e=>`\u0417\u0430\u0440\u044F\u0434 \u0434\u043E ${e.t}%`,dischargingTo:e=>`\u0420\u043E\u0437\u0440\u044F\u0434 \u0434\u043E ${e.t}%`,atLimit:e=>`\u0414\u043E\u0441\u044F\u0433\u043B\u0430 \u043B\u0456\u043C\u0456\u0442\u0443 ${e.t}%`,atFloor:e=>`\u0414\u043E\u0441\u044F\u0433\u043B\u0430 \u043D\u0438\u0436\u043D\u044C\u043E\u0457 \u043C\u0435\u0436\u0456 ${e.t}%`,idle:"\u041F\u0440\u043E\u0441\u0442\u0456\u0439",withEta:e=>`${e.status} \xB7 ${e.eta}`,minutes:e=>`${e.m} \u0445\u0432`,hoursMinutes:e=>`${e.h} \u0433\u043E\u0434 ${e.m} \u0445\u0432`,hours:e=>`${e.h} \u0433\u043E\u0434`,over2Days:"\u043F\u043E\u043D\u0430\u0434 2 \u0434\u043E\u0431\u0438",arrival:e=>`(\u2248${e.time})`,unmapped:"\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0440\u0456\u0432\u0435\u043D\u044C \u0437\u0430\u0440\u044F\u0434\u0443 \u0439 \u043F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u0432 Inverter Analytics",unavailable:e=>`\u0421\u0443\u0442\u043D\u0456\u0441\u0442\u044C ${e.entity} \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430`,capacityNotMeasured:e=>`\u0404\u043C\u043D\u0456\u0441\u0442\u044C \u0449\u0435 \u043D\u0435 \u0432\u0438\u043C\u0456\u0440\u044F\u043D\u0430 (${e.n} \u0437 ${e.min} `+_i("uk",e.min,{one:"\u0447\u0438\u0441\u0442\u043E\u0457 \u0433\u043E\u0434\u0438\u043D\u0438",other:"\u0447\u0438\u0441\u0442\u0438\u0445 \u0433\u043E\u0434\u0438\u043D"})+" \u0440\u043E\u0437\u0440\u044F\u0434\u0443)",capacityNeedsRoles:e=>`\u0414\u043B\u044F \u0454\u043C\u043D\u043E\u0441\u0442\u0456 \u0432\u043A\u0430\u0436\u0456\u0442\u044C ${e.roles}`,and:"\u0456",roles:{battery_soc:"\u0440\u0456\u0432\u0435\u043D\u044C \u0437\u0430\u0440\u044F\u0434\u0443",battery_charge_total:"\u043B\u0456\u0447\u0438\u043B\u044C\u043D\u0438\u043A \u0437\u0430\u0440\u044F\u0434\u0443",battery_discharge_total:"\u043B\u0456\u0447\u0438\u043B\u044C\u043D\u0438\u043A \u0440\u043E\u0437\u0440\u044F\u0434\u0443"},units:{w:"\u0412\u0442",kw:"\u043A\u0412\u0442"},words:{charging:"\u0437\u0430\u0440\u044F\u0434",discharging:"\u0440\u043E\u0437\u0440\u044F\u0434",idle:"\u043F\u0440\u043E\u0441\u0442\u0456\u0439",atLimit:"\u043D\u0430 \u043B\u0456\u043C\u0456\u0442\u0456",atFloor:"\u043C\u0456\u043D\u0456\u043C\u0443\u043C"},toTarget:e=>`\u0434\u043E ${e.t}%`,approx:e=>`\u2248${e.time}`,sentence:e=>`\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457 ${e.soc}. ${e.status}. \u041F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C \u0431\u0430\u0442\u0430\u0440\u0435\u0457 ${e.power}.`,layouts:{ring:"\u041A\u0456\u043B\u044C\u0446\u0435",bar:"\u0421\u043C\u0443\u0433\u0430",tile:"\u041F\u043B\u0438\u0442\u043A\u0430"},styles:{full:"\u041F\u043E\u0432\u043D\u0438\u0439",ring:"\u041A\u0456\u043B\u044C\u0446\u0435",time:"\u0427\u0430\u0441"},badge:{name:"\u0427\u0430\u0441 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",description:"\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u0439 \u0447\u0430\u0441 \u0434\u043E \u0446\u0456\u043B\u0456 \u0437\u0430 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0457 \u043F\u043E\u0442\u0443\u0436\u043D\u043E\u0441\u0442\u0456."},editor:{layout:"\u0412\u0438\u0433\u043B\u044F\u0434",style:"\u0421\u0442\u0438\u043B\u044C",entryId:"\u0406\u043D\u0432\u0435\u0440\u0442\u043E\u0440",entryIdHint:"\u0406\u0434\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0438\u0441\u0443 \u0456\u043D\u0432\u0435\u0440\u0442\u043E\u0440\u0430; \u0437\u0430\u043B\u0438\u0448\u0442\u0435 \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u043C, \u044F\u043A\u0449\u043E \u0456\u043D\u0432\u0435\u0440\u0442\u043E\u0440 \u043E\u0434\u0438\u043D",chargeTo:"\u0417\u0430\u0440\u044F\u0434\u0436\u0430\u0442\u0438 \u0434\u043E",chargeToHint:"\u0427\u0438\u0441\u043B\u043E (%) \u0430\u0431\u043E \u0441\u0443\u0442\u043D\u0456\u0441\u0442\u044C; 100, \u044F\u043A\u0449\u043E \u043F\u043E\u0440\u043E\u0436\u043D\u044C\u043E",dischargeTo:"\u0420\u043E\u0437\u0440\u044F\u0434\u0436\u0430\u0442\u0438 \u0434\u043E",dischargeToHint:"\u0427\u0438\u0441\u043B\u043E (%) \u0430\u0431\u043E \u0441\u0443\u0442\u043D\u0456\u0441\u0442\u044C; \u043D\u0438\u0437\u044C\u043A\u0438\u0439 \u0437\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457, \u044F\u043A\u0449\u043E \u043F\u043E\u0440\u043E\u0436\u043D\u044C\u043E"}},ue="inverter-analytics.lang";function bt(e){return e==="en"||e==="uk"}function pe(e){return(e??"").toLowerCase().startsWith("uk")}function xi(e,t){return bt(e)?e:pe(t)?"uk":"en"}function wi(e,t){return e==="uk"?"uk":!t||pe(t)?"en":t}let S,K;const ot=new Set;function Ei(){if(S===void 0)try{const e=globalThis.localStorage?.getItem(ue)??null;S=bt(e)?e:null}catch{S=null}return S}function ge(){for(const e of ot)e()}function fe(){return xi(Ei(),K)}function at(){return wi(fe(),K)}const Ai="inverter-analytics-lang";function me(e){!bt(e)||e===S||(S=e,ge())}globalThis.window?.addEventListener(Ai,e=>{me(e.detail)});globalThis.window?.addEventListener("storage",e=>{const{key:t,newValue:i}=e;t===ue&&me(i)});function ki(e){if(e===K)return;const t=at();K=e,at()!==t&&ge()}function Si(e){return ot.add(e),()=>ot.delete(e)}function L(){return fe()==="uk"?vi:yi}const Ti=2e4,Ci=100;function Pi(e){return e&&typeof e=="object"&&"message"in e?String(e.message):String(e)}class $e{constructor(t){this.config={},this.samples=[],this.host=t,t.addController(this)}get hass(){return this._hass}get socEntity(){return this.basis?.soc_entity??void 0}setConfig(t){const i={entry_id:t.entry_id||void 0,charge_to:t.charge_to,discharge_to:t.discharge_to},r=i.entry_id!==this.config.entry_id;this.config=i,this.watched=void 0,r&&this._hass&&this.fetchedFor!==void 0&&(this.samples=[],this.lastPower=void 0,this.basis=void 0,this.basisError=void 0,this.fetchBasis()),this.host.requestUpdate()}setHass(t){this._hass=t,ki(t.locale?.language),this.notePower(t),this.fetchedFor===void 0&&this.fetchBasis(),this.host.isConnected&&this.startTimers();const i=fi(this.basis,this.config).map(r=>t.states[r]);mi(this.watched,i)&&(this.watched=i,this.host.requestUpdate())}hostConnected(){this.unsubscribeLang?.(),this.unsubscribeLang=Si(()=>this.host.requestUpdate()),this._hass&&(this.startTimers(),this.fetchedFor!==void 0&&$i(this.fetchedAt,Date.now())&&this.fetchBasis())}hostDisconnected(){this.unsubscribeLang?.(),this.unsubscribeLang=void 0,this.timer!==void 0&&clearInterval(this.timer),this.tick!==void 0&&clearInterval(this.tick),this.timer=void 0,this.tick=void 0}hostUpdate(){this._hass&&this.basis&&this.lastPower===void 0&&this.notePower(this._hass)}startTimers(){this.timer===void 0&&(this.timer=setInterval(()=>void this.fetchBasis(),de)),this.tick===void 0&&(this.tick=setInterval(()=>this.host.requestUpdate(),Ti))}async fetchBasis(){const t=this._hass;if(!t)return;const i=this.config.entry_id;this.fetchedFor=i??"";const r={type:"inverter_analytics/battery_eta"};i&&(r.entry_id=i);let s,n;try{s=await t.callWS(r)}catch(o){n=Pi(o)}this.config.entry_id===i&&(this.basis=s,this.basisError=n,this.fetchedAt=Date.now(),this.watched=void 0,this.host.requestUpdate())}notePower(t){const i=this.basis?.battery_power_entity;if(!i)return;const r=t.states[i];if(r===this.lastPower)return;this.lastPower=r;const s=Date.now(),n=B(r?.state);if(n===null){this.samples=[];return}const o=this.basis?.battery_power_inverted?-1:1;this.samples=di([...this.samples,{t:s,w:n*o}],s)}view(){const t=L(),i=at(),r=this._hass,s=this.basis;if(!r||!s){const At={kind:"loading"},{word:Ee,status:Ae,note:ke}=Rt({state:At,target:null,eta:null,basisError:this.basisError??null,m:t,locale:i});return{state:At,soc:null,powerW:null,chargeTo:null,dischargeTo:null,target:null,eta:null,tone:"rest",word:Ee,status:Ae,note:ke,m:t,locale:i}}const n=s.soc_entity,o=s.battery_power_entity,c=!!(n&&o),a=n?B(r.states[n]?.state):null,d=(o?B(r.states[o]?.state):null)===null?null:hi(this.samples,Date.now()),l=zt(this.config.charge_to,r.states,Ci),g=zt(this.config.discharge_to,r.states,s.low_pct);let m=null;c&&(a===null?m=n:d===null?m=o:m=l.unavailable??g.unavailable);const f=ui({soc:a,powerW:d,chargeTo:l.value,dischargeTo:g.value,unavailable:m,mapped:c,capacityKwh:s.capacity_kwh,basis:s});let F=null;f.kind==="charging"||f.kind==="discharging"?F=f.target:f.kind==="no_capacity"&&(F=f.direction==="charging"?l.value:g.value);const Et=f.kind==="charging"||f.kind==="discharging"?Xe(f.minutes,new Date,i,t):null,{word:ve,status:xe,note:we}=Rt({state:f,target:F,eta:Et,basisError:this.basisError??null,m:t,locale:i});return{state:f,soc:a,powerW:d,chargeTo:l.value,dischargeTo:g.value,target:F,eta:Et,tone:ti(f),word:ve,status:xe,note:we,m:t,locale:i}}}var Mi=Object.defineProperty,ye=(e,t,i,r)=>{for(var s=void 0,n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=o(t,i,s)||s);return s&&Mi(t,i,s),s};const Y="inverter-analytics-battery-badge",ct="inverter-analytics-battery-badge-editor",k=28,be=3,rt=(k-be)/2,_t=class _t2 extends _{constructor(){super(...arguments),this.battery=new $e(this),this.badgeStyle="full"}static getConfigElement(){return document.createElement(ct)}static getStubConfig(){return{style:"full"}}setConfig(t){this.badgeStyle=te(t.style),this.battery.setConfig(t)}set hass(t){this.battery.setHass(t)}get hass(){return this.battery.hass}render(){const t=this.battery.view(),i=re(t,this.badgeStyle),r=this.badgeStyle==="ring"?this.miniRing(t):this.icon(t),s=i.secondary?p`<span class="two"><small>${i.primary}</small><span>${i.secondary}</span></span>`:p`<span class="one">${i.primary}</span>`;return p`<div
      class="pill tone-${t.tone} style-${this.badgeStyle}"
      role="button"
      tabindex="0"
      aria-label=${nt(t)}
      @click=${this.open}
      @keydown=${this.key}
    >
      ${r}${s}
    </div>`}icon(t){const i=ei(t,this.badgeStyle);return i?p`<span class="icon" aria-hidden="true"><ha-icon .icon=${i}></ha-icon></span>`:h}miniRing(t){const{circumference:i,fillDash:r}=ne(t.soc,null,null,rt),s=k/2;return p`<svg
      class="mini"
      viewBox="0 0 ${k} ${k}"
      width=${k}
      height=${k}
      aria-hidden="true"
    >
      ${D`<circle class="track" cx=${s} cy=${s} r=${rt}></circle>
        ${r>0?D`<circle
                class="fill"
                cx=${s}
                cy=${s}
                r=${rt}
                stroke-dasharray=${`${r} ${i}`}
                transform=${`rotate(-90 ${s} ${s})`}
              ></circle>`:h}`}
    </svg>`}open(){const t=this.battery.socEntity;t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:true,composed:true}))}key(t){t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),this.open())}};_t.styles=X`
    :host {
      display: inline-block;
      --tone: var(--secondary-text-color);
    }
    .tone-charge {
      --tone: var(--success-color);
    }
    .tone-discharge {
      --tone: var(--warning-color);
    }
    .tone-low {
      --tone: var(--error-color);
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 14px 0 4px;
      box-sizing: border-box;
      border-radius: 18px;
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .pill:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }
    .icon ha-icon {
      --mdc-icon-size: 18px;
      color: var(--tone);
      display: flex;
    }
    .mini {
      flex: none;
      display: block;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: ${be};
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke: var(--tone);
      stroke-linecap: round;
    }
    .one {
      font-weight: 500;
    }
    .two {
      display: flex;
      flex-direction: column;
    }
    .two small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 13px;
    }
    .two span {
      font-weight: 500;
    }
  `;let lt=_t;const vt=class vt2 extends _{constructor(){super(...arguments),this.config={}}setConfig(t){this.config=t}render(){const t=L(),i={style:[t.editor.style,void 0],entry_id:[t.editor.entryId,t.editor.entryIdHint],charge_to:[t.editor.chargeTo,t.editor.chargeToHint],discharge_to:[t.editor.dischargeTo,t.editor.dischargeToHint]},r={style:te(this.config.style),entry_id:this.config.entry_id??"",charge_to:this.config.charge_to===void 0?"":String(this.config.charge_to),discharge_to:this.config.discharge_to===void 0?"":String(this.config.discharge_to)};return p`<p class="description">${t.badge.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${li(t)}
        .computeLabel=${s=>i[s.name][0]}
        .computeHelper=${s=>i[s.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`}changed(t){t.stopPropagation();const i=he(this.config,t.detail.value,gi);this.config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:true,composed:true}))}};vt.styles=X`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;let R=vt;ye([tt()],R.prototype,"config");ye([tt()],R.prototype,"hass");customElements.get(Y)||customElements.define(Y,lt);customElements.get(ct)||customElements.define(ct,R);const jt=window.customBadges??=[];if(!jt.some(e=>e.type===Y)){const e=L();jt.push({type:Y,name:e.badge.name,description:e.badge.description,preview:true})}var Ni=Object.defineProperty,_e=(e,t,i,r)=>{for(var s=void 0,n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=o(t,i,s)||s);return s&&Ni(t,i,s),s};const Z="inverter-analytics-battery-time",ht="inverter-analytics-battery-time-editor",y=120,W=10,M=(y-W)/2;let Di=0;function Bt(e){return Math.min(100,Math.max(0,e))}const xt=class xt2 extends _{constructor(){super(...arguments),this.battery=new $e(this),this.layout="ring",this.gradientId=`ia-battery-fill-${++Di}`}static getConfigElement(){return document.createElement(ht)}static getStubConfig(){return{charge_to:100}}setConfig(t){this.layout=Qt(t.layout),this.battery.setConfig(t)}getCardSize(){return ri(this.layout)}getGridOptions(){return ii(this.layout)}set hass(t){this.battery.setHass(t)}get hass(){return this.battery.hass}render(){const t=this.battery.view(),i=this.layout==="bar"?this.bar(t):this.layout==="tile"?this.tile(t):this.ring(t);return p`<ha-card class="tone-${t.tone} ${this.layout}">
      <div class="body">${i}${this.note(t)}</div>
    </ha-card>`}note(t){return t.note?p`<div class="note" title=${t.note}>${t.note}</div>`:h}pill(t){const i=ae(t);return i?p`<span class="pill" aria-hidden="true">
      ${i.icon?p`<ha-icon .icon=${i.icon}></ha-icon>`:h}${i.text}
    </span>`:h}ring(t){const{circumference:i,fillDash:r,ticks:s}=ne(t.soc,t.chargeTo,t.dischargeTo,M),n=y/2,o=(a,u)=>{const d=a*Math.PI/180,l=M-W/2,g=M+W/2;return D`<line
        class="tick ${u}"
        x1=${n+l*Math.sin(d)}
        y1=${n-l*Math.cos(d)}
        x2=${n+g*Math.sin(d)}
        y2=${n-g*Math.cos(d)}
      ></line>`},c=t.eta?oe(t):null;return p`<div class="ring-box">
        <svg
          class="ring"
          viewBox="0 0 ${y} ${y}"
          width=${y}
          height=${y}
          role="img"
          aria-label=${nt(t)}
        >
          ${D`<defs>
              <linearGradient id=${this.gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop class="stop-tone" offset="0"></stop>
                <stop class="stop-light" offset="1"></stop>
              </linearGradient>
            </defs>
            <circle class="track" cx=${n} cy=${n} r=${M}></circle>
            ${r>0?D`<circle
                    class="fill"
                    cx=${n}
                    cy=${n}
                    r=${M}
                    stroke=${`url(#${this.gradientId})`}
                    stroke-dasharray=${`${r} ${i}`}
                    transform=${`rotate(-90 ${n} ${n})`}
                  ></circle>`:h}
            ${s.map(a=>o(a.at,a.kind))}`}
        </svg>
        <div class="centre" aria-hidden="true">
          <div class="soc">${V(t.soc,t.locale)}</div>
          <div class="word"><span class="dot"></span>${t.word}</div>
        </div>
      </div>
      ${t.eta?p`<div class="time" aria-hidden="true">${t.eta.duration}</div>`:p`<div class="time status-big" aria-hidden="true">${t.status}</div>`}
      ${c?p`<div class="sub" aria-hidden="true">${c}</div>`:h} ${this.pill(t)}`}bar(t){const i=t.soc===null?0:Bt(t.soc),r=Ut(t),s=n=>`left: calc(3px + (100% - 6px) * ${n/100})`;return p`<div class="top" aria-hidden="true">
        <span class="time">${t.eta?t.eta.duration:t.word}</span>${this.pill(t)}
      </div>
      <div class="status" aria-hidden="true">${ni(t)}</div>
      <div class="battery" role="img" aria-label=${nt(t)}>
        <div class="level" style="width: calc((100% - 6px) * ${i/100})"></div>
        ${r.map(n=>p`<div class="mark ${n.kind}" style=${s(n.at)}></div>`)}
        <div class="level-text">${V(t.soc,t.locale)}</div>
      </div>
      <div class="scale" aria-hidden="true">
        ${r.map(n=>p`<span class="${n.kind} ${n.anchor}" style=${s(n.at)}>${n.label}</span>`)}
      </div>`}tile(t){const i=t.soc===null?0:Bt(t.soc),r=oi(t),s=r.power?p`${r.icon?p`<ha-icon class="arrow" .icon=${r.icon}></ha-icon>`:h}${r.power}`:h;return p`<div class="row">
        <div class="icon">
          <ha-icon .icon=${ee(t.soc,t.tone==="charge")}></ha-icon>
        </div>
        <div class="lines">
          <div class="primary">${ai(t)}</div>
          <div class="secondary">
            ${r.text??h}${r.text&&r.power?" \xB7 ":h}${s}
          </div>
        </div>
      </div>
      <div class="thin" aria-hidden="true">
        <i style="width: ${i}%"></i>
        ${Ut(t).map(n=>p`<b class=${n.kind} style="left: ${n.at}%"></b>`)}
      </div>`}};xt.styles=X`
    :host {
      display: block;
      height: 100%;
    }
    ha-card {
      height: 100%;
      box-sizing: border-box;
      --tone: var(--secondary-text-color);
    }
    .tone-charge {
      --tone: var(--success-color);
    }
    .tone-discharge {
      --tone: var(--warning-color);
    }
    .tone-low {
      --tone: var(--error-color);
    }
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      padding: 16px;
      color: var(--primary-text-color);
      container-type: inline-size;
    }
    .note {
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    /* The ring has room for a third line of note. */
    .ring .note {
      -webkit-line-clamp: 3;
    }
    /* The bar's and the tile's height budgets hold two smaller lines of
       note: 4 + 2 × 14 px fits what each has left inside ha-card's border. */
    .bar .note,
    .tile .note {
      font-size: 12px;
      line-height: 14px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 28px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 14px;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 15%, transparent);
      color: var(--primary-text-color);
      font-size: 14px;
      white-space: nowrap;
    }
    .pill ha-icon {
      --mdc-icon-size: 16px;
      color: var(--tone);
    }

    /* ring */
    .ring .body {
      align-items: center;
      text-align: center;
    }
    .ring-box {
      position: relative;
      width: ${y}px;
      height: ${y}px;
      margin-bottom: 8px;
    }
    svg.ring {
      display: block;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: ${W};
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke-linecap: round;
    }
    .stop-tone {
      stop-color: var(--tone);
    }
    .stop-light {
      stop-color: var(--tone);
      stop-color: color-mix(in srgb, var(--tone), white 40%);
    }
    .tick {
      stroke: var(--primary-text-color);
      stroke-width: 2.5;
    }
    .tick.discharge {
      opacity: 0.5;
    }
    .centre {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .soc {
      font-size: 34px;
      font-weight: 500;
      line-height: 1;
    }
    .word {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
      max-width: 100px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 14px;
      white-space: nowrap;
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--tone);
    }
    .ring .time {
      font-size: 26px;
      font-weight: 500;
      line-height: 30px;
    }
    .ring .time.status-big {
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      padding: 5px 0;
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
    }
    .ring .pill {
      margin-top: 8px;
    }

    /* bar */
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 32px;
    }
    .bar .time {
      min-width: 0;
      font-size: 28px;
      font-weight: 500;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar .pill {
      flex: none;
    }
    /* Half a section (6 of 12 columns) is about 245 px: the time and the
       pill share one 32 px row there. */
    @container (max-width: 260px) {
      .bar .time {
        font-size: 20px;
      }
      .bar .pill {
        gap: 2px;
        padding: 0 8px;
      }
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .battery {
      position: relative;
      height: 40px;
      box-sizing: border-box;
      margin: 10px 10px 0 0;
      border: 2px solid var(--secondary-text-color);
      border-color: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
      border-radius: 10px;
    }
    .battery::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 10px;
      width: 6px;
      height: 16px;
      border-radius: 0 3px 3px 0;
      background: var(--secondary-text-color);
      background: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
    }
    .level {
      position: absolute;
      left: 3px;
      top: 3px;
      bottom: 3px;
      border-radius: 6px;
      background: var(--tone);
      background: linear-gradient(90deg, var(--tone), color-mix(in srgb, var(--tone), white 40%));
    }
    .mark {
      position: absolute;
      top: -6px;
      bottom: -6px;
      width: 2px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .mark.discharge,
    .scale .discharge {
      opacity: 0.5;
    }
    .level-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      text-shadow: 0 0 3px var(--card-background-color, transparent);
    }
    .scale {
      position: relative;
      height: 16px;
      margin-right: 10px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 16px;
    }
    .scale span {
      position: absolute;
      top: 2px;
      white-space: nowrap;
      transform: translateX(-50%);
    }
    /* Near an edge the label begins or ends at its mark, inside the bar. */
    .scale span.start {
      transform: translateX(-1px);
    }
    .scale span.end {
      transform: translateX(calc(-100% + 1px));
    }

    /* tile */
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }
    .icon ha-icon {
      --mdc-icon-size: 24px;
      color: var(--tone);
    }
    .lines {
      min-width: 0;
    }
    .primary,
    .secondary {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .primary {
      font-size: 16px;
      font-weight: 500;
    }
    .secondary {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
    .secondary .arrow {
      --mdc-icon-size: 14px;
      color: var(--tone);
      vertical-align: -1px;
      margin-right: 2px;
    }
    .thin {
      position: relative;
      height: 6px;
      margin-top: 8px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .thin i {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 3px;
      background: var(--tone);
    }
    .thin b {
      position: absolute;
      top: -3px;
      width: 2px;
      height: 12px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .thin b.discharge {
      opacity: 0.5;
    }
  `;let dt=xt;const wt=class wt2 extends _{constructor(){super(...arguments),this.config={}}setConfig(t){this.config=t}render(){const t=L(),i={layout:[t.editor.layout,void 0],entry_id:[t.editor.entryId,t.editor.entryIdHint],charge_to:[t.editor.chargeTo,t.editor.chargeToHint],discharge_to:[t.editor.dischargeTo,t.editor.dischargeToHint]},r={layout:Qt(this.config.layout),entry_id:this.config.entry_id??"",charge_to:this.config.charge_to===void 0?"":String(this.config.charge_to),discharge_to:this.config.discharge_to===void 0?"":String(this.config.discharge_to)};return p`<p class="description">${t.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${ci(t)}
        .computeLabel=${s=>i[s.name][0]}
        .computeHelper=${s=>i[s.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`}changed(t){t.stopPropagation();const i=he(this.config,t.detail.value,le);this.config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:true,composed:true}))}};wt.styles=X`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;let U=wt;_e([tt()],U.prototype,"config");_e([tt()],U.prototype,"hass");customElements.get(Z)||customElements.define(Z,dt);customElements.get(ht)||customElements.define(ht,U);const Wt=window.customCards??=[];if(!Wt.some(e=>e.type===Z)){const e=L();Wt.push({type:Z,name:e.name,description:e.description,preview:true})}

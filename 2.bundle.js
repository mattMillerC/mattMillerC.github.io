(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{61:function(t,e,s){"use strict";var n=s(12),i=(s(6),s(24)),r=s(9);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function _(t,e,s,n,i){let r;i&&(r="object"==typeof s&&null!==s,r&&(n=t.__dataTemp[e]));let _=n!==s&&(n==n||s==s);return r&&_&&(t.__dataTemp[e]=s),_}const o=Object(r.a)(t=>class extends t{_shouldPropertyChange(t,e,s){return _(this,t,e,s,!0)}}),a=Object(r.a)(t=>class extends t{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(t,e,s){return _(this,t,e,s,this.mutableData)}});o._mutablePropertyChange=_;var l=s(5),h=s(13);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let d=null;function c(){return d}c.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:c,writable:!0}});const p=Object(i.a)(c),u=o(p);const m=Object(i.a)(class{});class f extends m{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=[];this.children=e;for(let t=this.root.firstChild;t;t=t.nextSibling)e.push(t),t.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let s=this.__templatizeOptions;(t&&s.instanceProps||!s.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let t in this.__hostProps)this._setPendingProperty(t,this.__dataHost["_host_"+t]);for(let e in t)this._setPendingProperty(e,t[e])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,s){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,t=>{t.model=this,s(t)});else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(t,e,s)}}_showHideChildren(t){let e=this.children;for(let s=0;s<e.length;s++){let n=e[s];if(Boolean(t)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)t?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(t)n.__polymerReplaced__=document.createComment("hidden-slot"),Object(h.a)(Object(h.a)(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const t=n.__polymerReplaced__;t&&Object(h.a)(Object(h.a)(t).parentNode).replaceChild(n,t)}else n.style&&(t?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=t,n._showHideChildren&&n._showHideChildren(t)}}_setUnmanagedPropertyToNode(t,e,s){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&"textContent"==e?t.__polymerTextContent__=s:super._setUnmanagedPropertyToNode(t,e,s)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do{t=t.__dataHost.__dataHost}while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}f.prototype.__dataHost,f.prototype.__templatizeOptions,f.prototype._methodHost,f.prototype.__templatizeOwner,f.prototype.__hostProps;const y=o(f);function b(t){let e=t.__dataHost;return e&&e._methodHost||e}function P(t,e,s){let n=s.mutableData?y:f;T.mixin&&(n=T.mixin(n));let i=class extends n{};return i.prototype.__templatizeOptions=s,i.prototype._bindTemplate(t),function(t,e,s,n){let i=s.hostProps||{};for(let e in n.instanceProps){delete i[e];let s=n.notifyInstanceProp;s&&t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:w(e,s)})}if(n.forwardHostProp&&e.__dataHost)for(let e in i)s.hasHostProps||(s.hasHostProps=!0),t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(t,e,s){t.__dataHost._setPendingPropertyOrPath("_host_"+e,s[e],!0,!0)}})}(i,t,e,s),i}function C(t,e,s){let n=s.forwardHostProp;if(n&&e.hasHostProps){let i=e.templatizeTemplateClass;if(!i){let t=s.mutableData?u:p;i=e.templatizeTemplateClass=class extends t{};let r=e.hostProps;for(let t in r)i.prototype._addPropertyEffect("_host_"+t,i.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:g(t,n)}),i.prototype._createNotifyingProperty("_host_"+t)}!function(t,e){d=t,Object.setPrototypeOf(t,e.prototype),new e,d=null}(t,i),t.__dataProto&&Object.assign(t.__data,t.__dataProto),t.__dataTemp={},t.__dataPending=null,t.__dataOld=null,t._enableProperties()}}function g(t,e){return function(t,s,n){e.call(t.__templatizeOwner,s.substring("_host_".length),n[s])}}function w(t,e){return function(t,s,n){e.call(t.__templatizeOwner,t,s,n[s])}}function T(t,e,s){if(l.e&&!b(t))throw new Error("strictTemplatePolicy: template owner not trusted");if(s=s||{},t.__templatizeOwner)throw new Error("A <template> can only be templatized once");t.__templatizeOwner=e;let n=(e?e.constructor:f)._parseTemplate(t),i=n.templatizeInstanceClass;i||(i=P(t,n,s),n.templatizeInstanceClass=i),C(t,n,s);let r=class extends i{};return r.prototype._methodHost=b(t),r.prototype.__dataHost=t,r.prototype.__templatizeOwner=e,r.prototype.__hostProps=n.hostProps,r=r,r}var O=s(23);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class x{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,v.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),v.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,s){return t instanceof x?t._cancelAsync():t=new x,t.setConfig(e,s),t}}let v=new Set;const H=function(){const t=Boolean(v.size);return v.forEach(t=>{try{t.flush()}catch(t){setTimeout(()=>{throw t})}}),t};var I=s(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let E=!1;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const F=a(n.a);class A extends F{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t)}connectedCallback(){if(super.connectedCallback(),function(){if(l.b&&!l.g){if(!E){E=!0;const t=document.createElement("style");t.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(t)}return!0}return!1}()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let t=Object(h.a)(Object(h.a)(this).parentNode);for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t)}}__ensureTemplatized(){if(!this.__ctor){let t=this.template=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}let e={};e[this.as]=!0,e[this.indexAs]=!0,e[this.itemsIndexAs]=!0,this.__ctor=T(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:e,forwardHostProp:function(t,e){let s=this.__instances;for(let n,i=0;i<s.length&&(n=s[i]);i++)n.forwardHostProp(t,e)},notifyInstanceProp:function(t,e,s){if(Object(I.e)(this.as,e)){let n=t[this.itemsIndexAs];e==this.as&&(this.items[n]=s);let i=Object(I.i)(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,e);this.notifyPath(i,s)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if("string"==typeof t){let e=t,s=this.__getMethodHost();return function(){return s[e].apply(s,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let t=performance.now(),e=this._targetFrameTime/(t-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*e)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=t,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn)if(t){if(this.__observePaths){let e=this.__observePaths;for(let s=0;s<e.length;s++)0===t.indexOf(e[s])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(t,e=0){var s;this.__renderDebouncer=x.debounce(this.__renderDebouncer,e>0?O.b.after(e):O.a,t.bind(this)),s=this.__renderDebouncer,v.add(s)}render(){this.__debounceRender(this.__render),function(){let t,e;do{t=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),e=H()}while(t||e)}()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let t=this.items||[],e=new Array(t.length);for(let s=0;s<t.length;s++)e[s]=s;this.__filterFn&&(e=e.filter((e,s,n)=>this.__filterFn(t[e],s,n))),this.__sortFn&&e.sort((e,s)=>this.__sortFn(t[e],t[s]));const s=this.__itemsIdxToInstIdx={};let n=0;const i=Math.min(e.length,this.__limit);for(;n<i;n++){let i=this.__instances[n],r=e[n],_=t[r];s[r]=n,i?(i._setPendingProperty(this.as,_),i._setPendingProperty(this.indexAs,n),i._setPendingProperty(this.itemsIndexAs,r),i._flushProperties()):this.__insertInstance(_,n,r)}for(let t=this.__instances.length-1;t>=n;t--)this.__detachAndRemoveInstance(t)}__detachInstance(t){let e=this.__instances[t];const s=Object(h.a)(e.root);for(let t=0;t<e.children.length;t++){let n=e.children[t];s.appendChild(n)}return e}__attachInstance(t,e){let s=this.__instances[t];e.insertBefore(s.root,this)}__detachAndRemoveInstance(t){let e=this.__detachInstance(t);e&&this.__pool.push(e),this.__instances.splice(t,1)}__stampInstance(t,e,s){let n={};return n[this.as]=t,n[this.indexAs]=e,n[this.itemsIndexAs]=s,new this.__ctor(n)}__insertInstance(t,e,s){let n=this.__pool.pop();n?(n._setPendingProperty(this.as,t),n._setPendingProperty(this.indexAs,e),n._setPendingProperty(this.itemsIndexAs,s),n._flushProperties()):n=this.__stampInstance(t,e,s);let i=this.__instances[e+1],r=i?i.children[0]:this;return Object(h.a)(Object(h.a)(this).parentNode).insertBefore(n.root,r),this.__instances[e]=n,n}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let s=t.slice(6),n=s.indexOf("."),i=n<0?s:s.substring(0,n);if(i==parseInt(i,10)){let t=n<0?"":s.substring(n+1);this.__handleObservedPaths(t);let r=this.__itemsIdxToInstIdx[i],_=this.__instances[r];if(_){let s=this.as+(t?"."+t:"");_._setPendingPropertyOrPath(s,e,!1,!0),_._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return function(t,e){let s;for(;e;)if(s=e.__templatizeInstance){if(s.__dataHost==t)return s;e=s.__dataHost}else e=Object(h.a)(e).parentNode;return null}(this.template,t)}}customElements.define(A.is,A)}}]);
//# sourceMappingURL=2.bundle.js.map
/* Zepto 1.1.4 - zepto event data ajax form ie detect fx fx_methods data deferred callbacks selector - zeptojs.com/license */
var Zepto=function(){function a(a){return null==a?String(a):W[X.call(a)]||"object"}function b(b){return"function"==a(b)}function c(a){return null!=a&&a==a.window}function d(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function e(b){return"object"==a(b)}function f(a){return e(a)&&!c(a)&&Object.getPrototypeOf(a)==Object.prototype}function g(a){return"number"==typeof a.length}function h(a){return E.call(a,function(a){return null!=a})}function i(a){return a.length>0?y.fn.concat.apply([],a):a}function j(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function k(a){return a in I?I[a]:I[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function l(a,b){return"number"!=typeof b||J[j(a)]?b:b+"px"}function m(a){var b,c;return H[a]||(b=G.createElement(a),G.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),H[a]=c),H[a]}function n(a){return"children"in a?F.call(a.children):y.map(a.childNodes,function(a){return 1==a.nodeType?a:void 0})}function o(a,b){var c,d=a?a.length:0;for(c=0;d>c;c++)this[c]=a[c];this.length=d,this.selector=b||""}function p(a,b,c){for(x in b)c&&(f(b[x])||_(b[x]))?(f(b[x])&&!f(a[x])&&(a[x]={}),_(b[x])&&!_(a[x])&&(a[x]=[]),p(a[x],b[x],c)):b[x]!==w&&(a[x]=b[x])}function q(a,b){return null==b?y(a):y(a).filter(b)}function r(a,c,d,e){return b(c)?c.call(a,d,e):c}function s(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function t(a,b){var c=a.className||"",d=c&&c.baseVal!==w;return b===w?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)}function u(a){try{return a?"true"==a||("false"==a?!1:"null"==a?null:+a+""==a?+a:/^[\[\{]/.test(a)?y.parseJSON(a):a):a}catch(b){return a}}function v(a,b){b(a);for(var c=0,d=a.childNodes.length;d>c;c++)v(a.childNodes[c],b)}var w,x,y,z,A,B,C=[],D=C.concat,E=C.filter,F=C.slice,G=window.document,H={},I={},J={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},K=/^\s*<(\w+|!)[^>]*>/,L=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,M=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,N=/^(?:body|html)$/i,O=/([A-Z])/g,P=["val","css","html","text","data","width","height","offset"],Q=["after","prepend","before","append"],R=G.createElement("table"),S=G.createElement("tr"),T={tr:G.createElement("tbody"),tbody:R,thead:R,tfoot:R,td:S,th:S,"*":G.createElement("div")},U=/complete|loaded|interactive/,V=/^[\w-]*$/,W={},X=W.toString,Y={},Z=G.createElement("div"),$={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},_=Array.isArray||function(a){return a instanceof Array};return Y.matches=function(a,b){if(!b||!a||1!==a.nodeType)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=Z).appendChild(a),d=~Y.qsa(e,b).indexOf(a),f&&Z.removeChild(a),d},A=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},B=function(a){return E.call(a,function(b,c){return a.indexOf(b)==c})},Y.fragment=function(a,b,c){var d,e,g;return L.test(a)&&(d=y(G.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(M,"<$1></$2>")),b===w&&(b=K.test(a)&&RegExp.$1),b in T||(b="*"),g=T[b],g.innerHTML=""+a,d=y.each(F.call(g.childNodes),function(){g.removeChild(this)})),f(c)&&(e=y(d),y.each(c,function(a,b){P.indexOf(a)>-1?e[a](b):e.attr(a,b)})),d},Y.Z=function(a,b){return new o(a,b)},Y.isZ=function(a){return a instanceof Y.Z},Y.init=function(a,c){var d;if(!a)return Y.Z();if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&K.test(a))d=Y.fragment(a,RegExp.$1,c),a=null;else{if(c!==w)return y(c).find(a);d=Y.qsa(G,a)}else{if(b(a))return y(G).ready(a);if(Y.isZ(a))return a;if(_(a))d=h(a);else if(e(a))d=[a],a=null;else if(K.test(a))d=Y.fragment(a.trim(),RegExp.$1,c),a=null;else{if(c!==w)return y(c).find(a);d=Y.qsa(G,a)}}return Y.Z(d,a)},y=function(a,b){return Y.init(a,b)},y.extend=function(a){var b,c=F.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){p(a,c,b)}),a},Y.qsa=function(a,b){var c,d="#"==b[0],e=!d&&"."==b[0],f=d||e?b.slice(1):b,g=V.test(f);return a.getElementById&&g&&d?(c=a.getElementById(f))?[c]:[]:1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType?[]:F.call(g&&!d&&a.getElementsByClassName?e?a.getElementsByClassName(f):a.getElementsByTagName(b):a.querySelectorAll(b))},y.contains=G.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},y.type=a,y.isFunction=b,y.isWindow=c,y.isArray=_,y.isPlainObject=f,y.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},y.inArray=function(a,b,c){return C.indexOf.call(b,a,c)},y.camelCase=A,y.trim=function(a){return null==a?"":String.prototype.trim.call(a)},y.uuid=0,y.support={},y.expr={},y.noop=function(){},y.map=function(a,b){var c,d,e,f=[];if(g(a))for(d=0;d<a.length;d++)c=b(a[d],d),null!=c&&f.push(c);else for(e in a)c=b(a[e],e),null!=c&&f.push(c);return i(f)},y.each=function(a,b){var c,d;if(g(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},y.grep=function(a,b){return E.call(a,b)},window.JSON&&(y.parseJSON=JSON.parse),y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){W["[object "+b+"]"]=b.toLowerCase()}),y.fn={constructor:Y.Z,length:0,forEach:C.forEach,reduce:C.reduce,push:C.push,sort:C.sort,splice:C.splice,indexOf:C.indexOf,concat:function(){var a,b,c=[];for(a=0;a<arguments.length;a++)b=arguments[a],c[a]=Y.isZ(b)?b.toArray():b;return D.apply(Y.isZ(this)?this.toArray():this,c)},map:function(a){return y(y.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return y(F.apply(this,arguments))},ready:function(a){return U.test(G.readyState)&&G.body?a(y):G.addEventListener("DOMContentLoaded",function(){a(y)},!1),this},get:function(a){return a===w?F.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return C.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return b(a)?this.not(this.not(a)):y(E.call(this,function(b){return Y.matches(b,a)}))},add:function(a,b){return y(B(this.concat(y(a,b))))},is:function(a){return this.length>0&&Y.matches(this[0],a)},not:function(a){var c=[];if(b(a)&&a.call!==w)this.each(function(b){a.call(this,b)||c.push(this)});else{var d="string"==typeof a?this.filter(a):g(a)&&b(a.item)?F.call(a):y(a);this.forEach(function(a){d.indexOf(a)<0&&c.push(a)})}return y(c)},has:function(a){return this.filter(function(){return e(a)?y.contains(this,a):y(this).find(a).size()})},eq:function(a){return-1===a?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!e(a)?a:y(a)},last:function(){var a=this[this.length-1];return a&&!e(a)?a:y(a)},find:function(a){var b,c=this;return b=a?"object"==typeof a?y(a).filter(function(){var a=this;return C.some.call(c,function(b){return y.contains(b,a)})}):1==this.length?y(Y.qsa(this[0],a)):this.map(function(){return Y.qsa(this,a)}):y()},closest:function(a,b){var c=this[0],e=!1;for("object"==typeof a&&(e=y(a));c&&!(e?e.indexOf(c)>=0:Y.matches(c,a));)c=c!==b&&!d(c)&&c.parentNode;return y(c)},parents:function(a){for(var b=[],c=this;c.length>0;)c=y.map(c,function(a){return(a=a.parentNode)&&!d(a)&&b.indexOf(a)<0?(b.push(a),a):void 0});return q(b,a)},parent:function(a){return q(B(this.pluck("parentNode")),a)},children:function(a){return q(this.map(function(){return n(this)}),a)},contents:function(){return this.map(function(){return this.contentDocument||F.call(this.childNodes)})},siblings:function(a){return q(this.map(function(a,b){return E.call(n(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return y.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=m(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var c=b(a);if(this[0]&&!c)var d=y(a).get(0),e=d.parentNode||this.length>1;return this.each(function(b){y(this).wrapAll(c?a.call(this,b):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){y(this[0]).before(a=y(a));for(var b;(b=a.children()).length;)a=b.first();y(a).append(this)}return this},wrapInner:function(a){var c=b(a);return this.each(function(b){var d=y(this),e=d.contents(),f=c?a.call(this,b):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){y(this).replaceWith(y(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=y(this);(a===w?"none"==b.css("display"):a)?b.show():b.hide()})},prev:function(a){return y(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return y(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var c=this.innerHTML;y(this).empty().append(r(this,a,b,c))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=r(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this[0].textContent:null},attr:function(a,b){var c;return"string"!=typeof a||1 in arguments?this.each(function(c){if(1===this.nodeType)if(e(a))for(x in a)s(this,x,a[x]);else s(this,a,r(this,b,c,this.getAttribute(a)))}):this.length&&1===this[0].nodeType?!(c=this[0].getAttribute(a))&&a in this[0]?this[0][a]:c:w},removeAttr:function(a){return this.each(function(){1===this.nodeType&&a.split(" ").forEach(function(a){s(this,a)},this)})},prop:function(a,b){return a=$[a]||a,1 in arguments?this.each(function(c){this[a]=r(this,b,c,this[a])}):this[0]&&this[0][a]},data:function(a,b){var c="data-"+a.replace(O,"-$1").toLowerCase(),d=1 in arguments?this.attr(c,b):this.attr(c);return null!==d?u(d):w},val:function(a){return 0 in arguments?this.each(function(b){this.value=r(this,a,b,this.value)}):this[0]&&(this[0].multiple?y(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(a){if(a)return this.each(function(b){var c=y(this),d=r(this,a,b,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};"static"==c.css("position")&&(f.position="relative"),c.css(f)});if(!this.length)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(b,c){if(arguments.length<2){var d,e=this[0];if(!e)return;if(d=getComputedStyle(e,""),"string"==typeof b)return e.style[A(b)]||d.getPropertyValue(b);if(_(b)){var f={};return y.each(b,function(a,b){f[b]=e.style[A(b)]||d.getPropertyValue(b)}),f}}var g="";if("string"==a(b))c||0===c?g=j(b)+":"+l(b,c):this.each(function(){this.style.removeProperty(j(b))});else for(x in b)b[x]||0===b[x]?g+=j(x)+":"+l(x,b[x])+";":this.each(function(){this.style.removeProperty(j(x))});return this.each(function(){this.style.cssText+=";"+g})},index:function(a){return a?this.indexOf(y(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?C.some.call(this,function(a){return this.test(t(a))},k(a)):!1},addClass:function(a){return a?this.each(function(b){if("className"in this){z=[];var c=t(this),d=r(this,a,b,c);d.split(/\s+/g).forEach(function(a){y(this).hasClass(a)||z.push(a)},this),z.length&&t(this,c+(c?" ":"")+z.join(" "))}}):this},removeClass:function(a){return this.each(function(b){if("className"in this){if(a===w)return t(this,"");z=t(this),r(this,a,b,z).split(/\s+/g).forEach(function(a){z=z.replace(k(a)," ")}),t(this,z.trim())}})},toggleClass:function(a,b){return a?this.each(function(c){var d=y(this),e=r(this,a,c,t(this));e.split(/\s+/g).forEach(function(a){(b===w?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})}):this},scrollTop:function(a){if(this.length){var b="scrollTop"in this[0];return a===w?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function(){this.scrollTop=a}:function(){this.scrollTo(this.scrollX,a)})}},scrollLeft:function(a){if(this.length){var b="scrollLeft"in this[0];return a===w?b?this[0].scrollLeft:this[0].pageXOffset:this.each(b?function(){this.scrollLeft=a}:function(){this.scrollTo(a,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),c=this.offset(),d=N.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(y(a).css("margin-top"))||0,c.left-=parseFloat(y(a).css("margin-left"))||0,d.top+=parseFloat(y(b[0]).css("border-top-width"))||0,d.left+=parseFloat(y(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||G.body;a&&!N.test(a.nodeName)&&"static"==y(a).css("position");)a=a.offsetParent;return a})}},y.fn.detach=y.fn.remove,["width","height"].forEach(function(a){var b=a.replace(/./,function(a){return a[0].toUpperCase()});y.fn[a]=function(e){var f,g=this[0];return e===w?c(g)?g["inner"+b]:d(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b){g=y(this),g.css(a,r(this,e,b,g[a]()))})}}),Q.forEach(function(b,c){var d=c%2;y.fn[b]=function(){var b,e,f=y.map(arguments,function(c){return b=a(c),"object"==b||"array"==b||null==c?c:Y.fragment(c)}),g=this.length>1;return f.length<1?this:this.each(function(a,b){e=d?b:b.parentNode,b=0==c?b.nextSibling:1==c?b.firstChild:2==c?b:null;var h=y.contains(G.documentElement,e);f.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!e)return y(a).remove();e.insertBefore(a,b),h&&v(a,function(a){null==a.nodeName||"SCRIPT"!==a.nodeName.toUpperCase()||a.type&&"text/javascript"!==a.type||a.src||window.eval.call(window,a.innerHTML)})})})},y.fn[d?b+"To":"insert"+(c?"Before":"After")]=function(a){return y(a)[b](this),this}}),Y.Z.prototype=o.prototype=y.fn,Y.uniq=B,Y.deserializeValue=u,y.zepto=Y,y}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(a){function b(a){return a._zid||(a._zid=m++)}function c(a,c,f,g){if(c=d(c),c.ns)var h=e(c.ns);return(q[b(a)]||[]).filter(function(a){return!(!a||c.e&&a.e!=c.e||c.ns&&!h.test(a.ns)||f&&b(a.fn)!==b(f)||g&&a.sel!=g)})}function d(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function e(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function f(a,b){return a.del&&!s&&a.e in t||!!b}function g(a){return u[a]||s&&t[a]||a}function h(c,e,h,i,k,m,n){var o=b(c),p=q[o]||(q[o]=[]);e.split(/\s/).forEach(function(b){if("ready"==b)return a(document).ready(h);var e=d(b);e.fn=h,e.sel=k,e.e in u&&(h=function(b){var c=b.relatedTarget;return!c||c!==this&&!a.contains(this,c)?e.fn.apply(this,arguments):void 0}),e.del=m;var o=m||h;e.proxy=function(a){if(a=j(a),!a.isImmediatePropagationStopped()){a.data=i;var b=o.apply(c,a._args==l?[a]:[a].concat(a._args));return b===!1&&(a.preventDefault(),a.stopPropagation()),b}},e.i=p.length,p.push(e),"addEventListener"in c&&c.addEventListener(g(e.e),e.proxy,f(e,n))})}function i(a,d,e,h,i){var j=b(a);(d||"").split(/\s/).forEach(function(b){c(a,b,e,h).forEach(function(b){delete q[j][b.i],"removeEventListener"in a&&a.removeEventListener(g(b.e),b.proxy,f(b,i))})})}function j(b,c){return(c||!b.isDefaultPrevented)&&(c||(c=b),a.each(y,function(a,d){var e=c[a];b[a]=function(){return this[d]=v,e&&e.apply(c,arguments)},b[d]=w}),(c.defaultPrevented!==l?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(b.isDefaultPrevented=v)),b}function k(a){var b,c={originalEvent:a};for(b in a)x.test(b)||a[b]===l||(c[b]=a[b]);return j(c,a)}var l,m=1,n=Array.prototype.slice,o=a.isFunction,p=function(a){return"string"==typeof a},q={},r={},s="onfocusin"in window,t={focus:"focusin",blur:"focusout"},u={mouseenter:"mouseover",mouseleave:"mouseout"};r.click=r.mousedown=r.mouseup=r.mousemove="MouseEvents",a.event={add:h,remove:i},a.proxy=function(c,d){var e=2 in arguments&&n.call(arguments,2);if(o(c)){var f=function(){return c.apply(d,e?e.concat(n.call(arguments)):arguments)};return f._zid=b(c),f}if(p(d))return e?(e.unshift(c[d],c),a.proxy.apply(null,e)):a.proxy(c[d],c);throw new TypeError("expected function")},a.fn.bind=function(a,b,c){return this.on(a,b,c)},a.fn.unbind=function(a,b){return this.off(a,b)},a.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var v=function(){return!0},w=function(){return!1},x=/^([A-Z]|returnValue$|layer[XY]$)/,y={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(a,b,c){return this.on(b,a,c)},a.fn.undelegate=function(a,b,c){return this.off(b,a,c)},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d,e,f){var g,j,m=this;return b&&!p(b)?(a.each(b,function(a,b){m.on(a,c,d,b,f)}),m):(p(c)||o(e)||e===!1||(e=d,d=c,c=l),(e===l||d===!1)&&(e=d,d=l),e===!1&&(e=w),m.each(function(l,m){f&&(g=function(a){return i(m,a.type,e),e.apply(this,arguments)}),c&&(j=function(b){var d,f=a(b.target).closest(c,m).get(0);return f&&f!==m?(d=a.extend(k(b),{currentTarget:f,liveFired:m}),(g||e).apply(f,[d].concat(n.call(arguments,1)))):void 0}),h(m,b,e,d,c,j||g)}))},a.fn.off=function(b,c,d){var e=this;return b&&!p(b)?(a.each(b,function(a,b){e.off(a,c,b)}),e):(p(c)||o(d)||d===!1||(d=c,c=l),d===!1&&(d=w),e.each(function(){i(this,b,d,c)}))},a.fn.trigger=function(b,c){return b=p(b)||a.isPlainObject(b)?a.Event(b):j(b),b._args=c,this.each(function(){b.type in t&&"function"==typeof this[b.type]?this[b.type]():"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)})},a.fn.triggerHandler=function(b,d){var e,f;return this.each(function(g,h){e=k(p(b)?a.Event(b):b),e._args=d,e.target=h,a.each(c(h,b.type||b),function(a,b){return f=b.proxy(e),e.isImmediatePropagationStopped()?!1:void 0})}),f},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return 0 in arguments?this.bind(b,a):this.trigger(b)}}),a.Event=function(a,b){p(a)||(b=a,a=b.type);var c=document.createEvent(r[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),j(c)}}(Zepto),function(a){function b(b,d){var i=b[h],j=i&&e[i];if(void 0===d)return j||c(b);if(j){if(d in j)return j[d];var k=g(d);if(k in j)return j[k]}return f.call(a(b),d)}function c(b,c,f){var i=b[h]||(b[h]=++a.uuid),j=e[i]||(e[i]=d(b));return void 0!==c&&(j[g(c)]=f),j}function d(b){var c={};return a.each(b.attributes||i,function(b,d){0==d.name.indexOf("data-")&&(c[g(d.name.replace("data-",""))]=a.zepto.deserializeValue(d.value))}),c}var e={},f=a.fn.data,g=a.camelCase,h=a.expando="Zepto"+ +new Date,i=[];a.fn.data=function(d,e){return void 0===e?a.isPlainObject(d)?this.each(function(b,e){a.each(d,function(a,b){c(e,a,b)})}):0 in this?b(this[0],d):void 0:this.each(function(){c(this,d,e)})},a.fn.removeData=function(b){return"string"==typeof b&&(b=b.split(/\s+/)),this.each(function(){var c=this[h],d=c&&e[c];d&&a.each(b||d,function(a){delete d[b?g(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(Zepto),function(a){function b(b,c,d){var e=a.Event(c);return a(b).trigger(e,d),!e.isDefaultPrevented()}function c(a,c,d,e){return a.global?b(c||s,d,e):void 0}function d(b){b.global&&0===a.active++&&c(b,null,"ajaxStart")}function e(b){b.global&&!--a.active&&c(b,null,"ajaxStop")}function f(a,b){var d=b.context;return b.beforeSend.call(d,a,b)===!1||c(b,d,"ajaxBeforeSend",[a,b])===!1?!1:void c(b,d,"ajaxSend",[a,b])}function g(a,b,d,e){var f=d.context,g="success";d.success.call(f,a,g,b),e&&e.resolveWith(f,[a,g,b]),c(d,f,"ajaxSuccess",[b,d,a]),i(g,b,d)}function h(a,b,d,e,f){var g=e.context;e.error.call(g,d,b,a),f&&f.rejectWith(g,[d,b,a]),c(e,g,"ajaxError",[d,e,a||b]),i(b,d,e)}function i(a,b,d){var f=d.context;d.complete.call(f,b,a),c(d,f,"ajaxComplete",[b,d]),e(d)}function j(){}function k(a){return a&&(a=a.split(";",2)[0]),a&&(a==x?"html":a==w?"json":u.test(a)?"script":v.test(a)&&"xml")||"text"}function l(a,b){return""==b?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function m(b){b.processData&&b.data&&"string"!=a.type(b.data)&&(b.data=a.param(b.data,b.traditional)),!b.data||b.type&&"GET"!=b.type.toUpperCase()||(b.url=l(b.url,b.data),b.data=void 0)}function n(b,c,d,e){return a.isFunction(c)&&(e=d,d=c,c=void 0),a.isFunction(d)||(e=d,d=void 0),{url:b,data:c,success:d,dataType:e}}function o(b,c,d,e){var f,g=a.isArray(c),h=a.isPlainObject(c);a.each(c,function(c,i){f=a.type(i),e&&(c=d?e:e+"["+(h||"object"==f||"array"==f?c:"")+"]"),!e&&g?b.add(i.name,i.value):"array"==f||!d&&"object"==f?o(b,i,d,c):b.add(c,i)})}var p,q,r=0,s=window.document,t=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,u=/^(?:text|application)\/javascript/i,v=/^(?:text|application)\/xml/i,w="application/json",x="text/html",y=/^\s*$/,z=s.createElement("a");z.href=window.location.href,a.active=0,a.ajaxJSONP=function(b,c){if(!("type"in b))return a.ajax(b);var d,e,i=b.jsonpCallback,j=(a.isFunction(i)?i():i)||"jsonp"+ ++r,k=s.createElement("script"),l=window[j],m=function(b){a(k).triggerHandler("error",b||"abort")},n={abort:m};return c&&c.promise(n),a(k).on("load error",function(f,i){clearTimeout(e),a(k).off().remove(),"error"!=f.type&&d?g(d[0],n,b,c):h(null,i||"error",n,b,c),window[j]=l,d&&a.isFunction(l)&&l(d[0]),l=d=void 0}),f(n,b)===!1?(m("abort"),n):(window[j]=function(){d=arguments},k.src=b.url.replace(/\?(.+)=\?/,"?$1="+j),s.head.appendChild(k),b.timeout>0&&(e=setTimeout(function(){m("timeout")},b.timeout)),n)},a.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:w,xml:"application/xml, text/xml",html:x,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},a.ajax=function(b){var c,e,i=a.extend({},b||{}),n=a.Deferred&&a.Deferred();for(p in a.ajaxSettings)void 0===i[p]&&(i[p]=a.ajaxSettings[p]);d(i),i.crossDomain||(c=s.createElement("a"),c.href=i.url,c.href=c.href,i.crossDomain=z.protocol+"//"+z.host!=c.protocol+"//"+c.host),i.url||(i.url=window.location.toString()),(e=i.url.indexOf("#"))>-1&&(i.url=i.url.slice(0,e)),m(i);var o=i.dataType,r=/\?.+=\?/.test(i.url);if(r&&(o="jsonp"),i.cache!==!1&&(b&&b.cache===!0||"script"!=o&&"jsonp"!=o)||(i.url=l(i.url,"_="+Date.now())),"jsonp"==o)return r||(i.url=l(i.url,i.jsonp?i.jsonp+"=?":i.jsonp===!1?"":"callback=?")),a.ajaxJSONP(i,n);var t,u=i.accepts[o],v={},w=function(a,b){v[a.toLowerCase()]=[a,b]},x=/^([\w-]+:)\/\//.test(i.url)?RegExp.$1:window.location.protocol,A=i.xhr(),B=A.setRequestHeader;if(n&&n.promise(A),i.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",u||"*/*"),(u=i.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),A.overrideMimeType&&A.overrideMimeType(u)),(i.contentType||i.contentType!==!1&&i.data&&"GET"!=i.type.toUpperCase())&&w("Content-Type",i.contentType||"application/x-www-form-urlencoded"),i.headers)for(q in i.headers)w(q,i.headers[q]);if(A.setRequestHeader=w,A.onreadystatechange=function(){if(4==A.readyState){A.onreadystatechange=j,clearTimeout(t);var b,c=!1;if(A.status>=200&&A.status<300||304==A.status||0==A.status&&"file:"==x){o=o||k(i.mimeType||A.getResponseHeader("content-type")),b=A.responseText;try{"script"==o?(1,eval)(b):"xml"==o?b=A.responseXML:"json"==o&&(b=y.test(b)?null:a.parseJSON(b))}catch(d){c=d}c?h(c,"parsererror",A,i,n):g(b,A,i,n)}else h(A.statusText||null,A.status?"error":"abort",A,i,n)}},f(A,i)===!1)return A.abort(),h(null,"abort",A,i,n),A;if(i.xhrFields)for(q in i.xhrFields)A[q]=i.xhrFields[q];var C="async"in i?i.async:!0;A.open(i.type,i.url,C,i.username,i.password);for(q in v)B.apply(A,v[q]);return i.timeout>0&&(t=setTimeout(function(){A.onreadystatechange=j,A.abort(),h(null,"timeout",A,i,n)},i.timeout)),A.send(i.data?i.data:null),A},a.get=function(){return a.ajax(n.apply(null,arguments))},a.post=function(){var b=n.apply(null,arguments);return b.type="POST",a.ajax(b)},a.getJSON=function(){var b=n.apply(null,arguments);return b.dataType="json",a.ajax(b)},a.fn.load=function(b,c,d){if(!this.length)return this;var e,f=this,g=b.split(/\s/),h=n(b,c,d),i=h.success;return g.length>1&&(h.url=g[0],e=g[1]),h.success=function(b){f.html(e?a("<div>").html(b.replace(t,"")).find(e):b),i&&i.apply(f,arguments)},a.ajax(h),this};var A=encodeURIComponent;a.param=function(b,c){var d=[];return d.add=function(b,c){a.isFunction(c)&&(c=c()),null==c&&(c=""),this.push(A(b)+"="+A(c))},o(d,b,c),d.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b,c,d=[],e=function(a){return a.forEach?a.forEach(e):void d.push({name:b,value:a})};return this[0]&&a.each(this[0].elements,function(d,f){c=f.type,b=f.name,b&&"fieldset"!=f.nodeName.toLowerCase()&&!f.disabled&&"submit"!=c&&"reset"!=c&&"button"!=c&&"file"!=c&&("radio"!=c&&"checkbox"!=c||f.checked)&&e(a(f).val())}),d},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(0 in arguments)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(){try{getComputedStyle(void 0)}catch(a){var b=getComputedStyle;window.getComputedStyle=function(a){try{return b(a)}catch(c){return null}}}}(),function(a){function b(a,b){var c=this.os={},d=this.browser={},e=a.match(/Web[kK]it[\/]{0,1}([\d.]+)/),f=a.match(/(Android);?[\s\/]+([\d.]+)?/),g=!!a.match(/\(Macintosh\; Intel /),h=a.match(/(iPad).*OS\s([\d_]+)/),i=a.match(/(iPod)(.*OS\s([\d_]+))?/),j=!h&&a.match(/(iPhone\sOS)\s([\d_]+)/),k=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),l=/Win\d{2}|Windows/.test(b),m=a.match(/Windows Phone ([\d.]+)/),n=k&&a.match(/TouchPad/),o=a.match(/Kindle\/([\d.]+)/),p=a.match(/Silk\/([\d._]+)/),q=a.match(/(BlackBerry).*Version\/([\d.]+)/),r=a.match(/(BB10).*Version\/([\d.]+)/),s=a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),t=a.match(/PlayBook/),u=a.match(/Chrome\/([\d.]+)/)||a.match(/CriOS\/([\d.]+)/),v=a.match(/Firefox\/([\d.]+)/),w=a.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),x=a.match(/MSIE\s([\d.]+)/)||a.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),y=!u&&a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),z=y||a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);(d.webkit=!!e)&&(d.version=e[1]),f&&(c.android=!0,c.version=f[2]),j&&!i&&(c.ios=c.iphone=!0,c.version=j[2].replace(/_/g,".")),h&&(c.ios=c.ipad=!0,c.version=h[2].replace(/_/g,".")),i&&(c.ios=c.ipod=!0,c.version=i[3]?i[3].replace(/_/g,"."):null),m&&(c.wp=!0,c.version=m[1]),k&&(c.webos=!0,c.version=k[2]),n&&(c.touchpad=!0),q&&(c.blackberry=!0,c.version=q[2]),r&&(c.bb10=!0,c.version=r[2]),s&&(c.rimtabletos=!0,c.version=s[2]),t&&(d.playbook=!0),o&&(c.kindle=!0,c.version=o[1]),p&&(d.silk=!0,d.version=p[1]),!p&&c.android&&a.match(/Kindle Fire/)&&(d.silk=!0),u&&(d.chrome=!0,d.version=u[1]),v&&(d.firefox=!0,d.version=v[1]),w&&(c.firefoxos=!0,c.version=w[1]),x&&(d.ie=!0,d.version=x[1]),z&&(g||c.ios||l)&&(d.safari=!0,c.ios||(d.version=z[1])),y&&(d.webview=!0),c.tablet=!!(h||t||f&&!a.match(/Mobile/)||v&&a.match(/Tablet/)||x&&!a.match(/Phone/)&&a.match(/Touch/)),c.phone=!(c.tablet||c.ipod||!(f||j||k||q||r||u&&a.match(/Android/)||u&&a.match(/CriOS\/([\d.]+)/)||v&&a.match(/Mobile/)||x&&a.match(/Touch/)))}b.call(a,navigator.userAgent,navigator.platform),a.__detect=b}(Zepto),function(a,b){function c(a){return a.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function d(a){return e?e+a:a.toLowerCase()}var e,f,g,h,i,j,k,l,m,n,o="",p={Webkit:"webkit",Moz:"",O:"o"},q=document.createElement("div"),r=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,s={};a.each(p,function(a,c){return q.style[a+"TransitionProperty"]!==b?(o="-"+a.toLowerCase()+"-",e=c,!1):void 0}),f=o+"transform",s[g=o+"transition-property"]=s[h=o+"transition-duration"]=s[j=o+"transition-delay"]=s[i=o+"transition-timing-function"]=s[k=o+"animation-name"]=s[l=o+"animation-duration"]=s[n=o+"animation-delay"]=s[m=o+"animation-timing-function"]="",a.fx={off:e===b&&q.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:o,transitionEnd:d("TransitionEnd"),animationEnd:d("AnimationEnd")},a.fn.animate=function(c,d,e,f,g){return a.isFunction(d)&&(f=d,e=b,d=b),a.isFunction(e)&&(f=e,e=b),a.isPlainObject(d)&&(e=d.easing,f=d.complete,g=d.delay,d=d.duration),d&&(d=("number"==typeof d?d:a.fx.speeds[d]||a.fx.speeds._default)/1e3),g&&(g=parseFloat(g)/1e3),this.anim(c,d,e,f,g)},a.fn.anim=function(d,e,o,p,q){var t,u,v,w={},x="",y=this,z=a.fx.transitionEnd,A=!1;if(e===b&&(e=a.fx.speeds._default/1e3),q===b&&(q=0),a.fx.off&&(e=0),"string"==typeof d)w[k]=d,w[l]=e+"s",w[n]=q+"s",w[m]=o||"linear",z=a.fx.animationEnd;else{u=[];for(t in d)r.test(t)?x+=t+"("+d[t]+") ":(w[t]=d[t],u.push(c(t)));x&&(w[f]=x,u.push(f)),e>0&&"object"==typeof d&&(w[g]=u.join(", "),w[h]=e+"s",w[j]=q+"s",w[i]=o||"linear")}return v=function(b){if("undefined"!=typeof b){if(b.target!==b.currentTarget)return;a(b.target).unbind(z,v)}else a(this).unbind(z,v);A=!0,a(this).css(s),p&&p.call(this)},e>0&&(this.bind(z,v),setTimeout(function(){A||v.call(y)},1e3*(e+q)+25)),this.size()&&this.get(0).clientLeft,this.css(w),0>=e&&setTimeout(function(){y.each(function(){v.call(this)})},0),this},q=null}(Zepto),function(a,b){function c(c,d,e,f,g){"function"!=typeof d||g||(g=d,d=b);var h={opacity:e};return f&&(h.scale=f,c.css(a.fx.cssPrefix+"transform-origin","0 0")),c.animate(h,d,null,g)}function d(b,d,e,f){return c(b,d,0,e,function(){g.call(a(this)),f&&f.call(this)})}var e=window.document,f=(e.documentElement,a.fn.show),g=a.fn.hide,h=a.fn.toggle;a.fn.show=function(a,d){return f.call(this),a===b?a=0:this.css("opacity",0),c(this,a,1,"1,1",d)},a.fn.hide=function(a,c){return a===b?g.call(this):d(this,a,"0,0",c)},a.fn.toggle=function(c,d){return c===b||"boolean"==typeof c?h.call(this,c):this.each(function(){var b=a(this);b["none"==b.css("display")?"show":"hide"](c,d)})},a.fn.fadeTo=function(a,b,d){return c(this,a,b,null,d)},a.fn.fadeIn=function(a,b){var c=this.css("opacity");return c>0?this.css("opacity",0):c=1,f.call(this).fadeTo(a,c,b)},a.fn.fadeOut=function(a,b){return d(this,a,null,b)},a.fn.fadeToggle=function(b,c){return this.each(function(){var d=a(this);d[0==d.css("opacity")||"none"==d.css("display")?"fadeIn":"fadeOut"](b,c)})}}(Zepto),function(a){function b(b,d){var i=b[h],j=i&&e[i];if(void 0===d)return j||c(b);if(j){if(d in j)return j[d];var k=g(d);if(k in j)return j[k]}return f.call(a(b),d)}function c(b,c,f){var i=b[h]||(b[h]=++a.uuid),j=e[i]||(e[i]=d(b));return void 0!==c&&(j[g(c)]=f),j}function d(b){var c={};return a.each(b.attributes||i,function(b,d){0==d.name.indexOf("data-")&&(c[g(d.name.replace("data-",""))]=a.zepto.deserializeValue(d.value))}),c}var e={},f=a.fn.data,g=a.camelCase,h=a.expando="Zepto"+ +new Date,i=[];a.fn.data=function(d,e){return void 0===e?a.isPlainObject(d)?this.each(function(b,e){a.each(d,function(a,b){c(e,a,b)})}):0 in this?b(this[0],d):void 0:this.each(function(){
c(this,d,e)})},a.fn.removeData=function(b){return"string"==typeof b&&(b=b.split(/\s+/)),this.each(function(){var c=this[h],d=c&&e[c];d&&a.each(b||d,function(a){delete d[b?g(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(Zepto),function(a){function b(c){var d=[["resolve","done",a.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",a.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",a.Callbacks({memory:1})]],e="pending",f={state:function(){return e},always:function(){return g.done(arguments).fail(arguments),this},then:function(){var c=arguments;return b(function(b){a.each(d,function(d,e){var h=a.isFunction(c[d])&&c[d];g[e[1]](function(){var c=h&&h.apply(this,arguments);if(c&&a.isFunction(c.promise))c.promise().done(b.resolve).fail(b.reject).progress(b.notify);else{var d=this===f?b.promise():this,g=h?[c]:arguments;b[e[0]+"With"](d,g)}})}),c=null}).promise()},promise:function(b){return null!=b?a.extend(b,f):f}},g={};return a.each(d,function(a,b){var c=b[2],h=b[3];f[b[1]]=c.add,h&&c.add(function(){e=h},d[1^a][2].disable,d[2][2].lock),g[b[0]]=function(){return g[b[0]+"With"](this===g?f:this,arguments),this},g[b[0]+"With"]=c.fireWith}),f.promise(g),c&&c.call(g,g),g}var c=Array.prototype.slice;a.when=function(d){var e,f,g,h=c.call(arguments),i=h.length,j=0,k=1!==i||d&&a.isFunction(d.promise)?i:0,l=1===k?d:b(),m=function(a,b,d){return function(f){b[a]=this,d[a]=arguments.length>1?c.call(arguments):f,d===e?l.notifyWith(b,d):--k||l.resolveWith(b,d)}};if(i>1)for(e=new Array(i),f=new Array(i),g=new Array(i);i>j;++j)h[j]&&a.isFunction(h[j].promise)?h[j].promise().done(m(j,g,h)).fail(l.reject).progress(m(j,f,e)):--k;return k||l.resolveWith(g,h),l.promise()},a.Deferred=b}(Zepto),function(a){a.Callbacks=function(b){b=a.extend({},b);var c,d,e,f,g,h,i=[],j=!b.once&&[],k=function(a){for(c=b.memory&&a,d=!0,h=f||0,f=0,g=i.length,e=!0;i&&g>h;++h)if(i[h].apply(a[0],a[1])===!1&&b.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i.length=0:l.disable())},l={add:function(){if(i){var d=i.length,h=function(c){a.each(c,function(a,c){"function"==typeof c?b.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!=typeof c&&h(c)})};h(arguments),e?g=i.length:c&&(f=d,k(c))}return this},remove:function(){return i&&a.each(arguments,function(b,c){for(var d;(d=a.inArray(c,i,d))>-1;)i.splice(d,1),e&&(g>=d&&--g,h>=d&&--h)}),this},has:function(b){return!(!i||!(b?a.inArray(b,i)>-1:i.length))},empty:function(){return g=i.length=0,this},disable:function(){return i=j=c=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||d&&!j||(b=b||[],b=[a,b.slice?b.slice():b],e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!d}};return l}}(Zepto),function(a){function b(b){return b=a(b),!(!b.width()&&!b.height())&&"none"!==b.css("display")}function c(a,b){a=a.replace(/=#\]/g,'="#"]');var c,d,e=h.exec(a);if(e&&e[2]in g&&(c=g[e[2]],d=e[3],a=e[1],d)){var f=Number(d);d=isNaN(f)?d.replace(/^["']|["']$/g,""):f}return b(a,c,d)}var d=a.zepto,e=d.qsa,f=d.matches,g=a.expr[":"]={visible:function(){return b(this)?this:void 0},hidden:function(){return b(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(a){return 0===a?this:void 0},last:function(a,b){return a===b.length-1?this:void 0},eq:function(a,b,c){return a===c?this:void 0},contains:function(b,c,d){return a(this).text().indexOf(d)>-1?this:void 0},has:function(a,b,c){return d.qsa(this,c).length?this:void 0}},h=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),i=/^\s*>/,j="Zepto"+ +new Date;d.qsa=function(b,f){return c(f,function(c,g,h){try{var k;!c&&g?c="*":i.test(c)&&(k=a(b).addClass(j),c="."+j+" "+c);var l=e(b,c)}catch(m){throw console.error("error performing selector: %o",f),m}finally{k&&k.removeClass(j)}return g?d.uniq(a.map(l,function(a,b){return g.call(a,b,l,h)})):l})},d.matches=function(a,b){return c(b,function(b,c,d){return!(b&&!f(a,b)||c&&c.call(a,null,d)!==a)})}}(Zepto);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);

/*
 * 模板处理
 */
(function($) {
	var stringUtil = {
		template: function(tmpl, datas) {
			var tmpls = [], i;
			if (typeof(tmpl) == 'function') {
				tmpl = String(tmpl).replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, '').replace(/(^\s*)|(\s*$)/g, '');
			}
			if (datas) {
				if (typeof(datas)=='object' && datas.constructor.name=='Array') {
					for (i = 0; i < datas.length; i ++) {
						if (typeof(datas[i].index) == 'undefined') {
							datas[i].index = i + 1;
						}
						tmpls.push(this.substitute(tmpl, datas[i]));
					}
				} else {
					tmpls.push(this.substitute(tmpl, datas));
				}
				return tmpls.join('');
			}
			return tmpl;
		},
		substitute: function(tmpl, data) {
			var that = this;
			if (data && typeof(data) == 'object') {
				// 循环判断 {#attr}{/attr} 属性值为数组时，生成列表
				// 条件判断 {#attr}{/attr} 属性值为非false(''/0/false/undefined/null等)情况，使用属性值object或者父data数据
				tmpl = tmpl.replace(/\{#([^{}#/=!?]+)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, str) {
					if (data[key]) {
						if (typeof(data[key]) == 'object') {
							return that.template(str, data[key]);
						} else {
							return that.substitute(str, data);
						}
					}
					return '';
				});
				// 条件判断 {#!attr}{/attr} 属性值为false(''/0/false/undefined/null等)或空数组情况
				tmpl = tmpl.replace(/\{#!([^{}#/=!?]+)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, str) {
					if (!data[key] || JSON.stringify(data[key])=='[]') {
						return that.substitute(str, data);
					}
					return '';
				});
				// 条件判断 {#attr=value}{/attr}
				tmpl = tmpl.replace(/\{#([^{}#/=!?]+)=(.*?)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, value, str) {
					if ((data[key] + '') == value) {
						return that.substitute(str, data);
					}
					return '';
				});
				// 属性名称 {attr}
				tmpl = tmpl.replace(/\{([^{}#/=!?]+)\}/g, function(match, key) {
					return (data[key] !== undefined) ? (data[key] + '') : '';
				});
			}
			return tmpl;
		}
	};
	$.fn.template = function(data, template) {
		this.each(function(index, element) {
			var tmpl = template || element.querySelector('[type="text/template"]').innerHTML.trim();
			element.innerHTML = stringUtil.template(tmpl, data);
		});
		return this;
	};
})(Zepto);

/*
 * 页面全局方法
 */
(function($) {

	// native方法封装
	var jfNative = {
		//加载url，引起宿主的url的改变
		loadUrl: function(url) {
			var f = document.createElement("iframe");
			f.setAttribute("src", url);
			f.setAttribute("style", "display:none;");
			f.setAttribute("height", "0");
			f.setAttribute("width", "0");
			f.setAttribute("frameborder", "0");
			document.body.appendChild(f);
			//发起请求后这个iframe就没用了，所以把它从dom上移除掉
			f.parentNode.removeChild(f);
			f = null;
		},
		open: function(host, action, data, callback) {
			//exam native://{host}?action={action}[&data={data}][&callback={callback}]
			var url = 'native://'+ host +'?action='+ action;
			if (data) {
				url += '&data='+ encodeURIComponent(JSON.stringify(data));
			}
			if (callback) {
				url += '&callback='+ callback;
			}
			this.loadUrl(url);
		},
		bridge: {
			check: function(callback) {
				var that = this;
				if (browserUtil.jfmore < '1.0.2') {
					callback('您的APP版本过低，请升级APP。');
					return false;
				}
				if (!window.WebViewJavascriptBridge) {
					this.load();
				}
				if (window.WebViewJavascriptBridge) {
					callback();
				} else {
					document.addEventListener('WebViewJavascriptBridgeReady', function() {
						callback();
					}, false);
				}
			},
			load: function() {
				if (!this.loaded) {
					this.loaded = true;
					window.WVJBCallbacks = [];
					//
					var WVJBIframe = document.createElement('iframe');
					WVJBIframe.style.display = 'none';
			        WVJBIframe.src = 'https://__bridge_loaded__';
			        document.documentElement.appendChild(WVJBIframe);
			        setTimeout(function() {
			        	document.documentElement.removeChild(WVJBIframe);
			        }, 0);
				}
			},
			open: function(action, params, callback) {
				if (!window.WebViewJavascriptBridge) {
					alert('您的APP版本过低，请升级APP。');
					return false;
				}
				WebViewJavascriptBridge.callHandler('jsCallNative', {
					action: action,
					params: params
				}, function(response) {
					if (callback) {
						callback(response);
					}
				});
			}
		},
		sharePage: function(pagekey) {
			var that = this;
			// 分享按钮请求接口
			ajaxUtil.loadShareData(pagekey, function(data) {
				var params = {
					title: {
						wechat:'',
						othTitle:document.title
					},
					content: $('meta[name=description]').attr('content') || '',
					shareurl: location.href
				};
				// 自定义shareData属性
				$.extend(params, window._shareData || {});
				$.extend(params, data || {});
				if (!params.imageurl) {
					params.imageurl = location.origin +'/static/images/common/sharelogo.jpg';
				}
				that.bridge.open('share', params, function(response) {
					console.log('callback', response);
				});
			});
		}
	};

	// string方法
	var stringUtil = {
		comma: function(str, length) {
			if (!length || length < 1) length = 3;
			var source = ('' + str).split('.');
			source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
			return source.join('.');
		},
		params: function(obj) {
			var params = [];
			for (var item in obj) {
				params.push(item +'='+ obj[item]);
			}
			return params.join('&');
		},
		//getQueryValue(str, name)
		getQueryValue: function(str, name) {
			if (!name) {
				name = str;
				str = location.href + '';
			}
			var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
			var match = str.match(reg);
			return ((match && match[2] || '').trim()).split('#')[0];
		},
		addQueryValue: function(url, name, value) {
			var m = this, _hash = '', _val, a = "#";
			value = value || '';
			_val = m.getQueryValue(url, name);
			if (_val) {
				url = url.replace(name + '=' + _val, name + '=' + value);
			} else {
				if (url.indexOf(a) != -1) {
					_hash = a + url.slice(url.indexOf(a) + 1);
					url = url.substring(0, url.indexOf(a));
				}
				url += ((url.indexOf('?') > -1) ? '&' : '?') + name + "=" + value;
			}
			return url + _hash;
		},
		//getQueryJSON()
		//getQueryJSON(str)
		getQueryJSON: function(str) {
			str = str || location.search;
			if (str.indexOf('?') < 0) return {};
			var query = str.substr(str.indexOf('?') + 1),
				params = query.split('&'),
				len = params.length,
				result = {},
				key,
				value,
				item,
				param;
			for (var i = 0; i < len; i++) {
				param = params[i].split('=');
				key = param[0];
				value = param[1];
				item = result[key];
				if ('undefined' == typeof item) {
					result[key] = value;
				} else if (Object.prototype.toString.call(item) == '[object Array]') {
					item.push(value);
				} else {
					result[key] = [item, value];
				}
			}
			return result;
		},
		formatTime: function(time, format) {
			var o = {
				'M+': time.getMonth() + 1,
				'd+': time.getDate(),
                'h+': time.getHours(),
				'H+': time.getHours(),
				'm+': time.getMinutes(),
				's+': time.getSeconds(),
				'S': time.getMilliseconds(),
				'W': ['日', '一', '二', '三', '四', '五', '六'][time.getDay()],
				'q+': Math.floor((time.getMonth() + 3) / 3)
			};
			if (format.indexOf('am/pm') >= 0) {
				format = format.replace('am/pm', (o['h+'] >= 12) ? '下午': '上午');
				if (o['h+'] >= 12) o['h+'] -= 12;
			}
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp('('+ k +')').test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
				}
			}
			return format;
		},
		createSign: function(data, options) {
			var keys = [], sign = [], item, i;
			options = options || {};
			for (item in data) {
				if (item != 'sign') {
					keys.push(item);
				}
			}
			keys.sort();
			for (i=0; i<keys.length; i++) {
				sign.push(keys[i] +(options.sepStr || '')+ data[keys[i]]);
			}
			sign.push(options.signKey || '09FB84B1-D90E-4C14-84DB-DEE924A87B51');
			//
			return CryptoJS.MD5(sign.join(options.joinStr || '')).toString();
		},
		getQueryTmpl: function(str, name) {
			var reg = new RegExp('\\{#'+ name +'\\}([\\s|\\S]*?)\\{\\/'+ name +'\\}', '');
			var match = str.match(reg);
			return (match && match[1] || '').trim();
		},
		getScriptTmpl: function($element, name) {
			return this.getQueryTmpl($element.find('script[type="text/template"]').html(), name);
		}
	};

	// cookie方法
	var cookieUtil = {
		load: function() {
			var tC = document.cookie.split('; ');
			var tO = {};
			var a = null;
			for (var i = 0; i < tC.length; i++) {
				a = tC[i].split('=');
				tO[a[0]] = a[1];
			}
			return tO;
		},
		get: function(name) {
			var value = this.load()[name];
			if (value) {
				try {
					return decodeURIComponent(value);
				} catch(e) {
					return unescape(value);
				}
			} else {
				return '';
			}
		},
		set: function(name, value, options) {
			options = (typeof(options) == 'object') ? options: {
				day: options
			};
			var path = options.path || '/';
			var domain = options.domain || '';
			var exptime = 0;
			if (options.day) {
				exptime = 1000 * 60 * 60 * 24 * options.day;
			} else if (options.hour) {
				exptime = 1000 * 60 * 60 * options.hour;
			} else if (options.minute) {
				exptime = 1000 * 60 * options.minute;
			} else if (options.second) {
				exptime = 1000 * options.second;
			}
			var exp = new Date(),
				expires = '';
			if (exptime > 0) {
				exp.setTime(exp.getTime() + exptime);
				expires = '; expires=' + exp.toGMTString();
			}
			domain = (domain) ? ('; domain=' + domain) : '';
			document.cookie = name + '=' + escape(value || '') + '; path=' + path + domain + expires;
		},
		del: function(name, options) {
			options = options || {};
			var path = '; path=' + (options.path || '/');
			var domain = (options.domain) ? ('; domain=' + options.domain) : '';
			document.cookie = name + '=' + path + domain + '; expires=Thu,01-Jan-70 00:00:01 GMT';
		}
	};

	// ajaxUtil
	var ajaxUtil = {
		loadData: function(options) {
			var postData = {
				authType: 'MD5',
				msgVersion: browserUtil.jfmore || '1.0.0',
				custString: browserUtil.jfmore ? 'jfmore_app_h5': 'jfmore_h5',
				platform: browserUtil.ios ? 'ios': 'android',
				appId: (browserUtil.jfmore ? 'jfmore_h5': browserUtil.weixin ? 'weixin_h5': 'h5'),
				coordinate: '120,30',
				machineNo: 'abcdefgh1234567890',
				reqTime: ''+ new Date().getTime()
			};
			//
			options.params = options.params || {};
			options.onSuccess = options.onSuccess || function(data) {
				console.log('loadData Success', data);
			};
			options.onError = options.onError || function(data) {
				console.log('loadData Error', data);
			};
			//
			for (var item in options.params) {
				postData[item] = options.params[item];
			}
			postData.sign = stringUtil.createSign(postData, {signKey:options.type=='payload'?'123456':''});
			//
			var ajaxSetting = {
				type: options.type || 'post',
				url: options.url,
				data: postData,
				dataType: 'json',
				cache: true,
				success: function(data) {
					options.onBefore && options.onBefore(data);
					if (data) {
						if (data.respCode) {
							if (data.respCode == '0000') {
								if (data.data) {
									options.onSuccess(data.data);
								} else {
									options.onSuccess(data);
								}
							} else {
								options.onError({
									code: data.respCode,
									msg: data.respMsg
								});
							}
						} else {
							options.onSuccess(data);
						}
					} else {
						options.onError({
							code: '9999',
							msg: '系统异常'
						});
					}
				},
				error: function() {
					options.onError({
						code: '9999',
						msg: '系统异常'
					});
				}
			};
			if (options.type == 'payload') {
				ajaxSetting.type = 'post';
				ajaxSetting.data = JSON.stringify(postData);
				ajaxSetting.contentType = 'application/json';
			}
			$.ajax(ajaxSetting);
		},
		currTime : function(callback) {
			var that = this, getTime = function() {
				return new Date((+new Date()) + that.__daTime);
			};
			if (that.__isAsync) {
				return callback(getTime());
			}
			if (that.__callbacks) {
				return that.__callbacks.push(callback);
			}
			that.__callbacks = [ callback ];
			that.loadData({
				type:'get',
				url : '/pointgate/common/getServerDate',
				onSuccess : function(data) {
					that.__daTime = data.serverDate - (+new Date());
					that.__isAsync = true;
					that.__callbacks.map(function(item) {
						item(getTime());
					});
					delete that.__callbacks;
				}
			});
		},
		loadShareData: function(pagekey, callback) {
			if (pagekey == 'true') {
				callback();
				return false;
			}
			// 需要根据keyId到后台查询相应的分享图标和文案信息
			/*
			this.loadData({
				type: 'payload',
				url: '/pointgate/service/share/query',
				params: {
					keyId: pagekey
				},
				onSuccess: function(data) {
					// 根据接口返回的data，重新定义shareData，并返回
					var shareData = {
						title: '',
						content: '',
						imageurl: '',
						shareurl: location.href
					};
					callback(shareData);
				},
				onError: function() {
					callback();
				}
			});
			*/
		},
		loadComImages: function(keyId, callback) {
			this.loadData({
				type: 'payload',
				url: '/pointgate/service/ad/recommend',
				params: {
					keyId: keyId
				},
				onSuccess: function(data) {
					var list = [];
					if (data && data.length > 0) {
						data.map(function(item) {
							var newitem = {
								title: item.adName.trim(),
								img: '/'+ item.adContent,
								link: item.adUrl.replace(/(http.*?.jfmore.com)(\/.*)/, '$2'),
								desc: (item.adDesc||'').trim()
							};
							var nameArr = item.adName.split('|');
							var descArr = item.adDesc.split('|');
							if (nameArr.length > 1) {
								nameArr.map(function(str, index) {
									newitem['name'+(index+1)] = str.trim();
								});
							}
							if (descArr.length > 1) {
								nameArr.map(function(str, index) {
									newitem['desc'+(index+1)] = str.trim();
								});
							}
							list.push(newitem);
						});
					}
					callback(list);
				},
				onError: function() {
					callback([]);
				}
			});
		},
		loadComGoods: function(keyId, callback, url, link) {
			this.loadData({
				type: 'payload',
				url: url || '/pointgate/service/product/recommend',
				params: {
					keyId: keyId
				},
				onSuccess: function(data) {
					var list = [], good;
					if (data && data.length>0) {
						data.map(function(item) {
							good = {
								id: item.productId,
								img: '/'+ (item.centerPic || item.centerpic),
								title: item.goodsName,
								subtitle: item.subTitle,
								link: (link ||'/mall/#/goodsDetail?productId=') + item.productId,
								payType: item.payType,
								price: item.price,
								points: item.points,
								amount: item.amount,
								stockNum: item.storedCount,
								saleNum: item.outCount,
                                storeCount: item.storeCount,
								marketPrice: (item.marketPrice/100)
							};
							if (item.payType == 'cust' || item.payType == 'cash') {
								good.priceHtml = '<em>'+ (item.price/100).toFixed(2) +'</em>元';
								if (item.payType == 'cust') {
									good.label = '积分抵用';
								}
							} else if (item.payType == 'comb') {
								good.priceHtml = '<em>'+ item.points +'</em>积分 + <em>'+ (item.price/100).toFixed(2) +'</em>元';
							} else {
								good.priceHtml = '<em>'+ item.points +'</em>积分';
							}
							list.push(good);
						});
					}
					callback(list);
				},
				onError: function() {
					callback([]);
				}
			});
		}
	};

	// 用户登录态相关
	var TOKENKEY = 'login_token',userUtil = {
		data: {
			token: cookieUtil.get(TOKENKEY) || ''
		},
		set: function(item, data) {
			if (typeof(data) != 'undefined') {
				this.data[item] = data;
			} else {
				this.data = item;
			}
			if (this.data.token) {
				cookieUtil.set(TOKENKEY, this.data.token);
			}
		},
		get: function(item) {
			return (item) ? this.data[item]: this.data;
		},
		check: function() {
			return !!this.get('token');
		},// 增加版验证登录
		check_v1: function(callback) {
			var m = this, __token, __key ;
			__key = '__cache_key';
			__token = cookieUtil.get(TOKENKEY);
			callback = callback || function () {};
			// 缓存5秒
			if (cache.get(__key)) {
				return callback(cache.get(__key));
			}
			if (m.__callbacks) {
				return m.__callbacks.push(callback);
			}
			m.__callbacks = [ callback ];
			ajaxUtil.loadData({
				type : 'payload',
				url : '/pointgate/service/validate/loginToken',
				params : {login_token:__token},
				onSuccess : function(data) {
					m.data.token = (data && data.validResult == '00') ? __token : '';
					m.__callbacks.map(function(item) {
						item(m.data.token);
					});
					delete m.__callbacks;
					m.data.token && cache.set(__key, m.data.token, 1000 * 5);
				},
				onError : function(data) {
					m.__callbacks.map(function(item) {
						item('');
					});
					delete m.__callbacks;
				},
			});
		},
		// checkLogin(url);
		// checkLogin(callback);
		checkLogin: function(callback, beforeLogin) {
			var that = this, url = '', loginUrl, source, source_val, _spm;
			if (typeof(callback) == 'string') {
				url = callback;
				callback = function() {
					location.href = url;
				};
			}
			that.check_v1(function(token) {
				if (token) {
					callback(that.get());
				} else {
					if (browserUtil.jfmore) {
						window.onLoginSuccess = function(res) {
							that.set(res);
							callback(res);
						};
						jfNative.open('user', 'login', null, 'onLoginSuccess');
					} else {
						if (beforeLogin) {
							beforeLogin();
						}
						_spm = 'spm';
						source = 'channel_source';
						loginUrl = '/login/getlogincode.htm';
						source_val = stringUtil.getQueryValue(source);
						if (source_val) {
							loginUrl = stringUtil.addQueryValue(loginUrl, source, source_val)
						} else {
							source_val = stringUtil.getQueryValue(url || location.href, source);
							if (source_val) {
								loginUrl = stringUtil.addQueryValue(loginUrl, source, source_val)
							}
						}
						if (typeof(spm) == "object" && spm && stringUtil.getQueryValue(url, _spm)) {
							loginUrl = stringUtil.addQueryValue(loginUrl, _spm, stringUtil.getQueryValue(url, _spm))
						}
						location.href = stringUtil.addQueryValue(loginUrl, 'callback', encodeURIComponent(url || location.href));
					}
				}
			});
		},
		checkLink: function(container) {
			var that = this;
			if ($) {
				container.on('click', 'a[href*="needlogin=true"], a[data-needlogin="true"]', function() {
					that.checkLogin(this.href);
					return false;
				});
			} else {
				container.querySelectorAll('a[href*="needlogin=true"], a[data-needlogin="true"]').addEventListener('click', function() {
					that.checkLogin(this.href);
					return false;
				});
			}
		}
	};

	// pageshow处理
	var pageshowEvents = [];
	window.addEventListener('pageshow', function(event) {
		if (event.persisted) {
			pageshowEvents.map(function(callback) {
				callback();
			});
		}
	});
	
	// 浏览器判断
	var browserUtil = (function() {
		var channel = stringUtil.getQueryValue('_channel_') || sessionStorage.getItem('debug.browser') || '';
		var ua = navigator.userAgent.toLowerCase();
		var weixin = !!ua.match(/micromessenger/i);
		var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i), appver = (jfmore && jfmore[2].trim()) || '';
		var obj = {
			ios: /(iphone|ipod|ipad|ios)/i.test(ua),
			android: !!ua.match(/android/i),
			weixin: weixin || (channel == 'weixin'),
			jfmore: appver || ((channel == 'jfmore') ? '0.0.0': ''),
			dev: !!location.hostname.match(/dev/),
			beta: !!location.hostname.match(/stg/),
			uat: !!location.hostname.match(/uat/),
			prd: !location.hostname.match(/dev|stg|uat/)
		};
		obj.envo = obj.dev ? 'dev' : obj.stg ? 'stg' : obj.uat ? 'uat' : 'prd';
		//
		var pageStatus = {};
		var pageEvents = [];
		if (obj.ios) {
			window.addEventListener('pagehide', function() {
				pageStatus.hide = true;
				pageStatus.show = false;
			});
			window.addEventListener('pageshow', function() {
				if (pageStatus.hide) {
					pageEvents.map(function(callback) {
						callback();
					});
				}
				pageStatus.hide = false;
				pageStatus.show = true;
			});
		}
		obj.checkRefresh = function(callback) {
			if (this.ios) {
				pageEvents.push(callback);
				return false;
			}
		};
		obj.closeWebview = function() {
			if (this.jfmore > '0.0.0') {
				jfNative.open('device', 'closewebview');
			} else {
				$ && $.toast && $.toast('关闭Webview');
			}
		};
		// 返回上一页
		obj.goBack = function() {
			if (document.referrer) {
				history.back();
			} else if (this.jfmore) {
				this.closeWebview();
			}
		};
		// 返回首页
		obj.goHome = function(url) {
			if (this.jfmore) {
				this.closeWebview();
			} else {
				url = url || '/jfmall/index.htm';
				if (typeof(spm) == "object" && spm && spm._getPageCode()) {
					url = spm.addSpm(url);
				}
				var source = 'channel_source';
				var source_val = stringUtil.getQueryValue(source);
				if (source_val) {
					url = stringUtil.addQueryValue(url, source, source_val)
				}
				location.href = url;
			}
		};
		return obj;
	})();
	
	
	
	// 浏览器方法补充
	if (window.browserUtil) {
		browserUtil.checkRefresh = function(callback) {
			if (this.ios) {
				pageshowEvents.push(callback);
			}
		};
		// 关闭webview
		browserUtil.closeWebview = function() {
			if (this.jfmore > '0.0.0') {
				jfNative.open('device', 'closewebview');
			} else {
				console.log('关闭Webview');
			}
		};
		// 返回上一页
		browserUtil.goBack = function() {
			if (document.referrer) {
				history.back();
			} else if (this.jfmore) {
				this.closeWebview();
			}
		};
		// 返回首页
		browserUtil.goHome = function(url) {
			if (this.jfmore) {
				this.closeWebview();
			} else {
				url = url || '/jfmall/index.htm';
				if (typeof(spm) == "object" && spm && spm._getPageCode()) {
					url = spm.addSpm(url);
				}
				var source = 'channel_source';
				var source_val = stringUtil.getQueryValue(source);
				if (source_val) {
					url = stringUtil.addQueryValue(url, source, source_val)
				}
				location.href = url;
				
			}
		};
		browserUtil.loadJS = function(url, onSuccess, onError) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.type = 'text/javascript';
			script.charset = 'utf-8';
			script.src = url;
			script.async = true;
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
					if (onSuccess) onSuccess();
					script.onload = script.onreadystatechange = null;
				}
			};
			script.onerror = function() {
				if (onError) onError();
			};
			head.appendChild(script);
		}
	}
	var cache = {
			_libs : { },	
			_opts : {ext:'__t__m_', t: 1000 * 60 * 30},
			debug : false,
			set : function(item, value, time) {
				var m = this, _time = new Date().getTime() + ((m.debug ? 1 : time) || m._opts.t);
				if (m.localStorage) {
					m.localStorage.setItem(item, JSON.stringify(value));
					m.localStorage.setItem(m._opts.ext + item, _time);
				} else {
					m._libs[item] = value;
				}
	    	},
	    	get : function(item) {
	    		var m = this, value, _time;
	    		if (m.localStorage) {
	    			_time = m.localStorage.getItem(m._opts.ext + item)
	    			value = m.localStorage.getItem(item);
	    			value = JSON.parse(value);
	    			if (value && _time && new Date().getTime() > _time) {
	    				value = null;
	    				m.del(item);
	    			}
	    		} else {
	    			value = m._libs[item];
	    		}
	    		return value;
	    	},
	    	del : function(item) {
	    		var m = this;
	    		delete m._libs[item];
	    		if (m.localStorage) {
	    			m.localStorage.removeItem(item);
	    			m.localStorage.removeItem(m._opts.ext + item);
	    		}
	    	},
	    	localStorage : function() {
	    		var tid, _ext, _time, storage, cItem;
	    		storage = window.localStorage;
	    		if (storage) {
	    			try {
	    				storage.setItem("__has_", true);
	    				storage.removeItem("__has_");
	    				tid = setTimeout(function() {
	    					_ext = window.cache._opts.ext;
	    					_time = new Date().getTime();
	    					for (key in localStorage) {
	    						cItem = storage.getItem(_ext + key) || 0;
	    						if (key.indexOf(_ext) > 0 && cItem && _time > cItem) {
	    							localStorage.removeItem(key);
	    							localStorage.removeItem(_ext + key);
	    						}
	    					}
	    				}, 50);
	    				return storage;
	    			} catch (e) {
	    				clearTimeout(tid);
	    				return false;
	    			}
	    		}
	    		return false;
	    	}()
		}
	//
	window.cache = cache;
	window.jfNative = jfNative;
	window.stringUtil = stringUtil;
	window.cookieUtil = cookieUtil;
	window.userUtil = userUtil;
	window.ajaxUtil = ajaxUtil;
	window.browserUtil = browserUtil;
	//

})(Zepto);

/*
 * 页面全局处理
 */
(function($) {

	var page = {
		init: function() {
			this.head.init();
			this.main.init();
			this.stat.init();
		},
		head: {
			init: function() {
				var navbar = stringUtil.getQueryValue('navbar') || $('body').attr('data-navbar') || '';
				// 在微信里或者navbar=no时，不显示标题栏
				if (navbar!='no' && !browserUtil.weixin) {
					this.initStyle();
					this.initHtml();
				}
			},
			initStyle: function() {
				var headStyle = [
					'<style>',
					'body { padding-top:0.88rem; }',
					'.v-navbar { position:fixed; top:0; left:0; right:0; padding:0 0.2rem; height:0.88rem; line-height:0.88rem; background-color:#fff; z-index:999; overflow:hidden; font-family:Helvetica Neue,Helvetica,sans-serif; }',
					'.v-navbar:after { content:""; position:absolute; left:0; right:0; bottom:0; height:1px; background-color:#ccc; }',
					'.v-navbar h1 { position:absolute; left:50%; width:50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); font-size:0.32rem; text-align:center; height:0.88rem; line-height:.88rem; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; color:#333; font-weight:400; margin:0; padding:0; }',
					'.v-navbar .navigate-left, .v-navbar .navigate-close { float:left; position:relative; width:0.48rem; height:0.88rem; }',
					'.v-navbar .navigate-left:after { content:""; position:absolute; display:block; left:50%; top:50%; width:0.2rem; height:0.2rem; border-right:solid 2px #d3b669; border-bottom:solid 2px #d3b669; -webkit-transform:translate(-25%, -50%) rotate(135deg); transform:translate(-25%, -50%) rotate(135deg); }',
					'.v-navbar .navigate-close:before, .v-navbar .navigate-close:after { content:""; position:absolute; display:block; left:50%; top:50%; width:0.4rem; height:0; }',
					'.v-navbar .navigate-close:before { border-bottom:solid 0.04rem #d3b669; -webkit-transform:translateX(-50%) rotate(45deg); transform:translateX(-50%) rotate(45deg); }',
					'.v-navbar .navigate-close:after { border-top:solid 0.04rem #d3b669; -webkit-transform:translateX(-50%) rotate(-45deg); transform: translateX(-50%) rotate(-45deg); }',
					'.v-navbar .navigate-share { float:right; width:0.6rem; height:0.88rem; background:url(/static/images/common/btn_share.png) no-repeat center center; background-size:0.4rem 0.4rem; }',
					'</style>'
				].join('\n');
				$('head').append(headStyle);
			},
			initHtml: function() {
				// url 上面添加？sharemode=true时会自动添加分享按钮；或者在body里添加属性
				var sharemode = stringUtil.getQueryValue('sharemode') || $('body').attr('data-sharemode') || '';
				var $headElm = $('<div class="v-navbar"><h1>'+ document.title +'</h1></div>');
				if (browserUtil.jfmore) {
					$headElm.prepend('<a href="javascript:browserUtil.closeWebview()" class="navigate-close" data-stat="标题栏-关闭"></a>');
				}
				if (document.referrer && stringUtil.getQueryValue('referrer')!='no') {
					$headElm.prepend('<a href="javascript:history.back()" class="navigate-left" data-stat="标题栏-返回"></a>');
				}
				if (browserUtil.jfmore && sharemode!='') {
					$headElm.append('<a class="navigate-share" otype="button" data-stat="标题栏-分享" data-sharepage="'+ sharemode +'"></a>');
				}
				$('body').prepend($headElm);
			}
		},
		main: {
			init: function() {
				this.content.init();
				this.section.init();
			},
			content: {
				init: function() {
					// ios下后退页面自动刷新处理
					if ($('body').attr('data-needrefresh') == 'true') {
						browserUtil.checkRefresh(function() {
							location.reload();
						});
					}
					// 打开页面链接前判断是否需要登录
					$(document).on('click', 'a[href*="needlogin=true"], a[data-needlogin="true"]', function() {
						userUtil.checkLogin(this.href);
						return false;
					});
					if (stringUtil.getQueryValue('needlogin') == 'true') {
						userUtil.check_v1(function (token){
							setTimeout(function () {
								!token && userUtil.checkLogin(document.URL);
							}, 0)
						})
					}
					// 页面上的分享按钮初始化
					// data-sharepage=true自定义；为key值就需要调取后台接口
					var $share = $('[data-sharepage]');
					if (browserUtil.jfmore && $share.length > 0 && browserUtil.ios) {
						jfNative.bridge.check(function(message) {
							$share.click(function() {
								if (message) {
									alert(message);
								} else {
									jfNative.sharePage(this.getAttribute('data-sharepage') || 'true');
								}
							});
						});
					}else{
						$share.click(function() {
							if(browserUtil.jfmore < '1.0.2'){
								alert('您的APP版本过低，请升级APP。')
								return;
							}
							window.android.getShareData(JSON.stringify(window._shareData));
						})
					}
				}
			},
			section: {
				init: function() {
					var images = {}, goods = {}, keyId;
					$('[data-imagelist]').each(function() {
						keyId = $(this).attr('data-imagelist');
						if (!images[keyId]) {
							images[keyId] = [];
						}
						images[keyId].push($(this));
					});
					$('[data-goodslist]').each(function() {
						keyId = $(this).attr('data-goodslist');
						if (!goods[keyId]) {
							goods[keyId] = [];
						}
						goods[keyId].push($(this));
					});
					for (keyId in images) {
						this.load('images', keyId, images[keyId]);
					}
					for (keyId in goods) {
						this.load('goods', keyId, goods[keyId]);
					}
				},
				load: function(type, keyId, $lists) {
					var that = this;
					if (type == 'images') {
						ajaxUtil.loadComImages(keyId, function(data) {
							$lists.map(function($list) {
								that.render(data, $list);
							});
						});
					} else if (type == 'goods') {
						ajaxUtil.loadComGoods(keyId, function(data) {
							$lists.map(function($list) {
								that.render(data, $list);
							});
						})
					}
				},
				render: function(datas, $list) {
					var begin = $list.attr('data-begin') || '', end = $list.attr('data-end') || '';
					var items = [], len = datas.length, i;
					if (begin!='' || end!='') {
						begin = (begin || 0) * 1;
						end = (end || (len - 1)) * 1;
						for (i=begin; i<=end && i<len; i++) {
							items.push(datas[i]);
						}
					} else {
						items = datas;
					}
					$list.template(items);
					if ($list.find('.swiper-slide').length > 1) {
						browserUtil.loadJS('/static/js/libs/swiper.min.js', function() {
							var swiper = new Swiper('.swiper-container', {
								pagination: '.swiper-pagination',
								paginationClickable: true,
								autoplay: 5000,
								autoplayDisableOnInteraction: false
							});
						});
					}
					$list.trigger('loadSectionSuccess');
				}
			}
		},
		stat: {
			init: function() {
				var that = this;
				this.initBaidu();
				this.initStatUtil();
				this.initClickStat();
				window.addEventListener('load', function() {
					if(browserUtil.weixin&&(!userUtil.check() || (userUtil.check()&&true))&&window.g&&window.g.followme){
						that.initFollow();
					}
				});
			},
			initBaidu: function() {
				// 百度统计代码部署
				if (window._hmt) {
					console.error('页面上重复部署了百度统计，需要清除');
					return false;
				}
				window._hmt = window._hmt || [];
				var hm = document.createElement("script");
				var s = document.getElementsByTagName("script")[0];
				// hm.src = "https://hm.baidu.com/hm.js?1d9e9535fc6315ff5b6e24dbc5e1ec15";
				hm.src = "https://hm.baidu.com/hm.js?3e59e3f2895f6e1d9327fd615c867a97";
				s.parentNode.insertBefore(hm, s);
			},
			initStatUtil: function() {
				window.statUtil = {
					sendPage: function(page) {
						if (window._hmt) {
							_hmt.push(['_trackPageview', page]);
						}
					},
					sendEvent: function(button, page) {
						if (window._hmt) {
							_hmt.push(['_trackPageview', '/virtual/click/?site=h5&path='+ location.pathname +'&page='+ (page||document.title) +'&button='+ button]);
						}
					}
				};
			},
			// 全页点击事件监听
			initClickStat: function() {
				document.addEventListener('mousedown', function(e) {
					var ele = e.target, i = 1;
					while (ele && ele.tagName && ele.tagName.toLowerCase()!='body' && ele.tagName.toLowerCase()!='html' && i < 4) {
						if (ele.getAttribute('data-stat')) {
							setTimeout(function() {
								statUtil.sendEvent(ele.getAttribute('data-stat'));
							}, 10);
							break;
						}
						ele = ele.parentNode;
						i ++;
					}
				});
			},
			initFollow: function(){
				var btncss = document.createElement('style'),
					headEle = document.getElementsByTagName('head')[0];
				btncss.type = 'text/css';
				btncss.innerHTML = [
					'@keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}',
					'.animated{-webkit-animation-duration:.6s;animation-duration:.6s;-webkit-animation-fill-mode:both;animation-fill-mode:both}',
					'#btn-follow { position:fixed; z-index:10; top:2rem; right:0; width:1.2rem; height:1.92rem; background:url("/static/images/common/follow.png") no-repeat; background-size:100%; -webkit-transition:right .3s ease-in-out; transition:right .3s ease-in-out }',
					'#btn-follow.active { right:-1.5rem }',
					'#pop-mask {-webkit-user-select:none;-webkit-touch-callout:none; position:fixed; z-index:20; top:0; right:0; bottom:0; left:0; background:rgba(0,0,0,.5) }',
					'#pop-mask img { position:absolute; top:50%; left:50%; margin-top:-2.65rem; margin-left:-2.2rem; width:4.4rem; height:5.3rem }'
				].join('\n');
				headEle.appendChild(btncss);
				var btn = document.createElement('a');
				btn.id = 'btn-follow';
				btn.href = 'javascript:void(0)';
				document.body.appendChild(btn);
				document.getElementById('btn-follow').onclick = function(){
					document.getElementById('btn-follow').className = 'active';
					if(!document.getElementById('pop-mask')){
						followPop();
					}else{
						document.getElementById('pop-mask').style.display = 'block';
					}

				};

				function followPop(){
					var pop = document.createElement('div');
					pop.id = 'pop-mask';
					pop.className = 'animated bounceInDown';
					pop.innerHTML = '<img src="/static/images/common/follow_qr.png">';
					document.body.appendChild(pop);
					document.getElementById('pop-mask').onclick = function(e){
						document.getElementById('pop-mask').style.display = 'none';
						document.getElementById('btn-follow').className = '';
					}
				}
			}
		}
	};
	page.init();

})(Zepto);
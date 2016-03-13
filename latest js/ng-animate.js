/*
 AngularJS v1.5.0-build.4516+sha.52ea411
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(H,x,Va){'use strict';function ya(a,b,c){if(!a)throw Ka("areq",b||"?",c||"required");return a}function za(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;ba(a)&&(a=a.join(" "));ba(b)&&(b=b.join(" "));return a+" "+b}function La(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function X(a,b,c){var d="";a=ba(a)?a:a&&S(a)&&a.length?a.split(/\s+/):[];s(a,function(a,m){a&&0<a.length&&(d+=0<m?" ":"",d+=c?b+a:a+b)});return d}function Ma(a){if(a instanceof P)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return P(oa(a))}if(1===a.nodeType)return P(a)}function oa(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Na(a,b,c){s(b,function(b){a.addClass(b,c)})}function Oa(a,b,c){s(b,function(b){a.removeClass(b,c)})}function U(a){return function(b,c){c.addClass&&(Na(a,b,c.addClass),c.addClass=null);c.removeClass&&(Oa(a,b,c.removeClass),c.removeClass=null)}}function la(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
R;a.domOperation=function(){a.$$domOperationFired=!0;b();b=R};a.$$prepared=!0}return a}function fa(a,b){Aa(a,b);Ba(a,b)}function Aa(a,b){b.from&&(a.css(b.from),b.from=null)}function Ba(a,b){b.to&&(a.css(b.to),b.to=null)}function V(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),e=(b.removeClass||"")+" "+(c.removeClass||"");a=Pa(a.attr("class"),d,e);c.preparationClasses&&(b.preparationClasses=ca(c.preparationClasses,b.preparationClasses),delete c.preparationClasses);d=b.domOperation!==R?b.domOperation:
null;Ca(b,c);d&&(b.domOperation=d);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function Pa(a,b,c){function d(a){S(a)&&(a=a.split(" "));var b={};s(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);s(b,function(a,b){e[b]=1});c=d(c);s(c,function(a,b){e[b]=1===e[b]?null:-1});var m={addClass:"",removeClass:""};s(e,function(b,c){var d,e;1===b?(d="addClass",e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(m[d].length&&(m[d]+=" "),m[d]+=c)});
return m}function G(a){return a instanceof x.element?a[0]:a}function Qa(a,b,c){var d="";b&&(d=X(b,"ng-",!0));c.addClass&&(d=ca(d,X(c.addClass,"-add")));c.removeClass&&(d=ca(d,X(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function ma(a,b){var c=b?"-"+b+"s":"";ia(a,[ja,c]);return[ja,c]}function pa(a,b){var c=b?"paused":"",d=Y+"PlayState";ia(a,[d,c]);return[d,c]}function ia(a,b){a.style[b[0]]=b[1]}function ca(a,b){return a?b?a+" "+b:a:b}function Da(a,b,c){var d=Object.create(null),
e=a.getComputedStyle(b)||{};s(c,function(a,b){var c=e[a];if(c){var q=c.charAt(0);if("-"===q||"+"===q||0<=q)c=Ra(c);0===c&&(c=null);d[b]=c}});return d}function Ra(a){var b=0;a=a.split(/\s*,\s*/);s(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function qa(a){return 0===a||null!=a}function Ea(a,b){var c=T,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function Fa(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},
count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ga(a,b,c){s(c,function(c){a[c]=Z(a[c])?a[c]:b.style.getPropertyValue(c)})}var R=x.noop,Ha=x.copy,Ca=x.extend,P=x.element,s=x.forEach,ba=x.isArray,S=x.isString,ra=x.isObject,Q=x.isUndefined,Z=x.isDefined,Ia=x.isFunction,sa=x.isElement,T,ta,Y,ua;Q(H.ontransitionend)&&Z(H.onwebkittransitionend)?(T="WebkitTransition",ta="webkitTransitionEnd transitionend"):
(T="transition",ta="transitionend");Q(H.onanimationend)&&Z(H.onwebkitanimationend)?(Y="WebkitAnimation",ua="webkitAnimationEnd animationend"):(Y="animation",ua="animationend");var na=Y+"Delay",va=Y+"Duration",ja=T+"Delay";H=T+"Duration";var Ka=x.$$minErr("ng"),Sa={transitionDuration:H,transitionDelay:ja,transitionProperty:T+"Property",animationDuration:va,animationDelay:na,animationIterationCount:Y+"IterationCount"},Ta={transitionDuration:H,transitionDelay:ja,animationDuration:va,animationDelay:na};
x.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,m,N){var B,q;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){B&&a.leave(B);q&&(q.$destroy(),q=null);if(e||0===e)q=b.$new(),N(q,function(b){B=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",[function(){return function(a,b,c){a=c.ngAnimateChildren;x.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):
c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),N=0;N<b.length;N++)b[N]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);
s(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return m[a].some(function(a){return a(b,c,d)})}function e(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var m=this.rules={skip:[],cancel:[],join:[]};m.join.push(function(a,b,c){return!b.structural&&e(b.options)});m.skip.push(function(a,b,c){return!b.structural&&!e(b.options)});m.skip.push(function(a,b,c){return"leave"==
c.event&&b.structural});m.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});m.cancel.push(function(a,b,c){return c.structural&&b.structural});m.cancel.push(function(a,b,c){return 2===c.state&&b.structural});m.cancel.push(function(a,b,d){a=b.options.addClass;b=b.options.removeClass;var e=d.options.addClass;d=d.options.removeClass;return Q(a)&&Q(b)||Q(e)&&Q(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner",
"$templateRequest","$$jqLite","$$forceReflow",function(b,c,q,m,k,x,y,I,A,v){function O(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function C(a,b,c){var f=G(b),d=G(a),g=[];(a=D[c])&&s(a,function(a){t.call(a.node,f)?g.push(a.callback):"leave"===c&&t.call(a.node,d)&&g.push(a.callback)});return g}function g(a,f,g){function h(f,c,g,d){q(function(){var f=C(u,a,c);f.length&&b(function(){s(f,function(b){b(a,g,d)})})});f.progress(c,g,d)}function D(b){var f=a,c=n;c.preparationClasses&&
(f.removeClass(c.preparationClasses),c.preparationClasses=null);c.activeClasses&&(f.removeClass(c.activeClasses),c.activeClasses=null);Ja(a,n);fa(a,n);n.domOperation();t.complete(!b)}var n=Ha(g),v,u;if(a=Ma(a))v=G(a),u=a.parent();var n=la(n),t=new y,q=O();ba(n.addClass)&&(n.addClass=n.addClass.join(" "));n.addClass&&!S(n.addClass)&&(n.addClass=null);ba(n.removeClass)&&(n.removeClass=n.removeClass.join(" "));n.removeClass&&!S(n.removeClass)&&(n.removeClass=null);n.from&&!ra(n.from)&&(n.from=null);
n.to&&!ra(n.to)&&(n.to=null);if(!v)return D(),t;g=[v.className,n.addClass,n.removeClass].join(" ");if(!Ua(g))return D(),t;var A=0<=["enter","move","leave"].indexOf(f),k=!J||m[0].hidden||E.get(v);g=!k&&l.get(v)||{};var I=!!g.state;k||I&&1==g.state||(k=!p(a,u,f));if(k)return D(),t;A&&xa(a);k={structural:A,element:a,event:f,close:D,options:n,runner:t};if(I){if(d("skip",a,k,g)){if(2===g.state)return D(),t;V(a,g.options,n);return g.runner}if(d("cancel",a,k,g))if(2===g.state)g.runner.end();else if(g.structural)g.close();
else return V(a,g.options,k.options),g.runner;else if(d("join",a,k,g))if(2===g.state)V(a,n,{});else return Qa(a,A?f:null,n),f=k.event=g.event,n=V(a,g.options,k.options),g.runner}else V(a,n,{});(I=k.structural)||(I="animate"===k.event&&0<Object.keys(k.options.to||{}).length||e(k.options));if(!I)return D(),K(a),t;var M=(g.counter||0)+1;k.counter=M;w(a,1,k);c.$$postDigest(function(){var b=l.get(v),c=!b,b=b||{},g=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||e(b.options));if(c||b.counter!==
M||!g){c&&(Ja(a,n),fa(a,n));if(c||A&&b.event!==f)n.domOperation(),t.end();g||K(a)}else f=!b.structural&&e(b.options,!0)?"setClass":b.event,w(a,2),b=x(a,f,b.options),b.done(function(b){D(!b);(b=l.get(v))&&b.counter===M&&K(G(a));h(t,f,"close",{})}),t.setHost(b),h(t,f,"start",{})});return t}function xa(a){a=G(a).querySelectorAll("[data-ng-animate]");s(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=l.get(a);if(c)switch(b){case 2:c.runner.end();case 1:l.remove(a)}})}function K(a){a=
G(a);a.removeAttribute("data-ng-animate");l.remove(a)}function u(a,b){return G(a)===G(b)}function p(a,b,c){c=P(m[0].body);var f=u(a,c)||"HTML"===a[0].nodeName,g=u(a,q),d=!1,h,D=E.get(G(a));for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){g||(g=u(b,q));var e=b[0];if(1!==e.nodeType)break;a=l.get(e)||{};d||(d=E.get(e),!0===d&&!1!==D?D=!0:!1===d&&(D=!1),d=a.structural);if(Q(h)||!0===h)a=b.data("$$ngAnimateChildren"),Z(a)&&(h=a);if(d&&!1===h)break;g||(g=u(b,q),g||!(a=b.data("$ngAnimatePin")))||(b=
a,g=!0);f||(f=u(b,c));b=b.parent()}return(!d||h)&&!0!==D&&g&&f}function w(a,b,c){c=c||{};c.state=b;a=G(a);a.setAttribute("data-ng-animate",b);c=(b=l.get(a))?Ca(b,c):c;l.put(a,c)}var l=new k,E=new k,J=null,f=c.$watch(function(){return 0===I.totalPendingRequests},function(a){a&&(f(),c.$$postDigest(function(){c.$$postDigest(function(){null===J&&(J=!0)})}))}),D={},h=a.classNameFilter(),Ua=h?function(a){return h.test(a)}:function(){return!0},Ja=U(A),t=Node.prototype.contains||function(a){return this===
a||!!(this.compareDocumentPosition(a)&16)};return{on:function(a,b,c){b=oa(b);D[a]=D[a]||[];D[a].push({node:b,callback:c})},off:function(a,b,c){function f(a,b,c){var g=oa(b);return a.filter(function(a){return!(a.node===g&&(!c||a.callback===c))})}var g=D[a];g&&(D[a]=1===arguments.length?null:f(g,b,c))},pin:function(a,b){ya(sa(a),"element","not an element");ya(sa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return g(a,b,c)},enabled:function(a,
b){var c=arguments.length;if(0===c)b=!!J;else if(sa(a)){var f=G(a),g=E.get(f);1===c?b=!g:E.put(f,!b)}else b=J=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,e,m,N,B,q){function z(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,K=d.parentNode;e.put(d,a);for(var u;K;){if(u=e.get(K)){u.processed||
(u=b(u));break}K=K.parentNode}(u||c).children.push(a);return a}var c={children:[]},d,e=new B;for(d=0;d<a.length;d++){var q=a[d];e.put(q.domNode,a[d]={domNode:q.domNode,fn:q.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,w=[];for(d=0;d<c.length;d++){var l=c[d];0>=a&&(a=e,e=0,b.push(w),w=[]);w.push(l.fn);l.children.forEach(function(a){e++;c.push(a)});a--}w.length&&b.push(w);return b}(c)}var k=
[],x=U(a);return function(y,B,A){function v(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];s(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function O(a){var b=[],c={};s(a,function(a,f){var d=G(a.element),g=0<=["enter","move"].indexOf(a.event),d=a.structural?v(d):[];if(d.length){var e=g?"to":"from";s(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][e]={animationID:f,element:P(a)}})}else b.push(a)});
var d={},g={};s(c,function(c,e){var h=c.from,w=c.to;if(h&&w){var E=a[h.animationID],l=a[w.animationID],v=h.animationID.toString();if(!g[v]){var p=g[v]={structural:!0,beforeStart:function(){E.beforeStart();l.beforeStart()},close:function(){E.close();l.close()},classes:C(E.classes,l.classes),from:E,to:l,anchors:[]};p.classes.length?b.push(p):(b.push(E),b.push(l))}g[v].anchors.push({out:h.element,"in":w.element})}else h=h?h.animationID:w.animationID,w=h.toString(),d[w]||(d[w]=!0,b.push(a[h]))});return b}
function C(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var g=a[d];if("ng-"!==g.substring(0,3))for(var e=0;e<b.length;e++)if(g===b[e]){c.push(g);break}}return c.join(" ")}function g(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(m.has(d)&&(d=m.get(d)(a)))return d}}function xa(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function K(){var a=b(y);!a||"leave"===B&&A.$$domOperationFired||a.end()}function u(b){y.off("$destroy",
K);y.removeData("$$animationRunner");x(y,A);fa(y,A);A.domOperation();E&&a.removeClass(y,E);y.removeClass("ng-animate");w.complete(!b)}A=la(A);var p=0<=["enter","move","leave"].indexOf(B),w=new N({end:function(){u()},cancel:function(){u(!0)}});if(!c.length)return u(),w;y.data("$$animationRunner",w);var l=za(y.attr("class"),za(A.addClass,A.removeClass)),E=A.tempClasses;E&&(l+=" "+E,A.tempClasses=null);var J;p&&(J="ng-"+B+"-prepare",a.addClass(y,J));k.push({element:y,classes:l,event:B,structural:p,options:A,
beforeStart:function(){y.addClass("ng-animate");E&&a.addClass(y,E);J&&(a.removeClass(y,J),J=null)},close:u});y.on("$destroy",K);if(1<k.length)return w;e.$$postDigest(function(){var a=[];s(k,function(c){b(c.element)?a.push(c):c.close()});k.length=0;var c=O(a),d=[];s(c,function(a){d.push({domNode:G(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var f=g(a);f&&(c=f.start)}c?(c=c(),c.done(function(a){d(!a)}),xa(a,c)):
d()}})});q(z(d))});return w}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Fa(),c=Fa();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,m,N,B,q,z,k){function x(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++O))+"-"+a.getAttribute("class")+"-"+b}function y(g,v,q,k){var p;0<b.count(q)&&(p=c.get(q),p||(v=X(v,"-stagger"),e.addClass(g,v),p=Da(a,g,k),p.animationDuration=
Math.max(p.animationDuration,0),p.transitionDuration=Math.max(p.transitionDuration,0),e.removeClass(g,v),c.put(q,p)));return p||{}}function I(a){C.push(a);z.waitUntilQuiet(function(){b.flush();c.flush();for(var a=B(),d=0;d<C.length;d++)C[d](a);C.length=0})}function A(c,e,v){e=b.get(v);e||(e=Da(a,c,Sa),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(v,e);c=e;v=c.animationDelay;e=c.transitionDelay;c.maxDelay=v&&e?Math.max(v,e):v||e;c.maxDuration=Math.max(c.animationDuration*
c.animationIterationCount,c.transitionDuration);return c}var v=U(e),O=0,C=[];return function(a,c){function d(){p()}function u(){p(!0)}function p(b){if(!(z||wa&&O)){z=!0;O=!1;f.$$skipPreparationClasses||e.removeClass(a,da);e.removeClass(a,ca);pa(h,!1);ma(h,!1);s(C,function(a){h.style[a[0]]=""});v(a,f);fa(a,f);Object.keys(D).length&&s(D,function(a,b){a?h.style.setProperty(b,a):h.style.removeProperty(b)});if(f.onDone)f.onDone();ea&&ea.length&&a.off(ea.join(" "),E);H&&H.complete(!b)}}function w(a){r.blockTransition&&
ma(h,a);r.blockKeyframeAnimation&&pa(h,!!a)}function l(){H=new m({end:d,cancel:u});I(R);p();return{$$willAnimate:!1,start:function(){return H},end:d}}function E(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-U,0)>=Q&&b>=L&&(wa=!0,p())}function J(){function b(){if(!z){w(!1);s(C,function(a){h.style[a[0]]=a[1]});v(a,f);e.addClass(a,ca);if(r.recalculateTimingStyles){ka=h.className+" "+da;ga=x(h,ka);F=A(h,ka,ga);$=F.maxDelay;
n=Math.max($,0);L=F.maxDuration;if(0===L){p();return}r.hasTransitions=0<F.transitionDuration;r.hasAnimations=0<F.animationDuration}r.applyAnimationDelay&&($="boolean"!==typeof f.delay&&qa(f.delay)?parseFloat(f.delay):$,n=Math.max($,0),F.animationDelay=$,aa=[na,$+"s"],C.push(aa),h.style[aa[0]]=aa[1]);Q=1E3*n;S=1E3*L;if(f.easing){var d,l=f.easing;r.hasTransitions&&(d=T+"TimingFunction",C.push([d,l]),h.style[d]=l);r.hasAnimations&&(d=Y+"TimingFunction",C.push([d,l]),h.style[d]=l)}F.transitionDuration&&
ea.push(ta);F.animationDuration&&ea.push(ua);U=Date.now();var q=Q+1.5*S;d=U+q;var l=a.data("$$animateCss")||[],J=!0;if(l.length){var k=l[0];(J=d>k.expectedEndTime)?N.cancel(k.timer):l.push(p)}J&&(q=N(c,q,!1),l[0]={timer:q,expectedEndTime:d},l.push(p),a.data("$$animateCss",l));if(ea.length)a.on(ea.join(" "),E);f.to&&(f.cleanupStyles&&Ga(D,h,Object.keys(f.to)),Ba(a,f))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!z)if(h.parentNode){var d=
function(a){if(wa)O&&a&&(O=!1,p());else if(O=!a,F.animationDuration)if(a=pa(h,O),O)C.push(a);else{var b=C,c=b.indexOf(a);0<=a&&b.splice(c,1)}},l=0<Z&&(F.transitionDuration&&0===W.transitionDuration||F.animationDuration&&0===W.animationDuration)&&Math.max(W.animationDelay,W.transitionDelay);l?N(b,Math.floor(l*Z*1E3),!1):b();P.resume=function(){d(!0)};P.pause=function(){d(!1)}}else p()}var f=c||{};f.$$prepared||(f=la(Ha(f)));var D={},h=G(a);if(!h||!h.parentNode||!k.enabled())return l();var C=[],B=a.attr("class"),
t=La(f),z,O,wa,H,P,n,Q,L,S,U,ea=[];if(0===f.duration||!q.animations&&!q.transitions)return l();var ha=f.event&&ba(f.event)?f.event.join(" "):f.event,V="",M="";ha&&f.structural?V=X(ha,"ng-",!0):ha&&(V=ha);f.addClass&&(M+=X(f.addClass,"-add"));f.removeClass&&(M.length&&(M+=" "),M+=X(f.removeClass,"-remove"));f.applyClassesEarly&&M.length&&v(a,f);var da=[V,M].join(" ").trim(),ka=B+" "+da,ca=X(da,"-active"),B=t.to&&0<Object.keys(t.to).length;if(!(0<(f.keyframeStyle||"").length||B||da))return l();var ga,
W;0<f.stagger?(t=parseFloat(f.stagger),W={transitionDelay:t,animationDelay:t,transitionDuration:0,animationDuration:0}):(ga=x(h,ka),W=y(h,da,ga,Ta));f.$$skipPreparationClasses||e.addClass(a,da);f.transitionStyle&&(t=[T,f.transitionStyle],ia(h,t),C.push(t));0<=f.duration&&(t=0<h.style[T].length,t=Ea(f.duration,t),ia(h,t),C.push(t));f.keyframeStyle&&(t=[Y,f.keyframeStyle],ia(h,t),C.push(t));var Z=W?0<=f.staggerIndex?f.staggerIndex:b.count(ga):0;(ha=0===Z)&&!f.skipBlocking&&ma(h,9999);var F=A(h,ka,ga),
$=F.maxDelay;n=Math.max($,0);L=F.maxDuration;var r={};r.hasTransitions=0<F.transitionDuration;r.hasAnimations=0<F.animationDuration;r.hasTransitionAll=r.hasTransitions&&"all"==F.transitionProperty;r.applyTransitionDuration=B&&(r.hasTransitions&&!r.hasTransitionAll||r.hasAnimations&&!r.hasTransitions);r.applyAnimationDuration=f.duration&&r.hasAnimations;r.applyTransitionDelay=qa(f.delay)&&(r.applyTransitionDuration||r.hasTransitions);r.applyAnimationDelay=qa(f.delay)&&r.hasAnimations;r.recalculateTimingStyles=
0<M.length;if(r.applyTransitionDuration||r.applyAnimationDuration)L=f.duration?parseFloat(f.duration):L,r.applyTransitionDuration&&(r.hasTransitions=!0,F.transitionDuration=L,t=0<h.style[T+"Property"].length,C.push(Ea(L,t))),r.applyAnimationDuration&&(r.hasAnimations=!0,F.animationDuration=L,C.push([va,L+"s"]));if(0===L&&!r.recalculateTimingStyles)return l();if(null!=f.delay){var aa;"boolean"!==typeof f.delay&&(aa=parseFloat(f.delay),n=Math.max(aa,0));r.applyTransitionDelay&&C.push([ja,aa+"s"]);r.applyAnimationDelay&&
C.push([na,aa+"s"])}null==f.duration&&0<F.transitionDuration&&(r.recalculateTimingStyles=r.recalculateTimingStyles||ha);Q=1E3*n;S=1E3*L;f.skipBlocking||(r.blockTransition=0<F.transitionDuration,r.blockKeyframeAnimation=0<F.animationDuration&&0<W.animationDelay&&0===W.animationDuration);f.from&&(f.cleanupStyles&&Ga(D,h,Object.keys(f.from)),Aa(a,f));r.blockTransition||r.blockKeyframeAnimation?w(L):f.skipBlocking||ma(h,!1);return{$$willAnimate:!0,end:d,start:function(){if(!z)return P={end:d,cancel:u,
resume:null,pause:null},H=new m(P),I(J),H}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,m,N,B){function q(a){return a.replace(/\bng-\S+\b/g,"")}function z(a,b){S(a)&&(a=a.split(" "));S(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function k(c,e,k){function g(a){var b={},c=G(a).getBoundingClientRect();
s(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=I.scrollTop;break;case "left":d+=I.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function m(){var c=q(k.attr("class")||""),d=z(c,p),c=z(p,c),d=a(u,{to:g(k),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function B(){u.remove();e.removeClass("ng-animate-shim");k.removeClass("ng-animate-shim")}var u=P(G(e).cloneNode(!0)),p=q(u.attr("class")||"");e.addClass("ng-animate-shim");
k.addClass("ng-animate-shim");u.addClass("ng-anchor");A.append(u);var w;c=function(){var c=a(u,{addClass:"ng-anchor-out",delay:!0,from:g(e)});return c.$$willAnimate?c:null}();if(!c&&(w=m(),!w))return B();var l=c||w;return{start:function(){function a(){c&&c.end()}var b,c=l.start();c.done(function(){c=null;if(!w&&(w=m()))return c=w.start(),c.done(function(){c=null;B();b.complete()}),c;B();b.complete()});return b=new d({end:a,cancel:a})}}}function x(a,b,c,e){var q=y(a,R),m=y(b,R),B=[];s(e,function(a){(a=
k(c,a.out,a["in"]))&&B.push(a)});if(q||m||0!==B.length)return{start:function(){function a(){s(b,function(a){a.end()})}var b=[];q&&b.push(q.start());m&&b.push(m.start());s(B,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function y(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=ca(e.event,e.preparationClasses));
c=a(d,e);return c.$$willAnimate?c:null}if(!m.animations&&!m.transitions)return R;var I=B[0].body;c=G(e);var A=P(c.parentNode&&11===c.parentNode.nodeType||I.contains(c)?c:I);U(N);return function(a){return a.from&&a.to?x(a.from,a.to,a.classes,a.anchors):y(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=ba(c)?c:c.split(" ");for(var d=[],e={},m=0;m<c.length;m++){var k=c[m],s=a.$$registeredAnimations[k];
s&&!e[k]&&(d.push(b.get(s)),e[k]=!0)}return d}var m=U(d);return function(a,b,d,z){function k(){z.domOperation();m(a,z)}function x(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,v,G,f];break;case "addClass":b=[b,v,f];break;case "removeClass":b=[b,G,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Ia(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ia(a))return a;return R}function y(a,b,d,e,f){var g=[];s(e,function(e){var k=e[f];k&&g.push(function(){var e,
f,g=!1,h=function(a){g||(g=!0,(f||R)(a),e.complete(!a))};e=new c({end:function(){h()},cancel:function(){h(!0)}});f=x(k,a,b,d,function(a){h(!1===a)});return e})});return g}function I(a,b,d,e,f){var g=y(a,b,d,e,f);if(0===g.length){var h,k;"beforeSetClass"===f?(h=y(a,"removeClass",d,e,"beforeRemoveClass"),k=y(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(h=y(a,"removeClass",d,e,"removeClass"),k=y(a,"addClass",d,e,"addClass"));h&&(g=g.concat(h));k&&(g=g.concat(k))}if(0!==g.length)return function(a){var b=
[];g.length&&s(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){s(b,function(b){a?b.cancel():b.end()})}}}var A=!1;3===arguments.length&&ra(d)&&(z=d,d=null);z=la(z);d||(d=a.attr("class")||"",z.addClass&&(d+=" "+z.addClass),z.removeClass&&(d+=" "+z.removeClass));var v=z.addClass,G=z.removeClass,C=e(d),g,H;if(C.length){var K,u;"leave"==b?(u="leave",K="afterLeave"):(u="before"+b.charAt(0).toUpperCase()+b.substr(1),K=b);"enter"!==b&&"move"!==b&&(g=I(a,b,z,C,u));H=I(a,b,z,C,K)}if(g||
H){var p;return{$$willAnimate:!0,end:function(){p?p.end():(A=!0,k(),fa(a,z),p=new c,p.complete(!0));return p},start:function(){function b(c){A=!0;k();fa(a,z);p.complete(c)}if(p)return p;p=new c;var d,e=[];g&&e.push(function(a){d=g(a)});e.length?e.push(function(a){k();a(!0)}):k();H&&e.push(function(a){d=H(a)});p.setHost({end:function(){A||((d||R)(void 0),b(void 0))},cancel:function(){A||((d||R)(!0),b(!0))}});c.chain(e,b);return p}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");
this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),x=d(a.to);if(b||x)return{start:function(){function a(){return function(){s(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());x&&d.push(x.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map
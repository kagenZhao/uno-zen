/*!
Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: May 2, 2018
Licensed under the MIT license
*/
!function (n) {
  n.fn.readingTime = function (e) {
    const t = n(this);
    let i, r, a, s, u, g, l, m, o;
    this.settings = n.extend({}, {
      readingTimeTarget: ".eta",
      readingTimeAsNumber: !1,
      wordCountTarget: null,
      wordsPerMinute: 270,
      round: !0,
      lang: "en",
      lessThanAMinuteString: "",
      prependTimeString: "",
      prependWordString: "",
      remotePath: null,
      remoteTarget: null,
      success: function () {
      },
      error: function () {
      }
    }, e);
    const d = this.settings, T = function (e) {
      "" !== e.text ? (s = e.text.trim().split(/\s+/g).length, i = d.wordsPerMinute / 60, u = s / i, g = Math.floor(u / 60), l = Math.round(u - 60 * g), m = `${g}:${l}`, d.round ? g > 0 ? n(d.readingTimeTarget).text(d.prependTimeString + g + (d.readingTimeAsNumber ? "" : " " + a)) : n(d.readingTimeTarget).text(d.readingTimeAsNumber ? g : d.prependTimeString + r) : n(d.readingTimeTarget).text(d.prependTimeString + m), "" !== d.wordCountTarget && void 0 !== d.wordCountTarget && n(d.wordCountTarget).text(d.prependWordString + s), o = {
        wpm: d.wordsPerMinute,
        words: s,
        eta: {time: m, minutes: g, seconds: u}
      }, d.success.call(this, o)) : d.error.call(this, {error: "The element does not contain any text"})
    };
    return this.length ? ("ar" == d.lang ? (r = d.lessThanAMinuteString || "أقل من دقيقة", a = "دقيقة") : "cz" == d.lang ? (r = d.lessThanAMinuteString || "Méně než minutu", a = "min") : "da" == d.lang ? (r = d.lessThanAMinuteString || "Mindre end et minut", a = "min") : "de" == d.lang ? (r = d.lessThanAMinuteString || "Weniger als eine Minute", a = "min") : "es" == d.lang ? (r = d.lessThanAMinuteString || "Menos de un minuto", a = "min") : "fr" == d.lang ? (r = d.lessThanAMinuteString || "Moins d'une minute", a = "min") : "hu" == d.lang ? (r = d.lessThanAMinuteString || "Kevesebb mint egy perc", a = "perc") : "is" == d.lang ? (r = d.lessThanAMinuteString || "Minna en eina mínútu", a = "min") : "it" == d.lang ? (r = d.lessThanAMinuteString || "Meno di un minuto", a = "min") : "nl" == d.lang ? (r = d.lessThanAMinuteString || "Minder dan een minuut", a = "min") : "no" == d.lang ? (r = d.lessThanAMinuteString || "Mindre enn ett minutt", a = "min") : "pl" == d.lang ? (r = d.lessThanAMinuteString || "Mniej niż minutę", a = "min") : "ru" == d.lang ? (r = d.lessThanAMinuteString || "Меньше минуты", a = "мин") : "sk" == d.lang ? (r = d.lessThanAMinuteString || "Menej než minútu", a = "min") : "sv" == d.lang ? (r = d.lessThanAMinuteString || "Mindre än en minut", a = "min") : "tr" == d.lang ? (r = d.lessThanAMinuteString || "Bir dakikadan az", a = "dk") : "uk" == d.lang ? (r = d.lessThanAMinuteString || "Менше хвилини", a = "хв") : (r = d.lessThanAMinuteString || "Less than a minute", a = "min"), t.each(function (e) {
      null != d.remotePath && null != d.remoteTarget ? n.get(d.remotePath, function (e) {
        let t = document.createElement("div");
        t.innerHTML = e, T({text: n(t).find(d.remoteTarget).text()})
      }) : T({text: t.text()})
    }), !0) : (d.error.call(this, {error: "The element could not be found"}), this)
  }
}(jQuery);

/*! Table of Contents jQuery Plugin - jquery.toc * Copyright (c) 2013-2016 Nikhil Dabas * http://www.apache.org/licenses/LICENSE-2.0 */
!function (a) {
  "use strict";
  var b = function (b) {
    return this.each(function () {
      var c, d, e = a(this), f = e.data(), g = [e], h = this.tagName, i = 0;
      c = a.extend({content: "body", headings: "h1,h2,h3"}, {
        content: f.toc || void 0,
        headings: f.tocHeadings || void 0
      }, b), d = c.headings.split(","), a(c.content).find(c.headings).attr("id", function (b, c) {
        var d = function (a) {
          0 === a.length && (a = "?");
          for (var b = a.replace(/\s+/g, "_"), c = "", d = 1; null !== document.getElementById(b + c);) c = "_" + d++;
          return b + c
        };
        return c || d(a(this).text())
      }).each(function () {
        var b = a(this), c = a.map(d, function (a, c) {
          return b.is(a) ? c : void 0
        })[0];
        if (c > i) {
          var e = g[0].children("li:last")[0];
          e && g.unshift(a("<" + h + "/>").appendTo(e))
        } else g.splice(0, Math.min(i - c, Math.max(g.length - 1, 0)));
        a("<li/>").appendTo(g[0]).append(a("<a/>").text(b.text()).attr("href", "#" + b.attr("id"))), i = c
      })
    })
  }, c = a.fn.toc;
  a.fn.toc = b, a.fn.toc.noConflict = function () {
    return a.fn.toc = c, this
  }, a(function () {
    b.call(a("[data-toc]"))
  })
}(window.jQuery);

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
  
  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;
  
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,_={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof M?new M(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},_.util.type(e)){case"Object":if(n=_.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=_.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{extend:function(e,n){var t=_.util.clone(_.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||_.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l])}var s=r[t];return r[t]=i,_.languages.DFS(_.languages,function(e,n){n===s&&e!=t&&(this[e]=i)}),i},DFS:function e(n,t,r,a){a=a||{};var i=_.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=_.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){_.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};_.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),_.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)_.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=_.util.getLanguage(e),a=_.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&(i.className=i.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,_.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,_.hooks.run("after-highlight",l),_.hooks.run("complete",l),t&&t.call(l.element)}if(_.hooks.run("before-sanity-check",l),!l.code)return _.hooks.run("complete",l),void(t&&t.call(l.element));if(_.hooks.run("before-highlight",l),l.grammar)if(n&&u.Worker){var s=new Worker(_.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else o(_.highlight(l.code,l.grammar,l.language));else o(_.util.encode(l.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return _.hooks.run("before-tokenize",r),r.tokens=_.tokenize(r.code,r.grammar),_.hooks.run("after-tokenize",r),M.stringify(_.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new i;return z(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=c.alias;if(h&&!c.pattern.global){var v=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,v+"g")}for(var p=c.pattern||c,m=a.next,y=i;m!==t.tail&&!(l&&y>=l.reach);y+=m.value.length,m=m.next){var k=m.value;if(t.length>n.length)return;if(!(k instanceof M)){var b,x=1;if(h){if(!(b=W(p,y,n,f)))break;var w=b.index,A=b.index+b[0].length,P=y;for(P+=m.value.length;P<=w;)m=m.next,P+=m.value.length;if(P-=m.value.length,y=P,m.value instanceof M)continue;for(var S=m;S!==t.tail&&(P<A||"string"==typeof S.value);S=S.next)x++,P+=S.value.length;x--,k=n.slice(y,P),b.index-=y}else if(!(b=W(p,0,k,f)))continue;var w=b.index,E=b[0],O=k.slice(0,w),L=k.slice(w+E.length),N=y+k.length;l&&N>l.reach&&(l.reach=N);var j=m.prev;O&&(j=z(t,j,O),y+=O.length),I(t,j,x);var C=new M(o,g?_.tokenize(E,g):E,d,E);m=z(t,j,C),L&&z(t,m,L),1<x&&e(n,t,r,m.prev,y,{cause:o+","+u,reach:N})}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=_.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=_.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:M};function M(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function W(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i)}return a}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function z(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function I(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=_,M.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),_.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(_.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(_.highlight(r,_.languages[t],t)),a&&u.close()},!1)),_;var e=_.util.currentScript();function t(){_.manual||_.highlightAll()}if(e&&(_.filename=e.src,e.hasAttribute("data-manual")&&(_.manual=!0)),!_.manual){var r=document.readyState;"loading"===r||"interactive"===r&&e&&e.defer?document.addEventListener("DOMContentLoaded",t):window.requestAnimationFrame?window.requestAnimationFrame(t):window.setTimeout(t,16)}return _}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);



; (function () {
  'use strict'
  !function () {
    const app = document.body;

    function is(k, v) {
      if ($.isArray(v)) {
        return v.some(function (element) {
          return app.dataset[k] === element;
        });
      } else {
        return app.dataset[k] === v;
      }
    }

    function attr(k, v) {
      if (v) {
        return app.dataset[k] = v;
      } else {
        return app.dataset[k];
      }
    }

    function context() {
      let classNameList = app.className.split(' ');
      let regex = /(.*?)-template/;
      let pageName = '';
      classNameList.forEach(function (className) {
        if (className.toLowerCase() === 'paged') {
          pageName = 'paged';
          return;
        }
        let match = regex.exec(className);
        if (match) {
          pageName = match[1]
        }
      });
      return pageName === '' ? 'error' : pageName;
    }


    function linkify(selector) {
      $(selector).each(function () {
        let element = $(this);
        let text = element.text();
        let id = element.attr('id');
        element.html('');
        element.addClass('deep-link');
        element.append('<a href=#' + id + ' class=\"title-link\">' + text + '</a>');
      })
    }

    function form() {
      let context = $('#search-click-container');
      return function (action) {
        return context[action]();
      };
    }


    function timeAgo(selector) {
      $(selector).each(function () {
        let postDate = $(this).html();
        let postDateInDays = Math.floor((Date.now() - new Date(postDate)) / 8640000)
        if (postDateInDays === 0) {
          postDateInDays = 'today';
        } else if (postDateInDays === 1) {
          postDateInDays = 'yesterday';
        } else {
          postDateInDays = postDateInDays + " days ago";
        }

        $(this).html(postDateInDays);
        $(this).mouseover(function () {
          return $(this).html(postDateInDays);
        });
      })
    }

    function device() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (w <= 480) return 'mobile';
      if (w <= 1024) return 'tablet';
      return 'desktop'
    }

    window.Uno = {
      version: '3.0.0',
      is: is,
      attr: attr,
      context: context,
      linkify: linkify,
      search: {
        form: form
      },
      timeAgo: timeAgo,
      device: device
    };

    window.Uno.attr('page', Uno.context());
    window.Uno.attr('device', Uno.device());
    window.profile_title && $('#profile-title').text(window.profile_title);
    window.profile_resume && $('#profile-resume').text(window.profile_resume);
    window.posts_headline && $('#posts-headline').text(window.posts_headline);
    window.open_button = window.open_button || ".nav-posts > a";
  }()
}).call(this);


;(function () {
  "use strict";
  $((function () {
    if (Uno.is('page', 'home') || Uno.is('page', 'paged') || Uno.is('page', 'tag')) {
      Uno.timeAgo('#posts-list time');
    }

    if (Uno.is('page', 'post')) {
      Uno.timeAgo('.post.meta > time');
      $('main').readingTime({readingTimeTarget: '.post.reading-time > span'});

      Uno.linkify($('#post-content').children('h1, h2, h3, h4, h5, h6'));
      $('.content').fitVids();
    }


    $('#search-click-field').focus(function () {
      return $('#menu-button-search').click();
    });

    $('#search-form-close-button-icon').click(function () {
      $('#search-showing-content, html').toggleClass('search-visible');
      $('#search-showing-background').toggleClass('search-visible');
    });


    $('#menu-button-search').click(function () {
      $('#search-click-field').blur();
      $('#search-showing-content, html').toggleClass('search-visible');
      $('#search-showing-background').toggleClass('search-visible');
      setTimeout(function () {
        $('#search-field').focus();
      }, 50);
    });


    $('main').click(function () {
      if ($('main')[0].classList.contains('expanded')) {
        $('#menu-button-menu').click();
      }
    });


    $('#search-field').ghostHunter({
      results: "#search-results",
      onKeyUp: true,
      onPageLoad: true,
      info_template: "",
      result_template: "<div id='gh-{{ref}}' class='gh-search-item'><h2><a href='{{link}}'>{{title}}</a></h2><h4>{{pubDate}}</h4></div>"
    });

    $(window).keyup(function (ev) {
      /// ESC
      if (ev.keyCode === 27) {
        if ($('#search-showing-content')[0].classList.contains('search-visible')) {
          $('#search-form-close-button-icon').click();
        } else {
          $('#menu-button-menu').click();
        }
      }
    })
  }))
}).call(this);

;(function () {
  "use strict";
  $((function () {

    function animated() {
      setTimeout(function () {
        $('.cover').addClass('animated');
      }, 1000);
    }

    function expand(options) {
      $('main, .cover, .links >li, html').toggleClass('expanded');
      Uno.search.form(options.form);
    }

    $('#menu-button-menu').click(function () {
      $('.cover, main, #menu-button, html').toggleClass('expanded');
    });

    $(window.open_button + ', #avatar-link').click(function (event) {
      if (Uno.is('page', 'home')) {
        event.preventDefault();
        location.hash = location.hash === '' ? '#open' : '';
        if (Uno.is('device', 'desktop')) {
          expand({form: 'toggle'});
        } else {
          $('#menu-button').click();
        }
      }
    });

    if (Uno.is('device', 'desktop') && Uno.is('page', 'home')) {
      animated()
      if (location.hash !== '#open') {
        expand({form: "hide"});
      }
    }
  }));
}).call(this);

(function (window, document) {
  var prevhref = null;
  var nexthref = null;
  var feedElement = null;
  var pageination = null;

  feedElement = document.querySelector('#posts-list');
  if (!feedElement) {
    return;
  }

  pageination = document.querySelector('.pagination');
  if (!pageination) {
    return;
  }

  setupElement()

  if (!prevhref && !nexthref) {
    return;
  }

  var loading = false;

  function onPageLoad() {
    if (this.status === 404) {
      return;
    }

    // append contents
    var postElements = this.response.querySelectorAll('#posts-list>li');
    feedElement.innerHTML = '';
    postElements.forEach(function (item) {
      feedElement.appendChild(document.importNode(item, true));
    });


    pageination.innerHTML = '';
    var resPageination = this.response.querySelector('.pagination');
    pageination.innerHTML = resPageination.innerHTML;

    // set next link
    setupElement()

    loading = false;
  }

  function setOnClick(url) {
    if (loading) {
      return;
    }

    loading = true;
    var xhr = new window.XMLHttpRequest();
    xhr.responseType = 'document';

    xhr.addEventListener('load', onPageLoad);

    xhr.open('GET', url);
    xhr.send(null);
  }


  function setupElement() {
    var prevElement = document.querySelector('a[rel=prev]');
    if (prevElement) {
      prevhref = prevElement.href;
      prevElement.href = "#"
      prevElement.onclick = function () {
        setOnClick(prevhref);
      };
    }
    var nextElement = document.querySelector('a[rel=next]');
    if (nextElement) {
      nexthref = nextElement.href;
      nextElement.href = "#"
      nextElement.onclick = function () {
        setOnClick(nexthref);
      };
    }
  }



})(window, document);


(function (window, document) {
  if (!(Uno.is('page', 'post'))) {
    return;
  }

  var buffer = 300;

  var ticking = false;
  var isAdded = false;

  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = document.documentElement.scrollHeight;

  function onUpdate() {
    if (isAdded) {
      return;
    }

    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false;
      return;
    }

    isAdded = true;

    //// 加载disqus
    var d = document, s = d.createElement('script');
    s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }

  function requestTick() {
    ticking || window.requestAnimationFrame(onUpdate);
    ticking = true;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = document.documentElement.scrollHeight;
    requestTick();
  }

  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onResize);

  requestTick();
})(window, document);

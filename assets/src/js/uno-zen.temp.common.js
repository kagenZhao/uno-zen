(function() {
  'use strict';
  (function() {
    var Uno, app;
    app = document.body;
    window.Uno = Uno = {
      version: '2.9.0',
      is: function(k, v) {
        if (!Array.isArray(v)) {
          return app.dataset[k] === v;
        }
        return v.some(function(v) {
          return app.dataset[k] === v;
        });
      },
      attr: function(k, v) {
        if (v != null) {
          return app.dataset[k] = v;
        } else {
          return app.dataset[k];
        }
      },
      context: function() {
        var className, classNameList, i, item, len, regex, temp;
        classNameList = document.body.className.split(' ');
        regex = /(.*?)-template/;
        className = '';
        for (i = 0, len = classNameList.length; i < len; i++) {
          item = classNameList[i];
          temp = regex.exec(item);
          if (temp !== null) {
            className = temp[1];
          }
        }
        if (className === '') {
          return 'error';
        } else {
          return className;
        }
      },
      linkify: function(selector) {
        return $(selector).each(function() {
          var el, id, text;
          el = $(this);
          text = el.text();
          id = el.attr('id');
          el.html('');
          el.addClass('deep-link');
          return el.append(`<a href=#${id} class=\"title-link\">${text}</a>`);
        });
      },
      search: {
        form: (function() {
          var context;
          context = $('#search-click-container');
          return function(action) {
            return context[action]();
          };
        })()
      },
      timeAgo: function(selector) {
        return $(selector).each(function() {
          var postDate, postDateInDays;
          postDate = $(this).html();
          postDateInDays = Math.floor((Date.now() - new Date(postDate)) / 86400000);
          if (postDateInDays === 0) {
            postDateInDays = 'today';
          } else if (postDateInDays === 1) {
            postDateInDays = 'yesterday';
          } else {
            postDateInDays = `${postDateInDays} days ago`;
          }
          $(this).html(postDateInDays);
          $(this).mouseover(function() {
            return $(this).html(postDate);
          });
          return $(this).mouseout(function() {
            return $(this).html(postDateInDays);
          });
        });
      },
      device: function() {
        var h, w;
        w = window.innerWidth;
        h = window.innerHeight;
        if (w <= 480) {
          return 'mobile';
        }
        if (w <= 1024) {
          return 'tablet';
        }
        return 'desktop';
      }
    };
    Uno.attr('page', Uno.context());
    Uno.attr('device', Uno.device());
    if (window.profile_title) {
      // window global properties
      $('#profile-title').text(window.profile_title);
    }
    if (window.profile_resume) {
      $('#profile-resume').text(window.profile_resume);
    }
    if (window.posts_headline) {
      $('#posts-headline').text(window.posts_headline);
    }
    return window.open_button = window.open_button || '.nav-posts > a';
  })();

}).call(this);

(function() {
  'use strict';
  $(function() {
    //  if Uno.is 'device', 'desktop'
    //    $('a').not('[href*="mailto:"]').click ->
    //      if this.href.indexOf(location.hostname) is -1
    //        window.open $(this).attr 'href'
    //        false
    //  else
    //    $(window).ready ->
    //      console.log("calskjndkaljbdklajbsdkfljb")
    //      FastClick.attach Uno.app
    if (Uno.is('page', 'home') || Uno.is('page', 'paged') || Uno.is('page', 'tag')) {
      Uno.timeAgo('#posts-list time');
    }
    if (Uno.is('page', 'post')) {
      Uno.timeAgo('.post.meta > time');
      $('main').readingTime({
        readingTimeTarget: '.post.reading-time > span'
      });
      Uno.linkify($('#post-content').children('h1, h2, h3, h4, h5, h6'));
      $('.content').fitVids();
    }
    $('#search-click-field').focus(function(e) {
      return $('#menu-button-search').click();
    });
    $('#search-form-close-button-icon').click(function(e) {
      $('#search-showing-content').toggleClass('search-visible');
      return $('#search-showing-background').toggleClass('search-visible');
    });
    $('#menu-button-search').click(function(e) {
      $('#search-click-field').blur();
      $('#search-showing-content').toggleClass('search-visible');
      $('#search-showing-background').toggleClass('search-visible');
      return setTimeout("$('#search-field').focus()", 50);
    });
    $('main').click(function(e) {
      if ($('main')[0].classList.contains('expanded')) {
        return $('#menu-button-menu').trigger('click');
      }
    });
    $('#search-field').ghostHunter({
      results: "#search-results",
      onKeyUp: true,
      onPageLoad: true,
      info_template: "",
      result_template: "<div id='gh-{{ref}}' class='gh-search-item'><h2><a href='{{link}}'>{{title}}</a></h2><h4>{{pubDate}}</h4></div>"
    });
    return $(window).keyup(function(ev) {
      if (ev.keyCode === 27) {
        if ($('#search-showing-content')[0].classList.contains('search-visible')) {
          return $('#search-form-close-button-icon').trigger('click');
        } else {
          return $('#menu-button-menu').trigger('click');
        }
      }
    });
  });

}).call(this);

(function() {
  'use strict';
  $(function() {
    var _animate, _expand;
    _animate = function() {
      return setTimeout(function() {
        return $('.cover').addClass('animated');
      }, 1000);
    };
    _expand = function(options) {
      $('main, .cover, .links > li, html').toggleClass('expanded');
      return Uno.search.form(options.form);
    };
    $('#menu-button-menu').click(function() {
      return $('.cover, main, #menu-button, html').toggleClass('expanded');
    });
    $(`${window.open_button}, #avatar-link`).click(function(event) {
      if (Uno.is('page', 'home')) {
        event.preventDefault();
        location.hash = location.hash === '' ? '#open' : '';
        if (!Uno.is('device', 'desktop')) {
          return $('#menu-button').trigger('click');
        }
        return _expand({
          form: 'toggle'
        });
      }
    });
    if ((Uno.is('device', 'desktop')) && (Uno.is('page', 'home'))) {
      _animate();
      if (location.hash !== '#open') {
        return _expand({
          form: 'hide'
        });
      }
    }
  });

}).call(this);

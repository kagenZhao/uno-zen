

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

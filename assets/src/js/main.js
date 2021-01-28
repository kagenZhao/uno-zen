
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

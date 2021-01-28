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

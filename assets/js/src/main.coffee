'use strict'

$ ->

  if Uno.is 'device', 'desktop'
    $('a').not('[href*="mailto:"]').click ->
      if this.href.indexOf(location.hostname) is -1
        window.open $(this).attr 'href'
        false
  else
    FastClick.attach Uno.app

  if Uno.is('page', 'home') or Uno.is('page', 'paged') or Uno.is('page', 'tag')
    Uno.timeAgo '#posts-list time'

  if Uno.is 'page', 'post'
    Uno.timeAgo '.post.meta > time'
    $('main').readingTime readingTimeTarget: '.post.reading-time > span'
    Uno.linkify $('#post-content').children('h1, h2, h3, h4, h5, h6')
    $('.content').fitVids()

  if Uno.is 'page', 'error'
    $('#panic-button').click ->
      s = document.createElement 'script'
      s.setAttribute 'src','https://nthitz.github.io/turndownforwhatjs/tdfw.js'
      document.body.appendChild s

  $('#search-click-field').focus (e) ->
    $('#search-click-field').blur();
    document.getElementById('search-showing-content').style.display = 'block';
    document.getElementById('search-showing-background').style.display = 'block';

  $('#search-form-close-button').click (e) ->
    document.getElementById('search-showing-content').style.display='none';
    document.getElementById('search-showing-background').style.display='none'

  $('#search-field').ghostHunter({
    results: "#results",
    onKeyUp: true,
    onPageLoad: true,
    result_template: "<div><a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><p><h2>{{title}}</h2><h4>{{pubDate}}</h4></p></a></div>"
  });

  $(window).keyup (ev) ->
    if ev.keyCode == 27
      $('#search-form-close-button').trigger('click')


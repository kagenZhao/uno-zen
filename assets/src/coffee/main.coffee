'use strict'

$ ->

#  if Uno.is 'device', 'desktop'
#    $('a').not('[href*="mailto:"]').click ->
#      if this.href.indexOf(location.hostname) is -1
#        window.open $(this).attr 'href'
#        false
#  else
#    $(window).ready ->
#      console.log("calskjndkaljbdklajbsdkfljb")
#      FastClick.attach Uno.app


  if Uno.is('page', 'home') or Uno.is('page', 'paged') or Uno.is('page', 'tag')
    Uno.timeAgo '#posts-list time'

  if Uno.is 'page', 'post'
    Uno.timeAgo '.post.meta > time'
    $('main').readingTime readingTimeTarget: '.post.reading-time > span'
    Uno.linkify $('#post-content').children('h1, h2, h3, h4, h5, h6')
    $('.content').fitVids()

  $('#search-click-field').focus (e) ->
    $('#menu-button-search').click()


  $('#search-form-close-button-icon').click (e) ->
    $('#search-showing-content').toggleClass 'search-visible'
    $('#search-showing-background').toggleClass 'search-visible'

  $('#menu-button-search').click (e) ->
    $('#search-click-field').blur();
    $('#search-showing-content').toggleClass 'search-visible'
    $('#search-showing-background').toggleClass 'search-visible'
    setTimeout("$('#search-field').focus()", 50)

  $('main').click (e) ->
    if $('main')[0].classList.contains('expanded')
      $('#menu-button-menu').trigger('click')

  $('#search-field').ghostHunter({
    results: "#search-results",
    onKeyUp: true,
    onPageLoad: true,
    info_template: "",
    result_template: "<div id='gh-{{ref}}' class='gh-search-item'><h2><a href='{{link}}'>{{title}}</a></h2><h4>{{pubDate}}</h4></div>"
  });

  $(window).keyup (ev) ->
    if ev.keyCode == 27
      if $('#search-showing-content')[0].classList.contains('search-visible')
        $('#search-form-close-button-icon').trigger('click')
      else
        $('#menu-button-menu').trigger('click')


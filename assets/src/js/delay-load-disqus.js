
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

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

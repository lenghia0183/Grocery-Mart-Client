(function () {
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  if (!getCookie('viewportWidth')) {
    document.cookie = 'viewportWidth=' + window.innerWidth + '; path=/';
    window.location.reload();
  }
})();

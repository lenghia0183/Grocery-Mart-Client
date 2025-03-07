(function () {
  function updateViewportCookie() {
    document.cookie = 'viewportWidth=' + window.innerWidth + '; path=/';
  }
  window.addEventListener('resize', updateViewportCookie);
})();

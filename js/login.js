(function ($) {
  $(document).ready(function () {
    
    $('a.toggle-password-reset').click(function() {
      $('#login-panel').toggleClass('move');
    });
    
    $('a.toggle-mmp-migrate').click(function() {
      $('#signup-panel').toggleClass('move');
    });
  });
}(jQuery));

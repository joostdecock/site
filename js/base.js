(function ($) {
  $(document).ready(function () {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 200) $('body').addClass('scrolled');  
      else $('body').removeClass('scrolled');
    });

    $('.scroll-to-top').click(function() { 
      $('html, body').animate({scrollTop : 0},800);
    });

    $("#markdown-toc").find('a').click(function() { 
      if($('#oc-right').hasClass('shown')) siobhanOcToggle('right');
    });

    $('.oc-toggle.left').click(function () {
      $('#oc-left').css({ side : "inherit" });
      if($('#oc-right').hasClass('shown')) siobhanOcHide('right');
      siobhanOcToggle('left');
    });
    $('.oc-toggle.right').click(function () {
      if($('#oc-left').hasClass('shown')) siobhanOcHide('left'); 
      siobhanOcToggle('right');
    });

    $('.oc-overlay').click(function () {
      siobhanOcHide('left');
      siobhanOcHide('right');
    });

    function siobhanOcShow(side) {
      $('#oc-'+side).addClass('shown');
      $('.oc-overlay').addClass(side);
      $('.fade-oc').addClass('faded');
      $('body').addClass('oc-shown');
    }

    function siobhanOcHide(side) {
      $('.oc-overlay').removeClass(side);
      $('#oc-'+side).removeClass('shown');
      $('.fade-oc').removeClass('faded');
      $('body').removeClass('oc-shown');
    }

    function siobhanOcToggle(side) {
      if($('#oc-'+side).hasClass('shown')) siobhanOcHide(side); 
      else siobhanOcShow(side); 
    }

    $('.oc-panel').on('flick', function(e) {
      var side = $(this).attr('data-side');
      var direction = e['direction'];
      if(side == 'right') direction = direction * -1; 
      if(e['orientation'] == 'horizontal' && direction == -1) siobhanOcHide(side);
    });

    $('.oc-panel').on('drag', function(e) {
      panel = $(this);
      var side = panel.attr('data-side');
      var offset = e['dx'];
      if(side == 'right')  offset = offset * -1;
      var dist = offset - 300;
      if(e['end']) {
        if(dist<-400) { 
          siobhanOcHide(side);
          setTimeout(function(){ panel.css(side,"-300px")}, 750);
        } else panel.css(side,"-300px");
      } else if(dist<-300) panel.css(side,dist+"px");
    });
  });
}(jQuery));

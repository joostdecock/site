// Set the location of the APIs you want to connect to here
var api = {
    data: 'https://joost.data.freesewing.org',
    core: 'https://api.freesewing.org',
};
        
// Load token from local storage
var token = window.localStorage.getItem("jwt");

(function ($) {
    $(document).ready(function () {

        // Scrolling ///////////////////////

        // Sticky polyfill
        $('.sticky').Stickyfill();

        // Toggle body.scrolled class when scrolled
        $(window).scroll(function() {
            if ($(document).scrollTop() > 200) $('body').addClass('scrolled');  
            else $('body').removeClass('scrolled');
        });
        
        // Scroll to top link
        $('.scroll-to-top').click(function() { 
            $('html, body').animate({scrollTop : 0},800);
        });


        // Table of contents ///////////////

        // Move auto-generated ToC to the correct place in the DOM
        $('#markdown-toc').detach().appendTo('#oc-right'); 
    
        // Clicking a ToC link should close the off-canvas toc
        $("#markdown-toc").find('a').click(function() { 
            if($('body').hasClass('right')) siobhanOcToggle('right');
        });

    
        // Off-canvas menus ////////////////

        // Bind click for the left menu
        $('.oc-toggle.left').click(function () {
            $('#oc-left').css({ side : "inherit" });
            if($('#oc-right-wrapper').hasClass('shown')) siobhanOcHide('right');
            siobhanOcToggle('left');
        });
    
        // Bind click for the right menu
        $('.oc-toggle.right').click(function () {
            if($('#oc-left').hasClass('shown')) siobhanOcHide('left'); 
            siobhanOcToggle('right');
        });

        // Bind click for the overlay
        $('.oc-overlay').click(function () {
            siobhanOcHide('left');
            siobhanOcHide('right');
        });

        // Handle flick on touchscreen interfaces
        $('.oc-panel').on('flick', function(e) {
            var side = $(this).attr('data-side');
            var direction = e['direction'];
            if(side == 'right') direction = direction * -1; 
            if(e['orientation'] == 'horizontal' && direction == -1) siobhanOcHide(side);
        });

        // Handle drag on touchscreen interfaces
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


        // Login/Authentication ////////////

        // Is a token present in local storage?
        if(token === null) {
            // Nope, this is a stranger to us
            $('body').addClass('visitor');
        } else {
            // Yes, but is it still valid?
            $.ajax({
                url: api.data+'/auth',
                method: 'GET',
                dataType: 'json',
                success: function() { 
                    // It is, user is logged in
                    $('body').addClass('user logged-in'); 
                },
                error: function() { 
                    // It is not, user is logged out
                    window.localStorage.removeItem("user");
                    $('body').addClass('user logged-out'); 
                },
                headers: {'Authorization': 'Bearer '+token},
            }); 
        }

        // Handle login links
        $('a.login').click(function(){
            // Load login box
            $('#modal').removeClass().addClass('shown thematic');
            $('#modal-main').html("<div id='login' class='loginbox'></div>");
            // Load login code
            $('#login').load('/snippets/login/form');
            $.getScript( "/js/login.js");
        });
   
        // Handle logout links
        $('a.logout').click(function(){
            window.localStorage.removeItem("jwt");
            window.location.replace("/");
        });
   
        // On login page, trigger modal without click
        if($('#login-conf').attr('data-autoload') === 'true') $('a#login-link').click(); 

        // Modal ///////////////////////////
        
        // Close modal
        $('.close-modal').click(function(e) {
            $('#modal').removeClass();
            $('.burger').removeClass('hidden');
        });

        // Heading anchor links ////////////
        return $("#content h2, #content h3, #content h4, #content h5, #content h6").each(function(i, el) {
            var $el, icon, id;
            $el = $(el);
            id = $el.attr('id');
            icon = '<i class="fa fa-link"></i>';
            if (id) {
                return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
            }
        });

        // Methods /////////////////////////
       
        function siobhanOcShow(side) {
            if(side === 'right') {
                $('#oc-right-wrapper').addClass('shown');
            } else {
                $('#oc-left').addClass('shown');
            }
            $('.oc-overlay').addClass(side);
            $('.fade-oc').addClass('faded');
            $('body').addClass('oc-shown '+side);
        }

        function siobhanOcHide(side) {
            if(side === 'right') {
                $('#oc-right-wrapper').removeClass('shown');
            } else {
                $('#oc-left').removeClass('shown');
            }
            $('.oc-overlay').removeClass(side);
            $('.fade-oc').removeClass('faded');
            $('body').removeClass('oc-shown');
        }

        function siobhanOcToggle(side) {
            if(side === 'left') var sidediv = '#oc-left';
            else var sidediv = '#oc-right-wrapper';
            if($(sidediv).hasClass('shown')) siobhanOcHide(side); 
            else siobhanOcShow(side); 
        }

        function logOut() {
            window.localStorage.removeItem("jwt");
            $('body').removeClass('logged-in user').addClass('visitor');
        }

    });
}(jQuery));

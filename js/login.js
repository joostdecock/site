(function ($) {
    $(document).ready(function () {
        // Set the location of the API you want to connect to.
        var api = 'http://joost.freesewing.org:8081';
   
        // Load login form
        $('#login').load('/snippets/login/form', function() {
            if ($('#login').attr('data-tab') == 'signup') {
                $('#signup-tab-link').click();
            } 
            else if ($('#login').attr('data-panel') == 'reset') {
                $('#show-reset-link').click();
            } 
        });

        // Bind click: Slide panel for password reset
        $('#login').on('click','a.toggle-password-reset', function() {
            $('#login-panel').toggleClass('move'); 
        });
       
        // Bind click: Slide panel for mmp migration 
        $('#login').on('click','a.toggle-mmp-migrate', function() {
            $('#signup-panel').toggleClass('move'); 
        });
       
        // Bind click: Signup submit 
        $('#login').on('submit','#signup-form', function(e) {
            e.preventDefault();
            signup();
        });

        function signup() {
            // Show loader
            $('#login').load('/snippets/signup/loading');

            $.post(api+'/signup', $('#signup-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/snippets/generic/error');
                }
                console.log(data);
            }, 'json');

        }
        
    });
}(jQuery));

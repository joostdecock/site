(function ($) {
    $(document).ready(function () {
        // Set the location of the API you want to connect to.
        var api = 'http://joost.freesewing.org:8081';
   
        // Load login form
        $('#login').load('/snippets/login/form', function() {
            if ($('#login').attr('data-tab') == 'signup') {
                $('#signup-tab-link').click();
            } 
            else if ($('#login').attr('data-logout') == 'logout') {
                window.localStorage.removeItem("jwt");
                $('body').removeClass('logged-in user').addClass('visitor');
            } 
            else if ($('#login').attr('data-panel') == 'recover') {
                $('#show-recover-link').click();
            } 
        });

        // Bind click: Slide panel for password recover
        $('#login').on('click','a.toggle-password-recover', function() {
            $('#login-panel').toggleClass('move'); 
        });
       
        // Bind click: Slide panel for re-send 
        $('#login').on('click','a.toggle-resend', function() {
            $('#signup-panel').toggleClass('move'); 
        });
       
        // Bind click: Signup submit 
        $('#login').on('submit','#signup-form', function(e) {
            e.preventDefault();
            signup();
        });

        // Bind click: Login submit 
        $('#login').on('submit','#login-form', function(e) {
            e.preventDefault();
            login();
        });

        // Bind click: Resend submit 
        $('#login').on('submit','#resend-form', function(e) {
            e.preventDefault();
            resend();
        });

        // Bind click: Recover submit 
        $('#login').on('submit','#recover-form', function(e) {
            e.preventDefault();
            recover();
        });

        function signup() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api+'/signup', $('#signup-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/snippets/generic/error');
                }
            }, 'json');
        }

        function resend() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api+'/resend', $('#resend-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/snippets/generic/error');
                }
            }, 'json');
        }

        function login() {
            // Show loader
            $('#login-msg').load('/snippets/generic/spinner');
            $.post(api+'/login', $('#login-form').serialize(),function( data ) {
                if(data.result == 'ok') {
                    window.localStorage.setItem("jwt", data.token);
                    window.location.replace("/welcome");
                } else {
                    $('#login-msg').load('/snippets/'+data.message);
                }
                console.log(data);
            }, 'json');
        }
        
        function recover() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api+'/recover', $('#recover-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/snippets/generic/error');
                }
            }, 'json');
        }

    });
}(jQuery));

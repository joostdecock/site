(function ($) {
    $(document).ready(function () {
        
        // Focus on correct tab/panel //////

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

        
        // Bind click events ///////////////
        
        // Password recover link
        $('#login').on('click','a.toggle-password-recover', function() { 
            $('#login-panel').toggleClass('move'); 
        });

        // Re-send confirmation email link
        $('#login').on('click','a.toggle-resend', function() { 
            $('#signup-panel').toggleClass('move'); 
        });
        
        // Signup submit 
        $('#login').on('submit','#signup-form', function(e) { 
            e.preventDefault(); 
            signup(); 
        });
        
        // Login submit 
        $('#login').on('submit','#login-form', function(e) { 
            e.preventDefault(); 
            login(); 
        });
        
        // Resend submit 
        $('#login').on('submit','#resend-form', function(e) { 
            e.preventDefault(); 
            resend(); 
        });
        
        // Recover submit 
        $('#login').on('submit','#recover-form', function(e) { 
            e.preventDefault(); 
            recover(); 
        });

        
        // Functions ///////////////////////
        
        function signup() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api.data+'/signup', $('#signup-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

        function resend() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api.data+'/resend', $('#resend-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

        function login() {
            // Show loader
            $('#login-msg').load('/snippets/generic/spinner');
            $.post(api.data+'/login', $('#login-form').serialize(),function( data ) {
                if(data.result == 'ok') {
                    window.localStorage.setItem("jwt", data.token);
                    window.localStorage.setItem("user", JSON.stringify({ 'id': data.userid, 'email': data.email, 'user': data.username }));
                    if(typeof($('#login-conf').attr('data-goto')) !== 'undefined') {
                        window.location.replace($('#login-conf').attr('data-goto'));
                    } else {
                        $('body').removeClass('visitor').removeClass('logged-out').addClass('logged-in user');
                        $('#modal').removeClass();
                        $('.burger').removeClass('hidden');
                    }
                } else {
                    $('#login-msg').load('/snippets/'+data.message);
                }
                console.log(data);
            }, 'json');
        }
        
        function recover() {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api.data+'/recover', $('#recover-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

    });
}(jQuery));

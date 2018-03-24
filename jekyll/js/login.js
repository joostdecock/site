(function ($) {
    $(document).ready(function () {
        
        // Focus on correct tab/panel //////

        if ($('#login-conf').attr('data-tab') == 'signup') {
            $('#signup-tab-link').click();
            $('#signup-email').focus();
        } 
        else if ($('#login').attr('data-logout') == 'logout') {
            window.localStorage.removeItem("jwt");
            window.localStorage.removeItem("fsu");
            $('body').removeClass('logged-in user patron').addClass('visitor');
        } 
        else if ($('#login').attr('data-panel') == 'recover') {
            $('#show-recover-link').click();
            $('#recover-email').focus();
        } 

        
        // Bind click events ///////////////
        
        // Password recover link
        $('#login').on('click','a.toggle-password-recover', function() { 
            $('#login-panel').toggleClass('move'); 
            $('#recover-email').focus();
        });

        // Re-send confirmation email link
        $('#login').on('click','a.toggle-resend', function() { 
            $('#signup-panel').toggleClass('move'); 
            $('#resend-email').focus();
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
            resend($('#resend-email').val()); 
        });
        
        // Recover submit 
        $('#login').on('submit','#recover-form', function(e) { 
            e.preventDefault(); 
            recover(); 
        });

        
        // Functions ///////////////////////
        
        function signup() {
            // Save email in case we need it later
            var email = $('#signup-email').val();
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api.data+'/signup', $('#signup-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    // Account exists
                    if(data.reason == 'account_exists') {
                        $('#login').load('/snippets/'+data.message);
                        $('#login').on('click','#login-instead', function() { 
                            $('#login').load('/snippets/login/form', function() {
                                $('#email').val(email);
                                $('#password').focus();
                            });
                        });
                    }
                    // All is fine
                    else {
                        $('#login').load('/snippets/'+data.message);
                    }
                // Some unhandled issue
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

        function resend(email) {
            // Show loader
            $('#login').load('/snippets/generic/loading');
            $.post(api.data+'/resend', {'resend-email': email},function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

        function login() {
            // Show loader
            // Save email in case we need it later
            var email = $('#email').val();
            $('#login-msg').load('/snippets/generic/spinner');
            $.post(api.data+'/login', $('#login-form').serialize(),function( data ) {
                if(data.result == 'ok') {
                    window.localStorage.setItem("jwt", data.token);
                    window.localStorage.setItem("fsu", JSON.stringify({ 'id': data.userid, 'email': data.email, 'user': data.username, 'patron': data.patron }));
                    window.location.replace('/account');
                } else {
                    // Account inactive
                    if(data.reason == 'account_inactive') {
                        $('#login').load('/snippets/'+data.message);
                        $('#login').on('click','#one-click-resend', function() { 
                            resend(email);
                        });
                    }
                    // Some other reason
                    else {
                        $('#login-msg').load('/snippets/'+data.message);
                    }
                }
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

(function ($) {
    $(document).ready(function () {

        $('#landing').on('submit','#signup-landing', function(e) {
            e.preventDefault();
            // Show loader
            $('#landing').load('/snippets/generic/loading');
            $.post(api.data+'/signup', $('#signup-landing').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    if(data.reason == 'account_exists') {
                        msg = '<h2>We have a user with that email address</h2><p class="lead">Perhaps you wanted to login instead?</p><a href="#burger" class="btn btn-lg btn-outline-white" onclick="login(\'login\');">Login</a>';
                    } else if(data.reason == 'signup_complete') {
                        msg = '<h2>Yay, almost there</h2><p class="lead">An email is on its way to confirm your account.<br>Please follow the instructions in it.</p>';
                    } else {
                        msg = '<h2>Well this is awkward</h2><p class="lead">Something went wrong.<br>Perhaps our signup page will handle this better.</p><a href="#burger" class="btn btn-lg btn-outline-white" onclick="login(\'signup\');">Sign up here</a>';
                    }
                    $('#landing').html(msg);
                } else {
                    $('#landing').load('/components/generic/error');
                }
            }, 'json');
        });
    });
}(jQuery));

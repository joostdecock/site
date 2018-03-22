(function ($) {
    $(document).ready(function () {

        if(window.location.hash) {
            // Puts hash in variable, and removes the # character
            var hash = window.location.hash.substring(1).split('.'); 
      
            // Load form
            $('#login').append('<p id="reset-msg"><b>Account recovery</b><br>Choose a new password for your acount:</p><div id="reset-form-wrapper"></div>');
            $('#reset-form-wrapper').load('/snippets/reset/form', function() {
                $('#handle').attr('value',hash[0]);
                $('#token').attr('value',hash[1]);
            });

        // Bind click: Recover submit 
        $('#login').on('submit','#reset-form', function(e) {
            e.preventDefault();
            reset();
        });

        } else {
            $('#login').load('/components/generic/error');
        }
        
        function reset() {
            // Show loader
            $('#reset-msg').load('/snippets/generic/loading');
            $.post(api.data+'/reset', $('#reset-form').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    $('#login').load('/snippets/'+data.message);
                } else {
                    $('#login').load('/components/generic/error');
                }
            }, 'json');
        }

    });
}(jQuery));

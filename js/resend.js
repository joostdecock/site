(function ($) {
    $(document).ready(function () {
            $('#resend-form').submit(function(e) {
                e.preventDefault();
                $('#msg').load('/snippets/generic/loading');
                $.post(api.data+'/resend', {'resend-email': $('#resend-email').val()},function( data ) {
                    if(typeof data.message !== 'undefined') {
                        $('#msg').load('/snippets/'+data.message);
                    } else {
                        $('#msg').load('/components/generic/error');
                    }
                }, 'json');
            });
        
    });
}(jQuery));

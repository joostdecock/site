(function ($) {
    $(document).ready(function () {

        if(window.location.hash) {
            // Set loading screen
            $('#account-confirmation').load('/snippets/generic/loading');

            // AJAX API call
            var hash = window.location.hash.substring(1).split('.'); 
            $.getJSON(api.data+'/activate/'+hash[0]+'/'+hash[1], function( data ) {
                if(data.result == 'ok') {
                    $('#account-confirmation').load('/snippets/activation/success');
                    window.localStorage.setItem("jwt", data.token);
                    window.location.replace("/account");
                }
            });

        } else {
            $('#account-confirmation').load('/snippets/activation/no-such-account');
        }
    });
}(jQuery));

(function ($) {
    $(document).ready(function () {

        if(window.location.hash) {
            // Set loading screen
            $('#account-confirmation').load('/snippets/activation/placeholder');

            // Set the location of the API you want to connect to.
            var api = 'http://joost.freesewing.org:8081';

            // Puts hash in variable, and removes the # character
            var hash = window.location.hash.substring(1).split('.'); 
      
            // URL to connect to FIXME: Should be retrieved from config
            var url = api+'/activate/'+hash[0]+'/'+hash[1];
            
            // AJAX API call
            $.getJSON(url, function( data ) {
                if(data.result == 'ok') {
                    $('#account-confirmation').load('/snippets/activation/success');
                    window.location.replace("/welcome");
                }
            });

        } else {
            $('#account-confirmation').load('/snippets/activation/no-such-account');
        }
    });
}(jQuery));

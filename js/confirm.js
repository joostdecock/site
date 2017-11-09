(function ($) {
    $(document).ready(function () {

        if(window.location.hash) {
            // Set loading screen
            $('#account-confirmation').load('/snippets/generic/loading');
            
            var hash = window.location.hash.substring(1).split('.'); 

            if($('#account-confirmation').attr('data-confirm') == 'account') {
                // AJAX API call
                $.getJSON(api.data+'/activate/'+hash[0]+'/'+hash[1], function( data ) {
                    if(data.result == 'ok') {
                        $('#account-confirmation').load('/snippets/activation/success');
                        window.localStorage.setItem("jwt", data.token);
                        window.localStorage.setItem("fsu", JSON.stringify({ 'id': data.userid, 'email': data.email, 'user': data.username }));
                        setTimeout(function(){window.location.replace("/welcome");}, 2000);
                    }
                });
            }
            if($('#account-confirmation').attr('data-confirm') == 'email') {
                // AJAX API call
                $.getJSON(api.data+'/confirm/'+hash[0]+'/'+hash[1], function( data ) {
                    if(data.result == 'ok') {
                        $('#account-confirmation').load('/snippets/activation/success');
                        setTimeout(function(){window.location.replace("/");}, 2000);
                    }
                });
            }
        } else {
            $('#account-confirmation').load('/snippets/activation/no-such-account');
        }
    });
}(jQuery));

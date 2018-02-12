(function ($) {
    $(document).ready(function () {
        $('#right-to-object-details').slideUp();
        var toggleOptions = {
            text: {
                off: 'No, I do not',
                on: 'Yes, I do'
            },
            on: false,
            width: 200,
            height: 40
        }
        $('#consent-toggle-profile').toggles(toggleOptions);
        $('#consent-toggle-model').toggles(toggleOptions);
        $('#consent-toggle-patron').toggles(toggleOptions);
    });

    $('#consent-toggle-profile').on('toggle', function(e, active) {
        if (active) consentToggleOn('profile');
        else consentToggleOff('profile');
    });
    $('#consent-revoke-profile').on('click', function(e) {
        e.preventDefault();
        consentRevoke('profile');
    });
    
    $('#consent-toggle-model').on('toggle', function(e, active) {
        if (active) consentToggleOn('model');
        else consentToggleOff('model');
    });
    $('#consent-revoke-model').on('click', function(e) {
        e.preventDefault();
        consentRevoke('model');
    });
    $('#right-to-object-info').on('click', function(e) {
        e.preventDefault();
        $('#right-to-object-details').slideDown();
    });

    $('#consent-toggle-patron').on('toggle', function(e, active) {
        if (active) consentToggleOn('patron');
        else consentToggleOff('patron');
    });
    $('#consent-revoke-patron').on('click', function(e) {
        e.preventDefault();
        consentRevoke('model');
    });

    function consentToggleOn(type) {
            window.setTimeout(function() {
                $('#consent-container-'+type).addClass('consent-given');
                $('#consent-details-'+type).slideUp();
                $('.'+type+'-consent-not-given').addClass('hidden');
                $('.'+type+'-consent-given').removeClass('hidden');
            }, 500);
    }

    function consentToggleOff(type) {
        $('#consent-container-'+type).removeClass('consent-given');
        $('#consent-details-'+type).slideDown();
    }

    function consentRevoke(type) {
        $('#consent-details-'+type).slideDown();
        $('.'+type+'-consent-not-given').removeClass('hidden');
        $('.'+type+'-consent-given').addClass('hidden');
    }


}(jQuery));

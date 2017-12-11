(function ($) {
    $(document).ready(function () {
        // Bind click handler to donate button
        $('#donate-form-wrapper').on('submit','#form-donate-mockup', function(e) {
            e.preventDefault();
            $('#paypal-amount').val($('#amount').val());
            $('#form-donate').submit();
        });
    });
}(jQuery));

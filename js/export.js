(function ($) {
    $(document).ready(function () {
        
        // Bind click: Delete account button
        $('#export-btn').click(function(e) {
            e.preventDefault();
            exportData();
        });
    });
   

}(jQuery));

function exportData() {
    $('#export-title').html('Exporting data');
    $('#export-msg').html('<p>Stand by, we are exporting your data.</p><p class="text-center mt-5 mb-5"><img src="/img/logo/spinner.svg"></p>');
    $.ajax({
        url: api.data+'/export',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#export-title').html('Download your data');
            var msg = "<p>Export of your data has completed. Please click the link below to download your data</p>";
            msg += "<p>Please do not share this link with anyone, for they will be able to download your private data.</p>";
            msg += "<p>Your export will be deleted shortly, please download your archive now.</p>";
            msg += "<p class='text-right'><a href='"+api.data+data.archive+"' class='btn btn-primary btn-lg'>Download freesewing-export.zip</a></p>";
            $('#export-msg').html(msg);
        },
        error: function(data) { 
            $('#export-title').html('Aw snap!');
            $('#export-msg').load("/components/generic/error");
        },
        headers: {'Authorization': 'Bearer '+token},
    }); 
}


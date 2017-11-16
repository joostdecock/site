(function ($) {
    $(document).ready(function () {
        
        // Bind click handler to upload button
        $('#tile').on('click','#svg-btn', function(e) {
            $('#file').click();
        });
        
        // Bind click handler to submit button
        $('#tile').on('click','#submit-btn', function(e) {
            saveSettings(function(){console.log('ok');});
        });
        
        // Bind onchange event to file input
        $('#tile').on('change','#file', function() {
            var file = document.getElementById('file').files[0];
            if (file.type === "image/svg+xml") {
                if(file.size<2000000) {
                    // Show selected image
                    $.bootstrapGrowl("Loaded "+file.name, {type: 'success'});
                    var img = window.URL.createObjectURL(file);
                    $('#svg-img').attr('src',img).addClass('drop-shadow');
                    $('#step2').removeClass('hidden');

                    // Prep upload
                    var reader  = new FileReader();
                    reader.readAsDataURL(file); 
                    reader.onloadend = function() {
                        $('#svg').attr('value', reader.result);

                    }

                } else {
                    $('#svg-msg').html("Select a file below 2Mb").removeClass().addClass('alert alert-warning');
                }
            } else {
                $('#svg-msg').html("Select an SVG file").removeClass().addClass('alert alert-warning');
            }
        });
    });
   
    function saveSettings(callback) {
        $.ajax({
            url: api.data+'/tools/tile',
             method: 'POST',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(data) {
                if(data.result == 'ok') {
                    window.location.replace(data.link);
                } else {
                    $.bootstrapGrowl("Something went wrong, we were unable to convert your SVG", {type: 'error'});
                }    
            }, 
            error: function(data) { 
                $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
            },
            headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

}(jQuery));



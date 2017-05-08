(function ($) {
    $(document).ready(function () {
        var token = window.localStorage.getItem("jwt");
        if(token === null) {
            // We need a logged in user for this
            window.location.replace("/login");
        } else {
            // AJAX API call
            $.ajax({
              url: api.data+'/account',
              method: 'GET',
              dataType: 'json',
              success: function(data) {console.log(data); renderAccount(data)},
              error: function(data) { console.log(data); },
              headers: {'Authorization': 'Bearer '+token},
            }); 
            
            function renderAccount(data) {
                $('#account').load('/components/account/display', function(){
                    $('#account-username').html(data.account.username);
                    $('#account-picture').attr('src',api.data+data.account.pictureSrc);
                    $('#account-model-count').html(Object.keys(data.models).length);
                });
                $.each(data.models, function(index, model){
                    $('#models').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display'></div>");
                    $("#model-"+model.handle).load('/components/model/display', function(){
                       $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                       $('#model-'+model.handle+' a.model-link').attr('href','/model/#'+model.handle); 
                       $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                    });
                });
            }
        }

    });
}(jQuery));

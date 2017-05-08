(function ($) {

    var account;
    var page = window.location.pathname;
    
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
    
    function reRenderAccount(data) {
        $('#account-username').html(data.account.username);
        $('#account-picture').attr('src',api.data+data.account.pictureSrc);
        $('#account-model-count').html(Object.keys(data.models).length);
    }
    
    function loadAccount(callback) {
        return $.ajax({
            url: api.data+'/account',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                account = data;
                callback(data);
            },
            error: function(data) { 
                account = false;
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function renderSettings() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings'></div>");
        
        if(account.account.data.account.units == 'imperial') var units_on = true;
        else var units_on = false;
        if(account.account.data.account.theme == 'paperless') var theme_on = true;
        else var theme_on = false;
        
        $('#settings').load('/components/account/settings', function(){
            $('#email').attr('value', account.account.email);
            $('#username').attr('value', account.account.username);
            $.getScript( "/js/vendor/toggles.min.js", function(){
                $('#units-toggle').toggles({
                    text: {
                        off: 'Metric (cm)',
                        on: 'Imperial (inch)'
                    },
                    on: units_on,
                    checkbox: $('#units'),
                });
                $('#theme-toggle').toggles({
                    text: {
                        off: 'Classic',
                        on: 'Paperless'
                    },
                    on: theme_on,
                    checkbox: $('#theme'),
                });
                // Bind submit handler to save settings button
                $('#settings').on('submit','#settings-form', function(e) {
                    e.preventDefault();
                    saveSettings();
                });
                // Enable button
                $('#loader > button').removeClass('disabled');
            });
        });
    }

    function saveSettings() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');
        var user = JSON.parse(window.localStorage.getItem("user"));
        $.ajax({
          url: api.data+'/account/update',
          method: 'PUT',
          data: $('#settings-form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                closeModal();
                $.bootstrapGrowl("Settings saved", {type: 'success'});
                account.account.data = JSON.parse(data.data);
                loadAccount(reRenderAccount);
            } else {
                closeModal();
                $.bootstrapGrowl("Something went wrong, we were unable to save your settings", {type: 'error'});
                console.log(data);
            }  
          }, 
          error: function(data) { 
                $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
              console.log(data) 
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

    function closeModal() {
        $('#modal').removeClass();
        $('.burger').removeClass('hidden');
    }

    $(document).ready(function () {


       
        if(token === null) {
            // Load login box into modal ///
            $('#modal').removeClass().addClass('shown thematic');
            $('#modal-main').html("<div id='login' class='loginbox'></div>");
            $('#login').load('/snippets/login/form');
            $.getScript( "/js/login.js");
        } 
        else { // Start of logged-in block
            
            // Account page ////////////////
            if(page === '/account/') {
                loadAccount(renderAccount);
                
                // Bind click handler to settings button
                $('#account').on('click','a#settings-btn', function(e) {
                    renderSettings();
                });

            }
        } // End of logged-in block
    });
}(jQuery));

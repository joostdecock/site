(function ($) {
    $(document).ready(function () {
        $('#settings').on('click','.modal', function(e) {
            $('#modal').removeClass();
            if($(this).hasClass('light')) $('#modal').addClass('light shown');
            else if($(this).hasClass('dark')) $('#modal').addClass('dark shown');
            else if($(this).hasClass('thematic')) $('#modal').addClass('thematic shown');
            $('.burger').addClass('hidden');
        });



        var token = window.localStorage.getItem("jwt");
        if(token === null) {
            // We need a logged in user for this
            window.location.replace("/login");
        } else {
            // Bind click: Save settings button
            $('#settings').on('submit','#settings-form', function(e) {
                e.preventDefault();
                saveSettings();
            });
            
            // Bind click: Delete button
            $('#settings').on('click','a#delete', function(e) {
                e.preventDefault();
                $('#settings').load('/components/account/delete', function(){ 
                    $('#confirm').on('input', function(){
                        console.log($('#confirm').val());
                        if($('#confirm').val() == 'delete') {
                            $('#nuke').removeClass('disabled');
                        }  else {
                            if(!$('#nuke').hasClass('disabled')) {
                                $('#nuke').addClass('disabled');
                            }
                        }
                    });
                });
            });

            $('#settings').on('click','a#nuke', function(e) {
                e.preventDefault();
                $.ajax({
                  url: api.data+'/account/delete',
                  method: 'GET',
                  dataType: 'json',
                  success: function(data) {
                      window.localStorage.removeItem("jwt");
                      $('h1.page-title').html('Goodbye');
                      $('#account').remove();
                      $('#settings').remove();
                  },
                  error: function(data) { console.log(data); },
                  headers: {'Authorization': 'Bearer '+token},
                }); 
            });

            // AJAX API call
            $.ajax({
              url: api.data+'/account',
              method: 'GET',
              dataType: 'json',
              success: function(data) {console.log(data); renderAccount(data)},
              error: function(data) { window.location.replace("/login"); },
              headers: {'Authorization': 'Bearer ' + token},
            }); 
           
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
                    if(data.result == 'ok') window.location.replace("/account");
                    else {
                        console.log(data)
                    }  
                  }, 
                  error: function(data) { console.log(data) },
                  headers: {'Authorization': 'Bearer ' + token},
                }); 
            }

            function renderAccount(data) {
                $('#account').load('/components/account/display', function(){
                    $('#account-username').html(data.account.username);
                    $('#account-picture').attr('src',api.data+data.account.pictureSrc);
                    $('#account-model-count').html(Object.keys(data.models).length);
                    $('#settings-btn').remove();
                });
                if(data.account.data.account.units == 'imperial') var units_on = true;
                else var units_on = false;
                if(data.account.data.account.theme == 'paperless') var theme_on = true;
                else var theme_on = false;
                $('#settings').load('/components/account/settings', function(){
                    $('#email').attr('value', data.account.email);
                    $('#username').attr('value', data.account.username);
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
                });
            }
        }

    });
}(jQuery));

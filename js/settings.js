(function ($) {
    $(document).ready(function () {

        var token = window.localStorage.getItem("jwt");
        if(token === null) {
            // We need a logged in user for this
            window.location.replace("/login");
        } else {
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
              headers: {'Authorization': 'Bearer '+token},
            }); 
            
            function renderAccount(data) {
                $('#account').load('/components/account/display', function(){
                    $('#account-username').html(data.account.username);
                    $('#account-picture').attr('src',api.data+data.account.pictureSrc);
                    $('#account-model-count').html(Object.keys(data.models).length);
                    $('#settings-btn').remove();
                });
                $('#settings').load('/components/account/settings', function(){
                    $('#email').attr('value', data.account.email);
                    $('#username').attr('value', data.account.username);
                    $('#units-toggle').toggles({
                        text: {
                            on: 'Metric (cm)',
                            off: 'Imperial (inch)'
                        },
                        on: true,
                        checkbox: 'units',
                    });
                    $('#units-paperless').toggles({
                        text: {
                            on: 'Classic',
                            off: 'Paperless'
                        },
                        on: true,
                        checkbox: 'paperless',
                    });
                });
            }
        }

    });
}(jQuery));

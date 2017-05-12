(function ($) {

    var account;
    var model;
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

    function renderAccountSettings() {
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
            $('#picture-key').css('background-image', "url("+api.data+account.account.pictureSrc+")");
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
                    saveAccountSettings();
                });
                // Bind click handler to picture button
                $('#settings').on('click','#picture-btn', function(e) {
                    $('#file').click();
                });
                // Bind onchange event to file input
                $('#settings').on('change','#file', function() {
                    var file = document.getElementById('file').files[0];
                    if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif") {
                        if(file.size<2000000) {
                            // Show selected image
                            $('#picture-msg').html("Loaded "+file.name).removeClass().addClass('alert alert-success');
                            var img = window.URL.createObjectURL(file);
                            $('#picture-key').css('background-image', "url("+img+")");

                            // Prep upload
                            var reader  = new FileReader();
                            reader.readAsDataURL(file); 
                            reader.onloadend = function() {
                                $('#picture').attr('value', reader.result);
                            }

                        } else {
                            $('#picture-msg').html("Select a file below 2Mb").removeClass().addClass('alert alert-warning');
                        }
                    } else {
                        $('#picture-msg').html("Select a JPG, PNG, or GIF").removeClass().addClass('alert alert-warning');
                    }
                });
                // Enable button
                $('#loader > button').removeClass('disabled');
            });
        });
    }

    function saveAccountSettings() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');

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
            }  
          }, 
          error: function(data) { 
              $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

    function closeModal() {
        $('#modal').removeClass();
        $('.burger').removeClass('hidden');
    }

    function loadModel(handle, callback) {
        return $.ajax({
            url: api.data+'/model/'+handle,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                model = data;
                callback(data);
            },
            error: function(data) { 
                account = false;
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function renderMeasurements() {
        $('#measurements-list > tr').remove();
        var pc = modelCompleteFactor();
        if(pc>75) var bar = 'bg-primary';
        else if(pc>50) var bar = 'bg-success'; 
        else if(pc>25) var bar = 'bg-warning';
        else var bar = 'bg-danger';
        $('.progress-bar').css('width',pc+'%').html(pc+'%').removeClass().addClass('progress-bar '+bar);
        $.get('/img/icons/svg/pencil.svg', function(pencilobject) {
            var serializer = new XMLSerializer();
            var row;
            var pencil = serializer.serializeToString(pencilobject);
            var first;
            var second;
            $.each(measurements.measurements, function(index, measurement){
                if(measurement.body == 'all' || measurement.body == model.model.body) {
                    if(typeof model.model.data.measurements[index] !== "undefined") {
                        first += "<tr>" +
                            "<td class='name'>"+index+"&nbsp;:</td>" +
                            "<td nowrap class='value "+model.model.units+"'>"+model.model.data.measurements[index]+"</td>" +
                            "<td class='edit'><a href='#"+model.model.handle+"' data-measurement='"+index+"' class='edit'>"+pencil+"</a></td>" +
                        "</tr>";
                    } else {
                        second += "<tr data-measurement='"+index+"' class='empty'>" +
                            "<td class='name empty' colspan='2'>"+index+"</td>" +
                            "<td class='add'><a href='#"+model.model.handle+"' data-measurement='"+index+"' class='add'>Add</a></td>" +
                        "</tr>";
                    }
                }
            });
            $('#measurements-list').append(first+second);
        });
    }

    function renderModel(data) {
        $('h1.page-title').html(data.model.name);
        $('#model').load('/components/model/page', function(){
            marked = $.getScript( "/js/vendor/marked.min.js", function(){
                marked.setOptions({sanitize: true});
                $('#notes-inner').html(marked(data.model.notes));
            });
            $('.hashlink').attr('href', '#'+data.model.handle);
            $('#model-name').html(data.model.name);
            $('#model-picture').attr('src',api.data+data.model.pictureSrc);
            // Check whether we have any data at all
            if(data.model.data === "") data.model.data = {measurements: ''};
            $('#model-measurement-count').html(Object.keys(data.model.data.measurements).length);
            $('#model-draft-count').html(Object.keys(data.drafts).length);
            $.get('/json/measurements.json', function( mdata ) {
                measurements = mdata;
                $('#measurements').append("<div id='progressbar'></div>");
                $('#progressbar').load('/snippets/generic/progress', function(){
                    var pc = modelCompleteFactor();
                    if(pc>75) $('.progress-bar').addClass('bg-primary');
                    else if(pc>50) $('.progress-bar').addClass('bg-success');
                    else if(pc>25) $('.progress-bar').addClass('bg-warning');
                    else $('.progress-bar').addClass('bg-danger');
                    $('.progress-bar').css('width',pc+'%').html(pc+'%');
                });
                $('#measurements').append("<table id='measurements-list' class='rounded-rows table'></table>");
                $('#measurements-list').append("<thead><tr><th>Measurement</th><th>Value</th><th>&nbsp;</th></tr></thead>");
                renderMeasurements();
                // Bind click handler to edit link
                $('#measurements-list').on('click','a.edit', function(e) {
                    renderMeasurementSettings($(this).attr('data-measurement'));
                });
                // Bind click handler to add link
                $('#measurements-list').on('click','a.add', function(e) {
                renderMeasurementSettings($(this).attr('data-measurement'));
                });
            });
            // FIXME add drafts
        });
    }

    function renderMeasurementSettings(measurement) {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings'></div>");
        $('#settings').load('/components/measurement/settings', function(){
            $('#measurement-main-title').html(measurement);
            $('#m').attr('name', measurement).attr('id',measurement+'-input')
            $('#settings-form span.form-units').addClass(model.model.units);
            $('#'+measurement+'-input').val(model.model.data.measurements[measurement]);
            // Bind submit handler
            $('#settings').on('submit','#settings-form', function(e) {
                e.preventDefault();
                model.model.data.measurements[measurement] = Number($('#'+measurement+'-input').val());
                saveModelData();
            });

        });

    }

    function modelCompleteFactor() {
        return Math.round(Object.keys(model.model.data.measurements).length / (Object.keys(measurements.measurements).length/100));
    }

    function renderModelSettings() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings'></div>");
        
        if(model.model.units == 'imperial') var units_on = true;
        else var units_on = false;
        if(model.model.body == 'female') var body_on = true;
        else var body_on = false;
        
        $('#settings').load('/components/model/settings', function(){
            $('.hashlink').attr('href', '#'+model.model.handle);
            $('#name').attr('value', model.model.name);
            $('#picture-key').css('background-image', "url("+api.data+model.model.pictureSrc+")");
            $.getScript( "/js/vendor/toggles.min.js", function(){
                $('#units-toggle').toggles({
                    text: {
                        off: 'Metric (cm)',
                        on: 'Imperial (inch)'
                    },
                    on: units_on,
                    checkbox: $('#units'),
                });
                $('#body-toggle').toggles({
                    text: {
                        off: 'Male',
                        on: 'Female'
                    },
                    on: body_on,
                    checkbox: $('#body'),
                });
                // Bind submit handler to save settings button
                $('#settings').on('submit','#settings-form', function(e) {
                    e.preventDefault();
                    saveModelSettings();
                });
                // Bind click handler to picture button
                $('#settings').on('click','#picture-btn', function(e) {
                    $('#file').click();
                });
                // Bind onchange event to file input
                $('#settings').on('change','#file', function() {
                    var file = document.getElementById('file').files[0];
                    if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif") {
                        if(file.size<2000000) {
                            // Show selected image
                            $('#picture-msg').html("Loaded "+file.name).removeClass().addClass('alert alert-success');
                            var img = window.URL.createObjectURL(file);
                            $('#picture-key').css('background-image', "url("+img+")");

                            // Prep upload
                            var reader  = new FileReader();
                            reader.readAsDataURL(file); 
                            reader.onloadend = function() {
                                $('#picture').attr('value', reader.result);
                            }

                        } else {
                            $('#picture-msg').html("Select a file below 2Mb").removeClass().addClass('alert alert-warning');
                        }
                    } else {
                        $('#picture-msg').html("Select a JPG, PNG, or GIF").removeClass().addClass('alert alert-warning');
                    }
                });
                // Enable button
                $('#loader > button').removeClass('disabled');
            });
        });
    }

    function renderModelNotepad() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        
        $('#modal-main').load('/components/model/notepad', function(){
            $('.hashlink').attr('href', '#'+model.model.handle);
            $('#notes').val(model.model.notes);
            // Bind submit handler to save settings button
            $('#notepad').on('submit','#notes-form', function(e) {
                e.preventDefault();
                saveModelNotes();
            });
            // Bind click handler to enlarge button
            $('#notepad').on('click','#notes-enlarge', function(e) {
                e.preventDefault();
                $('#notes').attr('rows',parseInt($('#notes').attr('rows'))+10);
            });
            // Bind click handler to preview button
            $('#notepad').on('click','#notes-preview', function(e) {
                e.preventDefault();
                $('#notes-form').addClass('hidden');
                $('#notepad').append("<div id='preview'></div>");
                $('#preview').load('/components/model/notepad-preview', function() {
                    $('.hashlink').attr('href', '#'+model.model.handle);
                    $('#notepad-preview').html(marked($('#notes').val()));
                    $('#notepad-preview-buttons').on('click','#notes-preview-edit', function(e) {
                        $('#preview').remove();
                        $('#notes-form').removeClass('hidden');
                    });
                    $('#notepad-preview-buttons').on('click','#notes-preview-save', function(e) {
                        $('#preview').remove();
                        $('#notes-form').removeClass('hidden').submit();
                    });
                });
            });
        });
    }

    function saveModelSettings() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');

        $.ajax({
          url: api.data+'/model/'+model.model.handle+'/update',
          method: 'PUT',
          data: $('#settings-form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                closeModal();
                $.bootstrapGrowl("Settings saved", {type: 'success'});
                loadModel(model.model.handle, reRenderModel);
            } else {
                closeModal();
                $.bootstrapGrowl("Something went wrong, we were unable to save your settings", {type: 'error'});
            }  
          }, 
          error: function(data) { 
              $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

    function saveModelNotes() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');

        $.ajax({
          url: api.data+'/model/'+model.model.handle+'/update',
          method: 'PUT',
          data: $('#notes-form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                closeModal();
                $.bootstrapGrowl("Notes saved", {type: 'success'});
                loadModel(model.model.handle, reRenderModel);
            } else {
                closeModal();
                $.bootstrapGrowl("Something went wrong, we were unable to save your notes", {type: 'error'});
            }  
          }, 
          error: function(data) { 
              $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

    function saveModelData() {
        $.ajax({
          url: api.data+'/model/'+model.model.handle+'/update',
          method: 'PUT',
          data: {'data': JSON.stringify(model.model.data)},
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                closeModal();
                $.bootstrapGrowl("Model data saved", {type: 'success'});
                renderMeasurements();
            } else {
                closeModal();
                $.bootstrapGrowl("Something went wrong, we were unable to save your model data", {type: 'error'});
            }  
          }, 
          error: function(data) { 
              $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }

    function reRenderModel(data) {
        $('h1.page-title').html(data.model.name);
        $('#model-picture').attr('src',api.data+data.model.pictureSrc);
        $('#notes-inner').html(marked(data.model.notes));
        if(data.model.units === 'metric') $('.imperial').removeClass('imperial').addClass('metric');
        else $('.metric').removeClass('metric').addClass('imperial');
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
                    renderAccountSettings();
                });

                // Bind click: Delete account button
                $('a#delete-btn').click(function(e) {
                    e.preventDefault();
                    $('#modal').removeClass().addClass('shown light');
                    $('#modal-main').html("<div id='delete'></div>");
                    $('#delete').load('/components/account/delete', function(){ 
                        $('#confirm').on('input', function(){
                            if($('#confirm').val().toLowerCase() == 'delete') {
                                $('#nuke').removeClass('disabled');
                            }  else {
                                if(!$('#nuke').hasClass('disabled')) {
                                    $('#nuke').addClass('disabled');
                                }
                            }
                        });
                        // Bind click: Nuke account button
                        $('#delete').on('click','a#nuke', function(e) {
                            e.preventDefault();
                            $.ajax({
                              url: api.data+'/account/delete',
                              method: 'GET',
                              dataType: 'json',
                              success: function(data) {
                                  window.localStorage.removeItem("jwt");
                                  $('#modal-main').html("<h2>Goodby</h2><p>We'll send you to the homepage, ok?</p>");
                                  setTimeout(function(){ window.location.replace("/"); }, 2000);
                              },
                              error: function(data) { 
                                  $('#modal-main').load("/snippets/generic/error");
                              },
                              headers: {'Authorization': 'Bearer '+token},
                            }); 
                        });

                    });
                });
            }
            // Model page ////////////////
            if(page === '/model/') {
                var marked;
                var measurements;
                loadModel(window.location.hash.substr(1), renderModel);
                
                // Bind click handler to settings button
                $('#model').on('click','a#settings-btn', function(e) {
                    renderModelSettings();
                });
                
                // Bind click handler to notes button
                $('#update-notes').click(function(e) {
                    renderModelNotepad();
                });
            }
        } // End of logged-in block
    });
}(jQuery));

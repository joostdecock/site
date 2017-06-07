(function ($) {

    var account;
    var model;
    var page = window.location.pathname;
    
    function renderAccount(data) {
        $('#account-username').html(data.account.username);
        $('#account-picture').attr('src',api.data+data.account.pictureSrc);
        $('#account-model-count').html(Object.keys(data.models).length);
        $('#account-draft-count').html(Object.keys(data.drafts).length);
        if(data.models === false) {
            $('#models-title').html('Start by adding a model');
            $('#models').append("<div class='col-md-12'><p>A model holds measurements. We need those measurement to draft patterns for you. So go ahead and <a href='#' class='add-model'>create your first model</a>.</p></div>");
            $('#drafts-title').remove();
        } else {
            $.each(data.models, function(index, model){
                $('#models').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display'></div>");
                $("#model-"+model.handle).load('/components/model/display', function(){
                    $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                    $('#model-'+model.handle+' a.model-link').attr('href','/models/'+model.handle); 
                    $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                });
            });
            if(data.drafts === false || typeof data.drafts === 'undefined') {
                $('#drafts-title').html('No drafts yet');
                $('#drafts').append("<div class='col-md-12'><p>Drafts are what we do, you should try it sometime.</p></div>");
            }
            $('#drafts').append("<div class='col-md-12 text-center mb-5'><a href='' class='btn btn-primary btn-lg mt-3 add-draft'>Add draft</a></div>");
        }
    }
    
    function renderModelWizard() {
        // Load wizard into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings' class='loginbox' style='overflow: hidden;'></div>");
        $('#settings').load('/components/model/add', function(){
            $('#login-panel').on('click','#show-body-type', function(e) {
                e.preventDefault();
                $('#login-panel').addClass('move');
            });
            $.getScript( "/js/vendor/toggles.min.js", function(){
                $('#body-toggle').toggles({
                    text: {
                        off: 'No breasts',
                        on: 'Breasts'
                    },
                    on: false,
                    checkbox: $('#body'),
                });
                $('#settings').on('submit','#new-model-form', function(e) {
                    e.preventDefault();
                    createModel($('#new-model-form').serialize());
                });
            });
        });

    }
    
    function createModel(data) {
        $('#loader').load('/snippets/generic/spinner');
        $.ajax({
            url: api.data+'/model',
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                window.location.replace("/models/"+data.handle);
            },
            error: function(data) { 
                $('#loader').load('/components/generic/error');
            },
            headers: {'Authorization': 'Bearer '+token},
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
                // eff this, you need to be logged in
                window.location.replace("/login");
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
          url: api.data+'/account',
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
            success: function(returndata) {
                model = returndata;
                callback(returndata);
            },
            error: function(returndata) { 
                account = false;
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function renderMeasurements(filter) {
        $('#measurements-list tr').remove();
        var pc = modelCompleteFactor();
        if(pc>75) var bar = 'bg-primary';
        else if(pc>50) var bar = 'bg-success'; 
        else if(pc>25) var bar = 'bg-warning';
        else var bar = 'bg-danger';
        $('.progress-bar').css('width',pc+'%').html(pc+'%').removeClass().addClass('progress-bar '+bar);
        var serializer = new XMLSerializer();
        var row;
        var first;
        var second;
        $.each(measurements, function(measurement, shape){
            if(shape == 'all' || shape == model.model.body || typeof filter !== "undefined") {
                if(typeof model.model.data.measurements[measurement] !== "undefined") {
                    if(typeof filter === 'undefined' || typeof filter[measurement] !== "undefined") {
                        first += "<tr>" +
                            "<td class='name'>"+measurement+"&nbsp;:</td>" +
                            "<td nowrap class='value "+model.model.units+"'>"+model.model.data.measurements[measurement]+"</td>" +
                            "<td class='edit'><a href='#' data-measurement='"+measurement+"' class='edit'><i class='fa fa-2x fa-pencil' aria-hidden='true'></i></a></td>" +
                        "</tr>";
                    }
                } else {
                    if(typeof filter === 'undefined' || typeof filter[measurement] !== "undefined") {
                        second += "<tr data-measurement='"+measurement+"' class='empty'>" +
                            "<td class='name empty' colspan='2'>"+measurement+"</td>" +
                            "<td class='add'><a href='#' data-measurement='"+measurement+"' class='add'><i class='fa fa-plus' aria-hidden='true'></i></a></td>" +
                        "</tr>";
                    }
                }
            }
        });
        $('#measurements-list').append(first+second);
    }

    function renderModel(data) {
        $('h1.page-title').html(data.model.name);
        $('ul.breadcrumbs li:last-child').html(data.model.name);
        $('#model').load('/components/model/page', function(){
            marked = $.getScript( "/js/vendor/marked.min.js", function(){
                marked.setOptions({sanitize: true});
                $('#notes-inner').html(marked(data.model.notes));
            });
            $('#model-name').html(data.model.name);
            $('#model-picture').attr('src',api.data+data.model.pictureSrc);
            // Check whether we have any data at all
            if(data.model.data === "" || data.model.data === null) data.model.data = {measurements: ''};
            $('#model-measurement-count').html(Object.keys(data.model.data.measurements).length);
            $('#model-draft-count').html(Object.keys(data.drafts).length);
            // Load site data
            $.get('/json/freesewing.json', function( fsdata ) {
                measurements = fsdata.measurements;
                $('#measurements').append("<div id='progressbar'></div>");
                $('#measurements').append("<div id='filter-wrapper' class='text-center mt-4 mb-2'>Filter by pattern: </div>");
                $('#filter-wrapper').load('/components/generic/filter-pattern', function(){
                    $.each(fsdata.namespaces, function(namespace, patternlist){
                        $('#filter-patterns-select').append('<optgroup id="pattern-filter-namespace-'+namespace+'" label="'+namespace+'"></optgroup');
                        $.each(patternlist, function(index, name){
                            $('#pattern-filter-namespace-'+namespace).append('<option data-namespace="'+namespace+'" value="'+name+'">'+fsdata.mapping.handleToPatternTitle[name]+'</option>"');
                        });
                    });
                    // Bind change of filter
                    $('#filter-wrapper').on('change', '#filter-patterns-select', function(e) {
                        if($('#filter-patterns-select').val() === 'all') renderMeasurements();
                        else renderMeasurements(fsdata.patterns[fsdata.mapping.handleToPattern[$('#filter-patterns-select').val()]].measurements);
                    });
                });
                $('#progressbar').load('/components/generic/progress', function(){
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
            // Bind show instructions handler
            $('#settings').on('click','#show-instructions', function(e) {
                $('#instructions').load('/components/measurements/'+measurement.toLowerCase());
                $('#show-instructions').addClass('hidden');
                $('#hide-instructions').removeClass('hidden');
            });
            // Bind hide instructions handler
            $('#settings').on('click','#hide-instructions', function(e) {
                $('#instructions').html('');
                $('#hide-instructions').addClass('hidden');
                $('#show-instructions').removeClass('hidden');
            });
            // Bind submit handler
            $('#settings').on('submit','#settings-form', function(e) {
                e.preventDefault();
                // Is measurements already an object?
                if(typeof(model.model.data.measurements) === 'string' || model.model.data.measurements === null) {
                    var measurementsObject = {};
                    measurementsObject[measurement] = Number($('#'+measurement+'-input').val());
                    model.model.data.measurements = measurementsObject;
                } else {
                    model.model.data.measurements[measurement] = Number($('#'+measurement+'-input').val());
                }
                saveModelData();
            });

        });

    }

    function renderDraftSettings() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings'></div>");
        if(draft.shared == '1') var shared_on = true;
        else var shared_on = false;
        $('#settings').load('/components/draft/settings', function(){
            $('#name').attr('value', draft.name);
            $.getScript( "/js/vendor/toggles.min.js", function(){
                $('#shared-toggle').toggles({
                    text: {
                        off: 'No',
                        on: 'Yes'
                    },
                    on: shared_on,
                    checkbox: $('#shared'),
                });
                // Bind submit handler to save settings button
                $('#settings').on('submit','#settings-form', function(e) {
                    e.preventDefault();
                    saveDraftSettings();
                });
                // Enable button
                $('#loader > button').removeClass('disabled');
            });
        });
    }

    function modelCompleteFactor() {
        return Math.round(Object.keys(model.model.data.measurements).length / (Object.keys(measurements).length/100));
    }

    function renderModelSettings() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='settings'></div>");
        
        if(model.model.units == 'imperial') var units_on = true;
        else var units_on = false;
        if(model.model.body == 'female') var body_on = true;
        else var body_on = false;
        if(model.model.shared == '1') var shared_on = true;
        else var shared_on = false;
        $('#settings').load('/components/model/settings', function(){
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
                        off: 'No breasts',
                        on: 'Breasts'
                    },
                    on: body_on,
                    checkbox: $('#body'),
                });
                $('#shared-toggle').toggles({
                    text: {
                        off: 'No',
                        on: 'Yes'
                    },
                    on: shared_on,
                    checkbox: $('#shared'),
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
        
        $('#modal-main').load('/components/generic/notepad', function(){
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
                $('#preview').load('/components/generic/notepad-preview', function() {
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

    function renderDraftNotepad() {
        // Load settings into modal
        $('#modal').removeClass().addClass('shown light');
        
        $('#modal-main').load('/components/generic/notepad', function(){
            $('#notes').val(draft.notes);
            // Bind submit handler to save settings button
            $('#notepad').on('submit','#notes-form', function(e) {
                e.preventDefault();
                saveDraftNotes();
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
                $('#preview').load('/components/generic/notepad-preview', function() {
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
          url: api.data+'/model/'+model.model.handle,
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

    function saveDraftSettings() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');

        $.ajax({
          url: api.data+'/draft/'+draft.handle,
          method: 'PUT',
          data: $('#settings-form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                reRenderDraft(data);
                closeModal();
                $.bootstrapGrowl("Settings saved", {type: 'success'});
                //loadModel(model.model.handle, reRenderModel);
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
          url: api.data+'/model/'+model.model.handle,
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

    function saveDraftNotes() {
        // Show loader
        $('#loader').load('/snippets/generic/spinner');

        $.ajax({
          url: api.data+'/draft/'+draft.handle,
          method: 'PUT',
          data: $('#notes-form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                closeModal();
                $.bootstrapGrowl("Notes saved", {type: 'success'});
                reRenderDraft(data);
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
          url: api.data+'/model/'+model.model.handle,
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

    function reRenderDraft(data) {
        $('h1.page-title').html(data.name);
        $('#notes-inner').html(marked(data.notes));
        draft.shared = data.shared;
        draft.name = data.name;
        draft.notes = data.notes;
    }

    function renderModelSelection(account,patternhandle) {
        var filter = {'ok':[], 'ko': []};
        // Load site data
        $.get('/json/freesewing.json', function( fsdata ) {
            var pattern = fsdata.patterns[fsdata.mapping.handleToPattern[patternhandle]];
            // Count measurements required by pattern
            var pmcount = Object.keys(pattern.measurements).length;
            $.each(account.models, function(handle, model){
                // Quick check, how many measurement?
                if(typeof model.data.measurements === "undefined" || Object.keys(model.data.measurements).length < pmcount) {
                    filter.ko.push(model);
                } else {
                    var modelok = true;
                    // Thorough check, are they the required measurements?
                    $.each(pattern.measurements, function(index, measurement) {
                        if (typeof model.data.measurements[index] !== "number") modelok = false;
                    });
                    if(modelok) filter.ok.push(model);
                    else filter.ko.push(model);
                }
                if ((filter.ok.length+filter.ko.length) === Object.keys(account.models).length) {
                    // We're ready
                    if(filter.ok.length > 0) {
                        // We have models good to go
                        $.each(filter.ok, function(index, model){
                            $('#ok-models').append('<li><a href="'+page+'/for/'+model.handle+'" class="px-1">'+model.name+'</a></li>');
                            var card = $('#model-card').clone();
                            $('#picklist').append('<a href="'+page+'/for/'+model.handle+'" id="link-'+model.handle+'" class="card-wrap-link"></a>');
                            card.attr('id','model-'+model.handle).appendTo('#link-'+model.handle);
                            $('#model-'+model.handle+' h3.card-title').html(model.name);
                            $('#model-'+model.handle+' img').attr('src',api.data+model.pictureSrc);
                            $('#model-'+model.handle+' p.card-text').html('Model '+model.handle);
                        });
                        $('#model-card').remove();
                        var ko = $('#ko-models').detach()
                        ko.appendTo('#picklist');
                    } else {
                        $('#ok-models').remove();
                        $('#model-card').addClass('card-primary card-inverse');
                        $('#model-card img').attr('src','/img/patterns/missing.svg');
                        $('#model-card h3.card-title').html('Grab your tape measure');
                        $('#model-card p.card-text').html('None of your models have all the required measurements for this pattern. You need to add measurements before we can draft this pattern.');
                        $('#ko-models').detach().appendTo('#picklist');
                    }
                    if(filter.ko.length > 0) {
                        // We've got some KO models
                        $.each(filter.ko, function(index, model){
                            $('#ko-models').append('<li><a href="/models/'+model.handle+'" class="px-1">'+model.name+'</a></li>');
                        });
                    }
                }
            });
        });
    }

    function renderDraftForm(account,patternhandle,modelhandle,defaults=false) {
        // Load site data
        $.get('/json/freesewing.json', function( fsdata ) {
            var pattern = fsdata.patterns[fsdata.mapping.handleToPattern[patternhandle]];
            // Load slider JS
            $.getScript( "/js/vendor/bootstrap-slider.min.js", function(){
                $('#picklist').append("<form id='form'><div id='accordion' role='tablist' aria-multiselectable='true'></div></form>");
                var form = {};
                form.groups = {};
                if(account.account.data.account.units === 'imperial') var ufactor = 25.4;
                else var ufactor = 10;
                $.each(pattern.options, function(option, o) {
                    // Load defaults from for (if provided)
                    if(defaults !== false && typeof defaults[option] !== 'undefined') {
                        if(o.type === 'measure') o.default = (defaults[option] * ufactor);
                        else o.default = defaults[option];
                    }
                    if(typeof form.groups[o.group] === 'undefined') form.groups[o.group] = {};
                    form.groups[o.group][option] = o;
                });
                // Add hidden form fields
                $('#form').append('<input type="hidden" name="pattern" value="'+fsdata.mapping.handleToPattern[patternhandle]+'"><input type="hidden" name="model" value="'+modelhandle+'">');
                if (page.substr(0,9) === '/redraft/') $('#form').append('<input type="hidden" name="draft" value="'+page.split('/')[2]+'">');
                // Load defaults for theme and langauge from fork (if provided)
                if(defaults !== false && typeof defaults.theme !== 'undefined') dflt_theme = defaults.theme;
                else dflt_theme = 'Basic';
                if(defaults !== false && typeof defaults.lang !== 'undefined') dflt_lang = defaults.lang;
                else dflt_lang = 'en';
                // Sort form groups and prepend theme/language
                var ordered = {
                    'general': {
                        'theme': {
                            'default': dflt_theme,
                            'description': 'Use the paperless theme when you want a pattern that does not require printing',
                            'title': 'Theme',
                            'type': 'chooseOne',
                            'options': {
                                'Basic': 'Classic',
                                'Paperless': 'Paperless'
                            }
                        },
                        'lang': {
                            'default': dflt_lang,
                            'description': 'This pattern is available in the following languages:',
                            'title': 'Language',
                            'type': 'chooseOne',
                            'options': pattern.languages
                        }
                    }
                };
                Object.keys(form.groups).sort().forEach(function(key) {
                    var subordered = {};
                    Object.keys(form.groups[key]).sort().forEach(function(subkey) {
                        subordered[subkey] = form.groups[key][subkey];
                    });
                    ordered[key] = subordered;
                });
                var show = ' show ';
                $.each(ordered, function(title, group) {
                    $('#accordion').append("<div id='group-"+title+"' class='card'><div class='card-header' role='tab' id='heading-"+title+"'><h3 class='text-capitalize'><a data-toggle='collapse' data-parent='#accordion' href='#collapse-"+title+"' aria-expanded='false' aria-controls='collapse-"+title+"'>"+title+"</a></h3></div><div id='collapse-"+title+"' class='collapse "+show+"' role='tabpanel'aria-labeledby='heading-"+title+"' aria-expanded='false'><div class='card-block' id='content-"+title+"'></div></div>");
                    $.each(group, function(name, option) {
                        $('#content-'+title).append(renderOption(name, option, account.account.data.account.units));
                    });
                    show = '';
                });
                $('#form').append('<p class="text-center mt-5"><input type="submit" class="btn btn-lg btn-primary" value="Draft pattern"></p>');
                // Bind slide event to slider inputs
                $('#accordion').on('change', 'input.slider', function(e) {
                    $('#'+e.target.id+'-value').html(e.value.newValue);    
                    if(e.value.newValue != $('#'+e.target.id+'-default').attr('data-default')) $('#'+e.target.id+'-default').removeClass('disabled invisible'); 
                    else $('#'+e.target.id+'-default').addClass('disabled invisible');
                });
                // Bind change event to radio buttons
                $('#accordion').on('change', 'input[type=radio]', function(e) {
                    $('#'+$(this).attr('name')+'-value').html($(this).attr('data-label'));
                    if($(this).val() != $('#'+e.target.id).attr('data-default')) $('#'+$('#'+e.target.id).attr('name')+'-default').removeClass('disabled invisible'); 
                    else $('#'+$('#'+e.target.id).attr('name')+'-default').addClass('disabled invisible');
                });
                // Bind click event to reset buttons
                $('#accordion').on('click', 'a.option-reset', function(e) {
                    e.preventDefault();
                    if($(this).attr('data-type') === 'radio') $('input:radio[name='+$(this).attr('data-option')+'][value='+$(this).attr('data-default')+']').click();
                    else $('#'+$(this).attr('data-option')).slider('setValue',$(this).attr('data-default'), false, true); // See https://github.com/seiyria/bootstrap-slider
                });
                // Bind click event to help buttons
                $('#accordion').on('click', 'a.option-help', function(e) {
                    e.preventDefault();
                    modalHelp(patternhandle, $(this).attr('data-option'));
                });
                // Bind submit handler to quick submit link
                $('#picklist').on('click','#submit-link', function(e) {
                    e.preventDefault();
                    $('#form').submit();
                });
                // Bind submit handler to save settings button
                $('#picklist').on('submit','#form', function(e) {
                    e.preventDefault();
                    draftPattern();
                });
            });
        });
    }

    function modalHelp(pattern, option) {
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html('<img src="/img/logo/spinner.svg" alt="Loading...">');
        $.ajax({
            // Fetching documentation for this option
            url: '/components/pattern-options/'+pattern.toLowerCase()+'/'+option.toLowerCase(),
            method: 'GET',
            dataType: 'html',
            success: function(data) {
                // add to page
                $('#modal-main').html("<div class='m800 paper'><h2>"+option+"</h2>"+data+"</div>");
            },
            error: function(data) {
                // show msg that we don't seem to have docs for this option 
                var msg = '<div class="m800"><blockquote class="error">';
                msg += '<h5>This documentation is missing</h5>';
                msg += '<p>We don\'t seem to have documentation for the <b>'+option+'</b> option. That shouldn\'t happen, so I encourage you to report this.<p>';
                msg += '</blockquote>';
                msg += '<blockquote class="link">';
                msg += '<h5>Help us out and submit this report</h5>';
                msg += '<p>Looks like you\'ve hit a snag. Those things happen, but you could help us prevent it from happening in the future.</p>';
                msg += 'We have gathered all the info we need to investigate this, but we need you to take the last step of submitting the issue to GitHub.</p>';
                msg += '<p>So would you do us a favor and report this? Thank you :)</p>';
                msg += '<p><a target="_BLANK" class="btn btn-primary" ';
                msg += 'href="https://github.com/freesewing/site/issues/new?title='+pattern+' '+option+' option is undocumented';
                msg += '&labels[]=documentation';
                msg += '&body=The '+option+' option of the '+pattern+' pattern is undocumented.';
                msg += '%0A%0AFeel free to include comments, but please keep the line above intact.">';
                msg += 'Send report to GitHub</a></p>';
                msg += '<p>PS: This will open a new window where you just have to click the <b>Submit new issue</b> button.</p></blockquote></div>';
                $('#modal-main').html(msg);
            },
        }); 
    }

    function renderOption(name, option, units) {
        switch(option.type) {
            case 'measure':
                if(units === 'imperial') var udiv = 25.4;
                else var udiv = 10
                var html = '<div class="form-group ">';
                html += '<label for="'+name+'">';
                html += '<a href="#" id="'+name+'-help" class="mt-4 btn btn-outline-primary btn-sm option-help" style="float: right;" data-option="'+name+'">Help</a>';
                html += '<a href="#" id="'+name+'-default" class="mt-4 btn btn-outline-primary btn-sm mr-2 disabled btn-outline-info invisible option-reset" style="float: right;" data-option="'+name+'" data-default="'+(option.default/udiv)+'" data-type="slider">Reset</a>';
                html += '<h5 class="mt-3">'+option.title+': <span class="value-'+units+'" id="'+name+'-value">'+(option.default/udiv)+'</span></h5> '+option.description+'</label>';
                html += '<div class="input-group">';
                html += '<input class="slider" id="'+name+'" type="text" name="'+name+'" data-provide="slider" ';
                html += 'data-slider-id="'+name+'-slider" ';
                html += 'data-slider-step="0.05" ';
                html += 'data-slider-min="'+(option.min/udiv)+'" data-slider-max="'+(option.max/udiv)+'" ';
                html += 'data-slider-value="'+(option.default/udiv)+'" data-slider-tooltip="hide" >'; 
                html += '</div>';
                html += '</div>';
                break;
            case 'percent':
                if(typeof option.min === "undefined") option.min = 0;
                if(typeof option.max === "undefined") option.max = 100;
                var html = '<div class="form-group ">';
                html += '<label for="'+name+'">';
                html += '<a href="#" id="'+name+'-help" class="mt-4 btn btn-outline-primary btn-sm option-help" style="float: right;" data-option="'+name+'">Help</a>';
                html += '<a href="#" id="'+name+'-default" class="mt-4 btn btn-outline-primary btn-sm mr-2 disabled btn-outline-info invisible option-reset" style="float: right;" data-option="'+name+'" data-default="'+option.default+'" data-type="slider">Reset</a>';
                html += '<h5 class="mt-3">'+option.title+': <span class="value-percent" id="'+name+'-value">'+option.default+'</span></h5> '+option.description+'</label>';
                html += '<div class="input-group">';
                html += '<input class="slider" id="'+name+'" type="text" name="'+name+'" data-provide="slider" ';
                html += 'data-slider-id="'+name+'-slider" ';
                html += 'data-slider-step="0.1" ';
                html += 'data-slider-min="'+option.min+'" data-slider-max="'+option.max+'" ';
                html += 'data-slider-value="'+option.default+'" data-slider-tooltip="hide" >'; 
                html += '</div>';
                html += '</div>';
                break;
            case 'angle':
                var html = '<div class="form-group ">';
                html += '<label for="'+name+'">';
                html += '<a href="#" id="'+name+'-help" class="mt-4 btn btn-outline-primary btn-sm option-help" style="float: right;" data-option="'+name+'">Help</a>';
                html += '<a href="#" id="'+name+'-default" class="mt-4 btn btn-outline-primary btn-sm mr-2 disabled btn-outline-info invisible option-reset" style="float: right;" data-option="'+name+'" data-default="'+option.default+'" data-type="slider">Reset</a>';
                html += '<h5 class="mt-3">'+option.title+': <span class="value-angle" id="'+name+'-value">'+option.default+'</span></h5> '+option.description+'</label>';
                html += '<div class="input-group">';
                html += '<input class="slider" id="'+name+'" type="text" name="'+name+'" data-provide="slider" ';
                html += 'data-slider-id="'+name+'-slider" ';
                html += 'data-slider-step="0.1" ';
                html += 'data-slider-min="'+option.min+'" data-slider-max="'+option.max+'" ';
                html += 'data-slider-value="'+option.default+'" data-slider-tooltip="hide" >'; 
                html += '</div>';
                html += '</div>';
                break;
            case 'chooseOne':
                var html = '<fieldset class="form-group">';
                html += '<legend>';
                html += '<a href="#" id="'+name+'-help" class="mt-4 btn btn-outline-primary btn-sm option-help" style="float: right;" data-option="'+name+'">Help</a>';
                html += '<a href="#" id="'+name+'-default" class="mt-4 btn btn-outline-primary btn-sm mr-2 disabled btn-outline-info invisible option-reset" style="float: right;" data-option="'+name+'" data-default="'+option.default+'"  data-type="radio">Reset</a>';
                html += '<h5 class="mt-3">'+option.title+': <span id="'+name+'-value">'+option.options[option.default]+'</span></h5> '+option.description;
                html += '</legend>';
                $.each(option.options, function(val,label) {
                    html += '<div class="form-check">';
                    html += '<label class="form-check-label">';
                    html += '<input type="radio" class="form-check-input" name="'+name+'" id="'+name+'-option-'+val+'" value="'+val+'" data-label="'+label+'" data-default="'+option.default+'"';
                    if(val == option.default) html += ' checked '; // don't use === here
                    html += '>'+label; 
                    html += '</label>'; 
                    html += '</div>'; 
                });
                html += '</fieldset>'; 
                break;
            default:
                var html = '<div class="form-group">';
                html += '<label for=""><h5>'+option.title+'</h5>'+option.description+'</label>';
                html += '<div class="input-group key-sm">';
                html += '<span class="input-group-addon td-key" id="'+name+'-key">Default</span>';
                html += '<input class="form-number form-control text-right" id="'+name+'-input" name="'+name+'" value="'+option.default+'" type="text" min="'+option.min+'" max="'+option.max+'">';
                html += '<span class="input-group-addon form-units metric"></span>';
                html += '</div>';
                html += '</div>';
                break;
        }
        return html;
    }
    
    function draftPattern() {
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='draft'></div>");
        var msg = '<div class="row">';
        msg += '<div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 text-center" id="draft-loading">';
        msg += "<h3>You're done, now it's our turn</h3>";
        msg += '<ul style="margin: auto; display:inline-block; text-align: left; padding-left: 0;" class="todo mt-2 mb-3">';
        msg += '<li class="done"><a href="/draft">'+$('#step1-link').html()+'</a></li>';
        msg += '<li class="done"><a href="'+$('#step2-link').attr('href')+'" id="step2-link">'+$('#step2-link').html()+'</a></li>';
        msg += '<li class="done"><a href="#" id="step2-link" class="close-modal">With the options you chose</a></li>';
        msg += '<li class="ongoing">Drafting your pattern</li>';
        msg += '</ul>';
        msg += '<div class="progress mb-5" style="max-width: 250px; margin:auto;">';
        msg += '<div class="progress-bar progress-bar-striped progress-bar-animated progress-66" style="transition: width 12s;" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress"></div>';
        msg += '</div></div></div>';
        $('#draft').html(msg);
        setTimeout(function(){$("#progress").removeClass('progress-66').addClass('complete')}, 500);
        if (page.substr(0,9) === '/redraft/') var method = 'redraft';
        else var method = 'draft';
        $.ajax({
            url: api.data+'/'+method,
            method: 'POST',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(data) {
              if(data.result == 'ok') {
                  window.location.replace("/drafts/"+data.handle);
              } else {
                  var errormsg = '<blockquote class="error">';
                  errormsg += '<h5>This should not happend, but it did.</h5>';
                  errormsg += '<p>Something went wrong while drafting your pattern. And although the backend informed us about it, that exception is unhandled in the frontend.<p>';
                  errormsg += '<p>Basically, we message up. Sorry.<p>';
                  errormsg += '</blockquote>';
                  errormsg += '<blockquote class="link">';
                  errormsg += '<h5>Help us out and submit this report</h5>';
                  errormsg += '<p>Looks like you\'ve hit a snag. Those things happen, but you could help us prevent it from happening in the future.</p>';
                  errormsg += 'We have gathered all the info we need to investigate this, but we need you to take the last step of submitting the issue to GitHub.</p>';
                  errormsg += '<p>So would you do us a favor and report this? Thank you :)</p>';
                  errormsg += '<p><a target="_BLANK" class="btn btn-primary" ';
                  errormsg += 'href="https://github.com/freesewing/site/issues/new?title=Failed to draft pattern';
                  errormsg += '&labels[]=documentation';
                  errormsg += '&body=This draft went off the rails:%0A'+encodeURIComponent($('#form').serialize());
                  errormsg += '%0A%0AThis data was returned::%0A'+encodeURIComponent(JSON.stringify(data));
                  errormsg += '%0A%0AFeel free to include comments, but please keep the info above.">';
                  errormsg += 'Send report to GitHub</a></p>';
                  errormsg += '<p>PS: This will open a new window where you just have to click the <b>Submit new issue</b> button.</p></blockquote>';
                  $('#draft-loading').html(error);
              }
            }, 
            error: function(data) { 
                var errormsg = '<blockquote class="error">';
                errormsg += '<h5>That did not go as planned. Like, at all.</h5>';
                errormsg += '<p>Things just sort of fell apart and I did not see it coming. That shouldn\'t happen, so I encourage you to report this.<p>';
                errormsg += '</blockquote>';
                errormsg += '<blockquote class="link">';
                errormsg += '<h5>Help us out and submit this report</h5>';
                errormsg += '<p>Looks like you\'ve hit a snag. Those things happen, but you could help us prevent it from happening in the future.</p>';
                errormsg += 'We have gathered all the info we need to investigate this, but we need you to take the last step of submitting the issue to GitHub.</p>';
                errormsg += '<p>So would you do us a favor and report this? Thank you :)</p>';
                errormsg += '<p><a target="_BLANK" class="btn btn-primary" ';
                errormsg += 'href="https://github.com/freesewing/site/issues/new?title=Failed to draft pattern';
                errormsg += '&labels[]=documentation';
                errormsg += '&body=This draft went off the rails:%0A'+encodeURIComponent($('#form').serialize());
                errormsg += '%0A%0AThis data was returned::%0A'+encodeURIComponent(JSON.stringify(data));
                errormsg += '%0A%0AFeel free to include comments, but please keep the info above.">';
                errormsg += 'Send report to GitHub</a></p>';
                errormsg += '<p>PS: This will open a new window where you just have to click the <b>Submit new issue</b> button.</p></blockquote>';
                $('#draft-loading').html(errormsg); 
            },
            headers: {'Authorization': 'Bearer ' + token},
        }); 
    }
    
    function loadDraft(handle, callback) {
        $.ajax({
            url: api.data+'/auth',
            method: 'GET',
            dataType: 'json',
            success: function() { loadPrivateDraft(handle, callback); },
            error: function() { loadSharedDraft(handle, callback); },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function loadPrivateDraft(handle, callback) {
        return $.ajax({
            url: api.data+'/draft/'+handle,
            method: 'GET',
            dataType: 'json',
            success: function(returndata) {
                draft = returndata.draft;
                callback(draft);
            },
            error: function(returndata) { 
                $.bootstrapGrowl("Something went wrong, we were unable to load your draft", {type: 'error'});
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function loadSharedDraft(handle, callback) {
        return $.ajax({
            url: api.data+'/shared/draft/'+handle,
            method: 'GET',
            dataType: 'json',
            success: function(returndata) {
                draft = returndata.draft;
                callback(draft);
            },
            error: function(returndata) { 
                $.bootstrapGrowl("Something went wrong, we were unable to load this draft", {type: 'error'});
            },
        }); 
    }



    function loggedIn() {
        // Is a token present in local storage?
        if(token === null) {
            // Nope, this is a stranger to us
            return false;
        } else {
            // Yes, but is it still valid?
            $.ajax({
                url: api.data+'/auth',
                method: 'GET',
                dataType: 'json',
                success: function() { return true; },
                error: function() { return false; },
                headers: {'Authorization': 'Bearer '+token},
            }); 
        }
    }

    function renderDraft(draft) {
        var patternHandle;
        $('h1.page-title').html(draft.name);
        $('ul.breadcrumbs li:last-child').html(draft.name);
        var user = window.localStorage.getItem("user");
        if(typeof user !== 'undefined') user = JSON.parse(user);
        if(typeof draft.model === 'undefined') {
            // Shared draft, viewed anonymously
            $('div.draft-display').remove();
            var msg = '<blockquote class="fork m600"><h5>If you were logged in, you could fork this draft</h5>';
            msg += '<p>Forking is a way to use an existing draft as a template for your own draft.</p>';
            msg += '<p class="text-center"><a href="/docs/site/forking" class="btn btn-outline-white">Find out more</a></p></blockquote>';
            $('#draft').prepend(msg);
        } else if(typeof user !== 'undefined' && user.id == draft.user){
            // Own draft
            console.log(draft);
            $('.crown-middle').html(draft.handle);
            $('.crown-right').attr('src',api.data+draft.model.pictureSrc);
            $('#fork-btn').attr('href','/fork/'+draft.handle);
            $('#redraft-btn').attr('href','/redraft/'+draft.handle+'/for/'+draft.model.handle);
            $('div.draft-display').removeClass('hidden');
            console.log('yep');
        } else {
            // Logged-in user but not their own draft (shared)
            $('div.draft-display').remove();
            var msg = '<blockquote class="fork m600"><h5>Hot women in your neighborhood are forking this draft</h5>';
            msg += '<p>Forking is a way to use an existing draft as a template for your own draft.</p>';
            msg += '<p class="text-center"><a href="/fork/'+draft.handle+'" class="btn btn-outline-white">Fork this draft</a> <a href="/docs/site/forking" class="btn btn-outline-white">Find out more</a></p>';
            msg += '<p><small>PS: That thing about the hot women is obviously a joke. I know nothing about women, let alone hot ones.</small></p>';
            msg += '</blockquote>';
            $('#draft').prepend(msg);
            console.log('logged in but shared');
        }
        // Load site data
        $.get('/json/freesewing.json', function( fsdata ) {
            patternHandle = fsdata.mapping.patternToHandle[draft.pattern];
            $('.crown-left').attr('src','/img/patterns/'+patternHandle+'/'+patternHandle+'.svg');
        });
        // Responsive SVG embed requires us to strip out the width and height attributes
        var xmlDoc = $.parseXML( draft.svg );
        $svg = $(xmlDoc).find('svg'); 
        $svg.removeAttr('width');
        $svg.removeAttr('height');
        $('#svg-wrapper').html(xmlToString(xmlDoc));
        var xmlDoc = $.parseXML( draft.compared );
        $svg = $(xmlDoc).find('svg'); 
        $svg.removeAttr('width');
        $svg.removeAttr('height');
        $('#compared-wrapper').html(xmlToString(xmlDoc));
        marked = $.getScript( "/js/vendor/marked.min.js", function(){
            marked.setOptions({sanitize: true});
            if(draft.notes !==  '') $('#notes-inner').html(marked(draft.notes));
        });
        $('#link-preview').attr('href',draft.dlroot+draft.handle+'.svg');
        $('#compared-preview').attr('href',draft.dlroot+draft.handle+'.compared.svg');
        $('.download-draft').each(function(index) {
            var format = $(this).attr('data-format');
            $(this).attr('href',api.data+'/download/'+draft.handle+'/'+format);
        });
        // Bind click: Delete draft button
        $('a#delete-btn').click(function(e) {
            e.preventDefault();
            deleteDraft(draft);
        });
    }

    function deleteDraft(draft) {
        $('#modal').removeClass().addClass('shown light');
        $('#modal-main').html("<div id='delete'></div>");
        $('#delete').load('/components/draft/delete', function(){
            $('#remove-draft-title').html('Delete '+draft.name+'?');
            // Bind click: Cancel nuke draft button
            $('#delete').on('click','a#no-nuke', function(e) {
                closeModal();
            });
            // Bind click: Nuke draft button
            $('#delete').on('click','a#nuke', function(e) {
                e.preventDefault();
                $.ajax({
                    url: api.data+'/draft/'+draft.handle,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function(data) {
                        if(window.location.pathname === '/drafts') {
                            $('#row-'+draft.handle).remove();   
                            $('#modal').removeClass();
                        } else window.location.replace("/drafts"); 
                    },
                    error: function(data) { 
                      $('#modal-main').load("/components/generic/error");
                    },
                    headers: {'Authorization': 'Bearer '+token},
                }); 
            });
        });
    }

    function xmlToString(xmlData) { 
        var xmlString;
        // IE
        if (window.ActiveXObject){
            xmlString = xmlData.xml;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else{
            xmlString = (new XMLSerializer()).serializeToString(xmlData);
        }
        return xmlString;
    }   

    $(document).ready(function () {
       
        if(window.localStorage.getItem("user") === false) {
            // eff this, you need to be logged in
            window.location.replace("/login");
        } 
        else { // Start of logged-in block
            // Account page ////////////////
            if(page === '/account') {
                loadAccount(renderAccount);
                
                // Bind click handler to add-model link/button
                $('#account').on('click','#add-model-btn', function(e) {
                    e.preventDefault();
                    renderModelWizard(); 
                });
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
                              url: api.data+'/account',
                              method: 'DELETE',
                              dataType: 'json',
                              success: function(data) {
                                  window.localStorage.removeItem("jwt");
                                  $('#modal-main').html("<h2>Goodby</h2><p>We'll send you to the homepage, ok?</p>");
                                  setTimeout(function(){ window.location.replace("/"); }, 2000);
                              },
                              error: function(data) { 
                                  $('#modal-main').load("/components/generic/error");
                              },
                              headers: {'Authorization': 'Bearer '+token},
                            }); 
                        });

                    });
                });
            }
            // Models page //////////////////
            else if(page === '/models') {
                loadAccount(function(data){
                    $('h1.page-title').html('Your models');
                    $('#models-title-row').remove();
                    $('div.crown-wrapper').remove();
                    $('#account-username').remove();
                    $('#delete-btn').remove();
                    $('#settings-btn').remove();
                    // Bind click handler to add-model link/button
                    $('#account').on('click','#add-model-btn', function(e) {
                        e.preventDefault();
                        renderModelWizard(); 
                    });
                    $.each(data.models, function(index, model){
                        $('#models').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display'></div>");
                        $("#model-"+model.handle).load('/components/model/display', function(){
                            $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                            $('#model-'+model.handle+' a.model-link').attr('href','/models/'+model.handle); 
                            $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                        });
                    });
                });
            }
            // Model page ////////////////
            else if(page.substring(0,8) === '/models/' && page.split('/').length == 3) {
                var marked;
                var measurements;
                var patterns;
                // Rewritten URL, need to get the model handle from it
                var modelHandle = page.split('/')[2];
                loadModel(modelHandle, renderModel);
                
                // Bind click handler to settings button
                $('#model').on('click','a#settings-btn', function(e) {
                    renderModelSettings();
                });
                
                // Bind click handler to notes button
                $('#update-notes').click(function(e) {
                    renderModelNotepad();
                });
                // Bind click: Delete account button
                $('a#delete-btn').click(function(e) {
                    e.preventDefault();
                    $('#modal').removeClass().addClass('shown light');
                    $('#modal-main').html("<div id='delete'></div>");
                    $('#delete').load('/components/model/delete', function(){
                        $('#remove-model-title').html('Delete '+model.model.name+'?');
                        $('#nuke').html('Delete '+model.model.name);
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
                              url: api.data+'/model/'+model.model.handle,
                              method: 'DELETE',
                              dataType: 'json',
                              success: function(data) {
                                  window.location.replace("/account");
                              },
                              error: function(data) { 
                                  $('#modal-main').load("/components/generic/error");
                              },
                              headers: {'Authorization': 'Bearer '+token},
                            }); 
                        });

                    });
                });
            }
            // New draft, step 1 ////////////////
            else if(page === '/draft' || page === '/draft/') {
                var patterns;
                var tags = {};
                $.get('/json/freesewing.json', function( fsdata ) {
                    patterns = fsdata.patterns;
                    $.each(fsdata.patterns, function(name, pattern){
                        var namespace = fsdata.mapping.handleToNamespace[pattern.info.handle];
                        $('#quick-picks').append('<li><a href="/draft/'+pattern.info.handle+'" class="px-1">'+pattern.info.handle+'</a></li>');
                        $('#picklist').append('<a href="/draft/'+pattern.info.handle+'" id="link-'+pattern.info.handle+'" class="card-wrap-link"></a>');
                        var card = $('#pattern-card').clone();
                        var id = pattern.info.handle+'-card';
                        card.attr('id',id).addClass(namespace.toLowerCase()).appendTo('#link-'+pattern.info.handle);
                        $('#'+id+' h3.card-title').html(fsdata.mapping.handleToPatternTitle[pattern.info.handle]);
                        $('#'+id+' img').attr('src','/img/patterns/'+pattern.info.handle+'/'+pattern.info.handle+'.svg');
                        $('#'+id+' p.card-text').html(pattern.info.description);
                        $('#'+id+' p.card-tags').append('<span class="badge '+namespace.toLowerCase()+'">'+namespace+'</span>');
                        $.each(pattern.info.tags, function(index, tag){
                            $('#'+id+' p.card-tags').append(' <span class="badge badge-default '+tag.toLowerCase()+'">'+tag+'</span>');
                        });
                    });
                    $('#pattern-card').remove();
                });
            }
            // New draft, step 2 ////////////////
            else if(page.substr(0,7) === '/draft/' && page.split('/').length == 3) {
                var patternhandle = page.split('/')[2];
                $('#step1-link').html('Drafting '+patternhandle);
                var pattern;
                var patterns;
                var account;
                loadAccount(function(data){
                    account = data;
                    // Do we even have models?
                    if(typeof account.models === "undefined" || account.models === false || account.models.length < 1) {
                        $('#models').load('/components/model/nomodel');
                    }
                    else renderModelSelection(account,patternhandle);
                });
            }
            // Fork draft, step 2 ////////////////
            else if(page.substr(0,6) === '/fork/' && page.split('/').length == 3) {
                var draftHandle = page.split('/')[2];
                var account;
                loadDraft(draftHandle, function(draft){
                    $('#step1-link').html('Forking '+draft.pattern+' draft '+draft.handle);
                    loadAccount(function(data){
                        account = data;
                        // Do we even have models?
                        if(typeof account.models === "undefined" || account.models === false || account.models.length < 1) {
                            $('#models').load('/components/model/nomodel');
                        } else {
                            $.get('/json/freesewing.json', function( fsdata ) {
                                renderModelSelection(account,fsdata.mapping.patternToHandle[draft.pattern]);
                            });
                        }
                    });
                });
            }
            // New draft, step 3 ////////////////
            else if(page.substr(0,7) === '/draft/' && page.split('/').length == 5 && page.split('/')[3] === 'for') {
                var patternHandle = page.split('/')[2];
                var modelHandle = page.split('/')[4];
                var account;
                loadAccount(function(data){
                    account = data;
                    $('#step1-link').html('Drafting '+patternHandle);
                    $('#step2-link').html('For '+account.models[modelHandle].name).attr('href','/draft/'+patternHandle);
                    renderDraftForm(account,patternHandle, modelHandle);
                });
            }
            // Fork draft, step 3 ////////////////
            else if((page.substr(0,6) === '/fork/' || page.substr(0,9) === '/redraft/') && page.split('/').length == 5 && page.split('/')[3] === 'for') {
                var draftHandle = page.split('/')[2];
                var modelHandle = page.split('/')[4];
                var account;
                loadDraft(draftHandle, function(draft){
                    if (page.substr(0,6) === '/fork/') $('#step1-link').html('Forking '+draft.pattern+' draft '+draft.handle);
                    else $('#step1-link').html('Redrafting '+draft.pattern+' draft '+draft.handle);
                    loadAccount(function(data){
                        account = data;
                        $('#step2-link').html('For '+account.models[modelHandle].name).attr('href','/fork/'+draftHandle);
                        $.get('/json/freesewing.json', function( fsdata ) {
                            renderDraftForm(account,fsdata.mapping.patternToHandle[draft.pattern], modelHandle, draft.data);
                        });
                    });
                });
            }
            // Show draft ///////////////////////
            else if(page.substr(0,8) === '/drafts/' && page.split('/').length == 3) {
                var draft;
                var draftHandle = page.split('/')[2];
                loadDraft(draftHandle, renderDraft);
                // Bind click handler to settings button
                $('#draft').on('click','a#settings-btn', function(e) {
                    renderDraftSettings();
                });
                
                // Bind click handler to notes button
                $('#update-notes').click(function(e) {
                    renderDraftNotepad();
                });
                
            }
            // List of drafts ////////////////
            else if(page === '/drafts') {
                var account;
                var map;
                var models = [];
                $.getScript( "/js/vendor/timeago.min.js", function(){
                    loadAccount(function(data){
                        account = data;
                        // Load site data
                        $.get('/json/freesewing.json', function( fsdata ) {
                            // index models by id
                            $.each(account.models, function(index, model){
                                models[model.id] = model;
                            });
                            $.each(account.drafts, function(index, draft){
                                var pname = fsdata.mapping.patternToHandle[draft.pattern];
                                var row = '<tr id="row-'+draft.handle+'">';
                                row += '<td class="handle"><a href="/drafts/'+draft.handle+'">'+draft.handle+'</a></td>';
                                row += '<td class="pattern text-capitalize"><a href="/patterns/'+pname+'">'+pname+'</a></td>';
                                row += '<td class="model"><a href="/models/'+models[draft.model].handle+'">'+models[draft.model].name+'</a></td>';
                                row += '<td class="name"><a href="/drafts/'+draft.handle+'">'+draft.name+'</a></td>';
                                row += '<td class="date timeago" datetime="'+draft.created+'"></td>';
                                row += '<td class="trash icon"><a href="#" data-draft="'+draft.id+'" class="delete-draft" title="Delete draft '+draft.handle+'"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                                row += '</tr>';
                                $('#draftlist').prepend(row);
                            });
                            timeago().render($('.timeago'));
                            $('#draft-row').remove();
                            $('#spinner').remove();
                            // Bind click handler to notes button
                            $('#drafts').on('click','a.delete-draft',function(e) {
                                e.preventDefault();
                                deleteDraft(account.drafts[$(this).attr('data-draft')]);
                            });
                        });
                    });
                });
            }
            else {
                console.log('uncaught app page');
                console.log(page);
            }

        } // End of logged-in block
    });
    }(jQuery));


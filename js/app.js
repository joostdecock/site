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
        if(data.models === false) {
            $('#models-title').html('Start by adding a model');
            $('#models').append("<div class='col-md-12'><p>A model holds measurements. We need those measurement to draft patterns for you. So go ahead and <a href='#' class='add-model'>create your first model</a>.</p></div>");
            $('#drafts-title').remove();
        } else {
            $.each(data.models, function(index, model){
                $('#models').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display'></div>");
                $("#model-"+model.handle).load('/components/model/display', function(){
                    $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                    $('#model-'+model.handle+' a.model-link').attr('href','/model/'+model.handle); 
                    $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                });
            });
            if(data.drafts === false || typeof data.drafts === 'undefined') {
                $('#drafts-title').html('No drafts yet');
                $('#drafts').append("<div class='col-md-12'><p>Drafts are what we do, you should try it sometime.</p></div>");
            }
            $('#drafts').append("<div class='col-md-12 text-center mb-5'><a href='' class='btn btn-primary btn-lg mt-3 add-draft'>Add draft</a></div>");
        }
        $('#models').append("<div class='col-md-12 text-center mb-5'><a href='' class='btn btn-primary btn-lg mt-3 add-model'>Add model</a></div>");
        // Bind click handler to add-model link/button
        $('#models').on('click','a.add-model', function(e) {
            e.preventDefault();
            renderModelWizard(); 
        });
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
                window.location.replace("/model/"+data.handle);
            },
            error: function(data) { 
                $('#loader').load('/components/generic/error');
                console.log(data);
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
        $.get('/img/icons/svg/pencil.svg', function(pencilobject) {
            var serializer = new XMLSerializer();
            var row;
            var pencil = serializer.serializeToString(pencilobject);
            var first;
            var second;
            $.each(measurements, function(measurement, shape){
                if(shape == 'all' || shape == model.model.body || typeof filter !== "undefined") {
                    if(typeof model.model.data.measurements[measurement] !== "undefined") {
                        if(typeof filter === 'undefined' || typeof filter[measurement] !== "undefined") {
                            first += "<tr>" +
                                "<td class='name'>"+measurement+"&nbsp;:</td>" +
                                "<td nowrap class='value "+model.model.units+"'>"+model.model.data.measurements[measurement]+"</td>" +
                                "<td class='edit'><a href='#' data-measurement='"+measurement+"' class='edit'>"+pencil+"</a></td>" +
                            "</tr>";
                        }
                    } else {
                        if(typeof filter === 'undefined' || typeof filter[measurement] !== "undefined") {
                            second += "<tr data-measurement='"+measurement+"' class='empty'>" +
                                "<td class='name empty' colspan='2'>"+measurement+"</td>" +
                                "<td class='add'><a href='#' data-measurement='"+measurement+"' class='add'>Add</a></td>" +
                            "</tr>";
                        }
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
            $('#model-name').html(data.model.name);
            $('#model-picture').attr('src',api.data+data.model.pictureSrc);
            // Check whether we have any data at all
            if(data.model.data === "" || data.model.data === null) data.model.data = {measurements: ''};
            $('#model-measurement-count').html(Object.keys(data.model.data.measurements).length);
            $('#model-draft-count').html(Object.keys(data.drafts).length);
            $.get('/json/measurements.json', function( mdata ) {
                measurements = mdata;
                $('#measurements').append("<div id='progressbar'></div>");
                $('#measurements').append("<div id='filter-wrapper' class='text-center mt-4 mb-2'>Filter by pattern: </div>");
                $('#filter-wrapper').load('/components/generic/filter-pattern', function(){
                    $.get('/json/patterns.json', function( pdata ) {
                        patterns = pdata;
                        $.each(patterns, function(namespace, patternlist){
                            $('#filter-patterns-select').append('<optgroup id="pattern-filter-namespace-'+namespace+'" label="'+namespace+'"></optgroup');
                            $.each(patternlist, function(index, name){
                                $('#pattern-filter-namespace-'+namespace).append('<option data-namespace="'+namespace+'" val="'+index+'">'+index+'</option>"');
                            });
                        });
                        // Bind change of filter
                        $('#filter-wrapper').on('change', '#filter-patterns-select', function(e) {
                            if($('#filter-patterns-select').val() === 'all') renderMeasurements();
                            else {
                                var filterNamespace = $('#filter-patterns-select option:selected').attr('data-namespace');
                                var filterPattern = $('#filter-patterns-select').val();
                                renderMeasurements(patterns[filterNamespace][filterPattern].measurements);
                            }
                        });
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
       console.log(draft); 
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
                    saveModelSettings();
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

    function renderModelSelection(account,patternhandle) {
        var filter = {'ok':[], 'ko': []};
        $.get('/json/patternmap.json', function( patternmap ) {
            $.get('/json/patterns.json', function( pdata ) {
                var patterns = pdata;
                pattern = patterns[patternmap[patternhandle].namespace][patternmap[patternhandle].pattern];
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
                                $('#okmodels').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display okmodels'></div>");
                                $("#model-"+model.handle).load('/components/model/display', function(){
                                    $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                                    $('#model-'+model.handle+' a.model-link').attr('href',page+'/for/'+model.handle); 
                                    $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                                });
                            });
                            if(filter.ko.length > 0) {
                                // We've got some KO models
                                $('#komodels').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display komodels'></div>");
                                $.each(filter.ko, function(index, model){
                                    $('#komodels').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display komodels'></div>");
                                    $("#model-"+model.handle).load('/components/model/display', function(){
                                        $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                                        $('#model-'+model.handle+' a.model-link').attr('href','/model/'+model.handle); 
                                        $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                                    });
                                });
                            } else {
                                // We have no KO models
                                $('#okmsg').remove();
                                $('#komsg').remove();
                                $('#komodels').remove();
                            }
                        } else {
                            // No good models found
                            $('#komsg').remove();
                            $('#komodels').remove();
                            $('#okmodels').remove();
                            $('#okmsg').load('/components/model/nogoodmodel');
                        }
                    }
                });
            });
        });
    }

    function renderDraftForm(account,patternhandle,modelhandle) {
        $.get('/json/patternmap.json', function( patternmap ) {
            $.get('/json/patterns.json', function( patterns ) {
                $.getScript( "/js/vendor/bootstrap-slider.min.js", function(){
                    $('#options').append("<form id='form'><div id='accordion' role='tablist' aria-multiselectable='true'></div></form>");
                    var form = {};
                    form.groups = {};
                    pattern = patterns[patternmap[patternhandle].namespace][patternmap[patternhandle].pattern];
        console.log(pattern);
                    $.each(pattern.options, function(option, o) {
                        if(typeof form.groups[o.group] === 'undefined') form.groups[o.group] = {};
                        form.groups[o.group][option] = o;
                    });
                    // Add hidden form fields
                    $('#form').append('<input type="hidden" name="pattern" value="'+pattern.pattern+'"><input type="hidden" name="model" value="'+modelhandle+'">');
                    // Sort form groups and prepend theme/language
                    var ordered = {
                        '_': {
                            'theme': {
                                'default': 'Basic',
                                'description': 'Use the paperless theme when you want a pattern that does not require printing',
                                'title': 'Theme',
                                'type': 'chooseOne',
                                'options': {
                                    'Basic': 'Classic',
                                    'Paperless': 'Paperless'
                                }
                            },
                            'lang': {
                                'default': 'en',
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
                    });
                    // Bind change event to radio buttons
                    $('#accordion').on('change', 'input[type=radio]', function(e) {
                        $('#'+$(this).attr('name')+'-value').html($(this).attr('data-label'));
                    });
                    // Bind click event to help buttons
                    $('#accordion').on('click', 'a.option-help', function(e) {
                        e.preventDefault();
                        $('#modal').removeClass().addClass('shown light');
                        $('#modal-main').html("<h2 class='text-center'>Sorry, not yet</h2><p class='text-center'>Help for pattern options is not implemented yet.</p>");
                    });
                    // Bind submit handler to save settings button
                    $('#options').on('submit','#form', function(e) {
                        e.preventDefault();
                        draftPattern();
                    });
                });
            });
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
            case 'chooseOne':
                var html = '<fieldset class="form-group">';
                html += '<legend>';
                html += '<a href="#" id="'+name+'-help" class="mt-4 btn btn-outline-primary btn-sm option-help" style="float: right;" data-option="'+name+'">Help</a>';
                html += '<h5 class="mt-3">'+option.title+': <span id="'+name+'-value">'+option.options[option.default]+'</span></h5> '+option.description;
                html += '</legend>';
                $.each(option.options, function(val,label) {
                    html += '<div class="form-check">';
                    html += '<label class="form-check-label">';
                    html += '<input type="radio" class="form-check-input" name="'+name+'" id="'+name+'-option-'+val+'" value="'+val+'" data-label="'+label+'"';
                    if(val == option.default) html += ' checked '; // don't use === here
                    html += '>'+label; 
                    html += '</label>'; 
                    html += '</div>'; 
                });
                html += '</fieldset>'; 
                break;
            default:
                console.log(option);
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
        msg += '<div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 text-center">';
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

        $.ajax({
          url: api.data+'/draft',
          method: 'POST',
          data: $('#form').serialize(),
          dataType: 'json',
          success: function(data) {
            if(data.result == 'ok') {
                window.location.replace("/drafts/"+data.handle);
            } else {
                console.log(data);
                // closeModal();
                $.bootstrapGrowl("Something went wrong, we were unable to generate your draft", {type: 'error'});
            }  
          }, 
          error: function(data) { 
              $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
          },
          headers: {'Authorization': 'Bearer ' + token},
        }); 
    }
    
    function loadDraft(handle, callback) {
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

    function renderDraft(draft) {
        var patternHandle;
        console.log(draft);
        $('h1.page-title').html(draft.name);
        $('.crown-middle').html(draft.handle);
        $('.crown-right').attr('src',api.data+draft.model.pictureSrc);
        $.get('/json/patternpam.json', function( map ) {
            patternHandle = map[draft.pattern].pattern;
            $('.crown-left').attr('src','/img/pattern/'+patternHandle+'/linedrawing.png');
        });
        // Responsive SVG embed requires us to strip out the width and height attributes
        var xmlDoc = $.parseXML( draft.svg );
        $svg = $(xmlDoc).find('svg'); 
        $svg.removeAttr('width');
        $svg.removeAttr('height');
        $('#svg-wrapper').html(xmlToString(xmlDoc));
        marked = $.getScript( "/js/vendor/marked.min.js", function(){
            marked.setOptions({sanitize: true});
            if(draft.notes !==  '') $('#notes-inner').html(marked(draft.notes));
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
            // Model page //////////////////
            else if(page === '/models') {
                loadAccount(function(data){
                    $('h1.page-title').html('Your models');
                    $('#models-title-row').remove();
                    $('#non-models-row').remove();
                    $.each(data.models, function(index, model){
                        $('#models').append("<div id='model-"+model.handle+"' class='col-md-2 col-4 model-display'></div>");
                        $("#model-"+model.handle).load('/components/model/display', function(){
                            $('#model-name').attr('id','model-name-'+model.handle).html(model.name); 
                            $('#model-'+model.handle+' a.model-link').attr('href','/model/'+model.handle); 
                            $('#model-picture').attr('id','model-picture-'+model.handle).attr('src',api.data+model.pictureSrc); 
                        });
                    });
                });
            }
            // Model page ////////////////
            else if(page.substring(0,7) === '/model/') {
                var marked;
                var measurements;
                var patterns;
                // Rewritten URL, need to get the model handle from it
                var modelHandle = page.substring(7);
                if(page.substring(page.length-1) == '/') modelHandle = modelHandle.substring(0, modelHandle.length-1);
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
                $.get('/json/patterns.json', function( pdata ) {
                    patterns = pdata;
                    $('#patterns').append('<div id="pattern-list" class="card-columns masonry-wrapper"></div>');
                    $.each(patterns, function(namespace, patternlist){
                        $.each(patternlist, function(index, pattern){
                            $('#pattern-list').append('<a href="#" id="div-link"><div class="card text-center mb-4 hover-shadow" id="'+pattern.info.handle+'-card"></div></a>');
                            $('#'+pattern.info.handle+'-card').load('/components/pattern/card', function(){
                                $('#card').attr('id',pattern.info.handle+'-card');
                                $('#card-image').attr('src','/img/pattern/'+pattern.info.handle+'/linedrawing.png').attr('id',pattern.info.handle+'-image');
                                $('#card-title').html(pattern.info.handle).attr('id',pattern.info.handle+'-title');
                                $('#card-text').html(pattern.info.description).attr('id',pattern.info.handle+'-text');
                                $('#card-link').html('Draft '+pattern.info.handle).attr('id',pattern.info.handle+'-link').attr('href','/draft/'+pattern.info.handle);
                                $('#div-link').attr('id',pattern.info.handle+'-div-link').attr('href','/draft/'+pattern.info.handle);
                            });
                        });
                    });
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
                        // Bind click handler to add-model link/button
                        $('#models').on('click','a.add-model', function(e) {
                            e.preventDefault();
                            renderModelWizard(); 
                        });
                    }
                    else renderModelSelection(account,patternhandle);
                });
            }
            // New draft, step 3 ////////////////
            else if(page.substr(0,7) === '/draft/' && page.split('/').length == 5 && page.split('/')[3] === 'for') {
                var patternhandle = page.split('/')[2];
                var modelhandle = page.split('/')[4];
                var account;
                loadAccount(function(data){
                    account = data;
                    $('#step1-link').html('Drafting '+patternhandle);
                    $('#step2-link').html('For '+account.models[modelhandle].name).attr('href','/draft/'+patternhandle);
                    renderDraftForm(account,patternhandle, modelhandle);
                });
            }
            // Show draft ///////////////////////
            else if(page.substr(0,8) === '/drafts/' && page.split('/').length == 3) {
                var draft;
                var draftHandle = page.split('/')[2];
                console.log(draftHandle);
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
            else {
                console.log('uncaught app page');
                console.log(page);
            }

        } // End of logged-in block
    });
    }(jQuery));


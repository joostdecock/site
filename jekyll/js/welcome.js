(function ($) {
    $(document).ready(function () {
        // Load modal
        $('#modal').removeClass().addClass('shown light');
        loadAccount(showQuestions);
    });

    function showQuestions(data) { 
        if(typeof data.account.data.account == 'undefined') var units = 'metric';
        else var units = data.account.data.account.units;
        if(units == 'metric') {
            var otherunits = 'imperial';
            var unit = 'cm';
            var otherunit = 'inches';
        } else {
            var otherunits = 'metric';
            var unit = 'inches';
            var otherunit = 'cm';
        }
        if(typeof data.account.data.social != 'undefined' && data.account.data.social != null) {
            if(typeof data.account.data.social.twitter != 'undefined') var twitter = data.account.data.social.twitter;
            if(typeof data.account.data.social.instagram != 'undefined') var instagram = data.account.data.social.instagram;
            if(typeof data.account.data.social.github != 'undefined') var github = data.account.data.social.github;
        }
        
        $('#modal-main').html('<div id="w" class="m600"></div><form id="settings-form" class="hidden"></form>');
        $('#settings-form').append('<input type="hidden" name="id" value="'+data.account.id+'" id="form-id">');
        $('#settings-form').append('<input type="hidden" name="email" value="'+data.account.email+'" id="form-email">');
        $('#settings-form').append('<input type="hidden" name="username" value="'+data.account.username+'" id="form-username">');
        $('#settings-form').append('<input type="hidden" name="picture" value="" id="form-picture">');
        $('#settings-form').append('<input type="hidden" name="units" value="'+data.account.units+'" id="form-units">');
        $('#settings-form').append('<input type="hidden" name="twitter" value="'+twitter+'" id="form-twitter">');
        $('#settings-form').append('<input type="hidden" name="instagram" value="'+instagram+'" id="form-instagram">');
        $('#settings-form').append('<input type="hidden" name="github" value="'+github+'" id="form-github">');

        var step1 = '<p>Just a few more steps to setup your account:</p>';
        step1 += '<div id="question">'+bar(20)+'<blockquote><h4 class="">Is '+units+' ok, or do you prefer '+otherunits+'?</h4>';
        step1 += '<p>Your units have been set to <b>'+units+'</b> which means that things will be displayed in <b>'+unit+'</b></p>';
        step1 += '<p>Alternatively, you can choose <b>'+otherunits+'</b> so that things will be displayed in <b>'+otherunit+'</b></p></blockquote>';
        step1 += '<p class="text-right">';
        step1 += '<a href="#" class="btn btn-info" id="units-ok" data-units="'+units+'">Stay with '+units+'</a>';
        step1 += '<a href="#" class="btn btn-primary mx-2" id="units-not-ok" data-units="'+otherunits+'">Switch to '+otherunits+'</a>';
        step1 += '</p>';
        
        $('#w').html(step1);

        
        // Bind click handler to units-ok button
        $('#w').on('click','#units-ok', function(e) {
            goToUsername(data);
        });

        // Bind click handler to units-not-ok button
        $('#w').on('click','#units-not-ok', function(e) {
            $('#units-not-ok').html('<img src="/img/logo/spinner.svg">');
            saveUnits($('#units-not-ok').attr('data-units'), data);
        });
        
        // Bind click handler to username-ok button
        $('#w').on('click','#username-ok', function(e) {
            goToAvatar(data);
        });

        // Bind click handler to username-not-ok button
        $('#w').on('click','#username-not-ok', function(e) {
            $('#username-not-ok').html('<img src="/img/logo/spinner.svg">');
            saveUsername($('#username').val(), data);
        });

        // Bind click handler to picture button
        $('#w').on('click','#picture-btn', function(e) {
            $('#file').click();
        });

        // Bind onchange event to file input
        $('#w').on('change','#file', function() {
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
                        $('#form-picture').attr('value', reader.result);
                        $('#avatar-not-ok').removeClass('hidden');
                    }

                } else {
                    $('#picture-msg').html("Select a file below 2Mb").removeClass().addClass('alert alert-warning');
                }
            } else {
                $('#picture-msg').html("Select a JPG, PNG, or GIF").removeClass().addClass('alert alert-warning');
            }
        });
        
        // Bind click handler to avatar-ok button
        $('#w').on('click','#avatar-ok', function(e) {
            goToSocial(data);
        });

        // Bind click handler to avatar-not-ok button
        $('#w').on('click','#avatar-not-ok', function(e) {
            $('#avatar-not-ok').html('<img src="/img/logo/spinner.svg">');
            saveAvatar(data);
        });
        
        // Bind click handler to social-save button
        $('#w').on('click','#social-save', function(e) {
            $('#social-save').html('<img src="/img/logo/spinner.svg">');
            saveSocial(data);
        });
    }


    function bar(progress) {
        return '<div class="progress"><div class="progress-bar" role="progressbar" style="width: '+progress+'%" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100"></div></div>';
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

    function saveUnits(units, data) {
        $('#form-units').val(units);
        saveSettings(function(){ $.bootstrapGrowl("Your units have been switched to "+units, {type: 'success'}); goToUsername(data); });

    }
    
    function saveUsername(username, data) {
        $('#form-username').val(username);
        saveSettings(function(){ $.bootstrapGrowl("Your username was set to '"+username+"'", {type: 'success'}); goToAvatar(data); });

    }
    
    function saveAvatar(data) {
        saveSettings(goToSocial(data));

    }
    
    function saveSocial(data) {
        $('#form-twitter').val($('#twitter').val());
        $('#form-instagram').val($('#instagram').val());
        $('#form-github').val($('#github').val());
        saveSettings(function(){ window.location.replace("/account"); });

    }
    

    function saveSettings(callback) {
        $.ajax({
      url: api.data+'/account',
      method: 'PUT',
      data: $('#settings-form').serialize(),
      dataType: 'json',
      success: function(data) {
        if(data.result == 'ok') {
            callback();
        } else {
            $.bootstrapGrowl("Something went wrong, we were unable to save your settings", {type: 'error'});
        }  
      }, 
      error: function(data) { 
          $.bootstrapGrowl("Something went wrong, we were unable to contact the backend", {type: 'error'});
      },
      headers: {'Authorization': 'Bearer ' + token},
    }); 
    }

    function goToUsername(data) {
        var step2 = bar(45)+'<blockquote><h4 class="">Pick your username</h4>';
        step2 += '<p>Your current username is <b>'+data.account.username+'</b></p><p>It can be anything you want, so by all means feel free to change it below.</p>';
        step2 += '<input id="username" class="form-control form-control-lg text-center" value="'+data.account.username+'" spellcheck="false" role="textbox" placeholder="'+data.account.username+'" autocorrect="off" autocomplete="off" autocapitalize="off" type="text">';
        step2 += '</blockquote><p class="text-right">';
        step2 += '<a href="#" class="btn btn-info mx-2" id="username-ok"><b>'+data.account.username+'</b> is fine for me</a>';
        step2 += '<a href="#" class="btn btn-primary" id="username-not-ok">Update my username</a>';
        step2 += '</p>';
        $('#question').html(step2);
        $('#username').focus().select();
    }

    function goToAvatar(data) {
        var step3 = bar(70)+'<blockquote><h4 class="">Add a profile picture</h4>';
        step3 += '<div class="bg-thematic drop-shadow" id="picture-key" style="width: 100px; height: 100px; background-color: rgb(255, 255, 255); display: inline-block; margin-right: 1rem; float: left; background-image: url(&quot;'+api.data+data.account.pictureSrc+'&quot;);"></div>';
        step3 += '<div style="display: inline-block; width: 250px;"> <p id="picture-msg">This is your current picture, click below to select a new one</p>';
        step3 += '<a class="btn btn-outline-primary" id="picture-btn">Change image</a> <input class="hidden" id="file" name="file" type="file">';
        step3 += '<input class="hidden" id="picture" name="picture" type="hidden"> </div>';
        step3 += '</blockquote><p class="text-right">';
        step3 += '<a href="#" class="btn btn-info mx-2" id="avatar-ok">Keep this picture</a>';
        step3 += '<a href="#" class="btn btn-primary hidden" id="avatar-not-ok">Save my new picture</a>';
        step3 += '</p>';
        $('#question').html(step3);
    }

    function goToSocial(data) {
        console.log(data);
        var twitter = '';
        var instagram = '';
        var github = '';
        if(typeof data.account.data.social != 'undefined' && data.account.data.social != null) {
            if(typeof data.account.data.social.twitter != 'undefined') var twitter = data.account.data.social.twitter;
            if(typeof data.account.data.social.instagram != 'undefined') var instagram = data.account.data.social.instagram;
            if(typeof data.account.data.social.github != 'undefined') var github = data.account.data.social.github;
        }
        var step4 = bar(90)+'<blockquote><h4 class="">Your social media accounts</h4>';
        step4 += '<p>You can add your Twitter and/or Instagram account to your profile so other users can discover more from you.</p>';
        step4 += '<div class="input-group key-sm">';
        step4 += '<span class="input-group-addon td-key">Twitter</span>';
        step4 += '<input class="form-number form-control" id="twitter" name="twitter" value="'+twitter+'" placeholder="Enter your Twitter username here" type="text">';
        step4 += '</div>';
        step4 += '<div class="input-group key-sm">';
        step4 += '<span class="input-group-addon td-key">Instagram</span>';
        step4 += '<input class="form-number form-control" id="instagram" name="instagram" value="'+instagram+'" placeholder="Enter your Instagram username here" type="text">';
        step4 += '</div>';
        step4 += '<div class="input-group key-sm">';
        step4 += '<span class="input-group-addon td-key">GitHub</span>';
        step4 += '<input class="form-number form-control" id="github" name="github" value="'+github+'" placeholder="Enter your GitHub username here" type="text">';
        step4 += '</div>';
        step4 += '</blockquote><p class="text-right">';
        step4 += '<a href="#" class="btn btn-primary" id="social-save">Save settings</a>';
        step4 += '</p>';
        $('#question').html(step4);

    }

}(jQuery));

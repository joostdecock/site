(function ($) {
    $(document).ready(function () {

        $.get(api.data+'/comments/recent/25', function( comments ) {
            Object.keys(comments.comments).sort().reverse().forEach(function(key) {
                renderComment(comments.comments[key]);
            });
        });

        $('#input').on('input', function() {
                if ( ($('#input').val().length > 1) || ($('#input').val() == '@') )  getUsers($('#input').val(), renderUsers());
        });

        $('#results').on('click', 'a.changepwd',function(e) {
            $('#modal').removeClass().addClass('shown light');
            var html = "<div id='pwdchange' class='m600 text-center'>";
            html += "<h2>Change password</h2>";
            html += "<p>Forcing a password change for user "+$(this).attr('data-handle')+" ("+$(this).attr('data-email')+")</p>";
            html += "<p><input type='text' data-handle='"+$(this).attr('data-handle')+" 'class='form-control' placeholder='Type the new password here' id='password'></p>";
            html += "<a class='btn btn-primary mt-5' href='#' id='forcepwdchange'>Set new password</a>";
            html += "</div>";
            $('#modal-main').html(html);
        });
        
        $('#modal-main').on('click', '#forcepwdchange',function(e) {
            setPassword($('#password').attr('data-handle'),$('#password').val());
        });

        $('#results').on('click', 'a.changebadges',function(e) {
            $('#modal').removeClass().addClass('shown light');
            var badges = JSON.parse($(this).attr('data-badges'));
            var handle = $(this).attr('data-handle');
            var html = "<div class='text-center'><h2>Manage badges</h2>";
            html += "<p>Managing badges user "+handle+" ("+$(this).attr('data-email')+")</p></div>";
            html += "<div id='badgechange' class='row text-center'>";
            html += "<div class='col-sm-6' id='current-badges'><h3>Assigned badges</h3><p>Click on any of them to remove them</p>";
            if(badges != null) {
                $.each(badges, function(name, val){
                    html += '<a href="#" id="badge-'+name+'" class="remove-badge" data-handle="'+handle+'" data-badge="'+name+'"><img src="/img/badges/badge-'+name+'.svg" class="badge-img drop-shadow" style="margin: 5px; width: 50px; height: 50px;"></a>';
                });
            }
            html += "</div><div class='col-sm-6' id='missing-badges'><h3>Available badges</h3><p>Click on any of them to assign them</p>";
            html += "</div></div>";
            $('#modal-main').html(html);
            $.get('/json/badges.json', function( allBadges ) {
                $.each(allBadges, function(name, desc){
                    if(badges == null || typeof badges[name] == 'undefined') {
                        $('#missing-badges').append('<a href="#" id="badge-'+name+'" class="add-badge" data-handle="'+handle+'" data-badge="'+name+'"><img src="/img/badges/badge-'+name+'.svg" class="badge-img drop-shadow" style="margin: 5px; width: 50px; height: 50px;"></a>');
                    }
                });
            });
        });

        // Bind click handler to add badges
        $('#modal-main').on('click','a.add-badge', function(e) {
            var badge = $(this).attr('data-badge');
            addBadge(badge, $(this).attr('data-handle'));
            var link = $('#badge-'+badge).removeClass().addClass('remove-badge').detach();
            $('#current-badges').append(link);
        });
        // Bind click handler to remove badges
        $('#modal-main').on('click','a.remove-badge', function(e) {
            var badge = $(this).attr('data-badge');
            removeBadge(badge, $(this).attr('data-handle'));
            var link = $('#badge-'+badge).removeClass().addClass('add-badge').detach();
            $('#missing-badges').append(link);
        });

        // Bind click handler to change patron
        $('#results').on('click', 'a.changepatron',function(e) {
            $('#modal').removeClass().addClass('shown light');
            var html = "<div id='patronchange' class='m600 text-center'>";
            html += "<h2>Change patron status</h2>";
            html += "<p>Changing patron status for user "+$(this).attr('data-handle')+" ("+$(this).attr('data-email')+") who is currently</p>";
            html += "<div class='container'>";
            html += "<div class='row'>";
            html += "<div class='col-sm-4'><a href='#' class='make-patron' data-patron='2' data-handle='"+$(this).attr('data-handle')+"'><img src='/img/patrons/medals/medal-2.svg'><br>Powder Monkey</a></div>";
            html += "<div class='col-sm-4'><a href='#' class='make-patron' data-patron='4' data-handle='"+$(this).attr('data-handle')+"'><img src='/img/patrons/medals/medal-4.svg'><br>First mate</a></div>";
            html += "<div class='col-sm-4'><a href='#' class='make-patron' data-patron='8' data-handle='"+$(this).attr('data-handle')+"'><img src='/img/patrons/medals/medal-8.svg'><br>Captain</a></div>";
            html += "</div>";
            html += "<p class='text-center'>Or <a href='#' class='make-patron' data-patron='0' data-handle='"+$(this).attr('data-handle')+"'>take away Patron status from user "+$(this).attr('data-handle')+"</a> ("+$(this).attr('data-email')+")</p>";
            html += "</div>";
            html += "</div>";
            $('#modal-main').html(html);
        });

        // Bind click handler to set patron status
        $('#modal-main').on('click','a.make-patron', function(e) {
            var patron = $(this).attr('data-patron');
            makePatron(patron, $(this).attr('data-handle'));
        });

        // Bind click handler to change shipping address
        $('#results').on('click', 'a.changeaddress',function(e) {
            $('#modal').removeClass().addClass('shown light');
            loadUser($(this).attr('data-handle'), function(account){
                var html = "<div id='addresschange' class='m600 text-center'>";
                html += "<h2>Set shipping address for "+account.account.username+" ("+account.account.handle+")</h2>";
                html += "<textarea class=\"form-control\" id=\"address\" name=\"address\" rows=\"5\" placeholder=\"Enter your full name + shipping address here\">"+account.account.data.patron.address+"</textarea>";
                html += "<p class='text-center'><a href='#' class='save-address btn btn-primary mt-3' id='setaddress' data-handle=\""+account.account.handle+"\">Save shipping address</a></p>";
                html += "</div>";
                $('#modal-main').html(html);
            });
        });

        $('#modal-main').on('click', '#setaddress',function(e) {
            setAddress($('#setaddress').attr('data-handle'),$('#address').val());
        });

        function setPassword(userHandle, password) {
            $.ajax({
                url: api.data+'/admin/password',
                method: 'PUT',
                data: { 'password': password, 'user': userHandle},
                dataType: 'json',
                success: function(data) {
                    $('#modal').removeClass();
                    $.bootstrapGrowl('Password set', {type: 'success'});
                },
                error: function(data) { 
                    console.log(data);
                    $.bootstrapGrowl('Failed to set password', {type: 'error'});
                },
                headers: {'Authorization': 'Bearer '+token},
            }); 
        }

        function setAddress(userHandle, address) {
            $.ajax({
                url: api.data+'/admin/address',
                method: 'PUT',
                data: { 'address': address, 'user': userHandle},
                dataType: 'json',
                success: function(data) {
                    $('#modal').removeClass();
                    $.bootstrapGrowl('Address set', {type: 'success'});
                },
                error: function(data) { 
                    console.log(data);
                    $.bootstrapGrowl('Failed to set address', {type: 'error'});
                },
                headers: {'Authorization': 'Bearer '+token},
            }); 
        }

        function getUsers(filter, callBack) {
            $.ajax({
                url: api.data+'/find/users/'+filter,
                method: 'POST',
                dataType: 'json',
                success: function(data) {
                    if(filter = $('#input').val()) renderUsers(data.users);
                }, 
                error: function(data) { 
                    if(filter = $('#input').val()) $.bootstrapGrowl("Nope, that didn't work", {type: 'error'});
                },
                headers: {'Authorization': 'Bearer ' + token},
            }); 
        }

        function renderUsers(users) {
            $('#results').html('');
            $.each(users, function(key, user) {
                var html = '<div class="row paper mb-3 drop-shadow">';
                html += '<div class="col-sm-4">';
                html += '<img src="'+api.data+user.picture+'">';
                html += '</div>';
                html += '<div class="col-sm-8">';
                var patron = 0;
                if(typeof user.patron != 'undefined' && user.patron != null && user.patron.tier != 'undefined' && user.patron.tier > 1) {
                    var patron = user.patron.tier;
                    html += '<img src="/img/patrons/medals/medal-'+patron+'.svg" style="float: right; width: 10%; padding: 0.25rem;">';
                }
                html += '<h5><a href="/users/'+user.userhandle+'">'+user.username+' <small>['+user.userhandle+']</small></a></h5>';
                html += '<p><a href="mailto:'+user.email+'">'+user.email+'</a></p>';
                $.each(user.badges, function(badge, bval) {
                    html += '<img src="/img/badges/badge-'+badge+'.svg" style="width: 28px; heigth: 28px; border-radius: 14px; margin-right: 4px; margin-bottom: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)" >';
                });
                html += '<div class="dropdown mt-3">';
                html += '<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton-'+user.userhandle+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Manage account</button>';
                html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton-'+user.userhandle+'">';
                html += '<a class="dropdown-item changepwd" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'">Change password</a>';
                html += '<a class="dropdown-item changebadges" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'" data-badges=\''+JSON.stringify(user.badges)+'\'>Manage badges</a>';
                html += '<a class="dropdown-item changepatron" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'">Set patron status</a>';
                html += '<a class="dropdown-item changeaddress" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'">Set shipping address</a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                $('#results').append(html);
            });
        }

        function renderComment(comment) {
                var markup = '<div class="mb-3 comment '+comment.status+'">';
                markup += '<div class="meta">';
                var t = comment.time.split(/[- :]/);
                markup += '<small><a href="'+comment.page+'#comment-'+comment.id+'" title="Permalink to this comment">';
                markup += timeago().format(new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5])));
                markup += '</a> by <a href="/users/'+comment.userhandle+'" title="Visit the profile page of this user">'+comment.username+'</a></small>&nbsp;';
                $.each(comment.badges, function(badge, bval) {
                    markup += '<img src="/img/badges/badge-'+badge+'.svg" style="width: 14px; heigth: 14px; border-radius: 7px; margin-right: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)" >';
                });
                markup += '</div>';
                markup += '<div class="comment-text '+comment.status+'">';
                if (comment.status == 'removed') markup += '<i class="fa fa-trash" aria-hidden="true"></i> <em>This comment was removed by its author.</em>';
                else if (comment.status == 'restricted') markup += '<i class="fa fa-ban" aria-hidden="true"></i> <em>his comment was removed by a moderator.</em>';
                else {
                    markup += marked(comment.comment);
                }
                markup += '</div>';
                markup += '</div>';
                $('#comments').append(markup);
        } 

    function addBadge(badge, userHandle) {
        $.ajax({
            url: api.data+'/admin/badge',
            method: 'POST',
            data: { 'badge': badge, 'user': userHandle},
            dataType: 'json',
            success: function(data) {
                $.bootstrapGrowl('Badge '+badge+' added. Reload page to update list.', {type: 'success'});
            },
            error: function(data) { 
                $.bootstrapGrowl('Failed to add badge '+badge+'.', {type: 'error'});
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }
    
    function removeBadge(badge, userHandle) {
        $.ajax({
            url: api.data+'/admin/badge',
            method: 'DELETE',
            data: { 'badge': badge, 'user': userHandle},
            dataType: 'json',
            success: function(data) {
                $.bootstrapGrowl('Badge '+badge+' removed. Reload page to update list.', {type: 'success'});
            },
            error: function(data) { 
                $.bootstrapGrowl('Failed to remove badge '+badge+'.', {type: 'error'});
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }

    function makePatron(patron, userHandle) {
        $.ajax({
            url: api.data+'/admin/patron',
            method: 'POST',
            data: { 'patron': patron, 'user': userHandle},
            dataType: 'json',
            success: function(data) {
                $.bootstrapGrowl('Patron status set to '+patron+'. Reload page to update list.', {type: 'success'});
            },
            error: function(data) { 
                $.bootstrapGrowl('Failed to change Patron status.', {type: 'error'});
            },
            headers: {'Authorization': 'Bearer '+token},
        }); 
    }
    
        function loadUser(handle, callback) {
        return $.ajax({
            url: api.data+'/admin/user/'+handle,
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

    
    });
}(jQuery));

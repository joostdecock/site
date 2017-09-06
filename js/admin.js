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
                html += '<img src="'+api.data+user.picture+'" style="float: left; width: 200px;">';
                html += '</div>';
                html += '<div class="col-sm-8">';
                html += '<h5><a href="/users/'+user.userhandle+'">'+user.username+' <small>['+user.userhandle+']</small></a></h5>';
                html += '<p><a href="mailto:'+user.email+'">'+user.email+'</a></p>';
                $.each(user.badges, function(badge, bval) {
                    html += '<img src="/img/badges/badge-'+badge+'.svg" style="width: 28px; heigth: 28px; border-radius: 14px; margin-right: 4px; margin-bottom: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)" >';
                });
                html += '<p><a class="changepwd btn btn-primary btn-sm mt-3" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'">Change password</a> <a class="changebadges btn btn-primary btn-sm mt-3" href="#" data-email="'+user.email+'" data-handle="'+user.userhandle+'" data-badges=\''+JSON.stringify(user.badges)+'\'>Manage badges</a>';
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

    });
}(jQuery));

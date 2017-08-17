(function ($) {
    $(document).ready(function () {

        $.get(api.data+'/comments/recent/5', function( comments ) {
            console.log(comments);
            Object.keys(comments.comments).sort().reverse().forEach(function(key) {
                renderComment(comments.comments[key]);
            });
        });

        $('#landing').on('submit','#signup-landing', function(e) {
            e.preventDefault();
            // Show loader
            $('#landing').load('/snippets/generic/loading');
            $.post(api.data+'/signup', $('#signup-landing').serialize(),function( data ) {
                if(typeof data.message !== 'undefined') {
                    if(data.reason == 'account_exists') {
                        msg = '<h2>We have a user with that email address</h2><p class="lead">Perhaps you wanted to login instead?</p><a href="#burger" class="btn btn-lg btn-outline-white" onclick="login(\'login\');">Login</a>';
                    } else if(data.reason == 'signup_complete') {
                        msg = '<h2>Yay, almost there</h2><p class="lead">An email is on its way to confirm your account.<br>Please follow the instructions in it.</p>';
                    } else {
                        msg = '<h2>Well this is awkward</h2><p class="lead">Something went wrong.<br>Perhaps our signup page will handle this better.</p><a href="#burger" class="btn btn-lg btn-outline-white" onclick="login(\'signup\');">Sign up here</a>';
                    }
                    $('#landing').html(msg);
                } else {
                    $('#landing').load('/components/generic/error');
                }
            }, 'json');
        });

        function renderComment(comment) {
                var markup = '<div class="mb-1 comment '+comment.status+'">';
                markup += '<div class="meta">';
                var t = comment.time.split(/[- :]/);
                markup += '<small><a href="'+comment.page+'#comment-'+comment.id+'" title="Permalink to this comment">';
                markup += timeago().format(new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5])));
                markup += '</a> by <a href="/users/'+comment.userhandle+'" title="Visit the profile page of this user">'+comment.username+'</a></small>';
                markup += '</div>';
                markup += '<div class="comment-text '+comment.status+'">';
                if (comment.status == 'removed') markup += '<i class="fa fa-trash" aria-hidden="true"></i> <em>This comment was removed by its author.</em>';
                else if (comment.status == 'restricted') markup += '<i class="fa fa-ban" aria-hidden="true"></i> <em>his comment was removed by a moderator.</em>';
                else {
                    markup += marked(comment.comment);
                }
                markup += '</div>';
                markup += '</div>';
                $('#recent-comments').append(markup);
        } 

    });
}(jQuery));

(function ($) {
    $(document).ready(function () {
        var repos = ['core', 'data', 'site'];
        $.each(repos, function( index, repo ) {
            $.get('https://api.github.com/repos/freesewing/'+repo+'/issues', function( issues ) {
                $('#'+repo+'-count').html(issues.length);
                if(issues.length > 0) {
                    $('#'+repo+'-issues').html('<p>'+issues.length+' open issues in <a href="https://github.com/freesewing/'+repo+'" target="_BLANK">'+repo+'</a></p>');
                    $.each(issues, function( index, issue ) {
                        $('#'+repo+'-issues').append(renderIssue(issue, repo));
                    });
                    timeago().render($('.timeago'));
                } else {
                    $('#'+repo+'-issues').html('<p>No open issues in <a href="https://github.com/freesewing/'+repo+'" target="_BLANK">'+repo+'</a></p>');
                }
            });
        });

        function renderIssue(issue, repo) {
            console.log(issue);
            var html = '<div class="mb-4 drop-shadow paper" id="'+repo+'-'+issue.number+'">';
            html += '<p class="mb-0 py-0"><small>Issue <a href="#'+repo+'-'+issue.number+'">#'+issue.number+'</a>, ';
            html += 'created <span class="timeago" datetime="'+issue.created_at+'"></span> by ';
            html += '<a href="'+issue.user.html_url+'" target="_BLANK">'+issue.user.login+'</a></small></p>';
            html += '<h4 class="mt-0 py-0"><a href="'+issue.html_url+'" target="_BLANK">'+issue.title+'</a></h4>';
            html += '<div class="content" style="overflow-x: auto;">'+marked(issue.body)+'</div>';
            $.each(issue.labels, function( index, label ) {
                html += '<span class="badge" style="background: #'+label.color+';">'+label.name+'</span> ';
            });
            html += '<p class="mb-0 mt-4"><small>'+issue.comments+' comments, last update <span class="timeago" datetime="'+issue.updated_at+'"></span></small></p>';
            html += '</div>';
            return html;
        }
    });
}(jQuery));

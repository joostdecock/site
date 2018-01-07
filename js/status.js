(function ($) {
    $(document).ready(function () {
        var repos = ['core', 'data', 'site'];
        $.getJSON(api.core+'/?service=info', function( s ) {
            $('#core-status').addClass('bg-success').append('<h5>Up and running <small>[v'+s.version+']</small></h5>');
        }).fail(function() {
            $('#core-status').addClass('bg-danger').append('<h5>Down</h5>');
            $('#core-status div.status-icon i').removeClass('fa-check').addClass('fa-times');
            $('#overall-status').addClass('bg-danger');
            $('#overall-status i').removeClass('fa-smile-o').addClass('fa-frown-o');
            $('#overall-status h6').html('Sorry, we seem to be having some problems right now');
        });
        $.getJSON(api.data+'/status', function( s ) {
            $('#data-status').addClass('bg-success').append('<h5>Up and running</h5>');
            $.each(s.rollbar.result.items, function(index, item){
                if(item.level == 'error') var levelclass = 'danger';
                else var levelclass = 'default';
                if(item.unique_occurrences > 10) var countclass = 'warning';
                else if(item.unique_occurrences > 100) var countclass = 'danger';
                else var countclass = 'default';
                if(item.environment == 'data.freesewing.org') var environment = 'data';
                else if(item.environment == 'core.freesewing.org') var environment = 'core';
                else var environment = item.environment;
                var row = "<tr><td><span class='badge badge-"+levelclass+"'>"+item.level+"</span></td>";
                row += "<td class='text-center'><span class='badge badge-"+countclass+"'>"+item.unique_occurrences+"</span></td><td>"+environment+"</td><td><small>"+item.title+"</small></td></tr>";
                $('#rollbar-table').append(row);
            });
            $('.users').html(s.data.users);
            $('.models').html(s.data.models);
            $('.drafts').html(s.data.drafts);
            $('.comments').html(s.data.comments);
            $('#uptime').html(s.system.uptime);
            $('#cpu').css('width', s.system.cpu+'%').attr('aria-valuenow', s.system.cpu).html(s.system.cpu+'%');
            var swap = parseInt(s.system.swap.free) + parseInt(s.system.swap.used);
            var used = s.system.swap.used / (swap/100);
            $('#swap').css('width', used+'%').attr('aria-valuenow', used).html(s.system.swap.used+'/'+swap);
            var memory = parseInt(s.system.memory.free) + parseInt(s.system.memory.used);
            var used = s.system.memory.used / (memory/100);
            $('#memory').css('width', used+'%').attr('aria-valuenow', used).html(s.system.memory.used+'/'+memory);
            var onepercent = -1;
            $.each(s.referrals, function(index, referral){
                if (onepercent == -1) onepercent = referral.hits / 100;
                var percent = referral.hits/onepercent;
                var row = "<tr>"
                row += "<td style='max:width: 4rem; text-align: right;'>"+referral.hits+"</td>";
                if(typeof referral.link == 'undefined') row += "<td>"+referral.site+"</td>";
                else row += "<td><a href='"+referral.link+"' target='_BLANK'><b>"+referral.site+"</b></a></td>";
                row += "<td class='not-on-small' style='width: 60%'><div class='progress'><div class='progress-bar' role='progressbar' style='width: "+percent+"%' aria-valuenow='"+percent+"' aria-valuemin='0' aria-valuemax='100'></div></div></td>";
                row += "</tr>";
                $('#reflist').append(row);
            });
        }).fail(function() {
            $('#data-status').addClass('bg-danger').append('<h5>Down</h5>');
            $('#data-status div.status-icon i').removeClass('fa-check').addClass('fa-times');
            $('#overall-status').addClass('bg-danger');
            $('#overall-status i').removeClass('fa-smile-o').addClass('fa-frown-o');
            $('#overall-status h6').html('Sorry, we seem to be having some problems right now');
        });
        $.get('/json/freesewing.json', function( fsdata ) {
            $('.patterns').html(Object.keys(fsdata.patterns).length);
        });
        var branch = $('#branch').attr('data-branch');
        $.each(repos, function( index, repo ) {
            $.get('https://api.github.com/repos/freesewing/'+repo+'/branches/'+branch, function( c ) {
                renderRepo(repo, c.commit, branch);
            });
        });
        timeago().render($('.timeago'));

        function renderRepo(repo, commit, branch) {
            var html = '<p class="counter"><a href="'+commit.html_url+'" target="_BLANK">'+commit.sha.substr(0,7)+'</a></p>';
            html += '<p><b>'+commit.commit.message+'</b></p>';
            html += '<p><small><span class="timeago" datetime="'+commit.commit.committer.date+'"></span> by <a href="'+commit.committer.html_url+'" target="_BLANK">'+commit.committer.login+'</a>';
            html += ' in the <a href="https://github.com/freesewing/'+repo+'/tree/'+branch+'" target="_BLANK">'+branch+'</a> branch</small></p>';
            $('#'+repo).append(html);
            timeago().render($('.timeago'));
        }

        $.each(repos, function( index, repo ) {
            $.get('https://api.github.com/repos/freesewing/'+repo+'/issues', function( issues ) {
                $('#'+repo+'-count').html(issues.length);
                if(issues.length > 0) {
                    $.each(issues, function( index, issue ) {
                        var row = '<tr><td>'+repo+'</td><td><a href="'+issue.html_url+'" target="_BLANK">#'+issue.number+'</a></td>';
                        row += '<td><a href="'+issue.user.html_url+'" target="_BLANK">'+issue.user.login+'</a></td>';
                        row += '<td><small>'+issue.title+'<small></td>';
                        row += '</tr>';
                        $('#github-table').append(row);
                    });
                }
            });
        });

        function renderIssue(issue, repo) {
            var html = '<div class="mb-4 drop-shadow paper" id="'+repo+'-'+issue.number+'">';
            html += '<p class="mb-0 py-0"><small>Issue <a href="#'+repo+'-'+issue.number+'">#'+issue.number+'</a>, ';
            html += 'created <span class="timeago" datetime="'+issue.created_at+'"></span> by ';
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

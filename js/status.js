(function ($) {
    $(document).ready(function () {
        var repos = ['core', 'data', 'site'];
        $.getJSON(api.data+'/status', function( s ) {
            $('#users').html(s.data.users);
            $('#models').html(s.data.models);
            $('#drafts').html(s.data.drafts);
            $('#comments').html(s.data.comments);
            $('#uptime').html(s.system.uptime);
            $('#cpu').css('width', s.system.cpu+'%').attr('aria-valuenow', s.system.cpu).html(s.system.cpu+'%');
            var swap = parseInt(s.system.swap.free) + parseInt(s.system.swap.used);
            var used = s.system.swap.used / (swap/100);
            $('#swap').css('width', used+'%').attr('aria-valuenow', used).html(s.system.swap.used+'/'+swap);
            var memory = parseInt(s.system.memory.free) + parseInt(s.system.memory.used);
            var used = s.system.memory.used / (memory/100);
            $('#memory').css('width', used+'%').attr('aria-valuenow', used).html(s.system.memory.used+'/'+memory);
        });
        $.get('/json/freesewing.json', function( fsdata ) {
            $('#patterns').html(Object.keys(fsdata.patterns).length);
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

    });
}(jQuery));

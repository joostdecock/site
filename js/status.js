(function ($) {
    $(document).ready(function () {
        var repos = ['core', 'data', 'site'];
        $.getJSON(api.data+'/status', function( s ) {
            console.log(s);
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
            console.log(fsdata);
            $('#patterns').html(Object.keys(fsdata.patterns).length);
        });

    });
}(jQuery));

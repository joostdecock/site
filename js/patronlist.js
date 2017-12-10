(function ($) {
    $(document).ready(function () {

        $.get(api.data+'/patrons/list', function( result ) {
            if(result.result == 'ok') {
                $.each(result.patrons, function(timestamp, patron){
                    renderPatron(patron);
                });
            }
            timeago().render($('.timeago'));
        });

        function renderPatron(patron) {
                console.log(patron);
                var markup = '<div class="card hover-shadow mb-2 mt-3">';
                markup += '<a href="/users/'+patron.handle+'" title="Visit the profile page of this Patron">';
                markup += '<img src="/img/patrons/medals/medal-'+patron.tier+'.svg" class="medal-corner">';
                markup += '<img src="'+patron.picture+'" alt="Profile image" class="card-img-top">';
                markup += '</a>';
                markup += '<footer class="rounded-bottom">';
                markup += patron.username+' is a '+patrons[patron.tier]+ ' since <span class="timeago" datetime="'+new Date(patron.since*1000).toString()+'"></span>';
                markup += '</footer>';
                markup += '</div>';
                $('#patron-list').append(markup);
        } 

    });
}(jQuery));

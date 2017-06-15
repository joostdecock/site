(function ($) {
    $('#modal-main').load('/components/tour/wrapper', function(){
        // Should we preload an episode?
        if($('#tour-config').length) {
            loadTourEpisode($('#tour-config').attr('data-episode'));
        }

        $('a#next-chapter').click(function(){ nextChapter() });
        $('a#prev-chapter').click(function(){ prevChapter() });
        // Bind change of filter
        $('#tour-toc').on('change', '#episode-select', function(e) {
            loadTourEpisode($('#episode-select').val());
        });
        $('#modal-main').on('click', 'a.tour-load', function(e) {
            loadTourEpisode($(e.currentTarget).attr('data-tour'));
        });
        
        $('#modal-main').on('click', 'a.tour-home', function() {
            $('#episode-select').val('none');
            $('#tour-toc').removeClass('hidden');
            $('#tour-wrapper').addClass('hidden');
            $('#tour-nav').addClass('hidden');
            $('#tour-back').addClass('hidden');
        });
       
    });

    function loadTourEpisode(episode) {
        if(episode != 'none') {
            $('#tour-toc').addClass('hidden');
            $('#prev-chapter').addClass('hidden');
            $('#tour-nav').removeClass('hidden');
            $('#tour-wrapper').removeClass('hidden').load('/components/tour/episodes/'+episode);
            $('#tour-back').removeClass('hidden');
            if (episode == 'welcome') { $('#try-this').addClass('hidden'); }
            $('#next-chapter').removeClass('hidden');
        }
    }

    function nextChapter() {
        $('#prev-chapter').removeClass('hidden');
        var step = 400
        var chapters = parseInt($('div.episode').attr('data-chapters'),10);
        var margin = parseInt($('div.episode').css('margin-left'),10);
        var edge = (chapters -2) * step * -1;
        if(margin == edge) $('#next-chapter').addClass('hidden');
        else $('#next-chapter').removeClass('hidden');
        $('div.episode').css('margin-left', '-='+step);
    }

    function prevChapter() {
        $('#next-chapter').removeClass('hidden');
        var step = 400
        var margin = parseInt($('div.episode').css('margin-left'),10);
        if(margin == step * -1) $('#prev-chapter').addClass('hidden');
        else $('#prev-chapter').removeClass('hidden');
        $('div.episode').css('margin-left', '+='+step);
    }
}(jQuery));


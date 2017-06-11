---
layout: cards
title: Patterns
permalink: /patterns/
---
<div class="container" id="pattern-container">
    <p id="quick-links" class="text-center m600 mb-4"></p>
    <div class="mt-2 hidden" id="pattern">
        <div class="card m600 hover-shadow">
            <a class="pattern-link" href='/patterns/' title="Read more"><img class="card-img-top pattern-img" src="" alt=""></a>
            <div class="card-block">
                <a class="pattern-link" href='/patterns/' title="Read more"><h4 class="card-title pattern-title text-capitalize"></h4></a>
                <p class="lead card-text pattern-tagline"></p>
                <ul class="tags"></ul>
            </div>
        </div>
    </div>
</div>
<script>
(function ($) {
    $(document).ready(function () {
        $.get('/json/freesewing.json', function( fsdata ) {
            console.log(fsdata);
            var list = Object.keys(fsdata.mapping.handleToPattern);
            $.each(list.sort(), function(index, handle){
                var pattern = fsdata.mapping.handleToPattern[handle];
                var namespace = fsdata.mapping.handleToNamespace[handle].toLowerCase();
                $('#quick-links').append('<a class="text-capitalize mx-1" href="/patterns/'+handle+'">'+handle+'</a> ');
                $('#pattern').clone().removeClass('hidden').addClass(namespace).attr('id', 'pattern-'+handle).appendTo('#pattern-container');
                $('#pattern-'+handle+' .pattern-title').html(handle);
                $('#pattern-'+handle+' .pattern-tagline').html(fsdata.patterns[pattern].info.description);
                $('#pattern-'+handle+' img.pattern-img').attr('src', '/img/patterns/'+handle+'/spread.jpg').attr('alt', 'A line drawing and images of '+handle);
                $('#pattern-'+handle+' .pattern-link').attr('href', '/patterns/'+handle).attr('title', 'More info about '+handle);
                $('#pattern-'+handle+' .tags').append('<li><span class="badge '+namespace+'">'+namespace+'</span></li>');
                $.each(fsdata.patterns[pattern].info.tags, function(index, tag){
                    $('#pattern-'+handle+' .tags').append('<li><span class="badge badge-primary '+tag+'">'+tag+'</span></li>');
                    $('#pattern-'+handle).addClass(tag);
                }); 
            });
        });
    });
}(jQuery));
</script>

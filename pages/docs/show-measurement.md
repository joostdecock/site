---
layout: onecol
title: Measurement
tags: [maker docs]
img: /img/potw/potw.jpg
permalink: /docs/crumb-measurements/measurement
---
<div id="measurements"></div>
<script>
(function ($) {
    $(document).ready(function () {
        var page = window.location.pathname;
        var mHandle = page.split('/')[3].toLowerCase();
        $.get('/json/measurements.json', function( mdata ) {
            var list = Object.keys(mdata);
            $.each(list.sort(), function(index, m){
                if(m.toLowerCase() == mHandle) {
                    $('h1.page-title').html(m);
                    $('ul.breadcrumbs li:last-child').html(m);
                    $('#measurements').append('<div id="'+m+'-markup"></div>');    
                    $('#'+m+'-markup').load('/components/measurements/'+m.toLowerCase());
                }
            });
        });
    });
}(jQuery));
</script>

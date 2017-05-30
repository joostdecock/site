---
layout: page
title: Measurements
tags: [maker docs]
img: /img/potw/potw.jpg
permalink: /docs/measurements
---
<div id="measurements"></div>
<script>
(function ($) {
    $(document).ready(function () {
        $('#oc-right').append('<ul id="markdown-toc"></ul>');    
        $.get('/json/measurements.json', function( mdata ) {
            var list = Object.keys(mdata);
            $.each(list.sort(), function(index, m){
                $('#markdown-toc').append('<li><a href="#'+m+'">'+m+'</a></li>');    
                $('#measurements').append('<h2 id="'+m+'">'+m+'</h2><div id="'+m+'-markup"></div>');    
                $('#'+m+'-markup').load('/components/measurements/'+m.toLowerCase());
            });
        });
    });
}(jQuery));
</script>

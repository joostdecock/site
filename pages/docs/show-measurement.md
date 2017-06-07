---
layout: onecol
title: Measurement
tags: [maker docs]
img: /img/potw/potw.jpg
permalink: /docs/show-measurement
crumbs:
  - /docs|Docs
  - /docs/measurements|Measurements
---
<div id="measurements"></div>
<script>
(function ($) {
    $(document).ready(function () {
        var page = window.location.pathname;
        var m = page.split('/')[3].toLowerCase();
        $('h1.page-title').html(m);
        $('ul.breadcrumbs li:last-child').html(m);
        $('#measurements').append('<div id="'+m+'-markup"></div>');    
        $('#'+m+'-markup').load('/components/measurements/'+m.toLowerCase());
    });
}(jQuery));
</script>

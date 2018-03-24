---
layout: cards
title: Tools
tags: [tools]
permalink: /tools/
action: tools
nocomments: true
---
<div class="container">
<div class="row logged-in-only">

<div class="col-md-6">
{% include blockquote.html
  bg='#fff'
  icon='print'
  tcolor='#292b2c'
  icolor='#393939'
  content="
<h5>Convert and/or tile an SVG file</h5>
<p>When you draft a pattern here, you can download it in a number of formats, all neatly tiled so you can print them.</p>
<p>You can also download the SVG source code to make further changes to the patterns. But once you have made those changes, there’s no easy way for you to get it as a printable PDF.</p>
<p>Well now there is. We’ve added an on-demand tiler to the site that does just that. Upload your SVG, pick the format of your choice, and we’ll tile it for you.</p>
<p class='text-right'><a href='/tools/tiler' class='btn btn-outline-primary btn-lg'>On-demand tiler</a></p>
"
%}
</div>

<div class="col-md-6">
{% include blockquote.html
  bg='#fff'
  icon='cloud-download'
  tcolor='#292b2c'
  icolor='#0083f3'
  content="
<h5>Export your data</h5>
<p>This will bundle all data we have on file for you into a single downloadable archive.</p>
<p>You can use it prior to removing your account to avoid losing any data, or at any moment you want a snapshot of what we have stored for you.</p>
<p>Your data will be bundled in a ZIP archive for which we'll send you a download link when it's ready.</p>
<p class='text-right'><a href='/tools/export' class='btn btn-outline-primary btn-lg'>Data export</a></p>
"
%}
</div>

</div>
<div class="row">

<div class="col-md-6">
{% include blockquote.html
  bg='#fff'
  icon='rss'
  tcolor='#292b2c'
  icolor='#f89100'
  content="
<h5>Blog posts Atom feed</h5>
<p>We have an Atom feed available of our blog posts that yu can subscribe to.</p>
<p>Note that your feed reader will know about this feed if you just point it to freesewing.org.</p>
<p class='text-right'><a href='/feed.xml' class='btn btn-outline-primary btn-lg'>Blog posts Atom feed</a></p>
"
%}
</div>
</div>
<h2 class="logged-in-only">Danger zone</h2>
<div class="row logged-in-only">
<div class="col-md-6">
{% include blockquote.html
  bg='#d9534f'
  icon='trash-o'
  tcolor='#fff'
  icolor='#fff'
  content="
<h5>Remove your account</h5>
<p>Click the button below to remove your account.</p>
<p class='text-right'><a href='#' id='delete-btn' class='btn btn-outline-white btn-lg'>Delete your account</a></p>
"
%}
</div>


</div>
</div>


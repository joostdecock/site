---
layout: cards
title: Blog posts in core
permalink: /blog/category/core
nocomments: true
---
<div class="container">
<div class="row">
<div class="col">
<div class="card-columns blog">
{% for post in site.posts %}
{% if post.category == 'core' %}
<div class="card hover-shadow mb-3">
<a href="{{ post.url }}" title="{{ post.title | escape}}">
<img 
    src="/img{{ post.url }}lqip_{{ post.img }}" 
    data-sizes="auto"
    data-srcset="
        /img{{ post.url }}lqip_{{ post.img }} 25w,
        /img{{ post.url }}low_{{ post.img }} 500w,
        /img{{ post.url }}med_{{ post.img }} 1000w,
        /img{{ post.url }}high_{{ post.img }} 2000w"
    alt="{{ post.caption }}" 
    class="card-img-top lazyload"
>
</a>
<div class="card-block">
<h4 class="card-title"><a href="{{ post.url }}" title="{{ post.title | escape}}">{{ post.title }}</a></h4>
</div>
<footer class="rounded-bottom">
On {{ post.date | date: '%B %d, %Y' }}
by <a href="/blog/author/{{ post.author }}" title="Browse other posts by this author">{{ post.author }}</a>
in <a href="/blog/category/{{ post.categories }}" title="Browse other posts in this category">{{ post.categories }}</a>
</footer>
</div>
{% endif %}
{% endfor %}
</div>
</div>
</div>
</div>


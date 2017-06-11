---
layout: cards
title: Blog
permalink: /blog/
---
<div class="container">
<div class="row">
<div class="col">
<div class="card-columns blog">
{% for post in site.posts %}
<div class="card hover-shadow">
<a href="{{ post.url }}" title="{{ post.title | escape}}"><img class="card-img-top img-fluid" src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}"></a>
<div class="card-block">
<h4 class="card-title"><a href="{{ post.url }}" title="{{ post.title | escape}}">{{ post.title }}</a></h4>
</div>
<footer class="rounded-bottom">
<a href="/blog/author/{{ post.author }}" title="Browse other posts by this author">{{ post.author }}</a>
in <a href="/blog/category/{{ post.categories }}" title="Browse other posts in this category">{{ post.categories }}</a>
on {{ post.date | date_to_string }}
</footer>
</div>
{% endfor %}
</div>
</div>
</div>
</div>


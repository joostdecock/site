---
layout: cards
title: Showcase
permalink: /showcase/
---
<div class="container">
<div class="row">
<div class="col">
<div class="card-columns blog">
{% assign sorted = site.showcases | sort:"date" | reverse %}
{% for post in sorted %}
<div class="card hover-shadow mb-3 mb-3">
<a href="{{ post.url }}" title="{{ post.title | escape}}"><img class="card-img-top img-fluid" src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}"></a>
<footer class="rounded-bottom">
<a href="/showcase/pattern/{{ post.categories }}" title="Browse other showcases of this pattern">{{ post.categories }}</a> by 
<a href="/showcase/maker/{{ post.author }}" title="Browse other showcases by this maker">{{ post.author }}</a>
</footer>
</div>
{% endfor %}
</div>
</div>
</div>
</div>


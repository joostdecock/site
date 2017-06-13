---
layout: cards
title: Showcases by nani
permalink: /showcase/maker/nani
---
<div class="container">
<div class="row">
<div class="col">
<div class="card-columns blog">
{% for post in site.showcases %}
{% if post.author == 'nani' %}
<div class="card hover-shadow">
<a href="{{ post.url }}" title="{{ post.title | escape}}"><img class="card-img-top img-fluid" src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}"></a>
<footer class="rounded-bottom">
<a href="/showcase/pattern/{{ post.categories }}" title="Browse other showcases of this pattern">{{ post.categories }}</a> by 
<a href="/showcase/maker/{{ post.author }}" title="Browse other showcases by this maker">{{ post.author }}</a>
</footer>
</div>
{% endif %}
{% endfor %}
</div>
</div>
</div>
</div>


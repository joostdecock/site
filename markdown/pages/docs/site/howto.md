---
layout: onecol
title: Howtos
tags: [site docs]
permalink: /docs/site/howto/
nocomments: true
---
<ul>
{% for somepage in site.pages %}
{% if somepage.tags contains 'howto' %}
    {% if somepage.tags contains 'site docs' %}
        <li><a class="post-title" href="{{ site.baseurl }}{{ somepage.url }}">{{ somepage.title }}</a></li>
    {% endif %}
{% endif %}
{% endfor %}
</ul>


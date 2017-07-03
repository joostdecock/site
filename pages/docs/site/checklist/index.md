---
layout: onecol
title: Checklists
tags: [site docs]
permalink: /docs/site/checklist/
nocomments: true
---
<ul>
{% for somepage in site.pages %}
{% if somepage.tags contains 'checklist' %}
        <li><a class="post-title" href="{{ site.baseurl }}{{ somepage.url }}">{{ somepage.title }}</a></li>
{% endif %}
{% endfor %}
</ul>


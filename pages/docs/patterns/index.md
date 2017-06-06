---
layout: page
title: Pattern documentation
tags: [pattern docs]
permalink: /docs/patterns/
---

test:
<ul>
    {% for namespace in site.data.patterns %}
        <li><a href="{{ item.url }}" alt="{{ item.title }}">{{ namespace }}</a></li>
        {% for pattern in namespace[0] %}
            <li><a href="{{ item.url }}" alt="{{ item.title }}">{{ pattern }}</a></li>
        {% endfor %}
    {% endfor %}
</ul>


FIXME

* TOC - Do not remove this line
{:toc}

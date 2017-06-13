---
layout: onecol
title: Showcases by pattern
permalink: /showcase/pattern/
---
<ul>
{% assign rawpatterns = "" %}
{% for page in site.showcases %}
    {% assign rawpatterns = rawpatterns | append: page.category | append: '|' %}
{% endfor %}
{% assign rawpatterns = rawpatterns | split:'|' | sort %}

{% assign patterns = "" %}
{% for pattern in rawpatterns %}
    {% unless patterns contains pattern %}
        {% assign patterns = patterns | append:'|' | append:pattern %}
    {% endunless %}
{% endfor %}

{% assign patterns = patterns | split:'|'%}
<ul>
{% for pattern in patterns %}
    {% unless pattern == '' %}
        <li><a href="{{ pattern }}">{{ pattern | capitalize }}</a></li>
    {% endunless %}
{% endfor %}
</ul>

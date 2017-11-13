---
layout: onecol
title: Blog post authors
permalink: /blog/author/
---
{% assign rawauthors = "" %}
{% for page in site.posts %}
    {% assign rawauthors = rawauthors | append: page.author | append: '|' %}
{% endfor %}
{% assign rawauthors = rawauthors | split:'|' | sort %}

{% assign authors = "" %}
{% for author in rawauthors %}
    {% unless authors contains author %}
        {% assign authors = authors | append:'|' | append:author %}
    {% endunless %}
{% endfor %}

{% assign authors = authors | split:'|'%}
<ul>
{% for author in authors %}
    {% unless author == '' %}
        <li><a href="{{ author | downcase | replace: ' ', '' }}">{{ author }}</a></li>
    {% endunless %}
{% endfor %}
</ul>

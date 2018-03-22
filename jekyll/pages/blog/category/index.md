---
layout: onecol
title: Blog post categories
permalink: /blog/category/
---
<ul>
{% assign rawcategories = "" %}
{% for page in site.posts %}
    {% assign rawcategories = rawcategories | append: page.category | append: '|' %}
{% endfor %}
{% assign rawcategories = rawcategories | split:'|' | sort %}

{% assign categories = "" %}
{% for category in rawcategories %}
    {% unless categories contains category %}
        {% assign categories = categories | append:'|' | append:category %}
    {% endunless %}
{% endfor %}

{% assign categories = categories | split:'|'%}
<ul>
{% for category in categories %}
    {% unless category == '' %}
        <li><a href="{{ category }}">{{ category | capitalize }}</a></li>
    {% endunless %}
{% endfor %}
</ul>

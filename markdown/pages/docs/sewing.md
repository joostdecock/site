---
layout: onecol
title: Sewing docs
permalink: /docs/sewing/
---
{% assign rawtags = "" %}
{% for page in site.pages %}
    {% assign ttags = page.tags | join:'|' | append:'|' %}
    {% assign rawtags = rawtags | append:ttags %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}
{% for tag in rawtags %}
    {% if tag != "" %}
        {% if tags == "" %}
            {% assign tags = tag | split:'|' %}
        {% endif %}
        {% unless tags contains tag %}
            {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
        {% endunless %}
    {% endif %}
{% endfor %}

Below is a list of documentation on some of the sewing terminology and techniques used on freesewing.org.

{% for tag in tags %}
{% if tag == 'sewing docs' %}
<ul class="files">
{% for somepage in site.pages %}
{% if somepage.tags contains tag %}
    <li><a class="post-title" href="{{ site.baseurl }}{{ somepage.url }}"> {{ somepage.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
{% endif %}
{% endfor %}

> <h5>Missing something?</h5>
> 
> If there's something I've missed or that leaves you guessing, please let me know so I can add it.
{:.question}



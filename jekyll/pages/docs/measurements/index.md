---
layout: page
title: Measurements
tags: [maker docs]
img: /img/potw/potw.jpg
permalink: /docs/measurements/
nocomments: true
---
{% assign measurements = site.data.freesewing.measurements | sort %}
{% for measurement in measurements %}
{% assign mname = measurement[0] %}
{% assign mfile = 'measurements/' | append: mname | downcase | append: '.html' %}
<h2 id="{{ measurement[0] }}">{{ mname }}</h2>
{% include {{ mfile }} %}

> <h5>More on the <a href="/docs/measurements/{{ mname | downcase }}">{{ mname }}</a> page</h5>
> This is an extract from <a href="/docs/measurements/{{ mname | downcase }}">the {{ mname }} documentation</a>
> which might have more detailed info and also allows user comments.
{:.link}
{% endfor %}

<ul id="markdown-toc">
{% for measurement in site.data.freesewing.measurements %}
<li><a href="#{{ measurement[0] }}">{{ measurement[0] }}</a></li>
{% endfor %}
</ul>

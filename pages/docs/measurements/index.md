---
layout: page
title: Measurements
tags: [maker docs]
img: /img/potw/potw.jpg
permalink: /docs/measurements/
---
{% for measurement in site.data.freesewing.measurements %}
{% assign mname = measurement[0] %}
{% assign mfile = 'measurements/' | append: mname | downcase | append: '.md' %}
<h2 id="{{ measurement[0] }}">{{ mname }}</h2>
{% include {{ mfile }} %}
{% endfor %}

<ul id="markdown-toc">
{% for measurement in site.data.freesewing.measurements %}
<li><a href="#{{ measurement[0] }}">{{ measurement[0] }}</a></li>
{% endfor %}
</ul>

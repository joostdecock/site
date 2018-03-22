---
layout: page
title: Badges
permalink: /docs/site/badges
---
## About badges {#about}


Badges are a playful way to give credit to people for being involved with freesewing.

There's badges that are easy to get, and others that are very hard to get and 
exceedingly rare.


> ##### Missing a badge?
>
> While many badges are unlocked automatically based on your activity on the site, 
> some are assigned to you manually (the donate badge for example).
>
> If you feel you've earned a badge and it's not shown on your profile page, feel free to 
> [get in touch](/contact). 
{:.tip}

## Available badges {#list}

{% for badge in site.data.badges %}<a href="#{{badge[0]}}" class="noline"><img alt="A badge" src="/img/badges/badge-{{badge[0]}}.svg" class="badge-img drop-shadow" style="margin-right: 5px; margin-bottom: 5px; width: 50px; height: 50px; display: inline-block"></a>{% endfor %}
{% for badge in site.data.badges %}
  <h3 id="{{badge[0]}}" style="clear: both;">{{badge[0]}}</h3>
  <img src="/img/badges/badge-{{badge[0]}}.svg" class="badge-img drop-shadow" style="float: left; margin-right: 1rem;" alt="A badge">
  <p>{{ badge[1] }}</p>
{% endfor %}

<div style="clear: both;"></div>

## Suggest a badge {#new}

Have a good idea for a fun badge to add to the site? Feel free to 
[suggest it](https://github.com/freesewing/site/issues/new?title=New%20badge%20suggestion&body=Explain your badge idea here).

<ul id="markdown-toc">
<li><a href="#about">About badges</a></li>
<li><a href="#list">Available badges</a>
<ul>
{% for badge in site.data.badges %}
<li><a href="#{{ badge[0] }}">{{ badge[0] }}</a></li>
{% endfor %}
</ul>
</li>
<li><a href="#new">Suggest a badge</a></li>
<ul>


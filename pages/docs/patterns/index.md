---
layout: page
title: Pattern documentation
tags: [pattern docs]
permalink: /docs/patterns/
---
* TOC - Do not remove this line
{:toc}

## Per pattern
> For each pattern, there's the **instructions** on how to make the garment, 
> as well as documentation of the required **measurments** and pattern **options**.
{:.tip}

<div markdown="0">
<table class="table table-striped">
{% for pattern in site.data.freesewing.patterns %}
<tr><td class="text-right"><b>{{ pattern[1].info.name }}</b></td>
<td><a href="/docs/patterns/{{ pattern[1].info.handle }}" title="{{ pattern[1].info.handle }} instructions">Instructions</a></td>
<td><a href="/docs/patterns/{{ pattern[1].info.handle }}/measurements" title="{{ pattern[1].info.handle }} measurements">Measurements</a></td>
<td><a href="/docs/patterns/{{ pattern[1].info.handle }}/options" title="{{ pattern[1].info.handle }} options">Options</a></td>
</tr>
{% endfor %}
</table>
</div>

## Not pattern specific

- [Pattern lineage](/docs/patterns/lineage): Think of it as the family tree of our patterns.
- [Notation legend](/docs/patterns/notation-legend): Explains lines/colours/marking used on our drafts.


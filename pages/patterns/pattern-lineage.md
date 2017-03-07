---
layout: page
title: Pattern lineage
tags: [patterns]
permalink: /patterns/lineage
---
## Extending patterns

Patterns can extend (be based on) other patterns, which leads 
to the sort of pattern family tree shown below.

Designers who extend the base [`Pattern`](/class/patterns/pattern) class
need to implement everything themselves.

If you extend an existing pattern, a bunch of the work has been done 
for you, but you are limited in what you can change.

For example, you can extend the SimonShirt pattern to created a specific
shirt style. But you can't (or shouldn't) turn it into trousers.

## Pattern family tree

- {: .folder .open } [`Pattern`](/class/patterns/pattern)
  - BrianBodyBlock
    - AaronAshirt
    - HugoHoodie
    - SimonShirt
    - SvenSweatshirt
    - WahidWaistcoat
    - BentBodyBlock
      - CarltonCoat
  - TheodoreTrousers
    - TheoTrousers
  - TrentTrouserBlock
    - SethSelvedgeTrouserBlock
      - LesleyLeggings
  - BruceBoxerBriefs
  - TrayvonTie
  - CathrinCorset
  - TamikoTop
{: .files }


* TOC - Do not remove this line
{:toc}



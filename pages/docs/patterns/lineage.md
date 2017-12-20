---
layout: page
title: Pattern lineage
tags: [pattern docs]
permalink: /docs/patterns/lineage
---
## Extending patterns

Patterns can extend (be based on) other patterns, which leads 
to the sort of pattern family tree shown below.

Designers who extend the base [`Pattern`](/docs/core/classdocs/patterns/core/pattern) class
need to implement everything themselves.

If you extend an existing pattern, a bunch of the work has been done 
for you, but you are limited in what you can change.

For example, you can extend the SimonShirt pattern to created a specific
shirt style. But you can't (or shouldn't) turn it into trousers.

## Pattern family tree

- {: .folder .open } [`Pattern`](/docs/core/classdocs/patterns/core/pattern)
  - BenjaminBowTie
  - BrianBodyBlock
    - AaronAshirt
    - BentBodyBlock
      - CarltonCoat
    - HueyHoodie
    - HugoHoodie
    - SimonShirt
    - SvenSweatshirt
    - WahidWaistcoat
  - BruceBoxerBriefs
  - FlorentFlatcap
  - CathrinCorset
  - TamikoTop
  - TheodoreTrousers
    - TheoTrousers
  - TrayvonTie
{: .files }


* TOC - Do not remove this line
{:toc}



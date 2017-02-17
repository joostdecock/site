---
layout: class
title: Packer
namespace: Freesewing
tags: [class, abstractClass]
permalink: /class/Packer
---
## Description 

The [`Packer`](Packer) class is an abstract class with a single abstract method:
[`Packer::fit`](Packer#fit).

## Typical use

The [`GrowingPacker`](GrowingPacker) class extends [`Packer`](Packer) and is our default 
packer class until you will write a better one.

## Public methods

### fit

```php?start_inline=1
void fit(
    &$blocks
) 
```

Fit is an abstract method. It's purpose is to make sure child classes implement this method.

See [`GrowingPacker::fit`](GrowingPacker#fit) for implementation details.

## See also

The [`GrowingPacker`](GrowingPacker) class and [`GrowingPacker::fit`](GrowingPacker#fit) method.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

---
layout: class
title: Packer
namespace: Freesewing
tags: [class, abstractClass]
permalink: /class/packer
---
## Description 

The [`Packer`](packer) class is an abstract class with a single abstract method:
[`Packer::fit`](packer#fit).

## Typical use

The [`GrowingPacker`](growingpacker) class extends [`Packer`](packer) and is our default 
packer class until you will write a better one.

## Public methods

### fit

```php?start_inline=1
void fit(
    &$blocks
) 
```

Fit is an abstract method. It's purpose is to make sure child classes implement this method.

See [`GrowingPacker::fit`](growingpacker#fit) for implementation details.

## See also

The [`GrowingPacker`](growingpacker) class and [`GrowingPacker::fit`](growingpacker#fit) method.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

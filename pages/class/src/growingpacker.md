---
layout: class
title: GrowingPacker
namespace: Freesewing
tags: [class, ported, credits]
permalink: /class/growingpacker
---
## Description 

The [`GrowingPacker`](growingpacker) class implements a packing
alogrithm that is responsible for laying out the different 
pattern parts within the pattern.

The alogrithm determines how to place the different parts on
the pattern in the most space-efficient way.

[`GrowingPacker`](growingpacker) extends abstract class [`Packer`](packer)
so that when you write a better packer algorithm, it's easy to plug it in.

## Credits

This is a port of [an algorithm by Jake Gordon](http://codeincomplete.com/posts/bin-packing/).

Jake's code is MIT-licensed, but he has kindly granted me
permission to distribute this port under GPLv3 (Thanks Jake!).


## Typical use

Always called from [`Pattern:layout`](/class/patterns/core/pattern#layout).


## Public methods

### fit

```php?start_inline=1
void fit( &$array )
```
Takes an array of [`Layoutblock`](layoutblock) object and does its
magic to lay them out in a space that's as small as possible, while
aiming for a  1/sqrt(2) ratio (as in DIN paper sizes).

The array is passed by reference, there is no return value.


## See also

The abstract class [`Packer`](packer)that [`GrowingPacker`](growingpacker)
extends.

The [`Layoutblock`](layoutblock) class that this class uses to describe 
the pattern layout.

Jake's original algorithm at [codeincomplete.com](http://codeincomplete.com/posts/bin-packing/).

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


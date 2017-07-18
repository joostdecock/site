---
layout: page
title: LayoutBlock
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/layoutblock
---
## Description 

The [`Layoutblock`](layoutblock) class holds information that describes 
a rectangle. An X and Y coordinate, along with width and height.

It is used by the [`GrowingPacker`](growingpacker) class to describe
the layout of the different pattern parts on the pattern.

## Typical use

Only used by [`GrowingPacker`](growingpacker).

## Public methods

### setPosition

```php?start_inline=1
void setPosition( 
    float $x,
    float $y 
)
```
Takes X and Y coordinates and stores them in the
`x` and `y` properties respectively.

#### Parameters
{:.no_toc}

Two floats to indicate the X and Y coordinates.

### setSize

```php?start_inline=1
void setSize( 
    float $w,
    float $h 
)
```
Takes width and height and stores them in the
`w` and `h` properties respectively.

#### Parameters
{:.no_toc}

Two floats to indicate the width and height.

### setUsed

```php?start_inline=1
void setUsed( 
    bool $used
)
```
Takes a boolean and stores it in the 
`used` property.

#### Parameters
{:.no_toc}

A boolean to indicate whether the [`Layoutblock`](layoutblock)
is in use or not.

### isUsed

```php?start_inline=1
bool isUsed() 
```
Returns the boolean and stored in the 
`used` property.

This indicates whether a [`Layoutblock`](layoutblock) is in use or not.
In use means that there is a pattern part in it.
Not in use means it's empty, and we can place a part in it if it fits.

## See also

The [`GrowingPacker`](growingpacker) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


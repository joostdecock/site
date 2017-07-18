---
layout: page
title: Point
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/point
---
## Description 

The [`Point`](point) class holds the following data for a point:

- `x` : The X-coordinate
- `y` : The Y-coordinate
- `description` : The descripton

It mostly contains getter and setter methods.

A [`Point`](point) is an exact location on a plane. 
It's not a thing, it's a place.

The [`Point`](point) class extends the [`Coords`](coords) class.

## Typical use

The [`Point`](point) class is internal. Its methods are typically
called from through the methods in the [`Part`](part) class. 

You should know what a [`Point`](point) is. 
If you do,  you can safely ignore this class.

## Constants

### PRECISION

`PRECISION` determines to what level point coordinates will be rounded.

It is 3, so we are rounding everything to 1/1000th of a mm, 
which is very accurate.

If you increase the precision, some operations
(like path offset) will become rather expensive (slow)
because mathematically, they are approximations.
And making the approximation overly precise is just being
difficult for the sake of being difficult.

For all intends and purposes, 1/1000th of a mm is way more
precice than you'll even be able to sew or cut.

## Public methods

### setX

```php?start_inline=1
void setX( 
    float $x 
)
```
Sets the `x` property of the [`Point`](point) to value `$x`, 
rounded to precision `PRECISION`.

This rounding of the value is the reason the [`Point`](point) class
implements its own setX method, rather than depending on 
[`Coords::setX`](coords#setx) in its parent class.

#### Typical use
{:.no_toc}

Used wherever points need their coordinates set, which is in
a bunch of places.

#### Parameters
{:.no_toc}

A float `$x` which is the X-coordinate of the [`Point`](point).

### setY

```php?start_inline=1
void setY( 
    float $y 
)
```
Sets the `y` property of the [`Point`](point) to value `$y`, 
rounded to precision `PRECISION`.

This rounding of the value is the reason the [`Point`](point) class
implements its own setY method, rather than depending on 
[`Coords::setY`](coords#sety) in its parent class.

#### Typical use
{:.no_toc}

Used wherever points need their coordinates set, which is in
a bunch of places.

#### Parameters
{:.no_toc}

A float `$y` which is the Y-coordinate of the [`Point`](point).

### setDescription

```php?start_inline=1
void setDescription( 
    string $description 
)
```
Sets the `description` property of the [`Point`](point) to value `$description`.

#### Typical use
{:.no_toc}

Used wherever points need their description set.

#### Parameters
{:.no_toc}

Returns the `description` property of the [`Point`](point).

### getDescription

```php?start_inline=1
void setDescription( 
    string $description 
)
```
Sets the `description` property of the [`Point`](point) to value `$description`.

#### Typical use
{:.no_toc}

Commonly used by [`Themes/designer`](../themes/core/designer) to add the point description
to the pattern output.

#### Return value
{:.no_toc}

A `string`.

### asVector

```php?start_inline=1
\Freesewing\Vector asVector()
```
Converts the [`Point`](point) to a [`Vector`](vector) and returns that.

#### Typical use
{:.no_toc}

Only ever used by [`BezierToolbox`](beziertoolbox).

#### Return value
{:.no_toc}

A [`Vector`](vector) object.


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

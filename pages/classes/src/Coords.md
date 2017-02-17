---
layout: class
title: Coords
namespace: Freesewing
tags: [class]
permalink: /class/Coords
---
## Description 

The [`Coords`](Coords) class holds coordinates and has methods to
get and set the X and Y coordinate.

## Typical use

[`Coords`](Coords) is an abstract class that is extended by the [`Point`](Point) and 
[`Vector`](Vector) classes.

## Public methods

### getX

```php?start_inline=1
float getX() 
```
Returns the value stored in the `x` property, if any.

### getY

```php?start_inline=1
float getY() 
```
Returns the value stored in the `y` property, if any.

### setX

```php?start_inline=1
void setX(float)
```
Assigns the float passed to it to the `x` property.

### setY

```php?start_inline=1
void setY(float)
```
Assigns the float passed to it to the `y` property.

## See also

The [`Point`](Point) and [`Vector`](Vector) classes
, which extend this class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


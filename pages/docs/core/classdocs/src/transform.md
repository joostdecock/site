---
layout: page
title: Transform
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/transform
---
## Description 

The [`Transform`](transform) class holds data for an SVG transform.

## Typical use

The [`Transform`](transform) class is internal. Most of its methods are only
ever called from the [`Part`](part) class. 

## Public methods

### __construct (constructor)

```php?start_inline=1
\Freesewing\Transform __construct( 
    string $type, 
    float $x,
    float $y = null,
    float $angle = null
)
```
Creates an [`Transform`](transform) object, based on parameters passed to it.

#### Typical use
{:.no_toc}

[`Transform`](transform) object are always created through the constructor.

#### Parameters
{:.no_toc}

- `string` `$type` : Either `translate`, `rotate`, or `scale`.
- `float` `$x` : X-Displacement in a `translate` transform, or the X-origin for a `rotate`, or `scale` transform.
- `float` `$y` : Y-Displacement in a `translate` transform, or the Y-origin for a `rotate`, or `scale` transform.
- `float` `$angle` : Angle for a `rotate` transform.


#### Return value
{:.no_toc}

This is a constructor, so it returns a [`Transform`](transform) object.

### asSvgParameter 

```php?start_inline=1
string asSvgParameter()
```
Returns the [`Transform`](transform) object as an SVG parameter.

#### Typical use
{:.no_toc}

Called from [`SvgRenderbot`](svgrenderbot) to render SVG transforms.

#### Return value
{:.no_toc}

This returns a `string` that is a valid SVG transform attribute.


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

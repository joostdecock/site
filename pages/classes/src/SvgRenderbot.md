---
layout: class
title: SvgRenderbot
namespace: Freesewing
tags: [class]
permalink: /class/SvgRenderbot
---
## Description 

The [`SvgRenderbot`](SvgRenderbot) renders your pattern draft 
into an SVG document.

## Typical use

The [`SvgRenderbot`](SvgRenderbot) is instantiated by teh [`Context`](Context) class.

## Public methods

### render

```php?start_inline=1
string render( 
    \Freesewing\Patterns\Pattern $pattern 
)
```
Returns SVG code for a pattern.

This does not return an entire SVG document, but merely the body which will get
stored in a [`SvgDocument`](SvgDocument) object. And that will hold the entire SVG document.

#### Typical use
{:.no_toc}

Called from one of the services.

#### Parameters
{:.no_toc}

This expects a child class of [`Patterns/Pattern`](Patterns/Pattern) as that is an abstract class.

#### Return value
{:.no_toc}

Returns the SVG body as a `string`.

### renderPath

```php?start_inline=1
string renderPath( 
    \Freesewing\Path $path,
    \Freesewing\Part $part
)
```
Returns the SVG code for a single [`Path`](Path) from a [`Part`](Part).

#### Typical use
{:.no_toc}

Used by [`Sampler`](Sampler) to pre-render sampled paths. 

#### Parameters
{:.no_toc}

- [`Path`](Path) `$path` : The path to render
- [`Part`](Part) `$part` : The pattern part the path belongs to

#### Return value
{:.no_toc}

Returns a `string`, the SVG code for the path.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


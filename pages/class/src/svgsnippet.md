---
layout: class
title: SvgSnippet
namespace: Freesewing
tags: [class]
permalink: /class/svgsnippet
---
## Description 

The [`SvgSnippet`](svgsnippet) class holds information for an SVG snippet.

SVG allows for reusable pieces of SVG code that are stored in the `defs` section
of an SVG document.

When we use one of these pre-made pieces of SVG code, we call that a [`SvgSnippet`](svgsnippet).

## Typical use

While snippets are common in patterns, the [`SvgSnippet`](svgsnippet) class is internal. 

They are added with [`Part::newSnippet`](part#newsnippet).

## Public methods

### setAnchor

```php?start_inline=1
void setAnchor( 
    \Freesewing\Point $anchor 
)
```
Stores the [`Point`](point) that this [`SvgSnippet`](svgsnippet) must be anchored on
in the `anchor` property.

### setReference

```php?start_inline=1
void setReference( 
    string $reference 
)
```
A [`SvgSnippet`](svgsnippet) must reference a SVG object in the defs section of an 
SVG document by its ID.

This stored the ID `$reference`, which is a `string`, in the `reference` property.

### setDescription

```php?start_inline=1
void setDescription( 
    string $description 
)
```
Stores the `string` `$description` in the `description` property.

Note that a description is purely an (optional) internal matter, and won't show up in the SVG document.

### setAttributes

```php?start_inline=1
void setAttributes( 
    array $attributes 
)
```
Stores the `array` `$attributes` in the `attributes` property.

Attributes are an `array` of attributes key/value pairs.

### getAnchor

```php?start_inline=1
\Freesewing\Point getAnchor()
```
Returns the `anchor` property.

### getReference

```php?start_inline=1
string getReference()
```
Returns the `reference` property.

### getReference

```php?start_inline=1
string getDescription()
```
Returns the `description` property.

### getAttributes

```php?start_inline=1
array getAttributes()
```
Returns the `attributes` property.


## See also

The [`Part`](part) class where you can add snippets to your pattern part.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

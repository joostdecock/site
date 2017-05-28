---
layout: page
title: SvgBlock
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/svgblock
---
## Description 

The [`SvgBlock`](svgblock) class is an abstract class to hold data
for a subsection of an SVG document.

It is extended by:

- [`SvgAttributes`](svgattributes)
- [`SvgComments`](svgcomments)
- [`SvgCss`](svgcss)
- [`SvgDefs`](svgdefs)
- [`SvgScript`](svgscript)

Storing data is exclusively handled in this [`SvgBlock`](svgblock) base class.

## Typical use

Used by themes to add attributes, comments, CSS, defs and ecmascript to the [`SvgDocument`].

## Public methods

### load

```php?start_inline=1
string load()
```
Load is an abstract function that must be implemented by all child classes.

### add

```php?start_inline=1
void add(
    string $data
)
```

This adds data to the `data` property which is a multilevel array.

The first level key is the filename calling this method.
The second level is an array for each line in `$data`.

This allows developers to keep track of what file added what.

#### Typical use
{:.no_toc}

Used by themes to add data from their template directory.

#### Parameters
{:.no_toc}

- `string` `$data` : A string of data to add

### \_\_toString

```php?start_inline=1
__toString()
```

This is one of PHP's _magic methods_. `__toString()` is called automatically
when you treat the [`SvgBlock`](svgblock) as a string.

We use this to flatten the data in the `data` property array and return it.

Classes that extend this class can simply return the `data` property as a
string, and that will trigger this method.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

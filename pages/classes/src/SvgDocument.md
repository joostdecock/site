---
layout: class
title: SvgDocument
namespace: Freesewing
tags: [class]
permalink: /class/SvgDocument
---
## Description 

The [`SvgDocument`](SvgDocument) class holds the
data that makes up an SVG document.

## Typical use

Instantiated by the [`Context`](Context) class.

## Public methods

### \_\_construct (constructor)

```php?start_inline=1
\Freesewing\SvgDocument __construct(
    \Freesewing\SvgComments $headerComments,
    \Freesewing\SvgAttributes $svgAttributes,
    \Freesewing\SvgCss $css,
    \Freesewing\SvgScript $script,
    \Freesewing\SvgDefs $defs,
    \Freesewing\SvgComments $footerComments
)
```
Only the body of an [`SvgDocument`](SvgDocument) is a regular `string` that
you can store with [`SvgDocument::setSvgBody`](SvgDocument#setsvgbody).

All other parts are objects that you need to inject into this constructor.

They are all children of the [`SvgBlock`](SvgBlock) class, and hold a specific 
part of an SVG document.

#### Example
```php?start_inline=1
$example = new \Freesewing\SvgDocument(
    new \Freesewing\SvgComments(),
    new \Freesewing\SvgAttributes(),
    new \Freesewing\SvgCss(),
    new \Freesewing\SvgScript(),
    new \Freesewing\SvgDefs(),
    new \Freesewing\SvgComments()
);
```

#### Typical use
{:.no_toc}

Called from the [`Context`](Context) class.

#### Parameters
{:.no_toc}

- [`SvgComments`](SvgComments) `$headerComments` : Comments to go in the header
- [`SvgAttributes`](SvgAttributes) `$svgAttributes` : Attributes for the `SVG` tag
- [`SvgCss`](SvgCss) `$css` : Style (CSS) for the [`SvgDocument`](SvgDocument)
- [`SvgScript`](SvgScript) `$script` : Script (EcmaScript) for the [`SvgDocument`](SvgDocument)
- [`SvgDefs`](SvgDefs) `$defs` : SVG defs
- [`SvgComments`](SvgComments) `$footerComments` : Comments to go in the footer

### \_\_toString

```php?start_inline=1
string __toString()
```
This is one of PHP's _magic methods_. `__toString()` is called automatically
when you treat the [`SvgDocument`](SvgDocument) object as a string.

Long story short, you can just echo and [`SvgDocument`](SvgDocument)
object and it will _just work_.

#### Typical use
{:.no_toc}

Called from [`Response::send`](Response#send) class.

#### Return value
{:.no_toc}

A `string`, which is a valid SVG document.

### setSvgBody

```php?start_inline=1
string setSvgBody(
    string $svgBody
)
```
Stores the `string` `$svgBody` in property `svgBody`.

## See also

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


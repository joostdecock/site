---
layout: class
title: SvgDocument
namespace: Freesewing
tags: [class documentation]
permalink: /class/svgdocument
---
## Description 

The [`SvgDocument`](svgdocument) class holds the
data that makes up an SVG document.

## Typical use

Instantiated by the [`Context`](context) class.

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
Only the body of an [`SvgDocument`](svgdocument) is a regular `string` that
you can store with [`SvgDocument::setSvgBody`](svgdocument#setsvgbody).

All other parts are objects that you need to inject into this constructor.

They are all children of the [`SvgBlock`](svgblock) class, and hold a specific 
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

Called from the [`Context`](context) class.

#### Parameters
{:.no_toc}

- [`SvgComments`](svgcomments) `$headerComments` : Comments to go in the header
- [`SvgAttributes`](svgattributes) `$svgAttributes` : Attributes for the `SVG` tag
- [`SvgCss`](svgcss) `$css` : Style (CSS) for the [`SvgDocument`](svgdocument)
- [`SvgScript`](svgscript) `$script` : Script (EcmaScript) for the [`SvgDocument`](svgdocument)
- [`SvgDefs`](svgdefs) `$defs` : SVG defs
- [`SvgComments`](svgcomments) `$footerComments` : Comments to go in the footer

### \_\_toString

```php?start_inline=1
string __toString()
```
This is one of PHP's _magic methods_. `__toString()` is called automatically
when you treat the [`SvgDocument`](svgdocument) object as a string.

Long story short, you can just echo and [`SvgDocument`](svgdocument)
object and it will _just work_.

#### Typical use
{:.no_toc}

Called from [`Response::send`](response#send) class.

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


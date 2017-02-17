---
layout: class
title: SvgAttributes
namespace: Freesewing
tags: [class, extendsSvgBlock]
permalink: /class/SvgAttributes
---
## Description 

The [`SvgAttributes`](SvgAttributes) class holds attributes
for the SVG tag of an SVG document.

It is a child class of [`SvgBlock`](SvgBlock).

## Typical use

Used by themes to add attributes to the SVG tag.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps it in a proper SVG tag.

Note that this returns the `data` property as a string, 
thereby triggering [`SvgBlock::__toString`](SvgBlock#__tostring).

#### Example
{:.no_toc}
{% include classTabs.html
    id="example" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="example-result" markdown="1">

```xml
<svg
    width ="3780.0070902262"
    height ="2834.645672"
    xmlns:svg="http://www.w3.org/2000/svg"
>
```

</div>
<div role="tabpanel" class="tab-pane" id="example-code" markdown="1">

```php?start_inline=1
$svgBlock = new \Freesewing\SvgAttributes();
$svgBlock->add('
width ="300"
height ="200"
xmlns:svg="http://www.w3.org/2000/svg"
');

echo $svgBlock->load();
```

</div>
</div>

#### Typical use
{:.no_toc}

Called from [`SvgDocument::__toString`](SvgDocument#__tostring).

#### Return value
{:.no_toc}

A `string` which is a valid SVG tag to go in an SVG document.

## See also

The [`SvgBlock`](SvgBlock) class, which this class extends.

The [`SvgDocument`](SvgDocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

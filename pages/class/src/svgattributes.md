---
layout: class
title: SvgAttributes
namespace: Freesewing
tags: [class]
permalink: /class/svgattributes
---
## Description 

The [`SvgAttributes`](svgattributes) class holds attributes
for the SVG tag of an SVG document.

It is a child class of [`SvgBlock`](svgblock).

## Typical use

Used by themes to add attributes to the SVG tag.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps it in a proper SVG tag.

Note that this returns the `data` property as a string, 
thereby triggering [`SvgBlock::__toString`](svgblock#tostring).

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

Called from [`SvgDocument::__toString`](svgdocument#tostring).

#### Return value
{:.no_toc}

A `string` which is a valid SVG tag to go in an SVG document.

## See also

The [`SvgBlock`](svgblock) class, which this class extends.

The [`SvgDocument`](svgdocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

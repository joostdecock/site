---
layout: class
title: SvgComments
namespace: Freesewing
tags: [class, extendsSvgBlock]
permalink: /class/SvgComments
---
## Description 

The [`SvgComments`](SvgComments) class holds comments
for an SVG document.

It is a child class of [`SvgBlock`](SvgBlock).

## Typical use

Used by themes to add comments to the SVG document.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps as proper SVG comments.

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
<!--

    Hi mom :)

-->
```

</div>
<div role="tabpanel" class="tab-pane" id="example-code" markdown="1">

```php?start_inline=1
$svgBlock = new \Freesewing\SvgComments();
$svgBlock->add('Hi mom :)');

echo $svgBlock->load();
```

</div>
</div>

#### Typical use
{:.no_toc}

Called from [`SvgDocument::__toString`](SvgDocument#__tostring).

#### Return value
{:.no_toc}

A `string` which is a valid SVG comment block.

## See also

The [`SvgBlock`](SvgBlock) class, which this class extends.

The [`SvgDocument`](SvgDocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

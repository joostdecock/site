---
layout: class
title: SvgComments
namespace: Freesewing
tags: [class documentation]
permalink: /class/svgcomments
---
## Description 

The [`SvgComments`](svgcomments) class holds comments
for an SVG document.

It is a child class of [`SvgBlock`](svgblock).

## Typical use

Used by themes to add comments to the SVG document.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps as proper SVG comments.

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

Called from [`SvgDocument::__toString`](svgdocument#tostring).

#### Return value
{:.no_toc}

A `string` which is a valid SVG comment block.

## See also

The [`SvgBlock`](svgblock) class, which this class extends.

The [`SvgDocument`](svgdocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

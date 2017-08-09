---
layout: page
title: SvgDefs
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/svgdefs
---
## Description 

The [`SvgDefs`](svgdefs) class holds `<defs>` elements
for an SVG document.

It is a child class of [`SvgBlock`](svgblock).

> ##### SVG defs are reusable SVG objects. 
> [Read more about SVG devs on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs)
{:.link}

## Typical use

Used by themes to add defs to the SVG document.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps as proper SVG defs.

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
<defs id="defs">

    <g id="point">
        <circle cy="0" cx="0" r="2" class="stroke-note stroke-sm" />
        <circle cy="0" cx="0" r="0.8" class="fill-note" />
    </g>

</defs>
```

</div>
<div role="tabpanel" class="tab-pane" id="example-code" markdown="1">

```php?start_inline=1
$svgBlock = new \Freesewing\SvgDefs();
$svgBlock->add('
<g id="point">
    <circle cy="0" cx="0" r="2" class="stroke-note stroke-sm" />
    <circle cy="0" cx="0" r="0.8" class="fill-note" />
</g>
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

A `string` which is a valid SVG defs block.

## See also

The [`SvgBlock`](svgblock) class, which this class extends.

The [`SvgDocument`](svgdocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

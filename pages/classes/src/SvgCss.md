---
layout: class
title: SvgCss
namespace: Freesewing
tags: [class, extendsSvgBlock]
permalink: /class/SvgCss
---
## Description 

The [`SvgCss`](SvgCss) class holds style information
for an SVG document.

It is a child class of [`SvgBlock`](SvgBlock).

## Typical use

Used by themes to add CSS to the SVG document.

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps it as proper CSS.

Note that this returns the `data` property as a string, 
thereby triggering [`SvgBlock::__toString`](SvgBlock#__tostring).

It also makes sure that CSS @import lines go at the top.

#### Example
{:.no_toc}
{% include classTabs.html
    id="example" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="example-result" markdown="1">

```xml
<style type="text/css">
    <![CDATA[
    
    @import url(https://fonts.googleapis.com/css?family=Abril+Fatface|Open+Sans+Condensed:300);
    path,circle,rect{fill:none;stroke:none}
    path.text{fill:none;stroke:none}
    .stroke-brand{stroke:#5c3566}

    ]]>
</style>
```

</div>
<div role="tabpanel" class="tab-pane" id="example-code" markdown="1">

```php?start_inline=1
$svgBlock = new \Freesewing\SvgCss();
$svgBlock->add('
path,circle,rect{fill:none;stroke:none}
path.text{fill:none;stroke:none}
@import url(https://fonts.googleapis.com/css?family=Abril+Fatface|Open+Sans+Condensed:300);
.stroke-brand{stroke:#5c3566}

echo $svgBlock->load();
```

</div>
</div>

#### Typical use
{:.no_toc}

Called from [`SvgDocument::__toString`](SvgDocument#__tostring).

#### Return value
{:.no_toc}

A `string` which is a valid SVG CSS block.

## See also

The [`SvgBlock`](SvgBlock) class, which this class extends.

The [`SvgDocument`](SvgDocument) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

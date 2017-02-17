---
layout: class
title: SvgScript
namespace: Freesewing
tags: [class, extendsSvgBlock]
permalink: /class/SvgScript
---
## Description 

The [`SvgScript`](SvgScript) class holds ECMAScript
for an SVG document.

It is a child class of [`SvgBlock`](SvgBlock).

## Typical use

Used by themes to add comments to the ECMAScript document.

> ECMAScript is basically just JavaScript

## Public methods

### load

```php?start_inline=1
string load()
```
Load returns the data in the `data` property, and wraps it as proper ECMAScript.

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
<script type="application/ecmascript">
    <![CDATA[

    # Your code here

    ]]>
</script>
```

</div>
<div role="tabpanel" class="tab-pane" id="example-code" markdown="1">

```php?start_inline=1
$svgBlock = new \Freesewing\SvgScript();
$svgBlock->add('# Your code here');

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

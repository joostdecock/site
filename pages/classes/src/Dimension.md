---
layout: class
title: Dimension
namespace: Freesewing
tags: [class]
permalink: /class/Dimension
---
## Description 

The [`Dimension`](Dimension) class holds dimension information.
Specifically a `label` property which is an instance of 
[`TextOnPath`](TextOnPath) and the optional `leaders` property 
which is an array of [`Path`](Path) objects.

Dimensions are used to indicate position and distance on a pattern
for the end user. Here's an example:

{% include classTabs.html
    id="bezierCircle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="bezierCircle-result">

{% include figure.html 
    description="A dimension with its leaders and label"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&class=Dimension&method=generic&theme=Basic"
%}

</div>
<div role="tabpanel" class="tab-pane" id="bezierCircle-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);
$p->newPoint(2, 110, 10);

$p->newWidthDimension(1,2, 30, 'I am a dimension');

$p->newPoint('leaderNoteAnchor', 110, 20);
$p->newPoint('pathNoteAnchor', 90, 30);
$p->newPoint('labelNoteAnchor', 55, 25);

$p->newNote(1,'leaderNoteAnchor','Dimension leader',3,15,0);
$p->newNote(2,'pathNoteAnchor','Dimension path',6,15,0);
$p->newNote(3,'labelNoteAnchor','Dimension label',12,15,0);
```

</div>
</div>

## Typical use

This is used through the methods in the [`Part`](Part) class:

- [`Part::newWidthDimension`](Part#newwidthdimension)
- [`Part::newHeightDimension`](Part#newheightdimension)
- [`Part::newLinearDimension`](Part#newleneardimension)
- [`Part::newCurvedDimension`](Part#newcurveddimension)
- [`Part::newWidthDimensionSm`](Part#newwidthdimensionsm)
- [`Part::newHeightDimensionSm`](Part#newheightdimensionsm)
- [`Part::newLinearDimensionSm`](Part#newleneardimensionsm)
- [`Part::newCurvedDimensionSm`](Part#newcurveddimensionsm)


## Public methods

### setLabel

```php?start_inline=1
void setTopLeft( \Freesewing\TextOnPath )
```
Expects a [`TextOnPath`](TextOnPath) object and 
assigns it to the `path` property.

### setLeaders

```php?start_inline=1
void setLeaders( array )
```
Expects an array of [`Path`](Path) object and 
assigns it to the `path` property.

### getLabel

```php?start_inline=1
\Freesewing\TextOnPath getLabel() 
```
Returns the [`TextOnPath`](TextOnPath) stored in the `label` property, if any.

### getLeaders

```php?start_inline=1
array getLeaders() 
```
Returns the array stored in the `leaders` property, if any.

> This array is expected to contain [`Path`](Path) objects.

### getPath

```php?start_inline=1
\Freesewing\Path getPath() 
```
In our `label` property, we have a [`TextOnPath`](TextOnPath) object.

A [`TextOnPath`](TextOnPath) contains a [`Path`](Path) object within, 
and this method returns that [`Path`](Path) object within the 
[`TextOnPath`](TextOnPath) in the `label` property.

Like this:

```php?start_inline=1
return $this->label->getPath();
```

### addLeader

```php?start_inline=1
void addLeader( \Freesewing\Path )
```
Pushes a [`Path`](Path) onto the array in the `leaders` property.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


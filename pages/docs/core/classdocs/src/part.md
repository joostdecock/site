---
layout: page
title: Part
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/docs/core/classdocs/src/part
crumbs:
 - /docs|Docs
 - /docs/core|Core
 - /docs/core/class|Class docs
---
## Description 

The [`Part`](part) class is the most important Freesewing class.

Patterns are merely a bunch of parts placed together in an SVG document.
Parts are the beating heart of this project.

A [`Part`](part) is essentially a container that holds all the information for a part, 
and has a bunch of helper functions that make it easy to add that information.

This is the data you can store in a [`Part`](part) object:

- **Points**, which are [`Point`](point) objects
- **Paths**, which are [`Path`](path) objects
- **Texts**, which are [`Text`](text) objects
- **Texts on path**, which are [`TextOnPath`](textonpath) objects
- **Notes**, which are [`Note`](note) objects
- **Dimensions**, which are [`Dimension`](dimension) objects
- **Snippets**, which are [`SvgSnippet`](svgsnippet) objects

For all of these, there are handy helper functions that make up the bulk
of the methods described below.

In addition, a [`Part`](part) contains data that gets set automatically:

- **A title**, which is a `string`
- **A boundary**, which is a [`Boundary`](boundary) objects
- **Transforms**, which are [`Transform`](transform) objects

These are set behind the scenes for you.

## Typical use

When designing a pattern, the [`Part`](part) class is where you do the heavy lifting.
If you're using Freesewing at all, you're using this class.

## Public methods overview

This [`Part`](part) class has 55 public methods, which is a lot. 

To help you make sense of it all, we've grouped similar methods together.
In addition to grouping the methods, here are some general guidelines that 
will help you make sense of them all:

### Public methods that return a float
{:.no_toc}

These are methods that return a number:

- [`Part::x`](part#x) : X-coordinate of a point
- [`Part::y`](part#y) : Y-coordinate of a point
- [`Part::deltaX`](part#deltax) : Delta on the X-axis between two points
- [`Part::deltaY`](part#deltay) : Delta on the Y-axis between two points
- [`Part::distance`](part#distance) : Distance between two points
- [`Part::curveLen`](part#curvelen) : Length of a curve
- [`Part::angle`](part#angle) : Angle made by two points

Things like an X or Y coordinate, the angle or length of a line, and so on.

You'll typically use these methods in a [`Part::newPoint`](part#newPoint) call to
calculate either the X or Y coordinate of a point you are adding.

### Public methods that return a single Point object
{:.no_toc}

These methods return a single [`Point`](point) object:

- [`Part::loadPoint`](part#loadpoint) : Load a point object by name
- [`Part::clonePoint`](part#clonepoint) : Get a clone of a point
- [`Part::flipX`](part#flipx) : Flip/Mirror point around an X value
- [`Part::flipY`](part#flipy) : Flip/Mirror point around an Y value
- [`Part::shift`](part#shift) : Shift a point a given distance under a given angle
- [`Part::shiftTowards`](part#shifttowards) : Shift from one point a given distance in the direction of another point
- [`Part::shiftAlong`](part#shiftalong) : Shift a given distance along a path
- [`Part::rotate`](part#rotate) : Rotate one point around another
- [`Part::linesCross`](part#linescross) : Intersection of two line segments
- [`Part::beamsCross`](part#beamscross) : Intersection of two endless lines
- [`Part::curveEdge`](part#curveedge) : Edge of a curve (left/right/top/bottom)

The intersection of two lines, a point rotated around another, or mirrored along
the X-axis, these kind of things.

> **These methods are non-destructive**
>
> What's important to keep in mind is that these will create a **new** point.
>
> For example, when you shift or rotate a point, you get a new point. 
> The original that you shifted or rotated is not changed.


These methods return a [`Point`](point) because you'll typically use them
in a [`Part::addPoint`](part#addPoint) call, which expects a [`Point`](point) object.

### Public methods that add one or more points to the Part
{:.no_toc}

Methods that potentially generate more that one single point do not return them, 
but add them to the Part for you:

- [`Part::addPoint`](part#addpoint) : Adds a pre-made point
- [`Part::curveCrossesX`](part#curvecrossesx) : Adds the point(s) where a curve crosses a given X-value
- [`Part::curveCrossesY`](part#curvecrossesy) : Adds the point(s) where a curve crosses a given Y-value
- [`Part::curveCrossesLine`](part#curvecrossesline) : Adds the point(s) where a curve crosses a line
- [`Part::curvesCross`](part#curvescross) : Adds the point(s) where a curves cross
- [`Part::splitCurve`](part#splitcurve) : Adds the points to split a curve in two curves

Returning a bunch of [`Point`](point) objects (in an array) would not be very
helpful to you, and you'd probably end up adding them to the [`Part`](part) 
with [`Part::addPoint`](part#addPoint) anyway.

So, we've cut out that step for you. Call these, and your [`Point`](point) objects
will be added to the [`Part`](part).

You'll typically use these methods for some more advanced stuff, like finding
intersections beteen lines and curves.

> **Use the prefix Luke**
>
> All these methods(\*) take a prefix that will be applied to the name of the generated points.
>
> For example, if one of these methods returns 3 points, and you gave it the prefix `sample`,
> the added points will be named `sample1`, `sample2`, and `sample3`.
>
> The prefix allows you to avoid collisions in point names.
>
> (\*) addPoint() does not take a prefix but a name, as it only ever adds one point.

### Public methods that create and add non-point objects to the Part
{:.no_toc}

While points are crucial in our [`Part`](part), points alone aren't very useful.
These are the methods to add all those other things to a [`Part`](part):

- [`Part::newPoint`](part#newpoint) : Creates & adds a new point
- [`Part::newPath`](part#newpath) : Creates & adds a new path
- [`Part::newText`](part#newtext) : Creates & adds a new text
- [`Part::newTextOnPath`](part#newtextonpath) : Creates & adds a new textOnPath
- [`Part::newNote`](part#newnote) : Creates & adds a new note
- [`Part::newSnippet`](part#newsnippet) : Creates & adds a new snippet
- [`Part::newInclude`](part#newinclude) : Creates & adds a new include
- [`Part::newWidthDimension`](part#newwidthdimension) : Creates & adds a new width dimension
- [`Part::newHeightDimension`](part#newheightdimension) : Creates & adds a new height dimension
- [`Part::newLinearDimension`](part#newlineardimension) : Creates & adds a new linear dimension
- [`Part::newWidthDimensionSm`](part#newwidthdimensionsm) : Creates & adds a new small width dimension
- [`Part::newHeightDimensionSm`](part#newheightdimensionsm) : Creates & adds a new small height dimension
- [`Part::newLinearDimensionSm`](part#newlineardimensionsm) : Creates & adds a new small linear dimension
- [`Part::newCurvedDimension`](part#newcurveddimension) : Creates & adds a new curved dimension
- [`Part::newGrainline`](part#newgrainline) : Creates & adds a grainline
- [`Part::newCutonfold`](part#newcutonfold) : Creates & adds a cutonfold line
- [`Part::notch`](part#notch) : Creates & adds notches
- [`Part::addTitle`](part#addtitle) : Add the part title

You'll use these methods to add everything but Points to your pattern part.

> **A word on New and Add methods**
>
> You'll notice that (almost) all these methods start with **new**. 
>
> A method that starts with **new** indicates that this method will create a
> new object that will be added to the [`Part`](part). 
> 
> Methods that with **add** on the other hand, expect a pre-made object as input 
> and will simply add that to the part.
>
> Thes **add** methods are typically internal and nothing to worry about, 
> but [`Part::addPoint`](part#addPoint) is a notable exception. As is 
> [`Part::addTitle`](part#addtitle) which is named like that to reflect
> that a [`Part`](part) can only have one title.

### Public methods for Path offset
{:.no_toc}

These two methods are similar, and allow you to offset a path or pathstring:

- [`Part::offsetPath`](part#offsetpath) : Offset a path object
- [`Part::offsetPathString`](part#offsetpathstring) : Offset a path string

You will typically use these for seam allowance.

### Various public methods
{:.no_toc}

These are methods that do a variety of other things that aren't covered 
in the other groups, but that are nonetheless important in pattern design:

- [`Part::isPoint`](part#ispoint) : Does this point exist in the part?
- [`Part::getTitle`](part#gettitle) : Get the part title
- [`Part::setRender`](part#setrender) : Set the render flag on the part
- [`Part::unit`](part#unit) : Convert a measure into units for the user
- [`Part::newId`](part#newid) : Get an unused ID, with prefix


### Internal public methods
{:.no_toc}

These are methods that, even though they are public, are mostly internal.

In other words, you are unlikely to ever have to use these:

- [`Part::addTransform`](part#addtransform) : Add a [`Transform`](transform) to the part 
- [`Part::addBoundary`](part#addboundary) : Add a [`Boundary`](boundary) to the part
- [`Part::setTitle`](part#settitle) : Set the part title
- [`Part::setUnits`](part#setunits) : Set the part units
- [`Part::getRender`](part#getrender) : Get the part's render flag
- [`Part::hasPathToRender`](part#haspathtorender) : Does this part have a path to render?

## Methods that return a float

### x

```php?start_inline=1
float x(
    string $name
) 
```

Returns the X-coordinate of a [`Point`](point) stored in the [`Part`](part) under name `$name`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="x" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="x-result" markdown="1">

```php?start_inline=1
30
```

</div>
<div role="tabpanel" class="tab-pane" id="x-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 30, 10);

echo $p->x(1);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to retrieve the X-coordinate of a given point.
Like, all the time.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) of which to return the X-coordinate.

#### Return value
{:.no_toc}

Returns the X-coordinate, which is a `float`.

### y

```php?start_inline=1
float y(
    string $name
) 
```

Returns the Y-coordinate of a [`Point`](point) stored in the [`Part`](part) under name `$name`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="y" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="y-result" markdown="1">

```php?start_inline=1
10
```

</div>
<div role="tabpanel" class="tab-pane" id="y-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 30, 10);

echo $p->y(1);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to retrieve the Y-coordinate of a given point.
Like, all the time.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) of which to return the Y-coordinate.

#### Return value
{:.no_toc}

Returns the Y-coordinate, which is a `float`.

### deltaX

```php?start_inline=1
float deltaX(
    string $name1,
    string $name2,
) 
```

Returns the difference in the X-coordinates between two [`Point`](point) objects stored in the 
[`Part`](part) under names `$name1` and `$name2` respectively.

#### Example
{:.no_toc}

{% include classTabs.html
    id="deltaX" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="deltaX-result" markdown="1">

```php?start_inline=1
30
-30
```

</div>
<div role="tabpanel" class="tab-pane" id="deltaX-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 30, 20);

echo $p->deltaX(1,2)."\n";
echo $p->deltaX(2,1)."\n";
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to calculate the difference between two points on the X-axis.

#### Parameters
{:.no_toc}

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

#### Return value
{:.no_toc}

Returns the X delta between the points, which is a `float`.

### deltaY

```php?start_inline=1
float deltaY(
    string $name1,
    string $name2,
) 
```

Returns the difference in the Y-coordinates between two [`Point`](point) objects stored in the 
[`Part`](part) under names `$name1` and `$name2` respectively.

#### Example
{:.no_toc}

{% include classTabs.html
    id="deltaY" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="deltaY-result" markdown="1">

```php?start_inline=1
20
-20
```

</div>
<div role="tabpanel" class="tab-pane" id="deltaY-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 30, 20);

echo $p->deltaY(1,2)."\n";
echo $p->deltaY(2,1)."\n";
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to calculate the difference between two points on the Y-axis.

#### Parameters
{:.no_toc}

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

#### Return value
{:.no_toc}

Returns the Y delta between the points, which is a `float`.

### distance

```php?start_inline=1
float distance(
    string $name1,
    string $name2,
) 
```

Returns the distance between two [`Point`](point) objects stored in the 
[`Part`](part) under names `$name1` and `$name2` respectively.

#### Example
{:.no_toc}

{% include classTabs.html
    id="distance" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="distance-result" markdown="1">

```php?start_inline=1
30
40
50
50
```

</div>
<div role="tabpanel" class="tab-pane" id="distance-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 0, 40);

echo $p->distance(1,2)."\n";
echo $p->distance(1,3)."\n";
echo $p->distance(2,3)."\n";
echo $p->distance(3,2)."\n";
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to calculate how far two points are apart.

> Note that distance always returns a positive value.

#### Parameters
{:.no_toc}

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

#### Return value
{:.no_toc}

Returns the distance between the points, which is a `float`.

### curveLen

```php?start_inline=1
float curveLen( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end 
)
```

Calculates the length of a cubic Bezier curve.

#### Example
{:.no_toc}

{% include classTabs.html
    id="curveLen" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curveLen-result" markdown="1">

{% include figure.html 
    description="Rotating points with rotate()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4&class=BezierToolbox&method=bezierLength"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curveLen-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 100, 100);
$p->newPoint(4, 100, 50);

$p->newPath(1,"M 1 C 2 3 4");   

$p->newTextOnPath(1,"M 1 C 2 3 4", "Length of this curve: ".$this->unit($p->curveLen(1,2,3,4)), ["dy" => -2,'class' => 'text-center']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to calculate the lenth of Bezier curves.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the curve.

All these points should previously have been added to the [`Part`](part).

#### Return value
{:.no_toc}

Returns a `float`, the length of the curve.

### angle

```php?start_inline=1
float angle(
    string $name1,
    string $name2
) 
```

Returns the angle of a line between two [`Point`](point) objects stored in the 
[`Part`](part) under name `$name1` and `$name2` and the X-axis.

Think of it as the slope of the line.

#### Example
{:.no_toc}

{% include classTabs.html
    id="angle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="angle-result" markdown="1">

{% include figure.html 
    description="Rotating points with rotate()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,earth,moon&class=Part&method=angle"
%}

</div>
<div role="tabpanel" class="tab-pane" id="angle-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint('earth', 50, 50);
$p->newPoint('moon', 50, 0);

for ($i=0;$i<360;$i+=10) {
$p->addPoint($i,$p->rotate('moon','earth',$i));
}    
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to get the angle formed by a line between two points.

#### Parameters
{:.no_toc}

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

#### Return value
{:.no_toc}

Returns a `float`, the angles in degrees.

## Methods that return a single Point object

### loadPoint

```php?start_inline=1
void loadPoint(
    string $name
) 
```

Returns a [`Point`](point) stored in the [`Part`](part) under name `$name`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="loadPoint" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="loadPoint-result" markdown="1">

```php?start_inline=1
Freesewing\Point Object
(
    [precision] => 3
    [description] => 
    [x] => 30
    [y] => 10
)
```

</div>
<div role="tabpanel" class="tab-pane" id="loadPoint-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 30, 10);

print_r($p->loadPoint(1));
```

</div>
</div>

#### Typical use
{:.no_toc}

Use it whenever you need the full [`Point`](point) object. 
['Part'](part) class to feed data to the ['BezierToolbox']['BezierToolbox'] class.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) to return.

#### Return value
{:.no_toc}

Returns a ['Point'](point) object or throws an `InvalidArgumentException` 
if the ['Point'](point) is not present in the ['Part'](part).

### clonePoint

```php?start_inline=1
void clonePoint(
    string $sourceName,
    string $targetName
) 
```

Copies [`Point`](point) with name `$sourceName` and adds it
to the [`Part`](part) with name `$targetName`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="clonePoint" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="clonePoint-result" markdown="1">

```php?start_inline=1
23
45
```

</div>
<div role="tabpanel" class="tab-pane" id="clonePoint-code" markdown="1">
```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newpoint(1, 23, 45);
$p->clonePoint(1,2);
echo $p->x(2);
echo $p->y(2);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used commonly in patterns to clone points.

#### Parameters
{:.no_toc}

- `string` `$sourceName`: The name of the [`Point`](point) to clone.
- `string` `$targetName`: The name to clone it to.

### flipX

```php?start_inline=1
\Freesewing\Point flipX( 
    string $name, 
    float $x
)
```

Returns a [`Point`](point) created by fllipping/mirrorring [`Point`](point) `$name` 
around X-value `$x`;

#### Example
{:.no_toc}

{% include classTabs.html
    id="flipX" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="flipX-result" markdown="1">

{% include figure.html 
    description="flipX flips/mirror a point around a give X value"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5,6,-2,-3,-4,-5,-6&class=Part&method=flipX"
%}

</div>
<div role="tabpanel" class="tab-pane" id="flipX-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 50, 0);
$p->newPoint(2, 30, 35);
$p->newPoint(3, 35, 35);
$p->newPoint(4, 15, 70);
$p->newPoint(5, 40, 70);
$p->newPoint(6, 40, 90);

for($i=2;$i<7;$i++) {
$p->addPoint(-$i,$p->flipX($i,50));
}

$p->newPath(1, 'M 1 L 2 L 3 L 4 L 5 L 6 L -6 L -5 L -4 L -3 L -2 z');
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of a [`Point`](point) to flip.
- `float` `$x`: The X-value to flip it around.

#### Return value
{:.no_toc}

Returns a [`Point`](point) object.

### flipY

```php?start_inline=1
\Freesewing\Point flipY( 
    string $name, 
    float $y
)
```

Returns a [`Point`](point) created by fllipping/mirrorring [`Point`](point) `$name` 
around Y-value `$Y`;

#### Example
{:.no_toc}

{% include classTabs.html
    id="flipY" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="flipY-result" markdown="1">

{% include figure.html 
    description="flipY flips/mirror a point around a give Y value"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5,6,7,8,9,10,11,12,13,14,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14&class=Part&method=flipY"
%}

</div>
<div role="tabpanel" class="tab-pane" id="flipY-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 40);
$p->newPoint(2, 100, 40);
$p->newPoint(3, 10, 40);
$p->newPoint(4, 10, 20);
$p->newPoint(5, 20, 20);
$p->newPoint(6, 20, 40);
$p->newPoint(7, 25, 40);
$p->newPoint(8, 25, 30);
$p->newPoint(9, 30, 25);
$p->newPoint(10, 45, 25);
$p->newPoint(11, 45, 15);
$p->newPoint(12, 50, 5);
$p->newPoint(13, 55, 15);
$p->newPoint(14, 55, 40);

$p->newPath(1,'M 1 L 2 M 3 L 4 L 5 L 6 L 7 L 8 L 9 L 10 L 11 L 12 L 13 L 14');

for($i=3;$i<15;$i++) {
$p->addPoint(-$i,$p->flipY($i,40));
}
$p->newPath(2,'M -3 L -4 L -5 L -6 L -7 L -8 L -9 L -10 L -11 L -12 L -13 L -14', ['class' => 'helpline']);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of a [`Point`](point) to flip.
- `float` `$y`: The Y-value to flip it around.

#### Return value
{:.no_toc}

Returns a [`Point`](point) object.

### shift

```php?start_inline=1
\Freesewing\Point shift( 
    string $name, 
    float $angle, 
    float $distance 
)
```

Returns a new [`Point`](point) at distance `$distance` from [`Point`](point) `$name` in direction `$angle`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="shift" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="shift-result" markdown="1">

{% include figure.html 
    description="I am aware that this shift() example is very boring"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4&class=Part&method=shift"
%}

</div>
<div role="tabpanel" class="tab-pane" id="shift-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);

// Point2: Shift Point 1 20 to the right
$p->addPoint(2, $p->shift(1,0,20));

// Point 3: Shift Point 2 20 down
$p->addPoint(3, $p->shift(2,-90,20));

// Point 4: Shift Point 3 20 to the left
$p->addPoint(4, $p->shift(3,180,20));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) that is the origin of the shift.
- `float` `$angle`: The angle determines the direction in which to shift the [`Point`](point).
- `float` `$distance`: How far to shift the [`Point`](point).


#### Return value
{:.no_toc}

A [`Point`](point) object.

### shiftTowards

```php?start_inline=1
float shiftTowards( 
    string $origin, 
    string $direction,
    float $distance
)
```

Returns a point that lies `$distance` from [`Point`](point) `$origin` in the direction [`Point`](point) `$direction`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="shiftTowards" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="shiftTowards-result" markdown="1">

{% include figure.html 
    description="Shift towards returns a point shifted from origin towards direction"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=origin,direction,1&class=Part&method=shiftTowards"
%}

</div>
<div role="tabpanel" class="tab-pane" id="shiftTowards-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint('origin', 90, 0);
$p->newPoint('direction', 10, 90);

$p->addPoint(1, $p->shiftTowards('origin','direction',30));

$p->newNote(1,'origin','origin',3);
$p->newNote(2,'direction','direction',3);

$p->newNote(3,1,$p->loadPoint(1)->getDescription(),5);
$p->newLinearDimensionSm(1,'origin');
```

</div>
</div>

Note that:

- This returns a new [`Point`](point) object, and does not change the `$origin` point.
- `$distance` can be larger than the distance between `$origin` and `$direction`.
- If `$distance` is negative, we'll shift away from `$direction`.

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$origin`: The name of the [`Point`](point) that is the origin/start of the shift.
- `string` `$direction`: The name of the [`Point`](point) that is the direction of the shift.
- `float` `$distance`: The distance to shift. 

`$origin` and `$direction` should previously have been added to the [`Part`](part).

#### Return value
{:.no_toc}

Returns a [`Point`](point) object of the new, shifted, point.

### shiftAlong

```php?start_inline=1
float shiftTowards( 
    string $start, 
    string $cp2,
    string $cp1,
    string $end, 
    float $distance
)
```

Returns a point that lies at `$distance` from [`Point`](point) `$start` along the Bezier curve
described by `$start`, `$cp1`, `$cp2`, and `$end`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="shiftAlong" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="shiftAlong-result" markdown="1">

{% include figure.html 
    description="Shift distance along a curve"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=shiftAlong"
%}

</div>
<div role="tabpanel" class="tab-pane" id="shiftAlong-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 100, 100);
$p->newPoint(4, 100, 50);
$p->addPoint(5, $p->shiftAlong(1,2,3,4, 50));

$p->newPath(1,"M 1 C 2 3 4");
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the curve.
- `float` `$distance`: The distance to shift along the curve. 

`$origin` and `$direction` should previously have been added to the [`Part`](part).

#### Return value
{:.no_toc}

Returns a [`Point`](point) object of the new, shifted, point.

### rotate

```php?start_inline=1
float rotate(
    string $name1,
    string $name2,
    float $rotation
) 
```

Rotates the [`Point`](point) stored in the 
[`Part`](part) under name `$name1` `$rotation` degrees 
around the [`Point`](point) stored in the
[`Part`](part) under name `$name2`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="rotate" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="rotate-result" markdown="1">

{% include figure.html 
    description="Rotating points with rotate()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,earth,moon&class=Part&method=rotate"
%}

</div>
<div role="tabpanel" class="tab-pane" id="rotate-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint('earth', 50, 50);
$p->newPoint('moon', 50, 0);

for ($i=0;$i<360;$i+=10) {
$p->addPoint($i,$p->rotate('moon','earth',$i));
}    
```

</div>
</div>

#### Typical use
{:.no_toc}

Used to rotate one [`Point`](point) around another, which is fairly common in
pattern design, especially when rotating darts.

#### Parameters
{:.no_toc}

- `string` `$name1`: The name of [`Point`](point) to rotate.
- `string` `$name2`: The name of the [`Point`](point) to rotate around.
= `float` `$angle`: Rotation in degrees

#### Return value
{:.no_toc}

Returns the rotated [`Point`](point) object.

### linesCross

```php?start_inline=1
float linesCross( 
    string $startLine1, 
    string $endLine1,
    string $startLine2, 
    string $endLine2,
)
```

Returns the intersection between 2 line segments, or false if there is no intersection.

This does not only check for an intersection, but also whether that intersection falls
within the line segment described by the lines start and endpoint.

To check for an intersection of two lines that are endless, see ['Part::beamsCross](part#beamscross);

#### Example
{:.no_toc}

{% include classTabs.html
    id="linesCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="linesCross-result" markdown="1">

{% include figure.html 
    description="lineCross() finds the intersection between two line segments"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=linesCross"
%}

</div>
<div role="tabpanel" class="tab-pane" id="linesCross-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 70, 50);
$p->newPoint(3, 100, 0);
$p->newPoint(4, 10, 50);

$p->addPoint(5, $p->linesCross(1,2,3,4));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$startLine1`: The name of the [`Point`](point) that is the start of the first line.
- `string` `$endLine1`: The name of the [`Point`](point) that is the end of the first line.
- `string` `$startLine2`: The name of the [`Point`](point) that is the start of the second line.
- `string` `$endLine2`: The name of the [`Point`](point) that is the end of the second line.

#### Return value
{:.no_toc}

Returns a [`Point`](point) object the lies at the intersection of the line segments,
or false if they don't intersect.

### beamsCross

```php?start_inline=1
float beamsCross( 
    string $point1Line1, 
    string $point2Line1,
    string $point1Line2, 
    string $point2Line2,
)
```

Returns the intersection between 2 endless lines, or false if there is no intersection 
(which happens only when lines are parallel).

This does not only check for an intersection, but also whether that intersection falls
within the line segment described by the lines start and endpoint.

To check for an intersection on two line segments (not endless), see ['Part::linesCross](part#linescross);

#### Example
{:.no_toc}

{% include classTabs.html
    id="beamsCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="beamsCross-result" markdown="1">

{% include figure.html 
    description="lineCross() finds the intersection between two line segments"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=beamsCross"
%}

</div>
<div role="tabpanel" class="tab-pane" id="beamsCross-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 21, 15);
$p->newPoint(3, 100, 0);
$p->newPoint(4, 10, 50);

$p->addPoint(5, $p->beamsCross(1,2,3,4));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$point1Line1`: The name of a [`Point`](point) on line 1.
- `string` `$pointLine1`: The name of another [`Point`](point) on line 1.
- `string` `$point1Line2`: The name of a [`Point`](point) on line 2.
- `string` `$pointLine2`: The name of another [`Point`](point) on line 2.

#### Return value
{:.no_toc}

Returns a [`Point`](point) object the lies at the intersection of the lines 1 and 2,
or false if the lines are parallel.

### curveEdge

```php?start_inline=1
\Freesewing\Point curveEdge( 
    string $start.
    string $cp1,
    string $cp2,
    string $end,
    string $edge 
)
```

Returns the [`Point`](point) at edge `$edge` of a curve. Edge should be one of:

- top
- bottom
- left
- right

#### Example
{:.no_toc}

{% include classTabs.html
    id="curveEdge" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curveEdge-result" markdown="1">

{% include figure.html 
    description="Find the edges of a Bezier curve with curveEdge()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,leftEdge,rightEdge,topEdge,bottomEdge&class=BezierToolbox&method=bezierEdge"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curveEdge-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 50, 50);
$p->newPoint(2, 0, 0);
$p->newPoint(3, 230, 120);
$p->newPoint(4, 100, 100);

$p->newPath(1,"M 1 C 2 3 4");   

$p->addPoint('leftEdge', $p->curveEdge(1,2,3,4,'left'));
$p->addPoint('rightEdge', $p->curveEdge(1,2,3,4,'right'));
$p->addPoint('topEdge', $p->curveEdge(1,2,3,4,'top'));
$p->addPoint('bottomEdge', $p->curveEdge(1,2,3,4,'bottom'));

$p->newTextOnPath(1,"M 1 C 2 3 4", "Bezier curve", ["dy" => -2]);
$p->newNote(1,"leftEdge", "Left edge", 9, 15, 0);
$p->newNote(2,"rightEdge", "Right edge", 3, 15, 0);
$p->newNote(3,"topEdge", "Top edge", 12, 15, 0);
$p->newNote(4,"bottomEdge", "Bottom edge", 6, 15, 0);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the curve.
- `string` `$edge`: One of `left`,`right`,`top`, or `bottom` to indicate what edge to find.


#### Return value
{:.no_toc}

A [`Point`](point) object.

## Methods that add one or more points to the Part

### addPoint

```php?start_inline=1
void addPoint(
    string $anchor,
    \Freesewing\Point $point,
    string $description = null
) 
```

Adds a [`Point`](point) object passed to it to the [`Part`](part).
Optionally sets the description of the point.

#### Example
{:.no_toc}

{% include classTabs.html
    id="addPoint" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="addPoint-result">

{% include figure.html 
    description="One point added with newPoint() and another added with addPoint()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=addPoint"
%}

</div>
<div role="tabpanel" class="tab-pane" id="addPoint-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);

$p->addPoint(2, $p->flipX(1,30));
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns classes to add points to the pattern part using on of the 
methods in this class that return a [`Point`](point) object.

#### Parameters
{:.no_toc}

- `string` `$anchor`: The name for the [`Point`](point) in the [`Part`](part).
- `\Freesewing\Point` `$point`: The [`Point`](point) object.
- `string` `$description`: An optional description that will be set on the [`Point`](point) object if provided.

### curveCrossesX

```php?start_inline=1
void curveCrossesX( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end, 
    float $x
    string $prefix = false
)
```

Finds the intersection(s) of a curve with a given X-value `$x` and adds them as [`Point`](point) objects 
to the [`Part`](part) with prefix `$prefix` 

#### Example
{:.no_toc}

{% include classTabs.html
    id="curveCrossesX" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curveCrossesX-result" markdown="1">

{% include figure.html 
    description="curveCrossesX example"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,sample1,sample2,sample3&class=Part&method=curveCrossesX"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curveCrossesX-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 40, 0);
$p->newPoint(2, 90, 10);
$p->newPoint(3, 10, 60);
$p->newPoint(4, 80, 40);


$p->newPath(1,'M 1 C 2 3 4');

// This will add points sample1, 
// sample2, and sample3 to the part
$p->curveCrossesX(1,2,3,4,55,'sample');
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the curve.
- `float` `$x`: The X-value to find intersections on.
- `prefix` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).


#### Return value
{:.no_toc}

None, [`Point`](point) objects will be added to the [`Part`](part).

### curveCrossesY

```php?start_inline=1
void curveCrossesY( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end, 
    float $y
    string $prefix = false
)
```

Finds the intersection(s) of a curve with a given Y-value `$y` and adds them as [`Point`](point) objects 
to the [`Part`](part) with prefix `$prefix` 

#### Example
{:.no_toc}

{% include classTabs.html
    id="curveCrossesY" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curveCrossesY-result" markdown="1">

{% include figure.html 
    description="curveCrossesY example"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,sample1,sample2,sample3&class=Part&method=curveCrossesY"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curveCrossesY-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 70, 20);
$p->newPoint(2, 80, 60);
$p->newPoint(3, 10, 0);
$p->newPoint(4, 40, 60);


$p->newPath(1,'M 1 C 2 3 4');

// This will add points sample1, 
// sample2, and sample3 to the part
$p->curveCrossesY(1,2,3,4,33,'sample');
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the curve.
- `float` `$y`: The Y-value to find intersections on.
- `prefix` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).


#### Return value
{:.no_toc}

None, [`Point`](point) objects will be added to the [`Part`](part).

### curveCrossesLine

```php?start_inline=1
\Freesewing\Point curveCrossesLine( 
    string $curveStart,
    string $curveCp1,
    string $curveCp2,
    string $curveEnd,
    string $lineStart,
    string $lineEnd,
    string $prefix 
)
```

Addes the [`Point`](point)s at the intersection of a line and curve to the
[`Part`](part) with prefix `$prefix`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="curveCrossesLine" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curveCrossesLine-result" markdown="1">

{% include figure.html 
    description="This curve and line intersect in three points"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,i1,i2,i3&class=BezierToolbox&method=bezierLineIntersections"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curveCrossesLine-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 100, 100);
$p->newPoint(4, 100, 50);

$p->newPoint(5, 0, 80);
$p->newPoint(6, 110, 55);

$p->newPath(1,"M 1 C 2 3 4 M 5 L 6");

// This will add points 'i1', 'i2' and 'i3' 
// to the part's points array
$p->curveCrossesLine(1,2,3,4,5,6,'i');
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$curveStart`: The name of the [`Point`](point) that is the start of the curve.
- `string` `$curveCp1`: The name of the [`Point`](point) that is the first control point of the curve.
- `string` `$curveCp2`: The name of the [`Point`](point) that is the second control point of the curve.
- `string` `$curveEnd`: The name of the [`Point`](point) that is the  of the curve.
- `string` `$lineStart`: The name of the [`Point`](point) that is the start of the line.
- `string` `$lineEnd`: The name of the [`Point`](point) that is the end of the line.
- `prefix` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).


#### Return value
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

### curvesCross

```php?start_inline=1
\Freesewing\Point curvesCross( 
    string $curve1Start,
    string $curve1Cp1,
    string $curve1Cp2,
    string $curve1End,
    string $curve2Start,
    string $curve2Cp1,
    string $curve2Cp2,
    string $curve2End,
    string $prefix 
)
```

Addes the [`Point`](point)s at the intersection two curves to the
[`Part`](part) with prefix `$prefix`.

#### Example
{:.no_toc}

{% include classTabs.html
    id="curvesCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="curvesCross-result" markdown="1">

{% include figure.html 
    description="Two cubic Bezier curves can intersect in up to nine points"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=i1,i2,i3,i4,i5,i6,i7,i8,i9&class=BezierToolbox&method=bezierBezierIntersections"
%}

</div>
<div role="tabpanel" class="tab-pane" id="curvesCross-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 0, -200);
$p->newPoint(3, 100, 300);
$p->newPoint(4, 100, 0);
$p->newPath(1,"M 1 C 2 3 4");

$p->newPoint(5, 0, 10);
$p->newPoint(6, 330, 10);
$p->newPoint(7, -230, 90);
$p->newPoint(8, 100, 90);
$p->newPath(2,"M 5 C 6 7 8");

// This will add points 'i1' => 'i9' 
// to the part's points array
$p->curvesCross(1,2,3,4,5,6,7,8,'i');
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$curve1Start`: The name of the [`Point`](point) that is the start of the first curve.
- `string` `$curve1Cp1`: The name of the [`Point`](point) that is the first control point of the first curve.
- `string` `$curve1Cp2`: The name of the [`Point`](point) that is the second control point of the first curve.
- `string` `$curve1End`: The name of the [`Point`](point) that is the  of the first curve.
- `string` `$curve2Start`: The name of the [`Point`](point) that is the start of the second curve.
- `string` `$curve2Cp1`: The name of the [`Point`](point) that is the first control point of the second curve.
- `string` `$curve2Cp2`: The name of the [`Point`](point) that is the second control point of the second curve.
- `string` `$curve2End`: The name of the [`Point`](point) that is the  of the second curve.
- `prefix` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).


#### Return value
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

### splitCurve

```php?start_inline=1
\Freesewing\Point curveEdge( 
    string $start,
    string $cp1,
    string $cp2,
    string $end,
    string $split,
    string $prefix,
    bool $splitOnDelta = false
)
```

Splits a Bezier curve in two parts and calculates the 8 [`Point`](point) 
objectsthat to describe the two curves.

The split happens on [`Point`](point) with name `$split` if `$splitOnDelta` is false (the default).

If `$splitOnDelta` is true, the split happens on  delta `$split` (between 0 and 1).

Points will be added to the [`Part`](part) with prefix `$prefix`.


#### Example
{:.no_toc}

{% include classTabs.html
    id="splitCurve" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="splitCurve-result" markdown="1">

{% include figure.html 
    description="The original curve, and the two curves after it's split"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5,s1,s2,s3,s4,s5,s6,s7&class=Part&method=splitCurve"
%}

</div>
<div role="tabpanel" class="tab-pane" id="splitCurve-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 100, 100);
$p->newPoint(4, 100, 50);
$p->addPoint(5, $p->shiftAlong(1,2,3,4, 50));

// This will add points 's1' to 's8' 
// to the part's points array
$p->splitCurve(1,2,3,4,5,'s');

$p->newPath(1,"M 1 C 2 3 4", ['class' => 'debug']);
$p->newPath(2,"M s1 C s2 s3 s4", ['class' => 'seam-allowance stroke-note']);
$p->newPath(3,"M s5 C s6 s7 s8", ['class' => 'seam-allowance']);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when splitting on a point.

The splitting on a delta between 0 and 1 is typically used in internal functions.

#### Parameters
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the first curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the first curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the first curve.
- `string` `$end`: The name of the [`Point`](point) that is the  of the first curve.
- `string` `$split`:  The name of the [`Point`](point) to split the curve on, or a delta between 0 and 1
- `string` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).
- `bool` `$splitOnDelta`: `true` to split on a delta between 0 and 1, `false` by default.


#### Return value
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

## Methods that create and add non-point objects to the Part

### newPoint

```php?start_inline=1
void newPoint(
    string $name
    float $x
    float $y
    string $description = null
) 
```

Creates a [`Point`](point) object and adds it to the part.

`$x`, `$y`, and an optional `$description` will be used to create the [`Point`](point) object.

The `$name` is so we can reference the [`Point`](point) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newPoint" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newPoint-result">

{% include figure.html 
    description="Adding points to your pattern part with newPoint()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4&class=Part&method=newPoint"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newPoint-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);
$p->newPoint(2, 100, 20);
$p->newPoint(3, 50, 40);
$p->newPoint(4, -40, -30, 'Negative coordinates point');
```

</div>
</div>

#### Typical use
{:.no_toc}

Is one of the ways to add points to your pattern part.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the point by
- `float` `$x`: The X-coordinate of the [`Point`](point) object
- `float` `$y`: The Y-coordinate of the [`Point`](point) object
- `array` `$attributes`: An array of attributes to be added to the [`Point`](point) object

### newPath

```php?start_inline=1
void newPath(
    string $name
    string $pathString
    array $attributes
) 
```

Creates a [`Path`](path) object and adds it to the part.

`$pathstring` and `$attributes` will be used to create the [`Path`](path) object.

The `$name` is so we can reference the [`Path`](path) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newPath-result">

{% include figure.html 
    description="Paths added to the pattern with newPath()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&class=Part&method=newPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newPath-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);
$p->newPoint(2, 100, 20);
$p->newPoint(3, 50, 40);
$p->newPoint(4, 40, 30);
$p->newPoint(5, 40, 0);

$p->newPath(1, 'M 1 L 2');
$p->newPath('another', 'M 4 C 3 2 5 z', ['class' => 'helpline']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to add paths to the [`Path`](path)s to the [`Part`](part).

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the path by
- `string` `$pathstring`: The SVG pathstring describing the path
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object

### newText

```php?start_inline=1
void newText(
    string $name
    string $anchor
    string $message
    array $attributes = null
) 
```

Creates a [`Text`](text) object and adds it to the part.

This allows you to add text to your pattern. 


`$anchor`, `$content`, and the optional `$attributes` will be used to create 
the [`Text`](text) object.

The `$name` is so we can reference the [`Text`](text) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newText" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newText-result">

{% include figure.html 
    description="Use CSS classes for regular text, and the 'line-height' attribute for multiline text"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newText"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newText-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 50, 5);
$p->newPoint(2, 90, 40);

$p->newText(1, 1, 'This is standard text');
$p->newText(2, 1, 'This is text with CSS classes set', ['class' => 'text-center text-lg fill-note', 'dy' => 10]);
$p->newText(3, 1, "Multiline text\nsupport is\nshaky", ['dx' => -20, 'dy' => 20,]);
$p->newText(4, 2, "Use line-height as attribute\nand avoid the dx and dy attributes\nfor multiline text", ['line-height' => 6] );
```

</div>
</div>

SVG is somewhat limited in its ability to render text. Font support is shaky,
and it doesn't really do multi-line text.

To get around that, you can use the `line-height` attribute for multiline text.
It will set the spacing between lines in a multiline text string.

Also note that the `dx` and `dy` attributes, which allow you to shift the text
relative to the anchor point, do only apply to the firt line. 
As such, you should avoid using these in multiline text, and instead move 
your anchor point.

For a newline, you can either use a real newline like this:

```php?start_inline=1
$text = 'This is
text';
```

Or use double quotes and `\n` for a newline, like this:

```php?start_inline=1
$text = "This is\ntext";
```

#### Typical use
{:.no_toc}

Typically used to include text/instructions on the pattern.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the [`Text`](text) by.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the [`Text`](text) on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$message`: The text to be rendered. 
- `array` `$attributes`: An array of attributes to be added to the [`Text`](text) object.

### newTextOnPath

```php?start_inline=1
void newTextOnPath(
Y    string $name,
    string $pathstring,
    string $message,
    array $attributes = null
) 
```

Creates a [`TextOnPath`](textonpath) object and adds it to the part.

This allows you to add text to your pattern that follows a path.
There's no need to create a [`Path`](path) object to tie this to,
you simply specify the pathstring and a [`Path`](path) object will
be created and added to the [`TextOnPath`](textonpath) object.

`$pathstring` will be used to create the [`Path`](path) object.
`$message`, and the optional `$attributes` will be used to create 
the [`TextOnPath`](textonpath) object.

The `$name` is so we can reference the [`TextOnPath`](textonpath) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newTextOnPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newTextOnPath-result">

{% include figure.html 
    description="Texts on paths"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newTextOnPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newTextOnPath-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 10);
$p->newPoint(2, 100, 10);
$p->newPoint(3, 100, 50);
$p->newPoint(4, 60, 40);

$p->newTextOnPath(1,'M 1 L 2', 'This is text on a path');
$p->newTextOnPath(2,'M 2 C 3 4 1', "I'm like, super upside down right now", ['class' => 'text-center fill-warning', 'dy' => -2]);
$p->newTextOnPath(3,'M 1 C 4 3 2', "Text on a curved path is a bit more interesting", ['class' => 'text-center', 'dy' => -2]);
```

</div>
</div>

A few things to keep in mind:

- This will also add, and render, the [`Path`](path) defined by `$pathstring`
- The text is anchored on the middle point of the [`Path`](path)
- The attributes apply to the text, not the path
- The `dx` and `dy` attributes are relative to the path. So a negate `dy` always
lifts your texts away from the path, even when it's upside-down

#### Typical use
{:.no_toc}

When you think you need this, you probably want [`Part::newCurvedDimension`](part#newcurveddimension) instead.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the [`Note`](note) by.
- `string` `$pathstring`: A SVG pathstring that describes the path to place the text on.
- `string` `$message`: The text to be rendered. 
- `array` `$attributes`: An array of attributes to be added to the [`TextOnPath`](textonpath) object.

### newNote

```php?start_inline=1
void newNote(
    string $name,
    string $anchor,
    string $message,
    int $direction = 3,
    int $length = 25,
    int $offset = 3,
    array $attributes = null
) 
```

Creates a [`Note`](note) object and adds it to the part.

This allows you to add notes to your pattern. A [`Note`](note) is 
text + an arrow pointing to something.

`$anchor`, `$message`, and the optional `$attributes` will be used to create 
the [`Note`](note) object.

The `$name` is so we can reference the [`Text`](text) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newNote" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newNote-result">

{% include figure.html 
    description="Use direction, length, and offset to control the appearance of your note"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newNote"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newNote-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 50, 55);
$p->newPoint(2, 140, 55);
$p->newPoint(3, 220, 55);

for($i=1;$i<=12;$i++) {
    $p->newNote("direction$i", 1, $i, $i);
    $p->newNote("length$i", 2, (15+$i*2), $i, (15+$i*2));
    $p->newNote("offset$i", 3, ($i*2), $i, 25, $i);
}

$p->newText(1, 1, "Direction from 1 to 12, like hands of a clock", ['dy' => 40, 'class' => 'text-center']);
$p->newText(2, 2, "Lenght of the arrow", ['dy' => 40, 'class' => 'text-center']);
$p->newText(3, 3, "Offset from the anchor point", ['dy' => 40, 'class' => 'text-center']);
$p->newText(4, 2, "Any attributes you pass will apply to the text, not the arrow", ['dy' => 55, 'class' => 'text-xl text-center fill-warning', 'stroke-width' => 0.1, 'fill' => 'none']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used to include instructions on the pattern.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the [`Note`](note) by.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the [`Note`](note) on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$message`: The text to be rendered. 
- `int` `$direction`: A number from 1 to 12 that determines the directin of the [`Note`](note).
- `int` `$length`: Length from the anchor point to the end of the arrow.  
- `int` `$offset`: Length from the anchor point to the start of the arrow.  
- `array` `$attributes`: An array of attributes to be added to the [`Text`](text) object within the [`Note`](note) object.

### newSnippet

```php?start_inline=1
void newSnippet(
    string $name
    string $reference
    string $anchor
    array $attributes
    string $description = null
) 
```

Creates a [`SvgSnippet`](/docs/core/classdocs/src/svgsnippet) object and adds it to the part.

`$reference`, `$anchor`, `$attributes`, and an optional `$description` will be used to create the [`SvgSnippet`](svgsnippet) object.

The `$name` is so we can reference the [`SvgSnippet`](svgsnippet) later (by its name).

#### Example
{:.no_toc}

<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#newSnippet-result" aria-controls="result" role="tab" data-toggle="tab">Result</a></li>
    <li role="presentation"><a href="#newSnippet-code" aria-controls="code" role="tab" data-toggle="tab">Code</a></li>
    <li role="presentation"><a href="#newSnippet-defs" aria-controls="code" role="tab" data-toggle="tab">SVG Defs</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newSnippet-result">

{% include figure.html 
    description="Adding SVG snippets to your pattern part with newSnippet()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&&class=Part&method=newSnippet"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newSnippet-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 20, 10);
$p->newPoint(2, 40, 10);
$p->newPoint(3, 60, 10);

$p->newSnippet(1, 'button', 1);
$p->newSnippet('anotherOne', 'buttonhole', 2);
$p->newSnippet(3, 'buttonhole', 3, [
    'transform' => 'rotate(90 '.$p->x(3).' '.$p->y(3).')'
]);
```

</div>
<div role="tabpanel" class="tab-pane" id="newSnippet-defs" markdown="1">

```xml
<defs id="defs">
    <g id="button" >
        <circle id="button-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#000000;fill:none;stroke-width:1;" />
        <circle id="button-circle-hole1" cx="-1" cy="-1" r="0.5" style="stroke:none;fill:#000000;" />
        <circle id="button-circle-hole2" cx="1" cy="-1" r="0.5" style="stroke:none;fill:#000000;" />
        <circle id="button-circle-hole3" cx="1" cy="1" r="0.5" style="stroke:none;fill:#000000;" />
        <circle id="button-circle-hole4" cx="-1" cy="1" r="0.5" style="stroke:none;fill:#000000;" />
    </g>
    <g id="buttonhole" >
        <path style="fill:none;stroke:#000000;" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" id="buttonhole-outer" />
        <path style="fill:#000000;stroke:none;" d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z" id="buttonhole-bartack" />
    </g>
</defs>
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used to add things defined in [`SvgDefs`](svgdefs) to the pattern.

The _defs_ (for defenitions) section of an SVG documents hold re-usable 
SVG code that you can include in your SVG document.

Themes can populate the defs section with all sorts of things that pattern designers 
can than easily include in the pattern through this method.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the snippet by.
- `string` `$reference`: The ID of the snippet in the SVG defs section.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the snippet on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `array` `$attributes`: An array of attributes to be added to the [`SvgSnippet`](svgsnippet) object.
- `string` `$description`: An optional description for the [`SvgSnippet`](svgsnippet) object.

### newInclude

```php?start_inline=1
void newInclude(
    string $name
    string $content
) 
```

Creates a [`SvgInclude`](svginclude) object and adds it to the part.

This allows you to include raw SVG into your pattern. It will simply be included by
[`SvgRenderbot`](svgrenderbot) into the SVG group that bundles your [`Part`](part).

`$content` will be used to create the [`SvgInclude`](svginclude) object.

The `$name` is so we can reference the [`SvgInclude`](svginclude) later (by its name).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newInclude" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newInclude-result">

{% include figure.html 
    description="You may need to open this in its own window to see the image embedded with newInclude()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newInclude"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newInclude-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newInclude(1, '<image x="0" y="0" width="80" height="80" xlink:href="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" />');
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used by the [`Themes/paperless`](themes/core/paperless) theme to add a grid to the pattern parts.

Also used by the sample service to add pre-rendered parts to the pattern.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the include by.
- `string` `$content`: The SVG content to include

### newWidthDimension

```php?start_inline=1
void newWidthDimension( 
    string $from,
    string $to,
    string $y = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension'],
    string $labelAttributes = ['class' => 'dimension-label', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Adds a horizontal [`Dimension`](dimension) to indicate width from `$from` to `$to` 
to the [`Part`](part).

If `$y` is set, it will be placed at this Y-coordinate. If it is `false`, it will be 
placed at the Y-coordinate of `$from`.

If `$text` is `false` it will be replaced with the absolute X-delta between
`$from` and `$to`, which is the expected behavior for dimensions.

`$pathAttributes`, `$labelAttributes`, and `$leaderAttributes` are all optional
arrays to be passed as attributes to the [`Dimension`](dimension) path, label, and leaders 
respectively.

They have sensible defaults, but you are free to override them.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newWidthDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newWidthDimension-result" markdown="1">

{% include figure.html 
    description="Use newWidthDimension to add horizontal dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newWidthDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newWidthDimension-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 25);
$p->newPoint(2, 80, 40);

// Minimal 
$p->newWidthDimension(1,2);

// With Y-value
$p->newWidthDimension(1,2, 60);

// With all options
$p->newWidthDimension(
    1,
    2, 
    10, 
    'Hello world',
    ['class' => 'seam-allowance dimension'],
    ['class' => 'text-xl fill-brand dimension-label', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$y`: The Y-value at which to place the [`Dimension`](dimension), or `false` to place it on the Y-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the horizontal distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newHeightDimension

```php?start_inline=1
void newHeightDimension( 
    string $from,
    string $to,
    string $x = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension'],
    string $labelAttributes = ['class' => 'dimension-label', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Adds a vertical [`Dimension`](dimension) to indicate width from `$from` to `$to` 
to the [`Part`](part).

If `$x` is set, it will be placed at this X-coordinate. If it is `false`, it will be 
placed at the Y-coordinate of `$from`.

If `$text` is `false` it will be replaced with the absolute Y-delta between
`$from` and `$to`, which is the expected behavior for dimensions.

`$pathAttributes`, `$labelAttributes`, and `$leaderAttributes` are all optional
arrays to be passed as attributes to the [`Dimension`](dimension) path, label, and leaders 
respectively.

They have sensible defaults, but you are free to override them.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newHeightDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newHeightDimension-result" markdown="1">

{% include figure.html 
    description="Use newHeightDimension to add vertical dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newHeightDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newHeightDimension-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 80, 70);

// Minimal 
$p->newHeightDimension(1,2);

// With X-value
$p->newHeightDimension(1,2, 40);

// With all options
$p->newHeightDimension(
    1,
    2, 
    90, 
    'Hello world',
    ['class' => 'seam-allowance dimension'],
    ['class' => 'text-xl fill-brand dimension-label', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$x`: The X-value at which to place the [`Dimension`](dimension), or `false` to place it on the X-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the vertical distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newLinearDimension

```php?start_inline=1
void newLinearDimension( 
    string $from,
    string $to,
    float $offset = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension'],
    string $labelAttributes = ['class' => 'dimension-label', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Adds a linear [`Dimension`](dimension) to indicate the distance from `$from` to `$to` 
to the [`Part`](part).

If `$offset` is set, it will be placed at this offset. If it is `false`, it will be 
placed directly between `$from` and `$to`.

If `$text` is `false` it will be replaced with the distance between
`$from` and `$to`, which is the expected behavior for dimensions.

`$pathAttributes`, `$labelAttributes`, and `$leaderAttributes` are all optional
arrays to be passed as attributes to the [`Dimension`](dimension) path, label, and leaders 
respectively.

They have sensible defaults, but you are free to override them.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newLinearDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newLinearDimension-result" markdown="1">

{% include figure.html 
    description="Use newLinearDimension to add linear dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newLinearDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newLinearDimension-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 20);
$p->newPoint(2, 80, 70);

// Minimal 
$p->newLinearDimension(1,2);

// With offset
$p->newLinearDimension(1,2, 20);

// With all options
$p->newLinearDimension(
    1,
    2, 
    -20, 
    'Hello world',
    ['class' => 'seam-allowance dimension'],
    ['class' => 'text-xl fill-brand dimension-label', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it between `$from` and `$to`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newWidthDimensionSm

```php?start_inline=1
void newWidthDimensionSm( 
    string $from,
    string $to,
    string $y = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension dimension-sm'],
    string $labelAttributes = ['class' => 'dimension-label text-sm', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Behaves exactly like [`Part::newWidthDimension`](part#newwidthdimension) but has different
defaults for `$pathAttributes` and `$labelAttributes`, resulting in a smaller [`Dimension`](dimension).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newWidthDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newWidthDimensionSm-result" markdown="1">

{% include figure.html 
    description="Use newWidthDimensionSm to add small horizontal dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newWidthDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newWidthDimensionSm-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 25);
$p->newPoint(2, 30, 40);

// Minimal 
$p->newWidthDimensionSm(1,2);

// With Y-value
$p->newWidthDimensionSm(1,2, 60);

// With all options
$p->newWidthDimensionSm(
    1,
    2, 
    10, 
    'Hello world',
    ['class' => 'seam-allowance dimension dimension-sm'],
    ['class' => 'text-sm fill-brand dimension-label', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$y`: The Y-value at which to place the [`Dimension`](dimension), or `false` to place it on the Y-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the horizontal distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newHeightDimensionSm

```php?start_inline=1
void newHeightDimensionSm( 
    string $from,
    string $to,
    string $x = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimensioni dimension-sm'],
    string $labelAttributes = ['class' => 'dimension-label text-sm', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Behaves exactly like [`Part::newHeightDimension`](part#newheightdimension) but has different
defaults for `$pathAttributes` and `$labelAttributes`, resulting in a smaller [`Dimension`](dimension).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newHeightDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newHeightDimensionSm-result" markdown="1">

{% include figure.html 
    description="Use newHeightDimensionSm to add small vertical dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newHeightDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newHeightDimensionSm-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 20, 30);

// Minimal 
$p->newHeightDimensionSm(1,2);

// With X-value
$p->newHeightDimensionSm(1,2, 30);

// With all options
$p->newHeightDimensionSm(
    1,
    2, 
    40, 
    'Hello world',
    ['class' => 'seam-allowance dimension dimension-sm'],
    ['class' => 'text-sm fill-brand dimension-label', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$x`: The X-value at which to place the [`Dimension`](dimension), or `false` to place it on the X-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the vertical distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newLinearDimensionSm

```php?start_inline=1
void newLinearDimensionAm( 
    string $from,
    string $to,
    float $offset = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension dimension-sm'],
    string $labelAttributes = ['class' => 'dimension-label text-sm', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Behaves exactly like [`Part::newLinearDimension`](part#newlineardimension) but has different
defaults for `$pathAttributes` and `$labelAttributes`, resulting in a smaller [`Dimension`](dimension).

#### Example
{:.no_toc}

{% include classTabs.html
    id="newLinearDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newLinearDimensionSm-result" markdown="1">

{% include figure.html 
    description="Use newLinearDimensionSm() to add small linear dimensions to your part"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newLinearDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newLinearDimensionSm-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 20);
$p->newPoint(2, 40, 30);

// Minimal 
$p->newLinearDimensionSm(1,2);

// With offset
$p->newLinearDimensionSm(1,2, 20);

// With all options
$p->newLinearDimensionSm(
    1,
    2, 
    -20, 
    'Hello world',
    ['class' => 'seam-allowance dimension dimension-sm'],
    ['class' => 'fill-brand dimension-label text-sm', 'dy' => -1],
    ['class' => 'debug']
);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it between `$from` and `$to`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newCurvedDimension

```php?start_inline=1
void newCurvedDimension( 
    string $pathstring,
    float $offset = false,
    string $text = false,
    string $pathAttributes = ['class' => 'dimension'],
    string $labelAttributes = ['class' => 'dimension-label', 'dy' => -2],
    string $leaderAttributes = ['class' => 'dimension-leader']
)
```

Adds a [`Dimension`](dimension) dimension to the [`Part`](part) that runs
along a path described by `$pathstring` at an offset of `$offset`.

If `$text` is `false` it will be replaced with the length of the path
described by `$pathstring`, which is the expected behavior for dimensions.

`$pathAttributes`, `$labelAttributes`, and `$leaderAttributes` are all optional
arrays to be passed as attributes to the [`Dimension`](dimension) path, label, and leaders 
respectively.

They have sensible defaults, but you are free to override them.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newCurvedDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newCurvedDimension-result" markdown="1">

{% include figure.html 
    description="Despite it's name, newCurvedDimension() works on any pathstring, not just on curves"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newCurvedDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newCurvedDimension-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 100);
$p->newPoint(2, 30, 0);
$p->newPoint(3, 70, 80);
$p->newPoint(4, 100, 50);

$p->newPoint(5, 10, 0);
$p->newPoint(6, 14, 20);
$p->newPoint(7, 80, 30);

$p->newPath(1,"M 1 C 2 3 4");   
$p->newPath(2,"M 5 L 6 L 7");   

// A typical curved dimension 
$p->newCurvedDimension('M 1 C 2 3 4', 10);

// Along a path that isn't curved
$p->newCurvedDimension('M 5 L 6 L 7', 10);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns when adding instructions for paperless themes.

#### Parameters
{:.no_toc}

- `string` `$pathstring`: The pathstring that describes a path for the [`Dimension`](dimension) to follow.
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it on top of the path described by `$pathstring`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

#### Return value
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newGrainline

```php?start_inline=1
void newGrainline( 
    string $from,
    string $to,
    string $text = false
)
```

Adds a grainline to your part. This is a special case of 
[`Part::newLinearDimension`](part#newlineardimension) with the 
attributes set to display a grainline.

> In the context of your pattern, you probably want to set 
`$text` to `$this->t('Grainline')` so that your text gets translated.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newGrainline" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newGrainline-result" markdown="1">

{% include figure.html 
    description="Adding a grainline to your part is child's play with newGrainline()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newGrainline"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newGrainline-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 40, 80);

$p->newGrainline(1,2,$this->t('Grainline'));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

#### Return value
{:.no_toc}

Nothing, a [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newCutonfold

```php?start_inline=1
void newCutonfold( 
    string $from,
    string $to,
    string $text = false,
    float $offset = 20
)
```

Adds a so-called _cutonfold_ line to your part. This is a special case of 
[`Part::newCurvedDimension`](part#newcurveddimension) that will add points
at a given offset and set the 
attributes set to display a cutonfold line.

> In the context of your pattern, you probably want to set 
`$text` to `$this->t('Cut on fold')` so that your text gets translated.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newcutonfold" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newcutonfold-result" markdown="1">

{% include figure.html 
    description="Adding a cutonfold line to your part is child's play with newCutonfold()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=newCutonfold"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newcutonfold-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 40, 80);

$p->newGrainline(1,2,$this->t('Grainline'));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

#### Return value
{:.no_toc}

Nothing, a [`Dimension`](dimension) objects will be added to the [`Part`](part).

### notch

```php?start_inline=1
void notch( 
    array $points
)
```

Adds a `notch` [`SvgSnippet`](svgsnippet) to all points in array `$points`.

Note that `$points` does not contain [`Point`](point) objects, but names
of points added to tehe [`Part`](part).

Essentially, it's a fast way to add a bunch of notches to your [`Part`](part).

#### Example
{:.no_toc}

{% include classTabs.html
    id="notch" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="notch-result" markdown="1">

{% include figure.html 
    description="Adding notches to a pattern part with notch()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=notch"
%}

</div>
<div role="tabpanel" class="tab-pane" id="notch-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);
$p->newPoint(2, 20, 10);
$p->newPoint(3, 30, 10);
$p->newPoint(4, 40, 10);
$p->newPoint(5, 50, 10);

$p->notch([2,4,5]);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

#### Return value
{:.no_toc}

Nothing, a [`SvgSnippet`](svgsnippet) object will be added to the [`Part`](part).

### addTitle

```php?start_inline=1
void addTitle(
    string $anchor,
    string $nr,
    string $title,
    string $message = '',
    string $mode = 'default'
) 
```

Creates three new [`Text`](text) object and adds them to the part.

- One for the part number
- One for the part title
- One for an optional message

All three are anchored on the same point, specified by `$anchor`;

`$mode` is an optional parameter to change the way the text is rendered.
The possibilities are:

- default
- vertical
- horizontal
- small
- vertical-small
- horizontal-small

#### Example
{:.no_toc}

{% include classTabs.html
    id="addTitle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="addTitle-result">

{% include figure.html 
    description="Overview of the different modes of addTitle()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=addTitle"
%}

</div>
<div role="tabpanel" class="tab-pane" id="addTitle-code" markdown="1">

```php?start_inline=1
$modes = [
    'default',
    'vertical',
    'horizontal',
    'small',
    'vertical-small',
    'horizontal-small',
];

foreach($modes as $mode) {
    // Only one title per part, so we need a part for each mode
    $this->addPart($mode);

    /** @var \Freesewing\Part $p */
    $p = $this->parts[$mode];
    $p->newPoint(1, 20, 35);
    $p->addTitle(1, 3, 'Title', $mode, $mode);
}
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in pattern classes to add a title to a [`Part`](part).

#### Parameters
{:.no_toc}

- `string` `$anchor`: The name of a [`Point`](point) to anchor the title on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$nr`: The part number.
- `string` `$title`: The part title.
- `string` `$message`: An optional message. 
- `string` `$mode`: One of `default`, `vertical`, `horizontal`, `small`, `vertical-small`, or `horizontal-small`. Defaults to `default`.

## Methods for Path offset

### offsetPath

```php?start_inline=1
void offsetPath(
    string $offsetName,
    string $sourceName,
    float $distance = 10,
    bool $render = false,
    array $attributes = null
) 
```

Creates a new [`Path`](path) object and adds it to the [`Part`](part)
with name `$offsetName`;

The new [`Path`](path) will be an offset version of [`Path`](path) `$sourceName` 
which should be an existing [`Path`](path) object in the [`Part`](part).

By offset we mean, drawn equidistant to it. 

#### Example
{:.no_toc}

{% include classTabs.html
    id="offsetPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="offsetPath-result">

{% include figure.html 
    description="Texts on paths"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=offsetPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="offsetPath-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);
$p->newPoint(2, 20, 90);
$p->newPoint(3, 30, 10);
$p->newPoint(4, 80, 40);
$p->newPoint(5, 110, 10);
$p->newPoint(6, 110, 80);
$p->newPoint(7, 30, 80);

$p->newPath(1, 'M 1 L 2');
$p->newPath(2, 'M 3 L 4 L 5 C 6 7 3 z');

$p->offsetPath(4,1,10,1, ['class' => 'seam-allowance']);
$p->offsetPath(5,2,-10,1, ['class' => 'seam-allowance']);
```

</div>
</div>

A few things to keep in mind:

- Your path will not be rendered unless you set `$render` to true
- Offset is always to the right. If you want it to the left, use a negative `$distance`

It is non-trivial to offset a path. Behind this method hides code
to calculate the offset, avoid overlapping, and close gaps at corners.

To give you an idea of the complexity, here's the example rendered
with the debug theme.

{% include figure.html
    description="Offsetting paths is... complicated"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&class=Part&method=offsetPath"
%}

#### Typical use
{:.no_toc}

Used mostly to add seam-allowance to patterns.

#### Parameters
{:.no_toc}

- `string` `$offsetName`: The name for the new [`Path'][Path] object that will be added to the [`Part`](part).
- `string` `$sourceName`: The name of [`Path'][Path] object (previously added to the [`Part`](part) ) that we will offset.
- `float` `$distance`: Distance in mm by which to offset.
- `bool` `$render`: Whether to render this path, or not. Defaults to `false`. 
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object.

### offsetPathString

```php?start_inline=1
void offsetPathString(
    string $name,
    string $pathstring,
    float $distance = 10,
    bool $render = false,
    array $attributes = null
) 
```

Like [`Part::offsetPath`](part#offsetpath), but instead of passing it 
the name of a [`Path`](path) object in the [`Part`](part), you can simply
pass it a pathstring.

#### Example
{:.no_toc}

{% include classTabs.html
    id="offsetPathString" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="offsetPathString-result">

{% include figure.html 
    description="An example of offsetPathString()"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=offsetPathString"
%}

</div>
<div role="tabpanel" class="tab-pane" id="offsetPathString-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 30, 10);
$p->newPoint(2, 80, 40);
$p->newPoint(3, 110, 10);
$p->newPoint(4, 110, 80);
$p->newPoint(5, 30, 80);

$p->newPath(1, 'M 1 L 2 L 3 C 4 5 1 z');

$p->offsetPathString(2,'M 3 C 4 5 1',-5,1, ['class' => 'stroke-warning']);
$p->offsetPathString(3,'M 1 L 2 L 3',-10,1, ['class' => 'stroke-note']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used when offsetting only part of a [`Path`](path).
Like in [`Part::newCurvedDimension`](part#newcurveddimension).

#### Parameters
{:.no_toc}

- `string` `$name`: The name for the new [`Path'][Path] object that will be added to the [`Part`](part).
- `string` `$pathstring`: The pathstring that we need to offset.
- `float` `$distance`: Distance in mm by which to offset.
- `bool` `$render`: Whether to render this path, or not. Defaults to `false`. 
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object.

## Various methods

### isPoint

```php?start_inline=1
bool isPoint( 
    string $name
)
```

Returns true of the ['Point'](point) is known in the ['Part'](part), or false if it's not.

> If you want to check whether something is a ['Point'](point) object, 
> you can use `$point instanceof \Freesewing\Point`

#### Typical use
{:.no_toc}

In pattern logic to verify whether a certain point has been created.

#### Parameters
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) to check for.

#### Return value
{:.no_toc}

Returns `true` if the [`Point`](point) is known in the [`Part`](part) or `false` if it is not know.

### getTitle

```php?start_inline=1
string getTitle() 
```

Returns the `title` property of the part.

#### Example
{:.no_toc}

{% include classTabs.html
    id="getTitle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="getTitle-result">

This is the title

</div>
<div role="tabpanel" class="tab-pane" id="getTitle-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
echo $p->getTitle();
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to add the title to parts.

#### Return value
{:.no_toc}

A string containing the part title.

### setRender

```php?start_inline=1
void setRender( 
    bool $bool 
)
```
Sets the `render` property to either `true` or `false` depending on the boolean value passed to it.

Parts that have their `render` property set to `false` won't be rendered by the [`SvgRenderbot`](svgrenderbot), 
which means they won't show up in your pattern.

> Note that parts are only excluded from being rendered into SVG. But the part is still
> fully processed.

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 50, 0);

$p->newPath(1,"M 1 L 2");

// This will prevent the part from being rendered
$p->setRender(false);
```

#### Typical use
{:.no_toc}

Parts have their render property set to `true` by default, so this is really only used to 
set it to `false`.

A common scenario is when you want to hide parts from the pattern that are used in construction.
Like a basic block part that was inherited from a parrent pattern.

#### Parameters
{:.no_toc}

This expects a boolean, either `true` or `false`.

### unit

```php?start_inline=1
string unit(
    float $distance
) 
```

Takes a `$distance` in mm and returns it formatted according to the units of the part.

#### Example
{:.no_toc}

{% include classTabs.html
    id="unit" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="unit-result">

{% include figure.html 
    description="An example of the unit method"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&onlyPoints=1&class=Part&method=unit"
%}

</div>
<div role="tabpanel" class="tab-pane" id="unit-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 40, 10);
$p->newPoint(2, 40, 20);

// If not set explicitly, units are metric by default
$p->newNote(1, 1, $p->unit(100),9,15,0);

$p->setUnits('imperial');
$p->newNote(2, 2, $p->unit(100),9,15,0);
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to format distances on the pattern.

#### Return value
{:.no_toc}

A string formatted according to the units.

### newId

```php?start_inline=1
void newId(
    string $prefix = '.volatile'
) 
```

Returns a free ID for a given prexix. 
You can overwrite a [`Point`](point), or [`Path`](path), or ... in the [`Part`](part),
by adding it again with the same name.

But you don't want that to happen by accident, and you want to make sure everything
gets its own name, or ID.

This method helps you with that, you pass it a string and it will return an available
ID/name.

#### Example
{:.no_toc}

{% include classTabs.html
    id="newId" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newId-result" markdown="1">

```php?start_inline=1
test1
test2
test3
test4
hello1
hello2
test5
.volatile1
```

</div>
<div role="tabpanel" class="tab-pane" id="newId-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
echo $p->newId('test');
echo $p->newId('test');
echo $p->newId('test');
echo $p->newId('test');
echo $p->newId('hello');
echo $p->newId('hello');
echo $p->newId('test');
echo $p->newId();
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used by methods who add points to the part to prevent clashing names/IDs.

#### Parameters
{:.no_toc}

- `string` `$prefix`: A prefix to the apply to the unique ID

## Internal methods

### addTransform

```php?start_inline=1
void addTransform(
    string $name,
    \Freesewing\Transform $transform,
) 
```

Adds a [`Transform`](transform) object passed to it to the [`Part`](part).

#### Typical use
{:.no_toc}

This is used by the Pattern to place parts on the pattern after the 
layout is determined.

You **never** want to use this directly.

#### Parameters
{:.no_toc}

- `string` `$name`: A name to reference the [`Transform`](transform) by.
- `\Freesewing\Transform` `$transform`: The [`Transform`](transform) object.

### addBoundary

```php?start_inline=1
void addBoundary(
    float $margin = 0.0
) 
```

Calculates a bounding box and adds it as a [`Boundary`](boundary) 
object to the `boundary` property of the part.

#### Typical use
{:.no_toc}

This is part of the layout work, handled automatically by the [`Patterns/pattern`](patterns/core/pattern) class.

Normally, you **never** use this directly.

#### Parameters
{:.no_toc}

- `float` `$margin`: Defaults to zero, but takes a number (in mm) that will be added as margin

### setTitle

```php?start_inline=1
void setTitle( 
    string $title 
)
```
Sets the `title` property to the `string` passed to it.

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->setTitle('This is the title');
```

#### Typical use
{:.no_toc}

The [`Patterns/pattern::loadParts`](patterns/core/pattern#loadparts) method sets the title automatically
for parts listed in the pattern configuration file.

#### Parameters
{:.no_toc}

This expects a string.

### setUnits

```php?start_inline=1
void setUnits( 
    string $units 
)
```
Sets the `units` property to the `string` passed to it.

Units should be set to either `metric` or `imperial`. If they are not set,
they default to `metric`.

> The units in question are the units expected by the end user.
> In other words, it's the unitsOut as stored in the [`Context`](context).

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->setUnits('imperial');
```

#### Typical use
{:.no_toc}

Units are set automatically in the [`Patterns/pattern::loadParts`](patterns/core/pattern#loadparts) method.

The reason units are stored in the [`Part`](part) method is to allow the [`Part::unit`](part#unit) 
to do its work.

#### Parameters
{:.no_toc}

A string, either `metric` or `imperial`.

### getRender

```php?start_inline=1
bool getRender() 
```

Returns the `render` property of the part. Either `true` or `false`.

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->getRender(); // TRUE by default
```

#### Typical use
{:.no_toc}

Used by [`SvgRenderbot`](svgrenderbot) to determine whether a  
[`Part`](part) needs to be rendered.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

### hasPathToRender

```php?start_inline=1
void hasPathToRender()
```

Returns true if, you guess it, the [`Part`](part) has a [`Path`](path) to render.

In other words, this calls [`Path::getRender`](path#getrender) on all
[`Path`](path) objects contained in the [`Part`](part). If any of them 
returns `true`, this returns `true`.

#### Typical use
{:.no_toc}

You can't trust pattern developers to call [`Part::setRender(false)`](part#setrender) on all parts
that shouldn't be rendered.

That's because some parts have nothing to render (only points for example) and are thus
empty and _invisible_. 

That's why the [`Themes/paperless`](themes/core/paperless) theme calls this method before 
adding a grid to the part. Because adding a grid to a empty part would make it
visible.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

## See also
{% include classFooter.html %}


* TOC - Always include these two lines at the bottom
{:toc}

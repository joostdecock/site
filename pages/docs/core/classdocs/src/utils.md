---
layout: page
title: Utils
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/utils
---
## Description 

The [`Utils`](utils) class is a collection of utilities that do not
depend on an instantiated object. In other words, all its methods are static.

## Typical use

The [`Utils`](utils) class is used throughout the Freesewing codebase, everything
we need a utility it provides.

## Public methods

### asScrubbedArray

```php?start_inline=1
array asScrubbedArray( 
    string $data,
    string $delimiter = ' '
)
```
[`Utils::asScrubbedArray`](utils#asscrubbedarray) splits a `string` `$data` into chunks by delimiter `$delimiter`.

In addition, it will trim whitespace from the start and end of every chunk, and remove empty chunks.

This is like PHP's native `explode` function, + removing whitespace and empty parts.

#### Example
{:.no_toc}

{% include classTabs.html
    id="asScrubbedArray" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="asScrubbedArray-result" markdown="1">

```php?start_inline=1
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 4
    [4] => 3
    [5] => 23
    [6] => 4
)

Array
(
    [0] => i 12
    [1] => 1435
    [2] => jonas
    [3] => 4
)
```
</div>
<div role="tabpanel" class="tab-pane" id="asScrubbedArray-code" markdown="1">

```php?start_inline=1
$data = ' 1  2   3   4   3   23  4  ';
print_r(\Freesewing\Utils::asScrubbedArray($data));

$data = "i 12,1435,jonas , , 4 ";
print_r(\Freesewing\Utils::asScrubbedArray($data),',');
```

</div>
</div>

#### Typical use
{:.no_toc}

Commonly used to break apart a pathstring.

#### Parameters
{:.no_toc}

- `string` `$data` : The data to return as an `array`.
= `string` `$delimiter` : The `string` to split `$data` on.

#### Return value
{:.no_toc}

Returns an `array`.

### isAllowedPathCommand

```php?start_inline=1
bool isAllowedPathCommand( 
    string $command
)
```
Returns `true` is command `$command` is a SVG patch command supported by Freesewing.

Freesewing supports the following commands in a pathstring:

- M
- L
- C
- z
- Z

The SVG standard has support for more commands, but we don't support those.

#### Typical use
{:.no_toc}

Used to verify we can handle commands in a pathstring.

#### Parameters
{:.no_toc}

- `string` `$command` : The SVG pathstring command to check.

#### Return value
{:.no_toc}

Returns a boolean. `true` if the command is support, and `false` if not.

### flattenAttributes

```php?start_inline=1
array flattenAttributes( 
    array $attributes,
    array $remove = array()
)
```
This will take an array of name/value pairs of attributes and join them in
a string that is suitable attribute markup.

In addition to that, you can pass it an array of attributes to filter out.

#### Example
{:.no_toc}

{% include classTabs.html
    id="flattenattributes" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="flattenattributes-result" markdown="1">

```php?start_inline=1
class="class1 class2" id="test-id" 
class="class1 class2"
```
</div>
<div role="tabpanel" class="tab-pane" id="flattenattributes-code" markdown="1">

```php?start_inline=1
$attributes = ['class' => 'class1 class2', 'id' => 'test-id'];

echo \Freesewing\Utils::flattenAttributes($attributes);
echo \Freesewing\Utils::flattenAttributes($attributes, ['id']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used by [`SvgRenderbot`](svgrenderbot). 

The [`SvgRenderbot`](svgrenderbot) filters out
the `line-height` attribute when rendering text.
`line-height` is not an SVG attribute, but something we 
mimic the behavior of.

#### Parameters
{:.no_toc}

- `array` `$attributes` : An array of name/value pairs of attributes to flatten.
= `array` `$remove` : An `array` of attribute names to filter out.

#### Return value
{:.no_toc}

Returns an `string`.

### getClassDir

```php?start_inline=1
string getClassDir( 
    object $class
)
```
Returns the class directory of the object passed to it.

#### Typical use
{:.no_toc}

Used to find the directory for a given theme or pattern.

#### Parameters
{:.no_toc}

- `object` `$class` : An object for which we want to find the directory.

#### Return value
{:.no_toc}

Returns a directory path, which is a `string`.

### lineLineIntersection

```php?start_inline=1
array|false lineLineIntersection( 
    Freesewing\Point $line1From, 
    Freesewing\Point $line1To 
    Freesewing\Point $line2From, 
    Freesewing\Point $line2To 
)
```

Finds the intersection between two lines.

#### Example
{:.no_toc}

{% include classTabs.html
    id="linesCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="linesCross-result" markdown="1">

{% include coreClassdocsFigure.html
    description="lineCross() finds the intersection between two line segments"
    params="service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=linesCross"
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

Typically called through [`Part::linesCross`](part#linescross).

#### Parameters
{:.no_toc}

- [`Point`](point) `$line1From` : The first point on line 1
- [`Point`](point) `$line1To` : The second point on line 1
- [`Point`](point) `$line2From` : The first point on line 2
- [`Point`](point) `$line2To` : The second point on line 2

#### Return value
{:.no_toc}

Returns a non-associative `array` with an x and y coordinate like this:

```php?start_inline=1
[12,34]
```

### circleCircleIntersections

```php?start_inline=1
array|false circleCircleIntersections( 
    Freesewing\Point $center1, 
    float $radius1,
    Freesewing\Point $center2 
    float $radius2,
    string $sort 
)
```

Finds the point(s) where two circles intersect.

#### Example
{:.no_toc}

{% include classTabs.html
    id="circlesCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="circlesCross-result" markdown="1">

{% include coreClassdocsFigure.html
    description="The intersection points of two circles"
    params="service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1,2&class=Part&method=circlesCross"
%}

</div>
<div role="tabpanel" class="tab-pane" id="circlesCross-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 75, 40);
$p->newPoint(2, 125, 60);

// Note that while there's no support for circles in freesewing core, you can still add them as raw SVG
$p->newInclude('circle1', '<circle xmlns="http://www.w3.org/2000/svg" cx="75" cy="40" r="40" style="stroke: #ccc; stroke-width: 0.3; stroke-dasharray: 1 1;"/>'); 
$p->newInclude('circle2', '<circle xmlns="http://www.w3.org/2000/svg" cx="125" cy="60" r="30" style="stroke: #ccc; stroke-width: 0.3; stroke-dasharray: 1 1;"/>'); 

$p->circlesCross(1,40,2,30,'isect');
$p->notch(['isect1','isect2']);
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically called through [`Part::circlesCross`](part#circlescross).

#### Parameters
{:.no_toc}

- [`Point`](point) `$center1` : The center of the first circle
- `float` `$radius1` : The radius of the first circle
- [`Point`](point) `$center2` : The center of the second circle
- `float` `$radius12` : The radius of the second circle
- `string` `$sort` : `x` to sort results by the X-axis, `y` to sort them by the Y-axis

#### Return value
{:.no_toc}

Returns an `array` of [`Point`](point) objects or `false` if there are no intersections.

### circleCrossesLine

```php?start_inline=1
array|false circleCrossesLine( 
    Freesewing\Point $c,
    float  $r,
    Freesewing\Point $p1,
    Freesewing\Point $p2,
    string $sort = 'x'
)
```

Finds the point(s) where a circle an line segment intersect.

#### Example
{:.no_toc}

{% include classTabs.html
    id="circlesCrossesLine" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="circlesCrossesLine-result" markdown="1">

{% include coreClassdocsFigure.html
    description="The intersection points of a circle and line segment"
    params="theme=Basic&class=Part&method=circlesCrossesLine"
%}

</div>
<div role="tabpanel" class="tab-pane" id="circlesCrossesLine-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 75, 40);
$p->newPoint(2, 25, 80);
$p->newPoint(3, 145, 20);

$p->newPath('line', 'M 2 L 3', ['style' =>'stroke: #ccc; stroke-width: 0.3; stroke-dasharray: 1 1;']);
$p->newInclude('circle', '<circle cx="75" cy="40" r="40" style="stroke: #ccc; stroke-width: 0.3; stroke-dasharray: 1 1;"/>'); 

$p->circleCrossesLine('1',40,2,3,'isect');
$p->notch(['isect1','isect2']);
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

#### Parameters
{:.no_toc}

- [`Point`](point) `$c`: The [`Point`](point) that is the center of the circle.
- `float`  `$r`: The radius of the circle.
- [`Point`](point): The [`Point`](point) that is the start of the line segment.
- [`Point`](point): The [`Point`](point) that is the end of the line segment.
- `string` `$sort`: `x` to sort results by the X-axis, `y` to sort them by the Y-axis


#### Return value
{:.no_toc}

Returns an `array` of [`Point`](point) objects or `false` if there are no intersections.

### getSlope

```php?start_inline=1
float getSlope( 
    Freesewing\Point $point1, 
    Freesewing\Point $point2 
)
```
Returns [the slope of the line](https://en.wikipedia.org/wiki/Slope)
 that goes through [`Point`](point) `$point1` and
[`Point`](point) `$point2`.

#### Typical use
{:.no_toc}

Typically only used by [`Utils::lineLineIntersection`](utils#linelineintersection).

#### Parameters
{:.no_toc}

- [`Point`](point) `$point1` : The first point on the line
- [`Point`](point) `$point2` : The second point on the line

#### Return value
{:.no_toc}

Returns the slope of the line, which is a `float`.

### isSamePoint

```php?start_inline=1
bool isSamePoint( 
    Freesewing\Point $point1, 
    Freesewing\Point $point2 
)
```
Returns `true` if [`Point`](point) `$point1` and [`Point`](point) `$point2` are (almost) the same.

Checks whether two points are the same, or close enough to be considered the same.
Close enough means less than 0.1 mm difference between their coordinates on each axis.

#### Typical use
{:.no_toc}

Typically used by the [`Part`](part) class.

#### Parameters
{:.no_toc}

- [`Point`](point) `$point1` : The first point
- [`Point`](point) `$point2` : The second point

#### Return value
{:.no_toc}

Returns a `bool`, `true` if the points are (almost) the same, `false` if not.

### distance

```php?start_inline=1
float distance( 
    Freesewing\Point $point1, 
    Freesewing\Point $point2 
)
```
Returns the distance between two points. Note that distance is always positive.

#### Typical use
{:.no_toc}

Typically called from [`Part::distance`](part#distance).

#### Parameters
{:.no_toc}

- [`Point`](point) `$point1` : The first point
- [`Point`](point) `$point2` : The second point

#### Return value
{:.no_toc}

Returns the distance between the two points, which is a `float`.

### constraint

```php?start_inline=1
float constraint( 
    float $value, 
    float $min, 
    float $max 
)
```
Returns `$value` if it's within the bounds of `$min` and `$max`.

If it's outside the bounds set by `$min` and `$max`, this will return either `$min` or `$max`, depending which is closest.

#### Typical use
{:.no_toc}

This is used to parse the values for options that have a min and max setting.

This way, even if a value is submitted that is outside the allowed range, it will be constrained within the range.

#### Parameters
{:.no_toc}

- `float` `$value` : The input value
- `float` `$min` : The minimum
- `float` `$max` : The maximum

#### Return value
{:.no_toc}

Returns a `float` `$value` that lies between `$min` and `$max`.

### slug

```php?start_inline=1
string slug( 
    string $string
)
```
Returns a [slug](https://en.wikipedia.org/wiki/Semantic_URL#Slug) for a given string.

#### Typical use
{:.no_toc}

Only used by the [`Themes/designer`](../themes/core/designer) theme.

#### Parameters
{:.no_toc}

- `string` `$string` : The string to slugify.

#### Return value
{:.no_toc}

Returns a `string`.

### debug

```php?start_inline=1
string debug( 
    mixed $data
)
```
Returns [kint](http://raveren.github.io/kint/) formated debug for the data passed to it.

#### Typical use
{:.no_toc}

Only used by the [`Themes/developer`](../themes/core/developer) theme.

#### Parameters
{:.no_toc}

- `$data` : The data to debug. Typically an `array` or `object`.

#### Return value
{:.no_toc}

Returns a `string` of kint-formatted debug.






## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

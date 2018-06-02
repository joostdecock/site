---
title: Core API documentation
---

## Pattern

The `Pattern` class is an abstract class to be extended by patterns.

It defines two abstract public methods that must be implemented by all classes
extending it. They are:

- `Pattern::sample` : Called by [the sample service](/docs/core/fundamentals#the-sample-service)
- `Pattern::draft` : Called by [the draft service](/docs/core/fundamentals#the-draft-service)

When designing patterns on the freesewing platform, your pattern will extend 
this class, and its methods will be available on the `$this` object.

### setOption

```php
void setOption(
    string $name,
    mixed $value
)
```

Sets the option `$name` to `$value` in the options property, which is an `array` of name/value pairs.

> ##### Use [`pattern::setOptionIfUnset`](pattern#setoptionifunset) instead
>
> While you can use this method to set an option, it's typically better to use 
> the [`pattern::setOptionIfUnset`](pattern#setoptionifunset) method instead.
>
> The reason is that (future) patterns may extend your pattern and choose to set options
> to a different value. 
>
> This method will blindly override their choices (typically not a good thing)
> whereas [`pattern::setOptionIfUnset`](pattern#setoptionifunset) will only set the option if 
> it hasn't already been set (which is better).
{:.tip}

**Typical use**

Used in patterns to set options that aren't depending on user input, and by the [`OptionsSampler`](../../src/optionssampler).

**Parameters**

- `string` `$name` : Name of the option to set
- `mixed` `$value` : The value to set

### setOptionIfUnset

```php
void setOptionIfUnset(
    string $name,
    mixed $value
)
```

Sets the option `$name` to `$value` in the options property 
(which is an `array` of name/value pairs)
, unless it already has an assigned value.

**Parameters**

- `string` `$name` : Name of the option to set
- `mixed` `$value` : The value to set


### setValue

```php
void setValue(
    string $name,
    mixed $value
)
```

Sets the value `$name` to `$value` in the values property, which is an `array` of name/value pairs.

> ##### Use [`pattern::setValueIfUnset`](pattern#setvalueifunset) instead
>
> While you can use this method to set a value, it's typically better to use 
> the [`pattern::setValueIfUnset`](pattern#setvalueifunset) method instead.
>
> The reason is that (future) patterns may extend your pattern and choose to set different values.
>
> This method will blindly override their choices (typically not a good thing)
> whereas [`pattern::setValueIfUnset`](pattern#setvalueifunset) will only set the value if 
> it hasn't already been set (which is better).

**Parameters**

- `string` `$name` : Name of the value to set
- `mixed` `$value` : The value of the value to set


### setValueIfUnset

```php
void setValueIfUnset(
    string $name,
    mixed $value
)
```

Sets the value `$name` to `$value` in the values property 
(which is an `array` of name/value pairs)
, unless it already has an assigned value.

**Parameters**

- `string` `$name` : Name of the value to set
- `mixed` `$value` : The value to set

### getOption

```php
mixed getOption(
    string $name
)
```

Returns the option `$name`.

**Return value**

Whatever is stored in the option, typically an `int`, `float` or `string`.

### o

```php
mixed o(
    string $name
)
```

An alias of `Pattern::getOption`.

### getValue

```php
mixed getValue(
    string $name
)
```

Returns the value `$name`.

**Return value**

Whatever is stored in the value, typically an `int`, `float` or `string`.

### v

```php
mixed v(
    string $name
)
```

An alias of `Pattern::getValue`.

### t

```php
string t(
    string $message
)
```

Returns the translation of `$message`.

> This is just a front for the trans method in the Symfony Translator.

**Parameters**

- `string` `$message` : The string to translate

**Return value**

Returns a translated `string`.

### stretchToScale

```php
void stretchToScale(
    float $stretch
)
```

The way people measure stretch intuitively is different from the way I handle stretch in code.

When people say _25% stretch_ they mean that 10cm fabric should get stretched to 12.5cm fabric.
In code, that means a scale of 80% needs to be applied.

This method does that calcuation, it's as simple as:

```php?start_inline=true
return ( 1 / ( 1 + $stretch ) );
``` 

**Parameters**

- `float` `$stretch` : The percentage of stretch as a number between 0 and 1.


### clonePoints

```php
void clonePoints(
    string $from,
    string $into
)
```

Clones points from `Part` `$from` into `Part` `$into`.

Note that both parts need to exists in the `parts` property, which is an array of `Part` objects.

**Parameters**

- `string` `$from` : The `Part` object under key `$from` in the `parts` property to clone points from.
- `string` `$into` : The `Part` object under key `$into` in the `parts` property to clone points into.

### newPart

```php
void newPart(
    string $name
)
```

Creates a new `Part` and adds it to the `parts` property under `$name`.

The `parts` property is an associative `array` of `Part` objects with a `$name` as index.

**Parameters**

- `string` `$name` : The name of the part in the `parts` array.


### requested

```php
string requested()
```

Returns the full namespaced name of the class/pattern requested by the user.

Called from patterns to determine whether we are in the pattern requested, or in a (grand)father pattern.

This is typically used for conditionale execution of code by comparing it to PHP's magic `__CLASS__` variable.
See [this blog post](/blog/where-are-we/) for more info.

### msg

```php
void msg(
    string $message
)
```

Stores the message `$message` in the `messages` property.

Messages stored in the pattern are (by default) included in the SVG output as comments.
This is a handy way to include extra information in the pattern.

The default theme includes this information as comments at the end of the SVG file.

**Parameters**

- `string` `$message` : The message to include

### dbg

```php
void dbg(
    string $message
)
```

Stores the message `$message` in the `debug` property.

This behaves exactly as `Pattern::msg`, the difference is
in whether or not it will be included in the SVG file.

The default theme will include messages set via `Pattern::msg` but will not include
messages set with `Pattern::dbg`. The Designer theme includes both.

**Parameters**

- `string` `$message` : The message to include as debug.



## Model

The `Model` class holds data for a model. More precisely, the model's measurements.

The `Model` object is most commonly used in the patterns to retrieve
model measurements with the `Model::getMeasurement` method.

Given that this is so common, there's an alias for it: `Model::m`.

### getMeasurement

```php
float getMeasurement(
    string $name
)
```
Returns the value of measurement `$name`.

**Parameters**

The name of the measurement.

**Return value**

The value of the measurement, typically a `float` or `int`.

> Keep in mind that all values represent mm.

### m

```php
float m(
    string $name
)
```

An alias of `Model::getMeasurement`.



## Part

The `Part` class is the most important Freesewing class.

Patterns are merely a bunch of parts placed together in an SVG document.
Parts are the beating heart of this project.

A `Part` is essentially a container that holds all the information for a part, 
and has a bunch of helper functions that make it easy to add that information.

This is the data you can store in a [`Part`](part) object:

- Points
- Paths
- Texts
- Texts on path
- Notes
- Dimensions
- Snippets

> They are all stored in an associative array and thus require a name or number as index.

For all of these, there are helper functions that make up the bulk
of the methods described below.

To help you make sense of it all, I've grouped similar methods together.

### Methods that return a float

These are methods that return a number.
Things like an X or Y coordinate, the angle or length of a line, and so on.

### x

```php
float x(
    string $name
) 
```

Returns the X-coordinate of a `Point` stored in the `Part` under name `$name`.

**Parameters**

- `string` `$name`: The name of the `Point` of which to return the X-coordinate.

**Return value**

Returns the X-coordinate, which is a `float`.

### y

```php
float y(
    string $name
) 
```

Returns the Y-coordinate of a `Point` stored in the `Part` under name `$name`.

**Parameters**

- `string` `$name`: The name of the [`Point`](point) of which to return the Y-coordinate.

**Return value**

Returns the Y-coordinate, which is a `float`.

### deltaX

```php
float deltaX(
    string $name1,
    string $name2,
) 
```

Returns the difference in the X-coordinates between two `Point` objects stored in the 
`Part` under names `$name1` and `$name2` respectively.

Used to calculate the difference between two points on the X-axis.

**Parameters**

- `string` `$name1`: The name of the first `Point`.
- `string` `$name2`: The name of the second `Point`.

**Return value**

Returns the X delta between the points, which is a `float`.

### deltaY

```php
float deltaY(
    string $name1,
    string $name2,
) 
```

Returns the difference in the Y-coordinates between two `Point` objects stored in the 
`Part` under names `$name1` and `$name2` respectively.

Used to calculate the difference between two points on the Y-axis.

**Parameters**

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

**Return value**

Returns the Y delta between the points, which is a `float`.

### distance

```php
float distance(
    string $name1,
    string $name2,
) 
```

Returns the distance between two `Point` objects stored in the 
[`Part`](part) under names `$name1` and `$name2` respectively.

Used to calculate how far two points are apart.

> Note that distance always returns a positive value.

**Parameters**

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

**Return value**

Returns the distance between the points, which is a `float`.

### curveLen

```php
float curveLen( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end 
)
```

Calculates the length of a cubic Bezier curve.

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.

All these points should previously have been added to the `Part`.

**Return value**

Returns a `float`, the length of the curve.

### angle

```php
float angle(
    string $name1,
    string $name2
) 
```

Returns the angle of a line between two `Point` objects stored in the 
`Part` under name `$name1` and `$name2` and the X-axis.

Think of it as the slope of the line.

**Parameters**

- `string` `$name1`: The name of the first [`Point`](point).
- `string` `$name2`: The name of the second [`Point`](point).

**Return value**

Returns a `float`, the angles in degrees.

### Public methods that return a single Point object

These methods return a single `Point`(point) object. 
The intersection of two lines, a point rotated around another, or mirrored along
the X-axis, these kind of things.

> ##### These methods are non-destructive
>
> What's important to keep in mind is that these will create a **new** point.
>
> For example, when you shift or rotate a point, you get a new point. 
> The original that you shifted or rotated is not changed.

### loadPoint

```php
void loadPoint(
    string $name
) 
```

Returns a `Point` stored in the `Part` under name `$name`.

Use it whenever you need the full `Point` object. 

**Parameters**

- `string` `$name`: The name of the `Point` to return.

**Return value**

Returns a 'Point' object or throws an `InvalidArgumentException` 
if the 'Point' is not present in the 'Part'.

> You can also access a point as: `$part->points[$name]`

### clonePoint

```php
void clonePoint(
    string $sourceName,
    string $targetName
) 
```

Copies `Point` with name `$sourceName` and adds it
to the `Part` with name `$targetName`.

**Parameters**

- `string` `$sourceName`: The name of the [`Point`](point) to clone.
- `string` `$targetName`: The name to clone it to.

### flipX

```php
\Freesewing\Point flipX( 
    string $name, 
    float $x
)
```

Returns a `Point` created by fllipping/mirrorring `Point` `$name` 
around X-value `$x`;

**Parameters**

- `string` `$name`: The name of a [`Point`](point) to flip.
- `float` `$x`: The X-value to flip it around.

**Return value**

Returns a [`Point`](point) object.

### flipY

```php
\Freesewing\Point flipY( 
    string $name, 
    float $y
)
```

Returns a `Point` created by fllipping/mirrorring `Point` `$name` 
around Y-value `$Y`;

**Parameters**

- `string` `$name`: The name of a [`Point`](point) to flip.
- `float` `$y`: The Y-value to flip it around.

**Return value**

Returns a `Point` object.

### shift

```php
\Freesewing\Point shift( 
    string $name, 
    float $angle, 
    float $distance 
)
```

Returns a new `Point` at distance `$distance` from `Point` `$name` in direction `$angle`.

**Parameters**

- `string` `$name`: The name of the [`Point`](point) that is the origin of the shift.
- `float` `$angle`: The angle determines the direction in which to shift the [`Point`](point).
- `float` `$distance`: How far to shift the [`Point`](point).

**Return value**

A `Point` object.

### shiftTowards

```php
float shiftTowards( 
    string $origin, 
    string $direction,
    float $distance
)
```

Returns a point that lies `$distance` from `Point` `$origin` in the direction of `Point` `$direction`.

Note that:

- This returns a new `Point` object, and does not change the `$origin` point.
- `$distance` can be larger than the distance between `$origin` and `$direction`.

**Parameters**

- `string` `$origin`: The name of the [`Point`](point) that is the origin/start of the shift.
- `string` `$direction`: The name of the [`Point`](point) that is the direction of the shift.
- `float` `$distance`: The distance to shift. It must be positive. For "negative shifts", use `Part::shiftOutwards`.

`$origin` and `$direction` should previously have been added to the `Part`.

**Return value**

Returns a `Point` object of the new, shifted, point.

### shiftFractionTowards

```php
float shiftFractionTowards( 
    string $origin, 
    string $direction,
    float $fraction
)
```

Returns a point that lies at fraction `$fraction` from `Point` `$origin` in the direction `Point` `$direction`.

Note that:

- This returns a new `Point` object, and does not change the `$origin` point.
- `$fraction` is a `float` typically between 0 and 1, but it can be more than one to shift beyond the end point

**Parameters**

- `string` `$origin`: The name of the [`Point`](point) that is the origin/start of the shift.
- `string` `$direction`: The name of the [`Point`](point) that is the direction of the shift.
- `float` `$fraction`: The fraction to shift. 

`$origin` and `$direction` should previously have been added to the `Part`.

**Return value**

Returns a `Point` object of the new, shifted, point.

### shiftOutwards

```php
float shiftOutwards( 
    string $origin, 
    string $direction,
    float $distance
)
```

Returns a point that lies `$distance` beyond `Point` `$direction` starting from point `Point` `$origin`.

Note that:

- This returns a new `Point` object, and does not change the `$origin` point.
- `$distance` can be larger than the distance between `$origin` and `$direction`.
- If `$distance` is negative, we'll shift away from `$direction`.

**Parameters**

- `string` `$origin`: The name of the `Point` that is the origin/start of the shift.
- `string` `$direction`: The name of the `Point` that is the direction of the shift.
- `float` `$distance`: The distance to shift. 

`$origin` and `$direction` should previously have been added to the [`Part`](part).

**Return value**

Returns a `Point` object of the new, shifted, point.

### shiftAlong

```php
float shiftAlong( 
    string $start, 
    string $cp2,
    string $cp1,
    string $end, 
    float $distance
)
```

Returns a point that lies at `$distance` from `Point` `$start` along the Bezier curve
described by `$start`, `$cp1`, `$cp2`, and `$end`.

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.
- `float` `$distance`: The distance to shift along the curve. 

**Return value**

Returns a `Point` object of the new, shifted, point.

### shiftFractionAlong

```php
float shiftTowards( 
    string $start, 
    string $cp2,
    string $cp1,
    string $end, 
    float $fraction
)
```

Returns a point that lies at `$fraction` of the curve length from `Point` `$start` along the Bezier curve
described by `$start`, `$cp1`, `$cp2`, and `$end`.

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.
- `float` `$distance`: The fraction to shift along the curve. 

**Return value**

Returns a [`Point`](point) object of the new, shifted, point.

### rotate

```php
float rotate(
    string $name1,
    string $name2,
    float $rotation
) 
```

Rotates the `Point` stored in the `Part` under name `$name1` `$rotation` degrees 
around the `Point` stored in the `Part` under name `$name2`.

Used to rotate one [`Point`](point) around another, which is fairly common in
pattern design, especially when rotating darts.

**Parameters**

- `string` `$name1`: The name of `Point` to rotate.
- `string` `$name2`: The name of the `Point` to rotate around.
= `float` `$angle`: Rotation in degrees

**Return value**

Returns a new `Point` object.

### linesCross

```php
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

To check for an intersection of two lines that are endless, see `Part::beamsCross`

**Parameters**

- `string` `$startLine1`: The name of the `Point` that is the start of the first line.
- `string` `$endLine1`: The name of the `Point` that is the end of the first line.
- `string` `$startLine2`: The name of the `Point` that is the start of the second line.
- `string` `$endLine2`: The name of the `Point` that is the end of the second line.

**Return value**

Returns a `Point` object the lies at the intersection of the line segments,
or false if they don't intersect.

### beamsCross

```php
float beamsCross( 
    string $point1Line1, 
    string $point2Line1,
    string $point1Line2, 
    string $point2Line2,
)
```

Returns the intersection between 2 endless lines, or false if there is no intersection 
(which happens only when lines are parallel).

To check for an intersection on two line segments (not endless), see `Part::linesCross`

**Parameters**

- `string` `$point1Line1`: The name of a `Point` on line 1.
- `string` `$pointLine1`: The name of another `Point` on line 1.
- `string` `$point1Line2`: The name of a `Point` on line 2.
- `string` `$pointLine2`: The name of another `Point` on line 2.

**Return value**

Returns a `Point` object the lies at the intersection of the lines 1 and 2,
or false if the lines are parallel.

### curveEdge

```php
\Freesewing\Point curveEdge( 
    string $start.
    string $cp1,
    string $cp2,
    string $end,
    string $edge 
)
```

Returns the `Point` at edge `$edge` of a curve. Edge should be one of:

- top
- bottom
- left
- right

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.
- `string` `$edge`: One of `left`,`right`,`top`, or `bottom` to indicate what edge to find.

**Return value**

A `Point` object.

## Methods that add one or more points to the Part

Methods that potentially generate more that one single point do not return them, 
but add them to the Part for you.

> ##### Use the prefix Luke
>
> All these methods(\*) take a prefix that will be applied to the name of the generated points.
>
> For example, if one of these methods returns 3 points, and you gave it the prefix `sample`,
> the added points will be named `sample1`, `sample2`, and `sample3`.
>
> The prefix allows you to avoid collisions in point names.
>
> (\*) addPoint() does not take a prefix but a name, as it only ever adds one point.


### addPoint

```php
void addPoint(
    string $anchor,
    \Freesewing\Point $point,
    string $description = null
) 
```

Adds a `Point` object passed to it to the `Part`.
Optionally sets the description of the point.

**Parameters**

- `string` `$anchor`: The name for the `Point` in the `Part`.
- `\Freesewing\Point` `$point`: The `Point` object.
- `string` `$description`: An optional description that will be set on the `Point` object if provided.

### newPoint

```php
void newPoint(
    string $name
    float $x
    float $y
    string $description = null
) 
```

Creates a `Point` object and adds it to the part.

`$x`, `$y`, and an optional `$description` will be used to create the `Point` object.

The `$name` is so we can reference the `Point` later (by its name).

**Parameters**

- `string` `$name`: A name to reference the point by
- `float` `$x`: The X-coordinate of the `Point` object
- `float` `$y`: The Y-coordinate of the `Point` object
- `array` `$attributes`: An array of attributes to be added to the `Point` object

### curveCrossesX

```php
void curveCrossesX( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end, 
    float $x
    string $prefix = false
)
```

Finds the intersection(s) of a curve with a given X-value `$x` and adds them as `Point` objects 
to the `Part` with prefix `$prefix` 

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.
- `float` `$x`: The X-value to find intersections on.
- `prefix` `$prefix`: A prefix for the name of the `Point` objects to be added to the `Part`.


**Return value**

None, `Point` objects will be added to the `Part`.

### curveCrossesY

```php
void curveCrossesY( 
    string $start, 
    string $cp1, 
    string $cp2, 
    string $end, 
    float $y
    string $prefix = false
)
```

Finds the intersection(s) of a curve with a given Y-value `$y` and adds them as `Point` objects 
to the `Part` with prefix `$prefix` 

**Parameters**

- `string` `$start`: The name of the `Point` that is the start of the curve.
- `string` `$cp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$cp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$end`: The name of the `Point` that is the end of the curve.
- `float` `$y`: The Y-value to find intersections on.
- `prefix` `$prefix`: A prefix for the name of the `Point` objects to be added to the `Part`.


**Return value**

None, `Point` objects will be added to the `Part`.

### curveCrossesLine

```php
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

Addes the `Point`(s) at the intersection of a line and curve to the
`Part` with prefix `$prefix`.

**Parameters**

- `string` `$curveStart`: The name of the `Point` that is the start of the curve.
- `string` `$curveCp1`: The name of the `Point` that is the first control point of the curve.
- `string` `$curveCp2`: The name of the `Point` that is the second control point of the curve.
- `string` `$curveEnd`: The name of the `Point` that is the end of the curve.
- `string` `$lineStart`: The name of the `Point` that is the start of the line.
- `string` `$lineEnd`: The name of the `Point` that is the end of the line.
- `prefix` `$prefix`: A prefix for the name of the `Point` objects to be added to the `Part`.

**Return value**

Nothing, `Point` objects will be added to the `Part`.

### curvesCross

```php
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

Addes the `Point`s at the intersection two curves to the
`Part` with prefix `$prefix`.

**Parameters**

- `string` `$curve1Start`: The name of the [`Point`](point) that is the start of the first curve.
- `string` `$curve1Cp1`: The name of the [`Point`](point) that is the first control point of the first curve.
- `string` `$curve1Cp2`: The name of the [`Point`](point) that is the second control point of the first curve.
- `string` `$curve1End`: The name of the [`Point`](point) that is the end of the first curve.
- `string` `$curve2Start`: The name of the [`Point`](point) that is the start of the second curve.
- `string` `$curve2Cp1`: The name of the [`Point`](point) that is the first control point of the second curve.
- `string` `$curve2Cp2`: The name of the [`Point`](point) that is the second control point of the second curve.
- `string` `$curve2End`: The name of the [`Point`](point) that is the end of the second curve.
- `prefix` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).


**Return value**
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

### splitCurve

```php
\Freesewing\Point splitCurve( 
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
objects that describe the two curves.

The split happens on [`Point`](point) with name `$split` if `$splitOnDelta` is false (the default).

If `$splitOnDelta` is true, the split happens on delta `$split` (between 0 and 1).

Points will be added to the [`Part`](part) with prefix `$prefix`.

> ##### You should not use splitOnDelta
>
> The optional `splitOnDelta` variety of this method is best avoided.
> Splitting a curve on a delta of 0.5 (for example) will not split it 
> midway through as you might expect.
>
> That's because the delta varies from 0 to 1 in the polymomial function that 
> describes the curve. And feeding it 0.5 gives you no guarantee whatsoever 
> that you'll endup in the middle of the curve length.
{:.warning}

**Example**
{:.no_toc}

{% include classTabs.html
    id="splitCurve" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="splitCurve-result" markdown="1">

{% include coreClassdocsFigure.html
    description="The original curve, and the two curves after it's split"
    params="theme=Designer&onlyPoints=1,2,3,4,5,s1,s2,s3,s4,s5,s6,s7&class=Part&method=splitCurve"
%}

</div>
<div role="tabpanel" class="tab-pane" id="splitCurve-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$start`: The name of the [`Point`](point) that is the start of the original curve.
- `string` `$cp1`: The name of the [`Point`](point) that is the first control point of the original curve.
- `string` `$cp2`: The name of the [`Point`](point) that is the second control point of the original curve.
- `string` `$end`: The name of the [`Point`](point) that is the end of the original curve.
- `string` `$split`:  The name of the [`Point`](point) to split the original curve on, or a delta between 0 and 1
- `string` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).
- `bool` `$splitOnDelta`: `true` to split on a delta between 0 and 1, `false` by default.


**Return value**
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

### circlesCross

```php
\Freesewing\Point circlesCross( 
    string $c1,
    float  $r1,
    string $c2,
    float  $r2,
    string $prefix,
    string $sort = 'x'
)
```

Finds the point(s) where two circles intersect and adds them as [`Point`](point) objects to the part.

Points will be added to the [`Part`](part) with prefix `$prefix`.
     
`$sort` is the axis to sort results by, either `x` (default) or `y`.

**Example**
{:.no_toc}

{% include classTabs.html
    id="circlesCross" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="circlesCross-result" markdown="1">

{% include coreClassdocsFigure.html
    description="The intersection points of two circles"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=circlesCross"
%}

</div>
<div role="tabpanel" class="tab-pane" id="circlesCross-code" markdown="1">

```php
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

In patterns.

**Parameters**
{:.no_toc}

- `string` `$c1`: The name of the [`Point`](point) that is the center of the first circle.
- `float`  `$r1`: The radius of the first circle.
- `string` `$c2`: The name of the [`Point`](point) that is the center of the second circle.
- `float`  `$r2`: The radius of the second circle.
- `string` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).
- `string` `$sort`: `x` to sort results by the X-axis, `y` to sort them by the Y-axis


**Return value**
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

### circleCrossesLine

```php
\Freesewing\Point circleCrossesLine( 
    string $c,
    float  $r,
    string $p1,
    string $p2,
    string $prefix,
    string $sort = 'x'
)
```

Finds the point(s) where a circle an line segment intersect.

Points will be added to the [`Part`](part) with prefix `$prefix`.
     
`$sort` is the axis to sort results by, either `x` (default) or `y`.

**Example**
{:.no_toc}

{% include classTabs.html
    id="circlesCrossesLine" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="circlesCrossesLine-result" markdown="1">

{% include coreClassdocsFigure.html
    description="The intersection points of two circles"
    params="theme=Basic&class=Part&method=circlesCrossesLine"
%}

</div>
<div role="tabpanel" class="tab-pane" id="circlesCrossesLine-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$c`: The name of the [`Point`](point) that is the center of the circle.
- `float`  `$r`: The radius of the circle.
- `string` `$p1`: The name of the [`Point`](point) that is the start of the line segment.
- `string` `$p2`: The name of the [`Point`](point) that is the end of the line segment.
- `string` `$prefix`: A prefix for the name of the [`Point`](point) objects to be added to the [`Part`](part).
- `string` `$sort`: `x` to sort results by the X-axis, `y` to sort them by the Y-axis


**Return value**
{:.no_toc}

Nothing, [`Point`](point) objects will be added to the [`Part`](part).

## Methods that create and add non-point objects to the Part

### Public methods that create and add non-point objects to the Part

While points are crucial in our `Part`, points alone aren't very useful.
These are the methods to add all those other things to a `Part`.

> ##### A word on New and Add methods
>
> You'll notice that (almost) all these methods start with **new**. 
>
> A method that starts with **new** indicates that this method will create a
> new object that will be added to the `Part` object. 
> 
> Methods that start with **add** on the other hand, expect a pre-made object as input 
> and will simply add that to the part.
>

### Methods for Path offset

These two methods are similar, and allow you to offset a path or pathstring.
You will typically use these for seam allowance.

### Various methods

These are methods that do a variety of other things that aren't covered 
in the other groups, but that are nonetheless important in pattern design.

### newPath

```php
void newPath(
    string $name
    string $pathString
    array $attributes
) 
```

Creates a [`Path`](path) object and adds it to the part.

`$pathstring` and `$attributes` will be used to create the [`Path`](path) object.

The `$name` is so we can reference the [`Path`](path) later (by its name).

**Example**
{:.no_toc}

{% include classTabs.html
    id="newPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newPath-result">

{% include coreClassdocsFigure.html
    description="Paths added to the pattern with newPath()"
    params="class=Part&method=newPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newPath-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the path by
- `string` `$pathstring`: The SVG pathstring describing the path
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object

### newText

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newText" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newText-result">

{% include coreClassdocsFigure.html
    description="Use CSS classes for regular text, and the 'line-height' attribute for multiline text"
    params="theme=Basic&class=Part&method=newText"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newText-code" markdown="1">

```php
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
relative to the anchor point, do only apply to the first line. 
As such, you should avoid using these in multiline text, and instead move 
your anchor point.

For a newline, you can either use a real newline like this:

```php
$text = 'This is
text';
```

Or use double quotes and `\n` for a newline, like this:

```php
$text = "This is\ntext";
```

#### Typical use
{:.no_toc}

Typically used to include text/instructions on the pattern.

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the [`Text`](text) by.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the [`Text`](text) on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$message`: The text to be rendered. 
- `array` `$attributes`: An array of attributes to be added to the [`Text`](text) object.

### newTextOnPath

```php
void newTextOnPath(
    string $name,
    string $pathstring,
    string $message,
    array $attributes = null
    bool $renderPath = TRUE
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

The optional `renderPath` parameter can supress the rendering of the path itself, 
so that only the text is shown. This allows you to add text to a pre-existing path
without drawing the path again.

**Example**
{:.no_toc}

{% include classTabs.html
    id="newTextOnPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newTextOnPath-result">

{% include coreClassdocsFigure.html
    description="Texts on paths"
    params="theme=Basic&class=Part&method=newTextOnPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newTextOnPath-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the [`Note`](note) by.
- `string` `$pathstring`: A SVG pathstring that describes the path to place the text on.
- `string` `$message`: The text to be rendered. 
- `array` `$attributes`: An array of attributes to be added to the [`TextOnPath`](textonpath) object.
- `bool` `$renderPath`: Set this to `FALSE` to supress the rendering of the path, and only display the text.

### newNote

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newNote" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newNote-result">

{% include coreClassdocsFigure.html
    description="Use direction, length, and offset to control the appearance of your note"
    params="theme=Basic&class=Part&method=newNote"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newNote-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the [`Note`](note) by.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the [`Note`](note) on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$message`: The text to be rendered. 
- `int` `$direction`: A number from 1 to 12 that determines the directin of the [`Note`](note).
- `int` `$length`: Length from the anchor point to the end of the arrow.  
- `int` `$offset`: Length from the anchor point to the start of the arrow.  
- `array` `$attributes`: An array of attributes to be added to the [`Text`](text) object within the [`Note`](note) object.

### newSnippet

```php
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

The snippets available in 
[the base theme](https://joost.freesewing.org/docs/core/classdocs/themes/core/theme) 
are:

 - buttonhole
 - button
 - button-lg
 - logo
 - logo-sm
 - logo-lg
 - scalebox
 - snap-male
 - snap-female

**Example**
{:.no_toc}

<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="nav-item active"><a class="nav-link active" href="#newSnippet-result" aria-controls="result" role="tab" data-toggle="tab">Result</a></li>
    <li role="presentation" class="nav-item"><a href="#newSnippet-code" class="nav-link" aria-controls="code" role="tab" data-toggle="tab">Code</a></li>
    <li role="presentation" class="nav-item"><a href="#newSnippet-defs" aria-controls="code" class="nav-link"  role="tab" data-toggle="tab">SVG Defs</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newSnippet-result">

{% include coreClassdocsFigure.html
    description="Adding SVG snippets to your pattern part with newSnippet()"
    params="theme=Basic&class=Part&method=newSnippet"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newSnippet-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the snippet by.
- `string` `$reference`: The ID of the snippet in the SVG defs section.
- `string` `$anchor`: The name of a [`Point`](point) to anchor the snippet on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `array` `$attributes`: An array of attributes to be added to the [`SvgSnippet`](svgsnippet) object.
- `string` `$description`: An optional description for the [`SvgSnippet`](svgsnippet) object.

### newInclude

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newInclude" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newInclude-result">

{% include coreClassdocsFigure.html
    description="You may need to open this in its own window to see the image embedded with newInclude()"
    params="theme=Basic&class=Part&method=newInclude"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newInclude-code" markdown="1">

```php
/** @var \Freesewing\Part $p */
$p->newInclude(1, '<image x="0" y="0" width="80" height="80" xlink:href="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" />');
```

</div>
</div>

#### Typical use
{:.no_toc}

Typically used by the [`Themes/paperless`](../themes/core/paperless) theme to add a grid to the pattern parts.

Also used by the sample service to add pre-rendered parts to the pattern.

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the include by.
- `string` `$content`: The SVG content to include

### newWidthDimension

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newWidthDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newWidthDimension-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newWidthDimension to add horizontal dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newWidthDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newWidthDimension-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$y`: The Y-value at which to place the [`Dimension`](dimension), or `false` to place it on the Y-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the horizontal distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newHeightDimension

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newHeightDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newHeightDimension-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newHeightDimension to add vertical dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newHeightDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newHeightDimension-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$x`: The X-value at which to place the [`Dimension`](dimension), or `false` to place it on the X-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the vertical distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newLinearDimension

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newLinearDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newLinearDimension-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newLinearDimension to add linear dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newLinearDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newLinearDimension-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it between `$from` and `$to`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newWidthDimensionSm

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newWidthDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newWidthDimensionSm-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newWidthDimensionSm to add small horizontal dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newWidthDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newWidthDimensionSm-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$y`: The Y-value at which to place the [`Dimension`](dimension), or `false` to place it on the Y-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the horizontal distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newHeightDimensionSm

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newHeightDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newHeightDimensionSm-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newHeightDimensionSm to add small vertical dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newHeightDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newHeightDimensionSm-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$x`: The X-value at which to place the [`Dimension`](dimension), or `false` to place it on the X-coordinate of `$from`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the vertical distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newLinearDimensionSm

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newLinearDimensionSm" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newLinearDimensionSm-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Use newLinearDimensionSm() to add small linear dimensions to your part"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newLinearDimensionSm"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newLinearDimensionSm-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the [`Dimension`](dimension).
- `string` `$to`: The name of the [`Point`](point) that is the end of the [`Dimension`](dimension).
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it between `$from` and `$to`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newCurvedDimension

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newCurvedDimension" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newCurvedDimension-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Despite it's name, newCurvedDimension() works on any pathstring, not just on curves"
    params="theme=Basic&class=Part&method=newCurvedDimension"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newCurvedDimension-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$pathstring`: The pathstring that describes a path for the [`Dimension`](dimension) to follow.
- `float` `$offset`: The offset at which to place the [`Dimension`](dimension), or `false` to place it on top of the path described by `$pathstring`.
- `string` `$text`: The text to be the label of the [`Dimension`](dimension), or false to use the distance between `$from` and `$to`.
- `array` `$pathAttributes`: An array of attributes to apply to the [`Path`](path) within the [`Dimension`](dimension).
- `array` `$labelAttributes`: An array of attributes to apply to the [`Text`](text) within the [`Dimension`](dimension).
- `array` `$leaderAttributes`: An array of attributes to apply to the [`Path`](path) objects that form the leaders of the [`Dimension`](dimension).

**Return value**
{:.no_toc}

Nothing, [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newGrainline

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newGrainline" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newGrainline-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Adding a grainline to your part is child's play with newGrainline()"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newGrainline"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newGrainline-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

**Return value**
{:.no_toc}

Nothing, a [`Dimension`](dimension) objects will be added to the [`Part`](part).

### newCutonfold

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newcutonfold" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newcutonfold-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Adding a cutonfold line to your part is child's play with newCutonfold()"
    params="theme=Designer&onlyPoints=1,2&class=Part&method=newCutonfold"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newcutonfold-code" markdown="1">

```php
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(2, 40, 80);

$p->newCutonfold(1,2,$this->t('Cut on fold',-20));
```

</div>
</div>

#### Typical use
{:.no_toc}

In patterns.

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

**Return value**
{:.no_toc}

Nothing, a [`Dimension`](dimension) objects will be added to the [`Part`](part).

### notch

```php
void notch( 
    array $points
)
```

Adds a `notch` [`SvgSnippet`](svgsnippet) to all points in array `$points`.

Note that `$points` does not contain [`Point`](point) objects, but names
of points added to the [`Part`](part).

Essentially, it's a fast way to add a bunch of notches to your [`Part`](part).

**Example**
{:.no_toc}

{% include classTabs.html
    id="notch" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="notch-result" markdown="1">

{% include coreClassdocsFigure.html
    description="Adding notches to a pattern part with notch()"
    params="theme=Designer&onlyPoints=1,2,3,4,5&class=Part&method=notch"
%}

</div>
<div role="tabpanel" class="tab-pane" id="notch-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$from`: The name of the [`Point`](point) that is the start of the grainline.
- `string` `$to`: The name of the [`Point`](point) that is the end of the grainline.
- `string` `$text`: The text to place on the grainline.

**Return value**
{:.no_toc}

Nothing, a [`SvgSnippet`](svgsnippet) object will be added to the [`Part`](part).

### addTitle

```php
void addTitle(
    string $anchor,
    string $nr,
    string $title,
    string $message = '',
    array $options = false
) 
```

Creates four new [`Text`](text) object and adds them to the part.

  - One for the pattern title
  - One for the part number
  - One for the part title
  - One for an optional message

All four are anchored on the same point, specified by `$anchor`;

`$options` is an optional parameter to change the way the text is rendered.
The possibilities are:

  - `scale` : Default is 100. Give a higher/lower number to scale up/down.
  - `align` : One of `left`, `right`, or `center` (the default)
  - `rotate` : Default is 0. Give a number to rotate the title by that many degrees

**Example**
{:.no_toc}

{% include classTabs.html
    id="addTitle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="addTitle-result">

{% include coreClassdocsFigure.html
    description="Overview of the different modes of addTitle()"
    params="theme=Basic&class=Part&method=addTitle"
%}

</div>
<div role="tabpanel" class="tab-pane" id="addTitle-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$anchor`: The name of a [`Point`](point) to anchor the title on. This must be a [`Point`](point) previously added to the [`Part`](part).
- `string` `$nr`: The part number.
- `string` `$title`: The part title.
- `string` `$message`: An optional message. 
- `string` `$mode`: One of `default`, `vertical`, `horizontal`, `small`, `vertical-small`, or `horizontal-small`. Defaults to `default`.

## Methods for Path offset

### offsetPath

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="offsetPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="offsetPath-result">

{% include coreClassdocsFigure.html
    description="Path offset"
    params="theme=Basic&class=Part&method=offsetPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="offsetPath-code" markdown="1">

```php
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
with the designer theme.

{% include coreClassdocsFigure.html
    description="Offsetting paths is... complicated"
    params="theme=Designer&class=Part&method=offsetPath"
%}

> ##### Naming conventions for offsetted points
>
> The points created for the path offset are named according to the following rules:
>
> - The **start point** of the offset path is called `[pathname]-startPoint` (`[pathname]` is the ID of the path in the Part's paths array).
> - The **end point** of the offset path is called `[pathname]-endPoint`.
> - Points that are the offset of the **start or endpoint of a line segment** in the original path are named `[pathname]-line-[startId]TO[endId]` and `[pathname]-line-[endId]TO[startId]` (`[endId]` and `[startId]` are the IDs of the start and end point of the line segment in the original path).
> - Points that are the offset of the **start or endpoint of a curve** in the original path are named `[pathname]-curve-[startId]TO[endId]` and  `[pathname]-curve-[endId]TO[startId]`
> - Points that are the offset of the **control points of a curve** in the original path are named `[pathname]-cp1--[startpoint].[control point 1].[control point 2].[endpoint]` and  `[pathname]-cp2--[startpoint].[control point 1].[control point 2].[endpoint]` (`[control point 1]` and `[control point 2]` are the IDs of the curve control points in the original path).
> - All **other points** (that are needed to keep the curve offset precise) are impossible to foresee and will change depending on the measurements. They are so-called *volatile* points because you can never trust those points to be there. They have names like `sa-cp1--.tmp_sa.splitcurve:.volatile24-8..tmp_sa.splitcurve:.volatile24-7..tmp_sa.splitcurve:.volatile24-6..tmp_sa.splitcurve:.volatile24-5`. 
>
> As a rule of thumb, if you see `volatile` in a point's name, you should not build further upon that point.
{:.comment}

> ##### Use the designer theme to inspect point names
>
> Any pattern you open in the designer theme will display the point data in 
> [the browser console](https://developer.mozilla.org/en-US/docs/Tools/Web_Console) when you hover over them.
>
> You can scroll back up and click the designer theme example of the path offset to see for yourself. 
{:.tip}


#### Typical use
{:.no_toc}

Used mostly to add seam-allowance to patterns.

**Parameters**
{:.no_toc}

- `string` `$offsetName`: The name for the new [`Path`](path) object that will be added to the [`Part`](part).
- `string` `$sourceName`: The name of [`Path`](path) object (previously added to the [`Part`](part) ) that we will offset.
- `float` `$distance`: Distance in mm by which to offset.
- `bool` `$render`: Whether to render this path, or not. Defaults to `false`. 
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object.

### offsetPathString

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="offsetPathString" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="offsetPathString-result">

{% include coreClassdocsFigure.html
    description="An example of offsetPathString()"
    params="theme=Basic&class=Part&method=offsetPathString"
%}

</div>
<div role="tabpanel" class="tab-pane" id="offsetPathString-code" markdown="1">

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: The name for the new [`Path`](path) object that will be added to the [`Part`](part).
- `string` `$pathstring`: The pathstring that we need to offset.
- `float` `$distance`: Distance in mm by which to offset.
- `bool` `$render`: Whether to render this path, or not. Defaults to `false`. 
- `array` `$attributes`: An array of attributes to be added to the [`Path`](path) object.

## Various methods

### isPoint

```php
bool isPoint( 
    string $name
)
```

Returns true of the ['Point'](point) is known in the ['Part'](part), or false if it's not.

> ##### This does not mean *Is it a point object*
> If you want to check whether something is a [`Point`](point) object, 
> you can use `$point instanceof \Freesewing\Point`
{:.tip}

#### Typical use
{:.no_toc}

In pattern logic to verify whether a certain point has been created.

**Parameters**
{:.no_toc}

- `string` `$name`: The name of the [`Point`](point) to check for.

**Return value**
{:.no_toc}

Returns `true` if the [`Point`](point) is known in the [`Part`](part) or `false` if it is not know.

### getTitle

```php
string getTitle() 
```

Returns the `title` property of the part.

**Example**
{:.no_toc}

{% include classTabs.html
    id="getTitle" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="getTitle-result">

This is the title

</div>
<div role="tabpanel" class="tab-pane" id="getTitle-code" markdown="1">

```php
/** @var \Freesewing\Part $p */
echo $p->getTitle();
```

</div>
</div>

#### Typical use
{:.no_toc}

Used in patterns to add the title to parts.

**Return value**
{:.no_toc}

A string containing the part title.

### setRender

```php
void setRender( 
    bool $bool 
)
```
Sets the `render` property to either `true` or `false` depending on the boolean value passed to it.

Parts that have their `render` property set to `false` won't be rendered by the [`SvgRenderbot`](svgrenderbot), 
which means they won't show up in your pattern.

> ##### This only suppresses output
> Note that parts are only excluded from being rendered into SVG. But the part is still
> fully processed.
{:.warning}

**Example**
{:.no_toc}

```php
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

**Parameters**
{:.no_toc}

This expects a boolean, either `true` or `false`.

### unit

```php
string unit(
    float $distance
) 
```

Takes a `$distance` in mm and returns it formatted according to the units of the part.

**Example**
{:.no_toc}

{% include classTabs.html
    id="unit" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="unit-result">

{% include coreClassdocsFigure.html
    description="An example of the unit method"
    params="theme=Basic&onlyPoints=1&class=Part&method=unit"
%}

</div>
<div role="tabpanel" class="tab-pane" id="unit-code" markdown="1">

```php
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

**Return value**
{:.no_toc}

A string formatted according to the units.

### newId

```php
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

**Example**
{:.no_toc}

{% include classTabs.html
    id="newId" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newId-result" markdown="1">

```php
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

```php
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

**Parameters**
{:.no_toc}

- `string` `$prefix`: A prefix to the apply to the unique ID

## Internal methods

### addTransform

```php
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

**Parameters**
{:.no_toc}

- `string` `$name`: A name to reference the [`Transform`](transform) by.
- `\Freesewing\Transform` `$transform`: The [`Transform`](transform) object.

### addBoundary

```php
void addBoundary(
    float $margin = 0.0
) 
```

Calculates a bounding box and adds it as a [`Boundary`](boundary) 
object to the `boundary` property of the part.

#### Typical use
{:.no_toc}

This is part of the layout work, handled automatically by the [`Patterns/pattern`](../patterns/core/pattern) class.

Normally, you **never** use this directly.

**Parameters**
{:.no_toc}

- `float` `$margin`: Defaults to zero, but takes a number (in mm) that will be added as margin

### setTitle

```php
void setTitle( 
    string $title 
)
```
Sets the `title` property to the `string` passed to it.

**Example**
{:.no_toc}

```php
/** @var \Freesewing\Part $p */
$p->setTitle('This is the title');
```

#### Typical use
{:.no_toc}

The [`Patterns/pattern::loadParts`](../patterns/core/pattern#loadparts) method sets the title automatically
for parts listed in the pattern configuration file.

**Parameters**
{:.no_toc}

This expects a string.

### setUnits

```php
void setUnits( 
    string $units 
)
```
Sets the `units` property to the `string` passed to it.

Units should be set to either `metric` or `imperial`. If they are not set,
they default to `metric`.

> ##### These are the output units
> The units in question are the units expected by the end user.
> In other words, it's the unitsOut as stored in the [`Context`](context).
{:.comment}

**Example**
{:.no_toc}

```php
/** @var \Freesewing\Part $p */
$p->setUnits('imperial');
```

#### Typical use
{:.no_toc}

Units are set automatically in the [`Patterns/pattern::loadParts`](../patterns/core/pattern#loadparts) method.

The reason units are stored in the [`Part`](part) method is to allow the [`Part::unit`](part#unit) 
to do its work.

**Parameters**
{:.no_toc}

A string, either `metric` or `imperial`.

### getRender

```php
bool getRender() 
```

Returns the `render` property of the part. Either `true` or `false`.

**Example**
{:.no_toc}

```php
/** @var \Freesewing\Part $p */
$p->getRender(); // TRUE by default
```

#### Typical use
{:.no_toc}

Used by [`SvgRenderbot`](svgrenderbot) to determine whether a  
[`Part`](part) needs to be rendered.

**Return value**
{:.no_toc}

A boolean, either `true` or `false`.

### hasPathToRender

```php
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

That's why the [`Themes/paperless`](../themes/core/paperless) theme calls this method before 
adding a grid to the part. Because adding a grid to a empty part would make it
visible.

**Return value**
{:.no_toc}

A boolean, either `true` or `false`.

## See also
{% include classFooter.html %}


* TOC - Always include these two lines at the bottom
{:toc}

---
layout: class
title: Path
namespace: Freesewing
tags: [internal, class, namespaceFreesewing]
permalink: /class/Path
---
<div class="col-xs-12 col-md-3 toc" markdown="1">
## Contents
{:.no_toc}
* TOC - Do not remove this line
{:toc}
</div>
<div class="col-xs-12 col-md-9" markdown="1">
## Description 

The [`Path`](Path) class holds data for SVG paths. It mostly contains getter and setter methods.

## Typical use

[`Path`](Path) is mostly internal. The only methods you will come accross 
are [`Path::setSample`](Path#setsample) and [`Path::setRender`](Path#setrender). 

Everything else is probably safe to ignore.

## Public methods

### setSample

```php?start_inline=1
void setSample(
    bool $bool = true
) 
```

Sets the sample flag on the [`Path`](Path) object.

If a [`Path`](Path) has its sample flag set to `true`, it will be rendered by the [`Services/SampleService`](Services/SampleService).

It does exactly the same thing as the `render` flag does for the [`Services/DraftService`](Services/DraftService),
but there is one important difference:

While paths are rendered by default, they are not sampled by default.
In other words, you need to call this method on every path you want to include 
in the sample service.

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(1, 50, 50);

$p->newPath(1, 'M 1 L 2');

// Include this path for sampling
$p->paths[1]->setSample(true);
```

#### Typical use
{:.no_toc}

Used in patterns to flag paths for the sample service.

#### Parameters
{:.no_toc}

This expects a boolean, so either `true` or `false`. If called without a parameter, it assumes `true`.

### setRender

```php?start_inline=1
void setRender(
    bool $bool
) 
```

Sets the render flag on the [`Path`](Path) object.

If a [`Path`](Path) has its render flag set to `true`, it will be rendered by the [`Services/DraftService`](Services/DraftService).

It does exactly the same thing as the `sample` flag does for the [`Services/SampleService`](Services/SampleService),
but there is one important difference:

While paths are not sampled by default, they are rendered by default.
In other words, you only need to call this method on paths you **do not** want rendered by the draft service.

#### Example
{:.no_toc}

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 0);
$p->newPoint(1, 50, 50);

$p->newPath(1, 'M 1 L 2');

// Exclude this path from the draft:
$p->paths[1]->setRender(false);
```

#### Typical use
{:.no_toc}

Used in patterns to suppress output for a [`Path`](Path).

#### Parameters
{:.no_toc}

This expects a boolean, so either `true` or `false`.

### setBoundary

```php?start_inline=1
void setBoundary(
    \Freesewing\Boundary $boundary
) 
```

Sets the `boundary` property to the [`Boundary`](Boundary) `$boundary`.

#### Typical use
{:.no_toc}

Called from [`Part::addBoundary`](Part#addboundary).

#### Parameters
{:.no_toc}

This expects a [`Boundary`](Boundary) object.

### setPathstring

```php?start_inline=1
void setPathstring(
    string $pathstring
) 
```

Sets the `pathstring` property to the string `$pathstring` after cleaning it up a bit.

Cleaning up means:

- Removing whitespace at start and end of the string
- Replacing consecutive spaces with a single space

#### Typical use
{:.no_toc}

Called from a bunch of methods in [`Part`](Part).

#### Parameters
{:.no_toc}

This expects a pathstring, which is &mdash; you guessed it &mdash; a `string`.

### setAttributes

```php?start_inline=1
void setAttributes(
    array $attributes
) 
```

Sets the `attributes` property to the array `$attributes`.

#### Typical use
{:.no_toc}

Called from a bunch of methods in [`Part`](Part).

#### Parameters
{:.no_toc}

This expects an array of name/value pair attributes.

### setAttribute

```php?start_inline=1
void setAttribute(
    string $name,
    string $value
) 
```

Sets the entry `$name` in the `attributes` array to value `$value`.

#### Typical use
{:.no_toc}

Only ever used by [`SvgRenderBot`](SvgRenderbot) to add an `id` attribute.

All other methods use [`Path::setAttributes`](Path#setattributes) instead.

#### Parameters
{:.no_toc}

- `string` $name: The name of the attribute in the `attributes` array.
- `string` $value: The value to set the attribute to.

### getSample

```php?start_inline=1
bool getSample()
```

Returns the `sample` flag on the [`Path`](Path) object. 

See [`Path::setSample`](Path#setsample) for info on the `sample` flag.

#### Typical use
{:.no_toc}

Used by [`Services/SampleService`](Services/SampleService) to determine whether a [`Path`](Path) needs to be sampled.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

### getRender

```php?start_inline=1
bool getRender()
```

Returns the `render` flag on the [`Path`](Path) object. 

See [`Path::setRender`](Path#setrender) for info on the `render` flag.

#### Typical use
{:.no_toc}

Used by [`SvgRenderbot`](SvgRenderbot) to determine whether a [`Path`](Path) needs to be rendered.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

### getBoundary

```php?start_inline=1
\Freesewing\Boundary getBoundary()
```

Returns the `boundary` property. 

#### Typical use
{:.no_toc}

This is unused.

#### Return value
{:.no_toc}

A [`Boundary`](Boundary) object, if set.

### getPathstring

```php?start_inline=1
string getPathstring()
```

Returns the `pathstring` property. 

#### Typical use
{:.no_toc}

Typically called by [`SvgRenderbot`](SvgRenderbot) and some path-related functions 
in the [`Part`](Part) class.

#### Return value
{:.no_toc}

A `string`.

### getAttributes

```php?start_inline=1
string getAttributes()
```

Returns the `attributes` property. 

#### Typical use
{:.no_toc}

Called by [`SvgRenderbot`](SvgRenderbot) to get the path attributes.

#### Return value
{:.no_toc}

An `array` of name/value attribute pairs.

### getAttribute

```php?start_inline=1
string getAttribute(
    string $name
)
```

Returns the value stored under `$name` in the `array` that is the `attributes` property. 

#### Typical use
{:.no_toc}

Called by [`SvgRenderbot`](SvgRenderbot) to check for specific attributes
that need special treatment. Specifically `id` and `line-height`.

#### Return value
{:.no_toc}

The attribute value, typically a `string`.

### findBoundary

```php?start_inline=1
\Freesewing\Boundary findBoundary(
    \Freesewing\Part $part
)
```

Finds/Calculates a bounding box for the [`Path`](Path) and returns it as a
[`Boundary`](Boundary) object.

#### Typical use
{:.no_toc}

Called from [`Part::addBoundary`](Part#addboundary) 
and [`Sampler::sampleParts`](Sampler#sampleparts).

#### Parameters
{:.no_toc}

This expects the [`Part`](Part) object the [`Path`](Path) belongs to.

#### Return value
{:.no_toc}

A [`Boundary`](Boundary) object.

### isClosed

```php?start_inline=1
bool isClosed()
```

Returns `true` if a [`Path`](Path) is closed, and `false` if it is not.

> **This check is rather trivial**
>
> Note that this only checks whether or not the pathstring ends with 
> a close command (z or Z). 
>
> If your pathstring consists of multiple draw operations strung
> together with move operations, this method will not be accurate.

#### Typical use
{:.no_toc}

Used only in the path offset code in the [`Part`](Part) class.

#### Parameters
{:.no_toc}

This expects the [`Part`](Part) object the [`Path`](Path) belongs to.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

### breakUp

```php?start_inline=1
array breakUp()
```

Breaks up a pathstring into its atomic operations.

#### Typical use
{:.no_toc}

Used only in the path offset code in the [`Part`](Part) class.

#### Return value
{:.no_toc}

An `array` of pathstrings.

### getStartPoint

```php?start_inline=1
string getStartPoint()
```

Returns the name of the startpoint of the pathstring.

#### Typical use
{:.no_toc}

Used the path offset and dimension code in the [`Part`](Part) class.

#### Return value
{:.no_toc}

The name of the startpoint of the [`Path`](Path), which is a `string`.

### getEndPoint

```php?start_inline=1
string getEndPoint()
```

Returns the name of the endpoint of the pathstring.

#### Typical use
{:.no_toc}

Used the path offset and dimension code in the [`Part`](Part) class.

#### Return value
{:.no_toc}

The name of the endpoint of the [`Path`](Path), which is a `string`.

## See also
{% include classFooter.html %}
</div>


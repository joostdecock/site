---
layout: class
title: Sampler
namespace: Freesewing
tags: [class]
permalink: /class/Sampler
---
## Description 

The [`Sampler`](Sampler) class provides functionality that is shared between the
[`OptionsSampler`](OptionsSampler) and [`MeasurementsSampler`](MeasurementsSampler)
classes.

## Typical use

Sampling is the process of iterating over a number of variations of a pattern
and placing those on top of each other for comparison.

Freesewing can sample either measurements (with [`MeasurementsSampler`](MeasurementsSampler))
or options (see [`OptionsSampler`](OptionsSampler)).

## Public methods

### setPattern

```php?start_inline=1
void setPattern( 
    \Freesewing\Pattern $pattern 
)
```
Stores the [`Pattern`](Pattern) object in the `pattern` property.

#### Typical use
{:.no_toc}

Used by the [`Services/SampleService`](Services/SampleService) and 
[`Services/CompareService`](Services/CompareService).

#### Parameters
{:.no_toc}

This expects a child class of [`Pattern`](Pattern).

### loadPatternOptions

```php?start_inline=1
array loadPatternOptions()
```
Returns an array of options as defined in the pattern configuration.

Options of type `percent` will be divided by 100, so that 50 becomes 0.5.

#### Typical use
{:.no_toc}

Used by the [`Services/SampleService`](Services/SampleService) to add options
to patterns it instantiates.

#### Return value
{:.no_toc}

An `array` of pattern options.

## Protected methods

### sampleParts

```php?start_inline=1
void bezierLength( 
    int $steps, 
    int $step, 
    Freesewing\Pattern $pattern, 
    Freesewing\Theme $theme, 
    Freesewing\SvgRenderbot $svgRenderbot, 
    string $mode = 'sample' 
)
```

Does the actual sampling of pattern parts for a given pattern+options/model configuration.

This will populate the `partContainer` property (and array) with pre-rendered parts.

Later, [`Sampler::addSampledPartsToPattern`](Sampler#addsampledpartstopattern) will
bring those pre-rendered parts together in 1 pattern.

#### Typical use
{:.no_toc}

Protected function, so only available in [`OptionsSampler`](OptionsSampler) and
[`MeasurementsSampler`](MeasurementsSampler).

#### Parameters
{:.no_toc}

- `int` `$step` : Which sampling step (out of a total `$steps`) is this?
- `int` `$steps` : Number of sampling steps in total
- [`Patterns/Pattern`](Patterns/Pattern) `$pattern` : A [`Patterns/Pattern`](Patterns/Pattern) object
- [`Themes/Theme`](Themes/Theme) `$theme` : A [`Themes/Theme`](Themes/Theme) object
- [`SvgRenderbot`] `$svgRenderbot` : An [`SvgRenderbot`] object
- `string` `$mode` : Mode, either `sample` or `compare`. Defaults to `sample`

### addSampledPartsToPattern

```php?start_inline=1
void addSampledPartsToPattern() 
```

Adds all the parts stored in the `partContainer` property to the pattern in the
`pattern` property.

#### Typical use
{:.no_toc}

Protected function, so only available in [`OptionsSampler`](OptionsSampler) and
[`MeasurementsSampler`](MeasurementsSampler).

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

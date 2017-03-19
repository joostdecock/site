---
layout: class
title: Sampler
namespace: Freesewing
tags: [class]
permalink: /class/sampler
---
## Description 

The [`Sampler`](sampler) class provides functionality that is shared between the
[`OptionsSampler`](optionssampler) and [`MeasurementsSampler`](measurementssampler)
classes.

## Typical use

Sampling is the process of iterating over a number of variations of a pattern
and placing those on top of each other for comparison.

Freesewing can sample either measurements (with [`MeasurementsSampler`](measurementssampler))
or options (see [`OptionsSampler`](optionssampler)).

## Public methods

### setPattern

```php?start_inline=1
void setPattern( 
    \Freesewing\Pattern $pattern 
)
```
Stores the [`Pattern`](/class/patterns/core/pattern) object in the `pattern` property.

#### Typical use
{:.no_toc}

Used by the [`Services/sampleservice`](services/sampleservice) and 
[`Services/compareservice`](services/compareservice).

#### Parameters
{:.no_toc}

This expects a child class of [`Pattern`](/class/patterns/core/pattern).

### loadPatternOptions

```php?start_inline=1
array loadPatternOptions()
```
Returns an array of options as defined in the pattern configuration.

Options of type `percent` will be divided by 100, so that 50 becomes 0.5.

#### Typical use
{:.no_toc}

Used by the [`Services/sampleservice`](services/sampleservice) to add options
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

Later, [`Sampler::addSampledPartsToPattern`](sampler#addsampledpartstopattern) will
bring those pre-rendered parts together in 1 pattern.

#### Typical use
{:.no_toc}

Protected function, so only available in [`OptionsSampler`](optionssampler) and
[`MeasurementsSampler`](measurementssampler).

#### Parameters
{:.no_toc}

- `int` `$step` : Which sampling step (out of a total `$steps`) is this?
- `int` `$steps` : Number of sampling steps in total
- [`Patterns/pattern`](/class/patterns/core/pattern) `$pattern` : A [`Patterns/pattern`](/class/patterns/core/pattern) object
- [`Themes/theme`](themes/core/theme) `$theme` : A [`Themes/theme`](themes/core/theme) object
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

Protected function, so only available in [`OptionsSampler`](optionssampler) and
[`MeasurementsSampler`](measurementssampler).

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

---
layout: page
title: OptionsSampler
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/optionssampler
---
## Description 

The [`OptionsSampler`](optionssampler) class samples a pattern 
for a given option. It extends the [`Sampler`](sampler) class.

It takes an option with a range value, like a _measure_ or _percent_ option
and iterates over it in a number of steps between its minimum and maximum
value. 

For each step, it generates the pattern parts for them, aligning them properly.

This allows you to verify that your pattern copes nicely within the range of 
an option. 

{% include coreClassdocsFigure.html
    description="A pattern sampled with the OptionsSampler to show variations on an option"
    params="service=sample&pattern=AaronAshirt&mode=options&option=backlineBend"
%}

## Typical use

Called from [`Services\SampleService::run`](../services/sampleservice#run). 

## Public methods

### loadModelMeasurements

```php?start_inline=1
array loadModelMeasurements()
```

When sampling options, the default model as defined in the pattern's
configuration file are used.

This method loads these default measurements from pattern's
configuration file.

#### Return value
{:.no_toc}

An array of name-value measurement pairs.

### sampleOptions

```php?start_inline=1
array sampleMeasurements(
    \Freesewing\Model $model
    \Freesewing\Theme $theme
    string $option
    int $steps = 11
)
```

This iterates over the [`Model`](model) objects in the `models` property.

For the number of steps in `$steps`, this will clone the [`Pattern`](../patterns/core/pattern) `$pattern`
and sample it with a variation of the option `$option` that ranges from its minimum
to its maximum.

It will combine the parts of all those clones patterns into one [`Pattern`](../patterns/core/pattern)
object and return it. 

#### Parameters
{:.no_toc}

- [`Model`](model) `$model` : The model object, from the default measurement in the pattern config
- [`Theme`](../themes/core/theme) `$theme` : The theme object, which themes the parts generated for each step
- string `$option` : The name of the option to sample
- int `$steps` : The number of sampling steps, defaults to 11

#### Return value
{:.no_toc}

Returns a (grand)child of [`Patterns\Pattern`](../patterns/core/pattern)

## See also

The [`MeasurementsSampler`](measurementssampler) and [`Sampler`](sampler) classes.

The [`Services/sampleservice`](../services/sampleservice) service.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

---
layout: class
title: OptionsSampler
namespace: Freesewing
tags: [class, extendsSampler]
permalink: /class/OptionsSampler
---
## Description 

The [`OptionsSampler`](OptionsSampler) class samples a pattern 
for a given option. It extends the [`Sampler`](Sampler) class.

It takes an option with a range value, like a _measure_ or _percent_ option
and iterates over it in a number of steps between its minimum and maximum
value. 

For each step, it generates the pattern parts for them, aligning them properly.

This allows you to verify that your pattern copes nicely within the range of 
an option. 

{% include figure.html 
    description="A pattern sampled with the OptionsSampler to show variations on an option"
    url="https://api.freesewing.org/?service=sample&pattern=AaronAshirt&mode=options&option=backlineBend"
%}

## Typical use

Called from [`Services\SampleService::run`](Services/SampleService#run). 

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

This iterates over the [`Model`](Model) objects in the `models` property.

For the number of steps in `$steps`, this will clone the [`Pattern`](Pattern) `$pattern`
and sample it with a variation of the option `$option` that ranges from its minimum
to its maximum.

It will combine the parts of all those clones patterns into one [`Pattern`](Pattern)
object and return it. 

#### Parameters
{:.no_toc}

- [`Model`](Model) `$model` : The model object, from the default measurement in the pattern config
- [`Theme`](Theme) `$theme` : The theme object, which themes the parts generated for each step
- string `$option` : The name of the option to sample
- int `$steps` : The number of sampling steps, defaults to 11

#### Return value
{:.no_toc}

Returns a (grand)child of [`Patterns\Pattern`](Patterns/Pattern)

## See also

The [`MeasurementsSampler`](MeasurementsSampler) and [`Sampler`](Sampler) classes.

The [`Services/SampleService`](Services/SampleService) service.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

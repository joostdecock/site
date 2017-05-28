---
layout: page
title: MeasurementsSampler
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/measurementssampler
---
## Description 

The [`MeasurementsSampler`](measurementssampler) class samples a pattern 
for a group of models. It extends the [`Sampler`](sampler) class.

It takes a group of models (with different measurements) and generates
the pattern parts for them, aligning them properly.

This allows you to verify that your pattern grades nicely over a range of
sizes/measurements. 

{% include figure.html 
    description="A pattern sampled with the MeasurementsSampler"
    url="https://api.freesewing.org/?service=sample&pattern=AaronAshirt&mode=measurements&samplerGroup=maleStandardUsSizes"
%}

## Typical use

Called from [`Services\SampleService::run`](services/sampleservice#run) 
and [`Services\CompareService::run`](services/compareservice#run).

## Public methods

### setModelConfig

```php?start_inline=1
void setModelConfig( 
    array $config 
)
```

Assigns an array of model sampler configuration passed to it 
to the `modelConfig` property.

#### Parameters
{:.no_toc}
This expects a configuration array, obtained from
[`Patterns\Pattern::getSamplerModelConfig`](patterns/core/pattern#getsamplermodelconfig).

### loadPatternModels

```php?start_inline=1
array loadPatternModels(
    string $group
)
```

This loads a model group from the sampler configuration
but not before verifying whether the requested group is present in the `modelConfig` property.

If it is not, it gets the default group name from the pattern configuration and loads that.

#### Parameters
{:.no_toc}

A string. If it's a group name in the `modelConfig` array, it will load that group.
If not, it will load the pattern's default group.

### addPatternModel

```php?start_inline=1
array addPatternModel(
    array $measurements,
    string $name = 'userSize'
)
```

This instantiates a new [`Model`](model) object and addes the measurements in
the `$measurements` array to it.

Then, it adds the new [`Model`](model) to the `models` property, which is an array
holding [`Model`](model) objects. `$name` will be the key in that array.

This is only used by the  
[`Services\CompareService`](services/compareservice) who not only needs to
load models from the sampler configuration, but also needs to add an extra model
with the user's measurements.

This method allows that.

#### Parameters
{:.no_toc}

`$measurements` is an array with measurements, strcutured like this:
```php?start_inline=1
[
    chestCircumference => 110,
    neckCircumference => 44,
]
```

`$name` is an optional string that defaults to `userSize`, but the 
[`Services\CompareService`](services/compareservice) sets this to `compareModel`
which is relevant in [`MeasurementsSampler::sampleMeasurements`](measurementssampler#samplemeasurements)

### sampleMeasurements

```php?start_inline=1
array sampleMeasurements(
    \Freesewing\Theme $theme
)
```

This iterates over the [`Model`](model) objects in the `models` property.

For each [`Model`](model) this clones the pattern and calls 
[`Patterns\Pattern::sample`](patterns/core/pattern#sample) with the [`Model`](model)
as parameter.

It then itterates over the parts and calls 
[`Sampler::sampleParts()`](sampler#sampleparts) on them. 

#### Parameters
{:.no_toc}

Expects a child of [`Themes\Theme`](themes/core/theme). We need this because the theme
is needed to style the sampled parts.

#### Return value
{:.no_toc}

Returns a (grand)child of [`Patterns\Pattern`](patterns/core/pattern)

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

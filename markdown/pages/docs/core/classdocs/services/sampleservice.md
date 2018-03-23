---
layout: page
title: SampleService
namespace: Freesewing\Services
tags: [class docs]
permalink: /docs/core/classdocs/services/sampleservice
---
## Description 

The [`SampleService`](sampleservice) extends the [`DraftService`](draftservice)
and samples either **measurements** or **options**.

Sampling means to draft a number of pattern variations with either different measurements,
or different values for a given option.

Those variations are placed on top of each other, so that you can see the effect of
changing measurement or options values.

## Example

{% include coreClassdocsFigure.html
    description="An example of an option sampled by the sample service"
    params="service=sample&pattern=AaronAshirt&mode=options&option=backlineBend"
%}


## Typical use

The main use of the [`SampleService`](sampleservice) is to allow pattern designers to check
the automated pattern grading, and to verify that options are within sensible bounds.

But, it's also useful to demonstrate the effect of an option on a pattern to your users.

## Public methods

### getServiceName

```php?start_inline=1
string getServiceName() 
```
Returns the name of the service, which is a `string`. More precisely, this returns `sample`.

### run

```php?start_inline=1
void run(
    \Freesewing\Context $context
) 
```
The `run` method samples the pattern for measurements of the chosen modelgroup,
and adds the users' measurements as an extra model.  It then sets the response and sends it.

Essentially, it takes care of the entire remainder of the request.

While doing so, it takes care of a number of things:

- It asks the [`Channel`]../channels/core/channel) wether this is a valid [`Request`](../src/request)
- It asks the [`Channel`]../channels/core/channel) to standardize the [`Model`](../src/model) measurements and options
- It adds units, a translator, [`Pattern`](../patterns/core/pattern), [`Model`](../src/model), 
[`SvgDocument`](../src/svgdocument), [`SvgRenderbot`](../src/svgrenderbot), and a [`MeasurementsSampler`](../src/measurementssampler) or [`OptionsSampler`](../src/optionssampler) to the [`Context`](../src/context)
- It calls [`MeasurementsSamplerPattern::sampleMeasurements`](../src/measurementssampler#samplemeasurements) or [`OptionsSampler::sampleOptions`](../src/optionssampler#sampleoptions)
- It calls [`Response::send`](../src/response#send)
- It calls [`Context::cleanUp`](../src/context#cleanup)

#### Typical use
{:.no_toc}

Always called from [`Context::runService`](../src/context#runservice).

#### Parameters
{:.no_toc}

- [`Context`](../src/context) `$context` : The [`Context`](../src/context) object


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

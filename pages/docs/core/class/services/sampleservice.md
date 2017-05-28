---
layout: class
title: SampleService
namespace: Freesewing\Services
tags: [class documentation]
permalink: /class/services/sampleservice
---
## Description 

The [`SampleService`](sampleservice) extends the [`DraftService`](draftservice)
and samples either **measurements** or **options**.

Sampling means to draft a number of pattern variations with either different measurements,
or different values for a given option.

Those variations are placed on top of each other, so that you can see the effect of
changing measurement or options values.

## Example

{% include figure.html 
    description="An example of an option sampled by the sample service"
    url="https://api.freesewing.org/?service=sample&pattern=AaronAshirt&mode=options&option=backlineBend"
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

- It asks the [`Channel`](/class/channels/core/channel) wether this is a valid [`Request`](../request)
- It asks the [`Channel`](/class/channels/core/channel) to standardize the [`Model`](../model) measurements and options
- It adds units, a translator, [`Pattern`](../patterns/core/pattern), [`Model`](../model), 
[`SvgDocument`](../svgdocument), [`SvgRenderbot`](../svgrenderbot), and a [`MeasurementsSampler`](../measurementssampler) or [`OptionsSampler`](../optionssampler) to the [`Context`](../context)
- It calls [`MeasurementsSamplerPattern::sampleMeasurements`](../measurementssampler#samplemeasurements) or [`OptionsSampler::sampleOptions`](../optionssampler#sampleoptions)
- It calls [`Response::send`](../response#send)
- It calls [`Context::cleanUp`](../context#cleanup)

#### Typical use
{:.no_toc}

Always called from [`Context::runService`](../context#runservice).

#### Parameters
{:.no_toc}

- [`Context`](../context) `$context` : The [`Context`](../context) object


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

---
layout: class
title: SampleService
namespace: Freesewing\Services
tags: [class, extendsService, service]
permalink: /class/Services/SampleService
---
## Description 

The [`SampleService`](SampleService) extends the [`DraftService`](DraftService)
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

The main use of the [`SampleService`](SampleService) is to allow pattern designers to check
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

- It asks the [`Channel`](../Channels/Channel) wether this is a valid [`Request`](../Request)
- It asks the [`Channel`](../Channels/Channel) to standardize the [`Model`](../Model) measurements and options
- It adds units, a translator, [`Pattern`](../Patterns/Pattern), [`Model`](../Model), 
[`SvgDocument`](../SvgDocument), [`SvgRenderbot`](../SvgRenderbot), and a [`MeasurementsSampler`](../MeasurementsSampler) or [`OptionsSampler`](../OptionsSampler) to the [`Context`](../Context)
- It calls [`MeasurementsSamplerPattern::sampleMeasurements`](../MeasurementsSampler#samplemeasurements) or [`OptionsSampler::sampleOptions`](../OptionsSampler#sampleoptions)
- It calls [`Response::send`](../Response#send)
- It calls [`Context::cleanUp`](../Context#cleanup)

#### Typical use
{:.no_toc}

Always called from [`Context::runService`](../Context#runservice).

#### Parameters
{:.no_toc}

- [`Context`](../Context) `$context` : The [`Context`](../Context) object


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

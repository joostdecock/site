---
layout: class
title: DraftService
namespace: Freesewing\Services
tags: [class, extendsService, service]
permalink: /class/Services/DraftService
---
## Description 

The [`DraftService`](DraftService) class handles the draft service, 
which generates pattern drafts. 
It is the core business of Freesewing.

## Example

{% include figure.html 
    description="An example of the draft service"
    url="https://api.freesewing.org/?service=draft&pattern=AaronAshirt"
%}


## Typical use

The [`DraftService`](DraftService) is used to draft patterns. It's probably what
you think of when you think about Freesewing. 

## Constants

### SCALE

By default, SVG displays 90 dots per inch. 
Internally, Freesewing works with millimeters.
To align these two, the value of `SCALE` is : 90dpi/25.4 = `3.54330709`.

If we do nothing, 1mm holds 3.54330709 SVG units. 
So we wrap your entire pattern draft in an SVG transform that
scales everything up by 3.54330709, so that now 1mm holds 1 SVG unit.

## Public methods

### getServiceName

```php?start_inline=1
string getServiceName() 
```
Returns the name of the service, which is a `string`. More precisely, this returns `draft`.

### run

```php?start_inline=1
void run(
    \Freesewing\Context $context
) 
```
The `run` method drafts a pattern, sets the response and sends it.
Essentially, it takes care of the entire remainder of the request.

While doing so, it takes care of a number of things:

- It asks the [`Channel`](../Channels/Channel) wether this is a valid [`Request`](../Request)
- It asks the [`Channel`](../Channels/Channel) to standardize the [`Model`](../Model) measurements and options
- It adds units, a translator, [`Pattern`](../Patterns/Pattern), [`Model`](../Model), 
[`SvgDocument`](../SvgDocument), and [`SvgRenderbot`](../SvgRenderbot) to the [`Context`](../Context)
- It calls [`Pattern::draft`](../Patterns/Pattern#draft)
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

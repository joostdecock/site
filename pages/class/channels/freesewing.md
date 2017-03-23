---
layout: class
title: Freesewing
namespace: Freesewing\Channels\Core
tags: [class documentation]
permalink: /class/channels/core/freesewing
---
## Description 

The [`Freesewing`](freesewing) channel is the standard channel,
used for the freesewing documentation and demo.

## Public methods

### isValidRequest

```php?start_inline=1
bool isValidRequest(
    \Freesewing\Context $context
)
```

This allows the channel owner to implement access control. 

Do you want to serve this request? Return `true` if so, or `false` if not.
You have the entire [`Context`](/class/context) object to make up your mind.

In this case, the only thing we check for is whether the requested pattern exists.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

### standardizeModelMeasurements

```php?start_inline=1
array standardizeModelMeasurements(
    \Freesewing\Request $request,
    \Freesewing\Pattern $pattern
)
```

This allows the channel to turn user input into model measurements that we understand.

We hande conversion here, if the input is imperial, we turn it into metric, as internally
Freesewing runs on metric.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

#### Parameters
{:.no_toc}

- [`Request`](/class/request) : The [`Request`](/class/request) object that holds all user input
- [`Pattern`](/class/patterns/core/pattern) : The [`Pattern`](/class/patterns/core/pattern) object that holds info on what measurements the pattern expects

#### Return value
{:.no_toc}

An `array` of name/value pairs of measurements.

### standardizePatternOptions

```php?start_inline=1
array standardizePatternOptions(
    \Freesewing\Request $request,
    \Freesewing\Pattern $pattern
)
```

This allows the channel to turn user input into pattern options that we understand.

We hande conversion here, if the input is imperial, we turn it into metric, as internally
This is an abstract function to be implemented by each channel.

For percentage options, we also turn them into a value between 0 and 1. Like, 75% becomes 0.75.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

#### Parameters
{:.no_toc}

- [`Request`](/class/request) : The [`Request`](/class/request) object that holds all user input
- [`Pattern`](/class/patterns/core/pattern) : The [`Pattern`](/class/patterns/core/pattern) object that holds info on what options the pattern supports

#### Return value
{:.no_toc}

An `array` of name/value pairs of pattern options.



## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

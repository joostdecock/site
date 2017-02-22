---
layout: class
title: Channel
namespace: Freesewing\Channels
tags: [class, abstractClass, channel]
permalink: /class/channels/channel
---
## Description 

The [`Channel`](channel) class is an abstract class to be extended by channels.

It defines three abstract public methods that must be implemented by all classes
extending it. They are:

- [`Channel::isValidRequest`](channel#isvalidrequest) 
- [`Channel::standardizeModelMeasurements`](channel#standardizemodelmeasurements) 
- [`Channel::standardizepatternoptions`](channel#standardizepatternoptions) 

## Public methods

### __construct (the constructor)

```php?start_inline=1
string getServiceName() 
```
If a channel configuration file is present, this will load it into the `config` property.

Note that by default, channels have no config file, but this is here for extensibility.
If you want a channel config file, simply place a `config.yml` file in your channel directory.

#### Return value
{:.no_toc}

This is a constructor, so it returns a [`Channel`](channel) object.

### isValidRequest

```php?start_inline=1
bool isValidRequest(
    \Freesewing\Context $context
)
```

This allows the channel owner to implement access control. 

Do you want to serve this request? Return `true` if so, or `false` if not.
You have the entire [`Context`](../context) object to make up your mind.

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

This is an abstract function to be implemented by each channel.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

#### Parameters
{:.no_toc}

- [`Request`](../request) : The [`Request`](../request) object that holds all user input
- [`Pattern`](../patterns/pattern) : The [`Pattern`](../patterns/pattern) object that holds info on what measurements the pattern expects

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

This is an abstract function to be implemented by each channel.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

#### Parameters
{:.no_toc}

- [`Request`](../request) : The [`Request`](../request) object that holds all user input
- [`Pattern`](../patterns/pattern) : The [`Pattern`](../patterns/pattern) object that holds info on what options the pattern supports

#### Return value
{:.no_toc}

An `array` of name/value pairs of pattern options.


### handleInvalidRequest

```php?start_inline=1
void handleInvalidRequest(
    \Freesewing\Context $context
) 
```
This method will get called if [`Channel::isValidRequest`](channel#isvalidrequest) returns `false`.

This method determines what to do when a request is considered to be invalid.

If you return false in [`Channel::isValidRequest`](channel#isvalidrequest)
then we need to do something with the ongoing request. 
Since the channel decided it's no good, it gets to decide what to do next.

Note that after this method, all we do is call [`Response::send`](../response#send)
and [`Channel::cleanUp`](channel#cleanup).

In other words, you should either set the [`Response`](../response) object
in the [`Context`](../context), or take over the request and redirect it for example.

If you do the latter, it's recommended to call [`Channel::cleanUp`](channel#cleanup) before the redirect.

By default, we call [`Channel::cleanUp`](channel#cleanup) and then redirect to the Freesewing documentation.

#### Typical use
{:.no_toc}

Always called from the `run()` method of one of the services.

#### Parameters
{:.no_toc}

- [`Context`](../context) `$context` : The Freesewing context

### cleanUp

```php?start_inline=1
void cleanUp()
```

This method will get called just before the request is terminated.

By default it does nothing.

#### Typical use
{:.no_toc}

By default, this does nothing, as there's nothing to clean up. 

But if your channel is logging to a database (for example), you could close that
database connection here.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

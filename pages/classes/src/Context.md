---
layout: class
title: Context
namespace: Freesewing
tags: [class, core]
permalink: /class/Context
---
## Description 

The [`Context`](Context) class holds all information throughout an 
entire request lifecycle. It is perhaps the most important class in this project.

## Typical use

Every freesewing request is handled by this code in `index.php`:

```php?start_inline=1
$context = new \Freesewing\Context();
$context->setRequest(new \Freesewing\Request($_REQUEST));
$context->configure();

$context->runService();
```

## Public methods

### getApiDir

```php?start_inline=1
string getApiDir()
```

Returns the directory in which freesewing was installed.

#### Typical use
{:.no_toc}

Used by the [`InfoService`](InfoService) to discover available patterns, themes, and channels.

FIXME: Moved to Utils

### getChannel

```php?start_inline=1
\Freesewing\Channel getChannel() 
```
Returns the [`Channel`](Channel) stored in the `channel` property, if any.

### getConfig

```php?start_inline=1
array getConfig() 
```
Returns the configuration array stored in the `config` property.

### getConfigFile

```php?start_inline=1
string getConfigFile() 
```
Returns the full filepath of the freesewing configuration file.

### getLocale

```php?start_inline=1
string getLocale() 
```
Returns the locale, which is a 2-letter string like `en` or `nl`.

### getMeasurementsSampler

```php?start_inline=1
\Freesewing\MeasurementsSampler getMeasurementsSampler() 
```
Returns the [`MeasurementsSampler`](MeasurementsSampler) object in the `measurementsSampler` property, if any.

### getModel

```php?start_inline=1
\Freesewing\Model getModel() 
```
Returns the [`Model`](Model) object in the `model` property, if any.

### getOptionsSampler

```php?start_inline=1
\Freesewing\OptionsSampler getOptionsSampler() 
```
Returns the [`OptionsSampler`](OptionsSampler) object in the `optionsSampler` property, if any.

### getPattern

```php?start_inline=1
\Freesewing\Pattern getPattern() 
```
Returns the [`Pattern`](Pattern) object in the `pattern` property, if any.

> Given that [`Pattern`](Pattern) is an abstract class, the actual object
> will be a (grand)child of the [`Pattern`](Pattern) class.

### getRenderbot

```php?start_inline=1
\Freesewing\SvgRenderbot getRenderbot() 
```
Returns the [`SvgRenderbot`](SvgRenderbot) object in the `renderbot` property, if any.

### getRequest

```php?start_inline=1
\Freesewing\Request getRequest() 
```
Returns the [`Request`](Request) object in the `request` property, if any.

### getResponse

```php?start_inline=1
\Freesewing\Response getResponse() 
```
Returns the [`Response`](Response) object in the `response` property, if any.

### getService

```php?start_inline=1
\Freesewing\Services\AbstractService getService() 
```
Returns the [`Services\AbstractService`](Services/AbstractService) object in the `service` property, if any.

> Given that [`Services\AbstractService`](Services/AbstractService) is an 
> abstract class, the actual object  will be a child of the 
> [`Services\AbstractService`](Services/AbstractService) class.

### getSvgDocument

```php?start_inline=1
\Freesewing\SvgDocument getSvgDocument() 
```
Returns the [`SvgDocument`](SvgDocument) object in the `svgDocument` property, if any.

### getTheme

```php?start_inline=1
\Freesewing\Themes\Theme getTheme() 
```
Returns the [`Themes\Theme`](Themes/Theme) object in the `theme` property, if any.

> Given that [`Themes\Theme`](Themes/Theme) is an abstract class
> the actual object  will be a child of the 
> [`Themes\Theme`](Themes/Theme) class.

### getTranslator

```php?start_inline=1
Symfony\Component\Translation\Translator getTranslator() 
```
Returns the `Translator` object in the `translator` property, if any.

> Translation is handled by [Symfony](http://symfony.com/)
> and documented [on their website](http://symfony.com/doc/current/translation.html).

### getUnits

```php?start_inline=1
array getUnits() 
```
Returns the array of units stored in the `units` property, if any.

The units array is structured as such:

```php?start_inline=1
[
    'in' => 'metric',
    'out' => 'imperial',
]
```

Units can be either `metric` or `imperial` and are divided into 
`in` units for user input (measurements and options) and `out`
metrics for output (things printed on the pattern).

{% include units.html %}

### setChannel

```php?start_inline=1
void setChannel(\Freesewing\Channels\Channel) 
```

Expects a [`Channels\Channel`](Channels/Channel) object and stores it 
in the `channel` property.

> Given that [`Channels\Channel`](Channels/Channel) is an
> abstract class, the actual object will be a child of the 
> [`Channels\Channel`](Channels/Channel) class.

#### Typical use
{:.no_toc}

Called only from the [`Context::configure`](Context#configure) method.

#### Parameters
{:.no_toc}

Expects a child of [`Channels\Channel`](Channels/Channel).

### setConfig

```php?start_inline=1
void setConfig(array) 
```

Expects an array and stores it in the `config` property.

#### Typical use
{:.no_toc}

Called only from the [`Context::configure`](Context#configure) method.

#### Parameters
{:.no_toc}

Expects an array.

### setLocale

```php?start_inline=1
void setLocale(string) 
```

Expects a string and stores it in the `locale` property.

#### Typical use
{:.no_toc}

Called only from the [`Context::configure`](Context#configure) method.

#### Parameters
{:.no_toc}

Expects a string like `en` or `nl`.

### setMeasurementsSampler

```php?start_inline=1
void setMeasurementsSampler(\Freesewing\MeasurementsSampler) 
```

Expects a [`MeasurementsSampler`](MeasurementsSampler) object and stores it 
in the `measurementsSampler` property.

#### Typical use
{:.no_toc}

Called only from the [`Context::addMeasurementsSampler`](Context#addmeasurementssampler) method.

#### Parameters
{:.no_toc}

Expects an instance of [`MeasurementsSampler`](MeasurementsSampler).

### setModel

```php?start_inline=1
void setModel(\Freesewing\Model) 
```

Expects a [`Model`](Model) object and stores it 
in the `model` property.

#### Typical use
{:.no_toc}

Called only from the [`Context::addModel`](Context#addmodel) method.

#### Parameters
{:.no_toc}

We all want a [`Model`](Model), and so does this method.

### setOptionsSampler

```php?start_inline=1
void setOptionsSampler(\Freesewing\OptionsSampler) 
```

Expects a [`OptionsSampler`](OptionsSampler) object and stores it 
in the `optionsSampler` property.

#### Typical use
{:.no_toc}

Called only from the [`Context::addOptionsSampler`](Context#addoptionssampler) method.

#### Parameters
{:.no_toc}

Expects an instance of [`OptionsSampler`](OptionsSampler).

### setPattern

```php?start_inline=1
void setPattern(\Freesewing\Patterns\Pattern) 
```

Expects a (grand)child of [`Patterns\Pattern`](Patterns/Pattern) and stores it 
in the `pattern` property.


#### Typical use
{:.no_toc}

Used by the [`Services\SampleService`](Services\SampleService) and 
[`Services\CompareService`](Services\CompareService) to attach a pattern 
to the [`Context`](Context). 

#### Parameters
{:.no_toc}

Expects a (grand)child of [`Patterns\Pattern`](Patterns/Pattern).

### setRenderbot

```php?start_inline=1
void setRenderbot(\Freesewing\SvgRenderbot) 
```

Expects a [`SvgRenderbot`](SvgRenderbot) object and stores it 
in the `renderbot` property.


#### Typical use
{:.no_toc}

Called only from the [`Context::addRenderbot`](Context#addrenderbot) method.

#### Parameters
{:.no_toc}

Expects a [`SvgRenderbot`](SvgRenderbot) object.

### setRequest

```php?start_inline=1
void setRequest(\Freesewing\Request) 
```

Expects a [`Request`](Request) object and stores it 
in the `request` property.


#### Typical use
{:.no_toc}

Called from `index.php` to store the user request.

#### Parameters
{:.no_toc}

Expects a [`Request`](Request) object.

### setResponse

```php?start_inline=1
void setResponse(\Freesewing\Response) 
```

Expects a [`Response`](Response) object and stores it 
in the `response` property.


#### Typical use
{:.no_toc}

Used by the `run` method of all services 
to attach a [`Response`](Response) object to the [`Context`](Context).

Specifically:

- [`InfoService::run`](InfoService#run) 
- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

#### Parameters
{:.no_toc}

Expects a [`Request`](Request) object.

### setService

```php?start_inline=1
void setService(\Freesewing\Services\AbstractService) 
```

Expects a child of [`Services\AbstractService`](Services/AbstractService) 
and stores it in the `service` property.

#### Typical use
{:.no_toc}

Called by [`Context::configure`](Context#configure).

#### Parameters
{:.no_toc}

Expects a child of [`Services\AbstractService`](Services/AbstractService).

### setSvgDocument

```php?start_inline=1
void setSvgDocument(\Freesewing\SvgDocument) 
```

Expects an [`SvgDocument`](SvgDocument) object
and stores it in the `svgDocument` property.

#### Typical use
{:.no_toc}

Not used. We call [`Context::addSvgDocument`](Context#addsvgdocument) instead.

#### Parameters
{:.no_toc}

Expects an instance of [`SvgDocument`](SvgDocument).

### setTheme

```php?start_inline=1
void setTheme(\Freesewing\Themes\Theme) 
```

Expects a child of [`Themes\Theme`](Themes/Theme) 
and stores it in the `theme` property.

#### Typical use
{:.no_toc}

Called by [`Context::configure`](Context#configure).

#### Parameters
{:.no_toc}

Expects a child of [`Themes\Theme`](Themes/Theme).

### configure

```php?start_inline=1
void configure()
```

The configure method sets up properties that are common to all requests.

They are:
- config: Holds the configuration file as an array, return by [`Context::loadConfig`](Context#loadconfig)
- service: Holds a [`Service`](Service) object returned by [`Context::loadService`](Context#loadservice)
- channel: Holds a [`Channel`](Channel) object returned by [`Context::loadChannel`](Context#loadchannel)
- theme: Holds a [`Themes\Theme`](Themes\Theme) object returned by [`Context::loadTheme`](Context#loadtheme)
- locale: Holds a string returned by [`Context::loadLocale`](Context#loadlocale)

#### Typical use
{:.no_toc}

Called from `index.php`, the code that handles all freesewing requests.

### addPattern

```php?start_inline=1
void addPattern()
```

Stores the result of [`Context::loadPattern`](Context#loadpattern) in the pattern property.

Also lets the pattern know whether we are dealing with a paperless theme by feeding
[`Theme::isPaperless`](Theme#ispaperless) into [`Pattern::setPaperless`](Pattern#setpaperless)

#### Typical use
{:.no_toc}

Used by the `run` method of all services 
to attach a [`Pattern`](Pattern) object to the [`Context`](Context).

Specifically:

- [`InfoService::run`](InfoService#run) 
- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

> Given that [`Pattern`](Pattern) is an abstract class, the actual object is always
> a (grand)child of the [`Pattern`](Pattern) class.

### addModel

```php?start_inline=1
void addModel()
```

Instantiates a new [`Model`](Model) object and calls
[`Context::setModel`](Context#setmodel) with it.

#### Typical use
{:.no_toc}

Used by [`SampleService::run`](SampleService#run) and [`DraftService::run`](DraftService#run)
to attach a [`Model`](Model) object to the [`Context`](Context).

### addUnits

```php?start_inline=1
void addUnits()
```

Stores the result of [`Context::loadUnits`](Context#loadunits) in the units property.

#### Typical use
{:.no_toc}

Used by the `run` method of all rendering services 
to store an array of units in the [`Context`](Context) units property.

Specifically:

- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

{% include units.html %}

### addTranslator

```php?start_inline=1
void addTranslator()
```

Stores the result of [`Context::loadTranslator`](Context#loadtranslator) in the translator property.

#### Typical use
{:.no_toc}

Used by the `run` method of all rendering services 
to attach a [`Translator`](Translator) object to the [`Context`](Context).

Specifically:

- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

### addRenderBot

```php?start_inline=1
void addRenderBot()
```

Instantiates a new [`SvgRenderbot`](SvgRenderbot) object and calls
[`Context::setRenderbot`](Context#setrenderbot) with it.

#### Typical use
{:.no_toc}

Used by the `run` method of all rendering services 
to attach a [`SvgRenderbot`](SvgRenderbot) object to the [`Context`](Context).

Specifically:

- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

> Freesewing allows to use a different renderbot, in case you want to output a 
> different format. 
> However, there is currently only one renderbot, the [`SvgRenderbot`](SvgRenderbot).
> As such, this method will always instantiate an [`SvgRenderbot`](SvgRenderbot)

### addSvgDocument

```php?start_inline=1
void addSvgDocument()
```

Stores the result of [`Context::loadSvgDocument`](Context#loadsvgdocument) in the svgDocument property.

#### Typical use
{:.no_toc}

Used by the `run` method of all rendering services 
to attach a [`SvgDocument`](SvgDocument) object to the [`Context`](Context).

Specifically:

- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

### addOptionsSampler

```php?start_inline=1
void addOptionsSampler()
```

Instantiates a new [`OptionsSampler`](OptionsSampler) object and calls
[`Context::setOptionsSampler`](Context#setoptionssampler) with it.

#### Typical use
{:.no_toc}

Used by [`SampleService::run`](SampleService#run) 
to attach a [`OptionsSampler`](OptionsSampler) object to the [`Context`](Context).

### addMeasurementsSampler

```php?start_inline=1
void addMeasurementsSampler()
```

Instantiates a new [`MeasurementsSampler`](MeasurementsSampler) object and calls
[`Context::setMeasurementssampler`](Context#setmeasurementssampler) with it.

#### Typical use
{:.no_toc}

Used by [`SampleService::run`](SampleService#run) and [`CompareService::run`](CompareService#run)
to attach a [`MeasurementsSampler`](MeasurementsSampler) object to the [`Context`](Context).

### runService

```php?start_inline=1
void runService() 
```

Calls the `run` method on the [`Services\AbstractService`](Services/AbstractService) 
object in the `service` property.

> Given that [`Services\AbstractService`](Services/AbstractService) is an
> abstract class, the actual object will be a child of the 
> [`Services\AbstractService`](Services/AbstractService) class.

#### Typical use
{:.no_toc}

Called only from `index.php`, the code that handles all freesewing requests.

### cleanUp

```php?start_inline=1
void cleanUp()
```

Calls [`Theme::cleanUp`](Theme#cleanup) and [`Channel::cleanUp`](Channel#cleanup).

If a pattern is attached to the [`Context`](Context), this also calls
[`Pattern::cleanUp`](Pattern#cleanup).

> <b>How do you mean, 'If a pattern is attached'?</b>
> 
> This check is needed because the infoservice does not always instantiate a [`Pattern`](Pattern).

This is a way to allow patterns, themes, and channels to clean up at the end of
a request. For example, if you're logging to a database in your channel,
this will make sure you get a chance to close that connection in your channel's
`cleanUp` method.

#### Typical use
{:.no_toc}

Used by the `run` method of all rendering services 
to attach a [`Translator`](Translator) object to the [`Context`](Context).

Specifically:

- [`DraftService::run`](DraftService#run) 
- [`SampleService::run`](SampleService#run) 
- [`CompareService::run`](CompareService#run) 

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


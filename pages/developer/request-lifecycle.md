---
layout: page
title: Request lifecycle
tags: [developer]
permalink: /developer/request-lifecycle
---
Below is a bird's eye overview of a request as it gets handled by freesewing
start to finish.

## Shared bootstrap for all requests

- The index.php is loaded
- The first thing it does is load the Symfony autoloader
- Then, it instantiates a [`Context`](/class/context) object, which will hold all data during the lifecycle of our request
- In its `request` property, we instantiate a new [`Request`](/class/request) object to hold our request data from `$_REQUEST`
- index.php calls [`Context::configure`](/class/context#configure), which will set the `config`, `service`, `channel`, `theme`, and `locale` properties.
- index.php calls [`Context::runservice`](/class/context#runservice) which calls the `run` method on the service object and passes it the entire [`Context`](/class/context) object

At this point we have a [`Context`](/class/context) object with a bunch of properties set:

- [`Context`](/class/context)
  - `config` : An `array` with the data from our `config.yml` configuration file
  - `service` : An instantiated service object based on the `service` request parameter. This will be one of 
[`Services/InfoService`](/class/services/infoservice), 
[`Services/DraftService`](/class/services/draftservice), 
[`Services/SampleService`](/class/services/sampleservice), or 
[`Services/CompareService`](/class/services/compareservice)
  - `channel` : An instantiated channel object based on the `channel` request parameter or (when missing) the default in the configuration file. This will be an object of a class extending the abstract [`Channels/Channel`](/class/channels/core/channel) class
  - `theme` : An instantiated theme object based on the `theme` request parameter or (when missing) the default in the configuration file. This will be an object of a class extending the abstract [`Themes/Theme`](/class/themes/core/theme) class
  - `locale` : A `string` with a 2-character language code based on the `lang` request parameter or (when missing) the default in the configuration file

The remainder of the request is handled by the `run` method of the instantiated service object.
We've detailed the lifecycle for each service below.

> <h5 class='notoc'>We'll use abstract classes as an example</h5>
>
> In the documentation below, we'll refer to the abstract classes 
> [`Channels/Channel`](/class/channels/core/channel), 
> [`Themes/Theme`](/class/themes/core/theme), and
> [`Patterns/Pattern`](/class/patterns/core/pattern) when in practice the channel, theme, and pattern
> used will be one extending these abstract classes.


## Info service lifecycle
We continue after [`Services/InfoService::run`](/class/services/infoservice#run) is called by the shared bootstrap code.

- Sets the format based on the `format` request parameter. Defaults to `json` when missing.
- If a `pattern` request parameter is set:
  - A new [`Patterns/Pattern`](/class/patterns/core/pattern) object will be instantiated based on the `pattern` request parameter
  - The [`Services/InfoService`](/class/services/infoservice) will collect info on the pattern
  - This info will be themed with [`Themes\Info::themePatternInfo`](/class/themes/core/info#themepatterninfo) 
  - It will then be passed on to [`Context::setResponse`](/class/context#setresponse)
- If a `pattern` request parameter is not set:
  - An array of information on the API will be collected by the info service
  - This info will be themed with [`Themes\Info::themeInfo`](/class/themes/core/info#themeinfo)
  - It will then be passed on to [`Context::setResponse`](/class/context#setresponse)
- We'll check whether [`Channels/Channel::isValidResponse`](/class/channels/core/channel#isvalidresponse) returns `true`
- If it does:
  - We'll send out the response by calling [`Response::send`](/class/response#send)
- If it doesn't
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidResponse`](/class/channels/core/channel#handleinvalidresponse)
- The last thing we do is call [`Context::cleanUp`](/class/context#cleanup)

## Draft service lifecycle
We continue after [`Services/DraftService::run`](/class/services/draftservice#run) is called by the shared bootstrap code.

- We'll instantiate a new [`Patterns/Pattern`](/class/patterns/core/pattern) object based on the `pattern` request parameter and add it to the context
- We'll check whether [`Channels/Channel::isValidRequest`](/class/channels/core/channel#isvalidrequest) returns `true`
- If it does:
  - We'll instantiate a [`Model`](/class/model) object and add it to the context
  - We'll set our model's measurements via [`Model::addMeasurements`](/class/model#addmeasurements) but only after asking the channel to normalize the [`Request`](/class/request) data via [`Channels\Channel::standardizeModelMeasurements`](/class/channels/core/channel#standardizemodelmeasurements)
  - We'll set the pattern options via [`Pattern::addOptions`](/class/patterns/core/pattern#addoptions) but only after asking the channel to normalize the [`Request`](/class/request) data via [`Channels\Channel::standardizePatternOptions`](/class/channels/core/channel#standardizepatternoptions)
  - We'll add units to our context and pattern based on the `unitsIn` and `unitsOut` request parameters
  - We'll add a symfony translator object to our context and pattern
  - We'll set the theme options via [`Themes/Theme::setOptions`](/class/themes/core/theme#setoptions) 
  - We'll call [`Patterns/Pattern::draft`](/class/patterns/core/pattern#draft) which does the actual work
  - We'll store the `partMargin` value in the theme configuration in the [`Patterns/Pattern`](/class/patterns/core/pattern) object
  - We calls [`Themes/Theme::applyRenderMask`](/class/themes/core/theme#applyrendermask) to allow the theme to exclude things from the output
  - We call [`Patterns/Pattern::layout`](/class/patterns/core/pattern#layout) which handles the layout of the different parts on the page
  - We call [`Themes/Theme::themePattern`](/class/themes/core/theme#themepattern) which gives the theme a chance to do its thing
  - We add an [`SvgDocument`](/class/svgdocument) and [`SvgRenderbot`](/class/svgrenderbot) object to the context
  - We render the pattern
  - Our SVG is now rendered, and our response will be themed with [`Themes/Theme::themeResponse`](/class/themes/core/theme#themeresponse) to allow theming of the reponse
  - And then be passed to [`Context::setResponse`](/class/context#setresponse)
  - Finally, we'll do last-minute replacements on the entire response body based on the replacements we get from [`Pattern::getReplacements`](/class/patterns/core/pattern#getreplacements)
- If it does not
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidRequest`](/class/channels/core/channel#handleinvalidrequest)
- We'll check whether [`Channels/Channel::isValidResponse`](/class/channels/core/channel#isvalidresponse) returns `true`
- If it does:
  - We'll send out the response by calling [`Response::send`](/class/response#send)
- If it doesn't
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidResponse`](/class/channels/core/channel#handleinvalidresponse)
- The last thing we do is call [`Context::cleanUp`](/class/context#cleanup)

## Sample service lifecycle
We continue after [`Services/SampleService::run`](/class/services/sampleservice#run) is called by the shared bootstrap code.

- We'll instantiate a new [`Patterns/Pattern`](/class/patterns/core/pattern) object based on the `pattern` request parameter and add it to the context
- We'll check whether [`Channels/Channel::isValidRequest`](/class/channels/core/channel#isvalidrequest) returns `true`
- If it does:
  - We'll add units to our context and pattern based on the `unitsIn` and `unitsOut` request parameters
  - We'll add a symfony translator object to our context and pattern
  - We'll store the `partMargin` value in the theme configuration in the [`Patterns/Pattern`](/class/patterns/core/pattern) object
  - We'll set the theme options via [`Themes/Theme::setOptions`](/class/themes/core/theme#setoptions) 
  - If the `mode` request parameter is `options`:
    - We'll instantiate a [`OptionsSampler`](/class/optionssampler) object and add it to the context
    - We'll instantiate a [`Model`](/class/model) object and add it to the context
    - We'll set model measurements via [`Model::addMeasurements`](/class/model#addmeasurements) based on the result from [`OptionsSampler::loadModelMeasurements`](/class/optionssampler#loadmodelmeasurements)
    - We'll set the pattern options via [`Pattern::addOptions`](/class/patterns/core/pattern#addoptions)
    - We'll store the result from [`OptionsSampler::sampleOptions`](/class/optionssampler#sampleoptions) via [`Context::setPattern`](/class/context#setpattern)
  - If it is not we assume mode is `measurements`:
    - We'll instantiate a [`MeasurementsSampler`](/class/measurementssampler) object and add it to the context
    - We'll store the pattern from the context in our [`MeasurementsSampler`](/class/measurementssampler) object
    - We'll set the pattern options via [`Pattern::addOptions`](/class/patterns/core/pattern#addoptions) but only after asking the channel to normalize the [`Request`](/class/request) data via [`Channels\Channel::standardizePatternOptions`](/class/channels/core/channel#standardizepatternoptions)
    - We'll store the models configuration in our [`MeasurementsSampler`](/class/measurementssampler) object, as loaded from the `models.yml` config file 
    - We'll load the model group as set in the `samplerGroup` request parameter
    - we'll store the result from [`MeasurementsSampler::sampleMeasurements`](/class/measurementssampler#samplemeasurements)via [`Context::setPattern`](/class/context#setpattern)
  - We add an [`SvgDocument`](/class/svgdocument) and [`SvgRenderbot`](/class/svgrenderbot) object to the context
  - We render the pattern
  - Our SVG is now rendered, and our response will be themed with [`Themes/Theme::themeResponse`](/class/themes/core/theme#themeresponse) to allow theming of the reponse
  - And then be passed to [`Context::setResponse`](/class/context#setresponse)
- If it does not:
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidRequest`](/class/channels/core/channel#handleinvalidrequest)
- We'll check whether [`Channels/Channel::isValidResponse`](/class/channels/core/channel#isvalidresponse) returns `true`
- If it does:
  - We'll send out the response by calling [`Response::send`](/class/response#send)
- If it doesn't
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidResponse`](/class/channels/core/channel#handleinvalidresponse)
- The last thing we do is call [`Context::cleanUp`](/class/context#cleanup)

## Compare service lifecycle
We continue after [`Services/CompareService::run`](/class/services/compareservice#run) is called by the shared bootstrap code.

- We'll instantiate a new [`Patterns/Pattern`](/class/patterns/core/pattern) object based on the `pattern` request parameter and add it to the context
- We'll check whether [`Channels/Channel::isValidRequest`](/class/channels/core/channel#isvalidrequest) returns `true`
- If it does:
  - We'll add units to our context and pattern based on the `unitsIn` and `unitsOut` request parameters
  - We'll add a symfony translator object to our context and pattern
  - We'll store the `partMargin` value in the theme configuration in the [`Patterns/Pattern`](/class/patterns/core/pattern) object
  - We'll set the theme options via [`Themes/Theme::setOptions`](/class/themes/core/theme#setoptions) 
  - We'll instantiate a [`MeasurementsSampler`](/class/measurementssampler) object and add it to the context
  - We'll store the pattern from the context in our [`MeasurementsSampler`](/class/measurementssampler) object
  - We'll set the pattern options via [`Pattern::addOptions`](/class/patterns/core/pattern#addoptions) but only after asking the channel to normalize the [`Request`](/class/request) data via [`Channels\Channel::standardizePatternOptions`](/class/channels/core/channel#standardizepatternoptions)
  - We'll store the models configuration in our [`MeasurementsSampler`](/class/measurementssampler) object, as loaded from the `models.yml` config file 
  - We'll load the model group as set in the `samplerGroup` request parameter
  - We'll load the user-supplied model data and add it as model `compareModel`
  - we'll store the result from [`MeasurementsSampler::sampleMeasurements`](/class/measurementssampler#samplemeasurements)via [`Context::setPattern`](/class/context#setpattern)
  - We add an [`SvgDocument`](/class/svgdocument) and [`SvgRenderbot`](/class/svgrenderbot) object to the context
  - We render the pattern
  - Our SVG is now rendered, and our response will be themed with [`Themes/Theme::themeResponse`](/class/themes/core/theme#themeresponse) to allow theming of the reponse
  - And then be passed to [`Context::setResponse`](/class/context#setresponse)
- If it does not:
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidRequest`](/class/channels/core/channel#handleinvalidrequest)
- We'll check whether [`Channels/Channel::isValidResponse`](/class/channels/core/channel#isvalidresponse) returns `true`
- If it does:
  - We'll send out the response by calling [`Response::send`](/class/response#send)
- If it doesn't
  - We'll let the channel bail out by calling [`Channels/Channel::handleInvalidResponse`](/class/channels/core/channel#handleinvalidresponse)
- The last thing we do is call [`Context::cleanUp`](/class/context#cleanup)

fixme

* TOC - Do not remove this line
{:toc}



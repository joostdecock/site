---
layout: page
title: Request parameters
tags: [fundamentals]
permalink: /developer/request-parameters
---
Freesewing needs your input to do what it does. And that input comes
in the form or request parameters.

We us PHP's `$_REQUEST` superglobal to read input data, which means that 
you can provide request parameters either as `GET` parameters or `POST` data.
By default `POST` parameters take precendence over `GET` parameters, although
this is configurable in 
[the php variables-order setting](http://php.net/manual/en/ini.core.php#ini.variables-order).

## Context parameters

A freesewing [`Context`](/class/context) is initialized (see [request lifecycle](request-lifecycle)) 
based on these request parameters:

### service

The `service` request parameter determines which freesewing service will be loaded.
It **must** be one of these four values:

- `info`
- `draft`
- `sample`
- `compare`

If the `service` parameter is not present, the default service will be loaded from the 
`config.yml` configuration file.

### channel

The channel to load. This must be the name of a class extending the abstract 
[`Channels/Channel`](/class/channels/core/channel) class.

Example: `Docs`

If the `channel` parameter is not present, the default channel will be loaded from the 
`config.yml` configuration file.

### theme

The theme to load. This must be the name of a class extending the abstract 
[`Themes/Theme`](/class/themes/core/theme) class.

Example: `Paperless`

If the `theme` parameter is not present, the default theme for the given service
 will be loaded from the `config.yml` configuration file.

### lang

The locale to load. This must be a 2-character language string.

Example: `en`

If the `lang` parameter is not present, the default locale will be 
loaded from the `config.yml` configuration file.

## Service parameters

### Info service

#### pattern

If the `pattern` request parameter is set to the class name of a class 
extending the abstract [`Patterns/Pattern`](/class/patterns/core/pattern) class, 
the info service will return information on this pattern.

If it is not set, the info service will return general API info.

#### format

Controls the format in which the info service will return info.
Must be one of:

- `json` : Return json-formatted info
- `php` : Returns a serializes PHP array
- `html` : Returns HTML-formatted info

If the `format` parameter is not present, this defaults to `json`.

### Draft service

#### pattern

The `pattern` request parameter should be set to the class name of a class 
extending the abstract [`Patterns/Pattern`](/class/patterns/core/pattern) class.

If it's set, this is the pattern that will be drafted.
If it is not set (or hasn't been set to a default) the draft service cannot function.

### Sample service

#### pattern

The `pattern` request parameter should be set to the class name of a class 
extending the abstract [`Patterns/Pattern`](/class/patterns/core/pattern) class.

If it's set, this is the pattern that will be sampled.
If it is not set (or hasn't been set to a default) the sample service cannot function.

#### mode

The `mode` request parameter should be one of:

- `options`
- `measurements`

It controls whether the sample service will sample options or measurements.

#### option

If the `mode` request parameter is set to `options` the `option` request parameter
must hold the name of the option to sample.

#### sampleGroup

If the `mode` request parameter is set to `measurements` the `sampleGroup` request parameter
must hold the name of the group to sample. This name is to be found in the `models.yml` 
sampler configuration file.

### Compare service

#### pattern

The `pattern` request parameter should be set to the class name of a class 
extending the abstract [`Patterns/Pattern`](/class/patterns/core/pattern) class.

If it's set, this is the pattern that will be compared.
If it is not set (or hasn't been set to a default) the compare service cannot function.

## Channel parameters

### unitsIn

The `unitsIn` parameter controls the units of user-supplied data. This includes:

- Model measurements
- Pattern options

It must be one of:

- `metric`
- `imperial`

If it is not set, the `unitsIn` parameter defaults to `metric`.

### Model measurement

It is the role of the channel to match request parameters to the measurements listed
in the pattern's `config.yml` file.

### Pattern options

It is the role of the channel to match request parameters to the pattern options listed
in the pattern's `config.yml` file.

## Theme parameters

### unitsOut

The `unitsOut` parameter controls the units of generated output.

It must be one of:

- `metric`
- `imperial`

If it is not set, the `unitsOut` parameter defaults to `metric`.

### cache

The `cache` parameter controls the caching headers of the HTML response.

If the `cache` request parameter is present, a caching header is added instructing the 
browser to cache the response for 6 months.

If the `cache` request parameter is not present, a caching header is added instructing 
the browser not to cache the request.

This is typically used for loading examples in the documentation, where there is no need
to regenerate them on each request.

Cache invalidation can be done by changing the value of the `cache` parameter. 
For example, by stringing together the current year and month as the value of the 
`cache` paramter, the cache will become invalid every month as the URL will change.

It must be one of:

- `metric`
- `imperial`

If it is not set, the `unitsOut` parameter defaults to `metric`.

### Theme options

A theme can set options in its `config.yml` configuration file.
For example, a theme that contains these lines:

```
options:
    - parts
    - forceParts
    - embedFluid
```

Will have the `parts`, `forceParts`, and `embedFluid` request parameters
made available to it.

If you want your theme to do something based on user input, this is the 
mechanism to use.

Below are some example of theme options. Note that they may not be present in
every theme.

#### parts

The `parts` request parameter controls what parts will be rendered. 

It takes a comma-seperated string of parts names to be rendered.

All parts that are **not** in the list will **not** be rendered.
All parts that are in the list will be treated as they would have been
without this parameter present.

#### forceParts

The `forceParts` request parameter controls what parts will be rendered. 

It takes a comma-seperated string of parts names to be rendered.

All parts that are in the list will be rendered, even if in the absence
of this parameter they would not have been rendered.
All parts that are **not** in the list will **not** be rendered.

The difference between the `parts` and `forceParts` request parameters
is that `forceParts` will force parts on the list to be rendered even
if their render flag is set to false. `parts` will only exclude parts 
from rendering if they are not on the list. 

#### embedFluid

If the `embedFluid` parameter is set to `1`, the generated SVG will
not have `height` and `width` attributes.

While this makes the SVG unsuitable for printing, it makes it responsive
when being injected in the DOM of a HTML document.

If you are using your SVG as the `src` attribute of an `img` tag,
you don't need this. But if you are injecting the `svg` directly into
your html page, this is for you.








* TOC - Do not remove this line
{:toc}



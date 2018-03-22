---
layout: page
title: Bail documentation
tags: [bail docs]
permalink: /docs/bail/
---
* TOC - Do not remove this line
{:toc}
## Freesewing bail
**Bail** allows you to collect error details from different places.
Think of it as a poor man's [Rollbar](https://rollbar.com).

Bail registers a custom PHP error handler which submits 
error information to an API endpoint you configure.

After it's done doing that, bail's error error handler 
returns `false` to force PHP's default error handler
to (also) handle the error.

## System Requirements

* PHP 5.6 or newer
* composer

## Installation

```
composer require freesewing/bail
```

## Configuration

You need to initialize bail through its static `init()` method which takes two
configuration arguments:

 - `string` `$api` : The API endpoint where you want to POST your error information to
 - `string` `$origin` : An identification of the origin of these errors

Example:

```php
use Freesewing\Bail\ErrorHandler;

ErrorHandler::init(
    'https://data.freesewing.org/error', // API endpoint
    'core.freesewing.org' // Error origin
);

```

## Further reading

 - [Bail test coverage](./coverage)

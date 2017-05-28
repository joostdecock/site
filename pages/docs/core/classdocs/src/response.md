---
layout: page
title: Response
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/response
---
## Description 

The [`Response`](response) class holds the response status
and data, and sends the response headers and body.

## Typical use

Used by themes to store the response data, and by the services to send it.

## Constants

### CACHETIME

`CACHETIME` sets the number of seconds to cache a response, if caching is used.

`CACHETIME` is an `integer` with a value of `15552000`, which is about 6 months.

See [`Response::addCacheHeaders`](response#addcacheheaders) for details on caching.

## Public methods

### addCacheHeaders

```php?start_inline=1
void addCacheHeaders(
    \Freesewing\Request $request
)
```

Adds cache headers to the [`Response`](response) object.

This will use [`Request::getData`](request#getdata) to check for a `cache` parameter.

If it's absent, it will add a no-cache header:

```
Cache-Control: public, no-cache
```

If [`Request::getData`](request#getdata) returns something for `cache`, regardless 
of its value, this will add a cache header:

```
Cache-Control: public, max-age=CACHETIME
```

#### Typical use
{:.no_toc}

Called from themes to add caching headers.

#### Parameters
{:.no_toc}

- [`Request`](request) `$request` : The [`Request`](request) object

#### Return value
{:.no_toc}

None. Cache headers will be added to the [`Request`](request) object.

### setBody

```php?start_inline=1
void setBody( 
    string $body
)
```

Sets the `body` property to `$body`.

#### Typical use
{:.no_toc}

Called from themes to set the response body.

#### Parameters
{:.no_toc}

- `string` `$body` : The body

### getBody

```php?start_inline=1
string getBody() 
```

Returns the `body` property.

#### Typical use
{:.no_toc}

Used by the [`Services/draftservice`](services/draftservice) for last-minute
string replacements on the body.

#### Return value
{:.no_toc}

A `string`.

### setFormat

```php?start_inline=1
void setFormat( 
    string $format
)
```

Sets the `format` property to `$format`.

#### Typical use
{:.no_toc}

Used by themes to set the response format. Typically one of `svg` or `json`.

#### Parameters
{:.no_toc}

- `string` `$format` : The format

### getFormat

```php?start_inline=1
string getFormat() 
```

Returns the `format` property.

#### Typical use
{:.no_toc}

Not used, but here for when you need it.

#### Return value
{:.no_toc}

A `string`.

### addHeader

```php?start_inline=1
void addHeader(
    string $name
    string $header
) 
```

Returns header `$header` to the `headers` property, which is an array, under key `$name`.

By using `$name` to store the header under a know key, we have the option to
overwrite headers that were added before.

#### Example
{:.no_toc}
```php?start_inline=1
/** @var \Freesewing\Response $response */

// Set content type
$response->addHeader('Content-Type', 'Content-Type: image/svg+xml');

// Add custom header
$response->addHeader('X-Freesewing-Version', 'X-Freesewing-Version: 1.2.1');

// Overwrite custom header
$response->addHeader('X-Freesewing-Version', 'X-Freesewing-Version: 1.2.2');

```

#### Typical use
{:.no_toc}

Typically used by themes to set the content type.

#### Parameters
{:.no_toc}

- `string` `$name` : The name to store the header under in the headers property arrai.
- `string` `$header` : The actual header to send out

### send

```php?start_inline=1
void send()
```

Outputs headers and the response body.

If the reponse format is `json` it will convert the body to JSON first.

#### Typical use
{:.no_toc}

Called from services to send the response to the browser.

#### Typical use
{:.no_toc}

None, will output the response headers and body.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

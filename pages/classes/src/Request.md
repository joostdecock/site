---
layout: class
title: Request
namespace: Freesewing
tags: [class]
permalink: /class/Request
---
## Description 

The [`Request`](Request) class stores request parameters and client info.

It only has methods to retrieve the data stored in the [`Request`](Request) object.
Setting the data is done in the class constructor.

## Typical use

Called in `index.php` like this:

```php?start_inline=1
$context->setRequest(new \Freesewing\Request($_REQUEST));
```

## Public methods

### \_\_construct (constructor)

```php?start_inline=1
\Freesewing\Request __construct( 
    array $data 
)
```

When creating a [`Request`](Request) object, you can/should pass an array of data 
to the constructor, which will be stored.

There's no other way to get data into a [`Request`](Request), only methods to 
retrieve it.

In addition to the data you pass to it, the constructor will also store 
this information (if available):

- `client` : IP address of the client, if available
- `userAgent` : The userAgent string that identifies the browser, if availble
- `host` : The host the request was targeted at
- `uri` : The full URO of the request
- `time` : The time of the request

This information is not used in Freesewing, but is made
available through [`Request::getInfo`](Request#getinfo), typically for 
custom channel implementations.


#### Example
{:.no_toc}

```php?start_inline=1
$request = new \Freesewing\Request([
    'service' => 'draft',
    'pattern' => 'SimonShirt'
    'chestCircumference' => 104,
    'chestEase' => 12
]);
```

#### Typical use
{:.no_toc}

Called in index.php with `$_REQUEST` as data array.

You could however pass another array, when running freesewing from a
command line for example.

#### Parameters
{:.no_toc}

This expects an `array` of data.

### getData

```php?start_inline=1
string getData( 
    string $name
)
```

Returns the value from the `data` array stored under key `$name`.


#### Example
{:.no_toc}

```php?start_inline=1
$request = new \Freesewing\Request([
    'service' => 'draft',
    'pattern' => 'SimonShirt'
    'chestCircumference' => 104,
    'chestEase' => 12
]);

// This returns 'draft'
$request->getData('service');
```

#### Typical use
{:.no_toc}

Used by [services](../tags#extendsAbstractService), [`Context`](Context), 
and [channel](../tags#extendscChannel) to retrieve request parameters.

#### Parameters
{:.no_toc}

- `string` `$name` : Key in the data array for which to return the value.

#### Return value
{:.no_toc}

Ultimately depends on what you store it, by typically a `string`.

### getAllData

```php?start_inline=1
array getAllData() 
```

This returns the complete `array` stored in the `data` property.

#### Example
{:.no_toc}

```php?start_inline=1
$data = [
    'service' => 'draft',
    'pattern' => 'SimonShirt'
    'chestCircumference' => 104,
    'chestEase' => 12
]);

$request = new \Freesewing\Request($data);

// $sameData will be identical to $data
$sameData = $request->getAllData();
```

#### Typical use
{:.no_toc}

Not actually used, but here for when you need it.

#### Return value
{:.no_toc}

The `array` of data stored in the [`Request`](Request) object.

### getInfo

```php?start_inline=1
array getInfo()
```

Returns the array of extra info that is stored by the [`Request`](Request) object in the `info`
property. The array contains these keys :

- `client` : IP address of the client, if available
- `userAgent` : The userAgent string that identifies the browser, if availble
- `host` : The host the request was targeted at
- `uri` : The full URO of the request
- `time` : The time of the request

#### Typical use
{:.no_toc}

Not actually used, but here for when you need it.

#### Return value
{:.no_toc}

The `array` of info stored in the [`Request`](Request) object.

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


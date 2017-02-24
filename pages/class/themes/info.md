---
layout: class
title: Info
namespace: Freesewing\Themes
tags: [theme]
permalink: /class/themes/info
---
## Description 

The [`Info`](info) theme is the default theme for, and only used by,
the [`InfoService`](../services/infoservice).

It returns information about the API in one of three formats:

- `json` : For easy frontend integration
- `html` : To be read by humans
- `php` : A serialized PHP array

Unlike your typical pattern-drawing theme, 
the [`Info`](info) theme 
does not extend the abstract [`Theme`](theme) class.

That's because the info service just returns information
and doesn't create a pattern.

The [`Info`](info) theme will also add a `Access-Control-Allow-Origin:"*"` header 
to the [`Response`](../response) object, so you can call the infoservice in an AJAX request across 
domains.

## Example
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#api-info" role="tab" data-toggle="tab">API info</a></li>
    <li class="nav-item"><a class="nav-link" href="#pattern-info" role="tab" data-toggle="tab">Pattern info</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="api-info">
<pre class='highlight'><code id='api-json'></code></pre>
</div>
<div role="tabpanel" class="tab-pane" id="pattern-info">
<pre class='highlight'><code id='pattern-json'></code></pre>
</div>
</div>

## Public methods

### themeInfo

```php?start_inline=1
string themeInfo(
    array $data,
    string $format
) 
```
Themes the data in `array` `$data` according to format `$format`, which is one of:

- `json` : JSON
- `html` : HTML markup, suitable for humans
- `php` : A serialized PHP array


#### Parameters
{:.no_toc}

- `array` `$data` : The data to theme
- `string` `$format` : The format to use

#### Return value
{:.no_toc}

A `string` with the formatted data.

### themePatternInfo

```php?start_inline=1
string themePatternInfo(
    \Freesewing\Pattern $pattern,
    string $format
) 
```
Themes the info on pattern `$pattern` according to format `$format`, which is one of:

- `json` : JSON
- `html` : HTML markup, suitable for humans
- `php` : A serialized PHP array


#### Parameters
{:.no_toc}

- [`Pattern`](../patterns/pattern) `$pattern` : The pattern object
- `string` `$format` : The format to use

#### Return value
{:.no_toc}

A `string` with the formatted data.

### cleanUp

```php?start_inline=1
void cleanUp()
```

Does nothing by default.

The `cleanUp` method is called on the [`Theme`](../themes/theme), [`Pattern`](pattern), 
and [`Channel`](../channels/channel) object before terminating a request.
It's a way to tie up any loose ends you may have, like open database connections and such things.

By default, it does nothing though.

#### Typical use
{:.no_toc}

Called from [`DraftService::run`](../services/draftservice#run), [`SampleService::run`](../services/sampleservice#run),
or [`CompareService::run`](../services/compareservice#run).

### isPaperless

```php?start_inline=1
bool isPaperless()
```

Returns false. This is not relevant to the [`Info`](info) theme
bust must be a callable method in all themes.

#### Return value
{:.no_toc}

Always `false`.

## See also
The [`InfoService`](../services/infoservice) class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

<script>
$.ajax({
    type: "GET",
    url: 'https://api.freesewing.org/?service=info&format=json',
    success: function(data) {
        data = jQuery.parseJSON(data);
        $('#api-json').html(JSON.stringify(data, null, 4));
    }
});
$.ajax({
    type: "GET",
    url: 'https://api.freesewing.org/?service=info&pattern=AaronAshirt',
    success: function(data) {
         data = jQuery.parseJSON(data); 
        $('#pattern-json').html(JSON.stringify(data, null, 4));
    }
});
</script>


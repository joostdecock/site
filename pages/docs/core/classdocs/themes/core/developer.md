---
layout: page
title: Developer
namespace: Freesewing\Themes\Core
tags: [class documentation]
permalink: /docs/core/classdocs/themes/core/developer
---
## Description 

The [`Developer`](developer) theme is a theme specifically for (software) developers.

This theme does not merely return the SVG code of your pattern, but a JSON array like this:

```php?start_inline=1
[
    'svg' => (the SVG code  as typically returned by other themes),
    'debug' => (a Kint dump of the full context object)
]
```

The [`Developer`](developer) theme will also add a `Access-Control-Allow-Origin:"*"` header 
to the [`Response`](/class/response) object, so you can call this in an AJAX request across 
domains.

In addition, it has the `embedFluid` option set to `true` in the theme configuration file.
This will supress inclusion of the `width` and `height` attributes in the SVG tag.
That makes the SVG unsuitable for printing, but allows it to be injected in your HTML
document and it will scale to 100% of the container.

These two things together allow you to call the API and inject the result into your page, 
like in the example below.

## Example 

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#svg" role="tab" data-toggle="tab">Generated SVG</a></li>
    <li class="nav-item"><a class="nav-link" href="#kint" role="tab" data-toggle="tab">Context dump</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="svg" markdown="1">
</div>
<div role="tabpanel" class="tab-pane" id="kint" markdown="1">
</div>
</div>

## Public methods

### themeResponse

```php?start_inline=1
\Freesewing\Response themeResponse(
    \Freesewing\Context $context
)
```

Creates a [`Repsonse`](/class/response) object with SVG and Kint debug embedded in JSON.

Also sets a `Access-Control-Allow-Origin:"*"` header.

#### Typical use
{:.no_toc}
This makes this theme unsuitable for printing, but perfect for injecting into HTML.

#### Parameters
{:.no_toc}

- [`Context`](/class/context) `$context` : The full freesewing context.

## See also

The [`Theme`](theme) parent class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

<script>
$.ajax({
    type: "GET",
    url: 'https://api.freesewing.org/?service=draft&pattern=AaronAshirt&theme=Developer',
    success: function(data) {
        data = jQuery.parseJSON(data);
        $('#svg').html(data.svg);
        $('#kint').html(data.debug);
    }
});
</script>

---
layout: page
title: Theme
namespace: Freesewing\Themes\Core
tags: [class documentation]
permalink: /docs/core/classdocs/themes/core/theme
---
## Description 

The [`Theme`](theme) class is an abstract class to be extended by themes.

## Public methods

### __construct (the constructor)

```php?start_inline=1
\Freesewing\Theme __construct() 
```
If a theme configuration file is present, this will load it into the `config` property.

#### Return value
{:.no_toc}

This is a constructor, so it returns a [`Theme`](theme) object.

### isPaperless

```php?start_inline=1
bool isPaperless()
```

Returns true if isPaperless is set to true in the theme configuration.

#### Typical use
{:.no_toc}
This will be used to determine whether to include the extra
information for paperless on the pattern.

Extra information is things like instructions, notes and
seamlengths.

#### Return value
{:.no_toc}

A boolean, either `true` or `false`.

### themePattern

```php?start_inline=1
void themePattern(
    \Freesewing\Pattern $pattern
)
```

This is where, as a theme designer, you theme the [`Pattern`](/class/patterns/core/pattern) object.

By default, this pulls the (debug) messages to the pattern, so we can add it to the [`SvgDocument`](/class/svgdocument)
later when [`Theme::themeSvg`](theme#themesvg) gets called.

This also adds replacements for certain strings used in the theme templates.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`Pattern`](/class/patterns/core/pattern) `$pattern` : The pattern object to theme.

### themeSvg

```php?start_inline=1
void themeSvg(
    \Freesewing\SvgDocument $svgDocument
)
```

This is where, as a theme designer, you theme the [`SvgDocument`](/class/svgdocument) object.

By default, this loads the theme templates, and adds the (debug) messages from the pattern.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`SvgDocument`](/class/svgdocument) `$svgDocument` : The [`SvgDocument`](/class/svgdocument) object to theme.

### themeResponse

```php?start_inline=1
void themeResponse(
    \Freesewing\Context $context
)
```

This gets the entire [`Context`](/class/context) object, and should return a [`Response`](/class/response) object.

#### Typical use
{:.no_toc}
Called by the service classes after rendering the pattern.

#### Parameters
{:.no_toc}

- [`Context`](/class/context) `$context` : The Freesewing context object

### cleanUp

```php?start_inline=1
void cleanUp()
```

Does nothing by default.

The `cleanUp` method is called on the [`Theme`](/docs/core/classdocs/themes/core/theme), [`Pattern`](/class/patterns/core/pattern), 
and [`Channel`](/class/channels/core/channel) object before terminating a request.
It's a way to tie up any loose ends you may have, like open database connections and such things.

By default, it does nothing though.

#### Typical use
{:.no_toc}

Called from [`DraftService::run`](/class/services/draftservice#run), [`SampleService::run`](/class/services/sampleservice#run),
or [`CompareService::run`](/class/services/compareservice#run).

### getTranslationFiles

```php?start_inline=1
array getTranslationFiles(
    string $locale,
    string $altloc
)
```

Returns an `array` of translation files.
         
#### Typical use
{:.no_toc}

Called from the [`Context`](/class/context) class to add all translation
files to the translator.

#### Parameters
{:.no_toc}

- `string` `$locale` : The primary locale, a string like `en` or `de`
- `string` `$altloc` : The fallback locale, a string like `nl` or `it`

#### Return value
{:.no_toc}

Returns an `array` of translation files.

### setOptions

```php?start_inline=1
void setOptions(
    \Freesewing\Request $request
)
```

Allows the theme to set options based on the request data.

By default, this will set all options listed in the theme config
to their values in the [`Request`](/class/request) object.
         
#### Typical use
{:.no_toc}

Maybe you want your theme to do something based on a request parameter.

This allows you to configure these options in one place.

#### Parameters
{:.no_toc}

- [`Request`](/class/request) `$request` : The request object

### applyRenderMask

```php?start_inline=1
void applyRenderMask(
    \Freesewing\Patterns\Pattern $pattern
)
```

A way for a theme to ultimately decide what should be rendered.

#### Typical use
{:.no_toc}

By default, the theme options `parts` and `forceParts` are used to determine
what parts to render.

#### Parameters
{:.no_toc}

- [`Pattern`](/class/patterns/core/pattern) `$pattern` : The pattern object








## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

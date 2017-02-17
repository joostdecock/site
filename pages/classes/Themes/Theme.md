---
layout: class
title: Theme
namespace: Freesewing\Themes
tags: [internal, class, abstractClass]
permalink: /class/Themes/Theme
---
## Description 

The [`Theme`](Theme) class is an abstract class to be extended by themes.

## Public methods

### __construct (the constructor)

```php?start_inline=1
\Freesewing\Theme __construct() 
```
If a theme configuration file is present, this will load it into the `config` property.

#### Return value
{:.no_toc}

This is a constructor, so it returns a [`Theme`](Theme) object.

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

This is where, as a theme designer, you theme the [`Pattern`](../Patterns/Pattern) object.

By default, this pulls the (debug) messages to the pattern, so we can add it to the [`SvgDocument`](../Patterns/Pattern)
later when [`Theme::themeSvg`](Theme#themesvg) gets called.

This also adds replacements for certain strings used in the theme templates.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`Pattern`](../Patterns/Pattern) `$pattern` : The pattern object to theme.

### themeSvg

```php?start_inline=1
void themeSvg(
    \Freesewing\SvgDocument $svgDocument
)
```

This is where, as a theme designer, you theme the [`SvgDocument`](../Patterns/Pattern) object.

By default, this loads the theme templates, and adds the (debug) messages from the pattern.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`SvgDocument`](../SvgDocument) `$svgDocument` : The [`SvgDocument`](../SvgDocument) object to theme.

### themeResponse

```php?start_inline=1
void themeResponse(
    \Freesewing\Context $context
)
```

This gets the entire [`Context`](../Context) object, and should return a [`Response`](../Response) object.

#### Typical use
{:.no_toc}
Called by the service classes after rendering the pattern.

#### Parameters
{:.no_toc}

- [`Context`](../Context) `$context` : The Freesewing context object

### cleanUp

```php?start_inline=1
void cleanUp()
```

Does nothing by default.

The `cleanUp` method is called on the [`Theme`](../Themes/theme), [`Pattern`](Pattern), 
and [`Channel`](../Channels/Channel) object before terminating a request.
It's a way to tie up any loose ends you may have, like open database connections and such things.

By default, it does nothing though.

#### Typical use
{:.no_toc}

Called from [`DraftService::run`](../Services/DraftService#run), [`SampleService::run`](../Services/SampleService#run),
or [`CompareService::run`](../Services/CompareService#run).

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

Called from the [`Context`](../Context) class to add all translation
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
to their values in the [`Request`](../Request) object.
         
#### Typical use
{:.no_toc}

Maybe you want your theme to do something based on a request parameter.

This allows you to configure these options in one place.

#### Parameters
{:.no_toc}

- [`Request`](../Request) `$request` : The request object

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

- [`Pattern`](../Patterns/Pattern) `$pattern` : The pattern object

## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

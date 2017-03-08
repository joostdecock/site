---
layout: class
title: Sampler
namespace: Freesewing\Themes
tags: [theme]
permalink: /class/themes/sampler
---
## Description 

The [`Sampler`](sampler) theme is the default theme for the [`SampleService`](../services/sampleservice).

## Public methods

### themeSvg

```php?start_inline=1
void themeSvg(
    \Freesewing\SvgDocument $svgDocument
)
```

This is where, as a theme designer, you theme the [`SvgDocument`](../patterns/pattern) object.

By default, this loads the theme templates, and adds the (debug) messages from the pattern.

Here, this also loads the specific sampler CSS.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`SvgDocument`](../svgdocument) `$svgDocument` : The [`SvgDocument`](../svgdocument) object to theme.

### samplerPathStyle

```php?start_inline=1
void samplerPathStyle(
    int $step,
    int $totalSteps
)
```

Returns style info for a given `$step` in a total of `$totalSteps`.
This method is reponsible for that rainbow effect in this theme.

#### Typical use
{:.no_toc}
Called from the [`Sampler`](../sampler) class.

#### Parameters
{:.no_toc}

- `int` `$step` : The step number
- `int` `$totalSteps` : The total number of steps


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

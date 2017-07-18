---
layout: page
title: TextOnPath
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/textonpath
---
## Description 

The [`TextOnPath`](textonpath) holds data for text to be placed on/along a path.

## Example

{% include classTabs.html
    id="newTextOnPath" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="newTextOnPath-result">

{% include figure.html 
    description="Texts on paths"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Part&method=newTextOnPath"
%}

</div>
<div role="tabpanel" class="tab-pane" id="newTextOnPath-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 0, 10);
$p->newPoint(2, 100, 10);
$p->newPoint(3, 100, 50);
$p->newPoint(4, 60, 40);

$p->newTextOnPath(1,'M 1 L 2', 'This is text on a path');
$p->newTextOnPath(2,'M 2 C 3 4 1', "I'm like, super upside down right now", ['class' => 'text-center fill-warning', 'dy' => -2]);
$p->newTextOnPath(3,'M 1 C 4 3 2', "Text on a curved path is a bit more interesting", ['class' => 'text-center', 'dy' => -2]);
```

</div>
</div>

## Typical use

The [`TextOnPath`](textonpath) class is internal. Most of its methods are only
ever called from the [`Part`](part) class. 

## Public methods

### setPath

```php?start_inline=1
void setPath( 
    \Freesewing\Path $path 
)
```
Sets the `path` property to `$path` which should be a [`Path`](path).

#### Parameters
{:.no_toc}

- [`Path`](path) `$path` : The [`Path`](path) to place the text on.

### setText

```php?start_inline=1
void setText( 
    string $text 
)
```
Sets the `text` property to `$text` which should be a `string`.

This sets the actual text of the [`TextOnPath`](textonpath) object.

#### Parameters
{:.no_toc}

- `string` `$text` : The text to display.

### setAttributes

```php?start_inline=1
void setAttributes( 
    array $attributes 
)
```
Sets the `attributes` property to `$attributes` which should be a `array`
of name/value pairs.

#### Parameters
{:.no_toc}

- `array` `$attributes` : An array of attributes to add.

### getPath

```php?start_inline=1
\Freesewing\Path getPath()
```
Returns the `path` property.

#### Return value
{:.no_toc}

- [`Path`](path) `$path` : The [`Path`](path) to place the text on.

### getText

```php?start_inline=1
string getText()
```
Returns the `text` property.

#### Return value
{:.no_toc}

- `string` `$text` : The text to display.

### getAttributes

```php?start_inline=1
array setAttributes()
```
Retursn the `attributes` property.

#### Return value
{:.no_toc}

- `array` `$attributes` : An array of attributes.

## See also

- The [`Part`](part) class has methods to facilitate adding text to your paths.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

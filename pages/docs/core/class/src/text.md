---
layout: class
title: Text
namespace: Freesewing
tags: [class documentation]
permalink: /class/text
---
## Description 

The [`Text`](text) holds data for text to be placed on a pattern draft.

#### Example
{:.no_toc}

{% include classTabs.html
    id="text" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="text-result">

{% include figure.html 
    description="Text examples"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Basic&class=Text&method=generic"
%}

</div>
<div role="tabpanel" class="tab-pane" id="text-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 10, 10);

$p->newText(1, 1, "Hello world");
$p->newNote(2, 1, "I am text with some attributes set",['class' => 'text-sm fill-note', 'dy' => 6]);
```

</div>
</div>
## Typical use

The [`Text`](text) class is internal. Most of its methods are only
ever called from the [`Part`](part) class. 

## Public methods

### setAnchor

```php?start_inline=1
void setAnchor( 
    \Freesewing\Point $anchor 
)
```
Sets the `anchor` property to `$anchor` which should be a [`Point`](point).

The anchor is the location where the text will be anchored upon. 
In other words, it determines the text placement on the pattern draft.

#### Parameters
{:.no_toc}

- [`Point`](point) `$anchor` : The [`Point`](point) to anchor the text on.

### setText

```php?start_inline=1
void setText( 
    string $text 
)
```
Sets the `text` property to `$text` which should be a `string`.

This sets the actual text of the [`Text`](text) object.

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

### getAnchor

```php?start_inline=1
\Freesewing\Point getAnchor()
```
Returns the `anchor` property.

#### Return value
{:.no_toc}

- [`Point`](point) `$anchor` : The [`Point`](point) to anchor the text on.

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

- The [`Note`](note) class extends this [`Text`](text) class.
- The [`Part`](part) class has methods to facilitate adding text to your pattern draft.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


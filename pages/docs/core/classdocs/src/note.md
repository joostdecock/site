---
layout: page
title: Note
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/note
---
## Description 

A [`Note`](note) is [`Text`](text) + an arrow pointing to something.

This class extends the [`Text`](text) class and provides a way to 
add text to your pattern with a little arrow pointing to a particular
point.

It's useful for adding instructions and remarks to
your pattern about something in particular.

#### Example
{:.no_toc}

{% include classTabs.html
    id="note" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="note-result">

{% include figure.html 
    description="Three examples of a note anchored on the same point"
    url="https://api.freesewing.org/?service=draft&pattern=ClassDocs&theme=Designer&onlyPoints=1&class=Note&method=generic"
%}

</div>
<div role="tabpanel" class="tab-pane" id="note-code" markdown="1">

```php?start_inline=1
/** @var \Freesewing\Part $p */
$p->newPoint(1, 70, 30);

$p->newNote(1, 1, "I am a note",12,25,0);
$p->newNote(2, 1, "Hi there,\nI am a note too",9,25,0);
$p->newNote(3, 1, "Me too!\nBut I'm keeping my distance",4,45,10);
```

</div>
</div>

## Typical use

Use this through [`Part::newNote`](part#newnote).

## Public methods

### setPath

```php?start_inline=1
void setPath( 
    \Freesewing\Path $path
)
```
This stores a [`Path`](path) object in the `path` property.

#### Typical use
{:.no_toc}

Used in [`Part::newNote`](part#newnote).

#### Parameters
{:.no_toc}

This expects a [`Path`](path) object.

### getPath

```php?start_inline=1
\Freesewing\Path getPath()
```
This returns the [`Path`](path) object in the `path` property, if any.

#### Typical use
{:.no_toc}

Used by [`SvgRenderbot`](svgrenderbot).

#### Return value
{:.no_toc}

This returns a [`Path`](path) object.


## See also

The [`Part::newNote`](part#newnote) method is what you want to create notes.

The [`SvgRenderbot`](svgrenderbot) renders notes into SVG.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}


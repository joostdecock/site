---
layout: page
title: Typography overview
tags: [contributors, guide]
permalink: /typography
---
## Headings - This is level 2
Note that level 1 is reserved for the page heading, so level two is the
highest order heading in your text.

This is a paragraph. It spans multiple lines and is followed by another
paragraph as an example of text spacing. 

To create a paragraph in 
markdown (or more precisely, in kramdown which is what we are using)
simply leave an empty line between two blocks of text.

You create a level 2 heading like this:

```
## Your heading
```

### Level 3 heading - Level 3 is different in class documentation
This is a level 3 heading. It behaves slightly different in the class 
documentation (or any page that uses the `class` template.

It gets a border at the bottom that is filled with the thematic background.
This is because the different method headings are at level 3, and it's an
extra visual guide to navigate the class documentation pages which can be lengthy.

You create a level 3 heading like this:

```
### Your heading
```

#### Level 4 heading
The different subsections in the  class methods are level 4 headings. They need 
to break up the flow, but not too much.

You create a level 4 heading like this:

```
#### Your heading
```

##### Level 5 heading
Level 5 headings are used exceptionally. If you need a heading structure that's 5 levels 
deep, you might need to restructure your document, as it seems to be getting too 
complicated.

A place where evel 5 headings are used is as the heading of a breakout element like
a blockquote.

You create a level 5 heading like this:

```
##### Your heading
```

###### Level 6 heading
You probably should not be using these. Although there might be exceptions, 
such as a subheading in a blockquote. 

You create a level 6 heading like this:

```
###### Your heading
```

## Lists

### Table of contents
A table of contents is generated automatically by including these two lines at the end
of your document:

```md
* TOC - Do not remove this line
{:toc}
```

A table of contents is **mandatory** for pages using the `page` or `class` layouts.

### Excluding headings from your table of contents

To exclude a heading from the table of contents, give it the `notoc` class:

```md
### Do not show me in the table of contents
{:.notoc}
```

### Unordered lists
They look like this:

- This
- is
- and
- unordered list

and are made like this:

```md
- This
- is
- and
- unordered list
```

### Ordered lists
They look like this:

1. This
1. is
1. and
1. ordered list

and are made like this:

```md
1. This
1. is
1. and
1. ordered list
```

### Nesting lists
A list like this:

- This is
  - wait a minute
  - ok, go ahead
- a nested
  1. Oh no
  1. numbers
- list

Is made like this:

```md
- This is
  - wait a minute
  - ok, go ahead
- a nested
  1. Oh no
  1. numbers
- list
```

### Todo lists
Give your list the `todo` class to make a todo list.

You can also give your list items the `done`, `blocking`, or `wish` 
class to style them accordingly.

- This is a regular todo
- {:.done} This is a todo that is done
- {:.blocking} This is a todo that is important/blocking
- {:.wish} This is a todo that is nice to have/wishlist
{:.todo}

The todo list above is made like this:

```md
- This is a regular todo
- {:.done} This is a todo that is done
- {:.blocking} This is a todo that is important/blocking
- {:.wish} This is a todo that is nice to have/wishlist
{:.todo}
```

### File lists
Give your list the `files` class to make a file list.

You can also give your list items the `folder`, `code`, or `image` class to
style them accordingly.

Give your `folder` items an additional `open` class to use an icon of an open folder.

- {:.folder} vendor
- {:.code} index.php
- config.yml
- {:.folder.open} img
  - {:.image} logo.svg
{:.files}

The file list above is made like this:

```md
- {:.folder} vendor
- {:.code} index.php
- config.yml
- {:.folder.open} img
  - {:.image} logo.svg
{:.files}
```

## Blockquotes

### Standard blockquote
The standard blockquote is not for a quote, but for a tip. Because this is a documentation site
and tips are far more common than a quote.

> <h5 class="notoc">This is the blockquote</h5>
>
> This is the blockquote message.
>
> <h6 class="notoc">This is a blockquote subtitle</h6>
> Note that you need to write blockquote titles as HTML if you want to keep them out
> of the table of contents (which you typically should).
>
> That is, until somebody shows me how you can apply the `{:.notoc}` attributes
> to a title withing a blockquote, for I can't seem to figure it out.

```
> <h5 class="notoc">This is the blockquote</h5>
>
> This is the blockquote message.
>
> <h6 class="notoc">This is a blockquote subtitle</h6>
{:.notoc}
> Note that you need to write blockquote titles as HTML if you want to keep them out
> of the table of contents (which you typically should).
>
> That is, until somebody shows me how you can apply the `{:.notoc}` attributes
> to a title withing a blockquote, for I can't seem to figure it out.
```

### Quote blockquote

Give a blockquote the `quote` class to make it a quote.

> And then I said something, but I don't remember what
{:.quote}

```
> And then I said something, but I don't remember what
{:.quote}
```

### Comment blockquote

Give a blockquote the `comment` class to make it a comment.

> I would trade it all for just a little more
{:.comment}

```
> And then I said something, but I don't remember what
{:.quote}
```

## Images
While markdown has syntax to include images, you should use the `figure` include
and give your image a caption, like this:

{% include figure.html 
    description="The freesewing picture of the week"
    url="/img/potw.jpg"
%}

Here's how to do that:

```md
{% raw %}
{% include figure.html 
    description="The freesewing picture of the week"
    url="/img/potw.jpg"
%}
{% endraw %}
```

## Links

Links are made [like this](/typography).

```
Links are made [like this](/).
```

Note that links in a parapgraph are styled differently from links outside a paragraph.

To force a paragraph style link, use the `line` class on your link.
To avoid a paragraph style link, use the `noline` class on your link.

This is a [normal paragraph link](/typography), while [this one is not](/typography){:.noline}.

- This is a [normal link in a list](/typography)
- While [this one is not](/typography){:.line}

### Buttons
Buttons are links with the `btn` class and a bunch of possible extra classes 
that determine how they are styled.

[Hi, I am a button](/typography){:.btn .btn-primary .mt-4 .mb-4}
[So am I](/typography){:.btn .btn-success .mt-4 .mb-4}

Please refer to [the Bootstrap documentation](https://v4-alpha.getbootstrap.com/components/buttons/)
 for a complete overview on how to style buttons.

### Class links
Place your link inside backticks to render it as a link to the class documentation.

The [`Part`](/class/part) class.

```
The [`Part`](/class/src/part) class.
```

For linking to methods, use the correct anchor link, and the `::` notation:

The [`Part::newPoint`](/class/part#newpoint) method.

```
The [`Part::newPoint`](/class/part#newpoint) method.
```

### Anchor links
Anchor link, as generated by automatically in the table of contents, are always lowercase.

Spaces are replaced with `-`, so the anchor link to this title is `#anchor-links`.

### Menu links
To create a link to open the menu, give it the `oc-toggle` class and one of either `left` or `right` 
depending on whether you want to open the menu (left) or the Table of Contents (right).

[Open the menu](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .left }
[Open the ToC](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .right .on-oc-right}

```
[Open the menu](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .left }
[Open the ToC](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .right .on-oc-right}
```

> <h5 class="notoc">Display things only when the right area is off-canvas</h5>
>
> Note that you can only open the table of contents when it's collapsed off-canvas.
> You can add the `on-oc-right` class to anything, and it will only show up when the 
> right area is off-canvas.
>
> If you are reading this on mobile, you will see two buttons above. On a desktop, you'll 
> see only one. But if you make the browser window narrower to the point the table of contents
> goes off-canvas, the second button will show up. 


## Code

Enclose something `between backticks` for an inline code snippet.

```
Enclose something `between backticks` for an inline code snippet.
```

For a code block, use three backticks on a seperate line to start and end your code block.
Also note that your code block must be preceded by a blank line. 

<pre>
<code>
```
your code here
```
</code>
</pre>
{:.highlight}

When using a codeblock, you can specify a language after the opening three backticks, like this:

<pre>
<code>
```html
your html code here
```
</code>
</pre>
{:.highlight}

When using PHP, syntax highlighting doesn't kick in until after a `<?php` opening tag.
To get syntax highlighting from the start, use this:

<pre>
<code>
```php?start_inline=1
your php code here
```
</code>
</pre>
{:.highlight}

## Tabs

You can also include HTML in your markdown code. We tend to avoid it, but sometimes we have to.

Like to add tabs for example, like these:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#tab1" role="tab" data-toggle="tab">Tab 1</a></li>
    <li class="nav-item"><a class="nav-link" href="#tab2" role="tab" data-toggle="tab">Tab 2</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="tab1" markdown="1">
Note that the ID of your tabs must be unique on the entire page. So if you're adding
tabs in more than one place on a page, make sure to give them descriptive IDs.

The code for how to include tabs is in tab 2.
</div>
<div role="tabpanel" class="tab-pane" id="tab2" markdown="1">

```html
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#tab1" role="tab" data-toggle="tab">Tab 1</a></li>
    <li class="nav-item"><a class="nav-link" href="#tab2" role="tab" data-toggle="tab">Tab 2</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="tab1" markdown="1">

Tab1 content here

</div>
<div role="tabpanel" class="tab-pane" id="tab2" markdown="1">

Tab2 content here

</div>
</div>

```
</div>
</div>


* TOC - Do not remove this line
{:toc}

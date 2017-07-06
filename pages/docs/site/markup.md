---
layout: page
title: Site markup
tags: [site docs]
permalink: /docs/site/markup
---

## Types of markup

Before we start, you should know that different types of markup are mixed together to generate this website.

### Liquid
[Liquid](https://shopify.github.io/liquid/) is the template language used in Jekyll. 

While it's mostly used in Jekyll layouts, we sometimes also use it in our content.
For example, inserting images can be done easily with our liquid figure include (see [images](#images) below).

You'll recognize liquid by its opening and closing tags. Liquid uses {% raw %}`{% %}`{% endraw %} for logic and {% raw %}`{{ }}`{% endraw %} for output.

### Kramdown
We use [kramdown](https://kramdown.gettalong.org/), which is a flavour of Markdown that comes with some extras.

Kramdown allows for manipulation of attributes, something we use relatively often to add classes to elements.

Have a look at the [todo lists](#todo-lists) or our various [blockquote styles](#blockquotes) for examples.

You'll reconize kramdown by its opening and closting tags: `{: }`


### HTML and CSS
This markup sits at the lowest level, and probably needs no introduction.


## Headings
This heading just above is a level 2 heading.

You create a level 2 heading like this:

```
## Your heading
```

> Note that level 1 is reserved for the page heading, so level two is the
> highest order heading in your text.
{:.comment}

The number of `#` characters at the start of the line controls the level of the heading.
So you can probably figure out how to make these:

### Level 3 heading 
{:.no_toc}
This is a level 3 heading. 

#### Level 4 heading
{:.no_toc}
This is a level 4 heading.

Indeed, you create them like this:

```
### Level 3 heading
This is a level 3 heading.

#### Level 4 heading
This is a level 4 heading.
```

Level 5 and 6 headings are used exceptionally. If you need a heading structure that's 5 levels 
deep, you might need to restructure your document, as it seems to be getting too 
complicated.

Also, the auto-generated table of contents won't display headings below level 4.

> <h5>This is a level 5 heading</h5>
> A place where level 5 headings are used is as the heading of a breakout element like
> this blockquote.
> <h6>This is a level 6 heading</h6>
> A level 6 heading is a good subtitle in a blockquote.
{:.tip}

## Paragraphs

This is a paragraph. It spans multiple lines and is followed by another
paragraph as an example of text spacing. 

To create a paragraph simply leave an empty line between two blocks of text.

## Lists

### Unordered lists
Unordered lists look like this:

- This
- is
- an
- unordered list

and are made like this:

```md
- This
- is
- an
- unordered list
```

### Ordered lists
Ordered lists look like this:

1. This
1. is
1. an
1. ordered list

and are made like this:

```md
1. This
1. is
1. an
1. ordered list
```

### Nesting lists
You can nest lists. For example this list:

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

You can also give your list items the `done`, `ongoing`, `blocking`, or `wish` 
class to style them accordingly.

- This is a regular todo
- {:.done} This is a todo that is done
- {:.ongoing} This is a todo that is ongoing
- {:.blocking} This is a todo that is important/blocking
- {:.wish} This is a todo that is nice to have/wishlist
{:.todo}

The todo list above is made like this:

```md
- This is a regular todo
- {:.done} This is a todo that is done
- {:.ongoing} This is a todo that is ongoing
- {:.blocking} This is a todo that is important/blocking
- {:.wish} This is a todo that is nice to have/wishlist
{:.todo}
```
> We're using kramdown's `{: }` syntax here. To add a class, use `.classname`
{:.tip}

### File lists
Give your list the `files` class to make a file list.

You can also give your list items the `folder`, `repo`, `code`, or `image` class to
style them accordingly.

Give your `folder` items an additional `open` class to use an icon of an open folder.

- {:.folder} vendor
- {:.repo} repository
- {:.code} index.php
- config.yml
- {:.folder.open} img
  - {:.image} logo.svg
{:.files}

The file list above is made like this:

```md
- {:.folder} vendor
- {:.repo} repository
- {:.code} index.php
- config.yml
- {:.folder.open} img
  - {:.image} logo.svg
{:.files}
```

## Blockquotes

Blockquotes are used **a lot** on freesewing. 
That's because this is for a large part a documentation site, and blockquotes are a handy way to make some text stand out.

Furthermore, they are trivial to add in markdown as you simply need to start your line with `> `

### Standard blockquote
The standard blockquote is shown below. While you can use it, blockquotes are 
most often used in combination with one of the classes shown below the generic example.

> ##### This is the blockquote
>
> This is the blockquote message.
>
> ###### This is a blockquote subtitle
>
> More text here.

```
> ##### This is the blockquote
>
> This is the blockquote message.
>
> ###### This is a blockquote subtitle
>
> More text here.
```

### Styles blockquotes

Add a class to blockquotes to change their look and purpose.

#### tip
> Add the `tip` class to your blockquote to show a tip.
>
> Remember, we can use the kramdown `{:.classname}` syntax to accomplish this.
{:.tip}


```
> Add the `tip` class to your blockquote to show a tip.
>
> Remember, we can use the kramdown `{:.classname}` syntax to accomplish this.
{:.tip}
```

#### comment

> Add the `comment` class to include a comment.
{:.comment}

This is not to be confused with comments by users.

#### question

> Add the `question` class to raise a question.
{:.question}

#### quote

> Add the `quote` class when inserting a quote.
{:.quote}

Note that on wider screens, these quotes are turned into pull-quotes that take up half the width and are floated right.
On mobile, they behave as any other blockquote.

#### warning

> Add the `warning` class to display a warning.
{:.warning}

#### cut

> Add the `cut` class for remarks concerning pattern cutting.
{:.cut}

#### option

> Add the `option` class for remarks concerning pattern options.
{:.option}

#### measure

> Add the `measure` class for remarks concerning measurements.
{:.measure}

#### print

> Add the `print` class for remarks concerning printing.
{:.print}

#### love

> Add the `love` class when declaring your love for something.
{:.love}

#### paperless

> Add the `paperless` class for remarks related to paperless patterns.
{:.paperless}

#### share

> Add the `share` for social sharing.
{:.share}

#### error

> Add the `error` class to show an error.
{:.error}

#### cc

> Add the `cc` class when giving credit to creative commons images.
{:.cc}

#### nocc

> Add the `nocc` class to give credit for images that are not creative commons.
{:.nocc}

#### fork

> Add the `fork` class for remarks about or links to draft forks.
{:.fork}

#### link

> Add the `link` class to make a link really stand out.
{:.link}

#### Custom blockquotes
The blockquote styles above enforce consistency throughout the site.

But if you want, you can create your own custom blockquote with our blockquotes include.

{% include blockquote.html
  bg='linear-gradient(to right, rgba(102,63,149,1) 0%, rgba(91,192,222,1) 100%);'
  icon='handshake-o'
  tcolor='rgba(255, 255, 255, 0.8)'
  icolor='#666'
  content="<h5>This is a custom blockquote</h5><p>Remember, just because you can doesn't mean you should.</p>"
%}

Here's how to do that:

{% raw %}
```liquid
{% include blockquote.html
  bg='linear-gradient(to right, rgba(102,63,149,1) 0%, rgba(91,192,222,1) 100%);'
  icon='handshake-o'
  tcolor='rgba(255, 255, 255, 0.8)'
  icolor='#666'
  content="<h5>This is a custom blockquote</h5><p>Remember, just because you can doesn't mean you should.</p>"
%}
```
{% endraw %}

> Check the [includes documentation](/docs/site/includes) for more details.
{:.tip}

## Images
While markdown has syntax to include images, you should typically use the `figure` include
and give your image a caption, like this:

{% include figure.html 
    description="The freesewing picture of the week"
    url="/img/potw/potw.jpg"
%}

Here's how to do that:

```md
{% raw %}{% include figure.html 
    description="The freesewing picture of the week"
    url="/img/potw/potw.jpg"
%}{% endraw %}
```
> Check the [includes documentation](/docs/site/includes) for more details.
{:.tip}

## Links

Links are made [like this](/docs/site/typography).

```
Links are made [like this](/docs/site/typograhy).
```

Note that links in a parapgraph are styled differently from links outside a paragraph.

To force a paragraph style link, use the `line` class on your link.
To avoid a paragraph style link, use the `noline` class on your link.

This is a [normal paragraph link](/docs/site/typography), while [this one is not](/docs/site/typography){:.noline}.

- This is a [normal link in a list](/docs/site/typography)
- While [this one is not](/docs/site/typography){:.line}

### Buttons
Buttons are links with the `btn` class and a bunch of possible extra classes 
that determine how they are styled.

[Hi, I am a button](/docs/site/typography){:.btn .btn-primary .mt-4 .mb-4}
[So am I](/docs/site/typography){:.btn .btn-success .mt-4 .mb-4}

Please refer to [the Bootstrap documentation](https://v4-alpha.getbootstrap.com/components/buttons/)
 for a complete overview on how to style buttons.

### Class links
Place your link text inside backticks to render it as a link to the class documentation.

The [`Part`](/docs/core/classdocs/src/part) class.

```
The [`Part`](/docs/core/classdocs/src/src/part) class.
```

For linking to methods, use the correct anchor link, and the `::` notation:

The [`Part::newPoint`](/docs/core/classdocs/src/part#newpoint) method.

```
The [`Part::newPoint`](/docs/core/classdocs/src/part#newpoint) method.
```

### Anchor links
Anchor link, as generated by automatically in the table of contents, are always lowercase.

Spaces are replaced with `-`, so the anchor link to this title is `#anchor-links`.

Note that all titles within the `#content` element on the page get a link element next to them to facilitate deep-linking.

### Menu links
To create a link to open the menu, give it the `oc-toggle` class and one of either `left` or `right` 
depending on whether you want to open the menu (left) or the Table of Contents (right).

[Open the menu](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .left }
[Open the ToC](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .right .on-oc-right}

```
[Open the menu](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .left }
[Open the ToC](#menu-links){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .right .on-oc-right}
```

### Guide links
The guides as listed on the top of [the documentation overview](/docs) open in a modal window 
and require a specific type of link.

Specifically, give your link the `.tour-guide` class and store the guide to open in the `data-episode` attribute.

For example, 
[this](#guide-links){:.tour-guide}{:data-episode='mobile-nav'}
opens the mobile navigation guide.

```md
For example, 
[this](#guide-links){:.tour-guide}{:data-episode='mobile-nav'}
opens the mobile navigation guide.
```

> ##### Use an anchor link
> To be semantically correct, your link should link to something.
> So use an anchor link to a nearby anchor.
{:.comment}

> ##### Leave out the episode to open the episode list
> If you don't specify the `data-episode` attribute, the episode list will be opened.
{:.tip}

## Code

Enclose something `between backticks` for an inline code snippet.

```
Enclose something `between backticks` for an inline code snippet.
```

For a code block, use three backticks on a seperate line to start and end your code block.
Also note that your code block must be preceded by a blank line. 

<div class="highlighter-rouge">
<pre class="highlight">
<code>
```
your code here
```
</code>
</pre>
</div>

When using a codeblock, you can specify a language after the opening three backticks, like this:

<div class="highlighter-rouge">
<pre class="highlight">
<code>
```html
your html code here
```
</code>
</pre>
</div>

When using PHP, syntax highlighting doesn't kick in until after a `<?php` opening tag.
To get syntax highlighting from the start, use this:

<div class="highlighter-rouge">
<pre class="highlight">
<code>
```php?start_inline=1
your php code here
```
</code>
</pre>
</div>

## Tabs

You can also include HTML in your markdown code. We prefer not to, but sometimes we have to.

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

## Table of contents
A table of contents is generated automatically by including these two lines at the end
of your document:

```md
* TOC - Do not remove this line
{:toc}
```

A table of contents is **mandatory** for pages using the `page` layout.

> <h5>Don't let yout Table of contents follow a list</h5>
> 
> If the last element on your page is a list (bullet points or a numbered list)
> your table of contents won't be generated because the parser will think it's
> part of the preceding list.
> 
> In that case, you can move the 2 lines that trigger the TOC to the start of the document.
>
> Indeed, they can appear anywhere in your page, it's just a convention to have them at the bottom.
{: .warning }

### Excluding headings from your table of contents

To exclude a heading from the table of contents, give it the `no_toc` class:

```md
### Do not show me in the table of contents
{:.no_toc}
```

> ##### Not needed for blockquotes
>
> Remember that the TOC only displays headings of levels 1 to 4.
> As headings like the one above are level 5, they will never should up in the TOC.
{:.tip}

## Conditional rendering

> ##### Hidden doesn't mean it's not there
>
> These are all techniques to hide content from view.
> But that doesn't mean the content is not there, it's merely not shown.
>
> In other words, don't depend on this to hide secrets.
{:.warning}


### Based on screen size

Screen real-estate is an important factor when working on your content.

If responsive design isn't enough for you, there's two classes to outright hide
content based on screen size. They are `not-on-small` and `only-on-small`.

Screens up to 767px will show conent with the `only-on-small` class, and will hide content with the `not-on-small` class.

Screen from 768px upwards will hide content with the `only-on-small` class, yet will show content with the `not-on-small` class.

### Based on user state

Three classes are available to show or hide things based on the user state. They are:

 - `visitor-only`
 - `logged-in-only`
 - `logged-out-only`

Content with the `visitor-only` class is only show to a user who has never logged in on the site.

Content with the `logged-in-only` class is only show to a user who is currently logged in.

Content with the `logged-out-only` class is only show to a user who is not currently logged in, yet has logged in before.

### Display things only when the right area is off-canvas

On some pages, the table of contents will collapse of canvas on mobile.

You can add the `on-oc-right` class to anything, and it will only show up when the 
right area is off-canvas.

[Open the menu](#display-things-only-when-the-right-area-is-off-canvas){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .left }
[Open the ToC](#display-things-only-when-the-right-area-is-off-canvas){:.btn .btn-primary .mt-4 .mb-4 .oc-toggle .right .on-oc-right}

If you are reading this on mobile, you will see two buttons above. On a desktop, you'll 
see only one. But if you make the browser window narrower to the point the table of contents
goes off-canvas, the second button will show up. 

* TOC - Do not remove this line
{:toc}

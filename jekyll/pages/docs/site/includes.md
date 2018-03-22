---
layout: page
title: Jekyll includes
tags: [site docs]
permalink: /docs/site/includes
---

## About

Jekyll, the static site generator that we use for this site, has a feature caled **includes**,
snippets of code that you can reuse (and include) in your layouts and content.

The page provides an overview of the available includes. 

> ##### Jekyll include documentation
> Documentation on the includes feature itself is available [on the Jekyll site](https://jekyllrb.com/docs/includes/).
{:.link}

## Content includes

These can be used freely in your content.

### bezier-demo.html

This is only used in [our design tutorial](/docs/designer/tutorial/part-1) and injects a 
interactive Bezier curve into the page, made up of SVG and JavaScript.

{% include classTabs.html
    id="bezier-demo" 
%}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="bezier-demo-result" markdown="1">
{% include bezier-demo.html %}
</div>
<div role="tabpanel" class="tab-pane" id="bezier-demo-code" markdown="1">
{% raw %}
```liquid
{% include bezier-demo.html %}
```
{% endraw %}
</div>
</div>

### blockquote.html

{% include classTabs.html id="blockquote" %}

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="blockquote-result" markdown="1">
{% include blockquote.html
  bg='linear-gradient(to right, rgba(102,63,149,1) 0%, rgba(91,192,222,1) 100%);'
  icon='handshake-o'
  tcolor='rgba(255, 255, 255, 0.8)'
  icolor='#666'
  content="<h5>This is a custom blockquote</h5><p>Remember, just because you can doesn't mean you should.</p>"
%}
</div>
<div role="tabpanel" class="tab-pane" id="blockquote-code" markdown="1">
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
</div>
</div>

### classTabs.html

These are called `classTabs.html` because they were oringinally created for the class documentation.

However, you can use them wherever you want a set of Result/Code tabs.

{% include classTabs.html id="classtabs" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="classtabs-result" markdown="1">
This example uses the `classTabs.html` include (so meta).
</div>
<div role="tabpanel" class="tab-pane" id="classtabs-code" markdown="1">
{% raw %}
```liquid
{% include classTabs.html id="classtabs" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="classtabs-result" markdown="1">
This example uses the `classTabs.html` include (so meta).
</div>
<div role="tabpanel" class="tab-pane" id="classtabs-code" markdown="1">

    INCEPTION ALERT

</div>
</div>
```
{% endraw %}
</div>
</div>

> ##### The include is only the start
>
> The `classTabs.html` adds the tabs to your content, but you still have to provide the actual content.
>
> The example above shows the include together with the markup required for the tab panes.
> Please note that you have the ID you pass to the include must match with the ID in the -result and -code panes.
>
> Also note that I couldn't include the actual code because that would be a endless recursion situation.
> Hence the **Inception alert** in the code.
{:.warning}

### embed.html

A responsive embed for things like YouTube.

{% include classTabs.html id="embed" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="embed-result" markdown="1">
{% include embed.html src="https://www.youtube.com/embed/z5rRZdiu1UE?rel=0&amp;controls=0&amp;showinfo=0?ecver=1" %}
</div>
<div role="tabpanel" class="tab-pane" id="embed-code" markdown="1">
{% raw %}
```liquid
{% include embed.html src="https://www.youtube.com/embed/z5rRZdiu1UE?rel=0&amp;controls=0&amp;showinfo=0?ecver=1" %}
```
{% endraw %}
</div>
</div>

### figure.html

A responsive image with optional caption.

{% include classTabs.html id="figure" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="figure-result" markdown="1">
{% include figure.html 
    url="/img/potw/potw.jpg" 
    description="The freesewing picture of the week" 
%}
</div>
<div role="tabpanel" class="tab-pane" id="figure-code" markdown="1">
{% raw %}
```liquid
{% include figure.html 
    url="/img/potw.jpg" 
    description="The freesewing picture of the week" 
%}
```
{% endraw %}
</div>
</div>

### icon.html

A way to insert a FontAwesome icon.

{% include classTabs.html id="icon" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="icon-result" markdown="1">
{% include icon.html icon="search" %}
</div>
<div role="tabpanel" class="tab-pane" id="icon-code" markdown="1">
{% raw %}
```liquid
{% include icon.html icon="search" %}
```
{% endraw %}
</div>
</div>

### icon.html

This exists because it's boring to type the same thing over an over.

{% include classTabs.html id="scalebox" %}
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="scalebox-result" markdown="1">
{% include scalebox.html %}
</div>
<div role="tabpanel" class="tab-pane" id="scalebox-code" markdown="1">
{% raw %}
```liquid
{% include scalebox.html %}
```
{% endraw %}
</div>
</div>

## Layout includes

The following includes are responsible for rendering (part of) the layout:

 - blogfigure.html
 - breadcrumbs.html
 - card.html
 - classFooter.html
 - completed.html
 - download-draft.html
 - end-page.html
 - footer.html
 - hamburger.html
 - header.html
 - icons/menu.svg
 - icons/toc.svg
 - mando.html
 - measurefigure.html
 - measurement.html
 - measurements/\*
 - measurementTabs.html
 - methodExample.html
 - modal.html
 - oc-overlay.html
 - pagelist.html
 - pattern-list.html
 - pattern-option.html
 - scroller.html
 - sharing-buttons.html
 - side-menu.html
 - start-page.html
 - tags.html
 - tocburger.html
 - top-menu.html

These should not be used in regular content, as they will break things.

## Deprecated includes

These includes are being phased out:

 - api.html 
 - exampleTabs.html
 - cover-band.html
 - demo-card.html
 - image.html
 - placeholder.html
 - units.html

Please do not use them in any new content, because we're trying to get rid of them and remove them.

* TOC - Do not remove this line
{:toc}

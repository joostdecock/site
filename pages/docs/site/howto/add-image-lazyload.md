---
layout: page
title: Adding a lazyloaded image to the site
tags: [site docs, howto]
permalink: /docs/site/howto/add-image-lazyload
---

> <h5>Checklist</h5>
> 
>   - Download the original image in a resolution around 2000px or resize it to that size
>   - Save it as `high_[filename]`
>   - Resize `high_[filename]` as  `med_[filename]` (1000px), `low_[filename]` (500px), and `lqip_[filename]` (100px)
> {:.todo}
{:.tip}

> > <h5>About lazyloading</h5>
> >
> > Lazyloading is a technique that loads images _on-demand_. It has two implications:
> >
> > - Images are only loaded when they are scrolled into view. In other words, an image at the bottom of the page won't be loaded initially, only when the user scrolls down.
> > - Different sized images are loaded automatically, based on the place the images takes up on the screen.
> >
> > Lazyloading depends on JavaScript, and we use the [lazysizes](https://github.com/aFarkas/lazysizes) JavaScript loader.
> {:.comment}
> 
> > <h5>Where to use lazyloading</h5>
> > 
> > In principle, all images can be lazyloaded. However, in practice, we only apply lazyloading for **blog posts** and **showcases**, as those typically include hi-res pictures.
> {:.tip}

## Get your images

For al images that are to be lazyloaded, you need four files for the same image. They are:

  - `high_[filename]` : The original image. More or less 2000px along the longest side.
  - `med_[filename]` : Medium resolution image. 1000px along the longest side.
  - `low_[filename]` : Low resolution image. 500px along the longest side.
  - `lqip_[filename]` : Low-quality image placeholder (LQIP). 100px along the longest side.

### Get the original

First you'll need the original, high-quality, image. Try to get it in a size around 2000px.
It doesn't have to be exact (2048px is common).

Save the file in the directory it should go and name it `high_[filename]`.

If the original image is `flower.jpg`, save it as `high_flower.jpg`.

> <h5>Where should I save my image?</h5>
> Have a look at the 
> [adding a blog post](./add-post) or [adding a showcase](./add-showcase) howtos if you don't know where images should go.
{:.tip}

### Resize

Continuing with our `high_flower.jpg` example, run the following commands:

```
convert high_flower.jpg -resize 1000 med_flower.jpg
convert high_flower.jpg -resize 500 low_flower.jpg
convert high_flower.jpg -resize 100 lqip_flower.jpg
```

This will create the three other sizes for you.

If your original image is much larger than 2000px, you can in addition run this command:

```
convert high_flower.jpg -resize 2000 high_flower.jpg
```

> <h5>You'll need ImageMagick for this</h5>
>
> The `convert` command is part of ImageMagick. If you don't have ImageMagick on your system, you can 
> either install it, or use some other way to resize the images.
{:.warning}

## Add your post/showcase

With your image files in place, all that is left to do is add your blog post or showcase.

Check the [adding a blog post](./add-post) or [adding a showcase](./add-showcase) howtos for info on how to do that.

* TOC - Do not remove this line
{:toc}

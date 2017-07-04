---
layout: page
title: Adding a blog post to the site
tags: [site docs, howto]
permalink: /docs/site/howto/add-post
---

> <h5>Checklist</h5>
> 
>   - Gather your info:
>     - date
>     - title
>     - link title
>     - slug
>     - image
>     - caption
>     - author
>     - category
>     - blurb
>   - Create your blog post directory at `/_posts/[date]-[slug]`
>   - In the directory, create the `index.md` file that will hold your blog post.
>   - Add the front matter to the file. See below for an example, or check another blog post.
>   - Create the image directory at `/img/blog/[slug]`
>   - Add the images to it according to the [lazyloading requirements](./add-image-lazyload)
>   - Write your blogpost in markdown
> {:.todo}
{:.tip}

## Gather your info

Before you start adding your blog post, make sure you have all of this:

  - A publication **date**: You can choose, but you need one, and it must be in the yyyy-mm-dd format. 
  - A **title**: Go crazy, long titles are encouraged.
  - A **link title**: A short verion of the title to use in links.
  - A **slug**: The part of the URL that identifies your blog post
  - An **image**: This will be [lazyloaded](./add-image-lazyload), so you'll need the part of the name shared between all formats.
  - A **caption**: For the image. Could be image credits or some description. 
  - An **author**: You can pick your _nom de plume_ but be consistent and use the same across posts.
  - A **category** Don't pick categories willy-nilly. Stick to [the existing categories](/blog/category/), or ask around before creating a new one.
  - A **blurb**: A short summary of the article that's used as a teaser.

Let's use [this blog post](/blog/freesewing-goes-jamstack/) as an example throughout this howto:

  - **date**: 2017-06-12
  - **title**: We're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, and I hope you like JAMstack too
  - **link title** I hope you like JAMstack too
  - **slug**: freesewing-goes-jamstack
  - **image**: pipes.jpg
  - **caption**: Picture by <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>
  - **author**: joostdecock
  - **category** site
  - **blurb** Freesewing.org goes JAMstack, which begs the question: What does that even mean?

## Create the post directory

Your blog post goes into its own directory under `/_posts`. The format of the directory is `[date]-[slug]`.

In our example, the `date` is `2017-06-12` and the `slug` is `freesewing-goes-jamstack`, so you would need to create the directory `/_posts/2017-06-12-freesewing-goes-jamstack`

Adapt the example and create your own directory as `/_posts/[date]-[slug]` inserting your post's date and slug.

## Create the post file

Inside your newly created directory, create an `index.md` file. This will hold our post content.

The frontmatter in the post is important. For our example, it looks like this:

```
---
layout: blog
title: We're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, and I hope you like JAMstack too
linktitle: I hope you like JAMstack too
img: pipes.jpg
caption: "Picture by <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
author: joostdecock
category: site
blurb: "Freesewing.org goes JAMstack, which begs the question: What does that even mean?"
---
```

> <h5>Frontmatter matters</h5>
>
> Pay attention to the names, you must copy the exactly. Use **img** not image, and **linktitle** not link title
{:.tip}

## Create the image directory

Our blog post's images are going in their own directory under `/img/blog/[slug]`.

Create that directory, in our example it's `/img/blog/freesewing-goes-jamstack/`

## Add the images

In the directory you've just created, add all resolutions of your main image.

In our example that's:

 - `high_pipes.jpg`
 - `med_pipes.jpg`
 - `low_pipes.jpg`
 - `lqip_pipes.jpg`

> <h5>Lazyloading images</h5>
> 
> Blog images are lazyloaded, which is why we need these 4 versions of the same image.
>
> Check [the howto on adding a lazyloaded image](./add-image-lazyload) for instructions on how to add these images.
{:.tip}

## Write your blog post

Arguable, this is the most important part.

> <h5>Use markdown</h5>
> Remember that content (including blog posts) should be written in markdown.
{:.comment}

> <h5>Site markup</h5>
> For reference, [here's an overview of common markup used throughout the site](/docs/site/markup).
{:.tip}

## Additional images

The blog post's main image is included in the front matter, and will automatically be injected in the layout.

However, you may want to add more pictures to your blog post. And when you do, you should use the `blogfigure.html` include.
This will not only make sure your images are properly formatted, it will also cause them to be lazyloaded.

Here's a sample:

{% raw %}
```liquid
{% include blogfigure.html
  img='baloon.jpg'
  caption='This is the caption'
%}
```
{% endraw %}


> <h5>Caption is optional</h5>
>
> If you don't provide a caption (just remove the entire line, rather than provide an empty caption) it will not be rendered.
{:.tip}

Remember, this follows the same rules as the main image, and lazyloaded images in general.
Which means that when you use `baloon.jpg` in your include, you should add these 4 images to your post's image directory:

 - `high_baloon.jpg`
 - `med_baloon.jpg`
 - `low_baloon.jpg`
 - `lqip_baloon.jpg`

The [howto on adding lazyloaded images](./add-image-lazyload) has more info on how to generate these 4 images.

* TOC - Do not remove this line
{:toc}

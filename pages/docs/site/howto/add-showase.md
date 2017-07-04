---
layout: page
title: Adding a showcase to the site
tags: [site docs, howto]
permalink: /docs/site/howto/add-showcase
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

> <h5>Ask permission</h5>
>
> While we love to showcase makes from the community, it's important to ask permission to do so first.
>
> Fortunately, most people are happy to be showcased.
{:.warning}

## Gather your info

Before you start adding your showcase, make sure you have all of this:

  - A publication **date**: You can choose, but you need one, and it must be in the yyyy-mm-dd format. 
  - A **title**: Go crazy, long titles are encouraged.
  - A **slug**: The part of the URL that identifies your showcase
  - An **image**: This will be [lazyloaded](./add-image-lazyload), so you'll need the part of the name shared between all formats.
  - A **caption**: For the image. Could be image credits or some description. 
  - An **author**: This is the name of the maker. Be consistent and use the same name across showcases of the same maker.
  - A **category** This is the handle of the pattern being showcased.

Let's use [this showcase](/showcase/husband-hugo/) as an example throughout this howto:

  - **date**: 2015-12-28
  - **title**: A hugo for the husband, by uneanneedecouture
  - **slug**: husband-hugo
  - **image**: showcase.jpg
  - **caption**: Is it me or is Hugo a popular make for husbands?
  - **author**: uneanneedecouture
  - **category** hugo

## Create the showcase directory

Your showcase goes into its own directory under `/_showcases`. The format of the directory is `[date]-[slug]`.

In our example, the `date` is `2015-12-28` and the `slug` is `husband-hugo`, so you would need to create the directory `/_showcases/2015-12-28-husband-hugo`

Adapt the example and create your own directory as `/_showcases/[date]-[slug]` inserting your showcase's date and slug.

## Create the showcase file

Inside your newly created directory, create an `index.md` file. This will hold our showcase content.

The frontmatter in the file is important. For our example, it looks like this:

```
---
layout: showcase
title: A hugo for the husband, by uneanneedecouture
img: showcase.jpg
caption: Is it me or is Hugo a popular make for husbands?
category: hugo
author: uneanneedecouture
---
```

> <h5>Frontmatter matters</h5>
>
> Pay attention to the names, you must copy the exactly. Use **img** not image.
{:.tip}

## Create the image directory

Our showcase's images are going in their own directory under `/img/showcase/[slug]`.

Create that directory, in our example it's `/img/showcase/husband-hugo/`

## Add the images

In the directory you've just created, add all resolutions of your main image.

In our example that's:

 - `high_showcase.jpg`
 - `med_showcase.jpg`
 - `low_showcase.jpg`
 - `lqip_showcase.jpg`

> <h5>Lazyloading images</h5>
> 
> Showcase images are lazyloaded, which is why we need these 4 versions of the same image.
>
> Check [the howto on adding a lazyloaded image](./add-image-lazyload) for instructions on how to add these images.
{:.tip}

## Add your showcase content

Always give credit and provide a link to the original maker. If the image is from social media, link to the original post.

Use a link-styled blockquote to do this. Have a look at [our example](/showcase/husband-hugo/) for details.

> <h5>Use markdown</h5>
> Remember that content (including showcases) should be written in markdown.
{:.comment}

> <h5>Site markup</h5>
> For reference, [here's an overview of common markup used throughout the site](/docs/site/markup).
{:.tip}

## Additional images

The showcase's main image is included in the front matter, and will automatically be injected in the layout.

However, you may want to add more pictures to the showcase. And when you do, you should use the `blogfigure.html` include.
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

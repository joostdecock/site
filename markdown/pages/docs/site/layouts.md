---
layout: page
title: Jekyll layouts
tags: [site docs]
permalink: /docs/site/layouts
---

## About

Jekyll, the static site generator that we use for this site, uses different layouts for different pages.

This page presents an overview of the available layouts.

## Layouts you can use

### blog

Mandatory layout for all blog posts (and only for blog posts). 

For a full description, please refer to 
[the how-to on adding a blog post to the site](/docs/site/howto/add-post).

Below is an example of the frontmatter:

```
---
layout: blog
title: Announcing freesewing, an open source platform for made-to-measure sewing patterns
linktitle: Announcing freesewing
img: freesewing-logo.jpg
caption: The freesewing logo
author: joostdecock
category: core
blurb: "I am are proud to announce freesewing core v1.0.0 and the accompanying documentation that describes the freesewing project in detail."
---
```

### cards
This is a bare layout with only a header and footer between which you do whatever you want.

Pages using this layout include [the front page](/), the [new draft](/draft) form, and [the donate page](/donate).

A frontmatter example is included below:

```
---
layout: cards
title: Donate to freesewing
permalink: /donate
nocomments: true
---
```
> ##### Comments or not?
>
> To disable commnents on a page, add `nocomments: true` to the 
> page frontmatter as in the example above.
{:.tip}

### onecol
This is a layout for a page without a table of contents. It centers the content in
one column.

Pages using this layout include all sewing documentation (such as [the topstitching page](/docs/sewing/topstitching)),
the measurements documentation (such as [the inseam page](/docs/measurements/inseam), and pages that have little to
no content, such as [the maker documentation for Brian](/docs/patterns/brian). 

A frontmatter example is included below:

```
---
layout: onecol
title: Topstitching
tags: [sewing docs]
permalink: /docs/sewing/topstitching
---
```

### page
This is the layout used by most pages, including this one. It's a main content
column, and a right column with the table of contents, which goes off-canvas on mobile.

Pages using this layout include [the about page](/about) and all class documentation (such as [the core Part class](/docs/core/classdocs/src/part).

A frontmatter example is included below:

```
---
layout: page
title: Jekyll layouts
tags: [site docs]
permalink: /docs/site/layouts
---
```

### pattern
This is the layout used by all pattern pages, such as [Brian](/patterns/brian), [Simon](/patterns/simon), or [Tamiko](/patterns/tamiko).

This layout requires the **tagline** and **description** to be set in the frontmatter. Here's an example:

A frontmatter example is included below:

```
---
layout: pattern
title: Tamiko Top
permalink: /patterns/tamiko
tagline: A zero-waste top for women and fashion-forward men
description: "<p>This is a draped top that you can extend to dress length.</p><p>It's a zero waste top, and a very quick make.</p>"
---
```

### showcase
Mandatory layout for all showcase posts (and only for showcase posts). 

For a full description, please refer to 
[the how-to on adding a showcase to the site](/docs/site/howto/add-showcase).

Below is an example of the frontmatter:

```
---
title: A hugo for the husband, by uneanneedecouture
img: showcase.jpg
caption: Is it me or is Hugo a popular make for husbands?
category: hugo
layout: showcase
author: uneanneedecouture
---
```

### showcase-maker

Mandatory layout for all showcase-by-maker overview pages (and only for these pages). 

For a full description, please refer to 
[the how-to on adding a showcase to the site](/docs/site/howto/add-showcase).

Below is an example of the frontmatter:

```
---
layout: showcase-maker
title: Showcases by zephine_malvimavie
permalink: /showcase/maker/zephine_malvimavie
---
```

### showcase-pattern

Mandatory layout for all showcase-by-pattern overview pages (and only for these pages). 

For a full description, please refer to 
[the how-to on adding a showcase to the site](/docs/site/howto/add-showcase).

Below is an example of the frontmatter:

```
---
layout: showcase-pattern
title: Hugo Showcases
permalink: /showcase/pattern/hugo
---
```

## Layouts you should not use

### cover

The cover layout is used for landing pages for email activation links, and for our 404 page.

You shoulnd't typically use this.

### default

The default layout is a parent layout that is used by other layouts. 

You should not use it directly in your content.

### notoc
The notoc layout is a parent layout that is used by other layouts. 

You should not use it directly in your content.



* TOC - Do not remove this line
{:toc}

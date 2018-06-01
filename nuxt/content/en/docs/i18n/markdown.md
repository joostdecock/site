---
title: Translating MarkDown
---

> To translate a MarkDown file, follow these steps:
> 
>  - Copy the English version of the file to the same location in your language folder
>  - Translate it
>  - Submit your work

The content of this website is stored in MarkDown files in 
the `nuxt` > `content` folder of [our site repository](https://github.com/freesewing/site/tree/develop/nuxt/content).

Each language has it's own folder, based on its language code.
For example, all Spanish content goes under `nuxt` => `content` => `es`.

Within each language folder, there are four content types with their own subfolder:

 - `blog`: Holds blog posts
 - `docs`: Holds documentation
 - `patterns`: Holds the pattern pages ^[Currently, the pattern content files are empty, and so there is no need to translate them]
 - `showcase`: Holds showcases

The English folders hold all the origin files, whereas the language folders only hold the files that have been translated.

## Front matter

At the start of a MarkDown file, you will find frontmatter
enclosed between a starting and ending line of 3 dashes `---`.

This holds the metadata of the page, and whether it needs to be transated depends on the context.

For example, this is the fronmatter of this page:

```markdown
---
title: Documentation for translators
---
```

Frontmatter is always a `key:value` pair, in which the `key` never is translated.
Translation of the `value` depends on the `key`. In the example above, you
would translate the page title. But look at this frontmatter from a showcase:

```markdown
---
title: A speckled simon by Allie for her husband
caption: "That constrasting buttonhole packet is a great touch."
img: showcase.jpg
category: simon
author: Allie
---
```
Here, you would translate the title and caption, but you would not translate the other
meta data as they are variables used by the system, rather than text to be read by the visitor.

When you're not certain whether something needs translating or not, 
[you can simply ask someone](https://gitter.im/freesewing/freesewing).

## Syntax

MarkDown is a straigh-forward way to format text to turn it into HTML.
You'll be familiar with it in no time.

The [official MarkDown documentation](https://daringfireball.net/projects/markdown/syntax)
is a bit dry.  You may find 
[this summary of the main MarkDown features](https://guides.github.com/features/mastering-markdown/)
a more pleasant read.

However, for 95% of your translation work, this is all you need to know:

**MarkDown**

```markdown
Wrap text in * for *italic* or ** for **bold**.  

Line breaks will be ignored, 
unless you leave an empty line.

That starts a new pargraph. To force a line-break without a new paragraph  
leave 2 trailing spaces at the end of the line.

Links work [like this](/docs/i18n/markdown) and images are almost the same:

![The picture of the month](/img/potm/potm.jpg)

 - List are
 - made like
 - this while

 1. numbered
 1. lists work
 1. like this

##### Titles use hash signs, one for every level making this an H5
```

**HTML**

Wrap text in * for *italic* or ** for **bold**.  

Line breaks will be ignored, 
unless you leave an empty line.

That starts a new pargraph. To force a line-break without a new paragraph  
leave 2 trailing spaces at the end of the line.

Links work [like this](/docs/i18n/markdown) and images are almost the same:

![The picture of the month](/img/potm/potm.jpg)

 - List are
 - made like
 - this while

 1. numbered
 1. lists work
 1. like this

##### Titles use hash signs, one for every level making this an H5

### Extentions

Apart from the standard MarkDown syntax, we've added extentions for:

**Footnotes**

```markdown
Make a footnote^[This is the footnote]
```

Make a footnote^[This is the footnote]

**Attributes**

```markdown
![The picture of the month with shadow](/img/potm/potm.jpg){.elevation-1}
```

![The picture of the month with shadow](/img/potm/potm.jpg){.elevation-1}

### Updating links to point to the correct language

When you link to a different place on the website, you need to prefix it with the language code.
The only thing you have to keep in mind is that English (the default language) does not use a prefix.

For example, `/docs/i18n/markdown` points to the English version of this page.  
Whereas `/es/docs/i18n/markdown` points to the Spanish version of this page.

It's important to update these links, as they determine the language of the site.
If you are translating a page to Spanish, and you don't update a link, then when a visitor
clicks that link, the website will suddenly be in English instead of Spanish.

---
layout: page
title: Adding a pattern to the site
tags: [site docs, howto]
permalink: /docs/site/howto/add-pattern
---

> <h5>Checklist</h5>
> 
>   - Add pattern to [freesewing core](https://github.com/freesewing/core)
>   - In the pattern's config file:
>     - Make sure it is visible (no `hidden: true`)
>     - Note the `handle` of the pattern
>   - Prefetch core data by running `./script/prefetch.sh` in the site root
>   - Create the pattern page at `/pages/patterns/[handle].md`
>   - Create the image directory at `/img/patterns/[handle]/`
>     - Add a `spread.jpg` image to it ([sample](/img/patterns/aaron/spread.jpg))
>     - Add a `[handle].svg` linedrawing to it ([sample](/img/patterns/aaron/aaron.svg))
>     - Add an `options` subdirectory to the image directory
>   - Create the documentation directory at `/pages/docs/patterns/[handle]/`
>     - Add the `index.md` page to it
>     - Add the `measurements.md` page to it
>     - Add the `options.md` page to it
>   - Create the options directory at `/pages/components/pattern-options/[handle]/`
>     - Add individual pages for each option as `[optionname].md` (all lowercase)
>   - Write a blog post to announce the pattern
>   - Share on social media
> {:.todo}
{:.tip}

## Get it to work

### Add pattern to core

First and foremost, the pattern needs to be available on freesewing core.

Also make sure that it's visible to the info service. In other words, make sure `hidden: true` is **not** included in the pattern's config file.

Make a note of the `handle` set in the pattern's config file as you'll need it later.

### Prefetch core data

To run the prefetch script, issue the following command in the site root directory:

```
./script/prefetch.sh
```

It will load data from the code info service and save it both as YAML (for pre-rendering by Jekyll)
and JSON (for client-side loading in JavaScript).

### Create pattern assets

Next up, you'll need to add some content to provide information for the pattern. 
Specifically:

#### Create the pattern page

Create the `/pages/patterns/[handle].md` page. 

> Obviously, you need to replace `[handle]` with the pattern handle as set in the
> pattern's configuration file.
{:.comment}

You can use one of the other pages as a template, or adapt this sample:

```
---
layout: pattern
title: Trent Trouser Block
permalink: /patterns/trent
tagline: A trouser block for menswear with a more modern cut than Theo(dore)
description: "<p>This is a more modern trouser block for men that will serve as the basis of our future trouser patterns.</p>"
---
```

You don't have to change the layout, but you do have to adapt all other front matter fields.

> Apart from the front mattern, the pattern page has no content.
{:.tip}

#### Create the pattern image directory

Create the `/img/patterns/[handle]/` directory.

> Obviously, you need to replace `[handle]` with the pattern handle as set in the
> pattern's configuration file.
{:.comment}

#### Add the spread and linedrawing images

Two images are required:

 - A `spread.jpg` image
 - A `[handle].svg` linedrawing

Below is an example of both for the Aaron pattern:

<div class="row">
<div class="col-sm-6">
{% include figure.html 
    description="spread.jpg"
    url="/img/patterns/aaron/spread.jpg"
%}
</div>
<div class="col-sm-6">
{% include figure.html 
    description="aaron.svg"
    url="/img/patterns/aaron/aaron.svg"
%}
</div>
</div>

#### Create the options subdirectory

In your pattern image directory, create an `options` subdirectory. We'll use this later for the images in our option documentation.

## Add documentation

The steps above are the minimum required to add a pattern and get it to be displayed on the site.

But obviously, it doesn't end there. We also need documentation.

### Create docs directory

Create the `/pages/docs/patterns/[handle]/` directory. It will hold all documentation for our pattern.

> Obviously, you need to replace `[handle]` with the pattern handle as set in the
> pattern's configuration file.
{:.comment}

### Documentaion on making your pattern

Add a `index.md` page inside the directory you just created.

Look at some of the other patterns for an example.

### Measurements

Add a `measurements.md` page inside the directory you just created.

You can eiter copy one of the other patterns' measurements page, or use this template:

```
---
layout: pattern
title: Trent Trouser Block
permalink: /patterns/trent
tagline: A trouser block for menswear with a more modern cut than Theo(dore)
description: "<p>This is a more modern trouser block for men that will serve as the basis of our future trouser patterns.</p>"
---
```

If your pattern does not use any new measurements (that are not already used by other patterns) this is all you have to do.

If your pattern does depend on a new measurement, please follow this checklist on [what to do when you add a measurement](./add-measurement).


### Options

#### Create the options page

In a similar fasion, create a page to hold the options documentation by adding a `options.md` file to the same directory.

You can eiter copy one of the other patterns' options page, or use this template:

```
---
layout: page
title: Trent options
tags: [pattern docs, trent]
permalink: /docs/patterns/trent/options
action: pattern-options
---
<div id="options"><p class="text-center"><img src="/img/logo/spinner.svg" alt="Loading..."></p></div>
```

#### Create the options documentation directory

Create the `/pages/components/pattern-options/[handle]/` directory. It will hold all option documentation for our pattern.

> Obviously, you need to replace `[handle]` with the pattern handle as set in the
> pattern's configuration file.
{:.comment}

#### Create the individual options documentation

In the directory you just created, add a `[optionname].md` file for every option.

> Use the all lowercase name for the option in `[optionname].md`
> 
> In other words, if your option is named `chestEase` in the pattern's config file, its documentation should reside in `chestease.md`
{:.tip}

The images you use in your options go in the `/img/patterns/[handle]/options/` directory.


You can eiter copy one of the other patterns' options, or use this template:

```
---
permalink: /components/pattern-options/aaron/chestease
---
{% include pattern-option.html pattern='aaron' option='chestEase' %}

How much room do you want at the chest?

Whatever value you provide here will simply be added to your chest circumference measurement when drafting the garment.

>Given that an undershirt has no arms, a little chest ease goes a long way. Add too much, and you'll end up with gaping armholes.
{:.warning}

> This option also allows negative values.
>
> You should only use negative ease if you are using a stretch material that you want to fit tightly.
>
> Overal stretch should be configured with the stretchFactor option.
{:.comment}
```

## Announce it

You've added a new pattern, so now you should let people know about it.

Write a blog post (we've got a [checklist for adding a blog post](./add-post) too) and use social media to let to world now about this new pattern.

* TOC - Do not remove this line
{:toc}

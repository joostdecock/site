---
layout: page
title: Adding a measurement to the site
tags: [site docs, howto]
permalink: /docs/site/howto/add-measurement
---

> <h5>Checklist</h5>
> 
>   - Note the `name` of the measurement in the pattern's config file (in [freesewing core](https://github.com/freesewing/core))
>   - Prefetch core data by running `./script/prefetch.sh` in the site root
>   - Create the documentation directory at `/pages/docs/measurements/[measurement]/`
>     - Add a `index.md` file it, see other patterns for a sample
>   - Add a `/_includes/measurements/[measurement].md` file (all lowercase), see other patterns for a sample
> {:.todo}
{:.tip}

## Get it to work

### Add it to a pattern in core

Measurements won't show up unless they are used by a pattern available on freesewing core.

### Prefetch core data

To make the site aware of the new measurements, run the prefetch script by issueing the following command in the site root directory:

```
./script/prefetch.sh
```

It will load data from the code info service and save it both as YAML (for pre-rendering by Jekyll)
and JSON (for client-side loading in JavaScript).

## Add documentation

The steps above are the minimum required to add a measurements to the site and get it to work.

But obviously, it doesn't end there. We also need documentation.

### Create docs directory

Create the `/pages/docs/measurements/[measurement]/` directory. It will hold the documentation for our measurement.

> Obviously, you need to replace `[measurement]` with the measurement name as set in the
> pattern's configuration file. **Note: all lowercase**
{:.comment}

### Documentation page

Add a `index.md` page inside the directory you just created.

Look at some of the other patterns for an example.

### Documentation include

Add a `[measurement].md` file to the `/_includes/measurements/` directory.

> Obviously, you need to replace `[measurement]` with the measurement name as set in the
> pattern's configuration file. **Note: all lowercase**
{:.comment}

You can copy one of the other measurements as a starting point.

* TOC - Do not remove this line
{:toc}

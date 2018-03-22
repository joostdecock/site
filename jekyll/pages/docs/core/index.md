---
layout: page
title: Core documentation
tags: [core docs]
permalink: /docs/core/
---

## Freesewing core

**Core** is the *open source platform for made-to-measure sewing patterns* that this is all about.

Core is both the platform and the patterns we maintain.

## System Requirements
* PHP 5.6 or newer
* composer

## Installation

Full install instructions are available at [freesewing.org/docs/core/install](https://freesewing.org/docs/core/install)
but here's the gist of it:

> ##### A note about installing on PHP 5.6
>
> Core uses a Developer theme that requires PHP 7.0 or newer. However, that theme is only 
> useful for hacking core. So if you just want to run this and maybe design some patterns
> install without the dev requirements. 
>
> In other words, to install on PHP 5.6, pass `--no-dev` to composer

### From packagist
```
composer create-project freesewing/core
cd core
composer dump-autoload -o
```

### From GitHub
```
git clone git@github.com:freesewing/core.git
cd core
composer install
composer dump-autoload -o
```

## License
This code is licensed [GPL-3](https://www.gnu.org/licenses/gpl-3.0.en.html), 
the pattern drafts, documentation, and other content is licensed [CC-BY](https://creativecommons.org/licenses/by/4.0/).

## Contribute

Your pull request are welcome here. 

If you're interested in contributing, I'd love your help.
That's exactly why I made this thing open source in the first place.

Read [freesewing.org/contribute](https://freesewing.org/contribute) to get started.
If you have any questions, the best place to ask is [the freesewing community on Gitter](https://gitter.im/freesewing/freesewing).

## Further reading

The most important core documentation is [the class documentation](./classdocs).

Apart from that, the following documentation is also relevant:

 - [core class documentation](./classdocs)
 - [core configuration files](/docs/core/config)
 - [core install instructions](/docs/core/install)
 - [core paramters](/docs/core/parameters)
 - [core test coverage](./coverage)
 - [freesewing fundamentals](/docs/fundamentals)



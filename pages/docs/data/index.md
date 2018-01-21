---
layout: onecol
title: Data documentation
tags: [developer docs, data docs]
permalink: /docs/data/
---
## Freesewing data

**Data** is freesewing's data backend.

Our website, [freesewing.org](https://freesewing.org/), uses a [JAMstack](https://jamstack.org/) architecture.

JAMstack is *a modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup*.

What that means is that our site is statically generated HTML. 
That's great for documetation and so on, but when you want it to do useful stuff (like drafting sewing patterns), you need an API to talk to with JavaScript.

This repository holds the API for all user data. It handles things like authentication, user details, models, and pattern data.
It essentially does everything except generating patterns. That is handled by [our core API](https://github.com/freesewing/core).

This data API is written in PHP on top of [the Slim framework](https://www.slimframework.com/). 
It uses JSON web tokens with [slim-jwt-auth](https://github.com/tuupola/slim-jwt-auth) as authentication middleware.

## System Requirements
To run your own instance of this API, you'll need:

 - PHP 5.6 or above (we recommend PHP 7)
 - composer
 - A database (we use MySql/MariaDb)

## Installation

Full install instructions are available at [freesewing.org/docs/data/install](https://freesewing.org/docs/data/install) 
but here's the gist of it:

```
git clone git@github.com:freesewing/data.git
cd data
composer install
composer dump-autoload -o
```

## License
This code is licensed [GPL-3](https://www.gnu.org/licenses/gpl-3.0.en.html), 
the pattern drafts, documentation, and other content are licensed [CC-BY](https://creativecommons.org/licenses/by/4.0/).

## Contribute

Your pull request are welcome here. 

If you're interested in contributing, I'd love your help.
That's exactly why I made this thing open source in the first place.

Read [freesewing.org/contribute](https://freesewing.org/contribute) to get started.
If you have any questions, the best place to ask is [the freesewing community on Gitter](https://gitter.im/freesewing/freesewing).



## Further reading

 - [Overview of data API endpoints](./routes)
 - [Data test coverage](./coverage)



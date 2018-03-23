---
layout: page
title: Freesewing repositories
tags: [developer docs]
permalink: /docs/repositories
crumbs:
  - /docs|Docs
---
* TOC - Do not remove this line
{:toc}

## core

[![Build Status](https://travis-ci.org/freesewing/core.svg?branch=master)](https://travis-ci.org/freesewing/core)

The core repository holds the freesewing platform.

- [Source code](https://github.com/freesewing/core)
- [Issues](https://github.com/freesewing/core/issues)
- [Infrastructure documentation](/docs/infrastructure#core)

## data

[![Build Status](https://travis-ci.org/freesewing/data.svg?branch=master)](https://travis-ci.org/freesewing/data)

The data repository holds the freesewing data API.

- [Source code](https://github.com/freesewing/data)
- [Issues](https://github.com/freesewing/data/issues)
- [Infrastructure documentation](/docs/infrastructure#data)

## site

The site repository holds the freesewing.org website.

- [Source code](https://github.com/freesewing/site)
- [Issues](https://github.com/freesewing/site/issues)
- [Infrastructure documentation](/docs/infrastructure#site)

## demo

The demo repository holds a stand-alone version of the freesewing demo.

- [Source code](https://github.com/freesewing/demo)
- [Issues](https://github.com/freesewing/demo/issues)
- [Infrastructure documentation](/docs/infrastructure#demo)

## tile

The tile repository holds a command-line tool to tile PostScript images on multiple pages.
It is used by the data API to ultimately generated tiled PDF files.

Tile is a fork of Poster, by Jos T.J. van Eijndhoven.

- [Source code](https://github.com/freesewing/tile)
- [Issues](https://github.com/freesewing/tile/issues)

## bsd

The bsd repository holds a
BSD-licensed copy of the portion of freesewing 
that was ported from Kevin Lindsey's JavaScript code.

Kevin's original code is licensed under a BSD-3-clause license.
We have reached a gentlemen's agreement to dual-license the ported code.

This way, I can include the code in the freesewing project under a GPL license, 
yet it remains available under the original BSD-3-clause license for those 
who prefer that option.

- [Source code](https://github.com/freesewing/bsd)

> <h5>This code is provided as-is</h5>
>
> This repository contains nothing that is not also
> in core. It's just a different license. Please use
> core for issues/pull requests.
{: .warning }


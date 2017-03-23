---
layout: page
title: Freesewing repositories
tags: [developer documentation]
permalink: /repositories
---
* TOC - Do not remove this line
{:toc}

## core

[![Build Status](https://travis-ci.org/freesewing/core.svg?branch=master)](https://travis-ci.org/freesewing/core)

The core repository holds the freesewing platform.

- [Source code](https://github.com/freesewing/core)
- [Issues](https://github.com/freesewing/core/issues)
- [Infrastructure documentation](/infrastructure#core)

## docs

[![Build Status](https://travis-ci.org/freesewing/docs.svg?branch=master)](https://travis-ci.org/freesewing/docs)

The docs repository holds the freesewing documentation.

- [Source code](https://github.com/freesewing/docs)
- [Issues](https://github.com/freesewing/docs/issues)
- [Infrastructure documentation](/infrastructure#docs)

## demo

The demo repository holds a stand-alone version of the freesewing demo.

- [Source code](https://github.com/freesewing/demo)
- [Issues](https://github.com/freesewing/demo/issues)
- [Infrastructure documentation](/infrastructure#demo)

> <h5 class='notoc'>Why a stand-alone demo?</h5>
>
> The demo is part of the documentation, and included in the 
> docs repository. But that is a Jekyll-based site which means
> that running your own instance is going to require some work.
>
> If you want your own demo without the hassle, you can simply clone 
> this and open demo.html in your browser.

## nofront

The nofront (as in, no frontend) repository holds the placeholder 
freesewing website while we don't have a frontend.

In other words, this repository holds what you see when 
you visit [freesewing.org](https://freesewing.org/).

- [Source code](https://github.com/freesewing/nofront)
- [Issues](https://github.com/freesewing/nofront/issues)
- [Infrastructure documentation](/infrastructure#nofront)

## bsd

The bsd repository holds a
BSD-licensed copy of the portion of freesewing 
that was ported from Kevin Lindsey's JavaScript code.

Kevin's original code is licensed under a BSD-3-clause license.
We have reached a gentlemen's agreement to dual-license the ported code.

This way, we can include the code in the freesewing project under a GPL license, 
yet it remains available under the original BSD-3-clause license for those 
who prefer that option.

- [Source code](https://github.com/freesewing/bsd)

> <h5>This code is provided as-is</h5>
>
> This repository contains nothing that is not also
> in core. It's just a different license. Please use
> core for issues/pull requests.


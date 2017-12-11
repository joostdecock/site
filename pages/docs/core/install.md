---
layout: page
title: core install instructions
tags: [fundamentals, designer docs, developer docs, core]
permalink: /docs/core/install
---

## System requirements

- PHP version 5.6 or above (we recommend PHP 7)
- [Composer](https://getcomposer.org/)

## Installing composer

[Composer](https://getcomposer.org/) is required. If you don't have it yet, install it first.
For instructions, see [the composer installation page](https://getcomposer.org/download/)

## Installing core

> <h5 class='notoc'>Contributors should install from GitHub</h5>
>
> Installing core from packagist won't allow you to submit your
> changes back to the repository. If you're looking to contribute
> to freesewing, you should install from GitHub as shown below.
{: .warning }

### Install from Packagist

Core is available on [packagist](https://packagist.org/)
 as [freesewing/core](https://packagist.org/packages/freesewing/core). 

To install from packagist, run these commands:

```
composer create-project freesewing/core freesewing
composer dump-autoload -o
```

The first command installs freesewing/core from packagist, with all dependencies.
The second command updated the autoloader.

### Install from GitHub

The source code is hosted [on GitHub](https://github.com/freesewing/core).  

To install from GitHub, run these commands:

```sh
git clone git@github.com:freesewing/core.git freesewing
composer install
composer dump-autoload -o
```

The first command clones the repository. The second will make composer install
all dependencies. Finally, we update the autoloader.

## Run it from the command line

```sh
./freesewing service=info format=text
```

If the command above outputs a nice list of API info, you have successfully install freesewing.

## Run it in a browser

While freesewing comes with a command line interface, it is typically ran on a webserver
so you can use it in your browser.

All you need is a webserver supporting PHP. 
Setting one up is beyond the scope of this document, but [Apache](https://httpd.apache.org/) 
and [Nginx](http://nginx.org/) are popular choices and come with plenty of documentation.

* TOC - Do not remove this line
{:toc}


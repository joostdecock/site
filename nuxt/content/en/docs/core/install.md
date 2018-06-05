---
title: core install instructions
---

## System requirements

- PHP version 7.0 or above
- [Composer](https://getcomposer.org/)

## Installing composer

[Composer](https://getcomposer.org/) is required. If you don't have it yet, install it first.
For instructions, see [the composer installation page](https://getcomposer.org/download/)

## Installing core

> ##### Contributors should install from GitHub
>
> Installing core from packagist won't allow you to submit your
> changes back to the repository. If you're looking to contribute
> to freesewing, you should install from GitHub as shown below.
{.fs-bq .warning }

### Install from Packagist

Core is available on [packagist](https://packagist.org/)
 as [freesewing/core](https://packagist.org/packages/freesewing/core). 

To install from packagist, run these commands:

```
composer create-project freesewing/core freesewing
cd core
composer dump-autoload -o
```

The first command installs freesewing/core from packagist, with all dependencies.
The second command moves your prompt into the core directory
The final command updated the autoloader.

### Install from GitHub

The source code is hosted [on GitHub](https://github.com/freesewing/core).  

To install from GitHub, run these commands:

```sh
git clone git@github.com:freesewing/core.git
cd core
composer install
composer dump-autoload -o
```

The first command clones the repository. The second moves your prompt into the core directory.
The third command will make composer install all dependencies. Finally, we update the autoloader.

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

If you're just testing, you can run PHP's build-in webserver. From the core directory, run:

```sh
php -S localhost:8666
```

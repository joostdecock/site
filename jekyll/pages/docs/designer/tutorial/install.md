---
layout: page
title: Design tutorial - Getting the software
tags: [fundamentals, designer docs, tutorial, install]
permalink: /docs/designer/tutorial/install
crumbs:
  - /docs|Docs
  - /docs/designer|Designer docs
---
To follow along with our tutorial for designers, you'll need to get the required software first.

This is the only software you need to follow the tutorial:

 - **PHP** : The language in which freesewing core is written
 - **Composer** : A dependency manager for PHP that will make sure we get all the rest

Installing this software will be a little different depending on whether you use Linux, Mac, or Windows.

## Installing PHP

### On Linux

On debian based systems, install PHP with:

```sh
sudo apt-get install php
```

On RedHat based systems, install PHP with:

```sh
sudo yum install php
```

### On Mac

Good news, PHP comes bundled with OS X since version 10.0.0. You don't need to do anything.

### On Windows

Installing PHP on Windows is the less obvious choice, but it's not all that hard either.

You essentially have two option:

 - [Download PHP for Windows](http://windows.php.net/download) and follow the [official install instructions for Windows](http://php.net/manual/en/install.windows.php)
 - Use a bundle installer such as [XAMPP](https://www.apachefriends.org/) or [WampServer](http://www.wampserver.com/en/)

The latter will be simpler, but will also install a web and database server which you don't need for the tutorial.

## Installing composer

### On Linux

On debian based systems, install composer with:

```sh
sudo apt-get install composer
```

On RedHat based systems, install composer with:

```sh
sudo yum install composer
```

### On Mac

Download `composer.phar` from [getcomposer.org/installer](https://getcomposer.org/installer)

Now, move the `composer.phar` into your path and rename it to `composer`:

```
sudo mv composer.phar /usr/local/bin/composer
```

Finally, make it executable:

```
sudo chmod +x /usr/local/bin/composer
```

Now, you should just be able to run the `composer` command.

### On Windows

Download and run [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe).

It will install the latest Composer version and set up your `PATH` so that you 
can just call `composer` from any directory in your command line.

## Create a folder on your computer to hold your work

Create a folder on your computer called `freesewing`. You can call it whatever, but we'll
use `freesewing` in our example. It also doesn't matter where you put it:

```sh
cd 
mkdir freesewing
cd freesewing
```

## Install core

Open a command prompt, and navigate to the `freesewing` directory with the `cd` command.

Once in the `freesewing` directory, run these commands:

```sh
composer create-project freesewing/core
cd core
composer dump-autoload -o
```

This will setup core in a directory named `core`, and cd into it and update the classloader.

If all went well (and you are on Linux or Mac), you can now run this command:

```sh
./freesewing
```

And you'll get some meaningful feedback.

> ##### You can't use the command line freesewing on Windows
>
> On Linux and Mac, you can use freesewing from the command line.
>
> Alas, you cannot on Windows, so just skip to the next step.
{:.warning}

## Run the webserver

We can now use `core` from the command line (unless you're on Windows). But if we want to use it in our browser,
we'll need a web server.

Rather than installing one, we'll use PHP's built-in webserver.

`cd` into the `core` directory, and run this command:

```sh
php -S localhost:8666
```

Now, open your browser and navigate to 
[http://localhost:8666/index.php?service=info&format=html](http://localhost:8666/index.php?service=info&format=html)


If all went well, it should [look like this](https://core.freesewing.org/?service=info&format=html).

{% include blockquote.html
     bg='#48d400'
     icon='flag-checkered'
     tcolor='#292b2c'
     icolor='#292b2c'
     content="<h5>Now we can really get started</h5>
<p>You now have all it takes to complete the tutorial. 
So get started with <a href='./part-1'>part 1 of our design tutorial]</a></p>"
%}

* TOC - Do not remove this line
{:toc}




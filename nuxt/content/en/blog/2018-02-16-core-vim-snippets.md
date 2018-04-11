---
layout: blog
title: "Speed up your pattern design work with our freesewing snippets plugin for vim"
linktitle: "Announcing a freesewing snippets plugin for vim"
img: train.jpg
caption: "I do a lot of my design work on the train. Trains are fast. This plugin makes you fast. You get the idea."
author: joostdecock
category: core
blurb: "Speed up your pattern design work with our clever snippets plugin for the most badass editor known to peoplekind. Bonus: video"
---
We have just published the [core-vim-scripts](https://github.com/freesewing/core-vim-snippets) repository on GitHub.
It holds a plugin for [the vim editor](http://www.vim.org/) that adds a bunch  of snippets to speed-up and 
facilitate your pattern design work.

## Video sample

@[youtube](1-JYayZdnpc)

## What does this do?

This plugin adds a list of so-called *snippets* to vim.
A snippet is a specific string of text that you can expand to something more elaborate by hitting the `<tab>` key.

For example, typing `np` followed by `<tab>` will insert the `newPoint()` method.
But that's not all. Repeatedly hitting `<tab>` will move your cursor to the different arguments for the method.

In other words, you can *tab through* the relevant parts of the code. Futhermore, the plugin will also suggest what needs to go in as an argument, which means it takes the guesswork out of the core API.

> ##### We've also updated our cheatsheet
>
> We have updated our [cheatsheet for pattern designers](/pdf/cheatsheet.pdf) to also include the snippet codes.
{.tip}

## But I don't use vim

![vim - It's not for everyone](/img/blog/core-vim-snippets/vim.jpg)

If you use a different editor whith snippet support, feel free to get in touch and we'll look into porting this functionality to the editor of your choice.

Or, you can do it yourself, the source code is [right here](https://github.com/freesewing/core-vim-snippets).

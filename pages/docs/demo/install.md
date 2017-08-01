---
layout: page
title: demo install instructions
tags: [fundamentals, designer docs, developer docs, demo]
permalink: /docs/demo/install
---

The [freesewing demo](https://demo.freesewing.org) is a stand-alone demo of the freesewing platform.

While [freesewing.org](https://freesewing.org) also demoes the capabilities of the platform, it's
harder to know what is a core feature, and what is is functionality added by the frontend.

In addition, deploying your own full frontend requires a lot more work than using this simple demo.
You can just clone the demo code and you're ready to go. 

### Install from GitHub

The source code is hosted [on GitHub](https://github.com/freesewing/demo).  
Clone it like this:

```sh
git clone git@github.com:freesewing/demo.git
```

This will create a demo folder.

### Configuring the demo

You should only configure the `api` value in the demo.js. 
The default value is:

```
var api = 'https://core.freesewing.org';
```

Update it with the link to your own freesewing instance (no trailing slash)
or leave it as-is to connect to our API.

> ##### Feel free to use our online demo
> 
> Note that if you're connecting to our API, you could have just used 
[the online demo](https://demo.freesewing.org) instead.
{:.tip}

### Running the demo

Open `index.html` in the `demo` folder in your browser.

* TOC - Do not remove this line
{:toc}


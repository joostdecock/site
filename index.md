---
layout: cards
title: Freesewing documentation
action: homepage
permalink: /
---
<div class="container">
<div class="row">
<div class="col-md-6 offset-md-3" markdown="1">

> __TL;DR__ 
> 
> - This site is alpha code. All data you enter on this site can get wiped at any moment
> - You can create an account, and delete it again. Not much else.

## About this site

This site is a work in progress.  
Specifically, it's here to test/develop our data API (which stores user info)
and its integration in the frontend.

That frontend (the one you're looking at) site is a fork of 
[our docs repository](https://github.com/freesewing/docs).
So it's based on Jekyll, and statically hosted by Netlify.

Because forks can't live in the same organisation, it's currently under 
[my personal GitHub account](https://github.com/joostdecock/site).
But don't let that stop you, feel free contribute or just mess around with it.

The frontend has gone through some changes.
One of those changes is that I ripped out most of the content, because that makes it faster to
regenerate the site, handy while developing.

More importantly, it contains a bunch of jQuery code that interacts with the data API.

The what? The data API.

[This repository](https://github.com/freesewing/data) holds a new API I hacked together based on the 
[PHP Slim framework](http://slimframework.com/).

There's a lot it doesn't do yet, but it does handle authentication, signup flow,
and you can also remove your account.

When you sign up with an email address that is tied to a makemypattern.com user,
your data will automatically be migrated, which is nice.

## How did we get here?

As some of you [may have noticed](https://gitter.im/freesewing/freesewing?at=58f8d08b881b89e1016c19c4),
I got more than a little frustrated trying to build a frontend for freesewing.

It's because I was trying to do too many new things at once, in an attempt to make something that's great.

So, I've somewhat scaled back my ambitions and I'm trying to get something up and running. 
We can hopefully make it great later.

I'm still dabbling with new stuff (I have never used Slim before, so it's probably kinda hackish)
but I'm using jQuery on the client side (and not Vue or React or Angular or Ember or....) because
I can at least get that to work.

I am painfully aware that there's far superior ways to do what I'm doing. 
But hey, I'm not even using auth0 yet I can login, and we've got JWT-based authentication, and it works.
 

So that's progress :)

Here's what you can do:

  - Sign up for an account
  - Remove your account

I know, it's not much but it's a start. And, if you have a makemypattern.com account, your data will/should be migrated with you.


</div>
</div>
</div> <!-- .container -->

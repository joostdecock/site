---
layout: blog
title: "Introducing freesewing bail: A poor man's rollbar — because privacy"
linktitle: "Introducing freesewing bail"
img: hammer.jpg
caption: "This blog post is not at all about hammers"
author: 'Joost De Cock'
category: docs
blurb: "Bail is a poor man's Rollbar, because privacy."
---
One of the more tricky things we have to deal with here at freesewing.org is the so-called 
[garbage in, garbage out](https://en.wikipedia.org/wiki/Garbage_in,_garbage_out) problem. 
When our users enter flawed input data, it leads to nonsensical output or *garbage*.

For us, that flawed input data is --- almost without exception --- incorrect measurements. 
Sometimes people aren't certain how to take measurements, 
other times they make wrong assumptions or simply get their units mixed up.

Point is, it happens. And when it does, things can break. 
Sometimes, 
[people](https://github.com/freesewing/site/issues/246) 
[complain](https://github.com/freesewing/site/issues/194), 
and we can figure out what went wrong. 
But for every person who reaches out to report a problem, 
I'm certain there's a bunch of others who just shrug it off as *we can't have nice things*. 

## Enter Rollbar

A better solution is to not depend on your users for reporting errors, 
but instead have them bubble up and reported auto-magically whenever something goes wrong. 
This is possible by creating custom error handlers in our code to take care of this.

{% include figure.html 
    url="/img/blog/introducing-bail/rollbar.png" 
    description="Screen grab from the rollbar.com website" 
%}

There's a bunch of companies out there that provide this as a service 
that you can plug in to your code. One of the more well-known is 
[Rollbar](https://rollbar.com/), which comes with a 2-week trial. 
So, 2 weeks ago we signed up for such a trial, 
and integrated the Rollbar error handler in our core and data backends.

It worked really well, and soon enough we received notifications whenever something 
wasn't up to snuff. I enabled notifications for every error level under the sun. 
So even harmless notices were being reported.

## Moving fast and breaking things

One of the errors that came in was related to the way we handle certain types of 
information in our data backed. Specifically, data serialized as JSON. 
It was the weekend, I had some time, so I went it to *quickly fix this thing*. 
Suffice to say it didn't go well.

Turns out that in fixing this one thing, I broke a bunch of other stuff without realizing it, 
and I left the site in a half-broken state where for some people, things just wouldn't work.

{% include figure.html 
    url="/img/blog/introducing-bail/giphy.gif" 
    description="This will probably not be the last time I break something" 
%}

That's not good, and I spent much of the remaining weekend undoing the damage, 
not to mention giving myself a stern talking to about how this should never happen again.

## A side-quest into writing tests, and adding Sqlite support

Smart developers write so-called *tests* that validate the correct behavior of their code. 
When you make a change, you run those tests to verify your change doesn't have 
unexpected ripple effects that cause things to break.

> Mistakes happen, that's not going to change, but we should learn from them.
{:.quote}

I know that, and our core backend has such tests, but our data backend was written 
in a bit in a scramble to get this site up and running, and I had never gotten around to it.

Mistakes happen, that's not going to change, but we should learn from them.
So while I don't find writing unit tests to be particularly interesting, 
I put everything I was working on on-hold, and vowed to write tests for the entire data backend first.

{% include figure.html 
    url="/img/blog/introducing-bail/coverage.png" 
    description="From no tests to 99.88% test coverage for our data backend" 
%}

But our data backend uses a database, and for thorough testing, we needed a test database.
While that's easy enough to setup on a development machine, it's less trivial to do on 
[Travis](https://travis-ci.org/), which we use for continious integration.

Long story short, our data repository is now compatible with Sqlite, a lightweight file-based database.
This allows us to simply include a test database file with our test code, but also makes it easier for
developers to setup their own data instance.

## Next roadblock: Privacy & GDPR

With the tests in place, I could once again turn my attention to spotting and fixing potential gotchas. 
But that's when I hit another issue: front-end errors.

You see, errors on the back-end only tell part of the story. 
If we really want to understand what goes on when one of our users runs into a problem, 
we need reporting on the client side to. 

And while Rollbar supports this, we could not in good conscience embed their error reporting code into our website. 
That's because Rollbar is a third-party. 
And while we may want to share our backend data with them for debugging purposes, 
front end data is **your data**. 
Information about your platform, browser, are all recorded, stored, and processed by Rollbar, outside of our control.

I've been thinking a lot about privacy lately, as I am preparing to publish a privacy notice for the site 
in line with the 
[GDPR legislation of the European Union](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation). 

I think GDPR is a good thing, but its rules on getting consent from your users are both strict and granular.
You can't just throw up a *please agree to let us do whatever* notice, but need to ask permission for 
every thing you want to do.

Adding rollbar would require consent for:

 - Sharing data with a third party
 - Moving data outside the EU

Not only would that complicate our privacy notice. I also happen to really like that we're able to so that
we do not share your data, and we keep it in the EU.

So Rollbar is out on principle alone.

## Introducing Freesewing Bail

Our 2-week trial has shown that there's value in a rollbar-like service that collects and reports errors. 

So after some to and froing, I decided to bite the bullet and write our own rollbar. 
Not the entire thing, but a minimalistic version of it that did what we needed, without involving any third parties.

Rather than somehow hack this into our data and core backends, 
I wrote it as a seperate library that we can simply plug in to both. 

It's called [bail](https://github.com/freesewing/bail) and as of today we are running it on our all production system.
If you'd like to give it a go, a simple `composer require freesewing/bail` will add it to your PHP project.

{% include figure.html 
    url="/img/blog/introducing-bail/dashboard.png" 
    description="This is what our new error dashboard looks like" 
%}

Errors are collected centrally, and you can keep an eye on what's going on in [our error dashboard](/errors).

And yes, that includes that front end too. 
Anytime something goes wrong on this website, it will be reported. 
The idea is that this will help us continually improve our code base, and help people who run into issues.

And you can test this yourself. The button below will trigger a JavaScript error. Go ahead and click it:

<p class="text-center mt-5 mb-5"><a href="#" class="btn btn-lg btn-primary" onClick="event.preventDefault(); throw 'Blog post error example';">Click me to trigger an error</a></p>

It feels like nothing happened, but the error you generated was reported to our 
our data backend, and will show up in the [error dashboard](/errors). Just look for **Blog post error example**.

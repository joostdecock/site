---
layout: blog
title: Freesewing.org is open for business. That is, the business of giving away free sewing patterns
linktitle: Freesewing.org is open for business
img: open.jpg
caption: Open 24/7 from now onwards
author: joostdecock
category: site
blurb: "Freesewing finally has a friendly face, and it's waiting to meet you at freesewing.org."
---
When I released freesewing core back in March, 
I did not expect it to take another 5 months to finally have a proper front-end for it, 
but here we are.

From today onwards, 
[freesewing.org](https://freesewing.org/) 
is the place to be for your made-to-measure sewing patterns.

If you're new to freesewing, 
I suggest you start reading [the about page](/about/), 
which hopefully does a half-decent attempt at describing what this thing is.

> As of today mmp will no longer allow new users to sign up and after a grace period of a few months, I will shut it down
{:.quote}

If you do know what I'm doing here, 
or you saw *An open-source platform for made-to-measure sewing patterns* 
at the top of this page and that was enough for you to figure it out, 
this announcement comes after 18 months of work to reinvent my previous site, 
[makemypattern.com](https://makemypattern.com/).

Speaking of which, 
makemypattern.com has so far generated more than 6500 sewing patterns, 
so I think it's fair to say it's been a good run. 

{% include figure.html url="/img/blog/open-for-business/mmp-patterns.png" description="Graph of the number of patterns generated on makemypattern.com" %}


But [every new beginning comes from some other beginning's end](https://www.youtube.com/watch?v=xGytDsqkQY8). 
So as of today mmp will no longer allow new users to sign up 
and after a grace period of a few months, I will shut it down. 

Update your bookmarks people, 
because [freesewing.org](https://freesewing.org/) is where it's at.

## Everything is new or different, and hopefully better

The idea of generating made-to-measure sewing patterns based on your measurements is the same. 
Apart from that, pretty much everything you see here is different.

I've written before about the choices I've made when building this frontend. 
The [matters of principle and ethics](/blog/privacy-choices/) 
as wel as [the technical stuff](/blog/freesewing-goes-jamstack/).

Today, I won't go into the details of how things work under the hood. 
Instead, I'd like to briefly highlight some of the most significant changes for the users of the site. Hopefully, that includes you.

### Patterns vs drafts

I told you earlier that mmp generated over 6500 patterns. 
I can also tell you that mmp has 10 patterns available.

So which one is it, 10 or 6500? 
Well, it depends on the context. Which is ambigious and confusing.

Now, patterns and patterns, and drafts are drafts.  
That is, a draft is what you generate from a pattern. It's a pattern drafted to your exact specifications.

{% include figure.html url="/img/blog/open-for-business/draft-sample.svg" description="An example of a draft from freesewing.org" %}

I hope that in using both terms consistently, it will become self-explanatory.

So, for freesewing that means there are 12 patterns available, 
from which a number of drafts have been generated that you can track live on 
[the status page](/status).

### New patterns, and blocks

Currently, 12 patterns are available on freesewing.org. 
All 10 from mmp (note: some have had their name changed) 
plus the new [Sven Sweatshirt](/patterns/sven) and the [Brian Body Block](/patterns/brian).

{% include figure.html url="/img/showcase/sven-nr2/med_showcase.jpg" description="An example of the Sven sweatshirt" %}
The block also existed in the mmp backend, but it wasn't available to you. 
So that's another change, I am making all my blocks (slopers) available.

And more is coming, I currently have 3 patterns and 1 block that I am working on. 
They are not ready yet, and I didn't want to delay the release for them, 
but I hope to have them all out before the end of the year.

What I'm saying is, watch this space. 
Or better, check the links at the bottom of this page for social media accounts to follow.

### Better support for *les autres* 

I [tried](https://makemypattern.com/blog/imperial-units-have-been-spotted-and-they-might-break-things)
and [failed](https://makemypattern.com/blog/imperial-units-not-worth-it) to add support for imperial units to makemypattern.com.

This time around, both metric and imperial are fully supported. You can set your preferred units in your account settings.
And in each model you can set the units seperately, just in case you happen to sew for people living in different parts of the world.

Speaking of different parts of the world, freesewing core fully supports different languages. 
You can get your pattern in a number of languages, and if yours is not listed you can help with the translation.

{% include figure.html url="/img/blog/open-for-business/yoke.svg" description="The yoke of Simon, in French" %}

Arguably, that is a bit of a half-measure when this site is only in English, but baby steps, right?

### Compare to catch issues early

One of the common pitfalls is that people take measurements the wrong way.

When they generate a pattern, those incorrect measurements can sometimes really mess up the pattern 
in a way that can be hard to spot if you are not familiar with the pattern.

One way to tackle that is with better measuring instructions, which I have added.
But what I really wanted was a way to make spot issues in an easy way.

{% include figure.html url="/img/blog/open-for-business/standing.jpg" description="These two are going to help you to take accurate measurements" %}


Comparing yourself to others is the fastest way to be unhappy. 
But in this case, there's value to a comparison.

Putting your pattern side by side with a pattern that is known to be correct 
can help you spot any issues that go beyond size differences.

So, comparison is built-in. Every time you generate a draft, you get two things:

 - Your drafted pattern
 - A comparison of your draft to a range of standard sizes

{% include figure.html url="/img/blog/open-for-business/compare-sample.svg" description="An example of a draft compared to standard sizes" %}
It's a way to quickly eyeball your draft for any glaring issues before you start working with it.

### Paperless because trees are precious, and printers not a given

Something that I am curious to see whether it will catch on are paperless drafts.

Apart from the obvious upside of saving paper, I hope this will allow people who don't have access to 
a printer to use freesewing.

The idea is that you don't have to print your pattern. 
Instead, you can transfer it directly onto fabric or another medium.

To make that possible, the pattern comes with detailed dimensions and a metric grid (or imperial grid if you're into that)
that helps you transfer all the information.

{% include figure.html url="/img/blog/open-for-business/paperless-sample.svg" description="An example of a draft using the paperless theme" %}

As I said, I'm curious to see whether this will be useful to people, but I felt it was worth a try.

### I've got your back (up)

Also new is that when you draft a pattern, I will keep that draft for you, and it will remain available. 

{% include figure.html url="/img/blog/open-for-business/draft-list.png" description="All your drafts are kept and available in your account" %}

You can come back at any time to re-download the pattern, or tweak it, redraft it, or fork it.
Yes [fork it](/docs/site/fork), which is kinda cool because you can also fork patterns from other people after they've shared their draft.

You can also add your own notes to your drafts (and to your models for that matter).

### Community-driven blog and showcase

Your makes deserve better than a Flickr album somewhere, so I've added showcases to the site. 
The idea is to have a grabbag of examples here on the site of things people have made.

{% include figure.html url="/img/showcase/husband-hugo/med_showcase.jpg" description="Showcase of the Hugo hoodie by <a href='https://uneanneedecouture.wordpress.com/2015/12/28/le-sweat-en-merinos-makemypattern/'>uneanneedecouture</a>" %}

Obviously, I can't add your work if I don't know about it, 
so either get in touch of make sure to use the #freesewing hashtag when posting about it.

Speaking of posting, the freesewing blog is also open to your contributions if you feel you have something to share.

### Badges baby

This is a bit silly, but you can now unlock [badges](/docs/site/badges) on the site. 
I added the feature initially because I wanted to find a way to 
thank the people who took part in the early access program.

A while ago, I opened up an early access version of the site to 
those people who were interested, and I would like to thank all of 
you who tried out the site, reported issues, or merely gave feedback or encouragements.

<img src="/img/badges/badge-early-access.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<img src="/img/badges/badge-launch-day.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<img src="/img/badges/badge-donated.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<img src="/img/badges/badge-issue.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<img src="/img/badges/badge-contributor.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<img src="/img/badges/badge-blogpost.svg" class="badge-img drop-shadow" style="margin: 1%; width: 30%; height: auto; border-radius: 50%">
<figcaption><small>Some of the badges you can unlock</small></figcaption>

Those of you who took part should all get that coveted early access badge. 
If it's missing from [your profile](/profile), [get in touch](/contact/).

Other badges are available, including one for signing up on launch day. [The full list of badges is here](/docs/site/badges).

## What happens now?

{% include figure.html url="/img/blog/open-for-business/darkness.svg" description="Darkness, realistically" %}

Maybe it's just me, but after every major project comes to completion, 
I tend to slide into a black hole of *is this it?* disillusionment.

I might need a few weeks to bounce back from that, but don't let that stop you from giving me 
[your feedback and opinions](/contact) on the site. 
And if you manage to break something, you can [create an issue](https://github.com/freesewing/site/issues/new).

## One last thing
I've worked on this for about a year and a half, and especially the last 11 months or so rather intensively.

Now that it's ready, would you help me spread the news a little?

If you could tell somebody about this or perhaps tweet or write about it, you'd do me a real favour.

I've made it real easy for you with this handy box below <i class="fa fa-arrow-down" aria-hidden="true"></i>

Thank you



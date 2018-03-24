---
title: About freesewing
---
## The freesewing origin story

Sewing is easy. It really is. 
What's hard is getting things to fit properly. 
That's why you use a sewing pattern. 
It's a blueprint for whatever it is you are making. 
A good pattern gives you good fit. Most patterns don't.

That's because &mdash; much like clothes in the shop &mdash; patterns come in sizes. 
And sizes are a crude way to put people in boxes. 
They are made for an imaginary average person, rather than for you.

There's another way, and that is to draft a pattern based on your measurements. 
These made-to-measure patterns are vastly superior, but they require a lot of work.

I wanted to change that, and that effort evolved into 
[MakeMyPattern.com](https://makemypattern.com/).
I ran that site for a number of years, and it was a remarkable success.
Probably helped by the fact that I gave away all patterns for free.

In the world of home sewing, it tends to require a bit of 
explaining why one would choose to give away their work for free. 
Things are different in the open source world where the idea of 
sharing your work with others for the benefit of all is 
the very thread from which communities are woven.

While I can't magically bring the culture of open source 
to sewing patterns, I certainly can bring sewing patterns 
into the open source world.

[Freesewing.org](https://freesewing.org/) will continue to offer what 
[Makemypattern.com](https://makemypattern.com/) does today: 
free sewing patterns drafted to your measurements. 
But additionally, it will be open to your contributions.

Here's hoping that in the Venn diagram of the somewhat geeky and sewing, 
it's not just me in the middle.

## Freesewing in a nutshell? {#what}
This site generates sewing patterns based on your measurements.

To do so, you enter your measurements, pick your options, and your sewing pattern is drafted for you on the fly.

Once drafted, you can download your pattern as PDF in a variety of printable sizes.
You can also download the source SVG file.


## So how does it work? {#how}

> ##### Under the hood
> If you're curious as to how things *really* work, all our code is available 
> [on GitHub](https://github.com/freesewing/). You can check our
> [repository overview](/docs/repositories) or browse [the documentation](/docs).
{:.tip}

What you experience here on freesewing.org is a combination of different parts
working together:

##### The core platform
Freesewing **core** is the platform that is used to generate the sewing patterns.

It's like a toolbox for designing and generating made-to-measure sewing patterns.

##### The patterns
No graphical tools are used to create the patterns. Everything is implemented in code.

While **core** ships with a bunch of patterns, you can also extend it with your own.

##### The website

The **site** repository holds the entire frontend, including this page,
all the documentation, and everything you see on this website.

##### The backend

The **data** API stores all user data (account info, model data, comments and so on)
and sits between this website and the core platform.

##### The tiler

The **tile** repository holds out tiler. It's responsible for dividing your 
pattern into a number of pages so you can print it on your printer.


## What can freesewing do for me? {#me}

What's in it for you depends on what role you see yourself in.

### For makers

All our patterns are free of charge. We provide detailed instructions to make them into garments,
and can help when you get stuck.

We like to [showcase](/showcase) makes from the community, and share your work on our 
[Twitter](https://twitter.com/freesewing_org) and 
[Instagram](https://www.instagram.com/freesewing_org/)
accounts. Or checkout the #freesewing hashtag.

### For designers

Designing patterns for the freesewing platform has a lot of advantages for you as a designer.

On the technical side, you have powerful tools at your disposal that take care of a lot
of things for you (no more grading, ever).

You can host your patterns at freesewing.org (for free) or run your own
instance, and sell them. Custom pattern drafts provide your customers 
with a better experience, but also protect you from people copying and passing your
patterns around. Which means you can sell more patterns at a lower price point.

### For developers

All our code is open source, and you can fork it [on GitHub](https://github.com/freesewing).

We have documentation to help you use our code in your own projects. 
And our info service makes integration with your front-end child's play.


## How can I contribute to freesewing? {#contribute}

I welcome all contributions, and you have more to offer than your realize.

For all details, please refer to the [contributors documentation](/contribute).

Or you can support us by [becoming a Patron](/patrons/join).

* TOC - Do not remove this line
{:toc}


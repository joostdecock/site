---
layout: page
title: Getting started
tags: [fundamentals]
permalink: /getting-started
---
## Welcome
Hi there,

This getting started guide will walk you through 
[what freesewing is](#what-is-freesewing), 
[what it does](#what-does-freesewing-the-project-do), 
[what it can do for you](#what-can-freesewing-do-for-me), and 
[how you can contribute to it](#how-can-i-contribute-to-freesewing).

If at any point you feel lost, [help is available](/help).

## What is freesewing?

**[Freesewing is an online platform](#freesewing-is-an-online-platform) that [drafts 
custom sewing patterns](#freesewing-drafts-custom-sewing-patterns) 
[based on your measurements](#freesewing-patterns-are-based-on-your-measurements).**

Before I pick apart what that actually means, 
let's make sure we are all on the same page regarding terminology.

> <h5 class='notoc'>What is a freesewing draft?</h5>
>
> What you think of as a pattern, is called a **draft** in freesewing.
>
> A draft is a blueprint to make a garment that is to your 
> exact specifications. You can download a draft as a PDF and print it.
>
> <h5 class='notoc'>What is a freesewing pattern?</h5>
> 
> A **pattern** is a small
> software module that plugs into the freesewing platform. 
>
> A pattern is like a master plan, a recipe if you will.
> Its roles is to take your input, which is typically your
> measurements and options, and turn it into a draft.
>
> You can download a pattern too. But you would just have a bunch
> of software files.

### Freesewing is an online platform

Freesewing is online and web-based. Everything happens in your browser.

If you were looking for an offline tool for pattern drafting,
perhaps [the Valentina project](http://valentina-project.org/) is a better match.

### Freesewing drafts custom sewing patterns

Freesewing does not have a collection of standard patterns for you to download, 
as you might expect from an online pattern store.

We can do better: All freesewing patterns are drafted for you, on the fly, based on your input.

### Freesewing patterns are based on your measurements

Freesewing does not use sizes. It takes your measurements (and options) as input,
and out comes a custom pattern draft.

## What does freesewing (the project) do?

Our work is focussed on three main areas:

### We design patterns

Pattern design is a science. And like all sciences, the best way to get ahead
is to share our work and results openly with the community.

We design patterns to the best of our abilities, and share them freely because we 
are convinced that together with you, we can come up with far better results that 
on our own.

### We write code

No graphical tools are used to generate your pattern draft.
Both the drafting process, and the pattern your draft is based on, are implemented in code.

It's an approach that is perhaps unusual (pattern designers are used to fire up Illustrator, 
not an <abbr title="Integrated Development Environment">IDE</abbr>) but fits particularly well with the engineering challenge that are sewing patterns.

Moving a line a bit right or left in a graphical program is subjective, and hard to reproduce.
With code, you know what is going on and what you are changing to the very last detail.

### We provide documentation

This is certainly the most time-consuming work we do.
But we do it nevertheless because we believe it is important.

We try to document everything. From the code we write to how to sew up our patterns.
It's an ongoing process of tiny improvements that's never finished.

## What can freesewing do for me?

What's in it for you depends on what role you see yourself in.

### For makers

All our patterns are free of charge. We provide detailed instructions to make them into garments,
and can help when you get stuck.

We like to showcase makes from the community, and share your work on our 
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

## Freesewing fundamentals

### Building blocks

Freesewing is made up of a number of different components that work together.

#### Core

Freesewing core is the platform on which these other components depend. 

Unless you are a developer, it's sufficient to know that core provides a basis on which other components can build.

#### Patterns

A freesewing pattern is a component that plugs into the freesewing core.

The role of a pattern is to generate a _draft_ based on the measurements and options provided by the user.
A pattern is not lines on paper, but a piece of code to generate those lines.

#### Themes

A theme determines what your pattern will look like. 

The role of a theme is to decide what lines, logos, text, and so on should look like.
Themes can include code to do advanced stuff, or can merely be a collection of style sheets and other static definitions.

#### Channels

A channels guards the door to your freesewing instance and determines who gets in.

The role of a channel is two-fold:

- To determine whether or not we want to serve a given request
- To translate user input into something understood by core/themes/patterns

### Concepts

There's a number of concepts that you should be familiar with to _get_ freesewing.

#### The coordinate system

The coordinate system originates from the top left.

Coordinates are like text in a book. You start at the top on the left side,
and going to the right and downwards means going ahead.

On the X-axis, 30 is more to the right than 10, but less so than 40.

On the Y-axis, 15 is lower than 5, but higher than 50.

#### Units

Internally, freesewing uses millimeter. When you see 1, that's one mm. When we say 7.8, that's 7.8mm.

Users can supply their measurements and options in imperial or metric, and in any shape they want (mm, cm, m).
It's the role of the channel to convert everything to mm for processing by core.

#### SVG

Patterns are generated in SVG &mdash; short for Scalable Vector Graphics &mdash;, an XML-based vector image format and an open standard.

While you don't need to be an SVG expert, a basic understanding of the format will greatly help you to understand freesewing.

#### Bezier curves

While lines on computers are easy to store with a start and end point, curves require more information.

In freesewing, and in SVG and countless of other IT applications, curves are stored as 
[Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).
We use a start point, and end point, and two control points (one for the start point and one for the end point) to store bezier curves.

Bezier curves are more intuitive as you might think. Here is an example:

{% include bezier-demo.html %}

#### Pathstrings

Pathstrings are a way to describe a path &mdash; made up of curves and/or line segments &mdash; in text.
In freesewing, wesupport the following operations in pathstrings:

- `M` : Move. The move operation moves to a specific point. Moving does not draw anything. It.s like moving across the paper without putting your pencil down.
- `L` : Line. The line operation draws a line from where we are now to a given point.
- `C` : Curve. The curve operation expect 3 point names. Two points that control the curve (so-called control points) and point at the curve endpoint.
- `Z` or `z` : Close path. This will close your path by drawing a line from wherever you are now to where your path started.

## How can I contribute to freesewing?

We welcome all contributions, and you might have more to offer than your realize.

For all details, please refer to the [contributors documentation](/contributing).

* TOC - Do not remove this line
{:toc}


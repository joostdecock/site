---
layout: page
title: Freesewing fundamentals
tags: [fundamentals, designer docs, developer docs]
permalink: /docs/fundamentals
crumbs:
 - /docs|Docs
---
> ##### Freesewing is more than core
> The freesewing project involves other things besides **core**, 
> such as **freesewing site** (this website)
> and **freesewing data**, 
> our data API which handles user data like logins, comments, and so on.
> 
> Those things are not relevant when discussing the fundamentals of freesewing.
> Our focus is on understanding core.
{:.comment}

### Freesewing core

To understand freesewing, we will focus on **freesewing core**:
the platform that generates patterns.

The freesewing project involves other things besides **core**, 
such as **freesewing site** (this website)
and **freesewing data**, 
our data API which handles user data like logins, comments, and so on.

But those things are not relevant when discussing the fundamentals of freesewing.
Our focus is on understanding core.

{% include figure.html
  url='/img/fundamentals/core.svg'
  description='Schematic overview of the core platform'
%}

The core platform can also be extended with modules.
These modules come in three types: **channels**, **patterns**, and **themes**.

#### Channels

A **channel** guards the door to your freesewing core instance and determines who gets in.

The role of a channel is two-fold:

- To determine whether or not we want to serve a given request (access control)
- To translate user input into something understood by core/themes/patterns

For example, a channel may translate imperial measurements into metric, or 
treat requests from a mobile app differently than from a website.

> <h5 class='notoc'>Should I care about channels?</h5>
> If you're (thinking about) using freesewing to power your pattern company, 
> you probably want your own channel.
>
> That way, you can use your own names for measurements, you can only allow access to
> paying customers, or you can treat your website and mobile app in a different way.
>
> If you're not running your own isntance, you can mostly forget about channels.
{: .question }

#### Patterns

A **pattern** generates a _draft_ based on the measurements and options provided by the user.

In other words, the pattern does the heavy lifting of taking user input an transforming that
into something useful.

Patterns are single-purpose. They generate drafts, that's all they do.

#### Themes

A **theme** controls the look and feel. Its role is two-fold:

 - Format the draft 
 - Format the response

Formatting the draft is (hopefully) self-explanatory. The theme controls the 
colours of lines, fonts of the text, logos, and what notches and other patterns markings look like.

But themes can also format the request. For example, you could create a theme that doesn't
return the standard SVG, but turns that automatically in a PDF.

> ##### Should I care about themes?
> If you're (thinking about) using freesewing to power your pattern company, you will want to make a theme
> to make your patterns look like your patterns. Colours, line types, fonts, logo, and so on.
>
> If not, you can mostly forget about themes.
{: .question }


### Concepts

There's a number of concepts that you should be familiar with to _get_ freesewing.

#### The coordinate system

{% include figure.html
  url='/img/fundamentals/coordinates.svg'
  description="The SVG coordinate system"
%}
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

> <h5 class='notoc'>Go ahead and drag those handles</h5>
> 
> The image above is an interactive SVG that's embedded in the page.
> You can drag the handles to get a feel of Bezier curves.
>
> If you're on mobile, you might not get the greatest results.
{: .tip }

#### Pathstrings

Pathstrings are a way to describe a path &mdash; made up of curves and/or line segments &mdash; in text.
In freesewing, we support the following operations in pathstrings:

- `M` : Move. The move operation moves to a specific point. Moving does not draw anything. It.s like moving across the paper without putting your pencil down.
- `L` : Line. The line operation draws a line from where we are now to a given point.
- `C` : Curve. The curve operation expect 3 point names. Two points that control the curve (so-called control points) and point at the curve endpoint.
- `Z` or `z` : Close path. This will close your path by drawing a line from wherever you are now to where your path started.

Paths **always** start with a M (move) operation. That is because all operations start from the current point.

For example, when drawing a line, you don't give it the start and the end point, but only the end point.
That's because, once again, all path operations start from the current point.

But when you start your path, there isn't a current point yet. So you start by moving to a point.

## Services
Freesewing core provides 4 different services. If the description below leaves you guessing,
you can try them all in [our demo](https://demo.freesewing.org/).

### The draft service
{% include figure.html
  url='/img/fundamentals/draft.svg'
  description='Sample output from the draft service'
%}
The draft service drafts patterns. It's sort of our main thing, and probably the reason you're reading this in the first place.

### The sample service
{% include figure.html
  url='/img/fundamentals/sample.svg'
  description='Sample output from the sample service'
%}
The sample service samples model measurements or pattern options.

A sample is a simplified version of the pattern that has just the seamlines.
The sample service can make such a simplified draft for a number of different models
(with different measurements) and stack them on top of each other.
This way, designers can check how their pattern adapts/grades to different sizes.

Or the sample service can use the same model, but itterate between the minimum and maximum
values of a given option. This way, you can check how the option impacts the pattern.

### The compare service
{% include figure.html
  url='/img/fundamentals/compare.svg'
  description='Sample output from the compare service'
%}
The compare service exists because people will miss-measure. It happens.

But when it does, it can be hard to know your pattern is wrong in the absence of
something to compare it to. That's where the compare service comes in.

It is a combination of the draft service and the sample service.
It will first created a stack of sampled drafts for standard models, and then stack your
own draft on top of that.

This way, you can simply eyeball your own pattern in comparison to a range of other models.


### The info service
```
{
  "services": [
    "info",
    "draft",
    "sample",
    "compare"
  ],
  "patterns": {
    "Core":{
      "AaronAshirt":"Aaron A-Shirt",
      "BrianBodyBlock":"Brian Body Block",
      "BruceBoxerBriefs":"Bruce Boxer Briefs",
      "CathrinCorset":"Cathrin Corset",
      "HugoHoodie":"Hugo Hoodie",
      "SimonShirt":"Simon Shirt",
      "SvenSweatshirt":"Sven Sweatshirt",
      "TamikoTop":"Tamiko Top",
      "TheoTrousers":"Theo trousers",
      "TheodoreTrousers":"Theodore trousers",
      "TrayvonTie":"Trayvon Tie",
      "WahidWaistcoat":"Wahid Waistcoat"
  }
}
```
The info service provides information about the core platform. It serves to facilitate 
frontend integration.
As such, it's mostly relevant to developers and site builders.

[Our demo](https://demo.freesewing.org/) uses the info service. It doesn't know what patterns we have, or what options each
pattern has. But it doesn't have to, it can simply ask the info service.


* TOC - Do not remove this line
{:toc}


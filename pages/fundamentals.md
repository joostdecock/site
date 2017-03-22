---
layout: page
title: Freesewing fundamentals
tags: [fundamentals]
permalink: /fundamentals
---
### Building blocks

Freesewing is made up of a number of different components that work together.

#### Core

Freesewing core is the platform on which these other components depend. 

Unless you are a developer, it's sufficient to know that core is the toolbox you have at your disposal.

#### Patterns

A freesewing pattern is a component that plugs into the freesewing core.

The role of a pattern is to generate a _draft_ based on the measurements and options provided by the user.
A pattern is not lines on paper, but a piece of code to generate those lines.

> <h5 class='notoc'>Don't confuse pattterns with drafts</h5>
>
> What you think of as a **pattern** is called a **draft** in freesewing.
>
> A **pattern** is a small software module that plugs into the core platform.
> It's like a master plan, a recipe if you will. 
>
> A **draft** is what a pattern generates. An SVG file that you can edit in
> a graphic design tool, or turn into a PDF and print.

#### Themes

A theme determines the visual properties of your drafts. In other words,
what they will look like.

> <h5 class='notoc'>Should I care about themes?</h5>
> If you're (thinking about) using freesewing to power your pattern company, you will want to make a theme
> to make your patterns look like your patterns. Colours, line types, fonts, logo, and so on.
>
> If not, you can mostly forget about themes.

#### Channels

A channels guards the door to your freesewing instance and determines who gets in.

The role of a channel is two-fold:

- To determine whether or not we want to serve a given request
- To translate user input into something understood by core/themes/patterns

> <h5 class='notoc'>Should I care about channels?</h5>
> If you're (thinking about) using freesewing to power your pattern company, 
> you probbaly want your own channel.
>
> That way, you can use your own names for measurements, you can only allow access to
> paying customers, or you can treat your website and mobile app in a different way.
>
> Chanced are, you can mostly forget about channels.

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

## Services
Freesewing core provides 4 different services. If the description below leaves you guessing,
you can try them all in [our demo](/demo).

### The draft service
The draft service drafts patterns. It's sort of our main thing, and probably the reason you're reading this in the first place.

### The sample service
The sample service samples model measurements or pattern options.

A sample is a simplified version of the pattern that has just the seamlines.
The sample service can make such a simplified draft for a number of different models
(with different measurements) and stack them on top of each other.
This way, designers can check how their pattern adapts/grades to different sizes.

Or the sample service can use the same model, but itterate between the minimum and maximum
values of a given option. This way, you can check how the option impacts the pattern.

### The compare service
The compare service exists because people will miss-measure. It happens.

But when it does, it can be hard to know your pattern is wrong in the absence of
something to compare it to. That's where the compare service comes in.

It is a combination of the draft service and the sample service.
It will first created a stack of sampled drafts for standard models, and then stack your
own draft on top of that.

This way, you can simply eyeball your own pattern in comparison to a range of other models.


### The info service
The info service provides information about the core platform. It serves to facilitate 
frontend integration.
As such, it's mostly relevant to developers and site builders.

Our demo uses the info service. It doesn't know what patterns we have, or what options each
pattern has. But it doesn't have to, it can simply ask the info service.

## Configuration files

The full details on configuration files are [here](/config), but you can get away with 
knowing only this:

- The freesewing global configuration file is `config.yml` and is located at the root of the project.
- Pattterns and themes have their own `config.yml` in their folder root.
- Channels can have their own `config.yml` in their folder root.

## Request parameters
Freesewing needs your input to do what it does. And that input comes in the form or request parameters.

The full details on all request parameters are available [here](request-parameters). 
But you can get away with knowing only this:

### The basics

#### service

The mandatory **service** parameter must be one of:

- draft
- sample
- compare
- info

Browser example: `index.php?service=info`

Command line example: `./freesewing service=info`

### info service parameters

#### format

The **format** parameters must be one of these:

- json
- text
- php
- html

and defaults to json. It controls the output format of the info service.

Browser example: `index.php?service=info&format=html`

Command line example: `./freesewing service=info format=text`

#### pattern

The **pattern** parameter, if present, must be the exact name of a pattern folder/class.

If the pattern is present, the info service will return info on the pattern.
If not, the info service will return genreal info about the platform.

Browser example: `index.php?service=info&format=html&pattern=AaronAshirt`

Command line example: `./freesewing service=info format=text pattern=AaronAshirt`

### draft service parameters

#### pattern

The mandatory **pattern** parameter, if present, must be the exact name of a pattern folder/class.

Browser example: `index.php?service=draft&pattern=AaronAshirt`

Command line example: `./freesewing service=draft pattern=AaronAshirt`

#### theme

The optional **theme** parameter must be the exaact name of a themes folder/class.

Browser example: `index.php?service=draft&pattern=AaronAshirt&theme=Designer`

Command line example: `./freesewing service=draft pattern=AaronAshirt&theme=Paperless`


* TOC - Do not remove this line
{:toc}


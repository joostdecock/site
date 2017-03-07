---
layout: page
title: Freesewing fundamentals
tags: [fundamentals, getting-started]
permalink: /fundamentals
---
## Building blocks

Freesewing is made up of a number of different components that work together.

### Core

Freesewing core is the platform on which these other components depend. 

Unless you are a developer, it's sufficient to know that core provides a basis on which other components can build.

### Patterns

A freesewing pattern is a component that plugs into the freesewing core.

The role of a pattern is to generate a _draft_ based on the measurements and options provided by the user.
A pattern is not lines on paper, but a piece of code to generate those lines.

### Themes

A theme determines what your pattern will look like. 

The role of a theme is to decide what lines, logos, text, and so on should look like.
Themes can include code to do advanced stuff, or can merely be a collection of style sheets and other static definitions.

### Channels

A channels guards the door to your freesewing instance and determines who gets in.

The role of a channel is two-fold:

- To determine whether or not we want to serve a given request
- To translate user input into something understood by core/themes/patterns

## Concepts

There's a number of concepts that you should be familiar with to _get_ freesewing.

### The coordinate system

The coordinate system originates from the top left.

Coordinates are like text in a book. You start at the top on the left side,
and going to the right and downwards means going ahead.

On the X-axis, 30 is more to the right than 10, but less so than 40.

On the Y-axis, 15 is lower than 5, but higher than 50.

### Units

Internally, freesewing uses millimeter. When you see 1, that's one mm. When we say 7.8, that's 7.8mm.

Users can supply their measurements and options in imperial or metric, and in any shape they want (mm, cm, m).
It's the role of the channel to convert everything to mm for processing by core.

### SVG

Patterns are generated in SVG &mdash; short for Scalable Vector Graphics &mdash;, an XML-based vector image format and an open standard.

While you don't need to be an SVG expert, a basic understanding of the format will greatly help you to understand freesewing.

### Bezier curves

While lines on computers are easy to store with a start and end point, curves require more information.

In freesewing, and in SVG and countless of other IT applications, curves are stored as 
[Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).
We use a start point, and end point, and two control points (one for the start point and one for the end point) to store bezier curves.

Bezier curves are more intuitive as you might think. Here is an example:

{% include bezier-demo.html %}

### Pathstrings

Pathstrings are a way to describe a path &mdash; made up of curves and/or line segments &mdash; in text.
In freesewing, wesupport the following operations in pathstrings:

- `M` : Move. The move operation moves to a specific point. Moving does not draw anything. It.s like moving across the paper without putting your pencil down.
- `L` : Line. The line operation draws a line from where we are now to a given point.
- `C` : Curve. The curve operation expect 3 point names. Two points that control the curve (so-called control points) and point at the curve endpoint.
- `Z` or `z` : Close path. This will close your path by drawing a line from wherever you are now to where your path started.

## Conventions

FIXME


* TOC - Do not remove this line
{:toc}


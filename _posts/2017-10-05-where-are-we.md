---
layout: blog
title: "Where the hell are we anyway? Or handling conditional code execution in extended patterns"
linktitle: "Conditional code in extended patterns"
img: compass.jpg
caption: "Think of Pattern::requested as your compass"
author: joostdecock
category: core
blurb: "Sometimes we want to know inside a class/pattern whether we are the actual pattern the user wants, or merely a stepping stone to get there."
---
Because in freesewing, patterns are implemented as their own classes, 
we can make use of a concept called 
*[class inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming))*.

It's the principle that one pattern can *extend* another pattern. When doing so, it will *inherit* all its functions and properties, and can choose to override those with its own implementation.

This scenario is common and --- once you get the hang of it --- rather intuitive.

Patterns contain a bunch of methods, and when a method is not implemented, the method from the (grand)father class/pattern is used.

{% include blogfigure.html img="minime.jpg" caption="Class inheritance: Think mini-me" %}

But recently I bumped into a scenario where this mechanism didn't give me the flexibility I needed.  
I was dealing with a use case that is rather common in pattern design: trueing your seams.

## About trueing seams 

To *true a seam* is a bit of pattern design jargon. It means to match the seamlength of two seams that need to be joined together.

When designing a pattern, we first come up with a shape that should work in theory. But we need to add a reality check to make sure things actually work in practice too.

For example, when designing a trouser pattern, the inseam of the front leg panel and back leg panel need to be matched. But because both panels are shaped differently, there's no guarantee they will match when the panels are drafted initially.

{% include figure.html url="/img/blog/where-are-we/meme.jpg" description="Actually, it's more a matter of figuring out whether one should in the first place" %}

Obviously, we can't depend on sheer luck, so after the first basic draft of the pattern, we have to check the length of the inseam of front and back panel, and if they don't match up, adjust them until they do.

This is called *trueing your seams*. Classic pattern designers do this once when designing the pattern. But because patterns on freesewing are drafted on the fly based on your measurements, this needs to happen on the fly too.

## To true or not to true? A practical example

So far so good. We need to make sure that things match up by trueing our seams. But things get more complicated when we start to extend our patterns.

I recently came accross this issue while working on some new patterns, and I thought it might be a good idea to illustrate the issue based on a real-word example, and also outline my solution for it.

Here's the deal: I'm designing a new trouser block for men. It's called **Trent**. I'm also, in parallel, working on a selvedge jeans block for men called **Seth**.

The selvedge block, **Seth**, is based on --- or extends --- the regular block, **Trent**. Or in other words, **Trent** is the parent, and **Seth** is the child pattern.

{% include figure.html url="/img/blog/where-are-we/trentSeth.png" description="Seth extends Trent" %}

Both of these patterns need to have their seams trued. But only if they are the last link in the chain.

What I mean is, if somebody wants to use the basic Trent block, we should true its seams. Likewise, if somebody wants to use the Seth block, we should true its seams too. 

> You only want to true your seams at the very end of your drafting process
{:.quote}

But here's the catch: Seth depends on Trent, so when we draft Seth, we first draft Trent and use that as a starting point for Seth.

And in this case we **should not**  true the seams of Trent because that is not only pointless and wasteful, it will result in a worse pattern.

Think about it: We draft Trent as best as possible. Then we implement our reality-check to true the seams. In doing so, we deviate ever so slightly from the best theoretical pattern.

But Seth will change the legs parts of the pattern, and so once again we will need to true these seams. So there really is no point in trueing the seems in Trent. It's work done for nothing, and it's better to base Seth on the optimal theoretical draft, without our reality check.

It boils down to this: You only want to true your seams at the very end of your drafting process. Not somewhere at the start or in the middle.

## How do you know where you are in the drafting process? Ask `Pattern::requested()`

When we're drafting our pattern, we need to know whether this is the end of the drafting process, or are we just preparing the ground work for some other pattern to extend on later.

Since freesewing core v1.2.0, there's a new method for that: [`Pattern::requested()`](/docs/core/classdocs/patterns/core/pattern#requested). 
This method gives you --- at all times --- the full class name of the pattern that was requested by the user (hence the name). In other words, the pattern at the end of our drafting process.

> Sometimes we want to know inside a class/pattern whether we are the actual pattern the user wants, or merely a stepping stone to get there
{:.quote}

Knowing what pattern the user requested is one part of the equation. We also need to know where we are currently. Are we in a method implemented by the requested pattern, or in one inherited from a parent patern?

Luckily, PHP has a magic variable called `__CLASS__` that always gives us the full name of the current class. In other words, the full name of the current pattern.

Now we can compare `Parrent::requested()` to `__CLASS__` and if it matches, we know we should true the seams (in our example).

In practice, it looks something like this:

```php?start_inline
if( __CLASS__ === $this->requested() ) {
    // True seams here
}
```

## Summary

I hope the practical example of trueing seams was helpful. But this issue is more generic than that. 

It boils down to the fact that sometimes we want to know inside a class/pattern whether we are the actual pattern the user wants, or merely a stepping stone to get there.

By comparing `$this->requested()` to the special `__CLASS__` variable inside a pattern, we can check at any point in any class/pattern whether this is the case or not.


---
layout: page
title: Design tutorial part 1 - Your first pattern
tags: [fundamentals, designer, tutorial]
permalink: /designer/tutorial/part-1
---
In part one of our tutorial for designers, we'll get you up and running 
with your own pattern based on our pattern template.

## Before we start

### Prerequisites 

Before you start this tutorial, made sure to read the 
[Getting started guide](/getting-started),
specifically the [What is freesewing?](/getting-started#what-is-freesewing) section.

### You'll be writing code

Freesewing is a software project, and the pattern we are going to design will be a small _module_ that plugs into it.

If you've never written any code, don't panic. We'll take it one step at a time.

### About our pattern
We are going to make a pattern for a baby bib.  

{:.comment}
> <h5 class='notoc'>Are you f*&~ing kidding me?</h5>
>
> I'll be the first to admit that a bib is not only boring beyond belief, 
> it's also beneath the skills of any self-respecting pattern designer.
> 
> But that's the point. We're not teaching you pattern drafting.
> We're teaching you the platform. The example is stupid, so you can focus
> all your attention on the way we do things.
>
> Trust me, it'll be fine.

### Don't just read, do
For the best learning experience, you should design the pattern as we go along,
doing all the steps as I explain them here.

For that, you'll need to have your own instance of freesewing setup.
If you have that, great. If not, please check the [install instructions](/install)
and come back here when you've got it up and running.

Or you can just read along with this guide, that's fine too.

### Where to get help

If you're stuck, it's good to know [help is available](/help).

Now let's get to it, shall we?

## Creating the pattern

### Copy the pattern template

The `patterns` directory holds all the patterns. Each pattern is self-contained 
in its own folder.

One of the folders is called `PatternTemplate`. This is
&mdash; you guessed it &mdash;
the pattern template that we will use as a starting point.

Copy the entire directory into a new directory 
(on the same level in the `patterns` folder) 
and name it `BabyBib`.

> <h5 class='notoc'>Freesewing naming conventions</h5>
>
> How we name things is important. All the relevant info 
> is available on [the page on naming conventions](/naming-conventions).
>
> For now, just make sure to write `BabyBib` 
> with two capital `B` letters, as shown.

### Rename the class file

In your `BabyBib` folder, you'll have these files:

- {:.folder} sample
- {:.code} PatternTemplate.php
- config.yml
{:.files}

We'll ignore the `sample` folder for now, and focus on the two other files.

The `PatternTemplate.php` file is the class file. This will hold the code for
our pattern. It still carries the name from the template we copied it from,
so go ahead and rename it to `BabyBib.php`.

### Update the configuration file

The other file is `config.yml`, this is your pattern configuration file.

> <h5 class='notoc'>Freesewing uses YAML for configuration files</h5> 
>
> All freesewing configuration files have a `.yml` extention. They are 
> [YAML](https://en.wikipedia.org/wiki/YAML) files. 
>
> Yaml is a format that's easy
> to write and read for both humans and computers.

Open the `config.yml` file, and edit it so it looks like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-config" role="tab" data-toggle="tab">config.yml</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-config" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-config" markdown="1">

```yml
info:
    name: "My baby bib pattern"

parts:
    bib: "Baby bib"

measurements:
    chestCircumference: 489
    headCircumference: 472

options:
    lengthBonus:
        type: "measure"
        min: -50
        max: 150
        default: 0
```

</div>
<div role="tabpanel" class="tab-pane" id="template-config" markdown="1">

```yaml
hidden: true
info:
    name: "Pattern Template"
    version: "1.0"
    date: 20170118
    author: "Joost De Cock"
    email: "joost@decock.org"
    company: "freesewing.org"

parts:
    examplePart: "Example Part"

languages:
    en: "English"

measurements:
    exampleMeasurement: 520

options:
    measureOption:
        type: "measure"
        min: 1
        max: 5
        default: 3
    percentOption:
        type: "percent"
        default: 50
    chooseOneOption:
        type: "chooseOne"
        options:
            1: "Option 1"
            2: "Option 2"
        default: 1
```
</div>
</div>

Let's see what we've changed, and what it means:

- We've removed the `hidden: true` line. 
We want people to be able to find our BabyBib pattern, so we won't hide it.
- We've set a `name` in the `info` section. A `name` can be anything you
want, and is the only mandatory part of the info section
- We've removed the `languages` section. We'll deal with it later.
- We've added two measurements, `chestCircumference` and `headCircumference` 
and provided default values for them, in mm.
- We've configured a `lengthBonus` options of type `measure`.
It's default is `0`, but it accepts values between `-50` and `150` mm.

> <h5 class='notoc'>mm inside</h5>
>
> Freesewing uses mm internally. See the [units documentation](/fixme) for full details.

> <h5 class='notoc'>Pattern configuration</h5>
>
> The [configuration files](/developer/config-files#pattern-configuration-file) has all the details on the
> configuration files for patterns.

With our config file updated, time to have a look at the class file.

### Update the class file

Next, open the `BabyBib.php` file and edit just the start of it, to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-head" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-head" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-head" markdown="1">

```php
<?php
/** Freesewing\Patterns\BabyBib class */
namespace Freesewing\Patterns;

use Freesewing\Utils;
use Freesewing\BezierToolbox;

/**
 * Making a baby bib pattern
 */
class BabyBib extends Pattern
{
...
```
</div>
<div role="tabpanel" class="tab-pane" id="template-head" markdown="1">
```php
<?php
/** Freesewing\Patterns\PatternTemplate class */
namespace Freesewing\Patterns;

use Freesewing\Utils;
use Freesewing\BezierToolbox;

/**
 * A pattern template
 *
 * If you'd like to add you own pattern, you can copy this class/directory.
 * It's an empty skeleton for you to start working with
 *
 * @author Joost De Cock <joost@decock.org>
 * @copyright 2017 Joost De Cock
 * @license http://opensource.org/licenses/GPL-3.0 GNU General Public License, Version 3
 */
class PatternTemplate extends Pattern
{
...
```

</div>
</div>

Once again, let's look at what we've changed and what it means:

- We have changed the class name from `PatternTemplate` to `BabyBib`
in the comment block (line 2), 
in the namespace declaration (line 3), and in the class declaration (line 8)
- We have replaced the comments with our own comments that simply say `Making a baby bib pattern`

### Rebuild the autoload files

In a command prompt, navigate to the root of the freesewing project, and issue the following command:

```sh
composer dump-autoload -o
```

It should output a message like this:

```sh
Generating optimized autoload files
```

This will tell the autoloader about the new `Freesewing\patterns\BabyBib` class, which defines your pattern.

### Load the pattern in your browser

From this moment onward, your pattern will show up in the demo, and you should see it by navigating to:

```
index.php?service=draft&pattern=BabyBib&theme=Designer
```

> <h5 class='notoc'>Use the Designer theme when designing</h5>
>
> That `theme=Designer` bit in the URL means we'll be using the [`Designer`](/class/themes/designer) theme.
> It includes a lot of extra info in the output that will facilitate your design work.

You will get an empty page, as our patttern doesn't do anything yet. But if you look at the source 
of the page, the start of it should look like this:

```html
<?xml version="1.0" encoding="UTF-8" standalone="no"?>


<!--

    
          __                           _           
         / _|_ _ ___ ___ ________ __ _(_)_ _  __ _ 
        |  _| '_/ -_) -_|_-< -_) V  V / | ' \/ _` |
        |_| |_| \___\___/__|___|\_/\_/|_|_||_\__, |
                      freesewing.org         |___/ 
    
```

## Initialize your pattern

Time to dive into our class, and we'll start at the top, with the INITIALISE section.

Update your class file to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-initialize" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-initialize" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-initialize" markdown="1">

```php?start_inline=1
class BabyBib extends Pattern
{
    /*
        ___       _ _   _       _ _
       |_ _|_ __ (_) |_(_) __ _| (_)___  ___
        | || '_ \| | __| |/ _` | | / __|/ _ \
        | || | | | | |_| | (_| | | \__ \  __/
       |___|_| |_|_|\__|_|\__,_|_|_|___/\___|

      Things we need to do before we can draft a pattern
    */

    /**
     * Sets up options and values for our draft
     *
     * @param \Freesewing\Model $model The model to sample for
     * @return void
     */
    public function initialize($model)
    {
        // Set value headNeckRatio value for use later
        $this->setValue('headNeckRatio', 0.8);
    }

```
</div>
<div role="tabpanel" class="tab-pane" id="template-initialize" markdown="1">

```php?start_inline=1
class PatternTemplate extends Pattern
{
    /*
        ___       _ _   _       _ _
       |_ _|_ __ (_) |_(_) __ _| (_)___  ___
        | || '_ \| | __| |/ _` | | / __|/ _ \
        | || | | | | |_| | (_| | | \__ \  __/
       |___|_| |_|_|\__|_|\__,_|_|_|___/\___|

      Things we need to do before we can draft a pattern
    */

    /**
     * Set your constants here
     */
    const EXAMPLE_CONSTANT = 52;

    /**
     * Sets up options and values for our draft
     *
     * By branching this out of the sample/draft methods, we can
     * set a bunch of options and values the influence the draft
     * without having to touch the sample/draft methods
     * When extending this pattern so we can just implement the
     * initialize() method and re-use the other methods.
     *
     * Good to know:
     * Options are typically provided by the user, but sometimes they are fixed
     * Values are calculated for re-use later
     *
     * @param \Freesewing\Model $model The model to sample for
     *
     * @return void
     */
    public function initialize($model)
    {
        // You could fix options here. For example, when you extend a
        // pattern that has options that you don't want to offer to users
        $this->setOption('percentOption', self::EXAMPLE_CONSTANT);

        // Set values for use later
        $this->setValue('exampleValue', time());
    }
```

</div>
</div>

### Setting values

We mostly removed things, but we did make some changes to the `initialize` method. 
Specifically this line where we've set a value called `headNeckRatio` and assigned it `0.8`:

```php?start_inline=1
$this->setValue('headNeckRatio', 0.8);
```

There are few important lessons to learn here:

### Using $this

`$this` is a special variable name that always refers to the class itself. 

In our case, it refers to
the `BabyBib` class. Or more precisely, the object of that class we are working with.

### Objects and their methods

The `->` syntax means _run the method that follows on the object_. So in our case, `$this->setValue` means 
_run the `setValue` method on our `BabyBib` object_.

Later, we'll do things like `$model->getMeasurement('chestCircumference')`, which calls the 
`getMeasurement` method on the `$model` object with `chestCircumference` as a paramter.

Can you guess what it will do?

### Class inheritance

If you've looked at our `BabyBib` class in detail, you wil notice that it does not have a method
called `setValue`. 

But it still works because our class declaration looks like this:

```php?start_inline=1
class BabyBib extends Pattern
```

Our `BabyBib` class _extends_ `Pattern` class. `Pattern` is our so-called _parent class_.

As a child of the `Pattern` class, we inherit (like, get for free) a bunch of it's functionality.

> <h5 class='notoc'>Class inheritance is crucial in pattern design</h5>
>
> Sure, it's nice that we get the `setValue` method for free. But class inheritance 
> plays an important role in pattern design.
>
> It is very common for one pattern to be based on another (often called a block).
> Because this system of inheritance is build right into the code, we can leverage it
> to easily extend one pattern into another.

Because the `Pattern` class has a `setValue` method, we can just use it as it its part of our class
and behind the scenes, the `setValue` method of the `Pattern` class will be called.

Until we decide that we want to implement our own `setValue` method. What we define ourselves
takes precedence over what our parent class provides.

If you'd like to know all the methods the `Pattern` class offers, click here: [`Pattern`](/class/patterns/pattern).

> <h5 class='notoc'>Recognising links to the class documentation</h5>
> Anytime you see a link styled like this: [`Pattern`](/class/patterns/pattern), it is a link to the 
class documentation.
>
> When we link to a specific method of a class, things will look like this: 
[`Pattern::setValue`](/class/patterns/pattern#setvalue)

### Method parameters
When we called the [`Pattern::setValue`](/class/patterns/pattern#setvalue) method, we gave it two parameters:

```php?start_inline=1
$this->setValue('headNeckRatio', 0.8);
```

A parameter is a piece of information that a method can go to work with. 

The number of parameters a method expects, and what they should/can be varies.
But don't despair, it's all documented in the documentation of the different classes.

### The initialize method
It's a freesewing convention to use an `initialize` method to set up everything before starting to
do the actual work. It makes it easier for people to build on your work, without having
to change the tricky parts of your code.

Calling the `initialize` method is the first thing we'll do when we put our pattern to work.

## Draft your pattern

The next thing we'll tackle is the DRAFT section. 

### The sample method
We'll start with the [`Pattern::sample`](/class/patterns/pattern#sample) method. 

> <h5 class='notoc'>The sample method is mandatory</h5>
>
> Every pattern **must** have a `sample` method, because it will be called by the sample service.

Edit the relevant section of your class file to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-sample" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-sample" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-sample" markdown="1">

```php?start_inline=1
    /*
        ____             __ _
       |  _ \ _ __ __ _ / _| |_
       | | | | '__/ _` | |_| __|
       | |_| | | | (_| |  _| |_
       |____/|_|  \__,_|_|  \__|

      The actual sampling/drafting of the pattern
    */

    /**
     * Generates a sample of the pattern
     *
     * @param \Freesewing\Model $model The model to sample for
     *
     * @return void
     */
    public function sample($model)
    {
        // Setup all options and values we need
        $this->initialize($model);

        // Draft our bib
        $this->draftBib($model);
    }
```
</div>
<div role="tabpanel" class="tab-pane" id="template-sample" markdown="1">

```php?start_inline=1
    /*
        ____             __ _
       |  _ \ _ __ __ _ / _| |_
       | | | | '__/ _` | |_| __|
       | |_| | | | (_| |  _| |_
       |____/|_|  \__,_|_|  \__|

      The actual sampling/drafting of the pattern
    */

    /**
     * Generates a sample of the pattern
     *
     * Here, you create a sample of the pattern for a given model
     * and set of options. You should get a barebones pattern with only
     * what it takes to illustrate the effect of changes in
     * the sampled option or measurement.
     *
     * @param \Freesewing\Model $model The model to sample for
     *
     * @return void
     */
    public function sample($model)
    {
        // Setup all options and values we need
        $this->initialize($model);

        // Draft our example part
        $this->draftExamplePart($model);
    }
```

</div>
</div>

The sample method will be called by the [`SampleService`](/class/services/sampleservice)
and is expected to draft a basic outline of your pattern.

First we call our own `initialize` method that we created earlier.

Then, we'll call the `draftBib` method that we'll get to in a moment, and pass it our [`Model`](/class/model) object.

> It's a good habit to keep your sample method simple, and draft each part in its own method.

### Creating the draftBib method

Before we get to the real pattern drafting, we have to create the `draftBib`, because we just called in 
in our `initialize` method, but it doesn't exist yet.

We are going to replace the `draftExamplePart` method from the template with our own `draftBib` method.

Edit the relevant section of your class file to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-draftbib" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-draftbib" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-draftbib" markdown="1">

```php?start_inline=1
    /**
     * Drafts our bib
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function draftBib($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['bib'];
    
    }
```
</div>
<div role="tabpanel" class="tab-pane" id="template-draftbib" markdown="1">

```php?start_inline=1
    /**
     * Drafts the examplePart
     *
     * We are using a draft[part name] scheme here but
     * don't let that think that this is something specific
     * to the draft service.
     *
     * This draft method does the basic drafting and is
     * called by both the draft AND sample methods.
     *
     * The difference starts after this method is done.
     * For sample, this is all we need, but draft calls
     * the finalize[part name] method after this.
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function draftExamplePart($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['examplePart'];
    }
```

</div>
</div>

With the skeleton of our `draftBib` method ready to go, we are ready for action.

### Designing the neck opening

We're starting with the hardest part of the entire pattern: the neck opening.

It's not difficult to draw a neck opening, but we're going to draw a _precise_ neck opening.

Remember that we set the `headNeckRatio` to `0.8`? That's because we want our neck opening to be
80% of the `headCircumference` measurement. 

While easy for a circle, drawing an oval with a certain circumference is non-trivial. 
On paper, you would draw an oval,
measure along its edge, and then redraw it until you are happy with the result.

Well, we'll be doing exactly that. Below is the code. Don't panic, we'll walk through it together.


<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#neckopening-code" role="tab" data-toggle="tab">Code</a></li>
    <li class="nav-item"><a class="nav-link" href="#neckopening-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="neckopening-code" markdown="1">

```php?start_inline=1
    public function draftBib($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['bib'];
        
        // Let's start with a precise neck opening
        $this->setValue('neckOpeningFactor', 1);
        $delta = 1;
        do {
            if($delta > 0) {
                $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 0.99);
            } else {
                $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 1.015);
            }
            $p->newPoint(1, 0, $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 'Bottom of the neck opening');
            $p->newPoint(2, $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 0, 'Right side of neck opening');
            $p->addPoint(3, $p->shift(1,0,$p->x(2)/2), 'Right control point for neckBottom');
            $p->addPoint(4, $p->shift(2,-90,$p->y(1)/2), 'Bottom control point for neckRight');
            
            $delta = $this->neckOpeningDelta($model, $p);
            $this->msg("Neck opening is $delta mm off"); 
        } while (abs($delta) > 1);
        
        // Mirror quarter opening around X axis
        $flip = [2,3,4];
        foreach($flip as $id) {
            $p->addPoint($p->newId('left'), $p->flipX($id, 0));
        }

        // Mirror half opening around Y axis
        $flip = [1,3,4,'left2','left3'];

        foreach($flip as $id) {
            $p->addPoint($p->newId('top'), $p->flipY($id, 0));
        }

        // Draw the neck opening
        $p->newPath('neckOpening', 'M 1 C 3 4 2 C top3 top2 top1 C top4 top5 left1 C left3 left2 1 z');
    }

    protected function neckOpeningDelta($model, $part)
    {
        $length = $part->curveLen(1,3,4,2) * 4;
        $target = $model->m('headCircumference') * $this->v('headNeckRatio');
        return $length - $target;
    }
```
</div>
<div role="tabpanel" class="tab-pane" id="neckopening-result" markdown="1">

{% include figure.html 
    description="The neckopening is exactly the size we want it to be"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=neckOpening"
%}

</div>
</div>

#### Popular methods and their aliases

Some methods are used so often that we've created a shorter to
type alias for them, to save you time. In the example above:

- `$this->v` is an alias for `$this->getValue`, see [`Pattern::getValue`](/class/patterns/pattern#getvalue)
- `$model->m` is an alias for `$model->getMeasurement`, see [`Model::getmeasurement`](/class/model#getmeasurement)

Another important alias method is:

- `$this->o` which is an alias for `$this->getOption`, see [`Pattern::getOption`](/class/patterns/pattern#getoption)

#### Adding points with Part::newPoint

Let's start with these 4 lines:

```php?start_inline=1
$p->newPoint(1, 0, $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 'Bottom of the neck opening');
$p->newPoint(2, $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 0, 'Right side of neck opening');
$p->addPoint(3, $p->shift(1,0,$p->x(2)/2), 'Right control point for neckBottom');
$p->addPoint(4, $p->shift(2,-90,$p->y(1)/2), 'Bottom control point for neckRight');
```

We're adding two points with [`Part::newPoint`](/class/part#newpoint) and 
two points with [`Part::addPoint`](/class/part#addpoint).

The difference is that [`Part::newPoint`](/class/part#newpoint) expects and X and Y 
coordinate, while [`Part::addPoint`](/class/part#addpoint) expects a [`Point`](/class/point) object.

Both of them taken an optional third parameter which is a description of the point.
You can see that we used that to clarify things a bit.

The first line can also be written as such:

```php?start_inline=1
$p->newPoint(
    1, 
    0, 
    $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 
    'Bottom of the neck opening'
);
```

We passed 4 parameters to [`Point::newPoint`](/class/part#newpoint):

- A name for the point, we went with `1` because that's easy
- The X-coordinate, which is `0`
- The Y-coordinate, which is the result of `$this->v('neckOpeningFactor') * $model->m('headCircumference')/8`
- An optional description, we went with `Bottom of the neck opening`


So the Y-coordinate of our point is the `headCircumference` measurement divided by 8, and then
multiplied by a thing called the `neckOpeningFactor`. We'll get to that later.

The second line can be written as such:

```php?start_inline=1
$p->newPoint(
    2, 
    $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 
    0, 
    'Right side of neck opening'
);
```

We can see that we are adding a new point `2`. This time, the Y-coordinate will be zero, 
while the X-coordinate is the result of the `headCircumference` measurement divided by 6, and multiplied
by that same `neckOpeningFactor` that we'll get to later.

#### Adding points with Part::addPoint

The third line can be written as such:

```php?start_inline=1
$p->addPoint(
    3, 
    $p->shift(1,0,$p->x(2)/2), 
    'Right control point for neckBottom'
);
```

We're using [`Point::addPoint`](/class/part#addpoint) here. We still give it a name for the point (`3`)
but instead of giving it an X and Y coordinate, we give it the result of `$p->shift(1,0,$p->x(2)/2)`.

Remember, `$p` is our [`Part`](/class/part) object, so we are calling [`Part::shift`](/class/part#shift).

What're doing is taking point `1`, and shifting it to the right (that's where 0 degrees points to)
over a distance of the X-value of point `2`. Yes, [`Part::x`](/class/part#x) returns the X-value of
a given point.

The result is that we end up with point `3` on the same Y-value as point `1`, but halfway between `1` and `2` 
on the X-axis.

Something similar is happening on line four:

```php?start_inline=1
$p->addPoint(
    4, 
    $p->shift(2,-90,$p->y(1)/2), 
    'Bottom control point for neckRight'
);
```

This time, point `4` is the result of shifting point 2 (the right of our opening) upwards
(-90 degrees means upwards because we start at 3 o'clock and count counter-clockwise)
with half of the Y-value of point 2. 

Point `4` will have the same X-value as point `2`, but half of it's Y-value.

#### Say hi to Bezier curves

These two last points were, as you could see in their description, so-called _control points_.

Control points are used, along with a start and an endpoint to draw 
[Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).
Bezier curves are surprisingly intuitive. You can play around with the example
below by dragging it's start, end, and control points around to change the shape of the curve.

{% include bezier-demo.html %}

In our case, our Bezier curve is made up of startpoint `1`, with its controlpoint `3`,
and endpoint `2` with its control point `4`.

If we draw a Bezier curve with these four points, it looks like this:

{% include figure.html 
    description="It's one quarter of our neck opening"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=quarterNeck"
%}

#### Calculating curve length with Part::curveLen

Now, we want that opening to be 80% of the head circumference. So we're going to draw it, then measure it,
and tweak it until we're happen.

Since our neck opening is symmetric both vertical and horizontal, we only need to draw a quarter of it.
We can just measure how long this curve is, multiply it by four, and we have our neck opening.

Calculating the length of our neck opening, in done in
a little helper method we created called `neckOpeningDelta`:

```php?start_inline=1
protected function neckOpeningDelta($model, $part)
{
    $length = $part->curveLen(1,3,4,2) * 4;
    $target = $model->m('headCircumference') * $this->v('headNeckRatio');
    return $length - $target;
}
```

This actually does more than calculating the length of the neck opening.
It does that, but then checks how much our neck opening should be, and returns the difference.

To calculate the neck opening, it uses `$part->curveLen(1,3,4,2) * 4`, which is a call to
[`Part::curveLen`](/class/part#curvelen), a method that calculated the length of a curve.

We give it the names of the four points defining our Bezier curve, and it gives us the length
of our quarter neck opening. Multiply by four, and we know the total neck opening.

#### Tweaking our neck opening 

We know how to draw a curve, and how to calculate its length.
Now, it's just a matter of trial and error until we get it right.

That trial and error looks like this:

```php?start_inline=1
$this->setValue('neckOpeningFactor', 1);
$delta = 1;
do {
    if($delta > 0) {
        $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 0.99);
    } else {
        $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 1.015);
    }

    $p->newPoint(1, 0, $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 'Bottom of the neck opening');
    $p->newPoint(2, $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 0, 'Right side of neck opening');
    $p->addPoint(3, $p->shift(1,0,$p->x(2)/2), 'Right control point for neckBottom');
    $p->addPoint(4, $p->shift(2,-90,$p->y(1)/2), 'Bottom control point for neckRight');

    $delta = $this->neckOpeningDelta($model, $p);
    $this->msg("Neck opening is $delta mm off"); 
} while (abs($delta) > 1);
```

First, we do some housekeeping and initialize both `neckOpeningFactor` and `$delta` to 1.

> <h5 class='notoc'>You can use setValue and getValue to get around scope issues</h5>
>
> `$delta` is a simple variable. Its so-called _scope_ is local, which means
> that it only exists in our `draftBib` method.
>
> Since we need access to `neckOpeningFactor` in our `neckOpeningDelta` method,
> that local scope is not good enough.
> Instead, we use the `setValue` method to store it. That way, as long as we can access
> our pattern object, we can retrieve it with our `getValue` method, or its alias `v`.

Then, we enter our loop. We'll be _do_ing a bunch of things _while_ `abs($delta) > 1`.

Given that 2 lines before, we assigned the result of our `neckOpeningDelta` method to `$delta`,
this means that as long as the delta of our neck opening is more than 1mm (freesewing uses
mm internally), we'll keep trying.

But obviously, doing the same thing over and over again will not change our results. 
So we need to make a slight change. That's where our `neckOpeningFactor` comes in.

The first lines of our _do_ loop say that if the delta is positive (and our neck 
opening is too long), the `neckOpeningFactor` should be 99% of whatever it is now.

And if the delta is negative, and our neck opening is too small, the `neckOpeningFactor`
should be 101.5% of whatever it is now.

Given that we are multiplying the non-zero coordinates of points `1` and `2` with our 
`neckOpeningFactor`, this will ever so slightly alter our neck opening.
And we'll keep on doing that until we get it right, or more precisely, until the 
difference is less than 1 mm.

#### Storing messages in the pattern

There's one line we haven't touched upon, and it's this one:

```php?start_inline=1
$this->msg("Neck opening is $delta mm off"); 
```

This calls the [`Pattern::msg`](/class/patterns/pattern#msg) method which stores a 
message in the pattern.

Those messages will be included at the bottom of your pattern source code. 
Invisible to the casual user, but there if you need them.

In our case, this is what's included in our pattern:

```html
<!--

    Neck opening is 46.967844334874 mm off
    Neck opening is 42.722123760536 mm off
    Neck opening is 38.519337025918 mm off
    Neck opening is 34.358485047637 mm off
    Neck opening is 30.236623336373 mm off
    Neck opening is 26.159332018952 mm off
    Neck opening is 22.121030968488 mm off
    Neck opening is 18.124664674437 mm off
    Neck opening is 14.168246529646 mm off
    Neck opening is 10.253084453643 mm off
    Neck opening is 6.3715705198593 mm off
    Neck opening is 2.5336691021863 mm off
    Neck opening is -1.2675984832438 mm off
    Neck opening is 4.3744012829367 mm off
    Neck opening is 0.55512068753518 mm off
    

  -->
```

As you can see, we started with a neck opening that was way off.
But we stubbornly kept trying over and over again until the difference
between what we wanted and what we have was less than 1 mm.

> <h5 class='notoc'>Yes, that was totally overboard, but you're here to learn, right?</h5>
>
> Obviously, calculating the neck opening on a baby bib this precise is 
> pointless. But this technique is used often to fit sleeves in patterns,
> calculate collar openings, and other things where precision is key.
> 
> And it seems that if you're going to bother trying to learn how to design
> patterns on freesewing, we might as well show you some things you 
> simply can't do on paper.
>
> Sure, it's perhaps a bit complex at first sight. But
> it's kinda cool to have such fine-grained control over your pattern, is it not?

#### Mirroring points

We have a quarter of our neck opening. To get the rest, we'll simply mirror it 
horizontally to get a half opening. And then mirror the entire thing vertically
to get the full opening.

This is handled in these lines:

```php?start_inline=1
// Mirror quarter opening around X axis
$flip = [2,3,4];
foreach($flip as $id) {
    $p->addPoint($p->newId('left'), $p->flipX($id, 0));
}

// Mirror half opening around Y axis
$flip = [1,3,4,'left2','left3'];

foreach($flip as $id) {
    $p->addPoint($p->newId('top'), $p->flipY($id, 0));
}
```

There's four new things to learn here. There's the `array` notation and
the `foreach` construct. Those are not freesewing-specific, but just programming stuff.

An array holds a bunch of elements, and is written as such: `[2,3,4]`.
The `foreach` loops through through your `array` and does something **for each** of the elements.

But our focus is on two new methods: [`Part::newId`](/class/part#newid) and [`Part::flipX`](/class/part#flipx).

[`Part::flipX`](/class/part#flipx) mirrors a point around a given X-value. We're also using 
[`Part::flipY`](/class/part#flipy) in our code, which mirrors a point around a given Y-value.

#### Let Part::newId name your babies

When adding points to our part, we need to give them a name. That's simple when we're adding them
one at a time, but when we're adding them in a loop like here, we'd have to add some extra logic
to make sure each point gets its own name.

Rather than doing that, we'll simply let the [`Part::newId`](/class/part#newid) method name them for us.

It takes one parameter: a prefix that will be applied to the newly named points.

In our example, we're calling it three times with prefix `left` which will lead to the
points `left1`, `left2`, and `left3` being created.

In the second part, we're calling it 4 times with prefix `top`, creating points `top1` to `top4`.

#### Drawing the neck openining

We now have all the points needed to describe our neck opening. And we draw it with this line:

```php?start_inline=1
$p->newPath('neckOpening', 'M 1 C 3 4 2 C top3 top2 top1 C top4 top5 left1 C left3 left2 1 z');
```

The [`Part::newPath`](/class/part#newpath) method creates a new path. We give it a name (`neckOpening`)
and then what we call  a `pathstring`.

Pathstrings are a feature of the SVG format that we generate patterns in. You can read about
them in detail on [the path page](/fixme), but here's what this patthstring means:

- <b>M</b>ove to point `1`
- From there (point `1`), draw a Bezier <b>C</b>urve using points `3`, `4`, and `2`
- From there (point `2`), draw a Bezier <b>C</b>urve using points `top3`, `top2`, and `top1`
- From there (point `top1`), draw a Bezier <b>C</b>urve using points `top4`, `top5`, and `left1`
- From there (point `left1`), draw a Bezier <b>C</b>urve using points `left3`, `left2`, and `1`
- From there (point `1`) close our path

Pathstrings will become second nature to you in no time. The result is this:

{% include figure.html 
    description="The neckopening is exactly the size we want it to be"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=neckOpening"
%}

### Designing the bib shape

With our neck opening good to go, it's time we drew a bib around it.

Add the code below to our `draftBib` method:


<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#shape-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#shape-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="shape-code" markdown="1">

```php?start_inline=1
// 25mm strap around the neck opening, which will also define the width of our bib
$strap = 25;

// Basic box
$p->newPoint('topLeft', $p->x('left1')-$strap, $p->y('top1')-$strap);
$p->addPoint('topRight', $p->flipX('topLeft', 0));
$p->newPoint('bottomLeft', $p->x('topLeft'), $p->y(1)+$model->m('chestCircumference')/3 + $this->o('lengthBonus'));
$p->addPoint('bottomRight', $p->flipX('bottomLeft', 0));

// Draw the bounding box as a helpline
$p->newPath('box', 'M bottomLeft L topLeft L topRight L bottomRight z', ['class' => 'helpline']);
```
</div>
<div role="tabpanel" class="tab-pane" id="shape-result" markdown="1">

{% include figure.html 
    description="Our basic bib outline"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=shape"
%}

</div>
</div>

First, we've made the decision that the bit that goes around the neck will be 25mm wide (1 inch). We've stored 
that in `$strap`.

Then, we've added four more points. And rather than give them a number as name and a description, 
we gave them a descriptive name.

Point `topLeft` is `$strap` to the left of point `left1` and `$strap` above point `top1`.
We flip it around with [`Part::flipX`](/class/part#flipx) to get `topRight`.

The line that creates point `bottomLeft` looks like this:

```php?start_inline=1
$p->newPoint(
    'bottomLeft', 
    $p->x('topLeft'), 
    $p->y(1)+$model->m('chestCircumference')/3 + $this->o('lengthBonus')
);
```

It re-uses the X-coordinate of `topLeft`. For its Y-coordinate, it takes the one
of point `1` (bottom of the neck opening) and adds 1/3th of the chest circumference
measurements, plus the value of the `lengthBonus` option.

With those four points defines, we can draw a box, and we did that in this line:

```php?start_inline=1
$p->newPath(
    'box', 
    'M bottomLeft L topLeft L topRight L bottomRight z', 
    ['class' => 'helpline']
);
```

We've drawn lines before, but this time there's two differences:

- The pathstring looks different because we're using **L** commands to indicate we want a straight line
- We've added an extra parameter to [`Part::newPath`](/class/part#newpath). It's
and array of attributes to pass on to the [`Path`](/class/path) object.

In doing this, we've set the `class` attribute of the path to `helpline`. 
As a result, our line will be styled differently.

#### Rounding corners

To round the corners at the bottom of our bib, we'll draw another Bezier curve.
We'll use a 50mm radius, just because.

Add the following code to the `draftBib` method:


<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#beziercircle-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#beziercircle-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="beziercircle-code" markdown="1">

```php?start_inline=1
// Make radius 50mm
$radius = 50;

// Bottom right corner
$p->addPoint('bottomRightCornerStart', $p->shift('bottomRight',180,$radius));
$p->addPoint('bottomRightCornerStartCp', $p->shift('bottomRightCornerStart',0, BezierToolbox::bezierCircle($radius)));
$p->addPoint('bottomRightCornerEnd', $p->rotate('bottomRightCornerStart','bottomRight',-90));
$p->addPoint('bottomRightCornerEndCp', $p->rotate('bottomRightCornerStartCp','bottomRight',-90));

// Bottom left corner
$p->addPoint('bottomLeftCornerStart', $p->flipX('bottomRightCornerStart',0));
$p->addPoint('bottomLeftCornerStartCp', $p->flipX('bottomRightCornerStartCp',0));
$p->addPoint('bottomLeftCornerEnd', $p->flipX('bottomRightCornerEnd',0));
$p->addPoint('bottomLeftCornerEndCp', $p->flipX('bottomRightCornerEndCp',0));

$p->newPath('outline', 'M bottomLeftCornerEnd C bottomLeftCornerEndCp bottomLeftCornerStartCp bottomLeftCornerStart L bottomRightCornerStart C bottomRightCornerStartCp bottomRightCornerEndCp bottomRightCornerEnd');
```
</div>
<div role="tabpanel" class="tab-pane" id="beziercircle-result" markdown="1">

{% include figure.html 
    description="The bottom of our bib now has rounded corners"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=beziercircle"
%}

</div>
</div>

This bit of code has three new things for us. The thing that jumps out is that
`BezierToolbox::bezierCircle($radius)` bit.

This is a call to the [`BezierToolbox::bezierCircle`](/class/beziertoolbox#beziercircle)
method. However, we don't have a [`BezierToolbox`](/class/beziertoolbox) object, to call the method on
so we have to call the method with this `::` syntax.

> Static methods can be called without an instatiated object
>
> Class methods that are **static** can be used without an object to 
> call them on. [`BezierToolbox::bezierCircle`](/class/beziertoolbox#beziercircle)
> is an example. And there are more examples in the [`BezierToolbox`](/class/beziertoolbox)
> and [`Utils`](/class/utils) classes.
>
> These utility classes bundle static methods and are available to you thanks to
> those two `use` lines at the top of your class file.

Apart from that, all you need to know is that you can't draw a perfect
(quarter) circle with Bezier curves. But you can get really close is you
offset the control points at just the right distance.

[`BezierToolbox::bezierCircle`](/class/beziertoolbox#beziercircle) gives you
that distance for a radius you feed it.

#### Rotating points

The other thing that is new is the call to [`Part::rotate`](/class/part#rotate).
It's one the many helper functions in the [`Part`](/class/part) class that
you can use to create points.

In this case, you guessed it, the method rotates one point around another
over a given number of defrees.

#### Keeping pathstrings readable

Next up, we're going to shape the top. Below is the code to give round the 
top right of our bib along the neck opening.

<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#pathstring-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#pathstring-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="pathstring-code" markdown="1">

```php?start_inline=1
        
// Top right corner
$p->newPoint('topRightCornerStart', $p->x('topRight'), 0);
$p->newPoint('topRightCornerStartCp', $p->x('topRight'), $p->y('topRight')/2);
$p->newPoint('topRightCornerEnd', 0, $p->y('topRight'));
$p->newPoint('topRightCornerEndCp', $p->x('topRight')/2, $p->y('topRight'));

$p->newPath(
    'outline', 
    '
        M bottomLeftCornerEnd C bottomLeftCornerEndCp bottomLeftCornerStartCp bottomLeftCornerStart 
        L bottomRightCornerStart 
        C bottomRightCornerStartCp bottomRightCornerEndCp bottomRightCornerEnd
        L topRightCornerStart
        C topRightCornerStartCp topRightCornerEndCp topRightCornerEnd
    '
);
```
</div>
<div role="tabpanel" class="tab-pane" id="pathstring-result" markdown="1">

{% include figure.html 
    description="Our strap is starting to take shape"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=strapbend"
%}

</div>
</div>

There's nothing new in htis code, but note that we have rewritten the line to add our `outline`
path.

In giving our points descriptive names, we've made it easier to understand what's going 
on, but on the flip side, it's making our pathstring really long.

Don't despair, you can split a pathstring on multiple lines. It doesn't matter how many spaces
or linebreaks you throw in, we'll piece it back together for you.

#### Shaping the strap

We'll be closing our bib at the back with a snap button.
The following code will finish the shape of our strap.

<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#strapbend-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#strapbend-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="strapbend-code" markdown="1">

```php?start_inline=1
// Snap anchor point
$p->newPoint('snapAnchor', 0, $p->y('top1')-12.5);

// Finish strap
$p->addPoint('snapCpTop', $p->rotate('snapAnchor','topRightCornerEnd',-90));
$p->addPoint('snapCpBottom', $p->rotate('snapAnchor','top1',90));

$p->newPath(
    'outline', 
    '
        M bottomLeftCornerEnd C bottomLeftCornerEndCp bottomLeftCornerStartCp bottomLeftCornerStart 
        L bottomRightCornerStart 
        C bottomRightCornerStartCp bottomRightCornerEndCp bottomRightCornerEnd
        L topRightCornerStart
        C topRightCornerStartCp topRightCornerEndCp topRightCornerEnd
        C snapCpTop snapCpBottom top1
    ');

```
</div>
<div role="tabpanel" class="tab-pane" id="strapbend-result" markdown="1">

{% include figure.html 
    description="The bottom of our bib now has rounded corners"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=strapshape"
%}

</div>
</div>

There's nothing new here, but take note that we added a point called 
`snapAnchor`. This marks the location where we'll add our snap button later.

### Avoiding overlap

While we only drew one side of our strap, it's obvious that if we just
mirror it to the other side, we'll have two ends that overlap and
can be closed with a snap button.

That's perfect for our bib, but not for our pattern where we can't 
have any overlap. To avoid the overlap, we'll simply rotate our entire strap
to the point where it no longer overlaps. This is what we're aiming for:

<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#straprotate-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#straprotate-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="straprotate-code" markdown="1">

```php?start_inline=1
// Rotate strap out of the way to avoid overlap
// Points to rotate
$rotateThese = [
    'top2',
    'top1',
    'snapCpBottom',
    'snapAnchor',
    'snapCpTop',
    'topRightCornerEnd',
    'topRightCornerEndCp'
];

// Rotate until our curve is 2.5mm out of center
do {
    foreach($rotateThese as $id) {
        $p->addPoint($id,$p->rotate($id,2,-1));
    }
    $p->addPoint('edge',$p->curveEdge('topRightCornerEnd', 'snapCpTop', 'snapCpBottom', 'top1', 'left')); 
} while ($p->x('edge') < 2.5);
```
</div>
<div role="tabpanel" class="tab-pane" id="straprotate-result" markdown="1">

{% include figure.html 
    description="Rotating the strap so it doesn't overlap with the other side"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=straprotate"
%}

</div>
</div>

#### Finding the edge of a curve

We've used [`Part::rotate`](/class/part#rotate) before to rotate points. And 
we've also used a `do...while` construct and a `foreach` to itterate over an array of points.

The only thing new is the use of the [`Part::curveEdge`](/class/part#curveedge) method which returns
the point on the edge of a curve (in our case, the left edge).

Basically, we are rotating the points the make up the strap 1 degree at the time, and keep an eye
on the left edge of our curve. Once it sits 2.5mm from the center of our bib, we're happy.

This will create a 5mm space between bib strap ends, which is exactly what we want.

#### Mirorring the strap

With the overlap gone, we can simply mirror the points that define our strap to the 
left side:

```php?start_inline=1
// Mirror points we need for the left strap
$p->addPoint('topLeftCornerStart', $p->flipX('topRightCornerStart',0));
$p->addPoint('topLeftCornerStartCp', $p->flipX('topRightCornerStartCp',0));
$p->addPoint('topLeftCornerEndCp', $p->flipX('topRightCornerEndCp',0));
$p->addPoint('topLeftCornerEnd', $p->flipX('topRightCornerEnd',0));
$p->addPoint('snap2Anchor', $p->flipX('snapAnchor',0));
$p->addPoint('snap2CpTop', $p->flipX('snapCpTop',0));
$p->addPoint('snap2CpBottom', $p->flipX('snapCpBottom',0));
$p->addPoint('top4', $p->flipX('top2',0));
$p->addPoint('top12', $p->flipX('top1',0));
```

### Draw the final outline

All we have to do now is update our pathstring to draw the final outline of our bib.

<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#outline-code" role="tab" data-toggle="tab">Code</a></li>
<li class="nav-item"><a class="nav-link" href="#outline-result" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="outline-code" markdown="1">
```php?start_inline=1
$p->newPath(
    'outline', 
    '
        M bottomLeftCornerEnd C bottomLeftCornerEndCp bottomLeftCornerStartCp bottomLeftCornerStart 
        L bottomRightCornerStart 
        C bottomRightCornerStartCp bottomRightCornerEndCp bottomRightCornerEnd
        L topRightCornerStart
        C topRightCornerStartCp topRightCornerEndCp topRightCornerEnd
        C snapCpTop snapCpBottom top1
        C top2 top3 2
        C 4 3 1
    C left2 left3 left1
        C top5 top4 top12
        C snap2CpBottom snap2CpTop topLeftCornerEnd 
        C topLeftCornerEndCp topLeftCornerStartCp topLeftCornerStart 
        z
    '
);

// Draw the neck opening
//$p->newPath('neckOpening', 'M 1 C 3 4 2 C top3 top2 top1 C top4 top5 left1 C left3 left2 1 z');

// Draw the bounding box as a helpline
$p->newPath('box', 'M bottomLeft L topLeft L topRight L bottomRight z', ['class' => 'helpline']);
// But don't render it
$p->paths['box']->setRender(false);

```
</div>
<div role="tabpanel" class="tab-pane" id="outline-result" markdown="1">

{% include figure.html 
    description="The basic outline of our bib is ready"
    url="https://api.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=outline"
%}

</div>
</div>



We also want to avoid our neckopening and box being drawn.

The fastest and most efficient way to do that is to just comment them out,
like with did for the neck opening.

But, you can also leave keep them from showing up by using the [`path::setRender`](/class/path#setrender) 
method. Setting it to `false` will keep the path from being rendered.

To call this on the [`Path`](/class/path) object, you need to know they are stored in the `paths` attribute of the
[`Part`](/class/part) object, which is an array where the key is the name of your path.

So `$p->paths['box']` is our `box` path, and we can call `setRender` like this: `$p->paths['box']->setRender(false)`.

## Next steps

I hope you've learned a lot in this first part of our turorial. If nothing else, you got a baby bib pattern out of it.

All our code so far is included below. It will generate a draft that you can print 
and make into a baby bib. 

But it's just an outline of our bib for now. In part two of this tutorial, we'll show you how to turn this 
into a professional looking pattern, and we'll use the sample service to make sure our pattern
fits babies big and small.
        
[Continue to part 2](part-2){:.btn.btn-primary }

## Full code so far

<ul class="nav nav-tabs" role="tablist">
<li class="nav-item"><a class="nav-link active" href="#full-config" role="tab" data-toggle="tab">config.yml</a></li>
<li class="nav-item"><a class="nav-link" href="#full-code" role="tab" data-toggle="tab">BabyBib.php</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="full-config" markdown="1">
```yml
info:
    name: "My baby bib pattern"

parts:
    bib: "Baby bib"

measurements:
    chestCircumference: 489
    headCircumference: 472

options:
    lengthBonus:
        type: "measure"
        min: -50
        max: 150
        default: 0
```
</div>
<div role="tabpanel" class="tab-pane" id="full-code" markdown="1">

```php
<?php
/** Freesewing\Patterns\BabyBib class */
namespace Freesewing\Patterns;

/**
 *  Making a baby bib pattern
 */
class BabyBib extends Pattern
{
    /*
        ___       _ _   _       _ _
       |_ _|_ __ (_) |_(_) __ _| (_)___  ___
        | || '_ \| | __| |/ _` | | / __|/ _ \
        | || | | | | |_| | (_| | | \__ \  __/
       |___|_| |_|_|\__|_|\__,_|_|_|___/\___|

      Things we need to do before we can draft a pattern
    */

    /**
     * Sets up options and values for our draft
     *
     * @param \Freesewing\Model $model The model to sample for
     * @return void
     */
    public function initialize($model)
    {
        // Set headNeckRatio value for use later
        $this->setValue('headNeckRatio', 0.8);
    }

    /*
        ____             __ _
       |  _ \ _ __ __ _ / _| |_
       | | | | '__/ _` | |_| __|
       | |_| | | | (_| |  _| |_
       |____/|_|  \__,_|_|  \__|

      The actual sampling/drafting of the pattern
    */

    /**
     * Generates a sample of the pattern
     *
     * @param \Freesewing\Model $model The model to sample for
     *
     * @return void
     */
    public function sample($model)
    {
        // Setup all options and values we need
        $this->initialize($model);

        // Draft our bib 
        $this->draftBib($model);
    }

    /**
     * Generates a draft of the pattern
     *
     * Here, you create the full draft of this pattern for a given model
     * and set of options. You get a complete pattern with
     * all bels and whistles.
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function draft($model)
    {
        // Continue from sample
        $this->sample($model);

        // Finalize our example part
        $this->finalizeExamplePart($model);

        // Is this a paperless pattern?
        if ($this->isPaperless) {
            // Add paperless info to our example part
            $this->paperlessExamplePart($model);
        }
    }

    /**
     * Drafts our bib
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function draftBib($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['bib'];
        
        // Let's start with a precise neck opening
        $this->setValue('neckOpeningFactor', 1);
        $delta = 1;
        do {
            if($delta > 0) {
                $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 0.99);
            } else {
                $this->setValue('neckOpeningFactor', $this->v('neckOpeningFactor') * 1.015);
            }
            $p->newPoint(1, 0, $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 'Bottom of the neck opening');
            $p->newPoint(2, $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 0, 'Right side of neck opening');
            $p->addPoint(3, $p->shift(1,0,$p->x(2)/2), 'Right control point for neckBottom');
            $p->addPoint(4, $p->shift(2,-90,$p->y(1)/2), 'Bottom control point for neckRight');
            
            $delta = $this->neckOpeningDelta($model, $p);
            $this->msg("Neck opening is $delta mm off"); 
        } while (abs($delta) > 1);
        
        // Mirror quarter opening around X axis
        $flip = [2,3,4];
        foreach($flip as $id) {
            $p->addPoint($p->newId('left'), $p->flipX($id, 0));
        }

        // Mirror half opening around Y axis
        $flip = [1,3,4,'left2','left3'];

        foreach($flip as $id) {
            $p->addPoint($p->newId('top'), $p->flipY($id, 0));
        }
        
        // 25mm strap around the neck opening, which will also define the width of our bib
        $strap = 25;

        // Basic box
        $p->newPoint('topLeft', $p->x('left1')-$strap, $p->y('top1')-$strap);
        $p->addPoint('topRight', $p->flipX('topLeft', 0));
        $p->newPoint('bottomLeft', $p->x('topLeft'), $p->y(1)+$model->m('chestCircumference')/3 + $this->o('lengthBonus'));
        $p->addPoint('bottomRight', $p->flipX('bottomLeft', 0));
        
        // Make radius 50mm
        $radius = 50;

        // Bottom right corner
        $p->addPoint('bottomRightCornerStart', $p->shift('bottomRight',180,$radius));
        $p->addPoint('bottomRightCornerStartCp', $p->shift('bottomRightCornerStart',0, \Freesewing\BezierToolbox::bezierCircle($radius)));
        $p->addPoint('bottomRightCornerEnd', $p->rotate('bottomRightCornerStart','bottomRight',-90));
        $p->addPoint('bottomRightCornerEndCp', $p->rotate('bottomRightCornerStartCp','bottomRight',-90));
        
        // Bottom left corner
        $p->addPoint('bottomLeftCornerStart', $p->flipX('bottomRightCornerStart',0));
        $p->addPoint('bottomLeftCornerStartCp', $p->flipX('bottomRightCornerStartCp',0));
        $p->addPoint('bottomLeftCornerEnd', $p->flipX('bottomRightCornerEnd',0));
        $p->addPoint('bottomLeftCornerEndCp', $p->flipX('bottomRightCornerEndCp',0));
        
        // Top right corner
        $p->newPoint('topRightCornerStart', $p->x('topRight'), 0);
        $p->newPoint('topRightCornerStartCp', $p->x('topRight'), $p->y('topRight')/2);
        $p->newPoint('topRightCornerEnd', 0, $p->y('topRight'));
        $p->newPoint('topRightCornerEndCp', $p->x('topRight')/2, $p->y('topRight'));

        // Snap anchor point
        $p->newPoint('snapAnchor', 0, $p->y('top1')-12.5);

        // Finish strap
        $p->addPoint('snapCpTop', $p->rotate('snapAnchor','topRightCornerEnd',-90));
        $p->addPoint('snapCpBottom', $p->rotate('snapAnchor','top1',90));

        // Rotate strap out of the way to avoid overlap
        // Points to rotate
        $rotateThese = [
            'top2',
            'top1',
            'snapCpBottom',
            'snapAnchor',
            'snapCpTop',
            'topRightCornerEnd',
            'topRightCornerEndCp'
        ];

        // Rotate until our curve is 2.5mm out of center
        do {
            foreach($rotateThese as $id) {
                $p->addPoint($id,$p->rotate($id,2,-1));
            }
        $p->addPoint('edge',$p->curveEdge('topRightCornerEnd', 'snapCpTop', 'snapCpBottom', 'top1', 'left')); 

        } while ($p->x('edge') < 2.5);

        // Mirror points we need for the left strap
        $p->addPoint('topLeftCornerStart', $p->flipX('topRightCornerStart',0));
        $p->addPoint('topLeftCornerStartCp', $p->flipX('topRightCornerStartCp',0));
        $p->addPoint('topLeftCornerEndCp', $p->flipX('topRightCornerEndCp',0));
        $p->addPoint('topLeftCornerEnd', $p->flipX('topRightCornerEnd',0));
        $p->addPoint('snap2Anchor', $p->flipX('snapAnchor',0));
        $p->addPoint('snap2CpTop', $p->flipX('snapCpTop',0));
        $p->addPoint('snap2CpBottom', $p->flipX('snapCpBottom',0));
        $p->addPoint('top4', $p->flipX('top2',0));
        $p->addPoint('top12', $p->flipX('top1',0));

        $p->newPath(
            'outline', 
            '
                M bottomLeftCornerEnd C bottomLeftCornerEndCp bottomLeftCornerStartCp bottomLeftCornerStart 
                L bottomRightCornerStart 
                C bottomRightCornerStartCp bottomRightCornerEndCp bottomRightCornerEnd
                L topRightCornerStart
                C topRightCornerStartCp topRightCornerEndCp topRightCornerEnd
                C snapCpTop snapCpBottom top1
                C top2 top3 2
                C 4 3 1
                C left2 left3 left1
                C top5 top4 top12
                C snap2CpBottom snap2CpTop topLeftCornerEnd 
                C topLeftCornerEndCp topLeftCornerStartCp topLeftCornerStart 
                z
            ');

        
        // Draw the neck opening
        //$p->newPath('neckOpening', 'M 1 C 3 4 2 C top3 top2 top1 C top4 top5 left1 C left3 left2 1 z');
        
        // Draw the bounding box as a helpline
        $p->newPath('box', 'M bottomLeft L topLeft L topRight L bottomRight z', ['class' => 'helpline']);
        $p->paths['box']->setRender(false);
    }

    protected function neckOpeningDelta($model,$part)
    {
        $length = $part->curveLen(1,3,4,2) * 4;
        $target = $model->m('headCircumference') * $this->v('headNeckRatio');
        return $length - $target;
    }

    /*
       _____ _             _ _
      |  ___(_)_ __   __ _| (_)_______
      | |_  | | '_ \ / _` | | |_  / _ \
      |  _| | | | | | (_| | | |/ /  __/
      |_|   |_|_| |_|\__,_|_|_/___\___|

      Adding titles/logos/seam-allowance/grainline and so on
    */

    /**
     * Finalizes the example part
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function finalizeExamplePart($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['examplePart'];
    }

    /*
        ____                       _
       |  _ \ __ _ _ __   ___ _ __| | ___  ___ ___
       | |_) / _` | '_ \ / _ \ '__| |/ _ \/ __/ __|
       |  __/ (_| | |_) |  __/ |  | |  __/\__ \__ \
       |_|   \__,_| .__/ \___|_|  |_|\___||___/___/
                  |_|

      Instructions for paperless patterns
    */

    /**
     * Adds paperless info for the example part
     *
     * @param \Freesewing\Model $model The model to draft for
     *
     * @return void
     */
    public function paperlessExamplePart($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['examplePart'];
    }
}
```
</div>
</div>


[Part]: /class/part "Part class documentation"

* TOC - Do not remove this line
{:toc}



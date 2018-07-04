---
layout: page
title: Design tutorial part 1 - Your first pattern
tags: [fundamentals, designer docs, tutorial]
permalink: /docs/designer/tutorial/part-1
crumbs:
  - /docs|Docs
  - /docs/designer|Designer docs
---
In part one of our tutorial for designers, we'll get you up and running 
with your own pattern based on our pattern template.

## Before we start

### Prerequisites 

Before you start this tutorial, made sure to read the 
[about freesewing](/about) and 
[freesewing core fundamentals](/docs/core/fundamentals) pages.

You'll also need the software. Please read 
[our dedicated install page for this tutorial](./install).

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
If you have that, great. If not, please check the [install instructions](/docs/tutorial)
and come back here when you've got it up and running.

Or you can just read along with this guide, that's fine too.

### Where to get help

If you're stuck, it's good to know [help is available](/help).

Now let's get to it, shall we?

## Creating the pattern

### Create your own pattern namespace
The `patterns` directory holds all the patterns. They are grouped together in so-called
_namespaces_ that are essentially just a folder.

Within each of those namespaces, every pattern is self-contained 
in its own folder.

> <h5 class="notoc">Namespaces keep things organised</h5>
> Namespaces are just a way to keep things organized. Think of them as families of patterns.

You can name your namespace whatever you want, but let's assume we're a pattern business called 
**Acme Pattern Co** and we'll name our namespace `Acme`.

Add a `Acme` folder to the patterns directory like this:

- patterns
  - **Acme**
  - Core
  - Docs
  - Templates
  - Tests

From now on, all your patterns can go into Acme. 

### Enable the pattern namespace
You can add as many pattern namespaces as you want, until you tell freesewing
that you want to use them, they don't count.

> <h5 class='notoc'>Freesewing uses YAML for configuration files</h5> 
>
> All freesewing configuration files have a `.yml` extention. They are 
> [YAML](https://en.wikipedia.org/wiki/YAML) files. 
>
> Yaml is a format that's easy
> to write and read for both humans and computers.

Open the main configuration file 
&mdash; `config.yml` in the project's root directory &mdash;
, and add `Acme` to the `patternNamespaces`:

```yaml
patternNamespaces:
    - Core
    - Docs
    - Templates
    - Tests
    - Acme
```

> <h5 class='notoc'>Pattern configuration</h5>
>
> The [configuration files](/docs/core/config#pattern-configuration-file) page has all the details on the
> different configuration files used in freesewing.

### Copy the pattern template
One of the namespace folders is called `Templates`. Within it, you'll find the 
`PatternTemplate` folder. This is
&mdash; you guessed it &mdash;
the pattern template that we will use as a starting point.

Copy the entire `PatternTemplate` directory into the `Acme` folder we created.
Then, rename the folder to `BabyBib`.

> <h5 class='notoc'>Freesewing naming conventions</h5>
>
> How we name things is important. 
>
> For now, just make sure to write `BabyBib` 
> with two capital `B` letters, as shown.

### Rename the class file

In your `BabyBib` folder, you'll have these files:

- patterns
  - Acme
    - **BabyBib**
      - sample
      - PatternTemplate.php
      - config.yml
  - Core
  - Docs
  - Templates
  - Tests

We'll ignore the `sample` folder for now, and focus on the two other files.

The `PatternTemplate.php` file is the class file. This will hold the code for
our pattern. It still carries the name from the template we copied it from,
so go ahead and rename it to `BabyBib.php`.

### Update the configuration file

The other file is `config.yml`, this is your pattern configuration file.

Open the `config.yml` file. Since it's our template file it comes with a lot
of comments about the meaning of the different values in the file.
For now it looks like this:

```yaml
# This is the pattern configuration file
# It should always be names config.yml and reside in the
# directory holding your pattern

# Setting the hidden option below to true will hide this pattern
# from the info service (and thus from the front end)
# To reveal a pattern, you can simply remove it as it defaults to false
# hidden: false

# In this case, we want to hide this pattern
hidden: true

# The info block of options is mandatory, it contains info about your pattern
info:
    # This name will be shown in the front-end
    name: "Pattern Template"
    # This description will be shown in the front-end
    description: "This is an example pattern that you can copy as a starting point for your own patterns"
    # This handle is required for the front-end, it's used in the URLs and file paths
    handle: "example"
    # Tags are used by the frontend to allow users to filter the pattern list
    tags:
        - menswear
        - example
    # inMemoryOf is optional. It takes a name and link
    inMemoryOf:
        name: "Aaron Swartz"
        link: "https://en.wikipedia.org/wiki/Aaron_Swartz"

# seamAllowance is optional. If it is missing, it will default to:
# metric: 1
# imperial: 0.625
# If you do set it, you MUST include both the metric and imperial
# default for the seam allowance.
# Metric values are in cm
# Imperial values are in inch
seamAllowance:
    metric: 0.6
    imperial: 0.25 

# A list of languages the pattern is translated into
languages:
    en: "English"

# A list of parts available in the pattern    
# Parts whose title starts with a leading dot will be hidden from the 
# info service and front end
parts:
    examplePart: "Example Part"
    otherPart: ".Not visible in the frontend"

# The list of required measurements
measurements:
    exampleMeasurement: 520

# Options hold all the options in a pattern. This info is used
# to construct the form to draft the pattern in the frontend
options:
# Options are grouped together by specifying a group
# A group name cannot contain any spaces
# example group
    # a measureOption is an option that takes a measure as value.
    # In other words, something you can express in mm.
    # The title of the option (measureOption in this case) 
    # is what to use in your pattern 
    measureOption:
        # the group the option belongs to
        group: "example"
        # the title is shown by the front-end
        title: "Measure option example"
        # The description is shown by the front-end
        description: "An example of an option that takes a measure as input"
        # The type of the option.
        type: "measure"
        # the mimimum value
        min: 80
        # The maximum value
        max: 200
        # The default
        default: 160
    percentOption:
        title: "Percent option example"
        description: "An example of an option that takes a percentage as input"
        group: "example"
        # Much like a measureOption, but takes a percentage as value
        type: "percent"
        min: 50
        max: 65
        default: 60
    angleOption:
        title: "Angle option example"
        description: "An example of an option that takes an angle as input"
        group: "example"
        # Much like a measureOption, but takes an angle as value
        type: "percent"
        min: 50
        max: 65
        default: 60
    chooseOneOption:
        title: "Choose one option example"
        description: "An example where you pick an option from a list"
        group: "example"
        # The chooseOne option presents a list of radio buttons to choose one from
        type: "chooseOne"
        # These are the options in key => value format
        # The key is what is passed to core, the value is the title in the front-end
        # Note that keys do not have to be numeric, but they can't contain spaces
        options:
            1: "Colours"
            2: "Colors"
            three: "Shapes"
        default: 1
    conditionalOption:
        title: "Conditional option example"
        description: "An example of an option of which the display is controlled by another option"
        group: "example"
        type: "chooseOne"
        options:
            1: "Red"
            2: "Green"
            3: "Blue"
        default: 3
        # Any option can be made conditional by letting it 'depend on' a chooseOne option
        dependsOn: 'chooseOnOption'
        # only on means that this option will only be shown if one of these values are chosen
        # in the option this depends on
        onlyOn: [1,2]



```

We don't need much in our config file to get started. Edit it so it looks like this:

```yaml
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

Let's see what we've changed, and what it means:

- We've removed a lot of things that we don't need
- We've set a `name` in the `info` section. A `name` can be anything you
want, and is the only mandatory part of the info section
- We've configured two measurements, `chestCircumference` and `headCircumference` 
and provided default values for them, in mm.
- We've configured a `lengthBonus` options of type `measure`.
It's default is `0`, but it accepts values between `-50` and `150` mm.

> <h5 class='notoc'>mm inside</h5>
>
> Freesewing uses mm internally. For everything.

With our config file updated, time to have a look at the class file.

### Update the class file

Next, open the `BabyBib.php` file and edit just the start of it.  
Change this:

```php
<?php
/** Freesewing\Patterns\Templates\PatternTemplate class */
namespace Freesewing\Patterns\Templates;

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
class PatternTemplate extends \Freesewing\Patterns\Core\Pattern
{
...
```

Into this:

```php
<?php
/** Freesewing\Patterns\Acme\BabyBib class */
namespace Freesewing\Patterns\Acme;

use Freesewing\Utils;
use Freesewing\BezierToolbox;

/**
 * Making a baby bib pattern
 */
class BabyBib extends \Freesewing\Patterns\Core\Pattern
{
...
```

Once again, let's look at what we've changed and what it means:

- We have changed the class name from `PatternTemplate` to `BabyBib`
- We've changed the pattern namespace from `Templates` to `Acme`
- We have replaced the comments with our own comments that simply say `Making a baby bib pattern`

### Rebuild the autoload files

We've added a new namespace and our pattern is a new class in that namespace.  
We need to tell our class autoloader to rebuild its class index so it knows where to find our BabyBib code.

In a command prompt, navigate to the root of the freesewing project, and issue the following command:

```sh
composer dump-autoload -o
```

It should output a message like this:

```sh
Generating optimized autoload files
```

This will tell the autoloader about the new `Freesewing\Patterns\Acme\BabyBib` class, which defines your pattern.

### Load the pattern in your browser

From this moment onward, your pattern will load in your browser, and you should see it by navigating to:

```
 http://localhost:8666/index.php?service=draft&pattern=BabyBib&theme=Designer
```

> ##### Your server name and port number may differ
>
> This assumes you are running a webserver at `localhost` on port `8666`.
>
> If you followed [the install instructions for this tutorial](/docs/tutorial)
> that should be the case for you.
>
> However, if you have setup your webserver in a different way, you'll need to
> update the host and port number accordingly.

> <h5 class='notoc'>Use the Designer theme when designing</h5>
>
> That `theme=Designer` bit in the URL means we'll be using the [`Designer`](../../core/classdocs/themes/core/designer) theme.
> It includes a lot of extra info in the output that will facilitate your design work.
{:.tip}

You will get an empty page, as our pattern doesn't do anything yet. But if you look at the source 
of the page, the start of it should look something like this:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!--

      __                           _           
     / _|_ _ ___ ___ ________ __ _(_)_ _  __ _ 
    |  _| '_/ -_) -_|_-< -_) V  V / | ' \/ _` |
    |_| |_| \___\___/__|___|\_/\_/|_|_||_\__, |
                  freesewing.org         |___/ 
     
    An open source platform 
            for made-to-measure sewing patterns 

  -->

<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:freesewing="http://freesewing.org/namespaces/freesewing" viewBox ="0 0 0 0"
    width ="0mm"
    height ="0mm"
    freesewing:version ="1.8.2"
    freesewing:origin ="localhost:8666" 
>
```

## Initialize your pattern

Time to dive into our class, and we'll start at the top, with the INITIALISE section.

Look for this section:

```php
class PatternTemplate extends \Freesewing\Patterns\Templates\Pattern
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

and change it to this:

```php
class BabyBib extends \Freesewing\Patterns\Core\Pattern
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

```

### Setting values

We mostly removed things, but we did make some changes to the `initialize` method. 
Specifically this line where we've set a value called `headNeckRatio` and assigned it `0.8`:

```php
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

```php
class BabyBib extends \Freesewing\Patterns\Core\Pattern
```

Our `BabyBib` class _extends_ the `\Freesewing\Patterns\Core\Pattern` class. 
`Pattern` in the `Core` pattern namespace is our so-called _parent class_.

As a child of the `Pattern` class, we inherit (like, get for free) a bunch of its functionality.

> <h5 class='notoc'>Class inheritance is crucial in pattern design</h5>
>
> Sure, it's nice that we get the `setValue` method for free. But class inheritance 
> plays an important role in pattern design.
>
> It is very common for one pattern to be based on another (often called a block).
> Because this system of inheritance is built right into the code, we can leverage it
> to easily extend one pattern into another.

Because the `Pattern` class has a `setValue` method, we can just use it as it is part of our class
and behind the scenes, the `setValue` method of the `Pattern` class will be called.

Until we decide that we want to implement our own `setValue` method. What we define ourselves
takes precedence over what our parent class provides.

An overview of all the methods in the `Pattern` class that you can use is available in 
[the core API documenation](/docs/core/api).

### Method parameters
When we called the `Pattern->setValue` method, we gave it two parameters:

```php
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
We'll start with the `Pattern->sample` method. 

> <h5 class='notoc'>The sample method is mandatory</h5>
>
> Every pattern **must** have a `sample` method, because it will be called by the sample service.

Look for this section in yuor BabyBib.php class file:

```php
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

and update it to look like this:

```php
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

The sample method will be called by the `Sample` service
and is expected to draft a basic outline of your pattern.

First we call our own `initialize` method that we created earlier.

Then, we'll call the `draftBib` method that we'll get to in a moment, and pass it our `Model` object.

> It's a good habit to keep your sample method simple, and draft each part in its own method.

### Creating the draftBib method

Before we get to the real pattern drafting, we have to create the `draftBib`, because we just called it 
in our `initialize` method, but it doesn't exist yet.

We are going to replace the `draftExamplePart` method from the template with our own `draftBib` method.

Here is the relevant section from our template:

```php
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

Now update it to look like this:

```php
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

```php
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

![The neckopening is exactly the size we want it to be](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=neckOpening) 

#### Popular methods and their aliases

Some methods are used so often that we've created a shorter to
type alias for them, to save you time. In the example above:

- `$this->v` is an alias for `$this->getValue`
- `$model->m` is an alias for `$model->getMeasurement`

Another important alias method is:

- `$this->o` which is an alias for `$this->getOption`

#### Adding points with Part::newPoint

Let's start with these 4 lines:

```php
$p->newPoint(1, 0, $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 'Bottom of the neck opening');
$p->newPoint(2, $this->v('neckOpeningFactor') * $model->m('headCircumference')/6, 0, 'Right side of neck opening');
$p->addPoint(3, $p->shift(1,0,$p->x(2)/2), 'Right control point for neckBottom');
$p->addPoint(4, $p->shift(2,-90,$p->y(1)/2), 'Bottom control point for neckRight');
```

We're adding two points with `Part::newPoint` two points with `Part::addPoint`.

The difference is that `Part::newPoint` expects and X and Y 
coordinate, while `Part::addPoint` expects a `Point` object.

Both of them can have an additional optional parameter which is a description of the point.
You can see that we used that to clarify things a bit.

The first line can also be written as such:

```php
$p->newPoint(
    1, 
    0, 
    $this->v('neckOpeningFactor') * $model->m('headCircumference')/8, 
    'Bottom of the neck opening'
);
```

We passed 4 parameters to `Point::newPoint`:

- A name for the point, we went with `1` because that's easy
- The X-coordinate, which is `0`
- The Y-coordinate, which is the result of `$this->v('neckOpeningFactor') * $model->m('headCircumference')/8`
- An optional description, we went with `Bottom of the neck opening`


So the Y-coordinate of our point is the `headCircumference` measurement divided by 8, and then
multiplied by a thing called the `neckOpeningFactor`. We'll get to that later.

The second line can be written as such:

```php
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

```php
$p->addPoint(
    3, 
    $p->shift(1,0,$p->x(2)/2), 
    'Right control point for neckBottom'
);
```

We're using `Point::addPoint` here. We still give it a name for the point (`3`)
but instead of giving it an X and Y coordinate, we give it the result of `$p->shift(1,0,$p->x(2)/2)`.

Remember, `$p` is our `Part` object, so we are calling `Part::shift`.

What we're doing is taking point `1`, and shifting it to the right (that's where 0 degrees points to)
over a distance of half the X-value of point `2`. Yes, `Part::x` returns the X-value of
a given point.

The result is that we end up with point `3` on the same Y-value as point `1`, but halfway between `1` and `2` 
on the X-axis.

Something similar is happening on line four:

```php
$p->addPoint(
    4, 
    $p->shift(2,-90,$p->y(1)/2), 
    'Bottom control point for neckRight'
);
```

This time, point `4` is the result of shifting point 2 (the right of our opening) downwards
(-90 degrees means downward because we start at 3 o'clock and count counter-clockwise)
by half of the Y-value of point 1. 

Point `4` will have the same X-value as point `2`, and half of the point `1` Y-value.

#### Say hi to Bezier curves

These two last points were, as you could see in their description, so-called _control points_.

Control points are used, along with a start and an endpoint to draw 
[Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).

In our case, our Bezier curve is made up of startpoint `1`, with its controlpoint `3`,
and endpoint `2` with its control point `4`.

If we draw a Bezier curve with these four points, it looks like this:

![It's one quarter of our neck opening](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=quarterNeck)

#### Calculating curve length with Part::curveLen

Now, we want that opening to be 80% of the head circumference. So we're going to draw it, then measure it,
and tweak it until we're happy.

Since our neck opening is symmetric both vertical and horizontal, we only need to draw a quarter of it.
We can just measure how long this curve is, multiply it by four, and we have our neck opening.

Calculating the length of our neck opening, in done in
a little helper method we created called `neckOpeningDelta`:

```php
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
`Part::curveLen`, a method that calculated the length of a curve.

We give it the names of the four points defining our Bezier curve, and it gives us the length
of our quarter neck opening. Multiply by four, and we know the total neck opening.

#### Tweaking our neck opening 

We know how to draw a curve, and how to calculate its length.
Now, it's just a matter of trial and error until we get it right.

That trial and error looks like this:

```php
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

```php
$this->msg("Neck opening is $delta mm off"); 
```

This calls the `Pattern::msg` method which stores a message in the pattern.

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

```php
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
The `foreach` loops through your `array` and does something **for each** of the elements.

But our focus is on two new methods: `Part::newId` and `Part::flipX`.

`Part::flipX` mirrors a point around a given X-value. We're also using 
`Part::flipY` in our code, which mirrors a point around a given Y-value.

#### Let Part::newId name your babies

When adding points to our part, we need to give them a name. That's simple when we're adding them
one at a time, but when we're adding them in a loop like here, we'd have to add some extra logic
to make sure each point gets its own name.

Rather than doing that, we'll simply let the `Part::newId` method name them for us.

It takes one parameter: a prefix that will be applied to the newly named points.

In our example, we're calling it three times with prefix `left` which will lead to the
points `left1`, `left2`, and `left3` being created.

In the second part, we're calling it 5 times with prefix `top`, creating points `top1` to `top5`.

#### Drawing the neck opening

We now have all the points needed to describe our neck opening. And we draw it with this line:

```php
$p->newPath('neckOpening', 'M 1 C 3 4 2 C top3 top2 top1 C top4 top5 left1 C left3 left2 1 z');
```

The `Part::newPath` method creates a new path. We give it a name (`neckOpening`)
and then what we call  a `pathstring`.

Pathstrings are a feature of the SVG format that we generate patterns in. You can read about
them in detail online, but here's what this patthstring means:

- <b>M</b>ove to point `1`
- From there (point `1`), draw a Bezier <b>C</b>urve using points `3`, `4`, and `2`
- From there (point `2`), draw a Bezier <b>C</b>urve using points `top3`, `top2`, and `top1`
- From there (point `top1`), draw a Bezier <b>C</b>urve using points `top4`, `top5`, and `left1`
- From there (point `left1`), draw a Bezier <b>C</b>urve using points `left3`, `left2`, and `1`
- From there (point `1`) close our path

Pathstrings will become second nature to you in no time. The result is this:

![The neckopening is exactly the size we want it to be](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=neckOpening) 

### Designing the bib shape

With our neck opening good to go, it's time we draw a bib around it.

Add the code below to our `draftBib` method:

```php
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

![Our basic bib outline](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=shape)

First, we've made the decision that the bit that goes around the neck will be 25mm wide (1 inch). We've stored 
that in `$strap`.

Then, we've added four more points. And rather than give them a number as name and a description, 
we gave them a descriptive name.

Point `topLeft` is `$strap` to the left of point `left1` and `$strap` above point `top1`.
We flip it around with `Part::flipX` to get `topRight`.

The line that creates point `bottomLeft` looks like this:

```php
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

```php
$p->newPath(
    'box', 
    'M bottomLeft L topLeft L topRight L bottomRight z', 
    ['class' => 'helpline']
);
```

We've drawn lines before, but this time there's two differences:

- The pathstring looks different because we're using **L** commands to indicate we want a straight line
- We've added an extra parameter to `Part::newPath`. It's
and array of attributes to pass on to the `Path` object.

In doing this, we've set the `class` attribute of the path to `helpline`. 
As a result, our line will be styled differently.

#### Rounding corners

To round the corners at the bottom of our bib, we'll draw another Bezier curve.
We'll use a 50mm radius, just because.

Add the following code to the `draftBib` method:

```php
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
![The bottom of our bib now has rounded corners](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=beziercircle)

This bit of code has three new things for us. The thing that jumps out is that
`BezierToolbox::bezierCircle($radius)` bit.

This is a call to the `BezierToolbox::bezierCircle`
method. However, we don't have a `BezierToolbox` object, to call the method on
so we have to call the method with this `::` syntax.

> Static methods can be called without an instantiated object
>
> Class methods that are **static** can be used without an object to 
> call them on. `BezierToolbox::bezierCircle` is an example. 
> And there are more examples in the `BezierToolbox` and `Utils` classes.
>
> These utility classes bundle static methods and are available to you thanks to
> those two `use` lines at the top of your class file.

Apart from that, all you need to know is that you can't draw a perfect
(quarter) circle with Bezier curves. But you can get really close is you
offset the control points at just the right distance.

`BezierToolbox::bezierCircle` gives you that distance for a radius you feed it.

#### Rotating points

The other thing that is new is the call to `Part::rotate`.
It's one the many helper functions in the `Part` class that
you can use to create points.

In this case, you guessed it, the method rotates one point around another
over a given number of degrees.

#### Keeping pathstrings readable

Next up, we're going to shape the top. Below is the code to give round the 
top right of our bib along the neck opening.

```php
        
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
![Our strap is starting to take shape](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=strapbend)

There's nothing new in this code, but note that we have rewritten the line to add our `outline` path.

In giving our points descriptive names, we've made it easier to understand what's going 
on, but on the flip side, it's making our pathstring really long.

Don't despair, you can split a pathstring on multiple lines. It doesn't matter how many spaces
or linebreaks you throw in, we'll piece it back together for you.

#### Shaping the strap

We'll be closing our bib at the back with a snap button.
The following code will finish the shape of our strap.

```php
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
![The bottom of our bib now has rounded corners](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=strapshape)

There's nothing new here, but take note that we added a point called 
`snapAnchor`. This marks the location where we'll add our snap button later.

### Avoiding overlap

While we only drew one side of our strap, it's obvious that if we just
mirror it to the other side, we'll have two ends that overlap and
can be closed with a snap button.

That's perfect for our bib, but not for our pattern where we can't 
have any overlap. To avoid the overlap, we'll simply rotate our entire strap
to the point where it no longer overlaps. This is what we're aiming for:

```php
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
    
![Rotating the strap so it doesn't overlap with the other side](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=straprotate)

#### Finding the edge of a curve

We've used `Part::rotate` before to rotate points. And 
we've also used a `do...while` construct and a `foreach` to itterate over an array of points.

The only thing new is the use of the `Part::curveEdge` method which returns
the point on the edge of a curve (in our case, the left edge).

Basically, we are rotating the points the make up the strap 1 degree at the time, and keep an eye
on the left edge of our curve. Once it sits 2.5mm from the center of our bib, we're happy.

This will create a 5mm space between bib strap ends, which is exactly what we want.

#### Mirorring the strap

With the overlap gone, we can simply mirror the points that define our strap to the 
left side:

```php
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

```php
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
![The basic outline of our bib is ready](https://core.freesewing.org/?service=draft&pattern=DesignTutorial&theme=Designer&figure=outline)

We also want to avoid our neckopening and box being drawn.

The fastest and most efficient way to do that is to just comment them out,
like with did for the neck opening.

But, you can also leave keep them from showing up by using the `path::setRender` 
method. Setting it to `false` will keep the path from being rendered.

To call this on the `Path` object, you need to know they are stored in the `paths` attribute of the
`Part` object, which is an array where the key is the name of your path.

So `$p->paths['box']` is our `box` path, and we can call `setRender` like this: `$p->paths['box']->setRender(false)`.

## Next steps

I hope you've learned a lot in this first part of our turorial. If nothing else, you got a baby bib pattern out of it.

All our code so far is included below. It will generate a draft that you can print 
and make into a baby bib. 

But it's just an outline of our bib for now. In part two of this tutorial, we'll show you how to turn this 
into a professional looking pattern, and we'll use the sample service to make sure our pattern
fits babies big and small.
        
[Continue to part 2](/docs/tutorial/part-2){.btn .primary .px-4}

## Full code so far

### config.yml

```
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

### BabyBib.php

```php
<?php
/** Freesewing\Patterns\Acme\BabyBib class */
namespace Freesewing\Patterns\Acme;

/**
 *  Making a baby bib pattern
 */
class BabyBib extends \Freesewing\Patterns\Core\Pattern
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

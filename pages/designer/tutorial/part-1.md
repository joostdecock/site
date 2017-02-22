---
layout: page
title: Design tutorial part 1 - Your first pattern
tags: [fundamentals, design, tutorial]
permalink: /designer/tutorial/part-1
---
In part one of our tutorial for designers, we'll get you up and running 
with your own pattern based on our pattern template.

## Before we start

### Prerequisite 

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
> But that's the point. We're not teaching your how to draft pattern.
> We're teaching you the platform. The example is stupid, so you can focus
> all your attention on the way we do things.
>
> Trust me, it'll be fine.

### Don't just read, do
For the best learning experience, you should design the pattern as we go along,
doing all the steps as I explain them here.

For that, you'll need to have your own instance of freesewing setup.
If you have that, great. If not, please check the [/install](install instructions)
and come back here when you've got it up and running.

Or you can just read along with this guide, that's fine too.

### Where to get help

If you're stuck, it's good to know [help is available](/help).

Now let's get to it, shall we?

## Creating the pattern

### Copy the pattern template

The `patterns` directory holds all the patterns. Each pattern is self-contained 
in it's own folder.

One of the folders is called `PatternTemplate`. This is, you guessed it, 
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
> All freesewing configuration files have a `.yml` extention. They are so-called
> [YAML](https://en.wikipedia.org/wiki/YAML) files. Yaml is a format that's easy
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

languages:
    en: "English"

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
- We've added two measurements, `chestCircumference` and `headCircumference` 
and provided default values for them, in mm.
- We've configured a `lengthBonus` options of type `measure`.
It's default is `0`, but it accepts values between `-50` and `150` mm.

> <h5 class='notoc'>Pattern configuration</h5>
>
> The [pattern configuration page](/config/pattern) has all the details on the
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

- We have changede the class name from `PatternTemplate` to `BabyBib`
in the comment block (line 2), 
in the namespace declaration (line 3), and in the class declaration (line 8)
- We have replace the comments with our own comments that simply say `Making a baby bib pattern`

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
$this->setValue('headNeckRatio', self::HEAD_NECKOPENING_RATIO);
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
takes preference over what our parent class provides.

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
$this->setValue('headNeckRatio', self::HEAD_NECKOPENING_RATIO);
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

The sample method will be called by the sample service and is expected to 
draft a basic outline of your pattern.













<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-X" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-X" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-X" markdown="1">

```php?start_inline=1
```
</div>
<div role="tabpanel" class="tab-pane" id="template-X" markdown="1">

```php?start_inline=1
```

</div>
</div>











* TOC - Do not remove this line
{:toc}


---
layout: page
title: Design tutorial part 2 - Beyond basics
tags: [fundamentals, designer documentation, tutorials]
permalink: /docs/designer/tutorial/part-2
crumbs:
  - /docs|Docs
  - /docs/designer|Designer docs
---
In [the first part of this turorial](part-1), we created a basic pattern
outline. We learned how to add points to our pattern in a number of different
ways, and how to draw lines and curves.

In this second part, we'll take the basic outline we've designed in part 1,
and turn it into a complete pattern with all bells and whistles.

## The sample service

Traditionally, patterns are designed in one size only. To get the other sizes, the pattern
is _graded_ up and down to a range of sizes.

This process of grading is sometimes done by the designer itself, or often by a professional grader.

On freesewing, you don't design your pattern in one size. You design it to adapt to the measurement
it receives as input.
That may take some getting used to, but the upshot is that you'll never have to grade a pattern again.

But it does raise the question, how do you know your pattern is well-adapted to a range of
sizes? That's where the sample service comes in.

The sample service is preliminary a tool for designers. It has two modes of operation:

- Measurements sampling: Shows you how your pattern will adapt to a range of measurements
- Options sampling: Show you how your pattern will adapt between the minimum and maximum range of an option

### Marking paths for sampling

If you were to run the sample service on our current BabyBib pattern, it would generate an empty page.
That's because we have to tell it what to sample first.

A complete pattern draft typically has more lines on it than are relevant for the 
[`SampleService`](/class/services/sampleservice).
Things like seam allowance and instructions will only clutter the output when comparing sizes.

Rather than include everything on the page, we want the sample service to only render what is
relevant to us. And the way to do that is to tell the 
sample service exactly what we want to include.

In `BabyBib.php`, still in our `sample` method, add the following line after the
point where we add the `outline` path:

```php?start_inline=1
$p->paths['outline']->setSample(true);
```

This line calls the [`Path::setSample`](/class/path#setsample) method on our `outline`
path, which sets the path's `sample` property.

The sample service will only render paths
that have their `sample` property set to `true`. 

> <h5 class='notoc'>Accessing the path object</h5>
>
> The object of that path is stored in our [`Part`](/class/part) class, in the 
> `paths` property which is an array.
> So we can call a method on it by addressing `$p->paths['outline']`.

So basically, what we've done here is say _Hey [`SampleService`](/class/services/sampleservice),
please include this path when you do what you do_.

### Sampling measurements

With out `outline` path marked for sampling, we'd like to see how our bib adapts 
to different sized babies. But first, we need some models.

#### Adding models for measurement sampling

If we want to sample our pattern in a range of different sizes, we are going
to need different-sized models. In our case, different-sized babies.

Let's look at our pattern directory again:

- {:.folder open} sample
  - models.yml
- {:.code} PatternTemplate.php
- config.yml
{:.files}

We ignored the `sampler` folder up until now, but not any longer.
Open the `models.yml` file in it and update it to look as such:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-models" role="tab" data-toggle="tab">models.yml</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-models" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-models" markdown="1">

```yml
default: 
    group: babies

groups:
    babies:
        - newborn
        - 3months
        - 6months
        - 9months
        - 12months
        - 18months
        - 2years

measurements:

    chestCircumference:
        newborn : 420
        3months : 438
        6months : 451
        9months : 464
        12months: 483
        18months: 508
        2years  : 522

    headCircumference:
        newborn : 343
        3months : 394
        6months : 425
        9months : 457   
        12months: 470
        18months: 476
        2years  : 522
```

</div>
<div role="tabpanel" class="tab-pane" id="template-models" markdown="1">

```yml
default: 
    group: realMen
groups:
    realMen:
        - joost
measurements:
    naturalWaist:
        joost   : 885
        usSize34: 697
        usSize36: 755
        usSize38: 813
        usSize40: 871
        usSize42: 929
        usSize44: 987
```
</div>
</div>

I won't go into the details (check FIXME for all info on `models.yml` files)
but hopefully you'll understand that we've added a bunch of standard baby models
with their measurements.

#### Sampler output

Now that we have a group of models to sample, the sample service can get to work.
For our BabyBib pattern, this is the output you'll get:

<div class='drop-shadow mb-3'>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewbox ="0 0 756.2480322187 1191.5220483827" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" >
<style type="text/css"> <![CDATA[ path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; } path.hidden { fill: none; stroke: none; } ]]> </style>
<g id="patternScaleContainer"  transform=" scale(3.54330709 ) " >
    <g id="bib"  transform=" translate(106.715 99.738)  translate(0 0) " >
<path transform="translate( 0, 0 )" style="stroke: hsl(0, 55%, 50%);" id="2"  d=" M  -75.165,127.624  C  -75.165,155.238  -52.779,177.624  -25.165,177.624  L  25.165,177.624  C  52.779,177.624  75.165,155.238  75.165,127.624  L  75.165,0  C  75.165,-31.312  51.993,-63.849  15.373,-72.303  C  3.194,-75.116  -2.431,-50.758  9.749,-47.945  C  34.189,-42.302  50.165,-18.812  50.165,0  C  50.165,18.812  25.083,37.624  0,37.624  C  -25.083,37.624  -50.165,18.812  -50.165,0  C  -50.165,-18.812  -34.189,-42.302  -9.749,-47.945  C  2.431,-50.758  -3.194,-75.116  -15.373,-72.303  C  -51.993,-63.849  -75.165,-31.312  -75.165,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(44.833333333333, 55%, 50%);" id="3"  d=" M  -82.903,139.428  C  -82.903,167.042  -60.517,189.428  -32.903,189.428  L  32.903,189.428  C  60.517,189.428  82.903,167.042  82.903,139.428  L  82.903,0  C  82.903,-34.214  56.04,-70.354  15.493,-78.972  C  3.266,-81.571  -1.932,-57.115  10.292,-54.517  C  38.611,-48.498  57.903,-21.714  57.903,0  C  57.903,21.714  28.952,43.428  0,43.428  C  -28.952,43.428  -57.903,21.714  -57.903,0  C  -57.903,-21.714  -38.611,-48.498  -10.292,-54.517  C  1.932,-57.115  -3.266,-81.571  -15.493,-78.972  C  -56.04,-70.354  -82.903,-34.214  -82.903,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(89.666666666667, 55%, 50%);" id="4"  d=" M  -87.459,147.177  C  -87.459,174.791  -65.073,197.177  -37.459,197.177  L  37.459,197.177  C  65.073,197.177  87.459,174.791  87.459,147.177  L  87.459,0  C  87.459,-35.922  57.783,-74.097  14.856,-82.441  C  2.586,-84.826  -2.185,-60.284  10.087,-57.901  C  40.742,-51.942  62.459,-23.422  62.459,0  C  62.459,23.422  31.23,46.844  0,46.844  C  -31.23,46.844  -62.459,23.422  -62.459,0  C  -62.459,-23.422  -40.742,-51.942  -10.087,-57.901  C  2.185,-60.284  -2.586,-84.826  -14.856,-82.441  C  -57.783,-74.097  -87.459,-35.922  -87.459,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(134.5, 55%, 50%);" id="5"  d=" M  -92.162,155.039  C  -92.162,182.653  -69.776,205.039  -42.162,205.039  L  42.162,205.039  C  69.776,205.039  92.162,182.653  92.162,155.039  L  92.162,0  C  92.162,-37.686  60.849,-78.009  15.616,-86.803  C  3.346,-89.187  -1.425,-64.648  10.845,-62.261  C  43.808,-55.853  67.162,-25.186  67.162,0  C  67.162,25.186  33.581,50.372  0,50.372  C  -33.581,50.372  -67.162,25.186  -67.162,0  C  -67.162,-25.186  -43.808,-55.853  -10.845,-62.261  C  1.425,-64.648  -3.346,-89.187  -15.616,-86.803  C  -60.849,-78.009  -92.162,-37.686  -92.162,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(179.33333333333, 55%, 50%);" id="6"  d=" M  -94.073,162.804  C  -94.073,190.418  -71.687,212.804  -44.073,212.804  L  44.073,212.804  C  71.687,212.804  94.073,190.418  94.073,162.804  L  94.073,0  C  94.073,-38.402  60.709,-79.462  14.387,-87.631  C  2.076,-89.803  -2.266,-65.182  10.046,-63.011  C  44.058,-57.014  69.073,-25.902  69.073,0  C  69.073,25.902  34.537,51.804  0,51.804  C  -34.537,51.804  -69.073,25.902  -69.073,0  C  -69.073,-25.902  -44.058,-57.014  -10.046,-63.011  C  2.266,-65.182  -2.076,-89.803  -14.387,-87.631  C  -60.709,-79.462  -94.073,-38.402  -94.073,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(224.16666666667, 55%, 50%);" id="7"  d=" M  -94.954,171.799  C  -94.954,199.413  -72.568,221.799  -44.954,221.799  L  44.954,221.799  C  72.568,221.799  94.954,199.413  94.954,171.799  L  94.954,0  C  94.954,-38.733  61.27,-80.192  14.517,-88.437  C  2.204,-90.607  -2.136,-65.987  10.174,-63.817  C  44.619,-57.742  69.954,-26.233  69.954,0  C  69.954,26.233  34.977,52.466  0,52.466  C  -34.977,52.466  -69.954,26.233  -69.954,0  C  -69.954,-26.233  -44.619,-57.742  -10.174,-63.817  C  2.136,-65.987  -2.204,-90.607  -14.517,-88.437  C  -61.27,-80.192  -94.954,-38.733  -94.954,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(269, 55%, 50%);" id="8"  d=" M  -101.715,181.536  C  -101.715,209.15  -79.329,231.536  -51.715,231.536  L  51.715,231.536  C  79.329,231.536  101.715,209.15  101.715,181.536  L  101.715,0  C  101.715,-41.268  65.581,-85.771  15.499,-94.603  C  3.188,-96.774  -1.154,-72.154  11.156,-69.983  C  48.932,-63.324  76.715,-28.768  76.715,0  C  76.715,28.768  38.358,57.536  0,57.536  C  -38.358,57.536  -76.715,28.768  -76.715,0  C  -76.715,-28.768  -48.932,-63.324  -11.156,-69.983  C  1.154,-72.154  -3.188,-96.774  -15.499,-94.603  C  -65.581,-85.771  -101.715,-41.268  -101.715,0  z " />
    </g>
</g>
</svg>
</div>

As you can see, our baby bib has been sampled for a range of different sized babies,
and things look prety good.

#### Using a samplerAnchor

The sample service places different samples on top of each other to allow us to compare 
the results. 

How the samples are anchored on top of each other is will be detemined by
the sample service based on these rules:

- If it exists, anchor on the point called `samplerAnchor`
- Or, if it exists, anchor on the point called `gridAnchor`
- Or, anchor on coordinates `(0,0)`

To see the effect of adding a `samplerAnchor` point, let's add the following
line to the `sample` method in `BabyBib.php`:

```php?start_inline=1
$p->newPoint('samplerAnchor', $p->x('bottomLeft'),$p->y('bottomLeft'));
```

We've added the `samplerAnchor` point with the same coordinates as the `bottomLeft` point.
Now, our output looks like this:

<div class='drop-shadow mb-3'>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewbox ="0 0 756.2480322187 1191.5220483827" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" >
<style type="text/css"> <![CDATA[ path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; } path.hidden { fill: none; stroke: none; } ]]> </style>
<g id="patternScaleContainer"  transform=" scale(3.54330709 ) " >
    <g id="bib"  transform=" translate(80.165 153.65)  translate(0 0) " >
<path transform="translate( 0, 0 )" style="stroke: hsl(0, 55%, 50%);" id="2"  d=" M  -75.165,127.624  C  -75.165,155.238  -52.779,177.624  -25.165,177.624  L  25.165,177.624  C  52.779,177.624  75.165,155.238  75.165,127.624  L  75.165,0  C  75.165,-31.312  51.993,-63.849  15.373,-72.303  C  3.194,-75.116  -2.431,-50.758  9.749,-47.945  C  34.189,-42.302  50.165,-18.812  50.165,0  C  50.165,18.812  25.083,37.624  0,37.624  C  -25.083,37.624  -50.165,18.812  -50.165,0  C  -50.165,-18.812  -34.189,-42.302  -9.749,-47.945  C  2.431,-50.758  -3.194,-75.116  -15.373,-72.303  C  -51.993,-63.849  -75.165,-31.312  -75.165,0  z " />
<path transform="translate( 7.738, -11.804 )" style="stroke: hsl(44.833333333333, 55%, 50%);" id="3"  d=" M  -82.903,139.428  C  -82.903,167.042  -60.517,189.428  -32.903,189.428  L  32.903,189.428  C  60.517,189.428  82.903,167.042  82.903,139.428  L  82.903,0  C  82.903,-34.214  56.04,-70.354  15.493,-78.972  C  3.266,-81.571  -1.932,-57.115  10.292,-54.517  C  38.611,-48.498  57.903,-21.714  57.903,0  C  57.903,21.714  28.952,43.428  0,43.428  C  -28.952,43.428  -57.903,21.714  -57.903,0  C  -57.903,-21.714  -38.611,-48.498  -10.292,-54.517  C  1.932,-57.115  -3.266,-81.571  -15.493,-78.972  C  -56.04,-70.354  -82.903,-34.214  -82.903,0  z " />
<path transform="translate( 12.294, -19.553 )" style="stroke: hsl(89.666666666667, 55%, 50%);" id="4"  d=" M  -87.459,147.177  C  -87.459,174.791  -65.073,197.177  -37.459,197.177  L  37.459,197.177  C  65.073,197.177  87.459,174.791  87.459,147.177  L  87.459,0  C  87.459,-35.922  57.783,-74.097  14.856,-82.441  C  2.586,-84.826  -2.185,-60.284  10.087,-57.901  C  40.742,-51.942  62.459,-23.422  62.459,0  C  62.459,23.422  31.23,46.844  0,46.844  C  -31.23,46.844  -62.459,23.422  -62.459,0  C  -62.459,-23.422  -40.742,-51.942  -10.087,-57.901  C  2.185,-60.284  -2.586,-84.826  -14.856,-82.441  C  -57.783,-74.097  -87.459,-35.922  -87.459,0  z " />
<path transform="translate( 16.997, -27.415 )" style="stroke: hsl(134.5, 55%, 50%);" id="5"  d=" M  -92.162,155.039  C  -92.162,182.653  -69.776,205.039  -42.162,205.039  L  42.162,205.039  C  69.776,205.039  92.162,182.653  92.162,155.039  L  92.162,0  C  92.162,-37.686  60.849,-78.009  15.616,-86.803  C  3.346,-89.187  -1.425,-64.648  10.845,-62.261  C  43.808,-55.853  67.162,-25.186  67.162,0  C  67.162,25.186  33.581,50.372  0,50.372  C  -33.581,50.372  -67.162,25.186  -67.162,0  C  -67.162,-25.186  -43.808,-55.853  -10.845,-62.261  C  1.425,-64.648  -3.346,-89.187  -15.616,-86.803  C  -60.849,-78.009  -92.162,-37.686  -92.162,0  z " />
<path transform="translate( 18.908, -35.18 )" style="stroke: hsl(179.33333333333, 55%, 50%);" id="6"  d=" M  -94.073,162.804  C  -94.073,190.418  -71.687,212.804  -44.073,212.804  L  44.073,212.804  C  71.687,212.804  94.073,190.418  94.073,162.804  L  94.073,0  C  94.073,-38.402  60.709,-79.462  14.387,-87.631  C  2.076,-89.803  -2.266,-65.182  10.046,-63.011  C  44.058,-57.014  69.073,-25.902  69.073,0  C  69.073,25.902  34.537,51.804  0,51.804  C  -34.537,51.804  -69.073,25.902  -69.073,0  C  -69.073,-25.902  -44.058,-57.014  -10.046,-63.011  C  2.266,-65.182  -2.076,-89.803  -14.387,-87.631  C  -60.709,-79.462  -94.073,-38.402  -94.073,0  z " />
<path transform="translate( 19.789, -44.175 )" style="stroke: hsl(224.16666666667, 55%, 50%);" id="7"  d=" M  -94.954,171.799  C  -94.954,199.413  -72.568,221.799  -44.954,221.799  L  44.954,221.799  C  72.568,221.799  94.954,199.413  94.954,171.799  L  94.954,0  C  94.954,-38.733  61.27,-80.192  14.517,-88.437  C  2.204,-90.607  -2.136,-65.987  10.174,-63.817  C  44.619,-57.742  69.954,-26.233  69.954,0  C  69.954,26.233  34.977,52.466  0,52.466  C  -34.977,52.466  -69.954,26.233  -69.954,0  C  -69.954,-26.233  -44.619,-57.742  -10.174,-63.817  C  2.136,-65.987  -2.204,-90.607  -14.517,-88.437  C  -61.27,-80.192  -94.954,-38.733  -94.954,0  z " />
<path transform="translate( 26.55, -53.912 )" style="stroke: hsl(269, 55%, 50%);" id="8"  d=" M  -101.715,181.536  C  -101.715,209.15  -79.329,231.536  -51.715,231.536  L  51.715,231.536  C  79.329,231.536  101.715,209.15  101.715,181.536  L  101.715,0  C  101.715,-41.268  65.581,-85.771  15.499,-94.603  C  3.188,-96.774  -1.154,-72.154  11.156,-69.983  C  48.932,-63.324  76.715,-28.768  76.715,0  C  76.715,28.768  38.358,57.536  0,57.536  C  -38.358,57.536  -76.715,28.768  -76.715,0  C  -76.715,-28.768  -48.932,-63.324  -11.156,-69.983  C  1.154,-72.154  -3.188,-96.774  -15.499,-94.603  C  -65.581,-85.771  -101.715,-41.268  -101.715,0  z " />
        <path class="hidden" id="2"  d=" M  -75.165,-148.65  L  128.265,-148.65  L  128.265,177.624  L  -75.165,177.624  z " />
    </g>
</g>
</svg>
</div>

As you can see, all our samples are now anchored at the bottom left.
Which does a great job to prove how it works, but it's not a great result.

Instead, adapt your code to look like this:

```php?start_inline=1
$p->newPoint('samplerAnchor', $p->x(1),$p->y(1));
```

Point `1` is the bottom of our neck opening, and seems like a natural place to anchor
the samples. Here is the output:

<div class='drop-shadow mb-3'>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewbox ="0 0 756.2480322187 1191.5220483827" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" >
<style type="text/css"> <![CDATA[ path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; } path.hidden { fill: none; stroke: none; } ]]> </style>
<g id="patternScaleContainer"  transform=" scale(3.54330709 ) " >
    <g id="bib"  transform=" translate(106.715 119.65)  translate(0 0) " >
<path transform="translate( 0, 0 )" style="stroke: hsl(0, 55%, 50%);" id="2"  d=" M  -75.165,127.624  C  -75.165,155.238  -52.779,177.624  -25.165,177.624  L  25.165,177.624  C  52.779,177.624  75.165,155.238  75.165,127.624  L  75.165,0  C  75.165,-31.312  51.993,-63.849  15.373,-72.303  C  3.194,-75.116  -2.431,-50.758  9.749,-47.945  C  34.189,-42.302  50.165,-18.812  50.165,0  C  50.165,18.812  25.083,37.624  0,37.624  C  -25.083,37.624  -50.165,18.812  -50.165,0  C  -50.165,-18.812  -34.189,-42.302  -9.749,-47.945  C  2.431,-50.758  -3.194,-75.116  -15.373,-72.303  C  -51.993,-63.849  -75.165,-31.312  -75.165,0  z " />
<path transform="translate( 0, -5.804 )" style="stroke: hsl(44.833333333333, 55%, 50%);" id="3"  d=" M  -82.903,139.428  C  -82.903,167.042  -60.517,189.428  -32.903,189.428  L  32.903,189.428  C  60.517,189.428  82.903,167.042  82.903,139.428  L  82.903,0  C  82.903,-34.214  56.04,-70.354  15.493,-78.972  C  3.266,-81.571  -1.932,-57.115  10.292,-54.517  C  38.611,-48.498  57.903,-21.714  57.903,0  C  57.903,21.714  28.952,43.428  0,43.428  C  -28.952,43.428  -57.903,21.714  -57.903,0  C  -57.903,-21.714  -38.611,-48.498  -10.292,-54.517  C  1.932,-57.115  -3.266,-81.571  -15.493,-78.972  C  -56.04,-70.354  -82.903,-34.214  -82.903,0  z " />
<path transform="translate( 0, -9.22 )" style="stroke: hsl(89.666666666667, 55%, 50%);" id="4"  d=" M  -87.459,147.177  C  -87.459,174.791  -65.073,197.177  -37.459,197.177  L  37.459,197.177  C  65.073,197.177  87.459,174.791  87.459,147.177  L  87.459,0  C  87.459,-35.922  57.783,-74.097  14.856,-82.441  C  2.586,-84.826  -2.185,-60.284  10.087,-57.901  C  40.742,-51.942  62.459,-23.422  62.459,0  C  62.459,23.422  31.23,46.844  0,46.844  C  -31.23,46.844  -62.459,23.422  -62.459,0  C  -62.459,-23.422  -40.742,-51.942  -10.087,-57.901  C  2.185,-60.284  -2.586,-84.826  -14.856,-82.441  C  -57.783,-74.097  -87.459,-35.922  -87.459,0  z " />
<path transform="translate( 0, -12.748 )" style="stroke: hsl(134.5, 55%, 50%);" id="5"  d=" M  -92.162,155.039  C  -92.162,182.653  -69.776,205.039  -42.162,205.039  L  42.162,205.039  C  69.776,205.039  92.162,182.653  92.162,155.039  L  92.162,0  C  92.162,-37.686  60.849,-78.009  15.616,-86.803  C  3.346,-89.187  -1.425,-64.648  10.845,-62.261  C  43.808,-55.853  67.162,-25.186  67.162,0  C  67.162,25.186  33.581,50.372  0,50.372  C  -33.581,50.372  -67.162,25.186  -67.162,0  C  -67.162,-25.186  -43.808,-55.853  -10.845,-62.261  C  1.425,-64.648  -3.346,-89.187  -15.616,-86.803  C  -60.849,-78.009  -92.162,-37.686  -92.162,0  z " />
<path transform="translate( 0, -14.18 )" style="stroke: hsl(179.33333333333, 55%, 50%);" id="6"  d=" M  -94.073,162.804  C  -94.073,190.418  -71.687,212.804  -44.073,212.804  L  44.073,212.804  C  71.687,212.804  94.073,190.418  94.073,162.804  L  94.073,0  C  94.073,-38.402  60.709,-79.462  14.387,-87.631  C  2.076,-89.803  -2.266,-65.182  10.046,-63.011  C  44.058,-57.014  69.073,-25.902  69.073,0  C  69.073,25.902  34.537,51.804  0,51.804  C  -34.537,51.804  -69.073,25.902  -69.073,0  C  -69.073,-25.902  -44.058,-57.014  -10.046,-63.011  C  2.266,-65.182  -2.076,-89.803  -14.387,-87.631  C  -60.709,-79.462  -94.073,-38.402  -94.073,0  z " />
<path transform="translate( 0, -14.842 )" style="stroke: hsl(224.16666666667, 55%, 50%);" id="7"  d=" M  -94.954,171.799  C  -94.954,199.413  -72.568,221.799  -44.954,221.799  L  44.954,221.799  C  72.568,221.799  94.954,199.413  94.954,171.799  L  94.954,0  C  94.954,-38.733  61.27,-80.192  14.517,-88.437  C  2.204,-90.607  -2.136,-65.987  10.174,-63.817  C  44.619,-57.742  69.954,-26.233  69.954,0  C  69.954,26.233  34.977,52.466  0,52.466  C  -34.977,52.466  -69.954,26.233  -69.954,0  C  -69.954,-26.233  -44.619,-57.742  -10.174,-63.817  C  2.136,-65.987  -2.204,-90.607  -14.517,-88.437  C  -61.27,-80.192  -94.954,-38.733  -94.954,0  z " />
<path transform="translate( 0, -19.912 )" style="stroke: hsl(269, 55%, 50%);" id="8"  d=" M  -101.715,181.536  C  -101.715,209.15  -79.329,231.536  -51.715,231.536  L  51.715,231.536  C  79.329,231.536  101.715,209.15  101.715,181.536  L  101.715,0  C  101.715,-41.268  65.581,-85.771  15.499,-94.603  C  3.188,-96.774  -1.154,-72.154  11.156,-69.983  C  48.932,-63.324  76.715,-28.768  76.715,0  C  76.715,28.768  38.358,57.536  0,57.536  C  -38.358,57.536  -76.715,28.768  -76.715,0  C  -76.715,-28.768  -48.932,-63.324  -11.156,-69.983  C  1.154,-72.154  -3.188,-96.774  -15.499,-94.603  C  -65.581,-85.771  -101.715,-41.268  -101.715,0  z " />
        <path class="hidden" id="2"  d=" M  -101.715,-114.65  L  101.715,-114.65  L  101.715,211.624  L  -101.715,211.624  z " />
    </g>
</g>
</svg>
</div>

### Sampling options

Apart from measurements, the sample service can also sample options for us.

The options we defined on the pattern configuration file will be sampled
with the default measurements (that are also in the pattern configuration file).

There's is one exception: You cannot sample options of type `chooseOne`, but
only options of type `measure` or `percent`.

Apart from that, the same rules apply: Only paths explicitly marked for sampling 
will be rendered by the sample service.

We've already done that, so let's see what it looks like when we sample our
`lengthBonus` option:

<div class='drop-shadow mb-3'>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg viewbox ="0 0 704.16850460988 1640.7637810954" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" >
<style type="text/css"> <![CDATA[ path { fill: none; stroke: #000000; stroke-opacity:1; stroke-width: 0.5; stroke-miterlimit:4; stroke-dashoffset:0; stroke-linecap:round; stroke-linejoin:round; } path.hidden { fill: none; stroke: none; } ]]> </style>
<g id="patternScaleContainer"  transform=" scale(3.54330709 ) " >
    <g id="bib"  transform=" translate(99.366 93.035)  translate(0 0) " >
<path transform="translate( 0, 0 )" style="stroke: hsl(26.9, 55%, 50%);" id="2"  d=" M  -94.366,115.025  C  -94.366,142.639  -71.98,165.025  -44.366,165.025  L  44.366,165.025  C  71.98,165.025  94.366,142.639  94.366,115.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(53.8, 55%, 50%);" id="3"  d=" M  -94.366,135.025  C  -94.366,162.639  -71.98,185.025  -44.366,185.025  L  44.366,185.025  C  71.98,185.025  94.366,162.639  94.366,135.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(80.7, 55%, 50%);" id="4"  d=" M  -94.366,155.025  C  -94.366,182.639  -71.98,205.025  -44.366,205.025  L  44.366,205.025  C  71.98,205.025  94.366,182.639  94.366,155.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(107.6, 55%, 50%);" id="5"  d=" M  -94.366,175.025  C  -94.366,202.639  -71.98,225.025  -44.366,225.025  L  44.366,225.025  C  71.98,225.025  94.366,202.639  94.366,175.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(134.5, 55%, 50%);" id="6"  d=" M  -94.366,195.025  C  -94.366,222.639  -71.98,245.025  -44.366,245.025  L  44.366,245.025  C  71.98,245.025  94.366,222.639  94.366,195.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(161.4, 55%, 50%);" id="7"  d=" M  -94.366,215.025  C  -94.366,242.639  -71.98,265.025  -44.366,265.025  L  44.366,265.025  C  71.98,265.025  94.366,242.639  94.366,215.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(188.3, 55%, 50%);" id="8"  d=" M  -94.366,235.025  C  -94.366,262.639  -71.98,285.025  -44.366,285.025  L  44.366,285.025  C  71.98,285.025  94.366,262.639  94.366,235.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(215.2, 55%, 50%);" id="9"  d=" M  -94.366,255.025  C  -94.366,282.639  -71.98,305.025  -44.366,305.025  L  44.366,305.025  C  71.98,305.025  94.366,282.639  94.366,255.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(242.1, 55%, 50%);" id="10"  d=" M  -94.366,275.025  C  -94.366,302.639  -71.98,325.025  -44.366,325.025  L  44.366,325.025  C  71.98,325.025  94.366,302.639  94.366,275.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(269, 55%, 50%);" id="11"  d=" M  -94.366,295.025  C  -94.366,322.639  -71.98,345.025  -44.366,345.025  L  44.366,345.025  C  71.98,345.025  94.366,322.639  94.366,295.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
<path transform="translate( 0, 0 )" style="stroke: hsl(295.9, 55%, 50%);" id="12"  d=" M  -94.366,315.025  C  -94.366,342.639  -71.98,365.025  -44.366,365.025  L  44.366,365.025  C  71.98,365.025  94.366,342.639  94.366,315.025  L  94.366,0  C  94.366,-38.513  60.895,-79.705  14.43,-87.9  C  2.118,-90.069  -2.223,-65.451  10.087,-63.28  C  44.244,-57.256  69.366,-26.013  69.366,0  C  69.366,26.013  34.683,52.025  0,52.025  C  -34.683,52.025  -69.366,26.013  -69.366,0  C  -69.366,-26.013  -44.244,-57.256  -10.087,-63.28  C  2.223,-65.451  -2.118,-90.069  -14.43,-87.9  C  -60.895,-79.705  -94.366,-38.513  -94.366,0  z " />
        <path class="hidden" id="2"  d=" M  -94.366,-88.035  L  94.366,-88.035  L  94.366,365.025  L  -94.366,365.025  z " />
    </g>
</g>
</svg>
</div>

That's actually pretty boring, but you can see that the `lengthBonus` option
impacts the length of our bib (and nothing else) as expected.

> <h5 class='notoc'>The sampler service is not just for designers</h5>
>
> While the sample service is mostly for designers, options sampling
> is useful to show users what exactly the effect of a given option is.

## The draft method

So far, our design work has mostly been in the `sample` method of `BabyBib.php`.
That's because this is the method called by the sample service, and so everything
we want to show up in a sample should be defined there.

But a sample is not a fully drafted pattern.
Now that we are happy with our bib samples, it's time we turn our attention
to the draft method.

Let's get started, and update our draft method to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-draft" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-draft" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-draft" markdown="1">

```php?start_inline=1
public function draft($model)
{
    // Continue from sample
    $this->sample($model);

    // Finalize our example part
    $this->finalizeBib($model);

    // Is this a paperless pattern?
    if ($this->isPaperless) {
        // Add paperless info to our example part
        $this->paperlessBib($model);
    }
}
```

</div>
<div role="tabpanel" class="tab-pane" id="template-draft" markdown="1">

```php?start_inline=1
public function draft($model)
{
    // Continue from sample
    $this->sample($model);

    // Finalize our bib
    $this->finalizeExamplePart($model);

    // Is this a paperless pattern?
    if ($this->isPaperless) {
        // Add paperless info to our bib
        //$this->paperlessExamplePart($model);
    }
}
```
</div>
</div>

It convention to keep the `draft` method simple (like the `sample`) method,
and call a `finalize` method for each part.

That's what we're doing here. We're calling the `finalizeBib` method
which will put the finishing touches on our bib pattern.

Oh, and then there's the parperless bit, but we'll get to that later, so we've
commented it out for now.

### Create the finalizeBib method

We're now calling the `finalizeBib` method from our `draft` method,
but it does not exist yet. Instead, our template has the `finalizeExamplePart` method.
So adapt that one to look like this:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-finbib" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-finbib" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-finbib" markdown="1">

```php?start_inline=1
/**
 * Finalizes the bib
 *
 * @param \Freesewing\Model $model The model to draft for
 *
 * @return void
 */
public function finalizeBib($model)
{
    /** @var \Freesewing\Part $p */
    $p = $this->parts['bib'];
}
```

</div>
<div role="tabpanel" class="tab-pane" id="template-finbib" markdown="1">

```php?start_inline=1
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
```
</div>
</div>

### Path offset

Our pattern is a bit unusual because it does not have any seam allowance.
Instead, we'll be finishing the edges with bias binding.

Seam allowance is added via path offset, and to show how that works, we'll
use path offset to add a helpline to indicate we want a bias binding finish.

Add the following lines to the `finalizeBib` method in `BabyBib.php`:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-bias" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-bias" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-bias" markdown="1">

```php?start_inline=1
// Bias binding line
$p->offsetPath('bias', 'outline', -3, true, ['class' => 'helpline']);
```
</div>
<div role="tabpanel" class="tab-pane" id="template-bias" markdown="1">
{% include api.html 
    description="A line indicating where our bias binding should go"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=bias"
%}

</div>
</div>

The [`Part::offsetPath`](/class/part#offsetpath) method creates a new path at a given distance
from the original.

In our case, we told it to create a new path called `bias` which uses the `outline` path 
as its original, and is drawn `-3` mm from it. The `true` parameter says we want this path to be rendered
&mdash; offsetted paths are only calculated and not rendered by default &mdash; and 
finally we added some attributes to change the look of our path.

Path offset is always to the right (from the vantage point of somebody walking along the original path).
If you want offset to the left, just use a negative offset value (as we did here).

### Adding snippets

Snippets are tiny bits of SVG code that we can re-use throughout our pattern.

Snippets are made available by themes, and in our case we are interested in the
`snap-male` and `snap-female` snippets. These add, you guessed it, both parts of 
a snap button to our pattern.

Add the following lines to the `finalizeBib` method in `BabyBib.php`:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-snap" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-snap" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-snap" markdown="1">

```php?start_inline=1
// Snap button
$p->newSnippet(1, 'snap-male', 'snapAnchor');
$p->newSnippet(2, 'snap-female', 'snap2Anchor');

// Logo
$p->addPoint('logoAnchor', $p->shift(1,-90,120)); 
$p->newSnippet('logo', 'logo', 'logoAnchor');
```
</div>
<div role="tabpanel" class="tab-pane" id="template-snap" markdown="1">
{% include api.html 
    description="We added different snippets to our pattern"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=snap"
%}
</div>
</div>

The [`Part::newSnippet`](/class/part#newsnippet) method expects a name for our new snippet 
(we just went with numbers), the name of the snippet defined in the theme, and the name of the 
point to anchor it on.

There's a bunch of other snippets we can add, like `button` or `buttonhole` that aren't relevant to our
bib. Check the theme documentation for a full list.

The snippet that we added are:

- The `snap-male` and `snap-female` snippets for both halves of our snap button
- The `logo` snippet to add the freesewing logo

{: .comment }



### Adding a title

Our pattern has only one part, but most patterns have more parts. Naming and numbering parts is 
important to make it easy to sew them up. That's where the part title comes in.

Add the following lines to the `finalizeBib` method in `BabyBib.php`:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-title" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-title" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-title" markdown="1">

```php?start_inline=1
// Title
$p->addPoint('titleAnchor', $p->shift(1,-90,50)); 
$p->addTitle('titleAnchor', 1, $this->t($p->getTitle()), '1x');
```
</div>
<div role="tabpanel" class="tab-pane" id="template-title" markdown="1">
{% include api.html 
    description="Our bib now has a title"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=title"
%}
</div>
</div>

The first thing we did was add a point to anchor our title on. But what's new here is the 
[`Part::addTitle`](/class/part#addtitle) method.
Titles have three parts:

- The number of the part
- The name of the part
- An optional extra message/instructions

And those are the parameters the [`Part::addTitle`](/class/part#addtitle) method takes.

We also didn't specify a title, but instead used the [`Part::getTitle`](/class/part#gettitle) method
to get the title for the part as set in the patterns configuration file.

And, we wrapped that in the [`Patterns\Pattern::t`](/class/patterns/core/pattern#t) method, 
which translates a string. This way, the title is set as in the config, and if we provided a
translation in the language the user requested, we put in the translation instead.

### Adding notes

Notes on the pattern can't replace full-blown documentation, but they are helpful 
to point out things people should pay attention to, or clarify something.

We'll be adding two notes:

- One note to explain our bias binding line
- One note to point out that the female part of our snap should be attached to the back

Add the following lines to the `finalizeBib` method in `BabyBib.php`:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-note" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-note" role="tab" data-toggle="tab">Result</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-note" markdown="1">

```php?start_inline=1
$p->newNote(1,1,$this->t('Finish with bias tape'), 12, 15, -3);
$p->newNote(2,'snap2Anchor',$this->t('Attach snap at the back'), 6, 25, 4);
```
</div>
<div role="tabpanel" class="tab-pane" id="template-note" markdown="1">
{% include api.html 
    description="We've added two notes to our pattern"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=note"
%}
</div>
</div>

The [`Part::newNote`](/class/part#newnote) method is new to us, and I recommend checking out its
documentation to fully understand its parameters. 

## Paperless patterns

Congratulations, your pattern is ready. Now that you've done all that work, you want as many
people as possible to be able to enjoy your great baby bib pattern, right?

That is what the remainder of this tutorial is about: some extra steps to make your pattern appeal
to as many people as possible.

Later, we'll look into how you can make your pattern multilingual, so it appeals to people who
don't speak English.

But first, we're going to look into paperless patterns. Those are for people who either 
don't have a printer, or who are not keen on printing and taping patterns together.

Turns out, they don't have to.

### What is a paperless pattern anyway?

The idea of a paperless pattern is that you do not need to print the pattern to make it.
Instead, you can draft the pattern yourself directly onto fabric, or on drafting paper 
(in which case paperless isn't the best name, but you get the idea).

To make that possible, we're going to be adding two things to our pattern:

- A grid that helps to copy the pattern
- Dimensions

### The grid

Freesewing has a theme called `Paperless` and when a person selects that theme, it will
place a grid on the pattern that helps you copy it.

There are two grids, a metric one and and imperial one. The correct one will automatically 
be used based on the requested output units.

Below is an example of our BabyBib pattern rendered by the Paperless theme. Once in metric,
once in imperial.

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-grid" role="tab" data-toggle="tab">Metric</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-grid" role="tab" data-toggle="tab">Imperial</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-grid" markdown="1">
{% include api.html 
    description="Our pattern with a metric grid, thanks to the paperless pattern"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=note&theme=Paperless"
%}
</div>
<div role="tabpanel" class="tab-pane" id="template-grid" markdown="1">
{% include api.html 
    description="Our pattern with an imperial grid, thanks to the paperless pattern"
    url="?service=draft&pattern=DesignTutorial&theme=Basic&figure=note&theme=Paperless&unitsOut=imperial"
%}
</div>
</div>

### Paperless code
A grid like this is useful, but probably not enough. We want to add some extra instructions for people
who choose to go paperless.

If we look back on our `draft` method, there's this part of the code where we commented out a line:

```php?start_inline=1
// Is this a paperless pattern?
if ($this->isPaperless) {
    // Add paperless info to our bib
    //$this->paperlessBib($model);
}
```

We are checking the pattern's `isPaperless` property, which is true when we are using a paperless theme.

So only if we are using a paperless theme will we call the `paperlessBib` method, which is where we'll add our
paperless code.

> <h5 class='notoc'>The designer theme also claims to be paperless</h5>
>
> The designer theme also says it's a paperless theme. The reason is that designers also want
> to use the designer theme when adding the paperless code. 

### The paperlessBib method

Our pattern template came with a `paperlessExamplePart` method that we are going to change 
into our `paperlessBib` method as such:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-plb" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#template-plb" role="tab" data-toggle="tab">Template</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-plb" markdown="1">

```php?start_inline=1
/**
 * Adds paperless info for out bib
 *
 * @param \Freesewing\Model $model The model to draft for
 *
 * @return void
 */
public function paperlessBib($model)
{
    /** @var \Freesewing\Part $p */
    $p = $this->parts['bib'];
}
```

</div>
<div role="tabpanel" class="tab-pane" id="template-plb" markdown="1">

```php?start_inline=1
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
```

</div>
</div>

In addition, make sure to uncomment this line in our `draft` method:

```php?start_inline=1
$this->paperlessBib($model);
```

### Adding dimensions

In our `paperlessBib` method, we'll add dimensions. Dimensions are indications of height,
width, length, distance,... that we'll put on our pattern.

There's different types of dimensions we can add. They are all documented in the [`Part`](/class/part)
class, but here are the most important ones:

- [`Part::newWidthDimension`](/class/part#newwidthdimension) adds a new dimension indicating width (horizontal)
- [`Part::newHeightDimension`](/class/part#newheightdimension) adds a new dimension indicating height (vertical)
- [`Part::newLinearDimension`](/class/part#newlineardimension) adds a new dimension indicating length (a straight line)
- [`Part::newCurvedDimension`](/class/part#newcurveddimension) adds a new dimension along a given pathstring 

Some examples perhaps? Add the following lines to our `paperlessBib` method:

<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" href="#our-dimensions" role="tab" data-toggle="tab">BabyBib.php</a></li>
    <li class="nav-item"><a class="nav-link" href="#metric-dimensions" role="tab" data-toggle="tab">Metric</a></li>
    <li class="nav-item"><a class="nav-link" href="#imperial-dimensions" role="tab" data-toggle="tab">Imperial</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="our-dimensions" markdown="1">

```php?start_inline=1
// Width at the bottom
$p->newWidthDimension('bottomLeftCornerEnd','bottomRightCornerEnd', $p->y('bottomRightCornerStart')+15);

// Heights on the right side
$xBase = $p->x('bottomRightCornerEnd');
$p->newHeightDimension('bottomLeftCornerStart', 'bottomRightCornerEnd', $xBase + 15);
$p->newHeightDimension('bottomLeftCornerStart', 1, $xBase + 30);
$p->newHeightDimension('bottomLeftCornerStart', 2, $xBase + 45);
$p->newHeightDimension('bottomLeftCornerStart', 'top1', $xBase + 60);
$p->newHeightDimension('bottomLeftCornerStart', 'topRightCornerEnd', $xBase + 75);

// Neck opening
$p->newLinearDimension('left1',2);
$p->newCurvedDimension('M top12 C top4 top5 left1 C left3 left2 1 C 3 4 2 C top3 top2 top1', -5);
```

</div>
<div role="tabpanel" class="tab-pane" id="metric-dimensions" markdown="1">

{% include api.html 
    description="Metric dimensions"
    url="?service=draft&pattern=DesignTutorial&figure=dimensions&theme=Paperless"
%}

</div>
<div role="tabpanel" class="tab-pane" id="imperial-dimensions" markdown="1">

{% include api.html 
    description="Imperial dimensions"
    url="?service=draft&pattern=DesignTutorial&figure=dimensions&theme=Paperless&unitsOut=imperial"
%}

</div>
</div>

Let's take them one at a time:

#### newWidthDimension

```php?start_inline=1
$p->newWidthDimension('bottomLeftCornerEnd','bottomRightCornerEnd', $p->y('bottomRightCornerStart')+15);
```

[`Part::newWidthDimension`](/class/part#newwidthdimension) takes 2 point names as parameters, and will draw a 
dimension to indicate the width between them. The third parameter is the Y-coordinate on which the dimension
shall be placed. 

#### newHeightDimension

```php?start_inline=1
$xBase = $p->x('bottomRightCornerEnd');
$p->newHeightDimension('bottomLeftCornerStart', 'bottomRightCornerEnd', $xBase + 15);
$p->newHeightDimension('bottomLeftCornerStart', 1, $xBase + 30);
$p->newHeightDimension('bottomLeftCornerStart', 2, $xBase + 45);
$p->newHeightDimension('bottomLeftCornerStart', 'top1', $xBase + 60);
$p->newHeightDimension('bottomLeftCornerStart', 'topRightCornerEnd', $xBase + 75);
```

[`Part::newHeightDimension`](/class/part#newheightdimension) 
takes 2 point names as parameters, and will draw a 
dimension to indicate the height between them. The third parameter is the X-coordinate on which the dimension
shall be placed. 

Because we are adding multiple height dimensions, we stored the X-coordinate of the edge of our bib in
`$xBase` and then simply added 15mm for each additional dimension. 

#### newLinearDimension

```php?start_inline=1
$p->newLinearDimension('left1',2);
```

[`Part::newLinearDimension`](/class/part#newlineardimension) 
takes 2 point names as parameters, and will draw a 
dimension between them to indicate the distance between them.
It takes an (optional) third parameter that is the offset. We'll use a similar parameter in our next example.

#### newCurvedDimension

```php?start_inline=1
$p->newCurvedDimension('M top12 C top4 top5 left1 C left3 left2 1 C 3 4 2 C top3 top2 top1', -5);
```

[`Part::newCurvedDimension`](/class/part#newcurveddimension) does not takes points as input, but a pathstring.
It takes an additional parameter that is the offset, and will draw a dimension parallel to that path at this offset.

In this case, we provided the pathstring of our neck opening.

#### Dimension labels

You may have noticed that for none of these dimensions did we provide any text to use as a label.

We don't need to. Anytime you add a dimension, the lenght, width, height, or even the length of an 
entire pathstring as in our curved dimension example, will be calculated and used as a label.

Furthermore, the label will be in either metric or imperial, depending on what the user requests.

That being said, if you want to specify your own label, you can. Check the [`Part`](/class/part) class
for all details.

## Multilingual patterns

Patterns are translated based on two things:

- Avoiding things that need to be translated
- Wrapping what needs to be transated in the `$this->t` method

The first one seems a little strange, but it's worth pointing out that you can make 
it a lot easier to translate a pattern by choosing what you print on a pattern carefully.

For example, for the title of our bib, we choose to print `1x` on the pattern.
We could have gone with `Cut once` but that requires translation.

That being said, if you want translation, it's baked into freesewing, and easy to use.

### How translation works

Anytime you want something translated in your pattern, you wrap it in a `$this->t` call.

Let's look at an example to clarify how this works. Let's assume my sister wants to make your
baby bib pattern. The language she requests is `nl`, for Dutch, because that's what she speaks.

Freesewing will do a number of things before even starting to make your pattern:

- We'll try to load the `translations/messages.nl.yml` file of the requested pattern
- We'll try to load the `translations/messages.nl.yml` file of the parent (or grandparent) pattern

This will give as a number of strings translated into Dutch.
When we encounter this line:

```php?start_inline=1
$p->newNote(1,1,$this->t('Finish with bias tape'), 12, 15, -3);
```

We will check if `Finish with bias tape` is one of the strings we have in our Durch translations files.
If it is, we will print that. If not, we'll just print `Finish with bias tape`.

So, to make sure your pattern will be translated to another language, you need to provide a 
`messages.[language code].yml` file.

But, you only need to add translations that are not covered by the pattern you extended.
We extended the base [`Pattern`](/class/patterns/core/pattern) class, so all strings in 
`patterns/Pattern/translations/messages.nl.yml` are already known.

### Providing translation files

These are the three lines where we used translation:

```php?start_inline=1
$p->newNote(1,1,$this->t('Finish with bias tape'), 12, 15, -3);
$p->newNote(2,'snap2Anchor',$this->t('Attach snap at the back'), 6, 25, 4);
$p->addTitle('titleAnchor', 1, $this->t($p->getTitle()), '1x');
```

The strings to translate are:

- `Finish with bias tape`
- `Attach snap at the back`
- `Baby bib`

Before we start translating these, let's provide an English language file, so that 
if others want to translate our pattern, they can start form English.

In our pattern directory, create a new directory called `translations`.
In this directory, create the `messages.en.yml` file, and add the following:

```yml
"Baby bib": "Baby bib"
"Attach snap at the back": "Attach snap at the back"
"Finish with bias tape": "Finish with bias tape"
```

The format is easy enough, for every string, we provide a translation.
Which in this case, because it's the English transaltion file, is the same.

Copy this file to `messages.nl.yml` and edit it to look like this:

```yml
"Baby bib": "Baby slabber"
"Attach snap at the back": "Drukknop vastmaken aan de achterkant"
"Finish with bias tape": "Afwerken met biesband"
```

### Configuring languages

With the translation files in place, your pattern will get translated in the language the 
user requests (if available). 

However, if you also want to inform the user the language is available (and why wouldn't you)
you need to add the language to the configuration file.
This way, the info service will pick it up and report it as a supported language.

To do so, simply add a `languages` section to your `config.yml` file, like this:

```yml
languages:
    en: English
    nl: Nederlands
```

Congratulations, you have translated your pattern to Dutch. Don't take my word for it though:

{% include api.html 
    description="Our pattern is rendered in Dutch"
    url="?service=draft&pattern=DesignTutorial&figure=dimensions&lang=nl&theme=Paperless"
%}

## Conclusion and code

Congratulations, you have reached the end of our pattern design tutorial.

I hope you have learned a thing or two, and that you have a better understanding of how freesewing
works, and how you can design patterns for it.

> <h5 class='notoc'>Writing documentation is never finished</h5>
>
>If you feel this guide needs improvements, don't hesitate 
> to [tell us about it](/contact).

For reference, I am including all the work we did during this tutorial below.

### Directory structure
This is what our Acme directory looks like:

- {: .folder .open} Acme
  - {: .folder .open} BabyBib
    - {: .folder .open} sampler
      - models.yml
    - {: .folder .open} translations
      - messages.en.yml
      - messages.nl.yml
    - {: .code } BabyBip.php
    - config.yml 
{: .files}

The content of all these files is included below: 

### BabyBib.php

```php?start_inline=1
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

        // Finalize our bib
        $this->finalizeBib($model);

        // Is this a paperless pattern?
        if ($this->isPaperless) {
            // Add paperless info to our bib
            $this->paperlessBib($model);
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

        // Grid anchor
        $p->newPoint('samplerAnchor', $p->x(1),$p->y(1));

        // Include outline path in the sample service
        $p->paths['outline']->setSample(true);

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
    public function finalizeBib($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['bib'];

        // Bias binding line
        $p->offsetPath('bias', 'outline', -3, true, ['class' => 'helpline']);

        // Snap button
        $p->newSnippet(1, 'snap-male', 'snapAnchor');
        $p->newSnippet(2, 'snap-female', 'snap2Anchor');

        // Title
        $p->addPoint('titleAnchor', $p->shift(1,-90,50)); 
        $p->addTitle('titleAnchor', 1, $this->t($p->getTitle()), '1x');
    
        // Logo
        $p->addPoint('logoAnchor', $p->shift(1,-90,120)); 
        $p->newSnippet('logo', 'logo', 'logoAnchor');
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
    public function paperlessBib($model)
    {
        /** @var \Freesewing\Part $p */
        $p = $this->parts['bib'];

        // Width at the bottom
        $p->newWidthDimension('bottomLeftCornerEnd','bottomRightCornerEnd', $p->y('bottomRightCornerStart')+15);
        
        // Heights on the right side
        $xBase = $p->x('bottomRightCornerEnd');
        $p->newHeightDimension('bottomLeftCornerStart', 'bottomRightCornerEnd', $xBase + 15);
        $p->newHeightDimension('bottomLeftCornerStart', 1, $xBase + 30);
        $p->newHeightDimension('bottomLeftCornerStart', 2, $xBase + 45);
        $p->newHeightDimension('bottomLeftCornerStart', 'top1', $xBase + 60);
        $p->newHeightDimension('bottomLeftCornerStart', 'topRightCornerEnd', $xBase + 75);
        
        // Neck opening
        $p->newLinearDimension('left1',2);
        $p->newCurvedDimension('M top12 C top4 top5 left1 C left3 left2 1 C 3 4 2 C top3 top2 top1', -5);
    }
}

```

### config.yml

```yml
info:
    name: "My baby bib pattern"

languages:
    en: English
    nl: Nederlands

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

### models.yml

```yml
default: 
    group: babies

groups:
    babies:
        - newborn
        - 3months
        - 6months
        - 9months
        - 12months
        - 18months
        - 2years

measurements:

    chestCircumference:
        newborn : 420
        3months : 438
        6months : 451
        9months : 464
        12months: 483
        18months: 508
        2years  : 522

    headCircumference:
        newborn : 343
        3months : 394
        6months : 425
        9months : 457   
        12months: 470
        18months: 476
        2years  : 522
```

### messages.en.yml

```yml
"Baby bib": "Baby bib"
"Attach snap at the back": "Attach snap at the back"
"Finish with bias tape": "Finish with bias tape"
```

### messages.nl.yml

```yml
"Baby bib": "Baby slabber"
"Attach snap at the back": "Drukknop vastmaken aan de achterkant"
"Finish with bias tape": "Afwerken met biesband"
```

* TOC - Do not remove this line
{:toc}




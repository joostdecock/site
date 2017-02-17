---
layout: class
title: InfoService
namespace: Freesewing\Services
tags: [class, extendsService, service]
permalink: /class/Services/InfoService
---
## Description 

The [`InfoService`](InfoService) class handles the info service, 
which provides info about the API. 

The goal of the info service is to make front-end integration easy.

## Example

<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#info-basic" aria-controls="home" role="tab" data-toggle="tab">Basic info</a></li>
    <li role="presentation"><a href="#info-pattern" aria-controls="profile" role="tab" data-toggle="tab">Pattern info</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="info-basic" markdown="1">

Calling `/?service=info` returns the following JSON:

```json
{
    "services": [
        "info",
        "draft",
        "sample",
        "compare"
    ],
    "patterns": {
        "AaronAshirt": "Aaron A-Shirt",
        "BentBodyBlock": "Bent Body Block",
        "BrianBodyBlock": "Brian Body Block",
        "BruceBoxerBriefs": "Bruce Boxer Briefs",
        "CarltonCoat": "Carlton Coat",
        "CathrinCorset": "Cathrin Corset",
        "ClassDocs": "Class documentation",
        "HugoHoodie": "Hugo Hoodie",
        "LesleyLeggings": "Lesley Leggings",
        "PatternTemplate": "Pattern Template",
        "SethSelvedgeTrouserBlock": "Seth Selvedge Trouser Block",
        "SimonShirt": "Simon Shirt",
        "SvenSweatshirt": "Sven Sweatshirt",
        "TamikoTop": "Tamiko Top",
        "TestPattern": "Test Pattern",
        "TheoTrousers": "Theo trousers",
        "TheodoreTrousers": "Theodore trousers",
        "TrayvonTie": "Trayvon Tie",
        "TrentTrouserBlock": "Trent Trouser Block",
        "Tutorial": "Pattern Tutorial",
        "WahidWaistcoat": "Wahid Waistcoat"
    },
    "channels": [
        "Docs"
    ],
    "themes": [
        "Basic",
        "Compare",
        "Designer",
        "Developer",
        "Paperless"
    ]
}
```
</div>
<div role="tabpanel" class="tab-pane" id="info-pattern" markdown="1">

Calling `/?service=info&pattern=AaronAshirt` returns the following JSON:

```json
{
    "info": {
        "name": "Aaron A-Shirt",
        "version": 2,
        "date": 20161008,
        "author": "Joost De Cock",
        "email": "joost@decock.org",
        "company": "freesewing.org",
        "link": "freesewing.org/pattern/aaron-ashirt/"
    },
    "parts": {
        "frontBlock": "Front block",
        "backBlock": "Back block",
        "front": "Front",
        "back": "Back"
    },
    "languages": {
        "en": "English",
        "nl": "Nederlands",
        "de": "Deutsch",
        "fr": "French"
    },
    "measurements": {
        "acrossBack": 450,
        "bicepsCircumference": 335,
        "centerBackNeckToWaist": 480,
        "chestCircumference": 1080,
        "naturalWaistToHip": 120,
        "neckCircumference": 420,
        "shoulderLength": 160,
        "shoulderSlope": 40,
        "hipsCircumference": 950
    },
    "options": {
        "chestEase": {
            "type": "measure",
            "min": -40,
            "max": 160,
            "default": 30
        },
        "armholeDrop": {
            "type": "measure",
            "min": -20,
            "max": 200,
            "default": 30
        },
        "lengthBonus": {
            "type": "measure",
            "min": -120,
            "max": 200,
            "default": 60
        },
        "necklineBend": {
            "type": "percent",
            "default": 100
        },
        "backlineBend": {
            "type": "percent",
            "default": 30
        },
        "necklineDrop": {
            "type": "measure",
            "min": 40,
            "max": 200,
            "default": 120
        },
        "shoulderStrapWidth": {
            "type": "measure",
            "min": 10,
            "max": 80,
            "default": 40
        },
        "shoulderStrapPlacement": {
            "type": "percent",
            "min": 0,
            "max": 100,
            "default": 45
        },
        "stretchFactor": {
            "type": "percent",
            "min": 70,
            "max": 100,
            "default": 90
        },
        "hipsEase": {
            "type": "measure",
            "min": -40,
            "max": 160,
            "default": 60
        }
    },
    "inMemoryOf": {
        "name": "Aaron Swartz",
        "link": "https://en.wikipedia.org/wiki/Aaron_Swartz"
    },
    "models": {
        "default": {
            "group": "maleStandardUsSizes"
        },
        "groups": {
            "realMen": [
                "joost"
            ],
            "maleStandardUsSizes": [
                "usSize34",
                "usSize36",
                "usSize38",
                "usSize40",
                "usSize42",
                "usSize44"
            ]
        },
        "measurements": {
            "acrossBack": {
                "joost": 450,
                "usSize34": 380,
                "usSize36": 390,
                "usSize38": 400,
                "usSize40": 410,
                "usSize42": 420,
                "usSize44": 430
            },
            "bicepsCircumference": {
                "joost": 335,
                "usSize34": 275,
                "usSize36": 290,
                "usSize38": 305,
                "usSize40": 320,
                "usSize42": 335,
                "usSize44": 350
            },
            "centerBackNeckToWaist": {
                "joost": 480,
                "usSize34": 489,
                "usSize36": 492,
                "usSize38": 495,
                "usSize40": 498,
                "usSize42": 501,
                "usSize44": 505
            },
            "chestCircumference": {
                "joost": 1080,
                "usSize34": 849,
                "usSize36": 907,
                "usSize38": 965,
                "usSize40": 1023,
                "usSize42": 1081,
                "usSize44": 1139
            },
            "naturalWaistToHip": {
                "joost": 120,
                "usSize34": 120,
                "usSize36": 120,
                "usSize38": 120,
                "usSize40": 120,
                "usSize42": 120,
                "usSize44": 120
            },
            "neckCircumference": {
                "joost": 420,
                "usSize34": 366,
                "usSize36": 378,
                "usSize38": 391,
                "usSize40": 404,
                "usSize42": 416,
                "usSize44": 429
            },
            "shoulderLength": {
                "joost": 150,
                "usSize34": 148,
                "usSize36": 151,
                "usSize38": 154,
                "usSize40": 157,
                "usSize42": 160,
                "usSize44": 163
            },
            "shoulderSlope": {
                "joost": 55,
                "usSize34": 43,
                "usSize36": 46,
                "usSize38": 49,
                "usSize40": 52,
                "usSize42": 55,
                "usSize44": 58
            },
            "hipsCircumference": {
                "joost": 950,
                "usSize34": 722,
                "usSize36": 780,
                "usSize38": 838,
                "usSize40": 896,
                "usSize42": 954,
                "usSize44": 1012
            },
            "sleeveLengthToWrist": {
                "joost": 700,
                "usSize34": 670,
                "usSize36": 675,
                "usSize38": 680,
                "usSize40": 685,
                "usSize42": 690,
                "usSize44": 700
            },
            "wristCircumference": {
                "joost": 190,
                "usSize34": 170,
                "usSize36": 180,
                "usSize38": 185,
                "usSize40": 190,
                "usSize42": 195,
                "usSize44": 200
            }
        }
    },
    "pattern": "AaronAshirt"
}
```

</div>
</div>


## Typical use

The [`InfoService`](InfoService) is used to facilitate front-end integration.

## Public methods

### getServiceName

```php?start_inline=1
string getServiceName() 
```
Returns the name of the service, which is a `string`. More precisely, this returns `info`.

### run

```php?start_inline=1
void run(
    \Freesewing\Context $context
) 
```
The `run` method returns info, based on the request parameters.
Either general info, or info about a pattern, if the `pattern` request parameter is set.

It also takes a `format` option to determine the output format. Options are:

- `json` : Return info as JSON. For consumption by JavaScript code.
- `php` : Return info as a serialized PHP array. For consumption by PHP code.
- `html` : Output HTML. For consumption by human beings.


#### Typical use
{:.no_toc}

Always called from [`Context::runService`](../Context#runservice).

#### Parameters
{:.no_toc}

- [`Context`](../Context) `$context` : The [`Context`](../Context) object


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

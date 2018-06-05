---
layout: page
title: Core configuration files
tags: [core docs,config]
permalink: /docs/core/config
crumbs:
  - /docs|Docs
  - /docs/core|Core
---
Freesewing uses a number of different configuration files. 
This page document them all.

## Global configuration file

The freesewing global configuration file is `config.yml` and is located at the root of the project.

### Sections
You can add info to the global configuration file to fit your own needs, 
but by default it uses these sections:

#### defaults

The `defaults` section lists the default `service`, `channel`, `pattern`, and `locale`.

For each service it also lists the default theme in the form `[servicename]Theme`.

#### services

The `services` section lists the services available on the API.

If you want to disable a service, this is where you do it.

### Example
```yml
defaults:
    service: draft
    channel: Docs
    draftTheme: Basic
    sampleTheme: Sampler
    compareTheme: Compare
    infoTheme: Info
    pattern: TestPattern
    locale: en
services:
    - info
    - draft
    - sample
    - compare
```

## Theme configuration file

A freesewing theme configuration file is also called `config.yml`, but is located at the root of the theme class.

- Freesewing root
  - themes
    - MyTheme
      - config.yml

### Sections
You can add info to a theme configuration file to fit your own needs, 
but by default it uses these sections:

#### templates

Lists, under subheadings `css`, `defs`, `footer`, `header`, and `attributes` all the files
to be inluded in the SVG document.

Paths to the files are relative to the theme root.

Note that apart from the templates listed in your theme, the templates for the (grand)parent
theme will also be included, unless they have the same name, in which your theme takes precedent.

#### settings

These are `settings` of which the value will be made available in the theme

#### options

These are `options` of which the value can be provided in the request data

### Example

```yml
templates:
    css: 
        - "css/minified.css"
    defs: 
        - "defs/base"
        - "defs/scalebox"
        - "defs/logo"
        - "defs/cc"
        - "defs/buttons"
        - "defs/buttonholes"
        - "defs/snaps"
    footer: 
        - "comments/footer"
    header: 
        - "comments/header"
    attributes: 
        - "attributes/svg"

settings:
    partMargin: 5
    isPaperless: false

options:
    - parts
    - forceParts
    - embedFluid
```

## Channel configuration file

A freesewing channel configuration file is also called `config.yml`, but is located at the root of the channel class.

- Freesewing root
  - channels
    - MyChannel
      - config.yml

Channels don't require a configuration file. But you can use them to fit your own needs.
Note that if a channel configuration file is present, its content will be loaded in the `config`
property by the channel constructor.

### Example

```yml
headers:
    'Access-Control-Allow-Origin': '*'
    'X-Generated-By': 'freesewing'
```

The `Docs` channel sends additional header that are defined in its configuration file.

## Pattern configuration file

A freesewing pattern configuration file is called `config.yml`, and is located at the root of the pattern class.

- Freesewing root
  - patterns
    - MyPattern
      - config.yml

> ##### Don't put sensitive info here
>
> The info service will include the entire pattern configuration
> file in the pattern info. So don't put anything sensitive here.

### Sections
You can add info to a pattern configuration file to fit your own needs (we've
added the `inMemoryOf` section for example), 
but by default it uses these sections:

#### info
The `info` section is mainly used by the info service and provides information about your
pattern. This information is often not required for core, but used in our website:

 - name: A name for the pattern
 - description: A brief description of the pattern
 - handle: This is the name under which the pattern is known on our website
 - level: The difficulty level
 - tags: These help filter patterns on our website
 - inMemoryOf: An optional section that describes in whos honour the pattern was named

#### parts

The parts section lists all the parts of the pattern. While parts can be added at run-time
it is custom to list them in the pattern config along with their title.

#### languages
Tells the info services what languages are available for this pattern.

#### measurements
Lists the required measurements for this pattern along with the defaults in mm.

#### options
List the different options of the pattern. 

Each option has a `camelCasedId` by which it is know. In addition, it has the following properties:

 - title: A title for the option
 - description: A description for the option
 - group: By assigning options to a group, they will be grouped together on the website
 - type: One of `meausre`, `angle`, `percent`, or ,`chooseOne`
 - min: Minimum value for `measure` and `angle` or `percent` options. If not specified for `percent` options, the minimum is `0`
 - max: Maximum value for `measure` and `angle` or `percent` options. If not specified for `percent` options, the maximum is `100`
 - default: The default value, or key of the default value for `chooseOne` options
 - options: List of options to pick from for `chooseOne` options in `key: value` format
 - dependsOn: Makes this option depenent on another option. Must be follow up by the `onlyOn` parameter 
 - onlyOn: Key, or array of keys, that the `dependsOn` options should have for this option to be shown
### Example

```yaml
info:
    name: "Aaron A-Shirt"
    description: "Aaron is an athletic shirt or tank top."
    handle: "aaron"
    level: 3
    tags:
        - top
        - underwear
        - menswear
        - womenswear
    inMemoryOf:
        name: "Aaron Swartz"
        link: "https://en.wikipedia.org/wiki/Aaron_Swartz"

parts:
    frontBlock: ".Front block"
    backBlock: ".Back block"
    front: "Front"
    back: "Back"

languages:
    en: "English"
    nl: "Nederlands"
    de: "Deutsch"
    fr: "French"

measurements:
    bicepsCircumference: 335
    centerBackNeckToWaist: 480
    chestCircumference: 1080
    naturalWaistToHip: 120
    neckCircumference: 420
    shoulderToShoulder: 470
    shoulderSlope: 40
    hipsCircumference: 950

options:

# fit group
    chestEase:
        title: "Chest ease"
        description: "The amount of ease at your chest."
        group: "fit"
        type: "measure"
        min: -40
        max: 160
        default: 30
    hipsEase:
        title: "Hips ease"
        description: "The amount of ease at your hips."
        group: "fit"
        type: "measure"
        min: -40
        max: 160
        default: 60
    stretchFactor:
        title: "Stretch"
        description: "Determines the horizontal negative ease."
        group: "fit"
        type: "percent"
        min: 0
        max: 30
        default: 0

# style group
    necklineBend:
        title: "Neckline shape"
        description: "Determines the shape/bend of the neckline at the front."
        group: "style"
        type: "percent"
        min: 5
        max: 95
        default: 95
    necklineDrop:
        title: "Neckline drop"
        description: "The amount the neck is cutout at the front."
        group: "style"
        type: "measure"
        min: 40
        max: 200
        default: 120
    backlineBend:
        title: "Back armhole shape"
        description: "Determines the shape/bend of the back of the armholes."
        group: "style"
        type: "percent"
        default: 30
    armholeDrop:
        title: "Armhole drop"
        description: "Lower the armhole by this amount. Negative values will raise it."
        group: "style"
        type: "measure"
        min: -20
        max: 120
        default: 30
    shoulderStrapWidth:
        title: "Shoulderstrap width"
        description: "The width of the shoulder straps."
        group: "style"
        type: "measure"
        min: 10
        max: 80
        default: 40
    shoulderStrapPlacement:
        title: "Shoulderstrap placement"
        description: "Determines whether the shoulder strap is placed closer to the neck (lower numbers) or the shoulder (higher numbers)."
        group: "style"
        type: "percent"
        min: 20
        max: 80
        default: 45
    lengthBonus:
        title: "Length bonus"
        description: "The amount to lengthen the garment. A negative value will shorten it."
        group: "style"
        type: "measure"
        min: -60
        max: 200
        default: 60
```

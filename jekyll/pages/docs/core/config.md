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

- {: .folder .open} Freesewing root
  - config.yml
{: .files}

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


* TOC - Do not remove this line
{:toc}

## Theme configuration file

A freesewing theme configuration file is also called `config.yml`, but is located at the root of the theme class.

- {: .folder .open} Freesewing root
  - {: .folder .open} themes
    - {: .folder .open} MyTheme
      - config.yml
{: .files}

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

- {: .folder .open} Freesewing root
  - {: .folder .open} channels
    - {: .folder .open} MyChannel
      - config.yml
{: .files}

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

- {: .folder .open} Freesewing root
  - {: .folder .open} patterns
    - {: .folder .open} MyPattern
      - config.yml
{: .files}

> <h5 class='notoc'>Don't put sensitive info here</h5>
>
> The info service will include the entire pattern configuration
> file in the pattern info. So don't put anything sensitive here.

### Sections
You can add info to a pattern configuration file to fit your own needs (we've
added the `inMemoryOf` section for example), 
but by default it uses these sections:

#### info
The `info` section is mainly used by the info service and provides information about your
pattern.

#### parts

The parts section lists all the parts of the pattern. While parts can be added at run-time
it is custom to list them in the pattern config along with their title.

#### languages
Tells the info services what languages are available for this pattern.

#### measurements
Lists the required measurements for this pattern along with the defaults.

#### options
List the different options of the pattern which can be one of these types:

- `measure` : For things that can be expressed in cm or inch
- `percent` : For percentages
- `chooseOne` : When you need to pick an option from a list

### Example

```yml
info:
    name: "My example pattern"
    version: "1.0"
    date: 20170306
    author: "Joost De Cock"
    email: "joost@decock.org"
    company: "freesewing.org"
    link: "freesewing.org/patterns/example"
parts:
    frontBlock: "Front block"
    backBlock: "Back block"
    front: "Front"
    back: "Back"
languages:
    en: "English"
    nl: "Nederlands"
    de: "Deutsch"
measurements:
    acrossBack: 450
    bicepsCircumference: 335
    centerBackNeckToWaist: 480
    chestCircumference: 1080
    naturalWaistToHip: 120
    neckCircumference: 420
    shoulderToShoulder: 470
    shoulderSlope: 40
    hipsCircumference: 950
options:
    chestEase:
        type: "measure"
        min: -40
        max: 160
        default: 30
    necklineBend:
        type: "percent"
        default: 100
    frontStyle:
        type: "chooseOne"
        options:
            1: "Classic"
            2: "Rounded"
        default: 1
inMemoryOf:
    name: "Immi Imtiaz"
    link: "https://www.facebook.com/immi.imtiaz"
```



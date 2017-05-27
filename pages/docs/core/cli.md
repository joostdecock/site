---
layout: page
title: Command line usage
tags: [fundamentals]
permalink: /docs/core/cli
---
## About
While freesewing core typically runs on a webserver,
it comes with a command line interface too.

This page documents its options.

## Without options

```sh
./freesewing
```

Running freesewing without options prints this help message:



```
USAGE:
  freesewing [key=value ...]

EXAMPLES:
  Show this help:
  freesewing

  Contact the info service, return data in text format:
  freesewing service=info format=text

  Get info on the SimonShirt pattern:
  freesewing service=info format=text pattern=SimonShirt

  Draft the WahidWaistcoat pattern with default measurements and options:
  freesewing service=draft pattern=WahidWaistcoat

SEE ALSO:
  https://docs.freesewing.org/cli
```



## With options

You feed the cli utility options in the same way you use them in your browser:
with `key=value` pairs.

### Examples

To contact the info service, we set the `service` parameter to `info`:

```
./freesewing service=info
```

This will spit out info about the API in JSON, which is kinda hard to read.
To change the output to text, set the `format` option to `text`:

```
./freesewing service=info format=text
```

To get info about a specific pattern, set the `pattern` option:

```
./freesewing service=info format=text pattern=SimonShirt
```

To draft a pattern with the default options and measurements, set the 
`service` option to `draft` and specify the `pattern`:

```
./freesewing service=draft pattern=WahidWaistcoat
```






> For an overview of options you can pass in the browser or on the command line
> see the [Parameters page](/parameters).


* TOC - Do not remove this line
{:toc}


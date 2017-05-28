---
layout: page
title: Yamlr
namespace: Freesewing
tags: [class docs]
permalink: /docs/core/classdocs/src/yamlr
---
## Description 

The [`Yamlr`](yamlr) class is a wafer-thin wrapper around 
`Symfony\Component\Yaml\Yaml`, the 
[Symfony Yaml component](http://symfony.com/doc/current/components/yaml.html)
that loads and dumps YAML files.

## Typical use

Used to load configuration and translation files.

It's only method, `loadYamlFile`, is static, so you don't need to instantiate this 
class to use it.

## Public methods

### loadYamlFile

```php?start_inline=1
array loadYamlFile( 
    string $filename 
)
```
Returns YAML file `$filename` as an array.

Symphony will throw a `ParseException` of the Yaml file is not valid.

#### Example
{:.no_toc}

The [`Context`](context) class loads the Freesewing configuration file
as follows:

```php?start_inline=1
return \Freesewing\Yamlr::loadYamlFile($this->getConfigFile());
```

#### Typical use
{:.no_toc}

Used to load configuration and translation files into an array.

#### Parameters
{:.no_toc}

- `string` `$filename` : Full path to the YAML file to load.

#### Return value
{:.no_toc}

Returns an array with the content of the YAML file.

## See also

- The [Symfony Yaml component](http://symfony.com/doc/current/components/yaml.html)

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

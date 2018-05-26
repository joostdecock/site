---
title: Translating YAML
---

> To translate a YAML file, follow these steps:
> 
>  - Find a line that ends with `TODO` and translate it
>  - Remove the `TODO` from lines you have translated
>  - Submit your work

The strings used in our code are stored in YAML files in the 
`nuxt` > `locales` folder of [our site repository](https://github.com/freesewing/site/tree/develop/nuxt/content).

Each language has it's own folder, based on its language code.
For example, all Spanish strings are in `nuxt` => `locales` => `es`.

Within each language folder, there are six YAML files to translate:

 - `app.yaml`: This is the main file with strings for the website
 - `i18n.yaml`: Contains the names of languages
 - `measurements.yaml`: Contains the names of measurements
 - `optiongroups.yaml`: Contains the names of option groups
 - `options.yaml`: Contains the names and descriptions of pattern options 
 - `patterns.yaml`: Contains the title and descriptions of our patterns

You will also find a `.json` file in this directory. This is the compiled language file that is
automatically genrated from the YAML files. So you can safely ignore it.

**Email strings**

The strings for the E-mails send out by our system are not part of the website.
However, you can find them in `nuxt` => `static` => `i18n` => `email` where 
each language has its own YAML file. 

You can translate them there, and we'll make sure they end up in our data repository
where they belong.

## YAML structure

YALM consists of `key: value` pairs. Here's an example:

```yaml
aboutFreesewing: About Freesewing
```

You never translate the key, as that's how we look up the translation.
You only translate the value. For example, in the Spanish langauge file, this
looks like:

```yaml
aboutFreesewing: Acerca de Freesewing
```

Most of the time, you will see these simple `key: value` pairs.
But in some YAML files, you'll find a hierarchical structure like this:


```yaml
adjustmentRibbon:
  description: Add a ribbon to make the tie adjustable.
  options:
    - Do not include ribbon
    - Include ribbon
  title: Adjustment Ribbon
```

As before, do not translate the keys, only the values. In the case the Spanish looks as such:

```yaml
adjustmentRibbon:
  description: Añadir una banda para hacer la corbata ajustable.
  options:
    - No incluír banda
    - Incluír banda
  title: Banda de ajuste
```

## Syntax

Most strings are just text, but sometimes you'll find a little markup sprinkled in.

We use [vue-i18n](https://kazupon.github.io/vue-i18n/en/) to translate the website
so everything that's supported by vue-i18n goes. However, typically, the only things
you'll find are these:

### HTML formatting

When you encounter HTML tags, simply translate around them. For example:

```yaml
txt-consentProfileAnswerShare: '<b>No</b>, never.'
```

looks like this in Spanish:

```yaml
txt-consentProfileAnswerShare: '<b>No</b>, nunca. '
```

### Placeholders

When you encounter a `{key}` between curly braces, leave it as-is.
These will be filled in later with the correct value. For example:

```yaml
rowsFromToOfTotal: 'Rows {from} to {to} of {total}'
```

looks like this in Spanish

```yaml
rowsFromToOfTotal: 'Filas {from} a la {to} de {total} '
```

### Plurals

When you see translation seperated with a `|` character, this indicated plurals.
Here's an example:

```yaml
yearsAgo: '{years} year ago | {years} years ago'
```

If years is 1, the part before the `|` will be used. If it's 2 or more, the part after `|` will be used.

Simply translate the text, but keep the references intact. Here is what it looks like in Spanish:

```yaml
yearsAgo: 'hace {years} años | hace {years} años'
```

### @-references

When you encounter an `@:reference`, leave it as-is.
These @-references re-use a term from the YAML file. In other words, they contain a `key`
and you should never translate keys. 

For example:


```yaml
username: Username
emailAddress: E-mail address
usernameOrEmail: '@:username or @:emailAddress'
```

This is the correct way to translate this:

```yaml
username: Nombre de usuario
emailAddress: Dirección de correo electrónico
# This line re-uses the values defined above
usernameOrEmail: '@:username or @:emailAddress DONE'
```

(more on `DONE` below)

But this is wrong, and will break things:

```yaml
username: Nombre de usuario
emailAddress: Dirección de correo electrónico
# Don't do this
usernameOrEmail: '@:nombre de usuario or @:dirección de correo electrónico'
```

## About TODO and DONE

To facilitate the work of translators, we have 
[a script](https://github.com/freesewing/site/blob/develop/scripts/locgen.js)
that automatically parses the 
YAML files, compares them to the original English files, marks the lines that are not translated,
and sorts them alphabetically.

This script is nothing to worry about, we will take care of all that for you, but knowing what
it does will help you with your translation work.

### Marking untranslated strings with TODO

The script runs through every `key` in the English YAML file, and compares the English value
to the translated value of each language. Let's take Spanish for example.

If the English and Spanish values are identical, we assume it is not yet translated, 
and we add `TODO` at the end  of the Spanish version.
If the `key` is missing in the Spanish file, we simply add it, and give it the English value, with `TODO` at the end.

At the end, a new file is compiled with all strings in alphabetical order.
This means that:

 - You can search for `TODO` in a YAML file to find all lines that still need to be translated
 - When we add a new string to the English language file, it will automatically get added to the other language files
 - If we remove a key from the English file, it will automatically be removed from all language files
 - We don't care about adding keys in alphabetical order, because they will be re-ordered automatically

### When to use DONE

This works well, but there's one scenario where it does not: When the English and translated text are the same.

Here's an example:

```yaml
imperial: Imperial
```

looks like this in Spanish:

```yaml
imperial: Imperial
```

Because both strings are identical in both languages, it will consider the Spanish string to
not have been translated, add `TODO` at the end, marking it as not translated.

In this case, simply add `DONE` at the end to tell the system that this has been translated:

```yaml
imperial: Imperial DONE
```

The `DONE` will be filtered out, and won't show up on the website. It's just a way to keep track of the 
work that's been done, and what's stil to do. Or rather, `TODO`.

Note that you don't need to add `DONE` to every translation, only when they are identical to the 
original English string.

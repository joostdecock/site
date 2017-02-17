---
layout: class
title: Stack
namespace: Freesewing
tags: [class]
permalink: /class/Stack
---
## Description 

The [`Stack`](Class) class provides a stack-like data structure.

It is used exclusively in the path offset code in the [`Part`](Part)
class, and you can safely ignore it.

## Typical use

This [`Stack`](Class) class is used for offsetting paths. 

When doing so, we split a path into individual steps. 
Sometimes, we need to add steps in between those steps (to fill gaps for example).
This stack class handles this for us. 

We can push data on a stack with [`Stack::push`](Stack#push), or 
replace one element with several taking its place with [`Stack::replace`](Stack#replace).

Because this is used specifically with the path offset code in the [`Part`](Part)
class, this also has a `intersections` property that you can add items to 
with [`Stack::addIntersection`](Stack#addIntersection).

## Public methods

### push

```php?start_inline=1
void push( 
    array $items
)
```
Addes the items in `arrray` `$items` to the stack (well, to the `items` property, which is an array).

Note that `$items` **MUST BE** an array, even it it contain only one item.

#### Typical use
{:.no_toc}

Only called from the path offset code in the [`Part`](Part) class.

#### Parameters
{:.no_toc}

- `array` `$items` : An array of items to push onto the stack

### replace

```php?start_inline=1
void replace( 
    string $search,
    array $items
)
```
Replaces an item on the stack with one of more items in `$items`.

This checks which item on the stack has content `$search`, removes that item, and inserts `$items` 
at that place in the stack.

#### Typical use
{:.no_toc}

Only called from the path offset code in the [`Part`](Part) class.

#### Parameters
{:.no_toc}

- `string` `$search` : The content of the item to replace
- `array` `$items` : An array of items to push onto the stack

### addIntersection

```php?start_inline=1
void addIntersection( 
    array $intersection
)
```
Adds `$intersection` to the `intersections` property.

#### Typical use
{:.no_toc}

Only called from the path offset code in the [`Part`](Part) class.

#### Parameters
{:.no_toc}

- `array` `$intersection` : An array that describes an intersection


## See also
{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}

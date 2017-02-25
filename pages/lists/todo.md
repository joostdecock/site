---
layout: page
title: The big and terribly incomplete todo list
tags: [todo]
permalink: /todo
---
## About
This is a todo list with all the things that needs to be done while we gear up to our first public release. 

Feel free to add things, correct them, or mark them done. 
Info on how to do so it included [at the bottom of this page](#updating-this-todo-page).

> **Legend**
>
> - This is a regular todo
> - {:.done} This is a todo that is done
> - {:.blocking} This is a todo that is important/blocking
> - {:.wish} This is a todo that is nice to have/wishlist
> {:.todo}


## Documentation

### Things that need to get written

- How do units work
- Theme documentation
- {:.done} Getting started guide
- An about page that explains what this thing is
- {:.wish} Documentation on how to update the documentation (so meta)
- Explain request parameters
- Explain configuration options
- Explain the _embedFluid_ theme option
- Document protected methods in abstract classes
- Write about naming conventions
- Write about paths and pathstrings
{:.todo}

### Site issues

- {:.done}Fix link to GitHub in footer
- {:.done}Make footer an include
- {:.done} Improve layout of regular pages to be more inline with class pages
- {:.done} Convert all CSS to SASS
- {:.done} Fix anchor link offset on non-class pages
{:.todo}

### Migration

- {:.wish} Port pattern documentation from MMP
- {:.wish} Port measurements documentation from MMP
- {:.wish} Port other documentation from MMP
{:.todo}

### Various

#### Code

- {:.blocking} Get unit tests up and running again after documentation changes
- {:.blocking} Provide option to exclude patterns from the info service (make them hidden)
{:.todo}

#### Patterns

- Finalize all patterns
- Run quality control on all patterns
- Provide translation
{:.todo}

#### DevOps

- {:.wish} Figure out that Jenkins auto-build stuff and whether we'll use it
- {:.wish} Should we provide a docker image?
{:.todo}

#### Organisation

- Figure out how we'll list contributions/honor contrbutors
- Figure out who/what copyright should be attributed to
- {:.wish} Should we have a launch party?
{:.todo}


## Updating this todo page

To update this todo list, edit the todo page, which is in `pages/todo.md`

If you add an extra list, make sure to give it the `todo` class, like this:

```
- Item 1 
- Item 2 
- Item 3 
- Item 4 
{:.todo}
```

To mark an item as done, give it the `done` class:

```
- {:.done} This is a todo that is done
```

To mark an item as blocking, or give it priority, give it the `blocking` class:

```
- {:.blocking} This is a todo that is important/blocking
```

To mark an item as nice to have/wishlist, give it the `wish` class:

```
- {:.wish} This is a todo that is nice to have/wishlist
```


* TOC - Do not remove this line
{:toc}

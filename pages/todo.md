---
layout: page
title: An overview of things to do
tags: [todo, community]
permalink: /todo
---

So you'd like to do something? That's great. 
It can be hard to know what to do/where to start though. 
This page will hopefully give you a better understanding of where you can chip in.

## Current priority: Let's build a website

With freesewing core 1.0.0 released, 
our main priority is to build a front-end for it. In other words, a website.

Joost has written about his ideas on how to tackle that in detail 
[here](https://react.freesewing.org/blog/that-frontend-is-not-going-to-build-itself/), 
but it boils down to this:

![napkin.jpg](https://farm4.staticflickr.com/3835/32940699243_8026b617ee_z_d.jpg)

Ok, that's probably not very helpful :)

The box at the bottom is the website we have to build. 
The idea is one that is statically generated, and uses Reactjs for the dynamic parts.

> Note: don't confuse this with **docs.freesewing.org** (the site you are reading this on). 
We are building a new site that should replace this one.

The box at the top right is freesewing **core**. 
We will use an API call from our website to have it draft patterns for us.

The box on the top left (which has **cabal** as a working title) 
is an API for user data that we still have to build. 
This API is what we'll call from the website to load the user info, 
his/her models and the measurements of those models. 
Whether they prefer metric or imperial, and so on.

So the main things that need to be done are these:

- Port docs.freesewing.org to Phenomic
- Design a model for user data / storage
- Design a RESP API for user data
- Build React components to bring it all together

You can help with all of these. 
Let's look at what needs to be done in detail:

### Port docs.freesewing.org to Phenomic

[Phenomic](http://phenomic.io) is a React-based static site generator.
Because it's React, it's easy for us to plug in React components
to handle the connections to our APIs. 

This is also the reason why we're migrating from Jekyll (the
static site generator we are currently using) to Phenomic.

Porting **docs.freesewing.org** is actually made up of two things:

- Porting Jekyll functionality
- Porting docs.freesewing.org content 
- Porting makemypattern.com content 

#### Porting Jekyll functionality

Jekyll supports the use of the Liquid tags in Markdown. This allows us to 
do things like include snippets, add CSS classes to things and so on.

We use these things in our documentation to embed examples, tabs and so on.

This is not supported in Phenomic, so we need to come up with a way to have similar
functionality so that we can keep our editors from having to hand-craft a bunch of HTML.

The current plan is to look at these two:

- [react-in-markdown](https://github.com/xurban42/react-in-markdown)
- [markdown-to-react-components](https://github.com/christianalfoni/markdown-to-react-components)

And use them to render React components from Markdown. This will allow us to 
create components that can be used much like includes are in Liquid.

We might also need to look into `phenomic/lib/loader-plugin-init-rawBody-property-from-content`
which is a Phenomic plugin that gives us access to the raw body, giving us more options.

See here: https://gitter.im/MoOx/phenomic?at=58ddb9118e4b63533d7f0559

We'll also need to look into things like tags, categories, and other stuff
that makes a website great.

#### Porting docs.freesewing.org content

If we get phenomic to the point where it does what we want, we should port all 
docs.freesewing.org content, at which point we can get rid of it and just run
freesewing.org as our only website (Yay).

#### Porting makemypattern.com content

And then, we still have to port a bunch of content from makemypattern.com that is
needed to help our users.

Not all of it, but here's a list:

- Instructions for all measurements
- Instructions for all patterns
- Instructions for all pattern options
- General sewing tips/instructions

For an overview, check: [https://makemypattern.com/help](https://makemypattern.com/help)

### Design a model for user data / storage

User data means (from the top of my head):
 

- User account
  - ID: Unique ID to identify the user
  - username: Could be used as unique ID, in that case, no ID
  - password: password storage (see below)
  - email: the email address of the user
  - activated or not?: Did the user confirm his email address?
  - date user joined: Date we onboarded this user
  - date user last logged in: When did we see this user last?
- Model
  - ID: Unique ID to identify the model
  - name: Name the user give to his/her model
  - user: Username/ID of the user owning this model
  - date created: Date this model was added
  - date last updated: Date this model was changed last
  - other data stored as JSON: Model measurements and other stuff that we never queried to be stored as JSON
- Draft
  - ID: Unique ID to identify the draft
  - user: Username/ID of the user owning this draft
  - model: ID of the model this was drafted for
  - date created
  - SVG: The actual draft
  - other data stored as JSON: Things like PDF versions and whatnot 
  - archived: See below
  - core api request stored as JSON: See below

A few remarks:

#### Passwords
Are we going to handle authentication ourselves and stores/manage password.
Or will we use something like [auth0](https://auth0.com/) (they have an open source plan that's free)

#### JSON data

I think it makes sense to store some data as JSON. Data that we don't need to query and
has a changing structure/number of fields. 

For example, model measurements. We are not going to run queries like 'give me all models with an 
inseam larger than such and such'. So we don't need a field for every measurement.
In addition, new patterns will add new measurements. By storing them in JSON, we avoid having to 
update our storage/database scheme when that happens.

#### Archiving drafts

Here is a random sample from a pattern generated by MMP stored on disk:

```
-rw-r--r-- 1 www-data www-data  30323 Dec 21 14:39 mmp-pattern.a4.pdf
-rw-r--r-- 1 www-data www-data 489871 Dec 21 14:39 mmp-pattern.a4.ps
-rw-r--r-- 1 www-data www-data  61320 Dec 21 14:39 mmp-pattern.ps
-rw-r--r-- 1 www-data www-data  19317 Dec 21 14:39 pattern.svg
```

As you can see, the actual SVG file is 19K. When the user wants to download that 
as an A4-sized PDF, we need to generate:

- The postscript file of the original SVG (61K)
- The A4-sized postscript file (489K)
- The A4-sized PDF file (30K)

The total storage requirements are 600K. That might not seem like much. 
But this is only one pattern.

The important lesson here is that the original SVG only takes up
up about 3% of the total storage.

So we have to strike a balance between keeping things available to users,
and managing our storage requirements.

Currently (on MMP) after a couple of months, everything gets deleted. 
I think it makes more sense to _archive_ drafts after a given period.

For an archived draft, we would only keep the SVG. When needed, we can always
re-generate the PDF files for the user and un-archive it.

#### Storing API request

When you request a pattern, there's a lot of options you can pick.
The idea here is to store these options so that we can re-populate the pattern
options with a pre-existing set.

For example, you spend a lot of time tweaking all the options of your shirt
pattern, and now you would like the same with a different collar.

We could offer the possibility to clone/fork a pattern by preloading 
these options into the interface.

### Design a REST API for user data

Once we decide what user data will look like (see the previous point) we need 
to design a REST API to expose this data to our frontend.

Absolutely nothing has been done on this front so far. Arguable, not much can be done
until we decide how data will be structured.

That being said, we have briefly talked about it, and the vague idea for now is to 
build something based on [the PHP Slim framework](https://www.slimframework.com/).

### Build React components to bring it all together

With our API in place, we still need to build the front-end functionality to 
bring it all together:

- User account manager: So user can update their profile/settings/preferences
- Model manager: So users can create/update/delete models
- Draft manager: So users can list/remove drafts and generate PDFs
- Draft creator: Handling the generating of drafts/form fields

## Questions or suggestions?

[Join us on Gitter](https://gitter.im/freesewing/freesewing) and let's talk!



* TOC - Do not remove this line
{:toc}


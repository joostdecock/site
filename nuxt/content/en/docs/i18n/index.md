---
title: Documentation for translators
---

If you like to help translate freesewing.org, this is the documentation for you.

## Languages

English is our origin language. Which means that everything is written in English
and then translated from English into other languages.

Those other languages can be anything you want. You can help with a
language that's already worked on, or you can 
[start translating to a new language](#starting-a-new-language).


## Types of translation work

There are two types of translation:

### Strings

Strings means all of the words and sentences that are used in our code.
Strings are always stored in YAML files, which have the `.yaml` extension.

For details about the specifics, see the [documentation on translating YAML](/docs/i18n/yaml)
 
The complete set of strings is currently about 750 words and sentences, spread
over a few YAML files.

750 lines isn't that much, but you will be translating these strings outside of the context 
they are used, so sometimes you may find that difficult.

When you're not certain in what context a certain word or phrase is used,
[you can simply ask someone](https://gitter.im/freesewing/freesewing).


### Content

Content are things like documentation, blog posts, and so on. 
Content is always stored in **MarkDown** files, which have the `.md` entension.

For details about the specifics, see the [documentation on translating MarkDown](/docs/i18n/markdown)

While there is a lot more text in all of our content than in the strings,
some people find it easier to translate because you know the full context in which the text is used.

## Where to start

Always translate strings first. It's the more crucial information to be translated,
and it gets your counter up faster too. As translating one string carries the same weight as
translating an entire documentation page.

So, focus on strings, and turn your attention to content when you've done all of those.

<blockquote class="warning">

#### Don't translate content yet

Our content is still being ported from our old site to the new site.
(see [this open issue](https://github.com/freesewing/site/issues/384))

This means that we first need to fix the original English content before you
start translating. We'll do that ASAP, but until that time please refrain 
from translating content and focus on strings.
</blockquote>

## How we work

> When different people work together on the same set of files,
> it's easy to overwrite each other's work. Without the right tools, avoiding this
> requires a lot of coordination. 
> 
> As a loose-knit team of volunteers, coordination is minimal. Instead, we trust technology.
> People have been writing software together for decades, and this problem has long been solved.
> 
> We use git to handle versioning of our files, and all our code is hosted on GitHub.
> 
> If you are new to git and/or GitHub you may find it intimidating. However, you will soon discover
> that as far as skills for the modern age go, learning to use GitHub is going to be a nice
> feather in your cap.

**Video**
@[youtube](JYsfL_GbboA)

<small>This video shows how to work with GitHub, fork a repository, make changes,
and submit a pull request. It also shows you how you can use the GitHub desktop app.
</small>

You will need a [GitHub](https://github.com/) account. They are free, so you can just 
[go to the website and sign up](https://github.com/join).

Your GitHub account will also allow you to join
[our chat room on Gitter](https://gitter.im/freesewing/freesewing) which is **the** best place to ask questions.

On GitHub, code is stored in a so-called **repository**. For example, 
[the site repository](https://github.com/freesewing/site) contains the code of our website.
A repository holds the files, as well as a history of every change ever made to them.

While anyone can go to our repository, few people can write to it.
A bit like how everyone can read your tweets, but only you can write them.

So you will always be working on **your own copy of the repository**. 
There, you make the changes you like, and when you are ready we can **pull in those changes**.

The problem is that we can't keep track of everyone who has a copy of our repository and what they 
are doing with it. So you need to let us know you have made some changes
that you would like us to pull in.

You could send us an E-mail to let us know, but instead, you send a so-called **Pull request**.
It says *hey, I made a bunch of changes in my copy, and I think you should put these in your repository too*.

If that all sounds confusing, bear with us, you'll get the hang of it soon enough.
For now, just remember that:

 - Our code is on GitHub in a respository
 - You should make a copy of that repository and do your thing
 - When you're done, you should send a pull request so we can pull in your changes

### Making changes the easy way

Many small changes can be made on the GitHub website. You don't even need to setup your
own copy of the repository first. You can simply go to 
[our site repository](https://github.com/freesewing/site),
navigate to the file you want to change, and click the pencil button.

After you've made your changes, you can click the **Propose file change** to submit them.

In the background, this will create a copy for you (a so-called fork), 
put your changes in it, and submit a pull request all in one go.

That sounds great, but you won't be using it much because you're going to learn a better way to do things.

### Making changes like a boss

Now we're getting to the good stuff. Here's how you graduate from being a noob:

**First, fork our repository on GitHub**

Go to [our site repository](https://github.com/freesewing/site) 
and click the **fork** button.
This will create a copy of the repository under your own account.

**Next, clone to to your computer**

Use git or [the GitHub app](https://desktop.github.com) to clone this repository to your computer.

It will give you a complete local copy on which you can go to town.
You can use the editor of your choice, work while you are offline and do whatever you want.

**Now push your changes to GitHub**

When you've done what you wanted to do, you can **push** the changes
on your computer to your repository in GitHub.

**Finally, submit a pull request**

Your fork of our repository now has changes in it that we do not have.
This is when you submit a pull request to say *hey guys, I did some work here*
and we will pull in those changes, and merge your work with that of others.


Once again, don't let it overwhelm you. 
It won't be long before the *fork => clone => do your work => push => pull request*
routine will become second nature to you.

## Working on an existing langauge

If you're working on an existing language, you can jump right in and get 
to work on the files that are already there.

The one thing to keep in mind is that others might also be working on them.
To avoid doing double work, it's good to do frequent pull requests.

Don't translate 750 lines over the course of three weeks and then submit them
all in one massive pull request. Instead, send in your changes as you go along
in smaller increments.

Remember, we sometimes get pull requests that fix a one-character typo, 
and we're happy with those too.

## Starting a new language

If you'd like to start a new language, simply 
[let us know about it](https://gitter.im/freesewing/freesewing) and we'll
get everything ready to add another language. 

## Enabling a new language

We don't enable a language as soon as you start translating it. The idea is that 
people who don't understand English should at least be able to sign up and 
find their way around the site.

Our [i18n overview page](/i18n/) lists all languages we're working on and their status.

The progress bar of your language will turn pink when 50% is translated. This is the
moment at which we'll enable your language on the website. It's not an automated process
though, so you may need to remind us.

And if you're curious, the progress bar of your language will turn green at 90%.

## Coordination among translators

Unless you're tackling a language all on your own, you and other people will be working
towards the same goal. How you organise yourself is entirely up to you.

It's not that we don't care, we just feel that everybody should figure out what works best for them.

If you want to do everything in the chat room, that's fine. If you want to have a mailinglist,
we can set one of for you. If you want to have a WhatsApp group, or meet under some bridge somewhere,
it's all fine. Do what works and what makes you happy. 

And remember, git allows you to work together with minimal overhead. 

> #### A word about language coordinators
>
> While working on the website, I (joost) at one point added a so-called language coordinator.
>
> I figured it would be nice to have somebody who could be a central figure for questions about 
> a language or translation to that language.
>
> I obviously hadn't really thought it through much, because I don't want to create this idea
> that where multiple people are working on the same language, one of them is *the boss*.
>
> At the end, what I want is to give visibility to the translators and their work, and it would be 
> nice if I knew who to turn to for questions about a specific language.
>
> So I don't know if language coordinator is something that will stick around. But I'm sure we'll
> figure it out together as we go along.

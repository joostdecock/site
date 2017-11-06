---
layout: page
title: Git basics 
tags: [developer docs, config]
permalink: /docs/git-basics
---

## Git

Git is a distributed version control system. 
It was written by Linus Torvalds to keep track 
of code in the Linux kernel. And if it's good enough 
for the Linux kernel, it's good enough for freesewing.

If you're new to Git, or if you'd like to learn more about it, 
the **Pro Git** book is freely available online and has all 
the info you could ever want:

> ##### Pro Git second edition
>
> - [Pro Git, online version](https://git-scm.com/book/en/v2)
> - [Pro Git, PDF version](https://progit2.s3.amazonaws.com/en/2016-03-22-f3531/progit-en.1084.pdf)
{:.link}

It's also 574 pages, so if you'd like to quickly get up to speed, this page is for you.

### Repositories

The most basic part of `Git` is a repository. 
Freesewing code and patterns are stored in the `core` repository. 
This where all the code, relevant files and such are kept. 
All previous versions of the `core` code are here too, and can be looked 
at if required. 

There are other repositories too that are used for the website; `site` 
and `data`.  Then there is `demo`, which can be used by pattern developers 
to see what their paterns will look like without the burden of the 
complete freesewing site. 

While most people will be using `core` to contribute patterns and make 
changes to the code, in this document I will be using the `site` 
repository, since this document will be part of the website, and that 
is stored in `site`.

### Forks

To work on code and patterns, it is best to work on your own isolated part. 
Changes should not be made to the real repository without them being tested 
and approved. 
To do so, you create a `fork`. 

This makes a copy of the repository that you will be responsible for. 
Changes you make in this repository will not immediately be made in 
the original. But you can suggest those changes to the owner of the main 
repository through a `pull request`. 

A pull request tells the owner of the freesewing repository (Joost) 
that you have changes that you would like to see incorporated. He can then 
gracefully decide to do so, or tell you to stuff it.

<div class="row">
<div class="col-6" markdown="1">
{% include figure.html
    url='/img/docs/makeyourownfork.png'
    description='Click the fork button to create a fork'
%}
</div>
<div class="col-6" markdown="1">
{% include figure.html
    url='/img/docs/forksongit.png'
    description='This is what my fork looks like on GitHub'
%}
</div>
</div>

You can create a fork on [github.com](https://github.com/freesewing/site) 
with the `Fork` button.  The number behind it shows how many other 
people have also forked this repository. 
If you click on that number you can see 
[an overview](https://github.com/freesewing/site/network/members) 
of all the different forks.

> ##### About GitHub
>
> [GitHub](https://github.com) is a website that provides 
> hosting for your git repositories.
>
> It is used by freesewing to store all our code. You can find the 
> freesewing repositories at [github.com/freesewing](https://github.com/freesewing)
{:.tip}

### Clones

A `clone` is just a local copy of your repository, complete with the branches.

After making a `fork` (forking is a verb in the Git universe), your 
copy of the code will live on [Github](http://github.com). 

To be useful, we need to have it on our server/workstation so we can 
easily make changes. To do so, we make a `clone`. 
We can then work on this `clone` and Git will keep track of the changes 
we make. 


```bash
woutervdub@laptop:/var/www/html$ git clone git@github.com:woutervdub/site.git
Cloning into 'site'...
remote: Counting objects: 7649, done.
remote: Compressing objects: 100% (312/312), done.
remote: Total 7649 (delta 163), reused 397 (delta 148), pack-reused 7187
Receiving objects: 100% (7649/7649), 106.86 MiB | 2.48 MiB/s, done.
Resolving deltas: 100% (4405/4405), done.
Checking connectivity... done.
woutervdub@laptop:/var/www/html$ cd site
woutervdub@laptop:/var/www/html/site$ git status
On branch develop
Your branch is up-to-date with 'origin/develop'.
nothing to commit, working directory clean
```

### Branches

Branches are used to isolate work on specific initiatives or changes. 

Anyone can start a branch to work on their own issues. 
Changes to the code in one branch will not influence the code in any other 
branch, until the branches are *merged*.
 
{% include figure.html
    url='/img/docs/branchesongit.png'
    description='A graphical overview of different branches on GitHub'
%}

There are already two branches in each repository, `develop` and `master`. 

#### develop

The `develop` branch is the staging ground for new development. It is where pull
requests from different people/forks/branches are merged.

Different people might be working on differnet changes, all in their own branch.
They submit their pull requests to ask to have their code merged into the `develop` branch.

Every now and then Joost moves all the changes made in `develop` into `master`
at which point those changes become part of the production code. 

#### master

The `master` branch holds the production code. 
In the `site` repository, the master branch holds the 
code of this website as you are reading it now. In the `core` repository,
the master branch holds the code that is generating patterns for people as we speak.

The `master` branch only ever takes pull request from the `develop` branch.
In other words, all changes must go through `develop` before they can become part of `master`.

### Remote

To make sure we keep our clone up to date with the original code, we need to tell git 
that our clone belongs to a greater part. Our own repository is referred to as the `origin`.

We will tell git that the original repository we forked from is our remote. 
Now whenever the original gets an update, we can fetch that update. 

This keeps our local clone on our server/laptop in sync with the rest of freesewing.

```bash
woutervdub@laptop:/var/www/html/site$ git remote add upstream git@github.com:freesewing/site.git
woutervdub@laptop:/var/www/html/site$ git remote -v
origin	git@github.com:woutervdub/site.git (fetch)
origin	git@github.com:woutervdub/site.git (push)
upstream	git@github.com:freesewing/site.git (fetch)
upstream	git@github.com:freesewing/site.git (push)
```

At this point, we have a full local environment to work in that allows us to suggest 
changes that can be incorporated into the main environment. 

You can use the `git` commands to keep track of things you change. 
And have it show you what you've changed.

## Doing some work


Before we start working on some changes, we want to make sure we have the 
latest version of the code.  This is where `git status` and `git pull` come into play. 

### git status
`git status` shows you the status of your local clone, and in which `branch` you're 
currently working.

```bash
woutervdub@laptop:/var/www/html/site$ git status
On branch develop
Your branch is up-to-date with 'origin/develop'.
```

### git pull
And with `git pull` you can *pull in* the last changes that were made 
to the repository and merge them in your own code.

```bash
woutervdub@laptop:/var/www/html/site$ git pull
Already up-to-date.
```

### Creating a branch

To isolate the changes we want to make, we should make a branch. 

Where normally you would see references to `master` in the Git universe, 
we will refer to `develop`. Master is the initial branch that is created by Git, 
and the one that is used for the freesewing site. 
It is the code that we consider to be the best we have right now that is stable and tested. 

Freesewing always has an additional branch called `develop` where all the work happens. 
We want to branch off that one so that we can keep up to date with the changes others 
are working on. And it simplifies the work Joost has to do to create a new master. 

#### Creating a new branch

First we want to make sure we are on the correct branch. 
This would be `develop` in the case of Freesewing. 
You'll see `master` be used here in most Git documents, but not for freesewing. 
Use `develop`. We switch to a branch with `git checkout`. 
This tells Git that we want to work on that branch.

```bash
woutervdub@laptop:/var/www/html/site$ git checkout develop
Already on 'develop'
Your branch is up-to-date with 'origin/develop'.
```

Now we can create a new branch off this one with `git branch`, and then switch to it with `git checkout`.

```bash
woutervdub@laptop:/var/www/html/site$ git branch GitMusings
woutervdub@laptop:/var/www/html/site$ git checkout GitMusings
Switched to branch 'GitMusings'
```

> ##### Creating and checking out a branch in a single step
> You can save some time and use `git checkout -b GetMusings` which
> combines the branch and checkout commands into one. 
> It creates the branch and then checks it out all in one go.
{:.tip}

#### Pushing our new branch to GitHub

This is all nice and groovy, but we need to do one more thing. 
This branch is created on our local clone. 
Git does not automatically tell the rest of the environment about this new branch. 
So we have to do this ourselves with `git push -u`. 

Push is the command to move things back to where we got them from. 
In this case, we want to push a branch that doesn't exist yet upstream to origin. 
The command takes two parameters; where to push to, and what to push. 

We want to push the `GitMusings` branch to `origin`. 
Since this is a new branch that doesn't exist yet in anything upstream, 
we have to tell Git explicitely with the `-u` option that we want to push this upstream.

```bash
woutervdub@laptop:/var/www/html/site$ git push -u origin GitMusings
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:freesewing/site.git
 * [new branch]      GitMusings -> GitMusings
Branch GitMusings set up to track remote branch GitMusings from origin.
```

### Changing things

Now that we have our environment in place, we can start working on things. 
We could take one of the files and change the content. 

Let's open `/index.md` and make a small change. `git status` now shows us that things have changed:

```bash
woutervdub@laptop:/var/www/html/site$ git status -v
On branch GitMusings
Your branch is up-to-date with 'origin/GitMusings'.
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.md
```

And with `git diff` we can see what exactly we have changed:

```bash
woutervdub@laptop:/var/www/html/site$ git diff
diff --git a/index.md b/index.md
old mode 100644
new mode 100755
index ade408d..31d2e01
--- a/index.md
+++ b/index.md
@@ -1,6 +1,6 @@
 ---
 layout: cards
-title: Welcome to freesewing.org
+title: Welcome to my copy of freesewing.org
 action: homepage
 permalink: /
 nocomments: true
```

### Adding things
 
Now we want to add a page to the documentation. Specifically, this page.   
To do so, I create a new page in `/pages/docs` and name it `gitmusings.md`. 

In this file I'll put all the information I just gathered, mark it up with markdown, and save it. 
Git knows about this file, but doesn't know what to do with it. This is what `git status` will tell us:

```bash
wouter@DOF10u:/var/www/html/site$ git status
On branch GitMusings
Your branch is up-to-date with 'origin/GitMusings'.
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	pages/docs/gitmusings.md

no changes added to commit (use "git add" and/or "git commit -a")
```

#### git add

We have to let Git know that the file we just created is part of the files that 
belong to the `GitMusings` branch. 
The `git add` command takes care of this. It just takes the file to be added as a parameter:
 
~~~ bash
woutervdub@laptop:/var/www/html/site$ git add pages/docs/gitmusings.md 
~~~

As usual with Linux, no news is good news.

#### git commit

Now that we have done all this work, we want to save our changes.

With the `git commit` command we instruct Git to commit all our changes to a new 
version of our branch. Essentially, every commit is a snapshot of the entire branch.

When we do a commit, we have to give Git a litle description of what we did. 
The `-m <description>` parameter is used for this. (I removed the change we made to `index.md` prior to doing the commit.)

```bash
woutervdub@laptop:/var/www/html/site$ git commit -m "First publishing"
[GitMusings 6566ce7] First publishing
 1 file changed, 101 insertions(+)
 create mode 100755 pages/docs/gitmusings.md
```

Our changes are now saved in our branch in our own local repository.

But we probably want to share our work with others so it can make its way to the freesewing website.
That's where `git push` comes in.

#### git push

Now that we have a version we are happy with, we need to share this with the rest of the team. 

We use a `git push` command to *push* our changes from our local repositoruy to the remote repository (on GitHub). 

> Ones pushed, our code changes are backed up even if our computer somehow explodes.
{:.tip}

```bash
woutervdub@laptop:/var/www/html/site$ git push
Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 2.74 KiB | 0 bytes/s, done.
Total 5 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To git@github.com:woutervdub/site.git
   74da2b6..6566ce7  GitMusings -> GitMusings
```

{% include figure.html
    url='/img/docs/newbranchongit.png'
    description='After the push, we can see our branch on GitHub'
%}


### Contributing to freesewing

So far, we've been working on our own fork of a freesewing repository. 
Now we'd like to contribute our work to the 
oringal freesewing repository we forked.

This is done through a `pull request`.

#### Pull requests

Remember the `git pull` command? We use it to pull in changes made by others into
our own repository.

We would like to see our changes get pulled into the upstream repository (the one we 
forked). Since that repository is not under our control, we can't pull in the changes.

But we can ask the repository maintainer to pull in our changes. 
We ask this through a pull request.

Our pull request will send a request to the owner of the `freesewing` repository 
to merge our changes with the original from which we started to work. 

We can do that on the command line or on the GitHub website. 
I prefer to do it on GitHub for no particular reason. 

Make sure you select the correct `branch` before doing the pull request. 
It must be the one we're working on now (`GitMusings`).

{% include figure.html
    url='/img/docs/pullrequestongit.png'
    description='Select the correct branch and hit that New pull request button'
%}

When we make a pull request, make sure you enter some descriptive comments 
about what you did and why you think it's a good idea to add it to the repository. 

Something like *Fixed issue #189* or *Added documentation for the new pattern option*.

> ##### See the pull request that created this page
>
> As an example, [this is the pull request I made](https://github.com/freesewing/site/pull/153) 
> to merge this page into the `site` repository.
{:.link}

## Continuing to work

The first change of code has now been committed, pushed to our repository, those 
changes have been incorporated into a `pull request`, and Joost has merged 
them into the freesewing `develop` and `master`. Life is good. 

Or is it?

### Getting up-to-date

While the changes were being merged into the freesewing repository, some changes
were made to make them inline with the rest of the `site`. And other files have 
been changed to link this page into the site. So now we need to update our fork 
and clone with these changes.

Since we told Git that we have a remote repository, we can just pull all the changes 
to our local clone with `git pull upstream <branch>`. We have to do this for each 
branch we have. 

```bash
woutervdub@laptop:/var/www/html/site$ git pull upstream develop
remote: Counting objects: 7, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 7 (delta 4), reused 6 (delta 4), pack-reused 0
Unpacking objects: 100% (7/7), done.
From github.com:freesewing/site
 * branch            develop    -> FETCH_HEAD
 * [new branch]      develop    -> upstream/develop
Updating 7b38ad5..94c1480
error: Your local changes to the following files would be overwritten by merge:
	pages/docs/gitmusings.md
Please, commit your changes or stash them before you can merge.
Aborting
```

That does not look good. I don't want this file to be overwritten, since it is 
the one I was working on. It should be the one that is published. And if so, it 
should not need to be overwritten. What is going on?

While publishing this article, Joost changed the name of this file to something
that was more inline with the rest of the site. And there were some other changes
made to other files at the same time. Our local clone still has the original 
file here and Git warns us that it will be overwritten. 

### git stash

There are numerous occasions where you may have changed files and not pushed them
back to the `origin`. Either because you're just testing things, or because you're
not sure those changes should become part of what you're working on. In this case,
you can tell Git to push everything that has changed onto a stack. You can retrieve 
things from there at a later time. 

```bash
woutervdub@laptop:/var/www/html/site$ git stash 
Saved working directory and index state WIP on GitMusings: 7b38ad5 Second publishing too
HEAD is now at 7b38ad5 Second publishing too
```

### git pull upstream develop

Now with that (temporarily) out of the way, we can pull the changes from the `develop`
branch of `freesewing` again down to our `clone`.

```bash
woutervdub@laptop:/var/www/html/site$ git pull upstream develop
remote: Counting objects: 30, done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 30 (delta 10), reused 22 (delta 6), pack-reused 0
Unpacking objects: 100% (30/30), done.
From github.com:freesewing/site
 * branch            develop    -> FETCH_HEAD
   94c1480..5c42dcc  develop    -> upstream/develop
Updating 7b38ad5..5c42dcc
Fast-forward
 pages/contribute.md                    |   6 +
 pages/docs/designer/tutorial/part-2.md |   6 +-
 pages/docs/git-basics.md               | 442 +++++++++++++++++++++++++++++++++
 pages/docs/gitmusings.md               | 256 -------------------
 18 files changed, 548 insertions(+), 259 deletions(-)
 create mode 100755 pages/docs/git-basics.md
 delete mode 100755 pages/docs/gitmusings.md
```

As you can see, many files changed. For brevity, I removed everything regarding the 
Huey Hoody pattern Joost added. This command made our local `clone` identical to 
the `upstream` `freeSewing`. 

### git push origin develop

Now we need to update our own `origin` with these changes. To do so, we just `push` 
them to the `origin`. 

```bash
woutervdub@laptop:/var/www/html/site$ git push origin develop
Counting objects: 37, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (36/36), done.
Writing objects: 100% (37/37), 1.87 MiB | 0 bytes/s, done.
Total 37 (delta 14), reused 0 (delta 0)
remote: Resolving deltas: 100% (14/14), completed with 8 local objects.
To git@github.com:woutervdub/site.git
   74da2b6..5c42dcc  develop -> develop
```
 
We will need to do this for all the branches that have changed. I decided that 
since this page has been published, and I'm only working on this page on the 
`site`, that I don't need the `GitMusings` branch anymore and I'll just work 
in the `development` branch. So the only other branch I needed to update was
my `master` branch. 

After these commands, my `fork` on [github](https://github.com/woutervdub/site/network)
look like this again:
{% include figure.html
    url='/img/docs/backtooriginalongit.png'
    description='After the push, we can see our branch on GitHub'
%}
 
And we can start with making a new branch, or just edit things in `develop`.
 
Happy coding!
 
* TOC - Do not remove this line
{:toc}


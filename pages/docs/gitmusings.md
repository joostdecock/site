---
layout: page
title: Git Musings
tags: [developer docs, config]
permalink: /docs/gitmusings
crumbs:
 - /docs|Docs
---
> ##### See also: The installation page
>
> If you like this kind of stuff, you might also be interested in the 
> [installation page](/docs/install.html).
{:.tip}

## Git

### Repositories

The most basic part of `Git` is a repository. Freesewing code and patterns are stored in the `core` repository. This where all the code, relevant files and such are kept. All previous versions of the `core` code are here too, and can be looked at if required. 

There are other repositories too that are used for the website; `site` and `data`. Then there is `demo`, which can be used by pattern developers to see what their paterns will look like without the burden of the complete freesewing site. While most people will be using `core` to contribute patterns and make changes to the code, in this document I will be using the `site` repository, since this document will be part of the website, and that is stored in `site`.

### Fork

To work on code and patterns, it is best to work on your own isolated part. Changes should not be made to the real repository without them being tested and approved. To do so, you create a `fork`. This makes a copy of the repository that you will be responsible for. Changes you make in this repository will not immediately be made in the original. But you can suggest those changes to the owner of the main repository through a `pull request`. A pull request tells the owner of the freesewing repository (the Grand Poobah) that you have changes that you would like to see incorporated. He can then gracefully decide to do so, or tell you to stuff it.

![Creating a fork](/img/docs/makeyourownfork.png "Creating a fork") 
{: .float-right }

You can create a fork on [github.com](htps://github.com/freesewing) with the `Fork` button. The number behind it shows how many forks there are. You can click on it to get to a [page](https://github.com/freesewing/site/network/members) where you can see who has made a fork.

### Clone

After making a `fork` (forking is a verb in the Git universe), your copy of the code will live on [Github](http://github.com). To be useful, we need to have it on our server/workstation so we can easily make changes. To do so, we make a `clone`. We can then work on this `clone` and Git will keep track of the changes we make. A `clone` is just a local copy of your repository, complete with the branches.

~~~ bash
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
~~~

### Branch

Branches are used to work specific initiatives and changes. You can make changes to the code and patterns and none of that will influence the information in the freesewing site. And someone else can start a different branch to work on different issues. 

There are already two branches in each repository, `master` and `develop`. Master is what we see when we browse the site. Develop is where we make modifications to the code and patterns. Every now and then the Grand Poobah moves all the changes made in `develop` into `master`.

### Remote

To make sure we keep our clone up to date with the original code, we need to tell git that our clone belongs to a greater part. Our own repository is referred to as the origin. We will tell git that the original repository we forked from is our remote. Now whenever the original gets an update, we can fetch that update. This keeps our local clone on our server/laptop in sync with the rest of freesewing.

~~~ bash
woutervdub@laptop:/var/www/html/site$ git remote add upstream git@github.com:freesewing/site.git
woutervdub@laptop:/var/www/html/site$ git remote -v
origin	git@github.com:woutervdub/site.git (fetch)
origin	git@github.com:woutervdub/site.git (push)
upstream	git@github.com:freesewing/site.git (fetch)
upstream	git@github.com:freesewing/site.git (push)
~~~

At this point, we have a full local environment to work in that allows us to suggest changes that can be incorporated into the main environment. You can use the `git` commands to keep track of things you change. And have it show you what you've changed.

## Doing some work

### Branch

To isolate the changes we want to make, we should make a branch. 

Where normally you would see references to master in the Git universe, we will refer to develop. Master is the initial branch that is created by Git, and the one that is used for the freesewing site. It is the code that we consider to be the best we have right now that is stable and tested. Freesewing always has an additional branch called develop where all the work happens. We want to branch off that one so that we can keep up to date with the changes others are working on. And it simplifies the work the Grand Poobah has to do to create a new master. 

First we want to make sure we are on the correct branch. This would be develop in the case of Freesewing. You'll see master be used here in most Git documents. We do that with git checkout. This tells Git that we want to work on that branch.

~~~ bash
wouter@DOF10u:/var/www/html/site$ git checkout develop
Already on 'develop'
Your branch is up-to-date with 'origin/develop'.
~~~

Now we create a new branch off this one with git branch, and then switch to it with git checkout.

~~~ bash
wouter@DOF10u:/var/www/html/site$ git branch GitMusings
wouter@DOF10u:/var/www/html/site$ git checkout GitMusings
Switched to branch 'GitMusings'
~~~

This is all nice and groovy, but we need to do one more thing. This branch is created on our local clone. Git does not automatically tell the rest of the environment about this new branch. So we have to do this ourselves with git push -u. Push is the command to move things back to where we got them from. In this case, we want to push a branch that doesn't exist yet upstream to origin. The command takes to parameters, where to push to, and what to push. We want to push the `GitMusings` branch to `origin`. Since this is a new branch that doesn't exist yet in anything upstream, we have to tell Git explicitely with the `-u` option that we want to push this upstream.

~~~ bash
wouter@DOF10u:/var/www/html/site$ git push -u origin GitMusings
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:freesewing/site.git
 * [new branch]      GitMusings -> GitMusings
Branch GitMusings set up to track remote branch GitMusings from origin.
~~~


~~~ bash
wouter@DOF10u:/var/www/html/site$ git add pages/docs/gitmusings.md 
wouter@DOF10u:/var/www/html/site$ git commit -m "First publishing"
[GitMusings 6566ce7] First publishing
 1 file changed, 101 insertions(+)
 create mode 100755 pages/docs/gitmusings.md
wouter@DOF10u:/var/www/html/site$ git push
warning: push.default is unset; its implicit value has changed in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the traditional behavior, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

When push.default is set to 'matching', git will push local branches
to the remote branches that already exist with the same name.

Since Git 2.0, Git defaults to the more conservative 'simple'
behavior, which only pushes the current branch to the corresponding
remote branch that 'git pull' uses to update the current branch.

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)

Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 2.74 KiB | 0 bytes/s, done.
Total 5 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To git@github.com:woutervdub/site.git
   74da2b6..6566ce7  GitMusings -> GitMusings
wouter@DOF10u:/var/www/html/site$ git status
On branch GitMusings
Your branch is up-to-date with 'origin/GitMusings'.
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   _config.yml
	modified:   pages/docs/index.md
	deleted:    pages/docs/install.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	pages/docs/_install.md
	pages/docs/installing.md

no changes added to commit (use "git add" and/or "git commit -a")
~~~


* TOC - Do not remove this line
{:toc}

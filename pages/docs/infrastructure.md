---
layout: page
title: Infrastructure
tags: [developer docs, config]
permalink: /docs/infrastructure
crumbs:
 - /docs|Docs
---
> ##### See also: The status page
>
> If you like this kind of stuff, you might also be interested in the 
> [status page](/status).
{:.tip}

## core

### master branch

[core.freesewing.org](https://core.freesewing.org/) runs the core master branch.

### develop branch

[dev.core.freesewing.org](https://dev.core.freesewing.org) runs the core develop branch.

### Environment
![Linode](/img/linode.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches of core are hosted on lin.freesewing.org.
Lin is a virtual server based in [Linode](https://www.linode.com/")'s datacenter in Frankfurt.

Lin runs [Debian](https://debian.org) 8 (jessie) with PHP7.0 on Apache over SSL, 
certificates are from [Let's Encrypt](https://letsencrypt.org/).

### DevOps
![TravisCI](/img/travis.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches are auto-deployed by [TravisCI](https://travis-ci.org/freesewing). 

Travis is a continious integration platform. They have free plan for open source projects.

Every time changes are pushed to the master/develop branch, Travis will generate a build,
run unit and integration tests on it, and if everything passes, deploy it automatically.

You can have a look at the .travis.yml file in the repository root for more details.

Unit tests are handled by PHPUnit, the `scripts/test.sh` script handles integration testing.

## data

### master instance

[data.freesewing.org](https://data.freesewing.org/) runs the data master branch.

### develop branch

[dev.data.freesewing.org](https://dev.data.freesewing.org) runs the data develop branch.

### Environment
![Linode](/img/linode.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches of data are hosted on lin.freesewing.org.
Lin is a virtual server based in [Linode](https://www.linode.com/")'s datacenter in Frankfurt.

Lin runs [Debian](https://debian.org) 8 (jessie) with PHP7.0 on Apache over SSL, 
certificates are from [Let's Encrypt](https://letsencrypt.org/).

### DevOps
![TravisCI](/img/travis.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches are auto-deployed by [TravisCI](https://travis-ci.org/freesewing). 

Travis is a continious integration platform. They have free plan for open source projects.

Every time changes are pushed to the master/develop branch, Travis will generate a build and deploy it automatically.

You can have a look at the .travis.yml file in the repository root for more details.

## site

### master branch

[freesewing.org](https://freesewing.org/) runs the site master branch.

### develop branch

[dev.freesewing.org](https://dev.freesewing.org/) runs the site develop branch.

### Environment

![Netlify](/img/netlify.svg)
{: .float-right }
The site repository is a Jekyll site which generates static HTML.
For both the master and develop branches of site, the static HTML is hosted by 
[Netlify](https://www.netlify.com/).

Netlify is a <abbr title="Content Delivery Network">CDN</abbr> for static content.
Their pro plan is free for open source projects.

### DevOps

![Netlify](/img/netlify.svg)
{: .float-right }

Every time changes are pushed to the master/develop branch, [Netlify](https://www.netlify.com/)
will generate a build, and deploy it on their CDN.

### Search

![Algolia](/img/algolia.svg)
{: .float-right }
Search on the website is provided by [Algolia](https://www.algolia.com/).

Algolia is a cloud search provider and offers a free plan.

To update the Algolia index, run this command in the site root:

```
bundle exec jekyll algolia push
```

> ##### You need the API key for this
>
> The command above expects you have the 
> `ALGOLIA_API_KEY` environment variable set to the API key
{:.comment}

## demo

### master branch

[demo.freesewing.org](https://demo.freesewing.org/) runs the demo master branch.

### develop branch

There is none. Just master, this is a very simple repository.

### Environment

![Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)
{: .float-right }
The demo repository is a static HTML site/page hosted by [Netlify](https://www.netlify.com/).

Netlify is a <abbr title="Content Delivery Network">CDN</abbr> for static content.
Their pro plan is free for open source projects, so we use that.

### DevOps

Hosting and deployment of demo is handled by Netlifly.

Pushing changes to the master branch will automatically deploy the 
new master to [https://demo.freesewing.org](https://demo.freesewing.org/).

* TOC - Do not remove this line
{:toc}


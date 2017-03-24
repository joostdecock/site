---
layout: page
title: Infrastructure
tags: [developer documentation, configuration]
permalink: /infrastructure
---
## core

### master branch

[api.freesewing.org](https://api.freesewing.org/) runs the core master branch.

### develop branch

[dev.api.freesewing.org](https://dev.api.freesewing.org) runs the core develop branch.

### Environment
![Linode](https://www.linode.com/media/images/logos/standard/light/linode-logo_standard_light_small.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches of core are hosted on lin.freesewing.org.
Lin is a virtual server based in [Linode](https://www.linode.com/")'s datacenter in Frankfurt.

Lin runs [Debian](https://debian.org) 8 (jessie) with PHP7.0 on Nginx over SSL, 
certificates are from [Let's Encrypt](https://letsencrypt.org/).

### DevOps
![TravisCI](https://cdn.travis-ci.com/images/logos/Tessa-2-4913e90413586105249b4f55ca622ec8.png)
{: .float-right style="width:115px; margin: 5px;"}

Both master and develop branches are auto-deployed by [TravisCI](https://travis-ci.org/freesewing). 

Every time we push changes to the master/develop branch, Travis will generate a build,
run unit and integration tests on it, and if everything passes, deploy it automatically.

You can have a look at the .travis.yml file in the repository root for more details.

Unit tests are handled by PHPUnit, the `scripts/test.sh` script handles integration testing.

Travis is integrated with Slack. Notifications from Travis about core go to the #core channel.

## docs

### master branch

[https://docs.freesewing.org](https://docs.freesewing.org/) runs the docs master branch.

### develop branch

[https://dev.docs.freesewing.org](https://dev.docs.freesewing.org/) runs the docs develop branch.

### Environment

![Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)
{: .float-right }
The docs repository is a Jekyll site which generates static HTML.
For both the master and develop branches of docs, the static HTML is hosted by 
[Netlify](https://www.netlify.com/).

Netlify is a <abbr title="Content Delivery Network">CDN</abbr> for static content.
Their pro plan is free for open source projects, so we use that.

### DevOps

![TravisCI](https://cdn.travis-ci.com/images/logos/Tessa-2-4913e90413586105249b4f55ca622ec8.png)
{: .float-right style="width:115px; margin: 5px;"}

Every time we push changes to the master/develop branch, [TravisCI](https://travis-ci.org/freesewing) 
will generate a build, and run htmlproofer on it to check for broken links.

If everything is fine, the site will automatically be deployed by Netlify.

Travis and Netlify are integrated with Slack. Subscribe to the #docs channel to see their notifications.

## demo

### master instance

[https://demo.freesewing.org](https://demo.freesewing.org/) runs the demo master branch.

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

## nofront

### master branch

[https://freesewing.org](https://freesewing.org/) runs the nofront master branch.

### develop branch

There is none. Just master, this is a very simple repository.

### Environment

![Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)
{: .float-right }
The nofront repository is static HTML hosted by 
[Netlify](https://www.netlify.com/).

Netlify is a <abbr title="Content Delivery Network">CDN</abbr> for static content.
Their pro plan is free for open source projects, so we use that.

* TOC - Do not remove this line
{:toc}


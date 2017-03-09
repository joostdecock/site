---
layout: page
title: core infrastructure
tags: [github, linode, travis, netlify, devops]
permalink: /infrastructure
---
## core

### Master instance

There is currently no node running the master branch of core.

The plan is to use lin.freesewing.org for this purpose.
Lin is a virtual server running Debian and is based in Linode's datacenter in Frankfurt.

### Develop instance

[https://api.freesewing.org](https://api.freesewing.org) runs the core develop branch.

It is hosted on eva.decock.org, a virtual server running Debian in
Linode's datacenter in Frankfurt.

### DevOps

core builds are not automated (yet)

## docs

### Master instance

[https://docs.freesewing.org](https://docs.freesewing.org/) runs the docs master branch.

### Develop instance

The docs develop branch is auto-deployed on each commit or pull request. 
The deployments are announced in the #docs channel on Slack.

See DevOps for more info.

### DevOps

#### TravisCI
![TravisCI](https://cdn.travis-ci.com/images/logos/Tessa-2-4913e90413586105249b4f55ca622ec8.png)
{: .float-right style="width:115px; margin: 5px;"}

Every push to docs will trigger a new Travis build.
The build script looks like this:

```
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --assume-extension --file-ignore /apigen/
```

So this will build the site, but also run htmlproofer to check for broken links.

These Travis builds are integrated with GitHub. They are not (yet) integrated with Slack.

#### Netlifly
![Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)
{: .float-right }
Hosting and deployment of docs is handled by Netlifly.

Any push to the develop branch will get deployed to their own test-domain that are
announced in the demo slack channel.

Merging a pull request into the master branch will automatically deploy the 
new master to [https://docs.freesewing.org](https://docs.freesewing.org/).

Netlifly is integrated with both GitHub and Slack

## demo

### Master instance

[https://demo.freesewing.org](https://demo.freesewing.org/) runs the demo master branch.

### Develop instance

There is no instance running the demo develop branch. 

### DevOps

#### Netlifly
![Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)
{: .float-right }
Hosting and deployment of demo is handled by Netlifly.

Any push to the develop branch will get deployed to their own test-domain that are
announced in the demo slack channel.

Merging a pull request into the master branch will automatically deploy the 
new master to [https://demo.freesewing.org](https://demo.freesewing.org/).

Netlifly is integrated with both GitHub and Slack

* TOC - Do not remove this line
{:toc}


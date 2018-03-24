<a href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/logo-black.svg" align="right" width=200 style="max-width: 20%;" /></a>

# Freesewing site
[Freesewing](https://freesewing.org/) is an online platform to draft sewing patterns based on your measurements.

> This is our site repository, which holds the source code for [our website](https://freesewing.org/).

For all info on what freesewing does/is/provides, please check the documentation at [freesewing.org/docs](https://freesewing.org/docs).

## About

This fork is a complete rewrite and a work in progress. 

The goal is to port the site from a Ruby/Jekyll setup to a Vue/Nuxt setup.

## System requirements

You'll need node and npm/yarn.   
In addition, you'll need to build a version of the nuxtent module that works with Nuxt 1.x.

I've setup a repository to make this easy for you, so you can just run this:

```
git clone https://github.com/joostdecock/nuxtent-module
git clone https://github.com/joostdecock/site

cd nuxtent-module
yarn install
yarn build
yarn link

cd ../site
yarn install
yarn link nuxtent
yarn run dev
```

Now, you can browse the site at http://localhost:3000

## Contribute

If you know your way around Vue/Nuxt, please jump in and help out. 

If you have any questions, the best place to ask is [the freesewing community on Gitter](https://gitter.im/freesewing/freesewing)
or feel free to [create an issue](https://github.com/joostdecock/site/issues/new).

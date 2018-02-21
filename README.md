<a href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/logo-black.svg" align="right" width=200 style="max-width: 20%;" /></a>

# Freesewing site
[Freesewing](https://freesewing.org/) is an online platform to draft sewing patterns based on your measurements.

> This is our site repository, which holds the source code for [our website](https://freesewing.org/).

For all info on what freesewing does/is/provides, please check the documentation at [freesewing.org/docs](https://freesewing.org/docs).

## About

This site is based on [Jekyll](https://jekyllrb.com/), a static site generator written in Ruby.

Apart from plain old HTML, this site uses the [Liquid](https://shopify.github.io/liquid/) template language, 
while [kramdown](https://kramdown.gettalong.org/) is the [markdown](https://en.wikipedia.org/wiki/Markdown) flavour of our choice.

We use [SASS](http://sass-lang.com/) for styles and [jekyll-assets](https://github.com/jekyll/jekyll-assets) as our asset pipeline.

For more info, please refer to our documentation, specifically the site documentation at [freesewing.org/docs/site](https://freesewing.org/docs/site).

## System Requirements
To run your own Ruby instance, you'll need:

 - GNU/Linux, Unix, or macOS
 - Ruby version 2.1 or above
 - GCC and Make

If you need any help, or if you want to run Ruby on Windows, make sure to check the [Ruby install documentation](https://jekyllrb.com/docs/installation/).

## Installation

Full install instructions are available at [freesewing.org/docs/site/install](https://freesewing.org/docs/site/install) 
but here's the gist of it:

### Install Jekyll and Bundler gems through RubyGems

```
gem install jekyll bundler
```

### Clone this repository and cd into it

```
git clone git@github.com:freesewing/site.git
cd site
```

### Let jekyll serve up the site

```
bundle exec jekyll serve
```

## License
Our code is licensed [GPL-3](https://www.gnu.org/licenses/gpl-3.0.en.html), 
our patterns, documentation, and other content are licensed [CC-BY](https://creativecommons.org/licenses/by/4.0/).

## Contribute

Your pull request are welcome here. 
For simple changes, there's an **Improve this page** link at the bottom of every page on the website.

If you're interested in contributing, we'd love your help.
That's exactly why we made this thing open source in the first place.

Read [freesewing.org/contribute](https://freesewing.org/contribute) to get started.
If you have any questions, the best place to ask is [the freesewing community on Gitter](https://gitter.im/freesewing/freesewing).

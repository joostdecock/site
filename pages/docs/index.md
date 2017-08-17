---
layout: cards
title: Documentation
permalink: /docs/
nocomments: true
---
<div class="container">
    <p>Skip ahead to documentation for <a href="#for-makers">makers</a>, <a href="#for-designers">designers</a>, <a href="#for-developers">developers</a>, or <a href="#for-contributors">contributors</a>.</p>
    <h2 id="basics">The basics</h2>
    <div class="row">
        <div class="col-md-12 col-lg-6 mb-3">
            <div class="card hover-shadow">
                <a href="#scroller" title="Feeling lost?" class="tour-guide" data-episode="welcome">
                    <img src="/img/maze.svg" alt="Take the tour" class="rounded-top">
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="#scroller" class="tour-guide" data-episode="welcome">Freesewing essentials<span class="card-link"></span></a></h4>
                    <p class="card-text">
                        If you're not familiar with Freesewing, our <a href="#scroller" class="tour-guide" data-episode="welcome">Freesewing essentials</a> guide will bring you up to speed.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Other guides</h4>
                    <p class="card-text"><b>Before you start</b></p>
                    <ul class="narrow">
                        <li><a href="#scroller" class="tour-guide" data-episode="mobile-nav">Site navigation on mobile</a></li>
                        <li><a href="#scroller" class="tour-guide" data-episode="desktop-nav">Site navigation on desktop</a></li>
                    </ul>
                    <p class="card-text"><b>Basics</b></p>
                    <ul class="narrow">
                        <li><a href="#scroller" class="tour-guide" data-episode="signup">Creating an account</a></li>
                        <li><a href="#scroller" class="tour-guide" data-episode="login">Logging in</a></li>
                    </ul>
                    <p class="card-text"><b>After you log in</b></p>
                    <ul class="narrow">
                        <li><a href="#scroller" class="tour-guide" data-episode="model">Adding models and measurements</a></li>
                        <li><a href="#scroller" class="tour-guide" data-episode="draft">Drafting a pattern</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 mb-3">
            {% include card.html 
                title='Use the fork, Luke'
                text='This website not only drafts patterns, you can also <b>fork drafts</b>.<br><br>To <a href="/docs/site/fork">fork a draft</a> is to take its settings and preload them as defaults for your own draft.<br><br>Forking is especially useful for complex patterns with many options.'
                link='/docs/site/fork'
            %}
        </div>
    </div>
    <h2 id="for-makers">For makers</h2>
    <div class="row">
        <div class="col-md-12 col-lg-6 mb-3">
            <div class="card hover-shadow">
                <a href="/docs/patterns/" title="Pattern docs">
                    <img src="/img/maker.jpg" alt="Pattern docs" class="rounded-top">
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/docs/patterns/">Pattern docs<span class="card-link"></span></a></h4>
                    <p class="card-text">
                        A drafted pattern is just the start. 
                        These instructions will guide you from draft to completed garment.
                    </p>
                    <p class="card-text">
                        We have docs for:
{% for pattern in site.data.freesewing.patterns %}
    {% if forloop.last %} 
        and <a href="/docs/patterns/{{ pattern[1].info.handle }}">{{ pattern[1].info.handle | capitalize }}</a>.
    {% else %} 
        <a href="/docs/patterns/{{ pattern[1].info.handle }}">{{ pattern[1].info.handle | capitalize }}</a>,
    {% endif %}
{% endfor %}

                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3">
            <div class="mb-3">
                <div class="card hover-shadow">
                    <div class="card-block">
                        <h4 class="card-title"><a href="/docs/measurements/" title="Measurement docs">Measurement docs</a></h4>
                        <p class="card-text">
                            Correct measurements are crucial. Learn how and where to measure.
                        </p>
<ul class="narrow">
{% for measurement in site.data.freesewing.measurements %}
{% assign mname = measurement[0] %}
<li><a href="/docs/measurements/{{mname | downcase }}">{{ mname }}</a></li>
{% endfor %}
</ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3">
            <div class="mb-3">
                <div class="card hover-shadow">
                    <div class="card-block">
                        <h4 class="card-title"><a href="/docs/sewing/" title="Sewing docs">Sewing docs</a></h4>
                        <p class="card-text">
                            If you're new(ish) to sewing, we have explained everything you need to know to make our patterns.
                        </p>
{% include pagelist.html tag='sewing docs' format='narrowlist' %}
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-designers">For designers</h2>
    <div class="row">
        <div class="col-md-12 col-lg-8 mb-3">
            {% include card.html 
                title='Pattern design tutorial'
                text='A step by step tutorial that walks you through the process of what it takes to design a made-to-measure pattern.'
                img='/img/designer.jpg'
                link='/docs/designer/tutorial/part-1'
            %}
        </div>
        <div class="col-lg-4 col-md-12">
            <div class="row">
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Fundamentals'
                        text='We\'ve grouped a number of basic things that you should <em>get</em> before you take a deeper dive in our pattern design tutorial.'
                        link='/docs/fundamentals'
                        alt='A Creative Commons image from the Flickr stream of Jill Robidoux'
                    %}
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Designer theme'
                        text='Our designer theme renders your pattern with all the point data included. Handy while designing.'
                        link='/docs/core/classdocs/themes/core/designer'
                    %}
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Freesewing for business'
                        text='You can use freesewing to underpin your pattern business, we even encourage it.'
                        link='/business'
                    %}
                </div>
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-developers">For developers</h2>
    <div class="row">
        <div class="col-md-12 col-lg-8 mb-3">
            {% include card.html 
                title='Core API documentation'
                text="Freesewing core comes with hand-crafted API documentation that will (hopefully) answer all your questions."
                link='/docs/core/classdocs/'
                img='/img/developer.jpg'
                alt='A Creative Commons image from the Flickr stream of WOCinTech Chat'
            %}
            <div class="card hover-shadow mt-3">
                <div class="card-block">
                    <h4 class="card-title"><a href="/docs/site/" title="Frontend documentation">Frontend documentation</a></h4>
                    <p class="card-text">
                        For frontend developers, we have <a href="/docs/data">documentation on our data API</a> and <a href="/docs/site">the freesewing.org frontend</a>.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-lg-4">
            <div class="row">
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Fundamentals'
                        text="If you're new to freesewing, this overview of key concepts will get you up to speed in no time."
                        link='/docs/fundamentals'
                    %}
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Developer theme'
                        text='Our developer theme alows you to drill down into the objects and methods used to generate your draft.'
                        link='/docs/core/classdocs/themes/core/developer'
                    %}
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='API cheat sheet'
                        text='Never guess how to call a method again, thanks to this handy cheat sheet to the core API.'
                        link='/pdf/static/cheatsheet.pdf'
                    %}
                </div>
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-contributors">For contributors</h2>
    <div class="row">
        <div class="col-md-12 col-lg-8 mb-3">
            <div class="card hover-shadow">
                <a href="/contribute" title="Getting started">
                    <img src="/img/contributor.jpg" alt="Getting started" class="rounded-top">
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/contribute">Getting started</a></h4>
                    <p class="card-text">
                        We've bundled <a href="/contribute" title="Getting started">the most essential information for new contributors</a>, including <a href="/contribute#ways-to-contribute">ways to contribute</a> and <a href="/contribute#where-to-get-help-or-report-a-problem">where to get help or report a problem</a>. Also check out  <a href="/about/code-of-conduct">our code of conduct</a> and <a href="/issues">list of open issues</a>.
                    </p>
                    <p>Other noteworthy links are our <a href="/docs/install">install instructions</a>, and our <a href="/docs/infrastructure">infrastructure</a> and <a href="/docs/repositories">repositories</a> pages.</p>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-lg-4">
            <div class="row">
                <div class="mb-3 col-md-4 col-lg-12">
                    <div class="card hover-shadow">
                        <div class="card-block">
                            <h4 class="card-title"><a href="/docs/repositories" title="DevOps">DevOps</a></h4>
                            <p class="card-text">
                                Our <a href="/docs/repositories">repository overview</a> and <a href="/docs/infrastructure">infrastructure page</a> shows how we collaborate to build, test, and deploy freesewing.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Improving freesewing.org'
                        text='Our entire website is open source. We have documentation on how to add or update information on it, or suggest changes or improvements.'
                        link='/docs/site/'
                    %}
                </div>
                <div class="mb-3 col-md-4 col-lg-12">
                    {% include card.html 
                        title='Hang out with us'
                        text='The <a href="https://gitter.im/freesewing/freesewing" target="_BLANK">freesewing community on Gitter</a> is the best place to ask questions, meet other freesewers, or just hang out and share a laugh.'
                        link='https://gitter.im/freesewing/freesewing'
                    %}
                </div>
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="more">More reading material</h2>
    <div class="row">
        <div class="col-md-6">
            <blockquote class="tip"><h5>Try the blog, you might like it</h5><p>Documentation can get pretty dry. <a href="/blog" title="To the blog">Our blog</a> might be a good palate cleanser.</p></blockquote>
        </div>
        <div class="col-md-6">
            <blockquote class="question"><h5>Looking for something else still?</h5><p>Perhaps you should try the <a href="/tags">overview of content tags</a>.</p></blockquote>
        </div>
    </div> <!-- .row -->
</div> <!-- .container -->

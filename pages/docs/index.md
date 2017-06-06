---
layout: cards
title: Documentation
permalink: /docs/
---
<div class="container">
    <h2 id="for-makers">For makers</h2>
    <div class="row">
        <div class="col-md-8 mb-3">
            <div class="card drop-shadow">
                <a href="/docs/patterns/" title="Pattern docs">
                    <img src="/img/maker.jpg" alt="Pattern docs" class="rounded-top">
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/docs/patterns/">Pattern docs</a></h4>
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
        <div class="col-md-4">
            <div class="mb-3">
                {% include card.html 
                    title='Measurement docs'
                    text='Made-to-measure patterns are only as good as your measurments are. Check these instructions to know how to measure, and where.'
                    link='/docs/measurements'
                %}
            </div>
            <div class="mb-3">
                {% include card.html 
                    title='Sewing docs'
                    text='Perhaps you know everything there is to know about sewing. But just in case, we explain all the sewing terminology you need to make our patterns.'
                    link='/docs/sewing/'
                %}
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-designers">For designers</h2>
    <div class="row">
        <div class="col-md-8 mb-3">
            {% include card.html 
                title='Pattern design tutorial'
                text='A step by step tutorial that walks you through the process of what it takes to design a made-to-measure pattern.'
                img='/img/designer.jpg'
                link='/docs/designer/tutorial/part-1'
            %}
        </div>
        <div class="col-md-4">
            <div class="mb-3">
                {% include card.html 
                    title='Fundamentals'
                    text='We\'ve grouped a number of basic things that you should <em>get</em> before you take a deeper dive in our pattern design tutorial.'
                    link='/docs/fundamentals'
                    alt='A Creative Commons image from the Flickr stream of Jill Robidoux'
                %}
            </div>
            <div class="mb-3">
                {% include card.html 
                    title='Freesewing for business'
                    text='You can use freesewing to underpin your pattern business, we even encourage it.'
                    link='/fixme'
                %}
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-developers">For developers</h2>
    <div class="row">
        <div class="col-md-8 mb-3">
            {% include card.html 
                title='Core API documentation'
                text='Freesewing core comes with hand-crafted API documentation that will (hopefully) answer all your questions.'
                img='/img/developer.jpg'
                link='/docs/core/classdocs'
                alt='A Creative Commons image from the Flickr stream of WOCinTech Chat'
            %}
        </div>
        <div class="col-md-4">
            <div class="mb-3">
                {% include card.html 
                    title='Developer theme'
                    text='Our developer theme alows you to drill down into the objects and methods used to generate your draft.'
                    link='/docs/core/classdocs/themes/core/developer'
                %}
            </div>
            <div class="mb-3">
                {% include card.html 
                    title='API cheat sheet'
                    text='Never guess how to call a method again, thanks to this handy cheat sheet to the core API.'
                    link='/pdf/static/cheatsheet.pdf'
                %}
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="for-contributors">For contributors</h2>
    <div class="row">
        <div class="col-md-8 mb-3">
            {% include card.html 
                title='Getting started'
                text='The most essential information for new contributors, including our <a href="/about/code-of-conduct">code of conduct</a>, <a href="/contribute#ways-to-contribute">ways to contribute</a>, and <a href="/contribute#where-to-get-help-or-report-a-problem">where to get help or report a problem</a>.'
                img='/img/contributors.jpg'
                link='/contribute'
                alt='A Creative Commons image from the Flickr stream of Jill Robidoux'
            %}
        </div>
        <div class="col-md-4">
            <div class="mb-3">
                {% include card.html 
                    title='DevOps'
                    text='Our <a href="/docs/repositories">repository overview</a> and <a href="/docs/infrastructure">infrastructure page</a> shows how we collaborate to build, test, and deploy freesewing.'
                    link='/docs/repositories'
                %}
            </div>
            <div class="mb-3">
                {% include card.html 
                    title='Improving freesewing.org'
                    text='Our entire website is open source. Here\'s what you need to know to add or update information on it, or suggest changes or improvements.'
                    link='/fixme'
                %}
            </div>
        </div>
    </div> <!-- .row -->
    <h2 id="more">More reading material</h2>
    <div class="row">
        <div class="col-md-6">
            <blockquote class="link"><h5>Try the blog, you might like it</h5><p>Documentation can get pretty dry. <a href="/blog" title="To the blog">Our blog</a> might be a good palate cleanser.</p></blockquote>
        </div>
        <div class="col-md-6">
            <blockquote class="question"><h5>Looking for something else still?</h5><p>Perhaps you should try the <a href="/tags">overview of content tags</a>.</p></blockquote>
        </div>
    </div> <!-- .row -->
</div> <!-- .container -->

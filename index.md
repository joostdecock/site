---
layout: cards
title: Welcome to freesewing.org
action: homepage
permalink: /
nocomments: true
---
<section class="cover-band" style="margin-top: -8rem !important; padding: 0.5rem; background: #663f95;">
        <div class="container">
            <div class="row" style="margin-top: 6rem; margin-bottom: 6rem; color: #292b2c; text-shadow: none;">
                <div class="col-lg-4 col-sm-6 mt-5">
                    <div class="card text-center drop-shadow py-3">
                        <i class="fa fa-cut fa-5x" aria-hidden="true" style="color: #ff5b77;"></i>
                        <div class="card-block">
                            <h4 class="card-title">Free sewing patterns</h4>
                            <p>This site provides made-to-measure sewing patterns, drafted on the fly</p>
                            <p><a href="/about" class="btn btn-outline-primary">About Freesewing</a></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mt-5">
                    <div class="card text-center drop-shadow py-3">
                        <i class="fa fa-code fa-5x" aria-hidden="true" style="color: #188f93"></i>
                        <div class="card-block">
                            <h4 class="card-title">100% Open Source</h4>
                            <p>All the code that makes this happen is free software, and available on GitHub</p>
                            <p><a href="https://github.com/freesewing/" class="btn btn-outline-primary">Freesewing on GitHub</a></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 mt-5">
                    <div class="card text-center drop-shadow py-3">
                        <i class="fa fa-handshake-o fa-5x" aria-hidden="true" style="color: #653f95;"></i>
                        <div class="card-block">
                            <h4 class="card-title">Community-backed</h4>
                            <p>Freesewing lives by the grace of our Patrons who keep this ship afloat</p>
                            <p><a href="/patrons/join" class="btn btn-outline-primary">Find out more</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>
<section class="cover-band bg-thematic mb-5">
   <div class="cover-body mt-5 mb-5">
            <h1 class="jumbotron-heading mt-5 mb-5">Best wishes for 2018</h1>
            <p class="lead mt-3">Have a wonderful year, and make it count!</p>
  </div>
</section>
<div class="container mt-5">
    <h4>Blog posts</h4>
    <div class="row">
        {% for post in site.posts limit:2 %}
        <div class="col-md-6 mb-3 mt-1">
                <div class="card hover-shadow">
                    <a href="{{ post.url }}" title="{{ post.linktitle }}">
                        <img 
                            src="/img{{ post.url }}lqip_{{ post.img }}" 
                            data-sizes="auto"
                            data-srcset="
                                /img{{ post.url }}lqip_{{ post.img }} 25w,
                                /img{{ post.url }}low_{{ post.img }} 500w,
                                /img{{ post.url }}med_{{ post.img }} 1000w,
                                /img{{ post.url }}high_{{ post.img }} 2000w"
                            alt="{{ post.caption }}" 
                            class="rounded-top lazyload"
                        >
                    </a>
                    <div class="card-block">
                        <h4 class="card-title"><a href="{{ post.url }}" title="{{ post.title | escape }}">{{ post.linktitle }}<span class="block-link"></span></a></h4>
                        <p class="card-text">{{ post.blurb }} </p>
                    </div>
                </div>
        </div>
        {% endfor %} 
    </div>
    <div class="row">
        {% for post in site.posts offset:2 limit:4 %}
        <div class="col-md-3 mb-3 mt-1">
                <div class="card hover-shadow">
                    <a href="{{ post.url }}" title="{{ post.linktitle }}">
                        <img 
                            src="/img{{ post.url }}lqip_{{ post.img }}" 
                            data-sizes="auto"
                            data-srcset="
                                /img{{ post.url }}lqip_{{ post.img }} 25w,
                                /img{{ post.url }}low_{{ post.img }} 500w,
                                /img{{ post.url }}med_{{ post.img }} 1000w,
                                /img{{ post.url }}high_{{ post.img }} 2000w"
                            alt="{{ post.caption }}" 
                            class="rounded-top lazyload"
                        >
                    </a>
                    <div class="card-block">
                        <h4 class="card-title"><a href="{{ post.url }}" title="{{ post.title | escape }}">{{ post.linktitle }}<span class="block-link"></span></a></h4>
                        <p class="card-text only-on-small">{{ post.blurb }} </p>
                    </div>
                </div>
        </div>
        {% endfor %}
    </div> <!-- .row -->
    <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <a href="/blog" class="mt-3">More blog posts</a></p>
</div> <!-- .container -->
<section class="cover-band bg-thematic mb-5 visitor-only" style="background: #663f95;">
    <div class="cover-body mt-5 mb-5" style="background: transparent">
        <div id="landing">
            <h1 class="jumbotron-heading">Sign up for free patterns</h1>
            <form id="signup-landing" class="m600 mt-4">
                <div class="row">
                    <div class="col-sm-4">
                        <label class="sr-only" for="signup-email">Email address</label>
                        <input class="form-control mb-2" id="signup-email" name="signup-email" placeholder="Your email address" required="" type="email">
                    </div>
                    <div class="col-sm-4">
                        <label class="sr-only" for="signup-password">Email address</label>
                        <input class="form-control mb-2" id="signup-password" name="signup-password" placeholder="Pick a password" required="" type="password">
                    </div>
                    <div class="col-sm-4">
                        <button id="signup-submit" type="submit" class="btn btn-outline-white form-control">Sign up</button>
                    </div>
                </div>
            </form>
            <p class="mt-4 lead">Not convinced? <a href="/drafts/sampl">Browse a sample draft</a>, or <a href="/about/">check the about page</a>.</p>
        </div>
  </div>
</section>
<div class="container mb-5">
    <h4>Showcases</h4>
    <div class="row">
            {% assign sorted = site.showcases | sort:"date" | reverse %}
            {% for post in sorted limit:4 %}
            <div class="col-md-3 mb-3">
                <div class="card hover-shadow w-100">
                    <a href="{{ post.url }}" title="{{ post.title | escape}}">
                        <img 
                            src="/img{{ post.url }}lqip_{{ post.img }}" 
                            data-sizes="auto"
                            data-srcset="
                                /img{{ post.url }}lqip_{{ post.img }} 25w,
                                /img{{ post.url }}low_{{ post.img }} 500w,
                                /img{{ post.url }}med_{{ post.img }} 1000w,
                                /img{{ post.url }}high_{{ post.img }} 2000w"
                            alt="{{ post.caption }}" 
                            class="card-img-top lazyload"
                        >
                    </a>
                    <div class="card-block">
                        <h4 class="card-title"><a href="{{ post.url }}" title="{{ post.title | escape}}">{{ post.categories }} by {{ post.author }}<span class="block-link"></span></a></h4>
                        <p class="card-text">{{ post.title | escape}}</p>
                    </div>
                </div>
            </div>
            {% endfor %}
    </div>
    <p class="mt-3"><i class="fa fa-arrow-right" aria-hidden="true"></i> <a href="/showcase/" class="mt-3">More showcases</a></p>
    <div class="row">
        <div class="col-md-6">
            {% include blockquote.html
                bg='linear-gradient(45deg, rgba(102,63,149,1) 0%, rgba(132,90,184,1) 36%, rgba(112,61,179,1) 65%, rgba(102,63,149,1) 100%);'
                icon='handshake-o'
                tcolor='#fff'
                icolor='#fff'
                content="<h3>Become a Patron</h3><h4>We invite you to join our community of Patrons to support us in our core work; Developing an open source platform for made-to-measure sewing patterns.</h4>
                    <p class='text-right'><a href='/patrons/join' class='btn btn-lg btn-outline-white mt-3'>Find out more</a></p>"
            %}
            {% include blockquote.html
                bg=' linear-gradient(45deg, rgba(255,91,119,1) 0%, rgba(251,66,102,1) 50%, rgba(243,52,87,1) 71%, rgba(255,77,109,1) 100%);'
                icon='check'
                tcolor='#fff'
                icolor='#fff'
                content="<h3>Join the Patrons now</h3><h4>We are building a bedrock of loyal supporters to ensure a sustainable future for freesewing.org, our code, our patterns, and our community.</h4>
                    <p class='text-right'><a href='/patrons/join' class='btn btn-lg btn-outline-white mt-3'>Become a Patron</a></p>"
            %}
        </div>
        <div class="col-md-6">
            <h4>Latest comments</h4>
            <div id="recent-comments"></div>
        </div>
    </div>
</div> <!-- .container -->

---
layout: cards
title: Welcome to freesewing.org
action: homepage
permalink: /
nocomments: true
---
<div class="container">
    <div class="row" style="margin-top: 8rem; margin-bottom: 8rem;">
        <div class="col-lg-4 col-sm-12 mt-5">
            <div class="card text-center drop-shadow py-3">
                <i class="fa fa-cut fa-5x" aria-hidden="true" style="color: #ff5b77;"></i>
                <div class="card-block">
                    <h4 class="card-title">Free sewing patterns</h4>
                    <p>This site provides made-to-measure sewing patterns, drafted on the fly</p>
                    <p><a href="/about#what" class="btn btn-outline-primary">What is this thing?</a></p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-5">
            <div class="card text-center drop-shadow py-3">
                <i class="fa fa-code fa-5x" aria-hidden="true" style="color: #188f93"></i>
                <div class="card-block">
                    <h4 class="card-title">Free as in freedom</h4>
                    <p>All the code that makes this happen is free software, and available on GitHub</p>
                    <p><a href="/about#code" class="btn btn-outline-primary">Can I see the code?</a></p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-5">
            <div class="card text-center drop-shadow py-3">
                <i class="fa fa-cc-paypal fa-5x" aria-hidden="true" style="color: #009cde;"></i>
                <div class="card-block">
                    <h4 class="card-title">Free as in gratis</h4>
                    <p>You don't have to pay for anything, but I do accept donations &ndash; it's your call</p>
                    <p><a href="/about#money" class="btn btn-outline-primary">What's the catch?</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="cover-band bg-thematic mt-5 mb-5 visitor-only" style="background: #663f95;">
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

<section class="cover-band bg-thematic mt-5 mb-5 visitor-hidden" style="background: #663f95;">
    <div class="mt-5 mb-5 text-center px-3">
        <h1 class="jumbotron-heading">Care to share?</h1>
        <p class="mt-3 lead">
            I am terrible at marketing. Would you help me out?<br>
            If you like this site, please tell your followers about it:
        </p>
        <p class="text-center social-icons" style="font-size: 3rem;">
            <a class="noline" href="https://twitter.com/intent/tweet?text=This is cool! An open source platform for made-to-measure sewing patterns: https://freesewing.org/ Great work from @freesewing_org&amp;related=freesewing_org" rel="nofollow" target="_blank" title="Share on Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a class="noline" href="https://facebook.com/sharer.php?u=https://freesewing.org/" rel="nofollow" target="_blank" title="Share on Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a class="noline" href="http://pinterest.com/pin/create/button/?url=https://freesewing.org/&amp;description=An open source platform for made-to-measure sewing patterns" rel="nofollow" target="_blank" title="Share on Pinterest"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
            <a class="noline" href="http://www.tumblr.com/share/link?url=https://freesewing.org/&amp;name=freesewing.org&amp;description=An open source platform for made-to-measure sewing patterns" rel="nofollow" target="_blank" title="Share on Tumblr"><i class="fa fa-tumblr" aria-hidden="true"></i></a>
            <a class="noline" href="http://www.reddit.com/submit?url=https://freesewing.org/&amp;title=Freesewing is an open source platform for made-to-measure sewing patterns" rel="nofollow" target="_blank" title="Share on Reddit"><i class="fa fa-reddit" aria-hidden="true"></i></a>
            <a class="noline" href="https://plus.google.com/share?url=https://freesewing.org/" rel="nofollow" target="_blank" title="Share on Google+"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
        </p>
    </div>
</section>

<div class="container">
    <h4>Lastest blog posts</h4>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% for post in site.posts limit:1 %}
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
            {% endfor %} 
        </div>
            {% for post in site.posts offset:1 limit:2 %}
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
    <div class="row">
        <div class="col-md-4">
            <h4>Latest pattern</h4>
            <div class="card hover-shadow">
                <a href="/patterns/benjamin" title="The Benjamin pattern">
                    <img 
                        src="/img/patterns/benjamin/lqip_sample.jpg" 
                        data-sizes="auto"
                        data-srcset="
                            /img/patterns/benjamin/lqip_sample.jpg 25w,
                            /img/patterns/benjamin/low_sample.jpg 500w,
                            /img/patterns/benjamin/med_sample.jpg 1000w"
                        alt="The Benjamin pattern" 
                        class="rounded-top lazyload"
                    >
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/patterns/benjamin" title="Benjamin">Benjamin<span class="block-link"></span></a></h4>
                    <p class="card-text">Benjamin is a bow tie that comes with a variety of options to control pretty much every aspect of your bow tie.</p>
                </div>
            </div>
            <p class="mt-3"><i class="fa fa-arrow-right" aria-hidden="true"></i> <a href="/patterns/" class="mt-3">More patterns</a></p>
        </div>
        <div class="col-md-4">
            <h4>Latest showcase</h4>
            {% assign sorted = site.showcases | sort:"date" | reverse %}
            {% for post in sorted limit:1 %}
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
            {% endfor %}
            <p class="mt-3"><i class="fa fa-arrow-right" aria-hidden="true"></i> <a href="/showcase/" class="mt-3">More showcases</a></p>
        </div>
        <div class="col-md-4">
            <h4>Latest comments</h4>
            <div id="recent-comments"></div>
        </div>
    </div>
</div> <!-- .container -->

<section class="cover-band bg-thematic mt-5 mb-5">
    <div class="mt-5 mb-5">
        <div class="container">
            <div class="row" style="background: RGBA(0,0,0,0.5); padding: 2rem;">
                <div class="col-md-7 offset-md-1 text-left">
                    <h1 class="jumbotron-heading">Vote with your money</h1>
                    <p class="mt-3 lead">If you want to support my work, please make a donation</p> 
                </div>
                <div class="col-md-3 text-center mt-5">
                    <a href="/donate" class="btn btn-outline-white btn-lg btn-block">Donate</a>
                </div>
            </div>
        </div>
  </div>
</section>


---
layout: cards
title: Welcome to freesewing.org
action: homepage
permalink: /
nocomments: true
---
<div class="cover-wrap landing visitor-only">
<div id="landing">
    <h2>We draft sewing patterns</h2>
    <p class="lead" >Made-to-measure patterns. For you. For free.</p>
        <form id="signup-landing" class="m600 form-inline mt-4">
            <label class="sr-only" for="signup-email">Email address</label>
            <input class="form-control mb-2 mr-sm-2 mb-sm-0" id="signup-email" name="signup-email" placeholder="Your email address" required="" type="email">
            <label class="sr-only" for="signup-password">Email address</label>
            <input class="form-control mb-2 mr-sm-2 mb-sm-0" id="signup-password" name="signup-password" placeholder="Pick a password" required="" type="password">
            <button id="signup-submit" type="submit" class="btn btn-outline-white form-control">Sign up to try it out</button>
        </form>
        <p class="mt-4">Not convinced? <a href="/drafts/rhtum">Browse a sample draft</a>, or <a href="/about/">read our origin story</a>.</p>
</div>
<div class="cover-bottom">
    <p id="raquo">&raquo;</p>
</div>
</div>

<div class="container">
    <h2><a href="/blog/" title="Blog">Blog</a></h2>
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
    <p class="text-center"><a href="/blog" class="btn btn-primary btn-lg mt-3">More blog posts</a></p>
    <h2><a href="/patterns/">Patterns</a></h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            <div class="card hover-shadow">
                <a href="/patterns/aaron" title="The Aaron pattern">
                    <img 
                        src="/img/patterns/aaron/lqip_sample.jpg" 
                        data-sizes="auto"
                        data-srcset="
                            /img/patterns/aaron/lqip_sample.jpg 25w,
                            /img/patterns/aaron/low_sample.jpg 500w,
                            /img/patterns/aaron/med_sample.jpg 1000w,
                            /img/patterns/aaron/high_sample.jpg 2000w"
                        alt="The Aaron pattern" 
                        class="rounded-top lazyload"
                    >
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/patterns/aaron" title="Aaron">Aaron<span class="block-link"></span></a></h4>
                    <p class="card-text">This no-frills athletic shirt is a wardrobe staple that nobody should be without</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-3 mt-1">
            <div class="card hover-shadow">
               <a href="/patterns/simon" title="The Simon pattern">
                    <img 
                        src="/img/patterns/simon/lqip_sample.jpg" 
                        data-sizes="auto"
                        data-srcset="
                            /img/patterns/simon/lqip_sample.jpg 25w,
                            /img/patterns/simon/low_sample.jpg 500w,
                            /img/patterns/simon/med_sample.jpg 1000w,
                            /img/patterns/simon/high_sample.jpg 2000w"
                        alt="The Simon pattern" 
                        class="rounded-top lazyload"
                    >
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/patterns/simon" title="Simon">Simon<span class="block-link"></span></a></h4>
                    <p class="card-text">This is my bid to create the last shirt pattern you'll even need</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-3 mt-1">
            <div class="card hover-shadow">
               <a href="/patterns/bruce" title="The Bruce pattern">
                    <img 
                        src="/img/patterns/bruce/lqip_sample.jpg" 
                        data-sizes="auto"
                        data-srcset="
                            /img/patterns/bruce/lqip_sample.jpg 25w,
                            /img/patterns/bruce/low_sample.jpg 500w,
                            /img/patterns/bruce/med_sample.jpg 1000w,
                            /img/patterns/bruce/high_sample.jpg 2000w"
                        alt="The Simon pattern" 
                        class="rounded-top lazyload"
                    >
                </a>
                <div class="card-block">
                    <h4 class="card-title"><a href="/patterns/bruce" title="Bruce">Bruce<span class="block-link"></span></a></h4>
                    <p class="card-text">These boxer briefs combine stylish comfort with the support you deserve</p>
                </div>
            </div>
        </div>
    </div> <!-- .row -->
    <p class="text-center"><a href="/patterns" class="btn btn-primary btn-lg mt-3">More patterns</a></p>
    <h2><a href="/showcase/" title="Showcase">Showcase</a></h2>
    <div class="row">
        <div class="col">
            <div class="card-columns blog">
                {% assign sorted = site.showcases | sort:"date" | reverse %}
                {% for post in sorted limit:10 %}
                    <div class="card hover-shadow mb-3">
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
                        <footer class="rounded-bottom">
                            <a href="/showcase/pattern/{{ post.categories }}" title="Browse other showcases of this pattern">{{ post.categories }}</a> by 
                            <a href="/showcase/maker/{{ post.author }}" title="Browse other showcases by this maker">{{ post.author }}</a>
                        </footer>
                    </div>
                {% endfor %}
            </div>
        </div>
    </div>
    <p class="text-center"><a href="/showcase" class="btn btn-primary btn-lg mt-3">More showcases</a></p>
</div> <!-- .container -->

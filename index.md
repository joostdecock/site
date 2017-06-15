---
layout: cards
title: Welcome to freesewing.org
action: homepage
permalink: /
---
<blockquote class="magic m600 visitor-onl">
    <h5 class="text-center">New here? Try our tour guide</h5>
    <p class="text-center">We have created a series of short animations that explain different things about freesewing. You should try them!</p>
    <p class="text-center"><button role="button" id="tour-config" data-episode="mobile-nav" class="tour-guide btn btn-outline-white">Take the welcome tour</button></p>
</blockquote>

<div class="container">
    <h2>Blog</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% for post in site.posts limit:1 %}
                <div class="card drop-shadow">
                    <a href="{{ post.url }}" title="{{ post.linktitle }}">
                        <img src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}" class="rounded-top">
                    </a>
                    <div class="card-block">
                        <h4 class="card-title"><a href="{{ post.url }}">{{ post.linktitle }}</a></h4>
                        <p class="card-text">{{ post.blurb }} </p>
                    </div>
                </div>
            {% endfor %} 
        </div>
        <div class="col-md-3 mb-3 mt-1">
            {% for post in site.posts offset:1 limit:2 %}
                <div class="card drop-shadow">
                    <a href="{{ post.url }}" title="{{ post.linktitle }}">
                        <img src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}" class="rounded-top">
                    </a>
                    <div class="card-block">
                        <h4 class="card-title"><a href="{{ post.url }}">{{ post.linktitle }}</a></h4>
                        <p class="card-text">{{ post.blurb }} </p>
                    </div>
                </div>

            {% endfor %}
        </div>
    </div> <!-- .row -->
    <h2>Patterns</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
                <div class="drop-shadow rounded">
                   <a href="/patters/aaron"><img alt="Pattern image and linedrawing for the Aiden pattern" src="/img/patterns/aaron/spread.jpg" class="img img-responsive rounded-top"></a>
                    <h3 style="padding: 0.5rem 0.5rem 0; margin: 0;"><a class="black" href="/patterns/aaron">Aaron</a></h3>
                    <p class="lead px-2 py-2"><a class="black noline" href="/patterns/aaron">This no-frills athletic shirt is a wardrobe staple that nobody should be without</a></p>
                </div>
        </div>
            <div class="col-md-3 mb-3 mt-1">
                <div class="drop-shadow rounded">
                   <a href="/patters/simon"><img alt="Pattern image and linedrawing for the Simon pattern" src="/img/patterns/simon/spread.jpg" class="img img-responsive rounded-top"></a>
                    <h4 class="not-on-small" style="padding: 0.5rem 0.5rem 0; margin: 0;"><a href="/patterns/simon" class="black">Simon</a></h4>
                    <h3 class="only-on-small" style="padding: 0.5rem 0.5rem 0; margin: 0;"><a class="black" href="/patterns/simon">Simon</a></h3>
                    <p class="lead px-2 py-2"><a class="black noline" href="/patterns/simon">This is my bid to create the last shirt pattern you'll even need</a></p>
                </div>
            </div>
            <div class="col-md-3 mb-3 mt-1">
                <div class="drop-shadow rounded">
                   <a href="/patters/wahid"><img alt="Pattern image and linedrawing for the Wahid pattern" src="/img/patterns/wahid/spread.jpg" class="img img-responsive rounded-top"></a>
                    <h4 class="not-on-small" style="padding: 0.5rem 0.5rem 0; margin: 0;"><a href="/patterns/wahid" class="black">Wahid</a></h4>
                    <h3 class="only-on-small" style="padding: 0.5rem 0.5rem 0; margin: 0;"><a class="black" href="/patterns/wahid">Wahid</a></h3>
                    <p class="lead px-2 py-2"><a class="black noline" href="/patterns/wahid">This is a fitted waistcoat with front darts and differnet styles</a></p>
                </div>
                <p class="text-center"><a href="/patterns" class="btn btn-primary btn-lg btn-block mt-3">More patterns</a></p>
            </div>
    </div> <!-- .row -->
    <h2>Showcase</h2>
    <div class="row">
        <div class="col">
            <div class="card-columns blog">
                {% assign sorted = site.showcases | sort:"date" | reverse %}
                {% for post in sorted limit:5 %}
                    <div class="card hover-shadow mb-3">
                        <a href="{{ post.url }}" title="{{ post.title | escape}}"><img class="card-img-top img-fluid" src="/img{{ post.url }}{{ post.img }}" alt="{{ post.caption }}"></a>
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

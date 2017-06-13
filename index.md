---
layout: cards
title: Welcome to freesewing.org
action: homepage
permalink: /
---
<div id="welcome" class="hidden">
    <section id="intro" class=" cover-band bg-thematic mt-5 mb-5" style="background-image: url('https://farm6.staticflickr.com/5825/22420384430_de21664cb8_h_d.jpg');">
        <div class="cover-body" style="max-width: 100%; background: transparent; padding: 0;">
            <div class="container">
                <h1 class="text-center">Welcome to freesewing</h1>
                <div class="row">
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark what">
                            <h5>What is this?</h5>
                            <p>This website drafts <a href="/patterns">sewing patterns</a> to your <a href="/docs/measurements">measurements</a> and has <a href="/docs/patterns/">detailed instructions</a> on how to sew them into garments.</p>
                            <p>We also share the <a href="/docs/repositories">software</a> that makes this happen.</p>
                        </blockquote>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark who">
                            <h5>Whom is it for?</h5>
                            <p>For people who sew, or want to learn how to.</p>
                            <p>For designers who'd like to design using our platform.</p>
                            <p>For developers interested in our code.</p>
                        </blockquote>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark cost">
                            <h5>How much does it cost?</h5>
                            <p>Everything is free of charge. We are not a business, but a community project.</p>
                            <p><a href="/about/pledge">Our pledge</a> assures that all money raised in <a href="/donate">donations</a> goes to <a href="http://www.msf.org/">M&eacute;decins Sans Fronti&egrave;res (MSF)</a>.</p>
                        </blockquote>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark work">
                            <h5>How does it work?</h5>
                            <p>We take your measurements and pattern options, and feed them into our software that drafts a pattern for you on the fly.</p>
                        </blockquote>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark credit">
                            <h5>Why is this credible?</h5>
                            <p>If it sounds too good to be true, perhaps these people might put your mind at ease.</p>
                            <p>Also, feel free to <a href="https://github.com/freesewing">look under the hood</a>.</p>
                        </blockquote>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <blockquote class="dark start">
                            <h5>How do I get started?</h5>
                            <p><a href="">Sign up</a> and create a model so you can add measurements to it. Then, simply create a new draft.</p>
                            <p>Taking good measurements is paramount to a good draft, so don't rush it.</p>
                        </blockquote>
                    
                    </div>
                </div> <!-- .row -->
            </div> <!-- .container -->
        </div>
    </section>
    
    <div class="container">
            <div class="col-md-8 mb-3 mt-1">
            </div>
        <div class="row">
            <div class="col-md-6 mb-3 mt-1">
                {% include card.html 
                    title='What is freesewing?'
                    text="If you're new here, <a href='/about'>our about page</a> is mandatory reading to understand what this is and where it came from. It even has our origin story."
                    img='/img/lamp.jpg'
                    link='/about'
                %}
            </div>
            <div class="col-md-6 mb-3 mt-1">
                {% include card.html 
                    title='Check out a sample draft'
                    text="This website drafts sewing patterns to your measurements. Before you start measuring yourself, you might like to see a sample to have an idea what to expect."
                    img='/img/draft-detail.png'
                    alt='A Creative Commons picture from the Flickr stream of WOCinTech Chat'
                    link='/drafts/rhtum'
                %}
            </div>
        </div> <!-- .row -->
    </div>
</div> <!-- .welcome -->
<blockquote class="magic m600" id="unhider">
    <h5 class="text-center">New here? Not sure what you're looking at?</h5>
    <p class="text-center">It gets tired quickly to look at the welcome message all the time, so we only display it on request.</p>
<p class="text-center"><a class="btn btn-outline-white" href="#welcome" onclick="$('#welcome').removeClass('hidden');$('#unhider').addClass('hidden');">Take the tour</a></p>
</blockquote>

<div class="container">
    <h2>Blog</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% for post in site.posts limit:1 %}
                <div class="drop-shadow rounded">
                   <a href="{{post.url}}"><img alt="{{ post.caption }}" src="/img{{ post.url }}{{ post.img }}" class="img img-responsive rounded-top"></a>
                    <div class="post-meta px-1 py-1">
                        <a href="/blog/author/{{ post.author }}" title="Browse other posts by this author">{{ post.author }}</a> in 
                        <a href="/blog/category/{{ post.categories }}" title="Browse other posts in this category">{{ post.categories }}</a> on 
                        <a href="{{post.url}}">{{ post.date | date_to_string }}</a>
                    </div>
                    <h3 style="padding: 0 0.5rem 0.5rem;"><a class="black" href="{{post.url}}">{{ post.title }}</a></h3>
                </div>
            {% endfor %} 
        </div>
        {% for post in site.posts offset:1 limit:2 %}
            <div class="col-md-3 mb-3 mt-1" style="height: 100%;">
                <div class="drop-shadow rounded" style="height: 48%; margin-bottom: 4%;">
                    <a href="{{post.url}}"><img alt="{{ post.caption }}" src="/img{{ post.url }}{{ post.img }}" class="img img-responsive rounded-top"></a>
                    <div class="post-meta px-1 py-1">
                        <a href="/blog/author/{{ post.author }}" title="Browse other posts by this author">{{ post.author }}</a> in 
                        <a href="/blog/category/{{ post.categories }}" title="Browse other posts in this category">{{ post.categories }}</a> on 
                        <a href="{{post.url}}">{{ post.date | date_to_string }}</a>
                    </div>
                    <h5 class="not-on-small" style="padding: 0 0.5rem 1rem;"><a href="{{post.url}}" class="black">{{ post.linktitle }}</a></h5>
                    <h3 class="only-on-small" style="padding: 0 0.5rem 0.5rem;"><a href="{{post.url}}" class="black">{{ post.title }}</a></h3>
                </div>
                <div class="drop-shadow rounded" style="height: 48%;">
                    <a href="{{post.url}}"><img alt="{{ post.caption }}" src="/img{{ post.url }}{{ post.img }}" class="img img-responsive rounded-top"></a>
                    <div class="post-meta px-1 py-1">
                        <a href="/blog/author/{{ post.author }}" title="Browse other posts by this author">{{ post.author }}</a> in 
                        <a href="/blog/category/{{ post.categories }}" title="Browse other posts in this category">{{ post.categories }}</a> on 
                        <a href="{{post.url}}">{{ post.date | date_to_string }}</a>
                    </div>
                    <h5 class="not-on-small" style="padding: 0 0.5rem 1rem;"><a href="{{post.url}}" class="black">{{ post.linktitle }}</a></h5>
                    <h3 class="only-on-small" style="padding: 0 0.5rem 0.5rem;"><a href="{{post.url}}" class="black">{{ post.title }}</a></h3>
                </div>
            </div>
        {% endfor %}
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
                {% for post in site.showcases %}
                    <div class="card hover-shadow">
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

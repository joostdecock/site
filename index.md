---
layout: cards
title: Freesewing documentation
permalink: /
---
<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h2>Welcome</h2>
            <p class="lead">Freesewing is an open source platform for made-to-measure sewing patterns</p>
            <p>This documentation site currently holds documentation for the freesewing core platform.
            Which means that it is most relevant to developers and designers.</p>
            <p>Documentation for makers &mdash; how to sew up our patterns and all that &mdash; is still hosted on 
            <a href="https://makemypattern.com/">makemypattern.com</a>,
            the predecessor of this site.</p>
            <blockquote class="mt-4">
                <h5>Don't be shy to suggest changes</h5>
                <p>Freesewing is open source, and so is our documentation. If you see something that needs improvement,
                you can click the <b>Improve this page</b> button at the very bottom of every page.</p>
            </blockquote>
        </div>
    </div>
    <h2>Start here</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='What is freesewing?'
                text="Oh you're new here? No worries, we can explain what this is in just a few minutes. We even have a video."
                img='/img/lamp.jpg'
                link='/about'
                link-text='What is freesewing?'
            %}
        </div>
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='Try the freesewing demo'
                text="Click around in our demo and see what happens. We promise you can't break anything."
                img='/img/wocit.jpg'
                alt='A Creative Commons picture from the Flickr stream of WOCinTech Chat'
                link='/demo'
                link-text='Try the freesewing demo'
            %}
        </div>
    </div> <!-- .row -->
    <h2>Our documentation</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='For designers'
                text='Curious about what freesewing can do for you as a designer? Learn how you can design your own patterns using our tools.'
                img='/img/designers.jpg'
                link='/designer'
                link-text='Documentation for designers'
            %}
        </div>
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='For developers'
                text='Do you care for code? Do you want to learn or help us out? Or are you merely curious about how the sausage gets made?'
                img='/img/developers.jpg'
                link='/developer'
                link-text='Documentation for developers'
            %}
        </div>
    </div> <!-- .row -->
    <h2>Get involved</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='Contribute to freesewing'
                text='Join the loose-knit team of volunteers who build and run freesewing. Apart from enthusiasm, no special skills are required.'
                img='/img/contributors.jpg'
                link='/contribute'
                link-text='Documentation for contributors'
            %}
        </div>
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='Join us on Slack'
                text="The freesewing community on Slack is the best place to ask questions, meet other freesewers, or just hang out and share a laugh."
                img='/img/slack.png'
                link='/slack'
                link-text='Request an invite'
            %}
        </div>
    </div> <!-- .row -->
</div> <!-- .container -->

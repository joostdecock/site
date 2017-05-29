---
layout: cards
title: Documentation
permalink: /docs/
---
<div class="container">
    <h2>Start here</h2>
    <div class="row">
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='What is freesewing?'
                text="Oh you're new here? No worries, we can explain what this is in just a few minutes. With bonus origin story."
                img='/img/lamp.jpg'
                link='/about'
                link-text='What is freesewing?'
            %}
        </div>
        <div class="col-md-6 mb-3 mt-1">
            {% include card.html 
                title='Check out a sample draft'
                text="This website generate pattern drafts. Here's a sample you can check out to have an idea what to expect."
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
                title='Join us on Gitter'
                text="The freesewing community on Gitter is the best place to ask questions, meet other freesewers, or just hang out and share a laugh."
                img='/img/gitter.jpg'
                link='https://gitter.im/freesewing/freesewing'
                link-text='Go to Gitter'
            %}
        </div>
    </div> <!-- .row -->
</div> <!-- .container -->

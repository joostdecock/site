---
layout: demo
title: Freesewing demo
permalink: "/demo/"
---
<div class="container oc-fade" id="demo-wrapper">
    <div class="row"><div class="col" id="breadcrumbs"></div></div>
    <div class="row" id="service-chooser">
        <div class="col-6 col-md-3 mt-5">
            {% include demo-card.html 
                service='info'
                text='The info service returns API info to facilitate front-end integration.'
            %}
        </div>
        <div class="col-6 col-md-3 mt-5">
            {% include demo-card.html 
                service='draft'
                text='The draft service is freesewing\'s core pattern drafting service.'
            %}
        </div>
        <div class="col-6 col-md-3 mt-5">
            {% include demo-card.html 
                service='sample'
                text='The sample service samples pattern options or model measurements.'
            %}
        </div>
        <div class="col-6 col-md-3 mt-5">
            {% include demo-card.html 
                service='compare'
                text='The compare service compares your draft to standard model drafts.'
            %}
        </div>
    </div> <!-- .row -->
    <div class="row mt-4"><div class="col" id="demo"></div></div>
</div> <!-- .container -->

